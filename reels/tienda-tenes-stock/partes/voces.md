# tienda-tenes-stock · voces (Gemini TTS, 3 tomas por línea en partes/tomas/, tonos en partes/lineas.tsv)

Sin Orus. Paola = **Autonoe** · Mica = **Zephyr** · Graciela = Gacrux (la de siempre) · narrador del cartel = Rasalgethi
(toma reusada). Generar cada una desde `reels/tienda-tenes-stock` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "<tono de lineas.tsv>"`
(o copiar `reintentar.sh` / `medir-tomas.sh` / `procesar.sh` de `reels/inmobiliaria-visitas/partes`). Recortar silencios
(silenceremove) en `partes/rec/`; finales en `assets/voice/`. Medir cada línea con `tiempos.mjs` ("oyó:" igual al .txt).

**Por qué estas voces:** Autonoe y Zephyr no las usó ningún reel del 16 y 17-11 (solo en reels viejos de octubre, como
voces de fondo; Autonoe figuraba como alternativa no usada en veterinaria-vacunas). Las de los últimos reels quedan
afuera: Algenib = Rubén, Gacrux = Graciela, Fenrir = Nico, Umbriel = Walter, Sadaltager = Héctor, Kore = Lorena, Leda =
Carolina, Despina = Jimena, Charon/Puck = taller, Iapetus/Achird = parrilla, Alnilam/Enceladus/Sadachbia = corralón,
Sulafat/Callirrhoe/Schedar = veterinaria, Algieba = el contador, Vindemiatrix/Laomedeia/Zubenelgenubi = pilates,
Erinome/Pulcherrima = inmobiliaria, Achernar = Sofi. **Que Paola y Mica no suenen parecidas:** Paola más grave y con
calle (si Autonoe suena a locutora o muy dulce, bajarle la energía en el tono; alternativa: Aoede), Mica más aguda,
joven y rápida (si Zephyr suena a publicidad, alternativa: Aoede para Mica y Autonoe para Paola). Si el reel que se hace
en paralelo (`contable-papeles`) eligió alguna de estas, el coordinador decide cuál cambia.

**Dos callbacks reusan el MISMO audio** (es el chiste: la frase idéntica, otra respuesta):
- Q1 · Mica "¡Pao! La verde la vendí en el local." = la toma final de `03-mica` (no se genera de nuevo).
- Q4 · Paola "¡Hola! ¡Ingreso nuevo!" = la toma final de `08-paola`.

**Filtros:** `01-graciela` y `05-graciela` son audios de chat: pasabanda de celular leve (como el altavoz de
inmobiliaria-visitas, más suave). `11-graciela` sin filtro (está en cuadro). `08-paola` sin filtro (graba ella). El
resto sin filtro.

**Lo más importante de las tomas:**
- `07-paola` "Del contenedor de marzo." tiene que salir seca y plana; si suena triste o enojada, regenerar.
- `08-paola` "¡Hola! ¡Ingreso nuevo!" tiene que ser un cambio de cara total respecto de 07 (alegre, cantada, de historia
  de redes). Es el remate del remate y el callback de Q4: elegir la toma más graciosa.
- `13-paola`: si pasa de 3,3 s, atempo 1,08-1,12. Que "importadora" se entienda.

Burbujas SIN voz (solo pop): "Pagado ✓", "Reintegro", el cuaderno, los rótulos de la pausa, el catálogo, la compra de
Graciela, el pedido en la tablet, el pedido por mayor, los 12 "Pedido pagado ✓", el panel del cierre, la línea chica. Se
tiene que entender sin sonido.
