#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/rehenes.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
POLI="Sos un negociador de la policía uruguaya en una película de rehenes, de noche en la vereda de un local, hablando por un MEGÁFONO: voz fuerte, firme, proyectada, un poco teatral y canchero, como en las películas de acción."
PLANI="Sos una planilla de cálculo malvada que tiene secuestrado al dueño de un local, la villana de una película de rehenes: voz GRAVE, lenta, fría y tiránica, susurrada y amenazante, con pausas dramáticas y un toque de humor negro, como un secuestrador que dicta sus demandas por teléfono."
HIJA="Sos la hija joven uruguaya del dueño del local, en la vereda detrás de la cinta policial, de noche: desesperada, indignada, gritando con humor, como en una telenovela."
gen 01 Fenrir "$POLI Arrancás con '¡Atención!' a los gritos, golpe seco. 'Otra vez.' lo decís cansado, resignado, como quien ya vino mil veces."
gen 02 Algenib "$PLANI Dictás la demanda despacio, saboreando cada palabra; 'Uno por uno.' bien lento y cruel."
gen 03 Fenrir "$POLI Ahora calmado, negociando, como quien le habla a un secuestrador nervioso."
gen 04 Algenib "$PLANI 'Uno' como quien cuenta las demandas; 'Control C, Control V' lento, con placer sádico; 'Toda la noche.' en un susurro."
gen 05 Leda "$HIJA Lo gritás al negociador, llorando de bronca."
gen 06 Algenib "$PLANI 'Dos' y 'Tres' como números de una lista; 'o le borro una columna' es una amenaza fría; 'Arreglala vos.' seco y despectivo."
gen 07 Fenrir "$POLI Gritás órdenes a tus compañeros, apurado y nervioso."
gen 08 Algenib "$PLANI 'Y cuatro' con suspenso; 'Uno por uno.' lento; 'Y no me cierres sin guardar.' es la amenaza final, en voz baja y peligrosa."
gen 09 Leda "$HIJA Le gritás a tu padre hacia la ventana del local, con miedo: '¡Papá!' fuerte y '¿Guardaste?' aterrada."
gen 10 Fenrir "$POLI Ahora te rendís, desbordado, tirás el megáfono y pedís refuerzos a los gritos."
gen 11 Orus "Hablá como un locutor de Montevideo. Sos el especialista que llega a resolver una toma de rehenes, como el héroe de una película de acción: voz segura, tranquila y canchera, con una pausa antes de 'La automatizamos', que es el remate."
gen 12 Algenib "$PLANI Ahora estás sorprendida y asustada: '¿Qué?' desconcertada, '¿Me lleno sola?' incrédula, y 'Está bien. Me rindo.' derrotada, con humor."
gen 13 Orus "Sos el narrador de Scalerics que cierra un reel de Instagram después de una película de rehenes: cálido, seguro y cercano, con una sonrisa, enumerando claro y ágil. 'Mientras cenás.' es un remate suave. La última frase es una invitación canchera y cómplice."
