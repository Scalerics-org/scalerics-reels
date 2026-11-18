# tienda-tenes-stock · notas del constructor (18-11)

Proyecto con la forma de inmobiliaria-visitas: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html,
index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`, escrita de cero para este reel con la
infraestructura de inmobiliaria-visitas (tarjetas pegadas a la cámara, regla de burbujas, catmull() quieto después de la
última clave, avatares por render target, `fusionar` disponible). `assets/personajes.js` = copia del de
inmobiliaria-visitas (sin cambios). Paola y Mica se arman en tres.js con DEFECTO + los parámetros del plan; Graciela =
ELENCO.clienta; Walter = ELENCO.walter sin corbata.

## Comandos (desde reels/tienda-tenes-stock)
```
LINEAS=partes/lineas-gen.tsv TOMAS="a b c" bash partes/reintentar.sh   # tomas (sin el narrador)
LINEAS=partes/lineas-mica.tsv TOMAS="d e f" bash partes/reintentar.sh  # segunda tanda de Mica 03/06
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-*.json, narrador atempo 1,06)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana; VER=portada
python3 medir.py                          # voz contra resto por tramos (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 15.5 renders/prev/por
   → portada-src/fondo-limpio.png (y después node gen.mjs normal)
```

## Voces (partes/voces.md, partes/procesar.sh)
Paola **Aoede** (cambio del coordinador; Autonoe la usa contable-papeles) · Mica **Zephyr** · Graciela Gacrux · narrador
Rasalgethi = la toma de reels/hacen-envios ("Una tienda online más tarde.", atempo 1,06). g1 y g2 con pasabanda leve de
audio de chat. atempo 1,07-1,08 en g1, pa1, mi1, pa2, g2 (la parte 1 pasaba de 21 s); pa7 atempo 1,1 (3,29 s). Mica 03:
la toma e de una segunda tanda (en a-c el STT oía "el upel"/"ella cae" en vez de "el local"). Callbacks con el MISMO audio:
mi1 en P3 y Q1, pa4 en P8 y Q4b.

## Mundo
Depósito (origen, piso y = 0): hormigón gris cálido; pared de bloque blanco en z = -2,45 con la franja navy "CASA PAO ·
IMPORTADOS" (2,45-3,05 m); la pared de cajas del contenedor en z ≈ -2,15 (15 columnas de 4-5; en el medio casi todas
VERDE · CONT. MARZO, a los costados AZUL y CREMA; InstancedMesh por color, frente con textura); estantería navy3 a la
izquierda. La mesa de fotos en el origen: parte 1 = 8 cajas VERDE (2 × 2 × 2) tapadas por el papel crema "sin fin" (el
frente hasta el piso, `papelFrente` se acorta desde abajo con el rollo en el borde; los costados tapados); parte 2 = mesa
con patas. La freidora de aire (crearFreidora): cuerpo menta #8fc7a0, tapa navy, una perilla crema y un visor verde
(dos perillas se leían como ojos), cajón con la manija crema que sobresale. El aro de luz en (-0,6; -0,4) con el celular
de Paola (funda verde) en el centro (P1-P3), mirando a la freidora. El pilar navy3 con el cuaderno ("STOCK / VERDE: 3 2 1 /
AZUL: ¿? / CREMA: 4", Caveat; el 1 con círculo rojo apagado durante la pausa) en (-1,42; 0,66). La puerta al local en la
pared x = 2,6. Parte 2: la tablet de Paola en su atril sobre dos cajas azules (0,88; 0,18), la impresora de etiquetas en
la mesa, la caja del pedido de Graciela con la etiqueta "ENVÍO · Graciela · Pagado ✓", la pila del contenedor que llega
(3 × 3 VERDE, desde Q4) y la pistola lectora.
Local (x ≈ 2,7-6,5): mostrador crema a lo largo de z con la tapa navy y la tablet ("Caja · Local"), el estante con las
tres freidoras, la vidriera con la cortina navy a medio subir.
Living de Graciela (x = 60): sillón navy2, manta tejida crema, mesita de madera clara con la taza navy, ventana con la
cortina crema, el cuadro de líneas.

Planos: P1 cuadro 0 (Paola en el aro, la freidora, la pared de cajas; push-in) · P2 el cuaderno en primer término y
Paola detrás (gira el cuerpo hacia él) · P3 general: "Pagado ✓", Mica entra, levanta la verde y se va · P4 Paola con el
celular al pecho ("Reintegro") · P5 inserto del chat (Paola oculta) · P5b el hueco iluminado con "Vendida dos veces" /
"Venta perdida: $ 4.990" · P6 plano bajo: Mica agachada sube el papel, las 8 cajas VERDE · P7 Paola de frente, cara de
nada · P7b travelling por la pared de cajas verdes con "40 verdes sin cargar" / "$ 199.600 parados desde marzo" · P8
Paola levanta el celular · P8b contraplano: la cámara es el celular (marco de historia genérico) · cartel · Q1 el local
(Mica le da la caja a Walter, rótulo "Venta en el local · Verde −1" con guía a la tablet) · Q1b Paola fotografía la
crema · Q1i el catálogo (Quedan 2 → Queda 1) · Q2 Graciela en el sillón · Q2i Comprar → envío → Pagar → Pagado → Sin
stock + "Avisarme cuando vuelva" · Q3 la tablet (Pedido #214, Listo para despachar ✓) · Q3b la etiqueta va de la
impresora a la caja (Mica) · Q3c por mayor (Azul 25 → 15) · Q4 Mica lee las cajas con la pistola · Q4t la tablet
(Verde: 0 → 40, Quedan 40, "Les avisamos a 12 que esperaban") · Q4b Paola levanta el celular (mismo encuadre que P8) ·
Q4c contraplano: 12 "Pedido pagado ✓" (4 a la vez) y "Quedan 40 → 28" · Q4d "Ya se enteraron." · Q5 contraplano de
la historia + "Comentá STOCK" (HTML) y la línea chica.

## Duración y mezcla
43,73 s (1312 cuadros). Parte 1 0-19,61 · cartel 19,61-22,32 · parte 2 22,32-43,73 = 21,41 s (49 %); cierre (Q5)
39,91-43,73, línea chica desde 41,68 (2,05 s). Mezcla: voz ≥ +7,1 LU sobre el resto en todos los tramos de 0,5 s
(medir.py); -14,0 LUFS. SFX de assets/sfx; traídos de otros reels del repo: scan.mp3 (caso-pedidosya), flash.mp3
(cita-a-ciegas), papel-fuerte.mp3 (por-que-caminar-mas), rasgado.wav (como-viene-el-mes), k-bolsa (corralon-portland),
blip.mp3, glitch-1.mp3, beep.mp3, tecleo.mp3, chime.mp3, naipe.mp3.

## Pasada propia (prev.mjs y snapshots del compuesto cada 0,5 s en renders/snap/s1-s3)
- Freidora con dos perillas parecía una cara → una perilla + visor.
- Primeros planos a 1 m metían la cámara en la cabeza (cabezas grandes): P4/P7/P8 a 2,3-3,2 m; inserto del celular
  atravesaba la cabeza de Paola → Paola (y Graciela) ocultas en los insertos; el aro también.
- El aro tapaba la cara de Paola desde cualquier cámara de frente → aro y Paola atrás a la izquierda, aro más bajo,
  cámaras de P1/P5b más altas.
- El cuaderno quedaba fuera de cuadro → el pilar pasó a la izquierda, de frente a la cámara de P2.
- Mica cortada y con la burbuja sin ella en P3 → plano general más abierto y salida más lenta; en Q1 Mica y Walter
  giraban la cabeza al revés; Q3b le veíamos la nuca → cámara desde la izquierda; Q4 la pistola al brazo estirado y Mica
  oculta en el inserto de la tablet.
- Contraplanos: puños gigantes abajo → manos bajas y cámara a 1,1-1,25 m de la cara.
- Notificaciones tapaban la cara → 4 a la vez; rótulos de P7b separados; el texto del cartel se va antes del iris.

## Flojo / para los revisores
- P1: el aro queda delante del pecho de Paola (se le ve la cara); la freidora al borde derecho.
- P2: el cuaderno entra justo; "VERDE: 3 2 1" chico (≈ 110 px el renglón).
- P4/P7: el aro asoma cortado en el borde derecho en algunos cuadros.
- Q3/Q3c/Q4t: abajo asoma, cortado, el frente de la caja que sostiene la tablet ("FREIDORA").
- Mica agachada (P6) usa `sentado` parcial: piernas algo rígidas.
- Las manos "rezando" en la pose de selfie (P8, Q4b, Q4d): el celular queda chico entre las manos.
- Parte 2 al 49 % (no 50).
- portada.png sin armar: `herramientas/portada.mjs` lee el mp4 de origin/reel/tienda-tenes-stock (va con el commit de la entrega); el fondo limpio ya está en portada-src/fondo-limpio.png.

## Render de revisión (18-11)
Captura 14 min 51 s (SwiftShader, 2 workers; 30,5 min de reloj con la espera del candado); paso 10 65 s. Final 43,8 s, -14,1 LUFS, pico -4,7 dBFS. `check --json` 0 errores (avisos de craft como en inmobiliaria-visitas).

## Ronda 1 de revisión (18-11, sobre tienda-arte, tienda-sonido, tienda-guion)
**42,2 s (1266 cuadros).** Parte 1 0-18,62 · cartel 18,62-21,07 (2,45 s, narrador atempo 1,1) · parte 2 21,07-42,2 =
21,13 s (50,1 %); cierre 38,29-42,2. Voz ≥ +9,1 LU sobre el resto en todos los tramos; LRA de la mezcla 4,4 (era 18,7).
`check --json` 0 errores. No se llegó a 39-40 s: la parte 1 son 15,7 s de voz sola; para bajar de 42 con la parte 2 > 50 %
habría que cortar parlamentos.
- Arte: Q3b (la etiqueta, el brazo de Mica en la cara) eliminado; Graciela con pantalón navy3 y una manta tejida sobre la
  falda hasta el piso; burbujas de P2/P4 con `hablar` (cola a la coronilla); Mica agachada con el torso casi derecho (sin
  cuello largo) y cámara de P6 más alta y abierta; celulares más grandes (×1,55), funda crema (Paola) y navy3 (Graciela),
  la pantalla girada hacia la cámara; el aro detrás del hombro derecho de Paola (-0,72; -1,0), ella no lo toca ni lo
  atraviesa, en P1 mira la freidora; freidora nueva (torno tipo huevo cortado, cúpula navy con perilla grande arriba,
  canasto curvo con manija larga saliente; ícono del catálogo igual); el chip "Llegó el contenedor." se va antes del
  inserto; tablet con textos ≥ 60 px de lienzo y el pedido + por mayor juntos; botón "Pagar / con crédito o débito";
  notificaciones de a 3, más arriba; la burbuja de "Ya se enteraron." entra con el corte; letrero del local entero;
  línea chica final sin pisar la tarjeta (sale de abajo con fundido); cierre con la cabeza entera bajo la barra;
  sin el inserto del chat (P5); Paola con el rodete hacia atrás (sin casquete); IMPORTADORAS a 120 px.
- Sonido: línea nueva de Mica (14-mica-g, Zephyr) "¡Diez azules para el Bazar!" sobre la tablet; tomas nuevas: mi1
  03-mica-g (sin la "y" de más), mi2 06-mica-g (el STT oye "¿Y estas cajas?"), pa7 atempo 1,04 (oye "importadora"), g2
  atempo 1,04 con el hueco de 0,3 s; blip.mp3 → k-tick-2 (Kenney), flash.mp3 → k-switch-3 (Kenney); rótulos después de
  "lado." con 0,4 s de aire; papel y golpe +0,15-0,2 s; la música en las pausas al 40-50 %; créditos completos en
  fuentes.md; Q2i a 0,35 s por paso, 3 lecturas del lector.
- Guion: en la parte 1 la pared tiene 28 verdes de espaldas (kraft, "v · marzo" chico a mano) y el rótulo grande solo en
  las 8 de abajo del papel; en la parte 2 la pared es azul/crema y las que llegan dicen "CONT. NOVIEMBRE"; 36 verdes
  ($ 179.640 sin vender desde marzo; Verde 0 → 36; Quedan 36 → 24); cuaderno "VERDE:" / "3 2 1" con tachado rojo grueso
  y el 1 en círculo; "Venta a Graciela: perdida"; "Ve el stock, paga / y elige el envío."; descripcion.txt líneas 2 y 3.
- Mezcla (aviso del coordinador): en gen.mjs la ganancia a -14 LUFS va ANTES del limitador (alimiter limit=0,675 ≈
  -3,4 dBFS) y se itera hasta ±0,2 LU; nada se suma después. mezcla.wav: -14,0 LUFS, pico -4,6 dBTP, flat factor 0,
  LRA 4,1. medir.py ya no suma +6 dB.
- Render r1: captura 14 min 12 s (860 s). El mp4 del render se remuxó con la mezcla corregida (video copy) y el paso 10
  usó loudnorm en DOS pasadas, lineal:
  ```
  ffmpeg -i renders/tienda-tenes-stock.mp4 -i assets/audio/mezcla.wav -map 0:v -map 1:a -c:v copy -c:a pcm_s16le -shortest renders/tts-remux.mov
  ffmpeg -i renders/tts-remux.mov -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null -      # 1ª pasada → renders/loudnorm1.json
  ffmpeg -y -i renders/tts-remux.mov -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart \
    -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=<input_i>:measured_TP=<input_tp>:measured_LRA=<input_lra>:measured_thresh=<input_thresh>:offset=<target_offset>:linear=true" \
    -ar 48000 -c:a aac -b:a 192k renders/tienda-tenes-stock-final.mp4
  ```
  normalization_type "linear"; final -14,0 LUFS, pico -4,7 dBFS; final menos crudo por tramos: ±0,1 LU (parejo). 42,2 s.
- Portada: fondo limpio nuevo (Paola con el celular, el papel arriba y las 8 cajas VERDE a la vista abajo a la derecha);
  portada.png armada con herramientas/portada.mjs (mp4 local).

## Ronda 2 de revisión (18-11)
**42,4 s.** Parte 1 0-18,77 · cartel 18,77-21,22 · parte 2 21,22-42,4 = 21,18 s (50 %); cierre 38,57-42,4 (3,8 s: pa7
dura 3,49 s, no entra en ≤ 3,3 sin acelerarla de nuevo). `check --json` 0 errores. Mezcla -14 LUFS, pico -4,8 dBTP, LRA
4,3; voz ≥ +11 LU sobre el resto en los tramos con voz real (medir.py marca 32,5 s: es la cola del ventaneo de 400 ms de
"¡Diez azules…", que terminó en 32,15, contra la música).
- Q1: la caja cruza el mostrador alta y baja al pecho de Walter del otro lado; Walter más atrás (x 5,38) la agarra de los
  costados con los codos afuera y abajo (nada sube a la cara); cámara más abierta.
- P6: un solo plano; Mica parada e inclinada (sin cuclillas) sube el papel desde la rodilla (en el corte el papel ya está
  a 0,32 m: el que mira ve las cajas aparecer igual); cuello más alto (cuelloAlto 0,1). Mirado a tamaño completo.
- P4: burbuja de Paola con la cola fija a la boca; "Reintegro" y "Ay. Bueno…" no se enciman (la de Graciela abajo, con la
  cola al celular). P3: el celular ya en la mano (la guía de "Pagado" llega al celular), plano más abierto (Paola entera).
- P7b: la pared del medio con VERDE · CONT. MARZO de frente (sin cremas) y el recorrido sin rozar el aro.
- Cierre: la tarjeta bajo el mentón (y 1190), la línea chica en 1610, la historia sin botón de grabar; Q5 arranca sobre el
  final de "Ya se enteraron.".
- IMPORTADORAS 104 px con 44 px de margen. Letrero del depósito en una placa de 3,4 m (se lee entero en el general);
  letrero del local a la derecha (fuera del chip). Manta de Graciela verde menta tejida. Cajas lisas bajo la tablet.
- Notificaciones "Pedido pagado" (sin tilde doble), debajo del encabezado; tablet con "Pagado ✓" adentro de la píldora;
  en Q4t el contador sube 0 → 36 en pantalla y la pistola no flota.
- Selfie: el celular más arriba (se ve la funda, no el canto).
- Sonido: lector con k-pep (Kenney); cama con zumbido.wav (gchase) en vez de zumbido-largo; calle más alta en la parte 2;
  pizzicato desde 5,85 y casi sin duck en la parte 2; los toques de Q2i en el cambio de pantalla (sin el de envío) y el
  ding en "Pagado"; "Pagado ✓" del P3 0,15-0,28 s después de "Hoy te la mando."; golpe de las cajas 0,1 s antes del fin.
- Portada: fondo limpio nuevo (Paola a la derecha, entera; a la izquierda la mesa con las 8 cajas VERDE y la pared; el
  sello arriba a la izquierda sobre la pared), "separacion" 34 px entre la chica y la grande.
- No hecho: el "Pao" de g1/mi2 que el STT no oye (en la forma de onda está); el pelo de Paola sigue siendo rodete
  (rodeteAtras 0,42; cambiar el peinado del personaje a esta altura arriesga más de lo que arregla).
- Render r2: captura 13 min 21 s (809 s); remux con assets/audio/mezcla.wav y paso 10 con loudnorm lineal en dos pasadas (ver ronda 1): normalization_type "linear", final -13,9 LUFS, pico -4,8 dBFS, final menos crudo ±0,1 LU, 42,4 s.
