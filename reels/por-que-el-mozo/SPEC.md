# por-que-el-mozo · explicador "¿Por qué…?" (~32 s, 3D real)

"¿Por qué el mozo se acuerda de tu pedido… hasta que pagás?". Se cuenta (Boring 1957 y MacKinnon vía Marrow 1969,
citados por MacLeod 2020, ver `fuentes.md`) que un mozo en Berlín recordaba todo sin anotar y, apenas le pagaron, se
olvidó. Un estudio clásico (Zeigarnik, 1927): las tareas interrumpidas se recordaban casi el doble. Bisagra "¿Por qué?":
lo pendiente queda abierto en la cabeza. Giro: otro estudio (Masicampo y Baumeister, 2011) vio que hacer un plan
concreto la calma: no hace falta terminarlo para sacárselo de encima. Callback: Rubén, de noche, es como aquel mozo
(la seña, el presupuesto, el proveedor dando vueltas en la misma nube); ahora cada pendiente va a su sistema, con
responsable y aviso; Rubén: "Anotado. Ya me olvidé." (el olvido del mozo, pero tranquilo). Cierre: videollamada gratis.
**Producto: sistema a medida** (los pendientes del negocio, con responsable y aviso). Sin marcas reales.
Voz: Orus (85 palabras) + Rubén (4 palabras, Algenib). 89 palabras en total.

**Cuidado con los datos (fuentes.md):** la anécdota va SIEMPRE como "se cuenta" (hay dos versiones); el "casi el
doble" es del estudio de 1927 (réplicas mixtas: en pantalla "Estudio clásico · 1927", nunca "comprobado"); el estudio
de 2011 dice "formular" un plan (la voz dice "hacer"). Ningún porcentaje en pantalla. El lugar es un RESTAURANTE de
Berlín (no "café"): el rótulo dice solo "Berlín".

**Recurso central:** una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro), base técnica de
`reels/por-que-el-caramelo` (copiados como referencia: `partes/tres-base-caramelo.js` y `partes/gen-base-caramelo.mjs`;
`armar.mjs`, vendor, sfx, bgm, fuentes y `assets/personajes.js` ya están en la carpeta) y personajes de
`reels/abren-hoy/assets/personajes.js` (Rubén = ELENCO.almacenero, Graciela = ELENCO.clienta, Nico = el empleado).
**El objeto que viaja: LA NUBE DE PENDIENTES** (nube de pensamiento 3D crema con borde navy, inflada, con los
pendientes adentro como objetos chicos): nace sobre el mozo con sus pedidos, se desinfla cuando le pagan, se abre en
la cabeza, se vacía en el plan, VUELVE sobre Rubén en la cama con sus pendientes, y se vacía en la tablet. La misma
nube en el gancho y en el callback: es el hilo visual. Cámara continua (Catmull-Rom) de objeto en objeto.

**Fondo crema `#efeee5` LISO** con objetos navy y verde (esta noche: caramelo navy claro `#16243d`, el-audio crema en
la línea "para mandar"; el último explicador en crema fue `por-que-buscando`, 09-11). Piso crema un poco más oscuro
`#e2e0d3` con sombra suave navy al 25 %; nada de degradés ni brillos (compresión de Instagram). La escena de noche
(s08) NO pasa a fondo oscuro: es el dormitorio con pared crema y la luz cálida de la lámpara de mesa; la "noche" la
dan la ventana navy con luna, el despertador y el pijama. Cierre en verde de marca `#5ce611` con letras navy.

## Para el constructor: lo que hay que cambiar de la base
- `armar.mjs` viene de caramelo: fondo `#16243d` → `#efeee5` (`FONDO_LIMPIO`, html/body/#root/#fondo y el `tl.set`),
  el id de la tarjeta `s11-llamada` → `s12-llamada`. Subtítulos sobre crema: texto navy `#0b1220` en cartel BLANCO
  con borde navy 4 px (el cartel crema se perdería en el fondo); recuadro verde `#5ce611` con texto navy. Logo
  oscuro (`logo-oscuro.png`) en píldora blanca. Rótulos: placa navy `#16243d` con texto crema y borde verde, líneas
  guía navy de 6-8 px.
- `reel.json` ya está (12 escenas, índices de abajo); el `sinSub` [75, 79] es la línea de Rubén (va en burbuja).

## Lo que cambia respecto de SPEC-base
Todo lo dibujado es 3D (no líneas SVG). Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 ~86 px (ver arriba).
Acentos: mozo, todo, anotar, olvidó, estudio, interrumpidas, doble, pendiente, abierto, cabeza, plan, calma, Rubén,
noche, seña, presupuesto, proveedor, pendiente, sistema, responsable, aviso, dormir, pendientes. Rojo apagado
`#c7655b` solo para el problema (los pendientes sueltos de Rubén a la noche, el despertador). El gancho (s01) y la
tarjeta (s12) no llevan karaoke. Rótulos Lexend 600 36-44 px; texto de interfaz de la tablet 36 px o más. Sin emojis
ni rayas largas.

## Paleta de materiales
navy `#0b1220`/`#16243d`/`#1f3254` (chaleco y pantalón del mozo, bandeja, mesa del laboratorio, tablet, cama,
marco de la ventana), verde `#5ce611` (lo resuelto: tildes, "?", la pila "interrumpidas", el plan, los avisos), crema
`#efeee5` y blanco (mantel, tazas, nube, pantalla de la tablet, sábanas), gris crema `#8e8c80` (la pila "terminadas",
lo neutro), rojo apagado `#c7655b` (pendientes sin dueño, el despertador). Madera clara `#c9a774` solo en sillas y
mesita de luz (con moderación).

## Objetos 3D (específicos y reconocibles: "¿alguien lo confunde con otra cosa?")
- **EL MOZO** (genérico, `crearPersonaje`; NO es del elenco fijo ni es Nico): camisa blanca, chaleco navy, moño
  verde, delantal largo crema hasta la rodilla, repasador blanco al hombro, pelo engominado con raya al costado,
  bigote fino. Bandeja redonda navy en alto con la mano abierta. **Sin libreta** (la libreta cerrada asoma del
  bolsillo del delantal con un lápiz atrás de la oreja SIN usar: "sin anotar"). Ojos abiertos y pícaros; cuando se
  olvida, cara en blanco (cejas altas, ojos redondos, boca chica "o"), nunca ojos cerrados.
- **LA NUBE DE PENDIENTES** (protagonista que viaja): nube de pensamiento 3D (6-8 esferas fusionadas, crema con
  contorno navy por rim light, + 2 bolitas de cola hacia la cabeza), adentro los pendientes como objetos 3D chicos
  pero legibles (cada uno ~120-160 px en pantalla): en el restaurante, **una taza de café con plato, una porción de
  torta con frutilla, una copa de agua con gas con burbujas, una jarrita de leche**; en la cama de Rubén, **un billete
  doblado con clip ("Seña"), una hoja con "$" y renglones ("Presupuesto"), una caja de cartón con cinta ("Proveedor")**.
  Cada objeto lleva abajo una plaquita mono 32 px ("Mesa 4 · café", "Seña · Graciela").
- **LA MESA DEL RESTAURANTE**: mesa redonda con mantel crema hasta el piso, 4 comensales genéricos sentados
  (`crearPersonaje`, ropa navy/crema, dos con sombrero tipo años 20 sin exagerar, que NO son del elenco), tazas,
  platitos, un platito con la cuenta y billetes crema/verdes genéricos (sin diseño de moneda real).
- **EL LABORATORIO DE TAREAS** (s04): mesa de madera navy con 6 tareas reconocibles de las que usó el estudio ([A]):
  **un carretel con hilo a medio enrollar, un barquito de papel a medio plegar, una hoja con una multiplicación
  ("37 × 48 =" sin resultado), un dibujo de un jarrón a medio trazar**, y sus versiones terminadas (carretel lleno,
  barquito entero, cuenta con resultado, jarrón completo). Las terminadas con tilde gris; las interrumpidas con un
  corte verde (una línea punteada donde quedaron).
- **LAS DOS PILAS DEL RECUERDO**: dos pilas de fichas/tarjetas 3D (RoundedBox finitas), "Terminadas" gris crema y
  "Interrumpidas" verde, la verde casi el doble de alta (proporción 1 : 1,9, tal como el estudio). Rótulos debajo.
- **"?" 3D verde** grande y centrado (bisagra), Lexend 800 en TextGeometry, extruido, con bisel.
- **LA CABEZA ABIERTA** (s06): busto de perfil estilizado navy liso (sin cara detallada, tipo maniquí de vidriera,
  RoundedBox/lathe), con un **anillo verde abierto (una "C" 3D gruesa que gira sin cerrarse)** adentro de la cabeza,
  vista en corte: el "bucle abierto". La nube vacía arriba, latiendo.
- **LA TARJETA DEL PLAN** (s07): una tarjeta de agenda 3D crema grande (RoundedBox con anillado navy arriba), con
  tres renglones que se llenan: "Qué: llamar al proveedor" / "Cuándo: jueves 10:00" / "Quién: Nico". Al completarse,
  la "C" del s06 se cierra en un aro completo verde (pop + brillo).
- **EL DORMITORIO DE RUBÉN** (s08-s11): cama de una plaza y media con respaldo de madera, sábanas crema, frazada
  navy con guarda verde, Rubén (ELENCO.almacenero, pijama a rayas crema y navy, bigote, pelo de siempre) acostado
  boca arriba con ojos ABIERTOS mirando el techo, la mesita de luz de madera con **lámpara de pantalla crema
  encendida, el despertador analógico rojo apagado con campanitas (las 3:12), el mate y la tablet**. Ventana navy
  con luna crema y estrellitas en la pared crema.
- **LA TABLET DE RUBÉN** (el sistema): RoundedBox navy con pantalla blanca canvas, pantalla "Pendientes": 3 filas
  grandes (36-44 px), cada una con ícono, responsable (avatar redondo + nombre) y campanita de aviso:
  "Seña de Graciela · Nico · aviso jue 9:00", "Presupuesto heladera · Rubén · aviso mañana 10:00",
  "Pedido al proveedor · Nico · aviso mar 8:00". En s11 cada fila pasa a tilde verde ("Seña cobrada",
  "Presupuesto enviado", "Pedido hecho").

## Escenas (inicio por índice de palabra de `guion.txt`, desde 0; segundos estimados a ~0,34 s/palabra + pausas; se
## ajustan con tiempos.md)
| # | id | arranca en | seg. aprox. | frase | objeto protagonista | qué cambia y en qué palabra |
|---|----|-----------|-------------|-------|--------------------|-----------------------------|
| 1 | s01-gancho | 0 "¿Por" | 0,0-3,4 | ¿Por qué el mozo se acuerda de tu pedido… hasta que pagás? | El mozo con la bandeja y la nube llena | "pedido": pop de pedidos; "pagás": billete a la bandeja |
| 2 | s02-mozo | 12 "Se" | 3,4-5,9 | Se cuenta que un mozo recordaba todo sin anotar. | La mesa de 4 y el mozo | "todo": la nube se llena; "anotar": libreta cerrada tachada |
| 3 | s03-olvido | 21 "Pagaron…" | 5,9-7,9 | Pagaron… y se olvidó. | La nube que se desinfla | "Pagaron": monedas; pausa; "olvidó": pff, cara en blanco |
| 4 | s04-estudio | 25 "En" | 7,9-11,6 | En un estudio, las tareas interrumpidas se recordaban casi el doble. | Tareas a medias y las dos pilas | "interrumpidas": cortes verdes; "doble": pila verde x2 |
| 5 | s05-por-que | 36 "¿Por" | 11,6-13,3 | ¿Por qué? | "?" 3D verde | Push-in y órbita corta |
| 6 | s06-abierto | 38 "Lo" | 13,3-15,6 | Lo pendiente queda abierto en la cabeza. | La cabeza con la "C" abierta | "abierto": la C gira sin cerrar |
| 7 | s07-plan | 45 "Otro" | 15,6-18,8 | Otro estudio vio que hacer un plan concreto la calma. | La tarjeta del plan | "plan": renglones; "calma": la C se cierra |
| 8 | s08-noche | 55 "Rubén," | 18,8-21,9 | Rubén, de noche: la seña, el presupuesto, el proveedor. | Rubén en la cama y LA MISMA nube | Un pendiente por palabra |
| 9 | s09-sistema | 64 "Ahora" | 21,9-25,3 | Ahora cada pendiente va a su sistema, con responsable y aviso. | La tablet con "Pendientes" | "sistema": vuelan a la tablet; "responsable": avatares; "aviso": campanitas |
| 10 | s10-olvide | 75 "Anotado." | 25,3-27,3 | RUBÉN: Anotado. Ya me olvidé. | Rubén apaga la lámpara, la nube vacía | La nube se desinfla (callback del s03) |
| 11 | s11-dormir | 79 "¿Querés" | 27,3-29,8 | ¿Querés dormir sin pendientes? Agendá una | La tablet con las tildes, a la mañana | Tildes en fila |
| 12 | s12-llamada | 85 "videollamada" | 29,8-32,6 | videollamada gratis en scalerics.com. | Tarjeta verde | "Videollamada gratis" / "scalerics.com" |

## Brief por escena (cámara, rótulos, sonido, cuidados)

1. **s01-gancho** (~3,4 s) · "¿Por qué el mozo se acuerda de tu pedido… hasta que pagás?"
   - Cuadro 0 = portada en movimiento: EL MOZO en plano medio (cintura para arriba, 70 % del ancho, abajo-centro,
     y ~900-1700) con la bandeja navy en alto (taza, porción de torta) y ARRIBA A LA DERECHA LA NUBE grande ya inflada
     con 4 pedidos adentro (taza, torta, agua con gas, jarrita), mirando de reojo a cámara con media sonrisa. Gancho
     entero Lexend 900, 3-4 líneas, 110-130 px, arriba (y 180-640), navy sobre el crema: "¿Por qué el mozo" /
     "se acuerda" / "de tu **pedido**…" (recuadro verde) / "hasta que pagás?". La nube no puede pisar el texto:
     si no entra, la nube va a media altura a la derecha de la cabeza y el gancho arriba.
   - Push-in lento al mozo. En "pedido" los 4 pedidos de la nube hacen pop en cadena (y la plaquita "Mesa 4"). En
     "pagás" cae un billete doblado sobre la bandeja (papel) y la nube TIEMBLA (anticipa el s03, no se desinfla todavía).
   - SFX: ambiente de restaurante muy bajo (CC0, anotar en fuentes.md si se baja), pop x4 en "pedido", papel en "pagás".

2. **s02-mozo** (~2,5 s) · "Se cuenta que un mozo recordaba todo sin anotar."
   - Sin corte: grúa hacia atrás y arriba; aparece LA MESA de 4 comensales con el mozo de pie al lado (la mesa y el
     mozo llenan el 80 % del ancho). Rótulo con línea guía arriba a la izquierda: "Berlín" (y en mono chico debajo
     "se cuenta"). La nube sigue sobre el mozo y en "todo" se llena: suma 4 pedidos más (uno por comensal), cada uno
     con su plaquita ("Mesa 4 · café", "con leche", "torta", "agua con gas").
   - En "anotar": push-in corto al bolsillo del delantal: la libreta CERRADA con el lápiz atrás de la oreja, y un
     sello verde "Sin anotar" que gira y se clava al lado (no un tachado rojo: no es un error, es su virtud).
   - Cuidado: los comensales con sombrero no tapan la nube; la nube no atraviesa la cabeza del mozo (siempre arriba
     y al costado, con las 2 bolitas de cola apuntando a su sien).
   - SFX: whoosh (grúa), pop x4 (pedidos), click-soft (sello).

3. **s03-olvido** (~2,0 s) · REMATE DE LA ANÉCDOTA · "Pagaron… y se olvidó."
   - Primer plano del mozo con la nube llena. "Pagaron…": monedas caen en el platito de la cuenta (tic-real x3) y el
     mozo levanta el platito. PAUSA de 0,4-0,5 s (la nube quieta: el que mira adivina). "olvidó": la nube se desinfla
     como un globo (pfff, se arruga y se encoge a una bolita) y los pedidos caen adentro y desaparecen; el mozo queda
     con la cara en blanco, cejas altas, parpadeo rápido (ojos ABIERTOS antes y después del parpadeo).
   - Rótulo "Cobrado" (sello navy con tilde) sobre el platito.
   - SFX: tic-real x3, silencio corto, desinflado (whoosh-short invertido o un "pff" CC0), boing chiquito.

4. **s04-estudio** (~3,7 s) · EL DATO · "En un estudio, las tareas interrumpidas se recordaban casi el doble."
   - Transformación: la mesa del restaurante se convierte en LA MESA DEL LABORATORIO (el mantel se retira hacia
     arriba como un telón y debajo está la mesa de madera navy). En "estudio" baja el rótulo con línea guía
     "Estudio clásico · 1927". Aparecen las tareas en dos filas con pop: arriba las terminadas (carretel lleno, barquito
     entero, cuenta con resultado, jarrón completo; tilde gris chico), abajo las mismas a medias. En "interrumpidas" la
     fila de abajo se marca con la línea punteada verde donde quedaron (pop por cada una).
   - En "recordaban": las tareas se aplanan en fichas y se apilan: pila gris "Terminadas" y pila verde
     "Interrumpidas". En "doble" la verde termina de crecer hasta casi el doble (1 : 1,9) con un pop y el rótulo
     "casi el doble" con línea guía a la cima. Llenan el ancho (cada pila ~30 % del ancho, alto hasta y ~1250).
   - Cuidado: nada de porcentajes; nada de "comprobado".
   - SFX: whoosh (telón), click-soft (rótulo), pop por tarea (no más de 6 audibles), tic por ficha, ding en "doble".

5. **s05-por-que** (~1,7 s) · BISAGRA · "¿Por qué?"
   - UN SOLO OBJETO: las fichas de la pila verde se juntan en el centro y se moldean en un "?" 3D verde enorme
     (centrado, 55 % del alto, dentro del 80 % seguro). Push-in lento, órbita corta de 15°. Sin rótulos.
   - SFX: whoosh-cine-corto + impact-bass-1 suave en "qué".

6. **s06-abierto** (~2,3 s) · "Lo pendiente queda abierto en la cabeza."
   - El "?" se curva y su gancho se vuelve la "C" verde gruesa; la cámara retrocede y la "C" queda DENTRO de LA
     CABEZA de perfil navy (vista en corte, la mitad de la pantalla o más). En "abierto" la "C" gira sobre sí misma
     sin cerrar (el hueco siempre visible) y arriba de la cabeza aparece la nube vacía, latiendo.
   - Rótulo con línea guía a la C: "Pendiente: queda abierto".
   - SFX: whoosh-short, un zumbido grave muy bajo en loop mientras gira (o tic-tac), pop de la nube.

7. **s07-plan** (~3,2 s) · GIRO · "Otro estudio vio que hacer un plan concreto la calma."
   - Push-in: delante de la cabeza entra LA TARJETA DEL PLAN grande (70 % del ancho) con pop y giro de 15°. Rótulo
     arriba "Estudio · 2011". En "plan" se escriben los tres renglones de a uno (cursor/lápiz animado, letras navy
     Lexend 700 40 px): "Qué: llamar al proveedor" / "Cuándo: jueves 10:00" / "Quién: Nico", con tilde verde en cada
     uno. En "calma": la tarjeta se corre al costado, la "C" de la cabeza se CIERRA en aro (pop + brillo verde), el
     zumbido se corta, la nube se achica tranquila.
   - Rótulo con línea guía al aro: "Plan concreto". (Nada de "elimina": ver fuentes.md.)
   - SFX: papel (entra la tarjeta), lápiz/teclas suaves x3, chime suave en "calma", corte seco del zumbido.

8. **s08-noche** (~3,1 s) · CALLBACK (el problema) · "Rubén, de noche: la seña, el presupuesto, el proveedor."
   - Viaje de cámara continuo: el aro verde se aleja y se vuelve el aro de la LÁMPARA de la mesita de luz que se
     prende; plano cenital-picado del DORMITORIO: Rubén en la cama boca arriba, ojos abiertos, mirando el techo
     (llena el 70 % del ancho). Despertador rojo apagado en la mesita: 3:12 (tic-tac). Etiqueta "Rubén" con línea guía
     (al pecho, nunca a la cara).
   - LA MISMA NUBE del mozo se infla sobre su cabeza (callback visual) y en cada palabra entra un pendiente con pop,
     en rojo apagado: "seña" el billete con clip "Seña · Graciela", "presupuesto" la hoja "Presupuesto heladera",
     "proveedor" la caja "Pedido al proveedor". En "proveedor" Rubén se da vuelta de costado y abre más los ojos
     (no duerme).
   - SFX: tic-tac del despertador, click de lámpara, pop x3 (más graves que los del mozo), suspiro de Rubén (si hay
     CC0; si no, nada).

9. **s09-sistema** (~3,4 s) · EL PRODUCTO · "Ahora cada pendiente va a su sistema, con responsable y aviso."
   - Rubén agarra LA TABLET de la mesita; en "sistema" los 3 pendientes salen de la nube y vuelan uno por uno a la
     pantalla (whoosh-short cada uno), donde se vuelven filas de la lista "Pendientes" y se ponen verdes/navy (dejan
     el rojo). Push-in a la tablet hasta llenar el 75 % del ancho (Rubén detrás, desenfocado). En "responsable" se
     iluminan los avatares ("Nico", "Rubén", "Nico"); en "aviso" las campanitas verdes hacen pop con la hora.
   - Rótulos con línea guía: "Responsable" (al avatar) y "Aviso" (a la campanita).
   - SFX: whoosh-short x3, click (fila), notification suave x3 (campanitas).

10. **s10-olvide** (~2,0 s) · REMATE · RUBÉN: "Anotado. Ya me olvidé."
    - Plano medio de Rubén en la cama con la tablet que baja a la mesita. Burbuja de diálogo blanca con borde navy
      (se entiende sin sonido): "Anotado. Ya me olvidé." Lexend 700 navy 48 px, arriba de Rubén, sin pisar la cara.
      En "Anotado" deja la tablet; en "olvidé" LA NUBE SE DESINFLA igual que la del mozo (mismo pfff, callback exacto
      del s03), pero Rubén sonríe debajo del bigote, se acomoda la almohada y apaga la lámpara (la luz baja un poco,
      nunca a negro). Recién ahí cierra los ojos (párpados bien modelados, sin bultos).
    - SFX: tablet en madera (tic), pff (mismo del s03), click de lámpara, el tic-tac se apaga.

11. **s11-dormir** (~2,5 s) · "¿Querés dormir sin pendientes? Agendá una"
    - Fundido de luz de noche a mañana en la ventana (luna → sol crema; la pared crema se ilumina) con la cámara en
      push-in a LA TABLET en la mesita: los 3 pendientes pasan a tilde verde en fila ("Seña cobrada ✓",
      "Presupuesto enviado ✓", "Pedido hecho ✓", tilde 3D o dibujada, no el carácter) y al lado el mate humeante.
      Rubén, de fondo, se estira descansado.
    - SFX: pájaros muy bajo (CC0), pop x3 (tildes).

12. **s12-llamada** (~2,8 s) · CIERRE · "videollamada gratis en scalerics.com."
    - Tarjeta de cierre que arranca justo en "videollamada": fondo verde `#5ce611` liso, "Videollamada gratis" Lexend
      900 navy ~120 px y debajo, grande, "scalerics.com" en navy sobre placa crema. Firma 3D debajo del texto: la
      nube de pensamiento crema chiquita y vacía con un tilde verde oscuro `#3fa60a` adentro, girando lento. Logo de
      Scalerics abajo.
    - SFX: whoosh-cinematic corto de entrada, chime.

## Cuidados generales
- Cuadro 0 nunca vacío; sin logo en el gancho.
- La anécdota siempre "se cuenta"; el lugar es "Berlín" (restaurante, no "café"); sin porcentajes; "Estudio clásico ·
  1927" y "Estudio · 2011" como créditos.
- El mozo queda bien: recordar todo sin anotar es un talento, no un truco; olvidar al cobrar es la gracia.
- La nube nunca atraviesa cabezas ni sombreros; las plaquitas de los pedidos no tapan caras.
- La escena de noche no se vuelve navy liso ni negra (compresión): pared crema, lámpara cálida, ventana navy.
- Ortografía de carteles: "Berlín", "se cuenta", "Sin anotar", "Cobrado", "Estudio clásico · 1927", "Terminadas",
  "Interrumpidas", "casi el doble", "Pendiente: queda abierto", "Estudio · 2011", "Plan concreto", "Qué: llamar al
  proveedor", "Cuándo: jueves 10:00", "Quién: Nico", "Seña · Graciela", "Presupuesto heladera", "Pedido al
  proveedor", "Pendientes", "Responsable", "Aviso", "Anotado. Ya me olvidé.", "Seña cobrada", "Presupuesto
  enviado", "Pedido hecho", "Videollamada gratis", "scalerics.com".
- Mezcla: techo de -31 LUFS por efecto, voz 6 LU por encima de música + SFX, final -14 LUFS, pico -1,5 dBFS.
- Para ideas.md (Hechos): `[formato explicador ¿Por qué? · 3D real (mozo con la nube de pedidos, mesa de restaurante,
  tareas a medias y pilas, "?" verde, cabeza con la C abierta, tarjeta del plan, Rubén en la cama con la misma nube,
  tablet de pendientes), fondo crema #efeee5 liso con objetos navy y verde y cierre verde]`.
