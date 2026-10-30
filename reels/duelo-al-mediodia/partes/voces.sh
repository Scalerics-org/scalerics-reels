#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/duelo-al-mediodia.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.err && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
NAR="Sos el narrador de una película de spaghetti western: voz muy grave, lenta y solemne, ronca, como de trailer de cine del oeste, con pausas dramáticas; tan solemne que da gracia porque habla de un comercio de barrio."
CLI="Sos una clienta joven de Montevideo, de unos 25 años, escribiendo desde la cama a la noche; simpática, directa, liviana."
PIS="Sos el pistolero de enfrente en un western: canchero, rápido, seguro, con media sonrisa; un vendedor pillo de Montevideo que se las sabe todas."
DUE="Sos el dueño de un local de ropa de Montevideo de unos 50 años, cansado, lento y quejoso, que se hace el duro como un viejo vaquero."
gen 01 Algenib "$NAR Abrís la película con un golpe seco; 'Y vos ni te enteraste.' lento, pinchando al que mira."
gen 02 Algenib "$NAR Presentás el pueblo con misterio; 'a las once de la noche' marcado."
gen 03 Leda "$CLI Una pregunta corta y casual."
gen 04 Algenib "$NAR Tres golpes, frases cortas, tensión de duelo."
gen 05 Fenrir "$PIS Contestás al instante, rapidísimo y encantador, como quien desenfunda."
gen 06 Leda "$CLI Contenta y entusiasmada, rápido."
gen 07 Algenib "$NAR Con burla solemne: 'desenfundás' con suspenso, pausa, y 'un pulgar para arriba' como un remate ridículo."
gen 08 Charon "$DUE Lento, arrastrando las palabras, haciéndose el vaquero duro; 'forastero' con desdén, y lo del mate como excusa."
gen 09 Algenib "$NAR Como anunciando el título de una película, lento y épico."
gen 10 Charon "$DUE Indignado y quejoso, a los gritos, como un vaquero que perdió."
gen 11 Fenrir "$PIS Canchero y burlón al principio, '¿Yo?' riéndose; después confiado y claro explicando, 'a cualquier hora' bien marcado."
gen 12 Algenib "$NAR Moraleja final de la película, lento y solemne, con un dejo de gracia."
gen 13 Orus "Sos el narrador de Scalerics que entra cuando termina la película: cálido, claro y seguro, explicando simple y cercano, con una sonrisa."
gen 14 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a un amigo."
