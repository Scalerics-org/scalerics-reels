#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/nominado.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.err && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
COND="Sos la conductora de un reality show de convivencia en la tele uruguaya, en vivo y en horario central: eufórica, dramática, con suspenso de gala de eliminación, como anunciando algo enorme."
HNO="Sos la voz grave, lenta y misteriosa del Hermano de un reality show, que habla desde los parlantes de la casa al confesionario: voz profunda, solemne, sin emoción, casi de oráculo."
CLI="Sos una clienta uruguaya de unos 28 años en el confesionario de un reality: indignada, chusma, con mucha actitud, contándole a la cámara."
DUE="Sos Walter, dueño cansado de una tienda de ropa uruguaya, de unos 50 años, en el confesionario de un reality: a la defensiva, agotado, quejoso y un poco ofendido."
AGE="Sos un agente de inteligencia artificial que entra a la casa de un reality: voz clara, amable, segura y muy eficiente, con un toque de humor seco."
gen 01 Aoede "$COND Arrancás con un golpe seco, como una noticia bomba dicha a la cara; 'y no para un premio' con picardía."
gen 02 Aoede "$COND Con suspenso; 'contra el de enfrente' como un duelo; el final con euforia."
gen 03 Algenib "$HNO Seco y lento."
gen 04 Leda "$CLI Arrancás firme; 'me clavó el visto' ofendidísima; 'consultá por privado' imitando con burla; el final explotando, indignada y graciosa."
gen 05 Algenib "$HNO Seco, como un juez."
gen 06 Charon "$DUE Arrancás a la defensiva, enumerando rápido y cada vez más cansado; la pregunta final desesperado."
gen 07 Aoede "$COND Eufórica; 'abajo' con lástima teatral; 'arriba' festejando."
gen 08 Leda "$CLI Ahora fascinada y medio enamorada del de enfrente; 'al toque' con admiración."
gen 09 Algenib "$HNO Con una pizca de compasión; 'está jugando solo' lento; 'por eso, esta noche' dejando suspenso."
gen 10 Aoede "$COND ¡A los gritos de emoción, como anunciando la gran sorpresa de la gala!"
gen 11 Kore "$AGE Te presentás con calma y seguridad, rápido y claro; 'a las tres de la mañana también' con orgullo; 'se lo paso' amable."
gen 12 Leda "$CLI Sorprendida y encantada; '¡lo amo!' con entusiasmo exagerado."
gen 13 Charon "$DUE Perdido, desconcertado, en voz baja."
gen 14 Kore "$AGE Tranquila y cariñosa, con humor seco."
gen 15 Orus "Sos el narrador de Scalerics que entra cuando se calma la gala: cálido, claro y seguro, como un amigo que trae la solución."
gen 16 Aoede "$COND Cierre de gala, pidiendo el voto con suspenso y una sonrisa: '¿lo salvás o lo eliminás?' bien marcado."
