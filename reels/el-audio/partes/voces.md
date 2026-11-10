# el-audio · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una con `node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`
desde `reels/el-audio`. Recortar silencios (silenceremove) salvo donde se indica.

Graciela: **Gacrux** (la voz que tuvo Graciela cuando habló, en `reels/el-reencuentro`: señora madura y cálida). En la
línea "Para mandar" nunca había hablado (solo burbujas): acá habla porque el chiste ES su audio. Si Gacrux suena
demasiado seria, probar Sulafat o Aoede con el mismo tono; elegir la más charlatana y querible.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| graciela-1.txt · "¡Hola, Rubén! ¿Cómo andás? Mirá, te cuento, porque ayer vino mi sobrino, el de Las Piedras…" | Graciela (audio de WhatsApp) | Gacrux | Señora uruguaya de barrio, cariñosa y charlatana, grabando un audio caminando por su casa. Arranca efusiva, sin respirar, encadena todo; rápida, con risita en "sobrino". Nada de burla: es simpática. | Filtro de audio de celular (highpass 300 Hz, lowpass 3400 Hz, un poco de compresión). Se oye entero, 0,45-3,6 s. |
| graciela-2.txt · "…y el perro, divino, pero se comió una media entera…" | Graciela (audio) | Gacrux | Igual de cariñosa, contando una anécdota que le da gracia; "divino" estirado, "entera" con indignación tierna. | Mismo filtro. Se oye un pedazo y se corta con el corte de plano (fade de 60 ms), como saltando en el audio. |
| graciela-3.txt · "…¿y viste el frío que hace? Yo le dije a la del tres…" | Graciela (audio) | Gacrux | Conversadora, quejándose del tiempo con complicidad, como si el otro estuviera ahí. | Mismo filtro, se corta en "tres". |
| graciela-4.txt · "…y ahí me dice la Nelly, no, pará, ¿la Nelly o la Beba? La Beba…" | Graciela (audio) | Gacrux | Se enreda sola y se corrige, divertida; ritmo rápido. | Mismo filtro **y a 2x** (Rubén toca "2x"): `atempo=2.0` (sin subir el tono: el 2x de las apps acelera sin ardilla; si se entiende mejor con un poco de tono, `asetrate` +3 semitonos como máximo). Dura ~1,5 s a 2x. |
| graciela-5.txt · "…bueno, no te molesto más. ¿A cuánto está la polenta? Beso." | Graciela (audio) | Gacrux | Cerrando apurada y dulce; "¿A cuánto está la polenta?" dicho al pasar, como si fuera lo de menos (es lo único que preguntaba); "Beso." cortito y cariñoso. | Mismo filtro. Entero. |
| ruben-1.txt · "Noventa." | Rubén | Algenib | Almacenero uruguayo grave y cansado. Una sola palabra, seca, sin enojo y sin apuro, con un suspiro corto por la nariz antes; tono de quien da el dato y nada más. Nada de ironía marcada: la cara de nada hace el chiste. ~0,8 s. | Sin filtro (lo graba en el local, se oye de cerca). Dejar el suspiro si sale natural. |
| narrador.txt · "Un agente de IA más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde". "IA" se dice "i a". | Reusar tal cual `reels/abren-hoy-completo/assets/audio/cartel.wav` (misma frase), como hizo me-lo-guardas. |
| graciela-6.txt · "¡Rubén! ¿Te conté lo de mi sobrino?" | Graciela (en persona, en el almacén) | Gacrux | Entra feliz al almacén, con ganas de charlar; tono de "tengo algo buenísimo para contarte". | **Sin filtro** (ahora está en persona): ese contraste se tiene que notar. |
| ruben-2.txt · "Contame." | Rubén | Algenib | El mismo Rubén grave, ahora descansado y cálido: media sonrisa, con el mate en la mano; lo dice con ganas de escuchar, sin ironía. ~0,7 s. | Sin filtro. Música baja 9 dB mientras habla. |

Textos que NO van a la voz (están en SPEC.md): las burbujas de chat del agente, los "temas" del audio, los contadores
de duración (4:12, 2x, 0:01, 6:47), "Graciela está grabando un audio…", la pill de hora y la línea chica final.
