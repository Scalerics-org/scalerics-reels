#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/la-galaxia.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.log && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
TRA="Sos la voz de un tráiler de cine épico espacial: grave, solemne y misterioso, y justamente por eso es gracioso porque habla de un almacén de barrio. Ritmo ágil de tráiler moderno: épico pero sin arrastrar las palabras, pausas cortas."
VIL="Sos un villano galáctico grave y majestuoso, un emperador de una película de naves espaciales, uruguayo: voz profunda y amenazante, canchera, con humor. Ritmo ágil y fluido, sin arrastrar las palabras ni hacer pausas largas."
CLI="Sos una clienta joven de unos 28 años mandando un audio de WhatsApp tarde de noche: simpática, un poco apurada y algo cohibida por la hora."
DUE="Sos el dueño de un comercio de barrio uruguayo, de unos 50 años, agotado y desbordado, piloteando una nave vieja que se cae a pedazos: exasperado y muy cómico."
NAR="Sos el narrador de Scalerics: cálido, claro y seguro, cercano, como un amigo que trae la solución, ritmo ágil."
gen 01 Fenrir "$TRA 'muy, muy lejano' estirado y lento; 'en visto' con peso; 'Y empezó la guerra' como remate solemne."
gen 02 Algenib "$VIL Se presenta con orgullo; 'un planeta que me regalás' saboreándolo, burlón."
gen 03 Leda "$CLI Pregunta normal y amable, disculpándose un poquito por la hora."
gen 04 Algenib "$VIL 'Nadie' seco; 'Silencio en la galaxia' susurrado; 'Vení al lado oscuro, querida' seductor y burlón."
gen 05 Charon "$DUE A los gritos, desesperado, enumerando rápido; el final cansado y ridículo."
gen 06 Algenib "$VIL La gran revelación dramática, muy lento, con una pausa breve después de 'Comerciante'."
gen 07 Charon "$DUE Grito dramático y desgarrado de película, exagerado y corto, como quien recibe la peor noticia."
gen 08 Fenrir "$TRA Se calma, cálido y admirado, defendiendo al dueño; 'tripulación' como revelación."
gen 09 Charon "Sos el dueño de un comercio uruguayo grabando un mensaje holográfico de auxilio, como en una película de naves espaciales: suplicante, solemne y un poco teatral, muy cómico."
gen 10 Orus "$NAR 'agente de IA' bien claro, como la revelación; enumerá rápido y simple; 'un copiloto que no duerme' con una sonrisa."
gen 11 Algenib "$VIL Furioso e incrédulo, el villano que pierde, gritando."
gen 12 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa; la primera frase como bendición épica de broma, después la pregunta invitando a comentar."
