# vete-castracion · revisión de SONIDO Y RITMO · ronda 2 (revisor independiente, 27-11)

Sobre `renders/vete-castracion-final.mp4` (46,87 s) y los stems `assets/audio/stem-voz.wav` / `stem-resto.wav` (coinciden con
el final: misma curva, ~0,5-1 dB por el loudnorm). Mediciones en `renders/qa-sonido-r2/`: `medir-r2.py` → `tramos.txt`
(momentánea máx. por tramo de 0,5 s: voz / resto en el mismo cuadro / resto máx. / final) y `rms.txt` (RMS cada 0,1 s de
voz, resto y final); `stt.mjs` → `stt.txt` (Speech-to-Text es-UY SIN pistas de frases, cada línea cortada del mp4);
`stt-archivos.txt` (las tomas sueltas); `tira*.png` y `f/` (cuadros en cada sonido).

## Niveles: en norma
- Integrado **-14,1 LUFS**, true peak **-5,4 dBTP**, astats pico -5,6 dBFS, flat factor 0: **sin clipping**. LRA 7,9 LU.
- Voz sobre música+SFX mientras habla: mediana **+30,2 LU**, mínimo **+9,2 LU** en ventanas pareadas y **+7,6 LU** con el
  criterio más duro (máximo del resto en el tramo). **Cumple ≥ 6 LU en todos los tramos.**
- Efectos sin voz (medir-sfx.py): máximo -31,6 LUFS (16,0 s el ronquido, 24,5 y 30,5 los avisos): todos bajo el techo -31.
- Arranques mudos de los SFX usados: todos ≤ 0,09 s (pop con `desde: 0.11`); ronquido.wav y ronquido2.wav ya arrancan en
  el ronquido (0,05 s). Ring bsb-ring.wav sin arranque mudo.
- Tarjeta "Comentá AVISOS": pop en 43,88, entera en 43,95 (AVISOS se oye ~43,9) → 46,87 = **2,97 s**. Cartel 21,08-23,40.
- Planos: ninguno de más de 3 s sin cambio (P2c 3,4 s y Q5 3,6 s tienen burbujas, contador, la señora/Vero que entra,
  Toto que trota).

## Tabla de la ronda 1

| # r1 | ¿Arreglado? | Cómo quedó (medido en el mp4 final) |
|---|---|---|
| D1 ronquido del remate (ALTA) | **SÍ** | Suena 15,96-16,55 s, final -32/-35 dB RMS (momentánea -31,6 LUFS, en el techo), **solo**: piso de sala -45/-49 alrededor, "¡Ay, mi amor!" arranca en 16,70 (0,15 s después). Se oye claro en la pausa; queda ~20 LU bajo los diálogos (es el techo de -31 por efecto). Cuadros: Toto con el auricular en 16,1-16,4. |
| D2 ronquido de Coco | **SÍ** | 20,40-20,90 s, -31/-38 dB RMS (M -31,9), después de "Ahora el de Coco." (termina 20,37) y antes del whoosh/stinger y el narrador (21,1). Cámara sobre Coco en 20,45-20,8. |
| D3 "Sí. Dormido. Todavía." | **SÍ** (audio) | STT del mp4: "sí dormido todavía" (0,93). Sí 6,6-7,0 · Dormido 7,6-8,3 · Todavía 8,8-9,5 (0,7 s, estirado). Pero la burbuja quedó desfasada: ver N1. |
| D4 "quiere" | **PARCIAL** | La toma sola (`assets/voice/b6.wav`) el STT la oye "quiere" (0,89). En el mp4 el STT duda: ventana 9,85-12,2 "Quiero" 0,83 / "quiere" 0,79; ventana 10,0-12,15 "quiere" 0,83. Es la elisión natural "quiere‿hablar", no artefacto. La burbuja dice "quiere". Ver N8 (BAJA). |
| D5 ring real | **SÍ** | bsb-ring.wav (BigSoundBank #0375, CC0) en 0,0 · 3,68 · 5,01 · 6,33 · 18,24, con la base que titila / los arcos en cuadro. En el montaje dura 0,26 s (ver N2, BAJA). |
| D6 pausa sin silencio digital | **SÍ** | 14,4-15,9 s: final -38/-49 dB RMS (zumbido de la sala + música a la mitad), nada bajo -50. |
| D7 "¿Cómo está Toto?" en persona | **NO** (BAJA) | STT 40,36: "cómo está todo" 0,84 / "toto" 0,72 (en 0,55 por teléfono: "toto" 0,82). El pasabanda no cambió nada. La burbuja lo aclara. |
| D8 SFX más presentes | **PARCIAL** (BAJA) | Toques, foto, dings, avisos ahora -31,6/-36 LUFS en los tramos sin voz (antes -32/-45). El resto integrado sigue en -42,9 LUFS (la música no cambió); cumple, ya no es defecto. |

## Defectos nuevos / pendientes

| # | Segundo | Grav. | Defecto | Arreglo concreto |
|---|---|---|---|---|
| N1 | 6,75-8,78 | **MEDIA** | **La burbuja de b5 va adelantada al audio.** "Sí. Dormido." aparece entera en 6,75 ("Dormido" se oye 7,6) y "Todavía." se agrega en ~8,0, **0,8 s antes de que Bruno lo diga** (8,8-9,5). Es el remate del montaje (el "Todavía." estirado): sin sonido se lee antes de tiempo y con sonido se ve que no coincide. Causa: `assets/tres.js:1369`, `m.voz + 1.25` quedó del b5 viejo con atempo 1,3; con b5 sin atempo "Todavía" arranca a +2,15. | En tres.js:1369: `verGlobo(g, t >= m.voz + 2.12 ? 99 : t >= m.voz + 0.95 ? 2 : 1)` (Sí → Dormido → Todavía, cada palabra cuando se oye), o sacar los dos inicios de ENV.b5 (primer valor > 0 después de cada tramo de ceros). Requiere re-render. |
| N2 | 3,68 · 5,01 · 6,33 | BAJA | El ring del montaje dura 0,26 s (`m.atiende - m.ring + 0.06`): son ~3 ciclos del trino de bsb-ring (13 Hz, ~700 Hz), se lee como un "brrp" más que como un teléfono sonando. El de 0,0 dura 0,42 s y el de 18,24 1,0 s (esos sí). | Ring de 0,45-0,5 s por chip: arrancarlo 0,2 s antes (sobre el whoosh del chip) o correr `atiende` a +0,4. |
| N3 | 0,30 · 3,88 · 5,21 · 6,53 | BAJA | El bip de atender (`k-tono.wav`) es casi inaudible: el archivo tiene 0,08 s mudos al principio, con `vel 1.3` y `dur 0.12` quedan ~0,06 s de sonido, tapados por la cola del ring. | `desde: 0.08` en `atender()` y que el ring termine justo antes del bip (fundido 0,04). |
| N4 | 37,06-37,18 · 39,08-39,19 | BAJA | Dos huecos de ~0,12 s bajo -60 dBFS (silencio casi digital) entre "¿llamó alguien?" y "Nadie." y en el corte Q5i→Q5: desde Q3 (29,34) la parte 2 no tiene piso de sala (el zumbido -52 va solo de P2 a T.q3). | Extender el zumbido de la recepción (-52, lp 900) de T.q4 a DUR (o de T.q3 a DUR salvo la cocina). |
| N5 | 46,70-46,87 | BAJA | "…para tu veterinaria" termina en 46,70 y el video en 46,87: 0,17 s de cola, la música ya fundida bajo la voz. Al final se siente cortado. | Adelantar i16 0,15-0,2 s (la tarjeta sigue sobre "AVISOS") o dejar 0,3 s de cola con un pop/acorde final suave. |
| N6 | 41,55-42,2 | BAJA | El creak de la puerta (41,55) y las uñas (desde 41,65) suenan ~0,6 s antes de que Toto entre en cuadro (~42,2); la puerta no se ve. Se acepta como anticipación fuera de cuadro. | Opcional: correr `trota[0]` +0,4 s o que la cámara incluya la puerta. |
| N7 | — | BAJA | fuentes.md, línea 14 sigue diciendo que el ring es `k-dos-tonos.wav` y la línea 9 da los cortes viejos del ronquido (0,08-1,23 s), contradichos por las líneas (r1) de abajo. | Corregir las dos líneas para que no haya dos versiones. |
| N8 | 10,9-12,0 | BAJA | "Vero quiere hablar" ambiguo para el STT (D4 parcial). | Solo si se rehace la voz: toma `06-bruno-b` (STT "quiere" 0,92) con los mismos silencios recortados. |
| N9 | todo | BAJA | Duración 46,9 s, sobre los ~45 s de techo para diálogos con personajes (CLAUDE.md, "El guion"). | Decisión del coordinador; no tocar si arte lo da por bueno. |

STT del mp4 final (sin pistas): 17 de 19 apariciones idénticas al guion (v1 0,55 · b2 · b3 · b4 · b5 · i7 · b8 · v9 ×2 ·
b10 ×2 · narrador · v12 · i13 · b14 · b15 · i16 "Comentá AVISOS y te mando cómo funciona para tu veterinaria"); las dos
dudosas son D4/N8 ("quiere/quiero") y D7 ("Toto/todo"), las dos con la burbuja que lo aclara. "Sigue dormido" (b4) sale
bien con la ventana justa (5,30); con 0,15 s antes el bip de atender/ring lo confunde con "sí dormido" (no se oye así).

## Veredicto
**PASA en sonido (sin defectos ALTOS).** Los 6 arreglos pedidos en r1 están hechos de verdad: el ronquido se oye, solo y
antes de "¡Ay, mi amor!"; el de Coco también; "Sí. Dormido. Todavía." se entiende; el ring es un teléfono real; la pausa
tiene piso de sala; niveles, picos y voz ≥ 6 LU en norma. **Queda un MEDIO a corregir en la próxima render: N1** (la
burbuja de "Todavía." 0,8 s antes de que se diga; un cambio de una línea en tres.js:1369). Los BAJOS (N2-N9) son
opcionales y se pueden sumar si se re-renderiza.
