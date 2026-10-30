#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/habia-una-vez.
# Voces: abuela cuentacuentos Gacrux, Caperucita Leda, tu local Charon, el lobo (el de enfrente) Fenrir, narrador Orus.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.err && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
ABU="Sos una abuela uruguaya de unos 75 años que le lee un cuento infantil a sus nietos antes de dormir: voz dulce y cálida de cuentacuentos, con picardía y RITMO ÁGIL: es un reel, no arrastres las palabras ni hagas pausas largas; cada tanto suelta un comentario filoso con una sonrisa, como quien pincha sin querer queriendo."
CAP="Sos Caperucita Roja, una chica joven de Montevideo, de unos 20 años: voz fresca, simpática y expresiva, como en una obra de teatro infantil."
LOC="Sos el dueño de un comercio de Montevideo, de unos 50 años, que contesta el celular de mala gana, cansado y desganado, cortante, como quien está en otra cosa."
LOB="Sos el lobo del cuento de Caperucita, pero bueno: el comerciante de enfrente, canchero, seductor y pícaro, con voz grave y una sonrisa enorme, exagerado y teatral como en una obra infantil."
gen 01 Gacrux "$ABU Arrancás el cuento con 'Había una vez' bien de cuento, mágico; y 'Y no vivió feliz para siempre.' con una pausa antes y tono de chisme, pinchando."
gen 02 Gacrux "$ABU Contás la escena con dulzura, 'un domingo a la noche' con misterio; 'comprarte' remarcado, como hablándole a quien escucha."
gen 03 Leda "$CAP Preguntás con entusiasmo y educación, contenta."
gen 04 Charon "$LOC Contestás seco, en tres palabras, sin ganas."
gen 05 Gacrux "$ABU Con ironía: 'Y esperó.' y el segundo 'Y esperó.' con un suspiro corto, resignada."
gen 06 Leda "$CAP '¡Al fin!' aliviada y exagerada; después la pregunta con ganas de comprar."
gen 07 Charon "$LOC Lo decís rápido y de memoria, sin levantar la vista, desganado."
gen 08 Leda "$CAP Contenta y esperanzada, como quien ya casi lo logra."
gen 09 Charon "$LOC Cortante, como quien da un portazo: 'el lunes' bien plano."
gen 10 Gacrux "$ABU Con tono de cuento de miedo, misterioso; 'era muy largo' con picardía, sin estirarlo."
gen 11 Gacrux "$ABU Dramática, susurrando como en la parte del cuento que da miedo: 'apareció el lobo'; pausa y 'El de enfrente.' con una sonrisa filosa, como un chisme."
gen 12 Leda "$CAP Asombrada y maravillada, como Caperucita delante del lobo: 'qué tienda online tan grande tenés' cantadito, como en el cuento."
gen 13 Fenrir "$LOB Contestás encantado, seductor, como en el cuento, con picardía."
gen 14 Leda "$CAP Asombrada, cantadito como en el cuento, cada vez más encantada."
gen 15 Fenrir "$LOB Contestás pícaro y orgulloso, como el lobo del cuento."
gen 16 Leda "$CAP Asombrada y feliz, cantadito como en el cuento."
gen 17 Fenrir "$LOB El remate, triunfal y canchero, guiñando un ojo; 'mañana' bien marcado."
gen 18 Gacrux "$ABU Pícara y divertida; 'Y con la abuela.' después de una pausa, como un chiste."
gen 19 Gacrux "$ABU 'Moraleja:' solemne, de cuento; después, filosa y sonriente, 'era el único que le vendió' como una verdad que duele."
gen 20 Gacrux "$ABU Tierna y cómplice, hablándole directamente al dueño del comercio, consolándolo: 'la mejor canasta del bosque' con cariño; 'Te faltó el camino.' suave."
gen 21 Orus "Sos el narrador de Scalerics que entra cuando termina el cuento: cálido, claro y seguro, cercano, explicando simple; 'hasta un domingo a la noche' con una sonrisa."
gen 22 Gacrux "$ABU Cerrás el cuento: 'Colorín colorado' cantadito, de cuento; después, pícara y cómplice, la invitación a mandarle el cuento a alguien."
echo FIN
