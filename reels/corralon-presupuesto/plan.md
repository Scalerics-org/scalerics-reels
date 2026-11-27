# corralon-presupuesto · plan · CORRALONES, dolor + solución (3D real), ~43,4 s

**De qué trata.** Sábado 10:00 en "Materiales Gustavo" (el corralón de `corralon-portland` y `ferreteria-encargo`).
Mónica, que se está haciendo la casa a media cuadra (enfrente, se ve el terreno desde el portón), desenrolla sobre el
mostrador la lista de materiales de la obra: el rollo cae hasta el piso. **"Gustavo, ¿me pasás presupuesto? Es toda la
casa."** / **"Te lo armo para el lunes."** Domingo a la noche, el corralón cerrado: Gustavo solo con la lámpara, la lista,
el mate y la calculadora de rollo; la cinta crece hasta el piso (19:10 → 21:30 → 23:20: 4 horas, 86 renglones), "Total
$ 1.260.000", Enviar → "Visto". Jueves, Tito en el mostrador: **"Gustavo, ¿la de la casa te compró?"** / Gustavo, digno:
**"Yo no ando persiguiendo a nadie."** Tres semanas después, frente al portón: un camión gris sin nombre descarga
ladrillos en la obra de Mónica. Ella cruza feliz: **"¡Gustavo! ¡Arrancamos la casa!"** / **"El de la otra cuadra me
escribió todos los días. ¡Un pesado!"** Pausa (rótulos: "Presupuesto: 4 horas · $ 1.260.000: con otro"). Gustavo, seco:
**"Por lo menos yo no fui pesado."** Remate del remate: **"¡Y gracias por tu presupuesto! Se lo pasé a él."** (inserto:
en el tablero del camión gris, la hoja "MATERIALES GUSTAVO · PRESUPUESTO" con los números tachados en birome). Cartel
**"Un seguimiento más tarde…"**. Parte 2: el mismo pedido; **"Te lo armo ahora."** y en la tablet el presupuesto se arma
con la lista de precios del corralón; Enviar: a Mónica le llega con los botones "Aceptar" / "Tengo una duda"; dos días
después el sistema le avisa a Gustavo "Mónica no respondió · hoy toca seguimiento" con el mensaje listo, un toque, y
Mónica: **"¡Ay, qué atentos!"** → "Aceptar" → "Aceptado ✓ · Primera entrega: lunes 8:00"; Tito (el mismo audio): "¿La de
la casa te compró?" / **"Compró. Con un botón."** y el panel "Presupuestos abiertos" (ganados, abiertos, perdidos); tres
semanas después, el mismo encuadre: el camión navy de MATERIALES GUSTAVO descarga enfrente; "¡Gustavo! ¡Arrancamos la
casa!" (el mismo audio) / **"Ya sé. Es mi camión."**; Tito enrolla la cinta de la calculadora y la guarda en el cajón.
Cierre: Gustavo a cámara: **"Comentá PRESUPUESTO y te mando cómo funciona para tu corralón."**

- **Producto: CRM de presupuestos** (sistema de presupuestos a medida). Cada presupuesto se carga con **cliente, obra y
  monto** (y los materiales, desde la lista de precios del corralón); se manda por WhatsApp con botones **"Aceptar" /
  "Tengo una duda"**; si a los **2 días** el cliente no respondió, **le recuerda al dueño** que toca seguimiento y le deja
  el mensaje listo para mandar con un toque (ni pesado ni callado: un mensaje útil a tiempo); panel **"Presupuestos
  abiertos"** con lo **ganado**, lo **abierto** y lo **perdido** (con el motivo). **No es agente de IA:** no se lo llama
  así en ningún lado. Se nombra en el cartel ("Un seguimiento más tarde…"), en la línea chica final ("Presupuestos con
  seguimiento · scalerics.com") y en `descripcion.txt`. El cartel nunca dice "Scalerics".
  - Nota para el coordinador: "armado con tu lista de precios" (Q1) es una extensión chica del brief (que pide cliente,
    obra y monto) para resolver las 4 horas de la parte 1. Si se prefiere no prometerlo, Q1 queda con "Te lo armo para el
    lunes." (el mismo audio de P1) y la tablet muestra solo la ficha "Cliente · Obra · Monto".
- **Sin marcas:** ladrillos, bolsas y hierro genéricos (bolsas kraft crema con franja navy "PORTLAND · 25 kg" de
  corralon-portland, sin cementera; nada de marcas de pinturas); camión gris liso sin nombre ni logo (el de la foto de
  corralon-portland, acá en 3D en la calle) y camión navy "MATERIALES GUSTAVO" (inventado, el de corralon-portland);
  calculadora de rollo genérica (sin marca en la tapa); chat genérico (sin el verde ni el logo de WhatsApp: la palabra
  "WhatsApp" solo en texto); tablet y celulares sin logo. El otro corralón NO tiene nombre: es "el de la otra cuadra".
- **Sin datos de afuera:** $ 1.260.000 (obra gris de la casa de Mónica), 4 horas (19:10 → 23:20), 86 renglones, 2 días,
  los números del panel: todo del caso. No hace falta `fuentes.md`.
- **Estructura:** parte 1 ~19,1 s + cartel 2,3 s + parte 2 ~19,0 s + cierre 3,0 s = ~43,4 s. Solución + cierre = 22,0 s
  (51 %). Si las tomas alargan la parte 1, se recorta el montaje P2 (mínimo 2,4 s) y la pausa, nunca la parte 2. Proyecto
  3D con gen.mjs (T1/T2) y `armar.mjs unir`, copiando `reels/ferreteria-encargo` (mismo local y elenco) y la forma de
  `reels/taller-service`.
- **Nadie queda mal parado:** Gustavo trabajó 4 horas y tenía buen precio; no escribió por respeto ("no ando
  persiguiendo"), que es lo que hace casi todo dueño. Mónica es de buena fe y contenta (agradece de verdad). El de la otra
  cuadra no es malo: insistió. El chiste es contra la situación: el que insiste gana, aunque sea con tu presupuesto.

## Voces (Gemini; sin Orus)
| quién | voz | líneas | tono |
|---|---|---|---|
| Gustavo (dueño, ~50) | **Alnilam** (el de siempre) | "Te lo armo para el lunes." · "Yo no ando persiguiendo a nadie." · "Por lo menos yo no fui pesado." · "Te lo armo ahora." · "Compró. Con un botón." · "Ya sé. Es mi camión." · "Comentá PRESUPUESTO y te mando cómo funciona para tu corralón." | grave, pausado, de mostrador. "No ando persiguiendo" con orgullo tranquilo, sin soberbia. "Por lo menos yo no fui pesado." PLANO, después de ~0,5 s de pausa, con la cama baja: consuelo seco, no queja; si suena a reto o a llanto, regenerar. "Es mi camión." con media sonrisa. |
| Mónica (clienta, ~40, se hace la casa) | **Laomedeia** (nueva para este personaje; antes solo Alicia, secundaria de pilates-cuota; fallback Pulcherrima) | "Gustavo, ¿me pasás presupuesto? Es toda la casa." · "¡Gustavo! ¡Arrancamos la casa!" · "El de la otra cuadra me escribió todos los días. ¡Un pesado!" · "¡Y gracias por tu presupuesto! Se lo pasé a él." · "¡Ay, qué atentos!" | decidida, simpática, de buena fe total. "Es toda la casa" con una risita (sabe que es mucho). "¡Un pesado!" riéndose, con cariño (por eso le compró). "Se lo pasé a él." agradecida de verdad, como quien cuenta algo útil: cero maldad. Más joven y rápida que Alicia. |
| Tito (albañil veterano, ~65) | **Enceladus** (el de siempre) | "Gustavo, ¿la de la casa te compró?" | tranquilo, de confianza, curioso de obra. **El mismo audio en P3 y Q4.** |
| Narrador del cartel | **Rasalgethi** | "Un seguimiento más tarde." | caricaturesco; toma nueva; atempo 1,1 si pasa de 2,4 s; fallback "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav`. |

- Callbacks con el MISMO audio: `01-monica` (P1 y Q1), `03-tito` (P3 y Q4), `05-monica` (P4 y Q5). Por eso `05` y `06`
  van en archivos separados (se pegan en P4 con ~0,3 s mientras se ve el camión).
- "PRESUPUESTO" en voz se dice normal; en pantalla en mayúsculas en el recuadro verde.
- Burbujas sin voz: la lista "LISTA DE MATERIALES · CASA", la cinta de la calculadora, los chips de hora, "Visto", la hoja
  tachada en el camión gris, los chats y botones, el panel, los rótulos.

## Personajes
- **Gustavo** (el de `corralon-portland`/`ferreteria-encargo`, `assets/tres.js`: chaleco acolchado navy, camisa crema,
  lápiz de carpintero en la oreja). P1 sonrisa de oficio, mira el rollo que no termina; P2 lentes en la punta de la nariz
  (nuevo accesorio chico, opcional), cansado; P3 tranquilo, digno; P4-P5 cara quieta mirando el camión (el remate); P6
  mira a Mónica, después la calle. Parte 2 relajado, media sonrisa.
- **Tito** (el de siempre: gorro de lana navy, campera crema empolvada). P3 y Q4 codos en el mostrador; Q5 enrolla la cinta
  de la calculadora y la mete en un cajón (sin voz).
- **Mónica (NUEVA, sumarla al elenco del corralón):** ~40, pelo castaño oscuro atado en cola, campera rompevientos
  crema `#efeee5` con cuello navy, jean navy claro, una carpeta de obra bajo el brazo. En P4/Q5
  con casco blanco de visita de obra en la mano (no puesto: que se vea la cara). Proporciones y ojos como Susana/Graciela;
  pelo con volumen (no casquete). Expresiones: risita (P1), feliz (P4), agradecida (P6), sorpresa contenta (Q3).

## Escenarios y objetos 3D por escena
- **Set: el corralón "Materiales Gustavo"** reusado (galpón de chapa navy `#1f3254`, mostrador, pizarrón de tiza, portón
  grande al patio y a la calle). Luz de sábado a la mañana en P1/Q1 (no el amanecer de portland: cielo crema-celeste plano).
  **Nuevo: la calle frente al portón con la obra de Mónica enfrente** (terreno con cimientos y las primeras hiladas de
  ladrillo, una pila de arena, un andamio de caños, un cartel de obra en blanco sin texto) para P4/Q5.
- **P1/Q1 · la lista de materiales:** rollo de planilla crema `#efeee5` con renglones navy y título "LISTA DE MATERIALES ·
  CASA" (canvas, Lexend ≥ 40 px), que Mónica desenrolla y cae por el frente del mostrador hasta el piso (cinta curva por
  segmentos, determinística). En Q1 la misma lista, pero Gustavo la pasa por la tablet.
- **P2 · el montaje del domingo a la noche:** el mostrador con el corralón cerrado (portón bajado, una sola lámpara de
  brazo crema, fondo navy plano, sin degradé), la lista, el mate, y **la calculadora de rollo** (cuerpo crema, teclas navy,
  display verde apagado; el rollo de papel arriba) con **la cinta impresa** que crece y cae del mostrador al piso, enrulada
  (segmentos de cinta con números navy); reloj de pared o chips "Domingo, 19:10." → "21:30." → "23:20."; push-in al display
  "1.260.000". Inserto del celular: "Presupuesto · Casa Mónica · $ 1.260.000" → "Enviado 23:22" → "Visto ✓✓".
- **P3/Q4 · el mostrador** de día con Tito (Q4 con la tablet en su atril).
- **P4 · la calle:** desde el portón, contraplano a la obra de enfrente: **camión gris liso sin nombre** (plataforma con
  pallets de ladrillos y bolsas, grúa hidrogrúa chica o dos peones genéricos bajando ladrillos de a uno, determinístico),
  Mónica cruzando con el casco en la mano. Rótulos en la pausa con guía al camión.
- **P6 · inserto del tablero del camión gris:** la hoja "MATERIALES GUSTAVO · PRESUPUESTO · Casa Mónica" apoyada en el
  parabrisas por dentro, con los totales tachados en birome roja apagada y otro número al lado (sin texto del otro
  corralón). ≥ 60 % del cuadro.
- **Q2/Q3 · el celular de Mónica** (`crearCelular`, pantalla canvas, ≥ 60 % del cuadro). En Q3 ella en su terreno (la
  misma obra, ahora sin camión: solo cimientos), con el casco en la mano.
- **Q1/Q4 · la tablet** del mostrador (la de ferreteria-encargo; push-in hasta ≥ 70 %). **Q3 · el celular de Gustavo**
  con el aviso de seguimiento.
- **Q5 · la calle:** el mismo encuadre de P4, con el **camión navy "MATERIALES GUSTAVO"** (el de corralon-portland) bajando
  los mismos ladrillos; en el tablero, la hoja con "Aceptado ✓" verde. Al fondo, en el mostrador, Tito enrolla la cinta.
- **Cierre:** Gustavo a cámara en el portón, con su camión descargando enfrente desenfocado lo justo; tarjeta PRESUPUESTO.

## Interfaz recreada (pantallas canvas, Lexend, textos ≥ 36 px)
1. **Nuevo presupuesto (tablet, Q1):** "Cliente: Mónica · 099 3·· ···" · "Obra: casa · obra gris" · renglones que se
   llenan solos desde la lista de precios ("Ladrillo de campo · 6.000 u", "Portland · 120 bolsas", "Hierro del 8 · 90
   barras", "Arena gruesa · 18 m³"…) · "Total $ 1.260.000" · botón "Enviar por WhatsApp" (verde) · chip "Sábado, 10:25.".
2. **Presupuesto a Mónica (celular, Q2):** cabecera "Materiales Gustavo" (avatar genérico de ladrillos) · tarjeta
   "Presupuesto · Casa Mónica · Obra gris · $ 1.260.000 · Válido 10 días" · botones "Aceptar" (verde) / "Tengo una duda".
   En la tablet, la tarjeta pasa de ENVIADO a VISTO.
3. **Aviso de seguimiento (celular de Gustavo, Q3):** "Mónica no respondió · 2 días · Hoy toca seguimiento" · mensaje
   listo: "Hola, Mónica. ¿Pudiste ver el presupuesto de la casa? Si querés, lo dividimos por etapas." · botón "Enviar ✓".
   En el celular de Mónica: el mensaje → ella toca "Aceptar" → "Aceptado ✓ · Primera entrega: lunes 8:00".
4. **Panel "Presupuestos abiertos" (tablet, Q4):** fila "Casa Mónica · $ 1.260.000 · Aceptado ✓" arriba en verde ·
   "Ganados: 4 · $ 2.135.000" (verde, el contador sube) · "Abiertos: 5 · $ 690.000 · Seguimiento hoy: 2" · "Perdidos: 1 ·
   $ 240.000 · Motivo: precio" (gris).
- Colores: rojo apagado `#c7655b` SOLO para el problema ("4 horas", "$ 1.260.000: con otro", "Seguimientos: 0", los
  tachones de la hoja); verde `#5ce611` para lo resuelto (✓, "Aceptar", "Aceptado", "Ganados", PRESUPUESTO).
- Burbujas de diálogo como en ferreteria-encargo (crema, borde navy 8 px, sombra dura, Lexend 800 navy ≥ 48 px). "Compró.
  Con un botón." en el mismo lugar y tamaño que "Yo no ando persiguiendo a nadie."; "Ya sé. Es mi camión." en el mismo
  lugar que "Por lo menos yo no fui pesado."

## Rótulos (caja navy, texto crema, línea guía)
- P2: "4 horas armándolo" (rojo apagado) · P4 pausa: "Presupuesto: 4 horas · $ 1.260.000: con otro" (al camión) y
  "Seguimientos: 0" · Q1: "Con tu lista de precios" · Q2: "Lo acepta con un botón" · Q3: "A los 2 días te avisa: toca
  seguimiento" · Q4: "Lo ganado, lo abierto y lo perdido".

## SFX
Papel que se desenrolla y cae (P1), teclas y el traqueteo de la impresora de la calculadora (P2, uno por chip), reloj de
pared, sorbo de mate, "fiu" de mensaje enviado y el doble tilde (P2), bip-bip de marcha atrás + motor diésel + ladrillos
que se apilan (P4), música que baja en la pausa, stinger (P6), pop por burbuja y rótulo, notificación del celular (Q2, Q3),
tap del botón, ding de "Aceptado", el camión de Gustavo (Q5), cinta que se enrolla y cajón que se cierra (Q5).

## Paleta y set (para "Hechos")
Corralón en galpón de chapa navy `#1f3254`, **sábado de mañana** (cielo crema-celeste plano) y **domingo de noche con una
sola lámpara** (fondo navy plano `#0b1220`), y por primera vez **la calle con la obra de enfrente** (terreno de tierra
crema-gris `#cfc9b6`, ladrillos terracota apagado `#b5694f` como único color cálido, andamio navy3). Distinto de
corralon-portland (madrugada) y ferreteria-encargo (pared de cajoncitos).
