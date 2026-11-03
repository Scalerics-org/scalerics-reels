# Reel "Lo pienso y te aviso" — spec

Reel vertical 1080x1920 de Scalerics, línea de Juan del 02-11 (público pymes, tono adulto, marca).
Formato motion persuasivo **"Caos → control"**. Producto: **agente de IA que hace el seguimiento**
del cliente que preguntó y no compró. El dolor NO es no contestar: Andrea, dueña de una mueblería
de barrio, contestó todo y bien; lo que pasa es que después del "lo pienso y te aviso" nadie vuelve
a escribir, porque la semana (local, proveedores, entregas) no da. Giro: el cliente no se fue, se
le pasó (y a cualquiera le pasa). El agente vuelve a escribir a los dos días con lo que preguntó
cada uno, contesta con precios, stock y días de entrega, y le pasa la charla a Andrea cuando está
para cerrar. Voces: Leda (clienta, 2 frases cortas) + Orus (narrador). 65.4 s de voz, 68.6 total.
Cierre: "Contanos en los comentarios: ¿cuál es el «lo pienso» más creativo que te dijeron?"

## Recurso visual central: la torre de "lo pienso"
Las tarjetas de chat de los clientes se apilan en una torre gris que se va apagando a lo largo de
la semana (caos); con el agente, cada tarjeta recibe su mensaje de seguimiento y la torre se
desarma en un panel ordenado en verde (control).
- **Pendiente** = crema apagado (opacity 0.35–0.5) y, solo en puntitos de alerta, rojo apagado
  `#b8574e`. Nada grande en rojo.
- **Resuelto / en seguimiento** = verde de marca `#5ce611`.
- s01–s07 casi sin verde (solo las tildes de "Andrea contestó todo": ella hace bien su parte).
  Desde s08 el verde gana la pantalla.

## Personajes y objetos (iguales en todas las escenas)
- **Andrea** (dueña): figura de líneas crema con origen en los pies, como Diego de `lunes-nueve`
  pero con pelo recogido en rodete, lápiz detrás de la oreja y chapita verde "ANDREA". ~340 px a
  escala 1.
- **Agente de IA**: el mismo de `lunes-nueve` (cabeza-pantalla 170x140 rx 44, ojos verdes, antena
  con punto verde, torso con "IA").
- **Tarjeta de chat** (la unidad de la torre): rect 560x96 rx 24, avatar círculo r 26 con la
  inicial (Lexend), la frase del cliente (Lexend 600, 32px) y el producto en mono 22 arriba.
  Los cuatro clientes, siempre los mismos:
  - S · Sole · "Lo pienso" · SOFÁ 3 CUERPOS
  - M · Martín · "Después te confirmo" · MESA EXTENSIBLE
  - G · Gabriela · "Lo hablo con mi marido" · SOMMIER 2 PLAZAS (la que contesta "¡Sí!")
  - P · Pablo · "¿Me lo guardás?" · RACK DE TV
  Más tarjetas de relleno sin texto (solo avatar y rayitas) para que la torre crezca.
- **Celular** (s01, s09): rect rx 52 crema, 420x780, barrita arriba; burbujas de chat adentro.

## Capa `compositions/ambiente.html` (toda la duración, track 4)
Encabezado arriba (y ~128-186, por encima de los subtítulos): a la izquierda punto rojo apagado y
"SIN SEGUIMIENTO" en crema apagado; en "Ahora" (33.58 s) pasa a punto verde y "CON AGENTE DE IA".
A la derecha el día de la semana en mono: LUN (desde "semana" 6.4) → MAR 9.0 → MIÉ 10.4 → JUE 11.9
→ VIE en "viernes" 24.3; en "misma semana" (34.5) se rebobina a LUN; en "dos días" (36.8) MIÉ ·
+2 DÍAS; en "torre se ordena" (53.2) VIE en verde. Línea finita debajo (verde desde "Ahora").

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



## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

### s01-aviso (4.74 s) · el gancho
Celular centrado (x 330-750, y 600-1200) ya medio dibujado en el cuadro 0. Burbuja de la clienta
(izquierda) "Lo pienso y te aviso." que hace pop en "pienso" (0.10) y una burbuja del local más
arriba con tilde doble verde (ya contestó). En "¿Cuántas ventas" (1.72) el celular se corre a la
izquierda y a la derecha se dibuja una etiqueta de precio con un signo $; en "esperando" (2.70)
debajo de la burbuja aparece "escribiendo..." apagado con tres puntitos que laten, y un reloj de
arena chico que gira. En "respuesta" (3.40) los tres puntitos se apagan (nadie escribe).
Etiqueta: LO PIENSO Y TE AVISO → ¿CUÁNTAS VENTAS? → ESPERANDO.

### s02-muebleria (3.14 s)
Fachada de la mueblería (toldo a rayas de líneas, vidriera con un sofá y una lámpara, cartel
MUEBLERÍA en mono). Se dibuja en "mueblería" (0.16). En "semana" (1.66) debajo aparece una tira de
semana LUN MAR MIÉ JUE VIE SÁB con LUN marcado. Etiqueta: MUEBLERÍA DE BARRIO → UNA SEMANA.

### s03-excusas (5.31 s)
Las cuatro tarjetas de chat caen una sobre otra formando la base de la torre (x 540, y 1150 hacia
arriba): Sole "Lo pienso" (0.12), Martín "Después te confirmo" (1.32), Gabriela "Lo hablo con mi
marido" (3.02), Pablo "¿Me lo guardás?" (4.12). Cada una con notification; entre una y otra caen
dos de relleno. Etiqueta: el día de cada una: LUN → MAR → MIÉ → JUE.

### s04-andrea (3.01 s)
Andrea a la izquierda (pies y 1200) con el celular en la mano; a la derecha la torre en chico. En
"contestó" (0.31) a cada tarjeta le sale una respuesta corta con tilde doble verde, en cascada;
en "todo" (1.09) tilde grande. En "buena onda" (2.61) Andrea sonríe y salta un destello verde.
Etiqueta: CONTESTÓ TODO → CON BUENA ONDA.

### s05-semana (8.05 s)
Andrea al centro con la semana encima: en "local" (1.70) se dibuja el mostrador y un cliente a la
izquierda; en "proveedores" (2.70) una caja con remito arriba a la derecha; en "entrega" (3.50) un
camioncito de líneas con SÁB que entra por la derecha. Andrea gira de uno a otro. En "volver a
escribirle" (4.80) arriba aparece un post-it "ESCRIBIRLES" y en "mañana" (7.00) se le pega una
flecha y salta al día siguiente en la tira de días, apagado. Etiqueta: EL LOCAL → PROVEEDORES →
ENTREGAS → QUEDA PARA MAÑANA.

### s06-torre (3.74 s)
La torre a pantalla completa (y 640-1200), alta y un poco torcida: en "viernes" (0.05) cae otra
tanda de tarjetas; en "torre" (1.55) se balancea; en "apagando" (2.75) las tarjetas de abajo
hacia arriba bajan a opacity 0.25, cada una con un puntito rojo apagado. Etiqueta: VIERNES →
LA PILA SE APAGA.

### s07-se-paso (5.59 s) · el giro
Cuatro avatares de los clientes en fila (y ~820) con su producto en un globito de pensamiento
(sofá, mesa, sommier, rack): en "no se fueron" (1.05) el globito titila (lo siguen queriendo).
En "se les pasó" (2.00) cada uno tiene su propia agenda llena que se dibuja encima (rayitas de
calendario). En "semana llena" (3.31) aparece Andrea en el medio con la suya. En "cualquiera"
(4.61) los cinco se alinean, tranquilos. Etiqueta: NO SE FUERON → SE LES PASÓ → LE PASA A CUALQUIERA.

### s08-agente (6.39 s)
En "misma semana" (0.92) la torre apagada vuelve y la tira de días se rebobina (flecha verde de
rebobinar). En "agente" (1.92) pop del agente de IA a la izquierda (x 280) con chapita "EQUIPO".
En "dos días" (3.22) cartel verde +2 DÍAS. En "escribe" (4.02) de su mano sale una línea verde a
cada tarjeta de la torre (a la derecha), que se prenden en verde una por una con un ícono de
mensaje enviado; en "preguntó" (5.32) cada tarjeta muestra su producto en verde.
Etiqueta: MISMA SEMANA → AGENTE DE IA → A LOS 2 DÍAS → CON LO QUE PREGUNTÓ.

### s09-sommier (6.74 s)
Celular grande (420x780) con el chat de Gabriela. Encabezado "Gabriela · SOMMIER 2 PLAZAS". En
"Pudiste" (0.0) se tipea la burbuja verde del agente: "¿Pudiste ver el sommier de 2 plazas?"; en
"Quedan" (2.24) segunda burbuja "Quedan en gris y en azul." con dos muestras redondas (gris =
crema 0.45, azul = navy claro `#2b4a78`) que hacen pop en "gris" (2.53) y "azul" (3.13). En "¡Sí!"
(4.01) la respuesta de ella hace pop (crema) con un pequeño salto; en "sábado" (5.93) "llega
para el sábado?" completa. Etiqueta: SEGUIMIENTO → ¡SÍ!

### s10-cierra (6.19 s)
El agente a la izquierda contesta: tres fichas que hacen pop en "precios" (0.69) "$ PRECIO",
"stock" (1.61) "STOCK · 2 EN GRIS", "entrega" (2.69) "ENTREGA · SÁB". En "cerrar" (4.29) un
termómetro/medidor de la charla llega a verde "LISTA PARA CERRAR"; en "pasa" (4.99) la tarjeta de
Gabriela vuela por una flecha verde hasta Andrea, a la derecha, que la agarra; en "Andrea" (5.79)
chapita ANDREA y destello. Etiqueta: PRECIOS · STOCK · ENTREGA → PARA CERRAR → A ANDREA.

### s11-panel (3.55 s)
La torre apagada (vuelve en el cuadro 0) se desarma en "ordena" (1.00): las tarjetas vuelan a un
panel "SEGUIMIENTO · ESTA SEMANA" (y 640-1200) con cuatro filas: Sole · SOFÁ · RESPONDIÓ;
Martín · MESA · LE ESCRIBE EL JUEVES; Gabriela · SOMMIER · PARA CERRAR (resaltada); Pablo · RACK
· GUARDADO HASTA EL SÁB. Tildes verdes en "seguimiento" (2.60). Etiqueta: CADA LO PIENSO →
CON SEGUIMIENTO.

### s12-cta (12.11 s)
"Scalerics" (0.05): caja de marca (Lexend 700) con AGENTES DE IA debajo; en "empleado" (3.15) el
agente con chapita EMPLEADO y en "sin horario" (4.0) un reloj chico con aguja girando y "24 H".
En "Contanos" (4.65) todo sube y aparece un campo de comentario que tipea
"Lo consulto con mi perro y te aviso"; en "creativo" (7.65) se manda (tilde verde) y queda una
burbuja con un pulso suave hasta el final. Etiqueta: UN EMPLEADO MÁS → CONTANOS EL TUYO.
