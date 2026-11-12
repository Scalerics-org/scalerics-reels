# por-que-devolver-gratis · explicador "¿Por qué…?" (~33 s estimados, 3D real)

"¿Por qué las tiendas te dejan devolver gratis?". Desenlace en la frase 2: porque el que devuelve gratis vuelve a
comprar (Bower y Maxham, Journal of Marketing 2012, ver `fuentes.md`): en dos tiendas online, los que pagaron la
devolución compraron mucho menos; los que no, más que antes. Bisagra "¿Por qué?": comprar sin probar es un riesgo, y
devolver gratis lo achica (Wood 2001; Petersen y Kumar 2015). Giro: "¿Devuelven más? Algo. Pero compran más todavía."
(meta-análisis 2016). Callback: Rubén, en su almacén cerrado de noche, duda con unos championes online (los suyos
tienen la suela despegada); la tienda dice junto al precio "cambio gratis"; compra; le llega LA MISMA caja del gancho
con la etiqueta sin usar. "Y le quedaron." Cierre: videollamada gratis.
**Producto: tienda online** con la política de cambios clara, a la vista en cada producto y al pagar. Sin marcas
reales. Voz: Orus sola, 89 palabras (`guion.txt`; para la voz, `partes/guion-voz.txt` con "Scálerics punto com").
Plan completo con SFX y cuidados por escena en `plan.md`: este SPEC es el resumen operativo; si chocan, manda este.

**Recurso central:** una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro, sin rAF, sin Date.now, azar con
semilla) con la base técnica de `reels/por-que-el-recordatorio` (luces, PMREM, cámara por claves Hermite/Catmull-Rom
monótona, nube de pensamiento, "?" verde, gen.mjs para la capa HTML, `assets/firma.json` para esconder el logo en
primeros planos) y los personajes de `reels/hacen-envios/assets/personajes.js` (Rubén = ELENCO.almacenero; crearMate,
crearCelular, crearYerba, crearGalletitas). Objetos nuevos: `crearCaja()`, `crearEtiqueta(texto, color)`,
`crearChampion({viejo})`, `crearMedidor()`, `crearMoneda()`.
**El objeto que viaja: LA CAJA DE ENVÍO** (kraft `#c9a46e`, canto corrugado, solapas articuladas, cinta verde de marca)
**y su ETIQUETA** (crema, borde navy grueso, código de barras grueso, flecha curva verde de "vuelta"): se cierra en el
gancho, sale y vuelve doble en s02, se apila en columnas (s03-s05, s08), suelta el "?" en s06, la etiqueta sella el
celular en s07, y vuelve IGUAL al mostrador de Rubén en s11 con la etiqueta "CAMBIO GRATIS" sin usar. El sello verde
"Cambio gratis" de la ficha (s10, s12) tiene la MISMA flecha curva.
Las escenas HTML (`gen.mjs`) son SOLO la capa plana: gancho, subtítulos, rótulos con línea guía, créditos y la tarjeta
de cierre. `armar.mjs` escribe `assets/tiempos3d.js` (inicio de cada escena y de cada palabra).

**Fondo navy claro `#16243d` LISO** (html/body/#fondo y fondo de la escena 3D), piso invisible con `ShadowMaterial`
(sombra `#0b1220` ~45 %), sin degradés ni brillos. El almacén de Rubén (s09-s11): pared crema `#efeee5`, zócalo navy
claro, persiana a media altura, lámpara cálida `#e9a65a` solo sobre el mostrador. Verde `#5ce611` = lo resuelto; rojo
apagado `#c7655b` SOLO para el problema (etiqueta "la pagás vos", columna que baja, aguja del medidor arriba). Cierre en
verde con letras navy. Subtítulos: arriba al centro, 1-3 palabras, 86 px, Lexend 800 crema con borde navy oscuro de
14 px, palabra clave en recuadro verde con texto navy. Rótulos: placa crema con texto navy y borde verde, línea guía
crema de 7 px, ≥ 36 px. Créditos de datos: mono crema 34-38 px arriba, debajo de los subtítulos. Base general de
estilo y helpers: `SPEC-base.md` (lo que dice este SPEC manda sobre SPEC-base: fondo, color de subtítulos, rótulos).

## reel.json propuesto (índices sobre `guion.txt`, 89 palabras, 0 = "¿Por")
- `escenas`: `[["s01-gancho",0],["s02-vuelve",8],["s03-estudio",16],["s04-pagaron",25],["s05-gratis",33],
  ["s06-por-que",39],["s07-riesgo",41],["s08-giro",51],["s09-ruben",58],["s10-cambio",67],["s11-quedaron",75],
  ["s12-tu-tienda",78],["s13-llamada",85]]`
- `acento`: devolver 6, gratis 7, vuelve 13, comprar 15, estudio 17, tiendas 23, pagaron 27, menos 32, más 36,
  antes 38, probar 43, riesgo 46, gratis 48, achica 50, Devuelven 51, Algo 53, compran 55, Rubén 58, championes 60,
  quedan 66, precio 72, cambio 73, gratis 74, quedaron 77, tienda 82, videollamada 85, scalerics 88.
- `subDesde` 8 (el gancho del cuadro 0 es la capa grande; el karaoke arranca en "Porque"), `subFin` 85.
- Pausas a agregar en la voz (como `partes/armar-voz.sh` de por-que-el-recordatorio): +0,25 s antes de "¿Por qué?"
  (39), +0,15 s después de "Algo." (53), +0,30 s antes de "Y le quedaron." (75), +0,30 s al final.

## Escenas (segundos globales estimados; los reales salen de armar.mjs)
| # | id | arranca | dura | frase | plano 3D |
|---|----|---------|------|-------|----------|
| 1 | s01-gancho | 0,0 | 2,9 | ¿Por qué las tiendas te dejan devolver gratis? | C: picado 3/4 de la caja abierta |
| 2 | s02-vuelve | 2,9 | 2,7 | Porque el que devuelve gratis vuelve a comprar. | C → T: travelling por la cinta boomerang |
| 3 | s03-estudio | 5,6 | 3,1 | Un estudio siguió a clientes de dos tiendas online. | E: grúa, dos celulares-tarima con columnas |
| 4 | s04-pagaron | 8,7 | 2,9 | Los que pagaron la devolución compraron mucho menos. | E1: push-in a la tienda 1 (problema) |
| 5 | s05-gratis | 11,6 | 2,0 | Los que no, más que antes. | E2: travelling a la tienda 2 |
| 6 | s06-por-que | 13,6 | 1,3 | ¿Por qué? | Q: la caja sola suelta el "?" |
| 7 | s07-riesgo | 14,9 | 3,6 | Comprar sin probar es un riesgo. Devolver gratis lo achica. | V: celular-vitrina con el champión |
| 8 | s08-giro | 18,5 | 2,8 | ¿Devuelven más? Algo. Pero compran más todavía. | P: dos pilas |
| 9 | s09-ruben | 21,3 | 3,3 | Rubén dudaba: championes online, ¿y si no le quedan? | R: almacén de noche, Rubén y la nube |
| 10 | s10-cambio | 24,6 | 2,9 | La tienda decía, junto al precio: cambio gratis. | R → F: push-in a la ficha |
| 11 | s11-quedaron | 27,5 | 1,5 | Y le quedaron. | R: llega la caja, pies, Rubén con el mate |
| 12 | s12-tu-tienda | 29,0 | 2,3 | ¿Lo ponemos en tu tienda? Agendá una | F: "Tu tienda" con el sello |
| 13 | s13-llamada | 31,3 | 2,9 | videollamada gratis en scalerics.com. | Z: la caja chica con tilde, fondo verde |

## Brief por escena
1. **s01-gancho** · cuadro 0 = portada en movimiento: la caja de envío ABIERTA (solapas afuera, ~75 % del ancho, sombra
   en el piso) con papel de seda crema y la etiqueta "DEVOLUCIÓN GRATIS" apoyada inclinada hacia cámara. Gancho Lexend
   900 crema con borde navy, 120-140 px, y 130-620: "¿Por qué las tiendas" / "te dejan **devolver**" / "**gratis**?"
   ("devolver gratis" en recuadro verde). En "devolver" pop de la etiqueta y se dibuja la flecha curva; en "gratis"
   las solapas se cierran en cadena y la cinta verde cruza la tapa. Push-in lento. Rótulo "Viene adentro de la caja".
2. **s02-vuelve** · la caja cerrada sale a la derecha por una cinta transportadora corta (rodillos crema, flecha verde
   pintada) que hace una U; la cámara la sigue y en "vuelve" regresan DOS cajas (una más grande, etiqueta de compra con
   tilde) hacia cámara con pop. Rótulo "Y vuelve a comprar".
3. **s03-estudio** · grúa atrás: las cajas forman dos columnas de 6 sobre dos celulares gigantes acostados como tarimas
   (pantallas "Tienda 1" / "Tienda 2" con grilla de productos y botón verde), ~80 % del ancho. "4 años" 3D arriba
   (el "4" verde), limpio, sin pisar las columnas; calendario chico que pasa 4 hojas. Línea punteada crema "antes" a la
   altura de la caja 6 en las dos columnas. Crédito "Estudio en dos tiendas online · 2012". Rótulo "Compras reales,
   cliente por cliente".
4. **s04-pagaron** · push-in a la tienda 1: caja con etiqueta roja apagada "DEVOLUCIÓN: LA PAGÁS VOS" y 3 monedas que
   caen adentro (en "pagaron"); en "menos" la columna se desarma de arriba abajo (6 → 1, se vuelven grises y se achican),
   la línea punteada queda arriba. Crédito "A los 2 años: entre 75 % y 100 % menos". Rótulo "Lo que compraban antes" a
   la línea punteada.
5. **s05-gratis** · travelling lateral a la tienda 2 (sin corte): caja con la etiqueta verde del gancho; en "más" su
   columna crece por arriba de la línea (6 → 9, las nuevas con cinta verde), la cámara sube con ella; al final abre un
   poco y se ven las dos columnas. Rótulo "Más que antes de devolver". (Fondo de la portada.)
6. **s06-por-que** · BISAGRA, un solo objeto: la caja del gancho sola al centro; en "qué" las solapas se abren de golpe
   y sale el "?" 3D verde con borde navy (~55 % del alto) con resorte; la caja queda abajo. Push-in y órbita de 15°.
   Sin rótulos, dentro del 80 % seguro.
7. **s07-riesgo** · celular de pie gigante (~70 % del alto) con el champión 3D "dentro" de la pantalla (vitrina) girando
   lento; en "probar" una mano (manga crema) choca contra el vidrio (onditas, sin atravesar); en "riesgo" el medidor
   semicircular arriba con la aguja en rojo apagado. En "devolver gratis" la etiqueta del gancho vuela y sella la
   esquina de la pantalla; en "achica" la aguja baja a verde (no a cero) y el champión sale de la pantalla con pop.
   Crédito "Comprar a distancia: lo sabés recién cuando llega". Rótulo "Riesgo de comprar" al medidor.
8. **s08-giro** · el champión cae en una caja; la cámara abre a dos pilas: izquierda "devoluciones" (cajas con la
   etiqueta de flecha curva), derecha "compras" (cinta verde, tilde). En "¿Devuelven más?" +1 caja a la izquierda; en
   "Algo" se queda (cartelito chico "algo, sí"); en "compran más" +3 a la derecha, que queda más alta. Crédito
   "Revisión de estudios sobre devoluciones · 2016". Rótulo "Suben más las compras". Sin números 3D.
9. **s09-ruben** · travelling: las pilas quedan chiquitas como la grilla de la pantalla del celular de Rubén, la cámara
   retrocede: almacén de Rubén de noche, cerrado (persiana a media altura, lámpara cálida, estantería en sombra). Rubén
   atrás del mostrador con el mate, mirando el celular, cejas de duda. En "championes" contraplano corto a sus pies:
   championes viejos crema sucio, la suela del derecho despegada en la punta que aletea. En "¿y si no le quedan?" la
   nube con un pie (media navy) que no entra en un champión nuevo y rebota. Rótulo "Le gustan, pero duda".
10. **s10-cambio** · push-in al celular (~70 % del alto): ficha "Champión urbano", champión girando arriba, precio
    "$ 2.490" (≥ 64 px). En "precio" aparece junto al precio el sello verde "Cambio gratis · 30 días" con la flecha
    curva de la etiqueta. En "gratis" el pulgar toca "Comprar" → tilde verde; 0,6 s de la pantalla de pago con el mismo
    sello arriba de "Pagar". Rótulo "A la vista, en cada producto".
11. **s11-quedaron** · tras la pausa: timbre, la caja del gancho (misma geometría y cinta) aterriza en el mostrador y
    rebota; se abre: seda, los championes nuevos y la etiqueta "CAMBIO GRATIS" sin usar arriba. En "quedaron" los pies
    de Rubén con los nuevos dan un golpecito de talón; el viejo con la suela despegada al lado "cierra la boca". Corte a
    Rubén levantando el mate, satisfecho. Rótulo chico opcional "La etiqueta, sin usar".
12. **s12-tu-tienda** · el celular gira a cámara y la ficha pasa a "Tu tienda" con otro producto (campera crema doblada)
    y el mismo sello verde "Cambio gratis" junto al precio. Push-in. Sin rótulo.
13. **s13-llamada** · fondo verde: "Videollamada" / "gratis" / "scalerics.com" (navy sobre placa crema), logo, y la caja
    3D cerrada chica abajo con tilde. Arranca sobre "videollamada", 2,5-3 s.

## Cuidados (lo que el director de arte va a buscar)
- La mano de s07 no atraviesa la pantalla; el mate y la mano con el celular no atraviesan la cara de Rubén; la nube no
  le tapa la cara.
- "4 años" y el sello no pisan otros objetos; nada cortado en el borde (las columnas que crecen: la cámara acompaña).
- Ninguna pantalla lisa sin objeto en los travellings (s02 → s03, s08 → s09: la pila se encoge DENTRO del celular,
  nunca queda navy vacío).
- La caja de s11 es la misma que la de s01 (misma cinta, mismas proporciones, misma etiqueta con otro texto).
- Championes sin parecido a ninguna marca (sin pipa, sin tres tiras, sin estrella, sin logo en la lengüeta).
- Ortografía: "DEVOLUCIÓN", "LA PAGÁS VOS", "Champión", "Cambio gratis · 30 días", "$ 2.490".

## Sonido
SFX de `assets/sfx` (detalle por escena en `plan.md`). Faltan cinta de embalar y cartón: si se suman, CC0 real con
autor, sitio y licencia en `fuentes.md`; si no, `papel-fuerte` y `tac-real`. TECHO -31 LUFS por efecto (armar.mjs),
cama `bed.mp3` con sidechain a la voz.
