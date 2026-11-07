// Capa 3D de por-que-el-final (Three.js r170 local). Base técnica: reels/por-que-la-lista.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin
// semilla. Objetos de marca (navy, verde, crema, blanco; rojo apagado SOLO para el problema):
// la mesa de laboratorio con dos cubetas de vidrio y agua fría (14 °C, SIN hielo), la mano de yeso que entra
// al agua, el termómetro de laboratorio (14° rojo apagado → 15° verde), el "?" verde, el cronómetro, la curva
// del recuerdo con sus dos pines, el paquete kraft con el ticket, el celular con el chat genérico, el
// calendario y el frente de un local genérico. La cámara viaja en una curva continua de clave en clave.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800b.js";
import { E, W, DUR } from "./tiempos3d.js";

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.6, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (A, B, u) => V(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E; // inicios de escena
const D2R = Math.PI / 180;
let semilla = 1993;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const en = (t, a, b) => t >= a && t < b;
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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 400);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x0b1424);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, Math.PI / 2.4, 0xfff1dc, 2.4);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xbcd6ff, 1.8);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.2);
  tira(3, 3, 0, 1, 7, 0, 0xffffff, 0.9);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ color: 0x1b2c4a, side: THREE.DoubleSide }));
  top.position.y = 9; top.rotation.x = Math.PI / 2; env.add(top);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.65;

const key = new THREE.DirectionalLight(0xffe9d2, 2.6); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0x9cc4ff, 2.0); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0x3a5486, 0x0b1220, 1.0); scene.add(fill);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x7d8597, kraft: 0xb8946a, agua: 0xcfe3ea };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.18 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.65),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.55), navy3: mat(C.navy3, 0.52), edge: mat(C.edge, 0.5),
  red: mat(C.red, 0.55), white: mat(C.white, 0.45), gris: mat(C.gris, 0.5, { metalness: 0.3 }),
  yeso: mat(0xece8dc, 0.78), manga: mat(0x33507e, 0.7), puno: mat(C.navy2, 0.6),
  kraft: mat(C.kraft, 0.85), kraft2: mat(0xa9845b, 0.85),
  tick: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.3 }),
  numCr: mat(C.cr, 0.5, { emissive: C.cr, emissiveIntensity: 0.12 }),
  numG: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.25 }),
  borde: mat(0xf4f6f7, 0.35, { emissive: 0xffffff, emissiveIntensity: 0.08 }),
};
// agua: celeste-blanco translúcido sobrio, superficie más marcada (sin hielo: 14 °C)
const aguaMat = new THREE.MeshStandardMaterial({ color: C.agua, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.36, depthWrite: false, emissive: 0x6f8fa0, emissiveIntensity: 0.12 });
const supMat = new THREE.MeshStandardMaterial({ color: 0xdcecf2, roughness: 0.08, metalness: 0.1, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide, emissive: 0x89a7b5, emissiveIntensity: 0.15 });
const vidrioMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide });
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };

const sombraTex = (() => {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const x = c.getContext("2d"); const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(4,8,16,0.7)"); gr.addColorStop(0.5, "rgba(4,8,16,0.32)"); gr.addColorStop(1, "rgba(4,8,16,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const sombra = (w, d) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, opacity: 1 }));
  m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m;
};
function apoyar(som, x, y, z, s, op = 1) { som.visible = s > 0.002; if (!som.visible) return; som.position.set(x, y + 0.006, z); som.scale.setScalar(Math.max(0.001, s)); som.material.opacity = op * cl(s); }
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }

const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 10, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
};
// tilde 3D: un polígono en V extruido
const tickGeo = (() => {
  const sh = new THREE.Shape();
  [[-0.5, 0.06], [-0.16, -0.3], [0.5, 0.36], [0.37, 0.49], [-0.16, -0.05], [-0.37, 0.19]].forEach(([x, y], i) => (i ? sh.lineTo(x, y) : sh.moveTo(x, y)));
  sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.035, bevelSegments: 2 });
  g.translate(0, 0, -0.09); return g;
})();

// ---------- lienzos ----------
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", sans-serif`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}

// ================= LA MESA DE LABORATORIO =================
const mesa = new THREE.Group(); scene.add(mesa);
{
  mesa.add(mesh(rbox(9.5, 0.32, 5.4, 0.08), M.navy2, -1.0, -0.16, -0.7));
  mesa.add(mesh(rbox(9.5, 0.05, 0.06, 0.02), M.navy3, -1.0, -0.06, 2.01));
}

// ================= LAS CUBETAS (vidrio de laboratorio, agua fría a 3/4) =================
const CW = 1.75, CH = 1.3, CD = 1.2, NIVEL = 0.98;
function hacerCubeta() {
  const g = new THREE.Group();
  const caras = [];
  // vidrio: 5 paneles (sin tapa), bordes marcados en blanco
  const p = (w, h, x, y, z, ry, rx = 0) => { const m = mesh(new THREE.PlaneGeometry(w, h), vidrioMat, x, y, z); m.rotation.set(rx, ry, 0); g.add(m); caras.push(m); };
  p(CW, CH, 0, CH / 2, CD / 2, 0); p(CW, CH, 0, CH / 2, -CD / 2, 0); p(CD, CH, -CW / 2, CH / 2, 0, Math.PI / 2); p(CD, CH, CW / 2, CH / 2, 0, Math.PI / 2);
  const bordeMat = M.borde.clone();
  const e = 0.05;
  const barra = (w, h, d, x, y, z) => g.add(mesh(rbox(w, h, d, 0.02), bordeMat, x, y, z));
  [[CH, 0], [0, 0]].forEach(([y]) => { barra(CW + e, e, e, 0, y, CD / 2); barra(CW + e, e, e, 0, y, -CD / 2); barra(e, e, CD + e, CW / 2, y, 0); barra(e, e, CD + e, -CW / 2, y, 0); });
  [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([sx, sz]) => barra(e, CH, e, sx * CW / 2, CH / 2, sz * CD / 2));
  g.add(mesh(rbox(CW, 0.04, CD, 0.01), vidrioMat, 0, 0.02, 0)); // fondo
  // el agua: cuerpo + superficie con ondas
  const agua = mesh(new THREE.BoxGeometry(CW - 0.06, NIVEL - 0.04, CD - 0.06), aguaMat, 0, (NIVEL - 0.04) / 2 + 0.03, 0); g.add(agua);
  const sg = new THREE.PlaneGeometry(CW - 0.06, CD - 0.06, 28, 18); sg.rotateX(-Math.PI / 2);
  const base = Float32Array.from(sg.attributes.position.array);
  const sup = mesh(sg, supMat, 0, NIVEL, 0); g.add(sup);
  // reflejo marcado en el borde de la superficie (una línea blanca fina adelante)
  const brillo = mesh(rbox(CW - 0.12, 0.018, 0.018, 0.008), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }), 0, NIVEL + 0.01, CD / 2 - 0.05); g.add(brillo);
  return { g, sup, base, bordeMat, agua };
}
const cubB = hacerCubeta(); scene.add(cubB.g); // la larga (derecha)
const cubA = hacerCubeta(); scene.add(cubA.g); // la corta (izquierda)
const POS_B = V(0, 0, 0), POS_A = V(-2.15, 0, -1.2);
const sombraB = sombra(2.6, 2.0), sombraA = sombra(2.6, 2.0);
// anillos de onda (alrededor de la muñeca y donde caen las gotas)
const anilloGeo = new THREE.RingGeometry(0.8, 1.0, 40); anilloGeo.rotateX(-Math.PI / 2);
const anillos = [];
for (let i = 0; i < 10; i++) { const m = mesh(anilloGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false }), 0, 0, 0); m.visible = false; scene.add(m); anillos.push(m); }
// salpicadura: gotitas que saltan (semilla fija)
const gotaGeo = new THREE.SphereGeometry(1, 14, 10);
const gotaMat = new THREE.MeshStandardMaterial({ color: 0xe6f2f6, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.85, emissive: 0x9cc0cf, emissiveIntensity: 0.25 });
const gotas = [];
for (let i = 0; i < 32; i++) { const m = mesh(gotaGeo, gotaMat); m.visible = false; scene.add(m); gotas.push({ m, a: azar() * Math.PI * 2, v: 0.6 + azar() * 0.9, up: 1.3 + azar() * 1.4, r: 0.025 + azar() * 0.03 }); }

// ================= LA MANO DE YESO (maniquí: crema, sin uñas ni arrugas, puño navy) =================
// local: la muñeca en el origen, los dedos hacia -y, la palma mira a +z, el pulgar del lado -x.
function hacerMano() {
  const raiz = new THREE.Group();
  const m = M.yeso;
  // palma: un bloque redondeado apenas más angosto en la muñeca
  const palma = mesh(rbox(0.46, 0.54, 0.16, 0.075, 4), m, 0, -0.29, 0);
  { const pos = palma.geometry.attributes.position; for (let i = 0; i < pos.count; i++) { const y = pos.getY(i); const k = 1 - 0.12 * cl((y + 0.27) / 0.54 + 0.5 - 0.5, 0, 1) * (y > 0 ? 1 : 0); pos.setX(i, pos.getX(i) * (y > 0 ? lerp(1, 0.86, y / 0.27) : 1)); void k; } palma.geometry.computeVertexNormals(); }
  raiz.add(palma);
  // dedos: tornos con la punta redonda (rectos y apenas separados)
  const dedo = (largo, r) => {
    const pts = [];
    const n = 10;
    for (let i = 0; i <= n; i++) { const u = i / n; pts.push(new THREE.Vector2(r * lerp(1, 0.84, u), -largo * u * 0.86)); }
    for (let i = 1; i <= 6; i++) { const a = (i / 6) * Math.PI / 2; pts.push(new THREE.Vector2(r * 0.84 * Math.cos(a), -largo * 0.86 - r * 0.84 * Math.sin(a))); }
    pts.unshift(new THREE.Vector2(0.0001, 0.02)); pts.splice(1, 0, new THREE.Vector2(r * 0.96, 0.0));
    return new THREE.LatheGeometry(pts, 20);
  };
  const DEDOS = [[-0.165, -0.53, 0.43, 0.054, -0.07], [-0.056, -0.555, 0.48, 0.056, -0.015], [0.056, -0.545, 0.45, 0.053, 0.035], [0.165, -0.51, 0.35, 0.047, 0.1]];
  const dedos = [];
  DEDOS.forEach(([x, y, L, r, rz]) => { const d = mesh(dedo(L, r), m, x, y, 0.0); d.rotation.set(-0.06, 0, rz); d.scale.z = 0.9; raiz.add(d); dedos.push(d); });
  // nudillos suaves (unen palma y dedos sin costura)
  DEDOS.forEach(([x, y, , r]) => raiz.add(mesh(new THREE.SphereGeometry(r * 1.08, 16, 12), m, x, y + 0.02, 0)));
  // pulgar: eminencia + dos falanges
  const ten = mesh(new THREE.SphereGeometry(1, 20, 14), m, -0.17, -0.2, 0.03); ten.scale.set(0.11, 0.17, 0.085); raiz.add(ten);
  const pulgar = new THREE.Group(); pulgar.position.set(-0.22, -0.2, 0.04); raiz.add(pulgar);
  const f1 = mesh(dedo(0.26, 0.062), m, 0, 0, 0); pulgar.add(f1);
  const art = new THREE.Group(); art.position.set(0, -0.22, 0); pulgar.add(art);
  const f2 = mesh(dedo(0.22, 0.056), m, 0, 0, 0); art.add(f2);
  art.add(mesh(new THREE.SphereGeometry(0.058, 14, 10), m, 0, 0.0, 0));
  pulgar.rotation.set(0.5, 0, -0.36); art.rotation.set(0.12, 0, 0.16);
  // muñeca y antebrazo de yeso, puño de camisa navy y la manga que sigue fuera de cuadro
  const brazo = new THREE.Group(); raiz.add(brazo);
  const ante = mesh(new THREE.CylinderGeometry(0.2, 0.165, 1.25, 28), m, 0, 0.6, 0); ante.scale.z = 0.72; brazo.add(ante);
  brazo.add(mesh(new THREE.SphereGeometry(0.17, 20, 14), m, 0, 0.0, 0)).scale.set(1, 0.6, 0.72);
  const puno = mesh(new THREE.CylinderGeometry(0.26, 0.255, 0.42, 30), M.puno, 0, 1.38, 0); puno.scale.z = 0.8; brazo.add(puno);
  const boton = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 14).rotateX(Math.PI / 2), M.cr, 0.0, 1.38, 0.215); brazo.add(boton);
  const manga = mesh(new THREE.CylinderGeometry(0.34, 0.27, 6.0, 30), M.manga, 0, 4.55, 0); manga.scale.z = 0.82; brazo.add(manga);
  raiz.traverse((o) => { if (o.isMesh) o.renderOrder = 0; });
  return { raiz, pulgar, art, dedos, ten };
}
const manoD = hacerMano(); scene.add(manoD.raiz); // derecha: en la larga
const manoI = hacerMano(); scene.add(manoI.raiz); // izquierda (espejada): en la corta
// el brazo sale hacia arriba y hacia atrás (la persona está del otro lado de la mesa)
const BRAZO_INC = { rx: -0.42, rz: 0.27 };

// ================= EL TERMÓMETRO DE LABORATORIO =================
// local: el bulbo en el origen, el tubo hacia +y (largo TL). Escala 12..17 °C.
const TL = 1.85;
const yTemp = (c) => 0.32 + (c - 12) * 0.27; // 14 → 0.86 · 15 → 1.13
function hacerTermo() {
  const g = new THREE.Group();
  const colMat = mat(C.red, 0.4, { emissive: C.red, emissiveIntensity: 0.25 });
  const bulbo = mesh(new THREE.SphereGeometry(0.15, 28, 20), colMat, 0, 0, 0); g.add(bulbo);
  const col = mesh(new THREE.CylinderGeometry(0.052, 0.052, 1, 18), colMat, 0, 0.5, 0); g.add(col);
  const colGMat = mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.3 });
  const colG = mesh(new THREE.CylinderGeometry(0.054, 0.054, 1, 18), colGMat, 0, 0.5, 0); colG.visible = false; g.add(colG);
  const vid = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.28, depthWrite: false });
  g.add(mesh(new THREE.SphereGeometry(0.2, 28, 20), vid, 0, 0, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.105, 0.105, TL - 0.1, 24, 1, true), vid, 0, (TL - 0.1) / 2 + 0.06, 0));
  g.add(mesh(new THREE.SphereGeometry(0.105, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), vid, 0, TL - 0.04, 0));
  // placa de escala crema detrás del tubo, con rayitas navy gruesas (cada grado larga)
  g.add(mesh(rbox(0.36, TL - 0.35, 0.04, 0.03), M.cr, 0, (TL - 0.35) / 2 + 0.2, -0.13));
  for (let c = 12; c <= 17; c += 0.5) {
    const larga = Math.abs(c - Math.round(c)) < 0.01;
    g.add(mesh(rbox(larga ? 0.12 : 0.07, 0.028, 0.02, 0.008), M.navy, -0.11 - (larga ? 0.0 : 0.02), yTemp(c), -0.1));
    g.add(mesh(rbox(larga ? 0.12 : 0.07, 0.028, 0.02, 0.008), M.navy, 0.11 + (larga ? 0.0 : 0.02), yTemp(c), -0.1));
  }
  // anillo verde que marca el 15
  const marca15 = mesh(rbox(0.38, 0.04, 0.04, 0.015), M.g, 0, yTemp(15), -0.1); g.add(marca15);
  g.add(mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.08, 20), M.navy3, 0, TL + 0.02, 0));
  return { g, col, colMat, colG, colGMat, bulbo, marca15 };
}
const termo = hacerTermo(); scene.add(termo.g);
const termoSombra = sombra(1.2, 1.2);
// la columna sigue roja hasta 14; solo el grado de más (14 -> 15) se pone verde
function ponerTemp(T, c, verde) {
  const h = yTemp(c), h14 = yTemp(14);
  const hr = Math.min(h, h14); void verde;
  T.col.scale.y = hr; T.col.position.y = hr / 2;
  T.colMat.color.set(C.red); T.colMat.emissive.copy(T.colMat.color); T.colMat.emissiveIntensity = 0.25;
  const hg = h - h14;
  T.colG.visible = hg > 0.005;
  if (T.colG.visible) { T.colG.scale.y = hg; T.colG.position.y = h14 + hg / 2; }
}
const numMat = (m) => { const c = m.clone(); c.transparent = true; return c; };
const num14 = new THREE.Mesh(textoGeo("14°", 0.42, 0.13), numMat(M.numCr)); scene.add(num14);
const num15 = new THREE.Mesh(textoGeo("15°", 0.42, 0.13), numMat(M.numG)); scene.add(num15);
// pop = escala de entrada (bk), op = opacidad de salida: nunca queda un punto suelto
function ponerNum(o, pop, op, k) {
  o.visible = pop > 0.002 && op > 0.01;
  if (!o.visible) return;
  o.scale.setScalar(k * pop); o.material.opacity = op; o.material.depthWrite = op > 0.99;
}

// ================= EL "?" VERDE (la bisagra) =================
const pregunta = new THREE.Mesh(textoGeo("?", 2.3, 0.55), M.g); scene.add(pregunta);
pregunta.geometry.computeBoundingBox();
const PREG_H = pregunta.geometry.boundingBox.max.y - pregunta.geometry.boundingBox.min.y;
const preguntaSombra = sombra(2.2, 1.2);

// ================= LAS CHAPAS "60 s" / "90 s" Y LAS FICHAS =================
const chapa = (txt) => { const g = new THREE.Group(); g.add(mesh(rbox(1.15, 0.5, 0.1, 0.08), M.navy3)); g.add(mesh(rbox(1.2, 0.55, 0.06, 0.09), M.cr, 0, 0, -0.03)); const n = new THREE.Mesh(textoGeo(txt, 0.3, 0.07), M.numCr); n.position.z = 0.07; g.add(n); g.userData.num = n; return g; };
const chapa60 = chapa("60 s"); scene.add(chapa60);
const chapa90 = chapa("90 s"); scene.add(chapa90);
const chapa60Mat = M.numCr.clone(); chapa60.userData.num.material = chapa60Mat;
const tick90 = mesh(tickGeo, M.tick); scene.add(tick90);
const fichaGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.075, 30);
const fichaAro = new THREE.TorusGeometry(0.205, 0.014, 8, 30).rotateX(Math.PI / 2);
const fichas = [];
const N_DER = 11, N_IZQ = 1;
for (let i = 0; i < N_DER + N_IZQ; i++) {
  const der = i < N_DER;
  const g = grupo(mesh(fichaGeo, der ? M.g : M.cr), mesh(fichaAro, der ? M.gd : M.cr3));
  g.userData = { der, k: der ? i : i - N_DER, rot: azar() * 0.6, dx: (azar() - 0.5) * 0.03, dz: (azar() - 0.5) * 0.03 };
  scene.add(g); fichas.push(g);
}
const fichasSombraD = sombra(0.9, 0.9), fichasSombraI = sombra(0.9, 0.9);

// ================= EL CRONÓMETRO =================
const crono = new THREE.Group(); scene.add(crono);
const aguja = new THREE.Group();
let arcoGeo = null, anillo60Geo = null;
{
  const cuerpo = mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.3, 64).rotateX(Math.PI / 2), M.cr, 0, 0, 0); crono.add(cuerpo);
  crono.add(mesh(new THREE.TorusGeometry(1.0, 0.07, 14, 64), M.cr2, 0, 0, 0.13));
  crono.add(mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.04, 64).rotateX(Math.PI / 2), M.navy, 0, 0, 0.15));
  for (let i = 0; i < 60; i++) {
    const largo = i % 5 === 0;
    const a = (i / 60) * Math.PI * 2;
    const r = largo ? 0.72 : 0.76;
    const tk = mesh(rbox(largo ? 0.05 : 0.025, largo ? 0.16 : 0.07, 0.02, 0.008), M.white, Math.sin(a) * r, Math.cos(a) * r, 0.18);
    tk.rotation.z = -a; crono.add(tk);
  }
  // arco verde de los 30 s de más (de las 12 a las 6, en sentido horario): se dibuja con drawRange
  const N = 60, r0 = 0.5, r1 = 0.66;
  const pos = [], idx = [];
  for (let i = 0; i <= N; i++) { const a = (i / N) * Math.PI; pos.push(Math.sin(a) * r0, Math.cos(a) * r0, 0, Math.sin(a) * r1, Math.cos(a) * r1, 0); }
  for (let i = 0; i < N; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  arcoGeo = new THREE.BufferGeometry(); arcoGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); arcoGeo.setIndex(idx); arcoGeo.computeVertexNormals();
  const arco = mesh(arcoGeo, new THREE.MeshBasicMaterial({ color: C.g, side: THREE.DoubleSide }), 0, 0, 0.175); crono.add(arco);
  {
    const N2 = 120, q0 = 0.34, q1 = 0.45, p2 = [], i2 = [];
    for (let i = 0; i <= N2; i++) { const a = (i / N2) * Math.PI * 2; p2.push(Math.sin(a) * q0, Math.cos(a) * q0, 0, Math.sin(a) * q1, Math.cos(a) * q1, 0); }
    for (let i = 0; i < N2; i++) { const a = i * 2; i2.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    anillo60Geo = new THREE.BufferGeometry(); anillo60Geo.setAttribute("position", new THREE.Float32BufferAttribute(p2, 3)); anillo60Geo.setIndex(i2);
    crono.add(mesh(anillo60Geo, new THREE.MeshBasicMaterial({ color: C.cr, side: THREE.DoubleSide }), 0, 0, 0.175));
  }
  aguja.position.z = 0.2; crono.add(aguja);
  aguja.add(mesh(rbox(0.07, 0.8, 0.03, 0.02), M.g, 0, 0.32, 0));
  aguja.add(mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 24).rotateX(Math.PI / 2), M.g, 0, 0, 0.01));
  crono.add(mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.22, 20), M.cr2, 0, 1.1, 0));
  crono.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.12, 24), M.navy3, 0, 1.25, 0));
  [-1, 1].forEach((s) => { const o = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 16), M.cr2, s * Math.sin(Math.PI / 4) * 1.06, Math.cos(Math.PI / 4) * 1.06, 0); o.rotation.z = -s * Math.PI / 4; crono.add(o); });
}

// ================= LA CURVA DEL RECUERDO (la experiencia de izquierda a derecha) =================
const CURVA_C = V(0.05, 2.9, 0.9);
const curvaPts = [[-1.85, -0.75], [-1.35, -0.55], [-0.85, 0.15], [-0.45, 0.62], [-0.05, 0.4], [0.45, 0.32], [0.9, 0.15], [1.35, -0.25], [1.85, -0.45]].map(([x, y]) => V(x * 0.72, y, 0).add(CURVA_C));
const curva = new THREE.CatmullRomCurve3(curvaPts, false, "centripetal");
const curvaGeo = new THREE.TubeGeometry(curva, 160, 0.075, 14, false);
const curvaMat = mat(C.cr, 0.5, { emissive: C.cr, emissiveIntensity: 0.1, transparent: true });
const curvaMesh = mesh(curvaGeo, curvaMat); scene.add(curvaMesh);
// el tramo del medio se olvida: un tubo encima, translúcido (se superpone cuando "se olvida")
const curvaMedio = new THREE.CatmullRomCurve3(curvaPts.slice(3, 8), false, "centripetal");
const medioMat = new THREE.MeshStandardMaterial({ color: 0x3a4560, roughness: 0.6, transparent: true, opacity: 0 });
const medioMesh = mesh(new THREE.TubeGeometry(curvaMedio, 80, 0.085, 14, false), medioMat); scene.add(medioMesh);
// la curva entera, tenue, desde el primer cuadro de s07 (la gota la repasa): nunca hay pantalla vacía
const guiaMat = new THREE.MeshStandardMaterial({ color: C.cr, roughness: 0.6, transparent: true, opacity: 0, depthWrite: false });
const guiaMesh = mesh(new THREE.TubeGeometry(curva, 160, 0.075, 14, false), guiaMat); guiaMesh.renderOrder = -0.5; scene.add(guiaMesh);
const ejeMesh = mesh(rbox(2.85, 0.03, 0.03, 0.01), M.edge, CURVA_C.x, CURVA_C.y - 0.95, CURVA_C.z); scene.add(ejeMesh);
const PICO = curva.getPoint(0.43), FIN = curvaPts[8].clone();
// los dos pines: cabeza esférica + aguja
const pin = (m) => { const g = new THREE.Group(); g.add(mesh(new THREE.SphereGeometry(0.17, 24, 16), m, 0, 0.42, 0)); g.add(mesh(new THREE.CylinderGeometry(0.022, 0.006, 0.36, 10), M.gris, 0, 0.18, 0)); return g; };
const pinRojo = pin(mat(C.red, 0.45, { emissive: C.red, emissiveIntensity: 0.15 })); scene.add(pinRojo);
const pinVerde = pin(M.g); scene.add(pinVerde);
// la gota que dibuja la curva
const gotaGuia = mesh(gotaGeo, gotaMat); scene.add(gotaGuia);

// ================= EL PAQUETE Y EL TICKET =================
const paquete = new THREE.Group(); scene.add(paquete);
const solapas = [];
{
  const PW = 1.25, PH = 0.85, PD = 0.9;
  paquete.add(mesh(rbox(PW, PH, PD, 0.035), M.kraft, 0, PH / 2, 0));
  // solapas (bisagra en los bordes largos de arriba)
  [-1, 1].forEach((s) => { const piv = new THREE.Group(); piv.position.set(0, PH, s * PD / 2); const f = mesh(rbox(PW - 0.01, 0.025, PD / 2, 0.01), M.kraft2, 0, 0, -s * PD / 4); piv.add(f); paquete.add(piv); solapas.push({ piv, s }); });
  // cinta navy: arriba y bajando por el frente
  const cintaTop = mesh(rbox(0.2, 0.012, PD + 0.02, 0.005), M.navy3, 0, PH + 0.02, 0); paquete.add(cintaTop); paquete.userData.cinta = cintaTop;
  paquete.add(mesh(rbox(0.2, 0.42, 0.012, 0.005), M.navy3, 0, PH - 0.21, PD / 2 + 0.004));
  // etiqueta crema con renglones navy
  paquete.add(mesh(rbox(0.42, 0.3, 0.012, 0.01), M.cr, 0.36, 0.36, PD / 2 + 0.006));
  [0.42, 0.36, 0.3].forEach((y, i) => paquete.add(mesh(rbox([0.3, 0.24, 0.18][i], 0.03, 0.01, 0.005), M.navy, 0.33 - (i ? 0.03 : 0), y, PD / 2 + 0.014)));
}
const paqueteSombra = sombra(2, 1.6);
const ticketMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, emissive: 0xffffff, emissiveIntensity: 0.15, side: THREE.DoubleSide });
const ticket = mesh(new THREE.PlaneGeometry(0.62, 0.95), ticketMat); scene.add(ticket);

// ================= EL CELULAR (chat genérico, sin logos ni colores de ninguna app) =================
const PHW = 1.18, PHH = 2.36;
const pantallaMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.85 });
const cel = new THREE.Group(); scene.add(cel);
{
  cel.add(mesh(rbox(PHW, PHH, 0.12, 0.16, 4), M.navy2));
  cel.add(mesh(rbox(PHW + 0.04, PHH + 0.04, 0.08, 0.17, 4), M.edge, 0, 0, -0.01));
  cel.add(mesh(new THREE.PlaneGeometry(PHW - 0.1, PHH - 0.12), pantallaMat, 0, 0, 0.062));
  cel.add(mesh(rbox(0.3, 0.05, 0.02, 0.02), M.navy, 0, PHH / 2 - 0.12, 0.07));
  cel.add(mesh(rbox(0.03, 0.3, 0.06, 0.01), M.edge, PHW / 2 + 0.02, 0.45, 0));
}
const pantallas = {};
// el calendario (hoja que se da vuelta: el día cambia)
const calendario = new THREE.Group(); scene.add(calendario);
const hojaPiv = new THREE.Group();
const hojaMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, emissive: 0xffffff, emissiveIntensity: 0.2, side: THREE.FrontSide });
const hojaDorsoMat = new THREE.MeshStandardMaterial({ color: 0xefeee5, roughness: 0.7, emissive: 0xefeee5, emissiveIntensity: 0.35, side: THREE.FrontSide });
const hojaAtrasMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, emissive: 0xffffff, emissiveIntensity: 0.2 });
{
  calendario.add(mesh(rbox(0.82, 0.92, 0.16, 0.05), M.cr2, 0, -0.04, -0.05));
  calendario.add(mesh(rbox(0.86, 0.24, 0.2, 0.06), M.navy3, 0, 0.36, -0.03));
  [-0.22, 0.22].forEach((x) => calendario.add(mesh(new THREE.TorusGeometry(0.06, 0.02, 8, 20), M.gris, x, 0.48, 0.02)));
  calendario.add(mesh(new THREE.PlaneGeometry(0.74, 0.62), hojaAtrasMat, 0, -0.14, 0.035));
  hojaPiv.position.set(0, 0.17, 0.045); calendario.add(hojaPiv);
  const h = mesh(new THREE.PlaneGeometry(0.74, 0.62), hojaMat, 0, -0.31, 0); hojaPiv.add(h);
  const dorso = mesh(new THREE.PlaneGeometry(0.74, 0.62), hojaDorsoMat, 0, -0.31, -0.002); dorso.rotation.y = Math.PI; hojaPiv.add(dorso);
}
// un segundo termómetro (el callback): el borde del celular sube un grado
const termo2 = hacerTermo(); scene.add(termo2.g);
const num15b = new THREE.Mesh(textoGeo("15°", 0.42, 0.13), numMat(M.numG)); scene.add(num15b);
const num14b = new THREE.Mesh(textoGeo("14°", 0.42, 0.13), numMat(M.numCr)); scene.add(num14b);

// ================= EL FRENTE DEL LOCAL (genérico, sin nombre) =================
const local = new THREE.Group(); scene.add(local);
const vidrieraMat = new THREE.MeshStandardMaterial({ color: 0xe9eef0, emissive: 0xfff1d6, emissiveIntensity: 0.55, roughness: 0.3 });
{
  local.add(mesh(rbox(1.9, 2.0, 0.5, 0.05), M.cr2, 0, 1.0, 0));
  local.add(mesh(rbox(0.95, 1.05, 0.06, 0.03), vidrieraMat, -0.38, 0.95, 0.26));
  local.add(mesh(rbox(1.0, 0.07, 0.08, 0.02), M.navy3, -0.38, 0.42, 0.28));
  local.add(mesh(rbox(0.5, 1.3, 0.06, 0.03), M.navy3, 0.58, 0.65, 0.26));
  local.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), M.cr, 0.42, 0.7, 0.3));
  // estantes en la vidriera
  [0.7, 1.05].forEach((y) => { local.add(mesh(rbox(0.85, 0.03, 0.05, 0.01), M.navy3, -0.38, y, 0.3)); [-0.68, -0.52, -0.36, -0.2, -0.06].forEach((x, i) => local.add(mesh(rbox(0.11, 0.16 + (i % 2) * 0.05, 0.06, 0.02), [M.g, M.navy3, M.cr, M.gd, M.navy2][i], x, y + 0.1, 0.31))); });
  // toldo navy con borde verde
  const toldo = new THREE.Group(); toldo.position.set(0, 1.72, 0.27); toldo.rotation.x = 0.45; local.add(toldo);
  toldo.add(mesh(rbox(2.05, 0.06, 0.62, 0.02), M.navy3, 0, 0, 0.3));
  toldo.add(mesh(rbox(2.07, 0.12, 0.05, 0.02), M.g, 0, -0.04, 0.61));
  local.add(mesh(rbox(2.0, 0.2, 0.55, 0.04), M.navy2, 0, 2.05, 0.0));
  local.add(mesh(rbox(1.2, 0.08, 0.02, 0.02), M.g, 0, 2.05, 0.28));
}
const localSombra = sombra(3, 1.6);
const vereda = mesh(rbox(3.6, 0.16, 1.9, 0.04), M.navy2, 0, -0.08, 0.4); local.add(vereda);

// ================= TEXTURAS =================
async function dibujar() {
  await document.fonts.load('800 60px "Lexend"');
  await document.fonts.load('600 60px "Lexend"');
  // ticket: "PAGADO" bien grande
  ticketMat.map = tex(372, 570, (x) => {
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, 372, 570);
    x.fillStyle = "#0b1220"; x.font = F(800, 44); x.textAlign = "center"; x.fillText("TICKET", 186, 70);
    x.fillStyle = "#16243d"; [130, 180, 230, 280].forEach((y, i) => { rr(x, 40, y, [200, 160, 220, 140][i], 20, 10); rr(x, 280, y, 52, 20, 10); });
    x.fillStyle = "#5ce611"; rr(x, 30, 360, 312, 150, 26);
    x.fillStyle = "#0b1220"; x.font = F(800, 58); x.fillText("PAGADO", 186, 455);
    // dientes del papel
    x.fillStyle = "rgba(0,0,0,0)";
  });
  ticketMat.emissiveMap = ticketMat.map; ticketMat.needsUpdate = true;
  // hojas del calendario
  const dia = (d) => tex(296, 248, (x) => { x.fillStyle = "#ffffff"; x.fillRect(0, 0, 296, 248); x.fillStyle = "#0b1220"; x.font = F(800, 120); x.textAlign = "center"; x.fillText(d, 148, 170); });
  hojaMat.map = dia("LUN"); hojaMat.emissiveMap = hojaMat.map; hojaMat.needsUpdate = true;
  hojaAtrasMat.map = dia("MAR"); hojaAtrasMat.emissiveMap = hojaAtrasMat.map; hojaAtrasMat.needsUpdate = true;
  // pantallas del celular (640 x 1310)
  const PW = 640, PH = 1310;
  const cab = (x) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, PW, 190);
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(92, 112, 46, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#16243d"; x.font = F(800, 50); x.textAlign = "center"; x.fillText("A", 92, 130);
    x.textAlign = "left"; x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Ana", 162, 136);
  };
  // (ronda 2) los globos del comercio, todos del mismo ancho y contra el borde derecho; los de Ana, blancos con
  // borde (se leen sobre el fondo crema); el chip de fecha con letra grande
  const globo = (x, y, txt, lado, color, tcolor, ticks) => {
    x.font = F(600, 58);
    const max = lado === "der" ? 440 : 470;
    const lineas = []; let l = "";
    for (const p of txt.split(" ")) { const p2 = l ? l + " " + p : p; if (x.measureText(p2).width > max) { lineas.push(l); l = p; } else l = p2; }
    lineas.push(l);
    const w = lado === "der" ? 548 : Math.max(...lineas.map((s) => x.measureText(s).width)) + 64, h = lineas.length * 72 + 46;
    const X = lado === "der" ? PW - 32 - w : 32;
    x.fillStyle = color; rr(x, X, y, w, h, 34);
    if (lado !== "der") { x.strokeStyle = "#b9b7aa"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, y, w, h, 34); x.stroke(); }
    x.fillStyle = tcolor; x.textAlign = "left"; lineas.forEach((s, i) => x.fillText(s, X + 32, y + 78 + i * 72));
    if (ticks) { x.strokeStyle = tcolor; x.lineWidth = 7; x.lineCap = "round"; x.lineJoin = "round"; [0, 20].forEach((dx) => { x.beginPath(); x.moveTo(X + w - 78 + dx, y + h - 34); x.lineTo(X + w - 66 + dx, y + h - 22); x.lineTo(X + w - 44 + dx, y + h - 48); x.stroke(); }); }
    return y + h;
  };
  const chip = (x, y, txt) => {
    x.font = F(700, 56); const w = x.measureText(txt).width + 64;
    x.fillStyle = "#cfcdc0"; rr(x, (PW - w) / 2, y, w, 84, 42);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.fillText(txt, PW / 2, y + 62); x.textAlign = "left";
    return y + 84;
  };
  const base = (x) => { x.fillStyle = "#e9e7db"; x.fillRect(0, 0, PW, PH); cab(x); };
  const GRIS = "#d6d4c7";
  // "se callan": el comercio cobró, dijo gracias y después nada
  pantallas.callado = tex(PW, PH, (x) => {
    base(x);
    globo(x, 250, "Gracias por tu compra", "der", GRIS, "#0b1220", true);
    x.fillStyle = "rgba(60,64,72,0.24)"; x.fillRect(0, 190, PW, PH - 190);
    x.strokeStyle = "#c7655b"; x.lineWidth = 16; x.strokeRect(8, 8, PW - 16, PH - 16);
  });
  pantallas.camino = tex(PW, PH, (x) => {
    base(x);
    const y = globo(x, 250, "Gracias por tu compra", "der", GRIS, "#0b1220", true);
    globo(x, y + 30, "Ana, tu pedido va en camino", "der", "#5ce611", "#0b1220", true);
  });
  const hastaLlego = (x) => {
    base(x);
    let y = globo(x, 250, "Gracias por tu compra", "der", GRIS, "#0b1220", true);
    y = globo(x, y + 30, "Ana, tu pedido va en camino", "der", "#5ce611", "#0b1220", true);
    y = chip(x, y + 30, "Al otro día");
    return globo(x, y + 30, "¿Llegó bien, Ana?", "der", "#5ce611", "#0b1220", true);
  };
  pantallas.llego = tex(PW, PH, (x) => { hastaLlego(x); });
  pantallas.respuesta = tex(PW, PH, (x) => { const y = hastaLlego(x); globo(x, y + 30, "¡Perfecto, gracias!", "izq", "#ffffff", "#0b1220"); });
  pantallaMat.map = pantallas.callado; pantallaMat.emissiveMap = pantallas.callado; pantallaMat.needsUpdate = true;
}

// ================= ESTACIONES =================
// QX: donde viven el "?", el termómetro gigante y el cronómetro (delante del laboratorio, que se guarda abajo)
const QX = V(0.35, 0, 2.6);
const TERMO_LAB = V(0.55, 0.06, 0.25); // el termómetro dentro de la larga
const PH_POS = V(FIN.x - 0.6, FIN.y + 0.45, FIN.z + 2.2); // el celular, delante del paquete
// el paquete nace debajo y a la izquierda del final de la curva (no la cruza mientras se funde)
const PAQ = FIN.clone().add(V(-0.8, -0.95, 0.8));
const LOCAL_P = PH_POS.clone().add(V(0.12, -2.15, -2.6)); // el local del cierre
// (ronda 3) en el cierre el celular y el termómetro quedan A LOS COSTADOS del local, más chicos: el frente se ve entero
const CEL_CIERRE = LOCAL_P.clone().add(V(-1.4, 0.95, 0.55));
const TERMO_CIERRE = LOCAL_P.clone().add(V(1.24, 0.12, 0.55));

// el laboratorio sube y baja entero (nunca se achica en el aire): 0 = en su lugar, -4,5 = guardado abajo
// (ronda 2) baja en "¿Por qué?" cuando las manos ya salieron, sube en "final" con la mano adentro y baja
// otra vez en "Recordamos…" llevándose la mano y el termómetro mientras nace la curva
function labY(t) {
  if (t < S["s05-quince"] - 0.45) return -4.5 * eio(sg(t, S["s03-por-que"] - 0.32, S["s03-por-que"] - 0.05));
  return -4.5 * (1 - eo(sg(t, S["s05-quince"] - 0.42, S["s05-quince"] + 0.02))) - 4.5 * eio(sg(t, S["s07-pico-final"] - 0.12, S["s07-pico-final"] + 0.3));
}

// ================= LA MANO EN EL TIEMPO =================
// muñeca de la derecha sumergida en la larga; sale en "dos" y entra la izquierda en la corta.
const MUN_B = V(-0.22, NIVEL - 0.02, -0.12);
const MUN_A = POS_A.clone().add(V(-0.12, NIVEL - 0.02, -0.12));
function poseMano(t) {
  const d = { pos: MUN_B.clone(), rx: BRAZO_INC.rx, ry: 0, rz: BRAZO_INC.rz, vis: 1 };
  const i = { pos: MUN_A.clone(), rx: BRAZO_INC.rx, ry: 0, rz: -BRAZO_INC.rz, vis: 0 };
  // gancho: la derecha ya está metida hasta la muñeca y termina de bajar
  d.pos.y += 0.12 * (1 - eo(sg(t, 0, 0.5)));
  // "dos veces": sale y vuelve a entrar
  const sale = Math.sin(Math.PI * sg(t, W[6] - 0.05, W[7] + 0.35));
  d.pos.y += 1.0 * sale; d.rx += 0.08 * sale;
  // la izquierda entra en la corta en "veces"
  const ti = W[7] + 0.05;
  i.vis = t >= ti - 0.3 ? 1 : 0;
  i.pos.y += 1.1 * (1 - eo(sg(t, ti - 0.3, ti + 0.35)));
  // después de "la larga": las dos manos salen hacia arriba y atrás, rápido y antes de que bajen las chapas
  const g0 = sg(t, W[14] + 0.48, W[14] + 0.8), guarda = g0 * g0;
  if (t < S["s05-quince"] - 0.45) {
    // (ronda 4) salen a los costados, por debajo de los subtítulos: la izquierda a la izquierda, la derecha a la derecha
    d.pos.x += 4.6 * guarda; i.pos.x -= 4.6 * guarda; d.pos.y += 0.9 * guarda; i.pos.y += 0.9 * guarda; d.pos.z -= 1.0 * guarda; i.pos.z -= 1.0 * guarda;
    if (g0 >= 1) { d.vis = 0; i.vis = 0; }
    return { d, i };
  }
  i.vis = 0;
  // "final": la derecha ya está adentro de la larga y sube con el laboratorio (y baja con él en "Recordamos")
  const ly = labY(t);
  d.pos.y += ly;
  if (ly < -4.45) d.vis = 0;
  // "Más rato…": sale del agua despacio y los dedos se relajan
  const subeT = eio(sg(t, S["s06-un-grado"] + 0.1, W[41] - 0.1));
  d.pos.y += 1.15 * subeT; d.rx = lerp(d.rx, BRAZO_INC.rx * 0.7, subeT);
  // antes de "Recordamos…": sale por el costado izquierdo con su brazo (no cruza los subtítulos)
  const e0 = sg(t, S["s07-pico-final"] - 0.62, S["s07-pico-final"] - 0.32), ex = e0 * e0;
  d.pos.x -= 3.4 * ex; d.pos.y += 2.6 * ex;
  if (e0 >= 1) d.vis = 0;
  return { d, i };
}
function ponerMano(H, p, espejo) {
  ocultar(H.raiz, p.vis);
  if (!H.raiz.visible) return;
  H.raiz.position.copy(p.pos);
  H.raiz.rotation.set(p.rx, p.ry ?? 0, p.rz);
  if (espejo) H.raiz.scale.x *= -1;
}

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ]; cúbica monótona continua entre claves.
const CAM = [
  [0, 22, 15, 8.6, 0.12, 1.4, 0.05],
  [W[6], 10, 16, 12.6, -1.1, 1.5, -0.4],
  [S["s02-mayoria"] - 0.1, 6, 19, 13.0, -0.95, 1.05, -0.4],
  [S["s02-mayoria"] + 0.7, 4, 21, 14.0, -0.98, 1.0, -0.45],
  [S["s03-por-que"] - 0.25, 2, 21, 13.9, -0.98, 1.05, -0.45],
  [S["s03-por-que"] + 0.22, 0, 6, 8.8, QX.x - 0.15, 1.85, QX.z],
  [W[17] + 0.1, 2, 5, 8.8, QX.x - 0.05, 1.95, QX.z],
  [W[20], 4, 5, 8.9, QX.x, 2.0, QX.z],
  [S["s04-minuto-y-medio"] - 0.1, 4, 5, 8.9, QX.x, 2.0, QX.z],
  [S["s04-minuto-y-medio"] + 0.3, 2, 4, 8.4, QX.x, 1.95, QX.z],
  [S["s05-quince"] - 0.38, 0, 4, 8.0, QX.x, 1.9, QX.z],
  [S["s05-quince"] - 0.18, 10, 7, 8.2, 0.24, 1.05, 0.25],
  [S["s05-quince"] + 0.1, 12, 7, 8.2, 0.26, 1.05, 0.25],
  [W[34] + 0.2, 13, 6, 8.3, 0.26, 1.1, 0.28],
  [S["s06-un-grado"] + 0.2, 11, 8, 8.4, 0.24, 1.35, 0.15],
  [W[41], 8, 10, 8.4, 0.22, 1.5, 0.1],
  [S["s07-pico-final"] - 0.15, 3, 7, 9.7, CURVA_C.x + 0.02, CURVA_C.y - 0.05, CURVA_C.z],
  [S["s07-pico-final"] + 0.35, 0, 7, 9.7, CURVA_C.x + 0.02, CURVA_C.y - 0.05, CURVA_C.z],
  [W[45] + 0.3, -2, 7, 9.7, CURVA_C.x - 0.02, CURVA_C.y - 0.05, CURVA_C.z],
  [W[48] + 0.3, 2, 7, 9.7, CURVA_C.x + 0.05, CURVA_C.y - 0.05, CURVA_C.z],
  [S["s08-cobrar"] - 0.3, 2, 7, 9.7, CURVA_C.x + 0.05, CURVA_C.y - 0.05, CURVA_C.z],
  [S["s08-cobrar"] + 0.3, 10, 8, 7.6, PAQ.x - 0.22, PAQ.y + 0.4, PAQ.z],
  [W[56], 12, 8, 7.5, PAQ.x - 0.32, PAQ.y + 0.4, PAQ.z],
  [S["s09-callan"] - 0.05, 12, 8, 6.6, FIN.x - 0.65, FIN.y, FIN.z + 0.2],
  [S["s09-callan"] + 0.3, 2, 4, 6.1, PH_POS.x, PH_POS.y + 0.36, PH_POS.z],
  [S["s10-sale-solo"] - 0.05, -2, 3, 6.1, PH_POS.x, PH_POS.y + 0.36, PH_POS.z],
  [S["s10-sale-solo"] + 1.0, -8, 4, 6.1, PH_POS.x, PH_POS.y + 0.36, PH_POS.z],
  [S["s11-llego-bien"], 4, 4, 5.95, PH_POS.x, PH_POS.y + 0.37, PH_POS.z],
  [S["s11b-grado-mejor"] - 0.05, 6, 4, 6.4, PH_POS.x + 0.02, PH_POS.y + 0.34, PH_POS.z],
  [S["s11b-grado-mejor"] + 0.45, 4, 4, 8.3, PH_POS.x + 0.1, PH_POS.y + 0.05, PH_POS.z],
  [S["s12-tu-local"] - 0.3, 2, 4, 8.4, PH_POS.x + 0.1, PH_POS.y + 0.05, PH_POS.z],
  [S["s12-tu-local"] + 0.55, -2, 9, 11.5, LOCAL_P.x - 0.1, LOCAL_P.y + 1.0, LOCAL_P.z + 0.3],
  [S["s13-llamada"] - 0.05, -2.5, 9, 11.4, LOCAL_P.x - 0.1, LOCAL_P.y + 1.0, LOCAL_P.z + 0.3],
  [DUR, -3, 9, 11.3, LOCAL_P.x - 0.1, LOCAL_P.y + 1.0, LOCAL_P.z + 0.3],
];
const _mira = new THREE.Vector3();
const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6]];
function ponerCamara(t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = val(a), p2 = val(b), h = b[0] - a[0];
  const prev = i > 0 ? CAM[i - 1] : null;
  const next = i + 2 < CAM.length ? CAM[i + 2] : null;
  const p0 = prev ? val(prev) : null, p3 = next ? val(next) : null;
  // cúbica monótona (Fritsch-Carlson): continua y suave, sin pasarse de largo entre claves
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
  const k = Math.min(1, 10 / d) * 0.5;
  camera.position.x += Math.sin(t * 0.7) * 0.03 * k; camera.position.y += Math.sin(t * 0.53) * 0.02 * k;
  camera.near = Math.max(0.05, d * 0.01); camera.far = Math.max(200, d * 8);
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  return { d, az, el };
}
// pone un objeto "de cara" a la cámara (solo giro en y)
const deCara = (o, az, extra = 0) => { o.rotation.set(0, az * D2R + extra, 0); };
// cambio de número sin encimarse: el viejo se va del todo y recién ahí entra el nuevo
const cambio = (u) => ({ viejo: 1 - eio(sg(u, 0, 0.45)), nuevo: bk(sg(u, 0.5, 1)) });

// pose del celular (pura del tiempo)
function celPose(t, az) {
  const t0 = S["s09-callan"] + 0.02;
  const gira = eio(sg(t, S["s10-sale-solo"] - 0.1, S["s10-sale-solo"] + 0.55));
  const corre = eo(sg(t, S["s11b-grado-mejor"] - 0.1, S["s11b-grado-mejor"] + 0.35)); // le hace lugar al termómetro
  const aparte = eio(sg(t, S["s12-tu-local"] - 0.3, S["s12-tu-local"] + 0.2)); // se corre a la izquierda: entra el local
  const pos = lerpV(PH_POS.clone().add(V(-0.38 * corre, -(1 - eo(sg(t, t0, t0 + 0.4))) * 0.5 + Math.sin(t * 1.1) * 0.02, 0)), CEL_CIERRE, aparte);
  if (en(t, S["s10-sale-solo"] + 0.25, S["s10-sale-solo"] + 0.6) || en(t, W[73] - 0.1, W[73] + 0.2)) pos.x += Math.sin(t * 90) * 0.012;
  const ry = lerp(az * D2R * 0.3 + Math.sin(Math.PI * gira) * 0.45 - 0.12 + Math.sin(t * 0.9) * 0.03, az * D2R + 0.12, aparte);
  return { pos, ry, k: lerp(1, 0.6, aparte) };
}

// ================= ESCENA EN EL TIEMPO =================
function renderAt(t) {
  semilla = 77;
  scene.environmentRotation.y = t * 0.08;
  const cam = ponerCamara(t);
  const LY = labY(t);
  const labOn = LY > -4.45;
  // la corta: solo en el gancho y en "la mayoría" (entra en "dos")
  const sA = t < S["s03-por-que"] + 0.4 ? bk(sg(t, W[6] - 0.1, W[6] + 0.3)) : 0;

  // ---- el laboratorio ----
  {
    mesa.visible = labOn; mesa.position.y = LY;
    ocultar(cubB.g, labOn ? 1 : 0); cubB.g.position.set(POS_B.x, POS_B.y + LY, POS_B.z);
    ocultar(cubA.g, labOn ? sA : 0); cubA.g.position.set(POS_A.x, POS_A.y + LY, POS_A.z);
    apoyar(sombraB, POS_B.x, LY, POS_B.z, labOn ? 1 : 0, 0.6);
    apoyar(sombraA, POS_A.x, LY, POS_A.z, labOn ? sA : 0, 0.6);
    // "larga": la corta se apaga a gris y la larga hace pop
    const gris = sg(t, W[14], W[14] + 0.3);
    cubA.bordeMat.color.set(0xf4f6f7).lerp(new THREE.Color(C.gris), gris); cubA.bordeMat.emissiveIntensity = lerp(0.08, 0, gris);
    if (cubB.g.visible) cubB.g.scale.multiplyScalar(1 + 0.05 * Math.sin(Math.PI * sg(t, W[14], W[14] + 0.35)));
  }
  // ---- superficie del agua: ondas leves + anillo alrededor de la muñeca ----
  const P = poseMano(t);
  for (const [cub, mun, act] of [[cubB, P.d.pos, P.d.pos.y < NIVEL + 0.3 && P.d.vis > 0.5], [cubA, P.i.pos, P.i.vis > 0.5 && P.i.pos.y < NIVEL + 0.3]]) {
    if (!cub.g.visible) continue;
    const pos = cub.sup.geometry.attributes.position;
    const ox = cub.g.position.x, oz = cub.g.position.z;
    for (let k = 0; k < pos.count; k++) {
      const x = cub.base[k * 3], z = cub.base[k * 3 + 2];
      let y = Math.sin(x * 4.0 + t * 2.2) * 0.008 + Math.sin(z * 5.0 - t * 1.7) * 0.006;
      if (act) { const r = Math.hypot(x + ox - mun.x, z + oz - mun.z); y += Math.sin(r * 18 - t * 7) * 0.012 * Math.exp(-r * 2.2); }
      pos.setY(k, y);
    }
    pos.needsUpdate = true; cub.sup.geometry.computeVertexNormals();
  }

  // ---- las manos (solo en el laboratorio) ----
  ponerMano(manoD, P.d, false);
  ponerMano(manoI, P.i, true);

  // ---- salpicaduras y gotas ----
  {
    const eventos = [[W[7] + 0.3, MUN_B], [W[7] + 0.33, MUN_A]];
    let gi = 0;
    for (const [te, pos] of eventos) {
      for (let k = 0; k < 13; k++, gi++) {
        const gt = gotas[gi]; const u = t - te;
        const vis = u > 0 && u < 0.6 && LY > -0.01;
        gt.m.visible = vis; if (!vis) continue;
        const x = pos.x + Math.cos(gt.a) * gt.v * u * 0.9, z = pos.z + Math.sin(gt.a) * gt.v * u * 0.6;
        const y = NIVEL + gt.up * u - 4.9 * u * u;
        gt.m.visible = y > NIVEL - 0.02; gt.m.position.set(x, y, z); gt.m.scale.setScalar(gt.r);
      }
    }
    let ai = 0;
    anillos.forEach((a) => (a.visible = false));
    const anillo = (x, z, u, r0 = 0.05) => { if (ai >= anillos.length || u < 0 || u > 0.7) return; const a = anillos[ai++]; a.visible = LY > -0.01; a.position.set(x, NIVEL + 0.012 + LY, z); const r = r0 + u * 0.45; a.scale.set(r, 1, r); a.material.opacity = 0.55 * (1 - u / 0.7); };
    anillo(MUN_B.x, MUN_B.z, t - (W[7] + 0.3), 0.12);
    anillo(MUN_A.x, MUN_A.z, t - (W[7] + 0.33), 0.12);
    anillo(MUN_B.x, MUN_B.z, t - (S["s06-un-grado"] + 0.25), 0.12);
    const dedosX = [-0.16, -0.05, 0.06, 0.17];
    for (let k = 0; k < 5; k++) {
      const t0 = S["s06-un-grado"] + 0.55 + k * 0.42;
      const Pk = poseMano(t0).d;
      const tip = V(dedosX[k % 4], -1.0, 0.0).applyEuler(new THREE.Euler(Pk.rx, 0, Pk.rz)).add(Pk.pos);
      const u = t - t0;
      const g = gotas[gi++];
      const y = tip.y - 4.9 * u * u;
      g.m.visible = u > 0 && y > NIVEL && LY > -0.01 && t < S["s07-pico-final"];
      if (g.m.visible) { g.m.position.set(tip.x, y, tip.z); g.m.scale.set(0.035, 0.05, 0.035); }
      const tc = Math.sqrt(Math.max(0, tip.y - NIVEL) / 4.9);
      anillo(tip.x, tip.z, u - tc, 0.03);
    }
  }

  // ---- el termómetro: en la larga (s01-s02, s05-s07) o gigante (s03), nacido del "?" ----
  {
    const ti = W[17] - 0.08; // el "?" gira de canto y del otro lado aparece el termómetro: nace el termómetro (primero el bulbo, después el tubo)
    let s = 0, crece = 1, pos = TERMO_LAB.clone().add(V(0, LY, 0)), temp = 14, verde = 0, gigante = false;
    let n14 = 0, n15 = 0, o14 = 1, o15 = 1, flipX = 1;
    if (t < S["s03-por-que"] + 0.4) { s = labOn ? 1 : 0; }
    else if (t < S["s05-quince"] - 0.45) {
      gigante = true;
      const baja = sg(t, S["s04-minuto-y-medio"] - 0.34, S["s04-minuto-y-medio"] - 0.22);
      s = t >= ti && baja < 1 ? 1.5 : 0; // baja y sale por abajo, detrás del cronómetro, que ya entró grande
      flipX = Math.max(0.02, eio(sg(t, ti, ti + 0.17)));
      pos = V(QX.x - 0.5, 0.2 - 6 * baja * baja, QX.z);
      temp = lerp(12, 14, eo(sg(t, ti + 0.4, W[20] + 0.2)));
      n14 = s > 0.02 ? bk(sg(t, W[20] - 0.05, W[20] + 0.3)) : 0;
      o14 = 1 - sg(t, S["s04-minuto-y-medio"] - 0.45, S["s04-minuto-y-medio"] - 0.3);
    } else if (labOn && t < S["s08-cobrar"] + 0.6) {
      s = 1;
      temp = lerp(14, 15, eio(sg(t, W[32] - 0.05, W[34] + 0.15)));
      verde = sg(t, W[34] - 0.2, W[34] + 0.15);
      const ch = cambio(sg(t, W[34] - 0.2, W[34] + 0.3));
      const entra = bk(sg(t, S["s05-quince"] + 0.15, S["s05-quince"] + 0.5));
      n14 = entra; o14 = ch.viejo; n15 = ch.nuevo;
      // en s07 baja con el laboratorio y se funde (no se encoge)
      o15 = 1 - sg(t, S["s07-pico-final"] + 0.0, S["s07-pico-final"] + 0.2);
    }
    ocultar(termo.g, s);
    if (termo.g.visible) { termo.g.scale.y *= Math.max(0.02, crece); termo.g.scale.x *= flipX; termo.g.scale.z *= flipX; }
    termo.g.position.copy(pos); termo.g.rotation.set(0, cam.az * D2R * (gigante ? 1 : 0.6), 0);
    ponerTemp(termo, temp, verde);
    if (termo.g.visible) termo.g.scale.multiplyScalar(1 + 0.04 * Math.sin(Math.PI * sg(t, W[34] - 0.05, W[34] + 0.3)));
    // el número: al costado del tubo (no pisa el tubo, la mano ni los subtítulos)
    const der = V(Math.cos(cam.az * D2R), 0, -Math.sin(cam.az * D2R));
    const tope = gigante ? pos.clone().add(V(0, 1.3 * 1.5, 0)).addScaledVector(der, 1.25) : pos.clone().add(V(0, 1.5, 0)).addScaledVector(der, 0.52);
    const k = gigante ? 1.45 : 0.72;
    ponerNum(num14, n14, o14, k); num14.position.copy(tope); deCara(num14, cam.az, Math.sin(t * 0.8) * 0.05);
    ponerNum(num15, n15, o15, k); num15.position.copy(tope); deCara(num15, cam.az, Math.sin(t * 0.8) * 0.05);
    if (num15.visible) num15.scale.multiplyScalar(1 + 0.1 * Math.sin(Math.PI * sg(t, W[34] + 0.3, W[34] + 0.6)));
    termoSombra.visible = false;
  }

  // ---- chapas "60 s" / "90 s", fichas y el tilde (s02) ----
  {
    const CHA = POS_A.clone().add(V(0.0, 1.6, 0.6)), CHB = V(POS_B.x - 0.05, 1.9, 0.62);
    const fueraY = (o) => o.add(V(0, LY, 0));
    // (ronda 2) se van ANTES de que suban las manos (la mano no las atraviesa)
    const sA2 = vida(t, S["s02-mayoria"] + 0.05, W[14] + 0.33, 0.4, 0.18);
    const sB2 = vida(t, S["s02-mayoria"] + 0.2, W[14] + 0.33, 0.4, 0.18);
    // salen volando a los costados, fuera de cuadro (no se encogen hasta una mota ni cruzan los subtítulos)
    const vuela = sg(t, W[14] + 0.33, W[14] + 0.51), vv = vuela * vuela, up = V(4.5 * vv, 0.6 * vv, 0), upI = V(-4.5 * vv, 0.6 * vv, 0);
    const sal = (x) => (vuela >= 1 ? 0 : t > W[14] + 0.33 ? 0.95 : x * 0.95);
    ocultar(chapa60, sal(sA2)); chapa60.position.copy(fueraY(CHA.clone())).add(upI); deCara(chapa60, cam.az * 0.5);
    ocultar(chapa90, sal(sB2)); chapa90.position.copy(fueraY(CHB.clone())).add(up); deCara(chapa90, cam.az * 0.5);
    const gris = sg(t, W[14], W[14] + 0.3);
    chapa60Mat.color.set(C.cr).lerp(new THREE.Color(C.gris), gris); chapa60Mat.emissiveIntensity = lerp(0.12, 0, gris);
    if (chapa90.visible) chapa90.scale.multiplyScalar(1 + 0.1 * Math.sin(Math.PI * sg(t, W[14], W[14] + 0.35)));
    const st = vida(t, W[14] + 0.05, W[14] + 0.33, 0.35, 0.18);
    ocultar(tick90, vuela >= 1 ? 0 : t > W[14] + 0.33 ? 0.42 : st * 0.42); tick90.position.copy(CHB).add(V(0.0, 0.52 + LY, 0.05)).add(up); deCara(tick90, cam.az * 0.5, Math.sin(t * 2) * 0.15);
    // fichas: caen en "la mayoría"; torre verde delante de la larga, pila crema delante de la corta
    const BD = V(POS_B.x + 0.55, 0, 1.0), BI = POS_A.clone().add(V(-0.5, 0, 0.9));
    fichas.forEach((f) => {
      const { der, k, rot, dx, dz } = f.userData;
      const ti = W[11] - 0.25 + (der ? k * 0.075 : 0.05 + k * 0.18);
      const cae = sg(t, ti, ti + 0.25);
      const base = der ? BD : BI;
      ocultar(f, t < ti || !labOn || t > S["s05-quince"] - 0.45 ? 0 : 1);
      const yf = 0.04 + k * 0.078;
      f.position.set(base.x + dx, LY + yf + (1 - cae * cae) * 0.6 + Math.sin(Math.PI * sg(t, ti + 0.25, ti + 0.37)) * 0.03, base.z + dz);
      f.rotation.set((1 - cae) * 0.8, rot, (1 - cae) * 0.5);
      if (!der) f.rotation.z += cae * 0.35; // la crema queda caída, sola
    });
    const hay = t > W[11] - 0.2 && t < S["s05-quince"] - 0.45 && labOn ? 1 : 0;
    apoyar(fichasSombraD, BD.x, LY, BD.z, hay, 0.7);
    apoyar(fichasSombraI, BI.x, LY, BI.z, N_IZQ ? hay : 0, 0.7);
  }

  // ---- el "?" verde: sube grande en "¿Por qué?" y se encoge en su punto justo antes del termómetro ----
  {
    // nace delante de todo (más cerca de la cámara que las cubetas y la torre), con pop desde mediano
    const pt = S["s03-por-que"] - 0.13; // nace mientras el laboratorio termina de hundirse (sin cuadros vacíos ni cruces)
    const sube = bk(sg(t, pt, pt + 0.22));
    const va = eio(sg(t, W[17] - 0.2, W[17] - 0.06));
    const s = t < pt || t >= W[17] - 0.04 ? 0 : 1.3 * lerp(0.72, 1, sube);
    ocultar(pregunta, s);
    pregunta.position.set(QX.x - 0.4, 1.95, QX.z + 0.6);
    pregunta.rotation.set(0, cam.az * D2R + Math.sin(t * 1.3) * 0.16, 0);
    if (pregunta.visible) { pregunta.scale.multiplyScalar(1 + 0.05 * Math.sin(Math.PI * sg(t, W[16], W[16] + 0.3))); pregunta.scale.x *= Math.max(0.02, 1 - va); pregunta.scale.z *= Math.max(0.02, 1 - va); }
    void PREG_H;
    preguntaSombra.visible = false;
  }

  // ---- el cronómetro: una vuelta (60 s, anillo crema) y media vuelta más (+30 s, arco verde) ----
  {
    // entra grande con pop DELANTE del termómetro (que gira y se va detrás); sale girando de tarjeta en su
    // lugar mientras sube el laboratorio (no cruza la cubeta)
    const t0 = S["s04-minuto-y-medio"] - 0.32;
    const sale = eio(sg(t, S["s05-quince"] - 0.46, S["s05-quince"] - 0.32));
    const s = t < t0 || sale > 0.97 ? 0 : lerp(0.55, 1, bk(sg(t, t0, t0 + 0.3)));
    ocultar(crono, s);
    crono.position.set(QX.x, 1.95, QX.z + 0.5);
    crono.rotation.set(0, cam.az * D2R, 0);
    if (crono.visible) { crono.scale.x *= 1 - sale; crono.scale.z *= Math.max(0.05, 1 - sale); }
    const v1 = eio(sg(t, t0 + 0.15, W[24] + 0.3));
    const v2 = eio(sg(t, W[25] - 0.05, W[26] + 0.35));
    aguja.rotation.z = -Math.PI * 2 * (v1 + 0.5 * v2);
    anillo60Geo.setDrawRange(0, Math.round(120 * v1) * 6);
    arcoGeo.setDrawRange(0, Math.round(60 * v2) * 6);
  }

  // ---- la curva del recuerdo: la dibuja una gota; pin rojo en lo peor, verde en el final ----
  {
    const t0 = S["s07-pico-final"] - 0.35; // la curva nace mientras la cámara sube (nunca media pantalla vacía)
    const dib = eio(sg(t, t0, t0 + 0.95));
    // se retira ANTES de que nazca el paquete (no lo atraviesa)
    const va = eio(sg(t, S["s08-cobrar"] - 0.3, S["s08-cobrar"] - 0.08));
    const on = t >= t0 && t < S["s08-cobrar"] - 0.07;
    curvaMesh.visible = on && dib > 0.01;
    curvaGeo.setDrawRange(0, Math.floor((curvaGeo.index.count * dib) / 6) * 6);
    curvaMat.opacity = 1 - va; // (transparent fijo desde el inicio: cambiarlo en caliente no recompila y no se fundía)
    guiaMesh.visible = on; guiaMat.opacity = 0.28 * sg(t, t0, t0 + 0.12) * (1 - va);
    ejeMesh.visible = on; ejeMesh.scale.set(Math.max(0.001, bk(sg(t, t0, t0 + 0.3)) * (1 - va)), 1, 1);
    ejeMesh.position.x = CURVA_C.x;
    const pg = curva.getPoint(Math.min(0.999, dib));
    gotaGuia.visible = on && dib > 0.01 && dib < 0.995;
    if (gotaGuia.visible) { gotaGuia.position.copy(pg); gotaGuia.scale.setScalar(0.16); }
    const olvido = sg(t, W[46], W[48] + 0.2) * (1 - va);
    medioMesh.visible = on && olvido > 0.01; medioMat.opacity = 0.92 * olvido;
    // pines: se clavan desde muy cerca (no cruzan los subtítulos)
    const clava = (ti) => { const u = sg(t, ti, ti + 0.25); return { y: (1 - u * u) * 0.35, s: t < ti ? 0 : bk(sg(t, ti, ti + 0.25)) }; };
    const r = clava(W[45] - 0.05);
    ocultar(pinRojo, va > 0.4 ? 0 : r.s); pinRojo.position.copy(PICO).add(V(0, 0.04 + r.y, 0));
    const g = clava(W[48] - 0.05);
    ocultar(pinVerde, va > 0.6 ? 0 : g.s); pinVerde.position.copy(FIN).add(V(0, 0.04 + g.y, 0));
  }

  // ---- el paquete: el pin verde del final ES el paquete (entra grande); el ticket "pagado" se le pega ----
  {
    const t0 = S["s08-cobrar"] - 0.2; // nace mientras la curva termina de fundirse, debajo de ella (no la cruza ni deja hueco)
    const s = t < t0 ? 0 : lerp(0.9, 1, bk(sg(t, t0, t0 + 0.3)));
    // "Y ahí": el celular entra delante y el paquete baja y se va por detrás
    const baja = eio(sg(t, S["s09-callan"] + 0.0, S["s09-callan"] + 0.25)); // baja recién cuando entra el celular (sin cuadros vacíos)
    const P0 = PAQ.clone();
    ocultar(paquete, baja > 0.99 ? 0 : s);
    paquete.position.copy(P0).add(V(0, -3.5 * baja, 0));
    paquete.rotation.set(0, cam.az * D2R - 0.35, 0);
    const cierra = eio(sg(t, W[56] - 0.15, W[56] + 0.2));
    solapas.forEach(({ piv, s: sd }) => (piv.rotation.x = sd * lerp(1.9, 0, cierra)));
    paquete.userData.cinta.visible = cierra > 0.95;
    if (paquete.visible) paquete.scale.multiplyScalar(1 + 0.07 * Math.sin(Math.PI * sg(t, W[56] + 0.1, W[56] + 0.4)));
    paqueteSombra.visible = false;
    // el ticket entra desde la izquierda y se pega al frente del paquete
    const tt = W[54] - 0.1;
    const llega = eo(sg(t, tt, tt + 0.4));
    ticket.visible = t >= tt && t < S["s09-callan"] + 0.3;
    if (ticket.visible) {
      const ang = cam.az * D2R - 0.35;
      const frente = V(Math.sin(ang), 0, Math.cos(ang));
      const lado = V(Math.cos(ang), 0, -Math.sin(ang));
      ticket.position.copy(P0).addScaledVector(frente, 0.5).addScaledVector(lado, lerp(-2.2, -0.42, llega)).add(V(0, 0.5 - 3.5 * baja, 0));
      ticket.rotation.set(0, ang, lerp(-0.4, 0.1, llega));
      ticket.scale.setScalar(1);
    }
  }

  // ---- el celular: entra grande delante del paquete en "Y ahí", callado; "Sale solo": llega el mensaje ----
  {
    const t0 = S["s09-callan"] + 0.02;
    const s = t < t0 ? 0 : lerp(0.75, 1, eo(sg(t, t0, t0 + 0.35)));
    ocultar(cel, s);
    const CP = celPose(t, cam.az);
    cel.position.copy(CP.pos);
    cel.rotation.set(0.04, CP.ry, 0);
    let tx = pantallas.callado;
    if (t >= S["s10-sale-solo"] + 0.25) tx = pantallas.camino;
    if (t >= W[73] - 0.1) tx = pantallas.llego;
    if (t >= W[74] + 0.45) tx = pantallas.respuesta;
    pantallaMat.emissiveIntensity = t < S["s10-sale-solo"] + 0.25 ? lerp(0.85, 0.6, sg(t, W[61] - 0.2, W[61] + 0.3)) : 0.85;
    if (tx && pantallaMat.map !== tx) { pantallaMat.map = tx; pantallaMat.emissiveMap = tx; pantallaMat.needsUpdate = true; }
    if (cel.visible) cel.scale.multiplyScalar(CP.k);
    if (cel.visible) cel.scale.multiplyScalar(1 + 0.08 * Math.sin(Math.PI * sg(t, W[64] - 0.05, W[64] + 0.25)) + 0.04 * Math.sin(Math.PI * sg(t, W[73] - 0.1, W[73] + 0.2)));
  }

  // ---- el calendario: "Al otro día" (se va con un encogido suave antes del termómetro) ----
  {
    // (ronda 2) entra GRANDE delante del celular como cartel de tiempo, da vuelta la hoja y sale volando a la
    // derecha antes de que llegue "¿Llegó bien?" (ya no tapa la esquina del celular)
    const ci = S["s11-llego-bien"] - 0.05, co = W[72] + 0.36;
    // (ronda 3) más grande y delante: tapa entera la parte de arriba del celular (no asoma "Ana" entre las argollas)
    const pop = t < ci ? 0 : lerp(0.96, 1, bk(sg(t, ci, ci + 0.2)));
    const sale = eio(sg(t, co, co + 0.26));
    ocultar(calendario, sale > 0.99 ? 0 : pop * 1.28);
    calendario.position.copy(PH_POS).add(V(0.0 + 2.6 * sale, 0.55 + 0.3 * sale, 0.3));
    calendario.rotation.set(0, cam.az * D2R + 0.08, 0.04 - 0.35 * sale);
    // la hoja de LUN gira hacia la cámara (se ve venir) y desaparece de canto; detrás queda MAR
    hojaPiv.rotation.x = -Math.pow(sg(t, W[72] - 0.2, W[72] + 0.2), 1.6) * Math.PI * 0.5;
    hojaPiv.visible = hojaPiv.rotation.x > -Math.PI * 0.49;
  }

  // ---- el termómetro del callback: entra desde la derecha al lado del celular y sube UN grado ----
  {
    const t0 = S["s11b-grado-mejor"] - 0.1;
    const llega = eo(sg(t, t0, t0 + 0.4));
    const sc = t < t0 ? 0 : 0.95;
    ocultar(termo2.g, sc);
    const aparte = eio(sg(t, S["s12-tu-local"] - 0.3, S["s12-tu-local"] + 0.2));
    termo2.g.position.copy(lerpV(PH_POS.clone().add(V(lerp(2.6, 0.72, llega), -1.32, 0.15)), TERMO_CIERRE, aparte));
    if (termo2.g.visible) termo2.g.scale.multiplyScalar(lerp(1, 0.75, aparte));
    termo2.g.rotation.set(0, cam.az * D2R, 0);
    const temp = lerp(14, 15, eio(sg(t, W[76] - 0.05, W[77] + 0.1)));
    ponerTemp(termo2, temp, sg(t, W[77] - 0.15, W[77] + 0.1));
    const tope = termo2.g.position.clone().add(V(-0.2, (TL + 0.38) * sc, 0));
    const ch = cambio(sg(t, W[77] - 0.05, W[77] + 0.35));
    const entra = bk(sg(t, t0 + 0.15, t0 + 0.45));
    ponerNum(num14b, sc > 0 ? entra : 0, ch.viejo, 0.8); num14b.position.copy(tope); deCara(num14b, cam.az);
    // el 15° se funde en "¿Lo vemos en tu local?" (si no, tapa el cartel del local)
    ponerNum(num15b, sc > 0 ? ch.nuevo : 0, 1 - sg(t, S["s12-tu-local"] - 0.32, S["s12-tu-local"] - 0.08), 0.8); num15b.position.copy(tope); deCara(num15b, cam.az);
    if (num15b.visible) num15b.scale.multiplyScalar(1 + 0.1 * Math.sin(Math.PI * sg(t, W[77] + 0.35, W[77] + 0.65)));
  }

  // ---- el local: entra grande detrás del celular en "¿Lo vemos en tu local?" ----
  {
    const s = t < S["s12-tu-local"] - 0.02 ? 0 : lerp(0.7, 1, bk(sg(t, S["s12-tu-local"] - 0.02, S["s12-tu-local"] + 0.35)));
    // S1: la vidriera se prende con el brillo (~31,0 s)
    vidrieraMat.emissiveIntensity = 0.55 + 0.7 * Math.sin(Math.PI * sg(t, S["s12-tu-local"] + 0.5, S["s12-tu-local"] + 0.95));
    ocultar(local, s * 1.0); local.position.copy(LOCAL_P); local.rotation.set(0, cam.az * D2R * 0.5 - 0.12, 0);
    localSombra.visible = false;
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
dibujar().then(() => {
  renderAt(window.__hfThreeTime || 0);
  if (window.__tresListo) window.__tresListo();
});
