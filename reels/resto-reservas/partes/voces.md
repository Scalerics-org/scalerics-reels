# resto-reservas · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/resto-reservas` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "<tono de lineas.tsv>"`.
Recortar silencios (silenceremove) en `partes/rec/`; los finales en `assets/voice/`. Medir cada línea con `tiempos.mjs`
("oyó:" tiene que coincidir con el .txt).

Voces: **Raúl = Iapetus** y **Fabián = Achird** (los de parrilla-no-vuelve: es la misma parrilla), **Walter = Umbriel** (el
de siempre), **Pablo = Schedar** (nuevo; en el repo Schedar solo hizo a Bruno, secundario de veterinaria-vacunas, 17-11;
Sadaltager no: es Héctor; Charon y Puck no: los usa taller-esta-pronto en paralelo; fallback Algieba), **narrador del
cartel = Rasalgethi**: audio REUSADO de `reels/abren-hoy-completo/assets/voice/narrador.wav` ("Un agente de IA más
tarde."), como corralon-portland. `10-narrador.txt` queda solo como referencia (no generar).

**Tomas que se reusan (callback exacto, a propósito):**
- `01-pablo` suena en P1 (llamada, filtro de teléfono) y en Q1 (el mismo audio como nota de voz en el chat, el mismo
  filtro): el que mira tiene que oír la MISMA pregunta y ver que esta vez contesta el agente.
- `05-fabian` ("Raúl, ¿y los de las diez?") suena en P4 y en Q4: lo único que cambia es la respuesta ("Llegaron.").
- `09-raul` y `14-raul` dicen lo mismo ("Dejá los cubiertos.") con dos tonos distintos: resignado (P6) y contento (Q5).
  Son dos tomas distintas a propósito; si la 14 no sale claramente contenta, probar "¡Dejá los cubiertos!".

Procesos: `01-pablo` con filtro de teléfono (pasaaltos 300 Hz, pasabajos 3,4 kHz, un poco de saturación suave) en las
dos apariciones. `07-fabian` ("¿Y?") puede quedar de 0,3-0,5 s: no estirarlo. Todo lo demás en persona, sin filtro, sobre
el murmullo del salón (P1-P3, Q3-Q4) o sobre el salón que se vacía (P5-P6: casi nada, el fuego y la vela). `11-walter`
en el living (sin murmullo). `15-raul` sin cama de salón, solo la música de cierre.

Burbujas SIN voz (solo pop): los "¿Tenés mesa?" de la escalada (P2), "¡Estamos llegando!" (P4), el mensaje de Pablo de
medianoche (P6), todo el chat del agente (Q1, Q3, Q5), el panel de confirmaciones y el aviso de lista de espera (Q2).
