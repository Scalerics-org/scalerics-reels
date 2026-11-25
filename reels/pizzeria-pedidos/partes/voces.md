# pizzeria-pedidos · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/pizzeria-pedidos` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "<tono de lineas.tsv>"`.
Recortar silencios (silenceremove), recortes en `partes/rec/`, finales en `assets/voice/`. Medir cada línea con
`tiempos.mjs` ("oyó:" tiene que coincidir con el texto del .txt).

## Elenco y voces (todas nuevas o casi sin uso en el repo, para que no suenen a otro personaje)
Conteo de `partes/voces.md` del repo al 25-11: Algieba 0, Erinome 0, Despina 1, Puck 4, Enceladus 8.
- **Tano = Algieba** (nunca usada). Dueño de Pizzería Don Tano, ~55. Si suena a locutor o demasiado suave, probar
  **Alnilam** con el mismo tono. No Algenib (Rubén), no Iapetus (Raúl), no Charon (muy usada).
- **Martín = Enceladus** (cliente, ~32). Alternativa: Sadachbia (pero hizo a Leo en dist-cartera, 24-11).
- **Facu = Puck** (repartidor de Tano, ~22). Puck hizo un dueño en taller-presupuestos (16-11): si el coordinador lo
  quiere evitar, **Zubenelgenubi** (Joaco de pilates-cuota).
- **Sabri = Despina** (repartidora de Lucía, ~25). Alternativa: Laomedeia.
- **Lucía = Erinome** (nunca usada). Dueña de Lucía Pizzas, ~38; dice el cierre. Alternativa: Pulcherrima.
- **Narrador del cartel = Rasalgethi** (el de siempre de los time cards). Frase nueva.
- **Ojo con gym-cupo** (se hace en paralelo): si usa alguna de estas, gana el que la generó primero; avisar al
  coordinador antes de cambiar.

## Tomas que se reusan (callback sonoro, a propósito)
- **07-tano** ("¡Ya sale!" con la boca llena) se oye DOS veces: en P4 en persona y en Q2 saliendo del celular de Martín,
  con filtro de audio de WhatsApp (highpass 300 Hz, lowpass 3,4 kHz, -3 dB). Misma toma: que el que mira la reconozca.
- **04-tano** y **07-tano** tienen el mismo texto pero tomas distintas: la 04 limpia, la 07 masticando. No intercambiar.

## Filtros
- **02-martin** sale del celular apretado en el hombro de Tano: filtro de teléfono (highpass 300 Hz, lowpass 3,4 kHz,
  un poco de saturación suave), -2 dB.
- Resto sin filtro. En la pizzería de Tano las voces van sobre el ambiente de cocina a full (horno, extractor, platos);
  en la de Lucía, el mismo ambiente pero más bajo y ordenado (la impresora de tickets como ritmo).

## Burbujas SIN voz (solo pop)
"¡Con V corta!" (del celular de Tano), los mensajes del chat de Tano ("¿Hacen envíos?", "¿Cuánto demora?", "Hola??",
"¿Están abiertos?"), "Martín: ¿Y mi pizza?", "Pizzería Don Tano: Disculpá, ¿calle qué?", el menú, el ticket, el
panel, los chips y los rótulos. Se tiene que entender sin sonido.

| archivo | quién | voz | texto | largo objetivo | proceso |
|---|---|---|---|---|---|
| 01-tano | Tano | Algieba | "Una muzza y dos fainá… ¿Calle qué?" | ~1,7 s | Sin filtro. "fainá" con tilde final bien marcada; si el STT oye "fina", regenerar. |
| 02-martin | Martín | Enceladus | "¡Duvimioso Terra!" | ~0,8 s | Filtro de teléfono. Que "Duvimioso" se entienda entero (si sale "Dubimoso" o "Duvimoso", regenerar). |
| 03-tano | Tano | Algieba | "Ajá. ¿Con be larga?" | ~0,9 s | Sin filtro. |
| 04-tano | Tano | Algieba | "¡Ya sale!" | ~0,5 s | Sin filtro. |
| 05-facu | Facu | Puck | "Tano. Dubimioso no existe." | ~1,4 s | Sin filtro, voz un poco ahogada por el casco abierto (opcional, lowpass 6 kHz). "Dubimioso" CON B: es como lo escribió Tano; si el TTS lo corrige a "Duvimioso" igual suena igual (b y v suenan igual en español): no es problema, el chiste se lee en la comanda. |
| 06-tano | Tano | Algieba | "Cenamos." | ~0,5 s | Sin filtro. EL remate: va después de 0,6 s de pausa con la cama baja. Si suena triste o enojado, regenerar. |
| 07-tano | Tano | Algieba | "¡Ya sale!" (boca llena) | ~0,6 s | Sin filtro en P4; con filtro WhatsApp en Q2. Si no suena masticando, probar el tono con "hablando con un bocado de pizza en la boca". |
| 08-narrador | Narrador | Rasalgethi | "Mientras tanto, en la de enfrente." | ~2,1-2,3 s | Frase nueva. Comparar con los narradores de `reels/parrilla-no-vuelve` y `reels/vete-racion`. Si pasa de 2,4 s, atempo 1,06. |
| 09-martin | Martín | Enceladus | "¿Ya está?" | ~0,6 s | Sin filtro. |
| 10-sabri | Sabri | Despina | "¿Martín? Una muzza y dos fainá." | ~1,6 s | Sin filtro. Callback textual de 01: mismo pedido. |
| 11-tano | Tano | Algieba | "¿Y esa cómo hace?" | ~0,9 s | Sin filtro, un poco de aire de calle (reverb exterior muy leve). |
| 12-lucia | Lucía | Erinome | "Comentá MENÚ y te mando cómo funciona para tu pizzería." | ~3,0 s | Sin filtro. Si pasa de 3,2 s, atempo 1,08. |

Si alguna voz no está disponible o suena mal, no usar Algenib, Iapetus, Umbriel, Gacrux, Callirrhoe ni Sulafat
(personajes recurrentes): avisar.

## Tomas elegidas (constructor, 25-11; `partes/procesar.sh`)
| final | toma | proceso | "oyó:" del STT |
|---|---|---|---|
| t1 | 01-tano-a | atempo 1,08 (r1: con 1,2 "¿Calle qué?" quedaba comprimido) | una musa ido faina calle qué (el STT no conoce "muzza" ni "fainá") |
| m1 | 02-martin-b | atempo 1,05 + filtro de teléfono | duvimioso Terra |
| t2 | 03-tano-a | atempo 1,12, pausa interna 0,59 → 0,34 s | Ajá con b larga |
| t3 | 04-tano-c | — | ya sale |
| f1 | 05-facu-a | atempo 1,22 | Tano dubimioso no existe |
| t4 | 06-tano-c | — | cenamos |
| t5 | 07-tano-a | atempo 1,08 (en Q2, filtro en la mezcla) | yo sale (boca llena) |
| narrador | 08-narrador-c | atempo 1,12 | Mientras tanto en la de enfrente |
| m2 | 09-martin-c | atempo 0,94 (r1: más lento) | ya está (6 tomas; las otras el STT las oía "YouTube") |
| s1 | 10-sabri-b | atempo 1,04 (r1: con 1,2 no se entendía) | Martín una musa ido faina |
| t6 | 11-tano-a | — | pieza Cómo hace ("y esa" → "pieza") |
| l1 | 12-lucia-c | atempo 1,2 (r1: cierre ≤ 3 s) | comentá menú y te mando cómo funciona para tu pizzería |
