# inmobiliaria-disponible · plan plano por plano · INMOBILIARIAS, dolor + solución (3D real), ~39 s

**De qué trata.** Martes 15:00. Silvana y Diego (los de `inmobiliaria-visitas`) le muestran un apartamento en Parque
Batlle a una pareja. Del celular de Silvana brotan burbujas "¿Sigue disponible?": el apartamento de Punta Carretas que
publicaron ayer explota. **"Silvana. El de Punta Carretas explota. Van doce."** / **"Contestales vos."** / **"Estoy
mostrando."** / **"Yo también."** Escalada muda hasta 38 sin contestar; entre ellas, Agustina a las 15:02: garantía ANDA,
se muda el 1°. Miércoles 9:10, Silvana contesta temprano y a la mejor primero: **"¡Hola, Agustina! Perdón la demora. Sí,
sigue disponible."** / nota de voz: **"¡Qué bueno! Yo ya no."** (alquiló ayer 16:30 en otra inmobiliaria; comisión de
este alquiler: $ 30.000). Remate del remate: el propietario, don Alberto, por altavoz: **"Silvana, ¿cómo va? ¿Nadie
preguntó por el apartamento?"** / Silvana, mirando "Sin contestar: 38": **"Preguntar, preguntaron."** Cartel **"Un agente
de IA más tarde…"**. Parte 2: la misma visita; el mismo "El de Punta Carretas explota." / **"¿Y quién contesta?"** /
**"Ya contestó. Le pidió la garantía y agendó."** (el chat del agente con la ficha real); el panel de Silvana: 38
contestadas, filtradas, 6 visitas en la agenda de Diego, 2 listos para firmar: **"Esos dos, para mí."**; miércoles 10:30
en la puerta de Punta Carretas, Agustina: **"¿Sigue disponible?"** / **"Sí."** / **"¡Qué bueno! Yo también."**; el mismo
audio de don Alberto: **"Treinta y ocho. Seis visitas. Y el viernes firman."** Cierre: Silvana a cámara: **"Comentá
DISPONIBLE y te mando cómo funciona para tu inmobiliaria."**

- **Producto: agente de IA** para el WhatsApp y las consultas de los portales de la inmobiliaria: contesta **al instante y
  a cualquier hora** con **los datos reales de cada propiedad** (precio, gastos comunes, garantías que acepta el
  propietario, mascotas, fotos), **filtra** (qué garantía tiene, para cuándo se muda, si tiene mascota y le ofrece otras
  que aceptan), **agenda la visita en la agenda del corredor** y la confirma, y **le pasa a la dueña los que están listos
  para firmar**. Se dice "agente de IA", nunca bot ni chatbot. Se ve en la parte 2, se nombra en el cartel, en el
  encabezado del chat ("Silvana Propiedades · agente de IA"), en la línea chica final y en `descripcion.txt`.
- **Sin marcas:** ningún portal inmobiliario nombrado ni dibujado (las consultas llegan a un chat genérico con un ícono de
  casita, de sobre y de cámara, sin logos ni colores de apps); celulares y monitor sin logo. Las garantías (ANDA, CGN,
  Porto Seguro) se nombran SOLO como texto en la ficha del agente (es lo que acepta este propietario), sin logos, sin
  colores, sin tipografías de esas empresas y sin opinar de ninguna. "Silvana Propiedades" es inventada; la otra
  inmobiliaria nunca se nombra ni se muestra.
- **Sin datos de afuera** (ver `fuentes.md`): $ 30.000, $ 5.000, 38 consultas, 6 visitas, $ 30.000 de comisión: todo del caso.
- **Estructura:** parte 1 **16,8 s** + cartel **2,4 s** + parte 2 **16,2 s** + cierre **3,8 s** = **~39,2 s**. Solución +
  cierre = 20 s (51 %). Proyecto 3D con gen.mjs copiando `reels/inmobiliaria-visitas` (mismo elenco, misma oficina; la
  infraestructura de burbujas, tarjetas pegadas a cámara, altavoz y chips ya está). **Si las tomas estiran a más de 42 s:**
  recortar primero la escalada muda P2 (2,4 → 1,8 s) y Q2 (3,2 → 2,6 s); nunca la pausa antes de "Yo ya no." (mín. 0,4 s
  después de "¡Qué bueno!"), ni la de antes de "Preguntar, preguntaron." (mín. 0,7 s), ni la de "Yo también." (mín. 0,5 s).
- **Cartel:** "Un agente de IA" / "más tarde…" · audio reusado de `reels/abren-hoy-completo/assets/voice/narrador.wav`.
- **Quién dice "Comentá DISPONIBLE": Silvana**, a cámara, en la oficina (de dueña a dueño). La palabra DISPONIBLE en
  pantalla, en la voz y en la primera línea de `descripcion.txt`.
- **Nadie queda mal parado:** Silvana y Diego no contestan porque están trabajando; al otro día Silvana contesta temprano,
  pide perdón y elige a la mejor. Agustina es simpática (se alegra por ellos). Don Alberto pregunta sin reproche. El
  chiste es contra la situación: dos personas, una visita y 38 consultas al mismo tiempo.

## Paleta y set (para "Hechos")
**(1) NUEVO: living vacío en alquiler en Parque Batlle, martes de tarde:** paredes crema `#efeee5` lisas, zócalo navy3, piso de monolítico gris cálido claro `#cfcabb` en placas grandes
(distinto del parquet en espiga de Pocitos), ventana grande con marco navy y árboles low-poly verde oscuro `#3fa60a` del
parque detrás (planos, sin degradé), una lámpara colgante sin pantalla (el foco pelado de apartamento vacío) y una
escalera de pintor plegada contra la pared. **(2) La oficina de "Silvana Propiedades"** de `inmobiliaria-visitas` (ladrillo
pintado crema, franja verde, piso navy2, panel de fichas en la vidriera) con DOS cambios para que no sea el mismo plano:
la ficha protagonista del panel es "ALQUILA · Punta Carretas · 1 dorm. · $ 30.000" con borde verde, y el **tablero de
llaves NO se ve** (cámara desde el otro lado: Silvana de frente con la vidriera a la izquierda). Mañana: luz más fría y
pareja. **(3) NUEVO: el palier de Punta Carretas** (Q3): puerta de apartamento navy3 con mirilla y número "3B" de bronce
apagado, el felpudo crema, pared crema, una planta en maceta navy. Anotar en "Hechos": "living vacío en alquiler en
Parque Batlle (crema, monolítico claro, foco pelado, árboles del parque); oficina de Silvana Propiedades desde la
vidriera con la ficha ALQUILA Punta Carretas; palier 3B; parte 2 con interfaz recreada (chat del agente con la ficha,
agenda del corredor, panel de consultas); cartel verde".
- **Rojo apagado `#c7655b` SOLO para el problema:** el contador "Sin contestar: 12 → 38", "Comisión de este alquiler:
  $ 30.000" en la parte 1, la tilde gris "enviado 9:10" (18 h después de la consulta), "Alquiló ayer 16:30 · en otra
  inmobiliaria". **Verde `#5ce611` para lo resuelto:** cada ✓ del chat, "Contestadas al instante: 38 ✓", "Visita
  confirmada ✓", los turnos de la agenda, "Listos para visitar y firmar: 2", "firma el viernes ✓", "Comisión ... ✓", "Sin
  contestar: 0", la tarjeta DISPONIBLE.
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  Las de consultas ("¿Sigue disponible?") son distintas: burbujas de chat chicas (≥ 40 px) que brotan del celular en
  abanico y se apilan; cada una con un iconito genérico de canal (casita = portal, globo = WhatsApp, cámara = Instagram)
  navy sobre crema, sin logos ni colores de apps. La de Agustina (nota de voz) sale del celular con la onda de audio y
  "0:02". "Yo ya no." y "Yo también." en el MISMO lugar y tamaño de pantalla (que se lea la vuelta).
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "INMOBILIARIAS" en el cuadro 0):
  "Martes, 15:00." · "Martes, 18:30." · "Martes, 23:10." · "Miércoles, 9:10." · [cartel] · "Martes, 15:00." · "Miércoles,
  10:30." · "Miércoles, 12:00." (Q4).

## Personajes (copia local de `reels/inmobiliaria-visitas/assets/personajes.js` + cómo los arma su tres.js)
- **Silvana** (la de visitas: blazer navy, melena platinada, Erinome). P1/Q1: sonrisa de vendedora fija para la pareja,
  habla de costado. P3: `concentrada` con el café; en "Yo ya no." se queda quieta, el café a medio camino, cara `neutra`
  sin drama (no llora, no se enoja). P4: mira el celular, `resignado` seco. Q2: media sonrisa. Q3: `sonrisa` abriendo la
  puerta con la llave. Q4/cierre: `sonrisa` de colega.
- **Diego** (el de visitas, Achird): siempre con su celular en la mano. P1 bajito, inclinado hacia Silvana. Q1 le muestra
  el celular (el inserto sale de ese celular).
- **Agustina** (NUEVA, ~29): pelo castaño oscuro atado en una cola alta, campera de jean crema clara (no celeste: crema
  `#efeee5` con costuras navy), mochila navy, aritos verdes chiquitos. Solo aparece en persona en Q3 (en la parte 1 es la
  burbuja de chat y la nota de voz, con su avatar circular de iniciales "AG"). `feliz` en Q3.
- **Don Alberto** (NUEVO, solo voz por altavoz y su contacto en pantalla: avatar circular con iniciales "DA" navy, nada de
  cara). Charon.
- **La pareja de Parque Batlle:** dos DEFECTO (como la pareja de Q1 de visitas, con otra ropa: él con buzo verde oscuro,
  ella con tapado crema), mirando el placard, la ventana; en "Yo también." giran la cabeza de Silvana a Diego (P1) y en Q1
  siguen mirando la ventana tranquilos (nadie se distrae).

## Planos
| # | t (s) | dur | Qué se ve | Objetos 3D | Cámara | Audio |
|---|---|---|---|---|---|---|
| P1 | 0,00-4,60 | 4,6 | **Cuadro 0:** "INMOBILIARIAS" gigante (caja navy) + chip "Martes, 15:00." · el living vacío de Parque Batlle: la pareja al centro mirando la ventana; Silvana a la izquierda con el celular en la mano (pantalla prendida) y Diego a la derecha mirando el suyo · ya hay 3 burbujas "¿Sigue disponible?" brotando del celular de Silvana en el cuadro 0 (no arranca vacío) · Diego: "...explota. Van doce." · contador chico pegado al celular "Sin contestar: 12" · "Contestales vos." / "Estoy mostrando." / pausita / "Yo también." (la pareja gira la cabeza de uno a otro) | living (paredes, piso, ventana con árboles, foco pelado, escalera de pintor), 4 personajes, celular de Silvana, celular de Diego, burbujas de chat 3D planas (cajas redondeadas crema con texto) | plano general a la altura del pecho, push-in lento; en "Yo también." corte a un plano medio de Silvana con la pareja fuera de foco | ambiente de apartamento vacío (eco), vibra + `notification` en cada burbuja, `pop` |
| P2 | 4,60-7,00 | 2,4 | Escalada muda: el celular de Silvana sobre su escritorio de la oficina vacía (luz de tarde → de noche por la vidriera), vibrando y girando un poco sobre la mesa · chips "Martes, 18:30." → "Martes, 23:10." · contador grande "Sin contestar 12 → 38" (rojo apagado, con `tic-real` por cada número) · burbujas: "¿Sigue disponible?" ×6, "¿Acepta mascotas?", "¿Gastos comunes?" · se ilumina la de Agustina (15:02): "¿Sigue disponible? Tengo garantía ANDA y me mudo el 1°." · rótulo con línea guía: "La inquilina ideal" | celular grande (≥ 60 % del ancho), escritorio, vidriera que oscurece, burbujas | travelling cenital que baja hasta el celular | vibra en loop, `tic-real`, `zumbido-largo` bajo |
| P3 | 7,00-11,60 | 4,6 | Chip "Miércoles, 9:10." · la oficina de mañana, Silvana con el café, temprano, sola · inserto del chat de Agustina (≥ 60 %): su consulta de ayer 15:02 y abajo Silvana tipea "¡Hola, Agustina! Perdón la demora. Sí, sigue disponible." → "enviado 9:10" · "escribiendo…" · nota de voz 0:02 · la burbuja grande sale del celular: "¡Qué bueno! Yo ya no." | oficina, Silvana, taza de café, celular | plano medio, push-in al celular | `key-press` en el tipeo, `whoosh` enviado, `notification` de la nota de voz |
| P3b | 11,60-13,00 | 1,4 | **La pausa.** Silvana quieta, el café a medio camino · rótulos con línea guía: al celular "Alquiló ayer 16:30 · en otra inmobiliaria", a la ficha ALQUILA de la vidriera "Comisión de este alquiler: $ 30.000" (rojo apagado) | ficha de la vidriera con su borde verde → se apaga a gris | quieta, un respiro | la música se corta seca |
| P4 | 13,00-16,80 | 3,8 | **Remate del remate.** Vibra el celular: "Don Alberto · propietario" (avatar "DA") · altavoz: "Silvana, ¿cómo va? ¿Nadie preguntó por el apartamento?" · Silvana baja la vista a la pantalla: "Sin contestar: 38" · pausa 0,7 s · primer plano: "Preguntar, preguntaron." · stinger | Silvana, celular | primer plano lento sobre Silvana, inserto del celular con el 38 | `vibra`, filtro de altavoz, `stinger` |
| C | 16,80-19,20 | 2,4 | Cartel time card: "Un agente de IA" / "más tarde…", fondo verde de marca con manchas y burbujas, letras que rebotan | (HTML) | — | narrador reusado |
| Q1 | 19,20-24,60 | 5,4 | Chip "Martes, 15:00." · el MISMO encuadre del cuadro 0 · el celular de Silvana quieto; vibra una vez · el mismo audio de Diego "...explota. Van doce." / Silvana: "¿Y quién contesta?" / Diego le muestra su celular · **inserto ≥ 60 %** del chat "Silvana Propiedades · agente de IA": Agustina 15:02 "¿Sigue disponible?" → agente 15:02: "¡Hola, Agustina! Sí. 1 dorm. en Punta Carretas · $ 30.000 + gastos comunes $ 5.000 · Garantías: ANDA, CGN, Porto Seguro o depósito · No acepta mascotas · 12 fotos ▸" (una tira de 3 miniaturas: living, cocina, dormitorio, dibujadas en el estilo del reel) → "¿Con qué garantía y para cuándo?" → "ANDA, para el 1°." → "¿Te queda bien mañana 10:30 con Diego?" → "¡Sí!" → "Visita confirmada ✓ Mié 10:30 · Diego" · "Ya contestó. Le pidió la garantía y agendó." · rótulo: "Contesta al instante, con los datos de la propiedad" | living + personajes, celular de Diego con la pantalla en textura (canvas), cada burbuja del chat como tarjeta | igual que P1 → push-in al celular de Diego hasta llenar | `notification` suave por mensaje, `ding` en "confirmada" |
| Q2 | 24,60-27,80 | 3,2 | El monitor de la oficina, **inserto ≥ 70 %**: "Punta Carretas · hoy" · "Consultas: 38" · "Contestadas al instante: 38 ✓" · "Con mascota: 5 → le ofreció 2 que aceptan" · "Sin garantía: 9 → le mandó los requisitos" · "Visitas agendadas: 6 ✓" · la agenda de Diego al lado se llena de a uno: Mié 10:30 Agustina · 11:30 · 12:15 · Jue 17:00 · 18:00 · Vie 10:00 · al final, resaltado en verde: "Listos para visitar y firmar: 2 → para vos, Silvana" · Silvana entra en cuadro mirando: "Esos dos, para mí." | monitor grande, agenda como columna de tarjetas 3D que caen, Silvana | travelling sobre el monitor, de la lista a la agenda | `pop` por turno, `tic-real` |
| Q3 | 27,80-31,40 | 3,6 | Chip "Miércoles, 10:30." · el palier de Punta Carretas, puerta 3B · Agustina (campera crema, mochila) llega; Silvana abre la puerta con la llave, Diego atrás · "¿Sigue disponible?" / "Sí." / pausita / "¡Qué bueno! Yo también." (la burbuja en el MISMO lugar y tamaño de "Yo ya no.") · rótulo verde: "Agustina · ANDA · firma el viernes ✓" | palier, puerta 3B que se abre, Silvana, Diego, Agustina, la llave | plano medio de los tres en la puerta; en "Yo también." push-in corto a Agustina | `puerta-abre`, `llaves`, `ding` |
| Q4 | 31,40-35,40 | 4,0 | Chip "Miércoles, 12:00." · la oficina, Silvana en su escritorio con el monitor (38 contestadas ✓) · vibra: "Don Alberto · propietario" · el MISMO audio "Silvana, ¿cómo va? ¿Nadie preguntó por el apartamento?" · Silvana, tranquila: "Treinta y ocho. Seis visitas. Y el viernes firman." · la ficha ALQUILA de la vidriera: cae en diagonal la franja verde "RESERVADO ✓" · rótulos: "Comisión de este alquiler: $ 30.000 ✓" (verde) · "Sin contestar: 0" | oficina, Silvana, monitor, ficha de la vidriera, franja RESERVADO | plano medio → la vidriera | `vibra`, altavoz, `pop` en RESERVADO |
| F | 35,40-39,20 | 3,8 | Cierre: Silvana a cámara en la oficina, el monitor con el panel en verde detrás · tarjeta debajo de la cara: "Comentá" / **"DISPONIBLE"** (recuadro verde de selección) / "y te mando cómo funciona para tu inmobiliaria" (entra con "Comentá") · último segundo, abajo, chico: "Un agente de IA que contesta y agenda las visitas" / "scalerics.com" en verde | Silvana, oficina | plano medio quieto, push-in mínimo | cama musical que cierra |

**Q4 es el miércoles 12:00** (después de la visita de Agustina): "Y el viernes firman." es futuro, por eso la ficha
pasa a RESERVADO y no a ALQUILADO.

## Interfaz de la solución: números coherentes
- Propiedad: **Punta Carretas · 1 dormitorio · $ 30.000 por mes + gastos comunes $ 5.000** · garantías que acepta el
  propietario: **ANDA, CGN, Porto Seguro o depósito** · **no acepta mascotas** · 12 fotos · publicado el lunes.
- Martes 15:00 → 15:02 la consulta de Agustina; en la parte 1 a las 15:00 van 12 sin contestar, a las 23:10, 38.
- Parte 2, mismo martes: 38 consultas, 38 contestadas al instante; de ellas, 5 con mascota (se les ofrecen 2 propiedades
  que sí aceptan), 9 sin garantía (se les mandan los requisitos), **6 visitas agendadas** en la agenda de Diego (Mié
  10:30 Agustina, Mié 11:30, Mié 12:15, Jue 17:00, Jue 18:00, Vie 10:00), **"Listos para visitar y firmar: 2"**: Agustina (ANDA, se muda el 1°) y Martina (CGN, se muda el 1°) (Q2 es el martes a
  la noche, antes de las visitas). Los otros 18 consultaron y no siguieron (no se muestra, no hace falta).
- Comisión de este alquiler: **$ 30.000** (un mes del alquiler del caso; no se dice porcentaje ni "más IVA" ni quién la
  paga).
- Q4 (miércoles 12:00, después de la visita): "Treinta y ocho. Seis visitas. Y el viernes firman." → la ficha pasa a RESERVADO ✓.

## Remates
- **Remate:** "¡Hola, Agustina! Perdón la demora. Sí, sigue disponible." → "¡Qué bueno! Yo ya no." (la palabra del gancho
  se da vuelta: el apartamento sigue disponible; la inquilina ideal, no).
- **Remate del remate:** don Alberto, cordial: "¿Nadie preguntó por el apartamento?" → con 38 sin contestar en pantalla:
  "Preguntar, preguntaron."
- **Callbacks en la parte 2:** "¿Y quién contesta?" / "Ya contestó." (contra "Contestales vos." / "Estoy mostrando."),
  "¿Sigue disponible?" / "Sí." / "¡Qué bueno! Yo también.", y el mismo audio de don Alberto con "Treinta y ocho. Seis
  visitas. Y el viernes firman.".

## Portada (para `portada.json`, copiar la de inmobiliaria-visitas)
`grande` "¿Sigue disponible?" · `chica` "Martes, 15:00." · `sello` "INMOBILIARIAS" · fondo limpio de P1 (~t 2,0: Silvana,
la pareja y Diego llenando la mitad de arriba, con las burbujas 3D de consultas brotando del celular; sin chip, sin
"INMOBILIARIAS" ni subtítulos: `LIMPIO=1`).
