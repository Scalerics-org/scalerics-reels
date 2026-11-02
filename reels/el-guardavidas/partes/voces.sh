#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-guardavidas.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
GUA="Sos un GUARDAVIDAS de la rambla de Montevideo, en un sketch de humor que parodia una serie de guardavidas de los noventa: canchero, bronceado, seguro de sí mismo, relatando el rescate desde la torre como un héroe de serie de acción, con dramatismo exagerado y gracioso. Muy expresivo. Ritmo ágil."
CLI="Sos una CLIENTA de Montevideo, una mujer joven de unos 28 años, escribiéndole por WhatsApp a una tienda de ropa: amable, natural."
DUE="Sos el DUEÑO de una tienda de ropa de Montevideo, de unos 50 años, tirado en una reposera en la playa con el mate: relajado, desganado, cero apuro, sin abrir los ojos."
AGE="Sos un AGENTE DE IA que atiende el WhatsApp de una tienda de ropa: cálido, rápido, simpático, eficiente, con una sonrisa. Ritmo ágil."
gen 01 Fenrir "$GUA Arrancás con un grito de alarma, señalando: 'Bandera roja.' seco y fuerte. Después dramático, acusando al que mira. 'Y vos, tomando mate' con indignación burlona."
gen 02 Fenrir "$GUA Presentando la serie con orgullo de galán, como la apertura de un programa de televisión; lo del termo y los bizcochos con picardía."
gen 03 Fenrir "$GUA Por el handy, con prismáticos, alerta y profesional, en tono de operativo."
gen 04 Leda "$CLI Escribiendo una pregunta simple, amable y con ganas de comprar."
gen 05 Fenrir "$GUA Tranquilo y confiado, quitándole importancia, le habla al dueño: es un rescate facilísimo."
gen 06 Leda "$CLI Esperando respuesta, un poco insegura, como hundiéndose de a poco, cada vez más bajito."
gen 07 Fenrir "$GUA Desesperado y escandalizado, gritando como en la escena más dramática de la serie."
gen 08 Charon "$DUE Arrastrando las palabras, bostezando, sin ningún interés."
gen 09 Fenrir "$GUA Indignado, sin poder creerlo, gritando."
gen 10 Leda "$CLI Desilusionada, ya sin interés, educada pero fría."
gen 11 Fenrir "$GUA Leé la frase entera hasta la última palabra. Acá deja de gritar: cálido, comprensivo, humano, como un amigo que lo entiende. 'a las ocho me bajo de la torre' con humildad y algo de gracia."
gen 12 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con energía y una sonrisa."
gen 13 Kore "$AGE Le contestás a la clienta al instante, contenta de ayudar."
gen 14 Leda "$CLI Aliviada y feliz, como si la hubieran rescatado del agua."
gen 15 Kore "$AGE Ahora le explicás al dueño cómo trabajás, con orgullo profesional y claridad."
gen 16 Charon "$DUE Abriendo un ojo, desconcertado, medio perdido."
gen 17 Fenrir "$GUA Relajado y canchero, dándole permiso; 'Bandera verde' festejando con un grito de alegría."
gen 18 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a compartir el video."
