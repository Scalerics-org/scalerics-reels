# contable-consultas · plan plano por plano · ESTUDIOS CONTABLES, dolor + solución (3D real), ~43 s

**De qué trata.** Lunes 9:00, "Estudio Adriana" (la casona del Cordón de `contable-papeles`, ahora de mañana). Adriana
abre el **balance de Súper Héctor (3 %)** y vibra el celular: audio de Marcelo, **"Adri, ¿cuándo vence lo mío?"**. Ella,
amable, sin dejar de teclear: **"El veintitrés, Marcelo."** Ráfaga de la semana: Graciela **"Adri, ¿cuánto pago este
mes?"**, Walter **"¿Te llegó lo que te mandé?"**, Marcelo otra vez **"¿Era el veintitrés?"**; en el monitor, "Consultas
de la semana" 14 → 38 → 63, y la barra del balance clavada en 3 %. Domingo 13:30, el asado en el patio de la casa: Jorge,
el marido, con la pinza: **"Adri, ¿cuándo comemos?"** Adriana, sin levantar la vista del celular: **"El veintitrés."**
Pausa, Jorge congelado con el chorizo en la pinza. Remate del remate: vibra el celular de Jorge: **"Es Marcelo. Que
cuándo vence lo suyo."** Chip "Balance de Súper Héctor: 3 %". Cartel **"Un agente de IA más tarde…"**. Parte 2: el mismo
lunes 9:00, el mismo audio; Adriana sigue tecleando y el agente le contesta a Marcelo con SUS datos (vence el 23, este
mes $ 14.300, la boleta, "llegaron tus facturas de octubre ✓"): **"¡Uh, qué rápida! Gracias, Adri."** / **"De nada."**
Ráfaga resuelta: a Graciela su monto y su boleta, a Walter "llegaron 12, falta el recibo del alquiler", a las 23:40 el
agente contesta con el estudio a oscuras, y la consulta de fondo de Héctor (el camión) le llega a Adriana: "Para vos".
Panel: 63 consultas · 61 contestó el agente · 2 para Adriana. La barra del balance sube a 100 %. Viernes: Lucas **"¿Ya?
¿El de Héctor?"** / **"Y el de Walter."** Domingo, el mismo asado: **"Adri, ¿cuándo comemos?"** / **"Ahora."** (deja el
celular boca abajo); vibra el celular de Jorge: **"Es Marcelo. Que sos un amor, que le contestaste al toque."** /
**"Sí. Un amor."** Cierre: Adriana a cámara: **"Comentá CONSULTAS y te mando cómo funciona para tu estudio."**

- **Producto: agente de IA para el WhatsApp del estudio contable.** Atiende al instante y a cualquier hora; reconoce al
  cliente por su número y le contesta con **sus** datos (cuándo vence lo suyo, cuánto paga este mes, qué comprobantes
  llegaron y cuál falta) y le manda su boleta o su recibo; lo que es de fondo (una consulta, una decisión) se lo pasa a la
  contadora con el resumen. Se ve funcionando en la parte 2 y se nombra en el cartel, en la línea chica final y en
  `descripcion.txt`. Se dice "agente de IA", nunca bot ni chatbot. El cartel nunca dice "Scalerics".
  **No prometer:** que el agente liquide impuestos, presente declaraciones ante la DGI o el BPS, ni que dé
  asesoramiento: los datos que da son los que el estudio ya cargó (vencimiento, monto, comprobantes recibidos), y lo
  de fondo va a Adriana. El agente se presenta como "Asistente del estudio" (que no se haga pasar por Adriana: Marcelo
  le agradece "al estudio", ver decisiones dudosas).
- **Sin marcas:** "Estudio Adriana", "Panadería Marcelo", "Súper Héctor", "Rotisería Graciela", "Bar Walter" son
  inventados. Chat genérico (burbujas crema/navy, sin el verde ni el logo de WhatsApp; la palabra "WhatsApp" solo en un
  rótulo). Ni logo ni colores de la DGI o el BPS; la boleta es un rectángulo genérico "Boleta · octubre". Vino, carne,
  parrilla, celulares sin marca.
- **Sin datos de afuera** (ver `fuentes.md`): "el 23", "el 18", $ 14.300, $ 8.900, 63/61/2, 12 comprobantes, 3 % son del
  caso. **Ningún nombre de impuesto en la voz ni en los chats**, ninguna fecha presentada como regla general.
- **Estructura:** parte 1 **17,6 s** + cartel **2,4 s** + parte 2 **19,4 s** + cierre **3,6 s** = **43,0 s**.
  Solución + cierre = 23,0 s (53 %). Si las tomas alargan la parte 1, recortar la ráfaga P3 (nunca la pausa del remate
  ni la parte 2). Un proyecto 3D con gen.mjs (T1/T2) como contable-papeles.
- **Cartel:** **"Un agente de IA" / "más tarde…"**. Audio REUSADO de
  `reels/inmobiliaria-disponible/assets/voice/narrador.wav` (o el de `reels/resto-reservas`), atempo si pasa de 2,4 s.
- **Quién dice "Comentá CONSULTAS": Adriana**, a cámara (contable-papeles cerró Sofi). "Te mando", de colega a colega.
- **La palabra: CONSULTAS** (una, mayúsculas): es lo que la contadora tiene de más y lo que va a escribir. Se pensó
  VENCE (más corta y del chiste) pero "Comentá VENCE" se lee raro y no dice qué compra. En pantalla, en la voz y en la
  primera línea de `descripcion.txt`. Si a 130 px no entra en el 80 % seguro, 112 px; no partir la palabra.
- **Nadie queda mal parado:** los clientes preguntan de buena fe (es SU plata y las fechas cambian); Marcelo es simpático;
  Jorge no reprocha nada, se queda con el chorizo en la pinza; Adriana es amable y está saturada, no maltrata a nadie. El
  chiste es contra la semana de vencimientos, no contra los clientes.

## Paleta y set (para "Hechos")
**Dos sets. (1) "Estudio Adriana" de `contable-papeles`, REUSADO pero de MAÑANA** (pared navy2 `#16243d` con boiserie
crema, damero de calcáreas crema y navy, estantería de biblioratos, lámpara de banquero verde, ventana alta de casona con
postigos crema; afuera crema cálido de mañana). Cambios para que no sea el mismo plano: **sin el estante de 60 sobres**
(no es un reel de papeles) y con **el monitor de Adriana protagonista** (balance + contador de consultas) y el celular
sobre el escritorio; la ráfaga P3 pasa por la noche (lámpara verde prendida, ventana navy) solo en un corte. **(2) NUEVO:
el patio de la casa de Adriana, domingo 13:30:** **parrilla de ladrillo** crema `#e2d9c4` con campana y chimenea, la
**parrilla de hierro con brasas** (las de parrilla-no-vuelve, naranja apagado `#d9772f`, planas), **chorizos con la piel
dorada y la marca de la parrilla, una tira de asado, morrones con huevo**, la **pinza** larga; una **mesa de madera
clara** con **mantel a cuadros navy y crema**, pan en canasta, ensalada, dos vasos y una jarra de vino genérica, sillas
plegables navy; piso de **baldosas rojo ladrillo apagado lisas** (placas grandes), una **enredadera / parra** plana verde
oscuro `#3fa60a` arriba de un muro crema y el cielo crema de mediodía (sin degradé). Anotar en "Hechos": "estudio de
contable-papeles de mañana (monitor con balance 3 % y contador de consultas, sin los sobres) + patio de domingo con
parrilla de ladrillo, chorizos y mantel a cuadros navy; parte 2 con interfaz recreada (chat del agente con boleta,
panel de consultas 61/2, barra del balance); cartel verde".
- **Rojo apagado `#c7655b` SOLO para el problema:** la barra "Balance · Súper Héctor · 3 %" de la parte 1, "Consultas de
  la semana: 63", el chip "Balance de Súper Héctor: 3 %". **Verde `#5ce611` para lo resuelto:** cada ✓ del chat, "Contestó
  el agente: 61", "Para vos: 2", "Balance · Terminado ✓", la barra que sube, la tarjeta CONSULTAS, el recuadro de
  selección de los subtítulos. La lámpara verde es del set, no cuenta como "resuelto".
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien
  habla. **Los audios de los clientes** salen del celular de Adriana como burbuja de audio de chat (play, onda navy,
  "0:02") con el texto debajo y la etiqueta chica "Marcelo · panadería" / "Graciela · rotisería" / "Walter · bar". El
  mensaje a Jorge sale de SU celular (etiqueta "Marcelo · panadería" en su pantalla). En la parte 2, mismas burbujas en
  el mismo lugar y tamaño (callback).
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "ESTUDIOS CONTABLES" en el cuadro 0):
  "Lunes, 9:00." (P1, Q1) · "Lunes, 11:00." / "Miércoles, 23:40." / "Viernes, 19:00." (P3, Q3) · "Domingo, 13:30." (P4,
  Q4) · "Viernes, 18:00." (Q3b).

## Personajes (copia local de `reels/contable-papeles/assets/personajes.js` + las definiciones de Adriana, Marcelo y Lucas de su `tres.js`, iguales)
- **Adriana** (contadora, ~55, voz **Autonoe**), tal cual en contable-papeles (melena castaña con canas, lentes finos
  navy, camisa blanca y cárdigan navy3). En el asado, **sin el cárdigan**: camisa blanca arremangada (es domingo) y los
  mismos lentes. P1-P3 `concentrada` y amable al contestar; P4 la vista en el celular, cero expresión (el automático);
  P5 `resignado`, ojos cerrados, sin manos a la cara. Parte 2 `sonrisa` tranquila; Q4 deja el celular boca abajo y se
  levanta con el plato.
- **Jorge · personaje NUEVO** (el marido, ~58, voz **Zubenelgenubi**: grave, tranquilo, de entrecasa; usada solo en
  taller-presupuestos y pilates-cuota). Sumarlo al módulo con el mismo estilo: `piel: PIEL.media`, `pelo: PELO.gris`,
  `peinado: "costados"` (pelado arriba con costados grises; que no se parezca a Rubén: **sin bigote**, con **barba corta
  gris** `barba: 0x8a8580, barbaLarga: 0.3, barbaOpacidad: 0.6`), **chomba crema** con cuello navy, **delantal de asador
  navy3** con bolsillo (el celular asoma del bolsillo), pantalón cargo `0x5a5a4e`, alpargatas navy, `panza: 1.15`. Pinza
  en la mano derecha. Buen tipo: P4 se congela con el chorizo en la pinza (sin enojo, una ceja arriba), P5 lee el
  celular con los ojos entrecerrados (lentes de leer en la punta de la nariz si el módulo lo permite).
- **Marcelo** (panadero, voz **Enceladus**): solo voz y avatar en el chat, salvo **Q2**: su mano y el celular en primer
  plano sobre el mostrador de la panadería de contable-papeles (azulejo blanco con guarda verde, vitrina de bizcochos
  desenfocada); opcional plano corto de su cara sonriendo en "¡Uh, qué rápida!".
- **Graciela** (rotisería, `ELENCO.clienta`, voz **Gacrux**) y **Walter** (bar, `ELENCO.walter`, voz **Umbriel**): solo voz
  y avatar redondo en el chat (no aparecen en 3D).
- **Lucas** (asistente, de contable-papeles, voz NUEVA **Sadaltager**: joven, liviano): en su escritorio con el café, Q3b.
- **Súper Héctor:** solo como texto (el balance y su consulta del camión). Rubén no aparece (en dist-cliente-grande ya
  tiene contador hombre).

## Objetos 3D (específicos y reconocibles)
**Reusados** (de `reels/contable-papeles`): estudio entero (boiserie, damero, biblioratos, ventana con postigos, lámpara
de banquero verde, sumadora con tira corta), escritorio de Adriana y de Lucas, `crearCelular` (pantalla canvas), monitor
sin logo (pantalla canvas), panadería (Q2), cartel time card.
**Nuevos:**
- **La barra del balance en el monitor** (canvas, ≥ 60 % del cuadro en los insertos): "BALANCE 2025 · SÚPER HÉCTOR",
  barra gruesa con % gigante (Lexend 900, ≥ 90 px en el cuadro). Parte 1: 3 % rojo apagado, inmóvil. Parte 2: sube con
  tic de contador hasta "100 % · Terminado ✓" verde.
- **El contador de consultas** (columna derecha del monitor): "Consultas de la semana" 14 → 38 → 63 (parte 1, rojo
  apagado) y en la parte 2 "63 · Contestó el agente: 61 ✓ · Para vos: 2".
- **El patio del asado** (ver Paleta y set): parrilla de ladrillo con campana, brasas, **chorizos** (cilindros con la
  punta atada, piel dorada con rayas de la parrilla), **tira de asado** (franja con huesos cortos visibles: que no se
  confunda con un bife), **morrones rojos con huevo** adentro (la yema de frente), **la pinza** de acero, mesa con mantel
  a cuadros navy/crema, pan, ensalada, jarra y vasos, sillas plegables navy, parra arriba del muro.
- **El celular de Jorge:** `crearCelular` con funda crema, en el bolsillo del delantal; lo saca en P5 y Q4 (en la mano,
  no flota), pantalla con "Marcelo · panadería".
- **El chorizo en la pinza** (P4 congelado a medio camino entre la parrilla y el pan; en Q4 llega al pan).

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro final; celular/monitor ≥ 60 % del cuadro en los insertos)
**Números del caso (coherentes en todo el reel):**
| cliente | vence | paga este mes | comprobantes |
|---|---|---|---|
| Marcelo · Panadería | el 23 | $ 14.300 | octubre: llegaron 14 ✓ |
| Graciela · Rotisería | el 18 | $ 8.900 | octubre: llegaron 9 ✓ |
| Walter · Bar | el 23 | $ 11.200 | octubre: llegaron 12 ✓ · falta el recibo del alquiler |
| Héctor · Súper Héctor | consulta de fondo → Adriana | | |
Semana: 63 consultas (las mismas 3 preguntas). Parte 2: contestó el agente 61, para Adriana 2 (Héctor: el camión;
una más sin texto). Balance de Súper Héctor: 3 % → 100 %.

- **Chat de Marcelo, parte 1 (celular de Adriana, P1):** encabezado "Marcelo · panadería"; audio 0:02 "¿Cuándo vence lo
  mío?"; la respuesta de Adriana "El 23, Marcelo." ✓✓; en P3 "¿Era el 23?".
- **Chat del agente (Q2, celular de Marcelo a pantalla llena):** encabezado "Estudio Adriana · en línea"; el audio de
  Marcelo; la respuesta escribiéndose (tres puntitos 0,4 s) y entera: **"Hola, Marcelo. Lo tuyo de octubre vence el 23.
  Este mes son $ 14.300."** + adjunto **"Boleta · octubre · PDF"** + **"Tus facturas de octubre ya llegaron: 14 ✓"** +
  firma chica "Asistente del estudio". Hora "9:00". Rótulo HTML: **"Contesta con los datos de cada cliente"**.
- **Ráfaga resuelta (Q3, monitor de Adriana con la bandeja del agente):** tarjetas que entran con pop y tilde verde:
  "Graciela · ¿Cuánto pago este mes? → $ 8.900 · vence el 18 · boleta ✓" · "Walter · ¿Te llegó lo que te mandé? →
  Llegaron 12 ✓ · Falta el recibo del alquiler" · (chip "Miércoles, 23:40.", estudio a oscuras, la tarjeta igual entra)
  "Marcelo · ¿Era el 23? → Sí, el 23 ✓" · y **"Héctor · ¿Me conviene poner el camión a nombre de la empresa? → Para
  Adriana"** que salta a la columna **"Para vos (2)"** con borde verde. Rótulo: **"Lo de fondo te lo pasa a vos"**.
- **Panel (Q3, Q3b, cierre):** "Consultas de la semana: 63 · Contestó el agente: 61 ✓ · Para vos: 2"; "BALANCE 2025 ·
  SÚPER HÉCTOR · 100 % · Terminado ✓".
- **Celular de Jorge:** P5 "Marcelo · panadería: ¿Le preguntás a Adri cuándo vence lo mío?"; Q4 "Marcelo · panadería:
  Decile a Adri que es un amor, me contestó al toque".

## PARTE 1 · el problema (0,00-17,60 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,40 | **P1 · cuadro 0.** Plano medio de 3/4 desde atrás del monitor: Adriana en el escritorio, el monitor con la barra "3 %" legible, el celular vibrando en primer término. Push-in lento. | **Cuadro 0:** "ESTUDIOS CONTABLES" (Lexend 900 ~130 px, entero) y chip "Lunes, 9:00."; la burbuja de audio ya asomando. 0,20-1,80 · **Marcelo (audio): "Adri, ¿cuándo vence lo mío?"** | estudio de mañana, Adriana, monitor con balance, celular, lámpara, biblioratos | ambiente de estudio (reloj de pared, tráfico lejano) · `vibra` 0,05 |
| 2,40-4,30 | **P2 · Adriana.** Primer plano, teclea con una mano y graba con la otra. | 2,50-4,00 · **Adriana: "El veintitrés, Marcelo."** (amable, rápida) | Adriana, celular, teclado | `key-press` · `whoosh-short` al mandar |
| 4,30-8,60 | **P3 · la ráfaga.** Cámara fija al escritorio con cortes de luz: mañana → noche (lámpara verde prendida, ventana navy) → tarde. Las burbujas de audio entran con pop sobre el celular; el monitor de fondo. | 4,40-5,70 · **Graciela: "Adri, ¿cuánto pago este mes?"** chip "Lunes, 11:00." · 5,85-7,10 · **Walter: "¿Te llegó lo que te mandé?"** chip "Miércoles, 23:40." · 7,25-8,30 · **Marcelo: "¿Era el veintitrés?"** chip "Viernes, 19:00." · contador "Consultas de la semana" 14 → 38 → 63 (rojo apagado) · la barra queda en 3 % · rótulo **"Las mismas 3 preguntas"**. | escritorio, celular, monitor, lámpara, Adriana (cada vez más hundida en la silla, la taza de café se multiplica: 1 → 3) | `vibra` + `pop` por burbuja · `k-tick-1` en el contador · la música acelera |
| 8,60-13,00 | **P4 · remate.** Corte duro al patio, plano general: Jorge a la izquierda en la parrilla con la pinza y un chorizo; Adriana sentada a la mesa a la derecha con el celular. Push-in a los dos. | Chip "Domingo, 13:30." · 8,80-10,00 · **Jorge: "Adri, ¿cuándo comemos?"** · pausa 0,3 · 10,30-11,20 · **Adriana (sin levantar la vista): "El veintitrés."** · Jorge se congela con el chorizo en el aire; pausa 1,2 (la música se corta en seco en "veintitrés"). | patio, parrilla, brasas, chorizos, asado, morrones, pinza, mesa, Jorge, Adriana, celular | chisporroteo de brasas (real, CC0) · pájaros lejanos · corte de música 11,2 |
| 13,00-17,60 | **P5 · remate del remate.** Plano medio de Jorge: el celular vibra en el bolsillo del delantal; lo saca, lee (inserto ≥ 45 % de su pantalla). Contraplano corto de Adriana que cierra los ojos. | 13,10 · vibra · 13,40-15,60 · **Jorge: "Es Marcelo. Que cuándo vence lo suyo."** · Adriana cierra los ojos · chip rojo apagado **"Balance de Súper Héctor: 3 %"** · stinger 17,4. | Jorge, su celular, Adriana | `vibra` 13,1 · stinger 17,4 |

Último cuadro (17,60) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (17,60-20,00 s)
Time card de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan: **"Un agente de IA"** / **"más
tarde…"**. Audio reusado (Rasalgethi). Nunca "Scalerics".

## PARTE 2 · la solución (20,00-39,40 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 20,00-22,20 | **Q1 · el mismo cuadro 0.** Encuadre de P1; el monitor con la barra ya en movimiento (3 → 8 %). | Chip "Lunes, 9:00." · 20,20-21,80 · **el mismo audio de Marcelo: "Adri, ¿cuándo vence lo mío?"** · Adriana NO agarra el celular: en la pantalla del celular aparece "Contestó el asistente ✓". | ídem P1 | `vibra` · ambiente igual |
| 22,20-25,60 | **Q2 · el chat.** Inserto del celular de Marcelo a pantalla llena (≥ 70 %) sobre el mostrador de la panadería, su pulgar. | La respuesta del agente se escribe y llega entera (ver Interfaz) · el adjunto "Boleta · octubre" · "Tus facturas de octubre ya llegaron: 14 ✓" · rótulo **"Contesta con los datos de cada cliente"** · 24,20-25,50 · **Marcelo: "¡Uh, qué rápida! Gracias, Adri."** | celular de Marcelo, mostrador, vitrina desenfocada | `notification` 22,9 · `pop` del adjunto |
| 25,60-26,60 | **Q2b · Adriana.** Primer plano de P2: teclea el balance; en el monitor asoma la notificación "Marcelo: ¡Gracias, Adri!". | 25,70-26,40 · **Adriana (sin dejar de teclear, media sonrisa): "De nada."** | Adriana, monitor | `key-press` |
| 26,60-30,60 | **Q3 · la ráfaga resuelta.** Push-in al monitor (≥ 65 %): la bandeja del agente; un corte de 0,6 s al estudio a oscuras a las 23:40 (lámpara apagada) con el monitor que igual recibe la tarjeta. | Tarjetas de Graciela, Walter, Marcelo con ✓ · Héctor "¿Me conviene poner el camión a nombre de la empresa?" salta a **"Para vos (2)"** · rótulo **"Lo de fondo te lo pasa a vos"** · contador "63 · Contestó el agente: 61 ✓ · Para vos: 2" · la barra del balance sube 8 → 64 → 100 %. Sin voz. | monitor, estudio, lámpara | `pop` + `k-tick-1` por tarjeta · `ding` en "Para vos" |
| 30,60-33,00 | **Q3b · terminado.** Plano medio de los dos escritorios: Lucas con su café gira la silla; el monitor de Adriana "BALANCE · SÚPER HÉCTOR · 100 % · Terminado ✓". | Chip "Viernes, 18:00." · 30,80-31,90 · **Lucas: "¿Ya? ¿El de Héctor?"** · 32,00-32,90 · **Adriana: "Y el de Walter."** (abre otro balance) | Adriana, Lucas, monitores, taza | `cero.mp3` en "Terminado ✓" · `click-soft` |
| 33,00-39,40 | **Q4 · el mismo asado.** El MISMO encuadre de P4, después plano medio de Jorge (= P5). | Chip "Domingo, 13:30." · 33,20-34,40 · **el mismo audio de Jorge: "Adri, ¿cuándo comemos?"** · Adriana deja el celular boca abajo y se levanta con el plato: 34,60-35,10 · **"Ahora."** · el chorizo llega al pan · 35,40 vibra el celular de Jorge · 35,60-38,40 · **Jorge: "Es Marcelo. Que sos un amor, que le contestaste al toque."** · 38,60-39,30 · **Adriana (muerde el choripán): "Sí. Un amor."** | patio entero, Jorge, Adriana, chorizo, pan, celulares | chisporroteo · `vibra` 35,4 · música vuelve |

## CIERRE (39,40-43,00 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 39,40-43,00 | **C · Adriana a cámara.** Primer plano en el patio, de frente, el choripán dejado en el plato; detrás, la parrilla y Jorge desenfocado (nunca fondo liso). Push-in suave. | 39,55-42,60 · **Adriana: "Comentá CONSULTAS y te mando cómo funciona para tu estudio."** · sobre "CONSULTAS" entra la tarjeta abajo de la cara: "Comentá" / **"CONSULTAS"** (recuadro verde de selección) / "y te mando cómo funciona para tu estudio"; en los últimos 0,8 s, chico: "Un agente de IA contesta a cada cliente con sus datos" / "scalerics.com" en verde. | pop en "CONSULTAS" · cama que cierra con un acorde |

## El remate y el remate del remate
- **Remate (P4):** "Adri, ¿cuándo comemos?" / "El veintitrés." Una semana de 63 veces la misma pregunta y Adriana
  contesta en automático; la pausa con Jorge congelado y el chorizo en la pinza.
- **Remate del remate (P5):** ni el domingo ni el celular del marido: "Es Marcelo. Que cuándo vence lo suyo." Y el
  balance de Héctor en 3 %.
- **Callbacks de la parte 2:** el mismo audio de Marcelo contestado con SUS datos sin que Adriana lo toque ("De nada.") ·
  el balance llega a 100 % · el mismo "¿cuándo comemos?" → "Ahora." · el mismo celular de Jorge, ahora con un elogio:
  "Sí. Un amor."

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "ESTUDIOS CONTABLES" entero, sin tapar la cara de Adriana; la barra "3 %" y la burbuja de audio legibles.
- **Se entiende sin sonido:** burbujas de las 17 líneas; chips de día; el contador 14 → 63; "3 %"; el texto del celular
  de Jorge; el chat del agente; "Para vos (2)"; "100 % · Terminado ✓".
- **Continuidad:** P1 = Q1, P2 = Q2b, P4 = Q4, P5 = Q4 (Jorge) en encuadre; Adriana sin cárdigan solo en el patio; el
  chorizo en la pinza en P4 y P5, en el pan en Q4.
- **Física:** la pinza y el chorizo no atraviesan a Jorge ni la parrilla; el celular en la mano (no flota) y entra al
  bolsillo sin atravesar el delantal; el humo, si hay, plano y opaco (no degradé suave: Instagram lo rompe).
- **Números:** los de la tabla, iguales en todos los planos (el 23, el 18, $ 14.300, $ 8.900, 14, 12, 63, 61, 2, 3 %).
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 21,5 s.
- **SFX que no estén en `assets/sfx`** (chisporroteo de brasas, pájaros): reales CC0 (BigSoundBank o Freesound CC0), con
  autor, sitio y licencia en `fuentes.md`. Si parrilla-no-vuelve ya tiene brasas, reusar con su crédito.

## Voces (partes/*.txt; tonos en partes/lineas.tsv)
| archivo | personaje | voz | tono |
|---|---|---|---|
| 01-marcelo · "Adri, ¿cuándo vence lo mío?" | Marcelo | Enceladus | audio de WhatsApp, simpático, como quien pregunta algo mínimo; filtro de celular. Se reusa en Q1. |
| 02-adriana · "El veintitrés, Marcelo." | Adriana | Autonoe | amable, rápida, tecleando a la vez; sin fastidio. |
| 03-graciela · "Adri, ¿cuánto pago este mes?" | Graciela | Gacrux | audio, cálida, apurada. Filtro de celular. |
| 04-walter · "¿Te llegó lo que te mandé?" | Walter | Umbriel | audio, desde el bar, con ruido; filtro de celular. |
| 05-marcelo · "¿Era el veintitrés?" | Marcelo | Enceladus | audio, dudando, simpático. |
| 06-jorge · "Adri, ¿cuándo comemos?" | Jorge | Zubenelgenubi | tranquilo, de domingo, desde la parrilla. Se reusa en Q4. |
| 07-adriana · "El veintitrés." | Adriana | Autonoe | AUTOMÁTICO, plano, sin levantar la vista: la misma música que 02 (que se oiga que es la misma respuesta). |
| 08-jorge · "Es Marcelo. Que cuándo vence lo suyo." | Jorge | Zubenelgenubi | leyendo despacio el celular, sin enojo; pausa ≥ 0,3 s después de "Es Marcelo." |
| 09-narrador | narrador | Rasalgethi | reusado de inmobiliaria-disponible. |
| 10-marcelo · "¡Uh, qué rápida! Gracias, Adri." | Marcelo | Enceladus | sorprendido y contento. |
| 11-adriana · "De nada." | Adriana | Autonoe | media sonrisa, sin dejar de teclear. |
| 12-lucas · "¿Ya? ¿El de Héctor?" | Lucas | **Sadaltager** (nueva para él) | joven, asombrado. |
| 13-adriana · "Y el de Walter." | Adriana | Autonoe | tranquila, con un poquito de orgullo. |
| 14-adriana · "Ahora." | Adriana | Autonoe | cálida, presente, levantándose. |
| 15-jorge · "Es Marcelo. Que sos un amor, que le contestaste al toque." | Jorge | Zubenelgenubi | leyendo, divertido. Mismo arranque que 08. |
| 16-adriana · "Sí. Un amor." | Adriana | Autonoe | seca e irónica, con la boca medio llena de choripán; pausa ≥ 0,25 después de "Sí." |
| 17-adriana · "Comentá CONSULTAS y te mando cómo funciona para tu estudio." | Adriana | Autonoe | a cámara, de colega a colega. |
Pedir 3 tomas por línea. Verificar en el "oyó:" "veintitrés" (no "veinte tres"), "Héctor" y "al toque".

## Portada
`portada.json` (copia del de `anotamelo`): `chica` **"Domingo, 13:30."** · `grande` **"¿Cuándo vence?"** · `sello`
**"ESTUDIOS CONTABLES"**. Fondo limpio de **P4 (~t 10,6)**: Jorge con la pinza y el chorizo congelado y Adriana con el
celular, llenando la mitad de arriba (sin cartel, chip, burbujas ni subtítulos). Alternativa: P1 (Adriana con el
celular vibrando y el 3 %).
