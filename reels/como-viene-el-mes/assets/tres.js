// Capa 3D de como-viene-el-mes (Three.js r170 local). Base técnica: reels/anotamelo (globos pegados a la cámara en
// píxeles de pantalla, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo set: el ALMACÉN DE RUBÉN CERRADO, DE NOCHE. Paredes navy claro #16243d planas, persiana metálica crema con
// nervaduras navy en la pared de adelante (bajada hasta 1,15 m), mostrador navy3 con tapa de madera clara, la lámpara de
// banquero con pantalla verde de marca sobre el mostrador (no cambia nunca), estantes con mercadería de colores planos.
//   PARTE 1: "¿Y, cómo viene el mes?" · "Pará que te digo." · la caja TICKETS (saltan), el pinche, la calculadora con
//            rollo · la noche: la montaña de cinta, la torre de pocillos 1 → 7, Marta sentada en el cajón · la mañana:
//            la franja de luz y el pan bajo la persiana · TOTAL, arranca la cinta, la lee · "Ahí." · "¿Y comparado con el
//            mes pasado?" · la caja MES PASADO · C → 0. · "Pongo otro café."
//   PARTE 2: el celular en el atril: el resumen del mes · "Ocho por ciento arriba…" · la yerba ✓ · "¿Y a vos?" ·
//            Marta: "Pará que te digo." y su caja CAFETERÍA · Rubén se sienta con el mate y un pocillo.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import {
  crearPersonaje, ELENCO, poseEn, CARA, BRAZOS, pegarACamara,
  crearMate, crearTermo, crearCelular, crearYerba, crearGalletitas, crearDulceDeLeche, crearPolenta, crearFideos,
  crearBolsaPapel, crearPanFlauta, crearVapor, crearBanquito,
} from "./personajes.js";
import { T, DUR, P1, P2, ENV, LIMPIO } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"'), document.fonts.load('500 60px "IBM Plex Mono"')]);

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const en = (t, a, b) => t >= a && t < b;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

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
scene.background = new THREE.Color(0x0b1220);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 80);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x2a3040);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(10, 1.2, 0, 7, 0, 0, 0xfff1dc, 1.2);
  tira(4, 6, -6, 2, -1, Math.PI / 2, 0xdfe6f5, 0.9);
  tira(1.4, 8, 4, 1, 6, 0, 0xc8d4ff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.45;

// ---------- luces: de noche, pero las caras bien iluminadas (la noche es el fondo, no las caras). Luz principal blanca
// cálida desde arriba (el tubo del techo), cielo hemisférico, contraluz frío y relleno desde la cámara. ----------
const sol = new THREE.DirectionalLight(0xfff5e6, 2.2);
sol.position.set(-2.2, 5.0, 2.4); sol.target.position.set(0.3, 0.9, -1.2);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 3;
Object.assign(sol.shadow.camera, { left: -3.4, right: 3.4, top: 3.4, bottom: -3.4, near: 1, far: 14 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xe2e8f2, 0x3a3a48, 1.0); scene.add(cielo);
const rim = new THREE.DirectionalLight(0xd6e4ff, 0.75); rim.position.set(2.5, 3.2, -5); scene.add(rim);
const relleno = new THREE.DirectionalLight(0xfff6ea, 0.5); scene.add(relleno, relleno.target);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, maderaC: 0xc89a64, mostaza: 0xd9a441, kraft: 0xc4a57c, papel: 0xf6f4ea, calido: 0xf4ecd2 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  pared: new THREE.MeshBasicMaterial({ color: C.navy2 }), navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.65),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.6), madera: mat(C.madera, 0.55), maderaC: mat(C.maderaC, 0.55), g: mat(C.g, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.9), papel: mat(C.papel, 0.85, { side: THREE.DoubleSide }), metal: mat(0xb9bec8, 0.3, { metalness: 0.7 }), bronce: mat(0x9a8556, 0.35, { metalness: 0.6 }),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const FM = (s) => `500 ${s}px "IBM Plex Mono", monospace`;
const FC = (s) => `700 ${s}px "Caveat", cursive`;
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const rot = (o, eje, v) => { o.rotation[eje] = v; return o; };
const sombra = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };

// ================= EL SET =================
// x: izquierda (-) a derecha (+) mirando desde el lado del cliente hacia Rubén (-z). Pared del fondo (detrás de Rubén)
// z = BZ con la estantería; pared de adelante z = FZ con la PERSIANA (la vidriera del local); mostrador cruzando en
// z = -1.3.
const LX = -1.9, RX = 2.3, FZ = 1.35, BZ = -3.15, TECHO_Y = 3.0;
const PERS = { x0: -0.9, x1: 0.9, alto: 2.4, y: 1.15 };   // la persiana bajada hasta 1,15 m (Marta pasa agachada)
const MOSTRADOR = { x: 0.35, y: 0.95, z: -1.3, w: 2.3, d: 0.62 };
const MY = MOSTRADOR.y, MZF = MOSTRADOR.z + MOSTRADOR.d / 2;   // la tapa y el frente del mostrador (lado del cliente)
const RI = { x: 0.35, z: -1.9 };
const ZOC = 0.9;
{
  const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#cfcdbf" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(4.2, 4.5);
  const p = mesh(new THREE.PlaneGeometry(RX - LX, FZ - BZ), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.6 }), (LX + RX) / 2, 0.0, (FZ + BZ) / 2); p.rotation.x = -Math.PI / 2; p.castShadow = false; scene.add(p);
  const techo = new THREE.Mesh(new THREE.BoxGeometry(RX - LX, 0.1, FZ - BZ), mat(0x26314a, 0.95)); techo.position.set((LX + RX) / 2, TECHO_Y, (FZ + BZ) / 2); scene.add(techo);
  const pared = (x0, x1, y0, y1, plano, fijo, dir, zocalo = true) => {
    const w = x1 - x0, h = y1 - y0, c = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const m = new THREE.Mesh(new THREE.BoxGeometry(plano === "z" ? w : 0.1, h, plano === "z" ? 0.1 : w), M.pared);
    if (plano === "z") m.position.set(c, cy, fijo - dir * 0.05); else m.position.set(fijo - dir * 0.05, cy, c);
    scene.add(m);
    if (!zocalo || y0 > 0.01) return;
    const z = new THREE.Mesh(new THREE.BoxGeometry(plano === "z" ? w : 0.02, Math.min(ZOC, h), plano === "z" ? 0.02 : w), M.navy3);
    if (plano === "z") z.position.set(c, Math.min(ZOC, h) / 2, fijo + dir * 0.012); else z.position.set(fijo + dir * 0.012, Math.min(ZOC, h) / 2, c);
    scene.add(z);
    if (h > ZOC + 0.04) { const gq = new THREE.Mesh(new THREE.BoxGeometry(plano === "z" ? w : 0.02, 0.035, plano === "z" ? 0.02 : w), M.g); if (plano === "z") gq.position.set(c, ZOC + 0.0175, fijo + dir * 0.016); else gq.position.set(fijo + dir * 0.016, ZOC + 0.0175, c); scene.add(gq); }
  };
  pared(LX, RX, 0, TECHO_Y, "z", BZ, 1);
  pared(BZ, FZ, 0, TECHO_Y, "x", RX, -1);
  pared(BZ, FZ, 0, TECHO_Y, "x", LX, 1);
  // adelante: el hueco de la persiana
  pared(LX, PERS.x0, 0, TECHO_Y, "z", FZ, -1);
  pared(PERS.x1, RX, 0, TECHO_Y, "z", FZ, -1);
  pared(PERS.x0, PERS.x1, PERS.alto, TECHO_Y, "z", FZ, -1, false);
}
// ---------- la persiana: lamas crema con canal navy cada 11 cm, perfil de abajo navy3 con manija, guías y cajón ----------
const calle = new THREE.MeshBasicMaterial({ color: C.navy });   // lo que se ve por debajo (de noche navy; a la mañana crema cálido)
const vereda = new THREE.MeshBasicMaterial({ color: C.navy });   // (ronda 1) la vereda de afuera: a la mañana, la franja crema
const luzPiso = new THREE.MeshBasicMaterial({ color: C.calido, transparent: true, opacity: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
{
  const H = PERS.alto - PERS.y, W = PERS.x1 - PERS.x0;
  const lamas = lienzo(256, 1024, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    const n = Math.round(H / 0.11), paso = h / n;
    for (let i = 0; i < n; i++) { x.fillStyle = "#1f3254"; x.fillRect(0, i * paso, w, paso * 0.16); x.fillStyle = "#d9d7c9"; x.fillRect(0, i * paso + paso * 0.16, w, paso * 0.1); }
  });
  const pm = new THREE.MeshStandardMaterial({ map: lamas, roughness: 0.55, metalness: 0.15 });
  const p = mesh(new THREE.BoxGeometry(W, H, 0.03), [M.cr, M.cr, M.cr, M.cr, M.cr, pm], 0, PERS.y + H / 2, FZ - 0.02);
  p.material = [M.cr2, M.cr2, M.cr2, M.cr2, pm, pm]; scene.add(p);
  scene.add(mesh(rbox(W + 0.02, 0.07, 0.07, 0.015), M.navy3, 0, PERS.y + 0.02, FZ - 0.03));
  scene.add(mesh(rbox(0.16, 0.04, 0.05, 0.012), M.metal, 0, PERS.y + 0.02, FZ - 0.075));
  for (const s of [-1, 1]) scene.add(mesh(rbox(0.07, PERS.alto, 0.1, 0.015), M.navy3, s * (W / 2 + 0.02), PERS.alto / 2, FZ - 0.03));
  scene.add(mesh(rbox(W + 0.24, 0.3, 0.32, 0.03), M.navy3, 0, PERS.alto + 0.14, FZ - 0.12));
  // afuera: la vereda y la noche (planos lisos)
  const f = new THREE.Mesh(new THREE.PlaneGeometry(4, 3), calle); f.position.set(0, 1.4, FZ + 0.6); f.rotation.y = Math.PI; scene.add(f);
  const v = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.62), vereda); v.rotation.x = -Math.PI / 2; v.position.set(0, 0.0, FZ + 0.3); scene.add(v);
  const lp = new THREE.Mesh(new THREE.PlaneGeometry(W, 0.9), luzPiso); lp.rotation.x = -Math.PI / 2; lp.position.set(0, 0.004, FZ - 0.45); scene.add(lp);
}
// ---------- estanterías con mercadería de colores planos (de anotamelo) ----------
semilla = 7;
const colores = [C.cr, C.red, C.mostaza, 0xffffff, C.cr2, 0xe8cf9f, 0x8a5a3c, 0xd98a5a, C.mostaza, C.g];
const mc = {}; const mm = (c, r) => (mc[c + "|" + r] ??= mat(c, r));
const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapaF = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), picoB = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
function llenar(gr, x0, x1, y, hueco) {
  for (let x = x0 + 0.14; x < x1 - 0.1; x += 0.17 + az() * 0.07) {
    const k = az(), c = colores[Math.floor(az() * colores.length)];
    if (hueco && x > hueco[0] - 0.1 && x < hueco[1] + 0.1) continue;
    if (k < 0.3) { const h = 0.22 + az() * 0.16; gr.add(mesh(rbox(0.13, h, 0.16, 0.012), mm(c, 0.6), x, y + 0.025 + h / 2, 0)); }
    else if (k < 0.48) { gr.add(mesh(cuerpoFrasco, mm(c, 0.35), x, y + 0.125, 0)); gr.add(mesh(tapaF, M.cr, x, y + 0.245, 0)); }
    else if (k < 0.62) { gr.add(mesh(botella, mm(c, 0.3), x, y + 0.175, 0)); gr.add(mesh(picoB, mm(C.cr3, 0.4), x, y + 0.37, 0)); }
    else if (k < 0.74) { const pl = crearPolenta(); pl.position.set(x, y + 0.025, 0); gr.add(pl); }
    else if (k < 0.86) { const fi = crearFideos(); fi.position.set(x, y + 0.025, 0); gr.add(fi); }
    else { const ga = crearGalletitas(); ga.position.set(x + 0.06, y + 0.025, 0); ga.scale.setScalar(0.8); ga.rotation.y = 0.1; gr.add(ga); x += 0.12; }
  }
}
function estante(x0, x1, ys, huecos = {}) {
  const gr = new THREE.Group();
  const XC = (x0 + x1) / 2, XW = x1 - x0;
  for (const y of ys) {
    gr.add(mesh(rbox(XW, 0.05, 0.42, 0.015), M.maderaC, XC, y, -0.07));
    gr.add(mesh(rbox(XW, 0.06, 0.03, 0.01), M.navy3, XC, y - 0.005, 0.15));
    llenar(gr, x0, x1, y, huecos[y]);
  }
  for (const x of [x0, x1]) gr.add(mesh(rbox(0.06, ys[ys.length - 1] + 0.1, 0.44, 0.015), M.navy3, x, (ys[ys.length - 1] + 0.1) / 2, -0.07));
  return gr;
}
// la fila de yerba en el estante del medio (a la derecha de la cabeza de Rubén): la que se tilda en la parte 2
const YER = { y: 1.5, x0: 0.75, x1: 1.45 };
const YERBAS = [];
{
  const ef = estante(-1.75, 2.15, [0.95, YER.y, 2.05], { [YER.y]: [YER.x0, YER.x1] }); ef.position.z = BZ + 0.3; scene.add(ef);
  for (let x = YER.x0; x <= YER.x1 + 0.001; x += 0.175) { const y = crearYerba(); y.position.set(x, YER.y + 0.025, BZ + 0.3); y.scale.setScalar(1.15); scene.add(y); YERBAS.push(y); }
  const ed = estante(-1.2, 0.6, [0.95, 1.5, 2.05]); ed.rotation.y = -Math.PI / 2; ed.position.set(RX - 0.3, 0, -0.9); scene.add(ed);
}
const YERBA_P = YERBAS[2];   // la que hace pop y lleva el tilde
// el tilde verde de la yerba (parte 2)
const tildeT = lienzo(256, 256, (x, w, h) => {
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w / 2, h / 2, 118, 0, 7); x.fill();
  x.strokeStyle = "#0b1220"; x.lineWidth = 14; x.stroke();
  x.lineWidth = 30; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(70, 132); x.lineTo(112, 176); x.lineTo(190, 86); x.stroke();
});
const tilde = new THREE.Mesh(new THREE.CircleGeometry(0.11, 40), new THREE.MeshBasicMaterial({ map: tildeT, transparent: true }));
tilde.position.set(YERBA_P.position.x + 0.0, YER.y + 0.42, BZ + 0.5); scene.add(tilde);
// el mostrador (el de abren-hoy): navy3 con tapa de madera clara, filete verde y paneles
{
  const MX = MOSTRADOR;
  scene.add(mesh(rbox(MX.w, MX.y - 0.06, MX.d, 0.03), M.navy3, MX.x, (MX.y - 0.06) / 2, MX.z));
  scene.add(mesh(rbox(MX.w + 0.12, 0.06, MX.d + 0.1, 0.02), mat(0xc89a64, 0.55), MX.x, MX.y - 0.03, MX.z));
  scene.add(mesh(rbox(MX.w - 0.2, 0.06, 0.02, 0.01), M.g, MX.x, 0.3, MX.z + MX.d / 2 + 0.005));
  for (let i = 0; i < 4; i++) {
    const px = MX.x - MX.w / 2 + 0.3 + i * ((MX.w - 0.6) / 3);
    scene.add(mesh(rbox(0.46, 0.4, 0.02, 0.02), mat(0x2c4268, 0.6), px, 0.6, MX.z + MX.d / 2 + 0.01));
    scene.add(mesh(rbox(0.38, 0.32, 0.024, 0.02), M.navy3, px, 0.6, MX.z + MX.d / 2 + 0.014));
  }
  scene.add(mesh(rbox(MX.w, 0.035, 0.03, 0.01), M.cr2, MX.x, 0.84, MX.z + MX.d / 2 + 0.01));
}

// ================= UTILERÍA NUEVA =================
// ---------- la lámpara de banquero: base navy3, brazo de bronce, pantalla semicilíndrica verde de marca (emissive plano,
// sin halo), cadenita. Echa un charco de luz crema cálido de borde duro sobre la tapa. ----------
function crearLamparaBanquero() {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.24, 0.03, 0.14, 0.01), M.navy3, 0, 0.015, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.3, 10), M.bronce, 0, 0.18, -0.03));
  g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.012, 16), M.bronce, 0, 0.034, -0.03));
  const pantalla = new THREE.Group(); pantalla.position.set(0, 0.34, 0.0); g.add(pantalla);
  const verde = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.3, emissive: C.g, emissiveIntensity: 0.32, side: THREE.FrontSide });
  const adentro = new THREE.MeshBasicMaterial({ color: 0xfff3d6, side: THREE.BackSide });
  const sh = new THREE.CylinderGeometry(0.075, 0.075, 0.32, 28, 1, true, -Math.PI / 2, Math.PI);
  const s1 = mesh(sh, verde); s1.rotation.z = Math.PI / 2; pantalla.add(s1);
  const s2 = new THREE.Mesh(sh, adentro); s2.rotation.z = Math.PI / 2; pantalla.add(s2);
  for (const sx of [-1, 1]) { const tap = mesh(new THREE.CircleGeometry(0.075, 28, 0, Math.PI), verde); tap.position.x = sx * 0.16; tap.rotation.y = sx * Math.PI / 2; tap.rotation.z = 0; pantalla.add(tap); }
  pantalla.add(rot(mesh(new THREE.TorusGeometry(0.075, 0.006, 6, 28, Math.PI), M.bronce, 0, 0, 0), "y", Math.PI / 2));
  const cad = mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.08, 6), M.bronce, 0.09, -0.07, 0.03); pantalla.add(cad);
  pantalla.add(mesh(new THREE.SphereGeometry(0.009, 10, 8), M.bronce, 0.09, -0.115, 0.03));
  const foco = new THREE.PointLight(0xfff0cf, 0.9, 1.4, 2); foco.position.set(0, -0.04, 0); pantalla.add(foco);
  return sombra(g);
}
const lampara = crearLamparaBanquero(); lampara.position.set(1.32, MY, -1.52); lampara.rotation.y = -0.25; scene.add(lampara);
lampara.traverse((o) => { if (o.isMesh && o.material.side === THREE.BackSide) o.castShadow = false; });
const charco = new THREE.Mesh(new THREE.CircleGeometry(0.42, 48), new THREE.MeshBasicMaterial({ color: C.calido, transparent: true, opacity: 0.32, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
charco.rotation.x = -Math.PI / 2; charco.scale.set(1.35, 0.72, 1); charco.position.set(0.98, MY + 0.002, -1.33); scene.add(charco);

// ---------- papel: textura de la cinta impresa (números navy en mono) ----------
const NUMS = ["1.250 +", "380 +", "2.100 +", "95 +", "640 +", "1.870 +", "320 +", "4.500 +", "75 +", "1.120 +", "260 +", "880 +"];
const cintaT = lienzo(256, 2048, (x, w, h) => {
  x.fillStyle = "#f6f4ea"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.font = FM(44); x.textAlign = "right"; x.textBaseline = "middle";
  for (let i = 0; i < 26; i++) x.fillText(NUMS[i % NUMS.length], w - 22, 40 + i * 78);
  x.fillStyle = "#b4b2a3"; x.fillRect(0, 0, 6, h); x.fillRect(w - 6, 0, 6, h);
});
cintaT.wrapT = THREE.RepeatWrapping;
// la cinta que lee Rubén (P5): letra grande para que se lea ("1.250 +", "380 +"…)
const cintaLeeT = lienzo(256, 2048, (x, w, h) => {
  x.fillStyle = "#f6f4ea"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.font = FM(58); x.textAlign = "right"; x.textBaseline = "middle";
  for (let i = 0; i < 18; i++) x.fillText(NUMS[i % NUMS.length], w - 16, 70 + i * 112);
  x.fillStyle = "#b4b2a3"; x.fillRect(0, 0, 6, h); x.fillRect(w - 6, 0, 6, h);
});
cintaLeeT.wrapT = THREE.RepeatWrapping;
const cintaM = new THREE.MeshStandardMaterial({ map: cintaT, roughness: 0.85, side: THREE.DoubleSide });
const cintaLeeM = new THREE.MeshStandardMaterial({ map: cintaLeeT, roughness: 0.85, side: THREE.DoubleSide });
// una tira de papel a lo largo de una lista de puntos (ancho W, de canto según `lado`); se rehace cuando cambia
function crearTira(N = 48, material = cintaM) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array((N + 1) * 2 * 3), 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array((N + 1) * 2 * 2), 2));
  const idx = []; for (let i = 0; i < N; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  geo.setIndex(idx);
  const m = new THREE.Mesh(geo, material); m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false;
  m.userData.poner = (pts, lado, W = 0.07, rep = 1) => {
    const curva = new THREE.CatmullRomCurve3(pts);
    const pos = geo.attributes.position.array, uv = geo.attributes.uv.array;
    for (let i = 0; i <= N; i++) {
      const p = curva.getPoint(i / N);
      pos.set([p.x - lado.x * W / 2, p.y - lado.y * W / 2, p.z - lado.z * W / 2, p.x + lado.x * W / 2, p.y + lado.y * W / 2, p.z + lado.z * W / 2], i * 6);
      uv.set([0, (1 - i / N) * rep, 1, (1 - i / N) * rep], i * 4);   // (ronda 1) el texto derecho (ni espejado ni al revés)
    }
    geo.attributes.position.needsUpdate = true; geo.attributes.uv.needsUpdate = true; geo.computeVertexNormals(); geo.computeBoundingSphere();
  };
  return m;
}

// ---------- la calculadora con rollo (sumadora de almacén): cuña crema con canto navy3, teclado navy3 con "+", "TOTAL"
// grandes crema y "C" rojo apagado, LCD gris verdoso con dígitos navy, y atrás el brazo de metal con el rollo de papel.
// Local: el que teclea está en +z; el rollo atrás (-z). ----------
function crearCalculadoraRollo() {
  const g = new THREE.Group();
  const S = 1.3;   // exagerada un 30 % (que se lea)
  const cuerpo = new THREE.Group(); cuerpo.scale.setScalar(S); g.add(cuerpo);
  const forma = new THREE.Shape(); forma.moveTo(-0.15, 0); forma.lineTo(0.15, 0); forma.lineTo(0.15, 0.035); forma.lineTo(-0.15, 0.085); forma.closePath();
  const eg = new THREE.ExtrudeGeometry(forma, { depth: 0.28, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2 });
  eg.rotateY(-Math.PI / 2); eg.translate(0.14, 0, 0);
  cuerpo.add(mesh(eg, M.cr));
  cuerpo.add(mesh(rbox(0.296, 0.016, 0.316, 0.006), M.navy3, 0, 0.008, 0));
  // el plano del teclado (inclinado como la cuña)
  const ang = Math.atan2(0.05, 0.3);
  const top = new THREE.Group(); top.position.set(0, 0.06 + 0.0065, 0); top.rotation.x = ang; cuerpo.add(top);
  top.add(mesh(rbox(0.25, 0.006, 0.21, 0.01), M.navy3, 0, 0.0, 0.035));
  const TECLAS = {};
  const tecla = (lab, cx, cz, w = 0.046, d = 0.03, tipo = "n") => {
    const fondo = tipo === "c" ? "#c7655b" : tipo === "g" ? "#efeee5" : "#1f3254", tinta = tipo === "g" ? "#0b1220" : "#efeee5";
    const tx = lienzo(Math.round(w * 4000), Math.round(d * 4000), (x, W, H) => {
      x.fillStyle = fondo; x.fillRect(0, 0, W, H);
      if (tipo === "g") { x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.strokeRect(6, 6, W - 12, H - 12); }
      x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; let px = Math.min(H * 0.72, 92); x.font = F(800, px);
      while (x.measureText(lab).width > W * 0.86) { px -= 4; x.font = F(800, px); }
      x.fillText(lab, W / 2, H / 2 + 4);
    });
    const k = new THREE.Group(); k.position.set(cx, 0.003, cz); top.add(k);
    k.add(mesh(rbox(w, 0.014, d, 0.004, 2), tipo === "c" ? M.red : tipo === "g" ? M.cr : M.navy, 0, 0.007, 0));
    const lab3 = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, d * 0.86), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.6 }));
    lab3.rotation.x = -Math.PI / 2; lab3.position.y = 0.0142; k.add(lab3);
    TECLAS[lab] = k; return k;
  };
  const cx = [-0.09, -0.03, 0.03, 0.09], cz = [-0.035, 0.0, 0.035, 0.07, 0.105];
  ["−", "×", "÷", "C"].forEach((l, i) => tecla(l, cx[i], cz[0], 0.046, 0.03, i === 3 ? "c" : "n"));   // (ronda 1) la C del lado de la mano derecha de Rubén
  ["7", "8", "9"].forEach((l, i) => tecla(l, cx[i], cz[1]));
  ["4", "5", "6"].forEach((l, i) => tecla(l, cx[i], cz[2]));
  ["1", "2", "3"].forEach((l, i) => tecla(l, cx[i], cz[3]));
  tecla("0", (cx[0] + cx[1]) / 2, cz[4], 0.106, 0.03); tecla("00", cx[2], cz[4]);
  tecla("+", cx[3], (cz[1] + cz[2]) / 2, 0.046, 0.065, "g");
  tecla("TOTAL", cx[3], (cz[3] + cz[4]) / 2, 0.046, 0.065, "g");
  // la pantalla LCD (gris verdoso, dígitos navy)
  const lcdT = lienzo(640, 140, () => {});
  const lcd = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.044), new THREE.MeshBasicMaterial({ map: lcdT, toneMapped: false }));
  lcd.rotation.x = -Math.PI / 2; lcd.position.set(0, 0.0045, -0.082); top.add(lcd);
  top.add(mesh(rbox(0.216, 0.005, 0.058, 0.005), M.navy, 0, 0.001, -0.082));
  let pantallaAhora = "";
  const setPantalla = (s) => {
    if (s === pantallaAhora) return; pantallaAhora = s;
    const { x } = lcdT.userData; x.fillStyle = "#a9b59a"; x.fillRect(0, 0, 640, 140);
    x.fillStyle = "#0b1220"; x.font = FM(118); x.textAlign = "right"; x.textBaseline = "middle"; x.fillText(s, 616, 76);
    lcdT.needsUpdate = true;
  };
  setPantalla("0.");
  // el brazo de metal con el rollo de papel (atrás)
  for (const s of [-1, 1]) cuerpo.add(mesh(rbox(0.012, 0.11, 0.03, 0.004), M.metal, s * 0.1, 0.13, -0.165));
  cuerpo.add(rot(mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.22, 8), M.metal, 0, 0.165, -0.165), "z", Math.PI / 2));
  const rollo = mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.075, 28), mat(C.papel, 0.8), 0, 0.165, -0.165); rollo.rotation.z = Math.PI / 2; cuerpo.add(rollo);
  // la salida del papel: el filo dentado de metal arriba del teclado (atrás de la pantalla)
  cuerpo.add(mesh(rbox(0.11, 0.012, 0.012, 0.003), M.metal, 0, 0.098, -0.128));
  g.userData = {
    TECLAS, setPantalla, top, S,
    // dónde sale el papel (local de g)
    salida: V3(0, 0.104 * S, -0.128 * S),
    rolloTop: V3(0, (0.165 + 0.045) * S, -0.165 * S),
    tecla: (lab) => { g.updateMatrixWorld(true); return TECLAS[lab].localToWorld(V3(0, 0.02, 0)); },
    hundir: (lab, k) => { TECLAS[lab].position.y = 0.003 - 0.009 * k; },
  };
  return sombra(g);
}
const calcu = crearCalculadoraRollo(); scene.add(calcu);
const CALC = V3(0.72, MY, -1.3);   // (ronda 1) más a la derecha: la caja MES PASADO cae delante de Rubén   // dónde queda (el que teclea es Rubén: el rollo y la cinta hacia el cliente)
const CALC_IN = V3(1.35, MY, -1.2);
// la cinta que sale de la calculadora y cae por el frente del mostrador hasta la montaña
const tiraCalc = crearTira(60); scene.add(tiraCalc);
const tiraLee = crearTira(60, cintaLeeM); scene.add(tiraLee);
// la montaña de cinta: rulos de papel (anillos abiertos de 7 cm de ancho, de canto, girados con semilla) en un cono que
// crece por nivel de llenado; delante del mostrador (nunca atraviesa a Rubén ni al mostrador)
const MONTA = { x: 0.62, z: -0.62, R: 0.44, H: 1.02 };
const RULOS = [];
{
  semilla = 91;
  const N = 210;
  for (let i = 0; i < N; i++) {
    const u = i / N;                                   // orden de llegada (de abajo hacia arriba)
    const h = Math.pow(u, 0.8) * MONTA.H;               // altura del rulo
    const rMax = MONTA.R * (1 - h / (MONTA.H * 1.08));   // el cono
    const a = az() * Math.PI * 2, rr = Math.sqrt(az()) * rMax;
    let x = MONTA.x + Math.cos(a) * rr, z = MONTA.z + Math.sin(a) * rr * 0.85;
    z = Math.max(z, MZF + 0.09);                        // nunca dentro del mostrador
    const r = 0.06 + az() * 0.05;
    const geo = new THREE.CylinderGeometry(r, r, 0.07, 22, 1, true, az() * 6, Math.PI * (1.3 + az() * 0.6));
    const m = new THREE.Mesh(geo, cintaM); m.castShadow = true; m.receiveShadow = true;
    m.position.set(x, h + r * 0.6, z); m.rotation.set((az() - 0.5) * 2.6, az() * 6, (az() - 0.5) * 2.6);
    m.userData = { u, sy: m.position.y };
    scene.add(m); RULOS.push(m);
  }
}
function ponerMontana(nivel) {
  for (const m of RULOS) {
    const u = m.userData.u;
    if (u > nivel) { m.visible = false; continue; }
    m.visible = true;
    const k = bk(cl((nivel - u) / 0.04));
    m.scale.setScalar(0.5 + 0.5 * k);
  }
}
// ---------- la caja de zapatos: cartón kraft, tapa de solapa con canto navy3, etiqueta "N° 42" con un zapato de línea en el
// lateral corto, cinta de papel con la palabra en Caveat (arriba y adelante), papel de seda y tickets térmicos adentro.
// Variantes: gorda (MES PASADO: la tapa no cierra, tickets que asoman, piolín rojo apagado en cruz) ----------
function crearCajaZapatos({ etiqueta = "TICKETS", gorda = false, color = "#0b1220", dibujo = null, arribaCliente = false, ancho = 0, alto = 0 } = {}) {
  const g = new THREE.Group();
  const W = 0.36, D = 0.22, H = gorda ? 0.18 : 0.13, e = 0.006;
  const caja = new THREE.Group(); g.add(caja);
  const kraftIn = mat(0x9f8058, 0.95);
  const pared = (w, h, d, x, y, z) => caja.add(mesh(new THREE.BoxGeometry(w, h, d), M.kraft, x, y, z));
  pared(W, e, D, 0, e / 2, 0); pared(W, H, e, 0, H / 2, D / 2); pared(W, H, e, 0, H / 2, -D / 2); pared(e, H, D, W / 2, H / 2, 0); pared(e, H, D, -W / 2, H / 2, 0);
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.02, D - 0.02), kraftIn); fondo.rotation.x = -Math.PI / 2; fondo.position.y = 0.008; caja.add(fondo);
  // la etiqueta del lateral corto (+x): "N° 42" y un zapato de línea
  const latT = lienzo(320, 220, (x, w, h) => {
    x.fillStyle = "#f6f5ef"; x.fillRect(0, 0, w, h); x.strokeStyle = "#16243d"; x.lineWidth = 6; x.strokeRect(6, 6, w - 12, h - 12);
    x.fillStyle = "#16243d"; x.font = F(800, 64); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("N° 42", 24, 60);
    x.lineWidth = 9; x.lineJoin = "round"; x.beginPath(); x.moveTo(40, 180); x.lineTo(270, 180); x.lineTo(270, 160); x.quadraticCurveTo(230, 120, 170, 118); x.lineTo(120, 100); x.lineTo(80, 108); x.lineTo(40, 140); x.closePath(); x.stroke();
  });
  const lat = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.09), new THREE.MeshStandardMaterial({ map: latT, roughness: 0.8 })); lat.rotation.y = Math.PI / 2; lat.position.set(W / 2 + 0.004, H * 0.5, 0); caja.add(lat);
  // la cinta de papel con la palabra (Caveat), torcida
  const cintaPal = (ancho) => lienzo(1024, 260, (x, w, h) => {
    x.fillStyle = "#f3ead2"; x.fillRect(0, 0, w, h); x.fillStyle = "rgba(0,0,0,0.06)"; x.fillRect(0, h - 20, w, 20);
    x.fillStyle = color; x.textAlign = "center"; x.textBaseline = "middle"; let px = 210; x.font = FC(px);
    while (x.measureText(etiqueta).width > w * 0.9) { px -= 8; x.font = FC(px); }
    x.fillText(etiqueta, w / 2 - (dibujo ? 90 : 0), h / 2 + 10);
    if (dibujo === "pocillo") { x.strokeStyle = "#0b1220"; x.lineWidth = 12; const cx = w - 140; x.beginPath(); x.moveTo(cx - 60, 90); x.lineTo(cx - 50, 190); x.lineTo(cx + 40, 190); x.lineTo(cx + 50, 90); x.closePath(); x.stroke(); x.beginPath(); x.arc(cx + 66, 130, 26, -1.4, 1.4); x.stroke(); x.beginPath(); x.moveTo(cx - 90, 215); x.lineTo(cx + 80, 215); x.stroke(); }
  });
  const pt = cintaPal();
  const frente = new THREE.Mesh(new THREE.PlaneGeometry(ancho || (gorda ? 0.33 : 0.3), alto || (gorda ? 0.11 : 0.076)), new THREE.MeshStandardMaterial({ map: pt, roughness: 0.8 }));
  frente.position.set(0, H * (gorda ? 0.45 : 0.52), D / 2 + 0.004); frente.rotation.z = gorda || ancho ? 0 : 0.035; caja.add(frente);
  const atras = frente.clone(); atras.position.z = -D / 2 - 0.004; atras.rotation.set(0, Math.PI, -0.03); caja.add(atras);
  // la tapa (bisagra imaginaria en el borde de atrás: -z)
  const tapa = new THREE.Group(); tapa.position.set(0, H, -D / 2 - 0.01); g.add(tapa);
  const TW = W + 0.024, TD = D + 0.024;
  tapa.add(mesh(rbox(TW, 0.008, TD, 0.003), M.kraft, 0, 0.004, TD / 2));
  for (const [w, d, x, z] of [[TW, 0.008, 0, 0], [TW, 0.008, 0, TD], [0.008, TD, -TW / 2, TD / 2], [0.008, TD, TW / 2, TD / 2]]) tapa.add(mesh(new THREE.BoxGeometry(w, 0.04, d), M.navy3, x, -0.012, z));
  const arriba = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.082), new THREE.MeshStandardMaterial({ map: pt, roughness: 0.8 }));
  arriba.rotation.set(-Math.PI / 2, 0, Math.PI + 0.05); arriba.position.set(0, 0.0085, TD / 2); tapa.add(arriba);   // se lee desde el lado de Rubén y desde arriba
  const arriba2 = arriba.clone(); arriba2.rotation.set(-Math.PI / 2, 0, -0.04); arriba2.position.set(0, 0.0086, TD / 2 + 0.002); arriba2.visible = false; tapa.add(arriba2);
  // los tickets adentro (tiras crema con renglones grises, un poco enrulados)
  const tick = [];
  semilla = gorda ? 17 : etiqueta === "CAFETERÍA" ? 29 : 5;
  for (let i = 0; i < 12; i++) {
    const m = new THREE.Mesh(TICKET_G, TICKET_M); m.castShadow = true;
    m.position.set(-W / 2 + 0.04 + (i % 6) * 0.055, H * (gorda ? 0.75 : 0.55) + az() * 0.02, -D / 2 + 0.06 + Math.floor(i / 6) * 0.08);
    m.rotation.set(-0.25 + az() * 0.5, az() * 0.5, -0.2 + az() * 0.4); caja.add(m); tick.push(m);
  }
  const extras = [];
  if (gorda) {
    // los tickets que asoman por los costados y el piolín rojo apagado en cruz sobre la tapa entreabierta
    for (let i = 0; i < 7; i++) { const m = new THREE.Mesh(TICKET_G, TICKET_M); m.position.set((i - 3) * 0.05, H + 0.03, (i % 2 ? 1 : -1) * (D / 2 - 0.02)); m.rotation.set(Math.PI / 2 - 0.3 * (i % 2 ? -1 : 1), 0, (i - 3) * 0.12); caja.add(m); }
    for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(TICKET_G, TICKET_M); m.position.set((i % 2 ? 1 : -1) * (W / 2 + 0.035), H + 0.0, -0.05 + i * 0.03); m.rotation.set(0, 0, (i % 2 ? -1 : 1) * 1.2); caja.add(m); }
    const pio = mat(C.red, 0.7);
    const p1 = mesh(new THREE.BoxGeometry(W + 0.05, 0.008, 0.012), pio, 0, H + 0.04, 0); caja.add(p1);
    const p2 = mesh(new THREE.BoxGeometry(0.012, 0.008, D + 0.05), pio, 0, H + 0.042, 0); caja.add(p2);
    for (const s of [-1, 1]) caja.add(mesh(new THREE.BoxGeometry(0.008, H + 0.04, 0.012), pio, s * (W / 2 + 0.024), (H + 0.04) / 2, 0));   // (ronda 1) nada cruza el rótulo del frente
    caja.add(rot(mesh(new THREE.TorusGeometry(0.018, 0.005, 6, 14), pio, 0, H + 0.05, 0), "x", Math.PI / 2));
  }
  g.userData = {
    W, D, H, tapa, tick,
    abrir: (k) => { tapa.rotation.x = gorda ? -0.35 : -2.35 * k; tapa.position.y = gorda ? H + 0.03 : H; arriba.visible = !arribaCliente && k < 0.3; arriba2.visible = false; },   // (ronda 5) CAFETERÍA sin rótulo en la tapa (se leía al revés)   // (ronda 4) CAFETERÍA: la de arriba se lee desde el lado del cliente   // (ronda 1) abierta: sin etiqueta (no se ve al revés)
    llenos: (n) => tick.forEach((m, i) => (m.visible = i < n)),
  };
  g.userData.abrir(0);
  return sombra(g);
}
// el ticket térmico: tira crema con renglones grises, enrulada
const TICKET_G = (() => { const g = new THREE.PlaneGeometry(0.05, 0.12, 1, 8); const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const y = p.getY(i); p.setZ(i, Math.pow((y + 0.06) / 0.12, 2) * 0.025); } g.computeVertexNormals(); return g; })();
const TICKET_M = new THREE.MeshStandardMaterial({ map: lienzo(128, 300, (x, w, h) => { x.fillStyle = "#f8f6ee"; x.fillRect(0, 0, w, h); x.fillStyle = "#9da0a8"; for (let i = 0; i < 9; i++) x.fillRect(14, 30 + i * 28, (i % 3 === 2 ? 60 : 96), 7); x.fillRect(14, 280, 100, 9); }), roughness: 0.9, side: THREE.DoubleSide });
const cajaT = crearCajaZapatos({ etiqueta: "TICKETS" }); scene.add(cajaT);
const CAJA_T = V3(-0.05, MY, -1.12);
const cajaMP = crearCajaZapatos({ etiqueta: "MES PASADO", gorda: true, color: "#0b1220" }); scene.add(cajaMP);   // (ronda 1) navy grueso sobre crema: que se lea
const CAJA_MP = V3(0.27, MY, -1.12);
const cajaCaf = crearCajaZapatos({ etiqueta: "CAFETERÍA", arribaCliente: true, ancho: 0.345, alto: 0.1 }); scene.add(cajaCaf);   // (ronda 5) sin el dibujito (pisaba la A) y rótulo más grande
// los tickets que saltan como resorte (P2 de la caja TICKETS; Q4b de la caja CAFETERÍA) y quedan en el mostrador
function crearSalto(semillaS, n = 11, sz = 1) {
  semilla = semillaS;
  return Array.from({ length: n }, () => {
    const m = new THREE.Mesh(TICKET_G, TICKET_M); m.castShadow = true; scene.add(m);
    return { m, dx: (az() - 0.5) * 0.7, dz: sz * (0.05 + az() * 0.22), alto: 0.3 + az() * 0.22, giro: [az() * 8 - 4, az() * 6, az() * 8 - 4], fin: az() * 3, ret: az() * 0.12 };
  });
}
const SALTO_T = crearSalto(41), SALTO_C = crearSalto(73, 11, -1);   // (ronda 2) los de CAFETERÍA saltan hacia el lado de Rubén
function ponerSalto(lista, t, t0, origen, tFin = 99, vaciar = null) {
  lista.forEach((s, i) => {
    const u = sg(t, t0 + s.ret, t0 + s.ret + 0.55);
    s.m.visible = t >= t0 + s.ret && t < tFin && (!vaciar || i >= Math.floor(vaciar * lista.length));
    if (!s.m.visible) return;
    const p = origen.clone().add(V3(s.dx * u, 0, s.dz * u));
    p.y = origen.y + 0.08 + Math.sin(Math.PI * Math.min(1, u * 1.0)) * s.alto - 0.07 * u;
    if (u >= 1) p.y = MY + 0.004 + i * 0.0015;
    s.m.position.copy(p);
    if (u >= 1) s.m.rotation.set(-Math.PI / 2, 0, s.fin); else s.m.rotation.set(s.giro[0] * u, s.giro[1] * u, s.giro[2] * u);
  });
}
// ---------- el pinche de boletas: base de disco navy3, varilla de metal con punta, boletas pinchadas giradas ----------
function crearPinche(n = 13) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.03, 28), M.navy3, 0, 0.015, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.0035, 0.0035, 0.19, 8), M.metal, 0, 0.125, 0));
  g.add(mesh(new THREE.ConeGeometry(0.0035, 0.018, 8), M.metal, 0, 0.228, 0));
  const bolT = lienzo(200, 260, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; for (let i = 0; i < 6; i++) x.fillRect(18, 34 + i * 34, i % 2 ? 110 : 150, 9); x.fillStyle = "#c7655b"; x.fillRect(18, 232, 90, 10); });
  const bm = new THREE.MeshStandardMaterial({ map: bolT, roughness: 0.9, side: THREE.DoubleSide });
  const bol = [];
  semilla = 55;
  for (let i = 0; i < n; i++) { const b = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.13), bm); b.rotation.set(-Math.PI / 2 + (az() - 0.5) * 0.25, 0, az() * 6); b.position.set((az() - 0.5) * 0.02, 0.034 + i * 0.011, (az() - 0.5) * 0.02); b.castShadow = true; g.add(b); bol.push(b); }
  g.userData = { cuantas: (k) => bol.forEach((b, i) => (b.visible = i < k)) };
  return sombra(g);
}
const pinche = crearPinche(); pinche.position.set(1.1, MY, -1.08); scene.add(pinche);
// ---------- el pocillo de la cafetería de Marta: cerámica crema con franja verde y asa, platito crema con borde navy3,
// cortado (café con anillo de espuma) ----------
const POC = { k: 1.6, alto: 0.066 * 1.6 };   // (ronda 1) más grandes: que se cuenten
const pocG = {
  taza: new THREE.LatheGeometry([[0, 0], [0.021, 0], [0.025, 0.004], [0.03, 0.03], [0.033, 0.057], [0.0335, 0.06]].map(([r, y]) => new THREE.Vector2(r, y)), 28),
  franja: new THREE.CylinderGeometry(0.0322, 0.0305, 0.011, 28, 1, true),
  asa: new THREE.TorusGeometry(0.012, 0.0036, 8, 16, Math.PI * 1.2),
  cafe: new THREE.CircleGeometry(0.031, 24), espuma: new THREE.RingGeometry(0.012, 0.031, 24),
  plato: new THREE.CylinderGeometry(0.056, 0.048, 0.006, 32), borde: new THREE.TorusGeometry(0.055, 0.0028, 6, 32),
};
const pocM = { cer: mat(C.cr, 0.35, { side: THREE.DoubleSide }), g: mat(C.g, 0.45, { side: THREE.DoubleSide }), cafe: mat(0x3a2a20, 0.4), esp: mat(0xd8c7a4, 0.7) };
function crearPocillo() {
  const g = new THREE.Group(); const s = new THREE.Group(); s.scale.setScalar(POC.k); g.add(s);
  s.add(mesh(pocG.plato, pocM.cer, 0, 0.003, 0));
  const b = mesh(pocG.borde, M.navy3, 0, 0.006, 0); b.rotation.x = Math.PI / 2; s.add(b);
  s.add(mesh(pocG.taza, pocM.cer, 0, 0.006, 0));
  s.add(mesh(pocG.franja, pocM.g, 0, 0.006 + 0.04, 0));
  const a = mesh(pocG.asa, pocM.cer, 0.036, 0.006 + 0.033, 0); a.rotation.z = -Math.PI * 0.6; s.add(a);
  const c = mesh(pocG.cafe, pocM.cafe, 0, 0.006 + 0.054, 0); c.rotation.x = -Math.PI / 2; s.add(c);
  const e = mesh(pocG.espuma, pocM.esp, 0, 0.006 + 0.0545, 0); e.rotation.x = -Math.PI / 2; s.add(e);
  return sombra(g);
}
// la torre: cada pocillo con su platito apoyado arriba del anterior; se inclina a la derecha desde el cuarto y se
// balancea cuando suma uno (nunca se cae)
function crearTorre(n = 7) {
  const g = new THREE.Group(); const piv = new THREE.Group(); g.add(piv);
  const pocs = Array.from({ length: n }, (_, i) => { const p = crearPocillo(); p.position.set(Math.max(0, i - 2) * 0.006, i * POC.alto, 0); p.rotation.y = i * 0.5; piv.add(p); return p; });
  g.userData = { pocs, piv, poner: (k, bal = 0) => { pocs.forEach((p, i) => (p.visible = i < k)); piv.rotation.z = -Math.max(0, k - 3) * 0.008 + bal; } };
  return g;
}
const torre = crearTorre(7); scene.add(torre);
const TORRE = V3(-0.36, MY, -1.12);
const pocMano = crearPocillo(); scene.add(pocMano);        // el pocillo que trae Marta en la mano (P1, viajes)
const pocRuben = crearPocillo(); scene.add(pocRuben);      // el que Rubén le saca a la torre (Q4b)
const vapor = crearVapor(6); vapor.scale.setScalar(0.8); scene.add(vapor);   // (ronda 2) más fino
// la bandeja redonda navy3 de la parte 2
const bandeja = new THREE.Group(); scene.add(bandeja);
bandeja.add(mesh(new THREE.CylinderGeometry(0.17, 0.16, 0.014, 36), M.navy3, 0, 0.007, 0));
bandeja.add(rot(mesh(new THREE.TorusGeometry(0.168, 0.006, 6, 36), M.g, 0, 0.014, 0), "x", Math.PI / 2));
const torre2 = crearTorre(7); torre2.position.y = 0.014; torre2.scale.setScalar(0.82); bandeja.add(torre2);
// ---------- el cajón de refrescos (plástico navy3 con agujeros, sin marca) ----------
function crearCajon() {
  const g = new THREE.Group();
  const W = 0.44, D = 0.34, H = 0.42;
  const ag = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#24395f"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { x.beginPath(); x.roundRect(40 + i * 112, 120 + j * 120, 82, 70, 20); x.fill(); } x.fillStyle = "#2c4268"; x.fillRect(0, 0, w, 60); x.fillRect(0, h - 40, w, 40); });
  const pm = new THREE.MeshStandardMaterial({ map: ag, roughness: 0.5 });
  const pared = (w, h, d, x, y, z, ry = 0) => { const m = mesh(new THREE.BoxGeometry(w, h, d), [M.navy3, M.navy3, M.navy3, M.navy3, pm, pm], x, y, z); m.rotation.y = ry; g.add(m); };
  pared(W, H, 0.014, 0, H / 2, D / 2); pared(W, H, 0.014, 0, H / 2, -D / 2); pared(D, H, 0.014, W / 2, H / 2, 0, Math.PI / 2); pared(D, H, 0.014, -W / 2, H / 2, 0, Math.PI / 2);
  g.add(mesh(new THREE.BoxGeometry(W, 0.014, D), M.navy3, 0, 0.03, 0));
  for (let i = 1; i < 4; i++) g.add(mesh(new THREE.BoxGeometry(0.01, H * 0.9, D), M.navy3, -W / 2 + (i * W) / 4, H * 0.45, 0));
  g.userData.H = H;
  return sombra(g);
}
const cajon = crearCajon(); scene.add(cajon);
const CAJON = V3(-0.6, 0, -0.12);
const CAJON2 = V3(-0.62, 0, -0.42);   // parte 2: Marta lo deja a su izquierda
const banco = crearBanquito(0.62); banco.position.set(RI.x - 0.05, 0, RI.z - 0.25); scene.add(banco);
// ---------- la bolsa del pan con tres flautas y la mano del panadero (solo antebrazo con manga navy2) ----------
const bolsaPan = new THREE.Group(); scene.add(bolsaPan);
{ const b = crearBolsaPapel(); b.scale.set(1.05, 1.5, 0.95); bolsaPan.add(b);
  // (ronda 2) papel kraft claro, el fuelle hundido a los costados (pliegue en V) y la boca doblada hacia afuera
  const claro = mat(0xdcc49a, 0.95), pliegue = mat(0xb39467, 0.95);
  b.traverse((o) => { if (o.isMesh && o.material.color && o.material.color.getHex() === 0xc49a63) o.material = claro; });
  for (const sx of [-1, 1]) {
    const c = mesh(new THREE.BoxGeometry(0.004, 0.36, 0.012), pliegue, sx * 0.128, 0.2, 0); bolsaPan.add(c);
    for (const sz of [-1, 1]) { const v = mesh(new THREE.BoxGeometry(0.004, 0.09, 0.008), pliegue, sx * 0.128, 0.38, sz * 0.03); v.rotation.x = sz * 0.6; bolsaPan.add(v); }
  }
  bolsaPan.add(mesh(new THREE.BoxGeometry(0.27, 0.025, 0.16), claro, 0, 0.415, 0));
  // la boca abierta y arrugada (pliegues de papel que se abren hacia afuera)
  const kraft = mat(0xc49a63, 0.95, { side: THREE.DoubleSide });
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; const f = mesh(new THREE.PlaneGeometry(0.11, 0.07), mat(0xdcc49a, 0.95, { side: THREE.DoubleSide }), Math.cos(a) * 0.1, 0.43, Math.sin(a) * 0.055); f.rotation.set(Math.sin(a) * 0.6, -a + Math.PI / 2, Math.cos(a) * 0.5); bolsaPan.add(f); } }
[[-0.06, 0.32, 0.05, 0.0], [0.0, 0.05, -0.12, -0.02], [0.06, -0.3, 0.08, 0.01]].forEach(([x, rz, rx, z]) => { const p = crearPanFlauta(0.5); p.rotation.set(rx, 0, Math.PI / 2 + rz); p.position.set(x, 0.42, z); bolsaPan.add(p); });
const manoPan = new THREE.Group(); scene.add(manoPan);
{
  const manga = mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.55, 16), M.navy2, 0, 0, 0.32); manga.rotation.x = Math.PI / 2; manoPan.add(manga);
  manoPan.add(rot(mesh(new THREE.CylinderGeometry(0.056, 0.056, 0.05, 16), M.cr2, 0, 0, 0.05), "x", Math.PI / 2));
  const mano = mesh(new THREE.SphereGeometry(0.05, 16, 12), mat(0xdba57f, 0.55), 0, -0.005, -0.01); mano.scale.set(1.15, 0.7, 1.25); manoPan.add(mano);
  for (let i = 0; i < 4; i++) { const d = mesh(new THREE.CapsuleGeometry(0.011, 0.04, 4, 8), mat(0xdba57f, 0.55), -0.03 + i * 0.02, -0.01, -0.06); d.rotation.x = Math.PI / 2; manoPan.add(d); }
}
// ---------- la parte 2: el celular de Rubén en un atrilito, el mate y el termo ----------
const CW = 600, CH = 1200;
const pantR = lienzo(CW, CH, () => {});
const celu = crearCelular(pantR, C.navy3, 0.085, 0.17); celu.scale.setScalar(1.15);
const atril = new THREE.Group(); scene.add(atril);
atril.add(mesh(rbox(0.08, 0.008, 0.07, 0.003), M.navy3, 0, 0.004, 0));
atril.add(mesh(rbox(0.08, 0.016, 0.01, 0.003), M.navy3, 0, 0.012, 0.03));
const celPiv = new THREE.Group(); celPiv.position.set(0, 0.02, 0.0); celPiv.rotation.x = -0.28; atril.add(celPiv);
celu.position.set(0, 0.17 * 1.15 / 2 + 0.004, -0.01); celPiv.add(celu);
const ATRIL = V3(1.12, MY, -1.32);
let claveCel = "";
function dibujarCelu(t) {
  const filas = T.filas.filter((a) => t >= a).length;
  const verde = t >= T.yerba ? 1 : 0;
  const vib = t >= T.q2 - 0.02 ? 1 : 0;   // (ronda 5) sin pantalla de bloqueo: la tarjeta ya está al cortar
  const pulso = en(t, T.filas[1] + 0.1, T.filas[1] + 0.5) ? 1 : 0;
  const clave = `${filas}|${verde}|${vib}|${pulso}`; if (clave === claveCel) return; claveCel = clave;
  const x = pantR.userData.x, W = CW, H = CH;
  // (ronda 1) un solo "21:00" (en la cabecera), letra grande, sin ícono; "Mes" late en verde (el número de la calculadora)
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H);
  if (!vib) { x.fillStyle = "#efeee5"; x.font = F(800, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("21:00", W / 2, 200); pantR.needsUpdate = true; return; }
  x.textBaseline = "middle";
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(18, 40, W - 36, H - 80, 40); x.fill();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 54); x.fillText("Resumen del mes", 48, 120);
  x.fillStyle = "#2c4268"; x.font = F(800, 62); x.fillText("21:00", 48, 192);
  x.fillStyle = "#b4b2a3"; x.fillRect(48, 238, W - 96, 6);
  const fila = (i, dibujo) => { if (filas > i) dibujo(); };
  fila(0, () => { x.fillStyle = "#16243d"; x.textAlign = "left"; x.font = F(700, 60); x.fillText("Hoy", 48, 320); x.textAlign = "right"; x.font = F(900, 70); x.fillStyle = "#0b1220"; x.fillText("$ 18.450", W - 48, 320); });
  fila(1, () => {
    if (pulso) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(30, 380, W - 60, 110, 20); x.fill(); }
    x.fillStyle = "#16243d"; x.textAlign = "left"; x.font = F(700, 60); x.fillText("Mes", 48, 436); x.textAlign = "right"; x.font = F(900, 70); x.fillStyle = "#0b1220"; x.fillText("$ 412.300", W - 48, 436);
  });
  fila(2, () => {
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(30, 520, W - 60, 250, 26); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 120); x.fillText("+8 %", 140, 610);
    x.lineWidth = 16; x.lineCap = "round"; x.beginPath(); x.moveTo(84, 650); x.lineTo(84, 570); x.moveTo(58, 596); x.lineTo(84, 566); x.lineTo(110, 596); x.stroke();
    x.font = F(800, 60); x.fillText("vs. mes pasado", 52, 712);
  });
  fila(3, () => {
    if (verde) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(30, 800, W - 60, 300, 26); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.stroke(); }
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(700, 56); x.fillText("Lo que más salió:", 52, 870);
    x.font = F(900, 110); x.fillText(verde ? "Yerba ✓" : "Yerba", 52, 1000);
  });
  pantR.needsUpdate = true;
}
dibujarCelu(0);
const mateR = crearMate(); mateR.scale.setScalar(1.25); scene.add(mateR);
const termo = crearTermo(); termo.scale.setScalar(1.3); scene.add(termo);

// ================= LOS PERSONAJES =================
const ruben = crearPersonaje({ ...ELENCO.almacenero, dedos: true, mechones: true, parpadeoCada: 999, parpadeosExtra: [1.0, 5.2, 9.0, 14.2, 22.0, 31.0] });   // (ronda 5) sin el de 26,0 (hablaba)
const marta = crearPersonaje({ ...ELENCO.duena, dedos: true, parpadeoCada: 999, parpadeosExtra: [2.9, 6.3, 11.7, 26.0, 34.6] });   // (ronda 1) nunca mientras habla
const TODOS = [ruben, marta];
// (ronda 1) la mano abierta de Rubén para el "más o menos": palma plana con cuatro dedos y el pulgar (en la mano derecha)
const PALMA = new THREE.Group();
{
  const piel = mat(0xdba57f, 0.55);
  PALMA.add(mesh(rbox(0.1, 0.11, 0.035, 0.015), piel, 0, -0.07, 0));
  for (let i = 0; i < 4; i++) { const d = mesh(new THREE.CapsuleGeometry(0.0115, 0.055, 4, 8), piel, -0.036 + i * 0.024, -0.15 - (i === 1 || i === 2 ? 0.006 : 0), 0); PALMA.add(d); }
  const pu = mesh(new THREE.CapsuleGeometry(0.012, 0.04, 4, 8), piel, 0.06, -0.06, 0.0); pu.rotation.z = 0.7; PALMA.add(pu);
  PALMA.visible = false; ruben.brazos[1].mano.add(PALMA);
}
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// la herradura de pelo de Rubén vista desde atrás se leía como una barra flotante: de espaldas no va (me-haces-precio)
const HERR = ruben.cabeza.children.find((o) => o.isGroup && Math.abs(o.scale.y - 1.3) < 1e-6);
const _hc = new THREE.Vector3(), _hf2 = new THREE.Vector3(), _he = new THREE.Vector3();
function herraduraSegunCamara() {
  if (!HERR) return;
  ruben.cabeza.updateMatrixWorld(true); ruben.cabeza.getWorldPosition(_hc);
  _hf2.set(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld); _he.copy(camera.position).sub(_hc); _hf2.y = 0; _he.y = 0; _hf2.normalize(); _he.normalize();
  HERR.visible = Math.acos(cl(_hf2.dot(_he), -1, 1)) < 1.9;
}

// ================= GLOBOS (pegados a la cámara, en píxeles de pantalla; de anotamelo) =================
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cola = true, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const anchoT = Math.max(...lineas.map((l) => med.measureText(l).width)) / 2;
  const W = Math.round(anchoT + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9);
  const tex = lienzo(W * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.fillStyle = tinta; x.font = F(800, px * 2); x.textAlign = "center"; x.textBaseline = "middle";
    lineas.forEach((l, i) => x.fillText(l, w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.2 + px * 0.08));
  });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: borde });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(fondo) });
  const sombraM = new THREE.MeshBasicMaterial({ color: 0x050a14 });
  const w = W / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sb = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sb.position.set(12 / PXK, -14 / PXK, -0.016); g.add(sb);
  const bord = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); bord.position.z = -0.012; g.add(bord);
  const caja2 = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja2);
  const colaG = new THREE.Group(); g.add(colaG); colaG.visible = cola;
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(80 / PXK, 104 / PXK), sombraM); cs.position.set(12 / PXK, -8 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(80 / PXK, 104 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(54 / PXK, 78 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sb.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja2.userData.orden = 4;
  g.userData = { W, H, cola: colaG };
  return pegarACamara(g, camera, 40);
}
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0) {
  g.visible = s > 0.4;
  if (!g.visible) return;
  const k = halfK();
  const { W, H, cola } = g.userData;
  cx = W + 200 > 1080 ? 540 : cl(cx, W / 2 + 100, 980 - W / 2);
  cy = cl(cy, H / 2 + 120, 1780 - H / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s);
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (W / 2), -0.62, 0.62);
  if (oy >= cy) {
    cola.position.set((lado * W) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
    cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * W) / 2), oy - (cy + H / 2)), -0.9, 0.9);
  } else {
    cola.position.set((lado * W) / 2 / PXK, H / 2 / PXK - 4 / PXK, 0);
    cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * W) / 2), (cy - H / 2) - oy), -0.9, 0.9);
  }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(new THREE.Vector3(0, 0.181, 0.3))); };
const GL = {
  r1: crearGlobo(["Pará que te digo."], 76),
  m2: crearGlobo(["¿Y comparado con", "el mes pasado?"], 70),
  m3: crearGlobo(["Pongo otro café."], 76),
  m1b: crearGlobo(["¿Y, cómo viene el mes?"], 70),
  r3a: crearGlobo(["Ocho por ciento", "arriba del mes pasado."], 70),
  r3b: crearGlobo(["Lo que más salió", "fue la yerba."], 70),
  r4: crearGlobo(["¿Y a vos?"], 76),
  m4: crearGlobo(["Pará que te digo."], 76),
  buen: crearGlobo(["¡Buen día, Rubén!"], 70),
};

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un
// plano, Catmull-Rom continua. Los de la parte 2 repiten el encuadre de su par de la parte 1 (P1→Q1, P2→Q2b, P6→Q4b).
const HOMBRO = (k = 0) => [-0.25 + k * 0.03, 1.75 - k * 0.03, -2.38 + k * 0.12, -0.14, 0.95, 0.8, 54 - k * 2];   // P1/Q1: desde atrás del mostrador, a la derecha de Rubén (fuera de cuadro), hacia la persiana
const FRENTE2 = (k = 0) => [1.0, 1.42, 0.35 - k * 0.14, 0.78, 1.2, -1.75, 42 - k * 2];   // (ronda 4) centrado en Rubén (no se corta su cara); la torre queda afuera   // (ronda 2) parte 2: Rubén de frente, corrido a la derecha (la torre le queda al costado)
const FRENTE = (k = 0) => [0.4, 1.42, 0.35 - k * 0.14, 0.4, 1.2, -1.75, 50 - k * 2];   // P2/Q2b/Q3b: Rubén de frente (lado del cliente)
const ALTA = (k = 0) => [1.6 - k * 0.05, 2.55 - k * 0.04, 1.2 - k * 0.05, -0.08 - k * 0.08, 0.85, -1.0, 65 - k * 0.5];   // (ronda 4) al final se corre hacia Marta sentada (no se corta su cabeza)   // P3: general alto desde la derecha (Rubén entero, la torre y Marta a la izquierda)
const TORRE_C = (k = 0, lejos = 0) => [0.45, 1.42 + lejos * 0.08, -0.85 + k * 0.03, -0.36, 1.24 + lejos * 0.12, -1.12, 50 + lejos * 12];   // de costado desde el lado del cliente: la torre sola, de Marta entra solo la mano
const BAJO = (k = 0) => [0.75 - k * 0.04, 0.42, -0.15 + k * 0.05, -0.25, 0.45, FZ, 58];   // P4: al ras del piso, la persiana y la franja de luz
const RUBEN_M = (k = 0) => [0.45, 1.12, 0.6 - k * 0.12, 0.33, 1.34, -1.8, 50 - k * 2];   // P5/P5c: Rubén por arriba de la montaña de cinta (la montaña en primer término)
const COSTADO = (k = 0, mx = -0.3) => [1.35 - k * 0.04, 1.38, 1.0 - k * 0.05, mx, 1.1, -1.15, 74 - k];   // (ronda 4) más abierto: la cara de Rubén no se corta a la derecha   // (ronda 2) P6c: Marta con la torre a la izquierda, Rubén a la derecha
const MARTA_C = (k = 0) => [1.25, 1.9, -2.0 + k * 0.08, -0.6, 0.98, -0.12, 42 - k];   // P5b/P6: contraplano a Marta sentada
const MARTA_Q = (k = 0) => [1.7, 1.72, -1.75 + k * 0.04, 0.3, 1.2, -0.98, 54];   // (ronda 4) un poco más abierto y hacia la torre: la torre entera al costado, nunca delante de la cara   // (ronda 2) contraplano a Marta desde la derecha (afuera del estante): la torre a un costado, nunca delante de la cara
const CAJA_Q = (k = 0) => [-0.75 + k * 0.02, 1.37, 0.25 - k * 0.06, -0.285, 1.08, -1.18, 28 - k];   // (ronda 4) tele desde lejos: solo la caja (Marta y Rubén quedan fuera)   // (ronda 4) Q4i: la caja de frente, bajo
const POC_Q = (k = 0) => [1.4, 1.72, 0.3 - k * 0.08, 0.74, 1.25, -1.6, 58 - k];   // (ronda 5) la torre a la izquierda y la cara de Rubén entera   // (ronda 5) más de costado: la torre se separa de la cara   // (ronda 5) más de costado: la torre se separa de la cara   // (ronda 5) más abierto: la cara de Rubén entera   // (ronda 4) Q4c: Rubén y la torre de frente
const FINAL_Q = (k = 0) => [0.66, 2.0, 1.3 - k * 0.06, 0.4, 1.22, -1.15, 57 - k];   // (ronda 5) del lado del cliente, alta: Marta adelante con su caja, Rubén atrás de frente, la torre debajo de su cara   // (ronda 5) desde el lado del cliente, alta: Marta adelante con su caja, Rubén atrás de frente   // (ronda 4) Q5
const HOMBRO_P1 = (() => { const h = HOMBRO(0.45); h[3] = -0.52; h[6] = 54; return h; })();
const ALTA2 = (k = 0) => { const a = ALTA(1 + k * 0.5); a[0] += 0.2; a[2] += 0.08; a[3] = -0.27; a[6] = 72 - k; return a; };
const Q1_FIN = (k = 0) => [-0.55, 1.88 - k * 0.02, -2.45 + k * 0.03, 0.22, 1.18, -0.95, 62 - k];
const PLANOS = [
  ["P1", 0, [[0, ...HOMBRO(0)], [T.p2, ...HOMBRO_P1]]],   // (ronda 4) el push-in termina corrido hacia Marta (no se corta su cara)   // (ronda 1) push-in menos cerrado
  ["P2", T.p2, [[T.p2, ...FRENTE(0)], [T.abre, ...FRENTE(0.5)], [T.p3, ...FRENTE(0.7)]]],
  // la noche: grúa que sube y se abre hasta el general alto; dos insertos de la torre para contar los pocillos
  ["P3", T.p3, [[T.p3, ...FRENTE(0.7)], [T.p3 + 0.6, 0.85, 1.9, 0.55, 0.25, 1.0, -1.3, 54], [T.p3 + 1.3, ...ALTA(0)], [T.p3t1, ...ALTA(0.5)]]],
  ["P3t1", T.p3t1, [[T.p3t1, ...TORRE_C(0)], [T.p3w, ...TORRE_C(1)]]],
  ["P3w", T.p3w, [[T.p3w, ...ALTA(0.6)], [T.p3t2, ...ALTA(0.9)]]],
  ["P3t2", T.p3t2, [[T.p3t2, ...TORRE_C(0, 1)], [T.p3w2, ...TORRE_C(1, 1)]]],
  ["P3w2", T.p3w2, [[T.p3w2, ...ALTA2(0)], [T.p4, ...ALTA2(1)]]],   // (ronda 4) más abierto: Marta sentada y Rubén enteros
  ["P4", T.p4, [[T.p4, ...BAJO(0)], [T.p4b, ...BAJO(1)]]],
  ["P4b", T.p4b, [[T.p4b, 0, 0, 0, 0, 0, 0, 40], [T.p5, 0, 0, 0, 0, 0, 0, 40]]],   // inserto cenital (se arma aparte)
  ["P5", T.p5, [[T.p5, ...RUBEN_M(0)], [T.p5b, ...RUBEN_M(0.4)]]],
  ["P5b", T.p5b, [[T.p5b, ...MARTA_C(0)], [T.p5c, ...MARTA_C(1)]]],
  ["P5c", T.p5c, [[T.p5c, ...RUBEN_M(0.4)], [T.r2, ...RUBEN_M(0.9)], [T.p6, ...RUBEN_M(1.0)]]],
  ["P6", T.p6, [[T.p6, ...MARTA_C(0.4)], [T.p6x, ...MARTA_C(1)]]],
  ["P6x", T.p6x, [[T.p6x, 0.2, 1.5, 0.55, 0.15, 1.12, -1.4, 52], [T.p6m, 0.2, 1.48, 0.45, 0.15, 1.12, -1.4, 51]]],   // Rubén centrado: cara de nada, baja y sube con la caja
  ["P6m", T.p6m, [[T.p6m, 0.3, 1.46, 0.02, 0.27, 1.18, -1.1, 46], [T.p6b, 0.3, 1.45, -0.06, 0.27, 1.18, -1.1, 45]]],   // (ronda 5) más alta: la tapa no tapa la boca y se ve el piolín ·   // (ronda 2) más abierto: la cara de Rubén entra arriba   // la caja MES PASADO de frente (el rótulo grande)
  ["P6b", T.p6b, [[T.p6b, 0, 0, 0, 0, 0, 0, 40], [T.p6c, 0, 0, 0, 0, 0, 0, 40]]],   // inserto de la calculadora (se arma aparte)
  ["P6c", T.p6c, [[T.p6c, ...COSTADO(0, -0.85)], [T.saleM[0], ...COSTADO(0.6, -0.4)], [P1, ...COSTADO(1, -0.7)]]],   // (ronda 5) sigue a Marta: del cajón al mostrador y a la persiana
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...HOMBRO(0)], [T.caminaQ[1], ...Q1_FIN(0)], [T.q2, ...Q1_FIN(1)]]],   // (ronda 4) se abre y gira hacia la bandeja: se ve cómo la apoya
  ["Q2", T.q2, [[T.q2, 0, 0, 0, 0, 0, 0, 40], [T.q2b, 0, 0, 0, 0, 0, 0, 40]]],   // el celular (se arma aparte)
  ["Q2b", T.q2b, [[T.q2b, ...FRENTE2(0.2)], [T.q2c, ...FRENTE2(0.4)]]],
  ["Q2c", T.q2c, [[T.q2c, 0.85, 1.72, -0.75, 1.05, 1.68, -2.7, 44], [T.q3, 0.88, 1.74, -1.0, 1.08, 1.72, -2.75, 42]]],   // (ronda 1) corte directo a la yerba (sin grúa)
  ["Q3", T.q3, [[T.q3, ...MARTA_Q(0)], [T.q3b, ...MARTA_Q(0.6)]]],
  ["Q3b", T.q3b, [[T.q3b, ...FRENTE2(0.4)], [T.q3c, ...FRENTE2(0.7)]]],
  ["Q3c", T.q3c, [[T.q3c, ...MARTA_Q(0.6)], [T.q4, ...MARTA_Q(0.7)]]],
  ["Q4", T.q4, [[T.q4, ...MARTA_Q(0.9)], [T.q4b, ...MARTA_Q(1.4)]]],
  ["Q4b", T.q4b, [[T.q4b, ...MARTA_Q(1.4)], [T.q4i, ...MARTA_Q(1.6)]]],
  // (ronda 4) inserto de la caja CAFETERÍA de frente, bajo, desde el lado del cliente (por la izquierda de Marta): el
  // rótulo se lee, la tapa se va para el lado de Rubén y los tickets saltan hacia él (al fondo)
  ["Q4i", T.q4i, [[T.q4i, ...CAJA_Q(0)], [T.q4c, ...CAJA_Q(1)]]],
  // (ronda 4) Rubén de frente le saca el pocillo de arriba a la torre (en cuadro), lo deja junto a él y se gira a Marta
  ["Q4c", T.q4c, [[T.q4c, ...POC_Q(0)], [T.q5, ...POC_Q(1)]]],
  // (ronda 2) el final: general del lado del cliente, a la derecha: Marta entera a la izquierda sumando con su caja, Rubén
  // detrás del mostrador con el mate y el pocillo apoyado al lado
  ["Q5", T.q5, [[T.q5, ...FINAL_Q(0)], [DUR, ...FINAL_Q(1)]]],   // (ronda 4) desde atrás del mostrador, a la izquierda: Marta de 3/4 con su caja, la torre al costado, Rubén con el pocillo y el mate   // (ronda 2) de frente desde la persiana: Marta entera a la izquierda, Rubén de frente a la derecha
];
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++;
  planoActual = PLANOS[pi][0];
  const v = catmull(PLANOS[pi][2], t);
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const APOYA = { manoI: [0.26, 0.43, 0.4], manoD: [-0.26, 0.43, 0.4], codoI: null, codoD: null, dedoI: 0, dedoD: 0 };
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.9, tension: 0.1, feliz: 0 }, cejas: { alto: 0.05, ang: 0.15 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.95 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.3 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } };
const _w = new THREE.Vector3();
function manoA(per, pose, lado, mundo) {
  per.poner(pose); per.raiz.updateMatrixWorld(true);
  const l = per.cuerpo.worldToLocal(_w.copy(mundo));
  const k = per.cfg.alto || 1;
  pose[`mano${lado}`] = [l.x / k, l.y / k, l.z / k];
  return pose;
}
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
const dedosMano = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.localToWorld(out.set(0, -0.1, 0.02)); };
function manoConDedos(per, pose, lado, mundo) {
  const p1 = manoA(per, { ...pose }, lado, mundo); per.poner(p1);
  const tip = dedosMano(per, lado, new THREE.Vector3());
  return manoA(per, { ...pose }, lado, mundo.clone().add(mundo.clone().sub(tip)));
}
// (ronda 1) la yema del índice extendido (dedo de 0,12 m desde -0,1 de la mano): para apretar teclas con la punta
function manoConPunta(per, pose, lado, mundo) {
  let obj = mundo.clone(), p1 = null;
  for (let i = 0; i < 3; i++) {
    p1 = manoA(per, { ...pose }, lado, obj); per.poner({ ...p1, [`dedo${lado}`]: 1 });
    per.raiz.updateMatrixWorld(true);
    const tip = per.brazos[lado === "I" ? 0 : 1].mano.localToWorld(V3(0, -0.215, 0.01));
    obj.add(mundo.clone().sub(tip));
  }
  return p1;
}
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
};
const mezclaMano = (pose, p1, lado, k) => { pose[`mano${lado}`] = pose[`mano${lado}`].map((v, i) => lerp(v, p1[`mano${lado}`][i], k)); if (k > 0.5) pose[`codo${lado}`] = p1[`codo${lado}`]; };
const mirarA = (desde, x, z) => Math.atan2(x - desde.x, z - desde.z);

// ---------- Rubén ----------
const BANDEJA_M = V3(0.38, MY, -1.36);   // (ronda 4) más hacia Rubén: en el contraplano la torre queda al costado de la cara de Marta   // (ronda 2) la bandeja baja vertical a la derecha de Marta (por fuera de su cara)
const RI2 = { x: 0.66, z: -1.9 };   // (ronda 2) Rubén en la parte 2, un poco a la derecha (la torre le queda al costado)
const CUP_R = V3(0.72, MY, -1.28);   // (ronda 5) adelante y a la derecha de Rubén, lejos de la bandeja: lo baja por el costado, nunca por delante de la cara
const MQ = { x: 0.0, z: -0.7 };   // (ronda 1) parte 2: Marta en el mostrador, la bandeja a su izquierda
const CAJA_Q5 = { pos: V3(0, 0, 0), rot: 0 };   // (ronda 5) la caja en las manos de Marta en Q5
const CAF = V3(-0.3, MY, -1.18);   // (ronda 4) a la izquierda de Marta: lejos de la torre   // la caja CAFETERÍA en el mostrador
const HACIA_M = -0.62;   // giro de la cabeza de Rubén hacia Marta (a su derecha, -x)
const RK = [
  [0, { x: RI.x, z: RI.z, giro: 0, inclina: 0.06, ...APOYA, ...aC(-0.35, 0.05), ...CARA.neutra, ojos: { x: -0.4, y: 0.05, abiertos: 0.95 } }],
  [1.75, { ...aC(-0.1, 0.32), ojos: { x: 0, y: -0.6, abiertos: 0.9 } }, 0.3],
  [T.p2 + 0.05, { ...aC(-0.05, 0.08), ...CARA.neutra, ojos: { x: -0.1, y: 0.0, abiertos: 0.95 }, cejas: { alto: 0.15, ang: 0.1 }, boca: { sonrisa: 0.0 } }, 0.15],
  [T.abre, { ...aC(0.0, 0.3), ojos: { x: 0, y: -0.6, abiertos: 0.9 } }, 0.25],
  // la noche: mira la calculadora
  [T.p3 + 0.2, { inclina: 0.12, ...aC(0.0, 0.4), ...CARA.concentrada, ojos: { x: 0, y: -0.8, abiertos: 0.85 } }, 0.25],
  // P5: lee la cinta (los ojos bajan), levanta la vista a Marta, cara de nada
  [T.p5 - 0.001, { inclina: 0.06, ...aC(0.0, 0.1, 0.0), ...NADA, ojos: { x: 0, y: -0.35, abiertos: 0.95 } }, 0.001],
  [T.lee[1], { ...aC(0.0, 0.3, 0.0), ojos: { x: 0, y: -0.85, abiertos: 0.9 } }, T.lee[1] - T.lee[0]],
  [T.mira[1], { ...aC(HACIA_M * 0.35, 0.02, 0.0), ojos: { x: -0.35, y: 0.05, abiertos: 0.95 } }, T.mira[1] - T.mira[0]],
  // P6: escucha a Marta; baja entero detrás del mostrador y sube con la caja
  [T.p6 - 0.001, { inclina: 0.06, ...aC(HACIA_M * 0.6, 0.02), ...NADA }, 0.001],
  [T.baja[1], { y: -0.95, inclina: 0.3, ...aC(0, 0.3) }, T.baja[1] - T.baja[0]],
  [T.sube[1], { y: 0, inclina: 0.08, ...aC(HACIA_M * 0.5, 0.05), ...NADA }, T.sube[1] - T.sube[0], (u) => eo(u)],
  [T.p6b, { ...aC(0.0, 0.4), ojos: { x: 0, y: -0.8, abiertos: 0.9 } }, 0.2],
  [T.p6c + 0.05, { ...aC(HACIA_M * 0.6, 0.05), ...NADA, ojos: { x: -0.4, y: 0.05, abiertos: 0.95 } }, 0.2],
  [T.teclea2, { inclina: 0.12, ...aC(0.0, 0.4), ...CARA.concentrada, ojos: { x: 0, y: -0.8, abiertos: 0.85 } }, 0.25],
  // ---- parte 2: tranquilo, el mate en la mano ----
  [P2 - 0.001, { x: RI2.x, z: RI2.z, giro: 0, y: 0, sentado: 0, inclina: 0.04, ...APOYA, ...aC(-0.3, 0.02), ...BUENA, ojos: { x: -0.35, y: 0.05, abiertos: 1, feliz: 0.25 } }, 0.001],
  [T.vibra + 0.15, { ...aC(-0.15, 0.3), ojos: { x: -0.2, y: -0.7, abiertos: 1 } }, 0.25],
  [T.q2b - 0.001, { ...aC(-0.08, 0.06), ...BUENA, ojos: { x: -0.55, y: -0.45, abiertos: 1, feliz: 0.2 } }, 0.001],
  [T.r3 + 1.5, { ...aC(HACIA_M * 0.4, 0.04), ojos: { x: -0.4, y: 0.05, abiertos: 1, feliz: 0.3 } }, 0.3],
  [T.q3b - 0.001, { ...aC(HACIA_M * 0.45, 0.04), ...BUENA, ojos: { x: -0.4, y: 0.05, abiertos: 1, feliz: 0.35 } }, 0.001],
  // (ronda 1) Q5: ya del lado del cliente, junto al cajón: saca un pocillo de la torre y se sienta (ahora espera él)
  // (ronda 2) el final simple: en su lugar, le saca un pocillo a la torre, lo deja junto a él y toma mate tranquilo
  [T.q4c - 0.001, { x: 0.92 }, 0.001],   // (ronda 5) en Q4c (corte) un paso a su izquierda y se queda ahí: la torre lejos de la cara también en Q5
  [T.pocillo[0], { ...aC(-0.35, 0.2), ...BUENA, ojos: { x: -0.4, y: -0.4, abiertos: 1, feliz: 0.2 } }, 0.25],
  // (ronda 4) deja el pocillo y se gira hacia Marta (y hacia la cámara del final): ahora el que espera es él
  [T.gira[1], { giro: -0.3, inclina: 0.04, ...aC(-0.15, 0.05), ...BUENA, ojos: { x: -0.3, y: -0.1, abiertos: 1, feliz: 0.35 } }, T.gira[1] - T.gira[0]],
];
// ---------- Marta ----------
const MC = { x: -0.55, z: -0.62 };   // (ronda 1) a la izquierda de la torre: no la tapa desde el general   // en el mostrador (a la izquierda, junto a la torre)
const GIRO_MC = mirarA(MC, RI.x, RI.z);
const PERS_IN = { x: 0.05, z: FZ - 0.25 };   // recién pasada la persiana (agachada)
const SENT = { x: CAJON.x, z: CAJON.z + 0.02 };
const AGACHADA = { inclina: 0.62, y: -0.06, sentado: 0.35, ...aC(0, -0.45) };
const MK = [
  [0, { x: PERS_IN.x, z: PERS_IN.z + 0.12, giro: Math.PI, ...AGACHADA, ...BRAZOS.costado, ...CARA.sonrisa, ojos: { x: 0, y: 0.4, abiertos: 1, feliz: 0.25 } }],
  [T.levanta[1], { z: PERS_IN.z, inclina: 0.04, y: 0, sentado: 0, ...aC(0.1, 0.02) }, T.levanta[1] - T.levanta[0]],
  [T.camina[1], { x: MC.x, z: MC.z, giro: GIRO_MC, paso: 0 }, T.camina[1] - T.camina[0], (u) => u],
  [T.p2 + 0.2, { inclina: 0.06, ...aC(0.1, 0.04), ...CARA.sonrisa }, 0.2],
  // P3 · se apoya en el mostrador con el codo; después, sentada en el cajón con el pocillo en las dos manos
  [T.apoyada + 0.3, { inclina: 0.2, ladea: 0.06, ...aC(0.15, 0.1, 0.12), ...CARA.sonrisa }, 0.3],
  [T.sienta[1], { x: SENT.x, z: SENT.z, giro: mirarA(SENT, RI.x, RI.z), y: -0.13, sentado: 1, inclina: 0.08, ladea: 0, ...aC(0.0, 0.0), ...CARA.sonrisa }, T.sienta[1] - T.sienta[0]],
  // P5b · inclinada hacia adelante, ojos grandes
  [T.p5b + 0.15, { inclina: 0.3, ...aC(0.0, 0.08), ...CARA.esperanza, ojos: { x: 0, y: 0.05, abiertos: 1 }, cejas: { alto: 0.7, ang: 0.3 } }, 0.3],
  [T.r2 + 0.3, { inclina: 0.1, ...CARA.neutra, cejas: { alto: 0.4, ang: 0.1 } }, 0.3],
  [T.m2 + 0.1, { inclina: 0.12, ...CARA.esperanza, ...aC(0.0, 0.0) }, 0.25],
  // P6c · se levanta, agarra la torre, sale por la persiana
  [T.levantaM[1], { x: MC.x - 0.02, z: MC.z + 0.05, giro: GIRO_MC, y: 0, sentado: 0, inclina: 0.05, ...CARA.sonrisa }, T.levantaM[1] - T.levantaM[0]],
  [T.saleM[0] + 0.15, { giro: 0.15, paso: 1 }, 0.25],
  [T.saleM[1] - 0.25, { x: PERS_IN.x, z: PERS_IN.z + 0.05 }, T.saleM[1] - T.saleM[0] - 0.4, (u) => u],
  [T.saleM[1], { ...AGACHADA, paso: 0, z: PERS_IN.z + 0.25 }, 0.25],
  // ---- parte 2: entra agachada con la bandeja y el cajón colgando del antebrazo ----
  [P2 - 0.001, { x: PERS_IN.x, z: PERS_IN.z + 0.12, giro: Math.PI, ...AGACHADA, paso: 0, ...CARA.sonrisa, ojos: { x: 0, y: 0.4, abiertos: 1, feliz: 0.25 } }, 0.001],
  [T.levantaQ[1], { z: PERS_IN.z, inclina: 0.04, y: 0, sentado: 0, ...aC(0.1, 0.02) }, T.levantaQ[1] - T.levantaQ[0]],
  [T.caminaQ[1], { x: MQ.x, z: MQ.z, giro: mirarA(MQ, RI2.x, RI2.z), paso: 0 }, T.caminaQ[1] - T.caminaQ[0], (u) => u],
  [T.q3 + 0.1, { ...aC(0.0, 0.25), ojos: { x: 0, y: -0.6, abiertos: 1 }, ...CARA.esperanza }, 0.25],
  [T.q3 + 0.6, { ...aC(0.05, 0.02), ojos: { x: 0.1, y: 0.05, abiertos: 1 } }, 0.2],
  [T.q3c + 0.08, { ...CARA.sorpresa, boca: { sonrisa: 0, abierta: 0.15, ancho: 0.8 }, cejas: { alto: 0.9, ang: 0.2 }, ...aC(0, 0) }, 0.08],
  [T.m4, { ...CARA.neutra, cejas: { alto: -0.05, ang: -0.05 }, boca: { sonrisa: 0.0 }, ojos: { abiertos: 1 } }, 0.15],
  [T.sacaCaja[0] + 0.2, { inclina: 0.25, ...aC(0.2, 0.35) }, 0.2],   // (ronda 2) menos inclinada
  [T.sacaCaja[1], { inclina: 0.0, ...aC(0, 0.15), ...CARA.concentrada, ojos: { x: 0, y: -0.7, abiertos: 0.95 } }, 0.3],   // (ronda 4) de frente a su caja
  [T.q4c + 0.5, { giro: 3.68, inclina: 0.08 }, 0.35],   // (ronda 4) se pone de frente a su caja fuera de cuadro (en el inserto queda derecha, fuera del encuadre)
  // Q5 · suma con su caja: de frente al mostrador, la cabeza baja
  [T.q5 - 0.001, { giro: 0.45, inclina: 0.02, ...aC(0, 0.15), ...CARA.concentrada, ojos: { x: 0, y: -0.6, abiertos: 1 }, boca: { sonrisa: 0, abierta: 0, ancho: 0.8 } }, 0.001],
];

// ================= ESCENA EN EL TIEMPO =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3();
// cuántos pocillos hay en la torre (parte 1)
function enTorre(t) {
  if (t < T.taza1) return 0;
  let n = 1;
  for (const [, ap] of T.viajes) for (const a of ap) if (t >= a) n++;
  if (t >= T.agarra) n = 7;
  return Math.min(7, n);
}
function ultimoApoyo(t) { let u = T.taza1; for (const [, ap] of T.viajes) for (const a of ap) if (t >= a) u = a; if (t >= T.golpe) u = Math.max(u, T.golpe); return u; }
// Marta en los viajes: sale hacia la persiana y vuelve con los pocillos
function viajeMarta(t, p) {
  for (const [sale, ap] of T.viajes) {
    const vuelve = ap[0] - 0.1;
    if (!en(t, sale, vuelve + 0.001)) continue;
    const m = (sale + vuelve) / 2;
    const u = t < m ? eio(sg(t, sale, m)) : 1 - eio(sg(t, m, vuelve));
    p.x = lerp(MC.x, PERS_IN.x, u); p.z = lerp(MC.z, PERS_IN.z + 0.2, u);
    p.giro = t < m ? lerp(GIRO_MC, 0.1, Math.min(1, u * 3)) : lerp(Math.PI, GIRO_MC, Math.min(1, (1 - u) * 3));
    p.paso = 1; p.inclina = 0.05; p.ladea = 0;
    return { fuera: u > 0.92, conPocillos: t >= m ? ap.length : 0 };
  }
  return null;
}
function ponerPersonajes(t, plano) {
  const parte2 = t >= P2;
  // ---- Rubén ----
  const pr = poseEn(t, RK);
  ruben.poner(pr);
  const KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "+", "00", "+", "5", "+"];
  if (!parte2) {
    // P2 · se arremanga (la derecha frota el antebrazo izquierdo, cerca del cuerpo)
    if (en(t, T.arremanga[0], T.abre - 0.15)) {
      const k = eio(sg(t, T.arremanga[0], T.arremanga[0] + 0.2)) * (1 - eio(sg(t, T.arremanga[1], T.abre - 0.15)));
      const f = Math.sin((t - T.arremanga[0]) * 14) * 0.04;
      pr.manoI = [lerp(0.26, 0.2, k), lerp(0.43, 0.36, k), lerp(0.4, 0.34, k)];
      pr.manoD = [lerp(-0.26, 0.1 + f, k), lerp(0.43, 0.41, k), lerp(0.4, 0.38, k)]; pr.codoD = k > 0.3 ? [-1, -0.6, -0.1] : null;
    }
    // abre la caja (las dos manos en la tapa) y arrastra la calculadora con la derecha
    if (en(t, T.abre - 0.2, T.calcu[0])) {
      const k = eio(sg(t, T.abre - 0.2, T.abre - 0.02));
      cajaT.updateMatrixWorld(true);
      const tp = cajaT.userData.tapa.localToWorld(V3(0.12, 0.03, 0.24));
      const p1 = manoConDedos(ruben, { ...pr }, "I", tp); mezclaMano(pr, p1, "I", k);
    }
    if (en(t, T.calcu[0] - 0.15, T.p3 + 0.1)) {
      const k = eio(sg(t, T.calcu[0] - 0.15, T.calcu[0]));
      const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.6, -0.2] }, "D", calcu.position.clone().add(V3(0.0, 0.12, -0.16)));
      mezclaMano(pr, p1, "D", k);
    }
    // la noche y P6c: teclea a velocidad de dibujito (la derecha salta de tecla en tecla; la izquierda sostiene el borde)
    const tecleando = en(t, T.p3, T.teclea[1]) || t >= T.teclea2 + 0.1;
    if (tecleando) {
      const i = Math.floor(t * 9) % KEYS.length, f = (t * 9) % 1;
      const kp = calcu.userData.tecla(KEYS[i]).add(V3(0, 0.03 * (1 - Math.sin(Math.PI * f)), 0));
      const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.5, -0.2] }, "D", kp); mezclaMano(pr, p1, "D", 1); pr.dedoD = 1;
      const p2 = manoA(ruben, { ...pr, codoI: [1, -0.5, -0.2] }, "I", calcu.position.clone().add(V3(0.2, 0.07, 0.0))); pr.manoI = p2.manoI; pr.codoI = p2.codoI;
      calcu.userData.hundir(KEYS[i], Math.sin(Math.PI * f) > 0.6 ? 1 : 0);
    }
    // P4b · TOTAL con el índice; después arranca la cinta (la mano tira para arriba)
    if (en(t, T.p4b - 0.1, T.p5)) {
      const kT = eio(sg(t, T.p4b, T.total)) * (1 - eio(sg(t, T.total + 0.08, T.imprime[1])));
      const obj = calcu.userData.tecla("TOTAL").add(V3(0, 0.035 * (1 - kT), 0));
      if (t < T.imprime[1]) { const p1 = manoConPunta(ruben, { ...pr, codoD: [-1, -0.5, -0.2] }, "D", obj); mezclaMano(pr, p1, "D", 1); pr.dedoD = 1; }
      else {
        const ku = eio(sg(t, T.imprime[1], T.arranca + 0.1));
        const sal = calcu.localToWorld(calcu.userData.salida.clone()).add(V3(0, 0.06 + ku * 0.25, 0));
        const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.5, -0.2] }, "D", sal); mezclaMano(pr, p1, "D", 1);
      }
      calcu.userData.hundir("TOTAL", t >= T.total - 0.03 && t < T.total + 0.1 ? 1 : 0);
    }
    // P5 · lee la cinta: las dos manos la sostienen a la altura del pecho y "trepan" hacia abajo
    if (en(t, T.p5, T.golpe)) {
      const u = eio(sg(t, T.lee[0], T.lee[1]));
      pr.manoI = [0.13, lerp(0.52, 0.42, u), 0.42]; pr.manoD = [-0.13, lerp(0.55, 0.45, u), 0.42]; pr.codoI = [1, -0.6, -0.3]; pr.codoD = [-1, -0.6, -0.3];
      // "Ahí.": la derecha suelta la cinta y se abre al costado, palma abajo, a la altura del pecho: se balancea dos veces
      if (t >= T.masomenos[0]) {
        const k = eio(sg(t, T.masomenos[0], T.masomenos[0] + 0.15)) * (1 - eio(sg(t, T.masomenos[1], T.masomenos[1] + 0.2)));
        const b = Math.sin(sg(t, T.masomenos[0] + 0.12, T.masomenos[1]) * Math.PI * 4) * 0.045;
        pr.manoD = [lerp(-0.13, -0.08, k), lerp(0.45, 0.52, k), lerp(0.42, 0.62, k)]; pr.codoD = [-1, -0.3, -0.1];   // (ronda 1) delante del pecho, en cuadro
      }
      if (t >= T.baja[0] - 0.1) { const k = eio(sg(t, T.baja[0] - 0.1, T.baja[0] + 0.1)); pr.manoI = pr.manoI.map((v, i) => lerp(v, APOYA.manoI[i], k)); pr.manoD = pr.manoD.map((v, i) => lerp(v, APOYA.manoD[i], k)); }
    }
    // P6 · sube con la caja MES PASADO (las dos manos a los costados de la caja) y la apoya de golpe
    if (en(t, T.baja[1], T.golpe + 0.25)) {
      ruben.poner(pr); cajaMP.updateMatrixWorld(true);
      const W = cajaMP.userData.W;
      const pI = manoA(ruben, { ...pr, codoI: [1, -0.6, -0.1] }, "I", cajaMP.localToWorld(V3(W / 2 + 0.03, 0.09, 0.02)));
      const pD = manoA(ruben, { ...pr, codoD: [-1, -0.6, -0.1] }, "D", cajaMP.localToWorld(V3(-W / 2 - 0.03, 0.09, 0.02)));
      const k = 1 - eio(sg(t, T.golpe + 0.05, T.golpe + 0.25));
      mezclaMano(pr, pI, "I", k); mezclaMano(pr, pD, "D", k);
    }
    // P6b · aprieta la C
    if (en(t, T.p6b - 0.1, T.p6c)) {
      const k = eio(sg(t, T.p6b, T.tc)) * (1 - eio(sg(t, T.tc + 0.08, T.tc + 0.25)));
      const obj = calcu.userData.tecla("C").add(V3(0, 0.03 * (1 - k) - 0.004, 0));   // (ronda 1) la yema llega a la C
      const p1 = manoConPunta(ruben, { ...pr, codoD: [-1, -0.5, -0.2] }, "D", obj); mezclaMano(pr, p1, "D", Math.min(1, k * 2)); pr.dedoD = 1;
      calcu.userData.hundir("C", t >= T.tc - 0.03 && t < T.tc + 0.22 ? 1 : 0); pr.manoI = APOYA.manoI; pr.codoI = null;
    }
  } else {
    // parte 2 · el mate en la izquierda, a la altura del pecho (nunca en la cara); la derecha apoyada
    pr.manoI = [0.24, 0.5, 0.36]; pr.codoI = [1, -0.6, -0.2];
    // (ronda 2) le saca el pocillo de arriba a la torre (derecha), lo apoya junto a él y vuelve; el sorbo: la bombilla
    // a la boca (bajo el bigote), el mate agarrado por el costado
    if (en(t, T.pocillo[0] - 0.3, T.pocillo[1] + 0.35)) {
      ruben.poner(pr); bandeja.updateMatrixWorld(true);
      const top = torre2.userData.pocs[6].getWorldPosition(_a).clone().add(V3(0, 0.03, 0.085));   // (ronda 5) lo agarra por el costado (el asa), no desde arriba: la mano no pasa por la cara
      const dest = CUP_R.clone().add(V3(0, 0.07, 0));
      // (ronda 5) primero lo levanta derecho (el plato sale limpio del pocillo de abajo), después baja y se corre a su lado
      const ul = eio(sg(t, T.pocillo[0], T.pocillo[0] + 0.1)), u = sg(t, T.pocillo[0] + 0.08, T.pocillo[1]);
      const dest2 = dest.clone().add(V3(0, -0.04, 0.085));   // el asa en el destino
      const ux = eio(sg(u, 0.25, 1)), uy = eo(sg(u, 0.1, 0.75)), adel = Math.sin(Math.PI * sg(u, 0, 0.8)) * 0.16;   // (ronda 5) sube, sale hacia adelante (por delante de la torre, no a través), baja y se corre: lejos de la cara
      const obj = t < T.pocillo[0] ? top : V3(lerp(top.x, dest2.x, ux), lerp(top.y + 0.06 * ul, dest2.y, uy), lerp(top.z, dest2.z, ux) + adel);
      const k = eio(sg(t, T.pocillo[0] - 0.3, T.pocillo[0])) * (1 - eio(sg(t, T.pocillo[1] + 0.05, T.pocillo[1] + 0.35)));
      const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.6, -0.2] }, "D", obj); mezclaMano(pr, p1, "D", k);
    }
    if (en(t, T.sorbo - 0.35, T.sorbo + 1.2)) {
      ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
      const ks = eio(sg(t, T.sorbo - 0.35, T.sorbo)) * (1 - eio(sg(t, T.sorbo + 0.85, T.sorbo + 1.2)));
      const g = ruben.raiz.rotation.y, izq = V3(Math.cos(g), 0, -Math.sin(g));
      const m = mateSorbo(g);
      const pI = manoA(ruben, { ...pr, codoI: [1, -0.7, -0.1] }, "I", m.clone().add(izq.multiplyScalar(0.1)).add(V3(0, 0.05, 0)));
      mezclaMano(pr, pI, "I", ks); pr.codoI = [1, -0.7, -0.1];
    }
  }
  bocaVoz(pr, t, T.r1, ENV.r1, 0.55); bocaVoz(pr, t, T.r2, ENV.r2, 0.55); bocaVoz(pr, t, T.r3, ENV.r3, 0.55); bocaVoz(pr, t, T.r4, ENV.r4, 0.55);
  ruben.poner(pr);
  // (ronda 1) "más o menos": la palma abajo que se balancea (rotación sobre el eje del antebrazo), dos vaivenes
  if (!parte2 && en(t, T.masomenos[0], T.masomenos[1] + 0.2)) {
    const k = eio(sg(t, T.masomenos[0], T.masomenos[0] + 0.15)) * (1 - eio(sg(t, T.masomenos[1], T.masomenos[1] + 0.2)));
    const v = Math.sin(sg(t, T.masomenos[0] + 0.12, T.masomenos[1]) * Math.PI * 4) * 0.55;
    const mano = ruben.brazos[1].mano;
    mano.updateMatrixWorld(true);
    const up = V3(0, 1, 0).transformDirection(mano.matrixWorld.clone().invert());   // el "arriba" del mundo en la mano
    mano.rotateY(Math.atan2(up.x, up.z) + v * k);   // la palma (cara +z de la mano abierta) mira arriba: el dorso arriba, la palma abajo
    for (const o of mano.children) o.visible = o === PALMA;
    PALMA.visible = k > 0.05;
  } else { for (const o of ruben.brazos[1].mano.children) o.visible = o !== PALMA; ruben.brazos[1].dedo.visible = ruben.brazos[1].dedo.scale.y > 0.02; }

  // ---- Marta ----
  const pm = poseEn(t, MK);
  let llevaPoc = 0, fuera = false;
  if (!parte2) {
    // P1: el pocillo en la derecha, adelante, hasta que lo apoya
    if (t < T.taza1) { pm.manoD = [-0.18, lerp(0.2, 0.42, eio(sg(t, T.levanta[0], T.levanta[1]))), 0.34]; pm.codoD = [-1, -0.6, -0.2]; llevaPoc = 1; }
    if (en(t, T.taza1 - 0.35, T.taza1 + 0.25)) {
      const k = eio(sg(t, T.taza1 - 0.35, T.taza1)) * (1 - eio(sg(t, T.taza1 + 0.05, T.taza1 + 0.25)));
      const p1 = manoA(marta, { ...pm, codoD: [-1, -0.6, -0.2] }, "D", TORRE.clone().add(V3(0, 0.07, 0.02))); mezclaMano(pm, p1, "D", k);
    }
    const vj = viajeMarta(t, pm);
    if (vj) { fuera = vj.fuera; if (vj.conPocillos) { pm.manoD = [-0.1, 0.42, 0.34]; pm.manoI = [0.1, 0.42, 0.34]; pm.codoD = [-1, -0.6, -0.2]; pm.codoI = [1, -0.6, -0.2]; llevaPoc = vj.conPocillos; } }
    // apoyando los pocillos del viaje en la torre
    for (const [, ap] of T.viajes) if (en(t, ap[0] - 0.12, ap[ap.length - 1] + 0.2)) {
      const n = enTorre(t);
      const k = 1 - eio(sg(t, ap[ap.length - 1] + 0.02, ap[ap.length - 1] + 0.2));
      const obj = TORRE.clone().add(V3(0.02, n * POC.alto + 0.06, 0.04));
      const p1 = manoA(marta, { ...pm, codoD: [-1, -0.6, -0.2] }, "D", obj); mezclaMano(pm, p1, "D", k);
      llevaPoc = Math.max(0, ap.filter((a) => t < a).length);
    }
    // apoyada con el codo en el mostrador (entre el segundo y el tercer viaje)
    if (en(t, T.apoyada, T.viajes[2][0]) || en(t, T.viajes[1][1][1] + 0.2, T.viajes[2][0])) {
      const p1 = manoA(marta, { ...pm, codoI: [1, -0.3, 0.2] }, "I", V3(MC.x + 0.1, MY + 0.08, MZF - 0.12)); pm.manoI = p1.manoI; pm.codoI = p1.codoI;
    }
    // sentada (y en P5b, P6): el pocillo en las dos manos a la altura del pecho; en P5b a medio camino a la boca
    if (en(t, T.sienta[1] - 0.15, T.levantaM[0])) {
      const alto = en(t, T.p5b, T.p5c + 0.6) ? lerp(0.42, 0.56, eio(sg(t, T.p5b, T.p5b + 0.3))) : 0.38;
      pm.manoD = [-0.06, alto, 0.3]; pm.manoI = [0.06, alto, 0.3]; pm.codoD = [-1, -0.7, -0.2]; pm.codoI = [1, -0.7, -0.2]; llevaPoc = 1;
    }
    // P6c · agarra la torre entera con las dos manos (LLEVA_TORRE) y se la lleva
    if (t >= T.agarra - 0.25) {
      const k = eio(sg(t, T.agarra - 0.25, T.agarra));
      Object.assign(pm, mezclar0(pm, { manoI: [0.12, 0.36, 0.36], manoD: [-0.12, 0.36, 0.36] }, k)); pm.codoI = [1, -0.7, -0.2]; pm.codoD = [-1, -0.7, -0.2];
      // (ronda 4) al salir la lleva a un costado (a su derecha): la torre nunca delante de la cara
      const kc = eio(sg(t, T.saleM[0] - 0.1, T.saleM[0] + 0.2));
      if (kc > 0) Object.assign(pm, mezclar0(pm, { manoI: [-0.32, 0.24, 0.16], manoD: [-0.58, 0.24, 0.08] }, kc));
    }
  } else {
    // parte 2 · la bandeja con la torre en las dos manos (a su derecha); el cajón colgando del antebrazo izquierdo. En Q1
    // apoya la bandeja en el mostrador, a su izquierda (ronda 1: nunca delante de la cara ni del pecho) y deja el cajón
    const lift = eio(sg(t, T.caminaQ[1] - 0.4, T.caminaQ[1])) * 0.25;   // (ronda 4) al llegar sube la bandeja por encima del mostrador (no lo atraviesa)
    pm.manoI = [-0.18, 0.22 + lift, 0.42]; pm.manoD = [-0.5, 0.22 + lift, 0.3]; pm.codoI = [1, -0.7, -0.2]; pm.codoD = [-1, -0.7, -0.2];
    if (t >= T.caminaQ[1]) {
      const k = eio(sg(t, T.apoyaQ + 0.05, T.apoyaQ + 0.3));
      const baja = 0.09 * (1 - eio(sg(t, T.apoyaQ - 0.3, T.apoyaQ)));   // (ronda 2) arriba de su lugar y baja vertical
      const bD = manoA(marta, { ...pm }, "D", BANDEJA_M.clone().add(V3(0.15, 0.05 + baja, 0.05))), bI = manoA(marta, { ...pm }, "I", BANDEJA_M.clone().add(V3(-0.15, 0.05 + baja, 0.06)));
      const libre = { manoI: [0.24, 0.36, 0.36], manoD: [-0.24, 0.36, 0.36] };
      if (t < T.apoyaQ + 0.05) { const kk = eio(sg(t, T.caminaQ[1], T.caminaQ[1] + 0.2)); mezclaMano(pm, bD, "D", kk); mezclaMano(pm, bI, "I", kk); }
      else { pm.manoD = bD.manoD.map((v, i) => lerp(v, libre.manoD[i], k)); pm.manoI = bI.manoI.map((v, i) => lerp(v, libre.manoI[i], k)); pm.codoD = null; pm.codoI = null; }
    }
    // Q3 · le da un toquecito a la bandeja (la torre tiembla)
    if (en(t, T.tiembla - 0.2, T.tiembla + 0.35)) {
      const k = eio(sg(t, T.tiembla - 0.2, T.tiembla)) * (1 - eio(sg(t, T.tiembla + 0.1, T.tiembla + 0.35)));
      const p1 = manoA(marta, { ...pm, codoD: [-1, -0.6, -0.2] }, "D", BANDEJA_M.clone().add(V3(-0.16, 0.04, 0.05))); mezclaMano(pm, p1, "D", k);
    }
    // Q4b · saca la caja CAFETERÍA del cajón y la pone en el mostrador; Q5 · suma: las manos pasan los tickets
    if (t >= T.sacaCaja[0]) {
      cajaCaf.updateMatrixWorld(true);
      const W = cajaCaf.userData.W;
      const pI2 = manoA(marta, { ...pm, codoI: [1, -0.6, -0.1] }, "I", cajaCaf.localToWorld(V3(W / 2 + 0.03, 0.07, 0)));
      const pD2 = manoA(marta, { ...pm, codoD: [-1, -0.6, -0.1] }, "D", cajaCaf.localToWorld(V3(-W / 2 - 0.03, 0.07, 0)));
      const k = eio(sg(t, T.sacaCaja[0], T.sacaCaja[0] + 0.12)) * (1 - eio(sg(t, T.abreQ, T.abreQ + 0.2)));
      mezclaMano(pm, pI2, "I", k); mezclaMano(pm, pD2, "D", k);
      // (ronda 4) al abrir saca las manos (los tickets saltan solos); desde Q4c suma: las manos pasan los tickets
      if (en(t, T.sacaCaja[1] - 0.08, T.q4c + 0.3)) {
        const kb = eio(sg(t, T.sacaCaja[1] - 0.08, T.sacaCaja[1] + 0.04)) * (1 - eio(sg(t, T.q4c, T.q4c + 0.3)));
        pm.manoI = pm.manoI.map((v, i) => lerp(v, [0.25, 0.14, 0.06][i], kb)); pm.manoD = pm.manoD.map((v, i) => lerp(v, [-0.25, 0.14, 0.06][i], kb));
        if (kb > 0.5) { pm.codoI = null; pm.codoD = null; }   // los brazos abajo, al costado: nada delante del rótulo
      }
      // (ronda 5) Q5: levantó su caja y la sostiene delante del pecho, de 3/4 a cámara, mirando adentro (suma)
      if (t >= T.q5) {
        const g = pm.giro, b = Math.sin((t - T.q5) * 7) * 0.008;
        CAJA_Q5.pos.set(pm.x + Math.sin(g) * 0.3, 1.06 + b, pm.z + Math.cos(g) * 0.3); CAJA_Q5.rot = g - 0.45;
        cajaCaf.position.copy(CAJA_Q5.pos); cajaCaf.rotation.set(0, CAJA_Q5.rot, 0); cajaCaf.updateMatrixWorld(true);
        const qI = manoA(marta, { ...pm, codoI: [1, -0.7, -0.1] }, "I", cajaCaf.localToWorld(V3(W / 2 + 0.02, 0.06, 0)));
        const qD = manoA(marta, { ...pm, codoD: [-1, -0.7, -0.1] }, "D", cajaCaf.localToWorld(V3(-W / 2 - 0.02, 0.06, 0)));
        pm.manoI = qI.manoI; pm.manoD = qD.manoD; pm.codoI = qI.codoI; pm.codoD = qD.codoD;
      } else if (t >= T.q4c) {
        const ks = eio(sg(t, T.q4c, T.q4c + 0.3));
        const f = Math.sin((t - T.abreQ) * 9);
        const oI = manoA(marta, { ...pm }, "I", CAF.clone().add(V3(0.08 + f * 0.04, 0.12 + Math.max(0, f) * 0.03, 0.14)));
        const oD = manoA(marta, { ...pm }, "D", CAF.clone().add(V3(-0.1 - f * 0.04, 0.12 + Math.max(0, -f) * 0.03, 0.14)));
        mezclaMano(pm, oI, "I", ks); mezclaMano(pm, oD, "D", ks); pm.codoI = [1, -0.6, -0.2]; pm.codoD = [-1, -0.6, -0.2];
      }
    }
  }
  bocaVoz(pm, t, T.m1, ENV.m1, 0.6); bocaVoz(pm, t, T.m1b, ENV.m1, 0.6); bocaVoz(pm, t, T.m2, ENV.m2, 0.6); bocaVoz(pm, t, T.m3, ENV.m3, 0.6); bocaVoz(pm, t, T.m4, ENV.m4, 0.6);
  marta.poner(pm);

  // ---- visibilidad por plano ----
  marta.cabeza.visible = !["P3t1", "P3t2", "Q4i"].includes(plano);   // (ronda 4) también en el inserto de la caja (asomaba el borde de la cabeza)   // (ronda 2) en los insertos de la torre, de Marta solo la mano
  ruben.raiz.visible = !["Q3", "Q3c", "Q4", "Q4b", "P1", "Q1", "P4", "P4b", "P6b", "Q2", "Q2c", "P3t1", "P3t2"].includes(plano);   // P1/Q1: fuera de cuadro (solo asomaba la mano)
  marta.raiz.visible = !["P4", "P4b", "P6b", "P6x", "P6m", "Q2", "Q4i"].includes(plano) && !fuera && !(plano === "P6c" && t > T.saleM[1] - 0.05) && !(plano === "P5" || plano === "P5c" || plano === "Q2b" || plano === "Q3b");
  return { llevaPoc };
}
// (ronda 2) dónde va el mate para que la punta de la bombilla quede en la boca de Rubén (bajo el bigote)
function mateSorbo(g) {
  ruben.cabeza.updateMatrixWorld(true);
  const boca = ruben.cabeza.localToWorld(V3(0, 0.24, 0.17));   // (ronda 4) medido de 3/4: la punta en la boca, bajo el bigote (antes quedaba 8 cm adelante)
  const th = g - Math.PI / 2;
  const punta = mateR.userData.punta.clone().multiplyScalar(1.25).applyAxisAngle(V3(0, 1, 0), th);
  return boca.sub(punta);
}
const mezclar0 = (a, b, k) => ({ manoI: a.manoI.map((v, i) => lerp(v, b.manoI[i], k)), manoD: a.manoD.map((v, i) => lerp(v, b.manoD[i], k)) });

function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  ponerCamara(t);
  const plano = planoActual;

  // ---- la calculadora: entra en P2 arrastrada; en la parte 2 no está ----
  calcu.visible = !parte2 && t >= T.calcu[0] - 0.4;
  calcu.position.copy(CALC_IN.clone().lerp(CALC, eo(sg(t, T.calcu[0], T.calcu[1]))));
  calcu.rotation.set(0, Math.PI, 0);
  if (calcu.visible) {
    for (const k in calcu.userData.TECLAS) calcu.userData.hundir(k, 0);
    let pant = "0.";
    if (t >= T.p3) { const n = Math.floor((t - T.p3) * 9); pant = (1250 + ((n * 7919) % 3700) * 97 + n * 1311).toLocaleString("es-UY"); }
    if (t >= T.total) pant = "412.300";
    if (t >= T.tc) pant = "0.";
    if (t >= T.teclea2 + 0.15) { const n = Math.floor((t - T.teclea2) * 9); pant = (380 + n * 1250).toLocaleString("es-UY"); }
    calcu.userData.setPantalla(pant);
  }
  const st = ponerPersonajes(t, plano);
  for (const per of TODOS) per.ojoLejano(camera.position);
  herraduraSegunCamara();
  relleno.position.copy(camera.position).add(V3(0.4, 0.8, 0)); relleno.target.position.copy(camera.position).add(camera.getWorldDirection(_a).multiplyScalar(3));

  // ---- la caja TICKETS: se abre en P2, los tickets saltan; en la noche se vacía. Parte 2: no está ----
  cajaT.visible = !parte2;
  cajaT.position.copy(CAJA_T); cajaT.rotation.set(0, 0.06, 0);
  cajaT.userData.abrir(eio(sg(t, T.abre - 0.08, T.abre + 0.08)));   // (ronda 1) queda abierta (y vacía) hasta el final
  const vaciar = sg(t, T.pela[0], T.pela[1]);
  cajaT.userData.llenos(t < T.abre ? 12 : Math.round(12 * (1 - vaciar)));
  ponerSalto(SALTO_T, t, T.abre, CAJA_T.clone().add(V3(0, 0.0, 0.0)), parte2 ? -1 : 99, vaciar);
  // la caja MES PASADO: sube con Rubén y se apoya de golpe (polvillo: no; la torre se sacude)
  cajaMP.visible = !parte2 && t >= T.baja[1] && (t < T.p6b || t >= T.p6b);
  if (cajaMP.visible) {
    const u = sg(t, T.sube[0], T.golpe);
    cajaMP.position.copy(CAJA_MP).add(V3(0, -0.5 * (1 - eo(u)) + (u < 1 ? 0.04 : 0), 0.02 * (1 - u)));
    if (t >= T.golpe) cajaMP.position.y = MY + Math.abs(Math.sin(sg(t, T.golpe, T.golpe + 0.18) * Math.PI)) * 0.01 * (1 - sg(t, T.golpe, T.golpe + 0.18));
    cajaMP.rotation.set(0, 0.1, 0);
  }
  // la caja CAFETERÍA (Q4b): sale del cajón de Marta, va al mostrador, se abre: los tickets saltan
  cajaCaf.visible = parte2 && t >= T.sacaCaja[0];
  if (cajaCaf.visible) {
    const u = eio(sg(t, T.sacaCaja[0], T.sacaCaja[1]));
    const desde = CAJON2.clone().add(V3(0, 0.3, 0)), hasta = CAF.clone();
    cajaCaf.position.copy(desde.clone().lerp(hasta, u)); cajaCaf.position.y += Math.sin(u * Math.PI) * 0.15;
    cajaCaf.rotation.set(0, 0.1 * u, 0);
    if (t >= T.q5) { cajaCaf.position.copy(CAJA_Q5.pos); cajaCaf.rotation.set(0, CAJA_Q5.rot, 0); }   // (ronda 5) en las manos de Marta   // (ronda 5) en Q5 (corte) el rótulo de atrás mira a la cámara   // la bisagra del lado de Rubén: la tapa se va para su lado
    cajaCaf.userData.abrir(1.0 * eio(sg(t, T.abreQ - 0.08, T.abreQ + 0.08)));   // (ronda 2) la tapa se abre hacia Rubén, más baja
    cajaCaf.userData.llenos(t < T.abreQ ? 12 : 5);
  }
  ponerSalto(SALTO_C, t, T.abreQ, CAF.clone(), parte2 ? 99 : -1);
  // el pinche: lleno hasta la noche, se pela de a una
  pinche.visible = !parte2;
  pinche.userData.cuantas(Math.round(13 * (1 - sg(t, T.pela[0], T.pela[1]))));
  // ---- la torre de pocillos ----
  const nT = enTorre(t);
  torre.visible = !parte2 && nT > 0 && t < T.agarra;
  const ua = ultimoApoyo(t);
  const bal = Math.sin((t - ua) * 18) * 0.05 * Math.exp(-(t - ua) * 5) * (t >= ua ? 1 : 0);
  torre.position.copy(TORRE); torre.rotation.set(0, 0.3, 0);
  torre.userData.poner(nT, bal);
  // Marta se la lleva (P6c): la torre entre las dos manos
  const torreM = !parte2 && t >= T.agarra && marta.raiz.visible;
  if (torreM) {
    torre.visible = true; torre.userData.poner(7, Math.sin(t * 9) * 0.02);
    const a = manoMundo(marta, "I", _a), b = manoMundo(marta, "D", _b);
    torre.position.copy(a.clone().add(b).multiplyScalar(0.5)).add(V3(0, -0.06, 0)); torre.rotation.set(0, marta.raiz.rotation.y, 0);
  }
  // el pocillo en la mano de Marta (P1, viajes, sentada)
  pocMano.visible = !parte2 && st.llevaPoc > 0 && marta.raiz.visible;
  if (pocMano.visible) {
    const a = manoMundo(marta, "D", _a), b = manoMundo(marta, "I", _b);
    const apoyando = T.viajes.some(([, ap]) => en(t, ap[0] - 0.12, ap[ap.length - 1] + 0.02));   // (ronda 4) el que apoya va en la mano derecha (la mano no flota vacía)
    const dos = en(t, T.sienta[1] - 0.15, T.levantaM[0]) || (st.llevaPoc > 1 && !apoyando);
    pocMano.position.copy(dos ? a.clone().add(b).multiplyScalar(0.5) : a).add(V3(0, -0.07, 0.0)); pocMano.rotation.set(0, marta.raiz.rotation.y, 0);
  }
  vapor.visible = pocMano.visible && t < T.taza1;
  if (vapor.visible) { vapor.position.copy(pocMano.position).add(V3(0, 0.08, 0)); vapor.userData.actualizar(t, 1); }
  // ---- la montaña de cinta (crece en la noche; queda; en la parte 2 no está) ----
  const nivel = parte2 ? -1 : 0.04 + 0.96 * eio(sg(t, T.monta[0], T.monta[1]));
  ponerMontana(t < T.monta[0] ? -1 : nivel);
  // la tira que sale de la calculadora y cae por el frente del mostrador hasta la cima de la montaña
  tiraCalc.visible = !parte2 && t >= T.p3 && t < T.arranca && calcu.visible;
  if (tiraCalc.visible) {
    calcu.updateMatrixWorld(true);
    const s0 = calcu.localToWorld(calcu.userData.salida.clone());
    const cima = MONTA.H * Math.pow(nivel, 1 / 0.8) + 0.08;
    const ond = Math.sin(t * 7) * 0.012;
    const pts = [s0, s0.clone().add(V3(0, 0.06, 0.05)), V3(CALC.x + 0.02, MY + 0.06, MZF + 0.05 + ond), V3(CALC.x + 0.05, MY - 0.05, MZF + 0.12), V3(MONTA.x - 0.02, Math.max(cima, 0.1) + 0.05, MONTA.z + 0.02)];
    tiraCalc.userData.poner(pts, V3(1, 0, 0), 0.07, 3);
    cintaT.offset.y = -t * 0.8;
  }
  // la cinta arrancada en las manos de Rubén (P4b-P6), que le cuelga hasta perderse en la montaña
  tiraLee.visible = !parte2 && t >= T.arranca && t < T.baja[0] && ruben.raiz.visible && plano !== "P4b";
  if (tiraLee.visible) {
    const a = manoMundo(ruben, "I", _a).clone(), b = manoMundo(ruben, "D", _b).clone();
    const suelta = t >= T.masomenos[0] + 0.1;
    const arriba = (suelta ? a.clone().add(V3(-0.05, 0.02, 0)) : a.clone().add(b).multiplyScalar(0.5)).add(V3(0, 0.02, 0.05));
    const pts = [arriba.clone().add(V3(0, 0.1, 0)), arriba, arriba.clone().add(V3(0, -0.18, 0.06)), V3(arriba.x, MY + 0.05, MZF + 0.1), V3(MONTA.x - 0.05, MONTA.H * 0.85, MONTA.z + 0.05)];
    tiraLee.userData.poner(pts, V3(1, 0, 0), 0.085, 1.2);
    cintaLeeT.offset.y = 0.35 - eio(sg(t, T.lee[0], T.lee[1])) * 0.35;
  }
  // ---- la persiana: a la mañana la franja de abajo pasa a crema cálido (es por el pan) ----
  const km = parte2 ? 0 : eio(sg(t, T.manana[0], T.manana[1]));
  calle.color.setHex(C.navy).lerp(new THREE.Color(0x3d5a86), km);   // (ronda 1) afuera: cielo de madrugada (no una pared crema)
  vereda.color.setHex(C.navy).lerp(new THREE.Color(C.calido), km);
  luzPiso.opacity = 0.85 * km;   // la franja de luz de verdad, sobre el piso
  // el pan: la mano del panadero lo empuja por debajo de la persiana y se va
  bolsaPan.visible = !parte2 && t >= T.pan[0] - 0.05;
  const up = eo(sg(t, T.pan[0], T.pan[1]));
  bolsaPan.position.set(-0.25, 0, lerp(FZ + 0.35, FZ - 0.42, up)); bolsaPan.rotation.set(0, 0.25, 0);
  manoPan.visible = !parte2 && en(t, T.pan[0] - 0.05, T.panSale[1]) && plano === "P4";
  // (ronda 1) la mano empuja la bolsa por el costado que da a la cámara (se ven manga y mano)
  manoPan.position.set(-0.25 + 0.17, 0.16, bolsaPan.position.z + 0.02 + 0.45 * eio(sg(t, T.panSale[0], T.panSale[1]))); manoPan.rotation.set(0, 0.25, 0);
  // ---- el cajón: el de Marta (parte 1 en el local; parte 2 lo trae colgando del antebrazo y lo deja) ----
  cajon.position.copy(CAJON); cajon.rotation.set(0, 0.35, 0);
  if (parte2 && t < T.apoyaQ + 0.1) {
    const a = manoMundo(marta, "I", _a);
    cajon.position.copy(a).add(V3(0.08, -0.36 - 0.25 * eio(sg(t, T.caminaQ[1] - 0.4, T.caminaQ[1])) * (marta.cfg.alto || 1), 0.02));   // (ronda 4) el cajón no sube con la bandeja cajon.rotation.set(0, marta.raiz.rotation.y, 0.05);
    if (t >= T.apoyaQ - 0.15) { const u = eio(sg(t, T.apoyaQ - 0.15, T.apoyaQ + 0.1)); cajon.position.lerp(CAJON2, u); cajon.rotation.set(0, lerp(marta.raiz.rotation.y, 0.35, u), 0); }
  }
  cajon.visible = !(parte2 && !marta.raiz.visible && t < T.apoyaQ);
  if (parte2 && t >= T.apoyaQ + 0.1) { cajon.position.copy(CAJON2); cajon.rotation.set(0, 0.35, 0); }
  // ---- parte 2: el celular en el atril, el mate en la mano, el termo; la bandeja en las manos de Marta ----
  atril.visible = parte2 && !["Q3", "Q3c", "Q4", "Q4b", "Q4c"].includes(plano);
  atril.position.copy(ATRIL); atril.rotation.set(0, Math.PI + 0.45, 0);
  if (parte2) {
    dibujarCelu(t);
    const vib = en(t, T.vibra, T.vibra + 0.45) ? Math.sin((t - T.vibra) * 90) * 0.004 : 0;
    celPiv.position.x = vib;
  }
  const contra = ["Q3", "Q3c", "Q4", "Q4b", "Q4c"].includes(plano);   // (ronda 5) pegados a la cámara del contraplano: bultos negros y cortados
  mateR.visible = parte2 && ruben.raiz.visible; termo.visible = parte2 && !contra;
  termo.position.set(1.32, MY, -1.62); termo.rotation.set(0, 0.6, 0);
  if (parte2) {
    // (ronda 1) la mano agarra el mate por el costado de afuera (los dedos nunca adentro)
    const p = manoMundo(ruben, "I", _a), g = ruben.raiz.rotation.y, izq = V3(Math.cos(g), 0, -Math.sin(g)), fr = V3(Math.sin(g), 0, Math.cos(g));
    mateR.position.copy(p).add(izq.multiplyScalar(-0.08)).add(fr.multiplyScalar(0.01)).add(V3(0, -0.14, 0)); mateR.rotation.set(0, g + 0.6, 0);
    if (en(t, T.sorbo - 0.35, T.sorbo + 1.2)) {
      const ks = eio(sg(t, T.sorbo - 0.35, T.sorbo)) * (1 - eio(sg(t, T.sorbo + 0.85, T.sorbo + 1.2)));
      const m = mateSorbo(g);
      if (ks > 0.98) { mateR.position.copy(m); mateR.rotation.set(0, g - Math.PI / 2, 0); }
      else { mateR.position.lerp(m, ks); mateR.rotation.set(0, lerp(g + 0.6, g - Math.PI / 2, ks), 0); }
    }
  }
  bandeja.visible = parte2;
  if (parte2) {
    const enMostrador = t >= T.apoyaQ;
    const quedan = t >= T.pocillo[0] ? 6 : 7;
    torre2.userData.poner(quedan, en(t, T.tiembla, T.tiembla + 0.5) ? Math.sin((t - T.tiembla) * 26) * 0.04 * (1 - sg(t, T.tiembla, T.tiembla + 0.5)) : Math.sin(t * 5) * 0.006);
    if (enMostrador) { bandeja.position.copy(BANDEJA_M); bandeja.rotation.set(0, 0.3, 0); }
    else if (t >= T.caminaQ[1]) { const u = eio(sg(t, T.apoyaQ - 0.3, T.apoyaQ)); const v = eio(sg(t, T.caminaQ[1], T.caminaQ[1] + 0.2)); const a = manoMundo(marta, "I", _a), b = manoMundo(marta, "D", _b); const desde = a.clone().add(b).multiplyScalar(0.5).add(V3(0, -0.035, 0)); bandeja.position.copy(desde.lerp(BANDEJA_M.clone().add(V3(0, 0.09 * (1 - u), 0)), Math.max(v, u))); bandeja.rotation.set(0, lerp(marta.raiz.rotation.y, 0.3, v), 0); }   // (ronda 2) al llegar la pone arriba de su lugar y la baja vertical   // (ronda 2) baja vertical, por fuera de la cara
    else { const a = manoMundo(marta, "I", _a), b = manoMundo(marta, "D", _b); bandeja.position.copy(a.clone().add(b).multiplyScalar(0.5)).add(V3(0, -0.035, 0)); bandeja.rotation.set(0, marta.raiz.rotation.y, 0); }
  }
  pocRuben.visible = parte2 && t >= T.pocillo[0];
  if (pocRuben.visible) {
    if (t < T.pocillo[1]) { const p = manoMundo(ruben, "D", _a); pocRuben.position.copy(p).add(V3(0, -0.07, -0.085)); }   // (ronda 5) agarrado por delante (la mano del lado de la cámara)
    else pocRuben.position.copy(CUP_R);   // apoyado a la vista, junto a él
    pocRuben.rotation.set(0, 0.4, 0);
  }
  // la yerba: pop y el tilde verde
  {
    const k = parte2 ? bk(sg(t, T.yerba, T.yerba + 0.25)) : 0;
    YERBA_P.scale.setScalar(1.15 * (1 + 0.18 * Math.sin(Math.PI * sg(t, T.yerba, T.yerba + 0.3))));
    tilde.visible = k > 0.02 && t < T.q3; tilde.scale.setScalar(Math.max(0.01, k));
  }
  banco.visible = true;
  lampara.visible = !["Q3", "Q3c", "Q4", "Q4b", "Q4c", "Q5"].includes(plano);   // (ronda 2) quedaba pegada a la cámara del contraplano
  // ---- los insertos armados aparte ----
  if (plano === "P4b" || plano === "P6b") {
    // la calculadora desde arriba (del lado de Rubén): llena el cuadro
    calcu.updateMatrixWorld(true);
    const c = calcu.localToWorld(V3(0, 0.08, 0.0));
    if (plano === "P6b") c.lerp(calcu.userData.tecla("C"), 0.45);   // (ronda 1) la C entera en cuadro
    const zoom = plano === "P4b" ? lerp(0.66, 0.6, sg(t, T.p4b, T.p5)) : lerp(0.62, 0.58, sg(t, T.p6b, T.p6c));
    camera.position.copy(c).add(V3(0.0, zoom, 0.2)); camera.up.set(0, 0, 1); camera.fov = 40; camera.updateProjectionMatrix(); camera.lookAt(c);
    ruben.raiz.visible = true; ruben.cabeza.visible = false;
  } else ruben.cabeza.visible = ruben.raiz.visible;
  if (plano === "Q2") {
    // vibra el celular y push-in rápido hasta el inserto
    celu.updateMatrixWorld(true);
    const c = celu.localToWorld(V3(0, 0, 0)), n = V3(0, 0, 1).transformDirection(celu.matrixWorld);
    const u = eio(sg(t, T.q2, T.q2 + 0.35));
    camera.position.copy(c).add(n.multiplyScalar(lerp(0.56, 0.42, u) - 0.015 * sg(t, T.q2 + 0.35, T.q2b))); camera.up.set(0, 1, 0); camera.fov = 40; camera.updateProjectionMatrix(); camera.lookAt(c);
  }

  // ---- globos ----
  {
    const ent = (ti) => (t < ti ? 0 : 0.7 + 0.3 * bk(sg(t, ti, ti + 0.2)));
    const sale = (tf) => 1 - eio(sg(t, tf - 0.12, tf));
    for (const k in GL) GL[k].visible = false;
    const rb = () => bocaPx(ruben), mb = () => bocaPx(marta);
    if (plano === "P2" && t >= T.r1) { const [bx, by] = rb(); ponerGlobo(GL.r1, bx + 120, Math.max(300, by - 520), ent(T.r1) * sale(T.abre + 0.1), [bx + 20, by - 30]); }
    if (plano === "P6" && t >= T.m2) { const [bx, by] = mb(); ponerGlobo(GL.m2, bx + 200, Math.max(330, by - 560), ent(T.m2), [bx + 150, by - 190]); }   // (ronda 5) la cola no toca el pelo }
    // (ronda 1) fija arriba, sigue a Marta en x y se va con ella
    if (plano === "P6c" && t >= T.m3) { const [bx, by] = mb(); ponerGlobo(GL.m3, bx + 120, 330, ent(T.m3) * sale(Math.min(T.saleM[1] - 0.15, P1 - 0.12)), [bx, by - 40]); }
    if (plano === "P4" && t >= T.buenDia) ponerGlobo(GL.buen, 500, 560, ent(T.buenDia) * sale(T.p4b), [300, 1500]);   // desde afuera (el panadero)
    if (plano === "Q1" && t >= T.m1b) { const [bx, by] = mb(); ponerGlobo(GL.m1b, 540, 300, ent(T.m1b) * sale(T.q2), [bx, by - 40]); }
    // "Ocho por ciento…" en off sobre el celular (abajo) y en Q2b arriba; "Lo que más salió…" arriba en Q2b y Q2c
    if (plano === "Q2" && t >= T.r3) ponerGlobo(GL.r3a, 540, 1720, ent(T.r3), [540, 2400]);
    if (plano === "Q2b" && t < T.r3 + 1.52) { const [bx, by] = rb(); ponerGlobo(GL.r3a, 540, 300, 1, [bx, by - 30]); }
    if ((plano === "Q2b" || plano === "Q2c") && t >= T.r3 + 1.52) { const [bx, by] = rb(); ponerGlobo(GL.r3b, 540, 300, ent(T.r3 + 1.52), plano === "Q2b" ? [bx, by - 30] : [340, 1200]); }
    if (plano === "Q3b" && t >= T.r4) { const [bx, by] = rb(); ponerGlobo(GL.r4, bx + 80, Math.max(300, by - 520), ent(T.r4), [bx, by - 30]); }
    if (plano === "Q4" && t >= T.m4) { const [bx, by] = mb(); ponerGlobo(GL.m4, bx + 60, Math.max(300, by - 540), ent(T.m4), [bx, by - 40]); }
  }
  if (en(tIn, P1, P2) || LIMPIO) for (const k in GL) GL[k].visible = false;
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
