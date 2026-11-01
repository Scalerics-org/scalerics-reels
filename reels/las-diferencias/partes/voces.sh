#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/las-diferencias.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
PRO="Sos LA PROFE de los pasatiempos, la conductora de un juego de 'encontrá las diferencias' de una revista de crucigramas, en un sketch de humor: voz de maestra de escuela simpática pero implacable, clara, didáctica, un poquito sobradora, con suspenso de concurso al anunciar cada diferencia. RITMO ÁGIL, pausas muy cortas."
DUE="Sos el DUEÑO de dos locales de ropa en Montevideo, de unos 55 años, jugando al pasatiempo con una birome: canchero y confiado al principio, después desconcertado y quejoso, muy expresivo y gracioso. Ritmo ágil."
CLI="Sos LUCÍA, una CLIENTA fiel de Montevideo, de unos 30 años, indignada y teatral, irónica, muy expresiva y graciosa. Ritmo ágil."
gen 01 Kore "$PRO Arrancás desafiante, como un reto directo al que mira: 'Encontrá las cinco diferencias...'; 'Tenés cinco segundos' rápido, como largando el cronómetro."
gen 02 Charon "$DUE Sobrado, riéndose, seguro de que gana."
gen 03 Kore "$PRO 'Diferencia número uno' con suspenso de concurso; 'doce' y 'tres' bien marcados."
gen 04 Charon "$DUE Desconcertado, mirando el papel, indignado."
gen 05 Kore "$PRO Con suspenso, y 'dos precios' remarcado con picardía."
gen 06 Leda "$CLI Indignada en el mostrador, reclamando."
gen 07 Kore "$PRO Enumerando con ritmo, cada vez más implacable; 'dos veces' remarcado."
gen 08 Charon "$DUE Cayendo en la cuenta, entre indignado y gracioso, golpeándose la frente."
gen 09 Kore "$PRO Con suspenso de la última diferencia; 'clienta VIP' con tono elegante."
gen 10 Leda "$CLI Ofendidísima, teatral."
gen 11 Charon "$DUE Rendido, tira la birome; 'perdí' resignado, la pregunta sincera."
gen 12 Kore "$PRO Sale del personaje: cómplice, más bajito, como quien revela el truco; 'y la caja, en tu cabeza' como remate de chiste."
gen 13 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con energía y una sonrisa."
gen 14 Kore "$PRO Vuelve el juego, con suspenso de concurso."
gen 15 Charon "$DUE 'A ver...' mirando con lupa; 'No hay ninguna' sorprendido; '¡Gané!' festejando como un gol."
gen 16 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, desafiando al que mira."
