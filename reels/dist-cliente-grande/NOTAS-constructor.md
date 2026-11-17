# dist-cliente-grande · notas del constructor (17-11)

Proyecto como veterinaria-vacunas / dist-pedidos-lunes: todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (se editó
directo): oficina vidriada y depósito de dist-pedidos-lunes (de tarde: sol bajo y cálido por la persiana), zona de armado
nueva, vereda del Súper Héctor nueva, el auto de ya-lo-cargo, tarjetas / rótulos / regla de burbujas de veterinaria.
`assets/personajes.js` = el de veterinaria-vacunas (con sus arreglos de lentes, boca y ojo lejano). Rubén = ELENCO.ruben
(con la herradura de pelo de dist-pedidos-lunes), Nico = ELENCO.empleado, Héctor = ELENCO.hector con `lentesCerca: 1,05`
y una campera crema abierta larga como guardapolvo de dueño de súper, Darío el operario y el chofer (DEFECTO gris, gorra
gris) sin voz. El contador es solo voz (Algieba, filtro de altavoz) y burbuja con un parlante dibujado.

**Duración: 39,13 s.** Parte 1 0-17,34 · cartel 17,34-19,64 · parte 2 19,64-39,13 = 19,49 s (50 %); cierre (Rubén a
cámara) 35,39-39,13 (3,74 s), "Comentá CLIENTES" desde 35,99, línea chica desde 36,83. Mezcla: voz ≥ +7,7 LU sobre
música + SFX en todos los tramos de 0,5 s, -14,0 LUFS, pico -5,5 dBFS (final: -14,0 LUFS, pico -4,9). `check --json`:
0 errores (warnings: dead_stretch de cámara, canvas anidado, GPU stall de SwiftShader, líneas del cartel).

## Comandos (desde reels/dist-cliente-grande)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-r3.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana
python3 medir.py                          # voz contra resto por tramos (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D
```

## Voces (partes/procesar.sh, partes/voces.md)
c1 01-contador-b (altavoz) · r1 02-ruben-b (atempo 1,06) · c2 03-contador-b · n1 04-nico-a · h1 05-hector-b (1,1) ·
r2 06-ruben-c (pausita de 0,1 s antes de "el contador", atempo 1,08) · h2 07-hector-a · narrador 08-narrador-b (2,04 s:
el cartel dice "Un aviso automático más tarde…", sin fallback) · n2 09-nico-a (1,14) · h3 10-hector-a (1,06) · c3
11-contador-b · r3 12-ruben-c (1,05). c1 y r1 se reusan idénticos en Q4. "oyó:" igual al texto en todas (el STT no oye
el "¡Uh!" de h3 en ninguna toma).

## Mundo
Oficina (piso y = 3,2): Rubén sentado en (0; 1,02) mirando a +z; monitor a su derecha en (-0,95; 1,45) girado 0,6; el
teléfono en altavoz en (-0,22; 2,45) (pantallita "CONTADOR" y led verde que titila con la envolvente de la voz del
contador); puerta de vidrio detrás a su izquierda (Nico). Zona de armado en z = -5: GRACIELA (-3,05), MARTA (-1,25),
WALTER (0,55, a medio armar), HÉCTOR (2,35): el rincón de Darío (reposera, radio, cajón con termo y táper, planta en
lata) en la parte 1, el pallet que se llena por capas en Q3. Vereda en x = 60: fachada z = -3, vereda de baldosas de 9
panes, camión gris (furgón sin texto) con la cola en x = 58,75, auto de Nico detrás (x = 62,95). Q1: el mismo auto en el
carril a x = 36, el semáforo en rojo apagado.

Planos: P1 cuadro 0 · P2 grúa al lugar de Héctor (rótulos) · P3 Nico en la puerta · P4 vereda general · P4b Héctor ·
P5 por encima del hombro de Héctor (Rubén mira el camión) · P6 primer plano de Rubén · P7 Héctor con la caja · P7b el
post-it en el tablero · P7c el auto arranca, el post-it vuela y queda en la puerta del camión gris · Q1 push-in al
celular del soporte (aviso → Llamar → llamada) · Q2 Héctor en la puerta · Q2i Pedido ✓ · Q3 el pallet vuelve · Q3b la
ficha · Q4 = P1 con el panel · Q4b el panel y "Compra." · C Rubén a cámara.

## Pasadas
- Armado (prev.mjs, renders/prev/a-h): P1 rehecho varias veces (monitor cortado o tapando la cara, franja vacía del
  frente del escritorio) → monitor más a la izquierda y más chico, teléfono adelante al centro, cámara más cerca;
  Nico de espaldas en P3 (giro); P4/P4b/P5/P7 con la cámara adentro de la cabeza de Héctor o con la nuca de Rubén en
  primer plano → posiciones nuevas (Rubén y Héctor más separados) y P4b solo sobre Héctor, P5 por encima del hombro
  desde la vereda; la mano de Héctor entraba en la cabeza de Rubén (sacada: palmas abiertas); la caja le tapaba la boca
  (más baja); el post-it se leía al revés y quedaba cortado (rotación y cámara); celular "en la oreja" → en altavoz
  delante del pecho (regla de la-lista); las burbujas no se veían (faltaba camera.layers.enable(1)); rótulos de P2
  tapando a Darío → cámara corrida (Darío a la derecha, rótulos a la izquierda); "Compra." tapando el panel → arriba.
- Pasada 1 (hyperframes snapshot + MP4 renderizado cada 0,5 s, renders/qa1): Héctor cortado con media cabeza de Rubén
  en el borde (P4b) → mira más a la izquierda; el chip "Miércoles, 8:10." duraba 0,5 s y pisaba el rótulo → queda hasta
  la voz de Nico, rótulo debajo y el inserto un poco más chico; Rubén cortado en el borde izquierdo en P3 → cámara más
  abierta; parpadeo de Rubén mientras habla en el cierre (sacado); la palmada en la frente de Héctor más corta (la mano
  pasaba por delante de los lentes); la radio y la planta quedaban flotando (se ponían antes de posar a Darío); la
  reposera plegada atravesaba el pallet nuevo (se va cuando entra el pallet); la boca de Rubén tapada por la tarjeta
  CLIENTES (tarjeta 50 px más abajo y cámara más baja).

## Render
`hyperframes render --workers 2`: 807 s (13,5 min, SwiftShader; el lock lo tuvo antes el render de pilates-cuota);
re-codificación del paso 10: 67 s. renders/dist-cliente-grande-final.mp4.
- Pasada 2 (MP4 final, cada 0,5 s desfasada 0,25 s, renders/qa2/h1.png, y cuadro por cuadro ±1 cuadro en los 16 cortes,
  renders/qa2/cortes.png): sin defectos nuevos de gravedad alta. Quedan anotados abajo como flojos (no se tocaron para que
  el MP4 siga igual a la fuente).
- Render 2: 708 s; re-codificación 67 s. Final 39,2 s, -14,0 LUFS, pico -4,9 dBFS.

## Portada
Fondo LIMPIO de P4b (10,15 s: Héctor de frente con los brazos abiertos, la boina, los lentes y el guardapolvo crema),
recortado 420 px de arriba con navy abajo (portada-src/fondo-limpio-10.15.png). chica "Tres meses sin pedir.", grande
"¿Cerraste, Rubén?", sello DISTRIBUIDORAS (sobre la boina, no tapa los ojos).

## Flojo / para los revisores
- P7b (16,01-16,15): los primeros cuadros del inserto son tablero navy y el camión por el parabrisas, el post-it entra
  cayendo desde arriba un instante después.
- P3 (8,2-8,7): Rubén gira la silla hacia Nico y se le ve la nuca con la herradura de pelo.
- Q3: la reposera se pliega detrás de Darío y se ve poco; Darío se va con la radio y la planta por el borde derecho.
- P4 (8,7-10,0) es un plano general: los personajes chicos (la burbuja "¡Rubén! ¿Cerraste?" se lee igual).
- El panel de Q4 (plano del cuadro 0) tiene letras de ~25 px: se lee bien recién en Q4b.
- En P1 y Q4 la burbuja del contador queda en pantalla mientras habla Rubén (las dos a la vez).
- Duración 39,1 s (más que los 36,4 del plan): las tomas de Héctor (3,08 s) y "Te extrañó el contador." (1,7 s) son más
  largas; la solución sigue siendo el 50 %.

## Ronda 1 (17-11, sobre renders/qa-arte-r1, qa-sonido-r1, qa-guion-r1)
**Duración 37,27 s** (era 39,13). Parte 1 0-17,37 · cartel 17,37-19,52 · parte 2 19,52-37,27 = 17,75 s (48 %); cierre
33,86-37,27, tarjeta CLIENTES 34,41-37,27 (2,86 s). Voces más rápidas sin cambiar tomas: h1 atempo 1,16, n2 1,18, h3 1,14,
r3 1,1 ("oyó:" igual). Pausa antes de "Compraba." y de "Compra." 0,55 s. Mezcla: voz ≥ +12,9 LU sobre el resto con la
cama más presente (duck 0,5 → 0,32), -14,0 LUFS.
- A1 lentes de Héctor: aros cerrados de 360° 4,5 cm delante de la cara, sin patillas, puente nuevo por encima de la nariz.
- A2 post-it: P7b la mano de Nico (manga verde) lo baja y lo pega con el pulgar, se lee entero; P7c la cámara al lado del
  auto: el post-it sale por la ventanilla del acompañante dando vueltas, la cámara lo sigue por la vereda y termina de
  frente a la puerta del camión gris (el post-it ~45 % del ancho, "HÉCTOR / MARTES" de ~100 px); sin sombra (la mancha).
- A3 el salto de 29,53 (Q3b): plano rehecho (cámara fija desde el primer cuadro, sin las lámparas del depósito).
- A4 cierre: el mate ya está en el escritorio y la mano descansa al lado (no lo atraviesa).
- A5 Héctor en la llamada: celular navy con pantalla en la oreja izquierda (la que ve la cámara), la mano debajo, sin la
  palmada, ojos abiertos, sin parpadeo mientras habla; cámara centrada en la cara.
- M bigote de Rubén: se esconde cuando la cámara le ve la nuca. Mano de Héctor: baja las manos antes de la pausa. Dedo de
  "Llamar": mano nueva (índice, nudillos, pulgar, manga verde) y Nico oculto en el inserto. Vereda: cartel "SÚPER
  HÉCTOR" más angosto y más alto (entra entero), cámara más cerca, camión gris corrido a la izquierda, zorra entre el
  camión y la puerta, burbuja debajo del cartel; P5b nuevo: contraplano del camión gris descargando y el chofer cerrando
  las puertas. Panel: Q4 arranca con el panel en grande (contador 4 → 0 y "Rubén, ¿y Héctor?"), Q4r el encuadre del
  cuadro 0 para "¿Héctor? Compra…", Q4b el panel en grande con "Compra."; letras del panel ≥ 46 px. Guía del rótulo
  rojo al borde pintado del lugar. Cartel HÉCTOR · MARTES entero en P2. P6 sin Nico detrás y con los ojos más abiertos.
  Línea chica del cierre más arriba y más chica (no pisa la cabeza).
- B cuadro 0 más abierto (monitor entero con "Súper Héctor" y el mate en cuadro); rótulo del aviso sobre el celular sin
  pisarlo; "Pedido" con una sola tilde; una sola burbuja a la vez en P1; descripcion.txt "a la mañana siguiente".
- Sonido: notificación + whoosh + pop cuando entra el aviso en grande (20,1); whoosh de la grúa al techo y la radio desde
  el arranque de la grúa (sin hueco en 4,5); "tuu" de llamada (k-tono más largo y grave) entre Llamar y la voz; crujido
  de silla en el giro de Rubén; pasos de Darío; whoosh en el corte a Q3; motor, hoja y el pop del post-it al techo.
- Render ronda 1: 694 s y 605 s (el segundo por el post-it en vuelo, que ahora mira a cámara, gira y crece un poco a mitad
  del vuelo); re-codificación ~65 s. Final 37,3 s, -14,0 LUFS, pico -4,9 dBFS. Revisado cuadro a cuadro (±1 cuadro) en
  23 cortes y zonas tocadas (renders/qa3/cortes.png) y cada 0,5 s (renders/qa3/h1.png): sin defectos nuevos.
- Portada nueva (lentes arreglados): fondo LIMPIO de 10,3 s (Héctor con las palmas abiertas), recortado 360 px de arriba.
- Pendiente/flojo: la mano de Nico en P7b es una manopla con dedos de salchicha y tapa un poco la H al bajar; en el
  plano general de la vereda (P4) los personajes siguen chicos (para que entren el cartel entero y la zorra) y el camión
  se ve solo de costado en el borde; el panel en el encuadre del cuadro 0 (Q4r) sigue chico (el contador se ve en Q4/Q4b,
  en grande).

## Ronda 2 (17-11, sobre renders/qa-arte-r2 y qa-sg-r2)
**Duración 37,73 s.** Parte 1 0-17,67 (+0,3 s del post-it pegado en el camión) · cartel 17,67-20,07 (2,4 s: "más tarde…"
entero ~0,6 s antes del iris, entra en 0,8 s) · parte 2 20,07-37,73 (47 %). Mezcla: duck 0,55 bajo la voz y la cama
+3 dB; voz ≥ +13,1 LU sobre el resto en todos los tramos; -14,0 LUFS.
- A1 cuadro suelto de 5,367 y franja navy 4,83-5,23: era el piso del balcón (la cámara bajaba a través de él y terminaba
  debajo). La grúa termina fuera del balcón (z -1,3) y el piso del balcón se esconde con la baranda mientras cruza.
- A2 celular de Héctor: en altavoz delante de la cara, a su izquierda, cuerpo navy de 9 × 17,5 cm con la pantalla
  encendida ("En llamada · Nico · Distribuidora"), siempre girado hacia la cámara, agarrado por la mano izquierda.
- M lentes: aros a 2,8 cm de la cara (radio 8,4 cm), el de atrás ya no sale de la silueta en 3/4; Héctor gira 0,3 rad
  hacia la cámara en P4b. Chaleco 6 % más angosto (no asoma por el guardapolvo) y sin cuello de camisa (el borde
  serruchado era la camisa contra el cuello del guardapolvo).
- M post-it: el brazo (manga verde larga) entra desde el borde; el inserto muestra el parabrisas y el camión por delante,
  el post-it más al centro del tablero; en P7c no se ve hasta que sale por la ventanilla (antes nacía en la cara de
  Nico); al final la cámara se abre a la cola del furgón (puertas, manijas, chasis) con el post-it pegado, 0,3 s más.
- M guía de "12 martes": a la esquina izquierda del lugar pintado (no cruza a Darío ni la reposera); la de arriba al
  borde del cartel. Rótulos más angostos; el plano de llegada más abierto (cartel HÉCTOR · MARTES entero).
- M chofer sin visera y centrado en P5b. Q1 arranca más cerca del celular (menos techo y sin el brazo de Nico).
- B burbuja "Dejé de pedir…" cambia en "Dejé" (10,0); "Sin pedir" verde al llegar a 0; panel: "Llamado…" 56 px y "que
  no se fueron" 58 px; "AUTOSERVICIO" 66 px; "$ 0" más chico en la facturación (no se pega al $ 114.000); el teléfono no
  aparece en los insertos del monitor (era la masa navy); el mate entra en el cierre; la línea CRM bajó a y 222 y la
  cámara del cierre baja la cara para no tocarla.
- Sonido: la radio de Darío a -34 sin fundido desde la grúa + whoosh de aterrizaje (sin agujero en 4,8-5,6); puertas del
  camión más fuertes; roce de tela después del ding de "Pedido" (sin bajón en 27,1).
- No hecho: el plano general de la vereda sigue con los personajes chicos (para que entren el cartel y la zorra); la
  boina de Héctor tapa en parte un ojo de Rubén en P5 (plano por encima del hombro); la astilla del toldo y las franjas
  oscuras de techo/escritorio en la oficina; la pantalla de llamada de Q1 sigue 3,2 s (la marca la voz de Nico).
- Render ronda 2: 581 s; re-codificación ~65 s. Final 37,73 s, -14,0 LUFS, pico -5,1 dBFS. Pasada de diferencia entre
  cuadros consecutivos en los 1133 cuadros (busca saltos de ida y vuelta de un cuadro): ninguno. Cuadros de las zonas
  tocadas en renders/qa4/z.png. Portada nueva: fondo LIMPIO de 10,3 s con Héctor de frente (lentes y chaleco bien).
- Flojo: al arrancar Q1 (20,0-20,3) el antebrazo de Nico entra grande abajo a la izquierda antes del push-in.
