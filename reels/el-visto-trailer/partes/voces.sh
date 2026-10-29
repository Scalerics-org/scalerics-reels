#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-visto-trailer. Después: recorta silencios de punta -> partes/NN-c.wav.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
TRA="Sos la voz en off de un tráiler de película épica de cine: voz muy grave, solemne y dramática, con peso en cada palabra, pero con el ritmo ágil de un tráiler moderno de un minuto: sin arrastrar las palabras y con pausas cortas, solo una pausa breve en los puntos suspensivos."
gen 01 Algenib "$TRA Arrancás a lo grande, épico; la última parte 'a contestar el jueves' es el remate: misma solemnidad, como si fuera heroico."
gen 02 Algenib "$TRA 'Basada en hechos reales' grave y lento; 'Los tuyos' después de una pausa, seco y acusador."
gen 03 Leda "Sos una clienta joven uruguaya que le escribe a un local de ropa por WhatsApp a la noche: amable, ilusionada, un poco apurada."
gen 04 Charon "Sos el dueño cansado de un local de barrio, mirando el celular de reojo mientras atiende la caja: agobiado, en voz baja, resignado, como héroe trágico de película."
gen 05 Algenib "$TRA Presentás al director con orgullo épico, como un gran nombre de cine."
gen 06 Leda "Sos una clienta joven uruguaya que espera respuesta por WhatsApp y nadie le contesta: insegura, un poco ofendida, en voz bajita."
gen 07 Fenrir "Sos el comerciante canchero de enfrente, rápido, simpático y seductor, que le contesta a una clienta al toque y le soluciona todo con una sonrisa pícara."
gen 08 Charon "Sos el dueño de un local que ve cómo su clienta se va con el de enfrente: grito dramático de película, desgarrado, exagerado, como en cámara lenta."
gen 09 Algenib "$TRA Leés las dos críticas de la prensa entre comillas como frases de póster de cine, con orgullo; después una pausa y 'Este verano… nadie contesta' susurrado, gravísimo."
gen 10 Algenib "$TRA Ahora bajás el tono, íntimo y conmovedor, como el giro emotivo del tráiler; 'Solo que está solo' con pausa; 'Contra mil mensajes' épico."
gen 11 Algenib "$TRA 'Próximamente' gigante, lento; 'la secuela' con pausa, triunfal."
gen 12 Charon "Sos el dueño de un local, ahora héroe de película de acción que vuelve: seguro, decidido, con una media sonrisa, frase de póster."
gen 13 Algenib "$TRA Leés el título de la secuela como el gran final del tráiler, a todo volumen y épico, separando las palabras."
gen 14 Orus "Sos el narrador de Scalerics que entra después de un tráiler de cine: cálido, claro, seguro y cercano, con una sonrisa. Ritmo ágil. El cierre '¿Qué actor haría de vos? Te leemos en los comentarios.' es una invitación canchera."
