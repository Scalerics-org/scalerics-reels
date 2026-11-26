# dist-camion · revisión de guion y datos · ronda 1

Revisor independiente (no construyó el reel). Leído: CLAUDE.md, guion.txt, plan.md, ganchos.md, descripcion.txt,
portada.json, fuentes.md, NOTAS-constructor.md, partes/*.txt, partes/rec/medidas.tsv (los "oyó:"), palabras-r10.json,
index.html, compositions/*.html y todos los textos de canvas y globos de assets/tres.js. Sin Chrome y sin escuchar audio.

## Veredicto
El chiste funciona y es de distribuidora de verdad: "¿por dónde viene el camión?" lo vive cualquier mayorista con reparto
propio. Un dueño se lo manda a otro: **sí**, sobre todo por "Es un camión, Nico. A algún lado llega." y "Un señor. /
¿Qué señor? / Uno que pasaba.". Los callbacks de la parte 2 (el mismo "¿Adónde?" con otra respuesta, "¿Pasó algún señor?
/ Ni uno.") cierran bien. El problema no es el chiste, es **el largo (49 s) y la proporción de la solución (46 %)**.

## Defectos

### Alta
1. **La solución ocupa menos de la mitad** (index.html / NOTAS: parte 2 + cierre 26,28-49,0 = 22,7 s de 49 = 46 %).
   "ANTES QUE TODO" punto 3 pide la mitad o más, sin excepción. Se arregla acortando la parte 1 (ver "Qué cortar").
2. **Duración 49 s** (index.html `data-duration="49"`). El formato completo de 8d es ~30 s y el encabezado de CLAUDE.md
   habla de 25-35 s; con diálogos el techo es ~45 s. 49 s pasa todos los topes y baja el visionado medio, que es lo que
   decide si el reel salta. Objetivo razonable: 42-44 s con la parte 1 en ~19 s.

### Media
3. **Toma 13-a "¿Qué señor?"** (r7, P6c ~21,5 s): el STT oyó "qué senior". "Senior" en un STT en español suele salir
   cuando el acento cae en la primera sílaba (/'senjor/ en vez de /se'ɲor/), o sea, puede ser pronunciación de Gemini y
   no error del STT. Las tomas b y c se oyen "señor" pero se comen el "qué". Es la línea del remate: **escucharla; si
   suena "sénior", regenerar** (más tomas de 13 hasta que el STT oiga "qué señor").
4. **El cierre dura 3,33 s de tarjeta** (s10-palabra 45,67-49,0) y la escena C 3,68 s; el tope es ~3 s. Con 49 s de
   reel, sobra.
5. **"Vos, Héctor. Vos." es el remate más flojo** (Q4 ~38-39 s). "¿Firmo yo?" / "Vos, Héctor. Vos." solo funciona si
   el que mira conecta con el "señor que pasaba"; sin eso es una línea de trámite. Alternativa más filosa y corta, con
   callback explícito: Héctor "¿Firmo yo?" / Ruso "Vos. No un señor." (o "Vos. Hoy no pasa nadie."). Si no hay cuota de
   voz, dejarlo: no es un error, es el chiste menos fuerte.

### Baja
6. **Hoja de ruta del Ruso con las paradas desordenadas** (tres.js l.1058, Q4 ~37,8-39 s): "14 · Panadería Nelly",
   "13 · Bar Walter", "16 · Cafetería Marta", "17 · Kiosco Beto". Debería ser 13, 14 (hechas) y después 16, 17.
7. **Hora del celular del Ruso 9:40 vs. celular de Rubén 9:41** (tres.js l.1047 y l.1030): Rubén llama después del
   montaje (ya son 9:41 en su celular) y el del Ruso, que recibe la llamada 14, dice 9:40. Poner 9:41 o 9:42 en el del Ruso.
8. **Remito "Agua 6 × 2 L × 20"** (tres.js l.809): dos "×" seguidos se leen mal; "Agua 2 L (pack 6) × 20" o
   "Agua 2 L × 120". Y la suma de los cuatro renglones no da $ 86.400 a precios mayoristas razonables; nadie lo calcula
   en pantalla, pero si se puede, que los renglones sugieran un pedido más grande (más bultos) o cortar a 2 renglones.
9. **Globo de Graciela partido "Rubén, ¿por / dónde viene / el camión?"** (tres.js l.1305, cuadro 0): el "¿por" queda
   colgado del signo de apertura. Mejor "Rubén, / ¿por dónde viene / el camión?".
10. **Chips de hora muy cortos**: "Martes, 9:40." en Q1 dura 0,68 s (s06-chip) y "18:00." en Q5 0,73 s (s07-chip).
    Son callbacks de los mismos encuadres y ayudan, pero a menos de 1 s apenas se leen.
11. **palabras-r10.json con tiempos interpolados**: "Comentá" 0-0,1 s y la frase termina en 3,0 s, cuando la toma 26-b
    medía 3,72 s (con atempo 1,08 ≈ 3,44 s). Si algo de la tarjeta (el "CAMIÓN" en el recuadro) se sincroniza con estos
    tiempos, puede entrar antes de que se diga. Verificar contra el audio.
12. **guion.txt y plan.md** dicen ~45 s, parte 2 51 % y tiempos estimados que ya no son los reales (49 s, 46 %). Solo
    documentación; actualizar el corchete de cabecera.
13. **16-a "Ah. Soy la próxima."**: el STT no transcribe el "Ah." (la toma dura 1,99 s, así que probablemente está).
    Escuchar que se oiga, porque el globo lo muestra.

## Lo que está bien (verificado)
- **Rubro en el cuadro 0**: "DISTRIBUIDORAS" + "Martes, 9:40." en s00-rubro desde 0 s, sobre la pantalla partida con
  Graciela llamando: escena del dolor ya en curso.
- **Dolor concreto con la plata del caso**: 19 llamadas, 14 perdidas, persiana baja, 6 cajas de vuelta, "Viaje perdido ·
  flete $ 4.200", "3 horas de teléfono", remito de $ 86.400 firmado por cualquiera. Ninguna estadística; fuentes.md lo
  declara como números del caso. Correcto.
- **Solución en pantalla y entendible**: aviso con ventana de entrega, "En camino · Sos la próxima parada", hoja de ruta,
  remito con firma y foto, panel de entregas. Se entiende qué se compra.
- **CAMIÓN** en voz (r10, el STT oyó "comentá camión"), en pantalla (s10-palabra, en recuadro) y en la primera línea de
  descripcion.txt. Línea de videollamada en descripcion.txt antes de los hashtags. Bien.
- **Callback del cierre**: el muelle de las 18:00, el mismo encuadre, "¿Pasó algún señor? / Ni uno." y "0 cajas de
  vuelta". No es random.
- **Rubén** dueño de distribuidora (oficina vidriada sobre el depósito, camión "DISTRIBUIDORA RUBÉN · MAYORISTA ·
  REPARTO", Nico, el chofer). Nada de almacén, fiado ni vecinas. Lo picante va contra la situación (el camión que
  "llega a algún lado", la firma de "un señor"), nunca contra el que mira ni contra el chofer.
- **Cartel** "Una hoja de ruta más tarde…": no dice Scalerics, nombra la solución. No es "agente de IA" y no se lo llama
  así; no hay "bot" ni "chatbot" en ningún lado.
- **Marcas**: ninguna en pantalla (chat y mapa genéricos, camión sin fabricante). "WhatsApp" aparece solo nombrado en
  descripcion.txt, que lo permite.
- **Ortografía de textos visibles**: revisados todos (globos, rótulos, interfaz, carteles, tarjetas, portada). Tildes y
  signos ¿¡ correctos ("¡No sabía a qué hora venían!", "CAFETERÍA MARTA", "SÚPER HÉCTOR", "Firmá acá", "Recibió:",
  "¿Adónde?", "Sos la próxima parada", "CAMIÓN", "Comentá"). Sin rayas largas, sin emojis. Voseo en todo
  ("Firmá", "Comentá", "Sos").
- **Números coherentes**: 18 entregas (hoja de ruta "Martes · 18 entregas", "Parada 15 de 18", panel 14→15 de 18 con
  "En camino 1 · Pendientes 3→2", Q5 "18 de 18 · 18 remitos · 0 cajas"); 19 llamadas en el contador y "diecinueve" en la
  descripción; $ 86.400 igual en el remito de papel y en el digital; Marta 12:00-13:00 igual en su aviso y en el panel;
  Héctor 10:52 igual en panel, hoja de ruta y "Entregado".
- **"oyó:" de las tomas elegidas**: iguales al guion salvo 13-a (punto 3), 16-a (punto 13) y 23-b "vos Héctor voz":
  en rioplatense "vos" y "voz" suenan igual (seseo) y las seis tomas de 23 la oyen así; es el STT, **no regenerar**.
  10-b sin la "A" de "A algún lado": sinalefa ("Nico. A algún" se funde), plausible del STT.
- **Portada**: "Martes, 9:40." / "¿Por dónde viene?" (3 palabras, entre signos) / sello "DISTRIBUIDORAS", copia del
  portada.json de anotamelo con fondo limpio de la pantalla partida (personajes arriba). Cumple.

## Qué cortar sin perder el chiste (para llegar a ~43 s y >50 % de solución)
Lo intocable: "Está llegando" → "Llegando", el bloque de Nico con "A algún lado llega", el bloque del remito ("Un señor"),
y en la parte 2 el "¿Adónde?" → "A lo de Héctor" y el "Ni uno".
1. **P4, la cabina del Ruso (7,65-9,91 s, ~2,3 s)**: es un tercer chiste ("Maneja. No atiende.") que no se usa después;
   se puede bajar a un solo plano de 1,0 s (el celular vibrando con "14 llamadas perdidas", sin el inserto de "Llamar" ni
   el plano del Ruso), o cortar entero. Ahorro 1,3-2,3 s.
2. **La llamada de Héctor en el montaje P3** (~1,9 s desde 4,76): Héctor ya queda presentado por el remito y su llamada
   final. Con Graciela + Marta + el contador saltando a 19 alcanza para la escalada. Ahorro ~1,5-1,9 s. (Si se prefiere
   conservar a Héctor, sacar a Marta del montaje no sirve: su persiana necesita la presentación.)
3. **Tarjeta de cierre de 3,33 a ~2,6 s** (y la escena C con menos aire antes de "Comentá"). Ahorro ~0,7 s.
4. Si hace falta más: P6d (Rubén cierra los ojos con "Súper Héctor llamando…") a 0,6-0,8 s pegado al stinger.
Con 1+2+3 queda en ~43-44 s, parte 1 ~19,5 s y solución + cierre ≈ 22 s de 43 = 51 %.
