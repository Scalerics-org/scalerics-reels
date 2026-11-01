#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/la-pesca.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Sos el CONDUCTOR de un programa de pesca deportiva de la televisión uruguaya, en un sketch de humor, arriba de una lancha al amanecer: hablás SUSURRANDO para no espantar al pez, emocionado, con suspenso, como en un documental de naturaleza, y de golpe te sale un grito contenido cuando pica. Muy expresivo y gracioso. Ritmo ágil."
CLI="Sos un CLIENTE de Montevideo, una mujer joven de unos 30 años, escribiéndole por WhatsApp a una mueblería: amable, curiosa, natural."
DUE="Sos el DUEÑO de una mueblería de barrio de Montevideo, de unos 55 años: cansado, desganado, despreocupado, contestando de taquito sin levantar la vista."
AGE="Sos un AGENTE DE IA que trabaja para un comercio, como un pescador experto y tranquilo: seguro, cálido, eficiente, con una sonrisa, explicando su método con orgullo profesional. Ritmo ágil."
gen 01 Fenrir "$CON Arrancás susurrando fuerte, en la cara del que mira, como una acusación de chisme: 'Lo tenías picando.' Pausa corta. 'Y lo soltaste.' seco y decepcionado."
gen 02 Fenrir "$CON 'Silencio...' en un susurro muy bajito; después presentás el programa susurrando con orgullo."
gen 03 Fenrir "$CON Mirando la pantalla de la sonda, maravillado, susurrando con mucha emoción contenida."
gen 04 Leda "$CLI Escribiendo una pregunta simple, amable y con ganas."
gen 05 Fenrir "$CON '¡Picó! ¡Picó!' gritado en susurro, eufórico; 'despacito...' muy suave, conteniendo el aire, como dando una instrucción delicada."
gen 06 Charon "$DUE Desganado, bostezando casi, sin ningún interés: '...cualquier cosa, avisame' arrastrado."
gen 07 Fenrir "$CON Indignado y desesperado, sin poder creerlo, susurrando a los gritos como si viera una tragedia."
gen 08 Leda "$CLI Desilusionada, enfriándose, educada pero ya perdiendo el interés."
gen 09 Fenrir "$CON Dramático y lento como en un documental, viendo al pez alejarse; 'a la mueblería de enfrente' con resignación y un dejo de burla."
gen 10 Charon "$DUE Pronunciando clarito la palabra volver. Despreocupado, confiado, tirado en la lancha, quitándole importancia."
gen 11 Fenrir "$CON Esta vez sin susurrar, en voz normal y clara: firme, seco, mirando a cámara; después la pregunta con desconfianza."
gen 12 Charon "$DUE Orgulloso de su idea, como si fuera brillante."
gen 13 Fenrir "$CON Exasperado, agarrándose la cabeza, gritando en susurro."
gen 14 Fenrir "$CON Leé la frase entera hasta la última palabra, mano. Por primera vez deja de susurrar: cálido, comprensivo, humano, como un amigo que lo entiende."
gen 15 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con energía y una sonrisa."
gen 16 Kore "$AGE"
gen 17 Leda "$CLI Contenta y entusiasmada, encantada de que le escribieran."
gen 18 Fenrir "$CON Festejando la captura a los gritos, eufórico, ya sin susurrar, como un gol."
gen 19 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a compartir el video."
