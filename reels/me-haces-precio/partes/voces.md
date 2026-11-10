# me-haces-precio · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una con `node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`
desde `reels/me-haces-precio`. Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`.

**Héctor (personaje nuevo): Sadaltager.** No la usó ningún personaje del repo (Charon ya es "dueño cansado", Fenrir el
pillo de el-golpe, Iapetus se probó para narrador, Algenib es Rubén): así Héctor tiene voz propia y no se confunde con
Rubén en las líneas cruzadas. Si Sadaltager suena joven o demasiado formal, probar **Achird** y después **Umbriel** con
el mismo tono; elegir la que suene más a jubilado canchero de barrio, con sonrisa en la voz. Que sea claramente más
aguda y más rápida que Rubén (Algenib es grave y lento): el contraste se tiene que oír.

**Graciela: Gacrux** (la de el-reencuentro y el-audio). **Rubén: Algenib.** **Narrador del cartel: Rasalgethi** (frase
nueva: "Unos puntos más tarde." no se puede reusar el cartel.wav de abren-hoy-completo, que dice "Un agente de IA").

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| hector-1.txt · "¿Me hacés precio?" | Héctor | Sadaltager | Jubilado uruguayo canchero, setenta años, apoyado en el mostrador con un pote en la mano; lo dice con picardía y media sonrisa, como quien abre una partida de truco que ya ganó otras veces. "precio" un poquito estirado. Nada de agresivo ni de pobre: lo hace por deporte. ~1,0 s. | Sin filtro. Es el gancho: limpio y cerca. |
| ruben-1.txt · "Ciento noventa y cinco." | Rubén | Algenib | Almacenero uruguayo grave y cansado que se rinde: suspiro corto por la nariz antes, voz baja, resignada, sin enojo; como quien entrega una pieza de ajedrez. Lento y parejo. ~1,1 s. | Sin filtro. Dejar el suspiro si sale natural. |
| hector-2.txt · "¡Hecho!" | Héctor | Sadaltager | Triunfal y feliz, puño arriba, como si hubiera ganado un campeonato; corto y explosivo. ~0,5 s. | Sin filtro. |
| hector-3.txt · "Dejá. Quedate con el vuelto." | Héctor | Sadaltager | Generoso y despreocupado, con un gesto de la mano; tono de señor bueno que deja propina. "Dejá." suelto y amable, una pausita, "Quedate con el vuelto." sin ninguna ironía: él no ve el chiste. ~1,3 s. | Sin filtro. Va después de la música cortada: que se oiga solo. Si la toma trae una pausa larga entre "Dejá." y "Quedate", dejarla en 0,25-0,35 s. |
| hector-4.txt · "¡Me lo dejó en ciento noventa y cinco!" | Héctor | Sadaltager | Orgulloso, contándole a la vecina en la puerta como quien cuenta un gol; en voz alta y de cómplice. ~1,4 s. | Sin filtro. Si pasa de 1,5 s, atempo 1,1. |
| graciela-1.txt · "Rubén, ¿me hacés precio?" | Graciela | Gacrux | Señora de barrio cariñosa que se acaba de enterar de que "se puede" y se entusiasma; dulce, con ilusión, sin picardía de regateadora: le pide como un favor. ~1,1 s. | Sin filtro. |
| narrador.txt · "Unos puntos más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde" (el mismo tono que el "Un agente de IA más tarde." de abren-hoy-completo). | Comparar contra `reels/abren-hoy-completo/assets/voice/narrador.wav` (de ahí el tono y el largo, ~2,0-2,4 s). Recorte de silencios suave. |
| hector-5.txt · "¿Cuánto es?" | Héctor | Sadaltager | Rápido y decidido, ya convencido por lo que vio en el celular; nada de regateo, casi apurado por pagar. ~0,7 s. | Sin filtro. |
| ruben-2.txt · "Doscientos." | Rubén | Algenib | El mismo Rubén grave, ahora tranquilo y con media sonrisa: la palabra que en la parte 1 era un muro, dicha con calma, sin desafío. ~0,8 s. | Sin filtro. Música baja ~9 dB mientras habla. |
| hector-6.txt · "¡Gané!" | Héctor | Sadaltager | La misma alegría triunfal de "¡Hecho!", puño arriba, un poco más fuerte todavía. ~0,5 s. | Sin filtro. Tiene que sonar igual de festejo que hector-2 (es el callback): si salen distintas, elegir las dos tomas más parecidas. |
| hector-7.txt · "¡Pagué doscientos y me llevo dos!" | Héctor | Sadaltager | Orgulloso y canchero en la puerta, mostrando los dos potes; mismo tono de "cuento el gol" que hector-4. ~1,5 s. | Sin filtro. Si pasa de 1,6 s, atempo 1,1. |
| graciela-2.txt · "Rubén, ¿me hacés puntos?" | Graciela | Gacrux | La misma Graciela de graciela-1 (mismo ritmo y misma ilusión), ahora con el celular en la mano; "puntos" con alegría. ~1,1 s. | Sin filtro. Es el espejo de graciela-1: que suene a la misma frase con una palabra cambiada. |

Textos que NO van a la voz (están en SPEC.md): el regateo en burbujas ("Doscientos." ×3, "¿Ciento ochenta?",
"¿Ciento noventa? Vengo siempre.", "Tengo ciento noventa en monedas."), "¿Me hac…" y "¡Pago!" de la parte 2, la
etiqueta "$ 200", los números 3D del regateo, la tarjeta de puntos del celular ("180 / 200", "+20 puntos", "¡Premio!
Un dulce de leche ✓"), el "+20 ✓" de Graciela y la línea chica final.

## Tomas elegidas (10-11) · recortadas en partes/rec, finales en assets/voice
Héctor Sadaltager (tono "jubilado canchero"): hector-1-b, hector-2-a, hector-3-b (pausa Dejá/Quedate recortada a 0,26 s),
hector-4-b (atempo 1,12), hector-5-b, hector-6-a (pareja de hector-2-a) [hector-7 fuera en la ronda 1]. Rubén Algenib: ruben-1-a
(atempo 1,1), ruben-2-a. Graciela Gacrux: graciela-1-a (pausa tras "Rubén," a 0,26 s, atempo 1,15), graciela-2-a.
Narrador Rasalgethi: narrador-b (2,26 s). Todas verificadas con tiempos.mjs ("oyó:" coincide; "hacés" sale "hace" por la
s aspirada uruguaya).

## Ronda 1 (10-11)
- hector-3: rearmada desde hector-3-b con una pausa real de 0,5 s entre "Dejá." y "Quedate con el vuelto." (assets/voice/hector3.wav,
  2,30 s; "Quedate" en +1,25). La burbuja cambia con la voz.
- hector-7 fuera (Héctor sale sin hablar).
- narrador.txt nuevo: "Una tarjeta de puntos más tarde." · Rasalgethi, toma narrador-d (2,06 s), verificada con tiempos.mjs
  ("oyó: una tarjeta de puntos más tarde": Una 0 · tarjeta 0,2 · de 0,6 · puntos 0,8 · más 1,1 · tarde 1,5).
- Ronda 2 de sonido: hector5 = toma hector-5-a (0,25-0,89 s, 0,64 s; "oyó: cuánto es"): la b terminaba cortada ("¿cuánto e-").
  La pausa de hector3 queda en 0,5 s (no se estiró a 0,65: el reel ya está en 34,96 s).
- Ronda 2: el narrador entra 0,1 s más tarde (P1 + 0,3) para no pisarse con el stinger; graciela1 con fundido de 0,12 s.
