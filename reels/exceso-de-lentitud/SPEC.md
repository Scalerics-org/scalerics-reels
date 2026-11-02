# Reel "Exceso de lentitud": spec

Reel vertical 1080x1920 de Scalerics. Producto: AGENTE DE IA (contesta al instante y a cualquier
hora con precios, stock y horarios; agenda turnos, toma pedidos y, si es para el dueño, le pasa la
conversación). Formato P: REALITY DE CONTROLES DE TRÁNSITO de noche en la ruta ("OPERATIVO
NOCTURNO · RUTA 1", "● EN VIVO"). La inspectora (Kore, seca) para al dueño (Charon, cansado) por
"exceso de lentitud".
Gancho (inspectora, primer segundo): "Bajá la ventanilla. ¿Sabés a qué velocidad venías
contestando?" Dueño: "¿Contestando? Venía tranquilo, oficial." Inspectora: "Demasiado tranquilo.
El radar te marcó: visto hace dos días. Exceso de lentitud. Esto no es Rápido y Furioso, querido:
es Lento y en Visto." Dueño: "¡Pero si era un mensajito nomás!" Inspectora: "Libreta y papeles.
¿Horarios? No figuran. ¿Precio? Acá dice: después te paso. ¿Cuándo es después?" Dueño: "Y...
después." Inspectora: "Soplá acá. Da positivo en: ahora no puedo." Dueño: "¡Estaba atendiendo el
local, oficial! ¡No puedo manejar el mostrador y el WhatsApp al mismo tiempo!" GIRO (inspectora,
humana): "Ya sé. Pero el límite no lo ponés vos. Lo pone tu cliente. Y tu cliente pregunta a las
once de la noche. Si no le contestás, dobla en la esquina. Y estaciona en el de enfrente." Entra
Orus (las balizas pasan a verde): agentes de IA que van a la velocidad de tu cliente... Inspectora:
"Puede circular." Cierre (Orus): "Etiquetá al que maneja su WhatsApp a diez por hora."
Voz de 70.4 s (12 parlamentos, ver `partes/`), total 73.6 s, 173 palabras.

Recurso visual central: la RUTA DE NOCHE con BALIZAS. Cielo azul noche con cerros y ruta en
perspectiva (fondo en `armar.mjs`), banquina con línea discontinua y conos naranjas en primer
plano, resplandor rojo y azul de patrullero que se alterna y un haz azul que barre la pantalla.
Utilería: el auto bordó del dueño con la ventanilla que baja, linterna, radar de mano con display
de 7 segmentos, panel "EN VISTO HACE 48 HS", póster de película, acta de infracción (libreta con
espiral), alcoholímetro con ticket, señal de límite de velocidad, mapa de la esquina.

## Estilo: control de tránsito nocturno
- `armar.mjs`: #fondo (cielo degradé azul noche con el horizonte), #estrellas, #cerros (silueta),
  #ruta (asfalto en perspectiva). Subtítulos hueso con sombra azul noche y acento ámbar #ffc23a.
- `compositions/ambiente.html` (encima de las escenas): balizas roja (izq.) y azul (der.)
  alternadas cada 0.36 s, haz azul que cruza cada ~3 s, banquina (y 1352-1432) con línea blanca y
  dos conos, cartel mono "OPERATIVO NOCTURNO · RUTA 1" y "● EN VIVO". Entra Orus (51.07): balizas
  apagadas, luz verde Scalerics, cartel "CONTROL SUPERADO". CTA "Etiquetá" (67.72): vuelven las
  balizas.
- Etiqueta de cada escena: cinta naranja reflectiva con texto mono azul noche (top 1452); verde
  en las escenas del agente.
- Personajes (`partes/escenas/pj.mjs`): la INSPECTORA (gorra azul con escudo dorado y cinta a
  cuadros, cola de caballo, camisa azul, chaleco naranja con franjas reflectivas, radio), el DUEÑO
  (unos 50, pelado con costados grises, bigote gris, ojeras, camisa celeste, gotas de sudor) y el
  AGENTE DE IA (celular verde con cara y auriculares, solo desde Orus).

## Paleta
- Azul noche `#0b1020` / `#1d2747` / `#070b18`: cielo, rellenos, asfalto `#161a27`.
- Rojo baliza `#ff3b4a`: sellos, tachados, luz izquierda, auto de la clienta.
- Azul baliza `#3d7bff` (y `#1e3a8a`): luz derecha, tildes de visto, camisa de la inspectora.
- Naranja cono `#ff8a1f`: conos, chaleco, acta, etiquetas.
- Ámbar display `#ffc23a`: dígitos del radar, carteles, acento de subtítulos.
- Hueso `#efeadf`: contornos y textos. Desde Orus: verde Scalerics `#5ce611`.

## Cómo están hechas las escenas
Se generan con `node partes/escenas/gen.mjs` (todas) o `node partes/escenas/gen.mjs s03 s07`
desde `partes/escenas/sNN.mjs` y `amb.mjs` (helpers golpe, pop, entra, sale, sacudon, dibujar,
hablar, parpadeo y el display de 7 segmentos `pinta`/`reloj` en `gen.mjs`; utilería en `pj.mjs`,
`velo.mjs` y `acta.mjs`). Después `node armar.mjs`.
Voz: `partes/voces.sh` (Gemini, una voz y un tono por parlamento), `partes/recortar.sh`
(silencios y atempo por voz), `tiempos.mjs` por parlamento (`partes/NN.json`) y
`partes/componer.mjs` (pega con silencios de 0.35-0.7 s, corrige a mano 04, 06, 07 y 09, y arma
`assets/voice/palabras.json`).

## Voces
Kore la inspectora (seca, de trámite; se ablanda en "Ya sé"), Charon el dueño (cansado,
nervioso, indignado), Orus narrador (la entrada y el cierre).

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


## Escenas (tiempos relativos; ver tiempos.md)
- **s01-ventanilla** (3.95): el auto bordó de costado con el dueño al volante; la inspectora a la
  derecha con la linterna (haz hacia la ventanilla). En "Bajá" el vidrio baja; en "velocidad" cae
  el cartel "CONTROL DE VELOCIDAD"; en "contestando" asoma el celular con "escribiendo..." y la
  linterna lo apunta, sudor. Etiqueta "Operativo: WhatsApp lento".
- **s02-tranquilo** (2.74): el dueño grande sonriendo forzado y un velocímetro de RESPUESTAS (de
  LENTO a AL DÍA) con la aguja pegada en LENTO; en "tranquilo" cartel "¡Venía tranquilo!".
  Etiqueta "El conductor".
- **s03-radar** (5.88): el radar de mano con display "---" que pasa a "000"; en "radar" se levanta
  y titila el led; en "visto" entra el panel "EN VISTO HACE __ HS" que sube a 48 en "dos días";
  en "Exceso" sello rojo EXCESO DE LENTITUD + sacudón. Etiqueta "Radar de respuestas".
- **s04-lento-visto** (3.62): póster de película; en "Rápido" título RÁPIDO Y FURIOSO con un auto
  que entra con rayas de velocidad; en "querido" tachado rojo; en "Lento" cambia a LENTO / Y EN
  VISTO con una tortuga ámbar y dos tildes azules, "PRÓXIMAMENTE · EN TU LOCAL". Etiqueta "La
  película de tu WhatsApp".
- **s05-mensajito** (2.78): el dueño indignado y su celular con un mensajito "¿Precio?" en visto
  "hace 2 días"; en "mensajito" la lupa; cartel "¡Era un mensajito!". Etiqueta "La defensa".
- **s06-libreta** (4.82): la inspectora y el ACTA Nº 2347: LIBRETA ✓ en "Libreta", PAPELES ✓ en
  "papeles", en "Horarios" la fila, en "No figuran" cruz roja y "no figuran" manuscrito.
  Etiqueta "Control de documentos".
- **s07-despues** (5.72): el acta se corre a la izquierda; fila PRECIO; en "después te paso"
  manuscrito «después te paso»; en "Cuándo" círculo rojo y signo de pregunta; en "Y..." asoma el
  dueño encogido con cartel "Y... después.".
- **s08-sopla** (3.79): el dueño sopla el alcoholímetro (aire); en "positivo" la pantalla dice
  POSITIVO y sale el ticket "RESULTADO · POSITIVO EN ???"; en "ahora no puedo" el ticket dice
  «AHORA NO PUEDO» + sacudón. Etiqueta "Espirometría".
- **s09-mostrador** (5.32): el dueño detrás del MOSTRADOR naranja con una cola de clientes
  (siluetas); en "WhatsApp" el celular que vibra y se llena, badge 9; en "al mismo tiempo" mira a
  un lado y al otro, sudor. Etiqueta "Un solo conductor".
- **s10-limite** (5.01): GIRO. La inspectora se ablanda (se acomoda la gorra, sonrisa) en "Ya
  sé"; la señal de límite; en "ponés vos" dice VOS y se tacha; en "Lo pone" la señal gira y dice
  LÍMITE / TU CLIENTE, cartel "Lo pone el cliente". Etiqueta "Ley de tránsito".
- **s11-esquina** (7.44): mapa de la esquina: TU LOCAL (luces apagadas), el autito rojo de la
  clienta con el globo "¿Tenés para hoy?"; en "once" el display 23:00; en "contestás" "✓✓ visto";
  en "dobla" el auto sube y dobla; en "estaciona" aparece ENFRENTE con luz y el auto frena ahí,
  sello SE FUE. Etiqueta "Tu cliente, a las 23:00".
- **s12-agente** (9.54): entra Orus: el AGENTE DE IA con halo verde; en "velocidad" el
  velocímetro y la aguja salta a AL DÍA (verde); en "Contestan" el chat "¿Tenés para hoy?" /
  "¡Sí! ¿A qué hora?" "al instante"; en "cualquier hora" display 23:00 → 01:00 → 03:00; en
  "precios", "stock", "horarios" tres chips verdes. Etiqueta verde "Tu agente de IA".
- **s13-turnos** (5.79): tarjetas "Turno agendado · Martes 10:00" y "Pedido tomado · Para retirar
  mañana"; en "si es para vos" entra el dueño sonriendo, globo "Esta es para vos" y flecha verde
  del agente al dueño. Etiqueta "Tu empleado de IA".
- **s14-cta** (7.2): "Puede circular": la inspectora saluda con la mano, sello verde PUEDE
  CIRCULAR. En "Etiquetá" entra la señal de límite con placa "TU WHATSAPP" y el botón ámbar
  "Etiquetalo"; en "diez" cae el 10 + sacudón; las balizas vuelven. Etiqueta "Próximo control".
