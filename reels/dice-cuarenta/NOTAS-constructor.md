# dice-cuarenta · notas del constructor (15-11)

Proyecto como la-lista / ya-lo-cargo: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (escrita para este reel con las utilidades,
globos con avatar, insertos pegados a la cámara, `fusionar()` y la cámara Catmull-Rom de la-lista; zorra, autoelevador
y camión de ya-lo-cargo). `assets/personajes.js` = el de la-lista. Rubén = `ELENCO.ruben` en todo el reel (con la
herradura de pelo canoso de ya-lo-cargo), Nico = `ELENCO.empleado`, el operario = el de ya-lo-cargo (gorra navy, visera
verde). Graciela, Marta y Walter solo como avatar (render target) en sus burbujas y en el celular.

**Duración: 34,55 s** (parte 1 0-20,04 · cartel 20,04-22,54 · parte 2 22,54-34,55; línea chica desde 32,50, 2,05 s).
Si hay que recortar: la pausa de P4 (1,6 s; no tocar mucho, es la pausa del chiste), Q2c (0,95 s) o el cartel a 2,4 s.

## Comandos (desde reels/dice-cuarenta)
```
node gen.mjs                      # todo (mezcla incluida); SINAUDIO=1 no rehace la mezcla; MEDIR=1 escribe stems
python3 medir.py                  # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre        # snapshots con el candado → renders/snap/<nombre>/ + hoja.png
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 check --json
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/dice-cuarenta.mp4
ffmpeg -y -i renders/dice-cuarenta.mp4 -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k renders/dice-cuarenta-final.mp4
# depuración de cámara: VER="cam:px,py,pz,mx,my,mz,fov" SINAUDIO=1 node gen.mjs (fija la cámara en todo el reel)
```
`partes/voces.sh` genera tomas (TOMAS="a b c"; LINEAS=otro.tsv), `partes/procesar.sh` arma las voces finales.
Depuración de errores de tres.js sin hyperframes: `/tmp/claude-0/dbg/probar.mjs` (llama __tresRender cada 0,25 s y
lista excepciones; un error en renderAt deja el canvas congelado en el cuadro anterior, no negro).

## Voces (partes/procesar.sh)
r1 01-ruben-b (+ eco corto de galpón) · n1 02-nico-b · n2 03-nico-b (atempo 1,05) · n3 04-nico-c (atempo 1,1) ·
n4 05-nico-a · r2 06-ruben-c · n5 07-nico-e ("actualicé": las tomas a-d y f-g el STT las oía mal; la e dice
"tranqui ya lo actualicé") · r3 08-ruben-c (0,39 s de pausa natural después de "Bárbaro.") · n6 10-nico-b ·
r4 11-ruben-c (+ eco) · n7 = la misma toma que n1 (callback) · n8 13-nico-c · r5 14-ruben-c · narrador = el de
ya-lo-cargo. Todas con "oyó:" igual al texto. "Excel": el STT lo oye "Excel"; confirmar al oído que no sea inglés marcado.

## Mundo
Depósito de día a nivel del piso, paredes navy claro, piso gris-crema. Pasillo a lo largo de z; racks a los dos lados
(cara en x = ±2,3), 8 bahías de 1,8 m (z 6,0 .. -8,4), largueros verdes en 2,1 y 4,2. Bahía del ACEITE = rack derecho,
bahía 6 (z -6,6 .. -4,8; centro -5,7); sus niveles de arriba están VACÍOS a propósito: desde atrás del rack (P4-P6)
se ve el cartel por el hueco. Cartel de DOS caras (paletas en las dos), colgado de dos cadenas del larguero de 4,2 en
x 2,06; cuerpo 1,6 x 1,0. Remitos (0,56 x 0,40) en el parante de z -4,8. Oficina vidriada al fondo (piso 3,2,
vidrio en z -9,4), escalera que baja hacia -x por el costado (z -8,95), portón del muelle a la izquierda del fondo con
el camión (casi no se ve: ver pendientes).
Marcador: cada dígito gira por el lado corto de la rueda (9 → 0 es un paso), 0,07 s por paleta; del blanco a un
dígito, una sola paleta. `pasosFlap` de gen.mjs usa la misma regla para los tics.

## Planos (segundos globales)
| plano | desde | qué |
|---|---|---|
| P1 | 0,00 | pasillo, Nico con el celular abajo a la izquierda, oficina arriba, cartel a la derecha (baja en 0,92); gancho HTML "El Excel dice cuarenta." (cola a la oficina) + burbuja muda de Nico · "¡Vendido!" 1,75 · remito GRACIELA 2,17-2,41 |
| P2 | 2,53 | Nico de frente, cartel arriba a la derecha; Marta 2,63 · ¡Vendido! 3,18 · Walter 3,93 · ¡Vendido! 4,38; remitos 3,53 / 4,73 |
| P2b | 5,08 | inserto del parante: los tres remitos y el cartel arriba |
| P3 | 5,78 | pasillo hacia la oficina (el operario con la zorra viene del fondo) → grúa al cartel → baja a las tres cajas; remitos rojos |
| P4 | 7,88 | contraplano desde atrás del rack por la bahía: Rubén (mate), Nico, operario; miran cajas/cartel/cajas; la paloma cruza |
| P5 | 9,48 | dos personas por la bahía · "Pero el Excel dice cuarenta." · Rubén gira · push-in · "El Excel nunca bajó al depósito." |
| P6 | 13,52 | desde atrás del rack, alto: cartel arriba, Rubén y Nico al medio, pallet abajo; cajas a la zorra · "Tranqui…" · 40 → 37 rojo 16,1 · "Bárbaro. Ahora miente actualizado." · mate |
| cartel | 20,04 | "Un sistema / más tarde…" (el de ya-lo-cargo) |
| Q1 | 22,54 | el encuadre de P1, cartel verde; burbuja de Graciela desde el celular; "Rubén, ¿hay aceite?" · "Fijate vos." (Rubén señala con el mate) |
| Q1b | 25,5 | inserto del celular: Aceite · En depósito 40 ✓ · "¡Vendido!" |
| Q2 | 26,6 | plano medio del rack: el operario escanea, cada capa vuela a la zorra: 30 · 20 · 10 (parpadea) |
| Q2b | 28,0 | inserto del monitor: "Aceite: quedan 10 · ¿Pedimos 40?" → Pedido ✓ |
| Q2c | 28,8 | la última capa (blanco/0); el autoelevador (lo maneja el operario) deja el pallet nuevo: 40 |
| Q3 | 29,8 | Rubén junto al pallet: saca una caja (39), la pone (40) · "¿Y? ¿Cuántos hay?" · "Los que dice." · línea chica |

## Mezcla
`MEDIR=1 node gen.mjs; python3 medir.py`: voz ≥ +10,5 LU sobre música+SFX en todos los tramos con voz; -14,0 LUFS,
pico -5,5 dBFS (antes del loudnorm del paso 10). TECHO -31 por efecto (cada uno con su techo más bajo). Música baja
12 dB en la pausa de P4 (no se corta) y 6 dB debajo de cada voz.

## Pasadas de revisión (snapshots)
- Armado (hojas a1-a9): renderAt tiraba `ei is not defined` desde P6 (los cuadros quedaban congelados); P1 con el
  cartel fuera de cuadro y la burbuja tapando la cara de Nico; P2 de espaldas; P5 con la cámara adentro de la bahía
  vecina (cajas grises tapando); P6 de espaldas a los personajes → cámara desde atrás del rack y cartel de dos caras
  + bahía con los niveles de arriba vacíos; las diagonales del rack eran barras horizontales que cruzaban a los
  personajes (geometría girada mal); pallets detrás del rack donde va la cámara; el inserto Q1b/Q2b salía negro (faltaba
  la escala en píxeles) y escondía a los personajes para siempre (Rubén invisible en Q3, mate flotando); Rubén aparecía
  al lado del autoelevador en Q2c; Nico asomaba en Q2c; escalera en la trayectoria de la grúa → escalera girada hacia -x.
- Pasada 1 (cada 0,5 s desde 0): Nico cortado en el borde izquierdo en P1; cartel cortado a la derecha en P2; Rubén
  cortado en P5; en P2 el cartel mostraba "37" verde en el primer cuadro de la parte 2 (el cambio 37 → 40 caía en P2:
  ahora en P1 + 0,1, con el cartel tapado); la burbuja de Graciela duraba 0,2 s (ahora hasta "Fijate vos."); Q2
  operario cortado; Q3 con Nico de espaldas y el cartel cortado; 39 → 40 pasaba por 4-1 (giraba por el lado largo);
  la línea chica solo 1,55 s (ahora 2,05 s).
- Pasada 2 (cada 0,5 s desde 0,25): los remitos volaban por delante de la cara de Nico (curva más hacia el rack); el
  dorso de los remitos se veía como una placa gris en el borde izquierdo de P5 (cámara corrida); " 0" → "40" mostraba
  "00" a mitad del giro (del blanco a un dígito ahora es una paleta); Q3 con el cartel cortado a la izquierda (cámara
  más abierta y más atrás).
- Puntual (a9/a10): el dorso de los remitos seguía en P5 → los remitos no se dibujan en P4-P6 (cámara detrás del rack).
`check --json`: 0 errores (warnings: canvas en el borde, capa3d con canvas anidado, "nada cambia" de la capa HTML y
"Un sistema" del cartel 2,2 s, los mismos que la-lista).

## Pendiente / para los revisores
- El camión de reparto de P3 casi no se ve (el rack izquierdo tapa el portón desde el pasillo): se oye (motor + freno
  de aire) pero la toma no lo muestra. Mejor solución: abrir el portón al costado derecho del fondo o un plano corto.
- Q1: Nico pregunta mirando a la oficina, de espaldas a la cámara (se le ve la nuca y el perfil); Rubén en la oficina es
  chico (P1/Q1 son planos generales). La cola de "Fijate vos." apunta a la oficina.
- P4: el cartel queda cortado arriba (desde atrás del rack se ve la parte de abajo) y la paloma es chica, cruza por el
  hueco de la bahía delante del cartel (se lee como pájaro gris; mirar si se lee "paloma").
- Rubén baja de la oficina entre P3 y P4 y entre Q2b y Q3 sin que se lo vea bajar (corte).
- La caja que Rubén levanta en Q3 se mueve sola hacia él (la mano derecha no la agarra exacto).
- P2b es un plano frontal bastante cerrado: el cartel puede rozar el borde superior (las cadenas se cortan).
- Q3: el rótulo "STOCK · AL DÍA" del cartel queda cortado por el borde izquierdo (el número se lee entero).
- Los remitos no se dibujan en P4-P6 (desde atrás del rack no se verían): continuidad a revisar si molesta.
- Duración 34,55 s (pedido ~30-34).

## Ronda 1 (15-11, sobre la revisión independiente del MP4)
**Duración 33,30 s** (parte 1 0-19,66 · cartel 19,66-22,06 (2,4 s) · parte 2 22,06-33,30; línea chica desde 31,30, 2,0 s).
Recortes sin tocar la pausa de P4 (1,6 s) ni el beat del remate: P3 2,1 → 1,6 s, gancho/P2/P2b más apretados, cartel
2,4 s, Q1-Q3 más apretados. A cambio: 0,6 s de primer plano después de "depósito" y giro de cabeza de 0,7 s.
GUION
- Pedidos 15 + 15 + 10 = 40 (burbuja muda de Nico "Graciela quiere 15.", Marta "¿Tenés aceite? 15.", Walter "10 de
  aceite, para mañana.", remitos "15/15/10 aceite", el chat del celular, Graciela "Quiero 15." / "pide 15" en la parte
  2). El cartel sigue fijo en 40. descripcion.txt: primera línea sin "Nico ya vendió cuarenta a tres clientes".
ARTE
- ALTA 1/2: "¡Vendido!" arriba y al costado de la cabeza (cola al costado); pulgar a la altura del hombro, por delante.
- ALTA 3: los remitos ya no vuelan desde el celular: aparecen clavados en el parante con pop + grampa.
- ALTA 4: paloma más chica (escala 1,0), alas grises de dos tonos que aletean, vuela en x 0,9-1,1 (detrás del cartel
  visto desde P4, sin intersecarlo).
- ALTA 5: el cartel no proyecta ni recibe sombra (acné y cuña) y tiene brillo propio (emissive 0,32 sobre placa,
  paletas y rótulo): las dos caras se ven iguales.
- ALTA 6 (+ sonido 8): P6 se parte en P6 (general desde atrás del rack, 40 arriba, pallet con cajas abajo) · P6b inserto
  push-in al cartel en el giro 40 → 37 · P6c 37 arriba y pallet vacío entero abajo, "Bárbaro." al costado de la cabeza
  de Rubén · P6d primer plano de Rubén para "Bárbaro. Ahora miente actualizado." (burbuja arriba).
- ALTA 7: Q3 desde el lado del fondo del pasillo: Rubén 3/4 de frente, cartel verde entero arriba, pallet lleno a la
  izquierda, Nico a la derecha; la línea chica abajo no tapa caras. Rubén mira a Nico en "Los que dice.".
- ALTA 8: Q1r inserto de Rubén en la oficina (desde el balcón, por el vidrio) para "Fijate vos.", señalando con el mate.
- 9: P5 primer plano con dos ojos (giro de cabeza 0,5 en vez de 0,95, cámara corrida); Nico baja el celular después de
  su frase. 10: Q1 "Rubén, ¿hay aceite?" a y 1150 y Graciela abajo a la derecha con cola al celular (sin tapar el
  cartel). 11: Q2c cámara más abierta: el autoelevador trae el pallet y lo baja antes del 40. 12: la caja de Q3 va
  pegada a la mano derecha de Rubén. 13: camión fuera (no se veía) y sin sus SFX; P3 arranca mirando el cartel y el
  pasillo. 15: el operario de Q2 del otro lado del pallet, casi de frente (las capas van a la zorra por la izquierda).
  16: monitor del inserto al 85 % y centrado. 17: Rubén de pie detrás del escritorio (sin baranda ni travesaño delante
  del vidrio): se ve desde el pasillo; la cola del gancho apunta a él (x ≈ 327). 18: inserto del celular más grande y
  más arriba.
- BAJAS: sin fantasmas en las burbujas (n4, Marta y "¡Vendido!" con corte seco); los remitos se ponen rojos uno por uno
  (0,12 s); paletas: del blanco a un dígito, una sola (no "00").
SONIDO
- 2: el techo se cumple después del +6 dB del bus (ganancia con -6) y la música 3 dB más baja (-36).
- 3: "Fijate vos." sin eco (el STT oye "Fijate vos"). 4: 0,6 s de respiro después de "depósito", giro de 0,7 s.
- 5: en el giro a 37 la música se va en 0,4 s: "Bárbaro." solo con el zumbido; vuelve con el cartel.
- 7: P3 de 1,6 s; acción y ambiente de P2b-P4 +5 dB y una segunda capa de zumbido del galpón en P3-P4.
- 9: pop + notificación en la burbuja de Graciela. 10: zorra, giro, gesto del mate y la caja +5-6 dB; fuera los whoosh
  inaudibles (los de techo ≤ -48). 11: "Los que dice." = toma 14-ruben-d (la de más "s" en "los"; el STT oye "los
  que dice"; LEN 1,17); el sorbo final corrido 0,13 s para no pisar la cola de la voz.
- Mezcla: -14,0 LUFS, pico -5,7 dBFS; voz ≥ +7,0 LU sobre el resto en todos los tramos (medir.py).
PASADAS: r1p1 (cada 0,5 s desde 0) → P2 burbujas sobre el cartel, P6b con cabezas cortadas abajo, Q1r demasiado cerca,
Q3 con Nico cortado y Rubén chico; r1p2 (desde 0) → Q3 cartel cortado y Nico sobre Rubén; r1p3 (desde 0,25) → burbuja
"¡Vendido!" semitransparente al salir (3,75), P6b cabezas cortadas; r1c/r1d/r1e puntuales → Rubén de nuca en "Los que
dice." (giro de cabeza al revés), burbujas de Q3. `check --json`: 0 errores.
QUEDA
- P3: entre 6,0 y 6,4 s el operario pasa cerca del borde derecho (cara cortada un instante) y el arranque de P3 (0,35 s)
  muestra el pasillo con la oficina.
- Q2: el operario queda sobre el borde derecho (se ve de costado, con el celular en la mano; no se modeló un lector).
- Q2c: el autoelevador ocupa la mitad izquierda del cuadro y el mástil cruza el cartelito "ACEITE".
- Q1: Nico sigue de espaldas cuando pregunta (mira a la oficina); el gesto de Rubén ahora se ve en Q1r.
- P5/P6d: el celular de Nico asoma en el borde derecho del primer plano.
- La paloma: mirar en el render si se lee (cruza 8,0-9,2 s, chica, por arriba de las cabezas).
