# te-queda · plan plano por plano · PARA MANDAR completo (3D real), ~31,5 s

**De qué trata.** "¿Te queda polenta?" y Rubén baja al sótano a fijarse. Vuelve: "No, no queda." Walter (fideos) y
Marta (azúcar): cada viaje lo deja peor (polvo, telaraña, una caja de sombrero). Héctor pide dulce de leche: Rubén se
calza un casco de obra con linterna, hace la expedición más larga y vuelve destruido con el frasco en alto: **"Queda
uno."** Pausa de polvo cayendo. Héctor: **"Ah, no. Era para saber."** Remate del remate: "¿Y yerba?" y Rubén le calza
el casco a Héctor. Cartel **"Un sistema más tarde…"**. Parte 2: Rubén sentado arriba de la trampa cerrada, contesta
mirando la tablet; Héctor entra ya con el casco puesto; "Era para saber." / **"Ahora sabés."**; la tablet pide la
yerba sola; Héctor, desconfiado, baja él a contar y sube con la telaraña: **"Doce."**

- **Producto:** sistema de stock a medida: cada venta descuenta, sabés qué te queda sin ir a mirar, y cuando algo
  queda poco te avisa y arma el pedido al proveedor. Solo en la línea chica final y en descripcion.txt. El cartel
  nunca dice "Scalerics". Sin marcas: polenta, fideos, azúcar, dulce de leche y yerba genéricos (cajas kraft escritas
  con marcador, frasco de vidrio con tapa crema y etiqueta lisa), tablet sin logo, casco de obra sin logo.
- **Estructura** como anotamelo / hacen-envios: parte 1 (16,8 s, sin línea chica) + cartel (3,0 s) + parte 2
  (11,7 s, con la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`. Cartel: el de anotamelo, mismo
  texto **"Un sistema" / "más tarde…"**: se reusa su audio de Rasalgethi (o se regenera si no está en la rama).
- **Personajes** (copia local de `reels/anotamelo/assets/personajes.js`): Rubén (ELENCO.almacenero), Graciela
  (ELENCO.clienta), Walter (ELENCO.walter, con su mochila), Marta (ELENCO.duena, delantal verde), Héctor
  (ELENCO.hector, boina y chaleco mostaza, zapatos). Sin Nico ni Sofi.
- **Mecanismos nuevos para la línea:** el viaje es un movimiento de cámara (la zambullida a través del piso y el
  corte de casa de muñecas vertical, almacén arriba y sótano abajo: el formato 9:16 se llena con el edificio); la
  escalada está en el cuerpo de Rubén (polvo → telaraña → caja → casco); la pausa se mide en **polvo que cae en el haz
  de la linterna** (música baja, nunca cortada); el remate del remate es un **gesto mudo** (el casco que cambia de
  cabeza), no un número ni tuba. Nada de mano a la cabeza, frente en el mostrador, guiño con el mate ni "X, Graciela."

## Paleta y set (para "Hechos")
**Almacén a la hora de la siesta, pared navy3 `#1f3254` con azulejos crema `#efeee5` hasta media altura (pastina
navy), y sótano en penumbra navy claro `#16243d` con haz de linterna crema cálido y polvo en el aire.** Distinto de
anotamelo/el-audio/que-en-paz-descanse (pared crema de día), de lo-mismo/me-lo-guardas (pared navy claro con luz de
mañana) y de como-viene-el-mes/me-haces-precio (navy oscuro de noche con lámparas). Anotar en "Hechos": "almacén de
siesta con azulejos crema sobre navy3 + sótano en penumbra navy claro con haz de linterna, corte de casa de muñecas".
- Arriba: luz de siesta que entra baja y lateral por la vidriera (DirectionalLight crema-neutra, sombras largas en el
  piso de baldosas en damero navy/crema). Mostrador navy3 con tapa de madera clara (el de abren-hoy), estantes de
  madera clara con mercadería de colores planos (crear* del módulo), heladera vertical chica, puerta con campanita.
- Abajo (sótano): paredes de ladrillo navy claro `#16243d` con juntas navy2, **un solo foco pelado** colgado de un
  cable (luz crema cálida, cono marcado en el polvo), estantes de **ángulo ranurado** gris claro, cajas kraft
  `#c9a46b` (color plano, bordes marcados) escritas con marcador navy (Caveat 700 ≥ 44 px en primeros planos):
  POLENTA, FIDEOS, AZÚCAR, DULCE DE LECHE, YERBA. Fuera del cono, penumbra navy (no negro: que la compresión no meta
  bandas; fondo liso, sin degradés suaves).
- **Rojo apagado `#c7655b` SOLO para el problema**: el chip "Viajes al depósito" en la parte 1, "Yerba · quedan 2"
  antes del aviso. **Verde `#5ce611` para lo resuelto**: "Pedido al proveedor ✓", "Viajes al depósito: 0", la cinta
  que ata la linterna al casco (el único verde de la parte 1, a propósito: el objeto que pasa a la parte 2), el
  recuadro de selección de los subtítulos.
- Burbujas: crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla. En el
  sótano oscuro, crema sobre navy sin problema; arriba, contra los azulejos crema, el borde navy grueso las despega.
- Chip "Viajes al depósito: N": arriba a la izquierda, debajo de la zona de subtítulos (y ≈ 360), Lexend 800 44 px,
  píldora navy con borde rojo apagado; el número salta con pop en cada vuelta de Rubén.

## Objetos 3D nuevos (específicos, que nadie los confunda)
- **Trampa del sótano**: tapa de tablas de madera clara en el piso detrás del mostrador, con bisagras navy y **argolla
  de hierro** para levantarla; abierta queda vertical apoyada contra el mostrador. Debajo, **escalera empinada de
  madera** (tipo marinera, 8 peldaños) que baja al sótano. Es el portal de todo el reel.
- **Corte de casa de muñecas**: el mismo set visto en sección: piso del almacén como una losa gruesa navy3 cortada
  (borde crema de 10 px, como maqueta), arriba el mostrador y el cliente, abajo el sótano. La cámara se aleja hasta
  que el edificio llena el vertical (ancho ~90 %, alto ~75 % de la zona de dibujo).
- **Escalera tijera** de aluminio gris claro (peldaños con estrías), que en P6 se tambalea (rotación ±4° con semilla,
  función del tiempo).
- **Foco pelado** con portalámparas de baquelita navy y **cadenita** con bolita: se prende en P2, se quema en P5
  (chispa + apagado), se balancea en P8 (péndulo, chirrido). En la parte 2 está prendido y quieto.
- **Linterna de mano** (P5) y **casco de obra blanco** (P6 en adelante) con una linterna cilíndrica atada al costado
  con **cinta verde de marca** dando dos vueltas: el haz es un cono volumétrico crema translúcido (con borde marcado,
  no un brillo difuso) con partículas de polvo (con semilla) que flotan y caen.
- **Estado de Rubén** (variantes sobre ELENCO.almacenero, todas pegadas al cuerpo, nada flotando): polvo (manchas
  crema2 en hombros y pelada, opacas), **telaraña** (hilos crema de 4 mm, no de 1 px, en abanico desde la oreja
  derecha hasta el hombro; se descuelga en P8 como una cortina), **caja de sombrero** (caja kraft "AZÚCAR" calzada de
  costado sobre la cabeza, tapa abierta, sin atravesar las orejas), **casco** (torcido 15° al volver de P6).
- **Frasco de dulce de leche**: vidrio con tapa crema a cuadritos navy (de casero, sin marca), etiqueta crema lisa
  "DULCE DE LECHE" Lexend 800; Rubén lo levanta con el brazo estirado, el haz del casco le da justo encima (brillo
  especular). Que no se confunda con mermelada: el color marrón caramelo `#8a5a2b` opaco, no translúcido.
- **Tablet "Stock"** (parte 2): en un atril de madera sobre el mostrador, pantalla navy con filas grandes (≥ 40 px):
  "Polenta · 3", "Dulce de leche · 12", "Fideos · 24", "Azúcar · 9", "Yerba · 2" (rojo apagado); el aviso entra como
  tarjeta crema desde arriba: "Yerba · quedan 2" → "Pedido al proveedor ✓ · Llega el jueves" (verde).
- **Banquito** de madera sobre la trampa cerrada (parte 2): Rubén sentado literalmente arriba del depósito.

## Planos

### Parte 1 (16,8 s)
| # | t (s) | plano y cámara (Catmull-Rom continua) | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|---|
| P1 | 0,0-2,2 | General medio del mostrador, a la altura de los ojos; push-in lento hacia la trampa | Cuadro 0: Graciela con la bolsa, Rubén con el mate, gancho grande "¿Te queda polenta?" (Graciela 0,25-1,2). Rubén: "Ya me fijo." (1,3-2,0), deja el mate y tira de la argolla | mostrador, estantes, Graciela, Rubén, mate y termo, trampa con argolla | ambiente de almacén (heladera), campanita al inicio, crujido de bisagra al abrir |
| P2 | 2,2-4,2 | **Zambullida**: la cámara baja con Rubén, atraviesa el borde de la losa (sección crema, nunca negro) y entra al sótano; push-in a la caja | Rubén baja la escalera marinera, tira de la cadenita: el foco se prende (polvo en el cono), baja la caja POLENTA y la sacude: vacía | escalera marinera, foco y cadenita, estantes de ángulo ranurado, cajas kraft | whoosh de la zambullida, pasos en madera ×4, clic de la cadenita, zumbido del foco, sacudida de caja vacía (cartón hueco) |
| P3 | 4,2-5,6 | Grúa de vuelta arriba: contraplano bajo desde el piso, Rubén asoma por la trampa a cámara | Polvo en los hombros: "No, no queda." (4,4-5,3). Chip "Viajes al depósito: 1" | trampa, Rubén con polvo | whoosh corto de la grúa, palmada de polvo, pop del chip |
| P4 | 5,6-7,4 | **Corte de casa de muñecas**: dolly atrás hasta que el edificio en sección llena el vertical | Walter arriba: "¿Y fideos?" (5,7-6,3). Rubén baja, sube a la escalera tijera, avalancha de cajas; sube con la telaraña colgando: burbuja "No." Chip 2 | sección almacén/sótano, Walter con mochila, escalera tijera, cajas que caen, telaraña | pasos rápidos, avalancha de cartón (3-4 golpes), pop de la burbuja, pop del chip |
| P5 | 7,4-9,2 | Misma sección, la cámara baja un poco hacia el sótano (time-lapse) | Marta arriba: "¿Azúcar te queda?" (7,5-8,3). Abajo: el foco se quema (chispa), Rubén sigue con linterna de mano, una caja le cae en la cabeza y queda calzada; sube así: burbuja "No." Chip 3 | Marta con delantal, foco que se quema, linterna de mano, caja AZÚCAR de sombrero | chasquido eléctrico del foco, clic de linterna, golpe sordo de caja en la cabeza, pop, pop del chip |
| P6 | 9,2-11,4 | Primer plano de Rubén (se saca la caja, se calza el casco) y travelling vertical largo hacia abajo por la sección hasta lo más hondo del sótano | Héctor: "¿Te queda dulce de leche?" (9,3-10,3). Casco con linterna, baja; chip 4. Escalera tijera arriba de todo, se tambalea, el haz barre los estantes, saca la última caja del fondo; arriba Héctor silba mirando el techo | casco con linterna y cinta verde, haz con polvo, escalera tijera, caja DULCE DE LECHE, Héctor | clic de linterna, chirrido de la escalera que se tambalea, crash de cajas, un "¡uf!" grave de Rubén (de la toma, opcional), silbido corto de Héctor, pop del chip |
| P7 | 11,4-12,8 | Grúa que sube con Rubén por la trampa y push-in a contraluz: el haz del casco le pega al frasco | Rubén asoma destruido (polvo, telaraña, casco torcido) y levanta el frasco como trofeo: "Queda uno." (11,8-12,6) | Rubén en estado final, frasco de dulce de leche | whoosh de subida, "ta-dá" chiquito de vibráfono (CC0) en el frasco |
| P8 | 12,8-13,6 | Plano quieto de los dos (Héctor en primer término de perfil, Rubén al centro) | **Pausa**: el polvo cae en el haz, la telaraña se descuelga de la oreja de Rubén, el foco de abajo se balancea | partículas de polvo con semilla, telaraña que cae | música baja a -12 dB en 0,4 s (no se corta), chirrido del foco, heladera |
| P9 | 13,6-15,0 | Contraplano a Héctor (primer plano), corte limpio al frasco y a Rubén inmóvil | Héctor, sonriente y con buena onda: "Ah, no. Era para saber." (13,7-15,0); se toca la boina | Héctor | (solo la voz) |
| P10 | 15,0-16,8 | Plano general hacia la puerta; Rubén cruza en dos pasos; push-in a la cara de Héctor | Héctor en la puerta, se da vuelta: "¿Y yerba?" (15,1-15,7). Rubén se saca el casco, se lo calza a Héctor, le prende la linterna en la cara: Héctor parpadea | casco con linterna, puerta con campanita | campanita, pasos, clic de linterna (seco, último sonido antes del cartel) |

### Cartel (16,8-19,8 s)
"Un sistema" / "más tarde…", fondo verde de marca con manchas y burbujas, letras que rebotan, -4°. Entra girando el
último cuadro de la parte 1 (la cara de Héctor con la linterna); sale con iris al primer cuadro de la parte 2.
Narrador Rasalgethi. SFX: whoosh del giro, vibráfono CC0, whoosh del iris.

### Parte 2 (11,7 s: 19,8-31,5 s)
| # | t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|---|
| Q1 | 19,8-22,0 | **El mismo encuadre de P1** (callback), push-in lento a Rubén | La trampa cerrada, Rubén sentado en el banquito arriba de ella con el mate. Graciela: "¿Te queda polenta?" (20,0-20,9). Rubén mira la tablet sin levantarse: "Quedan tres." (21,1-21,8); inserto chico de la fila "Polenta · 3" | trampa cerrada, banquito, tablet en atril, Graciela | ambiente, campanita, tap en la tablet |
| Q2 | 22,0-24,4 | Contraplano a la puerta: entra Héctor; la cámara gira (órbita corta) hasta los dos en cuadro | Héctor entra **con el casco puesto y la linterna prendida**: "¿Y dulce de leche?" (22,4-23,3). Rubén, sin levantar la vista: "Doce." (23,5-24,0) | Héctor con casco, haz de linterna | campanita, clic de linterna, tap |
| Q3 | 24,4-26,2 | Primer plano de Héctor, contraplano de Rubén con el mate | Héctor: "Era para saber." (24,5-25,3). Rubén, tranquilo: "Ahora sabés." (25,5-26,1) y toma mate | Rubén, mate, Héctor | sorbo de mate |
| Q4 | 26,2-27,6 | Push-in a la tablet hasta que llena el ancho | Vibra sola: "Yerba · quedan 2" (rojo apagado) → tarjeta "Pedido al proveedor ✓ · Llega el jueves" (verde). Chip "Viajes al depósito: 0" en verde | tablet "Stock" | vibra.wav, notification, chime en el ✓ |
| Q5 | 27,6-30,0 | Grúa atrás a la sección de casa de muñecas (callback de P4) | Héctor entorna los ojos, desconfiado, le hace seña a Rubén de que se corra; Rubén levanta el banquito; Héctor abre la trampa y baja con la linterna; abajo, ordenado, cuenta frascos con el dedo; se le cae una caja; chip "Viajes de Héctor: 1". Sube con la telaraña en la boina, pulgar arriba: "Doce." (29,2-29,8) | sección, sótano ordenado con el foco prendido, frascos, Héctor con casco | crujido de bisagra, pasos en madera, un golpe de caja, pop del chip, pop de burbuja |
| Q6 | 30,0-31,5 | Push-in a Rubén levantando el mate a cámara (no guiño) | Línea chica: "Un sistema te dice qué te queda / y te avisa antes de que se acabe" / "scalerics.com" | Rubén, mate | acorde final de la cama, chime suave |

## Voces (Gemini TTS, una toma por archivo en partes/, recortar con silenceremove)
Rubén = **Algenib**, Graciela = **Gacrux**, Walter = **Umbriel**, Marta = **Aoede**, Héctor = **Sadaltager**,
narrador del cartel = **Rasalgethi** (reusar la toma de anotamelo "Un sistema más tarde."). Nunca Orus.

| archivo | quién | texto | tono |
|---|---|---|---|
| 01 | Graciela | ¿Te queda polenta? | Señora de barrio, liviana y de costumbre, como quien pregunta la hora. ~0,9 s. **Se reusa en Q1.** |
| 02 | Rubén | Ya me fijo. | Grave, cansado, servicial; ya levantándose. ~0,7 s |
| 03 | Rubén | No, no queda. | El mismo, sacudiéndose el polvo, sin drama. ~0,9 s |
| 04 | Walter | ¿Y fideos? | Apurado, mochila al hombro, al pasar. ~0,6 s |
| 05 | Marta | ¿Azúcar te queda? | De colega a colega, simpática, con el delantal puesto. ~0,8 s |
| 06 | Héctor | ¿Te queda dulce de leche? | Jubilado canchero, curioso, con buena onda. ~1,0 s |
| 07 | Rubén | Queda uno. | Destruido pero orgulloso, levantando el trofeo; un poco de aire, sin gritar. ~0,8 s. Es la previa del remate |
| 08 | Héctor | Ah, no. Era para saber. | Encantado, sin ninguna maldad, como quien agradece la información. "Era para saber" liviano. ~1,3 s. **El remate** |
| 09 | Héctor | ¿Y yerba? | Ya en la puerta, dándose vuelta, inocente. ~0,6 s |
| 10 | Narrador | Un sistema más tarde. | Reusar la toma de anotamelo |
| 11 | Rubén | Quedan tres. | Tranquilo, mirando la tablet, sin levantar la vista. ~0,7 s |
| 12 | Héctor | ¿Y dulce de leche? | Con el casco puesto, entusiasmado, listo para la aventura. ~0,9 s |
| 13 | Rubén | Doce. | Seco y tranquilo. ~0,4 s |
| 14 | Héctor | Era para saber. | La misma frase, un poco decepcionado de no ir al sótano. ~0,8 s |
| 15 | Rubén | Ahora sabés. | Media sonrisa, sin desafío, con el mate. ~0,7 s |
| 16 | Héctor | Doce. | Asomando de la trampa, admirado, confirmando. ~0,5 s |

Burbujas sin voz: los dos "No." de P4 y P5. Sin decir: el chip, las cajas, la tablet, la línea chica.
Mezcla: voz ≥ 6 LU sobre cama + SFX, techo por SFX -31 LUFS, final -14 LUFS, pico -1,5 dBFS.

## Riesgos a mirar en la revisión de arte
- La zambullida (P2) y la sección (P4-P6, Q5): el corte del piso tiene que verse como maqueta (borde crema), nunca un
  agujero negro; Rubén no atraviesa la losa al bajar (pasa por el hueco de la trampa).
- La caja en la cabeza y el casco: sin atravesar orejas ni pelada; el casco torcido sigue apoyado.
- La telaraña: gruesa y crema, que se lea en el celular; al descolgarse cae, no desaparece.
- El haz de la linterna: cono con borde marcado y polvo opaco, sin brillos difusos (compresión de Instagram).
- Continuidad: el casco pasa de Rubén (P6-P10) a Héctor (P10, Q2-Q5); el frasco queda en el mostrador; el chip no
  aparece en Q1-Q3 (vuelve en verde en Q4).
- Héctor no usa el celular en la parte 2 (ya fue tres veces seguidas).
