# te-queda · notas del constructor (13-11)

Proyecto como anotamelo: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). `LIMPIO=1 SINAUDIO=1 node gen.mjs` = fondo de portada (después volver a correr `node gen.mjs`).
`MEDIR=1 node gen.mjs` escribe los stems voz / resto. La escena 3D entera está en `assets/tres.js` (personajes.js es la
copia de anotamelo, sin cambios). Voces: `partes/lineas.tsv` + `node partes/voces.mjs` (ver partes/voces.md).

**Duración: 35,49 s** (parte 1 0-20,66 · cartel 20,66-23,36 · parte 2 23,36-35,49; línea chica desde 33,69).
Más largo que los 31,5 del plan: la escalada tiene tres viajes (P4, P5, P6b) y cada uno necesita su time-lapse legible.
Si hay que recortar: el cartel ya está en 2,7 s; lo más fácil es sacar 0,3 s de cada time-lapse (T.baja2/T.tij2/T.sube2
y sus pares) o 0,3 s de Q4.

## Planos (segundos globales)
| plano | desde | qué |
|---|---|---|
| P1 | 0,00 | picado desde el lado del cliente: Graciela de espaldas abajo a la izquierda, Rubén con el mate, la trampa con la argolla a la derecha. Gancho-burbuja HTML "¿Te queda polenta?" (cola a Graciela). "Ya me fijo." 1,39; deja el mate 1,42, camina, tira de la argolla, la tapa sube contra la pared (1,9-2,3) |
| P2 | 2,32 | la zambullida: la cámara sube sobre el hueco y lo sigue hasta que desaparece en la oscuridad (2,70) |
| P2b | 2,70 | corte con whoosh al sótano, general desde adelante: cadenita 3,00, foco 3,06 (cono y polvo), toma la caja POLENTA y la sacude: vacía (3,42-3,92) |
| P3 | 4,02 | contraplano bajo: asoma con polvo en los hombros; "No, no queda." 4,30; chip 1 4,42; palmea el polvo 4,6 |
| P4 | 5,58 | casa de muñecas (dolly atrás): Walter "¿Y fideos?" 5,76; baja, tijera, avalancha 7,01, telaraña; "No." + chip 2 7,99 |
| P5 | 8,41 | la sección más abajo: Marta 8,61; el foco se quema 9,23; linterna 9,41; la caja AZÚCAR en la cabeza 9,73; "No." + chip 3 10,37 |
| P6 | 10,79 | primer plano con la caja de sombrero; Héctor (en off) "¿Te queda dulce de leche?" 10,89; se saca la caja (vuela al piso a la derecha), el casco, clic 12,2 |
| P6b | 12,45 | la expedición en sección: chip 4; tijera arriba, se tambalea, saca la última caja 13,55, crash 13,69; Héctor silba mirando el techo |
| P7 | 14,49 | grúa: asoma (polvo, telaraña, casco torcido) y levanta el frasco: "Queda uno." 14,94 (ta-dá de vibráfono 14,94) |
| P8 | 16,02 | la pausa 0,78 s: Héctor de espaldas en primer término, Rubén al fondo; la telaraña se descuelga; música -12 dB |
| P9 | 16,80 | Héctor de frente: "Ah, no." 16,88 · "Era para saber." 17,62; se toca la boina 17,98 |
| P10 | 18,63 | la puerta: "¿Y yerba?" 19,11; Rubén entra de la derecha, le calza el casco (19,85-20,15), clic 20,21, parpadea; push-in |
| cartel | 20,66 | "Un sistema / más tarde…" (Rasalgethi a +0,25); corte seco de entrada, iris de salida |
| Q1 | 23,36 | el encuadre de P1: trampa cerrada, Rubén en el banquito, la tablet; "¿Te queda polenta?" 23,56 (la misma toma); toca la tablet (Polenta en verde) "Quedan tres." 24,60 |
| Q2 | 25,57 | el encuadre de P8: Héctor con el casco y la linterna prendida: "¿Y dulce de leche?" 25,93; "Doce." 27,04 |
| Q3 | 27,75 | Héctor (casco): "Era para saber." 27,80 |
| Q3b | 28,74 | Rubén con el mate: "Ahora sabés." 28,79 |
| Q4 | 29,85 | la tablet: vibra 29,95 "Yerba · quedan 2" → "Pedido al proveedor ✓ · Llega el jueves" 30,40; chip "Viajes al depósito: 0" verde 30,53 |
| Q5 | 31,10 | sección (callback de P4): seña, Rubén se corre con el banquito, Héctor abre y baja, cuenta frascos, se le cae una caja 32,54 ("Viajes de Héctor: 1"), sube con la telaraña en el casco: "Doce." 33,04 |
| Q6 | 33,64 | Rubén detrás de la tablet resuelta levanta el mate; línea chica 33,69-35,49 |

## Mezcla (MEDIR=1, momentánea por tramos de 0,5 s)
-14,0 LUFS integrado, pico -4,3 dBFS antes del loudnorm del paso 10. Voz sobre música+SFX en cada tramo con voz: mínimo
+6,9 LU (3,5 s: la cadenita y el foco bajo la cola de nada; no hay voz ahí salvo la cola) y +7,6 (2,0 s, cola de "Ya me
fijo." con los pasos en la madera); típico +12 a +22; en la pausa y el remate +26 a +29 (cama a -12 dB). Techo por efecto
-31 (TECHO); cada SFX con su techo más bajo (-36 a -50). Música: pizzicato toda la parte 1 (baja en la pausa, nunca se
corta) y la parte 2, duck -6 dB debajo de cada voz.

## Pasadas de revisión (snapshots cada 0,5 s, dos completas + puntuales)
- Armado: P1 al principio con la cámara pegada al mostrador (el termo al centro, Rubén fuera) → picado desde atrás de
  Graciela con la trampa a la vista; zambullida que quedaba dentro de la pelada; caja frente a la cara; P3 con la cara
  llenando el cuadro; el foco justo encima de la cabeza de Rubén (se movió); P8 con la cámara dentro del estante de la
  pared (cuadro naranja entero).
- Pasada 1: Graciela fuera de cuadro (se probaron tres puestas; en vertical no entran los tres de costado: quedó picado
  de atrás); 3,0 s la cámara atravesaba un larguero de la escalera; polvo como manchas en la cara (ahora arriba del casco);
  la telaraña tapada por el brazo del frasco (pasó a la oreja izquierda); el dedo de Rubén en los lentes de Héctor al
  prender la linterna (sin mano: suena el clic); Q6 con el casco de Héctor tapando media pantalla y el mate delante de la
  cara; **en Q5 Héctor levantaba el índice al lado de la cara y se podía leer como un gesto grosero: se sacó** (asoma
  sonriendo y asintiendo); chip "0" que duraba 0,35 s (ahora hasta "Viajes de Héctor"); la tarjeta de la tablet con
  transparencia encima de la lista (ahora opaca y baja deslizando); burbujas que tapaban cejas (más arriba, Q3 más abierto).
- Pasada 2: el gancho con la cola apuntando a Rubén (ahora a Graciela, abajo a la izquierda); la zambullida seguía
  pasando por la pelada a 1 m (2,82-2,95) → la zambullida termina en el hueco y corta con whoosh a P2b, general del
  sótano desde adelante con el foco en cuadro; la caja de sombrero desaparecía sin verse (ahora vuela al piso a la
  derecha); P7 arrancaba con el casco solo arrastrándose por el piso (asoma desde más arriba); la etiqueta del frasco
  cortada ("LCE DE L") → texto más chico y el frasco gira hacia la cámara; P9 más abierto (fov 50: la burbuja no tapa los
  ojos); las manos de Rubén en P10 agarran el casco por los costados (antes por adelante y atrás: una mano en la cara).
- `check`: 0 errores (warnings: GL ReadPixels de SwiftShader, dead_stretch sobre el canvas 3D, letras del cartel y la
  línea chica "bajo el piso de lectura": son las mismas que anotamelo).
- Ojo: en lotes largos de snapshot el último cuadro sale a veces verde o negro (artefacto del snapshot, no del reel:
  35,38-35,48 sueltos están bien).

## Dudoso / para los revisores
- Duración 35,5 s (plan ~31,5).
- Los planos de sección (P4, P5, P6b, Q5) muestran a los personajes chicos (~400 px de alto): es el gag de time-lapse;
  la telaraña y el polvo no se leen a esa escala (sí en P3, P6, P7).
- P2b: Rubén entra por el borde derecho en el primer cuadro (2,70-2,8) caminando desde la escalera.
- P10: la cara de Rubén queda cortada en el borde derecho durante el push-in a Héctor (es un over-the-shoulder).
- Q1/Q2: Graciela y Héctor de espaldas en primer término (el formato vertical no deja ver tres personajes de frente).
- Héctor silba solo en imagen (no hay silbido CC0 real accesible).
- La portada: `portada.json` (t 15,4, "Queda uno." con el frasco y el casco) con fondo limpio en
  `portada-src/fondo-limpio-15.4.png` (también `fondo-limpio-11.0.png`, la caja de sombrero). `herramientas/portada.mjs`
  necesita el mp4 renderizado en la rama: correrlo después del paso 10.
