#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-match.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
COA="Sos una coach de citas uruguaya de 32 años, en una comedia: filosa, rapidísima, picante y muy graciosa, sobradora y con cariño, como una amiga que te agarra el celular y te reta en la cara."
DUE="Sos el dueño de una óptica de barrio en Montevideo, de 45 años, en una comedia: te defendés a la defensiva, avergonzado y medio ofendido."
GAB="Sos una clienta uruguaya de 30 años que lee en voz alta un mensaje de WhatsApp, en una comedia."
gen 01 Zephyr "$COA Arrancás de golpe, mirando el celular con indignación divertida; 'Ni clientes' lo decís seco, como remate, después de una pausa mínima."
gen 02 Puck "$DUE Saltás ofendido, rápido."
gen 03 Zephyr "$COA Lo frenás en seco; después leés los chats con burla, y '¿Mañana de qué año?' es el remate, sobrador."
gen 04 Kore "$GAB Preguntás con impaciencia y un poco de tristeza, como quien escribe al vacío."
gen 05 Zephyr "$COA Leés como si fueran perfiles de una app de citas; 'Ese te quería en serio' con pena teatral; lo último incrédula y burlona."
gen 06 Puck "$DUE Te defendés cada vez más bajito y menos seguro, enumerando."
gen 07 Zephyr "$COA Le hablás con ternura sobradora, como diagnóstico; el remate claro y gracioso."
gen 08 Orus "Sos el narrador de Scalerics que entra al final de un reel de comedia: cálido, seguro, cercano y con ritmo, como quien trae la solución. Rápido."
gen 09 Zephyr "$COA Orgullosa y contenta, como quien festeja un logro."
gen 10 Kore "$GAB Contenta y aliviada, con una sonrisa."
gen 11 Zephyr "$COA '¡Match!' lo festejás a los gritos; lo demás es una invitación pícara a cámara, con una sonrisa."
