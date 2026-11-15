# la-lista · notas del constructor (15-11)

Proyecto como ya-lo-cargo: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (escrita de nuevo para este reel; utilidades,
racks, rotisería, globos y cámara Catmull-Rom de ya-lo-cargo). `assets/personajes.js` = el de ya-lo-cargo + la opción
`anteojosLeer` (media luna en la punta de la nariz, devuelta como `per.anteojos`). Rubén = `ELENCO.ruben` en todo el
reel (`almacenero` no se usa). Burbujas (el gancho incluido) = 3D pegadas a la cámara; avatares de Marta, Walter, Nico,
Graciela y Rubén = sus caras 3D renderizadas al arrancar (render target) y dibujadas en un círculo.

**Duración: 34,36 s** (parte 1 0-21,58 · cartel 21,58-24,48 · parte 2 24,48-34,36; línea chica desde 32,81).
Si hay que recortar: la pausa de P7 (`T.ring2 = p7 + 0.9`), la grúa de Q2 (1,0 s) o el cartel a 2,8 s.

## Comandos (desde reels/la-lista)
```
node gen.mjs                      # todo (mezcla incluida); SINAUDIO=1 no rehace la mezcla; MEDIR=1 escribe stems
python3 medir.py                  # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre        # snapshots con el candado → renders/snap/<nombre>/ + hoja.png
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 check --json
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/la-lista.mp4
ffmpeg -y -i renders/la-lista.mp4 -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k renders/la-lista-final.mp4
cd ../.. && flock /tmp/hyperframes.lock node herramientas/portada.mjs la-lista
# fondo limpio: LIMPIO=1 SINAUDIO=1 node gen.mjs; ./snap.sh 7.4 limpio; cp …/frame-00-at-7.4s.png portada-src/fondo-limpio-7.4.png; SINAUDIO=1 node gen.mjs
# depuración de cámara: VER="cam:px,py,pz,mx,my,mz,fov" SINAUDIO=1 node gen.mjs (fija la cámara en todo el reel)
```
Ojo: `node gen.mjs` reescribe index.html y tiempos3d.js: no correrlo mientras un snapshot/render está andando.
`partes/procesar.sh` rehace las voces finales desde `partes/rec/`.

## Mundo
Oficina vidriada (piso y 3,2, vidrio en z = 0 hacia el depósito, z 0..6,2). Rubén sentado de espaldas al vidrio
(mirando +z, a la cámara); escritorio x -0,85..0,85, z 1,25..2,95; monitor a su derecha (x -0,6, girado 1,18 rad hacia
la cámara); la rotuladora (caja navy3 con ranura y tira verde) adelante del monitor; la cinta de canto en z 1,78 sale
de la ranura (x -0,5) hacia +x, recortada con un plano de recorte en la ranura y en el borde (el texto nunca se
estira: cada versión tiene su lienzo; IBM Plex Mono 600, ~0,05 m de alto de letra). Depósito debajo (z -23..0): 4 racks,
6 campanas con SpotLight. Rotisería en x = 60 (adentro + la vereda y la calle al atardecer).

## Planos (segundos globales)
| plano | desde | qué |
|---|---|---|
| P1 | 0,00 | 3/4 alto de frente: Rubén mira el celular (en primer término), monitor a la izquierda, cinta "lista_precios.xlsx", depósito con las 6 campanas atrás. Gancho = burbuja de Graciela (avatar + "Graciela · Rotisería", "¿Me pasás la [lista] actualizada?", 100 px) desde el cuadro 0, cola al celular. Arrastra con el mouse 1,55-2,15; ✓✓ 2,29 |
| P2 | 2,41 | push-in hacia el teléfono de escritorio (Rubén a la izquierda): ring 2,46, altavoz 2,71 (se prende verde), "Rubén, subió el aceite." 2,81 (burbuja con tubo) |
| P2b | 4,33 | inserto del monitor (Rubén y la lámpara ocultos): la celda del aceite 4,41, tachado rojo 4,55, "$ 1.190" 4,69 |
| P3 | 4,88 | clac v2 4,96 · ráfaga (burbujas apiladas arriba, máx. 3): Marta 5,15 · azúcar 5,55 (v3 5,73) · Walter 5,90 · dólar 6,22 (v4 6,38) · Nico 6,52 (v5 6,68) · v6 6,88 (toca el termo) · v7 7,08 (empuja el termo, que cabecea) · Rubén lo agarra sin mirar 7,20-7,60 · campanas 5,30/5,78/6,22/6,65/7,05/7,45. Grúa que sube y baja al final a la cinta v7 legible (~45 px) |
| P4 | 7,72 | suena el celular sobre el escritorio (vibra, "Graciela · llamando"); zambullida 7,84-8,22 |
| P4b | 8,22 | salimos por la pantalla del celular de Graciela (persiana a media altura, spiedo vacío y apagado, un tubo de luz) → plano medio: "Rubén, ¿el aceite a cuánto está?" 8,52 |
| P5 | 10,71 | salimos por la pantalla del celular de Rubén (en su oreja derecha) → primer plano: "Está en la [lista.]" 10,83 |
| P6 | 12,01 | contraplano a Graciela, separa el celular: "¿En cuál? Tengo [siete.]" 12,07 |
| P6b | 13,50 | inserto del chat: los siete archivos completos (Plex 38 px de lienzo, el celular llena 90 % del alto), seis con borde rojo apagado, scroll 13,70/14,25 |
| P7 | 14,40 | 3/4 de frente-derecha: la pausa (música -12 dB, solo zumbido); ring 15,30, altavoz 15,55, proveedor 15,65; "[Ocho.]" 17,71; clac v8 18,26 corre la taza 3,5 cm |
| P8 | 18,41 | de frente más abierto: "Dale. ¿Me la mandás en [PDF?]" 18,51 (cola al celular); mira a cámara 19,96-20,46 (cara de nada, anteojos en la punta); tecla 20,63; clac largo 20,73: la cinta ".pdf" (rojo apagado) llega al borde y la cola cuelga con vaivén; la cámara se corre a la derecha para verla colgar |
| cartel | 21,58 | "Una tienda / online / más tarde…" (Rasalgethi de hacen-envios, en P1 + 0,12) |
| Q1 | 24,48 | el encuadre de P1 a las 18:30 (sin anteojos, mate en la mano, depósito prendido, operario con la zorra por el pasillo; cinta "✓ tienda · precios de hoy"; celular "18:34"): ring 24,58, la MISMA toma "Rubén, subió el aceite." 24,93, la cinta hace un tic 26,46 y no crece |
| Q1b | 26,56 | inserto del panel: "$ 1.240" 26,71, Publicar 27,01, "Publicado ✓ · lo ven todos tus clientes" 27,11 |
| Q1c | 27,36 | Rubén con el mate: "¿Algo más?" 27,46 · tono de colgado 28,17 |
| Q2 | 28,24 | la etiqueta verde sale del monitor por la hoja abierta del vidrio, baja por el pasillo y sale por el portón (cámara que la sigue) |
| Q2b | 29,24 | la calle al atardecer (faroles, ventanas prendidas), entra por la puerta de la rotisería abierta al celular de Graciela |
| Q2c | 30,09 | inserto de la tienda: el precio se da vuelta 30,21 ($ 1.190 → $ 1.240 verde), + 30,39/30,51/30,63 (2, 4, 6), Pedir 30,87, "Pedido ✓" 31,01 |
| Q3 | 31,31 | Rubén al escritorio: entran los pedidos 31,41/31,61/31,81 ("Graciela · 6 aceite ✓", "Marta · azúcar ✓", "Walter · agua ✓"); mira el celular 31,91, lo levanta 32,11, lo toca 32,51, lo alza buscando señal 32,66-33,26, lo deja boca abajo 33,41, mate 33,61 · línea chica 32,81 |

## Mezcla (MEDIR=1 + medir.py)
-14,0 LUFS integrado, pico -5,6 dBFS (antes del loudnorm del paso 10). Voz ≥ +6 LU sobre música+SFX en TODOS los
tramos de 0,5 s con voz (mínimo +6,4). TECHO -31 por efecto (cada SFX entre -36 y -52). Música: pizzicato en toda la
parte 1 (baja 12 dB en la pausa de P7, no se corta) y en la parte 2 con fundido de 0,9 s; duck -6 dB bajo cada voz.

## Pasadas de revisión (propias)
- Armado (hojas a-k): la cámara de P1 estaba pegada a Rubén (la cabeza llenaba el cuadro) → oficina más profunda (6,2 m)
  y cámaras más atrás y más altas; franja vacía abajo (frente del escritorio y piso) → escritorio de 1,7 m de fondo con
  celular, remitos, biblioratos y mate adelante; el monitor no entraba → escritorio de 1,7 m de ancho, cinta con letra
  de 0,031 m; la lámpara tapaba la cara en P2 y en el inserto → lámpara atrás a la derecha, más alta, oculta en los
  insertos; Rubén tapaba el inserto del monitor → oculto en P2b/Q1b; el inserto cortaba la columna de precios →
  centrado en la celda del aceite; burbujas de la ráfaga encimadas → apiladas cada 212 px, máximo 3, se van antes de la
  bajada a la cinta; la rotisería no se veía (un `.position.set` encadenado a `ROT.add` movía el grupo entero) →
  corregido; Graciela quedaba tapada por el mostrador → del lado de los clientes, mostrador a 0,9; inserto del chat sin
  celular (la cámara quedaba dentro de su cabeza) → pose fija del celular para los insertos, Graciela oculta; la mano
  tapaba la pantalla en la oreja → la mano agarra el celular de abajo; el celular se hundía en la oreja → 0,37; la cola
  de la cinta .pdf quedaba dentro del escritorio (pivote mal) y tapada por el tablero → pivote arriba del borde y la
  cámara de P8 se corre a la derecha al final; un plano azul liso tapaba la fachada de la rotisería desde la calle →
  girado (solo se ve desde adentro); el depósito y la calle de la parte 2 muy oscuros → piso crema2, más luz; la
  etiqueta se veía al revés → siempre de frente a la cámara.
- Pasada A (cada 0,5 s, 69 cuadros): salida de P5 y P4b por la pantalla demasiado cerca (pantalla navy lisa) → arrancan a
  0,3 m (se ve la pantalla entera) y tiran más rápido; la calle de Q2b oscura → más luz.
- Pasada B (cortes ±0,04 s, 34 cuadros): P5 arrancaba en negro (la cámara dentro del monitor) → el monitor se oculta los
  primeros 0,3 s de P5 (la pantalla del celular llena el cuadro); la burbuja "Está en la lista." pisaba la frente → más
  arriba.
- `check --json`: 0 errores (warnings: canvas anidado en capa3d, "nada cambia" en la capa HTML, etc., como ya-lo-cargo).

## Cambios respecto del plan (avisar)
- Textos: sin cambios en voces ni burbujas. El cartel va en tres renglones ("Una tienda" / "online" / "más tarde…"),
  como hacen-envios: en dos no entra. "PDF" se dice "pe de efe", la burbuja dice "PDF".
- Perro lejano: NO hay ladrido CC0 accesible → la pausa la marca el zumbido (fuentes.md).
- La cinta crece siempre: como "lista_v3_azucar" es más corto que "lista_precios_v2", cada versión es la más larga entre
  su texto y la anterior + 5,5 cm (cola en blanco a la derecha, como la cinta de una rotuladora). La v8 se estira hasta
  la taza para tocarla.
- El clac de la v2 se ve al arrancar P3 (en el inserto del monitor no entra la cinta).
- Graciela está del lado de los clientes del mostrador (detrás no se le veía el cuerpo). No da vuelta un pollo en Q2
  (el spiedo gira atrás, fuera de cuadro casi siempre).
- El proveedor en la ráfaga va como burbuja con ícono de tubo que sale del teléfono; las campanas se apagan con el
  interruptor (Kenney) con pasabajos.

## Tiempos de máquina
snapshot ~2 s por cuadro con el candado libre (69 cuadros ~3 min); con el otro constructor usando Chrome, un lote de
34 cuadros esperó >10 min. gen.mjs con mezcla ~15 s. Sin render de prueba.

## Flojo / para los revisores
- Q2 (depósito y calle) se ve oscuro y corto (1 s y 0,85 s): la etiqueta se lee, el lugar apenas.
- P2: Rubén grande a la izquierda y el teléfono a la derecha; la lámpara asoma arriba.
- La rotisería de noche se lee "cerrando" solo por el spiedo vacío/apagado y la luz de tubo; la persiana a media altura
  queda detrás de la cámara casi siempre.
- Rubén "mira a cámara" calculado al lente: confirmar ojos y anteojos cuadro por cuadro en 19,9-20,6.
- "Ocho." (r2) no lo pude escuchar: confirmar que no suene a pregunta.
- La cinta en P1/P8 (planos abiertos) tiene letra de ~30-35 px; en P3 final, P7 y el chat, 40-48 px.

## Ronda 1 (15-11) · rendimiento, guion nuevo, tríptico
**Duración 34,65 s** (parte 1 0-25,15 · cartel 25,15-27,95, 2,8 s · parte 2 27,95-34,65; línea chica desde 33,15). Las
tablas de arriba quedan viejas en segundos: los beats valen los de `assets/tiempos3d.js` (los imprime `node gen.mjs`).

### Rendimiento (el render pasaba los 60 min)
Medido dentro de la página (`VER=perf`: tiempo medio de `renderAt` + readPixels en 8 tiempos repartidos; snapshot con
`--timeout 400000`): **2.949 ms → 852 ms por cuadro** (oficina: 5,3 s → 0,97 s). Estimado de render con `--workers 2`:
~12-15 min. Qué pesaba (`VER=perf2` desglosa en 17,3 s): el entorno PMREM (~2 s por cuadro), el depósito (miles de
mallas, 1,2 s), las sombras PCFSoft (0,7 s), seis SpotLight de las campanas y el vidrio con MeshPhysical.
- `scene.environment = null` (lo reemplazan las hemisféricas, un poco más altas).
- Las campanas sin SpotLight: el charco de luz es un disco plano un poco más claro en el piso (se apaga con la campana).
- `fusionar()`: la geometría estática de cada lugar (depósito, oficina, rotisería, calle) en una malla por material
  (de miles de draw calls a decenas). Racks y pallets con BoxGeometry sin redondeo.
- Solo existen las luces del lugar del plano (`visible`), PCFShadowMap en vez de PCFSoft, vidrio MeshBasic.

### Guion y voces (decisión del coordinador)
- r1 "Está en la lista. La última." · g3 "¿Cuál es la última? Tengo siete." · r4 nueva "Claro. En PDF no se mueve."
  (Algenib, mirando a cámara; la tecla y la cinta .pdf después). "Ocho." (07-ruben-a): f0 155 → 129 → 103 → ~90 Hz,
  cae: afirmativo. Tomas y STT en partes/voces.md.
- Pausas: 0,4 s antes del teléfono en P7; 0,72 s entre "…subió el aceite." y "Ocho." (Rubén quieto, mirando el monitor).
- Ráfaga ~3,3 s que acelera (0,6 / 0,53 / 0,48 / 0,41 s entre burbujas, y 0,3 / 0,25 entre las últimas versiones).
- Inserto del chat 1,3 s; horas de esa noche (19:02 … 23:48 · ✓✓).
- La mirada a cámara arranca 0,1 s después del "¿PDF?"; P8 termina con la cámara que baja a la cinta .pdf que cuelga.
- Parte 2: sin el viaje de la etiqueta (era el mecanismo de ya-lo-cargo). En su lugar el tríptico: los celulares de
  Marta (cafetería), Walter (bar) y Graciela (rotisería) en escalera, el precio se da vuelta a la vez ($ 1.190 → $ 1.240
  navy con chapita verde "hoy"); después el inserto de Graciela con el chip "1 lista · la de hoy", aceite x 6, Pedido ✓.
- "aceite x 6" (y "azúcar x 10", "agua x 20"); la llamada de Graciela dice "en llamada · 0:04"; gancho a 112 px.
- Línea chica: "Tienda online mayorista: / el precio de hoy, / sin mandar listas" + "scalerics.com" (58 px).
- descripcion.txt: "La armamos nosotros, a la medida de tu distribuidora."
- Q3 más corto: mira el celular, lo toca, lo deja boca abajo, mate (sin la búsqueda de señal larga).

### Lo flojo de la entrega anterior
- P2: cámara más al centro; Rubén centrado y grande, el teléfono a la derecha (la lámpara ya no tapa la cara).
- Cinta en P1 y P8: P1 termina más cerca (3,45 m) y P8 cierra a ~1,6 m de la cinta .pdf (letra ~60 px).
- Mirada a cámara: ojos abiertos y de frente, anteojos en la punta de la nariz sin atravesarla (revisado 22,3-23,8).
- Persiana: intenté un contraplano por encima del hombro de Graciela para verla: solo se veía su pelo; volví al
  contraplano de frente. La persiana sigue sin verse (el "cerrando" lo dan el spiedo vacío y apagado y la luz de tubo).

### Pasadas (ronda 1)
- r1a (cada 0,5 s desde 0): el contraplano por encima del hombro (P6) era solo pelo → de frente; el tríptico tenía los
  celulares chicos entre paredes vacías → en escalera, más grandes, fondo navy con círculos planos.
- Cortes ±0,04 s (32 cuadros, r1c): sin cuadros negros ni lisos; P5 arranca en la pantalla "en llamada" entera.
- r1d (cada 0,5 s desde 0,25): sin cambios nuevos.
- Mezcla: -14,0 LUFS, voz ≥ +7,5 LU sobre el resto en todos los tramos con voz. `check --json`: 0 errores.
- Portada: fondo limpio `portada-src/fondo-limpio-7.75.png` (la cinta v7 y Rubén agarrando el termo), alternativa
  `portada-src/fondo-limpio-24.8.png` (la cinta .pdf colgando).

## Ronda 2 (15-11) · última corrección
**Duración 35,50 s** (parte 1 0-25,80 · cartel 25,80-28,65, 2,85 s · parte 2 28,65-35,50; línea chica desde 33,80).
Beats al día en `assets/tiempos3d.js`.

Guion
- G1: r4 = "Claro. El PDF no se mueve. El aceite, sí." (Algenib, toma f, la más plana; pausa ~0,4 s después de "Claro.";
  el STT oye "claro el PDF no se mueve el aceite sí"). Burbuja en tres renglones con [PDF] y [aceite].
- G2: chat con "Rubén" / "Distribuidora" en dos renglones; tarjetas más bajas, la v7 con margen abajo.
- G3: "1 lista · la de hoy" en su propio renglón (píldora verde de 520 px, 46 px) debajo de "Precios de hoy".
- G4: tríptico con letra grande (nombre 76, comercio 64, "1,5 L" / "x 12" 60, precio 130, "hoy" 74 px de lienzo; en
  cuadro ×0,67) y cámara más cerca.
- G5: "Graciela · aceite x 6 ✓", "Marta · azúcar x 10 ✓", "Walter · agua x 20 ✓".
- G6: con el clac de la v8 la celda del aceite pasa a $ 1.240.
- G7: ganchos.md, plan.md (nota al final) y el encabezado de tres.js sin el viaje de la etiqueta.

Visual
- A1: la cinta .pdf entera ("lista_v8_aceite_FINAL_ESTA_SI_(2).pdf") en cuadro ~0,5 s (v8+0,1 a v8+0,6), después
  la cámara baja a la cola que cuelga. A3: escritorio de 2,2 m de fondo (el frente queda fuera de cuadro) y planos de
  P3 final, P8 y la cinta .pdf más altos: sin franja navy abajo.
- A2: la burbuja de Graciela aparece cuando la cámara ya salió de la pantalla (p4b + 0,42); la mano agarra el celular
  más abajo; lo mismo en P5 (burbuja en p5 + 0,35).
- M4: las colas llegan más lejos (lado ±0,8, giro ±1,15 rad): apuntan al celular / al teléfono. P2 con la burbuja arriba.
- M5: anteojos pegados a la cara (k 1,12) y patillas que siguen la superficie de la cabeza (tubo por detrás de la
  mejilla hasta la oreja).
- M8: línea chica abajo (top 1420), opaca, entra deslizando desde abajo; Q3 encuadra los pedidos arriba a la izquierda.
- M9: inserto del panel más bajo (menos techo). M10: Graciela en P6 baja el celular delante del pecho, inclinado: desde la
  cámara (más baja) se ve la pantalla, no el canto.
- M11: P1 termina a 3,3 m; la v8 .pdf entera a ~37 px de alto de letra; el resto de los planos de la cinta, 40-60 px.
- B12: el texto del cartel sale en dur-0,3 y el iris abre en los últimos 0,1 s desde 90 px. B13: los globos salen con
  fundido (no se achican). B14: ráfaga cada 238 px. B15: "Rotisería" / "llamando" a 62 px. B16: lámpara más baja y
  adentro; P2 más abierta (termo y teléfono enteros).

Sonido
- S1: Q3 de 2,2 s con cada acción separada; el sorbo entra en 34,9 y termina con fundido antes del final.
- S2: narrador en P1+0,02 (-1 dB, S9); whoosh de salida en P2-0,15; cama corta de pizzicato a -40 en el cartel (S10).
- S3: "Dale…" 0,45 s después de "Ocho."; el clac de la v8 y la taza suenan solos entre medio.
- S4: la mirada a cámara se sostiene 0,5 s antes de "Claro."
- S5: tono de colgado a -38 sin pasabajos; whoosh del tríptico a -52. S6: campanas a -40 (pasabajos 2500), corridas
  +0,07 s. S7: clacs v2-v4 a -34 y la música baja 3-4 dB alrededor de cada uno. S11: termo a -40. S12: tonos del
  proveedor -41, page-turn -42, "Pedido ✓" -36. S13: el tic de la cinta después de la voz del proveedor.
- Mezcla: -14,0 LUFS, pico -6,0 dBFS. medir.py marca un solo tramo (25,0 s, -4,1): la ventana de 400 ms que termina en
  25,0 agarra la cola de "…sí." (termina en 24,68) y el máximo del tramo agarra la tecla y el clac de la v8 (24,98 y
  25,06): no se pisan (0,3 s de aire entre la voz y la tecla). El resto de los tramos con voz, ≥ +6 LU.

Pasadas (ronda 2): r2a-r2c (puntuales), r2p1 (cada 0,5 s), r2p2 (cortes ±0,04 + cada 0,15 s en 6,4-7,5 y 20,9-21,8 + el
iris), r2p3/r2p4 (cada 0,5 s desde 0,25). Corregido en las pasadas: P2 seguía cortando a Rubén (bubble arriba, cámara
centrada), P3 final cortaba la cabeza, el plano de la .pdf tenía franja abajo (escritorio más profundo), Q3 cortaba los
nombres de los pedidos, el texto del cartel se veía dentro del iris. `check --json`: 0 errores.
Portada: `portada-src/fondo-limpio-7.2.png` (t 7,2).

## Ronda 3 (15-11) · última
**Duración 35,49 s** (parte 1 0-25,66 · cartel 25,66-28,26, 2,6 s · parte 2 28,26-35,49; línea chica desde 33,79).

ALTOS
- A1 / M2: sin anteojos en todo el reel (Rubén sin `anteojosLeer`, Graciela con `lentes: null`); con el rig no quedaban
  pegados a la cara. La opción `anteojosLeer` queda en personajes.js sin usar.
- A2: el celular de Graciela en P6 va pegado a la mano (posición = mano + 0,1 m sobre su eje), a la altura del pecho y
  debajo de la boca, inclinado hacia ella: desde la cámara se lee la pantalla del chat.
- A3: Q3 desde más atrás (Rubén entero, monitor con "Pedidos de hoy" entero, celular y mate por encima de y 1420). En la
  parte 2 el celular está al alcance (CEL2, x -0,3 z 1,6): lo levanta, lo toca, lo deja boca abajo y toma mate arriba de
  la línea chica.
- A4: los insertos del monitor (P2b y Q1b) son planos (pegados a la cámara): la pantalla entera de frente, 1000 px de
  ancho, fondo navy liso, sin techo ni pie.
- A5: corte a P8b en la tecla: la cinta de cerca ("…aceite_FINAL_ESTA_SI_(2).pdf", ~75 px) mientras crece y después la
  cámara baja a la cola que se dobla y cuelga del borde; ~1,1 s en total.
MEDIOS
- M1: la cola del gancho baja por la izquierda hacia el celular (no a la cabeza); "Dale… ¿PDF?" con la cola al borde
  izquierdo del cuadro (el celular está en la oreja, fuera de campo).
- M3/M4: las salidas por las pantallas arrancan a 0,42-0,45 m y se abren hacia arriba y afuera (sin pasar por el brazo
  ni la nuca).
- M5: la ráfaga muestra como mucho 2 burbujas apiladas; P3 mira más arriba (la cara queda debajo); en P2 Rubén mira el
  teléfono sin bajar la cabeza.
- M6: P2 más abierta (teléfono, termo y lámpara adentro); mate más adentro.
- M7: adelante en el escritorio, la pila de listas impresas tachadas ("LISTA DE PRECIOS", solo la de arriba con título) y
  una calculadora: la franja de abajo tiene algo con sentido.
- M8: P3 final más cerca; P8b de cerca (la cinta .pdf a ~75 px).
- M9: "Pedido ✓" 0,6 s. M10: P8 con push-in marcado a la cara durante la mirada y "Claro…".
- BAJA: globos salen en 2 cuadros; horas del chat a 44 px; P6 más abierto.
SONIDO
- S1: tonos de teléfono desde 0,09 s del archivo (ringEsc 0,4 s; ráfaga 0,2 s). S2: dos bips de colgado y el tríptico
  0,2 s después; el giro de precios en q2+0,24. S3: sorbo entero (q3+1,18) y música -3,5 dB desde 33,3.
- BAJA: campana 5 +0,15; termo -36; pop del proveedor de la parte 2 -0,05 s y -3 dB; whoosh del envío en envia1+0,03;
  música -2,5 dB extra debajo de "Dale… ¿PDF?" y g4 con pasabajos 4600 (antes 3400); cama del cartel sin duck.
- Mezcla: -14,0 LUFS, pico -5,9 dBFS; voz ≥ +12,1 LU sobre el resto en todos los tramos con voz.
Pasadas: r3a (puntuales), r3p1 (cada 0,5 s desde 0), r3p2 (cortes ±0,04, P6 cada 0,4 s, Q3 cada 0,25 s), r3p3 (cada
0,5 s desde 0,25). Corregido en las pasadas: la cola .pdf se veía demasiado cerca (cámara más atrás), P6 cortaba el pelo,
los títulos de las hojas encimadas ("PRECIOOS": solo la de arriba lleva título). `check --json`: 0 errores.
Portada: `portada-src/fondo-limpio-7.2.png` regenerado (sin anteojos, con la pila de listas).

## Ronda 4 (15-11) · los 2 ALTOS de PENDIENTE.md y los medios
**Duración 36,64 s** (parte 1 0-26,02 · cartel 26,02-28,52, 2,5 s · parte 2 28,52-36,64; línea chica desde 34,64).
Beats al día en `assets/tiempos3d.js`. Inserto del monitor P2b 4,20-4,56 y Q1b 31,00-31,62; P8b (la cinta .pdf) 25,06-26,02.

ALTOS
- Insertos del monitor (P2b, Q1b) → fondo navy de 8000 x 12000 px pegado a la cámara (tapa la escena entera, que
  además no se dibuja en esos planos), sin pie, y su propio lienzo vertical de 1000 x 1300 px (`pantI`,
  `dibujarInserto`): P2b = la planilla en dos columnas con letra 50-84 px (la celda del aceite, tachado, $ 1.190);
  Q1b = "Tienda · Productos", precio en 104 px, Publicar/Publicado ✓ 84 px, "Lo ven todos / tus clientes" 62 px y las
  caras de Marta, Walter y Graciela con tilde. La burbuja del proveedor sigue arriba (también en Q1b). Q1b dura 0,62 s
  (antes 0,45: "Publicado ✓" no se leía).
- Remate .pdf → P8b arranca 0,12 s después de la tecla (sin la mano en el borde), cámara alta y cerca, solo la cinta: sin
  mate ni lámpara en ese plano, Rubén fuera de cuadro (mira desde arriba: atrás se ve el depósito). ".pdf" en un recuadro
  rojo lleno con letra crema (~150 px de alto de letra al final). Sin la cola en blanco (la cinta termina en el borde).
MEDIOS (arte)
- Gancho sobre la cara → globo a 104 px y P1/Q1 miran 0,12 m más arriba (Rubén más abajo); el globo queda hasta el corte
  (sin el flash 2,23-2,30).
- "Cambió el dólar" sobre la cara → la grúa de P3 se queda arriba hasta que se van los globos (v5 + 0,08) y baja a la
  cinta después.
- "Dale… ¿PDF?" → sin cola (la voz sale del celular en la oreja) y P8 arranca cerca (Rubén ~40 % del ancho).
- Continuidad 6,8-7,4 → el termo sube 26 cm cuando Rubén lo agarra (se lee "agarra el termo", no el teléfono).
- Salida por la pantalla de Graciela → arranca a 0,5 m mirando arriba del celular, sale con ease-out y la mano no se
  dibuja los primeros 0,1 s (sin puño pegado a la cámara).
- P5 → mira más arriba: la cinta ya no asoma cortada abajo.
- Cabeza con gorra en Q1c → el operario solo existe en Q1. Q1c desde más a la derecha: el monitor queda fuera ("…cado ✓").
  "¿Algo más?" más arriba (no pisa la ceja).
- Q3 → cámara a la derecha y más abierta (fov 50-51): monitor "Pedidos de hoy" entero y Rubén entero y más grande; el
  mate sube hasta la boca (la mano va a boca - 0,12 m y el mate se inclina 0,35 rad hacia él). En la parte 2 no está la
  pila de listas impresas. La línea chica entra en q3 + 0,15 (1,9-2 s en pantalla).
- Textos < 36 px → tríptico sin "1,5 L x 12", nombre 84 / comercio 74 / "Aceite" 88 px de lienzo; el celular de la parte 2
  queda en negro (sin "18:34" ni "Sin notificaciones"); en P6 el celular de Graciela muestra las siete tarjetas sin
  texto (íconos y bordes rojo/verde); el texto va en el inserto P6b. Los del inserto del monitor, ≥ 50 px.
- Pastilla "…cado ✓" cortada → resuelto con Q1c (arriba). La cinta en P5 → resuelto (arriba).
SONIDO
- M1: el ring son dos pulsos de 0,15 s separados 0,19, pasaaltos 250 (`ringEsc`); la voz del proveedor después.
- M2: "Claro. / El PDF no se mueve. / El aceite, sí." aparece de a una línea (r4 + 0 / + 0,74 / + 2,42) y la pausa antes de
  "El aceite, sí." pasa a 0,41 s (r4.wav con 0,16 s de silencio en 2,16; el original en `partes/r4-antes-ronda4.wav`;
  LEN.r4 3,29). "¿Cuál es la última?" y después "Tengo siete." (g3 + 1,05).
- M3: el narrador del cartel sin sus 0,2 s de silencio inicial (las letras y los pops corridos -0,15/-0,2) y el cartel
  dura 2,5 s; la parte 2 arranca con 0,5 s de oficina antes del ring (ring3 P2 + 0,5, altavoz + 0,84, proveedor + 0,88).
- Mezcla: -14,0 LUFS, pico -6,0 dBFS (antes del loudnorm). Voz ≥ +6,2 LU sobre el resto en todos los tramos con voz
  (`medir.py`). Para eso: duck de la música más ancho alrededor de cada voz (-0,75/+0,7 s), música -8 dB en el inserto
  P2b y en el remate (de "Claro." al cartel), y vibra/zambullida/tecla/clac v8/teclas del inserto 4 dB más bajos.
BAJOS
- Flash sin burbuja: corregido. Lámpara: el foco más chico y metido en el cono. Mano sobre el mate: el mate al costado de
  la mano. Bombilla delante de la cinta en P7: el mate gira con la bombilla hacia la cámara (todavía cruza "(2)" un poco
  en 15,5-18,5; si molesta, sacar el mate de P7). Sin tocar: iris 28,17-28,23, manchas del cartel, celular de canto en P6.
Pasadas: base4 (los defectos de PENDIENTE), ins/pdf (insertos y remate, 3 vueltas), r4a/r4b/q3/mate/fix5 (puntuales),
cortes (±0,04 s en los 18 cortes), p2 (cada 0,5 s desde 0,25). `check --json`: 0 errores.
Portada: `portada-src/fondo-limpio-7.2.png` regenerado en 7,41 s (la misma acción, corrida 0,21 s); `portada.json` sin
cambios (t 7,2 sigue siendo cerca de la misma toma; el fondo limpio es el que manda).
Queda para el revisor: la cinta v7/v8 en P7/P8 sigue cortada por el borde izquierdo (es más larga que el cuadro); P2
arranca 0,45 s sin burbuja mientras suena el ring.

## Ronda 5 (15-11)
**Duración 36,39 s** (parte 1 0-26,20 · cartel 26,20-28,70 · parte 2 28,70-36,39; línea chica desde 34,39). Beats: P5 10,26 ·
P7 15,08 · r4 21,61 · tecla 25,12 (P8b 25,24-26,20) · Q1b 30,75 · Q1c 31,37 · tríptico 32,29 (tachado 32,53, nuevo
32,75) · Q2c 33,14 · Q3 34,24.
ARTE
- ALTA 1 bombilla sobre "(2)" en P7 → el mate no está en P7 (aparece en P1-P3 y en la parte 2).
- 2 remate .pdf → P8b nuevo: cámara a la derecha y girada 0,4 rad: la cinta entera en diagonal de punta a punta
  ("lista_v8_aceite_FINAL_ESTA_SI_(2).pdf" desde la rotuladora hasta ".pdf" rojo grande abajo a la derecha), con la
  planilla del monitor, el termo y el teléfono llenando el resto; push-in corto a ".pdf". Rubén no se dibuja en P8b.
- 3 bombilla debajo de la nariz en la parte 2 → el mate va a la altura del pecho (sube a la boca solo en el sorbo de Q3).
- 4 globo "Claro…" sobre la coronilla/ceja → letra 66 px, globo más arriba (by - 750) y el final de P8 mira 8 cm más arriba.
- 5 Rubén de espaldas con el celular en la nuca (10,17-10,40) → P5 es un corte directo al primer plano con push-in (sin la
  salida por la pantalla).
- 6 "$ 1.190" aplastado en el tríptico → se tacha con una línea roja 0,22 s y aparece "$ 1.240" + "hoy" (igual en el
  celular de Graciela). El "ding" en flip + 0,2.
- 7 tríptico chico / salto → celulares más juntos y la cámara 0,4 m más cerca (llenan ~80 % del ancho y ~95 % del alto). El
  salto del primer cuadro no aparece en snapshots (probé el orden de los cuadros: siempre igual); si vuelve en el render,
  revisar.
- 8 rótulos de la ráfaga → el nombre del globo nunca menos de 42 px (`cabF`).
- BAJAS: P4 arranca más cerca (la cinta no asoma arriba); la mano de Graciela ya no se oculta al salir (sin celular
  flotando); "hoy" del celular 44 px; dibujitos de harina, azúcar y agua; termo de la parte 2 detrás del teléfono (no se
  corta en Q1c); remitos ocultos en la parte 2. Sin tocar: el panel del monitor en Q1 (se ve "Publicar" cortado, es el
  encuadre de P1).
SONIDO
- M1: el zumbido.wav tiene 0,5 s de silencio digital (0,5-1,0 s) que se repetía cada 8 s → `assets/sfx/zumbido-largo.wav`
  (43 s, tramo 1,0-7,5 con crossfades de 0,4 s, sin huecos), sin loop. Los loops que quedan (pizzicato) van con
  `-stream_loop -1`.
- M2: g2 entra 0,22 s después de salir de la pantalla y su globo con la voz (g2 - 0,03); r1 igual (r1 - 0,03).
- M3: SFX de la ráfaga +7 dB y del final (tríptico en adelante) +5 dB, con techo -31 por efecto.
- Duración: la parte 2 arranca con 0,1 s antes del ring (ring3 P2 + 0,1, altavoz + 0,42, proveedor + 0,45).
- Mezcla: -14,0 LUFS, pico -5,8 dBFS; voz ≥ +14,6 LU sobre el resto en todos los tramos con voz.
Pasadas: r5a/r5b/r5c/r5d (puntuales), p5 (cada 0,5 s desde 0,25), c5 (±0,04 s en los 18 cortes), r4bub. `check --json`:
0 errores.

## Ronda 6 (15-11) · última
**Duración 36,39 s** (sin cambios: parte 1 0-26,20 · cartel 26,20-28,70 · parte 2 28,70-36,39; línea chica 34,39).
ARTE
- ALTA 1 (P7, brazo en pose de celular sin celular) → en P7 Rubén deja el celular en el escritorio (atiende el fijo) y el
  brazo derecho descansa; lo vuelve a tener en la oreja en P8 (`celEnOreja`).
- 2 (salida por la pantalla de Graciela: nuca, celular flotando) → P4b es un corte directo a Graciela casi de frente con
  push-in lento; el celular en la oreja con la pantalla contra la cara (se ve el dorso). Globo a y 250.
- 3 (3/4 "tuerta", labios, peto) → el mismo plano de frente (los dos ojos, labios y delantal de frente).
- 4 (globo de P6 sobre el pelo) → contraplano más de frente y Graciela más abajo en el cuadro; globo a y 250.
- 5 (cinta cortada abajo en P5) → P5 mira 8 cm más arriba: la cinta queda fuera.
- 6 (Q1c cara cortada / solo "hoy") → Q1c centrado en Rubén (fov 36-37); el monitor y el celular no se dibujan en ese
  plano (asomaban cortados en el borde); la cinta muestra "precios de hoy".
- 7 (celular negro en Q3) → la pantalla de la parte 2 es una tilde verde grande y "Nada / nuevo" en 150 px.
- 8 (fila "$ 1.240 hoy 6 +") → precio en 54 px, chapita de 112 px con "hoy" centrado (40 px), el contador más a la derecha.
- 9 (mate atravesando el teclado / cable rulo) → en la parte 2 la mano del mate queda delante de la panza, 15 cm arriba
  del escritorio y más al centro (no toca teclado ni teléfono). Q3 un poco más abierto (fov 54-55) para que no se corte.
- BAJAS sin tocar (riesgo): "ista_" en P1, barra oscura en P8b, aro del cartel, tercio vacío del inserto, astilla en Q3.
SONIDO
- El duck de la música del inserto suelta en T.p3 (antes p3 + 0,6); whoosh de envío +4 dB; vibra de la llamada y sorbo
  +5 dB; sin la tela de 25,5 (P8b). g2 vuelve a p4b + 0,22 (con el corte directo; así la cola de la vibra no cae en el
  tramo de la voz). Mezcla -14,0 LUFS, pico -5,7 dBFS, voz ≥ +14,6 LU sobre el resto en todos los tramos con voz.
Pasadas: r6 (cada 0,25 s en P4b, P5, P6, P7, Q1, Q1c, Q2c, Q3 y ±0,04 en sus cortes), p4b, q1c (×3), fin6 (cada 0,5 s +
±0,04 en los 18 cortes). `check --json`: 0 errores.

## Ronda 7 (15-11) · celulares y mate
**Duración 36,39 s** (sin cambios en tiempos).
- ALTA 1 (celular de Graciela de canto, flotando en P4b) → en la oreja con la pantalla contra la mejilla y el dorso girado
  0,75 rad hacia adelante (se ve la cara ancha del dorso verde), apoyado en la oreja; la mano lo agarra por abajo del dorso.
- 2 (celular de Rubén invisible en P5/P8) → mismo arreglo (dorso girado hacia adelante, pegado a la oreja, mano tocándolo) y
  el celular de Rubén pasa a verde de marca (antes navy3, se perdía en el fondo). P5 y P8 desde un poco más a su derecha
  para que se vea.
- 3 (bigote sobre el ojo) → cámaras de P5 y del final de P8 14-16 cm más altas.
- 4 (bombilla en el bigote en Q1/Q1c) → el mate en reposo se inclina 0,35 rad hacia afuera (la bombilla lejos de la cara) y
  la mano un poco más baja y adelante; en el sorbo de Q3 se inclina hacia la boca.
- BAJA 5 (monitor en blanco al arrancar Q3) → la primera fila ("Graciela · aceite x 6 ✓") ya está desde q3.
Pasadas: r7a/r7b/r7c (puntuales), r7 (cada 0,25 s en 7,81-12,24, 21,4-25,2, 28,95-32,35, 34,2-34,5, ±0,04 en sus cortes, y
cada 1 s del resto). `check --json`: 0 errores.

## Ronda 8 (15-11) · los celulares con UNA regla
**Duración 36,39 s** (sin cambios en tiempos).
Regla (`celEnPecho` + `pegarCel` en tres.js, la misma para Rubén y Graciela): en llamada el celular va en altavoz, en la
mano, delante del pecho y debajo del mentón, inclinado 0,95 rad (pantalla hacia arriba y adelante: el personaje la mira,
la cámara ve la pantalla de la llamada), un poco hacia el lado de la mano. Primero la mano (IK) y después el celular pegado
a la mano real: nunca flota. Fuera de la mano, apoyado en el escritorio. Mismo tamaño para los dos (`CELK` 1,6) y los dos
con bisel navy alrededor de la pantalla y cámara en el dorso (`marcoCel`), también los del tríptico.
- ALTA 1 (celular colgando en P8b) → en P7 y P8b el celular de Rubén está apoyado en el escritorio (CEL2, al alcance).
- 2 (aparece de golpe en la mano en P8, de canto) → P8 arranca con Rubén levantándolo del escritorio (0,3 s) y después la
  regla.
- 3 (separado de la oreja, brazo raro, borde izquierdo) → la regla (delante del pecho); P5 y P8 vuelven a estar centrados
  (la altura de cámara de la ronda 7 se mantiene: el bigote no tapa el ojo).
- 4 y 6 (Graciela: tamaño distinto, placa verde, atraviesa la cara al bajarlo) → la misma regla en P4b y P6 (ya no lo
  baja: lo tiene siempre delante del pecho y en P6 lo mira); pantalla de llamada / chat visible, bisel y cámara.
- 5 (tríptico) → celulares de escala 4,4 en escalera de punta a punta (x ±0,37, sin encimarse), márgenes ~120 px arriba
  y abajo, bisel y cámara; cámara 3,04 → 2,98.
- BAJAS: en Q3 el celular sube menos (no tapa el bigote) y la mano lo agarra más abajo y atrás (no tapa "Nada nuevo");
  "Pedidos de hoy" a 64 px de lienzo.
Pasadas: r8a/r8b/trip (puntuales), r8 (cada 0,2 s en 7,86-14,13, 15,08-26,2 y 28,72-36,39, ±0,04 en 14 cortes, cada
0,5-1 s del resto; 168 cuadros). `check --json`: 0 errores.

## Ronda 9 (15-11) · mínima
**Duración 36,39 s** (sin cambios en tiempos ni cámaras).
- Tríptico → dos arriba (Marta, Walter) y uno abajo (Graciela), escala 6,0, sin rotación: llenan ~80 % del cuadro con
  ~80 px de margen; textos ≥ 43 px en cuadro.
- Graciela en P6 → el celular 7 cm más abajo (debajo del mentón con aire; `celEnPecho(..., bajar)` solo en P6) y mira menos
  hacia abajo (cabeza 0,22, ojos -0,45: párpados abiertos).
- "Ocho." → globo más arriba (by - 740): la cola no toca la coronilla.
- Sorbo de Q3 → la mano 4 cm más abajo: la bombilla llega a la boca.
Pasada r9: cada 0,2 s en 12,2-14,1, 18,25-19,0, 32,3-33,2, 35,1-35,6 y ±0,04 en sus cortes. `check --json`: 0 errores.
