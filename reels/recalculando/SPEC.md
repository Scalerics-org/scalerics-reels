# Reel "Recalculando": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: SITIO WEB (uno solo, nombrado por Orus al final).
Formato G, simulación de pantalla: TODO el cuadro es la app de navegación GPS del auto de una
clienta, de noche. Gancho con la voz del GPS (Kore, robótica y pasivo-agresiva): "Recalculando. Tu
cliente te estaba buscando. Y lo mandé al de enfrente." La clienta (Leda) pide ir a lo de Don Hugo
("dicen que tiene la mejor pastafrola de Montevideo"); el GPS busca: sin datos, horario
desconocido, teléfono no existe, última foto de hace años con el toldo viejo. "¿Cómo que no
existe? Me lo recomendó mi tía." El GPS la manda al de enfrente (abierto, con página, horarios y
botón de WhatsApp); "¿Pero no era el otro?" / "El otro no existe en internet. Recalculando."
Compra dos; "Llegaste a tu destino. Bah. Al de enfrente." Don Hugo (Charon), en la vereda con la
pastafrola, ve pasar el auto: "¿y esta a dónde va?". GIRO del GPS: "Tu local no está mal ubicado.
Está mal ubicado en internet. Yo no te odio. No te encuentro." Orus: hacemos tu sitio web; CTA:
"Buscá tu local en el celular ahora. Si no aparece, escribinos." Voz de 73.8 s (Kore, Leda,
Charon, Orus; parlamentos en `partes/`, unidos por `partes/unir.mjs`), reel de 77.0 s.

## ESTILO: APP DE NAVEGACIÓN NOCTURNA A PANTALLA COMPLETA. Edición cargada.
- `compositions/mapa.html` (DEBAJO de las escenas: va antes en el DOM, track 1; las escenas van en
  tracks 2-3): mapa de calles azul-gris en perspectiva (rotateX 56°) que avanza en loop, faroles
  ámbar que pasan, la ruta cian que se borra y redibuja en cada doblada (el mundo gira 90° en 4.55,
  30.0, 44.8 y 52.2), destello rojo de RECALCULANDO en 0 y 39.27, y la flecha del auto fija en
  (540, ~1500) con halo que respira.
- `compositions/ambiente.html` (ENCIMA): cartel de maniobra arriba (y 44-204) que cambia con la
  historia ("Doblá en el de enfrente", "Esperando destino", "Buscando destino · sin datos", "En
  200 m, doblá", "Llegaste a tu destino · bah, al de enfrente", "Seguí derecho"), y desde 62.23 el
  cartel cian "Tu local · encontrado"; barra de llegada abajo (y 1572-1708) con "3 min", "LLEGADA
  20:14 · 900 M" y el destino (lo de Don Hugo SIN DATOS → el de enfrente ABIERTO AHORA → tu local
  TE ENCONTRARON); viñeta.
- Las escenas son tarjetas de la app (paneles `rgba(17, 26, 46, 0.95)`, radio 30-40), pins,
  radar, carteles rojos. Sin logos ni nombres de apps.

## Paleta (SOLO estos colores)
- Asfalto `#0b1220` / `#070d18` (fondos), panel `#1a2540` / `#16203a`, calles `#2a3a58` / `#3a4c6e`.
- Blanco frío `#eaf2ff` (textos; gris = con opacidad).
- Cian `#22e3ff`: la ruta, el de enfrente, lo que anda, el sitio web. También acento de subtítulos.
- Rojo `#ff3b4e`: RECALCULANDO, sin datos, no existe.
- Ámbar `#ffc35a`: solo faroles, la pastafrola, la tía y lo de Don Hugo (lo cálido, lo viejo).

## Zona
Cartel de maniobra y 44-204 (ambiente). Subtítulos y 236 a ~350 (Lexend 600, blancos, acento
cian). Escenas entre y 560 y ~1400 (abajo de 1420 está la flecha del auto del mapa). Barra de
llegada y 1572-1708, logo en y ~1746.

## Lo que manda sobre SPEC-base
Fondo, colores y tipos de este estilo (no las líneas crema ni el verde). Se mantienen: los helpers
`dibujar()` y `pop()`, las reglas técnicas, el determinismo, los .sfx.json y la salida con blur.

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

**s01-recalculando** (5.98). Cartel rojo "RECALCULANDO" con ruedita que gira, ya en el cuadro 0, parpadea. Minimapa: pin gris "TU LOCAL · SIN DATOS"; en "cliente" aparece el auto "TU CLIENTE"; en "buscando" se dibuja la ruta gris punteada a tu local; en "mandé" se tacha tu local (X roja) y se dibuja la ruta cian al pin vivo "EL DE ENFRENTE · ABIERTO AHORA"; "AL DE ENFRENTE" gigante cian con sacudón en "enfrente".
**s02-destino** (6.49). Micrófono cian con ondas, "ESCUCHANDO"; la búsqueda "Llevame a lo de Don Hugo" se escribe palabra por palabra; en "dicen" sube la tarjeta ámbar "DICEN QUE TIENE · la mejor pastafrola de Montevideo" con la pastafrola dibujada (enrejado ámbar, humito) y cinco estrellas en "Montevideo".
**s03-sin-datos** (8.37). "Buscando..." con ruedita; ficha gris "Lo de Don Hugo" con pin "?"; filas que caen: "DATOS · SIN DATOS" (en "sin"), "HORARIO · DESCONOCIDO" (en "desconocido"), "TELÉFONO · - - -" que titila; en "no existe" cae el sello rojo torcido "NO EXISTE" con sacudón.
**s04-foto-vieja** (3.81). "ÚLTIMA FOTO": foto de la fachada en líneas ámbar apagadas, cartel "PANADERÍA", toldo rayado y roto; "HACE AÑOS" titila en "años"; en "toldo" se dibuja la elipse roja alrededor y el toldo se cae un poco; "TOLDO VIEJO" rojo.
**s05-tia** (3.63). "¿CÓMO QUE / NO EXISTE?" gigante (lo segundo en rojo) con sacudón; en "me lo recomendó" sube el mensaje de "Tía Marta": "Andá a lo de Don Hugo. La mejor pastafrola. Hacele caso a tu tía."; sello ámbar "MI TÍA" en "tía".
**s06-200m** (6.66). Flecha de giro cian que se dibuja + "200 m" gigante; "DOBLÁ EN EL DE ENFRENTE" con la flecha que insiste; ficha cian "El de enfrente" con pastilla "ABIERTO AHORA" (en "abierto"), tildes "Página web" (en "página"), "Horarios" (en "horarios") y botón "Escribinos por WhatsApp" (en "botón").
**s07-el-otro** (5.81). Globo ámbar de la clienta "¿Pero no era el otro?"; dos pins cara a cara: "LO DE DON HUGO" gris con "?" VS "EL DE ENFRENTE" cian. En "existe" el de Hugo hace glitch y queda en contorno punteado; "NO EXISTE EN INTERNET" rojo; en "Recalculando" el cartel rojo arriba parpadea (y el mapa se tiñe de rojo).
**s08-llegaste** (5.66). Ticket blanco "EL DE ENFRENTE · VENTA · Pastafrola · Pagado"; "x2" ámbar en "dos". Bandera a cuadros que flamea + "LLEGASTE A / TU DESTINO"; en "Bah." se tacha "tu destino" en rojo y entra "AL DE ENFRENTE" cian.
**s09-hugo** (4.07). Vista de costado: el local de Don Hugo en líneas (toldo viejo ámbar), Don Hugo (figura de líneas con delantal) en la vereda levantando la bandeja con la pastafrola humeante en "pastafrola"; el auto cian pasa de largo a toda velocidad; Hugo gira la cabeza; "¿Y ESTA A DÓNDE VA?" ("a dónde va" ámbar).
**s10-mal-ubicado** (6.72). Pastilla de voz del GPS "Tranquilo, Hugo." con barritas; tarjeta "EN LA CALLE": esquina con pin ámbar y tilde, "Buena esquina" → "NO ESTÁ MAL UBICADO"; tarjeta roja "EN INTERNET": búsqueda "pastafrola cerca", dos resultados cian y el hueco punteado "vos: ?" → "MAL UBICADO EN INTERNET".
**s11-no-te-encuentro** (3.58). "YO NO TE ODIO." y un radar cian que barre sin encontrar nada; "0 RESULTADOS" titila; "NO TE ENCUENTRO." rojo en "encuentro".
**s12-te-encuentren** (4.83). Orus. El radar barre y en "encontrar" cae el pin cian con ondas + "TU LOCAL · ENCONTRADO" (y el cartel de arriba se pone cian); "EN SCALERICS" + "HACEMOS TU / SITIO WEB" (cian en "sitio").
**s13-sitio** (4.89). Celular con el sitio de "Lo de Don Hugo · ABIERTO AHORA": rayo cian + "RÁPIDO EN EL CELULAR" (en "rápido"), fila "Horarios · LUN A SÁB · 8 A 20" (en "horarios"), "Ubicación" con mini ruta (en "ubicación"), botón cian "Escribinos por WhatsApp" (en "botón") que el dedo toca en "WhatsApp".
**s14-cta** (6.53). "BUSCÁ TU LOCAL" + barra que escribe "tu local" con cursor; "EN EL CELULAR · AHORA"; "¿NO APARECE?" rojo con sacudón; "ESCRIBINOS" en botón cian gigante que late hasta el final + "SITIOS WEB · SCALERICS".
