# dist-cartera · voces

Voces de siempre: **Rubén = Algenib**, **Nico = Fenrir**, **Marta = Aoede**, **Sofi = Achernar**; **Leo = Sadachbia**
(personaje nuevo); narrador del cartel = Rasalgethi, audio REUSADO de `reels/lo-mismo-que-la-otra-vez/assets/voice/narrador.wav`
("Un sistema de clientes más tarde.", el STT lo oye igual; atempo 1,2 → 2,40 s en r1), y el cartel dice lo mismo.

Tomas: `partes/lineas.tsv` (a, b, c) y `partes/lineas-r1.tsv` (d, e, f: Marta y Nico pidiendo "Leo" claro, porque el STT
oía "Neo", "lasaña", "lío"). `bash partes/medir-tomas.sh` recorta y mide; `bash partes/procesar.sh` arma `assets/voice/`.

| clave | archivo · texto | toma | arreglo |
|---|---|---|---|
| l1 | 01-leo "Rubén, te quiero un montón. Pero me voy." | b | hueco 0,26 → 0,2; atempo 1,04 (se reusa en Q1) |
| r1 | 02-ruben "¿Y los clientes?" | c | (se reusa en Q1) |
| l2 | 03-leo "Tranqui. Te dejé el Excel." | a | hueco 0,38 → 0,18; atempo 1,05 |
| r2 | 04-ruben "Treinta y ocho clientes. Me dejaste tres." | b | hueco 0,49 → 0,45 (r1: pausa ≥ 0,4 antes de "Me dejaste tres."); atempo 1,06 |
| r3 | 05-ruben "Marta, habla Rubén." | c | hueco 0,33 → 0,16; atempo 1,04 |
| m1 | 06-marta "¿Qué Rubén? Yo le compro a Leo." | 06b-b (r1) | toma generada con el texto forzado "Yo le cómpro a Leo" para que salga en presente (el STT escribe "compró" en casi todas las tomas, también en las forzadas: no distingue la tilde); hueco 0,42 → 0,2; atempo 1,04 |
| n1 | 07-nico "Jefe, ¿y la zona de Leo?" | d | hueco 0,37 → 0,2; atempo 1,03 (se reusa en Q3) |
| r4 | 08-ruben "Tuya. Son dos." | c | hueco 0,44 → 0,3 |
| l3 | 10-leo "Donde estuvieron siempre." | c | atempo 1,03 |
| r5 | 11-ruben "Tuya. Son treinta y ocho." | b | hueco 0,35 → 0,22; atempo 1,05 |
| n2 | 12-nico "Marta, ¿lo de los martes? Y las dos cajas que te guardó Leo." (r1) | h | hueco 0,4 → 0,2; atempo 1,1 |
| m2 | 13-marta "¡Nico! Leo me habló de vos. Mandame." (r1) | g | atempo 1,12 |
| r6 | 14-ruben "Treinta y ocho. Con nombre y apellido." | b | hueco 0,2 → 0,16; atempo 1,04 |
| s1 | 15-sofi "Comentá CARTERA y te mando cómo funciona para tu distribuidora." | a | atempo 1,08 ("CARTERA" arranca a 0,47 s: el STT ubica mal "Comentá") |

Ronda 1: tomas g/h/i (`partes/lineas-r2.tsv`) de Marta y Nico con las líneas nuevas, y `partes/06b-marta` (`lineas-r3.tsv`) generada con "cómpro".
