# Reel "La ventanilla": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: el SITIO WEB (rápido en el celular, menú a la
vista, horario al día, ubicación y botón a WhatsApp o a la tienda), nombrado una sola vez, al
final. Formato P (personaje de la cultura popular): SKETCH DE OFICINA PÚBLICA DE LAS DE ANTES. La
web vieja de un restaurante es un FUNCIONARIO DE VENTANILLA (manguitos, sello de goma, desgano)
que convierte ver el menú y el horario en un trámite.

Guion (14 parlamentos en `partes/`: `voces.sh`, `cortar.sh`, `componer.mjs`):
- ALTAVOZ (Kore, filtro de parlante viejo): "Para ver el menú de tu restaurante, tu cliente tiene
  que hacer un trámite. Número cuarenta y siete."
- GABRIELA (Leda): "¡Yo! Hola, tengo hambre. ¿Me muestra el menú?"
- FUNCIONARIO (Charon, desganado): "El menú se descarga en PDF. Formulario tres B. Por triplicado."
- G: "Pero estoy en el celular." F: "Haga zoom con dos dedos. Y espere que cargue."
- G: "Bueno… ¿a qué hora abren?" F: "Horario de atención: de nueve a seis. Actualizado en dos mil
  diecinueve. Vencido."
- G: "¿Y si les escribo por WhatsApp?" F: "WhatsApp no tenemos. Eso es en la otra ventanilla: el
  Instagram. Llame al fijo. O vuelva mañana."
- G: "Mañana ya no tengo hambre." GIRO, G en la vereda de enfrente: "Enfrente abrió al toque. El
  menú, el horario, cómo llegar, y un botón de WhatsApp. Ya pedí. Cero trámites."
- F, solo en la oficina vacía: "Número cuarenta y ocho. ¿Alguien?"
- NARRADOR (Orus): "Tu web es la primera ventanilla de tu local, y atiende a toda hora. En
  Scalerics hacemos sitios web rápidos en el celular: el menú a la vista, el horario al día, la
  ubicación y un botón a WhatsApp o a tu tienda. Contanos en los comentarios el trámite más
  absurdo que te hizo hacer un local para comprarle."
180 palabras. Voz de 67.64 s, reel de 70.84 s.

## RECURSO VISUAL CENTRAL: la VENTANILLA y el SELLO DE GOMA
La ventanilla vista de frente (marco gris, vidrio con reflejos y el círculo de agujeritos para
hablar, ranura para papeles, mostrador beige), con el funcionario detrás. Cada traba de la web
vieja es un sello rojo que cae con golpe: TRÁMITE, CARGANDO, VENCIDO, VUELVA MAÑANA. El numerador
rojo de 7 segmentos llama números (47 al principio, 48 a la oficina vacía). En el GIRO, la vereda
de enfrente: un celular a pantalla completa con una web limpia que abre al instante y el sello lo
pone Gabriela: "CERO TRÁMITES" (verde).

## ESTILO: OFICINA PÚBLICA DE LOS 80. Edición cargada, humor seco
Fondo del index (`armar.mjs`): cielorraso gris con ventilador, pared VERDE AGUA, friso de madera
beige con paneles (y 1180-1440), piso de baldosas grises en damero (y 1440-1670), zócalo oscuro con
el logo. `ambiente.html`: ventilador de techo girando, dos tubos fluorescentes (uno titila), luz
cenital, rayado de papel viejo, viñeta. Ilustración PLANA con contorno `#2a2b30` de 4-6 px.
Personajes genéricos dibujados (`assets/oficina.js`): el funcionario (pelado con costados grises,
anteojos gruesos, bigote, chaleco gris, corbata violeta, manguitos negros, sello de goma violeta)
y Gabriela (cola de caballo, campera violeta, hebilla roja). Movimiento: golpes de sello con
sacudón, pops, papeles que vuelan, el numerador que cambia. Nada quieto más de ~1 s.

## Paleta (SOLO estos colores)
- Verde agua `#8fc9b9` (claro `#b9e0d3`, oscuro `#5f9e8e`): pared, segunda hoja del triplicado.
- Beige `#e8dcc0` (papel `#f4ecd8`, sombra `#cbbd9c`): friso, mostrador, formularios.
- Gris `#6f7378` (tinta/contorno `#2a2b30`): marcos, chaleco, cielorraso.
- Rojo sello `#d63a2f` (numerador encendido `#ff4a36`; acento de subtítulos `#ff6150`).
- Tinta violeta `#5b3d8f` (claro `#7d5fb5`): sellos de tinta, letra de formularios, campera.
- Piel `#e3b88f` / `#e8b48c`, pelo `#3a2f3f` / `#b9bab3` (solo en personajes).
- Solo en s11 y s13-s15 (la web buena y Scalerics) se suma verde `#5ce611` (y `#3f9e0b` para sello).
Prohibido: emojis, fotos, rayas largas, logos reales (WhatsApp, Instagram solo como texto),
instituciones reales.

## Tipos de letra
Special Elite (máquina de escribir: formularios, carteles de papel), Black Ops One (sellos),
Lexend (carteles de ventanilla, UI de celular, globos), Caveat (algo escrito a mano), IBM Plex
Mono (detalles). Subtítulos: Lexend 600 crema con contorno duro `#2a2b30`, acento rojo.

## Zona
Subtítulos y 236 a ~420. Contenido de cada escena entre y 560 y 1440. Logo y ~1746.

## `assets/oficina.js` (cargarlo en cada escena después de GSAP)
- `OF.funcionario(x, y, s)`, `OF.gabriela(x, y, s, cara, brazo)` (cara normal/hambre/enojada/
  feliz), `OF.ventanilla(x, y, w, h)` (va después del funcionario), `OF.numerador(x, y, w, h)` +
  `OF.numero(tl, g, n, t)`: devuelven SVG para meter en un `<svg viewBox="0 0 1080 1920">`.
  Los personajes van envueltos en un `<g transform>`: animar `.of-f` / `.of-g` (los internos).
- Clases: `.of-sello` (+ `.violeta`, `.verde`), `.of-cartel`, `.of-form` (`.of-ft`, `.of-fs`,
  `.of-renglon`, `.of-caja`), `.of-globo`.
- `OF.kit(tl, root)`: `pop`, `golpe`, `sello(el, t, rot)`, `sellar(brazo, t)` (el brazo del
  funcionario pega el sello en t), `sacudon`, `dibujar`, `bostezo(cabeza, t)`, `salida`.

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

(En este reel manda el estilo de arriba sobre "El lenguaje visual" de SPEC-base: no hay líneas crema.)

## Escenas (tiempos relativos a cada escena; ver `tiempos.md`)

### s01-tramite (3.48 s): el gancho
La ventanilla con el funcionario ya está en el cuadro 0 (él sube desde atrás del mostrador); cartel
"VENTANILLA 1 · MENÚ" con golpe (0.12). "menú" 0.36: la cartita del menú aparece del lado de
ADENTRO del vidrio, fuera de alcance. "tu cliente" 1.8: papelito "SAQUE NÚMERO" pegado al vidrio.
"trámite" 2.68: él sella y cae el sello rojo gigante "TRÁMITE" con sacudón.

### s02-numero (1.88 s): el numerador
Numerador rojo de segmentos enorme colgado de la pared, con parlante al lado (ondas). "Número"
0.0: 46; "siete" 0.81: salta a 47 con destello y "ding". Abajo, el ticket de papel "47" que sale.

### s03-yo (3.00 s): Gabriela
Gabriela salta de la silla de plástico de la sala de espera con el ticket 47 en la mano levantada
("¡Yo!" 0.0). "hambre" 1.15: cara de hambre, rugido de panza (ondas en la barriga), globo con
plato y cubiertos. "menú" 2.02: globo "¿ME MUESTRA EL MENÚ?".

### s04-pdf (5.86 s): formulario 3B
Funcionario detrás del vidrio. "PDF" 1.73: un ícono de documento "MENÚ.PDF" (12 MB) cae en el
mostrador. "Formulario tres B" 2.87-3.95: por la ranura sale el formulario "FORMULARIO 3B ·
SOLICITUD DE MENÚ" (Special Elite). "triplicado" 4.55: se abren abanico tres hojas (papel, verde
agua, beige) y él les pone sello violeta.

### s05-celular (5.67 s): zoom y cargando
Celular gigante en primer plano (manos de Gabriela) con el PDF diminuto ilegible. "Haga zoom"
2.13: dos dedos que se abren y el PDF se agranda pixelado y corrido. "espere que cargue" 3.93-4.26:
barra de carga que no avanza / ruedita; sello "CARGANDO..." rojo en 4.26.

### s06-horario (8.01 s): vencido
"Bueno… ¿a qué hora abren?" 0-1.4: Gabriela con mano en la cara, reloj de pared que avanza.
"Horario" 2.47: el funcionario despega un cartel amarillento "HORARIO DE ATENCIÓN · 9 A 18".
"dos mil diecinueve" 5.62-6.05: abajo, "Actualizado: 2019" con almanaque viejo. "Vencido" 6.87:
sello "VENCIDO" con sacudón.

### s07-whatsapp (2.04 s): la pregunta
Gabriela con el celular y globo "¿Y SI LES ESCRIBO POR WHATSAPP?" (0.4-0.9), cara de esperanza.

### s08-otra (4.99 s): la otra ventanilla
"WhatsApp no tenemos" 0-0.81: cartel "NO TENEMOS" colgado en el vidrio. "la otra ventanilla"
2.27-2.45: el funcionario señala con la lapicera hacia la derecha: plano general con una segunda
ventanilla lejos, cartel "VENTANILLA 2 · INSTAGRAM", con una cola de gente dibujada. "Instagram"
3.81: la cola se alarga.

### s09-manana (2.87 s): vuelva mañana
"Llame al fijo" 0-0.28: un teléfono fijo de disco gris que suena (tiembla). "vuelva mañana"
1.23-1.55: la persiana de la ventanilla baja y queda el cartel/sello "VUELVA MAÑANA".

### s10-hambre (2.59 s): se va
Gabriela de frente, cara enojada, rompe el ticket 47 en dos ("hambre" 1.0) y los pedacitos caen.

### s11-enfrente (8.47 s): el giro
"Enfrente" 0.0: barrido de cámara: pasa la vereda, un celular a pantalla completa con una web
limpia que abre al instante (barra de carga llena en 0.3 s). "El menú" 1.82, "el horario" 2.73
("ABIERTO AHORA" verde), "cómo llegar" 3.73 (mapita con pin), "botón de WhatsApp" 4.55 (botón
verde). "Ya pedí" 5.73: tilde "PEDIDO ENVIADO". "Cero trámites" 6.43-6.82: sello verde "CERO
TRÁMITES" y Gabriela feliz a un costado.

### s12-alguien (3.99 s): la oficina vacía
Plano general: sillas vacías, el funcionario solo en la ventanilla, numerador pasa a 48 en
"ocho" 1.75. "¿Alguien?" 2.38: el funcionario mira a los costados; un papel cruza el piso con el
ventilador.

### s13-ventanilla (3.33 s): narrador
"Tu web" 0.17: la ventanilla se transforma en el marco de un celular. "primera ventanilla" 0.61-0.96:
cartel "VENTANILLA 1 · TU WEB". "a toda hora" 2.52-2.78: un reloj que gira rápido y "ABIERTO 24 H"
en verde.

### s14-sitio (6.84 s): lo que hacemos
Celular con la web de un restaurante genérico armándose: "rápidos" 1.45 (rayo / carga instantánea),
"menú" 2.84, "horario" 3.63, "ubicación" 4.32, "botón a WhatsApp" 5.02-5.37, "tienda" 6.06: cada
bloque entra con pop y una tilde verde.

### s15-cta (7.82 s): el cierre
Un formulario de la oficina convertido en invitación: "FORMULARIO 0 · TU TRÁMITE MÁS ABSURDO" con
renglones que se escriben solos (Caveat) y abajo un campo de comentario con cursor. "comentarios"
0.53: globo de comentario. "absurdo" 2.14: sello violeta "ABSURDO". Al final, el funcionario chico
asoma y sella "RECIBIDO".
