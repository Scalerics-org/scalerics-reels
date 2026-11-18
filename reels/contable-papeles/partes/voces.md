# contable-papeles · voces (Gemini TTS, 3 tomas por línea en partes/tomas/, tonos en partes/lineas.tsv)

Adriana = **Autonoe** · Marcelo = **Enceladus** · Sofi = Achernar · narrador del cartel = Rasalgethi. Lucas no habla.
Generar como en `reels/inmobiliaria-visitas/partes/` (`TOMAS="a b c" bash partes/reintentar.sh`, medir con
`bash partes/medir-tomas.sh`, "oyó:" tiene que coincidir con el .txt, armar las finales con `bash partes/procesar.sh`).

**Por qué estas voces.** Autonoe no la usó ningún personaje del repo (solo figuraba como alternativa no usada en
veterinaria-vacunas y pilates-cuota): es la contadora nueva. Para Marcelo no queda ninguna voz masculina de Gemini sin
usar en la semana (Algenib = Rubén, Fenrir = Nico, Umbriel = Walter, Sadaltager = Héctor, Algieba = el contador de
Rubén, Charon/Puck/Iapetus/Achird = taller, parrilla e inmobiliaria, Schedar/Zubenelgenubi = vet y pilates, Alnilam/
Sadachbia = corralón); **Enceladus** solo hizo la línea de Tito en `corralon-portland` (17-11, una frase). Alternativa:
**Puck** (Maxi, 16-11). Si el otro reel de esta noche (`tienda-tenes-stock`) eligió Enceladus o Autonoe, decide el
coordinador cuál cambia. Si Autonoe suena a locutora o demasiado dulce, probar **Aoede** (solo voces de fondo en
reels viejos de octubre) con el mismo tono.

**Filtros.** 01, 10 y la reusada de Q3 son AUDIOS DE WHATSAPP de Marcelo: pasan por el filtro
de altavoz del celular (el de g1/g3 de inmobiliaria-visitas). 02 y 09 son Adriana grabando un audio: sin filtro (se la
oye en la sala). 11 (Sofi) lowpass 7 kHz muy leve (videollamada).

**El callback reusa el MISMO audio:** el "Adri, las facturas te las mando mañana sin falta." de Q3 es la toma final de
`01-marcelo` (no se genera de nuevo). "Ordenadito" va con TRES tomas distintas: 03 orgulloso de su caja (sin razón), 08
satisfecho en la panadería (con razón) y 10 "Qué ordenadito." encantado consigo mismo.

Burbujas SIN voz (solo pop o ding): las fotos que llegan (pulgar, factura doblada, "¿esto sirve?"), el contador
"Mandaron X de 60", los rótulos de la pausa, la foto del ticket en blanco, el WhatsApp del día 1, "Subido ✓", el panel,
"Recordatorio automático enviado a 22 ✓", "60 de 60 ✓", "Noches hasta las 2: 0", la línea chica. Se tiene que entender
sin sonido.

| archivo | quién | voz | duración objetivo | proceso |
|---|---|---|---|---|
| 01-marcelo.txt · "Adri, las facturas te las mando mañana sin falta." | Marcelo (audio) | Enceladus | ~2,6 s | Filtro de altavoz. Es el gancho (entra a ~0,25 s). Se reusa idéntica en Q3. Que "sin falta" se entienda. |
| 02-adriana.txt · "Marcelo. Vence hoy." | Adriana | Autonoe | ~1,1 s | Sin filtro. Hueco interno "Marcelo." · 0,25 s · "Vence hoy." |
| 03-marcelo.txt · "Acá está todo, Adri. Ordenadito." | Marcelo | Enceladus | ~1,7 s | Sin filtro. Si pasa de 1,9 s, atempo 1,08. |
| 04-adriana.txt · "¿Y esta?" | Adriana | Autonoe | ~0,6 s | Sin filtro. Es la frase de la portada. Si suena enojada, regenerar. |
| 05-marcelo.txt · "Esa es la más importante." | Marcelo | Enceladus | ~1,3 s | Sin filtro. EL remate: va después de la pausita. Que suene convencido, no pícaro. |
| 06-marcelo.txt · "Si querés, te mando una foto." | Marcelo | Enceladus | ~1,5 s | Sin filtro (en persona, desde la puerta). |
| 07-narrador.txt · "Una automatización más tarde." | Narrador del cartel | Rasalgethi | ≤ 2,6 s | Frase nueva. Si pasa de 2,6 s y no se puede apurar, reusar "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav` y el cartel dice "Un sistema" / "más tarde…". |
| 08-marcelo.txt · "Listo. Ordenadito." | Marcelo | Enceladus | ~0,9 s | Sin filtro. Tiene que sonar distinto de 03 (satisfecho, no fanfarrón). |
| 09-adriana.txt · "Marcelo, las mandaste el día tres." | Adriana | Autonoe | ~1,7 s | Sin filtro. Si el STT oye "el día 3" está bien; si oye otra cosa ("el de atrás"), regenerar. |
| 10-marcelo.txt · "¿Yo? Qué ordenadito." | Marcelo (audio) | Enceladus | ~1,1 s | Filtro de altavoz. Hueco interno "¿Yo?" · 0,2 s · "Qué ordenadito." |
| 11-sofi.txt · "Comentá PAPELES y te mando cómo funciona para tu estudio." | Sofi | Achernar | ~3,0 s | Lowpass 7 kHz leve. Si pasa de 3,3 s, atempo 1,08-1,12. |

Si alguna voz de siempre (Achernar, Rasalgethi) no estuviera disponible, no cambiarla por otra: avisar.
