# caso-tu-nombre · Caso de éxito (3D real), 32,9 s

Serie "Caso de éxito" (CLAUDE.md de la rutina, puntos 8, 8b, 8c y 9b), contenido verificado en `fuentes.md`.
Gancho: "¿Por qué Coca-Cola sacó su logo y puso tu nombre?". Producto: **automatizaciones** (mensajes con el
nombre del cliente que salen solos). Coca-Cola solo se nombra en texto: ni su logo, ni su rojo, ni su
tipografía, ni la curva de su botella. Base técnica y vara: `reels/caso-pedidosya`.

**Fondo del reel: crema `#efeee5` liso** (sin degradés, mejor para la compresión de Instagram). Objetos navy
`#0b1220`/`#16243d`, verde `#5ce611`, blanco, crema oscuro `#dcdacb`; rojo apagado `#c7655b` solo para el
problema (el "?" de adivinar, el talle agotado). Subtítulos navy arriba al centro (1-3 palabras, Lexend 700,
86 px), palabra clave en recuadro verde lleno; "talle" (agotado) en recuadro rojo apagado. Velo crema arriba
(0-640 px) para que el texto se lea sobre el 3D. Logo oscuro abajo.

## Cómo está armado
- Una sola escena Three.js (`assets/tres.js`), `renderAt(t)` puro (sin rAF ni Date.now; azar con semilla).
  Luz principal cálida + contraluz fría + hemisférica + entorno PMREM claro (tiras de luz que se reflejan en
  el vidrio). Sombras suaves navy al 20-40 % en el piso. Cámara en una curva Catmull-Rom continua (sin cortes).
- `node gen.mjs && node armar.mjs`. `armar.mjs` (adaptado a fondo crema): velo crema, subtítulos navy,
  `reel.texto` para mostrar "2011", "150" y "80" en dígitos aunque la voz los lea en palabras, el último
  subtítulo se corta antes del cierre, TECHO de -31 LUFS por efecto, y `PORTADA=1 node armar.mjs` arma un
  index sin capas planas para sacar el cuadro limpio de la portada.
- LA BOTELLA (genérica): LatheGeometry (vidrio de gaseosa de almacén, hombros redondos, cintura apenas
  marcada), líquido navy adentro, tapa corona verde con 21 dientes, etiqueta envolvente navy con filetes
  crema y verde y el nombre en crema Lexend 800 (textura de canvas: la fuente 3D solo trae dígitos). La
  etiqueta del héroe es un plano que se curva (`curvar(b)`): envuelta en la botella o plana (franja de la ficha).
- Números 3D (TextGeometry Lexend 800): 2011, contador 0 → 150 en una placa navy tipo precio de góndola, +80.
- Voz: Gemini Orus con tono "educativo, curioso" (`--tono`), 32,57 s. Los tiempos por palabra salen de los
  silencios reales de la locución (frases) repartidos por sílabas, con el tramo final afinado con
  Speech-to-Text (el "oyó:" de tiempos.mjs se salteaba "Llegó a" y "scalerics punto com").

## Escenas (inicio global · objeto 3D · capa HTML) — ronda 1 de corrección
Guion línea 3 nueva: "Para que buscaras el tuyo, y se la compartieras a un amigo." Voz Orus regenerada entera
(toma con el mismo --tono, 32,57 s; "volviera su talle" sin la "a" de más). Tiempos por frases desde los silencios.
1. **s01-gancho** 0,00 · LA BOTELLA (más ancha, ~43 % del ancho) en contrapicado, push-in y órbita desde el cuadro 0;
   salta en "logo"; LUCÍA aparece en "tu nombre" · gancho entero; se va antes del primer subtítulo. Sin logo abajo.
2. **s02-australia** 3,25 · la botella se clava como pin en Sídney · "2011" 3D · pill "Australia".
3. **s03-ciento-cincuenta** 5,71 · góndola de 2 estantes que sube YA llena (debajo de y≈460, nada en la banda de
   subtítulos), travelling lateral, contador 0→150 en placa navy · sin píldora (no repite el subtítulo). Sin logo.
4. **s04-buscar** 8,40 · LUCÍA sale de la fila hacia la cámara; tilde en "tuyo".
5. **s04b-amigo** 10,03 · entra MARTÍN y brindan (los picos se tocan).
6. **s05-paises** 12,01 · la góndola se va hacia atrás; las botellas vuelan (por delante) a Australia; globo que entra
   desde atrás, 20 arcos verdes bajos y mini botellas-pin; "+80".
7. **s06-adivinar** 14,07 · BISAGRA: la botella sale del frente del globo y crece (~48 % del ancho); tragamonedas →
   "?" rojo apagado · título "Coca-Cola tuvo que adivinar". Sin logo.
8. **s07-vos** 16,78 · la etiqueta se despega y se aplana: ficha "LUCÍA · Espera: Vestido verde · Talle M";
   atrás MARTÍN y SOFÍA con el nombre entero · tilde.
9. **s08-lucia** 19,14 · perchero entero (centrado), vestido verde, cartel TALLE M AGOTADO colgado de la percha,
   vaivén · pill roja "agotado".
10. **s09-caja** 21,80 · la caja entra de costado por el piso; en "caja" el cartel gira a VOLVIÓ; en "sale" el
    perchero y la caja se van, el globo del mensaje sale por delante (siempre encima) y el celular entra de costado.
11. **s10-mensaje** 24,14 · celular de Lucía (chat de "Tienda Lola": su "¿Tenés el verde en M?" a la derecha, la
    tienda "Se agotó, te avisamos." a la izquierda), llega "LUCÍA, volvió tu talle M."; push-in hasta ~76 % del
    ancho; en "talle" Lucía contesta "¡Paso hoy!" y vibra. Sin logo.
12. **s11-automatizamos** 26,07 · se aleja: globos "MARTÍN, tu pedido está listo." y "SOFÍA, ¡feliz cumple!" ·
    pill "Automatización · Scalerics".
13. **s12-tu-local** 28,19 · CALLBACK: los globos se van, el celular de Lucía se corre a la izquierda y entra LA
    botella "TU LOCAL" a la derecha; en "local" salta la tapa.
14. **s13-llamada** 30,12 (2,75 s, arranca en "videollamada") · celular + botella abajo · "Videollamada", "gratis",
    "scalerics.com" verde sobre banda navy.

## Sonido
Música `bed.mp3` a 0,2. SFX de `assets/sfx` (de este repo) en cada acción visible, techo -31 LUFS por efecto:
whoosh/whoosh-cinematic/whoosh-short (cámara), pop (botella, año, tapa, pines), golpe (pin en el mapa, caja,
"?"), campanita (tintineo de vidrio de las botellas y el brindis: no hay un "clink" de vidrio real en el repo),
tic (contador y tragamonedas), typing (rodillo), ping (tildes), naipe (fichas y cartel), tijera (etiqueta que
se despega), salto, ficha, error (agotado), correcta (VOLVIÓ), vibra + notification (mensaje), sparkle, chime
y click-soft (cierre). Mezcla medida con ebur128 por tramos de 0,5 s (voz sola contra música+SFX
reconstruidos desde el index): con la voz sonando (M > -24 LUFS), la voz queda al menos 6,8 LU arriba; voz
-14,7 LUFS integrado, premezcla -14,6 LUFS, pico -1,7 dBFS. El techo de -31 LUFS se mide ahora sobre el tramo que
suena (atrim hasta max + silencio), así los archivos cortos también quedan limitados.
