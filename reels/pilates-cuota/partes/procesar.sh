#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
LLAM="lowpass=f=7000"        # videollamada, muy leve
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-alicia-f  a1                          # Alicia (Laomedeia) "Ceci, ¿te pagué marzo?" (se reusa igual en Q3)
v 02-ceci-b    c1                          # Ceci (Vindemiatrix) "Ahora me fijo."
v 03-joaco-b   j1 "atempo=1.08"            # Joaco (Zubenelgenubi) "¿Y si les mandamos un link de pago?" (se reusa igual en Q2b)
v 04-ceci-a    c2 "atempo=1.08"            # Ceci "No. Yo no persigo a nadie."
v 05-alicia-b  a2 "atempo=1.15"            # Alicia "¡Ceci! Te transferí el 2. Mirá."
v 06-alicia-b  a3                          # Alicia "¡Con razón me hizo las mechas gratis!"
v 07-ceci-a    c3                          # Ceci "Inhalamos." (casi en susurro)
v 08-narrador-a narrador "atempo=1.05"     # Rasalgethi "Un cobro automático más tarde."
v 09-alicia-a  a4                          # Alicia "¿Ya? ¿Así nomás?"
v 10-ceci-b    c4                          # Ceci "Ya pagaron treinta y nueve."
v 11-ceci-b    c5                          # Ceci "El uno, a las siete y dos."
v 12-alicia-b  a5 "atempo=1.18"            # Alicia "Uy. Entonces las mechas las debo."
v 13-ceci-b    c6                          # Ceci "Y exhalamos."
v 14-sofi-a    f1 "atempo=1.1,$LLAM"       # Sofi (Achernar) "Comentá CUOTA y te mando cómo funciona para tu estudio."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
