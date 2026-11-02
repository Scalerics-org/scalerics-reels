#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/prueba-de-adn.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Sos Norma, la conductora de un talk show de escándalos de la tarde, uruguaya, de unos 45 años: teatral, exagerada, dramática, con picardía y pausas de suspenso, como en los programas de la tele de la tarde; y por eso es gracioso."
RUB="Sos Rubén, un ferretero de barrio uruguayo de unos 60 años, sentado en el sillón de un talk show: ronco, ofendido, herido en el orgullo, dramático de manera muy cómica."
ENF="Sos el comerciante de enfrente, uruguayo de unos 35 años, en un talk show: canchero, sobrador, pícaro, hablando con una sonrisa."
CLI="Sos Romina, una clienta uruguaya de unos 30 años contando el chisme en un talk show de la tarde: indignada pero divertida, rápida, con mucha actitud."
gen 01 Kore "$CON Arrancás a los gritos, presentando con todo: 'que pase el desgraciado' bien teatral; la segunda frase con misterio y suspenso."
gen 02 Kore "$CON Presentando al primer invitado, con tono de chisme."
gen 03 Charon "$RUB Indignado, golpeándose el pecho; 'la crié yo' casi llorando de orgullo herido."
gen 04 Kore "$CON Suspenso: una pausa en los puntos suspensivos y 'el de enfrente' como si fuera el villano."
gen 05 Fenrir "$ENF Sobrador, tranquilo, burlón."
gen 06 Kore "$CON Anunciando a la protagonista con entusiasmo de show."
gen 07 Leda "$CLI Contándolo rápido; 'en visto, Rubén' indignada señalándolo; lo del de enfrente encantada."
gen 08 Charon "$RUB Defendiéndose a los gritos, desesperado."
gen 09 Kore "$CON Abre el sobre despacio: 'tengo acá el resultado del ADN' con suspenso; pausa larga en 'Rubén...' y 'usted no es el padre' bien dramático y fuerte."
gen 10 Fenrir "$ENF Burlón, en voz baja, gozando."
gen 11 Kore "Sos la conductora de un talk show de la tarde, uruguaya, de unos 45 años, que ahora se pone seria y cálida, despacio, defendiendo a Rubén con cariño; el remate 'es del que le contesta' suave y firme, como una revelación."
gen 12 Orus "Sos el narrador de Scalerics que entra cuando se calma el escándalo: claro, cálido y seguro, ritmo ágil; 'agente de IA' bien claro, como la solución."
gen 13 Kore "$CON Feliz, triunfal, anunciando el final feliz del caso con picardía."
gen 14 Orus "Sos el narrador de Scalerics: cierre canchero, con una sonrisa, una invitación a compartir el video."
echo listo
