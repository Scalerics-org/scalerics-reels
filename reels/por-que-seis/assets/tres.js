// Capa 3D de por-que-seis (Three.js r170 local). Base técnica: reels/caso-pedidosya.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek); azar con semilla; nada de rAF ni Date.
// Fondo crema liso (lo pone el HTML): el canvas es transparente y las sombras son manchas navy suaves.
// Objetos: la mesa de degustación de 24 frascos (tarima en gradas, mantel navy con ribete verde, plato con
// galletitas, cartelito "Degustación", vasito con cucharitas), la mesa de 6, los frascos de vidrio con
// mermelada de colores de fruta y tapa de tela cuadrillé atada con hilo, la gente (siluetas sin cara), las
// canastas verdes del súper, la cucharita, el celular (catálogo suelto → tienda → videollamada), el local.
// Sin marcas: etiquetas con una frutita dibujada, chat genérico navy/crema.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { E, W, DUR } from "./tiempos3d.js";

// ---------- tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
// entradas y salidas sin motas: entra desde el 60 % con rebote, sale hasta el 60 % y desaparece
const pin = (t, a, b) => (t < a ? 0 : 0.6 + 0.4 * bk(sg(t, a, b)));
const pout = (t, a, b) => (t >= b ? 0 : 1 - 0.4 * eio(sg(t, a, b)));
const en = (t, a, b) => t >= a && t < b;
const S = E;
const D2R = Math.PI / 180;
let semilla = 2000;
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
renderer.sortObjects = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1080 / 1920, 0.05, 200);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x6d6c66);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.4, 9, -6, 2, 2, Math.PI / 2.4, 0xfff4e2, 3.2);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xe8f0ff, 2.2);
  tira(12, 1.6, 0, 7, 0, 0, 0xffffff, 1.6);
  tira(1.0, 6, 3, 2, 6, Math.PI, 0xffffff, 2.0);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshBasicMaterial({ color: 0xf2f0e6, side: THREE.DoubleSide }));
  top.position.y = 9; top.rotation.x = Math.PI / 2; env.add(top);
  const piso = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshBasicMaterial({ color: 0x8f8d84, side: THREE.DoubleSide }));
  piso.position.y = -4; piso.rotation.x = Math.PI / 2; env.add(piso);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.03);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.75;
const ENV = scene.environment;

const key = new THREE.DirectionalLight(0xfff0dc, 2.3); key.position.set(-4, 7, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xdfe9ff, 1.6); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xffffff, 0xb9b6a6, 0.9); scene.add(fill);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xdedccf, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x9a9890, madera: 0xc9965a };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45), gd: mat(C.gd, 0.5), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.65),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.55), navy3: mat(C.navy3, 0.55), edge: mat(C.edge, 0.5),
  red: mat(C.red, 0.5), white: mat(C.white, 0.5), madera: mat(C.madera, 0.6), maderaD: mat(0xa8763f, 0.6),
  galle: mat(0xe2b877, 0.7), oscuro: mat(0x131a26, 0.7), metal: mat(0xc9c6bb, 0.35, { metalness: 0.6 }),
  numG: mat(C.g, 0.38, { emissive: C.g, emissiveIntensity: 0.12 }), numGd: mat(0x2f8a06, 0.45),
  numR: mat(C.red, 0.4), numRd: mat(0x9c4a42, 0.5),
  numN: mat(C.navy2, 0.4), numNd: mat(C.navy, 0.5),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };
const tex2d = (w, h, dibujar) => { const c = document.createElement("canvas"); c.width = w; c.height = h; dibujar(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };

// sombras de contacto: navy suave sobre el crema
const sombraTex = tex2d(256, 256, (x) => {
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(11,18,32,0.42)"); gr.addColorStop(0.55, "rgba(11,18,32,0.2)"); gr.addColorStop(1, "rgba(11,18,32,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
});
const sombra = (w, d, padre = scene) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.renderOrder = -1; padre.add(m); return m;
};
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }

const font = new FontLoader().parse(LEXEND);
const numero = (s, matF, matL, size = 1, depth = 0.32) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 8, bevelEnabled: true, bevelThickness: depth * 0.22, bevelSize: size * 0.03, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return new THREE.Mesh(g, [matF, matL]);
};

// ================= FRASCO DE MERMELADA =================
// vidrio (lathe transparente con brillo), mermelada adentro (lathe opaco del color de la fruta, con aire arriba),
// tapa metálica cubierta con tela cuadrillé (disco + faldón con ondas), hilo atado con moño, etiqueta crema.
const FRUTAS = [
  { n: "frutilla", c: 0x8e2a3a }, { n: "durazno", c: 0xe39a3c }, { n: "arandano", c: 0x3b2a5a },
  { n: "naranja", c: 0xe07a1f }, { n: "ciruela", c: 0x5a2440 }, { n: "higo", c: 0x7a4a3a },
];
const JR = 0.2; // radio del frasco
const vidrioGeo = (() => {
  const p = [[0.0, 0.0], [0.165, 0.0], [0.19, 0.012], [0.2, 0.04], [0.2, 0.4], [0.193, 0.428], [0.172, 0.448], [0.166, 0.46], [0.166, 0.5]].map(([a, b]) => new THREE.Vector2(a, b));
  return new THREE.LatheGeometry(p, 40);
})();
const bordeVidrioGeo = new THREE.TorusGeometry(0.2, 0.006, 6, 40).rotateX(Math.PI / 2);
const fondoVidrioGeo = new THREE.CylinderGeometry(0.17, 0.18, 0.03, 32);
const mermeGeo = (() => {
  const p = [[0.0, 0.02], [0.17, 0.02], [0.186, 0.04], [0.186, 0.37], [0.17, 0.38], [0.0, 0.385]].map(([a, b]) => new THREE.Vector2(a, b));
  return new THREE.LatheGeometry(p, 36);
})();
const tapaGeo = new THREE.CylinderGeometry(0.172, 0.172, 0.05, 32);
const telaTopGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.022, 36);
const faldonGeo = (() => {
  const g = new THREE.CylinderGeometry(0.192, 0.245, 0.11, 48, 2, true);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i); if (y > -0.05) continue;
    const x = p.getX(i), z = p.getZ(i), a = Math.atan2(z, x);
    const k = 1 + 0.06 * Math.sin(a * 9) + 0.03 * Math.sin(a * 5 + 1);
    p.setX(i, x * k); p.setZ(i, z * k); p.setY(i, y + 0.018 * Math.sin(a * 9 + 0.6));
  }
  g.computeVertexNormals(); return g;
})();
const hiloGeo = new THREE.TorusGeometry(0.188, 0.008, 6, 40).rotateX(Math.PI / 2);
const monoGeo = new THREE.TorusGeometry(0.035, 0.008, 6, 14);
const etiquetaGeo = new THREE.CylinderGeometry(0.203, 0.203, 0.19, 28, 1, true, -1.05, 2.1);
const vidrioMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.06, metalness: 0, transparent: true, opacity: 0.3, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 2.2, depthWrite: false, side: THREE.FrontSide });
const vidrioBordeMat = new THREE.MeshPhysicalMaterial({ color: 0xf6fbff, roughness: 0.1, transparent: true, opacity: 0.75, clearcoat: 1, envMapIntensity: 2 });
const hiloMat = mat(0xd8c49a, 0.85);
const gingham = (col) => tex2d(128, 128, (x) => {
  x.fillStyle = "#f6f3e8"; x.fillRect(0, 0, 128, 128);
  x.globalAlpha = 0.55; x.fillStyle = col;
  for (let i = 0; i < 4; i++) { x.fillRect(i * 32, 0, 16, 128); x.fillRect(0, i * 32, 128, 16); }
  x.globalAlpha = 1;
});
const telaTexN = gingham("#16243d"), telaTexG = gingham("#3fa60a");
const telaMat = (tx, rep) => { const t = tx.clone(); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep * 0.25); t.needsUpdate = true; return mat(0xffffff, 0.85, { map: t }); };
const TELA = [
  { top: (() => { const t = telaTexN.clone(); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2.4, 2.4); t.needsUpdate = true; return mat(0xffffff, 0.85, { map: t }); })(), fal: telaMat(telaTexN, 6) },
  { top: (() => { const t = telaTexG.clone(); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2.4, 2.4); t.needsUpdate = true; return mat(0xffffff, 0.85, { map: t }); })(), fal: telaMat(telaTexG, 6) },
];
const etiquetaTex = FRUTAS.map((f, i) => tex2d(256, 128, (x) => {
  x.fillStyle = "#f4efdc"; x.fillRect(0, 0, 256, 128);
  x.strokeStyle = "#16243d"; x.lineWidth = 5; x.strokeRect(10, 10, 236, 108);
  const c = "#" + f.c.toString(16).padStart(6, "0");
  x.fillStyle = c;
  const cx = 128, cy = 62;
  if (f.n === "frutilla") { x.beginPath(); x.moveTo(cx, cy + 34); x.bezierCurveTo(cx - 40, cy + 6, cx - 30, cy - 26, cx, cy - 20); x.bezierCurveTo(cx + 30, cy - 26, cx + 40, cy + 6, cx, cy + 34); x.fill(); x.fillStyle = "#f4efdc"; [[-10, -4], [10, -2], [0, 12], [-6, 20], [8, 16]].forEach(([a, b]) => { x.beginPath(); x.arc(cx + a, cy + b, 2.6, 0, 7); x.fill(); }); }
  else if (f.n === "arandano") { [[-18, 8], [18, 8], [0, -14]].forEach(([a, b]) => { x.beginPath(); x.arc(cx + a, cy + b, 18, 0, 7); x.fill(); }); }
  else if (f.n === "ciruela" || f.n === "higo") { x.beginPath(); x.ellipse(cx, cy + 6, f.n === "higo" ? 24 : 28, f.n === "higo" ? 32 : 28, 0, 0, 7); x.fill(); }
  else { x.beginPath(); x.arc(cx, cy + 4, 30, 0, 7); x.fill(); if (f.n === "naranja") { x.strokeStyle = "#f4efdc"; x.lineWidth = 3; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(cx, cy + 4); x.lineTo(cx + 22 * Math.cos(k * 1.047), cy + 4 + 22 * Math.sin(k * 1.047)); x.stroke(); } } }
  x.fillStyle = "#3fa60a"; x.beginPath(); x.ellipse(cx + 14, cy - 30, 14, 7, -0.5, 0, 7); x.fill();
  x.fillStyle = "#16243d"; x.globalAlpha = 0.55; rr(x, 40, 100, 176, 7, 3); x.globalAlpha = 1;
  void i;
}));
const etiquetaMat = etiquetaTex.map((t) => mat(0xffffff, 0.7, { map: t }));
// materiales de mermelada por grupo (la mesa grande se "apaga" a gris)
const mermeMat = () => FRUTAS.map((f) => new THREE.MeshPhysicalMaterial({ color: f.c, roughness: 0.28, clearcoat: 0.6, clearcoatRoughness: 0.15, emissive: f.c, emissiveIntensity: 0.12 }));
const MERME_A = mermeMat(), MERME_B = mermeMat(), MERME_X = mermeMat();
const GRIS = new THREE.Color(0xb9b7ad);
function frasco(f, tela, mm) {
  const g = new THREE.Group();
  g.add(mesh(mermeGeo, mm[f]));
  g.add(mesh(etiquetaGeo, etiquetaMat[f]));
  g.add(mesh(fondoVidrioGeo, vidrioBordeMat, 0, 0.015, 0));
  const v = mesh(vidrioGeo, vidrioMat); v.renderOrder = 2; g.add(v);
  const tapa = new THREE.Group(); tapa.position.y = 0.0;
  tapa.add(mesh(tapaGeo, M.metal, 0, 0.525, 0));
  tapa.add(mesh(telaTopGeo, TELA[tela].top, 0, 0.56, 0));
  tapa.add(mesh(faldonGeo, TELA[tela].fal, 0, 0.5, 0));
  tapa.add(mesh(hiloGeo, hiloMat, 0, 0.49, 0));
  const m1 = mesh(monoGeo, hiloMat, -0.03, 0.49, 0.2); m1.rotation.y = 0.3; tapa.add(m1);
  const m2 = mesh(monoGeo, hiloMat, 0.03, 0.49, 0.2); m2.rotation.y = -0.3; tapa.add(m2);
  g.add(tapa);
  g.userData.tapa = tapa;
  return g;
}

// ================= MESA DE DEGUSTACIÓN =================
function cartelito(texto) {
  const t = tex2d(512, 160, (x) => {
    x.fillStyle = "#f4efdc"; x.fillRect(0, 0, 512, 160);
    x.fillStyle = "#0b1220"; x.font = '800 64px "Lexend", sans-serif'; x.textAlign = "center"; x.fillText(texto, 256, 104);
    x.fillStyle = "#5ce611"; x.fillRect(150, 126, 212, 10);
  });
  const m = mat(0xffffff, 0.7, { map: t });
  const g = new THREE.Group();
  const a = mesh(new THREE.PlaneGeometry(0.95, 0.3), m); a.rotation.x = -0.32; a.position.set(0, 0.14, 0.05); g.add(a);
  const b = mesh(new THREE.PlaneGeometry(0.95, 0.3), M.cr2); b.rotation.x = 0.32; b.position.set(0, 0.14, -0.05); b.rotation.y = Math.PI; g.add(b);
  return { g, mat: m, tex: t };
}
const cucharitaGeo = (() => {
  const mango = new THREE.CylinderGeometry(0.012, 0.016, 0.42, 8); mango.translate(0, 0.21, 0);
  const cuenco = new THREE.SphereGeometry(0.05, 14, 10); cuenco.scale(0.8, 0.35, 1.15); cuenco.translate(0, 0.0, 0.0);
  return { mango, cuenco };
})();
function cucharita(m = M.madera) { const g = new THREE.Group(); g.add(mesh(cucharitaGeo.mango, m)); const c = mesh(cucharitaGeo.cuenco, m); c.rotation.x = Math.PI / 2; g.add(c); return g; }
function mesa(ancho, prof, filas) {
  const g = new THREE.Group();
  g.add(mesh(rbox(ancho, 1.0, prof, 0.05), M.navy2, 0, 0.5, 0)); // mantel que cae hasta el piso
  g.add(mesh(rbox(ancho + 0.02, 0.07, prof + 0.02, 0.03), M.g, 0, 0.08, 0)); // ribete verde abajo
  g.add(mesh(rbox(ancho + 0.06, 0.06, prof + 0.06, 0.03), M.navy, 0, 1.0, 0)); // canto del tablero
  g.add(mesh(rbox(ancho - 0.16, 0.03, prof - 0.16, 0.012), M.white, 0, 1.035, 0)); // camino blanco
  // tarima en gradas (blanca)
  const zf = prof / 2 - 0.62;
  for (let r = 0; r < filas; r++) {
    const h = 0.1 + r * 0.2, z = zf - r * 0.48;
    g.add(mesh(rbox(ancho - 0.3, h, 0.48, 0.03), M.white, 0, 1.03 + h / 2, z));
  }
  return { g, zFila: (r) => zf - r * 0.48, yFila: (r) => 1.03 + 0.1 + r * 0.2 };
}
// mesa grande (24)
const MESA_A = { x: 0, z: 0 };
const mA = mesa(4.1, 2.3, 3);
mA.g.position.set(MESA_A.x, 0, MESA_A.z); scene.add(mA.g);
const sombraA = sombra(5.6, 3.4);
const cartA = cartelito("Degustación"); cartA.g.position.set(0.15, 1.03, 0.92); mA.g.add(cartA.g);
{
  // plato con galletitas
  const plato = grupo(mesh(new THREE.CylinderGeometry(0.33, 0.27, 0.04, 32), M.white));
  for (let i = 0; i < 6; i++) { const a = i * 1.05; const gg = mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.025, 16), M.galle, Math.cos(a) * 0.18, 0.035 + (i % 2) * 0.012, Math.sin(a) * 0.18); gg.rotation.z = 0.1 * (i % 3); plato.add(gg); }
  plato.position.set(-1.35, 1.05, 0.88); mA.g.add(plato);
  // vasito con cucharitas
  const vaso = grupo(mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.22, 20), M.cr2, 0, 0.11, 0));
  [[-0.03, 0.2], [0.04, -0.15], [0.0, 0.05]].forEach(([x, rz], i) => { const c = cucharita(); c.position.set(x, 0.05, (i - 1) * 0.03); c.rotation.set(0.1 * (i - 1), 0, rz); vaso.add(c); });
  vaso.position.set(1.4, 1.03, 0.9); mA.g.add(vaso);
}
const frascosA = [];
for (let r = 0; r < 3; r++) for (let i = 0; i < 8; i++) {
  const f = (i + r * 3) % 6;
  const j = frasco(f, (i + r) % 2, MERME_A);
  const home = new THREE.Vector3(MESA_A.x - 1.54 + i * 0.44, mA.yFila(r), MESA_A.z + mA.zFila(r));
  j.userData.home = home; j.userData.f = f; j.position.copy(home); scene.add(j); frascosA.push(j);
}
// mesa chica (6), adelante
const MESA_B = { x: 0.15, z: 4.5 };
const mB = mesa(3.1, 1.5, 1);
mB.g.position.set(MESA_B.x, 0, MESA_B.z); scene.add(mB.g);
const sombraB = sombra(4.4, 2.6);
let platoB = null;
const cartB = cartelito("Degustación"); cartB.g.position.set(-0.75, 1.03, 0.5); cartB.g.scale.setScalar(0.8); mB.g.add(cartB.g);
{
  const plato = grupo(mesh(new THREE.CylinderGeometry(0.28, 0.23, 0.04, 32), M.white));
  for (let i = 0; i < 5; i++) { const a = i * 1.25; plato.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.025, 16), M.galle, Math.cos(a) * 0.15, 0.035, Math.sin(a) * 0.15)); }
  plato.position.set(0.85, 1.05, 0.5); mB.g.add(plato); platoB = plato;
}
const frascosB = [];
for (let i = 0; i < 6; i++) {
  const f = [0, 1, 2, 3, 4, 5][i];
  const j = frasco(f, i % 2, MERME_B);
  const home = new THREE.Vector3(MESA_B.x - 1.1 + i * 0.44, mB.yFila(0), MESA_B.z + mB.zFila(0));
  j.userData.home = home; j.position.copy(home); scene.add(j); frascosB.push(j);
}
// frascos sueltos: caen en las canastas, salen de la tienda
const sueltos = Array.from({ length: 14 }, (_, i) => { const j = frasco(i % 6, i % 2, MERME_X); j.visible = false; scene.add(j); return j; });

// ================= GENTE (siluetas sin cara) =================
const cuerpoGeo = new THREE.CapsuleGeometry(0.21, 0.78, 4, 14); cuerpoGeo.translate(0, 0.62, 0);
const cabezaGeo = new THREE.SphereGeometry(0.17, 18, 12);
const GENTE_A = [[-2.45, -0.75], [-2.6, 0.25], [-2.4, 1.2], [-1.55, 1.75], [-0.5, 1.85], [0.5, 1.8], [1.5, 1.75], [2.4, 1.2], [2.6, 0.25], [2.45, -0.75], [-1.1, -1.6], [0.9, -1.65], [-2.0, 2.35], [0.0, 2.45], [2.0, 2.35]];
const GENTE_B = [[-1.9, 5.15]];
const persona = (i) => {
  const m = i % 3 === 0 ? M.navy3 : i % 3 === 1 ? M.navy2 : M.edge;
  const g = grupo(mesh(cuerpoGeo, m), mesh(cabezaGeo, m, 0, 1.43, 0));
  const s = sombra(0.9, 0.9, g); s.position.y = 0.01; scene.add(g); return g;
};
const genteA = GENTE_A.map((p, i) => ({ o: persona(i), p, d: 0.55 + azar() * 0.25 }));
const genteB = GENTE_B.map((p, i) => ({ o: persona(i + 1), p, d: 0.6 }));

// ================= CANASTAS DEL SÚPER (verde de marca, asas navy) =================
const agujerosTex = (() => {
  const c = document.createElement("canvas"); c.width = 256; c.height = 128; const x = c.getContext("2d");
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, 256, 128);
  x.globalCompositeOperation = "destination-out";
  for (let j = 0; j < 3; j++) for (let i = 0; i < 7; i++) { x.beginPath(); x.roundRect(14 + i * 34, 30 + j * 30, 22, 18, 6); x.fill(); }
  x.globalCompositeOperation = "source-over";
  const t = new THREE.CanvasTexture(c); return t;
})();
const paredMat = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.45, alphaMap: agujerosTex, alphaTest: 0.5, side: THREE.DoubleSide });
function canasta() {
  const g = new THREE.Group();
  const W2 = 1.15, H2 = 0.56, D2 = 0.78;
  g.add(mesh(rbox(W2 - 0.1, 0.05, D2 - 0.1, 0.02), M.gd, 0, 0.025, 0));
  const pf = new THREE.PlaneGeometry(W2, H2), pl = new THREE.PlaneGeometry(D2, H2);
  const a = mesh(pf, paredMat, 0, H2 / 2, D2 / 2); a.rotation.x = -0.06; g.add(a);
  const b = mesh(pf, paredMat, 0, H2 / 2, -D2 / 2); b.rotation.x = 0.06; g.add(b);
  const c = mesh(pl, paredMat, W2 / 2, H2 / 2, 0); c.rotation.y = Math.PI / 2; g.add(c);
  const d = mesh(pl, paredMat, -W2 / 2, H2 / 2, 0); d.rotation.y = Math.PI / 2; g.add(d);
  g.add(mesh(rbox(W2 + 0.06, 0.06, 0.06, 0.025), M.gd, 0, H2, D2 / 2), mesh(rbox(W2 + 0.06, 0.06, 0.06, 0.025), M.gd, 0, H2, -D2 / 2));
  g.add(mesh(rbox(0.06, 0.06, D2 + 0.06, 0.025), M.gd, W2 / 2, H2, 0), mesh(rbox(0.06, 0.06, D2 + 0.06, 0.025), M.gd, -W2 / 2, H2, 0));
  const asaGeo = new THREE.TorusGeometry(W2 / 2 - 0.02, 0.032, 10, 40, Math.PI);
  const asa1 = mesh(asaGeo, M.navy, 0, H2, D2 / 2); asa1.rotation.x = 1.25; g.add(asa1);
  const asa2 = mesh(asaGeo, M.navy, 0, H2, -D2 / 2); asa2.rotation.x = -1.25; g.add(asa2);
  const s = sombra(1.8, 1.4, g); s.position.y = 0.005;
  scene.add(g); return g;
}
const canastaA = canasta(), canastaB = canasta();
const CAN_A = { x: -2.6, z: 1.0 }, CAN_B = { x: -2.8, z: 4.4 };
// posiciones de los frascos dentro de una canasta (local), en capas
const ADENTRO = [];
for (const z of [-0.17, 0.17]) for (const x of [-0.3, 0, 0.3]) ADENTRO.push([x, 0.06, z]);
for (const z of [-0.17, 0.17]) for (const x of [-0.15, 0.15]) ADENTRO.push([x, 0.6, z]);
ADENTRO.push([0, 1.13, 0]);

// ================= CUCHARITA PROTAGONISTA (cuenco ovalado plano, mermelada brillante y una gota) =================
const cuchara = new THREE.Group();
const gotaMat = new THREE.MeshPhysicalMaterial({ color: FRUTAS[2].c, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.04, emissive: FRUTAS[2].c, emissiveIntensity: 0.22 });
{
  const mango = new THREE.CylinderGeometry(0.011, 0.017, 0.46, 10); mango.translate(0, 0.27, 0);
  cuchara.add(mesh(mango, M.madera));
  const cuello = new THREE.CylinderGeometry(0.017, 0.022, 0.06, 10); cuello.translate(0, 0.03, 0); cuchara.add(mesh(cuello, M.madera));
  const cuenco = new THREE.SphereGeometry(0.06, 24, 14); cuenco.scale(1.2, 1.65, 0.32); cuenco.translate(0, -0.085, 0);
  cuchara.add(mesh(cuenco, M.madera));
}
const bocado = mesh(new THREE.SphereGeometry(0.058, 20, 14), gotaMat, 0, -0.08, 0.016); bocado.scale.set(0.95, 1.25, 0.45); cuchara.add(bocado);
const gota = mesh(new THREE.SphereGeometry(0.014, 14, 10), gotaMat); scene.add(gota);
const hilo = mesh(new THREE.CylinderGeometry(0.004, 0.007, 1, 8), gotaMat); scene.add(hilo);
scene.add(cuchara);

// ================= CAPA DE ARRIBA: el "?" y los números (se dibujan después, sobre todo lo demás) =================
const hud = new THREE.Scene();
const hudG = new THREE.Group(); hudG.matrixAutoUpdate = false; hud.add(hudG);
{ const k2 = new THREE.DirectionalLight(0xfff0dc, 2.3); k2.position.set(-4, 7, 7); hud.add(k2); const r3 = new THREE.DirectionalLight(0xdfe9ff, 1.4); r3.position.set(5, 4, -6); hud.add(r3); hud.add(new THREE.HemisphereLight(0xffffff, 0xb9b6a6, 0.9)); }

// ================= "?" =================
const pregGeo = (() => {
  const pts = [[-0.25, 0.3], [-0.19, 0.5], [0, 0.59], [0.21, 0.5], [0.26, 0.3], [0.13, 0.13], [0.0, 0.03], [0, -0.13]].map(([x, y]) => new THREE.Vector3(x, y, 0));
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.09, 14, false);
})();
const pregunta = grupo(new THREE.Mesh(pregGeo, M.g), mesh(new THREE.SphereGeometry(0.105, 18, 14), M.g, 0, -0.36, 0));
pregunta.children.forEach((c) => (c.position.y -= 0.1));
hudG.add(pregunta);

// ================= NÚMEROS 3D (pegados a la cámara: arriba, limpios, nunca pisan objetos) =================
const N = {
  n24: numero("24", M.numR, M.numRd), n24b: numero("24", M.numR, M.numRd), n6: numero("6", M.numG, M.numGd),
  n3: numero("3", M.numR, M.numRd), n30: numero("30", M.numG, M.numGd),
};
Object.values(N).forEach((m) => { m.visible = false; hudG.add(m); });
const CUENTA = [9, 23, 41, 66, 98, 131, 167, 200];
const N200 = CUENTA.map((v) => { const m = numero(String(v), M.cr, M.cr2, 1, 0.25); m.visible = false; return m; });

// ================= CELULAR =================
const PW = 1.56, PH = 2.95;
const pantallas = {};
function lienzo(dibujar, h = 1458) { const t = tex2d(720, h, dibujar); return t; }
const celMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.62 });
const cel = new THREE.Group(); // pivote exterior (acostar) → interior (apaisar)
const celIn = new THREE.Group(); cel.add(celIn);
const pantalla = mesh(new THREE.PlaneGeometry(PW - 0.06, PH - 0.06), celMat, 0, 0, 0.082);
{
  celIn.add(mesh(rbox(PW + 0.16, PH + 0.16, 0.12, 0.22, 4), M.edge, 0, 0, -0.02));
  celIn.add(mesh(rbox(PW + 0.1, PH + 0.1, 0.16, 0.2, 4), M.navy));
  celIn.add(pantalla);
  celIn.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16).rotateX(Math.PI / 2), M.oscuro, 0, PH / 2 - 0.12, 0.085));
}
// grilla del catálogo que sube (otra malla con la textura larga, recortada por la pantalla)
const grillaMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.62 });
const CAB = (200 / 1458) * (PH - 0.06);
const GRILLA_H = PH - 0.06 - CAB;
const grilla = mesh(new THREE.PlaneGeometry(PW - 0.06, GRILLA_H), grillaMat, 0, -CAB / 2, 0.084);
grilla.visible = false; celIn.add(grilla);
// globito rojo con el contador (arriba a la derecha)
const globo = new THREE.Group();
globo.add(mesh(rbox(1.0, 0.56, 0.16, 0.26, 4), M.red));
N200.forEach((m) => { m.scale.setScalar(0.36); m.position.z = 0.1; globo.add(m); });
globo.position.set(PW / 2 - 0.3, PH / 2 - 0.42, 0.14); globo.scale.setScalar(0.62); celIn.add(globo);
scene.add(cel);
const celSombra = sombra(2.4, 1.2);

// ================= TARJETA "PEDIDO NUEVO" =================
const tarjetaMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45, emissive: 0xffffff, emissiveIntensity: 0.25 });
const tarjeta = grupo(mesh(rbox(1.7, 0.66, 0.07, 0.12), M.white), mesh(new THREE.PlaneGeometry(1.6, 0.58), tarjetaMat, 0, 0, 0.037));
scene.add(tarjeta);

// ================= EL LOCAL (genérico: fachada crema, toldo verde, cartel "Tu negocio") =================
const vidrieraMat = new THREE.MeshStandardMaterial({ color: 0x1f3254, emissive: 0xffe2a8, emissiveIntensity: 0.0, roughness: 0.35 });
const toldoA = mat(C.gris, 0.6), toldoB = mat(C.cr3, 0.6);
const cartelMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.0, roughness: 0.5 });
const local = (() => {
  const g = new THREE.Group();
  g.add(mesh(rbox(3.4, 3.0, 1.0, 0.06), M.white, 0, 1.5, -0.5));
  g.add(mesh(rbox(3.55, 0.55, 1.1, 0.06), M.navy2, 0, 3.0, -0.45));
  g.add(mesh(new THREE.PlaneGeometry(2.3, 0.4), cartelMat, 0, 3.0, 0.112));
  for (let i = 0; i < 9; i++) { const r = mesh(rbox(0.38, 0.1, 0.75, 0.03), i % 2 ? toldoB : toldoA, (i - 4) * 0.375, 2.48, 0.25); r.rotation.x = 0.42; g.add(r); }
  g.add(mesh(new THREE.PlaneGeometry(1.75, 1.6), vidrieraMat, -0.55, 1.2, 0.012));
  // frascos en la vidriera (tres puntitos de color)
  [0, 1, 3].forEach((f, i) => { const j = frasco(f, i % 2, MERME_X); j.scale.setScalar(0.62); j.position.set(-1.05 + i * 0.5, 0.42, 0.12); g.add(j); });
  g.add(mesh(rbox(0.8, 1.95, 0.08, 0.04), M.navy3, 1.05, 0.98, 0.02));
  g.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), M.cr, 0.78, 1.0, 0.08));
  g.add(mesh(rbox(1.9, 0.12, 0.2, 0.04), M.cr3, -0.55, 0.35, 0.06));
  [-1.55, 1.6].forEach((x) => { g.add(mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.3, 16), M.navy3, x, 0.15, 0.35)); g.add(mesh(new THREE.SphereGeometry(0.24, 14, 10), M.gd, x, 0.45, 0.35)); });
  const s = sombra(4.6, 2.0, g); s.position.set(0, 0.005, -0.2);
  return g;
})();
scene.add(local);

// ================= PANTALLAS =================
async function dibujarPantallas() {
  await document.fonts.load('800 60px "Lexend"');
  await document.fonts.load('600 60px "Lexend"');
  await document.fonts.load('500 40px "IBM Plex Mono"');
  const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
  const hex = (n) => "#" + n.toString(16).padStart(6, "0");
  const barra = (x, hora, c = "#efeee5") => { x.fillStyle = c; x.font = F(600, 34); x.textAlign = "left"; x.fillText(hora, 48, 66); x.fillRect(600, 44, 64, 26); };
  const tick = (x, cx, cy, r, fondo = "#5ce611", trazo = "#0b1220") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = trazo; x.lineWidth = r * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.45, cy + r * 0.02); x.lineTo(cx - r * 0.1, cy + r * 0.38); x.lineTo(cx + r * 0.5, cy - r * 0.36); x.stroke(); };
  // frasco dibujado: vidrio con contorno navy, mermelada, etiqueta, y la tela cuadrillé pegada a la boca, atada
  const frascoDib = (x, cx, cy, s, f, tela = 0) => {
    const c = hex(FRUTAS[f].c), T = tela ? "#3fa60a" : "#16243d";
    x.fillStyle = "#16243d"; rr(x, cx - 62 * s, cy - 44 * s, 124 * s, 136 * s, 30 * s);
    x.fillStyle = "#f4f7fb"; rr(x, cx - 56 * s, cy - 38 * s, 112 * s, 124 * s, 26 * s);
    x.fillStyle = c; rr(x, cx - 50 * s, cy - 22 * s, 100 * s, 102 * s, 22 * s);
    x.fillStyle = "rgba(255,255,255,0.5)"; rr(x, cx - 40 * s, cy - 14 * s, 11 * s, 70 * s, 5 * s);
    x.fillStyle = "#f4efdc"; rr(x, cx - 34 * s, cy + 10 * s, 68 * s, 42 * s, 6 * s);
    x.fillStyle = c; x.beginPath(); x.arc(cx, cy + 31 * s, 11 * s, 0, 7); x.fill();
    // tela: arranca arriba y baja por la boca del frasco con ondas
    x.save(); x.beginPath(); x.moveTo(cx - 50 * s, cy - 84 * s); x.lineTo(cx + 50 * s, cy - 84 * s); x.lineTo(cx + 68 * s, cy - 32 * s);
    for (let k = 0; k < 6; k++) x.arc(cx + 68 * s - (k + 0.5) * (136 / 6) * s, cy - 32 * s, (136 / 12) * s, 0, Math.PI, false);
    x.closePath(); x.fillStyle = "#f6f3e8"; x.fill(); x.clip();
    x.globalAlpha = 0.65; x.fillStyle = T;
    for (let k = -4; k <= 4; k++) x.fillRect(cx + k * 17 * s - 4.5 * s, cy - 90 * s, 9 * s, 80 * s);
    for (let k = 0; k < 4; k++) x.fillRect(cx - 80 * s, cy - 84 * s + k * 17 * s, 160 * s, 8.5 * s);
    x.globalAlpha = 1; x.restore();
    x.strokeStyle = "#16243d"; x.lineWidth = 3 * s; x.beginPath(); x.moveTo(cx - 50 * s, cy - 84 * s); x.lineTo(cx + 50 * s, cy - 84 * s); x.stroke();
    x.fillStyle = "#b8975e"; x.fillRect(cx - 56 * s, cy - 44 * s, 112 * s, 7 * s);
  };
  // 1) catálogo suelto por chat: fotos de distintos tamaños, torcidas, mezcladas con mensajes
  pantallas.chat = lienzo((x) => {
    x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, 720, 1458);
    x.fillStyle = "#1f3254"; x.fillRect(0, 0, 720, 200); barra(x, "20:14");
    x.fillStyle = "#7d8597"; x.beginPath(); x.arc(84, 146, 36, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(700, 44); x.fillText("Catálogo", 140, 162);
  });
  {
    const c = document.createElement("canvas"); c.width = 720; c.height = 2600; const x = c.getContext("2d");
    x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, 720, 2600);
    let sd = 11; const r = () => ((sd = (sd * 16807) % 2147483647) / 2147483647);
    // chat saturado: fotos chicas de distintos tamaños, torcidas y encimadas, con globitos de texto entre medio
    const foto = (cx, cy, w, h, rot) => {
      x.save(); x.translate(cx, cy); x.rotate(rot);
      x.fillStyle = "#ffffff"; rr(x, -w / 2 - 7, -h / 2 - 7, w + 14, h + 14, 12);
      const fondos = ["#dedccf", "#c9d3e6", "#f4efdc", "#e3e9d6"];
      x.fillStyle = fondos[Math.floor(r() * 4)]; rr(x, -w / 2, -h / 2, w, h, 8);
      frascoDib(x, 0, h * 0.06, (h / 230) * 0.95, Math.floor(r() * 6), Math.floor(r() * 2));
      x.restore();
    };
    const globito = (yy) => { const der = r() < 0.5, w = 160 + r() * 260; const X = der ? 720 - 24 - w : 24; x.fillStyle = der ? "#c9d3e6" : "#ffffff"; rr(x, X, yy, w, 54, 20); x.fillStyle = "#7d8597"; rr(x, X + 20, yy + 21, w - 70, 12, 6); };
    let Y = 10;
    while (Y < 2560) {
      if (r() < 0.3) { globito(Y); Y += 66; continue; }
      const n = 3 + Math.floor(r() * 2);
      for (let k = 0; k < n; k++) {
        const w = 120 + r() * 70, h = w * (0.95 + r() * 0.25);
        foto(70 + (k + 0.5) * (580 / n) + (r() - 0.5) * 40, Y + h / 2 + 8 + r() * 26, w, h, (r() - 0.5) * 0.35);
      }
      Y += 150 + r() * 30;
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.wrapT = THREE.RepeatWrapping;
    pantallas.grilla = t; grillaMat.map = t; grillaMat.emissiveMap = t; grillaMat.needsUpdate = true;
    t.repeat.set(1, (1458 - 200) / 2600);
  }
  // 2) la tienda: lo más pedido primero, pocas categorías; elige y paga
  const tienda = (paso) => lienzo((x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 720, 1458); barra(x, "20:16", "#0b1220");
    x.fillStyle = "#0b1220"; x.font = F(800, 66); x.fillText("Tu tienda", 48, 186);
    const cats = ["Mermeladas", "Dulces", "Regalos"];
    let X = 48; x.font = F(700, 36);
    cats.forEach((c, i) => {
      const w = x.measureText(c).width + 56;
      if (paso >= 2) { x.fillStyle = i === 0 ? "#0b1220" : "#ffffff"; rr(x, X, 232, w, 70, 35); x.fillStyle = i === 0 ? "#5ce611" : "#0b1220"; x.fillText(c, X + 28, 279); }
      X += w + 14;
    });
    if (paso >= 1) {
      x.strokeStyle = "#5ce611"; x.lineWidth = 9; x.strokeRect(36, 346, 648, 520);
      [[36, 346], [684, 346], [36, 866], [684, 866]].forEach(([a, b]) => { x.fillStyle = "#ffffff"; x.fillRect(a - 11, b - 11, 22, 22); x.strokeStyle = "#5ce611"; x.lineWidth = 5; x.strokeRect(a - 11, b - 11, 22, 22); });
    }
    x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText("Los más pedidos", 60, 410);
    [[0, 0], [1, 1], [3, 0]].forEach(([f, tl], i) => {
      const cx = 144 + i * 216;
      const elegido = paso >= 3 && i === 0;
      x.fillStyle = elegido ? "#0b1220" : "#ffffff"; rr(x, cx - 96, 440, 192, 400, 30);
      frascoDib(x, cx, 610, 1.05, f, tl);
      x.fillStyle = elegido ? "#efeee5" : "#0b1220"; rr(x, cx - 70, 728, 140, 22, 10);
      x.fillStyle = "#5ce611"; rr(x, cx - 70, 768, 100, 48, 14);
      if (elegido) tick(x, cx + 62, 472, 34);
    });
    x.fillStyle = "#0b1220"; x.font = F(700, 40); x.fillText("Mermeladas", 56, 944);
    for (let i = 0; i < 4; i++) { x.fillStyle = "#ffffff"; rr(x, 48 + i * 160, 970, 144, 160, 20); frascoDib(x, 120 + i * 160, 1062, 0.55, (i + 2) % 6, i % 2); }
    x.fillStyle = "#0b1220"; rr(x, 48, 1220, 624, 170, 46);
    if (paso >= 4) { tick(x, 150, 1305, 46); x.fillStyle = "#5ce611"; x.font = F(800, 60); x.fillText("Pagado", 222, 1326); }
    else { x.fillStyle = "#efeee5"; x.font = F(800, 66); x.textAlign = "center"; x.fillText("Pagar", 360, 1330); x.textAlign = "left"; if (paso >= 3) { x.strokeStyle = "#5ce611"; x.lineWidth = 8; x.beginPath(); x.roundRect(44, 1216, 632, 178, 48); x.stroke(); } }
  });
  pantallas.t0 = tienda(0); pantallas.t1 = tienda(1); pantallas.t2 = tienda(2); pantallas.t3 = tienda(3); pantallas.t4 = tienda(4);
  // 3) la videollamada: arriba, la pantalla compartida con tu tienda (el frasco y la canasta); abajo, vos
  pantallas.llamada = lienzo((x) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, 720, 1458); barra(x, "10:00");
    x.fillStyle = "#efeee5"; rr(x, 36, 110, 648, 760, 40);
    x.fillStyle = "#0b1220"; x.font = F(800, 58); x.fillText("Tu tienda", 76, 196);
    frascoDib(x, 250, 520, 2.0, 0, 0);
    // canasta verde
    x.fillStyle = "#5ce611"; x.beginPath(); x.moveTo(400, 560); x.lineTo(640, 560); x.lineTo(612, 740); x.lineTo(428, 740); x.closePath(); x.fill();
    x.fillStyle = "#efeee5"; for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) rr(x, 432 + i * 38 + j * 3, 590 + j * 46, 22, 24, 6);
    x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.beginPath(); x.arc(520, 560, 92, Math.PI, 0); x.stroke();
    x.fillStyle = "#16243d"; rr(x, 36, 900, 648, 360, 40);
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(360, 1040, 70, 0, Math.PI * 2); x.fill(); rr(x, 250, 1120, 220, 110, 55);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(360, 1360, 62, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; rr(x, 330, 1338, 60, 44, 10);
  });
  {
    const t = tex2d(640, 232, (x) => {
      x.fillStyle = "#ffffff"; x.fillRect(0, 0, 640, 232);
      tick(x, 100, 116, 62);
      x.fillStyle = "#0b1220"; x.font = F(800, 62); x.fillText("Pedido nuevo", 186, 100);
      x.fillStyle = "#0b1220"; x.font = F(600, 52); x.fillText("Mermelada x 2", 186, 172);
    });
    tarjetaMat.map = t; tarjetaMat.emissiveMap = t; tarjetaMat.needsUpdate = true;
  }
  {
    const t = tex2d(690, 120, (x) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, 690, 120); x.fillStyle = "#efeee5"; x.font = F(800, 70); x.textAlign = "center"; x.fillText("Tu negocio", 345, 88); });
    cartelMat.map = t; cartelMat.emissiveMap = t; cartelMat.needsUpdate = true;
  }
  for (const ct of [cartA, cartB]) {
    const c = ct.tex.image, x = c.getContext("2d");
    x.fillStyle = "#f4efdc"; x.fillRect(0, 0, 512, 160);
    x.fillStyle = "#0b1220"; x.font = F(800, 64); x.textAlign = "center"; x.fillText("Degustación", 256, 100);
    x.fillStyle = "#5ce611"; x.fillRect(150, 122, 212, 12);
    ct.tex.needsUpdate = true;
  }
  celMat.map = pantallas.chat; celMat.emissiveMap = pantallas.chat; celMat.needsUpdate = true;
}
hud.environment = ENV; hud.environmentIntensity = 0.75;

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ]: curva Catmull-Rom continua, sin cortes.
const w = (i) => W[i];
const RING = { x: 0, y: 2.15, z: 1.0 };
const CEL = { x: 0, y: 2.15, z: 1.0 };
const CAM = [
  [0, -8, 34, 12.9, 0, 2.15, 0.3],
  [2.4, -1, 30, 12.6, 0, 2.1, 0.3],
  [w(7) + 0.35, 4, 27, 13.4, 0.05, 1.75, 2.6],
  [w(11), 7, 28, 13.6, 0.05, 1.75, 2.7],
  [S["s03-porque"] + 0.3, 9, 27, 13.6, 0.1, 1.6, 3.0],
  [w(14), 0, 36, 18.5, 0.15, 1.3, 2.0],
  [S["s04-gente"] + 0.3, 0, 40, 16.6, 0.15, 1.35, 2.0],
  [w(22), -2, 40, 16.9, 0.15, 1.3, 2.0],
  [S["s05-tres"] + 0.45, -6, 50, 7.4, CAN_A.x, 0.35, CAN_A.z - 0.75],
  [w(29) - 0.1, 0, 48, 7.0, CAN_A.x, 0.35, CAN_A.z - 0.75],
  [(w(29) + w(31)) / 2, -4, 52, 9.8, (CAN_A.x + CAN_B.x) / 2, 0.3, (CAN_A.z + CAN_B.z) / 2 + 0.2],
  [w(31), -8, 48, 7.2, CAN_B.x, 0.35, CAN_B.z - 0.8],
  [w(33) + 0.0, -4, 46, 6.6, CAN_B.x + 0.2, 0.4, CAN_B.z - 1.0],
  [w(33) + 0.3, 4, 40, 2.9, -0.07, 1.6, 4.63],
  [w(33) + 0.5, 3, 39, 2.8, -0.07, 1.62, 4.63],
  [w(36) + 0.05, 0, 38, 2.6, -0.07, 1.65, 4.63],
  [S["s08-despues"] + 0.32, -3, 6, 10.2, RING.x, RING.y - 0.1, RING.z],
  [w(43), 3, 6, 10.0, RING.x, RING.y - 0.1, RING.z],
  [S["s09-whatsapp"] + 0.45, 2, 4, 8.5, CEL.x, 2.42, CEL.z],
  [S["s10-mesa24"] - 0.05, -3, 4, 8.3, CEL.x, 2.42, CEL.z],
  [S["s10-mesa24"] + 0.32, -6, 34, 12.0, 0, 1.75, CEL.z],
  [w(60), -2, 33, 11.8, 0, 1.75, CEL.z],
  [w(62) + 0.2, -1, 28, 10.2, 0, 1.85, CEL.z],
  [w(63) + 0.3, -2, 10, 8.6, 0, 2.2, CEL.z],
  [w(66), -4, 5, 7.9, 0, 2.48, CEL.z],
  [w(71), 5, 5, 7.9, 0, 2.48, CEL.z],
  [S["s13-paga"] + 0.4, 2, 7, 9.2, 0.38, 2.2, 1.2],
  [w(76) + 0.4, -2, 7, 9.4, 0.38, 2.2, 1.2],
  [S["s14-negocio"] + 0.7, -10, 10, 12.6, 0.2, 1.55, -0.2],
  [w(83), -12, 10, 13.0, 0.1, 1.55, -0.2],
  [S["s15-cta"] + 0.5, -4, 6, 10.4, 0, 1.25, 0.6],
  [DUR, 0, 5, 9.9, 0, 1.25, 0.6],
];
const _mira = new THREE.Vector3();
const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6]];
function ponerCamara(t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = val(a), p2 = val(b);
  const p0 = i > 0 ? val(CAM[i - 1]) : p1;
  const p3 = i + 2 < CAM.length ? val(CAM[i + 2]) : p2;
  const u2 = u * u, u3 = u2 * u;
  const v = p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
  const [az, el, ld, tx, ty, tz] = v;
  const d = Math.exp(ld);
  _mira.set(tx, ty, tz);
  camera.position.set(tx + d * Math.cos(el * D2R) * Math.sin(az * D2R), ty + d * Math.sin(el * D2R), tz + d * Math.cos(el * D2R) * Math.cos(az * D2R));
  const k = Math.min(1, 10 / d) * 0.6;
  camera.position.x += Math.sin(t * 0.7) * 0.04 * k; camera.position.y += Math.sin(t * 0.53) * 0.025 * k;
  camera.lookAt(_mira);
  camera.updateMatrixWorld();
  hudG.matrix.copy(camera.matrixWorld); hudG.matrixWorldNeedsUpdate = true;
  return d;
}
const _p = new THREE.Vector3();
const enCamara = (x, y, z) => camera.localToWorld(_p.set(x, y, z)).clone();
function ponerNumero(m, s, x, y, z, ry = 0) { ocultar(m, s < 0.07 ? 0 : s); if (m.visible) { m.position.set(x, y, z); m.rotation.set(0.06, ry, 0); } }
const resetTapa = (j) => { const tp = j.userData.tapa; tp.visible = true; tp.position.set(0, 0, 0); tp.rotation.set(0, 0, 0); tp.scale.setScalar(1); };
// posición de un frasco del anillo (elipse parada frente a la cámara, girando)
const ANG = (t) => (t - S["s08-despues"]) * 0.55;
function enAnillo(idx, t) {
  const a = ANG(t) + (idx / 24) * Math.PI * 2;
  return [RING.x + Math.sin(a) * 1.22, RING.y + Math.cos(a) * 1.5 - 0.45, RING.z + Math.cos(a) * 0.6, a];
}
// el frasco al que apunta la cucharita en cada salto
const SALTOS = () => [[w(39), -0.95], [w(40), 0.9], [w(40) + 0.34, -0.4], [w(42), 0.5]].map(([ts, off]) => {
  const k = Math.round((((Math.PI + off - ANG(ts + 0.15)) / (Math.PI * 2)) * 24) % 24 + 48) % 24;
  return [ts, k];
});

// ================= ESCENA EN EL TIEMPO =================
function renderAt(t) {
  scene.environmentRotation.y = t * 0.1;
  ponerCamara(t);

  // bisagra "¿Por qué?": las mesas se van y queda solo el "?"
  // las mesas se van antes de que nazca el "?" y vuelven con pop cuando el "?" ya se fue
  const vis = t < w(14) + 0.02 ? pout(t, w(12) - 0.32, w(12) - 0.14) : pin(t, w(14) + 0.02, w(14) + 0.32);
  // macro de la cucharita: carteles y platos afuera
  const macro = en(t, w(33) - 0.3, S["s08-despues"] + 0.3);
  cartA.g.visible = !macro; cartB.g.visible = !macro; if (platoB) platoB.visible = !macro;

  // ---- colores: la mesa grande se apaga en "menos" y vuelve en "experimento" ----
  {
    const apaga = eio(sg(t, w(8), w(8) + 0.35)) * (1 - eio(sg(t, w(14), w(15) + 0.8)));
    MERME_A.forEach((m, f) => { m.color.set(FRUTAS[f].c).lerp(GRIS, apaga * 0.85); m.emissive.set(FRUTAS[f].c).lerp(GRIS, apaga); m.emissiveIntensity = lerp(0.12, 0.05, apaga); });
  }

  // ---- mesa grande + 24 frascos (después: anillo, se cierran en el celular, la pantalla-mesa) ----
  {
    const anillo = eio(sg(t, S["s08-despues"] - 0.1, S["s08-despues"] + 0.5));
    const cierra = eio(sg(t, S["s09-whatsapp"] - 0.1, S["s09-whatsapp"] + 0.35));
    const mesaFuera = 1 - pout(t, S["s05-tres"] - 0.45, S["s05-tres"] - 0.25); // la mesa grande se va cuando llega la canasta
    const onMesa = t < S["s05-tres"] - 0.25;
    mA.g.visible = onMesa && vis > 0.01; sombraA.visible = mA.g.visible;
    const visA = vis * (1 - mesaFuera);
    mA.g.visible = mA.g.visible && visA > 0.01; sombraA.visible = mA.g.visible;
    if (mA.g.visible) { mA.g.scale.set(visA, visA, visA); mA.g.position.set(MESA_A.x, 0, MESA_A.z); sombraA.position.set(MESA_A.x, 0.005, MESA_A.z); sombraA.scale.setScalar(visA); sombraA.material.opacity = 1; }
    const pantallaMesa = en(t, S["s10-mesa24"] + 0.2, w(63) + 0.3);
    const salto = SALTOS();
    frascosA.forEach((j, idx) => {
      const h = j.userData.home;
      resetTapa(j);
      if (pantallaMesa) {
        // s09: la pantalla del celular acostado es la mesa de 24
        const fila = Math.floor(idx / 8), col = idx % 8;
        let s = 0.76 * pin(t, S["s10-mesa24"] + 0.2 + idx * 0.015, S["s10-mesa24"] + 0.5 + idx * 0.015);
        let x = -1.33 + col * 0.38, y = 1.19, z = CEL.z + (fila - 1) * 0.46;
        const quedan = [9, 12, 14], q = quedan.indexOf(idx);
        if (q < 0) { const t0 = w(61) + (idx % 6) * 0.03, u = eio(sg(t, t0, t0 + 0.18)); y -= u * 0.2; s *= pout(t, t0, t0 + 0.18); }
        else { const e = eio(sg(t, w(61) + 0.1, w(62))); x = lerp(x, (q - 1) * 0.8, e); z = lerp(z, CEL.z, e); s *= (1 + 0.6 * e) * pout(t, w(62), w(62) + 0.2); }
        ocultar(j, s); if (j.visible) { j.position.set(x, y, z); j.rotation.set(0, Math.sin(t + idx) * 0.08, 0); }
        return;
      }
      if (t >= S["s09-whatsapp"] + 0.4 || (t >= S["s05-tres"] - 0.25 && t < S["s08-despues"] - 0.02)) { j.visible = false; return; }
      const vA = vis * (1 - mesaFuera);
      let x = MESA_A.x + (h.x - MESA_A.x) * vA, y = h.y * vA, z = MESA_A.z + (h.z - MESA_A.z) * vA, ry = Math.sin(t * 0.8 + idx) * 0.05, s = vA, rz = 0;
      const ti = (idx % 8) * 0.03 + Math.floor(idx / 8) * 0.07;
      y += (1 - bk(sg(t, ti - 0.1, ti + 0.35))) * 0.25;
      y += Math.sin(Math.PI * sg(t, w(2) + (idx % 8) * 0.04, w(2) + (idx % 8) * 0.04 + 0.3)) * 0.1;
      if (t >= S["s08-despues"] - 0.02) {
        // el anillo nace del centro: cada frasco sale con pop hacia su lugar
        const ai = eo(sg(t, S["s08-despues"] - 0.02 + idx * 0.012, S["s08-despues"] + 0.25 + idx * 0.012));
        const [px, py, pz, a] = enAnillo(idx, t);
        // cada frasco aparece en su lugar del anillo con pop, uno tras otro (barrido), mientras la cámara se aleja
        x = px; y = py + (1 - ai) * 0.25; z = pz;
        ry = Math.sin(a) * 0.5; rz = Math.sin(a * 3 + t * 2) * 0.08; s = 0.9 * pin(t, S["s08-despues"] - 0.02 + idx * 0.012, S["s08-despues"] + 0.25 + idx * 0.012) * pout(t, w(45) + 0.1 + idx * 0.024, w(45) + 0.24 + idx * 0.024);
        // el frasco al que apunta la cucharita se agranda
        for (const [ts, k] of salto) if (k === idx) s *= 1 + 0.2 * Math.sin(Math.PI * sg(t, ts + 0.1, ts + 0.5));
        
      }
      ocultar(j, s);
      if (j.visible) { j.position.set(x, y, z); j.rotation.set(0, ry, rz); }
    });
  }

  // ---- mesa chica (6): entra con pop en "vendieron", se prende en "seis" ----
  {
    const entra = pin(t, w(7) - 0.05, w(7) + 0.35);
    const kB = t < S["s05-tres"] - 0.45 ? 1 : t < w(33) - 0.4 ? pout(t, S["s05-tres"] - 0.45, S["s05-tres"] - 0.25) : pin(t, w(33) - 0.4, w(33) - 0.1);
    const s = entra * kB * pout(t, S["s08-despues"] + 0.0, S["s08-despues"] + 0.2) * vis;
    mB.g.visible = s > 0.002; sombraB.visible = mB.g.visible;
    if (mB.g.visible) { mB.g.scale.setScalar(s); mB.g.position.set(MESA_B.x, 0, MESA_B.z); sombraB.position.set(MESA_B.x, 0.005, MESA_B.z); sombraB.scale.setScalar(s); }
    frascosB.forEach((j, i) => {
      const ti = w(11) - 0.1 + i * 0.07;
      const sj = s * (1 + 0.18 * Math.sin(Math.PI * sg(t, ti, ti + 0.3)));
      ocultar(j, mB.g.visible ? sj : 0);
      if (!j.visible) return;
      const h = j.userData.home;
      j.position.set(MESA_B.x + (h.x - MESA_B.x) * s, h.y * s, MESA_B.z + (h.z - MESA_B.z) * s);
      j.rotation.set(0, Math.sin(t * 0.8 + i) * 0.06, 0);
      resetTapa(j);
      const tapa = j.userData.tapa;
      if (i === 2) {
        // "No les faltaban ganas": la tapa de tela sale para arriba y se va; entra la cucharita
        const u = eio(sg(t, w(33) - 0.05, w(33) + 0.4));
        tapa.position.set(u * 0.5, u * 1.1, -u * 0.2); tapa.rotation.set(u * 0.6, 0, u * 1.2); tapa.scale.setScalar(1 - u); tapa.visible = u < 0.99;
      }
      if (i === 3) {
        // la tapa del frasco 4 sube en arco hacia la cámara y se vuelve el "?"
        const u = sg(t, w(12) - 0.7, w(12) - 0.16);
        if (u > 0 && u < 1) {
          const e = eio(u);
          const dest = enCamara(0, -0.1, -4.5);
          const src = new THREE.Vector3(j.position.x, j.position.y + 0.5 * s, j.position.z);
          const pnt = src.clone().lerp(dest, e); pnt.y += Math.sin(Math.PI * e) * 0.8;
          j.worldToLocal(_p.copy(pnt)); tapa.position.copy(_p).sub(new THREE.Vector3(0, 0.5, 0)); tapa.rotation.set(e * 1.25, e * Math.PI * 2, 0); // la tela mira a cámara mientras gira
          tapa.scale.setScalar((1 + e * 1.2) * (1 - eio(sg(u, 0.72, 1)))); // se encoge justo donde nace el "?"
        } else if (u >= 1) { tapa.visible = t >= w(14) + 0.2; tapa.position.set(0, (1 - bk(sg(t, w(14) + 0.2, w(14) + 0.55))) * 0.6, 0); }
      }
    });
  }

  // ---- "?" grande (capa de arriba) ----
  {
    const s = en(t, w(12) - 0.16, w(14) + 0.02) ? 1.2 * pin(t, w(12) - 0.16, w(12) + 0.16) * pout(t, w(14) - 0.15, w(14) + 0.02) : 0;
    ocultar(pregunta, s);
    pregunta.position.set(0, -0.24, -4.5);
    pregunta.rotation.set(0, Math.sin(t * 1.6) * 0.5 + (1 - eo(sg(t, w(12) + 0.05, w(12) + 0.5))) * 3, 0);
  }

  // ---- la gente: muchos en la grande, dos en la chica ----
  {
    const llega = (d0) => bk(sg(t, w(20) - 0.25 + d0, w(20) + 0.1 + d0));
    const se = eio(sg(t, S["s05-tres"] - 0.5, S["s05-tres"] - 0.3));
    genteA.forEach(({ o, p, d }, i) => {
      const k0 = llega(i * 0.035) * (1 - se), k = k0 < 0.55 ? 0 : k0;
      ocultar(o, k);
      if (o.visible) { const [px, pz] = p; const dir = Math.atan2(MESA_A.x - px, MESA_A.z - pz); o.position.set(px, 0, pz); o.rotation.y = dir; o.scale.setScalar(k * (0.9 + d * 0.15)); }
    });
    genteB.forEach(({ o, p }, i) => {
      const k0 = llega(0.35 + i * 0.2) * (1 - se), k = k0 < 0.55 ? 0 : k0;
      ocultar(o, k);
      if (o.visible) { o.position.set(p[0], 0, p[1]); o.rotation.y = Math.atan2(MESA_B.x - p[0], MESA_B.z - p[1]); }
    });
  }

  // ---- canastas: tres frascos en la de la grande, montones en la de la chica ----
  sueltos.forEach((j) => { j.visible = false; resetTapa(j); });
  let canAenUso = false;
  {
    const sA = en(t, S["s05-tres"] - 0.1, w(33) + 0.3) ? pin(t, S["s05-tres"] - 0.1, S["s05-tres"] + 0.25) * pout(t, w(30) + 0.05, w(30) + 0.2) : 0;
    if (sA > 0.002) {
      canAenUso = true;
      ocultar(canastaA, sA); canastaA.position.set(CAN_A.x, 0, CAN_A.z); canastaA.rotation.set(0, 0.25, 0);
      for (let k = 0; k < 3; k++) {
        const ti = w(25) - 0.1 + k * 0.17, u = sg(t, ti, ti + 0.3);
        if (u <= 0) continue;
        const j = sueltos[k]; j.visible = true; j.scale.setScalar(0.92 * sA);
        const [lx, ly, lz] = ADENTRO[k * 2];
        const reb = Math.abs(Math.sin(Math.PI * 2 * sg(t, ti + 0.3, ti + 0.55))) * 0.06 * (1 - sg(t, ti + 0.3, ti + 0.55));
        _p.set(lx, ly + (1 - u * u) * 1.2 + reb, lz); canastaA.localToWorld(_p); j.position.copy(_p); j.rotation.set(0, 0.25 + k * 0.6, 0);
      }
    }
    const vacia = en(t, S["s08-despues"] + 0.05, S["s09-whatsapp"]);
    const sB = en(t, S["s05-tres"] + 0.2, w(33) + 0.3) ? pin(t, S["s05-tres"] + 0.2, S["s05-tres"] + 0.55) * pout(t, w(33) - 0.08, w(33) + 0.08) : 0;
    if (vacia) {
      // la canasta vacía en el medio del anillo; en "dejó" se va "para después"
      const ent = pin(t, S["s08-despues"] + 0.45, S["s08-despues"] + 0.8);
      const va = eio(sg(t, w(43) - 0.1, w(44) + 0.2));
      // "se iban sin comprar": la canasta vacía cae hacia adelante y sale por abajo (por delante del anillo, sin cruzarlo)
      ocultar(canastaB, va >= 0.999 ? 0 : ent * 1.2); canastaB.position.set(RING.x + va * 0.3, RING.y - 0.72 - va * 2.8, RING.z + 0.1 + va * 2.0); canastaB.rotation.set(0.25 + va * 0.6, 0.15, -va * 0.2);
    } else {
      ocultar(canastaB, sB); canastaB.position.set(CAN_B.x, 0, CAN_B.z); canastaB.rotation.set(0, -0.2, 0);
      if (sB > 0.002) for (let k = 0; k < 11; k++) {
        const ti = w(31) - 0.05 + [0, 0.06, 0.15, 0.2, 0.29, 0.37, 0.41, 0.5, 0.6, 0.66, 0.78][k], u = sg(t, ti, ti + 0.3);
        if (u <= 0) continue;
        const j = sueltos[3 + k]; j.visible = true; j.scale.setScalar(0.92 * sB);
        const [lx, ly, lz] = ADENTRO[k];
        _p.set(lx + (1 - eo(u)) * 1.9, ly + (1 - u * u) * 0.8, lz); canastaB.localToWorld(_p); j.position.copy(_p); j.rotation.set(0, k * 0.9, 0);
      }
    }
  }

  // ---- cucharita: prueba (s06), no se decide (s07) ----
  {
    let s = 0, x = 0, y = 0, z = 0, rx = 0, rz = 0, carga = 0, gotea = 0;
    if (en(t, w(33), S["s08-despues"] + 0.05)) {
      const j = frascosB[2], base = j.position.clone();
      const baja = eio(sg(t, w(33) + 0.05, w(33) + 0.45));
      const sube = eio(sg(t, w(33) + 0.5, w(36) + 0.1));
      s = 1.45 * bk(sg(t, w(33) + 0.0, w(33) + 0.3));
      x = base.x + lerp(0.35, 0, baja) + sube * 0.04; y = base.y + lerp(1.15, 0.5, baja) + sube * 0.75; z = base.z + sube * 0.6;
      rx = -sube * 0.85; rz = lerp(0.45, 0.0, baja);
      carga = sg(t, w(33) + 0.45, w(33) + 0.5);
      gotea = sg(t, w(33) + 0.75, S["s08-despues"]);
    } else if (en(t, S["s08-despues"] + 0.05, w(45) + 0.3)) {
      const sal = SALTOS();
      let k = 0; while (k + 1 < sal.length && sal[k + 1][0] <= t) k++;
      const u = eio(sg(t, sal[k][0], sal[k][0] + 0.25));
      const A = enAnillo(sal[Math.max(0, k - 1)][1], t), B = enAnillo(sal[k][1], t);
      let dA = B[3] - A[3]; dA = ((dA % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      const aa = A[3] + dA * u;
      x = RING.x + Math.sin(aa) * 1.22; y = RING.y + Math.cos(aa) * 1.5 - 0.45 + 0.62 + Math.sin(Math.PI * u) * 0.35; z = RING.z + Math.cos(aa) * 0.6 + 0.3;
      s = 2.1 * bk(sg(t, S["s08-despues"] + 0.05, S["s08-despues"] + 0.4)) * (1 - eio(sg(t, w(43), w(45))));
      y += eio(sg(t, w(43), w(45))) * 1.2;
      rz = 0.25 * Math.sin(t * 3); rx = -0.25; carga = 1;
    }
    ocultar(cuchara, s); cuchara.position.set(x, y, z); cuchara.rotation.set(rx, 0, rz);
    bocado.visible = carga > 0; gota.visible = gotea > 0; hilo.visible = gotea > 0.05;
    gota.visible = gota.visible && cuchara.visible; hilo.visible = hilo.visible && cuchara.visible;
    if (gota.visible) {
      const pu = cuchara.localToWorld(new THREE.Vector3(0, -0.19, 0.01));
      const L = (0.02 + gotea * 0.1) * s;
      gota.position.set(pu.x, pu.y - L, pu.z); gota.scale.set(s, s * (1 + gotea * 0.4), s);
      hilo.position.set(pu.x, pu.y - L / 2, pu.z); hilo.scale.set(s, L, s);
    }
  }

  // ---- celular: nace del anillo, catálogo, se acuesta (mesa de 24), tienda, local, videollamada ----
  {
    let s = 0, x = CEL.x, y = CEL.y, z = CEL.z, rxO = 0, ryO = 0, rzIn = 0, tex = pantallas.chat, sombraOn = false, escala = 1;
    if (t >= S["s09-whatsapp"] - 0.05) {
      s = lerp(0.3, 1, eo(sg(t, S["s09-whatsapp"] - 0.05, S["s09-whatsapp"] + 0.45)));
      ryO = Math.sin(t * 0.7) * 0.08 - 0.08;
      const vib = en(t, w(52), w(54) + 0.3) ? 1 : 0;
      rzIn = vib * Math.sin(t * 40) * 0.012;
      // s09: se acuesta (pantalla para arriba, apaisado, un poco más grande) y es la mesa de 24
      const acuesta = eio(sg(t, S["s10-mesa24"] - 0.05, S["s10-mesa24"] + 0.3));
      const gira = eio(sg(t, w(62) - 0.05, w(62) + 0.35));
      const para = eio(sg(t, w(62) + 0.15, w(63) + 0.4));
      rxO = -Math.PI / 2 * acuesta * (1 - para);
      rzIn += (Math.PI / 2) * acuesta * (1 - gira);
      y = lerp(CEL.y, 1.1, acuesta * (1 - para)); ryO *= 1 - acuesta * (1 - para);
      escala = lerp(1, 1.1, acuesta * (1 - para)) * (1 + 0.05 * Math.sin(Math.PI * sg(t, w(64) - 0.1, w(65) + 0.2)));
      if (t >= w(62)) tex = t >= w(76) ? pantallas.t4 : t >= w(74) ? pantallas.t3 : t >= w(70) ? pantallas.t2 : t >= w(68) ? pantallas.t1 : pantallas.t0;
      s *= 1 - 0.035 * Math.sin(Math.PI * sg(t, w(74), w(74) + 0.2)) - 0.035 * Math.sin(Math.PI * sg(t, w(76), w(76) + 0.2));
      // s12: se corre un poco a la izquierda y baja (la canasta entra a la derecha)
      const p12 = eio(sg(t, S["s13-paga"] - 0.1, S["s13-paga"] + 0.5));
      x = lerp(x, -0.35, p12); y = lerp(y, 2.05, p12); escala = lerp(escala, 0.88, p12);
      // s13: adelante a la izquierda y más chico; el local es el protagonista
      const p13 = eio(sg(t, S["s14-negocio"] - 0.25, S["s14-negocio"] + 0.3));
      x = lerp(x, -1.12, p13); y = lerp(y, 1.15, p13); z = lerp(z, 2.2, p13); escala = lerp(escala, 0.52, p13); ryO = lerp(ryO, 0.35, p13);
      // cierre: viaja al centro dándose vuelta; del otro lado está la videollamada
      const cta = eio(sg(t, S["s15-cta"] - 0.55, S["s15-cta"] + 0.05)); // crece de frente hacia el centro, sin darse vuelta
      x = lerp(x, 0, cta); y = lerp(y, 0.42, cta); z = lerp(z, 0.6, cta); escala = lerp(escala, 1.1, cta) * (1 - 0.06 * Math.sin(Math.PI * sg(t, S["s15-cta"] - 0.06, S["s15-cta"] + 0.14)));
      ryO = lerp(ryO, Math.sin(t * 0.7) * 0.06, cta);
      if (t >= S["s15-cta"] + 0.04) tex = pantallas.llamada;
      s *= escala;
      sombraOn = acuesta * (1 - para) > 0.5 || t >= S["s14-negocio"];
      grilla.visible = t < S["s10-mesa24"] + 0.5;
      if (grilla.visible && pantallas.grilla) pantallas.grilla.offset.y = 1 - pantallas.grilla.repeat.y - eio(sg(t, S["s09-whatsapp"] + 0.3, w(54) + 0.5)) * 0.42;
    }
    ocultar(cel, s); cel.position.set(x, y, z); cel.rotation.set(rxO, ryO, 0); celIn.rotation.set(0, 0, rzIn);
    if (tex && celMat.map !== tex) { celMat.map = tex; celMat.emissiveMap = tex; celMat.needsUpdate = true; }
    celSombra.visible = sombraOn && s > 0.01; celSombra.position.set(x, 0.005, z); celSombra.scale.setScalar(Math.max(0.01, s * 1.1)); celSombra.material.opacity = 0.7;
    const gs = en(t, w(52) - 0.15, S["s10-mesa24"] + 0.1) ? bk(sg(t, w(52) - 0.15, w(52) + 0.15)) * (1 - eio(sg(t, S["s10-mesa24"] - 0.15, S["s10-mesa24"] + 0.1))) : 0;
    ocultar(globo, gs * 0.62);
    const kc = Math.floor(sg(t, w(52) - 0.05, w(53) + 0.15) * (CUENTA.length - 1) + 0.0001);
    N200.forEach((m, i) => (m.visible = i === kc));
  }

  // ---- s12: la canasta entra a la derecha; dos frascos salen por el costado del celular y caen adentro ----
  {
    const sCan = en(t, S["s13-paga"] + 0.4, S["s14-negocio"]) ? pin(t, S["s13-paga"] + 0.4, S["s13-paga"] + 0.7) * pout(t, S["s14-negocio"] - 0.3, S["s14-negocio"] - 0.12) : 0;
    if (!canAenUso) { ocultar(canastaA, sCan); canastaA.position.set(0.92, 0.55, 1.25); canastaA.rotation.set(0.12, -0.35, 0); }
    if (sCan > 0.01) {
      [[0, w(76) + 0.12, -0.15], [1, w(76) + 0.38, 0.17]].forEach(([n, t0, lx]) => {
        const j = sueltos[n], u = sg(t, t0, t0 + 0.6);
        if (u <= 0) return;
        _p.set(lx, 0.06, 0.0); canastaA.localToWorld(_p); const B = _p.clone();
        const A = new THREE.Vector3(0.45, 2.0, 1.25);
        j.visible = true; j.scale.setScalar(0.9 * sCan * bk(sg(t, t0, t0 + 0.25)));
        j.position.set(lerp(A.x, B.x, eo(u)), lerp(A.y, B.y, u * u) + Math.sin(Math.PI * u) * 0.6, lerp(A.z, B.z, eo(u)));
        j.rotation.set(0, 0.5 + u * 2, 0.3 * Math.sin(Math.PI * u));
      });
    }
  }

  // ---- el local: protagonista; le llega el pedido y se prende ----
  {
    const on = en(t, S["s14-negocio"] - 0.1, S["s15-cta"] + 0.3);
    const s = on ? 0.78 * bk(sg(t, S["s14-negocio"] - 0.05, S["s14-negocio"] + 0.4)) * (1 - eio(sg(t, S["s15-cta"] - 0.22, S["s15-cta"] + 0.02))) : 0;
    const sale = eio(sg(t, S["s15-cta"] - 0.55, S["s15-cta"] - 0.15)), llegaL = 1 - eo(sg(t, S["s14-negocio"] - 0.15, S["s14-negocio"] + 0.35));
    ocultar(local, on && sale < 0.999 ? 0.78 : 0); local.position.set(0.75 + llegaL * 5 + sale * 6, 0, -0.9); local.rotation.set(0, -0.22 + Math.sin(t * 0.5) * 0.04, 0);
    const luz = eio(sg(t, w(83) - 0.05, w(83) + 0.3));
    if (local.visible) local.scale.multiplyScalar(1 + 0.05 * Math.sin(Math.PI * sg(t, w(83) - 0.05, w(83) + 0.25)));
    vidrieraMat.emissiveIntensity = lerp(0.05, 1.1, luz);
    cartelMat.emissiveIntensity = lerp(0.1, 0.8, luz);
    toldoA.color.set(C.gris).lerp(new THREE.Color(C.g), lerp(0.25, 1, luz));
    toldoB.color.set(C.cr3).lerp(new THREE.Color(C.cr), lerp(0.25, 1, luz));
    const u = sg(t, w(80), w(83) + 0.05);
    const ts = en(t, w(80), w(83) + 0.35) ? 0.85 * bk(sg(t, w(80), w(80) + 0.3)) * (1 - eio(sg(t, w(83), w(83) + 0.3))) : 0;
    ocultar(tarjeta, ts);
    if (tarjeta.visible) { const e = eio(u); tarjeta.position.set(lerp(-1.12, 0.38, e), lerp(2.2, 1.05, e) + Math.sin(Math.PI * e) * 0.4, lerp(2.2, -0.35, e)); tarjeta.rotation.set(0, -0.2 + e * 0.1, 0.15 - e * 0.3); }
  }

  // ---- números 3D (capa de arriba) ----
  {
    const Z = -6;
    const pop = (a, b, sMax) => (en(t, a, b + 0.3) ? sMax * pin(t, a, a + 0.3) * pout(t, b, b + 0.15) : 0);
    ponerNumero(N.n3, pop(w(25) - 0.05, w(29) - 0.12, 0.5), 0, 0.78, Z, Math.sin(t * 0.9) * 0.2);
    ponerNumero(N.n30, pop(w(32) - 0.08, w(33) - 0.3, 0.5) * (1 + 0.08 * Math.sin(Math.PI * sg(t, w(32) + 0.15, w(32) + 0.45))), 0, 0.78, Z, Math.sin(t * 0.9) * 0.2);
    ponerNumero(N.n24b, pop(w(59) - 0.08, S["s11-tienda"] - 0.1, 0.5), 0, 0.78, Z, Math.sin(t * 0.9) * 0.2);
  }

  renderer.autoClear = false;
  renderer.clear();
  renderer.render(scene, camera);
  renderer.clearDepth();
  renderer.render(hud, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
dibujarPantallas().then(() => {
  renderAt(window.__hfThreeTime || 0);
  if (window.__tresListo) window.__tresListo();
});
