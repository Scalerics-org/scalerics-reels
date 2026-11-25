// Capa 3D de gym-cupo (Three.js r170 local). Base técnica: reels/pilates-cuota (globos pegados a la cámara en píxeles de
// pantalla, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom, insertos a pantalla completa). renderAt(t) es
// una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// UN lugar: la sala de spinning de "Estudio Mauro", de noche: pared del fondo navy oscuro con la franja diagonal crema y la
// tira de luz verde, piso de goma grafito, 14 bicis numeradas en tres filas (4 · 5 · 5) mirando a la tarima del profe,
// el reloj digital verde, la puerta de vidrio esmerilado, el ventilador de pie. El living de Majo (Q1) es un set chico aparte
// (x = 40). La recepción va en los insertos (la tablet sobre el mostrador, de fondo plano).
//   PARTE 1: el grupo que se llena de "yo voy" · "Veintidós «yo voy». Hoy explota." · el audio de Majo y "Llena" · 19:00
//            entran nueve · cinco bicis de perchero · "Los «yo voy» no pedalean." · 19:04 "Rodri: ¿Ya empezó? Yo voy."
//   PARTE 2: el mapa con cupo real · "¿Quedan tres? ¡La siete!" · lista de espera · el recordatorio y "Liberar mi bici" ·
//            el aviso a la siguiente · 14 de 14 · la toalla de Graciela · el panel · "Comentá CUPO…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet, crearMochila, crearCamperaColgada } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER } from "./tiempos3d.js";
