# abren-hoy · PARA MANDAR (3D real), 13,8 s

Línea nueva "PARA MANDAR": no es un explicador, es una situación que todo comerciante vivió, para que un dueño
se la mande a otro ("jaja este sos vos"). Sin narrador, sin tarjeta de videollamada larga; se entiende sin sonido.
NO está en la cola ni en ideas.md: es la muestra para que Juan la vea.

## Beats (segundos del video final; los define T en gen.mjs)
- 0,0 · Puerta de vidrio de un almacén, cartel ABIERTO · Lun a Sáb 9 a 20, toldo verde y crema. Graciela afuera
  tipeando, Rubén detrás del mostrador. Abajo a la derecha: MARTES · 10:14.
- 0,9 · Burbuja 3D "Hola! ¿abren hoy?" (pop). 1,35 · vibra el celular de Rubén sobre el mostrador; lo mira.
- 2,1 · Se miran a través del vidrio. 2,5-3,4 · ella saluda; él contesta con medio saludo sin ganas.
- 3,7 · Rubén señala arriba, el cartel se hamaca y entra un recuadro verde de selección.
  4,2 · ella mira el cartel; 4,6-5,3 · asiente dos veces. Él sonríe aliviado.
- 5,5 · ella vuelve al celular, tipea. 6,35 · "¿y hasta qué hora?" (pop). 6,5 · vibra. Rubén lee, levanta las cejas.
- 7,18 · Rubén mira a cámara, cara de nada. La música se corta seco. Pausa.
- 7,56-7,94 · Push-in rápido a su cara; 7,8 · facepalm con cachetada y sacudón de cámara.
- 8,2 · Contador 3D "Hoy: 46 veces" → 8,6 · 47.
- 9,05 · Voz (Gemini Algenib): suspiro y "Está abierto, Graciela.", con la cara apoyada en la mano; la boca sigue la
  envolvente de la voz. Subtítulo palabra por palabra, "Graciela." en recuadro verde.
- 12,05 · vibra otra vez: él ni se mueve, solo baja los ojos. Contador → 48 (tuba). Cierre chico abajo:
  "Un agente de IA contesta esto por vos · scalerics.com" (1,7 s).

## Cómo está armado
- `node gen.mjs`: escribe assets/tiempos3d.js (T, duración, envolvente de la voz), las 3 escenas HTML, index.html y
  la mezcla de audio (una sola pista premezclada con ffmpeg: assets/audio/mezcla.wav). `MEDIR=1` saca stems voz/resto
  para medir; `LIMPIO=1` arma el index sin capa plana ni logo (fondo de la portada).
- `assets/tres.js`: el set (vereda de baldosas, fachada navy, puerta y vidriera con reflejos, toldo, estantes llenos,
  mostrador, balanza, frasco de caramelos), la cámara (Catmull-Rom + un tramo con ease para el push-in), las burbujas y
  el contador (pegados a la cámara, siempre arriba de todo), el cartel.
- `assets/personajes.js`: módulo reutilizable. crearPersonaje(ELENCO.x) con IK de dos huesos para las manos, ojos con
  párpados que rotan (abiertos, tensión, achinar), cejas, boca de tubo que se rehace, poses por claves (poseEn),
  parpadeo determinista, expresiones (CARA) y posturas (BRAZOS, saludo, FACEPALM). Elenco: Rubén el almacenero,
  Graciela la clienta, y dos más listos para otros reels (Nico el empleado, Marta la dueña de la cafetería).

## Sonido
Ambiente de calle, música pizzicato hasta que mira a cámara, tipeo, pop en cada burbuja, vibración en cada aviso,
clicks en el cartel, whoosh en el push-in, cachetada + golpe grave, pop/click/chime del contador, tuba en el 48.
Todo CC0 (ver fuentes.md). Medido por tramos de 0,5 s (ebur128 sobre stems): con la voz sonando, la voz queda
12 a 18 LU por encima del resto en cada palabra (el suspiro del arranque queda parejo con el ambiente, a propósito). Final -13,7 LUFS, pico -2,3 dBFS, sin clipping.
Paso 10: el loudnorm de una pasada (dinámico) dejaba picos de +1,1 dBFS después del AAC (la cachetada después del
silencio); el final lleva `alimiter=limit=0.7` después del loudnorm. El resto del comando es el del paso 10.

## Voz
Probadas Charon, Enceladus y Algenib con la misma indicación. Elegida Algenib: grave, con un suspiro real antes y la
pausa justa antes de "Graciela". Las tres tomas quedan en partes/.

## Cambios del 05-11 tarde (Juan: "jajaja muy bueno", con 4 arreglos)
- Burbujas: el texto se mide y se achica hasta entrar (con su "?"); están pegadas a la cámara y se reescalan con
  el fov de cada plano, así quedan iguales en todos y dentro del 90 % seguro. Luz propia para que no cambien de color.
- Los primeros 7 s ya no son un solo encuadre: 7 planos con cortes (PLANOS en tres.js): general · celular vibrando
  en primer plano con Rubén atrás · contraplano desde atrás de Rubén con Graciela saludando de frente · general (él
  señala) · contraplano bajo de ella mirando el cartel y asintiendo · primer plano de ella tipeando seria con la
  pantalla reflejada en los anteojos (pose.reflejo) · general con la pausa y el push-in. En los planos de adentro el
  cartel se oculta (tapaba medio cuadro) y el recuadro de selección no se dibuja.
- Graciela con la cara a la vista al saludar y al asentir, y sin cortarse en los generales (GX = -0,46).
- Rubén arranca aburrido (párpados a media asta, cejas caídas, boca plana). Letrero "ALMACÉN" sobre la puerta:
  llena el navy vacío del primer cuadro. La vidriera ahora dice "FIAMBRES · BEBIDAS".
- Bug del módulo de personajes: crearPersonaje completaba con los datos de Rubén, así que Graciela tenía bigote y
  delantal. Ahora completa con DEFECTO (neutro). Graciela queda con su cárdigan verde con botones.
