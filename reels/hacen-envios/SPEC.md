# hacen-envios · PARA MANDAR completo (3D real), 32,56 s (ronda 2)

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

## Planos (segundos del video, ronda 2)
| t | plano | qué pasa |
|---|---|---|
| 0,00-1,60 | P1 adentro del almacén: Rubén detrás del mostrador, el celular grande con el chat; por la vidriera, Héctor saludando | gancho en el cuadro 0; 0,25 voz de Héctor; 1,2 levanta la vista |
| 1,60-3,70 | P2 la cámara cruza por la PUERTA mirando siempre a Héctor | 2,9 rótulo "Héctor · enfrente" con línea guía; 3,15 "14 pasos" |
| 3,70-6,60 | P3 picado: cruces 1-2, "¡Gracias, Rubén!" al costado de Héctor | |
| 6,60-7,02 | P4h plano medio desde la vereda de enfrente: media vuelta de 0,34 s con easing ("¿Y hielo?"), se le ve la cara | |
| 7,02-8,22 | P3 picado: cruces 3-4; 8,0-8,2 agarra el cajón (cajón, termo y cartón en la calle desde el principio, z 0,95) | "¿Fósforos tenés?" |
| 8,22-9,30 | P5 a ras de calle: llega con el cajón | mira el almacén |
| 9,30-9,70 | P5c contraplano: Héctor saluda | |
| 9,70-13,49 | P5b de costado: apoya el cajón, deja el termo parado; 10,05 agarra el cartón agachado (estaba boca abajo: SUCURSAL no se ve hasta acá) y lo da vuelta con la mano en la esquina; se sienta (muslos y rodillas a 90°), apoya SUCURSAL · 11,6 "Para estar más cerca del cliente." (la frase entera en la caja desde la primera palabra; "cerca" se marca en verde al decirla; se va a 13,6) | |
| 13,49-16,99 | P6 grúa continua (sin corte desde P5b): retrocede por delante del toldo, sube por encima del almacén y llega al general de la cuadra; las 7 ventanas; las burbujas nacen con la grúa arriba (14,49), en dos alturas alternadas | 16,49 farol |
| 16,99-19,99 | cartel "Una tienda online más tarde…" (3,0 s) | |
| 19,99-20,94 | Q1 inserto del celular sostenido por la mano de Héctor (palma, pulgar, dedos, manga) | tildes; "Envío" late (la duda) |
| 20,94-21,51 | Q1b Héctor levanta la vista | |
| 21,51-22,06 | Q1c su punto de vista: Rubén saluda en la puerta | |
| 22,06-23,03 | Q1 inserto | 22,18 toca "Retiro" (onda; se pone verde después) · 22,58 "Pagado ✓" |
| 23,03-24,03 | Q2 picado: se abre el portón y cruza en pantuflas | |
| 24,03-24,63 | Q2b dos planos: la bolsa "Héctor · pagado ✓" | |
| 24,63-26,41 | Q2c Héctor: "¡Qué cerquita que quedás, Rubén!" (subtítulo con caja) | |
| 26,41-26,96 | Q2d Rubén, cara de nada (la bolsa queda fuera de cuadro) | |
| 26,96-29,16 | Q3 la moto con los envíos | avisos arriba; 28,06 "Cruces: 4" tachado → "Cruces de Rubén: 0" |
| 29,16-30,36 | Q4 el general: "Pagado ✓" en cada ventana (dos alturas, quedan aunque el vecino salga); desde 29,66 salen y cruzan | |
| 30,36-32,56 | Q5 desde la calle, alto y lejos (debajo del borde del toldo; la fila cruza rápido en Q4 y llega al empezar Q5): la fila llega en diagonal (a la izquierda) y se da vuelta a cámara; Rubén y Héctor libres en la puerta; "ALMACÉN" entero arriba. (El inserto de pantuflas Q4p se sacó en la ronda 2: dejaba medio cuadro de piso vacío.) | 30,96 línea chica opaca (1,6 s) |

## Sonido
Ver gen.mjs (lista S) y fuentes.md. Techo por efecto -31 LUFS (la mayoría bastante más abajo), voces sin techo con
compresor; mezcla -14 LUFS. Voz ≥ 12 LU sobre el resto en los tramos con voz (medido con stems). El bus pasa por un limitador antes de normalizar: loudnorm I=-14:TP=-2 sobre mezcla.wav da -14,8 LUFS y pico -2,0 dBFS.
