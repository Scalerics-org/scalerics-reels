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

## Duración y mezcla
**44,63 s** (final 44,70). Parte 1 0-20,15 · cartel 20,15-22,38 · parte 2 22,38-44,63 = 22,25 s (49,9 %). "Comentá CUOTA" desde
41,34 (en "Comentá"), línea chica desde 43,13. Mezcla: voz ≥ +6,4 LU sobre el resto en todos los tramos de 0,5 s
(`MEDIR=1 node gen.mjs && python3 medir.py`); final -14,1 LUFS, pico -5,1 dBFS. `check --json`: ok, 0 errores (1 warning de
estructura del canvas, el mismo de veterinaria).
Cortes (s): P2 2,58 · P2b 3,96 · P3 4,91 · P3j 5,86 · P3b 7,72 · P4 9,88 · P4i 12,71 · P5 13,81 · P6 15,16 · P6b 17,29 ·
cartel 20,15 · Q1 22,38 · Q1i 23,08 · Q1b 25,43 · Q2 27,35 · Q2b 29,75 · Q3 33,18 · Q4 39,34 · Q5 41,20.

## Render
`hyperframes render --workers 2`: ~1950 s (32,5 min, SwiftShader, con el otro constructor en paralelo); recodificación del
paso 10: ~90 s.

## Pasada 1 de arte (render 1, cuadros cada 0,5 s en renders/qa1)
- 2,0 s Ceci con los ojos cerrados en "Ahora me fijo." (parpadeo extra + mirada muy abajo) → sin ese parpadeo, mirada -0,4.
- 5,0 s "No cierra" en y ≈ 1510 (zona de botones) → y 1380.
- 6,0-7,5 s Joaco de espaldas/perfil → giro abierto a cámara (ahora de frente, la cabeza hacia Ceci).
- 20,0-22,0 s el cartel no llegaba a mostrar "más tarde…" (entraba a 1,56 s y se iba a 1,83 s) → entra a 1,12 s.
- 22,5 s Alicia con los ojos cerrados en la cocina (parpadeo + mirada abajo) → sin parpadeo, mirada -0,35.
- 30-32,5 s Q2b: Ceci y Joaco arriba y cortados, mitad de abajo mostrador vacío → cámara más alta y cerca; Joaco detrás del
  mostrador junto a Ceci.
- 39,5-40,5 s Q4: Ceci cortada y la notificación sobre la boca → plano medio más abierto, la notificación abajo a la derecha
  (y ≤ 1495); cejas de "Y exhalamos." sin la pena.
## Pasada 2 de arte (render 2, cuadros cada 0,5 s desfasados 0,25 s en renders/qa2 y cuadro a cuadro ±3 en cada corte,
renders/cortes/todo.png: sin flashes ni saltos en los 19 cortes)
- 9,75-10,2 s P4: Alicia entraba de espaldas pegada a la cámara (media pantalla de pelo) → entra desde la derecha, a lo
  largo del mostrador; y quedaba encima del reformer de la izquierda → 12 cm más atrás.
- P4-P5: el celular de Alicia no se veía en alto y la guía "Pagado a la peluquera" terminaba en su cara → el celular en la
  derecha, en alto hacia Ceci, y la mano izquierda al pelo en "mechas".
- Portada: plano propio (VER=portada): Ceci incrédula detrás del mostrador, Alicia sonriente con el celular en alto, la
  pizarra con "?" atrás; caras en la mitad de arriba; chica "Día 10." (la escena es la recepción, no la clase).
- Render 3 (con lo de la pasada 2): ~32 min; revisado P4-P5 (9,7-14,3 s, 4 cuadros/s): Alicia entra desde la derecha, el
  celular en alto, sin tapar la cámara. MP4 final: renders/pilates-cuota-final.mp4 (44,70 s, -14,1 LUFS, pico -5,1 dBFS).

## Lo que sé que todavía está flojo
- En P4 (10,2-12,7 s) el celular de Alicia, de canto, roza la mejilla de Ceci en pantalla.
- El reformer en el cuadro 0 se lee por el carro, los apoyahombros y las correas; la barra de pies y los resortes quedan
  detrás de Alicia (se ven en P4/P5 y en los reformers del fondo).
- P3j: Joaco grande y con el brazo de la mochila algo raro (la mano al hombro).
- El chip "Pagaron 23 de 40" tapa la fila "Caro" de la pizarra en P2b.
- El panel del cierre (Q5) tiene "Mensajes de cobro a mano" a ~40-48 px; el resto de los textos ≥ 50 px.
- 44,6 s: más largo que los ~37,6 s del plan (las tomas reales); la parte 2 queda en 49,9 %.
