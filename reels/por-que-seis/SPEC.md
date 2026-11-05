# por-que-seis · "¿Por qué…?" sin marcas (3D real), ~31-33 s

Serie "¿Por qué…?" (CLAUDE.md, puntos 8, 8b, 8c y 9). El experimento de las mermeladas (Iyengar y Lepper, 2000):
una mesa de degustación con 24 mermeladas atrajo más gente que una con 6, pero en la de 6 compró mucha más gente.
Lección: cuando hay demasiadas opciones, a mucha gente le cuesta decidir y lo deja para después. Callback: tu
catálogo de WhatsApp con 200 fotos sueltas es la mesa de 24; en tu tienda online (Scalerics) ordenamos el
catálogo: lo más pedido primero, pocas categorías, el cliente elige y paga. Cierre: videollamada gratis.
Datos y límites en `fuentes.md` (el efecto no es ley: no decir ni mostrar "siempre", "x10", "triplicó").
SIN marcas: ni el supermercado ni la marca de las mermeladas, etiquetas genéricas.

## Recurso visual central
- **El frasco de mermelada** como protagonista: vidrio (MeshPhysicalMaterial, transmission baja o vidrio
  opaco-satinado si SwiftShader no da), mermelada de color dentro (frutilla rojo vino `#8e2a3a`, durazno
  `#e39a3c`, arándano `#3b2a5a`, naranja `#e07a1f`, ciruela `#5a2440`, higo `#7a4a3a`: colores de FRUTA, no de
  marca; el frasco es el único lugar donde entran), tapa cubierta con **tela cuadrillé** (disco + faldón con
  ondas, textura de canvas procedural navy/crema o verde/crema) atada con un hilo, y **etiqueta crema** con una
  frutita simple dibujada (sin texto de marca). Que nadie lo confunda con un tarro de pintura o un vaso.
- **La mesa de degustación**: tablero con mantel blanco que cae a los costados, frascos en gradas (24 = 3 filas
  de 8 en una tarima escalonada; 6 = una fila), platito con galletitas y **cucharitas** de madera clavadas.
  Un cartelito plegado crema "Degustación" (texto genérico, Lexend).
- **La canasta del súper** (plástico verde de marca `#5ce611` con asas navy) donde caen los frascos comprados.
- **El celular** (RoundedBox navy, pantalla crema) que se vuelve la mesa: la grilla de 200 fotos sueltas se
  levanta como frascos y después se ordena en la tienda.
- Fondo **crema `#efeee5` liso** (sin degradés: compresión de Instagram), piso crema apenas más oscuro
  `#e4e2d6` con sombra suave navy al 25 %. Objetos navy `#0b1220` / `#16243d`, verde `#5ce611` (sombra
  `#3fa60a`), blanco. Rojo apagado `#c7655b` solo para el problema ("3", el 3 de cada 100, el caos de 200 fotos).
- Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 86 px **navy** sobre crema (no blanco), palabra clave en
  recuadro de selección verde con texto navy; rojo apagado para "tres", "menos", "doscientas". Gancho (s01) y CTA
  (s13) sin subtítulos: tienen el texto grande.
- Números y "24 / 6 / 3 / 30 / 200" en TextGeometry 3D (lexend800.js trae dígitos); el "?" es geometría propia
  (como en caso-pedidosya). Años: no hay.
- Cámara continua en curva Catmull-Rom, sin cortes secos: mesa grande → mesa chica → "?" → mesa grande con gente →
  canastas → cucharita → frascos en órbita → celular → el celular como mesa → tienda → pago → local → cierre.

## Escenas (índice de palabra 0-based sobre guion.txt; tiempos estimados a 0,34 s/palabra, rehacer con tiempos.md)

| # | id | arranca en | ~dur |
|---|----|-----------|------|
| 1 | s01-gancho | 0 "Pusieron" | 2,4 s |
| 2 | s02-seis | 7 "vendieron" | 1,8 s |
| 3 | s03-porque | 12 "¿Por" | 1,7 s |
| 4 | s04-gente | 14 "Un" | 3,0 s |
| 5 | s05-canastas | 23 "Pero" | 3,6 s (dos golpes) |
| 6 | s06-ganas | 34 "No" (les) | 1,8 s |
| 7 | s07-despues | 38 "No" (pudieron) | 2,7 s |
| 8 | s08-whatsapp | 46 "Pensá" | 3,0 s |
| 9 | s09-mesa24 | 55 "Es" | 1,8 s |
| 10 | s10-tienda | 60 "En" (Scalerics) | 3,8 s (dos golpes) |
| 11 | s11-paga | 72 "El" | 1,8 s |
| 12 | s12-negocio | 77 "¿Querés" | 2,7 s |
| 13 | s13-cta | 86 "videollamada" | 2,6-2,9 s (con cola) |

### s01-gancho (0 "Pusieron" → "seis")
- Cuadro 0 = portada en movimiento: la **mesa de 24 frascos** llena el ancho (gradas, mantel, cucharitas), cámara
  a 3/4 desde arriba, empezando un push-in lento. Arriba, ya entero: "**24 mermeladas.**" (Lexend 900, 140 px,
  "24" en verde) y abajo, más chico, "¿Vendieron más?" (navy 90 px).
- "vendieron menos": no hay cambio de objeto todavía (el texto cambia en s02).
- SFX: `whoosh-cinematic` en 0, `pop` suaves escalonados mientras los frascos terminan de asentarse (0-0,8 s).

### s02-seis (7 "vendieron" → "seis")
- Travelling lateral a la derecha: aparece **la mesa de 6** (misma mesa, una sola fila, frascos más grandes en
  cuadro). Las dos mesas en cuadro, la de 6 adelante. "menos" → la mesa de 24 se apaga a gris crema (desatura);
  "seis" → la de 6 se prende, cada frasco da un pop. 3D "24" sobre la grande (gris) y "6" sobre la chica (verde).
- Rótulo HTML: pill "Vendió más" con línea guía a la mesa de 6.
- SFX: `whoosh` en el travelling, `pop` x6 escalonado en "seis".

### s03-porque (12 "¿Por qué?")
- Bisagra, UN solo objeto: la tapa cuadrillé de un frasco de la mesa chica sale volando hacia cámara, gira y se
  transforma en un **"?" 3D verde grande** centrado (dentro del 80 % seguro). Fondo crema liso.
- SFX: `whoosh-short` + `pop` al formarse el "?".

### s04-gente (14 "Un experimento famoso" → "gente")
- El "?" se encoge y cae como punto sobre la mesa de 24 (vuelve la mesa grande, ahora a color). Grúa hacia atrás:
  llegan **siluetas low-poly navy** (cápsula + esfera, sin caras) alrededor de la mesa grande: muchas; alrededor de
  la chica (al fondo, desenfocada) pocas. Contador HTML o 3D "60" vs "40" NO: solo siluetas (más / menos se ve).
- Rótulos: pill chica mono arriba a la izquierda "Experimento · 2000" (fuentes.md); en "más gente" pill verde
  "Más gente" con línea guía a la mesa grande.
- SFX: `click-soft` por cada silueta que llega (en ráfaga), `whoosh` en la grúa.

### s05-canastas (23 "Pero" → "treinta")
- Golpe 1 ("compraron tres de cada cien"): push-in a **una canasta verde** delante de la mesa grande. Caen solo
  tres frascos (pop, rebote). Número 3D "3" arriba en rojo apagado, "de cada 100" en HTML debajo.
- Golpe 2 ("En la de seis, treinta"): la cámara viaja a la otra canasta delante de la mesa chica; caen frascos en
  chorro hasta llenarla y desbordar un poco; el 3D "3" rueda a "30" en verde (como el 2009 → 2014 de pedidosya).
- SFX: `pop` x3 con `impact-bass-1` chico en el tercero; `whoosh` en el viaje; ráfaga de `pop` + `chime` en "treinta".

### s06-ganas (34 "No les faltaban ganas")
- Push-in macro a **un frasco abierto con una cucharita** de madera: la cucharita sale cargada de mermelada (que
  gotea, brillante) hacia cámara. El objeto llena la pantalla. Pill "Probaron" con tilde verde.
- SFX: `sparkle` suave al salir la cucharita.

### s07-despues (38 "No pudieron decidir" → "después")
- La cámara se aleja y orbita: los **24 frascos se despegan de la mesa y giran en anillo** alrededor de la cámara
  (mareo controlado); la cucharita va de un frasco al otro sin decidirse (3 saltos). "lo dejaron para después":
  la canasta se queda vacía y se desliza hacia afuera del cuadro; los frascos vuelven a su lugar.
- Rótulo chico (opcional, de fuentes.md): "Sobre todo si no sabés qué querés" (mono 30 px, navy al 70 %).
- SFX: `click-soft` en cada salto de la cucharita, `whoosh-short` en la órbita, `glitch-1` muy bajo en "después".

### s08-whatsapp (46 "Pensá en tu catálogo" → "sueltas")
- El anillo de frascos se cierra hacia un punto y de ahí crece **el celular** (vertical, grande, 70 % del alto).
  Pantalla: un chat genérico navy/crema (sin logo ni verde de la app) con una **grilla de miniaturas** que no para
  de subir (fotos = tarjetitas de colores planos con un objeto simple). Contador 3D o HTML "200" en rojo apagado
  que sube de 0 a 200 en "doscientas".
- Rótulo: pill "Tu catálogo" con línea guía al celular.
- SFX: `notification` en ráfaga (cada vez más rápido), `typing` bajo.

### s09-mesa24 (55 "Es la mesa de veinticuatro")
- CALLBACK: el celular se acuesta (rota a horizontal, cámara a 3/4 desde arriba como en s01) y las miniaturas se
  levantan de la pantalla como **frascos**: el celular ES la mesa de 24 (mismo encuadre que el cuadro 0).
  3D "24" arriba en rojo apagado.
- SFX: `whoosh` al acostarse, `pop` escalonado al levantarse los frascos.

### s10-tienda (60 "En Scalerics armamos tu tienda online" → "categorías")
- Golpe 1 ("tu tienda online"): los frascos se ordenan solos (se juntan, se van los que sobran) y el celular vuelve
  a vertical con **la tienda**: cabecera crema "Tu tienda", fila "Los más pedidos" con 3 frascos grandes.
- Golpe 2 ("lo más pedido primero, pocas categorías"): recuadro verde de selección sobre "Los más pedidos";
  en "categorías" entran 3 pills grandes (Mermeladas · Dulces · Regalos) con tilde. Interfaz de 28 px para arriba.
- SFX: `whoosh` en el orden, `sparkle`, `click` en cada pill.

### s11-paga (72 "El cliente elige, y paga")
- Un cursor/dedo toca un frasco de "Los más pedidos" (tilde verde "Elige") → botón "Pagar" verde → tilde "Paga".
  El frasco sale de la pantalla y cae en la **canasta verde** (el mismo objeto de s05, ahora llena de una).
- SFX: `click` en elige, `ping` en paga, `pop` al caer.

### s12-negocio (77 "¿Querés ver cómo quedaría en tu negocio?")
- La cámara se aleja: el celular queda en la mano/mostrador de **un local genérico** (fachada low-poly crema con
  toldo verde, cartel "Tu negocio"), la tarjeta "Pedido nuevo" vuela del celular al local y el local se prende.
- SFX: `whoosh-short`, `chime` al prenderse.

### s13-cta (86 "videollamada" → fin, 2,6-2,9 s)
- Tarjeta de cierre de marca: fondo verde `#5ce611` liso con objetos navy, o crema con verde (el fondo verde vale
  para el cierre según punto 7). El celular gira a horizontal y es la videollamada (como por-que-la-tarjeta).
  Texto grande: "Videollamada gratis" (Lexend 900 ~120 px navy) y "scalerics.com" (verde o navy según fondo,
  grande). Logo de Scalerics abajo. Arranca exactamente sobre "videollamada".
- SFX: `whoosh-cinematic` de entrada, `chime` en "scalerics.com". Cola 0,3 s y fundido de audio 0,35 s.

## Portada
- Fondo: cuadro limpio de s01 (mesa de 24 a pantalla llena) renderizado sin gancho ni subtítulos.
- `chica`: "24 mermeladas." · `grande`: "Vendieron menos" · `sello`: "¿Por qué?". Acento y sello en verde
  `#5ce611`; "menos" puede ir en rojo apagado. Todo entre y 285 y 1635.

## Construcción (constructor, 05-11)
- Voz Orus de una sola toma: 34,33 s, el "oyó:" coincide con el guion (sin frases salteadas). Los tiempos de STT se
  corrieron hasta 0,6 s en varios tramos ("¿Por qué?", "tres de cada cien", "En la de seis, treinta", "En Scalerics",
  "videollamada"): se corrigieron a mano en `assets/voice/palabras.json` mirando silencedetect y la envolvente RMS
  (la salida cruda de STT quedó en `palabras.stt.json`). Duración total 34,88 s (cola de 0,55 s para que el cierre dure 2,9 s).
- Escenas (inicio, s): s01-gancho 0 · s02-porque 4,53 · s03-gente 7,03 · s04-tres 9,37 · s05-treinta 11,39 ·
  s06-ganas 13,01 · s07-despues 14,38 · s08-whatsapp 17,12 · s09-mesa24 20,55 · s10-tienda 22,32 · s11-pocas 24,99 ·
  s12-paga 27,62 · s13-negocio 29,86 · s14-cta 31,97 (2,91 s, arranca en "videollamada").
- Base: caso-pedidosya (tres.js reescrito, gen.mjs, armar.mjs con TECHO -31 LUFS). Sobre crema: `armar.mjs` pone fondo
  #efeee5 liso, velo crema arriba (0-640 px), subtítulos navy con recuadro verde al 55 % (rojo apagado al 30 % para
  "tres", "después", "doscientas", "veinticuatro") y logo oscuro. Pills navy o verde lleno con texto navy.
- 3D: frasco = vidrio (lathe físico transparente con clearcoat) + mermelada (lathe del color de la fruta, con aire
  arriba) + tapa de tela cuadrillé navy/crema o verde/crema con faldón ondulado + hilo con moño + etiqueta crema con
  la frutita dibujada. Números 24/3/30/24 y el "?" pegados a la cámara (siempre arriba, nunca pisan objetos).
  Cambios de guion visual respecto del SPEC: en s01 no hay "24"/"6" 3D (el gancho ya los dice en texto grande y
  se pisaban); el "?" no cae sobre la mesa, se achica; el mantel es navy con ribete verde (el blanco no se leía
  sobre crema); en s07 la canasta vacía flota en el centro del anillo y se va a la derecha en "dejaron".
- Mezcla medida (pistas rearmadas desde index.html con ffmpeg): voz -15,3 LUFS, música+SFX -29,5 LUFS; en ventanas
  de 0,5 s con voz, la voz queda al menos 6,8 LU arriba (la más justa es el whoosh del cuadro 0). Pico premezcla
  -1,9 dBFS. SFX: los de caso-pedidosya más murmullo, campanita, ding y moneda copiados de otros reels del repo
  (no hay tintineo de vidrio en el repo: se usó `ding`/`campanita` bajos).

### Pasada 1 de director de arte (snapshots cada 0,5 s y puntos sueltos)
1. Gancho: la línea "24 mermeladas" se salía de cuadro → 118 px / 104 px; la mesa cortaba los costados y pisaba
   "que 6" → cámara más alta y más lejos (el, d, mira). El "24" y "6" 3D pisaban el gancho → afuera.
2. "?" gigante con el punto sobre el logo → escala 1,25 y más arriba.
3. Plano general de "famoso": mesas chicas → cámara más cerca.
4. Números 3 / 30 / 24 sobre los subtítulos → más chicos (0,6) y más abajo.
5. Asas de la canasta atravesaban los frascos → asas plegadas hacia afuera.
6. Canastas: la mesa grande ocupaba medio cuadro detrás → cámara de costado y más alta; los frascos caen de menos altura.
7. Macro "ganas": cuchara gigante en una esquina, frascos cortados, cartel en primer plano → cámara a 4,2 u, cartel y
   plato de la mesa chica ocultos en el macro, mermelada de la cuchara del color del frasco (arándano).
8. Anillo de s07 visto de canto (parecía una fila) → cámara a 45°; canasta vacía al centro del anillo.
9. Celular del catálogo pisaba subtítulos y logo → más abajo y más chico; el "200" en la cabecera; miniaturas
   redibujadas como frascos (vidrio, etiqueta, tela con ondas).
10. Celular acostado (mesa de 24) cortado → cámara más lejos; los 21 frascos que sobran ahora se hunden en la
    pantalla (antes volaban y quedaban puntitos sueltos); la tienda aparece cuando el celular empieza a pararse.
11. Tienda chica → más cerca; se sacó la pill "Tu tienda online" que tapaba "Pagar".
12. s12-s13: celular pisaba subtítulos → más abajo y cámara más lejos; local cortado a la derecha y canasta contra el
    borde → reencuadre. Subtítulo "Agendá una" se superponía con "Videollamada" → `sinSub` [86, 90].
13. Canasta de s04 aparecía mientras la gente todavía estaba ahí → la gente se va antes.
14. Cierre: "scalerics.com" entra con "gratis" (2 s en pantalla) y el celular baja para no tocarlo.
Segunda mirada completa (cada 1 s desde 0,25): sin defectos nuevos fuera de transiciones de 0,2-0,3 s.

## Construcción · ronda 1 (correcciones de arte, sonido y guion)
**Guion y voz.** G1 "La mayoría no pudo decidir y lo dejó para después." · G2 "Con seis mermeladas, treinta." (la toma
completa se comió "mermeladas": se regeneró solo esa frase, `partes/treinta2.wav`, y se pegó con ffmpeg; el STT ahora
oye "con 6 mermeladas 30"). 91 palabras. Voz a atempo 1,04 y la última frase a ~1,10 (si no, el cierre duraba 3,4 s):
34,0 s de voz, reel de 34,2 s. "les" en "No les faltaban": el STT oye "le" en las dos tomas; es la s aspirada del acento
(antes de f), no un error de texto. Tiempos corregidos a mano otra vez (silencios + envolvente), cruda en
`partes/locucion-cruda.wav`. G3 subtítulo "elige y paga." sin coma (texto de palabras.json). G4 sin pill en "ganas".
G5 descripcion.txt. G6 fuentes.md (4 de 145 contra 31 de 104, sección Sonidos).

**Escenas (inicio, s):** s01-gancho 0 · s02-seis 2,74 · s03-porque 4,50 · s04-gente 6,90 · s05-tres 8,77 ·
s06-treinta 10,51 (treinta + ganas, 3,3 s con dos golpes) · s07-despues 13,80 · s08-whatsapp 16,62 · s09-mesa24 19,58 ·
s10-tienda 21,53 · s11-pocas 23,64 · s12-paga 26,26 · s13-negocio 28,68 · s14-cta 31,19 (3,0 s, todo legible desde 31,4).

**Sonido.** whoosh-cinematic afuera (whoosh / whoosh-short). Sin ding, campanita, moneda, murmullo (solo banco del
molde). `armar.mjs`: no agrega el whoosh automático si la escena trae uno; mide el silencio inicial de cada SFX y
adelanta el cue (chime 0,42, ping 0,31, typing 0,44…); topes por defecto glitch-1 0,6 s, impact-bass 0,8-0,9 s;
techo por efecto -33 LUFS; música a 0,14 y recortada con fundido de 0,35 s (`bed-corte.mp3`). "seis" despejado (pops
después de la palabra, a 0,05). Pop al entrar la canasta de s12. Medido: voz -15,0 LUFS, música+SFX -34,0; en toda
ventana de 0,5 s con voz la voz queda ≥ 7,7 LU arriba; momentáneo (400 ms cada 0,1 s) mínimo 5,6 LU en 12,5 s, que es
el arranque de "No" (ventana casi muda). Pico premezcla -2,2 dBFS. Cortes de subtítulos "Pensá en | tu catálogo",
"armamos | tu tienda online:".

**Arte.**
- A1/A2/A11: canastas apartadas de las mesas (a la izquierda), cámara alta: fondo crema detrás de los subtítulos, las
  dos canastas en cuadro durante el viaje, la segunda junto a la mesa chica (el viaje al macro nunca queda vacío).
  Asas rígidas paradas sobre las paredes largas; frascos acomodados por capas sin atravesar paredes. "?" y números en
  una capa 3D aparte que se dibuja encima (nunca los tapa un frasco).
- A3: cucharita nueva (cuenco ovalado plano, mermelada brillante, gota con hilo) que sale por arriba del borde hacia
  la cámara; la tapa sale volando y desaparece; carteles y platos ocultos en el macro; camino blanco sobre el mantel,
  así debajo del frasco y del logo queda blanco.
- A4/A17: anillo = elipse parada frente a la cámara (radios 1,22 × 1,5), frascos al 90 % con espacio, el frasco al que
  apunta la cucharita se agranda, cucharita al doble; canasta vacía al centro que se va en "dejó"; el anillo se cierra
  en el centro y de ahí crece el celular (mismo encuadre).
- A5: celular acostado con el mismo 3/4 del cuadro 0, 24 frascos llenando el ancho; los 21 que sobran se hunden en
  0,25 s; el celular primero gira en su lugar y después se para, chico, dentro del cuadro.
- A6: sin velo degradé; cada subtítulo tiene su placa crema lisa.
- A7/A8: en "¿Por qué?" las mesas desaparecen y queda solo el "?" (entra antes, sin cuadro vacío); el gancho se va
  antes de que la cámara suba.
- A9: gente apretada alrededor de la mesa grande (15) y 2 en la chica; pill "Más gente" con línea guía.
- A10: rótulo del estudio a y 1690. A12: catálogo en forma de chat (fotos de distintos tamaños y torcidas, globitos de
  texto, frascos reconocibles), pill "Tu catálogo" chica a 1650. A13: frasco dibujado con contorno y tela pegada a la
  boca; "Pagar" navy con texto crema; recuadro de "Los más pedidos" adentro de la textura (sigue la perspectiva);
  sin sombra del celular cuando flota.
- A14: celular al 55-60 % del ancho, canasta a su derecha a media altura, pills "Elige" y "Paga" con línea guía a la
  tarjeta y al botón; los frascos salen por el costado. A15: el local es el protagonista, celular chico adelante a
  la izquierda, tarjeta que vuela y local que se prende. A16/A20: el mismo celular viaja al centro dándose vuelta y
  del otro lado está la videollamada (pantalla compartida con el frasco y la canasta); los tres textos del cierre
  entran en los primeros 0,2 s (legibles ~2,8 s). A18: mesa con margen a los costados y más abajo; el alejamiento
  arranca en 1,6 s. A19: las palabras aparecen enteras de una (sin fundido gris).
