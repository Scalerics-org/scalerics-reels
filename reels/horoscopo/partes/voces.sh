#!/bin/bash
# Genera cada parlamento con su voz y su tono, con reintentos (la cuota por minuto es compartida).
# Correr desde reels/horoscopo. a = astróloga (Kore), d = dueño que llama (Charon), o = narrador (Orus).
V=../../herramientas/voz.mjs
AST="Sos una astróloga de un programa de televisión nocturno de Uruguay, teatral y exagerada, mística a más no poder: misteriosa y dramática, como si leyeras el destino en una bola de cristal, graciosa sin darte cuenta. Pero hablás RÁPIDO y de corrido, como en un programa en vivo con el tiempo justo: sin estirar las vocales, sin risas y sin pausas largas entre frases."
gen() { # base voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
gen 01a Kore "$AST Arrancás mirando a cámara con un susurro misterioso que anuncia una tragedia; la última frase es un pinchazo seco, casi burlón."
gen 02a Kore "$AST Saludás a tu audiencia con mucha dulzura y misterio, como abriendo el programa."
gen 03a Kore "$AST Leés el signo como una sentencia: el nombre del signo dicho con solemnidad, y cada frase siguiente más trágica; la última es un remate seco."
gen 04a Kore "$AST Leés el signo con solemnidad; 'pasá el lunes' lo imitás con voz de comerciante desganado, y 'nadie pasa el lunes' es una profecía fatal."
gen 05a Kore "$AST Leés el signo con solemnidad; la última frase la decís chusmeando, pícara."
gen 06a Kore "$AST Te entusiasmás porque entra una llamada al aire, como en la tele: '¡Tenemos un llamado!' y después atendés con dulzura."
gen 07d Charon "Sos el dueño de un comercio de Montevideo, un hombre de unos 50 años, desconfiado y medio avergonzado, que llama por teléfono a un programa de horóscopo de la tele. 'Yo no creo en esas cosas' lo decís serio, 'pero soy Tauro' más bajito, y '¿y qué hago?' preocupado de verdad."
gen 08a Kore "$AST Le hablás con ternura condescendiente; después la revelación, dramática y lenta: 'lo que está retrógrado es tu WhatsApp'."
gen 09d Charon "Sos el dueño de un comercio, un hombre de unos 50 años, que no entiende nada y pregunta sorprendido por teléfono, en dos palabras."
gen 10a Kore "$AST Mirás la bola de cristal y decís "veo, veo" misteriosa pero rápido, y enseguida describís la visión cada vez más entusiasmada, frase por frase, como si fueran milagros."
gen 11d Charon "Sos el dueño de un comercio, un hombre de unos 50 años, que pregunta por teléfono, preocupado y un poco celoso, en dos palabras cortas."
gen 12a Kore "$AST Le contestás con calma y una sonrisa, tranquilizándolo, como una buena noticia."
gen 13d Charon "Sos el dueño de un comercio, un hombre de unos 50 años, que se da cuenta de algo y lo dice por teléfono, entre desconfiado y convencido, con un dejo de picardía."
gen 14a Kore "$AST Remate final del programa, cortito, triunfal y misterioso, con una sonrisa."
gen 15o Orus "Sos el narrador de Scalerics que entra al final de un programa de horóscopo de la tele: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera y cómplice a compartir."
