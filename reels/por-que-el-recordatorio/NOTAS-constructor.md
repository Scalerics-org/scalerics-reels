# Notas del constructor · por-que-el-recordatorio (11-11)

## Qué se hizo
- Voz: Orus, toma 1 de `partes/guion-voz.txt` (sin «», "Scálerics punto com"); `partes/armar-voz.sh` agrega pausas
  (0,2 s antes de "¿Por qué?", 0,3 s antes de "Y Graciela pasa.", acorta "Y … Graciela", 0,3 s al final).
  Duración 33,11 s (voz 32,99 s). El "oyó:" del STT coincide con el guion salvo "Scálerics punto com" ("escaleras
  punto com", lo de siempre con Orus) y "avisas solo" (STT; se oye "avisa solo"). Tiempos corregidos a mano con
  silencedetect en `partes/ajustar-tiempos.mjs` (¿Por qué? del gancho y de la bisagra, «me olvidé», Un estudio,
  Y Graciela pasa, el cierre).
- `assets/tres.js`: una sola escena Three.js, `renderAt(t)` puro, cámara por planos con Hermite monótona; 5 zonas
  (almacén A, consultorio D, crema liso P, vereda G, cierre F). La burbuja del recordatorio (misma geometría) es el
  hilo de todo el reel.
- `gen.mjs`: capa HTML (gancho, rótulos con línea guía, créditos, tarjeta de cierre) + SFX por escena;
  `assets/firma.json` (tramos sin logo: primer plano del celular de Graciela y s11).
- `armar.mjs` (base por-que-la-toalla): fondo crema, subtítulos navy con borde blanco sin cartel, recuadro verde con
  borde navy, "olvido" en rojo apagado, Caveat declarada (tickets escritos a mano), cama 0,24.
- Mezcla: `python3 partes/medir.py`. I -16,3 LUFS antes del loudnorm, pico -2,9 dBFS. Quedan tramos de 0,5 s con
  menos de 6 dB, todos en colas de palabra o pausas (12,0 cola de "turnos" contra la cama; 14,0 pausa después de
  "préstamos:"; 19,0 cola de "intereses." contra el whoosh; 22,5 pausa después de "encargo."; 26,0 la campanita
  justo antes de "Y"; 27,5 cola de "pasa." y el whoosh de s11). Que el revisor de sonido lo confirme con el render.
- `check --json`: ok, 0 errores (warnings: canvas al borde, un "color undefined" de Three que viene del módulo de
  personajes, `#fondo` anidado; iguales a los de toalla).
- Snapshots cada 0,5 s: 4 pasadas completas (66 cuadros) + parciales. Corregido entre pasadas: gancho que se salía
  del ancho y pisaba el celular; burbuja de la zambullida detrás del celular; mano de Rubén (parecía una pelota: se
  sacó); encuadres del consultorio (ahora se ve el sillón vacío del fondo con "Faltó" y el rótulo lo señala); "?"
  de la bisagra más alto (el paciente asomaba abajo); nube de Rubén más grande; crédito de s04 que se salía del ancho;
  tarjeta de cuotas cortada (cámara centrada) y en un atril (antes flotaba sobre media pantalla vacía); tildes que
  tapaban los números; burbujitas de las cuotas que quedaban de espaldas al plegarse la tarjeta; "-25 %" separado;
  grúa del almacén más alta; bolsas más grandes y apareciendo en "Rubén" (en "encargo" laten); ojos de Rubén que
  parecían cerrados al mirar abajo; push-in al celular de Graciela relativo al celular (antes iba a la cara);
  contraplano de Rubén; plano de s10 (Graciela tapaba a Rubén); logo en píldora blanca (sobre el frente navy del
  mostrador desaparecía); sombra del cierre; celular de Rubén visible de canto en s04.

## Planos (segundos globales)
0,00 A1 gancho: celular de Rubén con la burbuja del dentista · 2,9 la burbuja se despega · 3,47 D: corte, la burbuja
vuela al sillón y travelling atrás (fila de 6 sillones) · 6,4 push-in a la lámpara → "?" (6,67) · 7,71 A4: corte con
el "?" que se vuelve la nube de Rubén · 9,7 «me olvidé»: el papelito cae · 10,56 P: el papelito se da vuelta, tarjeta
de cuotas en el atril, monedas · 12,56 push-in, crédito 2011 · 14,5 celular de la financiera y las burbujitas a las
cuotas 1-5 · 16,0 la tarjeta se va, aparece la balanza (16,7 se nivela, 17,8 "-25 %") · 19,1 push-in a la balanza ·
19,57 A8: corte a la balanza de Rubén, grúa al almacén, bolsas (20,3), pulso en "encargo" (22,0) · 22,98 push-in al
ticket de Graciela · 23,45 tilde y sale la burbuja · 24,1 G: corte, la burbuja entra al celular de Graciela, vibra
(24,4), lo muestra · 24,9 push-in al celular · 25,62 AR: Rubén con el mate · 26,20 A10: Graciela entra, se lleva la
bolsa, tickets en verde · 27,77 A11: el celular de Rubén con las dos burbujas · 30,10 F: cierre verde (3,0 s).

## Dudoso / pendiente
- s10 (26,2-27,8): Rubén queda casi todo detrás de las bolsas de Marta/Nico (se ve la cabeza y el guiño); la entrega de
  la bolsa se lee, pero la mano de Rubén casi no se ve. Graciela entra cortada por el borde izquierdo en el primer
  cuarto de segundo (entra a cuadro).
- s08: el tercio de abajo es el frente navy del mostrador (con el rótulo encima); funciona, pero es una franja lisa.
- s01: el celular "sube" sin mano (se sacó la mano de prop porque se veía como una pelota de piel).
- Transiciones de 0,2-0,3 s con cosas cortadas al borde a propósito (el "?" saliendo de la lámpara a 6,7-6,9; el "?"
  sobre la cara de Rubén a 7,7-8,0 mientras viaja a la nube; push-in al ticket con el ojo de Rubén al borde a 23,2).
  Mirarlas cuadro por cuadro en el render.
- s09 primer plano del celular de Graciela: el subtítulo queda sobre sus anteojos (arriba del celular), legible.
- La burbuja de la balanza y las de las cuotas tienen texto chico (es la forma lo que importa, no se lee).
- Portada: `portada.json` con fondo limpio `portada-src/fondo-limpio-18.6.png` (la balanza nivelada). `fondo`/`velo`
  quedaron navy como en toalla (bandas oscuras de la herramienta); `herramientas/portada.mjs` de este repo no lee
  `fondo_limpio` (toma el cuadro del mp4): hay que pasarle el fondo limpio como hizo toalla.
- Mezcla: ver arriba (tramos < 6 dB en pausas). Sin ambiente de almacén (no hay archivo con origen registrado).
- No se renderizó el mp4 ni se hizo commit.

## Ronda 1 de corrección (sobre el render revisado por los 3 revisores)
Duración nueva 33,55 s (voz 33,43 s). Tiempos de escena: ver tabla de SPEC.md.

Guion y datos
- G1 hecho: "funcionó casi como bajarle un cuarto a los intereses". Regeneré la frase entera de los préstamos ("Un estudio
  con préstamos: un aviso antes de cada cuota funcionó casi como…") con Orus y el mismo tono (3 tomas, todas con STT
  limpio; uso la 2, `partes/prest2.wav`). La pego en `partes/armar-voz.sh`; tiempos en `partes/ajustar-tiempos.mjs`.
  Actualizados guion.txt, partes/guion-voz.txt, fuentes.md, plan.md, SPEC.md y descripcion.txt ("casi como una rebaja
  grande de intereses").
- G2 hecho: portada "Un mensaje pesó" / "casi como bajar los intereses". Fondo limpio nuevo
  `portada-src/fondo-limpio-19.25.png`: la balanza grande, nivelada, con "-25 %"; zoom 1.35.
- G3 hecho: las bolsas dicen Graciela, Walter, Susana y Héctor (tres.js, SPEC, plan).
- G4 hecho: "Un mensaje por mes".
- G5 hecho: "Porque con ese mensaje falta menos gente." sin coma (guion, subtítulos, fuentes, plan, SPEC). Los
  subtítulos quedan "Porque con | ese mensaje | falta menos gente.".
- S6 hecho: con la frase regenerada, el STT oye "un estudio con préstamos" (la transcripción del reel entero coincide con el
  guion salvo "escalera ix.com").

Arte
- A1: el "?" nace en la cabeza de la lámpara del sillón 3 (escala 0→1, sin viajar). La cámara llega antes con un push-in
  rápido de 0,33 s, el paciente de ese sillón sale de cuadro y la cabeza de la lámpara se achica. Queda la pared de
  azulejos abajo.
- A2: más arriba en pantalla (también en el consultorio, para que el corte coincida), se achica en 0,2 s y viaja en arco
  por arriba y a la derecha hasta la nube. Ya no tapa la cara.
- A3: la colita de la nube ahora apunta a la cabeza. El papelito cae por el lado de la nube, lejos de la cara. La mano de
  Rubén llega a la cabeza de verdad (el objetivo se calcula sobre la posición real de la cabeza) y rasca. Saqué el termo
  de la nube: su asa era la "C" negra suelta.
- A4: la tarjeta, el atril y el celular se van de golpe cuando aparece la balanza; la cámara ya se alejó antes con la
  tarjeta en cuadro, así no quedan restos chiquitos ni la balanza atraviesa nada. La balanza es más alta (cruz a 1,6 m)
  y más angosta, con platos más grandes (r 0,33), y llena casi todo el ancho. "-25 %" más grande, con contorno navy, la
  barrita pegada al número y corrido para no pisar el fiel. "intereses" más grande. Sol más vertical en esa zona (las
  sombras quedan bajo los objetos).
- A5: el frente del mostrador ahora son tablas de madera con la guarda verde (ya no hay franja navy lisa) y la tapa tiene
  vetas. Bolsas a escala 1.0 con un hueco en el medio: se ve el cuerpo de Rubén. La grúa sale de la balanza y llega al
  plano general en 0,4 s. Ninguna bolsa queda cortada.
- A6: la burbuja del pedido frena con el 85 % del ancho (escala 0.14). Los subtítulos: todas las palabras con el mismo
  borde blanco, también las del recuadro verde.
- A7: Graciela a 3/4 (giro 0.45, cabeza hacia Rubén), entera en cuadro (arranca adentro). Cámara más atrás. La balanza
  de Rubén solo está en s08.
- A8: Rubén de frente en s10 (mira a Graciela con los ojos y un poco la cabeza), en el hueco entre las bolsas: se le ve
  la cara entera y el guiño. El mate queda bajo en la mano izquierda (ya no va a la mejilla).
- A9: la muela es una corona ancha redondeada con un surco suave y dos raíces cortas y romas, sin los bultos de arriba.
- A10: el celular ya no se levanta. La línea guía termina en el borde de abajo de la burbuja y el rótulo va abajo
  (y 1790); no tapa la hora ni el tilde.
- A11: el plano del consultorio abre más (cámara más atrás). El crédito "Revisión de 8 estudios · 2013" entra a 1,25 s,
  cuando las burbujas ya llegaron.
- A12: el cartel con el tilde verde ya no sube a la lámpara: queda delante de los pies del paciente. La línea guía de
  "Menos faltas, no cero" señala el "Faltó" del sillón vacío del fondo.
- A13: el reloj está en el estante del medio (x ≈ 0,72, debajo de y 420 en pantalla), sin productos detrás.
- A14: el papelito arranca más abajo y menos girado (no se corta arriba ni queda bajo "Y no pasa").
- A15: el atril aparece cuando la tarjeta ya está de frente (antes giraba la tarjeta y el atril no). Las monedas caen
  después del giro, adelante y a la derecha.
- A16: las burbujitas nacen arriba del celular (no encima de su burbuja). Los tildes son más chicos y van en la esquina
  de arriba a la derecha del casillero.
- A17: el celular de la financiera se va junto con la tarjeta. Ya no baja con la pantalla negra.
- A18: al final de s07 la cámara mira a y 1,1. La cruz de la balanza queda debajo de los subtítulos.
- A19: el push-in al ticket dura 0,18 s, así que la cabeza de Rubén al borde dura menos. Sigue habiendo 2-3 cuadros con
  su ojo al borde derecho (23,45-23,55).
- A20: Graciela muestra el celular a la altura del pecho, más adelante. El primer plano tiene el buzo verde de fondo y
  ya no la cara. El rótulo "Sale solo…" va a 44 px, dentro del ancho, sin línea guía, y dura hasta el final de s09
  (también sobre el contraplano de Rubén con el mate).
- A21: se ve la madera con vetas.
- A22: el encabezado de los celulares ahora tiene título de 60 px y hora/"en línea" de 40 px; "intereses" más grande;
  "Almacén de Rubén" en navy. Siguen chicos: la burbujita del plato ("Tu cuota vence en 3 días") y las burbujitas que
  vuelan a las cuotas. Ahí importa la forma, no el texto.
- A24: la hora del celular coincide: 18:00 en el del dentista, 19:41 en el de Graciela y en el de Rubén en s11, 9:00 en
  el de la financiera.
- A25: no lo hice. Los cortes de 28,21 (a s11) y 30,54 (cierre) siguen siendo secos.
- También: los ojos de Rubén en el contraplano del mate ahora están abiertos (antes parecían cerrados). Los arcos de
  vibración del celular de Graciela van delante de sus manos (antes no se veían).

Sonido
- S1: en "Rubén" cada bolsa entra con pop + papel. Saqué el tic/tac del reloj y el papel en "encargo".
- S2: la vibración visible (sacudón más grande y arcos de frente a cámara) y el sonido arrancan los dos en T.vibG
  (24,86). Lo calculan tres.js y gen.mjs con la misma fórmula.
- S3: todos los vibra pasaron a vibra-fuerte (techo -31).
- S4: whoosh-cinematic de s08 a vol 0,35.
- S5: no hay papel en "encargo". El click está en "olvido" y se sacó el whoosh propio del final de s08 (queda el
  automático del corte).
- Mezcla (medir.py): quedan 3 tramos de 0,5 s con menos de 6 dB, todos en colas de palabra y pausas:
  - 12,0: cola de "turnos" contra la cama y las monedas, que están muy bajas.
  - 23,0: cola de "encargo." contra el whoosh del corte.
  - 27,5: 5,8 dB, en la cola de "pasa.".

Pasadas de snapshots en esta ronda: una completa cada 0,5 s (67 cuadros) y seis parciales, cuadro a cuadro en cada
transición tocada (s01, 3,5-6,8, 16,1-16,6, 20,0-21,6, 23,4-25,9, s10). `check --json`: ok, 0 errores. Quedan avisos de
"line_unread" para los rótulos de ~1,2 s ("Recordatorio…", "Menos faltas…", "Un mensaje…"); los alargué lo que dejaba la
escena.

Pendiente o dudoso después de la ronda 1:
- s03: abajo del "?" se ve la pared de azulejos navy (mitad inferior oscura, sin objeto).
- 25,25-25,35: en medio del push-in al celular de Graciela su boca asoma un instante arriba.
- s08: la mitad de abajo es el frente de madera del mostrador. Ya no es lisa, pero es mucho mostrador.
- 23,45-23,55: el ojo de Rubén al borde derecho durante el push-in rápido al ticket.
- 30,25 (s11): con el push-in final el celular se acerca a los subtítulos.
