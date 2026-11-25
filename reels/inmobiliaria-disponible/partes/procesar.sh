#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB al principio, -50 dB al final)
cd "$(dirname "$0")/.."
TEL="highpass=f=300,lowpass=f=3400,acompressor=threshold=-24dB:ratio=3:attack=5:release=80,volume=-2dB"   # altavoz / nota de voz
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-diego-c     d1 "atempo=1.1"                    # Diego (Achird) "Silvana. El de Punta Carretas explota. Van doce." (se reusa en Q1)
v 02-silvana-b   s1 "atempo=1.05"                    # Silvana (Erinome) "Contestales vos." (el STT no lo oye bien en ninguna de 7 tomas)
v 03-diego-c     d2 "atempo=1.05"                    # Diego "Estoy mostrando."
v 04-silvana-a   s2                     # Silvana "Yo también."
v 05-silvana-a   s3 "atempo=1.1"                    # Silvana "¡Hola, Agustina! Perdón la demora. Sí, sigue disponible."
v 06-agustina-c  a1 "$TEL"              # Agustina (Laomedeia), nota de voz: "¡Qué bueno! Yo ya no."
v 07-alberto-b   al "atempo=1.1,$TEL"              # don Alberto (Charon), altavoz: "Silvana, ¿cómo va? ¿Nadie preguntó por el apartamento?"
v 08-silvana-c   s4                     # Silvana "Preguntar, preguntaron."
v 10-silvana-c   s5 "atempo=1.05"                    # Silvana "¿Y quién contesta?"
v 11-diego-b     d3 "atempo=1.1"                    # Diego "Ya contestó. Le pidió la garantía y agendó."
v 12-silvana-b   s6                     # Silvana "Esos dos, para mí."
v 13-agustina-a  a2                     # Agustina "¿Sigue disponible?"
v 14-silvana-a   s7                     # Silvana "Sí."
v 15-agustina-a  a3                     # Agustina "¡Qué bueno! Yo también."
v 16-silvana-c   s8 "atempo=1.1"                    # Silvana "Treinta y ocho. Seis visitas. Y el viernes firman."
v 17-silvana-b   s9 "atempo=1.12"       # Silvana a cámara "Comentá DISPONIBLE y te mando cómo funciona para tu inmobiliaria."
# narrador: assets/voice/narrador.wav = reels/abren-hoy-completo/assets/voice/narrador.wav (Rasalgethi, reusado)
# tiempos por palabra de las que usa la escena
for k in s3:05-silvana a1:06-agustina a3:15-agustina s8:16-silvana s9:17-silvana d1:01-diego al:07-alberto; do
  node ../../herramientas/tiempos.mjs assets/voice/${k%%:*}.wav partes/${k#*:}.txt assets/voice/palabras-${k%%:*}.json 2>&1 | grep -i "oyó" | sed "s/^/${k%%:*} /"
done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
