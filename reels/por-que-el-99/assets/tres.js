// Capa 3D de por-que-el-99 (Three.js r170 local). Base técnica: reels/por-que-sacar-numero (luces, entorno PMREM,
// planos de cámara, TextGeometry de Lexend 800); personajes de reels/abren-hoy (ELENCO.ruben, el de la distribuidora).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Fondo NAVY3 liso (#1f3254, lo pone el HTML): el canvas es transparente; el piso de la zona P es una PLANILLA gigante
// del mismo navy con líneas crema (MeshBasic sin tone mapping, así empalma con el fondo) + un plano de sombras encima.
// Zonas (x):
//   O (-60): la oficina vidriada de Rubén arriba del depósito (s01, s10-s12). El depósito está abajo (y -3,4): racks,
//            pallets, cajas, una zorra.
//   P (0..):  la planilla gigante: el 999 (x 0, s02), las etiquetas $ 99 / $ 100 (x 5, s03), la caja registradora (x 10,
//            s04), el catálogo con los tres vestidos (x 15, s05-s08), el regalo con el precio redondo (x 20, s09).
//   F (200): el cierre verde: la etiqueta "$ 999" (s13).
// Anderson, Simester, Thomas, Morwitz, Wadhwa y Zhang NO se dibujan. Sin marcas: catálogo, vestido, celular y planilla
// genéricos.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js"; // 0-9 $ . , M U S N O n o
import { crearPersonaje, ELENCO, poseEn, CARA, crearMate, crearTermo } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
import { BOCA } from "./boca.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('500 60px "IBM Plex Mono"')]);

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
const popIn = (t, a, d = 0.28) => (t < a ? 0 : lerp(0.35, 1, bk(sg(t, a, a + d))));
const azarDe = (s0) => { let s = s0; return () => ((s = (s * 16807) % 2147483647) / 2147483647); };

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
  env.background = new THREE.Color(0x5f6878);
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
scene.environmentIntensity = 0.8;

const OO = V(-60, 0, 0), OF = V(200, 0, 0);
const key = new THREE.DirectionalLight(0xfff0dc, 1.4); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.2); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x4a5674, 1.3); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.5);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.normalBias = 0.02; sol.shadow.radius = 5;
scene.add(sol, sol.target);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, madera: 0xdcbb92, cromo: 0xb8bcc4, kraft: 0xc9a46b };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.14 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.45), red: mat(C.red, 0.6),
  white: mat(C.white, 0.42), gris: mat(C.gris, 0.55), madera: mat(C.madera, 0.55), cromo: mat(C.cromo, 0.25, { metalness: 0.7 }),
  kraft: mat(C.kraft, 0.85), goma: mat(0x1a1f2a, 0.7),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.max(0.0005, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001)));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", ${fam === "Lexend" ? "sans-serif" : "monospace"}`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
function texViva(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { c, t, x: c.getContext("2d"), clave: "" }; }
const ajustar = (x, txt, peso, px, ancho, fam) => { let s = px; x.font = F(peso, s, fam); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s, fam); } return s; };
const sh = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const font = new FontLoader().parse(LEXEND);
const geoCache = {};
const textoGeo = (s, size, depth) => (geoCache[s + "|" + size + "|" + depth] ??= (() => {
  // ronda 1: el "9" de lexend800.js tenía el contorno cruzado (la cola atravesaba la panza): la triangulación dejaba
  // una costura en arco sobre la cara. Se corrigió el contorno en vendor/three/lexend800.js (unión de cola y panza).
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 16, bevelEnabled: true, bevelThickness: depth * 0.22, bevelSize: size * 0.022, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
})());
const matTex = (t, k = 0.2) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.75, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: k });
const NAV = "#16243d", NAV3 = "#1f3254", CRE = "#efeee5", VER = "#5ce611", NAV0 = "#0b1220", ROJ = "#c7655b";
function pisoSombra(x, z, w = 10, d = 10, op = 0.35, y = 0.002) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.ShadowMaterial({ opacity: op, color: 0x0b1220 }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scene.add(m); return m;
}
const _up = V(0, 1, 0);
function tubo(a, b, r, m) {
  const d = b.clone().sub(a), L = d.length();
  const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 12), m);
  o.position.copy(a).addScaledVector(d, 0.5); o.quaternion.setFromUnitVectors(_up, d.normalize()); return o;
}
// tilde verde (disco verde, aro navy, tilde navy)
const tickGeo = (() => {
  const s = new THREE.Shape();
  [[-0.5, 0.06], [-0.16, -0.3], [0.5, 0.36], [0.37, 0.49], [-0.16, -0.05], [-0.37, 0.19]].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 });
  g.translate(0, -0.06, -0.06); return g;
})();
const discoGeo = new THREE.CylinderGeometry(1, 1, 0.3, 36).rotateX(Math.PI / 2);
function hacerTilde(r = 0.17) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, M.g); d.scale.set(r, r, r * 0.35); g.add(d);
  const bd = mesh(new THREE.TorusGeometry(1, 0.09, 8, 40), M.navy); bd.scale.set(r, r, r); g.add(bd);
  const tk = mesh(tickGeo, M.navy, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  sh(g); scene.add(g); return g;
}
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }

// ================= LA LISTA DE PRECIOS (monitor de Rubén): la misma planilla navy que el piso =================
const LP = { w: 1280, h: 800 };
const FILAS = [["Yerba x10", "$ 1.200"], ["Aceite x12", "$ 1.000"], ["Arroz x10", "$ 640"], ["Fideos x20", "$ 980"]];
const lista = texViva(LP.w, LP.h);
// estado: precio del aceite (texto), sel (celda seleccionada verde), cursor, preg (el "?" rojo), ok (confirmado)
function dibujarLista(precio, sel, cursor, preg, ok, titulo = true, vacia = false) {
  const clave = [precio, sel, cursor, preg, ok, titulo, vacia].join("|");
  if (lista.clave === clave) return; lista.clave = clave;
  const x = lista.x, w = LP.w, h = LP.h;
  x.fillStyle = NAV3; x.fillRect(0, 0, w, h);
  // barra de título
  x.fillStyle = NAV0; x.fillRect(0, 0, w, 116);
  x.fillStyle = CRE; x.textBaseline = "middle"; x.textAlign = "left"; x.font = F(800, 60); if (titulo) x.fillText("Lista de precios", 40, 60); // ronda 1: sin título mientras está el gancho (asomaba pegado)
  x.fillStyle = VER; x.beginPath(); x.arc(w - 60, 58, 16, 0, 7); x.fill();
  // encabezados de columna (A, B) y de fila (1..)
  const X0 = 90, XA = 90, XB = 720, Y0 = 116, HH = 76, RH = 150;
  x.fillStyle = "#2a3f66"; x.fillRect(0, Y0, w, HH); x.fillRect(0, Y0, X0, h - Y0);
  x.fillStyle = "rgba(239,238,229,0.75)"; x.font = F(500, 42, "IBM Plex Mono"); x.textAlign = "center";
  x.fillText("A", (XA + XB) / 2, Y0 + HH / 2 + 2); x.fillText("B", (XB + w) / 2, Y0 + HH / 2 + 2);
  FILAS.forEach((_, i) => x.fillText(String(i + 1), X0 / 2, Y0 + HH + RH * i + RH / 2 + 2));
  // celdas
  FILAS.forEach(([prod, pr], i) => {
    const y = Y0 + HH + RH * i;
    if (i === 1) pr = vacia ? "" : precio; // ronda 2: la celda se vacía cuando el 999 se despega
    if (i === 1 && sel) { x.fillStyle = VER; x.fillRect(XB, y, w - XB, RH); }
    x.textAlign = "left"; x.fillStyle = CRE; x.font = F(700, 70); x.fillText(prod, XA + 34, y + RH / 2 + 4);
    x.fillStyle = i === 1 && sel ? NAV0 : i === 1 && ok ? VER : CRE; x.font = F(800, 82); x.fillText(pr, XB + 40, y + RH / 2 + 4);
    if (i === 1 && cursor) { const ww = x.measureText(pr).width; x.fillStyle = sel ? NAV0 : CRE; x.fillRect(XB + 48 + ww, y + 30, 8, RH - 60); }
    if (i === 1 && preg > 0.01) {
      x.globalAlpha = preg; x.fillStyle = ROJ; x.beginPath(); x.arc(w - 90, y + RH / 2, 52, 0, 7); x.fill();
      x.fillStyle = CRE; x.textAlign = "center"; x.font = F(900, 76); x.fillText("?", w - 90, y + RH / 2 + 4); x.globalAlpha = 1;
    }
  });
  // grilla
  x.strokeStyle = "rgba(239,238,229,0.55)"; x.lineWidth = 6;
  for (let i = 0; i <= FILAS.length; i++) { const y = Y0 + HH + RH * i; x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); }
  for (const xx of [X0, XB]) { x.beginPath(); x.moveTo(xx, Y0); x.lineTo(xx, h); x.stroke(); }
  if (sel) { x.strokeStyle = NAV0; x.lineWidth = 10; x.strokeRect(XB + 5, Y0 + HH + RH + 5, w - XB - 10, RH - 10); }
  else if (ok) { x.strokeStyle = VER; x.lineWidth = 10; x.strokeRect(XB + 5, Y0 + HH + RH + 5, w - XB - 10, RH - 10); }
  lista.t.needsUpdate = true;
}

// ================= ZONA O: la oficina vidriada de Rubén arriba del depósito =================
const oficina = new THREE.Group(); scene.add(oficina);
const PISO_DEP = -3.4;
const ESC = { y: 0.93, z: 0.62, w: 1.7, d: 0.72 }; // escritorio (tapa)
const MON = V(OO.x, 1.36, ESC.z + 0.18); // centro de la pantalla
const MONW = 0.98, MONH = 0.61;
{
  const O = OO;
  // piso de la oficina (madera clara) y losa
  const tablas = tex(1024, 1024, (x, w, h) => { x.fillStyle = "#cdb08a"; x.fillRect(0, 0, w, h); for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#d5b994" : "#c7a982"; x.fillRect(0, (i * h) / 8 + 3, w, h / 8 - 6); x.fillStyle = "rgba(90,60,30,0.45)"; x.fillRect(0, (i * h) / 8, w, 4); } });
  tablas.wrapS = tablas.wrapT = THREE.RepeatWrapping; tablas.repeat.set(3, 3);
  const piso = mesh(new THREE.PlaneGeometry(4.4, 4.0), new THREE.MeshStandardMaterial({ map: tablas, roughness: 0.75 }), O.x, 0, 0); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; oficina.add(piso);
  oficina.add(mesh(new THREE.BoxGeometry(4.6, 0.3, 4.2), M.navy2, O.x, -0.16, 0));
  // vidrios: adelante (z +1.7), atrás (z -1.7) y a la izquierda de Rubén (x +2.1); a la derecha una pared navy con estantes
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xdfeaf2, roughness: 0.08, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide });
  const marco = M.navy;
  const panel = (cx, cz, ancho, ry) => {
    const g = new THREE.Group(); g.position.set(cx, 0, cz); g.rotation.y = ry; oficina.add(g);
    g.add(mesh(new THREE.PlaneGeometry(ancho, 2.6), vidrio, 0, 1.3 + 0.0, 0));
    g.add(mesh(rbox(ancho, 0.1, 0.1, 0.02), marco, 0, 0.05, 0));
    g.add(mesh(rbox(ancho, 0.1, 0.1, 0.02), marco, 0, 2.6, 0));
    g.add(mesh(rbox(ancho, 0.07, 0.07, 0.02), marco, 0, 1.0, 0));
    const n = Math.round(ancho / 1.1);
    for (let i = 0; i <= n; i++) g.add(mesh(rbox(0.1, 2.6, 0.1, 0.02), marco, -ancho / 2 + (i * ancho) / n, 1.3, 0));
  };
  panel(O.x, 1.75, 4.4, 0); panel(O.x, -1.75, 4.4, 0); panel(O.x + 2.2, 0, 3.5, Math.PI / 2);
  // pared derecha (x -2.2): navy3 con estante de biblioratos y un almanaque
  oficina.add(mesh(new THREE.BoxGeometry(0.1, 2.7, 3.5), M.navy3, O.x - 2.25, 1.35, 0));
  oficina.add(mesh(rbox(0.32, 0.04, 1.6, 0.01), M.madera, O.x - 2.04, 1.45, -0.5));
  const colB = [C.g, C.cr, C.navy, C.cr2, C.g, C.edge, C.cr];
  colB.forEach((c, i) => { const b = mesh(rbox(0.28, 0.34, 0.08, 0.01), mat(c, 0.6), O.x - 2.05, 1.64, -1.15 + i * 0.105); b.rotation.x = (i === 5 ? 0.18 : 0); oficina.add(b); const et = mesh(new THREE.PlaneGeometry(0.05, 0.16), M.white, O.x - 1.905, 1.66, -1.15 + i * 0.105); et.rotation.y = Math.PI / 2; oficina.add(et); });
  // escritorio de madera clara (alto: Rubén trabaja parado) con patas navy
  const vetas = tex(1024, 256, (x, w, h) => {
    x.fillStyle = "#dcbb92"; x.fillRect(0, 0, w, h); const az = azarDe(3);
    for (let i = 0; i < 40; i++) { const y = az() * h; x.strokeStyle = az() < 0.5 ? "rgba(150,105,60,0.3)" : "rgba(255,240,215,0.35)"; x.lineWidth = 2 + az() * 5; x.beginPath(); x.moveTo(0, y); for (let k = 1; k <= 8; k++) x.lineTo((k * w) / 8, y + Math.sin(k * 1.3 + i) * 7); x.stroke(); }
  });
  const tapaM = new THREE.MeshStandardMaterial({ map: vetas, roughness: 0.5 });
  oficina.add(mesh(rbox(ESC.w, 0.05, ESC.d, 0.015), [M.madera, M.madera, tapaM, M.madera, M.madera, M.madera], O.x, ESC.y - 0.025, ESC.z));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) oficina.add(mesh(rbox(0.05, ESC.y - 0.05, 0.05, 0.01), M.navy, O.x + sx * (ESC.w / 2 - 0.06), (ESC.y - 0.05) / 2, ESC.z + sz * (ESC.d / 2 - 0.06)));
  oficina.add(mesh(rbox(ESC.w - 0.15, 0.4, 0.03, 0.01), M.navy2, O.x, ESC.y - 0.3, ESC.z + ESC.d / 2 - 0.08));
  // monitor
  oficina.add(mesh(rbox(MONW + 0.06, MONH + 0.06, 0.05, 0.02), M.navy, MON.x, MON.y, MON.z + 0.03));
  const pant = mesh(new THREE.PlaneGeometry(MONW, MONH), new THREE.MeshBasicMaterial({ map: lista.t, toneMapped: false }), MON.x, MON.y, MON.z + 0.0 - 0.0);
  pant.rotation.y = Math.PI; pant.position.z = MON.z; oficina.add(pant);
  oficina.add(mesh(rbox(0.08, 0.32, 0.05, 0.01), M.navy, MON.x, ESC.y + 0.16, MON.z + 0.1));
  oficina.add(mesh(rbox(0.3, 0.02, 0.2, 0.01), M.navy, MON.x, ESC.y + 0.01, MON.z + 0.08));
  // teclado (navy2 con teclas crema) y mouse
  const tecl = tex(512, 160, (x, w, h) => { x.fillStyle = NAV; x.fillRect(0, 0, w, h); x.fillStyle = "#c9c7bb"; for (let j = 0; j < 4; j++) for (let i = 0; i < 14; i++) rr(x, 10 + i * 35.5, 10 + j * 37, 30, 31, 5); });
  const kb = mesh(rbox(0.52, 0.025, 0.17, 0.008), [M.navy2, M.navy2, matTex(tecl, 0.1), M.navy2, M.navy2, M.navy2], MON.x + 0.14, ESC.y + 0.013, ESC.z - 0.2); oficina.add(kb);
  oficina.add(mesh(rbox(0.06, 0.025, 0.1, 0.02), M.navy2, MON.x - 0.42, ESC.y + 0.013, ESC.z - 0.18));
  // carpeta con papeles a la izquierda de Rubén
  const carp = mesh(rbox(0.3, 0.03, 0.38, 0.005), M.g, MON.x - 0.66, ESC.y + 0.015, ESC.z + 0.0); carp.rotation.y = 0.15; oficina.add(carp);
  const hoja = mesh(new THREE.PlaneGeometry(0.26, 0.34), M.white, MON.x - 0.66, ESC.y + 0.032, ESC.z + 0.0); hoja.rotation.set(-Math.PI / 2, 0, 0.15); oficina.add(hoja);
  sh(oficina);
  pant.castShadow = false;
}
// el mate y el termo en el escritorio (a la derecha de Rubén: -x)
const mateR = crearMate(); scene.add(mateR); mateR.scale.setScalar(1.15);
const MATE_ESC = V(OO.x + 0.74, ESC.y, ESC.z - 0.22); // ronda 1: más a la izquierda de Rubén (el celular queda entre el teclado y el mate)
const termo = crearTermo(); scene.add(termo); termo.scale.setScalar(1.2); termo.position.set(OO.x - 0.74, ESC.y, ESC.z + 0.2);
sh(termo);
// ---- el depósito, abajo: racks navy claro con largueros crema, pallets, cajas kraft, bultos con film, una zorra ----
const deposito = new THREE.Group(); scene.add(deposito);
{
  const O = OO, Y = PISO_DEP;
  const pisoD = mesh(new THREE.PlaneGeometry(40, 30), mat(0x8f939c, 0.9), O.x, Y, 0); pisoD.rotation.x = -Math.PI / 2; deposito.add(pisoD);
  // franjas amarillas no: líneas crema de pasillo
  for (const z of [-4.2, 4.2]) { const l = mesh(new THREE.PlaneGeometry(40, 0.12), M.cr, O.x, Y + 0.01, z); l.rotation.x = -Math.PI / 2; deposito.add(l); }
  const rackM = mat(C.edge, 0.5), larM = mat(C.cr, 0.55), palM = mat(0xd9be8f, 0.8);
  const film = new THREE.MeshStandardMaterial({ color: 0xe9eef2, roughness: 0.3, transparent: true, opacity: 0.55 });
  const az = azarDe(17);
  const rack = (cx, cz, ry, largo = 6) => {
    const g = new THREE.Group(); g.position.set(cx, Y, cz); g.rotation.y = ry; deposito.add(g);
    const n = Math.round(largo / 2);
    for (let i = 0; i <= n; i++) for (const zz of [-0.5, 0.5]) g.add(mesh(new THREE.BoxGeometry(0.1, 5.0, 0.1), rackM, -largo / 2 + (i * largo) / n, 2.5, zz));
    for (const y of [0.15, 1.75, 3.35]) for (const zz of [-0.5, 0.5]) g.add(mesh(new THREE.BoxGeometry(largo, 0.14, 0.08), larM, 0, y + 0.07, zz));
    for (const y of [0.22, 1.82, 3.42]) for (let i = 0; i < n * 2; i++) {
      const px = -largo / 2 + 0.5 + i * (largo - 1) / (n * 2 - 1);
      g.add(mesh(new THREE.BoxGeometry(0.9, 0.12, 0.9), palM, px, y + 0.06, 0));
      const k = az();
      if (k < 0.6) { const nb = 2 + Math.floor(az() * 3); for (let j = 0; j < nb; j++) g.add(mesh(new THREE.BoxGeometry(0.4, 0.3, 0.38), M.kraft, px + (j % 2 ? 0.21 : -0.21), y + 0.27 + Math.floor(j / 2) * 0.31, (j % 3) * 0.02)); }
      else if (k < 0.85) g.add(mesh(new THREE.BoxGeometry(0.86, 0.9, 0.86), film, px, y + 0.57, 0));
    }
    return g;
  };
  rack(O.x, 5.2, 0, 10); rack(O.x, 8.6, 0, 10); rack(O.x - 1, -5.2, 0, 10); rack(O.x, -8.6, 0, 10); rack(O.x + 6.0, 0, Math.PI / 2, 8);
  // pallets sueltos con cajas y fleje verde
  for (const [px, pz] of [[-1.2, 3.2], [1.6, 3.0], [0.4, -3.1], [-2.0, -3.3], [3.4, 2.9]]) {
    deposito.add(mesh(new THREE.BoxGeometry(1.0, 0.13, 1.0), palM, O.x + px, Y + 0.065, pz));
    for (let j = 0; j < 4; j++) deposito.add(mesh(new THREE.BoxGeometry(0.46, 0.34, 0.46), M.kraft, O.x + px + (j % 2 ? 0.24 : -0.24), Y + 0.3, pz + (j < 2 ? 0.24 : -0.24)));
    deposito.add(mesh(new THREE.BoxGeometry(1.0, 0.36, 0.04), M.g, O.x + px, Y + 0.31, pz));
  }
  // zorra hidráulica
  const zorra = new THREE.Group(); zorra.position.set(O.x + 2.4, Y, 3.3); zorra.rotation.y = -0.6; deposito.add(zorra);
  for (const s of [-0.18, 0.18]) zorra.add(mesh(new THREE.BoxGeometry(0.16, 0.08, 1.1), M.navy, s, 0.06, 0));
  zorra.add(mesh(new THREE.BoxGeometry(0.5, 0.35, 0.18), M.g, 0, 0.2, -0.6));
  zorra.add(tubo(V(0, 0.35, -0.62), V(0, 1.2, -0.95), 0.025, M.navy));
  // columnas que sostienen la oficina
  for (const sx of [-2.1, 2.1]) for (const sz of [-1.6, 1.6]) deposito.add(mesh(new THREE.BoxGeometry(0.2, -Y, 0.2), M.navy2, O.x + sx, Y / 2 - 0.15, sz));
}
// el celular de Rubén (sobre el escritorio; en s11 lo levanta y lo muestra)
const PPC = [768, 1556];
const celTV = texViva(...PPC);
function dibujarCelu(apagado, filas) {
  const clave = apagado + "|" + filas.map((f) => f.toFixed(2)).join(",");
  if (celTV.clave === clave) return; celTV.clave = clave;
  const x = celTV.x, [w, h] = PPC;
  if (apagado) { x.fillStyle = "#0a0f1a"; x.fillRect(0, 0, w, h); celTV.t.needsUpdate = true; return; }
  x.fillStyle = CRE; x.fillRect(0, 0, w, h);
  // ronda 2: textos de ≥ 66 px de textura (≥ 36 px en el inserto); sin la hora
  x.fillStyle = NAV0; x.fillRect(0, 0, w, 270);
  x.fillStyle = VER; x.textBaseline = "middle"; x.textAlign = "left"; x.font = F(700, 66); x.fillText("REPORTE · LUNES", 44, 84);
  x.fillStyle = CRE; ajustar(x, "Ventas de la semana", 800, 80, w - 88); x.fillText("Ventas de la semana", 44, 190);
  const tarjeta = (y, prod, precio, dice, u) => {
    if (u <= 0.001) return;
    x.save(); x.globalAlpha = cl(u * 1.6); x.translate(w / 2, y + 210); const s = lerp(0.85, 1, bk(u)); x.scale(s, s); x.translate(-w / 2, -(y + 210));
    x.fillStyle = "#ffffff"; rr(x, 34, y, w - 68, 420, 40); x.lineWidth = 8; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(34, y, w - 68, 420, 40); x.stroke();
    x.fillStyle = NAV0; x.textAlign = "left"; x.font = F(800, 80); x.fillText(prod, 70, y + 88);
    x.fillStyle = NAV; x.font = F(800, 74); x.fillText(precio, 70, y + 196);
    // tilde arriba a la derecha de la tarjeta; la píldora verde con el texto a todo el ancho
    x.strokeStyle = NAV0; x.lineWidth = 18; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(w - 150, y + 150); x.lineTo(w - 120, y + 182); x.lineTo(w - 74, y + 118); x.stroke();
    x.fillStyle = VER; rr(x, 54, y + 248, w - 108, 140, 70);
    x.fillStyle = NAV0; x.textAlign = "center"; const px = ajustar(x, dice, 800, 76, w - 170); x.font = F(800, px); x.fillText(dice, w / 2, y + 320); x.textAlign = "left";
    x.restore();
  };
  // ronda 2: las tarjetas arriba; el cuarto de abajo queda libre para las manos que lo sostienen
  tarjeta(296, "Aceite x12", "a $ 999", "vendió más", filas[0]);
  tarjeta(740, "Yerba x10", "a $ 1.200", "ganó el redondo", filas[1]);
  celTV.t.needsUpdate = true;
}
const CW = 0.08, CH = 0.162;
const celu = new THREE.Group(); scene.add(celu);
{
  celu.add(mesh(rbox(CW + 0.008, CH + 0.008, 0.012, 0.012), M.navy3));
  celu.add(mesh(rbox(0.026, 0.026, 0.004, 0.006), M.navy, -CW * 0.27, CH * 0.36, -0.0072));
  const pm = new THREE.MeshBasicMaterial({ map: celTV.t, toneMapped: false });
  celu.add(mesh(new THREE.PlaneGeometry(CW, CH), pm, 0, 0, 0.0066));
  sh(celu); celu.children[2].castShadow = false;
}
const CELU_ESC = V(OO.x + 0.52, ESC.y + 0.008, ESC.z - 0.24); // ronda 1: delante de Rubén, debajo de donde lo muestra (lo baja en vertical, lejos de la cara)
const ruben = crearPersonaje({ ...ELENCO.ruben, parpadeoCada: 999 }); scene.add(ruben.raiz);
ruben.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const RUB = V(OO.x + 0.2, 0, 0.0);
const GIRO_R = 0.62; // s10-s12: Rubén girado hacia la cámara (a su izquierda)
const CELU_M = V(RUB.x + Math.sin(GIRO_R) * 0.5, 1.13, RUB.z + Math.cos(GIRO_R) * 0.5); // ronda 1: más bajo (la cara mira por encima)
const pisoO = pisoSombra(OO.x, 0, 4.4, 4, 0.0);

// ================= ZONA P: la planilla gigante =================
const planilla = new THREE.Group(); scene.add(planilla);
const CELX = 1.2, CELZ = 0.6;
{
  const celda = tex(512, 256, (x, w, h) => {
    x.fillStyle = NAV3; x.fillRect(0, 0, w, h);
    x.fillStyle = "rgba(239,238,229,0.5)"; x.fillRect(0, 0, w, 7); x.fillRect(0, 0, 7, h); x.fillRect(0, h - 7, w, 7); x.fillRect(w - 7, 0, 7, h);
  });
  celda.wrapS = celda.wrapT = THREE.RepeatWrapping; celda.repeat.set(60 / CELX, 24 / CELZ); celda.anisotropy = 16;
  const piso = mesh(new THREE.PlaneGeometry(60, 24), new THREE.MeshBasicMaterial({ map: celda, toneMapped: false }), 15, 0, 0); piso.rotation.x = -Math.PI / 2; planilla.add(piso);
  // fila de encabezados (A, B, C...) detrás de los objetos
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const enc = tex(4096, 128, (x, w, h) => {
    x.fillStyle = "#2a3f66"; x.fillRect(0, 0, w, h);
    const n = 50, cw = w / n; x.fillStyle = "rgba(239,238,229,0.85)"; x.font = F(500, 80, "IBM Plex Mono"); x.textAlign = "center"; x.textBaseline = "middle";
    for (let i = 0; i < n; i++) { x.fillText(letras[i % 26] + (i >= 26 ? letras[i - 26] : ""), (i + 0.5) * cw, h / 2 + 4); x.fillStyle = "rgba(239,238,229,0.5)"; x.fillRect(i * cw, 0, 6, h); x.fillStyle = "rgba(239,238,229,0.85)"; }
  });
  const e1 = mesh(new THREE.PlaneGeometry(60, CELZ), new THREE.MeshBasicMaterial({ map: enc, toneMapped: false }), 15, 0.003, -3.0 - CELZ / 2); e1.rotation.x = -Math.PI / 2; planilla.add(e1);
}
const pisoP = pisoSombra(15, 0, 60, 24, 0.32);

// ---------- P1: el 999 gigante (tres 9 sueltos: el primero se pone verde y crece) ----------
const N9 = 0.62, D9 = 0.2;
const geo9 = textoGeo("9", N9, D9);
geo9.computeBoundingBox();
const ANCHO9 = geo9.boundingBox.max.x - geo9.boundingBox.min.x, ALTO9 = geo9.boundingBox.max.y - geo9.boundingBox.min.y;
const PASO9 = ANCHO9 * 1.12;
const cara9 = [mat(C.cr, 0.4), mat(C.cr, 0.4), mat(C.cr, 0.4)];
const lado9 = [mat(C.navy2, 0.5), mat(C.navy2, 0.5), mat(C.navy2, 0.5)];
const num999 = new THREE.Group(); scene.add(num999);
const nueves = [0, 1, 2].map((i) => { const m = new THREE.Mesh(geo9, [cara9[i], lado9[i]]); num999.add(m); m.castShadow = true; return m; });
const P1 = V(0, 0, 0);

// ---------- P2: las etiquetas colgantes $ 99 / $ 100 ----------
const P2 = V(2.3, 0, 0);
function hacerEtiqueta(textoNum, cuerpoM, numM, w = 0.7, h = 1.02) {
  const g = new THREE.Group();
  // cartón (forma de etiqueta: rectángulo con la punta de arriba cortada) extruido
  const s = new THREE.Shape(); const r = 0.06, cx = w * 0.28;
  s.moveTo(-w / 2 + r, -h / 2); s.lineTo(w / 2 - r, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - cx); s.lineTo(w / 2 - cx, h / 2); s.lineTo(-w / 2 + cx, h / 2); s.lineTo(-w / 2, h / 2 - cx);
  s.lineTo(-w / 2, -h / 2 + r); s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  const ag = new THREE.Path(); ag.absarc(0, h / 2 - 0.12, 0.045, 0, Math.PI * 2, true); s.holes.push(ag);
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2 });
  geo.translate(0, -h / 2, -0.015);
  g.add(new THREE.Mesh(geo, cuerpoM));
  const ojal = mesh(new THREE.TorusGeometry(0.052, 0.014, 8, 24), M.cromo, 0, -0.12, 0); g.add(ojal);
  // número 3D en la cara
  const pesos = new THREE.Mesh(textoGeo("$", 0.2, 0.05), numM); g.add(pesos);
  const num = new THREE.Mesh(textoGeo(textoNum, textoNum.length > 2 ? 0.3 : 0.38, 0.07), numM); g.add(num);
  const nb = num.geometry.boundingBox, nw = nb.max.x - nb.min.x;
  num.position.set(0.07, -h * 0.58, 0.05); pesos.position.set(0.07 - nw / 2 - 0.1, -h * 0.58 + 0.06, 0.04);
  g.userData = { h, num, pesos };
  return sh(g);
}
const et99 = hacerEtiqueta("99", M.g, [M.navy, M.navy2]);
const et100 = hacerEtiqueta("100", M.cr, [M.navy2, M.navy]);
scene.add(et99, et100);
const hilo99 = mesh(new THREE.CylinderGeometry(0.008, 0.008, 1, 8), M.navy); scene.add(hilo99);
const hilo100 = mesh(new THREE.CylinderGeometry(0.008, 0.008, 1, 8), M.navy); scene.add(hilo100);
const perchero = new THREE.Group(); scene.add(perchero);
{
  const H = 2.25, A = 1.9;
  perchero.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, A, 16).rotateZ(Math.PI / 2), M.navy, 0, H, 0));
  for (const s of [-1, 1]) {
    perchero.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, H, 12), M.navy, s * A / 2, H / 2, 0));
    perchero.add(mesh(rbox(0.06, 0.04, 0.5, 0.015), M.navy, s * A / 2, 0.02, 0));
  }
  sh(perchero);
}

// ---------- P3: la caja registradora antigua ----------
const P3 = V(4.7, 0, 0);
const caja = new THREE.Group(); scene.add(caja);
const cajon = new THREE.Group(); caja.add(cajon);
const texDisp = (s) => tex(400, 160, (x, w, h) => { x.fillStyle = "#081008"; x.fillRect(0, 0, w, h); x.fillStyle = VER; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 120); x.fillText(s, w / 2, h / 2 + 6); });
const dispM = [new THREE.MeshBasicMaterial({ map: texDisp("0"), toneMapped: false }), new THREE.MeshBasicMaterial({ map: texDisp("$ 99"), toneMapped: false })];
let dispCaja;
const BW = 1.3, BH = 0.3, BD = 0.95;
{
  // base con el cajón (navy2, frente crema)
  caja.add(mesh(rbox(BW, BH, BD, 0.04), M.navy2, 0, BH / 2, 0));
  cajon.add(mesh(rbox(BW - 0.12, BH - 0.07, BD - 0.06, 0.02), M.cr2, 0, BH / 2, 0));
  cajon.add(mesh(rbox(BW - 0.08, BH - 0.04, 0.04, 0.02), M.cr, 0, BH / 2, BD / 2 + 0.012));
  cajon.add(mesh(rbox(0.32, 0.05, 0.05, 0.02), M.navy, 0, BH / 2, BD / 2 + 0.02));
  // separadores del cajón con monedas y billetes
  for (let i = 0; i < 4; i++) cajon.add(mesh(new THREE.BoxGeometry(0.02, 0.08, BD - 0.2), M.navy2, -0.45 + i * 0.3, BH - 0.07, 0));
  const az = azarDe(23);
  for (let i = 0; i < 12; i++) { const m = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.012, 20), i % 3 ? M.cromo : mat(0xc9a24a, 0.3, { metalness: 0.6 }), -0.52 + (i % 4) * 0.3 + az() * 0.1, BH - 0.08 + Math.floor(i / 4) * 0.012, -0.25 + az() * 0.5); m.rotation.x = az() * 0.3; cajon.add(m); }
  // cuerpo: perfil de costado (alto atrás, teclado inclinado adelante), crema con laterales navy
  const pr = new THREE.Shape(); pr.moveTo(-BD / 2 + 0.03, 0); pr.lineTo(BD / 2 - 0.03, 0); pr.lineTo(BD / 2 - 0.03, 0.14); pr.lineTo(-0.05, 0.5); pr.lineTo(-BD / 2 + 0.03, 0.5); pr.closePath();
  const pg = new THREE.ExtrudeGeometry(pr, { depth: BW - 0.04, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 });
  pg.rotateY(-Math.PI / 2); pg.translate((BW - 0.04) / 2, BH, 0);
  caja.add(new THREE.Mesh(pg, M.cr));
  for (const s of [-1, 1]) { const lat = new THREE.Mesh(new THREE.ExtrudeGeometry(pr, { depth: 0.04, bevelEnabled: false }), M.navy3); lat.geometry.rotateY(-Math.PI / 2); lat.position.set(s * (BW / 2 + 0.005) + (s > 0 ? 0.04 : 0), BH, 0); caja.add(lat); }
  // teclas redondas en el plano inclinado
  const ang = Math.atan2(0.5 - 0.14, BD / 2 - 0.03 + 0.05);
  const tec = new THREE.Group(); tec.position.set(0, BH + 0.14 + 0.18, BD / 2 - 0.03 - 0.26); tec.rotation.x = ang; caja.add(tec);
  // (el plano va de (z=BD/2-0.03, y=0.14) a (z=-0.05, y=0.5); su centro ≈ (z 0.21, y 0.32))
  tec.position.set(0, BH + 0.32, 0.2);
  const tecG = new THREE.CylinderGeometry(0.045, 0.05, 0.05, 20);
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) {
    const verde = j === 3 && i === 5;
    const k = mesh(tecG, verde ? M.g : i === 0 ? M.navy : M.navy2, -0.46 + i * 0.165, 0.03, -0.17 + j * 0.115);
    tec.add(k);
    const cap = mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.012, 20), verde ? M.gd : M.cr, -0.46 + i * 0.165, 0.058, -0.17 + j * 0.115); tec.add(cap);
  }
  caja.userData.tec = tec;
  // torre del display arriba atrás, con la ventanita "$ 99"
  caja.add(mesh(rbox(0.7, 0.34, 0.3, 0.04), M.navy2, 0, BH + 0.5 + 0.17, -0.3));
  dispCaja = mesh(new THREE.PlaneGeometry(0.56, 0.22), dispM[0], 0, BH + 0.5 + 0.17, -0.149); caja.add(dispCaja);
  caja.add(mesh(rbox(0.74, 0.04, 0.34, 0.015), M.g, 0, BH + 0.5 + 0.34, -0.3));
  // manivela a la derecha (+x)
  const man = new THREE.Group(); man.position.set(BW / 2 + 0.06, BH + 0.25, 0.0); caja.add(man);
  man.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 24).rotateZ(Math.PI / 2), M.navy, 0, 0, 0));
  man.add(mesh(rbox(0.04, 0.3, 0.05, 0.015), M.cromo, 0.04, -0.13, 0));
  man.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.12, 14).rotateZ(Math.PI / 2), M.navy, 0.09, -0.27, 0));
  caja.userData.man = man;
  sh(caja);
  dispCaja.castShadow = false;
}
const monedas = [0, 1, 2, 3, 4].map((i) => { const m = mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.018, 24), i % 2 ? M.cromo : mat(0xc9a24a, 0.3, { metalness: 0.6 })); m.castShadow = true; scene.add(m); return m; });
const azM = azarDe(41);
const MON_V = monedas.map((_, i) => ({ vx: (i - 2) * 0.14 + (azM() - 0.5) * 0.08, vy: 1.4 + azM() * 0.4, vz: 0.4 + azM() * 0.15, rx: 4 + azM() * 6, rz: azM() * 4, d: i * 0.05 }));
// el sello de goma y la placa NO PROBADO
const sello = new THREE.Group(); scene.add(sello);
{
  sello.add(mesh(new THREE.SphereGeometry(0.12, 24, 16), M.madera, 0, 0.62, 0));
  sello.add(mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.4, 16), M.madera, 0, 0.4, 0));
  sello.add(mesh(rbox(0.7, 0.14, 0.28, 0.03), M.navy, 0, 0.13, 0));
  sello.add(mesh(rbox(0.66, 0.05, 0.25, 0.01), M.red, 0, 0.035, 0));
  sh(sello);
}
const texNoProb = tex(1024, 300, (x, w, h) => { x.fillStyle = ROJ; rr(x, 0, 0, w, h, 40); x.strokeStyle = CRE; x.lineWidth = 18; x.beginPath(); x.roundRect(20, 20, w - 40, h - 40, 28); x.stroke(); x.fillStyle = CRE; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "NO PROBADO", 900, 170, w - 120); x.fillText("NO PROBADO", w / 2, h / 2 + 8); });
const placaNP = mesh(new THREE.PlaneGeometry(1.0, 0.293), new THREE.MeshStandardMaterial({ map: texNoProb, roughness: 0.6, emissive: 0xffffff, emissiveMap: texNoProb, emissiveIntensity: 0.2, transparent: true }));
scene.add(placaNP);

// ---------- P4: el catálogo abierto, los tres vestidos, las etiquetas 34 / 39 / 44 y las pilas de cajas ----------
const P4 = V(6.2, 0, 0); // ronda 1: más cerca de la caja (el whip pan pasaba por piso vacío)
const LIB = { w: 1.0, h: 1.5, z: -0.75 }; // ronda 1: más chico (abierto entra entero en cuadro)
const libro = new THREE.Group(); scene.add(libro);
const tapaLib = new THREE.Group(); libro.add(tapaLib); // bisagra en el lomo (x 0); cerrada sobre la página derecha
const texPag = (lado) => tex(640, 846, (x, w, h) => {
  x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
  x.fillStyle = NAV; x.fillRect(0, 0, w, 96);
  x.fillStyle = CRE; x.font = F(500, 44, "IBM Plex Mono"); x.textBaseline = "middle"; x.textAlign = lado ? "right" : "left";
  x.fillStyle = "rgba(22,36,61,0.18)"; for (let i = 0; i < 4; i++) rr(x, 40, 640 + i * 44, w - 80 - (i % 2) * 140, 22, 11);
  x.fillStyle = "rgba(22,36,61,0.5)"; x.font = F(500, 36, "IBM Plex Mono"); x.textAlign = "center"; x.fillText(lado ? "13" : "12", w / 2, h - 40);
});
const texTapa = tex(640, 846, (x, w, h) => {
  x.fillStyle = NAV; x.fillRect(0, 0, w, h); x.strokeStyle = VER; x.lineWidth = 14; x.strokeRect(34, 34, w - 68, h - 68);
  x.fillStyle = CRE; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "CATÁLOGO", 900, 110, w - 120); x.fillText("CATÁLOGO", w / 2, h * 0.44);
  x.fillStyle = VER; rr(x, w / 2 - 120, h * 0.53, 240, 16, 8);
});
{
  const hoja = (m) => new THREE.Mesh(rbox(LIB.w, LIB.h, 0.04, 0.012), m);
  const der = hoja([M.cr2, M.cr2, M.cr2, M.cr2, matTex(texPag(1), 0.25), M.cr2]); der.position.set(LIB.w / 2, LIB.h / 2 + 0.02, 0); libro.add(der);
  const izq = hoja([M.navy2, M.navy2, M.navy2, M.navy2, matTex(texTapa, 0.2), matTex(texPag(0), 0.25)]); izq.position.set(LIB.w / 2, LIB.h / 2 + 0.02, 0.045); tapaLib.add(izq); // ronda 1: la tapa afuera (cerrado) y la página adentro (abierto)
  libro.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, LIB.h, 12), M.navy, 0, LIB.h / 2 + 0.02, 0.02));
  sh(libro);
}
// el vestido en su percha (vestido verde de marca, escote en V crema, cinto navy, falda acampanada)
function hacerVestido() {
  const g = new THREE.Group();
  // percha de madera con gancho de metal (origen = punta del gancho, arriba)
  const gan = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.008, 8, 20, Math.PI * 1.3), M.cromo); gan.rotation.z = -0.3; gan.position.set(0, -0.045, 0); g.add(gan);
  g.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.06, 8), M.cromo, 0, -0.1, 0));
  const barra = new THREE.Shape(); barra.moveTo(-0.24, -0.06); barra.quadraticCurveTo(0, 0.05, 0.24, -0.06); barra.lineTo(0.24, -0.09); barra.quadraticCurveTo(0, 0.02, -0.24, -0.09); barra.closePath();
  const bg = new THREE.ExtrudeGeometry(barra, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 1 }); bg.translate(0, -0.08, -0.015);
  g.add(new THREE.Mesh(bg, M.madera));
  // cuerpo del vestido (torso + falda) con LatheGeometry, achatado en z
  const verde = mat(C.g, 0.6, { emissive: C.g, emissiveIntensity: 0.06, side: THREE.DoubleSide }); // ronda 1: el ruedo se veía hueco
  const perfil = [[0.0, -0.2], [0.13, -0.2], [0.14, -0.26], [0.12, -0.36], [0.105, -0.44], [0.11, -0.47], [0.16, -0.58], [0.22, -0.74], [0.27, -0.9], [0.285, -0.94], [0.0, -0.94]].map(([r, y]) => new THREE.Vector2(r, y));
  const cuerpo = new THREE.Mesh(new THREE.LatheGeometry(perfil, 40), verde); cuerpo.scale.z = 0.42; g.add(cuerpo);
  // escote en V (crema) y cinto navy
  const v = new THREE.Shape(); v.moveTo(-0.07, -0.2); v.lineTo(0.07, -0.2); v.lineTo(0, -0.32); v.closePath();
  const vm = new THREE.Mesh(new THREE.ShapeGeometry(v), M.cr); vm.position.z = 0.135 * 0.42 + 0.006; vm.rotation.x = -0.12; g.add(vm);
  const cinto = new THREE.Mesh(new THREE.CylinderGeometry(0.112, 0.112, 0.035, 32), M.navy); cinto.scale.z = 0.45; cinto.position.y = -0.45; g.add(cinto);
  g.add(mesh(rbox(0.04, 0.032, 0.01, 0.005), M.cromo, 0, -0.45, 0.112 * 0.45 + 0.002));
  // breteles a la percha
  for (const s of [-1, 1]) g.add(tubo(V(s * 0.09, -0.21, 0), V(s * 0.17, -0.1, 0), 0.016, verde));
  // ruedo navy
  const ruedo = new THREE.Mesh(new THREE.TorusGeometry(0.283, 0.012, 6, 40), M.navy); ruedo.rotation.x = Math.PI / 2; ruedo.scale.y = 0.42; ruedo.position.y = -0.93; g.add(ruedo);
  g.userData = { cuerpo };
  return sh(g);
}
const VEST_X = [-0.74, 0, 0.74]; // ronda 1: más separados (en el primer plano del 39 no asoman cortados el 34 y el 44)
const vestidos = VEST_X.map(() => { const v = hacerVestido(); scene.add(v); return v; });
const RIEL_Y = 1.92;
const riel = new THREE.Group(); scene.add(riel);
{
  riel.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.12, 14).rotateZ(Math.PI / 2), M.navy, 0, RIEL_Y, 0));
  for (const s of [-1, 1]) { riel.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, RIEL_Y, 12), M.navy, s * 1.06, RIEL_Y / 2, 0)); riel.add(mesh(rbox(0.06, 0.04, 0.45, 0.015), M.navy, s * 1.06, 0.02, 0)); }
  sh(riel);
}
// etiquetas de precio paradas sobre el riel (cara: "US$" + número 3D; dorso: OFERTA)
const texUS = tex(512, 140, (x, w, h) => { x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 92); x.fillText("US$", w / 2, h / 2 + 4); });
const texOferta = tex(800, 560, (x, w, h) => { x.fillStyle = "#f4f2e8"; rr(x, 0, 0, w, h, 50); x.fillStyle = VER; rr(x, 40, 120, w - 80, 320, 40); x.strokeStyle = NAV0; x.lineWidth = 14; x.beginPath(); x.roundRect(40, 120, w - 80, 320, 40); x.stroke(); x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "OFERTA", 900, 190, w - 160); x.fillText("OFERTA", w / 2, h / 2 + 8); });
const ETW = 0.64, ETH = 0.45;
const etqCuerpo = [mat(C.cr, 0.6), mat(C.cr, 0.6), mat(C.cr, 0.6)];
const etqNum = [mat(C.navy, 0.45), mat(C.navy, 0.45), mat(C.navy, 0.45)];
function hacerPrecio(n, i) {
  const g = new THREE.Group();
  const borde = i === 1 ? M.g : M.navy2;
  g.add(mesh(rbox(ETW, ETH, 0.035, 0.04), [etqCuerpo[i], etqCuerpo[i], etqCuerpo[i], etqCuerpo[i], etqCuerpo[i], etqCuerpo[i]], 0, ETH / 2, 0));
  g.add(mesh(rbox(ETW + 0.04, 0.05, 0.05, 0.02), borde, 0, 0.02, 0)); // pinza que la agarra al riel
  const us = null; // ronda 2: el "US$" chico (~20 px) sale de la etiqueta; va en el subtítulo ("a US$ 34")
  const num = new THREE.Mesh(textoGeo(String(n), 0.32, 0.06), [etqNum[i], mat(C.navy2, 0.5)]); num.position.set(0, ETH * 0.5, 0.04); g.add(num);
  const dorso = mesh(new THREE.PlaneGeometry(ETW - 0.02, (ETW - 0.02) * 0.7), matTex(texOferta, 0.25), 0, ETH / 2, -0.019); dorso.rotation.y = Math.PI; g.add(dorso);
  g.userData = { num, us };
  return sh(g);
}
const precios = [34, 39, 44].map((n, i) => { const p = hacerPrecio(n, i); scene.add(p); return p; });
// pilas de cajas de envío (kraft con cinta verde): 34 → 3, 39 → 4, 44 → 3
const cajaG = rbox(0.42, 0.17, 0.32, 0.015);
const cintaG = new THREE.BoxGeometry(0.08, 0.172, 0.322);
const cajaM = [mat(C.kraft, 0.85), mat(C.kraft, 0.85), mat(C.kraft, 0.85)];
const pilas = [3, 4, 3].map((n, i) => Array.from({ length: n }, () => { const g = new THREE.Group(); g.add(new THREE.Mesh(cajaG, cajaM[i])); g.add(new THREE.Mesh(cintaG, M.g)); sh(g); scene.add(g); return g; }));
const PILA_Z = 0.42;
// la flecha que sube del 34 al 39 (crema con borde navy) y la tilde del 39
const flecha = new THREE.Group(); scene.add(flecha);
{
  const curva = new THREE.QuadraticBezierCurve3(V(-0.66, 0, 0), V(-0.37, 0.4, 0), V(-0.1, 0.06, 0));
  const tg = new THREE.TubeGeometry(curva, 30, 0.032, 10, false);
  flecha.add(new THREE.Mesh(tg, M.cr));
  const cab = mesh(new THREE.ConeGeometry(0.08, 0.16, 16), M.cr); cab.position.copy(V(-0.1, 0.06, 0)); cab.quaternion.setFromUnitVectors(_up, V(0.6, -0.8, 0).normalize()); flecha.add(cab);
  flecha.userData = { tg, curva, tubo: flecha.children[0] };
  sh(flecha);
}
const tilde39 = hacerTilde(0.13);

// ---------- P5: el regalo con el precio redondo ----------
const P5 = V(8.8, 0, 0); // ronda 1: más cerca (la OFERTA volaba sobre piso vacío)
const regalo = new THREE.Group(); scene.add(regalo);
{
  const R = { w: 0.95, h: 0.75, d: 0.85 };
  regalo.add(mesh(rbox(R.w, R.h, R.d, 0.03), M.navy, 0, R.h / 2, 0));
  regalo.add(mesh(rbox(R.w + 0.04, 0.14, R.d + 0.04, 0.03), M.navy2, 0, R.h - 0.05, 0));
  regalo.add(mesh(new THREE.BoxGeometry(0.13, R.h + 0.02, R.d + 0.06), M.g, 0, R.h / 2, 0));
  regalo.add(mesh(new THREE.BoxGeometry(R.w + 0.06, R.h + 0.02, 0.13), M.g, 0, R.h / 2, 0));
  for (const s of [-1, 1]) { const l = mesh(new THREE.TorusGeometry(0.13, 0.04, 10, 28), M.g, s * 0.13, R.h + 0.1, 0); l.rotation.set(0, s * 0.5, s * 0.6); l.scale.set(1, 0.75, 1); regalo.add(l); }
  regalo.add(mesh(new THREE.SphereGeometry(0.06, 16, 12), M.gd, 0, R.h + 0.05, 0));
  const texRed = tex(640, 360, (x, w, h) => { x.fillStyle = "#f4f2e8"; rr(x, 0, 0, w, h, 50); x.strokeStyle = NAV0; x.lineWidth = 14; x.beginPath(); x.roundRect(10, 10, w - 20, h - 20, 44); x.stroke(); x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "$ 4.000", 900, 160, w - 90); x.fillText("$ 4.000", w / 2, h / 2 + 6); });
  const tag = mesh(rbox(0.62, 0.35, 0.025, 0.04), [M.cr, M.cr, M.cr, M.cr, matTex(texRed, 0.25), M.cr], 0.0, R.h * 0.45, R.d / 2 + 0.06); tag.rotation.z = -0.08; regalo.add(tag);
  regalo.add(tubo(V(0.18, R.h * 0.45 + 0.16, R.d / 2 + 0.05), V(0.06, R.h + 0.02, R.d / 2 - 0.0), 0.007, M.navy));
  sh(regalo);
}
const tildeReg = hacerTilde(0.15);
const ofertaSuelta = new THREE.Group(); scene.add(ofertaSuelta);
{ ofertaSuelta.add(mesh(rbox(ETW, (ETW - 0.02) * 0.7 + 0.02, 0.035, 0.04), M.cr, 0, 0, 0)); const f = mesh(new THREE.PlaneGeometry(ETW - 0.02, (ETW - 0.02) * 0.7), matTex(texOferta, 0.25), 0, 0, 0.019); ofertaSuelta.add(f); sh(ofertaSuelta); }

// ================= ZONA F: el cierre verde (la etiqueta "$ 999") =================
const pisoF = pisoSombra(OF.x, 0, 8, 8, 0.0); // ronda 1: sin sombra (la etiqueta cuelga en el aire: la sombra verde flotaba)
const etF = hacerEtiqueta("999", M.cr, [M.navy, M.navy2], 0.9, 1.15); scene.add(etF);

// ================= TIEMPOS CLAVE =================
const S = E;
const T = {
  noventa: W[6], nueve: W[8], s02: S["s02-primer-numero"], primer: W[11], numero: W[12], pesa: W[13],
  s03: S["s03-cien"], parece: W[18], menos: W[19], cien: W[21],
  s04: S["s04-cajero"], cajero: W[24], vuelto: W[27], no: W[28], probado: W[30],
  s05: S["s05-catalogo"], midio: W[35], mismo: W[37], vestido: W[38],
  s06: S["s06-tres-precios"], t34: W[40], t39: W[45],
  s07: S["s07-vendio-mas"], caro: W[49], yv: W[50], vendio: W[51],
  s08: S["s08-oferta"], nueve8: W[54], oferta: W[57],
  s09: S["s09-redondo"], gana: W[60], redondo: W[62],
  s10: S["s10-ruben"], vendio10: W[68],
  s11: S["s11-reporte"], automatico: W[72], precio: W[76],
  s12: S["s12-medimos"], tuyos: W[81], agenda: W[82],
  fin: S["s13-cierre"],
};
T.teclas = [0.95, 1.3, 1.65];       // Rubén tipea 9, 9, 9 (el 1.000 ya está seleccionado)
T.enter = 2.0;                      // confirma: el 999 queda verde
T.sale999 = 2.2;                    // el 999 se despega de la pantalla
T.corteP = T.s02;                   // corte al 999 parado en la planilla
T.cae100 = T.menos;                 // la de 100 cae pesada
T.abreCajon = T.cajero + 0.05;
T.monedas = T.vuelto - 0.05;
T.sella = W[31] - 0.42;             // el sello golpea (ronda 1: en el hueco después de "probado.", no encima de "está")
T.abreLib = T.s05 - 0.3;            // ronda 1: antes (a mitad del travelling la tapa ya gira: no queda "CATÁL" cortado)
T.vestido1 = T.midio - 0.1;
T.triple = T.mismo;
T.etq = [T.t34, T.t39, T.t39 + 0.45];
T.cajas = [T.s06 + 0.15, T.s06 + 0.55, T.s06 + 0.95];
T.cuarta = T.vendio + 0.05;
T.gira = T.oferta + 0.1;
T.ofertaVuela = T.s09 - 0.04;       // la etiqueta del 39 (ya OFERTA) salta del riel y vuela al regalo
T.choque = T.gana + 0.05;
T.subeCam = W[62] + 0.33;           // la cámara sube a vista cenital de la planilla
T.corteO = W[62] + 0.62;            // corte a la pantalla del monitor (la grilla empalma)
T.cortaR = W[65];                   // ronda 1: corte limpio de la pantalla al contraplano de Rubén (antes la órbita pasaba por su cabeza)
T.levanta = T.s11 + 0.15;           // Rubén levanta el celular
T.filas = [T.automatico + 0.05, T.precio];
T.baja = T.s12 + 0.1;
T.brinda = T.s12 + 0.55;

// ================= CÁMARA (Catmull-Rom por claves, con tiempo no uniforme; entre planos, corte) =================
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const o = (x, y, z) => [OO.x + x, y, z];
const pz = (P, x, y, z) => [P.x + x, y, P.z + z];
let PLANOS = null;
function armarPlanos() {
  return [
    // s01: por encima del hombro derecho de Rubén, push-in lento al monitor; el 999 sale de la pantalla
    ["O1", 0, [
      k(0, o(-0.3, 2.5, -1.6), o(-0.08, 1.2, MON.z)),
      k(T.sale999, o(-0.3, 2.3, -1.0), o(-0.06, 1.27, MON.z)),
      k(T.s02, o(-0.32, 1.52, -0.36), o(-0.24, 1.45, MON.z)),
    ]],
    // s02-s09: la planilla (travelling lateral de objeto en objeto)
    ["P", T.corteP, [
      k(T.s02, pz(P1, 0, 0.5, 4.2), pz(P1, 0, 0.32, 0)),
      k(T.s02 + 0.25, pz(P1, -0.1, 0.62, 4.5), pz(P1, -0.04, 0.32, 0)),
      k(T.primer + 0.1, pz(P1, -0.75, 0.95, 4.5), pz(P1, -0.12, 0.34, 0)),
      k(T.pesa, pz(P1, -1.1, 1.15, 4.45), pz(P1, -0.04, 0.33, 0)),
      k(T.s03 - 0.12, pz(P1, -1.05, 1.2, 4.55), pz(P1, 0.0, 0.35, 0)),
      k(T.s03 + 0.25, pz(P2, 0, 1.5, 6.2), pz(P2, 0, 1.25, 0)),
      k(T.cien, pz(P2, 0, 1.45, 6.4), pz(P2, 0, 1.2, 0)),
      k(T.s04 - 0.15, pz(P2, 0.1, 1.5, 6.4), pz(P2, 0.1, 1.18, 0)),
      k(T.s04 + 0.35, pz(P3, 0, 2.3, 4.8), pz(P3, 0, 0.66, 0)),
      k(T.vuelto, pz(P3, 0, 2.1, 4.4), pz(P3, 0, 0.6, 0.15)),
      k(T.probado + 0.2, pz(P3, 0, 2.3, 4.6), pz(P3, 0, 0.66, 0)),
      k(T.s05 - 0.12, pz(P3, 0.2, 2.2, 4.8), pz(P3, 0.2, 0.7, 0)),
      k(T.s05 + 0.3, pz(P4, 0, 1.55, 6.9), pz(P4, 0, 1.22, -0.4)),
      k(T.mismo, pz(P4, 0, 1.6, 7.1), pz(P4, 0, 1.28, -0.2)),
      k(T.s06 + 0.3, pz(P4, 0, 1.95, 7.6), pz(P4, 0, 1.68, -0.1)),
      k(T.s07 - 0.1, pz(P4, 0, 1.95, 7.65), pz(P4, 0, 1.68, -0.1)),
      k(T.caro + 0.25, pz(P4, -0.05, 2.0, 7.3), pz(P4, -0.05, 1.74, 0)),
      k(T.yv - 0.05, pz(P4, -0.05, 2.0, 7.25), pz(P4, -0.05, 1.74, 0)),
      k(T.vendio + 0.3, pz(P4, 0, 1.95, 7.5), pz(P4, 0, 1.68, 0)),
      k(T.s08 + 0.2, pz(P4, 0, 1.98, 7.45), pz(P4, 0, 1.7, 0)),
      k(T.gira - 0.1, pz(P4, 0, 1.98, 7.4), pz(P4, 0, 1.7, 0)),
      k(T.oferta + 0.5, pz(P4, 0.0, 2.25, 2.35), pz(P4, 0, 2.16, 0)),
      k(T.s09 + 0.05, pz(P4, 0.05, 2.25, 2.4), pz(P4, 0.05, 2.14, 0)),
      k(T.s09 + 0.45, pz(P5, -0.18, 1.7, 5.75), pz(P5, -0.2, 0.5, 0)),
      k(T.choque + 0.2, pz(P5, -0.18, 1.75, 5.65), pz(P5, -0.2, 0.45, 0.1)),
      k(T.subeCam, pz(P5, -0.18, 2.55, 5.8), pz(P5, -0.2, 0.32, 0.2)),
      k(T.corteO, pz(P5, -0.18, 3.1, 5.45), pz(P5, -0.2, 0.25, 0.25)),
    ]],
    // s10: la pantalla (celda del 999 con el "?"); en "noventa" corte limpio al contraplano de frente a Rubén
    ["O2", T.corteO, [
      k(T.corteO, o(-0.29, MON.y + 0.02, MON.z - 1.4), o(-0.29, MON.y + 0.01, MON.z)),
      k(T.cortaR, o(-0.28, MON.y + 0.03, MON.z - 1.47), o(-0.28, MON.y + 0.01, MON.z)),
    ]],
    ["O2b", T.cortaR, [
      k(T.cortaR, o(1.28, 1.87, 1.52), o(0.2, 1.42, 0.05), 44),
      k(T.s11 - 0.3, o(1.2, 1.84, 1.44), o(0.22, 1.4, 0.05), 44),
      k(T.s11, o(1.18, 1.78, 1.42), o(0.3, 1.2, 0.2), 44),
    ]],
    // s11: push-in al celular que Rubén muestra (la cara mira por encima del teléfono)
    ["O3", T.s11, [
      k(T.s11, o(1.18, 1.78, 1.42), o(0.3, 1.2, 0.2), 44),
      k(T.levanta + 0.4, o(1.12, 1.62, 1.3), o(0.38, 1.28, 0.3), 40),
      k(T.automatico + 0.2, o(CELU_M.x - OO.x + 0.72, 1.36, CELU_M.z + 1.0), o(CELU_M.x - OO.x, CELU_M.y + 0.14, CELU_M.z), 36),
      k(T.s12 - 0.05, o(CELU_M.x - OO.x + 0.71, 1.36, CELU_M.z + 0.98), o(CELU_M.x - OO.x, CELU_M.y + 0.14, CELU_M.z), 36),
    ]],
    // s12: Rubén baja el celular (en vertical, al escritorio) y levanta el mate (brindis); la cámara se abre
    ["O4", T.s12, [
      k(T.s12, o(CELU_M.x - OO.x + 0.71, 1.36, CELU_M.z + 0.98), o(CELU_M.x - OO.x, CELU_M.y + 0.14, CELU_M.z), 36),
      k(T.brinda, o(1.2, 1.8, 1.45), o(0.32, 1.4, 0.12), 44),
      k(T.fin, o(1.13, 1.76, 1.35), o(0.32, 1.42, 0.12), 42),
    ]],
    ["F", T.fin, [
      k(T.fin, [OF.x, 0.86, 4.55], [OF.x, 0.86, 0]),
      k(DUR, [OF.x, 0.86, 4.4], [OF.x, 0.86, 0]),
    ]],
  ];
}
const _mira = new THREE.Vector3();
let plano = "O1";
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return pi; }
// Catmull-Rom no uniforme en el tiempo (tangentes por diferencias centradas; 0 en los extremos del plano)
function ponerCamara(t) {
  const pi = planoEn(t);
  plano = PLANOS[pi][0];
  const K = PLANOS[pi][2];
  let i = 0; while (i + 1 < K.length - 1 && K[i + 1][0] <= t) i++;
  const a0 = K[i], b0 = K[Math.min(i + 1, K.length - 1)];
  const hh = b0[0] - a0[0];
  const u = hh > 0 ? cl((t - a0[0]) / hh) : 0;
  const tang = (j, cc) => {
    if (j <= 0 || j >= K.length - 1) return 0;
    const p = K[j - 1], q = K[j], r2 = K[j + 1];
    // Catmull-Rom (diferencia centrada) con límite monótono: nunca se pasa de la clave y vuelve
    const d1 = (q[cc] - p[cc]) / Math.max(1e-4, q[0] - p[0]), d2 = (r2[cc] - q[cc]) / Math.max(1e-4, r2[0] - q[0]);
    if (d1 * d2 <= 0) return 0;
    const m = (r2[cc] - p[cc]) / Math.max(1e-4, r2[0] - p[0]);
    return Math.sign(m) * Math.min(Math.abs(m), 3 * Math.abs(d1), 3 * Math.abs(d2));
  };
  const s2 = u * u, s3 = s2 * u;
  const vv = [];
  for (let cc = 1; cc <= 7; cc++) {
    if (hh <= 0) { vv.push(a0[cc]); continue; }
    vv.push((2 * s3 - 3 * s2 + 1) * a0[cc] + (s3 - 2 * s2 + u) * hh * tang(i, cc) + (-2 * s3 + 3 * s2) * b0[cc] + (s3 - s2) * hh * tang(i + 1, cc));
  }
  camera.position.set(vv[0], vv[1], vv[2]);
  const amp = 0.002;
  camera.position.x += Math.sin(t * 0.7) * amp; camera.position.y += Math.sin(t * 0.53) * amp;
  // sacudida corta cuando golpea el sello
  const sac = rebote(t, T.sella, 9, 50, 0.025); camera.position.y += sac;
  _mira.set(vv[3], vv[4], vv[5]);
  camera.fov = vv[6];
  const dd = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.01, Math.min(0.08, dd * 0.03)); camera.far = 200;
  camera.updateProjectionMatrix();
  camera.up.set(0, 1, 0);
  // vista cenital: que el "arriba" de la cámara sea -z (si no, lookAt se vuelve inestable)
  const dir = _mira.clone().sub(camera.position).normalize();
  if (Math.abs(dir.y) > 0.9) camera.up.set(0, 0, -1);
  camera.lookAt(_mira);
  camera.updateMatrixWorld(true);
}

// ================= ZONA O en el tiempo =================
const enO = () => plano[0] === "O";
function bocaRuben(t) { const i = Math.round((t - BOCA.t0) * BOCA.fps); return i >= 0 && i < BOCA.v.length ? BOCA.v[i] : 0; }
function zonaO(t) {
  const en = enO();
  oficina.visible = deposito.visible = ruben.raiz.visible = mateR.visible = termo.visible = celu.visible = pisoO.visible = en;
  if (!en) return;
  // ---- la lista de precios ----
  const nT = T.teclas.filter((x) => t >= x).length;
  const precio = nT === 0 ? "$ 1.000" : "$ " + "999".slice(0, nT);
  const sel = t < T.teclas[0];
  const ok = t >= T.enter;
  const cursor = !sel && !ok;
  const preg = plano === "O1" ? 0 : sg(t, T.corteO + 0.06, T.corteO + 0.26) * (1 - sg(t, T.filas[0], T.filas[0] + 0.25)); // ronda 1: el "?" entra apenas corta a la pantalla
  dibujarLista(precio, sel, cursor, preg, ok, plano !== "O1", plano === "O1" && t >= T.sale999);
  // ---- Rubén ----
  const tecla = (x) => T.teclas.reduce((m, a) => m + pulso(x, a - 0.08, 0.16), 0);
  const pr = poseEn(t, [
    [0, { x: RUB.x, z: RUB.z, giro: 0, ...CARA.concentrada, manoI: [0.1, 0.4, 0.5], manoD: [-0.12, 0.4, 0.5], codoI: [1, -0.4, -0.3], codoD: [-1, -0.4, -0.3], dedoI: 0, dedoD: 1, cabeza: { giro: 0, asiente: 0.25, ladea: 0 }, ojos: { x: -0.2, y: -0.5, abiertos: 0.85 } }],
    [T.enter + 0.1, { ...CARA.sonrisa, cabeza: { giro: 0, asiente: 0.15, ladea: 0.06 }, ojos: { x: 0, y: -0.3, abiertos: 1 } }, 0.3],
    // s10: mira la pantalla (de frente a cámara); en "vendió más" mira al depósito por el vidrio
    [T.s10 + 0.3, { giro: GIRO_R, ...CARA.incredula, manoI: [0.2, 0.36, 0.42], manoD: [-0.2, 0.36, 0.42], codoI: null, codoD: null, dedoD: 0, cabeza: { giro: 0, asiente: 0.12, ladea: -0.05 }, ojos: { x: 0, y: -0.25, abiertos: 0.95 }, cejas: { alto: 0.45, ang: 0.3, asim: 0.6 } }, 0.3],
    [T.vendio10, { ...CARA.esperanza, cabeza: { giro: -0.35, asiente: -0.05, ladea: 0.05 }, ojos: { x: -0.6, y: 0.1, abiertos: 1 }, cejas: { alto: 0.7, ang: 0.45 } }, 0.35],
    // s11: levanta el celular y lo muestra
    [T.levanta + 0.35, { ...CARA.sorpresa, cabeza: { giro: 0.0, asiente: 0.3, ladea: 0 }, ojos: { x: 0, y: -0.7, abiertos: 1 }, boca: { sonrisa: 0.3, abierta: 0.25, ancho: 0.8 } }, 0.3],
    [T.filas[1], { ...CARA.feliz, boca: { sonrisa: 0.55, abierta: 0.22, ancho: 0.95 }, cabeza: { giro: 0.0, asiente: 0.25, ladea: 0.08 }, ojos: { x: 0, y: -0.6, abiertos: 0.95, feliz: 0.4 } }, 0.3],
    // s12: brindis con el mate, media sonrisa a cámara
    [T.brinda + 0.1, { ...CARA.sonrisa, cabeza: { giro: -0.08, asiente: 0.04, ladea: 0.1 }, ojos: { x: -0.1, y: 0.05, abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.0 }, cejas: { alto: 0.25, asim: -0.5 } }, 0.3],
  ]);
  pr.t = t;
  // tipea con los índices
  if (t < T.enter + 0.3) { const k2 = tecla(t); pr.manoD = [pr.manoD[0], pr.manoD[1] + 0.05 - 0.05 * k2, pr.manoD[2]]; }
  if (t > BOCA.t0 - 0.05 && t < BOCA.t0 + BOCA.v.length / BOCA.fps) { const bb = bocaRuben(t); pr.boca.abierta = Math.max(pr.boca.abierta, bb * 0.6); pr.boca.ancho = lerp(pr.boca.ancho, 0.75, bb); }
  // el celular: en el escritorio; en s11 sube a las dos manos de cara a la cámara; en s12 vuelve al escritorio
  const sube = eio(sg(t, T.levanta, T.levanta + 0.4)) * (1 - eio(sg(t, T.baja, T.baja + 0.35)));
  const KC = 2.1;
  celu.position.lerpVectors(CELU_ESC.clone().add(V(0, 0.006, 0)), CELU_M, sube);
  celu.rotation.set(lerp(-Math.PI / 2, -0.05, sube), lerp(0.2, GIRO_R, sube), 0, "YXZ");
  celu.scale.setScalar(lerp(1, KC, sube));
  const vib = t > T.s11 - 0.05 && t < T.levanta ? Math.sin(t * 90) * 0.004 : 0; celu.position.x += vib;
  const ap = t < T.s11 - 0.05;
  dibujarCelu(ap, [popIn(t, T.filas[0], 0.35) > 0 ? sg(t, T.filas[0], T.filas[0] + 0.3) : 0, sg(t, T.filas[1], T.filas[1] + 0.3)]);
  if (sube > 0.01) {
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const lat = V(Math.cos(GIRO_R), 0, -Math.sin(GIRO_R)), atr = V(-Math.sin(GIRO_R), 0, -Math.cos(GIRO_R)).multiplyScalar(0.04);
    // ronda 2: las manos toman los bordes del teléfono (antes quedaban a ~4 cm y el celular flotaba)
    const atr2 = V(-Math.sin(GIRO_R), 0, -Math.cos(GIRO_R)).multiplyScalar(0.035);
    const hd = CELU_M.clone().addScaledVector(lat, -0.12).add(V(0, -0.15, 0)).add(atr2), hi = CELU_M.clone().addScaledVector(lat, 0.12).add(V(0, -0.15, 0)).add(atr2); // esquinas de abajo
    ruben.cuerpo.worldToLocal(hd); ruben.cuerpo.worldToLocal(hi);
    pr.manoD = pr.manoD.map((v, i) => lerp(v, [hd.x, hd.y, hd.z][i], sube)); pr.codoD = [-1, -0.5, -0.2];
    pr.manoI = pr.manoI.map((v, i) => lerp(v, [hi.x, hi.y, hi.z][i], sube)); pr.codoI = [1, -0.5, -0.2];
  }
  // el mate: en el escritorio; en s12 lo levanta con la mano derecha (brindis a cámara)
  const br = eio(sg(t, T.brinda - 0.3, T.brinda + 0.1));
  if (br > 0.01) {
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const objetivo = V(RUB.x + 0.38, 1.3, RUB.z + 0.38);
    const h = objetivo.clone(); ruben.cuerpo.worldToLocal(h);
    pr.manoI = pr.manoI.map((v, i) => lerp(v, [h.x, h.y - 0.02, h.z][i], br)); pr.codoI = [1, -0.6, -0.1];
  }
  ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
  if (br > 0.01) {
    const mp = ruben.mano("I").getWorldPosition(new THREE.Vector3());
    // ronda 2: el mate al costado de la mano (afuera) y más abajo: la mano lo toma por el costado, nunca por la boca
    const latM = V(Math.cos(GIRO_R), 0, -Math.sin(GIRO_R));
    mateR.position.lerpVectors(MATE_ESC, mp.addScaledVector(latM, 0.11).add(V(0, -0.09, 0.02)), br); mateR.rotation.set(0, 0, -0.1 * br);
  } else { mateR.position.copy(MATE_ESC); mateR.rotation.set(0, 0, 0); }
}

// ================= ZONA P en el tiempo =================
const enP = () => plano === "P";
function zonaP(t) {
  const en = enP();
  planilla.visible = pisoP.visible = en;
  // el 999: en la oficina sale de la pantalla (O1, desde T.sale999); en la planilla está parado en P1
  if (plano === "O1") {
    const u = eo(sg(t, T.sale999, T.s02));
    num999.visible = t >= T.sale999;
    num999.position.set(OO.x - 0.17 - 0.06 * u, MON.y + 0.03 + 0.06 * u, MON.z - 0.04 - 0.3 * u); // ronda 1: termina centrado en cuadro
    num999.rotation.set(0, Math.PI, 0);
    num999.scale.setScalar(lerp(0.13, 0.17, u)); // ronda 1: 0,26 → 0,17 (en el corte quedaba cortado a los costados)
  } else if (en) {
    num999.visible = t < T.s04;
    num999.position.set(P1.x, ALTO9 / 2 + 0.003, P1.z); num999.rotation.set(0, 0, 0); num999.scale.setScalar(1);
  } else num999.visible = false;
  // los tres 9: el primero verde y grande en "primer número"; los otros chicos y apagados
  const pv = eio(sg(t, T.primer, T.numero + 0.1));
  nueves.forEach((m, i) => {
    const s = i === 0 ? 1 + 0.35 * pv + 0.06 * pulso(t, T.pesa, 0.3) : 1 - 0.22 * pv;
    m.scale.setScalar(s);
    m.position.set((i - 1) * PASO9 + (i === 0 ? -0.12 * pv : i === 1 ? 0.02 * pv : 0.0), (s - 1) * ALTO9 / 2, 0);
    if (i === 0) { cara9[0].color.setHex(C.cr).lerp(new THREE.Color(C.g), pv); lado9[0].color.setHex(C.navy2).lerp(new THREE.Color(C.navy), pv); cara9[0].emissive.setHex(C.g); cara9[0].emissiveIntensity = 0.12 * pv; }
    else { cara9[i].color.setHex(C.cr).lerp(new THREE.Color(0x8a93a6), pv * 0.8); }
  });
  et99.visible = et100.visible = hilo99.visible = hilo100.visible = perchero.visible = en && t > T.s03 - 0.5 && t < T.s05;
  caja.visible = sello.visible = placaNP.visible = en && t > T.s04 - 0.6 && t < T.s05 + 0.34;
  monedas.forEach((m) => (m.visible = en && t > T.monedas && t < T.s05 + 0.2));
  libro.visible = riel.visible = en && t > T.s05 - 0.5 && t < T.s09 + 0.7;
  vestidos.forEach((v) => (v.visible = libro.visible));
  precios.forEach((p) => (p.visible = libro.visible));
  pilas.flat().forEach((c) => (c.visible = libro.visible));
  flecha.visible = tilde39.visible = libro.visible;
  regalo.visible = tildeReg.visible = en && t > T.s09 - 0.3;
  ofertaSuelta.visible = en && t >= T.ofertaVuela;
  if (!en) return;

  // ---- P2: etiquetas ----
  {
    const H = 2.25;
    perchero.position.copy(P2);
    const kk = popIn(t, T.s03 - 0.3, 0.35);
    const cae = t < T.cae100 ? 0 : eo(sg(t, T.cae100, T.cae100 + 0.22)) * 0.42 + rebote(t, T.cae100 + 0.22, 7, 22, 0.06);
    const sube = t < T.cae100 ? 0 : eo(sg(t, T.cae100, T.cae100 + 0.4)) * 0.22;
    const L99 = 0.55 - sube, L100 = 0.55 + cae;
    const sw99 = Math.sin(t * 3.2) * 0.05 + rebote(t, T.cae100, 3, 9, 0.12);
    [[et99, hilo99, -0.48, L99, sw99], [et100, hilo100, 0.48, L100, Math.sin(t * 2.7 + 1) * 0.02]].forEach(([e, h, dx, L, sw]) => {
      const top = V(P2.x + dx, H, P2.z);
      const fin = V(top.x + Math.sin(sw) * L, H - Math.cos(sw) * L, top.z);
      e.position.copy(fin).add(V(0, 0.12, 0)); e.rotation.set(0, 0, sw); e.scale.setScalar(kk);
      h.position.copy(top).add(fin).multiplyScalar(0.5); h.scale.set(1, L, 1); h.rotation.set(0, 0, sw);
    });
  }
  // ---- P3: la caja registradora, el cajón, las monedas, el sello ----
  {
    caja.position.copy(P3);
    const kk = popIn(t, T.s04 - 0.4, 0.35) * (1 - eio(sg(t, T.s05 + 0.12, T.s05 + 0.34))); // ronda 1: se va al llegar al catálogo
    caja.scale.setScalar(Math.max(kk, 0.001)); caja.rotation.set(0, 0, 0);
    dispCaja.material = dispM[t > T.s04 + 0.15 ? 1 : 0];
    const ab = eo(sg(t, T.abreCajon, T.abreCajon + 0.18)) + rebote(t, T.abreCajon + 0.18, 9, 30, 0.03);
    cajon.position.z = 0.42 * ab;
    caja.userData.man.rotation.x = -Math.PI * 2 * eo(sg(t, T.abreCajon - 0.2, T.abreCajon + 0.1));
    caja.position.y += rebote(t, T.abreCajon, 12, 40, 0.012);
    // monedas: saltan del cajón (balística determinista), rebotan una vez y quedan en el piso
    monedas.forEach((m, i) => {
      const v = MON_V[i], t0 = T.monedas + v.d, dt = Math.max(0, t - t0);
      const p0 = V(P3.x + (i - 2) * 0.13, BH - 0.02, P3.z + BD / 2 + 0.25);
      const g = 9.8;
      let x = p0.x + v.vx * dt, z = p0.z + v.vz * dt, y = p0.y + v.vy * dt - 0.5 * g * dt * dt;
      const tSuelo = (v.vy + Math.sqrt(v.vy * v.vy + 2 * g * p0.y)) / g;
      if (dt > tSuelo) { const d2 = dt - tSuelo, vy2 = v.vy * 0.25; y = Math.max(0.009, vy2 * d2 - 0.5 * g * d2 * d2); const dd = Math.min(d2, 0.35); x = p0.x + v.vx * tSuelo + v.vx * 0.3 * dd; z = p0.z + v.vz * tSuelo + v.vz * 0.3 * dd; }
      m.position.set(x, Math.max(0.009, y), z);
      const quieto = dt > tSuelo + 0.12;
      m.rotation.set(quieto ? 0 : dt * v.rx, 0, quieto ? 0 : dt * v.rz);
      m.visible = m.visible && dt > 0;
    });
    // el sello baja, golpea sobre el teclado, sube; queda la placa NO PROBADO
    const tec = caja.userData.tec; tec.updateMatrixWorld(true);
    const centro = V(0, 0.08, 0).applyMatrix4(tec.matrixWorld);
    const baja = eio(sg(t, T.sella - 0.28, T.sella)), subeS = eio(sg(t, T.sella + 0.2, T.sella + 0.5));
    const yS = lerp(1.6, 0.0, baja) + lerp(0, 3.6, subeS); // ronda 1: baja desde más cerca (entraba cortado por arriba)
    sello.position.copy(centro).add(V(0, yS, 0)); sello.rotation.set(tec.rotation.x * baja * (1 - subeS), 0, -0.1);
    sello.scale.setScalar((1 + 0.08 * pulso(t, T.sella, 0.12)) * kk);
    sello.visible = sello.visible && t > T.sella - 0.3 && t < T.sella + 0.55;
    const pl = t < T.sella ? 0 : lerp(1.1, 1, eo(sg(t, T.sella, T.sella + 0.15)));
    placaNP.visible = placaNP.visible && pl > 0;
    placaNP.position.copy(centro).add(V(0, 0.035, 0).applyQuaternion(tec.getWorldQuaternion(new THREE.Quaternion())));
    placaNP.quaternion.copy(tec.getWorldQuaternion(new THREE.Quaternion())).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0.1)));
    placaNP.scale.setScalar(pl * kk);
  }
  // ---- P4: catálogo, vestidos, precios, pilas, flecha, tilde, OFERTA ----
  {
    libro.position.set(P4.x, 0, P4.z + LIB.z);
    const ab = eio(sg(t, T.abreLib, T.abreLib + 0.45));
    tapaLib.rotation.y = -Math.PI * 0.94 * ab;
    libro.scale.setScalar(popIn(t, T.s05 - 0.45, 0.35));
    { const kr = popIn(t, T.s05 + 0.3, 0.3); riel.position.set(P4.x, RIEL_Y * (1 - kr), P4.z); riel.scale.setScalar(Math.max(kr, 0.001)); riel.visible = riel.visible && kr > 0; } // ronda 2: crece desde la barra (sin pata suelta) // ronda 1: el riel baja desde arriba y queda por encima del catálogo (antes subía y tachaba la tapa) // ronda 1: entra con el catálogo, ya en su lugar (antes subía y tachaba la tapa)
    // vestidos: el del medio sube del catálogo; en "mismo vestido" salen los otros dos a los costados
    vestidos.forEach((v, i) => {
      const t0 = i === 1 ? T.vestido1 : T.triple + (i === 0 ? 0 : 0.12);
      const u = popIn(t, t0, 0.32);
      const corre = i === 1 ? 1 : eo(sg(t, t0, t0 + 0.35));
      v.position.set(P4.x + VEST_X[i] * corre, RIEL_Y + 0.02, P4.z);
      v.rotation.set(0, Math.sin(t * 1.7 + i) * 0.06, Math.sin(t * 2.1 + i * 2) * 0.015);
      ocultar(v, u);
      v.userData.cuerpo.scale.x = 1 + Math.sin(t * 2.4 + i) * 0.02;
    });
    // precios sobre el riel; el 34 y el 44 se apagan cuando gana el 39
    const pierde = eio(sg(t, T.cuarta, T.cuarta + 0.3));
    precios.forEach((p, i) => {
      const u = popIn(t, T.etq[i], 0.3);
      const gira = i === 1 ? eio(sg(t, T.gira, T.gira + 0.32)) : 0;
      const zoom = i === 1 ? 1 + 0.1 * pulso(t, T.vendio, 0.3) : 1;
      p.position.set(P4.x + VEST_X[i], RIEL_Y + 0.03, P4.z);
      p.rotation.set(0, Math.PI * gira, 0);
      const vaSe = i === 1 ? 1 : 1 - eio(sg(t, T.gira, T.gira + 0.25)); // ronda 1: fuera de cuadro en el primer plano del 39; ya no cruzan por detrás del subtítulo en el vuelo
      ocultar(p, u * zoom * vaSe);
      if (i === 1 && t >= T.ofertaVuela) p.visible = false;
      if (i !== 1) { etqCuerpo[i].color.setHex(C.cr).lerp(new THREE.Color(0x9aa0ad), pierde * 0.7); etqNum[i].color.setHex(C.navy).lerp(new THREE.Color(0x4a5672), pierde); }
    });
    // pilas: crecen parejas a 3 durante s06; la del 39 suma la cuarta en "vendió más"
    pilas.forEach((pila, i) => pila.forEach((c, j) => {
      const tc = j < 3 ? T.cajas[j] + i * 0.08 : T.cuarta;
      const cae = sg(t, tc, tc + 0.18);
      const yFin = 0.085 + j * 0.172;
      const y = cae <= 0 ? -1 : yFin + (1 - eo(cae)) * 0.6 + rebote(t, tc + 0.18, 10, 30, 0.015);
      c.visible = c.visible && cae > 0;
      c.position.set(P4.x + VEST_X[i], y, P4.z + PILA_Z); c.rotation.set(0, ((j * 37 + i * 11) % 7 - 3) * 0.03, 0);
      if (i !== 1) cajaM[i].color.setHex(C.kraft).lerp(new THREE.Color(0x8e8c80), pierde * 0.6);
    }));
    // flecha 34 → 39 en "Más caro…" (se dibuja de a poco)
    const fl = sg(t, T.caro + 0.05, T.caro + 0.4);
    flecha.position.set(P4.x - 0.03, RIEL_Y + ETH + 0.1, P4.z + 0.05);
    flecha.children[0].geometry.setDrawRange(0, Math.floor(fl * flecha.userData.tg.index.count / 3) * 3);
    flecha.children[1].visible = fl > 0.95;
    flecha.visible = flecha.visible && fl > 0 && t < T.yv - 0.08;
    // tilde del 39
    const tu = popIn(t, T.cuarta + 0.08, 0.3);
    tilde39.position.set(P4.x + VEST_X[1] / 2 + 0.34 / 2 + 0.17, 0.5, P4.z + PILA_Z + 0.25);
    ocultar(tilde39, tilde39.visible ? tu * (1 - sg(t, T.s08 + 0.1, T.s08 + 0.3)) : 0);
  }
  // ---- P5: el regalo; la etiqueta OFERTA llega, choca y rebota ----
  {
    const ent = eo(sg(t, T.s09 - 0.25, T.s09 + 0.3));
    regalo.position.set(P5.x + 1.6 * (1 - ent), 0, P5.z); regalo.rotation.set(0, -0.25, 0);
    regalo.position.x -= rebote(t, T.choque, 8, 25, 0.03);
    // la OFERTA llega deslizando desde la izquierda, choca contra el regalo y cae acostada
    const u = sg(t, T.ofertaVuela, T.choque), ue = eio(u);
    const A = V(P4.x + VEST_X[1], RIEL_Y + 0.03 + ETH / 2, P4.z), B = V(P5.x - 0.7, 0.28, P5.z + 0.4); // ronda 2: para justo antes de la placa del precio (no la atraviesa)
    const reb = t > T.choque ? eo(sg(t, T.choque, T.choque + 0.35)) : 0;
    const x = lerp(A.x, B.x, ue) - 0.03 * reb;
    const yC = lerp(A.y, B.y, ue) + Math.sin(Math.PI * u) * 0.12;
    const tumba = eio(sg(t, T.choque + 0.1, T.choque + 0.45));
    ofertaSuelta.position.set(x, lerp(yC, 0.03, tumba), lerp(A.z, B.z, ue) + 0.45 * Math.sin(Math.PI * Math.min(1, u * 1.6)) * (1 - ue) + 0.2 * reb);
    ofertaSuelta.rotation.set(-Math.PI / 2 * tumba, 0.25 * ue * (1 - tumba), (-0.3 * Math.sin(Math.PI * u)) * (1 - tumba) + 0.15 * tumba);
    ofertaSuelta.scale.setScalar(1);
    const tr = popIn(t, T.redondo, 0.3);
    tildeReg.position.set(P5.x - 0.4, 0.98, P5.z + 0.45); // ronda 2: arriba a la izquierda, sin pisar la placa del precio
    ocultar(tildeReg, tr);
  }
}

// ================= ZONA F en el tiempo =================
function zonaF(t) {
  const en = plano === "F";
  etF.visible = pisoF.visible = en;
  if (!en) return;
  const kk = lerp(0.5, 1, bk(sg(t, T.fin - 0.02, T.fin + 0.35)));
  etF.position.set(OF.x, 0.98, 0); etF.rotation.set(0.05, Math.sin((t - T.fin) * 1.6) * 0.18, Math.sin((t - T.fin) * 2.2) * 0.05); etF.scale.setScalar(kk);
}

// ================= ESCENA EN EL TIEMPO =================
let _armado = false;
function renderAt(t) {
  if (!_armado) { _armado = true; PLANOS = armarPlanos(); }
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  let foco = V(0, 0.5, 0), rad = 2.2;
  if (plano[0] === "O") { foco = V(OO.x, 1.0, 0.3); rad = 2.6; }
  else if (plano === "P") { foco = V(camera.position.x, 0.5, 0); rad = 3.0; }
  else if (plano === "F") { foco = OF.clone().add(V(0, 0.6, 0)); rad = 1.5; }
  sol.position.copy(foco).add(V(-2.2, 7, 5)); sol.target.position.copy(foco);
  Object.assign(sol.shadow.camera, { left: -rad, right: rad, top: rad, bottom: -rad, near: 0.5, far: 60 }); sol.shadow.camera.updateProjectionMatrix();
  zonaO(t);
  zonaP(t);
  zonaF(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e2) => renderAt(e2.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
