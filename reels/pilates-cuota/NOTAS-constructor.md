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

## Ronda 1 (17-11, sobre renders/qa-arte-r1, qa-sonido-r1, qa-guion-r1)
**Duración 40,90 s** (final 41,0). Parte 1 0-19,93 · cartel 19,93-22,16 · parte 2 22,16-40,90 = 18,74 s (45,8 %). "Comentá CUOTA"
desde 37,77 (tarjeta 3,1 s con la cola de 0,15). Mezcla: voz ≥ +6,1 LU en todos los tramos, final -14,0 LUFS, pico -4,9 dBFS.
Cortes: P2 2,58 · P2b 3,73 · P3 4,58 · P3j 5,48 · P3b 7,34 · P4 9,37 · P4i 12,65 · P5 14,35 · P6 15,25 · P6b 17,33 · cartel 19,93 ·
Q1 22,16 · Q1i 22,66 · Q1b 24,57 · Q2 26,49 · Q2b 28,69 · Q3 32,34 · Q3b 33,87 · Q4 35,94 · Q5 37,75.
- Guion: sin "Uy. Entonces las mechas las debo."; Q2b Ceci "Sale sola, el día uno." (10b-ceci-a, Vindemiatrix); a2 =
  "¡Ceci! Te transferí el dos de marzo. ¡Mirá!" (05e-alicia-b, atempo 1,12): con "el dos" a secas (05c a/b/c, también con
  0,3 s de pausa y sin atempo, y "Mirá: te transferí el dos") el STT oía "2000" en TODAS; con "el dos de marzo" oye "el 2 de
  marzo mira". Rótulo "Le llega sola el día 1". Burbuja "Ceci, ¿te pagué marzo?" entera desde el cuadro 0.
- Comprobante 1,7 s, "CECILIA ·" / "PELUQUERÍA" en dos renglones de 100-112 px, subrayado rojo desde que entra, sin el
  número de comprobante. Gabi: 1,5 s en pantalla, 50-58 px. Chat: "Te pago el viernes" lo manda Caro (tiene "?" en la
  pizarra); nombres en navy. Chip "Pagaron 23 de 40" más grande, arriba a la derecha (no tapa renglones). Chip "DÍA 10 ·
  8:00" de Q3 arriba (y 170): ninguna burbuja lo tapa.
- Arte ALTA: 1) P5 con dos rótulos de tamaño fijo (60 px): el costo arriba a la izquierda anclado en la columna derecha de
  la pizarra, "Pagado a la peluquera" abajo a la derecha anclado en el celular; sin "La noche en el home banking". 2) P3b:
  Ceci a la izquierda del cuadro, panel "Enviados" más chico abajo a la derecha (3 burbujas, el contador siempre visible).
  3-4) Cierre: "Cobros a mano: 0", tablet y celular de Sofi juntos y enteros, la pizarra oculta (no asoman letras), capas
  HTML un cuadro más (el último cuadro mantiene "Comentá CUOTA" y scalerics.com), tarjeta ≤ 3,1 s. 5) personajes.js:
  `rodeteAtras` (Alicia: casquete inclinado atrás, la frente libre, cejas sobre la piel, rodete arriba atrás con gomita
  verde) y `cortoMechas` (Joaco: casquete inclinado + mechones redondos, sin el bloque de flequillo). 6) la mano de Alicia
  va al costado del pelo, por fuera de la cabeza (y solo en P6: el gesto de Q3 se fue con la línea).
- Arte MEDIA: celular de Alicia hacia su derecha y hacia cámara (no tapa la boca de Ceci); P6b palmas separadas y sin el
  celular flotando; remo más amplio, asas verdes delante del puño, apoyahombros bajos y navy; P3 con la pantalla del home
  banking como tarjeta y "No cierra" debajo (la laptop se ve de atrás); el chat entra con el primer mensaje en el corte (sin
  tirón); inserto de la cuota más grande; toalla doblada y fina; iris desde el celular de Alicia; Q4 sin Alicia (quedaba
  cortada) y los rótulos a la izquierda; sin la planta (el bulto facetado detrás de Ceci). BAJA: alumna del borde fuera,
  sombra sin dientes de sierra (bias), sin tiradores en la cocina y el celular de Alicia por encima de las manos, Ceci de
  noche sin párpados a media asta, mochila de Joaco colgada a la vista.
- Sonido: Q3 con contraplano Q3b a Ceci; tono de sala continuo de día (zumbido-largo, pasabajos, -44) y el duck de la pausa
  0,8 → 0,5; SFX del producto (chat, pizarra, cuota, panel) más arriba (-31 a -36) y sin duck de música ahí; duck de voz
  0,5 → 0,3; el segundo toque en "Confirmar"; tic cuando Ceci abre el ojo; sin el interruptor; f1 atempo 1,17 y cola 0,15.
- Portada: fondo del cuadro 0 (la clase del día 10, VER=portada con la cámara más cerca), chica "Día 10 del mes.", sello
  26 px más abajo (`sello_top` nuevo y opcional en herramientas/portada.mjs/.html, sin cambiar las demás portadas).
- Render final de la ronda: ~1600 s (26-27 min). Revisado sobre el MP4: cuadros cada 0,5 s (renders/qa3), P3b cada 0,25 s (contador "Enviados" visible, cara libre), Q3b (chip entero) y el último cuadro (con "Comentá CUOTA" y scalerics.com).
- No hecho: "Ceci" suena "si" en el STT (Laomedeia) y el "Un" del narrador débil (BAJA, tomas viejas); Q2b: "HORARIOS"
  sigue cortado en el borde izquierdo de la pizarra; el inserto de la cuota deja ~150 px lisos abajo en los estados 0-1;
  ~40,9 s (pedido 38-39; la toma de "el dos de marzo" y el comprobante de 1,7 s suman 1,3 s).

## Ronda 2 (17-11, sobre renders/qa-arte-r2 y qa-sg-r2)
**Duración 40,73 s** (final 40,8). Parte 1 0-19,17 · cartel 19,17-21,40 · parte 2 21,40-40,73 = 19,33 s (47,5 % del total; la
solución ya es más larga que el problema: 19,33 vs 19,17). Mezcla: voz ≥ +6,4 LU, final -13,9 LUFS, pico -4,8 dBFS.
Cortes: P2 2,52 · P2b 3,57 · P3 4,35 · P3j 5,15 · P3b 6,98 · P4 8,96 · P4i 12,09 · P5 13,69 · P6 14,59 · P6b 16,67 · cartel 19,17 ·
Q1 21,40 · Q1i 22,00 · Q1b 23,96 · Q2 26,08 · Q2b 28,38 · Q2c 30,20 · Q3 32,20 · Q3b 33,73 · Q4 35,80 · Q5 37,61.
- personajes.js: el cuello (cuelloAlto) entra en la cabeza (no queda la tapa del cilindro ni la franja de fondo bajo la
  barbilla; vale para todos los que usan cuelloAlto); `mejillasBajas` (Ceci, Alicia, Joaco: el rubor no pisa el blanco
  de los ojos); Alicia con medias navy (antes eran "bloques crema" en el carro).
- Boca doble: en bocaVoz la sonrisa se apaga mientras hablan (todos los personajes).
- Reformer dado vuelta: las poleas detrás de la alumna y la barra de pies hacia cámara; postes por fuera del marco;
  ejercicio "abrazar el árbol" (manos que se juntan adelante y se abren), las correas van a las poleas de atrás, asas
  verdes en las manos; cada correa a la mano del mismo lado.
- P6: el celular sigue en la mano de Alicia, lejos de la toalla (más corta). Q2b: pupilas paralelas, la tablet en alto
  (se ve sobre el mostrador con el panel); Q2c nuevo (push-in a Ceci en "Sale sola, el día uno.", la tablet hacia cámara
  con "39 de 40 · $ 117.000"). Q1b: el celular de Alicia muestra "Pagado ✓". Q4: las tarjetas al pecho. Q3b sin Alicia.
- Cierre: cámara desde más arriba (abajo la tapa del mostrador con la planilla, no el frente liso), Sofi en plano medio,
  tablet y celular enteros con margen. Joaco sin mochila. Sin el aro negro.
- Bajas: chip "Pagaron 23 de 40" más chico y "MARZO" de la columna izquierda bajo el título (no lo tapa); "HORARIOS" más
  chico y adentro; inserto de la cuota con textos ≥ 44 px; P3b desde más arriba (tapa del mostrador con laptop y planilla);
  sombra con el frustum ajustado; guía de "17 cuotas" a un "?" (Pao); dos pops para dos rótulos; iris desde el celular;
  panel del inserto 5 % más chico; P6b sin taza ni lámpara; Alicia entra más adentro del cuadro.
- Revisión sobre el MP4: cuadros cada 0,5 s (renders/qa4) y diferencia entre cuadros consecutivos (renders/qa4/difs.txt):
  los 25 picos son los cortes, los mensajes del chat, el iris, "Confirmar" y la línea chica; ningún cuadro suelto.
- Render final: ~1600 s (26-27 min). Cierre revisado cada 0,5 s: tablet y Sofi enteros; la tarjeta "Comentá CUOTA" tapa el encabezado "Cuotas de marzo" de la tablet (los tres números se leen); abajo queda ~25 % de frente del mostrador.
- No hecho: el pelo de Ceci (casquete de la coleta alta) sin cambios; P5: la mano izquierda de Alicia cerca del borde; el
  inserto de la cuota mantiene algo de navy abajo; "Ceci" suena "si" (STT); "SCALERICS" de la portada en y≈1655 (es del
  molde de todas las portadas).
