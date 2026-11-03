# por-que-la-tarjeta · prueba del formato "resultaaquee"

Explicador de curiosidades: por qué el súper te pide la tarjeta de puntos. Giro hacia el dueño
("¿sabés quiénes son tus clientes?") y cierre con Scalerics Puntos y la videollamada gratis.
Prueba de formato: NO publicar hasta que Juan lo vea (queda en "En curso" de ideas.md).

## Lo que cambia respecto de SPEC-base
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena (colores planos, una luz en
  diagonal con corte duro, canto o lado más oscuro para el volumen, sombra plana en el piso).
- El objeto se transforma en vez de cortar: tarjeta → pasa por el haz → ticket que sale de la
  ranura → push-in → calendario → hoja que se da vuelta → tarjeta que gira y es la ficha del
  cliente → local → tarjeta de Puntos que entra al celular → celular que gira y es la videollamada.
- Anotaciones de explicador: pills con borde (36 px) y línea guía de 6 px con punto, recuadros
  de selección verdes con esquinas, contadores, deslizador "Viene seguido ↔ Dejó de venir".
- Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 86 px blancos, palabra clave en
  recuadro de selección verde (rojo apagado para "dejás" y "dejó"). Los arma `armar.mjs`
  (versión propia de este reel). El gancho (s01) y el CTA (s09) no llevan subtítulos: tienen el
  texto grande en la escena.
- Fondo navy `#0b1220` con un brillo radial chico detrás del objeto y estrellitas tenues.
- Paleta: navy `#0b1220`, navy claro `#16243d` / `#1f3254`, crema `#efeee5`, blanco, verde
  `#5ce611` (sombra `#3fa60a`), rojo apagado `#c7655b` solo para "dejó de venir".

## Cómo se arma
Las escenas NO se escriben a mano: salen de `gen.mjs` (piezas compartidas: tarjeta 3D con canto y
dorso, ticket, calendario, fachada, celular, pills). Después de tocarlo:
`node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho: "¿Por qué / la tarjeta / de puntos?" a 132 px desde el cuadro 0 + la tarjeta del
  súper gigante en 3/4 con brillo. "No es para regalarte nada": pill "¿Un regalo?" tachada en rojo.
- s02-ticket: la tarjeta baja y cruza un haz verde (la pasás), el haz sube y es la ranura de la
  que sale el ticket. "anota qué compraste": recuadro y tildes en los renglones; "Cuándo": la
  fecha; "cada cuánto": se abren los tickets del 01/10 y 16/09. Push-in a la yerba.
- s03-calendario: octubre, paquetes de yerba el 1, el 16 y (punteado) el 31, arcos "15 días"
  con contador. "Te manda la oferta": el calendario sube y entra el aviso del súper; el 29
  marcado "Justo antes".
- s04-dejo: la hoja se da vuelta a noviembre: las visitas esperadas punteadas en rojo, cruz y
  "No vino"; el deslizador pasa de "Viene seguido" a "Dejó de venir".
- s05-ficha: la tarjeta vuelve, "lo de menos" la apaga; "lo que vale" la da vuelta y el dorso es
  la ficha del Cliente 0417 (cada 15 días, yerba y leche, última vez); "cada cliente" abre más fichas.
- s06-giro: la fachada de "TU LOCAL" y cinco siluetas con "?"; una se pone roja: "¿Dejó de venir?".
- s07-celular: tilde en el cartel, entra la tarjeta verde de Scalerics Puntos y se mete en el celular.
- s08-aviso: sellos que se llenan (5 → 8 / 10) y "+1 por compra"; "si deja de venir" atenúa la
  pantalla; cae el aviso "Te extrañamos por acá · Tu premio te está esperando", "Sale solo".
- s09-cta: el celular gira a horizontal y es la videollamada; "Videollamada / gratis /
  scalerics.com".
