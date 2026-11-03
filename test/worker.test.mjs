// Pruebas del Worker contra el sitio construido (npm test ejecuta astro build antes).
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { isPagePath, markdownPathFor } from '../worker/index.js';
import { createAssets } from './helpers/assets.mjs';

const SITE = 'https://fundaciongentegrandearica.org';
const env = { ASSETS: createAssets() };
const call = (path, { accept, method = 'GET', assets = env } = {}) =>
  worker.fetch(
    new Request(`${SITE}${path}`, {
      method,
      headers: accept === undefined ? {} : { Accept: accept },
    }),
    assets,
  );
const varyHasAccept = (res) => /(^|,)\s*accept\s*(,|$)/i.test(res.headers.get('Vary') ?? '');

describe('negociación Markdown en la portada', () => {
  test('Accept: text/markdown devuelve Markdown con Vary: Accept', async () => {
    const res = await call('/', { accept: 'text/markdown' });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
    assert.ok(varyHasAccept(res));
    assert.equal(res.headers.get('Link'), `<${SITE}/>; rel="canonical"`);
    const body = await res.text();
    assert.match(body, /^# Fundación Gente Grande/);
    assert.match(body, /rominaleblanc@fundaciongentegrande\.org/);
  });

  test('Accept: text/html sigue devolviendo HTML, con Vary y enlace a la versión Markdown', async () => {
    const res = await call('/', { accept: 'text/html' });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('Content-Type'), 'text/html; charset=utf-8');
    assert.ok(varyHasAccept(res));
    assert.equal(res.headers.get('Link'), '</index.md>; rel="alternate"; type="text/markdown"');
    assert.match(await res.text(), /<html lang="es-CL"/);
  });

  test('un navegador o un cliente sin Accept reciben HTML', async () => {
    for (const accept of [undefined, 'text/html,application/xhtml+xml,*/*;q=0.8', '*/*']) {
      const res = await call('/', { accept });
      assert.match(res.headers.get('Content-Type'), /^text\/html/, String(accept));
    }
  });

  test('si se prefiere Markdown por q, gana Markdown', async () => {
    const res = await call('/', { accept: 'text/html;q=0.5, text/markdown' });
    assert.match(res.headers.get('Content-Type'), /^text\/markdown/);
  });

  test('HEAD con Accept: text/markdown devuelve encabezados sin cuerpo', async () => {
    const res = await call('/', { accept: 'text/markdown', method: 'HEAD' });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
    assert.equal(await res.text(), '');
  });

  test('un tipo que el sitio no ofrece recibe 406 con Vary: Accept', async () => {
    const res = await call('/', { accept: 'application/json' });
    assert.equal(res.status, 406);
    assert.ok(varyHasAccept(res));
  });
});

describe('páginas internas', () => {
  for (const [path, title] of [
    ['/nosotros/', '# Nosotros'],
    ['/nosotros', '# Nosotros'],
    ['/eleam/', '# ELEAM'],
    ['/recursos/', '# Recursos'],
    ['/noticias/', '# Noticias'],
    ['/contacto/', '# Contacto'],
  ]) {
    test(`${path} en Markdown`, async () => {
      const res = await call(path, { accept: 'text/markdown' });
      assert.equal(res.status, 200);
      assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
      assert.ok(varyHasAccept(res));
      assert.ok((await res.text()).startsWith(title));
    });
  }

  test('/eleam en HTML conserva la redirección a /eleam/', async () => {
    const res = await call('/eleam', { accept: 'text/html' });
    assert.equal(res.status, 307);
    assert.equal(res.headers.get('Location'), '/eleam/');
  });

  test('las URL .md se pueden pedir directo, con tipo Markdown', async () => {
    const res = await call('/eleam/index.md');
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  });
});

describe('404 para agentes', () => {
  test('ruta inexistente con Accept: text/markdown → 404 en Markdown con enlaces', async () => {
    const res = await call('/no-existe-esta-pagina', { accept: 'text/markdown' });
    assert.equal(res.status, 404);
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
    assert.ok(varyHasAccept(res));
    const body = await res.text();
    assert.ok(body.length >= 20);
    assert.match(body, /^# 404/);
    assert.match(body, /\/no-existe-esta-pagina/);
    assert.match(body, /\(https:\/\/fundaciongentegrandearica\.org\/llms\.txt\)/);
    assert.match(body, /\(https:\/\/fundaciongentegrandearica\.org\/sitemap-index\.xml\)/);
  });

  test('un .md inexistente también responde 404 en Markdown', async () => {
    const res = await call('/no-existe/index.md');
    assert.equal(res.status, 404);
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  });

  test('ruta inexistente en un navegador → 404 en HTML', async () => {
    const res = await call('/no-existe-esta-pagina/', { accept: 'text/html' });
    assert.equal(res.status, 404);
    assert.match(res.headers.get('Content-Type'), /^text\/html/);
    assert.ok(varyHasAccept(res));
    assert.equal(res.headers.get('Link'), null);
    assert.match(await res.text(), /No encontramos esta página/);
  });

  test('HEAD de un 404 en Markdown no trae cuerpo', async () => {
    const res = await call('/no-existe', { accept: 'text/markdown', method: 'HEAD' });
    assert.equal(res.status, 404);
    assert.equal(await res.text(), '');
  });
});

describe('archivos', () => {
  test('llms.txt se sirve como texto UTF-8', async () => {
    const res = await call('/llms.txt');
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('Content-Type'), 'text/plain; charset=utf-8');
  });

  test('las imágenes pasan sin tocar', async () => {
    const res = await call('/img/marca/Isotipo.png', { accept: 'text/markdown' });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('Content-Type'), 'image/png');
  });
});

describe('utilidades', () => {
  test('isPagePath distingue páginas de archivos', () => {
    assert.ok(isPagePath('/'));
    assert.ok(isPagePath('/eleam/'));
    assert.ok(isPagePath('/eleam'));
    assert.ok(isPagePath('/404.html'));
    assert.ok(!isPagePath('/llms.txt'));
    assert.ok(!isPagePath('/index.md'));
    assert.ok(!isPagePath('/img/marca/Isotipo.png'));
  });

  test('markdownPathFor sigue la convención de llmstxt.org', () => {
    assert.equal(markdownPathFor('/'), '/index.md');
    assert.equal(markdownPathFor('/eleam/'), '/eleam/index.md');
    assert.equal(markdownPathFor('/eleam'), '/eleam/index.md');
    assert.equal(markdownPathFor('/eleam/index.html'), '/eleam/index.md');
  });
});
