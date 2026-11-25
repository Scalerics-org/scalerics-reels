# pizzeria-pedidos · correcciones de la ronda 3 (qa-ronda-r3.md) · render final

Duración sin cambios: 40,4 s (P1 0-16,56 · cartel 16,56-18,91 · parte 2 18,91-37,38 · cierre 37,38-40,4).
La escena 3D sigue en `assets/src/*.js` (`node gen.mjs` arma `assets/tres.js`).

## ALTA
- **A1 mordida (Q4c, 33,0-33,65).** Reescrita: la porción ya no cuelga del puño. Se calcula en el mundo: el borde
  sostenido por la mano derecha adelante y abajo de la boca, la punta entra en la boca (`PORM_X` en `poseMartin`), la
  cara de la porción girada hacia la cámara y la porción 1,25×. La mano queda adelante del mentón, no tapa la boca; la
  boca se abre justo antes del contacto y la porción queda mordida (punta corta) después.
- **A2 plano de atrás de Tano (Q5b, 34,95-35,8).** Cámara nueva desde la vereda de Tano (3,0, 1,8, 0,15 → 0, 1,95, 9,
  fov 52): la fachada de Lucía entera (cartel LUCÍA/PIZZAS, toldo "LUCÍA · PIZZAS" entero, vinilo, puerta), la senda y
  la moto de Sabri cruzando el cuadro. Tano más adelante en su vereda (1,95, 1,72), chico abajo a la derecha, de 3/4
  (cuerpo girado hacia la moto, se ve la cara y la oreja), ya no la nuca.
- **A3 "¡Con V corta!" fantasma (5,1-6,03).** Fuera del inserto de la comanda; la placa PIZZERÍAS se va con fundido
  antes del corte a la comanda (termina en T.p1i).
- **A4 rótulos de la pausa (≥ 2 s).** "Pedidos que volvieron hoy: 3" y "$ 2.220 que volvieron" entran en P3c (12,21) y
  siguen en P4 (abajo, sin tapar la caja ni "Cenamos.", que va arriba de Tano) y en P4b (arriba, sobre el cuerpo de
  Facu, la pizza libre) hasta 14,45: 2,2 s. La guía al cartón solo en P3c.

## MEDIA
- **M1** P4b desde el lado de Tano y más arriba (Tano fuera de cuadro en ese plano): la mano de Facu agarra la porción de
  lejos, chica, se lee como mano; sin el puño-mitón sobre la pizza.
- **M2** Q4b: la derecha suelta la tapa a mitad de la apertura (ya no sube a la cara); el celular aparece en la izquierda
  desde Q4b y la mano lo sube al pecho (lo mira).
- **M3** Sabri sostiene la caja con las dos manos hasta el corte (no flota).
- **M4** Q5 (panel) y Q3t (tablero): cámara de frente a la tablet, la tablet entera y centrada; las 4 filas del panel
  completas en 0,2 s.
- **M5** Q5c: más abierto (fov 18 → 16), se ve la puerta y el toldo de Don Tano detrás; el bolsillo navy del delantal
  (parecía un celular) fuera.
- **M6** Chat de Tano: arranca con 4 mensajes y filas más altas (7 mensajes en total, se llena); P2b: cámara baja frente a
  Tano (cara, dedo y celular, el celular 1,5×); Q1b: cámara sobre el mostrador, Lucía entera con el disco y la impresora.
- **M7** La mordida suena: `bsb-masticar` desde 1,3 s (el crujido fuerte cae en el contacto, 33,27).
- **M8** Cama +2/+4 dB en los huecos: extractor de Tano -33, extractores de Lucía -34, heladeras -38/-34, calle -33/-36,
  extractor del cierre -44 (la música ya estaba en el techo de -31).

## BAJA
- **B1** La caja de Facu baja al mostrador en 0,5 s (antes 0,3: el salto de perspectiva parecía un giro).
- **B2** P3b más abierto (fov 52): Tano entero en cuadro. **B3** P4c más abierto (fov 68) y corrido: la cabeza de Facu
  lejos del borde.
- **B4** Textos: chat de Martín 48-58 px en el lienzo; tarjeta del mapa 680×640 con 62/54 px; "y pagás ahí" 74 px; el
  tablero ahora entra entero (sus textos de 52-74 px quedan ~40 px en pantalla).
- **B5** "Comentá MENÚ" entra con fundido desde 0,82× (sin el cuadro chico). **B6** Línea chica final 1,62 s.
- **B7** Sin k-plastico (14,03), sin bsb-rasga (26,86) y sin la impresora del cierre (ni su ticket).
- **B8** `fuentes.md`: zumbido-largo y k-plastico acreditados. **B9** ya estaba en código desde r3.

## Medidas
- `check --json`: 0 errores.
- medir.py: voz ≥ +6 LU en todos los tramos con voz salvo la ventana de 14,0 s (cola de "Cenamos.", la voz terminó a
  13,65; la ventana de 400 ms arrastra -38,7 LUFS: borde de medición, no se oye encimado). medir-huecos.py: todos los
  tramos sin voz entre -33 y -27 salvo 19,5 s (-34,5, la calle de Q1).
- **Render final: 1958 s (32,6 min)** → `renders/pizzeria-pedidos.mp4`; `bash paso10.sh` → `renders/pizzeria-pedidos-final.mp4`
  (40,4 s, -14,2 LUFS integrado, pico -5,8 dBFS, loudnorm lineal). Revisado sobre el MP4 final cada 0,25 s en los tramos de
  A1-A4, P2b, Q1b, Q3/Q3t/Q3s, Q5-Q5c y el cierre, y una hoja completa cada 0,5 s.
- Portada sin regenerar: el cuadro de fondo (P1 a 1,95 s con cámara propia) no cambió en esta ronda.

## Lo que no se tocó / queda flojo
- P2b: el celular del mostrador sigue siendo chico en relación al cuadro (1,5×, se lee como celular, no la pantalla);
  la pantalla del chat se ve en los insertos P2/P4i.
- Q3t: el tercio de arriba del plano del tablero es la pared navy (la tablet entera tiene prioridad sobre llenar).
- medir.py marca la ventana de 14,0 s (cola de "Cenamos.", ya sin voz): artefacto de la ventana de 400 ms.
