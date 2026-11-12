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
