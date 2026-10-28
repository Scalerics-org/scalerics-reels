# Reel "Antes de entrar" · spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace sitios web,
bots de WhatsApp, puntos y tiendas online para comercios). Le dice al dueño de un comercio al que
le va bien: "tu cliente decide si te compra antes de pisar tu local". Lo decide en el sillón de su
casa, con el celular. No lo decide el mostrador, ni el precio, ni lo bien que atendés: lo decide lo
que encuentra cuando te busca. Si ve qué vendés, a qué hora abrís y cómo llegar, sale con ganas de
comprarte; si encuentra poco o una foto de hace años, duda, y se va al otro. Y vos nunca te enterás
de los que decidieron no venir. Producto: sitios web para comercios (que te encuentren, que muestren
lo que hacés, horarios y cómo llegar, y que desde ahí te escriban al WhatsApp o te compren en la
tienda online). Locución de 55.5 s, ritmo rápido. Mismo estilo que los reels aprobados
(`../el-de-enfrente/`, `../el-sobrino/`, `../nadie-te-encuentra/`).

Recurso central del reel: **la decisión se toma en el sillón, no en la puerta**. Piezas que se repiten:
- **EL CLIENTE EN EL SILLÓN**: figurita de líneas (cabeza r 22, cuerpo de palitos como
  `../el-sobrino/compositions/s05-primero.html`) sentada en un sillón de líneas (respaldo
  redondeado, dos apoyabrazos, patitas), con el celular en la mano a la altura de la cara. Va a la
  IZQUIERDA cuando comparte cuadro con el local.
- **EL LOCAL**: la fachada de `../el-sobrino/compositions/s01-sobrino.html` (toldo ondulado, cartel
  "TU LOCAL", dos vidrieras con vidrio verde, puerta). Lejos y apagado (0.45) mientras el cliente
  decide; se prende (vidrios verdes) cuando el cliente decide venir. Va a la DERECHA.
- **EL GLOBO DE LA DECISIÓN**: globo de diálogo sobre la cabeza del cliente con un tilde verde
  (viene) o un "?" (duda).
- **LA PÁGINA** en un celular (rx 52): *completa*: cabecera con localcito + "Tu Local", filas con
  ícono verde (bolsa + "Lo que vendés", reloj + "Abierto hoy", pin + "Cómo llegar") y botón verde
  "Escribinos" (como `../el-sobrino/compositions/s10-scalerics.html`). *Pobre*: casi vacía, dos
  renglones apagados y una foto vieja (marco con esquina doblada, telaraña), todo crema apagado y
  SIN verde.
- **EL OTRO**: un segundo local igual pero con cartel "EL OTRO", para cuando el cliente se va.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-decide.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helpers `dibujar()`, `pop()`, `badge()`, `etiqueta()` y tono visual.** Define el cliente
  en el sillón, el local y el globo de la decisión: reusalos.

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



## Tiempos
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 58.73 (la voz termina en
55.53).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-decide** (4.29 s) · "Tu cliente decide si te compra antes de pisar tu local." Izquierda
(x≈290): el cliente en el sillón arranca medio dibujado, con el celular en la mano. Derecha
(x≈800, escala 0.8): el local lejos y apagado. En "decide" (0.50) sale el globo de la decisión
sobre la cabeza del cliente, con los "..." latiendo; en "compra" (1.50) los puntos se cambian por
un tilde verde que se dibuja con golpe. En "antes de pisar" (2.37–2.80) una fila de pasos
(puntitos) va del sillón hacia la puerta del local, pero el cliente NO se mueve; en "local" (3.30)
el local se prende (vidrios verdes) y hace golpe. Etiquetas: "YA DECIDIÓ" → "ANTES DE ENTRAR".

**s02-sillon** (3.36 s) · "Lo decide en el sillón de su casa, con el celular en la mano." El
cliente en el sillón grande al centro (escala ~1.3). En "sillón" (0.61) el sillón hace golpe; en
"casa" (1.11) se dibuja alrededor el contorno de una casa (techo a dos aguas, paredes) con una
lámpara de pie al costado y una ventanita; en "celular" (1.91) el celular de la mano se agranda con
un aro verde y salen dos ondas verdes. Etiquetas: "EN SU CASA" → "CON EL CELULAR".

**s03-no-es** (4.30 s) · "No lo decide tu mostrador. Ni tu precio. Ni lo bien que atendés." Tres
íconos en fila (como `../nadie-te-encuentra/compositions/s04-no-es.html`), cada uno con badge X en su
palabra: un mostrador con caja registradora ("mostrador" 0.65), una etiqueta de precio con "$"
("precio" 1.95), una campanita de mostrador ("atendés" 3.35). Cada uno se dibuja un poco antes de
su palabra y se apaga a 0.45 cuando recibe la X. Etiqueta "NO LO DECIDE".

**s04-te-busca** (2.62 s) · "Lo decide lo que encuentra cuando te busca." Celular grande al
centro. En "decide" (0.15) se dibuja; adentro, una barra de búsqueda con lupa verde; en
"encuentra" (0.75) aparecen tres resultados (renglones con un cuadrito) y el primero se resalta con
un aro verde; en "busca" (1.75) la lupa hace golpe y se mueve sobre los resultados. Etiqueta "LO
QUE ENCUENTRA".

**s05-ve-todo** (5.96 s) · "Si ve qué vendés, a qué hora abrís y cómo llegar, sale de su casa con
ganas de comprarte." Parte A (0–3.3): celular al centro con la página COMPLETA; las filas entran
cada una en su palabra con ícono verde: bolsa + "Lo que vendés" ("vendés" 0.43), reloj + "Abierto
hoy" ("hora" 1.43), pin + "Cómo llegar" ("llegar" 2.53), cada una con un tilde verde chico a la
derecha. Etiqueta "VE TODO". Parte B (3.39–5.96): el celular se achica y se va arriba a la
izquierda; abajo, el cliente parado (figurita) a la izquierda y el local a la derecha; en "sale"
(3.39) el cliente camina hacia el local dejando pasos verdes; en "ganas" (4.53) el globo con
tilde verde sobre su cabeza; en "comprarte" (4.83) el local se prende con golpe. Etiqueta "SALE
CON GANAS".

**s06-duda** (7.31 s) · "Si encuentra poco, o una foto de hace años, duda. Y el que duda se va al
otro: al que le mostró todo antes." Parte A (0–3.1): celular al centro con la página POBRE. En
"poco" (0.47) aparecen apenas dos renglones apagados (y mucho vacío); en "foto" (1.47) cae una foto
vieja torcida con esquina doblada; en "años" (1.97) se dibuja una telaraña en la esquina del celular
y la foto se apaga; en "duda" (2.87) un "?" verde grande hace pop al costado. Etiqueta "POCO Y
VIEJO". Parte B (3.17–7.31): suelo; TU LOCAL a la izquierda (apagado), EL OTRO a la derecha; el
cliente parado al centro con el globo "?". En "duda" (3.97) el cliente se da vuelta para un lado y
para el otro; en "otro" (4.57) camina hacia EL OTRO; en "mostró todo" (5.47–5.77) sobre EL OTRO
sale un celular chico con la página completa y un tilde verde; las vidrieras del otro se prenden y
TU LOCAL se apaga más. Etiquetas: "DUDA" → "SE VA AL OTRO".

**s07-nunca** (3.76 s) · "Vos te enterás de los que entran. De los que decidieron no venir,
nunca." TU LOCAL al centro, prendido. En "entran" (0.96) dos figuritas entran por la puerta (pop +
deslizan hacia la puerta) y al lado del local aparecen dos palitos de conteo verdes. En
"decidieron no venir" (2.06–2.56) alrededor, lejos, aparecen varias figuritas con celular en
crema muy apagado (0.3), que no se acercan; en "nunca" (3.52) un ojo de línea sobre el local se
cierra (párpado). Etiquetas: "LOS QUE ENTRAN" → "LOS QUE NO, NUNCA".

**s08-sistema** (6.73 s) · "No es suerte ni es caro. Es tener un sistema: tu local abierto en el
celular de todos." Un trébol de cuatro hojas de línea ("suerte" 1.10) y una etiqueta de precio con
"$" ("caro" 2.00), cada uno con badge X. En "sistema" (3.30) los dos se van y se dibuja el engranaje
que gira (el de `../tarjeta-que-nadie-lee/compositions/s09-sistema.html`). En "local" (4.30) el
engranaje se achica y se va arriba; al centro un celular con el local chiquito adentro; en
"abierto" (4.60) cuelga un cartelito "ABIERTO" verde que se balancea; en "celular de todos"
(5.20–5.80) aparecen dos celulares más a los costados (más chicos) con el mismo local adentro.
Etiquetas: "NO ES SUERTE" → "ES UN SISTEMA" → "ABIERTO EN TODOS".

**s09-scalerics** (3.30 s) · "En Scalerics hacemos sitios web para comercios." Arriba (y≈650) la
caja redondeada con "Scalerics" (Lexend 700 ~62px) desde el principio, y debajo "SITIOS WEB PARA
COMERCIOS" mono verde en "sitios" (1.37). Abajo un celular con la página completa que se arma en
"sitios web" (1.37–1.77), y en "comercios" (2.17) un localcito verde en la cabecera hace golpe.
Etiqueta "SITIOS WEB".

**s10-encuentren** (4.68 s) · "Que te encuentren, que muestren lo que hacés, tus horarios y cómo
llegar." Celular grande al centro (~360x620). Se arma de arriba abajo en sus palabras:
"encuentren" (0.17) barra de búsqueda con lupa verde y "Tu Local" como primer resultado con pin
verde; "hacés" (1.77) grilla de 2x2 productos (cuadritos con dibujitos de línea); "horarios"
(2.67) fila reloj verde + "Abierto hoy"; "llegar" (3.77) fila pin verde + "Cómo llegar" y una
flechita. Etiquetas: "QUE TE ENCUENTREN" → "TODO A MANO".

**s11-decidido** (6.86 s) · "Y que desde ahí te escriban al WhatsApp o te compren en tu tienda
online. Así el cliente llega a tu local ya decidido." Parte A (0–3.9): celular con la página a la
izquierda (botones "Escribinos" y "Comprar"); en "escriban" (0.99) el botón "Escribinos" late y
sale un globo de chat que vuela a la derecha; en "WhatsApp" (1.49) a la derecha se arma una
conversación (tres globos alternados, uno verde); en "compren" (2.29) el botón "Comprar" late; en
"tienda online" (2.89) a la derecha aparece una bolsa con tilde verde y un ticket "PEDIDO". Etiquetas
"TE ESCRIBEN" → "TE COMPRAN". Parte B (4.06–6.86): suelo, el cliente a la izquierda y TU LOCAL a la
derecha; en "llega" (4.79) el cliente camina derecho a la puerta; en "decidido" (5.69) el globo
con tilde verde grande y el local se prende. Etiqueta "YA DECIDIDO".

**s12-cta** (5.56 s) · "Comentá WEB y te contamos cómo." (la voz termina en 1.9). El cierre
como `../nadie-te-encuentra/compositions/s12-cta.html`: "Scalerics" grande, "Sitios web para
comercios" debajo, píldora crema con texto navy: Comentá "WEB", pop en "Comentá", golpe en "WEB"
(0.33) y pulsos finitos. Sin salida con blur.
