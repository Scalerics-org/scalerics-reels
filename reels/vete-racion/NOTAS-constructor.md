# vete-racion · notas del constructor (24-11)

Proyecto copiado de `reels/veterinaria-vacunas` (personajes.js, perro.js, procesar de voces, medir.py, snap.sh, prev.mjs)
con la escena 3D y gen.mjs reescritos. Todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html,
index.html, assets/audio/mezcla.wav). La escena entera está en `assets/tres.js` (se edita directo; las piezas con que se
armó quedaron en `partes/tmp/t_*.js` y `partes/tmp/g_*.js`, ya no se usan).

**Duración: 42,0 s.** Parte 1 0-18,14 · cartel 18,14-20,79 · parte 2 + cierre 20,79-42,0 = 21,2 s (**50,5 %**). Tarjeta
"Comentá RACIÓN" desde 38,38 (T.i2) · línea chica desde 41,0. `check --json`: ok, 0 errores en todas las categorías.
Mezcla: voz ≥ +6,5 LU sobre el resto en todos los tramos de 0,5 s con voz (medir.py), -14,0 LUFS antes del loudnorm final.

## Comandos (desde reels/vete-racion)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (ver partes/voces.md)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana ni burbujas
python3 medir.py                          # voz contra resto por tramos (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x ["px,py,pz,mx,my,mz,fov"]   # solo la capa 3D
```
OJO: después de `LIMPIO=1 node gen.mjs` (fondo de la portada) volver a correr `SINAUDIO=1 node gen.mjs`.

## Mundo (x del set)
- **Cocina de Vero (x = 0):** pared navy claro, mesada con azulejo crema, damero, lámpara verde (de noche con PointLight
  crema), ventana (noche navy / día crema), plato de acero (Lathe) sobre la alfombrita TOTO. Vero de entrecasa = `veroC`
  (segunda instancia de ELENCO.vero sin campera, jogging navy2, pantuflas). El plato va pegado a Toto (`PLATO_DX`), no a la
  nariz (si no se movía cuando Toto levantaba la cabeza).
- **Súper (x = -40):** góndola de 4 estantes con bolsas genéricas (crearBolsa15 tipo "otra"), carteles de precio, carro
  de alambre navy3 (fusionado), la bolsa verde (tipo "super") que viaja de la góndola al carro (`bolsaSuperEn`), una vez
  el domingo y otra por mes. La señora de fondo.
- **Recepción de Veterinaria Inés (x = 40):** la de vacunas reducida (mostrador, cartel, azulejo, vidriera y puerta), la
  TORRE de 20 bolsas con el cartel de cartón (parte 1) y el estante ENVÍOS DE HOY con 5 bolsas con nombre (parte 2),
  talonario en el mostrador (parte 1), tablet con el panel (parte 2).
- **Puerta de Vero (x = 80):** pared navy2, puerta que abre hacia adentro, afuera la tarde crema.
- `crearBolsa15({ tipo, nombre, vacia, color, kg, esc })`: bolsa kraft con silueta de perro, "ADULTO MEDIANO / 15 kg",
  sticker verde "VETERINARIA INÉS" (tipo vete), costura zigzag navy; `vacia` = desinflada y arrugada (vértices).
- Insertos pegados a la cámara: P1c "Cerrado", P5i la receta (con la lapicera dibujada donde va la letra), Q1c el chat
  de recompra, Q1t la ficha de recompra, Q1s la tienda (Pagar → Pagado ✓), Q5 el panel (11 → 2 gira).

## Planos
P1 cuadro 0 (cocina, de noche) · P1c celular "Cerrado" · P1b "Bueno, Toto. Al súper." · P2 súper + NOVIEMBRE / DICIEMBRE /
ENERO y el contador rojo $ 3.900 → $ 15.600 · P3 febrero, la torre · P4 entran Vero y Toto, Toto a la torre, "¡Vero! ¿Qué
está comiendo Toto?" · P4b contraplano de Vero desde atrás del mostrador · P4c la pausa (Inés quieta + 2 rótulos) · P5
"¿Me la anotás?" (Vero de frente, otro eje que P4b) · P5i la receta · P5t Toto echado contra la torre · cartel · Q1 =
P1 de día · Q1c chat · Q1v "¿Cómo sabe?" · Q1t ficha · Q1s tienda · Q2 puerta, Bruno · Q3 = P1 de noche, plato lleno,
push-in · Q4 = P4 · Q4b = P4b · Q5 panel · C Inés a cámara.

## Sonido
SFX nuevos de BigSoundBank (CC0), ver fuentes.md: cereal en el plato, masticar, olfateo, suspiro, timbre, papel, bolsa
al piso. Reusados: ladridos CC0 de vacunas, birome (resto-reservas), bsb-rasga (ferreteria-encargo). Narrador reusado
de tienda-tenes-stock (arranca en P1 - 0,1: el wav trae 0,2 s de silencio).

## Pasadas
- **Armado (prev.mjs, 4 vueltas):** la cocina de cuadro 0 pasó por tres cámaras (Vero cortada arriba / tapada por Toto /
  la cabeza bajo "VETERINARIAS") hasta una cámara a la altura del pecho a 3,3 m: Vero entera debajo del chip y Toto de
  perfil con el plato. Burbujas de la cocina al costado de la cabeza (arriba está la caja del rubro). P4 abierto para que
  se vea Inés hablando (antes la tapaba Vero de espaldas) y la torre con Toto. P4c con Inés entera y la torre (rótulo con
  guía a la torre). Receta: era un primer plano 3D con la mano de Inés tapando todo → inserto plano con la lapicera.
  Bruno lleva la bolsa abrazada adelante (al hombro flotaba). Cierre: la tarjeta tapaba la boca de Inés → cámara más baja.
  Burbujas de dos renglones revelan la segunda frase con la voz ("La compro…", "Me llega…").
- **Duración:** primer armado 48,7 s → voces con atempo 1,05-1,12, hueco de "Uy." recortado, insertos y montaje más cortos
  → 42,0 s. La pausa después de "La compro en el súper." (1,05 s) y el olfateo de Toto no se tocaron.
- **Mezcla:** stinger del cartel -31 → -42, whoosh y cama del cartel más bajos, narrador 0,15 s antes, notificación de Q1
  -36 → -45: mínimo voz-resto 6,5 LU.
- **Render 1 (24,6 min, 1260 cuadros, SwiftShader):** hoja cada 0,5 s + 8 cuadros grandes. Corregido: P5 repetía el
  encuadre de P4b durante 6 s seguidos y la cabeza de Inés quedaba cortada en el borde → P5 desde el otro lado del
  mostrador (Vero de frente con el talonario), Inés oculta en ese plano.
- **Render 2:** ver abajo.
