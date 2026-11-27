# vete-castracion · revisión de SONIDO Y RITMO · ronda 1 (revisor independiente, 27-11)

Sobre `renders/vete-castracion-final.mp4` (47,0 s) y los stems `assets/audio/stem-voz.wav` / `stem-resto.wav` (coinciden
con el final: misma curva por tramos, ~1 dB de diferencia por el loudnorm). Mediciones y archivos en `renders/qa-sonido-r1/`
(`tramos.txt` = momentánea máx. por tramo de 0,5 s de voz / resto / final; `rms.py` = RMS cada 0,1 s; `stt/` = STT por línea
cortada del mp4 final; `tira.png` = cuadros en los momentos de sonido).

## Lo que está bien
- Integrado **-14,1 LUFS**, true peak **-5,6 dBTP**, astats pico -6,0 dBFS, flat factor 0: **sin clipping**. LRA 8 LU.
- Voz sobre música+SFX mientras habla: mediana +30 LU, mínimo **+8,4 LU** (ventanas pareadas, medir.py); el único tramo con
  +6,0 (18,0 s, criterio de máximos) es la cola de "¡Ay, mi amor!" + el ring, no habla. **Cumple ≥ 6 LU.**
- STT del mp4 final, línea por línea: 16 de 19 apariciones idénticas al guion, incluidas "¿Cómo está Toto?" (0,55 s, por
  teléfono), "Ahora el de Coco." (18,83 y 33,26), "Bruno, ¿llamó alguien?" (35,41), "Unos avisos automáticos más tarde",
  "Comentá AVISOS y te mando cómo funciona para tu veterinaria". Fallos abajo (D3, D4, D6).
- Tarjeta "Comentá AVISOS" 44,0 → 46,97 = **2,97 s**, arranca sobre "AVISOS". Cartel 21,08-23,43 = 2,35 s.
- Ningún plano de más de 3 s sin cambio (Q5 3,6 s y C 3,6 s tienen acción/tarjeta dentro).
- Cobertura de SFX completa en lo visible: ring + bip de atender en cada chip, pasos y campanita de la señora, creak de
  puertas, guante, foto, toques, avisos (vibra+notificación), dings del panel, uñas de Toto trotando, ladrido, pops de
  rótulos y tarjeta, whooshes de cámara, stinger del cartel.
- Ronquido: grabación real (Freesound 156597, samueljustice00, CC0) acreditada en fuentes.md. Ring: archivo Kenney CC0
  acreditado (no sintetizado con ffmpeg), pero ver D5.

## Defectos

| # | Segundo | Grav. | Defecto | Arreglo concreto |
|---|---|---|---|---|
| D1 | 15,65-16,4 | **ALTA** | **El ronquido del remate no se oye.** `ronquido.wav` tiene 0,6 s iniciales casi mudos (-53 dB RMS) y el ronquido real va de 0,6 a 1,1 s. Puesto en T.ronca = 15,65, en el mp4 15,6-16,2 queda a -57/-77 dB RMS (inaudible) y la parte fuerte cae en 16,25-16,7, **debajo de "¡Ay, mi amor!" (16,37)**, ~15 dB más baja que la voz: se tapa. El hocico que se infla (ENV.ronq, misma envolvente) también se mueve en 16,25, cuando ya habla Vero. Es EL remate (P4) y suena a nada. | Recortar `ronquido.wav` desde ~0,55 s (o usar `desde: 0.55`) y recalcular ENV.ronq con el archivo recortado; que el ronquido fuerte quede solo, ~0,6-0,8 s antes de v9 (T.v9 = T.ronca + dur. del ronquido + 0,15). Subirlo al techo real (-31) medido sobre el tramo que suena. Mismo chequeo para Coco (D2) y el altavoz de Q3. |
| D2 | 20,36-21,1 | MEDIA | Ronquido de Coco: la parte audible llega ~20,86 y a los 0,25 s la pisan el whoosh/stinger (21,04-21,1) y el narrador (21,13). En el final, -32/-43 dB RMS contra voces de -13/-17: se oye apenas un resoplido. | Mismo recorte del arranque mudo (ronquido2, `desde`), adelantar o dejarlo terminar antes del stinger (P1 = fin del ronquido + 0,15). |
| D3 | 6,52-6,8 | MEDIA | "**Sí.** Dormido. Todavía.": el STT del mp4 y del `b5.wav` oye "dormido todavía": el "Sí" (0,22 s con atempo 1,3) no se entiende. La toma cruda `05-bruno-b` el STT la oye entera ("sí dormido todavía"): lo rompe el atempo 1,3. Además "Todavía" (4 sílabas en ~0,6 s, 6,7 síl/s) ya no suena "estirado" como pide el tono. | b5 con atempo 1,0 (o ≤ 1,1) y ganar el tiempo acortando los dos silencios internos (hoy 0,67 y 0,73 s) a ~0,4 s: queda en ~2,5 s, menos que los 2,79 actuales. |
| D4 | 9,71-11,6 | MEDIA | "Vero **quiere** hablar con él" se oye "Vero **quiero** hablar con él" (STT del mp4 y del `b6.wav`; la toma cruda `06-bruno-a` se oía bien). La frase va a ~8,6 síl/s con atempo 1,12: acelerada. | b6 sin atempo (1,0) y recortar la pausa después de "Doctora." (~0,3 s): misma duración. Si no alcanza, otra toma. |
| D5 | 0,0 · 3,85 · 5,08 · 6,30 · 17,9 | MEDIA | El "ring" del teléfono de mostrador es `k-dos-tonos.wav` (Kenney "Digital Audio", un bip electrónico de 0,15 s; en inmobiliaria-visitas se usó como tono de colgado). No suena a teléfono sonando: con la base que titila y los arcos en pantalla, se oye un "bip". | Usar un ring real CC0 ya acreditado en el repo: `reels/taller-esta-pronto/assets/sfx/bsb-ring.wav` ("Phone Ring #5", BigSoundBank #0375, CC0, timbre genérico de inalámbrico), cortado a ~0,6-0,9 s por chip, mismo techo; anotarlo en fuentes.md. |
| D6 | 14,4-16,3 | MEDIA | La pausa del remate es silencio digital: RMS -73/-89 dB en 14,5-14,9 y -54/-77 hasta 16,3 (la música baja, el ronquido no se oye, D1). ~1,9 s de nada: en el celular se lee como corte de audio, no como pausa de comedia. | Con D1 resuelto entra el ronquido; además dejar un piso de sala (el zumbido de la recepción/sala o un room tone a ~-48 LUFS) en la pausa, o la música bajada a 0,5 en vez de 0,85 de duck. |
| D7 | 40,47 | BAJA | "¿Cómo está Toto?" en persona (Q5, sin filtro) el STT la oye "cómo está **todo**" (la misma toma por teléfono en 0,55 sí da "toto"). La burbuja lo aclara, pero es el callback. | Probar en Q5 un pasabanda suave (hp 150/lp 7000) o una toma con "TO-to" más marcado. |
| D8 | todo | BAJA | La cama queda muy por debajo: resto -43 LUFS integrado vs voz -19 (mediana +30 LU). Los SFX de acción (foto, toques, pasos) quedan a -32/-45: en el celular se pierden. Cumple el techo de -31, pero hay margen. | En tramos sin voz, llevar los SFX de acción a -33/-31 (el techo) y dejar la música ~-38 bajo voz; sigue sobrando margen para ≥ 6 LU. |

Velocidad de habla (sílabas por segundo, sin pausas largas): v1 6,7 · b3 5,6 · b4 5,7 · i7 6,7 · b8 6,9 · narrador 5,7 ·
b15 7,0 · i16 6,7 (atempo 1,2: rápida pero clara, STT perfecto; sin artefactos que el STT note) · b2 ~5 (1,12, bien) ·
**b6 ~8,6 (1,12, rápida, falla "quiere")** · **b5 "Sí" 0,22 s (1,3, se pierde)**. Los que fallan son exactamente los dos
con atempo sobre habla ya rápida o una sílaba sola; i16 a 1,2 y el narrador a 1,15 pasan.

## Veredicto
**NO PASA** en esta ronda por D1 (gravedad ALTA): el ronquido, que es el remate de la parte 1 y el puente del callback,
no se escucha. Niveles, picos y relación voz/resto están en norma. Corregir D1-D6 (D3 y D4 son solo re-procesar voces ya
grabadas; D1, D2 y D6 son el arranque mudo del ronquido y su lugar en gen.mjs) y volver a medir.
