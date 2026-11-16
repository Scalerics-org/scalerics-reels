# parrilla-no-vuelve · plan plano por plano · línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), 3D real, ~36,4 s

**De qué trata.** PARRILLAS. Sábado 21:30 en la parrilla de Raúl, el salón lleno, la tira, los chorizos y las
morcillas en la parrilla a leña. Walter, saliendo, le da una palmada: **"¡Impecable, Raúl! ¡Volvemos!"**; Raúl:
**"¡Cuando quieras, maestro!"**; y a Fabián, el mozo, bajito y sin dejar de sonreír: **"¿Quién era?"** Fabián se encoge
de hombros. Salen tres mesas más: todos le dicen "Raúl" y Raúl les dice "campeón", "genio", "jefe" (rótulo: "Sábado: 112
cubiertos · Nombres que sabe Raúl: 0"). La pizarra pasa de "SÁBADO" a **"MARTES · FEBRERO"**: el mismo salón, 3 mesas de
25, la parrilla prendida igual ("La leña, la tira y el mozo se pagan igual"). Fabián: **"¿Y si les avisás a los del
sábado?"** Pausa. Raúl, con el celular: **"¿A quién? ¿A 'maestro'?"** Remate del remate: suena la campanita, entra
Walter: **"¡Raúl! ¿Te acordás de mí?"** / Raúl, brazos abiertos: **"¡Obvio, maestro!"** y mira de reojo a Fabián, que se
encoge de hombros otra vez. Cartel **"Una tarjeta de puntos más tarde…"**. Parte 2 (más de la mitad del reel): otro
sábado, Walter escanea el QR de la mesa y suma su visita ("Visita 4 de 5 · a la 5ª, provoleta de regalo"); en la tablet
de Raúl aparece "Walter · tira + morcilla dulce"; el mismo "¡Impecable, Raúl! ¡Volvemos!" ahora tiene nombre: **"¡Te
espero, Walter!"**. El panel "Quién vuelve y cada cuánto" ("Nombres que sabe Raúl: 0 → 112"). En febrero, el sistema
detecta a los 38 que hace más de un mes que no vienen y les manda solo el aviso (Graciela: **"¡Vamos el martes!"**). Martes
de febrero, el mismo encuadre del salón vacío: 17 mesas de 25. Entra Walter: "¡Raúl! ¿Te acordás de mí?" y Raúl, sin
mirar nada: **"Walter. Tira y morcilla dulce. Faltaste dos sábados."** Cierre: Sofi de Scalerics en videollamada:
**"Comentá VUELVE y te mando cómo funciona para tu parrilla."**

- **Producto:** Scalerics Puntos: el cliente **suma con cada visita escaneando el QR de la mesa** y lleva la tarjeta en
  el celular, con un premio a la vista (a la 5ª visita, provoleta de regalo); el dueño ve **quién vuelve, cada cuánto y
  qué pide** en un panel; y al que **dejó de venir le llega solo un aviso** con su premio. Se muestra funcionando en la
  parte 2 (interfaz recreada) y se nombra en la línea chica final y en `descripcion.txt`. El cartel nunca dice
  "Scalerics".
- **Sin marcas:** chat y avisos genéricos (burbujas crema/navy, sin el verde ni el logo de WhatsApp; la palabra
  "WhatsApp" no hace falta), celulares sin logo, botellas de vino sin etiqueta (o etiqueta crema lisa con una uva
  dibujada), sifón de soda sin marca, la parrilla se llama **"Parrilla Raúl"** (inventado). Nada de cerveza ni refresco
  de marca.
- **Estructura** como `reels/estetica-turnos` / `reels/abren-hoy-completo`: parte 1 (15,2 s) + cartel (2,4 s) + parte 2
  (18,8 s, la solución, con el cierre adentro = 52 %). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`.
  **Ojo con el largo:** en estetica-turnos el plan decía 34,4 y las tomas reales llevaron el reel a 37-38. Acá el plan
  da 36,4: si las tomas se estiran, recortar primero la ráfaga muda (P3, 2,5 s → 2,0), la transición de la pizarra (P4)
  y Q2; nunca la pausa antes de "¿A quién?" (mínimo 0,6 s).
- **Cartel:** el time card de siempre (fondo verde de marca con manchas y burbujas, letras que rebotan), en tres
  renglones como el de estetica-turnos: **"Una tarjeta" / "de puntos" / "más tarde…"**. Toma NUEVA de Rasalgethi ("Una
  tarjeta de puntos más tarde."), mismo tono y largo que la de estetica-turnos (~2,1-2,3 s). Nunca "Scalerics".
- **Rubén NO aparece** (no es distribuidora). Walter (ELENCO.walter) es el cliente de los sábados y Graciela
  (ELENCO.clienta) recibe el aviso: el elenco que la gente ya reconoce, sin Rubén.
- **Quién dice "Comentá VUELVE": Sofi** (ELENCO.sofi, voz Achernar), en videollamada en un celular parado sobre la caja,
  al lado de la tablet con el panel. Las mismas razones que en estetica-turnos: "te mando cómo funciona" es primera
  persona de Scalerics (lo dice quien va a contestar el comentario); Raúl termina en su remate ("Faltaste dos sábados")
  sin pasar a vendedor; y la línea queda igual en las tres de la serie, que es lo que hace que se reconozca. Si el
  constructor no llega con Sofi: Raúl a cámara, pinza en mano, "Comentá VUELVE y te cuento cómo lo armé", mismo plano.

## Paleta y set (para "Hechos")
**Parrilla de noche, cálida pero dentro de la marca: paredes navy claro `#16243d` lisas (sin degradé), vigas y mesas de
madera oscura `#3b2a20`, manteles crema `#efeee5` con cuadros navy, luz crema de lámparas colgantes (conos planos, sin
brillo difuso), y las brasas como único naranja (`#d9772f` apagado, emisivo plano, solo dentro del brasero y debajo de
la parrilla).** Es el primer reel de la línea de noche y en un local gastronómico: distinto de estetica-turnos (centro de
día todo crema), dist-pedidos-lunes (oficina de mañana crema), la-lista (oficina de noche) y dice-cuarenta (depósito
navy claro). Febrero = el mismo set con el ventilador de techo girando, las sillas en su lugar y casi todas las mesas
vacías (no a oscuras: la luz es la misma, el vacío es lo que se ve). Anotar en "Hechos": "parrilla de noche, paredes
navy claro #16243d, madera oscura y manteles crema a cuadros, brasas como único naranja; pizarra de tiza SÁBADO →
MARTES · FEBRERO; parte 2 igual + interfaz de tarjeta de puntos / panel / aviso; cartel verde".
- **Texto en pantalla:** crema sobre navy, navy sobre crema. Los rótulos con línea guía en caja navy `#0b1220` con texto
  crema y borde crema de 6 px (sobre la pared navy necesitan el borde para despegarse).
- **Rojo apagado `#c7655b` SOLO para el problema:** "Nombres que sabe Raúl: 0", "3 mesas de 25", "se pagan igual",
  "última visita: hace 5 semanas". **Verde `#5ce611` para lo resuelto:** "+1 visita ✓", la barra de visitas, "Aviso
  enviado ✓", "0 → 112", "17 mesas", el recuadro de selección de los subtítulos, "VUELVE".
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  En la ráfaga (P3) van de a pares: la del cliente ("¡Abrazo, **Raúl**!", con "Raúl" en el recuadro verde) y la de Raúl
  ("¡Grande, **campeón**!", con el apodo subrayado en rojo apagado). Ese contraste (nombre en verde, apodo en rojo) es el
  chiste sin sonido.

## Personajes nuevos (agregar a ELENCO, mismo estilo; peinados que ya existen en personajes.js)
- **Raúl · `ELENCO.raul`** (dueño de la parrilla, ~52 años, voz Charon). Que nadie lo confunda con Rubén (pelado con
  bigote, camisa navy3): **pelo corto entrecano y barba corta canosa completa**. `peinado: "corto"`, `pelo: 0x4a3c33`,
  `barba: 0x8d8780, barbaLarga: 0.45, barbaOpacidad: 0.75, barbaBigote: true`, `cejaGruesa: true, cejasColor: 0x3a2f2a`,
  piel `PIEL.trigueña`, mejillas `0xc9785e`. **Camisa navy claro `MARCA.navy2` de manga corta** (`mangas: "cortas",
  cuello: MARCA.navy2`), **delantal de parrillero crema gastado `MARCA.cr2` con borde verde oscuro `MARCA.gd`**
  (`delantal`, `delantalBorde`), pantalón `0x3a3f4a`, zapatos `0x2a2220`. `panza: 1.14, nariz: 0.066, alto: 1.02`.
  Siempre con la **pinza de parrilla** en la mano derecha (objeto: dos brazos de acero con mango de madera). Expresión
  base: `feliz`/`sonrisa` de anfitrión con los clientes y `neutra` seca cuando habla con Fabián (el chiste es el cambio
  de cara: sonrisa grande → "¿Quién era?" con la misma sonrisa congelada). Nada de gritos.
- **Fabián · `ELENCO.fabian`** (el mozo, ~28 años, voz Puck). `peinado: "jopo"`, `pelo: PELO.negro`, piel
  `PIEL.morena`, `cejasColor: 0x1e1a18`, mejillas `0xb8644e`. **Camisa blanca `0xf7f7f2` de manga larga con chaleco navy
  `chaleco: { color: MARCA.navy, botones: MARCA.cr }`** (el chaleco de Héctor, otro color), pantalón `MARCA.navy`,
  zapatos `MARCA.navy`, `panza: 0.95, nariz: 0.052, alto: 1.03`. Objetos: **trapo crema al hombro** y la libreta de
  comandas. Su gesto es **encogerse de hombros** (hombros arriba, palmas afuera, cejas arriba): lo hace dos veces en la
  parte 1, igual, y es parte del chiste.
- **Reusados:** **Walter** (`ELENCO.walter`, voz Umbriel), tal cual: sale de la oficina, camisa blanca con la corbata
  floja y la campera crema; en la parte 1 se va saludando (P1) y vuelve en febrero (P7); en la parte 2 escanea el QR (Q1)
  y vuelve (Q4). **Graciela** (`ELENCO.clienta`, voz Gacrux) en su living (el set de estetica-turnos) con el celular
  (Q3) y en el salón en febrero con dos amigas y la provoleta (Q4). **Sofi** (`ELENCO.sofi`, Achernar) en el celular
  parado (Q5), con el buzo navy claro y franja crema de estetica-turnos.
- **Extras sin voz** (variantes rápidas de DEFECTO con peinados distintos, que no se parezcan a los de arriba): las tres
  mesas que se despiden en P3 (una pareja, un grupo de amigos, una familia con un nene) y el salón lleno del sábado (6-8
  siluetas sentadas, de espaldas o de 3/4, con platos). En febrero: dos mesas de a dos y una de uno.

## Objetos 3D (específicos: que nadie los confunda con "un restaurante" genérico; es una parrilla uruguaya)
- **Parrilla a leña (EL protagonista de la parte 1):** parrilla de hierro negro mate inclinada, con **varillas en V**
  (canaletas que bajan la grasa hacia adelante, a una canaleta colectora), sobre una base de ladrillo navy3 revocada, a
  la altura de la cintura de Raúl. Al costado izquierdo, el **brasero / canasto de hierro** con los troncos ardiendo de
  donde Raúl saca las brasas con la pala; debajo de la parrilla, la cama de brasas (emisivo naranja apagado plano, con 2-3
  chispas que suben y se apagan: pocas, con semilla). Arriba, **campana de chapa** navy3 con humo crema muy tenue (planos
  semitransparentes que suben lento, sin degradé fino).
- **Lo que está en la parrilla (que se reconozca):** **tira de asado** (tiras largas de carne marrón con los **huesitos
  redondos crema a la vista** cada tanto, cortadas en tira transversal, con grasa crema en el borde: es LA tira, no un
  bife), **chorizos** (4, curvos, piel marrón brillante con dos cortes), **morcillas** (2, casi negras, más gordas, una
  abierta mostrando el relleno oscuro), **provoleta** en su provoletera de hierro (disco de queso dorado con orégano), y
  medio morrón con huevo (opcional). En la parte 1 la carne chisporrotea (pequeñas gotas brillantes que saltan).
- **Pinza y pala** de parrillero; **tabla de madera** con un chorizo al pan cortado (detalle).
- **Pizarra de tiza** en la pared (marco de madera oscura, fondo navy oscuro, letra de tiza crema en Caveat 700, ≥ 56 px
  donde se lee): arriba **"SÁBADO"** (P1-P3) → se borra con un trapo y se escribe **"MARTES · FEBRERO"** (P4); abajo el
  menú fijo: "TIRA · VACÍO · CHORIZO · MORCILLA · PROVOLETA". Vuelve en Q4 ("MARTES · FEBRERO").
- **Salón:** 25 mesas de madera oscura (se ven 6-8 por plano) con mantel crema a cuadros navy, **sifón de soda** de
  vidrio verdoso con cabezal metálico, botella de vino sin etiqueta, panera de mimbre, platos de loza crema. **Lámparas
  colgantes** de chapa navy con luz crema. Vigas de madera oscura en el techo. **Ventilador de techo** (en febrero
  girando; en el sábado quieto o fuera de cuadro).
- **QR de mesa** (parte 2): un **atril de acrílico** chico en cada mesa con un QR grande navy sobre crema y "Sumá tu
  visita" + "Parrilla Raúl". Es el objeto nuevo de la parte 2: en Q1 entra grande con pop.
- **Caja / barra:** mostrador de madera oscura con frente navy3, la **tablet** de Raúl en un atril (pantalla canvas con
  el panel), un frasco con escarbadientes, la campanita de la puerta. En Q5, al lado de la tablet, el **celular parado**
  con Sofi.
- **Puerta de calle** de vidrio con marco de madera oscura y **"Parrilla Raúl" en vinilo crema**, campanita arriba.
- **Celular de Raúl** (crearCelular de ya-lo-cargo/anotamelo): en P6, la agenda de contactos.
- **Celular de Walter** (mismo modelo, funda navy): la tarjeta de puntos (Q1).
- **Living de Graciela** (Q3, el de estetica-turnos): sillón crema, lámpara de pie, cortina navy.

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro, pantallas ≥ 60 % del cuadro en los insertos)
**Parte 1 · ráfaga (P3), burbujas mudas de a pares** (cliente a la izquierda, Raúl a la derecha):
- "¡Abrazo, **Raúl**!" → "¡Grande, **campeón**!"
- "¡Hasta el sábado, **Raúl**!" → "¡Te espero, **genio**!"
- "¡Gracias, **Raúl**!" → "¡Un lujo, **jefe**!"
- Fabián, burbuja chica después del primer "¿Quién era?" (P2): "Ni idea."
**Parte 1 · rótulos** (caja navy, texto crema, línea guía):
- P3, a Raúl: "Sábado: 112 cubiertos" y debajo, en rojo apagado, **"Nombres que sabe Raúl: 0"**.
- P5, al salón: **"Martes de febrero: 3 mesas de 25"** (rojo apagado) · a la parrilla: "La leña, la tira y el mozo se
  pagan igual".
**Parte 1 · celular de Raúl (P6, inserto ≥ 60 %)**, encabezado navy "Contactos", fondo crema: "Carnicería Don Tito" ·
"Leña" · "Mamá" · "Contador" · "Plomero" · y nada más (ningún cliente). El scroll llega al final y rebota.
**Parte 2 · Q1 · celular de Walter, la tarjeta de puntos** (fondo crema, encabezado navy "Parrilla Raúl"):
"Hola, Walter" · tarjeta verde grande con **5 círculos de visita** (3 llenos, el 4º se llena con pop: **"+1 visita ✓"**) ·
"Visita 4 de 5" · debajo, con un dibujito plano de la provoleta: **"A la 5ª: provoleta de regalo"**. Rótulo HTML: "Suma
con cada visita".
**Parte 2 · Q1 · tablet de Raúl** (en el atril de la parrilla/barra): entra una ficha **"Walter · 4ª visita · tira +
morcilla dulce · viene cada 2 semanas"**.
**Parte 2 · Q2 · el panel (tablet a ≥ 70 % del cuadro): "Quién vuelve y cada cuánto"**, lista con avatar redondo:
- "Graciela · cada sábado · ✓ vino"
- "Walter · cada 2 semanas · ✓ vino"
- "Familia Pereira · 1 vez al mes"
- "Martín · cada 3 semanas"
- arriba a la derecha, grande: **"Nombres que sabe Raúl: 0 → 112"** (el 0 rojo apagado se da vuelta como un contador y
  queda el 112 verde: callback del rótulo de P3). Rótulo HTML: "Quién vuelve y cada cuánto".
**Parte 2 · Q3 · el aviso** (chip arriba: **"Febrero"**): el panel filtra **"Hace más de 4 semanas que no vienen: 38"**;
la fila "Walter · última visita: hace 5 semanas" en rojo apagado; "Aviso automático" pasa a **"Enviado ✓ · 38"** (verde)
sin que Raúl toque nada. El aviso vuela al celular de Graciela: **"Hola, Graciela. Hace un mes que no te vemos. Tenés
una provoleta de regalo esperándote. · Parrilla Raúl"**. Rótulo HTML: "Aviso al que dejó de venir".
**Parte 2 · Q4 · el número que mejora** (chip arriba, sobre el salón): **"Martes de febrero: 3 → 17 mesas"** (el 3 rojo
tachado, el 17 verde grande).
**Cierre (capa HTML):** "Comentá **VUELVE**" grande (Lexend 900, VUELVE en el recuadro verde), sobre la escena; en los
últimos 0,8 s, abajo chico: "Tarjeta de puntos con aviso al que deja de venir" / "scalerics.com" en verde.

## PARTE 1 · el problema (0,00-15,20 s)
Cámara continua en el salón. El eje es la parrilla: Raúl de 3/4 detrás de la parrilla, el salón atrás o al costado,
la pizarra en la pared del fondo.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-3,00 | **P1 · cuadro 0.** Desde el salón, por encima de la parrilla: la parrilla con la carne llena la mitad de abajo (tira, chorizos, morcillas, provoleta), Raúl detrás con la pinza, la campana arriba, el brasero a la izquierda con los troncos ardiendo; atrás a la derecha el salón lleno y la pizarra "SÁBADO". Push-in lento. Walter entra por la derecha, ya saliendo, con la campera puesta. | **Cuadro 0:** arriba, enorme, **"PARRILLAS"** (Lexend 900, ~130 px, crema con borde navy de 12 px y sombra dura, con el recuadro verde detrás) y debajo **"Sábado, 21:30."** (Lexend 700 ~60 px). La carne ya chisporrotea; Walter ya está en cuadro. 0,30-1,80 · **Walter: "¡Impecable, Raúl! ¡Volvemos!"** y le da una palmada en el hombro. 1,90-3,00 · **Raúl: "¡Cuando quieras, maestro!"** (sonrisa de anfitrión, levanta la pinza). | parrilla, carne, brasero, campana, pizarra, salón lleno, Raúl, Walter | ambiente: salón lleno (murmullo, cubiertos) + chisporroteo de la carne (loop, constante en toda la parte 1 del sábado) + leña que cruje · palmada 1,70 · pinza (clic metálico) 2,10 |
| 3,00-4,30 | **P2 · "¿Quién era?"** Primer plano de Raúl de 3/4; Fabián entra en cuadro a su lado con la bandeja. Walter se va por la puerta de fondo, desenfocado. | 3,10-3,80 · **Raúl (a Fabián, bajito, sin mover la sonrisa): "¿Quién era?"** · 3,85 · Fabián se encoge de hombros; burbuja chica muda **"Ni idea."** | Raúl, Fabián, bandeja, puerta | campanita de la puerta 3,30 (Walter se va) · pop chico 3,90 |
| 4,30-6,80 | **P3 · la ráfaga.** Plano medio más abierto, Raúl a la izquierda en la parrilla, la puerta a la derecha: pasan tres mesas yéndose (pareja, amigos, familia). Cámara quieta con un paneo corto a la puerta. | Pares de burbujas mudas, cada vez más rápido: 4,40 "¡Abrazo, **Raúl**!" → 4,70 "¡Grande, **campeón**!" · 5,10 "¡Hasta el sábado, **Raúl**!" → 5,35 "¡Te espero, **genio**!" · 5,70 "¡Gracias, **Raúl**!" → 5,90 "¡Un lujo, **jefe**!" (los apodos subrayados en rojo apagado). Raúl saluda con la pinza a cada uno, la sonrisa cada vez más dura. 6,10 · rótulo a Raúl: "Sábado: 112 cubiertos" / **"Nombres que sabe Raúl: 0"** (rojo). | Raúl, extras, puerta, salón | pop por burbuja (alternando dos tonos: cliente / Raúl) · campanita de la puerta ×3 · pop del rótulo 6,10 |
| 6,80-7,60 | **P4 · de sábado a febrero.** Travelling de la cámara a la pizarra (whoosh): Fabián borra "SÁBADO" con el trapo y escribe con la tiza **"MARTES · FEBRERO"**. Al volver, el murmullo se apaga y el salón quedó vacío. | 6,90 · trapo sobre la pizarra · 7,20 · la tiza escribe (se dibuja trazo a trazo, rápido) · el ventilador de techo empieza a girar. | pizarra, trapo, tiza, ventilador | whoosh 6,80 · borrado (`k-cloth_1`) 6,90 · tiza (rasguido CC0 o `k-page-turn` agudo) 7,20 · el murmullo baja a nada en 0,4 s y entra el zumbido del ventilador + grillos lejanos de verano |
| 7,60-10,00 | **P5 · el salón vacío.** El mismo encuadre del cuadro 0 pero más abierto: la parrilla prendida con UNA tira, las 25 mesas puestas, 3 ocupadas (dos de a dos y una de uno), el ventilador girando. Raúl detrás de la parrilla, pinza quieta; Fabián apoyado en una silla con el trapo al hombro. | 7,80 · rótulos con línea guía: al salón **"Martes de febrero: 3 mesas de 25"** (rojo apagado); a la parrilla "La leña, la tira y el mozo se pagan igual". 8,20-9,90 · **Fabián: "¿Y si les avisás a los del sábado?"** | salón vacío, parrilla con una tira, ventilador, Raúl, Fabián | chisporroteo solo (más bajo, una sola tira) · ventilador · pop por rótulo |
| 10,00-12,00 | **P6 · la pausa y el remate.** Raúl saca el celular; inserto (≥ 60 %) de su agenda de "Contactos": Carnicería Don Tito, Leña, Mamá, Contador, Plomero; el scroll llega al final y rebota. Corte a primer plano de Raúl, seco. | 10,00-10,70 · **pausa**: el scroll, el ventilador, una chispa del brasero. La música baja a -12 dB (no se corta). 10,80-11,90 · **Raúl: "¿A quién? ¿A 'maestro'?"** (seco, grave, sin levantar la voz; "maestro" en el recuadro verde del subtítulo). | celular, Raúl | scroll (roce `k-cloth_1` bajo) · rebote del scroll (click-soft) 10,60 · nada mientras habla |
| 12,00-15,20 | **P7 · remate del remate.** Plano medio desde el salón hacia la puerta: suena la campanita y entra **Walter** (el del cuadro 0). Raúl sale de atrás de la parrilla con los brazos abiertos, la pinza en la mano. | 12,10 · campanita · 12,30-13,60 · **Walter: "¡Raúl! ¿Te acordás de mí?"** (contento) · 13,80-14,60 · **Raúl: "¡Obvio, maestro!"** (sonrisa enorme, abrazo con palmadas) · 14,70 · por encima del hombro de Walter, Raúl mira a Fabián con la sonrisa congelada; **Fabián se encoge de hombros** (el mismo gesto de P2). 15,10 stinger. | puerta con vinilo "Parrilla Raúl", Walter, Raúl, Fabián, salón vacío | campanita de la puerta 12,10 · pasos · palmadas del abrazo 14,40 · stinger 15,10 |

## CARTEL (15,20-17,60 s)
Time card de dibujito de siempre: **"Una tarjeta" / "de puntos" / "más tarde…"**. Narrador Rasalgethi (toma nueva).
Nunca "Scalerics".

## PARTE 2 · resuelto (17,60-36,40 s) · la solución en pantalla, más de la mitad del reel

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 17,60-22,00 | **Q1 · el mismo sábado, ahora con nombre.** Chip arriba "Sábado, 21:30." (callback del cuadro 0). Plano de la mesa de Walter: el plato con la tira y la morcilla, el sifón, y el **atril con el QR** que entra grande con pop. Inserto del celular de Walter (≥ 60 %). Después, el cuadro 0 otra vez: la parrilla, Raúl, Walter saliendo. | 17,80 · Walter apunta el celular al QR · 18,20-19,40 · inserto: "Hola, Walter" · el 4º círculo se llena: **"+1 visita ✓"** · "Visita 4 de 5" · "A la 5ª: provoleta de regalo". 19,40 · en la tablet de Raúl junto a la parrilla entra la ficha "Walter · 4ª visita · tira + morcilla dulce". 19,60-21,00 · **Walter (la misma toma de 01): "¡Impecable, Raúl! ¡Volvemos!"** · 21,00-21,90 · Raúl mira la tablet de reojo: **"¡Te espero, Walter!"** (con nombre, contento) y Fabián levanta las cejas. | mesa, plato, sifón, atril QR, celular de Walter, tablet, parrilla, Raúl, Walter, Fabián | murmullo del sábado + chisporroteo (vuelve) · pop del atril 17,70 · bip del escaneo (click-soft agudo) 18,10 · ding (`cero.mp3`) 18,90 · whoosh-short 19,40 · palmada 20,80 |
| 22,00-24,80 | **Q2 · quién vuelve y cada cuánto.** Push-in a la tablet hasta ≥ 70 % del cuadro (la parrilla desenfocada atrás). | 22,20 · las filas entran de a una con pop (Graciela, Walter, Familia Pereira, Martín) con su "cada cuánto" · 23,40 · arriba, **"Nombres que sabe Raúl: 0 → 112"**: el 0 rojo gira como contador y queda el 112 verde. | tablet, parrilla atrás | pop por fila · tic de contador al girar · ding en el 112 |
| 24,80-28,60 | **Q3 · febrero: el aviso sale solo.** Chip **"Febrero"**; la misma tablet: el filtro "Hace más de 4 semanas que no vienen: **38**", la fila de Walter "última visita: hace 5 semanas" (rojo). "Aviso automático" → **"Enviado ✓ · 38"**. El aviso vuela (la cámara lo sigue) al celular de Graciela en su living. | 25,00 · el filtro cae · 25,80 · "Enviado ✓ · 38" (Raúl no toca nada: está en la parrilla) · 26,20 · inserto del celular de Graciela: "Hola, Graciela. Hace un mes que no te vemos. Tenés una provoleta de regalo esperándote. · Parrilla Raúl" · 27,40-28,30 · **Graciela: "¡Vamos el martes!"** (se saca los lentes, ya decidida). | tablet, living de Graciela, Graciela, su celular | whoosh-short 25,80 · notification 26,20 · el aviso volando (whoosh) · pop en la burbuja de Graciela |
| 28,60-33,00 | **Q4 · martes de febrero, el mismo encuadre de P5.** La pizarra dice "MARTES · FEBRERO", el ventilador gira, pero **17 mesas de 25 ocupadas**; en una, Graciela y dos amigas con la provoleta; la parrilla llena otra vez. Chip **"Martes de febrero: 3 → 17 mesas"**. Suena la campanita: entra Walter. Push-in a Raúl. | 28,70 · chip del número · 29,40 · campanita · 29,60-30,90 · **Walter (la misma toma de 06): "¡Raúl! ¿Te acordás de mí?"** · 31,10-33,00 · **Raúl, sin mirar la tablet, señalándolo con la pinza: "Walter. Tira y morcilla dulce. Faltaste dos sábados."** (seco, con media sonrisa) · Walter, cara de culpa simpática; Fabián se ríe por lo bajo. | salón con 17 mesas, pizarra, ventilador, parrilla llena, Graciela y amigas, provoletera, Walter, Raúl, Fabián | murmullo de salón medio lleno (más bajo que el sábado) + chisporroteo + ventilador · campanita 29,40 · pinza 31,20 |
| 33,00-36,40 | **Q5 · cierre.** La cámara viaja a la barra: la tablet con el panel (la fila de Walter otra vez en verde: "✓ volvió") y al lado el **celular parado con Sofi en videollamada**; push-in al celular. | 33,30-36,20 · **Sofi: "Comentá VUELVE y te mando cómo funciona para tu parrilla."** · en "VUELVE" entra grande **"Comentá VUELVE"** (capa HTML). 35,60 · línea chica: "Tarjeta de puntos con aviso al que deja de venir" / "scalerics.com". | barra, tablet, celular parado con Sofi | whoosh 33,00 · ding (fila de Walter) 33,10 · pop en "VUELVE" · final de la música |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "PARRILLAS" entero y legible; que se lea parrilla uruguaya y no "restaurante": la parrilla en V con la
  tira (huesitos a la vista), chorizos, morcillas y provoleta, el brasero con leña, la campana; Walter ya en cuadro.
- **La carne:** la tira se lee como tira (no bife ni costilla de cerdo), la morcilla se distingue del chorizo (más
  oscura y gorda); nada de carne gris o marrón liso sin forma. Las brasas sin bandas (naranja plano).
- **El chiste de los apodos:** en P3 los nombres en verde y los apodos en rojo se leen sin sonido; los pares de burbujas
  no se pisan ni tapan las caras.
- **Contraste sábado / febrero:** el mismo encuadre en P1 y P5 (y en Q4), con la pizarra que cambia y el salón que se
  vacía; el salón vacío no puede quedar oscuro ni con pantallas lisas (siempre la parrilla prendida y las mesas puestas
  en cuadro).
- **Raúl ≠ Rubén:** pelo entrecano + barba canosa, camisa navy claro de manga corta y delantal crema; que nadie diga
  "es Rubén con barba".
- **Interfaz de la parte 2:** cada pantalla ≥ 60 % del cuadro, textos ≥ 36 px, sin el verde ni el logo de WhatsApp;
  los ✓ verdes; "0 → 112" y "3 → 17" grandes y legibles.
- **Continuidad:** Walter con la misma ropa en las cuatro apariciones; Raúl siempre con la pinza; Fabián siempre con el
  trapo al hombro; la pizarra dice lo mismo en P5 y Q4.
- **Sofi:** ELENCO.sofi (no un personaje nuevo), ojos abiertos cuando habla, dentro de la pantalla del celular parado.

## Portada (portada.json)
`t` ≈ 3,5 (P2: Raúl en primer plano con la sonrisa congelada y la pinza, Fabián encogido de hombros al lado, la
parrilla con la carne abajo; renderizar sin gancho, rótulos, subtítulos ni burbujas). `chica`: "Sábado, 21:30." ·
`grande`: "¿Quién era?" (la frase que el dueño se dice, como "¿Yo te debía?") · `sello`: "PARRILLAS". Alternativa de
fondo: el cuadro 0 limpio (la parrilla llena con Raúl y Walter). Alternativa de `grande`: "¿Te acordás?".
