# gym-cupo · pulido final (qa-ronda-r3.md)

Duración nueva: **41,77 s** (antes 40,4: +0,9 s el gag de P3, +0,25 s el aire de B1, +0,2 s la toalla de Q3d).
Parte 1 0-17,64 · cartel 17,64-20,38 · parte 2 + cierre 20,38-41,77 (21,4 s, 51 %). Tarjeta CUPO desde 38,73,
línea chica 40,22.

## MEDIA
- **M1 (Q3, 14/14):** cámara nueva (más atrás y a la derecha, fov 85): entran la bici 4 y Sole entera. Los rótulos
  "Majo · 7" y "Sole · 4" pasaron abajo (y 1330, entre las bicis y la burbuja "Catorce…") con una guía vertical que sube
  al pecho de cada una: no cruza ni tapa caras.
- **M2 (toalla al cuello):** ya no salta. Q3d dura 1,1 s: las dos manos suben con la toalla (0,25 s), la toalla del
  cuello aparece arriba agarrada de las puntas y baja 0,3 s hasta el cuello (`TOALLA_SUBE`), las manos la acomodan sobre
  el pecho (0,18 s) y vuelven al manubrio.
- **M3 (el gag de P3):** cámara más atrás (z -4,65, fov 86): se ven las placas 4 y 9 enteras. Las guías enredadas de
  "5 bicis vacías" se cambiaron por un aro rojo apagado con borde navy en cada objeto (aparecen de a uno, se cuentan);
  "Bici 2: perchero" con una sola guía recta que termina en el borde del aro de la toalla. P3 dura 2,45 s (antes 1,55):
  los rótulos quedan ~1,85-2,1 s legibles.
- **M4 (cierre):** plano de 3/4 (la bici, la tarima crema y la pared con la franja, Mauro gira la cabeza a cámara) con
  una luz de cara sólo en ese plano; las manos quedan debajo de la tarjeta. Pelo de Mauro: "corto" con mechones (el de
  pilates-cuota r1) en vez del texturado de casquete, en todo el reel. La línea chica entra en su lugar (opacidad +
  escala), ya no sube cortada por el borde ni pisa la tarjeta CUPO.
- **M5 (Majo en el sofá):** celular con funda navy (antes verde sobre remera verde), más arriba y adelante de las manos;
  sin el cuadro de la pared (asomaba como piquito entre el chip y la burbuja); cámara un poco más abierta y más alta:
  la burbuja ya no roza el pelo.
- **M6 (panel):** las cuatro filas entran enseguida (0,02-0,47 s del plano): no hay tablet en blanco ni mitad vacía.
- **M7 (huecos de sonido):** la música sube en los huecos (espera -36 → -34, cama Q1-Q2 -35 → -33, sala llena
  -35 → -33) con el duck debajo de cada voz; se bajaron 2 dB los SFX del aviso a Sole y la vibración de P5 para
  respetar el techo.
- **M8 (cuadro 0):** rótulo rojo "¿Vendrán?" debajo del chip "Martes, 18:20." en cuanto el contador llega a 22.

## BAJA
- **B1:** 0,25 s más de aire entre el audio de Majo y "Llena, Majo.".
- **B2:** el giro 20 → 1 dura 0,2 s (antes 0,4) y el tic suena en el medio, cuando cambia el número; el ding al final.
- **B3:** guion.txt "Rodri" → "Nico"; fuentes.md sin zumbido-largo y "Nico" en la lista de nombres; en el chat el "Lu"
  repetido de los mensajes anteriores pasó a "Romi". Los comentarios de tres.js también dicen Nico.
- **B4:** las letras del cartel aparecen con opacidad (0,1 s) desde escala 0,35: no queda un glifo suelto ni un punto.
- **B5:** el rótulo del costo, más chico, va arriba del celular (sin el chip) y el chat de 19:01 ya no lleva el audio:
  se lee "Llena, Majo. Perdoná." entero.
- **B6:** portada nueva (t 11,0, `portada-src/fondo-limpio-11.0.png`): cámara más atrás y a la izquierda, sin el reloj (el sello lo tapaba a medias), Graciela
  entera, las cabezas debajo del sello.

## No arreglado / a mirar
- P3 y Q3: abajo de todo asoma una franja crema (el borde de la tarima, la cámara está encima) de ~100 px detrás de
  los rótulos; para sacarla habría que acercar la cámara y se volvía a cortar la bici 4.
- El aro de la mochila (bici 13) roza el costado de la cara del alumno de atrás (bici 14) un instante.
- El chat de 19:01 (P3i) queda con un hueco arriba (se sacó el audio para que se lea "Llena, Majo.").
- "pedalean": sigue la toma 04-mauro-h (el STT oye "pedalear"; ver rondas anteriores), sin tocar.
- Los avisos de `check` de siempre (canvas anidado, driver WebGL, dead_stretch/line_unread de craft: la línea chica
  final 1,5 s). 0 errores.

## Mezcla y render
- `MEDIR=1 node gen.mjs` + `python3 medir.py`: voz ≥ +6,2 LU sobre el resto en todos los tramos de 0,5 s con voz.
  `medir-sfx.py`: máximo sin voz -31,1 LUFS (ningún tramo pasa -31).
- Render: 1892 s (31,5 min, SwiftShader, sin espera de candado; antes esperó ~35 min el render de otro reel) +
  paso10.sh 46 s → `renders/gym-cupo-final.mp4`: 41,77 s, -14,0 LUFS integrado, pico -5,1 dBFS.
- Revisión del final: cuadros cada 0,25 s (3 hojas) y a 30 fps alrededor de la toalla (35,95-36,75), la entrada de
  la tarjeta CUPO (38,5-38,9) y la línea chica (40,1-40,5): sin saltos, sin texto cortado ni pisado.
- Portada regenerada (`portada.png`): sello, "MARTES, 19:00." y "¿HAY LUGAR?" entre y 285 y 1635, nada encimado.
