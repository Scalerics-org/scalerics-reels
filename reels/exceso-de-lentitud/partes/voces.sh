#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/exceso-de-lentitud.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>partes/$1.err && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
INS="Sos una INSPECTORA DE TRÁNSITO uruguaya en un control de ruta de noche, como en un reality de controles policiales de la tele: seca, firme, de pocas palabras, impasible, con un humor muy seco, como si todo fuera un trámite. Ritmo ágil."
DUE="Sos el dueño de un comercio de Montevideo de unos 50 años, cansado, parado en un control de tránsito de noche: nervioso, haciéndose el tranquilo, defendiéndose con indignación cómica."
gen 01 Kore "$INS Arrancás con un golpe seco, mirando por la ventanilla con la linterna. '¿Sabés a qué velocidad venías contestando?' lento y acusador, como en las películas."
gen 02 Charon "$DUE Sonrisa nerviosa, haciéndote el inocente."
gen 03 Kore "$INS Leés el radar como una sentencia. 'Exceso de lentitud' remarcado, como una infracción gravísima. 'Esto no es Rápido y Furioso, querido: es Lento y en Visto.' con ironía seca, despacito el título final."
gen 04 Charon "$DUE Indignado y quejoso, como quien protesta una multa injusta."
gen 05 Kore "$INS Pedís los documentos como un trámite, revisando una libreta. '¿Cuándo es después?' con desconfianza y una pausa."
gen 06 Charon "$DUE Dudás, buscando una respuesta, y te sale una sola palabra, avergonzado: 'Y... después.'"
gen 07 Kore "$INS 'Soplá acá.' seco. Pausa. 'Da positivo en: ahora no puedo.' leyendo el aparato, impasible, remarcando 'ahora no puedo'."
gen 08 Charon "$DUE Estallás, desesperado y gracioso, como un hombre que hace mil cosas a la vez."
gen 09 Kore "$INS De golpe se ablanda: 'Ya sé.' comprensiva y humana. Después explica firme y clara, con un toque de humor, como quien da una lección de manejo."
gen 10 Orus "Sos el narrador de Scalerics que entra cuando se apagan las sirenas: voz segura, tranquila y cálida, con un toque canchero. Enumerás claro y ágil, sin pausas largas; 'agentes de IA' bien claro."
gen 11 Kore "$INS Una frase corta, devolviendo los papeles, con media sonrisa."
gen 12 Orus "Sos el narrador de Scalerics que cierra un reel de Instagram: cercano, cómplice y canchero, con una sonrisa. 'a diez por hora' con gracia, despacito."
echo listo
