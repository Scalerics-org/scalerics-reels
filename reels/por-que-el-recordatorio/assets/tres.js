// Capa 3D de por-que-el-recordatorio (Three.js r170 local). Base técnica: reels/por-que-la-toalla (luces, entorno
// PMREM, cámara por claves con Hermite monótona, nube de pensamiento, personajes de reels/abren-hoy). renderAt(t) es una
// función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Fondo CREMA liso (#efeee5, lo pone el HTML). Zonas:
//   A (origen): el almacén de Rubén (pared crema con zócalo de azulejos navy claro, estantería verde, mostrador de
//      madera clara, reloj 19:40), el celular de Rubén, las bolsas de encargo con nombre, Rubén y Graciela.
//   D (x = 40): el consultorio dental: fila de 6 sillones, pacientes, cartelitos "Faltó", el "?" que sale de la lámpara.
//   P (x = 80): crema liso (solo sombras): la tarjeta de cuotas, las monedas y la balanza de platillos.
//   G (x = 120): Graciela en la vereda con su celular.
//   F (x = 160): la burbuja del cierre.
// LA BURBUJA DEL RECORDATORIO es el hilo: misma geometría (rectángulo redondeado con colita, borde navy, cara crema,
// tilde doble verde) en el gancho, en los sillones, en la nube de Rubén, en las cuotas, en la balanza, en el aviso del
// pedido y en el cierre.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800p.js";
import { crearPersonaje, ELENCO, poseEn, CARA, BRAZOS, crearMate, crearTermo, crearYerba, crearFideos, crearGalletitas, crearDulceDeLeche } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));
await document.fonts.load('500 60px "IBM Plex Mono"');
await document.fonts.load('700 60px "Caveat"');

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
// sacudón de vibración: 3 golpecitos cortos desde a
const vibra = (t, a) => (t > a && t < a + 0.5 ? Math.sin((t - a) * 75) * Math.sin(Math.PI * ((t - a) / 0.5 * 3 % 1)) : 0);

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
scene.environmentIntensity = 0.7;

const OD = V(40, 0, 0), OP = V(80, 0, 0), OG = V(120, 0, 0), OF = V(160, 0, 0);
const key = new THREE.DirectionalLight(0xfff0dc, 1.6); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.1); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x6a6458, 1.15); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.5);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.normalBias = 0.02; sol.shadow.radius = 5;
scene.add(sol, sol.target);
const luzVidriera = new THREE.PointLight(0xe9a65a, 0, 6, 1.6); scene.add(luzVidriera);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, madera: 0xdcbb92, bronce: 0xb08a4a };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.14 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.5), red: mat(C.red, 0.6),
  white: mat(C.white, 0.42), tilde: mat(C.navy, 0.45), gris: mat(C.gris, 0.55), madera: mat(C.madera, 0.55),
  cromo: mat(0xdfe3ea, 0.16, { metalness: 0.95 }), bronce: mat(C.bronce, 0.38, { metalness: 0.75 }),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", ${fam === "Lexend" ? "sans-serif" : fam === "Caveat" ? "cursive" : "monospace"}`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const ajustar = (x, txt, peso, px, ancho, fam) => { let s = px; x.font = F(peso, s, fam); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s, fam); } return s; };
const sombraTex = tex(256, 256, (x) => {
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(40,36,28,0.42)"); gr.addColorStop(0.55, "rgba(40,36,28,0.2)"); gr.addColorStop(1, "rgba(40,36,28,0)");
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
function hacerTilde(r = 0.17, padre = scene) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, M.g); d.scale.set(r, r, r * 0.35); g.add(d);
  const bd = mesh(new THREE.TorusGeometry(1, 0.08, 8, 40), M.navy); bd.scale.set(r, r, r); g.add(bd);
  const tk = mesh(tickGeo, M.tilde, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  sh(g); padre.add(g); return g;
}
const NAV = "#16243d", NAV3 = "#1f3254", CRE = "#efeee5", VER = "#5ce611", VERD = "#3fa60a", NAV0 = "#0b1220", ROJ = "#c7655b", GRI = "#8e8c80";
// piso invisible que solo muestra sombras (zonas sobre crema liso)
function pisoSombra(x, z, w = 8, d = 8, op = 0.16) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.ShadowMaterial({ opacity: op, color: 0x3a3426 }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, 0.001, z); m.receiveShadow = true; scene.add(m); return m;
}
function texAzulejos(cols, filas) {
  const t = tex(512, 512, (x, w, h) => { x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.fillStyle = NAV; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rr(x, i * 256 + 9, j * 256 + 9, 238, 238, 12); });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(cols, filas); return t;
}

// ================= LA BURBUJA DEL RECORDATORIO (forma única) =================
const BX0 = -0.5, BX1 = 0.5, BY0 = -0.34, BY1 = 0.34, BR = 0.13, BD = 0.05;
const CX0 = BX0 - 0.07, CY0 = BY0 - 0.13; // la colita
function trazoBurbuja(p, mx = (x) => x, my = (y) => y) {
  p.moveTo(mx(BX0 + 0.25), my(BY0)); p.lineTo(mx(BX1 - BR), my(BY0)); p.quadraticCurveTo(mx(BX1), my(BY0), mx(BX1), my(BY0 + BR));
  p.lineTo(mx(BX1), my(BY1 - BR)); p.quadraticCurveTo(mx(BX1), my(BY1), mx(BX1 - BR), my(BY1));
  p.lineTo(mx(BX0 + BR), my(BY1)); p.quadraticCurveTo(mx(BX0), my(BY1), mx(BX0), my(BY1 - BR));
  p.lineTo(mx(BX0), my(BY0 + 0.07)); p.quadraticCurveTo(mx(BX0), my(BY0 - 0.06), mx(CX0), my(CY0));
  p.quadraticCurveTo(mx(BX0 + 0.12), my(BY0 - 0.09), mx(BX0 + 0.25), my(BY0));
}
const FORMA_B = (() => { const s = new THREE.Shape(); trazoBurbuja(s); return s; })();
const bCantoGeo = new THREE.ExtrudeGeometry(FORMA_B, { depth: BD, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, curveSegments: 20 });
bCantoGeo.translate(0, 0, -BD / 2);
const BBX = [CX0 - 0.03, BX1 + 0.03], BBY = [CY0 - 0.03, BY1 + 0.03];
const bCaraGeo = (() => {
  const g = new THREE.ShapeGeometry(FORMA_B, 20); const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) - BBX[0]) / (BBX[1] - BBX[0]), (p.getY(i) - BBY[0]) / (BBY[1] - BBY[0]));
  return g;
})();
const BPX = [1024, Math.round((1024 * (BBY[1] - BBY[0])) / (BBX[1] - BBX[0]))];
const bx = (x) => ((x - BBX[0]) / (BBX[1] - BBX[0])) * BPX[0], by = (y) => ((BBY[1] - y) / (BBY[1] - BBY[0])) * BPX[1];
const IXb0 = bx(BX0), IXb1 = bx(BX1), IY0 = by(BY1), IY1 = by(BY0); // el rectángulo útil en píxeles
function tildeDoble(x, X, Y, s, col = VERD) {
  x.strokeStyle = col; x.lineWidth = s * 0.16; x.lineCap = "round"; x.lineJoin = "round";
  for (const d of [0, s * 0.42]) { x.beginPath(); x.moveTo(X + d, Y); x.lineTo(X + d + s * 0.3, Y + s * 0.3); x.lineTo(X + d + s * 0.85, Y - s * 0.35); x.stroke(); }
}
function boton(x, X, Y, w, h, txt, lleno) {
  x.fillStyle = lleno ? VER : "#ffffff"; rr(x, X, Y, w, h, h / 2);
  x.strokeStyle = NAV0; x.lineWidth = 9; x.beginPath(); x.roundRect(X, Y, w, h, h / 2); x.stroke();
  x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 800, 66, w - 40); x.fillText(txt, X + w / 2, Y + h / 2 + 3);
}
function dibujarBurbuja(x, kind, n = 0, esp = false) {
  const [w, h] = BPX;
  x.clearRect(0, 0, w, h);
  // con espejo la geometría está dada vuelta y la textura también (repeat -1): la forma se dibuja espejada y el texto
  // derecho, corrido al rectángulo espejado
  const IX0 = esp ? w - IXb1 : IXb0, IX1 = esp ? w - IXb0 : IXb1;
  x.beginPath(); trazoBurbuja(x, esp ? (X) => w - bx(X) : bx, by); x.closePath();
  x.fillStyle = kind === "ruben" ? "#e3f7d4" : "#fbfaf4"; x.fill();
  x.lineWidth = 30; x.strokeStyle = NAV0; x.lineJoin = "round"; x.stroke();
  const L = IX0 + 70, R = IX1 - 60, T = IY0 + 40;
  x.textAlign = "left"; x.textBaseline = "alphabetic"; x.fillStyle = NAV0;
  const hora = (s) => { x.fillStyle = "#5b6070"; x.font = F(600, 44); x.textAlign = "right"; x.fillText(s, R - 120, IY1 - 42); tildeDoble(x, R - 98, IY1 - 62, 56); x.textAlign = "left"; };
  if (kind === "dentista") {
    x.fillStyle = NAV0; ajustar(x, "Mañana 9:30", 900, 118, R - L); x.fillText("Mañana 9:30", L, T + 108);
    x.font = F(700, 70); x.fillText("Dentista · Te esperamos.", L, T + 205, R - L);
    x.font = F(700, 70); x.fillText("¿Confirmás?", L, T + 290);
    boton(x, L, T + 330, 200, 104, "Sí", true); boton(x, L + 230, T + 330, 320, 104, "Cambiar", false);
    hora("18:00");
  } else if (kind === "turno") {
    x.fillStyle = NAV0; ajustar(x, "Martes 9:30", 900, 150, R - L); x.fillText("Martes 9:30", L, T + 150);
    x.fillStyle = ROJ; x.font = F(900, 150); x.fillText("Dentista", L, T + 330);
    hora("18:00");
  } else if (kind === "cuota") {
    x.fillStyle = NAV0; ajustar(x, "Tu cuota vence", 900, 130, R - L); x.fillText("Tu cuota vence", L, T + 140);
    x.fillStyle = VERD; x.font = F(900, 150); x.fillText("en 3 días", L, T + 320);
    hora("9:00");
  } else if (kind === "pedido") {
    x.fillStyle = NAV0; ajustar(x, "Graciela, tu pedido", 900, 104, R - L); x.fillText("Graciela, tu pedido", L, T + 100);
    x.font = F(900, 104); x.fillText("está listo.", L, T + 205);
    x.font = F(700, 62); x.fillText("Te esperamos hasta las 20.", L, T + 290, R - L);
    boton(x, L, T + 325, 250, 110, "Voy", n > 0);
    hora("19:41");
  } else if (kind === "ruben") {
    x.fillStyle = NAV0; x.font = F(800, 66); x.fillText("Almacén de Rubén", L, T + 70);
    x.fillStyle = NAV0; ajustar(x, "Tu pedido", 900, 130, R - L); x.fillText("Tu pedido", L, T + 200);
    x.font = F(900, 130); x.fillText("está listo.", L, T + 330);
    hora("19:41");
  } else if (kind === "fin") {
    const cx = (IX0 + IX1) / 2, cy = (IY0 + IY1) / 2 - 10;
    x.fillStyle = VER; x.beginPath(); x.arc(cx, cy, 160, 0, 7); x.fill(); x.lineWidth = 18; x.strokeStyle = NAV0; x.stroke();
    x.strokeStyle = NAV0; x.lineWidth = 46; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - 75, cy + 5); x.lineTo(cx - 18, cy + 62); x.lineTo(cx + 85, cy - 62); x.stroke();
  }
}
const bCantoM = mat(C.navy, 0.45);
function hacerBurbuja(kind = "dentista", espejo = false) {
  const g = new THREE.Group(); const giro = new THREE.Group(); g.add(giro);
  const cuerpo = new THREE.Group(); giro.add(cuerpo); if (espejo) cuerpo.scale.x = -1;
  cuerpo.add(mesh(bCantoGeo, bCantoM));
  const c = document.createElement("canvas"); c.width = BPX[0]; c.height = BPX[1];
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (espejo) { t.wrapS = THREE.RepeatWrapping; t.repeat.x = -1; t.offset.x = 1; }
  const fm = new THREE.MeshStandardMaterial({ map: t, roughness: 0.6, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.22, transparent: true, alphaTest: 0.5 });
  cuerpo.add(mesh(bCaraGeo, fm, 0, 0, BD / 2 + 0.0135));
  g.userData = { giro, c, t, clave: "", espejo };
  ponerBurbuja(g, kind);
  sh(g); scene.add(g); return g;
}
function ponerBurbuja(g, kind, n = 0) {
  const k = kind + "|" + n; if (g.userData.clave === k) return; g.userData.clave = k;
  dibujarBurbuja(g.userData.c.getContext("2d"), kind, n, g.userData.espejo);
  g.userData.t.needsUpdate = true;
}

// ================= EL CELULAR (un solo modelo: el de Rubén, los chicos de las cuotas y el de Graciela) =================
const CW = 0.09, CH = 0.186, CD = 0.011, SWp = 0.0835, SHp = 0.174;
const PPX = [512, Math.round((512 * SHp) / SWp)];
function dibujarPantalla(x, titulo, sub = "en línea") {
  const [w, h] = PPX;
  x.fillStyle = "#f3f1e6"; x.fillRect(0, 0, w, h);
  // patrón de chat muy suave
  x.fillStyle = "#e9e6d8"; for (let i = 0; i < 9; i++) for (let j = 0; j < 18; j++) if ((i + j) % 3 === 0) { x.beginPath(); x.arc(30 + i * 56, 230 + j * 56, 6, 0, 7); x.fill(); }
  x.fillStyle = NAV0; x.fillRect(0, 0, w, 200);
  const hora = titulo === "Consultorio" ? "18:00" : titulo === "Financiera" ? "9:00" : "19:41";
  x.fillStyle = CRE; x.font = F(700, 40); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(hora, 28, 36);
  x.fillStyle = VER; x.beginPath(); x.arc(90, 125, 52, 0, 7); x.fill();
  const ini = titulo.startsWith("Almacén") ? "R" : titulo === "Financiera" ? "$" : "";
  if (ini) { x.fillStyle = NAV0; x.font = F(900, 62); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(ini, 90, 129); }
  x.fillStyle = CRE; x.textAlign = "left"; ajustar(x, titulo, 800, 60, w - 175); x.fillText(titulo, 160, 110);
  x.fillStyle = VER; x.font = F(700, 40); x.fillText(sub, 160, 162);
  // barra para escribir
  x.fillStyle = "#ffffff"; rr(x, 20, h - 92, w - 120, 70, 35); x.fillStyle = VER; x.beginPath(); x.arc(w - 55, h - 57, 36, 0, 7); x.fill();
}
function hacerCelu(titulo) {
  const g = new THREE.Group();
  g.add(mesh(rbox(CW, CH, CD, 0.012), mat(C.navy2, 0.35)));
  g.add(mesh(rbox(0.028, 0.028, 0.004, 0.006), M.navy, -0.022, 0.06, -0.0062));
  const c = document.createElement("canvas"); c.width = PPX[0]; c.height = PPX[1];
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  const pm = new THREE.MeshStandardMaterial({ map: t, roughness: 0.35, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.3 });
  const p = mesh(new THREE.PlaneGeometry(SWp, SHp), pm, 0, 0, CD / 2 + 0.0006); g.add(p);
  // muesca de la cámara
  g.add(mesh(rbox(0.022, 0.0045, 0.002, 0.002), M.navy, 0, SHp / 2 - 0.0035, CD / 2 + 0.0012));
  g.userData = { c, t, clave: "" };
  ponerPantalla(g, titulo);
  sh(g); p.castShadow = false; scene.add(g); return g;
}
function ponerPantalla(g, titulo, sub) {
  const k = titulo + "|" + sub; if (g.userData.clave === k) return; g.userData.clave = k;
  dibujarPantalla(g.userData.c.getContext("2d"), titulo, sub); g.userData.t.needsUpdate = true;
}
// pantalla: coordenadas locales del celular para una burbuja de ancho bw (centro en (dx, dy) de la pantalla)
const EN_PANT = (dx, dy) => V(dx, dy, CD / 2 + 0.0035);
// la muela 3D (avatar del consultorio): corona con cúspides y dos raíces
function hacerMuela() {
  const g = new THREE.Group();
  const esm = new THREE.MeshPhysicalMaterial({ color: 0xfbf8ee, roughness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.2 });
  // corona ancha con la parte de arriba apenas ondulada (una sola pieza) y dos raíces cortas y romas
  const corona = mesh(rbox(1.0, 0.62, 0.8, 0.26, 5), esm, 0, 0.16, 0); g.add(corona);
  const surco = mesh(rbox(0.1, 0.1, 0.62, 0.04, 2), mat(0xe2ddcc, 0.4), 0, 0.46, 0); g.add(surco);
  for (const s of [-1, 1]) { const r = mesh(new THREE.CapsuleGeometry(0.15, 0.22, 6, 14), esm, s * 0.24, -0.25, 0); r.rotation.z = s * 0.12; g.add(r); }
  // brillo navy de contorno (que recorte sobre el verde)
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}
// rayitas de vibración (dos arcos a cada lado), en el plano del celular
function hacerVib() {
  const v = new THREE.Group();
  const gm = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.7 });
  const nm = new THREE.MeshStandardMaterial({ color: C.navy, roughness: 0.5 });
  for (const s of [-1, 1]) for (const k of [0, 1]) {
    const a = mesh(new THREE.TorusGeometry(0.06 + k * 0.016, 0.0055, 8, 20, 0.9), gm); // solo verdes, pegados al celular a.rotation.set(0, 0, s > 0 ? -0.5 : Math.PI - 0.5); v.add(a);
  }
  scene.add(v); return v;
}

// ================= ZONA A: el almacén de Rubén =================
const MOST = { y: 0.95, z: 0, d: 0.72, w: 3.0 };
const almacen = new THREE.Group(); scene.add(almacen);
const RZ = -0.66;
const RX10 = 0.0; // en s10 Rubén queda en el hueco entre las bolsas
{
  // piso de baldosas crema
  const pis = tex(512, 512, (x, w, h) => { x.fillStyle = "#cfcdbf"; x.fillRect(0, 0, w, h); x.fillStyle = "#dedccf"; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rr(x, i * 256 + 5, j * 256 + 5, 246, 246, 8); });
  pis.wrapS = pis.wrapT = THREE.RepeatWrapping; pis.repeat.set(16 / 0.7, 10 / 0.7);
  const piso = mesh(new THREE.PlaneGeometry(16, 10), new THREE.MeshStandardMaterial({ map: pis, roughness: 0.85 }), 0, 0, 2); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; almacen.add(piso);
  // pared del fondo: crema arriba, azulejos navy claro hasta 1,25
  const ZP = -2.0;
  almacen.add(mesh(new THREE.PlaneGeometry(16, 4.2), mat(C.cr, 0.9), 0, 2.1, ZP));
  const az = texAzulejos(16 / 0.32, 1.25 / 0.32);
  const zoc = mesh(new THREE.PlaneGeometry(16, 1.25), new THREE.MeshStandardMaterial({ map: az, roughness: 0.5 }), 0, 0.625, ZP + 0.005); zoc.receiveShadow = true; almacen.add(zoc);
  almacen.add(mesh(new THREE.BoxGeometry(16, 0.06, 0.04), M.navy, 0, 1.26, ZP + 0.02));
  // estantería verde con productos (sobre los azulejos)
  const verde = mat(0x4fb81a, 0.55);
  const EX0 = -1.75, EX1 = 1.75, EZ = ZP + 0.22;
  for (const x of [EX0, EX1, 0]) almacen.add(mesh(rbox(0.07, 2.0, 0.4, 0.015), verde, x, 1.0 + 0.32, EZ));
  for (const y of [0.4, 1.32, 1.82, 2.32]) almacen.add(mesh(rbox(EX1 - EX0 + 0.1, 0.05, 0.42, 0.015), verde, 0, y, EZ));
  almacen.add(mesh(new THREE.BoxGeometry(EX1 - EX0, 1.9, 0.02), mat(0xe4e2d4, 0.9), 0, 1.4, ZP + 0.02));
  let s = 11; const azar = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const fab = [crearYerba, crearFideos, crearGalletitas, crearDulceDeLeche];
  const colores = [C.g, C.cr, C.red, 0xd9a441, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  for (const y of [1.345, 1.845, 2.345]) {
    for (let x = EX0 + 0.14; x < EX1 - 0.12; ) {
      const k = azar();
      let o, ancho;
      if (k < 0.5) { o = fab[Math.floor(azar() * fab.length)](); o.scale.setScalar(1.15); ancho = (o.userData.tam?.[0] ?? 0.16) * 1.15; }
      else { const c = colores[Math.floor(azar() * colores.length)]; o = new THREE.Group(); o.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 14), mat(c, 0.35), 0, 0.1, 0)); o.add(mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.035, 14), M.cr, 0, 0.215, 0)); ancho = 0.13; }
      if (Math.abs(x + ancho / 2) < 0.06 || x + ancho > EX1 - 0.08 || (y < 2 && y > 1.8 && x + ancho > -0.98 && x < -0.44)) { x += 0.08; continue; }
      o.position.set(x + ancho / 2, y, EZ + 0.02); o.rotation.y = (azar() - 0.5) * 0.25; almacen.add(o);
      x += ancho + 0.03 + azar() * 0.04;
    }
  }
  // cajones de verdura abajo
  for (const x of [-1.2, -0.4, 0.4, 1.2]) { almacen.add(mesh(rbox(0.6, 0.28, 0.36, 0.02), mat(0xb98a5a, 0.8), x, 0.14 + 0.02, EZ + 0.02)); for (let i = 0; i < 5; i++) almacen.add(mesh(new THREE.SphereGeometry(0.06, 12, 10), mat([C.red, 0xd9a441, 0x7a9c3a][(i + Math.round(x * 3)) % 3], 0.5), x - 0.2 + i * 0.1, 0.32, EZ + 0.05)); }
  // mostrador: frente navy con guarda verde, tapa de madera clara
  const vetas = tex(1024, 256, (x, w, h) => {
    x.fillStyle = "#d9b88d"; x.fillRect(0, 0, w, h);
    let sd = 3; const az = () => ((sd = (sd * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 46; i++) { const y = az() * h; x.strokeStyle = az() < 0.5 ? "rgba(150,105,60,0.35)" : "rgba(255,240,215,0.35)"; x.lineWidth = 2 + az() * 5; x.beginPath(); x.moveTo(0, y); for (let k = 1; k <= 8; k++) x.lineTo((k * w) / 8, y + Math.sin(k * 1.3 + i) * 7); x.stroke(); }
    x.fillStyle = "rgba(120,80,45,0.5)"; for (let k = 1; k < 4; k++) x.fillRect((k * w) / 4 - 2, 0, 4, h);
  });
  const tapaM = new THREE.MeshStandardMaterial({ map: vetas, roughness: 0.5 });
  const tablas = tex(1024, 512, (x, w, h) => {
    x.fillStyle = "#a8774a"; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 12; i++) { x.fillStyle = i % 2 ? "#b4824f" : "#a06f44"; x.fillRect((i * w) / 12 + 3, 0, w / 12 - 6, h); x.fillStyle = "rgba(70,45,25,0.6)"; x.fillRect((i * w) / 12, 0, 4, h); }
  });
  const frenteM = new THREE.MeshStandardMaterial({ map: tablas, roughness: 0.7 });
  almacen.add(mesh(rbox(MOST.w, MOST.y - 0.04, MOST.d - 0.08, 0.03), [frenteM, frenteM, frenteM, frenteM, frenteM, frenteM], 0, (MOST.y - 0.04) / 2, MOST.z));
  almacen.add(mesh(rbox(MOST.w + 0.12, 0.06, MOST.d, 0.02), [M.madera, M.madera, tapaM, M.madera, M.madera, M.madera], 0, MOST.y - 0.03, MOST.z));
  almacen.add(mesh(rbox(MOST.w - 0.2, 0.06, 0.02, 0.01), M.g, 0, 0.45, MOST.z + MOST.d / 2 - 0.035));
  // la vidriera de la derecha: luz cálida de la tarde
  sh(almacen);
}
// el reloj de pared: 19:40
const reloj = new THREE.Group(); almacen.add(reloj);
{
  const t = tex(512, 512, (x, w) => {
    x.fillStyle = "#fbfaf4"; x.beginPath(); x.arc(256, 256, 250, 0, 7); x.fill();
    x.lineWidth = 26; x.strokeStyle = NAV0; x.beginPath(); x.arc(256, 256, 236, 0, 7); x.stroke();
    x.fillStyle = NAV0; for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; x.save(); x.translate(256 + Math.sin(a) * 190, 256 - Math.cos(a) * 190); x.rotate(a); x.fillRect(-7, -22, 14, 44); x.restore(); }
    const mano = (a, L, W, col) => { x.save(); x.translate(256, 256); x.rotate(a); x.fillStyle = col; rr(x, -W / 2, -L, W, L + 24, W / 2); x.restore(); };
    mano(((7 + 40 / 60) / 12) * Math.PI * 2, 120, 26, NAV0); mano((40 / 60) * Math.PI * 2, 175, 18, NAV0);
    x.fillStyle = VER; x.beginPath(); x.arc(256, 256, 22, 0, 7); x.fill();
  });
  reloj.add(mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.05, 40).rotateX(Math.PI / 2), M.navy));
  const cara = mesh(new THREE.CircleGeometry(0.235, 40), new THREE.MeshStandardMaterial({ map: t, roughness: 0.5, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.15 }), 0, 0, 0.027); reloj.add(cara);
  reloj.position.set(-0.7, 1.845 + 0.19, -1.74); reloj.scale.setScalar(0.68);
}
// ---- el celular de Rubén (en el mostrador) con LA burbuja del dentista y la muela ----
const celuR = hacerCelu("Consultorio");
const CELR = V(0.95, MOST.y + 0.012, 0.12);
const muelaR = hacerMuela(); celuR.add(muelaR); muelaR.position.set(-SWp / 2 + 0.0145, SHp / 2 - 0.0215, CD / 2 + 0.006); muelaR.scale.setScalar(0.0145); muelaR.rotation.x = 0.5;
const bDent = hacerBurbuja("dentista"); celuR.add(bDent); // la del gancho (vive en el celular)
const BESC = 0.074; // escala de la burbuja en la pantalla
const bRub = hacerBurbuja("ruben", true); celuR.add(bRub); // s11: la de Rubén, del otro lado
const vibR = hacerVib();
const mateM = crearMate(); scene.add(mateM); mateM.scale.setScalar(1.25);
const termo = crearTermo(); scene.add(termo); termo.scale.setScalar(1.25);
// la mano de Rubén (s01): antebrazo, mano de juguete y la manga crema
const manoR = new THREE.Group(); scene.add(manoR);
{
  const piel = mat(0xdba57f, 0.55);
  const ante = mesh(new THREE.CapsuleGeometry(0.034, 0.26, 8, 16), piel, 0, 0, 0.18); ante.rotation.x = Math.PI / 2; manoR.add(ante);
  const palma = mesh(new THREE.SphereGeometry(0.05, 20, 14), piel, 0, 0, 0); palma.scale.set(1.05, 0.6, 1.15); manoR.add(palma);
  const pulgar = mesh(new THREE.CapsuleGeometry(0.015, 0.035, 6, 10), piel, -0.042, 0.012, -0.02); pulgar.rotation.set(0.4, 0, 0.9); manoR.add(pulgar);
  const manga = mesh(new THREE.CylinderGeometry(0.052, 0.056, 0.12, 20), mat(C.cr, 0.8), 0, 0, 0.36); manga.rotation.x = Math.PI / 2; manoR.add(manga);
  sh(manoR);
}
// ---- las bolsas de encargo (papel madera doblado arriba, abrochado, con el ticket del nombre) ----
const NOMBRES = ["Graciela", "Walter", "Susana", "Héctor"];
const DIAS = ["sáb", "vie", "jue", "sáb"];
const BOLSAS = [];
{
  const kraft = mat(0xc49a63, 0.92), kraftO = mat(0xa9824f, 0.92);
  NOMBRES.forEach((nom, i) => {
    const g = new THREE.Group(); scene.add(g);
    const W = 0.24, H = 0.27, D = 0.15;
    g.add(mesh(rbox(W, H, D, 0.012, 2), kraft, 0, H / 2, 0));
    // el doblez de arriba (dos vueltas) y la abrochadora
    const d1 = mesh(rbox(W * 0.99, 0.05, 0.03, 0.008, 2), kraftO, 0, H + 0.012, 0.0); g.add(d1);
    const d2 = mesh(rbox(W * 0.99, 0.045, 0.028, 0.008, 2), kraft, 0, H - 0.005, D / 2 - 0.005); d2.rotation.x = -0.25; g.add(d2);
    g.add(mesh(new THREE.BoxGeometry(0.05, 0.007, 0.006), M.cromo, -0.05, H + 0.015, 0.018));
    g.add(mesh(new THREE.BoxGeometry(0.05, 0.007, 0.006), M.cromo, 0.05, H + 0.015, 0.018));
    for (const s of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.004, H * 0.8, 0.002), mat(0xa27a46, 0.95), s * W * 0.33, H * 0.45, D / 2 + 0.002));
    // ticket con el nombre a mano
    const c = document.createElement("canvas"); c.width = 512; c.height = 320;
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    const tk = mesh(new THREE.PlaneGeometry(0.2, 0.125), new THREE.MeshStandardMaterial({ map: t, roughness: 0.7, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.2 }), 0, H * 0.5, D / 2 + 0.004);
    g.add(tk);
    // cinta adhesiva arriba del ticket
    g.add(mesh(new THREE.BoxGeometry(0.07, 0.022, 0.002), new THREE.MeshStandardMaterial({ color: 0xf1ead2, roughness: 0.3, transparent: true, opacity: 0.8 }), 0, H * 0.5 + 0.062, D / 2 + 0.006));
    sh(g);
    BOLSAS.push({ g, c, t, nom, dia: DIAS[i], clave: "" });
  });
}
function ponerTicket(b, aviso) {
  const k = String(aviso); if (b.clave === k) return; b.clave = k;
  const x = b.c.getContext("2d"), w = 512, h = 320;
  x.fillStyle = "#fbfaf4"; x.fillRect(0, 0, w, h);
  x.lineWidth = 18; x.strokeStyle = aviso ? VERD : NAV0; x.strokeRect(9, 9, w - 18, h - 18);
  x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle";
  ajustar(x, b.nom, 700, 150, aviso ? w - 170 : w - 60, "Caveat"); x.fillText(b.nom, aviso ? w / 2 - 50 : w / 2, 135);
  x.fillStyle = "#5b6070"; x.font = F(700, 80, "Caveat"); x.fillText(b.dia, aviso ? w / 2 - 50 : w / 2, 245);
  if (aviso) {
    x.fillStyle = VER; x.beginPath(); x.arc(w - 85, 160, 62, 0, 7); x.fill(); x.lineWidth = 10; x.strokeStyle = NAV0; x.stroke();
    x.lineWidth = 18; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(w - 115, 160); x.lineTo(w - 92, 185); x.lineTo(w - 55, 135); x.stroke();
  }
  b.t.needsUpdate = true;
}
const BOLSA_P = [V(-0.44, MOST.y, 0.17), V(-0.18, MOST.y, 0.05), V(0.22, MOST.y, 0.05), V(0.48, MOST.y, 0.05)]; // hueco en el medio: se ve el cuerpo de Rubén
const BOLSA_K = 1.0;

// ================= LA BALANZA DE PLATILLOS (la grande de las cuotas y la de Rubén) =================
const BAL = { y: 1.6, L: 0.45, cuelga: 0.78 };
function hacerBalanza() {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.7, 0.08, 0.36, 0.03), M.navy2, 0, 0.04, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.06, 24), M.bronce, 0, 0.11, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.04, 0.05, BAL.y - 0.15, 24), M.navy2, 0, (BAL.y - 0.15) / 2 + 0.14, 0));
  g.add(mesh(new THREE.SphereGeometry(0.06, 20, 14), M.bronce, 0, BAL.y, 0));
  // el fiel (aguja) y su escala
  const esc = tex(256, 128, (x, w, h) => { x.fillStyle = CRE; rr(x, 0, 0, w, h, 20); x.strokeStyle = NAV0; x.lineWidth = 8; for (let i = -3; i <= 3; i++) { const a = i * 0.18; x.beginPath(); x.moveTo(128 + Math.sin(a) * 100, 118 - Math.cos(a) * 100); x.lineTo(128 + Math.sin(a) * (i ? 80 : 60), 118 - Math.cos(a) * (i ? 80 : 60)); x.stroke(); } });
  g.add(mesh(rbox(0.26, 0.14, 0.02, 0.02), M.navy2, 0, BAL.y + 0.25, -0.005)); g.add(mesh(new THREE.PlaneGeometry(0.22, 0.11), new THREE.MeshStandardMaterial({ map: esc, roughness: 0.6 }), 0, BAL.y + 0.25, 0.007));
  const brazo = new THREE.Group(); brazo.position.set(0, BAL.y, 0.06); g.add(brazo);
  brazo.add(mesh(rbox(BAL.L * 2 + 0.04, 0.05, 0.05, 0.02), M.bronce));
  const aguja = mesh(new THREE.ConeGeometry(0.018, 0.26, 12), M.navy, 0, 0.15, 0.02); brazo.add(aguja);
  for (const s of [-1, 1]) brazo.add(mesh(new THREE.SphereGeometry(0.04, 16, 12), M.bronce, s * BAL.L, 0, 0));
  const platos = [-1, 1].map((s) => {
    const p = new THREE.Group(); g.add(p);
    const perfil = [[0, 0], [0.24, 0.0], [0.32, 0.06], [0.33, 0.08]].map(([r, y]) => new THREE.Vector2(r, y));
    p.add(mesh(new THREE.LatheGeometry(perfil, 40), new THREE.MeshStandardMaterial({ color: C.bronce, roughness: 0.38, metalness: 0.75, side: THREE.DoubleSide })));
    // tres varillas al gancho
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2 + 0.5, A = V(Math.cos(a) * 0.315, 0.08, Math.sin(a) * 0.315), B = V(0, 0.76, 0);
      const L = A.distanceTo(B); const v = mesh(new THREE.CylinderGeometry(0.006, 0.006, L, 6), M.bronce);
      v.position.copy(A.clone().add(B).multiplyScalar(0.5)); v.quaternion.setFromUnitVectors(V(0, 1, 0), B.clone().sub(A).normalize()); p.add(v);
    }
    p.add(mesh(new THREE.TorusGeometry(0.025, 0.007, 8, 16), M.bronce, 0, 0.78, 0));
    p.userData.s = s; return p;
  });
  sh(g);
  g.userData = { brazo, platos };
  scene.add(g); return g;
}
// pone el brazo inclinado a (rad, + baja el plato derecho) y cuelga los platos
function ponerBalanza(b, ang) {
  b.userData.brazo.rotation.z = -ang;
  b.userData.platos.forEach((p) => { const s = p.userData.s; p.position.set(s * BAL.L * Math.cos(ang), BAL.y - s * BAL.L * Math.sin(ang) - BAL.cuelga, 0.06); });
}
const balanzaR = hacerBalanza(); // la de Rubén (zona A, chica)
const BALR = V(-1.05, MOST.y, 0.05), BALR_K = 0.3;

// ---- la moneda (canto estriado) ----
const monedaCanto = tex(256, 32, (x, w, h) => { x.fillStyle = "#c9a24a"; x.fillRect(0, 0, w, h); x.fillStyle = "#9c7a2e"; for (let i = 0; i < 64; i++) x.fillRect(i * 4, 0, 2, h); });
monedaCanto.wrapS = THREE.RepeatWrapping; monedaCanto.repeat.set(3, 1);
const monedaCara = tex(256, 256, (x) => { x.fillStyle = "#d8b25a"; x.beginPath(); x.arc(128, 128, 128, 0, 7); x.fill(); x.lineWidth = 14; x.strokeStyle = "#a8853a"; x.beginPath(); x.arc(128, 128, 100, 0, 7); x.stroke(); x.fillStyle = "#a8853a"; x.font = F(900, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("$", 128, 136); });
const monedaGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.02, 36);
const monedaM = [new THREE.MeshStandardMaterial({ map: monedaCanto, roughness: 0.35, metalness: 0.7 }), new THREE.MeshStandardMaterial({ map: monedaCara, roughness: 0.35, metalness: 0.65 }), new THREE.MeshStandardMaterial({ map: monedaCara, roughness: 0.35, metalness: 0.65 })];
const hacerMoneda = () => { const m = mesh(monedaGeo, monedaM); m.castShadow = true; scene.add(m); return m; };

// ================= ZONA D: el consultorio dental =================
const consultorio = new THREE.Group(); scene.add(consultorio);
const NS = 6, SEP = 1.55;
const SX = (i) => OD.x + (i - (NS - 1) / 2) * SEP;
{
  const pis = tex(512, 512, (x, w, h) => { x.fillStyle = "#d4d2c4"; x.fillRect(0, 0, w, h); x.fillStyle = "#e2e0d4"; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rr(x, i * 256 + 5, j * 256 + 5, 246, 246, 8); });
  pis.wrapS = pis.wrapT = THREE.RepeatWrapping; pis.repeat.set(20 / 0.8, 10 / 0.8);
  const piso = mesh(new THREE.PlaneGeometry(20, 10), new THREE.MeshStandardMaterial({ map: pis, roughness: 0.85 }), OD.x, 0, 2.5); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; consultorio.add(piso);
  const ZP = -2.3;
  consultorio.add(mesh(new THREE.PlaneGeometry(20, 4.4), mat(C.cr, 0.9), OD.x, 2.2, ZP));
  const az = texAzulejos(20 / 0.32, 1.3 / 0.32);
  const zoc = mesh(new THREE.PlaneGeometry(20, 1.3), new THREE.MeshStandardMaterial({ map: az, roughness: 0.5 }), OD.x, 0.65, ZP + 0.005); zoc.receiveShadow = true; consultorio.add(zoc);
  consultorio.add(mesh(new THREE.BoxGeometry(20, 0.06, 0.04), M.navy, OD.x, 1.31, ZP + 0.02));
  sh(consultorio);
}
const pielesP = [0xf2c9a8, 0xc28a62, 0xdba57f, 0x96613f, 0xe9b894, 0xf2c9a8], pelosP = [0x2a2220, 0xb9b6b0, 0x5a3b28, 0x1e1a18, 0xd8b56f, 0x8d8c8c];
function hacerPaciente(i) {
  // sentado y recostado en el sillón (espacio del sillón: el respaldo sube hacia -z)
  const g = new THREE.Group();
  const piel = mat(pielesP[i], 0.55), pelo = mat(pelosP[i], 0.75), ropa = mat([C.navy3, 0xefeee5, 0x2c4268, 0xd9a441, C.navy3, 0xb9b7ab][i], 0.7), pant = mat(i % 2 ? 0x3a3f4a : C.navy2, 0.7);
  // torso recostado sobre el respaldo
  const torso = mesh(new THREE.CapsuleGeometry(0.2, 0.34, 8, 16), ropa, 0, 0.82, -0.42); torso.rotation.x = -0.95; g.add(torso);
  // baberito verde
  const bab = mesh(rbox(0.3, 0.22, 0.02, 0.03), M.g, 0, 0.95, -0.33); bab.rotation.x = -0.95 + Math.PI / 2 - 1.57; bab.rotation.x = -0.62; g.add(bab);
  // piernas sobre el apoyapiernas
  for (const s of [-1, 1]) {
    const mu = mesh(new THREE.CapsuleGeometry(0.075, 0.36, 6, 12), pant, s * 0.1, 0.64, 0.05); mu.rotation.x = Math.PI / 2 - 0.12; g.add(mu);
    const pi = mesh(new THREE.CapsuleGeometry(0.068, 0.34, 6, 12), pant, s * 0.1, 0.52, 0.44); pi.rotation.x = Math.PI / 2 + 0.55; g.add(pi);
    g.add(mesh(rbox(0.12, 0.16, 0.08, 0.03), mat(0x2a2220, 0.5), s * 0.1, 0.44, 0.66));
    const br = mesh(new THREE.CapsuleGeometry(0.058, 0.36, 6, 12), ropa, s * 0.27, 0.8, -0.18); br.rotation.x = -1.2; g.add(br);
    g.add(mesh(new THREE.SphereGeometry(0.065, 14, 10), piel, s * 0.28, 0.72, 0.04));
  }
  // cabeza sobre el cabezal
  const cab = new THREE.Group(); cab.position.set(0, 1.2, -0.72); cab.rotation.x = -0.55; g.add(cab);
  cab.add(mesh(new THREE.SphereGeometry(0.2, 28, 20), piel));
  const pe = mesh(new THREE.SphereGeometry(0.212, 28, 14, 0, Math.PI * 2, 0, Math.PI * (i % 3 === 1 ? 0.36 : 0.5)), pelo, 0, 0.012, -0.015); pe.rotation.x = -0.5; cab.add(pe);
  for (const sx of [-1, 1]) {
    cab.add(mesh(new THREE.SphereGeometry(0.03, 12, 10), M.navy, sx * 0.072, 0.03, 0.176));
    cab.add(mesh(new THREE.SphereGeometry(0.01, 8, 6), M.white, sx * 0.072 + 0.009, 0.044, 0.203));
    const ce = mesh(rbox(0.066, 0.015, 0.02, 0.006), pelo, sx * 0.076, 0.095, 0.18); ce.rotation.z = sx * -0.12; cab.add(ce);
  }
  cab.add(mesh(new THREE.SphereGeometry(0.033, 12, 10), piel, 0, -0.025, 0.196));
  const boca = mesh(new THREE.TorusGeometry(0.05, 0.011, 6, 16, Math.PI), M.navy, 0, -0.07, 0.18); boca.rotation.z = Math.PI; cab.add(boca);
  g.userData.cab = cab;
  sh(g); return g;
}
function hacerSillon(i) {
  const g = new THREE.Group(); g.position.set(SX(i), 0, 0); consultorio.add(g);
  const casco = mat(0xf4f3ec, 0.4), tapiz = mat(0x2c4268, 0.75);
  g.add(mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.05, 32), M.navy2, 0, 0.025, -0.05));
  g.add(mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.42, 20), casco, 0, 0.26, -0.05));
  // asiento
  g.add(mesh(rbox(0.62, 0.1, 0.6, 0.04), casco, 0, 0.5, -0.05));
  g.add(mesh(rbox(0.56, 0.08, 0.56, 0.04), tapiz, 0, 0.58, -0.05));
  // respaldo recostado (sube hacia -z)
  const resp = new THREE.Group(); resp.position.set(0, 0.56, -0.32); resp.rotation.x = -0.95; g.add(resp);
  resp.add(mesh(rbox(0.6, 0.09, 0.8, 0.04), casco, 0, 0.0, -0.4));
  resp.add(mesh(rbox(0.54, 0.07, 0.76, 0.04), tapiz, 0, 0.07, -0.4));
  // cabezal
  const cabz = mesh(rbox(0.32, 0.1, 0.26, 0.05), tapiz, 0, 1.12, -0.86); cabz.rotation.x = -0.55; g.add(cabz);
  // apoyapiernas (baja hacia +z)
  const ap = new THREE.Group(); ap.position.set(0, 0.56, 0.24); ap.rotation.x = 0.5; g.add(ap);
  ap.add(mesh(rbox(0.6, 0.09, 0.7, 0.04), casco, 0, -0.02, 0.33));
  ap.add(mesh(rbox(0.54, 0.07, 0.66, 0.04), tapiz, 0, 0.05, 0.33));
  // apoyabrazos
  for (const s of [-1, 1]) g.add(mesh(rbox(0.09, 0.06, 0.5, 0.025), casco, s * 0.36, 0.72, -0.15));
  // poste de la lámpara (detrás), brazo articulado y la lámpara
  const poste = mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.9, 14), casco, 0.42, 0.95, -1.15); g.add(poste);
  const lamp = new THREE.Group(); lamp.position.set(0.42, 1.9, -1.15); g.add(lamp);
  const b1 = mesh(rbox(0.06, 0.06, 0.62, 0.025), casco, 0, 0, 0.31); lamp.add(b1);
  const codo = new THREE.Group(); codo.position.set(0, 0, 0.62); lamp.add(codo);
  codo.add(mesh(new THREE.SphereGeometry(0.045, 14, 10), M.navy2));
  const b2 = mesh(rbox(0.05, 0.05, 0.5, 0.022), casco, -0.0, 0, 0.25); codo.add(b2); codo.rotation.set(0.75, -0.75, 0);
  const cabeza = new THREE.Group(); cabeza.position.set(0, 0, 0.5); codo.add(cabeza);
  cabeza.add(mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.09, 32), casco));
  const foco = mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.02, 32), new THREE.MeshStandardMaterial({ color: 0xcfd6dc, roughness: 0.3, emissive: 0xfff6d6, emissiveIntensity: 0 }), 0, -0.05, 0); cabeza.add(foco);
  cabeza.rotation.x = -0.9;
  // bandejita con espejito
  const ban = new THREE.Group(); ban.position.set(-0.5, 0.95, 0.05); g.add(ban);
  ban.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 10), casco, 0.0, -0.2, 0));
  ban.add(mesh(rbox(0.32, 0.03, 0.22, 0.012), casco, 0, 0.0, 0));
  const esp = mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.16, 6), M.cromo, -0.05, 0.025, 0); esp.rotation.z = Math.PI / 2 - 0.2; ban.add(esp);
  ban.add(mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.006, 16), M.cromo, -0.13, 0.03, 0));
  const pinza = mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.15, 6), M.cromo, 0.06, 0.025, 0.05); pinza.rotation.z = Math.PI / 2 + 0.3; ban.add(pinza);
  // el paciente y el cartelito "Faltó"
  const pac = hacerPaciente(i); g.add(pac);
  const cart = new THREE.Group(); cart.position.set(0, 0.88, 0.05); g.add(cart);
  const caraF = tex(512, 320, (x, w, h) => { x.fillStyle = ROJ; rr(x, 0, 0, w, h, 40); x.lineWidth = 16; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(8, 8, w - 16, h - 16, 34); x.stroke(); x.fillStyle = "#fbfaf4"; x.font = F(900, 150); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Faltó", w / 2, h / 2 + 8); });
  const caraV = tex(512, 320, (x, w, h) => { x.fillStyle = VER; rr(x, 0, 0, w, h, 40); x.lineWidth = 16; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(8, 8, w - 16, h - 16, 34); x.stroke(); x.strokeStyle = NAV0; x.lineWidth = 46; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(w / 2 - 80, h / 2); x.lineTo(w / 2 - 20, h / 2 + 60); x.lineTo(w / 2 + 90, h / 2 - 70); x.stroke(); });
  const pl = (t, ry) => { const m = mesh(new THREE.PlaneGeometry(0.5, 0.31), new THREE.MeshStandardMaterial({ map: t, roughness: 0.6, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.18 }), 0, 0, ry ? -0.011 : 0.011); m.rotation.y = ry; return m; };
  const giroC = new THREE.Group(); cart.add(giroC);
  giroC.add(mesh(rbox(0.52, 0.33, 0.018, 0.04), M.navy)); giroC.add(pl(caraF, 0)); giroC.add(pl(caraV, Math.PI));
  sh(g);
  return { g, pac, foco, cart, giroC, lamp, codo, cabeza, poste };
}
const SILLONES = Array.from({ length: NS }, (_, i) => hacerSillon(i));
const VACIOS = [4, 2, 0], LLENA = [4, 2]; // la primera burbuja va al más cercano; queda vacío el del fondo
const QS = 3; // el sillón cuya lámpara se vuelve "?"
const bVuela = [hacerBurbuja("dentista"), hacerBurbuja("dentista"), hacerBurbuja("dentista")];
const celuD = hacerCelu("Consultorio"); // el celular del consultorio, de donde salen las burbujas
// el "?" verde (bisagra)
const preguntaM = mat(C.g, 0.38, { emissive: C.g, emissiveIntensity: 0.16 });
const preguntaGeo = textoGeo("?", 0.95, 0.3);
const preguntaBordeM = new THREE.MeshBasicMaterial({ color: C.navy, side: THREE.BackSide });
function hacerPregunta() { const g = new THREE.Group(); const a = mesh(preguntaGeo, preguntaM); a.castShadow = true; g.add(a); const b = mesh(preguntaGeo, preguntaBordeM); b.scale.set(1.04, 1.03, 1.15); g.add(b); scene.add(g); return g; }
const pregunta = hacerPregunta();
const pregunta2 = hacerPregunta();
let QK = 0.51; const QDY = 0.15; // escala del "?" a 1,9 de la cámara para que mida lo mismo en pantalla que el del consultorio // el del corte a Rubén (mismo encuadre)

// ================= LA NUBE DE RUBÉN (de por-que-el-mozo) =================
const nubeM = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.55, clearcoat: 0.3, emissive: 0xefeee5, emissiveIntensity: 0.12 });
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
function hacerCajon() {
  const g = new THREE.Group(); const m = mat(0xb98a5a, 0.8);
  for (const [w, h, d, x, y, z] of [[0.5, 0.04, 0.32, 0, 0.02, 0], [0.5, 0.2, 0.03, 0, 0.12, 0.15], [0.5, 0.2, 0.03, 0, 0.12, -0.15], [0.03, 0.2, 0.32, 0.24, 0.12, 0], [0.03, 0.2, 0.32, -0.24, 0.12, 0]]) g.add(mesh(new THREE.BoxGeometry(w, h, d), m, x, y, z));
  for (let i = 0; i < 6; i++) g.add(mesh(new THREE.SphereGeometry(0.075, 14, 10), mat([C.red, 0xd9a441, 0x7a9c3a][i % 3], 0.5), -0.16 + (i % 3) * 0.16, 0.22, i < 3 ? -0.06 : 0.07));
  return g;
}
function hacerBilletes() {
  const g = new THREE.Group();
  const bt = tex(512, 256, (x, w, h) => { x.fillStyle = "#cfe3bf"; x.fillRect(0, 0, w, h); x.lineWidth = 12; x.strokeStyle = VERD; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = VERD; x.beginPath(); x.arc(w / 2, h / 2, 62, 0, 7); x.fill(); x.fillStyle = "#cfe3bf"; x.font = F(900, 80); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("$", w / 2, h / 2 + 4); x.fillStyle = NAV0; x.font = F(900, 60); x.fillText("100", 80, 60); });
  const bm = new THREE.MeshStandardMaterial({ map: bt, roughness: 0.8 });
  for (let i = 0; i < 4; i++) { const b = mesh(new THREE.BoxGeometry(0.5, 0.012, 0.25), [M.cr, M.cr, bm, M.cr, M.cr, M.cr], (i % 2) * 0.03, i * 0.013, i * 0.01); b.rotation.y = i * 0.12; g.add(b); }
  return g;
}
const nubeR = hacerNube(-1);
const papelito = hacerBurbuja("turno"); // el turno del dentista (achicado), cae de la nube
const NUBE_ITEMS = [{ o: hacerCajon(), k: 0.36, p: [-0.3, 0.12], rx: 0.5 }, { o: hacerBilletes(), k: 0.42, p: [0.22, 0.17], rx: 1.0 }, { o: crearYerba(), k: 0.9, p: [0.36, -0.12], rx: 0.2 }].map((it) => {
  const h = new THREE.Group(); h.add(it.o); it.o.scale.setScalar(it.k); it.o.rotation.set(it.rx, 0.3, 0); nubeR.userData.items.add(h); it.h = h; return it;
});

// ================= ZONA P: la tarjeta de cuotas, las monedas y la balanza =================
const sombraP = pisoSombra(OP.x, 0, 10, 10, 0.18);
const TJ = { w: 1.0, h: 0.68 };
const tarjeta = new THREE.Group(); scene.add(tarjeta);
const CASILLA = (k) => { const c = k % 4, f = Math.floor(k / 4); return V(-TJ.w / 2 + 0.09 + 0.115 + c * 0.235 - 0.02, TJ.h / 2 - 0.2 - f * 0.165, 0); };
{
  const t = tex(1024, Math.round((1024 * TJ.h) / TJ.w), (x, w, h) => {
    x.fillStyle = "#f3eedb"; x.fillRect(0, 0, w, h);
    x.fillStyle = NAV0; x.fillRect(0, 0, w, 120); x.fillStyle = CRE; x.font = F(900, 74); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Préstamo · cuotas", 44, 64);
    for (let k = 0; k < 12; k++) {
      const p = CASILLA(k); const cx = ((p.x + TJ.w / 2) / TJ.w) * w, cy = ((TJ.h / 2 - p.y) / TJ.h) * h;
      x.fillStyle = "#ffffff"; rr(x, cx - 105, cy - 72, 210, 144, 18); x.lineWidth = 7; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(cx - 105, cy - 72, 210, 144, 18); x.stroke();
      x.fillStyle = NAV0; x.font = F(700, 40); x.textAlign = "center"; x.fillText("Cuota", cx, cy - 30); x.font = F(900, 58); x.fillText(String(k + 1), cx, cy + 28);
    }
  });
  const fm = new THREE.MeshStandardMaterial({ map: t, roughness: 0.8, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.15 });
  const cart = mesh(rbox(TJ.w, TJ.h, 0.014, 0.03), [M.cr2, M.cr2, M.cr2, M.cr2, fm, M.cr2]); tarjeta.add(cart);
  sh(tarjeta);
}
// el atril (caballete de madera) donde está apoyada la tarjeta
const atril = new THREE.Group(); scene.add(atril);
{
  const mad = mat(0xb98a5a, 0.7);
  for (const s of [-1, 1]) { const p = mesh(rbox(0.045, 1.05, 0.045, 0.015), mad, s * 0.36, 0.5, -0.06); p.rotation.z = s * 0.1; p.rotation.x = 0.1; atril.add(p); }
  const tr = mesh(rbox(0.045, 1.05, 0.045, 0.015), mad, 0, 0.5, -0.2); tr.rotation.x = -0.28; atril.add(tr);
  atril.add(mesh(rbox(1.04, 0.04, 0.12, 0.015), mad, 0, 0.3, 0.06));
  sh(atril);
}
const tildesT = Array.from({ length: 12 }, () => hacerTilde(0.034, tarjeta));
const celuC = hacerCelu("Financiera"); // el celular chico de los avisos
const bCuota = hacerBurbuja("cuota"); celuC.add(bCuota);
const minis = Array.from({ length: 5 }, () => hacerBurbuja("cuota"));
const papelP = hacerBurbuja("turno");
const MONP = 8; // monedas de la pila
const monedas = Array.from({ length: MONP }, hacerMoneda);
const balanza = hacerBalanza();
const bPlato = hacerBurbuja("cuota");
// "-25 %" en 3D (sin glifo de menos en la fuente: una barrita)
const num25 = new THREE.Group(); scene.add(num25);
{
  const nm = mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.18 });
  const g25 = textoGeo("25 %", 0.2, 0.07); g25.computeBoundingBox(); const X25 = g25.boundingBox.min.x - 0.07;
  const tx = mesh(g25, nm); tx.castShadow = true; num25.add(tx);
  num25.add(mesh(rbox(0.1, 0.035, 0.07, 0.012), nm, X25, 0.01, 0));
  // borde navy
  const bm = new THREE.MeshBasicMaterial({ color: C.navy, side: THREE.BackSide });
  const b1 = mesh(textoGeo("25 %", 0.2, 0.07), bm); b1.scale.set(1.025, 1.04, 1.2); num25.add(b1);
  const b2 = mesh(rbox(0.116, 0.05, 0.085, 0.012), bm, X25, 0.01, 0); num25.add(b2);
}
// etiqueta "intereses" colgada de la pila
const etiInt = new THREE.Group(); scene.add(etiInt);
{
  const t = tex(512, 192, (x, w, h) => { x.fillStyle = "#fbfaf4"; rr(x, 0, 0, w, h, 30); x.lineWidth = 14; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(7, 7, w - 14, h - 14, 26); x.stroke(); x.fillStyle = NAV0; x.font = F(900, 92); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("intereses", w / 2, h / 2 + 4); });
  etiInt.add(mesh(rbox(0.36, 0.135, 0.012, 0.03), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: t, roughness: 0.6, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.15 }), M.navy]));
  sh(etiInt);
}
num25.traverse((o) => (o.castShadow = false)); etiInt.traverse((o) => (o.castShadow = false));


// ================= ZONA G: Graciela en la vereda =================
const vereda = new THREE.Group(); scene.add(vereda);
{
  const vt = tex(512, 512, (x, w, h) => { x.fillStyle = "#c9c6b8"; x.fillRect(0, 0, w, h); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#d3d0c2" : "#cbc8b9"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122); } });
  vt.wrapS = vt.wrapT = THREE.RepeatWrapping; vt.repeat.set(10 / 1.2, 6 / 1.2);
  const v = mesh(new THREE.PlaneGeometry(10, 6), new THREE.MeshStandardMaterial({ map: vt, roughness: 0.9 }), OG.x, 0, 1); v.rotation.x = -Math.PI / 2; v.receiveShadow = true; vereda.add(v);
  // fachada crema con zócalo de azulejos navy claro, puerta navy y una maceta
  vereda.add(mesh(new THREE.PlaneGeometry(10, 4.5), mat(C.cr, 0.9), OG.x, 2.25, -1.6));
  const az = texAzulejos(10 / 0.32, 1.0 / 0.32);
  vereda.add(mesh(new THREE.PlaneGeometry(10, 1.0), new THREE.MeshStandardMaterial({ map: az, roughness: 0.5 }), OG.x, 0.5, -1.595));
  vereda.add(mesh(rbox(1.1, 2.3, 0.1, 0.03), M.navy3, OG.x - 1.3, 1.15, -1.55));
  vereda.add(mesh(new THREE.SphereGeometry(0.04, 12, 8), M.bronce, OG.x - 0.9, 1.1, -1.48));
  vereda.add(mesh(rbox(1.0, 1.1, 0.08, 0.03), M.cr2, OG.x + 1.2, 1.75, -1.56));
  vereda.add(mesh(rbox(0.86, 0.96, 0.04, 0.02), mat(0x3a4a66, 0.3), OG.x + 1.2, 1.75, -1.51));
  const mac = new THREE.Group(); mac.position.set(OG.x + 0.75, 0, -1.2); vereda.add(mac);
  mac.add(mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.35, 20), mat(0xb5603f, 0.8), 0, 0.175, 0));
  for (const [x, y, z, r] of [[0, 0.55, 0, 0.22], [0.12, 0.7, 0.05, 0.15], [-0.12, 0.66, -0.02, 0.16]]) mac.add(mesh(new THREE.IcosahedronGeometry(r, 1), mat(0x3f8a2a, 0.85, { flatShading: true }), x, y, z));
  sh(vereda);
}
const celuG = hacerCelu("Almacén de Rubén");
const bPed = hacerBurbuja("pedido"); celuG.add(bPed);
const vibG = hacerVib();

// ---- los personajes ----
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 3.3, ojoDibujo: true }); scene.add(ruben.raiz);
const graciela = crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 2.9, ojoDibujo: true }); scene.add(graciela.raiz);
for (const p of [graciela, ruben]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
// la chismosa de Graciela (bolsa de feria a rayas)
const chismosa = new THREE.Group(); scene.add(chismosa);
{
  const rayas = tex(256, 256, (x) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? CRE : "#2c4268"; x.fillRect(i * 32, 0, 32, 256); } });
  chismosa.add(mesh(rbox(0.26, 0.24, 0.1, 0.03), new THREE.MeshStandardMaterial({ map: rayas, roughness: 0.85 }), 0, -0.14, 0));
  const asa = mesh(new THREE.TorusGeometry(0.08, 0.01, 8, 20, Math.PI), mat(0x6b3f2e, 0.7), 0, -0.02, 0); chismosa.add(asa);
  sh(chismosa);
}

// ================= EL CIERRE =================
const bFin = hacerBurbuja("fin");
const sombraF = sombra(1.2, 0.5, 0.5);

// ================= TIEMPOS CLAVE =================
const T = {
  dentista: W[3], mensaje: W[7] - 0.04, antes: W[10] - 0.04,
  s02: S["s02-faltan"], mensaje2: W[14] - 0.05, falta: W[15] - 0.05, menos: W[16] - 0.05, gente: W[17],
  s03: S["s03-por-que"], que: W[19],
  s04: S["s04-olvide"], razon: W[21], faltan: W[27], olvide: W[29] - 0.05,
  s05: S["s05-plata"], pasa: W[32], turnos: W[36],
  s06: S["s06-cuotas"], estudio: W[38], prestamos: W[40], aviso: W[42] - 0.05, cuota: W[46],
  s07: S["s07-balanza"], tanto: W[48] - 0.05, cuarto: W[52] - 0.05, intereses: W[55] - 0.05,
  s08: S["s08-encargos"], ruben: W[60], olvido: W[62], encargo: W[66] - 0.05,
  s09: S["s09-aviso"], sistema: W[69] - 0.05, avisa: W[70], solo: W[71], tu: W[72], listo: W[75],
  s10: S["s10-pasa"], graciela: W[77], pasaG: W[78],
  s11: S["s11-local"], clientes: W[81], olviden: W[84], agenda: W[85],
  fin: S["s12-llamada"],
};
T.zamb = T.s02 - 0.45; // la burbuja despega del celular hacia cámara
T.corteG = T.sistema + 0.62; // corte a Graciela (la burbuja llena el cuadro)
T.mateR = T.listo + 0.12; // contraplano: Rubén con el mate
T.vibG = T.corteG + 0.35;

// ================= CÁMARA =================
// PLANOS: [desde, [[t, px, py, pz, mx, my, mz, fov], ...]]; dentro de un plano, Hermite monótona; entre planos, corte.
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const d = (x, y, z) => [OD.x + x, y, z];
const pp = (x, y, z) => [OP.x + x, y, z];
// dónde nace el "?" del consultorio: en la cabeza de la lámpara del sillón QS (un poco arriba y adelante)
const QC = (() => { const s = SILLONES[QS]; s.g.updateMatrixWorld(true); const p = s.cabeza.getWorldPosition(new THREE.Vector3()); return [p.x, p.y + 0.2, p.z + 0.2]; })();
const gg = (x, y, z) => [OG.x + x, y, z];
const CR_ = [CELR.x, CELR.y, CELR.z];
const cr = (x, y, z) => [CELR.x + x, CELR.y + y, CELR.z + z];
const PLANOS = [
  // s01: picado del celular de Rubén en el mostrador; push-in lento; en "antes" el celular sube hacia cámara
  ["A1", 0, [
    k(0, cr(0.0, 0.4, 0.17), cr(0.0, 0.0, -0.05)),
    k(T.antes, cr(0.0, 0.37, 0.15), cr(0.0, 0.01, -0.05)),
    k(T.s02, cr(0.0, 0.35, 0.16), cr(0.0, 0.0, -0.05)),
  ]],
  // s02: la burbuja grande en primer plano, travelling atrás: la fila de sillones. s03: push-in a la lámpara del medio
  ["D", T.s02, [
    k(T.s02, d(6.0, 3.0, 5.6), d(0.2, 1.0, -0.3)),
    k(T.s02 + 1.0, d(7.0, 4.1, 7.6), d(-1.45, 0.75, -0.5)),
    k(T.s03 - 0.35, d(6.9, 4.05, 7.4), d(-1.45, 0.75, -0.5)),
    k(T.s03 - 0.02, [QC[0] + 0.7, QC[1] + 0.1, QC[2] + 2.5], [QC[0], QC[1] - 0.12, QC[2]]),
    k(T.s04, [QC[0] + 0.62, QC[1] + 0.1, QC[2] + 2.38], [QC[0], QC[1] - 0.12, QC[2]]),
  ]],
  // s04: corte a Rubén (el "?" en el mismo lugar de la pantalla), el "?" se vuelve nube
  ["A4", T.s04, [
    k(T.s04, [0.3, 1.98, 3.3], [0.28, 1.85, RZ]),
    k(T.s04 + 0.6, [0.32, 1.97, 3.9], [0.3, 1.85, RZ]),
    k(T.s05, [0.3, 1.95, 3.7], [0.3, 1.83, RZ]),
  ]],
  // s05-s07: crema liso: el papelito se vuelve la tarjeta, las monedas; push-in; atrás: la balanza
  ["P", T.s05, [
    k(T.s05, pp(-0.1, 0.95, 3.8), pp(-0.1, 0.6, 0)),
    k(T.s06, pp(-0.08, 1.0, 3.7), pp(-0.08, 0.68, 0)),
    k(T.s06 + 1.4, pp(-0.06, 0.98, 3.35), pp(-0.06, 0.7, 0)),
    k(T.s07 - 0.45, pp(-0.06, 0.98, 3.3), pp(-0.06, 0.7, 0)),
    k(T.s07 + 0.02, pp(0.0, 1.32, 5.3), pp(0.0, 1.15, -0.2)),
    k(T.s08 - 0.5, pp(0.0, 1.3, 5.05), pp(0.0, 1.15, -0.2)),
    k(T.s08, pp(0.0, 1.25, 4.3), pp(0.0, 1.1, -0.2)),
  ]],
  // s08: la balanza de Rubén en el mostrador (mismo encuadre) y grúa atrás y arriba: el almacén, las bolsas
  ["A8", T.s08, [
    k(T.s08, [0.03, 2.05, 3.8], [0.03, 1.45, -0.25]),
    k(T.s09 - 0.05, [0.03, 1.95, 3.25], [0.03, 1.42, -0.25]),
  ]],
  // s09: corte seco al ticket de Graciela y push-in corto; la burbuja sale hacia cámara
  ["A9", T.s09, [
    k(T.s09, [-0.47, 1.36, 1.45], [-0.44, 1.08, 0.17]),
    k(T.corteG, [-0.46, 1.32, 1.12], [-0.44, 1.08, 0.17]),
  ]],
  // s09: Graciela en la vereda con el celular; push-in hasta que el celular llena el cuadro
  ["G", T.corteG, [
    k(T.corteG, gg(0.0, 1.35, 3.4), gg(0.0, 1.2, 0)),
    k(T.vibG + 0.3, gg(0.0, 1.33, 3.1), gg(0.0, 1.18, 0)),
    k(T.tu - 0.08, gg(0.0, 1.32, 2.95), gg(0.0, 1.17, 0)),
  ]],
  // corte seco al primer plano del celular (la cámara no cruza la cara)
  ["G", T.tu - 0.08, [
    { rel: [T.tu - 0.08, 0.0, 0.26, 0.56, 0.0, 0.035] },
    { rel: [T.mateR, 0.0, 0.25, 0.48, 0.0, 0.035] },
  ]],
  // contraplano: Rubén con el mate (no toca nada)
  ["AR", T.mateR, [
    k(T.mateR, [0.75, 2.05, 2.3], [0.1, 1.55, RZ]),
    k(T.s10, [0.7, 2.02, 2.15], [0.1, 1.55, RZ]),
  ]],
  // s10: Graciela entra al almacén y Rubén le alcanza la bolsa
  ["A10", T.s10, [
    k(T.s10, [-0.36, 2.15, 5.4], [-0.44, 1.2, 0.0]),
    k(T.s11, [-0.36, 2.12, 5.15], [-0.44, 1.2, 0.0]),
  ]],
  // s11: el celular de Rubén otra vez: las dos burbujas iguales
  ["A11", T.s11, [
    k(T.s11, cr(0.0, 0.4, 0.22), cr(0.0, 0.0, -0.01)),
    k(T.fin, cr(0.0, 0.35, 0.19), cr(0.0, 0.0, -0.01)),
  ]],
  ["F", T.fin, [
    k(T.fin, [OF.x, 0.75, 3.4], [OF.x, 0.85, 0]),
    k(DUR, [OF.x, 0.75, 3.2], [OF.x, 0.85, 0]),
  ]],
];
const _mira = new THREE.Vector3();
let plano = "A1";
let CELG_P = null;
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++;
  plano = PLANOS[pi][0];
  let K = PLANOS[pi][2];
  if (K.some((q) => q.rel)) {
    if (!CELG_P) { const pl = plano; plano = "G"; zonaG(T.listo); celuG.updateMatrixWorld(true); CELG_P = celuG.getWorldPosition(new THREE.Vector3()); plano = pl; }
    K = K.map((q) => (q.rel ? [q.rel[0], CELG_P.x + q.rel[1], CELG_P.y + q.rel[2] + q.rel[4], CELG_P.z + q.rel[3], CELG_P.x, CELG_P.y + q.rel[4] + (q.rel[5] ?? 0), CELG_P.z, 34] : q));
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
  const amp = plano === "A1" || plano === "A11" ? 0.0006 : 0.003;
  camera.position.x += Math.sin(t * 0.7) * amp; camera.position.y += Math.sin(t * 0.53) * amp;
  _mira.set(v[3], v[4], v[5]);
  camera.fov = v[6];
  const dd = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.01, dd * 0.02); camera.far = 260;
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

// ================= ZONA A en el tiempo =================
const _v = new THREE.Vector3(), _q = new THREE.Quaternion();
const enA = () => plano[0] === "A";
function zonaA(t) {
  const en = enA();
  almacen.visible = en;
  celuR.visible = plano === "A1" || plano === "A11";
  for (const o of [mateM, termo, vibR, manoR, balanzaR, ruben.raiz, graciela.raiz, chismosa, nubeR, papelito, pregunta2]) o.visible = en;
  BOLSAS.forEach((b) => (b.g.visible = en));
  luzVidriera.intensity = 0;
  if (!en) return;
  luzVidriera.position.set(1.8, 1.9, 1.2); luzVidriera.intensity = 2.2;
  // ---- el celular de Rubén ----
  {
    // s01: apoyado, vibra en "mensaje"; en "antes" la mano lo levanta hacia cámara
    const lev = 0; // ronda 1: el celular ya no sube (la línea guía queda en el borde de la burbuja)
    const vb = plano === "A1" ? vibra(t, T.mensaje) : plano === "A11" ? vibra(t, T.s11 + 0.12) : 0;
    celuR.position.copy(CELR).add(V(vb * 0.003, lev * 0.012, lev * 0.012));
    celuR.rotation.set(-Math.PI / 2 + lev * 0.18, 0, 0.17 + vb * 0.03 - lev * 0.05);
    // la burbuja del dentista (pop en "mensaje"); en s01 se despega hacia cámara al final
    const sale = plano === "A1" ? eio(sg(t, T.zamb, T.s02)) : 0;
    const kB = plano === "A1" ? 1 + 0.12 * pulso(t, T.mensaje, 0.3) : 1;
    if (plano === "A11") {
      ponerBurbuja(bDent, "dentista");
      if (bDent.parent !== celuR) celuR.add(bDent);
      bDent.position.copy(EN_PANT(0.002, 0.034)); bDent.scale.setScalar(BESC); bDent.quaternion.identity(); bDent.visible = true;
      const kR = popIn(t, T.s11 + 0.2, 0.3);
      bRub.visible = kR > 0.01; bRub.position.copy(EN_PANT(-0.002, -0.034)); bRub.scale.setScalar(BESC * kR); bRub.quaternion.identity();
      muelaR.visible = true;
      ponerPantalla(celuR, "Mensajes", "hoy");
    } else {
      ponerPantalla(celuR, "Consultorio", "en línea");
      bRub.visible = false; muelaR.visible = plano === "A1";
      bDent.visible = plano === "A1" && kB > 0.01;
      if (bDent.visible) {
        if (sale > 0) {
          // sale del celular y vuela hacia cámara, creciendo
          if (bDent.parent !== scene) scene.add(bDent);
          celuR.updateMatrixWorld(true);
          const desde = celuR.localToWorld(EN_PANT(0.0, 0.01));
          const hasta = delante(0.19, 0, 0.0);
          bDent.position.copy(lerpV(desde, hasta, sale));
          celuR.getWorldQuaternion(_q); bDent.quaternion.copy(_q).slerp(camera.quaternion, sale);
          bDent.scale.setScalar(lerp(BESC, 0.05, sale));
        } else {
          if (bDent.parent !== celuR) celuR.add(bDent);
          bDent.position.copy(EN_PANT(0.0, 0.01)); bDent.quaternion.identity(); bDent.scale.setScalar(BESC * kB);
        }
      }
    }
    vibR.visible = (plano === "A1" && t > T.mensaje && t < T.mensaje + 0.5) || (plano === "A11" && t > T.s11 + 0.12 && t < T.s11 + 0.62);
    if (vibR.visible) { celuR.updateMatrixWorld(true); vibR.position.copy(celuR.localToWorld(V(0, 0, 0.004))); celuR.getWorldQuaternion(vibR.quaternion); const a0 = plano === "A1" ? T.mensaje : T.s11 + 0.12; vibR.scale.setScalar(0.88 * (1 + 0.08 * Math.sin((t - a0) * 30))); }
  }
  // ---- la mano de Rubén (solo en s01, entra en "antes") ----
  {
    const u = plano === "A1" ? eio(sg(t, T.antes - 0.35, T.antes + 0.05)) : 0;
    manoR.visible = false;
    if (manoR.visible) {
      celuR.updateMatrixWorld(true);
      const borde = celuR.localToWorld(V(CW / 2 + 0.018, -0.03, -0.004));
      manoR.position.copy(borde).add(V(lerp(0.3, 0, u), 0, lerp(0.1, 0, u)));
      manoR.rotation.set(0.1, Math.PI / 2 + 0.35, 0);
    }
  }
  // ---- mate y termo apoyados (s01, s11); en el resto Rubén tiene el mate en la mano ----
  const mateApoyado = plano === "A1" || plano === "A11";
  termo.position.set(CELR.x + 0.3, MOST.y, CELR.z - 0.22); termo.rotation.set(0, 0.4, 0);
  termo.visible = true;
  // ---- Rubén ----
  ruben.raiz.visible = !(plano === "A1" || plano === "A11" || plano === "A9");
  if (ruben.raiz.visible) {
    const aC = (g) => ({ x: 0.08, y: 0, z: RZ, giro: g });
    let pr = poseEn(t, [
      [0, { ...aC(0), ...CARA.neutra, manoD: [-0.3, 0.32, 0.36], manoI: [0.24, 0.42, 0.34], codoI: [0.9, -0.5, -0.2], cabeza: { giro: 0.0, asiente: 0.05, ladea: 0.04 }, ojos: { x: 0, y: 0, abiertos: 1 }, cejas: { alto: 0.1, ang: 0.2 }, boca: { sonrisa: 0.0, ancho: 0.9 } }],
      // la nube se llena: mira arriba, pensando
      [T.razon + 0.2, { cabeza: { giro: 0.12, asiente: -0.12, ladea: 0.06 }, ojos: { x: 0.45, y: 0.7, abiertos: 1 }, cejas: { alto: 0.45, ang: 0.45 }, boca: { sonrisa: -0.1, ancho: 0.8 } }, 0.35],
      // «me olvidé»: se rasca la cabeza (la mano al costado de arriba, sin entrar), cejas preocupadas
      [T.olvide + 0.3, { cabeza: { giro: 0.0, asiente: 0.05, ladea: -0.12 }, ojos: { x: -0.2, y: 0.2, abiertos: 0.9 }, cejas: { alto: 0.55, ang: 0.85, asim: 0.4 }, boca: { sonrisa: -0.45, abierta: 0.1, ancho: 0.8 } }, 0.3],
      
      // s08: mira las bolsas, suspira
      [T.s08 + 0.1, { ...aC(0), manoD: [-0.3, 0.32, 0.36], codoD: null, cabeza: { giro: -0.15, asiente: 0.3, ladea: 0.05 }, ojos: { x: -0.3, y: -0.55, abiertos: 0.95 }, cejas: { alto: 0.2, ang: 0.6 }, boca: { sonrisa: -0.35, ancho: 0.9 } }, 0.05],
      [T.olvido, { inclina: 0.03, cabeza: { giro: -0.1, asiente: 0.22, ladea: 0.08 }, ojos: { x: -0.2, y: -0.55, abiertos: 0.9, tension: 0.4 }, cejas: { alto: 0.35, ang: 0.8 }, boca: { sonrisa: -0.55 } }, 0.5],
      [T.encargo + 0.3, { inclina: 0.0, cabeza: { giro: 0.0, asiente: 0.15, ladea: 0.05 }, ojos: { x: 0, y: -0.3, abiertos: 0.9 }, cejas: { alto: 0.3, ang: 0.6 }, boca: { sonrisa: -0.3 } }, 0.3],
      // contraplano: tranquilo, con el mate, ojos achinados
      [T.mateR, { ...CARA.sonrisa, manoI: [0.3, 0.4, 0.42], codoI: [1, -0.5, -0.2], cabeza: { giro: 0.05, asiente: 0.02, ladea: 0.1 }, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0 }, cejas: { alto: 0.25, ang: 0 } }, 0.05],
      // s10: le alcanza la bolsa a Graciela (con la derecha) y levanta el mate
      [T.s10 + 0.05, { giro: 0, cabeza: { giro: -0.22, asiente: 0.05, ladea: 0.04 }, ojos: { x: -0.5, y: 0.0, abiertos: 1, feliz: 0.2 }, ...CARA.sonrisa, manoI: [0.24, 0.42, 0.34] }, 0.05],
      [T.graciela + 0.05, { manoD: [-0.42, 0.6, 0.95], codoD: [-0.9, -0.5, -0.1] }, 0.3],
      [T.pasaG + 0.35, { manoI: [0.28, 0.52, 0.42], codoI: [1, -0.5, -0.2], cabeza: { giro: -0.1, asiente: 0.0, ladea: 0.08 }, ojos: { x: -0.2, feliz: 0.6, guiño: 0.8 } }, 0.3],
    ]);
    // s10: se corre hacia donde está Graciela
    const va = eio(sg(t, T.s10 - 0.05, T.s10 + 0.4));
    if (plano === "A10") { pr.x = lerp(0.08, RX10, va); }
    pr.t = t;
    // «me olvidé»: la mano derecha va a rascarse el costado de la cabeza (objetivo calculado sobre la cabeza real)
    const rasca = plano === "A4" ? eio(sg(t, T.olvide, T.olvide + 0.3)) : 0;
    if (rasca > 0) {
      ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
      const h = ruben.cabeza.getWorldPosition(new THREE.Vector3()).add(V(-0.2, 0.13 + Math.sin(t * 22) * 0.012 * rasca, 0.03));
      ruben.cuerpo.worldToLocal(h);
      pr.manoD = pr.manoD.map((v, i) => lerp(v, [h.x, h.y, h.z][i], rasca)); pr.codoD = [-1, -0.2, -0.1];
    }
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
  }
  // el mate: en la mano izquierda de Rubén (o apoyado)
  mateM.visible = plano !== "A9";
  if (mateApoyado) { mateM.position.set(CELR.x - 0.2, MOST.y, CELR.z - 0.16); mateM.rotation.set(0, 0.6, 0); }
  else { ruben.mano("I").getWorldPosition(_v); mateM.position.copy(_v).add(V(0.0, -0.075, 0.025)); mateM.rotation.set(0, 0.3 + Math.PI, 0.25); }
  // ---- la nube (s04): el "?" se achica y se vuelve nube con las cosas del día; el papelito del turno se cae ----
  {
    const v = plano === "A4";
    pregunta2.visible = v && t < T.s04 + 0.5;
    if (pregunta2.visible) {
      // mismo lugar de pantalla que el "?" del consultorio, y se va a la nube
      const u = eio(sg(t, T.s04 + 0.02, T.s04 + 0.4));
      const desde = delante(1.9, 0, QDY);
      ruben.cabeza.getWorldPosition(_v);
      const hasta = _v.clone().add(V(0.6, 0.7, 0.25));
      const p = lerpV(desde, hasta, u); p.y += Math.sin(Math.PI * u) * 0.25; p.x += Math.sin(Math.PI * u) * 0.12;
      pregunta2.position.copy(p); pregunta2.quaternion.copy(camera.quaternion);
      pregunta2.scale.setScalar(lerp(QK, 0.16, eo(sg(t, T.s04 + 0.02, T.s04 + 0.22))));
    }
    const kn = v ? popIn(t, T.s04 + 0.3, 0.3) : 0;
    nubeR.visible = kn > 0.01;
    if (nubeR.visible) {
      ruben.cabeza.getWorldPosition(_v);
      nubeR.position.copy(_v).add(V(0.6, 0.7, 0.25)); nubeR.quaternion.copy(camera.quaternion);
      nubeR.scale.setScalar(kn * 0.48 * (1 + 0.02 * Math.sin(t * 5)));
      NUBE_ITEMS.forEach((it, i) => {
        const ki = popIn(t, T.s04 + 0.55 + i * 0.22, 0.25);
        // en "olvidé" se aprietan hacia el centro-abajo (empujan al papelito)
        const emp = eio(sg(t, T.olvide - 0.15, T.olvide + 0.2));
        it.h.position.set(it.p[0] * (1 - 0.25 * emp), it.p[1] - 0.06 * emp, 0.02); it.h.scale.setScalar(ki * (1 + 0.12 * emp));
        it.o.rotation.y = 0.3 + Math.sin(t * 1.6 + i) * 0.25;
      });
    }
    // el papelito del turno: entra primero a la nube, en "olvidé" sale empujado y cae girando
    papelito.visible = v && t > T.s04 + 0.45;
    if (papelito.visible) {
      const ki = popIn(t, T.s04 + 0.45, 0.3);
      nubeR.updateMatrixWorld(true);
      const enNube = nubeR.localToWorld(V(-0.02, -0.08, 0.3));
      const cae = sg(t, T.olvide, T.s05);
      const u = eio(cl(cae * 1.6));
      const fuera = nubeR.localToWorld(V(0.95, -0.15, 0.3));
      let p = lerpV(enNube, fuera, u);
      p.y -= cae * cae * 1.6;
      papelito.position.copy(p);
      papelito.quaternion.copy(camera.quaternion);
      papelito.userData.giro.rotation.set(0, cae * 2.2, cae * 3.0);
      papelito.scale.setScalar(ki * lerp(0.15, 0.2, cae));
    }
  }
  // ---- la balanza de Rubén (desde s08) ----
  balanzaR.visible = false;
  balanzaR.position.copy(BALR); balanzaR.scale.setScalar(BALR_K); balanzaR.rotation.y = 0;
  ponerBalanza(balanzaR, rebote(t, T.s08, 2.5, 7, 0.06));
  // ---- Graciela entra al almacén (s10) ----
  graciela.raiz.visible = plano === "A10";
  chismosa.visible = graciela.raiz.visible;
  if (graciela.raiz.visible) {
    const camina = eio(sg(t, T.s10 - 0.2, T.graciela + 0.1));
    let pg = poseEn(t, [
      [0, { x: lerp(-0.98, -0.84, camina), y: 0, z: 0.8, giro: 0.3, paso: 1 - camina, ...BRAZOS.costado, ...CARA.sonrisa, cabeza: { giro: 0.15, asiente: 0.0, ladea: 0.04 }, ojos: { x: 0.5, y: 0, abiertos: 1 } }],
      [T.graciela + 0.25, { paso: 0, manoI: [0.24, 0.44, 0.46], codoI: [0.8, -0.6, -0.1], ...CARA.sonrisa, ojos: { x: 0.5, y: 0, abiertos: 1, feliz: 0.2 }, cabeza: { giro: 0.12, asiente: -0.05, ladea: 0.06 } }, 0.3],
    ]);
    pg.x = lerp(-0.98, -0.84, camina); pg.z = 0.8; pg.paso = (1 - camina) > 0.05 ? 1 : 0;
    pg.t = t; graciela.poner(pg); graciela.raiz.updateMatrixWorld(true);
    graciela.mano("D").getWorldPosition(_v); chismosa.position.copy(_v).add(V(0, 0.02, 0)); chismosa.rotation.set(0, 0.3, 0);
  }
  // ---- las bolsas (pop de a una en "encargo"); los tickets se prenden en "sistema" (Graciela) y en s10 (los demás) ----
  BOLSAS.forEach((b, i) => {
    const t0 = T.ruben + 0.02 + i * 0.13;
    const ki = t < T.s08 ? 0 : t < t0 ? 0 : popIn(t, t0, 0.28);
    // Graciela se lleva la suya en s10
    // la de Graciela: Rubén la levanta (va a su mano) y se la pasa a la mano de ella
    const levanta = i === 0 && plano === "A10" ? eio(sg(t, T.graciela - 0.12, T.graciela + 0.15)) : 0;
    const pasa = i === 0 && plano === "A10" ? eio(sg(t, T.graciela + 0.2, T.graciela + 0.5)) : 0;
    b.g.visible = b.g.visible && ki > 0.01;
    let p = BOLSA_P[i].clone();
    if (levanta > 0) {
      // Rubén se la desliza por el mostrador hasta el borde, del lado de ella, y ella la levanta
      p = lerpV(p, V(-0.5, MOST.y, 0.3), levanta);
      if (pasa > 0) { const mG = graciela.mano("I").getWorldPosition(new THREE.Vector3()).add(V(0, -0.26, 0.0)); p = lerpV(p, mG, pasa); }
    }
    b.g.position.copy(p); b.g.rotation.set(0, (i - 1.5) * -0.08, 0); b.g.scale.setScalar(ki * BOLSA_K);
    const avisado = i === 0 ? t > T.sistema : t > T.graciela + 0.62 + (i - 1) * 0.15;
    ponerTicket(b, avisado);
    b.g.scale.multiplyScalar(1 + 0.08 * pulso(t, T.encargo - 0.1 + i * 0.1, 0.25));
    if (i > 0) b.g.scale.multiplyScalar(1 + 0.1 * pulso(t, T.graciela + 0.62 + (i - 1) * 0.15, 0.25));
    else b.g.scale.multiplyScalar(1 + 0.1 * pulso(t, T.sistema, 0.25));
  });
  // ---- la burbuja del pedido sale del ticket de Graciela hacia cámara (s09) ----
  {
    const v = (plano === "A8" || plano === "A9") && t > T.sistema + 0.05;
    bPed.visible = v;
    if (v) {
      if (bPed.parent !== scene) scene.add(bPed);
      ponerBurbuja(bPed, "pedido", 0);
      const u = eio(sg(t, T.sistema + 0.05, T.corteG));
      BOLSAS[0].g.updateMatrixWorld(true);
      const desde = BOLSAS[0].g.localToWorld(V(0, 0.42, 0.06));
      bPed.position.copy(lerpV(desde, delante(0.5, 0, -0.35), u)); bPed.quaternion.copy(camera.quaternion);
      bPed.scale.setScalar(lerp(0.05, 0.14, u));
    }
  }
}

// ================= ZONA D en el tiempo =================
function zonaD(t) {
  const en = plano === "D";
  consultorio.visible = en; celuD.visible = false; pregunta.visible = false;
  bVuela.forEach((b) => (b.visible = false));
  if (!en) return;
  // las burbujas: la primera llega grande en primer plano (de la zambullida) y vuela al sillón 1; las otras dos detrás
  bVuela.forEach((b, j) => {
    const s = SILLONES[VACIOS[j]];
    const t0 = T.s02 + 0.05 + (j ? 0.75 + (j - 1) * 0.3 : 0), t1 = t0 + 0.7;
    const u = eio(sg(t, t0, t1));
    const vive = t < t1 + (j === 2 ? 99 : 0.12);
    b.visible = vive && (j === 0 || t > t0 - 0.05);
    if (!b.visible) return;
    const destino = s.g.position.clone().add(V(0, 1.45, 0.15));
    const desde = j === 0 ? delante(0.95, 0.0, 0.05) : delante(1.6, j === 1 ? 0.35 : -0.35, -0.5);
    b.position.copy(arco(desde, destino, u, 0.08));
    b.quaternion.copy(camera.quaternion);
    const k0 = j === 0 ? 0.25 : popIn(t, t0 - 0.05, 0.25) * 0.2;
    // al llegar se achica y "entra" (sillones 1 y 3); la del 5 se queda flotando chica
    const entra = j < 2 ? 1 - eio(sg(t, t1 - 0.05, t1 + 0.12)) : 1;
    b.scale.setScalar(Math.max(0.001, lerp(k0, 0.42, u) * (j === 0 ? 1 - 0.45 * Math.sin(Math.PI * u) : 1) * entra)); // la primera se achica en vuelo (no sale del cuadro)
    if (j === 2) b.position.y += Math.sin((t - t1) * 3) * 0.03 * sg(t, t1, t1 + 0.3);
  });
  SILLONES.forEach((s, i) => {
    const vacio = VACIOS.includes(i);
    const j = VACIOS.indexOf(i);
    const tl = T.s02 + 0.05 + (j ? 0.75 + (j - 1) * 0.3 : 0) + 0.7;
    const llena = LLENA.includes(i) && t > tl;
    s.pac.visible = (!vacio || llena) && !(i === QS && t > T.s03 - 0.3);
    s.pac.scale.setScalar(vacio ? popIn(t, tl, 0.3) : 1);
    // el cartelito "Faltó": se da vuelta a tilde verde cuando llega el paciente
    s.cart.visible = vacio;
    if (vacio) {
      const fl = LLENA.includes(i) ? eio(sg(t, tl - 0.02, tl + 0.3)) : 0;
      s.giroC.rotation.set(0, Math.PI * fl, 0);
      // de frente a cámara (gira en y hacia la cámara)
      s.cart.lookAt(camera.position.x, s.cart.getWorldPosition(_v).y, camera.position.z);
      // ocupado: sube por encima del paciente
      s.cart.position.set(0, lerp(0.88, 0.98, fl), lerp(0.05, 1.08, fl));
      s.cart.scale.setScalar((1 + 0.15 * pulso(t, tl, 0.3)) * (1 - eio(sg(t, T.s03 - 0.2, T.s03 + 0.1)) * (fl > 0.5 ? 1 : 0)));
    }
    // lámparas: se prenden en "menos" (las de los ocupados)
    const on = s.pac.visible && t > T.menos + i * 0.04 ? 1 : 0;
    s.foco.material.emissiveIntensity = on * 1.6;
  });
  // ---- s03: la lámpara del medio (sillón 2) se dobla en el "?" ----
  {
    const s = SILLONES[QS];
    const u = eio(sg(t, T.s03 - 0.14, T.s03 + 0.06));
    s.cabeza.scale.setScalar(Math.max(0.001, 1 - u)); s.lamp.visible = u < 0.98; s.lamp.scale.setScalar(Math.max(0.001, 1 - u)); s.poste.visible = u < 0.5;
    const kq = t < T.s03 - 0.14 ? 0 : lerp(0.0, 1, bk(sg(t, T.s03 - 0.14, T.s03 + 0.2))) * (1 + 0.08 * pulso(t, T.que, 0.3));
    pregunta.visible = kq > 0.01;
    if (pregunta.visible) {
      pregunta.position.set(QC[0], QC[1], QC[2]);
      pregunta.quaternion.copy(camera.quaternion);
      pregunta.rotateY(Math.sin((t - T.s03) * 2.4) * 0.25);
      pregunta.scale.setScalar(kq * 0.7);
    }
  }
}

// ================= ZONA P en el tiempo =================
const TJP = () => V(OP.x - 0.12, 0.66, 0); // centro de la tarjeta (parada en el piso, apenas inclinada)
const MONB = () => V(OP.x - 0.28, 0, 0.3);             // la pila de monedas
function zonaP(t) {
  const en = plano === "P";
  for (const o of [tarjeta, celuC, balanza, num25, etiInt, sombraP, atril]) o.visible = en;
  if (!en) return;
  const c = OP;
  // al final de s07 la cámara se acerca a la balanza y lo que está encima se achica (en el almacén la balanza está vacía)
  const achica = t < T.s08 - 0.03 ? 1 : 0;
  // ---- el papelito cae y se da vuelta de canto: del otro lado es la tarjeta ----
  const giro = sg(t, T.s05 + 0.45, T.s05 + 0.62);
  // al empezar s07 la tarjeta, el atril y el celular se achican en su lugar (rápido) y recién después aparece la balanza
  const vaT = t < T.s07 ? 0 : 1; // la tarjeta se va de golpe cuando aparece la balanza (sin restos achicándose)
  const ryT = Math.PI / 2 * (1 - eio(sg(giro, 0.5, 1)));
  tarjeta.visible = giro > 0.5 && vaT < 0.98;
  const kAt = t < T.s05 + 0.6 ? 0 : popIn(t, T.s05 + 0.6, 0.22);
  atril.visible = vaT < 0.98 && kAt > 0.01;
  atril.position.set(OP.x - 0.12, 0, -0.04); atril.rotation.y = 0; atril.scale.setScalar(Math.max(0.001, (1 - vaT) * kAt));
  tarjeta.position.copy(TJP()).add(V(0, -vaT * 0.3, 0));
  tarjeta.rotation.set(-0.1, ryT, 0);
  tarjeta.scale.setScalar(Math.max(0.001, 1 - vaT) * (1 + 0.04 * pulso(t, T.prestamos, 0.3)));
  const papel = papelP;
  papel.visible = giro < 0.5;
  if (papel.visible) {
    ponerBurbuja(papel, "turno");
    const caeU = eo(sg(t, T.s05 - 0.05, T.s05 + 0.4));
    papel.position.copy(TJP()).add(V(0.05, lerp(0.3, 0.0, caeU), 0.05));
    papel.quaternion.identity(); papel.userData.giro.rotation.set(0, Math.PI / 2 * eio(sg(giro, 0, 0.5)), (1 - caeU) * 0.5);
    papel.scale.setScalar(0.85);
  }
  // ---- los tildes en los casilleros: 0..4 con los avisos (s06), 5..11 al alejarse (s07) ----
  const tAv = (kk) => T.aviso + 0.1 + kk * 0.28;
  tildesT.forEach((tk, kk) => {
    const t0 = kk < 5 ? tAv(kk) + 0.3 : T.s07 - 0.3 + (kk - 5) * 0.03;
    ocultar(tk, t > t0 ? popIn(t, t0, 0.22) : 0);
    tk.position.copy(CASILLA(kk)).add(V(0.09, 0.06, 0.03));
  });
  // ---- el celular chico: asoma desde abajo en "un aviso" y suelta las burbujas ----
  {
    const sube = eio(sg(t, T.aviso - 0.4, T.aviso));
    celuC.visible = sube > 0.01 && vaT < 0.98;
    celuC.position.set(c.x + 0.22, lerp(-0.3, 0.3, sube), 0.55); celuC.rotation.set(-0.12, -0.3, 0.06 + vibra(t, T.aviso) * 0.05);
    celuC.scale.setScalar(2.0 * Math.max(0.001, 1 - vaT));
    bCuota.position.copy(EN_PANT(0, 0.0)); bCuota.scale.setScalar(BESC * popIn(t, T.aviso - 0.05, 0.3)); bCuota.quaternion.identity();
    ponerPantalla(celuC, "Financiera", "en línea");
    minis.forEach((m, kk) => {
      const a = tAv(kk), b = a + 0.32;
      m.visible = t > a && t < b + 0.02 && t < T.s07;
      if (!m.visible) return;
      const u = eio(sg(t, a, b));
      celuC.updateMatrixWorld(true);
      const desde = celuC.localToWorld(V(0, CH / 2 + 0.03, 0.01)); // nacen arriba del celular, no encima de su burbuja
      tarjeta.updateMatrixWorld(true);
      const hasta = tarjeta.localToWorld(CASILLA(kk).add(V(0, 0, 0.05)));
      m.position.copy(arco(desde, hasta, u, 0.12)); m.quaternion.copy(camera.quaternion);
      m.scale.setScalar(lerp(0.1, 0.08, u) * Math.min(1, u * 6) * (1 - eio(sg(u, 0.85, 1)) * 0.9));
    });
  }
  // ---- la balanza: arranca inclinada hacia las monedas y en "tanto" se nivela ----
  const ang0 = 0.3;
  const nivel = eio(sg(t, T.tanto, T.tanto + 0.8));
  const ang = lerp(ang0, 0, nivel) + rebote(t, T.tanto + 0.8, 4, 11, 0.05);
  const kB = t < T.s07 ? 0 : lerp(0.55, 1, bk(sg(t, T.s07, T.s07 + 0.28)));
  ocultar(balanza, kB);
  balanza.position.set(c.x, 0, -0.2); balanza.rotation.y = 0;
  ponerBalanza(balanza, ang);
  balanza.updateMatrixWorld(true);
  const platoD = balanza.userData.platos[1], platoI = balanza.userData.platos[0];
  // ---- las monedas: caen y se apilan al lado de la tarjeta (s05); en s07 vuelan al plato derecho ----
  monedas.forEach((m, i) => {
    const t0 = T.s05 + 0.9 + i * 0.1;
    m.visible = t > t0 && achica > 0.01;
    if (!m.visible) return;
    const yF = 0.011 + i * 0.021;
    const u = sg(t, t0, t0 + 0.16);
    const base = MONB();
    let p = V(base.x + Math.sin(i * 2.1) * 0.006, lerp(yF + 0.8, yF, u * u) + rebote(t, t0 + 0.16, 18, 40, 0.008), base.z + Math.cos(i * 1.7) * 0.006);
    const vu = eio(sg(t, T.s07 + 0.3 + i * 0.03, T.s07 + 0.75 + i * 0.03));
    if (vu > 0) { const q = platoD.localToWorld(V(Math.sin(i * 2.1) * 0.01, 0.02 + i * 0.021, Math.cos(i * 1.7) * 0.01)); p = arco(p, q, vu, 0.35); }
    m.position.copy(p); m.rotation.set(0, i * 0.7, 0); m.scale.setScalar(achica);
  });
  // la burbuja en el plato izquierdo
  bPlato.visible = t > T.s07 + 0.45 && achica > 0.01;
  if (bPlato.visible) {
    const q = platoI.localToWorld(V(0, 0.19, 0.0));
    bPlato.position.copy(q); bPlato.quaternion.identity(); bPlato.rotation.set(-0.08, 0.0, 0);
    bPlato.scale.setScalar(popIn(t, T.s07 + 0.45, 0.3) * 0.38 * (1 + 0.1 * pulso(t, T.tanto, 0.3)) * achica);
  }
  // "-25 %" arriba del plato derecho; etiqueta "intereses" en la pila
  ocultar(num25, t > T.cuarto ? popIn(t, T.cuarto, 0.3) * 0.8 * achica : 0);
  num25.position.copy(platoD.localToWorld(V(0.1, 0.98, 0))); num25.rotation.set(0, -0.06, 0);
  ocultar(etiInt, t > T.s07 + 0.95 ? popIn(t, T.s07 + 0.95, 0.3) * 0.95 * achica : 0);
  etiInt.position.copy(platoD.localToWorld(V(0.0, 0.34, 0.26))); etiInt.rotation.set(-0.05, -0.1, 0);
}

// ================= ZONA G en el tiempo =================
function zonaG(t) {
  const en = plano === "G";
  vereda.visible = en;
  celuG.visible = vibG.visible = false;
  if (!en) { return; }
  graciela.raiz.visible = true; chismosa.visible = true; celuG.visible = true;
  const muestra = 1; // ronda 3: siempre de frente a cámara
  const pg = poseEn(t, [
    [0, { x: OG.x, y: 0, z: 0, giro: 0, manoI: [0.085, 0.3, 0.42], manoD: [-0.085, 0.3, 0.42], codoI: [0.7, -0.7, -0.2], codoD: [-0.7, -0.7, -0.2], cabeza: { giro: 0.0, asiente: 0.3, ladea: 0.05 }, ojos: { x: 0, y: -0.7, abiertos: 1 }, cejas: { alto: 0.3, ang: 0.2 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.8 } }],
    [T.vibG + 0.15, { cabeza: { giro: 0.0, asiente: 0.28, ladea: 0.05 }, ojos: { x: 0, y: -0.85, abiertos: 1 }, cejas: { alto: 0.6, ang: 0.1 }, boca: { sonrisa: 0.2, abierta: 0.15 } }, 0.15],
    [T.vibG + 0.5, { ...CARA.feliz, manoI: [0.085, 0.3, 0.42], manoD: [-0.085, 0.3, 0.42], codoI: [0.7, -0.7, -0.2], codoD: [-0.7, -0.7, -0.2], cabeza: { giro: 0, asiente: 0.1, ladea: -0.05 }, ojos: { x: 0, y: 0.05, abiertos: 1, feliz: 0.4 } }, 0.35],
  ]);
  pg.t = t; graciela.poner(pg); graciela.raiz.updateMatrixWorld(true);
  graciela.mano("I").getWorldPosition(_v);
  chismosa.position.set(OG.x + 0.32, 0.85, 0.08); chismosa.rotation.set(0, 0.2, 0);
  {
    const mI = graciela.mano("I").getWorldPosition(new THREE.Vector3()), mD = graciela.mano("D").getWorldPosition(new THREE.Vector3());
    const m = mI.add(mD).multiplyScalar(0.5);
    const vb = vibra(t, T.vibG);
    celuG.position.copy(m).add(V(vb * 0.006, 0.12, 0.035));
    celuG.rotation.set(lerp(-1.32, -0.5, muestra), Math.PI * (1 - muestra), lerp(0, 0.04, muestra) + vb * 0.03);
    celuG.scale.setScalar(1);
    // la burbuja llega en primer plano (corte desde el almacén) y se mete en la pantalla
    const u = eio(sg(t, T.corteG, T.vibG));
    if (u < 1) {
      if (bPed.parent !== scene) scene.add(bPed);
      celuG.updateMatrixWorld(true);
      const dest = celuG.localToWorld(EN_PANT(0, -0.005));
      bPed.position.copy(lerpV(delante(0.5, 0, -0.35), dest, u));
      celuG.getWorldQuaternion(_q); bPed.quaternion.copy(camera.quaternion).slerp(_q, u);
      bPed.scale.setScalar(lerp(0.14, BESC, eo(sg(t, T.corteG, T.corteG + 0.12))));
    } else {
      if (bPed.parent !== celuG) celuG.add(bPed);
      bPed.position.copy(EN_PANT(0, -0.005)); bPed.quaternion.identity(); bPed.scale.setScalar(BESC);
    }
    bPed.visible = true;
    ponerBurbuja(bPed, "pedido", t > T.listo - 0.1 ? 1 : 0);
    vibG.visible = t > T.vibG && t < T.vibG + 0.5;
    if (vibG.visible) { vibG.position.copy(celuG.position).add(V(0, 0.04, 0.18)); /* adelante de las manos */ vibG.quaternion.copy(camera.quaternion); vibG.scale.setScalar(2.2 * (1 + 0.2 * Math.sin((t - T.vibG) * 30))); }
  }
}

// ================= EL CIERRE =================
function zonaF(t) {
  const v = plano === "F";
  bFin.visible = v; sombraF.visible = false;
  if (!v) return;
  const kk = lerp(0.6, 1, bk(sg(t, T.fin - 0.02, T.fin + 0.3)));
  bFin.position.set(OF.x, 0.6 + Math.sin((t - T.fin) * 2) * 0.02, 0);
  bFin.quaternion.identity(); bFin.userData.giro.rotation.set(0, Math.sin((t - T.fin) * 1.4) * 0.25 * Math.exp(-(t - T.fin) * 0.6), rebote(t, T.fin, 1.6, 5.5, 0.08));
  bFin.scale.setScalar(kk * 0.62);
  sombraF.position.set(OF.x, 0.0, 0.1);
}

// ================= ESCENA EN EL TIEMPO =================
const SUELTOS = [bDent, bPed, papelito, papelP, bPlato, bFin, ...minis, ...bVuela];
function renderAt(t) {
  for (const o of SUELTOS) o.visible = false;
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  let foco = V(0, 1, 0), r = 2.2;
  if (plano === "D") { foco = OD.clone().add(V(0, 1, 0)); r = 5.5; }
  else if (plano === "P") { foco = OP.clone().add(V(0, 0.8, 0)); r = 2.2; }
  else if (plano === "G") { foco = OG.clone().add(V(0, 1, 0)); r = 1.8; }
  else if (plano === "F") { foco = OF.clone().add(V(0, 0.5, 0)); r = 1.5; }
  else if (plano === "A1" || plano === "A11") { foco = CELR.clone(); r = 0.7; }
  sol.position.copy(foco).add(plano === "P" ? V(-1.2, 8, 3) : V(-2.6, 7, 6)); sol.target.position.copy(foco);
  Object.assign(sol.shadow.camera, { left: -r, right: r, top: r, bottom: -r, near: 0.5, far: 40 }); sol.shadow.camera.updateProjectionMatrix();
  zonaA(t);
  zonaD(t);
  zonaP(t);
  zonaG(t);
  zonaF(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
