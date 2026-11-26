# dist-camion · revisión de sonido, ritmo, guion y datos · ronda 2 (revisor independiente, 26-11)

Material: `renders/dist-camion-final.mp4` (45,97 s, 1379 cuadros) y los stems `assets/audio/stem-voz.wav` / `stem-resto.wav`
(misma duración que `mezcla.wav`; envolvente de la mezcla contra el MP4 con correlación 0,9999 en desfase 0, y contra
voz + resto 0,99: los stems son de esta versión). Sin regenerar nada ni abrir Chrome. Scripts y cuadros en el scratchpad
(`qa-camion-r2-son/`).

## Veredicto
Pasa en sonido. Un defecto de datos de gravedad media (el panel de las 10:50 debajo del "Martes, 9:40." en Q1). Lo demás
es bajo. Un dueño de distribuidora se lo manda a otro: **sí** ("Es un camión, Nico. A algún lado llega." y el remito de "un
señor que pasaba" son exactamente eso; los callbacks de la parte 2 cierran).

## Medidas (pasan)
- Integrado **-13,9 LUFS**, true peak **-2,7 dBFS**, pico de muestra -2,78 dB, sin clipping. LRA 5,0 LU.
- Voz sobre el resto, tramos de 0,5 s (momentánea pareada, `medir.py`): mínimo **+12,3 LU**, mediana 22,9. Mi medida
  propia por RMS de 50 ms en cada tramo con voz: voz ~-8 a -12 dBFS, resto ~-29 a -38 dBFS (≥ 18 dB en la mediana de cada
  tramo). Ningún tramo con voz por debajo de 6 LU.
- Sin voz (`medir-sfx.py` sobre el MP4 final): máximo **-30,9 LUFS M** (24,0 s). Ver bajo 4.
- Cola: la voz termina en ~45,55 y queda 0,4 s de música a -35 dBFS que se funde a cero en 45,95. El loop ya no choca.
- Cierre: tarjeta CAMIÓN 42,78-45,97 = **3,19 s** (≤ 3,3); el pop de "CAMIÓN" cae sobre la palabra (voz 42,80).

## Lo de la ronda 1, verificado
- r1-1 pausa antes de "Uno que pasaba.": **resuelto**. "¿señor?" termina en 18,50, "Uno" arranca en 19,03 (0,53 s).
- r1-2 "¿Qué… señor?": **resuelto en tiempo**. "¿Qué" 17,11-17,45, silencio 0,22 s, "señor" 17,68-18,50. Con 0,22 s el
  salto de tono que marqué en r1 queda como el "…" del globo; confianza media-alta en que suena natural (no lo escucho).
- r1-3 voz pegada al final: **resuelto** (0,4 s de aire).
- r1-4 narrador del cartel: **resuelto**. La voz termina en 22,45 y el texto "más tarde…" sigue entero hasta 22,5, cuando
  abre el iris.
- r1-5 Q4r sin cabina: **resuelto** (ómnibus por dentro + pop en "Parada 15 de 18").
- r1-6 pausa antes de "A algún lado llega.": **resuelto**, 0,43 s acústicos (10,70 → 11,13), con el globo en dos tiempos
  justo en 11,13.
- r1-7 sorbo de mate: sacado. r1-8 firma: 1,0 s, cubre el trazo. r1-9 agujeros de Q1i: no están. r1-10 pop en "Cafetería
  Marta": está (14,04).
- Pausa después de "¿Adónde?" con el golpe del mate: 0,63 s (8,65 → 9,28). Bien.
- Burbujas contra la voz: todas entran entre -0,1 y 0 s de su línea y el texto coincide con lo dicho (revisé cuadro a
  cuadro "Vos." en 36,2 con la voz en 36,25, y los globos en dos tiempos de 11,13, 25,8 y 40,24).

## Defectos, por gravedad

### Media
1. **22,9-24,0 · Q1 "Martes, 9:40." con el panel de las 10:50.** Bajo el chip "Martes, 9:40." el monitor de la oficina ya
   dice "14 de 18 ✓", "Parada 14 · Panadería Nelly ✓ 10:31", "Parada 15 · Súper Héctor · llega 10:52", y el celular del
   escritorio marca **10:50**. A las 9:40 no puede haber una entrega hecha a las 10:31, y en ese mismo momento Graciela
   recibe "Sos la próxima parada" pero el panel dice que la próxima es Héctor (y Graciela no figura). El que mira se da
   cuenta porque el chip de la hora está pegado arriba. Cambio: en Q1 (P2 → T.q3) el panel en el estado de la mañana
   (por ejemplo "4 de 18 ✓", "Parada 5 · Rotisería Graciela · llega 9:52", En camino 1, Pendientes 13) y el celular/reloj
   del escritorio en 9:40; el estado "14 de 18 / 10:50" recién desde Q3 (29,28). Si no da el tiempo, sacar el chip
   "Martes, 9:40." de Q1 no alcanza (Graciela sigue siendo "la próxima" con Héctor marcado como próxima).

### Baja
2. **16,42-17,11 · "Un señor." → "¿Qué… señor?" con 0,06 s.** "señor." del Ruso termina en 17,05 y "¿Qué" arranca en 17,11.
   Rubén lo pisa sin el instante de incredulidad que hace el chiste ("Un señor." · beat · "¿Qué… señor?"). Cambio:
   r7 +0,25-0,3 s (corre todo lo que sigue; hay 0,4 s de aire al final que se pueden usar, o se recorta de P6d).
3. **41,33-42,31 · "Ni uno." sin aire alrededor.** 0,13 s después de "¿Pasó algún señor?" (está bien seco) pero sólo 0,26 s
   entre "Ni uno." (termina 42,05) y "Comentá" (42,31): el remate de la parte 2 no llega a aterrizar y la voz del CTA lo
   pisa. Cambio: r10 +0,3 s (DUR +0,3; la tarjeta sigue en ~3,2 s porque arranca en "CAMIÓN"). Opcional: deja el reel en
   46,3 s y la parte 2 sube un poco su proporción.
4. **24,0-24,5 · -30,9 LUFS M sin voz** en el inserto del aviso (noti + ding de "Sos la próxima parada" + rotisería): pasa el
   techo de -31 por 0,1 (en `mezcla.wav` da -31,0; el loudnorm final suma ~0,1-0,2). Cambio: `ding(T.aviso2, -42)` o
   `noti(T.aviso1, -41)`.
5. **22,55-22,80 · hueco de ~0,25 s a -47/-55 dBFS** mientras abre el iris hacia la rotisería: la música del cartel ya se fue
   (fin 0,3 desde P2) y el whoosh de P2 - 0,2 a techo -42 casi no se oye; la rotisería entra recién en P2 (22,91) aunque el
   iris ya la muestra desde 22,5. Cambio: whoosh del iris a -38/-39, o `rotiseria(P2 - 0,4, ...)` con fundido.
6. **42,3-45,97 · cierre: Rubén sostiene el mate a la altura de la sien**, con la bombilla pegada al costado de la cabeza
   (se ve en todos los cuadros de la tarjeta). Lee como si se rascara la cabeza con el mate. Para el director de arte:
   el mate a la altura del pecho o llevándolo a la boca.
7. **Duración 45,97 s** (techo ~45 con diálogos) y parte 2 + cierre 23,02 s = **50,1 %**: justo en el borde de "la mitad o
   más". Si se aplican 2 y 3 sumando a la parte 1, cuidar que no baje del 50 % (2 suma 0,3 a la parte 1: compensarlo
   recortando P6d o los 0,4 s de aire de Q4r/Q5).
8. **"Vos. No un señor." (36,25-37,55)**: misma toma que r1; el "un" está en la señal pero es corto (~0,1 s). Con el globo
   "No un señor." se entiende; confianza ~75 % de oído. Sin cambio salvo que alguien lo escuche y oiga "No, señor".
9. **guion.txt, corchetes internos desactualizados**: la cabecera dice 45,93 / cartel 20,42-22,91, pero los corchetes de cada
   plano siguen con los tiempos de r1 (cartel "19,78-22,03", "parte 2 · 22,03-44,97", "cierre · 41,43-44,97", "tarjeta desde
   41,97"). Solo documentación.

## Guion y datos (pasan)
- **CAMIÓN**: en la voz (r10, 42,80), en pantalla (tarjeta, recuadro verde) y en la primera línea de `descripcion.txt`.
  Línea de videollamada antes de los hashtags. 6 hashtags.
- **Números coherentes** (salvo el defecto 1): 19 llamadas (contador 7 → 19 en 4,69) y "diecinueve llamadas antes de las
  diez" en la descripción; 14 llamadas perdidas a las 9:42; remito $ 38.400 + 30.000 + 18.000 = **$ 86.400**, igual en
  el de papel y el digital; panel 14+1+3 = 18 y después 15+1+2 = 18 (cambia en ~38,85, con el ding en 38,87); "Parada 15 de
  18" en la hoja de ruta, el remito y el panel; Héctor "llega 10:52", "En dos minutos" con el celular en 10:50 en Q3,
  "Entregado ✓ 10:52"; Marta 12:00-13:00 en su aviso y "12 a 13 h" en el panel, coherente con "Al banco voy a la una" y con
  la persiana de las 12:10 de la parte 1; Q5 "18 de 18 · 18 remitos con firma y foto · 0 cajas de vuelta".
- **Ortografía de todo lo visible** (cuadros cada 0,5 s y tiras): "DISTRIBUIDORAS", "Martes, 9:40.", "Rotisería Graciela ·
  pidió para las 10", "Llamadas: ¿y el camión?", "Maneja. No atiende.", "14 llamadas perdidas", "Jefe, ¿dónde está el
  camión?", "¿Adónde?", "Es un camión, Nico. / A algún lado llega.", "Fui al banco. ¡No sabía a qué hora venían!",
  "Cafetería Marta · vuelve al depósito", "Viaje perdido · flete $ 4.200", "3 horas de teléfono", "¿Y esta firma?",
  "Recibió:", "¿Qué… señor?", "Uno que pasaba.", "Súper Héctor llamando…", "Una hoja de ruta más tarde…", "Hola, Graciela.
  Tu pedido llega hoy entre 10:00 y 11:00", "En camino · Sos la próxima parada", "Aviso automático a cada cliente", "Ah. /
  Soy la próxima.", "Al banco voy / a la una.", "Entregas de hoy", "Todo el reparto en una pantalla", "Hoja de ruta · Martes
  · 18 entregas", "¿Firmo yo?", "Firmá acá", "Entregar", "Entregado", "Firma y foto en el celular", "¿Y hoy? / ¿Pasó algún
  señor?", "Ni uno.", "Comentá / CAMIÓN / y te mando cómo funciona para tu distribuidora", "Aviso de entrega, hoja de ruta
  y remito firmado en el celular · scalerics.com". Sin errores, sin rayas largas, sin emojis.
- **Marcas**: ninguna en pantalla; WhatsApp solo nombrado en la descripción. Sin "bot"/"chatbot" en ningún texto.
- **Voseo**: "Firmá", "Comentá", "Sos". El "te mando" del cierre en singular es el de la plantilla de "ANTES QUE TODO".
- **Cartel**: no dice Scalerics; nombra la solución. Producto solo en la línea chica y la descripción.
- **Portada**: "Martes, 9:40." / "¿Por dónde viene?" / sello DISTRIBUIDORAS, Graciela llenando la mitad de arriba desde el
  fondo limpio, sin textos del video asomando. Cumple.
- Ritmo: ningún plano pasa 3 s sin un cambio (P5b 3,46 s cambia de globo en 11,13; P6a/P6b sin voz cambian cada ~0,3 s).
