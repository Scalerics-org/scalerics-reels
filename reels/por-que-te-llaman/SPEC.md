# SPEC · por-que-te-llaman (explicador "¿Por qué…?", 33,31 s, 3D real)

> **Nota (ronda 2, 15-11):** el encabezado y "El lenguaje visual" son del plan original y quedan como contexto; los segundos del brief son los de la ronda 1 y lo que cambió en la ronda 2 está en la tabla "Ronda 2" de NOTAS-constructor.md, que manda.

**De qué trata.** "¿Por qué pedís un presupuesto y te llaman enseguida?": Rubén pide por la web el presupuesto de un
autoelevador y el celular ya suena. Respuesta: el interés se enfría rápido. Dato (Oldroyd, McElheran y Elkington, HBR
2011, ver `fuentes.md`): de más de 2.000 empresas, casi una de cada cuatro nunca contestó y las demás tardaron casi dos
días; llamar en la primera hora multiplicaba las chances de llegar al que decide. Giro: Rubén le compró al que llamó
primero… y tiene una consulta de Graciela de ayer sin responder. Solución: un CRM que la anota, avisa a Nico y le
vuelve a escribir solo (el mate que se había enfriado vuelve a humear). Cierre verde: videollamada gratis.

**Recurso visual central.** Una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro): la oficina vidriada de
Rubén arriba del depósito (de `reels/por-que-el-99`) y un RELOJ GIGANTE como piso (navy claro `#16243d` con aro, puntos y
bastones crema, agujas planas navy con borde crema que giran con la historia). Cámara Catmull-Rom continua de objeto en
objeto; cortes escondidos: celular del atril → celular gigante → mate; silla vacía → Rubén en la misma silla; fila roja
del monitor → fila roja de la ficha del CRM.

**Fondo y paleta.** Navy claro `#16243d` liso + reloj-piso de líneas crema; oficina de Rubén; cierre verde `#5ce611`.
Verde = a tiempo/resuelto (vapor, porción de la primera hora, tildes, cable). Rojo apagado `#c7655b` solo para el
problema (el buzón que nunca contestó, la fila "sin responder", la consulta antes del CRM). Lo que pierde: gris.

**Personajes.** Rubén = `ELENCO.ruben` (`assets/personajes.js`, copiado de `reels/ya-lo-cargo`, con `sentado`),
pelo de herradura de bolitas (solución de ya-lo-cargo). Graciela y Nico solo como nombres en pantalla.

**Capa HTML (gen.mjs).** Gancho Lexend 900 (140/140/136 px, "enseguida" en recuadro verde), subtítulos arriba al centro
(armar.mjs), rótulos: "pedido de presupuesto", crédito mono "Harvard Business Review · 2011", "23 % · nunca contestó"
(rojo), "las que contestaron", "1 hora después" (gris), "el que decide", "sale solo", tarjeta de cierre.

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


## Brief por escena (ronda 1, segundos globales; tabla de planos en NOTAS-constructor.md)
- **s01-gancho 0,00-2,55.** Por encima del hombro derecho de Rubén (sentado, corrido a su izquierda): el formulario
  "Pedir presupuesto · Autoelevador eléctrico", clic 0,42 → "Enviado ✓"; el mate en el escritorio; el celular grande del
  atril vibra a 1,21 ("Llamada entrante"); push-in al celular.
- **s02-se-enfria 2,55-4,27.** Corte escondido al celular gigante (mismo encuadre) que sube y se achica; nace el mate
  gigante con volutas de vapor; en "enfría" el vapor se despega y la yerba pasa a gris.
- **s03-que-tan 4,27-5,32.** El "?" verde cae (3,97) y queda grande y centrado.
- **s04-lo-midio 5,32-7,59.** El "?" gira y en su lugar nace el reloj de pie; las agujas llegan a las 12 en "llamar" y la
  porción de la primera hora sale verde en "primera" ("1 h"). Crédito "Harvard Business Review · 2011 · EE. UU.".
- **s05-el-que-decide 7,59-10,29.** El cable enrulado verde va de la porción a la silla de director; el gris ("1 hora
  después") queda corto; tildes alrededor de la silla; "el que decide".
- **s06-dos-mil 10,29-12,79.** De la silla despega el avión de papel; la cámara lo sigue hasta las empresas; bandada en
  "dos"; "2.241" en "mil". Crédito.
- **s07-nunca 12,79-15,86.** Cuatro buzones casi de frente; sobres; tres banderitas y tildes; "23 % · nunca contestó"; en
  "nunca" el cuarto se pone rojo, telaraña; push-in a los tres de la derecha.
- **s08-dos-dias 15,86-18,88.** El buzón rojo se va hacia atrás achicándose y adelante nace el reloj de las 42 h; sol y
  luna; "42 h"; "las que contestaron".
- **s09-ruben-compro 18,88-21,06.** Corte a la oficina: Rubén de frente en su silla, celular en la derecha, mate en la
  izquierda; corta la llamada.
- **s10-ruben-ayer 21,06-22,87.** Mira por encima del hombro (cabeza 0,4 rad + torso) la bandeja de atrás; en "ayer"
  (21,97) corte al inserto: el monitor entero con la fila roja de Graciela.
- **s11-crm 22,87-26,60.** Corte a la ficha del CRM entera (vertical): la consulta pasa de rojo a navy, los pasos
  "Anotado", "Aviso a Nico · 18:41" y "Seguimiento" pasan de gris a verde; campanita.
- **s12-escribe-solo 26,60-28,86.** Paneo al mate frío; el termo entra por la derecha y ceba; aparece "Graciela, te paso
  el presupuesto. ¿Lo vemos?" ✓✓; el vapor vuelve; "sale solo".
- **s13-llegar 28,86-30,58.** La burbuja se achica y entra la respuesta "¡Sí! ¿Me llamás?".
- **s14-cierre 30,58-33,31.** Fondo verde: "Videollamada / gratis / scalerics.com" y el mate humeando.
