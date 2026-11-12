# como-viene-el-mes · notas del constructor (12-11)

Proyecto como anotamelo: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). `LIMPIO=1 SINAUDIO=1 node gen.mjs` = fondo de portada (después volver a correr `node gen.mjs`).
`MEDIR=1 node gen.mjs` escribe los stems voz / resto (assets/audio/stem-*.wav). `SINAUDIO=1` no rehace la mezcla.
La escena 3D entera está en `assets/tres.js` (los objetos nuevos están ahí, no en personajes.js: el módulo de
personajes es la copia tal cual de anotamelo). Se borró el armar.mjs del molde (no se usa) y bgm/bed.mp3.

**Duración: 33,79 s** (parte 1 0-18,05 · cartel 18,05-21,05 · parte 2 21,05-33,79; línea chica desde 31,79, 2,0 s).
Más largo que los 31,8 del plan: la voz de Rubén "Ocho por ciento…" quedó en 3,42 s con atempo 1,1, y la línea chica
pasó a 2 s porque `check` pide ~2 s para una línea de cierre. Si hay que recortar: Q2c (la grúa a la yerba, 25,6-27,6)
o 0,3 s de P4.

## Voces (assets/voice, recortadas con silenceremove; tomas en partes/tomas, recortes en partes/rec, "oyó:" en partes/oyo)
| archivo | toma | largo | oyó |
|---|---|---|---|
| m1 "¿Y, cómo viene el mes?" (Aoede) | 01-marta-b | 1,43 | "Y cómo viene el mes" (se reusa igual en Q1) |
| r1 "Pará que te digo." (Algenib) | 02-ruben-b | 0,82 | "para que te digo" |
| r2 "Ahí." (Algenib) | 03-ruben-a (+adeclip, -1,5 dB) | 0,47 | "ahí" (las tomas b/c, más secas, no las reconocía STT) |
| m2 "¿Y comparado con el mes pasado?" | 04-marta-a | 1,52 | "Comparado con el mes pasado" (la "Y" se pega) |
| m3 "Pongo otro café." | 05-marta-b | 1,12 | "pongo otro café" (la a decía "pase") |
| narrador "Un sistema más tarde." | reusado de anotamelo | 2,26 | — |
| r3 "Ocho por ciento arriba…/Lo que más salió fue la yerba." | 07-ruben-a, atempo 1,1, adeclip | 3,42 | "8% arriba del mes pasado lo que más salió fue la hierba" (homófono) |
| r4 "¿Y a vos?" | 08-ruben-e (5.ª toma, tono con la ese de "vos") | 0,51 | "Y a vos" (las anteriores: "Yahoo", "ius") |
| m4 "Pará que te digo." (Aoede) | 09-marta-a | 0,88 | "para que te digo" |
La cuota de Gemini TTS por minuto cortó varias tomas en paralelo: se regeneraron en serie con pausas.

## Planos (segundos globales)
| plano | desde | qué |
|---|---|---|
| P1 | 0,00 | desde atrás del mostrador (a la derecha de Rubén, que queda fuera de cuadro) hacia la persiana: Marta bajo la persiana con el cortado humeante, la caja TICKETS en primer término; gancho-burbuja HTML "¿Y, cómo viene el **mes?**" 0-1,95; Marta se endereza (0,2-0,6), camina al mostrador (0,6-1,4) y apoya el pocillo 1 (1,5) |
| P2 | 2,00 | Rubén de frente (lado del cliente): "Pará que te digo." 2,10 (se arremanga), abre la caja 3,00 (11 tickets saltan y caen en la madera), arrastra la calculadora con rollo 3,12-3,42 |
| P3 | 3,55 | la noche: grúa + órbita continua (Catmull-Rom) hasta el general alto; teclea a 9 teclas/s, la cinta cae por el frente y la montaña crece (210 rulos); el pinche se pela y la caja se vacía; Marta va y viene: torre 2 (4,65) → 4 (5,95/6,10) → 7 (7,20/7,32/7,44); se sienta en el cajón 7,55-7,90 |
| P4 | 8,75 | al ras del piso junto a la persiana: la franja de abajo pasa a crema cálido (8,80-9,05) y la mano del panadero (antebrazo con manga navy2) empuja la bolsa con tres flautas (9,00-9,45), se va 9,50-9,70 |
| P4b | 9,75 | inserto de la calculadora desde arriba: TOTAL 9,88 ("412.300"), imprime, arranca la cinta 10,10 |
| P5 | 10,30 | Rubén de frente por arriba de la montaña, la cinta arrancada en las dos manos a la altura del pecho: la lee (10,35-11,20) |
| P5b | 11,25 | contraplano alto por el costado izquierdo de Rubén: Marta sentada se inclina, pocillo a medio camino |
| P5c | 11,85 | Rubén de frente: quietud (música -12 dB en 0,4 s, solo la heladera), levanta la vista 11,95-12,25; "Ahí." 12,50 (caja navy HTML con "Ahí." en el recuadro verde, 210 px) + mano derecha abierta al costado que se balancea (12,45-13,25) |
| P6 | 13,40 | contraplano de Marta: "¿Y comparado con el mes pasado?" 13,50 |
| P6x | 14,95 | Rubén de frente/alto: baja entero detrás del mostrador (15,10-15,32), sube con la caja MES PASADO y la apoya de golpe 15,50 (la torre se sacude; el pinche pelado se corre atrás) |
| P6b | 15,80 | inserto de la calculadora: C 15,95 → "0." |
| P6c | 16,25 | general desde el lado del cliente (derecha): Marta se levanta, agarra la torre entera (16,60): "Pongo otro café." 16,62; sale por la persiana (17,10-17,95); Rubén vuelve a teclear 17,35 |
| cartel | 18,05 | "Un sistema / más tarde…" (el de anotamelo, voz Rasalgethi reusada) con iris de entrada a la parte 2 |
| Q1 | 21,05 | el encuadre de P1: Marta entra con la torre de 7 en la bandeja (a su derecha) y el cajón colgando del antebrazo izquierdo: "¿Y, cómo viene el mes?" 21,25 (misma toma); deja el cajón 22,50 |
| Q2 | 22,75 | vibra el celular en el atril (22,80) y push-in: "Resumen del mes · 21:00", Hoy $ 18.450 (23,00), Mes $ 412.300 (23,20), +8 % (23,40), Lo que más salió: Yerba (23,60) |
| Q2b | 23,95 | Rubén de frente con el mate: "Ocho por ciento arriba del mes pasado." 24,05 |
| Q2c | 25,60 | grúa a la fila de yerba del estante: "Lo que más salió fue la yerba." (globo abajo); pop + tilde verde 27,05 |
| Q3 | 27,62 | contraplano a Marta por la izquierda de Rubén (el mate en primer término): mira la torre, la bandeja tiembla 27,92 |
| Q3b | 28,42 | Rubén: "¿Y a vos?" 28,52 |
| Q3c | 29,13 | Marta se congela (música -8 dB, no se corta) |
| Q4 | 29,68 | Marta, seria: "Pará que te digo." 29,73 |
| Q4b | 30,69 | general (el de P6c): apoya la bandeja, saca la caja CAFETERÍA del cajón y la pone en el mostrador (30,74-31,14), la abre 31,29 (los tickets saltan); Rubén saca un pocillo de la torre (31,19) y se sienta en el banquito con el mate y el pocillo (31,54-31,94); línea chica arriba desde 31,79 |

## Objetos nuevos (en assets/tres.js)
crearLamparaBanquero (pantalla semicilíndrica verde de marca emissive, charco de luz plano de borde duro, PointLight
chico sin sombra) · crearCalculadoraRollo (cuña crema extruida ×1,3, 17 teclas con etiqueta propia, "+" y "TOTAL"
crema, "C" rojo apagado, LCD gris verdoso con mono navy, brazo de metal con el rollo, filo; setPantalla, tecla(),
hundir()) · crearTira (cinta de papel por una curva, textura de números mono; la que cae y la que lee Rubén, con letra
más grande) · la montaña (210 rulos abiertos con semilla en un cono delante del mostrador, z ≥ frente + 9 cm: nunca
atraviesa el mostrador) · crearCajaZapatos (kraft, tapa de solapa con canto navy3, "N° 42" + zapato de línea, cinta con
la palabra en Caveat arriba/adelante/atrás, tickets térmicos enrulados; variantes MES PASADO gorda con piolín rojo
apagado y CAFETERÍA con pocillo dibujado) · tickets que saltan (crearSalto/ponerSalto, con semilla) · crearPinche ·
crearPocillo / crearTorre (se inclina desde el 4.º, se balancea al sumar) · bandeja navy3 con filete verde · crearCajon
(plástico navy3 con agujeros) · bolsa del pan (crearBolsaPapel ×1,3 + 3 crearPanFlauta) y la mano del panadero ·
persiana (lamas crema con canal navy cada 11 cm, perfil y guías navy3, cajón; la franja de abajo navy → crema cálido) ·
celular en atril con el resumen (canvas 600×1200, letra 46-120) · tilde verde de la yerba.

## Pasadas de revisión (snapshots; hojas en el scratchpad)
- Armado: `x.add(mesh).rotation = …` rotaba al PADRE (la calculadora quedaba parada de canto, la caja gorda girada, la
  mano del panadero, la bandeja): helper `rot()`. Cámaras de P1/P3/P4/P5b/P6 rehechas varias veces: en vertical Marta y
  Rubén no entran lado a lado, así que P1 es desde atrás del mostrador (Rubén fuera de cuadro: solo asomaba una mano,
  se oculta en P1/Q1) y P6 es plano/contraplano (Marta pregunta → Rubén baja y sube con la caja → inserto C → general).
- Pasada 1 (cada 0,5 s, 0-33,4): la torre tapaba la cara de Marta en P5b (cámara corrida a la izquierda de Rubén, alta);
  la cabeza de Rubén en primer plano en P1/P5b (cámaras movidas); la cinta y los números se veían espejados (lado de
  la tira invertido); la tapa abierta de TICKETS tapaba la mano del "más o menos" (la caja vacía se cierra al final de
  la noche); la etiqueta de la tapa al revés; MES PASADO tapada detrás de TICKETS (va a la derecha de la calculadora,
  el pinche se corre); Q4b pasaba por adentro de Marta (ahora corte seco al general); P4 sin persiana en cuadro.
- Pasada 2 (cada 0,5 s): P6x con Rubén cortado en el borde y la caja chica (reencuadre); Q3/Q4 la bandeja tapaba la
  boca de Marta (la bandeja va a su derecha y baja; cámara por la izquierda de Rubén, el mate en primer término); Q2b
  el atril tapaba el mate (atril a la derecha, girado); el cierre: Rubén escondido detrás de Marta (general desde la
  derecha del lado del cliente: Marta a la izquierda, la caja CAFETERÍA abierta en el medio, Rubén sentado con el mate).
- `check` final: 0 errores (warnings: GL "ReadPixels" de SwiftShader, dead_stretch del
  HTML que no aplica al canvas 3D, canvas en el borde, "más tarde…" del cartel 1,76 s: igual que anotamelo).

## Mezcla (MEDIR=1; momentánea por tramos de 0,5 s, medida con partes/medir-voz.py, desde la carpeta del reel: ebur128 de stem-voz vs stem-resto)
Final -14,0 LUFS integrado, pico -4,9 dBFS, sin clipping (antes del loudnorm del paso 10). Voz sobre música+SFX en cada
tramo con voz: mínimo +8,0 LU (27,5-28,0 s: la cola de "yerba." con el whoosh y el clink de la bandeja), típico +15 a
+28 LU; en "Ahí." +28,6 LU (la música baja 12 dB en 0,4 s y vuelve, nunca se corta). Techo por efecto -31 (TECHO); cada
SFX con su techo más bajo (-37 a -50). Música: pizzicato toda la parte 1 (en el time-lapse el mismo tema atempo 1,2,
con fundidos de 0,15-0,3 s en los empalmes) y la parte 2; duck de -6 dB debajo de cada voz.

## Dudoso / para los revisores
- Rubén no se ve en el cuadro 0 (P1 es desde atrás del mostrador hacia Marta y la persiana): se ve desde 2,0 s. En
  vertical no entraban los dos con la caja en primer término sin que su cabeza tapara medio cuadro.
- La bolsa del pan es chica en P4 y las flautas se leen como palitos dorados; la mano del panadero queda casi tapada
  por la bolsa (se ve la manga navy).
- En el time-lapse (8,0-8,5) Marta sentada queda en el borde izquierdo, medio tapada por la montaña; sentada se ve
  bien en P5b y P6.
- El "más o menos" es un vaivén vertical de la mano abierta (el módulo no rota la palma).
- No hay sonido CC0 real de impresora de calculadora ni de papel que se rasga (ver fuentes.md): teclas reales +
  papel real.
- Q3/Q4: por encima del hombro de Rubén, su oreja y su cabeza ocupan el borde derecho (es el OTS del plan, con el mate
  en primer término).
- Portada: `portada.json` con t 12,4 (Rubén de frente con la cinta en las manos, sin "Ahí."); fondo limpio en
  `portada-src/fondo-limpio-12.4.png` (también `fondo-limpio-8.3.png`: la montaña, la torre y Marta sentada). Falta
  correr `node herramientas/portada.mjs como-viene-el-mes` (con candado) después del render.

## Ronda 1 de correcciones (12-11) · ahora 35,53 s (parte 1 0-19,12 · cartel 19,12-21,82 · parte 2 21,82-35,53; línea chica desde 33,53, 2 s)
Más larga que antes (+1,7 s) por lo que pidieron los revisores: la quietud antes de "Ahí." (+0,45), la cara de nada antes
de agacharse (+0,3), el primer plano de MES PASADO (1,1 s), el resumen del celular sostenido ~2 s. Se compensó con el
time-lapse (5,2 → 4,4 s), el cartel (3,0 → 2,7 s) y la grúa a la yerba (Q2c: corte directo, 1,1 s; "Ocho por ciento…"
arranca en off sobre el celular).

Planos nuevos (s): P1 0 · P2 2,00 · P3 3,55 (general alto desde la derecha: Rubén entero) · P3t1 5,45 (inserto de la torre
de costado: 3 → 4) · P3w 5,95 · P3t2 6,45 (4 → 7) · P3w2 7,05 · P4 7,95 (la franja ya encendida; "¡Buen día, Rubén!" 8,10) ·
P4b 8,95 (TOTAL 9,08, rasgado 9,30) · P5 9,50 (por arriba de la montaña) · P5b 10,45 · P5c 11,05 (quietud 11,05-12,15,
"Ahí." 12,15, palma 12,10-12,95) · P6 13,10 ("¿Y comparado…?" 13,20) · P6x 14,80 (cara de nada; baja 15,12; golpe 15,52) ·
P6m 15,72 (MES PASADO de frente 1,1 s) · P6b 16,82 (C 17,00) · P6c 17,32 ("Pongo otro café." 17,72) · cartel 19,12 · Q1 21,82
(apoya la bandeja 23,54) · Q2 23,77 (celular; filas 24,07-24,67; voz en off 25,17) · Q2b 26,22 · Q2c 27,62 (tilde 28,17) ·
Q3 28,71 · Q3b 29,51 · Q3c 30,22 · Q4 30,77 · Q4b 31,78 (caja CAFETERÍA; Rubén se corre y saca un pocillo 32,28) · Q5 32,93
(general desde atrás del mostrador: Marta suma con su caja, Rubén se sienta en el cajón con el mate y el pocillo; sorbo
33,93) · línea chica 33,53.

Lo corregido, por punto de la lista:
1-2. El mate se agarra por el costado (la mano afuera, el mate 8 cm hacia adentro y 14 cm abajo). La bandeja va al
   mostrador en Q1 (BANDEJA_M, a la izquierda de Marta); en Q3/Q4 está apoyada al costado, nunca delante de la cara; Marta
   le da un toquecito (la torre tiembla). Bug: se habían comentado los codos de Marta en la parte 2 (arreglado).
3. P4: la franja ya encendida al entrar (la mañana arranca en 7,65, antes del corte), afuera cielo de madrugada navy claro
   (no una pared crema), la vereda y la franja sobre el piso en crema; bolsa de papel más alta con la boca arrugada y las
   tres flautas adentro; la mano del panadero empuja por el costado que da a la cámara (manga + mano); burbuja "¡Buen día,
   Rubén!" desde afuera.
4. P5/P5c por arriba de la montaña (en primer término, hasta el pecho); la cinta de las manos cae hasta la montaña (texto
   derecho: se arregló el UV que la mostraba espejada/al revés); la caja TICKETS queda abierta y vacía hasta el final; mano
   abierta nueva (palma + cuatro dedos + pulgar, solo en ese gesto) delante del pecho, palma abajo, dos vaivenes;
   quietud ~1,1 s con la música ya bajada.
5. "Pongo otro café." regenerada (Aoede, toma 05-marta-d, 1,07 s; STT: "pongo otro café"); burbuja fija arriba que sigue a
   Marta y se va con ella; el clink del plato 0,15 s antes; P6c con la cámara más baja (el rollo ya no tapa la boca).
6. La tapa de TICKETS no se cierra nunca; abierta se acuesta hacia atrás y sin la etiqueta de arriba (nunca al revés).
7. La C se aprieta con la punta del índice (IK nuevo `manoConPunta`, a la yema y no a la base del dedo); la C pasó a la
   columna derecha del teclado (del lado de la mano derecha de Rubén); se hunde 9 mm durante 0,25 s; la otra mano apoyada.
8. P6x: Rubén centrado, 0,32 s quieto con cara de nada después de "¿…el mes pasado?" antes de agacharse; la calculadora y
   el pinche se corrieron a la derecha (la caja MES PASADO cae delante de él).
9. MES PASADO: rótulo de frente en la cara larga, letras navy Caveat sobre papel crema (0,33 × 0,11 m), sin piolín ni
   tickets encima, y el plano P6m de 1,1 s con la caja de frente (el rótulo ocupa ~70 % del ancho) antes de la C.
10. Celular fino (×1,15) en un atril chico; entra llenando el ancho con la vibración; un solo "21:00" (en la cabecera); se
   sostiene ~2,4 s; "contra el mes pasado" 44 px en el lienzo (~55 px en pantalla); sin ícono; pulso verde en "Mes
   $ 412.300".
11. Final: en Q4b Rubén se corre detrás del mostrador y le saca un pocillo a la torre; Q5 (corte) desde atrás del
   mostrador: Marta de frente sumando con la caja CAFETERÍA abierta (las manos pasan los tickets), Rubén sentado en el
   cajón a su lado con el mate y el pocillo, un sorbo (sorbo.wav real).
12. Q2b sin la torre (la bandeja quedó a la izquierda, fuera de cuadro) ni el arco verde (era la bandeja sin Marta).
13. Time-lapse: general alto desde la derecha (Rubén entero), Marta a la izquierda de la torre (MC -0,55), pocillos más
   grandes (×1,6) y dos insertos de la torre de costado (de Marta entra solo la mano).
14. Cartel "Una / automatización / más tarde…" (Rasalgethi nueva, toma 06-narrador-e, 2,35 s, STT "una automatización más
   tarde"); la primera palabra visible desde el primer cuadro; texto más grande y centrado. Línea chica: "Una
   automatización te manda / al celular cómo viene el mes / scalerics.com". descripcion.txt actualizada.
15. P1: push-in menos cerrado y el encuadre corrido hacia Marta.
16. Globos al mismo tamaño (70-78); "Ocho por ciento…" en off abajo del celular y arriba en Q2b; "Lo que más salió…"
   nace arriba en Q2b y sigue en Q2c en el mismo lugar.
17. Rasgado real CC0 (Luckius, OpenGameArt) a -34. 18. El cajón y los pocillos de Q1 a -46/-48 y 0,05-0,1 s después.
19. Se levanta del cajón (roce + crujido), pop de la 4.ª fila, sorbo de mate real (Abir19, CC0), fundidos de la parte 1
   0,1-0,15 s más largos (sin hueco antes del whoosh del cartel). Marta ya no parpadea mientras habla.

Mezcla (MEDIR=1): -14,0 LUFS, pico -4,2 dBFS, voz ≥ 6 LU sobre el resto en todos los tramos con voz hablando (el único
tramo "<6", 23,5 s, es la cola de "¿…el mes?" con el vibrar del celular: no habla nadie).
20. Portada: `portada.png` armada con `herramientas/portada.mjs` desde un cuadro limpio (`portada-src/fondo-limpio-12.6.png`:
   Rubén con la cinta, la palma y la montaña; también `fondo-limpio-7.6.png`, el general de la noche). Sello "Fin de mes",
   "¿Y, cómo viene el mes?" / "Ahí." en verde; todo dentro del recorte 4:5.

Verificación ronda 1: dos pasadas de snapshots cada 0,5 s (0-17,5 y 18-35,5) después de los arreglos + puntuales en cada
punto. `check`: 0 errores (warnings: GL de SwiftShader, dead_stretch del HTML sobre el canvas, canvas en el borde,
"automatización"/"más tarde…" del cartel y la línea chica 1,9 s bajo el piso de lectura del check, como en anotamelo).
Dudoso: en P3t2 (6,45-7,05) la cabeza de Marta asoma grande en el borde izquierdo detrás de la torre; en P6x la torre
queda fuera de cuadro (la tapa abierta de TICKETS la tapa), el sacudón se ve en P6c; la bolsa del pan sigue leyéndose un
poco como caja; el tramo de 23,5 s mide voz -1,5 LU sobre el resto pero es solo la cola de "¿…el mes?" (nadie habla).
