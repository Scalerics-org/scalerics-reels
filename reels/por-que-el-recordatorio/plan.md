# Plan de escenas · por-que-el-recordatorio (explicador "¿Por qué…?", ~31 s, 3D real)

"¿Por qué el dentista te manda un mensaje el día antes?". Desenlace en la frase 2: con ese mensaje falta menos gente
(revisión Cochrane 2013, ver `fuentes.md`). Bisagra "¿Por qué?": la razón que más dan los que faltan es «me olvidé».
Giro: con la plata pasa igual; en un experimento con préstamos, un aviso antes de cada cuota rindió tanto como bajar
un cuarto los intereses (la balanza que se equilibra con un mensajito de un lado y una pila de monedas del otro).
Callback: en el almacén de Rubén el olvido tiene forma de encargo (las bolsas armadas con nombre que esperan); el
sistema manda solo "Tu pedido está listo" con LA MISMA burbuja que el recordatorio del dentista del cuadro 0, y
Graciela pasa. Cierre: videollamada gratis.

- **Producto: automatizaciones** (avisos y recordatorios que salen solos: turno, pedido listo, cuota). Nunca "bot".
- **Sin marcas reales:** consultorio, celular (sin logo, sin app reconocible: burbuja de chat genérica navy/crema
  con tilde verde), financiera y almacén genéricos. Nada de "moroso" ni de culpar al cliente: el que se olvida es
  Rubén primero (él recibe el del dentista), y el tono es de "nos pasa a todos".
- **Voz:** Orus sola (87 palabras, ~30 s). Sin otras voces. Pausa de 0,3 s antes de "¿Por qué?" y antes de "Y
  Graciela pasa." (pausa de comedia antes del remate chico).
- **Base técnica:** `reels/por-que-la-toalla` y `reels/por-que-el-mozo` (tres.js con `renderAt(t)` puro, cámara por
  claves Catmull-Rom monótona, PMREM, la nube de pensamiento, el "?" verde, gen.mjs para la capa HTML) y
  `reels/abren-hoy` para el almacén y los personajes (`assets/personajes.js`: Rubén = ELENCO.almacenero, Graciela =
  ELENCO.clienta, crearMate, crearTermo, crearYerba). Un paciente genérico NO hace falta: el paciente es Rubén.

## Fondo y paleta (anotar en "Hechos")
- **Fondo crema `#efeee5` LISO** (html/body/#fondo y cielo de la escena 3D), piso crema2 `#d9d7c9`. El consultorio y el
  almacén con **azulejos/pared navy claro `#16243d`** a media altura (junta crema de ~6 px en pantalla) para que el
  sillón crema y el celular navy recorten fuerte. Hoy ya se usó navy oscuro liso (por-que-la-toalla); el último
  explicador en crema fue por-que-el-mozo (10-11, crema con dormitorio): este es **consultorio crema con zócalo de
  azulejos navy claro**, y el almacén de Rubén a la tarde (luz de vidriera cálida `#e9a65a` solo en la vidriera).
- Verde `#5ce611` = lo resuelto (tildes, burbuja enviada, sillón ocupado); **rojo apagado `#c7655b` solo para el
  problema** (el sillón vacío con "Faltó", el casillero de cuota atrasada). Cierre en verde con letras navy.
- Subtítulos: arriba al centro, 1-3 palabras, 86 px, Lexend 800 NAVY con borde blanco (sobre crema), la palabra clave
  en recuadro verde con texto navy. Rótulos: placa navy claro con texto crema y borde verde, líneas guía navy de 7 px.
  Textos de interfaz y rótulos ≥ 36 px. Logo navy sobre crema (no la píldora blanca).

## Objeto que viaja: LA BURBUJA DEL RECORDATORIO
Una burbuja de chat 3D (RoundedBox extruida con colita, cara crema, borde navy grueso, tilde doble verde, texto en
canvas nítido) que nace en el celular del dentista en el cuadro 0, se multiplica en s02 (vuela a cada sillón), se
achica a "papelito" en la nube de Rubén en s04, se vuelve el sobre/aviso de la cuota en s06, pesa en la balanza en
s07 y vuelve IGUAL (misma geometría, mismo borde, misma tilde) en s09 con "Tu pedido está listo". Esa repetición es
el callback visual; no hace falta decirlo en voz.

## Escenas (tiempos estimados a 0,34 s/palabra + pausas; los reales salen de armar.mjs)
| # | id | arranca | dura | frase |
|---|----|---------|------|-------|
| 1 | s01-gancho | 0,0 | 3,6 | ¿Por qué el dentista te manda un mensaje el día antes? |
| 2 | s02-faltan | 3,6 | 2,6 | Porque con ese mensaje, falta menos gente. |
| 3 | s03-por-que | 6,2 | 1,4 | ¿Por qué? |
| 4 | s04-olvide | 7,6 | 3,4 | La razón que más dan los que faltan: «me olvidé». |
| 5 | s05-plata | 11,0 | 1,7 | Y no pasa solo con los turnos. |
| 6 | s06-cuotas | 12,7 | 2,9 | Un estudio con préstamos: un aviso antes de cada cuota |
| 7 | s07-balanza | 15,6 | 2,9 | funcionó tanto como bajarle un cuarto a los intereses. |
| 8 | s08-encargos | 18,5 | 3,3 | En el almacén de Rubén, el olvido tiene forma de encargo. |
| 9 | s09-aviso | 21,8 | 3,0 | Ahora el sistema avisa solo: «Tu pedido está listo». |
| 10 | s10-pasa | 24,8 | 1,8 | Y Graciela pasa. |
| 11 | s11-local | 26,6 | 2,1 | ¿Que tus clientes no se olviden? Agendá una |
| 12 | s12-llamada | 28,7 | 2,9 | videollamada gratis en scalerics.com. |

## Plano por plano
1. **s01-gancho** (~3,6 s) · cuadro 0 = portada en movimiento.
   - Primer plano picado del **mostrador de Rubén** (madera clara, azulejos navy claro atrás): el **celular de Rubén
     3D** (navy, bordes redondeados, pantalla crema plana) apoyado al lado del mate, llenando ~70 % del ancho e
     inclinado 10°, ya con la burbuja del recordatorio en la pantalla: "Mañana 9:30 · Dentista · Te esperamos.
     ¿Confirmás?" (≥ 40 px) y dos botones "Sí" (verde) / "Cambiar" (crema). Avatar del chat: una **muela 3D**
     blanca-crema con raíces (no un diente genérico de caricatura con cara).
   - Gancho Lexend 900 (112-130 px) navy con borde blanco de 16 px, "dentista" en recuadro verde, y 130-640. Karaoke
     recién después.
   - En "mensaje" el celular vibra (sacudón corto, 3 golpecitos, sin temblor continuo) y la burbuja hace pop; en
     "antes" entra en cuadro la mano de Rubén (manga crema, ELENCO.almacenero) y el celular se levanta un poco hacia
     cámara. Push-in lento.
   - Rótulo con línea guía al celular: "Recordatorio del día antes".
   - SFX: `vibra` (×1 en "mensaje"), `notification` (pop de la burbuja), ambiente de almacén muy bajo.

2. **s02-faltan** (~2,6 s) · "Porque con ese mensaje, falta menos gente."
   - Zambullida: la cámara entra por la burbuja y sale al **consultorio dental**: una FILA de 6 **sillones de dentista**
     reconocibles (sillón reclinable crema con tapizado navy claro, apoyacabezas, lámpara de brazo articulado con foco
     redondo, bandejita con espejito), en perspectiva, llenando el ancho. Al principio 3 sillones con paciente (siluetas
     simples sentadas, con baberito verde) y 3 vacíos con cartelito rojo apagado "Faltó".
   - En "mensaje" 3 burbujas iguales a la del cuadro 0 salen volando de un celular y aterrizan sobre los vacíos: 2 de
     los 3 se llenan (pop del paciente, cartel "Faltó" se da vuelta a tilde verde); queda 1 vacío (honesto: falta menos,
     no "nadie"). En "menos" las lámparas de los ocupados se prenden.
   - Crédito chico arriba: "Revisión de 8 estudios · 2013". Rótulo con línea guía al vacío que queda: "Menos faltas,
     no cero".
   - SFX: `whoosh-short` (zambullida), `whoosh` ×3 cortos (burbujas), `pop` ×2 (pacientes), `ping` (lámparas).

3. **s03-por-que** (~1,4 s) · BISAGRA · "¿Por qué?"
   - UN SOLO OBJETO: la lámpara del sillón del medio gira hacia cámara y su brazo articulado se dobla en un **"?" 3D
     verde enorme** (el foco redondo queda como el punto), centrado, ~55 % del alto, dentro del 80 % seguro, sobre el
     crema liso. Push-in y órbita corta de 15°. Sin rótulos.
   - SFX: `whoosh-cine-corto` + `impact-bass-1` suave en "qué".

4. **s04-olvide** (~3,4 s) · "La razón que más dan los que faltan: «me olvidé»."
   - El "?" se achica y queda como nube sobre la cabeza de **RUBÉN** (plano medio, 60 % del ancho, detrás del
     mostrador, con el mate). La nube de pensamiento (la de por-que-el-mozo) se llena de lo de su día: el pedido al
     proveedor (cajón), la caja (billetes), la yerba (crearYerba), el termo, y el **papelito del turno** "Martes 9:30
     · Dentista" (la burbuja achicada a post-it). En "olvidé" las cosas del almacén empujan al papelito, que se sale
     de la nube y cae girando fuera de cuadro; Rubén se rasca la cabeza con cara de "¿qué era?" (cejas preocupadas,
     NO facepalm).
   - Rótulo: "La razón más citada" y debajo más chico "en muchos estudios; varía según el lugar".
   - Cuidado: la mano que rasca no atraviesa la cabeza; la nube no tapa la cara.
   - SFX: `pop` ×4 en cadena (cosas que entran a la nube), `papel` (papelito que cae), `tic` suave (cejas).

5. **s05-plata** (~1,7 s) · GIRO, parte 1 · "Y no pasa solo con los turnos."
   - El papelito que caía queda en primer plano, gira de canto y al volver es una **tarjeta de cuotas** de cartulina
     crema (12 casilleros, "Cuota 1 … 12") con una **pila de monedas** 3D verde-crema al lado (monedas con canto
     estriado). Fondo crema liso; la tarjeta llena 70 % del ancho.
   - En "plata" las monedas caen y se apilan (de a 5).
   - SFX: `whoosh-short` (giro), `tic-real`/`tac-real` alternado por moneda (máx. 5).

6. **s06-cuotas** (~2,9 s) · "Un estudio con préstamos: un aviso antes de cada cuota"
   - Push-in a la tarjeta: tres días antes de cada casillero, un **celular chico** (el mismo modelo) asoma desde abajo
     y suelta la burbuja-recordatorio ("Tu cuota vence en 3 días"), y el casillero se marca con tilde verde. En cadena
     en los primeros 5 casilleros (ritmo de 0,35 s), el resto ya marcados al alejarse.
   - Crédito arriba: "Estudio publicado en 2011 · 1.121 préstamos". Rótulo con línea guía a la burbuja: "Un SMS por mes".
   - Cuidado: nada de casilleros en rojo con "MOROSO" ni caras tristes de deudores; solo tildes que aparecen.
   - SFX: `notification` corto ×3 (las otras burbujas en silencio), `click-soft` por tilde.

7. **s07-balanza** (~2,9 s) · GIRO, remate · "funcionó tanto como bajarle un cuarto a los intereses."
   - La cámara retrocede y la tarjeta se pliega: aparece una **BALANZA de platillos** grande (bronce mate con
     columna navy, ~80 % del ancho). Plato izquierdo: UNA burbuja-recordatorio chiquita. Plato derecho: la pila de
     monedas con una etiqueta colgando "−25 % de intereses". La balanza arranca inclinada hacia las monedas (lo
     "obvio") y en "tanto" se nivela despacio, con un rebote corto, hasta quedar pareja. Número 3D "−25 %" arriba
     del plato derecho (TextGeometry verde), limpio, sin pisar la balanza.
   - Rótulo con línea guía al fiel: "Efecto parecido en pagar a tiempo". Crédito: "Mismo estudio".
   - SFX: `whoosh` (retroceso), `golpe` grave suave cuando los platos quedan parejos, `ding` en "intereses".

8. **s08-encargos** (~3,3 s) · CALLBACK, problema · "En el almacén de Rubén, el olvido tiene forma de encargo."
   - Travelling sin corte: la balanza se achica y queda sobre el mostrador del almacén (balanza de almacén de
     verdad, se transforma en la de Rubén); la cámara sube en grúa y revela el **almacén de Rubén** a la tarde
     (estantería verde, azulejos navy claro, vidriera con luz cálida). Sobre el mostrador, en fila, **4 bolsas de
     papel madera** dobladas arriba con abrochadora y un **ticket con el nombre escrito a mano** grande ("Graciela ·
     sáb", "Marta", "Nico", "Héctor"), y un **reloj de pared** que marca 19:40. Rubén las mira con el mate, suspira.
   - En "encargo" las bolsas hacen pop de a una (las 4 llenan ~75 % del ancho, la de Graciela adelante).
   - Rótulo con línea guía a las bolsas: "Encargos armados, esperando".
   - Cuidado: que NO se parezca a `me-lo-guardas` (estante GUARDADOS con papelitos y telaraña): acá las bolsas están en
     el mostrador, sin estante, sin telaraña, sin contador que sube.
   - SFX: `whoosh-cinematic` (grúa), `papel` ×4 (bolsas), `tic-real` del reloj ×2.

9. **s09-aviso** (~3,0 s) · CALLBACK, solución · "Ahora el sistema avisa solo: «Tu pedido está listo»."
   - En "sistema" el ticket de la bolsa de Graciela se prende con una tilde verde y de ahí sale volando LA burbuja
     (la misma del cuadro 0). La cámara la sigue (paneo corto) hasta el **celular de Graciela** (ELENCO.clienta, en
     su cocina o en la vereda, plano medio), que vibra; push-in hasta que el celular llena 65 % del alto: burbuja
     "Graciela, tu pedido está listo. Te esperamos hasta las 20." con botón verde "Voy" (≥ 40 px). Mientras, Rubén en
     cuadro chico atrás (o en contraplano de 0,6 s) NO toca nada: toma mate (eso es "solo").
   - Rótulo con línea guía a la burbuja: "Sale solo, a la hora que elijas".
   - SFX: `ping` (tilde), `whoosh-short` (burbuja), `vibra`, `notification`.

10. **s10-pasa** (~1,8 s) · remate chico · "Y Graciela pasa."
    - Pausa de 0,3 s antes. Contraplano en el almacén: suena la **campanita de la puerta**, entra Graciela con la
      chismosa, Rubén le alcanza la bolsa con su nombre; ella sonríe, él levanta el mate (guiño corto). Los otros 3
      tickets del mostrador se prenden en verde en cadena (avisados también).
    - Rótulo chico opcional: "Retirado ✓" sobre la bolsa (con la tilde como forma 3D, no como carácter).
    - Cuidado: la mano de Rubén y la de Graciela no se atraviesan en la bolsa; nada pegado a la cara.
    - SFX: `campanita`, `papel` (bolsa), `pop` ×3 suaves (tickets).

11. **s11-local** (~2,1 s) · "¿Que tus clientes no se olviden? Agendá una"
    - El celular de Rubén (el del cuadro 0) vuelve a vibrar en el mostrador: ahora la burbuja es la de él como
      remitente ("Almacén de Rubén · Tu pedido está listo") junto a la del dentista: las dos burbujas, iguales de
      forma, una arriba de la otra, y la cámara hace push-in. Sin rótulo (habla la voz).
    - SFX: `vibra` suave, `whoosh-short`.

12. **s12-llamada** (~2,9 s) · CIERRE (arranca sobre "videollamada")
    - Tarjeta de cierre fondo verde `#5ce611`: "Videollamada gratis" navy (Lexend 800, ~120 px) y debajo, grande,
      "scalerics.com" navy en placa crema; logo. La burbuja 3D puede quedar chica arriba con tilde. 2,5-3 s.
    - SFX: `chime` en "videollamada", música que cierra.

## Música y mezcla
Cama suave de los explicadores (la de por-que-la-toalla), baja; SFX con TECHO -31 LUFS; voz ≥ 6 LU sobre el resto por
tramos de 0,5 s; final -14 LUFS, pico -1,5 dBFS. Si falta un sonido (p. ej. campanita de puerta más real), uno CC0 con
autor y sitio anotados en `fuentes.md`.

## Portada (portada.json, cuadro limpio sin gancho ni subtítulos)
- Fondo: s07 (la balanza nivelada con la burbuja chiquita contra la pila de monedas) o s01 (el celular con la muela).
  Preferida: **la balanza**, zoom 1.4, foco arriba del texto.
- `chica`: "Un mensaje pesó" · `grande`: "lo mismo que un descuento" · `sello`: "¿Por qué?" · acento y sello `#5ce611`.
  (Alternativa con el gancho literal: chica "¿Por qué el dentista" / grande "te avisa el día antes?".)

## Línea para "Hechos" (ideas.md)
- 11-11 · `por-que-el-recordatorio` · Automatizaciones (avisos y recordatorios que salen solos: turno, pedido listo,
  cuota) · "¿Por qué el dentista te manda un mensaje el día antes?" Explicador sin marcas (revisión Cochrane 2013 sobre
  recordatorios por mensaje; Cadena y Schoar, NBER 2011; ver fuentes.md): con ese mensaje falta menos gente; ¿por qué?
  la razón que más dan los que faltan es «me olvidé»; giro: con la plata igual, en un estudio con préstamos un aviso
  antes de cada cuota funcionó tanto como bajarle un cuarto a los intereses (balanza que se nivela); callback: en el
  almacén de Rubén el olvido tiene forma de encargo, el sistema avisa solo "Tu pedido está listo" con la misma burbuja
  del dentista y Graciela pasa · Videollamada gratis en scalerics.com [formato explicador ¿Por qué? · 3D real (celular
  con recordatorio y muela, fila de sillones de dentista, "?" desde la lámpara, nube de Rubén con el papelito del
  turno, tarjeta de cuotas y monedas, balanza de platillos, almacén con bolsas de encargo con nombre, celular de
  Graciela), fondo crema #efeee5 liso con azulejos navy claro y cierre verde]
