# Reels de Scalerics

Reels verticales (1080x1920, ~50-60 s) para el Instagram de Scalerics, la software factory de
Montevideo que vende a comercios: **agentes de IA** (el producto estrella), Scalerics Puntos
(fidelización), tiendas online y sitios web. Los hace un agente, de punta a punta: guion, voz, escenas animadas con
HyperFrames, render. Este archivo es el proceso; seguilo en orden.

## LO PRIMERO: la línea de Juan del 02-11 (MANDA SOBRE TODO LO DE ABAJO)

Juan, 02-11: "nuestro Instagram es un zoológico hoy en día". Hay reels "muy infantiles", otros
"como de jueguitos" y otros "para más maduros". Desde ahora:
1. **Público: pymes.** Dueños y encargados de pymes y comercios uruguayos que quieren crecer.
   Todo reel tiene que hablarles a ellos, con temas de su día a día (clientes, ventas, equipo,
   tiempo, orden, crecer), en tono adulto y profesional, con humor inteligente.
2. **Una sola línea, con la marca de Scalerics.** Paleta de marca: azul navy de fondo y verde
   `#5ce611` de acento, con crema `#efeee5` y blanco (ver "El estilo de base"). Tipografías de
   marca (Lexend, mono) y logo. Que el feed se vea de la misma empresa. **Nada de jueguitos**:
   ni videojuego retro, ni cómic, ni piratas, ni lucha libre, ni dibujos infantiles, ni paletas
   que no sean las de la marca. Las variantes son de formato y de tema DENTRO de la marca, no de
   identidad visual (los estilos de la lista de abajo valen solo si se hacen con la paleta de
   marca y un look sobrio: estudio de TV, noticiero, entrevista, pantalla de celular, documental,
   tipografía gigante en azul/verde/crema).
3. **Variantes sí, pero no todo es agente de IA o "chatbot"** ("ya estamos aburriendo"). Por
   tanda de 5: **como mucho 1 de agentes de IA**; los otros de automatizaciones, sistemas a
   medida, CRM, tienda online, sitio web, Scalerics Puntos, y también consejos de gestión o
   crecimiento para pymes donde Scalerics aparece solo al final.
   **Y no todo es "el comerciante que no contesta los mensajes"** (Juan, 02-11): ese dolor (dejar
   en visto, no contestar de noche, el WhatsApp lleno) va como mucho en 1 reel por tanda. Otros
   dolores de pyme: el tiempo que se va en tareas a mano, el Excel y el cuaderno, no saber qué se
   vende ni a quién, el stock, los presupuestos que nadie sigue, el cliente que no vuelve, crecer
   sin desordenarse, delegar, abrir otro local, vender online, que te encuentren en Google.
4. **Gancho y viralidad sí, agresividad no.** Nada de insultar, acusar ni burlarse del
   comerciante o de sus clientes ("son unos vagos", "ojalá te fundas", "te voy a robar los
   clientes", "tu cliente te está siendo infiel" quedan como ejemplos de lo que YA NO va). El
   gancho pica por curiosidad, identificación o sorpresa ("esto le pasa a todas las pymes", "el
   error que más plata te cuesta", "lo que hacen los que crecen"), y el dueño siempre queda bien
   parado: se lo trata con respeto, como a un colega.
5. Los reels de abajo marcados como ejemplos (vagos, ojala-te-fundas, el-golpe, el-juicio, infiel,
   negocio-zombi) sirven solo por el ritmo y la edición, NO por el tono ni por el estilo visual.

**Publicación:** Juan no aprueba a mano (02-11: "no esperes a que yo te los apruebe, nos
olvidamos"). El publicador (`herramientas/publicar.mjs`) toma primero la cola de aprobados y, si
está vacía, el reel más nuevo que no se publicó ni se descartó. O sea: lo que sube la rutina sale
publicado. Por eso cada reel tiene que estar listo para salir: revisalo vos como si fueras Juan.

Ejemplos aprobados por Juan (mirarlos antes de hacer uno nuevo):
- **LO QUE MÁS LE GUSTÓ (28-10, "me encantaron", "muy buenos", "pa me encantó"): polémicos de
  verdad, con personajes, referencias y edición cargada.** Copiá el NIVEL de estos:
  - `reels/vagos`: "Los comerciantes uruguayos son unos vagos." (gancho que ofende al que mira) y
    GIRO a favor del dueño ("no es ser vago: es estar solo"). Tipografía gigante negro/amarillo/rojo.
  - `reels/almacen`: CONFESIÓN de un vecino: "Dejé de comprar en el almacén del barrio. El de
    Rubén." Papel y collage, letra manuscrita (Caveat). Cierre: "Mandáselo a tu almacenero."
  - `reels/ojala-te-fundas`: MONÓLOGO DEL VILLANO (la competencia) con voz grave (Gemini Algenib)
    desde una guarida de monitores de vigilancia; corte a la luz cuando entra el narrador.
    Cierre: "Etiquetá a tu competencia. Que se entere."
  - `reels/el-golpe`: un PILLO explica en PASOS cómo te va a robar los clientes, como en una
    película de atracos, lleno de REFERENCIAS (La Casa de Papel, Heisenberg, "¿qué mirás, bobo?",
    la culpa al dólar, "no hay paso cinco"). Plano de atraco azul. Dos voces (Fenrir + Orus).
  - `reels/el-juicio`: PROGRAMA DE JUICIOS DE TV (estilo Caso Cerrado, personajes inventados):
    la clienta demanda a tu local, el dueño se defiende con "una tarjetita de cartón", abucheo,
    CULPABLE, "¡caso cerrado!", "o apelá". Cuatro voces (Kore, Leda, Charon, Orus).
  - También le gustaron: `reels/infiel` (telenovela: "tu cliente te está siendo infiel"),
    `reels/negocio-zombi`, `reels/tu-jarvis`.
- Estilo de líneas sobrio (el viejo, máximo 1 por tanda o ninguno): `reels/puntos-que-vuelven`,
  `reels/el-de-enfrente`, `reels/clientes-fantasma`.
- Todos los cargados cambian su `armar.mjs` local (fondo, color de acento de los subtítulos y la
  capa `compositions/ambiente.html`): copiá esa forma de hacerlo.

## Lo de antes (28-10), que vale solo si no choca con "LO PRIMERO": polémico, con personajes, y que no sean todos iguales

Juan, 28-10: los 25 reels de la primera noche salieron "todos iguales, hablando de lo mismo y mismo
formato". Después pidió, una y otra vez, **"mucho más polémico"**, "bien viral", "gancho fuerte",
"tipo pillo, con referencias". Lo que le encanta:
1. **Un gancho de UNA frase que pica** en el primer segundo: ofende, acusa, da culpa o da
   morbo ("son unos vagos", "ojalá te fundas", "te voy a robar los clientes", "tu cliente te está
   siendo infiel", "dejé de comprar en el almacén"). Hablale al dueño en la cara.
2. **Un PERSONAJE que habla** (no un narrador que explica): el villano de enfrente, el pillo, la
   jueza, la clienta indignada, el vecino que confiesa, el asistente de IA. Con su voz propia de
   Gemini, y nuestro narrador (Orus) solo al final, cuando entra Scalerics.
3. **Un formato reconocible de la cultura popular** que el que mira ya conoce: película de
   atracos, programa de juicios, telenovela, monólogo de villano, confesión, stream o podcast,
   documental de crímenes, reality, noticiero de último momento, partido con relator, entrevista
   de trabajo, cita a ciegas, sesión de terapia, examen, subasta, el "roast".
4. **Referencias** (series, películas, fútbol, memes, cosas uruguayas: el dólar, el "pasá el
   lunes", el almacén, la feria) **solo
   nombradas**: nunca logos, caras, música ni imágenes de la obra; personajes dibujados genéricos.
5. **Un GIRO** a la mitad (el dueño no es vago: está solo; el súper no es mejor: le hace caso) y
   **un cierre que da para comentar o compartir**: "¿culpable o inocente?", "etiquetá a tu
   competencia", "mandáselo al que dice...", "te leemos en los comentarios".
6. **Humor**: lo polémico funciona porque es gracioso, no porque es agresivo.

Y además, dentro de cada tanda, cada reel distinto en **formato**, **estilo visual** y **cierre**, y
distinto de los de las últimas dos noches (mirá "Hechos" en `ideas.md`, que anota formato y estilo).

**Formatos de guion** (cada uno a lo sumo 1 vez por tanda; preferí los de personaje):
- P. **Personaje de la cultura popular** (EL PREFERIDO): un formato de TV, cine o internet con
  personajes que hablan (ver la lista del punto 3). Como `el-juicio`, `el-golpe`,
  `ojala-te-fundas`, `infiel`. Puede haber hasta 2 de este tipo por tanda si los formatos de
  cultura popular son distintos.
- A. **Polémica con giro**: un gancho que ofende al que mira y un giro que lo defiende, como
  `vagos`. SIN el "no es X, ni Y, ni Z" (ver abajo).
- B. **Diálogo** de dos o más voces: un cliente que escribe y un comercio que no contesta, el
  dueño contra su conciencia, un asistente que habla (como `tu-jarvis`).
- C. **Lista en pasos**: "Cómo te robo los clientes en 4 pasos", con números gigantes de capítulo,
  como `el-golpe`.
- D. **Confesión o historia de un cliente** con nombre ("el de Rubén", "Lucía"), como `almacen`.
- E. **Pregunta al que mira**: se muestran dos locales, se deja pensar y se revela; pide votar.
- G. **Simulación de pantalla**: la interfaz contando la historia (HUD, celular a pantalla completa).
- H. **Fecha del calendario**: si hay una fecha cerca (Halloween, Día de la Madre, Black Friday,
  Navidad, vacaciones de julio), con doble sentido, como `clientes-fantasma` o `negocio-zombi`.

**Varias voces** (cómo se hizo en `el-golpe` y `el-juicio`): un .txt por parlamento en
`reels/<slug>/partes/`, cada uno con su voz y su tono
(`node ../../herramientas/voz.mjs partes/01.txt partes/01.wav --voz Kore --tono "..."`; voces que
anduvieron: Orus narrador, Kore jueza o asistente, Leda clienta joven, Charon dueño cansado, Fenrir
pillo canchero, Algenib villano grave). Recortá silencios con ffmpeg `silenceremove`, pegalos con
0.35-0.6 s de silencio entre parlamentos (1 s si hay una reacción del público), y armá `guion.txt`
con todos los parlamentos en orden. Los tiempos por palabra sacalos con `tiempos.mjs`; con varias
voces suelen desfasarse: verificalos y, si hace falta, armá `palabras.json` a mano con los tiempos
que oíste. Si una palabra clave sale mal pronunciada ("bobo" sonaba "vos"), regenerá SOLO esa
frase y pegala en su lugar con ffmpeg.

**Estilos visuales** (no repetir en la misma tanda; cada uno con paleta propia de 3 a 6 colores en
el SPEC, fondo en `armar.mjs` y `compositions/ambiente.html`): tipografía gigante; papel y
collage; guarida con monitores de vigilancia; plano de atraco; estudio de TV; telenovela con
polaroids; HUD holográfico; paleta temática con ambiente (zombi); celular a pantalla completa; y
los que pida el formato (noticiero con zócalos, transmisión de fútbol con marcador, documental de
crímenes con expedientes, reality con confesionario, VHS, cómic con viñetas, videojuego retro...).
Líneas crema clásico: máximo 1 por tanda (mejor ninguno).

**Muletillas PROHIBIDAS** (Juan, 28-10: "cansa siempre lo de no es la crisis, siempre lo mismo"):
- Descartar explicaciones en fila: "No es la crisis. Ni el barrio. Ni la competencia.", "No es
  suerte, ni el local, ni la plata" y cualquier variante. En ningún formato.
- "No es suerte / no es caro: es tener un sistema" y "es tener un sistema" en general.
- Cerrar siempre con "Comentá PALABRA y te contamos cómo": variar, siempre con una sola acción
  clara que invite a comentar o compartir.
- Repetir una idea ya hecha: antes de elegir, leé TODOS los ganchos de "Hechos".
- El cierre con la lista de productos ("bot que contesta, puntos que retienen, web que te pone en
  el mapa"): cansa y ya se usó en varios. Cada reel vende UNA cosa (casi siempre el agente de IA)
  y la nombra una vez.
- Decir "bot" o "chatbot": es "agente de IA".
- El "solo efectivo", el posnet que no anda o cualquier problema de cobrar con tarjeta (Juan,
  29-10: "ningún negocio hoy en día cobra solo efectivo"): queda viejo y no es creíble. Los
  dolores que sí van: no contestar, dejar en visto, horarios, no aparecer en Google, no tener tienda.

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
- **Agentes de IA (EL FOCO, pedido de Juan 28-10: "más que de bots, que sean de agentes de IA")**:
  un agente que trabaja para el comercio como un empleado más, sin horario: atiende por WhatsApp
  (e Instagram) al instante y a cualquier hora con tus precios, stock y horarios, agenda turnos,
  toma pedidos y reservas, hace el seguimiento del cliente que preguntó y no compró, le escribe al
  que dejó de venir, y te pasa la conversación cuando es para vos. Se habla de **"agente de IA"**,
  "tu empleado de IA", "un agente que atiende por vos": NUNCA "bot" ni "chatbot" (suena a
  respuesta automática barata). Ángulos que dan juego: el agente como personaje (habla, tiene
  personalidad, como `tu-jarvis`), el agente en una entrevista de trabajo, el agente que trabaja
  a las 3 de la mañana mientras el dueño duerme, el agente contra el empleado que deja en visto.
- Scalerics Puntos: el cliente suma con cada compra, lleva la tarjeta en el celular, canjea
  premios; si deja de venir le llega un aviso; el dueño ve quiénes son y cada cuánto vienen.
- Tienda online: vende sola, con envíos (DAC, Correo, PedidosYa) y Mercado Pago.
- Sitio web: rápido en el celular, con horarios, ubicación y botón a WhatsApp o a la tienda.
- **Automatizaciones** (pedido de Juan 29-10: "que cubra más temas"): sacarle al dueño las tareas
  repetidas que hace a mano: pasar pedidos de WhatsApp a una planilla, avisar que un pedido está
  listo, recordar turnos y pagos, actualizar el stock en la tienda cuando vende en el local,
  mandar el reporte del día al celular. Ángulos: el dueño que trabaja de "copiar y pegar", la
  planilla de Excel que manda en el local, las tres horas por noche haciendo lo mismo.
- **Sistemas a medida**: el programa de gestión hecho para cómo trabaja ese negocio (stock,
  pedidos, proveedores, caja, varios locales), en vez del cuaderno, el Excel o un sistema
  enlatado que no se adapta. Ángulos: el cuaderno que nadie más entiende, "eso lo sabe solo Marta",
  el sistema que te obliga a trabajar como él quiere.
- **CRM**: saber quiénes son tus clientes, qué te compraron, a quién le prometiste algo y a quién
  hay que volver a escribirle; el seguimiento de cada venta en un solo lugar en vez de en la
  cabeza, en post-its o en cinco chats. Ángulos: el cliente que te pidió presupuesto y nunca
  llamaste, "¿quién era este?", la venta que se perdió en el chat.

Reglas: voseo uruguayo; Scalerics habla en plural ("hacemos", "te contamos"); 130-175 palabras
(con Orus son ~45-58 s; con diálogos y personajes se acepta hasta ~190 y ~70 s); frases cortas;
sin cifras ni estadísticas inventadas; con gancho pero SIN agresividad (02-11: nada de pinchar al
dueño en la cara; tratarlo como a un colega), con humor y con un giro que lo deja bien parado: nunca insultos de verdad,
nada sobre personas reales con nombre propio, ni marcas reales atacadas. Cada reel lleva `reels/<slug>/descripcion.txt`: la descripción para
Instagram/TikTok (gancho, 2-3 líneas, la acción del cierre y 5-6 hashtags), que usa el publicador.

## Cuántos por corrida: 5, en paralelo

Cada corrida de la rutina hace **5 reels** (pedido de Juan, 27-10). Vos sos el coordinador:

1. Elegí los 5 temas (paso 1) distintos entre sí, **cada uno con un formato y un estilo distintos** (ver "La regla número uno"), y reservalos los 5 juntos en `ideas.md`, en un
   solo commit y push a `main`. **Productos** (Juan, 29-10: "que cubra más temas: automatizaciones,
   sistemas, CRM"): por tanda de 5, **como mucho 1 de agentes de IA**, y el resto
   repartido entre automatizaciones, sistema a medida, CRM, tienda online o sitio web, Puntos y
   consejos de gestión para pymes (ver "LO PRIMERO", 02-11). **Puntos: como mucho 1 por tanda y solo si el reel es de puntos** ("lo de
   los puntos en todos los videos cansa"), en lugar de uno de los otros. Mirá las últimas tandas en
   "Hechos" para no repetir ángulos ni temas.
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
10b. **Portada (obligatoria, pedido de Juan 29-10: "portadas llamativas").** Instagram la usa en
    vez del primer cuadro. Escribí `reels/<slug>/portada.json` y corré, desde la raíz,
    `node herramientas/portada.mjs <slug>` (con el candado de Chrome): arma
    `reels/<slug>/portada.png` con un cuadro del reel de fondo y el gancho en letras gigantes.
    ```
    { "t": 5.6, "chica": "Te voy a robar", "grande": "tus clientes", "sello": "Plan: el golpe",
      "acento": "#f5c518", "sello_color": "#e5484d", "zoom": 1.15, "foco": "35%" }
    ```
    - **CLICKBAIT** (Juan, 29-10: "miniaturas personalizadas clickbaiteras"): el personaje con zoom
      como primer plano (`zoom` 1.3-1.9, `foco`/`foco_x` para encuadrarlo arriba del texto), una
      etiqueta que pica en `sello` ("¡No sos vos, Marcelo!", "¿Lo contratás?", "¿Culpable?"), el
      giro en `grande` ("es una IA", "no pide aumento") y, cuando suma, `circulo` {x, y, r} rojo
      sobre la cara u objeto y `flecha` {x, y, rot} roja apuntándolo (x, y = la cola; rot en
      grados, 0 = derecha, positivo baja). Ejemplos: `reels/empleado-del-mes`, `reels/entrevista-de-trabajo`.
      Sin imágenes generadas con IA (gastan el crédito de Google): siempre un cuadro del reel.
    - `t`: el segundo del cuadro de fondo. Elegí el dibujo más fuerte del reel (un personaje, el
      objeto central), mirando la hoja de cuadros; mejor uno sin texto propio ni globos. Ojo: en la
      hoja `fps=1/2.5` el cuadro i está cerca de `i*2.5 + 1`; afiná con una tira
      (`ffmpeg -ss <t> -t 1.2 -i <mp4> -vf "fps=5,scale=120:-1,tile=6x1" -frames:v 1 tira.png`).
    - `chica` + `grande`: el gancho partido en dos, 2 a 6 palabras en total, que se entienda solo
      y pique (`grande` es lo que tiene que agarrar el ojo). `sello`: el formato o el personaje
      ("Plan: el golpe", "Caso cerrado", "Confesión").
    - `acento` y `sello_color`: los colores del estilo del reel.
    - MIRÁ la portada (achicala con ffmpeg y abrila): sin subtítulos del video asomando, sin texto
      encimado, todo lo importante entre y 285 y 1635 (el recorte 4:5 de la grilla de Instagram).
      Ejemplo aprobado: `reels/el-golpe/portada.png`.
    - `portada.png` va en `main` con el resto del reel (el publicador la toma de ahí).
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
