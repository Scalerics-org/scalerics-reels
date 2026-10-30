#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-guru.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.err && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
GUR="Sos un gurú motivacional de seminario, el coach gritón de las redes que vende humo: energía desbordada, voz de estadio, gritando con micrófono de vincha frente a mil personas, sonrisa de dientes blancos, exagerado y teatral; es gracioso de lo exagerado."
DUE="Sos un dueño de comercio de Montevideo de unos 50 años, sentado en el público de un seminario motivacional: agotado, con ojeras, habla bajito y honesto, con un cansancio que da ternura y risa a la vez."
gen 01 Fenrir "$GUR Arrancás el show con un grito seco que acusa, señalando al público: lenta y fuerte la primera parte, y 'es porque dormís' como un martillazo."
gen 02 Fenrir "$GUR Eufórico, presentando el seminario como un show de estadio; 'Regla uno' y 'Regla dos' bien marcados; el último '¡Vos!' gritado señalando a uno."
gen 03 Fenrir "$GUR Predicando con fervor, cada vez más fuerte; '¡El éxito es sufrimiento!' como un mantra; 'sin dormir no hay gloria' cantado como un hit."
gen 04 Charon "$DUE Levantás la mano tímido, con voz de cansado, preguntando de verdad, casi bostezando."
gen 05 Fenrir "$GUR Respondés al toque con una carcajada canchera y entusiasta, sin pensar."
gen 06 Charon "$DUE Explicás con calma y agotamiento, como quien cuenta su día sin quejarse; la lista de tareas cada vez más cansada; 'Solo.' al final, bajito, después de una pausa."
gen 07 Fenrir "$GUR Celebrás eufórico, sin haber escuchado nada, como si fuera un logro."
gen 08 Charon "$DUE Preguntás con inocencia, curioso, sin mala intención; la segunda pregunta un poco más filosa."
gen 09 Fenrir "$GUR Te agarraron: primero dudás, incómodo, buscando palabras ('Eh... No.'); confesás rápido y bajito 'ese lo atiende mi agente de IA', y enseguida recuperás el grito de show para '¡Pero el sufrimiento es de ustedes!'."
gen 10 Orus "Sos el narrador de Scalerics que entra cuando se cae el show: tranquilo, cálido y con una sonrisa cómplice; 'estás solo' dicho con empatía."
gen 11 Orus "Sos el narrador de Scalerics: claro, cercano y seguro, explicando simple; 'Vos, dormí. Sin culpa.' con una sonrisa tranquila."
gen 12 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a compartir el video."
echo FIN
