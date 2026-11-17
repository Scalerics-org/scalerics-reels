# corralon-portland · QA ronda 2 (sobre el render de 39,5 s)

## Director de arte (renders/qa-arte-r2/: f/NNNN.png = t/0,25, big/, cuts/)
Pendientes de la ronda 1:
- 5 · pausa del costo (12,5-13,4 s, f0050-0053): el celular es una franja oscura cortada abajo a la izquierda; pila ~25 % del ancho, tercio de arriba navy vacío, hombro de Gustavo cortado a la derecha.
- 7 · cuadro 0 (big/r.png): celular acostado, tapado por el chip y la cola de la burbuja, "20/21 sin leer" ilegible; fila = un casco cortado; el tubo parece una manija con dos aros a la altura del hombro; 30 % de abajo vacío.
- 13 · "Era de la casa" (f0054-0058): la boca cerrada sigue como barra marrón tipo bigote; cabeza y lápiz tocan el borde derecho.
- 14 · Q4g 34,8-36,1 s (f0139-0143): Gustavo cortado a la izquierda (medio chaleco y brazo fuera).
- 15 · insertos como tarjeta plana con sombra corrida.
- 17 · 19,4-19,55 s (cuts/c_18_19.4.png): el iris del cartel abre desde un punto negro y muestra la cara en un círculo (CLAUDE.md: nada de transiciones que arrancan como agujero negro). Cambiar por otra salida del cartel (barrido verde, zoom-out del verde, corte con flash crema).
- 4 (baja) · en "37…"/"38…" la mano señala a la altura de la nariz (f0019, f0021).
Nuevos:
- N1 · ALTA · 12,5-13,4 s (f0050-0053, big/nuca.png): Gustavo de espaldas: pelo casquete con borde recto, 40 % de la nuca piel pelada, el lápiz sale horizontal del pelo y no de la oreja. Pelo hasta la nuca con borde irregular, o cámara a 3/4.
- N2 · MEDIA · 19,6-20,5 s (Q1, f0078-0081, big/o.png): el chip "LUNES · 6:45" tapa boca y mentón; el celular del soporte tapa el cachete; monitor cortado a la derecha.
- N3 · MEDIA · 0-4,9 s: celular del cuadro 0 ilegible; el inserto de 4,9 s dice "20 sin leer" después de haber pasado a 21 (el contador baja): arrancar el inserto en 21.
- N4 · MEDIA · 22,3-25,4 s (f0091-0101): el brazo sale por el borde izquierdo y no se ve el tubo; en "Ya le dijo." no hay celular en cuadro (mira a la nada); mancha navy abajo a la izquierda; 40 % de abajo mostrador vacío.
- N5 · MEDIA · 32,97-33,17 s (f0132): el inserto de Q4 arranca ~6 cuadros con el chat vacío y después todo aparece de golpe: que entre ya armado.
- N6 · BAJA · 12,5-13,4 s: "27 mensajes sin contestar" sin línea guía.
- N7 · BAJA · 0,0 s: la tarjeta del audio de Beto entra a 0,25 s; tiene que estar en el cuadro 0.
- N8 · BAJA · 3,6-4,5 s: la burbuja "¡Ya te digo!" sobre el pizarrón deja asomar restos de precios ("00", "80").
- N9 · BAJA · 7,25-9,7 s (P3): la cara de Gustavo toca/corta el borde derecho; 40 % de abajo mostrador liso.
- N10 · BAJA · 15-16,6 s: Tito con los puños cerrados (sin dedo de "una"); tercio de arriba vacío.
- N11 · BAJA · ~32 px: "Materiales Gustavo" y las horas en los insertos de P2; las píldoras de respuesta de Q2.
- N12 · BAJA · 36,1-39,5 s: Sofi sin nada que diga videollamada (nombre, botones, logo); la tarjeta "Comentá OBRA" tapa el borde del celular y el pelo; buzo navy sobre fondo navy.
- N13 · BAJA · 28,2-31,7 s (Q3): el gorro de Tito de espaldas llena el 40 % derecho cortado; las cejas de Gustavo dan enojo y no media sonrisa.

## Sonido y guion (renders/qa-r2/) · apto, con:
- B1 · MEDIA · sin el cierre de Sofi la solución funcionando es el 41,8 %. Recortar ~1,5-2 s de la parte 1 (P1 de 4,6 a ~3,6 s; apretar P3 "Beto espera / Es de la casa" y P4) sin tocar la pausa de 1,29 s ni el remate; o alargar un poco Q2/Q4.
- B2 · MEDIA-BAJA · pozos sin voz (escalada 4,5-7,5; Q2 25,5-28; Q3m 32-33 s a -25/-30 LUFS): la música puede subir a ~-28 solo ahí, y una capa continua (mensajes encimados, tics más fuertes).
- B3 · BAJA · Q3 28,16-31,76 s mismo encuadre 3,6 s: push-in leve o corte al llegar la bolsa.
- B4 · BAJA · 34,83 s motor del camión sonando en el corralón: sacarlo o pasarlo a 33,2 s sobre la foto.
- B5 · BAJA · cierre 3,38 s: sacar los 0,3 s de aire final.
- B6 · BAJA · "Beto espera" se oye confuso: si sobra tiempo, regenerar g2 ("Beto, espera").
- B7 · BAJA · 25,35-25,45 s la burbuja "Ya le dijo." sigue en el primer cuadro de Q2.
