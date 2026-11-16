# dist-pedidos-lunes · notas del constructor (16-11)

Proyecto como dice-cuarenta: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). Las duraciones de las voces las lee gen.mjs con ffprobe (no hay LEN a mano). La escena 3D
entera está en `assets/tres.js` (utilidades, globos, avatares, fusionar() y cámara Catmull-Rom de la-lista/dice-cuarenta;
oficina nueva de mañana; depósito, racks, camión, cajas de aceite, zorra y operario de dice-cuarenta; rotisería de la-lista;
cafetería nueva). `assets/personajes.js` = el de dice-cuarenta. Rubén = `ELENCO.ruben` en todo el reel (herradura de pelo
canoso), Graciela = `ELENCO.clienta` con delantal crema, Nico = `ELENCO.empleado` con el maletín (crearMochila navy),
el operario de dice-cuarenta. Marta, Walter, Beto, Nelly, Fede y Sergio solo como avatar.

**Duración: 36,27 s** (parte 1 0-15,34 · cartel 15,34-17,74 · parte 2 17,74-31,91 · cierre 31,91-36,27).
Solución + cierre = 18,5 s (51 %). El cartel arranca antes de los 16,3 s.

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
