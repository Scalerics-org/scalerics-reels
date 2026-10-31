#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-interrogatorio.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>partes/$1.err && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
MALO="Sos el POLICÍA MALO de una serie policial, interrogando a un sospechoso en una sala con una lámpara colgante: voz GRAVE, dura, intimidante, con un humor seco, como en las series de detectives. Ritmo ágil y firme."
BUENA="Sos la POLICÍA BUENA de una serie policial uruguaya: tranquila, dulce y un poco irónica, con aire de complicidad, como quien ofrece un café para que el sospechoso confiese."
DUENO="Sos el dueño de un restaurante de barrio de Montevideo, sentado en una sala de interrogatorio, transpirado y nervioso, defendiéndose con indignación y con humor, medio desesperado."
gen 01 Algenib "$MALO Arrancás con un golpe seco, acusando, como si fuera un crimen gravísimo. 'Y vos no estabas.' lento y pesado."
gen 02 Charon "$DUENO Lo gritás indignado, como si fuera obvio."
gen 03 Kore "$BUENA 'Todavía.' con una pausa amenazante y dulce; '¿Un cafecito?' amable."
gen 04 Algenib "$MALO Golpeás la mesa y cortás seco: '¡Nada de cafecito!' Después 'Prueba número uno' como quien tira una foto sobre la mesa."
gen 05 Leda "Sos una clienta joven de Montevideo que escribe por WhatsApp a un restaurante para reservar: simpática, ilusionada, un poco apurada. Lo leés como un mensaje de voz alegre."
gen 06 Algenib "$MALO 'Leído: nunca.' lento y cruel. 'Prueba número dos' tirando otra foto. 'Le contestaron en un minuto.' remarcándolo, como un golpe final."
gen 07 Charon "$DUENO Gritás desesperado, como en las películas, exigiendo tus derechos."
gen 08 Kore "$BUENA Ironía tranquila, casi divertida, como quien da un golpe bajo con una sonrisa."
gen 09 Algenib "$MALO 'Tenés derecho a guardar silencio' como en las series; 'Total, con tus clientes ya lo venís haciendo' con sarcasmo seco."
gen 10 Charon "$DUENO Estallás, indignado y gracioso, haciendo los gestos con la voz: la milanesa en una mano y el celular en la otra."
gen 11 Kore "$BUENA 'Ahí está.' como quien encuentra la clave del caso. 'No sos un vago.' comprensiva. 'Sos culpable de querer hacer todo solo.' firme y cálida."
gen 12 Orus "Sos el narrador de Scalerics que entra a la sala de interrogatorio y resuelve el caso: voz segura, tranquila y cálida, con un toque canchero. Enumerás claro y ágil, sin pausas largas."
gen 13 Kore "$BUENA Lo decís solemne y amable, como cerrando el caso."
gen 14 Algenib "$MALO Una sola palabra, después de una pausa, seca y con mala cara: 'Condicional.'"
gen 15 Orus "Sos el narrador de Scalerics que cierra un reel de Instagram: cercano, cómplice y canchero, con una sonrisa. 'ahora te contesto' imitando al que lo dice siempre."
