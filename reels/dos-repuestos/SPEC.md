# SPEC · dos-repuestos (ronda 1: guion nuevo)

**Serie "Dos negocios" · agente de IA · 3D real (Three.js r170 local, `assets/tres.js`) · noche navy liso, mañana
crema liso, cierre verde liso (el canvas 3D pinta el fondo).**
Dos casas de repuestos PEGADAS; la medianera (pilar crema en x = 0, ladrillo por dentro) es la pantalla partida.
Izquierda lo de Néstor (gris apagado), derecha lo de Daniel (navy claro + verde). Gancho: "Dos casas de repuestos. El
mismo mensaje. Solo una le guardó la batería." con reloj 3D 22:00 y las dos fachadas cerradas; el mismo mensaje cae en
las dos (burbujitas), y en "guardó" la reja de Daniel se prende verde con un tilde. "Diez de la noche": Rubén con la
batería muerta (inserto "12 V" con testigo rojo), escribe "Hola, ¿tienen batería 12 V de 75 amperes?…" y la burbuja vuela a
los dos locales. En lo de Néstor queda "Sin leer" (relojito); en lo de Daniel el agente contesta con la medida y
reserva. Rubén: "¿Me contestaron a esta hora?". **"La batería estaba en los dos estantes"**: casa de muñecas con los dos
estantes iguales, la misma batería en los dos (Néstor: etiqueta gris quieta "12 V · 75 A"; Daniel: "RESERVADA · RUBÉN ·
8:00"). "La diferencia": los dos mostradores, recuadro al celular del agente. 8:00: Rubén sale con la suya; remate en
silencio (1,6 s): sube la cortina de Néstor y llega "¡Buen día, Rubén! Sí, tenemos. ¿Pasás?"; Rubén levanta la batería,
Néstor se ríe. Callback de noche: el cartel gira a "TU LOCAL". Tarjeta de cierre.

Voz: partes/01a y 03a (Orus, atempo 1,04) + partes/02 (Rubén, Algenib, la de la ronda 0), pegadas con 0,6 / 0,55 s,
cada tramo llevado a -17 LUFS; pausa de 1,6 s insertada después de "la suya". Las tomas de la ronda 0 quedan en
partes/v1/. 89 palabras, 33,99 s (voz 33,84 + 0,15). `palabras.json` corregido a mano contra silencedetect.
`LIMPIO=1 node gen.mjs && LIMPIO=1 node armar.mjs` arma el fondo de la portada (sin texto ni reloj 3D).

Todo el 3D vive en `assets/tres.js` (una escena; cámara por claves con cúbica monótona; cortes secos en: la camioneta (s02),
el inserto de la batería, Rubén escribiendo (s03), la vuelta a las fachadas detrás de la burbuja, el primer plano de
Rubén (s06), los estantes (s07), la vuelta a la noche (s10) y la tarjeta (s11); el resto es cámara continua). Las escenas HTML (`node gen.mjs` las escribe todas; `LIMPIO=1 node gen.mjs` las deja sin texto para el fondo
de la portada) son solo la capa de arriba: gancho, rótulos con línea guía, recuadro de selección y tarjeta.
`node armar.mjs` escribe index.html, subtítulos (crema con contorno navy, clave en recuadro verde, "mañana." de Néstor
en recuadro rojo apagado), tiempos.md y `assets/tiempos3d.js` (inicios de escena, palabras y la envolvente de la voz de
Rubén para su boca).

Personajes: `assets/personajes.js` (copia del módulo de abren-hoy/dos-bicicleterias) con dos nuevos en el ELENCO:
`nestor` (60, canoso corto, lentes, camisa de trabajo gris con bolsillo y parche crema) y `daniel` (50, barba
entrecana, camisa de trabajo navy claro con parche verde); el módulo suma las opciones `parche` y `bolsillo`.
Rubén sin parpadeo automático en los primeros planos (parpadeos puestos a mano en planos abiertos).

Paleta: navy #0b1220 (noche) · crema #efeee5 (mañana) · verde #5ce611 (cierre, lo resuelto) · fachada Néstor #4a505c,
cortina #6b7280 · fachada Daniel #1f3254, cortina #3a5582 · rojo apagado #c0625a solo para el testigo, "Sin leer",
"sin arranque" y "mañana." de Néstor.

## Escenas (inicio global · qué pasa)
- s01-gancho 0,00 · general de las dos fachadas cerradas; gancho entero; reloj 22:00 abajo; "casas": los carteles
  laten; "mensaje": una burbujita en cada local; "guardó": la reja de Daniel verde + tilde.
- s02-bateria 4,88 · corte a la camioneta (Rubén con linterna, fastidio, mira a cámara); "murió": corte al inserto de
  la batería · rótulo "Sin arranque".
- s03-escribe 8,00 · Rubén tipea de frente · rótulo "Mañana · reparto"; en "reparte" sale la burbuja (legible, al costado
  de su cara) y corte a las fachadas: las dos copias entran por las rejas.
- s04-nestor 9,80 · cortinas al piso; "1 mensaje nuevo" y se apaga · "Sin leer" con relojito; reloj de pared 22:01.
- s05-daniel 12,03 · se abre a los dos mostradores y entra al chat del agente (4 burbujas, con la medida).
- s05b-reserva 14,87 · la batería se adelanta del estante con "RESERVADA · RUBÉN · 8:00" + tilde.
- s06-ruben 16,46 (corte en 16,14) · primer plano: "¿Me contestaron a esta hora?".
- s07-estantes 19,50 · corte a la casa de muñecas: los dos estantes, la misma batería en los dos; en "dos" laten a la
  vez · rótulos "Lo de Néstor" / "Lo de Daniel".
- s08-diferencia 21,38 · los dos mostradores: recuadro verde al celular de Daniel, "Sin leer" al de Néstor;
  "atendiendo": el celular saluda · "● Atendiendo"; push-in.
- s09-manana 24,40 · reloj 22:00 → 8:00, cielo crema; Rubén sale con la batería; remate en silencio (26,4-28,4).
- s10-tu-local 28,48 · corte a la noche, reloj → 22:00; "tu local": el cartel gira.
- s11-llamada 31,40 · tarjeta de cierre (2,6 s, arranca sobre "videollamada").

## Sonido
Del repo: calle (Oper8, CC0) de ambiente bajo de noche y un poco más alto a la mañana, whoosh en cada travelling,
pop por burbuja/objeto, respuesta (mensaje enviado) en las burbujas del agente, vibra (SpliceSound, CC0) y ping en los
mensajes que llegan, tipeo (Caitlin_100, CC0), chime en "reservada", impact en el gancho, golpe en el rebote de las
cortinas, tic/tac-real para el arranque fallido y el reloj, campanita/puerta en la mañana. Techo por efecto -33,3 LUFS
(la voz anda en -17 en este reel). Medido por tramos de 0,5 s sobre stems simulados del index: con la voz sonando
(momentary > -29 LUFS) la voz queda siempre ≥ 6 LU sobre el resto. El render final normaliza a -14 LUFS (paso 10).
Ver fuentes.md: los sonidos CC0 específicos (arranque, cortina metálica, grillos, cubiertos) no se pudieron bajar
(freesound, Openverse y Wikimedia bloqueados por el proxy de la nube): se usaron sonidos reales del repo en su lugar.
