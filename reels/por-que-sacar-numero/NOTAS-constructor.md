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
