# Voces de por-que-el-mozo

- Orus (narrador, acento uruguayo, explicador curioso, ritmo ágil): líneas 1-9 (`partes/orus-a.txt`) y 11
  (`partes/orus-b.txt`).
  Pausas: ~0,5 s después de "Pagaron…" (timing: el olvido es el remate de la anécdota); ~0,5 s antes de "¿Por qué?";
  en "la seña, el presupuesto, el proveedor" una mini pausa entre cada uno (cada pendiente es una burbuja que aparece).
  `node ../../herramientas/voz.mjs partes/orus-a.txt partes/orus-a1.wav --voz Orus --tono "narrador uruguayo de explicador curioso, ágil y cálido, cuenta una anécdota con picardía; pausa antes de 'y se olvidó' y antes de '¿Por qué?'"`
- Rubén = Gemini Algenib (grave, cansado, uruguayo): línea 10, "Anotado. Ya me olvidé." (`partes/ruben.txt`)
  `node ../../herramientas/voz.mjs partes/ruben.txt partes/ruben1.wav --voz Algenib --tono "almacenero uruguayo de 55 años, voz grave y cansada, en la cama de noche, aliviado, lo dice bajito y satisfecho, con media sonrisa: 'Anotado.' pausa corta 'Ya me olvidé.'"`
- Armado: Orus a, 0,4 s, Rubén, 0,45 s, Orus b. Recortar silencios con silenceremove. Tiempos con tiempos.mjs y
  verificar el "oyó:" (ojo con "Berlín" si vuelve, "interrumpidas", "presupuesto", "scalerics.com"); si se desfasa,
  palabras.json a mano como en `reels/por-que-el-caramelo/partes/ajustar-tiempos.mjs`.
