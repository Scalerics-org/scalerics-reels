# Notas del constructor · por-que-sacar-numero (13-11)

Duración: **37,07 s** (voz 36,95 s, 94 palabras). Cierre 2,50 s (arranca sobre "videollamada", 34,57 s).
No se renderizó el mp4 (lo hace el coordinador).

## Cómo regenerar (desde la carpeta del reel)
1. Voz: `node partes/armar-voz.mjs` (tomas `partes/orus1-2.wav`, `partes/ruben-2.wav`, `partes/orus2-1.wav`; Orus con
   atempo 1,1 sin cambiar el tono; pausas normalizadas) → `assets/voice/locucion.wav`.
2. Tiempos: `node partes/ajustar-tiempos.mjs` (tramos de habla medidos con silencedetect -34 dB; palabras repartidas
   por sílabas dentro de cada tramo; el STT de `herramientas/tiempos.mjs` quedó en `partes/pal-stt.json` como control).
3. Boca de Rubén: `node partes/boca.mjs` → `assets/boca.js` (25,6-27,9 s).
4. `node gen.mjs && node armar.mjs`.
5. Portada: `LIMPIO=1 node armar.mjs`, snapshot del fondo limpio, `node armar.mjs` para volver (ver abajo).

## Voz
- Orus: 4 tomas de la parte 1. La 1 y la 4 se comían el "en" de "en la fiambrería" (el STT oyó "porque la
  fiambrería" también en el recorte aislado); la 3 decía algo como "se la ciudad". Elegida la **2** (STT del recorte:
  "porque en la fiambrería", "Graciela pidió por WhatsApp"). "MIT" sale "em-ai-ti" en inglés (el plan lo aceptaba);
  el STT oye "emaiti". "se la llevaban": el STT oye "se las" en todas las tomas (es la s de "llevaban" pegada).
- Rubén (Algenib) toma 2: 1,9 s, "¿Graciela? ¿Vos estabas antes?" (STT exacto).
- Orus parte 2 toma 1. "scalerics.com" se dice "Scálerics punto com" (STT: "escalerita.com", como siempre).
- Pausas: 0,5 s antes de "¿Por qué?", 0,6 s después; 0,45 s después de "esperar."; 0,45 s antes de Rubén, 0,4 s
  después; 0,42 s después de "primera."; 0,5 s al final.

## Planos (segundos globales)
| # | escena | inicio | plano 3D |
|---|---|---|---|
| 1 | s01-gancho | 0,00 | primer plano del numerador verde (60 % del ancho) con el ticket 23 colgando, vitrina detrás; push-in; en "sacar" (1,57) la mano entra por la izquierda y corta el ticket |
| 2 | s02-nadie-te-pase | 2,60 | el 23 vuela y crece hasta su lugar en la fila de tickets gigantes 21-25 (vista alta en diagonal); 3,7 sube la cinta, el 31 entra por la derecha y rebota (4,22); display 22 → 23 en "pase" (4,44); el 23 se pone verde |
| 3 | s03-por-que | 5,29 | push-in al display; en "qué" los dígitos se achican y sale el "?" verde; 6,1 el "?" gira y tapa la cámara |
| 4 | s04-bici | 6,33 | corte escondido: el "?" se aleja y queda el puño verde del manubrio; la cámara abre: ventanilla RETIROS con estantes y cajas, bici, recibo "RETIRO 2" (borde verde) |
| 5 | s05-se-la-llevaban | 9,51 | tres bicis con recibos 5, 7, 9 salen por la puerta de la derecha y cruzan detrás del recibo; flecha roja por cada una; 12,0 el recibo se pone gris y se inclina |
| 6 | s06-anos | 12,27 | grúa sobre la serpentina (20 postes, cintas verdes) con 14 tickets que avanzan en orden; 14,5 la cámara baja a la revista "Operations Research 1987", la tapa se abre y la cámara entra a la página |
| 7 | s07-balanza | 15,12 | corte desde la página crema a la balanza de dos platillos en el mostrador de Rubén: reloj de arena ("esperar") vs. ticket 23 roto con flecha roja ("que te pasen", 15,6); en "pesa" (17,52) baja el platillo derecho y el display marca la flecha |
| 8 | s08-almacen | 19,12 | travelling atrás desde la balanza: Rubén con el mate, el numerador apagado (gris), el display TURNO "00" apagado; 20,5 tres tickets "?" rojo apagado (WHATSAPP, MOSTRADOR, WEB) |
| 9 | s09-graciela | 21,77 | corte a la casa de Graciela (sillón verde, lámpara): push-in al celular: chat "Almacén de Rubén", burbuja "Rubén, ¿me separás un queso y una yerba? Gracias" 9:02; 23,2 la burbuja vuela a cámara |
| 10 | s10-walter | 23,53 | plano general desde la derecha: la burbuja cae en el celular boca abajo (vibra); Walter entra, Rubén le da la bolsa (24,15), Walter gira y se va |
| 11 | s11-ruben | 25,68 | primer plano: Rubén da vuelta el celular (2,4x) y lo sostiene con las dos manos; "¿Graciela?" cejas arriba, boca por amplitud; "¿Vos estabas antes?" mano a la nuca; "Sin número" |
| 12 | s12-sistema | 28,28 | el celular baja al mostrador y aparece la tablet "Pedidos"; Rubén se corre; el numerador se prende (verde, luz) y escupe 23, 24, 25 que vuelan a cada fila |
| 13 | s13-primera | 31,23 | push-in a la tablet: en "primera" (31,82) la fila 23 pasa a LISTO con tilde; 32,1 plano general: Graciela en el mostrador, display 23 verde, Rubén le da la bolsa |
| 14 | s14-cierre | 34,57 | fondo verde, "Videollamada / gratis / scalerics.com" y el numerador 3D con el 23 abajo |

## Objetos 3D (assets/tres.js)
Numerador (carcasa verde de marca, aro y frente navy "SAQUE SU NÚMERO", ranura, rollo crema, luz que se prende,
ticket colgando), tickets con troquel (canvas, número navy grande; versiones verde, rojo apagado, gris, "?" con
etiqueta de canal), display TURNO con dígitos TextGeometry verdes (lexend800b), postes con cinta, vitrina de
fiambrería (zócalo de azulejo navy claro, vidrio curvo, queso en horma con agujeros, salame con piolín y rodaja,
jamón cocido, queso envuelto), mano con puño de camisa (sin cara), "?" verde, pared de RETIROS con ventanilla y
puerta, bici genérica (ruedas con rayos que giran, puños verdes, sin logo), flechas rojas, serpentina, revista,
balanza de dos platillos (reloj de arena), almacén de Rubén (de por-que-las-tarjetas), celulares con chat genérico
(burbuja verde claro, sin el verde ni el logo de WhatsApp), tablet "Pedidos", laptop, bolsas con queso y yerba, casa
de Graciela. Personajes: Rubén, Graciela, Walter de `assets/personajes.js`. Larson no se dibuja.

## Sonido
Todo de `assets/sfx` (copiado de por-que-las-tarjetas): papel, tic, whoosh, pop, tac, golpe, ding, impact, ring
(bici), hoja, click, campanita, typing, respuesta, vibra, puerta, scan, sparkle, ping, chime. Nada nuevo.
Mezcla: ver la sección de pasadas.

## Mezcla (pre-loudnorm, `python3 partes/medir.py` + `python3 partes/medir-fino.py`)
I -16,9 LUFS, pico -4,2 dBFS (el paso 10 lleva a -14 LUFS / -1,5 dBFS). TECHO -31 LUFS por efecto (armar.mjs).
Tramos de 0,5 s con menos de 6 dB: 9,0 / 18,5 / 23,0, los tres son pausas (cola de palabra + silencio; la cama sube en
la pausa). Medido de a 0,1 s donde la voz suena: un solo tramo, 34,7 s con 5,8 dB (arranque de "videollamada" con el
whoosh del cierre, ya bajado a 0,08). Se corrieron detrás de la palabra: ring de la bici, impact/pop del "?", golpe de
"antes.", respuesta del chat, click del sistema; se bajaron campanitas, pop de la tablet, pop/chime del cierre.

## Pasadas de snapshots (PNG en scratchpad/numero-snaps/)
- p0-p5 (cada 1 s, construcción): numerador demasiado cerca y pisando el gancho → cámara a 2 m; fila de tickets
  con los números tapados → fila en profundidad y cámara alta; bici cortada y pared lisa navy → plano abierto,
  estantes con cajas en la ventanilla; revista: la tapa abierta tapaba la página a la que entraba la cámara → entra a
  la página derecha; balanza gigante → cámara a 2,3 m, brazo más corto; la cámara de Graciela atravesaba la cara →
  mira fija al celular; Walter de espaldas tapando a Rubén → plano desde la derecha, Walter de 3/4; celular de Rubén
  chico y tapándole la boca → 2,2x, adelante del mostrador, cámara más alta, manos a los costados; filas fantasma de
  puntos (parecían un collar sobre Rubén) → tickets "?" rojo apagado con WHATSAPP / MOSTRADOR / WEB.
- Pasada 1 (cada 0,5 s, 0-36,5): mano que sacaba el ticket fuera de cuadro; display TURNO cortado arriba → más bajo;
  rótulo "Llegó después" apuntando al 24 → al 31, que entra más adentro; cartel RETIROS debajo del subtítulo → cartel
  más chico y bajo, pared de 5 m (franja crema arriba); recibo cortado abajo → más chico; "Llegaron después" sin línea;
  rótulo "Walter · 9:10" quedaba cuando Walter ya se había ido → sale en "fue"+0,35; tablet y numerador cortados en
  s12; Graciela cortada en el plano general.
- Pasada 2 (cada 0,5 s desfasada 0,25 s): "?" que tapaba la cámara 4 cuadros → menos recorrido; subtítulo sobre el
  cartel en el arranque de s04 → la cámara abre en 0,35 s; burbuja del chat con "separás" cortado (texto fuera del
  globo) → tipografía ajustada al ancho; ojos cerrados de Rubén y Walter en un parpadeo mientras hablan → sin
  parpadeo automático; boca de Rubén tapada por el celular → cámara más alta y celular más chico; display "23" pisado
  por el subtítulo en s12 y en el paso al general → s12 en picado (el display queda fuera) y corte seco al general en
  s13 (R6); Rubén cortado a la derecha en s10 → cámara corrida.
- Verificación de cada arreglo con cuadros puntuales (p6-p12). `check --json`: ok, 0 errores (warnings: canvas al
  borde, estructura del #fondo, console de WebGL).

## Portada
`LIMPIO=1 node armar.mjs` + snapshot a 0,6 s → `portada-src/fondo-limpio-0.6.png`; corrida 300 px hacia arriba sobre
el crema de la pared → `portada-src/fondo-portada.png` (la que usa portada.json). Falta correr
`node herramientas/portada.mjs por-que-sacar-numero` después del render (pide el mp4 aunque haya fondo_limpio).

## Dudoso / para el revisor
- s12 (28,9-30,6): la mitad de abajo es el frente del mostrador (madera); el numerador, los tickets que vuelan y la
  tablet quedan en la mitad de arriba. La tablet recién se lee grande en el push-in de 30,6-31,8.
- 6,2-6,33: el "?" se acerca hasta casi tapar la cámara (2 cuadros casi todo verde, con volumen) antes del corte a la
  bici.
- s11: el texto del chat en el celular de Rubén es chico (~25 px en pantalla); el mismo mensaje ya se leyó grande en s09
  y el rótulo "Sin número" es grande.
- s08: el "?" WEB flota a la derecha sobre la laptop, que queda medio fuera de cuadro.
- Transiciones con personaje cortado un instante en el borde (19,3 Rubén al alejarse de la balanza; 23,7 y 25,0
  Walter entrando/saliendo).
- "MIT" se oye en inglés ("em-ai-ti"); "se la llevaban" el STT lo oye "se las".
- Las bicis que pasan quedan detrás del recibo (el recibo está adelante); se leen los recibos 5 y 7, el 9 casi no.

## Ronda 1 de corrección (3 revisores sobre el MP4) · 13-11
**Duración nueva 35,48 s** (voz 35,36 s), **95 palabras** (guion nuevo). Cierre 2,92 s desde "videollamada" (32,56).
Inicios: s02 2,45 · s03 4,90 · s04 5,66 · s05 8,78 · s06 11,74 · s07 13,82 · s08 16,61 · s09 19,05 · s10 20,67 ·
s11 23,55 · s12 26,00 · s13 28,78 · s14 32,56.

Voz y guion (A):
- `partes/armar-voz.mjs` rehecho por tramos: orus1-2 hasta 27,95 ("y se fue antes" entero) y orus2-1 hasta 10,30 ("com"
  entero). Frases nuevas con Orus: "Los que llegaron después se llevaban lo suyo antes." (n5-2; la n5-1 decía "los
  usuales"), "Que te pasen, muchas veces, pesa más que esperar." (n7-1; el STT oye "pesan" en las dos tomas: es la s
  de "pasen" pegada) y "¿Ponemos número en tu negocio?" (n13-1). Orus con atempo 1,15 (antes 1,1); pausas más cortas
  (después de "¿Por qué?" 0,6 → 0,36 s).
- STT de la locución: "…y se fue antes…" y "…escalerita.com" (el "com" está; el dominio siempre lo oye así). En el
  recorte de "se llevaban lo suyo antes" a tempo 1,15 el STT oye "los suyos han"; a tempo 1,0 lo oye perfecto: es el
  STT con el habla rápida, se entiende. 95 palabras: no llegué a ≤ 90 sin sacar contenido aprobado (el pedido era ≤ 90
  y ≤ ~35,5 s; la duración sí queda en 35,5 s).
- Tiempos: `partes/ajustar-tiempos.mjs` con tramos nuevos de silencedetect; boca de Rubén 23,45-25,7.
- `fuentes.md` filas 4 y 6 actualizadas al texto nuevo.
- Chat (s09/s11): fondo crema #efeee5, burbuja blanca con borde verde #5ce611, barra de estado de Graciela 9:02.

Visual (B):
- ALTA bolsa de Walter: la agarra con la mano izquierda (la de cámara) y se va con ella en diagonal hacia cámara.
- ALTA "?" verde liso: el "?" ya no viaja a la cámara; gira en el display y corte seco al plano abierto de RETIROS.
- s01/s02: corte limpio del numerador (que no pisa más) al plano alto de la fila (todo dentro: display, 21-25, cinta).
- Créditos 48 px con sublínea mono 44 px; tickets "?" con etiqueta navy 84 px (WHATSAPP/MOSTRADOR/WEB).
- Balanza: brazo más alto, platillos más bajos y reloj de arena más bajo (no lo atraviesa); cámara centrada; sin Rubén
  en el primer plano de la balanza; corte seco al plano general del almacén (s08).
- s08: tickets "?" abajo, sobre el frente del mostrador (ya no tapan a Rubén ni al numerador); el cartel del
  mostrador se esconde solo mientras están.
- Cartel nuevo "ALMACÉN RUBÉN" en el frente del mostrador (llena el 40 % de abajo en s12 y da identidad).
- s09: la cámara arranca en el celular (el subtítulo ya no cae en los ojos de Graciela); la burbuja que cruza el corte
  es chica y va al celular de Rubén.
- s10: cámara corrida; Walter de 3/4 sin brazo metido en el torso (se ve el de cámara).
- s11: celular más bajo y más chico, cámara más alta: se ve la boca de Rubén en "¿Graciela?".
- s12: la tablet aparece con las tres filas y "?" en el número; el numerador le da 23, 24, 25 (nunca en blanco); sin
  Rubén en el inserto; s13: corte al general (R6) con Graciela a la derecha, de frente, sin la balanza detrás.
- s05: los que llegaron después se llevan paquetes genéricos (caja de cartón con cinta verde y recibo 5, 7, 9) que
  saltan y se van; la bici de Larson queda.
- "Graciela · 9:02 · esperando" más arriba (no toca el logo); el display del almacén más chico y adentro.

Sonido (C): ring de la bici 0,025 → 0,02; impact y pop del "?" bajados; whoosh audible (0,07) en el corte al general
de s13; ding del cierre después de "com" (pal[94].end); typing de s09 bajado. Mezcla: I -16,8 LUFS, pico -4,2 dBFS;
ningún tramo de 0,5 s ni de 0,1 s con voz por debajo de 6 dB.

Pasadas: r1-pasada1 (cada 0,5 s) → cartel tapado por los "?", balanza detrás de Graciela, Walter cortado a la izquierda;
r1-pasada2 (desfasada 0,25 s) → frente del mostrador vacío en s08 antes de los "?", "Una sola fila" pisando la tablet
en el push-in, WEB tocando el borde. Todo corregido y verificado (r1-verif). `check --json`: ok, 0 errores.
Portada: fondo limpio regenerado (`portada-src/fondo-limpio-0.6.png`, `fondo-portada.png`).

Quedó flojo: 26,1-26,3 el celular y la tablet se cruzan un instante; 20,7 Walter entra cortado a la izquierda; 13,3 la
revista asoma abajo al final de la grúa; el pelo de Rubén (casquete) es el del módulo `personajes.js` (no lo toqué,
es el Rubén de siempre); 95 palabras (> 90).

## Ronda 2 de corrección · 13-11
**Duración 35,57 s** (voz 35,57 s), 95 palabras. Inicios: s05 8,78 · s06 11,95 · s07 14,03 · s08 16,82 · s09 19,26 ·
s10 20,88 · s11 23,76 · s12 26,21 · s13 28,99 · s14 32,77 (todo lo de después de s05 se corrió +0,21 s).
- Voz: n5-2 hasta 3,63 ("antes" entero; STT del recorte: "se llevaban los suyos antes", la s pegada de siempre).
  Tiempos de 8,78-11,69 rehechos a mano sobre silencedetect: "después" 9,68-10,03, "se la" 10,1, "llevaban" ~10,35,
  "lo suyo antes" 10,6-11,36. Boca de Rubén 23,66-25,91. Hoja de la revista detrás de "filas." y más baja; whoosh del
  corte corrido; impact/pop del "?" bajados; pop del cierre y ding más bajos.
- s13: Graciela entera a la derecha de 3/4 (x+0,78), Rubén a la vista, push-in lento de 4,0 a 3,3 m; le alcanza la
  bolsa con la mano derecha.
- s10: cámara más atrás y centrada: Rubén entero; rótulo "Walter · 9:10" abajo con guía al torso, aparece cuando
  Walter ya llegó (s10+0,5) y se va con él.
- "Agendá una" subtitulado (subHasta 91).
- s09: arranca en plano medio de Graciela (cara entera bajo el subtítulo, sillón) y empuja al celular.
- s11: sin mano a la nuca y sin rótulo RUBÉN.
- s02/s03: corte al plano del display sin push-in que corte el 23; "?" más chico, de frente, sin bloques y sin tapar
  TURNO. s04: plano más abierto (recibo entero).
- s12: plano más abierto (tablet y numerador enteros), el celular se achica y desaparece antes de que salga la
  tablet; display del almacén oculto en ese plano (quedaba bajo los subtítulos).
- Cierre: numerador con carcasa navy y 1,1x.
- Balanza: el reloj de arena ya está desde el corte (sin platillos vacíos).
- Pasadas: r2-pasada1 (cada 0,5 s) → Graciela tapando la cara de Rubén en s13 (corregida), platillos vacíos en 13,9
  (corregido); r2-pasada2 (desfasada 0,25 s) sin defectos altos. Mezcla: ningún tramo de 0,5 ni 0,1 s con voz < 6 dB;
  I -16,8 LUFS, pico -4,0 dBFS. check ok, 0 errores. Portada: el cuadro de 0,6 s no cambió.
Quedó flojo: 20,6-20,8 la burbuja chica llega al celular de Rubén por delante del mostrador; 22,9-23,7 Walter sale
cortado por la izquierda (es la salida); etiquetas de los "?" ~35 px.
