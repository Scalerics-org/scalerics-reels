# Reel "La aduana": spec

Reel vertical 1080x1920 de Scalerics. Tema: TIENDA ONLINE (vende sola las 24 horas, envíos por DAC,
Correo o PedidosYa, cobro con Mercado Pago). Formato P: REALITY DE CONTROL DE ADUANAS ("Aduanas
Extremas", inventado). Gancho de la OFICIAL ROMERO (voz Kore, seca, implacable): "Señor, su local no
puede entrar a internet. Abra la valija." El NARRADOR EN OFF del reality (Iapetus) presenta el caso:
Óscar, dueño de un bazar de barrio, intenta entrar a internet. ÓSCAR (Charon, nervioso): "Es todo
para uso personal, oficial." La oficial le revisa la valija: un cuaderno de pedidos con birome, el
cartel "precio por privado" ("es para que me escriban"), "pasá a retirar por el local, de nueve a
dieciocho" ("señor, internet no cierra"), "¡pero yo vendo por Instagram! ¿eso no cuenta?" ("fotos
divinas, ningún precio, a la máquina"). El escáner de rayos X: sin carrito, sin envíos, sin Mercado
Pago; "¿cómo le compran a las tres de la mañana?" "Me escriben... y yo les contesto cuando abro."
DENEGADO. En la fila de al lado, EL DE ENFRENTE (Fenrir, canchero) pasa con su tienda online ("vendí
mientras hacía la fila"): APROBADO, buen viaje. Óscar: "¡Pero es el de enfrente! ¡Vendemos lo mismo!"
GIRO de la oficial: "Exacto. Mercadería tiene. Clientes tiene. Le falta el pasaporte: una tienda que
venda sola." Entra Scalerics (Orus): "hacemos tu tienda online: vende sola las veinticuatro horas, con
envíos por DAC, Correo o PedidosYa, y cobra con Mercado Pago. Tu local, con pasaporte." CTA: "¿Tu
local pasa la aduana? Contanos en los comentarios qué te confiscarían de la valija."
Voz armada por partes (partes/voces.sh → partes/apretar.sh, que acorta pausas → tiempos.mjs por parte
→ partes/componer.mjs): 72.6 s; reel 75.8 s.

## RECURSO VISUAL CENTRAL
La VALIJA de Óscar (gris con etiqueta amarilla "BAZAR ÓSCAR") que se abre en el mostrador y de la que
salen las pruebas; el ESCÁNER DE RAYOS X en falso color (marco azul metálico, orgánicos naranjas,
plásticos verdes) donde lo que falta aparece como huecos rojos punteados; y los SELLOS de goma: rojo
DENEGADO sobre el pasaporte bordó de Óscar, verde APROBADO sobre el pasaporte azul "TIENDA ONLINE" del
de enfrente y al final sobre la tienda de Óscar.

## ESTILO: CONTROL DE AEROPUERTO (reality)
Pared gris clara con paneles verticales y luz blanca al centro, banda de peligro amarilla y negra en
y 1376, piso gris de baldosas (y 1400-1680), franja grafito abajo con filete amarillo y el logo (todo
en armar.mjs). ambiente.html: arriba a la izquierda el cartel de señalética negro con pictograma
amarillo (valija con lupa) "ADUANA · INGRESO A INTERNET" (desde "Scalerics" el pictograma se pone
verde y dice "CON TIENDA: PASA"); arriba a la derecha el logo del reality "ADUANAS EXTREMAS" con el REC
rojo que titila; abajo a la izquierda la chapa de quién habla (OFICIAL ROMERO amarillo · ADUANAS
EXTREMAS voz en off naranja · ÓSCAR rojo · EL DE ENFRENTE azul · SCALERICS verde); flash rojo en
"Denegado" y blanco en "Scalerics". Personajes planos con contorno grafito grueso (stroke 7-8): la
oficial (gorra de plato con banda amarilla, rodete, lentes rectangulares que se saca en el giro,
uniforme azul pizarra con charreteras amarillas, boca roja recta), Óscar (pelado con costados grises y
tres pelos peinados, bigotito, chomba roja, gotas de transpiración, sonrisa nerviosa / grito) y el de
enfrente (jopo, lentes de sol, saco azul, pulgar arriba). Piezas compartidas en `assets/aduana.js`
(window.AD).

## Paleta (SOLO estos)
- Gris aeropuerto `#d9dde0` (claro `#eef0f1`, medio `#aab2b8`, oscuro `#5d6870`): pared, mostrador, valija.
- Grafito `#1b1f24`: contornos, carteles de señalética, franja de abajo.
- Amarillo señalética `#ffcc00`: carteles, banda de peligro, insignias de la oficial.
- Rojo sello `#e0242f` (claro `#ff5a5f`): DENEGADO, alertas, Óscar.
- Verde aprobado `#1fbf5a`: APROBADO, tildes.
- Rayos X (solo dentro de la pantalla `#0b1622`): azul `#2f7dff`, naranja `#ff8a1f`, verde `#38d66b`.
- Piel `#f0c8a0` / `#e2ad85`, uniforme `#2b3a4f`, cartón `#d9b27c` (solo personajes y objetos).
- Desde "Scalerics" se suma el verde `#5ce611` (la tienda buena).
Subtítulos: blanco con contorno grafito; acento amarillo (oficial), naranja (narrador), rojo claro
(Óscar), azul `#5aa2ff` (el de enfrente), verde `#5ce611` (Scalerics) (reel.voces + armar.mjs).
Prohibido: emojis, fotos, rayas largas, logos reales (Instagram y Mercado Pago solo como texto o UI
genérica).

## Tipos de letra
Lexend 800/900 (carteles, títulos), IBM Plex Mono 600 (rótulos, pantallas, chapas), Black Ops One
(sellos y el título del reality), Caveat 700 (el cuaderno y el cartel escrito a mano).

## Zona
Subtítulos arriba (y 236-420). Contenido entre y 560 y 1480. Chapa en y 1556-1666 (izquierda) y logo
en y 1746: no taparlos. Cartel y logo del reality arriba en y 58-190.

## Lo que hace ambiente.html (segundos globales)
Chapas de quién habla en cada turno (reel.voces). REC titila todo el reel. Flash rojo en 39.66
("Denegado") y blanco en 59.53 ("Scalerics"). El cartel se pone verde "CON TIENDA: PASA" desde 59.53.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es el control de aduana con la paleta de arriba). Sí valen
> las reglas técnicas.

## El lenguaje visual (de la referencia)
- Fondo transparente: la escena no pinta fondo, el index ya lo tiene.
- Todo vive en un `<svg viewBox="0 0 1080 1920">` a pantalla completa (coordenadas = píxeles).
- Textos dentro del dibujo (carteles, UI de celular): Lexend o IBM Plex Mono; tamaño mínimo 20-24px.
- Movimiento: los trazos se DIBUJAN (stroke-dashoffset) con `dibujar()`; lo que aparece entero hace pop
  (scale 0.85→1 + opacity, back.out(1.6), 0.35 s). Las cosas cambian EN la palabra que las nombra.
  Algo se mueve siempre: ningún tramo de más de ~1 s quieto.
- Entrada: los primeros 0.3 s el dibujo arranca; salida: los últimos 0.25 s `opacity 0 + blur(6px)`
  sobre el contenedor de la escena.
- Copy en español rioplatense; si Scalerics habla, en plural ("hacemos").

## Reglas técnicas (HyperFrames)
- Archivo `compositions/<id>.html`, un `<template>` con `<style>` (con los @font-face que usa), un
  `<div id="root" data-composition-id="<id>" data-width="1080" data-height="1920" data-duration="<dur>">`
  y un `<script>` que arma UN `gsap.timeline({ paused: true })` y lo registra en
  `window.__timelines["<id>"]`.
- GSAP se carga SIEMPRE local: `<script src="assets/vendor/gsap.min.js"></script>`; después
  `<script src="assets/aduana.js"></script>`.
- Todo selector CSS con prefijo `[data-composition-id="<id>"]`; clases e ids con prefijo de la
  escena (`s05-...`). Un contenedor `.clip` de la escena con data-start 0 y data-duration = dur.
- Determinista: nada de Math.random, Date, timers, `repeat: -1`. Solo transforms, opacity, filter,
  strokeDashoffset. En SVG rotar/escalar con `svgOrigin` y SIEMPRE `smoothOrigin: false` (si no, el
  grupo se corre: pasó en s15).
- `compositions/<id>.sfx.json`: 3 a 9 golpes de sonido en segundos relativos a la escena.
- Verificar con `node armar.mjs`, snapshot (con `flock /tmp/hyperframes.lock`) y check.

## Escenas (tiempos en tiempos.md)
**s01-valija** (3.54). Cuadro 0: la oficial detrás del mostrador de aduana ("ADUANA · INTERNET", banda
amarilla y negra), la valija gris de Óscar con etiqueta "BAZAR ÓSCAR" sobre el mostrador, barrera roja
atrás. En "local" (0.51) la oficial levanta la vista; en "internet" (1.44) cartel "INTERNET · NO PASA"
y la barrera baja; en "Abra" (2.15) golpe con la mano en el mostrador y la valija salta; en "valija"
(2.37) saltan las trabas y sello amarillo "¡ABRA!".
**s02-reality** (6.23). Presentación del reality: "ADUANAS" (0.08) y "EXTREMAS" (0.53) golpean entre
dos cintas de peligro; en "Hoy" (1.49) el título sube; en "Óscar" (1.90) la ficha del pasajero con la
foto de Óscar transpirando y "PASAJERO ÓSCAR"; en "bazar" (3.20) "OFICIO BAZAR DE BARRIO" y el
toldito; en "intenta" (4.21) el tablero de vuelos "VUELO W3 · INTERNET" y en "internet" (5.18)
"DESTINO INTERNET" y el estado "DEMORADO" que da vuelta y titila.
**s03-personal** (2.49). Óscar en primer plano con las manos arriba, risita nerviosa, gotas y mancha de
transpiración, la valija abrazada; en "personal" (0.78) etiqueta roja "\"USO PERSONAL\""; en "oficial"
(1.13) dos signos de pregunta rojos.
**s04-cuaderno** (6.70). La valija abierta en el mostrador. En "cuaderno" (0.11) sale el cuaderno de
pedidos (Caveat: "Marta · 2 tazas", "el de la obra ¿¿??", "llamar a... ¿quién?"); en "birome" (1.80)
la birome y la etiqueta "CON BIROME"; en "esto" (2.52) la mano enguantada de la oficial levanta el
cartel de cartón y se escribe "PRECIO" (3.23) "POR" (3.58) "PRIVADO" (3.75), sello "SOSPECHOSO"; en
"Es para que me escriban" (4.86) Óscar asoma detrás del mostrador, transpirando.
**s05-horario** (6.02). La oficial (espejada) sostiene el cartel de la puerta del local "HORARIO DEL
LOCAL · PASÁ A RETIRAR POR EL LOCAL" (0.43, 1.10), "9" (1.78) "A 18" (2.20) y un reloj de pared que
gira de 9 a 18; en "Señor" (3.14) levanta la vista; en "internet" (3.81) cartel de aeropuerto "24 ·
INTERNET · NO CIERRA"; en "cierra" (4.66) una X roja tacha el cartel del horario.
**s06-instagram** (6.07). Óscar grita con el celular en alto; en "Instagram" (0.64) un celular grande
con su perfil genérico "bazar.oscar · precio por privado" y la grilla de fotos (tazas, ollas,
lámparas); en "cuenta" (1.68) globo "¿ESO NO CUENTA?"; en "Fotos" (2.74) la mano de la oficial pasa la
grilla, "divinas" (3.04) corazones; en "Ningún precio" (3.85) etiquetas rojas "$ ?" en cada foto; en
"máquina" (4.39) etiqueta "A RAYOS X" y el celular sale volando a la derecha.
**s07-escaner** (5.26). Pantalla de rayos X "LÍNEA 3" con la valija en falso color y el barrido; cada
"Sin" (0.00, 0.96, 2.01) prende un hueco rojo punteado (carrito, caja de envío, tarjeta) y una alerta
roja abajo "SIN CARRITO" / "SIN ENVÍOS" / "SIN MERCADO PAGO"; en "tres" (4.01) reloj rojo "03:00" y en
"mañana" (4.35) la luna.
**s08-denegado** (4.63). Óscar con el celular; en "escriben" (0.26) entran los mensajes de la madrugada
("¿Tenés en azul? 03:12", "¿Hacen envíos? 03:14", "¿Precio? 03:15"); en "abro" (2.43) su respuesta
amarilla "¡Buen día! Ya abrimos 09:00"; en "Denegado" (3.34) velo oscuro, su pasaporte bordó y el
sellazo rojo "DENEGADO" con sacudón.
**s09-fila** (2.34). Plano general de dos filas: Óscar triste en la de "INTERNET · DENEGADO" (luz roja
que titila); en "fila" (1.04) se prende el cartel "INTERNET · PASE" con flecha verde y entra el de
enfrente con su valija azul "TIENDA ONLINE"; paneo.
**s10-enfrente** (5.24). El de enfrente con lentes de sol y pulgar arriba; pantalla de rayos X "LÍNEA
2" con todo en verde; en "Tienda online" (1.06), "envíos" (2.09) y "Mercado Pago" (2.62) se prenden
"CARRITO", "ENVÍOS", "MERCADO PAGO" con tilde; en "Vendí" (3.56) tres notificaciones "Nueva venta".
**s11-aprobado** (1.98). Su pasaporte azul "TIENDA ONLINE" con sello verde "APROBADO" (0.2) y rayitos;
en "Buen viaje" (0.73) el pictograma de avión cruza la pantalla.
**s12-indignado** (2.81). Óscar con los brazos en alto gritando; en "enfrente" (0.47) entra la valija
azul del de enfrente; en "Vendemos" (1.36) la suya gris, las dos con los mismos productos arriba, y en
"mismo" (1.78) un "=" rojo gigante.
**s13-pasaporte** (6.22). El giro: la oficial se saca los lentes (0.05); planilla de inspección
"MERCADERÍA" tilde (0.65), "CLIENTES" tilde (1.83), "PASAPORTE" cruz roja (3.48); en "una tienda"
(4.22) la planilla se va y aparece el pasaporte grafito "TIENDA ONLINE"; en "venda sola" (4.92)
etiqueta "QUE VENDA SOLA".
**s14-scalerics** (8.91). Scalerics (flash): el celular con la tienda "BAZAR ÓSCAR · TIENDA ONLINE"
verde, cuatro productos con precio y "AGREGAR AL CARRITO" (1.27); en "vende sola" (2.03) notificación
"Nueva venta · pagada · 03:12 · mientras dormías"; en "veinticuatro horas" (2.66) insignia amarilla "24
HORAS" con aguja que gira; en "DAC" (4.05), "Correo" (4.61), "PedidosYa" (5.01) tres etiquetas de
envío; en "cobra" (5.88) el botón pasa a "PAGAR CON MERCADO PAGO"; en "pasaporte" (7.79) sello verde
"APROBADO".
**s15-cta** (7.36). Cartel de señalética grafito "¿TU LOCAL PASA LA ADUANA?" que se arma palabra por
palabra (0.0-0.96); la valija abierta abajo; en "Contanos" (1.63) y "comentarios" (2.09) dos
comentarios genéricos ("El cuaderno, seguro", "¿El 'pasá el lunes'?"); en "confiscarían" (2.87) salen
de la valija el cuaderno, el cartel "9 A 18" y la foto con "$ ?"; en "valija" (3.74) la valija salta y
todo queda flotando hasta el final.
