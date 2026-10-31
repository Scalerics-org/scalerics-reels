#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/el-mago; con reintentos).
# 13 se manda como "¡Tadá!" (igual que en el guion).
V=../../herramientas/voz.mjs
gen() { # n voz tono [txt]
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V ${4:-partes/$1.txt} partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
MAG="Sos El Gran Maximiliano, un mago de show de televisión uruguayo, grandilocuente, teatral y engreído: voz potente, estirando las vocales con pompa, como si anunciara el truco más grande de la historia."
ASI="Sos la asistente de un mago de televisión, montevideana, joven, simpática y muy despierta, con lentejuelas y paciencia infinita: clara, rápida y con un toque de picardía."
DUE="Sos el dueño de un local de barrio de Montevideo, de unos cincuenta años, que subió al escenario de un show de magia como voluntario: cansado, apurado, mirando el celular, sin ninguna gana de magia; habla de corrido, medio distraído."
gen 01 Fenrir "$MAG Arrancá con un golpe seco y teatral, como presentando el truco final, con suspenso antes de 'tres horas de tu vida'."
gen 02 Fenrir "$MAG De golpe se desinfla: se da cuenta y lo dice bajito, con burla, mirando a la cámara, como un chiste al costado."
gen 03 Leda "$ASI Lo anuncia a los gritos, con brillo de show, y después señala a alguien del público."
gen 04 Charon "$DUE Acepta de mala gana, apurado."
gen 05 Fenrir "$MAG Misterioso y solemne, en voz más baja, como hipnotizando."
gen 06 Charon "$DUE Lo interrumpe sin levantar la vista del celular, como dictándose a sí mismo mientras escribe."
gen 07 Fenrir "$MAG Con mucha pompa y suspenso, la frase queda en el aire porque lo interrumpen."
gen 08 Charon "$DUE Lo interrumpe con una pregunta medio irónica y después lo dice resignado, cansado."
gen 09 Fenrir "$MAG Lo grita con todo, como el gran número de la noche, ya un poco desesperado."
gen 10 Charon "$DUE Lo interrumpe otra vez, sin culpa, apurado, tecleando."
gen 11 Fenrir "$MAG Pierde la paciencia: furioso y teatral, como un divo ofendido."
gen 12 Leda "$ASI Lo calma, comprensiva y segura, defendiendo al dueño con cariño."
gen 13 Leda "$ASI Arranca con un '¡Tadá!' triunfal de show y después enumera rápido y con orgullo, como mostrando el truco."
gen 14 Charon "$DUE Asombrado y feliz, sin poder creerlo, casi riéndose."
gen 15 Fenrir "$MAG Encoge los hombros, despreocupado y canchero."
gen 16 Charon "$DUE Intrigado, en voz más baja, como pidiendo un secreto."
gen 17 Fenrir "$MAG Solemne y misterioso, con aire de superioridad, guiñando un ojo."
gen 18 Orus "Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta el truco en confianza después del chiste. Cerrás invitando a comentar, con humor."
