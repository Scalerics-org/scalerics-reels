#!/bin/sh
# genera las tomas de a una (la cuota de Gemini TTS es por minuto); reintenta si da 429
V=../../herramientas/voz.mjs
TA="narrador uruguayo de explicador curioso, ágil y cálido, cuenta una anécdota con picardía; pausa antes de 'y se olvidó' y antes de '¿Por qué?'"
TB="narrador uruguayo cálido y cercano, cierra un reel con una invitación tranquila, sin urgencia"
TR="almacenero uruguayo de 55 años, voz grave y cansada, en la cama de noche, aliviado, lo dice bajito y satisfecho, con media sonrisa: 'Anotado.' pausa corta 'Ya me olvidé.'"
una() { for k in 1 2 3 4 5 6; do [ -f "$2" ] && return; node $V "$1" "$2" --voz "$3" --tono "$4" && return; sleep 35; done; }
una partes/orus-a.txt partes/orus-a1.wav Orus "$TA"
una partes/ruben.txt partes/ruben1.wav Algenib "$TR"
una partes/orus-b.txt partes/orus-b1.wav Orus "$TB"
una partes/orus-a.txt partes/orus-a2.wav Orus "$TA"
una partes/ruben.txt partes/ruben2.wav Algenib "$TR"
echo LISTO
