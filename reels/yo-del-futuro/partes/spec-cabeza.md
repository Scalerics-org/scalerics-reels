# Reel "Yo del futuro": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende el AGENTE DE IA.
Formato A/D: MONÓLOGO DE PERSONAJE con VIAJE EN EL TIEMPO (polémica con giro). Entre chispas,
humo y huellas de fuego aparece en el mostrador EL YO DEL FUTURO: el mismo dueño, dentro de
cinco años, canoso, ojeroso, de vuelta de todo (campera magenta, antiparras de viajero en la
frente, voz grave y cansada: Charon). Gancho: "Soy vos. Dentro de cinco años. Y vengo a decirte
que la estás pifiando." EL DUEÑO DE HOY (pelo negro, delantal cian, Puck) se asusta: "¿Qué hacés
en mi local? ¿Y ese auto?". Referencias solo nombradas: el auto es "un Fiat 147" porque "el
DeLorean me dijo: pasá el lunes"; "¿A decirme que compre dólares?"; "como dijo Terminator:
volveré... pero descansado". El del futuro cuenta, con humor, lo que viene: la clienta del
sábado a la noche que dejó en visto ("Estaba cerrando..."), el martes contestando con un pulgar,
las canas "de mensajes sin contestar", las once de la noche con el celular en la mano, el
cumpleaños de la hija contestando WhatsApp entre las velitas. "¿Me venís a decir que cierre?"
GIRO: "No. Vengo a contarte qué hicieron los que crecieron: tienen un empleado de IA" que atiende
a cualquier hora, agenda y vende mientras ellos duermen, "y vos lo podés empezar hoy". "¿Y vos lo
tenés?" "Yo no. Por eso las canas." Narrador Scalerics (Orus): "Tu agente de IA lo hacemos en
Scalerics: atiende por vos, hoy y dentro de cinco años. Escribile un mensaje a tu yo del futuro
en los comentarios."
Voces (partes/voces.sh, partes/componer.mjs): futuro Charon (atempo 1.15), hoy Puck (1.1),
narrador Orus (1.12). Voz de 70.8 s, reel de 74.04 s.

## Recurso visual central
SYNTHWAVE / RETRO 80s NEÓN. Fondo (`armar.mjs`): cielo violeta que se enciende magenta en el
horizonte. `compositions/ambiente.html` (escrita a mano): SOL DE RAYAS naranja→magenta detrás de
todo (horizonte y 1460), GRILLA EN PERSPECTIVA violeta/magenta en el piso (y 1460-1920) que
corre hacia la cámara, estrellas que titilan, scanlines suaves de VHS, arriba un PANEL DE
TIEMPO tipo reloj digital de tablero (sin año: "DESDE · DENTRO DE 5 AÑOS" / "HASTA · HOY") y
abajo el ZÓCALO de quién habla ("YO · DENTRO DE 5 AÑOS" naranja / "YO · HOY" cian). Los momentos
fuertes de cada escena: CHISPAS eléctricas y humo, HUELLAS DE FUEGO, relojes digitales que
cambian, palabras gigantes en letra cromada que caen en su palabra, sacudones. Edición CARGADA:
nada quieto más de ~0.8 s. Personajes dibujados genéricos (nada del auto de la película, ni
caras, ni logos: el Fiat es un auto chiquito cuadrado genérico, sin marca).

## Paleta (SOLO estos colores)
- Noche `#120621`: contornos (6 px), pelo del dueño de hoy, pantallas, fondos de carteles.
- Blanco `#fdf6ff`: piel, canas, textos, papeles.
- Violeta `#7b2ff7`: grilla, sombras de letras, el local.
- Magenta `#ff2a9d`: campera del futuro, neones, alertas, el "visto".
- Cian `#22e4ff`: el dueño de hoy, el celular, el AGENTE DE IA (holograma).
- Naranja atardecer `#ff8a3d`: el yo del futuro (zócalo, antiparras), el fuego, el Fiat, el sol.
- Verde Scalerics `#5ce611`: SOLO desde s15 (entra Scalerics).
Acento de subtítulos por quién habla (`reel.voces` en `armar.mjs`): futuro naranja, hoy cian,
Scalerics verde. Rellenos planos con contorno noche y brillos neón (text-shadow/drop-shadow de
color) en lo grande. Prohibido: emojis, fotos, rayas largas (—), logos, el DeLorean, caras de
actores, años concretos.

## Tipos de letra
Lexend 900 mayúsculas, inclinadas (skew -8°) para lo grande, con relleno cromado (degradé
blanco→cian | magenta→naranja) y sombra dura violeta; IBM Plex Mono 600 para relojes, el panel y
el zócalo. Nada que haya que leer de menos de 26 px.

## Zona
Panel de tiempo arriba (y 64-170, ambiente). Subtítulos en y 236 a ~420. Contenido de escena
entre y 540 y 1540. Zócalo en y 1566-1680 (ambiente). Logo de Scalerics en y 1746.

## Lo que ya está hecho
- `armar.mjs` (fondo synthwave, colores de subtítulos por voz, cortina `assets/bgm/bed.mp3`).
- `compositions/ambiente.html`: sol, grilla, estrellas, scanlines, panel de tiempo, zócalo por
  parlamento, flash de llegada (0.0) y de partida (59.1), apagado del set en 61.39 (Scalerics).
- Las escenas se generan con `partes/escenas/*.py` (personajes en `base.py`: futuro, hoy,
  mostrador, fiat, celular, agente, chispas, fuego). `cd partes/escenas && python3 sNN.py`
  escribe la escena y su `.sfx.json`; después `node armar.mjs`.
