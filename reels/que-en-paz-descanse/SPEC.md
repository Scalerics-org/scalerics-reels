# que-en-paz-descanse · PARA MANDAR completo (3D real), ~30,0 s

**De qué trata.** Martes a media mañana. El almacén de Rubén está abierto como siempre, luz de día, Rubén con su mate.
Pero en internet la ficha del almacén dice **"Cerrado permanentemente"**, y el barrio le cree más al celular que a lo
que tiene adelante. Graciela: "Rubén… dice acá que cerraste." Él se señala con el mate: está ahí. Igual entra Marta de
negro con una bandeja de bizcochos ("Mi más sentido pésame, Rubén."), aparece una corona en la puerta con la cinta
"ALMACÉN RUBÉN · Q.E.P.D." y el contador de pésames sube a 12. Graciela, con el pañuelo: "¡Era tan buen almacén!". La
música se corta. Pausa. Rubén: **"Es, Graciela."** Remate del remate: vibra su celular, "Mamá: ¿Por qué me entero por
internet?" (13, tuba). Cartel: **"Un sitio web más tarde…"**. Parte 2: Graciela busca y sale la web del almacén al
toque, "ABIERTO AHORA", horario, mapa, botón a WhatsApp; entra feliz, "¡Estás abierto!"; Rubén: **"Estoy, Graciela."**;
vibra el celular: "Mamá: Vi tu página. ¡Qué buen mozo!"; Rubén guiña.

- **Producto:** sitio web rápido en el celular con horario, ubicación y botón a WhatsApp (que te encuentren bien y
  figures abierto cuando estás abierto). Solo en la línea chica final y en descripcion.txt. El cartel NUNCA dice
  "Scalerics". **No se nombra ni se dibuja ningún buscador ni app**: buscador y ficha genéricos (navy/crema, sin los
  colores de nadie); en burbujas "dice acá" e "internet".
- **Recurso visual central:** el **celular de Graciela** a pantalla casi completa con la ficha en rojo apagado (cuadro
  0) contra Rubén vivo y abierto atrás; la **corona de flores** con su cinta (la escalada que se entiende sin sonido);
  el **contador "Pésames"** 3D pegado a cámara; y el **celular de Rubén** con los mensajes de Mamá (los dos remates del
  remate). Parte 2: la web del almacén en el mismo encuadre del cuadro 0 (callback).
- **Estructura** como `reels/abren-hoy-completo` / `reels/las-siete-y-cincuenta-y-nueve`: parte 1 (14,4 s, sin línea
  chica) + cartel (3,2 s) + parte 2 (12,4 s, con la línea chica). Un proyecto 3D con gen.mjs (dos "días" T1/T2 o dos
  renders) y `armar.mjs unir`. El cartel se reusa de `reels/abren-hoy-completo/compositions/cartel.html` cambiando el
  texto.
- **Personajes** (módulo canónico `reels/abren-hoy/assets/personajes.js`, o la copia de las-siete que ya tiene Walter
  y utilería): **Rubén** (ELENCO.almacenero, protagonista, voz Gemini Algenib), **Graciela** (ELENCO.clienta, solo
  burbujas), **Marta** (ELENCO.duena, la de la cafetería de al lado, solo burbujas). Sin Orus.
- Sin emojis, sin rayas largas en textos visibles.

## Paleta y set (para diferenciarlo en el feed)
- **Almacén DE DÍA con pared crema `#efeee5`** (las últimas noches: navy claro `#16243d` en lo-mismo-que-la-otra-vez,
  vereda de noche navy oscuro `#0b1220` en las-siete). Anotar en "Hechos": "almacén de día, pared crema #efeee5".
  Zócalo navy `#0b1220` de 25 cm, estantes navy3 `#1f3254` con tapas de madera clara y mercadería de colores planos,
  mostrador navy3 con tapa de madera (el de abren-hoy), piso damero crema/navy.
- **Luz de día**: sol blanco cálido que entra por la puerta vidriada y la vidriera (manchas de luz duras en el piso,
  bordes marcados, nada de degradé fino: Instagram lo bandea). La pared crema NO puede quedar lavada: exposición
  para que se vea crema, no blanca.
- **Ojo con el contraste sobre crema**: burbujas en blanco `#ffffff` con borde navy de 8 px y sombra dura navy
  (no crema sobre crema), letra navy Lexend 800; el contador y las pills en placa navy con borde verde. Ningún texto
  blanco suelto sobre la pared.
- Rojo apagado `#c7655b` SOLO para el problema: "Cerrado permanentemente", el punto rojo de la ficha, la marca debajo
  de "Era" y el número del contador de pésames. Verde `#5ce611` para lo resuelto: "ABIERTO AHORA", el pin del mapa, el
  botón de WhatsApp de la web, "Pésames: 0", y el recuadro de selección de los subtítulos.
- Marta "de luto": vestido o saquito navy casi negro `#0b1220` con cuello crema y un broche verde chiquito
  (sobria, nada de velo). Graciela como siempre (lentes navy2, rulos lila), con un pañuelo crema.

## PARTE 1 · el problema (0,0-14,4 s)
Pill de hora abajo a la derecha (como abren-hoy, s01-hora): `MARTES · 10:15`, hasta 8,4 s.

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 0,00-2,20 | **P1 sobre el hombro de Graciela, el celular en primer plano** (en su mano izquierda, ocupa el 55 % inferior del cuadro, levemente inclinado, nítido). Atrás, en foco suave pero legible: el mostrador y **Rubén abierto**, luces prendidas, mate en la mano, sonrisa tranquila (CARA.sonrisa); detrás de él, la estantería llena. 1,20-2,20 · foco y dolly suave del celular hacia Rubén (el celular baja y sale por abajo). | **Cuadro 0 = la portada en movimiento**: en la pantalla (canvas, textos ≥ 40 px) una ficha genérica de buscador: **"Almacén Rubén"** (Lexend 800), dirección "Calle del barrio 1234" chiquita, estrellitas crema, y en grande **"● Cerrado permanentemente"** en rojo apagado. 0,30 · burbuja de Graciela, arriba, cola hacia ella: **"Rubén… dice acá que cerraste."** (pop). | ambiente de barrio de día (calle con pasabajos, bajo); música pizzicato liviana desde 0; pop 0,30 |
| 2,20-3,30 | **P2 primer plano de Rubén** (contraplano desde atrás del hombro de Graciela, rulos lila desenfocados en el borde). | Rubén la mira, cejas arriba (CARA.incredula suave), y sin decir nada **se señala el pecho con el mate** (pose nueva SEÑALA: mano derecha con el mate tocando el esternón, 2,45), levanta las cejas: "estoy acá". 2,95 sorbe el mate sin dejar de mirarla. | sorbo 2,95 |
| 3,30-5,10 | **P3 general frontal del mostrador** desde atrás de la caja, mirando hacia la puerta vidriada (se lee el cartel colgante "ABIERTO" en la puerta: ironía para el que lo vea). | 3,35 · **campanita**: entra **Marta** de negro con una **bandeja de bizcochos** tapada a medias con servilleta, cara de pésame (CARA.resignado con boca apretada, cabeza ladeada). 3,65 · burbuja de Marta: **"Mi más sentido pésame, Rubén."** (pop; la de Graciela sube y se va). 4,10 · **contador 3D aparece arriba, pegado a cámara: "Pésames: 3"** (pop + tic). 4,50 · Marta deja la bandeja en el mostrador y le pone una mano en el antebrazo a Rubén (no en la cara); Rubén mira la mano, después a cámara, cara de nada. | campanita 3,35; pop 3,65; tic 4,10; bandeja que apoya (sello.mp3 bajo) 4,50 |
| 5,10-6,70 | **P4 la puerta vidriada desde adentro, push-in** hacia la corona (Rubén de espaldas o de perfil, desenfocado en el primer término izquierdo, para que el que mira sepa que él sigue ahí). | 5,20 · **la corona de flores aparece apoyada afuera, contra el vidrio de la puerta** (pop con squash, rebotito sobre su trípode; la deja alguien que no se ve). 5,40-6,50 · push-in hasta que **la cinta llena el ancho**: **"ALMACÉN RUBÉN · Q.E.P.D."** (Lexend 800 navy sobre cinta crema, se lee entera, dentro del 80 % seguro). Contador: **7** (5,55, tic) → **12** (6,25, rodillo rápido, tic-tic-tic). Detrás de la corona, en la vereda, dos siluetas de vecinos que se frenan y se sacan el sombrero/agachan la cabeza (opcional, solo si no ensucia el cuadro). | pop corona 5,20; whoosh suave del push-in 5,40; tics del contador |
| 6,70-8,40 | **P5 plano medio de Graciela y Marta** juntas del otro lado del mostrador (contraplano, de 3/4, caras a la vista). | Marta asiente despacio con la mano en el pecho. 6,90 · Graciela lleva el pañuelo crema a los ojos por debajo de los lentes (sin que la mano atraviese los lentes ni la nariz; si no sale limpio: pañuelo a la altura de la boca), CARA.resignado. 7,10 · burbuja de Graciela: **"¡Era tan buen almacén!"** con **"Era"** subrayado por un trazo rojo apagado (el que mira tiene que ver el tiempo verbal). | pop 7,10; un sollozo NO (nada de voz de Graciela) |
| 8,40-11,20 | **P6 primer plano de Rubén de frente**, la estantería llena atrás (desenfocada). | **8,40 la música se corta seca.** Pausa: 8,40-9,30 solo ambiente; Rubén gira la cabeza lento a cámara, cara de nada (CARA.resignado con párpados a media asta), el mate quieto en la mano. 9,05-9,35 push-in rápido a la cara (whoosh corto). **9,45 · voz (Algenib): "Es, Graciela."** (~1,2 s, seca, cansada; la boca sigue la envolvente). Subtítulo palabra por palabra abajo de la cara (como s02-linea de abren-hoy), **"Es,"** en el recuadro verde de selección. 10,70-11,20 sostiene la mirada (silencio). | whoosh-short 9,05; voz; nada más (el silencio es el chiste) |
| 11,20-12,80 | **P7 inserto del celular de Rubén sobre el mostrador** (cenital un poco inclinado, el celular ocupa 70 % del ancho; al lado, el termo y una punta de la bandeja de bizcochos). | 11,25 · el celular **vibra** (tiembla sobre la madera). 11,45 · notificación grande que baja desde arriba de la pantalla: avatar círculo crema con "M", **"Mamá"** (Lexend 800) y **"¿Por qué me entero por internet?"** (≥ 40 px, en 2 líneas). 12,30 · contador **"Pésames: 13"** (flip + **tuba**). | vibra 11,25; notification 11,45 (bajo); tuba 12,30 |
| 12,80-14,40 | **P8 general** (P3 un poco más abierto: Rubén, Graciela, Marta, la bandeja, la corona en la puerta al fondo). | Rubén con el celular en una mano y el mate en la otra **mira al techo** (cabeza atrás, ojos arriba, resignado). 13,30 · Marta, solidaria, le acerca un bizcocho de la bandeja; 13,70 Rubén lo agarra sin bajar la vista y le da un mordisco (pose nueva COME; el bizcocho achica). Fin de la parte 1 en 14,40 (sin línea chica). | crujido de bizcocho (papel.wav corto, muy bajo) 13,75 |

Último cuadro (14,40) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL · "Un sitio web más tarde…" (14,4-17,6 s)
Copia de `reels/abren-hoy-completo/compositions/cartel.html` con otro texto, en tres líneas: **"Un sitio"** /
**"web"** / **"más tarde…"** (146 px; "web" puede ir más grande, 180 px, porque es corta). Fondo verde de marca con
manchas y burbujas, letras Lexend 900 crema con borde navy de 16 px que rebotan, -4°. Entra girando el último cuadro
de la parte 1 (540°), sale con iris al primer cuadro de la parte 2. Voz Gemini Rasalgethi, caricaturesca: **"Un sitio
web más tarde."** (probar 2 tomas; que "web" suene "güeb", natural en Uruguay). Stinger de vibráfono (DanJFilms, CC0) y
whooshes iguales que en el ejemplar. **No dice "Scalerics".**

## PARTE 2 · resuelto (14,4 s del reel → 17,6-30,0)
Pill de hora: `OTRO MARTES · 10:15` (hasta 23,0).

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 17,60-20,10 | **Q1 = encuadre de P1 (callback):** sobre el hombro de Graciela, el celular en primer plano, Rubén atrás con el mate. | 17,70 · en la pantalla, barra de búsqueda genérica (crema, borde navy, lupa de línea): se tipea **"almacén rubén"** letra por letra. 18,10 · tap en el resultado (ripple verde). **18,25 la web abre al toque** (sin ruedita de carga: es el punto): encabezado navy con **"Almacén de Rubén"** en crema; 18,40 **"● ABIERTO AHORA"** en verde (pop); 18,65 **"Lun a sáb · 8:00 a 20:00"**; 18,90 un mapa chico de líneas crema/navy con **pin verde** que cae y rebota; 19,15 botón verde grande **"Escribinos por WhatsApp"** (con un globito de chat genérico de líneas, sin el logo de la app); 19,35 una foto de Rubén con el mate (render de su cara en un recuadro redondeado, sonriendo). Textos ≥ 36 px. 19,60 · el contador vuelve un instante arriba: **"Pésames: 13"** se tacha → **"Pésames: 0"** en verde (callback, ding). | tipeo 17,70; key-press 18,10; pops por elemento; ding (cero.mp3) 19,60; música tranquila desde 17,6 (no se corta en toda la parte 2) |
| 20,10-21,50 | **Q2 = encuadre de P3 (callback):** general frontal desde atrás de la caja hacia la puerta. **La puerta está limpia**: sin corona, cartel "ABIERTO" y el vinilo del horario "8 a 20". | 20,15 · **campanita**: entra Graciela feliz con el celular en alto mostrando la pantalla (CARA.feliz). 20,45 · burbuja: **"¡Estás abierto!"** (pop). Rubén atrás del mostrador con el mate, tranquilo. | campanita 20,15; pop 20,45 |
| 21,50-24,00 | **Q3 = encuadre de P6 (callback):** primer plano de Rubén de frente, push-in lento. | 21,55-22,15 sorbe el mate con los ojos cerrados (sorbo). 22,25 baja el mate, mira a cámara con media sonrisa (CARA.sonrisa suave). **22,45 · voz (Algenib): "Estoy, Graciela."** (~1,3 s; mismo tono seco, ahora satisfecho). Subtítulo con **"Estoy,"** en el recuadro verde. La música baja 9 dB mientras habla. | sorbo 21,55; voz |
| 24,00-26,30 | **Q4 = encuadre de P7 (callback):** el celular de Rubén sobre el mostrador (al lado, el termo; ya no hay bandeja de bizcochos). | 24,05 · vibra. 24,25 · notificación: **"Mamá"** / **"Vi tu página. ¡Qué buen mozo!"**. 24,60 · debajo, chiquito, el corazoncito NO (sin emojis): en su lugar, la miniatura de la foto de Rubén de la web. | vibra 24,05; notification 24,25 |
| 26,30-28,50 | **Q5 primer plano de Rubén**, push-in lento. | 26,40 · Rubén se acomoda el bigote con la punta de los dedos de la mano libre (pose nueva BIGOTE: dedos a la altura del bigote SIN entrar en la boca ni atravesar la cara; plan B: se arregla el cuello de la camisa), se infla un poco el pecho, sonrisa (CARA.sonrisa). 27,30 · **guiño** a cámara (ojos.guiño), levanta apenas el mate como brindis. | chime chiquito en el guiño 27,30 |
| 28,50-30,00 | **Q6 general que se abre** (dolly atrás suave): Graciela compra, Rubén le cobra con el mate en la otra mano. | 28,55 · **línea chica** abajo (caja navy con borde verde, como s03-cierre de abren-hoy, Lexend 600 ≥ 36 px): **"Tu horario y tu ubicación," / "al día en internet"** / **"scalerics.com"** en verde (1,45 s, hasta el final). Sin tarjeta de videollamada. | campanita bajita 29,3 (opcional) |

## Objetos 3D por plano (todo genérico, sin marcas; cada uno que nadie confunda)
- **Set (todos los planos):** el almacén de abren-hoy por dentro, con **pared crema `#efeee5`** y zócalo navy;
  estantes navy3 con tapas de madera, mercadería de colores planos (yerba, fideos, latas, sachets de leche; nada
  verde de más para que el verde siga significando "resuelto"); mostrador de abren-hoy; **puerta vidriada** con marco
  navy, **cartel colgante "ABIERTO"** (verde con letra navy, cuelga de una cadenita) y en la parte 2 el vinilo
  "8 a 20" en el vidrio; vidriera con la vereda de día afuera (baldosas, cordón, un árbol low-poly); luz de día
  entrando con manchas duras en el piso.
- **Celular de Graciela (P1, Q1, Q2):** RoundedBox con funda lila (su color), pantalla canvas. Parte 1: ficha de
  buscador genérico (sin colores de ninguna marca: blanco, navy, crema) con "Almacén Rubén", estrellitas crema y
  **"● Cerrado permanentemente"** en rojo apagado. Parte 2: buscador → **web del almacén** (navy/crema/verde): "Almacén
  de Rubén", "● ABIERTO AHORA", horario, mapa de líneas con pin verde, botón "Escribinos por WhatsApp", foto de Rubén.
- **Mate y termo de Rubén:** crearMate()/crearTermo() (siempre con él: es su firma).
- **Bandeja de bizcochos (P3, P5, P7, P8):** bandeja ovalada crema/plateada mate con una servilleta blanca a medias y
  bizcochos uruguayos reconocibles: **medialunas** (curvas, doradas, con brillito de almíbar), **cañoncitos de dulce de
  leche** (tubo hojaldrado con el dulce asomando), **bizcochos de grasa** (redonditos, aplastados). Que se lea
  "bizcochos de la panadería", no "pan".
- **Corona de flores (P4, P8 al fondo):** aro grande (~1 m de diámetro) de hojas verde oscuro `#3fa60a`/navy con
  **flores blancas y crema** (claveles: esferas con pétalos facetados) y algún rojo apagado, sobre un **trípode de
  madera**; **cinta crema** cruzada en diagonal con **"ALMACÉN RUBÉN · Q.E.P.D."** en navy (TextGeometry o canvas, que
  se lea entera en el push-in). Apoyada afuera, contra el vidrio de la puerta. NO está en la parte 2.
- **Contador "Pésames" (parte 1, y en Q1):** placa navy con borde verde pegada a cámara, arriba y limpia (como "Hoy:
  47 veces" de abren-hoy): "Pésames:" en crema y el número en TextGeometry rojo apagado con flip/rodillo (3 → 7 → 12
  → 13). En Q1: tachado rojo y **"0" en verde**. Nunca pisa caras ni la corona: si el encuadre lo pide, baja la
  corona en el cuadro, no el contador.
- **Celular de Rubén (P7, P8, Q4):** más viejito, funda navy, sobre la madera del mostrador; pantalla canvas con
  notificación (avatar "M" crema, "Mamá", texto ≥ 40 px). Vibra = temblor + desplazamiento de 2 mm sobre la madera.
- **Pañuelo de Graciela (P5):** cuadrado crema con borde de puntilla, en su mano.
- **Burbujas de diálogo:** las de abren-hoy, blancas con borde navy de 8 px y sombra dura (sobre pared crema), cola
  hacia quien habla, pegadas a cámara; la marca roja apagada debajo de "Era".

## Qué sumar a personajes.js (en la copia local; si sirve para la serie, también al canónico)
- `ELENCO.duena` (Marta) con ropa de luto: opción de color de ropa navy casi negro con cuello crema y broche verde (si
  el módulo ya permite `ropa`/`camisa`, solo un preset `MARTA_LUTO`).
- Utilería: `crearBandejaBizcochos()`, `crearCorona(textoCinta)`, `crearPañuelo()`, `crearCelular(funda)` con
  pantalla canvas (si no existe ya en otro reel: mirar reels/tres-segundos y reels/abren-hoy-2).
- Poses: `SEÑALA` (mano con el mate al pecho), `PAÑUELO` (mano a los ojos/boca sin atravesar lentes), `MANO_BRAZO`
  (Marta apoya la mano en el antebrazo de Rubén), `TECHO` (cabeza atrás, ojos arriba), `COME` (bizcocho a la boca,
  que no entre en la cara: llega al borde del bigote y el bizcocho se achica), `BIGOTE` (dedos al bigote).

## Cámara
PLANOS de abren-hoy (cortes entre planos, Catmull-Rom adentro de cada uno). Los planos de la parte 2 repiten EXACTO
el encuadre de su par de la parte 1 (P1→Q1, P3→Q2, P6→Q3, P7→Q4): el callback se ve. P4 es la única "zambullida"
(push-in de la puerta a la cinta); en las transiciones siempre hay un objeto grande en cuadro, nunca la pared crema
lisa.

## Sonido por tramo (techo -31 LUFS por efecto; voz ≥ 6 LU arriba del resto mientras habla; final -14 LUFS, pico -1,5)
- **0 a 8,4:** ambiente de barrio de día (calle.wav con pasabajos, como en lo-mismo-que-la-otra-vez), pizzicato
  liviano; pops de burbujas, sorbo, campanita (775noise), tics del contador (key-press, cada vez más seguido de 7 a
  12), pop de la corona, whoosh suave del push-in, apoyo de la bandeja.
- **8,4 a 11,2:** **la música se corta seca**; solo ambiente. Whoosh corto del push-in y la voz.
- **11,2 a 14,4:** vibra.wav (SpliceSound), notification.mp3 (bajo), **tuba** (nomiqbomi) en el 13, crujido de bizcocho.
- **Cartel:** como abren-hoy-completo (whoosh, stinger CC0, narrador, whoosh del iris).
- **17,6 a 30,0:** música tranquila (pizzicato más bajo, nunca se corta: todo anda), tipeo, key-press del tap, pops de
  la web, ding (cero.mp3, GabFitzgerald) en "Pésames: 0", campanita, sorbo, vibra + notification, chime del guiño;
  la música baja 9 dB mientras habla Rubén.
- Todo con grabaciones reales ya registradas en los fuentes.md del repo (la descarga de freesound está bloqueada en
  la nube). No usar golpe.mp3 (sin licencia registrada). Nada sintetizado.

## Portada (portada.json, fondo LIMPIO=1, sin burbujas ni subtítulos ni contador)
- Fondo: P1 (el celular con "Cerrado permanentemente" en primer plano y Rubén abierto con el mate atrás) o P4 (la
  corona con la cinta en la puerta); zoom 1,3.
- `chica`: "Rubén…" · `grande`: "¿cerraste?" · `sello`: "Para mandar" · acento y sello `#5ce611`.

## Duración
Parte 1 14,4 s + cartel 3,2 s + parte 2 12,4 s = **30,0 s**. Voz: Rubén ×2 (Algenib: "Es, Graciela." / "Estoy,
Graciela."), narrador del cartel (Rasalgethi: "Un sitio web más tarde."). Graciela y Marta solo en burbujas.

## Riesgos para el QA (buscarlos a propósito)
- Manos que atraviesan caras: el pañuelo de Graciela, el bizcocho de Rubén, los dedos en el bigote, la mano de Marta.
- La cinta de la corona: que se lea ENTERA y derecha en P4 (no curvada al punto de cortar "Q.E.P.D.").
- Contraste: nada crema o blanco sobre la pared crema sin borde navy.
- Continuidad: la corona y la bandeja existen solo en la parte 1; el cartel "ABIERTO" de la puerta en las dos.
- El contador no nace dentro de una cabeza ni tapa la corona.
