# hacen-envios · PARA MANDAR completo (3D real), 34,47 s (ronda 1)

**De qué trata.** Héctor, el vecino de ENFRENTE, le escribe a Rubén "¿Hacen envíos?". Rubén cruza la calle con la
yerba, el pan, el hielo y el cambio (contador "Cruces" rojo, chip de hora 19:10 → 19:26 → 19:41). Al quinto mensaje
("¿Fósforos tenés?") se para en la línea del medio, silencio de domingo, da vuelta el cajón de verdulería, se sienta,
termo al costado, cartón "SUCURSAL" contra las piernas (en silencio: el cartón da la imagen) y, serio de empresario: **"Para estar más cerca del cliente."** (arma el eco de "¡Qué cerquita…!") Grúa: se prenden las 7 ventanas de la
cuadra, cada una con un vecino y un "¿Hacen envíos?", y el farol se prende sobre Rubén. Cartel "Una tienda online más
tarde…". Parte 2: Héctor arma el pedido en la tienda del almacén, duda sobre "Envío: $ 60", toca "Retiro en el local:
$ 0", "Pagado ✓"; cruza él en pantuflas; Rubén le da la bolsa "Héctor · pagado ✓": **"¡Qué cerquita que quedás,
Rubén!"**; Nico sale en la moto con los envíos pagos de lejos; "Cruces de Rubén: 0"; la cuadra cruza en fila con
"Pagado ✓" y el farol se prende sobre la fila. Línea chica: "Una tienda online cobra el pedido y el envío por vos ·
scalerics.com".

- Producto: tienda online. Solo en la línea chica y en descripcion.txt. El cartel no dice "Scalerics". Sin marcas.
- Sin Orus, sin tarjeta de videollamada (línea Para mandar, punto 8d).
- Recurso visual central: la CALLE como escenario (el camino de 14 pasos de puerta a puerta, la línea del medio), la
  sucursal en el medio de la calle y el plano general de la cuadra con las ventanas.
- Todo se genera con `node gen.mjs` (tiempos3d.js, compositions/*.html, index.html, assets/audio/mezcla.wav).
  `LIMPIO=1 SINAUDIO=1 node gen.mjs` = sin capa plana ni globos (fondo de la portada: portada-src/). `MEDIR=1` = stems.

## Paleta y set (para "Hechos")
Calle de barrio a la hora azul: cielo navy claro #16243d plano (baja a #13203a desde las 19:41), fachadas crema y
crema2, adoquines navy3 con juntas navy (relieve por normal map), línea del medio discontinua crema, veredas de
baldosa crema2, toldo verde #5ce611 a rayas crema con "ALMACÉN" crema, vidriera y cuartos cálidos #f0b06a. Rojo apagado
solo en el número de "Cruces" y en "$ 60" no elegido. Verde para lo resuelto.

## Personajes (copia local de personajes.js de me-haces-precio + opción `pantuflas: { color, borde, suela }`)
Rubén (almacenero), Héctor (con pantuflas mostaza), Nico (empleado, con casco navy de visera crema y franja verde,
armado en tres.js), en las ventanas Graciela, Marta, Walter y 4 vecinos genéricos (Beto, Nelly, Fede, Chela, hechos
con DEFECTO + rasgos). En la parte 2 cruzan en fila, en pantuflas, Graciela, Walter, Beto, Marta y Fede.

## Planos (segundos del video, ronda 1)
| t | plano | qué pasa |
|---|---|---|
| 0,00-1,60 | P1 adentro del almacén: Rubén detrás del mostrador (mate abajo, bombilla hacia afuera), el celular grande con el chat; por la vidriera, Héctor entero saludando | gancho en el cuadro 0; 0,25 voz de Héctor; 1,2 levanta la vista (cabeza 0,5 rad + torso, sin giro de nuca) |
| 1,60-3,70 | P2 la cámara va a la derecha y cruza por la PUERTA mirando siempre a Héctor (el parante entre vidriera y puerta es de 10 cm) | 2,9 rótulo "Héctor · enfrente" con línea guía; 3,15 puntitos y "14 pasos" |
| 3,70-6,60 | P3 picado más bajo y cerca (Rubén ~25-30 % del alto; objetos sobredimensionados: yerba, pan, hielo, billetes) | "¡Gracias, Rubén!" al costado de Héctor; Cruces 1-2 |
| 6,60-7,02 | P4h plano cerrado: la media vuelta de "¿Y hielo?" | |
| 7,02-8,22 | P3 picado | cambio, Cruces 3-4; 8,0 "¿Fósforos tenés?" entra mientras entrega el cambio |
| 8,22-9,30 | P5 a ras de calle, de 3/4: llega con el cajón dado vuelta (termo acostado y cartón arriba, bajos) | silencio de domingo; mira el almacén |
| 9,30-9,70 | P5c contraplano: Héctor saluda | |
| 9,70-13,49 | P5b | 9,75-10,0 apoya el cajón al costado sobre la línea · 10,02-10,25 deja el termo parado en el piso · 10,3 toma el cartón · 10,35-10,65 se sienta (cadera en el cajón, rodillas a 90°) · 10,7-10,95 apoya SUCURSAL contra las piernas · pausa de solo ambiente 0,65 s · 11,0 push-in · 11,6 "Para estar más cerca del cliente." (subtítulo con caja arriba, "cerca" en verde) |
| 13,49-16,99 | P6 grúa (primero atrás, después arriba) al general de la cuadra | 13,64 Graciela dice la frase entera sola; 14,49-15,74 las otras 6 ventanas a +0,25 s; 16,49 farol |
| 16,99-20,19 | cartel "Una tienda online más tarde…" | las burbujas se van con el giro; las letras arrancan a 0,2 s; el texto se va antes del iris |
| 20,19-21,14 | Q1 inserto del celular (pegado a cámara, textos ≥ 44 px) | tildes; "Envío: $ 60" late (la duda) |
| 21,14-21,51 | Q1b Héctor levanta la vista por encima del celular | |
| 21,51-21,86 | Q1c su punto de vista: el almacén, Rubén saluda en la puerta | |
| 21,86-22,79 | Q1 inserto | 21,94 toca "Retiro en el local: $ 0" (onda del toque); 22,34 "Pagado ✓" |
| 22,79-23,79 | Q2 picado: cruza en pantuflas | |
| 23,79-24,39 | Q2b dos planos en la vereda del almacén | 24,24 la bolsa "Héctor · pagado ✓" |
| 24,39-26,17 | Q2c Héctor de 3/4, sorprendido, señala su casa con el pulgar: "¡Qué cerquita que quedás, Rubén!" (subtítulo con caja) | |
| 26,17-26,72 | Q2d Rubén de frente, cara de nada, asiente una vez | |
| 26,72-28,92 | Q3 de frente a la puerta; la moto por la calle | avisos arriba; 27,82 "Cruces: 4" tachado → pop de "Cruces de Rubén: 0" (sin fundido cruzado, abajo) |
| 28,92-30,47 | Q4 el general: vecinos en sus ventanas con "Pagado ✓"; salen y cruzan (el chip va sobre cada uno) | |
| 30,47-31,67 | Q4p inserto bajo de la fila en pantuflas (1,2 s) | |
| 31,67-34,47 | Q5 desde enfrente: la fila llega al almacén, Héctor y Rubén en la puerta, farol | 32,27 línea chica opaca (2,2 s) |

## Sonido
Ver gen.mjs (lista S) y fuentes.md. Techo por efecto -31 LUFS (la mayoría bastante más abajo), voces sin techo con
compresor; mezcla -14 LUFS. Voz ≥ 12 LU sobre el resto en los tramos con voz (medido con stems). El bus pasa por un limitador antes de normalizar: loudnorm I=-14:TP=-2 sobre mezcla.wav da -14,8 LUFS y pico -2,0 dBFS.
