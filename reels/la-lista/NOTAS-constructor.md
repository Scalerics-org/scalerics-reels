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
