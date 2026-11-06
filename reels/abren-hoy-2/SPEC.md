# abren-hoy-2 · PARA MANDAR, parte 2 (3D real), 13,5 s

Parte 2 de reels/abren-hoy: el mismo almacén, otro día (JUEVES · 16:40). Graciela vuelve a preguntar; esta vez el
celular de Rubén contesta solo (agente de IA) mientras él toma mate sin mirarlo. NO está en la cola ni en ideas.md.

## Beats (T en gen.mjs)
- 0,0 · General (callback del cuadro 0 de la parte 1): la puerta, ABIERTO · Lun a Sáb 9 a 20, Graciela tipeando, Rubén
  con el mate (0,35-1,15 sorbe, se oye el sorbo). 0,9 · "Hola! ¿abren hoy?".
- 1,4 · El celular de Rubén en grande, desde arriba: vibra, "escribiendo…", y a los 2,35 la respuesta sola
  "¡Hola Graciela! Sí, hoy de 9 a 20. ¿Te guardo algo?" con "respondido automáticamente".
- 3,75 · Primer plano de Graciela: lee y a los 3,95 se sorprende (ojos y boca abiertos), sonríe, escribe
  "¿tenés yerba?" (5,2).
- 5,5 · Rubén de frente: vibra el celular, ni lo mira, sorbe el mate con los ojos cerrados. 6,05 · "Sí, quedan 3.
  ¿Te la separo?" (respondido automáticamente).
- 6,95 · General: guarda el celular, va a la puerta, se abre (puerta + campanita), entra. 8,0 · Rubén levanta el mate:
  "Pase, Graciela." (Algenib).
- 9,0 · Remate: Rubén con el mate, "Hoy: 48 veces" (callback del 48 de la parte 1) → tachado → "0" + "que contestó
  Rubén" → 10,5 "salud" con el mate a cámara y guiño; push-in lento. 11,55 · cierre chico: "Un agente de IA contesta
  por vos · scalerics.com".

## Cómo está armado
- Base de la parte 1 (gen.mjs, tres.js). La puerta ahora es una hoja que gira (bisagra a la izquierda) con el vidrio,
  la manija y el cartel. Burbujas: las 2 últimas a la vista; la nueva entra abajo y empuja la vieja; las del local en
  navy claro con "respondido automáticamente". El celular de Rubén tiene 6 pantallas (canvas) que cambian con T.
- Módulo de personajes (assets/personajes.js, copiado también a reels/abren-hoy, que es el canónico): se sumó guiño
  (ojos.guiño), caminar (paso) y utilería reutilizable crearMate() y crearTermo(). BRAZOS.costado quedó con los
  brazos casi estirados (con los brazos largos, más arriba quedaban en jarra).
- SINVOZ=1 node gen.mjs arma la versión sin la línea (se usó para comparar), LIMPIO=1 el fondo de la portada,
  MEDIR=1 los stems de voz y resto.

## Voz y sonido
- Dos tomas de Algenib ("Pase, Graciela."); quedó la a (relajada, cálida, con la respiración de mate al principio).
  Con voz vs. sin voz: Gemini, mirando y escuchando las dos versiones, eligió con voz ("el contraste entre la IA
  laburando y Rubén saludando con total parsimonia remata el chiste").
- La música esta vez no se corta (todo anda); baja 9 dB (y el ambiente 7 dB) mientras habla Rubén. Medido por tramos
  de 0,5 s: la voz queda 8,4 a 14,9 LU por encima del resto. Final -14,3 LUFS, pico -1,5 dBFS, sin clipping
  (paso 10 con alimiter=limit=0.7 después del loudnorm, como en la parte 1).
