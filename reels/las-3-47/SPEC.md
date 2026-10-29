# Reel "Las 3:47": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: AGENTE DE IA (uno solo, nombrado por Orus al final).
Thriller nocturno contado desde la pantalla de un celular. Gancho con morbo, susurrado por el
propio agente (Kore): "Son las 3:47 de la mañana. Vos estás roncando. Y alguien está vendiendo en
tu local." El dueño (Charon) murmura dormido "pasá el lunes"; el agente lo calma ("Shh. Dormí. Yo
me encargo."). Sofi (Leda), insomne, escribe por WhatsApp preguntando por la freidora de aire
grande; el agente contesta al instante (precio, stock), ella no lo puede creer y compra dos ("una
es para mi madre"), el agente agenda el retiro a las 10 y ella le dice "sos un ángel": "Ángel no.
Agente de IA." Le deja al dueño una nota: "Vendí dos. Dormí tranquilo." La pantalla se apaga.
GIRO: 7:00, alarma, el dueño se despierta en pánico ("¿Qué me perdí?") y no se perdió nada: "Vos
roncaste. Yo vendí." Cierra Orus: un agente de IA atiende a cualquier hora, con tus precios y tu
stock, toma el pedido y te lo deja listo para la mañana. "Guardalo y mostráselo mañana a tu socio.
Si se despierta." Voz de 67.7 s (Kore, Charon, Leda, Orus), reel de 70.9 s.

## ESTILO: CELULAR A PANTALLA COMPLETA, modo oscuro nocturno. Edición CARGADA.
El cuadro entero ES la pantalla de un celular: `compositions/ambiente.html` dibuja el marco
redondeado, la isla negra arriba, la barra de estado (hora 3:47 que pasa a 7:00, señal, wifi,
batería ámbar), "NO MOLESTAR" en mono violeta, la barrita de inicio abajo, la luz azul que respira,
la PANTALLA APAGADA (negro con reflejo, 44.66-45.63) y el FLASH + amanecer ámbar desde 45.63.
Las escenas son lo que se ve en la pantalla: pantalla de bloqueo, notificaciones que caen,
el chat genérico (sin logo ni marca: burbujas, "escribiendo...", tildes), tarjetas de pedido,
la nota para el jefe, la alarma. Nada quieto más de ~0.8 s; palabras clave gigantes en su
palabra exacta; sacudones en los golpes.

## Paleta (SOLO estos colores)
- Azul noche `#0a0f2c` / `#05061a` (fondos), panel `#141a46` / rgba(30, 38, 90, 0.78) (tarjetas).
- Violeta `#8b5cf6` / lavanda `#a78bfa`: el agente de IA (sus burbujas, su ícono, rótulos).
- Blanco frío `#e8f0ff` (textos), gris azulado `#b9c3f0` (textos secundarios).
- Ámbar `#ffb547`: el acento (la hora, la venta, la alarma, lo que pica). También acento de subtítulos.
- Burbuja de la clienta: `#232a5e`.

## Tipos de letra
Lexend (200 para el reloj gigante, 600-900 para lo grande), IBM Plex Mono 500 para rótulos.

## Zona
Barra de estado y. 30-140 (ambiente). Subtítulos y 236 a ~420. Escenas entre y 560 y 1520,
x 60-1020. Logo de Scalerics en y ~1746 (no tapar).

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


## Escenas (tiempos exactos por palabra en `tiempos.md`)

**s01-bloqueo** (4.20). Pantalla de bloqueo: "3:47" gigante (Lexend 200) que late en "3:47" con eco ámbar y sacudón; "DE LA MAÑANA" en "mañana"; en "vos estás roncando" cae la tarjeta "Modo dormir · Vos: roncando desde las 23:58" y suben tres Z ámbar.
**s02-local** (4.28). Frente del local de noche en líneas, persiana baja, cartel ámbar "CERRADO" que se hamaca, luz violeta por la rendija. "ALGUIEN" gigante en "alguien"; en "vendiendo" cae la notificación ámbar "Venta nueva · Mientras vos dormías"; "EN TU LOCAL" en "local".
**s03-ronca** (4.99). App "Tu sueño" grabando: onda de ronquido violeta que sube en tres olas; transcripción "Hablás dormido": "Mmm... está cerrado..." (en "cerrado") y "...pasá el lunes..." (en "pasá", "lunes" ámbar que brilla).
**s04-encargo** (3.37). El agente despierta: orbe violeta con onda. "SHH." violeta en 0, "DORMÍ." en "Dormí"; en "yo me encargo" sube la tarjeta "AGENTE DE IA · Me encargo" y el interruptor se prende ámbar en "encargo".
**s05-consulta** (4.85). Cae la notificación "Sofi: Hola, ¿están?" y se abre el chat genérico (avatar S ámbar, "en línea"). Burbujas de Sofi en su palabra; "Sofi está escribiendo..."; sello "CLIENTA INSOMNE"; "freidora de aire" ámbar.
**s06-respuesta** (4.48). Tres puntitos y la respuesta violeta al toque: "¡Hola, Sofi! Sí, la tenemos." + "AL INSTANTE"; tarjeta del producto (freidora dibujada) con "EN STOCK" y un "3" ámbar gigante en "tres"; "¿Te la separo?".
**s07-a-esta-hora** (5.55). "¿¡ME CONTESTARON!?" con sacudón; "3:47" ámbar gigante + "¿A ESTA HORA?"; burbuja "Bueno, mandame dos" y "x2" ámbar gigante en "dos"; "Una es para mi madre" + sello "REGALO PARA MAMÁ".
**s08-retiro** (5.12). Tarjeta "Pedido listo · tomado por tu agente": tilde en "listo", "2x Freidora de aire grande" en "dos", calendario "MAÑANA" + "10:00" gigante en "diez", mapa con ruta y pin que cae en "dirección".
**s09-angel** (4.79). Burbuja "Sos un ángel"; al orbe le baja una aureola ámbar y le salen alas de líneas. En "Ángel no." se tacha, la aureola se cae, las alas se van; "AGENTE" gigante + "DE IA" violeta.
**s10-nota** (4.00). Papelito ámbar pegado en la pantalla: "NOTA PARA EL JEFE", "Vendí" / "dos." (subrayado), "Dormí tranquilo." violeta, firma "TU AGENTE DE IA · 3:49". En 3.03 la pantalla se apaga (ambiente).
**s11-alarma** (4.21). FLASH y amanecer (ambiente). Alarma "7:00" que vibra, ondas ámbar, "Posponer" / "Detener". "¿QUÉ ME PERDÍ?" gigante ámbar en la primera, más fuerte y titilando en la segunda.
**s12-nada** (4.00). "NADA." seco; caen las notificaciones de la noche (venta de 2 freidoras, retiro 10:00, nota). Marcador: "VOS · RONCASTE" gris en "roncaste", "YO · VENDÍ" ámbar en "vendí".
**s13-sin-horario** (4.37). Orus. Reloj de 24 h que se llena, ventas (puntos ámbar) a toda hora, también en el sector de la noche; "24 h · COMPRAN A CUALQUIER HORA"; pastilla "Agente de IA · en línea" en "agente"; "CONTESTA AL INSTANTE".
**s14-pedido** (4.22). Cuatro filas con tilde ámbar en su palabra: "Tus precios", "Tu stock", "Pedido tomado" y la ámbar "Listo a la mañana".
**s15-cta** (8.43). "Tu agente de IA" + "LO HACEMOS EN Scalerics"; en "Guardalo" el ícono de guardar se dibuja y se llena + "GUARDALO" gigante ámbar; "y mostráselo mañana a tu socio."; "SI SE DESPIERTA" con Z violetas. Cola quieta con el ícono latiendo.
