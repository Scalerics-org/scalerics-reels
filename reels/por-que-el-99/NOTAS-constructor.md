# Notas del constructor · por-que-el-99 (14-11)

Duración: **30,52 s** (voz 30,40 s, 88 palabras de pantalla: "scalerics.com." es una). Cierre 2,65 s desde
"videollamada" (27,87). No se renderizó el mp4 (lo hace el coordinador).

## Render (desde reels/por-que-el-99)
```
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/por-que-el-99.mp4
ffmpeg -y -i renders/por-que-el-99.mp4 -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k renders/por-que-el-99-final.mp4
```
Portada (desde la raíz, con el mp4 ya hecho): `flock /tmp/hyperframes.lock node herramientas/portada.mjs por-que-el-99`
(usa `portada-src/fondo-portada.png`; `portada.png` ya está generada con ese mismo fondo).

## Cómo regenerar (desde la carpeta del reel)
1. Voz: `node partes/armar-voz.mjs` → `assets/voice/locucion.wav` + `partes/tramos.json` (una frase por tramo).
   Tomas: `partes/orus1-1.wav` (Orus, frases 1-8), `partes/n4-2.wav` ("No está probado." suelta), `partes/ruben-3.wav`
   (Algenib), `partes/orus2-1.wav` (Orus, reporte + cierre). Orus con atempo 1,1; silencios fijos entre frases
   (0,42 después del gancho y de "cien.", 0,45 después de "No está probado.", **0,42 entre "Más caro…" y "y vendió
   más"**, 0,45 antes de Rubén y 0,4 después).
2. Tiempos: `node partes/ajustar-tiempos.mjs` (cada frase cae exacta en su tramo; adentro, palabras repartidas por
   sílabas; `partes/texto.txt` = guion de pantalla con "scalerics.com."). El STT de control quedó en `partes/pal-stt.json`.
3. Boca de Rubén: `node partes/boca.mjs` → `assets/boca.js` (20,99-22,78).
4. `node gen.mjs && node armar.mjs`.
5. Fondo de portada: `LIMPIO=1 node armar.mjs`, snapshot a 4,1 s, `node armar.mjs` para volver; el fondo limpio está
   en `portada-src/fondo-limpio-4.1.png` y corrido 200 px hacia arriba en `portada-src/fondo-portada.png`.

## Voz (STT de control)
- Orus toma 1 de 3: las tres decían igual para el STT. "No está probado" el STT lo oía "no está aprobado" en las tres
  tomas largas; se generó la frase suelta (n4, 3 tomas): la n4-2 el STT la oye exacta, también recortada sola a tempo
  1,1. Dentro de la locución el STT vuelve a oír "aprobado" solo cuando el recorte incluye la cola de "vuelto" (sesgo del
  STT por contexto; el recorte 8,70-9,90 lo oye "no está probado").
- "se midió" el STT lo oye "se me dio" en todas las tomas (también en 3 regeneraciones con el tono marcando la i): es
  el STT; se dejó la toma original. "El nueve suena a oferta" lo oye "suena oferta" (la a pegada).
- Rubén toma 3 (2,0 s): "¿Y mi noventa y nueve vendió más?" (STT: "y me 99 vendió más").
- "scalerics.com" se dice "Scálerics punto com" (STT: "escalerita.com", como siempre).

## Planos (segundos globales)
| # | escena | inicio | plano 3D |
|---|---|---|---|
| 1 | s01-gancho | 0,00 | O1: por encima del hombro de Rubén (oficina vidriada, depósito con racks detrás), push-in al monitor; tipea 9 (0,95), 9 (1,30), 9 (1,65), confirma (2,0); el 999 3D se despega (2,2-2,77) |
| 2 | s02-primer-numero | 2,77 | P: corte al 999 parado en la planilla (mismo encuadre); órbita a 3/4; primer 9 verde y grande en "primer" (3,22-3,62) |
| 3 | s03-cien | 4,71 | travelling (4,59-4,96) a las etiquetas $ 99 / $ 100 (x 2,3); la de 100 cae en "menos" (6,16) |
| 4 | s04-cajero | 7,22 | travelling a la caja (x 4,7); manivela + cajón 7,56; monedas 8,18; sello 8,99; placa NO PROBADO |
| 5 | s05-catalogo | 10,15 | travelling al catálogo (x 7,0); tapa 10,20; vestido 10,76; los otros dos 11,51 |
| 6 | s06-tres-precios | 12,44 | dolly atrás; US$ 34 12,62 · 39 13,90 · 44 14,35; cajas a 3 (12,59 / 12,99 / 13,39) |
| 7 | s07-vendio-mas | 14,95 | push-in a 34/39, flecha 15,24-15,59; pausa; 4.ª caja del 39 y tilde 16,41; vuelve al general |
| 8 | s08-oferta | 17,46 | "mismo 3" con dos guías; giro del 39 a OFERTA 18,62-18,94; push-in |
| 9 | s09-redondo | 19,28 | la OFERTA salta del riel (19,24) y vuela con la cámara al regalo (x 10,6), choca 19,75, cae; tilde 20,12; la cámara sube a cenital sobre la OFERTA (20,45-20,74) |
| 10 | s10-ruben | 20,74 | O2: corte grilla→grilla a la pantalla (celda $ 999 + "?" rojo); la cámara sube por arriba de Rubén y baja de frente (21,1-22,1); Rubén girado hacia cámara habla (boca por amplitud); en "vendió" mira al depósito |
| 11 | s11-reporte | 23,18 | O3: el celular vibra en el escritorio; Rubén lo levanta con las dos manos y lo muestra (23,33-23,73); push-in; tarjetas 23,78 y 24,96 |
| 12 | s12-medimos | 25,92 | O4: baja el celular (26,02-26,37), levanta el mate a cámara (26,17-26,57), media sonrisa |
| 13 | s13-cierre | 27,87 | F: fondo verde, "Videollamada / gratis / scalerics.com" + etiqueta 3D "$ 999" que se hamaca |

## Objetos 3D (assets/tres.js)
Oficina vidriada (piso de tablas, vidrios con parantes navy adelante/atrás/izquierda, pared navy3 con biblioratos),
escritorio de madera clara, monitor con la lista de precios (CanvasTexture viva: selección verde, tipeo con cursor,
celda confirmada, "?" rojo apagado), teclado, mouse, carpeta, celular (pantalla "REPORTE · Ventas de la semana"),
mate y termo (`personajes.js`), Rubén = `ELENCO.ruben` (sin parpadeo automático), depósito abajo (racks navy claro con
largueros crema, pallets con cajas kraft y film, fleje verde, zorra hidráulica, columnas). Planilla gigante (celdas con
líneas crema, fila de encabezados A…AX), 999 (tres TextGeometry Lexend 800), perchero + etiquetas $ 99 / $ 100
(extrusión con ojal y números 3D), caja registradora (base con cajón, cuerpo inclinado, 24 teclas, display "$ 99",
manivela), 5 monedas (balística con semilla), sello de goma, placa NO PROBADO, catálogo de pie que se abre, 3
vestidos (percha de madera, Lathe verde con escote V crema, cinto navy, ruedo), riel, etiquetas US$ 34/39/44 con
dorso OFERTA, pilas de cajas 3/4/3, flecha crema, tildes, regalo navy con moño y precio "$ 4.000", etiqueta "$ 999"
del cierre. Sin marcas ni caras de investigadores.

## Sonido
Todo de `assets/sfx` (copiado de por-que-sacar-numero): click-soft, key-press, click, whoosh-cinematic, tac-real, pop,
golpe, tic, ding (campanita de la caja), tic-real (monedas, choque), sello, papel-fuerte, impact-bass-1, whoosh-short,
sparkle, whoosh-cine-corto, vibra, notification, chime, whoosh. Música `assets/bgm/bed.mp3` con sidechain de la voz y
baja en la pausa de "Más caro… y vendió más" (DUCK en armar.mjs). Nada nuevo ni sintetizado. TECHO -31 LUFS por efecto.

## Mezcla (pre-loudnorm, `python3 partes/medir.py` + `python3 partes/medir-fino.py`)
I -17,2 LUFS, pico -4,4 dBFS (el paso 10 lleva a -14 LUFS / -1,5 dBFS). **Tramos de 0,1 s con voz sonando y menos de
6 dB sobre música+SFX: ninguno.** Tramos de 0,5 s marcados: 17,0 (4,0 dB), 20,5 (3,2), 25,5 (0,6): los tres son cola
de palabra + pausa (la voz termina en los primeros 40-160 ms del tramo; RMS de voz -41 a -55 dB). Ajustes: sello 0,2 →
0,05 (pisaba "está"), ding/impact de "vendió más" más bajos y cortos, whoosh del corte a la oficina después de
"redondo.", chime del reporte 0,03 → 0,015, sin el tac del celular dentro de "¿Medimos los tuyos?".

## Pasadas de snapshots (PNG en el scratchpad de la sesión: p1-p8, pasada1-4, v1-v9)
Tiempos: snapshot de 62 cuadros ≈ 63 s; 5-20 cuadros 18-25 s; `check --json` ≈ 27 s (WebGL por SwiftShader anda;
el CLI dice "WebGL unavailable" en el probe pero el canvas renderiza bien).
- Armado (p1-p8): gancho de 2 líneas cortado a los costados → 3 líneas (132/118/150 px); cámara del s01 dentro de la
  cabeza de Rubén → más alta y atrás, Rubén corrido a +0,2; 999 muy chico/cortado → órbita a 3/4 con el primer 9
  adelante; la Catmull-Rom con tangente centrada se pasaba de las claves en los travellings (cuadros vacíos a mitad de
  camino) → tangentes con límite monótono; caja, catálogo y vestidos cortados → cámaras más lejos y vestidos a ±0,68;
  la flecha pisaba el subtítulo → push-in a 34/39 para que entre arriba; s10-s12 mirando la espalda del monitor →
  Rubén girado hacia la cámara, cámara del lado izquierdo del escritorio, termo y carpeta al otro lado (el termo tapaba
  el celular); el texto de las píldoras del celular salía verde sobre verde → navy.
- Pasada 1 (cada 0,5 s): matched cut del 999 cortado → encuadre frontal más abierto; "el primero manda" quedaba
  apuntando a nada al salir → sale antes; cajón con z-fighting (rayas) → frente del cajón 1 cm adelante; flecha
  visible sobre "y vendió más" → se esconde en "y"; mate cortado en s12 → cámara corrida.
- Pasada 2 (cada 0,5 s desde 0,25): travellings con el piso vacío (4,75 / 7,25 / 10,25) → zonas más juntas (2,3 /
  4,7 / 7,0 / 10,6) y objetos que entran antes; OFERTA tocando el precio del regalo → para 12 cm antes; "ganó el
  redondo" pisado por la tilde → texto más angosto; rótulos que duraban menos que su piso de lectura (check craft) →
  "el primero manda" desde "primer", Thomas y Morwitz toda la escena arriba, "1 peso de diferencia" desde "parece",
  "34 y 39 empiezan con 3" → "mismo 3" con dos guías y el giro del 39 0,22 s más tarde, "en regalos".
- Pasada 3 (cada 0,5 s): "A veces" (19,0) casi vacío → la etiqueta OFERTA del riel salta y vuela con la cámara hasta
  el regalo (continuidad); primer 9 cortado a la izquierda en 3,6-4,4 → cámara más atrás (también es el cuadro de la
  portada).
- Pasada 4 (cada 0,5 s desde 0,25) + cuadros sueltos en los cortes (2,73-2,80, 20,70-20,80, 27,85-27,90): tilde del
  regalo sobre el subtítulo → al costado del precio; regalo cortado al subir la cámara → la grúa termina cenital sobre
  la OFERTA acostada (empalma con la grilla del monitor); patas del riel aplastadas visibles antes del vestido →
  ocultas. `check --json`: ok, 0 errores (warnings: estructura #fondo/#capa3d, GL ReadPixels de SwiftShader, canvas
  al borde, crédito Wadhwa 1,29 s vs. piso 1,27 → ya pasa).

## Dudoso / para el revisor
- 10,15-10,30: whip pan de la caja al catálogo, ~0,15 s con la caja saliendo por la izquierda y el catálogo entrando
  por la derecha (el centro es piso de planilla).
- 2,55-2,90 (el corte escondido): el 999 sale de la pantalla y en el corte queda grande y cortado a los costados 0,2 s.
- s01: la cabeza de Rubén (de espaldas, abajo a la izquierda) tapa la columna A ("Aceite x12" se lee a medias); la
  celda del precio se lee siempre.
- 21,1-21,9: la órbita sobre Rubén pasa cerca de su cabeza (1-2 cuadros con la pelada grande en el borde).
- Coins: dos monedas quedan en el borde inferior en 8,5-9,7.
- En el inserto del celular (23,7-25,9) la cara de Rubén queda detrás del teléfono (se ven ojos y manos a los lados).
- "Videollamada" del cierre: la etiqueta 3D tiene una sombra verde oscura a la derecha (sombra sobre el piso invisible).
