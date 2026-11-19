# estetica-sesiones · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Lorena,
Carolina, Vale, del centro inventado "Lorena Estética" de estetica-turnos). **No afirma datos externos, estadísticas,
años ni empresas reales**, así que no hay nada que verificar con dos fuentes. Que los paquetes se controlen con cuaderno
y tarjetita, y que las cuentas no coincidan, no se presenta como dato ni porcentaje: es lo que le pasa a Lorena ese
jueves.

## Números del caso (no son estadísticas ni promesas de resultado)
- **$ 1.800 por sesión** de láser de piernas en el centro de Lorena; **paquete de 10 = $ 18.000** (sin descuento por
  paquete, para no inventar política de precios). Elegido para que sea creíble en Montevideo: un listado público de un
  centro de Montevideo da "depilación definitiva piernas, 30 min, UYU 1.650" ([Fresha, Montevideo](https://www.fresha.com/lp/en/bt/waxing-salons/in/uy-montevideo));
  y estetica-turnos ya usó $ 1.400-2.200 por servicio. Se usó solo para calibrar; el reel NO cita ningún precio como
  dato: es el precio de Lorena.
- Las sesiones de láser se espacian varias semanas (una guía general habla de 4 a 8 semanas entre sesiones en piernas:
  [Ulike, blog](https://www.ulike.com/es/blogs/hair-removal/how-much-does-laser-hair-removal-legs-cost-amp-4-save-ways)).
  Por eso en la parte 2 el aviso de renovar llega "Dos meses después." (de la sesión 7 a la 9). No se dice en el reel.
- **Cuaderno 9 / tarjetita 7 / post-it 8** → le quedan 1 / 3 / 2; promedio 2; Lorena le da 3.
- **"Este mes: 8 sesiones regaladas por las dudas · $ 14.400"** = 8 × $ 1.800 (las que Lorena dio de más con distintas
  clientas cuando las cuentas no coincidían; en la ficción del caso).
- **"6 paquetes terminados · nadie les avisó · no renovaron"**: del caso.
- Parte 2: Carolina sesión **7 de 10 → quedan 3**; Jimena **5 de 10 · quedan 5** (láser axilas); dos meses después
  Carolina **9 de 10 → queda 1** y renueva **$ 18.000**. Panel: **Activos 42 · Sesiones descontadas este mes 96 ·
  Por terminar 5 (aviso enviado) · Renovaron 4 · Sesiones regaladas por las dudas 0** (ese mes, en la ficción del caso;
  "Renovaron: 4" de 5 avisadas no se presenta como tasa).

## Lo que se dice del producto (que sea realista)
Un sistema a medida para el centro: la ficha de cada clienta con su paquete; al marcar la asistencia la sesión se
descuenta sola; a la clienta le llega por WhatsApp cuántas le quedan; con 1 le llega el aviso de renovación con un link
de pago; la dueña ve el panel de paquetes. Es lo que Scalerics hace (sistemas a medida + automatizaciones, ver CLAUDE.md):
los mensajes salen por la API de WhatsApp Business con plantillas aprobadas (mensajes de servicio/utilidad a clientas que
dieron su número), y el botón de pago es un link de pago de una pasarela, que se marca solo al acreditarse. No se nombra
ninguna plataforma ni pasarela en el reel. No es agente de IA y no se dice así. No se promete ningún resultado en números
fuera del caso.

## Sin marcas
"Lorena Estética" es inventado. Equipo láser genérico sin logo ni modelo; chat genérico (burbujas crema y navy, sin el
verde ni el logo de ninguna app de mensajería); celulares y tablets sin logo; botón de pago sin logos de tarjetas ni de
procesadora; post-its genéricos (crema y verde pálido). WhatsApp se nombra solo en `descripcion.txt`, como canal.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Lorena = Kore, Carolina = Leda (las de estetica-turnos), Vale sin voz, narrador
del cartel = Rasalgethi (audio reusado de `reels/ya-lo-cargo/assets/voice/narrador.wav`, "Un sistema más tarde.").
Detalle en `partes/voces.md`.

## Música y efectos (para el constructor)
De `assets/sfx` y `assets/bgm` de `reels/estetica-turnos` (con su crédito en el `fuentes.md` de ese reel y de donde
vengan) y de `reels/resto-reservas` (BigSoundBank, CC0). Si hace falta alguno que no esté (pip del cabezal láser, cierre
de cartera, ruedas de la torre, papel que se arruga, tapa de tacho, cajón), uno real con licencia CC0 (BigSoundBank o
Freesound CC0) y se anota acá autor, sitio y licencia. Nada sintetizado con ffmpeg.
