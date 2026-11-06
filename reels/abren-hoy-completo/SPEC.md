# abren-hoy-completo · PARA MANDAR, partes 1 y 2 juntas (30,5 s)

Parte 1 (reels/abren-hoy, 13,8 s, sin la línea chica: `SINCIERRE=1 node gen.mjs` allá) + cartel "Un agente de IA más
tarde…" (3,2 s, este proyecto) + parte 2 (reels/abren-hoy-2, 13,5 s, con la línea chica final). El contador sigue:
la parte 1 termina en 48 y la parte 2 arranca en "Hoy: 48 veces" → tachado → "0 veces que contestó Rubén".
NO está en la cola ni en ideas.md.

## El cartel (compositions/cartel.html)
- Estética de "time card" de dibujo animado pero de marca y hecha de cero: fondo verde #5ce611 con manchas orgánicas
  (verde oscuro, crema, navy) que giran despacio y burbujas que suben; texto Lexend 900 crema con borde navy de 16 px y
  sombra dura, inclinado -4°, letras que entran rebotando una por una y después bailan (cada una con su fase).
  Scalerics no aparece en el cartel (Juan: "suena a publicidad"): queda solo en la línea chica del final.
- Entrada: el último cuadro de la parte 1 (assets/img/fin-parte1.png) se va girando 540° y achicándose.
  Salida: el texto se agranda y un iris abre el primer cuadro de la parte 2 (assets/img/inicio-parte2.png): los cortes
  no se notan.
- Sonido: whoosh del giro, vibráfono CC0 (-14 dB, 8 LU por debajo del narrador), narrador Rasalgethi, whoosh del iris.

## Cómo se arma
1. En reels/abren-hoy: `SINCIERRE=1 node gen.mjs`, render a ../abren-hoy-completo/partes/parte1.mp4, `node gen.mjs`.
2. Copiar reels/abren-hoy-2/renders/abren-hoy-2.mp4 (render crudo) a partes/parte2.mp4 y sacar los dos cuadros de unión.
3. Acá: `node armar.mjs`, render del cartel a renders/cartel.mp4, `node armar.mjs unir` (concat + paso 10 con
   alimiter=limit=0.66 después del loudnorm) → renders/abren-hoy-completo-final.mp4 y renders/hoja.png.

Medido: -14,3 LUFS, pico -2,2 dBFS, sin clipping. Revisión: cuadros cada 0,5 s del reel unido completo + Gemini
mirando y escuchando ("se entiende sin sonido", "el cartel funciona como el meme", "un dueño se lo manda a otro: 100 %").
