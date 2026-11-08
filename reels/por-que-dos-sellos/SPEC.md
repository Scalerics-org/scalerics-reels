# por-que-dos-sellos · "¿Por qué…?" (3D real), 31,55 s

Serie "¿Por qué…?" (CLAUDE.md, puntos 9a + 8b + 8c), sin marcas. Estudio de campo verificado en `fuentes.md` (lavadero de
autos: tarjeta de 8 vacía contra tarjeta de 10 con 2 sellos de regalo; mismos 8 lavados; 19 % contra 34 % llegaron al
premio). Gancho en el cuadro 0: "¿Por qué algunas / tarjetas de sellos / vienen con **dos puestos**?" sobre la tarjeta de
sellos 3D con dos sellos verdes ya puestos y el sello de goma recién levantado. Producto: Scalerics Puntos. Callback:
Rubén y Graciela en el almacén (`personajes.js`); Graciela arranca con dos sellos de regalo en el celular, se va, le llega
el aviso, vuelve. Cierre: videollamada gratis en scalerics.com sobre la misma tarjeta, que recibe el tercer sello.

## Cómo está armado
- Base técnica: reels/por-que-el-final (armar.mjs, gen.mjs, cámara de claves con cúbica monótona) y reels/abren-hoy
  (almacén, personajes). Una sola escena Three.js (`assets/tres.js`), `renderAt(t)` puro, azar con semilla.
  `node gen.mjs && node armar.mjs`. Portada: `LIMPIO=1 node armar.mjs` deja solo la capa 3D para sacar `portada-fondo.png`
  (1,2 s); después `node armar.mjs` deja el index normal.
- **Fondo: navy claro `#16243d` liso** (rota el feed). Velo del mismo color arriba (600 px) solo para los subtítulos.
- Paleta: navy `#0b1220`/`#16243d`/`#1f3254`, verde `#5ce611` (sellos, lo resuelto, 34 %, 20 %), crema `#efeee5`
  (cartón de la tarjeta, auto), gris crema `#b4b2a3` (barra de 19 %); rojo apagado `#c7655b` SOLO para la tarjeta de 8
  vacía (borde) y el "0 %" / "vacía" / "cero".
- Fuente 3D: `assets/vendor/three/lexend800p.js` (Lexend 800 instanciada de `assets/fonts/Lexend-var.woff2` con fontTools;
  trae dígitos, "%", "?", "=", "+", "°"), para "19 %", "34 %", "8", "10", "=", "?", "0 %", "20 %".
- Cámara: PLANOS con claves [t, azimut, elevación, distancia, mira, fov]; dentro de un plano continua (sin cortes) de
  la tarjeta al lavadero, a las barras, a las dos tarjetas, al "?" y a la barra de progreso (0-20,9 s). Cortes secos con
  whoosh: al almacén (20,91), y del almacén al cierre (29,0). En el almacén, plano general de dos (Rubén detrás del
  mostrador, Graciela en la punta) con push-in lento; el celular grande va pegado a la cámara (`pegarACamara`).

## Objetos 3D
- **La tarjeta de sellos**: cartón crema (RoundedBox con canto), "TARJETA DE LAVADOS" en navy con raya verde, casilleros
  con aro navy grueso, estrella navy en el último (el premio). Versiones de 8 (borde rojo apagado) y de 10. Sellos: discos
  verdes con relieve y tilde navy calada, caen con squash. Aros verdes de resaltado ("mismos ocho").
- **El sello de goma**: goma verde oscuro, base navy con aro verde, cuello y mango de madera torneado (lathe).
- **El lavadero**: auto sedán genérico low-poly crema (perfil extruido, cabina de vidrio navy, ruedas, faros), espuma
  blanca (46 bolitas que respiran), arco navy con franjas verdes, dos cepillos verdes rayados que giran, gotas que caen;
  piso circular navy oscuro con sombra.
- **Barras**: 19 % gris crema y 34 % verde (proporción real 1,62 : 2,9), números 3D arriba, mini tarjetas al pie
  (la de 8 vacía bajo 19 %, la de 10 con dos sellos bajo 34 %).
- **"=" verde** entre las dos tarjetas apiladas, **"?" verde** grande (bisagra), **barra de progreso** (marco gris crema,
  relleno verde con flecha), **moño verde** y **etiqueta crema** "¡Por estrenarla!" que se hamaca.
- **El almacén de Rubén**: piso damero, pared con estantes llenos, letrero ALMACÉN, mostrador navy con tapa de madera,
  frasco de caramelos, balanza, termo; Rubén (con el mate) y Graciela (con su celular chico) de `personajes.js`.
- **El celular grande**: navy, pantallas canvas: tarjeta Scalerics Puntos "Almacén de Rubén · Graciela · 0 de 10" →
  "2 de 10" + "¡Bienvenida! 2 de regalo · por estrenarla"; pantalla bloqueada "martes 19:40" → aviso "Almacén de Rubén:
  Graciela, ¡te esperamos! Te faltan 8 para el premio."

## Escenas (capa HTML arriba del 3D)
| escena | inicio | qué pasa (3D) | rótulos HTML |
|---|---|---|---|
| s01-gancho | 0,00 | la tarjeta de 10 con 2 sellos, sello de goma arriba a la derecha; pulso en "dos"; el sello se va volando | gancho entero (3 renglones + "dos puestos" en recuadro verde) hasta 3,31 |
| s02-lavadero | 3,40 | la tarjeta vuela al parabrisas del auto (arco por la derecha del arco); espuma y cepillos; en "casi" el auto sale por la derecha, el arco se hunde y suben las barras; "19 %" en "doble", "34 %" en "premio" | "Estudio real"; crédito mono "Nunes y Drèze · 2006" |
| s03-ocho | 6,70 | las barras se aplastan, la cámara va a la tarjeta de 8 (borde rojo); "8" 3D en "ocho" | "0 de 8" rojo con guía |
| s04-diez | 9,14 | travelling a la de 10; el sello de goma baja dos veces (pum en "dos", pum en "regalo"); "10" 3D en "diez" | "2 de 10" verde con guía |
| s05-mismos | 11,77 | las dos tarjetas se apilan; se prenden en fila los 8 casilleros por llenar de cada una; "=" verde | — |
| s06-por-que | 13,41 | las tarjetas salen; los dos sellos vuelan y nace el "?" verde; en "Vacía" el "?" gira de canto y aparece la de 8 de frente con la barra de progreso vacía; "0 %" rojo cae en "cero" | — |
| s07-camino | 16,15 | la de 8 se da vuelta y del otro lado está la de 10; caen los dos sellos; la barra pasa a 20 % con flecha; "0 %" → "20 %" | "Ya empezaste" con guía |
| s08-excusa | 18,07 | sale la barra; moño verde en la esquina en "excusa"; etiqueta "¡Por estrenarla!" se hamaca en "por" | "Aunque sea chica" con guía al moño |
| s09-ruben | 20,91 | corte al almacén: Rubén con el mate, Graciela con el celular; Rubén señala su celular en "Scalerics" | "Rubén", "Graciela" (sobre las cabezas), "Scalerics Puntos" (lleno) |
| s10-graciela | 23,26 | sube el celular grande: tarjeta de puntos 0 de 10 → 2 sellos verdes en "dos" | — |
| s11-aviso | 25,05 | baja el celular; Graciela se va caminando por la derecha; Rubén la mira y se queda resignado; sube otra vez el celular (bloqueado), vibra y llega el aviso en "aviso" | — |
| s12-tu-local | 27,14 | baja el celular; campanita: Graciela vuelve; Rubén sorprendido, la saluda y le guiña | "Volvió" con guía |
| s13-llamada | 29,00 | corte a la tarjeta del gancho (abajo), cae el tercer sello en "scalerics.com" | "Videollamada / gratis / scalerics.com" |

## Sonido
- SFX por escena en `compositions/*.sfx.json` (los arma gen.mjs): sello de goma real en cada sello (gancho, pum pum,
  los dos que caen, el de Puntos, el tercero del cierre), papel en la tarjeta que vuela y en la etiqueta, burbujas
  (espuma), tic en las barras y en los 8 casilleros, pop/ding en los números, impact suave en el "?", whoosh en cada
  travelling, campanita y puerta en el almacén, vibra + notification en el aviso, chime en scalerics.com.
- TECHO -33,5 LUFS por efecto (armar.mjs) y música `bed.mp3` a 0,16. Medido por tramos de 0,5 s (pistas rearmadas desde
  index.html): voz -17,0 LUFS, música + SFX -31,2; en toda ventana con voz, la voz queda ≥ 5,9 dB arriba (las dos más
  justas, 0,0 y 13,5 s, son ventanas medio en silencio: el habla real queda ~8 dB arriba).
- Voz: `assets/voice/locucion.wav` (Orus, ya generada). `palabras.json` corregido a mano con silencedetect (inicios de
  "¿Por qué?", "cero", "Y", "Rubén", "Si", "scalerics.com" y finales de frase).

### s01-gancho — dura 3.40 s (inicio global 0.00)
Palabras (segundos relativos a la escena): ¿Por 0.28 · qué 0.40 · algunas 0.50 · tarjetas 0.90 · de 1.20 · sellos 1.30 · vienen 1.80 · con 2.20 · dos 2.30 · puestos? 2.50

### s02-lavadero — dura 3.30 s (inicio global 3.40)
Palabras (segundos relativos a la escena): En 0.00 · un 0.10 · lavadero 0.20 · de 0.50 · autos, 0.70 · casi 1.47 · el 1.70 · doble 1.80 · llegó 2.10 · al 2.40 · premio. 2.50

### s03-ocho — dura 2.44 s (inicio global 6.70)
Palabras (segundos relativos a la escena): A 0.00 · unos 0.10 · les 0.25 · dieron 0.40 · una 0.60 · de 0.80 · ocho, 1.00 · vacía. 1.53 · A 2.44

### s04-diez — dura 2.63 s (inicio global 9.14)
Palabras (segundos relativos a la escena): A -0.00 · otros, 0.06 · una 0.70 · de 0.86 · diez 0.96 · con 1.26 · dos 1.46 · de 1.66 · regalo. 1.76 · Mismos 2.63

### s05-mismos — dura 1.64 s (inicio global 11.77)
Palabras (segundos relativos a la escena): Mismos -0.00 · ocho 0.43 · lavados. 0.73

### s06-por-que — dura 2.74 s (inicio global 13.41)
Palabras (segundos relativos a la escena): ¿Por 0.00 · qué? 0.17 · Vacía, 0.82 · es 1.47 · arrancar 1.59 · de 1.91 · cero. 2.09

### s07-camino — dura 1.92 s (inicio global 16.15)
Palabras (segundos relativos a la escena): Con 0.00 · dos 0.05 · sellos, 0.25 · ya 0.55 · estás 0.95 · en 1.15 · camino. 1.25

### s08-excusa — dura 2.84 s (inicio global 18.07)
Palabras (segundos relativos a la escena): Y 0.00 · anda 0.25 · mejor 0.53 · con 0.83 · una 1.03 · excusa: 1.13 · por 1.94 · estrenarla. 2.03

### s09-ruben — dura 2.35 s (inicio global 20.91)
Palabras (segundos relativos a la escena): Rubén 0.00 · lo 0.44 · hace 0.69 · con 0.89 · Scalerics 1.09 · Puntos: 1.49

### s10-graciela — dura 1.79 s (inicio global 23.26)
Palabras (segundos relativos a la escena): Graciela 0.00 · arranca 0.44 · con 1.04 · dos. 1.24

### s11-aviso — dura 2.09 s (inicio global 25.05)
Palabras (segundos relativos a la escena): Si 0.00 · deja 0.05 · de 0.35 · venir, 0.45 · le 0.65 · llega 0.95 · un 1.25 · aviso. 1.35

### s12-tu-local — dura 1.86 s (inicio global 27.14)
Palabras (segundos relativos a la escena): ¿Lo 0.00 · vemos 0.16 · en 0.36 · tu 0.56 · local? 0.66 · Agendá 1.43 · una 1.66

### s13-llamada — dura 2.55 s (inicio global 29.00)
Palabras (segundos relativos a la escena): videollamada 0.00 · gratis 0.30 · en 0.70 · scalerics.com. 1.07

Duración total 31.55 (la voz termina en 31.25).

## Corrección · ronda 1 de revisión (08-11)
- Gancho en pantalla: "¿Por qué algunas / tarjetas vienen / con **dos sellos** / puestos?". Tarjeta más alta (2,25) con el
  premio FUERA de la grilla: "★ N sellos = lavado gratis". Tampón (almohadilla de tinta) debajo de la tarjeta del gancho:
  el sello aterriza en 0,08 s, se levanta en "sellos" y se va volando por la derecha (llena el tercio de abajo).
- Barras: ahora a la izquierda del lavadero (BX0 = -6,4) y entran con un corte seco en "casi" (whoosh): el arco ya no se
  hunde ni cruza el logo; las mini tarjetas y las barras nacen juntas; 19 % en gris apagado; números sin fundido.
- s04: el sello entra por la derecha, estampa en "dos" y en "regalo" (el sello aparece recién cuando toca) y sale hacia
  cámara; ya no se achica ni sigue a los casilleros 3-4. Viaje de 8 → 10 en 0,28 s. "8"/"10" salen con escala.
- s06: las tarjetas salen de costado; sin sellos sueltos; el "=" sale con escala; el "?" nace en el centro.
- "0 %"/"20 %" → "0 de 8" / "2 de 10" (fuente 3D regenerada con "d" y "e"). En s07 los dos sellos caen de a uno con la
  tarjeta ya de frente (16,47 / 16,67) y el número cambia con el segundo.
- s08: push-in sobre la tarjeta; moño más arriba y adentro (no tapa la "S"); "Aunque sea floja".
- Almacén: sin parpadeo automático (los párpados se veían como bolas de piel), Rubén con dedos, señala el celular (no la
  cara); Graciela de 3/4 de frente, se va y vuelve mirando a cámara, en "Volvió" de frente y feliz; giro de cabeza de 0,7 s.
  Velo navy más fuerte arriba y píldora navy detrás del logo mientras dura el almacén.
- Celular: entra por la izquierda y sale por la derecha (nunca pasa por el logo); pantallas llenas ("Primera visita",
  "Premio: 10 sellos", "Rubén te regaló 2 · por estrenarla"; pantalla bloqueada con linterna, cámara y barrita); el aviso
  llega en "llega" con vibración visible.
- Subtítulos: "A unos les dieron", "con Scalerics Puntos:" juntos; sin "Agendá una" colgando; ningún grupo asoma antes de
  un corte de escena. Tarjeta de cierre con pop (sin fundido gris).
- Sonido: sellos de s04 y s07 sincronizados con el toque; puerta y campanita cuando Graciela entra; notification cortada a
  1 s; ding de las barras más corto. Medido: voz ≥ 6,1 LU sobre el resto en todo tramo de 0,5 s con voz.

## Corrección · ronda 2 de revisión (08-11)
- Celular: "Tarjeta nueva" (en vez de "Primera visita · sumando…"), "Scalerics Puntos" en 52 px. Crédito "Nunes y Drèze ·
  2006" en 38 px.
- Gancho: tampón más grande, caja crema y tinta navy (el sello verde contrasta); el sello se va volando hacia cámara en
  2,6-3,0 s con whoosh; el tampón sale por la izquierda; el lavadero recién aparece cuando la tarjeta despega.
- La tarjeta vuela con arco corto (no sale de cuadro ni pisa subtítulos) y queda delante del parabrisas; sin espuma
  sobre el parabrisas; cámara del auto centrada.
- Barras: cámara más cerca, barras más anchas y ya altas en el corte; mini tarjetas sin texto (banda navy y casilleros).
- Rótulos HTML: entran y salen con escala (sin fundidos). "0 de 8" y "2 de 10" sin línea guía, abajo de la tarjeta
  ("2 de 10" entra en "regalo"). Números 3D, "=", barra de progreso: entran desde 50 % y salen achicándose a 60 % (sin
  motas). "=" de dos barras con ranura. Leyenda de la tarjeta en 0,18 u.
- s04: el sello entra recién 0,5 s antes del primer golpe. Apilado sin cruce (primero en y, después en x).
- s03: tarjeta de 8 más grande y centrada (d 11). Graciela: el cristal lejano de los anteojos se esconde solo cuando la
  cara está a más de ~50° de la cámara. Entra desde más lejos (sin zapato suelto); cámara de s12 corrida a la derecha.
  Cartel ALMACÉN más a la derecha y más abajo.
- Sonido: sellos de s07 en el toque (0,22 / 0,42 con caída corta); chime adelantado 0,4 s (s09 y s13); sello del cierre
  en 1,0; sin puerta (campanita en 27,56); golpe de s03 con "0 de 8" (7,78).

## Corrección · ronda 3 de revisión (08-11)
- Graciela: 3/4 de frente en el mostrador (giro -0,42; mira a Rubén con los ojos, la cabeza casi no gira). Patillas de los
  anteojos escondidas siempre; el cristal lejano y el labio se esconden cuando la cara está a más de ~60° de la cámara.
- Sonido: sellos de s07 en 0,10 / 0,30; sin campanita ni tic en s11; un solo whoosh en s07; todos los pop adelantados
  0,08 s (el golpe de pop.mp3 está en 0,11).
- Gancho: el sello se va hacia cámara y abajo (2,6-2,95) y el tampón sale enseguida (2,78-3,15). Giro 8 → 10 en 0,18 s.
- Recuadro verde de subtítulos y del cierre sin fundido. Textos del celular ≥ 48 px de textura (≥ 40 px en pantalla).
- Cierre: arranca en 29,0 ("videollamada", 2,55 s); el subtítulo "en tu local?" se va en 28,52.
