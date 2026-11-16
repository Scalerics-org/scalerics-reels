# estetica-turnos · notas del constructor (16-11)

Proyecto como dice-cuarenta: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`. `assets/personajes.js` = el de dice-cuarenta +
`ELENCO.lorena`, `ELENCO.vale`, `ELENCO.carolina`, `ELENCO.jimena`, `ELENCO.mariana` (peinados existentes: mediaCola,
coletaAlta, coleta, rulos, rodete). Graciela = `ELENCO.clienta`, Sofi = `ELENCO.sofi` (render target al celular parado).

**Duración: 36,41 s** (ronda 1 de revisión independiente). Parte 1 0-16,91 (insertos de la agenda tachándose en
3,18 / 4,96 / 8,35, 0,38 s cada uno; pausa P4 8,73-10,13; P6b desde 16,15) · cartel 16,91-19,36 (el iris abre 19,31-19,61
desde la cara de Lorena, 557/1100 px) · parte 2 19,36-36,41 (Q1b 21,03 · Q2 22,73 · Q3 24,63 · Q3b 25,28 · Q4 27,53 · Q4b 29,84 ·
Q5 32,6 · "Comentá TURNOS" 33,1 · línea chica 33,71). Los tiempos exactos salen de `assets/tiempos3d.js`.

## Comandos (desde reels/estetica-turnos)
```
bash partes/reintentar.sh        # tomas que faltan (LINEAS=, TOMAS=); de a una por la cuota de Gemini
bash partes/medir-tomas.sh       # recorta silencios a partes/rec/ y mide duración + "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh          # arma assets/voice/ desde las tomas elegidas (filtro de audio de celular en c1, j1, c2)
node gen.mjs                     # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana ni tarjetas
python3 medir.py                 # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre       # snapshots con el candado
```
`window.__cam = [px,py,pz,mx,my,mz,fov]` fija la cámara (depuración).

## Voces (partes/procesar.sh)
c1 01-carolina-a (atempo 1,06 + celular) · l1 02-lorena-b · j1 03-jimena-a (sin atempo, solo highpass 250 / lowpass 5000: con el filtro de celular el STT oía "lotería"; la única con "era
hoy") · l2 04-lorena-c · c2 05-carolina-b (atempo 1,06 + celular; las c/d decían "guardaste") · l3 06-lorena-a ·
narrador 07-narrador-c (Rasalgethi, toma nueva, 2,33 s) · l4 08-lorena-a · g1 09-graciela-e (el STT oye "me lo quedó";
las otras 6 tomas el STT las oía "creo/quito/pido/tiro/bloqueo") · c3 10-carolina-d recortada a "¡Llegué! Pagué la seña." (pausa acortada, atempo 1,06; oyó: "llegué pagué la seña") · l5 11-lorena-a
(-1 dB) · s1 12-sofi-a (atempo 1,1, lowpass 7 kHz). Todas con "oyó:" igual al texto salvo g1 (acento) y s1/c2 (el STT no
marca la tilde de "comentá"/"guardás").

## Mundo
Gabinete z -3,05..0 (pared del fondo con reloj a la izquierda y ventana con persiana a la derecha), arco ancho en z = 0,
recepción z 0..4,45 (mostrador en z 3,2, estante y cartel en la pared del fondo, puerta de vidrio a la derecha, sillón
de espera a la izquierda). Camilla girada 0,55 rad (cabecera atrás a la izquierda), lámpara lupa sobre la cabecera,
carrito a la izquierda, Vale en el banquito a la derecha. Living de Graciela en x = 30. Los insertos (reserva, tríptico,
tablet) son pegados a la cámara como en dice-cuarenta.

## Pasadas
- Armado (probar.mjs, hojas c1-c3, p1-p3): cámaras dentro de las cabezas (los personajes tienen cabeza de 0,6 m: planos
  medios a 2 m); la camilla a lo largo de z no se leía → girada 0,55 rad; Vale cortada en el borde → x 0,78; la placa
  "Lorena Estética" de la pared se veía de espaldas; la tablet tapaba la cara de Lorena en Q1 → corrida a la derecha;
  textos de la tablet encimados ("limpieza facialseña").
- Pasada 1 (hyperframes snapshot cada 0,5 s desde 0): P3 con el pelo de Lorena tapando media pantalla → cámara del lado
  derecho; audio de 17:52 cortado a los costados → tres renglones; tríptico con "Hola, Carolina" y "Martes 10:00" cortados;
  Q1 primer plano demasiado cerca; Carolina entraba rozando la cámara; Carolina con cejas de enojo al hablar; Q4b con
  Carolina tapando a Lorena → otro ángulo; Q5 con el celular de Sofi cortado.
- Pasada 2 (cada 0,5 s desde 0,25): link y "Te mando el link." encimados; Q5 tablet cortada a la derecha → plano más
  abierto (la tablet escalada 1,35 para que los textos lleguen a ~36 px). `check --json`: 0 errores.

## Pendiente / para los revisores
- Los cisnes se leen chicos en P2/P3 (se ven, pero el corazón no se lee de frente con claridad).
- Las transformaciones de las toallas son escala + vaivén de manos, no manipulación detallada.
- P6: Lorena mira la agenda (ojos casi cerrados, sin hablar).
- Duración 42,5 s (pedido ~34).

## Ronda 1 de revisión independiente (16-11)
- Arte: Q5 reencuadrado (tablet y celular de Sofi enteros entre "Comentá TURNOS" y la línea de abajo, push-in lento;
  celular de Sofi en x 0,64); Q1 nuevo (Lorena en x -0,5, la tablet fuera de cuadro, notificación de Carolina sin cola
  arriba, "Te mando el link." debajo de la cara, el link abajo, celular escala 1,6); sin carteles "Lorena Estética" en la
  pared ni en el mostrador (en la pared, el cuadrito de la hoja); los cisnes de la parte 2 en el estante de la pared;
  rótulo de la plata solo en P4; agujas del reloj más distintas; insertos de la agenda (I1-I3: cámara pegada a la hoja,
  brazos de Lorena ocultos, la lapicera sola con la punta en la tachadura); cisnes del regazo de perfil (alineados con x
  del mundo); P6 con ojos abiertos, la mano se corre y se lee "15:00 Carolina" antes de "Te lo guardo." (que ahora va en
  P6 y P6b); avatar de Jimena con coleta al costado cobriza; tablet con etiquetas en pastilla y "Facturado jueves: $ 5.400";
  tríptico con márgenes y servicio en dos renglones; Graciela con un cuadro de paisaje; Vale agarra la toalla doblada que
  está sobre la camilla desde el cuadro 0; audios y chats sin cola (son notificaciones).
- Sonido: cartel con whoosh -35 en P1-0,15 y stinger -33; duck de la música bajo voz 0,3; pausa 0,5; whoosh en cada inserto.
- Guion: "La cosmetóloga cobra igual", "audio", línea chica "Agenda online · seña · / recordatorio · lista de espera",
  "y te mando cómo funciona" debajo de TURNOS.
- Ojo al verificar: `hyperframes snapshot` con tiempos muy juntos (cuadro a cuadro) captura el canvas 3D atrasado
  (muestra el estado de un pedido anterior); para los cortes usé un puppeteer propio que llama `__tresDbg(t)` (en el
  scratchpad de la sesión, probe/probar.mjs). Las pasadas cada 0,5 s y los cuadros sueltos sí salen bien.
- Pendiente (BAJA, no tocado): Lorena de espaldas en P1/P4/P6b sigue siendo la masa de pelo en el tercio izquierdo
  (la placa y el push-in la mejoran poco); la boca cerrada sigue siendo una línea fina.
