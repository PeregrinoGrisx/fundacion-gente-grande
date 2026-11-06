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

describe('insumos de noviembre 2026 (directorio, direcciones, denuncias, noticias)', () => {
  test('el directorio muestra a sus 6 integrantes, 5 de ellos con foto', async () => {
    const html = await read('nosotros/index.html');
    const seccion = html.slice(html.indexOf('id="directorio"'), html.indexOf('id="fundadores"'));
    for (const nombre of ['Paula Leiva Le-Blanc', 'Carola Sandoval Yañez', 'Pía Hachim Meza', 'Jimena Aragonés Sir', 'Luis Garrido Ampuero', 'Romina Le Blanc Ampuero']) {
      assert.ok(seccion.includes(nombre), nombre);
    }
    assert.equal((seccion.match(/<img [^>]*alt="Retrato de /g) ?? []).length, 5);
  });

  test('los 11 socios fundadores aparecen con su título', async () => {
    const md = await read('nosotros/index.md');
    assert.match(md, /11 socios fundadores/);
    assert.match(md, /Hna\. Paulina Minaya Villafana, Religiosa/);
    assert.match(md, /Francisco Osorio Sobarzo, Médico psiquiatra/);
  });

  test('el ELEAM está en Volcán Cotacotani 131 y la Fundación en Sargento Carvajal', async () => {
    const eleam = await read('eleam/index.html');
    assert.ok(eleam.includes('Volcán Cotacotani 131, Arica'));
    assert.match(eleam, /maps\?q=Volc%C3%A1n%20Cotacotani%20131/);
    const md = await read('contacto/index.md');
    assert.match(md, /Dirección del ELEAM: Volcán Cotacotani 131, Arica/);
    assert.match(md, /Dirección de la Fundación: Sargento Carvajal 3944/);
  });

  test('las denuncias van al correo exclusivo del canal', async () => {
    for (const path of ['index.html', 'contacto/index.html']) {
      const html = await read(path);
      assert.ok(html.includes('mailto:denuncias@fundaciongentegrande.org?subject=Denuncia'), path);
      assert.ok(!html.includes('mailto:rominaleblanc@fundaciongentegrande.org?subject=Denuncia'), path);
    }
    assert.match(await read('llms.txt'), /denuncias@fundaciongentegrande\.org/);
  });

  test('Noticias incrusta Instagram y el video de Facebook, y enlaza la prensa', async () => {
    const html = await read('noticias/index.html');
    assert.equal((html.match(/class="instagram-media"/g) ?? []).length, 4);
    assert.equal((html.match(/class="ig-enlace"/g) ?? []).length, 2);
    assert.ok(html.includes('src="https://www.instagram.com/embed.js"'));
    assert.match(html, /facebook\.com\/plugins\/video\.php\?href=/);
    assert.ok(html.includes('https://www.aricaldia.cl/corte-de-apelaciones-de-arica-dicto-charla'));
    assert.ok(html.includes('juzgado_de_arica_y_representante_de_fundacion_gente_grande_coordinan_trabajo.pdf'));
    assert.ok(!html.includes('igsh='), 'quedaron parámetros de rastreo de Instagram');
    const md = await read('noticias/index.md');
    assert.match(md, /## En los medios/);
    assert.match(md, /## En nuestras redes/);
  });
});
