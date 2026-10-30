#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/llame-ya. Voces: presentador Rolo Puck (01 07 09 12 16 17 18), asistente Aoede
# (02 05 10 13 15), clienta Leda (03), dueño Charon (04 06), Doña Elsa Gacrux (11), público (08 y 14:
# cuatro voces encimadas, a b c d), narrador Orus (19).
V=../../herramientas/voz.mjs
gen() { # n voz tono [archivo de texto]
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/${4:-$1}.txt partes/$1.wav --voz $2 --tono "$3" 2>partes/$1.log && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
PRE="Sos Rolo, el presentador de una teletienda de la televisión uruguaya de madrugada, de los años noventa: exagerado, canchero, vendedor, con sonrisa de dientes blancos y voz de anuncio, a los gritos de entusiasmo. Hablás RÁPIDO y de corrido, con mucha energía y picardía."
ASI="Sos la asistente de una teletienda de la televisión de los noventa, mujer joven, entusiasta hasta lo ridículo, aplaudiendo, con voz brillante de anuncio. Rápido y de corrido."
gen 01 Puck "$PRE Arrancás con un golpe de anuncio, burlón, como quien muestra un problema ridículo; '¡Eso se terminó!' a todo pulmón, triunfal."
gen 02 Aoede "$ASI Le das la razón al presentador con entusiasmo; después bajás un poco el tono, como quien cuenta un caso trágico de la sección ANTES."
gen 03 Leda "Sos una clienta joven uruguaya que manda un audio de WhatsApp amable y simpática, preguntando con ilusión. Natural, de corrido."
gen 04 Charon "Sos el dueño de un local, un hombre cansado de unos 50 años, torpe y distraído, en la cocina con el celular en la mano; empezás tranquilo y de repente gritás desesperado porque se te cae el celular en la olla de sopa."
gen 05 Aoede "$ASI Lo decís como una locutora de dramatización, con suspenso exagerado y trágico."
gen 06 Charon "Sos el dueño de un local, cansado, satisfecho y orgulloso de haber contestado por fin. Decís una sola palabra, corta y seca: 'ok'."
gen 07 Puck "$PRE Exagerás la tragedia, indignado y burlón, como quien muestra el peor caso del mundo."
gen 09 Puck "$PRE Triunfal, revelando un producto milagroso con fanfarria; enumerás rápido y cada vez más emocionado."
gen 10 Aoede "$ASI Enumerás las maravillas del producto con asombro, cada vez más emocionada."
gen 11 Gacrux "Sos Doña Elsa, una señora uruguaya de unos 70 años, dueña de una rotisería en Las Piedras, dando un testimonio en una teletienda de televisión: encantada, cálida, chusma y graciosa; la última frase con una risita de felicidad."
gen 12 Puck "$PRE Gritás la frase clásica de teletienda con muchísima emoción, como quien guarda la mejor sorpresa."
gen 13 Aoede "$ASI Primero asombrada; '¡Llame ya!' gritado como el remate clásico del anuncio."
gen 15 Aoede "$ASI Preguntás con curiosidad inocente; la segunda pregunta ilusionada, como quien espera un cuchillo milagroso."
gen 16 Puck "$PRE Ahora te ponés más tranquilo y cómplice, revelando un secreto: 'No' seco; lo demás orgulloso; la última frase con picardía, como un chiste."
gen 17 Puck "$PRE Te ponés sincero y cálido, le hablás directo al dueño que mira, con cariño, sin gritar."
gen 18 Puck "$PRE Le confesás a la cámara con una risita, bajando la voz, como quien rompe el personaje. Relajado y gracioso."
gen 19 Orus "Sos el narrador de Scalerics que entra al final de un sketch de teletienda: cálido, seguro, cercano, con una sonrisa, como un amigo. Ritmo RÁPIDO y suelto, de corrido. La pregunta del final, cómplice y divertida."
LAS="del público de un estudio de televisión que reacciona con un '¡Oooh!' largo de LÁSTIMA y pena, como cuando muestran algo triste y gracioso, descendente."
gen 08a Leda "Sos una señora $LAS" 08
gen 08b Fenrir "Sos un hombre $LAS" 08
gen 08c Kore "Sos una muchacha $LAS" 08
gen 08d Puck "Sos un muchacho $LAS" 08
for k in 14; do
  gen ${k}a Leda "Sos una señora del público de un estudio de televisión que reacciona asombrada con un largo '¡Oooh!' de admiración." $k
  gen ${k}b Fenrir "Sos un hombre del público de un estudio de televisión que reacciona asombrado con un largo '¡Oooh!' de admiración." $k
  gen ${k}c Kore "Sos una muchacha del público de un estudio de televisión que reacciona con un '¡Oooh!' largo de asombro." $k
  gen ${k}d Puck "Sos un muchacho del público de un estudio de televisión que reacciona con un '¡Oooh!' largo, asombrado." $k
done
