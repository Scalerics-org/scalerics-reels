# hacen-envios · PARA MANDAR completo (3D real), 30,59 s

**De qué trata.** Héctor, el vecino de ENFRENTE, le escribe a Rubén "¿Hacen envíos?". Rubén cruza la calle con la
yerba, el pan, el hielo y el cambio (contador "Cruces" rojo, chip de hora 19:10 → 19:26 → 19:41). Al quinto mensaje
("¿Fósforos tenés?") se para en la línea del medio, silencio de domingo, da vuelta el cajón de verdulería, se sienta,
termo al costado, cartón "SUCURSAL" contra las piernas: **"Abrimos sucursal."** Grúa: se prenden las 7 ventanas de la
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

## Planos (segundos del video)
| t | plano | qué pasa |
|---|---|---|
| 0,00-1,60 | P1 adentro del almacén: Rubén detrás del mostrador con el mate, el celular grande en primer término con el chat "Héctor · enfrente / ¿Hacen envíos?", Héctor por la vidriera | gancho HTML en el cuadro 0 (Lexend 900 132 px, "envíos?" en el recuadro verde); 0,25 voz de Héctor; 1,2 Rubén gira la cabeza a la vidriera |
| 1,60-3,70 | P2 la cámara cruza la calle sin corte (Catmull-Rom: por la puerta, sobre la calle, hasta Héctor de cuerpo entero) | 2,90 rótulo "Héctor · enfrente"; 3,15 puntitos verdes del camino y "14 pasos" |
| 3,70-8,70 | P3/P4 picado de la calle (la cámara sube con cada cruce) | 4 cruces en time-lapse; "¡Gracias, Rubén!"; notificaciones del chat (¿Tenés pan? / ¿Y hielo? con media vuelta seca / ¿Me cambiás mil? / ¿Fósforos tenés?); Cruces 1-4; 19:26, 19:41 |
| 8,70-9,30 | P5 a ras de calle, de 3/4, sobre la línea | llega con el cajón y se para; silencio (música a -12 dB, pájaro, zumbido); mira al almacén |
| 9,30-9,70 | P5c contraplano: Héctor saluda feliz | |
| 9,70-12,15 | P5b vuelve a Rubén; push-in en 10,70 | 9,85 da vuelta el cajón; 10,10 se sienta; 10,30 el termo; 10,50 el cartón SUCURSAL; 10,80 "Abrimos sucursal." (subtítulo arriba) |
| 12,15-14,60 | P6 grúa continua: primero atrás (el cartón entero en cuadro) y después arriba hasta el general de la cuadra | 12,60-13,32 se prenden 7 ventanas (vecino + celular + "¿Hacen envíos?" + coro; cada burbuja recién cuando su ventana está en cuadro); 13,75 Rubén mira las ventanas; 14,15 farol |
| 14,60-17,80 | cartel "Una tienda online más tarde…" (el de las-siete, audio reusado) | giro 540° de entrada, iris de salida |
| 17,80-20,40 | Q1 Héctor de frente con el celular grande: la tienda | tildes; duda en "Envío: $ 60"; mira enfrente; toca "Retiro en el local: $ 0"; "Pagado ✓" |
| 20,40-21,20 | Q2 el mismo picado: cruza Héctor en pantuflas | la reja se abre |
| 21,20-23,64 | Q2b dos planos en la puerta del almacén; Héctor entra caminando al cuadro | la bolsa "Héctor · pagado ✓"; 21,92 "¡Qué cerquita que quedás, Rubén!" (mira para atrás a su casa); Rubén asiente |
| 23,64-25,84 | Q3 de frente a la puerta (Héctor saluda a Nico, Rubén al lado, los dos a la vista); la moto pasa en primer término | avisos "Envío pago ✓ · a 15 / 22 cuadras"; 24,64 "Cruces: 4" tachado → "Cruces de Rubén: 0" verde |
| 25,84-30,59 | Q4/Q5 el general de la cuadra, dolly atrás; 27,30-27,70 Q4p inserto bajo de la fila en pantuflas (caras y pantuflas) | ventanas con "Pagado ✓"; la fila en pantuflas cruza al almacén; 27,64 farol; 28,59 línea chica (2,0 s) |

## Sonido
Ver gen.mjs (lista S) y fuentes.md. Techo por efecto -31 LUFS (la mayoría bastante más abajo), voces sin techo con
compresor; mezcla -14 LUFS. Voz ≥ 12 LU sobre el resto en todos los tramos de 0,5 s con voz (medido con stems).
