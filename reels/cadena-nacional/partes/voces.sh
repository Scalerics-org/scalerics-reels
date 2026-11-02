#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/cadena-nacional.
# Voces: locutora oficial Kore (01), Presidente del Local Algenib (02 03 04 05 10 11 14),
# periodista en la calle Fenrir (06), clienta Leda (07 08 13), narrador Orus (12 15).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
LOC="Sos la locutora oficial de una cadena nacional de televisión uruguaya: voz formal, impostada, solemne y seria, como un anuncio oficial que interrumpe la programación; y por eso es gracioso."
PRE="Sos el Presidente del Local, el dueño de un comercio de barrio uruguayo de unos 60 años, que da un discurso por cadena nacional desde un atril: voz grave, lenta, solemne y pomposa, con pausas de estadista, como si dictara leyes importantísimas; lo cómico es que lo que decreta es ridículo."
PER="Sos un periodista uruguayo de unos 35 años transmitiendo en vivo desde la calle, en medio de una protesta con cacerolas: rápido, agitado, gritando un poco por encima del ruido."
CLI="Sos una clienta uruguaya de unos 30 años en una protesta en la calle, con una cacerola en la mano: indignada, a los gritos, pero divertida, con mucha actitud."
gen 01 Kore "$LOC Firme y seca; 'y no te va a gustar' con una pausa antes, grave."
gen 02 Algenib "$PRE Arrancando el discurso, muy solemne; 'decreto' con peso."
gen 03 Algenib "$PRE 'Artículo uno' como leyendo un decreto; 'cuando yo pueda' muy tranquilo, como si fuera lógico."
gen 04 Algenib "$PRE 'Artículo dos' solemne; pausa en los puntos suspensivos y 'que se cayó' más bajito, como una aclaración incómoda."
gen 05 Algenib "$PRE 'Artículo tres' solemne; 'que pase el lunes' con total seguridad."
gen 06 Fenrir "$PER Abriendo la transmisión desde la puerta del local."
gen 07 Leda "$CLI Gritando a la cámara, rápido; 'el cumple era el domingo' furiosa."
gen 08 Leda "$CLI Cantando a coro como en una manifestación, con ritmo de cantito de protesta."
gen 10 Algenib "Sos el dueño de un comercio de barrio uruguayo de unos 60 años que hasta recién se hacía el presidente solemne y ahora se quiebra: sincero, cansado, humano, más bajito; 'gobierno solo' con un suspiro; 'y no doy abasto' confesándolo."
gen 11 Algenib "$PRE Recupera la solemnidad, orgulloso y emocionado, como anunciando un nombramiento histórico; 'ministro de atención' con pompa."
gen 12 Orus "Sos el narrador de Scalerics que entra cuando se calma el lío: claro, cálido y seguro, ritmo ágil; 'agente de IA' bien claro, como la solución."
gen 13 Leda "$CLI Ahora sorprendida y feliz, mirando el celular; 'viva el ministro' festejando."
gen 14 Algenib "$PRE Triunfal y solemne, cerrando la cadena; 'queda derogado' como un anuncio histórico."
gen 15 Orus "Sos el narrador de Scalerics: cierre canchero, con una sonrisa, una invitación a comentar."
echo listo
