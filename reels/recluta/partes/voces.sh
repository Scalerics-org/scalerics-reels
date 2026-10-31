#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/recluta.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
SAR="Sos un SARGENTO INSTRUCTOR de un campamento de reclutas, como en las películas de guerra: voz grave, ronca, potente, GRITANDO órdenes con la cara pegada a la del recluta, autoritario y exagerado, cómico."
REC="Sos un recluta asustado, dueño de una tiendita de ropa de barrio en Montevideo, de unos 45 años: responde firme como soldado pero con la voz temblorosa y una inocencia cómica."
gen 01 Algenib "$SAR Arrancás GRITANDO de golpe, furioso, escandalizado."
gen 02 Charon "$REC Contesta gritando en posición de firme, rápido."
gen 03 Algenib "$SAR Gritando más fuerte todavía, indignado, y la pregunta como una acusación."
gen 04 Charon "$REC Inocente, convencido de que está bien, orgulloso de su cartel."
gen 05 Algenib "$SAR Incrédulo, gritando, despacio y con rabia contenida."
gen 06 Charon "$REC Tranquilo e ingenuo, como si fuera lo más normal del mundo."
gen 07 Algenib "$SAR Seco, cortante, gritado."
gen 08 Charon "$REC Orgulloso, sacando pecho; el final, 'como Rambo: solo', con épica ridícula."
gen 09 Algenib "$SAR Desesperado, con desprecio teatral, y al final una orden seca."
gen 10 Algenib "$SAR Explicando un mapa táctico, señalando con un puntero, más bajo y con suspenso; el final, 'vos, con el cuaderno', con desprecio lento."
gen 11 Charon "$REC Con miedo, la voz chiquita, a punto de llorar."
gen 12 Algenib "$SAR Ahora se ABLANDA: voz baja, grave, paternal y emocionado, como un sargento que se conmueve. Despacio."
gen 13 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de una película de guerra: cálido, seguro, cercano y con una sonrisa; el cierre, 'llegás al Black Friday armado', con energía."
gen 14 Algenib "$SAR Vuelve a GRITAR, con toda la fuerza, dando la última orden."
gen 15 Charon "$REC Grita firme y feliz, ahora con orgullo y sin miedo."
