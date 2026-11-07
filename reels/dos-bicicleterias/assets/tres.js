// Capa 3D de dos-bicicleterias (Three.js r170 local). Base técnica: reels/por-que-la-lista y reels/abren-hoy.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Serie "Dos negocios": una calle low-poly con DOS bicicleterías iguales lado a lado, separadas por un pilar navy
// en x = 0 (la pantalla partida). Izquierda: toldo gris, luz baja. Derecha: en "Una" se prende (toldo verde, luz
// cálida). El mismo casco de bici en cada vidriera. Paula (personaje del módulo) y su bici verde; Nico (el empleado del elenco) en la puerta.
// Fondo crema #efeee5 (lo pone el HTML; el canvas es transparente). Sin marcas ni redes dibujadas: feed genérico.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { crearPersonaje, ELENCO, poseEn, saludo } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
const V = (x, y, z = 0) => new THREE.Vector3(x, y, z);
const lerpV = (A, B, u) => new THREE.Vector3(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E;
const D2R = Math.PI / 180;
// entra con pop en a, sale en b
const vida = (t, a, b, din = 0.4, dout = 0.3) => (t < a || t > b + dout ? 0 : bk(sg(t, a, a + din)) * (1 - eio(sg(t, b, b + dout))));

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 200);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0xcfcab8);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.4, 9, -6, 2, 3, Math.PI / 2.4, 0xfff4e2, 2.2);
  tira(1.6, 8, 6, 1, -1, -Math.PI / 2.2, 0xe6eeff, 1.5);
  tira(12, 1.6, 0, 7, 0, 0, 0xffffff, 1.4);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshBasicMaterial({ color: 0xf2efe2, side: THREE.DoubleSide }));
  top.position.y = 9; top.rotation.x = Math.PI / 2; env.add(top);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.04);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.55;

const key = new THREE.DirectionalLight(0xfff1de, 2.3);
key.position.set(-5, 10, 9); key.target.position.set(0.8, 0, 0.6);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
Object.assign(key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 40 });
key.shadow.bias = -0.0006; key.shadow.normalBias = 0.025;
scene.add(key, key.target);
const rim = new THREE.DirectionalLight(0xe2ecff, 1.1); rim.position.set(5, 4, -7); scene.add(rim);
const fill = new THREE.HemisphereLight(0xffffff, 0xcfc6ae, 0.85); scene.add(fill);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, cr: 0xefeee5, cr2: 0xdcdacb, cr3: 0xc9c7b8, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, gris: 0x9aa0a8, white: 0xffffff };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45), gd: mat(C.gd, 0.5), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.65), cr3: mat(C.cr3, 0.7),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.55), navy3: mat(C.navy3, 0.5), red: mat(C.red, 0.55), white: mat(C.white, 0.45),
  gris: mat(C.gris, 0.55), negro: mat(0x15171c, 0.6), alu: mat(0xd8d9dc, 0.3, { metalness: 0.55 }), goma: mat(0x1a1f2b, 0.8),
  carton: mat(0xc9a36b, 0.8), cinta: mat(0x16243d, 0.45), espuma: mat(0xb9bec8, 0.9),
  signo: mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.25 }), signoGris: mat(0x8f95a0, 0.5),
};
const rbox = (w, h, d, r = 0.04, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };
const _up = new THREE.Vector3(0, 1, 0);
function tubo(a, b, r, m, seg = 10) {
  const d = new THREE.Vector3().subVectors(b, a); const L = d.length();
  const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg), m);
  o.position.copy(a).addScaledVector(d, 0.5); o.quaternion.setFromUnitVectors(_up, d.normalize()); o.castShadow = true; return o;
}
const curva = (pts, r, m, seg = 24) => { const o = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), seg, r, 8), m); o.castShadow = true; return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }

const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 8, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
};

// "?" hecho a mano (la fuente 3D del repo solo trae dígitos): un tubo curvo con puntas redondas y un punto
const pregGeo = (() => {
  const pts = [[-0.25, 0.3], [-0.19, 0.5], [0, 0.59], [0.21, 0.5], [0.26, 0.3], [0.13, 0.13], [0.0, 0.03], [0, -0.13]].map(([x, y]) => new THREE.Vector3(x, y, 0));
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.085, 12, false);
})();
function pregunta(m, k) {
  const inner = grupo(mesh(pregGeo, m, 0, -0.06, 0), mesh(new THREE.SphereGeometry(0.085, 14, 10), m, -0.25, 0.24, 0), mesh(new THREE.SphereGeometry(0.085, 14, 10), m, 0, -0.19, 0), mesh(new THREE.SphereGeometry(0.105, 16, 12), m, 0, -0.44, 0));
  inner.scale.setScalar(k);
  return grupo(inner);
}

// ---------- lienzos ----------
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const rrS = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.stroke(); };
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
function lienzo(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const plano = (w, h, tex) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true }));
// pictograma de bici (líneas gruesas)
function biciIcono(x, cx, cy, s, color, grosor) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.strokeStyle = color; x.lineWidth = grosor / s; x.lineCap = "round"; x.lineJoin = "round";
  x.beginPath(); x.arc(-0.55, 0.2, 0.36, 0, Math.PI * 2); x.stroke();
  x.beginPath(); x.arc(0.55, 0.2, 0.36, 0, Math.PI * 2); x.stroke();
  x.beginPath(); x.moveTo(-0.55, 0.2); x.lineTo(-0.05, 0.2); x.lineTo(0.3, -0.25); x.lineTo(-0.3, -0.25); x.lineTo(-0.55, 0.2); x.moveTo(-0.05, 0.2); x.lineTo(-0.35, -0.42); x.moveTo(-0.47, -0.42); x.lineTo(-0.22, -0.42); x.moveTo(0.55, 0.2); x.lineTo(0.3, -0.25); x.lineTo(0.24, -0.45); x.lineTo(0.42, -0.45); x.stroke();
  x.restore();
}
// casco dibujado (para la foto del post y los íconos)
function cascoIcono(x, cx, cy, s, color = "#16243d", ranura = "#c6cad2") {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  x.fillStyle = color; x.beginPath(); x.ellipse(0, 0.1, 1, 0.78, 0, Math.PI, 0); x.lineTo(1.05, 0.18); x.lineTo(-1.15, 0.18); x.closePath(); x.fill();
  x.fillStyle = "#efeee5"; x.beginPath(); x.ellipse(0, 0.1, 0.12, 0.76, 0, Math.PI, 0); x.fill();
  x.fillStyle = ranura;
  for (const [ox, w] of [[-0.62, 0.11], [-0.36, 0.12], [0.36, 0.12], [0.62, 0.11]]) { x.beginPath(); x.ellipse(ox, -0.25, w, 0.32, 0, 0, Math.PI * 2); x.fill(); }
  x.fillStyle = "#1f3254"; x.fillRect(-1.25, 0.12, 0.7, 0.1);
  x.strokeStyle = "#15171c"; x.lineWidth = 0.07; x.beginPath(); x.moveTo(-0.6, 0.2); x.lineTo(-0.2, 0.62); x.lineTo(0.3, 0.2); x.stroke();
  x.restore();
}
const tickC = (x, cx, cy, r, fondo = "#5ce611", trazo = "#0b1220") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = trazo; x.lineWidth = r * 0.3; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.45, cy + r * 0.02); x.lineTo(cx - r * 0.1, cy + r * 0.38); x.lineTo(cx + r * 0.5, cy - r * 0.36); x.stroke(); };

// ================= EL CASCO DE BICI =================
// casco urbano: carcasa navy brillante (media elipsoide alargada atrás), franja crema al medio, 6 ranuras de
// ventilación (espuma gris clara que se ve por las ranuras), visera corta, correas negras con hebilla.
const KR = { x: 0.5, y: 0.45, z: 0.62 };
const supCasco = (q, a, k = 1.0) => { const f = Math.sqrt(1 - q * q); return V(q * KR.x * k, KR.y * f * Math.sin(a) * k, KR.z * f * Math.cos(a) * k); };
function crearCasco() {
  const g = new THREE.Group();
  const shellM = new THREE.MeshPhysicalMaterial({ color: C.navy2, roughness: 0.25, metalness: 0.05, clearcoat: 0.9, clearcoatRoughness: 0.18 });
  const shell = new THREE.Mesh(new THREE.SphereGeometry(1, 56, 24, 0, Math.PI * 2, 0, Math.PI * 0.5), shellM);
  shell.scale.set(KR.x, KR.y, KR.z); shell.castShadow = true; g.add(shell);
  const foam = new THREE.Mesh(new THREE.SphereGeometry(0.95, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), new THREE.MeshStandardMaterial({ color: 0x8d93a0, roughness: 0.95, side: THREE.BackSide }));
  foam.scale.set(KR.x, KR.y, KR.z); g.add(foam);
  const borde = new THREE.Mesh(new THREE.TorusGeometry(1, 0.05, 10, 72), M.navy); borde.rotation.x = Math.PI / 2; borde.scale.set(KR.x, KR.z, 0.8); borde.position.y = 0.01; g.add(borde);
  // franja crema al medio, de la visera a la nuca
  const fr = []; for (let i = 0; i <= 20; i++) fr.push(supCasco(0, 0.2 + (i / 20) * (Math.PI - 0.4), 0.975));
  g.add(curva(fr, 0.04, M.cr, 40));
  for (const p of [fr[0], fr[20]]) g.add(mesh(new THREE.SphereGeometry(0.04, 12, 8), M.cr, p.x, p.y, p.z));
  // ranuras (6): siguen la cúpula de adelante hacia atrás
  for (const [q, a0, a1] of [[0.3, 0.42, 2.5], [-0.3, 0.38, 2.55], [0.6, 0.55, 2.35], [-0.6, 0.55, 2.35], [0.84, 0.95, 2.0], [-0.84, 0.95, 2.0]]) {
    const pts = []; for (let i = 0; i <= 16; i++) pts.push(supCasco(q, a0 + (i / 16) * (a1 - a0), 0.965));
    const r = mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 32, 0.036, 8), M.espuma); g.add(r);
    for (const p of [pts[0], pts[16]]) g.add(mesh(new THREE.SphereGeometry(0.036, 10, 8), M.espuma, p.x, p.y, p.z));
  }
  // visera corta adelante
  // correas y hebilla (cuelgan debajo del borde)
  const correas = new THREE.Group(); g.add(correas);
  for (const sx of [-1, 1]) {
    correas.add(curva([V(sx * 0.46, 0.02, 0.16), V(sx * 0.4, -0.12, 0.26), V(sx * 0.12, -0.2, 0.36)], 0.016, M.negro, 12));
    correas.add(curva([V(sx * 0.42, 0.02, -0.3), V(sx * 0.4, -0.1, -0.05), V(sx * 0.14, -0.2, 0.34)], 0.016, M.negro, 12));
  }
  correas.add(mesh(rbox(0.13, 0.06, 0.04, 0.015), M.negro, 0, -0.21, 0.37));
  g.userData.correas = correas;
  return g;
}
// soporte de la vidriera: un tubito con una cabeza de exhibición (queda adentro del casco)
function crearSoporte() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.26, 12), M.navy3, 0, 0.13, 0));
  const cab = mesh(new THREE.SphereGeometry(1, 20, 12), M.cr3, 0, 0.3, 0); cab.scale.set(0.3, 0.22, 0.38); g.add(cab);
  return g;
}

// ================= LA BICI (urbana, cuadro bajo, canasto) =================
function crearBici(colorCuadro, conCanasto = true) {
  const b = new THREE.Group();
  const mC = mat(colorCuadro, 0.32, { metalness: 0.15 });
  const R = 0.34;
  const RW = V(-0.52, R), FW = V(0.55, R), BB = V(-0.02, 0.3), ST = V(-0.2, 0.86), HT = V(0.38, 0.95), HB = V(0.43, 0.72);
  b.add(curva([HB, V(0.26, 0.52), V(0.1, 0.36), BB], 0.034, mC, 24));
  b.add(curva([V(0.405, 0.84), V(0.22, 0.6), V(0.0, 0.53), V(-0.116, 0.6)], 0.026, mC, 24));
  b.add(tubo(BB, ST, 0.032, mC));
  b.add(tubo(HB, HT, 0.04, mC));
  for (const z of [-0.055, 0.055]) {
    b.add(tubo(V(BB.x, BB.y, z * 0.6), V(RW.x, RW.y, z), 0.02, mC));
    b.add(tubo(V(-0.18, 0.8, z * 0.4), V(RW.x, RW.y, z), 0.018, mC));
    b.add(curva([V(HB.x, HB.y, z * 0.5), V(0.5, 0.52, z), V(FW.x, FW.y, z)], 0.02, mC, 10));
  }
  const ruedas = [];
  for (const c of [RW, FW]) {
    const w = new THREE.Group(); w.position.copy(c); b.add(w);
    w.add(mesh(new THREE.TorusGeometry(R - 0.034, 0.034, 12, 48), M.goma));
    w.add(mesh(new THREE.TorusGeometry(R - 0.072, 0.013, 8, 48), M.alu));
    w.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.12, 14).rotateX(Math.PI / 2), M.alu));
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2, z = i % 2 ? 0.045 : -0.045;
      w.add(tubo(V(Math.cos(a) * 0.03, Math.sin(a) * 0.03, z), V(Math.cos(a + 0.2) * (R - 0.08), Math.sin(a + 0.2) * (R - 0.08), 0), 0.0075, M.alu, 5));
    }
    ruedas.push(w);
  }
  // guardabarros
  const gb = (c, a0, a1) => { const m = mesh(new THREE.TorusGeometry(R + 0.04, 0.022, 6, 32, a1 - a0), M.navy3); m.position.copy(c); m.rotation.z = a0; m.scale.z = 2.2; b.add(m); };
  gb(RW, Math.PI * 0.12, Math.PI * 0.95); gb(FW, Math.PI * 0.08, Math.PI * 0.8);
  // potencia y manubrio curvo con puños crema
  const ST2 = V(0.36, 1.08);
  b.add(tubo(HT, ST2, 0.026, M.navy3));
  b.add(curva([V(0.18, 1.06, -0.3), V(0.3, 1.09, -0.2), V(0.37, 1.09, 0), V(0.3, 1.09, 0.2), V(0.18, 1.06, 0.3)], 0.022, M.navy3, 24));
  for (const z of [-1, 1]) b.add(tubo(V(0.2, 1.06, z * 0.3), V(0.06, 1.045, z * 0.33), 0.036, M.cr));
  // asiento de cuero crema
  b.add(tubo(ST, V(-0.22, 0.95), 0.022, M.alu));
  const asiento = mesh(new THREE.SphereGeometry(1, 20, 12), M.cr, -0.24, 0.985, 0); asiento.scale.set(0.16, 0.05, 0.11); b.add(asiento);
  const punta = mesh(new THREE.SphereGeometry(1, 14, 10), M.cr, -0.1, 0.98, 0); punta.scale.set(0.09, 0.035, 0.05); b.add(punta);
  // plato, palancas, pedales y cadena
  const plato = mesh(new THREE.TorusGeometry(0.11, 0.016, 8, 28), M.negro, BB.x, BB.y, 0.07); b.add(plato);
  b.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.01, 20).rotateX(Math.PI / 2), M.alu, BB.x, BB.y, 0.068));
  const biela = new THREE.Group(); biela.position.set(BB.x, BB.y, 0); b.add(biela);
  for (const sgn of [-1, 1]) {
    biela.add(mesh(rbox(0.035, 0.17, 0.025, 0.01), M.alu, 0, sgn * 0.085, sgn * 0.09));
    biela.add(mesh(rbox(0.1, 0.025, 0.07, 0.01), M.negro, 0, sgn * 0.17, sgn * 0.13));
  }
  b.add(tubo(V(BB.x, BB.y + 0.11, 0.07), V(RW.x, RW.y + 0.045, 0.07), 0.009, M.negro));
  b.add(tubo(V(BB.x, BB.y - 0.11, 0.07), V(RW.x, RW.y - 0.045, 0.07), 0.009, M.negro));
  // pie de apoyo
  b.add(tubo(V(-0.12, 0.3, 0.06), V(-0.26, 0.01, 0.2), 0.014, M.navy3));
  if (conCanasto) {
    const k = new THREE.Group(); k.position.set(0.64, 0.98, 0); b.add(k);
    k.add(mesh(rbox(0.3, 0.02, 0.34, 0.008), M.navy3, 0, -0.1, 0));
    for (const [w, d, x, z] of [[0.3, 0.02, 0, 0.16], [0.3, 0.02, 0, -0.16], [0.02, 0.34, 0.14, 0], [0.02, 0.34, -0.14, 0]]) {
      for (const y of [-0.08, 0.0, 0.08]) k.add(mesh(rbox(w, 0.018, d, 0.006), M.navy3, x, y, z));
      for (let i = -2; i <= 2; i++) k.add(mesh(rbox(0.016, 0.18, 0.016, 0.005), M.navy3, x + (w > 0.1 ? i * 0.065 : 0), -0.01, z + (d > 0.1 ? i * 0.07 : 0)));
    }
    b.add(tubo(V(0.5, 0.95, 0), V(0.52, 0.9, 0), 0.015, M.navy3));
  }
  b.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
  return { g: b, ruedas, biela, R };
}

// ================= EL CELULAR =================
const CW = 0.78, CH = 1.55;
function crearCelular(tex) {
  const g = new THREE.Group();
  g.add(mesh(rbox(CW, CH, 0.07, 0.09, 4), M.navy));
  g.add(mesh(rbox(CW + 0.02, CH + 0.02, 0.05, 0.1, 4), M.navy3, 0, 0, -0.015));
  const pant = plano(CW - 0.06, CH - 0.08, tex); pant.position.z = 0.037; pant.material.transparent = false; g.add(pant);
  g.add(mesh(rbox(0.18, 0.035, 0.01, 0.015), M.navy, 0, CH / 2 - 0.07, 0.04));
  g.userData.pant = pant;
  return g;
}

// ================= EL MONITOR DEL MOSTRADOR =================
const MW = 1.5, MH = 0.98;
function crearMonitor() {
  const g = new THREE.Group();
  g.add(mesh(rbox(MW + 0.1, MH + 0.1, 0.07, 0.05), M.navy));
  g.add(mesh(rbox(MW * 0.6, MH * 0.6, 0.12, 0.08), M.navy3, 0, 0, -0.07));
  g.add(mesh(rbox(0.12, 0.36, 0.06, 0.02), M.navy3, 0, -MH / 2 - 0.2, -0.06));
  g.add(mesh(rbox(0.62, 0.04, 0.32, 0.015), M.navy3, 0, -MH / 2 - 0.38, -0.02));
  const off = mesh(new THREE.PlaneGeometry(MW, MH), mat(0x23324f, 0.18, { metalness: 0.1 }), 0, 0, 0.037); off.castShadow = false; g.add(off);
  g.userData.off = off;
  return g;
}

// ================= LAS DOS BICICLETERÍAS =================
// s = -1 izquierda, +1 derecha. u = distancia desde el borde de adentro (el pilar del medio) hacia afuera.
const X = (s, u) => s * (0.12 + u);
const locales = [];
function crearLocal(s) {
  const L = { s, g: new THREE.Group() }; scene.add(L.g);
  const add = (o) => { L.g.add(o); return o; };
  const caja = (w, h, d, m, u, y, z, r = 0.02) => add(mesh(rbox(w, h, d, r), m, X(s, u), y, z));
  const pared = M.navy2;
  caja(0.12, 4.6, 0.3, pared, 0.06, 2.3, 0);
  caja(0.18, 3.2, 0.3, pared, 2.31, 1.6, 0);
  caja(0.15, 4.6, 0.3, pared, 3.225, 2.3, 0);
  caja(2.1, 0.5, 0.3, pared, 1.17, 0.25, 0);
  caja(0.75, 0.5, 0.3, pared, 2.775, 2.95, 0);
  caja(3.3, 1.4, 0.3, pared, 1.65, 3.9, 0);
  caja(3.42, 0.16, 0.44, M.cr, 1.65, 4.68, 0.03);
  caja(3.32, 0.08, 0.06, M.g, 1.65, 4.55, 0.17).visible = false;
  // marco de la vidriera (gris en las dos hasta "Una"; la derecha pasa a crema con filete verde)
  L.marcoM = mat(C.gris, 0.5);
  for (const [w, h, u, y] of [[2.12, 0.08, 1.17, 3.16], [2.12, 0.1, 1.17, 0.55], [0.08, 2.7, 0.16, 1.85], [0.08, 2.7, 2.18, 1.85]]) caja(w, h, 0.12, L.marcoM, u, y, 0.17);
  L.filete = new THREE.Group(); add(L.filete);
  for (const [w, h, u, y] of [[1.96, 0.035, 1.17, 3.1], [1.96, 0.035, 1.17, 0.62], [0.035, 2.5, 0.22, 1.86], [0.035, 2.5, 2.12, 1.86]]) L.filete.add(mesh(rbox(w, h, 0.03, 0.012), M.g, X(s, u), y, 0.24));
  // puerta (bisagra del lado de afuera)
  L.puerta = new THREE.Group(); L.puerta.position.set(X(s, 3.15), 0, 0.12); add(L.puerta);
  const pd = (w, h, x, y, m) => L.puerta.add(mesh(rbox(w, h, 0.06, 0.015), m, -s * x, y, 0));
  pd(0.75, 0.09, 0.375, 2.655, L.marcoM); pd(0.75, 0.12, 0.375, 0.06, L.marcoM); pd(0.08, 2.7, 0.04, 1.35, L.marcoM); pd(0.08, 2.7, 0.71, 1.35, L.marcoM); pd(0.75, 0.06, 0.375, 1.05, L.marcoM);
  const vid = mesh(new THREE.PlaneGeometry(0.6, 2.4), new THREE.MeshStandardMaterial({ color: 0x2b3a55, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.55 }), -s * 0.375, 1.35, 0); vid.castShadow = false; L.puerta.add(vid);
  L.puerta.add(mesh(rbox(0.04, 0.3, 0.08, 0.015), M.alu, -s * 0.66, 1.2, 0.04));
  // adentro: el local (fondo con luz), piso, estante, la bici colgada, el mostrador con el monitor
  L.interior = new THREE.MeshStandardMaterial({ color: 0x8a8f9c, roughness: 0.85, emissive: 0xffd9a8, emissiveIntensity: 0.0 });
  const fondo = add(mesh(new THREE.PlaneGeometry(3.3, 3.2), L.interior, X(s, 1.65), 1.6, -3.0)); fondo.castShadow = false;
  for (const u of [0.12, 3.18]) { const p = add(mesh(new THREE.PlaneGeometry(3.0, 3.2), L.interior, X(s, u), 1.6, -1.5)); p.rotation.y = (u < 1 ? 1 : -1) * s * Math.PI / 2; p.castShadow = false; }
  const techo = add(mesh(new THREE.PlaneGeometry(3.3, 3.0), L.interior, X(s, 1.65), 3.2, -1.5)); techo.rotation.x = Math.PI / 2; techo.castShadow = false;
  const pisoIn = add(mesh(new THREE.PlaneGeometry(3.3, 3.0), mat(0xb9ab8c, 0.8), X(s, 1.65), 0.004, -1.5)); pisoIn.rotation.x = -Math.PI / 2; pisoIn.castShadow = false;
  // estante con cajitas y la bici colgada del fondo
  caja(1.4, 0.05, 0.3, M.cr, 2.3, 2.35, -2.85);
  [[1.85, M.g], [2.15, M.cr2], [2.45, M.navy3], [2.75, M.cr]].forEach(([u, m]) => caja(0.22, 0.24, 0.22, m, u, 2.5, -2.85));
  const bc = crearBici(s < 0 ? 0x6d7480 : C.navy3, false); bc.g.scale.setScalar(0.72); bc.g.position.set(X(s, 1.35), 1.55, -2.78); add(bc.g);
  add(mesh(rbox(0.05, 0.12, 0.08, 0.01), M.alu, X(s, 1.35) - 0.25, 2.33, -2.9)); add(mesh(rbox(0.05, 0.12, 0.08, 0.01), M.alu, X(s, 1.35) + 0.25, 2.33, -2.9));
  caja(1.05, 0.95, 0.5, M.navy3, 0.66, 0.475, -2.35);
  caja(1.12, 0.06, 0.56, M.cr, 0.66, 0.97, -2.35);
  L.mon = crearMonitor(); add(L.mon);
  L.monBase = V(X(s, 0.62), 1.0 + 0.42 * 0.92, -2.3); L.mon.position.copy(L.monBase); L.mon.scale.setScalar(0.42);
  // pedestal con el casco
  L.ped = V(X(s, 1.47), 0, -0.6);
  add(mesh(new THREE.CylinderGeometry(0.36, 0.38, 1.0, 40), M.cr, L.ped.x, 0.5, L.ped.z));
  add(mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.04, 40), M.navy3, L.ped.x, 1.0, L.ped.z));
  L.soporte = crearSoporte(); L.soporte.position.set(L.ped.x, 1.02, L.ped.z); add(L.soporte);
  L.casco = crearCasco(); scene.add(L.casco);
  L.cascoBase = V(L.ped.x, 1.3, L.ped.z);
  L.cascoRy = -s * 0.5;
  // luz de adentro
  L.luz = new THREE.PointLight(0xffd29a, 0, 9, 1.6); L.luz.position.set(X(s, 1.5), 2.7, -1.3); add(L.luz);
  // toldo a rayas (bisagra arriba de la vidriera)
  L.toldoM = mat(C.gris, 0.6);
  L.toldo = new THREE.Group(); L.toldo.position.set(X(s, 1.65), 3.28, 0.16); L.toldo.rotation.x = 0.42; add(L.toldo);
  for (let i = 0; i < 8; i++) L.toldo.add(mesh(rbox(0.4, 0.04, 1.0, 0.012), i % 2 ? M.cr : L.toldoM, (i - 3.5) * 0.4, 0, 0.5));
  const vol = new THREE.Group(); vol.position.set(0, 0, 1.0); vol.rotation.x = -0.42; L.toldo.add(vol);
  for (let i = 0; i < 8; i++) vol.add(mesh(rbox(0.4, 0.18, 0.03, 0.01), i % 2 ? M.cr : L.toldoM, (i - 3.5) * 0.4, -0.09, 0));
  // cartel con el pictograma de bici (sin nombre)
  caja(2.0, 0.62, 0.08, M.cr, 1.2, 3.95, 0.17, 0.04);
  L.cartel = add(plano(1.9, 0.54, null)); L.cartel.position.set(X(s, 1.2), 3.95, 0.215); L.cartel.material.transparent = false;
  L.cartelFilete = new THREE.Group(); add(L.cartelFilete);
  for (const [w, h, du, dy] of [[2.06, 0.05, 0, 0.32], [2.06, 0.05, 0, -0.32], [0.05, 0.68, -1.01, 0], [0.05, 0.68, 1.01, 0]]) L.cartelFilete.add(mesh(rbox(w, h, 0.05, 0.015), M.g, X(s, 1.2) + s * du, 3.95 + dy, 0.22));
  locales.push(L);
  return L;
}
const izq = crearLocal(-1), der = crearLocal(1);
// el pilar del medio (la línea de la pantalla partida)
scene.add(mesh(rbox(0.26, 5.0, 0.5, 0.04), M.navy, 0, 2.5, 0.12));
scene.add(mesh(rbox(0.34, 0.14, 0.58, 0.03), M.cr, 0, 5.03, 0.12));
// vecinos (paredes lisas a los costados) y el piso
for (const s of [-1, 1]) {
  scene.add(mesh(rbox(3.2, 4.1, 0.3, 0.03), M.cr2, s * 5.05, 2.05, -0.05));
  scene.add(mesh(rbox(1.1, 1.3, 0.1, 0.03), M.navy3, s * 4.6, 2.6, 0.1));
  scene.add(mesh(rbox(0.8, 2.3, 0.1, 0.03), M.cr3, s * 5.9, 1.15, 0.1));
}
const piso = mesh(new THREE.PlaneGeometry(40, 9), mat(0xdcd9c8, 0.92), 0, 0, 0.0); piso.rotation.x = -Math.PI / 2; piso.position.z = -0.4 + 4.5; piso.castShadow = false; scene.add(piso);
scene.add(mesh(rbox(40, 0.16, 0.25, 0.03), mat(0xc9c6b4, 0.85), 0, 0.02, 4.15));
const calle = mesh(new THREE.PlaneGeometry(40, 14), mat(0xb9b6a5, 0.95), 0, -0.1, 11.3); calle.rotation.x = -Math.PI / 2; calle.castShadow = false; scene.add(calle);
for (let i = -6; i <= 6; i++) { const l = mesh(new THREE.PlaneGeometry(1.4, 0.16), mat(0xefeee5, 0.8), i * 3, -0.09, 7.4); l.rotation.x = -Math.PI / 2; l.castShadow = false; scene.add(l); }

// ================= OBJETOS DE LA HISTORIA =================
// el celular de la izquierda (la foto en las redes) y su cascada
const texPost = { v: null };
const celIzq = crearCelular(null); scene.add(celIzq);
const cascada = [];
for (let i = 0; i < 7; i++) { const c = crearCelular(null); c.traverse((o) => { if (o.isMesh) o.castShadow = false; }); scene.add(c); cascada.push(c); }

// filas del CRM (hijas del monitor de la derecha)
const FILAS = [
  { n: "Paula", d: "Bici urbana · marzo", ok: true },
  { n: "Jorge", d: "Luz delantera · enero", f: 1 },
  { n: "Ana", d: "Bici de paseo · abril", ok: true },
  { n: "Lucía", d: "Bici + casco · agosto", f: 2 },
  { n: "Diego", d: "Bici de montaña · mayo", ok: true },
  { n: "Carla", d: "Inflador · junio", f: 1 },
];
const FY = [0.245, 0.115, -0.015, -0.145, -0.275, -0.405];
const filas = FILAS.map((f, i) => {
  const g = new THREE.Group(); der.mon.add(g);
  g.add(mesh(rbox(1.42, 0.118, 0.03, 0.02), M.white, 0, 0, 0));
  const p = plano(1.4, 0.112, null); p.position.z = 0.017; g.add(p);
  const barra = mesh(rbox(0.035, 0.1, 0.04, 0.01), M.g, -0.735, 0, 0.01); g.add(barra);
  g.position.set(0, FY[i], 0.05);
  return { ...f, g, p, barra, i };
});
const encabezado = plano(MW, 0.2, null); encabezado.position.set(0, 0.39, 0.04); der.mon.add(encabezado);
const pantallaOn = plano(MW, MH, null); pantallaOn.position.z = 0.038; der.mon.add(pantallaOn);
const chips = [0, 1].map((i) => { const g = new THREE.Group(); der.mon.add(g); g.add(mesh(rbox(0.53, 0.13, 0.05, 0.05), i ? M.red : M.navy, 0, 0, 0)); const p = plano(0.5, 0.11, null); p.position.z = 0.027; g.add(p); g.userData.p = p; return g; });
const CHIP_POS = [V(-0.085, 0.39, 0.07), V(0.465, 0.39, 0.07)];

// la ficha de Paula (sale de la lista y vuelve en el callback)
const FW_ = 1.5, FH_ = 0.95;
const ficha = new THREE.Group(); scene.add(ficha);
ficha.add(mesh(rbox(FW_, FH_, 0.12, 0.06), M.navy));
const fichaP = plano(FW_ - 0.06, FH_ - 0.06, null); fichaP.position.z = 0.062; fichaP.material.transparent = false; ficha.add(fichaP);
const fichaTex = {};

// la bici de Paula (cuadro verde)
const biciP = crearBici(C.g, true); scene.add(biciP.g);

// el globo del mensaje (vuela de la ficha al celular)
const globo = new THREE.Group(); scene.add(globo);
globo.add(mesh(rbox(0.66, 0.42, 0.05, 0.08), M.g));
const globoP = plano(0.62, 0.38, null); globoP.position.z = 0.027; globo.add(globoP);
const cola = mesh(new THREE.ConeGeometry(0.06, 0.14, 4), M.g, -0.27, -0.24, 0); cola.rotation.z = -0.6; globo.add(cola);

// el celular de Paula (grande: su pantalla en primer plano) y su celular chico en la mano
const lienzoCel = document.createElement("canvas"); lienzoCel.width = 600; lienzoCel.height = 1192;
const texCel = new THREE.CanvasTexture(lienzoCel); texCel.colorSpace = THREE.SRGBColorSpace; texCel.anisotropy = 8;
const celP = crearCelular(texCel); scene.add(celP);

// Paula y Nico (el empleado del elenco; acá atiende la bicicletería de la derecha), con pelo con volumen
// sin la franja verde del pecho en este reel: al empujar la bici verde se leía como un caño que la atravesaba
const paula = crearPersonaje({ ...ELENCO.paula, franja: null }); scene.add(paula.raiz);
const nico = crearPersonaje({ ...ELENCO.empleado, peinado: "texturado", texturaAlto: 1.1 }); scene.add(nico.raiz);
for (const p of [paula, nico]) p.raiz.traverse((o) => { if (o.isMesh) o.castShadow = true; });
const celChico = new THREE.Group(); paula.cuerpo.add(celChico);
celChico.add(mesh(rbox(0.09, 0.17, 0.014, 0.012), M.navy));
{ const s = mesh(new THREE.PlaneGeometry(0.078, 0.152), new THREE.MeshBasicMaterial({ color: 0x9fe86a, toneMapped: false }), 0, 0, -0.008); s.rotation.y = Math.PI; celChico.add(s); }
celChico.position.set(0, 0.36, 0.3); celChico.rotation.x = -0.6;

// "=" en el pilar del medio
const igualM = mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.2 });
const igual = grupo(mesh(rbox(0.62, 0.15, 0.18, 0.06), igualM, 0, 0.13, 0), mesh(rbox(0.62, 0.15, 0.18, 0.06), igualM, 0, -0.13, 0)); scene.add(igual);

// las fichas chicas de los clientes: los MISMOS 3 en cada local, con nombres de la lista del CRM, y lo que se llevó
// cada uno según el CRM (Paula: bici urbana; Jorge: luz delantera; Carla: inflador), apoyado en un estante arriba
const CLIENTES = ["Paula", "Jorge", "Carla"];
const CU = [0.5, 1.17, 1.84];
const TJ_W = 0.6, TJ_H = 0.78, TJ_Y = 1.72;
const tarjetas = [];
const TARJ_P = V(X(1, CU[0]), TJ_Y, 1.0); // la tarjeta chica de Paula (derecha)
for (const L of locales) CLIENTES.forEach((n, i) => {
  const g = new THREE.Group(); scene.add(g);
  g.add(mesh(rbox(TJ_W, TJ_H, 0.05, 0.04), M.navy));
  const p = plano(TJ_W - 0.04, TJ_H - 0.04, null); p.position.z = 0.027; p.material.transparent = false; g.add(p);
  if (L.s > 0) g.add(mesh(rbox(TJ_W - 0.04, 0.035, 0.26, 0.012), M.cr, 0, TJ_H / 2 + 0.017, 0.06)); // estante
  g.position.set(X(L.s, CU[i]), TJ_Y, 1.0);
  tarjetas.push({ L, i, n, g, p });
});
const ESTANTE_Y = TJ_Y + TJ_H / 2 + 0.035;
const preguntaGris = mat(0x8f95a0, 0.5);
const preguntas = CLIENTES.map((_, i) => { const m = pregunta(preguntaGris, 0.3); scene.add(m); m.userData.pos = V(X(-1, CU[i]), ESTANTE_Y + 0.22, 1.0); return m; });
// mini objetos (lo que se llevó cada uno): bici verde, luz delantera, inflador
const miniBici = crearBici(C.g, true); miniBici.g.scale.setScalar(0.26); scene.add(miniBici.g);
const luzMini = (() => { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.22, 24).rotateX(Math.PI / 2), M.navy3)); const l = mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.02, 24).rotateX(Math.PI / 2), mat(0xfff6d0, 0.3, { emissive: 0xfff2b8, emissiveIntensity: 0.9 }), 0, 0, 0.115); g.add(l); g.add(mesh(rbox(0.05, 0.14, 0.06, 0.01), M.g, 0, -0.14, -0.02)); g.add(mesh(rbox(0.16, 0.03, 0.12, 0.01), M.g, 0, -0.215, -0.02)); return grupo(g); })();
const infladorMini = (() => { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.34, 20), M.g, 0, 0.17, 0)); g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 8), M.alu, 0, 0.39, 0)); g.add(mesh(rbox(0.22, 0.035, 0.04, 0.015), M.navy, 0, 0.45, 0)); g.add(mesh(rbox(0.24, 0.025, 0.1, 0.01), M.navy, 0, 0.0, 0)); g.add(curva([V(0.04, 0.3, 0), V(0.14, 0.24, 0.05), V(0.12, 0.08, 0.06)], 0.012, M.negro, 10)); return grupo(g); })();
const items = [miniBici.g, luzMini, infladorMini];
const ITEM_K = [0.26, 0.95, 0.8];
// cuánto baja cada objeto por debajo de su origen (para apoyarlo justo en el estante)
const itemBase = items.map((it) => { it.updateMatrixWorld(true); const s0 = it.scale.x; it.scale.setScalar(1); it.updateMatrixWorld(true); const b = new THREE.Box3().setFromObject(it); it.scale.setScalar(s0); return -b.min.y; });
scene.add(luzMini, infladorMini);

// s12: la ficha de Paula se multiplica en las fichas de TUS clientes (cada uno con lo que se llevó y lo que le sirve)
const OTROS = [
  { n: "Inés", c: "Bici de ruta", f: "Luz", a: "luz" },
  { n: "Pablo", c: "Bici eléctrica", f: "Candado", a: "candado" },
  { n: "Sara", c: "Bici de paseo", f: "Inflador", a: "inflador" },
];
const GRID = V(1.45, 1.95, 2.4), GK = 0.6;
const SLOT = [V(-0.49, 0.37, 0), V(0.49, 0.37, 0), V(-0.49, -0.37, 0), V(0.49, -0.37, 0)];
const otras = OTROS.map((o) => {
  const g = new THREE.Group(); scene.add(g);
  g.add(mesh(rbox(FW_, FH_, 0.12, 0.06), M.navy));
  const p = plano(FW_ - 0.06, FH_ - 0.06, null); p.position.z = 0.062; p.material.transparent = false; g.add(p);
  return { ...o, g, p, tex: [] };
});
// ================= TEXTURAS =================
function dibujarPost(x, X0, Y0, W0, k = 1, gris = 0) {
  // un post genérico: cabecera con avatar y renglones grises (sin nombre ni logo de ninguna red), la foto del casco
  // y el texto "LLEGARON CASCOS"; gris > 0 lo apaga (lo que se pasó de largo)
  const H0 = 640 * k;
  x.save(); x.globalAlpha = 1;
  x.fillStyle = "#ffffff"; rr(x, X0, Y0, W0, H0, 28 * k);
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(X0 + 60 * k, Y0 + 58 * k, 34 * k, 0, Math.PI * 2); x.fill();
  biciIcono(x, X0 + 60 * k, Y0 + 56 * k, 24 * k, "#efeee5", 6 * k);
  x.fillStyle = "#c9c7b8"; rr(x, X0 + 112 * k, Y0 + 36 * k, 200 * k, 20 * k, 10 * k); rr(x, X0 + 112 * k, Y0 + 66 * k, 130 * k, 16 * k, 8 * k);
  x.fillStyle = "#dcdacb"; x.fillRect(X0, Y0 + 110 * k, W0, 340 * k);
  cascoIcono(x, X0 + W0 / 2, Y0 + 300 * k, 130 * k);
  x.fillStyle = "#0b1220"; x.font = F(900, 52 * k); x.textAlign = "center"; x.fillText("LLEGARON CASCOS", X0 + W0 / 2, Y0 + 535 * k); x.textAlign = "left";
  x.strokeStyle = "#9aa0a8"; x.lineWidth = 7 * k;
  for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(X0 + (50 + i * 70) * k, Y0 + 595 * k, 20 * k, 0, Math.PI * 2); x.stroke(); }
  if (gris > 0) { x.globalAlpha = gris * 0.55; x.fillStyle = "#b8b6aa"; rr(x, X0, Y0, W0, H0, 28 * k); x.globalAlpha = gris * 0.22; x.fillStyle = "#c7655b"; rr(x, X0, Y0, W0, H0, 28 * k); }
  x.restore();
  return H0;
}
function dibujarMensaje(x, X0, Y0, W0, resalta = 0, grande = 1) {
  // el mensaje de la bicicletería de la derecha, con su nombre
  const f = 60 * grande, lh = 74 * grande, H0 = 360 * grande;
  x.fillStyle = "#5ce611"; rr(x, X0, Y0, W0, H0, 34 * grande);
  x.beginPath(); x.moveTo(X0 + 30 * grande, Y0 + H0 - 10); x.lineTo(X0 - 14 * grande, Y0 + H0 + 26 * grande); x.lineTo(X0 + 80 * grande, Y0 + H0 - 10); x.fill();
  x.font = F(800, f);
  const nombreW = x.measureText("Paula,").width;
  if (resalta > 0) { x.globalAlpha = resalta; x.fillStyle = "#0b1220"; rr(x, X0 + 22 * grande, Y0 + 26 * grande, nombreW + 30 * grande, lh + 6 * grande, 14 * grande); x.globalAlpha = 1; }
  x.fillStyle = resalta > 0.5 ? "#5ce611" : "#0b1220"; x.fillText("Paula,", X0 + 36 * grande, Y0 + 26 * grande + f);
  x.fillStyle = "#0b1220"; x.font = F(600, f);
  x.fillText("llegaron cascos", X0 + 36 * grande, Y0 + 26 * grande + f + lh);
  x.fillText("para tu bici", X0 + 36 * grande, Y0 + 26 * grande + f + 2 * lh);
  x.fillText("de marzo.", X0 + 36 * grande, Y0 + 26 * grande + f + 3 * lh);
  cascoIcono(x, X0 + W0 - 92 * grande, Y0 + 268 * grande, 46 * grande, "#0b1220", "#5ce611");
  return H0;
}
let celClave = "";
// pantalla del celular de Paula (lienzo 600x1192). "chat": el chat con la bicicletería (arriba la compra de marzo,
// abajo "Hoy" y el mensaje nuevo, que llega cuando aterriza el globo; abajo la barra para escribir: nunca queda
// vacía). "feed": arriba la foto para todos (se apaga en gris cuando "la pasó de largo") y abajo su mensaje.
const MSJ_Y = 742, MSJ_G = 0.9; // dónde cae el mensaje nuevo en el chat (para que el globo aterrice ahí)
function pintarCel(modo, gris, resalta, llego) {
  const clave = `${modo}|${Math.round(gris * 20)}|${Math.round(resalta * 10)}|${llego ? 1 : 0}`;
  if (clave === celClave) return;
  celClave = clave;
  const x = lienzoCel.getContext("2d"), Wc = 600, Hc = 1192;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, Wc, Hc);
  const pastilla = (txt, y) => { x.font = F(700, 38); const w = x.measureText(txt).width + 56; x.fillStyle = "#dcdacb"; rr(x, (Wc - w) / 2, y, w, 58, 29); x.fillStyle = "#16243d"; x.textAlign = "center"; x.fillText(txt, Wc / 2, y + 43); x.textAlign = "left"; };
  if (modo === "chat") {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, Wc, 150);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(80, 82, 44, 0, Math.PI * 2); x.fill(); biciIcono(x, 80, 82, 30, "#0b1220", 8);
    x.fillStyle = "#efeee5"; x.font = F(800, 46); x.fillText("Bicicletería", 146, 100);
    pastilla("Marzo", 172);
    // la compra de marzo: foto de su bici verde + "¡Que la disfrutes!"
    x.fillStyle = "#ffffff"; rr(x, 30, 252, 430, 318, 30);
    x.fillStyle = "#dcdacb"; rr(x, 46, 268, 398, 196, 20);
    biciIcono(x, 245, 372, 92, "#3fa60a", 16);
    x.fillStyle = "#0b1220"; x.font = F(700, 40); x.fillText("¡Que la disfrutes!", 50, 530);
    // su respuesta
    x.fillStyle = "#cfe9bd"; rr(x, 330, 590, 240, 76, 30); x.fillStyle = "#0b1220"; x.font = F(700, 40); x.fillText("¡Gracias!", 352, 642);
    pastilla("Hoy", 676);
    if (llego) dibujarMensaje(x, 46, MSJ_Y, 508, resalta, MSJ_G);
    // barra para escribir
    x.fillStyle = "#ffffff"; rr(x, 24, 1100, 470, 76, 38); x.fillStyle = "#9aa0a8"; x.font = F(600, 38); x.fillText("Mensaje", 60, 1150);
    x.fillStyle = "#16243d"; x.beginPath(); x.arc(540, 1138, 38, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(524, 1120); x.lineTo(560, 1138); x.lineTo(524, 1156); x.closePath(); x.fill();
  } else {
    // el feed: arriba la foto para todos (que se apaga), abajo su mensaje con su nombre
    x.fillStyle = "#16243d"; x.fillRect(0, 0, Wc, 64);
    dibujarPost(x, 30, 84, 540, 0.95, gris);
    dibujarMensaje(x, 46, 726, 508, resalta, MSJ_G);
    x.fillStyle = "#ffffff"; rr(x, 30, 1098, 540, 200, 28); x.fillStyle = "#c9c7b8"; x.beginPath(); x.arc(90, 1146, 28, 0, Math.PI * 2); x.fill(); rr(x, 136, 1134, 200, 22, 11);
  }
  texCel.needsUpdate = true;
}
function texturas() {
  texPost.v = lienzo(600, 1192, (x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 600, 1192);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, 600, 70);
    dibujarPost(x, 30, 100, 540, 1, 0);
    x.fillStyle = "#ffffff"; rr(x, 30, 770, 540, 420, 28); x.fillStyle = "#dcdacb"; x.fillRect(30, 880, 540, 310);
    x.fillStyle = "#c9c7b8"; rr(x, 140, 806, 200, 20, 10); x.beginPath(); x.arc(90, 828, 34, 0, Math.PI * 2); x.fill();
  });
  celIzq.userData.pant.material.map = texPost.v;
  for (const c of cascada) c.userData.pant.material.map = texPost.v;
  // cartel de las fachadas: pictograma de bici
  const cartel = (verde) => lienzo(760, 216, (x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 760, 216);
    biciIcono(x, 150, 100, 70, verde ? "#3fa60a" : "#16243d", 14);
    x.fillStyle = "#16243d"; x.font = F(900, 92); x.fillText("BICIS", 290, 142);
  });
  izq.cartel.material.map = cartel(false); der.cartel.material.map = cartel(false); der.cartelVerde = cartel(true);
  // CRM: encabezado, pantalla, filas, chips
  encabezado.material.map = lienzo(1500, 200, (x) => {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, 1500, 200);
    x.fillStyle = "#efeee5"; x.font = F(800, 74); x.fillText("Clientes", 34, 126);
    x.strokeStyle = "#3d5079"; x.lineWidth = 6; x.setLineDash([16, 12]); rrS(x, 390, 40, 530, 120, 60); rrS(x, 940, 40, 530, 120, 60);
  });
  pantallaOn.material.map = lienzo(750, 490, (x) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, 750, 490); });
  const filaTex = (f, k) => lienzo(1400, 112, (x) => {
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, 1400, 112);
    x.fillStyle = f.ok && k ? "#5ce611" : "#16243d"; x.beginPath(); x.arc(70, 56, 40, 0, Math.PI * 2); x.fill();
    x.fillStyle = f.ok && k ? "#0b1220" : "#efeee5"; x.font = F(800, 46); x.textAlign = "center"; x.fillText(f.n[0], 70, 72); x.textAlign = "left";
    x.fillStyle = "#0b1220"; x.font = F(800, 74); x.fillText(f.n, 132, 82);
    x.fillStyle = "#3d4558"; x.font = F(600, 62); x.fillText(f.d, 440, 80);
  });
  for (const f of filas) { f.tex0 = filaTex(f, 0); f.tex1 = filaTex(f, 1); f.p.material.map = f.tex0; }
  const chipTex = (txt, rojo) => lienzo(500, 110, (x) => {
    x.fillStyle = rojo ? "#ffffff" : "#5ce611"; rr(x, 0, 0, 500, 110, 55);
    x.fillStyle = rojo ? "#a8463d" : "#0b1220"; x.font = F(800, 56); x.textAlign = "center"; x.fillText(txt, 250, 74);
  });
  chips[0].userData.p.material.map = chipTex("Compró: bici", false);
  chips[1].userData.p.material.map = chipTex("Casco: no", true);
  // la ficha de Paula: tres estados
  const fichaDib = (estado) => lienzo(1440, 890, (x) => {
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, 1440, 890);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(140, 150, 92, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 110); x.textAlign = "center"; x.fillText("P", 140, 190); x.textAlign = "left";
    x.fillStyle = "#0b1220"; x.font = F(900, 150); x.fillText("Paula", 270, 205);
    x.fillStyle = "#dcdacb"; x.fillRect(60, 300, 1320, 6);
    x.fillStyle = "#4b5468"; x.font = F(600, 84); x.fillText("Compró:", 60, 430);
    const wc = x.measureText("Compró: ").width;
    x.fillStyle = "#0b1220"; x.font = F(800, 84); x.fillText("bici urbana · marzo", 60 + wc + 8, 430);
    x.fillStyle = "#4b5468"; x.font = F(600, 84); x.fillText("Casco:", 60, 700);
    if (estado === 2) {
      x.fillStyle = "#5ce611"; rr(x, 390, 580, 420, 170, 85); x.fillStyle = "#0b1220"; x.font = F(900, 110); x.fillText("sí", 450, 705); tickC(x, 710, 665, 58, "#0b1220", "#5ce611");
    } else {
      x.fillStyle = "#f5dcd8"; rr(x, 390, 580, 300, 170, 85); x.strokeStyle = "#c7655b"; x.lineWidth = 10; rrS(x, 390, 580, 300, 170, 85);
      x.fillStyle = "#a8463d"; x.font = F(900, 110); x.fillText("no", 470, 705);
      if (estado === 1) { x.strokeStyle = "#a8463d"; x.lineWidth = 16; x.lineCap = "round"; x.beginPath(); x.moveTo(420, 672); x.lineTo(662, 656); x.stroke(); }
    }
  });
  fichaTex[0] = fichaDib(0); fichaTex[1] = fichaDib(1); fichaTex[2] = fichaDib(2);
  fichaP.material.map = fichaTex[0];
  globoP.material.map = lienzo(620, 380, (x) => {
    x.fillStyle = "#5ce611"; x.fillRect(0, 0, 620, 380);
    x.fillStyle = "#0b1220"; x.font = F(800, 62); x.fillText("Paula,", 32, 88);
    x.font = F(600, 54); x.fillText("llegaron cascos", 32, 164); x.fillText("para tu bici", 32, 234); x.fillText("de marzo.", 32, 304);
    cascoIcono(x, 530, 300, 40, "#0b1220", "#5ce611");
  });
  for (const tj of tarjetas) tj.p.material.map = lienzo(920, 1216, (x) => {
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, 920, 1216);
    x.fillStyle = tj.L.s > 0 ? "#5ce611" : "#9aa0a8"; x.beginPath(); x.arc(460, 390, 230, 0, Math.PI * 2); x.fill();
    x.fillStyle = tj.L.s > 0 ? "#0b1220" : "#efeee5"; x.font = F(900, 240); x.textAlign = "center"; x.fillText(tj.n[0], 460, 475);
    x.fillStyle = "#0b1220"; x.font = F(900, 190); x.fillText(tj.n, 460, 900);
    x.fillStyle = "#c9c7b8"; rr(x, 230, 990, 460, 40, 20); rr(x, 300, 1070, 320, 36, 18);
  });
  // fichas compactas para la grilla de s12 (letra grande: se leen a 0,6 de escala)
  const compacta = (n, compro, chip, verde, tick) => lienzo(1440, 890, (x) => {
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, 1440, 890);
    x.fillStyle = verde || n === "Paula" ? "#5ce611" : "#16243d"; x.beginPath(); x.arc(130, 140, 96, 0, Math.PI * 2); x.fill();
    x.fillStyle = verde || n === "Paula" ? "#0b1220" : "#efeee5"; x.font = F(900, 120); x.textAlign = "center"; x.fillText(n[0], 130, 182); x.textAlign = "left";
    x.fillStyle = "#0b1220"; x.font = F(900, 200); x.fillText(n, 270, 212);
    x.fillStyle = "#3d4558"; x.font = F(700, 140); x.fillText(compro, 50, 452);
    x.font = F(900, 124); const wt = Math.min(1360, x.measureText(chip).width + (tick ? 170 : 0) + 110);
    if (verde) { x.fillStyle = "#5ce611"; rr(x, 40, 560, wt, 230, 115); }
    else { x.fillStyle = "#f5dcd8"; rr(x, 40, 560, wt, 230, 115); x.strokeStyle = "#c7655b"; x.lineWidth = 12; rrS(x, 40, 560, wt, 230, 115); }
    x.fillStyle = verde ? "#0b1220" : "#a8463d"; x.fillText(chip, 95, 718);
    if (tick) tickC(x, 40 + wt - 125, 675, 72, "#0b1220", "#5ce611");
  });
  fichaTex[3] = compacta("Paula", "Bici urbana", "Casco: sí", true, true);
  for (const o of otras) { o.tex[0] = compacta(o.n, o.c, `${o.f}: no`, false, false); o.tex[1] = compacta(o.n, o.c, `Avisarle: ${o.a}`, true, false); o.p.material.map = o.tex[0]; }
  [izq.cartel, der.cartel, encabezado, pantallaOn, fichaP, globoP, ...filas.map((f) => f.p), ...chips.map((c) => c.userData.p), ...tarjetas.map((tj) => tj.p), ...otras.map((o) => o.p)].forEach((p) => (p.material.needsUpdate = true));
  pintarCel("chat", 0, 0, false);
}

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ]; cúbica monótona continua (Fritsch-Carlson).
const MON1 = V(1.45, 1.95, 1.1); // el monitor afuera, delante de la vidriera de la derecha
const FICHA1 = V(1.45, 2.1, 2.3);
// Paula NO está en la bicicletería cuando le llega el mensaje: está en la vereda de al lado, contra la pared lisa del
// vecino (x 3,45-6,65), con su bici estacionada. En "Esa tarde, vuelve" camina con la bici hasta la puerta verde.
const PAULA0 = V(4.35, 0, 3.25);         // Paula adelante (lado cámara); la bici detrás, entre ella y la pared
const BICI0 = V(4.55, 0, 2.55);           // la bici estacionada (mira a -x)
const PAULA_LLEGA = 1.8;                  // x donde frena, al lado de la puerta verde (2,52-3,27)
const CEL_A = V(4.35, 1.75, 4.05);        // su pantalla en primer plano (tapa a Paula, que está detrás)
const CEL_B = V(5.6, 1.85, 3.8);          // la pantalla al lado de Paula, a su derecha
const FICHA2 = V(1.45, 2.0, 2.4);
const CIELO = V(1.6, 8.0, 1.5);
const CAM = [
  [0, 0, 4, 18.2, 0, 3.12, 0],
  [S["s01b-una"], 0, 4, 16.6, 0, 3.06, 0],
  [S["s02-izquierda"] - 0.1, 1, 4, 14.9, -0.2, 2.82, 0],
  [S["s02-izquierda"] + 0.75, -8, 5, 7.2, -1.5, 1.55, 0],
  [W[14] + 0.35, -4, 3, 5.0, -1.45, 1.82, 1.3],
  [W[18] + 0.15, -2, 5, 7.6, -1.45, 2.3, 1.0],
  [S["s03-derecha"] - 0.05, -1, 6, 8.8, -1.2, 2.25, 0.6],
  [S["s03-derecha"] + 0.6, 3, 5, 9.2, 0.6, 1.95, 0.5],
  [W[24] + 0.25, 4, 4, 7.7, MON1.x, MON1.y, MON1.z],
  [S["s04-filtro"] - 0.05, 2, 3, 7.0, MON1.x, MON1.y, MON1.z],
  [S["s04-filtro"] + 0.55, 0, 2, 6.1, MON1.x, MON1.y + 0.02, MON1.z],
  [S["s05-escribe"] - 0.05, 0, 2, 5.9, MON1.x, MON1.y, MON1.z + 0.1],
  [S["s05-escribe"] + 0.6, -3, 4, 6.7, 1.45, 1.45, 2.3],
  [S["s06-mensaje"] - 0.05, -2, 4, 6.8, 1.6, 1.5, 2.4],
  [S["s06-mensaje"] + 0.35, 3, 3, 5.8, 2.9, 1.6, 3.1],
  [W[37] + 0.1, 0, 0, 3.6, CEL_A.x, CEL_A.y + 0.16, CEL_A.z],
  [S["s07-vio"] - 0.05, 0, 0, 3.5, CEL_A.x, CEL_A.y + 0.14, CEL_A.z],
  [S["s07-vio"] + 0.6, -3, 6, 9.2, 4.9, 1.55, 3.05],
  [S["s08-su-nombre"] - 0.05, -2, 6, 9.1, 4.9, 1.55, 3.05],
  [W[56], -1, 7, 8.9, 4.9, 1.55, 3.05],
  [W[57] + 0.25, 0, 12, 8.8, 4.3, 1.4, 3.0],
  [S["s09-mismos"] - 0.1, -2, 16, 9.0, 2.35, 1.3, 2.9],
  [S["s09-mismos"] + 0.8, 0, 6, 20.8, 0.65, 2.3, 0.8],
  [W[64] + 0.1, 0, 6, 20.6, 0.65, 2.3, 0.8],
  [W[67], 6, 6, 8.6, 1.25, 1.95, 1.0],
  [S["s11-scalerics"] - 0.05, 7, 6, 8.2, 1.3, 1.95, 1.0],
  [S["s11-scalerics"] + 0.6, 0, 4, 6.4, FICHA2.x, FICHA2.y, FICHA2.z],
  [S["s12-tu-local"] - 0.05, -2, 4, 6.2, FICHA2.x, FICHA2.y, FICHA2.z],
  [S["s12-tu-local"] + 0.5, 0, 3, 7.3, GRID.x, GRID.y, GRID.z],
  [W[83] - 0.05, 2, 3, 7.4, GRID.x, GRID.y, GRID.z],
  [S["s13-llamada"] - 0.02, 3, 0, 6.6, CIELO.x, CIELO.y - 0.45, CIELO.z],
  [DUR, 2, 0, 6.3, CIELO.x, CIELO.y - 0.45, CIELO.z],
];
const _mira = new THREE.Vector3();
const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6]];
function ponerCamara(t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = val(a), p2 = val(b), h = b[0] - a[0];
  const prev = i > 0 ? CAM[i - 1] : null, next = i + 2 < CAM.length ? CAM[i + 2] : null;
  const p0 = prev ? val(prev) : null, p3 = next ? val(next) : null;
  const tang = (q0, t0, q1, t1, q2, t2, j) => {
    const d1 = (q1[j] - q0[j]) / (t1 - t0), d2 = (q2[j] - q1[j]) / (t2 - t1);
    if (d1 * d2 <= 0) return 0;
    const h1 = t1 - t0, h2 = t2 - t1;
    return (3 * (h1 + h2)) / ((2 * h2 + h1) / d1 + (h2 + 2 * h1) / d2);
  };
  const s2 = u * u, s3 = s2 * u;
  const v = p1.map((_, j) => {
    const m1 = p0 ? tang(p0, prev[0], p1, a[0], p2, b[0], j) : 0;
    const m2 = p3 ? tang(p1, a[0], p2, b[0], p3, next[0], j) : 0;
    return (2 * s3 - 3 * s2 + 1) * p1[j] + (s3 - 2 * s2 + u) * h * m1 + (-2 * s3 + 3 * s2) * p2[j] + (s3 - s2) * h * m2;
  });
  const [az, el, ld, tx, ty, tz] = v;
  const d = Math.exp(ld);
  _mira.set(tx, ty, tz);
  camera.position.set(_mira.x + d * Math.cos(el * D2R) * Math.sin(az * D2R), _mira.y + d * Math.sin(el * D2R), _mira.z + d * Math.cos(el * D2R) * Math.cos(az * D2R));
  const k = Math.min(1, 12 / d) * 0.5;
  camera.position.x += Math.sin(t * 0.7) * 0.03 * k; camera.position.y += Math.sin(t * 0.53) * 0.02 * k;
  camera.near = Math.max(0.05, d * 0.01); camera.far = 200;
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  return { d, az, el };
}

// ================= ESCENA EN EL TIEMPO =================
const cG = new THREE.Color(C.g), cGris = new THREE.Color(C.gris), cCr = new THREE.Color(C.cr), cIntGris = new THREE.Color(0x8a8f9c), cIntCal = new THREE.Color(0xe9dcc4);
const _v = new THREE.Vector3();
function renderAt(t) {
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);

  // ---- las dos fachadas: en "Una" la derecha se prende ----
  const prende = eio(sg(t, W[5] - 0.05, W[5] + 0.45));
  for (const L of locales) {
    const k = L.s > 0 ? prende : 0;
    L.toldoM.color.copy(cGris).lerp(cG, k);
    L.marcoM.color.copy(cGris).lerp(cCr, k);
    L.interior.color.copy(cIntGris).lerp(cIntCal, k); L.interior.emissiveIntensity = lerp(0.04, 0.32, k);
    L.luz.intensity = lerp(1.2, 9, k);
    L.filete.visible = k > 0.02; L.filete.scale.set(1, 1, 1); L.filete.children.forEach((m) => (m.scale.set(1, 1, 1)));
    L.cartelFilete.visible = k > 0.5;
    if (L.s > 0 && der.cartelVerde) { const m = k > 0.5 ? der.cartelVerde : izq.cartel.material.map; if (L.cartel.material.map !== m) { L.cartel.material.map = m; L.cartel.material.needsUpdate = true; } }
    // la puerta de la derecha se abre en "vuelve"
    const abre = L.s > 0 ? eio(sg(t, W[59] + 0.25, W[59] + 0.75)) : 0;
    L.puerta.rotation.y = -L.s * 1.3 * abre;
  }

  // ---- los cascos de las vidrieras ----
  for (const L of locales) {
    const c = L.casco;
    let pos = L.cascoBase.clone(), ry = L.cascoRy, s = 1.1, rx = 0;
    // "cascos": saltan, crecen y dan una vuelta sincronizada (se ve aunque el casco sea simétrico)
    const vuelta = eio(sg(t, W[4] - 0.05, W[4] + 0.65));
    s *= 1 + 0.24 * pulso(t, W[4] - 0.08, 0.42);
    pos.y += 0.22 * pulso(t, W[4] - 0.08, 0.5);
    ry += vuelta * Math.PI * 2; rx += 0.25 * pulso(t, W[4] - 0.02, 0.45);
    // "Mismos cascos": se elevan y giran en espejo; bajan antes de que entren las tarjetas
    const sube = eio(sg(t, W[61] - 0.08, W[61] + 0.45)) * (1 - eio(sg(t, W[63] - 0.2, W[63] + 0.25)));
    pos.y += 0.32 * sube + Math.sin(t * 1.6 + L.s) * 0.025 * sube;
    ry += L.s * sube * Math.PI * 2;
    s *= 1 + 0.12 * pulso(t, W[61] - 0.1, 0.38);
    let vis = 1;
    if (L.s > 0) {
      // callback: vuela de la vidriera a la ficha de Paula y viaja con ella
      const vuela = eio(sg(t, W[73] - 0.4, W[73] + 0.2));
      const fp = fichaPose(t);
      const encima = (k) => fichaTop(t).add(V(0.36 * k, 0.035 * k, -0.12 * k));
      if (vuela > 0) {
        const dest = encima(fp.k);
        pos = lerpV(pos, dest, vuela); pos.y += Math.sin(Math.PI * vuela) * 0.75;
        s = lerp(s, 0.46 * fp.k, vuela); ry = lerp(ry % (Math.PI * 2), Math.PI - 0.35, vuela); rx = Math.sin(Math.PI * vuela) * 0.4;
      }
      if (t >= W[73] + 0.2) { pos = encima(fp.k); s = 0.46 * fp.k * (1 + 0.1 * pulso(t, W[73] + 0.18, 0.25)); ry = Math.PI - 0.35; rx = 0; }
      // "Agendá": se despega de la ficha y sube al cielo con la cámara (queda solo, para la tarjeta de cierre)
      const t0 = W[83] - 0.12;
      if (t >= t0) {
        const e = eio(sg(t, t0, S["s13-llamada"] + 0.15));
        const arriba = _mira.clone().add(V(0.02, 0.45, 0));
        const p0 = pos.clone();
        pos = lerpV(p0, arriba, e); pos.z += Math.sin(Math.PI * e) * 0.6;
        s = lerp(s, 1.05, eo(e)) * (1 + 0.04 * Math.sin(t * 2.2) * e);
        ry = lerp(Math.PI - 0.35, t * 0.9 + 0.6, e); rx = lerp(0, 0.18 + Math.sin(t * 1.3) * 0.05, e);
      }
    }
    c.visible = vis > 0 && s > 0.01; c.position.copy(pos); c.scale.setScalar(s); c.rotation.set(rx, ry, 0);
    // el soporte de exhibición se hunde en el pedestal cuando el casco se va (nunca queda la "cabeza" pelada)
    const hunde = L.s > 0 ? eio(sg(t, W[73] - 0.4, W[73] + 0.05)) : 0;
    L.soporte.position.y = 1.02 - 0.75 * hunde; L.soporte.scale.setScalar(1 - 0.5 * hunde); L.soporte.visible = hunde < 0.98;
  }

  // ---- el celular de la izquierda: la foto en las redes y su cascada (se van ANTES del travelling) ----
  {
    const fin = S["s03-derecha"] - 0.3;
    const s = vida(t, W[14] - 0.15, fin, 0.45, 0.3);
    const sube = eo(sg(t, W[14] - 0.15, W[14] + 0.35));
    const baja = eio(sg(t, fin, fin + 0.3));
    ocultar(celIzq, s);
    celIzq.position.set(-1.45, lerp(-0.8, 1.85, sube) - 1.2 * baja, 1.35); celIzq.rotation.set(-0.06, 0.12, lerp(0.15, 0, sube));
    celIzq.scale.multiplyScalar(1 + 0.04 * pulso(t, W[14] - 0.02, 0.2));
    cascada.forEach((c, i) => {
      const t0 = W[18] - 0.05 + i * 0.07;
      const u = eo(sg(t, t0, t0 + 0.55));
      const sc = (t < t0 ? 0 : 1) * lerp(0.9, 0.4, u) * (1 - eio(sg(t, fin - 0.1, fin + 0.2)));
      ocultar(c, sc);
      // abanico alrededor del celular: el mismo post, para todos igual
      const ang = Math.PI * (0.12 + 0.76 * (i / 6)), rad = (1.0 + 0.12 * (i % 3)) * u;
      c.position.set(-1.45 + Math.cos(ang) * rad * 1.05, 1.85 + Math.sin(ang) * rad * 0.8, 1.45 + u * 0.3);
      c.rotation.set(-0.05, 0.1 * Math.cos(ang), (Math.cos(ang)) * -0.15 * u);
    });
  }

  // ---- el monitor de la derecha: sale de la vidriera, filtra, y vuelve ----
  {
    const L = der;
    const sale = eio(sg(t, S["s03-derecha"] + 0.45, S["s03-derecha"] + 1.15));
    const vuelve = eio(sg(t, S["s05-escribe"] + 0.25, S["s05-escribe"] + 0.95));
    const u = sale * (1 - vuelve);
    const pos = lerpV(L.monBase, MON1, u); pos.y += Math.sin(Math.PI * u) * 0.45;
    L.mon.position.copy(pos); L.mon.scale.setScalar(lerp(0.42, 1, u));
    L.mon.rotation.set(0, Math.sin(Math.PI * u) * 0.25 * (vuelve > 0 ? -1 : 1), 0);
    const on = t > S["s03-derecha"] + 0.45 && t < S["s05-escribe"] + 0.95;
    L.mon.userData.off.visible = !on;
    pantallaOn.visible = encabezado.visible = on;
    const f1 = eio(sg(t, W[28] + 0.05, W[28] + 0.35)), f2 = eio(sg(t, W[30] + 0.05, W[30] + 0.35)), junta = eio(sg(t, W[30] + 0.35, W[30] + 0.75));
    const okOrden = [0, 2, 4], noOrden = [1, 5, 3];
    filas.forEach((f) => {
      f.g.visible = on;
      const apaga = f.f === 1 ? f1 : f.f === 2 ? f2 : 0;
      const slot = f.ok ? okOrden.indexOf(f.i) : 3 + noOrden.indexOf(f.i);
      const y = FY[f.i];
      // la de Paula se va con la ficha en "Le escribe"
      const sePaula = f.i === 0 ? eio(sg(t, S["s05-escribe"] - 0.02, S["s05-escribe"] + 0.22)) : 0;
      f.g.position.set(0, y, 0.05 + (f.ok ? 0.05 * junta : 0));
      f.g.scale.setScalar((f.ok ? 1 + 0.03 * junta : 1 - 0.05 * apaga) * (1 - sePaula));
      f.g.visible = on && sePaula < 1;
      f.p.material.color.setScalar(lerp(1, 0.62, apaga)); f.p.material.opacity = lerp(1, 0.5, apaga);
      f.g.children[0].material = apaga > 0.5 ? M.cr3 : M.white;
      const m = f.ok && junta > 0.3 ? f.tex1 : f.tex0; if (f.p.material.map !== m) { f.p.material.map = m; f.p.material.needsUpdate = true; }
      f.barra.visible = f.ok && junta > 0.05; f.barra.scale.set(1, Math.max(0.01, junta), 1);
    });
    chips.forEach((c, i) => {
      const t0 = i ? W[29] - 0.08 : W[27] - 0.08;
      const cae = sg(t, t0, t0 + 0.3);
      c.visible = on && t >= t0;
      c.position.copy(CHIP_POS[i]); c.position.y += (1 - cae * cae) * 0.3 + Math.sin(Math.PI * sg(t, t0 + 0.3, t0 + 0.45)) * 0.03;
      c.position.z += (1 - cae) * 0.6;
      c.rotation.set(0, 0, (1 - cae) * (i ? -0.25 : 0.25));
      c.scale.setScalar(1 + 0.08 * pulso(t, t0 + 0.28, 0.2));
    });
  }

  // ---- la ficha de Paula ----
  {
    let vis = false;
    // s05: sale de la fila (escala pareja, sin aplastar el texto), crece y viene hacia la cámara
    if (t >= S["s05-escribe"] - 0.02 && t < S["s07-vio"]) {
      const u = eio(sg(t, S["s05-escribe"] - 0.02, S["s05-escribe"] + 0.5));
      der.mon.updateMatrixWorld(true);
      const fila = filas[0].g.getWorldPosition(new THREE.Vector3());
      const ret = eio(sg(t, W[37] + 0.1, W[37] + 0.6));
      const pos = lerpV(fila, FICHA1, u); pos.z += Math.sin(Math.PI * u) * 0.4;
      ficha.position.copy(lerpV(pos, V(0.9, 1.4, -1.6), ret));
      const k = (1 - ret) * lerp(0.3, 1, u);
      ficha.scale.setScalar(Math.max(0.001, k));
      ficha.rotation.set(0, Math.sin(Math.PI * u) * -0.3, 0);
      ficha.scale.multiplyScalar(1 + 0.04 * pulso(t, W[36] - 0.05, 0.25));
      vis = k > 0.02;
      if (fichaP.material.map !== fichaTex[0]) { fichaP.material.map = fichaTex[0]; fichaP.material.needsUpdate = true; }
    }
    // s11: vuelve desde la tarjeta chica de Paula y se tilda; s12: se achica a la grilla de tus clientes
    if (t >= S["s11-scalerics"] - 0.02 && t < S["s13-llamada"] + 0.3) {
      const fp = fichaPose(t);
      ficha.position.copy(fp.pos);
      ficha.scale.set(fp.sx, fp.sy, fp.k);
      ficha.rotation.set(0, fp.ry, 0);
      vis = true;
      const est = fp.g > 0.5 ? 3 : t >= W[73] + 0.02 ? 2 : t >= W[72] + 0.3 ? 1 : 0;
      if (fichaP.material.map !== fichaTex[est]) { fichaP.material.map = fichaTex[est]; fichaP.material.needsUpdate = true; }
    }
    ficha.visible = vis;
  }

  // ---- el globo del mensaje: de la ficha al celular, y aterriza ADENTRO de la pantalla, donde aparece el mensaje ----
  {
    const t0 = W[36] - 0.1, t1 = W[37] + 0.04;
    const u = eio(sg(t, t0, t1));
    const vis = t >= t0 && t < t1;
    globo.visible = vis;
    if (vis) {
      celP.updateMatrixWorld(true);
      const a = FICHA1.clone().add(V(0.5, 0.25, 0.15));
      const b = celP.localToWorld(V(0, 0.735 - ((MSJ_Y + 162) / 1192) * 1.47, 0.07));
      const p = lerpV(a, b, u); p.y += Math.sin(Math.PI * u) * 0.12; p.z += Math.sin(Math.PI * u) * 0.3;
      globo.position.copy(p); globo.scale.setScalar(bk(sg(t, t0, t0 + 0.25)) * lerp(1, 0.92, u)); globo.rotation.set(0, lerp(-0.2, -0.12, u), Math.sin(Math.PI * u) * 0.12);
    }
  }

  // ---- la bici de Paula ----
  {
    let x = 0, z = 2.6, ry = Math.PI, vis = false, giro = 0;
    const BICI_SALE = S["s06-mensaje"] + 0.22;
    if (t >= W[33] - 0.35 && t < BICI_SALE) {
      const u = eo(sg(t, W[33] - 0.35, W[35] + 0.2));
      const sal = Math.pow(sg(t, S["s06-mensaje"], BICI_SALE), 2);
      x = lerp(3.8, 1.45, u) - sal * 2.6; vis = true; ry = Math.PI; z = 2.6;
      giro = (3.8 - x) / biciP.R;
    } else if (t >= BICI_SALE) {
      // estacionada al lado de Paula; en "Esa tarde" la empuja hasta la bicicletería verde
      const xP = paulaX(t);
      x = Math.min(BICI0.x, xP + 0.2); z = BICI0.z; ry = Math.PI; vis = true;
      giro = (BICI0.x - x) / biciP.R;
    }
    biciP.g.visible = vis;
    biciP.g.position.set(x, 0, z); biciP.g.rotation.set(0, ry, 0);
    biciP.ruedas.forEach((w) => (w.rotation.z = giro));
    biciP.biela.rotation.z = giro * 0.45;
  }

  // ---- Paula ----
  {
    const vis = t >= S["s06-mensaje"] + 0.22 && t < S["s13-llamada"];
    paula.raiz.visible = vis;
    if (vis) {
      const CEL = { manoI: [0.075, 0.33, 0.3], manoD: [-0.075, 0.33, 0.3], codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] };
      const camina = W[57] + 0.2;
      const claves = [
        [0, { x: PAULA0.x, z: PAULA0.z, giro: 0.22, ...CEL, cabeza: { asiente: 0.32, giro: 0.12 }, ojos: { y: -0.75, x: 0.15 }, boca: { sonrisa: 0.1 } }],
        [W[46] + 0.15, { cejas: { alto: 0.35, ang: 0.15 }, cabeza: { asiente: 0.3, giro: 0.16 } }, 0.25],
        [W[49] + 0.1, { cejas: { alto: -0.1, ang: 0 }, boca: { sonrisa: -0.15 }, cabeza: { giro: 0.05, asiente: 0.34 } }, 0.25],
        [W[51] + 0.1, { cabeza: { giro: 0.14 } }, 0.25],
        [W[55] + 0.1, { cabeza: { asiente: 0.08, giro: 0.2, ladea: 0.1 }, ojos: { y: -0.15, x: 0.3, feliz: 0.2 }, cejas: { alto: 0.75, ang: 0.3 }, boca: { sonrisa: 1, abierta: 0.32, ancho: 1.15 } }, 0.25],
        [W[56] + 0.1, { boca: { sonrisa: 0.9, abierta: 0.08 }, cabeza: { ladea: -0.06, asiente: 0.12 } }, 0.25],
        // guarda el celular y gira hacia la izquierda (hacia la bicicletería), mano derecha (la del lado de la bici) al manubrio
        [camina, { giro: -Math.PI / 2, cabeza: { asiente: 0.0, giro: -0.35, ladea: 0 }, ojos: { y: 0, x: -0.2, feliz: 0.1 }, manoI: [0.29, -0.06, 0.06], codoI: null, boca: { sonrisa: 0.7, abierta: 0 } }, 0.5],
        [S["s09-mismos"] + 0.05, { x: PAULA_LLEGA, paso: 0, cabeza: { giro: -0.5, asiente: 0.04 }, ojos: { x: -0.3 }, boca: { sonrisa: 1, abierta: 0.2 }, cejas: { alto: 0.4 } }, 0.3],
        // deja la bici, la rodea por atrás (la puerta queda detrás de la rueda trasera) y entra al local
        [S["s09-mismos"] + 0.5, { giro: -4.46, cabeza: { giro: 0 }, paso: 1, manoD: [-0.29, -0.06, 0.06], codoD: null }, 0.4],
        [S["s09-mismos"] + 1.2, { x: 3.1, z: 2.95, paso: 1 }, 0.7, (u) => u],
        [S["s09-mismos"] + 1.45, { giro: -2.94 }, 0.3],
        [S["s09-mismos"] + 2.2, { x: 3.0, z: 1.2, paso: 1 }, 1.0, (u) => u],
        [S["s09-mismos"] + 2.6, { x: 2.85, z: 0.1, giro: -3.0 }, 0.4, (u) => u],
        [S["s09-mismos"] + 3.15, { x: 2.35, z: -1.15, giro: -2.76 }, 0.55, (u) => u],
        [S["s09-mismos"] + 3.4, { paso: 0, giro: -2.32 }, 0.25],
      ];
      const p = poseEn(t, claves);
      p.x = t < S["s09-mismos"] + 0.1 ? paulaX(t) : p.x;
      if (t > camina - 0.5 && t < S["s09-mismos"] + 0.05) p.paso = sg(t, camina - 0.1, camina + 0.15) * (1 - sg(t, S["s09-mismos"] - 0.15, S["s09-mismos"] + 0.05));
      paula.poner(p);
      // empuja la bici: la mano derecha (la del lado de la bici) va al puño del manubrio
      const agarra = eio(sg(t, camina - 0.2, camina + 0.15)) * (1 - eio(sg(t, S["s09-mismos"] + 0.15, S["s09-mismos"] + 0.45)));
      if (agarra > 0) {
        paula.raiz.updateMatrixWorld(true); biciP.g.updateMatrixWorld(true);
        const puno = biciP.g.localToWorld(V(0.13, 1.05, -0.31));
        const loc = paula.cuerpo.worldToLocal(puno);
        const base = p.manoD;
        p.manoD = [lerp(base[0], loc.x, agarra), lerp(base[1], loc.y, agarra), lerp(base[2], loc.z, agarra)];
        p.codoD = [-0.8, -0.6, -0.2];
        paula.poner(p);
      }
      const guarda = eio(sg(t, W[57] - 0.15, W[57] + 0.3));
      celChico.visible = guarda < 0.98; celChico.scale.setScalar(1 - guarda);
    }
  }

  // ---- el celular grande de Paula (su pantalla) ----
  {
    const entra = eo(sg(t, S["s06-mensaje"] + 0.05, S["s06-mensaje"] + 0.5));
    const guarda = eio(sg(t, W[57] - 0.15, W[57] + 0.3));
    const vis = t >= S["s06-mensaje"] && guarda < 0.99;
    celP.visible = vis;
    if (vis) {
      paula.raiz.updateMatrixWorld(true);
      const mano = celChico.getWorldPosition(new THREE.Vector3());
      // s07: se corre de adelante de Paula (la destapa) a su derecha
      const corre = eio(sg(t, S["s07-vio"], S["s07-vio"] + 0.6));
      const base = V(lerp(CEL_A.x, CEL_B.x, corre), lerp(lerp(-0.9, CEL_A.y, entra), CEL_B.y, corre), lerp(CEL_A.z, CEL_B.z, eio(sg(t, S["s07-vio"] + 0.25, S["s07-vio"] + 0.6))));
      const pos = lerpV(base, mano, guarda); pos.y += Math.sin(Math.PI * guarda) * 0.3;
      const vib = en(t, W[37] + 0.05, W[37] + 0.4) ? Math.sin(t * 70) * 0.012 : 0;
      celP.position.set(pos.x + vib, pos.y, pos.z);
      celP.rotation.set(0, lerp(lerp(0, -0.14, corre), -0.6, guarda), lerp(0.12, 0, entra) + vib * 2);
      celP.scale.setScalar(lerp(lerp(1, 1.14, corre), 0.06, guarda) * (1 + 0.04 * pulso(t, W[46] - 0.1, 0.25)));
    }
    const llego = t >= W[37] + 0.04;
    const modo = t >= W[46] - 0.02 ? "feed" : "chat";
    const gris = eio(sg(t, W[49] - 0.05, W[49] + 0.3));
    const resalta = eio(sg(t, W[55] - 0.05, W[55] + 0.25));
    pintarCel(modo, gris, resalta, llego);
  }

  // ---- Nico en la puerta ----
  {
    const vis = t >= S["s08-su-nombre"] && t < S["s13-llamada"];
    nico.raiz.visible = vis;
    if (vis) {
      const claves = [
        [0, { x: 2.85, z: -0.75, giro: -0.1, cabeza: { giro: 0.25 }, boca: { sonrisa: 0.9, abierta: 0.25 }, cejas: { alto: 0.45 }, ojos: { x: 0.2 } }],
        [S["s09-mismos"] + 2.55, { x: 1.7, z: -1.75, giro: 0.82, cabeza: { giro: 0.2 }, boca: { sonrisa: 0.8, abierta: 0.1 }, paso: 1 }, 0.7, (u) => u],
        [S["s09-mismos"] + 2.8, { paso: 0 }, 0.25],
      ];
      const p = poseEn(t, claves);
      // saluda y baja el brazo de a poco (sin saltos)
      const ks = 1 - eio(sg(t, S["s09-mismos"] + 1.4, S["s09-mismos"] + 1.8));
      if (ks > 0) { const sal = saludo(t, "D", 1); p.manoD = p.manoD.map((v, i) => lerp(v, sal.manoD[i], ks)); if (ks > 0.4) p.codoD = sal.codoD; p.dedoD = 0; }
      nico.poner(p);
    }
  }

  // ---- "=" en el pilar ----
  {
    const s = vida(t, W[62] - 0.08, W[64] + 0.25, 0.4, 0.25);
    ocultar(igual, s * 1.0); igual.position.set(0, 1.75 + Math.sin(t * 2) * 0.03, 0.75); igual.rotation.set(0, Math.sin(t * 1.4) * 0.25, 0);
  }

  // ---- las tarjetas de los clientes, los "?" grises y lo que se llevó cada uno (apoyado en su estante) ----
  {
    const fin = S["s11-scalerics"] + 0.15;
    tarjetas.forEach((tj) => {
      const t0 = W[63] - 0.1 + tj.i * 0.06;
      let s = vida(t, t0, fin, 0.4, 0.3);
      if (tj.L.s > 0 && tj.i === 0) s *= t < S["s11-scalerics"] - 0.02 ? 1 : 0;
      ocultar(tj.g, s); tj.g.position.set(X(tj.L.s, CU[tj.i]), TJ_Y, 1.0); tj.g.rotation.set(0, -tj.L.s * 0.04, 0);
    });
    preguntas.forEach((q, i) => {
      const s = vida(t, W[64] - 0.1 + i * 0.05, fin, 0.35, 0.3);
      ocultar(q, s * 1.0); q.position.copy(q.userData.pos); q.position.y += Math.sin(t * 2 + i) * 0.03; q.rotation.y = Math.sin(t * 1.2 + i) * 0.4;
    });
    items.forEach((it, i) => {
      const t0 = W[66 + i] - 0.08;
      let s = vida(t, t0, fin, 0.4, 0.3) * ITEM_K[i];
      let pos = V(X(1, CU[i]), ESTANTE_Y + itemBase[i] * s + 0.08 * (1 - bk(sg(t, t0, t0 + 0.4))), 1.06);
      let ry = i === 0 ? -0.3 + Math.sin(t * 1.3) * 0.25 : 0.5 + Math.sin(t * 1.1 + i) * 0.5;
      if (i === 0) {
        // la bici chica de Paula se va con la ficha
        s = t < t0 ? 0 : bk(sg(t, t0, t0 + 0.4)) * ITEM_K[0];
        const fp = fichaPose(t);
        const u = eio(sg(t, S["s11-scalerics"] - 0.02, S["s11-scalerics"] + 0.6));
        const sobre = () => fichaTop(t).add(V(-0.38 * fp.k, 0, 0));
        if (u > 0) { pos = lerpV(pos, sobre(), u); ry = lerp(ry, -0.35, u); }
        if (t >= S["s11-scalerics"] + 0.6) { pos = sobre(); ry = -0.35; }
        const k = t >= S["s11-scalerics"] - 0.02 ? lerp(1, fp.k, 1) : 1;
        // en "Agendá" se cae de la ficha junto con la grilla (sale de cuadro con la cámara que sube)
        s *= k * (1 - eio(sg(t, S["s13-llamada"] + 0.1, S["s13-llamada"] + 0.3)));
      }
      it.scale.setScalar(Math.max(0.001, s)); it.visible = s > 0.002;
      it.position.copy(pos); it.rotation.set(0, ry, 0);
    });
  }

  // ---- s12: la ficha de Paula se multiplica en las fichas de tus clientes ----
  otras.forEach((o, i) => {
    const t0 = W[78] - 0.08 + i * 0.1;
    const u = eio(sg(t, t0, t0 + 0.45));
    const vis = t >= t0 && t < S["s13-llamada"] + 0.3;
    o.g.visible = vis;
    if (!vis) return;
    const desde = GRID.clone().add(SLOT[0]).add(V(0, 0, -0.08));
    const hasta = GRID.clone().add(SLOT[i + 1]);
    // salen de DETRÁS de la ficha de Paula (nunca le pasan por encima) y recién al llegar vienen al frente
    const p = lerpV(desde, hasta, u); p.z = GRID.z - 0.22 * (1 - eio(sg(u, 0.55, 1)));
    o.g.position.copy(p);
    const avisa = t >= W[82] + i * 0.1;
    o.g.scale.setScalar(GK * lerp(0.85, 1, u) * (1 + 0.07 * pulso(t, W[82] + i * 0.1 - 0.02, 0.26)));
    o.g.rotation.set(0, Math.sin(Math.PI * u) * 0.25, 0);
    const m = avisa ? o.tex[1] : o.tex[0]; if (o.p.material.map !== m) { o.p.material.map = m; o.p.material.needsUpdate = true; }
  });

  renderer.render(scene, camera);
}
// dónde está la ficha de Paula en s11-s12 (y cuánto mide): crece desde su tarjeta chica, y en s12 se achica a la
// primera casilla de la grilla de tus clientes
function fichaPose(t) {
  const u = eio(sg(t, S["s11-scalerics"] - 0.02, S["s11-scalerics"] + 0.6));
  const g = eio(sg(t, S["s12-tu-local"] - 0.02, S["s12-tu-local"] + 0.42));
  const pos = lerpV(TARJ_P, FICHA2, u); pos.y += Math.sin(Math.PI * u) * 0.35;
  const p = lerpV(pos, GRID.clone().add(SLOT[0]), g);
  const sx0 = lerp(TJ_W / FW_, 1, u), sy0 = sx0; // escala pareja: el texto de la ficha nunca se aplasta
  const k = lerp(1, GK, g);
  const pul = 1 + 0.05 * pulso(t, W[73] + 0.05, 0.25);
  return { pos: p, sx: lerp(sx0, GK, g) * pul, sy: lerp(sy0, GK, g) * pul, k: lerp(u < 1 ? 1 : 1, GK, g) * pul, kf: k, ry: Math.sin(Math.PI * u) * 0.35 * (1 - g), g };
}
// el borde de arriba de la ficha (donde se apoyan el casco y la bici chica)
function fichaTop(t) {
  const fp = fichaPose(t);
  return fp.pos.clone().add(V(0, (FH_ / 2) * fp.sy, 0));
}
// x de Paula: quieta contra la pared del vecino; en "Esa tarde" camina con la bici hasta la puerta verde
function paulaX(t) {
  return lerp(PAULA0.x, PAULA_LLEGA, eio(sg(t, W[57] + 0.2, S["s09-mismos"] + 0.02)));
}
function en(t, a, b) { return t >= a && t < b; }

texturas();
window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
