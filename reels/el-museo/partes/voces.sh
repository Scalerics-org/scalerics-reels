#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-museo.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>partes/$1.log && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
GUIA="Sos una guía de museo uruguaya de unos 50 años, mujer: voz pausada, solemne, culta y un poquito aburrida, como quien hace la misma visita guiada por milésima vez. Humor seco: decís las cosas más absurdas con total seriedad, sin reírte nunca. Solemne pero ÁGIL: hablás de corrido, a buen ritmo, casi sin pausas entre frases, como quien conoce el texto de memoria y lo recita rápido."
gen 01 Kore "$GUIA Das la bienvenida a la excursión con ceremonia; 'Es tu local' lo decís seca, lenta, como presentando la pieza más vieja de la colección."
gen 02 Kore "$GUIA Presentás una vitrina con respeto arqueológico; 'Circa 2015' como una fecha histórica; la última frase con resignación."
gen 03 Kore "$GUIA Describís una pieza delicada y frágil con admiración fingida."
gen 04 Kore "$GUIA Describís un objeto antiguo y manchado con total seriedad, como un manuscrito medieval."
gen 05 Kore "$GUIA Bajás la voz con reverencia: es la joya de la colección, un ritual ancestral. 'Si estaba abierto' lo decís seca, con ironía apenas perceptible."
gen 06 Leda "Sos un NENE de unos 8 años en una excursión escolar al museo: voz aguda e infantil, curioso, sorprendido de verdad, levantando la mano. Preguntás con inocencia total."
gen 07 Kore "$GUIA Contestás al nene seca, inmediata y tajante, con humor seco."
gen 08 Fenrir "Sos un turista uruguayo canchero, de unos 35 años, que pasea por el museo distraído con el celular en la mano. Lo decís relajado y divertido, al pasar, sin darle importancia; 'Me llega mañana' satisfecho."
gen 09 Kore "$GUIA Ahora te detenés frente a otra vitrina y cambiás el tono: cálida, sincera, con respeto de verdad, casi emocionada. La última frase la decís lenta y clara, como la moraleja de la visita."
gen 10 Orus "Sos el narrador de Scalerics que entra al final de una visita al museo: cálido, seguro, cercano, con una sonrisa, como un amigo que le da la solución al dueño. Ritmo RÁPIDO y suelto, de corrido, sin pausas entre frases."
gen 11 Orus "Sos el narrador de Scalerics: el cierre es una invitación canchera y cómplice a compartir el video, con humor. Rápido y de corrido."
