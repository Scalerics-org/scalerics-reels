# hacen-envios · plan plano por plano · PARA MANDAR completo (3D real), ~30,0 s

**De qué trata.** Héctor, el vecino de ENFRENTE, le escribe a Rubén "¿Hacen envíos?". Rubén cruza la calle (14 pasos)
con la yerba, y otra vez con el pan, y otra con el hielo, y otra con el cambio. Al quinto mensaje se para en el medio
de la calle, silencio de domingo, da vuelta un cajón, se sienta con el termo, apoya un cartón "SUCURSAL":
**"Abrimos sucursal."** Remate del remate: grúa atrás y se prenden todas las ventanas de la cuadra, cada una con un
celular: "¿Hacen envíos?" ×7, y el farol se prende sobre Rubén. Cartel **"Una tienda online más tarde…"**. Parte 2:
Héctor arma el pedido, ve "Envío: $ 60" / "Retiro en el local: $ 0", toca Retiro, paga, cruza él en pantuflas: "¡Qué
cerquita que quedás, Rubén!"; los pedidos de lejos salen con Nico en la moto, "Cruces de Rubén: 0", y la cuadra
entera cruza en pantuflas con sus pedidos pagos.

- **Producto:** tienda online (pedido y pago desde el celular; envío con costo o retiro en el local). Solo en la
  línea chica final y en descripcion.txt. El cartel nunca dice "Scalerics". Sin marcas: tienda genérica "Almacén de
  Rubén" en navy/crema/verde, botón "Pagar" sin logo de ningún medio de pago, moto y caja de reparto sin marca.
- **Estructura** como `reels/las-siete-y-cincuenta-y-nueve` y `reels/me-lo-guardas`: parte 1 (14,6 s, sin línea
  chica) + cartel (3,2 s) + parte 2 (12,2 s, con la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs
  unir`. Cartel: el de `reels/las-siete-y-cincuenta-y-nueve` tal cual ("Una tienda" / "online" / "más tarde…"), con su
  audio `assets/voice/narrador.wav`.
- **Personajes** (copia local de `reels/me-haces-precio/assets/personajes.js`, que ya tiene Héctor y Walter):
  **Rubén** (ELENCO.almacenero, voz Algenib), **Héctor** (ELENCO.hector + **pantuflas**: variante nueva de `zapatos`,
  más bajas y redondeadas, felpa mostaza `#d9a441` como el chaleco, con borde crema; boina puesta igual: es su
  marca), **Nico** (ELENCO.empleado, solo en la moto, con casco navy y visera crema), y en las ventanas Graciela,
  Marta (ELENCO.duena), Walter y 4 vecinos genéricos (pueden ser siluetas a contraluz de la ventana con la cara
  iluminada por el celular).
- **Remate:** mecanismo nuevo para la línea: silencio de barrio (sin música cortada: la música baja a -12 dB con un
  fundido de 0,4 s cuando Rubén se para, no se corta seca) + objeto inesperado (cajón + cartón "SUCURSAL") + plano
  general que revela la escala. Nada de frente al mostrador, mano a la cabeza, tuba, "X, Graciela." ni guiño con el
  mate.

## Paleta y set (distinto de las últimas noches)
- **Exterior, domingo a la hora azul (19:10 → 19:41).** Cielo **navy claro `#16243d` plano** (nada de degradés
  suaves: compresión de Instagram), que baja un escalón a `#13203a` en el cuarto cruce. Recientes: interiores con
  pared navy claro (lo-mismo, me-lo-guardas), crema (el-audio), navy oscuro (me-haces-precio) y vereda de noche navy
  oscuro (las-siete). Este es el primero **en la calle, de hora azul, con fachadas crema**. Anotar en "Hechos":
  "calle de barrio a la hora azul, cielo navy claro #16243d, fachadas crema".
- **Calle de adoquines** navy3 `#1f3254` con juntas navy `#0b1220` (relieve real, no textura fina), **línea del medio
  discontinua crema** gruesa (es protagonista del remate), cordones crema2 `#d9d7c9`, veredas de baldosa crema2.
- **Almacén de Rubén** (lado de abajo del cuadro en los picados): fachada crema `#efeee5`, toldo **verde de marca**
  con borde navy y "ALMACÉN" crema en Lexend 800 (TextGeometry), vidriera con luz cálida `#e9a65a` adentro, puerta
  con marco navy y cartel "ABIERTO".
- **Casa de Héctor** enfrente: fachada crema con zócalo navy, **ventana-puerta de planta baja** con reja baja negra
  hasta la rodilla (se le ven las pantuflas), postigos navy3 abiertos, luz cálida adentro, una maceta con malvón
  rojo apagado.
- **La cuadra** (P6, Q4): 4 casas por vereda, bajas y de un piso alto, crema y crema2, cada una con 1-2 ventanas
  (emisivo apagado navy → cálido al prenderse, de golpe, con un parpadeo de 2 cuadros). **Farol** de columna navy
  con brazo curvo y luminaria; al prenderse, cono de luz cálida en el piso (decal plano, no volumétrico con niebla).
- Rojo apagado `#c7655b` SOLO para el problema: el número de "Cruces" en la parte 1 y el "Envío: $ 60" no elegido.
  Verde `#5ce611` para lo resuelto: "Retiro en el local: $ 0" al tocarlo, "Pagado ✓", "Envío pago ✓", "Cruces de
  Rubén: 0", el recuadro de selección de los subtítulos.
- Burbujas: las del chat del celular (crema el cliente, navy claro con letra crema las respuestas) y las de
  diálogo de las ventanas: crema con borde navy de 8 px y sombra dura, Lexend 800 navy, ≥ 44 px, cola hacia la
  ventana.

## Objetos 3D nuevos (específicos, que nadie los confunda)
crearPantuflas (felpa mostaza, borde crema, suela navy) · crearCajonVerdulería (tablas de madera clara separadas,
esquineros oscuros, se da vuelta y se usa de banco) · crearCartonSucursal (cartón marrón `#c49a63` con bordes
rotos, **"SUCURSAL"** a mano en Caveat 700 navy, grande: se lee en 40+ px) · crearBolsaHielo (bolsa transparente
blanca con cubitos, nudo arriba) · crearBillete (de me-haces-precio, "1000" en crema/navy, sin diseño real) ·
crearFosforos (cajita crema con raspador rojo apagado, sin marca) · crearMoto (moto chica navy con caja de reparto
crema y franja verde, sin marca) · crearFarol · casas low-poly de la cuadra con ventanas emisivas · calle de adoquines
con línea del medio. Reusados: crearYerba, crearPanFlauta, crearTermo, crearMate, crearCelular, crearBolsaPapel.

## PARTE 1 · el problema (0,00-14,60 s)
Chip de hora abajo a la derecha (como abren-hoy): `DOMINGO · 19:10` (0,0) → `19:26` (6,3) → `19:41` (8,1), con flip y
tic. Contador **"Cruces: N"** 3D pegado a cámara, arriba a la derecha (debajo de la zona de subtítulos), número en
rojo apagado con pop en cada cambio.

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 0,00-2,30 | **P1 · cuadro 0.** Adentro del almacén, plano medio de Rubén detrás del mostrador, mate en la mano. En primer término, abajo a la izquierda, **el celular de Rubén** apoyado, nítido, ~50 % del ancho: chat **"Héctor · enfrente"** con la burbuja **"¿Hacen envíos?"** ya puesta. Atrás, por la vidriera, a la izquierda de Rubén: la casa de enfrente con la ventana iluminada y **Héctor saludando con el celular** (se reconoce: boina y chaleco mostaza). Push-in lento. | **Cuadro 0:** arriba al centro, el gancho entero en Lexend 900 ~130 px: **"¿Hacen envíos?"** con "envíos" en el recuadro verde; ya están el celular, Rubén y Héctor en la vidriera. 0,25 · voz de Héctor "¿Hacen envíos?" (el gancho se apaga y arrancan los subtítulos). 1,20 · Rubén levanta los ojos del celular hacia la vidriera. 1,60 · la cámara arranca hacia la vidriera. | vibra 0,00 · notification 0,05 · ambiente de calle de domingo (calle.wav bajo) todo el reel · música liviana de barrio (guitarra/ukelele, la de los ejemplos) desde 0,0 |
| 2,30-3,70 | **P2 · la cámara cruza la calle** (Catmull-Rom continua, sin corte): atraviesa la vidriera (sin pasar por el vidrio vacío: el marco y las letras del toldo pasan en primer término), baja a la altura de la vereda y viaja sobre la calle hasta **Héctor en su ventana**, que termina llenando 60-70 % del alto, de cuerpo entero con la reja baja y **las pantuflas a la vista**. | Héctor saluda con la mano (saludo()) y la sonrisa de costado, el celular en la otra mano. 2,90 · rótulo con línea guía hacia Héctor: **"Héctor · enfrente"**. 3,15 · línea punteada verde sobre el piso de la calle de puerta a puerta y rótulo **"14 pasos"** (Lexend 800 48 px). | whoosh 2,30 · pop 2,90 · pop 3,15 |
| 3,70-5,60 | **P3 · el picado de la calle** (plano base de toda la escalada): cámara alta sobre la vereda del almacén mirando hacia enfrente: abajo del cuadro la puerta del almacén y el toldo verde, arriba la ventana de Héctor; la calle con la línea del medio cruza el centro. Llena el cuadro de borde a borde: nunca cielo liso. | 3,75 · Rubén sale por la puerta con **la yerba** y cruza (14 pasos en 1,0 s, andar de almacenero). 4,80 · se la pasa por la reja; Héctor la levanta contento; burbuja **"¡Gracias, Rubén!"**. 5,05 · **"Cruces: 1"**. Rubén vuelve. | pasos (CC0) 3,75-4,75 · pop 4,85 · tic 5,05 |
| 5,60-8,30 | **P4 · mismo picado, montaje acelerado** (la cámara sube 10 % por cruce para que se vea la calle entera; los cruces cada vez más rápidos, sin cortes: time-lapse del personaje). | 5,60 · vibra y burbuja de chat pegada a cámara: **"¿Tenés pan?"** · Rubén cruza con el pan flauta · 6,30 **"Cruces: 2"**, chip `19:26`. 6,65 · Rubén a mitad de la vuelta, vibra: **"¿Y hielo?"** · gira en el lugar (media vuelta seca) y vuelve con la **bolsa de hielo** · 7,30 **"Cruces: 3"**. 7,55 · **"¿Me cambiás mil?"** · cruza con billetes · 8,10 **"Cruces: 4"**, chip `19:41`, el cielo baja un escalón. Las burbujas del chat entran y salen (máximo 2 en pantalla). | vibra 5,60 / 6,65 / 7,55 · pasos acelerados · whoosh-short en la media vuelta 6,75 · tic 6,30 / 7,30 / 8,10 |
| 8,30-12,10 | **P5 · la pausa y el remate.** 8,30-8,70 picado: Rubén sale con un **cajón de verdulería** (fósforos, otra yerba). 8,55 vibra: **"¿Fósforos tenés?"**. 8,70 corte a **plano a ras de calle, sobre la línea del medio**, Rubén de frente de cuerpo entero llenando 60 % del alto, las dos fachadas a los lados en perspectiva. 9,30-9,70 **contraplano** corto: Héctor en su ventana, saluda feliz. 9,70 vuelve el plano de Rubén. 10,70 push-in rápido a plano medio. | 8,70 · Rubén se para justo sobre la línea discontinua. **Silencio de domingo 8,70-10,70** (la música baja a -12 dB en 0,4 s, no se corta): mira al almacén (9,00), mira a Héctor (contraplano 9,30), vuelve a mirar al frente, cara de nada (CARA.resignado, párpados a media asta; los ojos abiertos). 9,85 · da vuelta el cajón y lo apoya en la línea. 10,10 · se sienta. 10,30 · saca el termo del cajón y lo apoya al lado. 10,50 · apoya contra el cajón el cartón **"SUCURSAL"** (se lee entero, grande). **10,80 · voz (Algenib): "Abrimos sucursal."** (~1,3 s; subtítulo con **"sucursal."** en el recuadro verde). | pájaro 8,80 · perro lejos, un ladrido 9,50 · zumbido del farol 8,70-12,10 · golpe de madera 9,85 · crujido del cajón 10,10 · termo apoyado 10,30 · papel/cartón 10,50 · voz 10,80 |
| 12,10-14,60 | **P6 · remate del remate: plano general que revela la escala.** Grúa continua atrás y arriba desde el plano medio: Rubén en su sucursal en el tercio inferior (siempre grande: ~25 % del alto, nunca chiquito al medio), la cuadra entera arriba, las dos veredas llenando el ancho. | 12,25 · se prende la primera ventana: **Graciela** con el celular, burbuja **"¿Hacen envíos?"**. 12,45 · **Marta** (arriba de la cafetería, con delantal). 12,60 · **Walter** (primer piso). 12,75 / 12,90 / 13,00 / 13,10 · cuatro ventanas más, con vecinos y la luz del celular en la cara; las burbujas se apilan, cada una con su cola a su ventana (7 en total, sin tapar a Rubén ni salir del 90 % seguro). El celular de Rubén vibra cada vez más seguido sobre el cajón. 13,60 · Rubén gira la cabeza despacio, de izquierda a derecha, mirando todas las ventanas. **14,10 · el farol de arriba se prende de golpe** y lo deja en un cono de luz, como un foco de escenario. | coro de voces 12,25-13,40 (ver partes/voces.md) · pop por ventana · interruptor/clac de luz por ventana · vibra en ráfaga · 14,10 clac del farol + zumbido · un ladrido final 14,40 |

Último cuadro (14,60) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL · "Una tienda online más tarde…" (14,60-17,80 s)
El de `reels/las-siete-y-cincuenta-y-nueve` tal cual (mismo texto: "Una tienda" / "online" / "más tarde…"). Fondo
verde de marca con manchas y burbujas, Lexend 900 crema con borde navy que rebotan, -4°. Entra girando el último
cuadro de la parte 1, sale con iris al primer cuadro de la parte 2. Voz Rasalgethi reusada
(`reels/las-siete-y-cincuenta-y-nueve/assets/voice/narrador.wav`), stinger y whooshes del ejemplar. Nunca dice
"Scalerics".

## PARTE 2 · resuelto (17,80-30,00 s)
Chip: `OTRO DOMINGO · 19:10`. Sin contador rojo hasta 24,6.

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 17,80-20,40 | **Q1 · callback de P2 dado vuelta:** plano por encima del hombro de Héctor en su ventana; en primer término **su celular** (~60 % del ancho, pantalla canvas): tienda "Almacén de Rubén". Al fondo, enfrente, el almacén con el toldo verde y la vidriera prendida. | Carrito: **Yerba ✓ · Pan ✓ · Hielo ✓ · Fósforos ✓** (se tildan en verde de a uno, 17,85-18,30). Abajo, dos opciones grandes: **"Envío: $ 60"** y **"Retiro en el local: $ 0"**. 18,50 · el pulgar de Héctor baja sobre "Envío". 18,90 · se frena, levanta la vista y mira para enfrente (la cámara hace foco en el almacén: Rubén saluda desde la puerta). 19,40 · toca **"Retiro"** (se pinta de verde, "Envío" queda en gris). 19,80 · sello **"Pagado ✓"**. | pop por tilde · click-soft 19,40 · sello 19,80 |
| 20,40-23,60 | **Q2 · callback del picado P3:** el mismo encuadre de la escalada, al revés: ahora el que cruza es Héctor. 21,70 corte al **contraplano en la puerta del almacén** (plano medio de los dos). | 20,45 · Héctor sale por su puerta **en pantuflas**, con el celular en alto, y cruza los 14 pasos con pasitos cortos; pasa justo por la línea del medio donde estaba la sucursal (la línea queda limpia). 21,40 · Rubén lo espera en la puerta con la bolsa de papel con etiqueta **"Héctor · pagado ✓"**. 21,70 · se la da. **21,90 · voz de Héctor: "¡Qué cerquita que quedás, Rubén!"** (~1,6 s), sorprendido de verdad, mirando para atrás a su casa (subtítulo con **"cerquita"** en el recuadro verde). Rubén, cara de nada, asiente una vez (sin guiño). | pantuflas arrastradas (CC0) 20,45-21,40 · papel de bolsa 21,70 · voz 21,90 |
| 23,60-25,80 | **Q3 · la moto.** Plano a ras de calle desde la esquina del almacén: **Nico en la moto** con la caja de reparto sale de cuadro a cuadro en primer término (grande: la moto ocupa 60 % del ancho al pasar), con Héctor y Rubén en la puerta detrás. | 23,70 · arranca la moto. Pegados a cámara, dos avisos que entran apilados: **"Envío pago ✓ · a 15 cuadras"** y **"Envío pago ✓ · a 22 cuadras"**. 24,60 · el contador vuelve: **"Cruces: 4"** en rojo se tacha y pasa a **"Cruces de Rubén: 0"** en verde. Héctor cruza de vuelta a su casa con la bolsa, saludando a Nico. | motor de moto (CC0) 23,70-25,0 con paso en primer término · pop por aviso · tic 24,60 |
| 25,80-28,50 | **Q4 · callback de P6:** la misma grúa del remate del remate, plano general de la cuadra con el almacén abajo. | 25,90-26,50 · se prenden las mismas ventanas, ahora cada una con un chip verde **"Pagado ✓"** (no burbujas). 26,60 · los vecinos salen de sus casas **en pantuflas** (Graciela, Marta, Walter y dos más) y cruzan en fila, celular en mano, hacia el almacén; Rubén detrás del mostrador por la vidriera, tranquilo, con el termo. 27,60 · **el farol se prende** sobre la fila que cruza (callback del foco). | interruptores · pantuflas en coro · clac del farol 27,60 · la música sube y cierra |
| 28,50-30,00 | **Q5 · dolly atrás suave** del mismo general. | 28,55 · **línea chica** abajo (caja navy con borde verde, como s03-cierre de abren-hoy, Lexend 600 ≥ 36 px): **"Una tienda online cobra el pedido y el envío por vos"** / **"scalerics.com"** en verde (1,45 s, hasta el final). Sin tarjeta de videollamada. | campanita de la puerta baja · final de la música |

## Revisión pedida para este reel (además de 8c)
- La calle y la cuadra siempre llenando el cuadro: nada de cielo liso ocupando más de 25 % de un plano.
- El cartón "SUCURSAL", "14 pasos", "Cruces" y "Envío: $ 60" / "Retiro en el local: $ 0" se leen en el celular.
- Las 7 burbujas del remate del remate: ninguna pisa una cara ni a Rubén, todas dentro del 90 % seguro.
- Las pantuflas se ven en P2, Q2 y Q4 (son la mitad del chiste).
- Continuidad: lo que Rubén lleva en cada cruce coincide con el mensaje; el cajón aparece en P5 y no antes.
- **SFX que no están en assets/sfx** (pasos, pantuflas arrastradas, moto, pájaro, perro, clac de interruptor/farol,
  golpe de madera): reales con licencia CC0, con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados.

## Portada (sugerencia)
`t` ≈ 11,5 (Rubén sentado en el cajón en la línea del medio, termo y cartón SUCURSAL) o ≈ 14,4 (cuadra con ventanas
prendidas y el farol). `chica`: "Vive enfrente." · `grande`: "¿Hacen envíos?" · `sello`: "Sucursal Rubén". Acento
`#5ce611`. Renderizar el fondo sin gancho, subtítulos ni burbujas.
