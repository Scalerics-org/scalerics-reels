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
