// Capa 3D de dos-bicicleterias (Three.js r170 local). Base técnica: reels/por-que-la-lista y reels/abren-hoy.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Serie "Dos negocios": una calle low-poly con DOS bicicleterías iguales lado a lado, separadas por un pilar navy
// en x = 0 (la pantalla partida). Izquierda: toldo gris, luz baja. Derecha: en "Una" se prende (toldo verde, luz
// cálida). El mismo casco de bici en cada vidriera. Paula (personaje del módulo) y su bici verde; Dani en la puerta.
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
  const fr = []; for (let i = 0; i <= 20; i++) fr.push(supCasco(0, 0.12 + (i / 20) * (Math.PI - 0.24), 0.985));
  g.add(curva(fr, 0.042, M.cr, 40));
  // ranuras (6): siguen la cúpula de adelante hacia atrás
  for (const [q, a0, a1] of [[0.3, 0.38, 2.55], [-0.3, 0.38, 2.55], [0.6, 0.55, 2.35], [-0.6, 0.55, 2.35], [0.84, 0.95, 2.0], [-0.84, 0.95, 2.0]]) {
    const pts = []; for (let i = 0; i <= 16; i++) pts.push(supCasco(q, a0 + (i / 16) * (a1 - a0), 0.975));
    const r = mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 32, 0.04, 8), M.espuma); r.scale.set(1, 1, 1); g.add(r);
  }
  // visera corta adelante
  const vis = mesh(rbox(0.52, 0.03, 0.13, 0.012), M.navy3, 0, 0.07, KR.z * 0.96); vis.rotation.x = 0.28; g.add(vis);
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
  caja(2.3, 0.62, 0.08, M.cr, 1.2, 3.95, 0.17, 0.04);
  L.cartel = add(plano(2.2, 0.54, null)); L.cartel.position.set(X(s, 1.2), 3.95, 0.215); L.cartel.material.transparent = false;
  L.cartelFilete = new THREE.Group(); add(L.cartelFilete);
  for (const [w, h, du, dy] of [[2.36, 0.05, 0, 0.32], [2.36, 0.05, 0, -0.32], [0.05, 0.68, -1.16, 0], [0.05, 0.68, 1.16, 0]]) L.cartelFilete.add(mesh(rbox(w, h, 0.05, 0.015), M.g, X(s, 1.2) + s * du, 3.95 + dy, 0.22));
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

// el celular de Paula (grande, la "ampliación"), su celular chico en la mano y los puntitos que los unen
const lienzoCel = document.createElement("canvas"); lienzoCel.width = 600; lienzoCel.height = 1192;
const texCel = new THREE.CanvasTexture(lienzoCel); texCel.colorSpace = THREE.SRGBColorSpace; texCel.anisotropy = 8;
const celP = crearCelular(texCel); scene.add(celP);
const puntos = [0, 1, 2].map(() => { const m = mesh(new THREE.SphereGeometry(0.032, 14, 10), M.g); m.castShadow = false; scene.add(m); return m; });

// Paula y Dani
const paula = crearPersonaje(ELENCO.paula); scene.add(paula.raiz);
const dani = crearPersonaje(ELENCO.bicicletero); scene.add(dani.raiz);
for (const p of [paula, dani]) p.raiz.traverse((o) => { if (o.isMesh) o.castShadow = true; });
const celChico = new THREE.Group(); paula.cuerpo.add(celChico);
celChico.add(mesh(rbox(0.09, 0.17, 0.014, 0.012), M.navy));
{ const s = mesh(new THREE.PlaneGeometry(0.078, 0.152), new THREE.MeshBasicMaterial({ color: 0x9fe86a, toneMapped: false }), 0, 0, -0.008); s.rotation.y = Math.PI; celChico.add(s); }
celChico.position.set(0, 0.36, 0.3); celChico.rotation.x = -0.6;

// "=" en el pilar del medio
const igualM = mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.2 });
const igual = grupo(mesh(rbox(0.62, 0.15, 0.18, 0.06), igualM, 0, 0.13, 0), mesh(rbox(0.62, 0.15, 0.18, 0.06), igualM, 0, -0.13, 0)); scene.add(igual);

// las fichas chicas de los clientes (4 por local, los mismos clientes) y lo que se llevó cada uno
const CLIENTES = ["Paula", "Jorge", "Carla", "Martín"];
const CU = [0.39, 0.93, 1.47, 2.01];
const tarjetas = [];
const TARJ_P = V(X(1, 0.39), 1.25, 1.0); // la tarjeta chica de Paula (derecha)
for (const L of locales) CLIENTES.forEach((n, i) => {
  const g = new THREE.Group(); scene.add(g);
  g.add(mesh(rbox(0.5, 0.66, 0.05, 0.04), M.navy));
  const p = plano(0.46, 0.62, null); p.position.z = 0.027; p.material.transparent = false; g.add(p);
  g.position.set(X(L.s, CU[i]), 1.25, 1.0);
  tarjetas.push({ L, i, n, g, p });
});
const preguntaGris = mat(0x8f95a0, 0.5);
const preguntas = CLIENTES.map((_, i) => { const m = pregunta(preguntaGris, 0.32); scene.add(m); m.userData.pos = V(X(-1, CU[i]), 1.9, 1.0); return m; });
// mini objetos (lo que se llevó cada uno): bici verde, luz, inflador, candado
const miniBici = crearBici(C.g, true); miniBici.g.scale.setScalar(0.24); scene.add(miniBici.g);
const luzMini = (() => { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.22, 24).rotateX(Math.PI / 2), M.navy3)); const l = mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.02, 24).rotateX(Math.PI / 2), mat(0xfff6d0, 0.3, { emissive: 0xfff2b8, emissiveIntensity: 0.9 }), 0, 0, 0.115); g.add(l); g.add(mesh(rbox(0.05, 0.14, 0.06, 0.01), M.g, 0, -0.14, -0.02)); g.add(mesh(rbox(0.16, 0.03, 0.03, 0.01), M.g, 0, 0.115, 0.02)); return g; })();
const infladorMini = (() => { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.34, 20), M.g, 0, 0.17, 0)); g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 8), M.alu, 0, 0.39, 0)); g.add(mesh(rbox(0.22, 0.035, 0.04, 0.015), M.navy, 0, 0.45, 0)); g.add(mesh(rbox(0.24, 0.025, 0.1, 0.01), M.navy, 0, 0.0, 0)); g.add(curva([V(0.04, 0.3, 0), V(0.14, 0.24, 0.05), V(0.12, 0.08, 0.06)], 0.012, M.negro, 10)); g.position.y = -0.2; return grupo(g); })();
const candadoMini = (() => { const g = new THREE.Group(); const arco = mesh(new THREE.TorusGeometry(0.11, 0.024, 10, 28, Math.PI), M.navy3, 0, 0.0, 0); g.add(arco); g.add(mesh(rbox(0.32, 0.08, 0.08, 0.03), M.g, 0, -0.01, 0)); g.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.01, 12).rotateX(Math.PI / 2), M.navy, 0.1, -0.01, 0.042)); return g; })();
const items = [miniBici.g, luzMini, infladorMini, candadoMini];
scene.add(luzMini, infladorMini, candadoMini);

// la caja de mercadería nueva (s12) con el "?" y los tres mensajes
const caja = new THREE.Group(); scene.add(caja);
caja.add(mesh(rbox(0.72, 0.5, 0.56, 0.03), M.carton, 0, 0.25, 0));
caja.add(mesh(rbox(0.74, 0.08, 0.03, 0.01), M.cinta, 0, 0.36, 0.28));
caja.add(mesh(rbox(0.25, 0.16, 0.01, 0.01), M.white, 0.2, 0.2, 0.282));
const solapas = [-1, 1].map((sx) => { const piv = new THREE.Group(); piv.position.set(sx * 0.36, 0.5, 0); caja.add(piv); const sol = mesh(rbox(0.36, 0.02, 0.56, 0.01), M.carton, -sx * 0.18, 0.01, 0); piv.add(sol); return piv; });
const preguntaVerde = pregunta(mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.22 }), 0.62); scene.add(preguntaVerde);
const msjs = ["Inés, ya llegó", "Pablo, ya llegó", "Sara, ya llegó"].map((txt) => { const g = new THREE.Group(); scene.add(g); g.add(mesh(rbox(0.92, 0.25, 0.05, 0.07), M.g)); const p = plano(0.88, 0.22, null); p.position.z = 0.027; g.add(p); const c2 = mesh(new THREE.ConeGeometry(0.045, 0.1, 4), M.g, -0.4, -0.13, 0); c2.rotation.z = -0.6; g.add(c2); g.userData.txt = txt; g.userData.p = p; return g; });

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
function pintarCel(modo, scroll, resalta, llego) {
  const clave = `${modo}|${Math.round(scroll * 40)}|${Math.round(resalta * 10)}|${llego ? 1 : 0}`;
  if (clave === celClave) return;
  celClave = clave;
  const x = lienzoCel.getContext("2d"), Wc = 600, Hc = 1192;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, Wc, Hc);
  if (modo === "chat") {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, Wc, 170);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(84, 98, 46, 0, Math.PI * 2); x.fill(); biciIcono(x, 84, 98, 32, "#0b1220", 8);
    x.fillStyle = "#efeee5"; x.font = F(800, 46); x.fillText("Bicicletería", 150, 116);
    x.fillStyle = "#dcdacb"; rr(x, 230, 214, 140, 54, 27); x.fillStyle = "#16243d"; x.font = F(700, 34); x.textAlign = "center"; x.fillText("Hoy", 300, 253); x.textAlign = "left";
    if (llego) dibujarMensaje(x, 46, 330, 508, resalta, 1);
  } else {
    // el feed: arriba la foto para todos, abajo su mensaje; scroll empuja la foto para arriba
    x.fillStyle = "#16243d"; x.fillRect(0, 0, Wc, 70);
    const yPost = 100 - scroll * 760;
    dibujarPost(x, 30, yPost, 540, 1, sg(scroll, 0.05, 0.5));
    const yMsj = lerp(780, 230, eio(scroll));
    dibujarMensaje(x, 46, yMsj, 508, resalta, 1);
    // más abajo, otras cosas del feed (genéricas, grises): la pantalla nunca queda vacía
    for (let k = 0; k < 2; k++) { const yy = yMsj + 430 + k * 330; x.fillStyle = "#ffffff"; rr(x, 30, yy, 540, 290, 28); x.fillStyle = "#dcdacb"; x.fillRect(30, yy + 100, 540, 190); x.fillStyle = "#c9c7b8"; x.beginPath(); x.arc(90, yy + 52, 30, 0, Math.PI * 2); x.fill(); rr(x, 140, yy + 38, 200, 20, 10); }
    x.fillStyle = "#16243d"; x.fillRect(0, 0, Wc, 70);
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
  const cartel = (verde) => lienzo(880, 216, (x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 880, 216);
    biciIcono(x, 200, 100, 70, verde ? "#3fa60a" : "#16243d", 14);
    x.fillStyle = "#16243d"; x.font = F(900, 92); x.fillText("BICIS", 340, 142);
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
    x.fillStyle = "#0b1220"; x.font = F(800, 58); x.fillText(f.n, 132, 76);
    x.fillStyle = "#4b5468"; x.font = F(600, 46); x.fillText(f.d, 470, 74);
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
    x.fillStyle = "#0b1220"; x.font = F(800, 84); x.fillText("bici urbana · marzo", 420, 430);
    x.fillStyle = "#4b5468"; x.font = F(600, 84); x.fillText("Casco:", 60, 700);
    if (estado === 2) {
      x.fillStyle = "#5ce611"; rr(x, 340, 580, 420, 170, 85); x.fillStyle = "#0b1220"; x.font = F(900, 110); x.fillText("sí", 400, 705); tickC(x, 660, 665, 58, "#0b1220", "#5ce611");
    } else {
      x.fillStyle = "#f5dcd8"; rr(x, 340, 580, 300, 170, 85); x.strokeStyle = "#c7655b"; x.lineWidth = 10; rrS(x, 340, 580, 300, 170, 85);
      x.fillStyle = "#a8463d"; x.font = F(900, 110); x.fillText("no", 420, 705);
      if (estado === 1) { x.strokeStyle = "#a8463d"; x.lineWidth = 16; x.lineCap = "round"; x.beginPath(); x.moveTo(370, 672); x.lineTo(612, 656); x.stroke(); }
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
  for (const tj of tarjetas) tj.p.material.map = lienzo(920, 1240, (x) => {
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, 920, 1240);
    x.fillStyle = tj.L.s > 0 ? "#5ce611" : "#9aa0a8"; x.beginPath(); x.arc(460, 400, 230, 0, Math.PI * 2); x.fill();
    x.fillStyle = tj.L.s > 0 ? "#0b1220" : "#efeee5"; x.font = F(900, 240); x.textAlign = "center"; x.fillText(tj.n[0], 460, 485);
    x.fillStyle = "#0b1220"; x.font = F(900, 180); x.fillText(tj.n, 460, 900);
    x.fillStyle = "#c9c7b8"; rr(x, 230, 990, 460, 40, 20); rr(x, 300, 1070, 320, 36, 18);
  });
  for (const m of msjs) m.userData.p.material.map = lienzo(880, 220, (x) => {
    x.fillStyle = "#5ce611"; x.fillRect(0, 0, 880, 220);
    const [n, r] = m.userData.txt.split(",");
    x.fillStyle = "#0b1220"; x.font = F(900, 92); x.fillText(n + ",", 40, 140);
    const w = x.measureText(n + ", ").width; x.font = F(600, 92); x.fillText(r.trim(), 40 + w, 140);
  });
  [izq.cartel, der.cartel, encabezado, pantallaOn, fichaP, globoP, ...filas.map((f) => f.p), ...chips.map((c) => c.userData.p), ...tarjetas.map((tj) => tj.p), ...msjs.map((m) => m.userData.p)].forEach((p) => (p.material.needsUpdate = true));
  pintarCel("chat", 0, 0, false);
}

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ]; cúbica monótona continua (Fritsch-Carlson).
const MON1 = V(1.45, 1.95, 1.1); // el monitor afuera, delante de la vidriera de la derecha
const FICHA1 = V(1.45, 2.1, 2.3);
const CEL1 = V(2.25, 1.75, 2.9);
const PAULA0 = V(1.02, 0, 3.0);
const BICI_PARK = V(1.8, 0, 2.0);
const FICHA2 = V(1.45, 2.0, 2.4);
const CIELO = V(1.6, 6.4, 1.5);
const CAM = [
  [0, 0, 4, 17.2, 0, 3.12, 0],
  [S["s01b-una"], 0, 4, 16.6, 0, 3.08, 0],
  [S["s02-izquierda"] - 0.1, 1, 4, 15.0, -0.2, 2.8, 0],
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
  [S["s06-mensaje"] - 0.05, -2, 4, 6.8, 1.6, 1.45, 2.3],
  [S["s06-mensaje"] + 0.55, 4, 3, 6.0, 2.0, 1.8, 2.6],
  [W[38], 6, 2, 4.6, CEL1.x, CEL1.y + 0.02, CEL1.z],
  [S["s07-vio"] - 0.05, 6, 2, 4.4, CEL1.x, CEL1.y + 0.02, CEL1.z],
  [S["s07-vio"] + 0.5, -4, 6, 8.4, 1.58, 1.6, 2.8],
  [S["s08-su-nombre"] - 0.05, -2, 6, 8.3, 1.52, 1.6, 2.8],
  [W[56], 0, 6, 8.2, 1.52, 1.6, 2.8],
  [W[57] + 0.6, 8, 7, 8.4, 2.3, 1.5, 1.9],
  [S["s09-mismos"] - 0.1, 10, 7, 9.0, 2.5, 1.6, 1.5],
  [S["s09-mismos"] + 0.8, 2, 6, 19.6, 0.62, 2.45, 0.4],
  [W[64] + 0.1, 0, 6, 20.0, 0.6, 2.4, 0.4],
  [W[67], 7, 6, 9.6, 1.3, 1.75, 1.0],
  [S["s11-scalerics"] - 0.05, 8, 6, 8.9, 1.35, 1.8, 1.0],
  [S["s11-scalerics"] + 0.6, 0, 4, 6.4, FICHA2.x, FICHA2.y, FICHA2.z],
  [S["s12-tu-local"] - 0.05, -2, 4, 6.2, FICHA2.x, FICHA2.y, FICHA2.z],
  [S["s12-tu-local"] + 0.7, -12, 6, 5.6, der.ped.x, 1.75, -0.3],
  [W[82] + 0.4, 6, 5, 5.0, der.ped.x, 1.85, 0],
  [S["s13-llamada"] - 0.05, 8, 4, 6.0, 1.58, 3.3, 0.5],
  [S["s13-llamada"] + 0.65, 4, 0, 6.6, CIELO.x, CIELO.y - 0.45, CIELO.z],
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
    // "cascos": pop y una vuelta sincronizada
    const vuelta = eio(sg(t, W[4] - 0.05, W[4] + 0.65));
    s *= 1 + 0.12 * pulso(t, W[4] - 0.08, 0.4);
    ry += vuelta * Math.PI * 2;
    // "Mismos cascos": se elevan y giran en espejo
    const sube = eio(sg(t, W[61] - 0.08, W[61] + 0.45)) * (1 - eio(sg(t, W[64], W[64] + 0.5)));
    pos.y += 0.32 * sube + Math.sin(t * 1.6 + L.s) * 0.025 * sube;
    ry += L.s * sube * Math.PI * 2;
    s *= 1 + 0.12 * pulso(t, W[61] - 0.1, 0.38);
    let vis = 1;
    if (L.s > 0) {
      // callback: vuela de la vidriera a la ficha de Paula
      const vuela = eio(sg(t, W[73] - 0.4, W[73] + 0.2));
      if (vuela > 0) {
        const dest = fichaTop(t).add(V(0.36, 0.035, -0.12));
        pos = lerpV(pos, dest, vuela); pos.y += Math.sin(Math.PI * vuela) * 0.75;
        s = lerp(s, 0.46, vuela); ry = lerp(ry % (Math.PI * 2), Math.PI - 0.35, vuela); rx = Math.sin(Math.PI * vuela) * 0.4;
      }
      if (t >= W[73] + 0.2) { pos = fichaTop(t).add(V(0.36, 0.035, -0.12)); s = 0.46 * (1 + 0.1 * pulso(t, W[73] + 0.18, 0.25)); ry = Math.PI - 0.35; rx = 0; }
      // s13: reaparece en el cielo, girando
      if (t >= S["s12-tu-local"] + 0.45) {
        const t0 = W[83] + 0.05, e = eio(sg(t, t0, S["s13-llamada"] + 0.6));
        vis = t >= t0 ? 1 : 0;
        pos = lerpV(V(der.ped.x, 1.35, der.ped.z), CIELO, e); pos.z += Math.sin(Math.PI * e) * 0.6; s = lerp(0.55, 1.05, e) * bk(sg(t, t0, t0 + 0.35)) * (1 + 0.04 * Math.sin(t * 2.2));
        ry = t * 0.9 + 0.6; rx = 0.18 + Math.sin(t * 1.3) * 0.05;
      }
    }
    c.visible = vis > 0 && s > 0.01; c.position.copy(pos); c.scale.setScalar(s); c.rotation.set(rx, ry, 0);
    // el soporte se esconde cuando entra la caja
    L.soporte.visible = !(L.s > 0 && t > S["s12-tu-local"] + 0.3);
  }

  // ---- el celular de la izquierda: la foto en las redes y su cascada ----
  {
    const s = vida(t, W[14] - 0.15, S["s03-derecha"] + 0.35, 0.45, 0.3);
    const sube = eo(sg(t, W[14] - 0.15, W[14] + 0.35));
    ocultar(celIzq, s);
    celIzq.position.set(-1.45, lerp(-0.8, 1.85, sube), 1.35); celIzq.rotation.set(-0.06, 0.12, lerp(0.15, 0, sube));
    celIzq.scale.multiplyScalar(1 + 0.04 * pulso(t, W[14] - 0.02, 0.2));
    cascada.forEach((c, i) => {
      const t0 = W[18] - 0.05 + i * 0.07;
      const u = eo(sg(t, t0, t0 + 0.55));
      const sc = (t < t0 ? 0 : 1) * lerp(0.9, 0.4, u) * (1 - eio(sg(t, S["s03-derecha"] + 0.05, S["s03-derecha"] + 0.4)));
      ocultar(c, sc);
      // abanico alrededor del celular: el mismo post, para todos igual
      const ang = Math.PI * (0.12 + 0.76 * (i / 6)), rad = (1.0 + 0.12 * (i % 3)) * u;
      c.position.set(-1.45 + Math.cos(ang) * rad * 1.05, 1.85 + Math.sin(ang) * rad * 0.95, 1.3 - u * 0.35);
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
      const y = lerp(FY[f.i], FY[slot], junta);
      // la de Paula se va con la ficha en "Le escribe"
      const sePaula = f.i === 0 ? sg(t, S["s05-escribe"] - 0.02, S["s05-escribe"] + 0.05) : 0;
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
      c.position.copy(CHIP_POS[i]); c.position.y += (1 - cae * cae) * 0.9 + Math.sin(Math.PI * sg(t, t0 + 0.3, t0 + 0.45)) * 0.03;
      c.position.z += (1 - cae) * 0.3;
      c.rotation.set(0, 0, (1 - cae) * (i ? -0.25 : 0.25));
      c.scale.setScalar(1 + 0.08 * pulso(t, t0 + 0.28, 0.2));
    });
  }

  // ---- la ficha de Paula ----
  {
    let vis = false;
    // s05: sale de la fila, crece y viene hacia la cámara
    if (t >= S["s05-escribe"] - 0.02 && t < S["s07-vio"]) {
      const u = eio(sg(t, S["s05-escribe"] - 0.02, S["s05-escribe"] + 0.5));
      der.mon.updateMatrixWorld(true);
      const fila = filas[0].g.getWorldPosition(new THREE.Vector3());
      const ret = eio(sg(t, W[37] + 0.1, W[37] + 0.6));
      const pos = lerpV(fila, FICHA1, u); pos.z += Math.sin(Math.PI * u) * 0.4;
      ficha.position.copy(lerpV(pos, V(0.9, 1.4, -1.6), ret));
      const sx = lerp(1.42 / FW_, 1, u), sy = lerp(0.118 / FH_, 1, u);
      const k = 1 - ret;
      ficha.scale.set(Math.max(0.001, sx * k), Math.max(0.001, sy * k), Math.max(0.001, k));
      ficha.rotation.set(0, Math.sin(Math.PI * u) * -0.3, 0);
      ficha.scale.multiplyScalar(1 + 0.04 * pulso(t, W[36] - 0.05, 0.25));
      vis = k > 0.02;
      if (fichaP.material.map !== fichaTex[0]) { fichaP.material.map = fichaTex[0]; fichaP.material.needsUpdate = true; }
    }
    // s11: vuelve desde la tarjeta chica de Paula (con un giro que cambia la cara) y se tilda
    if (t >= S["s11-scalerics"] - 0.02) {
      const u = eio(sg(t, S["s11-scalerics"] - 0.02, S["s11-scalerics"] + 0.6));
      const tj = tarjetas.find((x) => x.L.s > 0 && x.i === 0);
      const sale = eio(sg(t, S["s12-tu-local"] - 0.02, S["s12-tu-local"] + 0.45));
      const pos = lerpV(TARJ_P, FICHA2, u); pos.y += Math.sin(Math.PI * u) * 0.35;
      ficha.position.copy(lerpV(pos, V(3.6, 3.6, 1.6), sale));
      const sx = lerp(0.5 / FW_, 1, u), sy = lerp(0.66 / FH_, 1, u);
      ficha.scale.set(sx * (1 - sale * 0.6), sy * (1 - sale * 0.6), 1 - sale * 0.6);
      ficha.rotation.set(0, Math.PI * 2 * (1 - u) + sale * -0.6, sale * -0.3);
      ficha.scale.multiplyScalar(1 + 0.05 * pulso(t, W[73] + 0.15, 0.25));
      vis = sale < 0.98;
      const est = t >= W[73] + 0.02 ? 2 : t >= W[72] + 0.3 ? 1 : 0;
      if (fichaP.material.map !== fichaTex[est]) { fichaP.material.map = fichaTex[est]; fichaP.material.needsUpdate = true; }
    }
    ficha.visible = vis;
  }

  // ---- el globo del mensaje: de la ficha al celular ----
  {
    const t0 = W[36] - 0.1, t1 = W[37] + 0.25;
    const u = eio(sg(t, t0, t1));
    const vis = t >= t0 && t < t1 + 0.02;
    globo.visible = vis;
    if (vis) {
      const a = FICHA1.clone().add(V(0.5, 0.25, 0.15)), b = CEL1.clone().add(V(0.0, 0.22, 0.06));
      const p = lerpV(a, b, u); p.y += Math.sin(Math.PI * u) * 0.35; p.z += Math.sin(Math.PI * u) * 0.25;
      globo.position.copy(p); globo.scale.setScalar(bk(sg(t, t0, t0 + 0.25)) * lerp(1, 0.78, u)); globo.rotation.set(0, lerp(-0.2, 0, u), Math.sin(Math.PI * u) * 0.15);
    }
  }

  // ---- la bici de Paula ----
  {
    let x = 0, z = 2.6, ry = Math.PI, vis = false, giro = 0;
    if (t >= W[33] - 0.35 && t < S["s06-mensaje"] + 0.5) {
      const u = eo(sg(t, W[33] - 0.35, W[35] + 0.2));
      const sal = Math.pow(sg(t, S["s06-mensaje"], S["s06-mensaje"] + 0.5), 2);
      x = lerp(3.8, 1.45, u) - sal * 2.1; vis = true; ry = Math.PI; z = 2.6;
      giro = (3.8 - x) / biciP.R;
    } else if (t >= S["s07-vio"] - 0.2) {
      const u = eo(sg(t, S["s07-vio"] - 0.2, S["s07-vio"] + 0.6));
      const empuja = eio(sg(t, W[57] + 0.36, W[59] + 0.65));
      x = lerp(-0.9, BICI_PARK.x, u) + 0.5 * empuja; z = BICI_PARK.z; ry = 0; vis = true;
      giro = -(x + 0.9) / biciP.R;
    }
    biciP.g.visible = vis;
    biciP.g.position.set(x, 0, z); biciP.g.rotation.set(0, ry, 0);
    biciP.ruedas.forEach((w) => (w.rotation.z = giro));
    biciP.biela.rotation.z = giro * 0.45;
  }

  // ---- Paula ----
  {
    const vis = t >= S["s06-mensaje"] + 1.6 && t < W[64] + 0.1;
    paula.raiz.visible = vis;
    if (vis) {
      const CEL = { manoI: [0.075, 0.33, 0.3], manoD: [-0.075, 0.33, 0.3], codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] };
      const caminaBici = sg(t, W[57] + 0.36, W[59] + 0.65);
      const claves = [
        [0, { x: PAULA0.x, z: PAULA0.z, giro: 0.25, ...CEL, cabeza: { asiente: 0.32, giro: 0.05 }, ojos: { y: -0.75, x: 0.1 }, boca: { sonrisa: 0.1 } }],
        [W[46] + 0.15, { cejas: { alto: 0.35, ang: 0.15 }, cabeza: { asiente: 0.3, giro: 0.12 } }, 0.25],
        [W[49] + 0.1, { cejas: { alto: -0.1, ang: 0 }, boca: { sonrisa: -0.15 }, cabeza: { giro: -0.12, asiente: 0.34 } }, 0.25],
        [W[51] + 0.1, { cabeza: { giro: 0.08 } }, 0.25],
        [W[55] + 0.1, { cabeza: { asiente: 0.08, giro: -0.15, ladea: 0.1 }, ojos: { y: -0.15, x: -0.3, feliz: 0.2 }, cejas: { alto: 0.75, ang: 0.3 }, boca: { sonrisa: 1, abierta: 0.32, ancho: 1.15 } }, 0.25],
        [W[56] + 0.1, { boca: { sonrisa: 0.9, abierta: 0.08 }, cabeza: { ladea: -0.06, asiente: 0.12 } }, 0.25],
        [W[57] + 0.36, { x: 1.62, z: 2.66, giro: Math.PI / 2, paso: 1, cabeza: { asiente: 0.0, giro: 0, ladea: 0 }, ojos: { y: 0, x: 0, feliz: 0.1 }, manoD: [-0.29, -0.06, 0.06], codoD: null, codoI: null, boca: { sonrisa: 0.7, abierta: 0 } }, 0.36],
        [W[59] + 0.65, { x: 2.12, paso: 1 }, 0.8, (u) => u],
        [W[59] + 0.85, { paso: 0, cabeza: { giro: -0.75, asiente: 0.04 }, ojos: { x: -0.3 }, boca: { sonrisa: 1, abierta: 0.2 }, cejas: { alto: 0.4 } }, 0.25],
        [S["s09-mismos"] + 0.75, { giro: Math.PI * 0.8, cabeza: { giro: 0 }, x: 2.6, z: 1.5, paso: 1, manoI: [0.29, -0.06, 0.06] }, 0.5],
        [S["s09-mismos"] + 1.7, { x: 2.82, z: -0.95, paso: 1 }, 0.95, (u) => u],
        [S["s09-mismos"] + 1.95, { paso: 0, giro: Math.PI * 0.72 }, 0.25],
      ];
      const p = poseEn(t, claves);
      paula.poner(p);
      // empuja la bici: la mano izquierda va al puño del manubrio
      if (caminaBici > 0 && t < S["s09-mismos"] + 0.4) {
        paula.raiz.updateMatrixWorld(true); biciP.g.updateMatrixWorld(true);
        const puno = biciP.g.localToWorld(V(0.13, 1.05, 0.31));
        const loc = paula.cuerpo.worldToLocal(puno);
        const k = eio(sg(caminaBici, 0, 0.3)) * (1 - eio(sg(t, S["s09-mismos"] + 0.2, S["s09-mismos"] + 0.4)));
        p.manoI = [lerp(p.manoI[0], loc.x, k), lerp(p.manoI[1], loc.y, k), lerp(p.manoI[2], loc.z, k)];
        p.codoI = [0.8, -0.6, -0.2];
        paula.poner(p);
      }
      const guarda = eio(sg(t, W[57] - 0.02, W[57] + 0.3));
      celChico.visible = guarda < 0.98; celChico.scale.setScalar(1 - guarda);
    }
  }

  // ---- el celular grande de Paula (la ampliación de su pantalla) ----
  {
    const entra = eo(sg(t, S["s06-mensaje"] + 0.0, S["s06-mensaje"] + 0.5));
    const guarda = eio(sg(t, W[57] - 0.02, W[57] + 0.3));
    const vis = t >= S["s06-mensaje"] && guarda < 0.99;
    celP.visible = vis;
    if (vis) {
      paula.raiz.updateMatrixWorld(true);
      const mano = celChico.getWorldPosition(new THREE.Vector3());
      const base = V(CEL1.x, lerp(-0.9, CEL1.y, entra), CEL1.z);
      const pos = lerpV(base, mano, guarda);
      const vib = en(t, W[37] + 0.2, W[37] + 0.55) ? Math.sin(t * 70) * 0.012 : 0;
      celP.position.set(pos.x + vib, pos.y, pos.z);
      celP.rotation.set(0, lerp(-0.12, -0.6, guarda), lerp(0.12, 0, entra) + vib * 2);
      const crece = eio(sg(t, S["s07-vio"], S["s07-vio"] + 0.6));
      celP.position.y += 0.06 * crece * (1 - guarda);
      celP.scale.setScalar(lerp(lerp(1, 1.14, crece), 0.08, guarda) * (1 + 0.04 * pulso(t, W[46] - 0.1, 0.25)));
    }
    const llego = t >= W[37] + 0.22;
    const modo = t >= W[46] - 0.02 ? "feed" : "chat";
    const scroll = eio(sg(t, W[49] - 0.05, W[49] + 0.45));
    const resalta = eio(sg(t, W[55] - 0.05, W[55] + 0.25));
    pintarCel(modo, scroll, resalta, llego);
  }

  // ---- los puntitos que unen el celular chico con la ampliación ----
  {
    const s = vida(t, S["s07-vio"] + 0.45, W[57] - 0.1, 0.3, 0.2);
    paula.raiz.updateMatrixWorld(true);
    const a = celChico.getWorldPosition(new THREE.Vector3());
    const b = celP.localToWorld(V(-CW / 2, -0.25, 0));
    puntos.forEach((p, i) => { const k = (i + 1) / 4; p.position.copy(lerpV(a, b, k)); ocultar(p, s * bk(sg(t, S["s07-vio"] + 0.45 + i * 0.08, S["s07-vio"] + 0.75 + i * 0.08))); });
  }

  // ---- Dani en la puerta ----
  {
    const vis = t >= W[59] + 0.3 && t < W[64] + 0.1;
    dani.raiz.visible = vis;
    if (vis) {
      const claves = [
        [0, { x: 2.85, z: -0.75, giro: -0.1, cabeza: { giro: 0.2 }, boca: { sonrisa: 0.9, abierta: 0.25 }, cejas: { alto: 0.45 }, ojos: { x: -0.2 } }],
        [S["s09-mismos"] + 0.9, { x: 2.45, z: -1.35, giro: 0.6, cabeza: { giro: 0.2 }, boca: { sonrisa: 0.8, abierta: 0.1 }, paso: 1 }, 0.6],
        [S["s09-mismos"] + 1.2, { paso: 0 }, 0.2],
      ];
      const p = poseEn(t, claves);
      const sal = t < S["s09-mismos"] + 0.6 ? saludo(t, "D", 1) : {};
      dani.poner({ ...p, ...sal });
    }
  }

  // ---- "=" en el pilar ----
  {
    const s = vida(t, W[62] - 0.08, W[64] + 0.25, 0.4, 0.25);
    ocultar(igual, s * 1.0); igual.position.set(0, 1.75 + Math.sin(t * 2) * 0.03, 0.75); igual.rotation.set(0, Math.sin(t * 1.4) * 0.25, 0);
  }

  // ---- las tarjetas de los clientes, los "?" grises y lo que se llevó cada uno ----
  {
    const fin = S["s12-tu-local"] + 0.02;
    tarjetas.forEach((tj) => {
      const t0 = W[63] - 0.1 + tj.i * 0.06;
      let s = vida(t, t0, fin, 0.4, 0.3);
      if (tj.L.s > 0 && tj.i === 0) s *= t < S["s11-scalerics"] - 0.02 ? 1 : 0;
      ocultar(tj.g, s); tj.g.position.set(X(tj.L.s, CU[tj.i]), 1.25 + Math.sin(t * 1.5 + tj.i) * 0.015, 1.0); tj.g.rotation.set(0, -tj.L.s * 0.04, 0);
    });
    preguntas.forEach((q, i) => {
      const s = vida(t, W[64] - 0.1 + i * 0.05, fin, 0.35, 0.3);
      ocultar(q, s * 1.0); q.position.copy(q.userData.pos); q.position.y += Math.sin(t * 2 + i) * 0.03; q.rotation.y = Math.sin(t * 1.2 + i) * 0.4;
    });
    items.forEach((it, i) => {
      const t0 = W[66 + i] - 0.08;
      let s = vida(t, t0, fin, 0.4, 0.3);
      let pos = V(X(1, CU[i]), 1.92 + Math.sin(t * 2 + i) * 0.03, 1.05);
      let ry = t * 0.9 + i;
      if (i === 0) {
        // la bici chica de Paula se va con la ficha
        const u = eio(sg(t, S["s11-scalerics"] - 0.02, S["s11-scalerics"] + 0.6));
        s = t < t0 ? 0 : bk(sg(t, t0, t0 + 0.4));
        pos.y = 1.68 + Math.sin(t * 2) * 0.02; ry = -0.35 + Math.sin(t * 1.3) * 0.35;
        if (u > 0) { pos = lerpV(pos, fichaTop(t).add(V(-0.38, 0, 0.0)), u); ry = lerp(ry, -0.35, u); }
        if (t >= S["s11-scalerics"] + 0.6) { pos = fichaTop(t).add(V(-0.38, 0, 0)); ry = -0.35; }
        const sale = eio(sg(t, S["s12-tu-local"] - 0.02, S["s12-tu-local"] + 0.45));
        s *= 1 - sale;
        it.scale.setScalar(Math.max(0.001, s) * lerp(0.3, 0.3, u));
        it.visible = s > 0.002;
      } else ocultar(it, s * 1.45);
      it.position.copy(pos); it.rotation.set(0, ry, 0);
    });
  }

  // ---- s12: la caja nueva en la vidriera, el "?" y los tres mensajes con nombre ----
  {
    const s = vida(t, S["s12-tu-local"] + 0.2, DUR + 5, 0.45);
    ocultar(caja, s * 1.0); caja.position.set(der.ped.x, 1.02, der.ped.z); caja.rotation.set(0, -0.25, 0);
    const abre = eio(sg(t, W[82] - 0.05, W[82] + 0.3));
    solapas.forEach((p, i) => (p.rotation.z = (i ? -1 : 1) * abre * 2.1));
    const q = vida(t, W[78] - 0.12, W[82] - 0.05, 0.4, 0.25);
    ocultar(preguntaVerde, q * 1.0); preguntaVerde.position.set(der.ped.x, 2.12 + Math.sin(t * 2.2) * 0.04, der.ped.z + 0.1); preguntaVerde.rotation.y = Math.sin(t * 1.5) * 0.35;
    msjs.forEach((m, i) => {
      const t0 = W[82] + 0.05 + i * 0.16;
      const u = eo(sg(t, t0, t0 + 0.5));
      ocultar(m, (t < t0 ? 0 : bk(sg(t, t0, t0 + 0.35))) * (1 - eio(sg(t, S["s13-llamada"] + 0.05, S["s13-llamada"] + 0.4))));
      const dest = V(der.ped.x + [0.0, 0.1, -0.04][i], [2.2, 1.9, 1.6][i], 0.85);
      const p = lerpV(V(der.ped.x, 1.45, der.ped.z), dest, u); p.y += Math.sin(Math.PI * u) * 0.2;
      m.position.copy(p); m.position.y += Math.sin(t * 2 + i) * 0.015; m.scale.multiplyScalar(0.82); m.rotation.set(0, 0.1, [0.04, -0.03, 0.02][i] * u);
    });
  }

  renderer.render(scene, camera);
}
// el borde de arriba de la ficha (donde se apoyan el casco y la bici chica)
function fichaTop(t) {
  const u = eio(sg(t, S["s11-scalerics"] - 0.02, S["s11-scalerics"] + 0.6));
  const sale = eio(sg(t, S["s12-tu-local"] - 0.02, S["s12-tu-local"] + 0.45));
  const tj = tarjetas.find((x) => x.L.s > 0 && x.i === 0);
  const pos = lerpV(TARJ_P, FICHA2, u); pos.y += Math.sin(Math.PI * u) * 0.35;
  const p = lerpV(pos, V(3.6, 3.6, 1.6), sale);
  return p.add(V(0, (FH_ / 2) * lerp(0.66 / FH_, 1, u) * (1 - sale * 0.6), 0));
}
function en(t, a, b) { return t >= a && t < b; }

texturas();
window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
