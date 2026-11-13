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

## Ronda 1 de corrección (13-11) · ahora 32,04 s (parte 1 0-19,00 · cartel 19,00-21,40 · parte 2 21,40-32,04; línea chica desde 29,79)
Decisiones del coordinador aplicadas:
- **Se cortó Q5 entero** (Héctor no baja; sin "Viajes de Héctor" ni "Doce." final). La parte 2 cierra con "Era para saber." /
  "Ahora sabés." + la tablet + chip 0 y Q6 (Rubén con el mate detrás de la tablet resuelta + línea chica).
- **Tablet Q4:** tarjeta DENTRO de la pantalla que tapa toda la lista: rojo apagado "Yerba / quedan 2 / Avisando…" (27,92-28,77)
  → verde "Pedido armado ✓" (28,77-29,74, la roja queda abajo mientras baja la verde). Sin "Llega el jueves" ni proveedor.
  descripcion.txt: "te avisa antes de que se acabe y te deja el pedido armado". guion.txt actualizado.
- **Línea final:** "Un sistema te avisa / antes de que se acabe" + scalerics.com (62 px); Q6 2,30 s.
- **Duración 32,04 s:** time-lapses -0,3 s c/u, cartel 2,4 s (narrador +0,15, termina 21,41), P1/P2 más ágiles; **P4 y P5
  fusionados en un solo plano de sección** (Marta llega a otro lugar del mostrador, CLI2, mientras Rubén sube; Walter sale
  caminando después del "No."; nunca se cruzan en el mismo lugar).
- **Remate:** h2 partida en "Ah, no." (h2a, 15,22) y "Era para saber." (h2b, 16,28): 0,5 s de silencio entre las dos
  (+0,2 s respecto de antes), Héctor sonriendo (CARA.feliz) toda la línea.
Arte ALTA:
1. P6b: **sótano más alto (SY -2,35 → -2,70)**; en la tijera Rubén pisa el 2.º escalón en P4 (SY+0,48) y el de arriba en P6b
   (SY+0,71, inclinado): la cabeza queda 10-30 cm debajo de la losa. La tijera se corrió al centro (x -0,32) y la última caja
   (DULCE DE LECHE) quedó en cuadro (x -0,84, arriba).
2. P10: Rubén queda 0,9 m atrás/al costado de Héctor (fuera de cuadro en el push-in; solo entran sus brazos con el casco);
   las manos agarran el casco por los costados; la boina se va apenas empieza a bajar el casco (calza+0,08).
3. P4: Walter no se convierte en Marta: Marta entra antes a otro lugar (7,04-7,34), Walter sale caminando (7,42-7,76).
4. P5→P6: Marta se va (9,19-9,53) y hay un corte a **P6a (9,55)**: contraplano de Héctor en el mostrador preguntando
   ("¿Te queda dulce de leche?", cola a él); a 10,27 corte a Rubén con la caja de sombrero (la burbuja sigue, cola hacia
   afuera a la izquierda, del lado de Héctor).
Arte MEDIA/BAJA: haces de linterna apagados mientras sube o baja la escalera (no atraviesan el piso); P8 nuevo: Rubén solo,
de frente, frasco al costado de la cara (sin Héctor ni mate tapando); sección más cerrada (x 0,45, dist 7-7,7 m: losa cerca
del centro, sótano hasta y≈1790, personajes ~1,3× más grandes); Héctor gira de a poco en P6b (0,28 s) y ya no silba;
P2b arranca con Rubén en cuadro sobre la escalera; manos en los largueros más abiertas (no tocan la cara); manos por fuera
de la caja-sombrero; cinta verde con la misma curva del casco (pegada); polvo más chico, tenue y numeroso; casco del P6 sube
por el costado (no cruza la cara); P10 arranca con Héctor en cuadro y panea a la puerta; "más tarde…" 128 px; haz de Héctor
en la parte 2 corto y tenue; Q3b más de frente (los dos ojos); el mate y el termo no se ven en los contraplanos de Héctor
(P6a, P9, Q3); casco de P7-P8 menos torcido (se ven los ojos); burbujas sin estado "chiquito" (aparecen desde 60 %); "No." y
"¿Azúcar te queda?" ya no se pisan. Graciela: sin cambio (en vertical de espaldas; queda como estaba).
Sonido: r1 = 02-ruben-a (sin clipping); h2 = 08-hector-c partida (limpia); h3 = 09-hector-c ("Yerba", limpia); "Quedan tres."
+0,09 s; golpe del casco a casco[2]-0,12; avalancha: golpes cuando se sueltan (+0,07) y cuando tocan el piso (+0,32-0,56,
más el golpe grande a +0,41); sin campanita al principio; el mate de Q6 suena con el roce de la manga (no toma: sin sorbo).
Mezcla: -14,0 LUFS, pico -4,1 dBFS; voz ≥ +6,2 LU sobre el resto en todos los tramos con voz (6,0 s, cola de "¿Y fideos?" con
la avalancha); el tramo 9,0 marcado "<6" no tiene voz (cola de Marta a -39 LUFS).
Revisión: check --json 0 errores; pasada A (cada 0,5 s desde 0), pasada B (cada 0,5 s desde 0,25) y los 18 cortes a ±0,04 s.
Lo que se corrigió entre pasadas: un crash de renderAt en toda la parte 2 (T.abreH borrado con Q5: la parte 2 quedaba
congelada), el casco del P6 cruzando la cara, el mate de Rubén en los contraplanos de Héctor, el parpadeo en "Ahora sabés.",
la tarjeta verde que dejaba ver la fila roja al bajar, Q6 reencuadrado (tablet entera, cabeza debajo de la línea chica),
la burbuja de P6a que se achicaba antes del corte. Portada: `portada.json` (t 14,9, "Fue al sótano 4 veces." / "Era para
saber.") con fondo limpio `portada-src/fondo-limpio-14.9.png` (Rubén destruido con el frasco).
Planos (s): P1 0 · P2 2,15 · P2b 2,53 · P3 3,68 · P4 (con P5) 5,24 · P6a 9,55 · P6 10,27 · P6b 11,21 · P7 12,98 · P8 14,46 ·
P9 15,14 · P10 17,25 · cartel 19,00 · Q1 21,40 · Q2 23,62 · Q3 25,72 · Q3b 26,71 · Q4 27,82 · Q6 29,74.
Flojo / dudoso: Graciela sigue de espaldas (pelo y espalda); en P10 al entrar (18,2) asoma un costado de la cara de Rubén en
el borde derecho; el dolly de entrada a la sección (5,24-5,7) pasa por un encuadre partido almacén/losa/sótano; en la
sección los personajes siguen siendo chicos (~300 px).

## Ronda 2 de corrección (13-11) · ahora 32,17 s (parte 1 0-19,23 · cartel 19,23-21,63 · parte 2 21,63-32,17; línea chica desde 29,92)
ALTA:
- A1 (lo que "no queda" a la vista): en la parte 1 las góndolas no muestran yerba, polenta ni fideos: cada uno de esos
  paquetes tiene un sustituto (lata de color o paquete neutro) en el mismo lugar, y en la parte 2 vuelven (PEDIDOS /
  SUSTITUTOS en tres.js). En el sótano las cajas dicen ACEITE, ARROZ, LATAS, JABÓN, HARINA, FÓSFOROS, VELAS; solo quedan la
  POLENTA abierta y vacía, el DULCE DE LECHE (el frasco que "queda uno") y la que le cae en la cabeza, que ahora dice
  **"VACÍA"** (también la de sombrero).
- A2 (el casco por la cara, 10,36): el casco sale del piso a la DERECHA de Rubén (x 0,84, por fuera del hombro), lo sube
  la mano derecha por afuera, pasa por arriba de la cabeza y baja con las dos manos a los costados. La caja de sombrero se
  levanta derecho para arriba con las manos por fuera y se tira para atrás (pasa por detrás de la cabeza, se lee "VACÍA").
  Las dos cosas pasan ya en el plano de Rubén (sacaCaja p6+0,06; casco p6+0,36..0,86).
MEDIA:
- M1: el casco viaja por arriba hasta quedar sobre la boina y baja a la vista (0,45 s); la boina se aplasta (escala y
  0,25) mientras baja y se va recién con el casco puesto.
- M2/M6: cortes cortos N2 (7,30) y N3 (9,35) a Rubén asomado en la trampa para los "No." (telaraña / caja de sombrero,
  primer plano), burbuja arriba a la izquierda; la sección vuelve en P5 (7,84) con Marta. Ningún plano pasa de 3 s.
- M3: "Un" del cartel ya en el primer cuadro (narrador +0,15).
- M4: el dedo de Rubén toca el marco de la tablet al lado de la fila (no tapa el "3"); tablet menos inclinada (-0,5).
- M5: chip "Viajes al depósito: 0" desde 29,08 hasta el final (3,1 s, también en Q6); la línea chica bajó a top 205.
- M7: r1 = 02-ruben-c ("ya me fijo", flat factor 0). M8: Marta en 3/4 hacia la cámara (delantal verde a la vista,
  la cabeza a Rubén) y la cola de su burbuja a ella. M9: Q6 más abierto.
BAJA: r3 recortado desde 0,22 s (sin clic ni silencio; "queda uno" verificado); m1 -1,5 dB (sin 0 dBFS); pasos en las
salidas de Walter y Marta; la caja de sombrero se ve en las manos; polvo de los hombros en manchas chatas grisáceas (no
púas); la burbuja de Graciela en Q1 abajo, sobre el mostrador, con la cola a ella (no tapa a Rubén); "Ya me fijo." en P2
arriba (sin tapar la cara); burbujas visibles desde 75 % (sin la versión chiquita); docs: fuentes.md sin "Llega el
jueves", voces.md con las tomas nuevas, coma en descripcion.txt.
Mezcla: -14,0 LUFS, pico -4,0 dBFS. Voz ≥ +6,2 LU en todos los tramos con voz audible; los dos tramos marcados "<6"
(2,0 y 14,5 s) son colas de voz a -35/-38 LUFS (fin de "Ya me fijo." y de "Queda uno.") bajo el whoosh y el ta-dá.
Revisión: check 0 errores; pasada A cada 0,5 s desde 0, pasada B desde 0,25, los 21 cortes a -0,04/+0,01/+0,04 s y cuadro
por cuadro (1/30) la caja en la cabeza (P5), la caja de sombrero y el casco (P6) y el casco a Héctor (P10). Entre pasadas
se corrigió: la caja AZÚCAR del sótano que se leía antes de que Marta pregunte (ahora VACÍA), la caja de sombrero que
cambiaba de tamaño y atravesaba la cabeza al salir, el casco que rozaba el brazo al subir, la burbuja de "No." sobre la
cara en N2/N3, la boina que desaparecía antes de que bajara el casco.
Planos (s): P1 0 · P2 2,15 · P2b 2,53 · P3 3,68 · P4 5,24 · N2 7,30 · P5 7,84 · N3 9,35 · P6a 9,77 · P6 10,49 · P6b 11,66 ·
P7 13,43 · P8 14,69 · P9 15,31 · P10 17,38 · cartel 19,23 · Q1 21,63 · Q2 23,81 · Q3 25,91 · Q3b 26,90 · Q4 28,01 · Q6 29,87.
Flojo: Graciela de espaldas; en P6 el casco asoma 1-2 cuadros en el borde izquierdo al subir; el casco al calzarse tapa un
poco los ojos mientras Rubén baja la cabeza (11,2); la boina aplastada asoma un borde bajo el ala 0,1 s; en la sección los
personajes siguen chicos (~300 px).
