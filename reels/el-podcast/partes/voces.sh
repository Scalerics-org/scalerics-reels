#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-podcast.
# Voces: Sofi Aoede, Nacho Puck, el dueño ofendido (audio de un oyente) Charon, narrador Orus.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.err && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
SOF="Sos Sofi, una chica de Montevideo de 24 años que conduce un podcast con su amigo frente al micrófono: relajada, canchera, irónica y muy graciosa, hablando rápido como quien charla con un amigo, con risitas cortas. Acento uruguayo joven bien marcado."
NAC="Sos Nacho, un pibe de Montevideo de 26 años que conduce un podcast con su amiga frente al micrófono: relajado, gracioso, pícaro, exagera para hacer reír, con voz de radio joven. Acento uruguayo joven bien marcado."
DUE="Sos el dueño de un comercio de barrio de Montevideo, de unos 60 años, que manda un audio de WhatsApp a un podcast porque está OFENDIDÍSIMO: indignado, a los gritos pero gracioso, como un tío que se calienta en un asado."
gen 01 Aoede "$SOF Arrancás el episodio con una frase polémica, segura y provocadora, mirando a cámara: 'no existe' como un remate seco."
gen 02 Puck "$NAC Presentás el podcast con energía de radio, contento, como quien abre un programa; 'Desde la Cama' como el nombre del programa."
gen 03 Aoede "$SOF Contás lo que te pasó; '¿Cuánto salen?' como pregunta inocente; 'Precio por privado.' lo decís imitando a un vendedor seco y misterioso, burlona."
gen 04 Puck "$NAC Indignado y exagerado, haciendo reír: 'un secreto de Estado' como un chiste."
gen 05 Aoede "$SOF Burlona, enumerando: 'Tres fotos en una historia' con desprecio gracioso; 'que se borra al otro día' como remate."
gen 06 Puck "$NAC Hacés de locutor de película de espías, dramático y gracioso: 'el catálogo se autodestruye' con voz de misión secreta."
gen 07 Aoede "$SOF 'Y encima' indignada; 'pasá a buscarlo, de nueve a seis' imitando con voz de señor aburrido."
gen 08 Puck "$NAC Gritás indignado, exagerado, como un chiste: '¡A esa hora estoy trabajando!'"
gen 09 Aoede "$SOF Tranquila y confesional, con picardía: 'en la cama' cómplice y riéndote."
gen 10 Puck "$NAC Interrumpís, sorprendido y divertido, como quien ve que entró algo en vivo: 'Pará, entró un audio.'"
gen 11 Charon "$DUE '¡Escuchame una cosa!' bien enojado; '¡Ustedes no salen de la cama!' a los gritos; 'A mí me conoce todo el barrio' orgulloso, golpeándote el pecho."
gen 12 Aoede "$SOF Le contestás con calma, conteniendo la risa, como explicándole algo obvio a un tío: 'Desde la Cama' remarcado."
gen 13 Puck "$NAC Te ponés serio de golpe, como una confesión íntima: 'Igual tiene razón en algo.' bajito; 'Mi mejor campera es de un local de barrio' como un secreto que te da vergüenza."
gen 14 Aoede "$SOF Sorprendidísima, en una sola palabra corta: '¿Posta?'"
gen 15 Puck "$NAC Confesional y con cariño: 'La encontré de casualidad'; 'si me dejaran' con un suspiro, medio triste y gracioso."
gen 16 Aoede "$SOF Seria y clara, el mensaje del episodio, con cariño: 'Queremos el barrio en el celular' como la frase que todos van a citar."
gen 17 Orus "Sos el narrador de Scalerics que entra al final del podcast: cálido, claro y seguro, cercano, ritmo ágil; 'Vende sola' remarcado, y 'a las once de la noche también' con una sonrisa."
gen 18 Puck "$NAC Despedís el episodio, pícaro, invitando a compartir: 'pasá a buscarlo' imitando a un señor aburrido."
gen 19 Aoede "$SOF Remate del chiste, imitando con voz de señor aburrido y lenta: 'De nueve a seis.'."
echo FIN
