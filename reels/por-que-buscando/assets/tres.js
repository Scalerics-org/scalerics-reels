// Capa 3D de por-que-buscando (Three.js r170 local). Base técnica: reels/por-que-dos-sellos (cámara de claves con cúbica
// monótona, el almacén de Rubén, el celular pegado a cámara) y reels/por-que-seis (fondo crema).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Zona A (origen, fondo crema liso): el celular gigante con "Buscando…", el avión, los dos celulares (rayo / reloj de
// arena), las tarjetas de embarque, la balanza, el "?" y la lupa; y el cierre. Zona B (x = 40): el almacén de Rubén.
// Zona C (x = -40): la casa de Graciela. El celular del chat va pegado a la cámara en las zonas B y C.
// Colores de marca; rojo apagado SOLO para el problema (el reloj de pared de Graciela, "sin noticias").
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800p.js";
import { crearPersonaje, ELENCO, poseEn, mezclar, CARA, BRAZOS, saludo, pegarACamara, crearMate, crearTermo } from "./personajes.js";
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
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (A, B, u) => V(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E; // inicios de escena
const D2R = Math.PI / 180;
// entrada con pop: 0 antes de a, sube con rebote desde 0,35
const popIn = (t, a, d = 0.28) => (t < a ? 0 : lerp(0.35, 1, bk(sg(t, a, a + d))));

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
  env.background = new THREE.Color(0x6d6a60);
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
scene.environmentIntensity = 0.6;

const OB = V(40, 0, 0); // el almacén de Rubén
const OC = V(-40, 0, 0); // la casa de Graciela
const key = new THREE.DirectionalLight(0xfff0dc, 2.4); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.4); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x9c9682, 1.1); scene.add(fill);
// el sol de las zonas B y C (con sombras)
const sol = new THREE.DirectionalLight(0xffe6c8, 0.0);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
Object.assign(sol.shadow.camera, { left: -3.2, right: 3.2, top: 3.5, bottom: -2.2, near: 1, far: 18 });
sol.shadow.bias = -0.0008; sol.shadow.radius = 4;
scene.add(sol, sol.target);
const lampara = new THREE.PointLight(0xffd59a, 0, 6, 1.6); scene.add(lampara);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, madera: 0xb98a5a, kraft: 0xc29563 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.16 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.5), red: mat(C.red, 0.55), white: mat(C.white, 0.42),
  madera: mat(C.madera, 0.6), kraft: mat(C.kraft, 0.85), kraft2: mat(0xa77a4b, 0.85),
  tilde: mat(C.navy, 0.45),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", sans-serif`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const sombraTex = tex(256, 256, (x) => {
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(70,60,40,0.42)"); gr.addColorStop(0.55, "rgba(70,60,40,0.18)"); gr.addColorStop(1, "rgba(70,60,40,0)");
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
// tilde 3D (V extruida)
const tickGeo = (() => {
  const sh = new THREE.Shape();
  [[-0.5, 0.06], [-0.16, -0.3], [0.5, 0.36], [0.37, 0.49], [-0.16, -0.05], [-0.37, 0.19]].forEach(([x, y], i) => (i ? sh.lineTo(x, y) : sh.moveTo(x, y)));
  sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 });
  g.translate(0, -0.06, -0.06); return g;
})();
// casillero tildado: disco verde con la V navy (mira a +z)
const discoGeo = new THREE.CylinderGeometry(1, 1, 0.3, 36).rotateX(Math.PI / 2);
function hacerTilde(r = 0.17) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, M.g); d.scale.set(r, r, r * 0.35); g.add(d);
  const tk = mesh(tickGeo, M.tilde, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  return g;
}
// tilde verde suelta, grande (sin disco)
const tildeSuelta = (k) => { const m = mesh(tickGeo, M.g); m.scale.set(k, k, k * 0.9); scene.add(m); return m; };

// ================= PANTALLAS (canvas 640 x 1176, navy claro) =================
const PW = 2.4, PH = 4.3, PD = 0.26, SW = 2.2, SH = 4.04, TW = 640, TH = 1176;
const NAV = "#16243d", NAV3 = "#1f3254", EDGE = "#2c4268", CRE = "#efeee5", VER = "#5ce611", NAV0 = "#0b1220", ROJ = "#c7655b";
// esquinas redondeadas de la pantalla (lo de afuera queda del color del canto)
const marco = (x) => { x.fillStyle = NAV0; x.fillRect(0, 0, TW, TH); x.fillStyle = NAV; rr(x, 0, 0, TW, TH, 58); };
const tickCv = (x, cx, cy, r, fondo = VER, trazo = NAV0) => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.strokeStyle = trazo; x.lineWidth = r * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.45, cy + r * 0.02); x.lineTo(cx - r * 0.1, cy + r * 0.38); x.lineTo(cx + r * 0.5, cy - r * 0.36); x.stroke(); };
const avionCv = (x, cx, cy, s, color) => {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = color; x.beginPath();
  x.moveTo(30, 0); x.lineTo(8, -4); x.lineTo(-4, -26); x.lineTo(-12, -26); x.lineTo(-4, -4); x.lineTo(-20, -4); x.lineTo(-26, -12); x.lineTo(-31, -12); x.lineTo(-27, 0);
  x.lineTo(-31, 12); x.lineTo(-26, 12); x.lineTo(-20, 4); x.lineTo(-4, 4); x.lineTo(-12, 26); x.lineTo(-4, 26); x.lineTo(8, 4); x.closePath(); x.fill(); x.restore();
};
// filas con casillero: layout compartido entre pantalla y tildes 3D
const LAY = {
  buscando: { rows: [520, 670, 820, 970], h: 124, cx: 548, r: 36, rueda: [320, 215], ruedaR: 0.3 },
  revisando: { rows: [470, 600, 730, 860, 990], h: 112, cx: 552, r: 32, rueda: [320, 150], ruedaR: 0.24 },
};
const px2 = (cx, cy) => V((cx / TW - 0.5) * SW, (0.5 - cy / TH) * SH, 0);
function filas(x, lay, textos, tam = 50) {
  textos.forEach((s, i) => {
    const y = lay.rows[i];
    x.fillStyle = NAV3; rr(x, 34, y, TW - 68, lay.h, 30);
    x.fillStyle = CRE; x.font = F(700, tam); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(s, 70, y + lay.h / 2 + 2);
    x.strokeStyle = "#4b6795"; x.lineWidth = 7; x.beginPath(); x.arc(lay.cx, y + lay.h / 2, lay.r, 0, 7); x.stroke();
  });
}
const PANT = {};
PANT.buscando = tex(TW, TH, (x) => {
  marco(x);
  x.fillStyle = CRE; x.font = F(800, 84); x.textAlign = "center"; x.textBaseline = "alphabetic"; x.fillText("Buscando…", TW / 2, 430);
  filas(x, LAY.buscando, ["Aerolínea 1", "Aerolínea 2", "Aerolínea 3", "Aerolínea 4"], 52);
});
PANT.viajes = tex(TW, TH, (x) => {
  marco(x);
  avionCv(x, 92, 120, 1.3, VER);
  x.fillStyle = VER; x.font = F(800, 46); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Viajes", 150, 122);
  x.fillStyle = CRE; x.font = F(800, 82); x.textBaseline = "alphabetic"; x.fillText("Buscá", 48, 330); x.fillText("tu vuelo", 48, 424);
  const campo = (y, et, val) => { x.fillStyle = NAV3; rr(x, 34, y, TW - 68, 150, 30); x.fillStyle = "#9fb0cc"; x.font = F(600, 40); x.fillText(et, 70, y + 58); x.fillStyle = CRE; x.font = F(800, 62); x.fillText(val, 70, y + 124); };
  campo(500, "Desde", "Montevideo"); campo(680, "Hasta", "¿A dónde?");
  x.fillStyle = VER; rr(x, 34, 900, TW - 68, 150, 75);
  x.fillStyle = NAV0; x.font = F(800, 66); x.textAlign = "center"; x.fillText("Buscar", TW / 2, 998);
});
const tarjetaVuelo = (x, y, n, hora) => {
  x.fillStyle = NAV3; rr(x, 34, y, TW - 68, 236, 34);
  avionCv(x, 110, y + 80, 1.05, VER);
  x.fillStyle = "#9fb0cc"; x.font = F(600, 42); x.textAlign = "left"; x.textBaseline = "alphabetic"; x.fillText("Vuelo " + n, 160, y + 96);
  x.fillStyle = CRE; x.font = F(800, 86); x.fillText(hora, 66, y + 200);
  x.fillStyle = VER; rr(x, TW - 230, y + 136, 166, 74, 37); x.fillStyle = NAV0; x.font = F(800, 40); x.textAlign = "center"; x.fillText("Elegir", TW - 147, y + 186);
};
PANT.instante = tex(TW, TH, (x) => {
  marco(x);
  x.fillStyle = CRE; x.font = F(800, 74); x.textAlign = "left"; x.textBaseline = "alphabetic"; x.fillText("Vuelos", 48, 196);
  tickCv(x, TW - 96, 172, 40);
  tarjetaVuelo(x, 270, 1, "08:40"); tarjetaVuelo(x, 546, 2, "13:15"); tarjetaVuelo(x, 822, 3, "19:30");
});
PANT.revisando = tex(TW, TH, (x) => {
  marco(x);
  x.fillStyle = CRE; x.font = F(800, 66); x.textAlign = "center"; x.textBaseline = "alphabetic"; x.fillText("Revisando", TW / 2, 330); x.fillText("aerolíneas…", TW / 2, 405);
  filas(x, LAY.revisando, ["Aerolínea 1", "Aerolínea 2", "Aerolínea 3", "Aerolínea 4", "Aerolínea 5"], 48);
});
PANT.pedido = tex(TW, TH, (x) => {
  marco(x);
  x.fillStyle = CRE; x.font = F(800, 80); x.textAlign = "center"; x.textBaseline = "alphabetic"; x.fillText("Tu pedido", TW / 2, 400);
  x.fillStyle = VER; x.font = F(700, 42); x.fillText("Almacén de Rubén", TW / 2, 462);
  filas(x, { ...LAY.buscando, rows: LAY.buscando.rows.map((y) => y + 30) }, ["Recibido", "Armando", "Salió", "Llegó"], 54);
});
const LAYP = { ...LAY.buscando, rows: LAY.buscando.rows.map((y) => y + 30) };

// ================= EL CELULAR GIGANTE =================
function hacerCelu() {
  const g = new THREE.Group();
  g.add(mesh(rbox(PW, PH, PD, 0.3, 5), M.navy));
  g.add(mesh(rbox(PW + 0.05, PH + 0.05, PD - 0.08, 0.31, 5), M.edge));
  const scrMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false, map: PANT.buscando });
  const scr = mesh(new THREE.PlaneGeometry(SW, SH), scrMat, 0, 0, PD / 2 + 0.004); g.add(scr);
  g.add(mesh(rbox(0.56, 0.14, 0.04, 0.07), M.navy, 0, SH / 2 - 0.13, PD / 2 + 0.014));
  g.add(mesh(rbox(0.06, 0.5, 0.12, 0.03), M.navy3, PW / 2 + 0.015, 0.95, 0));
  g.add(mesh(rbox(0.06, 0.32, 0.12, 0.03), M.navy3, -PW / 2 - 0.015, 1.15, 0));
  g.add(mesh(rbox(0.06, 0.32, 0.12, 0.03), M.navy3, -PW / 2 - 0.015, 0.7, 0));
  const ui = new THREE.Group(); ui.position.z = PD / 2 + 0.03; g.add(ui);
  scene.add(g);
  return { g, scr, scrMat, ui };
}
function hacerRueda(r) {
  const g = new THREE.Group(); const segs = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const m = mesh(rbox(0.1, 0.22, 0.06, 0.045), new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.35, roughness: 0.45, transparent: true }));
    m.position.set(Math.sin(a) * r, Math.cos(a) * r, 0); m.rotation.z = -a; m.scale.setScalar(r / 0.3); g.add(m); segs.push(m);
  }
  g.userData.segs = segs; return g;
}
function girarRueda(rd, t) { const k = (t * 13) % 8; rd.userData.segs.forEach((m, i) => { const d = (k - i + 8) % 8; m.material.opacity = 0.16 + 0.84 * Math.max(0, 1 - d / 5); }); }
function ponerPantalla(c, tx) { if (c.scrMat.map !== tx) { c.scrMat.map = tx; c.scrMat.needsUpdate = true; } }

const P1 = hacerCelu(), P2 = hacerCelu();
const rueda1 = hacerRueda(0.3); rueda1.position.copy(px2(...LAY.buscando.rueda)); P1.ui.add(rueda1);
const tildes1 = LAY.buscando.rows.map((y) => { const k = hacerTilde(0.2); k.position.copy(px2(LAY.buscando.cx, y + LAY.buscando.h / 2)); P1.ui.add(k); return k; });
const tildesP = LAYP.rows.map((y) => { const k = hacerTilde(0.21); k.position.copy(px2(LAYP.cx, y + LAYP.h / 2)); P1.ui.add(k); return k; });
const tildeGrande = hacerTilde(0.36); tildeGrande.position.copy(px2(320, 200)); P1.ui.add(tildeGrande);
const rueda2 = hacerRueda(0.24); rueda2.position.copy(px2(...LAY.revisando.rueda)); P2.ui.add(rueda2);
const tildes2 = LAY.revisando.rows.map((y) => { const k = hacerTilde(0.18); k.position.copy(px2(LAY.revisando.cx, y + LAY.revisando.h / 2)); P2.ui.add(k); return k; });
// el renglón que se está revisando: marco verde 3D
const marcoFila = new THREE.Group();
{
  const w = SW - 0.16, h = (LAY.revisando.h / TH) * SH + 0.05, e = 0.035;
  for (const [x, y, ww, hh] of [[0, h / 2, w, e], [0, -h / 2, w, e], [w / 2, 0, e, h], [-w / 2, 0, e, h]]) marcoFila.add(mesh(rbox(ww + e, hh + e, 0.04, 0.015), M.g, x, y, 0));
  P2.ui.add(marcoFila);
}
// destello de "al instante" sobre la pantalla del celular izquierdo
const destello = mesh(new THREE.PlaneGeometry(SW, SH), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, toneMapped: false, depthWrite: false }), 0, 0, 0.01); P1.ui.add(destello);
const sombraP1 = sombra(3.6, 1.5), sombraP2 = sombra(3.6, 1.5);

// el sello "PREFERIDA" que cae sobre el celular (s02)
const selloTex = tex(1024, 280, (x) => {
  x.fillStyle = VER; rr(x, 0, 0, 1024, 280, 60);
  x.strokeStyle = NAV0; x.lineWidth = 22; x.beginPath(); x.roundRect(26, 26, 972, 228, 44); x.stroke();
  x.fillStyle = NAV0; x.font = F(900, 150); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("PREFERIDA", 512, 150);
});
const selloMat = new THREE.MeshStandardMaterial({ map: selloTex, roughness: 0.5, emissive: 0xffffff, emissiveMap: selloTex, emissiveIntensity: 0.2 });
const sello = mesh(rbox(2.5, 0.68, 0.1, 0.12), [M.gd, M.gd, M.gd, M.gd, selloMat, M.gd]); scene.add(sello);

// ================= EL AVIÓN (low-poly, nariz hacia +z) =================
const avion = new THREE.Group(); scene.add(avion);
{
  const blanco = mat(0xffffff, 0.4, { flatShading: true });
  const perfil = [[0, -1.15], [0.13, -1.05], [0.2, -0.7], [0.23, -0.1], [0.22, 0.5], [0.17, 0.9], [0.08, 1.12], [0, 1.18]].map(([r, y]) => new THREE.Vector2(r, y));
  const fus = mesh(new THREE.LatheGeometry(perfil, 10).rotateX(Math.PI / 2), blanco); avion.add(fus);
  const ala = (ancho, largo, x, y, z, flecha) => { const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(largo, -flecha); s.lineTo(largo, -flecha - ancho * 0.45); s.lineTo(0, -ancho); s.closePath(); const g = new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 1 }); g.rotateX(Math.PI / 2); return g; };
  for (const sx of [-1, 1]) {
    const a = mesh(ala(0.62, 1.25, 0, 0, 0, 0.42), blanco, 0, -0.02, 0.32); a.scale.x = sx; avion.add(a);
    const punta = mesh(rbox(0.06, 0.16, 0.26, 0.02), M.g, sx * 1.24, 0.06, -0.24); avion.add(punta);
    const motor = mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.36, 10).rotateX(Math.PI / 2), M.navy3, sx * 0.55, -0.15, 0.12); avion.add(motor);
    const cola = mesh(ala(0.3, 0.5, 0, 0, 0, 0.18), blanco, 0, 0.02, -0.82); cola.scale.x = sx; avion.add(cola);
  }
  const deriva = new THREE.Shape(); deriva.moveTo(0, 0); deriva.lineTo(-0.42, 0); deriva.lineTo(-0.62, 0.55); deriva.lineTo(-0.42, 0.55); deriva.closePath();
  const dg = new THREE.ExtrudeGeometry(deriva, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 1 }); dg.rotateY(-Math.PI / 2); dg.translate(0.025, 0, 0);
  avion.add(mesh(dg, M.navy2, 0, 0.12, -0.62));
  avion.add(mesh(rbox(0.3, 0.1, 0.22, 0.04), M.navy, 0, 0.14, 0.92)); // cabina
  for (const sx of [-1, 1]) avion.add(mesh(rbox(0.02, 0.07, 1.1, 0.01), M.navy3, sx * 0.205, 0.07, 0.08)); // ventanillas
  avion.add(mesh(rbox(0.03, 0.035, 1.5, 0.01), M.g, 0.215, -0.04, -0.05));
  avion.add(mesh(rbox(0.03, 0.035, 1.5, 0.01), M.g, -0.215, -0.04, -0.05));
}
const sombraAvion = sombra(2.6, 2.2);

// ================= EL RAYO Y EL RELOJ DE ARENA =================
const rayo = new THREE.Group(); scene.add(rayo);
{
  const s = new THREE.Shape();
  [[0.18, 0.75], [-0.32, -0.02], [-0.02, -0.02], [-0.2, -0.75], [0.34, 0.12], [0.04, 0.12], [0.24, 0.75]].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 2 }); g.translate(0, 0, -0.08);
  rayo.add(mesh(g, mat(C.navy2, 0.4)));
  const borde = mesh(g, M.g); borde.scale.set(1.12, 1.08, 0.6); borde.position.z = -0.05; rayo.add(borde);
}
const reloj = new THREE.Group(); scene.add(reloj);
const arena = {};
{
  for (const y of [-0.66, 0.66]) reloj.add(mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.1, 32), M.navy2, 0, y, 0));
  for (let k = 0; k < 3; k++) { const a = (k / 3) * Math.PI * 2 + 0.5; reloj.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.24, 10), M.navy3, Math.cos(a) * 0.36, 0, Math.sin(a) * 0.36)); }
  const perfil = [[0.02, -0.61], [0.28, -0.6], [0.31, -0.45], [0.24, -0.22], [0.05, -0.03], [0.05, 0.03], [0.24, 0.22], [0.31, 0.45], [0.28, 0.6], [0.02, 0.61]].map(([r, y]) => new THREE.Vector2(r, y));
  const vidrio = mesh(new THREE.LatheGeometry(perfil, 32), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.08, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide }));
  vidrio.renderOrder = 3; reloj.add(vidrio);
  const am = mat(C.g, 0.7, { emissive: C.g, emissiveIntensity: 0.12 });
  arena.bLejos = mesh(new THREE.CylinderGeometry(0.2, 0.27, 0.26, 24), am, 0, -0.47, 0); // B abajo, antes de dar vuelta
  arena.bCuello = mesh(new THREE.CylinderGeometry(0.04, 0.24, 1, 24), am); // B arriba (después de dar vuelta), embudo hacia el cuello
  arena.aLejos = mesh(new THREE.CylinderGeometry(0.27, 0.27, 1, 24), am); // A abajo, crece
  arena.chorro = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.5, 8), am);
  Object.values(arena).forEach((m) => reloj.add(m));
}

// ================= LAS TARJETAS DE EMBARQUE, EL "=" Y LA BALANZA =================
const pasajeTex = tex(800, 384, (x) => {
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, 800, 384);
  x.fillStyle = NAV; x.fillRect(0, 0, 230, 384);
  avionCv(x, 115, 192, 2.4, VER);
  x.strokeStyle = "#b9c2d3"; x.lineWidth = 6; x.setLineDash([16, 12]); x.beginPath(); x.moveTo(250, 20); x.lineTo(250, 364); x.stroke(); x.setLineDash([]);
  x.fillStyle = "#5b6b86"; x.font = F(700, 44); x.textAlign = "left"; x.textBaseline = "alphabetic"; x.fillText("VUELO 1", 290, 96);
  x.fillStyle = NAV0; x.font = F(800, 138); x.fillText("08:40", 284, 236);
  for (let i = 0; i < 34; i++) { x.fillStyle = NAV0; x.fillRect(292 + i * 13, 280, i % 3 ? 5 : 9, 70); }
});
const pasajeMat = new THREE.MeshStandardMaterial({ map: pasajeTex, roughness: 0.55, emissive: 0xffffff, emissiveMap: pasajeTex, emissiveIntensity: 0.12 });
const CARD_W = 1.25, CARD_H = 0.6;
const hacerPasaje = () => { const m = mesh(rbox(CARD_W, CARD_H, 0.04, 0.05), [M.navy, M.navy, M.navy, M.navy, pasajeMat, M.white]); scene.add(m); return m; };
const pasA = hacerPasaje(), pasB = hacerPasaje();
const igual = new THREE.Group(); igual.add(mesh(rbox(0.5, 0.11, 0.14, 0.05), M.g, 0, 0.11, 0), mesh(rbox(0.5, 0.11, 0.14, 0.05), M.g, 0, -0.11, 0)); scene.add(igual);
const balanza = new THREE.Group(); scene.add(balanza);
const BAL = { piv: 3.0, semi: 1.55, cuelga: 1.45, r: 0.72 };
const brazo = new THREE.Group(); brazo.position.y = BAL.piv; balanza.add(brazo);
const platos = [], hilos = [];
{
  balanza.add(mesh(rbox(2.0, 0.24, 1.0, 0.1), M.navy2, 0, 0.12, 0));
  balanza.add(mesh(rbox(1.5, 0.08, 0.7, 0.04), M.g, 0, 0.27, 0));
  balanza.add(mesh(new THREE.CylinderGeometry(0.11, 0.15, BAL.piv - 0.2, 20), M.navy3, 0, BAL.piv / 2 + 0.1, 0));
  balanza.add(mesh(new THREE.SphereGeometry(0.2, 24, 16), M.g, 0, BAL.piv, 0.0));
  brazo.add(mesh(rbox(BAL.semi * 2 + 0.2, 0.16, 0.2, 0.07), M.navy2, 0, 0, 0));
  for (const s of [-1, 1]) brazo.add(mesh(new THREE.SphereGeometry(0.1, 16, 12), M.g, s * BAL.semi, 0, 0));
  for (let s = 0; s < 2; s++) {
    const p = new THREE.Group();
    p.add(mesh(new THREE.CylinderGeometry(BAL.r, BAL.r * 0.88, 0.1, 40), M.cr2, 0, 0, 0));
    const aro = mesh(new THREE.TorusGeometry(BAL.r, 0.045, 10, 48), M.navy2, 0, 0.04, 0); aro.rotation.x = Math.PI / 2; p.add(aro);
    balanza.add(p); platos.push(p);
    const hs = [];
    for (let k = 0; k < 3; k++) { const h = mesh(new THREE.CylinderGeometry(0.018, 0.018, 1, 6), M.navy3); balanza.add(h); hs.push(h); }
    hilos.push(hs);
  }
}
const sombraBal = sombra(5.2, 2.0);

// ================= EL "?", LA ARENA QUE LO FORMA Y LA LUPA =================
const pregunta = new THREE.Mesh(textoGeo("?", 2.6, 0.6), M.g); scene.add(pregunta);
const granos = [];
{
  const pos = pregunta.geometry.attributes.position;
  let s = 41; const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const bola = new THREE.IcosahedronGeometry(1, 1);
  for (let i = 0; i < 30; i++) {
    const j = Math.floor(az() * pos.count);
    const m = mesh(bola, M.g); m.userData = { dest: V(pos.getX(j), pos.getY(j), pos.getZ(j) * 0.3), f: az(), r: 0.07 + az() * 0.06 };
    scene.add(m); granos.push(m);
  }
}
const lupa = new THREE.Group(); scene.add(lupa);
const LR = 1.05;
const lenteTex = tex(768, 768, (x) => {
  x.fillStyle = NAV; x.fillRect(0, 0, 768, 768);
  const fila = (y, s) => { x.fillStyle = NAV3; rr(x, 40, y, 688, 190, 44); x.fillStyle = CRE; x.font = F(800, 70); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(s, 96, y + 98); x.strokeStyle = "#4b6795"; x.lineWidth = 10; x.beginPath(); x.arc(600, y + 95, 50, 0, 7); x.stroke(); };
  fila(170, "Aerolínea 3"); fila(408, "Aerolínea 4");
});
const lupaTildes = [];
{
  const contenido = mesh(new THREE.CircleGeometry(LR - 0.03, 64), new THREE.MeshBasicMaterial({ map: lenteTex, toneMapped: false }), 0, 0, -0.03); lupa.add(contenido);
  const vidrio = mesh(new THREE.CircleGeometry(LR, 64), new THREE.MeshStandardMaterial({ color: 0xdff2ff, roughness: 0.05, transparent: true, opacity: 0.14, depthWrite: false }), 0, 0, 0.04); lupa.add(vidrio);
  lupa.add(mesh(new THREE.TorusGeometry(LR + 0.06, 0.14, 16, 64), M.navy2, 0, 0, 0));
  lupa.add(mesh(new THREE.TorusGeometry(LR - 0.06, 0.035, 8, 64), M.g, 0, 0, 0.06));
  const mango = new THREE.Group(); mango.rotation.z = Math.PI / 4 + Math.PI / 2; mango.position.set(Math.cos(-Math.PI / 4) * (LR + 0.15), Math.sin(-Math.PI / 4) * (LR + 0.15), 0); lupa.add(mango);
  mango.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16), M.navy2, 0, 0.12, 0));
  mango.add(mesh(new THREE.CylinderGeometry(0.15, 0.13, 1.1, 20), M.navy3, 0, 0.8, 0));
  mango.add(mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.12, 20), M.g, 0, 0.5, 0));
  mango.add(mesh(new THREE.SphereGeometry(0.13, 16, 10), M.navy3, 0, 1.36, 0));
  for (const cy of [265, 503]) { const k = hacerTilde(0.2); k.position.set(((600 / 768) - 0.5) * 2 * (LR - 0.03), (0.5 - cy / 768) * 2 * (LR - 0.03), 0.02); lupa.add(k); lupaTildes.push(k); }
}
const tildeLupa = tildeSuelta(1.0);
const sombraLupa = sombra(2.8, 1.4);

// ================= EL ALMACÉN DE RUBÉN (zona B) =================
const almacen = new THREE.Group(); almacen.position.copy(OB); scene.add(almacen);
const MOSTRADOR = { y: 0.88, z: -1.12 };
const sh = (o) => { o.castShadow = true; o.receiveShadow = true; return o; };
{
  const damero = tex(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(4, 3);
  const p = sh(mesh(new THREE.PlaneGeometry(9, 7), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.45 }), 0.9, 0, 0.1)); p.rotation.x = -Math.PI / 2; almacen.add(p);
  const pared = mat(0xe7dcc4, 0.85);
  almacen.add(sh(mesh(new THREE.BoxGeometry(9, 3.4, 0.1), pared, 0.9, 1.7, -3.3)));
  almacen.add(sh(mesh(new THREE.BoxGeometry(0.1, 3.4, 4.5), pared, -2.4, 1.7, -1.1)));
  almacen.add(sh(mesh(rbox(9, 0.2, 0.12, 0.02), M.navy3, 0.9, 0.1, -3.22)));
  let s = 7;
  const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const colores = [C.g, C.cr, C.red, 0xd9a441, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
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
  const letTex = tex(1024, 220, (x) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, 1024, 220); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.strokeRect(16, 16, 992, 188); x.fillStyle = "#efeee5"; x.font = F(900, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ALMACÉN", 512, 116); });
  almacen.add(mesh(rbox(1.6, 0.34, 0.05, 0.03), [M.navy2, M.navy2, M.navy2, M.navy2, new THREE.MeshStandardMaterial({ map: letTex, roughness: 0.6, emissive: 0xffffff, emissiveMap: letTex, emissiveIntensity: 0.15 }), M.navy2], 1.15, 2.72, -3.22));
  almacen.add(sh(mesh(rbox(2.5, 0.84, 0.62, 0.03), M.navy3, 0.25, 0.42, MOSTRADOR.z)));
  almacen.add(sh(mesh(rbox(2.62, 0.06, 0.72, 0.02), mat(0x9b6a43, 0.55), 0.25, MOSTRADOR.y - 0.02, MOSTRADOR.z)));
  almacen.add(mesh(rbox(2.3, 0.06, 0.02, 0.01), M.g, 0.25, 0.3, MOSTRADOR.z + 0.315));
  const fr = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 18), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.35, roughness: 0.05 }));
  fr.position.set(-0.75, MOSTRADOR.y + 0.14, MOSTRADOR.z + 0.05); almacen.add(fr);
  for (let i = 0; i < 9; i++) almacen.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.g, 0xd9a441][i % 3], 0.3), -0.75 + Math.sin(i * 2.4) * 0.06, MOSTRADOR.y + 0.05 + Math.floor(i / 3) * 0.05, MOSTRADOR.z + 0.05 + Math.cos(i * 2.4) * 0.06));
  const termo = crearTermo(); termo.position.set(-0.4, MOSTRADOR.y + 0.01, MOSTRADOR.z - 0.12); almacen.add(termo);
}
// el celular del mostrador (por donde llegó el pedido; de ahí salen los avisos)
const celuMostrador = new THREE.Group(); almacen.add(celuMostrador);
const celuMTex = tex(256, 512, (x) => {
  x.fillStyle = NAV; x.fillRect(0, 0, 256, 512); x.fillStyle = NAV3; x.fillRect(0, 0, 256, 92);
  x.fillStyle = VER; x.beginPath(); x.arc(46, 46, 24, 0, 7); x.fill();
  for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? CRE : VER; rr(x, i % 2 ? 24 : 70, 130 + i * 88, 162, 62, 20); }
});
{
  celuMostrador.add(mesh(rbox(0.2, 0.38, 0.025, 0.03), M.navy));
  const p = mesh(new THREE.PlaneGeometry(0.18, 0.35), new THREE.MeshBasicMaterial({ map: celuMTex, toneMapped: false }), 0, 0, 0.014); celuMostrador.add(p);
  const pie = mesh(rbox(0.16, 0.05, 0.14, 0.02), M.navy3, 0, -0.19, -0.05); celuMostrador.add(pie);
  celuMostrador.position.set(0.14, MOSTRADOR.y + 0.2, MOSTRADOR.z + 0.22); celuMostrador.rotation.set(-0.35, 0.25, 0);
  celuMostrador.traverse((o) => { if (o.isMesh) o.castShadow = true; });
}
// la bolsa del pedido (papel madera) y lo que va adentro
const BOLSA = V(OB.x + 0.4, MOSTRADOR.y, -1.24);
const bolsa = new THREE.Group(); scene.add(bolsa);
const BW = 0.38, BH = 0.42, BD = 0.26;
{
  const lado = (w, h, x, z, ry) => { const m = sh(mesh(new THREE.BoxGeometry(w, h, 0.012), M.kraft, x, BH / 2, z)); m.rotation.y = ry; bolsa.add(m); };
  lado(BW, BH, 0, BD / 2, 0); lado(BW, BH, 0, -BD / 2, 0); lado(BD, BH, BW / 2, 0, Math.PI / 2); lado(BD, BH, -BW / 2, 0, Math.PI / 2);
  bolsa.add(sh(mesh(new THREE.BoxGeometry(BW, 0.012, BD), M.kraft2, 0, 0.006, 0)));
  // borde dentado de arriba (tiras más oscuras) y una etiqueta verde
  bolsa.add(mesh(new THREE.BoxGeometry(BW + 0.004, 0.03, 0.014), M.kraft2, 0, BH - 0.015, BD / 2 + 0.002));
  bolsa.add(mesh(rbox(0.16, 0.1, 0.01, 0.02), M.g, 0, BH * 0.55, BD / 2 + 0.008));
}
// tapa doblada (cierra la bolsa en "armando")
const tapaBolsa = new THREE.Group(); tapaBolsa.position.set(0, BH, -BD / 2); bolsa.add(tapaBolsa);
tapaBolsa.add(sh(mesh(new THREE.BoxGeometry(BW + 0.01, 0.012, BD + 0.02), M.kraft2, 0, 0, BD / 2 + 0.01)));
const productos = [];
{
  const fideos = new THREE.Group(); fideos.add(sh(mesh(rbox(0.13, 0.3, 0.07, 0.02), mat(0xf3e2b3, 0.6)))); fideos.add(mesh(rbox(0.135, 0.07, 0.075, 0.01), M.navy2, 0, 0.06, 0)); fideos.add(mesh(rbox(0.135, 0.03, 0.075, 0.01), M.g, 0, -0.06, 0));
  const yerba = new THREE.Group(); yerba.add(sh(mesh(rbox(0.15, 0.26, 0.1, 0.02), mat(0x6f8a2c, 0.75)))); yerba.add(mesh(rbox(0.155, 0.1, 0.105, 0.01), M.cr, 0, 0.02, 0));
  const leche = new THREE.Group(); leche.add(sh(mesh(new THREE.CylinderGeometry(0.06, 0.065, 0.26, 18), M.white))); leche.add(mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.05, 14), M.white, 0, 0.15, 0)); leche.add(mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.035, 14), M.g, 0, 0.19, 0)); leche.add(mesh(new THREE.CylinderGeometry(0.066, 0.066, 0.07, 18), M.navy2, 0, -0.01, 0));
  const pan = new THREE.Group(); { const g = new THREE.CapsuleGeometry(0.055, 0.42, 6, 12); const m = sh(mesh(g, mat(0xd6a15e, 0.7))); pan.add(m); for (let k = -1; k <= 1; k++) { const c = mesh(rbox(0.03, 0.012, 0.09, 0.005), mat(0xf2d7a6, 0.7), 0, k * 0.13, 0.05); c.rotation.set(0.5, 0, 0.6); pan.add(c); } }
  // dónde quedan adentro (en el espacio de la bolsa) y con qué giro
  productos.push({ o: fideos, fin: V(-0.09, 0.2, 0.0), rot: V(0, 0.1, 0.05) });
  productos.push({ o: yerba, fin: V(0.08, 0.17, -0.04), rot: V(0, -0.2, -0.05) });
  productos.push({ o: leche, fin: V(0.08, 0.18, 0.03), rot: V(0, 0, 0.08) });
  productos.push({ o: pan, fin: V(-0.05, 0.36, -0.02), rot: V(0, 0, -0.45) });
  productos.forEach((p) => bolsa.add(p.o));
}
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 1e6, dedos: true }); scene.add(ruben.raiz);
const nico = crearPersonaje({ ...ELENCO.empleado, parpadeoCada: 1e6 }); scene.add(nico.raiz);
const mate = crearMate(); scene.add(mate);

// ================= LA CASA DE GRACIELA (zona C) =================
const casa = new THREE.Group(); casa.position.copy(OC); scene.add(casa);
const relojPared = new THREE.Group();
const agujas = {};
const bolsaCasa = new THREE.Group();
{
  const piso = sh(mesh(new THREE.PlaneGeometry(8, 6), mat(0xc9a77c, 0.7), 0, 0, 0)); piso.rotation.x = -Math.PI / 2; casa.add(piso);
  const alfombra = sh(mesh(new THREE.CircleGeometry(1.3, 48), mat(C.navy3, 0.9), 0.2, 0.005, -0.6)); alfombra.rotation.x = -Math.PI / 2; casa.add(alfombra);
  casa.add(mesh(new THREE.TorusGeometry(1.2, 0.03, 6, 64).rotateX(Math.PI / 2), M.g, 0.2, 0.008, -0.6));
  const pared = mat(0xe7dcc4, 0.85);
  casa.add(sh(mesh(new THREE.BoxGeometry(8, 3.4, 0.1), pared, 0, 1.7, -2.4)));
  casa.add(mesh(rbox(8, 0.16, 0.1, 0.02), M.navy3, 0, 0.08, -2.32));
  // ventana con cortinas
  const ven = new THREE.Group(); ven.position.set(0.95, 1.65, -2.33); casa.add(ven);
  ven.add(mesh(rbox(1.2, 1.1, 0.06, 0.03), M.navy2));
  ven.add(mesh(new THREE.PlaneGeometry(1.04, 0.94), new THREE.MeshBasicMaterial({ color: 0xcfe3ef, toneMapped: false }), 0, 0, 0.035));
  ven.add(mesh(rbox(0.05, 0.96, 0.03, 0.01), M.navy2, 0, 0, 0.05)); ven.add(mesh(rbox(1.06, 0.05, 0.03, 0.01), M.navy2, 0, 0, 0.05));
  for (const s of [-1, 1]) ven.add(mesh(rbox(0.26, 1.25, 0.05, 0.03), M.g, s * 0.68, -0.02, 0.08));
  // mesita con taza y maceta
  const mesa = new THREE.Group(); mesa.position.set(-0.78, 0, -1.15); mesa.scale.setScalar(0.85); casa.add(mesa);
  mesa.add(sh(mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 32), M.madera, 0, 0.72, 0)));
  mesa.add(sh(mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.7, 12), M.navy2, 0, 0.36, 0)));
  mesa.add(sh(mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.04, 24), M.navy2, 0, 0.02, 0)));
  mesa.add(sh(mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.1, 18), M.white, -0.2, 0.795, 0.1)));
  mesa.add(mesh(new THREE.TorusGeometry(0.03, 0.01, 6, 14), M.white, -0.13, 0.8, 0.1));
  mesa.add(sh(mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.14, 16), M.red, 0.22, 0.81, -0.12)));
  for (let k = 0; k < 6; k++) { const a = k * 1.05; const h = mesh(new THREE.SphereGeometry(0.07, 10, 8), mat(0x4f9a2a, 0.7), 0.22 + Math.cos(a) * 0.05, 0.95 + (k % 2) * 0.05, -0.12 + Math.sin(a) * 0.05); h.scale.set(0.8, 1.4, 0.8); mesa.add(h); }
  bolsaCasa.position.set(0.05, 0.745, 0.05); bolsaCasa.rotation.y = -0.4; mesa.add(bolsaCasa);
  // el reloj de pared (rojo apagado: el problema)
  relojPared.position.set(-0.6, 1.98, -2.3); relojPared.scale.setScalar(0.7); casa.add(relojPared);
  relojPared.add(mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.06, 40).rotateX(Math.PI / 2), M.cr, 0, 0, 0));
  relojPared.add(mesh(new THREE.TorusGeometry(0.3, 0.05, 12, 40), M.red, 0, 0, 0.02));
  for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; relojPared.add(mesh(rbox(0.025, k % 3 ? 0.04 : 0.07, 0.01, 0.005), M.navy2, Math.sin(a) * 0.23, Math.cos(a) * 0.23, 0.04)); relojPared.children.at(-1).rotation.z = -a; }
  agujas.h = new THREE.Group(); agujas.h.position.z = 0.05; agujas.h.add(mesh(rbox(0.035, 0.15, 0.012, 0.01), M.navy, 0, 0.065, 0)); relojPared.add(agujas.h);
  agujas.m = new THREE.Group(); agujas.m.position.z = 0.06; agujas.m.add(mesh(rbox(0.025, 0.22, 0.012, 0.01), M.navy, 0, 0.1, 0)); relojPared.add(agujas.m);
  relojPared.add(mesh(new THREE.SphereGeometry(0.025, 10, 8), M.red, 0, 0, 0.07));
  relojPared.traverse((o) => { if (o.isMesh) o.castShadow = true; });
}
// copia de la bolsa (ya cerrada) arriba de la mesita de Graciela en s12
{
  const b = bolsa.clone(true); b.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  bolsaCasa.add(b);
  // en la casa llega cerrada: tapa baja y sin los productos asomando
  b.children.forEach((c) => { if (c.isGroup) { if (Math.abs(c.position.y - BH) < 1e-6) { c.rotation.x = 0; c.visible = true; } else c.visible = false; } });
}
const graciela = crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 1e6 }); scene.add(graciela.raiz);
graciela.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
for (const p of [ruben, nico]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const lentesG = [], labioG = [];
graciela.cabeza.traverse((o) => {
  if (!o.isMesh) return;
  if (o.geometry.type === "TorusGeometry" && Math.abs(o.geometry.parameters.radius - 0.088) < 1e-6) lentesG.push(o);
  if (Math.abs(o.scale.y - 0.26) < 1e-6 && Math.abs(o.scale.x - 0.01) < 1e-6) o.visible = false;
});
graciela.raiz.traverse((o) => { if (o.isMesh && o.material && o.material.color && o.material.color.getHex() === ELENCO.clienta.labios) labioG.push(o); });
// el celular chico en las manos de Graciela (la pantalla mira hacia ella)
const celuG = new THREE.Group();
const pantGTex = tex(256, 512, (x) => { x.fillStyle = NAV; x.fillRect(0, 0, 256, 512); x.fillStyle = NAV3; x.fillRect(0, 0, 256, 90); x.fillStyle = VER; rr(x, 110, 130, 126, 54, 18); x.fillStyle = CRE; for (let i = 0; i < 3; i++) rr(x, 20, 220 + i * 76, 150, 52, 18); });
{
  celuG.add(mesh(rbox(0.08, 0.155, 0.014, 0.012), mat(0x2a3346, 0.35)));
  const pant = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.14), new THREE.MeshStandardMaterial({ map: pantGTex, emissive: 0xffffff, emissiveMap: pantGTex, emissiveIntensity: 0.7 }));
  pant.position.z = -0.0085; pant.rotation.y = Math.PI; celuG.add(pant);
}
graciela.cuerpo.add(celuG);

// ================= EL CELULAR DEL CHAT (pegado a la cámara) =================
const QW = 1.18, QH = 2.36, CTW = 640, CTH = 1328;
const telefono = new THREE.Group();
const chatMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
{
  telefono.add(mesh(rbox(QW, QH, 0.12, 0.16, 4), M.navy));
  telefono.add(mesh(rbox(QW + 0.04, QH + 0.04, 0.08, 0.17, 4), M.edge, 0, 0, -0.01));
  const p = mesh(new THREE.PlaneGeometry(QW - 0.1, QH - 0.12), chatMat, 0, 0, 0.065); p.userData.orden = 2; telefono.add(p);
  const isla = mesh(rbox(0.3, 0.06, 0.02, 0.03), M.navy, 0, QH / 2 - 0.12, 0.075); isla.userData.orden = 3; telefono.add(isla);
}
pegarACamara(telefono, camera, 40);
// los globos del chat: [texto, de quién]; el lugar de cada uno se calcula una vez (texto en 1 o 2 renglones)
const GLOBOS = [["¿Y mi pedido?", "ella"], ["Recibimos tu pedido", "local"], ["Lo estamos armando", "local"], ["¡Salió!", "local"], ["¡Llegó!", "local"], ["¡Gracias, Rubén!", "ella"]];
const GF = 60, GLH = 70;
const LAYG = (() => {
  const x = document.createElement("canvas").getContext("2d"); x.font = F(700, GF);
  let y = 236;
  return GLOBOS.map(([txt, quien]) => {
    const conTick = quien === "local", max = conTick ? 420 : 520;
    const pal = txt.split(" "), lin = [];
    let cur = "";
    for (const p of pal) { const prueba = cur ? cur + " " + p : p; if (x.measureText(prueba).width > max && cur) { lin.push(cur); cur = p; } else cur = prueba; }
    lin.push(cur);
    const tw = Math.max(...lin.map((l) => x.measureText(l).width));
    const w = tw + (conTick ? 150 : 80), h = 40 + lin.length * GLH;
    const X = quien === "ella" ? CTW - 34 - w : 34, Y = y;
    y += h + 24;
    return { lin, conTick, quien, w, h, X, Y };
  });
})();
function globo(x, i, gx = null, gy = null) {
  const g = LAYG[i];
  const X = gx ?? g.X, Y = gy ?? g.Y;
  x.fillStyle = g.quien === "ella" ? VER : CRE; rr(x, X, Y, g.w, g.h, 36);
  if (g.conTick) tickCv(x, X + 64, Y + 20 + GLH / 2, 32);
  x.fillStyle = NAV0; x.font = F(700, GF); x.textAlign = "left"; x.textBaseline = "middle";
  g.lin.forEach((l, k) => x.fillText(l, X + (g.conTick ? 118 : 40), Y + 20 + GLH / 2 + k * GLH + 2));
  return { X, Y, w: g.w, h: g.h };
}
const chatBase = (x) => {
  x.fillStyle = NAV; x.fillRect(0, 0, CTW, CTH);
  x.fillStyle = NAV3; x.fillRect(0, 0, CTW, 196);
  x.fillStyle = VER; x.beginPath(); x.arc(88, 112, 50, 0, 7); x.fill();
  x.fillStyle = NAV0; x.font = F(800, 56); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("R", 88, 115);
  x.fillStyle = CRE; x.font = F(700, 46); x.textAlign = "left"; x.fillText("Almacén", 162, 88); x.fillText("de Rubén", 162, 140);
};
// estados: 0 solo la pregunta (tilde gris, "sin respuesta"), 1-4 los avisos, 5 la respuesta de Graciela
const CHATS = [0, 1, 2, 3, 4, 5].map((n) => tex(CTW, CTH, (x) => {
  chatBase(x);
  const g0 = globo(x, 0);
  // la tilde de enviado: gris si nadie contestó, verde cuando llega el primer aviso
  x.strokeStyle = n === 0 ? "#7d8aa3" : VER; x.lineWidth = 8; x.lineCap = "round"; x.lineJoin = "round";
  x.beginPath(); x.moveTo(g0.X - 58, g0.Y + 58); x.lineTo(g0.X - 44, g0.Y + 72); x.lineTo(g0.X - 18, g0.Y + 42); x.stroke();
  if (n === 0) {
    // el problema: nadie contesta (reloj rojo apagado y "Sin respuesta")
    x.strokeStyle = ROJ; x.lineWidth = 14; x.beginPath(); x.arc(320, 680, 110, 0, 7); x.stroke();
    x.lineWidth = 14; x.beginPath(); x.moveTo(320, 680); x.lineTo(320, 610); x.moveTo(320, 680); x.lineTo(372, 708); x.stroke();
    x.fillStyle = ROJ; x.font = F(800, 62); x.textAlign = "center"; x.textBaseline = "alphabetic"; x.fillText("Sin respuesta", 320, 900);
  }
  for (let i = 1; i <= Math.min(n, 4); i++) globo(x, i);
  if (n >= 5) globo(x, 5);
}));
chatMat.map = CHATS[0]; chatMat.needsUpdate = true;
// globos 3D que vuelan del celular del mostrador al chat (pegados a la cámara, arriba del teléfono)
const vuelan = [1, 2, 3, 4].map((i) => {
  const g0 = LAYG[i];
  const c = document.createElement("canvas"); c.width = Math.ceil(g0.w) + 12; c.height = g0.h + 12; const x = c.getContext("2d");
  globo(x, i, 6, 6);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, c.height / c.width), new THREE.MeshBasicMaterial({ map: t, transparent: true }));
  g.add(m); g.userData = { i, cw: c.width };
  pegarACamara(g, camera, 60);
  return g;
});

// ================= CÁMARA =================
// PLANOS: [desde, claves]; clave [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ, fov].
// Dentro de un plano, cúbica monótona (Fritsch-Carlson) continua; entre planos, corte seco con whoosh.
const L = V(-1.45, 0, 0), R = V(1.45, 0, 0);
const CY = 0.1 + PH / 2; // centro del celular parado
const GX = OC.x - 0.32, GZ = -0.45; // Graciela
const PLANOS = [
  [0, [
    [0, 6, -3, 14.8, 0, 2.85, 0, 30],
    [S["s02-prefiere"] - 0.05, -3, -1, 13.6, 0, 2.75, 0, 30],
    [W[13], 14, 1, 14.0, 0, 2.75, 0, 30],
    [S["s03-viajes"], 22, 3, 14.1, 0, 2.75, 0, 30],
    [S["s03-viajes"] + 0.55, 8, 3, 14.2, 0, 2.75, 0, 30],
    [W[20] + 0.25, 2, 4, 14.2, 0.2, 3.2, 0.4, 30],
    [W[22] + 0.12, 6, 5, 14.4, 0.4, 3.45, 0.4, 30],
    [S["s04-instante"], -2, 4, 14.4, -0.7, 3.0, 0, 30],
    [S["s04-instante"] + 0.55, -4, 2, 14.0, -1.85, 2.7, 0, 30],
    [S["s05-aerolinea"] - 0.22, 3, 2, 13.6, -1.85, 2.7, 0, 30],
    [S["s05-aerolinea"] + 0.42, -3, 2, 14.0, 1.95, 2.7, 0, 30],
    [S["s06-mismos"] - 0.1, 2, 2, 13.5, 1.95, 2.75, 0, 30],
    [S["s06-mismos"] + 0.42, 0, 4, 18.5, 0, 2.6, 0, 30],
    [W[38] - 0.25, 0, 5, 14.8, 0, 2.6, 0.8, 30],
    [W[40] + 0.35, 0, 7, 16.6, 0, 2.3, 0, 30],
    [S["s07-por-que"] - 0.1, 4, 7, 15.8, 0, 2.35, 0, 30],
    [S["s07-por-que"] + 0.42, 0, 3, 10.6, 0, 2.85, 0.5, 30],
    [W[46] + 0.3, -6, 3, 10.4, 0, 2.8, 0.5, 30],
    [S["s08-ruben"] - 0.45, 5, 3, 10.0, 0, 2.8, 0.5, 30],
    [S["s08-ruben"], 0, 2, 9.6, 0, 2.8, 0.5, 30],
  ]],
  // almacén: arranca pegado a la bolsa y se abre a Rubén
  [S["s08-ruben"], [
    [S["s08-ruben"], -14, 12, 1.9, BOLSA.x, 1.16, BOLSA.z, 34],
    [S["s08-ruben"] + 0.75, 6, 24, 3.7, OB.x + 0.56, 1.3, -1.42, 34],
    [S["s09-no-ve"], 12, 23, 3.4, OB.x + 0.56, 1.3, -1.38, 34],
  ]],
  // Graciela en su casa (contraplano)
  [S["s09-no-ve"], [
    [S["s09-no-ve"], -4, 6, 5.6, GX + 0.46, 1.12, GZ, 34],
    [S["s10-avisos"], -3, 6, 5.0, GX + 0.44, 1.16, GZ, 34],
  ]],
  // el almacén otra vez, plano general: Rubén a la izquierda, el chat a la derecha
  [S["s10-avisos"], [
    [S["s10-avisos"], -6, 12, 5.8, OB.x + 0.98, 1.32, -1.3, 34],
    [S["s12-se-vea"], 4, 12, 5.5, OB.x + 0.96, 1.32, -1.3, 34],
  ]],
  [S["s12-se-vea"], [
    [S["s12-se-vea"], 8, 6, 5.2, GX + 0.46, 1.16, GZ, 34],
    [S["s13-llamada"], 0, 6, 4.95, GX + 0.44, 1.18, GZ, 34],
  ]],
  // cierre: el celular del gancho abajo (callback), el texto arriba, fondo verde
  [S["s13-llamada"], [
    [S["s13-llamada"], -9, 3, 15.4, 0, 3.4, 0, 30],
    [DUR, 7, 3, 14.9, 0, 3.4, 0, 30],
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

// ================= ZONA A en el tiempo =================
function zonaA(t) {
  const on = planoActual === 0 || planoActual === 5;
  const cierre = planoActual === 5;
  // ---- P1: el celular del gancho ----
  {
    let pos = V(0, CY, 0), ry = 0, s = 1;
    // s03: se da vuelta (360°) y aparece la página de viajes
    const vuelta = eio(sg(t, S["s03-viajes"] + 0.02, S["s03-viajes"] + 0.5));
    ry = vuelta * Math.PI * 2;
    // s04: se corre a la izquierda; s06 (en "Y la espera") sale por la izquierda
    const aL = eio(sg(t, S["s04-instante"] - 0.02, S["s04-instante"] + 0.42));
    const sale = eio(sg(t, W[38] - 0.1, W[38] + 0.4));
    pos.x = lerp(0, L.x, aL) - 6 * sale;
    if (t < S["s04-instante"]) pos.y = CY + Math.sin(t * 1.3) * 0.04;
    ry += Math.sin(t * 0.8) * 0.05 * (1 - aL) + 0.12 * aL * (1 - sale);
    // golpe del sello en "prefiere"
    const tg = W[13] + 0.02;
    if (t > tg && t < tg + 0.5) pos.y -= Math.exp(-(t - tg) * 10) * Math.sin((t - tg) * 30) * 0.06;
    let vis = on && t < W[38] + 0.5;
    if (cierre) { vis = true; pos = V(0, CY, 0); ry = Math.sin((t - S["s13-llamada"]) * 0.9) * 0.16; s = lerp(0.85, 1, bk(sg(t, S["s13-llamada"], S["s13-llamada"] + 0.35))); }
    P1.g.visible = vis; P1.g.position.copy(pos); P1.g.rotation.set(-0.04, ry, 0); P1.g.scale.setScalar(s);
    sombraP1.visible = vis; sombraP1.position.set(pos.x, 0.005, pos.z + 0.1);
    // pantalla
    let tx = PANT.buscando;
    if (t >= S["s03-viajes"] + 0.26) tx = PANT.viajes;
    if (t >= W[26] - 0.04) tx = PANT.instante;
    if (cierre) tx = PANT.pedido;
    ponerPantalla(P1, tx);
    const buscando = tx === PANT.buscando;
    rueda1.visible = buscando; if (buscando) girarRueda(rueda1, t);
    // tildes del gancho: la 1 ya puesta, la 2 en "buscando", 3 y 4 en s02
    const tt = [-1, W[3] - 0.02, W[8] - 0.04, W[11] + 0.02];
    tildes1.forEach((k, i) => ocultar(k, buscando ? (i === 0 ? 1 : popIn(t, tt[i])) : 0));
    // cierre: los cuatro estados del pedido se tildan en fila y la tilde grande reemplaza a la rueda
    const t0 = S["s13-llamada"];
    tildesP.forEach((k, i) => ocultar(k, cierre ? popIn(t, t0 + 0.12 + i * 0.13) : 0));
    ocultar(tildeGrande, cierre ? popIn(t, t0 + 0.7, 0.35) : 0);
    // destello de "al instante"
    const fl = pulso(t, W[26] - 0.06, 0.2);
    destello.visible = on && fl > 0.01; destello.material.opacity = 0.85 * fl;
  }
  // ---- el sello PREFERIDA ----
  {
    const tg = W[13] + 0.02;
    const vis = on && !cierre && t > tg - 0.2 && t < S["s03-viajes"] + 0.02;
    sello.visible = vis;
    if (vis) {
      const baja = sg(t, tg - 0.2, tg);
      const u = t - tg;
      const sq = u > 0 ? Math.exp(-u * 9) * Math.sin(u * 30) * 0.3 : 0;
      P1.g.updateMatrixWorld(true);
      const lp = V(0.02, -1.62 + (1 - baja * baja) * 0.6, PD / 2 + 0.07 + (1 - baja * baja) * 1.1);
      sello.position.copy(P1.g.localToWorld(lp));
      sello.quaternion.copy(P1.g.quaternion).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.13 - (1 - baja) * 0.3)));
      const sal = sg(t, S["s03-viajes"] - 0.12, S["s03-viajes"] + 0.02);
      const k = (1 + sq * 0.4) * (1 - 0.6 * sal) * lerp(1.15, 1, baja);
      sello.scale.set(k, k, Math.max(0.4, 1 - sq));
      if (sal >= 1) sello.visible = false;
    }
  }
  // ---- el avión despega de la página de viajes ----
  {
    const t0 = W[20] - 0.12, t1 = S["s04-instante"] - 0.06;
    const vis = on && !cierre && t > t0 && t < t1;
    avion.visible = vis; sombraAvion.visible = vis;
    if (vis) {
      const curva = new THREE.CatmullRomCurve3([V(0, 2.9, 0.3), V(0.2, 3.2, 2.0), V(-0.3, 3.5, 3.8), V(0.3, 3.9, 4.6), V(2.0, 4.4, 4.4), V(4.6, 5.0, 3.0)]);
      const u = eio(sg(t, t0, t1)) * 0.97;
      const p = curva.getPointAt(u), q = curva.getPointAt(Math.min(1, u + 0.02));
      avion.position.copy(p); avion.lookAt(q);
      avion.rotateZ(0.5 * Math.sin(Math.PI * cl(u * 1.1)));
      avion.scale.setScalar(lerp(0.2, 1.1, eo(sg(t, t0, t0 + 0.4))));
      sombraAvion.position.set(p.x, 0.005, p.z); sombraAvion.material.opacity = cl(1 - (p.y - 3) / 4) * 0.8;
    }
  }
  // ---- P2: el que muestra el trabajo ----
  {
    const nace = S["s05-aerolinea"] - 0.4;
    const aR = eio(sg(t, nace, nace + 0.45));
    const sale = eio(sg(t, W[38] - 0.1, W[38] + 0.4));
    const vis = on && !cierre && t > nace && t < W[38] + 0.5;
    P2.g.visible = vis; sombraP2.visible = vis;
    const pos = V(lerp(L.x, R.x, aR) + 6 * sale, CY, lerp(-0.5, 0, aR));
    P2.g.position.copy(pos); P2.g.rotation.set(-0.04, -0.12 * aR * (1 - sale), 0);
    sombraP2.position.set(pos.x, 0.005, pos.z + 0.1);
    // revisando: una aerolínea cada ~0,45 s, la de "aerolínea" justo en la palabra; al terminar, los mismos vuelos
    const fin = W[35] + 0.45;
    ponerPantalla(P2, t >= fin ? PANT.instante : PANT.revisando);
    const rev = t < fin;
    rueda2.visible = rev; if (rev) girarRueda(rueda2, t);
    const tt = [S["s05-aerolinea"] + 0.25, W[32] + 0.05, W[34] - 0.02, W[35] - 0.12, W[35] + 0.3];
    tildes2.forEach((k, i) => ocultar(k, rev ? popIn(t, tt[i]) : 0));
    // el marco verde recorre la fila que se está revisando
    let fila = 0; for (let i = 0; i < 5; i++) if (t >= tt[i] - 0.02) fila = i + 1;
    fila = Math.min(fila, 4);
    marcoFila.visible = rev && t > S["s05-aerolinea"] - 0.4 && t < tt[4];
    marcoFila.position.copy(px2(TW / 2, LAY.revisando.rows[fila] + LAY.revisando.h / 2)); marcoFila.position.z = 0.0;
    marcoFila.scale.setScalar(1 + 0.04 * pulso(t, tt[Math.max(0, fila - 1)], 0.2));
  }
  // ---- el rayo (izquierda) y el reloj de arena (derecha); en "Y la espera" caen a los platos ----
  const tCae = W[38] - 0.05, dCae = 0.5;
  const cae = eio(sg(t, tCae, tCae + dCae));
  brazo.updateMatrixWorld(true);
  const tilt = brazo.rotation.z;
  const extremo = (s) => V(s * BAL.semi * Math.cos(tilt), BAL.piv + s * BAL.semi * Math.sin(tilt), 0);
  const hunde = -6 * eio(sg(t, S["s07-por-que"] - 0.3, S["s07-por-que"] + 0.12));
  const platoC = (s) => extremo(s).add(V(0, -BAL.cuelga + hunde, 0));
  {
    const tR = W[28] - 0.05;
    const vis = on && !cierre && t > tR && t < S["s07-por-que"] - 0.1;
    rayo.visible = vis;
    if (vis) {
      const A = V(L.x - 1.6, 3.2, 0.6), B = platoC(-1).add(V(0.38, 0.66, 0.15));
      const p = lerpV(A, B, cae); p.y += Math.sin(Math.PI * cae) * 1.0;
      rayo.position.copy(p);
      rayo.rotation.set(0, Math.sin(t * 1.6) * 0.25 * (1 - cae), 0.1 * (1 - cae));
      rayo.scale.setScalar(popIn(t, tR, 0.3) * lerp(1.0, 0.9, cae));
    }
  }
  {
    const tH = S["s05-aerolinea"] + 0.08, flip = W[31] - 0.05;
    const subeP = S["s07-por-que"] - 0.3; // sube al centro y se deshace en el "?"
    const vis = on && !cierre && t > tH && t < S["s07-por-que"] + 0.12;
    reloj.visible = vis;
    if (vis) {
      const A = V(R.x + 1.6, 3.2, 0.6), B = platoC(1).add(V(-0.36, 0.78, 0.15));
      const p = lerpV(A, B, cae); p.y += Math.sin(Math.PI * cae) * 1.0;
      const sube = eio(sg(t, subeP, S["s07-por-que"] + 0.1));
      p.lerp(V(0, 2.85, 0.5), sube); p.x += Math.sin(Math.PI * sube) * 1.3; p.z += Math.sin(Math.PI * sube) * 0.8;
      reloj.position.copy(p);
      const fz = eio(sg(t, flip, flip + 0.38));
      reloj.rotation.set(0, Math.sin(t * 1.1) * 0.2, fz * Math.PI + sube * Math.PI * 1.5);
      let s = popIn(t, tH, 0.3) * lerp(0.95, 0.85, cae) * lerp(1, 1.5, sube);
      if (t > S["s07-por-que"] - 0.02) s *= 1 - sg(t, S["s07-por-que"] - 0.02, S["s07-por-que"] + 0.12) * 0.7;
      reloj.scale.setScalar(s);
      // la arena: antes de dar vuelta, toda en B (abajo); después B (arriba) se vacía en A
      const vacia = sg(t, flip + 0.3, W[35] + 0.4);
      const antes = t < flip + 0.19;
      arena.bLejos.visible = antes;
      arena.bCuello.visible = !antes && vacia < 0.98;
      if (arena.bCuello.visible) { const h = 0.42 * (1 - vacia); arena.bCuello.scale.set(1 - vacia * 0.5, h, 1 - vacia * 0.5); arena.bCuello.position.set(0, -0.05 - h / 2, 0); }
      arena.aLejos.visible = !antes && vacia > 0.02;
      if (arena.aLejos.visible) { const h = 0.3 * vacia; arena.aLejos.scale.set(1, h, 1); arena.aLejos.position.set(0, 0.6 - h / 2, 0); }
      arena.chorro.visible = !antes && vacia > 0 && vacia < 0.98;
      arena.chorro.position.set(0, 0.3, 0); arena.chorro.scale.set(1, 1.1, 1);
    }
  }
  // ---- las tarjetas de embarque: salen de las pantallas, se juntan ("="), caen a la balanza ----
  {
    const t0 = S["s06-mismos"] + 0.04, junta = W[37] - 0.05;
    const vis = on && !cierre && t > t0 && t < S["s07-por-que"] + 0.15;
    pasA.visible = pasB.visible = vis;
    if (vis) {
      const sal = eo(sg(t, t0, t0 + 0.3)), jn = eio(sg(t, junta - 0.25, junta + 0.2));
      [[pasA, -1, L], [pasB, 1, R]].forEach(([c, s, P]) => {
        const scr = V(P.x, CY + 0.2, 0.3), frente = V(P.x * 0.9, CY + 0.15, 1.8), centro = V(0, 2.6 - s * 0.76, 3.2);
        const plato = platoC(s).add(V(s * -0.05 + (s < 0 ? -0.18 : 0.18), 0.22, 0.05));
        let p = lerpV(scr, frente, sal); p = lerpV(p, centro, jn);
        p = lerpV(p, plato, cae); p.y += Math.sin(Math.PI * cae) * 0.9;
        c.position.copy(p);
        c.rotation.set(lerp(0, -1.1, cae), Math.sin(t * 1.3 + s) * 0.08 * (1 - cae) + lerp(0, s * -0.25, cae), s * 0.04 * (1 - jn));
        let k = lerp(0.4, 1.6, sal) * lerp(1, 0.53, cae);
        if (t > S["s07-por-que"] - 0.05) k *= 1 - 0.6 * sg(t, S["s07-por-que"] - 0.05, S["s07-por-que"] + 0.1);
        c.scale.setScalar(k);
      });
    }
    const iv = on && !cierre && t > junta && t < tCae + 0.1;
    ocultar(igual, iv ? popIn(t, junta + 0.05) * (1 - 0.6 * sg(t, tCae - 0.08, tCae + 0.08)) * (t > tCae + 0.08 ? 0 : 1) : 0);
    igual.position.set(0, 2.6, 3.3); igual.rotation.y = Math.sin(t * 2) * 0.12;
  }
  // ---- la balanza ----
  {
    const t0 = W[38] - 0.05;
    const vis = on && !cierre && t > t0 && t < S["s07-por-que"] + 0.45;
    balanza.visible = vis; sombraBal.visible = vis;
    if (vis) {
      const s = popIn(t, t0, 0.35);
      const baja = eio(sg(t, S["s07-por-que"] - 0.3, S["s07-por-que"] + 0.12));
      balanza.position.set(0, -6 * baja, 0); balanza.scale.setScalar(s);
      // baja el plato de la espera en "valoraba"; vaivén al caer las cosas
      const u = t - (tCae + dCae);
      const vaiven = u > 0 ? Math.exp(-u * 5) * Math.sin(u * 16) * 0.07 : 0;
      brazo.rotation.z = -0.24 * eio(sg(t, W[42] - 0.15, W[42] + 0.35)) + vaiven;
      brazo.updateMatrixWorld(true);
      for (let k = 0; k < 2; k++) {
        const sx = k ? 1 : -1;
        const e = V(sx * BAL.semi * Math.cos(brazo.rotation.z), BAL.piv + sx * BAL.semi * Math.sin(brazo.rotation.z), 0);
        const pc = e.clone().add(V(0, -BAL.cuelga, 0));
        platos[k].position.copy(pc);
        hilos[k].forEach((h, j) => {
          const a = (j / 3) * Math.PI * 2 + 0.6;
          const rim = pc.clone().add(V(Math.cos(a) * BAL.r * 0.95, 0.05, Math.sin(a) * BAL.r * 0.95));
          const dir = e.clone().sub(rim); const len = dir.length();
          h.position.copy(rim).addScaledVector(dir, 0.5); h.quaternion.setFromUnitVectors(V(0, 1, 0), dir.normalize()); h.scale.set(1, len, 1);
        });
      }
      sombraBal.position.set(0, 0.005, 0.1);
      if (baja > 0.3) sombraBal.visible = false;
    }
  }
  // tilde verde arriba del plato ganador ("más")
  {
    const tT = W[43] - 0.04;
    const vis = on && !cierre && t > tT && t < S["s07-por-que"] - 0.05;
    tildeMas.visible = vis;
    if (vis) { const p = platoC(1).add(V(0, 2.05, 0.3)); tildeMas.position.copy(p); tildeMas.rotation.set(0, Math.sin(t * 2) * 0.2, 0); const k = popIn(t, tT, 0.3) * 0.75; tildeMas.scale.set(k, k, k * 0.9); }
  }
  // ---- el "?" (se arma con la arena del reloj) y la lupa ----
  {
    const tp = S["s07-por-que"] + 0.02, gira = W[46] - 0.12;
    const giro = eio(sg(t, gira, gira + 0.36));
    const vis = on && !cierre && t > tp - 0.02 && giro < 0.5;
    const centro = V(0, 2.85, 0.5);
    ocultar(pregunta, vis ? lerp(0.3, 1, bk(sg(t, tp + 0.08, tp + 0.36))) : 0);
    if (pregunta.visible) {
      pregunta.position.copy(centro); pregunta.rotation.set(0, Math.sin(t * 1.4) * 0.15 + giro * Math.PI, 0);
      pregunta.scale.multiplyScalar(1 + 0.05 * pulso(t, W[45], 0.3));
    }
    // granos de arena: salen del reloj y se juntan en el "?"
    const ga = sg(t, tp - 0.06, tp + 0.36);
    granos.forEach((m) => {
      const f = m.userData.f;
      const u = cl((ga - f * 0.3) / 0.7);
      const on2 = on && !cierre && ga > 0 && u < 1;
      m.visible = on2;
      if (!on2) return;
      const a = f * Math.PI * 2;
      const p0 = centro.clone().add(V(Math.cos(a) * 0.12, Math.sin(a) * 0.4, 0));
      const pm = centro.clone().add(V(Math.cos(a) * 1.8, Math.sin(a) * 1.5, 0.6));
      const pd = centro.clone().add(m.userData.dest);
      const e = eio(u);
      const p = e < 0.5 ? lerpV(p0, pm, e * 2) : lerpV(pm, pd, (e - 0.5) * 2);
      m.position.copy(p); m.scale.setScalar(m.userData.r * (1 - 0.6 * u));
    });
    // la lupa: el "?" gira de canto y del otro lado está la lupa
    const lv = on && !cierre && giro >= 0.5 && t < S["s08-ruben"];
    lupa.visible = lv; sombraLupa.visible = false;
    if (lv) {
      const acerca = eio(sg(t, S["s08-ruben"] - 0.42, S["s08-ruben"]));
      const p = lerpV(centro.clone().add(V(0.15, 0, 0)), V(0.2, 2.75, 7.4), acerca);
      lupa.position.copy(p);
      lupa.rotation.set(0, (1 - giro) * Math.PI + Math.sin(t * 1.1) * 0.06, Math.sin(t * 0.9) * 0.04);
      lupa.scale.setScalar(1 + 0.04 * pulso(t, W[51] - 0.02, 0.3));
      
      const tl = [W[47] - 0.02, W[48] + 0.15];
      lupaTildes.forEach((k, i) => ocultar(k, popIn(t, tl[i])));
      const tv = W[51] - 0.05;
      tildeLupa.visible = t > tv - 0.15;
      if (tildeLupa.visible) {
        lupa.updateMatrixWorld(true);
        const baja = sg(t, tv - 0.15, tv);
        tildeLupa.position.copy(lupa.localToWorld(V(0.05, 0.05 + (1 - baja) * 1.4, 0.35)));
        tildeLupa.quaternion.copy(lupa.quaternion);
        const k = lerp(0.5, 1.15, bk(sg(t, tv - 0.15, tv + 0.2))) * lupa.scale.x;
        tildeLupa.scale.set(k, k, k * 0.9);
      }
    } else tildeLupa.visible = false;
  }
}
const tildeMas = tildeSuelta(1.0);

// ================= ZONAS B y C: personajes =================
const R0 = { x: OB.x + 0.8, z: -1.66, giro: 0.26 };
const mirarBolsa = { cabeza: { giro: -0.3, asiente: 0.14, ladea: 0.04 } };
const RK = [
  [0, { ...R0, ...BRAZOS.apoyado, ...mirarBolsa, ...CARA.sonrisa, cejas: { alto: 0.45, ang: 0.45 }, ojos: { x: -0.3, y: -0.7, feliz: 0.25 } }],
  [S["s10-avisos"], { ...R0, ...mirarBolsa, ...CARA.sonrisa, cejas: { alto: 0.45, ang: 0.45 }, ojos: { x: -0.3, y: -0.7, feliz: 0.25 } }, 0.05],
  [W[75] + 0.15, { cabeza: { giro: -0.45, asiente: 0.05, ladea: 0.05 }, ojos: { x: -0.7, y: 0 }, ...CARA.feliz }, 0.3],
];
const mateMano = { manoD: [-0.24, 0.3, 0.3], codoD: [-0.8, -0.6, 0], dedoD: 0 };
const NK = [
  [0, { x: OB.x - 1.3, z: -1.82, giro: Math.PI / 2, ...BRAZOS.costado, ...CARA.sonrisa, cabeza: { giro: 0.2 } }],
  [W[74] + 0.45, { x: OB.x + 0.1, giro: Math.PI * 0.22, cabeza: { giro: 0, asiente: 0.2 }, ojos: { y: -0.5 } }, 0.6],
  [W[75] + 0.15, { giro: -Math.PI / 2 + 0.3, cabeza: { giro: 0.3, asiente: 0 }, ojos: { y: 0, x: 0.4 }, ...CARA.feliz }, 0.3],
  [W[75] + 1.05, { x: OB.x - 1.4 }, 0.85, (u) => u],
];
const GK = [
  [0, { x: GX, z: GZ, giro: 0.32, ...BRAZOS.celular, cabeza: { giro: 0, asiente: 0.38, ladea: 0.06 }, ojos: { x: 0, y: -0.9 }, cejas: { alto: 0.35, ang: 0.75 }, boca: { sonrisa: -0.35, abierta: 0, ancho: 0.85 } }],
  [W[64], { cabeza: { giro: 0.12, asiente: 0.1, ladea: -0.1 }, ojos: { x: 0.5, y: 0.1, abiertos: 0.85 }, cejas: { alto: 0.55, ang: 0.95 }, boca: { sonrisa: -0.6, abierta: 0.12, ancho: 0.8 } }, 0.3],
  [W[66] + 0.15, { cabeza: { giro: -0.12, asiente: 0.3, ladea: 0.12 }, ojos: { x: -0.2, y: -0.8, abiertos: 0.75 } }, 0.25],
  [S["s12-se-vea"], { cabeza: { giro: 0, asiente: 0.32, ladea: 0.04 }, ojos: { x: 0, y: -0.9, abiertos: 1 }, ...CARA.sonrisa }, 0.05],
  [S["s12-se-vea"] + 0.7, { cabeza: { giro: 0.28, asiente: 0.0, ladea: -0.06 }, ojos: { x: 0.6, y: 0.1, feliz: 0.5 }, ...CARA.feliz }, 0.35],
];
function personajes(t) {
  const enB = planoActual === 1 || planoActual === 3;
  const enC = planoActual === 2 || planoActual === 4;
  ruben.raiz.visible = enB; mate.visible = false; nico.raiz.visible = enB && t > W[74] - 0.2 && t < W[75] + 1.1;
  bolsa.visible = enB && !(t > W[75] + 0.1);
  graciela.raiz.visible = enC;
  bolsaCasa.visible = planoActual === 4;
  // ---- la bolsa y lo que entra (s08) ----
  if (enB) {
    bolsa.position.copy(BOLSA); bolsa.rotation.set(0, -0.12, 0);
    const tp = [W[53] - 0.05, W[54] - 0.05, W[55] - 0.05, W[57] - 0.02];
    productos.forEach((p, i) => {
      const ti = tp[i];
      const on = t > ti - 0.3;
      p.o.visible = on;
      if (!on) return;
      const u = sg(t, ti - 0.3, ti);
      const alto = p.fin.clone().add(V(0, 0.45, 0));
      p.o.position.copy(lerpV(alto, p.fin, u * u));
      p.o.rotation.set(p.rot.x, p.rot.y + (1 - u) * 0.8, p.rot.z);
      const s = 1.2 * lerp(0.4, 1, bk(sg(t, ti - 0.3, ti - 0.05)));
      const rb = t > ti ? Math.exp(-(t - ti) * 10) * Math.sin((t - ti) * 26) * 0.06 : 0;
      p.o.scale.set(s, s * (1 - rb), s);
    });
    // tapa: cerrada desde "armando"
    const cierra = eio(sg(t, W[74] - 0.2, W[74] + 0.15));
    tapaBolsa.rotation.x = lerp(-1.9, 0, cierra);
    tapaBolsa.visible = t > W[74] - 0.22;
    if (cierra > 0.6) productos.forEach((p) => { p.o.visible = false; });
    // Nico se la lleva en "salió"
    if (nico.raiz.visible) {
      const pn = poseEn(t, NK);
      const lleva = t > W[75] - 0.05;
      const alcanza = sg(t, W[74] + 0.45, W[75] - 0.1) * (1 - sg(t, W[75] + 0.05, W[75] + 0.3));
      nico.poner(pn); nico.raiz.updateMatrixWorld(true);
      if (alcanza > 0 || lleva) {
        const obj = lleva ? null : nico.cuerpo.worldToLocal(BOLSA.clone().add(V(0, BH + 0.06, 0)));
        const pose = { ...pn };
        if (obj) pose.manoD = mezclar(pn.manoD, [obj.x, obj.y, obj.z], eio(alcanza));
        else { pose.manoD = [-0.12, 0.42, 0.3]; pose.manoI = [0.12, 0.42, 0.3]; pose.codoD = [-0.8, -0.6, 0]; pose.codoI = [0.8, -0.6, 0]; }
        nico.poner(pose);
        nico.raiz.updateMatrixWorld(true);
      }
      if (lleva) {
        const m = nico.mano("D").getWorldPosition(new THREE.Vector3()).add(nico.mano("I").getWorldPosition(new THREE.Vector3())).multiplyScalar(0.5);
        const sube = eio(sg(t, W[75] - 0.05, W[75] + 0.2));
        const p = lerpV(BOLSA, m.clone().add(V(0, -0.12, 0)), sube);
        bolsa.position.copy(p); bolsa.visible = true; bolsa.rotation.set(0, nico.raiz.rotation.y, 0);
      }
    }
    // Rubén: las manos acompañan cada producto; cierra la bolsa en "armando"
    let pr = poseEn(t, RK);
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const bolsaBoca = BOLSA.clone().add(V(0, BH + 0.05, 0.02));
    let ob = null;
    tp.forEach((ti, i) => { const u = sg(t, ti - 0.32, ti + 0.18); if (u > 0 && u < 1) ob = { i, u }; });
    if (ob && t < S["s09-no-ve"]) {
      const tgt = ruben.cuerpo.worldToLocal(bolsaBoca.clone().add(V(0.06, 0.02, -0.06)));
      const k = Math.sin(Math.PI * ob.u);
      const lado = "manoD";
      pr = { ...pr, [lado]: mezclar(pr[lado], [tgt.x, tgt.y, tgt.z], k) };
    }
    const cierraM = sg(t, W[74] - 0.45, W[74] + 0.35);
    if (cierraM > 0 && cierraM < 1) {
      const a = ruben.cuerpo.worldToLocal(bolsaBoca.clone().add(V(-0.12, 0.04, -0.05))), b = ruben.cuerpo.worldToLocal(bolsaBoca.clone().add(V(0.12, 0.04, -0.05)));
      const k = Math.sin(Math.PI * cierraM);
      pr = { ...pr, manoD: mezclar(pr.manoD, [a.x, a.y, a.z], k), manoI: mezclar(pr.manoI, [b.x, b.y, b.z], k) };
    }
    // después de despachar: mate en la mano y saludo a Nico
    if (t > W[75] + 0.1) {
      const u = eio(sg(t, W[75] + 0.1, W[75] + 0.45));
      pr = mezclar(pr, { ...pr, ...mateMano, ...saludo(t, "I", 1) }, u);
      mate.visible = true;
    }
    ruben.poner(pr);
    if (mate.visible) { ruben.raiz.updateMatrixWorld(true); ruben.mano("D").getWorldPosition(mate.position); mate.position.y -= 0.06; mate.position.z += 0.03; mate.rotation.set(0, 0.6, 0); }
  }
  // ---- Graciela ----
  if (enC) {
    const pg = poseEn(t, GK);
    graciela.poner(pg);
    graciela.raiz.updateMatrixWorld(true);
    if (lentesG.length === 2) {
      const hp = graciela.cabeza.getWorldPosition(new THREE.Vector3());
      const fw = graciela.cabeza.getWorldDirection(new THREE.Vector3());
      const cosA = fw.dot(camera.position.clone().sub(hp).normalize());
      const a = lentesG[0].getWorldPosition(new THREE.Vector3()).distanceTo(camera.position), b = lentesG[1].getWorldPosition(new THREE.Vector3()).distanceTo(camera.position);
      const perfil = cosA < 0.5;
      lentesG[0].visible = !(perfil && a > b); lentesG[1].visible = !(perfil && b > a);
      labioG.forEach((m) => (m.visible = !perfil));
    }
    const mD = graciela.brazos[1].mano.position, mI = graciela.brazos[0].mano.position;
    celuG.visible = mD.distanceTo(mI) < 0.25;
    celuG.position.set((mD.x + mI.x) / 2, (mD.y + mI.y) / 2 + 0.035, (mD.z + mI.z) / 2 + 0.02);
    celuG.rotation.set(-0.55, 0, 0);
    // reloj de pared: corre rápido mientras espera y se clava en "nada"
    const tN = W[66];
    const vueltas = planoActual === 2 ? Math.min(t, tN) - S["s09-no-ve"] : 0;
    const salto = planoActual === 2 && t > tN ? Math.round(Math.min(1, (t - tN) / 0.06)) : 0;
    agujas.m.rotation.z = -(1.2 + vueltas * 5.5 + salto * 0.52 + (planoActual === 4 ? 2.4 : 0));
    agujas.h.rotation.z = -(2.6 + vueltas * 0.46 + (planoActual === 4 ? 0.3 : 0));
  }
}

// ================= EL CHAT Y LOS GLOBOS QUE VUELAN =================
const TV = [W[69] - 0.05, W[74] - 0.05, W[75] - 0.02, S["s12-se-vea"] + 0.25]; // cuándo llega cada aviso
const tGracias = W[79];
const _ndc = new THREE.Vector3();
function chat(t) {
  const enChat = planoActual >= 2 && planoActual <= 4;
  const ent = eo(sg(t, S["s09-no-ve"] - 0.02, S["s09-no-ve"] + 0.28));
  telefono.visible = enChat && ent > 0.002;
  const kf = Math.tan((camera.fov * D2R) / 2) / Math.tan(17 * D2R);
  const pop = 1 + 0.04 * TV.reduce((a, ti) => a + pulso(t, ti, 0.22), 0) + 0.04 * pulso(t, tGracias, 0.22);
  // en el almacén (plano 3) se achica a la esquina de abajo a la derecha para que se vea Rubén; en la casa vuelve grande
  const chico = planoActual === 3 ? eio(sg(t, S["s10-avisos"], S["s10-avisos"] + 0.35)) : planoActual === 4 ? 1 - eio(sg(t, S["s12-se-vea"], S["s12-se-vea"] + 0.35)) : 0;
  telefono.position.set(lerp(0.075, 0.09, chico) * kf, (lerp(-0.03, -0.058, chico) - (1 - ent) * 0.45) * kf, -1);
  telefono.rotation.set(-0.04, -0.14 + Math.sin(t * 0.8) * 0.05, Math.sin(t * 0.6) * 0.012 + (1 - ent) * 0.2);
  telefono.scale.setScalar(lerp(0.15, 0.13, chico) * kf * pop);
  let n = 0; TV.forEach((ti, i) => { if (t >= ti) n = i + 1; });
  if (t >= tGracias) n = 5;
  const tx = CHATS[n];
  telefono.traverse((o) => { if (o.isMesh && o.userData.orden === 2 && o.material.map !== tx) { o.material.map = tx; o.material.needsUpdate = true; } });
  // globos 3D: del celular del mostrador (zona B) al lugar que les toca en el chat
  telefono.updateMatrixWorld(true);
  vuelan.forEach((g, k) => {
    const ti = TV[k];
    const vis = planoActual === 3 && k < 3 && t > ti - 0.42 && t < ti;
    g.visible = vis;
    if (!vis) return;
    const u = eio(sg(t, ti - 0.42, ti));
    celuMostrador.getWorldPosition(_ndc); _ndc.project(camera);
    const th = Math.tan((camera.fov * D2R) / 2);
    const A = V(_ndc.x * th * camera.aspect, _ndc.y * th, -1);
    const L0 = LAYG[g.userData.i];
    const wq = (QW - 0.1), hq = (QH - 0.12);
    const loc = V(-wq / 2 + (L0.X + L0.w / 2) / CTW * wq, hq / 2 - (L0.Y + L0.h / 2) / CTH * hq, 0.07);
    const B = loc.applyMatrix4(telefono.matrix);
    const p = lerpV(A, B, u); p.y += Math.sin(Math.PI * u) * 0.05; p.z = -0.98;
    g.position.copy(p);
    const k2 = telefono.scale.x * lerp(0.55, 1, eo(u)) * (g.userData.cw / CTW) * wq;
    g.scale.set(k2, k2, 1);
    g.rotation.set(0, 0, (1 - u) * 0.25);
  });
}

// ================= ESCENA EN EL TIEMPO =================
function renderAt(t) {
  scene.environmentRotation.y = t * 0.08;
  ponerCamara(t);
  const pa = planoActual;
  const enA = pa === 0 || pa === 5, enB = pa === 1 || pa === 3, enC = pa === 2 || pa === 4;
  const O = enB ? OB : OC;
  sol.position.copy(O).add(V(-3.5, 6, 6)); sol.target.position.copy(O).add(V(0.3, 0.8, -0.8));
  sol.intensity = enA ? 0 : 2.1;
  lampara.position.copy(O).add(V(0.2, 2.45, -1.2)); lampara.intensity = enA ? 0 : 6;
  key.intensity = enA ? 2.4 : 0.9;
  fill.intensity = enA ? 1.1 : 0.95;
  almacen.visible = enB; casa.visible = enC;
  zonaA(t);
  personajes(t);
  chat(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
