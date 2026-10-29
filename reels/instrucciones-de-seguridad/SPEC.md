# Reel "Instrucciones de seguridad": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende UNA cosa: la
**tienda online** (el cliente ve precio y stock, paga con Mercado Pago y le llega el envío por
DAC, Correo o PedidosYa, sin escribirle a nadie).

Formato C (lista en pasos) disfrazado de cultura popular: las **instrucciones de seguridad de un
avión**. Una AZAFATA (Kore, sonrisa de manual, "usted" de aerolínea) da la bienvenida "al vuelo de
compra de tu local" y avisa que va a tener turbulencia. Mucha. Explica en cuatro pasos numerados
cómo sobrevivir a comprarte: 1, abróchese el cinturón: para saber el precio, escriba por privado;
2, en caso de visto, mantenga la calma: las máscaras de oxígeno no van a caer; 3, salidas de
emergencia: solo efectivo, o transferencia y mande el comprobante; 4, el envío: pase a buscarlo...
el lunes. Un PASAJERO (Puck) levanta la mano: "¿y si quiero comprar ya?". "Señor, siéntese." El
COMANDANTE (Charon, por altavoz, cansado: es el dueño) pide perdón: "estaba en la caja". El
pasajero se baja y se va "al vuelo de enfrente, que despega solo". GIRO: la azafata se saca la
sonrisa: "este avión es el mejor de la flota, la mercadería es buenísima; lo que falla es el
embarque". Entra ORUS (Scalerics): la tienda online. Cierre: "Mandáselo al que te hace mandar el
comprobante." Voz de 65.6 s, reel de 68.8 s.

## ESTILO: TARJETA DE SEGURIDAD DE AVIÓN, ilustrada y plana. Edición cargada.
Todo se ve como la tarjeta plastificada del bolsillo del asiento: fondo crema liso, figuras de
PICTOGRAMA rellenas (sin cara, cabeza = círculo, brazos y piernas = trazos gruesos de punta
redonda), el chaleco salvavidas naranja, números de paso GIGANTES dentro de círculos naranjas,
flechas gruesas, cruces rojas de "prohibido" (círculo rojo con barra diagonal) y viñetas de
"correcto / incorrecto". Recursos centrales: la ventanilla redonda, el cartel luminoso de
"abróchese el cinturón" que hace ding (lo pone ambiente.html), la azafata que señala, el tobogán
inflable naranja. Cada "UNO / DOS / TRES / CUATRO" es un número enorme en círculo naranja que
entra de golpe con ding. Palabras clave gigantes que caen en su palabra, sacudones (turbulencia),
nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Crema tarjeta `#f3ead6` (fondo, lo pone el index) y crema claro `#fffaf0` (rellenos internos,
  nubes, texto sobre petróleo).
- Azul petróleo `#0f4c5c`: pictogramas, líneas, textos grandes.
- Petróleo oscuro `#16313a`: subtítulos, paneles (cartel luminoso, pantallas).
- Naranja chaleco `#f26b1d` (subtítulos acentuados en `#e8591a`): números de paso, chalecos,
  flechas, lo importante.
- Rojo prohibido `#d7262e`: cruces, X, sellos de "incorrecto".
- Ámbar cartel `#ffc42e`: SOLO el cartel luminoso encendido y el brillo de los "ding".
- Desde s12 (Scalerics): se suma verde `#2f9e0f` para los tildes de lo que anda (sobre crema el
  verde Scalerics claro no se lee).
Sin degradés de colores, sin emojis, sin fotos, sin logos de aerolíneas ni de marcas (DAC,
Correo, PedidosYa y Mercado Pago solo como texto), sin rayas largas (—) en textos visibles.

## Tipos de letra
Lexend 700-900 para lo grande (números de paso, palabras golpe); IBM Plex Mono 500 para rótulos
tipo tarjeta ("PASO 1", "INCORRECTO"). Nada que haya que leer de menos de 26px (lo decorativo
chico lleva `data-layout-ignore`).

## Zona
Arriba, ambiente pone el encabezado de la tarjeta (y 100-200) y los subtítulos van en y 236 a
~420. Las escenas dibujan entre y 560 y y 1500, dentro de x 50-1030. Abajo: ventanilla de
ambiente (x 60-240, y 1540-1730), rótulo de vuelo a la derecha (y ~1600) y logo en y 1746: no
taparlos.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo crema, subtítulos petróleo oscuro con acento
  naranja, logo en petróleo (`assets/logo-oscuro.png`).
- `compositions/ambiente.html`: marco de tarjeta, encabezado "INSTRUCCIONES DE SEGURIDAD", cartel
  luminoso del cinturón que se ENCIENDE con ding en 0.05, 10.55, 15.72, 21.76, 28.26 y 37.85
  (doble ding del comandante) y se apaga en 53.4; ventanilla con nubes que pasan; sacudón de
  turbulencia entre 4.7 y 7.6 (y uno corto en 42.9, cuando el pasajero se baja). Los sonidos de
  esos ding van en el `.sfx.json` de cada escena (`ping`).

## Escenas (tiempos relativos en `tiempos.md`)
- **s01-bienvenidos** (0-2.93). Cuadro 0: el avión de pictograma (vista lateral, petróleo) ya
  está, cruzando de izquierda a derecha con estela punteada. "vuelo de compra" (0.8-1.3): cartel
  "VUELO DE COMPRA" en naranja; "local" (2.0): en la cola del avión se pinta "TU LOCAL".
- **s02-turbulencia** (2.93-7.76). Ventanilla grande al centro con nubes; "turbulencia" (1.77):
  todo tiembla y las nubes se sacuden, un pasajero pictograma sentado se agarra; "Mucha." (3.12):
  palabra gigante roja MUCHA. que cae, sacudón fuerte, la ventanilla se ladea.
- **s03-instrucciones** (7.76-10.61). La azafata pictograma (gorrito, pañuelo naranja) entra al
  centro y hace el gesto clásico: brazos a un lado y al otro señalando salidas; "seguridad" (1.64):
  aparece la tarjeta "INSTRUCCIONES DE SEGURIDAD · LÉALAS ANTES DE COMPRAR".
- **s04-cinturon** (10.61-15.78). "Uno" (0): círculo naranja gigante con 1 + ding. "abróchese el
  cinturón" (0.61-1.29): hebilla de cinturón que se cierra con click. "precio" (2.89): etiqueta de
  precio con "$ ???"; "privado" (4.19): globo "ESCRIBÍ POR PRIVADO" con candado; flecha naranja de
  la etiqueta al globo.
- **s05-visto** (15.78-21.82). "Dos" (0): círculo 2 + ding. "visto" (1.32): globo de chat del
  cliente con dos tildes y "Visto"; "mantenga la calma" (1.62): pictograma sentado respirando.
  "máscaras de oxígeno" (3.42): panel del techo con la máscara adentro; "no van a caer" (4.12-5.12):
  el panel tiembla y NO se abre; cruz roja de prohibido encima.
- **s06-efectivo** (21.82-28.32). "Tres" (0): círculo 3 + ding. "salidas de emergencia" (0.69):
  cartel de SALIDA con flecha y figura corriendo; "solo efectivo" (2.26): la salida se tapa con un
  billete gigante y el rótulo SOLO EFECTIVO; "transferencia" (3.68): un celular con flecha de
  transferencia; "comprobante" (5.18): un comprobante larguísimo que se desenrolla con sello
  "MANDE EL COMPROBANTE".
- **s07-envio** (28.32-33.54). "Cuatro" (0): círculo 4 + ding. "el envío" (0.88): cinta de
  equipaje con una caja que da vueltas; "pase a buscarlo" (1.97): figura que carga la caja;
  "el lunes" (3.59): hoja de calendario LUNES que cae de golpe, sello rojo.
- **s08-sientese** (33.54-38.29). Fila de asientos; un pasajero levanta la mano (0): globo "¿Y SI
  QUIERO COMPRAR YA?"; "Señor" (2.43): la azafata gira y señala; "siéntese" (2.96): palabra gigante
  SIÉNTESE. y el pasajero se hunde en el asiento, sacudón.
- **s09-comandante** (38.29-42.10). Ding-dong (en -0.44 global 37.85). Parlante de cabina con ondas;
  gorra de comandante; "comandante" (0.51): rótulo CABINA DE MANDO con asiento vacío; "caja" (2.81):
  la gorra cae arriba de una caja registradora, sacudón.
- **s10-me-bajo** (42.10-46.05). "bajo" (0.3): la puerta del avión se abre y se infla el tobogán
  naranja; el pasajero baja deslizándose (0.4-1.4). "vuelo de enfrente" (1.6): otro avión al otro
  lado; "despega solo" (2.5-2.8): ese avión despega solo con flecha hacia arriba y rótulo
  "DESPEGA SOLO".
- **s11-flota** (46.05-53.53). La azafata en primer plano, pañuelo naranja, baja la voz ("Entre
  nosotros", rótulo chico "OFF THE RECORD" NO: en español "ENTRE NOSOTROS"). "mejor de la flota"
  (2.05-2.65): el avión con una cinta/medalla de MEJOR DE LA FLOTA y estrellitas; "mercadería
  buenísima" (3.6-4.15): cajas con tilde; "embarque" (6.05): la puerta de EMBARQUE con cruz roja,
  luz roja que titila y fila de pictogramas esperando.
- **s12-tienda** (53.53-57.5). Cambio de luz (ORUS): el cartel se apaga, todo se ordena. Celular
  de pictograma con una tienda: productos con precio a la vista y un rótulo STOCK; "tienda online"
  (1.62-1.92): título TIENDA ONLINE; "ve el precio" (3.27-3.47): etiquetas de precio que hacen pop.
- **s13-pago** (57.5-63.18). "paga con Mercado Pago" (0-0.6): botón PAGAR que se aprieta y tilde
  verde; "envío" (1.9): camioncito/moto de pictograma recorriendo una ruta punteada hasta una casa,
  con rótulos DAC · CORREO · PEDIDOSYA (2.3-3.2); "sin escribirle a nadie" (4.24-4.8): globo de chat
  con la cruz roja de prohibido (ahora a favor).
- **s14-cta** (63.18-68.76). "Mandáselo" (0): palabra gigante; "al que te hace mandar el
  comprobante" (0.52-1.62): un comprobante de pictograma; flecha naranja de compartir que va al
  botón de compartir abajo a la derecha. Hasta el final todo late suave (sin salida).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema sobre navy; es la tarjeta de seguridad con la paleta de
> arriba, figuras rellenas y sacudones. Sí valen las reglas técnicas, la entrada/salida, el
> `.sfx.json` y la verificación con snapshot y check.

