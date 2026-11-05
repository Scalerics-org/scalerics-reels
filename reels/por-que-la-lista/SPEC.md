# por-que-la-lista · "¿Por qué…?" (3D real), 32,6 s

Serie "¿Por qué…?" (CLAUDE.md de la rutina, punto 9a + 8b + 8c), sin marcas. Contenido verificado en `fuentes.md`
(Modelo 299, 1935: no se nombran ni la marca ni los pilotos; el accidente se cuenta, no se muestra). Gancho:
"¿Por qué el piloto repasa una lista, si sabe volar?". Producto: sistema a medida (la lista de cada tarea del
local, para que no dependa de la memoria de Marta). Cierre: videollamada gratis en scalerics.com.

## Cómo está armado
- Base técnica: reels/caso-pedidosya. Una sola escena Three.js (`assets/tres.js`), `renderAt(t)` puro, azar con
  semilla. Escenas HTML solo como capa plana (gancho, rótulos con línea guía, sello, cierre). `node gen.mjs && node armar.mjs`.
- Fondo del reel: navy claro `#16243d` liso (sin estrellas ni degradé radial: compresión de Instagram); el velo de
  arriba es del mismo color, así solo oscurece el 3D debajo de los subtítulos.
- Paleta de materiales: navy `#0b1220`/`#1f3254`, verde `#5ce611` (lo resuelto, tildes, toldo), crema `#efeee5`
  (tarjeta, aluminio, persiana), blanco; rojo apagado `#c7655b` SOLO para la traba y el cuaderno de Marta.
- Cámara: claves [t, azimut, elevación, distancia, mira] con interpolación cúbica MONÓTONA en el tiempo
  (Fritsch-Carlson; la Catmull-Rom uniforme del modelo se pasaba de largo con claves desparejas y dejaba la tarjeta
  fuera de cuadro). Un tramo "e" (la grúa del gancho). En el vuelo de la tarjeta al local, la mira sigue a la tarjeta.
- Del gancho al avión hay UN corte (con whoosh) en "En" (`CORTE`, dos listas de claves `CAM_A`/`CAM_B`): la grúa
  larga dejaba cuadros casi vacíos. El avión está grande desde el primer cuadro después del corte. En s06 la cabina
  está en `COCK` (lado de la cámara, lejos del avión) para que el viaje desde la cola no atraviese el parabrisas.
- El "1935" está anclado a la cámara (arriba, debajo de los subtítulos, mismo tamaño en pantalla) y no pisa el avión.
- `reel.json` `sinLogo`: el logo se oculta donde lo pisan la pista (3,1-7,05 s) y los libros (12,65-14,5 s).
- Todo SFX recortado con `max` lleva `data-fade-out` (armar.mjs): sin cortes secos.
- Textos en objetos con textura de canvas (Lexend; "MARTA" en Caveat). El "1935" es TextGeometry (lexend800.js
  trae los dígitos); el tilde 3D es un polígono extruido propio.
- Objetos: cabina de los 30 (volante de aro navy partido arriba, con dos cuernos y manijas crema, tres rayos, cubo y columna hacia el tablero; tablero con relojes; parabrisas con marcos), tarjeta
  "ANTES DE DESPEGAR" con 5 casilleros (el último "Controles libres", FAA) y tildes 3D, cuatrimotor de hélices
  genérico (nariz vidriada, cuatro motores radiales con hélices de 3 palas que giran, tren con rueda de cola,
  deriva alta, sin insignias), pista navy con línea crema, traba roja en U con perno y cinta que flamea, pila de
  7 manuales (tapas, lomo con rótulo, canto de páginas), local con persiana de lamas, toldo verde/crema, estantes, caja de proveedor, mostrador, cuaderno
  rojo "MARTA" con elástico y post-its, tablet con la app (Tu local → Apertura con tildes → videollamada).
- Mezcla: `TECHO` -31 LUFS por efecto (armar.mjs). Medido por tramos de 0,5 s (ebur128 momentáneo, voz sola
  contra música+SFX reconstruidos del index): mientras la voz habla, al menos 6,5 LU arriba; premezcla -14,7 LUFS,
  pico -2,2 dBFS; con loudnorm, -13,6 LUFS y -1,5 dBFS. El techo se mide sobre el TRAMO que suena (atrim+apad).
  `whoosh-cine-corto` y `riser-corto` son copias recortadas de los archivos reales (ver fuentes.md). Sin motor de
  hélices ni persiana reales en el repo: whoosh/riser/click/golpe. El whoosh automático del corte se omite si la
  escena ya trae uno cerca.
- Subtítulos con cortes a mano (reel.json) en frase; el último ("Agendá una") se corta antes de "videollamada".
- Portada: `portada-fondo.png` = cuadro 1,2 s renderizado sin capas HTML (sin gancho, subtítulos, velo ni logo).

## Escenas (brief)
- **s01-gancho** (0 · 3,27 s): la cabina, el volante de aro partido con manijas casi horizontales y la tarjeta en
  el clip; gancho en 3 líneas Lexend 900 96 px, "lista" en recuadro verde; push-in lento; corte con whoosh en "En".
- **s02-1935** ("En 1935"): el avión grande en la pista de tres cuartos, push-in; "1935" 3D verde arriba, limpio.
- **s02b-prueba** ("un avión nuevo se estrelló en una prueba"): en "estrelló" la nariz se levanta apenas y el
  "1935" pierde el verde (queda crema); pill "Vuelo de prueba" con línea al avión. Sin choque, fuego ni restos.
- **s03-expertos** ("Pilotos expertos, avión sano"): órbita al frente de la nariz; pills verdes con tilde
  "Pilotos expertos" (a la cabina) y "Avión sin fallas" (a un motor).
- **s04-trabados** ("Despegaron con los controles trabados: un paso olvidado"): el avión despega (las ruedas se
  separan de la pista, la sombra queda en el piso); travelling de la nariz a la cola; en "trabados" push-in a la traba roja (el timón tiembla), pill roja
  "Controles trabados"; en "un paso olvidado" la traba llena media pantalla y sello "UN PASO OLVIDADO".
- **s05-lista** (el giro): cae la pila de manuales y se tacha "Más entrenamiento"; en "una lista corta" la pila se
  desarma a los costados, la traba se aplana y nace la TARJETA (gira y queda frontal); pill "Una lista corta".
- **s06-hoy** ("Hoy, todo piloto la repasa"): el avión se va, la tarjeta vuela y vuelve al clip del volante
  (callback del gancho); los 5 casilleros se tildan en ritmo, el último en "repasa"; pill "Controles libres".
- **s07-local** ("Tu local también despega"): la tarjeta se suelta y vuela (la cámara la sigue) y queda pegada
  en el pilar del local; el local entra con pop; en "despega" se despliega el toldo.
- **s07b-tareas** ("abrir, cerrar, el pedido al proveedor"): la persiana sube (luz adentro) y baja; cae la caja
  del proveedor y rebota; pills "Abrir", "Cerrar", "Pedido al proveedor" (máximo 2 a la vez).
- **s08-marta** ("¿Y si eso lo sabe solo Marta?"): la persiana vuelve a subir, aparece el mostrador; push-in al
  cuaderno rojo "MARTA" que tiembla y suelta un post-it; pill roja "Solo lo sabe Marta".
- **s09-sistema** ("En Scalerics armamos tu sistema a medida"): salta el elástico, se abre la tapa, las hojas se
  levantan en abanico y el cuaderno se vuelve una tablet parada en el mostrador: "Tu local" + Apertura, Cierre,
  Pedido al proveedor; pill "A medida".
- **s10-tareas** ("cada tarea con su lista"): se abre "Apertura": Subir la persiana, Prender la caja, Revisar la
  heladera, se tildan; "Hecho por: Marta · Nico"; pill "Cada tarea, su lista".
- **s11-verlo** ("¿Querés verlo en tu local?"): retroceso: local con persiana arriba y luz, la caja con tilde
  verde, la tablet en el mostrador y, parada al lado, la tarjeta del piloto, que en "tu local" se tilda entera (cierre del callback).
- **s12-llamada** (2,97 s, arranca en "videollamada"; "scalerics.com" entra en "en", justo antes de decirse): "Videollamada / gratis / scalerics.com" arriba; la tablet
  muestra la videollamada; el local abajo.

## Tiempos
### s01-gancho — dura 3.27 s (inicio global 0.00)
Palabras (segundos relativos a la escena): ¿Por 0.00 · qué 0.25 · el 0.50 · piloto 0.50 · repasa 0.70 · una 1.30 · lista, 1.50 · si 1.80 · sabe 2.10 · volar? 2.40

### s02-1935 — dura 1.83 s (inicio global 3.27)
Palabras (segundos relativos a la escena): En 0.00 · 1935, 0.15 · un 1.68

### s02b-prueba — dura 1.94 s (inicio global 5.10)
Palabras (segundos relativos a la escena): avión 0.00 · nuevo 0.30 · se 0.60 · estrelló 0.70 · en 1.10 · una 1.10 · prueba. 1.30 · Pilotos 1.94

### s03-expertos — dura 2.23 s (inicio global 7.04)
Palabras (segundos relativos a la escena): Pilotos -0.00 · expertos, 0.36 · avión 1.13 · sano. 1.46

### s04-trabados — dura 3.09 s (inicio global 9.27)
Palabras (segundos relativos a la escena): Despegaron 0.00 · con 0.38 · los 0.55 · controles 0.75 · trabados: 1.20 · un 1.90 · paso 2.03 · olvidado. 2.43

### s05-lista — dura 3.15 s (inicio global 12.36)
Palabras (segundos relativos a la escena): En 0.00 · vez 0.44 · de 0.54 · más 0.64 · entrenamiento, 0.84 · una 1.92 · lista 2.04 · corta. 2.34 · Hoy, 3.15

### s06-hoy — dura 2.06 s (inicio global 15.51)
Palabras (segundos relativos a la escena): Hoy, -0.00 · todo 0.54 · piloto 0.69 · la 1.09 · repasa. 1.19

### s07-local — dura 1.86 s (inicio global 17.57)
Palabras (segundos relativos a la escena): Tu 0.00 · local 0.13 · también 0.84 · despega: 1.03

### s07b-tareas — dura 2.35 s (inicio global 19.43)
Palabras (segundos relativos a la escena): abrir, 0.00 · cerrar, 0.37 · el 0.87 · pedido 1.17 · al 1.37 · proveedor. 1.57

### s08-marta — dura 1.68 s (inicio global 21.78)
Palabras (segundos relativos a la escena): ¿Y 0.00 · si 0.02 · eso 0.22 · lo 0.32 · sabe 0.52 · solo 0.72 · Marta? 1.02

### s09-sistema — dura 2.85 s (inicio global 23.46)
Palabras (segundos relativos a la escena): En 0.00 · Scalerics 0.44 · armamos 1.23 · tu 1.54 · sistema 1.64 · a 2.04 · medida: 2.14

### s10-tareas — dura 1.59 s (inicio global 26.31)
Palabras (segundos relativos a la escena): cada 0.00 · tarea 0.19 · con 0.49 · su 0.69 · lista. 0.89 · ¿Querés 1.59

### s11-verlo — dura 1.70 s (inicio global 27.90)
Palabras (segundos relativos a la escena): ¿Querés -0.00 · verlo 0.20 · en 0.40 · tu 0.50 · local? 0.60 · Agendá 1.15 · una 1.50

### s12-llamada — dura 2.97 s (inicio global 29.60)
Palabras (segundos relativos a la escena): videollamada 0.00 · gratis 0.50 · en 1.05 · scalerics.com. 1.32

Duración total 32.57 (la voz termina en 31.97).
