# pizzeria-pedidos · notas del constructor (25-11)

Proyecto copiado de `reels/vete-racion` (gen.mjs, medir.py, snap.sh, prev.mjs, partes/*.sh, personajes.js), con la
escena 3D nueva. **La escena 3D está partida en `assets/src/*.js`; `node gen.mjs` las concatena en `assets/tres.js`
(no editar tres.js).** Partes: `00-base` (render, tarjetas pegadas a la cámara, de vete-racion), `10-objetos` (la muzza
con aceitunas y fainá, la caja con tapa, la comanda, la birome, el gancho, la masa que se estira, el horno de dos bocas,
el casco con visera, la mochila, la moto, la impresora con el ticket, el riel), `20-sets` (las dos pizzerías = el mismo
módulo, la de Lucía girada 180° del otro lado de la calle; la calle con la senda peatonal; el living y la puerta de
Martín), `30-personajes` (Tano, Facu, Lucía, Sabri, Martín y lo que llevan), `40-interfaz` (chat de Don Tano, el
celular de Martín con menú / dirección con mapa / pago, la notificación, el tablero, el panel, insertos, globos, chips,
rótulos), `50-escena` (lugares, PLANOS, la grúa de Q1, poses, objetos en el tiempo, tarjetas, render).
Personajes nuevos en `assets/personajes.js` (ELENCO.tano, lucia, martin, facu, sabri).

## Comandos (desde reels/pizzeria-pedidos)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv); LINEAS=partes/lineas-re.tsv para retomas
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (ver partes/voces.md)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana ni burbujas
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x ["px,py,pz,mx,my,mz,fov"]   # solo la capa 3D (FULL=1 a 1080)
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/pizzeria-pedidos.mp4
bash paso10.sh                            # loudnorm en dos pasadas, lineal → renders/pizzeria-pedidos-final.mp4
```
OJO: después de `LIMPIO=1 node gen.mjs` (fondo de la portada) volver a correr `SINAUDIO=1 node gen.mjs`.

## Duración y tramos: 44,9 s
Parte 1 (Don Tano) 0-18,09 · cartel 18,09-20,69 · parte 2 (Lucía) 20,69-41,32 · cierre 41,32-44,9 (3,6 s).
Solución + cierre = 24,2 s (54 %). Más largo que los 40,4 del plan (12 voces; ya con atempo 1,08-1,22 y beats apretados).
Beats principales: P1 0 · P1i (comanda) 3,2 · P1b 4,15 · P2 (chat) 5,25 · P2b 7,05 · P3 (22:10, entra Facu) 8,4 · P3b
10,7 · P3i 11,2 · P3c (pausa, rótulos) 11,9 · P4 "Cenamos." 12,95 · P4b porción 14,4 · P4i "¿Y mi pizza?" 15,25 · P4c
"¡Ya sale!" boca llena 15,95 · Q1 grúa 20,69 · Q2 living 23,1 · Q2i menú 24,4 · Q2b "¿Ya está?" 27,8 · Q3 impresora
28,7 · Q3b 29,6 · Q3t tablero 30,5 · Q3s Sabri 31,4 · Q4 puerta 32,2 · Q4b caja 34,5 · Q4i notificación 35,35 · Q4c
muerde 36,05 (mordida 37,0) · Q5 panel 37,5 · Q5b "¿Y esa cómo hace?" 39,5 · C 41,32 ("MENÚ" a 41,87).

## Estado
- `check --json`: 0 errores en todas las categorías (avisos: "nada cambia" de la capa HTML, que no ve el canvas 3D).
- Mezcla (MEDIR=1 + medir.py): voz ≥ +6,5 LU sobre el resto en todos los tramos de 0,5 s con voz; mezcla.wav -14,0
  LUFS, pico -5,2 dBFS. TECHO -31 por efecto (motor de vete-racion).
- Voces: ver `partes/voces.md` (tomas elegidas y "oyó:"). Martín "¿Ya está?" necesitó 6 tomas.
- SFX nuevos reales CC0 de BigSoundBank con crédito en `fuentes.md` (impresora de calculadora, caja de cartón, moto que
  arranca y que acelera, extractor de cocina).

## Pasadas propias (prev de la capa 3D + snapshots completos s1 cada 0,75 s y s2 en los cortes)
- Mostrador a 0,8 m (a 1,0 tapaba a Tano hasta los hombros: los personajes miden ~1,7 con cabeza grande) y 15 cm más
  adentro; cámara del cuadro 0 a 1,62 m: Tano entero debajo del chip, la comanda y el bollo en primer término.
- Celular en el hombro: pegado a la cabeza a la altura de la oreja, cabeza ladeada -0,38, funda gris claro y 1,25× (navy
  no se veía contra la remera). Sigue chico: se lee de canto.
- Globos del cuadro 0: "Una muzza y dos fainá…" se va cuando entra el teléfono; "¡Duvimioso Terra!" y "¡Con V corta!"
  con borde punteado salen del celular; "Ajá. ¿Con be larga?" a la izquierda con la cola a la boca (antes la cola subía
  al chip DON TANO).
- Casco: la cáscara cortada más arriba (la visera tapaba los ojos de Facu y de Sabri), mentonera y borde en arcos
  horizontales, visera levantada a -1,25.
- P3/P3c/P4/P4c: cámaras rehechas (la del contraplano quedaba adentro de la cabeza de Facu); Facu más a la derecha;
  la caja más adelante y la tapa abre a 123°.
- La masa: bollo arriba del mostrador (estaba adentro) y en P2b cuelga de la mano levantada.
- Ticket #47: el truco de UV lo dejaba en la franja navy (se veía negro) → índices fijos; material básico.
- Q1: la grúa iba de la fachada de Don Tano a la de Lucía girando de costado (medio segundo de calle navy vacía) → ahora
  sube a vista cenital (la senda peatonal crema, las dos motos), gira 180° en el aire y baja por la vidriera con el
  vinilo "Pedí online" (orientaciones con slerp, función camQ1).
- Lucía: el disco a la altura del pecho (le tapaba la cara); pañuelo verde como casquete (el aro parecía una aureola).
- Q2b, Q3t, Q4, Q4c, Q5, C: cámaras más abiertas (cortaban caras o la tablet).

## Pendiente / para los revisores
- 44,9 s (plan 40,4): si hay que recortar, los beats están en gen.mjs (T.*).
- El celular en el hombro de Tano se lee poco (de canto, chico).
- P4c: Facu queda cortado a la derecha (se ve la mano con la porción y el casco); P3 empieza 0,3 s con el local vacío
  antes de que entre Facu.
- Q1: el primer cuadro corta "DON TANO · PIZZAS" a la izquierda; la vista cenital es sobria (calle navy + senda).
- Q3s: Sabri mira el celular con la cabeza gacha (el casco tapa parte de la cara); el mapa va como tarjeta a la izquierda.
- Hilo de queso de la porción de Facu: armado pero casi no se ve en P4b.
- Sin extra en la vidriera de Lucía (el cliente esperando del plan) y sin portada (falta el fondo limpio con LIMPIO=1).
- No hay render mp4 (lo hace el coordinador).

## Ronda previa a la revisión (pedido del coordinador, 25-11)
- **Duración 42,4 s** (P1 17,22 · cartel 17,22-19,72 · parte 2 + cierre 19,72-42,4 = 22,7 s, 53 %): beats más
  apretados (insertos, Q1, Q3, Q4c, Q5) y s1/l1 con atempo 1,2/1,17; los remates (pausa antes de "Cenamos.", "mira el
  celular, mira la pizza, muerde") no se tocaron.
- Celular del hombro: 1,6×, gris claro, con la pantalla de llamada (verde/rojo) girada hacia afuera, pegado a la oreja.
- P3: Facu ya entra por la puerta en el primer cuadro (T.entra arranca 0,35 s antes del corte; la cámara arranca mirando
  la puerta y paneando al mostrador).
- P4c: Facu más cerca, girado de 3/4 a cámara mirando a Tano (cara y porción a la vista; queda cortado a la derecha).
- Q1: arranca con "DON TANO · PIZZAS" entero; en la vista cenital Facu cruza la senda en su moto (protagonista).
- Q3s: Sabri con la cabeza más alta y el celular a la altura del pecho; el mapa más chico a la izquierda.
- Hilo de queso más grueso. Cliente esperando sentado en el local de Lucía (Q1, al fondo).
- Portada: fondo limpio LIMPIO=1 a 1,6 s (`portada-src/fondo-limpio-portada.png`) + `herramientas/portada.mjs`.
- **Render de revisión: 1477 s (24,6 min)** → `renders/pizzeria-pedidos.mp4`; `bash paso10.sh` →
  `renders/pizzeria-pedidos-final.mp4` (42,4 s, -14,15 LUFS, pico -6,4 dBFS, lineal). Hoja: `renders/hoja.png`.
- Después del render: la cámara de P4c del render mostraba la nuca de Facu en primer plano; volví a la de la prueba
  (0.45, 1.72, -0.45 → 0.4, 1.18, -2.8, fov 64), que muestra a Tano y a Facu de 3/4. **El mp4 no tiene este cambio.**
- medir.py: mínimo +6,5 LU salvo un tramo de borde en 14,5 s (cola de "Cenamos." a -38,5 contra -39,3 del resto: es la
  ventana de 400 ms que termina después de la voz, no se oye encimado).

## Ronda 1 de corrección (qa-ronda-r1.md) · render r2
**40,6 s.** Parte 1 0-16,64 · cartel 16,64-19,04 · parte 2 19,04-37,6 · cierre 37,6-40,6 (3,0 s; línea chica 1,5 s).
Arte (por número de qa-ronda-r1.md):
- A1/A2 la moto de Sabri sale hacia +x 1,5 s ANTES de Q5b (no entra en cuadro); Sabri no está en Q5b; la moto de Facu
  estacionada frente a la vidriera (x -1,9), lejos de la puerta; Tano sin la caja bajo el brazo; Q5b más cerrado
  (fov 15 → 10,5): sin el toldo cortado.
- A3 / guion 2: el panel muestra solo lo de Lucía (64 pedidos · Pagados online 64 · Con mapa 64 · Volvieron 0 · Sin
  contestar 0) y la fila "#47 · Martín · cliente nuevo ✓ / entregado 22:54" grande (60 px en el lienzo).
- A4 la tarjeta del mapa abajo a la izquierda (no tapa la cara), con pop, texto grande (52/44 px) y la guía al celular
  (1,35×).
- A5 Q4b: Martín levanta la tapa con la derecha; la tapa abre a ~105° (sin LUCÍA espejado). La pizza es la misma muzza.
- A6 la caja de Facu tiene orientación fija en el mundo (no gira 90° al apoyarla).
- A7/A8 P1 sin P1b: "Ajá. ¿Con be larga?" a la izquierda y "¡Con V corta!" a la derecha, entre el chip y la cabeza
  (cámara del cuadro 0 mirando más alto); sin el globo "Ajá." cortado arriba del inserto.
- A9 el celular más adelante (0,36/0,14/0,12 en la cabeza), 1,6×, se ve entre oreja y hombro; la birome 1,5×.
- A10 sin la birome dibujada en el inserto (era el garabato sobre las letras).
- A11 mentonera más fina, visera a -0,95. A12 vapor más chico y más transparente (0,55); el hilo de queso afuera.
- A13 / guion 4: la grúa termina en la fachada de Lucía con "LUCÍA · PIZZAS" entero y el vinilo "Pedí online"; arriba
  Facu cruza la senda en su moto. A14 plano nuevo Q1b adentro: Lucía con el disco de frente, la impresora larga dos
  tickets y el rótulo apunta a la impresora; el cliente esperando sentado.
- A15 rótulo de Q3 abajo a la derecha, la guía al costado del ticket. A16 Q4 con la cámara centrada en la puerta.
- A17 la mano de Martín más abajo al morder. A18 pañuelo de Lucía más atrás (las cejas no quedan sobre el pelo).
- A19 / guion 1: el chat de Martín ya no tiene la dirección escrita: "Llamada · 21:00", "¿Y mi pizza?" 22:12 y el audio.
- A20 texto ≥ 36 px: tablero rehecho (52-74 px en el lienzo), panel (50-150), remitentes del chat 44 px, mapa.
- Bajas: panel sin filas vacías (la primera aparece en el corte); chat de Tano con el primer mensaje desde el corte; chip
  "LUCÍA" fuera de la casa de Martín (solo la hora); Tano sin lengua en P3b; la mano suelta la tapa antes (no pasa por la
  cara); fainá más naranja y más grueso. Q3b (Lucía cuelga el ticket) fuera por el largo.
Sonido:
- t1 atempo 1,08 ("¿Calle qué?" con aire), s1 1,04, m2 0,94 (más lento), l1 1,2 (cierre 3,0 s).
- Q2: burbuja de audio "¡Ya sale!" (borde punteado, cola al celular) mientras suena.
- Pausa antes de "Cenamos." ~1,5 s (contraplano 0,4 + comanda 0,5 + rótulos 0,4 + 0,25).
- Cama: música -34/-33 (antes -36), extractor -39 en lo de Tano, extractor -42 en los planos de Lucía (Q1b, Q3, Q5),
  heladera baja en lo de Martín; cartel con la música desde el primer cuadro (fi 0,05).
- SFX nuevos: el casco que se saca (k-plastico), la porción (k-cloth_1).
- medir.py: ≥ +8,4 LU en todos los tramos salvo la ventana de 14,0 s (la cola de "Cenamos." a -38,6 contra la cama que
  vuelve: la voz ya terminó; es borde de ventana).
Guion: rótulo "Menú online: elige, / pone la dirección y paga" sobre el menú (Q2i); "$ 2.220 / que volvieron"; los
rótulos de P2 siguen en P2b (≥ 2 s) y dicen "Pedidos que se van a otro lado"; la B se escribe después de "¡Con V corta!".
Portada: `herramientas/portada.html` tiene `--marca-bottom` (por defecto 250px, igual que antes); acá 300px.
- **Render r2: 1516 s (25,3 min)** → `renders/pizzeria-pedidos.mp4`; `paso10.sh` → `renders/pizzeria-pedidos-final.mp4`
  (40,6 s, -14,2 LUFS, pico -6,5 dBFS, lineal). Hoja cada 0,5 s: `renders/hoja.png`. `check --json`: 0 errores.
- Portada nueva (el cuadro 0 cambió): fondo limpio a 1,95 s con otra cámara (ver portada.json), SCALERICS en y≈1606.
- Sin resolver / flojo: la vista cenital de Q1 dura ~0,5 s y el casco de Facu desde arriba es una bola navy; en P4c
  Facu sigue cortado a la derecha (cara de 3/4 y porción a la vista); "¡Con V corta!" roza la coronilla de Tano; el
  pañuelo de Lucía sigue leyéndose como casquete; la cola de "Cenamos." en medir.py (borde de ventana); voz "¿Ya está?"
  sigue siendo la única toma que el STT entiende (atempo 0,94); el segundo "¡Ya sale!" con la boca llena se dejó.
