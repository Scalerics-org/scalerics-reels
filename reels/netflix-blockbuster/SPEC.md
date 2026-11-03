# netflix-blockbuster · Caso de éxito (3D real), versión corta

Serie "Caso de éxito" (CLAUDE.md de la rutina, LO PRIMERO punto 9b), contenido verificado (`fuentes.md`).
**Versión corta del 03-11 (29,85 s)**: Juan vio la de 62 s (cronología 1998/1999/2000/2007/2010) y dijo
"muy largo y no muy atrapante" (la vieja queda en `Downloads/netflix-blockbuster-v1-largo.mp4`).
NO publicar hasta que Juan lo vea.

## Cómo está armado
- Una sola escena Three.js r170 (`assets/tres.js`, librería local en `assets/vendor/three/`), dibujada
  desde el tiempo (`hf-seek`). `armar.mjs` escribe `assets/tiempos3d.js` y monta el canvas `#tres`
  debajo de las escenas HTML. `gen.mjs` arma las 13 escenas HTML (solo la capa plana: textos grandes,
  sellos, 1-2 rótulos por escena). Correr `node gen.mjs && node armar.mjs`.
- Cortes secos: la cámara tiene dos claves pegadas en cada corte (`CAM` en tres.js).
- `reel.json` acepta `sinSub`: rangos de palabras sin subtítulo porque la escena ya las pone en grande
  ("¿Por qué?", "¿Tu negocio está ahí?"). Cola después de la voz: 2,2 s.
- Netflix y Blockbuster solo se nombran: ningún logo ni sus colores. Paleta de marca; rojo apagado
  `#c7655b` solo para NO, QUIEBRA, la multa y el 2010.

## Escenas (palabra donde arranca)
s01-gancho 0 (cuadro 0: texto + etiqueta 3D US$50M) · s02-no 9 (sello NO, la etiqueta se apaga) ·
s03-quiebra 12 (2000 rueda a 2010 y se pone rojo, baja la persiana, sello QUIEBRA) · s04-porque 16
(flash + zoom de golpe a la persiana) · s05-casa 18 (la peli entra a la casa, "Desde tu casa") ·
s06-sin 27 (local con cruz, después la multa cae y aparece el tilde) · s07-mismas 33 (dos cajas
iguales "=") · s08-forma 38 (se juntan, entra al sobre, el sobre se va) · s09-celular 43 (tienda de
noche) · s10-ahi 50 ("Sin resultados") · s11-tienda 54 (el celular gira: tu tienda, caja y tarjeta) ·
s12-llamada 60 · s13-web 65.
