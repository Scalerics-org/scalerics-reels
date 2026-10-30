#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/actividad-paranormal.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
DUE="Sos un comerciante uruguayo de 50 años que se graba con la cámara de seguridad de su local de noche, como en una película de terror de cámara encontrada, pero en clave de comedia: hablás en SUSURRO, bajito, con la respiración agitada y miedo de verdad, como si algo te escuchara."
ELS="Sos Doña Nélida, una señora uruguaya de 75 años, dulce, simpática y conversadora, clienta de toda la vida de un almacén de barrio."
HIJ="Sos la hija de 25 años de un comerciante uruguayo: canchera, práctica y un poco harta de su padre, con cariño, en una comedia."
gen 01 Fenrir "$DUE Arrancás de golpe, en susurro urgente y aterrado, mirando a cámara."
gen 02 Fenrir "$DUE Susurrás muy despacio, con pausas de suspenso; 'Y contesta' con terror, casi sin voz."
gen 03 Fenrir "$DUE Contás cada vez más nervioso y rápido; 'Yo no tomé ningún pedido' desesperado."
gen 04 Fenrir "$DUE Muy bajito y lento, con suspenso, temblando."
gen 05 Gacrux "$ELS Entrás al local contenta, cálida y alegre, saludando fuerte, sin ningún misterio."
gen 06 Fenrir "$DUE Primero en susurro, sin poder creerlo; después gritando aterrado en voz baja, al borde del llanto."
gen 07 Fenrir "$DUE Susurro tembloroso y dramático, cada vez más asustado; 'de entre los muertos' lento, con terror absoluto."
gen 08 Fenrir "$DUE Llamás por teléfono a tu hija escondido abajo del mostrador, susurrando, desesperado."
gen 09 Leda "$HIJ Le explicás rápido, entre risas y con paciencia, como quien explica algo obvio."
gen 10 Fenrir "Sos un comerciante uruguayo de 50 años, ya sin miedo, ofendido y un poco indignado, con voz normal, en una comedia."
gen 11 Leda "$HIJ Seca y canchera, con ironía, remate de chiste."
gen 12 Orus "Sos el narrador de Scalerics que entra al final de una película de terror en clave de comedia: cálido, seguro, cercano y con ritmo, como quien prende la luz y trae la solución."
gen 13 Orus "Sos el narrador de Scalerics al final de un reel de comedia de Halloween: invitación canchera y pícara, con una sonrisa."
