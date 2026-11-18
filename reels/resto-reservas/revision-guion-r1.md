# resto-reservas · revisión de guion y datos · ronda 1 (revisor independiente, 18-11)

Base: CLAUDE.md ("ANTES QUE TODO", 8c, 8d, muletillas), guion.txt, plan.md, ganchos.md, fuentes.md, descripcion.txt,
portada.json/portada.png, partes/lineas.tsv + voces.md + rec/medidas.tsv, assets/voice/palabras-r9.json,
assets/tiempos3d.js, gen.mjs, compositions/*.html y todos los textos de assets/tres.js. Comparado con
estetica-turnos, parrilla-no-vuelve y corralon-portland. Tiempos según assets/tiempos3d.js (DUR 45,7; P1 20,68; P2 23,08).

Lo que está bien: PARRILLAS gigante + chip "Viernes, 21:00." en el cuadro 0 sobre la escena ya en curso; números del caso
coherentes con fuentes.md (6 × $ 1.500 = $ 9.000; 14 sin contestar en P2 = 9 + 5 y vuelve a 14 → 0 en Q3; 11 de 12;
la familia de Walter en el build es de 6 con la abuela); "Comentá RESERVA" en la voz (r9), en la tarjeta y primera línea
de descripcion.txt antes de la línea de videollamada; 6 hashtags; "agente de IA" siempre, nunca bot/chatbot; voseo;
el cartel no dice Scalerics; sin rayas largas ni emojis visibles; sin marcas (WhatsApp solo como canal en la descripción,
como en los anteriores); remate "Están llegando." → "¿Y?" → "Siguen llegando." pega y es contra la situación;
ortografía y tildes de todos los textos visibles revisados: sin errores.

## ALTA

1. **El agente reserva un día que el cliente no pidió (Q1, ~23,4-26,6 s).** La nota de voz de Pablo es el MISMO audio de
   la parte 1: "Raúl, ¿tenés mesa para ocho a las diez? Soy Pablo." (sin día) y llega el miércoles a las 2:14. El agente
   contesta (tres.js, dibujarAgente): "¡Hola, Pablo! El viernes / a las 22:00 tengo la / mesa 7, para 8. / ¿Te la
   reservo?". El que mira ve un agente que inventa el viernes; un dueño lo nota ("¿y si era para hoy?"). Es justo la
   pantalla que tiene que convencer de que el agente es confiable. Arreglo posible sin regrabar: que debajo de la nota de
   voz aparezca un texto de Pablo "Para el viernes" (o la transcripción de la nota con "el viernes"), o que el agente
   pregunte "¿Para qué día?" → "El viernes".

2. **La parte 2 es menos de la mitad del reel (regla 3 de "ANTES QUE TODO": "la mitad del reel o más").** Parte 2 =
   23,08-45,7 = 22,6 s = 49 %; sin la tarjeta de cierre (desde 41,57) la solución funcionando son 18,5 s = 40 %. Además
   45,7 s es el techo de "hasta ~45 s" y está lejos de los ~30 s del formato completo (8d) y de los 25-35 s del
   encabezado. La parte 1 dura 20,7 s (el plan decía 16). Hay que recortar parte 1 (p. ej. la P2 escalada o aire entre
   parlamentos) o estirar la demo de Q2 (ver media 4), para que la solución pase claramente del 50 %.

## MEDIA

3. **Mecánica repetida casi beat por beat de `estetica-turnos` (16-11, misma línea, hace 2 días).** Allá: no vienen →
   la que faltó pide reprogramar ("¿me guardás el jueves que viene?") → la dueña acepta resignada ("Te lo guardo.") →
   cartel → recordatorio el día antes + lista de espera que llena el hueco con un personaje recurrente que festeja
   ("¡Me lo quedo!") → la que faltaba ahora viene. Acá: Pablo no viene → pide "¿Mañana a las diez, para ocho?" → "Dejá
   los cubiertos." → cartel → confirmación el día antes + lista de espera con Walter que festeja ("¡Esta vez sí
   entramos!") → Pablo confirmado el sábado. ganchos.md dice que lo evita, pero el esqueleto es el mismo. Y de
   `corralon-portland` (17-11, el otro agente de IA): el mismo audio de WhatsApp del cliente repetido en la parte 2 y
   contestado por el agente, y "lo que es para vos, como [un pedido grande], te lo pasa" copiado casi literal en la
   descripción ("Lo que es para vos, como un cumpleaños de 20, te lo pasa.") y en el rótulo de Q3 ("Lo que es para vos, /
   te lo pasa"). Juan ya se quejó de "todos iguales": al menos cambiar el rótulo y la frase de la descripción, y pensar
   si el remate del remate de la parte 1 puede no ser "el que faltó vuelve a reservar".

4. **Q2, el corazón del producto, dura 2,2 s (28,0-30,2) y no se puede leer.** En ese tiempo pasan: 11 tildes, "Confirmadas:
   11 de 12", Pablo "sin confirmar" → "no confirmó · mesa liberada", "12:00 · pedido de confirmación ✓", "18:00 · segundo
   aviso ✓", "20:00 · Mesa 7 liberada" y "Lista de espera: Walter · 6 → Ofrecida ✓", más el rótulo "Si no confirman, la
   mesa se libera sola". Es lo que el dueño compra ("confirma y libera la mesa solo", dice la línea chica) y se ve como un
   destello. Además el chip queda en "Jueves, 12:00." mientras aparecen las 18:00 y las 20:00 (o el chip avanza o se saca
   la hora del chip). Darle 3,5-4 s (ayuda con alta 2).

5. **La solución no resuelve el caso de la parte 1 tal como se contó.** En la parte 1 Pablo reserva el viernes a las 21:00
   para las 22:00 del mismo día (no hay "día antes" donde confirmar) y además escribe "¡Estamos llegando!" a las 21:58:
   es el que confirma y no viene. Para que la solución funcione, la parte 2 muda la reserva al miércoles y hace que Pablo
   no confirme. Un dueño de parrilla puede pensar "el que me clava igual confirma". Opciones: que en la parte 1 la reserva
   sea de antes ("el martes reservó para el viernes", chip/cuaderno) o que el agente también resuelva el día mismo (p. ej.
   "a las 22:20 la mesa se libera si no llegaron" / aviso a la lista de espera a las 22:15). Al menos que el callback no
   dependa de que Pablo cambie de comportamiento.

6. **Audio vs. globo en "Ese es para mí." (r6, ~34,2 s).** Las tres tomas de 12-raul el STT las oyó "ese para mí"
   (partes/rec/medidas.tsv): la "es" se come. El globo dice "Ese es [para mí.]". Verificar a oído; si no se oye "es",
   regenerar (p. ej. "Ese es para mí, eh.") o cambiar el globo a "Ese, para mí." / "Ese es mío.".

7. **Doble reserva de la mesa 3 en la demo del agente (Q3, ~32,8 s).** Q2 muestra las reservas de ese mismo viernes con
   "Ferreira · 2 · 21:30" en la mesa 3 (FILAS_R), y en Q3 el agente contesta "¿Mesa para 2 a las 21:30?" → "Sí: mesa 3 ✓".
   El rótulo de esa misma parte dice "con tus mesas reales": el agente estaría duplicando una mesa. Cambiar a otra mesa
   libre del plano (1, 2, 4, 6, 9 u 11).

8. **Portada: los personajes no llenan la mitad de arriba (punto 7).** En portada.png el tercio superior es techo oscuro y
   la lámpara; Raúl, Walter y la familia quedan en la franja media (y ~680-1200 de 1920), Raúl casi tocando el borde
   izquierdo. Además fuentes de la portada: según NOTAS-constructor se armó con un cuadro provisorio, no con el render
   final. Rehacer desde el fondo limpio con cámara más cerrada/baja (como hicieron parrilla-no-vuelve y corralon con
   VER=cam) para que las caras ocupen la mitad superior.

## BAJA

9. **El cliente del "remate del remate" y el dueño bien parado.** "Dejá los cubiertos." se entiende si el que mira leyó la
   tarjeta de Pablo (54 px, tres renglones, ~1,4 s antes del globo). Si no la leyó, el remate queda críptico. Que la
   tarjeta msj2 quede en pantalla hasta el globo y que la hoja "SÁBADO / PABLO · 8 · 22:00" se vea en el plano.
10. **Rótulo adelantado (P5c, ~16,4 s):** "Mesa de 8 vacía: 22:00 → 00:00" con el chip "Viernes, 23:40.": todavía no son
    las 00:00. "22:00 → 23:40" o mover el rótulo a P6 (23:58).
11. **Q4 (~35,3 s) "Viernes, 22:00." con la familia ya comiendo la tira** y Fabián preguntando por "los de las diez": a
    las 22:00 en punto recién se sientan. Chip "Viernes, 22:30." resuelve las dos cosas.
12. **Cuaderno (P1):** el renglón "MESA 3 · 2 · 21:30" (tachado) está escrito como si "MESA 3" fuera un nombre; los demás son
    apellidos. Usar un apellido.
13. **"No todo es el que no contesta" (LO PRIMERO, 3):** la parte 1 vuelve a mostrar "Sin contestar: 14" y la parte 2
    "Contesta a cualquier hora" + "14 → 0", el mismo dolor que corralon-portland (17-11) y que roza taller-esta-pronto de
    esta misma noche. Es secundario acá, pero conviene que la demo de Q3 no lo subraye más que la mesa liberada.
14. **guion.txt desactualizado:** los tiempos de los corchetes (parte 1 0-16, cartel 16-18,4, ~40 s) no son los del build
    (20,68 / 23,08 / 45,7) y dice "mujer y tres hijos, uno en brazos" (5 personas) cuando la familia de 6 incluye a la
    abuela; si queda un nene en brazos, $ 1.500 por un bebé es discutible. Alinear guion.txt con lo construido.
15. **Detalles de formato:** el chat dice "Miércoles 2:14" y el chip "Miércoles, 2:14." (coma); la nota de voz marca "0:03"
    y dura 2,4 s (aceptable). Línea chica "confirma y libera la mesa solo": se puede leer "sola" referido a la mesa; "el
    agente confirma y libera la mesa" o "confirma y libera mesas solo" es más claro.
