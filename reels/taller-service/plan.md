# taller-service · plan · TALLERES MECÁNICOS, dolor + solución (3D real), ~44 s

**De qué trata.** Marzo, 18:00, "Mecánica Óscar". Óscar le pega a Walter el papelito del service en el parabrisas:
**"Listo, Walter. Volvé a los diez mil kilómetros."** / **"¡Obvio! Vos sos mi mecánico."** El papelito se destiñe mes a
mes mientras el cuentakilómetros sube (91.000 → 125.000) hasta quedar en blanco. Un martes, el elevador vacío: Maxi
**"Jefe, ¿hoy no viene nadie?"** / Óscar **"Ya vuelven. Tienen el papelito."** (38 services que no volvieron este año,
$ 247.000). Noviembre: entra la grúa con el auto de Walter humeando: **"Óscar, no entiendo. Si le hice el service hace
poquito."** Pausa (el papelito en blanco, 125.000 km). **"Volviste a los diez mil, Walter. Cuatro veces."** Remate del
remate: **"Ponele otro papelito, así no me olvido."** y Maxi le acerca el rollo. Cartel **"Una ficha por auto más
tarde…"**. Parte 2: la ficha en la tablet; en agosto a Walter le llega solo el WhatsApp con el turno ("¡Uh! Justo me
estaba olvidando."); el panel "Les toca este mes"; el mismo "¿Hoy no viene nadie?" → **"Ya vinieron. Tenían el
aviso."**; Walter entra manejando a los 95.300: **"¡Volví a los diez mil!"** / **"Una vez. Así me gusta."**; **"¿No me
ponés el papelito?"** / **"El papelito ahora te escribe."** Cierre: Óscar a cámara **"Comentá SERVICE…"**.

- **Producto: CRM del taller.** Ficha de cada auto (matrícula, cliente, modelo genérico, kilómetros y fecha del último
  service, próximo por km o por meses); cuando le toca, al cliente le llega solo un WhatsApp con botón de turno; panel
  "Les toca este mes" con quién reservó y a quién le falta. Se nombra en la línea chica final y en `descripcion.txt`.
  El cartel nunca dice "Scalerics". No es agente de IA: no se lo llama así.
- **Sin marcas:** autos genéricos (el sedán/hatchback de juguete de los talleres anteriores, sin logo ni rejilla
  reconocible; matrícula inventada "SBC 4127", sin escudo), grúa genérica (plancha navy, baliza crema, sin nombre de
  empresa), chat genérico (sin el verde ni el logo de WhatsApp), tablet y celular sin logo. "Mecánica Óscar" es
  inventado. Nada de "Gol" ni ningún modelo real: "tu auto".
- **Sin datos de afuera:** 38 services, $ 247.000 (38 × $ 6.500, el mismo precio de service que taller-esta-pronto),
  85.000 / 95.000 / 125.000 km, 41 y 33 del panel: todo del caso. No hace falta `fuentes.md`.
- **Estructura:** parte 1 ~19,0 s + cartel 2,3 s + parte 2 ~19,7 s + cierre 3,0 s = ~44 s. Solución + cierre = 22,7 s
  (52 %). Si las tomas alargan la parte 1, se recorta el montaje P2 (mínimo 2,2 s) y las pausas, nunca la parte 2.
  Proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`, copiando `reels/taller-esta-pronto`.
- **Nadie queda mal parado:** Walter confía en su mecánico y en el papelito (como todos); Óscar hizo bien el service;
  el chiste es contra el papelito que se lleva el sol.

## Voces (Gemini; sin Orus)
| quién | voz | líneas | tono |
|---|---|---|---|
| Óscar (dueño, ~52) | **Charon** (la de siempre) | "Listo, Walter. Volvé a los diez mil kilómetros." · "Ya vuelven. Tienen el papelito." · "Volviste a los diez mil, Walter. Cuatro veces." · "Ya vinieron. Tenían el aviso." · "Una vez. Así me gusta." · "El papelito ahora te escribe." · "Comentá SERVICE y te mando cómo funciona para tu taller." | de oficio, grave, sin gritar. "Cuatro veces." PLANO, después de una pausa de ~0,5 s, con la cama baja: si suena a reto, regenerar. |
| Maxi (ayudante, ~22) | **Puck** | "Jefe, ¿hoy no viene nadie?" | aburrido, neutro: **el mismo audio en P3 y Q3**. |
| Walter (cliente) | **Umbriel** (la del elenco) | "¡Obvio! Vos sos mi mecánico." · "Óscar, no entiendo. Si le hice el service hace poquito." · "Ponele otro papelito, así no me olvido." · "¡Uh! Justo me estaba olvidando." · "¡Óscar! ¡Volví a los diez mil!" · "¿No me ponés el papelito?" | buena onda total, de buena fe; "hace poquito" convencido de verdad; "otro papelito" contento, como quien tiene la solución. |
| Narrador del cartel | **Rasalgethi** | "Una ficha por auto más tarde." | caricaturesco; atempo 1,1 si pasa de 2,4 s; fallback "Un sistema más tarde." de `reels/ya-lo-cargo`. |

- P1 y Q1: el MISMO audio de Óscar y de Walter (el callback se tiene que oír igual).
- "SERVICE" se pronuncia "sérvis" (como se dice en Uruguay); si Gemini lo lee en inglés raro o en español "servíce",
  escribirlo "sérvis" en el .txt de voz y dejar SERVICE en pantalla.
- Burbujas sin voz: los chips de mes, el papelito, el WhatsApp a Walter, el panel, los rótulos.

## Personajes (ELENCO de `reels/taller-esta-pronto/assets/personajes.js`)
- **Óscar = `ELENCO.oscar`** (mameluco navy con franja verde, barba candado gris, trapo en el bolsillo). P1 sonrisa de
  oficio; P3 tranquilo, confiado; P4-P5 cara quieta, ojos entrecerrados (el remate); P6 mira el papelito en blanco en su
  dedo. Parte 2 relajado, media sonrisa.
- **Maxi = `ELENCO.maxi`** (mameluco verde oscuro, jopo). P3 sentado en la pila de cubiertas con el mate; P6 le acerca
  el rollo de papelitos sin hablar; Q5 tira el rollo al cajón.
- **Walter = `ELENCO.walter`** (corbata, campera crema, mochila): ya existe; acá con voz y en cuadro entero. Siempre con la
  llave en la mano. En P4 se rasca la cabeza (sin mano en la cara).
- Graciela, Daniel, Sergio: solo avatares en el panel de Q3.

## Escenarios y objetos 3D por escena
- **Set: el taller "Mecánica Óscar"** reusado de taller-esta-pronto (elevador de dos columnas con brazos, banco con
  tablet en atril, pila de cubiertas, portón abierto a la calle, piso de hormigón, pared con el panel de herramientas).
  Luz de tarde en P1/Q1, de mañana en P3/Q3/Q4.
- **P1/Q1 · el auto de Walter:** hatchback BLANCO genérico (nuevo color del auto de juguete; Sergio era crema, Daniel
  navy claro), matrícula "SBC 4127". **El papelito del service:** calco rectangular crema con borde verde, ~el tamaño de
  una mano, pegado arriba a la izquierda del parabrisas, texto a birome navy "PRÓXIMO SERVICE · 95.000 KM" (textura
  canvas que se destiñe por etapas: navy → gris → blanco, y un ticket de estacionamiento crema que asoma en septiembre).
  En Q1 el parabrisas está limpio.
- **P2 · el montaje del parabrisas:** plano desde el asiento del conductor: el parabrisas con el papelito arriba y abajo el
  **tablero con el cuentakilómetros** (display grande, números ≥ 90 px, 91.000 → 95.000 → 108.000 → 125.000); la luz del
  sol que cambia de ángulo por mes; chips de mes arriba.
- **P3/Q3 · el elevador:** vacío con los brazos abiertos (P3) / ocupado y tres autos en la vereda (Q3: reusar los
  autos de juguete en otros colores).
- **P4 · la grúa:** camión grúa de plancha genérico (cabina crema, plancha navy, baliza que gira, luces), entra de culata
  con el auto de Walter arriba, inclinado; **humo** gris saliendo del capó (sprites o esferas low-poly grises que suben
  y se abren, determinístico). Al lado del tablero, inserto con "125.000 km".
- **P6 · el rollo de papelitos** en la mano de Maxi (cilindro crema con borde verde).
- **Q2/Q5 · el celular de Walter** (`crearCelular`, pantalla canvas, ≥ 60 % del cuadro en Q2).
- **Q1/Q3 · la tablet** del banco (pantalla canvas, push-in hasta ≥ 70 %).
- **Cierre:** Óscar a cámara, apoyado en la columna del elevador con el auto de Walter arriba; tarjeta SERVICE encima.

## Interfaz recreada (pantallas canvas, Lexend, textos ≥ 36 px)
1. **Ficha del auto (tablet, Q1):** "SBC 4127 · Walter" · "Hatchback blanco" · "Último service: 12/03 · 85.000 km" ·
   "Próximo: 95.000 km o en 6 meses" · "Aviso por WhatsApp ✓" (el ✓ en verde) · botón "Guardar ✓".
2. **WhatsApp a Walter (celular, Q2):** cabecera "Mecánica Óscar" (avatar genérico con llave inglesa) · burbuja
   entrante: "Hola, Walter. A tu auto le toca el service (SBC 4127, unos 95.000 km). ¿Te reservo el jueves 9:00?" ·
   botones "Reservar jueves 9:00" (verde) / "Elegir otro día" · al tocar: "Turno reservado ✓ · Jueves 9:00".
3. **Panel "Les toca este mes · 41" (tablet, Q3):** filas con avatar: Walter "Reservó · Jue 9:00 ✓", Graciela
   "Reservó · Mar 10:30 ✓", Daniel "Reservó · Mar 8:30 ✓", Sergio "Aviso enviado" (gris); abajo el contador
   "Reservaron: 33 de 41" que sube en verde y "Martes: 4 de 4 turnos ✓".
4. **Aviso post service (celular, Q5):** "Service hecho ✓ · 95.300 km · Próximo: 105.000 km · Te avisamos".
- Colores: rojo apagado `#c7655b` SOLO para el problema (el "Martes: 0 turnos", "38 · $ 247.000", "125.000 km",
  "Último service: 85.000 km"); verde `#5ce611` para lo resuelto (✓, "Reservaron", "4 de 4", "95.300 km", SERVICE).
- Burbujas de diálogo como en los talleres anteriores (crema, borde navy 8 px, sombra dura, Lexend 800 navy ≥ 48 px).
  "Una vez. Así me gusta." en el mismo lugar y tamaño que "Volviste a los diez mil, Walter. Cuatro veces."; "El
  papelito ahora te escribe." en el mismo lugar que "Ponele otro papelito, así no me olvido."

## SFX
Pegatina (ras del papelito), motor que arranca y se va (P1), tic del cuentakilómetros por chip (P2), sorbo de mate (P3),
bip-bip de marcha atrás + motor diésel de la grúa + siseo del humo (P4), música que baja en la pausa, stinger (P6), pop
por burbuja y rótulo, vibración/timbre corto del celular (Q2, Q5), tap del botón, elevador hidráulico (cierre), cajón que
se cierra (Q5).
