# corralon-portland · notas del constructor (17-11)

Proyecto copiado de taller-presupuestos: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (escrita nueva sobre la base técnica de taller:
tarjetas pegadas a la cámara, avatares por render target, poses por claves, bocas por envolvente, PLANOS Catmull-Rom,
insertos a pantalla). `assets/personajes.js` es la copia de taller sin cambios: Gustavo, Tito, los albañiles y Beto se
arman en tres.js con parámetros y peinados existentes + accesorios propios (casco, gorro de lana, gorra, lápiz en la oreja,
costuras del chaleco acolchado, bandas crema del chaleco reflectivo, polvo de portland en la campera de Tito).

**Duración: 43,2 s.** Parte 1 0-19,01 · cartel 19,01-21,51 · **parte 2 21,51-43,2 = 21,7 s (50,2 %)**. "Comentá OBRA" desde
39,4 · línea chica desde 41,6. Más largo que el estimado del plan (37,2): las tomas reales son más largas (Beto 3,3 s con
pausas acortadas y atempo 1,08; Tito 1,7 s). Dentro del tope de ~45 s para reels con diálogo.
Mezcla: -14,0 LUFS, pico -5,8 dBFS; voz ≥ +6 LU sobre el resto en todos los tramos de 0,5 s con voz real (medir.py marca
27,5 s con +3,3, pero es la cola de la ventana de 400 ms: la voz ya terminó en 27,17 y el stem de voz está en silencio).
`check --json`: ok, 0 errores (lint/runtime/layout/motion/contrast/craft/audio).

## Comandos (desde reels/corralon-portland)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh               # recorta a partes/rec/ y mide duración + "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                  # arma assets/voice/ desde las tomas elegidas
node gen.mjs                             # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana ni tarjetas
python3 medir.py                         # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre               # snapshots de hyperframes con el candado
flock /tmp/hyperframes.lock node prev2.mjs "t@px,py,pz,mx,my,mz,fov t …" renders/prev/x   # capa 3D con cámara por cuadro
```

## Voces (partes/procesar.sh)
b1 01-beto-e (Sadachbia; pausas internas acortadas, atempo 1,08, filtro de audio de WhatsApp; se reusa igual en Q1) ·
g1 02-gustavo-c (Alnilam; se reusa en Q1) · g2 03-gustavo-b · g3 04-gustavo-c (se reusa en Q4) · b2 05-beto-f (pausa
acortada, atempo 1,06, filtro WA) · b3 06-beto-a (atempo 1,05, filtro WA; se reusa en Q4) · g4 07-gustavo-a · t1 08-tito-a
(Enceladus, atempo 1,1; se reusa en Q3) · narrador = reels/abren-hoy-completo/assets/voice/narrador.wav (Rasalgethi, el
STT oye "agente de ella más tarde", es "IA") · g5 10-gustavo-a · g6 11-gustavo-c · f1 12-sofi-a (Achernar, atempo 1,06 +
lowpass 7 kHz). "oyó:" igual al texto salvo lo que el STT no entiende del acento ("portland" → "por lan/porlán",
"llenamos" → "cenamos", "Beto espera" → "Beto Hesperia"): se oyen bien. La obra dentro de los audios de Beto son
martillazos de chapa lejanos (k-metal-liviano-2 con pasabajos), no una toma aparte.

## Mundo (tres.js)
Galpón: pared del fondo de chapa acanalada navy (z = -1,6, ondas con geometría) con el portón x 0,55..3,15; cerchas,
dos tubos fluorescentes, cartel "MATERIALES GUSTAVO", pizarrón de precios con tiza (Caveat) y teléfono de pared crema con el
cable en espiral (TubeGeometry que se rehace cuando se mueve el tubo). Mostrador x -2,4..0,3 con frente de chapa y canto
verde. Patio: tierra, pila de 40 bolsas en el pallet (1,85, -4,3; 6 hileras trabadas de 6 + 4 arriba = las que cuenta),
arena, pedregullo, hierros en caballetes, dos carretillas, tacho, muro bajo, cielo navy claro liso y una franja crema en el
horizonte. Las dos fotos del chat (camión gris "de otro" con Beto de espaldas, camión navy "MATERIALES GUSTAVO" con Beto
saludando) se renderizan una vez a canvas desde una escena aparte.
Planos: P1 cuadro 0 (Gustavo con el tubo, el celular "20 sin leer", el audio de Beto transcripto) · P2 patio, Gustavo
detrás de la pila cuenta 37-38-39-¡40! (brillo en cada bolsa, polvo en la palmada) cortado por 3 insertos del celular
(20 → 27) · P3i inserto "Tengo las 40. ¿Te las mando?" (un tilde gris) · P3 plano medio, el dedo: "Beto espera. Es de
la casa." · P4 inserto: los dos audios + la foto · P5 la pausa desde el mostrador: Gustavo en el portón, la pila, rótulos
rojo apagado · P6 primer plano "Era de la casa." · P7 contraplano a Tito con gorro · P7b Gustavo gira la cabeza ·
Q1 = P1 (celular parado y monitor) · Q1i el agente contesta mientras Beto todavía habla, "Pedido confirmado" · Q1g "¡Ya te
digo!" con la mano al tubo / "Ya le dijo." · Q2 los chats contestados, "Sin contestar 27 → 0", Facundo "Para vos,
Gustavo" · Q3 Tito / "Las que quieras, Tito." con la bolsa al mostrador · Q3m el panel ($ 20.800 → $ 48.900), chip "LUNES ·
7:58" · Q4 la misma foto con el camión navy, "Entregado 9:02" · Q4g Gustavo con el pallet vacío atrás: "Es de la casa." ·
Q5 monitor + Sofi en el celular parado.

## Pasadas
- Armado (prev.mjs/prev2.mjs, renders/prev/a-g): la escala del set no daba en 9:16 → cámaras reencuadradas plano por
  plano; la fila tapaba al dueño (cascos gigantes en P1, P3, P5, P7b) → fila corrida a la izquierda; Gustavo parecía pelado
  (como Rubén) → peinado texturado corto; P2 con Gustavo de espaldas → detrás de la pila, de frente; la franja del horizonte
  tapaba el cielo → 3,2 m a 90 m; la burbuja de Beto tapaba a Gustavo en P1/Q1 → abajo, con la cola al celular; el chat con
  la mitad vacía → historial ("VIERNES ¿Me reservás arena…?") y anclado abajo; foto del camión chica → 660 px y cámara más
  cerca; en P3 el dedo levantado parecía meterse en el ojo → mano al costado; el monitor tapaba a Gustavo en Q3 y Q4g →
  cámaras nuevas y Gustavo en la punta del mostrador frente al portón; Sofi cortada en Q5 → celular parado más grande y
  cámara más abierta.
- Pasada 1 con la capa HTML (hyperframes snapshot cada 0,5 s, renders/snap/p1): P7b con media cara cortada → mira más a la
  izquierda; la transcripción de Beto tapaba el encabezado del chat en Q1i → ahí va solo el rótulo "Contesta con tu stock y
  tus precios" (el audio es el mismo de P1, ya transcripto); Q1g con el celular parado delante de la cara → cámara más alta
  y abierta; Q3 con Gustavo cortado → plano desde la punta del mostrador; panel con 600 px vacíos arriba → chip "LUNES ·
  7:58"; monitor cortado en Q5 → fov 47. Mezcla: el comienzo de Q2 pisaba la cola de "Ya le dijo." → Q2 0,12 s más tarde.

## Render
`hyperframes render --workers 2` (con el candado, SwiftShader): **29 min 48 s** para 43,2 s (1296 cuadros); ffmpeg del paso
10: 58 s. Final: renders/corralon-portland-final.mp4 (43,2 s), hoja en renders/hoja.png (mirada: coincide con los snapshots).

## Portada
Fondo LIMPIO de P2 (LIMPIO=1 + prev2.mjs FULL=1, t 6,3, cámara propia más abierta: Gustavo detrás de la pila contando),
subido 350 px (portada-src/fondo-limpio-6.3.png). chica "Lunes, 6:45.", grande "¿Tenés portland?", sello CORRALONES.

## Pendiente / dudoso
- Timbre del teléfono de pared: no hay uno mecánico real CC0 accesible (bigsoundbank bloqueado); se usó `k-dos-tonos`.
- P1: el casco del primero de la fila asoma cortado en el borde izquierdo (es un primer término, a propósito).
- En P1 Gustavo sostiene el tubo a la altura del hombro (BRAZOS.oreja), no pegado a la oreja.
- Tito en Q3 se ve de espaldas (su línea es el mismo audio de P7, donde sí se le ve la cara).
- Duración 43,2 s (más que los 37,2 del plan).
- La revisión de arte cuadro por cuadro alrededor de cada corte sobre el MP4 la tienen que hacer los revisores.

## Ronda 1 (17-11, sobre qa-ronda-r1.md)
**Duración 39,47 s** (mp4 39,6). Parte 1 0-17,10 · cartel 17,10-19,60 · **parte 2 19,60-39,47 = 19,87 s (50,3 %)** · cierre
(Q5) 35,99-39,47 = 3,5 s (Sofi 2,99 s + 0,08 + 0,3 de aire). Final -13,9 LUFS, pico -5,1 dBFS. `check --json` 0 errores.
Render 27 min 40 s (+ ffmpeg final ~1 min). Recortes: sin "Ya está, Gustavo." en b2 (queda "Me contestó otro."), escalada
3,0 → 2,2 s, inserto del tipeo 0,64 → 0,52, Q2 3,12 → 2,7, Q3m 1,5 → 1,2, cierre más corto, b1 atempo 1,12, Sofi atempo 1,13.
La pausa antes de "Era de la casa." no se tocó; los callbacks siguen todos.
- Arte 1: P7 cámara detrás del mostrador hacia la cara de Tito; Gustavo a la punta del mostrador (fuera de cuadro), la fila
  oculta en P7/P7b; manos de Tito apoyadas arriba de la mesada (IK al tablero), el "una" con el dedo sobre la mesada.
- Arte 2: "¡40!" y 37/38/39 arriba (y 250), lejos de la cabeza; polvo = nube chata translúcida que se abre y se apaga.
- Arte 3: Q1g desde el otro lado (la fila oculta): el celular parado ya no tapa la boca.
- Arte 4: cámara de P2 más alta: la mano sobre las bolsas, se ve el torso.
- Arte 5: el celular del mostrador pasa a "6:50 · 27 sin leer" (desde P2); P5 reencuadrado (pila, Gustavo en el portón).
- Arte 6: pelo en la nuca y costados de Gustavo; P7b con la pila al fondo.
- Arte 7: cuadro 0 con cámara más baja, celular más grande (1,75×), chip "LUNES · 6:45" sobre el mostrador (no pisa el
  pizarrón), sin el cartel de pared que asomaba arriba; la pantalla pasa de 20 a 21 sin leer a 1,6 s.
- Arte 8 / guion 1: en Q1 el monitor muestra un protector "MATERIALES GUSTAVO" hasta Q3; el celular parado muestra solo el
  chat de Beto (audio sin contestar → "Pedido confirmado") y la lista entera recién desde Q2.
- Arte 9 / sonido 3: cierre = inserto del celular a pantalla con Sofi en plano medio (fondo navy, auriculares, logo).
- Arte 10: el canto verde del mostrador separado de las costillas de chapa (sin z-fighting).
- Arte 11: manos de Tito en Q3 arriba de la mesada. Arte 12: Beto delante del camión en las dos fotos; flechita rojo apagado en
  la del camión gris. Arte 13: "Era de la casa" centrado, mirando abajo a la pila. Arte 14: Q4g con Gustavo y el pallet
  vacío enteros. Arte 16: teléfono de pared más lejos de la cabeza.
- Sonido 1: SFX de los tramos sin voz +8 (al techo -31), una notificación + vibración por cada mensaje, música -34 con
  agachado 0,4. Sonido 2: sin timbre de teléfono (no hay uno real CC0 accesible). Sonido 6: golpe de la bolsa adelantado
  0,22 s. Sonido 7: la obra dentro de los audios +6 dB y el camión +5. Sonido 8: k-plastico al agarrar el tubo. Sonido 9:
  roce de ropa + zumbido en el giro.
- Guion 3: entregas "9:00 Beto · 10:30 Luis / 11:00 Marcos · 12:00 Ramón". Guion 4: "¿Tienen pedregullo?". Guion 5:
  burbujas salientes blancas con borde verde; sin "WhatsApp" en el encabezado de la lista. Guion 6: "40 bolsas · $ 20.800 /
  se las compró a otro". Guion 7: subtextos de la lista a 42 px; el monitor chico del cierre ya no está.
- Portada: fondo limpio nuevo en la palmada de la 40 (mano sobre las bolsas), portada-src/fondo-limpio-r1.png.
- No hecho: arte 15 (sombra de los insertos), arte 17 (el iris sigue abriendo desde el centro); la fila en el cuadro 0 sigue
  siendo un casco al borde izquierdo (meterla tapaba a Gustavo); medir.py marca -3,9 en 4,5 s y +1,0 en 12,5 s: son colas de
  la ventana de 400 ms (la voz ya terminó; el SFX arranca 0,3 s después).

## Ronda 2 (17-11, sobre qa-ronda-r2.md)
**Duración 38,9 s** (mp4 39,0). Parte 1 0-16,32 · cartel 16,32-18,82 · **parte 2 18,82-38,9 = 20,08 s (51,6 %)** · cierre
35,71-38,9 (3,2 s, sin el aire final). Final -13,8 LUFS, pico -4,3 dBFS. Render ~26-27 min.
- N1 (ALTA): pelo de Gustavo hasta la nuca (cáscara más baja + 17 mechones chatos con semilla en el borde, irregular); el
  lápiz bajó y va apoyado sobre la oreja hacia adelante. Mirado en P5 de espaldas.
- 5 / N6: pausa reencuadrada (pila ~45 % del ancho, Gustavo entero en el portón); el celular que asomaba cortado se oculta
  en P5 y "27 mensajes sin contestar" queda abajo a la derecha sin guía.
- 7 / N3 / N7: el celular del cuadro 0 parado en un atril navy, 2,3× y "20/21 sin leer" a 88 px (se lee); el tubo pegado
  a la cabeza (auricular en la oreja, micrófono hacia la boca) con la mano agarrándolo; la tarjeta del audio de Beto entera
  desde el cuadro 0; el chip "LUNES · 6:45" a la izquierda; el inserto de la escalada arranca en 21.
- N2: en Q1 el celular parado y el monitor a la derecha (no tapan la cara) y cámara corrida: monitor entero.
- N4: Q1g encuadra el teléfono de pared con el tubo en la mano; corte nuevo Q1h con el ding: Gustavo y el celular parado
  con "Pedido confirmado" ("Ya le dijo." mirando el celular). B7: la burbuja sale 0,08 s antes del corte.
- N5: el chat de Q4 entra ya armado (todo el pedido + "9:01" + el audio).
- 13: boca más chica en SECO; P6 centrado. 14: Q4g sin monitor ni celular delante; Gustavo entero.
- 17: la salida del cartel es un barrido de arriba hacia abajo (inset), sin iris ni agujero negro; el texto queda hasta el
  barrido (no hay verde vacío).
- N9: P3 corrido (la cara no toca el borde; el primero de la fila oculto). N11: horas de la lista a 46 px, subtítulo 40.
- N12: Sofi con interfaz de videollamada (barra "Videollamada · Sofi · Scalerics", botones) y fondo crema (el buzo navy se
  separa); placa navy detrás del logo. N13: cejas de Gustavo en media sonrisa.
- B1: parte 1 apretada (audio de Beto desde 0,12 s, huecos de P3/P4/P7 más cortos): 17,10 → 16,32; Q2 +0,25 y Q4g +0,15.
- B2: la música sube +4 dB (agachado negativo) en la escalada, Q2 y el panel; los pozos quedaron en -26/-29 LUFS.
- B3: push-in más marcado en Q3. B4: el motor del camión ahora suena sobre la foto (no en el corralón). B5: sin el aire final.
- Panel: arranca en el primer pedido (sin "$ 0" de 3 cuadros).
- No hecho: N8 (restos del pizarrón alrededor de "¡Ya te digo!"), N10 (Tito sigue con los puños sin el dedo), N13 primera
  parte (Tito de espaldas en Q3), 15 (sombra plana de los insertos), B6 (no se regeneró "Beto espera").

## Pulido final (17-11, ronda 3)
**Duración 38,9 s** (sin cambios de tiempos salvo los números del conteo). Re-render completo.
- Portada: fondo limpio nuevo `portada-src/fondo-limpio-r3.png` (t 6,08, un instante antes de la palmada: de frente, los
  dos ojos, la mano sobre las bolsas, sin polvo; cámara frontal propia). Portada regenerada y mirada.
- N-2: "Era de la casa." centrado (cámara un poco más abierta). N-3: Q1g más abierto: la cabeza entera y el teléfono de pared.
- N-4: Q4 entra con la foto ya puesta; "Entregado 9:02" entra deslizando (scroll animado de 0,25 s).
- N-7: 38… y 39… entran justo al volver del inserto (sin la burbuja vieja un cuadro).
- N-9: sacada la segunda carretilla (su rueda quedaba suelta junto al pallet).
- N-10: en P3 el celular va arriba del pulgar: "27 sin leer" se lee.
- N-8 / sonido 5: los botones de la videollamada subieron por encima de la placa "scalerics.com".
- guion.txt reescrito con el reel tal como quedó (tiempos reales); fuentes.md sin k-dos-tonos.
