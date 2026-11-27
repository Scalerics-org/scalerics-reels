# vete-castracion · plan · VETERINARIAS, dolor + solución (3D real), ~44 s

**De qué trata.** Jueves de cirugías en "Veterinaria Inés": seis castraciones en la pizarra (TOTO, COCO, PANCHO, SIMÓN,
NEGRO, MORA) y Luna en su transportadora para consulta. 9:02: Vero acaba de dejar a Toto y el teléfono del mostrador ya
suena. Bruno atiende con la correa de Toto en la mano; por la vidriera se ve a Vero en la vereda, con el celular en la
oreja: **"¿Cómo está Toto?"** / **"Vero. Te estoy viendo."** (ella saluda). Montaje del día en el mismo encuadre: 10:30
**"Está dormido."**, 12:00 **"Sigue dormido."**, 14:00 **"Sí. Dormido. Todavía."** con la frente en el mostrador; el
contador de llamadas sube (2 → 13 → 27) y la señora de la transportadora se cansa de esperar y se va. 15:30, la sala de
recuperación: Toto dormido con el collar isabelino sobre la manta, Coco en la camilla de al lado; Inés (gorro, barbijo
bajo, guantes) lo controla. Bruno se asoma con el inalámbrico: **"Doctora. Vero quiere hablar con él."** / **"Está
anestesiado."** / **"Dice que no importa."** Pausa con el costo (34 llamadas, 2 horas de teléfono, 3 consultas que se
fueron, $ 4.500). Inés, sin una palabra, le apoya el teléfono en la oreja a Toto: Toto ronca. Del teléfono, finito:
**"¡Ay, mi amor!"** Remate del remate: el teléfono vuelve a sonar en la mano de Inés; Bruno mira la pantallita: **"Ahora
el de Coco."** e Inés mira a Coco, que ronca también. Cartel **"Unos avisos automáticos más tarde…"**. Parte 2: el mismo
jueves 9:02, la misma vereda, pero el teléfono del mostrador no suena: el que vibra es el celular de Vero (foto de Toto
en recepción, "Toto ingresó ✓"): **"¡Ay, mirá! ¡Ya entró!"**. El panel "Pacientes de hoy": Bruno toca "En cirugía" y
sale el aviso. 15:30, Bruno filma 5 s a Toto despertando con la tablet y toca "Despertando": en su cocina, a Vero le
llega el video y se oye el ronquido: **"¡Ay, mi amor!"** (el mismo audio). Bruno toca la fila de Coco: **"Ahora el de
Coco."** (el mismo audio, ahora mandando). Inés sale del quirófano sacándose los guantes: **"Bruno, ¿llamó alguien?"** /
**"Nadie."** (la señora de la transportadora, atendida). 17:00: "Listo para retirar ✓" con las indicaciones; Vero entra
y, de costumbre: **"¿Cómo está Toto?"** (el mismo audio) / Bruno: **"Preguntale a él."** y Toto entra trotando con el
collar y le contesta con un ladrido. Cierre: Inés a cámara, **"Comentá AVISOS y te mando cómo funciona para tu
veterinaria."**

- **Producto: automatización de avisos** (Scalerics). Cada paciente del día en un panel "Pacientes de hoy" (foto, nombre,
  dueño, cirugía, etapa); Bruno o la doctora tocan la etapa (Ingresó · En cirugía · Despertando · Listo para retirar) y al
  dueño le llega solo un WhatsApp con el nombre de la mascota, la etapa y una foto o un video corto; el de "Listo" lleva
  la hora de retiro y las indicaciones de la doctora. Se muestra funcionando en la parte 2 (interfaz recreada), se nombra
  en el cartel ("Unos avisos automáticos"), en la línea chica final ("Avisos automáticos con foto en cada etapa" /
  scalerics.com) y en `descripcion.txt`. **No es agente de IA:** no se lo llama así. El cartel nunca dice "Scalerics".
- **Sin marcas:** teléfono inalámbrico genérico (base crema, auricular navy3, pantallita verde apagado con el nombre de
  quien llama), chat genérico (burbujas crema/navy, sin el verde ni el logo de WhatsApp; "WhatsApp" solo en texto de un
  rótulo), celular y tablet sin logo. "Veterinaria Inés" es inventada (la de los dos reels anteriores).
- **Sin datos de afuera:** el guion no dice cuánto dura una castración, ni la anestesia, ni ningún cuidado
  post-operatorio como dato general. Las indicaciones del aviso son "de la doctora" y genéricas ("Collar puesto", "Reposo
  hoy", "Control: lunes 10:00"). Las cifras son del caso: 6 cirugías, 34 llamadas, 2 horas (34 × ~3,5 min), 3 consultas
  que se fueron × $ 1.500 (la consulta de veterinaria-vacunas) = $ 4.500, "Llamadas: 34 → 3". No hace falta `fuentes.md`
  (salvo los SFX nuevos con licencia CC0, que anota el constructor).
- **Nada de quirófano a la vista:** ni bisturí, ni sangre, ni el perro abierto. El quirófano es una puerta de vaivén con
  ojo de buey ("QUIRÓFANO" en vinilo crema); lo que se ve es la sala de recuperación (camillas con manta, lámpara, el
  collar). Toto y Coco duermen tranquilos.
- **Estructura:** parte 1 ~19,0 s + cartel 2,5 s + parte 2 ~19,7 s + cierre ~3,0 s = **~44,2 s**. Solución + cierre =
  22,7 s (**51 %**). Si las tomas alargan la parte 1, se recorta primero el montaje P2 (mínimo 0,7 s por chip, 2,4 s en
  total) y el Q2; nunca la pausa antes del ronquido (≥ 0,6 s) ni el ronquido (≥ 0,7 s audible antes de "¡Ay, mi amor!").
  **Proyecto 3D: copia de `reels/vete-racion`** (Inés, Vero, Bruno, Toto y Coco en `assets/perro.js` con
  `crearCaraGato`, la recepción con vidriera y mostrador, la cocina de Vero, `crearCelular`, la tablet, gen.mjs con
  T1/T2, partes/procesar.sh, medir-tomas.sh, reintentar.sh).
- **Nadie queda mal parado:** Vero llama porque quiere a su perro (todos llamaríamos); Bruno es paciente hasta el final;
  Inés le pone el teléfono al perro sin un reproche: la santa de la escena. El chiste es contra el teléfono que no para.

## Voces (Gemini; sin Orus) · voz y tono de cada línea en `partes/lineas.tsv`
| quién | voz | líneas | tono |
|---|---|---|---|
| Vero (dueña de Toto) | **Callirrhoe** (la de siempre) | "¿Cómo está Toto?" · "¡Ay, mi amor!" · "¡Ay, mirá! ¡Ya entró!" | dulce, ansiosa sin drama; "¡Ay, mi amor!" derretida. En P1 y en P4 suena **por teléfono** (filtro de banda 300-3400 Hz, más bajo); en Q3 sale del celular en altavoz (filtro más suave); en Q5, en persona, sin filtro (la misma toma). |
| Bruno (recepción) | **Schedar** | "Vero. Te estoy viendo." · "Está dormido." · "Sigue dormido." · "Sí. Dormido. Todavía." · "Doctora. Vero quiere hablar con él." · "Dice que no importa." · "Ahora el de Coco." · "Nadie." · "Preguntale a él." | amable siempre; las tres de "dormido" cada vez más gastadas; "Dice que no importa." PLANO, sin opinar (si suena a burla de Vero, regenerar). |
| Inés (la doctora) | **Sulafat** | "Está anestesiado." · "Bruno, ¿llamó alguien?" · "Comentá AVISOS y te mando cómo funciona para tu veterinaria." | seca y profesional, sin enojo; cierre cálido de colega. |
| Narrador del cartel | **Rasalgethi** | "Unos avisos automáticos más tarde." | caricaturesco; toma nueva; atempo 1,1 si pasa de 2,6 s; fallback "Un sistema más tarde." de `reels/ya-lo-cargo`. |

- Mismos audios en las dos partes: **01 Vero** (P1 y Q5), **09 Vero** (P4 y Q3), **10 Bruno** (P5 y Q4). El callback se
  tiene que oír igual.
- **Toto no habla:** ronquido de perro real CC0 (no está en `assets/sfx`: buscarlo en freesound CC0 y anotarlo en
  `fuentes.md`; el ronquido de Coco, el mismo con pitch +3 semitonos y más bajo), ladrido contento de
  `ladrido-golden_fs146343_1.wav` en Q5.
- Burbujas sin voz: los chips de hora, la pizarra, la pantallita del teléfono, los avisos, el panel, los rótulos.

## Personajes (ELENCO de `reels/vete-racion/assets/personajes.js` y `perro.js`)
- **Bruno = `ELENCO.bruno`** (chaqueta navy de recepción): el protagonista del dolor. P1 tranquilo, el inalámbrico en la
  oreja, la correa de Toto en la otra mano, mira por la vidriera; P2 cada vez más hundido (de parado, a apoyado en el
  codo, a la frente en el mostrador con el teléfono en la oreja: sin la mano atravesando la cara); P3 asomado a la
  puerta de recuperación, la mitad del cuerpo adentro, el inalámbrico en la mano; P5 mira la pantallita. Parte 2
  relajado, con la tablet; Q4 atiende a la señora de la transportadora; Q5 media sonrisa.
- **Vero = `ELENCO.vero`** con la campera navy2 (afuera); en Q3 de entrecasa en su cocina (el set y la ropa de
  vete-racion). P1 en la vereda, detrás del vidrio, el celular en la oreja y la mano libre que saluda (ojos abiertos al
  hablar; sin doble boca). Q1 mirando el celular, sonrisa; Q3 `sorpresa` → `sonrisa` derretida con el celular cerca de la
  cara (sin atravesarla); Q5 entra a la recepción.
- **Inés = `ELENCO.ines`** (sin lentes, ambo verde oscuro) con lo nuevo: **gorro de cirugía** (casquete de tela verde
  apagado `#365f28`, con pliegue, que tape la coleta) y **barbijo bajado al cuello** (para que se vea la boca cuando
  habla), **guantes de látex** crema `#efeee5` (las manos en alto, la pose de cirujana, sin tocar la cara). P3 `neutra`
  inclinada sobre Toto; P4 `neutra`, mira a Bruno 0,6 s y toma el teléfono (lo apoya en la oreja de Toto: el auricular
  TOCA la oreja, no la atraviesa); P5 cejas apenas arriba mirando a Coco. Q4 sale del quirófano sacándose un guante;
  cierre `sonrisa` de colega, sin gorro.
- **Toto = `crearPerro(PERROS.toto)`**: P1 sentado sobre el mostrador junto a Bruno, cola; P3-P4 **echado de costado**
  sobre la manta, dormido (ojos cerrados como dos líneas, NO como bultos), respiración marcada (pecho que sube y baja),
  el **collar isabelino** puesto; con el ronquido, el hocico se infla apenas y una oreja tiembla. Q3 despertando
  (`cabeza` que se levanta, ojos a media asta). Q5 entra trotando con el collar, `cola` 1, se sienta y ladra a Vero
  (`jadeo`).
- **Coco = `crearPerro(PERROS.coco)`** (blanco, chiquito): dormido con collar isabelino en la camilla de al lado (P3-P5,
  Q3, Q4 fuera de foco).
- **Luna** en su transportadora (`crearCaraGato`, de veterinaria-vacunas) con **la señora** (DEFECTO con `corto` canoso,
  sin voz): P2 espera en la silla y a las 14:00 se levanta y se va (campanita); Q4 Bruno la atiende en el mostrador.

## Escenarios y objetos 3D por escena
- **Set A · la recepción de Veterinaria Inés** (reusado de vete-racion: mostrador con frente navy3 y tapa crema, la
  vidriera a la vereda, el cartel "VETERINARIA INÉS", azulejo verde apagado `#365f28` abajo y navy arriba) con lo nuevo:
  - **El teléfono inalámbrico de mostrador (EL objeto del dolor):** base crema en el mostrador, auricular navy3 con
    teclado crema, pantallita verde apagado con el nombre de quien llama en crema ("VERO", "PAPÁ DE COCO", "MAMÁ DE
    MORA") ≥ 40 px en los insertos; cuando suena, la base titila (luz crema) y el auricular vibra (función del tiempo) con
    tres arcos de "ring" planos crema alrededor. Que no se confunda con un celular: con antena corta y la base.
  - **La vereda vista por la vidriera (P1/Q1):** el vidrio sin reflejo (solo el marco navy y el vinilo crema), afuera la
    vereda gris claro y un árbol low-poly, Vero entera de la cintura para arriba, luz de mañana crema plana.
  - **La pizarra "CIRUGÍAS · JUEVES"** colgada atrás del mostrador: blanca con marco navy, seis renglones en Caveat 700
    navy (TOTO, COCO, PANCHO, SIMÓN, NEGRO, MORA) y "CASTRACIÓN" al lado; en la parte 2 la pizarra no está: la reemplaza
    la tablet en su atril con el panel.
  - **El contador de llamadas** (rótulo HTML con línea guía al teléfono, rojo apagado): "Llamadas hoy: 2 → 13 → 27 →
    34".
  - Las sillas de espera navy3, la señora con la transportadora crema de Luna.
- **Set B · la sala de recuperación (NUEVO, P3-P5 y Q3):** pared navy arriba y azulejo verde apagado abajo (el mismo
  lenguaje del consultorio de veterinaria-vacunas), dos **camillas de recuperación** de acero gris claro `#b9bec4` con
  **mantas** crema y verde apagado (dobladas, con volumen), una **lámpara de calor** colgante con pantalla navy y luz
  crema plana, la **puerta de vaivén del quirófano** al fondo (navy3, ojo de buey redondo, "QUIRÓFANO" en vinilo crema)
  y la puerta abierta a la recepción por donde se asoma Bruno. **Collar isabelino** (cono truncado crema translúcido
  apenas, borde navy de ≥ 6 px, cerrado con una tira) en Toto y en Coco: que se lea como collar de veterinaria, no como
  embudo ni pantalla de lámpara (alrededor del cuello, la boca adelante). Sin instrumental ni nada de sangre.
- **Set C · la cocina de Vero (Q3):** reusada de vete-racion, de día; Vero con el celular en altavoz.
- **Insertos de celular** (`crearCelular`, ≥ 60 % del cuadro): Q1 ingresó con foto, Q3 el video del despertar, Q5 el
  aviso de listo con indicaciones.
- **La tablet en atril** (reusada) con el panel "Pacientes de hoy" (Q2, Q4), push-in hasta ≥ 70 %.
- **Fotos de los avisos:** cuadros renderizados del mismo 3D (Toto en el mostrador con la correa; Toto dormido con el
  collar) pegados como textura en la burbuja del chat: nada de fotos reales.
- **Cierre:** Inés a cámara en la recepción, sin gorro, la tablet con el panel en verde a su lado y Toto con el collar
  asomando las patas al mostrador.

## Interfaz recreada (pantallas canvas, Lexend, textos ≥ 36 px)
1. **Aviso "Ingresó" (celular de Vero, Q1):** cabecera "Veterinaria Inés" (avatar genérico con huellita) · foto de Toto
   en el mostrador · "Toto ingresó ✓ 9:05" · "Lo opera la Dra. Inés. Te avisamos en cada paso." (el ✓ en verde).
2. **Panel "Pacientes de hoy · 6" (tablet, Q2):** filas con avatar y chip de etapa: Toto (Vero) "En cirugía" ·
   Coco "Ingresó ✓" · Pancho "Ingresó ✓" · Simón · Negro · Mora "Esperando" (gris); arriba, la línea de etapas
   "Ingresó · En cirugía · Despertando · Listo"; Bruno toca "En cirugía" en la fila de Toto → "Aviso enviado ✓ con foto".
3. **Aviso "Despertando" (celular de Vero, Q3):** "Toto está despertando ✓ 15:30" + un video de 5 s (cuadro de Toto con
   el collar y el botón ▶ que avanza: el ronquido sale del celular).
4. **Panel en Q4:** Bruno toca "Despertando" en la fila de Coco → "Aviso enviado ✓"; abajo "Llamadas hoy: 34 → 3" (el 34
   gira y queda verde en 3) y "Consultas atendidas ✓".
5. **Aviso "Listo" (celular de Vero, Q5):** "Toto está listo para retirar ✓ · Hoy 17:00" · "Indicaciones de la Dra.
   Inés: Collar puesto · Reposo hoy · Control: lunes 10:00".
- Colores: rojo apagado `#c7655b` SOLO para el problema ("Llamadas hoy: 34", "2 horas de teléfono", "3 consultas que se
  fueron · $ 4.500", el 34 del panel antes de girar); verde `#5ce611` para lo resuelto (✓, "Aviso enviado", "34 → 3",
  "Consultas atendidas", AVISOS).
- **Burbujas de diálogo** como en los reels de la veterinaria (crema, borde navy 8 px, sombra dura, Lexend 800 navy ≥ 48
  px, cola hacia quien habla). **Las líneas por teléfono** ("¿Cómo está Toto?" en P1, "¡Ay, mi amor!" en P4) en una
  burbuja con borde punteado o con un iconito de teléfono, con la cola hacia el auricular (que se entienda sin sonido que
  sale del teléfono). "¡Ay, mi amor!" en P4 y Q3 en el mismo estilo; "Ahora el de Coco." en P5 y Q4 en el mismo lugar.
- **Chips de hora** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "VETERINARIAS" en el cuadro 0):
  "Jueves, 9:02. Cirugías." · 10:30 · 12:00 · 14:00 · 15:30 · parte 2: "Jueves, 9:02." · 11:00 · 15:30 · 17:00. Cada
  chip del montaje ≥ 0,7 s.

## SFX
Ring del teléfono de mostrador (corto, de dos tonos: `k-dos-tonos.wav` o `k-tono.wav`, revisar) en P1 y en cada chip de
P2 y en P5; bip de atender; campanita de la puerta (la señora que se va en P2, Vero en Q5); ronquido de perro (CC0 nuevo)
en P4 y saliendo del celular en Q3; la música que baja en la pausa de P4 y vuelve con el ring de P5; stinger; whoosh de
cámara; pop por burbuja y rótulo; vibración (`vibra.wav`) + `notification.mp3` en cada aviso de la parte 2; tap en la
tablet (`click-soft.mp3`); guante de látex que se saca (`k-cloth_1.wav`); ladrido contento (Q5); ding de "Listo".
