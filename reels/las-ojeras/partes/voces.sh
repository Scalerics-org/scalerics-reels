#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/las-ojeras.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
INF="Sos una INFLUENCER de maquillaje de Montevideo, de unos 25 años, grabando un tutorial para Instagram, en un sketch de humor: voz de influencer, cantarina, dulce y exagerada, muy entusiasta, sonriente, con tono de 'mis amores', hablando rápido y con mucha energía, como si todo fuera divino."
DUE="Sos NÉSTOR, el dueño de una ferretería de barrio de Montevideo, de unos 55 años, muerto de sueño, con la voz ronca y arrastrada, medio dormido, contestando el celular con los ojos cerrados. Gracioso sin querer."
gen 01 Zephyr "$INF Arrancás con un '¡Holis, mis amores!' bien cantarín y arriba; el resto rápido y entusiasta, y 'a las dos de la mañana' con picardía."
gen 02 Zephyr "$INF Presentando al modelo con ternura falsa, y 'Néstor, saludá' como a un nene."
gen 03 Charon "$DUE Contesta dormido, como si fuera un cliente: 'Buenas... sí, hay stock...' arrastrado y lento, y '¿Quién habla?' confundido, despertándose."
gen 04 Zephyr "$INF Anunciando el paso como en un tutorial: 'Paso uno: base.' Y el resto con un chiste cómplice, rápido."
gen 05 Zephyr "$INF Anunciando el paso con ritmo, explicando cada ojo como si fuera una técnica profesional, rápida y divertida."
gen 06 Charon "$DUE Medio dormido, quejoso y resignado, como quien recuerda un trauma."
gen 07 Zephyr "$INF Anunciando el paso con ritmo y brillo en la voz, rápida."
gen 08 Zephyr "$INF Anunciando el paso con ritmo; '¿estás?' imitando a un cliente pesado, alargado."
gen 09 Charon "$DUE Se despierta de golpe, sobresaltado, gritando como un soldado: '¡Estoy!' y después '¡Siempre estoy!' desesperado y agotado."
gen 10 Zephyr "Sos una influencer de maquillaje de Montevideo, de unos 25 años. Por primera vez sale del personaje: deja de actuar, se pone tierna y sincera, más bajito y más lento, con un suspiro en 'Ay, Néstor'. 'Lo que te falta es dormir' con cariño, como una amiga."
gen 11 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con energía y una sonrisa."
gen 12 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano y seguro, enumerando con ritmo, con una sonrisa."
gen 13 Zephyr "$INF Vuelve al personaje, feliz: 'Paso cinco' como el gran final del tutorial, y 'sin código de descuento' como chiste de influencer, con un guiño."
gen 14 Charon "$DUE Dormido, plácido y feliz, murmurando bajito entre sueños, estirando las palabras."
gen 15 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a etiquetar a alguien en los comentarios."
