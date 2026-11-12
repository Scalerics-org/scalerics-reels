# como-viene-el-mes · PARA MANDAR completo (3D real), ~31,8 s (guion; tiempos estimados hasta tener las voces)

**De qué trata.** Almacén de Rubén cerrado, de noche, la lámpara verde prendida. Marta, la de la cafetería de al lado,
pasa agachada bajo la persiana con un cortado: **"¿Y, cómo viene el mes?"**. Rubén: **"Pará que te digo."** La caja de
zapatos "TICKETS" (los tickets saltan como resorte), el pinche de boletas, la calculadora con rollo. Time-lapse: la
cinta se apila en una montaña que lo tapa hasta el pecho, la torre de pocillos de Marta crece 1 → 2 → 4 → 7 y ella
termina sentada en un cajón; por debajo de la persiana entra la luz de la mañana y la bolsa del pan. Rubén arranca la
cinta, la lee hasta el piso, levanta la vista y, con la mano "más o menos": **"Ahí."** Remate del remate: **"¿Y
comparado con el mes pasado?"** → otra caja más gorda, **"MES PASADO"**, la "C" a 0, y Marta agarra la torre: **"Pongo
otro café."** Cartel **"Un sistema más tarde…"**. Parte 2: la misma pregunta; vibra el celular con el resumen que llegó
solo; Rubén, mate en mano: **"Ocho por ciento arriba del mes pasado. Lo que más salió fue la yerba."** (tilde verde en
la yerba). Marta, que vino con la torre de siete pocillos y el cajón para la noche larga, no sabe qué hacer; Rubén:
**"¿Y a vos?"**; Marta: **"Pará que te digo."** y saca su propia caja "CAFETERÍA"; Rubén se sienta en el cajón con el
mate y un pocillo. Línea chica.

- **Producto:** automatización de reportes: el resumen de ventas del día y del mes le llega solo al celular (hoy, mes,
  contra el mes pasado, lo que más salió). Solo en la línea chica ("Un sistema te manda al celular cómo viene el mes ·
  scalerics.com") y en descripcion.txt. El cartel no dice "Scalerics". Sin marcas.
- Sin Orus, sin tarjeta de videollamada (línea Para mandar, punto 8d).
- **Recurso visual central:** la **calculadora con rollo** y **la montaña de cinta** (el esfuerzo), **la torre de
  pocillos** de Marta (el reloj), la **bolsa del pan** bajo la persiana (la mañana). Remate de palabra mínima ("Ahí.")
  con gesto; remate del remate de imagen (la caja "MES PASADO").
- Plan detallado con segundos, cámara, voces y SFX por plano: `plan.md`. Versiones del chiste: `ganchos.md`.
- Proyecto como `reels/anotamelo`: todo con `node gen.mjs` (tiempos3d.js, compositions/*.html, index.html,
  assets/audio/mezcla.wav), parte 1 + cartel + parte 2 unidos con `armar.mjs unir`; `LIMPIO=1 SINAUDIO=1 node gen.mjs`
  para el fondo de la portada. Cartel y voz del narrador reusados de anotamelo.

## Del SPEC-base (copiado en esta carpeta como `SPEC-base.md`)
Vale: Lexend + IBM Plex Mono, paleta de marca (crema `#efeee5`, verde `#5ce611`, navy), nada de emojis ni fotos ni
rayas largas, GSAP local, escenas deterministas, `.sfx.json` por escena, subtítulos con la palabra clave en el recuadro
verde. **No vale** (lo reemplaza 8b/8c y este SPEC): el dibujo de líneas SVG como recurso principal, la zona y
580-1330 para el dibujo (acá el 3D llena el cuadro; solo los subtítulos van arriba y la línea chica abajo/arriba sin
tapar caras), la etiqueta mono debajo del dibujo y el logo abajo. Las capas HTML quedan para: gancho del cuadro 0,
subtítulos, burbujas, la línea chica y el cartel.

## Paleta y set (para "Hechos")
Almacén cerrado de noche: **pared navy claro `#16243d` plana**, **persiana metálica crema `#efeee5` con nervaduras
navy** a media altura (la calle navy oscuro `#0b1220` por debajo; a la mañana, franja crema cálido `#f4ecd2`),
**lámpara de banquero con pantalla verde de marca** sobre el mostrador navy3 `#1f3254` con tapa de madera clara,
charco de luz de borde duro. Estantes de madera con mercadería de colores planos (la yerba a la vista). Rojo apagado
`#c7655b` solo para el problema (etiqueta y piolín de "MES PASADO", tecla C). Verde para lo resuelto (tarjeta del
resumen, tilde de la yerba) y el recuadro de subtítulos. LCD de la calculadora gris verdoso con dígitos navy. Burbujas
crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px. Todo plano: nada de penumbra, niebla ni brillo
(compresión de Instagram).

## Personajes (copia local de `reels/anotamelo/assets/personajes.js`)
Rubén (ELENCO.almacenero, Algenib) · Marta (ELENCO.duena, Aoede, rodete, delantal verde, aros verdes). La mano del
panadero (solo antebrazo, manga navy2). Agregados al módulo local: `crearCalculadoraRollo()` (setPantalla, imprime,
arranca), `crearCinta()` (montaña por nivel 0-1 con semilla), `crearCajaZapatos({etiqueta, gorda, piolin})` (abre con
tickets que saltan), `crearPincheBoletas(n)`, `crearPocillo()` y `crearTorrePocillos(n)`, `crearLamparaBanquero()`,
`crearPersiana(alto)`, `crearCajon()`, bolsa de pan (crearBolsaPapel + crearPanFlauta). Poses nuevas: `BRAZOS.teclea`,
`BRAZOS.leeCinta`, `BRAZOS.masOMenos`, `AGACHA_CAJA` (Rubén baja entero detrás del mostrador); Marta `AGACHADA`,
`SENTADA`, `INCLINADA`, `LLEVA_TORRE`. Nada de FACEPALM, mano a la oreja ni guiño.

## Brief por escena

**P1 · cuadro 0 (0,00-2,30).** Plano general desde adentro, a la altura del pecho, en diagonal: persiana a media
altura a la izquierda con Marta pasando agachada (pocillo humeante en la mano), mostrador a la derecha con la lámpara
verde prendida y Rubén detrás; en primer término, grandes, la caja de zapatos "TICKETS" y el pinche lleno (~45 % del
ancho entre los dos). Gancho Lexend 900 ~130 px arriba al centro desde el cuadro 0: "¿Y, cómo viene el **mes?**"
(recuadro verde en "mes?"). 0,25 voz de Marta; el gancho se apaga y entran los subtítulos. 0,60-1,20 Marta se endereza
y apoya el pocillo (pocillo 1). 1,70 Rubén mira la caja. Push-in lento.

**P2 · "Pará que te digo." (2,30-3,90).** Plano medio de Rubén de frente, la caja y el pinche abajo. 2,40 "Pará que te
digo." (gesto de arremangarse, manos abajo). 3,40 abre la caja: los tickets saltan como resorte y caen sobre el
mostrador. 3,65 arrastra la calculadora con rollo al centro (pop, ~45 % del ancho).

**P3 · la noche (3,90-9,10).** Grúa y órbita continua (~70°) a un plano general alto desde el lado del cliente. Rubén
teclea a velocidad de dibujito; la cinta impresa se riza, cae por el frente del mostrador y se apila en una montaña
(piso → borde del mostrador 7,0 → pecho de Rubén 9,0), siempre DELANTE del mostrador. El pinche pierde boletas de a una
hasta quedar pelado; la caja se vacía. Marta va y vuelve bajo la persiana con cortados: torre 2 (4,60) → 4 (6,00) → 7
(7,60), se balancea y no se cae. Marta parada → apoyada (5,3) → sentada en el cajón de refrescos (6,8). Máximo una
burbuja en pantalla (no hacen falta: es mudo).

**P4 · la mañana (9,10-10,30).** Plano bajo junto a la persiana: la franja de abajo pasa de navy a crema cálido y la
mano del panadero empuja la bolsa con tres flautas (9,30-9,70), que queda apoyada en el piso. 9,80 inserto cenital de
la calculadora (65 % del cuadro): TOTAL (9,90), imprime la última línea, 10,05 Rubén arranca la cinta en el filo
dentado.

**P5 · pausa y remate (10,30-13,40).** Plano medio de Rubén de frente por arriba de la montaña (le llega al pecho desde
cámara), la lámpara verde arriba a la izquierda, la cinta arrancada en las manos colgando hasta la montaña. 10,30-11,30
la lee de arriba abajo ("1.250 +", "380 +"… ≥ 36 px). 11,40 contraplano: Marta sentada se inclina, el pocillo a medio
camino, ojos grandes. 12,10 vuelta a Rubén, push-in lento; 12,10-12,80 quietud (música a -12 dB en 0,4 s, NO cortada;
solo la heladera); Rubén levanta la vista, CARA.neutra, ojos abiertos. 12,80 "Ahí." + BRAZOS.masOMenos (palma abajo a la
altura del pecho, al costado, se balancea dos veces). Subtítulo "Ahí." en el recuadro verde y burbuja grande.

**P6 · remate del remate (13,40-17,40).** Plano general medio de costado (Marta en el cajón a la izquierda, Rubén a la
derecha, la montaña abajo, la torre en el mostrador). 13,50 Marta: "¿Y comparado con el mes pasado?". 15,10 Rubén baja
entero detrás del mostrador; 15,30 sube y apoya de golpe la caja "MES PASADO" (gorda, tapa que no cierra, piolín rojo
apagado, polvillo; la torre se sacude) · inserto a la altura de la tapa 15,20. 15,70 aprieta C: "0.". 16,10 Marta se
levanta, agarra la torre con las dos manos: 16,20 "Pongo otro café." y sale agachada bajo la persiana. 17,40 Rubén ya
teclea de nuevo, el cajón vacío. Último cuadro → `assets/img/fin-parte1.png`.

**CARTEL (17,40-20,40).** El de anotamelo: "Un sistema" / "más tarde…", voz Rasalgethi reusada.

**Q1 · callback (20,40-22,60).** El encuadre de P1 con el mostrador limpio: celular en un atrilito donde estaba la
caja, mate y termo, Rubén tranquilo con el mate. Marta entra agachada con la torre de 7 pocillos en una bandeja y el
cajón colgando del antebrazo. 20,65 "¿Y, cómo viene el mes?" (misma toma). 21,90 apoya la bandeja y deja el cajón.

**Q2 · el resumen (22,10-25,90).** 22,10 vibra el celular; push-in al inserto (60 % del cuadro): "Resumen del mes ·
21:00", filas "Hoy $ 18.450" (22,40), "Mes $ 412.300" (22,70), "+8 % contra el mes pasado" en verde (23,00), Lexend 700
≥ 40 px. 23,30 Rubén de frente, de reojo al celular, sin soltar el mate: 23,40 "Ocho por ciento arriba del mes pasado.
Lo que más salió fue la yerba." 25,00 la yerba del estante hace pop con un tilde verde grande, y la fila "Lo que más
salió: Yerba" se pinta de verde.

**Q3 · "¿Y a vos?" (25,90-28,10).** Contraplano a Marta por encima del hombro de Rubén (el mate en primer término), con
la bandeja en las manos mirando su torre. 26,90 Rubén plano medio: 27,00 "¿Y a vos?". 27,60 Marta se congela 0,5 s
(música a -8 dB, no cortada).

**Q4 · el espejo (28,10-31,80).** 28,15 Marta: "Pará que te digo." (el mismo arremangarse de Rubén). 29,00 grúa corta
hacia atrás al plano de costado: Marta saca de su bolsa la caja "CAFETERÍA", la abre, los tickets saltan (mismo pop de
P2). 29,60 Rubén sale de atrás del mostrador, saca un pocillo de la torre y se sienta en el cajón con el mate y el
pocillo (sin guiño). 30,30 línea chica (caja navy con borde verde, Lexend 600 ≥ 36 px, sin tapar caras ni la caja):
"Un sistema te manda al celular cómo viene el mes" / "scalerics.com" en verde, hasta el final.

## Sonido
Pizzicato del repo (firma de la línea; atempo 1,2 en el time-lapse), heladera (`zumbido.wav`) bajo todo el reel. SFX
por acción (tabla de plan.md): persiana, clink de pocillo por cada uno, pop + papel de los tickets que saltan, teclas
y la impresora de la calculadora, bolsa del pan, tecla TOTAL y C, papel que se rasga, golpe de la caja "MES PASADO",
vibra, notification, pop por fila, ding del tilde, cajón de plástico, whoosh-short en los movimientos de cámara,
stinger del cartel. Techo por efecto -31 LUFS, voz ≥ 6 LU sobre el resto en cada tramo de 0,5 s, final -14 LUFS, pico
-1,5 dBFS. Los sonidos nuevos, CC0 reales con crédito en fuentes.md; nada sintetizado.
