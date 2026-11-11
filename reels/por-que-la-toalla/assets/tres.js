// Capa 3D de por-que-la-toalla (Three.js r170 local). Base técnica: reels/por-que-el-mozo (luces, entorno PMREM, cámara
// por claves con Catmull-Rom monótona, personajes de reels/abren-hoy). renderAt(t) es una función pura del tiempo del
// timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Fondo navy liso (#0b1220, lo pone el HTML). Zonas:
//   B (origen): el baño del hotel (azulejos navy), el toallero cromado, dos toallas y LOS CARTELITOS; las pilas de toallas
//      (35 % / 44 %) y el "?" verde.
//   H (x = 30): el barrio: el hotel en corte (3 x 4 habitaciones, la 214 en el medio del piso 2), casas, el almacén de
//      Rubén (abierto a la vereda, con toldo) y Graciela en la vereda de enfrente con el celular.
//   FIN (x = 100): el cartelito del cierre.
// EL CARTELITO es el hilo: nace en el gancho, se duplica, se vuelve el de "esta habitación" y vuelve en el callback como
// la tarjeta "Lo más pedido del barrio" del sitio de Rubén (misma forma, mismo borde, mismo cordón).
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800p.js";
import { crearPersonaje, ELENCO, poseEn, mezclar, CARA, BRAZOS, crearMate, crearMaple } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));
await document.fonts.load('500 60px "IBM Plex Mono"');

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
const rebote = (t, a, k = 10, f = 26, amp = 1) => (t > a ? Math.exp(-(t - a) * k) * Math.sin((t - a) * f) * amp : 0);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (A, B, u) => V(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E;
const popIn = (t, a, d = 0.28) => (t < a ? 0 : lerp(0.35, 1, bk(sg(t, a, a + d))));
const arco = (A, B, u, h) => { const p = lerpV(A, B, u); p.y += Math.sin(Math.PI * u) * h; return p; };

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
const camera = new THREE.PerspectiveCamera(34, 1080 / 1920, 0.05, 400);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x4a5060);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, Math.PI / 2.4, 0xfff1dc, 2.4);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xdde8ff, 1.6);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.3);
  tira(3, 3, 0, 1, 7, 0, 0xffffff, 1.0);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.7;

const OH = V(30, 0, 0); // el barrio (centro del hotel)
const OF = V(100, 0, 0); // el cierre
const key = new THREE.DirectionalLight(0xfff0dc, 1.7); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.3); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x3a4256, 1.1); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.6);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.normalBias = 0.02; sol.shadow.radius = 5;
scene.add(sol, sol.target);
const luzAlmacen = new THREE.PointLight(0xffd59a, 0, 7, 1.5); scene.add(luzAlmacen);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, madera: 0x9b6a43 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.14 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.5),
  white: mat(C.white, 0.42), tilde: mat(C.navy, 0.45), gris: mat(C.gris, 0.55), madera: mat(C.madera, 0.6),
  cromo: mat(0xdfe3ea, 0.16, { metalness: 0.95 }),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", ${fam === "Lexend" ? "sans-serif" : "monospace"}`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const ajustar = (x, txt, peso, px, ancho, fam) => { let s = px; x.font = F(peso, s, fam); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s, fam); } return s; };
// texto en renglones (centrado): devuelve la altura usada
function renglones(x, txt, cx, y0, ancho, peso, px, alto = 1.12) {
  x.font = F(peso, px); const pal = txt.split(" "); const ls = []; let l = "";
  for (const p of pal) { const k = l ? l + " " + p : p; if (x.measureText(k).width > ancho && l) { ls.push(l); l = p; } else l = k; }
  if (l) ls.push(l);
  x.textAlign = "center"; x.textBaseline = "middle";
  ls.forEach((s, i) => x.fillText(s, cx, y0 + i * px * alto));
  return ls.length * px * alto;
}
const sombraTex = tex(256, 256, (x) => {
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(5,9,18,0.55)"); gr.addColorStop(0.55, "rgba(5,9,18,0.28)"); gr.addColorStop(1, "rgba(5,9,18,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
});
const sombra = (w, d, op = 1) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, opacity: op })); m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m; };
const sh = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 10, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
};
const tickGeo = (() => {
  const s = new THREE.Shape();
  [[-0.5, 0.06], [-0.16, -0.3], [0.5, 0.36], [0.37, 0.49], [-0.16, -0.05], [-0.37, 0.19]].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 });
  g.translate(0, -0.06, -0.06); return g;
})();
const discoGeo = new THREE.CylinderGeometry(1, 1, 0.3, 36).rotateX(Math.PI / 2);
function hacerTilde(r = 0.17, disco = M.g, marca = M.tilde, padre = scene) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, disco); d.scale.set(r, r, r * 0.35); g.add(d);
  const bd = mesh(new THREE.TorusGeometry(1, 0.08, 8, 40), M.navy); bd.scale.set(r, r, r); g.add(bd);
  const tk = mesh(tickGeo, marca, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  padre.add(g); return g;
}
const NAV = "#16243d", NAV3 = "#1f3254", CRE = "#efeee5", VER = "#5ce611", VERD = "#3fa60a", NAV0 = "#0b1220", GRI = "#8e8c80";

// ================= EL CARTELITO (forma única: rectángulo redondeado con ojal arriba y cordón) =================
const TW = 0.5, TH = 0.74, TR = 0.05, HOY = 0.075, HOR = 0.026, TD = 0.014;
// origen del grupo = el ojal; la tarjeta cuelga hacia abajo (tope en y = +HOY, base en y = HOY - TH)
function formaTag() {
  const s = new THREE.Shape();
  const x0 = -TW / 2, y0 = HOY - TH, x1 = TW / 2, y1 = HOY;
  s.moveTo(x0 + TR, y0); s.lineTo(x1 - TR, y0); s.quadraticCurveTo(x1, y0, x1, y0 + TR); s.lineTo(x1, y1 - TR); s.quadraticCurveTo(x1, y1, x1 - TR, y1);
  s.lineTo(x0 + TR, y1); s.quadraticCurveTo(x0, y1, x0, y1 - TR); s.lineTo(x0, y0 + TR); s.quadraticCurveTo(x0, y0, x0 + TR, y0);
  const h = new THREE.Path(); h.absarc(0, 0, HOR, 0, Math.PI * 2, true); s.holes.push(h);
  return s;
}
const FORMA = formaTag();
const cantoGeo = new THREE.ExtrudeGeometry(FORMA, { depth: TD, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 2, curveSegments: 24 });
cantoGeo.translate(0, 0, -TD / 2);
const caraGeo = (() => {
  const g = new THREE.ShapeGeometry(FORMA, 24); const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + TW / 2) / TW, (p.getY(i) - (HOY - TH)) / TH);
  return g;
})();
const TPX = [512, Math.round((512 * TH) / TW)]; // 512 x 758
const OJ = Math.round(((HOY) / TH) * TPX[1]); // y del ojal en la textura
// dibujos de la tarjeta
function hoja(x, cx, cy, s, col) {
  x.save(); x.translate(cx, cy); x.rotate(-0.6);
  x.fillStyle = col; x.beginPath(); x.moveTo(0, -s); x.bezierCurveTo(s * 0.75, -s * 0.5, s * 0.6, s * 0.55, 0, s); x.bezierCurveTo(-s * 0.6, s * 0.55, -s * 0.75, -s * 0.5, 0, -s); x.fill();
  x.strokeStyle = "#d4d2c6"; x.lineWidth = s * 0.09; x.lineCap = "round"; x.beginPath(); x.moveTo(0, -s * 0.7); x.lineTo(0, s * 1.25); x.stroke();
  for (const k of [-0.3, 0.1, 0.45]) { x.beginPath(); x.moveTo(0, s * k); x.lineTo(s * 0.32, s * (k - 0.28)); x.moveTo(0, s * k); x.lineTo(-s * 0.32, s * (k - 0.28)); x.stroke(); }
  x.restore();
}
function muneco(x, cx, cy, s, col, borde) {
  x.fillStyle = col; x.strokeStyle = borde; x.lineWidth = s * 0.12;
  x.beginPath(); x.arc(cx, cy - s * 0.62, s * 0.3, 0, 7); x.fill(); x.stroke();
  x.beginPath(); x.roundRect(cx - s * 0.42, cy - s * 0.24, s * 0.84, s * 0.95, [s * 0.4, s * 0.4, s * 0.12, s * 0.12]); x.fill(); x.stroke();
}
function gente(x, cy, n, s = 46, total = 4) {
  for (let i = 0; i < total; i++) { const cx = 256 + (i - (total - 1) / 2) * s * 2.15; const on = i < n; muneco(x, cx, cy, s, on ? VER : "#d4d2c6", NAV0); }
}
function dibujarTag(x, kind, n) {
  const [w, h] = TPX;
  const fondo = kind === "hoja" || kind === "ambiente" ? "#d4d2c6" : kind === "dorso" ? "#e6e2d2" : "#f6f5ee";
  x.fillStyle = NAV0; x.fillRect(0, 0, w, h);
  x.fillStyle = fondo; rr(x, 16, 16, w - 32, h - 32, 34);
  // el refuerzo del ojal
  x.fillStyle = NAV0; x.beginPath(); x.arc(w / 2, OJ, 44, 0, 7); x.fill(); x.fillStyle = "#c9ccd2"; x.beginPath(); x.arc(w / 2, OJ, 34, 0, 7); x.fill();
  x.fillStyle = NAV0;
  if (kind === "dorso") { x.fillStyle = "#cfcab6"; for (let i = 0; i < 5; i++) x.fillRect(70, 230 + i * 90, w - 140, 10); return; }
  if (kind === "hoja") { hoja(x, w / 2, 420, 150, GRI); return; }
  if (kind === "ambiente") {
    hoja(x, w / 2, 255, 82, GRI);
    x.fillStyle = NAV0; renglones(x, "Ayudá a cuidar el ambiente", w / 2, 430, w - 90, 800, 66);
    x.fillStyle = GRI; x.fillRect(150, 650, w - 300, 10);
    return;
  }
  if (kind === "gente") { gente(x, 430, n, 50); return; }
  if (kind === "mayoria") {
    x.fillStyle = VER; rr(x, 16, 128, w - 32, 22, 0);
    x.fillStyle = NAV0; renglones(x, "La mayoría de los huéspedes reutiliza su toalla", w / 2, 222, w - 80, 800, 58, 1.1);
    gente(x, 600, n, 44);
    return;
  }
  if (kind === "214") {
    x.fillStyle = VER; rr(x, 16, 128, w - 32, 22, 0);
    x.fillStyle = NAV0; renglones(x, "La mayoría de los huéspedes de esta habitación…", w / 2, 210, w - 80, 800, 52, 1.1);
    x.fillStyle = NAV0; rr(x, 96, 498, w - 192, 196, 34); x.fillStyle = n ? VER : "#d4d2c6"; rr(x, 108, 510, w - 216, 172, 26);
    x.fillStyle = NAV0; x.font = F(900, 150); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("214", w / 2, 600);
    return;
  }
  if (kind === "pedido") {
    x.fillStyle = VER; rr(x, 16, 128, w - 32, 22, 0);
    x.fillStyle = NAV0; renglones(x, "Lo más pedido del barrio", w / 2, 222, w - 80, 800, 62, 1.08);
    x.fillStyle = NAV0; rr(x, 52, 392, w - 104, 150, 26); x.fillStyle = VER; rr(x, 62, 402, 120, 130, 20);
    x.fillStyle = NAV0; x.font = F(900, 92); x.textAlign = "center"; x.fillText("1", 122, 470);
    x.fillStyle = CRE; x.textAlign = "left"; ajustar(x, "jamón y queso", 800, 46, w - 104 - 160); x.fillText("Tarta de", 200, 440); x.fillText("jamón y queso", 200, 494);
    gente(x, 640, 3, 40, 3);
    return;
  }
  if (kind === "fin") {
    x.fillStyle = VER; x.beginPath(); x.arc(w / 2, 430, 165, 0, 7); x.fill(); x.lineWidth = 16; x.strokeStyle = NAV0; x.stroke();
    x.strokeStyle = NAV0; x.lineWidth = 46; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(w / 2 - 80, 435); x.lineTo(w / 2 - 20, 495); x.lineTo(w / 2 + 88, 368); x.stroke();
  }
}
const cantoM = mat(C.navy, 0.5);
function hacerTag(frente = "dorso", n = 0) {
  const g = new THREE.Group(); const giro = new THREE.Group(); g.add(giro);
  giro.add(mesh(cantoGeo, cantoM));
  const c = document.createElement("canvas"); c.width = TPX[0]; c.height = TPX[1];
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  const fm = new THREE.MeshStandardMaterial({ map: t, roughness: 0.75, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.16 });
  const cara = mesh(caraGeo, fm, 0, 0, TD / 2 + 0.0055); giro.add(cara);
  const dt = tex(TPX[0], TPX[1], (x) => dibujarTag(x, "dorso"));
  const dorso = mesh(caraGeo, new THREE.MeshStandardMaterial({ map: dt, roughness: 0.8, emissive: 0xffffff, emissiveMap: dt, emissiveIntensity: 0.1 }), 0, 0, -TD / 2 - 0.0055); dorso.rotation.y = Math.PI; giro.add(dorso);
  // el ojal de metal
  const oj = mesh(new THREE.TorusGeometry(HOR + 0.008, 0.007, 8, 28), M.cromo); giro.add(oj);
  g.userData = { giro, c, t, clave: "" };
  ponerTag(g, frente, n);
  scene.add(g); sh(g);
  return g;
}
function ponerTag(g, kind, n = 0) {
  const k = kind + "|" + n; if (g.userData.clave === k) return; g.userData.clave = k;
  const x = g.userData.c.getContext("2d"); x.clearRect(0, 0, TPX[0], TPX[1]); dibujarTag(x, kind, n); g.userData.t.needsUpdate = true;
}
// el cordón elástico que pasa por el ojal y abraza la barra (en el espacio del grupo del cartel: barra a dy arriba, dz atrás)
function cordon(dy, dz, r = 0.032) {
  const pts = [V(0, -0.004, 0.0), V(0, dy * 0.45, -dz * 0.2), V(0, dy * 0.9, -dz * 0.55), V(0, dy + r * 1.6, -dz), V(0, dy + r * 0.2, -dz - r * 1.4), V(0, dy * 0.7, -dz * 0.8), V(0, 0.004, -0.004)];
  return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 60, 0.0055, 6, true), mat(C.navy2, 0.6));
}

// ================= LA TOALLA COLGADA (doblada en tres, con la franja tejida verde) =================
const toallaM = mat(0xf7f6f0, 0.95), toallaS = mat(0xe9e7dc, 0.95);
function hacerToalla(w = 0.82, largo = 0.88, franja = M.g) {
  const g = new THREE.Group();
  g.add(mesh(rbox(w, largo, 0.03, 0.013), toallaM, 0, -largo / 2, 0.05));
  g.add(mesh(rbox(w, largo * 0.86, 0.03, 0.013), toallaS, 0, -largo * 0.43, -0.05));
  const rollo = mesh(new THREE.CylinderGeometry(0.066, 0.066, w, 28), toallaM); rollo.rotation.z = Math.PI / 2; g.add(rollo);
  for (const [y, hh] of [[-largo + 0.13, 0.05], [-largo + 0.205, 0.022]]) g.add(mesh(new THREE.BoxGeometry(w + 0.004, hh, 0.034), franja, 0, y, 0.05));
  g.add(mesh(new THREE.BoxGeometry(w + 0.004, 0.022, 0.034), toallaS, 0, -largo + 0.03, 0.05));
  sh(g); scene.add(g); return g;
}
// toalla doblada (para las pilas): cuerpo, franja y el canto del doblez
const dobladaGeo = rbox(0.62, 0.082, 0.42, 0.036);
function hacerDoblada(color, franja) {
  const g = new THREE.Group();
  g.add(mesh(dobladaGeo, color));
  g.add(mesh(new THREE.BoxGeometry(0.06, 0.084, 0.424), franja, 0.2, 0, 0));
  g.add(mesh(new THREE.BoxGeometry(0.022, 0.084, 0.424), franja, 0.26, 0, 0));
  sh(g); scene.add(g); return g;
}
const PILA_GRIS = mat(0xb9b7ab, 0.92), PILA_VERDE = mat(C.g, 0.8, { emissive: C.g, emissiveIntensity: 0.08 }), FRANJA_GRIS = mat(0x8e8c80, 0.9), FRANJA_CREMA = mat(0xf7f6f0, 0.9);

// ================= ZONA B: el baño del hotel =================
const BAR = { y: 1.75, z: -0.12, x0: -1.3, x1: 1.3 };
const TOX = [-0.47, 0.47]; // las dos toallas
const banio = new THREE.Group(); scene.add(banio);
{
  const az = tex(512, 512, (x, w, h) => { x.fillStyle = NAV0; x.fillRect(0, 0, w, h); x.fillStyle = NAV; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rr(x, i * 256 + 7, j * 256 + 7, 242, 242, 10); });
  az.wrapS = az.wrapT = THREE.RepeatWrapping; az.repeat.set(10 / 0.6, 6 / 0.6);
  const pared = mesh(new THREE.PlaneGeometry(10, 6), new THREE.MeshStandardMaterial({ map: az, roughness: 0.85 }), 0, 3, -0.3); pared.receiveShadow = true; banio.add(pared);
  const pis = tex(512, 512, (x, w, h) => { x.fillStyle = "#0e1729"; x.fillRect(0, 0, w, h); x.fillStyle = "#131f36"; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rr(x, i * 256 + 6, j * 256 + 6, 244, 244, 8); });
  pis.wrapS = pis.wrapT = THREE.RepeatWrapping; pis.repeat.set(10 / 0.8, 8 / 0.8);
  const piso = mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshStandardMaterial({ map: pis, roughness: 0.9 }), 0, 0, 3.7); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; banio.add(piso);
  // zócalo crema donde la pared toca el piso (que se lea el ángulo)
  banio.add(mesh(new THREE.BoxGeometry(10, 0.1, 0.03), M.cr2, 0, 0.05, -0.285));
  // la barra cromada con sus soportes y rosetas
  const barra = mesh(new THREE.CylinderGeometry(0.03, 0.03, BAR.x1 - BAR.x0, 28), M.cromo, 0, BAR.y, BAR.z); barra.rotation.z = Math.PI / 2; banio.add(barra);
  for (const s of [-1, 1]) {
    const x = s * (BAR.x1 - 0.04);
    const so = mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.19, 20), M.cromo, x, BAR.y, BAR.z - 0.085); so.rotation.x = Math.PI / 2; banio.add(so);
    const ro = mesh(new THREE.CylinderGeometry(0.07, 0.075, 0.03, 32), M.cromo, x, BAR.y, -0.285); ro.rotation.x = Math.PI / 2; banio.add(ro);
    banio.add(mesh(new THREE.SphereGeometry(0.04, 20, 14), M.cromo, s * BAR.x1, BAR.y, BAR.z));
  }
  sh(banio);
}
const toallasB = TOX.map((x) => { const t = hacerToalla(); t.position.set(x, BAR.y, BAR.z); return t; });
const TAGZ = 0.13; // el cartel cuelga adelante de la toalla
const TAGDY = 0.16; // y el ojal queda 0,16 abajo de la barra
const tagsB = TOX.map((x, i) => { const g = hacerTag(i ? "mayoria" : "dorso", 0); const co = cordon(TAGDY, TAGZ); g.add(co); g.userData.cordon = co; return g; });
// las pilas (exp. 1): 11 grises (35 %) y 14 verdes (44 %); cada toalla cae desde arriba
const PILA = { z: 0.55, x: [-0.42, 0.42], n: [11, 14], dh: 0.084 };
const pilasB = PILA.n.map((n, k) => Array.from({ length: n }, () => hacerDoblada(k ? PILA_VERDE : PILA_GRIS, k ? FRANJA_CREMA : FRANJA_GRIS)));
const sombraPilas = PILA.x.map(() => sombra(0.95, 0.75, 0.9));
const NUMM = [mat(0xd4d2c6, 0.45), mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.22 })];
const numsB = ["35 %", "44 %"].map((s, k) => { const m = mesh(textoGeo(s, 0.19, 0.07), NUMM[k]); m.castShadow = true; scene.add(m); return m; });
// el "?" verde (bisagra)
const QB = V(0, 0.98, 0.55);
const preguntaM = mat(C.g, 0.38, { emissive: C.g, emissiveIntensity: 0.18 });
const preguntaGeo = textoGeo("?", 0.95, 0.3);
const pregunta = mesh(preguntaGeo, preguntaM); pregunta.castShadow = true; scene.add(pregunta);
const sombraQ = sombra(0.9, 0.5, 0.9);

// ================= ZONA H: el barrio con el hotel en corte =================
const RW = 3.0, FH = 2.7, RD = 2.6, PISOS = 4, COLS = 3;
const barrio = new THREE.Group(); scene.add(barrio);
const hotel = new THREE.Group(); hotel.position.copy(OH); barrio.add(hotel);
const cuartoM = { pared: mat(0xefeee5, 0.92), lateral: mat(0xd9d7c9, 0.9), piso: mat(0x6f5a48, 0.8), puerta: mat(C.navy3, 0.6) };
const CUARTOS = [];
{
  const ancho = COLS * RW;
  // losas (con canto crema) y medianeras navy
  for (let f = 0; f <= PISOS; f++) {
    hotel.add(mesh(rbox(ancho + 0.5, 0.26, RD + 0.3, 0.03), M.navy2, 0, f * FH - 0.13, -RD / 2 + 0.05));
    hotel.add(mesh(new THREE.BoxGeometry(ancho + 0.52, 0.08, 0.04), M.cr2, 0, f * FH - 0.06, 0.21));
  }
  for (let c = 0; c <= COLS; c++) hotel.add(mesh(new THREE.BoxGeometry(0.22, PISOS * FH, RD + 0.2), M.navy2, -ancho / 2 + c * RW, (PISOS * FH) / 2, -RD / 2 + 0.05));
  // cartel del techo
  const ct = tex(1024, 256, (x, w, h) => { x.fillStyle = NAV0; rr(x, 0, 0, w, h, 40); x.strokeStyle = VER; x.lineWidth = 14; x.beginPath(); x.roundRect(14, 14, w - 28, h - 28, 30); x.stroke(); x.fillStyle = CRE; x.font = F(900, 170); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("HOTEL", w / 2, h / 2 + 8); });
  const cartelM = new THREE.MeshStandardMaterial({ map: ct, roughness: 0.6, emissive: 0xffffff, emissiveMap: ct, emissiveIntensity: 0.25 });
  hotel.add(mesh(rbox(5.2, 1.3, 0.16, 0.06), [M.navy, M.navy, M.navy, M.navy, cartelM, M.navy], 0, PISOS * FH + 0.85, -0.2));
  for (const s of [-1, 1]) hotel.add(mesh(new THREE.BoxGeometry(0.12, 0.5, 0.12), M.navy3, s * 2, PISOS * FH + 0.08, -0.2));
  // planta baja: zócalo de piedra crema
  hotel.add(mesh(new THREE.BoxGeometry(ancho + 0.6, 0.35, 0.3), M.cr2, 0, -0.1, 0.2));
  for (let f = 0; f < PISOS; f++) for (let c = 0; c < COLS; c++) {
    const g = new THREE.Group(); g.position.set(-ancho / 2 + RW / 2 + c * RW, f * FH, 0); hotel.add(g);
    const num = `${f + 1}${13 + c}`;
    g.add(mesh(new THREE.BoxGeometry(RW - 0.22, FH - 0.26, 0.06), cuartoM.pared, 0, FH / 2, -RD + 0.03));
    const pi = mesh(new THREE.PlaneGeometry(RW - 0.22, RD), cuartoM.piso, 0, 0.003, -RD / 2); pi.rotation.x = -Math.PI / 2; g.add(pi);
    // puerta con el número
    g.add(mesh(rbox(0.86, 1.95, 0.05, 0.02), cuartoM.puerta, 0.82, 0.975, -RD + 0.08));
    g.add(mesh(new THREE.SphereGeometry(0.04, 12, 8), M.cromo, 0.5, 0.95, -RD + 0.12));
    const pt = tex(256, 128, (x, w, h) => { x.fillStyle = CRE; rr(x, 0, 0, w, h, 22); x.fillStyle = NAV0; x.font = F(900, 92); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(num, w / 2, h / 2 + 4); });
    const plaM = new THREE.MeshStandardMaterial({ map: pt, roughness: 0.6, emissive: 0xffffff, emissiveMap: pt, emissiveIntensity: 0.2 });
    const placa = mesh(new THREE.PlaneGeometry(0.44, 0.22), plaM, 0.82, 1.62, -RD + 0.112); g.add(placa);
    // toallero
    const BX = -0.5, BY = 1.6, BZ = -RD + 0.17;
    const b = mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.0, 16), M.cromo, BX, BY, BZ); b.rotation.z = Math.PI / 2; g.add(b);
    for (const s of [-1, 1]) { const so = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.14, 10), M.cromo, BX + s * 0.48, BY, BZ - 0.07); so.rotation.x = Math.PI / 2; g.add(so); }
    // la toalla (aparece colgada en "demás")
    const toalla = hacerToalla(0.62, 0.72); g.add(toalla); toalla.position.set(BX, BY, BZ);
    // el huésped (muñequito crema, como los del cartel): cuerpo con hombros redondos y cabeza
    const hu = new THREE.Group(); hu.position.set(0.05, 0, -1.25); g.add(hu);
    const cuerpoM = mat(c === 1 && f === 1 ? 0xf6f5ee : [0xe7e4d6, 0xd9d7c9, 0xefeee5][(f + c) % 3], 0.7);
    hu.add(mesh(new THREE.CapsuleGeometry(0.27, 0.62, 8, 20), cuerpoM, 0, 0.62, 0));
    hu.add(mesh(new THREE.SphereGeometry(0.21, 24, 16), cuerpoM, 0, 1.38, 0));
    // la toalla en la mano (hasta que la cuelga)
    const enMano = new THREE.Group(); enMano.position.set(0.34, 0.68, 0.16); hu.add(enMano); enMano.add(mesh(rbox(0.36, 0.42, 0.08, 0.04), toallaM)); enMano.add(mesh(new THREE.BoxGeometry(0.364, 0.05, 0.084), M.g, 0, -0.12, 0));
    const tilde = hacerTilde(0.2, M.g, M.tilde, g); tilde.position.set(BX, BY + 0.55, BZ + 0.1);
    sh(g);
    CUARTOS.push({ g, f, c, num, toalla, hu, enMano, tilde, placa, bar: V(BX, BY, BZ) });
  }
}
const C214 = CUARTOS.find((q) => q.num === "214");
const P214 = C214.g.position.clone().add(OH); // origen del cuarto 214 (en el mundo)
// el cartel de la 214 (cuelga del toallero de ese cuarto, sobre la toalla)
const tag214 = hacerTag("mayoria", 3); { const co = cordon(0.14, 0.12); tag214.add(co); }
// las pilas del experimento 2 (dentro del cuarto 214, a la derecha): 10 grises (37 %) y 13 verdes (49 %)
const PILA2 = { x: [0.3, 0.92], z: -0.75, n: [10, 13] };
const pilas2 = PILA2.n.map((n, k) => Array.from({ length: n }, () => hacerDoblada(k ? PILA_VERDE : PILA_GRIS, k ? FRANJA_CREMA : FRANJA_GRIS)));
const nums2 = ["37 %", "49 %"].map((s, k) => { const m = mesh(textoGeo(s, 0.17, 0.065), k ? NUMM[1] : mat(0x7a786c, 0.45)); m.castShadow = true; scene.add(m); return m; });
// el "?" de la 214 (aparece en el corte, sobre el huésped)
const pregunta2 = mesh(preguntaGeo, preguntaM); pregunta2.castShadow = true; scene.add(pregunta2);

// ---- la calle ----
const ZV = 2.2, ZC = 3.4, ZC2 = 9.4, ZV2 = 11.8; // vereda, calle, vereda de enfrente
{
  const veredaT = tex(512, 512, (x, w, h) => { x.fillStyle = "#3a4a66"; x.fillRect(0, 0, w, h); x.fillStyle = "#43547a"; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) rr(x, i * 128 + 5, j * 128 + 5, 118, 118, 6); });
  veredaT.wrapS = veredaT.wrapT = THREE.RepeatWrapping; veredaT.repeat.set(60 / 1.2, 4 / 1.2);
  const vM = new THREE.MeshStandardMaterial({ map: veredaT, roughness: 0.9 });
  const v1 = mesh(new THREE.PlaneGeometry(60, 3.6), vM, OH.x + 10, 0.12, ZV - 0.4); v1.rotation.x = -Math.PI / 2; v1.receiveShadow = true; barrio.add(v1);
  const v2t = veredaT.clone(); v2t.repeat.set(60 / 1.2, 3 / 1.2); v2t.needsUpdate = true;
  const v2 = mesh(new THREE.PlaneGeometry(60, 3.4), new THREE.MeshStandardMaterial({ map: v2t, roughness: 0.9 }), OH.x + 10, 0.12, (ZC2 + ZV2 + 1) / 2); v2.rotation.x = -Math.PI / 2; v2.receiveShadow = true; barrio.add(v2);
  const calle = mesh(new THREE.PlaneGeometry(60, ZC2 - ZC), mat(0x141d30, 0.95), OH.x + 10, 0.0, (ZC + ZC2) / 2); calle.rotation.x = -Math.PI / 2; calle.receiveShadow = true; barrio.add(calle);
  for (let i = 0; i < 16; i++) { const d = mesh(new THREE.PlaneGeometry(1.4, 0.16), M.cr, OH.x - 18 + i * 3.6, 0.006, (ZC + ZC2) / 2); d.rotation.x = -Math.PI / 2; barrio.add(d); }
  for (const z of [ZC, ZC2]) barrio.add(mesh(new THREE.BoxGeometry(60, 0.14, 0.18), M.cr2, OH.x + 10, 0.07, z));
}
// casas genéricas de Montevideo: fachada de dos pisos, balcón con baranda, puerta alta, ventanas con postigos
function hacerCasa(x0, x1, alto, color, detalle) {
  const g = new THREE.Group(); const w = x1 - x0, cx = (x0 + x1) / 2;
  g.add(mesh(new THREE.BoxGeometry(w, alto, 2.4), mat(color, 0.85), cx, alto / 2, -1.2));
  g.add(mesh(new THREE.BoxGeometry(w + 0.1, 0.3, 2.6), mat(detalle, 0.7), cx, alto + 0.15, -1.2));
  const vid = mat(0x22324f, 0.35, { emissive: 0xffc98a, emissiveIntensity: 0.12 });
  const n = Math.max(1, Math.round(w / 2.2));
  for (let i = 0; i < n; i++) {
    const x = x0 + (i + 0.5) * (w / n);
    for (const y of [1.5, alto - 1.6]) {
      g.add(mesh(new THREE.BoxGeometry(0.95, 1.5, 0.06), mat(detalle, 0.6), x, y, 0.02));
      g.add(mesh(new THREE.BoxGeometry(0.75, 1.3, 0.06), vid, x, y, 0.05));
    }
    // balconcito con baranda
    g.add(mesh(new THREE.BoxGeometry(1.3, 0.1, 0.6), mat(detalle, 0.7), x, alto - 2.4, 0.3));
    for (let k = 0; k < 6; k++) g.add(mesh(new THREE.BoxGeometry(0.04, 0.6, 0.04), M.navy, x - 0.6 + k * 0.24, alto - 2.05, 0.58));
    g.add(mesh(new THREE.BoxGeometry(1.3, 0.05, 0.05), M.navy, x, alto - 1.75, 0.58));
  }
  sh(g); barrio.add(g); return g;
}
hacerCasa(OH.x - 12.5, OH.x - 4.9, 6.4, 0xd9cdb4, 0xefeee5);
hacerCasa(OH.x + 4.9, OH.x + 7.7, 6.0, 0x8fa3b8, 0xefeee5);
hacerCasa(OH.x + 13.3, OH.x + 20, 6.6, 0xc9b8a0, 0xefeee5);
// árboles de vereda (plátanos): tronco y copa low-poly
const copaM = mat(0x3f8a2a, 0.85, { flatShading: true }), troncoM = mat(0x5a4636, 0.9);
for (const [x, z] of [[OH.x - 7, ZV + 0.9], [OH.x - 3, ZV2 - 1.4], [OH.x + 16, ZV2 - 1.4]]) {
  const g = new THREE.Group(); g.position.set(x, 0.12, z);
  g.add(mesh(new THREE.CylinderGeometry(0.12, 0.17, 3.2, 8), troncoM, 0, 1.6, 0));
  for (const [dx, dy, dz, r] of [[0, 3.9, 0, 1.25], [0.75, 3.5, 0.2, 0.85], [-0.7, 3.55, -0.1, 0.9], [0.1, 4.6, 0.1, 0.8]]) g.add(mesh(new THREE.IcosahedronGeometry(r, 1), copaM, dx, dy, dz));
  sh(g); barrio.add(g);
}
// ---- el almacén de Rubén: frente abierto (persiana arriba), toldo verde y crema, cartel ----
const AX = OH.x + 10.5, AW = 5.4;
const almacen = new THREE.Group(); almacen.position.set(AX, 0, 0); barrio.add(almacen);
const MOST = { y: 0.95, z: -0.9 };
{
  const fach = mat(0xe3d6bc, 0.85);
  const alto = 6.2;
  // fachada con el hueco grande del local
  almacen.add(mesh(new THREE.BoxGeometry(0.7, 3.0, 0.2), fach, -AW / 2 + 0.35, 1.5, 0));
  almacen.add(mesh(new THREE.BoxGeometry(0.7, 3.0, 0.2), fach, AW / 2 - 0.35, 1.5, 0));
  almacen.add(mesh(new THREE.BoxGeometry(AW, alto - 3.0, 0.2), fach, 0, 3.0 + (alto - 3.0) / 2, 0));
  almacen.add(mesh(new THREE.BoxGeometry(AW + 0.1, 0.3, 0.4), M.cr, 0, alto + 0.15, 0));
  // ventanas del piso de arriba con balcón
  for (const x of [-1.3, 1.3]) {
    almacen.add(mesh(new THREE.BoxGeometry(0.95, 1.5, 0.06), M.navy3, x, 4.7, 0.12));
    almacen.add(mesh(new THREE.BoxGeometry(0.75, 1.3, 0.06), mat(0x22324f, 0.35, { emissive: 0xffc98a, emissiveIntensity: 0.15 }), x, 4.7, 0.15));
  }
  almacen.add(mesh(new THREE.BoxGeometry(AW - 0.6, 0.1, 0.7), M.cr2, 0, 3.85, 0.4));
  for (let k = 0; k < 18; k++) almacen.add(mesh(new THREE.BoxGeometry(0.04, 0.6, 0.04), M.navy, -AW / 2 + 0.5 + k * ((AW - 1) / 17), 4.2, 0.72));
  // persiana enrollada arriba del hueco
  const pe = mesh(new THREE.CylinderGeometry(0.16, 0.16, AW - 1.3, 20), M.navy3, 0, 2.86, 0.18); pe.rotation.z = Math.PI / 2; almacen.add(pe);
  // cartel ALMACÉN RUBÉN
  const ct = tex(1024, 220, (x, w, h) => { x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.strokeStyle = NAV; x.lineWidth = 14; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = NAV; x.font = F(900, 110); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ALMACÉN RUBÉN", w / 2, h / 2 + 6); });
  const crL = mat(C.cr, 0.6);
  almacen.add(mesh(rbox(3.8, 0.8, 0.12, 0.04), [crL, crL, crL, crL, new THREE.MeshStandardMaterial({ map: ct, roughness: 0.6, emissive: 0xffffff, emissiveMap: ct, emissiveIntensity: 0.2 }), crL], 0, 3.42, 0.2));
  // toldo a rayas verde y crema
  const rayas = tex(512, 64, (x) => { for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? CRE : VER; x.fillRect(i * 32, 0, 32, 64); } });
  rayas.wrapS = THREE.RepeatWrapping; rayas.repeat.set(2.6, 1);
  const toldo = mesh(new THREE.PlaneGeometry(AW - 0.4, 1.3), new THREE.MeshStandardMaterial({ map: rayas, roughness: 0.8, side: THREE.DoubleSide }), 0, 2.62, 0.62); toldo.rotation.x = -1.0; almacen.add(toldo);
  const fleco = tex(512, 64, (x) => { for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? CRE : VER; x.beginPath(); x.moveTo(i * 32, 0); x.lineTo(i * 32 + 32, 0); x.lineTo(i * 32 + 32, 34); x.arc(i * 32 + 16, 34, 16, 0, Math.PI); x.fill(); } });
  fleco.wrapS = THREE.RepeatWrapping; fleco.repeat.set(2.6, 1);
  almacen.add(mesh(new THREE.PlaneGeometry(AW - 0.4, 0.26), new THREE.MeshStandardMaterial({ map: fleco, transparent: true, alphaTest: 0.5, roughness: 0.8, side: THREE.DoubleSide }), 0, 2.2, 1.17));
  // adentro: paredes, piso de damero, estantes llenos, mostrador
  const pared = mat(0xe7dcc4, 0.85);
  almacen.add(mesh(new THREE.BoxGeometry(AW - 0.4, 3.0, 0.1), pared, 0, 1.5, -3.2));
  for (const s of [-1, 1]) almacen.add(mesh(new THREE.BoxGeometry(0.1, 3.0, 3.2), pared, s * (AW / 2 - 0.25), 1.5, -1.6));
  const damero = tex(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? CRE : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(3, 2);
  const pi = mesh(new THREE.PlaneGeometry(AW - 0.4, 3.2), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.5 }), 0, 0.13, -1.6); pi.rotation.x = -Math.PI / 2; almacen.add(pi);
  let s = 7; const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const colores = [C.g, C.cr, C.red, 0xd9a441, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  for (const y of [0.75, 1.3, 1.85, 2.4]) {
    almacen.add(mesh(rbox(4.4, 0.05, 0.42, 0.015), mat(0x7a5233, 0.6), 0, y, -2.95));
    for (let x = -2.05; x < 2.1; x += 0.19 + az() * 0.08) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (k < 0.5) { const h = 0.22 + az() * 0.18; almacen.add(mesh(rbox(0.14, h, 0.16, 0.012), mat(c, 0.6), x, y + 0.025 + h / 2, -2.9)); }
      else { almacen.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.22, 14), mat(c, 0.35), x, y + 0.135, -2.9)); almacen.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14), M.cr, x, y + 0.265, -2.9)); }
    }
  }
  almacen.add(mesh(rbox(3.2, 0.84, 0.66, 0.03), M.navy3, 0, 0.13 + 0.42, MOST.z));
  almacen.add(mesh(rbox(3.34, 0.06, 0.76, 0.02), M.madera, 0, MOST.y, MOST.z));
  almacen.add(mesh(rbox(3.0, 0.06, 0.02, 0.01), M.g, 0, 0.45, MOST.z + 0.335));
  // frasco de caramelos y balanza
  const frasco = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 18), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.35, roughness: 0.05 }), -1.15, MOST.y + 0.16, MOST.z + 0.05); almacen.add(frasco);
  for (let i = 0; i < 9; i++) almacen.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.g, 0xd9a441][i % 3], 0.3), -1.15 + Math.sin(i * 2.4) * 0.06, MOST.y + 0.07 + Math.floor(i / 3) * 0.05, MOST.z + 0.05 + Math.cos(i * 2.4) * 0.06));
  almacen.add(mesh(rbox(0.36, 0.1, 0.3, 0.03), M.cr, 1.2, MOST.y + 0.06, MOST.z + 0.05));
  almacen.add(mesh(rbox(0.4, 0.025, 0.32, 0.01), mat(0xb9c0c8, 0.3), 1.2, MOST.y + 0.12, MOST.z + 0.05));
  sh(almacen);
}
// el cartel de mostrador "Hoy: N pedidos" (canvas: 12 → 13)
let hoyClave = "";
const hoyC = document.createElement("canvas"); hoyC.width = 768; hoyC.height = 300;
const hoyT = new THREE.CanvasTexture(hoyC); hoyT.colorSpace = THREE.SRGBColorSpace; hoyT.anisotropy = 8;
function dibujarHoy(n) {
  if (hoyClave === String(n)) return; hoyClave = String(n);
  const x = hoyC.getContext("2d"), w = 768, h = 300;
  x.fillStyle = NAV0; rr(x, 0, 0, w, h, 50); x.strokeStyle = VER; x.lineWidth = 14; x.beginPath(); x.roundRect(14, 14, w - 28, h - 28, 40); x.stroke();
  x.fillStyle = CRE; x.font = F(800, 96); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Hoy:", 54, 156);
  x.fillStyle = VER; x.font = F(900, 128); x.textAlign = "center"; x.fillText(String(n), 330, 154);
  x.fillStyle = CRE; x.font = F(800, 80); x.textAlign = "left"; x.fillText("pedidos", 422, 160);
  hoyT.needsUpdate = true;
}
dibujarHoy(12);
const hoy = new THREE.Group(); scene.add(hoy);
{
  const fm = new THREE.MeshStandardMaterial({ map: hoyT, roughness: 0.55, emissive: 0xffffff, emissiveMap: hoyT, emissiveIntensity: 0.3 });
  hoy.add(mesh(rbox(0.72, 0.28, 0.035, 0.03), [M.navy, M.navy, M.navy, M.navy, fm, M.navy]));
  const pata = mesh(new THREE.BoxGeometry(0.4, 0.2, 0.02), M.navy, 0, -0.06, -0.06); pata.rotation.x = -0.5; hoy.add(pata);
  sh(hoy);
}
// ---- los personajes ----
const graciela = crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 2.9 }); scene.add(graciela.raiz);
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 3.3 }); scene.add(ruben.raiz);
for (const p of [graciela, ruben]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const GX = AX, GZ = 10.3; // Graciela en la vereda de enfrente, de frente a cámara (el almacén atrás)
const RZ = -1.55;
const mate = crearMate(); scene.add(mate);
// el celular de Graciela (pantalla en +z): el sitio de Rubén
const SW = 720, SH = 1480;
const sitioC = document.createElement("canvas"); sitioC.width = SW; sitioC.height = SH;
const sitioT = new THREE.CanvasTexture(sitioC); sitioT.colorSpace = THREE.SRGBColorSpace; sitioT.anisotropy = 8;
let sitioClave = "";
const PLATOS = [["Tarta de jamón y queso", "tarta"], ["Pan casero", "pan"], ["Milanesas", "mila"]];
function iconoPlato(x, k, cx, cy, s) {
  if (k === "tarta") { x.fillStyle = "#c98b3c"; x.beginPath(); x.ellipse(cx, cy + s * 0.15, s, s * 0.55, 0, 0, 7); x.fill(); x.fillStyle = "#f2c76a"; x.beginPath(); x.ellipse(cx, cy, s * 0.8, s * 0.42, 0, 0, 7); x.fill(); x.strokeStyle = "#c98b3c"; x.lineWidth = s * 0.12; for (const d of [-0.4, 0, 0.4]) { x.beginPath(); x.moveTo(cx + d * s - s * 0.2, cy - s * 0.35); x.lineTo(cx + d * s + s * 0.2, cy + s * 0.35); x.stroke(); } }
  else if (k === "pan") { x.fillStyle = "#c98b3c"; x.beginPath(); x.ellipse(cx, cy, s, s * 0.6, 0, 0, 7); x.fill(); x.strokeStyle = "#f2d9a0"; x.lineWidth = s * 0.12; x.lineCap = "round"; for (const d of [-0.45, 0, 0.45]) { x.beginPath(); x.moveTo(cx + d * s - s * 0.15, cy - s * 0.3); x.lineTo(cx + d * s + s * 0.15, cy + s * 0.3); x.stroke(); } }
  else { x.fillStyle = "#d9a441"; x.beginPath(); x.ellipse(cx, cy, s, s * 0.62, -0.3, 0, 7); x.fill(); x.fillStyle = "#f2d9a0"; x.beginPath(); x.ellipse(cx + s * 0.3, cy - s * 0.15, s * 0.3, s * 0.18, -0.3, 0, 7); x.fill(); }
}
function dibujarSitio({ ped = 0, res = 0, pide = 0 }) {
  const clave = `${ped}|${res}|${pide}`; if (clave === sitioClave) return; sitioClave = clave;
  const x = sitioC.getContext("2d");
  x.fillStyle = "#f6f5ee"; x.fillRect(0, 0, SW, SH);
  // encabezado
  x.fillStyle = NAV0; x.fillRect(0, 0, SW, 300);
  x.fillStyle = CRE; x.font = F(900, 74); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Almacén Rubén", 44, 120);
  x.fillStyle = VER; rr(x, 44, 196, 250, 70, 35); x.fillStyle = NAV0; x.font = F(800, 42); x.textAlign = "center"; x.fillText("Abierto", 169, 232);
  x.fillStyle = CRE; x.font = F(600, 44); x.textAlign = "left"; x.fillText("8 a 21 h", 324, 234);
  // la sección
  x.fillStyle = NAV0; x.font = F(900, 60); x.textAlign = "left"; x.fillText("Lo más pedido", 44, 380); x.fillText("del barrio", 44, 450);
  x.fillStyle = VER; x.fillRect(44, 494, 200, 12);
  PLATOS.forEach(([nom, k], i) => {
    const y = 540 + i * 186;
    if (i >= ped) { x.fillStyle = "#e6e4da"; rr(x, 36, y, SW - 72, 166, 28); x.fillStyle = "#d4d2c6"; rr(x, 64, y + 30, 106, 106, 20); rr(x, 196, y + 46, 330 - i * 40, 36, 18); rr(x, 196, y + 100, 200, 28, 14); return; }
    x.fillStyle = i === 0 ? NAV0 : "#ffffff"; rr(x, 36, y, SW - 72, 166, 28);
    x.strokeStyle = NAV0; x.lineWidth = 6; x.beginPath(); x.roundRect(36, y, SW - 72, 166, 28); x.stroke();
    // medalla con el puesto
    x.fillStyle = VER; x.beginPath(); x.arc(118, y + 83, 54, 0, 7); x.fill(); x.lineWidth = 6; x.strokeStyle = NAV0; x.stroke();
    x.fillStyle = NAV0; x.font = F(900, 64); x.textAlign = "center"; x.fillText(String(i + 1), 118, y + 86);
    iconoPlato(x, k, SW - 120, y + 83, 52);
    x.fillStyle = i === 0 ? CRE : NAV0; x.textAlign = "left"; x.font = F(800, 50);
    if (x.measureText(nom).width > 380) { const ps = nom.split(" "), m = Math.ceil(ps.length / 2); x.font = F(800, 46); x.fillText(ps.slice(0, m).join(" "), 194, y + 44); x.fillText(ps.slice(m).join(" "), 194, y + 94); }
    else x.fillText(nom, 194, y + 62);
    x.fillStyle = i === 0 ? VER : "#3fa60a"; x.font = F(700, 38); x.fillText(["32 vecinos", "27 vecinos", "19 vecinos"][i], 194, y + 140);
  });
  // reseñas
  const y0 = 1110;
  if (res) {
    [["Las tartas, un 10", "Marta"], ["Siempre fresco", "Nico"]].forEach(([txt, q], i) => {
      const y = y0 + i * 112;
      x.fillStyle = "#ffffff"; rr(x, 36, y, SW - 72, 98, 24); x.strokeStyle = "#d4d2c6"; x.lineWidth = 4; x.beginPath(); x.roundRect(36, y, SW - 72, 98, 24); x.stroke();
      x.fillStyle = VERD; for (let k = 0; k < 5; k++) { const cx = 76 + k * 40, cy = y + 49; x.beginPath(); for (let j = 0; j < 10; j++) { const a = -Math.PI / 2 + (j * Math.PI) / 5, r = j % 2 ? 8 : 18; x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } x.fill(); }
      x.fillStyle = NAV0; x.font = F(700, 40); x.textAlign = "left"; x.fillText(txt, 290, y + 40); x.fillStyle = "#4a5568"; x.font = F(600, 32); x.fillText("· " + q, 290, y + 78);
    });
  } else { x.fillStyle = "#e6e4da"; rr(x, 36, y0, SW - 72, 98, 24); rr(x, 36, y0 + 112, SW - 72, 98, 24); }
  // botón Pedir
  x.fillStyle = pide ? VER : NAV0; rr(x, 36, 1344, SW - 72, 108, 54);
  x.fillStyle = pide ? NAV0 : CRE; x.font = F(900, 56); x.textAlign = "center"; x.fillText(pide ? "Pedido enviado ✓" : "Pedir", SW / 2, 1400);
  sitioT.needsUpdate = true;
}
dibujarSitio({});
const CW = 0.08, CH = 0.164;
const celu = new THREE.Group(); scene.add(celu);
{
  celu.add(mesh(rbox(CW, CH, 0.009, 0.011), mat(0x1a2236, 0.35)));
  const pm = new THREE.MeshBasicMaterial({ map: sitioT, toneMapped: false });
  const p = mesh(new THREE.PlaneGeometry(CW * 0.9, CH * 0.925), pm, 0, 0, 0.0047); celu.add(p);
  sh(celu); p.castShadow = false;
}
// el celular de Rubén (sobre el mostrador)
const notifT = tex(400, 760, (x, w, h) => {
  x.fillStyle = NAV0; x.fillRect(0, 0, w, h);
  x.fillStyle = CRE; rr(x, 24, 200, w - 48, 300, 34);
  x.fillStyle = VER; x.beginPath(); x.arc(84, 270, 34, 0, 7); x.fill();
  x.fillStyle = NAV0; x.font = F(800, 46); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Pedido", 136, 272);
  x.font = F(700, 38); x.fillText("Graciela", 50, 360); x.fillStyle = "#3a4256"; x.font = F(600, 34); x.fillText("1 tarta jyq", 50, 430);
});
const pantR = new THREE.MeshStandardMaterial({ color: 0x0b1220, emissive: 0xffffff, emissiveMap: notifT, map: notifT, emissiveIntensity: 0 });
const celuR = new THREE.Group(); scene.add(celuR);
{ celuR.add(mesh(rbox(0.1, 0.016, 0.19, 0.014), mat(0x2a3346, 0.35))); const p = mesh(new THREE.PlaneGeometry(0.09, 0.174), pantR); p.rotation.x = -Math.PI / 2; p.position.y = 0.0087; celuR.add(p); sh(celuR); }
const vib = new THREE.Group(); scene.add(vib);
{
  const gm = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.8 });
  for (const s of [-1, 1]) for (const k of [0, 1]) { const a = mesh(new THREE.TorusGeometry(0.12 + k * 0.06, 0.011, 6, 16, 1.1), gm); a.rotation.set(-Math.PI / 2, 0, s > 0 ? -0.55 : Math.PI - 0.55); vib.add(a); }
}

// ---- la nube de pensamiento de Graciela (de por-que-el-mozo) con tres antojos: tarta, pan casero, huevos ----
const nubeM = new THREE.MeshPhysicalMaterial({ color: 0xf7f6ef, roughness: 0.55, clearcoat: 0.3, emissive: 0xefeee5, emissiveIntensity: 0.16 });
const nubeBordeM = new THREE.MeshBasicMaterial({ color: 0x16243d, side: THREE.BackSide });
const ESF = [[-0.36, -0.04, 0.27], [-0.14, 0.14, 0.31], [0.16, 0.16, 0.3], [0.4, 0.0, 0.25], [0.18, -0.15, 0.26], [-0.14, -0.15, 0.25], [0.0, 0.0, 0.32]];
const esfGeo = new THREE.SphereGeometry(1, 36, 24);
function hacerNube(cola = -1) {
  const g = new THREE.Group(); const cuerpo = new THREE.Group(); g.add(cuerpo);
  for (const [x, y, r] of ESF) {
    const b = mesh(esfGeo, nubeM, x, y, 0); b.scale.set(r, r, r * 0.55); cuerpo.add(b);
    const o = mesh(esfGeo, nubeBordeM, x, y, -0.01); o.scale.set(r + 0.03, r + 0.03, r * 0.55 + 0.02); cuerpo.add(o);
  }
  for (const [x, y, r] of [[0.5, -0.4, 0.085], [0.68, -0.58, 0.055]]) {
    const b = mesh(esfGeo, nubeM, cola * x, y, 0); b.scale.set(r, r, r * 0.8); g.add(b);
    const o = mesh(esfGeo, nubeBordeM, cola * x, y, -0.01); o.scale.set(r + 0.022, r + 0.022, r * 0.8 + 0.012); g.add(o);
  }
  const items = new THREE.Group(); items.position.z = 0.22; g.add(items);
  g.userData = { cuerpo, items };
  scene.add(g); return g;
}
function hacerTarta() {
  const g = new THREE.Group();
  const masa = mat(0xc98b3c, 0.6), relleno = mat(0xf2c76a, 0.55);
  g.add(mesh(new THREE.CylinderGeometry(0.5, 0.44, 0.16, 40), masa, 0, 0.08, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.03, 40), relleno, 0, 0.165, 0));
  const borde = mesh(new THREE.TorusGeometry(0.46, 0.06, 10, 40), masa, 0, 0.17, 0); borde.rotation.x = Math.PI / 2; g.add(borde);
  for (let i = -2; i <= 2; i++) { const t = mesh(rbox(0.06, 0.03, 0.84 - Math.abs(i) * 0.12, 0.012), masa, i * 0.16, 0.19, 0); t.rotation.y = 0.5; g.add(t); }
  return g;
}
function hacerPan() {
  const g = new THREE.Group();
  const p = mesh(new THREE.SphereGeometry(0.5, 30, 18), mat(0xc98b3c, 0.65), 0, 0.2, 0); p.scale.set(1, 0.48, 0.62); g.add(p);
  for (const d of [-0.25, 0, 0.25]) { const c = mesh(rbox(0.06, 0.03, 0.3, 0.012), mat(0xf2d9a0, 0.7), d, 0.43, 0); c.rotation.y = 0.5; g.add(c); }
  return g;
}
const nubeG = hacerNube(-1);
const ANTOJOS = [{ o: hacerTarta(), k: 0.3, p: [-0.3, 0.06] }, { o: hacerPan(), k: 0.3, p: [0.12, 0.16] }, { o: crearMaple(), k: 0.9, p: [0.36, -0.1] }].map((it) => {
  const h = new THREE.Group(); h.add(it.o); it.o.scale.setScalar(it.k); it.o.rotation.set(0.6, 0.3, 0); nubeG.userData.items.add(h); it.h = h; return it;
});

// ---- el callback: la tarjeta "Lo más pedido del barrio" (misma forma que el cartel) y un tramo de toallero ----
const tagPedido = hacerTag("pedido"); { const co = cordon(TAGDY, TAGZ); tagPedido.add(co); tagPedido.userData.cordon = co; }
const tagEco = hacerTag("mayoria", 3); { const co = cordon(TAGDY, TAGZ); tagEco.add(co); tagEco.traverse((o) => { if (o.isMesh) o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone(); }); }
const barraCb = new THREE.Group(); scene.add(barraCb);
{ const b = mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 24), M.cromo); b.rotation.z = Math.PI / 2; barraCb.add(b); for (const s of [-1, 1]) barraCb.add(mesh(new THREE.SphereGeometry(0.042, 18, 12), M.cromo, s * 0.75, 0, 0)); sh(barraCb); }
// el destello verde cuando encajan (marco de selección)
const marcoSel = new THREE.Group(); scene.add(marcoSel);
{
  const w = TW + 0.1, h = TH + 0.1, e = 0.028;
  const gm = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.7, roughness: 0.4 });
  for (const [x, y, ww, hh] of [[0, h / 2, w, e], [0, -h / 2, w, e], [w / 2, 0, e, h], [-w / 2, 0, e, h]]) marcoSel.add(mesh(new THREE.BoxGeometry(ww, hh, 0.02), gm, x, y, 0));
  for (const [x, y] of [[-w / 2, h / 2], [w / 2, h / 2], [-w / 2, -h / 2], [w / 2, -h / 2]]) { marcoSel.add(mesh(new THREE.BoxGeometry(0.075, 0.075, 0.025), mat(0xffffff, 0.4), x, y, 0.012)); marcoSel.add(mesh(new THREE.BoxGeometry(0.05, 0.05, 0.03), gm, x, y, 0.014)); }
}

// ================= EL CIERRE: el cartelito con el tilde, colgado de un toallero =================
const tagFin = hacerTag("fin"); { const co = cordon(TAGDY, TAGZ); tagFin.add(co); }
const barraFin = new THREE.Group(); scene.add(barraFin);
{ const b = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.95, 24), M.cromo); b.rotation.z = Math.PI / 2; barraFin.add(b); for (const s of [-1, 1]) barraFin.add(mesh(new THREE.SphereGeometry(0.042, 18, 12), M.cromo, s * 0.475, 0, 0)); sh(barraFin); }
const sombraFin = sombra(0.9, 0.5, 0.35);

// ================= TIEMPOS CLAVE =================
const T = {
  mayoria: W[8] - 0.05, toalla: W[11] - 0.03,
  s02: S["s02-carteles"], estudio: W[13], carteles: W[16] - 0.05,
  s03: S["s03-ambiente"], pedia: W[18] - 0.05, ambiente: W[21] - 0.05,
  s04: S["s04-mayoria"], mayoria2: W[25] - 0.05, gano: W[28] - 0.05, segundo: W[30] - 0.05,
  s05: S["s05-por-que"], que: W[32],
  s06: S["s06-demas"], decidir: W[35], demas: W[39] - 0.05,
  s07: S["s07-habitacion"], los: W[43] - 0.05, habit: W[46] - 0.05, todavia: W[48] - 0.05,
  s08: S["s08-graciela"], duda: W[50] - 0.05, ruben: W[54] - 0.05,
  s09: S["s09-sitio"], sitio: W[56] - 0.05, pedido: W[63] - 0.05, barrio: W[65] - 0.05,
  s10: S["s10-cartel"], cartel: W[68] - 0.05, toalla2: W[71] - 0.05,
  s11: S["s11-local"], local: W[76] - 0.05, agenda: W[77] - 0.05,
  fin: S["s12-llamada"],
};
T.armaQ = T.s05 - 0.25; // en la pausa antes de "¿Por qué?" las toallas verdes se juntan en el "?"
T.cae = T.gano - 0.02;

// ================= CÁMARA =================
// PLANOS: [desde, [[t, px, py, pz, mx, my, mz, fov], ...]]; dentro de un plano, Catmull-Rom monótona; entre planos, corte.
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const h = (x, y, z) => [OH.x + x, y, z];
const TAGB = (i) => V(TOX[i], BAR.y - TAGDY, BAR.z + TAGZ); // ojal de cada cartel
const c214 = (x, y, z) => [P214.x + x, P214.y + y, P214.z + z];
const CELU_K1 = k(T.sitio + 0.5, [0, 0, 0.42], [0, 0, 0]);
const CELU_K2 = k(T.s10 - 0.02, [0, 0, 0.44], [0, 0, 0]);
CELU_K1.rel = CELU_K2.rel = true;
const PLANOS = [
  [0, [
    // s01: el cartel de la mayoría sobre la toalla, push-in lento
    k(0, [0.5, 1.6, 3.15], [0.47, 1.56, -0.12]),
    k(T.s02 - 0.05, [0.49, 1.59, 2.95], [0.47, 1.55, -0.12]),
    // s02: travelling atrás y a la izquierda: las dos toallas y los dos carteles
    k(T.s02 + 0.7, [0.02, 1.42, 4.85], [0, 1.4, -0.12]),
    k(T.s03 - 0.02, [0.0, 1.42, 4.7], [0, 1.4, -0.12]),
    // s03: push-in al cartel de la izquierda
    k(T.s03 + 0.55, [-0.47, 1.36, 2.18], [-0.47, 1.32, 0.0]),
    k(T.s04 - 0.02, [-0.47, 1.36, 2.05], [-0.47, 1.32, 0.0]),
    // s04: paneo al de la derecha
    k(T.s04 + 0.45, [0.47, 1.36, 2.18], [0.47, 1.32, 0.0]),
    k(T.gano - 0.02, [0.47, 1.36, 2.05], [0.47, 1.32, 0.0]),
    // "Ganó": atrás y abajo, las dos pilas
    k(T.gano + 0.65, [0.0, 1.35, 5.4], [0, 0.88, 0.55], 36),
    k(T.armaQ - 0.05, [0.0, 1.33, 5.2], [0, 0.88, 0.55], 36),
    // s05: push-in al "?"
    k(T.armaQ + 0.6, [0.12, 1.05, 3.55], [0, 0.98, 0.55]),
    k(T.s06 - 0.02, [-0.12, 1.05, 3.35], [0, 0.98, 0.55]),
  ]],
  // s06: CORTE al "?" del cuarto 214 (mismo encuadre) y grúa atrás: el hotel en corte
  [T.s06, [
    k(T.s06, c214(0.1, 1.95, 3.3), c214(0.0, 1.62, -1.25)),
    k(T.s06 + 0.25, c214(0.1, 2.05, 4.3), c214(0.0, 1.65, -1.25)),
    k(T.s06 + 0.95, h(0.3, 6.6, 27), h(0, 6.2, -1)),
    k(T.s07 - 0.05, h(0.25, 6.5, 26.4), h(0, 6.15, -1)),
    // s07: push-in a la 214 hasta el cartel
    k(T.s07 + 0.7, c214(-0.42, 1.5, 2.9), c214(-0.42, 1.3, -RD + 0.3)),
    k(T.habit - 0.1, c214(-0.45, 1.42, 0.25), c214(-0.45, 1.13, -RD + 0.3)),
    k(T.habit + 0.25, c214(-0.45, 1.42, 0.05), c214(-0.45, 1.13, -RD + 0.3)),
    // "más todavía": atrás y a la derecha: el cartel, las pilas y los números
    k(T.todavia - 0.12, c214(0.3, 1.5, 5.3), c214(0.3, 0.95, -0.9)),
    k(T.s08 - 0.15, c214(0.3, 1.5, 5.15), c214(0.3, 0.95, -0.9)),
    // s08: sale del hotel y viaja por la calle hasta Graciela (el almacén atrás)
    k(T.s08 + 0.45, h(5.0, 5.4, 16), h(8.5, 2.0, 4)),
    k(T.s08 + 0.95, [GX + 0.28, 1.74, GZ + 3.1], [GX + 0.02, 1.54, GZ]),
    k(T.s09 - 0.02, [GX + 0.25, 1.72, GZ + 2.9], [GX + 0.02, 1.52, GZ]),
    // s09: push-in al celular que muestra
    CELU_K1, CELU_K2,
    // s10: atrás: la tarjeta sale del celular y cuelga; entra el cartel de la toalla
    k(T.s10 + 0.45, [GX - 0.02, 1.42, GZ + 2.05], [GX - 0.02, 1.38, GZ + 0.9]),
    k(T.s11 - 0.02, [GX - 0.02, 1.42, GZ + 1.98], [GX - 0.02, 1.38, GZ + 0.9]),
    // s11: la tarjeta vuela al almacén y la cámara la sigue por arriba de la calle: Rubén detrás del mostrador
    k(T.s11 + 0.22, [GX + 0.3, 2.9, GZ + 2.7], [GX, 1.5, 3]),
    k(T.s11 + 0.5, [GX + 0.6, 3.2, GZ - 2.5], [GX, 1.6, 2]),
    k(T.s11 + 0.95, [GX + 0.03, 2.3, 3.6], [GX - 0.05, 1.12, RZ]),
    k(T.fin - 0.02, [GX + 0.02, 2.26, 3.35], [GX - 0.05, 1.12, RZ]),
  ]],
  [T.fin, [
    k(T.fin, [OF.x, 1.62, 4.1], [OF.x, 1.58, 0]),
    k(DUR, [OF.x, 1.62, 3.9], [OF.x, 1.58, 0]),
  ]],
];
const _mira = new THREE.Vector3();
let plano = 0;
let CELU_P = null;
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
  plano = pi;
  let K = PLANOS[pi][1];
  if (K.some((q) => q.rel)) {
    if (!CELU_P) { const pl = plano; plano = 1; zonaH(T.sitio + 0.7); celu.updateMatrixWorld(true); CELU_P = celu.getWorldPosition(new THREE.Vector3()); plano = pl; }
    K = K.map((q) => (q.rel ? [q[0], CELU_P.x + q[1], CELU_P.y + q[2] + 0.01, CELU_P.z + q[3], CELU_P.x + q[4], CELU_P.y + q[5], CELU_P.z + q[6], q[7]] : q));
  }
  let i = 0; while (i + 1 < K.length - 1 && K[i + 1][0] <= t) i++;
  const a = K[i], b = K[Math.min(i + 1, K.length - 1)];
  const hh = b[0] - a[0];
  const u = hh > 0 ? cl((t - a[0]) / hh) : 0;
  const tang = (j, c) => {
    if (j <= 0 || j >= K.length - 1) return 0;
    const p = K[j - 1], q = K[j], r = K[j + 1];
    if (q[0] - p[0] < 0.05 || r[0] - q[0] < 0.05) return 0;
    const d1 = (q[c] - p[c]) / Math.max(1e-4, q[0] - p[0]), d2 = (r[c] - q[c]) / Math.max(1e-4, r[0] - q[0]);
    if (d1 * d2 <= 0) return 0;
    const m = (r[c] - p[c]) / Math.max(1e-4, r[0] - p[0]);
    return Math.sign(m) * Math.min(Math.abs(m), 3 * Math.abs(d1), 3 * Math.abs(d2));
  };
  const s2 = u * u, s3 = s2 * u;
  const v = [];
  for (let c = 1; c <= 7; c++) {
    if (hh <= 0) { v.push(a[c]); continue; }
    v.push((2 * s3 - 3 * s2 + 1) * a[c] + (s3 - 2 * s2 + u) * hh * tang(i, c) + (-2 * s3 + 3 * s2) * b[c] + (s3 - s2) * hh * tang(i + 1, c));
  }
  camera.position.set(v[0], v[1], v[2]);
  camera.position.x += Math.sin(t * 0.7) * 0.004; camera.position.y += Math.sin(t * 0.53) * 0.003;
  _mira.set(v[3], v[4], v[5]);
  camera.fov = v[6];
  const d = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.02, d * 0.02); camera.far = 260;
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
}

// ================= ZONA B en el tiempo =================
function zonaB(t) {
  const en = plano === 0;
  banio.visible = en;
  // ---- las toallas colgadas: en "Ganó" se deslizan de la barra y caen a la base de su pila ----
  toallasB.forEach((tw, i) => {
    const u = eio(sg(t, T.cae, T.cae + 0.32));
    tw.visible = en && u < 0.97;
    if (!tw.visible) return;
    tw.position.set(TOX[i] + lerp(0, PILA.x[i] - TOX[i], u), BAR.y - u * 1.6 + rebote(t, T.toalla, 12, 30, 0.012) * (i === 1 ? 1 : 0), BAR.z + u * 0.6);
    tw.scale.set(1, 1 - u * 0.75, 1);
    tw.rotation.x = u * 0.5;
  });
  // ---- los carteles ----
  tagsB.forEach((g, i) => {
    g.visible = en && t < T.armaQ + 0.25;
    if (!g.visible) return;
    const giro = g.userData.giro;
    // estado del frente
    if (i === 1) {
      if (t < T.s02 + 0.2) ponerTag(g, "mayoria", t > T.mayoria ? Math.min(3, 1 + Math.floor((t - T.mayoria) / 0.12)) : 0);
      else if (t < T.mayoria2 - 0.3) ponerTag(g, "gente", 0);
      else ponerTag(g, "mayoria", t > T.mayoria2 ? Math.min(3, 1 + Math.floor((t - T.mayoria2) / 0.12)) : 0);
    } else ponerTag(g, t < T.pedia ? "hoja" : "ambiente");
    // giros: el de la derecha se da vuelta al arrancar s02; en "carteles" los dos vuelven de frente
    let ry = 0;
    if (i === 1) ry = Math.PI * eio(sg(t, T.s02, T.s02 + 0.35));
    else ry = Math.PI;
    ry += Math.PI * eio(sg(t, T.carteles, T.carteles + 0.4));
    // balanceo: en "mayoría" (s01), al girar, al estampar y al caer
    const bal = rebote(t, T.mayoria, 3.2, 7.5, 0.16) * (i === 1 ? 1 : 0) + rebote(t, T.carteles + 0.35, 3.5, 8, 0.07) + (i === 0 ? rebote(t, T.pedia, 4, 9, 0.06) : rebote(t, T.mayoria2, 4, 9, 0.08));
    giro.rotation.set(0, ry, bal);
    // en "Ganó" el cartel se suelta del cordón y vuela a apoyarse al pie de su pila, más chico
    const u = eio(sg(t, T.cae + 0.12, T.cae + 0.55));
    const base = TAGB(i);
    const dest = V(PILA.x[i] + (i ? 0.03 : -0.03), 0.2, PILA.z + 0.36);
    g.position.copy(arco(base, dest, u, 0.25));
    g.rotation.set(-0.25 * u, 0, (i ? -0.12 : 0.12) * u);
    const kk = lerp(1, 0.52, u) * (1 + 0.06 * pulso(t, i ? T.mayoria2 : T.pedia, 0.25)) * (1 - eio(sg(t, T.armaQ - 0.05, T.armaQ + 0.25)));
    g.scale.setScalar(Math.max(0.001, kk));
    g.userData.cordon.visible = u < 0.05;
  });
  // ---- las pilas: las toallas caen de a una ----
  const sube = eio(sg(t, T.armaQ, T.armaQ + 0.45));
  pilasB.forEach((pila, kk) => pila.forEach((m, i) => {
    const n = PILA.n[kk];
    const t0 = T.cae + 0.16 + i * ((kk ? 0.48 : 0.4) / n);
    let vis = en && t > t0 - 0.02 && t < T.armaQ + 0.5;
    if (kk === 0 && t > T.armaQ + 0.3) vis = false;
    m.visible = vis; if (!vis) return;
    const yF = 0.041 + PILA.dh * i;
    const u = sg(t, t0, t0 + 0.14);
    let p = V(PILA.x[kk] + Math.sin(i * 2.3 + kk) * 0.018, lerp(yF + 0.45, yF, u * u) + rebote(t, t0 + 0.14, 18, 40, 0.01), PILA.z + Math.cos(i * 1.7 + kk) * 0.015);
    let ry = Math.sin(i * 1.3 + kk) * 0.07, rx = 0, rz = 0;
    let sc = 1;
    if (kk === 1 && sube > 0) {
      // cada toalla verde vuela a su lugar sobre el trazo del "?" y se achica adentro
      const a = (i / n) * Math.PI * 1.5;
      const dest = QB.clone().add(V(Math.sin(a) * 0.25, 0.25 + Math.cos(a) * 0.22 - (i / n) * 0.3, 0));
      p = arco(p, dest, sube, 0.2); ry += sube * 2.5; rx = sube * 1.2;
      sc = 1 - eio(sg(sube, 0.55, 1)) * 0.95;
    } else if (kk === 0) sc = 1 - eio(sg(t, T.armaQ - 0.02, T.armaQ + 0.28));
    m.position.copy(p); m.rotation.set(rx, ry, rz); m.scale.setScalar(Math.max(0.001, sc));
  }));
  sombraPilas.forEach((s, kk) => { s.visible = en && t > T.cae + 0.25 && t < T.armaQ + 0.4; s.position.set(PILA.x[kk], 0.004, PILA.z); });
  // ---- los números, arriba de cada pila (aparecen cuando la pila termina) ----
  numsB.forEach((m, kk) => {
    const top = 0.041 + PILA.dh * (PILA.n[kk] - 0.5);
    const t0 = T.cae + 0.16 + (kk ? 0.48 : 0.4) + 0.12;
    const v = en && t > t0 && t < T.armaQ + 0.3;
    const sc = v ? popIn(t, t0, 0.3) * (1 + (kk ? 0.12 * pulso(t, T.segundo, 0.3) : 0)) * (1 - eio(sg(t, T.armaQ - 0.02, T.armaQ + 0.28))) : 0;
    ocultar(m, sc);
    m.position.set(PILA.x[kk], top + 0.2 + rebote(t, t0 + 0.3, 8, 22, 0.02), PILA.z + 0.05);
    m.rotation.set(-0.05, Math.sin(t * 1.3 + kk) * 0.05, 0);
  });
  // ---- el "?" ----
  {
    const v = en && t > T.armaQ + 0.25;
    const kq = v ? popIn(t, T.armaQ + 0.3, 0.32) * (1 + 0.08 * pulso(t, T.que, 0.3)) : 0;
    ocultar(pregunta, kq);
    pregunta.position.copy(QB).add(V(0, 0.1, 0)); pregunta.rotation.set(0, Math.sin((t - T.armaQ) * 1.6) * 0.3, 0);
    sombraQ.visible = pregunta.visible; sombraQ.position.set(QB.x, 0.005, QB.z); sombraQ.scale.setScalar(Math.max(0.01, kq));
  }
}

// ================= ZONA H en el tiempo =================
function zonaH(t) {
  const en = plano === 1;
  barrio.visible = en;
  graciela.raiz.visible = ruben.raiz.visible = mate.visible = celu.visible = celuR.visible = hoy.visible = en;
  nubeG.visible = en;
  if (!en) { tag214.visible = pregunta2.visible = vib.visible = tagPedido.visible = tagEco.visible = barraCb.visible = marcoSel.visible = false; pilas2.flat().forEach((m) => (m.visible = false)); nums2.forEach((m) => (m.visible = false)); luzAlmacen.intensity = 0; return; }
  // ---- las habitaciones: en "demás" las toallas se cuelgan en cadena y se prenden en verde ----
  const orden = [0, 2, 10, 4, 8, 6, 11, 1, 9, 3, 7].map((i) => i); // las otras 11, mezcladas
  CUARTOS.forEach((q) => {
    const es214 = q === C214;
    const j = es214 ? 99 : orden.indexOf(CUARTOS.indexOf(q) > 4 ? CUARTOS.indexOf(q) - 1 : CUARTOS.indexOf(q));
    const tc = es214 ? T.demas + 0.55 : T.demas - 0.35 + Math.max(0, j) * 0.07;
    const colg = t > tc;
    q.toalla.visible = colg;
    if (colg) { const kk = popIn(t, tc, 0.25); q.toalla.scale.set(1, kk, 1); }
    q.enMano.visible = !colg;
    // el huésped mira (cabecea) mientras duda; el de la 214 mira a los demás
    q.hu.rotation.y = es214 ? Math.sin(t * 2.2) * 0.25 * (colg ? 0 : 1) : 0;
    q.hu.position.y = 0;
    ocultar(q.tilde, colg && t < T.s07 + 0.4 ? popIn(t, tc + 0.12, 0.25) * (1 - eio(sg(t, T.s07, T.s07 + 0.3))) : 0);
    if (q.tilde.visible) q.tilde.quaternion.copy(camera.quaternion);
    // la placa 214 late en "habitación"
    if (es214) q.placa.scale.setScalar(1 + 0.35 * pulso(t, T.habit, 0.35));
  });
  // la toalla y el cartel de la 214: la toalla está colgada desde el principio (el cartel cuelga sobre ella)
  C214.toalla.visible = true; C214.toalla.scale.set(1, 1, 1);
  C214.enMano.visible = t < T.demas + 0.55;
  // el huésped de la 214 no tapa las pilas en s07: sale por la puerta (se corre a la derecha y se achica hasta la puerta)
  {
    const u = eio(sg(t, T.s07 + 0.2, T.s07 + 0.9));
    C214.hu.position.set(lerp(0.05, 1.05, u), 0, lerp(-1.25, -2.25, u));
    C214.hu.visible = u < 0.98;
  }
  // el cartel de la 214
  {
    tag214.visible = true;
    const b = C214.bar.clone().add(P214);
    tag214.position.set(b.x, b.y - 0.14, b.z + 0.12); tag214.scale.setScalar(0.92);
    const flip = eio(sg(t, T.los, T.los + 0.4));
    ponerTag(tag214, flip < 0.5 ? "mayoria" : "214", t > T.habit ? 1 : 0);
    tag214.userData.giro.rotation.set(0, Math.PI * 2 * flip, rebote(t, T.los + 0.4, 4, 9, 0.07) + rebote(t, T.habit, 4, 9, 0.05));
    tag214.userData.giro.scale.setScalar(1 + 0.08 * pulso(t, T.habit, 0.3));
  }
  // el "?" sobre el huésped de la 214 (s06): grande en el corte, se achica arriba de su cabeza; se va cuando cuelga la toalla
  {
    const v = t < T.demas + 0.6;
    const u = eio(sg(t, T.s06 + 0.05, T.s06 + 0.6));
    const kq = v ? lerp(0.55, 0.42, u) * (1 - eio(sg(t, T.demas + 0.35, T.demas + 0.6))) : 0;
    ocultar(pregunta2, kq);
    pregunta2.position.set(P214.x + 0.05, P214.y + lerp(2.08, 2.0, u), P214.z - 1.25);
    pregunta2.rotation.set(0, Math.sin((t - T.s06) * 2.2) * 0.35, 0);
  }
  // las pilas del exp. 2 y sus números (dentro de la 214)
  pilas2.forEach((pila, kk) => pila.forEach((m, i) => {
    const n = PILA2.n[kk];
    const t0 = T.todavia - 0.15 + i * ((kk ? 0.5 : 0.42) / n);
    const fuera = eio(sg(t, T.s08 - 0.1, T.s08 + 0.15));
    m.visible = t > t0 - 0.02 && fuera < 0.98; if (!m.visible) return;
    const yF = 0.041 + PILA.dh * i;
    const u = sg(t, t0, t0 + 0.12);
    m.position.set(P214.x + PILA2.x[kk] + Math.sin(i * 2.3 + kk) * 0.015, P214.y + lerp(yF + 0.7, yF, u * u) + rebote(t, t0 + 0.12, 18, 40, 0.008), P214.z + PILA2.z + Math.cos(i * 1.7) * 0.012);
    m.rotation.set(0, Math.sin(i * 1.3 + kk) * 0.07, 0); m.scale.setScalar(Math.max(0.001, 1 - fuera));
  }));
  nums2.forEach((m, kk) => {
    const top = 0.041 + PILA.dh * (PILA2.n[kk] - 0.5);
    const t0 = T.todavia - 0.15 + (kk ? 0.5 : 0.42) + 0.08;
    const sc = t > t0 ? popIn(t, t0, 0.3) * (1 + (kk ? 0.1 * pulso(t, t0 + 0.3, 0.3) : 0)) * (1 - eio(sg(t, T.s08 - 0.1, T.s08 + 0.15))) : 0;
    ocultar(m, sc);
    m.position.set(P214.x + PILA2.x[kk], P214.y + top + 0.19, P214.z + PILA2.z + 0.05);
    m.rotation.set(-0.08, 0, 0);
  });
  // ---- Graciela ----
  const muestra = eio(sg(t, T.sitio - 0.1, T.sitio + 0.35));
  let pg = poseEn(t, [
    [0, { x: GX, y: 0.12, z: GZ, giro: 0, ...BRAZOS.celular, cabeza: { giro: 0.0, asiente: 0.38, ladea: 0.05 }, ojos: { x: 0, y: -0.9, abiertos: 1 }, cejas: { alto: 0.55, ang: 0.6, asim: 0.4 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.75 } }],
    // "duda": mira arriba, un dedo en el mentón no: el celular quieto, ojos arriba a la derecha
    [T.duda + 0.2, { cabeza: { giro: -0.15, asiente: -0.05, ladea: 0.12 }, ojos: { x: 0.5, y: 0.7, abiertos: 1 }, cejas: { alto: 0.7, ang: 0.7, asim: 0.7 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.6 } }, 0.3],
    [T.ruben + 0.1, { cabeza: { giro: 0.05, asiente: 0.3, ladea: 0.05 }, ojos: { x: 0, y: -0.85, abiertos: 1 }, cejas: { alto: 0.45, ang: 0.4, asim: 0.3 } }, 0.3],
    // "sitio": da vuelta el celular y lo muestra, contenta
    [T.sitio + 0.35, { ...CARA.sonrisa, manoI: [0.085, 0.5, 0.42], manoD: [-0.085, 0.5, 0.42], codoI: [0.7, -0.7, -0.2], codoD: [-0.7, -0.7, -0.2], cabeza: { giro: 0, asiente: 0.12, ladea: -0.05 }, ojos: { x: 0, y: 0.05, abiertos: 1, feliz: 0.3 }, cejas: { alto: 0.4, ang: 0, asim: 0 } }, 0.35],
  ]);
  pg.t = t; graciela.poner(pg); graciela.raiz.updateMatrixWorld(true);
  {
    const mI = graciela.mano("I").getWorldPosition(new THREE.Vector3()), mD = graciela.mano("D").getWorldPosition(new THREE.Vector3());
    const m = mI.add(mD).multiplyScalar(0.5);
    celu.position.copy(m).add(V(0, 0.05 + muestra * 0.08, 0.02 + muestra * 0.1));
    // mirando: pantalla hacia ella (girado PI) y acostado; mostrando: de frente a cámara, inclinado 8°
    celu.rotation.set(lerp(-0.95, 0.04, muestra), Math.PI * (1 - muestra), lerp(0, 0.14, muestra));
    const tPed = T.pedido, tRes = T.barrio;
    dibujarSitio({ ped: t > tPed ? Math.min(3, 1 + Math.floor((t - tPed) / 0.13)) : 0, res: t > tRes ? 1 : 0, pide: t > T.s11 + 0.05 ? 1 : 0 });
  }
  // la nube de pensamiento
  {
    graciela.cabeza.getWorldPosition(_v);
    const v = t > T.duda - 0.05 && t < T.sitio;
    const kn = v ? popIn(t, T.duda - 0.05, 0.3) * (1 - eio(sg(t, T.sitio - 0.3, T.sitio))) : 0;
    nubeG.visible = kn > 0.01;
    nubeG.position.copy(_v).add(V(0.36, 0.46, 0.1)); nubeG.quaternion.copy(camera.quaternion);
    nubeG.scale.setScalar(kn * 0.31 * (1 + 0.03 * Math.sin(t * 5)));
    ANTOJOS.forEach((it, i) => {
      const ki = popIn(t, T.duda + 0.1 + i * 0.14, 0.25);
      it.h.position.set(it.p[0], it.p[1], 0.02); it.h.scale.setScalar(ki);
      it.o.rotation.y = 0.3 + Math.sin(t * 1.6 + i) * 0.35;
    });
  }
  // ---- Rubén detrás del mostrador, con el mate ----
  const avisa = T.s11 + 1.0;
  let pr = poseEn(t, [
    [0, { x: AX, y: 0.13, z: RZ, giro: 0, ...CARA.neutra, manoD: [-0.22, 0.3, 0.4], codoD: [-0.9, -0.6, -0.2], manoI: [0.3, 0.32, 0.36], cabeza: { giro: 0.1, asiente: 0.15, ladea: 0.05 }, ojos: { x: 0.1, y: -0.2, abiertos: 0.7 }, cejas: { alto: 0, ang: 0.3 }, boca: { sonrisa: -0.05, ancho: 0.9 } }],
    // el celular vibra: mira abajo
    [avisa + 0.1, { cabeza: { giro: 0.25, asiente: 0.42, ladea: 0.05 }, ojos: { x: 0.3, y: -0.9, abiertos: 1 }, cejas: { alto: 0.5, ang: 0.1 } }, 0.2],
    // sonríe debajo del bigote, a cámara
    [avisa + 0.45, { ...CARA.sonrisa, cabeza: { giro: 0.05, asiente: 0.0, ladea: 0.08 }, ojos: { x: 0.05, y: 0.05, abiertos: 1, feliz: 0.4 }, cejas: { alto: 0.4, ang: 0 } }, 0.25],
  ]);
  pr.t = t; ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
  ruben.mano("D").getWorldPosition(_v); mate.position.copy(_v).add(V(0.0, 0.0, 0.03)); mate.rotation.set(0, 0.6, 0);
  celuR.position.set(AX + 0.55, MOST.y + 0.04, MOST.z + 0.12); celuR.rotation.set(0, -0.3 + Math.sin(t * 70) * 0.03 * pulso(t, avisa, 0.5), 0);
  pantR.emissiveIntensity = t > avisa ? 0.85 : 0.05;
  vib.visible = t > avisa && t < avisa + 0.55; if (vib.visible) { vib.position.copy(celuR.position).add(V(0, 0.03, 0)); vib.scale.setScalar(1 + 0.25 * Math.sin((t - avisa) * 30)); vib.rotation.y = -0.3; }
  hoy.position.set(AX - 0.3, MOST.y + 0.17, MOST.z + 0.26); hoy.rotation.set(-0.12, 0.12, 0);
  const llega = avisa + 0.3;
  dibujarHoy(t > llega ? 13 : 12); hoy.scale.setScalar(1 + 0.18 * pulso(t, llega, 0.3));
  luzAlmacen.position.set(AX, 2.5, -0.6); luzAlmacen.intensity = 6 + 4 * eio(sg(t, llega, llega + 0.3));
  // ---- el callback: la tarjeta sale del celular, cuelga de un tramo de toallero y encaja con el cartel de la toalla ----
  {
    const sale = eio(sg(t, T.s10 - 0.05, T.s10 + 0.4));
    const vive = t > T.s10 - 0.05;
    const vuela = eio(sg(t, T.s11 + 0.2, T.s11 + 1.0));
    tagPedido.visible = vive && vuela < 0.98;
    const SC = 0.42;
    const colgado = V(GX + 0.03, 1.5, GZ + 0.9);
    const barraP = colgado.clone().add(V(0, TAGDY * SC, -TAGZ * SC));
    barraCb.visible = vive && t < T.s11 + 0.3;
    if (barraCb.visible) { const kb = eio(sg(t, T.s10 + 0.1, T.s10 + 0.45)) * (1 - eio(sg(t, T.s11, T.s11 + 0.3))); barraCb.position.copy(barraP).add(V(lerp(-1.2, 0, kb), 0, 0)); barraCb.scale.setScalar(SC * 0.7); }
    if (tagPedido.visible) {
      celu.updateMatrixWorld(true);
      const desde = celu.localToWorld(V(0, 0.01, 0.01));
      let p = lerpV(desde, colgado.clone().add(V(0, -0.0, 0)), sale);
      const dest = V(AX + 0.55, MOST.y + 0.1, MOST.z + 0.14);
      if (vuela > 0) {
        // a mitad de vuelo la tarjeta va adelante de la cámara (que la sigue), un poco abajo del centro
        const fw = new THREE.Vector3(); camera.getWorldDirection(fw);
        const delante = camera.position.clone().add(fw.multiplyScalar(1.1)).add(V(0, 0.02, 0));
        p = lerpV(arco(colgado, dest, vuela, 0.7), delante, Math.sin(Math.PI * vuela) * 0.95);
      }
      tagPedido.position.copy(p);
      tagPedido.scale.setScalar(lerp(0.06, SC, sale) * (1 + 0.1 * pulso(t, T.toalla2, 0.3)) * lerp(1, 0.4, vuela));
      tagPedido.userData.giro.rotation.set(0, (1 - sale) * 0.5, rebote(t, T.s10 + 0.4, 3.5, 8, 0.12) + Math.sin(vuela * 9) * 0.3 * vuela);
      tagPedido.userData.cordon.visible = sale > 0.85 && vuela < 0.05;
    }
    // el cartel de la toalla entra desde la izquierda balanceándose y se superpone (encaja) en "toalla"
    const entra = eio(sg(t, T.cartel - 0.1, T.cartel + 0.3));
    tagEco.visible = t > T.cartel - 0.1 && t < T.toalla2 + 0.08;
    if (tagEco.visible) {
      const mete = eio(sg(t, T.toalla2 - 0.08, T.toalla2 + 0.06)); tagEco.position.copy(colgado).add(V(lerp(lerp(-0.5, -0.215, entra), 0, mete), 0, 0.012));
      tagEco.scale.setScalar(SC * (1 - eio(sg(t, T.toalla2 + 0.02, T.toalla2 + 0.2)) * 0.15));
      tagEco.userData.giro.rotation.set(0, 0, Math.sin(entra * Math.PI) * 0.25);
      tagEco.traverse((o) => { if (o.isMesh) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.transparent = true; m.opacity = 1 - sg(t, T.toalla2 + 0.0, T.toalla2 + 0.08); }); } });
    }
    marcoSel.visible = t > T.toalla2 && t < T.s11 + 0.05;
    if (marcoSel.visible) { marcoSel.position.copy(colgado).add(V(0, (HOY - TH / 2) * SC, 0.02)); marcoSel.scale.setScalar(SC * (1 + 0.12 * (1 - eo(sg(t, T.toalla2, T.toalla2 + 0.25))))); marcoSel.quaternion.identity(); }
  }
}

// ================= EL CIERRE =================
function zonaFin(t) {
  const v = plano === 2;
  tagFin.visible = barraFin.visible = sombraFin.visible = v;
  if (!v) return;
  barraFin.position.set(OF.x, 1.6, -0.1);
  tagFin.position.set(OF.x, 1.6 - TAGDY, -0.1 + TAGZ);
  const kk = popIn(t, T.fin - 0.02, 0.32);
  tagFin.scale.setScalar(kk * 1.0); barraFin.scale.setScalar(Math.max(0.01, kk));
  tagFin.userData.giro.rotation.set(0, Math.sin((t - T.fin) * 1.4) * 0.25 * Math.exp(-(t - T.fin) * 0.6), rebote(t, T.fin, 1.6, 5.5, 0.18));
  sombraFin.position.set(OF.x, 0.0, 0.1);
}

// ================= ESCENA EN EL TIEMPO =================
const _v = new THREE.Vector3();
function renderAt(t) {
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  // sol y sombra según la zona
  let foco = V(0, 1, 0.3), r = 2.6;
  if (plano === 1) {
    if (t < T.s07 + 0.4) { foco = OH.clone().add(V(0, 5.5, 0)); r = 8; }
    else if (t < T.s08 + 0.3) { foco = P214.clone().add(V(0, 1, -1)); r = 3; }
    else if (t < T.s11 + 0.4) { foco = V(GX, 1, GZ); r = 3.2; }
    else { foco = V(AX, 1, -1); r = 3.2; }
  } else if (plano === 2) { foco = OF.clone().add(V(0, 1, 0)); r = 2; }
  sol.position.copy(foco).add(V(-3.0, 7, 6)); sol.target.position.copy(foco);
  Object.assign(sol.shadow.camera, { left: -r, right: r, top: r, bottom: -r, near: 0.5, far: 40 }); sol.shadow.camera.updateProjectionMatrix();
  key.intensity = plano === 2 ? 1.9 : 1.7;
  zonaB(t);
  zonaH(t);
  zonaFin(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
