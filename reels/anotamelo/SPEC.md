# anotamelo · PARA MANDAR completo (3D real), ~31,5 s (guion; tiempos estimados hasta tener las voces)

**De qué trata.** La libreta del fiado de Rubén. Graciela: **"Anotámelo, Rubén."**; Rubén saca el lápiz de la oreja y
anota. Desfile de "Anotámelo." (Héctor, Walter, Marta y tres burbujas más): el lápiz de la oreja se gasta en cada
cliente (sacapuntas, virutas) y el almanaque pierde hojas hasta el **30 · COBRAR**. A cobrar: Héctor **"¿Yo te
debía?"**, Walter **"¿Eso no te lo pagué el martes?"** (el martes tiene un círculo de mate encima del número; Rubén
gira la libreta y no se entiende). Graciela entra a pagar: **"Rubén, vengo a pagarte. ¿Cuánto es?"**; Rubén va a la
última hoja (llena), la contratapa (llena), cierra; quietud; da vuelta el antebrazo, lleno de anotaciones como un
machete: **"Mil ochocientos cuarenta."** Remate del remate: Héctor, que ahora sí quiere pagar, **"¿Y yo cuánto te
debía?"**, y Rubén le agacha la cabeza: en la pelada, **"HÉCTOR · DULCE DE LECHE $ 200"**. Cartel **"Un sistema más
tarde…"**. Parte 2: "Anotámelo, Rubén." → la mano va a la oreja, se frena, toca la tablet ("+ $ 320 ✓"): **"Anotado."**;
el 30 llega limpio, a Héctor le vibra el celular con su cuenta y el botón **Pagar**: **"¡Ah, mirá! Yo te debía."** ·
"Pagado ✓"; en la tablet las cuentas se ponen en verde (Walter: "Martes: pagado ✓"); la libreta se jubila en el
estante; Rubén, antebrazo limpio y mate, hace el crucigrama con el lápiz: **FIADO**. Línea chica.

- **Producto:** sistema a medida con cuentas corrientes + aviso automático del saldo con botón para pagar. Solo en la
  línea chica ("Un sistema anota el fiado y le avisa a cada cliente · scalerics.com") y en descripcion.txt. El cartel
  no dice "Scalerics". Sin marcas (tablet, celular, botón Pagar sin logo de ningún medio de pago, diario sin cabezal).
- Sin Orus, sin tarjeta de videollamada (línea Para mandar, punto 8d).
- **Recurso visual central:** la **libreta del fiado** (tapa navy3 con espiral arriba, renglones y margen rojo, letra
  a mano) y **el lápiz detrás de la oreja que se gasta**; el remate es el **antebrazo escrito** y el remate del
  remate la **pelada escrita**.
- Plan detallado con segundos, cámara y SFX por plano: `plan.md`. Versiones del chiste: `ganchos.md`. Voces:
  `partes/voces.md`.
- Proyecto como `reels/hacen-envios` y `reels/me-haces-precio`: todo con `node gen.mjs` (tiempos3d.js,
  compositions/*.html, index.html, assets/audio/mezcla.wav), parte 1 + cartel + parte 2 unidos con `armar.mjs unir`;
  `LIMPIO=1 SINAUDIO=1 node gen.mjs` para el fondo de la portada.

## Paleta y set (para "Hechos")
Almacén de día con pared crema `#efeee5`, **zócalo navy3 `#1f3254` alto y guarda verde fina**, luz de ventana de
mañana (blanca, desde la izquierda), mostrador navy3 con tapa de madera clara, estantes de madera con mercadería de
colores planos, puerta de vidrio con campanita. Rojo apagado `#c7655b` solo para el problema (círculo COBRAR, margen
de la libreta). Verde `#5ce611` para lo resuelto (tablet, Pagar, Pagado ✓) y el recuadro de los subtítulos.
Burbujas crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px.

## Personajes (copia local de `reels/hacen-envios/assets/personajes.js`)
Rubén (ELENCO.almacenero, Algenib) · Graciela (ELENCO.clienta, Gacrux, con monedero) · Héctor (ELENCO.hector,
Sadaltager, zapatos, no pantuflas) · Walter (ELENCO.walter, Umbriel, mochila) · Marta (ELENCO.duena, Aoede).
Agregados al módulo local: `crearLapiz(largo)`, `crearLibretaFiado()`, `crearAlmanaque()`, `crearSacapuntas()`,
`crearDiario()`, y en Rubén dos decals opcionales: `antebrazoEscrito` (cara interna del antebrazo izquierdo) y
`peladaEscrita` (coronilla). Poses nuevas: `BRAZOS.oreja` (mano derecha al lápiz de la oreja, por el costado, sin
cruzar la cara), `BRAZOS.escribe` (lápiz sobre la libreta, la otra mano sujetándola), `BRAZOS.muestraBrazo`
(antebrazo izquierdo girado palma arriba hacia cámara, a la altura del pecho), `AGACHA` (cuello y torso inclinados
hacia adelante ~35°, manos apoyadas en el mostrador; NO es FACEPALM).

## Brief por escena

**P1 · cuadro 0 (0,00-2,10).** Desde el lado del cliente, picado leve. Libreta abierta en primer término, ~55 % del
ancho, con dos anotaciones viejas ya escritas. Graciela a la izquierda apoyando la bolsa de papel, Rubén de frente con
el lápiz largo (0,19) detrás de la oreja derecha. Gancho Lexend 900 ~130 px arriba al centro en el cuadro 0:
"**Anotámelo**, Rubén." (palabra clave en el recuadro verde). 0,25 voz de Graciela; el gancho se apaga y entran los
subtítulos. 1,00 Rubén saca el lápiz (BRAZOS.oreja). 1,40-2,05 escribe (BRAZOS.escribe): "Graciela · yerba,
galletitas · $ 320" aparece trazo a trazo en la hoja.

**P2 · el desfile (2,10-5,30).** Órbita continua de ~140° hasta quedar por encima del hombro derecho de Rubén: la oreja
con el lápiz grande arriba a la derecha (se tiene que VER que se achica), la libreta abajo, el cliente enfrente, el
almanaque en la pared de atrás. Héctor (dulce de leche) "Anotámelo." 2,20 · Walter (fideos, mochila) 2,95 · Marta
(azúcar) 3,65 · tres burbujas sin voz 4,35 / 4,60 / 4,80. Por cliente: anota, saca punta (virutas que se acumulan),
lápiz a la oreja más corto (0,15 / 0,11 / 0,07 / 0,04 / 0,025); la libreta pasa hojas; el almanaque 1 → 8 → 15 → 22.
Máximo 2 burbujas en pantalla, cada una con su cola a su dueño, nunca sobre una cara.

**P3 · el 30 (5,30-6,00).** Push-in al almanaque (70 % del cuadro): ráfaga de hojas que vuelan hasta el **30** con
círculo rojo apagado y "COBRAR" en Caveat. 5,75 tilt rápido a la libreta cerrada y gorda, con gomita, el cabito al
lado y la montañita de virutas.

**P4 · cobrar (6,00-9,40).** Por encima del hombro de Rubén: Héctor plano medio, Rubén le muestra la libreta.
6,15 "¿Yo te debía?" (Héctor CARA.sorpresa suave, cejas arriba, nada de pícaro). 7,25 Walter en el mismo encuadre,
mano en la nuca: 7,35 "¿Eso no te lo pagué el martes?". 8,60 inserto cenital de la hoja del martes: "MARTES · Walter ·
fideos x2 · $ …" con la mancha de mate sobre el número y la letra en garabato; 8,95 la mano gira la libreta 90°, 9,20
180°.

**P5 · pausa y remate (9,40-14,30).** 9,40 plano general medio de costado: campanita, entra Graciela con el monedero
abierto: 9,60 "Rubén, vengo a pagarte. ¿Cuánto es?". 11,30 inserto por encima del hombro: última hoja llena hasta los
márgenes; 11,75 contratapa por dentro, llena; 12,10 cierra. 12,20-12,90 quietud: música a -12 dB en fundido de 0,4 s
(NO cortada), heladera, un tic de reloj; Graciela espera y parpadea; Rubén CARA.neutra, ojos abiertos. 12,50 Rubén
gira el antebrazo izquierdo palma arriba hacia cámara (BRAZOS.muestraBrazo). 12,60-13,00 push-in al antebrazo: llena
el 60 % del cuadro, "Graciela 1.840" arriba, subrayado, y cinco renglones más. 13,00 Rubén: "Mil ochocientos
cuarenta." (subtítulo con "cuarenta." en el recuadro verde).

**P6 · remate del remate (14,30-16,80).** 14,35 Graciela deja dos billetes y se va saludando. 14,70 contraplano a la
puerta: Héctor con la billetera en la mano: "¿Y yo cuánto te debía?". 15,95 cámara alta desde el lado de Héctor:
Rubén, sin decir nada, se inclina (AGACHA) y muestra la pelada: "HÉCTOR" / "DULCE DE LECHE $ 200" en Caveat grafito.
16,20-16,80 push-in corto; 16,30 Héctor se arrima y se acomoda los lentes para leer. Último cuadro →
`assets/img/fin-parte1.png`.

**CARTEL (16,80-19,80).** "Un sistema" / "más tarde…", el cartel de me-haces-precio con el texto nuevo; Rasalgethi.

**Q1 · Anotado (19,80-22,40).** El encuadre de P1 con una tablet en atril donde estaba la libreta ("Cuentas · Almacén
de Rubén", filas de clientes, Lexend 600 ≥ 36 px). Lápiz nuevo y largo en la oreja; antebrazo limpio. 20,00 Graciela
"Anotámelo, Rubén." (misma toma). 21,10 la mano sube hacia la oreja (mismo movimiento de P1), 21,40 se frena, 21,60
baja y toca la tablet: fila "Graciela" con "+ $ 320 ✓" verde. 21,80 Rubén: "Anotado.".

**Q2 · fin de mes (22,40-25,60).** Inserto del almanaque: 30 limpio, sin círculo. 22,90 entra Héctor; 23,10 vibra;
23,25 inserto del celular en su mano (60 % del cuadro): "Almacén de Rubén · Tu cuenta del mes: $ 1.260", detalle en 3
renglones y botón verde grande "Pagar". 24,05 Héctor: "¡Ah, mirá! Yo te debía." 25,20 toca Pagar, 25,40 "Pagado ✓".

**Q3 · la tablet y la libreta (25,60-28,00).** Primer plano de la tablet: Héctor, Walter ("Martes: pagado ✓"), Marta y
Graciela se ponen en verde con pop (25,70 / 26,05 / 26,40 / 26,75). 27,10 grúa corta al estante: Rubén deja la
libreta gorda con su gomita acostada en el estante de arriba (sacada de debajo del mostrador a la vista, no aparece de
la nada); un poco de polvo.

**Q4 · cierre (28,00-31,50).** Rubén sentado en el banquito detrás del mostrador, mate en la mano izquierda (antebrazo
limpio a la vista), diario doblado en el crucigrama. 28,40 saca el lápiz de la oreja; 28,70-29,50 escribe F-I-A-D-O en
una horizontal; sorbo de mate, sin guiño. 30,00 línea chica (caja navy con borde verde, Lexend 600 ≥ 36 px): "Un
sistema anota el fiado y le avisa a cada cliente" / "scalerics.com" en verde, hasta el final.

## Sonido
Música pizzicato del repo (la firma de la línea), ambiente de almacén bajo todo el reel. SFX por acción (ver tabla de
plan.md): campanita, lápiz escribiendo, sacapuntas, hojas de libreta y de almanaque, tapa que cierra, tic de reloj,
billetes, vibra, notification, click-soft, ding, pop por burbuja y por fila, whoosh/whoosh-short en los movimientos de
cámara, stinger del cartel. Techo por efecto -31 LUFS, voz ≥ 6 LU sobre el resto en cada tramo, final -14 LUFS, pico
-1,5 dBFS. Los sonidos nuevos, CC0 reales con crédito en fuentes.md; nada sintetizado.
