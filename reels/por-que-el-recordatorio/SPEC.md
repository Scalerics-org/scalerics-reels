# por-que-el-recordatorio · explicador "¿Por qué…?" (33,6 s, 3D real)

"¿Por qué el dentista te manda un mensaje el día antes?". Desenlace en la frase 2: con ese mensaje falta menos gente
(revisión Cochrane 2013, ver `fuentes.md`). Bisagra "¿Por qué?": la razón que más dan los que faltan es «me olvidé».
Giro: no pasa solo con los turnos: en un estudio con préstamos (2011), un aviso antes de cada cuota funcionó casi como
bajarle un cuarto a los intereses (la balanza que se nivela: una burbuja contra una pila de monedas). Callback: en el
almacén de Rubén el olvido tiene forma de encargo (bolsas de papel con el nombre en el mostrador); el sistema avisa
solo "Tu pedido está listo" con LA MISMA burbuja del gancho, y Graciela pasa. Cierre: videollamada gratis.
**Producto: automatizaciones** (avisos y recordatorios que salen solos). Sin marcas reales. Voz: Orus sola, 91 palabras (ronda 1: "funcionó casi como", la frase de los préstamos regenerada).

**Recurso central:** una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro) con la base técnica de
`reels/por-que-la-toalla` (luces, PMREM, cámara por claves Hermite monótona, la nube de pensamiento) y los personajes de
`assets/personajes.js` (Rubén = ELENCO.almacenero, Graciela = ELENCO.clienta). **El objeto que viaja: LA BURBUJA DEL
RECORDATORIO** (forma única extruida: rectángulo redondeado con colita, borde navy grueso, cara crema con textura de
canvas, tilde doble verde): nace en el celular de Rubén, vuela a los sillones, es el papelito de la nube, cae y se da
vuelta en la tarjeta de cuotas, sale del celular de la financiera, pesa en la balanza, sale del ticket de Graciela,
entra al celular de Graciela, vuelve al celular de Rubén (dos burbujas iguales) y cierra con un tilde.
Las escenas HTML (`gen.mjs`) son SOLO la capa plana: gancho, rótulos con línea guía, créditos y la tarjeta de cierre.
`armar.mjs` escribe `assets/tiempos3d.js` (inicio de cada escena y de cada palabra).

**Fondo crema `#efeee5` LISO** (html/body/#fondo); consultorio y almacén con pared crema y zócalo de azulejos navy claro
`#16243d` (junta crema); la zona de las cuotas y la balanza es crema liso con sombras en un piso invisible
(`ShadowMaterial`). Cierre en verde `#5ce611` con letras navy. Subtítulos: Lexend 800 navy con borde blanco de 16 px
(sin cartel), arriba al centro, recuadro verde con borde navy y texto navy; "olvido" en recuadro rojo apagado. Logo
navy sin píldora (se esconde en los primeros planos de celular: `assets/firma.json`, lo escribe gen.mjs). Rótulos:
placa navy claro con texto crema y borde verde, líneas guía navy de 7 px.

## Voz y tiempos
- `partes/orus1.wav`: Orus, toma 1 de `partes/guion-voz.txt` (guion sin «» y con "Scálerics punto com"), 32,37 s.
- Ronda 1: "Un estudio con préstamos: un aviso antes de cada cuota funcionó casi como bajarle un cuarto a los intereses." se
  regeneró entera con Orus (`partes/prestamos.txt` → `partes/prest2.wav`, STT limpio) y reemplaza ese tramo de orus1.
- `sh partes/armar-voz.sh`: +0,20 s antes de "¿Por qué?", +0,30 s antes de "Y Graciela pasa.", pausa entre "Y" y
  "Graciela" acortada (0,29 → 0,11 s), +0,30 s al final → `assets/voice/locucion.wav` (32,99 s).
- `node partes/ajustar-tiempos.mjs`: `assets/voice/palabras.json` desde el STT (`partes/pal1.json`) con los arreglos a
  mano medidos con silencedetect (¿Por qué? x2, «me olvidé», Un estudio, Y Graciela pasa, el cierre).
- Orden: `sh partes/armar-voz.sh && node partes/ajustar-tiempos.mjs && node armar.mjs && node gen.mjs && node armar.mjs`.
- `python3 partes/medir.py`: mezcla aproximada voz contra música + SFX por tramos de 0,5 s (sin render).

## Escenas (segundos globales)
| # | id | arranca | dura | frase | plano 3D |
|---|----|---------|------|-------|----------|
| 1 | s01-gancho | 0,00 | 3,47 | ¿Por qué el dentista te manda un mensaje el día antes? | A1: picado del celular de Rubén |
| 2 | s02-faltan | 3,47 | 3,20 | Porque con ese mensaje falta menos gente. | D: fila de 6 sillones |
| 3 | s03-por-que | 6,67 | 1,04 | ¿Por qué? | D: la lámpara se vuelve "?" |
| 4 | s04-olvide | 7,71 | 2,85 | La razón que más dan los que faltan: «me olvidé». | A4: Rubén y la nube |
| 5 | s05-plata | 10,56 | 1,98 | Y no pasa solo con los turnos. | P: papelito → tarjeta de cuotas, monedas |
| 6 | s06-cuotas | 12,54 | 3,78 | Un estudio con préstamos: un aviso antes de cada cuota | P: push-in, celular de la financiera |
| 7 | s07-balanza | 16,32 | 3,69 | funcionó casi como bajarle un cuarto a los intereses. | P: balanza que se nivela |
| 8 | s08-encargos | 20,01 | 3,41 | En el almacén de Rubén, el olvido tiene forma de encargo. | A8: corte a la balanza de Rubén, grúa |
| 9 | s09-aviso | 23,42 | 3,22 | Ahora el sistema avisa solo: «Tu pedido está listo». | A8 → G (Graciela) → AR (Rubén y el mate) |
| 10 | s10-pasa | 26,64 | 1,57 | Y Graciela pasa. | A10: entra Graciela, le da la bolsa |
| 11 | s11-local | 28,21 | 2,33 | ¿Que tus clientes no se olviden? Agendá una | A11: el celular de Rubén, dos burbujas |
| 12 | s12-llamada | 30,54 | 3,01 | videollamada gratis en scalerics.com. | F: la burbuja con el tilde, fondo verde |

## Brief por escena (lo que hay en `tres.js` y `gen.mjs`)
1. **s01-gancho** · cuadro 0 = portada en movimiento: el celular de Rubén (navy, pantalla de chat "Consultorio · en
   línea" con la muela 3D de avatar) acostado en el mostrador de madera clara, con LA burbuja "Mañana 9:30 · Dentista ·
   Te esperamos. ¿Confirmás?" + botones Sí/Cambiar. Gancho Lexend 900 navy con borde blanco ("dentista" en recuadro
   verde, 140 px). En "mensaje" vibra (3 golpecitos, arcos verdes y navy) y la burbuja late; rótulo "Recordatorio del
   día antes"; en "antes" el celular sube hacia cámara; al final la burbuja se despega y vuela a cámara (zambullida).
2. **s02-faltan** · corte con la burbuja del mismo tamaño en pantalla: vuela al sillón más cercano mientras la cámara
   retrocede: fila de 6 sillones (casco crema, tapizado navy claro, lámpara articulada, bandejita con espejito). Tres
   vacíos con cartel rojo apagado "Faltó"; llegan 3 burbujas: 2 sillones se llenan (paciente con baberito verde, el
   cartel se da vuelta a tilde verde), el del fondo queda vacío. En "menos" se prenden las lámparas. Crédito
   "Revisión de 8 estudios · 2013"; rótulo "Menos faltas, no cero".
3. **s03-por-que** · push-in a la lámpara del sillón 3, que se dobla y se achica mientras crece el "?" 3D verde con
   borde navy (~50 % del alto), centrado.
4. **s04-olvide** · corte con el "?" en el mismo lugar: vuela a la cabeza de Rubén y se vuelve la nube (cajón de
   verdura, billetes, yerba, termo y el papelito "Martes 9:30 · Dentista"). En "olvidé" las cosas se aprietan, el
   papelito sale y cae girando; Rubén se rasca la cabeza con cejas preocupadas. Crédito "La razón más citada · en
   muchos estudios · varía según el lugar".
5. **s05-plata** · crema liso: el papelito cae al centro, se pone de canto y del otro lado es la tarjeta "Préstamo ·
   cuotas" (12 casilleros). Caen 8 monedas con canto estriado a la derecha.
6. **s06-cuotas** · push-in; crédito "Estudio publicado en 2011 · 1.121 préstamos". En "un aviso" asoma el celular de la
   "Financiera" (burbuja "Tu cuota vence en 3 días"), suelta 5 burbujitas a las cuotas 1-5, que se marcan con tilde
   verde 3D. Rótulo "Un mensaje por mes".
7. **s07-balanza** · la tarjeta se va de costado y aparece la balanza de platillos (columna navy, cruz y platos de
   bronce). Las monedas vuelan al plato derecho, la burbuja al izquierdo; arranca inclinada hacia las monedas y en
   "tanto" se nivela con un rebote. Etiqueta "intereses" en la pila y "-25 %" 3D verde arriba del plato. Rótulo
   "Efecto parecido en pagar a tiempo · mismo estudio" al fiel. Push-in final: lo de los platos se achica.
8. **s08-encargos** · corte a la balanza de Rubén (misma escala en pantalla) y grúa arriba y atrás: el almacén (pared
   crema, azulejos navy claro, estantería verde con yerba, fideos, galletitas, dulce de leche, frascos; reloj 19:40).
   Rubén con el mate mira las bolsas y suspira (cabeza baja en "olvido"). En "encargo" 4 bolsas de papel madera dobladas
   y abrochadas hacen pop con su ticket escrito a mano (Caveat): Graciela sáb, Walter vie, Susana jue, Héctor sáb. Rótulo
   "Encargos armados, esperando". Nada de estante GUARDADOS, contador ni telaraña (no es me-lo-guardas).
9. **s09-aviso** · push-in al ticket de Graciela: en "sistema" se prende con tilde verde y sale LA burbuja "Graciela,
   tu pedido está listo. Te esperamos hasta las 20. [Voy]" hacia cámara; corte a Graciela en la vereda (plano medio,
   pared crema con zócalo navy, maceta, chismosa a rayas); la burbuja se mete en su celular, vibra, ella lo da vuelta
   contenta y la cámara entra hasta que el celular llena el cuadro ("Voy" se pone verde en "listo"). Rótulo "Sale solo,
   a la hora que elijas". Contraplano de 0,6 s: Rubén con el mate, tranquilo (no toca nada).
10. **s10-pasa** · campanita: Graciela entra caminando desde la izquierda, Rubén le alcanza la bolsa, ella se la lleva;
    los tickets de Walter, Susana y Héctor se prenden en verde en cadena; Rubén levanta el mate y guiña.
11. **s11-local** · el celular de Rubén otra vez (mismo encuadre que el gancho): vibra y aparece, debajo de la burbuja
    del dentista, una igual (espejada, verde clara) "Almacén de Rubén · Tu pedido está listo." Push-in.
12. **s12-llamada** · fondo verde: "Videollamada" / "gratis" (verde sobre navy) / "scalerics.com" (navy sobre crema) y
    la burbuja 3D con el tilde abajo. Arranca sobre "videollamada", 3,0 s.

## Sonido
SFX de `assets/sfx` (los del repo; `sorbo.mp3` es el `sorbo.wav` de Abir19, CC0, ya registrado en otros reels, no se
usa por ahora). TECHO -31 LUFS por efecto (armar.mjs), cama `bed.mp3` con sidechain a la voz y volumen 0,24.
