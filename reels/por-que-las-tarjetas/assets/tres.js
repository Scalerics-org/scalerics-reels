// Capa 3D de por-que-las-tarjetas (Three.js r170 local). Base técnica: reels/por-que-devolver-gratis (luces, entorno
// PMREM, cámara por claves con Hermite monótona, nube de pensamiento, "?" verde) y los personajes de reels/anotamelo
// (assets/personajes.js: Rubén = ELENCO.almacenero, Walter = ELENCO.walter, mate, yerba, papelito, almanaque).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Fondo NAVY OSCURO liso (#0b1220, lo pone el HTML): el canvas es transparente y el piso solo muestra sombras.
// Zonas (x):
//   A (0..50):  la calle de noche: casas, buzones con banderita, el auto VENDIDO del gancho, la concesionaria (s01-s03).
//   L (90):     el estacionamiento en grilla con "1.425" y "1973" (s04); en su pasillo, EL SOBRE solo (s05) y ahí
//               mismo la tarjeta, el abanico y el megáfono (s06-s08), con los autos ya fuera de cuadro.
//   R (200):    el almacén de Rubén, sábado a la mañana (s09-s11, s13-s14).
//   W (240):    la casa de Walter (s12).
//   F (280):    el cierre verde con la tarjeta chica y el tilde (s15).
// LA TARJETA (cartulina crema con borde verde grueso, "I like you" adentro) es el hilo: sale del sobre, se abre, vuela
// al mostrador de Rubén y vuelve con la misma forma como el mensaje que le llega a Walter y en cada fila de la lista.
// Joe Girard NO se dibuja: solo su firma escrita en la tarjeta. Autos sin escudo ni marca.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND_T from "./vendor/three/lexend800t.js"; // subconjunto propio: 0-9 . , ? d í a s (partes/fuente3d.py)
import { crearPersonaje, ELENCO, poseEn, CARA, crearMate, crearTermo, crearYerba, crearFideos, crearGalletitas, crearDulceDeLeche, crearPapelito, crearAlmanaque } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
import { BOCA } from "./boca.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"'), document.fonts.load('500 60px "IBM Plex Mono"')]);

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const ei = (x) => x * x * x;
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
const rebote = (t, a, k = 10, f = 26, amp = 1) => (t > a ? Math.exp(-(t - a) * k) * Math.sin((t - a) * f) * amp : 0);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (A, B, u) => V(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E;
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
  env.background = new THREE.Color(0x5a5f6a);
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
scene.environmentIntensity = 0.75;

const OA = V(0, 0, 0), OL = V(66, 0, 0), OR = V(200, 0, 0), OW = V(240, 0, 0), OF = V(280, 0, 0);
const key = new THREE.DirectionalLight(0xfff0dc, 1.6); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.3); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x3a4664, 1.2); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.6);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.normalBias = 0.02; sol.shadow.radius = 5;
scene.add(sol, sol.target);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, madera: 0xdcbb92, cromo: 0xb8bcc4 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.14 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.45), red: mat(C.red, 0.6),
  white: mat(C.white, 0.42), tilde: mat(C.navy, 0.45), gris: mat(C.gris, 0.55), madera: mat(C.madera, 0.55),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.max(0.0005, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001)));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", ${fam === "Lexend" ? "sans-serif" : fam === "Caveat" ? "cursive" : "monospace"}`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
function texViva(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { c, t, x: c.getContext("2d"), clave: "" }; }
const ajustar = (x, txt, peso, px, ancho, fam) => { let s = px; x.font = F(peso, s, fam); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s, fam); } return s; };
const sh = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const fontT = new FontLoader().parse(LEXEND_T);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font: fontT, size, depth, curveSegments: 10, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
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
function hacerTilde(r = 0.17, padre = scene) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, M.g); d.scale.set(r, r, r * 0.35); g.add(d);
  const bd = mesh(new THREE.TorusGeometry(1, 0.09, 8, 40), M.navy); bd.scale.set(r, r, r); g.add(bd);
  const tk = mesh(tickGeo, M.tilde, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  sh(g); padre.add(g); return g;
}
const NAV = "#16243d", NAV3 = "#1f3254", CRE = "#efeee5", CRE2 = "#d9d7c9", VER = "#5ce611", VERD = "#3fa60a", NAV0 = "#0b1220", ROJ = "#c7655b", GRI = "#8e8c80";
function pisoSombra(x, z, w = 10, d = 10, op = 0.45) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.ShadowMaterial({ opacity: op, color: 0x0b1220 }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, 0.001, z); m.receiveShadow = true; scene.add(m); return m;
}
// rectángulo de esquinas redondeadas (ShapeGeometry con UV 0..1)
function planoRedondo(w, h, r) {
  const s = new THREE.Shape(); const x0 = -w / 2, y0 = -h / 2;
  s.moveTo(x0 + r, y0); s.lineTo(x0 + w - r, y0); s.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + r); s.lineTo(x0 + w, y0 + h - r); s.quadraticCurveTo(x0 + w, y0 + h, x0 + w - r, y0 + h);
  s.lineTo(x0 + r, y0 + h); s.quadraticCurveTo(x0, y0 + h, x0, y0 + h - r); s.lineTo(x0, y0 + r); s.quadraticCurveTo(x0, y0, x0 + r, y0);
  return s;
}
function geoRedondo(w, h, r) {
  const g = new THREE.ShapeGeometry(planoRedondo(w, h, r), 6);
  const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
  return g;
}
// una hoja de cartulina con canto (extrusión) y dos caras con textura
function hojaRedonda(w, h, th, r, frente, dorso, canto) {
  const g = new THREE.Group();
  const ex = new THREE.ExtrudeGeometry(planoRedondo(w, h, r), { depth: th, bevelEnabled: false, curveSegments: 6 }); ex.translate(0, 0, -th / 2);
  g.add(mesh(ex, [canto, canto]));
  const fg = geoRedondo(w, h, r);
  const a = mesh(fg, frente, 0, 0, th / 2 + 0.0006); g.add(a);
  const b = mesh(fg, dorso, 0, 0, -th / 2 - 0.0006); b.rotation.y = Math.PI; b.scale.x = 1; g.add(b);
  g.userData = { frente: a, dorso: b };
  return g;
}
const matTex = (t, k = 0.2) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.75, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: k });

// ================= DIBUJOS DE LA FECHA (frente de cada tarjeta, planos, en la paleta) =================
function motivo(x, n, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.lineJoin = "round"; x.lineCap = "round";
  const borde = () => { x.lineWidth = 14; x.strokeStyle = NAV0; x.stroke(); };
  const relleno = (c) => { x.fillStyle = c; x.fill(); borde(); };
  const P = (pts) => { x.beginPath(); pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.closePath(); };
  switch (n % 12) {
    case 0: // corazón grande
      x.beginPath(); x.moveTo(0, 190); x.bezierCurveTo(-260, 20, -190, -215, 0, -90); x.bezierCurveTo(190, -215, 260, 20, 0, 190); relleno(VER); break;
    case 1: // regalo con moño
      x.beginPath(); x.rect(-150, -60, 300, 220); relleno(VER); x.beginPath(); x.rect(-30, -60, 60, 220); relleno(CRE2);
      x.beginPath(); x.ellipse(-55, -100, 60, 36, -0.4, 0, 7); relleno(CRE2); x.beginPath(); x.ellipse(55, -100, 60, 36, 0.4, 0, 7); relleno(CRE2); break;
    case 2: // calabaza
      for (const [dx, r] of [[-80, 95], [80, 95], [0, 110]]) { x.beginPath(); x.ellipse(dx, 30, r, 140, 0, 0, 7); relleno(CRE2); }
      x.beginPath(); x.rect(-18, -150, 36, 60); relleno(VER); break;
    case 3: // árbol
      P([[0, -200], [130, -40], [60, -40], [170, 110], [-170, 110], [-60, -40], [-130, -40]]); relleno(VER);
      x.beginPath(); x.rect(-30, 110, 60, 70); relleno(CRE2); break;
    case 4: { // estrella
      const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 80 : 190; pts.push([Math.cos(a) * r, Math.sin(a) * r + 10]); } P(pts); relleno(VER); break; }
    case 5: // trébol
      for (const [dx, dy] of [[0, -85], [-85, 5], [85, 5]]) { x.beginPath(); x.arc(dx, dy, 78, 0, 7); relleno(VER); }
      x.beginPath(); x.moveTo(0, 40); x.quadraticCurveTo(20, 140, 60, 190); x.lineWidth = 22; x.strokeStyle = NAV0; x.stroke(); break;
    case 6: // torta con una vela
      x.beginPath(); x.rect(-160, -20, 320, 180); relleno(CRE2); x.beginPath(); x.rect(-160, -20, 320, 60); relleno(VER);
      x.beginPath(); x.rect(-14, -130, 28, 110); relleno(CRE); x.beginPath(); x.ellipse(0, -165, 22, 34, 0, 0, 7); relleno(VER); break;
    case 7: // sol
      for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6; x.beginPath(); x.moveTo(Math.cos(a) * 125, Math.sin(a) * 125); x.lineTo(Math.cos(a) * 195, Math.sin(a) * 195); x.lineWidth = 26; x.strokeStyle = NAV0; x.stroke(); }
      x.beginPath(); x.arc(0, 0, 105, 0, 7); relleno(VER); break;
    case 8: // copo
      for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 190, Math.sin(a) * 190); x.lineWidth = 30; x.strokeStyle = VERD; x.stroke(); x.lineWidth = 12; x.strokeStyle = NAV0; x.stroke(); }
      x.beginPath(); x.arc(0, 0, 40, 0, 7); relleno(VER); break;
    case 9: // flor
      for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3; x.beginPath(); x.ellipse(Math.cos(a) * 95, Math.sin(a) * 95, 70, 50, a, 0, 7); relleno(CRE2); }
      x.beginPath(); x.arc(0, 0, 62, 0, 7); relleno(VER); break;
    case 10: // campana
      x.beginPath(); x.moveTo(-150, 120); x.quadraticCurveTo(-120, 90, -110, -20); x.quadraticCurveTo(-100, -170, 0, -170); x.quadraticCurveTo(100, -170, 110, -20); x.quadraticCurveTo(120, 90, 150, 120); x.closePath(); relleno(VER);
      x.beginPath(); x.arc(0, 150, 36, 0, 7); relleno(CRE2); break;
    default: // globo
      x.beginPath(); x.ellipse(0, -40, 130, 160, 0, 0, 7); relleno(VER);
      x.beginPath(); x.moveTo(0, 120); x.quadraticCurveTo(-40, 170, 10, 220); x.lineWidth = 10; x.strokeStyle = NAV0; x.stroke(); break;
  }
  x.restore();
}
const TW = 700, TH = 1000; // textura de la tarjeta
const bordeTarjeta = (x, w, h) => { x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.lineWidth = 64; x.strokeStyle = VER; x.beginPath(); x.roundRect(32, 32, w - 64, h - 64, 52); x.stroke(); x.lineWidth = 10; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(70, 70, w - 140, h - 140, 30); x.stroke(); };
const texFrente = [];
for (let n = 0; n < 12; n++) texFrente.push(tex(TW, TH, (x, w, h) => { bordeTarjeta(x, w, h); motivo(x, n, w / 2, h * 0.5, 1.35); }));
const texAdentroIzq = tex(TW, TH, (x, w, h) => { x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.lineWidth = 64; x.strokeStyle = VER; x.beginPath(); x.roundRect(32, 32, w - 64, h - 64, 52); x.stroke(); });
const texAdentro = tex(TW, TH, (x, w, h) => {
  x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.lineWidth = 64; x.strokeStyle = VER; x.beginPath(); x.roundRect(32, 32, w - 64, h - 64, 52); x.stroke();
  x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle";
  x.save(); x.translate(w / 2, h * 0.36); x.rotate(-0.06); x.font = F(700, 200, "Caveat"); x.fillText("I like", 0, -95); x.fillText("you", 0, 95); x.restore();
  x.save(); x.translate(w / 2 + 20, h * 0.74); x.rotate(-0.04); ajustar(x, "Joe Girard", 700, 116, w - 200, "Caveat"); x.fillText("Joe Girard", 0, 0);
  x.lineWidth = 7; x.strokeStyle = NAV0; x.beginPath(); x.moveTo(-210, 62); x.quadraticCurveTo(0, 82, 230, 48); x.stroke(); x.restore();
});
// el mensaje del sistema (s12) con LA MISMA forma de la tarjeta
const texMensaje = tex(TW, TH, (x, w, h) => {
  bordeTarjeta(x, w, h);
  x.fillStyle = NAV0; x.textAlign = "left"; x.textBaseline = "alphabetic";
  const L = ["Walter,", "¿todo bien?", "Hace rato que", "no te vemos.", "Acá estamos."];
  L.forEach((l, i) => { ajustar(x, l, i < 2 ? 900 : 700, i < 2 ? 84 : 70, w - 230); x.fillText(l, 112, 230 + i * 104 + (i >= 2 ? 26 : 0)); });
  // firma con un mate dibujado
  x.save(); x.translate(160, 830); x.fillStyle = "#6b3f22"; x.beginPath(); x.ellipse(0, 0, 44, 52, 0, 0, 7); x.fill(); x.lineWidth = 8; x.strokeStyle = NAV0; x.stroke();
  x.fillStyle = "#6f8a2c"; x.fillRect(-34, -50, 68, 12); x.strokeStyle = "#c9ccd2"; x.lineWidth = 10; x.beginPath(); x.moveTo(8, -40); x.lineTo(40, -100); x.stroke(); x.restore();
  x.fillStyle = NAV0; x.font = F(800, 54); x.fillText("Almacén", 230, 812); x.fillText("de Rubén", 230, 870);
});
const texDorso = tex(TW, TH, (x, w, h) => { x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.lineWidth = 64; x.strokeStyle = VER; x.beginPath(); x.roundRect(32, 32, w - 64, h - 64, 52); x.stroke(); });

// ================= LA TARJETA (dos hojas con bisagra en el lomo izquierdo) =================
const TJ = { W: 0.7, H: 1.0, th: 0.014, r: 0.06 };
const cantoTarjeta = mat(C.g, 0.5, { emissive: C.g, emissiveIntensity: 0.1 });
const MT = { adentro: matTex(texAdentro, 0.25), izq: matTex(texAdentroIzq, 0.2), dorso: matTex(texDorso, 0.2), msj: matTex(texMensaje, 0.25) };
const MF = texFrente.map((t) => matTex(t, 0.22));
function hacerTarjeta(n = 0, { mensaje = false } = {}) {
  const g = new THREE.Group();
  const libro = new THREE.Group(); g.add(libro); // se corre a la derecha al abrir para que quede centrada
  const atras = hojaRedonda(TJ.W, TJ.H, TJ.th, TJ.r, mensaje ? MT.msj : MT.adentro, MT.dorso, cantoTarjeta); atras.position.set(TJ.W / 2, 0, 0); libro.add(atras);
  const piv = new THREE.Group(); piv.position.set(0, 0, TJ.th + 0.004); libro.add(piv);
  const tapa = hojaRedonda(TJ.W, TJ.H, TJ.th, TJ.r, mensaje ? MT.msj : MF[n], MT.izq, cantoTarjeta); tapa.position.set(TJ.W / 2, 0, 0); piv.add(tapa);
  libro.position.x = -TJ.W / 2;
  sh(g);
  g.userData = { libro, piv, tapa, atras, n };
  return g;
}
// u 0 cerrada .. 1 abierta (la tapa gira hacia cámara y queda a la izquierda)
function abrirTarjeta(g, u) {
  const { libro, piv } = g.userData;
  piv.rotation.y = -Math.PI * 0.985 * u;
  libro.position.x = -TJ.W / 2 + (TJ.W / 2) * eio(u);
  piv.position.z = TJ.th + 0.004 + Math.sin(Math.PI * u) * 0.01;
}
function frenteTarjeta(g, n) { if (g.userData.n === n) return; g.userData.n = n; g.userData.tapa.userData.frente.material = MF[n % 12]; }

// ================= EL SOBRE (frente con estampilla; dorso con la solapa articulada) =================
const SB = { W: 0.24, H: 0.16, th: 0.006 };
const texSobreFrente = tex(720, 480, (x, w, h) => {
  x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.lineWidth = 18; x.strokeStyle = NAV0; x.strokeRect(9, 9, w - 18, h - 18);
  // estampilla verde dentada con tilde crema
  const X = w - 190, Y = 40, S = 140;
  x.fillStyle = VER; x.fillRect(X, Y, S, S * 1.15);
  x.fillStyle = CRE; for (let i = 0; i <= 7; i++) { x.beginPath(); x.arc(X + (i * S) / 7, Y, 9, 0, 7); x.arc(X + (i * S) / 7, Y + S * 1.15, 9, 0, 7); x.fill(); }
  for (let i = 0; i <= 8; i++) { x.beginPath(); x.arc(X, Y + (i * S * 1.15) / 8, 9, 0, 7); x.arc(X + S, Y + (i * S * 1.15) / 8, 9, 0, 7); x.fill(); }
  x.strokeStyle = CRE; x.lineWidth = 20; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(X + 34, Y + 86); x.lineTo(X + 62, Y + 116); x.lineTo(X + 110, Y + 50); x.stroke();
  // renglones de la dirección (sin texto legible)
  x.fillStyle = NAV3; for (let i = 0; i < 3; i++) rr(x, 150, 250 + i * 60, 380 - i * 70, 22, 11);
});
const texSobreDorso = tex(720, 480, (x, w, h) => {
  x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.lineWidth = 18; x.strokeStyle = NAV0; x.strokeRect(9, 9, w - 18, h - 18);
  x.lineWidth = 12; x.beginPath(); x.moveTo(12, h - 12); x.lineTo(w * 0.5, h * 0.48); x.lineTo(w - 12, h - 12); x.stroke();
});
const texSolapa = tex(720, 300, (x, w, h) => {
  x.fillStyle = CRE2; x.fillRect(0, 0, w, h); x.lineWidth = 16; x.strokeStyle = NAV0; x.beginPath(); x.moveTo(0, 0); x.lineTo(w / 2, h); x.lineTo(w, 0); x.stroke();
});
function hacerSobre() {
  const g = new THREE.Group();
  const cuerpo = mesh(new THREE.BoxGeometry(SB.W, SB.H, SB.th), [M.cr, M.cr, M.cr, M.cr, matTex(texSobreFrente, 0.2), matTex(texSobreDorso, 0.2)]); g.add(cuerpo);
  const piv = new THREE.Group(); piv.position.set(0, SB.H / 2, -SB.th / 2 - 0.0008); g.add(piv);
  const sh0 = new THREE.Shape(); sh0.moveTo(-SB.W / 2, 0); sh0.lineTo(SB.W / 2, 0); sh0.lineTo(0, -SB.H * 0.62); sh0.closePath();
  const sg0 = new THREE.ShapeGeometry(sh0); const p = sg0.attributes.position, uv = sg0.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + SB.W / 2) / SB.W, 1 + p.getY(i) / (SB.H * 0.62));
  const solM = new THREE.MeshStandardMaterial({ map: texSolapa, roughness: 0.75, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: texSolapa, emissiveIntensity: 0.15 });
  const sol0 = mesh(sg0, solM); sol0.rotation.y = Math.PI; piv.add(sol0);
  sh(g);
  g.userData = { piv };
  return g;
}
const abrirSobre = (g, u) => { g.userData.piv.rotation.x = 2.7 * u; };

// ================= EL AUTO DE LOS 70 (sedán genérico, sin escudo ni marca) =================
// Partes en el espacio del auto (frente hacia +x, techo hacia +y, largo 5,0). Se usan sueltas (el auto del gancho) o
// instanciadas (la flota de la calle y la del estacionamiento).
const AM = {
  cuerpo: mat(C.cr, 0.42), techo: mat(0x2c4268, 0.45), cromo: mat(C.cromo, 0.32, { metalness: 0.35 }), vidrio: mat(0x1a2a46, 0.12, { metalness: 0.2 }),
  goma: mat(0x0b1220, 0.8), taza: mat(C.cr2, 0.4), faro: mat(0xfff3d6, 0.3, { emissive: 0xfff0c8, emissiveIntensity: 0.6 }), trasera: mat(C.red, 0.4, { emissive: C.red, emissiveIntensity: 0.25 }),
};
const AUTO = (() => {
  const L = 5.0, Wd = 1.9, P = [];
  const add = (geo, m, x, y, z, rx = 0, ry = 0, rz = 0) => P.push({ geo, m, mx: new THREE.Matrix4().compose(V(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), V(1, 1, 1)) });
  add(rbox(L, 0.6, Wd, 0.14), "cuerpo", 0, 0.66, 0);
  add(rbox(L * 0.97, 0.06, Wd + 0.02, 0.02, 1), "techo", 0, 0.76, 0); // filete de cintura
  add(rbox(2.35, 0.5, Wd * 0.84, 0.12), "vidrio", -0.3, 1.18, 0);
  add(rbox(2.5, 0.09, Wd * 0.9, 0.045), "techo", -0.3, 1.45, 0);
  add(rbox(0.12, 0.5, Wd * 0.86, 0.03, 1), "techo", -0.25, 1.18, 0); // parante del medio
  add(rbox(0.16, 0.46, Wd * 0.86, 0.03, 1), "techo", 0.8, 1.16, 0); // parante del parabrisas
  add(rbox(0.16, 0.46, Wd * 0.86, 0.03, 1), "techo", -1.42, 1.16, 0);
  // parrilla de barras horizontales (sin escudo)
  add(rbox(0.06, 0.32, 1.0, 0.02, 1), "goma", L / 2 + 0.005, 0.64, 0);
  for (let i = 0; i < 4; i++) add(rbox(0.05, 0.035, 1.0, 0.012, 1), "cromo", L / 2 + 0.03, 0.52 + i * 0.08, 0);
  // faros redondos dobles
  const fg = new THREE.CylinderGeometry(0.095, 0.095, 0.05, 20).rotateZ(Math.PI / 2);
  const ag = new THREE.TorusGeometry(0.1, 0.022, 8, 20).rotateY(Math.PI / 2);
  for (const z of [-0.84, -0.64, 0.64, 0.84]) { add(fg, "faro", L / 2 + 0.01, 0.66, z); add(ag, "cromo", L / 2 + 0.03, 0.66, z); }
  // paragolpes
  add(rbox(0.16, 0.15, Wd + 0.08, 0.06), "cromo", L / 2 + 0.05, 0.4, 0);
  add(rbox(0.16, 0.15, Wd + 0.08, 0.06), "cromo", -L / 2 - 0.05, 0.4, 0);
  for (const z of [-0.78, 0.78]) add(rbox(0.04, 0.12, 0.3, 0.02, 1), "trasera", -L / 2 - 0.005, 0.68, z);
  // ruedas con taza
  const rg = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 24).rotateX(Math.PI / 2);
  const tg = new THREE.CylinderGeometry(0.19, 0.19, 0.04, 20).rotateX(Math.PI / 2);
  for (const x of [1.55, -1.55]) for (const s of [-1, 1]) { add(rg, "goma", x, 0.36, s * (Wd / 2 - 0.1)); add(tg, "taza", x, 0.36, s * (Wd / 2 + 0.04)); }
  // espejos laterales
  for (const s of [-1, 1]) add(rbox(0.1, 0.1, 0.16, 0.03, 1), "cromo", 0.75, 1.0, s * (Wd / 2 + 0.06));
  return { L, Wd, P };
})();
function hacerAutoSuelto() {
  const g = new THREE.Group();
  for (const p of AUTO.P) { const m = new THREE.Mesh(p.geo, AM[p.m]); m.applyMatrix4(p.mx); g.add(m); }
  return sh(g);
}
// flota instanciada: una InstancedMesh por parte; ponerFlota(f, i, matriz) mueve el auto i
function hacerFlota(n) {
  const g = new THREE.Group();
  const ims = AUTO.P.map((p) => { const im = new THREE.InstancedMesh(p.geo, AM[p.m], n); im.castShadow = true; im.receiveShadow = true; im.frustumCulled = false; g.add(im); return im; });
  scene.add(g);
  return { g, ims, n };
}
const _mA = new THREE.Matrix4(), _mB = new THREE.Matrix4(), _qA = new THREE.Quaternion(), _eA = new THREE.Euler();
function ponerAuto(f, i, x, y, z, ry, s = 1) {
  _qA.setFromEuler(_eA.set(0, ry, 0));
  _mA.compose(V(x, y, z), _qA, V(s, Math.max(0.0001, s), s));
  AUTO.P.forEach((p, k) => { _mB.multiplyMatrices(_mA, p.mx); f.ims[k].setMatrixAt(i, _mB); });
}
const listaFlota = (f) => f.ims.forEach((im) => (im.instanceMatrix.needsUpdate = true));

// etiqueta "VENDIDO" (cuelga del espejo del auto del gancho)
const texVendido = tex(640, 260, (x, w, h) => {
  x.fillStyle = VER; rr(x, 4, 4, w - 8, h - 8, 40); x.lineWidth = 14; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(10, 10, w - 20, h - 20, 34); x.stroke();
  x.fillStyle = NAV0; x.beginPath(); x.arc(70, h / 2, 22, 0, 7); x.fill(); x.fillStyle = VER; x.beginPath(); x.arc(70, h / 2, 10, 0, 7); x.fill();
  x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "VENDIDO", 900, 150, w - 190); x.fillText("VENDIDO", w / 2 + 40, h / 2 + 8);
});

// ================= EL BUZÓN DE PIE =================
const BZ = { W: 0.38, D: 0.62, Hb: 0.19, y: 1.0 };
function hacerBuzon() {
  const g = new THREE.Group();
  const cuerpoM = mat(0x2c4268, 0.45), poste = mat(0x3b4f78, 0.55);
  g.add(mesh(rbox(0.1, BZ.y, 0.1, 0.02, 1), poste, 0, BZ.y / 2, -0.12));
  g.add(mesh(rbox(0.3, 0.05, 0.45, 0.015, 1), poste, 0, BZ.y - 0.02, -0.12));
  const caja = new THREE.Group(); caja.position.y = BZ.y; g.add(caja);
  caja.add(mesh(rbox(BZ.W, BZ.Hb, BZ.D, 0.02, 2), cuerpoM, 0, BZ.Hb / 2, 0));
  const cil = mesh(new THREE.CylinderGeometry(BZ.W / 2, BZ.W / 2, BZ.D, 32).rotateX(Math.PI / 2), cuerpoM, 0, BZ.Hb, 0); caja.add(cil);
  // boca oscura detrás de la puerta
  const bocaGeo = new THREE.ShapeGeometry((() => { const s = new THREE.Shape(); s.moveTo(-BZ.W / 2 + 0.02, 0.01); s.lineTo(BZ.W / 2 - 0.02, 0.01); s.lineTo(BZ.W / 2 - 0.02, BZ.Hb); s.absarc(0, BZ.Hb, BZ.W / 2 - 0.02, 0, Math.PI, false); s.lineTo(-BZ.W / 2 + 0.02, 0.01); return s; })(), 16);
  caja.add(mesh(bocaGeo, mat(0x05080f, 0.9), 0, 0, BZ.D / 2 - 0.004));
  // puerta crema (bisagra abajo)
  const puerta = new THREE.Group(); puerta.position.set(0, 0.005, BZ.D / 2 + 0.012); caja.add(puerta);
  const pGeo = new THREE.ExtrudeGeometry((() => { const s = new THREE.Shape(); s.moveTo(-BZ.W / 2 - 0.005, 0); s.lineTo(BZ.W / 2 + 0.005, 0); s.lineTo(BZ.W / 2 + 0.005, BZ.Hb - 0.005); s.absarc(0, BZ.Hb - 0.005, BZ.W / 2 + 0.005, 0, Math.PI, false); s.lineTo(-BZ.W / 2 - 0.005, 0); return s; })(), { depth: 0.02, bevelEnabled: false, curveSegments: 16 });
  pGeo.translate(0, 0, -0.01);
  puerta.add(mesh(pGeo, [M.cr, M.cr2]));
  puerta.add(mesh(rbox(0.1, 0.03, 0.03, 0.01, 1), mat(C.cromo, 0.3, { metalness: 0.4 }), 0, BZ.Hb + 0.05, 0.02));
  // banderita verde al costado (+x), pivote atrás
  const band = new THREE.Group(); band.position.set(-BZ.W / 2 - 0.02, BZ.Hb * 0.6, -BZ.D * 0.25); caja.add(band);
  band.add(mesh(rbox(0.025, 0.36, 0.035, 0.008, 1), M.g, 0, 0.18, 0));
  band.add(mesh(rbox(0.025, 0.13, 0.17, 0.01, 1), M.g, 0, 0.3, 0.085));
  band.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.03, 12).rotateZ(Math.PI / 2), M.navy, 0, 0, 0));
  sh(g);
  g.userData = { puerta, band };
  return g;
}
const ponerBuzon = (b, puerta, bandera) => { b.userData.puerta.rotation.x = 1.35 * puerta; b.userData.band.rotation.x = (1 - bandera) * (Math.PI / 2); };

// ================= ZONA A: la calle de noche =================
const XA = (i) => OA.x + i * 7.2;
const NCASAS = 6;
const calle = new THREE.Group(); scene.add(calle);
const pisoA = pisoSombra(OA.x + 22, 0, 70, 30, 0.5);
const ventanaM = new THREE.MeshBasicMaterial({ color: 0xe9a65a });
{
  const vereda = mat(0x26385a, 0.85), entradaM = mat(0x1a2a46, 0.9), faja = mat(C.cr3, 0.8);
  calle.add(mesh(new THREE.BoxGeometry(70, 0.08, 1.6), vereda, OA.x + 22, 0.04, -1.0));
  calle.add(mesh(new THREE.BoxGeometry(70, 0.1, 0.12), faja, OA.x + 22, 0.05, -0.15)); // cordón
  for (let i = 0; i < 18; i++) calle.add(mesh(new THREE.BoxGeometry(1.6, 0.012, 0.16), faja, OA.x - 4 + i * 3.6, 0.006, 3.6)); // línea discontinua
  for (let i = 0; i < NCASAS; i++) {
    const x = XA(i);
    calle.add(mesh(new THREE.BoxGeometry(2.9, 0.02, 7.2), entradaM, x, 0.01, -5.4));
    // fachada crema con techo navy, puerta y ventana iluminada
    const fx = x + 1.2;
    calle.add(mesh(rbox(5.6, 3.0, 1.2, 0.05), M.cr2, fx + 0.6, 1.5, -9.6));
    calle.add(mesh(rbox(6.0, 0.35, 1.5, 0.06), mat(0x2c4268, 0.5), fx + 0.6, 3.15, -9.5));
    calle.add(mesh(rbox(1.5, 1.05, 0.08, 0.03), ventanaM, fx + 1.9, 1.75, -8.97));
    calle.add(mesh(rbox(0.95, 2.0, 0.08, 0.03), M.navy3, fx - 0.75, 1.0, -8.97));
  }
  // la concesionaria al fondo: fachada navy claro, vidriera que se prende, cartel crema "AUTOS", banderines
  const CX = XA(NCASAS) + 6;
  calle.add(mesh(rbox(11, 4.6, 1.5, 0.08), mat(0x2c4268, 0.5), CX, 2.3, -9.5));
  calle.userData.vidriera = mesh(rbox(8.6, 2.6, 0.1, 0.04), mat(0x1a2a46, 0.3, { emissive: 0xfff0c8, emissiveIntensity: 0 }), CX, 1.5, -8.72); calle.add(calle.userData.vidriera);
  for (let i = 0; i < 4; i++) calle.add(mesh(rbox(0.12, 2.7, 0.14, 0.03), M.navy, CX - 4.3 + i * 2.87, 1.5, -8.66));
  const cartelT = tex(1024, 300, (x, w, h) => { x.fillStyle = CRE; rr(x, 0, 0, w, h, 40); x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 210); x.fillText("AUTOS", w / 2, h / 2 + 12); });
  calle.userData.cartel = mesh(new THREE.PlaneGeometry(5.2, 1.52), new THREE.MeshStandardMaterial({ map: cartelT, roughness: 0.6, emissive: 0xffffff, emissiveMap: cartelT, emissiveIntensity: 0.1 }), CX, 3.55, -8.7);
  calle.add(calle.userData.cartel);
  // guirnalda de banderines (verde y crema)
  for (let i = 0; i < 14; i++) {
    const u = i / 13, bx = CX - 5.6 + u * 11.2, by = 4.95 - Math.sin(Math.PI * u) * 0.45;
    const tri = new THREE.Shape(); tri.moveTo(-0.22, 0); tri.lineTo(0.22, 0); tri.lineTo(0, -0.42); tri.closePath();
    const b = mesh(new THREE.ShapeGeometry(tri), new THREE.MeshStandardMaterial({ color: i % 2 ? C.cr : C.g, side: THREE.DoubleSide, roughness: 0.6 }), bx, by, -8.5); calle.add(b);
  }
  calle.userData.CX = CX;
  sh(calle);
}
// los buzones (uno por casa) y los autos (el del gancho suelto; los otros 5 en flota)
const buzones = [];
for (let i = 0; i < NCASAS; i++) { const b = hacerBuzon(); b.position.set(XA(i) - 2.9, 0.08, -0.85); b.rotation.y = 0.0; scene.add(b); buzones.push(b); }
const auto0 = hacerAutoSuelto(); scene.add(auto0);
const flotaA = hacerFlota(NCASAS - 1);
// etiqueta VENDIDO colgando del espejo del lado de cámara (el espejo de -z del auto: en la entrada mira a +x)
const vendido = new THREE.Group(); auto0.add(vendido); vendido.position.set(0.86, 1.36, 0); vendido.rotation.set(0, Math.PI / 2, 0, "YXZ"); // cartel VENDIDO apoyado en el parabrisas, del lado de adentro
const vendidoT = new THREE.Group(); vendido.add(vendidoT);
{
  
  const pl = mesh(new THREE.PlaneGeometry(0.95, 0.38), new THREE.MeshStandardMaterial({ map: texVendido, roughness: 0.6, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: texVendido, emissiveIntensity: 0.25 }), 0, -0.2, 0.02);
  vendidoT.add(pl);
}
// camino de cada auto: sale de su entrada hacia la calle y dobla a la derecha (+x); s = metros recorridos
const RG = 2.4, ZP = -4.4, ZC = 2.2;
function caminoAuto(x0, s) {
  const L1 = ZC - RG - ZP, L2 = (Math.PI / 2) * RG;
  if (s <= L1) return { x: x0, z: ZP + s, ry: -Math.PI / 2 };
  if (s <= L1 + L2) { const a = (s - L1) / RG; return { x: x0 + RG - Math.cos(a) * RG, z: ZC - RG + Math.sin(a) * RG, ry: -Math.PI / 2 + a }; }
  return { x: x0 + RG + (s - L1 - L2), z: ZC, ry: 0 };
}

// ================= ZONA L: el estacionamiento, "1.425", "1973" =================
const KL = 0.7; // escala de los autos del estacionamiento
const LOTE = []; // [x, z, fila]
for (let j = 0; j < 6; j++) for (const s of [-1, 1]) LOTE.push([OL.x + s * 2.55, OL.z - 6.0 + j * 2.4, j, s]);
const flotaL = hacerFlota(LOTE.length);
const pisoL = pisoSombra(OL.x, OL.z - 2, 24, 30, 0.5);
const lineasL = new THREE.Group(); scene.add(lineasL);
{
  const lm = mat(C.cr3, 0.8);
  for (let j = 0; j <= 6; j++) for (const s of [-1, 1]) lineasL.add(mesh(new THREE.BoxGeometry(3.6, 0.01, 0.12), lm, OL.x + s * 2.55, 0.006, OL.z - 7.2 + j * 2.4));
  lineasL.add(mesh(new THREE.BoxGeometry(14, 0.012, 0.14), mat(C.cr3, 0.8), OL.x, 0.006, OL.z - 7.6));
  lineasL.add(mesh(new THREE.BoxGeometry(14, 0.012, 0.14), mat(C.cr3, 0.8), OL.x, 0.006, OL.z + 7.4));
}
const NUM = { z: OL.z - 10.5, y: 3.6 };
const num1425 = mesh(textoGeo("1.425", 3.3, 0.8), [mat(C.cr, 0.5), M.g]); num1425.receiveShadow = true; scene.add(num1425);
const num1973 = mesh(textoGeo("1973", 1.4, 0.4), [M.g, mat(C.navy, 0.5)]); scene.add(num1973);

// ================= ZONA D (en el pasillo del estacionamiento): el sobre, el "?", la tarjeta, el abanico, el megáfono =================
const OD = V(OL.x, 0, OL.z + 0.0);
const KS = 1.9; // el sobre de la bisagra, grande
const sobreD = hacerSobre(); scene.add(sobreD);
const preguntaM = mat(C.g, 0.38, { emissive: C.g, emissiveIntensity: 0.16 });
const preguntaGeo = textoGeo("?", 0.95, 0.3);
const preguntaBordeM = new THREE.MeshBasicMaterial({ color: C.navy, side: THREE.BackSide });
function hacerPregunta() { const g = new THREE.Group(); const a = mesh(preguntaGeo, preguntaM); a.castShadow = true; g.add(a); const b = mesh(preguntaGeo, preguntaBordeM); b.scale.set(1.04, 1.03, 1.15); g.add(b); scene.add(g); return g; }
const pregunta = hacerPregunta();
const tarjeta = hacerTarjeta(0); scene.add(tarjeta); // LA tarjeta (frente: hoja de otoño)
const abanico = []; for (let n = 0; n < 12; n++) { const c = hacerTarjeta(n); scene.add(c); abanico.push(c); }
const almD = crearAlmanaque(); scene.add(almD);
// la etiqueta de precio "$" y el cartel "OFERTA" (lo que uno esperaría): gris y rojo apagado
const precioT = tex(400, 240, (x, w, h) => {
  x.fillStyle = "#a9a79b"; rr(x, 0, 0, w, h, 30); x.fillStyle = NAV0; x.beginPath(); x.arc(60, h / 2, 22, 0, 7); x.fill();
  x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 170); x.fillText("$", w / 2 + 40, h / 2 + 10);
});
const precio = new THREE.Group(); scene.add(precio);
precio.add(mesh(rbox(0.36, 0.22, 0.025, 0.03, 2), [M.gris, M.gris, M.gris, M.gris, matTex(precioT, 0.15), M.gris]));
const ofertaT = tex(760, 260, (x, w, h) => { x.fillStyle = ROJ; rr(x, 0, 0, w, h, 34); x.fillStyle = CRE; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "OFERTA", 900, 170, w - 80); x.fillText("OFERTA", w / 2, h / 2 + 8); });
const oferta = new THREE.Group(); scene.add(oferta);
oferta.add(mesh(rbox(0.66, 0.23, 0.035, 0.035, 2), [M.red, M.red, M.red, M.red, matTex(ofertaT, 0.12), M.red]));
// ronda 2: sin sombra (dejaban un cuadrado oscuro sobre el corazón)
// el megáfono (cono navy claro con aro rojo apagado, mango crema); al apagarse, gris
const megM = { cono: mat(0x3b4f78, 0.45, { side: THREE.DoubleSide }), aro: mat(C.red, 0.5), mango: mat(C.cr, 0.6), gris: mat(0x77756b, 0.7, { side: THREE.DoubleSide }), gris2: mat(0x8e8c80, 0.7) };
const megafono = new THREE.Group(); scene.add(megafono);
const megCuerpo = new THREE.Group(); megafono.add(megCuerpo);
{
  const cono = mesh(new THREE.CylinderGeometry(0.34, 0.1, 0.8, 32, 1, true).rotateZ(-Math.PI / 2), megM.cono, 0.4, 0, 0); megCuerpo.add(cono);
  const tapa = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.14, 24).rotateZ(-Math.PI / 2), megM.cono, -0.05, 0, 0); megCuerpo.add(tapa);
  const aro = mesh(new THREE.TorusGeometry(0.34, 0.04, 10, 36).rotateY(Math.PI / 2), megM.aro, 0.8, 0, 0); megCuerpo.add(aro);
  const mango = mesh(rbox(0.09, 0.3, 0.08, 0.03), megM.mango, 0.12, -0.2, 0); mango.rotation.z = -0.2; megCuerpo.add(mango);
  const gatillo = mesh(rbox(0.04, 0.08, 0.04, 0.012, 1), megM.aro, 0.2, -0.13, 0); megCuerpo.add(gatillo);
  megafono.userData = { cono, tapa, aro, mango, gatillo };
  sh(megafono);
}
const megApagar = (on) => { const u = megafono.userData; u.cono.material = on ? megM.gris : megM.cono; u.tapa.material = on ? megM.gris : megM.cono; u.aro.material = on ? megM.gris2 : megM.aro; };
const tildeD = hacerTilde(0.13);
const pisoD = pisoSombra(OD.x, OD.z, 8, 8, 0.45);

// ================= ZONA R: el almacén de Rubén, sábado a la mañana =================
const MOST = { x: OR.x, y: 0.95, z: 0.0, d: 0.7, w: 1.9 };
const RZ = -0.6; // dónde está parado Rubén
const RX = OR.x + 0.12;
const almacen = new THREE.Group(); scene.add(almacen);
const ZW = -1.6;
{
  const pis = tex(512, 512, (x, w, h) => { x.fillStyle = "#b9b7a9"; x.fillRect(0, 0, w, h); x.fillStyle = "#c9c7b9"; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rr(x, i * 256 + 5, j * 256 + 5, 246, 246, 8); });
  pis.wrapS = pis.wrapT = THREE.RepeatWrapping; pis.repeat.set(14 / 0.6, 8 / 0.6);
  const piso = mesh(new THREE.PlaneGeometry(14, 8), new THREE.MeshStandardMaterial({ map: pis, roughness: 0.85 }), OR.x, 0, 2.4); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; almacen.add(piso);
  // pared crema, zócalo navy claro
  almacen.add(mesh(new THREE.PlaneGeometry(14, 4.4), mat(0xefeee5, 0.92), OR.x, 2.2, ZW));
  almacen.add(mesh(new THREE.PlaneGeometry(14, 1.0), mat(0x16243d, 0.6), OR.x, 0.5, ZW + 0.005));
  almacen.add(mesh(new THREE.BoxGeometry(14, 0.06, 0.04), M.g, OR.x, 1.01, ZW + 0.02));
  // estantería verde con productos detrás de Rubén
  const verde = mat(0x4fb81a, 0.55);
  const EX0 = OR.x - 1.25, EX1 = OR.x + 1.35, EZ = ZW + 0.22;
  for (const x of [EX0, EX1, (EX0 + EX1) / 2]) almacen.add(mesh(rbox(0.07, 2.0, 0.4, 0.015), verde, x, 1.3, EZ));
  for (const y of [1.3, 1.8, 2.3]) almacen.add(mesh(rbox(EX1 - EX0 + 0.1, 0.05, 0.42, 0.015), verde, (EX0 + EX1) / 2, y, EZ));
  almacen.add(mesh(new THREE.BoxGeometry(EX1 - EX0, 1.6, 0.02), mat(0xd8d6c8, 0.9), (EX0 + EX1) / 2, 1.85, ZW + 0.02));
  const az2 = azarDe(11);
  const fab = [crearYerba, crearFideos, crearGalletitas, crearDulceDeLeche];
  const colores = [C.g, C.cr, C.red, 0xd9a441, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  for (const y of [1.325, 1.825, 2.325]) {
    for (let x = EX0 + 0.12; x < EX1 - 0.12;) {
      const k = az2(); let o, ancho;
      if (k < 0.5) { o = fab[Math.floor(az2() * fab.length)](); o.scale.setScalar(1.15); ancho = (o.userData.tam?.[0] ?? 0.16) * 1.15; }
      else { const c = colores[Math.floor(az2() * colores.length)]; o = new THREE.Group(); o.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 14), mat(c, 0.35), 0, 0.1, 0)); o.add(mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.035, 14), M.cr, 0, 0.215, 0)); ancho = 0.13; }
      // lugar libre para la yerba de Walter (estante del medio, a la izquierda)
      if ((y === 1.325 && x > OR.x - 0.78 && x < OR.x - 0.2) || Math.abs(x + ancho / 2 - (EX0 + EX1) / 2) < 0.06 || x + ancho > EX1 - 0.08) { x += 0.08; continue; }
      o.position.set(x + ancho / 2, y, EZ + 0.02); o.rotation.y = (az2() - 0.5) * 0.25; almacen.add(o);
      x += ancho + 0.03 + az2() * 0.04;
    }
  }
  // la vidriera y la puerta a la izquierda, con luz de mañana (vidrio celeste pálido)
  const VX = OR.x - 2.6;
  almacen.add(mesh(rbox(1.7, 2.3, 0.08, 0.02), M.navy3, VX, 1.25, ZW + 0.03));
  almacen.add(mesh(new THREE.PlaneGeometry(1.52, 2.12), new THREE.MeshBasicMaterial({ color: 0xc9dbef }), VX, 1.25, ZW + 0.075));
  almacen.add(mesh(rbox(0.06, 2.12, 0.06, 0.02), M.navy3, VX, 1.25, ZW + 0.1));
  almacen.add(mesh(rbox(1.52, 0.06, 0.06, 0.02), M.navy3, VX, 1.6, ZW + 0.1));
  // almanaque de pared "SÁBADO"
  const almT = tex(420, 520, (x, w, h) => {
    x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h); x.fillStyle = NAV3; x.fillRect(0, 0, w, 130);
    x.fillStyle = CRE; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "SÁBADO", 800, 90, w - 50); x.fillText("SÁBADO", w / 2, 70);
    x.fillStyle = NAV0; x.font = F(900, 300); x.fillText("14", w / 2, 340);
  });
  almacen.add(mesh(new THREE.PlaneGeometry(0.42, 0.52), new THREE.MeshStandardMaterial({ map: almT, roughness: 0.8 }), OR.x + 1.75, 1.75, ZW + 0.01));
  // mostrador: tablas de madera, tapa clara con vetas
  const vetas = tex(1024, 256, (x, w, h) => {
    x.fillStyle = "#d9b88d"; x.fillRect(0, 0, w, h); const az = azarDe(3);
    for (let i = 0; i < 46; i++) { const y = az() * h; x.strokeStyle = az() < 0.5 ? "rgba(150,105,60,0.35)" : "rgba(255,240,215,0.35)"; x.lineWidth = 2 + az() * 5; x.beginPath(); x.moveTo(0, y); for (let k = 1; k <= 8; k++) x.lineTo((k * w) / 8, y + Math.sin(k * 1.3 + i) * 7); x.stroke(); }
  });
  const tapaM = new THREE.MeshStandardMaterial({ map: vetas, roughness: 0.5 });
  const tablas = tex(1024, 512, (x, w, h) => { x.fillStyle = "#a8774a"; x.fillRect(0, 0, w, h); for (let i = 0; i < 12; i++) { x.fillStyle = i % 2 ? "#b4824f" : "#a06f44"; x.fillRect((i * w) / 12 + 3, 0, w / 12 - 6, h); x.fillStyle = "rgba(70,45,25,0.6)"; x.fillRect((i * w) / 12, 0, 4, h); } });
  const frenteM = new THREE.MeshStandardMaterial({ map: tablas, roughness: 0.7 });
  almacen.add(mesh(rbox(MOST.w, MOST.y - 0.04, MOST.d - 0.08, 0.03), frenteM, MOST.x, (MOST.y - 0.04) / 2, MOST.z));
  almacen.add(mesh(rbox(MOST.w + 0.12, 0.06, MOST.d, 0.02), [M.madera, M.madera, tapaM, M.madera, M.madera, M.madera], MOST.x, MOST.y - 0.03, MOST.z));
  sh(almacen);
}
// el frasco de caramelos del mostrador
const frasco = new THREE.Group(); scene.add(frasco);
{
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xe8f2f8, roughness: 0.08, transmission: 0, transparent: true, opacity: 0.32, depthWrite: false });
  frasco.add(mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.24, 24), vidrio, 0, 0.12, 0));
  frasco.add(mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.04, 20), M.g, 0, 0.26, 0));
  const az = azarDe(23), cols = [C.g, C.red, C.cr, 0xd9a441, C.navy3];
  for (let i = 0; i < 26; i++) { const r = Math.sqrt(az()) * 0.08, a = az() * 6.28; frasco.add(mesh(new THREE.SphereGeometry(0.022, 10, 8), mat(cols[i % cols.length], 0.35), Math.cos(a) * r, 0.03 + az() * 0.15, Math.sin(a) * r)); }
  frasco.position.set(MOST.x - 0.5, MOST.y, MOST.z + 0.05);
  sh(frasco);
}
const termo = crearTermo(); scene.add(termo); termo.scale.setScalar(1.25); termo.position.set(MOST.x + 0.64, MOST.y, MOST.z - 0.1);
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 3.4 }); scene.add(ruben.raiz);
ruben.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const mateR = crearMate(); scene.add(mateR); mateR.scale.setScalar(1.15);
// la yerba de Walter con su papelito, en el estante del medio, a la izquierda de Rubén
const yerbaW = crearYerba(); scene.add(yerbaW); yerbaW.scale.setScalar(1.15);
// ronda 1: sin papelito (con "Walter" encima se leía como una marca de yerba); el rótulo dice de quién es
const YW = V(OR.x - 0.5, 1.325, ZW + 0.26);
const polvo = []; for (let i = 0; i < 3; i++) { const m = mesh(new THREE.SphereGeometry(0.008, 8, 6), mat(0xd8d2c0, 0.9)); scene.add(m); polvo.push(m); }
// la nube de pensamiento (de por-que-el-recordatorio): un almanaque que pasa hojas y un "?" chico
const nubeM = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.55, clearcoat: 0.3, emissive: 0xefeee5, emissiveIntensity: 0.12 });
const nubeBordeM = new THREE.MeshBasicMaterial({ color: 0x0b1220, side: THREE.BackSide });
const ESF = [[-0.36, -0.04, 0.27], [-0.14, 0.14, 0.31], [0.16, 0.16, 0.3], [0.4, 0.0, 0.25], [0.18, -0.15, 0.26], [-0.14, -0.15, 0.25], [0.0, 0.0, 0.32]];
const esfGeo = new THREE.SphereGeometry(1, 36, 24);
const nube = new THREE.Group(); scene.add(nube);
const nubeItems = new THREE.Group(); nubeItems.position.z = 0.22; nube.add(nubeItems);
for (const [x, y, r] of ESF) {
  const b = mesh(esfGeo, nubeM, x, y, 0); b.scale.set(r, r, r * 0.55); nube.add(b);
  const o = mesh(esfGeo, nubeBordeM, x, y, -0.01); o.scale.set(r + 0.03, r + 0.03, r * 0.55 + 0.02); nube.add(o);
}
const almNube = crearAlmanaque(); nubeItems.add(almNube);
const preguntaNube = new THREE.Group(); nubeItems.add(preguntaNube);
{ const a = mesh(preguntaGeo, preguntaM); preguntaNube.add(a); const b = mesh(preguntaGeo, preguntaBordeM); b.scale.set(1.04, 1.03, 1.15); preguntaNube.add(b); }

// ================= LOS CELULARES (pantallas con textura canvas) =================
const PP = [768, 1556];
const FILAS = [["Walter", "Hoy", 0], ["Graciela", "18 días", 1], ["Héctor", "25 días", 1], ["Marta", "16 días", 1], ["Nico", "21 días", 1], ["Susana", "30 días", 1]];
function cabecera(x, w, titulo, sub = "") {
  x.fillStyle = NAV0; x.fillRect(0, 0, w, 250);
  x.fillStyle = CRE; x.font = F(700, 44); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("9:12", 40, 48);
  x.strokeStyle = CRE; x.lineWidth = 10; x.lineCap = "round"; x.beginPath(); x.moveTo(78, 120); x.lineTo(50, 150); x.lineTo(78, 180); x.stroke();
  x.fillStyle = CRE; x.textAlign = "left"; ajustar(x, titulo, 800, 76, w - 170); x.fillText(titulo, 120, sub ? 136 : 152);
  if (sub) { x.fillStyle = VER; x.font = F(600, 40); x.fillText(sub, 122, 200); }
}
function dibujarCelu(x, tipo, n = 0) {
  const [w, h] = PP;
  x.fillStyle = "#f6f4ea"; x.fillRect(0, 0, w, h);
  if (tipo === "ficha") {
    cabecera(x, w, "Clientes");
    x.fillStyle = VER; x.beginPath(); x.arc(150, 400, 92, 0, 7); x.fill(); x.lineWidth = 10; x.strokeStyle = NAV0; x.stroke();
    x.fillStyle = NAV0; x.textAlign = "center"; x.font = F(900, 110); x.fillText("W", 150, 406);
    x.textAlign = "left"; x.font = F(900, 96); x.fillText("Walter", 275, 400);
    x.fillStyle = "#4a5263"; x.font = F(700, 54); x.fillText("Compra siempre:", 50, 585);
    x.fillStyle = NAV0; ajustar(x, "Yerba 1 kg, galletitas", 800, 62, w - 100); x.fillText("Yerba 1 kg, galletitas", 50, 665);
    x.fillStyle = "#4a5263"; x.font = F(700, 54); x.fillText("Última compra:", 50, 790);
    // caja del contador (el número 3D va encima) o "hoy"
    const hoy = n > 0;
    x.fillStyle = hoy ? "#e6f9d6" : "#f6e1dd"; rr(x, 40, 830, w - 80, 250, 40);
    x.lineWidth = 10; x.strokeStyle = hoy ? VERD : ROJ; x.beginPath(); x.roundRect(40, 830, w - 80, 250, 40); x.stroke();
    if (hoy) { x.fillStyle = NAV0; x.font = F(900, 130); x.textAlign = "left"; x.fillText("Hoy", 270, 962); }
    // tres semanas (vacías en gris; con la compra, la última en verde)
    x.fillStyle = "#4a5263"; x.font = F(700, 52); x.textAlign = "left"; x.fillText("Últimas semanas", 50, 1180);
    for (let i = 0; i < 3; i++) {
      const X = 50 + i * 228, Y = 1220;
      x.fillStyle = hoy && i === 2 ? VER : "#dcdacd"; rr(x, X, Y, 210, 150, 26);
      x.fillStyle = hoy && i === 2 ? NAV0 : "#8e8c80"; x.font = F(800, 52); x.textAlign = "center"; x.fillText(hoy && i === 2 ? "Volvió" : "·", X + 105, Y + 80);
    }
    return;
  }
  if (tipo === "lista") {
    cabecera(x, w, "Clientes");
    FILAS.forEach(([nom, est, malo], i) => {
      const Y = 290 + i * 205, verde = !malo || i <= n;
      x.fillStyle = "#ffffff"; rr(x, 30, Y, w - 60, 185, 34); x.lineWidth = 8; x.strokeStyle = verde ? VER : "#e2c6c0"; x.beginPath(); x.roundRect(30, Y, w - 60, 185, 34); x.stroke();
      x.fillStyle = verde ? VER : "#e8cfca"; x.beginPath(); x.arc(110, Y + 92, 52, 0, 7); x.fill();
      x.fillStyle = NAV0; x.font = F(900, 60); x.textAlign = "center"; x.fillText(nom[0], 110, Y + 96);
      x.textAlign = "left"; x.font = F(800, 66); x.fillText(nom, 185, Y + 72);
      x.font = F(800, 52); x.fillStyle = verde ? VERD : ROJ; x.fillText(!malo ? "Compró hoy" : verde ? "Le escribió" : est + " sin venir", 185, Y + 136);
    });
    return;
  }
  if (tipo === "chat") {
    cabecera(x, w, "Almacén de Rubén", "en línea");
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 250, w, h - 250);
    // barra de escribir (sin botón de compra)
    x.fillStyle = "#ffffff"; rr(x, 30, h - 150, w - 60, 110, 55); x.fillStyle = "#8e8c80"; x.font = F(600, 44); x.textAlign = "left"; x.fillText("Responder", 80, h - 92);
  }
}
function hacerCelu(Wc = 0.08, Hc = 0.162, tipo = "ficha", funda = C.navy3) {
  const g = new THREE.Group();
  g.add(mesh(rbox(Wc + 0.008, Hc + 0.008, 0.012, 0.012), mat(funda, 0.4)));
  g.add(mesh(rbox(0.026, 0.026, 0.004, 0.006), M.navy, -Wc * 0.27, Hc * 0.36, -0.0072));
  const tv = texViva(...PP);
  const pm = new THREE.MeshStandardMaterial({ map: tv.t, roughness: 0.35, emissive: 0xffffff, emissiveMap: tv.t, emissiveIntensity: 0.35 });
  const p = mesh(new THREE.PlaneGeometry(Wc, Hc), pm, 0, 0, 0.0066); g.add(p);
  g.userData = { tv, Wc, Hc, pantalla: p };
  ponerPagina(g, tipo);
  sh(g); p.castShadow = false; return g;
}
function ponerPagina(g, tipo, n = 0) {
  const k = tipo + "|" + n; const tv = g.userData.tv; if (tv.clave === k) return; tv.clave = k;
  dibujarCelu(tv.x, tipo, n); tv.t.needsUpdate = true;
}
const enPant = (g, px, py, z = 0.01) => V((px / PP[0] - 0.5) * g.userData.Wc, (0.5 - py / PP[1]) * g.userData.Hc, z);
const celuR = hacerCelu(0.08, 0.162, "ficha", C.navy3); scene.add(celuR);
// el contador 3D "N días" (rojo apagado) sobre la ficha
const contGeo = {};
const contM = [mat(C.red, 0.45, { emissive: C.red, emissiveIntensity: 0.12 }), mat(0x8f3f37, 0.5)];
const contador = mesh(textoGeo("0 días", 0.1, 0.02), contM); celuR.add(contador);
function ponerContador(n) { const k = n + " días"; contador.geometry = contGeo[k] ??= textoGeo(k, 0.1, 0.02); }
const tildeCelu = hacerTilde(0.11, celuR);
// tarjetitas (la misma forma) que se posan sobre cada fila roja de la lista
const tarjetitas = []; for (let i = 0; i < 5; i++) { const c = hacerTarjeta(0, { mensaje: true }); celuR.add(c); tarjetitas.push(c); }
// el mensaje que vuela (s12) y el celular de Walter
const mensaje = hacerTarjeta(0, { mensaje: true }); scene.add(mensaje);
const celuW = hacerCelu(0.08, 0.162, "chat", C.cr2); scene.add(celuW);

// ================= ZONA W: la casa de Walter a la mañana =================
const walter = crearPersonaje({ ...ELENCO.walter, corbata: null, parpadeoCada: 2.9 }); scene.add(walter.raiz); // ronda 3: sin corbata (quedaba corrida al costado sin la campera)
walter.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
walter.ponerCampera(false);
const casaW = new THREE.Group(); scene.add(casaW);
{
  casaW.add(mesh(new THREE.PlaneGeometry(8, 4.4), mat(0x2c4268, 0.9), OW.x, 2.2, -1.4));
  casaW.add(mesh(rbox(1.3, 1.5, 0.08, 0.03), M.cr, OW.x + 0.75, 1.75, -1.36));
  casaW.add(mesh(new THREE.PlaneGeometry(1.14, 1.34), new THREE.MeshBasicMaterial({ color: 0xc9dbef }), OW.x + 0.75, 1.75, -1.31));
  casaW.add(mesh(rbox(0.05, 1.34, 0.04, 0.01, 1), M.cr, OW.x + 0.75, 1.75, -1.29));
  casaW.add(mesh(rbox(1.0, 0.05, 0.7, 0.02), M.madera, OW.x + 0.65, 0.78, -0.2));
  casaW.add(mesh(rbox(0.06, 0.76, 0.06, 0.02), mat(0x8a6a48, 0.6), OW.x + 0.25, 0.38, -0.45));
  casaW.add(mesh(rbox(0.06, 0.76, 0.06, 0.02), mat(0x8a6a48, 0.6), OW.x + 1.05, 0.38, -0.45));
  const taza = new THREE.Group(); taza.add(mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.1, 18), M.g, 0, 0.05, 0)); const asa = mesh(new THREE.TorusGeometry(0.03, 0.009, 8, 16), M.g, 0.055, 0.055, 0); taza.add(asa);
  taza.position.set(OW.x + 0.48, 0.805, -0.05); casaW.add(taza);
  const pisW = mesh(new THREE.PlaneGeometry(8, 6), mat(0x1f3254, 0.9), OW.x, 0, 1.4); pisW.rotation.x = -Math.PI / 2; pisW.receiveShadow = true; casaW.add(pisW);
  sh(casaW);
}

// ================= ZONA F: el cierre verde =================
const pisoF = pisoSombra(OF.x, 0, 8, 8, 0.3);
const tarjetaF = hacerTarjeta(1); scene.add(tarjetaF);
{
  const tn = tex(TW, TH, (x, w, h) => { x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.lineWidth = 64; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(32, 32, w - 64, h - 64, 52); x.stroke(); motivo(x, 0, w / 2, h * 0.5, 1.4); });
  const cn = mat(C.navy, 0.5);
  tarjetaF.traverse((o) => { if (o.isMesh && Array.isArray(o.material)) o.material = [cn, cn]; });
  tarjetaF.userData.tapa.userData.frente.material = matTex(tn, 0.22); tarjetaF.userData.n = 1;
}
const tildeF = hacerTilde(0.11);

// ================= TIEMPOS CLAVE =================
const T = {
  mejor: W[3], autos: W[6], s02: S["s02-tarjetas"], mandaba: W[8], tarjetas: W[9], compraron: W[15],
  s03: S["s03-volvian"], volvian: W[17], joe: W[20],
  s04: S["s04-record"], guinness: W[23], anio: W[29],
  s05: S["s05-por-que"], que: W[31] + 0.05, // ronda 2: el "?" sale enseguida (ronda 1 lo había corrido a +0,2)
  s06: S["s06-nada"], tarjeta: W[33], vendia: W[35], nada: W[36],
  s07: S["s07-me-caes"], decia: W[37], cada: W[38], bien: W[42],
  s08: S["s08-convencer"], compro: W[47], convencerlo: W[51],
  s09: S["s09-acordarse"], acordarse: W[54],
  s10: S["s10-ruben"], walter: W[55], hace: W[56], viene: W[60],
  s11: S["s11-sistema"], sistema: W[62], semanas: W[65],
  s12: S["s12-escribe"], escribe: W[68], sin: W[70], vender: W[71],
  s13: S["s13-volvio"], sabado: W[74], walter2: W[75], volvio: W[76],
  s14: S["s14-ninguno"], ninguno: W[82], agenda: W[83],
  fin: S["s15-llamada"], scalerics: W[88],
};
T.sobres = [T.mandaba, T.tarjetas + 0.05, T.tarjetas + 0.4]; // los tres sobres que entran al buzón
T.q0 = T.s05 - 0.25;          // la caída al sobre (termina en el corte de s05)
T.corte = T.s09 + 0.42;       // la tarjeta tapa la pantalla: del pasillo al almacén
T.aterriza = T.corte + 0.42;  // la tarjeta se apoya contra el frasco
T.ruben = T.s10;
T.contra = T.s11 - 0.5;       // contraplano a la tarjeta de Girard en el mostrador
T.vuelaW = T.escribe + 0.02;  // sale el mensaje
T.corteW = T.vuelaW + 0.36;   // el mensaje tapa la pantalla: del almacén a lo de Walter
T.llegaW = T.corteW + 0.34;   // el mensaje se posa en la pantalla de Walter
T.caraW = T.vender + 0.32;    // plano de Walter sonriendo
T.mateR = T.s13 - 0.55;       // contraplano: Rubén toma mate, no toca el celular
T.hoy = T.volvio - 0.05;      // inserto del celular: "hoy"

// ================= CÁMARA =================
// PLANOS: [nombre, desde, [[t, px, py, pz, mx, my, mz, fov], ...]]; dentro de un plano, Hermite monótona; entre planos, corte.
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const a = (x, y, z) => [OA.x + x, y, z], l = (x, y, z) => [OL.x + x, y, z], r = (x, y, z) => [OR.x + x, y, z], w = (x, y, z) => [OW.x + x, y, z], f = (x, y, z) => [OF.x + x, y, z];
let PLANOS = null;
const B0 = () => buzones[0].position;
function armarPlanos() {
  const bz = B0();
  const PC = celuR.userData.base, NC = V(0, 0, 1).applyQuaternion(celuR.userData.baseQ);
  const desdeCelu = (dist, dy = 0) => { const p = PC.clone().addScaledVector(NC, dist); p.y += dy; return [p.x, p.y, p.z]; };
  const miraCelu = (dy = 0) => [PC.x, PC.y + dy, PC.z];
  const PW = celuW.userData.base;
  const CXL = calle.userData.CX;
  return [
    // s01-s08: UNA toma continua: el auto VENDIDO → el buzón → la calle → el estacionamiento → la caída al sobre → la tarjeta
    ["X", 0, [
      k(0, a(-5.0, 4.5, 7.6), a(-0.5, 1.35, -3.4)),
      k(T.autos + 0.2, a(-4.7, 4.3, 7.1), a(-0.6, 1.35, -3.2)),
      k(T.mandaba + 0.05, [bz.x - 1.3, 2.1, bz.z + 2.6], [bz.x + 0.15, 1.45, bz.z - 0.2]),
      k(T.compraron - 0.4, [bz.x - 1.35, 2.1, bz.z + 2.45], [bz.x + 0.2, 1.45, bz.z - 0.25]),
      k(T.compraron + 0.3, [bz.x - 2.4, 2.5, bz.z + 3.9], [bz.x + 1.75, 1.25, bz.z - 2.4]),
      k(T.s03, [bz.x - 2.2, 2.3, bz.z + 3.4], [bz.x + 1.5, 1.2, bz.z - 2.4]),
      k(T.volvian + 0.15, a(3.0, 5.2, 10.5), a(8.0, 2.2, -3.5)),
      ...[S["s03-volvian"] + 1.1, T.joe, T.joe + 0.55, T.s04 - 0.03].map((tt) => { const p = caminoAuto(XA(0), sCalle(tt)); return k(tt, a(p.x + 6.5, 3.4, p.z + 8.2), a(p.x + 0.4, 0.95, p.z)); }),
      k(T.s04, l(-4, 15.5, 25), l(0, 1.6, -3.8)),
      k(T.s04 + 0.4, l(-1.5, 16.5, 26.5), l(0, 2.2, -4.4)),
      k(T.s04 + 0.45, l(0, 20.5, 27.5), l(0, 2.6, -5.0)),
      k(T.anio + 0.25, l(0, 21.5, 29.0), l(0, 2.6, -5.0)),
      k(T.q0 + 0.06, l(0, 19.0, 26.5), l(0, 2.4, -4.6)),
      k(T.q0 + 0.08, l(0, 2.2, 1.9), l(0, 0.0, 0.2)), // ronda 3: corte al sobre (sin rozar los autos)
      k(T.s05 + 0.02, l(0.0, 1.55, 1.15), l(0, 0.25, 0.0)),
      k(T.que + 0.3, l(0.25, 0.95, 1.95), l(0, 0.27, 0.0)),
      k(T.s06 - 0.05, l(0.3, 0.9, 1.95), l(0, 0.33, 0.0)),
      // s06: la tarjeta de frente (~70 % del alto)
      k(T.s06 + 0.4, l(0.05, 0.74, 1.8), l(0, 0.7, 0.0)),
      k(T.decia, l(0.03, 0.74, 1.72), l(0, 0.7, 0.0)),
      // s07: se abre (retrocede para que entre abierta) y el abanico
      k(T.decia + 0.4, l(0.0, 0.75, 2.7), l(0, 0.66, 0.0)),
      k(T.cada + 0.05, l(0.0, 0.78, 2.85), l(0, 0.66, 0.0)),
      k(T.cada + 0.5, l(0.0, 1.05, 4.2), l(0, 0.98, 0.0)),
      k(T.bien - 0.05, l(0.0, 1.05, 4.3), l(0, 0.98, 0.0)),
      // s08 (desde 14,75): la tarjeta grande a la derecha, el megáfono grande a la izquierda; push-in a la tarjeta
      k(T.bien + 0.35, l(-0.05, 1.0, 5.6), l(-0.05, 0.85, 0.0)),
      k(T.convencerlo, l(-0.05, 1.0, 5.7), l(-0.05, 0.85, 0.0)),
      k(T.s09 + 0.1, l(0.45, 0.95, 3.1), l(0.5, 0.86, 0.0)),
      k(T.corte, l(0.48, 0.94, 2.95), l(0.5, 0.86, 0.0)),
    ]],
    // s09-s10: el almacén. La tarjeta llega al frasco; Rubén entra en foco atrás; después plano medio de Rubén
    ["R", T.corte, [
      k(T.corte, r(-0.12, 1.28, 2.3), r(-0.15, 1.12, -0.15)),
      k(T.aterriza + 0.2, r(-0.04, 1.33, 2.65), r(-0.05, 1.2, -0.35)),
      k(T.ruben - 0.05, r(-0.02, 1.35, 2.8), r(-0.04, 1.26, -0.45)),
      k(T.ruben + 0.3, r(0.0, 1.38, 2.75), r(-0.06, 1.33, -0.5)),
      k(T.contra, r(0.0, 1.38, 2.6), r(-0.06, 1.34, -0.5)),
    ]],
    // contraplano: la tarjeta de Girard en el mostrador (y el celular al lado)
    ["RT", T.contra, [
      k(T.contra, r(-0.1, 1.2, 0.95), r(-0.3, 1.05, 0.05)),
      k(T.s11, r(-0.08, 1.19, 0.88), r(-0.28, 1.05, 0.05)),
    ]],
    // s11: el celular se levanta y gira; push-in a la ficha
    ["RC", T.s11, [
      k(T.s11, r(0.5, 1.3, 0.36), r(0.5, 0.97, 0.1)),
      k(T.s11 + 0.45, desdeCelu(0.44, 0.03), miraCelu(0.03)),
      k(T.semanas, desdeCelu(0.38, 0.025), miraCelu(0.025)),
      k(T.vuelaW, desdeCelu(0.37, 0.025), miraCelu(0.025)),
      k(T.corteW, desdeCelu(0.35, 0.04), miraCelu(0.04)),
    ]],
    // s12: el mensaje llega al celular de Walter (inserto), después Walter sonríe
    ["WC", T.corteW, [
      k(T.corteW, [PW.x, PW.y + 0.03, PW.z + 0.42], [PW.x, PW.y + 0.03, PW.z]),
      k(T.caraW, [PW.x, PW.y + 0.03, PW.z + 0.4], [PW.x, PW.y + 0.03, PW.z]),
    ]],
    ["W", T.caraW, [
      k(T.caraW, w(-0.25, 1.42, 2.7), w(0.05, 1.28, 0.0)),
      k(T.mateR, w(-0.22, 1.42, 2.55), w(0.05, 1.29, 0.0)),
    ]],
    // contraplano: Rubén toma mate, el celular quieto en el mostrador; s13: entra Walter
    ["R2", T.mateR, [
      k(T.mateR, r(0.12, 1.4, 2.6), r(0.1, 1.28, -0.4)),
      k(T.s13, r(-0.4, 1.55, 5.6), r(-0.42, 1.12, 0.0)),
      k(T.hoy, r(-0.4, 1.55, 5.4), r(-0.42, 1.12, 0.0)),
    ]],
    // s13 "volvió" y s14: el celular en el mostrador, "hoy"; después la lista y push-out
    ["RC2", T.hoy, [
      k(T.hoy, desdeCelu(0.37, 0.025), miraCelu(0.025)),
      k(T.s14, desdeCelu(0.38, 0.025), miraCelu(0.025)),
      k(T.ninguno, desdeCelu(0.41, 0.022), miraCelu(0.022)),
      k(T.fin, desdeCelu(0.42, 0.022), miraCelu(0.022)),
    ]],
    // s15: cierre verde, la tarjeta chica con el tilde abajo
    ["F", T.fin, [
      k(T.fin, f(0.0, 0.84, 2.05), f(0.0, 0.66, 0)),
      k(DUR, f(0.0, 0.83, 1.95), f(0.0, 0.66, 0)),
    ]],
  ];
}
const _mira = new THREE.Vector3();
let plano = "X";
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return pi; }
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
    const p = K[j - 1], qq = K[j], rr2 = K[j + 1];
    if (qq[0] - p[0] < 0.05 || rr2[0] - qq[0] < 0.05) return 0;
    const d1 = (qq[cc] - p[cc]) / Math.max(1e-4, qq[0] - p[0]), d2 = (rr2[cc] - qq[cc]) / Math.max(1e-4, rr2[0] - qq[0]);
    if (d1 * d2 <= 0) return 0;
    const m = (rr2[cc] - p[cc]) / Math.max(1e-4, rr2[0] - p[0]);
    return Math.sign(m) * Math.min(Math.abs(m), 3 * Math.abs(d1), 3 * Math.abs(d2));
  };
  const s2 = u * u, s3 = s2 * u;
  const vv = [];
  for (let cc = 1; cc <= 7; cc++) {
    if (hh <= 0) { vv.push(a0[cc]); continue; }
    vv.push((2 * s3 - 3 * s2 + 1) * a0[cc] + (s3 - 2 * s2 + u) * hh * tang(i, cc) + (-2 * s3 + 3 * s2) * b0[cc] + (s3 - s2) * hh * tang(i + 1, cc));
  }
  camera.position.set(vv[0], vv[1], vv[2]);
  const amp = plano[1] === "C" || plano === "WC" ? 0.0004 : 0.003;
  camera.position.x += Math.sin(t * 0.7) * amp; camera.position.y += Math.sin(t * 0.53) * amp;
  _mira.set(vv[3], vv[4], vv[5]);
  camera.fov = vv[6];
  const dd = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.01, dd * 0.03); camera.far = 260;
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  camera.updateMatrixWorld(true);
}
// un punto delante de la cámara: a dist, corrido dx/dy (en unidades de media pantalla: -1..1)
function delante(dist, dx = 0, dy = 0) {
  const fw = new THREE.Vector3(); camera.getWorldDirection(fw);
  const der = new THREE.Vector3().crossVectors(fw, camera.up).normalize();
  const arr = new THREE.Vector3().crossVectors(der, fw).normalize();
  const th = Math.tan((camera.fov * Math.PI) / 360) * dist;
  return camera.position.clone().add(fw.multiplyScalar(dist)).add(der.multiplyScalar(dx * th * camera.aspect)).add(arr.multiplyScalar(dy * th));
}
const _v = new THREE.Vector3(), _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion();

// ================= ZONA A en el tiempo =================
const sCalle = (t) => 26 * Math.pow(sg(t, T.volvian - 0.05, T.s04 + 1.0), 1.6);
function zonaA(t) {
  const en = plano === "X" && t < T.q0 - 0.05;
  calle.visible = pisoA.visible = en; auto0.visible = en; flotaA.g.visible = en;
  for (const b of buzones) b.visible = en;
  if (!en) return;
  // el auto del gancho: en su entrada; en "volvían" sale con los demás
  const s = sCalle(t);
  const p0 = caminoAuto(XA(0), s);
  auto0.position.set(p0.x, 0, p0.z); auto0.rotation.set(0, p0.ry, 0);
  for (let i = 1; i < NCASAS; i++) { const p = caminoAuto(XA(i), s); ponerAuto(flotaA, i - 1, p.x, 0, p.z, p.ry); }
  listaFlota(flotaA);
  // faros: parpadean en "autos" (como al cerrar con llave) y quedan prendidos
  const ta = T.autos + 0.4; const parp = (t > ta && t < ta + 0.12) || (t > ta + 0.22 && t < ta + 0.34);
  AM.faro.emissiveIntensity = parp ? 2.2 : 0.6;
  // VENDIDO: pop en "mejor", se balancea
  const kv = t < T.mejor - 0.05 ? 0.0 : popIn(t, T.mejor - 0.05, 0.3);
  ocultar(vendido, Math.max(0.001, kv) * 1.3); vendido.visible = kv > 0.01;
  vendidoT.rotation.set(-0.5 + rebote(t, T.mejor, 6, 16, 0.15), 0, 0);
  // los sobres entran al buzón de la casa 0; la banderita sube
  const b0 = buzones[0];
  const abre = Math.max(0, ...T.sobres.map((ts) => pulso(t, ts - 0.12, 0.42)));
  const bandera = t < T.sobres[0] + 0.25 ? 0 : bk(sg(t, T.sobres[0] + 0.25, T.sobres[0] + 0.55));
  ponerBuzon(b0, abre, bandera);
  for (let i = 1; i < NCASAS; i++) ponerBuzon(buzones[i], 0, 1);
  sobresA.forEach((sb, j) => {
    const ts = T.sobres[j];
    const u = sg(t, ts - 0.3, ts + 0.12), adentro = sg(t, ts + 0.12, ts + 0.3);
    sb.visible = u > 0 && adentro < 1;
    if (!sb.visible) return;
    const boca = V(b0.position.x, b0.position.y + BZ.y + 0.12, b0.position.z + BZ.D / 2 + 0.25);
    const desde = V(b0.position.x - 0.9, b0.position.y + BZ.y + 0.42, b0.position.z + 0.9);
    const p = lerpV(desde, boca, eo(u)); p.y += Math.sin(Math.PI * u) * 0.04;
    p.z -= adentro * 0.6; // entra por la boca
    sb.position.copy(p); sb.rotation.set(-Math.PI / 2 * eo(u) * 0.98 + 0.0, 0, (1 - eo(u)) * 1.6);
    sb.scale.setScalar(1.25);
  });
  // almanaques chicos al costado de los sobres (OCT, NOV, DIC): un mes por sobre
  // la concesionaria se prende en "volvían"
  const pr = sg(t, T.volvian + 0.4, T.volvian + 0.7);
  calle.userData.vidriera.material.emissiveIntensity = pr * 0.9;
  calle.userData.cartel.material.emissiveIntensity = 0.1 + pr * 0.35;
}
const sobresA = [0, 1, 2].map(() => { const s = hacerSobre(); scene.add(s); return s; });

// ================= ZONA L en el tiempo =================
function zonaL(t) {
  const en = plano === "X" && t > T.s03 + 0.5 && t < T.s05 + 0.5;
  flotaL.g.visible = lineasL.visible = pisoL.visible = en;
  flotaL.g.visible = en && t < T.s05 + 0.12;
  num1425.visible = num1973.visible = en && t > T.guinness - 0.1 && t < T.q0 + 0.15;
  lineasL.visible = en && t < T.s05 + 0.12;
  if (!en) return;
  // pop de a filas, de abajo (cerca de cámara) hacia arriba
  LOTE.forEach(([x, z, j, s], i) => {
    const t0 = T.s04 - 0.45 + (5 - j) * 0.1;
    const kk = t < t0 ? 0.0001 : lerp(0.3, 1, bk(sg(t, t0, t0 + 0.26)));
    ponerAuto(flotaL, i, x, 0, z, s > 0 ? Math.PI : 0, KL * kk);
  });
  listaFlota(flotaL);
  const kn = t < T.guinness - 0.05 ? 0 : popIn(t, T.guinness - 0.05, 0.32);
  const sale = 1 - eio(sg(t, T.anio + 0.28, T.anio + 0.48));
  ocultar(num1425, kn * sale); num1425.position.set(OL.x, NUM.y, NUM.z); num1425.rotation.set(-0.35, Math.sin(t * 1.3) * 0.04, 0);
  const ka = t < T.anio - 0.05 ? 0 : popIn(t, T.anio - 0.05, 0.3);
  ocultar(num1973, ka * sale); num1973.position.set(OL.x, NUM.y - 3.1, NUM.z + 0.8); num1973.rotation.set(-0.35, 0, 0);
  if (!num1973.visible) num1973.visible = false;
}

// ================= ZONA D en el tiempo =================
const POS_T = V(OD.x + 0.5, 0.0, OD.z); const KT8 = 0.95, YT8 = 0.86; // dónde queda parada la tarjeta en s08
function zonaD(t) {
  const en = plano === "X" && t > T.q0 - 0.2;
  sobreD.visible = pisoD.visible = en && t < T.s07 + 0.2;
  pregunta.visible = false; tarjeta.visible = false; precio.visible = oferta.visible = false; megafono.visible = false; tildeD.visible = false; almD.visible = false;
  abanico.forEach((c) => (c.visible = false));
  if (!en) return;
  pisoD.visible = true;
  // el sobre en el pasillo, acostado con la solapa arriba; en "qué" se abre y sale el "?"
  const ab = t < T.que - 0.06 ? 0 : bk(sg(t, T.que - 0.06, T.que + 0.16));
  const cierra = sg(t, T.s06 + 0.05, T.s06 + 0.25);
  abrirSobre(sobreD, ab);
  sobreD.position.set(OD.x, 0.006 + SB.th * KS * 0.5, OD.z + 0.05); sobreD.rotation.set(Math.PI / 2, 0, 0.0); sobreD.scale.setScalar(KS * (1 + 0.06 * pulso(t, T.que - 0.06, 0.2)));
  const kq = t < T.que - 0.02 ? 0 : bk(sg(t, T.que - 0.02, T.que + 0.3)) * (1 - eio(sg(t, T.s06 - 0.05, T.s06 + 0.2)));
  pregunta.visible = kq > 0.01;
  pregunta.position.set(OD.x, lerp(0.08, 0.43, kq), OD.z + 0.02);
  pregunta.rotation.set(-0.2, Math.sin((t - T.que) * 2.4) * 0.2, rebote(t, T.que + 0.3, 6, 18, 0.06));
  pregunta.scale.setScalar(Math.max(0.001, kq * 0.5));
  // s06: la tarjeta sale del sobre y se para de frente (0,6 m de alto)
  const sale = eio(sg(t, T.s06 - 0.1, T.s06 + 0.25));
  tarjeta.visible = t > T.s06 - 0.02 && t < T.corte + 0.01;
  if (tarjeta.visible && t < T.s08 + 0.1) {
    const kt = lerp(0.3, 0.6, sale);
    tarjeta.position.set(OD.x, lerp(0.05, 0.36 + 0.3, sale), OD.z + 0.04);
    tarjeta.rotation.set(lerp(-Math.PI / 2 + 0.3, 0, sale), 0, 0); tarjeta.scale.setScalar(kt);
    // s07: se abre en "Decía"; en "bien" se cierra
    const abre = eio(sg(t, T.decia, T.decia + 0.4)) * (1 - eio(sg(t, T.bien + 0.05, T.bien + 0.4)));
    abrirTarjeta(tarjeta, abre);
    frenteTarjeta(tarjeta, 0);
    // el abanico (en "cada mes"): LA tarjeta abierta adelante, y detrás 11 cerradas como cartas, cada una con el dibujo
    // de otro mes (el dibujo cambiaba; el texto, nunca)
    const fan = eio(sg(t, T.cada, T.cada + 0.45)) * (1 - eio(sg(t, T.bien - 0.2, T.bien)));
    if (fan > 0.001) {
      abanico.forEach((c, n) => {
        if (n === 0 || fan < 0.3) { c.visible = false; return; }
        const ang = (-0.95 + (n - 1) * 0.19) * fan, R = 0.6;
        c.visible = true; abrirTarjeta(c, 0);
        c.position.set(OD.x + Math.sin(ang) * R, 0.22 + Math.cos(ang) * R, OD.z - 0.1 - n * 0.016);
        c.rotation.set(0, 0, -ang); c.scale.setScalar(0.34 * fan + 0.001);
      });
      tarjeta.position.set(OD.x, lerp(0.66, 0.5, fan), OD.z + 0.15 * fan + 0.04); tarjeta.scale.setScalar(lerp(0.6, 0.36, fan));
    }
    // el almanaque que pasa hojas arriba (un mes por tarjeta)
    const kal = fan;
    almD.visible = kal > 0.6;
    if (almD.visible) {
      almD.position.set(OD.x, 1.42, OD.z - 0.3); almD.scale.setScalar(0.62 * Math.min(1, kal * 1.4)); almD.rotation.set(0, 0, 0);
      const m = Math.min(12, 1 + Math.floor(sg(t, T.cada + 0.2, T.bien - 0.2) * 12));
      almD.userData.dia(m); almD.userData.vuela(Math.max(1, m - 1), m > 1 ? ((t - T.cada - 0.2) / ((T.bien - T.cada - 0.4) / 12)) % 1 : 0, 1);
    }
    // "vendía": el precio y la OFERTA flotan; en "nada" se caen por delante
    const kp = t < T.vendia - 0.1 ? 0 : popIn(t, T.vendia - 0.1, 0.25);
    const cae = ei(sg(t, T.nada + 0.05, T.nada + 0.55));
    precio.visible = oferta.visible = kp > 0.01 && cae < 1;
    precio.position.set(OD.x - 0.13, 0.9 - cae * 1.6, OD.z + 0.3); precio.rotation.set(0, 0.3, 0.2 + cae * 2.0); precio.scale.setScalar(kp * 0.6);
    oferta.position.set(OD.x + 0.07, 0.6 - cae * 1.8, OD.z + 0.34); oferta.rotation.set(0, -0.25, -0.15 - cae * 1.6); oferta.scale.setScalar(kp * 0.5);
  }
  // s08: la tarjeta cerrada de pie a la derecha; el megáfono a la izquierda le apunta; tilde en "compró"
  if (t >= T.bien - 0.15 && t < T.corte) {
    const u = eio(sg(t, T.bien - 0.15, T.bien + 0.2));
    tarjeta.position.set(lerp(OD.x, POS_T.x, u), lerp(0.5, YT8, u), OD.z + 0.04 * (1 - u)); tarjeta.rotation.set(0, -0.2 * u, 0); tarjeta.scale.setScalar(lerp(0.36, KT8, u));
    abrirTarjeta(tarjeta, 0);
  }
  if (t >= T.bien + 0.25 && t < T.s09 + 0.2) {
    const km = t < T.bien + 0.3 ? 0 : popIn(t, T.bien + 0.3, 0.3);
    const apaga = t > T.convencerlo + 0.3;
    const cae = eio(sg(t, T.convencerlo + 0.35, T.convencerlo + 0.85));
    megafono.visible = km > 0.01;
    megApagar(false);
    const vib = t > T.convencerlo - 0.05 && t < T.convencerlo + 0.35 ? Math.sin((t - T.convencerlo) * 90) * 0.02 : 0;
    megafono.position.set(OD.x - 0.78 + vib - cae * 1.6, 0.8 - cae * 0.25, OD.z + 0.1);
    megafono.rotation.set(0, 0.15, -0.08 - cae * 0.9);
    megafono.scale.setScalar(km * 0.92 * (1 - 0.5 * cae));
    const kt = t < T.compro ? 0 : popIn(t, T.compro, 0.3);
    ocultar(tildeD, kt * 1.35 * (1 - eio(sg(t, T.s09 - 0.35, T.s09 - 0.2)))); // ronda 3: se apaga antes del push-in tildeD.position.set(POS_T.x + 0.2, YT8 + 0.58, OD.z + 0.12); tildeD.rotation.set(0, -0.25, 0);
  }
  // s09: la tarjeta vuela hacia cámara (hasta taparla) y del otro lado aterriza en el mostrador
  if (t >= T.s09 && t < T.corte) {
    const u = eio(sg(t, T.s09 + 0.05, T.corte));
    const rest = V(POS_T.x, YT8, OD.z);
    const cerca = delante(0.42, 0, -0.05);
    tarjeta.position.copy(lerpV(rest, cerca, u));
    _q.setFromEuler(new THREE.Euler(0, -0.2, 0)); tarjeta.quaternion.copy(_q).slerp(camera.quaternion, u);
    tarjeta.scale.setScalar(lerp(KT8, 0.34, u));
    tildeD.visible = false;
  }
}

// ================= ZONA R en el tiempo =================
const enR = () => plano[0] === "R";
const CARD_R = V(MOST.x - 0.3, MOST.y, MOST.z + 0.1); // la tarjeta apoyada contra el frasco
celuR.userData.base = V(MOST.x + 0.64, MOST.y + 0.084, MOST.z + 0.05);
celuR.userData.baseQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.32, -0.12, 0, "YXZ"));
function bocaRuben(t) { const i = Math.round((t - BOCA.t0) * BOCA.fps); return i >= 0 && i < BOCA.v.length ? BOCA.v[i] : 0; }
function zonaR(t) {
  const en = enR();
  almacen.visible = en; frasco.visible = termo.visible = en; ruben.raiz.visible = en; mateR.visible = en; yerbaW.visible = en; celuR.visible = en;
  nube.visible = false; polvo.forEach((p) => (p.visible = false));
  tarjetitas.forEach((c) => (c.visible = false));
  if (!en) return;
  const tarjetaR = tarjeta;
  // ---- Rubén ----
  const aC = { x: RX, y: 0, z: RZ, giro: 0 };
  const pr = poseEn(t, [
    [0, { ...aC, ...CARA.neutra, manoD: [-0.3, 0.32, 0.36], manoI: [0.26, 0.42, 0.36], codoI: [0.9, -0.5, -0.2], cabeza: { giro: 0.0, asiente: 0.06, ladea: 0.03 }, ojos: { x: 0, y: -0.2, abiertos: 1 }, cejas: { alto: 0.1, ang: 0.2 }, boca: { sonrisa: 0.0, ancho: 0.9 } }],
    // "¿Walter?": se le ocurre de golpe, mira el estante
    [T.walter + 0.12, { cabeza: { giro: -0.5, asiente: 0.12, ladea: 0.05 }, ojos: { x: -0.6, y: -0.3, abiertos: 1 }, cejas: { alto: 0.95, ang: 0.2, asim: 0 }, boca: { sonrisa: 0.0, ancho: 0.75 } }, 0.15],
    // "¿Hace cuánto que no viene?": se rasca la cabeza, duda
    [T.hace + 0.2, { cabeza: { giro: -0.18, asiente: 0.02, ladea: -0.1 }, ojos: { x: -0.25, y: 0.25, abiertos: 0.95 }, cejas: { alto: 0.5, ang: 0.75, asim: 0.45 }, boca: { sonrisa: -0.35, ancho: 0.8 } }, 0.3],
    [T.viene + 0.4, { cabeza: { giro: -0.05, asiente: 0.05, ladea: -0.04 }, ojos: { x: 0, y: -0.1 }, cejas: { alto: 0.3, ang: 0.5, asim: 0.2 }, boca: { sonrisa: -0.2 } }, 0.3],
    // contraplano de s12: toma mate tranquilo (el celular, solo)
    [T.mateR, { ...CARA.sonrisa, manoD: [-0.3, 0.32, 0.36], codoD: null, manoI: [0.24, 0.52, 0.4], codoI: [1, -0.5, -0.2], cabeza: { giro: 0.05, asiente: 0.0, ladea: 0.08 }, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.3 }, cejas: { alto: 0.2, ang: 0, asim: 0 } }, 0.05],
    // s13: entra Walter: lo mira, contento; le alcanza la yerba
    [T.s13 + 0.3, { ...CARA.feliz, manoI: [0.26, 0.42, 0.36], cabeza: { giro: -0.35, asiente: 0.0, ladea: 0.05 }, ojos: { x: -0.6, y: 0, abiertos: 1, feliz: 0.5 }, cejas: { alto: 0.6, ang: 0.1 } }, 0.3],
    [T.walter2, { manoD: [-0.24, 0.36, 0.5] }, 0.3],
  ]);
  pr.t = t;
  // la boca habla con la voz de Rubén (s10)
  if (t > T.walter - 0.1 && t < T.viene + 0.3) { const b = bocaRuben(t); pr.boca.abierta = Math.max(pr.boca.abierta, b * 0.55); pr.boca.ancho = lerp(pr.boca.ancho, 0.75, b); }
  // la mano derecha se rasca el costado de la cabeza (objetivo calculado sobre la cabeza real)
  const rasca = eio(sg(t, T.hace - 0.05, T.hace + 0.25)) * (1 - eio(sg(t, T.viene + 0.1, T.viene + 0.4)));
  if (rasca > 0) {
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const h = ruben.cabeza.getWorldPosition(new THREE.Vector3()).add(V(-0.2, 0.13 + Math.sin(t * 22) * 0.012 * rasca, 0.03));
    ruben.cuerpo.worldToLocal(h);
    pr.manoD = pr.manoD.map((v, i) => lerp(v, [h.x, h.y, h.z][i], rasca)); pr.codoD = [-1, -0.2, -0.1];
  }
  ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
  ruben.ojoLejano(camera.position);
  ruben.mano("I").getWorldPosition(_v); mateR.position.copy(_v).add(V(0.0, -0.075, 0.025)); mateR.rotation.set(0, 0.3 + Math.PI, 0.25);
  // la yerba de Walter: en el estante (s10); desde el contraplano del mate ya está en el mostrador (el sistema avisó) y
  // en "Walter" Rubén se la arrima
  yerbaW.position.copy(YW); yerbaW.rotation.set(0, 0.1, 0);
  if (t >= T.mateR) {
    const u = eio(sg(t, T.walter2 - 0.05, T.walter2 + 0.3));
    yerbaW.position.set(lerp(MOST.x - 0.12, MOST.x - 0.52, u), MOST.y, MOST.z + 0.12); yerbaW.rotation.set(0, 0.35, 0);
  }
  // polvo sobre la yerba (s10)
  if (t > T.s10 && t < T.contra) polvo.forEach((p, i) => { p.visible = true; const ph = ((t - T.s10) * 0.18 + i * 0.33) % 1; p.position.set(YW.x - 0.06 + i * 0.06, YW.y + 0.35 - ph * 0.3, YW.z + 0.08); });
  // la nube (s10, en "¿Hace cuánto…?"): el almanaque pasa hojas y un "?" chico
  const kn = plano === "R" && t > T.hace + 0.02 ? popIn(t, T.hace + 0.02, 0.3) * (1 - sg(t, T.contra - 0.15, T.contra)) : 0;
  nube.visible = kn > 0.01;
  if (nube.visible) {
    ruben.cabeza.getWorldPosition(_v);
    nube.position.copy(_v).add(V(-0.3, 0.52, 0.2)); nube.quaternion.copy(camera.quaternion);
    nube.scale.setScalar(kn * 0.27 * (1 + 0.02 * Math.sin(t * 5)));
    almNube.position.set(-0.12, -0.06, 0.02); almNube.scale.setScalar(0.85); almNube.rotation.set(0, 0, 0);
    const m = 1 + Math.floor(sg(t, T.hace, T.viene + 0.2) * 20);
    almNube.userData.dia(Math.min(21, m)); almNube.userData.vuela(Math.max(1, m - 1), ((t - T.hace) * 9) % 1, 1);
    preguntaNube.position.set(0.27, 0.02, 0.1); preguntaNube.rotation.set(0, 0, Math.sin((t - T.hace) * 6) * 0.15);
    preguntaNube.scale.setScalar(0.3 * (1 + 0.1 * pulso(t, T.viene, 0.3)));
  }
  // ---- la tarjeta de Girard: llega volando desde la cámara y se apoya contra el frasco ----
  if (t < T.aterriza + 0.01 && plano === "R") {
    const u = eio(sg(t, T.corte, T.aterriza));
    const cerca = delante(0.42, 0, -0.05);
    tarjetaR.visible = true;
    tarjetaR.position.copy(lerpV(cerca, V(CARD_R.x, CARD_R.y + 0.1, CARD_R.z), u));
    _q.setFromEuler(new THREE.Euler(-0.18, 0.3, 0)); tarjetaR.quaternion.copy(camera.quaternion).slerp(_q, u);
    tarjetaR.scale.setScalar(lerp(0.34, 0.2, u));
    abrirTarjeta(tarjetaR, 0); frenteTarjeta(tarjetaR, 0);
  } else {
    tarjetaR.visible = true;
    tarjetaR.position.set(CARD_R.x, CARD_R.y + 0.1 + Math.abs(rebote(t, T.aterriza, 12, 30, 0.01)), CARD_R.z); tarjetaR.rotation.set(-0.18, 0.3, 0); tarjetaR.scale.setScalar(0.2);
    abrirTarjeta(tarjetaR, 0); frenteTarjeta(tarjetaR, 0);
  }
  // ---- el celular de Rubén: acostado; en "sistema" se levanta y gira (queda apoyado en el frasco/termo) ----
  const sube = plano === "RC" || plano === "RC2" || plano === "R2" ? eio(sg(t, T.s11, T.s11 + 0.45)) : 0;
  const acostado = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0.2, 0, "YXZ"));
  celuR.position.copy(lerpV(V(MOST.x + 0.5, MOST.y + 0.008, MOST.z + 0.1), celuR.userData.base, sube));
  celuR.position.y += Math.sin(Math.PI * sube) * 0.05;
  celuR.quaternion.copy(acostado).slerp(celuR.userData.baseQ, sube);
  celuR.updateMatrixWorld(true);
  // página: ficha (rojo) → hoy (s13) → lista (s14)
  const lista = t >= T.s14;
  const nVerdes = lista ? Math.floor(sg(t, T.s14 + 0.35, T.s14 + 0.35 + 5 * 0.22) * 5 + 1e-6) : 0;
  ponerPagina(celuR, lista ? "lista" : "ficha", lista ? nVerdes : t >= T.hoy ? 1 : 0);
  // contador 3D: cuenta hasta 21 en "semanas"
  const enFicha = (plano === "RC" || plano === "R2" || plano === "RT") && !lista && t < T.hoy;
  contador.visible = enFicha && (plano !== "RC" || t > T.s11 + 0.42);
  if (contador.visible) {
    const n = Math.round(21 * eo(sg(t, T.sistema + 0.1, T.semanas + 0.1)));
    ponerContador(n);
    contador.position.copy(enPant(celuR, PP[0] / 2, 955, 0.012)); contador.scale.setScalar(0.17 * (1 + 0.12 * pulso(t, T.semanas + 0.05, 0.25)));
    contador.rotation.set(0, 0, 0);
  }
  const kt = t < T.hoy + 0.12 ? 0 : popIn(t, T.hoy + 0.12, 0.3);
  ocultar(tildeCelu, !lista && kt > 0 ? kt * 0.075 : 0);
  if (tildeCelu.visible) { tildeCelu.position.copy(enPant(celuR, 140, 955, 0.012)); tildeCelu.rotation.set(0, 0, 0); }
  // s14: tarjetitas que vuelan a cada fila roja (en cascada) y la fila pasa a verde
  if (lista) {
    tarjetitas.forEach((c, i) => {
      const t0 = T.s14 + 0.35 + i * 0.22 - 0.2;
      const u = eo(sg(t, t0, t0 + 0.2));
      c.visible = u > 0;
      if (!c.visible) return;
      const dest = enPant(celuR, PP[0] - 78, 290 + (i + 1) * 205 + 92, 0.012);
      c.position.copy(dest); c.rotation.set(0, 0, 0.08); c.scale.setScalar(0.0128 * lerp(0.4, 1, bk(u)) * (1 + 0.15 * pulso(t, t0 + 0.2, 0.2)));
      abrirTarjeta(c, 0);
    });
  }
  // ---- s12: el mensaje sale de la ficha y vuela hacia cámara (después, del otro lado, a lo de Walter) ----
  mensaje.visible = false;
  if (plano === "RC" && t > T.vuelaW - 0.02) {
    const u = eio(sg(t, T.vuelaW, T.corteW));
    const desde = celuR.localToWorld(enPant(celuR, PP[0] / 2, 2600, 0.05)); // ronda 3: entra desde abajo, sin tapar la ficha
    mensaje.visible = true;
    mensaje.position.copy(lerpV(desde, delante(0.3, 0, 0), u));
    celuR.getWorldQuaternion(_q); mensaje.quaternion.copy(_q).slerp(camera.quaternion, u);
    mensaje.scale.setScalar(lerp(0.06, 0.14, u)); abrirTarjeta(mensaje, 0);
  }
  if (plano !== "R") nube.visible = false;
  // en el inserto del celular y en el contraplano de la tarjeta, sin Rubén delante
  if (plano === "RC" || plano === "RC2") { ruben.raiz.visible = mateR.visible = false; }
  if (plano === "RT") { ruben.raiz.visible = mateR.visible = false; }
  if (plano === "RC" || plano === "RC2") { tarjetaR.visible = plano === "RC" && t < T.s11 + 0.6; }
}

// ================= ZONA W en el tiempo =================
celuW.userData.base = V(OW.x + 0.0, 1.32, 0.42);
function zonaW(t) {
  const en = plano === "WC" || plano === "W";
  walter.raiz.visible = casaW.visible = celuW.visible = en;
  // Walter en s13 (en el almacén): entra y llega al mostrador
  const enAlm = plano === "R2" && t > T.s13 - 0.05;
  if (enAlm) {
    walter.raiz.visible = true;
    const u = eio(sg(t, T.s13 - 0.05, T.sabado + 0.75));
    const pw = poseEn(t, [[0, { x: OR.x - 2.1, z: 0.85, giro: 1.25, paso: 1, ...CARA.sonrisa, manoI: [0.29, -0.08, 0.04], manoD: [-0.29, -0.08, 0.04], cabeza: { giro: -0.3 } }], [T.sabado + 0.8, { paso: 0, giro: 0.9, cabeza: { giro: -0.2, asiente: 0.0 }, ...CARA.feliz }, 0.3], [T.walter2 + 0.25, { manoI: [0.24, 0.32, 0.4], codoI: [0.9, -0.5, -0.2] }, 0.3]]);
    pw.x = lerp(OR.x - 2.1, OR.x - 0.8, u); pw.z = 0.8; pw.paso = 1 - sg(t, T.sabado + 0.55, T.sabado + 0.8); pw.t = t;
    walter.poner(pw); walter.raiz.updateMatrixWorld(true); walter.ojoLejano(camera.position);
  }
  if (!en) return;
  const pw = poseEn(t, [
    [0, { x: OW.x, z: 0, giro: 0, ...CARA.neutra, manoI: [0.1, 0.36, 0.3], codoI: [0.7, -0.8, -0.3], manoD: [-0.29, -0.08, 0.04], cabeza: { giro: 0.0, asiente: 0.32, ladea: 0.04 }, ojos: { x: 0.05, y: -0.8, abiertos: 1 } }],
    [T.vender + 0.2, { ...CARA.sonrisa, cabeza: { giro: 0.0, asiente: 0.3, ladea: 0.08 }, ojos: { x: 0.05, y: -0.75, abiertos: 1, feliz: 0.4 } }, 0.35],
  ]);
  pw.t = t;
  walter.poner(pw); walter.raiz.updateMatrixWorld(true); walter.ojoLejano(camera.position);
  // el celular en la mano izquierda, la pantalla hacia arriba-adelante (mira a Walter y a la cámara del inserto)
  celuW.position.copy(celuW.userData.base); celuW.rotation.set(-0.15, 0, 0);
  if (plano === "W") { walter.mano("I").getWorldPosition(_v); celuW.position.copy(_v).add(V(-0.02, 0.07, 0.03)); celuW.rotation.set(-0.9, Math.PI, 0, "YXZ"); }
  if (plano === "WC") { walter.raiz.visible = false; casaW.visible = true; }
  ponerPagina(celuW, "chat", 0);
  // el mensaje llega desde la cámara y se posa en la pantalla como burbuja (misma forma de la tarjeta)
  mensaje.visible = true;
  const dest = celuW.localToWorld(enPant(celuW, PP[0] / 2, 760, 0.0095));
  if (plano === "WC") {
    const u = eio(sg(t, T.corteW, T.llegaW));
    mensaje.position.copy(lerpV(delante(0.3, 0, 0), dest, u));
    celuW.getWorldQuaternion(_q); mensaje.quaternion.copy(camera.quaternion).slerp(_q, u);
    mensaje.scale.setScalar(lerp(0.14, 0.088, u) * (1 + 0.05 * pulso(t, T.llegaW, 0.2)));
  } else {
    mensaje.position.copy(dest); celuW.getWorldQuaternion(_q); mensaje.quaternion.copy(_q); mensaje.scale.setScalar(0.088);
  }
  abrirTarjeta(mensaje, 0);
}

// ================= ZONA F en el tiempo =================
function zonaF(t) {
  const en = plano === "F";
  tarjetaF.visible = tildeF.visible = pisoF.visible = en;
  if (!en) return;
  const kk = lerp(0.6, 1, bk(sg(t, T.fin - 0.02, T.fin + 0.3)));
  tarjetaF.position.set(OF.x, 0.42, 0); tarjetaF.rotation.set(-0.08, -0.35 + Math.sin((t - T.fin) * 1.2) * 0.12, 0); tarjetaF.scale.setScalar(kk * 0.5);
  abrirTarjeta(tarjetaF, 0); frenteTarjeta(tarjetaF, 1);
  const kt = t < T.fin + 0.25 ? 0 : popIn(t, T.fin + 0.25, 0.3);
  ocultar(tildeF, kt * (1 + 0.18 * pulso(t, T.scalerics - 0.03, 0.3)));
  tildeF.position.set(OF.x + 0.18, 0.56, 0.12); tildeF.rotation.set(-0.1, -0.3, 0);
}

// ================= ESCENA EN EL TIEMPO =================
let _armado = false;
function renderAt(t) {
  if (!_armado) { _armado = true; PLANOS = armarPlanos(); }
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  let foco = V(0, 0.5, 0), rad = 2.2;
  if (plano === "X") {
    if (t < T.s03 + 0.2) { foco = V(OA.x - 1.0, 0.5, -2.5); rad = 5.5; }
    else if (t < T.s04 + 0.3) { foco = V(OA.x + 18, 0.5, -2); rad = 22; }
    else if (t < T.q0) { foco = V(OL.x, 0.5, OL.z - 3); rad = 12; }
    else { foco = V(OD.x, 0.5, OD.z); rad = 1.8; }
  } else if (plano[0] === "R") { foco = V(OR.x, 0.8, 0); rad = 2.6; }
  else if (plano[0] === "W") { foco = V(OW.x, 0.8, 0); rad = 2.0; }
  else if (plano === "F") { foco = OF.clone().add(V(0, 0.4, 0)); rad = 1.2; }
  sol.position.copy(foco).add(V(-2.2, 7, 5)); sol.target.position.copy(foco);
  Object.assign(sol.shadow.camera, { left: -rad, right: rad, top: rad, bottom: -rad, near: 0.5, far: 60 }); sol.shadow.camera.updateProjectionMatrix();
  tarjeta.visible = false; mensaje.visible = false; walter.raiz.visible = false;
  zonaA(t);
  zonaL(t);
  zonaD(t);
  zonaR(t);
  zonaW(t);
  zonaF(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e2) => renderAt(e2.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
