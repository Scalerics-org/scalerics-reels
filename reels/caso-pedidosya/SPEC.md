# caso-pedidosya · Caso de éxito uruguayo (3D real), 31,5 s

Serie "Caso de éxito" (CLAUDE.md de la rutina, punto 9b + 8b), contenido verificado en `fuentes.md`.
Base técnica: reels/netflix-blockbuster. NO está en la cola ni en "Hechos": Juan tiene que verlo primero.
PedidosYa solo se nombra en texto (pill crema): ningún logo, ni su rojo, ni su tipografía. Ni comparación ni
"alternativa": la lección es general (tu cliente ya pide desde el celular; ¿tu negocio está ahí?).

## Cómo está armado
- Una sola escena Three.js (`assets/tres.js`), `renderAt(t)` puro, azar con semilla. Cámara en curva
  Catmull-Rom continua (sin cortes); dos tramos con ease propio: la grúa del gancho (distancia en escala log,
  de 14 a 6400 u, Montevideo → mapa de la región) y la zambullida de vuelta al chivito.
- `node gen.mjs && node armar.mjs`. `armar.mjs` agrega un velo navy arriba (legibilidad del texto sobre 3D),
  reparte los SFX en 24 pistas y corta el subtítulo antes de un `sinSub`.
- La fuente 3D del repo (lexend800.js) solo trae dígitos y "$.,MUSNOno": el "?" y el "%" son geometría propia.
- SFX nuevos: `moto.mp3` (sintetizado con ffmpeg), `ring`, `vibra`, `scan`, `moneda` (de otros reels).

## Escenas
s01-gancho (ciudad low-poly + celular-torre; grúa al mapa, 15 pines y arcos desde Montevideo) · s02-chivito
(zambullida, se arma capa por capa) · s03-telefono (teléfono de disco rojo apagado suena, mil "?") · s04-otra
(caja, sale una porción de pizza, sello OTRA COSA) · s05-vuelta (el teléfono gira y del otro lado es un
celular; "Pedir" → tarjeta "Pedido nuevo") · s06-nacio (vuelve la ciudad, moto por la rambla, "2009" 3D) ·
s07-alemana (2009 rueda a 2014, anillo 0 → 70 %) · s08-leccion · s09-ahi (sin resultados, local apagado) ·
s10-tienda (local se prende, tu tienda, pedidos al local) · s11-llamada (cierre, 3,8 s).

## Cambios del 04-11 tarde (Juan: "tiene que quedar perfecto")
- Chivito al pan rehecho: pan redondo alto, lechuga, tomate, churrasco que sobresale, jamón, muzzarella que gotea,
  panceta, huevo frito con la yema de frente y palillo con aceituna. También en las pantallas del celular.
- Teléfono de disco entra grande (pop de 0,65 a 1,22).
- Grúa: el celular de la ciudad crece con la distancia (siempre protagonista) y se mete en Montevideo cuando el mapa
  ya se lee; el mapa entra entero (México y el este de Brasil). Zambullida: el chivito llega armado, centrado en
  lo que mira la cámara y a mitad de camino hacia ella (por delante de los arcos del mapa).
- La ciudad se va antes del "2009"; el año queda solo arriba y el celular abajo, que se transforma en el anillo.
- Cierre: arranca en "videollamada" (28,1 s) y dura 2,9 s; cola de 0,3 s y fundido de audio de 0,35 s.
- Mezcla: `armar.mjs` limita cada SFX a -31 LUFS (la voz anda en -15). Medido con ffmpeg ebur128 por tramos de
  0,5 s, voz sola contra música+SFX (reconstruidos desde el index): con voz sonando, la voz queda al menos
  6,3 LU arriba; pico de la premezcla -2 dBFS; final -14,3 LUFS, pico -1,5 dBFS.
- Moto: SFX real CC0 (ver fuentes.md).
- Portada: fondo = cuadro 4,75 s renderizado sin el texto del gancho (ver nota en portada.json).

## Cierre nuevo (Juan: "es como medio random la conclusión")
Desde "¿La lección?": vuelve el mismo teléfono de disco con los "?" (pedir por teléfono se presta a errores) →
"o por WhatsApp": se corre y aparece un celular con un chat genérico (navy y crema, sin logo ni colores de la app)
que se llena de mensajes desordenados → "aquel chivito": cae la caja con la porción equivocada y el sello OTRA COSA
→ "tu tienda online": el celular con la tienda del local y el chivito correcto; "elige" y "paga" con tilde en la
pantalla y en dos pills → "te llega el pedido claro": la tarjeta "Pedido nuevo" vuela al local, que se prende →
videollamada (2,6 s). Voz Orus completa regenerada (32,6 s), 13 escenas, duración 32,9 s.
