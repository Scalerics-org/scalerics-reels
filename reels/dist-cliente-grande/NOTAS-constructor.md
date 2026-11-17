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
