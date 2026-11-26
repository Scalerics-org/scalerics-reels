# taller-service · revisión de guion y datos · ronda 1 (revisor independiente)

Leí: guion.txt, plan.md, ganchos.md, descripcion.txt, portada.json, fuentes.md, NOTAS-constructor.md, partes/*.txt,
partes/lineas.tsv, partes/rec/medidas.tsv, compositions/*.html (textos), gen.mjs (chips y tarjetas) y assets/tres.js
(papelito, ficha, panel, celular, globos, rótulos). No abrí Chrome ni escuché audio.

## ¿Un dueño de taller se lo manda a otro? ¿Pega el remate?
**Sí.** El papelito del parabrisas y el "volvé a los diez mil" son del rubro y de nadie más, y "Si le hice el service
hace poquito" es una frase que todo mecánico escuchó. El remate en dos tiempos funciona:
- "Volviste a los diez mil, Walter. Cuatro veces." es ingenioso, pero **pide hacer la cuenta** (125.000 − 85.000 = 4 × 10.000).
  Funciona solo si se leen bien el rótulo "Último service: 85.000 km" (P4b) y el "125.000 km" (P4c) justo antes. Tienen
  0,8 s y 0,55 s: es poco. Ver M3.
- "Ponele otro papelito, así no me olvido." es el que se comparte (el cliente que de buena fe pide repetir lo que falló),
  y con Maxi acercando el rollo queda redondo.
- Parte 2: "Ya vinieron. Tenían el aviso." y "El papelito ahora te escribe." son buenos callbacks. "Una vez. Así me gusta."
  está bien, sin más.
Nadie queda mal parado: el chiste va contra el papelito que se lleva el sol. Walter es de buena fe; no hay burla al cliente.

## Checklist "ANTES QUE TODO"
- Rubro en el cuadro 0: OK ("TALLERES" / "MECÁNICOS" en s00, desde t = 0, con "Marzo, 18:00.").
- Dolor concreto con plata del caso: OK ("Martes: 0 turnos", "Services que no volvieron este año: 38 · $ 247.000" =
  38 × 6.500, el precio de taller-esta-pronto; la grúa).
- Solución ≥ mitad: 24,45-50,37 = 25,9 s (51 %) contando el cierre; sin el cierre, 22,9 s (45 %). Al límite (ver M1).
- SERVICE en voz ("sérvis", 15-oscar), en pantalla (s10) y en la 1.ª línea de descripcion.txt: OK.
- Cierre con callback: OK (Q5 "¿No me ponés el papelito?" / "El papelito ahora te escribe." y Maxi guarda el rollo).
- Cartel "Una ficha por auto más tarde…": no dice Scalerics. OK.
- Sin "bot/chatbot", no se lo llama agente de IA (es CRM). OK. Sin marcas de autos ni logos; chat con cabecera navy.
  "Aviso por WhatsApp" aparece solo como texto en la ficha: OK.
- Voseo: "Volvé", "Ponele", "¿No me ponés…?", "Comentá", "te mando". OK en los textos. Ojo con el audio (A1).
- Portada: sello TALLERES, grande "¿Hace poquito?" (2 palabras, frase que el dueño escucha), chica "Volvió en grúa.",
  fondo limpio de P4 con personajes y la grúa, navy/verde/velo correctos. OK.
- Ortografía de todos los textos visibles revisados (chips, burbujas, rótulos, ficha, panel, chat, aviso, cartel, cierre):
  sin faltas, tildes bien (Último, Próximo, Óscar, Reservó, día, kilómetros, Comentá, más), signos ¿¡ completos, sin rayas
  largas ni emojis (los ✓ son tildes de interfaz, como en los demás reels).

## Defectos

### ALTA
**A1 · 0,1 s y 24,5 s (o1, se reusa en Q1) · assets/voice/o1.wav ← partes/rec/01-oscar-b · ¿dice "Volvé" o "Volví"?**
El STT oyó "volví" en las tomas b y c, y "vuelve" en la a. El STT recibe el guion como pista (speechContexts) y aun así
escribió "volví": puede ser que no tenga "volvé" en el vocabulario (es/i se confunden), pero también puede ser que Gemini
lo haya dicho así. Es la frase que arma todo el chiste y suena dos veces: si se oye "Listo, Walter. Volví a los diez mil
kilómetros", el setup no tiene sentido. **Escucharla antes de entregar** (y la Q1, que es el mismo audio). Si hay duda,
regenerar con el texto "Listo, Walter. Volvé vos a los diez mil kilómetros." o con el tono marcando "vol-VÉ, con voseo,
acento en la e", y elegir por oído, no por STT. No la califico de defecto confirmado, pero no se puede entregar sin
verificarla.

### MEDIA
**M1 · duración 50,4 s (plan ~44; tope de CLAUDE.md con diálogos ~45 s).** Lo que se puede cortar sin perder el chiste
(~4-5 s, deja ~46 s y la parte 2 sigue ≥ 50 %, porque casi todo sale de la parte 2 pero también de colas de la parte 1):
1. **w4 "¡Uh! Justo me estaba olvidando." (Q2, ~1,6 s + aire):** el chat se entiende solo (Walter toca Reservar → Turno
   reservado ✓). Sacar la voz y apretar Q2 a ~2,2 s. Resuelve además la duda del STT con "liando".
2. **Q5b, Maxi tira el rollo al cajón (46,6-47,32, 0,7 s):** las notas dicen que es chico y de espaldas; no suma. Que el
   rollo vaya al cajón dentro de Q5i, en el fondo, o cortarlo.
3. **Cola de P6 (19,55-22,08, 2,5 s):** después de "así no me olvido." alcanza con ~0,8 s del rollo de Maxi antes del
   stinger. −0,8 s.
4. **Q4i inserto 95.300 km (0,5 s):** el mismo dato está en el aviso de Q5i ("95.300 km"). Se puede sacar o dejarlo
   dentro de Q4. −0,5 s.
5. **P3, rótulos (6,85-10,92, 4,1 s):** el rótulo de 38 · $ 247.000 tiene que quedarse (es la plata), pero "Martes: 0
   turnos" se puede solapar con la línea de Maxi para ganar ~0,4 s.
NO cortaría: el montaje P2 (es el desteñido, sin él "Cuatro veces" no se arma), ni la pareja "¿hoy no viene nadie?" /
"Ya vinieron. Tenían el aviso." (es el mejor callback de la parte 2), ni la pausa antes de "Cuatro veces.".

**M2 · Q2 (28,5 s) · chip "Agosto." · gen.mjs CHIPS s08 · los kilómetros no cierran entre la parte 1 y la 2.**
En la parte 1 Walter llega a 95.000 km en **julio** (chip "Julio." con el odómetro en 95.000). En la parte 2 el aviso le
llega en **agosto** ("unos 95.000 km") y entra el jueves con **95.300**: un mes más tarde que en la parte 1, debería tener
~97-100.000. Además la ficha dice "Próximo: 95.000 km o en 6 meses" y 6 meses desde 12/03 es septiembre: agosto no
corresponde a ninguna de las dos reglas. **Arreglo: chip "Julio."** en Q2 (y el resto queda coherente: 95.300 a la
semana del aviso).

**M3 · P4b-P4c (14,6-15,97 s) · el dato que arma "Cuatro veces" pasa demasiado rápido.** "Último service: 85.000 km"
(0,8 s, mientras la mano despega el papelito) y "125.000 km" (0,55 s) son lo que el que mira necesita para que "Cuatro
veces" sea un remate y no una frase rara. Sugerencia: que el rótulo "Último service: 85.000 km" siga en pantalla durante
el inserto de 125.000 (los dos números juntos, uno arriba del otro, ~1,0-1,2 s en total), o que en P5 la burbuja aparezca
con el "125.000 km" todavía visible chiquito. Con lo que se ahorra en M1 alcanza.

**M4 · P3 (8-10 s) vs Q3 (31,4 s) · rótulo "Services que no volvieron este año: 38" contra "Les toca este mes · 41".**
Un taller al que le tocan 41 services por mes (~490 por año) y solo perdió 38 en el año tiene al papelito funcionando al
92 %: el dolor queda chico al lado del panel. Un dueño de taller que hace la cuenta lo nota. Opciones: bajar el panel a
la escala del caso ("Les toca este mes · 12", "Reservaron: 10 de 12", con el contador 8 → 10) o cambiar el rótulo a
"Este año no volvieron: 38 de 120 · $ 247.000". Lo primero es más barato (solo tres strings en tres.js y el lerp 28→33).

### BAJA
**B1 · 4,5-10,9 s · chips "Noviembre." dos veces (s04 en rojo al final del montaje y s06 en P4)** con "Martes, 9:00." en
el medio. Se entiende, pero el segundo "Noviembre." parece un salto atrás. Sugerencia: s06 → "Noviembre. Jueves." o
sacarlo (el odómetro rojo de 125.000 ya dijo noviembre), o mover P3 antes de "Noviembre." del montaje no es posible sin
rehacer; lo más simple es cambiar el texto de s06.

**B2 · kilometraje de Walter: 40.000 km en 8 meses** (~60.000 km/año) para un oficinista, y el ritmo se acelera (3.000,
2.000, 6.500, 8.500 por mes). Hace falta para "cuatro veces" y nadie lo va a medir; si se quiere más creíble y más
gracioso, el montaje puede cruzar el año ("Marzo." → "Diciembre." → "Marzo." del año siguiente) y "hace poquito" pega
todavía más. Opcional.

**B3 · "Septiembre." (s03):** en Uruguay se escribe y se dice mucho "Setiembre" (es la forma oficial habitual). Las dos
son correctas; "Setiembre." suena más local. Opcional.

**B4 · 06-oscar-c (o3, ~16 s): el STT oyó "al tres"/"altar" por "Walter".** Plausible error del STT con un nombre propio
(en las tomas a y b ni siquiera lo transcribió, y en 05 oyó "Buscar" por "Óscar" en las tres tomas: es el STT, no la voz).
Escuchar al verificar A1; no regenerar si se oye "Walter".

**B5 · 09-walter (w4): "me estaba liando".** La toma cruda medida dice "justo me estaba olvidando"; lo de "liando" es del
recorte con silenceremove/atempo comiéndose el "ol". Plausible del STT, pero si queda w4 (ver M1.1) escuchar que el
"olvidando" no esté mordido al principio. Si se saca w4, desaparece.

**B6 · 33-35 s · Q3g: Maxi pregunta "¿hoy no viene nadie?" con el elevador ya ocupado** (el mismo audio). Funciona como
callback porque la cámara gira y revela los autos, pero conviene que el plano arranque con Maxi mirando el celular o de
espaldas al portón (que no "vea" el auto en el elevador mientras pregunta), para que no parezca absurdo. Si no se puede
sin tocar la escena, dejarlo.

**B7 · 0 s · el cuadro 0 es el setup (Óscar pegando el papelito), no el dolor en curso.** Es defendible: el papelito es el
dolor, y el rubro se lee antes de los 2 s. Lo anoto solo porque CLAUDE.md pide "escena del dolor ya en curso"; no lo
cambiaría.

**B8 · descripcion.txt, 2.ª línea: "Mientras, el elevador vacío los martes."** Frase sin verbo, se lee cortada. Sugerencia:
"Y mientras, el elevador queda vacío los martes." (y "vuelve a los cuarenta mil" → "vuelve cuarenta mil kilómetros
después, en grúa", que es más exacto que "a los cuarenta mil").

**B9 · ficha (Q1i): "Cliente desde 2019"** es un dato inventado del caso, inocuo; está bien. Lo anoto solo para que no se
lea como dato real. Sin cambio.

## Sin defectos en
fuentes.md (todo es del caso y no hay datos de afuera; SFX con autor, sitio y licencia CC0), marcas, logos, cartel,
"bot", tono contra el que mira, producto (no se le dice agente de IA), rubro distinto del reel anterior entregado
(importadora-dolar / contable-consultas; dist-camion en curso), y que no repite ángulo de taller-presupuestos ni de
taller-esta-pronto.

## Resumen
1 ALTA a verificar (A1, el "Volvé" del setup, por oído), 4 MEDIAS (duración, el mes de Q2, el dato de "Cuatro veces"
demasiado rápido, 38 al año contra 41 por mes), 9 BAJAS. El chiste se comparte: con A1 verificado y M2-M4 arreglados,
está para salir.
