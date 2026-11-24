# vete-racion · voces (Gemini TTS, tres tomas por línea en partes/tomas/, recortes en partes/rec/, medidas en partes/rec/medidas.tsv)

Sin Orus. Generadas desde `reels/vete-racion` con `TOMAS="a b c" bash partes/reintentar.sh` (partes/lineas.tsv tiene voz y
tono de cada una), medidas con `bash partes/medir-tomas.sh` y armadas con `bash partes/procesar.sh`.

Voces: **Vero = Callirrhoe**, **Inés = Sulafat**, **Bruno = Schedar** (las de veterinaria-vacunas). **Narrador del cartel =
Rasalgethi**, audio reusado tal cual de `reels/tienda-tenes-stock/assets/voice/narrador.wav` ("Una tienda online más
tarde.", 2,55 s, con 0,2 s de silencio al principio). Toto no habla: ladridos, olfateo, suspiro y masticar (CC0).

| archivo final | texto | toma elegida | proceso | "oyó:" |
|---|---|---|---|---|
| v1 | Uy. Se terminó. | 01-vero-b | hueco entre "Uy." y "Se" recortado 0,29 s; atempo 1,05 | uy se terminó |
| v2 | Bueno, Toto. Al súper. | 02-vero-b | atempo 1,07 | bueno toto alsuper |
| i1 | ¡Vero! ¿Qué está comiendo Toto? | 03-ines-a | atempo 1,05; se reusa idéntico en Q4 | vero qué está comiendo toto |
| v3 | La que me recomendaste. La compro en el súper. | 04-vero-b | atempo 1,08 (la pausa entre frases queda) | la que me recomendaste la compró en el súper (el STT no marca el acento) |
| v4 | ¿Me la anotás? Así no me equivoco. | 05-vero-a | atempo 1,12 | me la anotas así no me equivoco |
| v5 | ¿Cómo sabe? | 06-vero-c | sin cambios | cómo sabe |
| b1 | ¡Ración para Toto! | 07-bruno-b | sin cambios | ración para toto |
| v6 | La que me recomendaste. Me llega sola. | 08-vero-b | atempo 1,08 | la que me recomendaste me llega sola |
| i2 | Comentá RACIÓN y te mando cómo funciona para tu veterinaria. | 09-ines-a | atempo 1,05 | comenta ración y te mando cómo funciona para tu veterinaria |

"RACIÓN" cae a 0,30 s de i2 (T.palabraR); "La compro…" a 1,65 s de v3 y "Me llega…" a 1,50 s de v6 (la segunda línea de las
burbujas se revela ahí).
