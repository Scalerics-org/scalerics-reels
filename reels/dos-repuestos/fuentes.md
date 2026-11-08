# dos-repuestos · fuentes

## Datos
Ninguno. El reel no tiene cifras, años, porcentajes ni resultados: es una situación de ficción ilustrativa (Rubén,
Néstor y Daniel son personajes inventados; las dos casas de repuestos, la avenida y la camioneta son genéricas).
- Sin marcas reales: ni de autos, ni de baterías, ni de apps de mensajería. La batería es genérica ("12 V"), el chat
  es una interfaz de marca Scalerics hecha de cero (navy, crema, verde), sin logos ni colores de terceros.
- Sin precios en pantalla (para no afirmar cuánto sale una batería).
- Lo que hace el agente de IA (contestar por WhatsApp a cualquier hora con el stock del local, reservar, pasar la
  conversación al dueño) es el servicio que vende Scalerics según CLAUDE.md ("Lo que se vende").

## Voces
- Narrador: Gemini TTS, voz Orus.
- Rubén ("¿Me contestaron a esta hora?"): Gemini TTS, voz Algenib (grave, cansado, uruguayo), tono de sorpresa
  cansada, de noche al lado de la camioneta.

## Sonido
Del repo (reels/abren-hoy/assets/sfx): whoosh / whoosh-short (cámara), pop (burbujas y objetos), notification y
vibra (mensaje que llega), typing / tipeo (Rubén escribe), chime (tilde de reservada), click-soft (rótulos),
calle (ambiente de mañana), impact-bass-1 (golpe del gancho).

Faltan y hay que buscarlos reales con licencia CC0 (anotar acá autor, sitio y licencia al bajarlos; nunca
sintetizados con ffmpeg):
- Arranque fallido de auto ("clic-clic-clic" del burro de arranque con batería muerta).
- Cortina metálica de local que sube (Néstor abriendo a las 8).
- Ambiente de noche en la calle (grillos lejanos o tránsito suave), para 22:00.
- Cubiertos y plato, muy bajito (la cena de los dos dueños).

## Sonido usado (08-11, constructor)
freesound.org, api.openverse.org, Wikimedia Commons y cdn.freesound.org devuelven 403 desde el proxy de la nube, así
que los cuatro sonidos específicos de arriba NO se bajaron. En su lugar, solo sonidos reales que ya estaban en el repo
(nada sintetizado con ffmpeg):
- Arranque fallido: 4 `tac-real.mp3` + 3 `click.mp3` en ráfaga (`tac-real` es un recorte de "Clock ticking", olver,
  https://freesound.org/people/olver/sounds/130388/, como en reels/tres-segundos).
- Cortina metálica que sube: ráfaga de 7 `tac-real.mp3` (traqueteo de lamas) + `golpe.mp3` al tope.
- Noche y mañana: `calle.mp3` = primeros 15 s de `calle.wav` de reels/abren-hoy ("Small quiet street ambience", Oper8,
  CC0, https://freesound.org/people/Oper8/sounds/241135/), más bajo de noche.
- Vibración: `vibra2.mp3` = `vibra.wav` de reels/abren-hoy ("Cell phone vibrate, on table hard surface.wav",
  SpliceSound, CC0, https://freesound.org/people/SpliceSound/sounds/369839/).
- Tipeo: `tipeo.mp3` de reels/abren-hoy ("Typing on an iPhone.mp3", Caitlin_100, CC0,
  https://freesound.org/people/Caitlin_100/sounds/365543/).
- Cubiertos de la cena: sin sonido propio (dos `tic.mp3` muy bajos cuando levantan el tenedor).
Si una corrida con acceso a freesound puede, conviene reemplazar arranque y cortina por grabaciones CC0 reales.
