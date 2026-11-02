#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-naufrago.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
NAU="Sos Vero, dueña de una tienda de ropa de Montevideo, de unos 32 años, varada hace cuarenta días en una isla desierta, grabando su bitácora de náufraga a la cámara. Voz joven, expresiva, medio desquiciada por la soledad pero graciosa, dramática como en una película de supervivencia, con humor."
CLI="Sos una clienta joven de Montevideo cuyo mensaje llega adentro de una botella: lo leés corto, seco, con voz un poco lejana y distraída, como quien escribe rápido desde el celular."
PEL="Sos Wilmar, una pelota de vóley con una cara dibujada que vive con la náufraga. Voz grave, seca, monótona y sarcástica, de pocas palabras, como un amigo que tiene razón y lo sabe. Humor seco, sin gritar."
ORU="Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de la película de la náufraga: cálido, seguro, cercano, con una sonrisa, como un amigo que trae la solución."
gen 01 Leda "$NAU Arrancás con tono de bitácora solemne, como quien graba un diario de supervivencia; 'dos mil personas' con orgullo, y 'ni mi madre' con un bajón dramático y gracioso."
gen 02 Leda "$NAU Emocionada y esperanzada, como quien ve algo en la orilla."
gen 03 Kore "$CLI Una sola palabra, seca y aburrida."
gen 04 Leda "$NAU Contándolo con ilusión al principio y con bajón y fastidio al final, 'en otro lado' resignada."
gen 05 Kore "$CLI Seco, sin ganas, una pregunta corta."
gen 06 Leda "$NAU Indignada y desesperada, gritándole al mar, cómica: '¡es una botella!' casi llorando de risa y bronca."
gen 07 Kore "$CLI Pregunta corta, neutra y apurada."
gen 08 Leda "$NAU Resignada, derrotada; 'en el medio del mar' con incredulidad dramática."
gen 09 Leda "$NAU Medio loca, confesándolo en voz baja a cámara, y después dándose vuelta hacia la pelota con cariño."
gen 10 Puck "$PEL Seco, lento, con desgano: un 'te lo dije' sin emoción."
gen 11 Leda "$NAU Ofendida, señalándolo, a los gritos pero graciosa."
gen 12 Puck "$PEL Seco, sobrador, sin inmutarse, una pausita antes de 'que vos'."
gen 13 Leda "$NAU Gritando con euforia desesperada, saltando y agitando un cartel, a todo pulmón."
gen 14 Puck "$PEL Monótono, seco, aburrido, tres palabras sin emoción."
gen 15 Leda "$NAU Desconcertada, bajito, triste, sin entender."
gen 16 Puck "$PEL Más serio y pausado, sin sarcasmo: le decís la verdad con cariño seco. 'una botella' remarcado."
gen 17 Orus "$ORU Claro y entusiasta, enumerando con ritmo; 'compra sin esperar botella' con una sonrisa."
gen 18 Leda "$NAU Despertándose sorprendida y feliz, eufórica, incrédula."
gen 19 Puck "$PEL Dos palabras, seco y satisfecho."
gen 20 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano, cómplice y con una sonrisa, una invitación cálida y corta."
