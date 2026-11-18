# dist-quien-debe · voces (Gemini TTS, 3 tomas por línea en partes/tomas/, tonos en partes/lineas.tsv)

Rubén = Algenib · Graciela = Gacrux · Nico = Fenrir (las de siempre del elenco) · **Patricia, la ejecutiva de empresas
del banco = Pulcherrima** (personaje nuevo; Pulcherrima solo la usó Romina, secundaria de inmobiliaria-visitas del
17-11; ninguna de las del 18-11: ni Autonoe, ni Enceladus, ni Aoede, ni Zephyr) · narrador del cartel = Rasalgethi.
Generar con `TOMAS="a b c" bash partes/reintentar.sh` (copiar de `reels/dist-cliente-grande/partes/`: la cuota de
Gemini TTS es por minuto y reintenta sola), medir con `medir-tomas.sh` ("oyó:") y armar las finales con `procesar.sh`.

- **Callback con el MISMO audio:** 06-patricia ("¿Y? ¿Cobraste?") suena idéntico en P6 y en Q4. Por eso el tono es
  neutro, sin sorna: tiene que servir para las dos.
- **Patricia está en cuadro** (del otro lado del escritorio): sin filtro.
- **Graciela por teléfono** (04 y 12): en la pantalla partida está en cuadro en la rotisería, así que va **sin
  filtro de teléfono** o con uno muy suave (pasaaltos 200) solo si se oye pegada a Rubén. 10 ("¿Por favor? Esto no lo
  escribió Rubén.") es en persona, leyendo su celular: sin filtro. En el .txt va sin comillas para que la voz no las
  lea; la burbuja dice `¿"Por favor"? Esto no lo escribió Rubén.`
- **03 y 04 se pisan apenas** (~0,2 s): Graciela corta a Rubén en "factura…". Recortar el final de 03 con un fade de
  0,15 s y arrancar 04 encima.
- **05 y 13 son dos tomas distintas de "Dale."**: 05 resignado y bajito (derrota), 13 firme y liviano (sin pausa). No
  reusar una por la otra.
- **07 es EL remate:** con la cama baja (-12 dB) y nada encima. Si suena triste o a sermón, regenerar.
- **09:** toma nueva de Rasalgethi "Una cobranza automática más tarde."; si pasa de 2,4 s, atempo 1,1. Fallback: la
  toma de `reels/ya-lo-cargo` "Un sistema más tarde." y el cartel dice "Un sistema" / "más tarde…".
- Si "COBRAR" sale sin marcar en 16, regenerar solo esa línea.

| archivo | quién | voz | ~dur. | proceso |
|---|---|---|---|---|
| 01-patricia · "Rubén, estás en rojo. Y hoy pagás sueldos." | Patricia | Pulcherrima | 2,3 s | sin filtro |
| 02-ruben · "Tranquila. La calle me debe un millón." | Rubén | Algenib | 2,1 s | sin filtro |
| 03-ruben · "Graciela, querida… te llamaba por lo de la factura…" | Rubén | Algenib | 2,1 s | fade final 0,15 s (lo pisa 04) |
| 04-graciela · "¡Rubén! Justo. Mandame veinte cajas." | Graciela | Gacrux | 1,6 s | sin filtro |
| 05-ruben · "…Dale." | Rubén | Algenib | 0,5 s | sin filtro |
| 06-patricia · "¿Y? ¿Cobraste?" | Patricia | Pulcherrima | 0,9 s | se reusa en Q4 |
| 07-ruben · "Mejor. Ahora me deben más." | Rubén | Algenib | 1,4 s | cama baja |
| 08-patricia · "Te paso con cobranzas." | Patricia | Pulcherrima | 1,1 s | sin filtro |
| 09-narrador · "Una cobranza automática más tarde." | Narrador | Rasalgethi | 2,2 s | atempo 1,1 si > 2,4 s |
| 10-graciela · "¿Por favor? Esto no lo escribió Rubén." | Graciela | Gacrux | 2,2 s | sin filtro |
| 11-nico · "Beto. Hoy paso." | Nico | Fenrir | 1,0 s | sin filtro |
| 12-graciela · "¡Rubén! Ya te pagué. Mandame veinte cajas." | Graciela | Gacrux | 2,0 s | igual que 04 |
| 13-ruben · "Dale." | Rubén | Algenib | 0,4 s | sin filtro |
| 14-ruben · "Mejor. Cobré y vendí." | Rubén | Algenib | 1,4 s | sin filtro |
| 15-patricia · "Te paso con inversiones." | Patricia | Pulcherrima | 1,1 s | sin filtro |
| 16-ruben · "Comentá COBRAR y te mando cómo funciona para tu distribuidora." | Rubén | Algenib | 3,1 s | sin filtro |
