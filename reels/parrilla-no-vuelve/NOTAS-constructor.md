# parrilla-no-vuelve · notas del constructor (16-11)

Proyecto como estetica-turnos: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`. `assets/personajes.js` = el de estetica-turnos +
`ELENCO.raul` (pelo corto entrecano, barba canosa completa con bigote gris, camisa navy claro de manga corta, delantal
crema con borde verde oscuro: nada que ver con Rubén) y `ELENCO.fabian` (jopo negro, camisa blanca, chaleco navy, trapo
crema al hombro). Walter = `ELENCO.walter`, Graciela = `ELENCO.clienta`, Sofi = `ELENCO.sofi` (render target al celular
parado, buzo navy claro con franja crema como en estetica-turnos). Extras: 5 adultos + un nene (`EXTRA_CFG` en tres.js) para
la ráfaga y las amigas de Graciela; los comensales de fondo son siluetas simples del mismo estilo (`crearComensal`),
fusionadas por estado del salón (SwiftShader: pocas llamadas de dibujo).

**Duración: 37,93 s** (1138/30). Parte 1 0-16,41 · cartel 16,41-18,54 · **parte 2 18,54-37,93 = 19,4 s, 51,1 %**.
"Comentá VUELVE" desde 35,47 (en la palabra "VUELVE") · línea chica desde 35,88.

## Comandos (desde reels/parrilla-no-vuelve)
```
LINEAS=partes/lineas.tsv TOMAS="a b" bash partes/reintentar.sh   # tomas (de a una por la cuota de Gemini); extra.tsv = retomas
bash partes/medir-tomas.sh       # recorta silencios a partes/rec/ y mide duración + "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh          # arma assets/voice/ desde las tomas elegidas (atempo, pausas internas recortadas)
node gen.mjs                     # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana ni tarjetas
python3 medir.py                 # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre       # snapshots con el candado
```
`VER="cam:px,py,pz,mx,my,mz,fov"` en el entorno de gen.mjs fija la cámara (depuración).

## Voces (partes/procesar.sh, partes/voces.md)
Raúl = Iapetus, Fabián = Achird (decisión del coordinador), Walter = Umbriel, Graciela = Gacrux, Sofi = Achernar,
narrador = Rasalgethi. w1 (Walter, "¡Impecable, Raúl! ¡Volvemos!") y w2 ("¡Raúl! ¿Te acordás de mí?") son la MISMA toma en
la parte 1 y en la 2 (callback). Todas con "oyó:" igual al texto (el STT no marca tildes: "Comenta", "avisas").

## Mundo
Pared del fondo z = -3 (navy claro liso): la parrilla a leña (x -1,3: base de ladrillo navy3, parrilla en V inclinada con
canaleta, cama de brasas plana naranja, tira con huesitos, 4 chorizos con cortes, 2 morcillas (una abierta), provoleta en
su provoletera) con la campana de chapa y el brasero con troncos y llamas planas a la izquierda; el paso (x -0,45..0,25,
donde se paran Walter en P1/Q1c y Fabián en P2); la mesada (x 0,61: tablet en atril y el celular parado de Sofi, solo en la
parte 2); la puerta de calle con "Parrilla Raúl" en vinilo y campanita (x 1,3); la pizarra de tiza (x 2,45). El salón hacia
+z: 10 mesas con mantel crema a cuadros navy, sifón, botella sin etiqueta, panera. Ventilador de techo que gira en
febrero. Estados del salón: SÁBADO lleno, FEBRERO vacío (3 mesas), FEBRERO lleno (parte 2, Graciela y dos amigas con la
provoleta). Living de Graciela en x = 30 (el de estetica-turnos). Insertos pegados a la cámara: contactos de Raúl (P6),
tarjeta de puntos de Walter (Q1b), panel de la tablet (Q2/Q3).

Sonidos nuevos CC0 (BigSoundBank, ver fuentes.md): chisporroteo, fuego, salón, grillos, ventilador, tiza.

## Armado (hojas renders/snap/a1-b5)
- Personajes de cabeza grande: los primeros planos quedaban DENTRO de las cabezas (P2, P6b, Q4b, Q5) → planos a 2-2,5 m.
- Raúl y Walter se pisaban la cabeza en el cuadro 0 → cámara desde la izquierda, Walter en el paso.
- La puerta y la pizarra cambiaron de lugar para que el plano general vertical tome la parrilla y la puerta a la vez.
- El abrazo cruzaba los brazos (parecía un choque de puños) → brazos abiertos los dos, sin contacto.
- El humo lavaba la cara de Raúl → más tenue y a la izquierda; la pinza en alto le cruzaba la cara → pinza vertical al costado.
- La pizarra quedaba cortada (Catmull que se pasaba) → clave repetida; el brazo de Fabián (prop) con mano, pulgar y nudillos.
- Mesa D de frente a cámara: solo comensales de espaldas; el comensal frente a Walter en Q1 se sacaba (cámara adentro).
- Burbujas de P1/Q1c abajo (sobre la base de la parrilla), no encima de la cara de Raúl.

## Pasada 1 (cada 0,5 s desde 0: renders/snap/f1a, f1b, f1c)
- La ráfaga apilaba las burbujas (la de la mesa anterior seguía debajo de la siguiente) → cada par dura hasta que entra el
  próximo; sin fundidos de salida (la opacidad dejaba texto fantasma), corte seco.
- P6b: Raúl con cejas de enojo → cara seca pero neutra (cejas sin fruncir, una apenas levantada).
- P7b (Fabián se encoge): el brazo de Walter asomaba en primer plano → Walter fuera de ese plano.
- Q1: Walter con cejas de enojo por la cámara alta → mira menos hacia abajo, cejas alegres.
- Q1c: Raúl cortado en el borde y la tablet afuera → cámara más a la izquierda y la tablet a la izquierda de la mesada.
- `check --json`: 0 errores (warnings de "dead_stretch": el canvas 3D cambia pero el chequeo no lo ve, como en estetica-turnos).

## Pasada 2 (cada 0,5 s desde 0,25: renders/snap/f2a-f2d; zonas tocadas en g1, g2)
- Contactos: la letra "C" asomaba sobre el buscador al hacer scroll → la lista se recorta debajo del buscador.
- Raúl caminando en P7 llevaba la pinza colgando hasta el piso (parecía un bastón) → la lleva en alto, al costado.
- El iris de la parte 2 se abría en el medio del texto del cartel ("de p●ntos") → se abre desde abajo (y 1560).
- Q1c: Raúl decía "¡Te espero, Walter!" con los ojos cerrados (cara feliz) → sonrisa con ojos abiertos.
- Q4b: la pinza en alto le cruzaba la cara → brazo hacia adelante, apuntando a Walter por encima de la parrilla.
- Walter parpadeaba justo en el corte del iris → el parpadeo pasa adentro del inserto.
- Portada: fondo LIMPIO del cuadro 4,2 s con la cámara más abierta (portada-src/fondo-portada-4.2.png). portada.mjs pide
  el mp4 aunque haya fondo_limpio: se corrió con un mp4 provisorio de 1 cuadro en renders/ (borrado después).

Mezcla final: voz ≥ +11,3 LU sobre el resto en todos los tramos con voz, -14,0 LUFS, pico -6,2 dBFS (antes del render).

## Pendiente / para los revisores
- El brazo de Fabián en la pizarra (P4) es un brazo suelto (manga + mano) que entra por la derecha: el personaje entero no
  llega a la pizarra con estas proporciones.
- La "palmada" de P1/Q1c es la mano de Walter que llega al hombro de Raúl; el abrazo de P7 quedó en brazos abiertos sin
  contacto (el contacto cruzaba los brazos).
- Q4b es plano sobre el hombro de Walter: su cabeza ocupa el tercio derecho a propósito.
- Los comensales de fondo son siluetas simples (sin piernas, tapadas por el mantel); en el plano general del sábado hay
  cabezas de espaldas abajo del cuadro.
- Duración 37,93 s (pedido ≤ 38): la toma de "Walter. Tira y morcilla dulce. Faltaste dos sábados." dura 3,6 s aun con atempo.

## Ronda 1 (16-11, sobre qa-ronda-r1.md)
**Duración 36,83 s** (1105/30). Parte 1 0-16,25 · cartel 16,25-18,38 · **parte 2 18,38-36,83 = 18,45 s, 50,1 %** · 0,4 s
de aire después de "parrilla". Recorte: Q1 sin voz -0,25, ráfaga en dos pares, pausas de P2/P6/P7, Q2/Q3/Q4 más justos.
Arte (altas):
- A1 sin travelling a la pizarra: corte seco con push-in corto (la cámara atravesaba la cabeza de un comensal); el salón se
  oculta en ese plano.
- A2 la pizarra es vertical (0,95 × 1,45 m) y llena el cuadro; sin brazo: el trapo borra solo "SÁBADO" (se ve el borrón) y
  la tiza escribe sola "MARTES · / FEBRERO". Material sin luz (la lámpara la partía en dos).
- A3 la puerta abre a 90° antes de que Walter aparezca; Walter arranca en el vano (sin atravesar hoja ni marco) en P7 y Q4.
- A4 "¡Obvio, maestro!": brazos abiertos a los costados (la pinza hacia afuera, lejos de la cara); el delantal es un torno
  que sigue el torso (personajes.js: antes era un cilindro abierto más ancho que de costado flotaba); Raúl gira la cabeza
  hacia Fabián (fuera de cuadro, junto a la cámara) y el contraplano P7b muestra a Fabián encogiéndose.
Arte (medias): pinza en alto al costado en P1/Q1c · el celular de P6b ya no se hunde (cambio de pose instantáneo en el
corte) · Q5 abre con la tablet y el celular de Sofi juntos (rótulo "Walter volvió ✓" con línea guía) y después va a Sofi ·
Sofi sin franjas en el torso, cuello crema y vincha con auriculares (cámara más abierta para que se vean) · Q1c más abierto
(Raúl y la tablet enteros) · Q4 se acerca a Walter mientras entra (de 3/4, no de espaldas) · insertos sin la mano y la
tarjeta de puntos con el premio siempre visible (gris hasta la visita) · el atril entra con un pop chico (sin aparecer de la
nada) y el celular de Walter tiene las cámaras atrás · la tira: carne marrón con los huesos redondos al ras del corte (ya no
palitos blancos), chorizos más oscuros; el brasero con los troncos y las llamas sobre la base, a la izquierda de la parrilla
(entra en el cuadro 0).
Arte (bajas): panel con las filas desde el arranque · filtro de febrero al instante · botón "Aviso enviado" entero · sin el
círculo navy de los insertos · sin las burbujas del borde del cartel · "3" tachado fino · textos de "Buscar" y "última visita"
más grandes. NO: la línea guía de "112 cubiertos" sigue pasando cerca de cabezas de comensales (cualquier lugar abajo del
plano general las cruza; es baja).
Sonido: Q4b hace un push-in sobre Raúl en "Faltaste dos sábados" (el corte a Walter, Q4c, quedaba detrás de la tablet o adentro de su cabeza) · 0,26 s con la cara de Raúl antes de "¡Obvio,
maestro!" · palmada, pinza y tela +3 dB.
Guion: la ficha dice "4ª visita · viene cada 2 semanas" (sin "Pide") y descripcion.txt "quién vuelve y cada cuánto viene" ·
Graciela "hace 5 semanas" · la ráfaga en dos pares que entran y salen juntos, misma letra (72 px) · chip "Un mes después"
antes del contador · "¿Quién" en el recuadro verde · "PARRILLAS" sale con fundido. NO: "Faltaste dos sábados" queda (está en
la voz grabada y cuadra: viene cada 2 semanas y faltó 5 → dos visitas).
Revisado: pasada completa cada 0,5 s de 0 a 36,5 (renders/snap/r1p1-r1p4) y zonas retocadas después (r1c, r1d, r1e: P7,
Q1c, Q4, Q4b). Mezcla: voz ≥ +10,0 LU, -14,0 LUFS, pico -6,2 dBFS. `check --json`: 0 errores. Portada rehecha (mismo plano,
delantal nuevo). Q4: el empuje hacia Walter es casi todo de zoom (alto, por encima de las cabezas; el movimiento bajaba
sobre la mesa de Graciela).

## Ronda 2 (16-11, sobre qa-ronda-r2.md)
**Duración 37,27 s** (1118/30). Parte 1 0-16,45 · cartel 16,45-18,58 · **parte 2 18,58-37,27 = 18,69 s, 50,1 %**.
- ALTA puerta: la hoja abre 1,2 rad (no toca la mesada ni los platos, que pasaron al fondo de la mesada), ya está abierta en
  el corte a P7 y se queda abierta hasta que Walter pasó (después se ve cerrarse detrás); Walter está en el vano desde el
  primer cuadro y entra caminando (P7 y Q4). Sin aparecer de golpe.
- Abrazo: brazos abiertos a la altura del pecho, lejos de la cara (Raúl y Walter); Raúl mira a Fabián 0,4 s antes del
  contraplano (P7b más largo).
- Pelo de Raúl: peinado nuevo `cortoCano` (personajes.js): casquete pegado al cráneo con la frente despejada, sienes y nuca
  canosas; sin flequillo ni ceja gruesa (la "doble ceja" era el flequillo). Portada regenerada.
- La tira: carne abultada entre hueso y hueso, marrón dorado tostado, con los cortes de hueso como óvalos crema y la médula
  arriba, y la grasa dorada en un canto; sin la textura a rayas.
- Q5: la tablet de cerca llenando el ancho (la fila verde "Walter volvió hoy" se lee) con el rótulo abajo sin línea guía;
  después paneo a Sofi.
- Sofi: render target 864×1536 (sin dientes de sierra) y el logo más abajo (no se corta).
- Graciela: cabeza derecha (la patilla no cruza el ojo) y "¡Vamos el martes!" debajo de la tarjeta del aviso.
- Bajas: la ficha de Q1c apunta a Walter (la tablet era diminuta) y sin la lámpara que pasaba pegada a la cámara · panel
  con filas desde el primer cuadro y febrero sin filas viejas · pinza más gruesa · la burbuja de Walter desde el cuadro 0 ·
  pizarra más cerca · textos chicos subidos ("Tu tarjeta de puntos", "aviso automático", "5 contactos", la ficha).
- Sonido: pausa de 0,3 s antes de "Faltaste dos sábados." (silencio insertado en la toma, procesar.sh) y whoosh en el
  push-in · respiro de 0,22 s antes de Q5 · pinza +5 dB · música +2 dB hasta el techo en los tramos sin voz · pasos de Raúl.
- Guion: portada.json con foco 30 %; guion.txt y plan.md sin "qué pide".
- NO (bajas): el cierre de la campera de Walter (es la tapeta del modelo de Walter, recurrente en otros reels) · el sliver a
  12,27 · los brazos de Fabián al encogerse · la línea guía de 112 · la banda navy bajo la pizarra (más cerca se corta el
  marco).
Revisado: pasada completa cada 0,5 s (renders/snap/r2p1-r2p4) y, después del ajuste final del pelo (sin los parches de las
sienes, que se veían como un disco claro) y del logo de Sofi (más chico y adentro del cuadro), r2b. Mezcla: voz ≥ +14,5 LU,
-14,0 LUFS. `check --json`: 0 errores. Portada regenerada.

## Retoque final (16-11, después de la ronda 3)
1. Portada: el acento de "¿QUIÉN" pisaba el "3" de "21:30." → `portada.json` con `"separacion": 34` (opción nueva y
   opcional de herramientas/portada.mjs: margen entre la línea chica y la grande; sin la clave, nada cambia para los otros
   reels). portada.png regenerada y revisada.
2. 14,1-14,8: Raúl gira hacia Walter en 0,35 s (mezcla del rumbo de la caminata al de frente, sin salto en un cuadro);
   camina con la pinza vertical al costado y al abrir los brazos la derecha (la de la pinza) va al costado, no hacia Walter:
   la pinza no toca la mano de Walter. Llega 8 cm más lejos.
3. Q4 (28,8-29,8): Walter dice "¿Te acordás de mí?" con las manos abajo, lejos de la boca.
Revisado cuadro por cuadro: renders/snap/ret2 (14,1-14,8 a 30 fps) y ret3 (28,8-29,8 cada 0,1 s). `check --json`: 0 errores.
