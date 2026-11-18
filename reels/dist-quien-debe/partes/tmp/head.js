// Capa 3D de dist-quien-debe (Three.js r170 local). Base técnica: reels/dist-cliente-grande (utilidades, tarjetas
// pegadas a la cámara, rótulos con guía, catmull() quieto después de la última clave), reels/ya-lo-cargo (la rotisería
// de Graciela con el spiedo) y reels/contable-papeles / tienda-tenes-stock (celular sostenido, regla de burbujas con la
// cola a la boca). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin
// semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   EL BANCO (alrededor del origen): el box de atención a empresas. Escritorio en el origen (x ±0,75); Patricia del lado
//     -x mirando a +x, Rubén del lado +x mirando a -x, los dos abiertos a la cámara (+z). El monitor en brazo giratorio al
//     medio, el turnero colgado arriba a la derecha, la mampara esmerilada a la izquierda (x = -2,2), la pared crema al
//     fondo (z = -1,7) y la sala de espera hacia +x (sillas, el cartel ATENCIÓN EMPRESAS).
//   EL BOX DE INVERSIONES (x = 20): pared navy2, sillón capitoné, cuadro, lámpara de pie, mesita con el café.
//   LA ROTISERÍA DE GRACIELA (x = 40): azulejo con guarda verde, el mostrador, el spiedo con los pollos, la pizarra.
//   EL MUELLE DE LA DISTRIBUIDORA (x = 60): portón navy3, la camioneta de reparto, Nico.
//   LA OFICINA DE RUBÉN (x = 80): el panel de cuentas por cobrar en el monitor grande (Q2).
//   La pantalla partida (P4, Q4) se arma con dos cámaras (arriba el banco, abajo la rotisería) y una pasada más para las
//   burbujas pegadas a la cámara principal.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, MARCA, CARA, BRAZOS, pegarACamara, crearMate, crearTermo } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER as VERM } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"')]);

// ---------- utilidades ----------
