# taller-service · revisión de sonido, ritmo, guion y datos · ronda 2 (revisor independiente)

Material: renders/taller-service-final.mp4 (46,08 s) y assets/audio/stem-voz.wav, stem-resto.wav, mezcla.wav (13:12).
El audio del mp4 es la mezcla.wav (diferencia ≤ 0,3 dB por ventana de 50 ms, sin desfase). Medido con ffmpeg
ebur128/astats, medir.py, medir-sfx.py y numpy (RMS cada 50 ms de cada stem). Cuadros cada 0,25 s con el tiempo
impreso, tiras a 10 y 30 fps en los puntos dudosos. Trabajo en el scratchpad qa-taller-r2-son/. No se escuchó: todo
por niveles, envolventes y cuadros.

## Números
- Integrado **-14,0 LUFS** (pide -14 ±0,5: OK). True peak **-3,0 dBTP** (≤ -1,5: OK). LRA 5,7 LU. Flat factor 0, sin clipping.
- **Voz contra música + SFX** (medir.py, ventanas pareadas de 400 ms): mediana **+23,7 LU**; único tramo < 6 LU = 35,5 s (+2,8).
  **Es un artefacto de medición, no un defecto.** Con RMS cada 50 ms: la voz w5 ("¡Óscar!…") arranca en 35,85; de 35,50 a
  35,80 la voz está en silencio absoluto y suena solo auto-entra + puerta. La ventana de 400 ms que termina en ~35,9 tiene
  ~60 ms de voz. Con la voz hablando (35,90-36,25) la voz está 25-31 dB arriba del resto. Ningún otro tramo con voz baja de +12.
- **SFX/cama sin voz** (medir-sfx.py sobre el mp4): máximo **-30,9** en 14,0 y 27,5 s; -31,0/-31,1 en 4,5 / 27,0 / 28,0 /
  32,5. Pasan el techo de -31 por 0,1 dB: dentro del error de medida, lo doy por bueno.
- Cierre: plano C 42,95-46,07 = **3,12 s** (≤ 3,3: OK). "SÉRVIS" en 43,31-43,71 y la palabra SERVICE entra en 43,31 (pop en
  43,33): en sincronía. La voz termina en 45,61; quedan 0,46 s de cola con la música en fundido (-31 → -39 al último cuadro). No
  choca con el final ni corta seco.

## Lo marcado en la ronda 1, verificado
- r1 sonido 1 (hueco 26,6-30,0 muerto): **mejorado**. El tramo sin voz (26,45-30,10, 3,65 s) ahora está en -30/-35 (antes
  -32/-37) con el aviso, Reservar, el ding y los tics encima. Sigue siendo el tramo sin voz más largo (ver M2).
- r1 sonido 2 (pausa muerta antes de "Volviste"): **resuelto**. 13,1-14,85 queda en -28/-33 (diésel en ralentí + calle).
- r1 sonido 3 (montaje P2 bajo): **resuelto**, -31/-37 con la música acelerada y los tics; los tics caen en el cambio de mes.
- r1 sonido 4 (puerta y motor sin acción): **resuelto**, suenan en off ya en el montaje (4,01+).
- r1 sonido 5 (huecos -30,4/-30,1): resuelto (-30,9 máx., ver arriba).
- r1 sonido 6 (tics del panel adelantados): **resuelto**. El contador pasa a 9 en 29,25-29,28 y a 10 en 29,37-29,38 (30 fps);
  los tics en 29,285 y 29,375; el ding en 29,56. Clavado.
- r1 sonido 7 (trapo y pop del rollo sin rollo): **resuelto**, Maxi entra con el rollo verde visible 19,25-20,0.
- r1 sonido 8 (llaves en el primer plano de Óscar, 37,5): sigue, pero a -48. Bajo, no molesta (B3).
- r1 sonido 10 (cierre 3,11 s): sigue en 3,12, dentro del límite.
- r1 sonido 11 (Walter de golpe en Q4): resuelto, entra manejando y baja; puerta en 35,59 con la acción.
- r1 guion A1 ("Volvé"): no se puede escuchar; el constructor eligió 01-oscar-e por formantes, coincide con lo que medí en r1.
  Sigue la recomendación de que alguien lo escuche una vez antes de publicar.
- r1 guion M2 (mes de Q2): **resuelto**, chip "Julio." y cuentakilómetros 94.800.
- r1 guion M3 (dato de "Cuatro veces"): **resuelto**. "Último service: 85.000 km" queda arriba desde 13,15 y el 125.000 abajo
  de 13,77 a 14,82: los dos números juntos 1,05 s antes del remate.
- r1 guion M4 (38 al año contra 41 por mes): **resuelto**, panel "Les toca este mes · 12", "Reservaron: 8 → 10 de 12".
- r1 guion B1/B3/B8: resueltos ("Setiembre.", sin el segundo "Noviembre.", descripción con verbo).
- r1 guion B6 (Maxi pregunta con el elevador ocupado): resuelto con Q3m (Maxi de cerca mirando el mate) y el giro en Q3g.

## Defectos

### Gravedad alta
Ninguno.

### Gravedad media
**M1 · 18,05-18,22 s · no hay pausa antes de "Ponele otro papelito" (el remate del remate).** "Cuatro veces." termina en 18,05,
el corte a P6 es en 18,16 y Walter arranca en 18,22: **0,15 s** entre los dos remates. La pausa antes de "Cuatro veces." sí está
(0,40 s, 16,70-17,10, con el acento grave), pero después del primer remate no queda ni un instante de la cara seca de Óscar para
que el chiste aterrice, y el "Ponele otro papelito" se pisa con la risa. Es el remate que más se comparte. Qué cambiar: dejar
P5 sostenido 0,45-0,6 s más después de "Cuatro veces." (Óscar quieto mirando, sin sonido nuevo; la calle de fondo alcanza) y
correr P6 y w3 lo mismo. Para no estirar el reel (ya está en 46,1 s), sacarlo de Q2 (el chat dura 1,94 s y se entiende en
~1,6) o de Q3 (panel 1,5 s).

**M2 · 26,45-30,10 s · 3,65 s sin voz en el corazón de la solución (Q1i cola + Q2 + Q3).** Ya no suena muerto (-30/-35 con
efectos), pero sigue siendo el tramo más largo sin nadie hablando, justo cuando se ve el producto, y llega después de 6 s de voz
seguida. Con el techo de -31 no se puede subir más la cama. Si M1 saca tiempo de Q2, este hueco también se acorta. Opcional:
devolver una línea muy corta de Walter sobre el chat (la w4 ya grabada pesa 1,6 s; si suena bien el "olvidando").

### Gravedad baja
**B1 · 42,80-43,01 s · "El papelito ahora te escribe." pegado al "Comentá SERVICE".** El callback de la parte 2 termina en 42,80 y
el cierre arranca en 43,01 (0,21 s, con el whoosh en 42,87 en el medio). Una respiración de 0,25-0,3 s más en Q5i (o empezar o7
en ~43,2) le daría peso al remate. El cierre seguiría en ≤ 3,3 s si se recorta la cola final (hoy 0,46 s).

**B2 · 9,93-10,63 s · P4, la grúa casi quieta con bip-bip de marcha atrás y siseo de humo.** En los cuadros a 10 fps la grúa
apenas se mueve y el humo es una mancha gris tenue detrás del auto; la plancha que se inclina (neumática en 10,58-11,18) cae
casi toda en P4w, donde no se ve la plancha. El sonido promete más acción que la que hay. Más del arte que del sonido: o que la
grúa termine de entrar de culata en esos 0,7 s y el humo se lea, o bajar el siseo y la neumática 3-4 dB.

**B3 · 37,5 s · llaves en Q4b (primer plano de Óscar, la llave no se ve).** A -48 no molesta; se puede sacar.

**B4 · duración 46,1 s** (CLAUDE.md: con diálogos hasta ~45 s). Al límite; con M1 compensado no crece.

**B5 · 14,0 y 27,5 s · huecos a -30,9 LUFS** (techo -31). Diferencia de 0,1 dB, despreciable; si se rehace la mezcla, bajar
0,5 dB la calle de P4b y el auto-pasa de Q2.

## Ritmo y burbujas (sin defectos)
- Cada burbuja entra 0,04-0,1 s antes de su voz y la segunda mitad de los remates entra con la voz: o1 "Volvé a los…" 0,9 / 23,5;
  "Tienen el papelito" 8,96; "Cuatro veces." 17,0 (voz 17,10); "Así me gusta." 38,4; "Tenían el aviso." 33,7. Los textos de las
  burbujas coinciden con lo que se dice ("service" en pantalla, "sérvis" en la voz, a propósito).
- SFX con su acción: cinta 0,02 (papelito); tics de mes 4,04/4,60/5,16/5,72 con el cambio de chip; sorbo 6,34 y 30,01 con el
  mate; glitch en los 38 (8,65); cinta al despegar 13,45 con la mano que levanta el papelito (13,4-13,7, tira a 10 fps); tic +
  glitch en 125.000; stinger y narrador sobre el cartel; toque/ding en "Guardado ✓" 25,73; vibración + notificación y Reservar →
  "Turno reservado ✓" 27,67/27,81; ding en "Martes: 4 de 4 turnos ✓" 32,24; auto que entra, puerta 35,59; notificación 40,89 con
  el celular de Q5i; pops de SERVICE y de la línea chica.
- Pausa antes de "Cuatro veces.": 0,40 s con el acento grave: bien. Pausa "¿hoy no viene nadie?" → giro → "Ya vinieron.": ~1,1 s
  con la revelación de los autos: bien.
- Ningún plano de más de 3,5 s sin cambio visual; los planos largos (P1 4,0 s, P5 3,3 s) cambian burbuja o personaje adentro.

## Guion y datos
- **SERVICE**: en la voz ("Comentá SÉRVIS…", 43,01), en pantalla (tarjeta 43,31-46,07) y en la 1.ª línea de descripcion.txt. OK.
- Rubro en el cuadro 0: "TALLERES / MECÁNICOS" + "Marzo, 18:00." desde t = 0. OK. Solución + cierre 22,64-46,07 = 51 %. OK.
- **Números coherentes**: papelito "PRÓXIMO SERVICE 95.000 KM"; ficha "12/03 · 85.000 km · Próximo 95.000 km o en 6 meses";
  montaje 91.000 (Mayo) → 95.000 (Julio) → 108.000 (Setiembre) → 125.000 (Noviembre); "Último service: 85.000 km" + 125.000 →
  "Cuatro veces" (40.000 = 4 × 10.000); Q2 "Julio." con 94.800 y "unos 95.000 km"; turno jueves 9:00 = panel "Reservó · Jue 9:00"
  = chip "Jueves, 9:00."; 95.300 al llegar; "Service hecho · 95.300 km · Próximo: 105.000 km"; panel 8 → 10 de 12; "Martes: 4 de 4
  turnos ✓"; "38 · $ 247.000" (6.500 por service, del caso). Todo cierra.
- **Ortografía** de todos los textos visibles (chips, burbujas, rótulos, papelito, ficha, chat, panel, aviso, cartel, tarjeta,
  línea chica, portada): sin faltas. Tildes bien (Volvé, kilómetros, mecánico, ¿hoy…?, Óscar, Último, Próximo, Reservó, día, en
  línea, Tenían, Así, ponés, Comentá, cómo, más, MECÁNICA ÓSCAR, VOLVIÓ EN GRÚA), signos ¿¡ completos, sin rayas largas ni emojis.
- Voseo: "Volvé", "Ponele", "¿No me ponés…?", "Comentá", "te mando", "Vos sos". Nada de "bot" ni de "agente de IA" (es la ficha +
  aviso). Sin marcas de autos ni logos; "WhatsApp" solo como texto en la ficha, el chat con cabecera navy y llave verde (no imita
  la interfaz de WhatsApp). El cartel no dice Scalerics.
- descripcion.txt: Comentá SERVICE en la 1.ª línea, 2 párrafos que explican el servicio, la línea de videollamada y 6 hashtags. OK.
- Portada: sello TALLERES, "Volvió en grúa." / "¿Hace poquito?", Walter rascándose la cabeza con la grúa y el cartel en la mitad
  de arriba, fondo navy y verde. OK.

## ¿Un dueño de taller se lo manda a otro?
Sí. El papelito que se come el sol, el "volvé a los diez mil" y el "si le hice el service hace poquito" son del rubro; "Ponele otro
papelito, así no me olvido" es el que se manda. Con M1 (una pausa real antes de ese remate) pega más fuerte.

## Resumen
0 altas, 2 medias (M1 la pausa antes de "Ponele otro papelito"; M2 el tramo de 3,65 s sin voz en Q2-Q3, ya no muerto), 5 bajas.
Mezcla en norma: -14,0 LUFS, -3,0 dBTP, voz +23,7 LU de mediana; el +2,8 de 35,5 s es un artefacto de la ventana (verificado
con RMS de 50 ms). Todo lo de la ronda 1 de sonido y de guion quedó resuelto, salvo escuchar el "Volvé" una vez.
