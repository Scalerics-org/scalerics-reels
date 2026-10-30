#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/mision-horario; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
JEF="Sos el jefe de una agencia de espías en una película de espías: un hombre de unos sesenta años, voz grave y solemne, desde la penumbra, pero con ritmo ágil y sin arrastrar las palabras, que da órdenes ultra secretas con seriedad total aunque el asunto sea ridículo. Humor seco, sin reírte nunca."
CER="Sos la Agente Cero, una espía de élite uruguaya de unos treinta y cinco años: fría, seca, profesional, precisa, como quien dicta un informe de inteligencia por un intercomunicador. Lo absurdo lo decís con total seriedad, y eso es lo gracioso."
gen 01 Algenib "$JEF Es la primera frase del video: un golpe seco, misterioso, como el arranque de un tráiler de espías. Pausa breve antes de 'un agente secreto'."
gen 02 Algenib "$JEF Leés la misión de corrido, con solemnidad pero sin pausas largas, como en las películas."
gen 03 Kore "$CER Sobrada, casi aburrida, como si fuera lo más fácil del mundo."
gen 04 Kore "$CER Leés el informe de la fase uno, rápido y seco. 'Y ayer había cola' con ironía helada."
gen 05 Kore "$CER Informe de la fase dos, seca, con un dejo de incredulidad al final."
gen 06 Kore "$CER Informe de la fase tres, cada vez más desconcertada, aunque sin perder la compostura."
gen 07 Kore "$CER Informe de la fase cuatro: 'siete números' lo decís como un hallazgo grave."
gen 08 Algenib "$JEF Ahora impaciente y fastidiado, como reprendiendo a su mejor agente."
gen 09 Kore "$CER Decidida, con adrenalina contenida, enumerando el equipo rápido, de corrido, como en una película de acción."
gen 10 Kore "$CER Llegás al lugar y lo describís en voz baja, tensa. La pregunta final, '¿desde cuándo?', perpleja y fastidiada."
gen 11 Algenib "$JEF Grave y lapidario, como dando una mala noticia en una película de espías. Ritmo ágil; solo 'hace una hora' más lento, como un golpe final."
gen 12 Kore "$CER Por primera vez se te quiebra la frialdad: preguntás casi con pena."
gen 13 Algenib "$JEF Primero con respeto, casi conmovido; después lapidario y con humor seco."
gen 14 Orus "Sos el narrador de Scalerics que entra al final después del chiste: cálido, seguro, cercano, con una sonrisa, como un amigo que te da la solución. 'Te encuentra hasta tu tía' con picardía."
gen 15 Algenib "$JEF Cerrás el video mirando a cámara, dando la última orden de la misión, con humor seco y un dejo de sonrisa."
