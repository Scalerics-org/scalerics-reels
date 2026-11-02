#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-adiestrador.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
ADI="Sos Tito, el adiestrador estrella de un programa de televisión de adiestramiento canino, uruguayo de unos 40 años: canchero, seguro, sobrador, voz de mando de campo de entrenamiento, con humor; trata al dueño del local como si fuera el perro que hay que educar, y por eso es gracioso."
DUE="Sos el dueño de un local de ropa en Uruguay, de unos 55 años, agotado después de un día largo: ronco, cansado, gruñón, medio dormido, de manera muy cómica."
CLI="Sos Sofía, una clienta uruguaya de unos 28 años que escribe por el celular: simpática, rápida, con actitud."
gen 01 Fenrir "$ADI Arrancás a cámara con un golpe seco y canchero: 'el problema no es el perro' con aplomo, pausa, 'es el dueño' como una sentencia, y lo último con picardía."
gen 02 Fenrir "$ADI Presentando el programa con entusiasmo de televisión; 'primer ejercicio' como voz de mando."
gen 03 Leda "$CLI Escribiendo un mensaje, amable y casual."
gen 04 Fenrir "$ADI Órdenes cortas y fuertes, como a un perro, a los gritos, una por una."
gen 05 Charon "$DUE Gruñendo, sin levantar la vista, fastidiado."
gen 06 Fenrir "$ADI Más fuerte todavía, órdenes de adiestrador, impaciente pero gracioso."
gen 07 Leda "$CLI Primero dudando, después indignada y ofendida."
gen 08 Fenrir "$ADI Decepcionado, como un juez que anota el puntaje; 'probemos de noche' con desafío."
gen 09 Leda "$CLI Mensaje de noche, amable, esperanzada."
gen 10 Charon "$DUE Medio dormido, gruñendo bajo como un perro, muy seco."
gen 11 Fenrir "$ADI En voz baja y grave a cámara, como un experto preocupado; dramático y cómico."
gen 12 Fenrir "Sos Tito, un adiestrador uruguayo de unos 40 años que de golpe se pone serio y cálido, despacio, defendiendo al dueño con cariño y empatía; 'está solo' suave, como una revelación; el final firme."
gen 13 Fenrir "$ADI Con una sonrisa cómplice, anunciando la solución; 'un compañero' con entusiasmo."
gen 14 Orus "Sos el narrador de Scalerics que entra cuando se calma la escena: claro, cálido y seguro, ritmo ágil; 'agente de IA' bien claro, como la solución."
gen 15 Leda "$CLI Sorprendida y feliz, encantada."
gen 16 Fenrir "$ADI Felicitando como a un perro que hizo bien el truco, con voz aguda y cariñosa de premiar a la mascota."
gen 17 Charon "$DUE Desconfiado, mirando la galletita, seco y cómico."
gen 18 Orus "Sos el narrador de Scalerics: cierre canchero, con una sonrisa, una invitación a compartir el video."
echo listo
