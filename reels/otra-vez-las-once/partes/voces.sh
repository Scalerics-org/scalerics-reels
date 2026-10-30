#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/otra-vez-las-once.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
NES="Sos Néstor, dueño de un local de barrio en Montevideo, de unos 50 años, contando en primera persona que está atrapado en un bucle temporal, como el protagonista de una película: voz de dueño cansado y resignado, con humor seco e ironía, un poco dramático, como quien ya vivió esa misma noche mil veces."
RAD="Sos un locutor de radio AM uruguaya, de los de la mañana, saliendo por un radio-reloj despertador: vozarrón de radio, entusiasmado, exagerado, con eco de estudio y mucha energía, como el que anuncia la hora en la radio de toda la vida."
gen 01 Charon "$NES Es el gancho del video: 'Todas las noches a las once revivo el mismo día' dicho grave y misterioso, como una confesión; 'Y no puedo salir.' seco, con angustia contenida."
gen 02 Fenrir "$RAD Gritás la hora a todo volumen; 'Arriba, que hay pedidos' canchero y alegre."
gen 03 Charon "$NES Te presentás resignado; 'como en la película de la marmota' con ironía."
gen 04 Charon "$NES 'Noche uno.' como el título de un capítulo; lo demás rápido y cansado; 'Uno por uno.' lento y harto."
gen 05 Fenrir "$RAD Gritás la hora otra vez, idéntico, a todo volumen."
gen 06 Charon "$NES 'Noche dos.' como título; rápido, cada vez más harto, sin pausas."
gen 07 Charon "$NES 'Noche cuarenta y siete.' como título, ya desesperado; lo demás de corrido, mecánico; 'Y hago la caja.' rendido."
gen 08 Charon "$NES Ahora con picardía, como quien planea una fuga: 'Probé escaparme.' cómplice; 'Me acosté a las nueve.' orgulloso, en voz baja."
gen 09 Fenrir "$RAD Gritás la hora otra vez, idéntico, a todo volumen, más fuerte que nunca."
gen 10 Charon "$NES Derrotado y con humor: 'Me desperté igual.' sin aire; 'Con el WhatsApp explotando.' rendido."
gen 11 Charon "$NES 'Noche trescientos doce.' como título, con la mirada perdida; lo demás como un loco que ya se sabe todo; '¿está listo lo mío?' imitando la voz de un cliente, aguda y graciosa."
gen 12 Charon "$NES Ahora con una revelación, lento y en voz más baja, como el momento en que el protagonista entiende la película."
gen 13 Orus "Hablá como un locutor de Montevideo. Sos el narrador de Scalerics que entra para resolver el bucle: voz segura, cálida y canchera; 'Se rompe automatizándolo.' es el remate, con una pausa después; lo demás claro y ágil, enumerando con ritmo."
gen 14 Fenrir "$RAD Gritás la hora otra vez, idéntico, a todo volumen."
gen 15 Charon "Sos Néstor, un dueño de local de Montevideo de unos 50 años, ahora feliz, relajado y tranquilo, tirado en el sillón, sonriendo; 'Mañana es otro día.' con alivio, como quien por fin salió del bucle."
gen 16 Orus "Hablá como un locutor de Montevideo. Sos el narrador de Scalerics que cierra un reel de Instagram: cercano y cómplice, una invitación canchera, con una sonrisa."
