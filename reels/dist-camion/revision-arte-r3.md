# dist-camion · revisión de arte r3 (FINAL, QA visual independiente sobre renders/dist-camion-final.mp4, 45,97 s)

Cuadros en /tmp/claude-0/-home-user-scalerics-reels/e7134b03-b34e-5982-a6c2-3d3afd5d546e/scratchpad/qa-camion-r3/
(`hoja1-8.png` = cada 0,25 s con la hora impresa; `cortes/c_<t>.png` = 30 fps ±0,3 s en cada corte; `v_g_a*.png` = esas tiras
apiladas; `full/t_<t>.png` = cuadros a 540 px; detalles: `p6a.png`, `ruso1.png`, `brazo19.png`, `cajas.png`, `caja14.png`,
`cartel.png`, `q1panel.png`, `inicio.png`, `g.png`, `portada.png` con las líneas y 285/1635 en rojo).
Cortes detectados (scene>0,25): 1,77 · 2,87 · 5,07 · 6,0 · 8,9 · 12,6 · 13,7 · 15,03 · 16,17 · 19,9 · 20,33 · iris ~22,3 · 23,43 ·
25,2 · 27,13 · 27,93 · 29,1 · 32,17 · 34,27 · 34,87 · 35,97 · 38,07 · 38,93 · 39,67 · 41,1 · 42,27. Ninguno en negro, ninguno
con un cuadro colado de la cámara anterior, ningún texto fantasma en los cortes.

## Estado de la ronda 2
- ALTA 1 (puño del Ruso en la nariz, P6a 12,6-13,7): **resuelto.** El brazo va estirado a la altura del hombro hacia la persiana,
  el puño queda lejos de la cara en todo el plano (`p6a.png`).
- Media 1 (barba/pelo del Ruso): **resuelto.** Barba candado con volumen en mentón y bigote, sin la cáscara que partía la cabeza;
  pelo rapado con textura y borde difuminado, sin casquete (`ruso1.png`, `full/t_39.4.png`).
- Media 2 (hora de Q1): **resuelto.** A las 9:40 el panel dice "4 de 18", Parada 4 ✓ 9:28, Parada 5 Rotisería Graciela llega 10:05,
  Parada 6 10:20; cuentas coherentes (4+1+13 = 18; luego 14+1+3, 15+1+2, 18 de 18) (`q1panel.png`).
- Media 3 (oficina P5/Q3 chica): **resuelto en lo grave** (plano medio, cabezas ~2x, casi sin techo). Queda ~22 % de abajo de
  frente navy del escritorio (baja 1).
- Media 4 (mate contra la cara en el cierre): **resuelto.** Mate a la altura del pecho, separado de la cara (`full/t_42.4.png`).
- Media 5 (barra negra en Q4i): **resuelto.** Queda un tirador gris de la puerta a la izquierda que se lee como utilería.
- Bajas r2: P4b (resuelto: celular grande, rótulo desde el primer cuadro), Q4r (mejoró, ver baja 5), globo de dos tiempos
  (resuelto: "Es un camión, Nico." no cambia de tamaño), chip de hora con el iris (resuelto), piernas bajo la tarjeta (resuelto:
  la franja navy entra con la tarjeta). Siguen: manos tipo manopla, cola del globo de Marta cerca del rodete, MARTA cortada abajo
  en P6c, pulgar suelto y dedo sobre "Recibió" en Q4i.

## ALTA (no se entrega así)
Ninguna.

## MEDIA
1. **18,9-19,9 (P6c, "Uno que pasaba.") · el antebrazo cruzado del Ruso se lee como un cilindro con punta redonda saliendo
   horizontal de la panza**, de perfil y sin mano reconocible. A tamaño celular puede leerse como algo fálico (justo en el remate
   del "señor"), que es el tipo de cuadro que alguien recorta y comenta por el lado equivocado. `brazo19.png`, `ruso1.png` (3.º).
   Cambiar: que el gesto sea otro (encoger hombros, mano abierta al costado, señalar con el pulgar hacia atrás) o que el
   antebrazo quede pegado al cuerpo y la mano se lea como mano (dedos/pulgar). No bloquea por sí solo, pero conviene antes de
   publicar si el arreglo es barato.

## BAJA
1. 6,0-8,9 y 29,1-32,2 (P5/Q3): el ~22 % de abajo es el frente navy liso del escritorio (`full/t_7.0.png`, `hoja6.png`). Aceptable;
   si se toca, bajar el encuadre ~150 px.
2. 13,9-14,8 (P6b): la línea guía de "Cafetería Marta · vuelve al depósito" termina en las piernas del Ruso hasta que cae la
   caja debajo (~14,8); y las cajas que bajan aparecen en el aire delante de su panza/cabeza durante 2-3 cuadros cada una
   (14,3; 14,7) (`cajas.png`, `caja14.png`). Que la guía apunte a la pila del piso y que las cajas bajen por detrás o al costado.
3. 28,6-28,73 (Q2): el cartel "Fui al banco" se despega de la mano de Marta y se hunde atravesando la tapa del mostrador en ~4
   cuadros (`cartel.png`). Que lo baje con la mano o que salga por detrás del mostrador.
4. 23,4-29,1 (Q1i, Q2i, Q2) y 36-38 (Q4i): manos tipo manopla; en Q2 la mano de Marta sigue tapando la "h" de "hora" del cartel;
   en Q4i el pulgar izquierdo es una salchicha suelta y el dedo tapa "Recibió: Héctor" mientras firma (`full/t_36.5.png`).
5. 34,27-34,87 (Q4r): la hoja de ruta ocupa ~50 % del ancho; "14 · Panadería Nelly" y "16 · Cafetería Marta" quedan en ~30 px
   (`full/t_34.5.png`). Plano de 0,6 s, se entiende igual.
6. 38,5-38,9 (Q4p): el chip "Entregado ✓" todavía pisa el texto de la fila 2-3 cuadros antes de fundirse ("Súp Entregado ✓"), y
   entra cortado por el borde derecho mientras vuela (`full/t_38.25.png`, `v_g_ae.png` fila 2).
7. 41,1-42,2 (Q5d): la cola del globo "Ni uno." cae entre las dos cabezas, más cerca de Rubén que de la boca del Ruso
   (`full/t_41.6.png`). Correrla ~80 px a la izquierda, sobre la cara del Ruso.
8. 0,0-0,1: el globo de Graciela aparece en el cuadro 3 (los 3 primeros cuadros solo tienen sello y chip) y el rótulo "Rotisería
   Graciela" roza el mentón de Graciela (`inicio.png`, `full/t_1.0.png`). El gancho igual está entero en el cuadro 0.
9. 12,6-19,9 y 35-42 (el Ruso de perfil/tres cuartos): el ojo sobresale del contorno de la cabeza. Es la convención del estilo
   (también en otros personajes), se nota solo de espaldas.
10. 16,2-19,9 (P6c): la etiqueta "MARTA" de la caja de adelante sigue cortada por el borde inferior.

## Portada
`portada.png` (t 1,2, `fondo_limpio`): corresponde al cuadro 0 actual (pantalla partida Graciela/Rubén, rotisería), sin texto del
video asomando, sello "DISTRIBUIDORAS" verde, `chica` "Martes, 9:40.", `grande` "¿Por dónde viene?" (3 palabras), todo lo
importante entre y ~300 y ~1590 (dentro de 285-1635). Graciela llena la mitad de arriba. OK.

## Lo que está bien
Cuadro 0 con el rubro y la escena en curso; parte 1 con globos sin pisarse ni tapar caras; persiana y cartel legibles; remito
grande; cartel verde sin "Scalerics" y con el iris abriendo sobre la escena; la parte 2 (aviso, panel, hoja de ruta, remito con
firma y foto, "18 de 18 · 0 cajas de vuelta") grande y legible y con horas coherentes; cierre con el mate al pecho y la tarjeta
CAMIÓN 3,2 s sin piernas asomando ni texto fantasma. Ortografía correcta en globos, rótulos y pantallas ("¿Qué… señor?",
"Vos. No un señor.", "Cafetería", "Rotisería", "remito firmado", "CAMIÓN").

## Veredicto
**Se puede entregar.** No hay defectos de gravedad alta; las 5 medias de r2 y la alta están resueltas. Queda 1 media (el
antebrazo del Ruso en 18,9-19,9, riesgo de lectura equivocada) que recomiendo arreglar si cuesta poco, y bajas de pulido.
