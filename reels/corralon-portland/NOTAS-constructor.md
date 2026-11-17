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
