# dos-repuestos · plan 3D (serie "Dos negocios", 3D real, ~33 s estimados)

Producto: agente de IA (consulta de stock y reserva de la pieza por WhatsApp a cualquier hora). Voz: Orus narrador,
Rubén una línea (Algenib). Tiempos ESTIMADOS (0,34 s por palabra + pausas): los reales salen de `tiempos.mjs`.

## Idea visual central: la medianera ES la pantalla partida
Las dos casas de repuestos están pegadas, una al lado de la otra, en la misma vereda. La pared medianera queda en
x = 540 cuando la cámara está de frente: la pantalla se parte sola, en 3D, sin una línea dibujada encima.
- **Izquierda, lo de Néstor:** gris apagado (fachada #4a505c, cortina #6b7280, luz fría de farol). El problema, y
  solo el problema, en rojo apagado #c0625a (el testigo de la batería, el tilde que no llega).
- **Derecha, lo de Daniel:** navy claro #16243d, filete y letras verde #5ce611, crema #efeee5. Lo resuelto en verde.
- Mismo cartel ("REPUESTOS NÉSTOR" / "REPUESTOS DANIEL"), misma cortina, mismo mostrador por dentro: la única
  diferencia visible es el celular de Daniel que se prende verde.
- **Corte de casa de muñecas** (dollhouse): para los interiores (escenas 4, 5, 8, 10) las fachadas se levantan (o la
  cámara atraviesa la rejilla de la cortina) y se ven los dos locales por dentro, lado a lado, divididos por la
  medianera.
- Fondo del reel: noche en navy oscuro #0b1220 con cielo liso (nada de degradés con brillo: Instagram los rompe);
  la escena 9 (mañana) en crema #efeee5 con cielo liso; cierre en verde #5ce611 con líneas navy.

## Objetos 3D (específicos, que nadie los confunda)
- **Fachadas**: dos locales iguales, ladrillo pintado, cortina metálica enrollable de lamas horizontales (RoundedBox
  apilados, con el tambor arriba) y una rejilla calada en la parte de arriba por la que se ve el interior; cartel
  luminoso apagado arriba; número de puerta; farol de calle entre las dos (en la medianera); vereda de baldosas
  (copiar las de abren-hoy), cordón y un tramo de avenida con la línea discontinua.
- **Interior de casa de repuestos**: mostrador largo con vidrio, detrás estanterías llenas: baterías apiladas (cajas
  con dos bornes), filtros cilíndricos, correas colgadas de ganchos (aros negros con nervaduras), latas de aceite
  genéricas sin marca, un tablero con llaves. Reconocible como repuestos, no como ferretería: las baterías y las
  correas colgadas hacen el trabajo.
- **La batería protagonista**: caja navy con tapa crema, dos bornes (+ crema y − navy), manija, etiqueta "12 V" en
  verde. En la camioneta, la misma batería con un testigo rojo apagado.
- **La camioneta del reparto de Rubén**: furgoneta chica low-poly, crema con franja verde y "ALMACÉN" en el lateral
  (el almacén de Rubén, el mismo de abren-hoy), capó abierto, cajones de bebidas en la caja de atrás.
- **Celular gigante** con el chat (interfaz de marca, nunca la de una app real), cable de carga en el de Néstor.
- **Reloj 3D**: dígitos TextGeometry "22:00" → "8:00", arriba y limpio, sin pisar nada.
- **Cena**: dos mesas iguales con mantel crema, plato con milanesa y puré, vaso, la ventana de la casa.
- Personajes: **Rubén** (módulo de siempre: pelado, bigote, camisa crema, delantal navy). Nuevos en el mismo estilo
  (sumar al ELENCO): **Néstor** (60, pelo canoso corto, lentes, camisa de trabajo gris con bolsillo y parche crema
  con su nombre) y **Daniel** (50, barba entrecana corta, camisa de trabajo navy claro con parche verde). Parecidos a
  propósito (mismo rubro, misma camisa de trabajo): los dos son buenos en lo suyo y se ven así.

## Escenas (11; cámara continua Catmull-Rom salvo donde se dice)

### 1 · 0,0-4,6 · "Diez de la noche. Dos casas de repuestos, las dos cerradas. Una vende igual."
- **Cuadro 0 = portada en movimiento:** general frontal de las dos fachadas llenando el ancho (cada una ~520 px),
  la medianera con el farol en x 540, cortinas bajas. Reloj 3D "22:00" arriba. Gancho HTML ya entero en el cuadro 0:
  chica "Diez de la noche. Las dos cerradas." (Lexend 800, ~90 px, crema) y grande "Una vende igual." (Lexend 900,
  ~140 px, "vende" en el recuadro verde). Sello mono chico: "MISMO RUBRO · MISMA CALLE · UNA SOLA DIFERENCIA".
- Push-in lento hacia la medianera. En "cerradas" las dos cortinas hacen un pequeño rebote (clack, lamas).
- En "vende": por la rejilla de la cortina de la DERECHA se prende un brillo verde (el celular adentro) y un tilde
  verde 3D hace pop arriba de la fachada derecha. La izquierda sigue gris. Los subtítulos karaoke arrancan después
  del gancho (~4,6 s).

### 2 · 4,8-8,0 · "A Rubén se le murió la batería, y mañana temprano reparte."
- Travelling de grúa: la cámara baja y se va por la avenida (las fachadas quedan atrás, siempre en cuadro) hasta la
  camioneta del reparto con el capó abierto, debajo de un farol. Rubén con linterna, inclinado sobre el motor (pose:
  una mano apoyada en el capó, la otra con la linterna; cara "fastidio").
- En "batería": primer plano, la batería llena media pantalla, testigo rojo apagado que titila; rótulo con línea guía
  "BATERÍA 12 V". SFX: clic-clic-clic de arranque fallido.
- En "temprano": órbita corta a la caja de la camioneta (cajones de bebidas) y rótulo "MAÑANA · REPARTO".

### 3 · 8,2-9,8 · "Les escribe a las dos."
- Contraplano por encima del hombro de Rubén: el celular sube y llena 2/3 de la pantalla; él tipea (pulgares IK,
  cara "concentrada" con la pantalla reflejada en la cara). Su burbuja crema: "Hola, ¿tienen batería para mi
  camioneta? La necesito mañana temprano."
- En "dos": la burbuja se duplica y las dos copias salen volando hacia atrás (izquierda y derecha); la cámara las
  sigue de vuelta a las fachadas (travelling rápido, whoosh). Nunca queda el cielo solo: las fachadas crecen en cuadro.

### 4 · 10,0-12,0 · "En lo de Néstor, queda para mañana."
- Las fachadas se levantan (corte de casa de muñecas) y se ven los dos interiores, lado a lado. La cámara se acerca
  al lado izquierdo (el derecho queda a 1/3 de cuadro, apagado a media luz: la comparación sigue a la vista).
- Mostrador de Néstor a oscuras, celular boca arriba cargando con su cable. En "Néstor" la burbuja de Rubén entra
  por la rejilla y "cae" en el celular: la pantalla se prende un segundo, "1 mensaje nuevo", y se apaga. Debajo, un
  tilde gris y "Sin leer". En "mañana", el reloj de pared del local (agujas) marca las 22:01. Todo gris.

### 5 · 12,2-16,2 · "En lo de Daniel contesta un agente de IA, y se la reserva."
- Travelling lateral atravesando la medianera hacia la derecha (la pared pasa por delante como cortinilla natural,
  sin pantalla lisa: el corte de la pared muestra ladrillo). Lado derecho en navy claro y verde.
- El celular de Daniel en un soporte sobre el mostrador se prende verde; push-in hasta que la pantalla llena el
  cuadro. En "agente de IA": rótulo arriba "AGENTE DE IA · ATENDIENDO". Burbujas que entran con pop, una cada ~0,8 s:
  "¡Hola, Rubén! Sí, tenemos para tu camioneta." → "Abrimos a las 8. ¿Te la reservo?" → (de Rubén) "Dale, a las
  8 estoy." → "Listo, quedó reservada a tu nombre. ¡Te esperamos!"
- En "reserva": pull-back rápido al estante: una batería se adelanta del estante (pop) y le cuelga una etiqueta
  verde "RESERVADA · RUBÉN · 8:00" (chime + tilde verde).

### 6 · 16,6-18,4 · RUBÉN: "¿Me contestaron a esta hora?"
- Corte (el único seco del reel, para el timing) a primer plano de Rubén al lado de la camioneta, la cara iluminada
  en verde por el celular. Pausa de 0,3 s antes de que hable: levanta las cejas ("sorpresa" → "esperanza"), mira el
  celular, mira a cámara. La boca sigue la envolvente de su voz. Subtítulo palabra por palabra, "hora" en verde.

### 7 · 18,8-21,8 · "Los dos dueños abrieron a las ocho. Ahora, cenan."
- Grúa hacia arriba desde la avenida: arriba de los dos locales, dos ventanas de casa iguales, divididas por la misma
  medianera (pantalla partida otra vez). Néstor (izq.) y Daniel (der.), cada uno en su mesa, misma milanesa con puré,
  misma pose cansada y contenta (cara "sonrisa", hombros caídos). Rótulos con línea guía "NÉSTOR" y "DANIEL". En
  "ocho", un "8:00" chico de reloj sobre cada uno; en "cenan", los dos levantan el tenedor a la vez (sincronía =
  "son iguales"). Ninguno mira el celular: los dos hacen lo que corresponde.

### 8 · 22,1-24,9 · "Una sola diferencia: uno dejó a alguien atendiendo."
- La cámara baja en zambullida desde la ventana de Daniel a su mostrador (sigue la línea vertical de la medianera),
  y queda la pantalla partida de los dos mostradores: izquierda gris con el celular apagado, derecha el celular
  prendido con el chat resuelto. En "diferencia", recuadro verde de selección alrededor del celular de Daniel. En
  "atendiendo", el celular de Daniel hace un pequeño "saludo" (se inclina en el soporte, como un empleado que
  levanta la vista) y el rótulo "AGENTE DE IA · ATENDIENDO" brilla. Push-in a la derecha.

### 9 · 25,2-28,6 · "A las ocho, Rubén ya tiene su batería." + remate en silencio (~1,2 s)
- Transición de noche a mañana sin corte: el reloj 3D gira "22:00" → "8:00" y el cielo pasa a crema liso.
  General de las dos fachadas de día (el mismo encuadre del cuadro 0: el que mira reconoce el lugar). La cortina de
  Daniel ya está arriba: Rubén sale de lo de Daniel con la batería bajo el brazo (la etiqueta verde
  "RESERVADA · RUBÉN" colgando), contento.
- Pausa: al lado, la cortina de Néstor sube (sonido de cortina metálica). Vibra el celular de Rubén; burbuja 3D grande
  de Néstor: "¡Buen día! ¿Qué necesitabas?" (8:02). Rubén y Néstor se miran por arriba de la medianera, Rubén levanta
  la batería y sonríe; Néstor, con el mate en la mano, se ríe y le hace un gesto de "la próxima". Nadie queda mal:
  Néstor contestó apenas abrió, con la mejor onda.
- (Opcional, remate del remate, si entra en el tiempo: burbuja de Rubén "¡Ya está, Néstor! Gracias igual.")

### 10 · 28,9-31,6 · "¿Querés ver cómo atendería tu local a las diez?"
- Callback: vuelve la noche (reloj "8:00" → "22:00" girando al revés) y la cámara viaja de nuevo a la fachada de
  Daniel con el brillo verde en la rejilla, como en el cuadro 0. En "tu local", el cartel "REPUESTOS DANIEL" gira
  sobre su eje y del otro lado dice "TU LOCAL" (pop verde). En "diez", el reloj 3D vuelve a marcar "22:00" y la
  rejilla se prende verde.

### 11 · 31,8-34,6 · "Agendá una videollamada gratis en scalerics.com."
- Arranca sobre "videollamada": tarjeta de cierre 2,5-3 s, fondo verde #5ce611 liso con líneas navy; "Videollamada
  gratis" (Lexend 900, navy, grande) y "scalerics.com" (Lexend 900, crema con borde navy o navy sobre verde, el más
  grande de la tarjeta), logo de Scalerics abajo. Detrás, en 3D, el celular del agente con el tilde verde de
  "reservada" a medio cuadro (el objeto del caso, callback).

## Rótulos y subtítulos
- Subtítulos arriba al centro, 1 a 3 palabras, ~86 px, la palabra clave en recuadro verde (cortes y acentos en
  reel.json): "vende", "batería", "temprano", "dos", "Néstor", "agente de IA", "reserva", "hora", "cenan",
  "diferencia", "atendiendo", "batería" (escena 9), "tu local", "videollamada".
- 1-2 rótulos por escena como máximo, mono verde (o crema en el lado gris), con línea guía de 6-8 px.
- Textos de interfaz de 36 px para arriba (burbujas, rótulos).

## Sonido (ver fuentes.md para lo que falta)
- Noche: ambiente de calle de noche bajo. Golpe grave en "vende" (impact-bass-1) con el tilde verde.
- Clic-clic-clic de arranque en "batería"; tipeo en la escena 3; whoosh en cada travelling; notification gris
  apagada en lo de Néstor (vibra una vez y nada); pop por cada burbuja del agente y chime en "reservada".
- Cubiertos bajitos en la cena. Mañana: calle.wav, cortina metálica, vibra + pop en la burbuja de Néstor. Cierre: whoosh + chime.
