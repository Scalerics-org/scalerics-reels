# Voces de por-que-el-caramelo

- Orus (narrador, acento uruguayo, tono de explicador curioso, ritmo ágil): todas las líneas de guion.txt menos la 12.
  Pausa de ~0,4 s antes de "¿Por qué?" y otra de ~0,3 s antes de "y vuelve." (el amague).
- Rubén = Gemini Algenib (grave, cansado, uruguayo, cálido, a media voz, como quien hace un mimo sin hacer escena):
  línea 12, "Y este, para vos." -> partes/ruben.txt -> partes/ruben.wav
  `node ../../herramientas/voz.mjs partes/ruben.txt partes/ruben.wav --voz Algenib --tono "almacenero uruguayo de 55 años, voz grave y cansada pero cariñosa, lo dice bajito y con una sonrisa, como un mimo a una clienta de siempre"`
- Armado: Orus líneas 1-11 (partes/orus-a.txt), Rubén línea 12, Orus línea 13 (partes/orus-b.txt). Recortar silencios
  con silenceremove; 0,35 s antes de Rubén y 0,5 s después. Tiempos con tiempos.mjs y verificar el "oyó:"; si se
  desfasa, palabras.json a mano.
