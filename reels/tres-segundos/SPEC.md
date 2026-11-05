# tres-segundos · Contador en vivo (3D real), ~31 s

Formato "contador o dato en vivo" del motion persuasivo (CLAUDE.md, punto 6), en 3D real (8b) a la vara de
`reels/caso-pedidosya` (8c). Producto: **sitio web** de Scalerics (rápido en el celular, con horario, fotos y
botón a WhatsApp). Dato verificado en `fuentes.md`: "53 % de las visitas desde el celular se abandonan si la
página tarda más de 3 segundos" (Google, 2016-2017). Google se nombra solo en texto (pill "Fuente: Google"):
nada de su logo, colores ni tipografía.

**Recurso central:** dos objetos que vuelven al final cambiados (callback): un **cronómetro de mano 3D**
(caja redonda crema, bisel navy, botón arriba, aguja verde, la zona después del 3 en rojo apagado) y un
**celular 3D gigante** (RoundedBox navy, pantalla crema) en una **parada de ómnibus** low-poly montevideana.
Al principio la página no carga (ruedita, pantalla en blanco) y la gente se va; al final, misma parada, mismo
celular, el cronómetro frena en verde mucho antes del 3 y la página abre entera.

**Fondo:** navy oscuro `#0b1220` liso (sin degradé; piso navy apenas más claro para recibir la sombra).
s04-s05 casi a pantalla completa de celular (el celular llena el cuadro). Cierre en verde de marca
`#5ce611` con letras navy. **Paleta de materiales:** navy `#0b1220`/`#16243d`, verde `#5ce611`, crema
`#efeee5`, blanco; rojo apagado `#b5544a` solo para el problema (zona de más de 3 s, ruedita, siluetas que se
van) y gris `#6b7385` para lo perdido.

**Base técnica:** copiar de `reels/caso-pedidosya` `assets/tres.js` (estructura), `assets/vendor/three/`,
`#capa3d` + `<canvas id="tres">`, `buildReady["tres"]`, `gen.mjs` y cómo `armar.mjs` escribe
`assets/tiempos3d.js`. `renderAt(t)` puro, azar con semilla. Cámara en una curva Catmull-Rom continua.
La fuente 3D (`lexend800.js`) solo trae dígitos y "$.,MUSNOno": el "%" y el "?" son geometría propia (como
en caso-pedidosya); la "s" de "3 s" va en HTML junto al número 3D o se usa la "S" del set.
Las escenas HTML son solo capa plana: gancho, subtítulos (1-3 palabras, ~86 px, arriba al centro, palabra
clave en recuadro verde), 1-2 rótulos con línea guía, pill de fuente, tarjeta de cierre.
Reglas técnicas de `SPEC-base.md` (del molde) para las composiciones; lo visual lo manda este SPEC.

## Guion (88 palabras, índices de palabra para `reel.json`)
```
 0 Si tu página tarda más de tres segundos en el celular,   (0-10)
11 más de la mitad de las visitas                            (11-17)
18 se va. Según Google.                                      (18-21)
22 Te buscan desde la parada, con hambre.                    (22-28)
29 Pantalla en blanco. Uno, dos, tres.                       (29-34)
35 Vuelve atrás. Elige otro.                                 (35-38)
39 Y nunca te avisa que se fue.                              (39-45)
46 Perdiste la venta antes de mostrar nada.                  (46-52)
53 Pasa con páginas viejas o pesadas.                        (53-58)
59 En Scalerics hacemos tu página rápida en el celular.     (59-67)
68 Misma parada: abre al toque, con horario, fotos y WhatsApp. (68-77)
78 ¿Cuánto tarda la tuya? Agendá una                         (78-83)
84 videollamada gratis en scalerics.com.                     (84-87)
```
Acentos sugeridos: tres segundos · mitad · Google · parada · blanco · atrás · nunca · antes · pesadas ·
rápida · al toque · WhatsApp · tuya · videollamada.

## Escenas (13)

**s01-gancho** (palabra 0) · Cronómetro 3D gigante (70 % del ancho, centro y 1000), ya en el cuadro 0
con la aguja arrancando desde 0. Gancho entero en el cuadro 0: "Más de **3 segundos**" (Lexend 900,
~130 px, "3 segundos" en verde) arriba; los subtítulos karaoke arrancan recién después del gancho
(~"celular"). La aguja corre en tiempo real (1 vuelta = 4 s marcados 0-1-2-3, más allá del 3 la corona en
rojo apagado). En "tres" (6) el botón de arriba baja (pop) y un "3" 3D grande sube arriba del dial; en
"celular" (10) la cámara arranca un travelling hacia atrás y el cronómetro se achica a la esquina
superior derecha (queda chico, siguiendo el reel como contador en vivo hasta s05). SFX: tic-tac en cada
segundo de la aguja, click en el botón, whoosh-short en el travelling.

**s02-mitad** (palabra 11) · Fila de 10 siluetas low-poly de clientes (cápsula + cabeza, crema, mate)
frente a un celular-vidriera 3D grande con la ruedita girando (el celular ocupa el centro, las siluetas
en semicírculo delante, tamaño de pantalla llena de lado a lado). Cámara: órbita corta de 20°. En "mitad"
(14) 6 siluetas se ponen grises y giran 180° (de espaldas). Rótulo HTML con línea guía: "Visitas desde el
celular". SFX: pop por silueta que gira (escalonados), whoosh suave.

**s03-se-va** (palabra 18) · Las 6 siluetas grises caminan fuera de cuadro (izquierda y derecha, sin
atravesarse); arriba, número 3D verde "53" + "%" geométrico (grande, arriba y limpio, sin pisar el
celular). En "Google" (21) aparece la pill HTML crema "Fuente: Google" bajo el número. SFX: whoosh doble
(los que se van), impact-bass-1 suave al aterrizar el 53 %.

**s04-parada** (palabra 22) · Travelling continuo: el celular-vidriera viaja a la mano de una silueta
(crema) parada en un refugio de ómnibus low-poly (techo curvo, cartel de parada genérico verde/crema sin
número de línea real). El refugio llena el ancho; en "hambre" (28) un globito 3D crema con un tenedor y
cuchillo (o una porción de pizza low-poly, de muzzarella: queso crema-amarillento, aceitunas) sobre la
cabeza. Rótulo: "Te busca". SFX: whoosh-cinematic en el travelling, pop del globito, ruido de tecleo
(key-press) cuando busca.

**s05-blanco** (palabra 29) · Zambullida al celular: la pantalla llena el cuadro (celular a pantalla
completa, bordes navy visibles para que se lea el objeto). Pantalla blanca con una ruedita de carga 3D roja
apagada que gira. El cronómetro de la esquina vuelve a crecer (40 % del ancho) sobre la pantalla. En
"Uno" (32), "dos" (33), "tres" (34) la aguja pasa cada marca y un número 3D grande ("1", "2", "3") hace
pop arriba; en "tres" la corona se pone roja apagada. SFX: tic-tac fuerte por número, glitch-1 corto en el 3.

**s06-atras** (palabra 35) · Un pulgar 3D low-poly (crema, grande, entra desde abajo a la derecha) toca
la flecha "atrás" 3D (verde no: gris) arriba a la izquierda del celular; la pantalla blanca se desliza a
la derecha y entra otra página genérica ya cargada (crema con bloques navy, sin marca ni nombre). En
"otro" (38) la cámara se inclina a la izquierda. Rótulo: "Elige otro". SFX: click en el toque, whoosh-short
del deslizamiento.

**s07-avisa** (palabra 39) · La cámara sale del celular y vuela (Catmull-Rom, sin corte) a "tu local":
fachada low-poly de una pizzería genérica (toldo verde/crema, vidriera con pizza en la mesada, persiana
arriba), con un mostrador y una campanita 3D sobre él. Nadie entra; la campanita no suena (queda quieta,
se apaga a gris en "nunca" 40). Rótulo con línea guía a la campana: "0 avisos". Sin culpa al dueño: el
dueño no está en cuadro. SFX: whoosh-cinematic (viaje), silencio corto antes de "nunca", un ping muy bajo
que se corta.

**s08-venta** (palabra 46) · Push-in a la vidriera: una caja de pizza 3D (cartón crema, tapa) sobre la
mesada; en "antes" (49) la tapa intenta abrirse y vuelve a cerrar, y la caja se pone gris (venta perdida).
Rótulo: "Sin mostrar nada". Objeto llena el 70 % del ancho. SFX: pop de la caja, un "thud" suave
(impact-bass-2 bajo) al cerrarse.

**s09-pesadas** (palabra 53) · Giro a favor del dueño: el celular vuelve grande; encima le caen 4-5
marcos de foto 3D enormes (crema, con imagen plana de pizza/local, gruesos como bloques) que lo aplastan
y hunden en el piso; en "viejas" (56) el celular muestra una página antigua (bloques grises, letra chica);
en "pesadas" (58) el último marco cae y el celular rebota. Rótulo: "Fotos pesadas". Sin cifras de MB. SFX:
impact-bass por marco (bajo, escalonados), rebote.

**s10-rapida** (palabra 59) · Las fotos se comprimen (escala a 30 %) y encajan como tarjetas dentro de la
pantalla; el celular se endereza y se ilumina en verde por el borde. En "Scalerics" (60) pill HTML chica
"Scalerics". En "rápida" (64) un tilde verde 3D grande. Rótulo: "Rápida en el celular". SFX: scan
(compresión), sparkle en el tilde, whoosh-short al enderezarse.

**s11-abre** (palabra 68) · CALLBACK: travelling de vuelta a la misma parada de s04, misma silueta, mismo
celular, mismo cronómetro en la esquina. En "abre" (70) el cronómetro arranca y frena con un click EN
VERDE muy antes del 1 (la aguja apenas se mueve; sin número de tiempo en pantalla ni en la voz). La
pantalla abre entera (zambullida corta): tarjetas de la página de la pizzería con tildes verdes en
"horario" (74: tarjeta con horario genérico), "fotos" (75: foto de la pizza) y "WhatsApp" (77: botón verde
grande "Escribinos por WhatsApp", sin el logo de WhatsApp). El globito de hambre se transforma en la caja de
pizza abierta (callback de s08). Escena de ~3,2 s con un cambio cada ~0,8 s. SFX: click del botón del
cronómetro, chime, pop por tilde, ping.

**s12-tuya** (palabra 78) · El cronómetro vuelve al centro, gigante (como en s01), con un "?" 3D verde en el
dial en lugar de la aguja; push-in. Texto HTML grande "¿Cuánto tarda la tuya?" dentro del 80 % seguro.
SFX: tic-tac lento (2 golpes), whoosh-short.

**s13-llamada** (palabra 84, "videollamada") · Cierre de 2,6-3 s sobre fondo verde `#5ce611`: el
cronómetro sale de cuadro y entra la tarjeta navy/crema "Videollamada gratis" y abajo, grande, en navy
sobre verde (o verde sobre navy en la tarjeta), "scalerics.com". Logo de Scalerics. Cola 0,3 s, fundido de
audio 0,35 s. SFX: whoosh, chime al aparecer "scalerics.com".

## Sonido
- Tic-tac: hace falta un SFX real CC0 (no está en `assets/sfx`); anotar autor, sitio y licencia en
  `fuentes.md`. Si no se consigue, `click-soft.mp3` por segundo. Nunca sintetizado con ffmpeg.
- Techo por efecto -31 LUFS (`TECHO` de caso-pedidosya), voz ≥ 6 LU arriba de música + SFX, final -14 LUFS,
  pico -1,5 dBFS.

## Portada (para `portada.json`)
- Fondo: cuadro limpio de s05 (celular en blanco con la ruedita roja y el cronómetro pasando el 3) sin
  subtítulos ni gancho. `chica`: "Tu página tarda" · `grande`: "3 segundos" o "¿Más de 3 segundos?" ·
  `sello`: "Según Google" · acento verde.

## Ojo en la revisión
- El dato dice "visitas", no "clientes" ni "usuarios": así en voz y rótulos.
- Ningún número de tiempo inventado (ni "0,8 s", ni "MB"); el 53 % es la única cifra.
- Sin logos ni colores de Google ni de WhatsApp. La otra página (s06) es genérica, sin nombre.
- La parada y la pizzería son genéricas uruguayas inventadas (sin número de línea de ómnibus real).
