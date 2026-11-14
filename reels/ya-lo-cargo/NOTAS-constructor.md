# ya-lo-cargo · notas del constructor (14-11)

Proyecto como anotamelo / te-queda: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). No usa `armar.mjs` ni `armar.mjs unir`: parte 1, cartel y parte 2 están en un solo proyecto.
La escena 3D entera está en `assets/tres.js`; `assets/personajes.js` = el de anotamelo (rodillas, `sentado`) +
`ELENCO.ruben` copiado tal cual de reels/abren-hoy (Rubén = `ELENCO.ruben` en todos los planos; `almacenero` no se usa).
Herramientas locales: `./snap.sh "t1,t2,…" nombre` (snapshot con el candado, PNG + hoja en renders/snap/<nombre>/),
`python3 medir.py` (voz contra resto por tramos de 0,5 s; necesita `MEDIR=1 node gen.mjs` antes).

**Duración: 34,04 s** (parte 1 0-21,79 · cartel 21,79-24,29 · parte 2 24,29-34,04; línea chica desde 32,44).
Ronda 1: +0,3 s porque las puertas del camión se cierran en 0,35 s (antes 0,17: saltaban) y el celular ahogado entra
después de que cierran. Si hay que recortar: la ronda (bar/kiosco 0,2 s c/u), el cartel a 2,4 s, o 0,3 s de la grúa de P3.

## Comandos (desde reels/ya-lo-cargo)
```
node gen.mjs                      # todo (mezcla incluida); SINAUDIO=1 no rehace la mezcla; MEDIR=1 escribe stems
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 check --json
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/ya-lo-cargo.mp4
ffmpeg -y -i renders/ya-lo-cargo.mp4 -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k renders/ya-lo-cargo-final.mp4
# portada (después del render; el fondo limpio ya está en portada-src/)
cd ../.. && flock /tmp/hyperframes.lock node herramientas/portada.mjs ya-lo-cargo
# fondo limpio de la portada (si cambia el plano): LIMPIO=1 SINAUDIO=1 node gen.mjs; ./snap.sh 16.95 limpio;
#   cp renders/snap/limpio/frame-00-at-16.95s.png portada-src/fondo-limpio-16.95.png; SINAUDIO=1 node gen.mjs
```
Ojo: `node gen.mjs` reescribe index.html y tiempos3d.js: no correrlo mientras un snapshot/render está andando.

## Planos (segundos globales; ronda 1)
| plano | desde | qué |
|---|---|---|
| P1 | 0,00 | detrás del mostrador: Graciela de espaldas abajo a la izquierda, Nico de frente, el spiedo en la vidriera. Gancho-burbuja HTML "Ya lo **cargo.**" + burbuja de Graciela. "Ya lo cargo." 0,30, pulgar 0,75, el globo "40 harina / lunes" sale del celular 1,00 (primero de costado, después sube: no tapa la cara) |
| P1b | 1,72 | la vereda: sale con el globo, abre la puerta del acompañante 2,05, el globo entra apretado 2,20-2,50, cierra 2,55 |
| P2 | 2,70 | la ronda, el auto de frente con cámara tele y baja (menos calle vacía): Marta 2,95 · "Ya lo cargo." 4,68 · bar 5,75 · kiosco 6,35 · ráfaga 6,95/7,25/7,55 · lleno 7,90 (los globos crecen y se aplastan contra el parabrisas; "dale" contra el cachete de Nico) + push-in. Los clientes 3/4 a cámara, la cabeza hacia Nico |
| P3 | 8,40 | depósito: grúa al ventanal; el teléfono (más grande, a la izquierda de Rubén, en cuadro) 9,30, altavoz 9,55, "Rubén, ¿y la harina?" 9,65 (cola al teléfono) |
| P4 | 10,75 | inserto del monitor ("ninguno" 10,90); la cola de la burbuja sale a la derecha (el teléfono, fuera de cuadro) |
| P4b | 11,35 | por encima del hombro de Rubén, de pie contra el vidrio con el mate (nuca abajo a la derecha); el auto ya viene entrando (10,95-12,20), los globos se ven por el techo solar; "Lo único que carga Nico es el celular." 11,45 (cola a Rubén) |
| P4c | 12,65 | inserto del tablero: el celular al 100% en su cuna sobre el tablero, cable al puerto, volante; cola de la burbuja hacia arriba a la izquierda (fuera de cuadro) |
| P5 | 13,75 | Rubén en la baranda (pasamanos a 0,85), de espaldas, desde adentro de la oficina; el auto abajo: "¡Nico!" 13,90 |
| P5b | 14,40 | contrapicado: baja la ventanilla (el vidrio desaparece), Nico adentro contra la ventanilla, el brazo afuera por encima del marco con el pulgar: "¡Ya lo cargo!" 14,60 |
| P6 | 15,44 | la pausa: bip ×3, mate en la baranda 15,99 |
| P7 | 16,44 | de costado: levanta el auto 16,49, rampa 16,79-17,39, adentro 17,39-17,64; la cámara viaja a Rubén 3/4 por debajo del techo de caños (sin parante delante de la cara, manos al volante): "Ya lo cargué." 17,69 |
| P8 | 18,49 | las puertas se cierran 18,51-18,86; celular ahogado 18,84; "Sí, sí. Ya lo cargo." 19,04 (burbuja aplastada arriba de las puertas, cola a la rendija; no tapa el remito); palmadas 20,77/20,97; el camión arranca 21,09 y se va despacio (queda en cuadro) mientras la cámara se acerca a Rubén |
| cartel | 21,79 | "Un sistema / más tarde…" (Rasalgethi +0,15); letras con menos rebote |
| Q1 | 24,29 | el encuadre de P1: toques 24,54/24,74, "Ya lo car…" 24,89, ding 25,27, la tarjeta vuela |
| Q2 | 25,77 | la tarjeta por la calle · 26,52 depósito, se parte 26,82, tilde 27,07, el operario (gorra navy/visera verde, bigote) apila 4 bolsas |
| Q2b | 27,94 | inserto del monitor: la ficha 28,24 |
| Q3 | 28,74 | de costado (como P7): el autoelevador sube la rampa con el pallet de harina; el auto limpio entra derecho del portón 29,04-29,64 y frena de costado |
| Q3b | 29,59 | contraplano desde la rampa a la ventanilla del conductor: Nico mira arriba: "Rubén, ¿lo de Graciela?" 29,64 |
| Q3c | 31,31 | Rubén 3/4 en el autoelevador (el plano de "Ya lo cargué."): "Ya salió." 31,39 |
| Q4 | 32,14 | al costado de la rampa: el camión se va por el muelle atrás; Rubén gira el autoelevador hacia la cámara (hacia Nico) y sube las horquillas 32,59 (bip, bip); Nico marcha atrás 33,14 (fuera de cuadro, se oye); línea chica 32,44 |

## Mezcla (MEDIR=1 + medir.py, momentánea por tramos de 0,5 s)
-14,0 LUFS integrado, pico -4,4 dBFS antes del loudnorm del paso 10 (el bus pasa por un limitador, como anotamelo).
Voz ≥ +6 LU sobre música+SFX en todos los tramos con voz salvo dos tramos de borde: 29,0 s (+4,1: n6 arranca a 29,34,
la ventana de 0,5 s tiene 0,16 s de voz y la cama todavía sin duck) y 32,0 s (+4,2: la cola de "Ya salió."). TECHO
-31 por efecto; cada SFX con su techo más bajo (-36 a -50). Música: pizzicato toda la parte 1 (baja 12 dB en la pausa,
nunca se corta) y la parte 2; duck -6 dB alrededor de cada voz (desde 0,45 s antes hasta 0,45 s después).

## SFX nuevos
Kenney (CC0 1.0) desde el espejo github.com/Daarko/sparkstream-sounds (kenney.nl, opengameart y freesound no responden
desde la nube): bip de marcha atrás (Digital Audio "tone1"), teléfono de escritorio ("twoTone1"), portazos y palmadas
en chapa (Impact Sounds "impactMetal_heavy/medium/light", "impactPlate_heavy"), hidráulico/ventanilla y motor eléctrico
(Sci-Fi Sounds "doorOpen_000", "spaceEngineLow_000", con pasabajos). Detalle en fuentes.md. Sin camión diésel, ring de
celular ni goma de globo reales: se resolvió con `motor.mp3` grave, `vibra.wav` con pasabajos y `k-plastico.wav`.

## Pasadas de revisión
- Armado (hojas a-k): P1 de costado no entraba en vertical (Nico fuera de cuadro, cámara dentro del mostrador) →
  mostrador paralelo a la vidriera, cámara detrás de Graciela, spiedo en la vidriera; P1 con dolly por la puerta
  quedaba pegado a la espalda de Nico → corte a P1b en la vereda; P2 de costado: Marta tapada por el auto y el auto
  "carrito de golf" → P2 de frente (parabrisas), clientes al cordón, carteles de bandera, carrocería más alta y
  vidrios con tinte; el globo de Graciela se ubicaba con la pose del cuadro anterior (impuro) → los globos se ponen
  después de posar a los personajes; la puerta del acompañante se abría hacia adentro; desde la calle se veía el depósito
  en el horizonte → cada lugar solo se dibuja con la cámara ahí; depósito oscuro → paredes más claras, techo más claro,
  luz de claraboyas; perfil del ventanal sobre la cara de Rubén → perfiles a los costados; inserto del monitor cortado →
  monitor más grande y cámara a 2,3 m; P4c con la cámara dentro de un globo y el "100 %" tapado por el tablero → celular
  más alto, cámara en el lugar de la cabeza de Nico; P5 con la cámara dentro del techo de la oficina; P6 con la cámara
  dentro de la rampa (cuadro negro); P8 con Rubén y el autoelevador delante de la cámara; el pallet GRACIELA y la zorra
  con el desplazamiento del depósito puesto dos veces (no aparecían); Q3/Q4 con la cámara dentro de un rack y el auto
  tapando todo → nueva puesta detrás del auto; el operario delante del pallet.
- Pasada A (cada 0,5 s desde 0, 68 cuadros): globo de P1 cortado en el borde; P3 con un pallet de harina en primer
  plano (se movió) y la cámara adentro del muelle; P4b sin ver el auto (cámara más alta, mira más abajo); P5 sin Rubén
  en cuadro; "Ya lo cargué." de espaldas → corte a Rubén 3/4 de frente; Rubén se da vuelta antes al irse el camión; el
  pallet de Q3 quedaba en el piso mientras el autoelevador ya subía la rampa.
- Pasada B (cada 0,5 s desde 0,25, 67 cuadros) + cortes a ±0,04 s (39 cuadros): Marta / Elsa cortadas en el borde al
  llegar el auto (ahora aparecen con el auto frenado); burbujas de la ráfaga chicas (64 px); Nico con ojos de "feliz"
  que se leían cerrados en P6; la tarjeta de Q1 no se veía (pasaba detrás de la cabeza de Nico y de espaldas) → sube
  a la izquierda de la cabeza, de frente; P1b arranca con Nico en la puerta; P5 reencuadrado.
- `check --json`: 0 errores. Warnings: "nada cambia 20 s" (la capa HTML; el 3D se mueve, igual que anotamelo), línea
  final 1,5 s (< 2 s que pide el chequeo; el formato pide ~1,5 s), canvas tocando el borde, capa3d con canvas anidado.

## Tiempos de máquina (con el candado; SwiftShader)
- snapshot: ~1,5 s por cuadro cuando el candado está libre (68 cuadros en 1 min 42 s); cuando el otro constructor
  tenía Chrome, un lote de 33 cuadros tardó > 10 min esperando el candado.
- check: 28 s. gen.mjs con mezcla: ~11-16 s (SINAUDIO: 1 s).
- No hice render de prueba (el coordinador renderiza): estimado ~25-40 min con `--workers 2` para 1012 cuadros.

## Dudoso / para los revisores
- Duración 33,7 s (plan ~31,4).
- P2: los locales se leen en los carteles de bandera; Marta, Tito y Elsa salen al cordón al lado de la trompa (no en la
  puerta: detrás del auto no se veían).
- P4b es desde detrás de la cabeza de Rubén (no por encima del hombro); el auto se ve entre los barrotes de la baranda.
- P8: Rubén en el borde derecho (de espaldas) mientras da las palmadas; el globo asoma por la rendija.
- Las puertas del camión se cierran solas en P8 y en Q3 (nadie las empuja en cuadro).
- No hay "globo que tapa la lente" en P2→P3: es un push-in al parabrisas lleno de globos y corte con whoosh.
- El auto en las horquillas: el piso del auto apoya en el carro (no se modeló el contacto exacto de las horquillas).
- La voz de Graciela por teléfono (g1) y "¡Nico!" están entendibles para el STT a medias ("Rubén y Melina"); al oído
  conviene confirmarlas.

## Ronda 1 de corrección (14-11, otro constructor)
Lista: scratchpad/ronda1/ya-lo-cargo.md. Todo sale igual de `node gen.mjs`.
- **Baranda (ALTA 1):** pasamanos de 1,05 a 0,85 (`BAR_H`), travesaño a 0,45; Rubén 5 cm más atrás, `inclina` 0,1 y las
  manos apoyadas en el pasamanos. Desde el contrapicado de P5b/P6 el pasamanos queda debajo del mentón.
- **Nico y el auto (ALTA 2):** carrocería más baja (cintura de 1,15 a 0,95: puerta, franja, capot), el vidrio de la
  ventanilla se esconde al bajar, Nico NO saca la cabeza (no entraba por el hueco: la cabeza mide 0,62 m): queda adentro,
  adelante del parante central, y saca el brazo por encima del marco con el pulgar. Volante y tablero corridos para que el
  cuerpo no los atraviese. En la parte 2 el auto entra derecho y frena de costado (Q3b lo toma de frente a la ventanilla).
- **P7b (ALTA 3):** la cámara final de P7 pasa a la derecha, por debajo del techo de caños y por detrás del parante
  delantero; Rubén 15 cm más adelante en el asiento, manos en el volante (`MANOS_ELEV`, también en la parte 2), la cabeza
  gira 0,45 hacia cámara en "cargué"; saqué el parpadeo de 17,9 (caía en la palabra).
- **P4b (ALTA 4):** Rubén se para y va al vidrio con el mate (P4 inserto tapa el salto); plano por encima del hombro con
  la nuca abajo a la derecha; techo solar en el auto (se ven los globos desde arriba); el auto ya viene entrando en el
  corte (`T.entra` arranca 0,4 s antes); cola de la burbuja a la cabeza de Rubén.
- **P4c (ALTA 5):** el celular en una cuna navy con pestañas apoyada en el tablero, borde del tablero contra el
  parabrisas, cable crema en curva a un puerto, columna del volante; cámara apuntada al celular (sin cizalla: el "1" se
  lee); cola de la burbuja hacia arriba a la izquierda (fuera de cuadro).
- MEDIA: P5 reencuadrado desde adentro de la oficina (Rubén entero); pelo de atrás de Rubén = mechones canosos sobre la
  corona achicada (ya no casco liso); P8 reencuadrado (Rubén entero), el camión queda en cuadro yéndose y la cámara se
  acerca a Rubén (sin cuadro vacío); burbuja de P8 arriba de las puertas; puertas 0,35 s; operario con gorra y bigote;
  cartel del pallet en Lexend ("GRACIELA"); P2 con cámara tele/baja y el auto lleno de verdad; burbujas del bar/kiosco
  más abajo (no tapan); clientes 3/4 a cámara (los ojos ya no se leen cerrados), manos al costado, no delante de la
  cara; P3 teléfono 1,6× en cuadro, cola al teléfono; P4 cola fuera de cuadro a la derecha; Q3/Q4 en 4 planos (Q3 de
  costado con el pallet, Q3b contraplano a Nico, Q3c Rubén 3/4 en "Ya salió.", Q4 Rubén de frente levantando las
  horquillas con el camión yéndose atrás).
- Voces: g1 nueva toma (Gacrux, "Rubén, ¿y la harina?"; la burbuja dice lo mismo): con "mi harina" el STT oía
  "Melina/marina" en 12 tomas (fonéticamente "miarina"); la 04-3d sola la oye bien ("Rubén y la harina"); en la mezcla
  completa el STT a veces dice "la Lina". r2 "¡Nico!" con eco de 40 ms (antes 70) y +1 dB en la mezcla. Tomas en
  partes/tomas2/ (g1-viejo.wav y r2-viejo.wav son las anteriores).
- Mezcla: tonos del teléfono más cortos (terminan antes de la voz), teclas de Q1 más bajas, la música de la parte 2 entra
  con fundido de 0,9 s. medir.py: todos los tramos con voz ≥ +6 LU salvo 24,5 s (+0,7: la ventana solo tiene los
  primeros 0,1 s de "Ya lo car…"); 29,0 y 32,0 del reporte anterior ya pasan. -14,0 LUFS, pico -4,7 dBFS pre-loudnorm.
- BAJA hechos: globo de P1 sale de costado y más lejos del borde; letras del cartel con menos rotación y rebote;
  "sin pedido" del remito ~45 px (remito 0,95×0,66 m, letras más grandes). No hechos: la tarjeta que entra al monitor en
  Q2b (27,9) sigue cortada al entrar; la mota verde de P4b ya no aparece (cambió el plano).
- Portada: queda en 16,95 (el auto en las horquillas) porque el plano del auto lleno sigue siendo un auto de frente;
  regeneré `portada-src/fondo-limpio-16.95.png` con LIMPIO=1 (el auto cambió de forma).
- Pasadas: a1-a9 (puntuales), p1a+p1b (cada 0,5 s desde 0), cortes ±0,04 (38), p2a+p2b (cada 0,5 desde 0,25).
  `check --json`: 0 errores.

## Ronda 2 de corrección (14-11)
- **Pelo de Rubén (ALTA):** la `corona` (gajo de esfera: de costado, parche gris cuadrado) queda oculta; en su lugar una
  herradura de bolitas canosas medio hundidas en el cráneo (24 de oreja a oreja, más gruesas atrás, + 11 en la nuca),
  con tamaños y alturas irregulares: de costado son mechones detrás de la oreja, de espaldas una herradura de contorno
  ondulado.
- **Q4 rehecho en dos planos:** Q4 (32,14) en el eje del autoelevador desde la rampa: gira, la cara de Rubén entre los
  dos parantes del mástil (nada le cruza la cara), horquillas abajo en cuadro, el camión se va atrás por el muelle, la
  cabeza lejos de la línea final; Q4b (32,99) entre las horquillas levantadas (la punta abajo) apuntando al auto: Nico
  en la ventanilla y el auto que se va marcha atrás (4 m: queda en cuadro). "Ya salió." termina en 32,14 (antes del
  corte). Saqué el golpe de chapa de 32,16.
- Globos: desde arriba (P4b, P5) se acuestan bajo el techo solar con el texto hacia arriba (`ARRIBA`); en P8 (desde atrás
  del camión) se giran 180° (se leen por la luneta); P2 lleno con 7 globos repartidos contra parabrisas, techo,
  ventanilla y el cachete de Nico (`LLENO`, el 1 corrido para no atravesar la cabeza de Nico).
- P7 con Rubén en cuadro (cámara más cerca del eje, sin el rack en primer plano); P4c más bajo (abajo tablero y volante,
  no capot blanco); Q2 más cerca del operario; P3 el teléfono entero.
- Sonido/ritmo: "¡Nico!" 0,13 s antes (13,77; P5b sigue en 14,40): más aire hasta "¡Ya lo cargo!"; el camión de P8 se
  ve moverse desde que arranca (21,09). Duración sin cambios: 34,04 s. medir.py: igual que la ronda 1 (solo el borde de
  24,5 s, +0,7).
- BAJA: la tarjeta de Q1 sale primero de costado (ya no nace delante de la cara; y su escala estaba dentro de un
  comentario); el texto del cartel se va antes de que abra el iris; letras del cartel con menos escala inicial; visera
  del operario más arriba; cartel del pallet 0,86×0,5 m y "GRACIELA" corrido a la izquierda de la tilde; pulgar de Nico
  más grande; guion.txt y comentarios ("la harina", línea chica, Nico con la cabeza adentro). No hecho: la tarjeta que
  entra al monitor en Q2b.
- Portada: `portada-src/fondo-limpio-16.95.png` regenerado (cambió la cámara de P7).
- Pasadas: r2a-r2d, q1a/q1b (cada 0,5 s), cortes ±0,04 (40 cuadros). `check --json`: 0 errores.

## Pulido final (14-11)
- Burbujas del bar y del kiosco a 74 px ("¿Y el agua / con gas?" en dos líneas); P7 con Rubén entero (cámara más cerca
  del eje, apunta a ze+0,75; el pallet suelto de agua que tapaba abajo pasó a x 2,2 z -6,9); pelo de Rubén con bolitas
  más chicas y más bajas, finas a los costados, nuca mínima; Q2 arranca más cerca y más bajo (menos piso); Q4b la marcha
  atrás de 2,2 m (el auto termina en cuadro con Nico); sin el golpe de chapa de 31,34; guion.txt sin "Nico, aliviado,
  pulgar arriba". Fondo limpio de la portada (16,95) regenerado. medir.py igual (solo el borde de 24,5 s); check 0 errores.
