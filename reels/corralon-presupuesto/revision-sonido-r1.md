# corralon-presupuesto · revisión de SONIDO Y RITMO · ronda 1 (27-11)

Sobre `renders/corralon-presupuesto-final.mp4` (46,805 s, AAC 48 kHz estéreo) y los stems de `assets/audio/`.
Temporales en `renders/qa-sonido-r1/` (tramos.txt, pal-*.json, hojas cada 0,5 s, musica-p2.wav).

## Mediciones
- Integrado **-14,0 LUFS** · true peak **-3,0 dBFS** · LRA 4,8 LU · astats: flat factor 0, sin clipping. OK.
- Voz contra música+SFX (medir.py, ventanas pareadas): mediana +25,6 LU, mínimo +6,5 LU (27,5 s, cola de "Te lo armo
  ahora."). Con el criterio de máximos del tramo: único tramo bajo 6 LU = 27,5 s (+5,2), y es la cola de g10 (voz -26,7
  momentánea), no habla plena. OK.
- STT (herramientas/tiempos.mjs, archivo por archivo): todas las líneas iguales al guion salvo tildes, **menos m11**
  (ver defecto 3). "Ya sé. Es mi camión." → "Ya sé es mi camión" (bien). "Por lo menos yo no fui pesado." → completa,
  1,86 s para 10 sílabas (~5,4 síl/s, la más lenta del reel: suena pausada; si es "plana" no se puede asegurar sin
  escuchar). m6 (atempo 1,17, ~7,2 síl/s) y g14 (1,18, ~6,8 síl/s) se transcriben enteras: no se pierden sílabas, pero
  son las más rápidas del reel.
- Burbujas contra voz (cuadros exactos en 6,6-6,7 · 10,4-10,5 · 33,5-33,7 · 38,4-38,8 y hojas cada 0,5 s): entran con la
  voz, la segunda mitad entra en el CORTE. OK.
- SFX nuevos (bsb-imprime, bsb-teclas, bsb-ladrillo/2): grabaciones reales de BigSoundBank CC0 con autor, link y licencia
  en fuentes.md. OK.
- Planos: ninguno de más de 3 s salvo el cierre C (ver defecto 6). Tarjeta PRESUPUESTO 43,73-46,8 = 3,07 s.

## Defectos

1. **ALTA · 35,08 s → 46,8 s · la música se corta en seco a mitad de la línea de Tito y no vuelve.**
   `bgm/pizzicato-lleno.wav` dura 12,68 s; la parte 2 la pone en P2 (23,4) con `desde: 1.0` y `dur: 23,4` sin `loop`, así
   que el archivo se acaba a los 23,4 + 11,68 = **35,08 s** (confirmado: renders/qa-sonido-r1/musica-p2.wav, silencio de
   35,08 a 46,8). El archivo termina en -28 LUFS momentáneos (no es un final musical) y el `fin: 0.5` cae en 46,3, nunca se
   aplica: corte duro en medio de "Gustavo, ¿la de la casa te compró?" (33,77-35,66). Q4t, Q4b, Q5, Q5g, Q5i y todo el
   cierre (11,7 s, el 25 % del reel, la parte "resuelta") quedan sin música. Consecuencia: 37,15-37,40 (la pausa de
   "Compró. · Con un botón.") y 38,22-38,40 (antes del corte a Q5) son **silencio digital** (< -50 dBFS; resto a -90/-115).
   Arreglo: `loop: true` en esa entrada de gen.mjs línea 351 (o una segunda instancia desde 1.0 en ~34,9 con fundido
   cruzado de 0,2 s), y que el `fin` de 0,5 s caiga en 46,3. Rehacer mezcla y paso 10.

2. **MEDIA · 21,04-21,40 s · 0,36 s de silencio digital antes del stinger (inserto P6i).** `calle()` termina en T.p6i
   (20,22) y la música se cortó en la pausa; después de "Se lo pasé a él." queda solo el glitch (20,67) y no hay nada
   hasta el whoosh de 21,33 (resto a -77 LUFS). Un respiro antes del cartel está bien, pero en cero absoluto suena a audio
   cortado. Arreglo: estirar `calle(T.p4, T.p6i, -42)` hasta `P1 + 0.05` con fin 0,15 (o un zumbido/ambiente a -50) para
   que el hueco tenga aire.

3. **MEDIA · 31,45-32,71 s · "¡Ay, qué atentos!" (m11): el STT no oye "qué".** Toma cruda 11-monica-c: "Ay qué atentos";
   procesada con atempo 1,05: "atentos" (sin relleno) y "Ay atentos" (con 0,3 s de relleno). El "qué" se achica en el
   procesado. Arreglo: m11 sin atempo (la toma cruda dura 1,31 s, solo +0,05 s) o la toma a/b; volver a pasar el STT.

4. **MEDIA · 20,32 s y 42,60 s · el papel de los insertos (P6i y Q5i) es mudo.** `sfx/papel.wav` tiene **0,40 s de
   silencio digital al principio** (-120 LUFS hasta 0,4 s). En P6i (`T.p6i + 0.1`) y Q5i (`T.q5i + 0.08`) se usa con
   `dur: 0.4`: se toca exactamente el tramo mudo, no suena nada. En 0,02 s (P1, `papel(0.02,…,1.4)`) y en P2 (23,42) el
   roce arranca recién a los 0,42 s y en P3 (6,94) a los 7,34 s: atrasado respecto de la lista que ya está cayendo.
   Arreglo: en `papel()` y en los dos `s("sfx/papel.wav")` usar `desde: 0.38` (o recortar el archivo), y en los insertos
   `dur: 0.45`.

5. **BAJA · 27,35-27,80 s · las teclas de los renglones casi no suenan.** `key-press.mp3` tiene 0,107 s mudos al
   principio y `tecla()` lo corta en `dur: 0.15` con `fin: 0.05`: quedan ~0,04 s de clic ya en fundido. Arreglo:
   `desde: 0.1` en `tecla()`.

6. **BAJA · 43,37-46,8 s · el cierre es un solo plano de 3,43 s y la tarjeta dura 3,07 s; la voz termina a 46,67 s.** Pasa
   apenas los 3 s de la regla y la voz de g14 termina 0,13 s antes del final (sin aire). Arreglo: entrar la tarjeta
   ~0,1 s más tarde o cortar 0,1 s del whoosh previo; si se puede, 0,2 s de cola después de "corralón".

7. **MEDIA (ritmo) · duración total 46,8 s.** Sobre el techo de ~45 s para reels con diálogo (CLAUDE.md, "El guion") y
   lejos de los ~30 s del formato completo de referencia. No se mide como bug de sonido, pero si el arreglo 1-2 permite
   recortar, el candidato es la cola de P6i (1,15 s) o la pausa de 0,7 s de P4p.

8. **BAJA · 21,4-23,4 s · el cartel: las letras rebotan pero no hay sonido por palabra.** Solo whoosh + stinger. Opcional:
   un pop suave (-46) en "Un", "seguimiento", "más tarde…".

No verificable sin escuchar (para el coordinador): que "Por lo menos yo no fui pesado." suene seco y plano (el ritmo es
el más lento del reel, buena señal) y que m6/g14 con atempo 1,17-1,18 no tengan el "gorjeo" de time-stretch. El STT no
pierde sílabas en ninguna de las dos.

## Veredicto
**NO PASA en esta ronda.** Un defecto ALTO (la música muere a los 35,08 s en medio de una línea y los últimos 11,7 s
quedan sin cama, con huecos en silencio digital) y tres MEDIOS fáciles (hueco mudo antes del stinger, "qué" perdido en
m11, papel mudo en los insertos). Todos se arreglan en gen.mjs / procesar.sh sin tocar escenas; después: `node gen.mjs`,
`MEDIR=1` + medir.py, render y paso10.sh. Niveles, picos y relación voz/resto están bien.
