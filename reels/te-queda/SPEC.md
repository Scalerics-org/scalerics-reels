# te-queda · PARA MANDAR completo (3D real), 32,0 s (ronda 1: sin Q5; planos y tiempos vigentes en NOTAS-constructor.md, "Ronda 1")

**De qué trata.** "¿Te queda polenta?" y Rubén baja al sótano a fijarse: la caja vacía, "No, no queda." Walter (fideos:
avalancha, telaraña) y Marta (azúcar: el foco se quema, la caja de sombrero). Héctor: "¿Te queda dulce de leche?":
Rubén se saca la caja, se calza un casco de obra con linterna atada con cinta verde, la expedición (tijera arriba de
todo, se tambalea, crash) y asoma destruido con el frasco en alto: **"Queda uno."** Pausa (polvo que cae en el haz). Héctor:
**"Ah, no. Era para saber."** Remate del remate: "¿Y yerba?" y Rubén le calza el casco a Héctor y le prende la linterna en
la cara. Cartel **"Un sistema / más tarde…"**. Parte 2: Rubén sentado arriba de la trampa cerrada con la tablet "Stock":
"Quedan tres." · Héctor entra con el casco puesto: "¿Y dulce de leche?" / "Doce." / "Era para saber." / **"Ahora
sabés."** · la tablet avisa sola ("Yerba · quedan 2" → "Pedido armado ✓"), chip "Viajes al depósito: 0" · Rubén levanta el mate
detrás de la tablet resuelta · línea chica.

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

## Brief por plano (ronda 1, segundos globales; tiempos exactos en assets/tiempos3d.js)
- **P1 0,00** picado desde el lado del cliente: Graciela de espaldas abajo a la izquierda, Rubén con el mate, la trampa con
  la argolla a la derecha. Gancho-burbuja "¿Te queda **polenta?**" (cola a Graciela). "Ya me fijo." 1,35; deja el mate,
  va a la trampa, la tapa sube contra la pared (1,74-2,12).
- **P2 2,15** la zambullida sobre el hueco · **P2b 2,53** corte al sótano: cadenita 2,80, foco 2,86, la caja POLENTA vacía.
- **P3 3,68** asoma con polvo: "No, no queda." 3,96; chip 1.
- **P4 5,24** casa de muñecas (un solo plano): Walter "¿Y fideos?" 5,42; tijera, avalancha 6,46; "No." + chip 2 7,34;
  Marta (ya llegó) "¿Azúcar te queda?" 7,64; el foco se quema 8,14; linterna; la caja en la cabeza 8,57; "No." + chip 3 9,13.
- **P6a 9,55** Héctor en el mostrador: "¿Te queda dulce de leche?" 9,65 · **P6 10,27** Rubén con la caja de sombrero; casco,
  clic 10,96 · **P6b 11,21** la expedición: chip 4, tijera arriba, crash 12,30.
- **P7 12,98** asoma destruido con el frasco: "Queda uno." 13,38 · **P8 14,46** la pausa (Rubén solo, polvo en el haz).
- **P9 15,14** Héctor: "Ah, no." 15,22 · (0,5 s) · "Era para saber." 16,28.
- **P10 17,25** a la puerta: "¿Y yerba?" 17,67; el casco a la cabeza de Héctor (18,26-18,56), clic 18,62.
- **Cartel 19,00-21,40** "Un sistema / más tarde…".
- **Q1 21,40** el encuadre de P1 con la tablet: "¿Te queda polenta?" / "Quedan tres." 22,65 · **Q2 23,62** Héctor con
  casco: "¿Y dulce de leche?" / "Doce." 25,01 · **Q3 25,72** "Era para saber." · **Q3b 26,71** "Ahora sabés."
- **Q4 27,82** la tablet: "Yerba · quedan 2" (27,92) → "Pedido armado ✓" (28,77); chip 0 (28,89).
- **Q6 29,74** Rubén levanta el mate detrás de la tablet resuelta; línea chica 29,79-32,04.
