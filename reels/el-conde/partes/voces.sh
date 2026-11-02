#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-conde.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Ritmo ágil, sin pausas largas ni arrastrar: dramático pero rápido. Sos el Conde, un vampiro de película de terror clase B de los años cincuenta, de cuatrocientos años, que vive en un castillo en Tacuarembó. Voz grave, profunda, teatral y solemne, arrastrando las palabras como Drácula en el cine viejo, pero lo que decís es ridículo y cotidiano: es una comedia, el contraste es el chiste."
IGO="Ritmo rápido, sin pausas largas. Sos el ayudante jorobado del Conde, un sirviente servil tipo Igor de las películas de terror viejas. Voz rasposa, un poco nasal, encorvada, humilde y nerviosa, siempre diciendo 'amo' con reverencia. Comedia."
EMP="Sos la empleada de una tienda de ropa del Centro de Montevideo contestando un mensaje de Instagram desde el celular. Voz joven, aburrida, desganada y cortante, mascando chicle, sin ninguna gana de vender."
ORU="Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de la película de vampiros: cálido, seguro, cercano, con una sonrisa, como un amigo que trae la solución."
gen 01 Algenib "$CON Arrancás mirando a cámara, acusando al dueño del local en la cara, lento y amenazante, con un dejo de reproche dolido; 'a las siete' remarcado con indignación teatral."
gen 02 Algenib "$CON Presentándote con pompa y misterio, 'Tacuarembó' dicho con orgullo solemne, y 'necesito una capa nueva' con dignidad ofendida."
gen 03 Enceladus "$IGO Le contás una buena noticia con entusiasmo servil, leyendo de un pergamino."
gen 04 Algenib "$CON Encantado, frotándote las manos, con una risa malvada contenida."
gen 05 Enceladus "$IGO Corto, con miedo, casi en un susurro, sabiendo que es una mala noticia."
gen 06 Algenib "$CON Horrorizado y escandalizado, como en un melodrama, cómico."
gen 07 Enceladus "$IGO Servicial, contento de haber hecho algo útil."
gen 08 Leda "$EMP Cuatro palabras, seca y aburrida."
gen 09 Algenib "$CON Exasperado, rugiendo al cielo con desesperación teatral y cómica."
gen 10 Enceladus "$IGO Tímido, encogido, con miedo a la respuesta."
gen 11 Leda "$EMP Seca, cortante y aburrida."
gen 12 Enceladus "$IGO Alarmado, en voz baja y temblorosa, con pánico creciente."
gen 13 Algenib "$CON Dramático y derrotado, tapándote con la capa vieja, y 'mi primo Drácula se va a reír' con vergüenza ofendida, cómico."
gen 14 Enceladus "$IGO Más sabio y tranquilo, revelándole algo importante con cariño; enumerando con ritmo 'de noche, en pijama, desde el celular, desde el interior'."
gen 15 Algenib "$CON Asombrado, intrigado, en voz baja y lenta."
gen 16 Enceladus "$IGO Simple y obvio, con una media sonrisa."
gen 17 Orus "$ORU Claro y entusiasta; 'hasta el castillo' con una sonrisa cómplice."
gen 18 Enceladus "$IGO Emocionado y feliz, anunciándolo."
gen 19 Algenib "$CON Encantado, solemne y satisfecho, saboreando cada palabra; '¡excelente!' como un villano feliz."
gen 20 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano, cómplice y con una sonrisa, una invitación cálida y corta."
