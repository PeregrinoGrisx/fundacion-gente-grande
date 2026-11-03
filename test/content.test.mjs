// Pruebas sobre los archivos generados por astro build: llms.txt, versiones
// Markdown de cada página y JSON-LD de la organización.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { DIST } from './helpers/assets.mjs';

const SITE = 'https://fundaciongentegrandearica.org';
const read = (path) => readFile(join(DIST, path), 'utf8');
const exists = async (path) => {
  try {
    return (await stat(join(DIST, path))).isFile();
  } catch {
    return false;
  }
};

const PAGINAS = ['/', '/nosotros/', '/eleam/', '/recursos/', '/noticias/', '/contacto/'];

describe('llms.txt', () => {
  test('sigue el formato de llmstxt.org: H1, resumen en cita y secciones de enlaces', async () => {
    const txt = await read('llms.txt');
    const lineas = txt.split('\n');
    assert.equal(lineas[0], '# Fundación Gente Grande');
    assert.equal(lineas[1], '');
    assert.match(lineas[2], /^> .{40,}/);
    assert.match(txt, /\n## Páginas\n/);
    assert.match(txt, /\n## Optional\n/);
  });

  test('incluye cuándo usar el sitio y cómo debe actuar un agente', async () => {
    const txt = await read('llms.txt');
    assert.match(txt, /\n## When to use this site/);
    assert.match(txt, /SENAMA/);
    assert.match(txt, /### Cómo debe actuar un agente/);
    assert.match(txt, /rominaleblanc@fundaciongentegrande\.org/);
  });

  test('cada enlace del sitio en llms.txt apunta a un archivo que existe', async () => {
    const txt = await read('llms.txt');
    const enlaces = [...txt.matchAll(/\]\((https:\/\/fundaciongentegrandearica\.org[^)]*)\)/g)].map((m) => m[1]);
    assert.ok(enlaces.length >= PAGINAS.length);
    for (const url of enlaces) {
      const path = new URL(url).pathname;
      assert.ok(await exists(path), `${url} no existe en dist/`);
    }
  });
});

describe('versión Markdown de cada página', () => {
  for (const pagina of PAGINAS) {
    test(`${pagina}index.md existe, empieza con un H1 y no usa guion largo`, async () => {
      const md = await read(`${pagina}index.md`);
      assert.match(md, /^# \S/);
      assert.ok(md.length > 200);
      assert.ok(!md.includes('—'), 'contiene guion largo');
      assert.match(md, new RegExp(`Versión HTML: ${SITE}${pagina}`));
    });

    test(`el HTML de ${pagina} anuncia su versión Markdown`, async () => {
      const html = await read(`${pagina}index.html`);
      assert.ok(html.includes(`<link rel="alternate" type="text/markdown" href="${pagina}index.md">`));
    });
  }

  test('el 404 no anuncia una versión Markdown', async () => {
    const html = await read('404.html');
    assert.ok(!html.includes('type="text/markdown"'));
  });
});

describe('JSON-LD de la organización', () => {
  const jsonLd = async (path) => {
    const html = await read(path);
    const bloques = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    assert.equal(bloques.length, 1);
    return JSON.parse(bloques[0][1]);
  };

  test('la portada declara Organization (y NGO) con contacto y dirección', async () => {
    const data = await jsonLd('index.html');
    assert.equal(data['@context'], 'https://schema.org');
    const org = data['@graph'].find((n) => [].concat(n['@type']).includes('Organization'));
    assert.ok(org, 'falta el nodo Organization');
    assert.deepEqual(org['@type'], ['Organization', 'NGO']);
    assert.equal(org.name, 'Fundación Gente Grande');
    assert.equal(org.url, SITE);
    assert.ok(org.description);
    assert.equal(org.address['@type'], 'PostalAddress');
    assert.equal(org.address.addressLocality, 'Arica');
    assert.equal(org.address.addressCountry, 'CL');
    const contacto = org.contactPoint[0];
    assert.equal(contacto['@type'], 'ContactPoint');
    assert.ok(contacto.contactType);
    assert.ok(contacto.email || contacto.telephone);
    assert.ok(org.sameAs.length > 0);
  });

  test('el sitio web apunta a la organización como publisher', async () => {
    const data = await jsonLd('index.html');
    const org = data['@graph'].find((n) => [].concat(n['@type']).includes('Organization'));
    const web = data['@graph'].find((n) => n['@type'] === 'WebSite');
    assert.equal(web.publisher['@id'], org['@id']);
  });
});
