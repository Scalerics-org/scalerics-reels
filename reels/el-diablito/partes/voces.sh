#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-diablito.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
DIA="Sos un diablito de dibujo animado viejo, chiquito y sentado en el hombro de un comerciante: canchero, pícaro, rápido y burlón, como un pibe de barrio que siempre se sale con la suya; es comedia."
ANG="Sos un angelito de dibujo animado viejo, sentado en el otro hombro del comerciante: voz dulce, suave y buenita, pero muerta de cansancio; es comedia."
DUE="Sos un comerciante uruguayo de 50 años, de noche, agotado después de cerrar el local: voz grave, cansada, arrastrando un poco las palabras, con un suspiro."
AGE="Sos un agente de inteligencia artificial que trabaja para un comercio: voz clara, amable, muy eficiente y segura, un poco canchera, como una empleada que ya resolvió todo mientras los demás discutían; es comedia."
gen 01 Fenrir "$DIA Le hablás a la cámara, cerca, con una sonrisa malvada y orgullosa, confesando la travesura."
gen 02 Charon "$DUE Mirás el celular, dudando, en voz baja."
gen 03 Leda "$ANG Le susurrás al oído, tierna y alentadora."
gen 04 Fenrir "$DIA Lo cortás de golpe, escandalizado y canchero, rápido, como quien da un consejo de experto."
gen 05 Charon "$DUE Convencido enseguida, aliviado, dejando el celular."
gen 06 Fenrir "$DIA Satisfecho y burlón, cada frase más sobradora; 'Y la otra' con una risita."
gen 07 Leda "$ANG Insistís, preocupada y dulce; el último 'Escribile' ya con sueño, apagándose."
gen 08 Fenrir "$DIA Despectivo y rápido, como quien espanta una mosca."
gen 09 Leda "$ANG Empezás a decir 'escribile' y te interrumpe un bostezo largo y exagerado; después, cansada y harta, como una empleada que renuncia, y 'Renuncio' seco y firme."
gen 10 Fenrir "$DIA Festejás a los gritos, eufórico, y de golpe te frenás, desconfiado, al ver a alguien nuevo."
gen 11 Kore "$AGE Arrancás tranquila y amable, y contás todo lo que hiciste rápido, con orgullo; 'Viene mañana' con una sonrisa."
gen 12 Fenrir "$DIA Ahora desinflado, chiquito, con voz de perdedor."
gen 13 Kore "$AGE Seca, canchera, con una sonrisa: el remate de un chiste."
gen 14 Orus "Sos el narrador de Scalerics que entra al final de un reel de comedia de dibujos animados: cálido, seguro, cercano y con ritmo."
gen 15 Orus "Sos el narrador de Scalerics al final de un reel de comedia: invitación canchera y pícara, con una sonrisa."
