# por-que-el-final · "¿Por qué…?" (3D real), 35,0 s

Serie "¿Por qué…?" (CLAUDE.md, puntos 9a + 8b + 8c), sin marcas. Experimento real verificado en `fuentes.md`
(Kahneman y otros, 1993: una mano 60 s a 14 °C, la otra 60 s a 14 °C + 30 s subiendo a 15 °C; para repetir, la
mayoría eligió la larga). Gancho en el cuadro 0: "Agua fría, dos veces. La mayoría eligió **la más larga**. ¿Por qué?".
Producto: automatizaciones (el mensaje después de cobrar: "va en camino" y "¿llegó bien?" salen solos). Remate
(ronda 1): "Ese grado mejor lo automatizamos." (frase regenerada con Orus y pegada en la locución). Cierre con
callback: el mismo termómetro sube UN grado al lado del celular de Ana; en "¿Lo vemos en tu local?" el celular y el
termómetro quedan delante de un local genérico que entra grande. Videollamada gratis en scalerics.com.

## Cómo está armado
- Base técnica: reels/por-que-la-lista. Una sola escena Three.js (`assets/tres.js`), `renderAt(t)` puro, azar con
  semilla. Escenas HTML solo como capa plana (gancho, rótulos con línea guía, sellos, cierre). `node gen.mjs && node armar.mjs`.
- Fondo: navy oscuro `#0b1220` liso. Velo arriba del mismo color (solo oscurece el 3D debajo de los subtítulos).
- Paleta: navy `#0b1220`/`#16243d`/`#1f3254`, verde `#5ce611` (lo resuelto: 15°, tildes, globos), crema `#efeee5`,
  blanco, agua `#cfe3ea` translúcida, kraft `#b8946a` (solo el paquete); rojo apagado `#c7655b` SOLO para el problema
  (columna a 14°, pin de "lo peor", borde del chat callado).
- Fuente 3D: `assets/vendor/three/lexend800b.js` (Lexend 800 de `assets/fonts/Lexend-var.woff2`, instanciada con
  fontTools; trae dígitos, "?", "°", "+", "s"), para el "?" de la bisagra y los "14°"/"15°".
- Objetos: mesa de laboratorio; dos cubetas de vidrio con bordes blancos y agua translúcida con ondas (SIN hielo:
  14 °C); la mano de yeso tipo maniquí (palma, dedos en torno, pulgar de dos falanges, antebrazo, puño de camisa navy
  y la manga que sigue fuera de cuadro), derecha en la larga e izquierda (espejada) en la corta; gotas y anillos;
  termómetro de laboratorio (bulbo, columna roja apagada → verde, placa crema con rayitas navy, marca verde en 15);
  chapas "60 s"/"90 s", fichas (solo una torre verde frente a la larga: sin pila crema, para que no se lea como una proporción sin fuente), tilde 3D; "?" verde;
  cronómetro (aguja verde: una vuelta y media vuelta más, arco verde de los 30 s); curva del recuerdo (la dibuja una
  gota; el tramo del medio se apaga), pin rojo en lo peor y verde en el final; paquete kraft con solapas que se
  cierran, cinta navy, etiqueta, ticket "PAGADO"; celular con chat genérico (sin logos ni colores de apps): callado (solo "Gracias por tu compra" y
  "Sin mensajes") → + "Ana, tu pedido va en camino" → + "Al otro día" + "¿Llegó bien, Ana?" → + "¡Perfecto, gracias!";
  calendario LUN → MAR;
  segundo termómetro al lado del celular (14° → 15°); frente de local genérico (toldo navy con borde verde).
- Ronda 1 (revisión de arte): el laboratorio nunca se achica en el aire: sube y baja entero (`labY`). El "?", el
  termómetro gigante y el cronómetro viven en `QX`, delante del laboratorio, y se pasan la posta con un giro de
  tarjeta (scale.x) que se solapa: siempre hay un objeto grande. El cronómetro marca 60 s con un anillo crema
  (una vuelta) y los 30 s de más con un arco verde. El paquete nace grande en el final de la curva; el celular
  entra delante del paquete (que baja por detrás). Sin mano con el celular (se leía como pedestal). Los números
  14°→15° cambian sin encimarse (el viejo se va del todo y recién entra el nuevo).
- Subtítulos con cambio seco (sin fundido ni hueco) y el recuadro de la palabra clave sin margen extra (no deja
  doble espacio). Música con fundido de 0,5 s al final. TECHO -33,5 y recorte
  extra para sparkle, notification, riser-corto y whoosh-cine-corto (picos momentáneos).
- Cámara: claves [t, azimut, elevación, distancia, mira], cúbica monótona (Fritsch-Carlson) continua, sin cortes.
- Números "14°"/"15°": al costado del tubo (no arriba: pisaban los subtítulos); en el cierre, arriba del tubo.
- `reel.json` `sinLogo`: 5,85-18,75 s (un solo tramo: antes eran dos que se pisaban y el logo volvía) y 20,8-32,25 s.
- Ronda 2 (revisión independiente): las manos salen hacia arriba y atrás después de "larga." (5,35-5,8 s) y las
  chapas y el tilde salen volando a los costados justo antes; el laboratorio baja recién después y el "?" nace con
  pop desde mediano DELANTE de todo. El cronómetro entra con pop delante del termómetro (que gira detrás) y sale
  girando en su lugar; el laboratorio sube con la mano ya adentro (no baja una mano desde arriba) y en
  "Recordamos…" la mano sale con su brazo por arriba ANTES del corte y el laboratorio baja mientras aparece la
  curva entera tenue (la gota la repasa). Los números 3D se funden (no se encogen hasta una mota). La columna del
  termómetro queda roja hasta 14 y solo el grado de más es verde. La curva se retira antes de que el paquete nazca
  grande (72 %). Celular con push-in (~64 % del ancho); el calendario entra grande delante del celular como cartel
  de tiempo y sale volando a la derecha; sin sello "SALE SOLO". Cierre: el celular y el termómetro se corren a los
  lados y el local entra entero detrás, con su toldo. Tarjeta final con corte seco. Gancho con el rótulo
  "Experimento de psicología · 1993" (44 px) desde el cuadro 0 y salida seca al primer subtítulo.
- Sonido: SFX del repo (HyperFrames) + CC0 de abren-hoy (burbuja = gotas/salpicadura, vibra). Sin splash real
  (la nube bloquea Freesound/Openverse): el agua suena con burbuja + whoosh suaves, nada sintetizado. TECHO -31 LUFS.
- Portada: `portada-fondo.png` = cuadro 0,6 s renderizado sin capas HTML.

## Tiempos por escena
### s01-gancho — dura 2.97 s (inicio global 0.00)
Palabras (segundos relativos a la escena): Metieron 0.17 · la 0.50 · mano 0.60 · en 0.70 · agua 0.90 · fría, 1.00 · dos 1.72 · veces. 1.90

### s02-mayoria — dura 2.88 s (inicio global 2.97)
Palabras (segundos relativos a la escena): Para 0.00 · repetir, 0.13 · la 0.98 · mayoría 1.03 · eligió 1.53 · la 1.93 · larga. 2.03

### s03-por-que — dura 3.05 s (inicio global 5.85)
Palabras (segundos relativos a la escena): ¿Por 0.00 · qué? 0.23 · Un 1.01 · minuto 1.15 · a 1.55 · catorce 1.65 · grados. 2.15

### s04-minuto-y-medio — dura 1.62 s (inicio global 8.90)
Palabras (segundos relativos a la escena): O 0.00 · un 0.10 · minuto 0.20 · y 0.40 · medio, 0.60 · y 1.40 · al 1.50

### s05-quince — dura 2.29 s (inicio global 10.52)
Palabras (segundos relativos a la escena): final 0.00 · el 0.23 · agua 0.48 · subía 0.58 · a 0.98 · quince. 1.08

### s06-un-grado — dura 2.91 s (inicio global 12.81)
Palabras (segundos relativos a la escena): Más 0.00 · rato, 0.19 · pero 0.77 · terminaba 0.94 · un 1.29 · grado 1.59 · mejor. 1.89 · Recordamos 2.91

### s07-pico-final — dura 2.67 s (inicio global 15.72)
Palabras (segundos relativos a la escena): Recordamos -0.00 · más 0.48 · lo 0.58 · peor 0.68 · y 1.34 · el 1.48 · final. 1.58 · Al 2.67

### s08-cobrar — dura 2.50 s (inicio global 18.39)
Palabras (segundos relativos a la escena): Al -0.00 · vender, 0.11 · el 0.51 · final 0.71 · es 1.11 · después 1.21 · de 1.51 · cobrar. 1.61

### s09-callan — dura 1.84 s (inicio global 20.89)
Palabras (segundos relativos a la escena): Y 0.00 · ahí, 0.11 · muchos 0.68 · se 0.91 · callan. 1.06

### s10-sale-solo — dura 3.00 s (inicio global 22.73)
Palabras (segundos relativos a la escena): Sale 0.00 · solo: 0.17 · Ana, 1.10 · tu 1.54 · pedido 1.65 · va 1.87 · en 1.97 · camino. 2.07 · Al 3.00

### s11-llego-bien — dura 2.09 s (inicio global 25.73)
Palabras (segundos relativos a la escena): Al -0.00 · otro 0.07 · día: 0.27 · ¿llegó 1.00 · bien? 1.27

### s11b-grado-mejor — dura 2.63 s (inicio global 27.82)
Palabras (segundos relativos a la escena): Ese 0.00 · grado 0.18 · mejor 0.58 · lo 1.08 · automatizamos. 1.18

### s12-tu-local — dura 1.68 s (inicio global 30.45)
Palabras (segundos relativos a la escena): ¿Lo 0.00 · vemos 0.08 · en 0.18 · tu 0.38 · local? 0.48 · Agendá 1.12 · una 1.58

### s13-llamada — dura 2.89 s (inicio global 32.13)
Palabras (segundos relativos a la escena): videollamada 0.00 · gratis 0.40 · en 0.90 · scalerics.com. 1.30

Duración total 35.02 (la voz termina en 34.72).
