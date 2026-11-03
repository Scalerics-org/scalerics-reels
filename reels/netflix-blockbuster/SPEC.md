# netflix-blockbuster · Caso de éxito con años (3D real)

Serie "Caso de éxito" (CLAUDE.md, LO PRIMERO punto 9b), contenido educativo verificado
(`fuentes.md`). Netflix vs. Blockbuster como lección para pymes: 1998 DVD por correo → 1999 sin
multas → 2000 la reunión de Dallas (US$ 50 millones, según contaron los fundadores) → 2007
streaming → 2010 quiebra de Blockbuster → giro: las películas eran las mismas, cambió cómo quería
comprar el cliente → hoy compran desde el celular de noche → tienda online con envíos y Mercado
Pago → videollamada. NO publicar hasta que Juan lo vea (queda en "En curso").

## Lo nuevo: 3D de verdad (pedido de Juan, 03-11: "que se vea como ellos, real 3D")
- Una sola escena Three.js r170 para todo el reel (`assets/tres.js`, librería local en
  `assets/vendor/three/`), dibujada desde el tiempo (`hf-seek`), con `window.__hf.buildReady`.
  `armar.mjs` escribe `assets/tiempos3d.js` (inicios de escena y de cada palabra) y monta el canvas
  `#tres` debajo de las escenas HTML.
- Objetos 3D con forma de producto: el año en números extruidos con la tipografía Lexend 800 de la
  marca (convertida del woff2 a `assets/vendor/three/lexend800.js`), que giran como un contador
  (2000 → 1998 → 1999 → 2000 → 2007 → 2010); etiqueta de precio US$50M; disco; sobre con solapa que
  se abre y se cierra; multa roja apagada que se cae y tilde verde; ciudad de ~225 locales
  instanciados; televisor con play; local con persiana que baja; dos cajas de película iguales;
  casa; celular con tres pantallas dibujadas una vez en canvas (tienda de noche, tu tienda,
  videollamada); mostrador gris; caja de envío y tarjeta.
- Luz: key cálida, rim fría, hemisférica de relleno y entorno PMREM con tres tiras que gira con el
  tiempo; sombras de contacto con un plano de degradé (no shadow maps, para que el render por
  software no se arrastre). Materiales MeshStandard/Physical, roughness 0.45-0.65.
- Cámara con claves por escena: push-ins, el plano cenital de la ciudad y una zambullida dentro de
  la pantalla del tele que sale por la vidriera del local (misma posición y tamaño).
- Lo plano queda plano: subtítulos (armar.mjs), etiquetas, contador de locales, sellos ("NO", "NO
  COMPRÓ", "QUIEBRA") y el cierre van en HTML (`gen.mjs` arma las 13 escenas).

## Marca y hechos
- Netflix y Blockbuster se nombran en voz y texto; no se dibuja ningún logo, ni la N roja, ni el
  ticket azul y amarillo. El sobre es crema con franja verde (no el rojo de Netflix).
- Paleta: navy `#0b1220` / `#16243d` / `#1f3254`, crema `#efeee5` / `#d9d7c9` / `#b4b2a3`, verde
  `#5ce611`, rojo apagado `#c7655b` solo para la multa, "no compró" y "quiebra"; gris para el
  mostrador y lo que se queda atrás. Fondo navy oscuro con brillo radial.

## Escenas (palabra donde arranca, ver tiempos.md)
s01-gancho 0 · s02-dvd 19 · s03-correo 26 · s04-multas 37 · s05-locales 45 · s06-dallas 51 ·
s07-streaming 65 · s08-quiebra 77 · s09-mismas 84 · s10-forma 95 · s11-celular 115 ·
s12-tienda 136 · s13-cta 147.
