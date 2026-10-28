# Reels de Scalerics

Reels verticales (1080x1920, ~50-60 s) para el Instagram de Scalerics, la software factory de
Montevideo que vende a comercios: bots de WhatsApp, Scalerics Puntos (fidelización), tiendas
online y sitios web. Los hace un agente, de punta a punta: guion, voz, escenas animadas con
HyperFrames, render. Este archivo es el proceso; seguilo en orden.

Ejemplos aprobados por Juan (mirarlos antes de hacer uno nuevo):
- Estilo de líneas sobrio: `reels/puntos-que-vuelven`, `reels/bot-whatsapp`, `reels/descuentos`,
  `reels/el-de-enfrente`, `reels/clientes-fantasma`.
- **Estilo cargado (el que más le gustó, 28-10: "quedó muy bueno")**: `reels/negocio-zombi` (paleta
  propia, capa `compositions/ambiente.html` con niebla, chispas y rayos, glitch, rellenos y brillos) y
  `reels/tu-jarvis` (interfaz holográfica tipo asistente de IA, dos voces: narrador y asistente).
  Los dos cambian su `armar.mjs` local (fondo, color de acento de los subtítulos y la capa de
  ambiente): copiá esa forma de hacerlo.

## LA REGLA NÚMERO UNO: que no sean todos iguales

Los 25 reels de la primera noche (28-10) salieron con el mismo arco, el mismo estilo y el mismo cierre,
y Juan dijo: "quedaron muy parecidos, todos iguales, hablando de lo mismo y mismo formato... mucho más
originalidad". Variar el tema NO alcanza: cada reel de una tanda tiene que ser distinto en **formato
de guion**, **estilo visual** y **cierre**, y distinto de los de las últimas dos noches (mirá "Hechos"
en `ideas.md`, que ahora anota formato y estilo).

**Formatos de guion** (cada uno a lo sumo 1 vez por tanda):
- A. **Verdad incómoda**: gancho polémico, la verdad con un contraste concreto, el producto. Máximo 1
  por tanda. SIN el "no es X, ni Y, ni Z" (ver abajo).
  un cliente que escribe y un comercio que no contesta; dos dueños charlando; un asistente que habla
  (como `tu-jarvis`). Las voces se generan por partes y se pegan con ffmpeg (ver tu-jarvis).
- C. **Lista**: "3 señales de que…", "Las 4 cosas que hace distinto el comercio que…". Números
  grandes en pantalla, cada ítem una escena.
- D. **Historia de un cliente**: un personaje con nombre ("Lucía entra a tu local un martes…") y lo
  que le pasa en dos versiones de la misma historia.
- E. **Pregunta al que mira**: "¿Cuál de estos dos locales vende más?", se muestran los dos, se deja
  pensar y se revela. Pide comentar la respuesta.
- F. **Mito o verdad**: 3 frases que todo dueño dice, cada una con sello MITO / VERDAD.
- G. **Simulación de pantalla**: la interfaz del producto contando la historia (HUD, celular a
  pantalla completa, el panel del dueño), como `tu-jarvis`.
- H. **Fecha del calendario**: si hay una fecha cerca (Halloween, Día de la Madre, Black Friday,
  Navidad, vacaciones de julio), un reel temático con doble sentido, como `clientes-fantasma` o
  `negocio-zombi`.

**Estilos visuales** (no repetir en la misma tanda): líneas crema clásico; paleta temática con capa
de ambiente (zombi); interfaz holográfica (jarvis); tipografía gigante (kinetic type: las palabras
clave enormes ocupando la pantalla, cortes en cada palabra); celular a pantalla completa con UI real
dibujada; papel/collage (recortes, cinta, sellos, texturas planas). Cada estilo con su paleta de 3 a 5
colores en el SPEC, su fondo en `armar.mjs` y, si suma, una `compositions/ambiente.html`.

**El gancho**: lo que más funcionó es el doble sentido ("Tu local está lleno de fantasmas", "Tu
negocio no está muerto: es peor, es un zombi"). Que pique en 2 segundos.

**Muletillas PROHIBIDAS** (Juan, 28-10: "cansa siempre lo de no es la crisis, siempre lo mismo"):
- Descartar explicaciones en fila: "No es la crisis. Ni el barrio. Ni la competencia.", "No es
  suerte, ni el local, ni la plata" y cualquier variante. En ningún formato.
- "No es suerte / no es caro: es tener un sistema" y "es tener un sistema" en general.
- Cerrar siempre con "Comentá PALABRA y te contamos cómo": variar ("Guardalo para cuando…",
  "Mandáselo al dueño que…", "Respondé en los comentarios cuál…", o "Comentá PALABRA" con otra
  frase), siempre con una sola acción clara.

## El estilo de base (cuando toca el clásico)

- Fondo navy casi negro con brillo verde suave; ilustraciones de líneas crema `#efeee5` que se
  dibujan solas; un solo acento verde `#5ce611`; subtítulos karaoke arriba a la izquierda
  (Lexend 600); una etiqueta mono verde y espaciada debajo del dibujo; logo de Scalerics abajo.
  Todo eso ya lo arman `molde/armar.mjs` y `molde/SPEC-base.md`. En los otros estilos, el SPEC del
  reel dice qué cambia y manda sobre SPEC-base.
- Siempre: nada de emojis ni fotos; nada de rayas largas (—) en textos visibles: usar ":" o "·".
- Voz: Gemini TTS, voz Orus, acento uruguayo (`herramientas/voz.mjs`); otras voces de Gemini para
  diálogos. Juan rechazó edge-tts y las voces Chirp de Google ("horribles").

## El guion (lo más importante)

Público: dueños de comercios de Uruguay **a los que les va bien o regular y quieren crecer**. NO
apuntar a los que se están fundiendo (no tienen plata y no compran: decisión de Juan, 27-10).

Lo que se vende (no prometer nada fuera de esto):
- Bot de WhatsApp: contesta al instante a cualquier hora con tus precios y horarios, agenda
  turnos, toma pedidos y te pasa la consulta cuando es para vos.
- Scalerics Puntos: el cliente suma con cada compra, lleva la tarjeta en el celular, canjea
  premios; si deja de venir le llega un aviso; el dueño ve quiénes son y cada cuánto vienen.
- Tienda online: vende sola, con envíos (DAC, Correo, PedidosYa) y Mercado Pago.
- Sitio web: rápido en el celular, con horarios, ubicación y botón a WhatsApp o a la tienda.

Reglas: voseo uruguayo; Scalerics habla en plural ("hacemos", "te contamos"); 130-175 palabras
(con Orus son ~45-58 s); frases cortas; sin cifras ni estadísticas inventadas; polémico sin
insultar ni burlarse. Cada reel lleva `reels/<slug>/descripcion.txt`: la descripción para
Instagram/TikTok (gancho, 2-3 líneas, la acción del cierre y 5-6 hashtags), que usa el publicador.

## Cuántos por corrida: 5, en paralelo

Cada corrida de la rutina hace **5 reels** (pedido de Juan, 27-10). Vos sos el coordinador:

1. Elegí los 5 temas (paso 1) distintos entre sí, **cada uno con un formato y un estilo distintos** (ver "La regla número uno"), y reservalos los 5 juntos en `ideas.md`, en un
   solo commit y push a `main`. **Variedad** (pedido de Juan: "que no sean todos de bots"): en
   cada tanda, ningún producto más de 2 veces, y al menos 3 distintos entre Puntos, Bot de
   WhatsApp, Tienda online, Sitio web y "todo Scalerics" (como `el-de-enfrente`). Mirá también
   las últimas tandas en "Hechos" para no repetir el mismo producto noche tras noche.
2. Lanzá 5 subagentes con la herramienta Agent, **todos en el mismo mensaje** para que corran a la
   vez, uno por reel. A cada uno le pasás el `<slug>` y el tema, y le decís que haga los pasos 2 a 9
   de este archivo en `reels/<slug>/` (sin renderizar ni commitear) y que te devuelva el gancho y
   qué quedó flojo. Un subagente no puede lanzar otros: sus escenas las hace él, en orden.
3. **Chrome es de a uno.** La máquina tiene 4 CPU y 15 GB: todo comando que abre Chrome
   (`snapshot`, `check`, `render`) va con candado, y decíselo así a cada subagente:
   `flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 snapshot ...`
   (lo mismo para `check`). La voz y los tiempos sí pueden ir en paralelo.
4. Cuando vuelvan los 5, hacé vos el paso 10 (render, con el mismo candado) y el 11 de cada uno,
   de a uno. Si un subagente no terminó, entregá lo que haya en su rama `reel/<slug>` y dejalo en
   "En curso" con la nota de qué falta: la próxima corrida lo termina antes de arrancar nuevos.
5. La notificación final lista los 5 ganchos y sus ramas.

## El proceso

Todo desde la raíz del repo salvo donde dice. `<slug>` = nombre corto del reel en kebab-case.

1. **Tema.** Leé `ideas.md`. Elegí uno del banco o uno nuevo que no repita ninguno hecho ni en
   curso. **Reservalo enseguida**: agregalo a "En curso" con la fecha, commit y push a `main`
   (otra corrida puede estar arrancando a la vez). Si el push falla porque cambió `main`, hacé
   pull, revisá que nadie haya tomado el mismo y reintentá.
2. **Proyecto.** `cp -r molde reels/<slug>` y escribí `reels/<slug>/guion.txt` (una frase por
   línea).
3. **Voz.** Desde `reels/<slug>`:
   `node ../../herramientas/voz.mjs guion.txt assets/voice/locucion.wav`
   Si falla por la credencial (no hay `GOOGLE_SA_JSON`), andá al paso "Sin voz" al final.
4. **Tiempos.** `node ../../herramientas/tiempos.mjs assets/voice/locucion.wav guion.txt assets/voice/palabras.json`
   Compará lo que imprime en "oyó:" contra el guion. Si la voz se salteó o cambió frases enteras,
   regenerala (paso 3). Que interpole 3-5 palabras sueltas es normal.
5. **Escenas.** Escribí `reels/<slug>/reel.json` (ver el de `reels/el-de-enfrente`):
   - `escenas`: 10-12, cada una `[id, índice de la palabra donde arranca]`. Cortá al principio
     de una frase; ninguna de menos de ~1.7 s; la última es el CTA.
   - `cortes`: grupos de subtítulos de hasta ~9 palabras, cortando en frase.
   - `acento`: 1-3 palabras fuertes por frase (las que el ojo tiene que agarrar).
   Corré `node armar.mjs` (desde `reels/<slug>`): genera `tiempos.md` con las palabras de cada
   escena en segundos relativos.
6. **SPEC.** `reels/<slug>/SPEC.md` = un encabezado del reel (de qué trata, qué recurso visual
   central tiene) + `molde/SPEC-base.md` + un brief por escena: qué se dibuja y en qué palabra
   cambia cada cosa. Mirá los SPEC de los ejemplos: así de concretos.
7. **Escena modelo.** Escribí vos `compositions/s01-...html` y su `.sfx.json`, copiando la
   estructura de un s01 de los ejemplos (helpers `dibujar()` y `pop()`, etiqueta, salida con
   blur). GSAP local: `<script src="assets/vendor/gsap.min.js"></script>`. Corré `node armar.mjs`
   y `npx --yes hyperframes@0.8.206 snapshot --at <4-5 tiempos> --no-end`, y MIRÁ los PNG.
8. **El resto de las escenas.** Si tenés la herramienta Agent, repartilas entre 3-4 subagentes
   en paralelo (2-3 escenas cada uno), con un prompt como el que se usó en los ejemplos: leer
   SPEC.md, tiempos.md, la escena modelo y un par de escenas de los ejemplos; escribir solo sus
   archivos; verificar con snapshots y check. Si no, hacelas vos en orden.
9. **Revisión.** `node armar.mjs`, `npx --yes hyperframes@0.8.206 check --json` (cero errores) y
   `npx --yes hyperframes@0.8.206 snapshot --at <~20 tiempos repartidos> --no-end`. Mirá las hojas
   de contacto: textos cortados o encimados, dibujos fuera de la zona (y 580-1330), escenas vacías,
   cosas que no tienen que ver con lo que se dice. Corregí y volvé a mirar.
10. **Render.** Desde `reels/<slug>`:
    ```
    npx --yes hyperframes@0.8.206 render --workers 2 -o renders/<slug>.mp4
    ffmpeg -y -i renders/<slug>.mp4 -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k renders/<slug>-final.mp4
    ```
    Sacá una hoja de cuadros del final (`ffmpeg -i renders/<slug>-final.mp4 -vf "fps=1/3,scale=240:-1,tile=6x3" -frames:v 1 renders/hoja.png`)
    y mirala.
11. **Entrega.**
    - En `main`: todo `reels/<slug>/` **menos** `renders/` (lo ignora `.gitignore`), y en
      `ideas.md` pasá el tema de "En curso" a "Hechos" con una línea de qué dice el gancho, y entre corchetes el formato y el estilo (ej. `[formato B · estilo HUD]`).
    - En una rama `reel/<slug>`: lo mismo más `renders/<slug>-final.mp4`
      (`git add -f`). Así el mp4 no engorda `main`.
    - Push de las dos.
    - Si el push a `main` falla (403 del proxy de la nube), no insistas: dejá todo, incluido
      `ideas.md`, en la rama `reel/<slug>` y decilo en la notificación. Las ramas `reel/*` sí andan
      (probado el 27-10). Borrar ramas remotas desde la nube NO anda: no lo intentes.

**Sin voz** (no hay `GOOGLE_SA_JSON` o la API falla): hacé hasta el SPEC con tiempos estimados
(0.34 s por palabra) y entregá en la rama `reel/<slug>` el guion, el reel.json y el SPEC, sin
escenas. En `ideas.md` dejalo en "En curso" con la nota "falta voz". La próxima corrida con credencial
lo termina antes de arrancar uno nuevo.

**Si la voz cambia con las escenas ya hechas**: no rehacer las escenas. Corré `node armar.mjs`
(recalcula inicios y duraciones) y en cada escena estirá su timeline por
`ratio = duración nueva / duración vieja`: cambiá su `data-duration`, y en vez de registrar `tl`
registrá `tlx`: `tl.paused(false); tl.timeScale(1 / ratio); const tlx = gsap.timeline({ paused: true }); tlx.add(tl, 0);`.
Los `t` de su `.sfx.json` se multiplican por el mismo ratio. Así quedó `reels/descuentos`.

## Trampas ya pagadas

- `cdn.jsdelivr.net`, Hugging Face, HeyGen y Microsoft están bloqueados en la nube. GSAP va local
  (`assets/vendor/gsap.min.js`); los tiempos salen de Speech-to-Text de Google, no de whisper.
- `snapshot`, `check` y `render` abren Chrome y comen memoria: nunca dos a la vez (`flock /tmp/hyperframes.lock ...`). `--workers 2`.
- En SVG, rotar/escalar con `svgOrigin`, no `transformOrigin`.
- Un trazo con caps redondos sin dibujar deja un puntito: `dibujar()` lo deja en opacity 0
  hasta que arranca.
- `error.mp3` tiene un tramo mudo al principio: usar `glitch-1`.
- El cuadro 0 no puede estar negro: la escena 1 arranca con el dibujo a medio hacer.
