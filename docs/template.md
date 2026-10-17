# De dónde sale el diseño

## Qué traía el archivo

El ZIP entregado (`template web/nosic-sketch-...zip`) **no contiene código**.
Trae dos archivos:

| Archivo                   | Qué es                                  |
| ------------------------- | --------------------------------------- |
| `Docs-TF-S.pdf`           | Documentación de ThemeForest             |
| `Nosic-Sketch_v1.0.sketch`| Archivo de diseño de Sketch, sin código |

Un `.sketch` es un contenedor con el diseño descrito en JSON. No hay HTML, CSS
ni JavaScript que copiar: hay un diseño que **leer y reconstruir**.

Eso fue lo que se hizo. Se abrió el JSON del archivo, se extrajeron las
especificaciones y se reconstruyó el sistema en código.

## Qué se extrajo

El template es **Nosic Sketch**, una landing de producto SaaS: 10 variantes de
portada más login y registro, todas sobre un lienzo de 1920 px.

### Tipografía

**Public Sans**, en Regular, Medium, SemiBold y Bold. Coincidencia afortunada:
ya se estaba usando para texto, así que ahora cubre todo el sitio.

Escala medida en el archivo: **48 / 40 / 32 / 28 / 24 / 20 / 18 / 17 / 16 /
13 / 12**. En el sitio va en `clamp()` para que se adapte, conservando las
proporciones.

### Medidas

- Contenedor: **1320 px** (la grilla ancha de Bootstrap 5)
- Sombras: `0 2px 4px rgb(0 0 0 / .07)` y `0 8px 24px rgb(149 157 165 / .2)`

### Colores del template y su equivalente

| Template          | Sitio                     |
| ----------------- | ------------------------- |
| violeta `#570de6` | azul de marca `#2275b7`   |
| navy `#140238`    | azul profundo `#0a2c45`   |
| lavanda `#ebe2fc` | lavanda `#ece5fa`         |
| verde `#21c200`   | magenta de marca `#e8388d`|
| gris `#212529`    | texto `#212529` (igual)   |

La lavanda del template y la del sitio anterior son casi el mismo color. Por
eso el lenguaje visual calza sin forzarlo.

### Orden de secciones

El template, de arriba abajo: nav · hero con cifras · fila de logos ·
servicios · features · blog · about · goals · integraciones · precios ·
testimonios · CTA · contacto · pie.

Adaptado a la Fundación:

| Template      | Sitio                                            |
| ------------- | ------------------------------------------------ |
| Hero + stats  | Hero + cifras institucionales                     |
| Fila de logos | Instituciones con las que se trabaja en red       |
| Servicios     | Residencia de larga estadía · Conciencia y formación |
| Features      | Qué nos diferencia                                |
| Blog          | Noticias recientes                                |
| About         | Sobre nosotros                                    |
| Goals         | Nuestros objetivos                                |
| Precios       | **Formas de aportar** (misma grilla de tres, una destacada, sin precios) |
| Testimonios   | Testimonios de residentes y familias              |
| CTA           | Llamado a donar                                   |
| Contacto      | Contacto + canal de denuncias                     |

La grilla de precios es la adaptación que más cambia de sentido: se conserva
la estructura de tres columnas con una destacada, pero sin montos, porque acá
no se vende nada. Lo destacado es "Donación", no un plan.

## Páginas internas

El template es una landing: no trae páginas internas. Nosotros, ELEAM,
Recursos, Noticias y Contacto se diseñaron con su mismo lenguaje —banda pastel
con miga de pan, etiqueta en versales, tarjetas, contenedor de 1320— pero su
composición es propia.

Cada una usa un pastel distinto en la cabecera para que no se lean iguales:
Nosotros lavanda, ELEAM cielo, Recursos menta, Noticias rosa.

## Licencia

El `.sketch` es de ThemeForest. Lo que se licencia es el archivo de diseño; el
código de este repositorio es propio. Conviene guardar el comprobante de
compra junto al archivo original.
