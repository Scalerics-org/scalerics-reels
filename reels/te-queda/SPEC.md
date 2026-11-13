# te-queda · PARA MANDAR completo (3D real), 35,5 s

**De qué trata.** "¿Te queda polenta?" y Rubén baja al sótano a fijarse: la caja vacía, "No, no queda." Walter (fideos:
avalancha, telaraña) y Marta (azúcar: el foco se quema, la caja de sombrero). Héctor: "¿Te queda dulce de leche?":
Rubén se saca la caja, se calza un casco de obra con linterna atada con cinta verde, la expedición (tijera arriba de
todo, se tambalea, crash) y asoma destruido con el frasco en alto: **"Queda uno."** Pausa (polvo que cae en el haz). Héctor:
**"Ah, no. Era para saber."** Remate del remate: "¿Y yerba?" y Rubén le calza el casco a Héctor y le prende la linterna en
la cara. Cartel **"Un sistema / más tarde…"**. Parte 2: Rubén sentado arriba de la trampa cerrada con la tablet "Stock":
"Quedan tres." · Héctor entra con el casco puesto: "¿Y dulce de leche?" / "Doce." / "Era para saber." / **"Ahora
sabés."** · la tablet pide la yerba sola ("Yerba · quedan 2" → "Pedido al proveedor ✓ · Llega el jueves"), chip
"Viajes al depósito: 0" · Héctor, desconfiado, baja él a contar, se le cae una caja ("Viajes de Héctor: 1") y asoma con
la telaraña en el casco: **"Doce."** · Rubén levanta el mate detrás de la tablet resuelta · línea chica.

- **Producto:** sistema de stock a medida (cada venta descuenta, sabés qué queda sin ir a mirar, avisa y arma el pedido
  al proveedor). Solo en la línea chica ("Un sistema te dice qué te queda / y te avisa antes de que se acabe ·
  scalerics.com") y en descripcion.txt. El cartel no dice "Scalerics". Sin marcas. Sin Orus, sin tarjeta de
  videollamada (punto 8d).
- **Recurso visual central:** el edificio en dos pisos (almacén arriba, sótano abajo) unidos por la trampa; la
  escalada en el cuerpo de Rubén (polvo, telaraña, caja de sombrero, casco); el corte de casa de muñecas vertical.
- Plan con segundos y SFX: `plan.md`. Versiones del chiste: `ganchos.md`. Voces: `partes/voces.md`. Notas: `NOTAS-constructor.md`.
- Proyecto como `reels/anotamelo`: todo con `node gen.mjs` (tiempos3d.js, compositions/*.html, index.html, mezcla.wav);
  la escena 3D entera en `assets/tres.js`. `LIMPIO=1 SINAUDIO=1 node gen.mjs` = fondo de portada.

## Paleta y set (para "Hechos")
Almacén de siesta con azulejos crema sobre navy3 + sótano en penumbra navy claro con haz de linterna, corte de casa de
muñecas. Pared navy3 `#1f3254` con azulejos crema `#efeee5` (pastina navy) hasta 1,2 m y listón crema2; piso damero
navy3/crema2; luz de siesta baja y cálida (DirectionalLight `#ffe2b8`) por la ventana de la izquierda; mostrador navy3
con tapa de madera clara. Sótano: ladrillo `#22365a` con juntas `#16243d` (emisivo bajo: penumbra navy, nunca negro),
estantes de ángulo ranurado gris claro, cajas kraft `#c9a46b` escritas en Caveat navy, foco pelado con cadenita (cono
crema de borde marcado). En sección: fondo navy `#0b1220`, tierra `#121c30`, bordes crema de maqueta (~12 px). Rojo
apagado `#c7655b` solo para el problema (chip "Viajes al depósito", "Yerba · quedan 2"); verde `#5ce611` para lo resuelto
(pedido ✓, chip 0) y la cinta de la linterna.

## Personajes (copia local de `reels/anotamelo/assets/personajes.js`, sin cambios)
Rubén (ELENCO.almacenero) · Graciela (ELENCO.clienta) · Walter (ELENCO.walter, mochila) · Marta (ELENCO.duena) · Héctor
(ELENCO.hector; sin boina cuando tiene el casco). Objetos nuevos en `tres.js`: crearCajaKraft (cerrada / abierta con
solapas), crearFrasco (dulce de leche casero, tapa y paño a cuadritos), crearCasco (casco de obra con linterna y dos
vueltas de cinta verde), crearLinternaMano, crearHaz (cono + SpotLight), el foco con cadenita, la trampa (tapa de tablas,
bisagras, argolla), la escalera marinera, la tijera de aluminio, los estantes ranurados, el panel de tierra y los bordes
de maqueta, el polvo (InstancedMesh con semilla), la telaraña (crearTelarana del módulo) y la caja de sombrero.

## Brief por plano (segundos globales; tiempos exactos en assets/tiempos3d.js)
- **P1 0,00** general picado desde el lado del cliente: Graciela de espaldas abajo a la izquierda, Rubén con el mate,
  la trampa con su argolla a la derecha. Gancho-burbuja HTML "¿Te queda **polenta?**" en el cuadro 0. "Ya me fijo." 1,39;
  deja el mate 1,42, va a la trampa, tira de la argolla y la tapa sube contra la pared (1,9-2,3).
- **P2 2,32** la zambullida: la cámara sube sobre el hueco y baja con Rubén por la escalera marinera.
- **P2b 2,70** corte (whoosh) al sótano, general desde adelante: tira de la cadenita (3,0), el foco se prende (3,06) con
  polvo en el cono; baja la caja POLENTA y la sacude frente al pecho: vacía (3,42-3,92).
- **P3 4,02** contraplano bajo desde el piso: asoma con polvo en los hombros: "No, no queda." 4,30; chip 1 (4,42);
  palmea el polvo (4,6).
- **P4 5,58** casa de muñecas (dolly atrás): Walter "¿Y fideos?" 5,76; Rubén baja, tijera, avalancha (7,01), telaraña;
  sube: burbuja "No." y chip 2 (7,99).
- **P5 8,41** la misma sección más abajo: Marta "¿Azúcar te queda?" 8,61; el foco se quema (9,23), linterna de mano
  (9,41), la caja AZÚCAR le cae en la cabeza (9,73); sube: "No." y chip 3 (10,37).
- **P6 10,79** primer plano de Rubén con la caja de sombrero; Héctor (fuera de cuadro) "¿Te queda dulce de leche?"
  10,89; se saca la caja, el casco del costado del mostrador a la cabeza, clic (12,2).
- **P6b 12,45** la expedición en sección (travelling hacia abajo): chip 4; tijera arriba de todo, se tambalea, saca la
  última caja (13,55), crash (13,69); arriba Héctor silba mirando el techo.
- **P7 14,49** grúa: asoma destruido (polvo, telaraña, casco torcido) y levanta el frasco: "Queda uno." 14,94.
- **P8 16,02** la pausa (0,78 s): Héctor de espaldas en primer término, Rubén al fondo con el frasco; la telaraña se
  descuelga; música -12 dB.
- **P9 16,80** Héctor de frente: "Ah, no." 16,88 / "Era para saber." (+0,74); se toca la boina.
- **P10 18,63** hacia la puerta: Héctor se da vuelta: "¿Y yerba?" 19,11; Rubén entra de la derecha, le calza el casco
  (19,85-20,15) y le prende la linterna (clic 20,21); Héctor parpadea; push-in a su cara.
- **Cartel 20,66-23,36** "Un sistema / más tarde…" (verde con manchas, letras que rebotan; Rasalgethi); entra con corte
  seco, sale con iris.
- **Q1 23,36** el encuadre de P1: la trampa cerrada, Rubén en el banquito arriba, la tablet "Stock". "¿Te queda polenta?"
  23,56 (misma toma); mira la tablet (la fila Polenta en verde) "Quedan tres." 24,60.
- **Q2 25,57** el encuadre de P8 (callback): Héctor con el casco puesto y la linterna prendida: "¿Y dulce de leche?"
  25,93; "Doce." 27,04.
- **Q3 27,75** Héctor (con casco) "Era para saber." · **Q3b 28,74** Rubén con el mate: "Ahora sabés." 28,79.
- **Q4 29,85** la tablet: vibra (29,95) "Yerba · quedan 2" → "Pedido al proveedor ✓ · Llega el jueves" (30,40); chip
  "Viajes al depósito: 0" en verde (30,53).
- **Q5 31,10** sección (callback de P4): seña, Rubén se corre con el banquito, Héctor abre la trampa y baja, cuenta los
  frascos, se le cae una caja (32,54) "Viajes de Héctor: 1"; sube con la telaraña en el casco: "Doce." 33,04.
- **Q6 33,64** Rubén detrás de la tablet resuelta levanta el mate; línea chica desde 33,69. Fin 35,49.
