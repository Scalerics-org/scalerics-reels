# Escenas de caso-tu-nombre (3D real, puntos 8b y 8c)

83 palabras, voz Orus, ~29-31 s estimados (0,34 s/palabra + pausas). Índices de palabra = como los cuenta
`reel.json` (separando por espacios; "Coca-Cola" y "scalerics.com" son una palabra cada una).

**Fondo del reel: crema `#efeee5`** (piso crema liso, sin degradés; sombras suaves navy al 20 %). Objetos en navy
`#0b1220`/`#16243d`, verde `#5ce611`, blanco, crema más oscuro `#dcdacb` para volúmenes. Rojo apagado `#c7655b`
SOLO para el problema (el "?" de adivinar, el talle agotado); nunca en las etiquetas ni como "rojo de marca".
Subtítulos arriba al centro, navy sobre crema, palabra clave en recuadro verde.

**El objeto que une todo: LA BOTELLA.** Vidrio transparente con líquido navy oscuro (no marrón cola), cuello
largo, hombros redondos, cintura apenas marcada y fondo con 5 pies (una botella "de gaseosa de vidrio" genérica,
de almacén; NO la curva contour ni las estrías de Coca-Cola). Tapa corona verde `#5ce611`. Etiqueta envolvente
navy con el nombre en crema, Lexend 800 en mayúsculas. Se hace con LatheGeometry (perfil) + CylinderGeometry
abierto para la etiqueta (textura de canvas con el nombre: la fuente 3D del repo no trae todas las letras).
Nombres de las etiquetas: genéricos (LUCÍA, MARTÍN, SOFÍA, DIEGO, VALENTINA, NICOLÁS, CAMILA, JUAN, FLORENCIA...).

Cámara: una curva Catmull-Rom para todo el reel (botella → góndola → globo → botella → ficha → percha →
celular → cierre), push-ins y órbitas cortas, sin cortes secos.

| # | id | arranca en | dur. aprox. |
|---|----|-----------|-------------|
| 1 | s01-gancho | 0 "¿Por" | 3,3 s |
| 2 | s02-australia | 10 "Arrancó" | 2,4 s |
| 3 | s03-ciento-cincuenta | 17 "ciento" | 2,1 s |
| 4 | s04-buscar | 23 "Para" | 2,9 s |
| 5 | s05-paises | 32 "Llegó" | 2,1 s |
| 6 | s06-adivinar | 38 "Pero" | 2,4 s |
| 7 | s07-vos | 45 "Vos" | 2,3 s |
| 8 | s08-lucia | 52 "Lucía" | 2,0 s |
| 9 | s09-entra | 58 "Entra," | 2,0 s |
| 10 | s10-mensaje | 64 "Lucía," | 1,8 s |
| 11 | s11-automatizamos | 68 "Lo" | 1,8 s |
| 12 | s12-tu-local | 72 "¿Lo" | 2,3 s |
| 13 | s13-llamada | 79 "videollamada" | 2,8 s |

Si con la voz real alguna queda por debajo de ~1,7 s: unir s10 con s09 (arranca en 58) y s11 con s12 (arranca
en 68), manteniendo los cambios de objeto dentro de la escena.

## 1 · s01-gancho (0 "¿Por qué Coca-Cola sacó su logo y puso tu nombre?")
- **Objeto:** LA BOTELLA, enorme, en contrapicado, ocupando el 70 % del alto (abajo de y 580 a 1330), ya en
  cuadro en el segundo 0. La etiqueta arranca LISA navy (un hueco donde iría la marca: no se dibuja nada) y gira
  sobre su eje; en "tu nombre" (pal. 8-9) aparece "LUCÍA" en crema con un pop y un brillo verde por el borde.
- **Cámara:** push-in lento y órbita de 20° alrededor de la botella.
- **HTML:** el gancho entero en el cuadro 0, Lexend 900 ~120 px navy: "¿Por qué Coca-Cola sacó su logo y puso
  **tu nombre**?" ("tu nombre" en recuadro verde). Karaoke recién desde la escena 2.
- **SFX:** whoosh suave de entrada, "tink" de vidrio al girar la etiqueta, pop en "nombre".

## 2 · s02-australia (10 "Arrancó en Australia, en dos mil once")
- **Objeto:** la cámara se aleja y baja: la botella queda parada sobre un mapa low-poly de Australia extruido
  (crema oscuro, borde navy de 6-8 px, el mar crema liso), la botella clavada como un pin gigante en la costa
  este. "2011" en TextGeometry verde, arriba y limpio, sin pisar la botella.
- **Transformación:** la botella "se planta" en el mapa (rebote corto); el mapa entra con pop desde el piso.
- **HTML:** rótulo chico con línea guía al mapa: "Australia".
- **SFX:** whoosh de grúa, thud del pin, pop del año.

## 3 · s03-ciento-cincuenta (17 "ciento cincuenta nombres, los más comunes")
- **Objeto:** el mapa se hunde y del piso sube una góndola/heladera de súper llena de botellas iguales, cada una
  con un nombre distinto (filas de 6-8, llenando el ancho). Contador 3D "150" verde arriba que sube de 0 a 150
  mientras se llenan los estantes de a fila.
- **Cámara:** travelling lateral a lo largo de la góndola.
- **HTML:** rótulo "los más comunes" con línea guía a la fila de adelante.
- **SFX:** cascada de "clinks" de vidrio (uno por fila), tic del contador.

## 4 · s04-buscar (23 "Para buscar el tuyo, o el de un amigo.")
- **Objeto:** zambullida a un estante: una botella "LUCÍA" sale de la fila hacia la cámara (la elegiste),
  y en "amigo" (pal. 31) una segunda, "MARTÍN", entra desde la derecha y choca el pico con la primera (brindis).
- **Cámara:** push-in que sigue a la botella que sale; las demás quedan desenfocadas atrás.
- **HTML:** tilde verde chico sobre "LUCÍA" en "tuyo"; rótulo "el de un amigo" con línea guía a la segunda.
- **SFX:** whoosh corto al salir, "clink" de brindis en "amigo".

## 5 · s05-paises (32 "Llegó a más de ochenta países.")
- **Objeto:** las dos botellas suben y la cámara se aleja hasta un globo terráqueo low-poly grande (crema con
  continentes navy, 65 % del ancho) que gira; desde Australia salen arcos verdes y en cada destino se clava una
  mini botella-pin verde (muchas, sin contarlas: no hacen falta 80 exactas).
- **HTML:** sello verde "más de 80 países" (texto plano; si va en 3D, "+80" en TextGeometry arriba del globo).
- **SFX:** whoosh de grúa, ráfaga de pops chiquitos (uno por pin, con techo -31 LUFS).

## 6 · s06-adivinar (38 "Pero Coca-Cola tuvo que adivinar los nombres.") · BISAGRA
- **Objeto (uno solo):** zambullida de vuelta a UNA botella centrada. Su etiqueta gira como tragamonedas:
  pasan nombres a toda velocidad (SOFÍA, DIEGO, CAMILA, JUAN...) y frena en "adivinar" (pal. 42) en un "?" grande
  en rojo apagado `#c7655b`. La botella se inclina, dudando.
- **HTML:** título de bisagra corto dentro del 80 % seguro: "Tuvo que **adivinar**" ("adivinar" en recuadro).
- **SFX:** zumbido/ratchet de rodillo girando, golpe seco al frenar en el "?".

## 7 · s07-vos (45 "Vos ya sabés el de cada cliente.")
- **Objeto:** la etiqueta se despega de la botella, se aplana y crece hasta ser una ficha de cliente grande
  (tarjeta 3D RoundedBox crema con borde navy, 70 % del ancho): "Lucía" en grande, debajo "Compró: vestido verde"
  y "Talle: M" (texto de interfaz ≥ 28 px). Detrás, abanico de 3-4 fichas más (Martín, Sofía, Diego) que
  confirman "cada cliente". El "?" rojo se cae y desaparece.
- **Cámara:** sigue a la etiqueta mientras se despega, push-in a la ficha.
- **HTML:** tilde verde sobre la ficha en "sabés".
- **SFX:** papel que se despega (rip suave), pop de cada ficha.

## 8 · s08-lucia (52 "Lucía esperaba que volviera su talle.")
- **Objeto:** de la ficha la cámara viaja a un perchero: un vestido verde de marca en una percha de madera, con
  su etiqueta de cartón colgando "Talle M" tachado en rojo apagado y "agotado" (gris). Grande, 65 % del alto.
- **Transformación:** la línea "Talle: M" de la ficha vuela y se convierte en la etiqueta del vestido.
- **HTML:** rótulo "agotado" con línea guía a la etiqueta (rojo apagado).
- **SFX:** whoosh corto, roce de percha metálica.

## 9 · s09-entra (58 "Entra, y sale solo el mensaje:")
- **Objeto:** cae una caja de cartón (kraft, cinta navy) frente al perchero y rebota; en "Entra" la etiqueta del
  vestido pasa de tachado rojo a "Talle M ✓" en verde. De la etiqueta sale disparado un globo de mensaje que
  viaja a un celular que entra grande por abajo (60 % del ancho).
- **Cámara:** paneo hacia abajo, siguiendo el globo hasta el celular.
- **HTML:** sello "sale solo" en verde.
- **SFX:** thud de la caja, tilde (ding), whoosh del mensaje.

## 10 · s10-mensaje (64 "Lucía, volvió tu talle.") · CALLBACK
- **Objeto:** el celular a casi pantalla completa, levemente inclinado; en la pantalla, un chat genérico (navy y
  crema, sin logo ni colores de ninguna app) y el globo llega con "Lucía, volvió tu talle M". El nombre "Lucía"
  va dentro de una banda navy con letras crema, IGUAL a la etiqueta de la botella de la escena 1: es la misma
  idea, ahora en el celular. Una mini botella "LUCÍA" puede asomar un instante y fundirse en esa banda.
- **Cámara:** push-in al globo.
- **SFX:** notificación del celular (vibra + ding).

## 11 · s11-automatizamos (68 "Lo automatizamos en Scalerics.")
- **Objeto:** la cámara se aleja: el celular de Lucía queda en una fila de celulares (o el mismo celular con
  notificaciones que se apilan): "Martín, tu pedido está listo", "Sofía, ¡feliz cumple!", "Diego, te guardamos
  la reserva". Cada una sale con tilde verde. Los celulares llenan el ancho; ninguno cortado.
- **HTML:** rótulo "Automatización · Scalerics" (Scalerics en verde; logo chico de Scalerics recién acá o en el
  cierre).
- **SFX:** tres "pings" escalonados, whoosh.

## 12 · s12-tu-local (72 "¿Lo vemos en tu local? Agendá una")
- **Objeto:** vuelve LA BOTELLA de la escena 1, grande, girando, y la etiqueta navy ahora dice "TU LOCAL" en crema
  (cierre del círculo: de "tu nombre" a "tu local"). Tapa verde que salta con un pop.
- **Cámara:** órbita corta y push-in final que entra a la etiqueta, que se vuelve el fondo de la tarjeta.
- **SFX:** tink de vidrio, pop de la tapa.

## 13 · s13-llamada (79 "videollamada gratis en scalerics.com.") · 2,8 s
- **Tarjeta de cierre** sobre fondo crema `#efeee5` (o navy si la etiqueta se vuelve el fondo): "Videollamada
  gratis" en Lexend 800 navy, ~120 px; abajo, grande y en verde `#5ce611`, "scalerics.com" (sobre navy si el
  verde sobre crema no contrasta: usar banda navy). Logo de Scalerics abajo. Arranca justo en "videollamada".
- **SFX:** whoosh suave de entrada, nada más; la música cierra con un fundido de 0,35 s.

## Números y años para la voz
- En `guion.txt` van EN PALABRAS: "dos mil once", "ciento cincuenta", "ochenta" (para que Orus los lea bien).
- En pantalla van EN DÍGITOS: "2011", "150", "+80" / "más de 80 países".

## Paleta
- Fondo crema `#efeee5` · navy `#0b1220` / `#16243d` · verde `#5ce611` · blanco · crema oscuro `#dcdacb` ·
  rojo apagado `#c7655b` (solo el "?" de adivinar y el talle agotado).
