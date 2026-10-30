#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/el-talento; con reintentos).
# 09 se manda como "equis" (partes/09-voz.txt) y en el guion queda "X".
V=../../herramientas/voz.mjs
gen() { # n voz tono [txt]
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V ${4:-partes/$1.txt} partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
PRE="Sos el presentador de un concurso de talentos de la tele uruguaya, en un escenario enorme: exagerado, entusiasta, grandilocuente, estirando las vocales como un animador de sábado a la noche, con picardía."
MAX="Sos Maxi, un empleado de comercio montevideano de unos veinticinco años, en un escenario de concurso de talentos: canchero, medio desganado y confiado, como si dejar en visto fuera un arte; habla relajado y con orgullo."
JUE="Sos la jueza exigente de un concurso de talentos, montevideana, seca, elegante e implacable: corta, fría y tajante, con desprecio gracioso."
SIM="Sos el juez simpático y buenazo de un concurso de talentos, montevideano, cariñoso y emotivo, casi paternal, que sufre al decir que no."
MAL="Sos el juez malo de un concurso de talentos: voz grave, lenta, sarcástica y cruel con elegancia, como un villano que disfruta decir que no."
AGE="Sos un agente de inteligencia artificial que audiciona en un concurso de talentos: voz clara, amable, eficiente y muy segura, rápida y prolija, con un toque de humor."
gen 01 Puck "$PRE Arrancá con un golpe seco, como presentando el número más escandaloso de la noche, y remata con burla en 'dejar a tus clientes en visto'."
gen 02 Puck "$PRE Anuncialo a los gritos, como presentando a una estrella."
gen 03 Umbriel "$MAX Hacé una pausa de suspenso antes de 'y visto', y decilo con orgullo."
gen 04 Umbriel "$MAX Lo dice orgulloso, como un truco de magia."
gen 05 Umbriel "$MAX Presenta el gran final con pompa, pausa antes de 'y contesto con un pulgar'."
gen 06 Algenib "$MAL Lento y sarcástico, disfrutando cada palabra; el final 'es un no' bien seco."
gen 07 Kore "$JUE Es una sola palabra: decila seca, cortante y con desprecio, como un portazo."
gen 08 Achird "$SIM Le cuesta decirlo, con pena."
gen 09 Puck "$PRE Lo grita como un escándalo y después le pregunta con falsa ternura." partes/09-voz.txt
gen 10 Umbriel "Sos Maxi, un empleado de comercio montevideano de unos veinticinco años, que de golpe se sincera en el escenario: cansado, honesto, un poco triste, sin chiste; se le quiebra un poco la voz."
gen 11 Achird "$SIM Se entusiasma de golpe, como quien descubre algo, y lo defiende con cariño."
gen 12 Puck "$PRE Lo anuncia con todo, como la sorpresa de la noche."
gen 13 Zephyr "$AGE"
gen 14 Algenib "$MAL Está sorprendido a su pesar: primero incrédulo, en voz baja, y después lo admite casi sin querer."
gen 15 Kore "$JUE Por primera vez se emociona y lo grita, eufórica."
gen 16 Umbriel "$MAX Pregunta perdido, con un poco de miedo, en voz baja."
gen 17 Zephyr "$AGE Lo dice con ternura, como a un compañero de trabajo cansado."
gen 18 Orus "Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta algo en confianza después del chiste. Cerrás invitando a votar en los comentarios, con humor."
