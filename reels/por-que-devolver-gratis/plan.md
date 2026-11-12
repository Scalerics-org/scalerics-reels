# Plan de escenas · por-que-devolver-gratis (explicador "¿Por qué…?", ~33 s, 3D real)

> Cambio del coordinador (12-11, antes de grabar): la frase 10 es "La tienda decía, junto al precio: devolución gratis." (lo que midió el estudio) y en s11 la etiqueta que viene en la caja es LA MISMA del gancho, "DEVOLUCIÓN GRATIS", sin usar. El sello de la ficha dice "Devolución gratis" (sin "30 días").

"¿Por qué las tiendas te dejan devolver gratis?". Desenlace en la frase 2: porque el que devuelve gratis vuelve a
comprar (Bower y Maxham, Journal of Marketing 2012, ver `fuentes.md`): en dos tiendas online, los que pagaron la
devolución compraron mucho menos; los que no, más que antes. Bisagra "¿Por qué?": comprar sin probar es un riesgo, y
devolver gratis lo achica (Wood 2001; Petersen y Kumar 2015). Giro: "¿Devuelven más? Algo. Pero compran más
todavía." (meta-análisis de Janakiraman, Syrdal y Freling 2016). Callback: Rubén, que compra como cualquiera, duda
con unos championes online ("¿y si no le quedan?"); la tienda dice junto al precio "devolución gratis"; compra; le llega
LA MISMA caja del gancho, con la etiqueta de cambio adentro, sin usar. "Y le quedaron." Cierre: videollamada gratis.

- **Producto: tienda online** con la política de cambios clara y fácil, a la vista en cada producto (junto al precio)
  y en el pago. Nunca "bot". La política la elige el dueño; el video muestra que se VEA.
- **Por qué Rubén como comprador y no como vendedor:** su almacén no tiene devoluciones (nadie devuelve la yerba), y
  inventar una zapatería con dueño nuevo le saca la estrella al reel. Rubén comprando online es el dueño de pyme del
  otro lado del mostrador: el que mira se pone en su lugar ("yo también dudé así") y entiende por qué SUS clientes
  dudan. Además da el remate de comedia (sus championes viejos con la suela despegada) sin burlarse de nadie. El
  vendedor queda genérico ("la tienda"), que es el lugar del que mira: el cierre se lo dice directo ("¿Lo ponemos en
  tu tienda?").
- **Sin marcas reales:** tiendas, caja, championes (sin logo, sin pipa ni tres tiras: capellada navy con una franja
  verde de marca propia y suela blanca), celular y app genéricos ("Tienda", sin nombre de plataforma ni de correo).
- **Voz:** Orus sola (89-90 palabras, ~32 s). Pausa de 0,3 s antes de "¿Por qué?" y antes de "Y le quedaron." (pausa
  de comedia antes del remate chico). En "Algo." una micro-pausa (es el matiz honesto, que se oiga).
- **Base técnica:** `reels/por-que-el-recordatorio` (tres.js con `renderAt(t)` puro, cámara por claves Catmull-Rom /
  Hermite monótona, PMREM, nube de pensamiento, "?" verde, gen.mjs para la capa HTML, firma.json para esconder el
  logo) y `reels/hacen-envios` para Rubén y el almacén (`assets/personajes.js`: Rubén = ELENCO.almacenero,
  crearMate, crearTermo, crearCelular, crearYerba, crearBolsaPapel). Hay que sumar al módulo (o al tres.js del reel)
  `crearCaja()`, `crearEtiquetaDevolucion()` y `crearChampion()`.

## Fondo y paleta (anotar en "Hechos")
- **Fondo navy claro `#16243d` LISO** (html/body/#fondo y cielo de la escena 3D), piso invisible con `ShadowMaterial`
  (sombra navy oscura `#0b1220` al 45 %), sin degradés ni brillos. Últimos explicadores: por-que-la-toalla navy oscuro,
  por-que-el-recordatorio crema. Este: **navy claro liso con cajas de cartón kraft y verde de marca**; el almacén de
  Rubén de noche (pared crema, zócalo navy, luz cálida `#e9a65a` solo en la lámpara del mostrador).
- **Cartón kraft** `#c9a46e` con canto más oscuro `#a8834f` (es el color real de una caja: si fuera crema no se
  reconoce), **cinta de embalar verde de marca** `#5ce611` (la marca propia del reel, en lugar de la cinta marrón),
  etiqueta crema `#efeee5` con borde navy grueso y texto navy.
- Verde `#5ce611` = lo resuelto (devolución gratis, devolución gratis, compras que suben, tildes); **rojo apagado
  `#c7655b` solo para el problema** (la etiqueta "Devolución: la pagás vos", la pila que baja, el medidor de riesgo
  arriba). Lo neutro en crema2 `#d9d7c9`. Cierre en verde con letras navy.
- Subtítulos: arriba al centro, 1-3 palabras, 86 px, Lexend 800 CREMA con borde navy oscuro de 14 px (sobre navy
  claro), la palabra clave en recuadro verde con texto navy. Rótulos: placa crema con texto navy y borde verde, líneas
  guía crema de 7 px. Textos de interfaz y rótulos ≥ 36 px. Logo blanco (píldora habitual).

## Objeto que viaja: LA CAJA DE ENVÍO CON LA ETIQUETA
Una caja de cartón kraft 3D (RoundedBox con las 4 solapas articuladas, canto de cartón corrugado visible en los
bordes de las solapas como franja ondulada, cinta verde que cruza la tapa) y su **etiqueta de devolución** (tarjeta
crema con borde navy, código de barras grueso navy, texto "DEVOLUCIÓN GRATIS" Lexend 800 y una flecha curva de
"vuelta"). Nace en el cuadro 0, sale y vuelve como boomerang en s02, se apila en las columnas de s04-s05 y s08, se
abre y suelta el "?" en s06, la etiqueta se pega en el celular en s07, y vuelve IGUAL en s11 al almacén de Rubén con
los championes y la etiqueta adentro, sin usar. Esa repetición es el callback visual.

## Escenas (tiempos estimados a 0,34 s/palabra + pausas; los reales salen de armar.mjs)
| # | id | arranca | dura | frase |
|---|----|---------|------|-------|
| 1 | s01-gancho | 0,0 | 2,9 | ¿Por qué las tiendas te dejan devolver gratis? |
| 2 | s02-vuelve | 2,9 | 2,7 | Porque el que devuelve gratis vuelve a comprar. |
| 3 | s03-estudio | 5,6 | 3,1 | Un estudio siguió a clientes de dos tiendas online. |
| 4 | s04-pagaron | 8,7 | 2,9 | Los que pagaron la devolución compraron mucho menos. |
| 5 | s05-gratis | 11,6 | 2,0 | Los que no, más que antes. |
| 6 | s06-por-que | 13,6 | 1,3 | ¿Por qué? |
| 7 | s07-riesgo | 14,9 | 3,6 | Comprar sin probar es un riesgo. Devolver gratis lo achica. |
| 8 | s08-giro | 18,5 | 2,8 | ¿Devuelven más? Algo. Pero compran más todavía. |
| 9 | s09-ruben | 21,3 | 3,3 | Rubén dudaba: championes online, ¿y si no le quedan? |
| 10 | s10-cambio | 24,6 | 2,9 | La tienda decía, junto al precio: devolución gratis. |
| 11 | s11-quedaron | 27,5 | 1,5 | Y le quedaron. |
| 12 | s12-tu-tienda | 29,0 | 2,3 | ¿Lo ponemos en tu tienda? Agendá una |
| 13 | s13-llamada | 31,3 | 2,9 | videollamada gratis en scalerics.com. |

## Plano por plano
1. **s01-gancho** (~2,9 s) · cuadro 0 = portada en movimiento.
   - Picado de 3/4 de la **caja de envío abierta** (solapas abiertas hacia afuera, ~75 % del ancho, apoyada sobre el
     piso invisible con sombra), con papel de seda crema arrugado adentro y, apoyada arriba e inclinada hacia cámara,
     la **etiqueta "DEVOLUCIÓN GRATIS"** (≥ 48 px en pantalla, código de barras grueso, flecha curva verde).
   - Gancho Lexend 900 (120-140 px) crema con borde navy oscuro, "devolver gratis" en recuadro verde, y 130-620.
     Karaoke recién después.
   - En "devolver" la etiqueta hace pop (escala 1 → 1,08 → 1) y la flecha curva se dibuja; en "gratis" las solapas se
     cierran en cadena (0,08 s entre cada una) y la cinta verde se pega cruzando la tapa (sweep de izquierda a derecha).
     Push-in lento.
   - Rótulo con línea guía a la etiqueta: "Viene adentro de la caja".
   - SFX: `papel` (seda), `pop` (etiqueta), `whoosh-short` + `tac-real` ×2 (solapas), `papel-fuerte` (cinta; si hay
     uno CC0 de cinta de embalar, mejor, anotarlo en fuentes.md).

2. **s02-vuelve** (~2,7 s) · "Porque el que devuelve gratis vuelve a comprar."
   - La caja cerrada se desliza fuera de cuadro a la derecha por un **camino de flechas** (cinta transportadora corta,
     rodillos crema, flecha verde pintada) y la cámara la sigue con un travelling lateral; el camino hace una curva en
     U (boomerang) y en "vuelve" regresan DOS cajas iguales (una más grande), con pop, hacia cámara. Las cajas que
     vuelven tienen la cinta verde y una etiqueta de compra nueva (tilde verde), no la de devolución.
   - Rótulo con línea guía a las dos cajas: "Y vuelve a comprar".
   - Cuidado: que se lea "sale una, vuelven dos" en 1 s; nada de flechas finas (≥ 8 px en pantalla).
   - SFX: `whoosh` (sale), `tic-real` ×4 (rodillos, muy bajo), `whoosh-short` (vuelve), `pop` ×2 (cajas).

3. **s03-estudio** (~3,1 s) · "Un estudio siguió a clientes de dos tiendas online."
   - La cámara retrocede en grúa: las cajas se ordenan en DOS columnas sobre dos **celulares gigantes acostados como
     tarimas** (pantalla hacia arriba, cada uno con una tienda genérica: grilla de productos crema, botón "Comprar"
     verde, cabecera "Tienda 1" / "Tienda 2"), ocupando ~80 % del ancho entre los dos. Arriba, centrado y limpio, un
     **"4 años" 3D** (TextGeometry crema, "4" verde) que entra con pop; debajo, chiquito, un calendario de 4 hojas que
     pasan (año 1 → 4) sobre uno de los celulares.
   - Crédito arriba: "Estudio en dos tiendas online · 2012". Rótulo con línea guía a las columnas: "Compras reales,
     cliente por cliente".
   - Cuidado: el "4 años" no pisa las columnas de cajas; los celulares no se cortan en el borde.
   - SFX: `whoosh-cinematic` (grúa), `pop` ("4 años"), `papel` ×3 muy rápido (hojas del calendario).

4. **s04-pagaron** (~2,9 s) · "Los que pagaron la devolución compraron mucho menos."
   - Push-in al celular de la izquierda (pasa a ser el lado del problema, todo en gris y rojo apagado): una caja con la
     etiqueta en **rojo apagado "DEVOLUCIÓN: LA PAGÁS VOS"** y al lado 3 **monedas** con canto estriado que caen de una
     mano/billetera (sin cara) adentro de la caja. En "menos" la **columna de cajas** de esa tienda se desarma de
     arriba hacia abajo (de 6 a 1, las cajas se van achicando y se vuelven grises antes de desaparecer), con una
     **línea punteada crema "antes"** a la altura original para que se vea la caída.
   - Crédito: "A los 2 años: entre 75 % y 100 % menos". Rótulo con línea guía a la línea punteada: "Lo que compraban
     antes".
   - Cuidado: nada de caras tristes ni "clientes perdidos" dramatizados; el problema es la regla, no la persona.
   - SFX: `tic-real`/`tac-real` alternado ×3 (monedas), `glitch-1` corto bajito en la caída, `golpe` suave (última caja).

5. **s05-gratis** (~2,0 s) · "Los que no, más que antes."
   - Travelling lateral rápido al celular de la derecha (sin corte): caja con la etiqueta verde "DEVOLUCIÓN GRATIS"
     (la del gancho), y su columna de cajas, que arranca a la misma altura punteada "antes" y en "más" crece por arriba
     de la línea (de 6 a 9 cajas, pop de a una, verdes las nuevas). La cámara sube un poco con la columna.
   - Rótulo con línea guía a las cajas de arriba: "Más que antes de devolver".
   - Cuidado: la columna no se corta arriba (la cámara la acompaña); que se vean las dos líneas punteadas a la misma
     altura en los dos celulares si la cámara abre al final.
   - SFX: `whoosh-short`, `pop` ×3 en cadena ascendente, `ding` en "antes".

6. **s06-por-que** (~1,3 s) · BISAGRA · "¿Por qué?"
   - UN SOLO OBJETO: la caja del gancho, sola en el centro sobre navy claro liso; en "qué" las solapas se abren de golpe
     y sale un **"?" 3D verde enorme** (borde navy, ~55 % del alto) con resorte (sobrepaso y rebote corto), centrado,
     dentro del 80 % seguro. La caja queda debajo, más chica. Push-in y órbita corta de 15°. Sin rótulos.
   - SFX: `whoosh-cine-corto` + `impact-bass-1` suave en "qué", `pop` del resorte.

7. **s07-riesgo** (~3,6 s) · "Comprar sin probar es un riesgo. Devolver gratis lo achica."
   - El "?" se achica y se aleja; entra un **celular de pie gigante** (~70 % del alto) con la ficha de un producto: un
     **champión 3D "adentro" de la pantalla** como en una vitrina (capellada navy, franja verde, suela blanca con
     dibujo, cordones crema, se ve de 3/4 girando lento). En "probar" una **mano** (manga crema) intenta agarrarlo y
     choca contra el vidrio (onditas en la pantalla, sin atravesar). En "riesgo" aparece arriba un **medidor
     semicircular** (sector crema / rojo apagado, aguja navy gruesa) con la aguja en rojo apagado.
   - En "devolver gratis" la etiqueta del gancho vuela y se pega en la esquina de la pantalla (sello), y en "achica" la
     aguja baja a la zona crema-verde (NO a cero: "lo achica"), y el champión sale de la pantalla al mundo 3D con pop.
   - Crédito: "Comprar a distancia: lo sabés recién cuando llega". Rótulo con línea guía al medidor: "Riesgo de
     comprar".
   - Cuidado: la mano no atraviesa la pantalla; el medidor no tapa el champión.
   - SFX: `tic` (dedo contra el vidrio) ×2, `glitch-1` muy corto (riesgo), `sello` (etiqueta), `whoosh-short` (aguja),
     `pop` (champión sale).

8. **s08-giro** (~2,8 s) · GIRO · "¿Devuelven más? Algo. Pero compran más todavía."
   - El champión cae adentro de una caja y la cámara abre a **dos pilas** sobre el piso invisible: a la izquierda las
     **cajas que vuelven** (con la etiqueta de devolución, flechita curva) y a la derecha las **cajas que salen** (cinta
     verde, tilde). En "¿Devuelven más?" la izquierda crece UNA caja (pop). Pausa mínima. En "Algo" se queda ahí
     (cartelito chico "algo, sí"); en "Pero compran más" la derecha crece TRES cajas en cadena y queda más alta.
   - Crédito: "Revisión de estudios sobre devoluciones · 2016". Rótulo con línea guía a la pila alta: "Suben más las
     compras".
   - Cuidado: honesto: la pila de devoluciones TAMBIÉN sube (es el matiz), y la diferencia no es exagerada (no 1 contra
     10). Nada de números 3D acá.
   - SFX: `pop` (devolución), `tic` (pausa), `pop` ×3 ascendente (compras), `ding`.

9. **s09-ruben** (~3,3 s) · CALLBACK, problema · "Rubén dudaba: championes online, ¿y si no le quedan?"
   - Travelling sin corte: la pila de cajas se achica y queda chiquita EN la pantalla del celular de Rubén (las cajas
     son la grilla de la tienda), la cámara retrocede y revela el **almacén de Rubén de noche, cerrado** (persiana baja
     a medias, lámpara cálida sobre el mostrador, estantería con yerba y galletitas en sombra). Rubén (ELENCO.almacenero)
     sentado atrás del mostrador con el mate, mirando el celular con cara de duda (cejas una arriba, boca de costado).
     Plano medio, Rubén ~60 % del ancho.
   - En "championes" contraplano corto abajo: **sus championes viejos** puestos (mismo modelo, gastados, crema sucio)
     con la **suela del derecho despegada en la punta** que se abre y se cierra (remate visual, sin voz).
   - En "¿y si no le quedan?" la nube de pensamiento (la de por-que-el-mozo / recordatorio) con un **pie que no entra**
     en un champión nuevo (el champión se aplasta como un resorte, el pie rebota). Sin pie desnudo: media navy.
   - Rótulo con línea guía al celular: "Le gustan, pero duda".
   - Cuidado: la nube no tapa la cara; el mate no atraviesa el bigote; la mano con el celular a distancia de la cara.
   - SFX: `whoosh-cinematic` (retroceso), ambiente de noche (muy bajo), `tac-real` ×2 (suela que aletea), `burbuja`
     (nube), `pop` + `golpe` suave (pie que rebota).

10. **s10-cambio** (~2,9 s) · CALLBACK, solución · "La tienda decía, junto al precio: devolución gratis."
    - Push-in al celular hasta que llena ~70 % del alto: la **ficha del champión** (foto 3D girando arriba, "Champión
      urbano", precio "$ 2.490" Lexend 800 ≥ 64 px) y en "precio" aparece JUSTO AL LADO del precio un **sello verde
      "Devolución gratis"** (placa 3D verde con borde navy y la flecha curva de la etiqueta del gancho: misma
      forma). En "gratis" el pulgar de Rubén toca **"Comprar"** → tilde verde; pantalla siguiente de 0,6 s: el pago con
      el mismo sello "Devolución gratis" visible arriba del botón "Pagar" (eso es "a la vista en el producto y al pagar").
    - Rótulo con línea guía al sello: "A la vista, en cada producto".
    - Cuidado: precio y textos de interfaz nítidos (textura canvas a 2x), nada de marca de plataforma ni de tarjeta.
    - SFX: `whoosh-short` (push-in), `ping` (sello), `click-soft` (Comprar), `notification` (pago).

11. **s11-quedaron** (~1,5 s, con 0,3 s de pausa antes) · remate chico · "Y le quedaron."
    - Corte con pausa: suena el **timbre**, la caja del gancho (MISMA geometría, misma cinta verde) aterriza en el
      mostrador de Rubén con un rebote; se abre: papel de seda, los championes nuevos y la **etiqueta (ahora "CAMBIO
      GRATIS") sin usar** encima. En "quedaron" contraplano abajo: los pies de Rubén con los championes nuevos dan un
      golpecito de talón (pop) y el viejo con la suela despegada queda en el piso al lado, "cerrando la boca". Corte a
      Rubén: levanta el mate, satisfecho.
    - Rótulo chico opcional: "La etiqueta, sin usar" a la etiqueta.
    - SFX: `timbre`, `golpe` (caja), `papel` (seda), `pop` (talón), `sparkle` muy bajo.

12. **s12-tu-tienda** (~2,3 s) · "¿Lo ponemos en tu tienda? Agendá una"
    - El celular de Rubén gira hacia cámara y la ficha cambia a una **tienda genérica "Tu tienda"** (otro producto: una
      campera crema doblada, para que se lea que es para cualquier rubro), con el mismo sello verde "Devolución gratis"
      junto al precio. Push-in. Sin rótulo (habla la voz).
    - SFX: `whoosh-short`, `ping`.

13. **s13-llamada** (~2,9 s) · CIERRE (arranca sobre "videollamada")
    - Tarjeta de cierre fondo verde `#5ce611`: "Videollamada gratis" navy (Lexend 800, ~120 px) y debajo, grande,
      "scalerics.com" navy en placa crema; logo. La caja 3D cerrada con cinta navy (sobre verde) chica abajo, con
      tilde. 2,5-3 s.
    - SFX: `chime` en "videollamada", música que cierra.

## Objetos 3D (específicos: "¿alguien lo confunde con otra cosa?")
- **Caja de envío**: kraft, solapas articuladas con canto corrugado visible, cinta verde con brillo leve (roughness
  0,45), papel de seda crema arrugado adentro (plano con ruido de vértices con semilla fija). Proporción de caja de
  zapatillas de envío (más ancha que alta).
- **Etiqueta de devolución**: crema, borde navy de ~8 px en pantalla, código de barras de barras gruesas, flecha curva
  verde de "vuelta", texto "DEVOLUCIÓN GRATIS" / "DEVOLUCIÓN GRATIS" / (problema) "DEVOLUCIÓN: LA PAGÁS VOS" en rojo apagado.
- **Champión**: suela blanca gruesa con dibujo en el canto, capellada navy, franja verde de marca a los costados (forma
  propia, ni pipa ni tiras), puntera crema, cordones crema cruzados con ojalillos, lengüeta. El viejo: mismo modelo,
  capellada crema sucio `#b9b39f`, suela despegada en la punta (bisagra).
- **Medidor de riesgo**: semicírculo grueso tipo velocímetro, dos sectores (rojo apagado / verde), aguja navy.
- **Monedas**: cilindros con canto estriado, crema dorado mate.
- **Celulares**: `crearCelular` del módulo (funda navy3), pantallas con textura canvas nítida.

## Música y mezcla
Cama suave de los explicadores (la de por-que-el-recordatorio), baja; SFX con TECHO -31 LUFS; voz ≥ 6 LU sobre el resto
por tramos de 0,5 s; final -14 LUFS, pico -1,5 dBFS. Si falta un sonido (cinta de embalar, cartón), uno CC0 con autor
y sitio anotados en `fuentes.md`.

## Portada (portada.json, cuadro limpio sin gancho ni subtítulos)
- Fondo: s05 (las dos columnas de cajas, la roja abajo de la línea y la verde arriba) o s01 (la caja con la etiqueta).
  Preferida: **s05 con las dos columnas**, zoom 1.4, foco arriba del texto.
- `chica`: "El que devuelve gratis" · `grande`: "vuelve a comprar" · `sello`: "¿Por qué?" · acento y sello `#5ce611`.
  (Alternativa con el gancho literal: chica "¿Por qué te dejan" / grande "devolver gratis?".)

## Línea para "Hechos" (ideas.md)
- 12-11 · `por-que-devolver-gratis` · Tienda online (política de cambios clara, a la vista en cada producto y al pagar)
  · "¿Por qué las tiendas te dejan devolver gratis?" Explicador con Rubén (Bower y Maxham, Journal of Marketing 2012;
  Wood 2001; Petersen y Kumar 2015; meta-análisis de Janakiraman, Syrdal y Freling 2016; ver fuentes.md): el que
  devuelve gratis vuelve a comprar; en dos tiendas online, los que pagaron la devolución compraron mucho menos y los
  que no, más que antes; ¿Por qué? comprar sin probar es un riesgo y devolver gratis lo achica; giro: ¿devuelven más?
  algo, pero compran más todavía; callback: Rubén duda con unos championes online (los suyos tienen la suela
  despegada), la tienda dice junto al precio "devolución gratis", compra, le llega la misma caja con la etiqueta sin usar
  y le quedaron · Videollamada gratis en scalerics.com [formato explicador ¿Por qué? · 3D real (caja de envío kraft con
  cinta verde y etiqueta de devolución, cinta transportadora boomerang, columnas de cajas sobre dos celulares, "?" que
  sale de la caja, champión en la vitrina del celular con medidor de riesgo, pilas de devoluciones y compras, almacén
  de Rubén de noche con championes viejos, ficha con sello "Devolución gratis"), fondo navy claro #16243d liso y cierre
  verde]
