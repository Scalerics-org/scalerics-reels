# ya-lo-cargo · SPEC (línea "Para mandar", formato completo, 3D real) · 33,74 s

**De qué trata.** El vendedor que toma el pedido y no lo carga. Nico le dice "Ya lo cargo." a Graciela (rotisería) y a
toda la ronda; cada pedido es un globo de chat 3D que se queda en su auto hasta llenarlo. El lunes Graciela llama a
Rubén ("Rubén, ¿y la harina?"), el monitor dice "ninguno", entra el auto lleno de globos con el celular al 100 %: "Lo
único que carga Nico es el celular." · "¡Nico!" / "¡Ya lo cargo!" · el bip del autoelevador · Rubén levanta el auto con
Nico adentro y lo mete en el camión: "Ya lo cargué." · desde adentro, ahogado: "Sí, sí. Ya lo cargo." · Cartel "Un
sistema más tarde…" · Parte 2: "Ya lo car…" y el sistema lo carga antes (tarjeta "Cargado ✓" que vuela por la misma
calle hasta el pallet GRACIELA y la ficha) · "Rubén, ¿lo de Graciela?" / "Ya salió." · Rubén gira el autoelevador hacia
Nico y levanta un poquito las horquillas; Nico se va marcha atrás.

**Recurso visual central:** los globos de chat 3D que llenan el auto (el pedido sin cargar hecho objeto) y el
autoelevador (el juego de palabras hecho imagen). Plan completo, objetos y paleta: `plan.md` (manda sobre este SPEC
en lo que no se cambió; los cambios de puesta están abajo). Guion: `guion.txt`. Voces: `partes/voces.md`.

**Cómo está hecho:** como `reels/anotamelo` y `reels/te-queda`. Todo sale de `node gen.mjs` (beats `T`, capa HTML: el
gancho-burbuja, el cartel y la línea chica; `index.html`; la mezcla). La escena 3D entera está en `assets/tres.js`
(un solo mundo con dos lugares lejos: la calle en x≈0 y la distribuidora en x=100; cada uno se dibuja solo cuando la
cámara está ahí). `assets/personajes.js` = el de anotamelo (rodilla, `sentado`) + `ELENCO.ruben` copiado de abren-hoy.

**Paleta / set (para "Hechos"):** distribuidora de día, piso crema2 `#dcd9c8`, paredes navy `#2c4268`, racks navy3 con
largueros verde de marca, oficina vidriada arriba con baranda verde; calle de mediodía (cielo `#b9cde0`, fachadas
crema/navy, carteles de bandera) y la rotisería (azulejo blanco, guarda verde, spiedo en la vidriera).

## Cambios de puesta respecto de plan.md (el formato vertical no deja ver dos personajes de costado)
- **P1 / Q1:** cámara detrás del mostrador: Graciela de espaldas en primer término (abajo a la izquierda), Nico de
  frente al otro lado del mostrador, el spiedo en la vidriera detrás de él (doble vidrio: se ve desde adentro) y el
  auto estacionado afuera por la ventana. El iris de la parte 2 abre desde el celular de Nico.
- **P1b:** corte a la vereda (no la dolly a través de la vidriera): Nico sale con el globo al lado de la cabeza, abre
  la puerta del acompañante y el globo entra apretado.
- **P2:** el auto de frente (por el parabrisas se ven Nico al volante y los globos que se juntan); cada cliente sale al
  cordón al lado de la trompa (Marta, Tito del bar, Elsa del kiosco). Los locales se leen en carteles de bandera.
- **P3:** no sale ningún camión del muelle (el mismo camión espera en P7): general bajo con racks + grúa al ventanal.
- **P4b:** detrás de la cabeza de Rubén (no por encima del hombro: está sentado al escritorio, lejos del vidrio).
- **P5:** detrás de Rubén en la baranda (picado), el auto abajo. **P5b:** contrapicado desde el piso: Nico asomado a la
  ventanilla, Rubén arriba en la baranda.
- **P8:** Rubén de pie al costado derecho del camión; las puertas se cierran al empezar el plano.
- **Q3/Q4:** detrás del auto limpio, que frena donde en la parte 1 lo levantaron; el autoelevador (Rubén, mate en el
  portavasos) sube la rampa con el pallet de harina; Nico asomado; "Ya salió." de espaldas (sin mirarlo); Rubén gira
  el autoelevador 180° hacia el auto y sube las horquillas (bip, bip); Nico se va marcha atrás. Las puertas del camión
  se cierran solas (no hay plano de Rubén cerrándolas con la mano).

## Planos (segundos)
| plano | desde | qué |
|---|---|---|
| P1 | 0,00 | gancho-burbuja HTML "Ya lo **cargo.**" (cola a Nico) + globo de Graciela "Cuarenta de harina / para el lunes."; "Ya lo cargo." 0,30; pulgar 0,75; el globo de chat "40 harina · lunes" sale del celular 1,00 y flota a su derecha; 1,45 se da vuelta y va a la puerta |
| P1b | 1,72 | la vereda: el globo lo sigue, abre la puerta 2,05, el globo entra 2,20-2,50, cierra 2,55 |
| P2 | 2,70 | la ronda (travelling de frente): Marta 2,95 "¿Me sumás dos de azúcar?" 3,00 · "Ya lo cargo." 4,68 (globo "2 azúcar") · bar 5,75 · kiosco 6,35 · ráfaga 6,95/7,25/7,55 · lleno 7,90 (aplastados, cachete) y push-in |
| P3 | 8,40 | el depósito: grúa al ventanal; Rubén al escritorio; teléfono 9,30; altavoz 9,55; "Rubén, ¿y la harina?" 9,65 |
| P4 | 10,75 | inserto del monitor: "ninguno" 10,90 |
| P4b | 11,35 | detrás de la cabeza de Rubén: entra el auto lleno; "Lo único que carga Nico es el celular." 11,45 |
| P4c | 12,65 | inserto del tablero: el celular enchufado, 100 % |
| P5 | 13,75 | Rubén en la baranda: "¡Nico!" 13,90 |
| P5b | 14,40 | contrapicado: baja la ventanilla, Nico asomado "¡Ya lo cargo!" 14,60 |
| P6 | 15,44 | la pausa: bip ×3 (15,54/15,94/16,34), mate en la baranda 15,99, música -12 dB |
| P7 | 16,44 | el autoelevador levanta el auto (16,49-16,79), rampa (16,79-17,39), adentro (17,39-17,64); "Ya lo cargué." 17,69 |
| P8 | 18,49 | las puertas se cierran; celular ahogado 18,54; "Sí, sí. Ya lo cargo." 18,74 (burbuja aplastada en la rendija); palmadas 20,47/20,67; arranca 20,79 |
| cartel | 21,49 | "Un sistema / más tarde…" (Rasalgethi +0,15) |
| Q1 | 23,99 | el encuadre de P1: toques 24,24/24,44; "Ya lo car…" 24,59; ding 24,97; la tarjeta vuela |
| Q2 | 25,47 | la tarjeta por la calle; 26,22 el depósito: entra por el portón, se parte 26,52, tilde del pallet 26,77, 4 bolsas 26,89-27,34 |
| Q2b | 27,64 | inserto del monitor: la ficha 27,94 |
| Q3 | 28,44 | detrás del auto: el autoelevador sube la rampa con el pallet; entra el auto 28,74; "Rubén, ¿lo de Graciela?" 29,34; puertas 30,82; "Ya salió." 31,09 |
| Q4 | 31,84 | el camión sale; pulgar; gira y sube las horquillas 32,29 (bip, bip); marcha atrás 32,84; línea chica 32,14-33,74 |

Ver `molde/SPEC-base.md` para lo que vale de base (copia en `SPEC-base.md`); este reel no usa subtítulos karaoke: el
texto va en burbujas (se entiende sin sonido).
