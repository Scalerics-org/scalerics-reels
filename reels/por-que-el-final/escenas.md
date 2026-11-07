# Escenas de por-que-el-final (3D real, puntos 8b y 8c)

90 palabras, voz Orus, ~31-33 s estimados (0,34 s/palabra + pausas). Índices de palabra = como los cuenta
`reel.json` (separando por espacios; "scalerics.com." es una palabra).

**Fondo del reel: navy oscuro `#0b1220`** liso (piso navy apenas más claro `#111a2c`, sin degradés ni brillos
suaves: Instagram los rompe en bandas). Objetos en crema `#efeee5`, blanco, navy claro `#16243d`, verde `#5ce611`.
**El agua:** celeste-blanco translúcido sobrio (`#cfe3ea` al 55 %, MeshPhysicalMaterial con transmission baja y
roughness 0,15), superficie con ondas leves (desplazamiento seno, función del tiempo), reflejo marcado en el
borde. **SIN cubitos de hielo**: el agua del experimento estaba a 14 °C, fría pero no helada (ver fuentes.md).
Rojo apagado `#c7655b` SOLO para el problema: la columna del termómetro a 14 °C, el pico de la curva, el chat
callado. Subtítulos arriba al centro, crema, palabra clave en recuadro verde.

**Los tres objetos que cruzan todo el reel:**
- **LA MANO:** mano derecha 3D realista pero sobria, estilo maniquí de yeso (crema `#efeee5`, sin uñas ni
  arrugas, dedos separados y rectos, muñeca cortada en un puño de camisa navy). No caricatura, no guante.
- **LA CUBETA:** recipiente de vidrio rectangular de laboratorio (RoundedBox hueco, paredes de vidrio de 2 cm con
  bordes marcados en blanco), lleno a 3/4 del agua de arriba. Una sola cubeta; en la escena 2 aparece una segunda igual.
- **EL TERMÓMETRO:** termómetro de laboratorio grande de vidrio (cilindro con bulbo abajo), escala con rayitas
  navy gruesas, columna que es rojo apagado a 14° y se vuelve VERDE `#5ce611` al llegar a 15°. Números en
  TextGeometry ("14°", "15°") arriba del termómetro, limpios.

Cámara: una curva Catmull-Rom para todo el reel (cubeta → dos cubetas → "?" → termómetro → cronómetro →
termómetro → mano saliendo → curva del recuerdo → paquete → celular en la mano → termómetro → cierre), con
push-ins, órbitas cortas y grúas; sin cortes secos.

| # | id | arranca en | dur. aprox. |
|---|----|-----------|-------------|
| 1 | s01-gancho | 0 "Metieron" | 2,9 s |
| 2 | s02-mayoria | 8 "Para" | 2,6 s |
| 3 | s03-por-que | 15 "¿Por" | 2,6 s |
| 4 | s04-minuto-y-medio | 22 "O" | 1,9 s |
| 5 | s05-quince | 27 "y" | 2,8 s |
| 6 | s06-un-grado | 35 "Más" | 2,6 s |
| 7 | s07-pico-final | 42 "Recordamos" | 2,6 s |
| 8 | s08-cobrar | 49 "Al" | 2,9 s |
| 9 | s09-callan | 57 "Y" | 1,9 s |
| 10 | s10-sale-solo | 62 "Sale" | 2,9 s |
| 11 | s11-llego-bien | 70 "Al" | 3,0 s |
| 12 | s12-tu-local | 79 "¿Lo" | 2,5 s |
| 13 | s13-llamada | 86 "videollamada" | 2,8 s |

Si con la voz real alguna queda por debajo de ~1,7 s: unir s04 con s05 (arranca en 22) o s09 con s08 (arranca en
49), manteniendo el cambio de objeto dentro de la escena. Si s11 pasa de 3,2 s, partirla en 75 "Ese" (s11b) y
unir s12 con s11b si esa queda corta.

## 1 · s01-gancho (0 "Metieron la mano en agua fría, dos veces.")
- **Objeto:** LA CUBETA con LA MANO sumergida hasta la muñeca, enorme, en plano 3/4 levemente desde arriba,
  llenando el 70 % del ancho (zona y 580-1330), ya en cuadro en el segundo 0. Ondas en la superficie alrededor
  de la muñeca; un vaho blanco muy sutil sobre el agua (opcional, sin degradés grandes). EL TERMÓMETRO clavado en
  un rincón de la cubeta, columna rojo apagado a 14.
- **Movimiento:** en "dos veces" (pal. 6-7) la mano sale, chorrea, y vuelve a entrar (la otra mano: misma malla
  espejada, puño navy) con un pequeño splash.
- **Cámara:** push-in lento y órbita de 15° alrededor de la cubeta.
- **HTML:** gancho entero en el cuadro 0 (ver ganchos.md): "Agua fría, dos veces." / "La mayoría eligió **la más
  larga**. ¿Por qué?". Karaoke recién desde la escena 2.
- **SFX:** `splash.mp3` suave en la entrada y en "dos veces" (ver nota de origen en fuentes.md), whoosh corto.

## 2 · s02-mayoria (8 "Para repetir, la mayoría eligió la larga.")
- **Objeto:** la cámara retrocede y aparece una SEGUNDA CUBETA igual a la izquierda: dos cubetas lado a lado,
  repartiéndose el ancho (cada una 45 %). Sobre cada una, un cronómetro-chapa 3D chico: "60 s" (izq.) y "90 s"
  (der.). En "la mayoría" (pal. 10-11) caen sobre la derecha fichas redondas verdes que se apilan en una torre
  alta; sobre la izquierda, una pila baja de fichas crema. SIN números ni porcentajes en las pilas.
- **Transformación:** en "larga" (pal. 14) la cubeta de 90 s hace pop y se pone un tilde verde 3D encima; la de
  60 s se apaga a gris.
- **HTML:** rótulo con línea guía a la torre verde: "la mayoría".
- **SFX:** cascada de `ficha.mp3`/`moneda.mp3` suave al apilar, pop en "larga".

## 3 · s03-por-que (15 "¿Por qué? Un minuto a catorce grados.") · BISAGRA
- **Objeto (uno solo):** las cubetas bajan y sube un "?" 3D verde gigante, centrado (título dentro del 80 %
  seguro). En "Un" (pal. 17) el "?" se transforma: el gancho se estira y se vuelve recto y es la columna del
  TERMÓMETRO; el punto del "?" se hincha y es el bulbo. El termómetro queda vertical, 75 % del alto, y la
  columna sube en rojo apagado hasta 14. "14°" en TextGeometry crema, arriba a la derecha del termómetro, sin pisarlo.
- **Cámara:** push-in al "?", después grúa vertical que recorre el termómetro de abajo hacia arriba.
- **HTML:** en "Un minuto" un rótulo con línea guía al bulbo: "60 s".
- **SFX:** `impact-bass-1` suave en "¿Por qué?", `riser` corto al estirarse, `tic` al llegar a 14.

## 4 · s04-minuto-y-medio (22 "O un minuto y medio,")
- **Objeto:** zambullida desde el bulbo a un CRONÓMETRO de mano 3D grande (cuerpo crema, esfera navy con
  marcas blancas gruesas, aguja verde, botón arriba), 65 % del ancho. La aguja da la vuelta (1:00) y sigue media
  vuelta más (1:30); el anillo de los 30 s de más se pinta en verde.
- **HTML:** rótulo "90 s" con línea guía a la aguja (en "medio").
- **SFX:** `tic` rápido mientras gira, `click` en 1:30.

## 5 · s05-quince (27 "y al final el agua subía a quince.")
- **Objeto:** el cronómetro rota de canto y se aleja; la cámara viaja de vuelta al TERMÓMETRO, ahora dentro de la
  cubeta de la larga con la mano sumergida al lado. En "subía" (pal. 32) la columna sube UN grado de 14 a 15 y su
  punta cambia de rojo apagado a VERDE; "14°" se transforma (morph o flip) en "15°" verde, arriba y limpio.
- **Cámara:** push-in al tope de la columna.
- **HTML:** rótulo "+1 °C" con línea guía a la punta verde.
- **SFX:** `subida.mp3` corto, `ding` en "quince".

## 6 · s06-un-grado (35 "Más rato, pero terminaba un grado mejor.")
- **Objeto:** LA MANO sale del agua de la larga, de cerca y grande (60 % del alto): sube despacio, gotas que caen
  y hacen anillos en la superficie, los dedos se relajan y se abren. El termómetro queda atrás en verde a 15°.
  ESTE es el gesto que vuelve en el callback (escena 10-11): mano que sale bien = final que sale bien.
- **Cámara:** grúa hacia arriba siguiendo la mano, con la cubeta debajo en cuadro.
- **HTML:** en "rato" un rótulo gris con línea guía al cronómetro chico de fondo "+30 s"; en "mejor" un tilde
  verde junto a la mano.
- **SFX:** goteo/splash chico al salir, pop suave en "mejor".

## 7 · s07-pico-final (42 "Recordamos más lo peor y el final.")
- **Objeto:** las gotas que caen de la mano se estiran en una línea y forman una CURVA 3D gruesa (tubo extruido,
  crema) que recorre la experiencia de izquierda a derecha, llenando el ancho. En "peor" (pal. 45) un pin 3D rojo
  apagado se clava en el punto más alto (el pico); en "final" (pal. 48) un pin VERDE se clava en el último tramo
  que baja. El tramo del medio se vuelve translúcido, como que se olvida.
- **Cámara:** travelling lateral a lo largo de la curva, de pin a pin.
- **HTML:** dos rótulos con línea guía, uno por pin: "lo peor" y "el final".
- **SFX:** whoosh de travelling, `golpe` sordo en "peor", `ding` en "final".

## 8 · s08-cobrar (49 "Al vender, el final es después de cobrar.") · GIRO
- **Objeto:** la curva se convierte en el recorrido de una compra: el pin rojo se vuelve una chapita "pagado" y
  el pin verde del final se infla y ES un PAQUETE de cartón kraft con cinta navy y etiqueta crema, grande (60 %
  del ancho), que se cierra solo con un pop. El ticket de compra (papel crema con renglones navy gruesos y un
  tilde verde "pagado") sale de abajo de la curva y queda pegado al paquete.
- **Cámara:** push-in al paquete.
- **HTML:** rótulo "después de cobrar" con línea guía al paquete.
- **SFX:** `moneda` en "vender", cinta/pop en "cobrar".

## 9 · s09-callan (57 "Y ahí, muchos se callan.")
- **Objeto (problema):** el paquete se aleja y queda chico al fondo; adelante entra un CELULAR 3D grande (65 %
  del alto, cuerpo navy claro, pantalla crema), con un chat genérico (sin logo ni colores de ninguna app): el
  último globo es "Gracias por tu compra" y abajo NADA, los tres puntitos de "escribiendo" se apagan; la pantalla
  baja a gris con un borde rojo apagado tenue. Silencio visual, sin culpar a nadie.
- **Cámara:** push-in lento al chat vacío.
- **HTML:** sin rótulo o uno gris: "…".
- **SFX:** un `tic` de reloj y nada más (silencio de música un instante: que se note el silencio).

## 10 · s10-sale-solo (62 "Sale solo: Ana, tu pedido va en camino.") · CALLBACK 1
- **Objeto:** el celular gira y ahora lo sostiene LA MANO (la misma mano de yeso del experimento, con el puño
  navy, todavía con un par de gotas que brillan): la mano que salió del agua es la que recibe el final. Llega un
  globo verde "Ana, tu pedido va en camino" con doble tilde; en el fondo, el paquete sale volando en arco hacia
  la derecha (en camino).
- **Cámara:** órbita corta alrededor de la mano y el celular.
- **HTML:** sello verde "sale solo" (en "solo", pal. 63).
- **SFX:** `vibra` + `notification`, whoosh del paquete.

## 11 · s11-llego-bien (70 "Al otro día: ¿llegó bien? Ese grado lo automatizamos.") · CALLBACK 2
- **Objeto:** en "Al otro día" un mini calendario crema hace flip (el día cambia), y llega un segundo globo
  verde: "¿Llegó bien, Ana?" + una respuesta corta de Ana en crema ("¡Perfecto, gracias!"). En "Ese grado"
  (pal. 75-76) el borde del celular se vuelve la columna del TERMÓMETRO: la columna sube UN grado y su punta se
  pone verde, "15°" verde arriba (el mismo gesto de la escena 5). La mano lo sostiene firme.
- **Cámara:** push-in al globo y grúa corta hacia arriba hasta la punta del termómetro.
- **HTML:** rótulo "+1 °C" (el mismo de la escena 5) y en "automatizamos" sello "automático" en verde.
- **SFX:** `notification` en "¿llegó bien?", `subida` + `ding` en "grado".

## 12 · s12-tu-local (79 "¿Lo vemos en tu local? Agendá una")
- **Objeto:** vuelve LA CUBETA del principio, grande, pero el agua ahora tiene un tono apenas más tibio (el
  mismo celeste-blanco con reflejo verde sutil) y el termómetro marca 15° en verde; la mano está afuera, apoyada
  en el borde, relajada. Al lado, un frente de local low-poly genérico (toldo navy con borde verde, vidriera
  crema, sin nombre) entra con pop. Una sola composición, llenando el ancho.
- **Cámara:** órbita corta y push-in final al bulbo verde del termómetro, que crece hasta llenar la pantalla de
  verde y se vuelve el fondo de la tarjeta (sin cuadros vacíos: el bulbo siempre tiene brillo y borde).
- **SFX:** whoosh de cámara, pop del local.

## 13 · s13-llamada (86 "videollamada gratis en scalerics.com.") · 2,8 s
- **Tarjeta de cierre:** fondo navy `#0b1220` (o el verde del bulbo pasando a navy en 0,3 s): "Videollamada
  gratis" en Lexend 800 crema, ~120 px; abajo, grande y en verde `#5ce611`, "scalerics.com". Logo de Scalerics
  abajo. Arranca justo en "videollamada".
- **SFX:** whoosh suave de entrada; la música cierra con fundido de 0,35 s.

## Números para la voz y la pantalla
- En `guion.txt` van EN PALABRAS: "catorce", "quince", "un minuto y medio".
- En pantalla van EN DÍGITOS: "14°", "15°", "60 s", "90 s", "+1 °C". Ningún porcentaje.

## Paleta
- Fondo navy `#0b1220` · navy claro `#16243d` · crema `#efeee5` · blanco · verde `#5ce611` · agua `#cfe3ea`
  translúcida · kraft `#b8946a` (solo el paquete) · rojo apagado `#c7655b` (columna a 14°, pin del pico, chat callado).
