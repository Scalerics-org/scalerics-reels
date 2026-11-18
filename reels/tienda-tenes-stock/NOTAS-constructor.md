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
