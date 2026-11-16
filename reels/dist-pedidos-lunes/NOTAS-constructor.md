# dist-pedidos-lunes · notas del constructor (16-11)

Proyecto como dice-cuarenta: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). Las duraciones de las voces las lee gen.mjs con ffprobe (no hay LEN a mano). La escena 3D
entera está en `assets/tres.js` (utilidades, globos, avatares, fusionar() y cámara Catmull-Rom de la-lista/dice-cuarenta;
oficina nueva de mañana; depósito, racks, camión, cajas de aceite, zorra y operario de dice-cuarenta; rotisería de la-lista;
cafetería nueva). `assets/personajes.js` = el de dice-cuarenta. Rubén = `ELENCO.ruben` en todo el reel (herradura de pelo
canoso), Graciela = `ELENCO.clienta` con delantal crema, Nico = `ELENCO.empleado` con el maletín (crearMochila navy),
el operario de dice-cuarenta. Marta, Walter, Beto, Nelly, Fede y Sergio solo como avatar.

**Duración: 37,46 s** desde la ronda 1 (parte 1 0-15,34 · cartel 15,34-17,74 · parte 2 17,74-33,48 · cierre 33,48-37,46).
Solución + cierre = 19,72 s (53 %). El cartel arranca antes de los 16,3 s.

## Comandos (desde reels/dist-pedidos-lunes)
```
node gen.mjs                      # todo (mezcla incluida); SINAUDIO=1 no rehace la mezcla; MEDIR=1 escribe stems
python3 medir.py                  # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre        # snapshots con el candado → renders/snap/<nombre>/ + hoja.png
LIMPIO=1 SINAUDIO=1 node gen.mjs  # sin capa plana ni globos (fondo de la portada); volver con SINAUDIO=1 node gen.mjs
```
`partes/voces.sh` (en paralelo) y `partes/voces-lento.sh` (de a una, con reintentos: la cuota de Gemini TTS por minuto
cortó la segunda tanda) generan tomas; `partes/recortar.sh` recorta silencios y pasa cada toma por el STT ("oyó:");
`partes/procesar.sh` arma las voces finales. Depuración sin hyperframes (canvas solo, rápido):
`/tmp/claude-0/dbg/probar.mjs` y `cam.mjs` (con el candado).

## Voces (partes/procesar.sh)
g1 01-graciela-c (atempo 2,0 = el audio a 2x + filtro de chat) · r1 02-ruben-b (atempo 1,08) · r2 03-ruben-a (1,08) ·
w1 04-walter-b (1,06 + chat) · r3 05-ruben-d · nar 06-narrador-d (1,12; entra en 2,28 s: el cartel dice "Un catálogo de
pedidos más tarde…", sin el fallback) · g2 07-graciela-b · r4 08-ruben-a (0,38 s de pausa natural después de "Siete.") ·
r5 09-ruben-b (1,08) · n1 10-nico-a · r6 11-ruben-d (1,1; generado con "pedidos" en minúscula; es la única toma en la que
el STT oye "comentá" con tilde). Todas con "oyó:" igual al texto, salvo g1, donde el STT no oye el "Y" inicial de "Y nada"
(se oye "nada, Rubén…"). Las tomas c/d de 01, 02, 05, 06, 09 y 11 están en partes/rec.

## Mundo
Oficina (piso y = 3,2; z 0..6,2): Rubén sentado en (0; 1,02) mirando a +z; escritorio z 1,25..2,75; monitor grande a su
derecha (x -0,66, girado 0,85); pared del fondo z = 0: vidrio de x -3,6 a -0,15 (el depósito y el camión por detrás),
crema de -0,15 a 3,6 con el reloj (R 0,34, en x 0,36), la puerta de vidrio esmerilado (x 0,95..1,75, se abre hacia adentro)
y el pizarrón LUNES; la ventana con la persiana en la pared derecha (x 3,6): sus franjas son un plano con textura de
rayas planas que se corre y gira en el time-lapse (pared y escritorio). Depósito abajo (z -16..0), pallet WALTER en
(-0,9; -5,4). Rotisería en x = 60, cafetería en x = -60.
Insertos de celular = POV: el celular quieto delante de los ojos de quien lo mira (el personaje oculto), una mano suelta
lo sostiene y un índice suelto toca (los dedos son 3D, hijos del celular).

## Mezcla
`MEDIR=1 node gen.mjs; python3 medir.py`: voz ≥ +8,9 LU sobre música+SFX en todos los tramos con voz; -14,0 LUFS, pico
-6,2 dBFS (antes del loudnorm del paso 10). TECHO -31 por efecto (cada uno más bajo). Música baja 80 % en la pausa de P6
(no se corta) y 50 % debajo de cada voz. Sin SFX nuevos (no se pudo bajar nada; ver fuentes.md).

## Pasadas de revisión
- Armado (canvas solo, s1-s4): POV con la cabeza de Rubén y su brazo tapando el celular → Rubén oculto en los POV; dedos
  gigantes → yemas finas para el zoom y dedos al 62 %; la mosca se iba fuera del celular al hacer zoom → zoom centrado en el
  7 y la mosca, mosca 35 % más grande; P1 con el globo tapando el reloj → globo angosto a la izquierda; P2/P6/C con la cara
  cortada → cámaras más atrás; inserto del monitor desbordado → ancho al 93 %; la grúa pasaba debajo del balcón y rozando
  la cabeza de Rubén; el operario de espaldas → detrás del pallet, de frente; el cartel WALTER cortado.
- Pasada 1 (hyperframes, cada 0,5 s desde 0): DISTRIBUIDORAS cortado en los dos bordes (128 → 106 px); el chat de Walter
  arrancaba con el mensaje de las 11:00 cortado por el borde (rehecho: abajo el de las 11:00, sube a las 8:04); globos de
  la ráfaga encimados (más aire); Nico invisible en Q4 (estaba parado en el piso del depósito, y = 0); Q4 con Rubén
  cortado a la izquierda (cámara más atrás); el iris de la parte 2 abría sobre una cabeza flotante; fila "Para armar"
  ilegible (38 px); parpadeo de Rubén en medio de "Cuatro minutos…" (movido).
- Pasada 2 (cada 0,5 s desde 0,25): el inserto del panel se movía solo antes de la grúa (la Catmull-Rom tiraba hacia la
  clave siguiente: ahora quieto hasta "Mandar a armar"); la bombilla cruzaba el ojo de Rubén en P7 (plano más de frente,
  la bombilla por debajo del bigote); tres globos de la ráfaga tapaban la cabeza de Rubén (quedan dos); el teléfono de
  escritorio en el medio del plano de Q4 (al otro lado del escritorio).
- Pasada 3 (sobre el MP4 renderizado, cada 0,5 s + cuadro por cuadro en cada corte): la grúa daba un tirón al final
  (Catmull-Rom entre claves casi iguales: ahora la grúa termina con un fundido lineal) y al arrancar pasaba por la pared
  crema y el reloj o rozando la cabeza de Rubén (ahora sale por la izquierda del monitor y cruza el vidrio); el iris de
  la parte 2 abría sobre el pelo de Graciela con el texto del cartel todavía visible (ahora abre desde su celular y el
  texto se va antes). Segunda vuelta sobre el render nuevo: sin defectos nuevos en los cortes ni en la grúa.
- Render: 831 s el primero, 851 s y 857 s los siguientes (SwiftShader, --workers 2, sin contar la espera del candado);
  re-codificación 72 s. Final: 36,4 s, -14,0 LUFS integrado, pico -5,9 dBFS, sin clipping.
- Portada: fondo LIMPIO del cuadro 12,6 s (copia del proyecto en el scratchpad), achicado y subido para que el reloj en
  11:00 y la cara de Rubén queden en la mitad de arriba (portada-src/fondo-portada-12.6.png).
`check --json`: 0 errores (warnings: canvas anidado en capa3d, canvas en el borde, "GPU stall" de SwiftShader).

## Pendiente / para los revisores
- El primer cuadro de la grúa (26,7 s) pasa por detrás de la cabeza de Rubén (se ve la nuca grande un instante).
- Q2 (la cafetería de Marta): el fondo del POV se lee poco como cafetería (se ve la mesada y la máquina de cerca).
- El sorbo de P7: el mate llega a la altura del mentón, no a la boca (para que la bombilla no cruce la cara).
- Los dedos de los insertos tapan a veces parte de la interfaz (el pulgar sobre el borde, el índice al tocar).
- Q4 es un plano general (Rubén chico) para que entren Rubén, el reloj y Nico en la puerta.

## Ronda 1 corrida 11:11
**Duración nueva: 37,46 s** (parte 1 0-15,34 · cartel 15,34-17,74 · parte 2 17,74-33,48 · cierre 33,48-37,46; tarjeta
34,40-37,46 = 3,06 s). Parte 2 + cierre = 19,72 s (53 %); la solución sola (17,74-33,48) pasó de 14,2 a 15,7 s.
Mezcla rehecha: -14,0 LUFS, pico -6,2 dBFS, voz ≥ +8,9 LU sobre el resto en todos los tramos (medir.py). `check --json`
0 errores. Barrido completo cada 0,5 s (renders/snap/s1, s2) y zonas tocadas (a1-a9).
Corregido:
1. ALTA, termo: se inclina hacia el mate en cada cebada y en la tercera se ACUESTA sobre el escritorio (la pose de P7) y
   queda así P4-P7; ya no vuelve a pararse antes del corte.
2. ALTA, Q4: cámara más atrás y centrada (0,5; z 5,45, mira a la altura de la cabeza): Rubén entero, reloj y Nico en la
   puerta; los biblioratos de adelante (el bloque navy y verde) pasan al grupo de los remitos y no están en la parte 2.
3. El iris abre sobre la cara de Graciela (IRIS_C 560,860). Q1 nuevo: plano general 0,42 s y push-in continuo (Q1b,
   `camAlCel`) por el eje de la pantalla hasta el celular EN SU MANO (sin corte a un POV); ella lo levanta para leer
   (celEnPecho baja 0,1 → -0,08) y baja la mano derecha; toca el dedo suelto. Lo mismo con Marta (Q2 general + Q2i).
4. Chip "Lunes, 8:00.": sale con fundido (antes subía y quedaba cortado).
5. Cartel WALTER corrido a x +0,4 del pallet y el operario a -0,62: la cara se ve.
6. Q2b: cámara desde el frente del monitor (fov 58): el panel se lee, Rubén entero a la derecha, el globo arriba sobre
   el vidrio (no tapa el encabezado). Queda cortada la palabra "Pedidos" del encabezado por el borde izquierdo.
7. Ráfaga: los globos a la izquierda (sobre el vidrio del depósito), apilados por altura real; Nelly en 3 líneas.
8. P6: cámara más baja y frontal, cabeza menos agachada (asiente 0,2): cara entera, boca lejos del borde; el globo
   (84 px) a la izquierda, el reloj entero a la derecha.
9. Chat de Walter: el audio que suena es una barra de reproducción fija abajo, ya no una burbuja montada sobre la de Beto.
10. Q2 con Marta en cuadro (pizarra CAFÉ · MEDIALUNAS, máquina de espresso, tazas); "Café en grano" ajustado al ancho;
    el "+" se toca desde la derecha (la mano no tapa Azúcar ni Leche).
11. Sin damero detrás del celular de Graciela: el fondo del inserto es ella (delantal, manga), el piso no se ve.
12. Nico: maletín nuevo (caja navy3 con franja y manija verdes, sin correas) en la mano derecha, delante, y lo levanta en
    "¿Vender?". crearMochila ya no se usa.
13. La baranda del balcón y los perfiles del vidrio van en un grupo aparte (PASO, sin fusionar) que se esconde mientras la
    grúa cruza; la grúa cruza más alta y mirando menos hacia abajo.
14. Encabezado del chat ajustado al ancho (con el "40" no se pisa).
15. Cierre: el mate baja al escritorio al empezar C (la bombilla ya no asoma junto a la cara).
16. Cierre: tarjeta 3,06 s (entra en r6 + 0,8, al terminar "PEDIDOS"; cola 0,3 s). Sin gesto extra.
19. Portada: fondo LIMPIO 11,8 s (P6 nuevo, reloj en 11:00) achicado al 80 % y subido 200 px sobre el mismo cuadro
    desenfocado (portada-src/fondo-portada-11.8.png): cara entera con bigote arriba del texto; `chica` "Lunes, 11:00.".
20. Cuadro 0: arriba del chat, Sergio · Bar "Lo de siempre." a las 7:52 (ya no Walter a las 8:04).
21. Solución más larga: Q1 +0,33 s (push-in), Q2 +0,6 s (Marta en su cafetería + push-in), Q3 +0,4 s (contador más
    lento, el pallet armado se ve 0,1 s más). La parte 1 no se tocó.
22. Catálogo de Marta: debajo del número, "bolsas de 1 kg" (ya no "Siete. Clarito.").
23. Encabezado del chat de P5: "Pedidos · Lunes".
24. Panel: "Lo de siempre + 2 de aceite" (igual que el chat).
Además: parpadeos de Rubén en la parte 2 atados a los beats (antes caían en medio de r4/r5/r6 al moverse los tiempos);
el globo de r5 se va antes de que entre "¿Vender?" (se pisaban 1 cuadro); "Pedido ✓ · Lo armamos hoy" ajustado al botón.
No corregido:
17. Ambientes de spiedo/espresso: no hay CC0 en assets/sfx y no se agregó nada nuevo.
18. "¿Y lo mío?" de Beto: a propósito (variedad en la ráfaga).
Para mirar en la ronda 2: en los push-in de Q1b/Q2i la cara del personaje pasa grande por arriba del cuadro durante
~0,2 s (es el push-in sobre su celular); en el inserto de Graciela asoma su nariz arriba, debajo del globo.

## Ronda 2 corrida 11:11
Duración sin cambios: **37,46 s**. Parte 2 de 17,74 a 33,48 s; cierre de 33,48 a 37,46 s; parte 2 + cierre = 53 %.
Mezcla rehecha (SFX nuevos): -14,0 LUFS, pico -6,2 dBFS, voz al menos +8,9 LU sobre el resto. `check --json` sin
errores. Snapshots de cada zona tocada (renders/snap/b1-b5) y pasada completa cada 0,5 s (renders/snap/t1, t2).
1. ALTA, el mate en el cierre: confirmé en un snapshot que en la ronda 1 se hundía (la mano bajaba a y 0,1 del cuerpo,
   debajo del escritorio). Ahora la mano lleva el mate y lo apoya entero en el escritorio (0,3; 1,86), al lado del
   teclado: se ve el mate con la bombilla (33,6-34,4 verificado).
2-3. Push-in a Graciela y a Marta: el celular lo sostiene la mano suelta del celular (dedos por los bordes, pegada al
   antebrazo; la mano de verdad se oculta), así no queda flotando ni el puño tapa la pantalla. La pantalla mira más
   hacia adelante (incl 0,5); el celular sube hasta despejar el mostrador o la barra mientras la cámara se acerca, y
   la cabeza baja (asiente 0,62/0,6): la cara sale por arriba del cuadro. Queda un instante (~0,2 s, 18,4 y 22,0 s)
   en que se ven grandes la frente o un ojo arriba del celular.
   Damero: el piso de la rotisería pasa a baldosas crema en dos tonos.
4. Q2b: fov 62 y la cámara mira 0,12 más a la izquierda: el panel entra entero ("Pedidos · Lunes", los nombres).
5. Grúa: el pasamanos verde de la escalera va también al grupo PASO, que se esconde mientras la grúa cruza.
6. Operario: visera más arriba (le despeja los ojos); cartel WALTER en x 0,28 para que la tablet no tape la R.
7. Cebadas: la mano agarra el cuerpo del termo (sigue la inclinación); el termo ya no ceba solo.
8 y 11. Q4: push-in lento sobre Rubén durante "Ocho y cinco…" (de z 5,45 a 4,2) y contraplano a Nico en la puerta
   (plano medio, maletín a la vista) para "¿Vender?" desde T.n1 - 0,12. El globo de r5 sube a cy 270.
9. Barra de audio del chat más arriba (y 900-1060) y más angosta: no la corta el borde ni la pisa el pulgar.
10. Portada: el cuadro a tamaño completo subido 400 px (sin inserto achicado, sin marco doble); los 400 px de abajo,
    detrás del texto, son el mismo cuadro desenfocado. Se ven la cara entera con el bigote y el reloj en 11:00 (cortado arriba).
12. SFX: k-cloth_1 cuando Nico levanta el maletín y whoosh-short en el corte a Nico.
13. SFX: madera-golpe suave (lp 1500, techo -42) cuando el termo se acuesta.
14. La planilla de la parte 1 se titula "Pedidos · Lunes".
Además: los dedos de la mano suelta del celular van más afuera (ya no tapan el principio de "Azúcar" y "Leche").
