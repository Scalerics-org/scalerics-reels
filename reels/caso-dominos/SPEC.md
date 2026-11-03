# caso-dominos · prueba de la serie "Caso de éxito"

Primera prueba de la serie "Caso de éxito" (CLAUDE.md, LO PRIMERO punto 9b): Domino's y el
seguimiento del pedido. Antes (pedías y quedabas a ciegas, llamabas, el local dejaba de cocinar)
→ qué hizo (la barrita con cada paso) → giro (no hizo la pizza más rápido: hizo que la espera se
viera) → para vos (avisos automáticos por WhatsApp cada vez que el pedido cambia de estado) →
videollamada. Producto: automatización. NO publicar hasta que Juan lo vea (queda en "En curso").

## Marca y hechos
- Domino's se nombra en voz y texto (Lexend, sin estilo propio). No se dibuja su logo, su dominó,
  su tipografía ni sus colores: caja de pizza genérica crema con franja verde y un emblema de
  porción de pizza en verde/navy.
- Solo lo público: que muestra los pasos del pedido. Sin años ni cifras ("hace unos años").

## Lo que cambia respecto de SPEC-base (igual que por-que-la-tarjeta)
- Objetos grandes RELLENOS (sin dibujo de líneas): caja de pizza en perspectiva oblicua, pizza
  vista de arriba, horno, moto de delivery, celular, cronómetro, la barrita de 4 pasos.
- Los objetos se transforman: caja + barrita → caja a ciegas → celular que llama → gira y es la
  cocina → la caja vuelve y de ella sale la barrita → la caja se mete en el primer paso → pizza,
  horno, caja con sello, moto (la barrita arriba se llena) → cronómetro con anillo de 4 pasos →
  celular del cliente tranquilo + pizza que se sigue haciendo → chat de WhatsApp → la barrita
  grande baja y se encoge dentro del chat → avisos que llegan solos → el celular gira y es la
  videollamada.
- Subtítulos arriba al centro (los arma `armar.mjs`, versión de este reel), palabra clave en
  recuadro verde, rojo apagado para "ciegas", "pedido?", "cocinar" y "rápido".
- Fondo navy CLARO `#16243d` casi liso (por-que-la-tarjeta usó el navy oscuro), con estrellitas.
- Paleta: navy `#0b1220`, navy claro `#16243d` / `#1f3254`, crema `#efeee5` / `#d9d7c9` /
  `#b4b2a3`, blanco, verde `#5ce611` (sombra `#3fa60a`), rojo apagado `#c7655b` solo para el
  "antes". La pizza lleva masa dorada y salsa en rojo apagado (es comida, no un acento).

## Cómo se arma
Las escenas salen de `gen.mjs`: `node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho: "¿Por qué Domino's / te muestra / en qué paso / está tu pizza?" desde el cuadro 0,
  caja gigante flotando y la barrita debajo llenándose paso a paso.
- s02-ciegas: la caja baja sola; "quedabas": tres "?" rojos; "ciegas": se oscurece, "Sin saber nada".
- s03-llamas: celular llamando a la "Pizzería", suena (ondas, vibra), "Llamada 1 → 3", globo
  "¿Dónde está mi pedido?"; el celular gira de canto.
- s04-cocina: del otro lado, la pizza en la pala recibe ingredientes ("Cocinando"); suena el
  teléfono del local; "dejaba de cocinar": "En pausa", la pizza se apaga; "atender": el teléfono
  va al centro.
- s05-barrita: vuelve la caja; tag "DOMINO'S · HACE UNOS AÑOS"; de la caja sale la tarjeta "Tu
  pedido" con 4 pasos; "cada paso": recuadro; "del pedido": la caja se achica y es la cajita del
  primer paso; "Cada paso, a la vista".
- s06-pasos: la barrita arriba y abajo el objeto de cada paso: pizza armándose → horno (la pizza
  entra por la puerta, calor) → caja con sello verde de control → moto que se lleva la caja.
- s07-giro: cronómetro; "¿Más rápido?" tachado; el anillo verde de 4 pasos lo rodea: "La espera,
  a la vista".
- s08-tranquilo: celular del cliente "En camino" con la barrita llena; el botón de llamar se
  apaga y se tacha ("Ya no llama"); el celular se corre y entra la pizza que se sigue haciendo.
- s09-chat: chat "Tu local": "¿Y mi pedido?", "¿Hola?" ("Otra vez"); "Eso mismo": la barrita
  grande baja y se encoge dentro del chat.
- s10-estado: la barrita del chat pasa al horno ("Cambia de estado"), llega el aviso automático
  "Tu pedido está en el horno", "Sale solo".
- s11-avisos: "Tu pedido está listo", "Salió para tu casa" (la barrita se completa);
  "Lo armamos en Scalerics".
- s12-cta: el celular gira y es la videollamada; "Videollamada / gratis / scalerics.com".
