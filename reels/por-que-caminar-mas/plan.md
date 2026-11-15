# Plan de escenas · por-que-caminar-mas (explicador "¿Por qué…?", ~34 s, 3D real)

"¿Por qué un aeropuerto de Houston hizo caminar más a la gente?" sobre **Rubén caminando con su mate por un pasillo de
aeropuerto que no se termina** (cuadro 0 = escena en curso). Desenlace en la frase 2: "Seis veces más. Las quejas casi
desaparecieron." Bisagra: "¿Por qué?" ("?" verde). **Dato que da vuelta la idea (s04):** esperaban ocho minutos, uno
caminando y siete mirando la cinta. **Giro (s05):** en vez de acelerar, alejaron las puertas. **La explicación
(s06-s08):** Maister, 1985: la espera vacía se siente más larga, y la que no sabés cuánto dura, más todavía.
**Puente a la pyme (s09-s10):** Rubén al teléfono, "Sale hoy. Te lo dije hace una hora."; la cinta vuelve con cajas de
la distribuidora y Graciela frente a ella, sin noticias. **Solución (s11):** los avisos automáticos caen solos en su
celular. **Remate (s12):** "Nadie llamó. ¿Se cortó el teléfono?". Cierre: videollamada.

- **Producto: AUTOMATIZACIÓN** (aviso automático del estado del pedido por WhatsApp: Preparando, Sale hoy 14:00, En
  camino, Entregado). Nunca "bot", nunca "agente de IA". Sin cifras de resultado.
- **Datos:** solo los de `fuentes.md`. En la voz: "Houston", "seis veces más", "casi desaparecieron", "ocho minutos",
  "uno caminando y siete mirando la cinta", "1985". En pantalla, como mucho: "× 6", "casi 0", "8 min", "1 + 7",
  "88 % parados", "ya era lo normal", créditos "The New York Times · 2012" y "David Maister · Harvard · 1985".
  **Nunca**: nombre del aeropuerto, año del caso, "6 min caminando / 2 min esperando", "misma espera total", resultados
  del producto.
- **Nada de marcas**: aeropuerto, cinta, valijas, teléfono y chat genéricos; ni aerolíneas, ni logos, ni colores de
  aeropuerto; el NYT y Maister solo en texto mono chico; no se dibuja a Maister.
- **Rubén** = `ELENCO.ruben` de `reels/abren-hoy/assets/personajes.js` (camisa navy arremangada, sin delantal;
  `crearMate`/`crearTermo`). **Graciela** = `ELENCO.clienta` (acá, dueña de una rotisería que le compra a Rubén).
  Oficina vidriada y depósito: **reusar los de `reels/por-que-el-99`** (misma distribuidora en el feed).
- **Voces:** Orus 82 palabras + Rubén (Algenib) 14 palabras en dos líneas = 96. Ver tabla de voces abajo.
- **Base técnica:** `reels/por-que-te-llaman` y `reels/por-que-el-99` (tres.js con `renderAt(t)` puro, cámara
  Catmull-Rom, PMREM, "?" verde, gen.mjs, firma.json, partes/armar-voz.mjs); utilitarios de
  `reels/anotamelo/assets/personajes.js` (crearCelular, crearReloj). Ejemplar de vara: `reels/abren-hoy-completo`.

## Fondo y paleta (anotar en "Hechos")
**Crema `#efeee5` liso** (sin degradé: sobrevive a la compresión), objetos navy `#0b1220` / navy claro `#16243d`,
verde `#5ce611` y blanco; piso crema un tono más oscuro (`#e2e0d4`) con sombra suave al 30 %. **Rojo apagado `#c7655b`
SOLO para el problema** (globos de queja, los 7 bloques "mirando la cinta", los "?" del reloj sin números, el pedido sin
noticias). Lo resuelto en verde (tildes, el "× 6", la flecha de "Valijas", los avisos). **Cierre en verde de marca**
con letras navy. Oficina de Rubén: la de por-que-el-99 (sus paredes navy funcionan como contraste sobre el reel crema).
Últimos explicadores: por-que-te-llaman navy claro con reloj de piso, por-que-el-99 navy3 con planilla de piso,
por-que-sacar-numero crema liso (13-11). Combinación nueva: **crema liso + aeropuerto low-poly navy/blanco + cinta de
valijas + oficina de Rubén + cierre verde**.
- Texto sobre crema: subtítulos arriba al centro, 1-3 palabras, 86 px, Lexend 800 **navy `#0b1220`** (no crema: no se
  leería), palabra clave en recuadro verde con texto navy. Rótulos: placa navy con texto crema y borde verde, línea
  guía navy de 7 px, ≥ 36 px. Créditos: mono navy 34-38 px. Logo navy; `firma.json` lo esconde en primeros planos.
- Números 3D (TextGeometry Lexend 800): "× 6" verde (s02), "casi 0" navy (s02), "8 min" navy (s04). Arriba y limpios,
  nunca dentro de una cabeza.
- Valijas: rígidas con esquinas redondeadas (RoundedBox), manija telescópica y rueditas; colores verde, navy, blanco y
  crema oscuro; una con cinta verde atada a la manija (la "de Rubén"). Cinta: carrusel ovalado de tablillas metálicas
  gris claro que se superponen, borde navy, boca con cortina de tiras negras. Que nadie la confunda con otra cosa.

## Escenas (palabra de inicio sobre el guion limpio de 96 palabras; tiempos estimados a 0,34 s/palabra + pausas)
| # | id | palabra | arranca | dura | frase |
|---|----|---------|---------|------|-------|
| 1 | s01-gancho | 0 | 0,0 | 4,4 | ¿Por qué un aeropuerto de Houston hizo caminar más a la gente? (+0,3 s) |
| 2 | s02-seis-veces | 12 | 4,4 | 2,7 | Seis veces más. Las quejas casi desaparecieron. (+0,3 s) |
| 3 | s03-por-que | 19 | 7,1 | 0,9-1,7 | ¿Por qué? (+0,3 s antes y después; estirar a ≥ 1,5 s con la pausa) |
| 4 | s04-ocho-minutos | 21 | 8,0 | 3,6 | Esperaban ocho minutos: uno caminando y siete mirando la cinta. |
| 5 | s05-alejaron | 31 | 11,6 | 2,0 | Entonces alejaron las puertas de llegada. |
| 6 | s06-maister | 37 | 13,6 | 2,0 | Lo explicó un profesor en 1985: |
| 7 | s07-espera-vacia | 43 | 15,6 | 2,4 | la espera vacía se siente más larga. |
| 8 | s08-no-sabes | 50 | 18,0 | 2,7 | La que no sabés cuánto dura, más todavía. (+0,45 s) |
| 9 | s09-ruben-tel | 58 | 20,7 | 3,1 | (Rubén) Sale hoy. Te lo dije hace una hora. (+0,4 s) |
| 10 | s10-frente-cinta | 66 | 23,8 | 3,1 | Tu cliente sin noticias está frente a la cinta. |
| 11 | s11-avisos | 75 | 26,9 | 2,8 | Una automatización le avisa sola cada paso. (+0,45 s) |
| 12 | s12-ruben-nadie | 82 | 29,7 | 2,4 | (Rubén) Nadie llamó. ¿Se cortó el teléfono? (+0,3 s) |
| 13 | s13-cierre | 88 | 32,1 | 3,1 | ¿Lo armamos? Agendá una videollamada gratis en scalerics.com. |

Total ~35 s con pausas. Si queda largo: recortar pausas antes que palabras; después, sacar "¿Lo armamos?" (−2 palabras).
s01 dura más de 3 s: el pasillo se estira y el cartel "Valijas" se aleja a la mitad (algo cambia cada 1,5-2,5 s). s04
también: la barra se llena en dos tiempos ("uno caminando" → 1 verde; "siete mirando" → 7 rojos de golpe).
La tarjeta de cierre arranca en "videollamada" (palabra 92, ~33,5 s) y dura 2,5-3 s.

`reel.json` sugerido (el constructor lo ajusta con los tiempos reales):
```
"escenas": [["s01-gancho",0],["s02-seis-veces",12],["s03-por-que",19],["s04-ocho-minutos",21],["s05-alejaron",31],
 ["s06-maister",37],["s07-espera-vacia",43],["s08-no-sabes",50],["s09-ruben-tel",58],["s10-frente-cinta",66],
 ["s11-avisos",75],["s12-ruben-nadie",82],["s13-cierre",88]]
"acento" (palabras clave): Houston 5, caminar 7, más 8, "Seis veces" 12-13, desaparecieron 18, "ocho minutos" 22-23,
 uno 24, siete 27, cinta 30, alejaron 32, puertas 34, 1985 42, vacía 45, larga 49, sabés 53, todavía 57, "una hora" 64-65,
 noticias 69, cinta 74, automatización 76, sola 79, Nadie 82, cortó 85, videollamada 92, scalerics.com 95
"texto": {"42": "1985"}
```
(13 escenas: una más que el tope de 12 del CLAUDE.md, igual que por-que-te-llaman con 14; s03 es la bisagra corta. Si se
quiere 12, unir s07 y s08 en una sola escena de ~5 s donde el reloj de arena se transforma en el reloj de "?".)

## Cámara continua (Catmull-Rom, una sola curva salvo el corte a la oficina y el cierre)
Pasillo (s01, travelling hacia atrás frente a Rubén) → la cámara sube y el pasillo se estira en seis tramos (s02) → baja
en picado sobre la cinta, donde cae el "?" (s03) → órbita corta a la cinta con Rubén parado (s04) → grúa arriba a la
maqueta cenital (s05) → la maqueta se pliega en el libro, push-in a la página (s06) → del libro sube el reloj de arena
(s07) → el reloj de arena gira y es el reloj de "?" (s08) → **corte seco** a la oficina de Rubén (s09, el único corte:
cambia el mundo) → la pila de llamadas del monitor se vuelve la cinta con cajas, travelling lateral hasta Graciela (s10)
→ push-in al celular de Graciela que llena la pantalla (s11) → corte a Rubén de frente, plano medio (s12) → cierre verde
(s13). En cada transición hay un objeto grande en cuadro; nunca la pantalla lisa ni la escena chiquita en el medio.

## Brief por escena (objeto 3D protagonista, cámara, rótulos, SFX)

**s01-gancho (0-4,4).** Portada en movimiento. **Rubén** de cuerpo entero (55-65 % del alto) camina hacia cámara por
un **pasillo de aeropuerto** low-poly: piso crema con juntas navy finas (6 px), paredes navy claro, ventanales blancos
a un lado, columnas, y colgado del techo un **cartel "Valijas →"** (placa navy, letras crema ≥ 44 px, flecha verde) que
retrocede a la par de Rubén y nunca se acerca. Mate en la mano derecha, termo bajo el brazo izquierdo, cara resignada
(cejas caídas, boca de lado), el mate nunca toca la cara. A la mitad (~2,2 s), el pasillo se estira (el fondo se aleja
con un leve zoom de vértigo). Gancho entero desde el cuadro 0, tercio de arriba (Lexend 900, 120-140 px, navy):
"¿Por qué los hicieron" / "caminar **más**?" ("más" en recuadro verde) + mono navy 38 px "Un aeropuerto de Houston".
Subtítulos karaoke recién después del gancho. SFX: ambiente de aeropuerto muy bajo (murmullo, sin anuncios con
nombres), pasos rítmicos (`tac-real` suave a cada paso), `whoosh` en el estirón.

**s02-seis-veces (4,4-7,1).** La cámara sube: el pasillo visto desde arriba en diagonal, partido en **seis tramos**
iguales marcados con franjas verdes en el piso; el primero con rótulo "1 min" y en "Seis veces" el "× 6" 3D verde cae
arriba con pop. En "quejas", de las paredes salen 5-6 **globos de queja** 3D rojo apagado con "!" crema; en
"desaparecieron" se desinflan (escala a 0 con temblor) y caen al piso; un **contador 3D** navy "quejas" baja hasta
"casi 0". Rótulo: "las quejas: casi a cero". SFX: `pop` del "× 6", soplidos de globo desinflándose (o `whoosh-short`
invertido), `ding` seco en "casi 0".

**s03-por-que (7,1-8,0+).** Bisagra: un **"?" verde 3D grande y centrado** (dentro del 80 % seguro) cae y rebota en el
centro de la **cinta de valijas**, que todavía está quieta abajo. Un solo objeto. Cámara: picado que baja con el "?".
SFX: `pop` grave + `whoosh-short`.

**s04-ocho-minutos (8,0-11,6).** Flashback (saturación algo más baja, sin cambiar a gris todo: el rojo tiene que
leerse). La **cinta de valijas** (70 % del ancho) gira, vacía, la boca con cortina de tiras se mueve sin que salga nada.
**Rubén parado** frente a ella, golpeando el pie, mate en la mano (vapor apagado). Arriba, "**8 min**" 3D navy; debajo,
**barra 3D de 8 bloques**: en "uno caminando" se prende 1 verde ("caminando"); en "siete mirando" se prenden de golpe
7 rojo apagado ("mirando la cinta"). Rótulo con línea guía a la barra: "88 % del tiempo, parados" o "ya era lo normal".
Crédito mono chico abajo: "The New York Times · 2012". Al final sale por fin una valija (la verde con cinta). Cámara:
órbita corta de 20° alrededor de la cinta. SFX: zumbido/traqueteo de cinta (CC0), `tac` en el bloque verde, `golpe`
sordo con los 7 rojos, `golpe` de valija cayendo a la cinta.

**s05-alejaron (11,6-13,6).** Grúa arriba hasta una **maqueta cenital** del aeropuerto (terminal blanca, pistas navy,
cinta chiquita): en "alejaron" el bloque de las **puertas de llegada** (con mangas de embarque) se desliza lejos de la
terminal y el pasillo se estira detrás como una cinta métrica; las valijas saltan a la cinta más lejana. Una flecha
verde recorre el camino nuevo. Rótulo: "puertas más lejos". El objeto llena el cuadro (maqueta al 80 % del ancho, nada
de una islita en el medio). SFX: `whoosh-cinematic` de la grúa, roce de deslizamiento, `pop` de cada valija.

**s06-maister (13,6-15,6).** La maqueta se pliega como un pop-up en un **libro grande** de tapa navy (70 % del ancho),
que se abre hacia cámara; las páginas pasan solas y se frena en una página crema con un dibujo de una fila de gente.
Crédito mono navy 38 px: "David Maister · Harvard · 1985" y "1985" 3D navy arriba (en la palabra 42). Cámara: push-in a
la página. SFX: `papel` (paso de páginas), `pop` del año.

**s07-espera-vacia (15,6-18,0).** De la página se levanta un **reloj de arena gigante** (75 % del alto de la zona de
dibujo): marco navy con columnas torneadas, vidrio con borde blanco marcado, arena crema-oscuro cayendo lentísimo en
un hilo; al lado, un **banquito de espera vacío** (de aeropuerto, tres asientos navy) con sombra. En "vacía" un rótulo:
"espera vacía"; en "más larga" el reloj de arena se estira hacia arriba (sube un 20 %). Cámara: contrapicado leve,
push-in. SFX: arena cayendo (CC0) muy bajo, `whoosh-short` en el estirón.

**s08-no-sabes (18,0-20,7).** El reloj de arena gira 180° y en el giro se transforma en un **reloj de pared** grande
(80 % del ancho), aro navy, esfera crema **sin números**: en el lugar de cada hora, un "?" rojo apagado; las agujas giran
sin parar (cada vez más rápido). Rótulo: "sin saber cuánto falta". Cámara: push-in leve, el reloj tiembla un poco al
final. SFX: `tic-real` acelerado, cortado seco al pasar a la oficina.

**s09-ruben-tel (20,7-23,8).** **Corte** a la **oficina vidriada de Rubén** (la de por-que-el-99: depósito con racks y
pallets detrás del vidrio, escritorio de madera clara, monitor grande). Rubén sentado, plano medio de frente, el **tubo
del teléfono fijo** en la oreja (el cable enrulado navy, el tubo NO atraviesa la cara ni el bigote) y el mate en la otra
mano. En el monitor (≥ 40 px) se apilan tarjetas de llamada "**¿Y mi pedido?**" con nombres de comercios inventados
(Rotisería Graciela, Panadería del Cerro, Kiosco 18); arriba, contador 3D navy "llamadas hoy" 12 → 13 → 14. Rubén dice
la línea con cara de póker; en "una hora" cierra los ojos un instante (parpadeo, no párpados bulto). SFX: `ring` corto
al arrancar, ambiente de depósito (zorra, cajas), `pop` en cada tarjeta.

**s10-frente-cinta (23,8-26,9).** La pila de tarjetas del monitor se desliza fuera de la pantalla y **se vuelve la
cinta de valijas** del aeropuerto, ahora con **cajas kraft `#c9a46b`** con cinta navy y etiqueta "Distribuidora"
(genérica) en vez de valijas, girando en un galpón crema. Frente a la cinta, **Graciela** (`ELENCO.clienta`) parada con
su celular en la mano, mira la boca de la cinta: no sale nada. Rótulo con línea guía al celular: "Pedido #418 · ¿?" en
rojo apagado. Callback directo a s04 (misma cinta, mismo encuadre de órbita, ahora con cajas). Cámara: travelling
lateral de la cinta hasta Graciela. SFX: traqueteo de cinta (el mismo de s04), `whoosh` de la transformación.

**s11-avisos (26,9-29,7).** Push-in al **celular de Graciela**, que crece hasta llenar el 80 % de la pantalla (chat
genérico, sin logo ni verde de WhatsApp; burbujas blancas con borde navy, texto ≥ 40 px). Caen solos, uno cada ~0,6 s:
"**Preparando ✓**", "**Sale hoy 14:00 ✓**", "**En camino**" (detrás del celular cruza el **camión navy de la
distribuidora**, de izquierda a derecha, con rueditas que giran) y "**Entregado ✓**". Al costado, la cinta avanza y
cada caja se pone una tilde verde. Rótulo chico: "aviso automático". SFX: `notification` por mensaje, motor de camión
corto (CC0) en "En camino", `chime` en "Entregado".

**s12-ruben-nadie (29,7-32,1).** Oficina, Rubén de frente, plano medio: toma mate tranquilo, el teléfono fijo quieto
sobre el escritorio, el contador "llamadas hoy" en "0" (verde). **Pausa de 0,5 s** (timing de comedia), levanta el tubo,
lo mira con sospecha y lo golpea dos veces con el dedo. "Nadie llamó." neutro; "¿Se cortó el teléfono?" con sospecha
genuina. SFX: silencio de la música 0,3 s antes del remate, `tac` del dedo en el tubo, tono de línea corto.

**s13-cierre (32,1-35,2).** "¿Lo armamos?" sobre Rubén que deja el tubo y sonríe de costado; sobre "videollamada" entra
la **tarjeta de cierre en fondo verde `#5ce611`** (2,5-3 s): "Videollamada gratis" (Lexend 900, navy, 110-130 px) y abajo
"scalerics.com" (grande, navy sobre placa crema, o crema con borde navy: que se lea fuerte sobre el verde), logo navy.
SFX: `whoosh` de entrada, `chime` final, la música cierra.

## Voces
Gemini TTS (`herramientas/voz.mjs`), una toma por archivo, recortar silencios con `silenceremove` y pegar con
`partes/armar-voz.mjs` (copiar el de `reels/por-que-te-llaman/partes/`). Armar `partes/guion-voz.txt` limpio (sin
corchetes ni prefijos) para `tiempos.mjs`.

| archivo | quién | voz | texto | tono |
|---|---|---|---|---|
| `orus1.txt` | Narrador | **Orus** | frases 1-8 (gancho → "…más todavía.") | Narrador de los explicadores, uruguayo, curioso, con ritmo, sin vender. El gancho con incredulidad divertida ("¿caminar MÁS?"). "Seis veces más." seco; "Las quejas casi desaparecieron." con sorpresa contenida. "¿Por qué?" corto, con intriga. "siete mirando la cinta" con un mini peso en "siete". "Entonces alejaron las puertas de llegada." como quien cuenta el truco. "1985" = "mil novecientos ochenta y cinco". "vacía" y "más todavía" marcados. "Houston" = "Jiúston". |
| `ruben1.txt` | Rubén | **Algenib** | "Sale hoy. Te lo dije hace una hora." | Dueño de distribuidora, grave, cansado, uruguayo, picante seco. Paciencia de santo agotada: "Sale hoy." plano; "Te lo dije hace una hora." más lento, sin gritar. ~2,3 s. |
| `orus2.txt` | Narrador | **Orus** | "Tu cliente sin noticias…" → "…cada paso." | Igual que orus1, como respuesta a Rubén; "sola" y "cada paso" claros y contentos. |
| `ruben2.txt` | Rubén | **Algenib** | "Nadie llamó. ¿Se cortó el teléfono?" | Primero satisfecho y raro ("Nadie llamó." casi desconfiado), después sospecha genuina. ~2 s. |
| `orus3.txt` | Narrador | **Orus** | "¿Lo armamos? Agendá una videollamada gratis en scalerics.com." | De colega, sin urgencia. "scalerics.com" escrito "Scálerics punto com" en el .txt. |

Pausas: +0,3 s después del gancho; +0,3 s antes y después de "¿Por qué?"; 0,45 s antes de cada línea de Rubén y 0,4 s
después; antes de ruben2, 0,5 s de silencio (la música se corta seca: timing de comedia).
Si "Houston" sale en inglés raro o "1985" en cifra, regenerar SOLO esa frase y pegarla. Terminar cada .txt con una
palabra descartable ("Listo.") para que Gemini no corte la última.

## SFX
Ver `fuentes.md`. Los que falten (cinta transportadora, arena, motor de camión, globo desinflándose): uno real CC0 y
anotarlo; si freesound da 403, los del repo (`whoosh`, `whoosh-short`, `whoosh-cinematic`, `pop`, `tac-real`, `golpe`,
`papel`, `tic-real`, `ring`, `notification`, `chime`, `ding`) y anotarlo. Nunca sintetizados con ffmpeg. Techo -31 LUFS
por efecto, voz ≥ 6 LU sobre el resto.
