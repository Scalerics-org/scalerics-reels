# Reel "No soy un robot": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: AUTOMATIZACIONES (nombradas una vez por Orus al final).
Simulación de pantalla + personaje: la VERIFICACIÓN "NO SOY UN ROBOT" de las páginas web, como
personaje frío, burocrático y pasivo-agresivo (Kore). Gancho: "Verificación de seguridad. Demostrá
que no sos un robot. Porque de noche trabajás como uno." El dueño (Charon, cansado) hace clic,
"¡fácil!", y el captcha le pide las imágenes donde pasa pedidos del WhatsApp a la planilla a mano:
son todas. "Verificación fallida: actuás como un robot." "¡Pero si soy una persona! Tengo sueño,
tengo hambre y tengo el mate frío." Segundo intento: las imágenes donde escribe "tu pedido está
listo" uno por uno (Control C, control V...). "Fallida. ¿Extrañás los semáforos?" Tercer intento:
donde actualiza a mano el stock de la tienda. "¡Si no lo hago yo, no lo hace nadie!" "Misma tarea,
todas las noches, sin pensar. Ni en Matrix trabajan así." GIRO (el captcha): "Si el trabajo es de
robot, que lo haga un robot. Vos volvé a ser persona." Orus: en Scalerics automatizamos lo que hacés
a mano (pedido a la planilla, aviso, stock, reporte del día al celular). Captcha: "Verificación
completada. Sos una persona." Cierre: "Mandáselo al que no pasaría esta prueba."
Voz de 72.6 s (Kore, Charon, Orus), reel de 75.8 s.

## ESTILO: INTERFAZ DE VERIFICACIÓN WEB A PANTALLA COMPLETA (claro, limpio, de sistema)
El cuadro es una ventana de navegador: `compositions/ambiente.html` dibuja la barra del navegador
arriba (pestaña "Verificación de seguridad", barra de dirección genérica `tu-negocio.com/verificar`,
candado), un pie de página gris ("Privacidad · Condiciones", "ID de sesión" en mono) y la hora de
la compu abajo a la derecha (23:47 que avanza). En cada "fallida" el ambiente tiñe los bordes de
rojo y sacude; al final se pone verde. Las escenas son la UI del desafío: la tarjeta con la casilla
"No soy un robot" y el ESCUDO CON OJOS (el personaje del captcha, genérico, nada de logos reales),
la cuadrícula 3x3 con encabezado azul, el botón VERIFICAR, tildes, cruces, carteles de error, el
cursor flecha. Las imágenes de la cuadrícula son dibujos de líneas oscuras (el dueño de noche en la
compu, chats, planillas, cajas). Nada quieto más de ~1 s; palabras clave grandes en su palabra.

## Paleta (SOLO estos colores)
- Fondo gris claro `#e9edf3`, blanco `#ffffff` (tarjetas), borde `#c9d1dc`.
- Tinta `#1d2433` (texto y trazos de los dibujos), gris `#6b7689` (secundario).
- Azul interfaz `#2f6fed` (encabezados, botón, selección; acento de los subtítulos).
- Verde tilde `#1fae5b` (lo aprobado). Rojo error `#e5484d` (lo fallido).

## Tipos de letra
Lexend 400-900 (UI y textos grandes), IBM Plex Mono 500 (rótulos, código, "ID de sesión").

## Zona
Barra del navegador y 0-190 (ambiente). Subtítulos y 236 a ~430 (tinta, acento azul). Escenas
entre y 540 y 1560, x 60-1020. Logo de Scalerics (oscurecido) en y ~1746: no tapar.

## El lenguaje visual (manda sobre SPEC-base)
- Fondo transparente: la escena no pinta fondo (lo pinta el index + ambiente).
- Tarjetas: blanco, borde 3px `#c9d1dc`, radio 14px, sombra suave (aceptada en este estilo: es UI).
- Dibujos: trazo `#1d2433`, 5px, caps redondos, relleno blanco o nada; se DIBUJAN con `dibujar()`.
- Lo que aparece entero hace `pop()`. Tildes verdes que se dibujan; cruces rojas.
- Entrada en los primeros 0.3 s; salida en los últimos 0.25 s con opacity 0 + blur(6px).
- Prohibido: emojis, fotos, logos reales (nada de reCAPTCHA ni de marcas), rayas largas.
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


## Brief por escena (tiempos relativos: ver tiempos.md)
- s01-verificacion (5.62): tarjeta grande de verificación en el centro (y ~760-1100): casilla vacía,
  "No soy un robot", el escudo con ojos a la derecha. "Verificación de seguridad" título arriba de la
  tarjeta (0.0). "robot" (2.60): los ojos del escudo se entrecierran mirando a cámara. "Porque de
  noche" (3.19): la tarjeta se oscurece un toque, aparece una luna chica; "trabajás como uno" (3.80):
  sello rojo "COMO UNO" girado sobre la tarjeta + sacudón.
- s02-clic (2.88): la misma tarjeta; "¿Qué?" signo; "fácil" (1.20) entra el cursor flecha desde abajo
  a la derecha hasta la casilla; "Clic" (2.15) click: la casilla hace un spinner azul que gira.
- s03-cuadricula (4.89): el desafío: encabezado azul "Seleccioná todas las imágenes donde pasás
  pedidos a la planilla" + cuadrícula 3x3 de dibujos (chat → flecha → planilla, el dueño con
  ojeras, reloj 23:47) que caen en cascada (0.0-1.2). "WhatsApp" (2.60) los globos de chat de las
  celdas laten; "planilla" (3.10) las planillas se llenan; "A mano" (4.04) una mano dibujada.
- s04-todas (4.25): el cursor marca celdas: 0.00, 1.02, 1.47 (tilde azul en la esquina); después
  marca rápido el resto (1.9-3.1); "¿Son todas?" (3.27) las 9 seleccionadas, contador "9 de 9".
- s05-fallida (3.96): "Son todas" el botón VERIFICAR se apreta; "Verificación fallida" (1.09)
  cartel rojo con cruz que golpea, sacudón; "actuás como un robot" (2.50) el escudo con ojos
  enojados + rótulo "COMPORTAMIENTO: ROBOT".
- s06-persona (5.49): el dueño dibujado (busto, ojeras, pelo revuelto) protesta "¡SOY UNA
  PERSONA!" (0.79). Lista de pruebas con casillas: "sueño" (2.09) zzz, "hambre" (2.99) plato
  vacío, "mate frío" (4.20) mate con escarcha; cada una se tilda.
- s07-segundo (5.72): "Anotado." (0.0) un campo que escribe "excusa registrada"; "Segundo intento"
  (1.00) rótulo "INTENTO 2 DE 3"; cuadrícula de globos "Tu pedido está listo" a nombres distintos;
  "uno por uno" (4.72) se marcan de a uno.
- s08-ctrl (4.76): teclas gigantes CTRL + C y CTRL + V que se hunden en cada palabra (0.0, 0.5,
  0.7, 0.96, 1.50, 2.06, 2.60, 3.01) y un contador de mensajes enviados que sube; "¡Listo!" (3.60)
  sello azul LISTO.
- s09-semaforos (3.21): "Fallida" (0.0) cruz roja grande y sacudón; "¿Extrañás los semáforos?"
  (1.14) cuadrícula nostálgica de semáforos dibujados con un corazón chico.
- s10-stock (4.07): "INTENTO 3 DE 3" (0.0); cuadrícula: cajas del local con flecha a la tienda
  online, el dueño contando; "stock" (2.69) el número que cambia a mano; "tienda" (3.19) la
  pantalla de la tienda.
- s11-nadie (2.42): el dueño golpea el escritorio, "¡NADIE!" gigante rojo (1.50) + sacudón.
- s12-matrix (5.52): un calendario de noches que se repiten en bucle (0.0-2.5) con "23:47" en cada
  una; "Matrix" (3.80) lluvia de caracteres verdes cayendo hecha de "Ctrl C Ctrl V" (genérica).
- s13-giro (5.58): "¿Y entonces qué hago?" el dueño chico con signos de pregunta; "Si el trabajo es
  de robot" (1.85) el escudo habla calmado; "que lo haga un robot" (3.08) un brazo robot dibujado
  agarra la pila de tareas; "Vos volvé a ser persona" (3.97) la casilla "Soy una persona" se tilda verde.
- s14-automatizamos (9.71): "Scalerics automatizamos" (0.54/1.07) título; cuatro filas que se
  tildan solas: pedido → planilla (2.70), aviso "tu pedido está listo" (4.50), stock tienda (5.90),
  reporte del día al celular (7.50). Todo verde.
- s15-cta (7.69): la tarjeta con la casilla tildada verde "Verificación completada" (0.50), "Sos una
  persona" (1.25); "Mandáselo" (2.38) botón azul con flecha de compartir y texto "al que no
  pasaría esta prueba".
