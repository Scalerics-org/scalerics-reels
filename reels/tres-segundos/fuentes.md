# Fuentes de tres-segundos (verificadas el 05-11-2026)

Cada afirmación con dato del guion lleva la fuente de Google (es dato de la empresa: en el guion va
"Según Google") y al menos una independiente. Nota de la corrida: WebSearch anduvo, pero WebFetch no
resuelve thinkwithgoogle.com, marketingdive.com, genbeta.com ni blog.amp.dev en la nube; los textos se
confirmaron por los extractos de los buscadores (mismas frases en varias fuentes).

## "Si tu página tarda más de tres segundos en el celular, más de la mitad de las visitas se va. Según Google."
- Google: "53% of visits are abandoned if a mobile site takes longer than 3 seconds to load". Viene del
  estudio "The Need for Mobile Speed" de DoubleClick (de Google), septiembre de 2016, sobre más de 10.000
  dominios web móviles con datos de Google Analytics y DoubleClick; Think with Google lo repitió en 2017
  ("Find out how you stack up to new industry benchmarks for mobile page speed", Daniel An).
  - Think with Google (dato): https://thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/
  - Think with Google (informe 2017): https://thinkwithgoogle.com/intl/en-gb/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks
    (copia en business.google.com: https://business.google.com/ca-en/think/marketing-strategies/mobile-page-speed-new-industry-benchmarks/)
  - Blog de AMP (proyecto de Google), presentación del estudio de 2016: https://blog.amp.dev/2016/09/08/new-study-speedmatters-for-mobile-user-engagement-and-revenue/
- Independientes que lo citan como estudio de Google:
  - MediaPost, "Many Visitors Abandon Mobile Sites If Load Time Tops 3 Seconds" (2016): https://www.mediapost.com/publications/article/284398/many-visitors-abandon-mobile-sites-if-load-time-to.html
  - Marketing Dive, "Google: 53% of mobile users abandon sites that take over 3 seconds to load" (2016): https://www.marketingdive.com/news/google-53-of-mobile-users-abandon-sites-that-take-over-3-seconds-to-load/426070/
  - Search Engine Journal, sobre el informe de 2017: https://www.searchenginejournal.com/google-new-industry-benchmarks-mobile-page-speed/
- Ojo con la redacción: la fuente habla de **visitas** abandonadas ("visits"), no de "usuarios" ni de
  "clientes". Por eso el guion dice "más de la mitad de las visitas" y el rótulo 3D es "53 %" (cifra
  exacta de la fuente) con la pill "Fuente: Google". Es un dato de 2016-2017: no se presenta como
  medición nueva ni como ley; no se dice el año en el guion.

## "Te buscan desde la parada, con hambre. Pantalla en blanco. Uno, dos, tres. Vuelve atrás. Elige otro."
- Escena ilustrativa (un caso inventado que muestra el dato), no una afirmación con cifra. No se dice
  que el otro local abre más rápido "según" nadie.

## "Y nunca te avisa que se fue. Perdiste la venta antes de mostrar nada."
- Lógica simple: quien abandona la carga no ve el contenido y no deja aviso. Sin cifras.

## "Pasa con páginas viejas o pesadas."
- Google Search Central (Core Web Vitals): la carga se mide con Largest Contentful Paint y Google pide
  que ocurra dentro de los primeros 2,5 segundos: https://developers.google.com/search/docs/appearance/core-web-vitals
- Las imágenes grandes sin optimizar para el celular son una causa común de LCP lento (servir imágenes
  más chicas en el celular, comprimirlas):
  - DebugBear: https://www.debugbear.com/blog/largest-contentful-paint
  - CoreWebVitals.io: https://corewebvitals.io/core-web-vitals/largest-contentful-paint/optimize-lcp-image
- El estudio de 2016 también señaló el peso de la página (y de los anuncios) como factor de la lentitud
  (MediaPost y AMP, links de arriba). En el guion va en general, sin cifras de megas ni de segundos.

## "En Scalerics hacemos tu página rápida en el celular. Misma parada: abre al toque, con horario, fotos y WhatsApp."
- Es lo que vende Scalerics (sitio web rápido en el celular, con horarios, ubicación y botón a WhatsApp,
  CLAUDE.md). El cronómetro del cierre frena en verde bien antes de la marca de 3 s, sin mostrar ni decir
  una cifra de tiempo: no se promete un número.

## Lo que NO va (no confirmado o no aplica)
- "Al pasar de 1 a 3 segundos, la probabilidad de rebote sube 32 %": está en Think with Google
  (https://thinkwithgoogle.com/data/page-load-time-statistics, estudio con SOASTA, 2017), pero solo la
  repiten blogs de marketing que no aclaran año ni muestra (900.000 vs. 11 millones de páginas según
  quién). Se saca del guion y de los rótulos.
- "El promedio de una página móvil tarda 22 segundos" (2017) o "19 segundos en 3G" (2016): son de Google
  pero la cifra cambió entre informes y está vieja; no se usa.
- "113 % más rebote a los 7 segundos", "90 % a los 5 segundos", "123 % a los 10": circulan sin fuente
  primaria clara; no se usan.
- Que Google baje en los resultados a las páginas lentas: Search Central lo matiza (la experiencia de
  página es una señal entre muchas); no se dice.
- Google solo se nombra como fuente, en texto: nada de su logo, sus colores ni su tipografía.

## Sonido
- Hace falta un tic-tac real (CC0, p. ej. de Freesound vía Openverse): anotar acá autor, link y licencia.
  Si no se consigue, usar `click-soft.mp3` del repo repetido en cada segundo; nunca sintetizado con ffmpeg.

### Sonido usado (construcción, 05-11; ronda 1)
- Tic del cronómetro: `click.mp3` del banco del repo (el mismo de `molde/assets/sfx`). El `tic.mp3` anterior
  se sacó: parecía sintetizado (dos tonos puros) y no tenía autor ni licencia. Se intentó bajar un tic real CC0
  (Openverse, Freesound, Pixabay, Wikimedia Commons, archive.org, OpenGameArt): la red de la nube los bloquea a
  todos (CONNECT 403 / sin conexión), así que se usó `click.mp3` como pidió el coordinador.
- `whoosh-cine.mp3`: recorte (1,9-3,4 s, con fundidos de 40 y 300 ms) del `whoosh-cinematic.mp3` real del banco,
  para que el golpe caiga en el viaje de cámara. `tecleo.mp3`: recorte (0,42-1,04 s) de `typing.mp3` del banco
  (el original arranca con 0,44 s mudos). `riser-corto.mp3`: recorte (3,9-4,7 s) de `riser.mp3` del banco.
  Son recortes de archivos reales, no sonidos sintetizados.
- El resto (`pop`, `click`, `click-soft`, `whoosh`, `whoosh-short`, `impact-bass-*`, `glitch-*`, `ping`, `chime`,
  `sparkle`) y la música `bed.mp3`: los mismos de `reels/caso-pedidosya`.

## "Pasa con páginas viejas o pesadas" (ronda 1)
- "Viejas" va como lógica simple, sin cifra: una página hecha antes de pensar en el celular (texto chico, fotos
  sin adaptar al tamaño de la pantalla) carga más de lo que hace falta. El respaldo técnico es el de arriba
  (Core Web Vitals / LCP y las imágenes sin optimizar como causa común). En la descripción quedó "páginas con
  fotos pesadas o que no se pensaron para el celular".
