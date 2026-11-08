// Capa 3D de dos-repuestos (Three.js r170 local). Base técnica: reels/dos-bicicleterias, reels/abren-hoy.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Serie "Dos negocios": dos casas de repuestos PEGADAS en la misma vereda; la medianera (x = 0) es la pantalla partida.
// Izquierda, lo de Néstor: gris apagado. Derecha, lo de Daniel: navy claro y verde (el agente de IA atiende de noche).
// Arriba de cada local, la casa del dueño (la cena). Avenida con la camioneta del reparto de Rubén (su batería murió).
// El canvas pinta el fondo: noche navy liso, mañana crema liso, cierre verde liso (nada de degradés).
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { crearPersonaje, ELENCO, poseEn, CARA, mezclar, pegarACamara, crearMate } from "./personajes.js";
import { E, W, WF, DUR, VOZ_T, VOZ_ENV } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
const V = (x, y, z = 0) => new THREE.Vector3(x, y, z);
const lerpV = (A, B, u) => new THREE.Vector3(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E;
const D2R = Math.PI / 180;
const vida = (t, a, b, din = 0.4, dout = 0.3) => (t < a || t > b + dout ? 0 : bk(sg(t, a, a + din)) * (1 - eio(sg(t, b, b + dout))));
const en = (t, a, b) => t >= a && t < b;

// ================= MOMENTOS (todo sale de las palabras) =================
const T = {
  casas: W[1], mensaje: W[5], vende: W[10], s02: S["s02-bateria"], bateria: W[21], s03: S["s03-escribe"], dos: W[26] + 0.1,
  s04: S["s04-nestor"], nestor: W[30], manana: W[33], s05: S["s05-daniel"], contesta: W[38], agente: W[40], ia: W[42],
  s05b: S["s05b-reserva"], reserva: W[46], ruben: W[47] - 0.32, hora: W[51], s07: S["s07-estantes"], losDos: W[57],
  s08: S["s08-diferencia"], diferencia: W[60], atendiendo: W[65], s09: S["s09-manana"], ochoM: W[68],
  rubenM: W[69], bateriaM: W[73], s10: S["s10-tu-local"], tuLocal: W[78], diez: W[82], s11: S["s11-llamada"],
};
T.remate = WF[73] + 0.1;            // pausa en silencio: la cortina de Néstor sube y llega su mensaje
T.cortinaN = T.bateriaM - 0.75; T.subeD = T.s09 + 0.3;     // la cortina de Néstor arranca a subir (tarda 1 s)
T.msjN = T.remate + 0.35;           // "¡Buen día, Rubén! Sí, tenemos. ¿Pasás?"
T.levanta = T.msjN + 0.95;          // Rubén levanta la batería; Néstor se ríe

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 200);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x9aa4b8);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.4, 9, -6, 2, 3, Math.PI / 2.4, 0xfff4e2, 2.0);
  tira(1.6, 8, 6, 1, -1, -Math.PI / 2.2, 0xe6eeff, 1.4);
  tira(12, 1.6, 0, 7, 0, 0, 0xffffff, 1.3);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.04);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();

const key = new THREE.DirectionalLight(0xbcd0ff, 1.2);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 40 });
key.shadow.bias = -0.0006; key.shadow.normalBias = 0.025;
scene.add(key, key.target);
const rim = new THREE.DirectionalLight(0xe2ecff, 0.8); rim.position.set(5, 4, -7); scene.add(rim);
const fill = new THREE.HemisphereLight(0xb8c6e6, 0x2a3346, 0.9); scene.add(fill);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, navy4: 0x2c4268, cr: 0xefeee5, cr2: 0xdcdacb, cr3: 0xc9c7b8, g: 0x5ce611, gd: 0x3fa60a, red: 0xc0625a, white: 0xffffff,
  grisF: 0x4a505c, grisC: 0x6b7280, grisO: 0x3a3f4a };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45), gd: mat(C.gd, 0.5), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.65), cr3: mat(C.cr3, 0.7),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.55), navy3: mat(C.navy3, 0.5), navy4: mat(C.navy4, 0.5), red: mat(C.red, 0.55), white: mat(C.white, 0.45),
  grisF: mat(C.grisF, 0.7), grisC: mat(C.grisC, 0.5, { metalness: 0.25 }), grisO: mat(C.grisO, 0.7), negro: mat(0x15171c, 0.6), goma: mat(0x1a1d24, 0.85),
  alu: mat(0xd8d9dc, 0.3, { metalness: 0.55 }), motor: mat(0x6f7682, 0.45, { metalness: 0.35 }), vidrio: mat(0x23324f, 0.15, { metalness: 0.2 }),
  ladrillo: mat(0x8b5a4a, 0.85), pisoIn: mat(0x3a3f4a, 0.8), madera: mat(0x7a5536, 0.7),
  signo: mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.35 }),
};
const rbox = (w, h, d, r = 0.04, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };
const _up = new THREE.Vector3(0, 1, 0);
function tubo(a, b, r, m, seg = 10) {
  const d = new THREE.Vector3().subVectors(b, a); const L = d.length();
  const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg), m);
  o.position.copy(a).addScaledVector(d, 0.5); o.quaternion.setFromUnitVectors(_up, d.normalize()); o.castShadow = true; return o;
}
const curva = (pts, r, m, seg = 24) => { const o = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), seg, r, 8), m); o.castShadow = true; return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }

const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 8, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
};

// ---------- lienzos ----------
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const rrS = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.stroke(); };
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
function lienzo(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const plano = (w, h, tex, basic = true) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 }));
const tickC = (x, cx, cy, r, fondo = "#5ce611", trazo = "#0b1220") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = trazo; x.lineWidth = r * 0.3; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.45, cy + r * 0.02); x.lineTo(cx - r * 0.1, cy + r * 0.38); x.lineTo(cx + r * 0.5, cy - r * 0.36); x.stroke(); };
// texto que se parte en renglones para un ancho
function renglones(x, txt, ancho) {
  const out = []; let l = "";
  for (const p of txt.split(" ")) { const k = l ? l + " " + p : p; if (x.measureText(k).width > ancho && l) { out.push(l); l = p; } else l = k; }
  if (l) out.push(l); return out;
}

// ================= PIEZAS =================
// la batería: caja navy con tapa crema, manija, dos bornes (+ crema, - navy), etiqueta verde "12 V"
const BAT = { w: 0.36, h: 0.27, d: 0.24 };
const texBat = lienzo(512, 200, (x) => {
  x.fillStyle = "#5ce611"; rr(x, 0, 0, 512, 200, 26);
  x.fillStyle = "#0b1220"; x.font = F(900, 120); x.textAlign = "center"; x.fillText("12 V", 256, 145);
});
const texBatS = lienzo(512, 200, (x) => {
  x.fillStyle = "#2c4268"; rr(x, 0, 0, 512, 200, 26);
  x.fillStyle = "#c9c7b8"; x.font = F(800, 96); x.textAlign = "center"; x.fillText("12 V", 256, 135);
});
function crearBateria(testigo = false, estante = false) {
  const g = new THREE.Group();
  g.add(mesh(rbox(BAT.w, BAT.h * 0.82, BAT.d, 0.02), M.navy3, 0, BAT.h * 0.41, 0));
  g.add(mesh(rbox(BAT.w + 0.01, BAT.h * 0.2, BAT.d + 0.01, 0.02), M.cr, 0, BAT.h * 0.9, 0));
  for (const [sx, m] of [[-1, M.cr], [1, M.navy]]) {
    g.add(mesh(new THREE.CylinderGeometry(0.026, 0.03, 0.05, 16), mat(sx < 0 ? 0xd9b45a : 0x9aa0a8, 0.3, { metalness: 0.6 }), sx * BAT.w * 0.33, BAT.h + 0.02, -0.04));
    g.add(mesh(rbox(0.06, 0.012, 0.06, 0.005), m, sx * BAT.w * 0.33, BAT.h + 0.003, 0.05));
  }
  // signos + y - en la tapa
  g.add(mesh(rbox(0.04, 0.008, 0.012, 0.003), M.navy, -BAT.w * 0.33, BAT.h + 0.012, 0.05)); g.add(mesh(rbox(0.012, 0.008, 0.04, 0.003), M.navy, -BAT.w * 0.33, BAT.h + 0.012, 0.05));
  g.add(mesh(rbox(0.04, 0.008, 0.012, 0.003), M.cr, BAT.w * 0.33, BAT.h + 0.012, 0.05));
  g.add(curva([V(-0.07, BAT.h, 0.02), V(-0.05, BAT.h + 0.07, 0.02), V(0.05, BAT.h + 0.07, 0.02), V(0.07, BAT.h, 0.02)], 0.009, M.negro, 12));
  const et = plano(BAT.w * 0.62, BAT.h * 0.38, estante ? texBatS : texBat); et.position.set(0, BAT.h * 0.42, BAT.d / 2 + 0.003); g.add(et); g.userData.et = et;
  if (testigo) {
    const tm = new THREE.MeshBasicMaterial({ color: 0xc0625a, toneMapped: false });
    const tt = new THREE.Mesh(new THREE.CircleGeometry(0.034, 24), tm); tt.position.set(BAT.w * 0.36, BAT.h * 0.62, BAT.d / 2 + 0.004); g.add(tt);
    g.userData.testigo = tm;
  }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}
// correa (aro negro con nervaduras), filtro de aceite, lata genérica
function crearCorrea(r = 0.17) {
  const g = new THREE.Group();
  const aro = mesh(new THREE.TorusGeometry(r, 0.016, 8, 40), M.goma); aro.scale.set(1, 1.5, 1); g.add(aro);
  for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; const n = mesh(rbox(0.014, 0.02, 0.04, 0.004), M.negro, Math.cos(a) * (r - 0.012), Math.sin(a) * (r - 0.012) * 1.5, 0); n.rotation.z = a; g.add(n); }
  return g;
}
const crearFiltro = (m) => grupo(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 20), m, 0, 0.08, 0), mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.02, 20), M.alu, 0, 0.17, 0));
const crearLata = (m) => grupo(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 18), m, 0, 0.1, 0), mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.03, 10), M.cr, 0.025, 0.215, 0));

// tilde 3D (disco verde y la marca navy)
function crearTick(r = 0.4) {
  const g = new THREE.Group();
  const d = mesh(new THREE.CylinderGeometry(r, r, r * 0.22, 40), M.signo); d.rotation.x = Math.PI / 2; g.add(d);
  g.add(curva([V(-r * 0.45, 0, r * 0.13), V(-r * 0.1, -r * 0.36, r * 0.13)], r * 0.1, M.navy, 4));
  g.add(curva([V(-r * 0.1, -r * 0.36, r * 0.13), V(r * 0.5, r * 0.36, r * 0.13)], r * 0.1, M.navy, 4));
  for (const p of [V(-r * 0.45, 0, r * 0.13), V(-r * 0.1, -r * 0.36, r * 0.13), V(r * 0.5, r * 0.36, r * 0.13)]) g.add(mesh(new THREE.SphereGeometry(r * 0.1, 12, 8), M.navy, p.x, p.y, p.z));
  return g;
}

// el celular: cuerpo navy, pantalla con lienzo (se repinta por estado)
function crearCelular(w, h, lw, lh) {
  const g = new THREE.Group();
  g.add(mesh(rbox(w, h, 0.035, w * 0.12, 4), M.navy));
  g.add(mesh(rbox(w + 0.008, h + 0.008, 0.025, w * 0.13, 4), M.navy4, 0, 0, -0.006));
  const c = document.createElement("canvas"); c.width = lw; c.height = lh;
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const pant = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.92, h * 0.94), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
  pant.position.z = 0.019; g.add(pant);
  g.add(mesh(rbox(w * 0.22, h * 0.018, 0.006, 0.004), M.navy, 0, h * 0.44, 0.021));
  g.userData = { pant, tex, c, x: c.getContext("2d"), clave: "" };
  return g;
}

// ================= LAS DOS CASAS DE REPUESTOS =================
const X = (s, u) => s * (0.12 + u);
const ANCHO = 2.6, ABRE = { u0: 0.0, u1: 2.38, alto: 2.85 }, PISO2 = 3.97, TECHO = 6.95;
const VEN = { u: 0.86, w: 1.34, y0: 4.55, y1: 5.9 };
const locales = [];
const texReja = lienzo(512, 128, (x) => {
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, 512, 128);
  x.globalCompositeOperation = "destination-out";
  for (let f = 0; f < 3; f++) for (let i = 0; i < 12; i++) rr(x, 14 + i * 41.5 + (f % 2) * 20, 12 + f * 38, 26, 22, 8);
  x.globalCompositeOperation = "source-over";
});
function crearLocal(s) {
  const der = s > 0;
  const L = { s, g: new THREE.Group() }; scene.add(L.g);
  const add = (o) => { L.g.add(o); return o; };
  const fach = der ? M.navy3 : M.grisF;
  const caja = (w, h, d, m, u, y, z, r = 0.02) => add(mesh(rbox(w, h, d, r), m, X(s, u), y, z));
  // pilar de afuera, caja de la cortina, cartel, cornisa del primer piso
  caja(0.24, PISO2, 0.4, fach, ANCHO - 0.02, PISO2 / 2, 0.02);
  // ---- la cortina metálica: lamas + reja calada arriba (por la que se ve el brillo de adentro) ----
  L.cortina = new THREE.Group(); L.cortina.position.set(X(s, (ABRE.u0 + ABRE.u1) / 2), 0, 0.06); add(L.cortina);
  const lamaM = der ? mat(0x3a5582, 0.45, { metalness: 0.3 }) : M.grisC;
  const NL = 18, LH = 2.2 / NL;
  L.lamas = [];
  for (let i = 0; i < NL; i++) { const l = mesh(rbox(ABRE.u1 - ABRE.u0, LH * 0.98, 0.05, 0.012), lamaM, 0, LH * (i + 0.5), 0); L.cortina.add(l); L.lamas.push(l); }
  L.cortina.add(mesh(rbox(ABRE.u1 - ABRE.u0, 0.06, 0.07, 0.02), der ? M.navy : M.grisO, 0, 0.03, 0.01)); // zócalo con la cerradura
  L.cortina.add(mesh(rbox(0.12, 0.05, 0.03, 0.01), M.alu, 0, 0.06, 0.05));
  L.reja = new THREE.Mesh(new THREE.PlaneGeometry(ABRE.u1 - ABRE.u0, ABRE.alto - 2.2), new THREE.MeshStandardMaterial({ map: texReja, alphaTest: 0.5, color: der ? 0x3a5582 : C.grisC, roughness: 0.45, metalness: 0.3, side: THREE.DoubleSide }));
  L.reja.position.set(0, 2.2 + (ABRE.alto - 2.2) / 2, 0.0); L.cortina.add(L.reja);
  L.brilloM = new THREE.MeshBasicMaterial({ color: 0x10151f, toneMapped: false });
  const brillo = new THREE.Mesh(new THREE.PlaneGeometry(ABRE.u1 - ABRE.u0, ABRE.alto - 2.2), L.brilloM); brillo.position.set(0, 2.2 + (ABRE.alto - 2.2) / 2, -0.04); L.cortina.add(brillo);
  L.cortina.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  // tambor de la cortina
  caja(ABRE.u1 - ABRE.u0 + 0.04, 0.34, 0.36, der ? M.navy2 : M.grisO, (ABRE.u0 + ABRE.u1) / 2, ABRE.alto + 0.17, 0.08);
  // banda del cartel y cartel (gira en el callback: del otro lado dice TU LOCAL)
  caja(ANCHO + 0.02, 0.74, 0.3, fach, ANCHO / 2 - 0.01, 3.56, 0.0);
  L.cartel = new THREE.Group(); L.cartel.position.set(X(s, 1.19), 3.56, 0.3); add(L.cartel);
  L.cartel.add(mesh(rbox(2.3, 0.6, 0.12, 0.04), der ? M.navy : M.grisO));
  L.cartelF = plano(2.2, 0.5, null); L.cartelF.position.z = 0.062; L.cartel.add(L.cartelF);
  L.cartelB = plano(2.2, 0.5, null); L.cartelB.position.z = -0.062; L.cartelB.rotation.x = Math.PI; L.cartel.add(L.cartelB);
  caja(ANCHO + 0.1, 0.1, 0.46, der ? M.cr : M.cr3, ANCHO / 2 - 0.01, PISO2 - 0.02, 0.06);
  // ---- primer piso: la casa del dueño, ventana con su comedor ----
  const ven0 = VEN.u - VEN.w / 2, ven1 = VEN.u + VEN.w / 2;
  const pared2 = der ? mat(0x2a3f66, 0.75) : mat(0x5a606b, 0.75);
  caja(ven0 - 0.0, TECHO - PISO2, 0.3, pared2, ven0 / 2, (PISO2 + TECHO) / 2, -0.02);
  caja(ANCHO - ven1 + 0.1, TECHO - PISO2, 0.3, pared2, (ven1 + ANCHO + 0.1) / 2, (PISO2 + TECHO) / 2, -0.02);
  caja(VEN.w, VEN.y0 - PISO2, 0.3, pared2, VEN.u, (PISO2 + VEN.y0) / 2, -0.02);
  caja(VEN.w, TECHO - VEN.y1, 0.3, pared2, VEN.u, (VEN.y1 + TECHO) / 2, -0.02);
  for (const [w, h, du, y] of [[VEN.w + 0.12, 0.07, 0, VEN.y1], [VEN.w + 0.12, 0.07, 0, VEN.y0], [0.07, VEN.y1 - VEN.y0, -VEN.w / 2, (VEN.y0 + VEN.y1) / 2], [0.07, VEN.y1 - VEN.y0, VEN.w / 2, (VEN.y0 + VEN.y1) / 2]]) caja(w, h, 0.1, M.cr, VEN.u + du, y, 0.14);
  caja(VEN.w + 0.24, 0.06, 0.26, M.cr, VEN.u, VEN.y0 - 0.06, 0.2); // alféizar
  // cortinas de la ventana (a los costados)
  for (const k of [-1, 1]) caja(0.2, VEN.y1 - VEN.y0 - 0.1, 0.04, der ? M.cr2 : M.cr3, VEN.u + k * (VEN.w / 2 - 0.13), (VEN.y0 + VEN.y1) / 2 + 0.02, -0.12);
  // el comedor
  L.cuarto = mat(0xe9dcc4, 0.85, { emissive: 0xffd9a8, emissiveIntensity: 0.28 });
  const fondo = add(mesh(new THREE.PlaneGeometry(ANCHO, TECHO - PISO2), L.cuarto, X(s, ANCHO / 2), (PISO2 + TECHO) / 2, -1.7)); fondo.castShadow = false;
  const pisoC = add(mesh(new THREE.PlaneGeometry(ANCHO, 1.8), M.madera, X(s, ANCHO / 2), PISO2 + 0.01, -0.85)); pisoC.rotation.x = -Math.PI / 2;
  for (const u of [0.02, ANCHO]) { const p = add(mesh(new THREE.PlaneGeometry(1.8, TECHO - PISO2), L.cuarto, X(s, u), (PISO2 + TECHO) / 2, -0.85)); p.rotation.y = -s * (u < 1 ? -1 : 1) * Math.PI / 2; p.castShadow = false; }
  // cuadrito en la pared del comedor y lámpara colgante
  caja(0.36, 0.28, 0.03, der ? M.g : M.cr3, VEN.u + 0.38, 5.55, -1.66);
  add(tubo(V(X(s, VEN.u), TECHO, -0.75), V(X(s, VEN.u), 6.25, -0.75), 0.01, M.negro));
  add(mesh(new THREE.ConeGeometry(0.16, 0.14, 20, 1, true), M.cr, X(s, VEN.u), 6.2, -0.75));
  L.luzCuarto = new THREE.PointLight(0xffd29a, 5, 5, 1.6); L.luzCuarto.position.set(X(s, VEN.u), 6.05, -0.6); add(L.luzCuarto);
  // mesa con mantel crema, plato con milanesa y puré, vaso
  L.mesa = V(X(s, VEN.u), PISO2 + 0.83, -0.55);
  caja(1.0, 0.05, 0.62, M.cr, VEN.u, PISO2 + 0.8, -0.55);
  caja(1.04, 0.16, 0.66, M.cr2, VEN.u, PISO2 + 0.72, -0.55);
  add(mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.025, 28), M.white, X(s, VEN.u), PISO2 + 0.84, -0.42));
  const mila = add(mesh(new THREE.SphereGeometry(1, 20, 10), mat(0xc8873e, 0.8), X(s, VEN.u) - 0.04, PISO2 + 0.865, -0.43)); mila.scale.set(0.1, 0.022, 0.075); mila.rotation.y = 0.3;
  const pure = add(mesh(new THREE.SphereGeometry(1, 16, 10), mat(0xf2e3a6, 0.9), X(s, VEN.u) + 0.07, PISO2 + 0.87, -0.4)); pure.scale.set(0.055, 0.035, 0.05);
  add(mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.12, 16), new THREE.MeshStandardMaterial({ color: 0xd7e6ee, roughness: 0.1, transparent: true, opacity: 0.6 }), X(s, VEN.u) + 0.24, PISO2 + 0.9, -0.48));
  // ---- planta baja por dentro (se ve cuando la cortina baja al piso: corte de casa de muñecas) ----
  L.inM = der ? mat(0x2a3f66, 0.85, { emissive: 0x1a2c4a, emissiveIntensity: 0.2 }) : mat(0x575d68, 0.85);
  const back = add(mesh(new THREE.PlaneGeometry(ANCHO, 3.0), L.inM, X(s, ANCHO / 2), 1.5, -2.7)); back.castShadow = false;
  { const p = add(mesh(new THREE.PlaneGeometry(2.7, 3.0), L.inM, X(s, ANCHO), 1.5, -1.35)); p.rotation.y = -s * Math.PI / 2; p.castShadow = false; }
  { const p = add(mesh(new THREE.PlaneGeometry(ANCHO, 2.7), L.inM, X(s, ANCHO / 2), 3.0, -1.35)); p.rotation.x = Math.PI / 2; p.castShadow = false; }
  { const p = add(mesh(new THREE.PlaneGeometry(ANCHO, 2.7), M.pisoIn, X(s, ANCHO / 2), 0.004, -1.35)); p.rotation.x = -Math.PI / 2; p.castShadow = false; }
  // estantes con baterías, filtros y latas
  const estM = der ? M.cr2 : M.cr3;
  L.baterias = [];
  for (const [k, y] of [[0, 0.95], [1, 1.5], [2, 2.05]]) {
    caja(2.2, 0.04, 0.42, estM, 1.25, y, -2.47);
    for (const u of [0.25, 2.25]) caja(0.04, 0.6, 0.42, estM, u, y + 0.28, -2.47);
    if (k < 2) for (let i = 0; i < 5; i++) { const b = crearBateria(false, true); b.position.set(X(s, 0.48 + i * 0.4), y + 0.02, -2.42); b.rotation.y = s * 0.03 * (i % 2 ? 1 : -1); add(b); L.baterias.push(b); }
    else for (let i = 0; i < 8; i++) { const f = i % 3 === 2 ? crearLata(der ? M.navy4 : M.grisO) : crearFiltro(i % 2 ? (der ? M.g : M.cr3) : (der ? M.cr : M.grisC)); f.position.set(X(s, 0.42 + i * 0.25), y + 0.02, -2.42); add(f); }
  }
  // correas colgadas de una barra, arriba
  add(tubo(V(X(s, 0.35), 2.82, -2.6), V(X(s, 2.2), 2.82, -2.6), 0.012, M.alu));
  for (let i = 0; i < 6; i++) { const c = crearCorrea(0.11 + (i % 3) * 0.012); c.position.set(X(s, 0.5 + i * 0.32), 2.82 - 0.16 - (i % 3) * 0.018, -2.56); add(c); }
  // reloj de pared (solo lo de Néstor lo usa en primer plano, los dos lo tienen)
  // mostrador: frente de color, tapa de vidrio
  L.most = { u: 1.05, w: 1.9, z: -1.0, d: 0.55, h: 1.0 };
  caja(L.most.w, L.most.h - 0.06, L.most.d, der ? M.navy4 : M.grisO, L.most.u, (L.most.h - 0.06) / 2, L.most.z);
  caja(L.most.w + 0.04, 0.05, L.most.d + 0.04, der ? M.cr : M.cr3, L.most.u, L.most.h - 0.03, L.most.z);
  caja(L.most.w - 0.2, 0.06, 0.02, der ? M.g : M.cr3, L.most.u, 0.72, L.most.z + L.most.d / 2 + 0.005);
  // luces de adentro
  L.luzIn = new THREE.PointLight(der ? 0xbfe7a0 : 0xa9b8d6, 2.0, 6, 1.5); L.luzIn.position.set(X(s, 1.3), 2.6, -1.0); add(L.luzIn);
  locales.push(L);
  return L;
}
const izq = crearLocal(-1), der = crearLocal(1);
// la medianera: muro de ladrillo que va de la vereda al fondo (en planta baja se ve su corte) y pilar crema arriba
scene.add(mesh(rbox(0.24, TECHO + 0.1 - 3.0, 0.42, 0.03), M.cr2, 0, 3.0 + (TECHO + 0.1 - 3.0) / 2, 0.04));
// el tramo de planta baja del pilar baja al piso junto con las cortinas (corte de casa de muñecas): nunca tapa medio cuadro
const pilarPB = mesh(rbox(0.24, 3.02, 0.42, 0.03), M.cr2, 0, 1.51, 0.04); scene.add(pilarPB);
// muro de la medianera por dentro: ladrillo visto (textura con juntas, no una placa lisa)
const texLadrillo = lienzo(512, 512, (x) => {
  x.fillStyle = "#c9c7b8"; x.fillRect(0, 0, 512, 512);
  for (let f = 0; f < 16; f++) for (let c = -1; c < 5; c++) {
    const tono = ["#8b5a4a", "#7f5142", "#946352", "#865646"][(f * 3 + c * 5 + 8) % 4];
    x.fillStyle = tono; x.fillRect(c * 128 + (f % 2) * 64 + 4, f * 32 + 4, 120, 24);
  }
});
texLadrillo.wrapS = texLadrillo.wrapT = THREE.RepeatWrapping; texLadrillo.repeat.set(2.2, 2.4);
scene.add(mesh(new THREE.BoxGeometry(0.16, 3.0, 2.7), new THREE.MeshStandardMaterial({ map: texLadrillo, roughness: 0.9 }), 0, 1.5, -1.35));
scene.add(mesh(new THREE.BoxGeometry(0.16, TECHO - PISO2, 1.7), M.cr3, 0, (PISO2 + TECHO) / 2, -0.85));
// cornisa del techo
for (const s of [-1, 1]) scene.add(mesh(rbox(ANCHO + 0.2, 0.16, 0.5, 0.03), s > 0 ? M.cr : M.cr3, X(s, ANCHO / 2), TECHO + 0.04, 0.06));
// el reloj de pared de Néstor (agujas: 22:01)
const relojPared = new THREE.Group(); relojPared.position.set(X(-1, 0.42), 2.52, -2.66); scene.add(relojPared);
relojPared.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.04, 32).rotateX(Math.PI / 2), M.cr));
relojPared.add(mesh(new THREE.TorusGeometry(0.17, 0.018, 8, 32), M.grisO));
for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; relojPared.add(mesh(rbox(0.012, 0.03, 0.01, 0.004), M.navy, Math.sin(a) * 0.14, Math.cos(a) * 0.14, 0.022)); }
const agujaH = mesh(rbox(0.022, 0.1, 0.01, 0.005), M.navy, 0, 0, 0.03); agujaH.geometry.translate(0, 0.045, 0); relojPared.add(agujaH);
const agujaM = mesh(rbox(0.016, 0.14, 0.01, 0.005), M.red, 0, 0, 0.036); agujaM.geometry.translate(0, 0.06, 0); relojPared.add(agujaM);

// ---- la vereda, el cordón, la avenida ----
const vereda = lienzo(512, 512, (x) => {
  x.fillStyle = "#8e8b80"; x.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    x.fillStyle = (i + j) % 2 ? "#a3a094" : "#9a978b"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122);
    x.fillStyle = "rgba(0,0,0,0.07)"; for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) { x.beginPath(); x.arc(i * 128 + 20 + a * 29, j * 128 + 20 + b * 29, 7, 0, 7); x.fill(); }
  }
});
vereda.wrapS = vereda.wrapT = THREE.RepeatWrapping; vereda.repeat.set(36, 4.5);
const piso = mesh(new THREE.PlaneGeometry(36, 4.5), new THREE.MeshStandardMaterial({ map: vereda, roughness: 0.85 }), 3, 0, 1.25); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; scene.add(piso);
scene.add(mesh(rbox(36, 0.14, 0.24, 0.03), M.cr3, 3, 0.02, 3.55));
const calleM = mat(0x2d3340, 0.95);
const calle = mesh(new THREE.PlaneGeometry(36, 14), calleM, 3, -0.005, 10.6); calle.rotation.x = -Math.PI / 2; calle.castShadow = false; calle.receiveShadow = true; scene.add(calle);
for (let i = -6; i <= 14; i++) { const l = mesh(new THREE.PlaneGeometry(1.2, 0.14), mat(0xefeee5, 0.8), i * 2.2, 0.0, 8.6); l.rotation.x = -Math.PI / 2; l.castShadow = false; scene.add(l); }
// vecinos: edificios lisos a los costados con ventanas apagadas
const venOff = mat(0x16243d, 0.3, { metalness: 0.2 });
for (const [x0, x1, col, h] of [[-9, -2.84, 0x3a4254, 6.6], [2.84, 6.4, 0x28344c, 7.4], [6.4, 10.2, 0x3a4254, 6.2], [10.2, 15, 0x28344c, 7.0]]) {
  const w = x1 - x0, cx = (x0 + x1) / 2;
  scene.add(mesh(rbox(w, h, 0.4, 0.03), mat(col, 0.85), cx, h / 2, -0.1));
  scene.add(mesh(rbox(w + 0.1, 0.14, 0.5, 0.03), M.cr3, cx, h, -0.05));
  for (let fx = 0; fx < Math.floor(w / 1.3); fx++) for (const y of [4.7, h > 6.8 ? 6.1 : null].filter(Boolean)) {
    const vx = x0 + 0.65 + fx * 1.3 + (w - Math.floor(w / 1.3) * 1.3) / 2;
    scene.add(mesh(rbox(0.7, 0.9, 0.05, 0.02), venOff, vx, y, 0.12)); scene.add(mesh(rbox(0.84, 0.06, 0.14, 0.02), M.cr3, vx, y - 0.5, 0.15));
  }
  // planta baja: portón cerrado
  scene.add(mesh(rbox(Math.min(2.4, w - 0.6), 2.4, 0.06, 0.02), mat(0x4a5162, 0.6, { metalness: 0.3 }), cx, 1.2, 0.12));
}
// faroles (luz cálida de la calle)
const faroles = [];
for (const fx of [-3.4, 3.4, 9.4]) {
  const g = new THREE.Group(); g.position.set(fx, 0, 3.35); scene.add(g);
  g.add(mesh(new THREE.CylinderGeometry(0.05, 0.07, 4.4, 12), M.navy2, 0, 2.2, 0));
  g.add(curva([V(0, 4.3, 0), V(0, 4.6, 0.2), V(0, 4.55, 0.6)], 0.04, M.navy2, 12));
  const cab = mesh(rbox(0.36, 0.12, 0.24, 0.04), M.navy2, 0, 4.48, 0.66); g.add(cab);
  const foco = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.18), new THREE.MeshBasicMaterial({ color: 0xffe2a8, toneMapped: false })); foco.rotation.x = Math.PI / 2; foco.position.set(0, 4.415, 0.66); g.add(foco);
  const l = new THREE.PointLight(0xffc98a, 9, 9, 1.4); l.position.set(fx, 4.2, 4.0); scene.add(l);
  faroles.push({ g, l, foco });
}

// ================= LA CAMIONETA DEL REPARTO DE RUBÉN =================
const CAMI = V(7.6, 0, 5.3);
const cami = new THREE.Group(); cami.position.copy(CAMI); scene.add(cami);
const caM = mat(0xefeee5, 0.45, { metalness: 0.1 });
const texPuerta = lienzo(512, 256, (x) => {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, 512, 256);
  x.fillStyle = "#0b1220"; x.font = F(900, 92); x.textAlign = "center"; x.fillText("ALMACÉN", 256, 120);
  x.fillStyle = "#3fa60a"; x.font = F(800, 58); x.fillText("RUBÉN", 256, 200);
});
{
  const add = (o) => { cami.add(o); return o; };
  // chasis y caja de carga
  add(mesh(rbox(3.4, 0.42, 1.5, 0.08), caM, 0, 0.56, 0));
  add(mesh(rbox(3.42, 0.08, 1.52, 0.03), M.g, 0, 0.64, 0)); // franja verde
  add(mesh(rbox(1.0, 0.95, 1.46, 0.12), caM, 0.4, 1.2, 0)); // cabina
  const vid = add(mesh(rbox(0.05, 0.5, 1.3, 0.04), M.vidrio, 0.93, 1.34, 0)); vid.rotation.z = -0.32;
  for (const z of [-0.735, 0.735]) { add(mesh(rbox(0.6, 0.38, 0.02, 0.04), M.vidrio, 0.42, 1.38, z)); const p = plano(0.62, 0.31, texPuerta); p.position.set(0.38, 0.93, z + Math.sign(z) * 0.012); if (z < 0) p.rotation.y = Math.PI; add(p); }
  // caja de atrás con cajones de bebidas
  for (const [w, d, x, z] of [[1.6, 0.06, -0.9, 0.72], [1.6, 0.06, -0.9, -0.72], [0.06, 1.5, -1.68, 0]]) add(mesh(rbox(w, 0.4, d, 0.02), caM, x, 0.95, z));
  for (const [x, z, m] of [[-1.3, 0.35, M.g], [-1.3, -0.35, M.navy4], [-0.65, 0.35, M.navy4], [-0.65, -0.35, M.g], [-1.3, 0.35, M.navy4]].slice(0, 4)) {
    add(mesh(rbox(0.56, 0.32, 0.6, 0.03), m, x, 0.95, z));
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.08, 10), M.cr, x - 0.17 + i * 0.17, 1.15, z - 0.18 + j * 0.18));
  }
  // frente: paragolpes, parrilla, faros; el vano del motor (hueco oscuro) con guardabarros a los costados
  add(mesh(rbox(0.12, 0.2, 1.5, 0.05), M.navy, 1.72, 0.45, 0));
  add(mesh(rbox(0.04, 0.22, 0.8, 0.03), M.navy2, 1.69, 0.7, 0));
  for (const z of [-0.55, 0.55]) { const f = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 20), mat(0xfff3c4, 0.3, { emissive: 0xfff0b0, emissiveIntensity: 0.5 }), 1.71, 0.72, z); f.rotation.z = Math.PI / 2; add(f); }
  for (const z of [-0.69, 0.69]) add(mesh(rbox(0.82, 0.24, 0.12, 0.04), caM, 1.3, 0.86, z));
  add(mesh(rbox(0.06, 0.3, 1.4, 0.02), caM, 1.66, 0.85, 0));
  add(mesh(rbox(0.8, 0.04, 1.3, 0.02), M.negro, 1.28, 0.66, 0));
  // el motor
  add(mesh(rbox(0.42, 0.24, 0.5, 0.04), M.motor, 1.22, 0.82, -0.2));
  for (let i = 0; i < 4; i++) add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.1, 10), M.negro, 1.1 + i * 0.08, 0.98, -0.2));
  add(curva([V(1.0, 0.86, 0.1), V(1.2, 0.95, 0.15), V(1.45, 0.9, 0.05)], 0.025, M.goma, 12));
  // capó abierto (bisagra atrás, junto al parabrisas) y su varilla
  const capo = new THREE.Group(); capo.position.set(0.9, 1.0, 0); capo.rotation.z = 1.05; add(capo);
  capo.add(mesh(rbox(0.84, 0.05, 1.42, 0.03), caM, 0.42, 0.0, 0));
  capo.add(mesh(rbox(0.84, 0.02, 1.2, 0.02), M.cr3, 0.42, -0.03, 0));
  add(tubo(V(1.62, 0.9, -0.55), V(1.22, 1.72, -0.55), 0.012, M.alu));
  // ruedas
  for (const [x, z] of [[1.15, 0.72], [1.15, -0.72], [-1.1, 0.72], [-1.1, -0.72]]) {
    const r = mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 24), M.goma, x, 0.32, z); r.rotation.x = Math.PI / 2; add(r);
    const l = mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.235, 18), M.alu, x, 0.32, z); l.rotation.x = Math.PI / 2; add(l);
  }
}
// la batería muerta, en el vano del motor (lado de la vereda de la cámara)
const batMuerta = crearBateria(true); batMuerta.position.set(1.36, 0.8, 0.36); batMuerta.rotation.y = 0.2; cami.add(batMuerta);
const BAT_W = new THREE.Vector3(); cami.updateMatrixWorld(true); batMuerta.localToWorld(BAT_W.set(0, 0.15, 0));
// cables a los bornes


// ================= PERSONAJES =================
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 1000, parpadeoDur: 0.13, parpadeosExtra: [28.6, 30.3] });
const nestor = crearPersonaje(ELENCO.nestor);
const daniel = crearPersonaje(ELENCO.daniel);
for (const p of [ruben, nestor, daniel]) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) o.castShadow = true; }); }
// linterna de Rubén (en su mano derecha), su celular (en las dos manos), y el de Néstor con el mate a la mañana
const linterna = new THREE.Group(); scene.add(linterna);
linterna.add(mesh(new THREE.CylinderGeometry(0.028, 0.024, 0.2, 14), M.navy4, 0, 0, 0));
linterna.add(mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.05, 14), M.navy4, 0, -0.12, 0));
linterna.add(mesh(new THREE.CircleGeometry(0.034, 16).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xfff6d8, toneMapped: false, side: THREE.DoubleSide }), 0, -0.146, 0));
const luzCara = new THREE.PointLight(0xd8f5c4, 0, 1.6, 1.5); scene.add(luzCara);
const spot = new THREE.SpotLight(0xfff2cc, 0, 3, 0.5, 0.5, 1.2); scene.add(spot, spot.target);
// celulares
const celR = crearCelular(0.2, 0.4, 500, 1000); scene.add(celR);        // el de Rubén
const celN = crearCelular(0.22, 0.44, 500, 1000); scene.add(celN);      // el de Néstor, sobre el mostrador
const tapaN = new THREE.Mesh(new THREE.PlaneGeometry(0.22 * 0.92, 0.44 * 0.94), new THREE.MeshBasicMaterial({ color: 0x0d1118, transparent: true, opacity: 1, toneMapped: false }));
tapaN.position.z = 0.0205; celN.add(tapaN); // pantalla apagada (con su reflejo en el lienzo de abajo)
const celD = crearCelular(0.22, 0.44, 600, 1200); scene.add(celD);      // el de Daniel: el agente atiende
const celFin = crearCelular(0.6, 1.2, 600, 1200); scene.add(celFin);    // el del cierre
// soporte del celular de Daniel y cable del de Néstor
const soporte = new THREE.Group(); scene.add(soporte);
soporte.add(mesh(rbox(0.18, 0.02, 0.14, 0.008), M.navy, 0, 0.01, 0));
const sopA = mesh(rbox(0.04, 0.2, 0.02, 0.008), M.navy, 0, 0.1, -0.03); sopA.rotation.x = -0.25; soporte.add(sopA);
soporte.add(mesh(rbox(0.2, 0.02, 0.05, 0.008), M.navy, 0, 0.03, 0.04));
const mateN = crearMate(); scene.add(mateN);
const tenedores = [nestor, daniel].map(() => { const g = new THREE.Group(); g.add(mesh(rbox(0.012, 0.15, 0.006, 0.003), M.alu, 0, -0.04, 0)); for (const k of [-1, 0, 1]) g.add(mesh(rbox(0.004, 0.04, 0.004, 0.001), M.alu, k * 0.006, -0.135, 0)); scene.add(g); return g; });

// ================= OBJETOS DE LA HISTORIA =================
// la burbuja del mensaje de Rubén (sale volando a los dos locales)
const texBurbuja = lienzo(820, 420, (x) => {
  x.fillStyle = "#efeee5"; rr(x, 0, 0, 820, 420, 60);
  x.fillStyle = "#0b1220"; x.font = F(700, 64);
  ["Hola, ¿tienen batería", "12 V de 75 amperes?", "La necesito mañana", "temprano."].forEach((l, i) => x.fillText(l, 50, 100 + i * 82));
});
const texBurbujaG = lienzo(820, 420, (x) => {
  x.fillStyle = "#efeee5"; rr(x, 0, 0, 820, 420, 60);
  x.fillStyle = "#0b1220"; x.font = F(800, 116); x.fillText("¿Tienen", 56, 172); x.fillText("batería?", 56, 320);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(700, 110, 50, 0, 7); x.fill();
  x.fillStyle = "#0b1220"; x.font = F(800, 64); x.textAlign = "center"; x.fillText("1", 700, 133);
});
const burbujas = [0, 1].map(() => {
  const g = new THREE.Group(); scene.add(g);
  g.add(mesh(rbox(0.82, 0.42, 0.06, 0.08), M.cr));
  const p = plano(0.8, 0.41, texBurbuja); p.position.z = 0.032; g.add(p); g.userData.p = p;
  const cola = mesh(new THREE.ConeGeometry(0.05, 0.12, 4), M.cr, -0.32, -0.24, 0); cola.rotation.z = 0.6; g.add(cola);
  return g;
});
// la batería reservada (se adelanta del estante de Daniel) y su etiqueta
const batRes = crearBateria(false, true); scene.add(batRes);
const RES0 = V(X(1, 0.48), 1.52, -2.42);
der.baterias[5].visible = false; // ocupa el lugar de la primera del estante del medio (k = 1, i = 0), junto a la medianera
const texEtiq = lienzo(700, 300, (x) => {
  x.fillStyle = "#5ce611"; rr(x, 0, 0, 700, 300, 40);
  x.fillStyle = "#0b1220"; x.font = F(900, 92); x.textAlign = "center"; x.fillText("RESERVADA", 350, 118);
  x.font = F(800, 72); x.fillText("RUBÉN · 8:00", 350, 228);
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(56, 56, 18, 0, 7); x.fill();
});
const texEtiqGris = lienzo(700, 300, (x) => {
  x.fillStyle = "#c9c7b8"; rr(x, 0, 0, 700, 300, 40);
  x.fillStyle = "#3a3f4a"; x.font = F(900, 110); x.textAlign = "center"; x.fillText("12 V", 350, 128);
  x.font = F(800, 76); x.fillText("75 Ah", 350, 236);
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(56, 56, 18, 0, 7); x.fill();
});
function crearEtiqueta(tex = texEtiq, m = M.g) {
  const g = new THREE.Group();
  const cuerpo = new THREE.Group(); g.add(cuerpo);
  cuerpo.add(mesh(rbox(0.36, 0.155, 0.012, 0.02), m, 0, -0.12, 0));
  const p = plano(0.35, 0.15, tex); p.position.set(0, -0.12, 0.007); cuerpo.add(p);
  const p2 = plano(0.35, 0.15, tex); p2.position.set(0, -0.12, -0.007); p2.rotation.y = Math.PI; cuerpo.add(p2);
  cuerpo.add(tubo(V(-0.12, -0.05, 0), V(0, 0.02, 0), 0.004, M.navy)); cuerpo.add(tubo(V(0.12, -0.05, 0), V(0, 0.02, 0), 0.004, M.navy));
  g.userData.cuerpo = cuerpo;
  return g;
}
const etiq = crearEtiqueta(); scene.add(etiq);
// lo de Néstor: la MISMA batería en su estante, con su etiqueta gris quieta (nadie la reservó)
const batN = crearBateria(false); scene.add(batN);
const RESN = V(X(-1, 0.48), 1.52, -2.42);
izq.baterias[5].visible = false;
batN.position.copy(RESN); batN.rotation.y = 0.12;
const etiqN = crearEtiqueta(texEtiqGris, M.cr3); scene.add(etiqN);
etiqN.position.copy(RESN).add(V(0.0, BAT.h + 0.3, BAT.d / 2 + 0.02)); etiqN.rotation.y = 0.12;
// el mismo mensaje cae en los dos locales (gancho): dos burbujitas que entran por las rejas
const texMini = lienzo(400, 220, (x) => { x.fillStyle = "#efeee5"; rr(x, 0, 0, 400, 220, 50); x.fillStyle = "#0b1220"; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(120 + i * 80, 110, 26, 0, 7); x.fill(); } });
const minis = [-1, 1].map((s) => { const g = new THREE.Group(); g.add(mesh(rbox(0.8, 0.44, 0.06, 0.1), M.cr)); const p = plano(0.78, 0.43, texMini); p.position.z = 0.032; g.add(p); const c = mesh(new THREE.ConeGeometry(0.06, 0.14, 4), M.cr, -0.3 * s, -0.25, 0); c.rotation.z = 0.6 * s; g.add(c); g.userData.s = s; scene.add(g); return g; });
const tickVende = crearTick(0.42); scene.add(tickVende);
const tickRes = crearTick(0.075); scene.add(tickRes);
const tickFin = crearTick(0.32); scene.add(tickFin);

// el reloj digital 3D (pegado a la cámara: siempre arriba y limpio), "22:00" <-> "8:00"
const relojG = new THREE.Group();
const digM = mat(C.cr, 0.35), digVM = mat(C.g, 0.35, { emissive: C.g, emissiveIntensity: 0.3 });
relojG.add(mesh(rbox(3.0, 1.18, 0.3, 0.2), M.navy2, 0, 0, -0.15));
relojG.add(mesh(rbox(3.08, 1.26, 0.22, 0.22), M.g, 0, 0, -0.22));
const hora22 = new THREE.Group(), hora8 = new THREE.Group(); relojG.add(hora22, hora8);
// los dígitos van en un lienzo plano (la versión extruida dejaba una copia corrida de cada "2")
function armarHora(g, h) {
  const tex = lienzo(1024, 384, (x) => {
    x.font = F(900, 300); x.textAlign = "left"; x.textBaseline = "alphabetic";
    const wH = x.measureText(h).width, wM = x.measureText("00").width, gap = 90, tot = wH + gap + wM, x0 = (1024 - tot) / 2;
    x.fillStyle = "#efeee5"; x.fillText(h, x0, 300); x.fillText("00", x0 + wH + gap, 300);
    x.fillStyle = "#5ce611"; for (const yy of [140, 250]) { x.beginPath(); x.arc(x0 + wH + gap / 2, yy, 24, 0, 7); x.fill(); }
  });
  const p = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.01), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true }));
  p.position.z = 0.02; g.add(p);
}
armarHora(hora22, "22"); armarHora(hora8, "8");
pegarACamara(relojG, camera, 40);
const relojMats = []; relojG.traverse((o) => { if (o.isMesh) relojMats.push(o.material); });
// la burbuja de Néstor a la mañana (pegada a la cámara, grande)
const texBNes = lienzo(900, 380, (x) => {
  x.fillStyle = "#ffffff"; rr(x, 0, 0, 900, 380, 60);
  x.fillStyle = "#6b7280"; x.font = F(700, 46); x.fillText("Néstor · 8:02", 54, 78);
  x.fillStyle = "#0b1220"; x.font = F(800, 70); x.fillText("¡Buen día, Rubén!", 54, 180); x.fillText("Sí, tenemos. ¿Pasás?", 54, 280);
});
const burNes = new THREE.Group();
{ const b = mesh(rbox(1.8, 0.76, 0.06, 0.12), M.white); burNes.add(b); const p = plano(1.8, 0.76, texBNes); p.position.z = 0.032; burNes.add(p); const cola = mesh(new THREE.ConeGeometry(0.09, 0.22, 4), M.white, -0.62, -0.44, 0); cola.rotation.z = 0.5; burNes.add(cola); }
pegarACamara(burNes, camera, 42);

// ================= PANTALLAS (lienzos que se repintan por estado) =================
const CHAT = [
  { de: "r", txt: "Hola, ¿tienen batería 12 V de 75 amperes? La necesito mañana temprano.", h: "22:01" },
  { de: "a", txt: "¡Hola, Rubén! Sí, tenemos de 12 V y 75 amperes.", h: "22:01" },
  { de: "a", txt: "Abrimos a las 8. ¿Te la reservo?", h: "22:01" },
  { de: "r", txt: "Dale, a las 8 estoy.", h: "22:02" },
  { de: "a", txt: "Listo, quedó reservada a tu nombre. ¡Te esperamos!", h: "22:02" },
];
// el chat de Daniel (lienzo 600x1200): cabecera navy con "Agente de IA · Repuestos Daniel", fondo crema, burbujas
function pintarChat(cel, n, pop, opts = {}) {
  const { x, c } = cel.userData; const Wc = c.width, Hc = c.height, k = Wc / 600;
  const clave = `chat|${n}|${Math.round(pop * 12)}|${opts.vista || ""}`;
  if (clave === cel.userData.clave) return; cel.userData.clave = clave;
  x.save(); x.scale(k, k);
  const H = Hc / k;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, 600, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, 600, 170);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(78, 92, 46, 0, 7); x.fill();
  x.fillStyle = "#0b1220"; x.font = F(900, 40); x.textAlign = "center"; x.fillText("IA", 78, 106); x.textAlign = "left";
  x.fillStyle = "#efeee5"; x.font = F(800, 42); x.fillText(opts.titulo || "Repuestos Daniel", 144, 84);
  x.fillStyle = "#5ce611"; x.font = F(600, 32); x.fillText(opts.sub || "Agente de IA · atendiendo", 144, 128);
  x.fillStyle = "#dcdacb"; rr(x, 220, 196, 160, 52, 26); x.fillStyle = "#16243d"; x.font = F(700, 32); x.textAlign = "center"; x.fillText("Hoy", 300, 233); x.textAlign = "left";
  // burbujas de abajo hacia arriba (las últimas siempre a la vista)
  const lista = CHAT.slice(0, n);
  const alto = []; x.font = F(600, 38);
  for (const m of lista) alto.push(renglones(x, m.txt, 400).length * 48 + 74);
  // la burbuja nueva entra desde abajo y empuja la lista (sin saltos de un cuadro a otro)
  let y = H - 110 + (lista.length > 1 ? (1 - pop) * (alto[lista.length - 1] + 18) : 0);
  for (let i = lista.length - 1; i >= 0; i--) {
    const m = lista[i]; const h = alto[i]; y -= h + 18;
    if (y + h < 262) break;
    x.save(); x.beginPath(); x.rect(0, 262, 600, H - 110 - 262 + 4); x.clip();
    const lin = renglones(x, m.txt, 400); const w = Math.max(...lin.map((l) => x.measureText(l).width)) + 56;
    const esAg = m.de === "a"; const X0 = esAg ? 600 - 28 - w : 28;
    const s = i === lista.length - 1 ? 0.6 + 0.4 * pop : 1;
    x.save(); x.translate(X0 + (esAg ? w : 0), y + h); x.scale(s, s); x.translate(-(X0 + (esAg ? w : 0)), -(y + h));
    x.fillStyle = esAg ? "#5ce611" : "#ffffff"; rr(x, X0, y, w, h, 30);
    x.fillStyle = "#0b1220"; x.font = F(600, 38); lin.forEach((l, j) => x.fillText(l, X0 + 28, y + 52 + j * 48));
    x.fillStyle = esAg ? "#2c5a10" : "#6b7280"; x.font = F(600, 26); x.fillText(m.h, X0 + w - 92, y + h - 16);
    x.restore();
    x.restore();
  }
  // barra de escribir
  x.fillStyle = "#ffffff"; rr(x, 22, H - 96, 470, 74, 37); x.fillStyle = "#9aa0a8"; x.font = F(600, 34); x.fillText("Mensaje", 56, H - 48);
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(538, H - 59, 37, 0, 7); x.fill();
  x.fillStyle = "#5ce611"; x.beginPath(); x.moveTo(523, H - 77); x.lineTo(558, H - 59); x.lineTo(523, H - 41); x.closePath(); x.fill();
  x.restore();
  cel.userData.tex.needsUpdate = true;
}
// el celular de Néstor sobre el mostrador: apagado, o la pantalla bloqueada con "1 mensaje nuevo"
function pintarBloqueo(cel, prendido, opts = {}) {
  const { x, c } = cel.userData;
  const clave = `bloq|${Math.round(prendido * 10)}|${opts.hora || ""}`;
  if (clave === cel.userData.clave) return; cel.userData.clave = clave;
  x.fillStyle = "#0d1118"; x.fillRect(0, 0, 500, 1000);
  // reflejo del vidrio apagado
  x.fillStyle = "rgba(255,255,255,0.05)"; x.beginPath(); x.moveTo(0, 220); x.lineTo(500, 40); x.lineTo(500, 160); x.lineTo(0, 340); x.fill();
  if (prendido > 0.02) {
    x.globalAlpha = prendido;
    x.fillStyle = "#3a3f4a"; x.fillRect(0, 0, 500, 1000);
    x.fillStyle = "#efeee5"; x.font = F(300, 150); x.textAlign = "center"; x.fillText(opts.hora || "22:01", 250, 290);
    x.font = F(600, 36); x.fillStyle = "#c9c7b8"; x.fillText("martes", 250, 350);
    x.fillStyle = "rgba(239,238,229,0.95)"; rr(x, 22, 420, 456, 260, 34);
    x.textAlign = "left"; x.fillStyle = "#0b1220"; x.font = F(800, 50); x.fillText("Rubén", 52, 492);
    x.fillStyle = "#3a3f4a"; x.font = F(600, 36); x.fillText("Hola, ¿tienen batería", 52, 556); x.fillText("12 V de 75 amperes?…", 52, 606);
    x.fillStyle = "#efeee5"; x.font = F(800, 54); x.textAlign = "center"; x.fillText("1 mensaje nuevo", 250, 790);
    x.textAlign = "left"; x.globalAlpha = 1;
  }
  cel.userData.tex.needsUpdate = true;
}
// el celular de Rubén: el chat con lo que escribe (estado 0: escribiendo, 1: enviado, 2: la respuesta del agente)
function pintarCelR(estado, letras) {
  const { x } = celR.userData;
  const clave = `r|${estado}|${letras}`;
  if (clave === celR.userData.clave) return; celR.userData.clave = clave;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, 500, 1000);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, 500, 140);
  x.fillStyle = "#efeee5"; x.font = F(800, 40); x.fillText(estado === 2 ? "Repuestos Daniel" : "Repuestos", 40, 90);
  const txt = CHAT[0].txt;
  x.font = F(600, 38);
  if (estado === 0) {
    const vis = txt.slice(0, letras);
    const lin = renglones(x, vis, 360);
    x.fillStyle = "#ffffff"; rr(x, 20, 1000 - 60 - 60 - lin.length * 46, 460, lin.length * 46 + 50, 30);
    x.fillStyle = "#0b1220"; lin.forEach((l, j) => x.fillText(l, 44, 1000 - 60 - 60 - lin.length * 46 + 46 + j * 46));
  } else {
    const lin = renglones(x, txt, 330); const h = lin.length * 46 + 50; const y0 = estado === 2 ? 170 : 1000 - 120 - h;
    x.fillStyle = "#ffffff"; rr(x, 120, y0, 360, h, 28); x.fillStyle = "#0b1220"; lin.forEach((l, j) => x.fillText(l, 144, y0 + 52 + j * 46));
    if (estado === 2) {
      let y = y0 + h + 24;
      for (const m of [CHAT[3], CHAT[4]]) { const l2 = renglones(x, m.txt, 330); const h2 = l2.length * 46 + 50; x.fillStyle = "#5ce611"; rr(x, 20, y, 360, h2, 28); x.fillStyle = "#0b1220"; l2.forEach((l, j) => x.fillText(l, 44, y + 52 + j * 46)); y += h2 + 20; }
    }
  }
  x.fillStyle = "#ffffff"; rr(x, 20, 1000 - 96, 460, 72, 36);
  celR.userData.tex.needsUpdate = true;
}
// el celular del cierre: el chat resuelto con "Reservada" y un tilde
function texturas() {
  const cartel = (nombre, verde) => lienzo(1100, 250, (x) => {
    x.fillStyle = verde ? "#efeee5" : "#b9b7ab"; x.fillRect(0, 0, 1100, 250);
    if (verde) { x.strokeStyle = "#5ce611"; x.lineWidth = 18; rrS(x, 14, 14, 1072, 222, 24); }
    x.fillStyle = verde ? "#16243d" : "#3a3f4a"; x.font = F(700, 64); x.textAlign = "center"; x.fillText("REPUESTOS", 550, 98);
    x.fillStyle = verde ? "#0b1220" : "#2b2f38"; x.font = F(900, 108); x.fillText(nombre, 550, 210);
  });
  izq.cartelF.material.map = cartel("NÉSTOR", false); der.cartelF.material.map = cartel("DANIEL", true);
  izq.cartelB.material.map = cartel("NÉSTOR", false);
  der.cartelB.material.map = lienzo(1100, 250, (x) => {
    x.fillStyle = "#5ce611"; x.fillRect(0, 0, 1100, 250);
    x.strokeStyle = "#0b1220"; x.lineWidth = 18; rrS(x, 14, 14, 1072, 222, 24);
    x.fillStyle = "#0b1220"; x.font = F(900, 150); x.textAlign = "center"; x.fillText("TU LOCAL", 550, 180);
  });
  for (const L of locales) { L.cartelF.material.needsUpdate = true; L.cartelB.material.needsUpdate = true; }
  pintarChat(celD, 1, 1); pintarBloqueo(celN, 0); pintarCelR(0, 0);
  { // el celular del cierre: el resultado en grande (se lee en la tarjeta)
    const { x } = celFin.userData;
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 600, 1200);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, 600, 190);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(84, 96, 50, 0, 7); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 44); x.textAlign = "center"; x.fillText("IA", 84, 112); x.textAlign = "left";
    x.fillStyle = "#efeee5"; x.font = F(800, 46); x.fillText("Repuestos", 158, 86); x.fillText("Daniel", 158, 140);
    x.fillStyle = "#ffffff"; rr(x, 30, 250, 470, 200, 36); x.fillStyle = "#0b1220"; x.font = F(700, 56); x.fillText("Dale, a las", 62, 330); x.fillText("8 estoy.", 62, 400);
    x.fillStyle = "#5ce611"; rr(x, 70, 500, 500, 420, 40); x.fillStyle = "#0b1220"; x.font = F(800, 60);
    ["Listo, quedó", "reservada a", "tu nombre.", "¡Te esperamos!"].forEach((l, i) => x.fillText(l, 104, 590 + i * 84));
    x.fillStyle = "#16243d"; rr(x, 70, 970, 460, 110, 55); x.fillStyle = "#5ce611"; x.font = F(900, 58); x.textAlign = "center"; x.fillText("RESERVADA", 300, 1046); x.textAlign = "left";
    celFin.userData.tex.needsUpdate = true;
  }
}

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ, corte?]; cúbica monótona continua (Fritsch-Carlson).
const RUB = V(CAMI.x + 2.3, 0, CAMI.z - 0.55);       // Rubén junto al capó
const PHN = () => celN.position, PHD = () => celD.position;
const NP = V(X(-1, 0.32), 1.02, -0.86), DP = V(X(1, 0.32), 1.0, -0.86); // celulares sobre los mostradores
const DP_SCR = V(DP.x, DP.y + 0.27, DP.z + 0.05);
const CARD = V(-30, 20, 0);
const RGIRO_OTS = 0.35;
const OTS = V(RUB.x + Math.sin(RGIRO_OTS) * 0.36, 1.0, RUB.z + Math.cos(RGIRO_OTS) * 0.36); // el celular de Rubén
const OTS_AZ = Math.atan2(-Math.sin(RGIRO_OTS), -Math.cos(RGIRO_OTS)) / D2R; // detrás de Rubén
const CAM = [
  [0, 0, 3, 16.6, 0, 4.5, 0],
  [T.s02 - 0.001, 0, 3, 14.8, 0.05, 4.25, 0],
  // "Diez de la noche": corte a la camioneta, Rubén con la linterna
  [T.s02, 12, 6, 6.4, RUB.x - 0.45, 1.15, RUB.z + 0.25, true],
  [T.bateria - 0.001, 16, 9, 4.8, RUB.x - 0.45, 1.1, RUB.z + 0.3],
  // "murió la batería": inserto de la batería
  [T.bateria, -6, 26, 1.75, BAT_W.x - 0.03, BAT_W.y + 0.08, BAT_W.z, true],
  [T.s03 - 0.001, -4, 23, 1.42, BAT_W.x - 0.03, BAT_W.y + 0.08, BAT_W.z],
  // "y mañana reparte": Rubén escribe; la burbuja sale al costado de su cara
  [T.s03, RGIRO_OTS / D2R + 16, 6, 3.0, RUB.x, 1.25, RUB.z, true],
  [T.dos - 0.05, RGIRO_OTS / D2R + 12, 8, 3.4, RUB.x + Math.cos(RGIRO_OTS) * 0.18, 1.38, RUB.z - Math.sin(RGIRO_OTS) * 0.18],
  [T.dos + 0.3, RGIRO_OTS / D2R + 10, 8, 3.9, RUB.x + Math.cos(RGIRO_OTS) * 0.24, 1.42, RUB.z - Math.sin(RGIRO_OTS) * 0.24],
  // corte a las dos fachadas enteras: las dos copias entran grandes y vuelan a las rejas
  [T.dos + 0.32, 0, 4, 15.6, 0, 2.3, 0, true],
  [T.s04 + 0.33, 0, 4, 14.6, 0, 2.25, 0],
  [T.s04 + 0.33, -3, 16, 3.2, NP.x, 1.25, NP.z + 0.1, true],
  [T.nestor + 0.55, -6, 34, 1.4, NP.x, NP.y + 0.03, NP.z],
  [T.manana + 0.3, -8, 38, 1.3, NP.x, NP.y + 0.02, NP.z],
  [T.s05 - 0.35, -6, 32, 1.5, NP.x, NP.y + 0.05, NP.z],
  // de Néstor a Daniel: se abre a los dos mostradores (la medianera queda finita en el medio) y entra a lo de Daniel
  [T.s05 + 0.15, 0, 7, 4.6, 0, 1.25, -0.95],
  [T.contesta + 0.15, 0, 3, 1.32, DP_SCR.x, DP_SCR.y + 0.0, DP_SCR.z],
  [T.s05b, 0, 2, 1.26, DP_SCR.x, DP_SCR.y + 0.0, DP_SCR.z],
  [T.s05b + 0.4, 0, 2, 1.24, DP_SCR.x, DP_SCR.y + 0.0, DP_SCR.z],
  [T.reserva + 0.4, 8, 4, 2.4, X(1, 0.55), 1.80, -1.75],
  [T.ruben - 0.001, 10, 4, 2.3, X(1, 0.55), 1.82, -1.75],
  [T.ruben, 6, 3, 2.7, RUB.x, 1.42, RUB.z, true],
  [T.s07 - 0.001, 2, 3, 1.85, RUB.x, 1.5, RUB.z],
  // "La batería estaba en los dos estantes": corte a la casa de muñecas, los dos estantes iguales lado a lado
  [T.s07, 0, 3, 6.3, 0.05, 1.66, -2.2, true],
  [T.s08 - 0.05, 0, 3, 5.8, 0.05, 1.66, -2.2],
  [T.s08 + 0.6, 0, 8, 5.2, 0, 1.2, -0.95],
  [T.atendiendo - 0.35, 0, 7, 4.9, 0, 1.2, -0.95],
  // push-in al celular del agente (de frente y bajo: el estante de atrás queda fuera de cuadro)
  [T.s09 - 0.001, -6, 16, 1.25, DP.x, 1.27, DP.z],
  // corte a la mañana: el plano del cuadro 0; la cortina de Néstor sube; push-in al remate
  [T.s09, 0, 3, 16.6, 0, 3.5, 0, true],
  [T.cortinaN + 1.0, 0, 3, 15.6, 0, 3.35, 0.1],
  [T.remate - 0.001, 0, 3, 15.3, 0, 3.32, 0.1],
  [T.remate, 0, 6, 8.4, 0.2, 0.98, 0.6, true],
  [T.s10 - 0.001, 0, 6, 8.1, 0.2, 0.98, 0.65],
  [T.s10, 4, 3, 10.6, X(1, 1.2), 2.9, 0, true],
  [T.s11 - 0.001, 3, 3, 9.6, X(1, 1.2), 3.0, 0],
  [T.s11, 0, 0, 3.4, CARD.x, CARD.y - 0.24, CARD.z, true],
  [DUR, 0, 0, 3.2, CARD.x, CARD.y - 0.22, CARD.z],
];
const _mira = new THREE.Vector3();
const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6]];
function ponerCamara(t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = val(a), p2 = val(b), h = b[0] - a[0];
  if (b[7] === true) return ponerDesde(val(a), t);
  const prev = i > 0 && a[7] !== true ? CAM[i - 1] : null, next = i + 2 < CAM.length && CAM[i + 2][7] !== true ? CAM[i + 2] : null;
  const p0 = prev ? val(prev) : null, p3 = next ? val(next) : null;
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
  return ponerDesde(v, t);
}
let sacudon = 0;
function ponerDesde(v, t) {
  const [az, el, ld, tx, ty, tz] = v;
  const d = Math.exp(ld);
  _mira.set(tx, ty, tz);
  camera.position.set(_mira.x + d * Math.cos(el * D2R) * Math.sin(az * D2R), _mira.y + d * Math.sin(el * D2R), _mira.z + d * Math.cos(el * D2R) * Math.cos(az * D2R));
  const k = Math.min(1, 12 / d) * 0.4 * Math.min(1, d / 3);
  camera.position.x += Math.sin(t * 0.7) * 0.03 * k + sacudon * Math.sin(t * 90) * 0.01; camera.position.y += Math.sin(t * 0.53) * 0.02 * k;
  camera.near = Math.max(0.02, Math.min(0.3, d * 0.02)); camera.far = 200;
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  return { d, az, el };
}

// ================= ESCENA EN EL TIEMPO =================
const cNavy = new THREE.Color(C.navy), cCrema = new THREE.Color(C.cr), cVerde = new THREE.Color(C.g);
const cKeyN = new THREE.Color(0xbcd0ff), cKeyD = new THREE.Color(0xfff1de), cSkyN = new THREE.Color(0xb8c6e6), cSkyD = new THREE.Color(0xffffff), cGndN = new THREE.Color(0x2a3346), cGndD = new THREE.Color(0xcfc6ae);
const cBrilloOff = new THREE.Color(0x10151f), cBrilloG = new THREE.Color(0x5ce611), cBrilloDia = new THREE.Color(0x8a8f9c);
const _v = new THREE.Vector3(), _q = new THREE.Quaternion();
// día: 0 noche, 1 mañana
function dia(t) { return t >= T.s10 ? 0 : eio(sg(t, T.s09 + 0.28, T.s09 + 0.75)); } // aclara recién con el reloj ya en 8:00
// cortinas: 1 = abajo (cerrada), 0 = sin cortina (corte de casa de muñecas o levantada)
function cortina(L, t) {
  const corte = (a, b) => eio(sg(t, a, a + 0.5)) * (1 - eio(sg(t, b, b + 0.5)));
  let baja = Math.max(corte(T.s04 - 0.15, T.ruben + 0.02), corte(T.s07 - 0.7, L.s < 0 ? T.s09 - 0.6 : T.s09 + 0.15));
  if (t >= T.s09 && t < T.s10) baja = 0; // a la mañana las dos arrancan bajas: la de Daniel sube a las 8 en punto, la de Néstor después
  return 1 - baja;
}
function renderAt(t) {
  scene.environmentRotation.y = t * 0.05;
  const cam = ponerCamara(t);
  const d = dia(t);
  // fondo liso: noche navy, mañana crema, cierre verde
  const fin = t >= T.s11 ? 1 : 0;
  const bg = cNavy.clone().lerp(cCrema, d); if (fin) bg.copy(cVerde);
  renderer.setClearColor(bg, 1);
  key.color.copy(cKeyN).lerp(cKeyD, d); key.intensity = lerp(1.15, 2.4, d);
  fill.color.copy(cSkyN).lerp(cSkyD, d); fill.groundColor.copy(cGndN).lerp(cGndD, d); fill.intensity = lerp(0.95, 0.9, d);
  scene.environmentIntensity = lerp(0.32, 0.55, d);
  key.position.set(_mira.x - 5.8, 10, _mira.z + 9); key.target.position.set(_mira.x, 0, _mira.z); key.target.updateMatrixWorld();
  calleM.color.set(0x2d3340).lerp(new THREE.Color(0x6b6f78), d);
  for (const f of faroles) { f.l.intensity = lerp(9, 0, d); f.foco.material.color.set(0xffe2a8).lerp(new THREE.Color(0xc9c7b8), d); }

  // ---- las dos casas ----
  const prende = eio(sg(t, T.vende - 0.08, T.vende + 0.3));
  for (const L of locales) {
    const k = cortina(L, t);
    // la cortina se hunde en la vereda (corte) o, a la mañana, se enrolla en el tambor
    const sube = (L.s < 0 ? eio(sg(t, T.cortinaN, T.cortinaN + 1.0)) : eio(sg(t, T.subeD, T.subeD + 0.45))) * (t >= T.s09 && t < T.s10 ? 1 : 0);
    L.cortina.position.y = -(1 - k) * 2.95;
    L.cortina.scale.y = Math.max(0.02, 1 - sube * 0.98); L.cortina.position.y += sube * (ABRE.alto - 0.06);
    L.cortina.visible = k > 0.005 && sube < 0.99;
    // "cerradas": las dos cortinas golpean contra el piso y rebotan (clack); "Dos": los carteles laten, uno y otro
    // el brillo de la reja: verde en lo de Daniel desde "vende" (de noche)
    if (L.s > 0) L.brilloM.color.copy(cBrilloOff).lerp(cBrilloG, prende * (1 - d)).lerp(cBrilloDia, d * 0.6);
    else L.brilloM.color.copy(cBrilloOff).lerp(cBrilloDia, d * 0.6);
    L.luzCuarto.intensity = lerp(5, 1.5, d);
    L.cuarto.emissiveIntensity = lerp(0.28, 0.08, d);
    L.luzIn.intensity = (L.s > 0 ? lerp(1.6, 3.2, prende) : 1.4) * (1 - d) + 3.0 * d;
    // cartel: en "tu local" el de Daniel da la vuelta
    const gira = L.s > 0 ? eio(sg(t, T.tuLocal - 0.1, T.tuLocal + 0.55)) : 0;
    L.cartel.rotation.x = -gira * Math.PI;
    L.cartel.position.z = 0.3 + Math.sin(Math.PI * gira) * 0.35;
    L.cartel.scale.setScalar(1 + 0.08 * pulso(t, T.tuLocal + 0.45, 0.3) + 0.1 * pulso(t, T.casas + (L.s > 0 ? 0.18 : 0), 0.3));
  }
  // reloj de pared de Néstor: 22:01 (y la aguja del minutero se mueve un toque en "mañana")
  agujaH.rotation.z = -((22 % 12) / 12) * Math.PI * 2 - (1 / 60 / 12) * Math.PI * 2;
  agujaM.rotation.z = -(1 / 60) * Math.PI * 2 - eio(sg(t, T.manana - 0.1, T.manana + 0.2)) * 0.1;

  { pilarPB.position.y = 1.51 - (1 - cortina(izq, t)) * 3.1; pilarPB.visible = pilarPB.position.y > -1.5; }
  // ---- tilde de "vende" (arriba de la cortina de Daniel) ----
  { const s = t < T.s02 ? vida(t, T.vende - 0.02, T.s02, 0.4, 0.01) : 0; ocultar(tickVende, s); tickVende.position.set(X(1, 1.19), 2.3 + Math.sin(t * 2) * 0.03, 0.75); tickVende.rotation.set(0, Math.sin(t * 1.3) * 0.3, 0); }

  // ---- gancho: "el mismo mensaje" cae en los dos locales ----
  minis.forEach((g) => {
    const s0 = g.userData.s, a = T.mensaje - 0.1 + (s0 > 0 ? 0.12 : 0);
    const k = vida(t, a, T.vende - 0.35, 0.35, 0.3);
    ocultar(g, k * 0.9);
    const baja = eio(sg(t, T.vende - 0.35, T.vende - 0.05));
    g.position.set(X(s0, 1.19), 3.0 - 0.45 * baja + Math.sin(t * 3 + s0) * 0.03, 0.7); g.rotation.set(0, 0, Math.sin(t * 2 + s0) * 0.05);
  });
  // ---- "los dos estantes": las dos baterías iguales laten a la vez ----
  { const k = 1 + 0.22 * pulso(t, T.losDos - 0.08, 0.4); batN.scale.setScalar(k); const g8 = t < T.s09 ? 1 - eo(sg(t, T.s08 + 0.05, T.s08 + 0.4)) : 1; etiqN.scale.setScalar(Math.max(0.001, k * g8) * (t >= T.s07 - 0.5 && t < T.s08 + 0.1 ? 1.35 : 1.0)); etiqN.visible = g8 >= 0.002 && t >= T.s07 - 0.001; { const m = t >= T.s07 - 0.001 ? texBat : texBatS; const et = batN.userData.et; if (et.material.map !== m) { et.material.map = m; et.material.needsUpdate = true; } } }
  // ---- la batería muerta: su testigo rojo titila ----
  { const on = t >= T.bateria - 0.1 && t < T.s03 ? (Math.sin(t * 14) > 0 ? 1 : 0.25) : 0.25; batMuerta.userData.testigo.color.setRGB(0.42 + 0.40 * on, 0.11 + 0.11 * on, 0.10 + 0.10 * on, THREE.SRGBColorSpace); }

  // ---- Rubén ----
  rubenEn(t);
  // ---- celulares (antes que los dueños: Néstor usa el suyo a la mañana) ----
  celularesEn(t, d);
  // ---- Néstor y Daniel ----
  duenosEn(t, d);
  // ---- las burbujas que vuelan a los dos locales ----
  burbujasEn(t);
  // ---- la batería reservada y su etiqueta ----
  reservadaEn(t);
  // ---- el reloj digital y la burbuja de Néstor (pegados a la cámara) ----
  pegadosEn(t);
  renderer.render(scene, camera);
}

// ---------- Rubén ----------
function rubenEn(t) {
  const enCami = t >= T.s02 - 0.3 && t < T.s07;
  const enManana = t >= T.s09 + 0.2 && t < T.s10;
  ruben.raiz.visible = enCami || enManana;
  linterna.visible = false; spot.intensity = 0; celR.visible = false; luzCara.intensity = 0;
  // en el inserto de la batería y la caja de la camioneta Rubén queda fuera de cuadro: se oculta (nunca asoma una
  // tajada de su cabeza en el borde) y la linterna sigue iluminando la batería desde donde estaba
  if (t >= T.bateria && t < T.s03 - 0.05) {
    ruben.raiz.visible = false;
    spot.intensity = 6; spot.position.copy(BAT_W).add(V(0.5, 0.55, -0.35)); spot.target.position.copy(BAT_W); spot.target.updateMatrixWorld();
  }
  if (!ruben.raiz.visible) return;
  if (enCami) {
    const giroOTS = RGIRO_OTS;
    const claves = [
      // inclinado sobre el motor, con la linterna, cara de fastidio
      [0, { x: RUB.x, z: RUB.z, giro: -Math.PI / 2 + 0.95, inclina: 0.38, ...CARA.fastidio, cabeza: { asiente: 0.35, giro: -0.15 }, ojos: { y: -0.7, abiertos: 0.6, tension: -0.3 },
        manoI: [0.24, 0.12, 0.44], codoI: [0.8, -0.4, -0.2], manoD: [-0.16, 0.32, 0.5], codoD: [-0.8, -0.5, -0.2] }],
      // "temprano": levanta la cabeza y mira a cámara con fastidio
      [T.s02 + 0.5, { cabeza: { asiente: 0.05, giro: 0.35 }, ojos: { y: 0.1, x: 0.5, abiertos: 0.6 }, inclina: 0.3 }, 0.25],
      [T.bateria - 0.02, { cabeza: { asiente: 0.4, giro: -0.15 }, ojos: { y: -0.5, x: 0, abiertos: 0.7 }, inclina: 0.4 }, 0.25],
      // se endereza, saca el celular y se da vuelta hacia los locales (de espaldas a la cámara, sobre su hombro)
      [T.s03 - 0.02, { giro: giroOTS, inclina: 0.05, cabeza: { asiente: 0.3, giro: 0 }, ...CARA.concentrada, ojos: { y: -0.45, abiertos: 0.95 },
        manoI: [0.075, 0.33, 0.3], manoD: [-0.075, 0.33, 0.3], codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] }, 0.05],
      // (corte) primer plano: se gira a la cámara y mira el celular, verde en la cara
      [T.ruben - 0.001, { giro: 0.05, inclina: 0.06, cabeza: { asiente: 0.32, giro: 0.0 }, ...CARA.neutra, ojos: { y: 0, abiertos: 1, tension: 0 }, cejas: { alto: 0.2, ang: 0.1 }, boca: { sonrisa: -0.1 },
        manoI: [0.07, 0.3, 0.33], manoD: [-0.07, 0.3, 0.33], codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] }, 0.001],
      // pausa: levanta las cejas (sorpresa), mira el celular de nuevo, mira a cámara (esperanza)
      [T.ruben + 0.35, { cejas: { alto: 0.95, ang: 0.25 }, ojos: { abiertos: 1, y: -0.1 } }, 0.2],
      [W[48] + 0.05, { cabeza: { asiente: 0.04, giro: 0.0, ladea: 0.06 }, ojos: { y: 0.05, x: 0.0, abiertos: 1 }, cejas: { alto: 0.8, ang: 0.45 } }, 0.25],
      [T.hora + 0.1, { ...CARA.esperanza, cabeza: { asiente: 0.0, ladea: -0.05, giro: 0.08 }, ojos: { y: 0.05, x: 0, abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55, ancho: 1.05 } }, 0.35],
    ];
    const p = poseEn(t, claves);
    if (t >= T.s03 - 0.05 && t < T.ruben) {
      // tipea: los pulgares van y vienen
      const tip = Math.sin(t * 38) * 0.012;
      p.manoI = [p.manoI[0], p.manoI[1] + tip, p.manoI[2]]; p.manoD = [p.manoD[0], p.manoD[1] - tip, p.manoD[2]];
    }
    // la boca con la voz (solo en su línea)
    if (t >= VOZ_T && t < VOZ_T + VOZ_ENV.length / 30) {
      const f = (t - VOZ_T) * 30, i = Math.floor(f);
      const e = lerp(VOZ_ENV[i] ?? 0, VOZ_ENV[i + 1] ?? 0, f - i);
      p.boca = { ...p.boca, abierta: e * 0.75, ancho: lerp(p.boca.ancho, 0.85, e) };
    }
    ruben.poner(p);
    // linterna (en la mano derecha) mientras mira el motor
    if (t < T.s03 - 0.1) {
      ruben.raiz.updateMatrixWorld(true);
      const m = ruben.mano("D"); m.updateMatrixWorld(true);
      m.getWorldPosition(_v); linterna.visible = true; linterna.position.copy(_v).add(V(0, -0.03, 0));
      linterna.lookAt(BAT_W); linterna.rotateX(Math.PI / 2);
      spot.intensity = 6; spot.position.copy(_v); spot.target.position.copy(BAT_W); spot.target.updateMatrixWorld();
    }
    // el celular en las manos
    if (t >= T.s03 - 0.05) {
      ruben.raiz.updateMatrixWorld(true);
      const p0 = ruben.cuerpo.localToWorld(V(0, 0.4, 0.34));
      celR.visible = true; celR.position.copy(p0);
      ruben.cuerpo.getWorldQuaternion(_q); celR.quaternion.copy(_q); celR.rotateY(Math.PI); celR.rotateX(-0.75);
      celR.scale.setScalar(t >= T.ruben ? 0.72 : 0.95);
      if (t < T.ruben) { luzCara.intensity = 0.3; luzCara.position.copy(ruben.cuerpo.localToWorld(V(0, 0.5, 0.9))); }
      if (t >= T.ruben) { celR.rotateX(0.25); luzCara.intensity = 0.35; luzCara.position.copy(ruben.cuerpo.localToWorld(V(0, 0.5, 0.9))); } else celR.rotateX(0.3);
    }
  } else {
    // a la mañana: sale de lo de Daniel con la batería bajo el brazo, se da vuelta hacia Néstor y la levanta
    const t0 = T.s09 + 0.35;
    const claves = [
      [0, { x: X(1, 1.05), z: -0.55, giro: 0.15, paso: 1, ...CARA.sonrisa, cabeza: { giro: 0.1 }, manoI: [0.27, 0.2, 0.05], codoI: [1, -0.2, -0.3], manoD: [-0.29, -0.08, 0.04] }],
      [t0 + 1.1, { x: X(1, 0.3), z: 1.1, giro: 0.0 }, 1.1, (u) => u],
      [t0 + 1.35, { paso: 0 }, 0.25],
      // la cortina de al lado sube: gira la cabeza
      [T.cortinaN + 0.5, { cabeza: { giro: -0.75 }, ojos: { x: -0.7 }, cejas: { alto: 0.4 } }, 0.3],
      // le vibra el celular: lo lee
      [T.msjN + 0.1, { cabeza: { giro: -0.2, asiente: 0.25 }, ojos: { x: -0.1, y: -0.6 }, cejas: { alto: 0.7, ang: 0.2 }, boca: { sonrisa: 0.2 } }, 0.25],
      // levanta la batería hacia Néstor y se ríe
      [T.levanta, { giro: -0.85, cabeza: { giro: 0.25, asiente: -0.05 }, ojos: { x: 0.4, y: 0.05, feliz: 0.4 }, ...CARA.feliz, manoI: [0.19, 0.3, 0.4], manoD: [-0.19, 0.3, 0.4], codoI: [1, -0.4, -0.2], codoD: [-1, -0.4, -0.2] }, 0.3],
    ];
    const p = poseEn(t, claves);
    ruben.poner(p);
  }
}
// ---------- Néstor y Daniel: la cena (arriba) y la mañana (abajo) ----------
function duenosEn(t, d) {
  const cena = false; // (la cena salió del guion en la ronda 1)
  const manana = t >= T.s09 + 0.2 && t < T.s10;
  mateN.visible = false; tenedores.forEach((f) => (f.visible = false));
  [nestor, daniel].forEach((P, i) => {
    const s = i === 0 ? -1 : 1, L = locales[i];
    P.raiz.visible = cena || manana; // Néstor ya está detrás de su cortina: aparece cuando ella sube
    if (!P.raiz.visible) return;
    if (cena) {
      // de pie junto a la mesa, de frente a la ventana: cansados y contentos; en "mañana" los dos levantan el tenedor a la vez
      const claves = [
        [0, { x: L.mesa.x, y: PISO2, z: -1.02, giro: 0, ...CARA.sonrisa, cabeza: { asiente: 0.28, giro: -s * 0.08 }, ojos: { y: -0.6, abiertos: 0.75, feliz: 0.2 }, cejas: { alto: 0.15, ang: 0.35 },
          manoI: [0.2, 0.28, 0.42], manoD: [-0.2, 0.3, 0.42], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2], inclina: 0.1 }],
        [T.duenos + 0.1, { cabeza: { asiente: 0.05, giro: s * 0.1 }, ojos: { y: 0, x: -s * 0.2, abiertos: 0.85 } }, 0.3],
        [T.mananaC - 0.05, { manoD: [-0.14, 0.52, 0.38], codoD: [-0.9, -0.4, -0.2], cabeza: { asiente: -0.05 }, boca: { sonrisa: 0.4, abierta: 0.35 } }, 0.3],
        [T.mananaC + 0.45, { manoD: [-0.2, 0.3, 0.42], boca: { sonrisa: 0.85, abierta: 0 }, ojos: { feliz: 0.45 } }, 0.35],
      ];
      P.poner(poseEn(t, claves));
      P.raiz.updateMatrixWorld(true);
      const f = tenedores[i]; f.visible = true; P.mano("D").getWorldPosition(f.position); P.mano("D").getWorldQuaternion(f.quaternion);
    } else {
      // a la mañana: Daniel detrás de su mostrador, saluda a Rubén; Néstor en su puerta con el mate y el celular
      if (s > 0) {
        const claves = [
          [0, { x: X(1, 1.2), z: -1.55, giro: -0.3, ...CARA.sonrisa, cabeza: { giro: -0.2 }, manoI: [0.3, 0.32, 0.36], manoD: [-0.3, 0.32, 0.36] }],
          [T.s09 + 0.9, { manoI: [0.4, 0.86, 0.12], codoI: [1, -0.6, -0.2] }, 0.3],
          [T.s09 + 1.8, { manoI: [0.3, 0.32, 0.36], codoI: null }, 0.35],
        ];
        const p = poseEn(t, claves);
        if (t > T.s09 + 0.9 && t < T.s09 + 1.6) p.manoI = [0.4 + Math.sin(t * 15) * 0.05, 0.86, 0.12];
        P.poner(p);
      } else {
        const claves = [
          [0, { x: X(-1, 0.75), z: -0.5, giro: 0.1, ...CARA.neutra, cabeza: { asiente: 0.3 }, ojos: { y: -0.8 }, manoI: [0.22, 0.25, 0.25], manoD: [-0.075, 0.33, 0.3], codoD: [-0.6, -0.8, -0.3] }],
          [T.msjN - 0.05, { cabeza: { asiente: 0.3 } }, 0.2],
          // levanta la vista: lo ve a Rubén con la batería; se ríe y le hace "la próxima" con la mano
          [T.levanta + 0.15, { giro: 0.7, cabeza: { asiente: 0.0, giro: 0.15 }, ojos: { y: 0.05, x: 0.4, feliz: 0.5 }, ...CARA.feliz, manoD: [-0.28, 0.42, 0.34], codoD: [-1, -0.5, -0.2] }, 0.3],
        ];
        const p = poseEn(t, claves);
        if (t > T.levanta + 0.1) p.manoD = [-0.28 + Math.sin(t * 11) * 0.03, 0.42 + Math.abs(Math.sin(t * 11)) * 0.04, 0.34];
        P.poner(p);
        P.raiz.updateMatrixWorld(true);
        celN.visible = true; tapaN.visible = false; P.mano("D").getWorldPosition(celN.position); P.cuerpo.getWorldQuaternion(celN.quaternion); celN.rotateY(Math.PI); celN.rotateX(-0.6); celN.scale.setScalar(0.62);
        pintarChat(celN, 1, 1, { titulo: "Rubén", sub: "Cliente", vista: "nes" });
        mateN.visible = true; P.mano("I").getWorldPosition(mateN.position); mateN.position.y -= 0.12; mateN.rotation.set(0, 0, 0);
      }
    }
  });
}
// ---------- celulares ----------
function celularesEn(t, d) {
  // Néstor: acostado sobre el mostrador, cargando; en "Néstor" se prende 1 s y se apaga (de noche)
  {
    const noche = t < T.s09 + 0.3 || t >= T.s10;
    celN.visible = noche;
    celN.position.copy(NP).add(V(0, 0.018, 0)); celN.rotation.set(-Math.PI / 2 + 0.0, 0, 0.12);
    const on = t >= T.nestor + 0.2 && t < T.manana + 0.15 ? 1 - eio(sg(t, T.manana - 0.25, T.manana + 0.15)) : 0;
    if (noche) { pintarBloqueo(celN, 1); tapaN.visible = true; tapaN.material.opacity = 1 - on; }
    celN.scale.setScalar(1 + 0.05 * pulso(t, T.nestor + 0.2, 0.25));
  }
  // Daniel: parado en su soporte; de noche el agente contesta (las burbujas entran una por una)
  {
    celD.visible = true; soporte.visible = true;
    soporte.position.set(DP.x, 1.0, DP.z);
    const saluda = pulso(t, T.atendiendo - 0.05, 0.5);
    celD.position.set(DP.x, DP.y + 0.25 + 0.02 * saluda, DP.z + 0.005);
    celD.rotation.set(-0.12 - 0.3 * saluda, 0, 0);
    const tb = [-1, T.contesta + 0.05, T.agente + 0.35, T.ia + 0.25, T.s05b + 0.12];
    let n = 1; for (let i = 1; i < tb.length; i++) if (t >= tb[i]) n = i + 1;
    const pop = eo(sg(t, tb[n - 1], tb[n - 1] + 0.25));
    pintarChat(celD, n, n === 1 ? 1 : pop);
  }
  // el del cierre
  {
    celFin.visible = t >= T.s11;
    if (celFin.visible) { celFin.position.copy(CARD).add(V(0, 0.1, 0)); celFin.rotation.set(-0.05, Math.sin(t * 1.1) * 0.12 - 0.15, 0.04); celFin.scale.setScalar(0.6 * lerp(0.8, 1, bk(sg(t, T.s11, T.s11 + 0.3)))); }
    const s = t >= T.s11 ? 0.36 * bk(sg(t, T.s11 + 0.25, T.s11 + 0.6)) : 0; ocultar(tickFin, s);
    tickFin.position.copy(CARD).add(V(0.29, 0.02, 0.12)); tickFin.rotation.set(0, Math.sin(t * 1.4) * 0.3, 0);
  }
  // Rubén: escribe, envía, y en el primer plano le llega la respuesta del agente
  {
    const letras = Math.round(cl((t - (T.s03 + 0.05)) / (T.dos - 0.2 - T.s03)) * CHAT[0].txt.length);
    const estado = t >= T.ruben ? 2 : t >= T.dos - 0.15 ? 1 : 0;
    pintarCelR(estado, letras);
  }
}
// ---------- las burbujas del mensaje: salen del celular de Rubén y vuelan a los dos locales ----------
function burbujasEn(t) {
  burbujas.forEach((b, i) => {
    const s = i === 0 ? -1 : 1;
    const t0 = T.dos - 0.18, t1 = s < 0 ? T.nestor + 0.15 : T.s05 + 0.15;
    const vis = t >= t0 && t < t1;
    b.visible = vis; if (!vis) return;
    celR.updateMatrixWorld(true);
    const A = celR.localToWorld(V(0, 0.05, 0.12));
    const parar = V(X(s, 0.85), 2.5, 0.9); // delante de la reja de cada local (dentro del cuadro)
    const destino = s < 0 ? V(NP.x, NP.y + 0.05, NP.z) : V(DP.x, DP.y + 0.3, DP.z);
    // las dos copias salen juntas (se lee una sola burbuja) al costado de la cara de Rubén, y se separan en el vuelo
    const arriba = V(RUB.x, 1.55, RUB.z).addScaledVector(V(Math.cos(RGIRO_OTS), 0, -Math.sin(RGIRO_OTS)), 0.5).addScaledVector(V(Math.sin(RGIRO_OTS), 0, Math.cos(RGIRO_OTS)), 0.55);
    const corte = T.dos + 0.32;
    let p, k;
    if (t < corte) {
      // al costado de la cara de Rubén (las dos copias juntas: se lee una sola burbuja)
      const u0 = eo(sg(t, t0, t0 + 0.32));
      p = lerpV(A, arriba, u0); k = lerp(0.12, 0.6, u0);
    } else {
      // tras el corte: entran grandes, cerca de la cámara, una a cada lado, y vuelan a la reja de su local
      const E = V(s * 0.62, 2.75, 5.6);
      const u1 = eio(sg(t, corte, T.s04 + 0.1));
      p = lerpV(E, parar, u1); p.y += Math.sin(Math.PI * u1) * 0.35;
      k = 1.5 * (1 - 0.1 * u1);
    }
    // espera en la puerta y entra al celular de su local
    const ent0 = s < 0 ? T.nestor - 0.2 : T.s05 - 0.25;
    const u2 = eio(sg(t, ent0, t1));
    p = lerpV(p, destino, u2); k *= 1 - 0.85 * u2;
    b.position.copy(p); b.scale.setScalar(k);
    b.lookAt(camera.position);
    { const m = t < corte ? texBurbuja : texBurbujaG; const pm = b.userData.p.material; if (pm.map !== m) { pm.map = m; pm.needsUpdate = true; } }
  });
}
// ---------- la batería reservada ----------
function reservadaEn(t) {
  const a = T.reserva + 0.1;
  const u = bk(sg(t, a, a + 0.45));
  const manana = t >= T.s09 + 0.2 && t < T.s10;
  batRes.visible = !manana && t < T.s09 + 0.2;
  etiq.visible = false;
  { const m = t >= T.reserva + 0.1 && !(t >= T.s08 && t < T.s09) ? texBat : texBatS; /* en s08 el foco es el celular: su "12 V" verde no compite con los subtítulos */ const et = batRes.userData.et; if (et.material.map !== m) { et.material.map = m; et.material.needsUpdate = true; } }
  if (batRes.visible) {
    batRes.position.copy(RES0).add(V(0, 0.12 * Math.sin(Math.PI * sg(t, a, a + 0.45)), 0.42 * u));
    batRes.rotation.set(0, -0.15 * u, 0);
    batRes.scale.setScalar((1 + 0.15 * pulso(t, a + 0.2, 0.3)) * (1 + 0.22 * pulso(t, T.losDos + 0.04, 0.4)));
    const e = eo(sg(t, a + 0.35, a + 0.65));
    if (e > 0) {
      const g8 = t < T.s09 ? 1 - eo(sg(t, T.s08 + 0.05, T.s08 + 0.4)) : 1; /* en s08 los carteles se van: el foco es el celular y no pisan los subtítulos */
      etiq.visible = e * g8 > 0.001; etiq.scale.setScalar(Math.max(0.001, e * g8) * (t >= T.s07 - 0.5 && t < T.s08 + 0.1 ? 1.35 : 1.0));
      etiq.position.copy(batRes.position).add(V(0.0, BAT.h + 0.3, BAT.d / 2 + 0.02));
      etiq.rotation.set(0, -0.15, 0); etiq.userData.cuerpo.rotation.z = Math.sin((t - a) * 6) * 0.25 * Math.exp(-(t - a - 0.35) * 2.5);
    }
  }
  // a la mañana: bajo el brazo de Rubén (y la levanta en el remate)
  if (manana && ruben.raiz.visible) {
    batRes.visible = true;
    ruben.raiz.updateMatrixWorld(true);
    const lev = eio(sg(t, T.levanta - 0.3, T.levanta));
    const loc = lerpV(V(0.34, 0.12, 0.08), V(0.0, 0.2, 0.4), lev);
    batRes.position.copy(ruben.cuerpo.localToWorld(loc));
    ruben.cuerpo.getWorldQuaternion(batRes.quaternion); batRes.rotateY(lev * 0.0 + (1 - lev) * Math.PI / 2);
    batRes.scale.setScalar(0.9);
    etiq.visible = true; etiq.scale.setScalar(0.9);
    batRes.updateMatrixWorld(true);
    etiq.position.copy(batRes.localToWorld(V(0.0, BAT.h + 0.26, BAT.d / 2 + 0.02))); etiq.quaternion.copy(batRes.quaternion);
    etiq.userData.cuerpo.rotation.z = Math.sin(t * 7) * 0.12;
  }
  // tilde chico sobre la batería al reservarla
  { const s = vida(t, a + 0.5, T.ruben - 0.1, 0.3, 0.1); ocultar(tickRes, s); tickRes.position.copy(RES0).add(V(0.2, BAT.h + 0.08, 0.48)); tickRes.rotation.set(0, Math.sin(t * 2) * 0.3, 0); }
}
// ---------- pegados a la cámara ----------
const tanFov = Math.tan((30 * D2R) / 2);
function pegadosEn(t) {
  // el reloj: en la transición a la mañana gira "22:00" -> "8:00"; en el callback vuelve a "22:00"
  const vis0 = t < T.s02;
  const vis1 = t >= T.s09 && t < W[71] + 0.3;
  const vis2 = t >= T.s10 && t < T.tuLocal - 0.2;
  relojG.visible = (vis0 || vis1 || vis2) && !window.__limpio;
  if (relojG.visible) {
    const D = 6, hF = 2 * D * tanFov;
    relojG.position.set(0, hF * (0.5 - (vis0 ? 0.865 : vis1 ? 0.36 : 0.6)), -D);
    // entra con un pop corto y sale con fundido + leve achique (nunca queda un punto)
    const ent = vis0 ? 1 : vis1 ? sg(t, T.s09 - 0.01, T.s09 + 0.05) : sg(t, T.s10, T.s10 + 0.25);
    const sal = vis0 ? 0 : vis1 ? eio(sg(t, W[71], W[71] + 0.25)) : eio(sg(t, T.tuLocal - 0.45, T.tuLocal - 0.2));
    const alfa = cl(Math.min(vis1 ? 1 : ent * 1.6, 1 - sal));
    const s = (vis0 ? 0.78 : (vis1 ? 1 : lerp(0.82, 1, bk(ent))) * (1 - 0.18 * sal)) * 0.36;
    relojG.scale.setScalar(s);
    for (const m of relojMats) m.opacity = alfa;
    relojG.visible = alfa > 0.01;
    const f = vis0 ? 0 : vis1 ? eio(sg(t, T.s09 + 0.04, T.s09 + 0.3)) : 1 - eio(sg(t, T.s10 + 0.1, T.s10 + 0.5));
    // cambio de hora: la vieja se aplasta y la nueva crece (sin cruzar dígitos)
    const a = cl(f / 0.6), b = cl((f - 0.4) / 0.6);
    hora22.scale.set(1, Math.max(0.001, 1 - eio(a)), 1); hora22.visible = a < 0.999;
    hora8.scale.set(1, Math.max(0.001, bk(b)), 1); hora8.visible = b > 0.001;
  }
  // la burbuja de Néstor
  const sb = vida(t, T.msjN, T.s10 - 0.15, 0.4, 0.12);
  burNes.visible = sb > 0.002;
  if (burNes.visible) {
    const D = 6, hF = 2 * D * tanFov;
    burNes.position.set(-0.05, hF * (0.5 - 0.21), -D); // arriba: en el remate no hay subtítulos y no tapa caras
    burNes.scale.setScalar(sb * 0.75 * (1 + 0.04 * pulso(t, T.msjN + 0.3, 0.25)));
    burNes.rotation.set(0, 0, Math.sin(t * 2) * 0.02);
  }
}

texturas();
window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
