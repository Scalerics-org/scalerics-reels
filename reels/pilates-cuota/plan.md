# pilates-cuota · plan plano por plano · línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), 3D real, ~37,6 s

**De qué trata.** ESTUDIOS DE PILATES. Día 10, clase de las 8 en "Estudio Ceci". Alicia, sentada en el carro del
reformer y tirando de las correas: **"Ceci, ¿te pagué marzo?"** Ceci, con el celular vibrando en la mano: **"Ahora me
fijo."** Sin sonido, el celular de Ceci se llena de comprobantes en fotos (torcidos, borrosos, sin monto, "te pago el
viernes", "¿me pasás el número de cuenta?") y la pizarra de cuotas de recepción se llena de "?" rojos: "Pagaron 23 de
40". 22:40, la recepción de noche: Ceci cruza el home banking con la planilla, que no cierra. Joaco, el otro instructor:
**"¿Y si les mandamos un link de pago?"** / Ceci, mientras su celular manda 17 veces "Hola, ¿pudiste ver lo de la
cuota?": **"No. Yo no persigo a nadie."** Día 11: Alicia, contenta: **"¡Ceci! Te transferí el 2. Mirá."** El comprobante:
Destinatario **CECILIA · PELUQUERÍA**. Pausa con el costo (17 cuotas, $ 51.000). Alicia, iluminada: **"¡Con razón me
hizo las mechas gratis!"** Ceci cierra los ojos, las manos al pecho: **"Inhalamos."** Remate del remate: vibra el
celular, Flor: "Ceci, ¿me pasás el número de cuenta de nuevo?". Cartel **"Un cobro automático más tarde…"**. Parte 2
(la mitad del reel): el día 1 a las 7:00 a Alicia le llega sola su cuota con el botón de pago, paga a **Estudio Ceci**:
**"¿Ya? ¿Así nomás?"**; en la tablet de recepción el panel sube solo (0 → 34, recordatorio automático del día 5, 39 de
40, $ 117.000, comprobantes para revisar: 0, y Gabi, que hace 3 semanas no viene, ya tiene su aviso); Joaco repite su
pregunta (el mismo audio) y Ceci: **"Ya pagaron 39."**; en clase, el mismo "Ceci, ¿te pagué marzo?" (el mismo audio)
recibe **"El 1, a las 7:02."** y Alicia: **"Uy. Entonces las mechas las debo."**; entra el pago de Flor, 40 de 40, y
Ceci: **"Y exhalamos."** Cierre: el panel en verde y Sofi en videollamada: **"Comentá CUOTA y te mando cómo funciona
para tu estudio."**

- **Producto:** automatización de cobro + panel a medida para el estudio: el **día 1 a cada alumna le llega sola su
  cuota** por WhatsApp, con su nombre, el mes, el monto y un **botón de pago** (tarjeta o débito; se puede dejar en
  débito automático); al pagar **queda marcada sola** en el panel, sin comprobante; el **día 5 sale solo el
  recordatorio** a las que faltan; el **panel** muestra quién pagó, cuánto entró y quién falta, y la **asistencia**:
  la alumna que hace 3 semanas que no viene recibe un aviso automático (una fila del panel, sin chiste propio, para no
  repetir `dos-gimnasios`). Se muestra funcionando en la parte 2 (interfaz recreada) y se nombra en la línea chica final
  y en descripcion.txt. El cartel nunca dice "Scalerics".
- **Sin marcas:** reformers genéricos (sin logo en el marco ni en la plataforma), banco genérico (la app del
  comprobante y el home banking son pantallas crema/navy con "Transferencia realizada" y un ícono de casita, sin nombre
  de banco), botón de pago genérico (sin logo de procesadora ni de tarjeta: "Pagar con tarjeta o débito"), chat genérico
  (burbujas crema/navy, sin el verde ni el logo de WhatsApp; la palabra "WhatsApp" solo en un rótulo), celulares,
  laptop y tablet sin logo. El estudio se llama "Estudio Ceci" (inventado); la peluquería es solo un texto en el
  comprobante ("CECILIA · PELUQUERÍA"), nunca se muestra.
- **Sin datos de afuera:** ver fuentes.md. La cuota ($ 3.000), las 40 alumnas y todos los conteos son del caso.
- **Estructura** como `reels/veterinaria-vacunas` y `reels/taller-presupuestos`: parte 1 (~17,0 s) + cartel (~2,5 s) +
  parte 2 (~18,1 s, la solución, con el cierre adentro: ~48 %; si las tomas reales alargan la parte 1, recortar la
  escalada antes que la parte 2, para quedar entre 45 y 55 %). Un proyecto 3D con gen.mjs (T1/T2).
- **Cartel:** el time card de siempre (fondo verde de marca con manchas y burbujas, letras que rebotan), en tres
  renglones: **"Un cobro" / "automático" / "más tarde…"**. Toma NUEVA de Rasalgethi ("Un cobro automático más tarde.").
  Si queda larga (> 2,6 s), se reusa "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav` y el
  cartel dice "Un sistema" / "más tarde…".
- **Rubén NO aparece** (no es distribuidora). Ningún personaje del elenco salvo Sofi.
- **Quién dice "Comentá CUOTA": Sofi** (ELENCO.sofi, voz Achernar), como en taller-presupuestos y veterinaria-vacunas:
  Ceci termina en su remate ("Y exhalamos.") sin pasar a vendedora; Sofi aparece en un celular parado al lado de la
  tablet con el panel en verde. Alternativa si no se llega con Sofi: Ceci a cámara, "Comentá CUOTA y te cuento cómo lo
  armé", con el mismo plano.

## Voces (nuevas, distintas de los últimos reels: Sulafat, Callirrhoe, Schedar, Charon, Puck, Iapetus, Achird, Alnilam, Enceladus, Sadachbia, Kore, Leda, Despina, Gacrux)
- **Ceci = Vindemiatrix** (suave, pausada: voz de instructora de pilates que mantiene la calma; "Inhalamos." casi en un
  susurro controlado, "Yo no persigo a nadie." firme y amable). Si suena muy dulce o infantil, probar Autonoe.
- **Alicia = Laomedeia** (charlatana, alegre, ~60; "¡Con razón me hizo las mechas gratis!" con descubrimiento feliz,
  sin culpa). Si suena muy joven, probar Pulcherrima o Aoede con tono de señora.
- **Joaco = Zubenelgenubi** (casual, joven, sin malicia; la pregunta al pasar, con la mochila al hombro). Alternativa:
  Umbriel.
- **Sofi = Achernar** (la de siempre). **Narrador del cartel = Rasalgethi.** Flor no habla (burbujas de texto).
- Los callbacks usan EL MISMO AUDIO de la parte 1: Alicia "Ceci, ¿te pagué marzo?" (P1 → Q3) y Joaco "¿Y si les
  mandamos un link de pago?" (P3 → Q2).
- Los números se escriben en letras en los .txt para el TTS ("treinta y nueve", "el uno, a las siete y dos"); en
  pantalla van en cifras (39, 7:02).

## Paleta y set (para "Hechos")
**Estudio de pilates en una planta alta, de mañana, cálido y luminoso: piso de madera clara plana `#d8c3a0` (tablas
anchas con juntas apenas marcadas, sin brillo), pared del fondo navy `#1f3254` (navy3) con listones verticales crema
`#efeee5` en la mitad de arriba (paneles acanalados, se lee "estudio" y no "oficina"), un ventanal grande a la derecha
con marco navy y vidrio crema plano (luz de mañana como paños crema planos sobre el piso, sin degradé ni polvo flotando),
dos macetas crema con plantas low-poly verde de marca apagado `#3fa60a`, y una barra de pared de madera clara. Cinco
reformers en fila.** La recepción al fondo a la izquierda: mostrador bajo de madera clara con frente crema, la pizarra de
cuotas colgada arriba, la tablet en su atril (parte 2). De noche (P3): la sala a oscuras en navy `#0b1220`, solo la
lámpara de recepción (cono crema plano) y la pantalla de la laptop. Distinto de veterinaria (azulejo verde y pared navy,
luz fría), taller (bloques navy claro, portón), corralón (chapa navy3 y patio de tierra), parrilla (noche cálida, madera
oscura, manteles a cuadros) y estética (paredes crema, gabinete con persiana): acá manda el **piso de madera clara** y la
**pared navy con listones crema**. Anotar en "Hechos": "estudio de pilates de mañana, piso de madera clara #d8c3a0, pared
navy3 #1f3254 con listones crema, ventanal, cinco reformers crema/madera con resortes verdes; la pizarra de cuotas con
'?' rojos y el celular lleno de comprobantes; parte 2 igual + cuota con botón / panel de cuotas y asistencia; cartel
verde".
- **Texto en pantalla:** crema sobre la pared navy y sobre cajas navy; navy sobre crema. Nunca crema o blanco sobre el
  piso de madera clara o el ventanal sin caja. "ESTUDIOS DE PILATES" del cuadro 0 va sobre la pared navy (arriba) o en
  caja navy.
- **Rojo apagado `#c7655b` SOLO para el problema:** los "?" de la pizarra, "Pagaron 23 de 40" (el 23), "17 cuotas sin
  cobrar · $ 51.000", "No cierra", "Pagado a la peluquera", "CECILIA · PELUQUERÍA" subrayado en el comprobante, el
  contador "Enviados: 17". **Verde `#5ce611` para lo resuelto:** ✓, el botón "Pagar", "Pagado ✓ · a Estudio Ceci",
  "Pagaron 39 / 40 de 40", "Cobrado: $ 117.000 / $ 120.000", "Comprobantes para revisar: 0", "Mensajes de cobro a mano:
  0", los resortes de los reformers (son verdes desde el principio: es mobiliario, no un "resuelto"), el recuadro de
  selección de los subtítulos.
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  "Ceci, ¿te pagué marzo?" en P1 y Q3 con la MISMA burbuja (mismo lugar, mismo tamaño) para que se lea el callback.
  "Inhalamos." (P6) y "Y exhalamos." (Q4) en el mismo lugar, sobre Ceci.
- **Chips de día** (el reloj del chiste): caja navy, Lexend 900 crema, arriba a la izquierda: "DÍA 10 · 8:00", "DÍA 10
  · 22:40", "DÍA 11"; en la parte 2 "DÍA 1 · 7:00", "DÍA 1" → "DÍA 4", "DÍA 5", "DÍA 10 · 8:00".

## Personajes nuevos (agregar a ELENCO, mismo estilo; solo parámetros y peinados que ya existen en personajes.js)
- **Ceci · `ELENCO.ceci`** (dueña e instructora de "Estudio Ceci", ~42, voz Vindemiatrix). Piel `PIEL.trigueña`, pelo
  castaño oscuro `0x3b2a22` en `peinado: "coletaAlta"` (la cola alta de instructora; que no se parezca a Vale, de pelo
  negro, piel clara y chomba verde: Ceci es trigueña, más alta, con buzo) con `sinFlequillo: true`, `cejaFina: true,
  cejasColor: 0x3b2a22`, `pestanas: 0x1a1414`, `cuelloFino: true`, mejillas `0xd98a7a`, labios `0xa8484f`, aros chicos
  crema `MARCA.cr`. **Buzo de entrenamiento verde de marca apagado** `camisa: MARCA.gd, mangas: "largas", cuello: null,
  franja: MARCA.cr` (si la franja se lee como un aro en la cintura, como pasó con Bruno y Maxi, `franja: null`),
  **calza navy** `pantalon: MARCA.navy`, **medias antideslizantes crema** `zapatos: MARCA.cr`. `panza: 0.94, nariz:
  0.047, alto: 1.0` (la más alta y delgada del elenco femenino). Objetos aparte (en el tres.js del reel): el celular en
  la mano (funda navy2), una tablilla/clipboard crema en P1. Expresión base: `sonrisa` de instructora en P1, `concentrada`
  en P2-P3 (noche), `incredula` en P4-P5, en P6 ojos cerrados (`ojos.abiertos: 0.05` con `cejas.alto: 0.3`, que se lea
  "respira", no "duerme") con las manos al pecho; `sonrisa`/`feliz` en la parte 2. Nada de llanto ni manos a la cabeza.
- **Alicia · `ELENCO.alicia`** (alumna de años, ~60, voz Laomedeia). Piel `PIEL.clara`, pelo **rubio ceniza**
  `0xcdb07a` (las mechas) en `peinado: "rodete"` (rodete alto de clase; que no se parezca a Graciela: Graciela es lila
  de rulos y lentes; Marta y Mariana tienen rodete negro), `cejaFina: true, cejasColor: 0x8a6a40`, `pestanas: 0x1a1414`,
  sin lentes, mejillas `0xe39282`, labios `0xb5555a`, aros verdes `MARCA.g`. **Remera de manga larga crema**
  `camisa: MARCA.cr, mangas: "largas", cuello: MARCA.navy2, cuelloBotones: false`, **calza navy claro** `pantalon:
  MARCA.navy2`, medias crema `zapatos: MARCA.cr2`. `panza: 1.04, nariz: 0.05, alto: 0.95`. En P4 con una toalla verde
  al hombro (objeto aparte) y el celular en alto. Buena onda total, nunca culpable: en P6 iluminada (`sorpresa` →
  `feliz`), en Q3 la cara se le borra (`sorpresa` leve, mano al pelo).
- **Joaco · `ELENCO.joaco`** (el otro instructor, ~27, voz Zubenelgenubi). Piel `PIEL.morena`, pelo negro `PELO.negro`
  en `peinado: "corto"` con barba corta (`barba: 0x2a2220, barbaLarga: 0.3, barbaOpacidad: 0.55`), `cejasColor:
  0x1e1a18`. **Remera navy de manga corta** `camisa: MARCA.navy3, mangas: "cortas", cuello: MARCA.cr, cuelloBotones:
  false, franja: null`, jogging gris `pantalon: 0x3a3f4a`, zapatillas crema. `panza: 0.96, alto: 1.04`. Que no se
  parezca a Nico (trigueño, corto, camisa) ni a Maxi (jopo): barba y remera navy. Con una mochila navy2 al hombro en P3
  (objeto aparte). En Q2 al lado de Ceci con una botella de agua crema (nada de mate: es el objeto de Rubén).
- **Alumnas de la clase (sin voz):** en los otros cuatro reformers, variantes de DEFECTO con calzas navy/navy2 y remeras
  crema, verde apagado o navy claro; peinados que ya existen (`coleta`, `mediaCola`, `melena`, `corto` canoso para una
  señora). Flor y Gabi son solo nombres en burbujas y en el panel; no hace falta modelarlas aparte.
- **Reusada:** Sofi (`ELENCO.sofi`, con el override de veterinaria/taller: buzo navy claro con franja crema, la varilla
  del micrófono separada de la mejilla) en la videollamada del cierre (Q5), plano medio, auriculares verdes, fondo navy
  liso con el logo de Scalerics chico.
- **Pose de la clase:** `sentado: 1` sobre el carro del reformer, mirando hacia adelante (eje del reformer), brazos
  tirando de las correas en un vaivén lento (remo sentado: las manos van del pecho hacia adelante y vuelven, 1 ciclo cada
  ~2 s); el carro se desliza 10-15 cm con el vaivén. Revisar que las manos agarren las asas sin atravesarlas y que la
  cola del rodete no atraviese el apoyacabezas.

## Objetos 3D (específicos; ¿alguien lo confunde con otra cosa?)
- **El reformer (EL mueble del rubro):** marco rectangular de madera clara `#c9a77a` sobre cuatro patitas (2,3 m x 0,65
  m, ~35 cm de alto), **carro acolchado crema** `MARCA.cr` que corre sobre rieles navy, **apoyacabezas** y **dos
  apoyahombros** cilíndricos crema en el carro, **barra de pies** navy3 en U al frente, **resortes** de acero
  (cilindros con anillos) con **topes verdes de marca** que unen el carro al marco, **dos correas** navy que salen de las
  poleas del extremo de atrás con **asas verdes**. Que no se confunda con una camilla (la de estética) ni con una cama:
  la barra de pies, los resortes a la vista y las correas con poleas son obligatorios en todos los planos generales.
- **La pizarra de cuotas (EL objeto de la parte 1):** pizarra blanca crema con marco navy (1,2 x 0,8 m) colgada sobre
  el mostrador de recepción; título "CUOTAS" Lexend 800 navy; grilla escrita a marcador (Caveat navy) con 40 nombres en
  dos columnas (que se lean como lista: Alicia, Flor, Gabi, Marce, Lucía, Sole, Pato... y el resto como renglones) y la
  columna MARZO con ✓ navy y **"?" rojos apagados** que aparecen con un pop (P2); en P4-P5 en primer término, llena de
  "?". En la parte 2 la pizarra está borrada y dice **"HORARIOS · Lun Mié Vie 8:00 · 19:00"**: jubilada sin subrayarlo.
- **El celular de Ceci** (crearCelular de ya-lo-cargo/anotamelo, funda navy2): el inserto de la escalada y de los 17
  mensajes; la burbuja de Flor en P7.
- **Los comprobantes (P2):** dentro del chat, fotos recreadas planas: un recibo de transferencia crema torcido 15°, uno
  "sacado de otra pantalla" (con el marco negro de un celular y un reflejo blanco plano en diagonal, sin brillo suave que
  haga bandas), uno cortado justo donde va el monto, y burbujas "Te pago el viernes", "¿Me pasás el número de cuenta?",
  "Ceci, ¿esto llegó?".
- **La recepción de noche (P3):** mostrador de madera clara, **laptop** crema/navy abierta con el "home banking"
  genérico (lista de movimientos: "Transferencia recibida $ 3.000" repetido, sin nombres legibles salvo dos o tres), la
  planilla impresa al lado con resaltador verde, **lámpara de escritorio** navy con cono de luz crema plano, una taza.
  Ceci sentada en un taburete alto (`sentado: 1`).
- **El celular de Alicia** (funda verde apagado): el comprobante (P4) y la cuota con el botón (Q1).
- **Cocina de Alicia (Q1, plano corto):** mesada crema, ventana con luz de mañana, una taza de café navy con vapor (3
  cintas crema animadas), una frutera; el celular ≥ 60 % del cuadro, la cocina detrás.
- **La tablet de recepción** en un atril sobre el mostrador (parte 2): el panel (Q2, Q5).
- **Celular parado de la videollamada** (Q5): en un soporte sobre el mostrador, pantalla con Sofi.
- **Detalles del estudio:** una pila de colchonetas enrolladas verde apagado y navy en un estante, pelotas chicas
  crema, un aro mágico (anillo de pilates) navy colgado, la barra de pared. Sin espejo de pared (los reflejos reales son
  caros y las superficies brillantes se rompen en Instagram).

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro final, celular/tablet ≥ 60 % del cuadro en los insertos)
**Parte 1 · P2 · el chat de Ceci** (encabezado navy "Alumnas · marzo"): fotos de comprobantes (ver arriba) · "Te pago el
viernes" · "¿Me pasás el número de cuenta?" · "Ceci, ¿esto llegó?" · chip "Pagaron 23 de 40" (el 23 en rojo apagado).
**Parte 1 · P3 · la laptop:** "Movimientos · marzo" con renglones "Transferencia recibida · $ 3.000"; rótulo HTML con
línea guía: **"No cierra"** (rojo apagado). En el celular: la burbuja "Hola, ¿pudiste ver lo de la cuota?" que se
repite en cascada, contador **"Enviados: 17"**.
**Parte 1 · P4 · el comprobante de Alicia** (pantalla crema, ícono de casita navy, sin nombre de banco): **"Transferencia
realizada"** · **"$ 3.000"** · "2 de marzo" · **"Destinatario: CECILIA · PELUQUERÍA"** (PELUQUERÍA subrayado en rojo
apagado al final del inserto).
**Parte 1 · P5 · rótulos de la pausa:** caja navy, texto crema, línea guía a la pizarra: **"17 cuotas sin cobrar"** y
debajo, en rojo apagado, **"$ 51.000"** (17 × $ 3.000, cuota del caso); a la laptop cerrada: "La noche en el home
banking"; al celular de Alicia: **"Pagado a la peluquera"** (rojo apagado).
**Parte 1 · P7 · burbuja en el celular de Ceci:** "Flor: Ceci, ¿me pasás el número de cuenta de nuevo?".
**Parte 2 · Q1 · la cuota** (celular de Alicia ≥ 60 %, encabezado navy "Estudio Ceci"): **"Hola, Alicia. Tu cuota de
marzo: $ 3.000."** · botón verde **"Pagar con tarjeta o débito"** · toca · pantalla de pago genérica de un toque
("Estudio Ceci · $ 3.000 · Confirmar") · **"Pagado ✓ · a Estudio Ceci"** (el destinatario bien escrito, que se lea:
es el callback de la peluquería) · chico abajo: "Dejar en débito automático" con un tilde. Rótulo HTML: **"Te cobra
solo el día 1"**.
**Parte 2 · Q2 · el panel** (tablet ≥ 70 % del cuadro, encabezado "Cuotas de marzo"): **"Pagaron: 0 → 34 de 40"** (el
contador sube con los chips DÍA 1 → DÍA 4), lista con tildes que se prenden de a una (Alicia ✓ día 1 7:02, Lucía ✓,
Marce ✓, Sole ✓...), chip **"DÍA 5 · Recordatorio automático a 6 ✓"**, **"Pagaron: 39 de 40"**, **"Cobrado: $ 117.000"**
(verde, 39 × $ 3.000), **"Comprobantes para revisar: 0"**, y una fila aparte bajo el título "Asistencia": **"Gabi · 3
semanas sin venir · Aviso enviado ✓ · Vuelve el jueves"**. Rótulo HTML: "Cuotas y asistencia en un panel".
**Parte 2 · Q3:** sin interfaz; la clase. Si hace falta, el celular de Ceci boca abajo en la barra de pies: no lo mira.
**Parte 2 · Q4 · notificación** en el celular de Ceci (apoyado en la barra de pared, inserto chico de 1 s):
**"Pago recibido ✓ · Flor · $ 3.000"** y el panel (rótulo) **"Pagaron: 40 de 40 ✓"**.
**Parte 2 · Q5 · el panel + cierre:** "Pagaron: 40 de 40 ✓", **"Cobrado: $ 120.000"** y **"Mensajes de cobro a mano: 0"**
(verde).
**Capa HTML:** "Comentá **CUOTA**" grande (Lexend 900, ~140 px, CUOTA en el recuadro verde), sobre la escena; en los
últimos ~1,5 s, abajo chico: "Cobro de cuotas automático" / "scalerics.com" en verde.

## PARTE 1 · el problema (0,00-17,00 s, tiempos estimados)
Cámara continua en el estudio. Eje del set: los cinco reformers en fila de frente a cámara, con Ceci adelante; la
recepción con la pizarra al fondo a la izquierda; el ventanal a la derecha.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,90 | **P1 · cuadro 0.** Plano medio-corto desde la altura del reformer, de 3/4: Alicia sentada en el carro, grande en primer término (remando con las correas), los otros reformers con alumnas en fila detrás, Ceci de pie a la derecha con el celular que vibra en la mano y la tablilla en la otra. Push-in lento. | **Cuadro 0:** arriba, enorme, **"ESTUDIOS DE PILATES"** (Lexend 900, ~120 px, crema sobre la pared navy, PILATES en el recuadro verde); chip "DÍA 10 · 8:00". La clase ya en curso: el carro va y viene. 0,30-1,60 · **Alicia: "Ceci, ¿te pagué marzo?"** (sin dejar de remar) 1,70 · Ceci mira el celular · 1,80-2,70 · **Ceci: "Ahora me fijo."** (sonrisa de instructora). | estudio, reformers (5) con alumnas, Alicia, Ceci, celular, tablilla | música liviana de clase, bajita · el carro del reformer sobre los rieles (rodado suave) y el clac de los resortes en cada vuelta · vibración del celular 1,70 |
| 2,90-5,00 | **P2 · la escalada.** a) Inserto del celular de Ceci (≥ 60 %), 2,90-4,20: el chat que se llena de comprobantes y mensajes (uno cada ~0,25 s, cada vez más rápido). b) 4,20-5,00: la pizarra de cuotas en plano corto, la mano de Ceci con el marcador: ✓, "?", "?", "?" (los "?" rojos aparecen con pop), chip "Pagaron 23 de 40". | sin voz | celular de Ceci, comprobantes, pizarra, marcador | pop/notificación por mensaje (6-7, escalonados y acelerando) · marcador en la pizarra (chirrido corto) ×3 |
| 5,00-8,80 | **P3 · la creencia (de noche).** Chip "DÍA 10 · 22:40". La recepción a oscuras, solo la lámpara: Ceci en el taburete con la laptop y la planilla, de 3/4; Joaco cruza por detrás con la mochila al hombro apagando las luces de la sala (los reformers quedan en penumbra navy). Contraplano corto de Ceci al contestar. | 5,10 · rótulo "No cierra" a la laptop · 5,40-7,20 · **Joaco: "¿Y si les mandamos un link de pago?"** · 7,40-8,60 · **Ceci: "No. Yo no persigo a nadie."** · mientras lo dice, en su celular, apoyado en el mostrador y en cuadro, sale en cascada "Hola, ¿pudiste ver lo de la cuota?" con el contador **"Enviados: 17"**. | recepción, laptop, planilla, lámpara, celular, Ceci, Joaco, mochila | clic de interruptor 5,20 · teclado de laptop · "enviado" (swoosh chico) ×6 rápido debajo de "persigo a nadie" |
| 8,80-11,80 | **P4 · el golpe.** Chip "DÍA 11". La recepción de mañana: entra Alicia con la toalla verde al hombro y el celular en alto; Ceci detrás del mostrador. 11,00-11,80 · inserto del comprobante (≥ 60 %). | 9,00-10,90 · **Alicia: "¡Ceci! Te transferí el 2. Mirá."** · 11,00 · el comprobante: "Transferencia realizada · $ 3.000 · 2 de marzo · Destinatario: CECILIA · PELUQUERÍA" · 11,50 · PELUQUERÍA se subraya en rojo apagado. | recepción, pizarra con "?", Alicia, toalla, celular de Alicia, Ceci | pasos/puerta 8,85 · pop del inserto 11,00 · trazo del subrayado 11,50 |
| 11,80-12,80 | **P5 · la pausa.** Plano desde atrás del mostrador: la pizarra llena de "?" en primer término, Ceci de pie mirando el celular de Alicia, Alicia sonriente. Cámara quieta. | La música baja a -12 dB en 0,4 s (no se corta). 11,90 · rótulos con línea guía: "17 cuotas sin cobrar" / **"$ 51.000"** (rojo apagado) a la pizarra; "Pagado a la peluquera" (rojo apagado) al celular de Alicia. | pizarra, Ceci, Alicia, celular | pop chico por rótulo · el ambiente del estudio (carros de la clase siguiente, lejos) |
| 12,80-15,90 | **P6 · el remate.** Plano medio de Alicia (iluminada, mano al pelo) y corte a primer plano de Ceci: cierra los ojos, manos al pecho, como en la clase. | 12,90-14,70 · **Alicia: "¡Con razón me hizo las mechas gratis!"** · pausa 0,4 s · 15,10-15,80 · **Ceci: "Inhalamos."** (controlada, en voz baja). | Alicia, Ceci | inhalación larga (la de la toma de Ceci; si no está, nada) |
| 15,90-17,00 | **P7 · remate del remate.** El mismo primer plano: vibra el celular en la mano de Ceci; burbuja grande "Flor: Ceci, ¿me pasás el número de cuenta de nuevo?"; Ceci abre un solo ojo. | 16,10 vibración · 16,20 burbuja · 16,60 abre un ojo · 16,90 stinger. | Ceci, celular | vibración 16,10 · pop de burbuja 16,20 · stinger 16,90 |

## CARTEL (17,00-19,50 s)
Time card de dibujito de siempre: **"Un cobro" / "automático" / "más tarde…"**. Narrador Rasalgethi (toma nueva).
Nunca "Scalerics".

## PARTE 2 · resuelto (19,50-37,60 s) · la solución en pantalla, ~la mitad del reel

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 19,50-23,20 | **Q1 · la cuota sola.** Chip "DÍA 1 · 7:00". La cocina de Alicia: Alicia con la taza de café; push-in al celular hasta ≥ 60 %. | 19,70 · llega la cuota: "Estudio Ceci · Hola, Alicia. Tu cuota de marzo: $ 3.000." · 20,60 toca **"Pagar con tarjeta o débito"** · 21,10 "Confirmar" · 21,50 **"Pagado ✓ · a Estudio Ceci"** · 21,90-23,00 · **Alicia: "¿Ya? ¿Así nomás?"** (sorprendida, contenta). Rótulo: "Te cobra solo el día 1". | cocina, taza con vapor, Alicia, su celular | notificación 19,70 · click-soft 20,60 y 21,10 · ding (`cero.mp3`) 21,50 |
| 23,20-27,40 | **Q2 · el panel.** La recepción de día; push-in a la tablet del atril hasta ≥ 70 %; Ceci de 3/4 al lado, Joaco con la botella de agua. Detrás, la pizarra ya dice "HORARIOS". | 23,40-24,40 · "Pagaron" 0 → 34 con los chips DÍA 1 → DÍA 4 y los tildes que se prenden · 24,50 chip "DÍA 5 · Recordatorio automático a 6 ✓" · 34 → 39 · "Cobrado: $ 117.000" · "Comprobantes para revisar: 0" · fila de asistencia "Gabi · 3 semanas sin venir · Aviso enviado ✓ · Vuelve el jueves" · 24,60-26,40 · **Joaco: "¿Y si les mandamos un link de pago?"** (el mismo audio de P3) · 26,60-27,40 · **Ceci: "Ya pagaron 39."** (sin levantar la vista). | recepción, tablet, pizarra "HORARIOS", Ceci, Joaco, botella | ding por tilde (escalonados, suaves) · tic de contador · whoosh-short del recordatorio |
| 27,40-32,00 | **Q3 · callback de la clase.** Chip "DÍA 10 · 8:00". El encuadre del cuadro 0: Alicia remando en el carro, Ceci de pie, ahora con las dos manos libres (el celular quedó en la barra de pared, boca abajo). | 27,60-28,90 · **Alicia: "Ceci, ¿te pagué marzo?"** (el mismo audio de P1, la misma burbuja) · 29,10-30,20 · **Ceci: "El 1, a las 7:02."** (sonriendo, sin mirar el celular) · 30,30 Alicia se toca el pelo, se le borra la sonrisa · 30,50-31,90 · **Alicia: "Uy. Entonces las mechas las debo."** | estudio, reformers con alumnas, Alicia, Ceci, celular en la barra | carro y resortes · risita de una alumna del fondo SOLO si hay una grabación CC0; si no, nada |
| 32,00-34,00 | **Q4 · "Y exhalamos."** Plano medio de Ceci adelante de la clase, las manos al pecho (el mismo gesto de P6, ahora relajado). Vibra el celular en la barra: inserto chico "Pago recibido ✓ · Flor · $ 3.000" y "Pagaron: 40 de 40 ✓". | 32,10 vibración · 32,30 notificación · 32,40-33,20 · **Ceci: "Y exhalamos."** (feliz, larga) · toda la clase baja los brazos a la vez. | Ceci, clase, celular | vibración 32,10 · ding 32,30 · exhalación de la toma |
| 34,00-37,60 | **Q5 · el panel + cierre.** La cámara va de la clase a la recepción: la tablet del atril (≥ 60 % al principio) con "40 de 40 ✓", "Cobrado: $ 120.000", "Mensajes de cobro a mano: 0"; al lado, el celular parado con **Sofi en videollamada**; travelling corto a Sofi. | 34,10 "Mensajes de cobro a mano: 0" en verde (ding) · 34,30-37,40 · **Sofi: "Comentá CUOTA y te mando cómo funciona para tu estudio."** · en "CUOTA" entra grande **"Comentá CUOTA"** (capa HTML) · 36,10 línea chica: "Cobro de cuotas automático" / "scalerics.com". | recepción, tablet, celular parado con Sofi, pizarra "HORARIOS" al fondo | whoosh de cámara 34,00 · ding 34,10 · pop en "CUOTA" · final de la música |

**Si las tomas reales hacen pasar el reel de ~39 s**, recortar en este orden: (1) P2 sin el plano de la pizarra (los
"?" ya se ven en P4-P5; -0,8 s); (2) Q2 con el contador más rápido (-0,6 s); (3) Q1 sin la pantalla de "Confirmar"
(-0,4 s). Nunca recortar P5 por debajo de 0,9 s ni la pausa antes de "Inhalamos.". La parte 2 tiene que quedar entre
el 45 y el 55 % del total.

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "ESTUDIOS DE PILATES" entero y legible; Alicia grande en el reformer, el reformer reconocible (barra de
  pies, resortes, correas con asas), Ceci con el celular. Que se lea "pilates" y no "gimnasio de pesas" ni "estética".
- **El reformer:** que las manos de Alicia agarren las asas sin atravesarlas; que el carro se deslice sobre los rieles
  sin atravesar el marco; las correas tensas siguen a las manos; el rodete no atraviesa el apoyacabezas.
- **La pizarra:** los nombres y la columna MARZO legibles en P2 y P4-P5; los "?" rojos no se pisan con los ✓; en la
  parte 2 borrada con "HORARIOS".
- **El comprobante:** "CECILIA · PELUQUERÍA" se lee entero y con tiempo (≥ 0,8 s quieto); sin nombre de banco ni logo.
- **Interfaz de la parte 2:** cada pantalla ≥ 60 % del cuadro, textos ≥ 36 px, sin el verde ni el logo de WhatsApp,
  botón de pago genérico (sin logos de tarjetas); ✓ verdes; el panel con los números legibles; 23 (rojo) en la parte 1 y
  39 → 40 (verde) en la parte 2.
- **Ceci en P6:** ojos cerrados que se lean como "respira" (cejas arriba, manos al pecho), no como un párpado-bulto de
  piel ni como dormida; "Inhalamos" y "Y exhalamos" con la burbuja en el mismo lugar.
- **Continuidad:** Ceci siempre con el buzo verde apagado y la calza navy; Alicia con el rodete rubio ceniza, la remera
  crema y la calza navy claro; Joaco con la remera navy y la barba; la pizarra con "?" en la parte 1 y "HORARIOS" en la
  parte 2. Las burbujas de "Ceci, ¿te pagué marzo?" iguales en P1 y Q3.
- **Sofi:** ELENCO.sofi (no un personaje nuevo), ojos abiertos cuando habla, dentro de la pantalla del celular parado.

## Portada (portada.json)
`t` ≈ 12,0-12,8 (P5) o un plano propio "portada" como hicieron taller y veterinaria (VER=portada en tres.js): **Ceci
de frente, detrás del mostrador, con cara de `incredula`, y Alicia a su lado sonriente con el celular en alto**, los dos
en la mitad de arriba, la pizarra llena de "?" rojos detrás. Renderizar sin gancho, rótulos, subtítulos ni burbujas
(LIMPIO=1). Alternativa: P1, Alicia en el reformer en primer término y Ceci con el celular. `chica`: "Día 10, en clase." · `grande`: **"¿Te pagué marzo?"** (la frase que la dueña escucha, 3 palabras, entre signos) · `sello`:
"PILATES". Alternativa de `grande`: "Inhalamos." (con `chica` "Pagó a la peluquera.").
