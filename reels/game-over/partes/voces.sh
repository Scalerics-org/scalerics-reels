#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/game-over.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>partes/$1.log && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
ANU="Sos el anunciador de un videojuego arcade de los años 80: voz grave, profunda y ÉPICA, exagerada y teatral, como el locutor de una máquina de fichines que anuncia cada nivel a los gritos con eco de estadio. Hablás RÁPIDO y con mucha energía, de corrido, casi sin pausas entre frases, sin estirar las palabras: es un anuncio veloz de fichín."
JUG="Sos una mujer joven uruguaya de unos 27 años, jugando a un videojuego que es comprarle algo a un comercio: canchera, irónica, impaciente y graciosa, con la paciencia al límite."
DUE="Sos el dueño de un comercio de barrio uruguayo, un hombre de unos 55 años, que contesta un mensaje con desgano, seco, cortante, sin levantar la vista, como si molestaran."
gen 01 Leda "$JUG Arrancás mirando a cámara, provocadora y segura, con una sonrisita sobradora: es una acusación graciosa."
gen 02 Algenib "$ANU Presentás a la jugadora y la misión como el comienzo de la partida; '¡Nivel uno!' lo gritás."
gen 03 Leda "$JUG Ahora escribís un mensaje amable, con buena onda, preguntando un precio."
gen 04 Charon "$DUE Una sola frase, seca, aburrida."
gen 05 Algenib "$ANU '¡Pierde una vida!' lo decís como una desgracia, y '¡Nivel dos!' a los gritos."
gen 06 Leda "$JUG Reclamás con fastidio, ya perdiendo la paciencia. 'Hace dos días' lo decís seca, con los ojos en blanco."
gen 07 Algenib "$ANU 'Visto. Visto.' lo decís lento y burlón, cada vez más grave; después gritás '¡Pierde otra vida!' y '¡Nivel tres: pagar!' bien épico."
gen 08 Leda "$JUG Preguntás algo obvio, con esperanza, casi suplicando."
gen 09 Charon "$DUE Lo decís como quien repite algo por milésima vez, seco y cortante."
gen 10 Algenib "$ANU Con alarma y suspenso de película: el momento más peligroso del juego, anunciás al jefe final con terror épico."
gen 11 Charon "Sos el JEFE FINAL de un videojuego: un monstruo gigante con voz cavernosa, gravísima y lenta, amenazante. Decís la frase despacio, sílaba por sílaba, como una sentencia de muerte, y te reís por dentro."
gen 12 Algenib "$ANU 'Game over' lo decís lento y fúnebre, en inglés, bien grave; '¿insertar ficha?' como pregunta tentadora."
gen 13 Leda "$JUG Te ofendés, cortante, y te vas: 'Ni loca' rápido y seco."
gen 14 Algenib "$ANU Ahora todo es alegría y velocidad: cada palabra es una moneda que se agarra, rápido y festivo; '¡Nivel completado!' triunfal."
gen 15 Leda "$JUG Lo decís con un poquito de pena y nostalgia, mirando atrás, como una confesión que le duele al dueño."
gen 16 Orus "Sos el narrador de Scalerics que entra al final de un videojuego: cálido, seguro, cercano, con una sonrisa, como un amigo que le da la solución al dueño. Ritmo ágil y suelto, sin pausas largas entre frases. El cierre es una invitación canchera a comentar."
