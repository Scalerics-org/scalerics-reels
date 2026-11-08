# SPEC · dos-repuestos

**Serie "Dos negocios" · agente de IA · 3D real (Three.js r170 local, `assets/tres.js`) · noche navy liso, mañana
crema liso, cierre verde liso (el canvas 3D pinta el fondo).**
Dos casas de repuestos PEGADAS en la misma vereda; la medianera (pilar crema en x = 0, muro de ladrillo por dentro) es
la pantalla partida. Izquierda, lo de Néstor: gris apagado. Derecha, lo de Daniel: navy claro con filete verde. Arriba
de cada local, la casa del dueño (ventana con el comedor iluminado). A las 22:00 las dos cortinas están bajas; a Rubén
(su camioneta del reparto en la avenida, capó abierto, batería con testigo rojo) se le murió la batería y les escribe a
las dos. Las cortinas bajan al piso (corte de casa de muñecas): en lo de Néstor el celular se prende, "1 mensaje
nuevo", y se apaga (Sin leer, el reloj de pared marca 22:01); en lo de Daniel el agente de IA contesta en su celular
(chat de marca hecho de cero) y reserva: una batería se adelanta del estante con la etiqueta "RESERVADA · RUBÉN · 8:00".
Primer plano de Rubén: "¿Me contestaron a esta hora?". Los dos dueños cenan iguales en sus ventanas (levantan el
tenedor a la vez). Zambullida a los dos mostradores: recuadro verde sobre el celular de Daniel, que "saluda".
8:00 (reloj 3D 22:00 → 8:00, cielo crema, mismo encuadre del cuadro 0): Rubén sale de lo de Daniel con su batería;
REMATE en silencio (1,4 s): la cortina de Néstor sube, le llega "¡Buen día! ¿Qué necesitabas?", Rubén levanta la
batería y Néstor se ríe (nadie queda mal). Callback: vuelve la noche (corte), el reloj vuelve a 22:00 y el cartel
"REPUESTOS DANIEL" da la vuelta: "TU LOCAL". Cierre: tarjeta verde "Videollamada gratis / scalerics.com" con el
celular del agente con el chat resuelto y un tilde.

Voz: Orus (narrador) + Rubén (Gemini Algenib) en `partes/` (01c y 03 de Orus con atempo 1,06; 02 de Algenib), pegadas
con 0,6 / 0,55 s, ganancia pareja por tramo (Rubén +4 dB, segundo tramo +2,6 dB, todo -3 dB de margen). Dos pausas
insertadas a mano: 1,4 s después de "su batería" (el remate). `palabras.json` corregido a mano en "En" (Néstor),
"y se la", "Agendá una videollamada" y "batería." (fin) contra silencedetect y un segundo STT por tramo.
Duración 37,23 s (voz 37,08 + 0,15). 96 palabras.

Todo el 3D vive en `assets/tres.js` (una escena; cámara por claves con cúbica monótona; cortes secos solo en: el
plano de Rubén escribiendo (s03), el primer plano de Rubén (s06, por timing), la vuelta a la noche (s10) y la tarjeta
(s11)). Las escenas HTML (`node gen.mjs` las escribe todas; `LIMPIO=1 node gen.mjs` las deja sin texto para el fondo
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
- s01-gancho 0,00 · general frontal de las dos fachadas cerradas, gancho entero en el cuadro 0 ("Diez de la noche. Las
  dos cerradas." / "Una **vende** igual."), sello mono "Mismo rubro · misma calle / una sola diferencia". "Dos": los
  carteles laten; "cerradas": las cortinas rebotan (golpe); "vende": la reja de Daniel se prende verde + tilde 3D.
- s02-bateria 5,92 · látigo a la camioneta: Rubén con la linterna, fastidio; "batería": primer plano de la batería
  "12 V" con testigo rojo titilando (clic-clic-clic) · rótulo "sin arranque"; "temprano": la caja con los cajones y la
  puerta "ALMACÉN RUBÉN" · rótulo "mañana · reparto".
- s03-escribe 9,65 · Rubén tipea de frente (luz de pantalla); en "dos" la burbuja sale, se duplica y la cámara la sigue
  a las fachadas.
- s04-nestor 11,12 · las cortinas bajan al piso; la burbuja entra al celular de Néstor: "22:01 · Rubén · 1 mensaje
  nuevo" y se apaga · rótulo "Sin leer"; reloj de pared 22:01.
- s05-daniel 13,54 · cortinilla por la medianera; push-in al celular de Daniel: el agente contesta (4 burbujas).
- s05b-reserva 16,27 · la batería se adelanta del estante, etiqueta "RESERVADA · RUBÉN · 8:00" y tilde (chime).
- s06-ruben 17,89 (corte en 17,57) · primer plano; pausa, cejas arriba, mira a cámara: "¿Me contestaron a esta hora?"
  (boca con la envolvente de su voz).
- s07-cena 20,94 · grúa a las dos ventanas: Néstor y Daniel cenan milanesa con puré · rótulos "Néstor" / "Daniel";
  en "mañana" levantan el tenedor a la vez.
- s08-diferencia 24,03 · zambullida a los mostradores (pantalla partida): recuadro verde al celular de Daniel, "Sin
  leer" al de Néstor; "atendiendo": el celular saluda · rótulo "● Atendiendo"; push-in.
- s09-manana 27,32 · reloj 22:00 → 8:00, cielo crema, el encuadre del cuadro 0; Rubén sale con la batería; la cortina
  de Néstor sube; burbuja "Néstor · 8:02 ¡Buen día! ¿Qué necesitabas?"; Rubén levanta la batería, Néstor se ríe.
- s10-tu-local 31,37 · corte a la noche: fachada de Daniel, reloj 8:00 → 22:00; "tu local": el cartel da la vuelta.
- s11-llamada 34,25 · tarjeta de cierre (3,0 s, arranca sobre "videollamada").

## Sonido
Del repo: calle (Oper8, CC0) de ambiente bajo de noche y un poco más alto a la mañana, whoosh en cada travelling,
pop por burbuja/objeto, respuesta (mensaje enviado) en las burbujas del agente, vibra (SpliceSound, CC0) y ping en los
mensajes que llegan, tipeo (Caitlin_100, CC0), chime en "reservada", impact en el gancho, golpe en el rebote de las
cortinas, tic/tac-real para el arranque fallido y el reloj, campanita/puerta en la mañana. Techo por efecto -33,3 LUFS
(la voz anda en -17 en este reel). Medido por tramos de 0,5 s sobre stems simulados del index: con la voz sonando
(momentary > -29 LUFS) la voz queda siempre ≥ 6 LU sobre el resto. El render final normaliza a -14 LUFS (paso 10).
Ver fuentes.md: los sonidos CC0 específicos (arranque, cortina metálica, grillos, cubiertos) no se pudieron bajar
(freesound, Openverse y Wikimedia bloqueados por el proxy de la nube): se usaron sonidos reales del repo en su lugar.
