// Capa 3D de que-en-paz-descanse (Three.js r170 local). Base técnica: reels/las-siete-y-cincuenta-y-nueve y
// reels/lo-mismo-que-la-otra-vez (globos y contador en píxeles de pantalla).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo set: el almacén de Rubén DE DÍA (pared crema), la puerta vidriada con el cartel ABIERTO y la vereda al sol.
//   PARTE 1: en internet figura "Cerrado permanentemente": Graciela, Marta de luto con bizcochos, la corona
//            "ALMACÉN RUBÉN · Q.E.P.D.", el contador de pésames, "Es, Graciela." y Mamá que se enteró por internet.
//   PARTE 2: otro martes: la web del almacén abre al toque ("ABIERTO AHORA"), "Estoy, Graciela.", Mamá vio la página.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import {
  crearPersonaje, ELENCO, MARTA_LUTO, poseEn, CARA, BRAZOS, pegarACamara,
  crearMate, crearTermo, crearBandejaBizcochos, crearBizcocho, crearCorona, crearPanuelo, crearCelular,
} from "./personajes.js";
import { T, DUR, P1, P2, VOZ1_ENV, VOZ2_ENV, LIMPIO } from "./tiempos3d.js";
await Promise.all(["300", "500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
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
renderer.toneMappingExposure = 0.95;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const CIELO = 0xcfe3f2;
const scene = new THREE.Scene();
scene.background = new THREE.Color(CIELO);
const camera = new THREE.PerspectiveCamera(40, 1080 / 1920, 0.02, 60);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x8a8f99);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(3, 9, 0, 2, 6, 0, 0xfff4e2, 2.0);          // la puerta al sol
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xdde8ff, 1.2);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.0);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.45;

// luz de día: el sol entra por la puerta y la vidriera (manchas duras en el piso), cielo, contraluz, la lámpara de
// adentro y un relleno suave desde la cámara para que las caras se lean siempre
const sol = new THREE.DirectionalLight(0xfff1dc, 2.6);
sol.position.set(-1.6, 5.2, 6.2); sol.target.position.set(0.5, 0.6, -1.4);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 3;
Object.assign(sol.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 1, far: 16 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xf4f1e6, 0x6a5a48, 0.95); scene.add(cielo);
const rim = new THREE.DirectionalLight(0xcfe0ff, 0.7); rim.position.set(3, 4, -5); scene.add(rim);
const lampara = new THREE.PointLight(0xffe2b0, 4, 6, 1.6); lampara.position.set(0.5, 2.7, -1.4); scene.add(lampara);
const relleno = new THREE.DirectionalLight(0xfff6ea, 0.55); scene.add(relleno, relleno.target);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, maderaC: 0xc89a64, mostaza: 0xd9a441 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  pared: mat(0xe9e6d8, 0.92), techo: mat(0xdedbcc, 0.95), navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.6), cr3: mat(C.cr3, 0.55), madera: mat(C.madera, 0.55), maderaC: mat(C.maderaC, 0.55), g: mat(C.g, 0.5), red: mat(C.red, 0.55),
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
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ================= EL SET: el almacén por dentro, de día =================
// x: izquierda (-) a derecha (+). Pared del fondo z = -3.4 (estantes), mostrador cruzando en z = -1.3, Rubén atrás
// (z -1.85), Graciela y Marta adelante (z ~ -0.7), pared del frente z = FZ con la puerta vidriada y la vidriera.
const FZ = 1.4;
const PUERTA = { x0: -0.3, x1: 0.7, alto: 2.3 };
const VIDRIERA = { x0: 1.15, x1: 2.65, y0: 0.75, y1: 2.2 };
const MOSTRADOR = { x: 0.45, y: 0.9, z: -1.3, w: 2.3, d: 0.62 };
{
  const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(3.4, 3.3);
  const p = mesh(new THREE.PlaneGeometry(5.0, 4.8), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.5 }), 0.5, 0.0, -0.98); p.rotation.x = -Math.PI / 2; p.castShadow = false; scene.add(p);
  const pared = (w, h, d, x, y, z) => { const m = mesh(new THREE.BoxGeometry(w, h, d), M.pared, x, y, z); m.castShadow = false; scene.add(m); return m; };
  pared(5.0, 3.3, 0.1, 0.5, 1.65, -3.4);              // fondo
  pared(0.1, 3.3, 4.9, -2.0, 1.65, -0.98);            // izquierda
  pared(0.1, 3.3, 4.9, 3.0, 1.65, -0.98);             // derecha
  const techo = mesh(new THREE.BoxGeometry(5.1, 0.1, 4.9), M.techo, 0.5, 3.32, -0.98); techo.castShadow = false; scene.add(techo);
  // zócalo navy de 25 cm en las tres paredes
  scene.add(mesh(new THREE.BoxGeometry(4.9, 0.25, 0.03), M.navy, 0.5, 0.125, -3.34));
  scene.add(mesh(new THREE.BoxGeometry(0.03, 0.25, 4.8), M.navy, -1.94, 0.125, -0.98));
  scene.add(mesh(new THREE.BoxGeometry(0.03, 0.25, 4.8), M.navy, 2.94, 0.125, -0.98));
  // estantes del fondo: laterales navy3, tablas de madera clara con frente navy3, mercadería de colores planos
  // (casi nada verde: el verde es "resuelto")
  semilla = 7;
  const colores = [C.cr, C.red, C.mostaza, 0xffffff, C.navy3, 0xe8cf9f, 0x8a5a3c, 0x6d86b0, 0xd98a5a];
  const mc = {}; const mm = (c, r) => (mc[c + "|" + r] ??= mat(c, r));
  const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  const sachet = new THREE.SphereGeometry(1, 12, 8);
  for (const y of [0.62, 1.18, 1.74, 2.3]) {
    scene.add(mesh(rbox(4.4, 0.05, 0.42, 0.015), M.maderaC, 0.5, y, -3.12));
    scene.add(mesh(rbox(4.4, 0.06, 0.03, 0.01), M.navy3, 0.5, y - 0.005, -2.9));
    if (y > 2.2) continue;
    for (let x = -1.7; x < 2.7; x += 0.17 + az() * 0.07) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (k < 0.4) { const h = 0.22 + az() * 0.16; scene.add(mesh(rbox(0.13, h, 0.16, 0.012), mm(c, 0.6), x, y + 0.025 + h / 2, -3.05)); }
      else if (k < 0.62) { scene.add(mesh(cuerpoFrasco, mm(c, 0.35), x, y + 0.125, -3.05)); scene.add(mesh(tapa, M.cr, x, y + 0.245, -3.05)); }
      else if (k < 0.82) { scene.add(mesh(botella, mm(c, 0.3), x, y + 0.175, -3.05)); scene.add(mesh(pico, mm(C.cr3, 0.4), x, y + 0.37, -3.05)); }
      else { for (let j = 0; j < 2; j++) { const s2 = mesh(sachet, mm(0xffffff, 0.5), x + j * 0.02, y + 0.06 + j * 0.07, -3.05); s2.scale.set(0.08, 0.04, 0.06); scene.add(s2); } }
    }
  }
  // arriba de todo: paquetes de yerba (crema con banda) y papel higiénico (blanco)
  for (let i = 0, x = -1.6; x < 2.6; i++, x += 0.3) { scene.add(mesh(rbox(0.14, 0.24, 0.1, 0.012), mm(i % 2 ? C.cr : 0xffffff, 0.7), x, 2.45, -3.05)); scene.add(mesh(rbox(0.142, 0.05, 0.102, 0.01), mm(C.mostaza, 0.6), x, 2.43, -3.05)); }
  for (const x of [-1.75, 2.75]) scene.add(mesh(rbox(0.06, 2.4, 0.44, 0.015), M.navy3, x, 1.2, -3.12));
  // la heladera de bebidas en la pared derecha (llena el costado de los generales)
  const hel = new THREE.Group(); hel.position.set(2.55, 0, -1.9); scene.add(hel);
  hel.add(mesh(rbox(0.8, 2.0, 0.7, 0.05), mat(0xf7f6f0, 0.4), 0, 1.0, 0));
  const vidrio = mesh(new THREE.PlaneGeometry(0.62, 1.5), new THREE.MeshStandardMaterial({ color: 0xcfe4ff, emissive: 0xbad8ff, emissiveIntensity: 0.3, roughness: 0.1 }), -0.405, 1.1, 0); vidrio.rotation.y = -Math.PI / 2; hel.add(vidrio);
  for (const y of [0.55, 0.95, 1.35, 1.7]) for (let i = 0; i < 4; i++) hel.add(mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.24, 10), mm([C.red, C.mostaza, 0xffffff, C.navy3][(i + Math.round(y * 10)) % 4], 0.3), -0.36, y + 0.12, -0.24 + i * 0.16));
  // mostrador: frente navy3 con filete verde, tapa de madera; balanza, frasco de caramelos
  const MX = MOSTRADOR;
  scene.add(mesh(rbox(MX.w, 0.86, MX.d, 0.03), M.navy3, MX.x, 0.43, MX.z));
  scene.add(mesh(rbox(MX.w + 0.12, 0.06, MX.d + 0.1, 0.02), M.madera, MX.x, MX.y - 0.03, MX.z));
  scene.add(mesh(rbox(MX.w - 0.2, 0.06, 0.02, 0.01), M.g, MX.x, 0.3, MX.z + MX.d / 2 + 0.005));
  scene.add(mesh(rbox(0.34, 0.1, 0.28, 0.03), M.cr, MX.x + 0.75, MX.y + 0.05, MX.z - 0.12));
  scene.add(mesh(rbox(0.38, 0.025, 0.3, 0.01), mat(0xb9c0c8, 0.3), MX.x + 0.75, MX.y + 0.12, MX.z - 0.12));
  const frasco = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 18), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.35, roughness: 0.05 }));
  frasco.position.set(MX.x + 1.05, MX.y + 0.13, MX.z - 0.05); scene.add(frasco);
  scene.add(mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.04, 18), M.cr, MX.x + 1.05, MX.y + 0.28, MX.z - 0.05));
  for (let i = 0; i < 9; i++) scene.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.mostaza, C.cr][i % 3], 0.3), MX.x + 1.05 + Math.sin(i * 2.4) * 0.06, MX.y + 0.04 + Math.floor(i / 3) * 0.05, MX.z - 0.05 + Math.cos(i * 2.4) * 0.06));
  // lámpara colgante
  scene.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.45, 6), M.navy, 0.5, 3.05, -1.4));
  const pant = mesh(new THREE.ConeGeometry(0.22, 0.16, 20, 1, true), mat(C.navy3, 0.5, { side: THREE.DoubleSide }), 0.5, 2.78, -1.4); scene.add(pant);
  { const f = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), new THREE.MeshBasicMaterial({ color: 0xfff0c8 })); f.position.set(0.5, 2.72, -1.4); scene.add(f); }
}
// la pared del frente: puerta vidriada (hoja que se abre hacia adentro), vidriera, marcos navy
const frente = new THREE.Group(); scene.add(frente);
const hoja = new THREE.Group(); // la hoja de la puerta (bisagra en x0)
const vinilo = new THREE.Group();
{
  const D = 0.12, ALTO = 3.3;
  const pared = (x0, x1, y0, y1) => { const m = mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, D), M.pared, (x0 + x1) / 2, (y0 + y1) / 2, FZ); frente.add(m); };
  pared(-2.05, PUERTA.x0, 0, ALTO); pared(PUERTA.x0, VIDRIERA.x0, PUERTA.alto, ALTO); pared(PUERTA.x1, VIDRIERA.x0, 0, PUERTA.alto);
  pared(VIDRIERA.x0, VIDRIERA.x1, 0, VIDRIERA.y0); pared(VIDRIERA.x0, VIDRIERA.x1, VIDRIERA.y1, ALTO); pared(VIDRIERA.x1, 3.05, 0, ALTO);
  frente.add(mesh(new THREE.BoxGeometry(5.1, 0.25, 0.03), M.navy, 0.5, 0.125, FZ - 0.075));
  const barra = (x, y, w, h, z = FZ) => frente.add(mesh(rbox(w, h, 0.16, 0.02), M.navy3, x, y, z));
  barra(PUERTA.x0 - 0.03, PUERTA.alto / 2, 0.08, PUERTA.alto); barra(PUERTA.x1 + 0.03, PUERTA.alto / 2, 0.08, PUERTA.alto); barra((PUERTA.x0 + PUERTA.x1) / 2, PUERTA.alto + 0.03, PUERTA.x1 - PUERTA.x0 + 0.14, 0.08);
  const vcx = (VIDRIERA.x0 + VIDRIERA.x1) / 2, vw = VIDRIERA.x1 - VIDRIERA.x0, vh = VIDRIERA.y1 - VIDRIERA.y0;
  barra(VIDRIERA.x0 + 0.03, (VIDRIERA.y0 + VIDRIERA.y1) / 2, 0.08, vh); barra(VIDRIERA.x1 - 0.03, (VIDRIERA.y0 + VIDRIERA.y1) / 2, 0.08, vh);
  barra(vcx, VIDRIERA.y1 - 0.03, vw, 0.08); barra(vcx, VIDRIERA.y0 + 0.03, vw, 0.08);
  const vidrioM = new THREE.MeshPhysicalMaterial({ color: 0xdcecff, roughness: 0.05, transparent: true, opacity: 0.12, depthWrite: false });
  const vv = new THREE.Mesh(new THREE.PlaneGeometry(vw - 0.1, vh - 0.1), vidrioM); vv.position.set(vcx, (VIDRIERA.y0 + VIDRIERA.y1) / 2, FZ); vv.renderOrder = 5; frente.add(vv);
  // la hoja de la puerta: marco navy3, vidrio, manija, cartel colgante "ABIERTO" (mira hacia adentro)
  hoja.position.set(PUERTA.x0, 0, FZ - 0.02); frente.add(hoja);
  const W = PUERTA.x1 - PUERTA.x0;
  const hb = (x, y, w, h) => hoja.add(mesh(rbox(w, h, 0.06, 0.015), M.navy3, x, y, 0));
  hb(0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W - 0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W / 2, PUERTA.alto - 0.04, W, 0.08); hb(W / 2, 0.09, W, 0.18);
  const vp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.12, PUERTA.alto - 0.26), vidrioM); vp.position.set(W / 2, PUERTA.alto / 2 + 0.06, 0); vp.renderOrder = 5; hoja.add(vp);
  hoja.add(mesh(rbox(0.04, 0.3, 0.05, 0.015), mat(0xc9ccd2, 0.25, { metalness: 0.6 }), W - 0.075, 1.12, -0.06));
  // el cartel ABIERTO: placa verde con letra navy, cuelga de una cadenita, del lado de adentro del vidrio
  const tx = lienzo(1024, 420, (x, w, h) => {
    x.fillStyle = "#5ce611"; rr(x, 0, 0, w, h, 56);
    x.strokeStyle = "#0b1220"; x.lineWidth = 18; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 40); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 210); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ABIERTO", w / 2, h / 2 + 12);
  });
  const gm = mat(C.g, 0.5);
  // la cara -z de la placa es la [5] del RoundedBox: mira hacia adentro del almacén (se ve desde el mostrador)
  const cartelM = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.5, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.12 });
  const placa = mesh(new THREE.BoxGeometry(0.6, 0.246, 0.02), [gm, gm, gm, gm, gm, cartelM], W / 2, 1.56, -0.05);
  hoja.add(placa);
  const cad = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V3(W / 2 - 0.22, 1.68, -0.045), V3(W / 2, 1.84, -0.04), V3(W / 2 + 0.22, 1.68, -0.045)]), 16, 0.006, 6);
  hoja.add(mesh(cad, mat(0xc9ccd2, 0.3, { metalness: 0.6 })));
  hoja.add(mesh(new THREE.SphereGeometry(0.02, 10, 8), mat(0xc9ccd2, 0.3, { metalness: 0.6 }), W / 2, 1.84, -0.035));
  // parte 2: el vinilo del horario en el vidrio (navy, se lee desde adentro)
  const tv = lienzo(1024, 360, (x, w, h) => {
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    x.font = F(800, 120); x.fillText("Lun a sáb", w / 2, 110); x.font = F(900, 150); x.fillText("8 a 20", w / 2, 260);
  });
  const vm = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.218), new THREE.MeshBasicMaterial({ map: tv, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
  vm.rotation.y = Math.PI; vm.position.set(W / 2, 1.12, -0.012); vm.renderOrder = 7; vinilo.add(vm); hoja.add(vinilo);
  // la campanita arriba de la puerta
  frente.add(mesh(new THREE.ConeGeometry(0.05, 0.08, 14, 1, true), mat(0xd9b04a, 0.3, { metalness: 0.6, side: THREE.DoubleSide }), PUERTA.x0 + 0.2, PUERTA.alto - 0.1, FZ - 0.12));
}
// afuera, al sol: vereda de baldosas, cordón, calle, un árbol y la casa de enfrente
const afuera = new THREE.Group(); scene.add(afuera);
{
  const baldosa = lienzo(512, 512, (x) => {
    x.fillStyle = "#c9c4b4"; x.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#d4cfbf" : "#c4bfae"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122); }
  });
  baldosa.wrapS = baldosa.wrapT = THREE.RepeatWrapping; baldosa.repeat.set(10, 2);
  const v = mesh(new THREE.PlaneGeometry(14, 3), new THREE.MeshStandardMaterial({ map: baldosa, roughness: 0.9 }), 0.5, 0.0, FZ + 1.5); v.rotation.x = -Math.PI / 2; v.castShadow = false; afuera.add(v);
  afuera.add(mesh(rbox(14, 0.16, 0.22, 0.03), M.cr3, 0.5, -0.07, FZ + 3.0));
  const calle = mesh(new THREE.PlaneGeometry(40, 8), mat(0x6f7380, 0.9), 0.5, -0.15, FZ + 7); calle.rotation.x = -Math.PI / 2; calle.castShadow = false; afuera.add(calle);
  afuera.add(mesh(rbox(40, 0.16, 0.22, 0.03), M.cr3, 0.5, -0.07, FZ + 11));
  const casa = mesh(new THREE.BoxGeometry(14, 6, 0.3), mat(0xe8d9bd, 0.9), 0.5, 3, FZ + 12.5); casa.castShadow = false; afuera.add(casa);
  for (let i = -3; i <= 4; i++) { afuera.add(mesh(rbox(1.0, 1.3, 0.1, 0.02), M.navy3, i * 1.8, 1.9, FZ + 12.3)); afuera.add(mesh(rbox(1.1, 0.12, 0.14, 0.02), M.cr, i * 1.8, 1.2, FZ + 12.28)); }
  // el árbol de la vereda (tronco y copa low-poly)
  const arbol = new THREE.Group(); arbol.position.set(-1.3, 0, FZ + 2.4); afuera.add(arbol);
  arbol.add(mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.6, 8), mat(0x6e4a2e, 0.8), 0, 1.3, 0));
  for (const [x, y, z, r] of [[0, 3.0, 0, 0.9], [0.5, 2.7, 0.2, 0.6], [-0.5, 2.8, -0.1, 0.65], [0.1, 3.5, 0.1, 0.6]]) { const c = mesh(new THREE.IcosahedronGeometry(r, 0), mat(0x5f8f3a, 0.8, { flatShading: true }), x, y, z); arbol.add(c); }
}

// ================= LOS PERSONAJES =================
const RI = { x: 0.05, z: -1.85 };     // Rubén detrás del mostrador
const G0 = { x: -0.5, z: -0.66 };    // Graciela frente al mostrador
const M0 = { x: 0.62, z: -0.76 };    // Marta frente al mostrador
const ruben = crearPersonaje({ ...ELENCO.almacenero, dedos: true, mechones: true, parpadeosExtra: [], parpadeoCada: 3.6 });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 3.4 });
const marta = crearPersonaje({ ...MARTA_LUTO, dedos: true, parpadeoCada: 3.7 });
scene.add(ruben.raiz, graciela.raiz, marta.raiz);
for (const p of [ruben, graciela, marta]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
// los lentes de Graciela: armazón más pegado a la cara y patillas cortas (de espaldas asomaba la patilla como una raya)
{ const CCg = 0.3 * 0.92; graciela.cabeza.traverse((l) => { if (!l.isMesh) return; const esL = (l.material.color && l.material.color.getHex() === 0x16243d) || (l.material.isMeshBasicMaterial && l.geometry.type === "CircleGeometry"); if (!esL) return; l.position.y -= CCg; l.position.multiplyScalar(1.04 / 1.13); l.position.y += CCg; if (Math.abs(l.scale.y - 0.26) < 1e-6) l.visible = false; }); } // sin patillas: de 3/4 la del fondo cruzaba el lente
// el broche verde de Marta
{ const b = mesh(new THREE.IcosahedronGeometry(0.022, 1), mat(C.g, 0.35, { emissive: C.g, emissiveIntensity: 0.15 }), -0.085, 0.4, 0.19); marta.cuerpo.add(b); }

// ================= UTILERÍA =================
const mateR = crearMate(); mateR.scale.setScalar(1.25); scene.add(mateR);
const termoR = crearTermo(); termoR.scale.setScalar(1.3); scene.add(termoR);
const bandeja = crearBandejaBizcochos(); bandeja.scale.setScalar(1.25); scene.add(bandeja);
const bizcochoMano = crearBizcocho("med"); bizcochoMano.scale.setScalar(1.3); scene.add(bizcochoMano);
const panuelo = crearPanuelo(); scene.add(panuelo);
const corona = crearCorona("ALMACÉN RUBÉN · Q.E.P.D."); scene.add(corona); corona.userData.aro.scale.setScalar(0.74);
const CORONA = V3(0.2, 0, FZ + 0.2);
const BANDEJA = V3(M0.x + 0.12, MOSTRADOR.y, -1.14);
const TERMO = V3(RI.x - 0.5, MOSTRADOR.y, -1.52);
const CELU_R = V3(RI.x + 0.1, MOSTRADOR.y + 0.008, -1.32);

// ---------- la foto de Rubén para la web (un render de su cara, una sola vez, al cargar) ----------
const fotoCanvas = document.createElement("canvas"); fotoCanvas.width = fotoCanvas.height = 256;
{
  const fs = new THREE.Scene(); fs.background = new THREE.Color(0xefeee5);
  fs.add(new THREE.HemisphereLight(0xffffff, 0x8a7a68, 1.1));
  const d = new THREE.DirectionalLight(0xffffff, 1.3); d.position.set(1, 2, 3); fs.add(d);
  const prev = ruben.raiz.parent; fs.add(ruben.raiz);
  ruben.poner({ x: 0, z: 0, giro: 0, ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35, x: 0, y: 0 }, manoD: [-0.12, 0.4, 0.3], codoD: [-1, -0.5, 0], t: 1.5 });
  const m2 = crearMate(); m2.scale.setScalar(1.25); fs.add(m2); ruben.raiz.updateMatrixWorld(true);
  const ph = ruben.brazos[1].mano.getWorldPosition(new THREE.Vector3()); m2.position.copy(ph).add(V3(0, -0.09, 0.03)); m2.rotation.y = -Math.PI / 2;
  const fc = new THREE.PerspectiveCamera(30, 1, 0.1, 10); fc.position.set(0.12, 1.36, 1.7); fc.lookAt(0.02, 1.18, 0);
  const rt = new THREE.WebGLRenderTarget(256, 256, { samples: 4 }); rt.texture.colorSpace = THREE.SRGBColorSpace;
  renderer.setRenderTarget(rt); renderer.render(fs, fc); renderer.setRenderTarget(null);
  const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
  const img = fotoCanvas.getContext("2d").createImageData(256, 256);
  for (let y = 0; y < 256; y++) img.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
  fotoCanvas.getContext("2d").putImageData(img, 0, 0);
  prev.add(ruben.raiz); fs.remove(m2); rt.dispose();
}

// ================= LOS CELULARES =================
// el de Graciela en primer plano (planos P1 y Q1): hijo de la cámara, con su mano y la manga verde del cárdigan
const pantG = lienzo(540, 1080, () => {});
const celuG = crearCelular(pantG, 0xb7a9c9, 0.08, 0.162);
const celuGcam = new THREE.Group(); celuGcam.add(celuG); camera.add(celuGcam);
{
  const piel = mat(ELENCO.clienta.piel, 0.55), manga = mat(C.g, 0.75);
  const palma = mesh(new THREE.SphereGeometry(1, 18, 12), piel, -0.046, -0.05, -0.012); palma.scale.set(0.02, 0.04, 0.018); celuG.add(palma);
  for (let i = 0; i < 3; i++) { const d = mesh(new THREE.CapsuleGeometry(0.0068, 0.016, 4, 8), piel, 0.046, -0.03 - i * 0.02, -0.004); d.rotation.z = Math.PI / 2 - 0.2; celuG.add(d); }
  const pul = mesh(new THREE.CapsuleGeometry(0.0072, 0.02, 4, 8), piel, -0.04, -0.03, 0.009); pul.rotation.z = -0.5; celuG.add(pul);
  const pu = mesh(new THREE.CylinderGeometry(0.032, 0.034, 0.12, 14), manga, -0.07, -0.135, -0.03); pu.rotation.set(0.3, 0, 0.45); celuG.add(pu);
  celuG.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
}
// el mismo celular en la mano de Graciela cuando entra (Q2), y el de Rubén sobre el mostrador
const celuG2 = crearCelular(pantG, 0xb7a9c9, 0.08, 0.162); scene.add(celuG2);
const pantR = lienzo(600, 1200, () => {});
const celuR = crearCelular(pantR, C.navy3, 0.085, 0.17); scene.add(celuR);

function estrella(x, cx, cy, r) { x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr2 = i % 2 ? r * 0.45 : r; x.lineTo(cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2); } x.closePath(); x.fill(); }
function barraEstado(x, w, oscuro) {
  x.fillStyle = oscuro ? "#efeee5" : "#16243d";
  rr(x, w - 110, 26, 60, 26, 6); x.fillRect(w - 48, 33, 6, 12);
  for (let i = 0; i < 4; i++) x.fillRect(40 + i * 16, 50 - i * 7, 10, 8 + i * 7);
}
// pantalla de Graciela: parte 1 la ficha del buscador genérico; parte 2 el buscador → la web del almacén
let claveG = "";
function dibujarCeluG(t) {
  // parte 1: la ficha del buscador genérico dice "Cerrado permanentemente". Parte 2: se busca, sale la ficha al día
  // ("Abierto ahora", horario) con el enlace "Sitio web", y el tap abre la web del almacén.
  const fase = t < P2 ? "ficha" : t < T.ficha ? "busca" : t < T.web ? "ficha2" : "web";
  const tipeo = Math.round(sg(t, T.tipeo[0], T.tipeo[1]) * 13);
  const pasos = [T.abierto, T.horario, T.mapa, T.boton, T.foto].map((a) => Math.round(sg(t, a, a + 0.25) * 6));
  const rip = Math.round(sg(t, T.tap, T.tap + 0.15) * 6);
  const ent = Math.round(sg(t, T.ficha, T.ficha + 0.15) * 6);
  const pin = Math.round(sg(t, T.mapa, T.mapa + 0.4) * 12);
  const clave = `${fase}|${tipeo}|${pasos}|${rip}|${pin}|${ent}`;
  if (clave === claveG) return;
  claveG = clave;
  const { x } = pantG.userData, W = 540, H = 1080;
  x.clearRect(0, 0, W, H);
  x.textBaseline = "middle"; x.textAlign = "left";
  const ajustar = (txt, peso, tam, ancho) => { x.font = F(peso, tam); while (x.measureText(txt).width > ancho && tam > 30) { tam -= 1; x.font = F(peso, tam); } return tam; };
  const buscador = (texto, cursor) => {
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(24, 84, W - 48, 104, 52); x.fill(); x.stroke();
    x.strokeStyle = "#16243d"; x.lineWidth = 7; x.beginPath(); x.arc(80, 130, 17, 0, 7); x.stroke(); x.beginPath(); x.moveTo(92, 143); x.lineTo(106, 158); x.stroke();
    x.fillStyle = "#16243d"; x.font = F(700, 46); x.fillText(texto, 126, 138);
    if (cursor) { const w = x.measureText(texto).width; x.fillRect(130 + w, 110, 5, 52); }
  };
  // la ficha del buscador (genérica: blanco, navy y crema; estrellas navy)
  const ficha = (abierta) => {
    x.fillStyle = "#ffffff"; rr(x, 18, 212, W - 36, 846, 34);
    x.strokeStyle = "#d9d7c9"; x.lineWidth = 4; x.beginPath(); x.roundRect(18, 212, W - 36, 846, 34); x.stroke();
    x.fillStyle = "#16243d"; ajustar("Almacén de Rubén", 800, 60, W - 84); x.fillText("Almacén de Rubén", 42, 282);
    x.fillStyle = "#3a4560"; x.font = F(600, 46); x.fillText("Almacén de barrio", 42, 346);
    x.fillStyle = "#16243d"; for (let i = 0; i < 5; i++) estrella(x, 64 + i * 60, 408, 26);
    if (!abierta) {
      x.fillStyle = "#c7655b"; rr(x, 30, 456, W - 60, 210, 26);
      x.fillStyle = "#ffffff"; x.beginPath(); x.arc(76, 516, 17, 0, 7); x.fill();
      x.font = F(900, 68); x.fillText("Cerrado", 108, 520);
      const tm = ajustar("permanentemente", 900, 60, W - 60 - 40); x.font = F(900, tm); x.fillText("permanentemente", 50, 606);
    } else {
      x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(56, 506, 17, 0, 7); x.fill();
      x.font = F(900, 58); x.fillText("Abierto ahora", 86, 510);
      x.fillStyle = "#16243d"; const th = ajustar("Lun a sáb · 8 a 20", 800, 50, W - 80); x.font = F(800, th); x.fillText("Lun a sáb · 8 a 20", 40, 594);
    }
    x.fillStyle = "#3a4560"; x.font = F(600, 46); x.textAlign = "center"; x.fillText("Av. Rivera 2140", W / 2 + 30, 724); x.textAlign = "left";
    // el enlace "Sitio web" (en la parte 2, verde: lo toca) y "Cómo llegar"
    x.fillStyle = abierta ? "#5ce611" : "#e9e7dc"; rr(x, 30, 786, W - 60, 112, 56);
    x.fillStyle = "#e9e7dc"; rr(x, 30, 922, W - 60, 104, 52);
    x.fillStyle = "#16243d"; x.textAlign = "center"; x.font = F(900, 52); x.fillText("Sitio web", W / 2, 844); x.font = F(800, 46); x.fillText("Cómo llegar", W / 2, 976); x.textAlign = "left";
    if (abierta && rip > 0 && rip < 6) { const u = rip / 6; x.strokeStyle = `rgba(11,18,32,${0.8 * (1 - u)})`; x.lineWidth = 10; x.beginPath(); x.arc(W / 2, 842, 30 + u * 170, 0, 7); x.stroke(); }
  };
  if (fase === "ficha") {
    x.fillStyle = "#f6f5ef"; x.fillRect(0, 0, W, H); barraEstado(x, W, false);
    buscador("almacén rubén", false);
    ficha(false);
  } else if (fase === "busca") {
    // se tipea y abajo las sugerencias (la pantalla nunca queda vacía)
    x.fillStyle = "#f6f5ef"; x.fillRect(0, 0, W, H); barraEstado(x, W, false);
    buscador("almacén rubén".slice(0, Math.max(1, tipeo)), true);
    const sug = ["almacén rubén", "almacén abierto", "almacenes cerca", "almacén de barrio"];
    sug.forEach((s2, i) => {
      const y = 260 + i * 130;
      x.fillStyle = "#ffffff"; rr(x, 18, y, W - 36, 112, 24);
      x.strokeStyle = "#9aa3b5"; x.lineWidth = 6; x.beginPath(); x.arc(70, y + 56, 16, 0, 7); x.stroke(); x.beginPath(); x.moveTo(81, y + 67); x.lineTo(94, y + 80); x.stroke();
      x.fillStyle = "#16243d"; ajustar(s2, 600, 46, W - 150); x.fillText(s2, 112, y + 58);
    });
    x.fillStyle = "#e9e7dc"; rr(x, 18, 800, W - 36, 240, 28);
    x.fillStyle = "#c9cdd6"; for (let i = 0; i < 3; i++) for (let j = 0; j < 6; j++) rr(x, 40 + j * 80, 830 + i * 66, 64, 50, 10);
  } else if (fase === "ficha2") {
    x.fillStyle = "#f6f5ef"; x.fillRect(0, 0, W, H); barraEstado(x, W, false);
    buscador("almacén rubén", false);
    x.save(); const u = ent / 6; x.translate(0, (1 - eo(u)) * 120); ficha(true); x.restore();
  } else {
    // la web del almacén (navy, crema y verde): abre entera al toque, cada bloque entra con un pop
    const k = (i) => pasos[i] / 6;
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 300); barraEstado(x, W, true);
    x.fillStyle = "#5ce611"; x.fillRect(0, 294, W, 8);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 72); x.fillText("Almacén", W / 2, 140); x.font = F(800, 60); x.fillText("de Rubén", W / 2, 222);
    const pop = (i, cx, cy, dibujo) => { const u = k(i); if (u <= 0) return; const s = bk(u); x.save(); x.translate(cx, cy); x.scale(s, s); x.translate(-cx, -cy); dibujo(); x.restore(); };
    pop(0, W / 2, 370, () => { x.fillStyle = "#5ce611"; rr(x, 50, 326, W - 100, 92, 46); x.fillStyle = "#0b1220"; x.beginPath(); x.arc(84, 372, 13, 0, 7); x.fill(); x.font = F(900, 40); x.textAlign = "center"; x.fillText("ABIERTO AHORA", W / 2 + 22, 374); });
    pop(1, 180, 500, () => { x.fillStyle = "#16243d"; x.textAlign = "left"; x.font = F(700, 44); x.fillText("Lun a sáb", 44, 478); x.font = F(900, 46); x.fillText("8:00 a 20:00", 44, 540); });
    pop(4, 440, 505, () => { x.save(); x.beginPath(); x.roundRect(380, 444, 128, 128, 24); x.clip(); x.drawImage(fotoCanvas, 380, 444, 128, 128); x.restore(); x.strokeStyle = "#5ce611"; x.lineWidth = 6; x.beginPath(); x.roundRect(380, 444, 128, 128, 24); x.stroke(); });
    pop(2, W / 2, 720, () => {
      x.fillStyle = "#dfe4d6"; rr(x, 36, 610, W - 72, 220, 24);
      x.strokeStyle = "#ffffff"; x.lineWidth = 16; for (const [a, b, c, d] of [[36, 690, W - 36, 670], [36, 790, W - 36, 800], [180, 610, 200, 830], [360, 610, 330, 830]]) { x.beginPath(); x.moveTo(a, b); x.lineTo(c, d); x.stroke(); }
      x.fillStyle = "#16243d"; x.fillRect(220, 700, 90, 70);
      const cae = pin / 12, py = 650 + (1 - eo(Math.min(1, cae * 1.4))) * -60 + Math.sin(cae * Math.PI * 2) * (1 - cae) * 10;
      x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.arc(265, py, 32, Math.PI, 0); x.lineTo(265, py + 64); x.closePath(); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.beginPath(); x.arc(265, py, 11, 0, 7); x.fill();
    });
    pop(3, W / 2, 920, () => {
      x.fillStyle = "#5ce611"; rr(x, 36, 860, W - 72, 120, 30); x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.roundRect(36, 860, W - 72, 120, 30); x.stroke();
      // globito de chat genérico (de líneas, sin el logo de ninguna app)
      x.lineWidth = 6; x.beginPath(); x.roundRect(110, 896, 60, 46, 14); x.stroke(); x.beginPath(); x.moveTo(122, 940); x.lineTo(118, 958); x.lineTo(138, 942); x.stroke();
      x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 52); x.fillText("Escribinos", 196, 922);
    });
  }
  pantG.needsUpdate = true;
}
// pantalla de Rubén: la notificación de Mamá (parte 1: "¿Por qué me entero por internet?"; parte 2: "Vi tu página.")
let claveR = "";
function dibujarCeluR(t) {
  const p2 = t >= P2, tn = p2 ? T.notif2 : T.notif;
  const u = Math.round(sg(t, tn, tn + 0.25) * 8) / 8, mini = p2 ? Math.round(sg(t, T.mini, T.mini + 0.25) * 6) / 6 : 0;
  const clave = `${p2}|${u}|${mini}`;
  if (clave === claveR) return;
  claveR = clave;
  const { x } = pantR.userData, W = 600, H = 1200;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#1f3254"; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(100 + i * 90, 1000 - i * 60, 160, 0, 7); x.fill(); }
  barraEstado(x, W, true);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(300, 150); x.fillText("10:15", W / 2, 230);
  x.font = F(700, 50); x.fillText("martes", W / 2, 334);
  if (u > 0) {
    const y0 = 420 - (1 - eo(u)) * 300;
    x.save();
    x.fillStyle = "#ffffff"; rr(x, 26, y0, W - 52, p2 && mini > 0 ? 470 : 330, 34);
    x.fillStyle = "#efeee5"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.arc(100, y0 + 80, 46, 0, 7); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.font = F(900, 52); x.fillText("M", 100, y0 + 84);
    x.textAlign = "left"; x.font = F(900, 54); x.fillText("Mamá", 170, y0 + 82);
    x.fillStyle = "#16243d"; x.font = F(700, 46);
    const lineas = p2 ? ["Vi tu página.", "¡Qué buen mozo!"] : ["¿Por qué me entero", "por internet?"];
    lineas.forEach((l, i) => x.fillText(l, 56, y0 + 190 + i * 64));
    if (p2 && mini > 0) {
      x.save(); x.globalAlpha = mini; x.beginPath(); x.roundRect(56, y0 + 300, 140, 140, 22); x.clip(); x.drawImage(fotoCanvas, 56, y0 + 300, 140, 140); x.restore();
      x.save(); x.globalAlpha = mini; x.fillStyle = "#16243d"; x.font = F(800, 42); x.fillText("Almacén", 220, y0 + 350); x.fillText("de Rubén", 220, y0 + 400); x.restore();
    }
    x.restore();
  }
  pantR.needsUpdate = true;
}

// ================= GLOBOS DE DIÁLOGO (pegados a la cámara, en píxeles de pantalla) =================
// Unidades de la geometría: 1 = 1000 px de pantalla. Blancos con borde navy de 8 px y sombra dura navy (sobre la
// pared crema), texto navy Lexend 800. `subraya`: una palabra de la primera línea con un trazo rojo apagado abajo.
const PXK = 1000;
function crearGlobo(lineas, px = 74, subraya = null) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const anchoTxt = Math.max(...lineas.map((l) => med.measureText(l).width)) / 2;
  const W = Math.round(anchoTxt + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.95);
  const tex = lienzo(W * 2, H * 2, (x, w, h) => {
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#0b1220"; x.font = F(800, px * 2); x.textAlign = "center"; x.textBaseline = "middle";
    lineas.forEach((l, i) => {
      const y = h / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.2 + px * 0.08;
      x.fillText(l, w / 2, y);
      if (subraya && i === 0 && l.includes(subraya)) {
        const ini = w / 2 - x.measureText(l).width / 2 + x.measureText(l.slice(0, l.indexOf(subraya))).width, ancho = x.measureText(subraya).width;
        x.strokeStyle = "#c7655b"; x.lineWidth = px * 0.26; x.lineCap = "round";
        x.beginPath(); x.moveTo(ini + 4, y + px * 0.86); x.quadraticCurveTo(ini + ancho / 2, y + px * 1.0, ini + ancho - 2, y + px * 0.8); x.stroke();
      }
    });
  });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: C.navy });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const w = W / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); sombra.position.set(9 / PXK, -11 / PXK, -0.016); g.add(sombra);
  const borde = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); borde.position.z = -0.012; g.add(borde);
  const caja = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja);
  const cola = new THREE.Group(); g.add(cola);
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(76 / PXK, 100 / PXK), bordeM); cs.position.set(9 / PXK, -5 / PXK, -0.017); cola.add(cs);
  const cb = new THREE.Mesh(tri(76 / PXK, 100 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; cola.add(cb);
  const cc = new THREE.Mesh(tri(52 / PXK, 76 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; cola.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; borde.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja.userData.orden = 4;
  g.userData = { W, H, cola };
  return pegarACamara(g, camera, 40);
}
const _v = new THREE.Vector3();
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0) {
  g.visible = s > 0.003;
  if (!g.visible) return;
  const halfH = Math.tan((camera.fov * D2R) / 2), k = (2 * halfH) / 1920;
  const { W, H, cola } = g.userData;
  cx = cl(cx, W / 2 + 50, 1030 - W / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s);
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (W / 2), -0.62, 0.62);
  cola.position.set((lado * W) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
  const ang = Math.atan2(ox - (cx + (lado * W) / 2), oy - (cy + H / 2));
  cola.rotation.z = cl(ang, -0.9, 0.9);
}
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const _cab = new THREE.Vector3();
function cabezaEnPantalla(p, dy = 0.0) { p.cabeza.getWorldPosition(_cab); _cab.y += dy; return enPantalla(_cab); }
const GL = {
  cerraste: crearGlobo(["Rubén… dice acá", "que cerraste."], 74),
  pesame: crearGlobo(["Mi más sentido", "pésame, Rubén."], 72),
  era: crearGlobo(["¡Era tan buen", "almacén!"], 78, "Era"),
  abierto: crearGlobo(["¡Estás abierto!"], 80),
};

// ================= CONTADOR "Pésames: N" (pegado a la cámara, arriba) =================
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 5, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 2 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g;
};
const contador = new THREE.Group();
const NUMS = {};
const tacha = new THREE.Group();
{
  const W = 0.76, H = 0.24;
  const tex = lienzo(1520, 480, (x, w, h) => {
    x.fillStyle = "#0b1220"; rr(x, 0, 0, w, h, 110);
    x.strokeStyle = "#5ce611"; x.lineWidth = 22; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 90); x.stroke();
    x.fillStyle = "#efeee5"; x.font = F(800, 150); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("Pésames:", 96, h / 2 + 8);
  });
  const nav = mat(C.navy, 0.5);
  const placa = mesh(rbox(W, H, 0.05, 0.06, 4), [nav, nav, nav, nav, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.25 }), nav]);
  placa.userData.orden = 0; contador.add(placa);
  const rojo = new THREE.MeshStandardMaterial({ color: 0xe0786d, roughness: 0.45, emissive: C.red, emissiveIntensity: 0.4 });
  const verde = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.4, emissive: C.g, emissiveIntensity: 0.35 });
  for (let n = 3; n <= 13; n++) { const m = mesh(textoGeo(String(n), 0.13, 0.04), rojo, 0.22, 0.0, 0.05); m.userData.orden = 2; contador.add(m); NUMS[n] = m; }
  NUMS[0] = mesh(textoGeo("0", 0.13, 0.04), verde, 0.22, 0.0, 0.05); NUMS[0].userData.orden = 2; contador.add(NUMS[0]);
  const raya = mesh(rbox(0.2, 0.026, 0.02, 0.012), mat(C.red, 0.5, { emissive: C.red, emissiveIntensity: 0.3 }), 0, 0, 0); raya.userData.orden = 3; tacha.add(raya);
  tacha.position.set(0.22, 0.0, 0.08); tacha.rotation.z = 0.18; contador.add(tacha);
  pegarACamara(contador, camera, 60);
}
function ponerContador(cx, cy, s) {
  contador.visible = s > 0.003;
  if (!contador.visible) return;
  const halfH = Math.tan((camera.fov * D2R) / 2), k = (2 * halfH) / 1920;
  contador.position.set((cx - 540) * k, (960 - cy) * k, -1);
  contador.scale.setScalar(k * PXK * s);
  contador.traverse((o) => { if (o.isMesh) o.renderOrder = 60 + (o.userData.orden || 0); });
}
// el número en t: [n, desde (el último cambio)]
function numeroEn(t) {
  if (t >= P2) return t >= T.c0 + 0.25 ? [0, T.c0 + 0.25] : [13, T.q1];
  if (t >= T.c13) return [13, T.c13];
  if (t >= T.c12[0]) { const i = Math.min(4, Math.floor(sg(t, T.c12[0], T.c12[1]) * 4.999)); return [8 + i, T.c12[0] + i * ((T.c12[1] - T.c12[0]) / 4)]; }
  if (t >= T.c7) return [7, T.c7];
  return [3, T.c3];
}

// ================= CÁMARA =================
// PLANOS: [desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov, modo]. Entre planos hay corte seco; dentro de un
// plano, Catmull-Rom continua (modo "e" = tramo con ease propio: el push-in rápido). "celu" = inserto cenital del
// celular de Rubén (la cámara la pone ponerCamara).
const kP1 = (t0, t1, dolly = true) => dolly
  ? [[t0, RI.x - 0.62, 1.56, 0.62, RI.x - 0.02, 0.86, -1.9, 55], [t0 + 1.2, RI.x - 0.62, 1.56, 0.56, RI.x - 0.02, 0.86, -1.9, 55], [t1, RI.x - 0.36, 1.5, -0.35, RI.x, 1.17, -1.9, 46]]
  : [[t0, RI.x - 0.62, 1.56, 0.62, RI.x - 0.02, 0.86, -1.9, 55], [t1, RI.x - 0.62, 1.56, 0.5, RI.x - 0.02, 0.86, -1.9, 55]];
const kP3 = (t0, t1, lx = 0.06, fov = 56) => [[t0, lx, 2.3, -2.75, lx, 1.3, 0.1, fov], [t1, lx, 2.27, -2.65, lx, 1.3, 0.1, fov]];
const kP6 = (t0, t1, push) => push
  ? [[t0, RI.x, 1.44, 0.45, RI.x, 1.22, RI.z, 40], [push[0], RI.x, 1.44, 0.4, RI.x, 1.22, RI.z, 40, "e"], [push[1], RI.x, 1.42, -0.1, RI.x, 1.25, RI.z, 40], [t1, RI.x, 1.42, -0.14, RI.x, 1.25, RI.z, 40]]
  : [[t0, RI.x, 1.44, 0.45, RI.x, 1.22, RI.z, 40], [t1, RI.x, 1.43, 0.15, RI.x, 1.24, RI.z, 40]];
const PLANOS = [
  // P1 · sobre el hombro de Graciela: su celular en primer plano, Rubén abierto atrás con el mate
  [0, kP1(0, T.p2)],
  // P2 · primer plano de Rubén (contraplano): se señala con el mate, sorbe
  [T.p2, [[T.p2, RI.x - 0.3, 1.5, 0.35, RI.x, 1.18, RI.z, 42], [T.p3, RI.x - 0.29, 1.5, 0.22, RI.x, 1.18, RI.z, 42]]],
  // P3 · general alto desde atrás de la caja, mirando a la puerta: entra Marta de negro con la bandeja
  [T.p3, kP3(T.p3, T.p3b)],
  // P3b · Rubén de frente (desde el lado de los clientes): la mano de Marta en su antebrazo, él mira la mano y a cámara
  [T.p3b, [[T.p3b, -0.15, 1.6, 0.55, 0.0, 1.22, RI.z, 46], [T.p4, -0.13, 1.59, 0.42, 0.0, 1.22, RI.z, 46]]],
  // P4 · la puerta desde adentro, push-in a la corona hasta que la cinta llena el ancho
  [T.p4, [[T.p4, 0.2, 1.3, -1.0, 0.2, 1.25, CORONA.z, 54], [T.push[0], 0.2, 1.3, -0.98, 0.2, 1.25, CORONA.z, 53], [T.push[1], 0.2, 1.2, -0.62, 0.2, 1.17, CORONA.z, 44], [T.p5, 0.2, 1.2, -0.6, 0.2, 1.17, CORONA.z, 44]]],
  // P5 · plano medio de Graciela y Marta (contraplano de 3/4 desde atrás del mostrador)
  [T.p5, [[T.p5, 1.2, 1.55, -2.95, 0.44, 1.22, -0.52, 48], [T.p6, 1.17, 1.54, -2.85, 0.44, 1.22, -0.52, 48]]],
  // P6 · primer plano de Rubén de frente (la pausa, el push-in, "Es, Graciela.")
  [T.p6, kP6(T.p6, T.p7, T.pushIn)],
  // P7 · inserto cenital del celular de Rubén sobre el mostrador
  [T.p7, "celu"],
  // P8 · general de frente: Rubén mira al techo, Marta le acerca un bizcocho
  [T.p8, [[T.p8, RI.x + 0.08, 2.35, 1.2, RI.x + 0.02, 1.0, -1.5, 48], [P1, RI.x + 0.1, 2.36, 1.25, RI.x + 0.02, 1.0, -1.5, 48]]],
  // ---- parte 2 (los mismos encuadres: el callback se ve) ----
  [P2, kP1(P2, T.q2, false)],
  [T.q2, kP3(T.q2, T.q3, -0.18, 62)],
  [T.q3, kP6(T.q3, T.q4)],
  [T.q4, "celu"],
  // Q5 · primer plano de Rubén, push-in lento: el cuello de la camisa, el guiño
  [T.q5, [[T.q5, RI.x, 1.44, 0.3, RI.x, 1.24, RI.z, 38], [T.q6, RI.x, 1.43, -0.05, RI.x, 1.26, RI.z, 38]]],
  // Q6 · general que se abre (dolly atrás)
  [T.q6, [[T.q6, RI.x + 0.08, 2.2, 0.7, RI.x + 0.02, 1.05, -1.5, 48], [DUR, RI.x + 0.1, 2.36, 1.25, RI.x + 0.02, 1.0, -1.5, 48]]],
];
const NOMBRES = ["P1", "P2", "P3", "P3b", "P4", "P5", "P6", "P7", "P8", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6"];
const _m = new THREE.Vector3();
let planoActual = 0, camCelu = false;
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  if (a[8] === "e") { const x = 1 - Math.pow(1 - u, 4); return a.slice(1, 8).map((q, j) => lerp(q, b[j + 1], x)); }
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 && CAM[i - 1][8] !== "e" ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length && b[8] !== "e" ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
  planoActual = pi;
  camCelu = PLANOS[pi][1] === "celu";
  if (camCelu) {
    // inserto cenital: el celular de Rubén de frente, la parte de arriba de la pantalla hacia el fondo del almacén
    const t0 = PLANOS[pi][0], d = lerp(0.365, 0.345, sg(t, t0, t0 + 1.6));
    camera.position.set(CELU_R.x - 0.004, CELU_R.y + d, CELU_R.z - 0.005); camera.up.set(0, 0, -1); camera.fov = 38; camera.updateProjectionMatrix();
    camera.lookAt(CELU_R.x - 0.004, CELU_R.y, CELU_R.z - 0.015); camera.up.set(0, 1, 0);
    return;
  }
  const v = catmull(PLANOS[pi][1], t);
  const mano = Math.sin(t * 0.9) * 0.006;
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.004, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const MATE_D = { manoD: [-0.2, 0.3, 0.3], codoD: [-1, -0.6, -0.2], dedoD: 0 };
const APOYA_I = { manoI: [0.3, 0.32, 0.4], codoI: null, dedoI: 0 };
// ---- Rubén ----
const RK = [
  // P1: abierto, tranquilo, con el mate; escucha a Graciela
  [0, { x: RI.x, z: RI.z, giro: 0, ...MATE_D, ...APOYA_I, ...aC(-0.28, 0.02), ...CARA.sonrisa, ojos: { x: -0.3, y: 0.0, abiertos: 1, feliz: 0.2 } }],
  [1.25, { cejas: { alto: 0.55, ang: 0.15 }, boca: { sonrisa: 0.35, abierta: 0 }, ojos: { feliz: 0 } }, 0.3],
  // P2: cejas arriba; se señala el pecho con el mate ("estoy acá"); sorbe sin dejar de mirarla
  [T.p2 + 0.05, { ...CARA.incredula, cejas: { alto: 0.4, ang: 0.1, asim: 0.6 }, ojos: { x: -0.25, abiertos: 0.85 }, boca: { sonrisa: -0.1 } }, 0.15],
  [T.senala, { manoD: [-0.03, 0.36, 0.33], codoD: [-1, -0.5, 0.05], cejas: { alto: 0.9, ang: 0.2, asim: 0 }, ojos: { abiertos: 1 }, boca: { sonrisa: 0.05, ancho: 0.85 }, cabeza: { asiente: -0.06, ladea: 0.08 } }, 0.2],
  [T.sorbo - 0.12, { ...MATE_D, cejas: { alto: 0.7, ang: 0.15 }, cabeza: { asiente: 0.02 } }, 0.25],
  // P3: mira a Marta que entra; después la mano en el brazo y "a cámara" con cara de nada
  [T.p3 - 0.001, { giro: 0.45, ...aC(0.1, 0), ...CARA.neutra, ojos: { x: 0.1, abiertos: 0.9 } }, 0.001],
  [T.c3, { ...aC(0.35, 0.05), ojos: { x: 0.35 }, ...CARA.incredula, cejas: { alto: 0.5, asim: 0.5 } }, 0.3],
  [T.p3b - 0.001, { giro: 0, ...aC(0.2, 0.05), ojos: { x: 0.3, abiertos: 0.85 } }, 0.001],
  [T.mano[0] + 0.15, { ...aC(0.08, 0.3), ojos: { x: 0.7, y: -0.9, abiertos: 0.85 } }, 0.2],
  [T.aCam + 0.2, { giro: 0, cabeza: { giro: -0.06, asiente: 0.02, ladea: -0.05 }, ojos: { x: 0.2, y: 0.05, abiertos: 0.6, tension: 0.3 }, cejas: { alto: 0.1, ang: 0.45, asim: 0 }, boca: { sonrisa: -0.4, abierta: 0, ancho: 0.9 } }, 0.22],
  // P6: corte; todavía mira a Graciela; gira la cabeza lento a cámara; "Es, Graciela."
  [T.p6 - 0.001, { x: RI.x, giro: 0, ...MATE_D, ...APOYA_I, ...aC(-0.35, 0.03), ojos: { x: -0.4, y: 0, abiertos: 0.62, tension: 0.35, feliz: 0 }, cejas: { alto: 0.2, ang: 0.6, asim: 0 }, boca: { sonrisa: -0.45, abierta: 0, ancho: 0.95 } }, 0.001],
  [T.giraCab[1], { ...aC(0.0, 0.02, 0.02), ojos: { x: 0, y: 0.04, abiertos: 0.6, tension: 0.35 } }, T.giraCab[1] - T.giraCab[0]],
  [T.voz1 + 1.5, { cejas: { alto: 0.3, ang: 0.7 } }, 0.3],
  // P8: mira al techo, resignado; agarra el bizcocho sin bajar la vista
  [T.p8 - 0.001, { x: RI.x, giro: 0, ...MATE_D, ...APOYA_I, cabeza: { giro: 0.05, asiente: -0.4, ladea: 0.06 }, ojos: { x: 0, y: 0.95, abiertos: 0.85, tension: 0.4 }, cejas: { alto: 0.55, ang: 0.7 }, boca: { sonrisa: -0.45, abierta: 0, ancho: 0.9 } }, 0.001],
  [T.muerde, { cabeza: { giro: 0.05, asiente: -0.2, ladea: 0.04 }, ojos: { y: 0.9 } }, 0.25],
  // ---- parte 2 ----
  [P2 - 0.001, { x: RI.x, giro: 0, ...MATE_D, ...APOYA_I, ...aC(-0.28, 0.02), ...CARA.sonrisa, ojos: { x: -0.3, y: 0, abiertos: 1, feliz: 0.3 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.8 } }, 0.001],
  [T.q2 - 0.001, { giro: 0.15, ...aC(0.05, 0), ojos: { x: 0.0 } }, 0.001],
  [T.entra2[1], { giro: 0, ...aC(-0.28, 0.0), ojos: { x: -0.3 } }, 0.4],
  // Q3: sorbo con los ojos cerrados, baja el mate, media sonrisa a cámara, "Estoy, Graciela."
  [T.q3 - 0.001, { giro: 0, ...aC(0.0, 0.03), ...CARA.sonrisa, ojos: { x: 0, y: 0.03, abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.5 } }, 0.001],
  [T.sorbo2[0] + 0.15, { ojos: { abiertos: 0, feliz: 0.6 } }, 0.15],
  [T.baja, { ojos: { abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55 }, cejas: { alto: 0.25 } }, 0.2],
  // Q5: se acomoda el cuello de la camisa, infla el pecho, guiña y levanta apenas el mate (brindis)
  [T.q5 - 0.001, { ...aC(0.0, 0.02), ...CARA.sonrisa, ojos: { x: 0, y: 0.03, abiertos: 1, feliz: 0.3 }, boca: { sonrisa: 0.7 } }, 0.001],
  [T.cuello + 0.3, { inclina: -0.07, cabeza: { giro: 0.03, asiente: -0.08, ladea: 0.05 }, cejas: { alto: 0.45 }, boca: { sonrisa: 0.85, ancho: 1.1 } }, 0.3],
  [T.guino, { ojos: { guiño: -1, feliz: 0.45 }, cejas: { asim: 0.7 }, boca: { sonrisa: 1, ancho: 1.15 }, manoD: [-0.16, 0.42, 0.34] }, 0.12],
  [T.guino + 0.5, { ojos: { guiño: 0, feliz: 0.35 }, cejas: { asim: 0 } }, 0.15],
  [T.q6 - 0.001, { ...MATE_D, ...APOYA_I, ...aC(-0.3, 0.05), ...CARA.sonrisa, ojos: { x: -0.3, abiertos: 1, feliz: 0.4 }, cejas: { alto: 0.45, ang: 0.1, asim: 0 }, boca: { sonrisa: 0.9, abierta: 0, ancho: 1.1 }, inclina: 0 }, 0.001],
];
// ---- Graciela ----
const G_GIRO = Math.atan2(RI.x - G0.x, RI.z - G0.z);
const GK = [
  [0, { x: G0.x, z: G0.z, giro: G_GIRO, ...BRAZOS.costado, ...aC(0, 0.05), ...CARA.neutra, cejas: { alto: 0.4, ang: 0.6 }, boca: { sonrisa: -0.2 } }],
  // P3: mira cómo entra Marta (por la derecha)
  [T.p3 - 0.001, { ...aC(-0.55, 0.02), ojos: { x: -0.6 }, cejas: { alto: 0.5, ang: 0.7 } }, 0.001],
  [T.c3, { ...aC(-0.7, 0.05), ...CARA.resignado, ojos: { x: -0.7, abiertos: 0.7, tension: 0.5 } }, 0.3],
  // P5: junto a Marta, de cara a la cámara de 3/4; el pañuelo a la boca; "¡Era tan buen almacén!"
  [T.p5 - 0.001, { x: 0.12, z: -0.6, giro: 2.72, ...BRAZOS.costado, ...aC(0.0, 0.08), ...CARA.resignado, ojos: { x: 0.0, y: 0.0, abiertos: 0.65, tension: 0.6 } }, 0.001],
  [T.b3 + 0.3, { cabeza: { giro: 0.05, asiente: 0.0, ladea: 0.12 }, ojos: { abiertos: 0.75 }, cejas: { alto: 0.6, ang: 1 } }, 0.25],
  // P8: de vuelta en su lugar, triste, el pañuelo en la mano
  [T.p8 - 0.001, { x: G0.x, z: G0.z, giro: G_GIRO, ...BRAZOS.costado, ...aC(0.0, 0.1), ...CARA.resignado, ojos: { abiertos: 0.7 } }, 0.001],
  // ---- parte 2: entra contenta con el celular en alto ----
  [T.q2 - 0.001, { x: 0.34, z: FZ + 0.5, giro: Math.PI, paso: 1, ...BRAZOS.costado, manoD: [-0.36, 0.6, 0.3], codoD: [-1, -0.2, 0.2], ...aC(0, -0.05), ...CARA.feliz }, 0.001],
  [T.entra2[0] + 0.45, { x: 0.3, z: 0.3 }, 0.6, (u) => u],
  [T.entra2[1], { x: G0.x, z: G0.z, giro: G_GIRO, paso: 0 }, T.entra2[1] - T.entra2[0] - 0.45],
  [T.b4 + 0.5, { manoD: [-0.28, 0.5, 0.32] }, 0.35],
  [T.q6 - 0.001, { x: G0.x, z: G0.z, giro: G_GIRO, ...BRAZOS.costado, manoI: [0.12, 0.38, 0.42], codoI: [1, -0.5, -0.2], ...aC(0, 0.05), ...CARA.sonrisa }, 0.001],
];
// ---- Marta ----
const M_GIRO = Math.atan2(RI.x - M0.x, RI.z - M0.z);
const BANDEJA_M = { manoI: [0.14, 0.3, 0.36], manoD: [-0.14, 0.3, 0.36], codoI: [1, -0.6, -0.3], codoD: [-1, -0.6, -0.3], dedoI: 0, dedoD: 0 };
const PESAME = { ojos: { abiertos: 0.7, tension: 0.65, feliz: 0 }, cejas: { alto: 0.35, ang: 0.9, asim: 0 }, boca: { sonrisa: -0.5, abierta: 0, ancho: 0.85 } };
const MK = [
  [0, { x: 0.38, z: FZ + 1.3, giro: Math.PI, paso: 1, ...BANDEJA_M, ...aC(0, 0, 0.15), ...PESAME }],
  [T.entra[0] + 0.3, { x: 0.38, z: 0.8 }, T.entra[0] + 0.3 - T.p3, (u) => u],
  [T.entra[1], { x: M0.x, z: M0.z, giro: M_GIRO, paso: 0, cabeza: { giro: 0, asiente: 0.08, ladea: 0.16 } }, T.entra[1] - T.entra[0] - 0.3],
  [T.apoya, { inclina: 0.22, manoI: [0.14, 0.12, 0.45], manoD: [-0.14, 0.12, 0.45] }, 0.25],
  [T.mano[0], { inclina: 0.08, ...BRAZOS.costado }, 0.15],
  // P5: junto a Graciela, la mano en el pecho, asiente despacio
  [T.p5 - 0.001, { x: 0.62, z: -0.4, giro: 2.92, paso: 0, inclina: 0, ...BRAZOS.costado, manoD: [-0.05, 0.42, 0.27], codoD: [-1, -0.5, 0], ...aC(0.05, 0.1, 0.12), ...PESAME }, 0.001],
  // P8: en su lugar; agarra un bizcocho de la bandeja y se lo acerca a Rubén
  [T.p8 - 0.001, { x: M0.x, z: M0.z, giro: M_GIRO, ...BRAZOS.costado, ...aC(0.0, 0.05, 0.1), ...PESAME }, 0.001],
];

// ---------- helpers de mano en coordenadas del mundo ----------
const _w = new THREE.Vector3();
function manoA(per, pose, lado, mundo) {
  per.poner(pose); per.raiz.updateMatrixWorld(true);
  const l = per.cuerpo.worldToLocal(_w.copy(mundo));
  const k = per.cfg.alto || 1;
  pose[`mano${lado}`] = [l.x / k, l.y / k, l.z / k];
  return pose;
}
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
// un punto delante de la boca (en el mundo), d m hacia afuera de la cara
const bocaMundo = (per, d = 0.06, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(out.set(0, 0.181, 0.265 + d)); };
const bocaVoz = (p, t, t0, env) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * 0.7); }
};
// el mate en la mano derecha: base del mate = mano + MATE_OFF (girado con Rubén); la bombilla se inclina hacia su cara
const MATE_OFF = V3(0, -0.075, 0.025);
const PUNTA = V3(0, 0.31 * 1.25, -0.045 * 1.25); // punta de la bombilla relativa a la base (giro 0, escala 1,25)
const BIZ_TRAY = () => V3(BANDEJA.x - 0.06, BANDEJA.y + 0.06, BANDEJA.z + 0.02);
// el bizcocho que se come: en la bandeja, en la mano de Marta, en la de Rubén, a la boca
function posBizcocho(t) {
  if (t < T.ofrece - 0.1) return BIZ_TRAY();
  const ofrecido = V3(RI.x + 0.3, 1.12, -1.35);
  if (t < T.ofrece + 0.3) return BIZ_TRAY().lerp(ofrecido, eio(sg(t, T.ofrece - 0.1, T.ofrece + 0.3)));
  if (t < T.agarra) return ofrecido;
  const boca = bocaMundo(ruben, 0.085, V3()).add(V3(0, -0.015, 0)), abajo = V3(RI.x + 0.25, 1.05, -1.5);
  if (t < T.muerde + 0.08) return ofrecido.clone().lerp(boca, eio(sg(t, T.agarra, T.muerde)));
  return boca.lerp(abajo, eio(sg(t, T.muerde + 0.08, T.muerde + 0.38)));
}

function ponerPersonajes(t, plano) {
  // ---- Rubén ----
  let pr = poseEn(t, RK);
  const gR = pr.giro;
  // sorbo: la punta de la bombilla llega delante de la boca (P2 con los ojos abiertos, Q3 con los ojos cerrados)
  for (const [a, b] of [[T.sorbo - 0.15, T.sorbo + 0.35], [T.sorbo2[0] - 0.15, T.sorbo2[1]]]) {
    const u = eio(sg(t, a, a + 0.22)) * (1 - eio(sg(t, b - 0.1, b + 0.15)));
    if (u > 0) {
      ruben.poner(pr);
      const bm = bocaMundo(ruben, 0.035, V3());
      const rot = new THREE.Matrix4().makeRotationY(gR);
      const hand = bm.clone().sub(PUNTA.clone().applyMatrix4(rot)).sub(MATE_OFF.clone().applyMatrix4(rot));
      const p1 = manoA(ruben, { ...pr, codoD: [-1, -0.4, 0.1] }, "D", hand);
      pr.manoD = pr.manoD.map((v, i) => lerp(v, p1.manoD[i], u)); pr.codoD = [-1, -0.45, 0.05];
    }
  }
  bocaVoz(pr, t, T.voz1, VOZ1_ENV);
  bocaVoz(pr, t, T.voz2, VOZ2_ENV);
  // P3: Marta le apoya la mano en el antebrazo: la mano izquierda de Rubén queda quieta sobre el mostrador
  if (en(t, T.p3, T.p4)) { pr = manoA(ruben, { ...pr }, "I", V3(RI.x + 0.36, MOSTRADOR.y + 0.03, -1.43)); pr.codoI = [1, -0.5, -0.4]; }
  // P8: agarra el bizcocho y lo muerde (sin bajar la vista)
  if (en(t, T.agarra - 0.3, P1)) {
    const u = eio(sg(t, T.agarra - 0.3, T.agarra)), b = posBizcocho(t);
    const p1 = manoA(ruben, { ...pr }, "I", b.clone().add(V3(0.1, -0.08, -0.01)));
    pr.manoI = pr.manoI.map((v, i) => lerp(v, p1.manoI[i], u)); pr.codoI = [1, -0.5, -0.2];
  }
  if (t >= T.muerde && t < P1) pr.boca = { ...pr.boca, abierta: 0.12 * pulso(t, T.muerde, 0.18), sonrisa: -0.3 };
  if (en(t, T.cuello + 0.2, T.guino)) pr.aplasta -= 0.03; // infla el pecho
  ruben.poner(pr);
  // ---- Graciela ----
  const pg = poseEn(t, GK);
  if (en(t, T.panuelo - 0.25, T.p6)) {
    // el pañuelo a la boca (no a los ojos: los lentes)
    const u = eio(sg(t, T.panuelo - 0.25, T.panuelo + 0.05));
    graciela.poner(pg);
    const objetivo = bocaMundo(graciela, 0.08, V3()).add(V3(0, -0.12, 0));
    const p1 = manoA(graciela, { ...pg }, "D", objetivo);
    pg.manoD = pg.manoD.map((v, i) => lerp(v, p1.manoD[i], u)); pg.codoD = [-1, -0.5, -0.1];
    pg.inclina = 0.06 * u;
  }
  graciela.poner(pg);
  // ---- Marta ----
  const pm = poseEn(t, MK);
  if (en(t, T.mano[0], T.p4)) {
    // la mano izquierda en el antebrazo de Rubén (arriba de su muñeca, sobre el mostrador)
    const u = eio(sg(t, T.mano[0], T.mano[0] + 0.25));
    const p1 = manoA(marta, { ...pm, inclina: 0.3 }, "I", V3(RI.x + 0.3, MOSTRADOR.y + 0.1, -1.48));
    pm.manoI = pm.manoI.map((v, i) => lerp(v, p1.manoI[i], u)); pm.codoI = [1, -0.3, -0.2]; pm.inclina = lerp(pm.inclina, 0.3, u);
  }
  if (en(t, T.p5, T.p6)) pm.cabeza = { ...pm.cabeza, asiente: 0.1 + 0.07 * Math.sin((t - T.p5) * 3.2) };
  if (en(t, T.ofrece - 0.35, T.agarra + 0.4)) {
    const u = eio(sg(t, T.ofrece - 0.35, T.ofrece - 0.1)) * (1 - eio(sg(t, T.agarra + 0.05, T.agarra + 0.4)));
    const b = posBizcocho(Math.min(t, T.agarra));
    const p1 = manoA(marta, { ...pm, inclina: 0.18 }, "I", b.clone().add(V3(0, -0.04, 0.03)));
    pm.manoI = pm.manoI.map((v, i) => lerp(v, p1.manoI[i], u)); pm.codoI = [1, -0.4, -0.2]; pm.inclina = 0.18 * u;
    pm.boca = { ...pm.boca, sonrisa: lerp(-0.5, 0.1, u) };
  }
  marta.poner(pm);
  // visibilidad por plano (los que no están en cuadro no tapan la cámara)
  ruben.raiz.visible = !["P3", "P4", "P5", "Q2", "P7", "Q4"].includes(plano);
  graciela.raiz.visible = !["P1", "Q1", "P2", "P3b", "P4", "P6", "Q3", "Q5"].includes(plano);
  marta.raiz.visible = ["P3", "P5", "P8"].includes(plano) || (plano === "P3b" && t >= T.mano[0] - 0.05);
}

// ================= ESCENA EN EL TIEMPO =================
const _a = new THREE.Vector3();
function renderAt(tIn) {
  // durante el cartel el canvas muestra el último cuadro de la parte 1 (se va girando) y el primero de la 2 (iris)
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  ponerCamara(t);
  const plano = NOMBRES[planoActual];
  ponerPersonajes(t, plano);
  for (const per of [ruben, graciela, marta]) per.ojoLejano(camera.position);
  relleno.position.copy(camera.position).add(V3(0.4, 0.8, 0)); relleno.target.position.copy(camera.position).add(camera.getWorldDirection(_a).multiplyScalar(3));

  // ---- la puerta: se abre cuando entra alguien ----
  {
    // la puerta ya está abierta cuando arranca el plano (así el cartel y el vinilo no le tapan la cara a quien entra)
    const cierra = (a) => (t < a - 1.2 ? 0 : 1 - eio(sg(t, a, a + 0.3)));
    hoja.rotation.y = -1.1 * (parte2 ? cierra(T.entra2[1] - 0.05) : cierra(T.entra[1] - 0.3));
    vinilo.visible = parte2;
  }
  // ---- la corona: aparece en P4 con pop y rebotito sobre su trípode; parte 1 solamente ----
  {
    corona.visible = !parte2 && t >= T.corona;
    if (corona.visible) {
      const e = bk(sg(t, T.corona, T.corona + 0.3)), sq = pulso(t, T.corona + 0.18, 0.2) * 0.12;
      corona.position.copy(CORONA); corona.rotation.set(0, Math.PI, 0); // apoyada contra el vidrio, mira hacia adentro
      corona.scale.set(Math.max(0.001, e) * (1 + sq), Math.max(0.001, e) * (1 - sq), Math.max(0.001, e));
    }
  }
  // ---- mate (siempre en la mano derecha de Rubén) y termo ----
  {
    const p = manoMundo(ruben, "D", _a);
    const rot = new THREE.Matrix4().makeRotationY(ruben.raiz.rotation.y);
    mateR.position.copy(p).add(MATE_OFF.clone().applyMatrix4(rot)); mateR.rotation.set(0, ruben.raiz.rotation.y - Math.PI / 2, 0);
    mateR.visible = ruben.raiz.visible;
    termoR.position.copy(TERMO); termoR.rotation.set(0, 0.6, 0); termoR.visible = !["P3", "Q2"].includes(plano);
  }
  // ---- la bandeja de bizcochos: en las manos de Marta, después en el mostrador (solo parte 1) ----
  {
    if (t < T.apoya) {
      const pi = manoMundo(marta, "I", V3()), pd = manoMundo(marta, "D", V3());
      bandeja.position.copy(pi).add(pd).multiplyScalar(0.5).add(V3(0, -0.02, 0)); bandeja.rotation.set(0, marta.raiz.rotation.y, 0);
      bandeja.visible = marta.raiz.visible;
    } else { bandeja.position.copy(BANDEJA); bandeja.rotation.set(0, 0.25, 0); bandeja.visible = !parte2 && plano !== "P7" && plano !== "P3b"; }
    // el bizcocho que se come
    const enMano = !parte2 && t >= T.ofrece - 0.1;
    bandeja.userData.bizcochos[0].visible = !enMano;
    bizcochoMano.visible = enMano && t < P1;
    if (bizcochoMano.visible) {
      bizcochoMano.position.copy(posBizcocho(t)); bizcochoMano.rotation.set(0.3, 0.4, 0);
      const mordido = t >= T.muerde + 0.06 ? 0.62 : 1;
      bizcochoMano.scale.set(1.3 * mordido, 1.3, 1.3);
    }
  }
  // ---- el pañuelo de Graciela (de P5 en adelante, en su mano derecha) ----
  {
    panuelo.visible = !parte2 && t >= T.panuelo - 0.25 && graciela.raiz.visible;
    if (panuelo.visible) {
      const p = manoMundo(graciela, "D", _a);
      panuelo.position.copy(p).add(V3(0, 0.075, 0)); panuelo.rotation.set(0, graciela.raiz.rotation.y, 0.2);
    }
  }
  // ---- los celulares ----
  {
    const enP1 = plano === "P1" || plano === "Q1";
    celuGcam.visible = enP1;
    if (enP1) {
      dibujarCeluG(t);
      // en P1 el celular baja y sale por abajo mientras la cámara va hacia Rubén
      const baja = plano === "P1" ? eio(sg(t, T.dolly[0], T.dolly[0] + 0.5)) : 0;
      celuGcam.position.set(-0.02, -0.075 - baja * 0.2, -0.315);
      celuGcam.rotation.set(-0.08 - baja * 0.3, 0.02, 0.05);
    }
    celuG2.visible = plano === "Q2" || plano === "Q6";
    if (celuG2.visible) {
      if (!enP1) dibujarCeluG(Math.max(t, T.foto + 0.3));
      const p = manoMundo(graciela, "D", _a);
      celuG2.position.copy(p).add(V3(0, 0.07, 0)); celuG2.rotation.set(0.15, graciela.raiz.rotation.y, 0);
    }
    // el de Rubén, sobre el mostrador (vibra)
    celuR.visible = ruben.raiz.visible || camCelu;
    dibujarCeluR(t);
    const vibra = en(t, T.vibra, T.vibra + 0.7) || en(t, T.vibra2, T.vibra2 + 0.7) ? 1 : 0;
    celuR.position.set(CELU_R.x + vibra * Math.sin(t * 90) * 0.004, CELU_R.y, CELU_R.z + vibra * Math.cos(t * 77) * 0.003);
    celuR.rotation.set(-Math.PI / 2, 0, vibra * Math.sin(t * 70) * 0.04);
  }

  // ---- globos ----
  {
    const ent = (ti) => bk(sg(t, ti, ti + 0.28));
    const cab = (p) => cabezaEnPantalla(p, 0.12);
    // "Rubén… dice acá que cerraste." (Graciela fuera de cuadro: la cola baja hacia su celular)
    ponerGlobo(GL.cerraste, 540, 200, plano === "P1" ? ent(T.b1) * (1 - eio(sg(t, 1.85, 2.05))) : 0, [330, 900]);
    // "Mi más sentido pésame, Rubén." (arriba de Marta, debajo del contador)
    if (plano === "P3" && t >= T.b2) { const [hx, hy] = cab(marta); ponerGlobo(GL.pesame, 560, 300, ent(T.b2), [hx, hy - 150]); }
    else if (plano === "P3b") ponerGlobo(GL.pesame, 720, 425, 1, [1080, 900]); else GL.pesame.visible = false;
    if (plano === "P5" && t >= T.b3) { const [hx, hy] = cab(graciela); ponerGlobo(GL.era, 700, 435, ent(T.b3), [hx + 40, hy - 250]); } else GL.era.visible = false;
    if (plano === "Q2" && t >= T.b4) { const [hx, hy] = cab(graciela); ponerGlobo(GL.abierto, Math.min(hx, 680), Math.min(470, hy - 300), ent(T.b4), [hx, hy - 120]); } else GL.abierto.visible = false;
  }
  // ---- contador de pésames ----
  {
    let s = 0;
    const visible = (!parte2 && t >= T.c3 && plano !== "P6") || (plano === "Q1" && t >= T.c0);
    if (visible) {
      const ini = parte2 ? T.c0 : T.c3;
      s = 0.92 * ((plano === "P3" && t < T.c3 + 0.4) || parte2 ? bk(sg(t, ini, ini + 0.3)) : 1);
    }
    const [n, desde] = numeroEn(t);
    for (const k in NUMS) NUMS[k].visible = false;
    const sinFlip = desde === T.c3 || desde === T.q1;
    // cada número nuevo entra con un pop de escala (sin girar: a mitad de giro se veía la cara de arriba como un bloque)
    NUMS[n].visible = true; NUMS[n].rotation.x = 0; NUMS[n].scale.setScalar(sinFlip ? 1 : 0.55 + 0.45 * bk(sg(t, desde, desde + (n > 7 && n < 12 ? 0.07 : 0.2))));
    const u = sg(t, T.c0 + 0.05, T.c0 + 0.2);
    tacha.visible = parte2 && n === 13 && u > 0; tacha.scale.set(Math.max(0.001, u), 1, 1);
    const late = (sinFlip ? 0 : pulso(t, desde, 0.28)) + (n === 13 && !parte2 ? pulso(t, T.c13, 0.4) * 0.8 : 0) + (n === 0 ? pulso(t, desde, 0.35) * 0.6 : 0);
    ponerContador(540, 182, s * (1 + 0.1 * late));
    contador.rotation.set(-0.04, Math.sin(t * 0.8) * 0.06, Math.sin(t * 0.6) * 0.012);
  }

  if (LIMPIO) { contador.visible = false; for (const k in GL) GL[k].visible = false; }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
