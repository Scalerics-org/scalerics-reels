// Capa 3D de netflix-blockbuster, versión corta del 03-11 (Three.js r170 local). Todo se dibuja
// desde el tiempo del timeline (hf-seek): renderAt(t) es una función pura de t. Objetos genéricos,
// sin logos ni colores de Netflix o Blockbuster: etiqueta US$50M, año 2000 → 2010, local con
// persiana, casa, cajas de película, multa y tilde, sobre, celular, caja de envío y tarjeta.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { E, W, DUR } from "./tiempos3d.js";

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.5, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
// entra con rebote en a, sale en b (0..1)
const vida = (t, a, b, din = 0.45, dout = 0.35) => (t < a || t > b + dout ? 0 : bk(sg(t, a, a + din)) * (1 - eio(sg(t, b, b + dout))));
const S = E; // inicios de escena

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
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 200);

// entorno oscuro con tres tiras suaves (se gira con el tiempo para que los brillos barran)
function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x070b14);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, Math.PI / 2.4, 0xfff1dc, 2.4);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xbcd6ff, 1.8);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.2);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ color: 0x15233d, side: THREE.DoubleSide }));
  top.position.y = 9; top.rotation.x = Math.PI / 2; env.add(top);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.55;

const key = new THREE.DirectionalLight(0xffe3c2, 2.6); key.position.set(-4, 6, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0x9cc4ff, 2.2); rim.position.set(5, 3, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0x2c4270, 0x0b1220, 0.9); scene.add(fill);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x7d8597 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.5), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.65),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.52), edge: mat(C.edge, 0.5),
  red: mat(C.red, 0.58), white: mat(C.white, 0.5), gris: mat(C.gris, 0.62),
  anio: mat(C.g, 0.5),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };

// sombra de contacto: un plano con degradé radial en el piso
const sombraTex = (() => {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const x = c.getContext("2d"); const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(2,4,10,0.75)"); gr.addColorStop(0.5, "rgba(2,4,10,0.35)"); gr.addColorStop(1, "rgba(2,4,10,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const sombra = (w, d) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, opacity: 1 }));
  m.rotation.x = -Math.PI / 2; m.renderOrder = -1; return m;
};

// ---------- tipografía 3D (Lexend 800, convertida desde el woff2 del repo) ----------
const font = new FontLoader().parse(LEXEND);
const texto3d = (s, size, depth, m) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 6, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return new THREE.Mesh(g, m);
};

// ================= OBJETOS =================
// --- el año: 4 casilleros, 10 dígitos cada uno, que giran como un contador ---
const DIG = Array.from({ length: 10 }, (_, d) => {
  const g = new TextGeometry(String(d), { font, size: 1, depth: 0.3, curveSegments: 6, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.028, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -0.15);
  return g;
});
const anio = new THREE.Group(); scene.add(anio);
const PASO = 0.74;
const casillas = [0, 1, 2, 3].map((i) => {
  const g = new THREE.Group(); g.position.x = (i - 1.5) * PASO; anio.add(g);
  const ms = DIG.map((geo) => { const m = new THREE.Mesh(geo, M.anio); m.visible = false; g.add(m); return m; });
  return ms;
});
const anioSombra = sombra(3.6, 0.9); scene.add(anioSombra);
// "diez años después": 2000 rueda de a dos hasta 2010
const ANIOS = [[-1, 2000], ...[2002, 2004, 2006, 2008, 2010].map((a, k) => [W[12] + 0.15 + k * 0.2, a])];
const dig = (y, i) => Number(String(y)[i]);
function ponerAnio(t, x, y, z, s, ry) {
  anio.visible = s > 0.002;
  anioSombra.visible = anio.visible;
  if (!anio.visible) return;
  anio.position.set(x, y, z); anio.scale.setScalar(s); anio.rotation.y = ry;
  anioSombra.position.set(x, y - 0.75 * s, z); anioSombra.scale.setScalar(s); anioSombra.material.opacity = 0.7;
  let k = 0; while (k + 1 < ANIOS.length && ANIOS[k + 1][0] <= t) k++;
  for (let i = 0; i < 4; i++) {
    const cur = dig(ANIOS[k][1], i);
    let kc = k; while (kc > 0 && dig(ANIOS[kc - 1][1], i) === dig(ANIOS[kc][1], i)) kc--;
    const ms = casillas[i]; ms.forEach((m) => (m.visible = false));
    const p = kc > 0 ? eio(sg(t, ANIOS[kc][0], ANIOS[kc][0] + 0.18)) : 1;
    const nuevo = ms[cur]; nuevo.visible = true; nuevo.rotation.x = (1 - p) * (Math.PI / 2); nuevo.position.y = (1 - p) * 0.35;
    if (p < 1) { const viejo = ms[dig(ANIOS[kc - 1][1], i)]; viejo.visible = true; viejo.rotation.x = -p * (Math.PI / 2); viejo.position.y = -p * 0.35; }
  }
}

// --- sobre (genérico: crema con franja verde y etiqueta) ---
const sobre = (() => {
  const W2 = 2.9, H2 = 2.0;
  const cuerpo = mesh(rbox(W2, H2, 0.07, 0.03), M.cr);
  const franja = mesh(rbox(W2 - 0.02, 0.26, 0.075, 0.02), M.g, 0, -0.62, 0.005);
  const etq = mesh(rbox(1.3, 0.62, 0.08, 0.03), M.white, 0.55, 0.05, 0.01);
  const l1 = mesh(rbox(0.9, 0.08, 0.085, 0.03), M.navy3, 0.45, 0.16, 0.012);
  const l2 = mesh(rbox(0.65, 0.08, 0.085, 0.03), M.navy3, 0.33, -0.04, 0.012);
  const sello = mesh(rbox(0.38, 0.46, 0.085, 0.03), M.gd, -1.0, 0.55, 0.012);
  const tri = new THREE.Shape(); tri.moveTo(-W2 / 2, 0); tri.lineTo(W2 / 2, 0); tri.lineTo(0, -1.15); tri.closePath();
  const solapa = mesh(new THREE.ExtrudeGeometry(tri, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.02, bevelSegments: 2 }), M.cr2);
  const bis = new THREE.Group(); bis.position.set(0, H2 / 2, 0.045); bis.add(solapa);
  const g = grupo(cuerpo, franja, etq, l1, l2, sello, bis);
  g.userData.bis = bis; g.userData.frente = [etq, l1, l2, sello];
  return g;
})();
scene.add(sobre);
const sobreSombra = sombra(3.6, 1.0); scene.add(sobreSombra);

// --- multa (ticket rojo apagado) y tilde verde ---
const multa = (() => {
  const t = mesh(rbox(2.3, 1.25, 0.08, 0.05), M.red);
  const b1 = mesh(rbox(1.5, 0.13, 0.09, 0.04), M.cr, -0.2, 0.25, 0.01);
  const b2 = mesh(rbox(1.0, 0.13, 0.09, 0.04), M.cr, -0.45, 0.0, 0.01);
  const b3 = mesh(rbox(0.7, 0.28, 0.09, 0.05), M.white, 0.6, -0.32, 0.01);
  return grupo(t, b1, b2, b3);
})();
scene.add(multa);
const tilde = (() => {
  const sh = new THREE.Shape(); sh.moveTo(-0.9, 0.05); sh.lineTo(-0.55, 0.4); sh.lineTo(-0.2, 0.05); sh.lineTo(0.62, 0.87); sh.lineTo(0.97, 0.52); sh.lineTo(-0.2, -0.65); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -0.15);
  return mesh(g, M.g);
})();
scene.add(tilde);

// --- etiqueta de precio US$50M ---
const etiqueta = (() => {
  const w = 2.9, h = 1.35, r = 0.16, pt = 0.55;
  const sh = new THREE.Shape();
  sh.moveTo(-w / 2 + pt, h / 2); sh.lineTo(w / 2 - r, h / 2); sh.quadraticCurveTo(w / 2, h / 2, w / 2, h / 2 - r);
  sh.lineTo(w / 2, -h / 2 + r); sh.quadraticCurveTo(w / 2, -h / 2, w / 2 - r, -h / 2); sh.lineTo(-w / 2 + pt, -h / 2); sh.lineTo(-w / 2, 0); sh.closePath();
  const hole = new THREE.Path(); hole.absarc(-w / 2 + 0.42, 0, 0.11, 0, Math.PI * 2, true); sh.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3, curveSegments: 24 });
  g.translate(0, 0, -0.06);
  const base = new THREE.MeshStandardMaterial({ color: C.cr, roughness: 0.55 });
  const cuerpo = mesh(g, base);
  const txt = texto3d("US$50M", 0.47, 0.1, M.navy); txt.position.set(0.24, 0, 0.12);
  const gr = grupo(cuerpo, txt); gr.userData.base = base; return gr;
})();
scene.add(etiqueta);
const etiquetaSombra = sombra(3.4, 0.9); scene.add(etiquetaSombra);

// --- local con persiana ---
const vidrioMat = new THREE.MeshStandardMaterial({ color: 0x0c1526, emissive: 0x1f3254, emissiveIntensity: 1, roughness: 0.35 });
const local = (() => {
  const g = new THREE.Group();
  g.add(mesh(rbox(3.5, 3.2, 0.7, 0.06), M.cr2, 0, 0, -0.35));
  g.add(mesh(rbox(3.62, 0.56, 0.8, 0.06), M.navy3, 0, 1.38, -0.3)); // cartel
  g.add(mesh(rbox(2.2, 0.22, 0.82, 0.05), M.cr, 0, 1.38, -0.29)); // franja del cartel (sin marca)
  // toldo a rayas
  for (let i = 0; i < 9; i++) { const r = mesh(rbox(0.4, 0.12, 0.6, 0.03), i % 2 ? M.cr : M.navy3, (i - 4) * 0.39, 1.02, 0.1); r.rotation.x = 0.35; g.add(r); }
  g.add(mesh(new THREE.PlaneGeometry(2.8, 1.74), vidrioMat, 0, -0.3, 0.012)); // vidriera = la pantalla del tele
  g.add(mesh(rbox(3.0, 0.12, 0.2, 0.04), M.cr3, 0, -1.24, 0.06)); // zócalo de la vidriera
  g.add(mesh(rbox(3.0, 0.12, 0.2, 0.04), M.cr3, 0, 0.62, 0.06));
  const pers = new THREE.Group(); g.add(pers);
  const tablillas = [];
  for (let i = 0; i < 12; i++) { const s = mesh(rbox(2.96, 0.16, 0.08, 0.035), M.cr3, 0, 0.5 - i * 0.155, 0.11); pers.add(s); tablillas.push(s); }
  g.userData.tab = tablillas;
  return g;
})();
scene.add(local);
const localSombra = sombra(4.2, 1.4); scene.add(localSombra);

// --- cajas de película (idénticas) ---
const tapaTex = (() => {
  const c = document.createElement("canvas"); c.width = 360; c.height = 520; const x = c.getContext("2d");
  x.fillStyle = "#16243d"; x.fillRect(0, 0, 360, 520);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(180, 210, 110, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(150, 160); x.lineTo(232, 210); x.lineTo(150, 260); x.closePath(); x.fill();
  x.fillStyle = "#efeee5"; x.fillRect(40, 380, 280, 34); x.fillRect(40, 432, 190, 26);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const cajaPeli = () => {
  const c = mesh(rbox(1.3, 1.85, 0.2, 0.05), M.navy3);
  const tapa = mesh(new THREE.PlaneGeometry(1.16, 1.7), new THREE.MeshStandardMaterial({ map: tapaTex, roughness: 0.5 }), 0, 0, 0.102);
  const lomo = mesh(rbox(0.08, 1.85, 0.21, 0.03), M.g, -0.62, 0, 0);
  return grupo(c, tapa, lomo);
};
const peliA = cajaPeli(), peliB = cajaPeli(); scene.add(peliA, peliB);
const peliSombraA = sombra(1.8, 0.7), peliSombraB = sombra(1.8, 0.7); scene.add(peliSombraA, peliSombraB);

// --- casa ---
const casa = (() => {
  const g = new THREE.Group();
  g.add(mesh(rbox(2.0, 1.5, 1.4, 0.05), M.cr, 0, 0.75, 0));
  const tri = new THREE.Shape(); tri.moveTo(-1.2, 0); tri.lineTo(1.2, 0); tri.lineTo(0, 1.0); tri.closePath();
  const techo = mesh(new THREE.ExtrudeGeometry(tri, { depth: 1.6, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2 }), M.navy3, 0, 1.5, -0.8);
  g.add(techo);
  g.add(mesh(rbox(0.5, 0.9, 0.06, 0.03), M.g, -0.45, 0.45, 0.7));
  const vent = new THREE.MeshStandardMaterial({ color: 0x2a2010, emissive: 0xffd9a0, emissiveIntensity: 0.9, roughness: 0.4 });
  g.add(mesh(rbox(0.7, 0.55, 0.06, 0.03), vent, 0.45, 0.85, 0.7));
  return g;
})();
scene.add(casa);
const casaSombra = sombra(3.2, 2.0); scene.add(casaSombra);

// --- celular con pantallas dibujadas una sola vez ---
const PW = 1.56, PH = 3.16;
const pantallas = {};
function lienzo(dibujar) {
  const c = document.createElement("canvas"); c.width = 720; c.height = 1458; const x = c.getContext("2d");
  dibujar(x); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const celMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.0 });
const cel = (() => {
  const cuerpo = mesh(rbox(PW + 0.1, PH + 0.1, 0.16, 0.2, 4), M.navy);
  const borde = mesh(rbox(PW + 0.16, PH + 0.16, 0.12, 0.22, 4), M.edge, 0, 0, -0.02);
  const pant = mesh(new THREE.PlaneGeometry(PW - 0.06, PH - 0.06), celMat, 0, 0, 0.082);
  const g = grupo(borde, cuerpo, pant); return g;
})();
scene.add(cel);
const celSombra = sombra(2.2, 0.9); scene.add(celSombra);

// --- caja de envío y tarjeta ---
const paquete = (() => {
  const g = new THREE.Group();
  g.add(mesh(rbox(1.1, 0.85, 0.9, 0.05), M.cr2));
  g.add(mesh(rbox(0.22, 0.87, 0.92, 0.03), M.g));
  g.add(mesh(rbox(1.12, 0.06, 0.2, 0.02), M.gd, 0, 0.42, 0));
  return g;
})();
scene.add(paquete);
const tarjeta = (() => {
  const g = new THREE.Group();
  g.add(mesh(rbox(1.7, 1.08, 0.06, 0.08), M.cr));
  g.add(mesh(rbox(1.7, 0.2, 0.065, 0.02), M.g, 0, 0.18, 0.001));
  g.add(mesh(rbox(0.3, 0.22, 0.07, 0.03), M.cr, -0.5, -0.15, 0.003));
  g.add(mesh(rbox(0.7, 0.08, 0.07, 0.03), M.cr2, 0.25, -0.36, 0.003));
  return g;
})();
scene.add(tarjeta);

// ================= PANTALLAS DEL CELULAR =================
async function dibujarPantallas() {
  await document.fonts.load('700 60px "Lexend"');
  await document.fonts.load('500 40px "IBM Plex Mono"');
  const logo = await new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = "assets/logo-blanco.png"; });
  const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
  const barra = (x, hora) => { x.fillStyle = "#efeee5"; x.font = F(600, 34); x.fillText(hora, 48, 66); x.fillRect(600, 44, 64, 26); };
  // 1) la tienda de noche
  pantallas.noche = lienzo((x) => {
    x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 720, 1458); barra(x, "23:40");
    x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Tienda", 48, 190);
    x.fillStyle = "#8ea0bf"; x.font = F(500, 34); x.fillText("Abierta ahora", 48, 244);
    const card = (X, Y, c) => { x.fillStyle = "#1f3254"; rr(x, X, Y, 300, 380, 34); x.fillStyle = c; rr(x, X + 30, Y + 30, 240, 200, 24); x.fillStyle = "#efeee5"; rr(x, X + 30, Y + 262, 180, 30, 12); x.fillStyle = "#5ce611"; rr(x, X + 30, Y + 312, 120, 34, 12); };
    card(48, 300, "#efeee5"); card(372, 300, "#5ce611"); card(48, 712, "#5ce611"); card(372, 712, "#d9d7c9");
    x.fillStyle = "#5ce611"; rr(x, 48, 1180, 624, 150, 40);
    x.fillStyle = "#0b1220"; x.font = F(800, 62); x.textAlign = "center"; x.fillText("Comprar", 360, 1278); x.textAlign = "left";
  });
  // 2) tu tienda online: producto, envío, pago
  pantallas.tienda = lienzo((x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 720, 1458);
    x.fillStyle = "#0b1220"; x.font = F(600, 34); x.fillText("21:15", 48, 66); x.fillRect(600, 44, 64, 26);
    x.font = F(800, 62); x.fillText("Tu tienda", 48, 186);
    x.fillStyle = "#16243d"; rr(x, 48, 236, 624, 500, 40); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(360, 486, 150, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(700, 48); x.fillText("Pedido listo", 48, 830);
    const fila = (Y, txt) => { x.fillStyle = "#ffffff"; rr(x, 48, Y, 624, 120, 30); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(118, Y + 60, 32, 0, Math.PI * 2); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 9; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(102, Y + 61); x.lineTo(114, Y + 73); x.lineTo(136, Y + 49); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(600, 40); x.fillText(txt, 178, Y + 74); };
    fila(880, "Envío a tu casa"); fila(1030, "Pago con Mercado Pago");
    x.fillStyle = "#0b1220"; rr(x, 48, 1220, 624, 140, 40); x.fillStyle = "#5ce611"; x.font = F(800, 56); x.textAlign = "center"; x.fillText("Pagar", 360, 1311); x.textAlign = "left";
  });
  // 3) la videollamada
  pantallas.llamada = lienzo((x) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, 720, 1458); barra(x, "10:00");
    x.fillStyle = "#16243d"; rr(x, 36, 110, 648, 760, 40);
    if (logo) { const w = 420, h = (logo.height / logo.width) * w; x.drawImage(logo, 360 - w / 2, 490 - h / 2, w, h); }
    x.fillStyle = "#1f3254"; rr(x, 36, 900, 648, 360, 40);
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(360, 1040, 70, 0, Math.PI * 2); x.fill(); rr(x, 250, 1120, 220, 110, 55);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(360, 1360, 62, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; rr(x, 330, 1338, 60, 44, 10);
  });
  celMat.map = pantallas.noche; celMat.emissiveMap = pantallas.noche; celMat.needsUpdate = true;
}

// 4) "¿tu negocio está ahí?": la búsqueda que no te encuentra
async function pantallaVacia() {
  const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
  pantallas.vacio = lienzo((x) => {
    x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 720, 1458);
    x.fillStyle = "#efeee5"; x.font = F(600, 34); x.fillText("23:41", 48, 66); x.fillRect(600, 44, 64, 26);
    x.fillStyle = "#efeee5"; rr(x, 48, 130, 624, 120, 60);
    x.strokeStyle = "#0b1220"; x.lineWidth = 9; x.beginPath(); x.arc(122, 184, 24, 0, Math.PI * 2); x.stroke();
    x.beginPath(); x.moveTo(140, 202); x.lineTo(158, 220); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(600, 42); x.fillText("tu negocio", 186, 204);
    x.fillStyle = "#1f3254"; rr(x, 48, 330, 624, 520, 40);
    x.strokeStyle = "#7d8597"; x.lineWidth = 14; x.lineCap = "round";
    x.beginPath(); x.arc(360, 560, 110, 0, Math.PI * 2); x.stroke();
    x.beginPath(); x.moveTo(300, 500); x.lineTo(420, 620); x.moveTo(420, 500); x.lineTo(300, 620); x.stroke();
    x.fillStyle = "#efeee5"; x.font = F(800, 62); x.textAlign = "center"; x.fillText("Sin resultados", 360, 970);
    x.fillStyle = "#8ea0bf"; x.font = F(500, 38); x.fillText("No encontramos tu tienda", 360, 1040); x.textAlign = "left";
    x.fillStyle = "#1f3254"; rr(x, 48, 1130, 624, 110, 30); rr(x, 48, 1270, 624, 110, 30);
  });
}

// ================= CÁMARA =================
// claves [t, x, y, z, mirarX, mirarY, mirarZ]; dos claves pegadas = corte seco
const CAM = [
  [0, 0, 0, 12.6, 0, 0, 0],
  [W[5], 0, 0, 12.1, 0, 0, 0],
  [W[5] + 0.3, 0, 0, 11.5, 0, 0, 0],
  [S["s02-no"] - 0.01, 0, 0, 11.3, 0, 0, 0],
  [S["s02-no"], 0, 0, 11.6, 0, 0, 0],
  [W[11] + 0.05, 0, 0, 11.6, 0, 0, 0],
  [W[11] + 0.2, 0, -0.08, 11.2, 0, -0.08, 0], // el golpe del sello
  [S["s03-quiebra"] - 0.01, 0, 0, 11.1, 0, 0, 0],
  [S["s03-quiebra"], 0, 0.2, 12.8, 0, 0.2, 0],
  [S["s04-porque"] - 0.01, 0, 0.2, 11.8, 0, 0.2, 0],
  [S["s04-porque"], 0, 0.2, 11.8, 0, 0.2, 0],
  [S["s04-porque"] + 0.14, 0, -0.45, 7.6, 0, -0.45, 0], // zoom de golpe a la persiana
  [S["s05-casa"] - 0.01, 0, -0.45, 7.2, 0, -0.45, 0],
  [S["s05-casa"], 0, 0, 12.8, 0, 0, 0],
  [S["s06-sin"] - 0.01, 0, 0, 11.8, 0, 0, 0],
  [S["s06-sin"], 0, 0.2, 12.4, 0, 0.2, 0],
  [W[31] - 0.01, 0, 0.2, 11.9, 0, 0.2, 0],
  [W[31], 0, 0, 11.6, 0, 0, 0],
  [S["s07-mismas"] - 0.01, 0, 0, 11.0, 0, 0, 0],
  [S["s07-mismas"], 0, 0, 12.6, 0, 0, 0],
  [S["s08-forma"] - 0.01, 0, 0, 11.9, 0, 0, 0],
  [S["s08-forma"], 0, 0, 12.2, 0, 0, 0],
  [S["s09-celular"] - 0.01, 0, 0, 11.5, 0, 0, 0],
  [S["s09-celular"], 0, 0, 11.8, 0, 0, 0],
  [S["s09-celular"] + 0.6, 0, 0, 10.7, 0, 0, 0],
  [S["s10-ahi"] - 0.01, 0, 0, 10.4, 0, 0, 0],
  [S["s10-ahi"], 0, 0, 10.2, 0, 0, 0],
  [S["s11-tienda"] - 0.01, 0, 0, 10.0, 0, 0, 0],
  [S["s11-tienda"], 0, 0, 10.8, 0, 0, 0],
  [S["s12-llamada"] - 0.01, 0, 0, 10.3, 0, 0, 0],
  [S["s12-llamada"], 0, 0, 10.6, 0, 0, 0],
  [DUR, 0, 0, 10.4, 0, 0, 0],
];
const _mira = new THREE.Vector3();
function ponerCamara(t) {
  let k = 0; while (k + 1 < CAM.length - 1 && CAM[k + 1][0] <= t) k++;
  const a = CAM[k], b = CAM[k + 1];
  const x = eio(sg(t, a[0], b[0]));
  camera.position.set(lerp(a[1], b[1], x), lerp(a[2], b[2], x), lerp(a[3], b[3], x));
  _mira.set(lerp(a[4], b[4], x), lerp(a[5], b[5], x), lerp(a[6], b[6], x));
  camera.position.x += Math.sin(t * 0.7) * 0.06; camera.position.y += Math.sin(t * 0.53) * 0.03;
  camera.lookAt(_mira);
}

// ================= ESCENA EN EL TIEMPO =================
const PISO = -1.55;
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
function apoyar(som, x, z, s, op = 1, y = PISO) { som.visible = s > 0.002; if (!som.visible) return; som.position.set(x, y + 0.005, z); som.scale.setScalar(Math.max(0.001, s)); som.material.opacity = op * cl(s); }
const en = (t, a, b) => t >= a && t < b; // dentro de la escena [a, b)
const AZUL = new THREE.Color(C.g), ROJO = new THREE.Color(C.red);

function renderAt(t) {
  scene.environmentRotation.y = t * 0.12;
  ponerCamara(t);

  // ---- etiqueta US$50M: gancho (cuadro 0 ya entera) y el NO ----
  {
    let s = 0, y = -0.42, rz = Math.sin(t * 1.1) * 0.03, gris = 0;
    if (t < S["s03-quiebra"]) {
      s = 1.05 * (1 + 0.1 * Math.sin(Math.PI * sg(t, W[5], W[5] + 0.35)));
      const d = Math.max(0, t - W[5]); if (t > W[5]) rz += Math.sin(d * 3.2) * 0.1 * Math.exp(-d * 1.4);
      gris = eio(sg(t, W[11] + 0.1, W[11] + 0.45));
      rz += -0.26 * gris; y -= 0.28 * gris;
    }
    ocultar(etiqueta, s); etiqueta.position.set(0, y, 0.2); etiqueta.rotation.set(0.1, Math.sin(t * 0.8) * 0.16, rz);
    etiqueta.userData.base.color.set(C.cr).lerp(new THREE.Color(C.gris), gris * 0.75);
    apoyar(etiquetaSombra, 0, 0.2, s, 0.8, -1.4);
  }

  // ---- el año: 2000 rueda hasta 2010 y se pone rojo ----
  {
    let s = 0;
    if (en(t, S["s03-quiebra"], S["s04-porque"] + 0.12)) s = 0.9 * bk(sg(t, S["s03-quiebra"], S["s03-quiebra"] + 0.3)) * (1 - sg(t, S["s04-porque"], S["s04-porque"] + 0.12));
    ponerAnio(t, 0, 1.27, 0, s, Math.sin(t * 0.6) * 0.12);
    M.anio.color.copy(AZUL).lerp(ROJO, eio(sg(t, W[13], W[15] + 0.2)));
    anioSombra.visible = false;
  }

  // ---- local con persiana: quiebra, ¿por qué? y "sin ir al local" ----
  {
    let s = 0, baja = 1;
    if (en(t, S["s03-quiebra"], S["s05-casa"])) { s = 0.8 * bk(sg(t, S["s03-quiebra"] - 0.05, S["s03-quiebra"] + 0.3)); baja = eio(sg(t, W[12] + 0.25, W[15] + 0.25)); }
    if (en(t, S["s06-sin"], W[31] - 0.03)) { s = 0.8 * bk(sg(t, S["s06-sin"] - 0.05, S["s06-sin"] + 0.3)); baja = 1; }
    const y = -0.55;
    ocultar(local, s); local.position.set(0, y, 0); local.rotation.set(0, Math.sin(t * 0.5) * 0.06, 0);
    const tab = local.userData.tab;
    tab.forEach((m, i) => { const vis = baja * tab.length - i; m.visible = vis > 0; m.scale.y = cl(vis); m.position.y = 0.5 - i * 0.155 + (1 - cl(vis)) * 0.1; });
    vidrioMat.emissiveIntensity = t < S["s04-porque"] ? lerp(2.6, 0.15, eio(sg(t, S["s03-quiebra"], W[15] + 0.3))) : 0.15;
    apoyar(localSombra, 0, 0, s, 0.9, y - 1.6 * Math.max(s, 0.001));
  }

  // ---- casa + la película que entra por la ventana ----
  {
    const on = en(t, S["s05-casa"], S["s06-sin"]);
    const s = on ? 0.98 * bk(sg(t, S["s05-casa"] - 0.05, S["s05-casa"] + 0.4)) : 0;
    ocultar(casa, s); casa.position.set(0, -1.75, 0); casa.rotation.set(0, 0.42 + Math.sin(t * 0.6) * 0.1, 0);
    apoyar(casaSombra, 0, 0, s, 0.8, -1.75);
  }

  // ---- cajas de película: casa, "las mismas", y la que se va en el sobre ----
  {
    let sA = 0, sB = 0, xA = 0, xB = 0, yA = -0.55, zA = 0, ryA = Math.sin(t * 0.9) * 0.35;
    if (en(t, W[21] - 0.1, S["s06-sin"])) {
      // "elegir la película": aparece arriba a la derecha y entra a la casa con "desde tu casa"
      const entra = eio(sg(t, W[24], W[26] + 0.25));
      sA = 0.6 * bk(sg(t, W[21] - 0.1, W[21] + 0.3)) * (1 - entra * 0.9);
      xA = lerp(0.78, 0.4, entra); yA = lerp(1.0, -0.85, entra); zA = 1.0; ryA = lerp(Math.sin(t * 1.6) * 0.5, 0, entra);
    }
    if (en(t, S["s07-mismas"], S["s08-forma"])) {
      const abre = eio(sg(t, S["s07-mismas"], S["s07-mismas"] + 0.4));
      sA = 1.05 * bk(sg(t, S["s07-mismas"] - 0.05, S["s07-mismas"] + 0.3)); sB = sA * cl(abre * 1.4);
      xA = lerp(0, -0.9, abre); xB = lerp(0, 0.9, abre);
    }
    if (en(t, S["s08-forma"], W[41] + 0.1)) {
      // se juntan, una sola, y baja adentro del sobre
      const j = eio(sg(t, S["s08-forma"], S["s08-forma"] + 0.3));
      const baja = eio(sg(t, W[40] - 0.1, W[41] + 0.1));
      sA = lerp(1.05, 0.62, j) * (1 - baja); sB = (1 - j) * 1.05;
      xA = lerp(-0.9, 0, j); xB = lerp(0.9, 0, j); yA = lerp(lerp(-0.55, 0.55, j), -0.6, baja); zA = 0.3 * j;
    }
    ocultar(peliA, sA); ocultar(peliB, sB);
    peliA.position.set(xA, yA, zA); peliB.position.set(xB, -0.55, 0);
    peliA.rotation.set(-0.05, ryA, 0); peliB.rotation.set(-0.05, Math.sin(t * 0.9) * 0.35, 0);
    const conPiso = en(t, S["s07-mismas"], S["s08-forma"]);
    apoyar(peliSombraA, xA, 0, conPiso ? sA * 0.9 : 0, 0.8); apoyar(peliSombraB, xB, 0, conPiso ? sB * 0.9 : 0, 0.8);
  }

  // ---- sobre: la nueva forma de comprar llega a tu casa ----
  {
    let s = 0, x = 0, y = -0.6, rz = 0, ry = Math.sin(t * 0.7) * 0.12;
    if (en(t, S["s08-forma"], S["s09-celular"])) {
      s = bk(sg(t, S["s08-forma"] + 0.05, S["s08-forma"] + 0.45));
      const cierra = eio(sg(t, W[41], W[42] + 0.15));
      sobre.userData.bis.rotation.x = -Math.PI * 0.92 * (1 - cierra);
      const vuela = eio(sg(t, W[42] + 0.3, S["s09-celular"]));
      x = lerp(0, 3.2, vuela); y = lerp(-0.6, 0.3, vuela); rz = lerp(0, 0.35, vuela);
    }
    ocultar(sobre, s); sobre.position.set(x, y, 0); sobre.rotation.set(-0.08, ry, rz);
    apoyar(sobreSombra, x, 0, s * (x < 0.5 ? 1 : 0), 0.7);
  }

  // ---- multa (cae) y tilde ----
  {
    const on = en(t, W[31] - 0.03, S["s07-mismas"]);
    const cae = eio(sg(t, W[32] + 0.1, W[32] + 0.5));
    const s = on ? 1.3 * bk(sg(t, W[31] - 0.03, W[31] + 0.3)) * (1 - cae * 0.4) : 0;
    ocultar(multa, cae >= 1 ? 0 : s); multa.position.set(0, -0.3 - cae * 2.4, 0.4); multa.rotation.set(0.15 + cae * 1.4, Math.sin(t) * 0.15, -0.12 + cae * 1.0);
    const st = on ? 1.12 * bk(sg(t, W[32] + 0.25, W[32] + 0.7)) : 0;
    ocultar(tilde, st); tilde.position.set(0, -0.2, 0.5); tilde.rotation.set(0.1, Math.sin(t * 1.2) * 0.3, 0);
  }

  // ---- celular: llena la pantalla del 17,8 al final ----
  {
    let s = 0, y = -0.48, ry = Math.sin(t * 0.7) * 0.12;
    if (t >= S["s09-celular"]) {
      const sube = eio(sg(t, S["s09-celular"], S["s09-celular"] + 0.45));
      s = 1.02 * bk(sg(t, S["s09-celular"], S["s09-celular"] + 0.45));
      y = lerp(-2.6, -0.48, sube); ry += lerp(0.7, 0, sube);
      // "¿tu negocio está ahí?": golpe
      s *= 1 + 0.05 * Math.sin(Math.PI * sg(t, S["s10-ahi"], S["s10-ahi"] + 0.25));
      // tienda: da una vuelta y cambia la pantalla
      ry += Math.PI * 2 * eio(sg(t, S["s11-tienda"], S["s11-tienda"] + 0.6));
      // cierre: un poco más abajo para dejar lugar al texto
      const cta = eio(sg(t, S["s12-llamada"], S["s12-llamada"] + 0.4));
      y = lerp(y, -0.64, cta); s *= lerp(1, 0.97, cta);
    }
    ocultar(cel, s); cel.position.set(0, y, 0.3); cel.rotation.set(-0.04, ry, 0);
    const tex = t >= S["s12-llamada"] ? pantallas.llamada : t >= S["s11-tienda"] + 0.3 ? pantallas.tienda : t >= S["s10-ahi"] ? pantallas.vacio : pantallas.noche;
    if (tex && celMat.map !== tex) { celMat.map = tex; celMat.emissiveMap = tex; celMat.needsUpdate = true; }
    celMat.emissiveIntensity = 0.75;
    apoyar(celSombra, 0, 0.3, s, 0.6, y - 1.62 * s);
  }

  // ---- paquete y tarjeta a los costados de la tienda ----
  {
    const on = en(t, S["s11-tienda"], S["s12-llamada"]);
    const sp = on ? 0.5 * bk(sg(t, W[58] - 0.05, W[58] + 0.4)) : 0;
    ocultar(paquete, sp); paquete.position.set(1.0, -1.62, 0.9); paquete.rotation.set(0.2, -0.6 + Math.sin(t) * 0.2, 0.05);
    const st = on ? 0.5 * bk(sg(t, W[58] + 0.1, W[58] + 0.55)) : 0;
    ocultar(tarjeta, st); tarjeta.position.set(-0.95, -1.5, 0.9); tarjeta.rotation.set(0.1, 0.25 + Math.sin(t * 1.1) * 0.2, -0.15);
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
dibujarPantallas().then(pantallaVacia).then(() => {
  renderAt(window.__hfThreeTime || 0);
  if (window.__tresListo) window.__tresListo();
});
