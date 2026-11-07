# SPEC · dos-bicicleterias

**Serie "Dos negocios" · CRM · 3D real (Three.js r170 local, `assets/tres.js`) · fondo crema #efeee5 liso.**
Dos bicicleterías iguales lado a lado (pantalla partida por el pilar navy en x = 0), el mismo casco de bici en
cada vidriera. Llegan cascos: la de la izquierda sube una foto para todos; la de la derecha mira en su CRM quién
compró bici sin casco y le escribe a esos pocos. Paula (personaje nuevo del módulo, `ELENCO.paula`, acá sin la franja
del pecho) NO está en la bicicletería cuando le llega el mensaje: está en la puerta de SU CASA, otra cuadra (x ~14:
fachada propia con ventana, cortinas, maceta y puerta verde "12"); se llega con un corte de cámara (CUT1). Vio las
dos: la foto la pasó de largo (queda arriba en gris), su nombre no. "Esa tarde": agarra la bici y gira; CORTE (CUT2)
a la bicicletería verde con luz cálida de tarde: entra desde fuera de cuadro por la derecha empujando la bici (mano en
el puño, pie de apoyo arriba), "vuelve": Nico (`ELENCO.empleado`, pelo con volumen) abre la puerta y la saluda; ella
deja la bici y entra. Callback: la ficha de Paula en el CRM pasa de "Casco: no" a "Casco: sí ✓" y el casco de la vidriera
se apoya encima. Cierre: la ficha se multiplica en las fichas de TUS clientes (Inés, Pablo, Sara: "Luz: no" →
"Avisarle: luz"), el casco sube al cielo crema y entra la tarjeta "Videollamada gratis · scalerics.com".

Voz Orus (33,8 s), 89 palabras, duración 34,36 s (fin de voz + 0,55). Todo el 3D vive en `assets/tres.js` (una
escena, cámara continua con cúbica monótona entre claves); las escenas HTML (`gen.mjs` las escribe todas) son solo la
capa de arriba: gancho, rótulos con línea guía, sello, tarjeta de cierre. `armar.mjs`: subtítulos navy arriba al
centro con contorno crema propio (sin velo encima del 3D), clave en recuadro verde con letra navy, palabras que entran
y salen enteras (sin fundidos grises), logo oscuro solo en la tarjeta de cierre (31,4 s), para que nunca pise objetos.

Paleta: crema #efeee5 (fondo) · vereda #dcd9c8 · fachadas navy #16243d · navy #0b1220 / #1f3254 · verde #5ce611 ·
gris de la izquierda #9aa0a8 · rojo apagado #c7655b solo para "Casco: no", "sin", "la pasó de largo" y los "no" de
las fichas de s12.

## El lenguaje visual (de la referencia)
- Fondo transparente: la escena no pinta fondo, el index ya lo tiene.
- Ilustración de líneas: `stroke #efeee5`, `stroke-width 5`, `round` caps/joins, sin relleno. El
  acento es verde `#5ce611` (trazo o relleno chico: ventanas, badges, números, flechas). Un solo
  acento, nada de otros colores. Lo apagado: crema con opacity 0.35–0.45.
- Todo vive en un `<svg viewBox="0 0 1080 1920">` a pantalla completa (coordenadas = píxeles).
- Zona del dibujo: y 600–1200, centrado en x 540, ancho 420–820 px. Nada arriba de y=580 (ahí
  están los subtítulos) ni abajo de y=1330.
- Etiqueta mono debajo del dibujo: `.etiqueta` igual que s01 (IBM Plex Mono 500, 28px,
  letter-spacing 0.34em, mayúsculas, verde, top 1268). Cambia de texto con los beats (fade + y).
  Textos de 1 a 4 palabras.
- Textos dentro del dibujo (carteles, UI de celular): Lexend 600 o IBM Plex Mono 500; tamaño
  mínimo 24px para lo que hay que leer; lo decorativo más chico lleva `data-layout-ignore`.
- Movimiento: los trazos se DIBUJAN (stroke-dashoffset, 0.5–0.8 s, power2.inOut) con el helper
  `dibujar()` de s01 (que pone opacity 0 hasta que arranca, para que no queden puntitos de los
  caps redondos). Lo que aparece entero hace pop (scale 0.85→1 + opacity, back.out(1.6), 0.35 s).
  Las cosas cambian EN la palabra que las nombra (tenés los tiempos por palabra abajo).
  Algo se mueve siempre: ningún tramo de más de ~1 s quieto.
- Badge de "no": círculo verde (r 18, trazo 4) con una X adentro, arriba a la derecha del ícono,
  como la referencia. Tachar algo: línea verde que se dibuja encima.
- Celulares: rectángulo redondeado crema (rx 52, trazo 5), ~380x760, barrita arriba; adentro
  UI simple en Lexend (crema y verde), sin capturas.
- Entrada: los primeros 0.3 s el dibujo arranca (dibujándose o con pop); salida: los últimos
  0.3 s `opacity 0 + blur(6px)` sobre el contenedor de la escena, como s01.
- Prohibido: emojis, degradés, glow/neón, glass, sombras, serif, cualquier color fuera de
  `#efeee5` / `#5ce611` (y sus opacidades). Copy en español rioplatense; si Scalerics habla, en
  plural ("te contamos"), nunca primera persona singular.

## Reglas técnicas (HyperFrames)
- Archivo `compositions/<id>.html`, un `<template>` con `<style>`, un
  `<div id="root" data-composition-id="<id>" data-width="1080" data-height="1920" data-duration="<dur>">`
  y un `<script>` que arma UN `gsap.timeline({ paused: true })` y lo registra en
  `window.__timelines["<id>"]`. Los dos `@font-face` como en s01 (rutas `assets/fonts/...`).
- GSAP se carga SIEMPRE local: `<script src="assets/vendor/gsap.min.js"></script>`. Nunca del CDN
  (cdn.jsdelivr.net está bloqueado en la nube y el render falla).
- Todo selector CSS con prefijo `[data-composition-id="<id>"]`; clases e ids con prefijo de la
  escena (`s05-...`). Un contenedor `.clip` de la escena con data-start 0 y data-duration = dur.
- Determinista: nada de Math.random, Date, timers, `repeat: -1`. No animar letterSpacing, width,
  height, left, top: solo transforms, opacity, filter, strokeDashoffset.
- Además escribí `compositions/<id>.sfx.json`: 3 a 8 golpes de sonido en segundos relativos a la
  escena, `[{"t":0.4,"sfx":"pop","vol":0.3}]`. Nombres: chime, click, click-soft,
  glitch-1, impact-bass-1, key-press, notification, ping, pop, riser, sparkle, typing, whoosh,
  whoosh-short. Volumen 0.2–0.45; `"max": 0.6` recorta los largos. Sin whoosh de transición (lo
  pone armar.mjs).
- Verificá: `node armar.mjs` (desde la carpeta del proyecto) y
  `npx --yes hyperframes@0.8.206 snapshot --at <tiempos globales> --no-end` en 3–5 momentos de tu escena; MIRÁ
  los PNG y corregí lo que choque, quede cortado, vacío o chico. Después
  `npx --yes hyperframes@0.8.206 check --json` sin errores en tus archivos. Los tiempos globales = inicio de la
  escena + relativo (están en `tiempos.md`).


> Para este reel manda lo de arriba sobre SPEC-base: no hay dibujos de líneas SVG (todo es 3D), el fondo es
> crema y los textos son navy.

## Escenas (inicio global · qué pasa · en qué palabra)
1. **s01-gancho** 0,00 (2,58 s): las dos fachadas grises e iguales, push-in lento; gancho entero en el cuadro 0
   (Lexend 900 106 px, "a quién avisarle." en recuadro verde) y sello mono de 50 px abajo. "cascos" (1,8): los dos
   cascos saltan, crecen y dan una vuelta sincronizados (pops ahí). SFX: impacto, timbre de bici.
2. **s01b-una** 2,58 (2,00 s): en "Una" se prende la derecha (toldo verde, marco crema con filete verde, luz cálida,
   cartel con bici verde; whoosh en el cambio). "a quién" late.
3. **s02-izquierda** 4,58 (3,17 s): travelling a la vidriera izquierda; "foto": sube un celular con un post genérico
   "LLEGARON CASCOS" (flash); "llegaron": siete copias en abanico. Rótulo "para todos igual"; celular, copias y rótulo
   se van antes del travelling.
4. **s03-derecha** 7,75 (2,05 s): travelling por el pilar a la derecha; el monitor sale por la vidriera (lista del
   CRM, letra de 62-74 px de lienzo). Rótulo "CRM".
5. **s04-filtro** 9,80 (1,88 s): caen los chips "Compró: bici" y "Casco: no"; se apagan Jorge y Carla, después Lucía,
   en su lugar (las filas no se mueven ni se cruzan); quedan Paula, Ana y Diego con barra verde. "quedan 3" + ding.
6. **s05-escribe** 11,68 (1,62 s): de la fila de Paula nace su ficha (escala pareja) y viene a cámara; su bici verde
   entra rodando. Tilde verde en "pocos".
7. **s06-mensaje** 13,30 (2,82 s): el globo verde sale de la ficha por la derecha; CORTE a la casa de Paula: su celular
   en primer plano (chat: compra de marzo con la foto de la bici, "¡Gracias!", "Hoy", barra para escribir); el globo
   baja de frente y se apoya adentro, donde aparece el mensaje (vibración + notificación). La bici de marzo se achica y
   desaparece junto a la ficha.
8. **s07-vio** 16,12 (2,73 s): la cámara se aleja y el celular se corre a la derecha: detrás estaba Paula, en la
   puerta de su casa con su bici. "las dos": la pantalla muestra arriba el post y abajo su mensaje; "La foto": el post
   se apaga en gris; rótulo rojo "la pasó de largo" con la línea al post.
9. **s08-su-nombre** 18,85 (3,03 s): "nombre": "Paula," se resalta y Paula sonríe (cejas arriba, sin dientes). "Esa
   tarde": el celular grande vuelve a su mano, agarra la bici y gira; CUT2 (20,72) a la bicicletería verde con luz de
   tarde: entra desde la derecha empujando la bici (pasos); "vuelve": se abre la puerta (puerta + campanita) y Nico
   saluda. Sin cartel 3D: "vuelve" ya está en el subtítulo.
10. **s09-mismos** 21,88 (2,04 s): grúa atrás a las dos fachadas (más cerca: se cortan los laterales, no los carteles ni las fichas); "cascos": los
    dos cascos suben y giran en espejo; "=" verde en el pilar; "clientes": 3 tarjetas iguales (Paula, Jorge, Carla,
    nombres de la lista del CRM) frente a cada vidriera. Paula deja la bici y entra al local.
11. **s10-sabia** 23,92 (2,40 s): "?" grises sobre las tarjetas de la izquierda; push-in a la derecha: en el estante
    de cada tarjeta lo que se llevó según el CRM (bici verde, luz delantera, inflador). Rótulo "lo que compró cada uno".
12. **s11-scalerics** 26,32 (2,55 s): CALLBACK: la tarjeta de Paula crece y es su ficha; "Scalerics": "no" se tacha;
    "armamos": el casco de la vidriera vuela y se apoya arriba de la ficha (el soporte se hunde en el pedestal),
    "Casco: sí ✓" con click + ding. Rótulo "CRM · Scalerics".
13. **s12-tu-local** 28,87 (2,53 s): la ficha de Paula se achica a la primera casilla de una grilla 2x2 y, ya chica,
    aparecen en sus casillas las fichas de tus clientes (Inés · Bici de ruta · "Luz: no"; Pablo · Bici eléctrica · "Candado: no"; Sara ·
    Bici de paseo · "Inflador: no"); "local?": los chips pasan a verde "Avisarle: luz/candado/inflador" (pings).
    "Agendá": el casco da un saltito y CORTE (CUT3) al cielo crema, con el subtítulo "Agendá una".
14. **s13-llamada** 31,40 (2,96 s): el casco solo, girando en el cielo crema (sin nada del 3D debajo). Tarjeta:
    "Videollamada" + "gratis" (recuadro verde) + banda navy "scalerics.com" en verde, que late con el chime.
