# Escenas de por-que-la-lista (12 escenas, ~31 s con Orus)

Serie "¿Por qué…?", sin marcas. Fondo del reel: navy claro `#16243d` (liso, sin degradés fuertes: compresión de
Instagram). Paleta de materiales: navy `#0b1220`/`#16243d`, verde `#5ce611` (lo resuelto, tildes), crema `#efeee5`
(papel, tarjetas), blanco; aluminio = crema/blanco con metalness baja; rojo apagado `#c7655b` SOLO para el problema
(la traba, el cuaderno de Marta). Índices de palabra 0-based, como en `reel.json`.

**Hilo de la cámara (una curva Catmull-Rom continua, punto 8c):** tarjeta en el volante (cerca) → retroceso por la
cabina hasta ver el avión entero en la pista → órbita corta alrededor del avión → travelling a la cola → zambullida
en la traba roja → la traba se transforma en la tarjeta → vuelta al volante → la tarjeta vuela y la cámara la sigue
hasta el frente del local → push-in al cuaderno sobre el mostrador → el cuaderno se abre y se vuelve la tablet →
retroceso: la tablet sobre el mostrador del local encendido. El objeto que viene siempre está grande en cuadro
durante el viaje; nunca pantalla lisa.

**Objetos que se repiten y hacen algo distinto (callback):** la TARJETA de la lista (s01 en el volante, s05 nace de
la traba, s06 se tilda, s07 vuela al local, s09-s10 se vuelve la lista de la tablet) y el TILDE verde (al final del
avión: "Controles libres ✓"; al final del local: "Pedido al proveedor ✓").

| # | id | arranca en (palabra) | dura aprox. |
|---|----|----------------------|-------------|
| 1 | s01-gancho | 0 "¿Por" | 3,4 s |
| 2 | s02-1935 | 10 "En" (1935) | 3,3 s |
| 3 | s03-expertos | 20 "Pilotos" | 1,8 s |
| 4 | s04-trabados | 24 "Despegaron" | 3,0 s |
| 5 | s05-lista | 32 "En" (vez de más entrenamiento) | 2,8 s |
| 6 | s06-hoy | 40 "Hoy," | 1,9 s |
| 7 | s07-local | 45 "Tu" | 3,6 s |
| 8 | s08-marta | 55 "¿Y" | 2,4 s |
| 9 | s09-sistema | 62 "En" (Scalerics) | 2,4 s |
| 10 | s10-tareas | 69 "cada" | 1,9 s |
| 11 | s11-verlo | 74 "¿Querés" | 2,4 s |
| 12 | s12-llamada | 81 "videollamada" | 2,8 s |

Subtítulos karaoke desde la palabra 10 (el gancho del cuadro 0 ya está escrito grande). Acentos sugeridos (verde):
lista (6), 1935 (11), expertos (21), trabados (28), olvidado (31), lista (38), repasa (44), despega (48),
Marta (61), medida (68), lista (73). En rojo apagado (`malo`): trabados (28), olvidado (31), Marta (61).
`sinSub` sugerido: 10-11 (el "1935" ya está en 3D arriba).

---

## s01-gancho · palabra 0 "¿Por qué el piloto repasa una lista, si sabe volar?"
- **Objeto 3D:** un VOLANTE DE AVIÓN de los años 30 (yugo con dos manijas en forma de "U" abierta, columna que baja,
  navy con manijas crema gastadas), y sujeta en el centro con un clip de metal una TARJETA crema rígida (RoundedBox
  fina) con 5 renglones navy gruesos y 5 casilleros vacíos a la izquierda. Detrás, desenfocado y oscuro, el borde del
  parabrisas de la cabina (dos marcos) para que nadie lo confunda con un volante de auto. Llena 70 % del ancho.
- **Cámara:** en el cuadro 0 ya está cerca y en leve contrapicado; push-in lento hacia la tarjeta (los casilleros se
  ven grandes) y al final arranca a retroceder.
- **Capa HTML:** el gancho entero en el cuadro 0, Lexend 900 ~120 px, en 3 líneas: "¿Por qué el piloto repasa una
  **lista**," / "si sabe volar?" con "lista" en recuadro verde. Sin subtítulos debajo.
- **Rótulo:** ninguno (el gancho manda).
- **SFX:** whoosh-short suave al arrancar el push-in; click-soft cuando el clip "aprieta" la tarjeta (0,4 s).

## s02-1935 · palabra 10 "En 1935, un avión nuevo se estrelló en una prueba."
- **Objeto 3D:** el AVIÓN entero: cuatrimotor de hélices de los años 30, genérico (sin insignias, sin marcas,
  sin colores de nadie): fuselaje de aluminio crema/blanco, nariz vidriada, cuatro motores redondos con hélices de
  tres palas que giran (rotación = función de t), tren de aterrizaje de dos ruedas, una sola deriva alta en la cola.
  Sobre una pista navy con líneas crema discontinuas (bordes marcados, 8 px equivalentes). Llena el ancho.
- **Transformación / cámara:** viene del volante: la cámara retrocede atravesando el parabrisas (grúa hacia atrás y
  arriba) y el avión queda entero de tres cuartos. Arriba, "1935" en TextGeometry verde, grande y limpio, sin pisar
  el avión (el avión va debajo, punto 8c).
- **Rótulo:** pill crema chica "Vuelo de prueba" con línea guía al avión, en "prueba".
- **Choque:** NO se muestra fuego ni restos. En "se estrelló" el avión solo se inclina un poco hacia arriba y el
  "1935" pierde el verde y queda crema un instante (pista de que algo salió mal); el accidente se cuenta, no se ve.
- **SFX:** motor de hélices que arranca (SFX real CC0, anotar en fuentes.md; si no hay, riser bajo); pop en "1935";
  impact-bass-1 grave y corto en "estrelló".

## s03-expertos · palabra 20 "Pilotos expertos, avión sano."
- **Objeto 3D:** el MISMO avión, ahora quieto, desde otro ángulo (la cámara hace una órbita corta de 40 grados por
  delante de la nariz, a la altura de la cabina).
- **Rótulos (2, con línea guía):** "Pilotos expertos ✓" apuntando a la cabina (en "expertos"), "Avión sin fallas ✓"
  apuntando a un motor (en "sano"). Tildes verdes. El objeto llena el cuadro; los rótulos en el 80 % seguro.
- **SFX:** whoosh-short en la órbita; ping en cada tilde.

## s04-trabados · palabra 24 "Despegaron con los controles trabados: un paso olvidado."
- **Objeto 3D:** la COLA del avión (deriva y estabilizadores con el timón de profundidad), grande, y prendida al
  timón una TRABA roja apagada `#c7655b`: una pieza en forma de "U" que abraza el borde del timón, con un perno y
  una cinta roja colgando (la cinta flamea por función de t). Bien visible: es el problema.
- **Cámara:** travelling desde la nariz por todo el fuselaje hasta la cola (el avión siempre en cuadro, nunca
  vacío) mientras el avión levanta la nariz al despegar ("Despegaron"); en "trabados" push-in fuerte a la traba;
  en "un paso olvidado" zambullida hasta que la traba llena media pantalla.
- **Rótulo:** "Controles trabados" en rojo apagado con línea guía a la traba (en "trabados"). En "olvidado", sello
  HTML "UN PASO OLVIDADO" en rojo apagado, inclinado, con pop.
- **SFX:** motor que sube (o whoosh-cinematic); impact-bass-2 en "trabados"; glitch-1 corto en el sello.

## s05-lista · palabra 32 "En vez de más entrenamiento, una lista corta."
- **Giro a la mitad.** Primero lo que el que mira espera: una PILA ALTA DE MANUALES gruesos (6-7 libros navy y gris,
  lomos marcados) que cae desde arriba y llena la pantalla en "más entrenamiento", con el rótulo "Más entrenamiento"
  que se tacha (línea roja apagada). En "una lista corta" la pila se desarma hacia los costados y la TRABA roja (que
  quedó en el centro) se aplana, se vuelve crema y SE TRANSFORMA en la TARJETA de la lista (la misma de s01): 4
  renglones gruesos, cada uno con su casillero.
- **Cámara:** la cámara sale de la cola en un arco y queda frontal a la tarjeta, grande (65 % del ancho).
- **Rótulo:** "Una lista corta" en verde con línea guía a la tarjeta.
- **SFX:** thud grave (impact-bass-1) cuando cae la pila; whoosh al desarmarse; pop + sparkle en la transformación.

## s06-hoy · palabra 40 "Hoy, todo piloto la repasa."
- **Objeto 3D:** la TARJETA vuelve a su clip en el VOLANTE de s01 (callback), con la cabina detrás. Ahora los
  casilleros se tildan uno por uno en verde `#5ce611` (tildes 3D extruidos, gruesos), el último en "repasa".
- **Rótulo:** el último renglón se lee: "Controles libres ✓" (justo lo que falló en 1935; FAA, ver fuentes.md).
- **Cámara:** push-in corto al volante y leve órbita.
- **SFX:** click en cada tilde (4 clicks con ritmo), chime suave en el último.

## s07-local · palabra 45 "Tu local también despega: abrir, cerrar, el pedido al proveedor."
- **Transformación / cámara:** la tarjeta se desprende del volante y vuela hacia la cámara; la cámara la sigue y,
  cuando la tarjeta se corre, aparece el FRENTE DE UN LOCAL uruguayo genérico: persiana metálica de lamas (crema),
  toldo verde de marca, vidriera, puerta, cartel colgado. Llena 70 % del ancho. La tarjeta queda flotando al costado,
  chica, con sus renglones vacíos otra vez.
- **Acciones por palabra:** "despega": el toldo se despliega con pop. "abrir": la persiana sube y se prende la luz de
  adentro. "cerrar": la persiana baja. "el pedido al proveedor": cae delante del local una CAJA de cartón de
  proveedor (con cinta y etiqueta) que rebota.
- **Rótulos:** tres pills crema que entran sobre cada palabra: "Abrir" · "Cerrar" · "Pedido al proveedor"
  (máximo 2 a la vez en pantalla: la primera sale cuando entra la tercera).
- **SFX:** whoosh en el vuelo de la tarjeta; persiana metálica real CC0 en "abrir" y "cerrar" (si no hay, whoosh-short
  + click); pop/thud en la caja.

## s08-marta · palabra 55 "¿Y si eso lo sabe solo Marta?"
- **Objeto 3D:** un CUADERNO de tapa dura, cerrado, gastado, en rojo apagado `#c7655b`, con una banda elástica,
  post-its crema y verdes asomando por los bordes, y en la tapa una etiqueta crema escrita a mano "MARTA". Apoyado
  sobre el mostrador del local (push-in desde el frente, a través de la vidriera). Llena 60-70 % de la pantalla.
- **Humor sin burla:** el cuaderno tiembla un poco y un post-it se despega y cae (Marta sabe todo; el problema es
  que solo ella).
- **Rótulo:** "Solo lo sabe Marta" con línea guía al cuaderno.
- **SFX:** whoosh-short en el push-in; pop chiquito cuando cae el post-it.

## s09-sistema · palabra 62 "En Scalerics armamos tu sistema a medida:"
- **Transformación:** el elástico salta, el cuaderno se abre, las hojas se levantan en abanico y se pliegan en una
  TABLET 3D grande (RoundedBox navy, borde marcado), apoyada en el mostrador. En pantalla, la interfaz del sistema:
  encabezado "Tu local" con el logo de Scalerics chico en la esquina, y tres tarjetas grandes "Apertura", "Cierre",
  "Pedido al proveedor" (las mismas palabras de s07).
- **Cámara:** push-in hasta que la tablet llena 70 % del ancho.
- **Rótulo:** "A medida" en verde con línea guía al encabezado (en "medida").
- **SFX:** click del elástico; whoosh de las hojas; pop al quedar armada la tablet.

## s10-tareas · palabra 69 "cada tarea con su lista."
- **Objeto 3D:** la misma TABLET, pantalla de cerca: se abre la tarjeta "Apertura" y adentro aparece LA TARJETA de
  la lista (mismo diseño que la del piloto: renglones gruesos y casilleros), con tareas del local: "Subir la
  persiana", "Prender la caja", "Revisar la heladera". Se tildan en verde; arriba, una barra "Hecho por: Marta ·
  Nico" (cualquiera del equipo puede seguirla).
- **Rótulo:** "Cada tarea, su lista ✓".
- **SFX:** tres clicks de tilde; ping al final.

## s11-verlo · palabra 74 "¿Querés verlo en tu local? Agendá una"
- **Cámara:** retroceso amplio: la tablet sobre el mostrador, el local con la persiana arriba, la luz prendida, la
  caja del proveedor con un tilde verde arriba, y en la vidriera la TARJETA del piloto pegada como cartel (cierre del
  callback: la lista del avión ahora es la del local).
- **Rótulo:** ninguno nuevo (el subtítulo alcanza); el frente del local tiene que llenar el cuadro.
- **SFX:** whoosh-cinematic suave en el retroceso; sparkle cuando se prende la vidriera.

## s12-llamada · palabra 81 "videollamada gratis en scalerics.com." (~2,8 s)
- **Tarjeta de cierre** (capa HTML sobre el 3D que se oscurece a navy liso): "Videollamada gratis" en crema, Lexend
  800 ~110 px, y abajo, grande y en verde `#5ce611`, "scalerics.com". Logo de Scalerics abajo. Arranca justo sobre
  "videollamada". El 3D detrás puede quedar quieto y tapado (no hace falta objeto).
- **SFX:** chime de cierre; música con fundido de 0,35 s al final.

---

## Notas para el constructor
- Los números 3D: solo "1935" (dígitos: están en `lexend800.js`). Los tildes y el "?" son geometría propia.
- Voz: el guion escribe "1935" en dígitos; si Orus no lo dice "mil novecientos treinta y cinco", cambiar esa línea
  del guion a palabras y regenerar.
- Nada de marca del avión ni insignias militares (ni estrellas ni escarapelas). Ningún personaje humano en primer
  plano (los pilotos no se dibujan: se nombran en el rótulo).
- El accidente no se muestra (sin fuego, sin restos, sin caída): el reel es educativo, no morboso.
