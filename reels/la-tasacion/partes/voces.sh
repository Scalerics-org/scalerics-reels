#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/la-tasacion.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
TAS="Sos el viejo tasador de una casa de empeños de Montevideo, de unos 70 años, detrás del mostrador con la lupa de joyero: voz grave y seca, sin ninguna emoción, con ritmo firme y ágil, cortante, sin arrastrar las palabras, como quien ya vio de todo. Habla poco y cada frase cae como un martillazo; lo gracioso es lo serio que es."
BET="Sos Beto, dueño uruguayo de una distribuidora de bebidas, de unos 62 años, cansado y orgulloso de su negocio, que viene a venderlo para jubilarse."
AYU="Sos el ayudante joven del tasador, de unos 22 años, uruguayo, canchero y burlón, que hace chistes por lo bajo de fondo, rápido y con picardía."
gen 01 Algenib "$TAS Lo dice mirando a cámara, como una sentencia, despacio y helado."
gen 02 Charon "$BET Entra seguro, saludando, orgulloso; la pregunta final con ilusión."
gen 03 Puck "$AYU Por lo bajo, burlón."
gen 04 Algenib "$TAS Mirando con la lupa, examinando. 'se descifra' con desprecio seco."
gen 05 Algenib "$TAS Leyendo el nombre del archivo con desdén, rápido y seco, cada 'final' como si no lo pudiera creer."
gen 06 Puck "$AYU Comentario burlón, rápido, sabelotodo."
gen 07 Algenib "$TAS Seco, la pregunta corta y filosa."
gen 08 Charon "$BET Incómodo, dudando, bajito."
gen 09 Algenib "$TAS La primera frase como un veredicto; después sigue revisando, seco."
gen 10 Charon "$BET Resignado, avergonzado."
gen 11 Algenib "$TAS Se saca la lupa y hace la pregunta clave mirándolo fijo."
gen 12 Charon "$BET Orgulloso, rápido, sin pensarlo."
gen 13 Algenib "$TAS La revelación: con una pausa dramática en los puntos suspensivos; 'vale cero' muy seco, lapidario."
gen 14 Puck "$AYU Por lo bajo, al jefe, aguantándose la risa."
gen 15 Charon "$BET Indignadísimo, ofendido, de manera muy cómica."
gen 16 Algenib "Sos el mismo viejo tasador de la casa de empeños, pero ahora se ablanda: le habla con respeto y calidez a Beto, con ritmo ágil, como un consejo de viejo sabio. 'vale un montón' con convicción."
gen 17 Orus "Sos el narrador de Scalerics que entra cuando se calma la escena: claro, cálido y seguro, como un amigo que trae la solución, ritmo ágil. 'sistema a medida' bien claro."
gen 18 Algenib "$TAS Seco pero con un dejo de simpatía, como despidiéndolo."
gen 19 Puck "$AYU Canchero, cerrando el chiste."
gen 20 Orus "Sos el narrador de Scalerics: cierre cercano y provocador, una pregunta que invita a contestar en los comentarios; la pregunta final bien marcada."
