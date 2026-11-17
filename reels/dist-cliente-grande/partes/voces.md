# dist-cliente-grande · voces (Gemini TTS, 3 tomas por línea en partes/tomas/, tonos en partes/lineas.tsv)

Rubén = Algenib · Nico = Fenrir · Héctor = Sadaltager · el contador = Algieba (nueva, solo voz por el altavoz) ·
narrador del cartel = Rasalgethi. Generar con `TOMAS="a b c" bash partes/reintentar.sh` (la cuota de Gemini TTS es por
minuto y se comparte con el otro reel: reintenta solo), medir con `bash partes/medir-tomas.sh` (partes/rec/medidas.tsv,
"oyó:") y armar las finales con `bash partes/procesar.sh`.

Dos callbacks reusan el MISMO audio: c1 ("Rubén, ¿y Héctor?") y r1 ("¿Héctor? Compra todos los martes.") suenan
idénticos en P1 y en Q4. El contador (c1, c2, c3) pasa por el filtro de altavoz (pasaaltos 320, pasabajos 3400,
compresión leve) en procesar.sh.

Elegidas: ver procesar.sh (01-contador-b, 02-ruben-b, 03-contador-b, 04-nico-a, 05-hector-b, 06-ruben-c, 07-hector-a,
08-narrador-b, 09-nico-a, 10-hector-a, 11-contador-b, 12-ruben-c).
