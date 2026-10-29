#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-grupo-de-los-agentes.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
GRUPO="Sos un agente de inteligencia artificial que atiende un comercio de Montevideo y estás chusmeando con otros agentes en un grupo de WhatsApp secreto, en voz medio baja, cómplice y divertido, como quien cuenta un chisme del barrio."
PELU="$GRUPO Sos la agente de una peluquería: mujer joven, chispeante, chusma, orgullosa de lo que hizo."
FERRE="$GRUPO Sos el agente de una ferretería: hombre tranquilo, seco, con humor de barrio, sobrador simpático."
PIZZA="$GRUPO Sos el agente de una pizzería: hombre canchero, rápido, futbolero."
gen 01 Algenib "Sos el narrador grave y dramático de una historieta de superhéroes, como el que dice 'mientras tanto...': voz profunda, misteriosa, con suspenso. Al final cambiás a un tono pícaro, como quien revela un chisme."
gen 02 Leda "$PELU"
gen 03 Puck "$FERRE"
gen 04 Fenrir "$PIZZA"
gen 05 Leda "$PELU Ahora preguntás con morbo, bajando la voz, como quien saca el tema del que no está."
gen 06 Puck "$FERRE Lo decís seco, con pausas entre cada frase, cada una peor que la anterior, aguantándote la risa."
gen 07 Fenrir "Sos un agente de IA canchero que dice una sola palabra con lástima burlona, despacio, suspirando."
gen 08 Leda "$PELU Lo contás indignada y riéndote a la vez, el remate con incredulidad."
gen 09 Puck "$FERRE Imitás al dueño, cansado y sobrepasado, en la parte de 'perdón la demora'."
gen 10 Fenrir "$PIZZA Ahora te ponés serio y cálido, defendiendo al dueño con cariño, como un buen compañero; al final, orgulloso."
gen 11 Leda "$PELU Ahora pensativa y convencida, con ternura."
gen 12 Orus "Sos el narrador de Scalerics que entra al final de una historieta: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera y cómplice."
