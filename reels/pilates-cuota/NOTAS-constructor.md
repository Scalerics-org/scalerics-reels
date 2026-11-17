# pilates-cuota · notas del constructor (17-11)

Proyecto como veterinaria-vacunas: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (escrita nueva sobre la base de veterinaria: utilidades,
tarjetas pegadas a la cámara, `hablar()` con la regla de burbujas, insertos, Sofi por render target). `assets/personajes.js` =
el de veterinaria + `ELENCO.ceci`, `ELENCO.alicia`, `ELENCO.joaco` (solo parámetros y peinados existentes: coletaAlta sin
flequillo, rodete, corto con barba) + la pose `piernasRectas` (sentada con las piernas estiradas, en el carro del reformer).
Sin perro.js (no hay perro).

## Comandos (desde reels/pilates-cuota)
```
TOMAS="a b" bash partes/reintentar.sh     # tomas (partes/lineas.tsv; LINEAS=otro.tsv para un subconjunto)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 / VER=portada
python3 medir.py                          # voz contra resto por tramos (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x                 # solo la capa 3D
flock /tmp/hyperframes.lock node prev.mjs "t1|px,py,pz,mx,my,mz,fov;t2" renders/prev/x   # con cámara por cuadro (para probar planos)
```
OJO: después de `VER=portada LIMPIO=1 node gen.mjs` hay que volver a correr `SINAUDIO=1 node gen.mjs`.

## Voces (partes/procesar.sh)
Ceci = Vindemiatrix, Alicia = Laomedeia, Joaco = Zubenelgenubi, Sofi = Achernar, narrador = Rasalgethi.
a1 01-alicia-f (la única donde el STT oye "marzo"; la a-e oían "marasso/mozo/más o"; Aoede tampoco: se quedó Laomedeia) ·
c1 02-ceci-b · j1 03-joaco-b (atempo 1,08; la a decía "le mandamos") · c2 04-ceci-a (atempo 1,08) · a2 05-alicia-b (atempo
1,15; el STT oye "el 2000" pero la cola sola da "Mirá") · a3 06-alicia-b ("hizo"; la a decía "hice") · c3 07-ceci-a ·
narrador 08-narrador-a (atempo 1,05 → 2,18 s, < 2,6: no hizo falta ya-lo-cargo) · a4 09-alicia-a ("¿Ya?" confirmado
aparte) · c4 10-ceci-b · c5 11-ceci-b ("7:02"; la a decía "7:11") · a5 12-alicia-b (atempo 1,18) · c6 13-ceci-b · f1
14-sofi-a (atempo 1,1 + lowpass 7 kHz). Callbacks con el MISMO audio: a1 en Q3 y j1 en Q2b.

## Mundo
Estudio: pared del fondo z = -2,65 (navy3 con listones crema arriba de 1,45 m), pared izquierda x = -4, ventanal en la pared
derecha x = 2,95 (vidrio crema; de noche navy). Cinco reformers (largo en z, poleas hacia +z, barra de pies en -z) en
x = -2,45 … 1,95, la fila en diagonal leve; Alicia en el de la derecha. Ceci de pie a la derecha del reformer (2,55, -0,55).
Recepción al fondo izquierda: mostrador en (-2,9, -1,75), pizarra de cuotas en la pared (textura que cambia: 2 "?" →
10 "?" con pop en P2b; en la parte 2 "HORARIOS"), laptop con el home banking, planilla, lámpara (luz puntual de noche).
Cocina de Alicia en x = 30. Insertos pegados a la cámara: el chat de Ceci (P2), el comprobante (P4i), la cuota (Q1i), el
panel (Q2). Tablet en atril + celular parado con Sofi solo en Q5.

Planos: P1 cuadro 0 (clase) · P2 chat · P2b pizarra · P3 22:40 Ceci con la laptop ("No cierra") · P3j Joaco · P3b Ceci
"No. Yo no persigo a nadie." + cascada "Enviados: 17" · P4 DÍA 11 Alicia entra · P4i comprobante · P5 la pausa (3 rótulos) ·
P6 Alicia "mechas gratis" · P6b Ceci "Inhalamos." + Flor + abre un ojo · cartel · Q1 cocina · Q1i la cuota · Q1b "¿Ya?
¿Así nomás?" · Q2 panel · Q2b Joaco y Ceci detrás del mostrador · Q3 = P1 · Q4 Ceci "Y exhalamos." · Q5 panel + Sofi.

## Armado (prev.mjs, renders/prev/a-g)
- a: P1 demasiado cerca y Ceci tapada por Alicia → Ceci a la derecha del reformer, cámara más atrás y alta; P3 por encima
  del hombro con la cabeza de Ceci como mancha y la lámpara tapando a Joaco → P3 frontal + P3j (Joaco solo) + P3b; P4/P6
  Alicia de espaldas → giro abierto a cámara, la cabeza hacia Ceci; chat vacío arriba → el chat se llena de arriba abajo.
- b-d: burbujas que no entraban (P3b, P6, Q1b, Q4) → cámaras más abiertas y el blanco más alto; Q2b Joaco de espaldas →
  detrás del mostrador junto a Ceci; Q5 tablet cortada → tablet y celular de Sofi juntos y de frente; inserto de la cuota
  con la mitad de abajo vacía → contenido más grande y celular más corto; rótulo de Q1i fuera de la zona de botones.
- e-g: pizarra con nombres y marcas juntos (la columna MARZO al lado del nombre); la maceta de adelante tapaba a Ceci en
  P1/Q3 (sacada); el aro mágico flotaba como un círculo negro en el cuadro 0 (movido); la línea chica del cierre tapaba
  "Mensajes de cobro a mano: 0" → una línea, más abajo (y ≤ 1484), y el panel más arriba.
