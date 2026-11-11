// Capa 3D de hacen-envios (Three.js r170 local). Base técnica: reels/me-haces-precio (globos pegados a la cámara en
// píxeles de pantalla, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom) y reels/abren-hoy-completo.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo set: una CUADRA DE BARRIO A LA HORA AZUL. Cielo navy claro #16243d plano, fachadas crema, adoquines navy,
// línea del medio discontinua crema. Del lado de abajo (z > 0) el almacén de Rubén (toldo verde, vidriera cálida) y la
// cafetería; enfrente (z < 0) la casa de Héctor (ventana-puerta con reja baja) y dos casas de dos pisos.
//   PARTE 1: "¿Hacen envíos?" · Rubén cruza 4 veces (yerba, pan, hielo, cambio) · al quinto mensaje se sienta en un
//            cajón sobre la línea del medio, termo y cartón SUCURSAL: "Abrimos sucursal." · grúa: se prenden las 7
//            ventanas de la cuadra, cada una con su "¿Hacen envíos?", y el farol se prende sobre Rubén.
//   PARTE 2: Héctor paga en la tienda y elige retiro · cruza él en pantuflas · "¡Qué cerquita que quedás, Rubén!" · Nico
//            sale en la moto con los envíos pagos de lejos · la cuadra cruza en fila, en pantuflas, con sus pedidos pagos.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import {
  crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, MARCA, poseEn, CARA, BRAZOS, saludo, pegarACamara,
  crearMate, crearTermo, crearCelular, crearYerba, crearPanFlauta, crearBillete, crearBolsaPapel, crearPapelito,
  crearGalletitas, crearPolenta,
} from "./personajes.js";
import { T, DUR, P1, P2, ENV, CORO, LIMPIO } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"')]);

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const r2 = (n) => Math.round(n * 100) / 100;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
const en = (t, a, b) => t >= a && t < b;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const CIELO = new THREE.Color(0x16243d), CIELO2 = new THREE.Color(0x13203a);
scene.background = CIELO.clone();   // plano, sin degradé (compresión de Instagram)
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.03, 120);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x2a3550);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(12, 3, 0, 7, 0, 0, 0x9fb4e0, 1.1);     // el cielo de la hora azul
  tira(3, 3, -6, 1, 2, Math.PI / 2, 0xffc68a, 1.2);   // las vidrieras cálidas
  tira(3, 3, 6, 1, -2, Math.PI / 2, 0xffc68a, 0.9);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.45;

// ---------- luces: luna/cielo frío de adelante-arriba (la principal, con sombra), cielo hemisférico, contraluz frío,
// la luz cálida del almacén, el relleno desde la cámara, y el farol (se prende dos veces) ----------
const sol = new THREE.DirectionalLight(0xdfe6ff, 2.1);
sol.position.set(4.5, 10, 9); sol.target.position.set(0, 0, -0.5);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0008; sol.shadow.radius = 3;
Object.assign(sol.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 40 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xb8c6ec, 0x2a2a3a, 1.0); scene.add(cielo);
const rim = new THREE.DirectionalLight(0x9fb4ff, 0.9); rim.position.set(-4, 5, -9); scene.add(rim);
const relleno = new THREE.DirectionalLight(0xfff1e0, 0.55); scene.add(relleno, relleno.target);
const luzAlmacen = new THREE.PointLight(0xffb468, 7, 9, 1.4); luzAlmacen.position.set(-0.3, 2.8, 5.8); scene.add(luzAlmacen);
const luzHector = new THREE.PointLight(0xffb468, 2.2, 3.5, 1.5); luzHector.position.set(-0.4, 2.0, -4.9); scene.add(luzHector);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, maderaC: 0xc89a64, mostaza: 0xd9a441, calido: 0xe9a65a };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6),
  cr: mat(C.cr, 0.7), cr2: mat(C.cr2, 0.75), cr3: mat(C.cr3, 0.7), madera: mat(C.madera, 0.6), maderaC: mat(C.maderaC, 0.6), g: mat(C.g, 0.5), red: mat(C.red, 0.55),
  vidrioCalido: new THREE.MeshBasicMaterial({ color: 0xf0b06a, toneMapped: false }),
  apagada: new THREE.MeshBasicMaterial({ color: 0x0e182b, toneMapped: false }),
  hierro: mat(0x10161f, 0.4, { metalness: 0.4 }),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
let semilla = 11;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ================= LA CUADRA =================
// x: a lo largo de la calle. z: cruzando (z > 0 la vereda del almacén, z < 0 la de enfrente). La calzada va de -RW a
// RW; las veredas hasta las fachadas en ±FZ; las veredas están VER más altas que la calle.
const RW = 2.6, FZ = 4.0, VER = 0.1, FD = 0.24;   // FD: espesor de las fachadas
const alturaPiso = (z) => (Math.abs(z) > RW ? VER : 0);
// la puerta del almacén (A) y la reja de Héctor (B): el camino de los 14 pasos
const PUERTA_A = V3(1.4, 0, FZ + 0.25), A = V3(1.4, 0, 3.75), HEC = V3(-0.4, 0, -FZ - 0.12), B = V3(-0.32, 0, -3.3);
const uS = (A.z - 0) / (A.z - B.z);   // fracción del camino donde cruza la línea del medio
const S = A.clone().lerp(B, uS);       // la "sucursal"
const caminoAB = (u) => { const p = A.clone().lerp(B, cl(u, -0.2, 1.2)); p.y = alturaPiso(p.z); return p; };
const GIRO_AB = Math.atan2(B.x - A.x, B.z - A.z), GIRO_BA = Math.atan2(A.x - B.x, A.z - B.z);
{
  // calzada de adoquines navy3 con juntas navy (relieve con un mapa de normales pintado: piedras bombeadas)
  const W = 1024;
  const adoq = lienzo(W, W, (x) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, W);
    const fil = 8, col = 6, h = W / fil, w = W / col;
    for (let j = 0; j < fil; j++) for (let i = -1; i <= col; i++) {
      const off = (j % 2) * w * 0.5, k = ((i * 7 + j * 13) % 5) / 5;
      x.fillStyle = k < 0.4 ? "#1f3254" : k < 0.8 ? "#22375c" : "#1c2e4e";
      x.beginPath(); x.roundRect(i * w + off + 7, j * h + 7, w - 14, h - 14, 16); x.fill();
    }
  });
  adoq.wrapS = adoq.wrapT = THREE.RepeatWrapping; adoq.repeat.set(16, 3.2);
  const nor = lienzo(W, W, (x) => {
    x.fillStyle = "rgb(128,128,255)"; x.fillRect(0, 0, W, W);
    const fil = 8, col = 6, h = W / fil, w = W / col;
    for (let j = 0; j < fil; j++) for (let i = -1; i <= col; i++) {
      const off = (j % 2) * w * 0.5, X = i * w + off + 7, Y = j * h + 7, ww = w - 14, hh = h - 14;
      x.fillStyle = "rgb(88,128,235)"; x.fillRect(X, Y, 10, hh); x.fillStyle = "rgb(168,128,235)"; x.fillRect(X + ww - 10, Y, 10, hh);
      x.fillStyle = "rgb(128,168,235)"; x.fillRect(X, Y, ww, 10); x.fillStyle = "rgb(128,88,235)"; x.fillRect(X, Y + hh - 10, ww, 10);
    }
  });
  nor.colorSpace = THREE.NoColorSpace; nor.wrapS = nor.wrapT = THREE.RepeatWrapping; nor.repeat.copy(adoq.repeat);
  const calle = mesh(new THREE.PlaneGeometry(60, 2 * RW), new THREE.MeshStandardMaterial({ map: adoq, normalMap: nor, normalScale: new THREE.Vector2(0.8, 0.8), roughness: 0.75 }), 4, 0, 0);
  calle.rotation.x = -Math.PI / 2; calle.castShadow = false; scene.add(calle);
  // la línea del medio, discontinua y gruesa (protagonista del remate)
  for (let x = -30; x < 36; x += 1.6) scene.add(mesh(rbox(0.95, 0.012, 0.16, 0.005, 1), mat(C.cr, 0.6), x, 0.006, 0));
  // cordones y veredas de baldosa crema2
  const baldosa = lienzo(512, 512, (x) => { x.fillStyle = "#b4b2a3"; x.fillRect(0, 0, 512, 512); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#cfcdbe"; x.fillRect(i * 128 + 4, j * 128 + 4, 120, 120); } });
  baldosa.wrapS = baldosa.wrapT = THREE.RepeatWrapping; baldosa.repeat.set(40, 1.2);
  for (const s of [-1, 1]) {
    const v = mesh(new THREE.BoxGeometry(60, VER, FZ - RW + 0.3), new THREE.MeshStandardMaterial({ map: baldosa, roughness: 0.8 }), 4, VER / 2, s * (RW + (FZ - RW + 0.3) / 2)); v.castShadow = false; scene.add(v);
    scene.add(mesh(new THREE.BoxGeometry(60, VER + 0.03, 0.16), M.cr2, 4, (VER + 0.03) / 2, s * (RW + 0.08)));
  }
}

// ---------- fachadas con huecos (ExtrudeGeometry): { x0, x1, h, lado (+1 almacén / -1 enfrente), color, huecos } ----------
// cada hueco [x0, x1, y0, y1]. Lado -1: la cara a la calle en z = -FZ (mira a +z). Lado +1: en z = FZ (mira a -z).
const CUARTOS = [];   // los cuartos detrás de las ventanas (fondo emisivo que se prende)
function fachada({ x0, x1, h, lado, color = C.cr, huecos = [], zocalo = C.navy3, cornisa = C.cr2, cuerpo = true }) {
  const sh = new THREE.Shape(); sh.moveTo(x0, 0); sh.lineTo(x1, 0); sh.lineTo(x1, h); sh.lineTo(x0, h); sh.closePath();
  for (const [a, b, c, d] of huecos) { const p = new THREE.Path(); p.moveTo(a, c); p.lineTo(a, d); p.lineTo(b, d); p.lineTo(b, c); p.closePath(); sh.holes.push(p); }
  const geo = new THREE.ExtrudeGeometry(sh, { depth: FD, bevelEnabled: false, curveSegments: 2 });
  const m = mesh(geo, mat(color, 0.85), 0, 0, lado > 0 ? FZ : -FZ - FD); scene.add(m);
  // zócalo navy3 (hasta 0,45) y cornisa arriba
  const zf = lado > 0 ? FZ - 0.02 : -FZ + 0.02;
  const tramos = [];
  let xa = x0; for (const [a, b, c] of [...huecos].filter((q) => q[2] < 0.45).sort((p, q) => p[0] - q[0])) { tramos.push([xa, a]); xa = b; } tramos.push([xa, x1]);
  for (const [a, b] of tramos) if (b - a > 0.02) scene.add(mesh(new THREE.BoxGeometry(b - a, 0.45, 0.05), mat(zocalo, 0.7), (a + b) / 2, 0.225 + VER / 2, zf));
  scene.add(mesh(rbox(x1 - x0 + 0.1, 0.16, 0.34, 0.02), mat(cornisa, 0.8), (x0 + x1) / 2, h - 0.08, lado > 0 ? FZ + 0.06 : -FZ - 0.06));
  // el cuerpo de la casa, 1,1 m más atrás (los cuartos de las ventanas quedan en el hueco)
  if (cuerpo) { const prof = 5; scene.add(mesh(new THREE.BoxGeometry(x1 - x0, h, prof), mat(color, 0.9), (x0 + x1) / 2, h / 2, lado * (FZ + 1.1 + prof / 2))); }
  return m;
}
// marco de una ventana (alféizar, dintel y jambas) y su cuarto: un fondo que se prende (cálido) o queda apagado
function ventana(x0, x1, y0, y1, lado, { postigos = false, reja = false } = {}) {
  const zf = lado > 0 ? FZ : -FZ, out = -lado;   // out: hacia la calle
  const g = new THREE.Group(); scene.add(g);
  const w = x1 - x0, hh = y1 - y0, xc = (x0 + x1) / 2;
  g.add(mesh(rbox(w + 0.22, 0.08, 0.2, 0.02), M.cr2, xc, y0 - 0.04, zf + out * 0.06));   // alféizar
  g.add(mesh(rbox(w + 0.16, 0.08, 0.12, 0.02), M.navy3, xc, y1 + 0.04, zf + out * 0.03));
  for (const xx of [x0 - 0.04, x1 + 0.04]) g.add(mesh(rbox(0.08, hh + 0.08, 0.1, 0.02), M.navy3, xx, (y0 + y1) / 2, zf + out * 0.025));
  if (postigos) for (const [xx, s] of [[x0 - 0.05 - w * 0.19, -1], [x1 + 0.05 + w * 0.19, 1]]) {
    const p = mesh(rbox(w * 0.38, hh, 0.04, 0.01), M.navy3, xx, (y0 + y1) / 2, zf + out * 0.05); g.add(p);
    for (let k = 0; k < 5; k++) g.add(mesh(new THREE.BoxGeometry(w * 0.3, 0.025, 0.02), mat(C.edge, 0.6), xx, y0 + hh * (0.15 + k * 0.17), zf + out * 0.075));
  }
  // el cuarto: un fondo 1 m adentro, más grande que el hueco, y el piso
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(w + 1.4, hh + 1.2), M.apagada.clone());
  fondo.position.set(xc, (y0 + y1) / 2, zf - out * 1.0); fondo.rotation.y = lado > 0 ? Math.PI : 0; scene.add(fondo);
  const piso = new THREE.Mesh(new THREE.PlaneGeometry(w + 1.4, 1.1), M.apagada.clone()); piso.rotation.x = -Math.PI / 2; piso.position.set(xc, y0 - 0.5, zf - out * 0.62); scene.add(piso);
  const cuarto = { x: xc, y0, y1, w, lado, fondo, piso, prendida: 0 };
  CUARTOS.push(cuarto);
  return cuarto;
}
function prender(cuarto, k) {
  // de golpe, con un parpadeo de dos cuadros (k: 0..1 del encendido)
  const c = k <= 0 ? new THREE.Color(0x0e182b) : new THREE.Color(0x0e182b).lerp(new THREE.Color(0xf0b06a), k);
  cuarto.fondo.material.color.copy(c); cuarto.piso.material.color.copy(c).multiplyScalar(0.7);
}
const encendido = (t, t0) => (t < t0 ? 0 : t < t0 + 0.033 ? 1 : t < t0 + 0.066 ? 0.35 : 1);

// ---- enfrente (lado -1): casa A (dos pisos), la casa de Héctor (ventana-puerta + piso alto), casa B (dos pisos) ----
const VENT = [];   // las 7 ventanas del remate del remate (índice = orden en que se prenden)
{
  // casa A: x -6.2..-2.2
  fachada({ x0: -6.2, x1: -1.9, h: 5.9, lado: -1, color: C.cr2, huecos: [[-2.65, -2.05, 0.95, 2.15], [-2.65, -2.05, 3.55, 4.75], [-5.4, -4.4, 0.0 + VER, 2.3]] });
  VENT[3] = ventana(-2.65, -2.05, 0.95, 2.15, -1, { postigos: true });
  VENT[1] = ventana(-2.65, -2.05, 3.55, 4.75, -1, { postigos: true });
  // la puerta de A (cerrada, navy3)
  scene.add(mesh(rbox(1.0, 2.2, 0.08, 0.02), M.navy3, -4.9, VER + 1.1, -FZ - 0.1));
  // la casa de Héctor: x -2.2..1.2, ventana-puerta de planta baja (x -0.95..0.15) y dos ventanas arriba
  fachada({ x0: -1.9, x1: 1.0, h: 5.6, lado: -1, color: C.cr, huecos: [[-0.95, 0.15, VER, 2.35], [-1.55, -0.95, 3.45, 4.6], [0.15, 0.75, 3.45, 4.6]] });
  VENT[4] = ventana(-1.55, -0.95, 3.45, 4.6, -1);
  VENT[6] = ventana(0.15, 0.75, 3.45, 4.6, -1);
  // casa B: x 1.2..5.4
  fachada({ x0: 1.0, x1: 5.4, h: 5.9, lado: -1, color: C.cr2, huecos: [[2.4, 3.05, 0.95, 2.15], [1.35, 1.95, 3.55, 4.75], [2.55, 3.15, 3.55, 4.75], [1.3, 2.05, VER, 2.3]] });
  VENT[0] = ventana(2.4, 3.05, 0.95, 2.15, -1, { postigos: true });
  VENT[2] = ventana(1.35, 1.95, 3.55, 4.75, -1, { postigos: true });
  VENT[5] = ventana(2.55, 3.15, 3.55, 4.75, -1, { postigos: true });
  scene.add(mesh(rbox(0.75, 2.2, 0.08, 0.02), M.navy3, 1.68, VER + 1.1, -FZ - 0.1));   // la puerta de B
  // más cuadra a los costados (sin ventanas que se prendan)
  fachada({ x0: -11, x1: -6.2, h: 4.2, lado: -1, color: C.cr, huecos: [[-9.4, -8.4, 1.0, 2.2], [-7.6, -6.7, VER, 2.3]] }); ventana(-9.4, -8.4, 1.0, 2.2, -1, { postigos: true });
  fachada({ x0: 5.4, x1: 10, h: 4.4, lado: -1, color: C.cr, huecos: [[6.6, 7.6, 1.0, 2.2], [8.4, 9.3, VER, 2.3]] }); ventana(6.6, 7.6, 1.0, 2.2, -1, { postigos: true });
  fachada({ x0: 10, x1: 16, h: 6.2, lado: -1, color: C.cr2, huecos: [[11.2, 12.2, 1.0, 2.2], [13.2, 14.2, 3.6, 4.8]] }); ventana(11.2, 12.2, 1.0, 2.2, -1); ventana(13.2, 14.2, 3.6, 4.8, -1);
}
// la casa de Héctor: la ventana-puerta con la reja baja (un portoncito que se abre en la parte 2), postigos, maceta
const reja = new THREE.Group();
const luzPuertaH = { fondo: null };
{
  const x0 = -0.95, x1 = 0.15, xc = (x0 + x1) / 2, zf = -FZ;
  for (const xx of [x0 - 0.04, x1 + 0.04]) scene.add(mesh(rbox(0.09, 2.35, 0.1, 0.02), M.navy3, xx, VER + 1.18, zf + 0.03));
  scene.add(mesh(rbox(1.3, 0.09, 0.12, 0.02), M.navy3, xc, VER + 2.29, zf + 0.03));
  // postigos navy3 abiertos contra la fachada
  for (const [xx] of [[x0 - 0.36], [x1 + 0.36]]) {
    scene.add(mesh(rbox(0.6, 2.2, 0.04, 0.01), M.navy3, xx, VER + 1.15, zf + 0.04));
    for (let k = 0; k < 9; k++) scene.add(mesh(new THREE.BoxGeometry(0.5, 0.025, 0.02), mat(C.edge, 0.6), xx, VER + 0.2 + k * 0.23, zf + 0.065));
  }
  // el cuarto de Héctor: fondo cálido (siempre prendido) y un piso
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.8), new THREE.MeshBasicMaterial({ color: 0xe6a35e, toneMapped: false })); fondo.position.set(xc, 1.3, zf - 1.3); scene.add(fondo);
  const piso = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4), mat(0x7a5a3c, 0.8)); piso.rotation.x = -Math.PI / 2; piso.position.set(xc, VER + 0.002, zf - 0.7); scene.add(piso);
  // una lámpara de pie y un cuadro adentro (que el cuarto no sea un color liso)
  scene.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.4, 8), M.navy, xc + 0.75, VER + 0.7, zf - 1.1));
  scene.add(mesh(new THREE.CylinderGeometry(0.1, 0.18, 0.22, 16, 1, true), mat(C.cr, 0.6, { side: THREE.DoubleSide, emissive: 0xffd9a0, emissiveIntensity: 0.6 }), xc + 0.75, VER + 1.45, zf - 1.1));
  scene.add(mesh(rbox(0.5, 0.36, 0.03, 0.01), M.navy3, xc - 0.55, 1.7, zf - 1.27));
  scene.add(mesh(new THREE.BoxGeometry(0.4, 0.26, 0.01), mat(C.gd, 0.7), xc - 0.55, 1.7, zf - 1.25));
  // la reja baja negra (hasta la rodilla): un portoncito con bisagra en x0
  reja.position.set(x0 + 0.02, VER, zf + 0.22); scene.add(reja);
  const L = x1 - x0 - 0.04, hierro = M.hierro;
  reja.add(mesh(rbox(L, 0.04, 0.04, 0.01), hierro, L / 2, 0.58, 0));
  reja.add(mesh(rbox(L, 0.035, 0.035, 0.01), hierro, L / 2, 0.08, 0));
  for (let i = 0; i <= 9; i++) { const xx = 0.02 + (i * (L - 0.04)) / 9; reja.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.56, 6), hierro, xx, 0.33, 0)); reja.add(mesh(new THREE.SphereGeometry(0.022, 8, 6), hierro, xx, 0.62, 0)); }
  // la maceta con el malvón rojo apagado, al costado, en la vereda
  const mac = new THREE.Group(); mac.position.set(x1 + 0.55, VER, zf + 0.35); scene.add(mac);
  mac.add(mesh(new THREE.CylinderGeometry(0.17, 0.12, 0.3, 16), mat(0xb5603f, 0.8), 0, 0.15, 0));
  mac.add(mesh(new THREE.SphereGeometry(0.2, 10, 8), mat(0x3d6b2a, 0.8), 0, 0.42, 0));
  for (const [x, y, z] of [[0.08, 0.55, 0.1], [-0.1, 0.58, 0.02], [0.02, 0.6, -0.1], [0.12, 0.5, -0.05]]) mac.add(mesh(new THREE.SphereGeometry(0.055, 8, 6), M.red, x, y, z));
}

// ---- el lado del almacén (lado +1): una casa, el ALMACÉN (vidriera, puerta, toldo verde), la cafetería de Marta ----
const almacen = { x0: -2.4, x1: 2.6, h: 3.4, vid: [-2.1, 0.74, 0.75, 2.35], puerta: [0.86, 1.86, VER, 2.4] };
{
  fachada({ x0: -7.5, x1: -2.4, h: 5.6, lado: 1, color: C.cr2, huecos: [[-5.6, -4.6, 1.0, 2.2], [-5.6, -4.6, 3.5, 4.7]] }); ventana(-5.6, -4.6, 1.0, 2.2, 1, { postigos: true }); ventana(-5.6, -4.6, 3.5, 4.7, 1);
  fachada({ x0: almacen.x0, x1: almacen.x1, h: almacen.h, lado: 1, color: C.cr, huecos: [almacen.vid, almacen.puerta], cuerpo: false });
  // la cafetería (dos pisos) con su vidriera
  fachada({ x0: 2.6, x1: 7.2, h: 5.8, lado: 1, color: C.cr2, huecos: [[3.2, 5.6, 0.8, 2.3], [3.6, 4.6, 3.5, 4.7], [5.6, 6.6, VER, 2.3]] }); ventana(3.6, 4.6, 3.5, 4.7, 1, { postigos: true });
  { const v = ventana(3.2, 5.6, 0.8, 2.3, 1); prender(v, 0.75); }
  fachada({ x0: 7.2, x1: 14, h: 4.2, lado: 1, color: C.cr, huecos: [[8.4, 9.4, 1.0, 2.2], [11, 12, 1.0, 2.2]] }); ventana(8.4, 9.4, 1.0, 2.2, 1, { postigos: true }); ventana(11, 12, 1.0, 2.2, 1);
}
// el fondo de la calle (cierra los planos a ras de calle): una cuadra cruzada en x = 18 y otra en x = -14
{
  const fondoCalle = (x, ry) => {
    const g = new THREE.Group(); g.position.set(x, 0, 0); g.rotation.y = ry; scene.add(g);
    g.add(mesh(new THREE.BoxGeometry(16, 6.4, 2), mat(C.cr2, 0.9), 0, 3.2, 0));
    for (let i = -3; i <= 3; i++) for (const y of [1.6, 4.2]) {
      const w = mesh(rbox(0.9, 1.1, 0.06, 0.02), (i + (y > 3 ? 1 : 0)) % 3 === 0 ? M.vidrioCalido : M.apagada, i * 2.1, y, 1.02); g.add(w);
      g.add(mesh(rbox(1.06, 0.08, 0.14, 0.02), M.navy3, i * 2.1, y - 0.6, 1.04));
    }
    g.add(mesh(rbox(16.2, 0.2, 2.3, 0.03), M.cr3, 0, 6.4, 0));
  };
  fondoCalle(18.5, -Math.PI / 2); fondoCalle(-14.5, Math.PI / 2);
}

// ---------- el ALMACÉN por dentro (el P1) y por fuera (vidriera cálida, toldo verde "ALMACÉN", puerta con ABIERTO) ----------
const MOSTRADOR = { x: -0.45, y: 0.95, z: 5.65, w: 2.3, d: 0.62 };
const RUB_MOST = V3(-0.08, 0, 4.85);   // Rubén detrás del mostrador (de espaldas a la vidriera)
{
  const X0 = almacen.x0, X1 = almacen.x1, Z0 = FZ + FD, Z1 = 9.0, H = almacen.h;
  const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(3, 2.8);
  const piso = mesh(new THREE.PlaneGeometry(X1 - X0, Z1 - Z0), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.55 }), (X0 + X1) / 2, VER + 0.002, (Z0 + Z1) / 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; scene.add(piso);
  const pared = mat(0xe7e1cf, 0.9);
  const pl = (w, h, x, y, z, ry) => { const m = mesh(new THREE.PlaneGeometry(w, h), pared, x, y, z); m.rotation.y = ry; m.castShadow = false; scene.add(m); };
  pl(Z1 - Z0, H, X0, H / 2, (Z0 + Z1) / 2, Math.PI / 2); pl(Z1 - Z0, H, X1, H / 2, (Z0 + Z1) / 2, -Math.PI / 2); pl(X1 - X0, H, (X0 + X1) / 2, H / 2, Z1, Math.PI);
  const techo = mesh(new THREE.PlaneGeometry(X1 - X0, Z1 - Z0), mat(0xd8d0bb, 0.9), (X0 + X1) / 2, H, (Z0 + Z1) / 2); techo.rotation.x = Math.PI / 2; scene.add(techo);
  // el techo de afuera (lo que se ve desde los picados): una losa con pretil crema
  scene.add(mesh(new THREE.BoxGeometry(X1 - X0 + 0.1, 0.25, Z1 - Z0 + 0.3), mat(C.cr3, 0.9), (X0 + X1) / 2, H + 0.12, (Z0 + Z1) / 2));
  scene.add(mesh(rbox(X1 - X0 + 0.2, 0.32, 0.22, 0.02), mat(C.cr2, 0.8), (X0 + X1) / 2, H + 0.3, FZ + 0.1));
  // estanterías en las paredes de los costados, con mercadería de colores planos
  semilla = 7;
  const colores = [C.cr, C.red, C.mostaza, 0xffffff, C.cr2, 0xe8cf9f, 0x8a5a3c, 0xd98a5a];
  const mc = {}; const mm = (c, r) => (mc[c + "|" + r] ??= mat(c, r));
  const estante = (x, ry, z0, z1) => {
    const g = new THREE.Group(); g.position.set(x, VER, 0); g.rotation.y = ry; scene.add(g);
    for (const y of [0.6, 1.15, 1.7, 2.25]) {
      g.add(mesh(rbox(z1 - z0, 0.05, 0.42, 0.015), M.maderaC, (z0 + z1) / 2, y, 0.21));
      for (let zz = z0 + 0.15; zz < z1 - 0.1; zz += 0.18 + az() * 0.06) {
        const k = az(), c = colores[Math.floor(az() * colores.length)];
        if (k < 0.45) { const h = 0.22 + az() * 0.16; g.add(mesh(rbox(0.13, h, 0.16, 0.012), mm(c, 0.6), zz, y + 0.025 + h / 2, 0.22)); }
        else if (k < 0.7) { const yb = crearYerba(); yb.position.set(zz, y + 0.025, 0.22); yb.rotation.y = 0; yb.scale.setScalar(0.85); g.add(yb); }
        else if (k < 0.85) { const pl2 = crearPolenta(); pl2.position.set(zz, y + 0.025, 0.22); g.add(pl2); }
        else { const ga = crearGalletitas(); ga.position.set(zz + 0.05, y + 0.025, 0.22); ga.scale.setScalar(0.8); g.add(ga); zz += 0.1; }
      }
    }
    return g;
  };
  // pared izquierda (x = X0, mira a +x) y derecha (x = X1, mira a -x): el eje local x corre a lo largo de z
  const ei = estante(X0, -Math.PI / 2, 4.5, 8.8); ei.position.z = 0;
  const ed = estante(X1, Math.PI / 2, -8.8, -4.5);
  // el mostrador (navy3 con tapa de madera y filete verde)
  const MX = MOSTRADOR;
  scene.add(mesh(rbox(MX.w, MX.y - VER - 0.04, MX.d, 0.03), M.navy3, MX.x, VER + (MX.y - VER - 0.04) / 2, MX.z));
  scene.add(mesh(rbox(MX.w + 0.12, 0.06, MX.d + 0.1, 0.02), M.madera, MX.x, MX.y - 0.03, MX.z));
  scene.add(mesh(rbox(MX.w - 0.2, 0.06, 0.02, 0.01), M.g, MX.x, 0.42, MX.z + MX.d / 2 + 0.005));
  // una lamparita colgante
  scene.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.6, 6), M.navy, -0.3, H - 0.3, 6.2));
  scene.add(mesh(new THREE.ConeGeometry(0.2, 0.16, 20, 1, true), mat(C.navy3, 0.5, { side: THREE.DoubleSide }), -0.3, H - 0.66, 6.2));
  scene.add(mesh(new THREE.SphereGeometry(0.06, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false }), -0.3, H - 0.73, 6.2));
  // la vidriera: marco navy3, un travesaño, y por dentro un estante bajo con frascos (desde la calle se ve cálido)
  const [vx0, vx1, vy0, vy1] = almacen.vid;
  for (const xx of [vx0 - 0.04, vx1 + 0.04, (vx0 + vx1) / 2]) scene.add(mesh(rbox(0.08, vy1 - vy0 + 0.08, 0.1, 0.02), M.navy3, xx, (vy0 + vy1) / 2, FZ - 0.02));
  scene.add(mesh(rbox(vx1 - vx0 + 0.16, 0.08, 0.1, 0.02), M.navy3, (vx0 + vx1) / 2, vy1 + 0.04, FZ - 0.02));
  scene.add(mesh(rbox(vx1 - vx0 + 0.24, 0.08, 0.22, 0.02), M.cr2, (vx0 + vx1) / 2, vy0 - 0.04, FZ - 0.06));
  // la puerta (hoja abierta hacia adentro, contra la pared) y el cartel ABIERTO
  const [px0, px1] = almacen.puerta;
  for (const xx of [px0 - 0.04, px1 + 0.04]) scene.add(mesh(rbox(0.08, 2.44, 0.1, 0.02), M.navy3, xx, VER + 1.2, FZ - 0.02));
  scene.add(mesh(rbox(px1 - px0 + 0.16, 0.08, 0.1, 0.02), M.navy3, (px0 + px1) / 2, VER + 2.34, FZ - 0.02));
  const hoja = new THREE.Group(); hoja.position.set(px1, VER, FZ + FD + 0.02); hoja.rotation.y = -1.45; scene.add(hoja);
  hoja.add(mesh(rbox(1.0, 2.26, 0.05, 0.015), M.navy3, -0.5, 1.13, 0));
  const ab = lienzo(512, 210, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 14; x.strokeRect(10, 10, w - 20, h - 20); x.fillStyle = "#0b1220"; x.font = F(900, 92); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ABIERTO", w / 2, h / 2 + 6); });
  const abM = new THREE.MeshStandardMaterial({ map: ab, roughness: 0.6, emissive: 0xffffff, emissiveMap: ab, emissiveIntensity: 0.25 });
  const cartel = mesh(new THREE.BoxGeometry(0.62, 0.25, 0.02), [M.g, M.g, M.g, M.g, abM, M.g], -0.5, 1.55, -0.04); cartel.rotation.y = Math.PI; hoja.add(cartel);
}
// el toldo verde de marca sobre la vidriera y la puerta: un faldón inclinado y el frente con "ALMACÉN" crema
{
  const x0 = -2.35, x1 = 2.1, yA = 3.0, yB = 2.55, zB = FZ - 1.15;
  const L = Math.hypot(yA - yB, FZ - zB), ang = Math.atan2(yA - yB, FZ - zB);
  const lona = mat(C.g, 0.75), ribete = mat(C.navy, 0.6);
  const faldon = mesh(new THREE.BoxGeometry(x1 - x0, 0.04, L), lona, (x0 + x1) / 2, (yA + yB) / 2, (FZ + zB) / 2); faldon.rotation.x = -ang; scene.add(faldon);
  // franjas crema sobre la lona (rayado clásico, planas y anchas)
  for (let x = x0 + 0.3; x < x1 - 0.1; x += 0.6) { const f = mesh(new THREE.BoxGeometry(0.22, 0.045, L), mat(C.cr, 0.75), x, (yA + yB) / 2 + 0.003, (FZ + zB) / 2); f.rotation.x = -ang; scene.add(f); }
  const tx = lienzo(1600, 220, (x, w, h) => {
    x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#0b1220"; x.fillRect(0, h - 22, w, 22); x.fillRect(0, 0, w, 14);
    x.fillStyle = "#efeee5"; x.font = F(800, 150); x.textAlign = "center"; x.textBaseline = "middle";
    x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.lineJoin = "round"; x.strokeText("ALMACÉN", w / 2, h / 2 + 2); x.fillText("ALMACÉN", w / 2, h / 2 + 2);
  });
  const frenteM = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.7, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.18 });
  const frente = mesh(new THREE.BoxGeometry(x1 - x0, 0.42, 0.05), [lona, lona, lona, lona, ribete, frenteM], (x0 + x1) / 2, yB - 0.19, zB); scene.add(frente);
  for (const xx of [x0 + 0.05, x1 - 0.05]) scene.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 6), ribete, xx, (yA + yB) / 2 + 0.02, (FZ + zB) / 2));
}

// ---------- el farol: columna navy con brazo curvo sobre la calle; luminaria; cono de luz cálida en el piso ----------
const FAROL = { base: V3(4.4, 0, -RW - 0.35), cabeza: V3(S.x + 0.1, 4.25, 0.15) };
const farolLuz = new THREE.SpotLight(0xffc27a, 0, 9, 0.6, 0.55, 1.2);
const farolFoco = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), new THREE.MeshBasicMaterial({ color: 0x30384a, toneMapped: false }));
const conoPiso = new THREE.Mesh(new THREE.CircleGeometry(1.5, 48), new THREE.MeshBasicMaterial({ color: 0xffc27a, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
{
  const { base, cabeza } = FAROL;
  scene.add(mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.4, 12), M.navy, base.x, VER + 0.2, base.z));
  scene.add(mesh(new THREE.CylinderGeometry(0.065, 0.085, 4.0, 12), M.navy, base.x, VER + 2.2, base.z));
  const curva = new THREE.CatmullRomCurve3([V3(base.x, 4.1, base.z), V3(base.x - 0.1, 4.55, base.z + 0.5), V3((base.x + cabeza.x) / 2, 4.6, (base.z + cabeza.z) / 2 + 0.3), V3(cabeza.x, 4.45, cabeza.z)]);
  scene.add(mesh(new THREE.TubeGeometry(curva, 30, 0.05, 8), M.navy));
  scene.add(mesh(new THREE.ConeGeometry(0.32, 0.26, 20, 1, true), mat(C.navy3, 0.5, { side: THREE.DoubleSide }), cabeza.x, cabeza.y + 0.1, cabeza.z));
  scene.add(mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12), M.navy, cabeza.x, cabeza.y + 0.26, cabeza.z));
  farolFoco.position.copy(cabeza).add(V3(0, -0.02, 0)); scene.add(farolFoco);
  farolLuz.position.copy(cabeza).add(V3(0, -0.1, 0)); farolLuz.target.position.set(cabeza.x, 0, cabeza.z); scene.add(farolLuz, farolLuz.target);
  conoPiso.rotation.x = -Math.PI / 2; conoPiso.position.set(cabeza.x, 0.012, cabeza.z); conoPiso.renderOrder = 2; scene.add(conoPiso);
  // el cono con borde suave pero en pocos escalones (sin degradé fino: compresión)
  const tex = lienzo(256, 256, (x, w) => { for (const [r, a] of [[128, 0.35], [104, 0.6], [80, 0.85], [56, 1]]) { x.fillStyle = `rgba(255,255,255,${a})`; x.beginPath(); x.arc(w / 2, w / 2, r, 0, 7); x.fill(); } });
  conoPiso.material.alphaMap = tex; conoPiso.material.map = null;
}
function ponerFarol(t) {
  // se prende de golpe (parpadeo de dos cuadros) en el remate del remate (parte 1) y sobre la fila (parte 2)
  const t0 = t < P2 ? T.farol1 : T.farol2;
  const k = encendido(t, t0);
  farolLuz.intensity = 26 * k;
  farolFoco.material.color.set(k > 0.5 ? 0xfff1c8 : 0x30384a);
  conoPiso.material.opacity = 0.42 * k;
  if (t >= P2) { conoPiso.position.set(1.0, 0.012, 1.4); farolLuz.target.position.set(1.0, 0, 1.4); }
  else { conoPiso.position.set(FAROL.cabeza.x, 0.012, FAROL.cabeza.z); farolLuz.target.position.set(FAROL.cabeza.x, 0, FAROL.cabeza.z); }
}

// ================= LOS PERSONAJES =================
const PANT_H = { color: C.mostaza, borde: C.cr, suela: C.navy };
const ruben = crearPersonaje({ ...ELENCO.almacenero, dedos: true, mechones: true, parpadeoCada: 3.7 });
const hector = crearPersonaje({ ...ELENCO.hector, dedos: true, parpadeoCada: 3.45, pantuflas: PANT_H });
const nico = crearPersonaje({ ...ELENCO.empleado, dedos: true });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, pantuflas: { color: 0xb7a9c9, borde: C.cr, suela: C.navy } });
const marta = crearPersonaje({ ...ELENCO.duena, dedos: true, pantuflas: { color: C.cr, borde: C.g, suela: C.navy } });
const walter = crearPersonaje({ ...ELENCO.walter, dedos: true, pantuflas: { color: C.cr, borde: C.g, suela: C.navy } });
const vec1 = crearPersonaje({ ...DEFECTO, nombre: "Beto", piel: PIEL.media, pelo: PELO.gris, peinado: "pelado", cejasColor: 0x6a6a6a, camisa: 0x8fa3c4, mangas: "largas", cuello: 0x8fa3c4, panza: 1.12, nariz: 0.066, alto: 1.0, pantuflas: { color: 0x6b3f2e, borde: C.cr, suela: C.navy } });
const vec2 = crearPersonaje({ ...DEFECTO, nombre: "Nelly", piel: PIEL.clara, pelo: 0xe8e4dc, peinado: "rodete", cejasColor: 0xb0aaa0, camisa: 0xe8cf9f, mangas: "largas", cuello: C.cr, panza: 1.04, nariz: 0.05, labios: 0xb5555a, alto: 0.94, lentes: C.navy3 });
const vec3 = crearPersonaje({ ...DEFECTO, nombre: "Fede", piel: PIEL.trigueña, pelo: PELO.castaño, peinado: "corto", cejasColor: 0x3a2a20, camisa: C.cr2, mangas: "cortas", panza: 0.96, nariz: 0.056, alto: 1.03, pantuflas: { color: C.cr2, borde: C.navy3, suela: C.navy } });
const vec4 = crearPersonaje({ ...DEFECTO, nombre: "Chela", piel: PIEL.media, pelo: PELO.rubio, peinado: "rulos", cejasColor: 0x8a6a3a, camisa: C.navy3, mangas: "largas", cuello: C.cr, panza: 1.0, nariz: 0.05, labios: 0xa8524f, alto: 0.95 });
const TODOS = [ruben, hector, nico, graciela, marta, walter, vec1, vec2, vec3, vec4];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// los lentes un poco más adentro de la cara (de el-audio: con el cráneo de 0,3 los aros se salían de la cara)
function lentesAdentro(per, color) {
  const CC = 0.3 * 0.92;
  per.cabeza.traverse((l) => {
    if (!l.isMesh || l.parent !== per.cabeza) return;
    const esL = (l.material.color && l.material.color.getHex() === color && (l.geometry.type === "TorusGeometry" || l.geometry.type === "CylinderGeometry")) || (l.material.isMeshBasicMaterial && l.geometry.type === "CircleGeometry");
    if (!esL) return;
    l.position.y -= CC; l.position.multiplyScalar(1.04 / 1.13); l.position.y += CC;
    if (Math.abs(l.scale.y - 0.26) < 1e-6) l.visible = false;
    if (Math.abs(l.scale.y - 0.07) < 1e-6 && Math.abs(l.scale.x - 0.011) < 1e-6) l.position.x = -0.035;
  });
}
lentesAdentro(graciela, 0x16243d); lentesAdentro(hector, 0x1f3254); lentesAdentro(vec2, 0x1f3254);
// de perfil (más de ~35°), el aro del ojo de atrás quedaba flotando fuera de la cara: se esconde, como el ojo
const arosDe = (per, color) => per.cabeza.children.filter((l) => l.isMesh && l.geometry.type === "TorusGeometry" && l.material.color && l.material.color.getHex() === color && l.parent === per.cabeza);
const LENTES = [[graciela, arosDe(graciela, 0x16243d)], [hector, arosDe(hector, 0x1f3254)], [vec2, arosDe(vec2, 0x1f3254)]];
const _lc = new THREE.Vector3(), _lf = new THREE.Vector3(), _le = new THREE.Vector3(), _lw = new THREE.Vector3();
function lenteLejano(per, aros) {
  per.cabeza.updateMatrixWorld(true);
  per.cabeza.getWorldPosition(_lc); _lf.set(0, 0, 1).transformDirection(per.cabeza.matrixWorld); _le.copy(camera.position).sub(_lc);
  _lf.y = 0; _le.y = 0; _lf.normalize(); _le.normalize();
  const ang = Math.acos(cl(_lf.dot(_le), -1, 1));
  let lejos = null, dmax = -1;
  for (const a of aros) { a.visible = true; a.getWorldPosition(_lw); const d = _lw.distanceTo(camera.position); if (d > dmax) { dmax = d; lejos = a; } }
  if (ang > 1.0 && lejos) lejos.visible = false;   // (ronda 2: de 3/4 se ven los dos aros: nada de monóculo)
  // el puente también se ve de canto: se esconde con el aro
  per.cabeza.children.forEach((l) => { if (l.isMesh && l.geometry.type === "CylinderGeometry" && Math.abs(l.scale.y - 0.07) < 1e-6) l.visible = ang <= 1.0; });
}

// la herradura de pelo de Rubén vista desde atrás se leía como una barra flotante: de espaldas no va (me-haces-precio)
const HERR = ruben.cabeza.children.find((o) => o.isGroup && Math.abs(o.scale.y - 1.3) < 1e-6);
const _hc = new THREE.Vector3(), _hf2 = new THREE.Vector3(), _he = new THREE.Vector3();
function herraduraSegunCamara() {
  if (!HERR) return;
  ruben.cabeza.updateMatrixWorld(true); ruben.cabeza.getWorldPosition(_hc);
  _hf2.set(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld); _he.copy(camera.position).sub(_hc); _hf2.y = 0; _he.y = 0; _hf2.normalize(); _he.normalize();
  HERR.visible = Math.acos(cl(_hf2.dot(_he), -1, 1)) < 1.35;
}
// en las ventanas: quién se asoma en cada una (índice de VENT); los que cruzan en la parte 2
const ASOMA = [graciela, marta, walter, vec1, vec2, vec3, vec4];
// el casco de Nico (navy, visera crema): pegado a la cabeza
{
  const casco = new THREE.Group(); nico.cabeza.add(casco); casco.position.set(0, 0.3 * 0.92 + 0.04, -0.01);
  casco.add(mesh(new THREE.SphereGeometry(0.335, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.56), mat(C.navy, 0.35)));
  const vis = mesh(new THREE.SphereGeometry(0.345, 24, 10, -0.9, 1.8, Math.PI * 0.36, Math.PI * 0.14), mat(C.cr, 0.3)); casco.add(vis);
  const franja = mesh(new THREE.TorusGeometry(0.333, 0.022, 6, 32, Math.PI), mat(C.g, 0.45)); franja.rotation.set(0, Math.PI / 2, Math.PI / 2); casco.add(franja);
}

// ================= UTILERÍA =================
// el cajón de verdulería: tablas de madera clara separadas, esquineros oscuros (origen en la base, abierto arriba)
function crearCajon() {
  const g = new THREE.Group();
  const W = 0.56, H = 0.3, D = 0.38, tab = mat(0xd8b27a, 0.85), esq = mat(0x6b4a2e, 0.8);
  for (const s of [-1, 1]) for (const y of [0.05, 0.15, 0.25]) { g.add(mesh(new THREE.BoxGeometry(W, 0.07, 0.016), tab, 0, y, s * (D / 2))); }
  for (const s of [-1, 1]) for (const y of [0.05, 0.25]) { g.add(mesh(new THREE.BoxGeometry(0.016, 0.07, D), tab, s * (W / 2), y, 0)); }
  for (const z of [-0.12, 0, 0.12]) g.add(mesh(new THREE.BoxGeometry(W, 0.014, 0.09), tab, 0, 0.008, z));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.04, H, 0.04), esq, sx * (W / 2 - 0.01), H / 2, sz * (D / 2 - 0.01)));
  // la etiqueta de cartón vieja en un costado (sin marca)
  g.add(mesh(new THREE.BoxGeometry(0.16, 0.06, 0.004), mat(0xc49a63, 0.9), 0.08, 0.15, D / 2 + 0.01));
  g.userData = { W, H, D };
  return g;
}
const cajon = crearCajon(); scene.add(cajon);
// el cartón escrito a mano "SUCURSAL" (marrón, bordes rotos, Caveat 700 navy)
const carton = new THREE.Group(); carton.rotation.order = "YXZ"; scene.add(carton);
{
  const W = 0.62, H = 0.3;
  const tx = lienzo(1024, 500, (x, w, h) => {
    x.fillStyle = "#c49a63"; x.beginPath();
    semilla = 3; x.moveTo(10, 14);
    for (let i = 1; i <= 12; i++) x.lineTo((i * w) / 12, 6 + az() * 18);
    for (let i = 1; i <= 6; i++) x.lineTo(w - 4 - az() * 16, (i * h) / 6);
    for (let i = 11; i >= 0; i--) x.lineTo((i * w) / 12, h - 4 - az() * 18);
    for (let i = 5; i >= 1; i--) x.lineTo(4 + az() * 16, (i * h) / 6);
    x.closePath(); x.fill();
    x.strokeStyle = "rgba(90,60,30,0.35)"; x.lineWidth = 6; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(40 + i * 250, 30); x.lineTo(20 + i * 250, h - 30); x.stroke(); }
    x.fillStyle = "#16243d"; x.font = '700 250px "Caveat", sans-serif'; x.textAlign = "center"; x.textBaseline = "middle";
    x.save(); x.translate(w / 2, h / 2 + 8); x.rotate(-0.04); x.fillText("SUCURSAL", 0, 0); x.restore();
  });
  const fm = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.9, transparent: true, alphaTest: 0.5, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.12 });
  const plano = new THREE.Mesh(new THREE.PlaneGeometry(W, H), fm); plano.castShadow = true; carton.add(plano);
  const dorso = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.96, H * 0.9), mat(0xa47c4c, 0.95)); dorso.position.z = -0.004; dorso.rotation.y = Math.PI; carton.add(dorso);
  carton.userData = { W, H };
}
// la cajita de fósforos (crema con raspador rojo apagado, sin marca)
function crearFosforos() {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.1, 0.03, 0.065, 0.004), mat(C.cr, 0.7), 0, 0.015, 0));
  for (const s of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.1, 0.022, 0.003), M.red, 0, 0.015, s * 0.034));
  g.add(mesh(new THREE.BoxGeometry(0.05, 0.002, 0.03), mat(C.navy3, 0.7), 0, 0.031, 0));
  return g;
}
// la bolsa de hielo: bolsa transparente blanca con cubitos y el nudo arriba
function crearBolsaHielo() {
  const g = new THREE.Group();
  const bolsa = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 14), new THREE.MeshPhysicalMaterial({ color: 0xf4f8ff, roughness: 0.25, transmission: 0, transparent: true, opacity: 0.55, depthWrite: false }));
  bolsa.scale.set(1, 1.25, 0.8); bolsa.position.y = 0.16; g.add(bolsa);
  semilla = 21;
  for (let i = 0; i < 12; i++) { const c = new THREE.Mesh(rbox(0.05, 0.05, 0.05, 0.012, 1), mat(0xdcecff, 0.15, { emissive: 0x6d8ab8, emissiveIntensity: 0.15 })); c.position.set((az() - 0.5) * 0.15, 0.06 + az() * 0.2, (az() - 0.5) * 0.1); c.rotation.set(az() * 3, az() * 3, 0); g.add(c); }
  const nudo = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.08, 10), new THREE.MeshStandardMaterial({ color: 0xf4f8ff, roughness: 0.3, transparent: true, opacity: 0.8 })); nudo.position.y = 0.34; nudo.rotation.x = Math.PI; g.add(nudo);
  return g;
}
// el cambio: tres billetes en abanico
function crearCambio() {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) { const b = crearBillete(); b.rotation.set(Math.PI / 2, 0, (i - 1) * 0.28); b.position.set((i - 1) * 0.03, 0.04 + i * 0.004, i * 0.004); b.scale.setScalar(2.0); g.add(b); }
  return g;
}
const yerbaC = crearYerba(); yerbaC.scale.setScalar(2.2); scene.add(yerbaC);
const panC = crearPanFlauta(0.5); panC.scale.setScalar(2.0); scene.add(panC);
const hieloC = crearBolsaHielo(); hieloC.scale.setScalar(1.9); scene.add(hieloC);
const cambioC = crearCambio(); scene.add(cambioC);
const fosforos = crearFosforos(); fosforos.scale.setScalar(1.3); scene.add(fosforos);
const termo = crearTermo(); termo.scale.setScalar(1.3); scene.add(termo);
const mateR = crearMate(); mateR.scale.setScalar(1.25); scene.add(mateR);
// la bolsa de Héctor con la etiqueta "Héctor · pagado ✓"
const bolsaH = crearBolsaPapel(); bolsaH.scale.setScalar(1.4); scene.add(bolsaH);
{
  const et = crearPapelito(["Héctor", "pagado"], { W: 0.17, H: 0.12, tilde: true }); et.position.set(0, 0.13, 0.15 / 2 + 0.004); bolsaH.add(et);
  const pan = crearPanFlauta(0.34); pan.rotation.set(0, 0, 1.2); pan.position.set(0.05, 0.3, 0); bolsaH.add(pan);
}
// la moto de Nico: chica, navy, con la caja de reparto crema y la franja verde (sin marca)
const moto = new THREE.Group(); scene.add(moto);
const ruedas = [];
{
  const neg = mat(0x141821, 0.6), cromo = mat(0xc9ccd2, 0.3, { metalness: 0.6 });
  for (const x of [-0.55, 0.6]) {
    const r = new THREE.Group(); r.position.set(x, 0.24, 0); moto.add(r); ruedas.push(r);
    const cub = mesh(new THREE.TorusGeometry(0.19, 0.07, 10, 24), neg); r.add(cub);
    const llanta = mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), cromo); llanta.rotation.x = Math.PI / 2; r.add(llanta);
    for (let k = 0; k < 3; k++) { const ry = mesh(new THREE.BoxGeometry(0.22, 0.025, 0.02), neg); ry.rotation.z = (k * Math.PI) / 3; r.add(ry); }
  }
  const cuerpo = mat(C.navy3, 0.35);
  moto.add(mesh(rbox(0.8, 0.12, 0.28, 0.05), cuerpo, 0.0, 0.42, 0));            // el piso
  moto.add(mesh(rbox(0.5, 0.32, 0.34, 0.1), cuerpo, -0.32, 0.6, 0));            // el cuerpo de atrás
  moto.add(mesh(rbox(0.52, 0.09, 0.3, 0.04), mat(C.navy, 0.5), -0.3, 0.8, 0));   // el asiento
  const frente = mesh(rbox(0.16, 0.62, 0.3, 0.06), cuerpo, 0.48, 0.66, 0); frente.rotation.z = -0.3; moto.add(frente);
  moto.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.62, 8), cromo, 0.62, 1.06, 0)).rotation.x = Math.PI / 2;
  moto.add(mesh(rbox(0.08, 0.12, 0.2, 0.03), cuerpo, 0.6, 1.0, 0));
  moto.add(mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfff1c8, toneMapped: false }), 0.66, 0.92, 0));
  // la caja de reparto
  moto.add(mesh(rbox(0.46, 0.44, 0.46, 0.04), mat(C.cr, 0.6), -0.55, 1.12, 0));
  for (const s of [-1, 1]) moto.add(mesh(new THREE.BoxGeometry(0.47, 0.08, 0.005), M.g, -0.55, 1.12, s * 0.233));
  moto.add(mesh(new THREE.BoxGeometry(0.005, 0.08, 0.47), M.g, -0.78, 1.12, 0));
}
// los celulares: el de Rubén (chat) y el de Héctor (la tienda), y los de los vecinos (pantalla prendida)
const CW = 600, CH = 975;
const chatR = lienzo(CW, CH, () => {});
function dibujarChat(t) {
  const x = chatR.userData.x, W = CW, H = CH;
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 190);
  x.fillStyle = "#d9a441"; x.beginPath(); x.arc(78, 108, 46, 0, 7); x.fill();
  x.fillStyle = "#0b1220"; x.font = F(800, 46); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("H", 78, 110);
  x.textAlign = "left"; x.fillStyle = "#efeee5"; x.font = F(800, 46); x.fillText("Héctor", 145, 92); x.fillStyle = "#5ce611"; x.font = F(700, 34); x.fillText("enfrente", 145, 140);
  // la burbuja del cliente: "¿Hacen envíos?" (grande)
  x.fillStyle = "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(36, 300, W - 110, 250, 34); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, 70); x.fillText("¿Hacen", 70, 380); x.fillText("envíos?", 70, 470);
  x.fillStyle = "#6b7488"; x.font = F(600, 30); x.textAlign = "right"; x.fillText("19:10", W - 100, 525);
  x.fillStyle = "#16243d"; x.fillRect(0, H - 120, W, 120); x.fillStyle = "#efeee5"; rr(x, 30, H - 95, W - 150, 70, 35); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 60, H - 60, 36, 0, 7); x.fill();
  chatR.needsUpdate = true;
}
dibujarChat(0);
const celuR = crearCelular(chatR, C.navy3, 0.085, 0.138); celuR.scale.setScalar(2.3); scene.add(celuR);
const tienda = lienzo(CW, CH, () => {});
let claveTienda = "";
function dibujarTienda(t) {
  const n = T.tildes.filter((a) => t >= a).length, envio = t >= T.duda && t < T.retiro ? 1 : 0, ret = t >= T.retiro ? 1 : 0, pag = t >= T.pagado ? 1 : 0;
  const late = envio ? Math.round((0.5 + 0.5 * Math.sin((t - T.duda) * 12)) * 4) / 4 : 0, toque = t >= T.retiro && t < T.retiro + 0.35 ? Math.round(sg(t, T.retiro, T.retiro + 0.35) * 6) / 6 : 0;
  const clave = `${n}|${envio}|${ret}|${pag}|${late}|${toque}`; if (clave === claveTienda) return; claveTienda = clave;
  const x = tienda.userData.x, W = CW, H = CH;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, 150);
  x.fillStyle = "#5ce611"; x.fillRect(0, 146, W, 10);
  x.fillStyle = "#efeee5"; x.font = F(800, 50); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Almacén de Rubén", 34, 78);
  const items = ["Yerba", "Pan", "Hielo", "Fósforos"];
  items.forEach((it, i) => {
    const y = 210 + i * 78;
    x.fillStyle = "#0b1220"; x.font = F(700, 46); x.fillText(it, 40, y);
    if (i < n) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.arc(W - 70, y, 28, 0, 7); x.fill(); x.stroke(); x.lineWidth = 8; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(W - 84, y); x.lineTo(W - 73, y + 11); x.lineTo(W - 55, y - 11); x.stroke(); }
    else { x.strokeStyle = "#b4b2a3"; x.lineWidth = 5; x.beginPath(); x.arc(W - 70, y, 28, 0, 7); x.stroke(); }
  });
  // las dos opciones: "Envío: $ 60" (rojo apagado si queda sin elegir) y "Retiro en el local: $ 0"
  const op = (y, txt, sub, est) => {
    x.fillStyle = est === "si" ? "#5ce611" : est === "duda" ? "#ffffff" : "#e2e0d5"; x.strokeStyle = est === "no" ? "#b4b2a3" : "#0b1220"; x.lineWidth = 7;
    x.beginPath(); x.roundRect(28, y, W - 56, 140, 26); x.fill(); x.stroke();
    x.fillStyle = est === "no" ? "#9a998e" : "#0b1220"; x.font = F(800, 48); x.fillText(txt, 52, y + 50); x.font = F(900, 54); x.fillStyle = est === "no" ? "#c7655b" : "#0b1220"; x.fillText(sub, 52, y + 106);
  };
  op(540, "Envío", "$ 60", ret ? "no" : envio ? "duda" : "nada");
  if (envio) { x.strokeStyle = `rgba(92,230,17,${0.35 + 0.65 * late})`; x.lineWidth = 14; x.beginPath(); x.roundRect(20, 532, W - 40, 156, 30); x.stroke(); }   // la duda: "Envío" late
  op(700, "Retiro en el local", "$ 0", ret ? "si" : "nada");
  if (toque > 0 && toque < 1) { x.strokeStyle = `rgba(11,18,32,${1 - toque})`; x.lineWidth = 10; x.beginPath(); x.arc(W * 0.7, 770, 20 + 70 * toque, 0, 7); x.stroke(); }   // el toque
  if (pag) {
    x.save(); x.translate(W / 2, 905); x.rotate(-0.06);
    x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(-210, -52, 420, 104, 22); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 60); x.textAlign = "center"; x.fillText("Pagado ✓", 0, 4); x.restore();
  } else { x.fillStyle = "#0b1220"; rr(x, 28, 865, W - 56, 86, 43); x.fillStyle = "#efeee5"; x.font = F(800, 46); x.textAlign = "center"; x.fillText("Pagar", W / 2, 910); }
  x.textAlign = "left";
  tienda.needsUpdate = true;
}
dibujarTienda(0);
const celuH = crearCelular(tienda, C.mostaza, 0.085, 0.138); celuH.scale.setScalar(3.0); scene.add(celuH);
// el pulgar de Héctor sobre la pantalla (Q1)
const pulgar = mesh(new THREE.CapsuleGeometry(0.03, 0.07, 6, 12), mat(0xf2c9a8, 0.55)); scene.add(pulgar);
const pantVecino = lienzo(200, 320, (x, w, h) => { x.fillStyle = "#e9e6da"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 60); x.fillStyle = "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = 4; x.beginPath(); x.roundRect(14, 100, w - 40, 70, 14); x.fill(); x.stroke(); x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(40, 200, w - 54, 60, 14); x.fill(); });
const celuH1 = crearCelular(pantVecino, C.mostaza, 0.085, 0.138); celuH1.scale.setScalar(1.5); scene.add(celuH1);
const celusV = ASOMA.map(() => { const c = crearCelular(pantVecino, C.navy3, 0.085, 0.138); c.scale.setScalar(1.5); scene.add(c); return c; });

// ---------- la línea punteada de los 14 pasos (verde, sobre la calle) ----------
const puntos = new THREE.Group(); scene.add(puntos);
{
  const n = 14;
  for (let i = 0; i <= n; i++) { const p = caminoAB(i / n); const d = mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.012, 16), new THREE.MeshBasicMaterial({ color: C.g, toneMapped: false }), p.x, p.y + 0.012, p.z); d.castShadow = false; puntos.add(d); }
}

// ================= GLOBOS (pegados a la cámara, en píxeles de pantalla; de me-haces-precio) =================
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cola = true, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy, tilde = false } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const tw0 = med.measureText(lineas[0]).width;
  const extra = tilde ? px * 2 * 1.25 : 0;
  const anchoTxt = Math.max(...lineas.map((l, i) => med.measureText(l).width + (i === 0 ? extra : 0))) / 2;
  const W = Math.round(anchoTxt + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9);
  const tex = lienzo(W * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.fillStyle = tinta; x.font = F(800, px * 2); x.textAlign = "center"; x.textBaseline = "middle";
    lineas.forEach((l, i) => x.fillText(l, w / 2 - (i === 0 ? extra / 2 : 0), h / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.2 + px * 0.08));
    if (tilde) {
      const px2 = px * 2, cx = w / 2 - extra / 2 + tw0 / 2 + px2 * 0.75, cy = h / 2 - ((lineas.length - 1) / 2) * px2 * 1.2;
      x.strokeStyle = tinta; x.lineWidth = px2 * 0.17; x.lineCap = "round"; x.lineJoin = "round";
      x.beginPath(); x.moveTo(cx - px2 * 0.36, cy + px2 * 0.02); x.lineTo(cx - px2 * 0.08, cy + px2 * 0.3); x.lineTo(cx + px2 * 0.4, cy - px2 * 0.3); x.stroke();
    }
  });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: borde });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(fondo) });
  const sombraM = new THREE.MeshBasicMaterial({ color: 0x050a14 });
  const w = W / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sombra.position.set(12 / PXK, -14 / PXK, -0.016); g.add(sombra);
  const bord = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); bord.position.z = -0.012; g.add(bord);
  const caja = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja);
  const colaG = new THREE.Group(); g.add(colaG); colaG.visible = cola;
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(80 / PXK, 104 / PXK), sombraM); cs.position.set(12 / PXK, -8 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(80 / PXK, 104 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(54 / PXK, 78 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja.userData.orden = 4;
  g.userData = { W, H, cola: colaG };
  return pegarACamara(g, camera, 40);
}
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0, giro = 0, margen = 80) {
  g.visible = s > 0.4;
  if (!g.visible) return;
  const k = halfK();
  const { W, H, cola } = g.userData;
  cx = W + 2 * margen > 1080 ? 540 : cl(cx, W / 2 + margen, 1080 - margen - W / 2);
  cy = cl(cy, H / 2 + 120, 1800 - H / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s);
  g.rotation.z = giro;
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (W / 2), -0.62, 0.62);
  if (oy >= cy) {
    cola.position.set((lado * W) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
    cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * W) / 2), oy - (cy + H / 2)), -0.9, 0.9);
  } else {
    cola.position.set((lado * W) / 2 / PXK, H / 2 / PXK - 4 / PXK, 0);
    cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * W) / 2), (cy - H / 2) - oy), -0.9, 0.9);
  }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(new THREE.Vector3(0, 0.181, 0.3))); };
const GL = {
  gracias: crearGlobo(["¡Gracias, Rubén!"], 62),
  rotH: crearGlobo(["Héctor · enfrente"], 54, { cola: false }),
  pasos: crearGlobo(["14 pasos"], 64, { cola: false, fondo: "#5ce611" }),
  coro: Array.from({ length: 7 }, () => crearGlobo(["¿Hacen envíos?"], 40)),
  pagado: Array.from({ length: 7 }, () => crearGlobo(["Pagado"], 48, { cola: true, fondo: "#5ce611", tilde: true })),
};
// la línea guía de un rótulo (crema con borde navy), en píxeles de pantalla
const guia = (() => {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: C.navy })); b.userData.orden = 0;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: C.cr })); m.position.z = 0.001; m.userData.orden = 1;
  const d = new THREE.Mesh(new THREE.CircleGeometry(0.5, 20), new THREE.MeshBasicMaterial({ color: C.cr })); d.position.z = 0.002; d.userData.orden = 2;
  g.add(b, m, d); g.userData = { b, m, d };
  return pegarACamara(g, camera, 39);
})();
function ponerGuia(x0, y0, x1, y1) {
  const k = halfK(), dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy);
  guia.visible = true;
  guia.position.set(((x0 + x1) / 2 - 540) * k, (960 - (y0 + y1) / 2) * k, -1);
  guia.rotation.z = -Math.atan2(dy, dx);
  guia.userData.m.scale.set(L * k, 7 * k, 1); guia.userData.b.scale.set((L + 8) * k, 15 * k, 1);
  guia.userData.d.position.set((L / 2) * k, 0, 0.002); guia.userData.d.scale.setScalar(22 * k);
  guia.traverse((o) => { if (o.isMesh) o.renderOrder = 38 + (o.userData.orden || 0); });
}
const todosGlobos = [GL.gracias, GL.rotH, GL.pasos, ...GL.coro, ...GL.pagado];

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un
// plano, Catmull-Rom continua.
const PIC = (k = 0) => [0.5, 5.4 + k * 0.25, 4.4 + k * 0.15, 0.15, 0.3, -1.3, 52];      // el picado de la calle (P3/P4/Q2), más bajo y cerca (ronda 1)
const GRUA = (k = 0) => [0.25, 7.0 + k * 0.5, 4.5 + k * 0.7, 0.25, 2.15, -2.8, 60];         // el general de la cuadra (P6/Q4)
const Q5C = (k = 0) => [0.9, 2.3 + k * 0.4, -1.7 - k * 0.5, 1.15, 1.15, 3.4, 56];   // desde enfrente: la fila llega al almacén        // el general bajo desde el almacén (Q5)
const HEC_P = (dz = 0) => [-0.15, 1.55, -0.55 + dz, -0.4, 0.95, -FZ, 46];                  // Héctor en su ventana-puerta
const LH = [-0.4, 1.2, -4.0];   // P2: la cámara mira siempre a Héctor (por la puerta, nunca por un parante)
const RUB2 = V3(1.6, 0, 3.4), HEC2 = V3(0.55, 0, 3.15);   // parte 2: Rubén en la vereda del almacén, Héctor frente a él
const PLANOS = [
  ["P1", 0, [[0, -0.78, 1.62, 7.25, -0.45, 1.3, 4.0, 52], [T.arranca, -0.72, 1.62, 7.15, -0.45, 1.3, 4.0, 52], [2.0, 1.95, 1.62, 6.55, ...LH, 50], [2.15, 1.75, 1.58, 5.7, ...LH, 50], [T.p2, 1.4, 1.5, 4.3, ...LH, 50], [2.85, 0.8, 1.45, 1.5, ...LH, 48], [3.3, ...HEC_P(0.12)], [T.p3, ...HEC_P(0)]]],
  ["P3", T.p3, [[T.p3, ...PIC(0)], [T.m2, ...PIC(0.4)], [T.p4h[0], ...PIC(0.8)]]],
  ["P4h", T.p4h[0], [[T.p4h[0], -1.35, 1.25, 1.15, 0.53, 1.12, 0.22, 40], [T.p4h[1], -1.3, 1.25, 1.1, 0.53, 1.12, 0.22, 40]]],
  ["P3", T.p4h[1], [[T.p4h[1], ...PIC(1.0)], [T.m4, ...PIC(1.2)], [T.p5, ...PIC(1.5)]]],
  ["P5", T.p5, [[T.p5, -2.45, 1.1, 1.05, 0.25, 0.95, 0.3, 46], [T.para, -2.42, 1.1, 1.04, S.x - 0.1, 0.92, -0.1, 46], [T.p5c, -2.4, 1.1, 1.03, S.x - 0.1, 0.92, -0.1, 46]]],
  ["P5c", T.p5c, [[T.p5c, ...HEC_P(0.25)], [T.p5b, ...HEC_P(0.15)]]],
  ["P5b", T.p5b, [[T.p5b, -2.4, 1.1, 1.03, S.x - 0.05, 0.82, 0, 46], [T.push, -2.35, 1.08, 1.0, S.x - 0.05, 0.78, 0, 46], [T.push + 0.45, -2.05, 1.05, 0.95, S.x - 0.05, 0.86, 0, 46], [T.p6, -2.0, 1.05, 0.93, S.x - 0.05, 0.86, 0, 46]]],
  ["P6", T.p6, [[T.p6, -2.0, 1.05, 0.93, S.x - 0.05, 0.86, 0, 46], [r2(T.p6 + 0.45), -2.7, 1.5, 1.6, S.x, 0.7, -0.4, 50], [r2(T.p6 + 1.15), -0.8, 4.4, 3.8, 0.3, 1.4, -2.4, 56], [r2(T.p6 + 1.9), ...GRUA(0)], [P1, ...GRUA(0.04)]]],
  // ---- parte 2 ----
  // Q1 inserto del celular (pegado a cámara) · Q1b Héctor levanta la vista · Q1c su punto de vista: el almacén con Rubén en
  // la puerta · Q1 de nuevo: toca "Retiro", "Pagado ✓"
  ["Q1", P2, [[P2, -0.3, 1.45, -2.85, -0.4, 1.3, -3.95, 44], [r2(T.miraR - 0.15), -0.3, 1.45, -2.92, -0.4, 1.3, -3.95, 44]]],
  ["Q1b", r2(T.miraR - 0.15), [[r2(T.miraR - 0.15), ...HEC_P(0.35)], [r2(T.miraR + 0.22), ...HEC_P(0.3)]]],
  ["Q1c", r2(T.miraR + 0.22), [[r2(T.miraR + 0.22), -0.4, 1.78, -3.6, 1.55, 1.3, 3.5, 24], [r2(T.retiro - 0.08), -0.4, 1.78, -3.55, 1.55, 1.3, 3.5, 22]]],
  ["Q1", r2(T.retiro - 0.08), [[r2(T.retiro - 0.08), -0.3, 1.45, -2.92, -0.4, 1.3, -3.95, 44], [T.q2, -0.3, 1.45, -2.98, -0.4, 1.3, -3.95, 44]]],
  ["Q2", T.q2, [[T.q2, ...PIC(0.3)], [T.q2b, ...PIC(0.1)]]],
  ["Q2b", T.q2b, [[T.q2b, 1.1, 1.5, 0.15, 1.05, 1.15, 3.3, 54], [T.q2c, 1.1, 1.5, 0.3, 1.05, 1.15, 3.3, 52]]],
  ["Q2c", T.q2c, [[T.q2c, 3.52, 1.7, 2.22, HEC2.x, 1.42, HEC2.z, 32], [T.q2d, 3.42, 1.7, 2.26, HEC2.x, 1.44, HEC2.z, 30]]],
  ["Q2d", T.q2d, [[T.q2d, -0.63, 1.68, 1.23, RUB2.x, 1.4, RUB2.z, 32], [T.q3, -0.55, 1.68, 1.3, RUB2.x, 1.4, RUB2.z, 30]]],
  ["Q3", T.q3, [[T.q3, 0.95, 1.35, -1.0, 0.98, 1.05, 3.6, 60], [T.q4, 0.95, 1.35, -0.85, 0.98, 1.05, 3.6, 59]]],
  ["Q4", T.q4, [[T.q4, ...GRUA(0)], [T.q4p[0], ...GRUA(0.06)]]],
  ["Q4p", T.q4p[0], [[T.q4p[0], 4.4, 0.62, 3.1, 1.4, 0.6, -1.2, 42], [T.q4p[1], 4.3, 0.62, 2.95, 1.3, 0.6, -1.0, 42]]],
  ["Q5", T.q4p[1], [[T.q4p[1], ...Q5C(0)], [DUR, ...Q5C(1)]]],
];
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++;
  planoActual = PLANOS[pi][0];
  const v = catmull(PLANOS[pi][2], t);
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const BAJA = { manoI: [0.29, 0.02, 0.1], manoD: [-0.29, 0.02, 0.1], codoI: null, codoD: null, dedoI: 0, dedoD: 0 };
const LLEVA = { manoI: [0.12, 0.12, 0.36], manoD: [-0.12, 0.12, 0.36], codoI: [0.8, -0.8, -0.2], codoD: [-0.8, -0.8, -0.2], dedoI: 0, dedoD: 0 };   // algo adelante, a dos manos
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.62, tension: 0.25, feliz: 0 }, cejas: { alto: 0.05, ang: 0.2 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.95 } };
const CANCHERO = { ...CARA.sonrisa, cejas: { alto: 0.25, ang: -0.05, asim: 0.7 }, boca: { sonrisa: 0.7, abierta: 0, ancho: 1.05 }, ojos: { abiertos: 0.95, feliz: 0.35 } };

// ---------- Rubén: los cruces (fracción del camino A→B en el tiempo) ----------
// [t0, t1, u0, u1, lleva]  (lleva: qué tiene en la mano durante el tramo)
const CRUCES = [
  [T.x1[0], T.x1[1], 0, 1, "yerba"], [T.v1[0], T.v1[1], 1, 0, null],
  [T.x2[0], T.x2[1], 0, 1, "pan"], [T.v2a[0], T.v2a[1], 1, 0.5, null], [T.v2b[0], T.v2b[1], 0.5, 0, null],
  [T.x3[0], T.x3[1], 0, 1, "hielo"], [T.v3[0], T.v3[1], 1, 0, null],
  [T.x4[0], T.x4[1], 0, 1, "cambio"], [T.v4[0], T.v4[1], 1, 0, null],
  [T.sale5, T.p5, 0, 0.36, "cajon"],
];
const ENTREGAS = [[T.x1[1], T.c1, "yerba"], [T.x2[1], T.c2, "pan"], [T.x3[1], T.c3, "hielo"], [T.x4[1], T.c4, "cambio"]];
function rubenCruce(t) {
  // devuelve { pos, giro, paso, lleva, entrega (0..1 del brazo extendido), vel }
  for (const [a, b, u0, u1, lleva] of CRUCES) {
    if (en(t, a, b)) { const u = lerp(u0, u1, sg(t, a, b)); return { pos: caminoAB(u), giro: u1 > u0 ? GIRO_AB : GIRO_BA, paso: 1, lleva, vel: Math.abs(u1 - u0) * 7.5 / (b - a) }; }
  }
  for (const [a, b, lleva] of ENTREGAS) if (en(t, a, b + 0.0001)) return { pos: caminoAB(1), giro: GIRO_AB, paso: 0, lleva, entrega: pulso(t, a, b - a) };
  // la media vuelta seca de "¿Y hielo?"
  if (en(t, T.v2a[1], T.v2b[0])) { const u = sg(t, T.giro3[0], T.giro3[1]); return { pos: caminoAB(0.5), giro: GIRO_BA + eio(u) * Math.PI * 2, paso: 0 }; }
  // esperando en la puerta (entre cruces): adentro, al borde
  if (t < T.x1[0]) return { pos: caminoAB(0), giro: GIRO_AB, paso: 0, lleva: "yerba" };
  const uLast = (() => { let u = 0; for (const [a, b, u0, u1] of CRUCES) if (t >= b) u = u1; return u; })();
  const sig = CRUCES.find(([a]) => a > t);
  return { pos: caminoAB(uLast), giro: uLast > 0.5 ? GIRO_AB : GIRO_BA, paso: 0, lleva: sig ? sig[4] : null };
}
const lleva = { yerba: yerbaC, pan: panC, hielo: hieloC, cambio: cambioC };
// ---------- Rubén en P5/P6: llega a la línea, mira, da vuelta el cajón detrás, se sienta, termo, cartón ----------
const GIRO_CAM = -1.28;                // de 3/4 a la cámara del plano a ras de calle
const IZQ5 = V3(Math.cos(GIRO_CAM), 0, -Math.sin(GIRO_CAM)), ADE5 = V3(Math.sin(GIRO_CAM), 0, Math.cos(GIRO_CAM));
const PARA5 = V3(S.x - 0.1, 0, -0.45);                       // donde se para (el cajón queda a su izquierda, sobre la línea)
const SEAT = PARA5.clone().add(IZQ5.clone().multiplyScalar(0.5));   // el cajón, sobre la línea del medio
const SENT = SEAT;
const CAJ_SEAT = 0.3, CAJ_H = 0.3;
const TERMO_P = SEAT.clone().add(IZQ5.clone().multiplyScalar(0.5)).add(ADE5.clone().multiplyScalar(-0.05));
const CART_P = SEAT.clone().add(ADE5.clone().multiplyScalar(0.52)).add(V3(0, 0.15, 0));
const SIENTA = { x: SEAT.x + ADE5.x * 0.04, z: SEAT.z + ADE5.z * 0.04, y: CAJ_SEAT + 0.04 - 0.56 };
const RK5 = [
  [T.p5, { x: S.x + 0.1, z: 0.6, giro: GIRO_AB + 0.15, paso: 1, pasoVel: 14, ...BAJA, ...LLEVA, ...aC(0, 0.05), ...NADA }],
  [T.para, { x: PARA5.x, z: PARA5.z, giro: GIRO_CAM, paso: 0 }, T.para - T.p5, (u) => eo(u)],
  [T.miraA + 0.22, { ...aC(0.6, 0.0) }, 0.22],                 // mira el almacén (a su izquierda)
  [T.p5c - 0.02, { ...aC(-0.6, -0.03) }, 0.25],                // mira a Héctor
  [T.p5b + 0.05, { ...aC(0, 0.02, 0), ...NADA }, 0.2],          // al frente, cara de nada
  [T.baja[1], { inclina: 0.38, ...aC(0, 0.3) }, 0.25],
  [T.termo[1], { inclina: 0.32 }, 0.2],
  [T.tomaC + 0.1, { inclina: 0.1, ...aC(0, 0.1) }, 0.15],
  [T.sienta[1], { x: SIENTA.x, z: SIENTA.z, y: SIENTA.y, sentado: 1, inclina: 0.04, manoI: [0.16, 0.02, 0.26], codoI: [0.8, -0.6, -0.2], ...aC(0, 0.04, 0), ...NADA }, T.sienta[1] - T.sienta[0], (u) => eio(u)],
  [T.carton[1] + 0.2, { manoD: [-0.16, 0.02, 0.26], codoD: [-0.8, -0.6, -0.2] }, 0.25],
  [T.r1 - 0.05, { ...aC(0, 0.0, 0), ...NADA, ojos: { abiertos: 0.62, tension: 0.25, x: 0, y: 0.05 } }, 0.2],
  [T.mira6 + 0.5, { ...aC(-0.6, -0.08, 0) }, 0.5],
  [T.mira6 + 1.0, { ...aC(0.5, -0.1, 0) }, 0.5],
];
const RK5_PARA = poseEn(T.baja[0] - 0.001, RK5);

// ================= ESCENA EN EL TIEMPO =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _w = new THREE.Vector3();
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
function manoA(per, pose, lado, mundo) {
  per.poner(pose); per.raiz.updateMatrixWorld(true);
  const l = per.cuerpo.worldToLocal(_w.copy(mundo));
  const k = per.cfg.alto || 1;
  pose[`mano${lado}`] = [l.x / k, l.y / k, l.z / k];
  return pose;
}
const mezclaMano = (pose, p1, lado, k) => { pose[`mano${lado}`] = pose[`mano${lado}`].map((v, i) => lerp(v, p1[`mano${lado}`][i], k)); if (k > 0.5) pose[`codo${lado}`] = p1[`codo${lado}`]; };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
};
const adelante = (per, d) => { const g = per.raiz.rotation.y; return V3(Math.sin(g) * d, 0, Math.cos(g) * d); };
function cajonEnManosPos(per, pose) { if (pose) per.poner(pose); return cajonEnManos(per); }
// el cajón dado vuelta en las manos, con el termo acostado y el cartón arriba
function cajonLleno(per) {
  const c = cajonEnManos(per); const g = per.raiz.rotation.y;
  cajon.position.copy(c).add(V3(0, CAJ_H - 0.05, 0)); cajon.rotation.set(Math.PI, g, 0);
  const top = c.clone().add(V3(0, CAJ_H - 0.02, 0));
  termo.position.copy(top).add(V3(0, 0.045, 0)).add(V3(Math.sin(g), 0, Math.cos(g)).multiplyScalar(-0.18)); termo.rotation.set(Math.PI / 2, g, 0, "YXZ");
  carton.position.copy(top).add(V3(0, 0.11, 0)); carton.rotation.set(-Math.PI / 2, 0, g);
}
const cajonEnManos = (per) => { const a = manoMundo(per, "I", new THREE.Vector3()), b = manoMundo(per, "D", new THREE.Vector3()); return a.add(b).multiplyScalar(0.5).add(V3(0, -0.12, 0)); };

// la cuadra en la parte 2: los vecinos que cruzan en fila hacia el almacén (desde sus puertas)
const FILA = [[graciela, V3(2.7, 0, -3.5)], [walter, V3(1.7, 0, -3.5)], [vec1, V3(-2.35, 0, -3.5)], [marta, V3(3.4, 0, -3.4)], [vec3, V3(-1.45, 0, -3.6)]];
const DESTINO = (i) => V3(0.2 + (i % 3) * 0.42, 0, 2.75 + Math.floor(i / 3) * 0.38);   // a la izquierda de Rubén (que se lo vea en la puerta)

function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  ponerCamara(t);
  const plano = planoActual;
  scene.background.copy(t >= T.h1941 && !parte2 ? CIELO2 : CIELO);
  ponerFarol(t);
  for (const g of todosGlobos) g.visible = false;

  // ---------- las ventanas ----------
  VENT.forEach((v, i) => {
    let k = 0;
    if (!parte2) k = encendido(t, T.ven[i]);
    else k = encendido(t, T.pag[i]);
    if (parte2 && t < T.q4) k = 0;
    prender(v, k);
  });

  // ---------- RUBÉN ----------
  let pr;
  const objetos = { yerba: false, pan: false, hielo: false, cambio: false };
  if (!parte2 && t < T.p3) {
    // P1/P2: detrás del mostrador, el mate en la derecha; levanta la vista y gira la cabeza hacia la vidriera
    const mira = eio(sg(t, T.levanta, T.levanta + 0.35));
    // (ronda 1) el mate abajo, a la altura del pecho (la bombilla lejos de la cara); levanta la vista y gira apenas
    // la cabeza (0,5 rad) y el torso (0,4): los ojos hacen el resto (nada de giro de nuca)
    pr = poseEn(t, [[0, { x: RUB_MOST.x, z: RUB_MOST.z, y: VER, giro: -0.12, ...BAJA, manoD: [-0.32, 0.22, 0.36], codoD: [-1, -0.6, -0.2], ...aC(0.0, 0.3, 0.02), ...NADA, ojos: { abiertos: 0.62, tension: 0.25, x: 0, y: -0.7 } }]]);
    pr.cabeza.giro = lerp(0, -0.5, mira); pr.cabeza.asiente = lerp(0.3, 0.0, mira); pr.torso = lerp(0, -0.35, mira); pr.ojos.x = lerp(0, -1.0, mira); pr.ojos.y = lerp(-0.7, 0.05, mira);
    pr.cejas.alto = lerp(0.05, 0.35, mira);
    ruben.poner(pr);
    mateR.visible = true; mateR.position.copy(manoMundo(ruben, "D", _a)).add(V3(0.06, -0.09, 0.05)); mateR.rotation.set(0, 2.4, 0);   // la bombilla hacia afuera
    termo.visible = true; termo.position.set(MOSTRADOR.x - 0.8, MOSTRADOR.y, MOSTRADOR.z - 0.12); termo.rotation.set(0, -0.6, 0);
    cajon.visible = false; carton.visible = false; fosforos.visible = false;
  } else if (!parte2 && t < T.p5) {
    // P3/P4: los cruces (time-lapse: pasoVel alto)
    const c = rubenCruce(t);
    const vel = c.vel ?? 0;
    pr = poseEn(t, [[0, { ...BAJA, ...aC(0, 0.04), ...NADA }]]);
    Object.assign(pr, { x: c.pos.x, z: c.pos.z, y: c.pos.y, giro: c.giro, paso: c.paso, pasoVel: 9 + vel * 1.6, inclina: c.paso ? 0.12 : 0.03 });
    if (c.lleva === "cajon") Object.assign(pr, LLEVA);
    else if (c.lleva) { pr.manoD = [-0.22, 0.3, 0.3]; pr.codoD = [-1, -0.6, -0.2]; }
    if (c.entrega !== undefined) { pr.manoD = [lerp(-0.22, -0.1, c.entrega), lerp(0.3, 0.55, c.entrega), lerp(0.3, 0.55, c.entrega)]; }
    ruben.poner(pr);
    if (c.lleva && c.lleva !== "cajon") {
      const o = lleva[c.lleva];
      objetos[c.lleva] = true;
      // en la entrega, pasa a la mano de Héctor (la segunda mitad)
      const p = manoMundo(ruben, "D", _a).add(V3(0, -0.08, 0));
      o.position.copy(p).add(V3(0, c.lleva === "yerba" ? -0.3 : c.lleva === "hielo" ? -0.3 : 0, 0)); o.rotation.set(0, ruben.raiz.rotation.y, c.lleva === "pan" ? 0.5 : 0);
    }
    cajon.visible = c.lleva === "cajon";
    mateR.visible = false; termo.visible = cajon.visible; carton.visible = cajon.visible; fosforos.visible = false;
    if (cajon.visible) cajonLleno(ruben);
  } else if (!parte2) {
    // P5/P6: la sucursal (ronda 1): apoya el cajón (dado vuelta) al costado sobre la línea, deja el termo parado en el
    // piso, toma el cartón, se sienta de verdad (cadera en el cajón, rodillas a 90°) y apoya el cartón contra las piernas
    pr = poseEn(t, RK5);
    fosforos.visible = false; termo.visible = true; carton.visible = true; cajon.visible = true;
    ruben.poner(pr);
    if (t < T.baja[0]) cajonLleno(ruben);
    else {
      // el cajón baja de las manos al piso, al costado (sobre la línea); las manos lo acompañan hasta soltarlo
      const u = eio(sg(t, T.baja[0], T.baja[1]));
      const desde = cajonEnManosPos(ruben, RK5_PARA);
      cajon.position.set(lerp(desde.x, SEAT.x, u), lerp(desde.y, 0, u) + CAJ_H, lerp(desde.z, SEAT.z, u));
      cajon.rotation.set(Math.PI, GIRO_CAM, 0);
      const k = 1 - eio(sg(t, T.baja[1] + 0.02, T.baja[1] + 0.15));
      if (k > 0.01) {
        const izq = V3(Math.cos(GIRO_CAM), 0, -Math.sin(GIRO_CAM));
        const c0 = cajon.position.clone().add(V3(0, -0.1, 0));
        const p1 = manoA(ruben, { ...pr, codoI: [0.8, -0.7, -0.2] }, "I", c0.clone().add(izq.clone().multiplyScalar(0.26)));
        const p2 = manoA(ruben, { ...pr, codoD: [-0.8, -0.7, -0.2] }, "D", c0.clone().add(izq.clone().multiplyScalar(-0.26)));
        mezclaMano(pr, p1, "I", k); mezclaMano(pr, p2, "D", k);
      }
      // el termo: acostado arriba del cajón; la mano izquierda lo levanta y lo deja parado en el piso, del lado de afuera
      const arriba = cajon.position.clone().add(V3(0, 0.03, 0));
      if (t < T.termo[0]) { termo.position.copy(arriba).add(V3(0.08, 0.045, 0.06)); termo.rotation.set(Math.PI / 2, GIRO_CAM, 0, "YXZ"); }
      else if (t < T.termo[1]) {
        const v = eio(sg(t, T.termo[0], T.termo[1]));
        const a0 = arriba.clone().add(V3(0.08, 0.045, 0.06)), a1 = TERMO_P.clone();
        const pos = a0.clone().lerp(a1, v); pos.y += Math.sin(Math.PI * v) * 0.25;
        termo.position.copy(pos); termo.rotation.set((Math.PI / 2) * (1 - v), GIRO_CAM, 0, "YXZ");
        const ph1 = manoA(ruben, { ...pr, codoI: [0.9, -0.6, -0.2] }, "I", pos.clone().add(V3(0, 0.3, 0))); mezclaMano(pr, ph1, "I", pulso(t, T.termo[0] - 0.05, T.termo[1] - T.termo[0] + 0.15));
      } else { termo.position.copy(TERMO_P); termo.rotation.set(0, GIRO_CAM, 0, "YXZ"); }
      // el cartón: arriba del cajón hasta que lo toma (derecha); lo tiene en la mano mientras se sienta; lo apoya
      if (t < T.tomaC) { carton.position.copy(arriba).add(V3(-0.06, 0.012, -0.04)); carton.rotation.set(-Math.PI / 2, 0, GIRO_CAM); }
      else if (t < T.carton[0]) {
        const v = eio(sg(t, T.tomaC, T.tomaC + 0.15));
        const enMano = manoMundo(ruben, "D", _b).add(V3(0, -0.12, 0)).add(IZQ5.clone().multiplyScalar(0.22));
        carton.position.copy(arriba).add(V3(-0.06, 0.012, -0.04)).lerp(enMano, v);
        carton.rotation.set(lerp(-Math.PI / 2, -0.1, v), lerp(0, -1.17, v), lerp(GIRO_CAM, 0, v));
        if (t < T.tomaC + 0.15) { const pc = manoA(ruben, { ...pr, codoD: [-0.9, -0.6, -0.2] }, "D", arriba.clone().add(V3(0, 0.08, 0))); mezclaMano(pr, pc, "D", pulso(t, T.tomaC - 0.12, 0.3)); }
        else { pr.manoD = [-0.06, 0.18, 0.4]; pr.codoD = [-1, -0.6, -0.2]; }
      } else {
        const v = eio(sg(t, T.carton[0], T.carton[1]));
        ruben.poner(pr);
        const enMano = manoMundo(ruben, "D", _b).add(V3(0, -0.12, 0)).add(IZQ5.clone().multiplyScalar(0.22));
        carton.position.copy(enMano).lerp(CART_P, v); carton.rotation.set(lerp(-0.1, -0.32, v), -1.17, 0);
        const k2 = 1 - eio(sg(t, T.carton[1] - 0.05, T.carton[1] + 0.15));
        if (k2 > 0.01) { const pc = manoA(ruben, { ...pr, codoD: [-0.9, -0.6, -0.2] }, "D", carton.position.clone().add(V3(0, 0.17, 0))); mezclaMano(pr, pc, "D", k2); }
      }
    }
    bocaVoz(pr, t, T.r1, ENV.ruben1, 0.6);
    ruben.poner(pr);
    mateR.visible = false;
  } else {
    // ---- parte 2: Rubén en la puerta del almacén con la bolsa; en Q4, en la puerta recibiendo a la fila ----
    pr = poseEn(t, [
      [P2, { x: RUB2.x, z: RUB2.z, y: VER, giro: Math.PI - 0.2, ...BAJA, ...aC(0, 0.02), ...CARA.sonrisa, ojos: { abiertos: 0.9, feliz: 0.25 } }],
      [T.q2b - 0.001, { giro: -2.2, ...aC(0, 0.04), ...NADA }, 0.001],
      [T.q2d + 0.12, { ...aC(0, 0.14) }, 0.14], [T.q2d + 0.3, { ...aC(0, 0.0) }, 0.14],   // asiente una vez, cara de nada
      [T.q3 - 0.001, { giro: Math.PI + 0.3, ...CARA.sonrisa }, 0.001],
      [T.q4 - 0.001, { x: PUERTA_A.x + 0.35, z: 3.75, giro: Math.PI, ...BAJA, ...aC(0, 0.0), ...CARA.sonrisa, ojos: { abiertos: 0.9, feliz: 0.3 } }, 0.001],
    ]);
    // la bolsa: en su mano (izquierda) hasta que se la da a Héctor
    if (t < T.bolsa + 0.1) { pr.manoI = [0.22, 0.28, 0.34]; pr.codoI = [1, -0.6, -0.2]; }
    if (en(t, T.q4, DUR) || en(t, T.miraR, T.retiro)) Object.assign(pr, saludo(t, "D", 0.7));
    ruben.poner(pr);
    mateR.visible = false; cajon.visible = false; carton.visible = false; fosforos.visible = false;
    termo.visible = false;
  }
  for (const k of Object.keys(lleva)) lleva[k].visible = objetos[k];

  // ---------- HÉCTOR ----------
  let ph;
  if (!parte2) {
    // en su ventana-puerta, detrás de la reja: saluda con el celular (P1/P2), recibe cada cosa, agradece, saluda
    ph = poseEn(t, [[0, { x: HEC.x, z: HEC.z, y: VER, giro: 0.08, ...BAJA, ...aC(0, -0.02), ...CANCHERO }]]);
    const saluda = en(t, 0, T.p3) || en(t, T.p5c, T.p5b) || t >= T.p6;
    if (saluda) Object.assign(ph, saludo(t, "I", 1));
    ph.manoD = [-0.15, 0.4, 0.36]; ph.codoD = [-0.8, -0.8, -0.2];   // el celular en la derecha
    if (en(t, T.p5c, T.p5b)) Object.assign(ph, CARA.feliz);
    // recibe: la mano izquierda va a la cosa en las entregas
    for (const [a, b, que] of ENTREGAS) if (en(t, a - 0.08, b + 0.25)) {
      const k = pulso(t, a - 0.08, b - a + 0.33);
      hector.poner(ph);
      const o = lleva[que];
      const p1 = manoA(hector, { ...ph, codoI: [0.8, -0.7, -0.2] }, "I", o.position.clone().add(V3(0.0, 0.1, -0.05)));
      mezclaMano(ph, p1, "I", k);
      ph.cabeza.asiente = 0.15;
    }
    if (en(t, T.gracias, T.gracias + 0.6)) ph.boca.abierta = Math.abs(Math.sin((t - T.gracias) * 13)) * 0.35;
    bocaVoz(ph, t, T.h1, ENV.hector1, 0.6);
    // en la grúa: también mira a la cuadra
    if (t >= T.p6) ph.cabeza.giro = 0.2;
  } else {
    ph = poseEn(t, [
      [P2, { x: HEC.x, z: HEC.z, y: VER, giro: 0.15, ...BAJA, ...aC(0, 0.35), ...CARA.concentrada, ojos: { abiertos: 0.9, y: -0.8 } }],
      [T.miraR + 0.12, { ...aC(0.05, -0.12), ...CARA.esperanza, ojos: { abiertos: 1, y: 0.2 } }, 0.12],   // la duda: mira el almacén por encima del celular
      [T.retiro - 0.08, { ...aC(0, 0.35), ...CARA.sonrisa, ojos: { abiertos: 0.9, y: -0.8 } }, 0.15],
      [T.q2 - 0.001, { x: HEC.x, z: HEC.z, giro: GIRO_BA, ...aC(0, 0.02), ...CANCHERO }, 0.001],
      [T.xh[1], { x: HEC2.x, z: HEC2.z, paso: 1, pasoVel: 13 }, T.xh[1] - T.xh[0], (u) => u],
      [T.xh[1] + 0.12, { paso: 0 }, 0.1],
      [T.xh[1] + 0.2, { x: HEC2.x, z: HEC2.z, giro: 1.0, paso: 0, ...BAJA, ...aC(0, 0.0), ...CARA.feliz }, 0.2],
      [T.h2 + 0.05, { ...aC(0.25, -0.05), ...CARA.sorpresa, boca: { sonrisa: 0.6, abierta: 0.2 }, ojos: { abiertos: 1, feliz: 0.2, x: 0.3 } }, 0.2],   // sorprendido de verdad
      [T.h2 + 0.9, { ...aC(0.1, -0.02), ...CARA.feliz }, 0.3],
      [T.q3 - 0.001, { x: 0.35, z: 3.35, giro: Math.PI - 0.35, ...aC(0, 0), ...CARA.feliz }, 0.001],
      [T.q4 - 0.001, { x: 2.35, z: 3.35, giro: Math.PI + 0.4, ...BAJA, ...aC(0, 0), ...CARA.feliz }, 0.001],
    ]);
    // Q1: el celular en las dos manos adelante; el pulgar de la derecha duda sobre "Envío" y toca "Retiro"
    if (t < T.q2) { ph.manoI = [0.06, 0.4, 0.36]; ph.manoD = [-0.2, 0.25, 0.3]; ph.codoI = [0.7, -0.8, -0.3]; ph.codoD = [-0.8, -0.8, -0.3]; }
    // cruza con el celular en alto
    if (en(t, T.q2, T.q2b)) { ph.manoD = [-0.2, 0.62, 0.32]; ph.codoD = [-1, -0.6, -0.2]; }
    // recibe la bolsa con la izquierda; con la derecha señala su casa con el pulgar, por encima del hombro
    if (en(t, T.bolsa - 0.25, T.q4)) { const k = eio(sg(t, T.bolsa - 0.25, T.bolsa)); ph.manoI = [lerp(0.29, 0.24, k), lerp(0.02, 0.24, k), lerp(0.1, 0.32, k)]; ph.codoI = [1, -0.6, -0.2]; }
    if (en(t, T.h2, T.q3)) { const k = eio(sg(t, T.h2 + 0.1, T.h2 + 0.35)) * (1 - eio(sg(t, T.q2d, T.q2d + 0.2))); ph.manoD = [lerp(-0.29, -0.34, k), lerp(0.02, 0.72, k), lerp(0.1, -0.12, k)]; ph.codoD = [-1, -0.2, 0.3]; }
    if (t >= T.q3) Object.assign(ph, saludo(t, "D", 0.8));
    bocaVoz(ph, t, T.h2, ENV.hector2, 0.65);
  }
  if (parte2) ph.y = alturaPiso(ph.z);
  hector.poner(ph);
  // la reja: el portoncito se abre cuando sale Héctor (parte 2)
  reja.rotation.y = parte2 ? -1.6 * eio(sg(t, T.q2 - 0.05, T.xh[0] + 0.2)) : 0;
  // el celular de Rubén (P1: en el mostrador, de cara a la cámara; P5/P6: arriba del cajón, vibra)
  celuR.visible = (!parte2 && t < T.p2 + 0.2) || (!parte2 && t >= T.sienta[1] && (plano === "P6" || plano === "P5b"));
  if (celuR.visible) {
    if (t < T.p3) { celuR.position.set(-0.64, MOSTRADOR.y + 0.24, MOSTRADOR.z + 0.3); celuR.lookAt(camera.position); celuR.rotateX(-0.12); celuR.scale.setScalar(3.0); }
    else { const vib = t >= T.ven[1] ? Math.sin(t * 95) * 0.006 : 0; const pc = SEAT.clone().add(IZQ5.clone().multiplyScalar(0.21)); celuR.position.set(pc.x + vib, CAJ_SEAT + 0.012, pc.z); celuR.rotation.set(-Math.PI / 2, 0, GIRO_CAM + vib * 4); celuR.scale.setScalar(1.6); }
  }
  // el celular de Héctor (la tienda, Q1); y en P1-P4 un celular común en su mano
  celuH.visible = true; celuH1.visible = false;
  if (parte2 && t < T.q2b) {
    dibujarTienda(t);
    const a = manoMundo(hector, "I", _a);
    if (plano === "Q1") {
      // el inserto: el celular grande, pegado a la cámara (se lee "Envío: $ 60" / "Retiro en el local: $ 0" ≥ 44 px)
      const fw = camera.getWorldDirection(new THREE.Vector3());
      celuH.position.copy(camera.position).add(fw.multiplyScalar(0.5)).add(V3(0, -0.012, 0));
      celuH.lookAt(camera.position); celuH.scale.setScalar(1.85);
    } else { celuH.position.copy(a).add(V3(0, 0.12, 0.05)); celuH.scale.setScalar(1.6); celuH.rotation.set(-0.2, hector.raiz.rotation.y, 0); }
  } else {
    const p = manoMundo(hector, "D", _a);
    celuH.visible = false;
    celuH1.visible = !parte2;
    celuH1.position.copy(p).add(V3(0, 0.1, 0.03)); celuH1.rotation.set(-0.15, hector.raiz.rotation.y, 0);
  }
  pulgar.visible = false;
  // la bolsa de Héctor (parte 2): en la mano de Rubén, pasa a la de Héctor
  bolsaH.visible = parte2 && t >= T.q2b - 0.001;
  if (bolsaH.visible) {
    const quien = t < T.bolsa + 0.05 ? ruben : hector, lado = "I";
    bolsaH.position.copy(manoMundo(quien, lado, _a)).add(V3(0, -0.36, 0)); bolsaH.rotation.set(0, hector.raiz.rotation.y - 0.35, 0);   // la etiqueta "Héctor · pagado ✓" hacia la cámara del contraplano
  }
  // los objetos que cruzan: en la entrega pasan de la mano de Rubén a la de Héctor
  for (const [a, b, que] of ENTREGAS) if (en(t, (a + b) / 2, b + 0.45) && !parte2) {
    const o = lleva[que]; o.visible = t < b + 0.42;
    o.position.copy(manoMundo(hector, "I", _a)).add(V3(0, -0.08, 0.02)); o.rotation.set(0, Math.PI, 0);
  }

  // ---------- NICO y la moto (Q3) ----------
  {
    const vis = parte2 && plano === "Q3";
    nico.raiz.visible = moto.visible = vis;
    const u = eio(sg(t, T.moto, T.moto + 0.25)) * 0 + cl((t - T.moto) / 1.4);
    const x = t < T.moto ? 2.7 : lerp(2.7, -3.2, Math.pow(cl((t - T.moto) / 1.8), 1.2));
    moto.position.set(x, 0, 1.55); moto.rotation.set(0, Math.PI, 0);
    for (const r of ruedas) r.rotation.z = x * 4;
    const pn = poseEn(t, [[0, { x: x + 0.02, z: 1.55, y: 0.32, giro: -Math.PI / 2, sentado: 1, inclina: 0.18, ...aC(0, 0), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.3 } }]]);
    nico.poner(pn);
    if (vis) {
      const k = nico.cfg.alto;
      const pI = manoA(nico, { ...pn, codoI: [0.8, -0.4, -0.3] }, "I", V3(x - 0.48, 1.08, 1.55 + 0.24));
      const pD = manoA(nico, { ...pd(pn), codoD: [-0.8, -0.4, -0.3] }, "D", V3(x - 0.48, 1.08, 1.55 - 0.24));
      pn.manoI = pI.manoI; pn.codoI = pI.codoI; pn.manoD = pD.manoD; pn.codoD = pD.codoD;
      nico.poner(pn);
    }
  }

  // ---------- LOS VECINOS: en las ventanas (P6) y en la fila (Q4) ----------
  ASOMA.forEach((p, i) => {
    const v = VENT[i];
    const jf = FILA.findIndex(([q]) => q === p), sale = jf >= 0 ? T.fila[0] + jf * 0.32 : 99;
    const enVentana = (!parte2 && t >= T.ven[i] && plano === "P6") || (parte2 && plano === "Q4" && t >= T.pag[i] && t < sale);
    const enFila = parte2 && t >= sale && jf >= 0;
    p.raiz.visible = enVentana || enFila;
    celusV[i].visible = false;
    if (enVentana) {
      // parado adentro, a 0,3 m de la fachada, mirando a la calle (un poco hacia la cámara y hacia Rubén)
      const pz = -FZ - 0.35;
      const pp = poseEn(t, [[0, { x: v.x, z: pz, y: v.y0 - 1.0 - (p.cfg.alto - 1) * 1.6 - 0.05, giro: 0.12 * Math.sign(S.x - v.x), ...BAJA, ...aC(0, 0.08), ...(parte2 ? CARA.feliz : CARA.esperanza), ojos: { abiertos: 1, feliz: 0.2 } }]]);
      pp.manoD = [-0.1, 0.62, 0.34]; pp.codoD = [-0.8, -0.7, -0.2];
      const voz = CORO.find(([, j]) => j === i);
      if (voz) bocaVoz(pp, t, T.ven[i], ENV[voz[0]], 0.6);
      else if (en(t, T.ven[i], T.ven[i] + 0.6)) pp.boca.abierta = Math.abs(Math.sin((t - T.ven[i]) * 13)) * 0.35;
      p.poner(pp);
      celusV[i].visible = true; celusV[i].position.copy(manoMundo(p, "D", _a)).add(V3(0, 0.1, 0.04)); celusV[i].rotation.set(-0.2, 0, 0);
    }
    if (enFila) {
      const j = FILA.findIndex(([q]) => q === p), [, desde] = FILA[j];
      const t0 = sale, t1 = t0 + 2.0;
      const u = sg(t, t0, t1), dest = DESTINO(j);
      const pos = desde.clone().lerp(dest, u); pos.y = alturaPiso(pos.z);
      const giro = Math.atan2(dest.x - desde.x, dest.z - desde.z);
      const pp = poseEn(t, [[0, { x: pos.x, z: pos.z, y: pos.y, giro, paso: u > 0 && u < 1 ? 1 : 0, pasoVel: 11, ...BAJA, ...aC(0, -0.02), ...CARA.feliz }]]);
      pp.manoD = [-0.18, 0.3, 0.32]; pp.codoD = [-1, -0.6, -0.2];
      p.poner(pp);
      celusV[i].visible = true; celusV[i].position.copy(manoMundo(p, "D", _a)).add(V3(0, 0.1, 0.04)); celusV[i].rotation.set(-0.3, giro, 0);
    }
  });

  // ---------- visibilidad por plano ----------
  ruben.raiz.visible = true;
  hector.raiz.visible = plano !== "Q1c";
  puntos.visible = (plano === "P1" && t >= T.pasos14) || (plano === "P3" && t < T.m2);
  puntos.children.forEach((d, i) => { d.scale.setScalar(plano === "P1" ? bk(sg(t, T.pasos14 + i * 0.015, T.pasos14 + 0.2 + i * 0.015)) + 0.001 : 1); });
  for (const p of TODOS) p.ojoLejano(camera.position);
  for (const [per, aros] of LENTES) lenteLejano(per, aros);
  herraduraSegunCamara();
  relleno.position.copy(camera.position).add(V3(0.4, 0.8, 0)); relleno.target.position.copy(camera.position).add(camera.getWorldDirection(_a).multiplyScalar(3));

  // ---------- globos ----------
  guia.visible = false;
  if (!LIMPIO && !en(tIn, P1 + 0.27, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.7 + 0.3 * bk(sg(t, ti, ti + 0.2)));
    const sale = (tf) => 1 - eio(sg(t, tf - 0.12, tf));
    if (plano === "P1" && t >= T.rotH && t < T.p3) { const [hx, hy] = bocaPx(hector); const gx = hx + 150, gy = hy - 470; ponerGlobo(GL.rotH, gx, gy, ent(T.rotH), null); if (ent(T.rotH) > 0.9) ponerGuia(gx - 60, gy + 50, hx + 40, hy - 170); }
    if (plano === "P1" && t >= T.pasos14) ponerGlobo(GL.pasos, 540, 1560, ent(T.pasos14), null, 1);
    if (plano === "P3" && en(t, T.gracias, T.c1 + 0.5)) { const [hx, hy] = bocaPx(hector); ponerGlobo(GL.gracias, hx - 250, hy - 190, ent(T.gracias) * sale(T.c1 + 0.5), [hx - 50, hy - 40]); }
    // las burbujas del coro: las de arriba en dos filas escalonadas sobre los techos; las de planta baja, abajo de la
    // ventana (sobre la vereda), con la cola hacia arriba. Nunca sobre una cara.
    const lugar = (v, i) => {
      const alta = v.y0 > 3;
      const [vx, vy] = enPantalla(V3(v.x, alta ? v.y1 + 0.05 : v.y0 - 0.05, -FZ));
      if (!alta) return [vx, vy + 150, [vx, vy - 10]];
      if (i === 4 || i === 2) { const [bx, by] = enPantalla(V3(v.x, v.y0 - 0.05, -FZ)); return [bx, by + 70, [bx, by - 10]]; }
      return [i === 1 ? 0 : i === 5 ? 1080 : vx - 40, vy - (i === 6 ? 205 : 95), [vx, vy + 10]];
    };
    const enCuadro = (v) => { const [a, b] = enPantalla(V3(v.x, (v.y0 + v.y1) / 2, -FZ)); return a > 40 && a < 1040 && b > 330 && b < 1650; };
    if (plano === "P6") VENT.forEach((v, i) => {
      if (t < T.ven[i] || !enCuadro(v)) return;
      const [x, y, obj] = lugar(v, i);
      ponerGlobo(GL.coro[i], x, y, ent(T.ven[i]), obj, i, 0, 30);
    });
    // "Pagado ✓": sobre la ventana mientras el vecino está ahí; cuando sale a cruzar, el chip va arriba de su cabeza
    if (plano === "Q4") ASOMA.forEach((p, i) => {
      if (t < T.pag[i] || !p.raiz.visible) return;
      const jf = FILA.findIndex(([q]) => q === p), sale2 = jf >= 0 ? T.fila[0] + jf * 0.32 : 99;
      if (t < sale2) { if (plano !== "Q4" || !enCuadro(VENT[i])) return; let [x, y, obj] = lugar(VENT[i], i); if (i === 1) x += 70; ponerGlobo(GL.pagado[i], x, y, ent(T.pag[i]), obj, i, 0, 30); }
      else if (t < sale2 + 2.0) { p.raiz.updateMatrixWorld(true); const [x, y] = enPantalla(p.cabeza.localToWorld(V3(0, 0.75, 0))); if (y > 180 && y < 1400) ponerGlobo(GL.pagado[i], x, y - 50, 1, [x, y + 30], i, 0, 30); }
    });
  }
  renderer.render(scene, camera);
}
const pd = (p) => p;

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
