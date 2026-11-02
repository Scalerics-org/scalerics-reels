#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/como-se-hace.
# documentalista (Puck) · clienta (Leda) · Gustavo, el operario (Charon) · narrador Scalerics (Orus)
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.log && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
DOC="Sos el CONDUCTOR de un documental de televisión sobre cómo se fabrican las cosas, en un sketch de humor: entusiasta, maravillado por cada máquina, didáctico, con tono de locutor de documental de los domingos que encuentra todo fascinante. Muy expresivo y gracioso. IMPORTANTE: hablás RÁPIDO, con ritmo de documental, sin estirar las vocales, pausas mínimas."
GUS="Sos GUSTAVO, dueño de una rotisería de Montevideo, a las once de la noche, agotado, ojeroso, con la voz arrastrada de cansancio y un humor resignado, en un sketch de humor. Hablás bajo y seco, sin dramatizar de más. IMPORTANTE: hablás con ritmo ágil, sin estirar las vocales, pausas cortas."
gen 01 Puck "$DOC Presentando el programa con entusiasmo de apertura; '¡Y tiene un solo operario!' como un dato asombroso."
gen 02 Puck "$DOC Anunciando la estación como un cartel; 'llega la materia prima' maravillado, en voz más baja, como quien observa un animal."
gen 03 Leda "Sos una CLIENTA joven de Montevideo que manda un audio de WhatsApp a la rotisería: simpática, apurada, casual. Hablás rápido y natural."
gen 04 Puck "$DOC Admirado, como si viera una máquina de precisión suiza; 'con precisión de relojero' con orgullo."
gen 05 Charon "$GUS Repetís como una máquina, monótono y cansado: 'Copiar. Pegar.' y después leés 'Fila cuarenta y tres' resignado."
gen 06 Puck "$DOC Anunciando la estación; 'tu pedido está listo' lo leés como si lo escribieras a mano, despacito; la última frase exaltado, maravillado."
gen 07 Puck "$DOC Anunciando las estaciones de corrido, rápido, como una cinta que acelera; después, con micrófono de entrevistador, amable y curioso: 'Señor operario, ¿cuántos turnos hacen acá?'"
gen 08 Charon "$GUS 'Uno.' seco; después lento y cansado, y al final se da cuenta que perdió la noción del tiempo: '¿qué hora es?' desorientado."
gen 09 Puck "$DOC De golpe incómodo y más bajo, mirando el reloj, sin entusiasmo."
gen 10 Charon "$GUS Resignado, con humor seco; 'La fábrica soy yo' con una mezcla de orgullo y agotamiento, como una confesión."
gen 11 Puck "$DOC Desconcertado, buscando alrededor, pregunta con inocencia."
gen 12 Charon "$GUS Confundido, de verdad no sabe de qué le hablan."
gen 13 Puck "$DOC Se le cae el entusiasmo: incómodo, carraspea con el 'Eh...', y dice el resto bajito, apenado, como quien da una mala noticia."
gen 14 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con una sonrisa; 'Y en tu negocio, también' firme y cómplice, y después enumerás con ritmo lo que hacen las automatizaciones."
gen 15 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: tranquilo y tierno; 'Gustavo, a dormir' como quien manda a alguien a descansar con cariño."
gen 16 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a compartir el video."
