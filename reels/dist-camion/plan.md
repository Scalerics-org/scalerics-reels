# dist-camion · plan · DISTRIBUIDORAS, dolor + solución (3D real), 44,97 s

> **Ronda 1 (26-11), lo construido:** 44,97 s · parte 1 0-19,78 · cartel 19,78-22,03 · parte 2 + cierre 22,03-44,97 (22,94 s, 51 %) · tarjeta CAMIÓN 3,0 s. Cambios contra este plan: sin la llamada de Héctor en el montaje (el contador salta 7 → 19), la cabina es un solo plano del celular en el portavasos (sin el inserto de "Llamar" ni el Ruso manejando), "¿Qué… señor?" separado, en Q4 el Ruso dice "Vos. No un señor." y hay un plano de la hoja de ruta en el soporte de la cabina antes de la vereda. Ver guion.txt y NOTAS-constructor.md.
>
> **Ronda 2 (26-11):** 45,93 s · parte 1 0-20,42 · cartel 20,42-22,91 · parte 2 + cierre 22,91-45,93 (23,02 s, 50 %) · tarjeta 3,15 s. Pausas nuevas antes de "Uno que pasaba." y "A algún lado llega.", inserto del aviso de Marta a pantalla (Q2i) antes del plano de Marta, cámaras más abiertas en oficina, muelle, vereda y cierre.

**De qué trata.** Martes 9:40. El camión de la Distribuidora Rubén salió a las 7 con 18 entregas. Pantalla partida:
Graciela en la rotisería: **"Rubén, ¿por dónde viene el camión?"** / Rubén, con el mate: **"Está llegando."** Montaje de
llamadas (Marta, Héctor; el contador sube 7 → 12 → 19) y cada vez Rubén contesta más corto: **"Llegando."** Llama al
Ruso, el chofer: el celular vibra en el portavasos de la cabina ("Rubén · 14 llamadas perdidas") y el Ruso maneja con las
dos manos. Nico asoma: **"Jefe, ¿dónde está el camión?"** / **"Llegando."** / **"¿Adónde?"** / pausa / **"Es un camión,
Nico. A algún lado llega."** 12:10: Cafetería Marta con la persiana baja ("Fui al banco. ¡No sabía a qué hora
venían!"). 18:00: el camión vuelve con 6 cajas y un fajo de remitos arrugados; el de Súper Héctor tiene un garabato:
**"¿Y esta firma?"** / **"Un señor."** / **"¿Qué señor?"** / **"Uno que pasaba."** y suena el celular: "Súper Héctor".
Cartel **"Una hoja de ruta más tarde…"**. Parte 2: el mismo martes 9:40, a Graciela le llega sola la ventana de entrega y
el "Sos la próxima parada": **"Ah. Soy la próxima."**; Marta: **"Al banco voy a la una."**; el mismo "¿Adónde?" de Nico →
Rubén gira el panel: **"A lo de Héctor. En dos minutos."**; Héctor firma con el dedo en el celular del Ruso, con foto:
**"¿Firmo yo?"** / **"Vos, Héctor. Vos."**; 18:00, 18 de 18, cero cajas de vuelta: **"¿Y hoy? ¿Pasó algún señor?"** /
**"Ni uno."** Cierre: Rubén a cámara: **"Comentá CAMIÓN y te mando cómo funciona para tu distribuidora."**

- **Producto: automatización + hoja de ruta** (sistema a medida chico para el reparto). Con los pedidos del día se arma la
  hoja de ruta; a cada cliente le llega solo por WhatsApp la ventana de entrega ("Tu pedido llega hoy entre 10:00 y
  11:00") y, cuando el chofer sale de la parada anterior, "En camino · Sos la próxima parada"; el chofer ve la ruta en el
  celular, marca "Entregado", el cliente firma con el dedo y se saca foto de la mercadería (remito digital, con hora);
  el dueño ve el panel de entregas del día (entregadas, en camino, pendientes, devueltas). No es agente de IA: no se lo
  llama así ni en pantalla ni en `descripcion.txt`. El cartel nunca dice "Scalerics".
- **Sin marcas:** "Distribuidora Rubén", "Rotisería Graciela", "Cafetería Marta", "Súper Héctor" inventados. El chat es
  genérico (globo verde de marca, sin logo de WhatsApp); el mapa es un dibujo propio (manzanas navy, ruta verde), sin
  Google Maps ni Waze. El camión, sin marca de fabricante.
- **Números del caso, inventados para la historia, nunca estadísticas:** 18 entregas; 19 llamadas a las 9:40; 14 llamadas
  perdidas en el celular del Ruso; 6 cajas de vuelta; flete $ 4.200; 3 horas de teléfono; remito de Súper Héctor
  $ 86.400. Nada de "las distribuidoras pierden X %". Sin `fuentes.md`: no hay datos reales.
- **Estructura:** parte 1 **~20,2 s** (dolor) + cartel **2,0 s** + parte 2 **~19,4 s** (solución) + cierre **3,4 s**.
  Solución + cierre = 22,8 s (51 %). Tiempos estimados: los fija el constructor con las voces.
- **Callbacks con el MISMO audio:** "Jefe, ¿dónde está el camión?", "Llegando." y "¿Adónde?" (P5 y Q3) suenan idénticos;
  la respuesta cambia. Mismos encuadres en P1/Q1 (pantalla partida), P5/Q3 (oficina con Nico en la puerta), P6b/Q5
  (muelle a las 18:00).

## Voces (Gemini TTS, un .txt por parlamento en partes/)

| # | Personaje | Voz | Línea | Tono |
|---|---|---|---|---|
| 01 | Graciela | Gacrux | Rubén, ¿por dónde viene el camión? | apurada pero cordial, con el local por abrir |
| 02 | Rubén | Algenib | Está llegando. | seguro, tranquilo, de memoria |
| 03 | Marta | Aoede | ¿Por dónde viene? | rápida, ocupada |
| 04 | Rubén | Algenib | Llegando. | más corto, un poco cansado |
| 05 | Héctor | Sadaltager | Rubén, ¿y el camión? | cordial, de señor mayor |
| 06 | Rubén | Algenib | Llegando. | más cansado todavía, casi sin abrir la boca (toma distinta de 04) |
| 07 | Nico | Fenrir | Jefe, ¿dónde está el camión? | al pasar, asomado |
| 08 | Rubén | Algenib | Llegando. | automático (puede ser la toma de 06) |
| 09 | Nico | Fenrir | ¿Adónde? | curiosidad genuina, inocente |
| 10 | Rubén | Algenib | Es un camión, Nico. A algún lado llega. | seco, sarcástico, pausa entre las dos frases |
| 11 | Rubén | Algenib | ¿Y esta firma? | mirando el papel, entrecerrando los ojos |
| 12 | Ruso | **Zubenelgenubi (nuevo)** | Un señor. | tranquilo, como si fuera obvio |
| 13 | Rubén | Algenib | ¿Qué señor? | seco |
| 14 | Ruso | Zubenelgenubi | Uno que pasaba. | encogiéndose de hombros, sin culpa |
| 15 | narrador | Rasalgethi | Una hoja de ruta más tarde. | caricaturesco (estilo del cartel de ya-lo-cargo) |
| 16 | Graciela | Gacrux | Ah. Soy la próxima. | sorprendida, contenta, baja el celular |
| 17 | Marta | Aoede | Al banco voy a la una. | resuelta, práctica |
| 18-20 | Nico / Rubén / Nico | | (los mismos audios de 07, 08 y 09) | |
| 21 | Rubén | Algenib | A lo de Héctor. En dos minutos. | tranquilo, satisfecho, sin mirar |
| 22 | Héctor | Sadaltager | ¿Firmo yo? | un poco sorprendido, cordial |
| 23 | Ruso | Zubenelgenubi | Vos, Héctor. Vos. | firme, con media sonrisa |
| 24 | Rubén | Algenib | ¿Y hoy? ¿Pasó algún señor? | irónico, cómplice |
| 25 | Ruso | Zubenelgenubi | Ni uno. | satisfecho, corto |
| 26 | Rubén | Algenib | Comentá CAMIÓN y te mando cómo funciona para tu distribuidora. | a cámara, cálido, "CAMIÓN" marcado |

Alternativa para el Ruso si Zubenelgenubi no suena uruguayo de calle: Schedar. El cartel: si no hay cuota para generar
el narrador, se puede reusar el audio "Un aviso automático más tarde." de `reels/dist-cliente-grande` y cambiar el texto
del cartel a eso (es el plan B; el A es "Una hoja de ruta").

## Personajes (copiar `assets/personajes.js` de `reels/dist-cliente-grande` o `reels/dist-comisiones`)
- **Rubén = `ELENCO.ruben`** (NO `almacenero`): camisa navy arremangada, bigote, panza, mate. P1-P3 seguro y cada vez más
  hundido en la silla; P5 seco (deja el mate para el remate); P6b entrecerrando los ojos ante el remito, P6c ojos
  cerrados con el celular sonando. Parte 2 relajado, el mate siempre en la mano. Cierre a cámara en el muelle.
- **Graciela = `ELENCO.clienta`** con el delantal crema (de ya-lo-cargo / dist-quien-debe), en la rotisería con el spiedo.
- **Marta = `ELENCO.duena`** (como en dist-cartera), detrás del mostrador de Cafetería Marta con la máquina de café.
- **Héctor = `ELENCO.hector`** como en dist-cliente-grande: boina navy, lentes finos, chaleco mostaza y guardapolvo
  crema abierto; dueño del Súper Héctor.
- **Nico = `ELENCO.empleado`** con la carpeta de pedidos; asomado a la puerta vidriada en P5 y Q3 (mismo encuadre).
- **El Ruso = personaje NUEVO** (`ELENCO.ruso`, mismo estilo): chofer de la distribuidora, ~45, ancho, pelo rubio muy
  corto casi rapado y barba candado rubia, **chaleco reflectivo verde de marca** (`#5ce611` con dos franjas crema) sobre
  remera navy, pantalón cargo navy2, botines. Tranquilo, de pocas palabras, nunca apurado: no es el culpable (maneja,
  y nadie le dijo a quién hacer firmar). Que no se confunda con Nico (trigueño, pelo liso) ni con Seba.
- Extras sin voz: un operario en el muelle (de los existentes) recibiendo las cajas en P6b.

## Escenarios y objetos 3D por escena
| Escena | Escenario | Objetos protagonistas |
|---|---|---|
| P1 / Q1 | Pantalla partida: rotisería de Graciela (de dist-quien-debe, spiedo girando, pizarrón) arriba; oficina vidriada de Rubén (dist-comisiones / dist-cliente-grande) abajo | celular de Graciela (en Q1, a pantalla grande con el aviso), celular de Rubén en altavoz sobre el escritorio, mate, termo |
| P3 | La mitad de arriba rota: Cafetería Marta (dist-cartera) y Súper Héctor (vereda y góndola de dist-cliente-grande) | contador 3D de llamadas arriba ("19" en rojo apagado, TextGeometry), el celular de Rubén vibrando |
| P4 | **La cabina del camión** por dentro, andando: volante, tablero, portavasos con el celular vibrando, parabrisas con la rambla low-poly pasando | celular con "Rubén · 14 llamadas perdidas", manos del Ruso en el volante |
| P5 / Q3 | Oficina vidriada, la puerta con Nico asomado | en Q3, el monitor de Rubén girado a cámara con el panel; el mate |
| P6a / Q2 | Cafetería Marta desde la vereda: persiana baja con el cartel a mano (P6a), abierta (Q2) | el camión estacionado enfrente, la zorra con cajas, el cartel "Fui al banco" |
| P6b / Q5 | El muelle del depósito, 18:00, luz de tarde | **el camión de reparto** (base `crearCamion()` de `reels/ya-lo-cargo/assets/tres.js`: cabina navy, caja crema con franja verde, puertas traseras de dos hojas, con "Distribuidora Rubén" en crema en el costado), 6 cajas kraft rotuladas "MARTA", el fajo de remitos arrugados (planos con arrugas: geometría con vértices desplazados con semilla fija), el remito con la mancha de grasa |
| Q4 | Vereda del Súper Héctor (de dist-cliente-grande, toldo verde apagado, baldosas de 9 panes) | el camión estacionado de costado, las cajas, el celular del Ruso grande en primer plano con la firma |
| Cierre | El muelle, el camión vacío con las puertas abiertas detrás | Rubén con el mate |

- **El camión entra grande** en P4 (desde adentro), P6b (llega de frente al muelle con un push-in) y Q4 (estaciona de
  costado, ocupando el ancho), y hace algo distinto cada vez (andando, llegando con las puertas que se abren y las cajas
  que vuelven, estacionando liviano). Que se lea "camión de reparto de distribuidora", no camioneta ni ómnibus.
- **Los remitos:** papel crema con encabezado navy "REMITO · Distribuidora Rubén", renglones de productos, casilla
  "Recibió:" con un garabato y una mancha de grasa marrón (P6b, el "¿?" en rojo apagado). En Q4/Q5 desaparecen: el remito
  es una pantalla.

## Interfaz recreada (canvas en las pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
1. **Aviso al cliente** (celular de Graciela, Q1; de Marta, Q2): chat genérico de "Distribuidora Rubén" con avatar
   navy; globo 1 "Hola, Graciela. Tu pedido llega hoy entre **10:00 y 11:00** ✓"; globo 2 (entra con pop) "**En camino** ·
   Sos la próxima parada" con un mini mapa (manzanas navy, ruta verde, camioncito verde a una cuadra del pin de la
   rotisería). Rótulo con línea guía: "Aviso automático a cada cliente".
2. **Hoja de ruta del chofer** (celular en el soporte de la cabina, Q4): "Parada 15 de 18 · Súper Héctor · 10:52",
   lista con las paradas hechas en verde con ✓ y las que faltan en gris.
3. **Remito digital** (celular del Ruso en la mano de Héctor, Q4): "Remito · Súper Héctor · $ 86.400", renglones, caja
   "Firmá acá" donde se dibuja la firma con el dedo (trazo navy grueso que se dibuja solo), la foto de las cajas en
   miniatura, botón verde "Entregado ✓ 10:52 · Recibió: Héctor". Rótulo: "Firma y foto en el celular".
4. **Panel de entregas del día** (monitor de Rubén, Q3; celular del Ruso, Q5): "Entregas de hoy" · número grande
   "14 de 18 ✓" en verde que sube a 15 cuando vuela el ✓ de Q4 y a 18 en Q5 · chips "En camino 1 · Pendientes 3 ·
   Devueltas 0" · mapa con la ruta y el camión · fila iluminada "Parada 15 · Súper Héctor · llega 10:52". Rótulo: "Todo
   el reparto en una pantalla".
- **Rojo apagado `#c7655b` SOLO para el problema:** el contador de llamadas, "14 llamadas perdidas", el "¿?" del remito,
  "6 cajas de vuelta", "Viaje perdido · flete $ 4.200". Lo resuelto, en verde `#5ce611`.

## Sonido (SFX en cada acción visible; techo -31 LUFS por efecto, voz ≥ 6 LU arriba)
Ringtone del celular de Rubén en cada llamada (que se corta seco), vibración en el portavasos, motor y tráfico de la
rambla en la cabina, golpes en la persiana, el camión que llega al muelle (motor, freno de aire), cajas sobre la chapa,
papel arrugado al desplegar el remito, el ringtone final cortado por el stinger; parte 2: pop/ding del aviso, el ✓ de
entregado, el trazo de la firma, el obturador de la foto, el swoosh del ✓ volando al panel.

## Portada
`grande` "¿Por dónde viene?", `chica` "Martes, 9:40.", `sello` "DISTRIBUIDORAS": de fondo un cuadro limpio de P1 (Graciela
con el celular y Rubén con el mate en la pantalla partida) o de P4 (el celular vibrando en la cabina con el Ruso al
volante); el constructor elige el más fuerte y renderiza el `fondo_limpio`.
