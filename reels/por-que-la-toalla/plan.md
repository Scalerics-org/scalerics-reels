# Plan de escenas · por-que-la-toalla (explicador "¿Por qué…?", ~31 s, 3D real)

**Producto: sitio web** (que muestre lo que eligen los demás: "Lo más pedido del barrio" y reseñas de vecinos, con
botón para pedir). Sin marcas reales: hotel, toalla y cartel genéricos. Voz: Orus sola (81 palabras).
**Fondo: navy oscuro `#0b1220` LISO** (sin degradés ni brillos: compresión de Instagram), piso navy apenas más claro
`#111b2e` con sombra suave; objetos crema/blanco/verde que recortan fuerte sobre el navy. Cierre en verde `#5ce611`
con letras navy. Rojo apagado `#c7655b` NO hace falta (el cartel "ambiente" no es un error: va en gris crema
`#8e8c80`, lo neutro; el que gana, en verde).

**El hilo visual: EL CARTELITO DEL TOALLERO** (tarjeta de cartón crema, de las que cuelgan del toallero con un
agujero/ranura, borde navy grueso, texto Lexend 800 en 3D o textura de canvas, nítido). Nace en el gancho, se
duplica en dos, se transforma en el de "esta habitación", y VUELVE en el callback como la tarjeta "Lo más pedido del
barrio" del sitio de Rubén: misma forma (rectángulo con la ranura arriba), mismo borde. Cámara continua
(Catmull-Rom): baño del hotel → corte del edificio → barrio de Montevideo → almacén de Rubén.

**Datos (ver fuentes.md):** la voz NO dice porcentajes. En pantalla, solo como crédito: "35 %" / "44 %" (exp. 1) y
"49 %" contra "37 %" (exp. 2, nunca contra el 35). Crédito "Estudio en un hotel · 2008". Rótulo honesto obligatorio
en s07: "Otros estudios: no siempre da igual de fuerte". El cartel estándar dice "cuidá el ambiente" (no "planeta").

## Objetos 3D (específicos: "¿alguien lo confunde con otra cosa?")
- **Toallero de hotel**: barra cromada (cilindro metálico, roughness baja) con dos soportes a la pared (azulejo
  blanco en cuadrícula navy fina NO: líneas de 6 px mínimo o directamente azulejos como RoundedBox con junta navy).
- **Toalla blanca doblada en tres** colgando de la barra, con la franja tejida verde cerca del borde (como las de
  hotel), relleno con volumen (RoundedBox blando + bordes redondeados, flecos no). Y una **toalla en el piso** hecha
  bollo (para "a lavar"), solo en s02-s03.
- **El cartelito** (descripto arriba). Tres versiones de texto (textura canvas grande, ≥ 40 px equivalentes):
  - Estándar (gris crema): "Ayudá a cuidar el ambiente" + hojita navy.
  - Norma (verde/crema): "La mayoría de los huéspedes reutiliza su toalla" + 4 muñequitos pictograma, 3 en verde.
  - Esta habitación: "La mayoría de los huéspedes de esta habitación…" con el número de puerta "214" grande.
- **Pilas de toallas** como barras (toallas dobladas apiladas): gris (35 %) y verde (44 %), con números 3D
  (TextGeometry) ARRIBA, limpios.
- **"?" 3D verde** enorme (bisagra).
- **Corte del edificio del hotel** (casa de muñecas): 3x3 habitaciones vistas de frente sin pared, cada una con su
  baño chiquito y su toallero; las toallas colgadas se prenden en verde de a una.
- **Barrio de Montevideo low-poly** (como abren-hoy-completo) con **el almacén de Rubén** (toldo, cartel, vidriera).
- **Personajes** (`reels/abren-hoy/assets/personajes.js`): Graciela (ELENCO.clienta, rulos lila, lentes) con su
  celular; Rubén (ELENCO.almacenero) con su mate y su "Hoy: N pedidos".
- **Celular de Graciela** grande (60-70 % del alto en s09) con la interfaz del sitio.

## Escenas (índice de la palabra de `guion.txt` desde 0; segundos estimados a ~0,34 s/palabra + pausas; se ajustan
## con tiempos.md)
| # | id | arranca en | seg. aprox. | frase |
|---|----|-----------|-------------|-------|
| 1 | s01-gancho | 0 "¿Por" | 0,0-3,7 | ¿Por qué el hotel te dice que la mayoría reutiliza la toalla? |
| 2 | s02-carteles | 12 "Un" | 3,7-5,6 | Un estudio probó dos carteles. |
| 3 | s03-ambiente | 17 "Uno" | 5,6-7,5 | Uno pedía cuidar el ambiente. |
| 4 | s04-mayoria | 22 "El" | 7,5-10,9 | El otro: la mayoría la reusa. Ganó el segundo. |
| 5 | s05-por-que | 31 "¿Por" | 10,9-12,5 | ¿Por qué? |
| 6 | s06-demas | 33 "Antes" | 12,5-15,1 | Antes de decidir, miramos a los demás. |
| 7 | s07-habitacion | 40 "Y" | 15,1-18,5 | Y si decía «los de esta habitación», más todavía. |
| 8 | s08-graciela | 49 "Graciela" | 18,5-20,7 | Graciela duda qué pedirle a Rubén. |
| 9 | s09-sitio | 55 "Su" | 20,7-23,8 | Su sitio le muestra lo más pedido del barrio. |
| 10 | s10-cartel | 64 "Es" | 23,8-25,9 | Es el cartel de la toalla. |
| 11 | s11-local | 70 "¿Lo" | 25,9-28,0 | ¿Lo vemos en tu local? Agendá una |
| 12 | s12-llamada | 77 "videollamada" | 28,0-30,8 | videollamada gratis en scalerics.com. |

`reel.json`: escenas `[["s01-gancho",0],["s02-carteles",12],["s03-ambiente",17],["s04-mayoria",22],
["s05-por-que",31],["s06-demas",33],["s07-habitacion",40],["s08-graciela",49],["s09-sitio",55],["s10-cartel",64],
["s11-local",70],["s12-llamada",77]]`. Acentos: hotel, mayoría, toalla, estudio, carteles, ambiente, mayoría,
segundo, decidir, demás, habitación, todavía, Graciela, Rubén, sitio, pedido, barrio, cartel, toalla, local,
videollamada.

## Brief por escena

1. **s01-gancho** (~3,7 s) · "¿Por qué el hotel te dice que la mayoría reutiliza la toalla?"
   - **Cuadro 0 = portada en movimiento:** el toallero con LA TOALLA doblada y EL CARTELITO colgando, en primer plano
     (toalla + cartel ocupan ~75 % del ancho, y ~820-1650), sobre la pared de azulejos blancos que llena el fondo del
     cuadro (pared clara = contraste con el gancho navy en placa). El cartel ya dice "La mayoría de los huéspedes
     reutiliza su toalla" (versión norma) y se lee. Gancho entero arriba (y 170-700), Lexend 900, 110-130 px, crema
     sobre una placa navy `#0b1220` llena (o la pared termina en y ~760 y arriba es navy liso): "¿Por qué el hotel" /
     "te dice que la" / **"mayoría"** (recuadro verde, texto navy) / "reutiliza la toalla?".
   - Movimiento: push-in lento; en "mayoría" el cartel se balancea (pendula 8° y vuelve) y los 4 muñequitos hacen pop
     en cadena (3 se prenden en verde); en "toalla" la toalla se acomoda sola en la barra (un tirón suave).
   - SFX: ambiente de baño no (no hay CC0 en el repo); `click-soft` al balanceo, `pop` x3-4 escalonado en
     "mayoría", `papel` (roce de tela) en "toalla".

2. **s02-carteles** (~1,9 s) · "Un estudio probó dos carteles."
   - Sin corte: travelling lateral y hacia atrás; el toallero ahora tiene DOS toallas y DOS cartelitos lado a lado
     (llenan el ancho, cada uno ~42 %), los dos girados de dorso (se ve el cartón crema liso con el borde navy). En
     "estudio" baja el rótulo con línea guía: "Estudio en un hotel · 2008". En "carteles" los dos giran 180° a la
     vez y quedan de frente (sin texto todavía: solo el ícono, hojita / muñequitos, para no adelantar).
   - SFX: `whoosh` (travelling), `click` (rótulo), `papel` x2 (giro de cartones).

3. **s03-ambiente** (~1,9 s) · "Uno pedía cuidar el ambiente."
   - Push-in al cartel de la izquierda (llena 65 % del ancho): el texto "Ayudá a cuidar el ambiente" se escribe/estampa
     en "pedía"; en "ambiente" la hojita navy crece con pop. El cartel queda en gris crema (neutro, no "malo").
   - Rótulo con línea guía: "Cartel de siempre".
   - SFX: `typing` corto (o `sello` al estampar), `pop` (hoja).

4. **s04-mayoria** (~3,4 s) · "El otro: la mayoría la reusa. Ganó el segundo."
   - Paneo a la derecha al otro cartel: "La mayoría de los huéspedes reutiliza su toalla"; en "mayoría" los 4
     muñequitos pop y 3 se prenden en verde (como el gancho, pero ahora con sentido).
   - En "Ganó": la cámara retrocede, los dos cartelitos se corren a los costados y DEBAJO de cada uno crece una PILA
     DE TOALLAS dobladas (toallas reusadas, el ruido de que caen una sobre otra): gris a la izquierda, verde a la
     derecha, que termina más alta. Números 3D arriba de cada pila, limpios y sin pisar el cartel: "35 %" (gris) y
     "44 %" (verde, pop y un pequeño rebote). Sello verde "Ganó" con tilde sobre el cartel derecho.
   - Cuidado: los números NO dentro de las pilas ni del cartel; pilas ~30 % del ancho cada una, altas hasta y ~1250.
   - SFX: `whoosh-short` (paneo), `pop` x3 (muñequitos), `tic-real`/`tac-real` alternado por toalla que cae (máx. 6
     audibles), `ding` en "segundo", `sello` (sello "Ganó").

5. **s05-por-que** (~1,6 s) · BISAGRA · "¿Por qué?"
   - UN SOLO OBJETO: las toallas de la pila verde se enrollan y forman un "?" 3D verde enorme (centrado, ~55 % del
     alto, dentro del 80 % seguro) sobre el navy liso. Push-in lento y órbita corta de 15°. Sin rótulos.
   - SFX: `whoosh-cine-corto` + `impact-bass-1` suave en "qué".

6. **s06-demas** (~2,6 s) · "Antes de decidir, miramos a los demás."
   - El "?" gira de canto y se vuelve el punto de vista de un muñequito-huésped (pictograma 3D crema, grande, de
     espaldas, en primer plano abajo, con su toalla en la mano, dudando: la toalla sube y baja). La cámara retrocede y
     revela EL CORTE DEL EDIFICIO DEL HOTEL (3x3 habitaciones, casa de muñecas, llena 85 % del ancho): en "demás" las
     toallas de las otras habitaciones se cuelgan en el toallero y se prenden en verde de a una (pop en cadena), y el
     muñequito del primer plano cuelga la suya (tilde verde).
   - Rótulo con línea guía al edificio: "Lo que hacen los demás".
   - SFX: `whoosh` (grúa atrás), `pop` x6 en cadena (bajo), `ping` en la tilde.

7. **s07-habitacion** (~3,4 s) · GIRO · "Y si decía «los de esta habitación», más todavía."
   - Push-in a UNA habitación del edificio (la del centro, puerta "214"): entramos a su baño y su cartelito se
     transforma (flip) en "La mayoría de los huéspedes de ESTA habitación…" con el "214" grande en verde. En
     "habitación" el número de la puerta hace pop y se ilumina.
   - En "todavía": crece una pila verde todavía más alta al lado de una pila gris; números 3D arriba: "49 %" (verde,
     pop) y "37 %" (gris). Crédito chico abajo: "Mismo estudio · otro experimento".
   - **Rótulo honesto OBLIGATORIO** (mono, 34-36 px, crema al 85 %, con línea guía al 49 %): "Otros estudios: no
     siempre da igual de fuerte". Que se lea al menos 1,2 s.
   - Cuidado: no comparar 49 con 35. Nada de "comprobado".
   - SFX: `whoosh-short` (push-in), `papel` (flip del cartel), `pop` (214), toallas cayendo (`tic-real`), `chime` en
     "todavía".

8. **s08-graciela** (~2,2 s) · "Graciela duda qué pedirle a Rubén."
   - Transición sin corte: la cámara sale por la ventana del baño 214 y el hotel se vuelve una cuadra de Montevideo
     low-poly (como abren-hoy-completo) y bajamos en grúa hasta GRACIELA (plano medio, 60 % del ancho), en la vereda
     o en su cocina, con el celular en la mano, cejas en duda, mirando el celular y después a cámara. Al fondo, del
     otro lado de la calle, el almacén de Rubén con el toldo.
   - Rótulo con línea guía al almacén: "Almacén de Rubén". Burbuja de pensamiento chica con tres cosas 3D rotando
     (una tarta, un pan casero, una docena de huevos) en "duda".
   - SFX: `whoosh-cinematic` (salida por la ventana), `pop` x3 (cosas de la burbuja), ambiente de calle
     `calle.wav` de abren-hoy-completo muy bajo si está con su origen anotado.

9. **s09-sitio** (~3,1 s) · "Su sitio le muestra lo más pedido del barrio."
   - Push-in al celular hasta que llena 65-70 % del alto (inclinado 8°, con brillo plano, sin degradé): el sitio de
     Rubén. Arriba "Almacén Rubén" con horario y ubicación chicos; en "pedido" entra la sección **"Lo más pedido del
     barrio"** con 3 tarjetas (1 · Tarta de jamón y queso, 2 · Pan casero, 3 · Milanesas) que hacen pop en cascada con
     su medalla verde; en "barrio" debajo aparecen 2 reseñas con 5 estrellas verdes ("Las tartas, un 10 · Marta",
     "Siempre fresco · Nico"). Textos de interfaz ≥ 36 px.
   - Rótulos con línea guía: "Lo más pedido" y "Reseñas de vecinos".
   - SFX: `whoosh-short` (push-in), `pop` x3 (tarjetas), `sparkle` (estrellas), `click-soft` (scroll).

10. **s10-cartel** (~2,1 s) · CALLBACK · "Es el cartel de la toalla."
    - La tarjeta "1 · Lo más pedido del barrio" SALE del celular en 3D, se le abre la ranura arriba y queda colgando
      igual que el cartelito del hotel; al costado, entra de nuevo un instante el cartel de la toalla (mismo tamaño,
      misma forma) y los dos se superponen y "encajan" (pop y destello verde de borde). Rótulo: "Mismo cartel ·
      otro mostrador".
    - SFX: `whoosh-short`, `papel` (cartón), `chime` al encajar.

11. **s11-local** (~2,1 s) · "¿Lo vemos en tu local? Agendá una"
    - Graciela toca "Pedir" (tilde verde grande en el celular, `click` + `ping`); el pedido vuela como tarjetita al
      almacén de Rubén (cámara sigue la curva por arriba de la calle): Rubén detrás del mostrador con el mate, el
      celular le vibra, sonríe; su cartelito de mostrador "Hoy: 12 pedidos" pasa a 13 con pop. El almacén se prende
      (luces del toldo).
    - SFX: `click` + `ping` (pedir), `whoosh` (vuelo), `vibra` (celular de Rubén), `pop` (contador),
      `campanita` (la puerta del almacén, CC0 ya anotada en por-que-el-mozo).

12. **s12-llamada** (~2,8 s) · "videollamada gratis en scalerics.com."
    - Tarjeta de cierre verde `#5ce611` (arranca sobre "videollamada"): "Videollamada gratis" Lexend 900 navy y abajo,
      grande, "scalerics.com" (navy sobre verde, o en placa navy con letras verdes). Logo de Scalerics chico. Detrás,
      el cartelito colgando, ahora verde, que se balancea y queda quieto.
    - SFX: `whoosh` (entrada), `ding` suave; la música se resuelve.

## Ritmo (algo cambia cada 1,5-2,5 s)
s01: balanceo + muñequitos (1,6 s) / toalla (3,2 s) · s02: giro de carteles · s03: texto + hoja · s04: muñequitos
(7,9 s), pilas (9,4 s), números + sello (10,4 s) · s05: "?" · s06: edificio (13,3 s), toallas en cadena (14,5 s) ·
s07: flip "214" (16,3 s), pilas + 49 % (17,6 s) · s08: Graciela + burbuja · s09: tarjetas (22,2 s), reseñas (23,2 s) ·
s10: cartel que encaja · s11: pedir + vuelo + contador · s12: tarjeta.

## Portada (paso 10b)
Fondo: cuadro limpio de s01/s04 (toallero con el cartel de la mayoría, sin gancho ni subtítulos), `zoom` ~1.4.
`chica`: "El cartel del hotel" · `grande`: "¿Por qué?" (6 palabras en total, el tope) · `sello`: "La mayoría lo hace" ·
acento y sello `#5ce611`.
