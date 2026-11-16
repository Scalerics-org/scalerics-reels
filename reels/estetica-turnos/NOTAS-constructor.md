# estetica-turnos · notas del constructor (16-11)

Proyecto como dice-cuarenta: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`. `assets/personajes.js` = el de dice-cuarenta +
`ELENCO.lorena`, `ELENCO.vale`, `ELENCO.carolina`, `ELENCO.jimena`, `ELENCO.mariana` (peinados existentes: mediaCola,
coletaAlta, coleta, rulos, rodete). Graciela = `ELENCO.clienta`, Sofi = `ELENCO.sofi` (render target al celular parado).

**Duración: 42,54 s** (parte 1 0-17,95 · cartel 17,95-20,53 · parte 2 20,53-42,54; "Comentá TURNOS" desde 38,70;
línea chica desde 40,74). Más largo que el plan (34,4 s): las tomas reales son más largas (Sofi 3,77 s ya con atempo 1,1).
Si hay que recortar: el P4 (1,75 s de pausa), Q2 (2,6 s) o Q3 (3 tramos).

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
c1 01-carolina-a (atempo 1,06 + celular) · l1 02-lorena-b · j1 03-jimena-a (atempo 1,08 + celular; la única con "era
hoy") · l2 04-lorena-c · c2 05-carolina-b (atempo 1,06 + celular; las c/d decían "guardaste") · l3 06-lorena-a ·
narrador 07-narrador-c (Rasalgethi, toma nueva, 2,33 s) · l4 08-lorena-a · g1 09-graciela-e (el STT oye "me lo quedó";
las otras 6 tomas el STT las oía "creo/quito/pido/tiro/bloqueo") · c3 10-carolina-d (atempo 1,06) · l5 11-lorena-a
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

## Ronda 1 (16-11, sobre la revisión independiente del MP4 de 42,6 s)
**Duración 38,75 s** (parte 1 0-16,87 · cartel 16,87-19,32 · parte 2 19,32-38,75 = 50,1 %). Render 1876 s.
A1 tablet y celular de Sofi invisibles en la parte 1 · A2 mostrador a 0,9 m, Lorena más adelante, cámara alta (se le ve
el torso), cisnes sobre el mostrador a su derecha · A3 la tablet arranca "15:00 Libre / 16:00 Mariana / 17:00 Jimena" en
blanco; Carolina en verde al reservar, Jimena al confirmar · A4 aviso de Graciela arriba sin cola, cámara más baja ·
A5/A6 rótulos abajo sobre el piso: "3 turnos…" a la camilla, "A Vale se le paga igual" a su regazo, "$ 5.400 que no
entraron" se queda durante "Lo único puntual…"; P4 1,8 s · M1 "Cubierto en 2 minutos" con ajuste · M2 tríptico rehecho
(300 px, textos con ajuste, "Reprogramó / Martes / 10:00 ✓" a 54 px, llega a q2 + 0,05) · M3 sin círculos · M4 celular
con cámara, reborde y mano; tablet con cámara; pie de texto · M5 Q5: tablet ~85 % con "Camilla vacía: 0 h" a 76 px,
después push a Sofi (celular 1,9x); s1 a q5 + 0,2, atempo 1,15, cola 0,4 · M6 la tablet de Q5 ya verde · M7 el cartel no
entra en Q5 · M8 cielorraso crema (sin luz) · M9 P4 más alto y rótulos abajo · M10 horas en Lexend, agenda de frente en
P5/P6 · M11 "¡Llegué!" abajo · M12 pinza verde y mechas en la nuca de Lorena, coleta de Carolina con volumen,
`flequilloAlto` en Vale · M13 Carolina entra por la puerta · M14 cama +4 dB, SFX +6 dB sin voz (techo -31) · M15 push-ins
más marcados en P5, Q4, Q4b · M16 chat de Mariana blanco con tildes verdes · M17 portada desde el plano general (8,9 s).
Bajas: B1 B2 B3 B5 B7 B8 B9 B10 B11 B12. Mezcla: voz ≥ +8,5 LU, -14,2 LUFS, pico -5,2 dBFS.
