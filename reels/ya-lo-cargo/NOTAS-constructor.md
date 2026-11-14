# ya-lo-cargo · notas del constructor (14-11)

Proyecto como anotamelo / te-queda: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). No usa `armar.mjs` ni `armar.mjs unir`: parte 1, cartel y parte 2 están en un solo proyecto.
La escena 3D entera está en `assets/tres.js`; `assets/personajes.js` = el de anotamelo (rodillas, `sentado`) +
`ELENCO.ruben` copiado tal cual de reels/abren-hoy (Rubén = `ELENCO.ruben` en todos los planos; `almacenero` no se usa).
Herramientas locales: `./snap.sh "t1,t2,…" nombre` (snapshot con el candado, PNG + hoja en renders/snap/<nombre>/),
`python3 medir.py` (voz contra resto por tramos de 0,5 s; necesita `MEDIR=1 node gen.mjs` antes).

**Duración: 33,74 s** (parte 1 0-21,49 · cartel 21,49-23,99 · parte 2 23,99-33,74; línea chica desde 32,14).
Más largo que los ~31,4 del plan: la voz de Marta (1,63 s) y la de Rubén (2,20 s) son las tomas reales, y el remate
del remate (1,73 s, ya acelerado 1,15) más las palmadas. Si hay que recortar: la ronda (bar/kiosco 0,2 s c/u), el
cartel a 2,4 s, o 0,3 s de la grúa de P3.

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

## Planos (segundos globales)
| plano | desde | qué |
|---|---|---|
| P1 | 0,00 | detrás del mostrador: Graciela de espaldas abajo a la izquierda, Nico de frente, el spiedo en la vidriera, el auto afuera. Gancho-burbuja HTML "Ya lo **cargo.**" (cola a Nico) + burbuja de Graciela. "Ya lo cargo." 0,30, pulgar 0,75, el globo "40 harina · lunes" sale del celular 1,00; 1,45 se va hacia la puerta |
| P1b | 1,72 | la vereda: sale con el globo al lado de la cabeza, abre la puerta del acompañante 2,05, el globo entra apretado 2,20-2,50, cierra 2,55 |
| P2 | 2,70 | la ronda, el auto de frente (parabrisas: Nico y los globos): Marta 2,95 (voz 3,00) · "Ya lo cargo." 4,68 · bar 5,75 · kiosco 6,35 · ráfaga 6,95/7,25/7,55 · lleno 7,90 (aplastados, cachete) + push-in |
| P3 | 8,40 | depósito: general bajo con racks, grúa al ventanal; teléfono 9,30, altavoz 9,55, "Rubén, ¿y mi harina?" 9,65 |
| P4 | 10,75 | inserto del monitor ("ninguno" 10,90) |
| P4b | 11,35 | desde detrás de la cabeza de Rubén, abajo entra el auto lleno; "Lo único que carga Nico es el celular." 11,45 |
| P4c | 12,65 | inserto del tablero: el celular al 100 % (la cámara ocupa el lugar de la cabeza de Nico: Nico y el globo 6 ocultos) |
| P5 | 13,75 | Rubén en la baranda, de espaldas, el auto abajo: "¡Nico!" 13,90 |
| P5b | 14,40 | contrapicado: baja la ventanilla, Nico asomado con el pulgar: "¡Ya lo cargo!" 14,60 |
| P6 | 15,44 | la pausa: bip ×3, mate en la baranda 15,99, música -12 dB |
| P7 | 16,44 | de costado: levanta el auto 16,49, rampa 16,79-17,39, adentro 17,39-17,64; corte a Rubén 3/4 en el autoelevador: "Ya lo cargué." 17,69 |
| P8 | 18,49 | las puertas se cierran; celular ahogado 18,54; "Sí, sí. Ya lo cargo." 18,74 (burbuja aplastada en la rendija); palmadas 20,47/20,67; el camión se va 20,79 y Rubén se da vuelta, cara de nada |
| cartel | 21,49 | "Un sistema / más tarde…" (Rasalgethi +0,15); corte seco de entrada, iris de salida desde el celular de Nico |
| Q1 | 23,99 | el encuadre de P1: toques 24,24/24,44, "Ya lo car…" 24,59, ding 24,97, la tarjeta "Cargado ✓" vuela |
| Q2 | 25,47 | la tarjeta por la calle (sin globos) · 26,22 entra al depósito, se parte 26,52, tilde del cartel 26,77, el operario apila 4 bolsas 26,89-27,34 |
| Q2b | 27,64 | inserto del monitor: la ficha 27,94 |
| Q3 | 28,44 | detrás del auto limpio (frena donde lo levantaron en la parte 1); el autoelevador sube la rampa con el pallet; "Rubén, ¿lo de Graciela?" 29,34 (asomado); puertas 30,82; "Ya salió." 31,09 (de espaldas, sin mirarlo) |
| Q4 | 31,84 | el camión sale; pulgar; Rubén gira el autoelevador 180° y sube las horquillas 32,29 (bip, bip); marcha atrás 32,84; línea chica 32,14 |

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
