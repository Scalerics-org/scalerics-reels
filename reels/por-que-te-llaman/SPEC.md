# SPEC · por-que-te-llaman (explicador "¿Por qué…?", 32,2 s, 3D real)

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


## Brief por escena (segundos globales; la tabla de planos real está en NOTAS-constructor.md)
- **s01-gancho 0,00-2,51.** Por encima del hombro derecho de Rubén (sentado en su silla de director): el monitor con el
  formulario "Pedir presupuesto · Autoelevador eléctrico" (Empresa / Teléfono / botón verde "Enviar"), clic a los 0,42 s
  → "Enviado ✓"; el mate en la mano izquierda sube a la altura del pecho; a 1,21 s el celular del atril vibra
  ("Llamada entrante · Ventas Autoelevadores") y Rubén gira la cabeza; push-in al celular.
- **s02-se-enfria 2,51-4,20.** Corte escondido al celular GIGANTE sobre el reloj-piso (mismo encuadre), que gira, se
  achica y deja el mate gigante (calabaza, virola, bombilla, yerba verde) con tres volutas de vapor verde claro. En
  "enfría" (3,14) el vapor se despega hacia arriba y se afina, la yerba pasa a gris oliva y las agujas del piso corren.
- **s03-que-tan 4,20-5,31.** Paneo rápido al "?" verde 3D que cae (3,90) y rebota sobre el reloj-piso.
- **s04-estudio 5,31-7,74.** El "?" se pliega y sale un avión de papel crema (con un sobre verde en el ala) que la
  cámara sigue; brota un campo de edificios chicos (ventanas crema); en "dos mil" el avión se vuelve una bandada que cae
  sobre los edificios; "2.241" 3D arriba. Crédito mono abajo.
- **s05-nunca 7,74-10,24.** Cuatro buzones en fila, un sobre a cada uno; tres levantan la banderita verde y suman una
  tilde; en "nunca" (8,82) el cuarto se pone rojo apagado, el sobre queda asomando y crece una telaraña. Push-in al rojo.
- **s06-dos-dias 10,24-13,46.** El buzón rojo gira y se achica mientras en su lugar nace un reloj de pie gigante; las
  agujas dan 42 horas, el sol y la luna cruzan arriba; "42 h" 3D en "casi" (12,29); rótulo "las que contestaron".
- **s07-primera-hora 13,46-14,94.** El reloj vuelve a las 12 y la porción de 12 a 1 sale en relieve verde ("1 h" 3D).
- **s08-el-que-decide 14,94-17,77.** Un cable de teléfono enrulado verde sale de la porción y va por el piso hasta una
  silla de director vacía; el cable gris "1 hora después" queda corto y flojo; tildes verdes alrededor de la silla
  (de 1 a 7). Termina de frente a la silla.
- **s09-ruben-compro 17,77-19,90.** Corte en la silla: Rubén sentado en la misma silla, girado hacia la cámara, mate en
  la izquierda y celular en la derecha (corta la llamada, "Llamada finalizada"); "Yo le compré al que llamó primero."
- **s10-ruben-ayer 19,90-21,67.** Rubén mira por encima del hombro la pantalla de atrás (la bandeja "Consultas" con la
  fila de Graciela en rojo); en "ayer" (20,81) corte al inserto de la pantalla, push-in a la fila roja.
- **s11-crm 21,67-25,34.** Corte escondido a la ficha del CRM (vertical): la fila roja pasa a navy ("Pedido de
  presupuesto · 18:40"), entran "Anotado ✓" (22,45) y "Aviso a Nico ✓ 18:41" (24,15) con una campanita verde.
- **s12-escribe-solo 25,34-27,60.** Paneo al mate gigante frío; el termo entra, se inclina y ceba; la burbuja
  "Graciela, ¿pudiste ver el presupuesto?" ✓✓ vuela desde la ficha; el vapor vuelve. Rótulo "sale solo".
- **s13-llegar 27,60-29,25.** La burbuja se va y entra la respuesta de Graciela: "¡Sí! Mandame 40 cajas."
- **s14-cierre 29,25-32,21.** Fondo verde: "Videollamada / gratis / scalerics.com" y un mate humeando abajo.
