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
