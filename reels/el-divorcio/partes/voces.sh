#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-divorcio.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
MED="Sos una mediadora de divorcios uruguaya, de unos 50 años, en una sala de mediación: seca, cansada, cortante, sin ninguna emoción, como quien ya vio mil separaciones; lo gracioso es lo seca que es."
DUE="Sos el dueño de un comercio uruguayo, de unos 55 años, separándose de su vendedor estrella en una mediación de divorcio: dolido, herido, dramático como un marido abandonado."
VEN="Sos un vendedor estrella uruguayo, de unos 35 años, canchero, sobrador y pillo, separándose del dueño del local en una mediación de divorcio: tranquilo, seguro, disfrutando el momento."
gen 01 Kore "$MED Le hablás a cámara, directo al dueño que mira: la primera frase seca como un dato, la segunda como una sentencia que pica."
gen 02 Kore "$MED Abrís el expediente sin ganas: 'Mediación de bienes' con fastidio burocrático, 'La heladera' como quien lee un inventario."
gen 03 Charon "$DUE Con dignidad herida, firme."
gen 04 Fenrir "$VEN Generoso y sobrador, regalándola."
gen 05 Kore "$MED Leyendo el inventario, aburrida."
gen 06 Fenrir "$VEN 'Del local' sin importancia; 'me mareaba' como un chiste al pasar."
gen 07 Kore "$MED Con una pausa de suspenso, levantando la vista."
gen 08 Fenrir "$VEN 'Ah, no' sonriendo; 'esos quedan conmigo' lento, seguro, sobrador."
gen 09 Charon "$DUE Indignado y dolido, sin poder creerlo."
gen 10 Fenrir "$VEN Enumerando con los dedos, canchero, rápido y seguro, cada cosa como un golpe."
gen 11 Kore "$MED Seca, mirando al dueño por arriba de los lentes."
gen 12 Charon "$DUE Dudando muchísimo, con un hilo de voz, casi preguntando."
gen 13 Fenrir "$VEN Rematando el chiste, divertido, sobrador."
gen 14 Kore "$MED Dictando la sentencia como un juez: la primera frase firme; la segunda seca, como una concesión mínima."
gen 15 Charon "$DUE Desesperado, al borde del llanto, como un marido abandonado en una telenovela."
gen 16 Orus "Sos el narrador de Scalerics que entra cuando se calma la escena: cálido, claro y seguro, poniéndote del lado del dueño; la segunda frase como una verdad simple."
gen 17 Orus "Sos el narrador de Scalerics: claro y cercano, explicando simple, como un amigo que trae la solución."
gen 18 Orus "Sos el narrador de Scalerics: con una sonrisa, una frase redonda y cálida."
gen 19 Fenrir "$VEN Asomándose de nuevo, medio caradura, probando suerte."
gen 20 Kore "$MED Cortante, un 'No' seco y definitivo."
gen 21 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a alguien."
