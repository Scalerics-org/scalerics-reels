# Notas del constructor · por-que-devolver-gratis (12-11)

## Qué se hizo
- Guion: cambio del coordinador aplicado antes de grabar (frase 10 = "La tienda decía, junto al precio: devolución
  gratis."; en s11 la etiqueta que viene en la caja es LA MISMA del gancho, "DEVOLUCIÓN GRATIS", sin usar). plan.md y
  SPEC.md actualizados (nota arriba de cada uno; "cambio gratis" → "devolución gratis", sello sin "30 días").
- Voz: Orus, dos tomas de `partes/guion-voz.txt` (`partes/orus1.wav` 38,2 s, `partes/orus2.wav` 36,5 s).
  `node partes/armar-voz.mjs` arma `assets/voice/locucion.wav`: toma 2 hasta "¿Lo ponemos en tu tienda?" + el final de
  la toma 1 ("Agendá una videollamada gratis en Scálerics punto com": en la toma 2 se oye "agenda EN una"), pausas
  normalizadas (0,55 s antes del "¿Por qué?", 0,4 s después de "Algo.", 0,62 s antes de "Y le quedaron."), atempo 1,07 y
  0,3 s al final. Duración 34,23 s (reel 34,35 s).
- Tiempos: `herramientas/tiempos.mjs` sobre la locución armada (`partes/pal-final-stt.json`). "oyó:" = guion salvo
  "siguió" ("si yo"), "championes" y "Scálerics punto com" ("escaleras punto com"). Arreglos a mano con silencedetect
  (-38 dB y -32 dB d=0,035) en `partes/ajustar-tiempos.mjs` (¿Por qué del gancho, bisagra, lo achica, ¿Devuelven/Algo,
  Y le quedaron, el cierre).
- `reel.json`: 13 escenas (las del SPEC), subtítulos con cortes a mano (1-3 palabras), "menos" y "riesgo" en rojo
  apagado. `armar.mjs` (base recordatorio): fondo navy claro #16243d liso, subtítulos crema con borde navy oscuro
  14 px, recuadro verde, logo blanco en píldora navy oscuro con borde verde, cierre verde.
- `assets/tres.js`: una sola escena Three.js, `renderAt(t)` puro, cámara por planos con Hermite monótona. Zonas:
  C cinta en U, E dos celulares-tarima con columnas, Q la caja sola y el "?", V celular-vitrina, P las dos pilas,
  R almacén de Rubén de noche, F "Tu tienda" y cierre. Objetos nuevos: caja kraft con 4 solapas articuladas, canto
  corrugado, papel de seda y cinta verde que se pega con barrido; etiqueta (DEVOLUCIÓN GRATIS / LA PAGÁS VOS / COMPRA
  NUEVA) con flecha de vuelta que se dibuja y código de barras; champión propio (franja recta verde, puntera crema, sin
  parecido a marcas) y el viejo (navy gastado, suela delantera en bisagra que aletea); medidor de riesgo; monedas;
  mano con índice; sello verde "Devolución gratis"; campera doblada; "4 años" 3D.
- `assets/personajes.js`: copia de hacen-envios + `pies` expuestos (para ponerle los championes a Rubén).
- `assets/vendor/three/lexend800d.js`: subconjunto propio de Lexend 800 con "años" (los de siempre no tienen la a, la ñ
  ni la s). Lo genera `partes/fuente3d.py` (fontTools) desde `assets/fonts/Lexend-var.woff2`.
- `gen.mjs`: capa HTML (gancho de 4 líneas, rótulos con línea guía, créditos de los estudios, tarjeta de cierre) +
  SFX por escena; mismos tiempos clave que tres.js. `assets/firma.json`: sin logo en el inserto del celular (s10) y en
  "Tu tienda" (s12). Orden: `node gen.mjs && node armar.mjs`.
- Sin SFX nuevos: todos de `assets/sfx` (copiados de por-que-el-recordatorio). No hay nada que anotar en fuentes.md.
- `check --json`: ok, 0 errores (warnings: canvas al borde, estructura anidada, track denso, algunos "line_unread" de
  rótulos de ~0,7-1,2 s que no entran en la escena).

## Planos (segundos globales)
0,00 C1 picado de la caja abierta en la cinta, etiqueta apoyada (flecha se dibuja en "devolver" 1,6) · 1,9 la etiqueta
entra, 2,12 las solapas se cierran en cadena, 2,54 cinta verde · 2,79 C2 grúa: la caja recorre la U · 3,9 "vuelve":
vuelven dos cajas con "COMPRA NUEVA" (una más grande) hacia cámara · 5,48 E dos celulares-tarima, las columnas caen de
a una, 6,1 "4 años" · 7,1 líneas punteadas "antes" · 8,34 push-in a la tienda 1: caja con "LA PAGÁS VOS", 8,6 monedas,
10,3 la columna se desarma (gris) · 11,47 travelling a la tienda 2: caja "DEVOLUCIÓN GRATIS", 12,13 la columna crece a
9 · 12,9 abre a las dos · 13,30 Q la caja sola, 13,53 se abre y sale el "?" · 14,22 V celular-vitrina con el champión,
14,65 la mano choca dos veces contra el vidrio (ondas), 15,1 medidor con la aguja en rojo · 16,1 la etiqueta vuela y
se sella junto al precio · 17,31 "achica": la aguja baja a verde-crema, el vidrio sube y el champión sale · 17,95 P el
champión cae en la caja de arriba de la pila de compras, se cierra · 18,25 +1 devolución · 19,7 +3 compras ·
21,62 R almacén de noche, Rubén en el banquito con el celular y el mate · 22,70 RP de costado: los championes viejos,
la suela del derecho aletea 3 veces · 23,73 R más abierto, nube con el pie (media navy) que no entra · 25,03 RC inserto
del celular (Rubén oculto en este plano), push-in; 26,65 sello "Devolución gratis" bajo el precio; 27,6 el pulgar toca
"Comprar"; 27,78 pantalla de pago con el mismo sello; 27,98 "Pagado" · 28,05 RM (pausa) timbre, la caja cae en el
mostrador, rebota y se abre: championes nuevos y la etiqueta sin usar · 28,79 RP los pies con los nuevos, talonazo
28,97; el viejo en el piso cierra la boca · 29,66 F1 "Tu tienda" (campera) gira a cámara, sello en 30,2 · 31,50 F2
cierre verde, la caja con cinta navy y tilde (2,85 s).

## Mezcla (python3 partes/medir.py, sobre los <audio> de index.html)
I -16,9 LUFS antes del loudnorm, pico -2,9 dBFS. Tramos de 0,5 s con menos de 6 dB: 5,0 (5,8 dB), 11,0 (1,0),
12,5 (5,5), 17,5 (-3,2). Medidos de a 0,1 s: 11,0 y 17,5 son pausas (cola de "menos." y silencio después de
"achica." con el whoosh del corte a s08); 5,0 y 12,5 están a medio dB. Bajé los SFX que pisaban palabras (pops de la
columna, glitch, ding, whoosh-cinematic de s03, whoosh de "achica"). Que el revisor de sonido lo confirme en el render.

## Pasadas de snapshots
- Pasada 1 (cada 0,5 s): cámara del gancho mal apuntada (la caja no estaba donde la cámara miraba), subtítulos con
  la palabra clave invisible (navy sobre navy antes del recuadro), "4 años" sin glifos (fuente subconjunto), las cajas
  que vuelven con la etiqueta de espaldas, etiqueta "LA PAGÁS VOS" tapada por la solapa, "?" cortado, vitrina con
  medidor bajo los subtítulos, pilas cortadas en los bordes, inserto del celular negro (la cámara quedaba dentro de
  Rubén), caja de s11 demasiado cerca, sello chico, puntera del champión como una cúpula. Todo corregido (encuadres
  recalculados con el ancho visible = 0,342 × distancia, fuente propia, etiquetas pegadas al frente, Rubén oculto en
  el inserto, champión rediseñado).
- Pasada 2: pies de Rubén ilegibles (de frente parecían almohadones y el banquito tapaba): banquito corrido atrás,
  contraplano de costado; champión del gancho que caía fuera de cuadro en s08; etiqueta sellada en la vitrina chica
  (texto < 36 px) → más grande; "Suben más las compras" cortado a la derecha; rótulos que asomaban en los cortes;
  "Pagar" nunca se tocaba antes del corte; giro de "Tu tienda" arrancaba con el dorso liso.
- Pasada 3 + cuadros a ±0,03 s de cada corte: sin defectos altos; pulgar más chico.

## Dudoso / pendiente
- s10 y s12: el subtítulo queda sobre la cabecera del celular ("Tienda"), se lee el subtítulo pero tapa el título.
- s07: el medidor tapa parte de "Tienda" en la cabecera de la vitrina; el champión en la vitrina se lee como zapatilla
  de perfil pero es simple.
- Contraplano de los pies (22,7-23,7): el mate de Rubén asoma grande arriba a la derecha.
- La nube: el pie es chico; se lee más el champión que el pie que rebota.
- "4 años" y créditos: las cifras son las del abstract (fuentes.md); "publicado en 2012" en el crédito de s03.
- Rótulos cortos (warnings line_unread): "Le gustan, pero duda" 0,8 s, "Lo que compraban antes" 0,9 s.
- Portada: `portada.json` con fondo limpio `portada-src/fondo-limpio-13.25.png` (las dos columnas, la línea "antes");
  alternativa `portada-src/fondo-limpio-1.0.png` (la caja con la etiqueta). Como en recordatorio, portada.mjs no lee
  `fondo_limpio`: hay que pasárselo.
- No se renderizó el mp4 ni se hizo commit.

## Ronda 1 de corrección (lista de los 3 revisores, DEFECTOS-r1.md)
Duración nueva 34,38 s (voz 34,26 s). Inicios: s02 2,79 · s03 5,22 · s04 8,11 · s05 11,24 · s06 13,14 · s07 14,03 ·
s08 17,99 · s09 21,65 · s10 25,36 · s11 28,62 · s12 29,70 · s13 31,50.

Voz: "Un estudio siguió a clientes de dos tiendas online." regenerada sola con dicción clara (partes/f3-1.wav,
pegada en partes/armar-voz.mjs → orus2b.wav; el STT igual oye "si yo", es el STT). "lo achica" no se tocó (las tomas
nuevas eran peores). Pausa después de "¿Por qué?" 0,58 s; el "?" queda 1,2 s. Tiempos rehechos a mano sobre
silencedetect (partes/ajustar-tiempos.mjs) con las correcciones del revisor de sonido.

Arte: 1-2 cabecera del celular debajo de los subtítulos (inserto y "Tu tienda" más lejos y centrados más abajo) · 3 sin
pulgar (onda en el botón), foto del producto también en "Tu compra", precio arriba del sello, rótulo sin línea guía y
se va antes del toque · 4 contraplano rehecho: primer plano limpio del champión viejo en el piso (la suela aletea como
boca, con la entresuela roja) y en "quedaron" Rubén de cuerpo entero levanta el pie con los nuevos, el viejo en el piso
· 5 vitrina 1,5 × 2,4 (≈ 70 % del ancho) · 6 brazo con manga navy que entra desde abajo · 7 champión rehecho: perfil
lateral extruido (talón, cuello acolchado, lengüeta, cordones blancos con ojalillos, puntera y talonera blancas, suela
gruesa con dibujo) · 8 ficha de vitrina propia, medidor sobre la foto (no tapa "Tienda"), crédito sobre el botón y se
va antes de "devolver", "Riesgo de comprar" se va antes de "achica" · 9 el vidrio se desvanece (no sube) y el champión
sale hacia cámara · 10 la cámara sigue a la caja por la U · 11 encuadre de las cajas que vuelven y guía a la caja ·
12 s03 arranca con las primeras cajas ya caídas y cámara cerca · 13 monedas de canto, entran en la caja · 14 nube más
grande, pie con media crema y puño verde, champión grande · 15 la caja cae desde más abajo, encuadre con la caja abajo
del subtítulo · 16 caja de adelante más adelante y la solapa de atrás a medio abrir · 17 "4 años" sale con corte, sin
achicarse · 18 la campera va dibujada en la foto (no sobresale) · 19 sin logo en s03-s05, inicio de s08 y el plano
final de los pies · 20 el champión cae desde más abajo · 21 etiquetas de la pila = flecha grande; "LA PAGÁS VOS" parada
en la caja, más grande; grillas de s03 sin el texto chico "Comprar", título "Tienda 1/2" más grande.

Sonido: 2 solapas y cinta después de "gratis?" con golpecitos de cartón bajos · 3 la caja de s08 se cierra después de
"¿Devuelven más?" · 4 el viejo cierra la boca en 29,8 (después de "quedaron") · 5 toques del celular en 27,38/27,75 con
click bajo, sin notification, timbre en 28,12 · 6 voz · 7-8 tiempos · 9 golpe sordo después de "menos." · 10 monedas =
ping corto bajo · 11 click de aguja + whoosh en "achica" · 12 ping alineado al sello (30,30) y el tilde late con el ding
· 13 pops de 12,1-12,4 a -3 dB, whoosh de s08 más bajo · 14 ver Voz.
Mezcla (medir.py): I -16,8 LUFS, pico -2,7 dBFS. Tramos < 6 dB: 2,5 (3,7; en 0,1 s la voz le gana por ~6,5 dB a la
cinta), 12,5 / 17,5 / 21,0 (pausas: voz en silencio, whooshes de corte), 18,5 (5,5).

Guion y datos: 1 descripcion.txt, fuentes.md y ganchos.md dicen "devolución gratis" · 3 compras 3 → 5 · 4 W&L "aumentó
entre 58 % y 357 %" en fuentes.md · 6 = arte 21.

Snapshots: dos pasadas completas cada 0,5 s + cuadros a ±0,04 y ±0,3 s de cada corte, y parciales en cada arreglo.
`check --json`: ok, 0 errores.
Queda: a 4,6 la caja grande que vuelve toca el borde izquierdo; en el primer plano del champión viejo el champión
queda arriba del centro con piso abajo; los rótulos de 0,7-1,2 s siguen con aviso line_unread.

## Ronda 2 de corrección (DEFECTOS-r2.md)
Duración 34,42 s (voz 34,30 s). Inicios: s02 2,79 · s03 5,37 · s04 8,11 · s05 11,24 · s06 13,14 · s07 14,07 · s08 18,03 ·
s09 21,69 · s10 25,40 · s11 28,66 · s12 29,74 · s13 31,54.
Arte: celular de Rubén (inserto sobre fondo navy liso, sin almacén) y "Tu tienda" a ~68 % del ancho desde el corte; Tu
tienda arranca girado 0,5 rad (no de canto) · s03 arranca con las columnas armadas, cámara más atrás · vitrina: créditos
abajo de la vitrina, "Riesgo de comprar" se va antes de "achica", el champión sale hacia cámara sin subir · nube: pie
con media navy claro de perfil (contrasta con la nube), sin botamanga, nube más a la izquierda · champión: suela de
una pieza (solo el viejo la tiene partida, sin escalón), puntera redondeada, cordones gruesos, sin aleta; en la caja
del mostrador los dos de perfil asomando y cámara más baja · pilas KP 1,0 y más juntas, cámara más cerca, cajas que
caen desde más abajo · el viejo del piso más grande (1,45), el pie izquierdo girado (los talones no se tocan) ·
bolsillo y ribete verde del delantal ocultos (flotaban sentado) · rótulo "Le gustan, pero duda" a la izquierda · logo
oculto desde "vuelve" hasta s05 y en s07 · s05 arranca en la tienda 2 (sin travelling que cruzaba etiquetas) · aro del
toque chico y corto; sello = placa plana (sin doble borde) · "?" encuadre más abierto · subtítulos con píldora navy en
s09-s11 (fondos claros) y sin margen extra en las palabras con recuadro (dobles espacios).
Sonido: tiempos de la frase 3 y 79-82 con los fija() del revisor; clic de boca 5,20-5,36 silenciado; locución a
-1,2 dBFS de pico; PAUSAS[3] 0,62 · papel.mp3 y ping.mp3 con lead fijo 0,32/0,31 s en armar.mjs · "achica" sin SFX
encima (click+whoosh antes, pop a 17,9) · "Y le quedaron" limpio (apertura antes, whoosh del corte -14 dB) · grupos de
pops realmente bajo el techo (armar multiplica ×4 y topaba: volúmenes 0,02-0,06) · s02 sin sparkle ni tac tardíos ·
pop de la pila después de "más?" · pops de s05 -6 dB · golpe+pop en cada toque del pie en la nube · pop del cierre
-6 dB · "Porque el que devuelve" en un grupo · pulso de la pila de compras en "todavía".
No hecho: regenerar "Scálerics punto com" (el STT oye "escalerita/escaleras" en todos los reels con Orus; se oye bien).
Mezcla (medir.py): I -18,1 LUFS pre-loudnorm, pico -4,0. Tramos < 6 dB solo en pausas (2,5 cinta; 21,0; 28,0 timbre) y
11,0 (5,5) / 25,0 (5,9).
