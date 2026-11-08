// Capa 3D de por-que-dos-sellos (Three.js r170 local). Base técnica: reels/por-que-el-final (cámara de claves con
// cúbica monótona) y reels/abren-hoy (el almacén de Rubén y los personajes de assets/personajes.js).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Zona A (origen): la tarjeta de sellos, el lavadero de autos, las barras 19 % / 34 %, las dos tarjetas, el "?",
// la barra de progreso y el moño. Zona B (x = 40): el almacén de Rubén con Rubén y Graciela; el celular grande de
// Graciela va pegado a la cámara. Colores de marca; rojo apagado SOLO para la tarjeta vacía / "arrancar de cero".
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800p.js";
import { crearPersonaje, ELENCO, poseEn, mezclar, CARA, BRAZOS, saludo, pegarACamara, crearMate, crearTermo } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
await Promise.all(["600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
// salida sin mota: se achica hasta el 60 % en d segundos y recién ahí desaparece
const salir = (t, a, d = 0.1) => (t >= a + d ? 0 : 1 - 0.4 * sg(t, a, a + d));
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (A, B, u) => V(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E; // inicios de escena
const D2R = Math.PI / 180;
const en = (t, a, b) => t >= a && t < b;
let semilla = 2006;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

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
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 400);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x0c1626);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, Math.PI / 2.4, 0xfff1dc, 2.4);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xbcd6ff, 1.8);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.2);
  tira(3, 3, 0, 1, 7, 0, 0xffffff, 0.9);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.65;

const OB = V(40, 0, 0); // el almacén
const key = new THREE.DirectionalLight(0xffe9d2, 2.5); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0x9cc4ff, 1.8); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0x4a6496, 0x0b1220, 1.0); scene.add(fill);
// el sol del almacén (con sombras): la caja de sombras cubre solo la zona B
const sol = new THREE.DirectionalLight(0xffe6c8, 0.0);
sol.position.copy(OB).add(V(-3.5, 6, 6)); sol.target.position.copy(OB).add(V(0.3, 0.8, -0.8));
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
Object.assign(sol.shadow.camera, { left: -3.2, right: 3.2, top: 3.5, bottom: -2.2, near: 1, far: 18 });
sol.shadow.bias = -0.0008; sol.shadow.radius = 4;
scene.add(sol, sol.target);
const lampara = new THREE.PointLight(0xffd59a, 0, 6, 1.6); lampara.position.copy(OB).add(V(0.2, 2.45, -1.2)); scene.add(lampara);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, madera: 0xb98a5a, mostaza: 0xd9a441 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.18 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.55), navy3: mat(C.navy3, 0.52), edge: mat(C.edge, 0.5), red: mat(C.red, 0.55), white: mat(C.white, 0.45),
  madera: mat(C.madera, 0.6), mostaza: mat(C.mostaza, 0.5),
  numCr: mat(C.cr, 0.5, { emissive: C.cr, emissiveIntensity: 0.38 }),
  numG: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.28 }),
  numR: mat(C.red, 0.5, { emissive: C.red, emissiveIntensity: 0.22 }),
  sello: mat(C.g, 0.5, { emissive: C.g, emissiveIntensity: 0.22 }),
  tilde: mat(C.navy, 0.45),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", sans-serif`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const sombraTex = tex(256, 256, (x) => {
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(4,8,16,0.75)"); gr.addColorStop(0.5, "rgba(4,8,16,0.35)"); gr.addColorStop(1, "rgba(4,8,16,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
});
const sombra = (w, d) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m; };

const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 10, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
};
const numMesh = (s, size, m) => { const o = new THREE.Mesh(textoGeo(s, size, size * 0.3), m.clone()); o.material.transparent = true; scene.add(o); return o; };
// pop = escala de entrada, op = opacidad de salida; debajo del 7 % se esconde (nunca queda una mota)
function ponerNum(o, pop, op, k) {
  o.visible = pop > 0.07 && op > 0.02;
  if (!o.visible) return;
  o.scale.setScalar(k * pop); o.material.opacity = op; o.material.depthWrite = op > 0.99;
}
// tilde 3D (V extruida)
const tickGeo = (() => {
  const sh = new THREE.Shape();
  [[-0.5, 0.06], [-0.16, -0.3], [0.5, 0.36], [0.37, 0.49], [-0.16, -0.05], [-0.37, 0.19]].forEach(([x, y], i) => (i ? sh.lineTo(x, y) : sh.moveTo(x, y)));
  sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 });
  g.translate(0, -0.06, -0.06); return g;
})();

// ================= LA TARJETA DE SELLOS =================
// local: cara impresa hacia +z, centro en el origen. Casilleros de r 0,2 cada 0,56; 2 filas de n/2.
const CIR_R = 0.2, PASO = 0.56, CARD_H = 2.25, CARD_D = 0.05;
const selloGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.04, 36).rotateX(Math.PI / 2);
const aroGeo = new THREE.TorusGeometry(0.215, 0.04, 10, 40);
function hacerSello() {
  const g = new THREE.Group();
  g.add(mesh(selloGeo, M.sello));
  const tk = mesh(tickGeo, M.tilde, 0, 0, 0.03); tk.scale.set(0.26, 0.26, 0.3); g.add(tk);
  return g;
}
function hacerTarjeta(n, { rojo = false, sellados = 0, limpia = false } = {}) {
  const cols = n / 2, W = cols * PASO + 0.5;
  const g = new THREE.Group();
  const TW = 1024, TH = Math.round((1024 * CARD_H) / W), px = TW / W;
  const pos = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < cols; c++) pos.push(V(-W / 2 + 0.25 + (c + 0.5) * PASO, CARD_H / 2 - 0.58 - (r + 0.5) * PASO, 0));
  const t = tex(TW, TH, (x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, TW, TH);
    if (rojo) { x.strokeStyle = "#c7655b"; x.lineWidth = 0.05 * px; x.beginPath(); x.roundRect(0.07 * px, 0.07 * px, TW - 0.14 * px, TH - 0.14 * px, 0.08 * px); x.stroke(); }
    x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "alphabetic";
    if (limpia) { x.fillRect(0.25 * px, 0.2 * px, TW - 0.5 * px, 0.2 * px); }
    let tam = 0.2 * px; x.font = F(800, tam);
    const tit = "TARJETA DE LAVADOS";
    while (x.measureText(tit).width > TW - 0.5 * px) { tam -= 1; x.font = F(800, tam); }
    if (!limpia) x.fillText(tit, 0.25 * px, 0.4 * px);
    x.fillStyle = "#5ce611"; x.fillRect(0.25 * px, 0.47 * px, TW - 0.5 * px, 0.035 * px);
    x.strokeStyle = "#16243d"; x.lineWidth = 0.036 * px;
    pos.forEach((p, i) => {
      const cx = (p.x + W / 2) * px, cy = (CARD_H / 2 - p.y) * px;
      x.beginPath(); x.arc(cx, cy, CIR_R * px, 0, Math.PI * 2); x.stroke();
    });
    // el premio, fuera de la grilla: "★ 10 sellos = lavado gratis"
    const fy = 1.98 * px, sx = 0.25 * px + 0.1 * px;
    x.fillStyle = "#16243d"; x.beginPath();
    for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (k * Math.PI) / 5, rr2 = (k % 2 ? 0.045 : 0.105) * px; x.lineTo(sx + Math.cos(a) * rr2, fy - 0.055 * px + Math.sin(a) * rr2); }
    x.closePath(); x.fill();
    let tf = 0.18 * px; x.font = F(700, tf);
    const pie = `${n} sellos = lavado gratis`;
    while (x.measureText(pie).width > TW - 0.7 * px) { tf -= 1; x.font = F(700, tf); }
    if (!limpia) x.fillText(pie, sx + 0.17 * px, fy);
  });
  const front = new THREE.MeshStandardMaterial({ map: t, roughness: 0.62, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.08 });
  const canto = mat(C.cr2, 0.65);
  const cuerpo = mesh(rbox(W, CARD_H, CARD_D, 0.08, 3), [canto, canto, canto, canto, front, M.cr]);
  g.add(cuerpo);
  const sellos = [], aros = [];
  pos.forEach((p, i) => {
    const s = hacerSello(); s.position.set(p.x, p.y, CARD_D / 2 + 0.02); s.visible = i < sellados; g.add(s); sellos.push(s);
    const a = mesh(aroGeo, M.g, p.x, p.y, CARD_D / 2 + 0.03); a.visible = false; g.add(a); aros.push(a);
  });
  g.userData = { W, pos, sellos, aros, cuerpo };
  scene.add(g);
  return g;
}
// pone un sello con "golpe": cae desde z alto, se aplasta y rebota (u = tiempo desde que toca)
function golpeSello(s, t, ti, desde = 0.9) {
  const caida = desde > 0.5 ? 0.18 : 0.09;
  s.visible = desde > 0 ? t >= ti - caida : t >= ti;
  if (!s.visible) return;
  const baja = sg(t, ti - caida, ti);
  const z = CARD_D / 2 + 0.02 + (1 - baja * baja) * desde;
  const u = t - ti;
  const sq = u > 0 ? Math.exp(-u * 9) * Math.sin(u * 30) * 0.35 : 0;
  s.position.z = z;
  s.scale.set(1 + sq * 0.5, 1 + sq * 0.5, Math.max(0.3, 1 - sq));
}

// ================= EL SELLO DE GOMA =================
// construido sobre +y (goma abajo en y = 0) y girado para que +y apunte a +z (fuera de la tarjeta)
const selloGoma = new THREE.Group();
{
  const inner = new THREE.Group(); inner.rotation.x = Math.PI / 2; selloGoma.add(inner);
  inner.add(mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 36), M.gd, 0, 0.03, 0));
  inner.add(mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.14, 36), M.navy3, 0, 0.13, 0));
  inner.add(mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.03, 36), M.g, 0, 0.215, 0));
  inner.add(mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.22, 20), M.madera, 0, 0.33, 0));
  const perfil = [[0.0, 0], [0.09, 0], [0.12, 0.06], [0.1, 0.16], [0.13, 0.26], [0.17, 0.36], [0.16, 0.44], [0.09, 0.5], [0.0, 0.51]].map(([r, y]) => new THREE.Vector2(r, y));
  inner.add(mesh(new THREE.LatheGeometry(perfil, 28), M.madera, 0, 0.42, 0));
}
scene.add(selloGoma);
// el tampón: caja navy con la almohadilla de tinta verde (donde descansa el sello en el gancho)
const tampon = new THREE.Group();
{
  tampon.add(mesh(rbox(1.6, 1.05, 0.18, 0.07), M.cr2));
  tampon.add(mesh(rbox(1.66, 1.11, 0.06, 0.06), M.cr3, 0, 0, -0.07));
  tampon.add(mesh(rbox(1.32, 0.78, 0.05, 0.05), mat(0x0b1220, 0.85), 0, 0, 0.08));
}
scene.add(tampon);
const HP = V(0, 1.6, 0);
const qH = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.3, 0, 0));
const TAMPON_L = V(0.8, -CARD_H / 2 - 0.8, 0.12); // en el espacio de la tarjeta del gancho (sin el balanceo)
const tamponW = TAMPON_L.clone().applyQuaternion(qH).add(HP);

// ================= EL LAVADERO =================
const CARP = V(0, 0, -7);
const lavadero = new THREE.Group(); lavadero.position.copy(CARP); scene.add(lavadero);
const auto = new THREE.Group(); lavadero.add(auto);
const brochas = [];
const espuma = [];
const gotasAgua = [];
const piso = mesh(new THREE.CircleGeometry(4.6, 48).rotateX(-Math.PI / 2), mat(0x101b30, 0.8), 0, 0, 0); lavadero.add(piso);
{
  const shape = (pts) => { const s = new THREE.Shape(); pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y))); s.closePath(); return s; };
  const ext = (pts, depth, bev = 0.07) => { const g = new THREE.ExtrudeGeometry(shape(pts), { depth, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 3, curveSegments: 4 }); g.translate(0, 0, -depth / 2); return g; };
  const carro = mat(C.cr, 0.35, { metalness: 0.15 });
  auto.add(mesh(ext([[-2.3, 0.36], [2.3, 0.36], [2.38, 0.74], [2.05, 1.0], [-2.2, 1.05], [-2.36, 0.76]], 1.72), carro));
  const vidrio = mat(0x0e1a2e, 0.15, { metalness: 0.4 });
  auto.add(mesh(ext([[1.15, 0.98], [0.55, 1.56], [-0.95, 1.58], [-1.55, 1.0]], 1.5, 0.05), vidrio));
  auto.add(mesh(rbox(1.5, 0.07, 1.6, 0.03), carro, -0.2, 1.6, 0));
  auto.add(mesh(rbox(0.12, 0.62, 1.62, 0.03), carro, -0.22, 1.28, 0)); // parante del medio
  for (const x of [-1.45, 1.45]) for (const z of [-0.86, 0.86]) {
    const r = mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.28, 28).rotateX(Math.PI / 2), M.navy, x, 0.37, z); auto.add(r);
    auto.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.3, 20).rotateX(Math.PI / 2), M.cr3, x, 0.37, z));
  }
  for (const z of [-0.6, 0.6]) auto.add(mesh(rbox(0.06, 0.16, 0.36, 0.03), mat(0xfff6d8, 0.3, { emissive: 0xfff2c0, emissiveIntensity: 0.9 }), 2.38, 0.8, z));
  auto.add(mesh(rbox(0.16, 0.18, 1.78, 0.05), M.navy3, 2.4, 0.46, 0));
  auto.add(mesh(rbox(0.16, 0.18, 1.78, 0.05), M.navy3, -2.38, 0.46, 0));
  // espuma: bolitas blancas sobre el techo y el capó (semilla fija)
  const espumaMat = mat(0xffffff, 0.35, { emissive: 0xffffff, emissiveIntensity: 0.25 });
  const bola = new THREE.SphereGeometry(1, 16, 12);
  for (let i = 0; i < 46; i++) {
    const enTecho = i < 24;
    const x = enTecho ? -0.95 + azar() * 1.1 : 1.5 + azar() * 0.75, z = (azar() - 0.5) * 1.5; // nada sobre el parabrisas
    const y = enTecho ? 1.64 : 1.04 - (x - 1.15) * 0.05;
    const m = mesh(bola, espumaMat, x, y, z); const r = 0.1 + azar() * 0.13; m.userData = { r, f: azar() }; auto.add(m); espuma.push(m);
  }
  // el arco del lavadero: dos columnas navy con franja verde, viga arriba, dos cepillos verdes
  const arco = new THREE.Group(); arco.name = "arco"; lavadero.add(arco);
  for (const z of [-1.9, 1.9]) { arco.add(mesh(rbox(0.36, 2.9, 0.36, 0.05), M.navy3, 0, 1.45, z)); arco.add(mesh(rbox(0.38, 0.12, 0.38, 0.03), M.g, 0, 2.2, z)); }
  arco.add(mesh(rbox(0.42, 0.36, 4.2, 0.06), M.navy3, 0, 2.95, 0));
  arco.add(mesh(rbox(0.44, 0.08, 4.0, 0.03), M.g, 0, 2.8, 0));
  const rayas = tex(256, 64, (x) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#5ce611" : "#3fa60a"; x.fillRect(i * 32, 0, 32, 64); } });
  rayas.wrapS = THREE.RepeatWrapping; rayas.repeat.set(3, 1);
  const cepMat = new THREE.MeshStandardMaterial({ map: rayas, roughness: 0.9 });
  for (const z of [-1.42, 1.42]) { const c = mesh(new THREE.CylinderGeometry(0.4, 0.4, 2.0, 24), cepMat, 0, 1.15, z); arco.add(c); brochas.push(c); }
  const gotaMat = mat(0xdfeff6, 0.1, { emissive: 0x9cc0cf, emissiveIntensity: 0.35 });
  for (let i = 0; i < 18; i++) { const m = mesh(new THREE.SphereGeometry(1, 10, 8), gotaMat); m.userData = { x: (azar() - 0.5) * 0.3, z: (azar() - 0.5) * 3.2, f: azar() }; m.scale.set(0.035, 0.07, 0.035); lavadero.add(m); gotasAgua.push(m); }
}
const autoSombra = sombra(5.4, 2.8);

// ================= BARRAS 19 % / 34 % =================
const barras = new THREE.Group(); scene.add(barras);
const B19 = mesh(rbox(1.3, 1, 1.0, 0.08), mat(0xa7acb8, 0.55, { emissive: 0xa7acb8, emissiveIntensity: 0.08 })), B34 = mesh(rbox(1.3, 1, 1.0, 0.08), M.g);
barras.add(B19, B34);
const n19 = numMesh("19 %", 0.52, M.numCr), n34 = numMesh("34 %", 0.52, M.numG);
const BARX = 0.86, BARZ = CARP.z + 0.6, BX0 = -6.4;
const mini8 = hacerTarjeta(8, { rojo: true, limpia: true }), mini10 = hacerTarjeta(10, { sellados: 2, limpia: true });

// ================= LAS DOS TARJETAS GRANDES Y LOS NÚMEROS =================
const H = hacerTarjeta(10, { sellados: 2 }); // la del gancho (y del cierre)
const C8 = hacerTarjeta(8, { rojo: true });
const C10 = hacerTarjeta(10);
const n8 = numMesh("8", 0.62, M.numCr), n10 = numMesh("10", 0.62, M.numG);
const igual = grupo(mesh(rbox(0.95, 0.17, 0.22, 0.06), M.numG, 0, 0.17, 0), mesh(rbox(0.95, 0.17, 0.22, 0.06), M.numG, 0, -0.17, 0)); scene.add(igual);
const pregunta = new THREE.Mesh(textoGeo("?", 2.7, 0.65), M.g); scene.add(pregunta);
const n0 = numMesh("0 de 8", 0.46, M.numR), n20 = numMesh("2 de 10", 0.46, M.numG);
const C8S = V(-2.2, 1.7, -5.8), C10S = V(2.2, 1.7, -5.8), X0 = V(0, 1.7, -5.8);
// sellos sueltos que vuelan a formar el "?"
const sueltos = [hacerSello(), hacerSello()]; sueltos.forEach((s) => scene.add(s));
// barra de progreso
const progreso = new THREE.Group(); scene.add(progreso);
const PW = 3.0;
progreso.add(mesh(rbox(PW + 0.2, 0.42, 0.12, 0.2), M.cr3)); progreso.add(mesh(rbox(PW + 0.08, 0.3, 0.14, 0.15), M.navy3));
const relleno = mesh(rbox(1, 0.22, 0.16, 0.1), M.g); relleno.position.z = 0.02; progreso.add(relleno);
const flecha = (() => { const s = new THREE.Shape(); s.moveTo(0, 0.22); s.lineTo(0.3, 0); s.lineTo(0, -0.22); s.lineTo(0, 0.22); const g = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 }); g.translate(0, 0, -0.06); return mesh(g, M.g); })();
progreso.add(flecha);
// el moño y la etiqueta de regalo
const mono = new THREE.Group(); scene.add(mono);
{
  const lazo = mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.2 });
  for (const s of [-1, 1]) { const l = mesh(new THREE.TorusGeometry(0.2, 0.075, 12, 28), lazo, s * 0.2, 0.05, 0); l.scale.set(1.1, 0.7, 0.8); l.rotation.z = s * 0.35; mono.add(l); }
  mono.add(mesh(new THREE.SphereGeometry(0.11, 18, 12), lazo, 0, 0.03, 0.03));
  for (const s of [-1, 1]) { const c = mesh(rbox(0.1, 0.42, 0.04, 0.02), lazo, s * 0.11, -0.2, 0.0); c.rotation.z = s * 0.4; mono.add(c); }
}
const etiqueta = new THREE.Group(); scene.add(etiqueta);
const hilo = mesh(new THREE.CylinderGeometry(0.018, 0.018, 1, 8), M.g); etiqueta.add(hilo);
const etiqTex = tex(1024, 380, (x) => {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, 1024, 380);
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(110, 190, 34, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(110, 190, 18, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 112); x.fillText("¡Por", 590, 118); x.fillText("estrenarla!", 590, 262);
});
const etiqMat = new THREE.MeshStandardMaterial({ map: etiqTex, roughness: 0.6, emissive: 0xffffff, emissiveMap: etiqTex, emissiveIntensity: 0.1 });
const etiq = mesh(rbox(2.1, 0.78, 0.04, 0.09), [M.cr2, M.cr2, M.cr2, M.cr2, etiqMat, M.cr]); etiqueta.add(etiq);

// ================= EL ALMACÉN DE RUBÉN (zona B) =================
const almacen = new THREE.Group(); almacen.position.copy(OB); scene.add(almacen);
const MOSTRADOR = { y: 0.88, z: -1.12 };
{
  const sh = (o) => { o.castShadow = true; o.receiveShadow = true; return o; };
  const damero = tex(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(4, 3);
  const p = sh(mesh(new THREE.PlaneGeometry(9, 7), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.45 }), 0.9, 0, 0.1)); p.rotation.x = -Math.PI / 2; almacen.add(p);
  const pared = mat(0xe7dcc4, 0.85);
  almacen.add(sh(mesh(new THREE.BoxGeometry(9, 3.4, 0.1), pared, 0.9, 1.7, -3.3)));
  almacen.add(sh(mesh(new THREE.BoxGeometry(0.1, 3.4, 4.5), pared, -2.4, 1.7, -1.1)));
  almacen.add(sh(mesh(rbox(9, 0.2, 0.12, 0.02), M.navy3, 0.9, 0.1, -3.22)));
  let s = 7;
  const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const colores = [C.g, C.cr, C.red, C.mostaza, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  const estante = mat(0x7a5233, 0.6);
  const frasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  for (const y of [0.7, 1.25, 1.8, 2.35]) {
    almacen.add(sh(mesh(rbox(4.6, 0.05, 0.42, 0.015), estante, 0.4, y, -3.05)));
    for (let x = -1.85; x < 2.6; x += 0.17 + az() * 0.08) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (k < 0.45) { const h = 0.22 + az() * 0.18; almacen.add(sh(mesh(rbox(0.13, h, 0.16, 0.012), mat(c, 0.6), x, y + 0.025 + h / 2, -3.0))); }
      else if (k < 0.75) { almacen.add(sh(mesh(frasco, mat(c, 0.35), x, y + 0.125, -3.0))); almacen.add(mesh(tapa, M.cr, x, y + 0.245, -3.0)); }
      else { almacen.add(sh(mesh(botella, mat(c, 0.3), x, y + 0.175, -3.0))); almacen.add(mesh(pico, mat(C.cr3, 0.4), x, y + 0.37, -3.0)); }
    }
  }
  // el letrero del almacén en la pared del fondo
  const letTex = tex(1024, 220, (x) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, 1024, 220); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.strokeRect(16, 16, 992, 188); x.fillStyle = "#efeee5"; x.font = F(900, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ALMACÉN", 512, 116); });
  almacen.add(mesh(rbox(1.6, 0.34, 0.05, 0.03), [M.navy2, M.navy2, M.navy2, M.navy2, new THREE.MeshStandardMaterial({ map: letTex, roughness: 0.6, emissive: 0xffffff, emissiveMap: letTex, emissiveIntensity: 0.15 }), M.navy2], 1.15, 2.72, -3.22));
  // mostrador
  almacen.add(sh(mesh(rbox(2.5, 0.84, 0.62, 0.03), M.navy3, 0.25, 0.42, MOSTRADOR.z)));
  almacen.add(sh(mesh(rbox(2.62, 0.06, 0.72, 0.02), mat(0x9b6a43, 0.55), 0.25, MOSTRADOR.y - 0.02, MOSTRADOR.z)));
  almacen.add(mesh(rbox(2.3, 0.06, 0.02, 0.01), M.g, 0.25, 0.3, MOSTRADOR.z + 0.315));
  const fr = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 18), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.35, roughness: 0.05 }));
  fr.position.set(-0.7, MOSTRADOR.y + 0.14, MOSTRADOR.z + 0.05); almacen.add(fr);
  for (let i = 0; i < 9; i++) almacen.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.g, C.mostaza][i % 3], 0.3), -0.7 + Math.sin(i * 2.4) * 0.06, MOSTRADOR.y + 0.05 + Math.floor(i / 3) * 0.05, MOSTRADOR.z + 0.05 + Math.cos(i * 2.4) * 0.06));
  almacen.add(sh(mesh(rbox(0.36, 0.1, 0.3, 0.03), M.cr, 1.05, MOSTRADOR.y + 0.03, MOSTRADOR.z + 0.08)));
  almacen.add(mesh(rbox(0.4, 0.025, 0.32, 0.01), mat(0xb9c0c8, 0.3), 1.05, MOSTRADOR.y + 0.1, MOSTRADOR.z + 0.08));
  const termo = crearTermo(); termo.position.set(-0.35, MOSTRADOR.y + 0.01, MOSTRADOR.z - 0.05); almacen.add(termo);
}
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 1e6, dedos: true }); scene.add(ruben.raiz);
const graciela = crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 1e6 }); scene.add(graciela.raiz);
for (const p of [ruben, graciela]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const mate = crearMate(); scene.add(mate);
// el celular chico en las manos de Graciela
const celuG = new THREE.Group();
const pantGTex = tex(256, 512, (x) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, 256, 512); x.fillStyle = "#16243d"; x.fillRect(0, 0, 256, 90); x.strokeStyle = "#16243d"; x.lineWidth = 8; for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) { x.beginPath(); x.arc(58 + c * 70, 200 + r * 80, 26, 0, 7); x.stroke(); } x.fillStyle = "#5ce611"; x.beginPath(); x.arc(58, 200, 26, 0, 7); x.fill(); x.beginPath(); x.arc(128, 200, 26, 0, 7); x.fill(); });
{
  celuG.add(mesh(rbox(0.08, 0.155, 0.014, 0.012), mat(0x2a3346, 0.35)));
  const pant = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.14), new THREE.MeshStandardMaterial({ map: pantGTex, emissive: 0xffffff, emissiveMap: pantGTex, emissiveIntensity: 0.7 }));
  pant.position.z = -0.0085; pant.rotation.y = Math.PI; celuG.add(pant);
}
graciela.cuerpo.add(celuG);
const lentesG = [];
graciela.cabeza.traverse((o) => { if (o.isMesh && o.geometry.type === "TorusGeometry" && Math.abs(o.geometry.parameters.radius - 0.088) < 1e-6) lentesG.push(o); });

// ================= EL CELULAR GRANDE (pegado a la cámara) =================
const PHW = 1.18, PHH = 2.36;
const telefono = new THREE.Group();
const pantallaMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
{
  telefono.add(mesh(rbox(PHW, PHH, 0.12, 0.16, 4), M.navy));
  telefono.add(mesh(rbox(PHW + 0.04, PHH + 0.04, 0.08, 0.17, 4), M.edge, 0, 0, -0.01));
  const p = mesh(new THREE.PlaneGeometry(PHW - 0.1, PHH - 0.12), pantallaMat, 0, 0, 0.065); p.userData.orden = 2; telefono.add(p);
  const isla = mesh(rbox(0.3, 0.06, 0.02, 0.03), M.navy, 0, PHH / 2 - 0.12, 0.075); isla.userData.orden = 3; telefono.add(isla);
}
pegarACamara(telefono, camera, 40);
const pantallas = {};
{
  const TW = 640, TH = 1310;
  const tarjetaPuntos = (x, n) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, TW, TH);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, TW, 230);
    x.fillStyle = "#5ce611"; x.font = F(800, 52); x.textAlign = "left"; x.fillText("Scalerics Puntos", 48, 108);
    x.fillStyle = "#efeee5"; x.font = F(800, 58); x.fillText("Almacén de Rubén", 48, 184);
    // la tarjeta
    x.fillStyle = "#efeee5"; rr(x, 32, 280, TW - 64, 430, 34);
    x.fillStyle = "#16243d"; x.font = F(800, 52); x.fillText("Graciela", 72, 360);
    x.lineWidth = 9; x.strokeStyle = "#16243d";
    for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) {
      const cx = 104 + c * 108, cy = 470 + r * 128, i = r * 5 + c;
      if (i < n) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(cx, cy, 44, 0, 7); x.fill(); x.strokeStyle = "#16243d"; x.lineWidth = 9; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - 20, cy + 2); x.lineTo(cx - 5, cy + 18); x.lineTo(cx + 22, cy - 16); x.stroke(); }
      else { x.beginPath(); x.arc(cx, cy, 44, 0, 7); x.stroke(); }
    }
    x.fillStyle = "#efeee5"; x.font = F(800, 58); x.textAlign = "center";
    x.fillText(`${n} de 10`, TW / 2, 820);
  };
  const premio = (x) => {
    x.strokeStyle = "#5ce611"; x.lineWidth = 6; x.beginPath(); x.roundRect(32, 1170, TW - 64, 100, 30); x.stroke();
    x.fillStyle = "#5ce611"; x.beginPath();
    for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (k * Math.PI) / 5, r = k % 2 ? 11 : 26; x.lineTo(92 + Math.cos(a) * r, 1220 + Math.sin(a) * r); }
    x.closePath(); x.fill();
    x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(700, 44); x.fillText("Premio: 10 sellos", 136, 1236);
  };
  pantallas.cero = tex(TW, TH, (x) => {
    tarjetaPuntos(x, 0);
    x.strokeStyle = "#2c4268"; x.lineWidth = 6; x.setLineDash([18, 14]); x.beginPath(); x.roundRect(32, 890, TW - 64, 250, 34); x.stroke(); x.setLineDash([]);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 60); x.fillText("Tarjeta nueva", TW / 2, 1036);
    premio(x);
  });
  pantallas.dos = tex(TW, TH, (x) => {
    tarjetaPuntos(x, 2);
    x.fillStyle = "#5ce611"; rr(x, 32, 890, TW - 64, 250, 34);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(800, 56); x.fillText("¡Bienvenida!", TW / 2, 970);
    x.font = F(700, 48); x.fillText("Rubén te regaló 2", TW / 2, 1036); x.font = F(600, 44); x.fillText("por estrenarla", TW / 2, 1096);
    premio(x);
  });
  const bloqueo = (x) => {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, TW, TH);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(600, 44); x.fillText("martes", TW / 2, 200);
    x.font = F(800, 170); x.fillText("19:40", TW / 2, 380);
    // linterna y cámara abajo, y la barrita de deslizar
    for (const cx of [110, TW - 110]) { x.fillStyle = "#2c4268"; x.beginPath(); x.arc(cx, 1150, 56, 0, 7); x.fill(); }
    x.strokeStyle = "#efeee5"; x.lineWidth = 7; x.lineJoin = "round";
    x.beginPath(); x.moveTo(98, 1122); x.lineTo(122, 1122); x.lineTo(116, 1150); x.lineTo(116, 1178); x.lineTo(104, 1178); x.lineTo(104, 1150); x.closePath(); x.stroke();
    x.beginPath(); x.roundRect(TW - 142, 1130, 64, 44, 8); x.stroke(); x.beginPath(); x.arc(TW - 110, 1152, 12, 0, 7); x.stroke();
    x.fillStyle = "#efeee5"; rr(x, TW / 2 - 110, 1250, 220, 12, 6);
  };
  pantallas.bloqueo = tex(TW, TH, bloqueo);
  pantallas.aviso = tex(TW, TH, (x) => {
    bloqueo(x);
    x.fillStyle = "#efeee5"; rr(x, 28, 470, TW - 56, 470, 40);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(92, 540, 30, 0, 7); x.fill();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 44); x.fillText("Almacén de Rubén", 140, 556);
    x.font = F(600, 50);
    ["Graciela, ¡te", "esperamos! Te", "faltan 8 para", "el premio."].forEach((l, i) => x.fillText(l, 60, 650 + i * 66));
  });
  pantallaMat.map = pantallas.cero; pantallaMat.needsUpdate = true;
}

// ================= CÁMARA =================
// PLANOS: [desde, claves]; clave [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ, fov].
// Dentro de un plano, cúbica monótona (Fritsch-Carlson) continua; entre planos, corte seco con whoosh.
const PLANOS = [
  [0, [
    [0, 9, 13, 14.2, 0.05, 1.72, 0, 30],
    [W[8], 3, 12, 13.1, 0.05, 1.7, 0, 30],
    [S["s02-lavadero"] - 0.15, -2, 11, 12.6, 0.05, 1.7, 0, 30],
    [W[14] + 0.1, 58, 13, 15.6, 0.55, 1.15, CARP.z, 30],
    [W[15] - 0.03, 54, 12, 15.3, 0.6, 1.15, CARP.z, 30],
    [W[15], 3, 8, 11.6, BX0, 1.75, BARZ, 30],
    [S["s03-ocho"] - 0.12, 0, 8, 11.3, BX0, 1.75, BARZ, 30],
    [S["s03-ocho"] + 0.4, -1, 6, 11.0, C8S.x, 2.1, C8S.z, 30],
    [S["s04-diez"] - 0.04, 1, 6, 10.8, C8S.x, 2.12, C8S.z, 30],
    [S["s04-diez"] + 0.24, -1, 15, 12.5, C10S.x, 2.05, C10S.z, 30],
    [S["s05-mismos"] - 0.12, 1, 15, 12.2, C10S.x, 2.05, C10S.z, 30],
    [S["s05-mismos"] + 0.4, 0, 6, 15.6, 0, 2.2, X0.z, 30],
    [S["s06-por-que"] - 0.1, 2, 6, 15.2, 0, 2.2, X0.z, 30],
    [S["s06-por-que"] + 0.35, 0, 5, 12.0, 0, 1.95, X0.z, 30],
    [W[43], -2, 5, 12.4, 0, 1.95, X0.z, 30],
    [S["s07-camino"], 2, 6, 12.6, 0, 1.95, X0.z, 30],
    [S["s08-excusa"] + 0.5, -1, 6, 12.3, 0, 2.12, X0.z, 30],
    [W[61] - 0.35, 0, 6, 12.6, 0, 2.05, X0.z, 30],
    [W[61] + 0.2, 1, 6, 13.8, 0, 1.85, X0.z, 30],
    [S["s09-ruben"], 2, 7, 13.3, 0, 1.85, X0.z, 30],
  ]],
  // almacén, plano general de 3/4: Rubén detrás del mostrador con el mate, Graciela del lado de acá
  [S["s09-ruben"], [
    [S["s09-ruben"], 8, 7, 6.6, OB.x + 1.25, 1.0, -1.4, 34],
    [S["s10-graciela"], 4, 6, 6.2, OB.x + 1.25, 1.02, -1.4, 34],
    [S["s11-aviso"], 2, 6, 6.1, OB.x + 1.25, 1.02, -1.4, 34],
  ]],
  [S["s11-aviso"], [
    [S["s11-aviso"], -4, 7, 6.6, OB.x + 1.25, 1.0, -1.35, 34],
    [S["s12-tu-local"], -2, 7, 6.4, OB.x + 1.32, 1.0, -1.35, 34],
    [S["s13-llamada"], 3, 6, 6.1, OB.x + 1.36, 1.02, -1.4, 34],
  ]],
  // cierre: la tarjeta del gancho abajo, el texto de la videollamada arriba
  [S["s13-llamada"], [
    [S["s13-llamada"], -6, 12, 16.5, 0, 3.75, 0, 30],
    [DUR, 6, 12, 15.8, 0, 3.7, 0, 30],
  ]],
];
const _mira = new THREE.Vector3();
const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6], k[7]];
let planoActual = 0;
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
  planoActual = pi;
  const CAM = PLANOS[pi][1];
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[Math.min(i + 1, CAM.length - 1)];
  const u = b === a ? 0 : sg(t, a[0], b[0]);
  const p1 = val(a), p2 = val(b), h = b[0] - a[0];
  const prev = i > 0 ? CAM[i - 1] : null;
  const next = i + 2 < CAM.length ? CAM[i + 2] : null;
  const p0 = prev ? val(prev) : null, p3 = next ? val(next) : null;
  const tang = (q0, t0, q1, t1, q2, t2, j) => {
    const d1 = (q1[j] - q0[j]) / (t1 - t0), d2 = (q2[j] - q1[j]) / (t2 - t1);
    if (d1 * d2 <= 0) return 0;
    const h1 = t1 - t0, h2 = t2 - t1;
    return (3 * (h1 + h2)) / ((2 * h2 + h1) / d1 + (h2 + 2 * h1) / d2);
  };
  const s2 = u * u, s3 = s2 * u;
  const v = p1.map((_, j) => {
    if (h <= 0) return p1[j];
    const m1 = p0 ? tang(p0, prev[0], p1, a[0], p2, b[0], j) : 0;
    const m2 = p3 ? tang(p1, a[0], p2, b[0], p3, next[0], j) : 0;
    return (2 * s3 - 3 * s2 + 1) * p1[j] + (s3 - 2 * s2 + u) * h * m1 + (-2 * s3 + 3 * s2) * p2[j] + (s3 - s2) * h * m2;
  });
  const [az, el, ld, tx, ty, tz, fov] = v;
  const d = Math.exp(ld);
  _mira.set(tx, ty, tz);
  camera.position.set(tx + d * Math.cos(el * D2R) * Math.sin(az * D2R), ty + d * Math.sin(el * D2R), tz + d * Math.cos(el * D2R) * Math.cos(az * D2R));
  const k = Math.min(1, 10 / d) * 0.5;
  camera.position.x += Math.sin(t * 0.7) * 0.03 * k; camera.position.y += Math.sin(t * 0.53) * 0.02 * k;
  camera.fov = fov;
  camera.near = Math.max(0.05, d * 0.01); camera.far = Math.max(200, d * 8);
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  return { d, az, el };
}

// ================= POSES DE LA ZONA B =================
const R0 = { x: OB.x + 0.72, z: -1.72, giro: 0.6 };
const G0 = { x: OB.x + 1.78, z: -1.0, giro: -0.8 };
const conCel = { ...BRAZOS.celular };
const mirarCel = { cabeza: { giro: 0, asiente: 0.4, ladea: 0.05 }, ojos: { x: 0, y: -0.9 } };
const mirarRuben = { torso: -0.12, cabeza: { giro: -0.35, asiente: -0.1, ladea: 0 }, ojos: { x: -0.8, y: 0.15 } };
const mateMano = { manoD: [-0.24, 0.3, 0.3], codoD: [-0.8, -0.6, 0], dedoD: 0 };
const mirarG = { cabeza: { giro: 0.4, asiente: 0.02, ladea: 0.04 }, ojos: { x: 0.5, y: -0.1 } };
const RK = [
  [0, { ...R0, ...BRAZOS.apoyado, ...mateMano, ...mirarG, ...CARA.sonrisa }],
  [W[64], { cejas: { alto: 0.5, ang: 0.1 }, boca: { sonrisa: 0.9, abierta: 0.1, ancho: 1.15 } }, 0.25],
  [W[67] + 0.1, { manoI: [0.36, 0.3, 0.42], codoI: [1, -0.6, -0.1], dedoI: 1, cabeza: { giro: 0.42, asiente: 0.18 }, ojos: { x: 0.6, y: -0.6 } }, 0.3],
  [S["s10-graciela"] + 0.4, { ...BRAZOS.apoyado, ...mateMano, ...mirarG, ...CARA.feliz }, 0.35],
  [S["s11-aviso"] + 0.5, { cabeza: { giro: 0.75, asiente: 0.0 }, ojos: { x: 0.9, y: 0 }, ...CARA.esperanza }, 0.4],
  [W[78], { cabeza: { giro: -0.35, asiente: 0.08, ladea: -0.08 }, ...CARA.resignado, ojos: { abiertos: 0.5, tension: 0.4, x: -0.4 } }, 0.4],
  [S["s12-tu-local"] + 0.25, { cabeza: { giro: 0.75, asiente: -0.05 }, ...CARA.sorpresa, ojos: { x: 0.9, abiertos: 1 } }, 0.2],
  [S["s12-tu-local"] + 0.7, { cabeza: { giro: 0.2, asiente: -0.05 }, ...CARA.feliz, ojos: { x: 0.2, feliz: 0.5 } }, 0.3],
  [W[85] + 0.35, { ojos: { guiño: 1, x: 0.4, feliz: 0.4 }, cejas: { asim: 0.6, alto: 0.4 } }, 0.15],
  [W[85] + 0.95, { ojos: { guiño: 0, x: 0.55 } }, 0.15],
];
const GK = [
  [0, { ...G0, ...conCel, ...mirarCel, ...CARA.concentrada, boca: { sonrisa: 0.3 } }],
  [W[64] + 0.55, { ...mirarRuben, ...CARA.sonrisa }, 0.7],
  [S["s10-graciela"], { ...mirarCel, ...CARA.esperanza }, 0.3],
  [W[72] + 0.05, { ...CARA.feliz, inclina: -0.03 }, 0.2],
  [S["s11-aviso"] + 0.12, { giro: 1.2, ...BRAZOS.costado, cabeza: { giro: -0.6, asiente: 0 }, ojos: { x: -0.3, y: 0 }, ...CARA.neutra }, 0.25],
  [S["s12-tu-local"] - 0.05, { giro: -1.15, cabeza: { giro: 0.55, asiente: 0 }, ojos: { x: 0.3, y: 0 } }, 0.05],
  [S["s12-tu-local"] + 0.85, { giro: -0.55, torso: 0, cabeza: { giro: 0.2, asiente: -0.05, ladea: 0.06 }, ojos: { x: 0.1, y: 0.05 }, ...CARA.feliz }, 0.35],
];
const salida = () => S["s11-aviso"] + 0.15, entrada = () => S["s12-tu-local"] - 0.02;
function ponerPersonajes(t) {
  const on = planoActual === 1 || planoActual === 2;
  ruben.raiz.visible = on; graciela.raiz.visible = on; mate.visible = on;
  if (!on) return;
  // Graciela: se va por la derecha en "Si deja de venir" y vuelve en "¿Lo vemos…?"
  let pg = poseEn(t, GK);
  const va = eio(sg(t, salida(), salida() + 0.85));
  const vuelve = eo(sg(t, entrada(), entrada() + 0.8));
  let gx = G0.x, gz = G0.z;
  if (t < entrada()) { gx = lerp(G0.x, G0.x + 2.9, va); gz = lerp(G0.z, G0.z + 1.1, va); }
  else { gx = lerp(G0.x + 3.4, G0.x, vuelve); gz = lerp(G0.z - 1.3, G0.z, vuelve); }
  const caminando = (t > salida() && t < salida() + 0.85) || (t > entrada() && t < entrada() + 0.8);
  pg.x = gx; pg.z = gz; pg.paso = caminando ? 1 : 0;
  graciela.poner(pg);
  if (lentesG.length === 2) {
    graciela.raiz.updateMatrixWorld(true);
    // solo cuando la cara está a más de ~50° de la cámara se esconde el cristal lejano (de frente se ven los dos)
    const hp = graciela.cabeza.getWorldPosition(new THREE.Vector3());
    const fw = graciela.cabeza.getWorldDirection(new THREE.Vector3());
    const cosA = fw.dot(camera.position.clone().sub(hp).normalize());
    const a = lentesG[0].getWorldPosition(new THREE.Vector3()).distanceTo(camera.position), b = lentesG[1].getWorldPosition(new THREE.Vector3()).distanceTo(camera.position);
    const perfil = cosA < 0.64;
    lentesG[0].visible = !(perfil && a > b); lentesG[1].visible = !(perfil && b > a);
  }
  graciela.raiz.visible = gx < G0.x + 2.35;
  const mD = graciela.brazos[1].mano.position, mI = graciela.brazos[0].mano.position;
  const dos = mD.distanceTo(mI) < 0.25 ? 1 : 0;
  celuG.visible = dos === 1;
  celuG.position.set((mD.x + mI.x) / 2, (mD.y + mI.y) / 2 + 0.035, (mD.z + mI.z) / 2 + 0.02);
  celuG.rotation.set(-0.55, 0, 0);
  // Rubén
  let pr = poseEn(t, RK);
  // saluda con la mano libre cuando ella vuelve
  const saluda = sg(t, S["s12-tu-local"] + 0.45, S["s12-tu-local"] + 0.7) * (1 - sg(t, W[85] + 0.9, W[85] + 1.2));
  if (saluda > 0) pr = mezclar(pr, { ...pr, ...saludo(t, "I", 1) }, eio(saluda));
  ruben.poner(pr);
  // el mate en la mano derecha de Rubén
  ruben.raiz.updateMatrixWorld(true);
  const m = ruben.mano("D");
  m.getWorldPosition(mate.position);
  mate.position.y -= 0.06; mate.position.z += 0.03;
  mate.rotation.set(0, 0.6, 0);
}

// ================= ESCENA EN EL TIEMPO =================
const tmpQ = new THREE.Quaternion(), tmpM = new THREE.Matrix4();
const qVidrio = (() => { const Y = V(-0.69, 0.72, 0).normalize(), Z = V(0.72, 0.69, 0).normalize(), X = new THREE.Vector3().crossVectors(Y, Z); return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z)); })();
const qCard = (rx, ry = 0) => new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, 0));
// orienta el sello de goma: su +z (el mango) apunta a dir (en el espacio de la tarjeta), con un giro propio
const qDir = (dir, giro) => new THREE.Quaternion().setFromUnitVectors(V(0, 0, 1), dir.clone().normalize()).multiply(new THREE.Quaternion().setFromAxisAngle(V(0, 0, 1), giro));
function cartaFlip(c, s, sx) { ocultar(c, s); if (c.visible) c.scale.x *= Math.max(0.02, sx); }

function renderAt(t) {
  semilla = 77;
  scene.environmentRotation.y = t * 0.08;
  const cam = ponerCamara(t);
  const zonaA = planoActual === 0 || planoActual === 3;
  sol.intensity = zonaA ? 0 : 2.2;
  lampara.intensity = zonaA ? 0 : 8;
  key.intensity = zonaA ? 2.5 : 0.9;
  fill.intensity = zonaA ? 1.0 : 0.9;
  almacen.visible = !zonaA;

  // ---- el lavadero (s02): el auto bajo el arco, espuma, cepillos; sale por la derecha en "casi" ----
  const sale = eio(sg(t, W[15] - 0.25, W[15] + 0.35));
  const lavOn = zonaA && t > S["s02-lavadero"] + 0.12 && t < W[15] - 0.02;
  {
    const baja = 0; // el lavadero queda en su lugar: la cámara se va a las barras, a la izquierda
    lavadero.visible = lavOn;
    lavadero.position.set(CARP.x, 0, CARP.z);
    auto.position.set(9.5 * sale, 0, 0); // el auto se va por la derecha con su espuma
    const lav = lavOn ? 1 : 0;
    brochas.forEach((b, i) => { b.rotation.y = t * (i ? -7 : 7); });
    espuma.forEach((e) => { const r = e.userData.r * (1 + 0.12 * Math.sin(t * 5 + e.userData.f * 9)); ocultar(e, r * lav); });
    gotasAgua.forEach((g) => { const f = (t * 1.6 + g.userData.f) % 1; g.position.set(g.userData.x, 2.75 - f * 2.6, g.userData.z); g.visible = lav > 0 && Math.abs(g.userData.z) > 1.0; });
    autoSombra.visible = lavadero.visible && sale < 0.6;
    autoSombra.position.set(CARP.x + 9.5 * sale, 0.01 - 4.5 * baja, CARP.z); autoSombra.material.opacity = 0.7;
  }

  // ---- la tarjeta del gancho: grande, con dos sellos; vuela al parabrisas del auto ----
  {
    const vuela = eio(sg(t, S["s02-lavadero"] - 0.1, W[14] + 0.05));
    const enCierre = planoActual === 3;
    const vis = (t < W[15] + 0.6 && zonaA) || enCierre;
    H.visible = vis;
    if (vis && !enCierre) {
      const q0 = qCard(-0.3 + Math.sin(t * 0.9) * 0.03, Math.sin(t * 0.7) * 0.06);
      lavadero.updateMatrixWorld(true);
      const tgt = V(0.84, 1.3, 0).add(V(0.72, 0.69, 0).normalize().multiplyScalar(0.1));
      auto.localToWorld(tgt);
      const qt = auto.getWorldQuaternion(new THREE.Quaternion()).multiply(qVidrio);
      const arc = Math.sin(Math.PI * vuela);
      H.position.copy(lerpV(HP, tgt, vuela)).add(V(0.3 * arc, 0.6 * arc, 0.5 * arc));
      H.quaternion.copy(q0).slerp(qt, vuela);
      H.scale.setScalar(lerp(1, 0.33, vuela));
      // primeros dos sellos: puestos. Pulso en "dos"
      H.userData.sellos.forEach((s, i) => { s.visible = i < 2; s.position.z = CARD_D / 2 + 0.02; s.scale.setScalar(1 + 0.18 * pulso(t, W[8] - 0.05 + i * 0.08, 0.32)); });
    } else if (enCierre) {
      const t0 = S["s13-llamada"];
      H.position.set(0, 1.6, 0);
      H.quaternion.copy(qCard(-0.22 + Math.sin(t * 0.9) * 0.03, Math.sin((t - t0) * 0.9) * 0.18));
      H.scale.setScalar(lerp(0.85, 1, bk(sg(t, t0, t0 + 0.35))));
      H.userData.sellos.forEach((s, i) => { s.visible = i < 2; s.scale.setScalar(1); s.position.z = CARD_D / 2 + 0.02; });
      golpeSello(H.userData.sellos[2], t, W[91] - 0.07, 0.9); // el tercero: volvió
    }
  }
  // ---- el sello de goma: en el gancho (recién levantado) y en s04 (pum, pum en la de diez) ----
  {
    let s = 0;
    const gancho = t < S["s02-lavadero"] - 0.05;
    const p4a = W[35] - 0.02, p4b = W[37] - 0.02;
    const enS4 = t > p4a - 0.5 && t < p4b + 0.6;
    if (gancho && zonaA) {
      const vuelaS = eio(sg(t, S["s02-lavadero"] - 0.8, S["s02-lavadero"] - 0.4)); // se va volando por la derecha
      s = 1;
      // baja y apoya en el tampón (0,08 s, con squash), se levanta en "sellos" y queda flotando, inclinado
      const cae = sg(t, 0, 0.08), u = t - 0.08;
      const sq = u > 0 ? Math.exp(-u * 10) * Math.sin(u * 32) * 0.05 : 0;
      const sube = eio(sg(t, W[5] - 0.1, W[5] + 0.35));
      const dir = V(0.4 + 0.15 * sube, 0.55 + 0.05 * sube, 0.73 - 0.15 * sube).normalize();
      const lp = TAMPON_L.clone().add(V(0.1 * sube, 0, 0.13 + (1 - cae * cae) * 0.35 + sq + 0.55 * sube + Math.sin(t * 2.4) * 0.03 * sube));
      lp.add(V(4.5 * vuelaS, 1.2 * vuelaS, 3.5 * vuelaS));
      selloGoma.position.copy(lp.applyQuaternion(qH).add(HP));
      selloGoma.quaternion.copy(qH).multiply(qDir(dir, Math.sin(t * 1.7) * 0.06 * sube));
    } else if (enS4) {
      const entra = 1 - eo(sg(t, p4a - 0.5, p4a - 0.2));
      const vase = eio(sg(t, p4b + 0.22, p4b + 0.6));
      s = vase >= 1 ? 0 : 1;
      const pos = C10.userData.pos;
      // va del primer casillero al segundo; baja en p4a y en p4b
      const ir = eio(sg(t, p4a + 0.08, p4b - 0.12));
      const base = lerpV(pos[0], pos[1], ir);
      const golpe = (ti) => { const u = t - ti; if (u < -0.16 || u > 0.22) return 1; return u < 0 ? 1 - (u + 0.16) / 0.16 : eo(u / 0.22); };
      const alto = Math.min(golpe(p4a), golpe(p4b));
      const dir = V(0.45, -0.15, 0.88).normalize();
      const lp = base.clone().addScaledVector(dir, CARD_D / 2 + 0.04 + 0.85 * alto);
      lp.z = Math.max(lp.z, CARD_D / 2 + 0.04);
      lp.add(V(4.0 * entra + 3.0 * vase, 1.2 * entra + 0.6 * vase, 0.6 * entra + 4.5 * vase));
      C10.updateMatrixWorld(true);
      selloGoma.position.copy(C10.localToWorld(lp.clone()));
      selloGoma.quaternion.copy(C10.quaternion).multiply(qDir(dir, 0));
    }
    ocultar(selloGoma, s);
  }

  tampon.visible = zonaA && t < S["s02-lavadero"] + 0.2;
  tampon.position.copy(tamponW).add(V(-5 * eio(sg(t, S["s02-lavadero"] - 0.25, S["s02-lavadero"] + 0.15)), 0, 0)); tampon.quaternion.copy(qH); // se va por la izquierda

  // ---- barras 19 % / 34 % con sus mini tarjetas (s02, tiempo B) ----
  {
    const on = zonaA && t > W[15] - 0.15 && t < S["s03-ocho"] + 0.6;
    const cae = 0; // quedan en su lugar: la cámara se va a la tarjeta de ocho
    const nb = bk(sg(t, W[15] - 0.15, W[15] + 0.15));
    const h19 = lerp(1.3, 1.62, eo(sg(t, W[15] + 0.05, W[17] + 0.1))) * nb * (1 - cae);
    const h34 = lerp(1.6, 2.9, eo(sg(t, W[15] + 0.1, W[20] + 0.05))) * nb * (1 - cae);
    barras.visible = on;
    B19.visible = h19 > 0.02; B19.scale.set(1, Math.max(0.001, h19), 1); B19.position.set(BX0 - BARX, h19 / 2, BARZ);
    B34.visible = h34 > 0.02; B34.scale.set(1, Math.max(0.001, h34), 1); B34.position.set(BX0 + BARX, h34 / 2, BARZ);
    B34.scale.x = 1 + 0.06 * pulso(t, W[20] + 0.02, 0.3);
    ponerNum(n19, on && t > W[17] ? lerp(0.5, 1, bk(sg(t, W[17], W[17] + 0.3))) : 0, 1, 1); n19.position.set(BX0 - BARX, Math.max(h19, 0.95) + 0.38, BARZ); n19.rotation.set(0, cam.az * D2R * 0.6, 0);
    ponerNum(n34, on && t > W[20] - 0.05 ? lerp(0.5, 1, bk(sg(t, W[20] - 0.05, W[20] + 0.28))) : 0, 1, 1); n34.position.set(BX0 + BARX, Math.max(h34, 0.95) + 0.38, BARZ); n34.rotation.set(0, cam.az * D2R * 0.6, 0);
    if (n34.visible) n34.scale.multiplyScalar(1 + 0.12 * pulso(t, W[20] + 0.25, 0.3));
    const mm = on ? lerp(0.6, 1, bk(sg(t, W[15] - 0.15, W[15] + 0.2))) : 0;
    ocultar(mini8, mm * 0.44); mini8.position.set(BX0 - BARX, 0.5, BARZ + 0.72); mini8.rotation.set(-0.25, 0, 0);
    ocultar(mini10, mm * 0.44); mini10.position.set(BX0 + BARX, 0.5, BARZ + 0.72); mini10.rotation.set(-0.25, 0, 0);
  }

  // ---- las dos tarjetas grandes (s03-s08) ----
  // C8: nace en "A unos" a la izquierda; en "Mismos" sube al lugar de arriba; sale en "¿Por qué?"; vuelve de frente
  // en "Vacía" (en el lugar del "?"); en "Con dos sellos" se da vuelta y del otro lado está la de diez.
  {
    const STK8 = V(0, 3.22, X0.z), STK10 = V(0, 0.2, X0.z), CEN = V(0, 1.72, X0.z);
    const stackY = eio(sg(t, S["s05-mismos"] - 0.1, S["s05-mismos"] + 0.2)), stackX = eio(sg(t, S["s05-mismos"] + 0.08, S["s05-mismos"] + 0.45));
    const apilar = (A, B) => V(lerp(A.x, B.x, stackX), lerp(A.y, B.y, stackY), lerp(A.z, B.z, stackX));
    const fuera = eio(sg(t, S["s06-por-que"] - 0.28, S["s06-por-que"] + 0.02));
    const ti8 = W[43] - 0.12; // vuelve de frente
    const flip7 = S["s07-camino"] - 0.14; // se da vuelta
    // C8
    let s8 = 0, sx8 = 1, p8 = C8S.clone(), q8 = qCard(-0.1 + Math.sin(t * 0.8) * 0.03, Math.sin(t * 0.6) * 0.05);
    if (zonaA && t < S["s06-por-que"] + 0.03 && t > S["s03-ocho"]) {
      s8 = lerp(0.6, 1, bk(sg(t, S["s03-ocho"], S["s03-ocho"] + 0.3)));
      p8 = apilar(C8S, STK8).add(V(-6 * fuera, 0, 0));
      // en s04 queda atrás, más chica y gris (la cámara viaja a la de diez)
    } else if (zonaA && t >= ti8 && t < flip7 + 0.16) {
      s8 = 1; sx8 = eio(sg(t, ti8, ti8 + 0.2)) * (1 - eio(sg(t, flip7, flip7 + 0.15)));
      p8 = CEN.clone();
    }
    cartaFlip(C8, s8, sx8); C8.position.copy(p8); C8.quaternion.copy(q8);
    // C10
    let s10 = 0, sx10 = 1, p10 = C10S.clone(), q10 = qCard(-0.1 + Math.sin(t * 0.8 + 1) * 0.03, Math.sin(t * 0.6 + 1) * 0.05);
    const nace10 = S["s04-diez"] - 0.1;
    const fin8 = S["s09-ruben"];
    if (zonaA && t > nace10 && t < S["s06-por-que"] + 0.03) {
      s10 = lerp(0.6, 1, bk(sg(t, nace10, nace10 + 0.35)));
      p10 = apilar(C10S, STK10).add(V(6 * fuera, 0, 0));
    } else if (zonaA && t >= flip7 + 0.15 && t < fin8) {
      s10 = 1; sx10 = eio(sg(t, flip7 + 0.15, flip7 + 0.32));
      // en "excusa" sube un poco para que entre la etiqueta abajo
      p10 = CEN.clone().add(V(0, 0.35 * eio(sg(t, S["s08-excusa"] - 0.1, S["s08-excusa"] + 0.4)), 0));
    }
    cartaFlip(C10, s10, sx10); C10.position.copy(p10); C10.quaternion.copy(q10);
    // sellos de C10: pum pum en s04; se van a formar el "?" en s06; caen de nuevo en s07
    const sl = C10.userData.sellos;
    sl.forEach((s, i) => { s.visible = false; s.scale.setScalar(1); s.position.z = CARD_D / 2 + 0.02; });
    if (t < S["s06-por-que"] + 0.05) { golpeSello(sl[0], t, W[35] - 0.02, 0.0); golpeSello(sl[1], t, W[37] - 0.02, 0.0); }
    else if (t >= flip7 + 0.15) { golpeSello(sl[0], t, S["s07-camino"] + 0.22, 0.4); golpeSello(sl[1], t, S["s07-camino"] + 0.42, 0.4); }
    // aros verdes: "mismos ocho" (los 8 casilleros por llenar de cada una se prenden en fila)
    const aroOn = zonaA && t > S["s05-mismos"] + 0.05 && t < S["s06-por-que"] - 0.05;
    C8.userData.aros.forEach((a, i) => { const ti = S["s05-mismos"] + 0.15 + i * 0.075; ocultar(a, aroOn && t > ti ? lerp(0.5, 1, bk(sg(t, ti, ti + 0.16))) : 0); });
    C10.userData.aros.forEach((a, i) => { const k = i - 2; const ti = S["s05-mismos"] + 0.15 + k * 0.075; ocultar(a, aroOn && k >= 0 && t > ti ? lerp(0.5, 1, bk(sg(t, ti, ti + 0.16))) : 0); });
    // números "8" y "10" arriba de cada tarjeta
    const n8on = zonaA && t < S["s05-mismos"] + 0.1;
    ponerNum(n8, n8on && t > W[27] - 0.05 ? lerp(0.5, 1, bk(sg(t, W[27] - 0.05, W[27] + 0.25))) * salir(t, S["s05-mismos"] - 0.12) : 0, 1, 1);
    n8.position.copy(C8S).add(V(0, 1.62, 0)); n8.rotation.set(0, cam.az * D2R * 0.5, 0);
    ponerNum(n10, n8on && t > W[33] - 0.05 ? lerp(0.5, 1, bk(sg(t, W[33] - 0.05, W[33] + 0.25))) * salir(t, S["s05-mismos"] - 0.12) : 0, 1, 1);
    n10.position.copy(C10S).add(V(0, 1.62, 0)); n10.rotation.set(0, cam.az * D2R * 0.5, 0);
    // "=" entre las dos, en "Mismos"
    ocultar(igual, zonaA && t > S["s05-mismos"] + 0.25 && t < S["s06-por-que"] ? lerp(0.5, 1, bk(sg(t, S["s05-mismos"] + 0.25, S["s05-mismos"] + 0.5))) * salir(t, S["s06-por-que"] - 0.3) : 0);
    igual.position.set(0, (STK8.y + STK10.y) / 2 + 0.02, X0.z + 0.2); igual.rotation.set(0, Math.sin(t * 1.2) * 0.06, 0);
    // sellos sueltos: de la de diez al centro, donde nace el "?"
    const vu = sg(t, S["s06-por-que"] - 0.22, S["s06-por-que"] + 0.1);
    sueltos.forEach((s, i) => {
      const on = false; void vu;
      const p0 = C10.userData.pos[i].clone().add(STK10);
      const p1 = V(0, 1.9, X0.z + 0.6);
      ocultar(s, on ? lerp(1.0, 0.5, vu) : 0);
      s.position.copy(lerpV(p0, p1, eio(vu))).add(V(0, Math.sin(Math.PI * vu) * 0.5, 0.5));
      s.rotation.set(0, 0, vu * Math.PI * 2 * (i ? 1 : -1));
    });
    // el "?": nace donde se juntan los sellos y gira de canto en "Vacía" (del otro lado está la tarjeta de ocho)
    const pt = S["s06-por-que"] - 0.12;
    const sp = zonaA && t > pt && t < ti8 + 0.12 ? lerp(0.75, 1, bk(sg(t, pt, pt + 0.25))) : 0;
    ocultar(pregunta, sp);
    pregunta.position.set(0, 1.92, X0.z + 0.6);
    pregunta.rotation.set(0, Math.sin(t * 1.4) * 0.18, 0);
    if (pregunta.visible) { pregunta.scale.x *= Math.max(0.02, 1 - eio(sg(t, ti8 - 0.08, ti8 + 0.08))); pregunta.scale.multiplyScalar(1 + 0.05 * pulso(t, W[42], 0.3)); }
    // barra de progreso: 0 % (vacía) → 20 % (con dos sellos)
    const pOn = zonaA && t > ti8 + 0.1 && t < S["s08-excusa"] + 0.3;
    const pS = pOn ? bk(sg(t, ti8 + 0.1, ti8 + 0.4)) * (1 - eio(sg(t, S["s08-excusa"] - 0.1, S["s08-excusa"] + 0.25))) : 0;
    ocultar(progreso, pOn && t > ti8 + 0.1 ? lerp(0.6, 1, bk(sg(t, ti8 + 0.1, ti8 + 0.4))) * salir(t, S["s08-excusa"] - 0.12) : 0);
    progreso.position.set(0, CEN.y - 1.55, X0.z + 0.1); progreso.rotation.set(-0.1, 0, 0);
    const fr = 0.2 * eio(sg(t, S["s07-camino"] + 0.25, S["s07-camino"] + 0.85));
    relleno.visible = fr > 0.01; relleno.scale.set(Math.max(0.001, PW * fr), 1, 1); relleno.position.x = -PW / 2 + (PW * fr) / 2;
    flecha.visible = fr > 0.02; flecha.position.set(-PW / 2 + PW * fr + 0.04 + 0.05 * Math.sin(t * 9) * (fr >= 0.199 ? 1 : 0), 0, 0.04);
    // "0 %" en "cero" (cae y rebota) → "20 %" en "camino"
    const cayo = sg(t, W[47] - 0.1, W[47] + 0.2);
    const ch = sg(t, S["s07-camino"] + 0.28, S["s07-camino"] + 0.7);
    const numY = CEN.y + 1.58;
    ponerNum(n0, pOn && t > W[47] - 0.1 ? lerp(0.5, 1, bk(sg(t, W[47] - 0.1, W[47] + 0.15))) * salir(t, flip7 - 0.12) : 0, 1, 1);
    n0.position.set(0, numY + (1 - cayo * cayo) * 0.2 + Math.max(0, Math.sin((t - W[47] - 0.2) * 14)) * 0.12 * Math.exp(-Math.max(0, t - W[47] - 0.2) * 6) * (t > W[47] + 0.2 ? 1 : 0), X0.z + 0.1);
    ponerNum(n20, pOn && ch > 0.5 ? lerp(0.5, 1, bk(sg(ch, 0.5, 1))) * salir(t, S["s08-excusa"] - 0.12) : 0, 1, 1);
    n20.position.set(0, numY, X0.z + 0.1); n0.rotation.set(0, Math.sin(t) * 0.1, 0); n20.rotation.set(0, Math.sin(t) * 0.1, 0);
    // el moño (en "excusa") sobre los dos sellos y la etiqueta que se hamaca (en "por estrenarla")
    const mOn = zonaA && t > W[60] - 0.25 && t < fin8;
    const ms = mOn ? lerp(0.5, 1, bk(sg(t, W[60] - 0.25, W[60] + 0.1))) : 0;
    C10.updateMatrixWorld(true);
    const pm = C10.localToWorld(V(C10.userData.W / 2 - 0.5, CARD_H / 2 + 0.36, 0.14));
    ocultar(mono, ms * 1.1); mono.position.copy(pm).add(V(0, (1 - sg(t, W[60] - 0.25, W[60])) * 0.2, 0)); mono.quaternion.copy(C10.quaternion);
    if (mono.visible) mono.scale.multiplyScalar(1 + 0.15 * pulso(t, W[60] + 0.05, 0.3));
    const eOn = zonaA && t > W[61] - 0.3 && t < fin8;
    const es = eOn ? lerp(0.4, 1, bk(sg(t, W[61] - 0.3, W[61] + 0.05))) : 0;
    ocultar(etiqueta, es);
    const anclaE = C10.localToWorld(V(-C10.userData.W / 2 + 0.5, -CARD_H / 2 - 0.02, 0.08));
    const largo = 0.55;
    const ang = Math.sin((t - W[61]) * 6) * 0.35 * Math.exp(-Math.max(0, t - W[61]) * 1.6) + 0.12;
    etiqueta.position.copy(anclaE).add(V(0, 0, 0.06));
    etiqueta.rotation.set(0, 0, ang);
    hilo.scale.set(1, largo, 1); hilo.position.set(0, -largo / 2, 0);
    etiq.position.set(0.75, -largo - 0.36, 0); etiq.rotation.set(0, 0, -0.12);
  }

  // ---- la zona B: personajes y el celular grande ----
  ponerPersonajes(t);
  {
    // sube en "Graciela arranca con dos" (la tarjeta de puntos) y otra vez en "le llega un aviso" (pantalla bloqueada)
    // entra desde abajo y sale por la derecha (al bajar, el texto pasaba por debajo del logo)
    const e1 = eo(sg(t, S["s10-graciela"] - 0.08, S["s10-graciela"] + 0.25)), x1 = eio(sg(t, S["s11-aviso"] - 0.12, S["s11-aviso"] + 0.14));
    const e2 = eo(sg(t, W[77] - 0.2, W[77] + 0.12)), x2 = eio(sg(t, S["s12-tu-local"] - 0.14, S["s12-tu-local"] + 0.12));
    const segundo = t > (S["s11-aviso"] + W[77]) / 2;
    const ent = segundo ? e2 : e1, sal = segundo ? x2 : x1;
    const u = sal >= 1 ? 0 : ent;
    telefono.visible = !zonaA && u > 0.002;
    const kf = Math.tan((camera.fov * D2R) / 2) / Math.tan(17 * D2R);
    let jx = 0;
    let jr = 0;
    if (en(t, W[78] - 0.05, W[78] + 0.55)) { jx = Math.sin(t * 95) * 0.012; jr = Math.sin(t * 80) * 0.05; }
    telefono.position.set((0.0 + jx + sal * 0.75 - (1 - ent) * 0.75) * kf, -0.028 * kf, -1);
    telefono.rotation.set(-0.06, Math.sin(t * 0.8) * 0.08 - sal * 0.4, Math.sin(t * 0.6) * 0.015 + (1 - ent) * 0.25 - sal * 0.25 + jr);
    const pop = 1 + 0.05 * pulso(t, W[72] - 0.02, 0.26) + 0.04 * pulso(t, W[78] + 0.05, 0.25);
    telefono.scale.setScalar(0.145 * kf * pop);
    let tx = pantallas.cero;
    if (t >= W[72] - 0.02) tx = pantallas.dos;
    if (t >= S["s11-aviso"]) tx = pantallas.bloqueo;
    if (t >= W[78] + 0.05) tx = pantallas.aviso;
    if (pantallaMat.map !== tx) { pantallaMat.map = tx; pantallaMat.needsUpdate = true; }
    telefono.traverse((o) => { if (o.isMesh && o.material.map !== undefined && o.userData.orden === 2 && o.material.map !== tx) { o.material.map = tx; o.material.needsUpdate = true; } });
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
