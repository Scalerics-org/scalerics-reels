# Plan de escenas · por-que-te-llaman (explicador "¿Por qué…?", ~33 s, 3D real)

> **OBSOLETO (15-11):** este es el plan original, anterior a las rondas de corrección. Lo vigente está en SPEC.md (brief de la ronda 1) y en NOTAS-constructor.md (tablas de la ronda 1 y la ronda 2).

"¿Por qué pedís un presupuesto y te llaman enseguida?" sobre **Rubén en su oficina vidriada arriba del depósito,
tocando "Enviar" en un pedido de presupuesto de un autoelevador eléctrico, y el celular que ya vibra en el escritorio
antes de que llegue a tomar el mate** (cuadro 0 = escena en curso). Desenlace en la frase 2: "Porque el interés se
enfría rápido." (el mate gigante pierde el vapor). Bisagra: "¿Qué tan rápido?" ("?" verde). **Dato que sorprende
(s04-s06):** un estudio (Oldroyd, McElheran y Elkington, HBR 2011) consultó a más de 2.000 empresas: casi una de cada
cuatro nunca contestó y las demás tardaron casi dos días de promedio. **Por qué conviene ser rápido (s07-s08):** llamar
en la primera hora multiplicaba las chances de llegar al que decide. **Giro / callback (s09-s10):** Rubén corta el
teléfono: "Yo le compré al que llamó primero." Mira el monitor: una consulta de Graciela (rotisería) de ayer, sin
responder. "¿Y esta consulta de ayer?". **Solución (s11-s12):** el CRM la anota y avisa a Nico al instante; el mate
que se enfriaba vuelve a humear cuando el mensaje a Graciela sale solo. Cierre: "¿Querés llegar primero?" +
videollamada gratis.

- **Producto: CRM + automatización del seguimiento de presupuestos** (cada consulta queda anotada, avisa al vendedor al
  momento, y si el cliente no responde le vuelve a escribir solo). Nunca "bot". En pantalla: "Consultas", ficha del
  cliente, "Aviso a Nico ✓", mensaje automático con ✓✓.
- **Datos:** solo los de `fuentes.md`. En la voz: "más de dos mil", "casi una de cada cuatro", "casi dos días",
  "multiplicaba las chances de llegar al que decide". En pantalla, como mucho: "2.241 empresas", "23 %", "promedio: 42
  horas", "en la primera hora". **Nunca** "5 minutos" como dato, "21x", "100x", "391 %", "vende más".
- **Personas reales:** los autores y la revista solo en crédito mono chico ("Harvard Business Review · 2011"), sin
  dibujarlos, sin logo ni tipografía de HBR.
- **Rubén es el de la DISTRIBUIDORA** (`ELENCO.ruben` de `reels/abren-hoy/assets/personajes.js`: camisa navy de manga
  larga arremangada, sin delantal; `crearMate` / `crearTermo`). **Reusar la oficina vidriada y el depósito** de
  `reels/por-que-el-99` (o de `ya-lo-cargo`) para que la distribuidora sea la misma en el feed. Graciela y Nico solo
  como nombres en pantalla (no hace falta dibujarlos); si se quiere, la foto-avatar de Graciela en la ficha con
  `ELENCO.clienta` en chiquito, nunca encima de una cara.
- **Voces:** Orus (82 palabras) + **Rubén (Algenib), 12 palabras** en dos líneas. Total 94. Ver `partes/voces.md`.
- **Base técnica:** `reels/por-que-el-99` y `reels/por-que-sacar-numero` (tres.js con `renderAt(t)` puro, cámara
  Catmull-Rom, PMREM, "?" verde, gen.mjs, firma.json, partes/armar-voz.mjs), personajes de `reels/abren-hoy`
  (ELENCO.ruben) + utilitarios de `reels/anotamelo/assets/personajes.js` (crearCelular, crearReloj, crearTablet).

## Fondo y paleta (anotar en "Hechos")
**Navy claro `#16243d` liso, con el piso convertido en un RELOJ GIGANTE: esfera de líneas crema `#efeee5` de 8 px (al
55 %), las 12 marcas de hora como bastones crema y dos agujas navy oscuro `#0b1220` con borde crema que se mueven con
la historia; cierre verde.** El tiempo es el tema, y el reloj es el escenario donde se apoyan los objetos (sombra suave
al 35 %). Últimos explicadores: por-que-el-99 navy3 `#1f3254` con planilla de piso (14-11), por-que-sacar-numero crema
liso (13-11), por-que-las-tarjetas navy oscuro (12-11), por-que-devolver-gratis navy claro liso (12-11). Combinación
nueva: **navy claro + reloj gigante de piso + oficina de Rubén + cierre verde**.
- Oficina de Rubén (s01, s09-s11): la de por-que-el-99 (paredes navy3, ventanal al depósito con racks navy claro de
  largueros crema, pallets, cajas kraft `#c9a46b`, una zorra hidráulica; escritorio de madera clara, monitor grande,
  mate y termo).
- **Verde `#5ce611` = a tiempo / lo resuelto**: el vapor del mate, la porción de la primera hora en el reloj, las
  tildes, el recuadro de los subtítulos. **Rojo apagado `#c7655b` SOLO para el problema**: el buzón que nunca
  contestó, "sin responder" en la bandeja de Rubén, el mate frío. Lo que pierde, crema al 60 % / gris navy claro.
- Subtítulos: arriba al centro, 1-3 palabras, 86 px, Lexend 800 crema con borde navy `#0b1220` de 14 px; palabra
  clave en recuadro verde con texto navy. Rótulos: placa crema con texto navy y borde verde, línea guía crema de 7 px,
  ≥ 36 px. Créditos: mono crema 34-38 px. Logo crema; `firma.json` lo esconde en primeros planos.
- Números 3D (TextGeometry Lexend 800): "2.241" (s04), "42 h" (s06), "1 h" (s07). Arriba y limpios.

## Escenas (palabra de inicio sobre el guion limpio de 94 palabras; tiempos estimados a 0,34 s/palabra + pausas)
| # | id | palabra | arranca | dura | frase |
|---|----|---------|---------|------|-------|
| 1 | s01-gancho | 0 | 0,0 | 3,4 | ¿Por qué pedís un presupuesto y te llaman enseguida? |
| 2 | s02-se-enfria | 9 | 3,4 | 2,2 | Porque el interés se enfría rápido. |
| 3 | s03-que-tan | 15 | 5,6 | 1,7 | ¿Qué tan rápido? (+0,3 s antes y después) |
| 4 | s04-estudio | 18 | 7,3 | 3,1 | Un estudio les escribió a más de dos mil empresas. |
| 5 | s05-nunca | 27 | 10,4 | 2,6 | Casi una de cada cuatro nunca contestó. |
| 6 | s06-dos-dias | 34 | 13,0 | 2,8 | Las demás tardaron, en promedio, casi dos días. |
| 7 | s07-primera-hora | 42 | 15,8 | 1,8 | Llamar en la primera hora |
| 8 | s08-el-que-decide | 47 | 17,6 | 2,7 | multiplicaba las chances de llegar al que decide. |
| 9 | s09-ruben-compro | 55 | 20,3 | 2,4 | (Rubén) Yo le compré al que llamó primero. |
| 10 | s10-ruben-ayer | 62 | 22,7 | 2,1 | (Rubén) ¿Y esta consulta de ayer? |
| 11 | s11-crm | 67 | 24,8 | 3,2 | Un CRM anota cada consulta y te avisa al instante. |
| 12 | s12-escribe-solo | 77 | 28,0 | 2,7 | Si el cliente se enfría, le escribe solo. |
| 13 | s13-llegar | 85 | 30,7 | 1,8 | ¿Querés llegar primero? Agendá una |
| 14 | s14-cierre | 90 | 32,5 | 2,8 | videollamada gratis en scalerics.com. |

Total ~35 s con pausas. Si queda largo, recortar pausas antes que palabras; si s04 pasa de 3 s, que algo cambie a
mitad (el avión se multiplica en "dos mil").

`reel.json` sugerido (el constructor lo ajusta con los tiempos reales):
```
"escenas": [["s01-gancho",0],["s02-se-enfria",9],["s03-que-tan",15],["s04-estudio",18],["s05-nunca",27],
 ["s06-dos-dias",34],["s07-primera-hora",42],["s08-el-que-decide",47],["s09-ruben-compro",55],["s10-ruben-ayer",62],
 ["s11-crm",67],["s12-escribe-solo",77],["s13-llegar",85],["s14-cierre",90]]
"acento" (palabras clave): enseguida 8, enfría 13, rápido 17, "dos mil" 24-25, nunca 32, "dos días" 40-41,
 "primera hora" 45-46, decide 54, primero 61, ayer 66, CRM 68, instante 76, solo 84, primero 87
"texto": {"24": "2.000", "25": ""} si "dos mil" se quiere en cifra en el subtítulo (opcional).
```

## Cámara continua (Catmull-Rom, una sola curva salvo el cierre)
Oficina (s01, plano por encima del hombro de Rubén al monitor y al celular) → push-in al celular que vibra, que se
transforma en el **mate gigante** apoyado sobre el reloj-piso (s02) → grúa arriba al "?" (s03) → travelling bajo y
rasante sobre la esfera del reloj, de objeto en objeto (avión y empresas → buzones → reloj de pared → silla de
director) (s04-s08) → la esfera se encoge y se vuelve el reloj de pared de la oficina de Rubén (s09: la cámara sale
del reloj y encuentra a Rubén de frente) → paneo al monitor (s10) → zambullida en el monitor que se vuelve la ficha del
CRM (s11) → el mate gigante otra vez, sobre el reloj (s12) → cierre verde (s13-s14). En cada transición hay un objeto
grande en cuadro; nunca la pantalla lisa.

## Brief por escena (objeto 3D protagonista, cámara, rótulos, SFX)

**s01-gancho (0-3,4).** Portada en movimiento. Plano por encima del hombro derecho de **Rubén** sentado en su oficina
vidriada; el **monitor** grande (60-65 % del ancho) muestra un formulario genérico "**Pedir presupuesto ·
Autoelevador eléctrico**" con campos llenos (Empresa: "Distribuidora Rubén", Teléfono: "099 ···") y el botón verde
"**Enviar**" (textos ≥ 40 px). Ya en el cuadro 0 el cursor está sobre "Enviar"; a los ~0,4 s **clic** → "Enviado ✓".
Rubén levanta el mate hacia la boca y **a los ~1,4 s el celular del escritorio vibra** (salta 1-2 cm, rebote,
pantalla encendida: "**Llamada entrante · Ventas Autoelevadores**", genérico, sin marca) y Rubén frena el mate a
medio camino, cejas arriba (expresión "sorprendida"), mira el celular. El mate NO toca la cara. Detrás del vidrio,
desenfocado, el depósito con racks, pallets y una zorra hidráulica. Gancho entero desde el cuadro 0 en el tercio de
arriba (Lexend 900, 120-140 px): "¿Por qué te llaman" / "**enseguida**?". Cámara: push-in lento del monitor al
celular. SFX: ambiente de depósito muy bajo, `click`, vibración de celular real (CC0) + ring corto.

**s02-se-enfria (3,4-5,6).** El celular **se transforma** (escala y morph corto) en un **mate gigante** de calabaza
(70 % del alto de la zona de dibujo) con bombilla metálica y yerba verde, con una placa colgante "pedido de
presupuesto", apoyado sobre la **esfera del reloj-piso**. Vapor verde saliendo en volutas (geometría, no partículas
al azar: posiciones con semilla). En "se enfría" el vapor **se corta** y se achica, y la yerba pasa de verde vivo a
gris-oliva; detrás, las agujas del reloj-piso avanzan rápido. Rótulo con línea guía: "se enfría en horas". Cámara: la
cámara sale del celular hacia atrás y queda frente al mate, leve contrapicado. SFX: `whoosh-cinematic` de la
transformación, siseo suave del vapor que se apaga.

**s03-que-tan (5,6-7,3).** Bisagra: el mate baja y se aleja; un **"?" verde 3D grande y centrado** (TextGeometry,
dentro del 80 % seguro) cae y rebota sobre el centro del reloj, donde se juntan las agujas. Un solo objeto. Cámara:
grúa arriba. SFX: `pop` grave + `whoosh-short`.

**s04-estudio (7,3-10,4).** El "?" se pliega en un **avión de papel crema** grande (60 % del ancho) con un sobre
dibujado en el ala. En "consultó" vuela rasante sobre la esfera, donde brota un **campo de edificios chicos** (cubos
navy3 con ventanas crema, cientos, instanciados), y en "dos mil" el avión **se multiplica** en una bandada que se
reparte a los edificios. Arriba, número 3D "**2.241**" crema con "empresas" en rótulo. Crédito mono abajo: "Oldroyd,
McElheran y Elkington · Harvard Business Review · 2011". Cámara: travelling siguiendo el avión, sube para ver el campo.
SFX: `whoosh` de avión de papel (CC0), `pop` en el número, ráfaga de whooshes cortos en la bandada.

**s05-nunca (10,4-13,0).** Primer plano: **cuatro buzones grandes** en fila sobre el reloj (buzón de pie con banderita,
navy3 con tapa crema), cada uno recibe su sobre. En "contestó", **tres** levantan la banderita verde y devuelven un
sobre (✓ verde); **el cuarto queda cerrado**, se pone rojo apagado, el sobre asoma sin abrir y una telaraña fina (6-8
px) aparece en la ranura. Rótulo con línea guía al cuarto: "nunca contestó · 23 %". Cámara: dolly lateral por los
cuatro, se queda en el rojo. SFX: tres `tac` de banderitas, silencio corto y `golpe` sordo en el rojo.

**s06-dos-dias (13,0-15,8).** El buzón rojo se vuelve un **reloj de pared gigante** (aro navy oscuro, esfera crema,
agujas navy, 75 % del ancho) parado sobre el reloj-piso. En "tardaron" las agujas **giran rápido** (casi dos vueltas
de 24 h: 3,5 vueltas de la aguja de hora, con desenfoque de movimiento), y un **sol y una luna** chicos cruzan arriba
dos veces (día, noche, día). Número 3D arriba: "**42 h**" con rótulo "promedio de las que contestaron". Cámara:
push-in suave, el reloj tiembla un poco al final. SFX: tic-tac acelerado (CC0), `ding` seco al frenar.

**s07-primera-hora (15,8-17,6).** El reloj frena y vuelve a las 12: la **porción de la primera hora** (de 12 a 1) se
**pinta de verde** como un quesito que sale en relieve hacia la cámara. Número 3D "**1 h**" verde arriba. Rótulo: "en
la primera hora". Cámara: push-in a la porción verde. SFX: `pop` + `chime`.

**s08-el-que-decide (17,6-20,3).** De la porción verde sale un **cable de teléfono enrulado** (verde, 8 px de grosor
visual) que viaja rasante sobre el reloj-piso hasta una **silla de director** de cuero navy con respaldo alto (que se
lea "el que decide": silla grande de oficina, con placa crema "DECIDE"). En "multiplicaba" brotan **tildes verdes**
alrededor de la silla, de 1 a muchas (con semilla), sin número. Al costado, un segundo cable gris que sale "una hora
después" queda corto y cae flojo. Cámara: travelling siguiendo el cable, termina frente a la silla. SFX: `whoosh` del
cable, `pop` creciendo por tilde.

**s09-ruben-compro (20,3-22,7).** **Grúa atrás**: la esfera del reloj-piso se encoge y se vuelve el **reloj de pared
de la oficina de Rubén**; la cámara baja y encuentra a **Rubén de frente**, plano medio, cortando el celular, mate en
la otra mano, apoyado atrás en la silla (expresión "satisfecha", media sonrisa). Línea: "Yo le compré al que llamó
primero." (boca sincronizada, ojos abiertos). Detrás, por el vidrio, entra un **autoelevador eléctrico** genérico
(navy con mástil crema) al depósito: lo que compró. Cámara: grúa que termina en plano medio. SFX: `whoosh-cine-corto`,
"bip" de cortar llamada, motor eléctrico suave del autoelevador.

**s10-ruben-ayer (22,7-24,8).** Rubén gira la cabeza al monitor (contraplano por encima del hombro). El monitor muestra
la **bandeja de consultas** (lista genérica, filas ≥ 40 px); una fila resaltada en rojo apagado: "**Graciela ·
Rotisería · Pedido de presupuesto · ayer 18:40 · sin responder**". Rubén: "¿Y esta consulta de ayer?" con las cejas
que bajan de a poco (se le cae la ficha, ironía seca, sin drama). Pausa de 0,4 s después. Sobre el escritorio, el mate
de Rubén se ve sin vapor (eco del s02). Cámara: push-in lento a la fila roja. SFX: `click` del mouse, un `tic` en la
fila roja.

**s11-crm (24,8-28,0).** **Zambullida** en el monitor: la bandeja se vuelve una **ficha de CRM** 3D (tarjeta gruesa
RoundedBox crema que llena el 70 % del ancho, texto ≥ 40 px): "**Graciela · Rotisería**", "Pedido de presupuesto ·
18:40", y entran con pop: "**Anotado ✓**" (en "anota") y "**Aviso a Nico ✓ 18:41**" (en "te avisa al instante"),
con una campanita verde que se sacude. La fila roja de la bandeja ya no existe: la consulta entra sola. Rótulo:
"al instante". Cámara: la tarjeta gira 15° y frena de frente. SFX: `whoosh`, `pop` ×2, `notification`.

**s12-escribe-solo (28,0-30,7).** Vuelve el **mate gigante** sobre el reloj-piso, frío (sin vapor, yerba gris): las
agujas avanzan "un día". En "le escribe solo" una **burbuja de chat** 3D crema sale volando sola desde la ficha:
"**Graciela, ¿pudiste ver el presupuesto?**" con ✓✓ verdes; en el mismo momento el **termo** (`crearTermo`, crema y
navy) se inclina y ceba: el **vapor verde vuelve** y la yerba se pone verde de nuevo (callback de "se enfría"). Rótulo:
"sale solo". El mate no lo toca nadie (que se vea que es automático). Cámara: órbita corta de 25° alrededor del mate.
SFX: `whoosh-short` de la burbuja, `notification`, agua del termo (CC0), siseo del vapor que vuelve.

**s13-llegar (30,7-32,5).** El vapor del mate sube y llena el cuadro de verde (transición a la tarjeta); en "¿Querés
llegar primero?" queda una **burbuja de respuesta** de Graciela que entra un instante: "Sí, mandame 40 cajas." (✓,
opcional si no satura). SFX: `pop`, `whoosh-short`.

**s14-cierre (32,5-35,3).** Arranca sobre "videollamada": fondo **verde de marca `#5ce611`** liso, "Videollamada
gratis" en navy Lexend 900 grande y debajo "scalerics.com" grande en navy (verde sobre verde no se lee), un mate chico
humeando de firma en una esquina (opcional) y logo. 2,5-3 s. SFX: whoosh de entrada, música que cierra.

## Riesgos a mirar en la revisión de arte
- El mate de Rubén en s01 y s09: no le atraviesa la cara ni el bigote; la bombilla no le entra en la boca.
- El celular que vibra: que se vea encendido y con texto grande, no una pantalla negra.
- Mate gigante: que se lea mate uruguayo (calabaza con bombilla metálica, yerba verde), no taza ni maceta.
- El campo de edificios: que no se vuelva ruido; edificios simples, bordes marcados, sin brillos finos.
- Reloj-piso: líneas gruesas (8 px), que no salgan bandas por la compresión; nada de degradés suaves.
- Ningún número que no esté en `fuentes.md`; nada de "5 minutos" en pantalla (salvo la escena de Rubén sin cifra).
- Graciela / Nico solo como nombres en la ficha; si hay avatar, chico y sin tapar textos.
- La oficina: distribuidora (racks, pallets, autoelevador), nunca mostrador de almacén.

## Portada
Fondo limpio (sin gancho, subtítulos ni logo) de s01 (Rubén con el mate a medio camino y el celular vibrando, pantalla
"Llamada entrante" en grande) o de s05 (los cuatro buzones con el rojo). Texto: `chica` "¿Por qué te llaman",
`grande` "enseguida?", `sello` "¿Por qué?", acento verde.
