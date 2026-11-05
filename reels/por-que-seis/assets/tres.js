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
const GENTE_A = [[-2.75, 0.55], [-2.35, 1.6], [-1.45, 2.05], [-0.5, 1.95], [0.45, 2.1], [1.35, 1.95], [2.3, 1.65], [2.8, 0.6], [-2.95, -0.55], [2.95, -0.5], [-1.95, 2.75], [1.75, 2.8], [-0.05, 2.75]];
const GENTE_B = [[-2.05, 5.0], [2.2, 5.3]];
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
  const asa1 = mesh(asaGeo, M.navy, 0, H2, D2 / 2 + 0.02); asa1.rotation.x = 1.22; g.add(asa1);
  const asa2 = mesh(asaGeo, M.navy, 0, H2, -D2 / 2 - 0.02); asa2.rotation.x = -1.22; g.add(asa2);
  const s = sombra(1.8, 1.4, g); s.position.y = 0.005;
  scene.add(g); return g;
}
const canastaA = canasta(), canastaB = canasta();
const CAN_A = { x: -2.55, z: 1.75 }, CAN_B = { x: 2.15, z: 5.75 };
// posiciones de los frascos dentro de una canasta (local), en capas
const ADENTRO = [];
for (let k = 0; k < 3; k++) for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) ADENTRO.push([-0.34 + i * 0.34 + (k % 2) * 0.08, 0.06 + k * 0.3, -0.17 + j * 0.34]);

// ================= CUCHARITA PROTAGONISTA (con mermelada que gotea) =================
const cuchara = cucharita(M.madera);
const gotaMat = new THREE.MeshPhysicalMaterial({ color: FRUTAS[2].c, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05, emissive: FRUTAS[2].c, emissiveIntensity: 0.2 });
const bocado = mesh(new THREE.SphereGeometry(0.055, 18, 12), gotaMat, 0, 0, 0.015); bocado.scale.set(1, 0.7, 1.2); cuchara.add(bocado);
const gota = mesh(new THREE.SphereGeometry(0.018, 12, 8), gotaMat); cuchara.add(gota);
scene.add(cuchara);

// ================= "?" =================
const pregGeo = (() => {
  const pts = [[-0.25, 0.3], [-0.19, 0.5], [0, 0.59], [0.21, 0.5], [0.26, 0.3], [0.13, 0.13], [0.0, 0.03], [0, -0.13]].map(([x, y]) => new THREE.Vector3(x, y, 0));
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.09, 14, false);
})();
const pregunta = grupo(new THREE.Mesh(pregGeo, M.g), mesh(new THREE.SphereGeometry(0.105, 18, 14), M.g, 0, -0.36, 0));
pregunta.children.forEach((c) => (c.position.y -= 0.1));
camera.add(pregunta);

// ================= NÚMEROS 3D (pegados a la cámara: arriba, limpios, nunca pisan objetos) =================
const N = {
  n24: numero("24", M.numR, M.numRd), n24b: numero("24", M.numR, M.numRd), n6: numero("6", M.numG, M.numGd),
  n3: numero("3", M.numR, M.numRd), n30: numero("30", M.numG, M.numGd),
};
Object.values(N).forEach((m) => { m.visible = false; camera.add(m); });
const CUENTA = [9, 23, 41, 66, 98, 131, 167, 200];
const N200 = CUENTA.map((v) => { const m = numero(String(v), M.cr, M.cr2, 1, 0.25); m.visible = false; return m; });

// ================= CELULAR =================
const PW = 1.56, PH = 3.16;
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
const GRILLA_H = PH - 0.06 - 0.62;
const grilla = mesh(new THREE.PlaneGeometry(PW - 0.06, GRILLA_H), grillaMat, 0, -(0.62) / 2 - 0.0, 0.084);
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
  [0, 1, 3].forEach((f, i) => g.add(mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 16), mat(FRUTAS[f].c, 0.4), -1.05 + i * 0.5, 0.62, 0.08)));
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
  const logo = await new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = "assets/logo-blanco.png"; });
  const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
  const hex = (n) => "#" + n.toString(16).padStart(6, "0");
  const barra = (x, hora, c = "#efeee5") => { x.fillStyle = c; x.font = F(600, 34); x.textAlign = "left"; x.fillText(hora, 48, 66); x.fillRect(600, 44, 64, 26); };
  const tick = (x, cx, cy, r, fondo = "#5ce611", trazo = "#0b1220") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = trazo; x.lineWidth = r * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.45, cy + r * 0.02); x.lineTo(cx - r * 0.1, cy + r * 0.38); x.lineTo(cx + r * 0.5, cy - r * 0.36); x.stroke(); };
  // frasco dibujado (para las miniaturas y la tienda)
  const frascoDib = (x, cx, cy, s, f, tela = 0) => {
    const c = hex(FRUTAS[f].c), T = tela ? "#3fa60a" : "#16243d";
    // vidrio y mermelada
    x.fillStyle = "#ffffff"; rr(x, cx - 58 * s, cy - 52 * s, 116 * s, 140 * s, 30 * s);
    x.fillStyle = c; rr(x, cx - 50 * s, cy - 30 * s, 100 * s, 110 * s, 24 * s);
    x.fillStyle = "rgba(255,255,255,0.45)"; rr(x, cx - 40 * s, cy - 22 * s, 12 * s, 80 * s, 6 * s);
    // etiqueta con la frutita
    x.fillStyle = "#f4efdc"; rr(x, cx - 34 * s, cy + 4 * s, 68 * s, 44 * s, 6 * s);
    x.fillStyle = c; x.beginPath(); x.arc(cx, cy + 26 * s, 12 * s, 0, 7); x.fill();
    // tela cuadrillé con ondas, atada
    x.save(); x.beginPath(); x.moveTo(cx - 54 * s, cy - 96 * s); x.lineTo(cx + 54 * s, cy - 96 * s); x.lineTo(cx + 72 * s, cy - 50 * s);
    for (let k = 0; k < 6; k++) x.arc(cx + 72 * s - (k + 0.5) * 24 * s, cy - 50 * s, 12 * s, 0, Math.PI, false);
    x.closePath(); x.clip();
    x.fillStyle = "#f6f3e8"; x.fillRect(cx - 80 * s, cy - 100 * s, 160 * s, 70 * s);
    x.globalAlpha = 0.6; x.fillStyle = T;
    for (let k = -4; k <= 4; k++) x.fillRect(cx + k * 18 * s - 4.5 * s, cy - 100 * s, 9 * s, 70 * s);
    for (let k = 0; k < 4; k++) x.fillRect(cx - 80 * s, cy - 96 * s + k * 18 * s, 160 * s, 9 * s);
    x.globalAlpha = 1; x.restore();
    x.fillStyle = "#c9b48a"; x.fillRect(cx - 56 * s, cy - 60 * s, 112 * s, 6 * s);
  };
  // 1) catálogo suelto: cabecera fija (chat genérico) y una grilla larga de fotos que sube
  pantallas.chat = lienzo((x) => {
    x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, 720, 1458);
    x.fillStyle = "#1f3254"; x.fillRect(0, 0, 720, 200); barra(x, "20:14");
    x.fillStyle = "#7d8597"; x.beginPath(); x.arc(84, 146, 36, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(700, 44); x.fillText("Catálogo", 140, 162);
    
  });
  {
    const c = document.createElement("canvas"); c.width = 720; c.height = 2600; const x = c.getContext("2d");
    x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, 720, 2600);
    let s = 11; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const fondos = ["#ffffff", "#dedccf", "#c9d3e6", "#f4efdc"];
    for (let j = 0; j < 12; j++) for (let i = 0; i < 3; i++) {
      const X = 24 + i * 228, Y = 20 + j * 214;
      x.fillStyle = fondos[Math.floor(r() * 4)]; rr(x, X, Y, 216, 202, 18);
      const k = r();
      if (k < 0.6) frascoDib(x, X + 108, Y + 108, 0.82, Math.floor(r() * 6), Math.floor(r() * 2));
      else if (k < 0.8) { x.fillStyle = "#16243d"; rr(x, X + 40, Y + 60, 136, 96, 16); x.fillStyle = "#5ce611"; rr(x, X + 60, Y + 40, 96, 30, 10); }
      else { x.fillStyle = hex(FRUTAS[Math.floor(r() * 6)].c); x.beginPath(); x.arc(X + 108, Y + 104, 56, 0, 7); x.fill(); }
      // flechita de reenviado y precio "$" a medio poner: fotos sueltas, sin orden
      x.fillStyle = "#7d8597"; rr(x, X + 14, Y + 170, 70, 16, 8);
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.wrapT = THREE.RepeatWrapping;
    pantallas.grilla = t;
    grillaMat.map = t; grillaMat.emissiveMap = t;
    t.repeat.set(1, (1458 - 200) / 2600 * 1.0);
  }
  // 2) la tienda: lo más pedido primero, pocas categorías; elige y paga
  const tienda = (paso) => lienzo((x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 720, 1458); barra(x, "20:16", "#0b1220");
    x.fillStyle = "#0b1220"; x.font = F(800, 66); x.fillText("Tu tienda", 48, 186);
    // categorías: pocas, grandes
    const cats = ["Mermeladas", "Dulces", "Regalos"];
    let X = 48;
    x.font = F(700, 34);
    cats.forEach((c, i) => {
      const w = x.measureText(c).width + 56;
      x.fillStyle = paso >= 2 && i === 0 ? "#0b1220" : paso >= 2 ? "#ffffff" : "#e2e0d4"; rr(x, X, 232, w, 70, 35);
      x.fillStyle = paso >= 2 && i === 0 ? "#5ce611" : paso >= 2 ? "#0b1220" : "#b4b2a3"; x.fillText(c, X + 28, 279);
      X += w + 14;
    });
    // los más pedidos
    if (paso >= 1) { x.strokeStyle = "#5ce611"; x.lineWidth = 9; x.strokeRect(30, 342, 660, 530); x.fillStyle = "#ffffff"; [[30, 342], [690, 342], [30, 872], [690, 872]].forEach(([a, b]) => { x.fillRect(a - 13, b - 13, 26, 26); x.strokeStyle = "#5ce611"; x.lineWidth = 6; x.strokeRect(a - 13, b - 13, 26, 26); }); }
    x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText("Los más pedidos", 56, 410);
    [[0, 0], [1, 1], [3, 0]].forEach(([f, tl], i) => {
      const cx = 140 + i * 220;
      const elegido = paso >= 3 && i === 0;
      x.fillStyle = elegido ? "#0b1220" : "#ffffff"; rr(x, cx - 100, 440, 200, 400, 30);
      frascoDib(x, cx, 590, 1.0, f, tl);
      x.fillStyle = elegido ? "#efeee5" : "#0b1220"; rr(x, cx - 70, 718, 140, 22, 10);
      x.fillStyle = "#5ce611"; rr(x, cx - 70, 760, 100, 50, 14);
      if (elegido) tick(x, cx + 66, 470, 34);
    });
    // el resto, chiquito y ordenado
    x.fillStyle = "#59627a"; x.font = F(600, 34); x.fillText("Mermeladas", 56, 940);
    for (let i = 0; i < 4; i++) { x.fillStyle = "#ffffff"; rr(x, 48 + i * 160, 970, 144, 150, 20); frascoDib(x, 120 + i * 160, 1052, 0.5, (i + 2) % 6, i % 2); }
    // botón
    if (paso >= 4) { x.fillStyle = "#0b1220"; rr(x, 48, 1220, 624, 170, 46); tick(x, 150, 1305, 46); x.fillStyle = "#5ce611"; x.font = F(800, 60); x.fillText("Pagado", 222, 1326); }
    else { x.fillStyle = paso >= 3 ? "#5ce611" : "#d4d2c6"; rr(x, 48, 1220, 624, 170, 46); x.fillStyle = paso >= 3 ? "#0b1220" : "#8f8d84"; x.font = F(800, 66); x.textAlign = "center"; x.fillText("Pagar", 360, 1330); x.textAlign = "left"; }
  });
  pantallas.t0 = tienda(0); pantallas.t1 = tienda(1); pantallas.t2 = tienda(2); pantallas.t3 = tienda(3); pantallas.t4 = tienda(4);
  // 3) la videollamada
  pantallas.llamada = lienzo((x) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, 720, 1458); barra(x, "10:00");
    x.fillStyle = "#16243d"; rr(x, 36, 110, 648, 760, 40);
    if (logo) { const w = 440, h = (logo.height / logo.width) * w; x.drawImage(logo, 360 - w / 2, 490 - h / 2, w, h); }
    x.fillStyle = "#1f3254"; rr(x, 36, 900, 648, 360, 40);
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(360, 1040, 70, 0, Math.PI * 2); x.fill(); rr(x, 250, 1120, 220, 110, 55);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(360, 1360, 62, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; rr(x, 330, 1338, 60, 44, 10);
  });
  // tarjeta de pedido
  {
    const t = tex2d(640, 232, (x) => {
      x.fillStyle = "#ffffff"; x.fillRect(0, 0, 640, 232);
      tick(x, 100, 116, 62);
      x.fillStyle = "#0b1220"; x.font = F(800, 58); x.fillText("Pedido nuevo", 190, 104);
      x.fillStyle = "#59627a"; x.font = F(600, 40); x.fillText("Mermelada x 2", 190, 166);
    });
    tarjetaMat.map = t; tarjetaMat.emissiveMap = t; tarjetaMat.needsUpdate = true;
  }
  // cartel del local
  {
    const t = tex2d(690, 120, (x) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, 690, 120); x.fillStyle = "#efeee5"; x.font = F(800, 70); x.textAlign = "center"; x.fillText("Tu negocio", 345, 88); });
    cartelMat.map = t; cartelMat.emissiveMap = t; cartelMat.needsUpdate = true;
  }
  // re-dibujar los cartelitos con la fuente ya cargada
  for (const ct of [cartA, cartB]) {
    const c = ct.tex.image, x = c.getContext("2d");
    x.fillStyle = "#f4efdc"; x.fillRect(0, 0, 512, 160);
    x.fillStyle = "#0b1220"; x.font = F(800, 64); x.textAlign = "center"; x.fillText("Degustación", 256, 100);
    x.fillStyle = "#5ce611"; x.fillRect(150, 122, 212, 12);
    ct.tex.needsUpdate = true;
  }
  celMat.map = pantallas.chat; celMat.emissiveMap = pantallas.chat; celMat.needsUpdate = true;
}

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ]: curva Catmull-Rom continua, sin cortes.
const w = (i) => W[i];
const CAM = [
  [0, -6, 34, 11.4, 0, 1.3, 0.3],
  [w(5), -2, 33, 11.0, 0, 1.3, 0.3],
  [w(7) + 0.1, 4, 27, 13.6, 0.05, 1.3, 2.6],
  [w(11), 7, 28, 14.2, 0.05, 1.3, 2.7],
  [S["s03-porque"] + 0.3, 10, 26, 13.4, 0.1, 1.0, 3.2],
  [w(14), 4, 30, 12.2, 0.05, 1.15, 2.3],
  [S["s04-gente"] + 0.3, -8, 36, 18.5, 0, 0.8, 2.5],
  [w(22), -14, 37, 18.2, 0, 0.8, 2.3],
  [S["s05-tres"] + 0.35, -58, 46, 6.2, CAN_A.x + 0.2, 0.75, CAN_A.z],
  [w(28), -50, 44, 5.8, CAN_A.x + 0.15, 0.7, CAN_A.z],
  [S["s06-treinta"] + 0.4, 55, 46, 6.0, CAN_B.x - 0.1, 0.75, CAN_B.z],
  [w(32) + 0.3, 62, 44, 5.8, CAN_B.x - 0.1, 0.75, CAN_B.z],
  [w(33) + 0.35, 6, 16, 4.6, -0.07, 1.55, 4.63],
  [w(36) + 0.3, 0, 13, 4.2, -0.07, 1.6, 4.63],
  [S["s07-despues"] + 0.5, -6, 46, 9.8, 0, 1.75, 0.6],
  [w(44), 8, 44, 9.6, 0, 1.75, 0.6],
  [S["s08-whatsapp"] + 0.4, 2, 6, 10.2, 0, 2.3, 0],
  [w(55), -4, 5, 9.9, 0, 2.3, 0],
  [S["s09-mesa24"] + 0.5, 0, 42, 11.2, 0, 1.6, 0],
  [w(60) + 0.3, 3, 44, 10.9, 0, 1.6, 0],
  [S["s10-tienda"] + 0.8, -2, 30, 10.8, 0, 1.9, 0],
  [w(66), -6, 6, 8.8, 0, 2.45, 0],
  [S["s11-pocas"] + 0.6, 4, 5, 8.8, 0, 2.42, 0],
  [w(72), 7, 5, 8.8, 0, 2.42, 0],
  [S["s12-paga"] + 0.4, 2, 9, 11.4, 0.15, 1.55, 0.8],
  [w(77) + 0.4, -2, 10, 11.6, 0.15, 1.45, 0.8],
  [S["s13-negocio"] + 0.7, -12, 12, 14.4, 0.35, 1.55, -0.2],
  [w(84), -15, 11, 14.2, 0.35, 1.55, -0.2],
  [S["s14-cta"] + 0.4, -4, 6, 10.4, 0, 1.25, 0],
  [DUR, 0, 5, 9.8, 0, 1.25, 0],
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
  return d;
}
// un punto fijo en pantalla (coordenadas de la cámara)
const _p = new THREE.Vector3();
const enCamara = (x, y, z) => camera.localToWorld(_p.set(x, y, z)).clone();
// número pegado a la cámara: entra con pop, late, se va
function ponerNumero(m, s, x, y, z, ry = 0) { ocultar(m, s); if (m.visible) { m.position.set(x, y, z); m.rotation.set(0.06, ry, 0); } }

// ================= ESCENA EN EL TIEMPO =================
function renderAt(t) {
  scene.environmentRotation.y = t * 0.1;
  ponerCamara(t);

  // ---- colores: la mesa grande se apaga en "menos" y vuelve en "experimento" ----
  {
    const apaga = eio(sg(t, w(8), w(8) + 0.35)) * (1 - eio(sg(t, w(15), w(15) + 0.5)));
    MERME_A.forEach((m, f) => { m.color.set(FRUTAS[f].c).lerp(GRIS, apaga * 0.85); m.emissive.set(FRUTAS[f].c).lerp(GRIS, apaga); m.emissiveIntensity = lerp(0.12, 0.05, apaga); });
  }

  // ---- mesa grande + sus 24 frascos ----
  const finMesas = S["s08-whatsapp"] + 0.2;
  {
    const on = t < finMesas;
    mA.g.visible = on; sombraA.visible = on;
    sombraA.position.set(MESA_A.x, 0.005, MESA_A.z); sombraA.material.opacity = on ? 1 : 0;
    // en s07 los frascos dejan la mesa: la mesa se hunde un poco para no competir
    const anillo = eio(sg(t, S["s07-despues"] - 0.1, S["s07-despues"] + 0.55));
    const cierra = eio(sg(t, S["s08-whatsapp"] - 0.15, S["s08-whatsapp"] + 0.3));
    const ang0 = (t - S["s07-despues"]) * 0.75;
    const CEN = new THREE.Vector3(0, 2.15, 0.6);
    frascosA.forEach((j, idx) => {
      const h = j.userData.home;
      let x = h.x, y = h.y, z = h.z, ry = Math.sin(t * 0.8 + idx) * 0.05, s = 1, rx = 0, rz = 0;
      // cuadro 0: los frascos ya están, los de atrás terminan de asentarse
      const ti = (idx % 8) * 0.03 + Math.floor(idx / 8) * 0.07;
      y += (1 - bk(sg(t, ti - 0.1, ti + 0.35))) * 0.25;
      // "veinticuatro" (en la tienda de la mesa grande): un saltito en ola
      y += Math.sin(Math.PI * sg(t, w(1) + (idx % 8) * 0.04, w(1) + (idx % 8) * 0.04 + 0.3)) * 0.06;
      // s07: se despegan y giran en anillo; la cucharita no se decide
      if (anillo > 0) {
        const a = ang0 + (idx / 24) * Math.PI * 2;
        const R = 1.75;
        const px = CEN.x + Math.sin(a) * R, pz = CEN.z + Math.cos(a) * R * 0.75, py = CEN.y + Math.sin(a * 2 + t) * 0.08 + Math.cos(a) * 0.35;
        const vuelve = eio(sg(t, w(46) + 0.15, S["s08-whatsapp"] + 0.1)) * 0; // (se cierran en el celular, no vuelven)
        void vuelve;
        x = lerp(x, px, anillo); y = lerp(y, py - 0.25, anillo); z = lerp(z, pz, anillo);
        ry = lerp(ry, a, anillo); rz = Math.sin(a * 3 + t * 2) * 0.12 * anillo;
        // s08: el anillo se cierra en un punto (de ahí nace el celular)
        x = lerp(x, CEN.x, cierra); y = lerp(y, CEN.y - 0.1, cierra); z = lerp(z, CEN.z, cierra);
        s = 1 - cierra;
      }
      ocultar(j, on ? s : 0);
      if (j.visible) { j.position.set(x, y, z); j.rotation.set(rx, ry, rz); j.userData.tapa.position.y = 0; j.userData.tapa.rotation.set(0, 0, 0); }
    });
    // la mesa se va mientras los frascos giran (el anillo queda solo en el aire)
    const mesaFuera = eio(sg(t, S["s07-despues"] + 0.15, S["s07-despues"] + 0.6));
    mA.g.position.y = -mesaFuera * 1.4; mA.g.visible = on && mesaFuera < 0.99; sombraA.material.opacity = 1 - mesaFuera;
  }

  // ---- mesa chica (6): entra con pop en "vendieron", se prende en "seis" ----
  {
    const entra = bk(sg(t, w(7) - 0.05, w(7) + 0.35));
    const on = t < S["s07-despues"] + 0.4 && entra > 0.002;
    const s = entra * (1 - eio(sg(t, S["s07-despues"] - 0.1, S["s07-despues"] + 0.15)));
    mB.g.visible = on && s > 0.002; sombraB.visible = mB.g.visible;
    { const macro = en(t, w(33) - 0.2, S["s07-despues"]); cartB.g.visible = !macro; platoB.visible = !macro; }
    if (mB.g.visible) { mB.g.scale.setScalar(s); mB.g.position.set(MESA_B.x, 0, MESA_B.z); sombraB.position.set(MESA_B.x, 0.005, MESA_B.z); sombraB.scale.setScalar(s); }
    frascosB.forEach((j, i) => {
      const ti = w(11) - 0.1 + i * 0.07;
      const late = 1 + 0.18 * Math.sin(Math.PI * sg(t, ti, ti + 0.3));
      const sj = s * late;
      ocultar(j, mB.g.visible ? sj : 0);
      if (!j.visible) return;
      const h = j.userData.home;
      j.position.set(MESA_B.x + (h.x - MESA_B.x) * s, h.y * s, MESA_B.z + (h.z - MESA_B.z) * s);
      j.rotation.set(0, Math.sin(t * 0.8 + i) * 0.06, 0);
      // s06: el del medio se destapa (la tapa de tela salta y gira) y entra la cucharita
      const tapa = j.userData.tapa;
      if (i === 2) {
        const abre = eio(sg(t, w(33) - 0.05, w(33) + 0.35));
        tapa.position.set(lerp(0, 0.35, abre), lerp(0, 0.35, abre) - abre * abre * 0.2, lerp(0, -0.15, abre)); tapa.rotation.set(0, 0, abre * 1.1);
      } else { tapa.position.set(0, 0, 0); tapa.rotation.set(0, 0, 0); }
      // s02: la tapa del frasco 3 sale volando hacia la cámara y se vuelve el "?"
      if (i === 3) {
        const vuela = sg(t, w(12) - 0.25, w(12) + 0.15);
        if (vuela > 0 && vuela < 1) {
          const dest = enCamara(0, -0.1, -4.5);
          const src = new THREE.Vector3(j.position.x, j.position.y + 0.5 * s, j.position.z);
          const u = eio(vuela);
          j.worldToLocal(_p.copy(src).lerp(dest, u));
          tapa.position.copy(_p).sub(new THREE.Vector3(0, 0.5, 0));
          tapa.rotation.set(u * 5, u * 3, 0);
        } else if (vuela >= 1 && t < S["s04-gente"]) tapa.visible = t >= w(14) + 0.2;
        if (vuela >= 1 && t >= w(14) + 0.2) { tapa.visible = true; tapa.position.set(0, (1 - bk(sg(t, w(14) + 0.2, w(14) + 0.55))) * 0.6, 0); tapa.rotation.set(0, 0, 0); }
        if (t < w(12) - 0.25) tapa.visible = true;
      }
    });
  }

  // ---- "?" grande (pegado a la cámara), nace de la tapa ----
  {
    const s = en(t, w(12) + 0.05, w(14) + 0.35) ? 1.25 * bk(sg(t, w(12) + 0.05, w(12) + 0.4)) * (1 - eio(sg(t, w(14) - 0.05, w(14) + 0.3))) : 0;
    ocultar(pregunta, s);
    pregunta.position.set(0, 0.05 - 0.6 * eio(sg(t, w(14) - 0.05, w(14) + 0.3)), -4.5);
    pregunta.rotation.set(0, Math.sin(t * 1.6) * 0.5 + (1 - eo(sg(t, w(12) + 0.05, w(12) + 0.5))) * 3, 0);
  }

  // ---- la gente: muchos en la mesa grande, pocos en la chica ----
  {
    const llega = (d0) => bk(sg(t, w(20) - 0.2 + d0 * 0.5, w(20) + 0.15 + d0 * 0.5));
    const se = eio(sg(t, S["s05-tres"] - 0.35, S["s05-tres"] - 0.05));
    genteA.forEach(({ o, p, d }, i) => {
      const k = llega(i * 0.06) * (1 - se);
      ocultar(o, k);
      if (o.visible) { const [px, pz] = p; const dir = Math.atan2(MESA_A.x - px, MESA_A.z - pz); o.position.set(px + Math.sin(dir + Math.PI) * (1 - k) * 1.2, 0, pz + Math.cos(dir + Math.PI) * (1 - k) * 1.2); o.rotation.y = dir; o.scale.setScalar(k * (0.9 + d * 0.15)); }
    });
    genteB.forEach(({ o, p }, i) => {
      const k = llega(0.5 + i * 0.25) * (1 - se);
      ocultar(o, k);
      if (o.visible) { o.position.set(p[0], 0, p[1]); o.rotation.y = Math.atan2(MESA_B.x - p[0], MESA_B.z - p[1]); }
    });
  }

  // ---- canastas: 3 frascos en la grande, montones en la chica ----
  sueltos.forEach((j) => (j.visible = false));
  {
    const sA = en(t, S["s05-tres"] - 0.3, w(33) + 0.2) ? bk(sg(t, S["s05-tres"] - 0.02, S["s05-tres"] + 0.3)) * (1 - eio(sg(t, w(33) - 0.15, w(33) + 0.2))) : 0;
    ocultar(canastaA, sA); canastaA.position.set(CAN_A.x, 0, CAN_A.z); canastaA.rotation.y = 0.35;
    if (sA > 0.002) for (let k = 0; k < 3; k++) {
      const ti = w(25) - 0.1 + k * 0.17;
      const u = sg(t, ti, ti + 0.32);
      if (u <= 0) continue;
      const j = sueltos[k]; j.visible = true; j.scale.setScalar(0.92 * sA);
      const [lx, ly, lz] = ADENTRO[k * 2];
      _p.set(lx, ly + (1 - u * u) * 1.4 + Math.abs(Math.sin(Math.PI * 2 * sg(t, ti + 0.32, ti + 0.6))) * 0.08 * (1 - sg(t, ti + 0.32, ti + 0.6)), lz);
      canastaA.localToWorld(_p); j.position.copy(_p); j.rotation.set(0.12 * (k - 1), 0.35 + k, 0.1 * (1 - u));
    }
    const sB = en(t, S["s06-treinta"] - 0.4, S["s07-despues"] + 0.1) ? bk(sg(t, S["s06-treinta"] - 0.4, S["s06-treinta"])) * (1 - eio(sg(t, w(33) - 0.25, w(33) + 0.1))) : 0;
    // s07: la canasta (vacía) se queda y se va "para después"
    const vacia = en(t, S["s07-despues"] - 0.1, S["s08-whatsapp"] + 0.1);
    if (vacia) {
      const ent = bk(sg(t, S["s07-despues"] + 0.1, S["s07-despues"] + 0.45));
      const va = eio(sg(t, w(44) - 0.1, w(46) + 0.25));
      ocultar(canastaB, ent * 0.95); canastaB.position.set(lerp(0, 4.2, va), 1.25 + Math.sin(Math.PI * va) * 0.3, 0.6); canastaB.rotation.set(0, 0.15 - va * 0.4, -va * 0.08);
    } else {
      ocultar(canastaB, sB); canastaB.position.set(CAN_B.x, 0, CAN_B.z); canastaB.rotation.set(0, -0.3, 0);
      if (sB > 0.002) for (let k = 0; k < 11; k++) {
        const ti = w(30) - 0.15 + k * 0.075;
        const u = sg(t, ti, ti + 0.3);
        if (u <= 0) continue;
        const j = sueltos[3 + k]; j.visible = true; j.scale.setScalar(0.92 * sB);
        const [lx, ly, lz] = ADENTRO[k % 18];
        _p.set(lx, ly + (1 - u * u) * 2.4, lz); canastaB.localToWorld(_p); j.position.copy(_p); j.rotation.set(0.25 * Math.sin(k * 2.1), k * 0.9, 0.2 * Math.cos(k * 1.3) * (k > 5 ? 1 : 0.3));
      }
    }
  }

  // ---- cucharita: prueba (s06), no se decide (s07) ----
  {
    let s = 0, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, carga = 0, gotea = 0;
    if (en(t, w(33), S["s07-despues"] + 0.05)) {
      // entra, baja al frasco del medio, sale cargada hacia la cámara
      const j = frascosB[2];
      const base = j.position.clone();
      const baja = eio(sg(t, w(33) + 0.05, w(33) + 0.45));
      const sube = eio(sg(t, w(33) + 0.55, w(36) + 0.2));
      s = 1.9 * bk(sg(t, w(33), w(33) + 0.3));
      x = base.x + lerp(0.5, 0.02, baja) + sube * 0.08; y = base.y + lerp(1.0, 0.4, baja) + sube * 0.42; z = base.z + lerp(0.1, 0, baja) + sube * 0.9;
      rx = lerp(-0.1, -0.05, baja) - sube * 0.95; rz = lerp(0.5, 0.05, baja);
      carga = sg(t, w(33) + 0.45, w(33) + 0.5);
      gotea = sg(t, w(33) + 0.7, S["s07-despues"]);
    } else if (en(t, S["s07-despues"] + 0.05, w(46) + 0.3)) {
      // va de frasco en frasco del anillo sin decidirse (3 saltos), y en "después" se va
      const saltos = [w(40), w(41), w(41) + 0.32, w(42)];
      const ang0 = (t - S["s07-despues"]) * 0.75;
      const obj = [0, 3, 22, 1].map((k) => { const a = ang0 + (k / 24) * Math.PI * 2; return [Math.sin(a) * 1.75, 2.15 + Math.sin(a * 2 + t) * 0.08 + Math.cos(a) * 0.35 - 0.25, 0.6 + Math.cos(a) * 1.75 * 0.75]; });
      let k = 0; while (k + 1 < saltos.length && saltos[k + 1] <= t) k++;
      const u = eio(sg(t, saltos[k], saltos[k] + 0.25));
      const A = obj[Math.max(0, k - 1)], B = obj[k];
      x = lerp(A[0], B[0], u); z = lerp(A[2], B[2], u) + 0.1; y = lerp(A[1], B[1], u) + 0.75 + Math.sin(Math.PI * u) * 0.35;
      s = 1.6 * (1 - eio(sg(t, w(44), w(46))));
      rz = 0.3 * Math.sin(t * 3); rx = 0.2;
      y += eio(sg(t, w(44), w(46))) * 1.2;
    }
    ocultar(cuchara, s); cuchara.position.set(x, y, z); cuchara.rotation.set(rx, ry, rz);
    bocado.visible = carga > 0; gota.visible = gotea > 0;
    gota.position.set(0, -0.03 - gotea * 0.07, 0.02); gota.scale.set(1, 1 + gotea * 2.2, 1);
  }

  // ---- celular: nace del anillo (s08), se acuesta y es la mesa (s09), tienda (s10-12), local (s13), cierre ----
  {
    let s = 0, x = 0, y = 2.05, z = 0, rxO = 0, ryO = 0, rzIn = 0, tex = pantallas.chat, sombraOn = false;
    if (t >= S["s08-whatsapp"] - 0.05) {
      s = 1.0 * bk(sg(t, S["s08-whatsapp"] + 0.05, S["s08-whatsapp"] + 0.5));
      ryO = Math.sin(t * 0.7) * 0.08 - 0.1;
      // "doscientas": el globito cuenta y el teléfono tiembla un poco con cada foto
      const vib = en(t, w(53), w(55) + 0.3) ? 1 : 0;
      rzIn = vib * Math.sin(t * 40) * 0.012;
      // s09: se acuesta (pantalla para arriba, apaisado) y es la mesa de 24
      const acuesta = eio(sg(t, S["s09-mesa24"] - 0.05, S["s09-mesa24"] + 0.45));
      const para = eio(sg(t, w(63) - 0.1, w(65) + 0.1));
      const k = acuesta * (1 - para);
      rxO = -Math.PI / 2 * k; rzIn += (Math.PI / 2) * k; y = lerp(2.05, 1.2, k); ryO *= 1 - k;
      if (t >= w(63)) tex = t >= w(77) ? pantallas.t4 : t >= w(75) ? pantallas.t3 : t >= w(71) ? pantallas.t2 : t >= w(69) ? pantallas.t1 : pantallas.t0;
      // dedo invisible: elige y paga (la pantalla se hunde un toque)
      s *= 1 - 0.035 * Math.sin(Math.PI * sg(t, w(75), w(75) + 0.2)) - 0.035 * Math.sin(Math.PI * sg(t, w(77), w(77) + 0.2));
      const baja12 = eio(sg(t, S["s12-paga"] - 0.1, S["s12-paga"] + 0.5)); y = lerp(y, 1.75, baja12);
      // s12-13: el celular se corre a la izquierda; aparece el local
      const corre = eio(sg(t, S["s13-negocio"] - 0.1, S["s13-negocio"] + 0.6));
      x = lerp(0, -0.88, corre); s *= lerp(1, 0.86, corre); y = lerp(y, 1.75, corre); ryO = lerp(ryO, 0.35, corre);
      // cierre: al centro, videollamada
      const cta = eio(sg(t, S["s14-cta"] - 0.05, S["s14-cta"] + 0.45));
      x = lerp(x, 0, cta); s = lerp(s, 0.78, cta); y = lerp(y, 0.62, cta); ryO = lerp(ryO, Math.sin(t * 0.7) * 0.08, cta);
      if (t >= S["s14-cta"] + 0.15) tex = pantallas.llamada;
      sombraOn = true;
      // la grilla del catálogo (solo de pie, antes de la tienda)
      grilla.visible = t < S["s10-tienda"] && t < S["s09-mesa24"] + 0.6;
      if (grilla.visible && pantallas.grilla) pantallas.grilla.offset.y = 1 - pantallas.grilla.repeat.y - eio(sg(t, S["s08-whatsapp"] + 0.3, w(55) + 0.5)) * 0.42 - sg(t, w(55) + 0.5, S["s09-mesa24"] + 0.6) * 0.04;
    }
    ocultar(cel, s); cel.position.set(x, y, z); cel.rotation.set(rxO, ryO, 0); celIn.rotation.set(0, 0, rzIn);
    if (tex && celMat.map !== tex) { celMat.map = tex; celMat.emissiveMap = tex; celMat.needsUpdate = true; }
    celSombra.visible = sombraOn && s > 0.01; celSombra.position.set(x, 0.005, z); celSombra.scale.setScalar(Math.max(0.01, s * (1.25 - cl(y / 4))));
    // globito del contador: "doscientas"
    const gs = en(t, w(53) - 0.15, S["s09-mesa24"] + 0.1) ? bk(sg(t, w(53) - 0.15, w(53) + 0.15)) * (1 - eio(sg(t, S["s09-mesa24"] - 0.15, S["s09-mesa24"] + 0.1))) : 0;
    ocultar(globo, gs);
    let kc = Math.floor(sg(t, w(53) - 0.05, w(54) + 0.15) * (CUENTA.length - 1) + 0.0001);
    N200.forEach((m, i) => (m.visible = i === kc));
    globo.children[0].scale.set(1, 1, 1);
  }

  // ---- s09: la pantalla es la mesa de 24 (los frascos se levantan de la pantalla) ----
  {
    const on = en(t, S["s09-mesa24"] + 0.2, w(65) + 0.4);
    if (on) {
      const sube = (i) => bk(sg(t, S["s09-mesa24"] + 0.25 + i * 0.022, S["s09-mesa24"] + 0.55 + i * 0.022));
      const quedan = [9, 12, 15];
      frascosA.forEach((j, i) => {
        const fila = Math.floor(i / 8), col = i % 8;
        let s = 0.62 * sube(i), x = -1.3 + col * 0.37, y = 1.2 + 0.09, z = -0.42 + (2 - fila) * 0.42 - 0.0;
        const q = quedan.indexOf(i);
        // "tu tienda": se van 21 (vuelan) y quedan 3 que entran en la pantalla
        const va = eio(sg(t, w(62) + (i % 7) * 0.04, w(63) + (i % 7) * 0.04));
        if (q < 0) { y -= va * 0.35; s *= 1 - va; }
        else { const ent = eio(sg(t, w(63) - 0.1, w(65) - 0.1)); x = lerp(x, (q - 1) * 0.45, ent); z = lerp(z, 0.0, ent); y += ent * 0.05; s *= 1 - eio(sg(t, w(64) - 0.1, w(65) + 0.1)); }
        ocultar(j, s);
        if (j.visible) { j.position.set(x, y, z); j.rotation.set(0, Math.sin(t + i) * 0.1, 0); j.userData.tapa.position.set(0, 0, 0); j.userData.tapa.rotation.set(0, 0, 0); }
      });
    }
  }

  // ---- s12: un frasco sale de la pantalla y cae en la canasta ----
  {
    const on = en(t, w(77) + 0.1, S["s14-cta"] + 0.2);
    const sC = on ? bk(sg(t, S["s12-paga"] + 0.1, S["s12-paga"] + 0.45)) : 0;
    const sCan = en(t, S["s12-paga"] + 0.05, S["s14-cta"] + 0.2) ? bk(sg(t, S["s12-paga"] + 0.05, S["s12-paga"] + 0.45)) * (1 - eio(sg(t, S["s14-cta"] - 0.2, S["s14-cta"] + 0.15))) : 0;
    if (!en(t, S["s05-tres"] - 0.3, w(33) + 0.2)) {
      ocultar(canastaA, sCan * 0.95); canastaA.position.set(lerp(1.05, 0.75, eio(sg(t, S["s13-negocio"], S["s13-negocio"] + 0.6))), 0, lerp(2.4, 2.2, eio(sg(t, S["s13-negocio"], S["s13-negocio"] + 0.6)))); canastaA.rotation.set(0, -0.3, 0);
    }
    void sC;
    if (on && sCan > 0.01) {
      const j = sueltos[0];
      const u = sg(t, w(77) + 0.15, w(77) + 0.75);
      const A = new THREE.Vector3(-0.2, 1.4, 0.3);
      _p.set(-0.2, 0.06, 0.0); canastaA.localToWorld(_p);
      const B = _p.clone();
      j.visible = u > 0; j.scale.setScalar(0.95 * sCan * bk(sg(t, w(77) + 0.15, w(77) + 0.4)));
      j.position.set(lerp(A.x, B.x, eio(u)), lerp(A.y, B.y, u * u) + Math.sin(Math.PI * u) * 0.9, lerp(A.z, B.z, eio(u)));
      j.rotation.set(0.3 * (1 - u), 0.5 + u * 2, 0.4 * Math.sin(Math.PI * u));
      j.userData.tapa.position.set(0, 0, 0); j.userData.tapa.rotation.set(0, 0, 0);
      // y otro, para que la canasta no quede con uno solo en el local
      const j2 = sueltos[1]; const u2 = sg(t, w(77) + 0.4, w(77) + 0.95);
      _p.set(0.2, 0.06, 0.05); canastaA.localToWorld(_p);
      j2.visible = u2 > 0; j2.scale.setScalar(0.95 * sCan * bk(sg(t, w(77) + 0.4, w(77) + 0.65)));
      j2.position.set(lerp(A.x + 0.2, _p.x, eio(u2)), lerp(A.y, _p.y, u2 * u2) + Math.sin(Math.PI * u2) * 0.9, lerp(A.z, _p.z, eio(u2))); j2.rotation.set(0, -0.4 + u2 * 2, 0);
    }
  }

  // ---- el local: entra a la derecha; le llega el pedido y se prende ----
  {
    const on = en(t, S["s13-negocio"] - 0.1, S["s14-cta"] + 0.3);
    const s = on ? 0.62 * bk(sg(t, S["s13-negocio"] - 0.05, S["s13-negocio"] + 0.4)) * (1 - eio(sg(t, S["s14-cta"] - 0.15, S["s14-cta"] + 0.2))) : 0;
    ocultar(local, s); local.position.set(1.4, 0, -1.6); local.rotation.set(0, -0.32 + Math.sin(t * 0.5) * 0.04, 0);
    const luz = eio(sg(t, w(84) - 0.05, w(84) + 0.3));
    if (local.visible) local.scale.multiplyScalar(1 + 0.05 * Math.sin(Math.PI * sg(t, w(84) - 0.05, w(84) + 0.25)));
    vidrieraMat.emissiveIntensity = lerp(0.05, 1.1, luz);
    cartelMat.emissiveIntensity = lerp(0.1, 0.8, luz);
    toldoA.color.set(C.gris).lerp(new THREE.Color(C.g), lerp(0.25, 1, luz));
    toldoB.color.set(C.cr3).lerp(new THREE.Color(C.cr), lerp(0.25, 1, luz));
    // la tarjeta "Pedido nuevo" vuela del celular al local
    const u = sg(t, w(81), w(84) + 0.05);
    const ts = en(t, w(81), w(84) + 0.35) ? 0.62 * bk(sg(t, w(81), w(81) + 0.3)) * (1 - eio(sg(t, w(84) + 0.0, w(84) + 0.3))) : 0;
    ocultar(tarjeta, ts);
    if (tarjeta.visible) { const e = eio(u); tarjeta.position.set(lerp(-1.0, 1.1, e), lerp(2.6, 2.2, e) + Math.sin(Math.PI * e) * 0.9, lerp(0.4, -0.9, e)); tarjeta.rotation.set(0, -0.2 + e * 0.1, 0.15 - e * 0.3); }
  }

  // ---- números 3D (arriba, pegados a la cámara) ----
  {
    const Z = -6;
    const pop = (a, b, sMax) => (en(t, a, b + 0.3) ? sMax * bk(sg(t, a, a + 0.3)) * (1 - eio(sg(t, b, b + 0.22))) : 0);
    // gancho: no hay números (el texto grande ya dice 24). s01-s02: "24" gris-rojo arriba de la grande, "6" verde
    // "tres" → "treinta"
    const n3 = pop(w(25) - 0.05, w(30) - 0.12, 0.6);
    ponerNumero(N.n3, n3, 0, 0.55, Z, Math.sin(t * 0.9) * 0.2);
    const n30 = pop(w(32) - 0.08, w(33) - 0.1, 0.6) * (1 + 0.08 * Math.sin(Math.PI * sg(t, w(32) + 0.15, w(32) + 0.45)));
    ponerNumero(N.n30, n30, 0, 0.55, Z, Math.sin(t * 0.9) * 0.2);
    // "Es la mesa de veinticuatro"
    ponerNumero(N.n24b, pop(w(60) - 0.08, S["s10-tienda"] - 0.1, 0.6), 0, 0.55, Z, Math.sin(t * 0.9) * 0.2);
    // rótulo a mitad: los números del gancho se apagan cuando la tapa vuela
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
dibujarPantallas().then(() => {
  renderAt(window.__hfThreeTime || 0);
  if (window.__tresListo) window.__tresListo();
});
