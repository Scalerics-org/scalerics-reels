# inmobiliaria-visitas · notas del constructor (17-11)

Proyecto copiado de dist-cliente-grande: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html,
index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (escrita de cero para este reel, con
la infraestructura de dist-cliente-grande: tarjetas pegadas a la cámara, regla de burbujas, catmull() quieto después de
la última clave, sin NaN en el último cuadro). `assets/personajes.js` = el de pilates-cuota (el más corregido: cuello,
`bocaVoz` sin boca doble, `mejillasBajas`). Silvana, Diego y Romina se arman en tres.js con DEFECTO + parámetros del
plan (`mejillasBajas: true`); Graciela = ELENCO.clienta + una cartera crema; Sofi = la de veterinaria-vacunas
(videollamada por render target); la pareja de Q1 = dos DEFECTO.

## Comandos (desde reels/inmobiliaria-visitas)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-g2.json, palabras-so.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana; VER=portada
python3 medir.py                          # voz contra resto por tramos (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D
```

## Voces (partes/voces.md, partes/procesar.sh)
Silvana Erinome · Diego Achird · Romina Pulcherrima · Graciela Gacrux · Sofi Achernar · narrador Rasalgethi (atempo
1,07). g1 "¿Y? ¿Hubo visitas?" (altavoz) se reusa idéntico en Q3. g3 (altavoz, seca) y g5 (balcón, contenta) son dos
tomas distintas de "Mañana paso a buscar el cartel.". Huecos internos acortados en g1, g2, d2, s3, g4. "oyó:" igual al
guion en todas (el STT no oye el "¿Y?" suelto en 2 de 3 tomas de g1: se eligió la b, que sí; en d2 no oye el "Ah.").

## Mundo
Oficina (origen, piso y = 0): pared del fondo z = -0,6 de ladrillo crema, franja verde a 1,6 m, "SILVANA PROPIEDADES"
navy a 2,62 m (arriba, fuera de los encuadres de la parte 2); tablero de llaves en x 0,5 (gancho POCITOS vacío en la
parte 1, con su llave en la 2); panel de fichas en x -0,78 (la de Graciela grande, con borde verde). Silvana sentada en
(0; 0,3) mirando a +z; monitor a su derecha (-0,72; 0,98); su celular en altavoz en un soporte (0,3; 1,02). Diego
(0,64; 3,62) y Romina (-0,64; 3,62) enfrentados a ella; panelito de post-its de Diego, agenda tachada de Romina; la llave
MALVÍN colgando del borde de la taza de Diego. Vidriera con 8 fichas en z = 5,15.
Pocitos (x = 60): fachada crema en z = 0, balcón con baranda navy, cartel VENDE en la baranda de adelante, la puerta-
ventana con la llave POCITOS (péndulo), la maceta; abajo la calle, la rambla y el río navy2; edificios low-poly. Detrás
de la fachada, el living vacío (parquet en espiga) con la puerta de entrada abierta al pasillo (la pareja).

Planos: P1 cuadro 0 (Silvana, el celular, el tablero) · P2 push-in mientras pregunta · P3 por detrás de Silvana: Diego
y Romina, dos burbujas a la vez · P4 primer plano · P5 grúa desde la rambla al balcón y push-in a la llave · P6 la
pausa (rótulos) · P7 el celular de cerca ("Llamada finalizada") · P8 Diego y la llave MALVÍN · P8b Silvana cierra los
ojos · cartel · Q1 living: la pareja saluda, push-in al celular de Diego · Q2 balcón: push-in al resumen · Q3 encuadre
del cuadro 0 · Q3m push-in a la ficha · Q3c el encuadre del cuadro 0 · Q4 la ficha tres semanas después · Q4b balcón y
VENDIDO · Q5 Sofi en el celular parado (el tablero con las llaves detrás).

## Duración y mezcla
37,8 s (1134 cuadros). Parte 1 0-16,51 · cartel 16,51-18,91 · parte 2 18,91-37,8 = 18,89 s (50 %); cierre (Sofi)
33,86-37,8, tarjeta VISITAS 33,94 (3,9 s, entra con "Comentá"), línea chica 35,7. Mezcla: duck de la cama 0,3 bajo la
voz; voz ≥ +7,2 LU sobre el resto en todos los tramos de 0,5 s; -14,0 LUFS. SFX de assets/sfx; nuevo: `gaviota.wav`
(BigSoundBank 2573, CC0, en fuentes.md).

## Pasadas
- Armado (prev.mjs, renders/prev/a-k): P1 (Silvana cortada / tablero tapado por la burbuja → tablero más chico y más
  cerca, cámara más alta y abierta, burbuja a la izquierda); monitor fuera del cuadro 0; teléfono más cerca de Silvana
  (el brazo estirado); P3 corredores más juntos y más cerca, burbujas escalonadas; P5 cartel VENDE delante de Graciela;
  P8 la llave MALVÍN tapada por el panelito → colgando de la taza, de frente; celulares en la mano por delante y arriba
  de las manos (las manos tapaban la pantalla en el inserto); Q5 sin Silvana (su cabeza quedaba cortada detrás de Sofi).
- Pasada 1 (MP4 render 1, cuadros cada 0,25 s en renders/qa1/hoja-*.png y diferencia cuadro a cuadro de los 1134):
  sin cuadros sueltos, último cuadro quieto. Corregido: P2 era una órbita que dejaba la burbuja de Silvana sin Silvana
  (2,3-3,6) → push-in sobre ella; el nombre de la pared cortado en los bordes en Q3/Q3c → más arriba; la franja VENDIDO
  pasaba por la cara de Graciela → entra de costado a la altura del cartel; primer cuadro de Q5 con otra cámara y la
  textura de Sofi vieja → la escena de Sofi se renderiza desde 0,6 s antes y scene.updateMatrixWorld antes de la cámara;
  P7 con la mano de Silvana asomando en el borde → celular más grande en cuadro; Q1 la pareja tapada por Diego y techo
  oscuro → cámara nueva (la pareja en la puerta, saludando), techo claro; mezcla 31,5 s (+6,0 → +7,2).
- Render 1: 627 s (10,5 min, SwiftShader).
- Render 2: 616 s. Pasada 2 (MP4 render 2, cuadros cada 0,25 s desfasados 0,125 s en renders/qa2/, diferencias cuadro a
  cuadro de los 1134: sin sueltos, último cuadro quieto; Q5 ya entra con la cámara y Sofi correctas): corregido el nombre
  "SILVANA PROPIEDADES" cortado arriba en P1 y en los dos bordes en Q3/Q3c (placa de 1,3 m a 2,0 m, entra entera); el
  push-in a la llave pasaba por la cara de Graciela (ahora 0,35 s); Q2 con el cartel VENDE cortado (cámara de P5); el
  rótulo del resumen quedaba en el plano abierto después de "Llamar" (se va).
- Render 3: 585 s; re-codificación del paso 10 ~70 s. Final 37,9 s (1134 cuadros), -14,1 LUFS, pico -6,3 dBFS. Revisado
  cada 0,5 s (renders/qa3/hoja.png) y diferencia cuadro a cuadro: sin defectos nuevos de gravedad alta.

## Portada
Plano propio VER=portada (LIMPIO=1): Silvana de frente con cara de "¿y ahora?", el celular en altavoz y el tablero de
llaves detrás (portada-src/fondo-limpio.png). chica "Viernes, 18:00.", grande "¿Hubo visitas?", sello INMOBILIARIAS.

## Flojo / para los revisores
- P3 (3,65-4,8): Diego y Romina en plano general, caras de ~150 px; las dos burbujas a la vez entran escalonadas.
- P5: la grúa desde la rambla (6,8-7,3) muestra la fachada y los balcones; el río casi no se ve.
- Q1: la pareja se ve chica en la puerta del fondo (0,7 s antes del push-in); en los insertos de celular las manos
  ocupan la franja de abajo (no tapan la pantalla).
- Q4 (30,5-31,8): el monitor llena el ancho pero queda en la mitad de arriba (abajo, pared y la planta).
- La comisión gira de rojo a verde con un cuadro casi plano (la tarjeta de canto) en 31,25.
- Silvana, Diego y Romina son nuevos: las manos son puños redondeados (como el resto del elenco), la melena de Silvana
  es el peinado "melena" de Lorena en canoso.

## Ronda 1 de revisión (17-11, sobre qa-arte-r1, qa-sonido-r1, qa-guion-r1)
**35,77 s (1073 cuadros).** Parte 1 0-15,6 · cartel 15,6-17,9 · parte 2 17,9-35,77 = 17,87 s (50 %); cierre (Sofi) 32,84-35,77 =
2,93 s, tarjeta VISITAS desde 32,9. Render 527 s; final -14,2 LUFS, pico -4,8 dBFS; voz ≥ +8,8 LU sobre el resto en todos los
tramos. `check --json` 0 errores. Diferencias cuadro a cuadro: sin cuadros sueltos, último cuadro quieto (renders/qa4/).
- Silvana: peinado "rodete" con rodeteAtras 0,42 (el de Alicia de pilates-cuota): sin flequillo ni melena sobre la cara,
  cejas y ojos limpios de frente, 3/4 y cerrados. Portada nueva (fondo limpio con el celular en altavoz y el tablero).
- Resumen de Graciela (Q2) sin el reloj grande, textos de 42-66 px en el lienzo (≥ 40 px en cuadro).
- Cierre 2,93 s: toma nueva de Sofi "Comentá VISITAS y te mando cómo funciona." (Achernar, atempo 1,05); el celular más grande
  (≈ 55 % del ancho, la tarjeta abajo sin taparle la cara), la línea chica debajo de la tarjeta ("Visitas anotadas y resumen
  automático al propietario · scalerics.com"). No entró el monitor al lado.
- P6 1,9 s: plano general con "Apartamento de Graciela · USD 180.000" y "USD 5.400 de comisión" con guía a la ficha POCITOS;
  P6b inserto del tablero con "Visitas anotadas: 0" y guía al gancho POCITOS vacío (POCITOS pasó a la esquina de arriba a la
  derecha, lejos de la cabeza de Silvana). En Q3 (Q3t) el mismo inserto con la llave colgada. Llaves con la paleta a la
  vista (la etiqueta cuelga al costado), rótulo LLAVES crema con letras navy. Sin MALVÍN ni MALVÍN NORTE en el tablero.
- Burbujas del altavoz al lado del celular con la cola a la pantalla (P1, Q3, Q3c, P6). P8: "Ah." y en "Era" la burbuja
  completa (al costado, cola a la boca); cámara más arriba. Llave MALVÍN colgando de la taza, legible.
- Balcón: llave de verdad en la cerradura (cabeza de bronce que sale del cilindro); P5 desde el living por la puerta-ventana
  (Graciela de frente, el río y la rambla detrás; calle a -3,6); sin la grúa de la fachada; "La llave" corta a la llave. Cartel
  VENDE a la derecha de Graciela. Celulares al pecho. Insertos de celular al 72 % del alto (≈ 62 % del ancho), sin la masa de
  dedos (la persona se oculta cuando el celular llena el cuadro), primer renglón desde el primer cuadro.
- Pareja de Q1: se va por el pasillo, él con pelo texturado; la puerta de entrada abierta hacia el living.
- Silvana tapa con la palma arriba del celular y mira a los corredores; en Q3 la cámara va al monitor cuando ella gira.
- Nombre de la pared escondido en el cuadro 0 y P2. VENDIDO ✓ en el monitor (igual a la franja). Llave "con Diego desde 17:10".
  Ficha de la vidriera de Pocitos en alquiler → Aguada. Comisión gira sin quedar vacía. Chips entran con escala (no cortados).
  Cartel: el texto se va 0,12 s antes del iris.
- Sonido: Diego "Cargada." en Q1 (Achird) y Q1/Q2 más cortos (sin tramos sin voz > ~2,3 s); Romina 0,3 s después y paneo
  izq./der.; sin crujido de silla ni puerta; "Ya sé." toma b (el STT lo oye); pasos de la pareja con la pareja caminando.
- descripcion.txt: la llave cuelga de la puerta de la propietaria. guion.txt: "Cargada." y el cierre corto.
- No hecho / flojo: el STT del stem de voz sigue oyendo "un mongola" en "Un montón." / "Ninguna." (se superponen 0,4 s;
  con el paneo se separan en estéreo); la coleta de Romina se sigue leyendo como rodete; la franja de escritorio abajo en P1;
  el tablero en P1 sigue chico (se lee en los insertos P6b y Q3t).

## Ronda 2 de revisión (17-11, sobre qa-arte-r2 y qa-sg-r2)
**35,9 s (1077 cuadros).** Parte 1 0-15,72 · cartel 15,72-18,02 · parte 2 18,02-35,9 = 17,88 s (50 %); cierre 32,96-35,9 (2,94 s).
Render 484 s; final -14,1 LUFS, pico -4,3 dBFS; voz ≥ +9,1 LU sobre el resto. `check --json` 0 errores. Diferencias cuadro a
cuadro: sin cuadros sueltos, último cuadro quieto (renders/qa6/hoja.png cada 0,5 s).
- Balcón rehecho: la puerta-ventana abierta (sin el parante del medio ni el vidrio), la cámara desde el living con el marco
  fuera del cuadro; balcón de 2,3 m de fondo; Graciela entera de frente (los lentes de frente, sin patilla flotante), el
  cartel VENDE de dos caras en la baranda a su derecha, detrás el río navy, la costa de enfrente con edificios crema bajos y
  el cielo celeste (sin los edificios en arco que tapaban); la cartera sin la correa ni el cierre negro. La llave en la
  cerradura del marco izquierdo con la cabeza de bronce, la etiqueta de dos caras; la burbuja "La llave la tengo yo." abajo.
- Burbujas: las del altavoz abajo, sobre la mesa, con la cola al celular (nunca sobre Silvana); "Me dicen que varias" arriba
  del pelo con la cola a la coronilla (P4 más abierto); "¿Hubo visitas…?" entra después de que sale el chip.
- Insertos de celular: corte directo al celular grande (sin el push-in con la persona desapareciendo), con un push suave; de
  Q2 se corta directo a la oficina (el toque en "Llamar" se ve en la pantalla y pasa a "En llamada").
- P6 1,5 s + inserto del tablero 0,7 s; el letrero de la pared solo en la parte 2 (más alto, sin el cable); el panel de
  fichas arriba y a la derecha (la ficha de Pocitos libre del monitor); la guía de "Visitas anotadas: 0" llega al borde del
  círculo punteado del gancho vacío (POCITOS impreso en la madera, sin etiqueta fantasma; en la parte 2 lo tapa la llave).
  Fichas al doble de resolución.
- P3 desde más arriba y al costado (Diego entero, la nuca chica en la esquina). P8 sin el contraplano de 0,2 s; cámara más a la
  derecha, burbuja al costado con la cola a la boca. Pelo de Silvana gris platino frío (contraste con la piel). Romina con
  coleta baja (silueta distinta de Diego). Sofi sin el puño. La pareja camina por el pasillo.
- Cierre: el celular arriba, tarjeta en y 1110 y la línea chica en 1460-1650 (todo por encima de y ≈ 1650).
- Iris desde abajo del cartel (no se come "más tarde…"). fuentes.md y comentario de tres.js: VENDIDO.
- "Un montón." / "Ninguna.": Romina 0,55 s después (4,25), paneo ±0,85; el STT oye las dos en estéreo y en mono.
- Portada: fondo limpio sin el letrero, Silvana centrada, el celular en altavoz y el tablero; `sello_top` 300 px
  (herramientas/portada.mjs y portada.html traídos de main, que ya lo soportan).
- Flojo: la "N" de VENDE en las fichas chicas del fondo todavía se ve fina; el monitor sigue cortado en el borde en P6
  ("nta"); franja de escritorio abajo en P1; en Q4b la franja VENDIDO cae en parte detrás de Graciela; el sello de la portada
  apoya sobre el borde de arriba del pelo.
