# taller-esta-pronto · voces (Gemini TTS, 3 tomas por línea en partes/tomas/, tonos en partes/lineas.tsv)

Sin Orus. Óscar = **Charon** y Maxi = **Puck** (los de `reels/taller-presupuestos`) · Graciela = **Gacrux** · Walter =
**Umbriel** (las de siempre del elenco) · **Daniel = Schedar** (personaje nuevo; Schedar solo la usaron secundarios: el
proveedor de la-lista y Bruno de veterinaria-vacunas; si suena parecido a Óscar, probar Achird) · narrador del cartel =
**Rasalgethi**. Generar con `TOMAS="a b c" bash partes/reintentar.sh` (copiar `reintentar.sh`, `medir-tomas.sh` y
`procesar.sh` de `reels/dist-quien-debe/partes/`), medir con `medir-tomas.sh` ("oyó:") y armar las finales con
`procesar.sh`.

- **Callback con el MISMO audio:** 05-maxi ("Jefe, el de Daniel: pierde la bomba de agua.") suena idéntico en P2 y en
  Q3. Por eso el tono es neutro, de dato: tiene que servir para las dos.
- **02 y 04 son dos tomas distintas de "A la tarde."**: 02 tranquila y de oficio, 04 más cansada y automática. No
  reusar una por la otra (el cansancio es la escalada). 14-maxi es OTRA "A la tarde.", canchera, imitando al jefe.
- **Por teléfono** (01 Graciela, 03 Walter, 07 Daniel): filtro de teléfono suave (pasaaltos 300 Hz, pasabajos 3,4 kHz)
  porque en cuadro está Óscar con el celular y no ellos. En la pantalla partida de 07, Daniel está en cuadro en el
  ómnibus: filtro más leve (pasaaltos 200) y un poquito del ambiente del ómnibus abajo. 12 (Daniel en el ómnibus,
  "Dale, cambiala.") en cuadro: sin filtro, con el ambiente del ómnibus.
- **10 Graciela** en cuadro, leyendo su celular en la rotisería: sin filtro.
- **06 y 07 casi pegados** (~0,2 s): Óscar dice "¡Daniel!" y Daniel arranca enseguida, sin escuchar.
- **08 es EL remate:** después de una pausa de ~0,5 s, con la cama baja (-12 dB) y nada encima. Si suena enojado, a
  reto o a queja, regenerar. Si "para empezar" sale con énfasis cómico, regenerar: tiene que ser plano.
- **09:** toma nueva de Rasalgethi "Un aviso automático más tarde."; si pasa de 2,4 s, atempo 1,1. Fallback: la toma de
  `reels/ya-lo-cargo` "Un sistema más tarde." y el cartel dice "Un sistema" / "más tarde…".
- Si "PRONTO" sale sin marcar en 15, regenerar solo esa línea.
- Burbujas SIN voz (solo pop y el timbre corto del celular): Sergio "¿Y? ¿Está pronto?", Fabián "¿Ya está?", Silvia
  "¿Está pronto?", Graciela "Óscar, ¿y?", el chat con la foto de la bomba, los avisos de la parte 2, el panel, los
  rótulos y la línea chica. Se tiene que entender sin sonido.

| archivo | quién | voz | ~dur. | proceso |
|---|---|---|---|---|
| 01-graciela · "Óscar, ¿está pronto?" | Graciela | Gacrux | 1,0 s | teléfono suave · es el gancho (entra a ~0,15 s) |
| 02-oscar · "A la tarde." | Óscar | Charon | 0,6 s | sin filtro |
| 03-walter · "¿Está pronto?" | Walter | Umbriel | 0,7 s | teléfono suave |
| 04-oscar · "A la tarde." (cansado) | Óscar | Charon | 0,7 s | sin filtro, toma distinta de 02 |
| 05-maxi · "Jefe, el de Daniel: pierde la bomba de agua." | Maxi | Puck | 1,9 s | sin filtro · se reusa en Q3 |
| 06-oscar · "¡Daniel!" | Óscar | Charon | 0,5 s | sin filtro |
| 07-daniel · "Óscar, ¿está pronto?" | Daniel | Schedar | 1,1 s | teléfono leve + ómnibus abajo |
| 08-oscar · "Está pronto para empezar." | Óscar | Charon | 1,3 s | cama baja, nada encima |
| 09-narrador · "Un aviso automático más tarde." | Narrador | Rasalgethi | 2,2 s | atempo 1,1 si > 2,4 s |
| 10-graciela · "¡Ay, mi autito! Ya lo están mirando." | Graciela | Gacrux | 2,0 s | sin filtro |
| 11-oscar · "Mandale la foto." | Óscar | Charon | 0,8 s | sin filtro, un poco apagado (está abajo del auto: pasabajos 6 kHz muy leve) |
| 12-daniel · "Dale, cambiala." | Daniel | Schedar | 0,7 s | ómnibus abajo |
| 13-oscar · "Maxi, ¿está pronto el mate?" | Óscar | Charon | 1,2 s | igual que 11 |
| 14-maxi · "A la tarde." (canchero) | Maxi | Puck | 0,6 s | sin filtro |
| 15-oscar · "Comentá PRONTO y te mando cómo funciona para tu taller." | Óscar | Charon | 3,0 s | sin filtro; atempo 1,05 si > 3,3 s |
