# dist-cartera · notas del constructor (24-11)

Proyecto con la forma de dist-quien-debe: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`, armada para este reel con la infraestructura de
dist-quien-debe (utilidades, `fusionar`, tarjetas pegadas a la cámara, globos con la cola a la boca, rótulos, catmull()
quieto después de la última clave, avatares por render target, la herradura de pelo de Rubén, el bigote que se esconde de
nuca, el muelle y la oficina de Rubén) y los pallets/racks/cajas de dist-cliente-grande. `assets/tres.js` se arma
concatenando piezas que quedaron en el scratchpad de la sesión; desde ahora se edita directamente `assets/tres.js`.
`assets/personajes.js` = el de dist-quien-debe + **Leo** nuevo en ELENCO (castaño oscuro texturado, barba de tres días,
chomba crema, campera de nylon verde apagado #365f28 abierta, pantalón navy2); la mochila (navy3 con franja verde, dos
correas) y el celular en el bolsillo del pecho (lado derecho) los cuelga tres.js.

## Comandos (desde reels/dist-cartera)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv; LINEAS=partes/lineas-r1.tsv TOMAS="d e f" para Marta/Nico)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-s1.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
bash paso10.sh                            # paso 10: loudnorm en DOS pasadas, lineal
```

## Voces
Ver `partes/voces.md`. Leo = Sadachbia (nuevo), Rubén = Algenib, Nico = Fenrir, Marta = Aoede, Sofi = Achernar. El narrador
es el audio de `reels/lo-mismo-que-la-otra-vez` ("Un sistema de clientes más tarde.", el STT lo oye igual) con atempo
1,08; el cartel dice "Un sistema" / "de clientes" / "más tarde…" (nota 1 del coordinador). Línea final de Rubén cambiada
a **"Treinta y ocho. Con nombre y apellido."** (nota 2: "Y ninguna camioneta" era críptico); el callback de la camioneta
queda en la tarjeta "Almacén Pérez · Carlos Pérez ✓ · Nota: camioneta roja" de Q2 con el rótulo "Hasta el de la
camioneta roja".

## Mundo
- Depósito (origen): mesa = 4 pallets + tabla + mantel en (0, 0, 0,82); la torta con "¡Suerte, Leo!" escrito y el
  cartelito "¡SUERTE, LEO!" de frente a cámara; vasitos, gaseosa navy sin marca, platitos; guirnalda crema/verde en
  z = -2,7; rack lleno al fondo (z -3,6) y otro detrás de la cámara del cuadro 0 (z 4,5, fondo de los planos frente al
  monitor); portón con franja de luz de tarde plana a la derecha; escalera a la oficina vidriada a la izquierda.
- Escritorio de Leo en (-3,1; -0,7): monitor 0,84 m (pantalla canvas 1280×800: la planilla en la parte 1, el sistema de
  clientes en la 2), teclado, mouse, silla corrida con la caja de cartón de sus cosas, archivador.
- Cafetería de Marta (x 40), muelle (x 60, de dist-quien-debe), oficina de Rubén (x 80, de dist-quien-debe; sin el mate de
  la mesa: Rubén tiene el suyo en la mano).

## Planos
P1 cuadro 0 (despedida) · P2 primer plano de Rubén · P3 Leo + P3i inserto del celular del bolsillo · P4 la planilla (la
línea de Rubén con burbuja sin cola abajo) · P5 Rubén frente al monitor, la cámara detrás del monitor · P5m Marta · P6
Rubén y Nico (detrás del monitor) · P6i inserto: la fila se tacha y se va · P6b los dos · cartel · Q1 = P1 · Q1r = P2 ·
Q1l Leo señala y la cámara viaja al monitor (Catmull-Rom) y se queda en la ficha (Q2 dentro del mismo plano) · Q3 = P6 ·
Q3m el monitor "Pasar cartera" y las 38 tarjetas que vuelan · Q3i el celular de Nico (llegan, 38 clientes ✓) · Q3b los
dos · Q4 Nico en el muelle · Q4m Marta · Q5 el panel en la oficina · C Sofi a cámara.

## Duración
44,0 s (1320 cuadros). Parte 1 0-17,88 · cartel 17,88-20,63 · parte 2 20,63-44,0 = 23,37 s (53 %); cierre C 40,20-44,0,
tarjeta CARTERA desde 40,75 (el STT ubica mal "Comentá": el hueco de la k de "CARTERA" está en 0,43-0,50 s de s1).
