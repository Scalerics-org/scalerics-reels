# dice-cuarenta · fuentes

Reel "para mandar" (comedia de situación con Rubén en la distribuidora): no afirma datos, cifras, años ni empresas
reales. No hay nada que verificar con WebSearch. Sin marcas: planilla genérica (la palabra "Excel" solo se dice y se
escribe en burbujas; no se dibuja ícono ni interfaz del programa), chat genérico, cajas de aceite sin marca.

## Voces
Gemini TTS (gemini-2.5-pro-tts) con `herramientas/voz.mjs`: Rubén = Algenib, Nico = Fenrir. Narrador del cartel
("Un sistema más tarde.") = la toma de Rasalgethi de `reels/ya-lo-cargo/assets/voice/narrador.wav` (reusada). Tomas en
`partes/tomas/`, recortes en `partes/rec/`, finales armados por `partes/procesar.sh`.

## Música y efectos
Los de siempre del repo (copiados de `reels/la-lista/assets/`, con su crédito en `reels/la-lista/fuentes.md` y
`reels/ya-lo-cargo/fuentes.md`): pizzicato.wav, zumbido-largo.wav, pop, whoosh, whoosh-short, notification, cero,
campanita, click-soft, key-press, k-page-turn, k-metal-click, k-metal-liviano-2, k-plato-001, k-plastico, k-cloth_1/2,
k-tono, k-neumatico-abre, k-motor-bajo, motor.mp3, madera-golpe, madera-tabla, paso-0..4, sorbo, stinger.

Nuevos en este reel (reales, CC0 1.0), todos de Kenney (https://kenney.nl), bajados del espejo
https://github.com/Daarko/sparkstream-sounds (convierte a .wav los packs originales de kenney.nl; licencia CC0 en su
README: "Every sound in this repository is sourced from Kenney, released under Creative Commons Zero (CC0 1.0
Universal)"):
- `k-tick-1.wav`, `k-tick-2.wav`, `k-tick-4.wav` (cada paleta del marcador de aeropuerto que cae, alternadas, con el
  roce de `k-page-turn` al final): "tick_001/002/004", pack "Interface Sounds" (https://kenney.nl/assets/interface-sounds),
  CC0 1.0.
- `k-ala-1.wav`, `k-ala-3.wav`, `k-ala-4.wav` (el aleteo de la paloma: roces de tela cortados, más rápidos y con
  pasaaltos; foley de tela como ala): "cloth1/3/4", pack "RPG Audio" (https://kenney.nl/assets/rpg-audio), CC0 1.0.
  No hay un aleteo de paloma CC0 accesible desde la nube (freesound/opengameart no responden).
- `k-switch-3.wav`, `k-pep.wav`: bajados para probar (switch_003 de Interface Sounds, pepSound1 de Digital Audio), CC0
  1.0; no se usan en la mezcla.
Nada sintetizado con ffmpeg.
