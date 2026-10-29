#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/storytime.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
INF="Sos una influencer gastronómica de Montevideo de unos 25 años, haciendo una transmisión en vivo desde el celular para sus seguidores: exagerada, dramática y graciosa, con mucha energía, hablando rápido como quien cuenta un chisme a sus amigas, con risitas y suspiros teatrales."
gen 01 Leda "$INF Arrancás con 'Storytime' como título, bien de influencer, y contás el drama mirando a cámara; 'la culpa fue de su página web' es un remate indignado."
gen 02 Leda "$INF Saludás al vivo, contás que te recomendaron un lugar; 'Carga. Carga. Sigue cargando.' lo decís cada vez más aburrida y lenta; 'Me cebé un mate' resignada y graciosa."
gen 03 Leda "$INF Te burlás de lo chiquitita que se ve la página; en 'Dice: abierto. Voy.' te entusiasmás, y 'Cortina baja' lo decís seca, decepcionada, con una pausa antes."
gen 04 Leda "$INF Enumerás los desastres con indignación creciente, cada pregunta como un remate de chiste; 'amiga, volvete' lo leés del chat imitando a una seguidora."
gen 05 Gacrux "Sos una vecina veterana de un barrio de Montevideo, de unos 70 años, asomada a la puerta, cariñosa y chusma, que le da un dato a una chica perdida, con complicidad."
gen 06 Leda "$INF Contás el clímax: 'Golpeo. Abren.' con suspenso; 'Y chicos, la milanesa' casi susurrando de emoción; 'Una cosa de locos' extasiada; 'Casi lloro en vivo' emocionada y riéndote."
gen 07 Leda "$INF Le hablás al dueño del bodegón, con cariño pero picando, como quien le avisa algo obvio."
gen 08 Charon "Sos el dueño de un bodegón de barrio de Montevideo, un hombre de unos 60 años, con delantal, tranquilo y orgulloso, que no entiende para qué querría una página web; lo decís con desdén bonachón, casi riéndote."
gen 09 Leda "$INF Ahora te ponés seria a cámara, como dando la moraleja del storytime: 'El barrio sí. Internet no.' corto y filoso; la última frase con lástima."
gen 10 Orus "Sos el narrador de Scalerics que entra al final de una transmisión en vivo: cálido, seguro y cercano, con una sonrisa; la primera frase es un remate canchero; el cierre es una invitación a comentar."
