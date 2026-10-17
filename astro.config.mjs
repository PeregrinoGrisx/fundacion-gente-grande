import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * En GitHub Pages el sitio no vive en la raíz del dominio sino en
 * /fundacion-gente-grande/. Solo en ese caso se activa `base`, para que
 * `npm run dev` siga sirviendo en la raíz y no cambie el flujo de trabajo.
 *
 * El workflow de despliegue define PAGES=1.
 */
const enPages = process.env.PAGES === "1";
const base = enPages ? "/fundacion-gente-grande" : undefined;

/**
 * Astro antepone `base` a sus propios recursos, pero no a las rutas que
 * escribimos a mano en las plantillas (`/nosotros/`, `/img/marca/...`).
 * Esta integración las corrige en el HTML ya generado, saltándose las que
 * Astro ya prefijó.
 */
function prefijarRutas() {
  return {
    name: "prefijar-rutas-absolutas",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        if (!base) return;

        // En Windows dir.pathname trae "/C:/..." y los espacios codificados,
        // así que hay que convertirlo con fileURLToPath.
        const raiz = typeof dir === "string" ? dir : fileURLToPath(dir);
        const sinBarra = base.slice(1);
        let tocados = 0;

        const recorrer = (carpeta) => {
          for (const entrada of fs.readdirSync(carpeta, { withFileTypes: true })) {
            const ruta = path.join(carpeta, entrada.name);
            if (entrada.isDirectory()) {
              recorrer(ruta);
              continue;
            }
            if (!entrada.name.endsWith(".html")) continue;

            const antes = fs.readFileSync(ruta, "utf8");
            const despues = antes.replace(
              /(href|src|content)="\/(?!\/)([^"]*)"/g,
              (completo, attr, resto) =>
                resto === sinBarra || resto.startsWith(sinBarra + "/")
                  ? completo
                  : `${attr}="${base}/${resto}"`,
            );
            if (antes !== despues) {
              fs.writeFileSync(ruta, despues);
              tocados++;
            }
          }
        };

        recorrer(raiz);
        logger.info(`rutas absolutas prefijadas en ${tocados} páginas`);
      },
    },
  };
}

export default defineConfig({
  site: enPages
    ? "https://peregrinogrisx.github.io"
    : "https://fundaciongentegrandearica.org",
  base,
  integrations: [sitemap(), prefijarRutas()],
  build: { inlineStylesheets: "auto" },
});
