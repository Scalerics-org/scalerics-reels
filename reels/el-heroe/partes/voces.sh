#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/el-heroe; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono [txt]
  [ -s partes/$1.wav ] && return
  for i in $(seq 1 30); do
    node $V ${4:-partes/$1.txt} partes/$1.wav --voz $2 --tono "$3" 2>partes/$1.err && return
    sleep $((20 + (RANDOM % 25)))
  done
  echo "FALLÓ $1"
}
NAR="Sos el narrador épico de un tráiler de película de superhéroes de cómic: voz grave, enorme, dramática y solemne, con pausas de suspenso, como si anunciaras el fin del mundo, pero con un guiño de humor."
VIL="Sos El Visto, un supervillano de cómic que deja a los clientes en visto: voz grave, lenta, susurrada y malvada, disfrutando cada palabra, con una risita contenida, como un villano de película que se cree genial."
CLI="Sos una clienta montevideana de unos treinta y cinco años que le escribe a la confitería del barrio: amable, apurada y con ilusión."
DUE="Sos el dueño de una confitería de barrio en Montevideo, de unos cincuenta años: agotado, desbordado, quejoso y gracioso, al borde del colapso."
AGE="Sos un agente de inteligencia artificial que trabaja en una confitería: voz clara, cálida, rápida y muy segura, con la calma de un héroe que llega justo a tiempo, con un toque de humor."
gen 01 Enceladus "$NAR Arrancá con un golpe seco y amenazante; pausa de suspenso antes de 'El Visto' y decilo enorme."
gen 02 Algenib "$VIL Susurrá con placer, lento, y remata 'Tus clientes, no' con malicia."
gen 03 Leda "$CLI Lo dice con ilusión y apuro, como un mensaje de voz."
gen 04 Algenib "$VIL Primero 'Visto' seco y satisfecho; después se burla imitando 'te contesto el lunes'; pausa y remata 'un pulgar' con una risita malvada."
gen 05 Enceladus "$NAR '¡Zas!' como una onomatopeya de cómic, a los gritos; después dramático y con pena por el dueño."
gen 06 Charon "$DUE Se queja enumerando todo, cada vez más rápido, y explota en 'el celular no para'."
gen 07 Enceladus "$NAR Solemne y sabio, como citando una gran frase; con ironía en 'bandeja de entrada'."
gen 08 Enceladus "$NAR Baja la voz con misterio y crece hacia 'se prendió solo', como el momento del origen."
gen 09 Zephyr "$AGE Contesta al instante, simpática y prolija."
gen 10 Leda "$CLI Sorprendida y feliz, casi no lo puede creer."
gen 11 Algenib "$VIL Grita derrotado '¡Nooo!' y después pregunta asustado y furioso."
gen 12 Zephyr "$AGE Se presenta con aplomo de superhéroe, tranquila y segura."
gen 13 Enceladus "$NAR Épico, como la frase final de un tráiler."
gen 14 Charon "$DUE Pregunta desilusionado y en voz baja, como un nene."
gen 15 Zephyr "$AGE Con ternura y respeto, como a un compañero cansado; sincera."
gen 16 Orus "Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta algo después del chiste. Cerrás invitando a etiquetar, con humor."
