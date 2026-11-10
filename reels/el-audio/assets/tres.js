// Capa 3D de el-audio (Three.js r170 local). Base técnica: reels/me-lo-guardas (set del almacén, globos y contador en
// píxeles de pantalla pegados a la cámara, poses por claves, bocas por envolvente).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo set: el almacén de Rubén con PARED CREMA y la vidriera y la puerta en la pared izquierda (la luz entra por
// ahí y cambia: mañana → atardecer → noche → mañana de golpe). Aparte, el rincón de la casa de Graciela (P2).
//   PARTE 1: el audio de 4:12; el mate deja de humear, la luz cae, 2x, "¿A cuánto está la polenta? Beso.", la luz
//            vuelve (10:19); "Noventa." (0:01); "Graciela está grabando un audio…" → 6:47; el segundo termo.
//   PARTE 2: el agente escucha el 4:12 en un segundo y contesta ("Saludos a tu sobrino."); la polenta separada; entra
//            Graciela en persona: "¿Te conté lo de mi sobrino?"; Rubén levanta el segundo termo: "Contame."
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import {
  crearPersonaje, ELENCO, poseEn, CARA, BRAZOS, pegarACamara,
  crearMate, crearTermo, crearCelular, crearYerba, crearGalletitas, crearDulceDeLeche, crearFideos,
  crearPolenta, crearReloj, crearVapor, crearPapelito,
} from "./personajes.js";
import { T, DUR, P1, P2, ENV, LIMPIO } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('500 40px "IBM Plex Mono"')]);

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
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
scene.background = new THREE.Color(0xd6e6f2);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 80);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x8a8f99);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(3, 9, -6, 2, -1, Math.PI / 2, 0xffffff, 2.0);    // la vidriera (a la izquierda)
  tira(1.4, 8, 1, 1, 6, 0, 0xfff2e0, 1.0);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.0);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.45;

// ---------- luces (cambian con la hora del time-lapse: ver ponerLuz) ----------
// el sol entra por la vidriera de la izquierda (manchas duras en el piso); el cielo; un contraluz; la lamparita del
// techo (de noche); el farol de la vereda; un relleno desde la cámara para que las caras se lean siempre
const sol = new THREE.DirectionalLight(0xfffaf0, 3.0);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 2.5;
Object.assign(sol.shadow.camera, { left: -4.2, right: 4.2, top: 4.2, bottom: -4.2, near: 1, far: 18 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xf4f6f8, 0x6a6052, 1.2); scene.add(cielo);
const rim = new THREE.DirectionalLight(0xcfe0ff, 0.6); rim.position.set(3, 4, -5); scene.add(rim);
const lampara = new THREE.PointLight(0xffd9a0, 0, 7, 1.4); lampara.position.set(0.45, 2.75, -1.35); scene.add(lampara);
const farolL = new THREE.PointLight(0xffc97a, 0, 7, 1.3); farolL.position.set(-2.75, 2.45, -1.3); scene.add(farolL);
const relleno = new THREE.DirectionalLight(0xfff6ea, 0.75); scene.add(relleno, relleno.target);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, maderaC: 0xc89a64, mostaza: 0xd9a441 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  pared: mat(0xefeee5, 0.92), techo: mat(0xe2e0d4, 0.95), navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.6), cr3: mat(C.cr3, 0.55), madera: mat(C.madera, 0.55), maderaC: mat(C.maderaC, 0.55), g: mat(C.g, 0.5), red: mat(C.red, 0.55),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const MONO = (s) => `500 ${s}px "IBM Plex Mono", monospace`;
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ================= EL SET: el almacén por dentro =================
// x: izquierda (-) a derecha (+). Pared del fondo z = -3.4 con la estantería (la fila de POLENTA detrás de Rubén) y el
// reloj arriba; pared izquierda x = -2.0 con la vidriera y la puerta; mostrador cruzando en z = -1.3, Rubén atrás.
const LX = -2.0, FZ = 1.4;
const VID = { z0: -2.75, z1: -0.85, y0: 0.72, y1: 2.3 };
const PUERTA = { z0: -0.35, z1: 0.65, alto: 2.3 };
const MOSTRADOR = { x: 0.45, y: 0.9, z: -1.3, w: 2.3, d: 0.62 };
const RI = { x: 0.42, z: -1.85 };
const exterior = [];   // materiales de afuera (se oscurecen de noche)
{
  const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(3.4, 3.3);
  const p = mesh(new THREE.PlaneGeometry(5.0, 4.8), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.5 }), 0.5, 0.0, -0.98); p.rotation.x = -Math.PI / 2; p.castShadow = false; scene.add(p);
  const pared = (w, h, d, x, y, z, sombra = false) => { const m = mesh(new THREE.BoxGeometry(w, h, d), M.pared, x, y, z); m.castShadow = sombra; scene.add(m); return m; };
  pared(5.0, 3.3, 0.1, 0.5, 1.65, -3.4);
  pared(0.1, 3.3, 4.9, 3.0, 1.65, -0.98);
  pared(5.1, 3.3, 0.1, 0.5, 1.65, FZ);
  // pared izquierda con dos huecos (vidriera y puerta): proyecta sombra (la luz entra solo por los huecos)
  const pz = (z0, z1, y0, y1) => pared(0.12, y1 - y0, z1 - z0, LX, (y0 + y1) / 2, (z0 + z1) / 2, true);
  pz(-3.45, VID.z0, 0, 3.3); pz(VID.z0, VID.z1, 0, VID.y0); pz(VID.z0, VID.z1, VID.y1, 3.3);
  pz(VID.z1, PUERTA.z0, 0, 3.3); pz(PUERTA.z0, PUERTA.z1, PUERTA.alto, 3.3); pz(PUERTA.z1, FZ + 0.05, 0, 3.3);
  const techo = mesh(new THREE.BoxGeometry(5.1, 0.1, 4.9), M.techo, 0.5, 3.32, -0.98); techo.castShadow = true; scene.add(techo);
  // zócalo navy
  scene.add(mesh(new THREE.BoxGeometry(4.9, 0.22, 0.03), M.navy, 0.5, 0.11, -3.34));
  scene.add(mesh(new THREE.BoxGeometry(0.03, 0.22, 4.8), M.navy, 2.94, 0.11, -0.98));
  for (const [z0, z1] of [[-3.35, VID.z1 - 0.02], [VID.z1 - 0.02, PUERTA.z0], [PUERTA.z1, FZ]]) scene.add(mesh(new THREE.BoxGeometry(0.03, 0.22, z1 - z0), M.navy, LX + 0.07, 0.11, (z0 + z1) / 2));
  // marcos navy de la vidriera y la puerta
  const marco = (y, z, h, d) => scene.add(mesh(rbox(0.16, h, d, 0.02), M.navy3, LX, y, z));
  const vcz = (VID.z0 + VID.z1) / 2, vw = VID.z1 - VID.z0, vh = VID.y1 - VID.y0;
  marco(VID.y0 + 0.04, vcz, 0.08, vw); marco(VID.y1 - 0.04, vcz, 0.08, vw); marco((VID.y0 + VID.y1) / 2, VID.z0 + 0.04, vh, 0.08); marco((VID.y0 + VID.y1) / 2, VID.z1 - 0.04, vh, 0.08);
  marco((VID.y0 + VID.y1) / 2, vcz, vh, 0.05);
  marco(PUERTA.alto + 0.03, (PUERTA.z0 + PUERTA.z1) / 2, 0.08, PUERTA.z1 - PUERTA.z0 + 0.14);
  // estantería del fondo: tablas de madera clara, mercadería de colores planos, la fila de POLENTA detrás de Rubén
  semilla = 7;
  const colores = [C.cr, C.red, C.mostaza, 0xffffff, C.navy3, 0xe8cf9f, 0x8a5a3c, 0x6d86b0, 0xd98a5a];
  const mc = {}; const mm = (c, r) => (mc[c + "|" + r] ??= mat(c, r));
  const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  const X0 = -1.85, X1 = 2.75, XC = (X0 + X1) / 2, XW = X1 - X0;
  const POL = { y: 1.74, x0: -0.45, x1: 1.45 };
  for (const y of [0.62, 1.18, 1.74, 2.3]) {
    scene.add(mesh(rbox(XW, 0.05, 0.42, 0.015), M.maderaC, XC, y, -3.12));
    scene.add(mesh(rbox(XW, 0.06, 0.03, 0.01), M.navy3, XC, y - 0.005, -2.9));
    if (y > 2.2) continue;
    for (let x = X0 + 0.14; x < X1 - 0.1; x += 0.17 + az() * 0.07) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (y === POL.y && x > POL.x0 - 0.05 && x < POL.x1 + 0.05) continue;
      if (k < 0.4) { const h = 0.22 + az() * 0.16; scene.add(mesh(rbox(0.13, h, 0.16, 0.012), mm(c, 0.6), x, y + 0.025 + h / 2, -3.05)); }
      else if (k < 0.62) { scene.add(mesh(cuerpoFrasco, mm(c, 0.35), x, y + 0.125, -3.05)); scene.add(mesh(tapa, M.cr, x, y + 0.245, -3.05)); }
      else if (k < 0.8) { scene.add(mesh(botella, mm(c, 0.3), x, y + 0.175, -3.05)); scene.add(mesh(pico, mm(C.cr3, 0.4), x, y + 0.37, -3.05)); }
      else if (k < 0.9) { const yb = crearYerba(); yb.position.set(x, y + 0.025, -3.05); yb.scale.setScalar(0.85); scene.add(yb); x += 0.02; }
      else { const ga = crearGalletitas(); ga.position.set(x + 0.06, y + 0.025, -3.05); ga.scale.setScalar(0.8); ga.rotation.y = 0.1; scene.add(ga); x += 0.12; }
    }
  }
  // la fila de polenta (bien a la vista detrás de la cabeza de Rubén), con su precio
  for (let x = POL.x0; x <= POL.x1 + 0.001; x += 0.145) { const pl = crearPolenta(); pl.position.set(x, POL.y + 0.025, -3.02); pl.rotation.y = (az() - 0.5) * 0.08; scene.add(pl); }
  const et = lienzo(512, 200, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 96); x.fillText("$ 90", w / 2, h / 2 + 6);
  });
  const etq = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.078), new THREE.MeshStandardMaterial({ map: et, roughness: 0.6, emissive: 0xffffff, emissiveMap: et, emissiveIntensity: 0.15 }));
  etq.position.set(1.3, POL.y - 0.004, -2.884); scene.add(etq);
  for (let i = 0, x = X0 + 0.15; x < 0.6; i++, x += 0.2) { const o = i % 3 === 1 ? crearDulceDeLeche() : crearFideos(); o.position.set(x, 2.325, -3.05); scene.add(o); }
  for (const x of [X0, 0.62, X1]) scene.add(mesh(rbox(0.06, 2.4, 0.44, 0.015), M.navy3, x, 1.2, -3.12));
  // mostrador
  const MX = MOSTRADOR;
  scene.add(mesh(rbox(MX.w, 0.86, MX.d, 0.03), M.navy3, MX.x, 0.43, MX.z));
  scene.add(mesh(rbox(MX.w + 0.12, 0.06, MX.d + 0.1, 0.02), M.madera, MX.x, MX.y - 0.03, MX.z));
  scene.add(mesh(rbox(MX.w - 0.2, 0.06, 0.02, 0.01), M.g, MX.x, 0.3, MX.z + MX.d / 2 + 0.005));
  for (let i = 0; i < 4; i++) {
    const px = MX.x - MX.w / 2 + 0.3 + i * ((MX.w - 0.6) / 3);
    scene.add(mesh(rbox(0.46, 0.4, 0.02, 0.02), mat(0x2c4268, 0.6), px, 0.6, MX.z + MX.d / 2 + 0.01));
    scene.add(mesh(rbox(0.38, 0.32, 0.024, 0.02), M.navy3, px, 0.6, MX.z + MX.d / 2 + 0.014));
  }
  scene.add(mesh(rbox(MX.w, 0.035, 0.03, 0.01), M.cr2, MX.x, 0.84, MX.z + MX.d / 2 + 0.01));
  const frasco = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 18), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.35, roughness: 0.05 }));
  frasco.position.set(MX.x - 0.98, MX.y + 0.13, MX.z - 0.08); scene.add(frasco);
  scene.add(mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.04, 18), M.cr, MX.x - 0.98, MX.y + 0.28, MX.z - 0.08));
  for (let i = 0; i < 9; i++) scene.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.mostaza, C.cr][i % 3], 0.3), MX.x - 0.98 + Math.sin(i * 2.4) * 0.06, MX.y + 0.04 + Math.floor(i / 3) * 0.05, MX.z - 0.08 + Math.cos(i * 2.4) * 0.06));
  // la lamparita del techo (pantalla crema)
  scene.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.4, 6), M.navy, 0.45, 3.08, -1.35));
}
const foco = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 10), new THREE.MeshBasicMaterial({ color: 0xbfb8a6 }));
foco.position.set(0.45, 2.8, -1.35); scene.add(foco);
scene.add(mesh(new THREE.ConeGeometry(0.22, 0.16, 20, 1, true), mat(C.navy3, 0.5, { side: THREE.DoubleSide }), 0.45, 2.86, -1.35));
// el reloj de pared, arriba de la estantería (marca la hora del chiste)
const reloj = crearReloj(0.26); reloj.position.set(LX + 0.08, 2.78, -1.8); reloj.rotation.y = Math.PI / 2; scene.add(reloj);   // en la pared de la vidriera: el time-lapse tiene fuente
// la puerta vidriada (hoja con bisagra del lado del fondo) y los vidrios
const hoja = new THREE.Group();
{
  const vidrioM = new THREE.MeshPhysicalMaterial({ color: 0xdcecff, roughness: 0.05, transparent: true, opacity: 0.1, depthWrite: false });
  const vv = new THREE.Mesh(new THREE.PlaneGeometry(VID.z1 - VID.z0 - 0.1, VID.y1 - VID.y0 - 0.1), vidrioM);
  vv.position.set(LX, (VID.y0 + VID.y1) / 2, (VID.z0 + VID.z1) / 2); vv.rotation.y = Math.PI / 2; vv.renderOrder = 5; scene.add(vv);
  hoja.position.set(LX + 0.02, 0, PUERTA.z0); scene.add(hoja);
  const W = PUERTA.z1 - PUERTA.z0;
  const hb = (z, y, d, h) => hoja.add(mesh(rbox(0.06, h, d, 0.015), M.navy3, 0, y, z));
  hb(0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W - 0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W / 2, PUERTA.alto - 0.04, W, 0.08); hb(W / 2, 0.09, W, 0.18);
  const vp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.12, PUERTA.alto - 0.26), vidrioM); vp.position.set(0, PUERTA.alto / 2 + 0.06, W / 2); vp.rotation.y = Math.PI / 2; vp.renderOrder = 5; hoja.add(vp);
  hoja.add(mesh(rbox(0.05, 0.3, 0.04, 0.015), mat(0xc9ccd2, 0.25, { metalness: 0.6 }), 0.06, 1.12, W - 0.075));
  const tx = lienzo(1024, 420, (x, w, h) => {
    x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#0b1220"; x.lineWidth = 18; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 40); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 168); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ABIERTO", w / 2, h / 2 + 12);
  });
  const gm = mat(C.g, 0.5);
  const cartelM = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.5, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.12 });
  const cartel = mesh(new THREE.BoxGeometry(0.5, 0.205, 0.02), [gm, gm, gm, gm, cartelM, gm], 0.05, 1.62, W / 2); cartel.rotation.y = Math.PI / 2; hoja.add(cartel);
  // la campanita arriba de la puerta
  scene.add(mesh(new THREE.ConeGeometry(0.05, 0.08, 14, 1, true), mat(0xd9b04a, 0.3, { metalness: 0.6, side: THREE.DoubleSide }), LX + 0.12, PUERTA.alto - 0.1, PUERTA.z0 + 0.2));
}
// afuera: la vereda, la calle, las casas de enfrente y el farol (se prende de noche)
const farolFoco = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), new THREE.MeshBasicMaterial({ color: 0x9a9486 }));
{
  const afuera = new THREE.Group(); scene.add(afuera);
  const baldosa = lienzo(512, 512, (x) => {
    x.fillStyle = "#c9c4b4"; x.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#d4cfbf" : "#c4bfae"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122); }
  });
  baldosa.wrapS = baldosa.wrapT = THREE.RepeatWrapping; baldosa.repeat.set(2, 10);
  const mv = new THREE.MeshStandardMaterial({ map: baldosa, roughness: 0.9 }); exterior.push([mv, 0xffffff]);
  const v = mesh(new THREE.PlaneGeometry(3, 14), mv, LX - 1.5, 0.0, -1); v.rotation.x = -Math.PI / 2; v.castShadow = false; afuera.add(v);
  const mcord = mat(C.cr3, 0.6); exterior.push([mcord, C.cr3]);
  afuera.add(mesh(rbox(0.22, 0.16, 14, 0.03), mcord, LX - 3.0, -0.07, -1));
  const mcal = mat(0x6f7380, 0.9); exterior.push([mcal, 0x6f7380]);
  const calle = mesh(new THREE.PlaneGeometry(8, 40), mcal, LX - 7, -0.15, -1); calle.rotation.x = -Math.PI / 2; calle.castShadow = false; afuera.add(calle);
  const mcasa = mat(0xe8d9bd, 0.9); exterior.push([mcasa, 0xe8d9bd]);
  const casa = mesh(new THREE.BoxGeometry(0.3, 6, 16), mcasa, LX - 11.5, 3, -1); casa.castShadow = false; afuera.add(casa);
  const mven = mat(C.navy3, 0.6); exterior.push([mven, C.navy3]);
  for (let i = -4; i <= 4; i++) { afuera.add(mesh(rbox(0.1, 1.3, 1.0, 0.02), mven, LX - 11.3, 1.9, i * 1.8 - 1)); }
  const arbol = new THREE.Group(); arbol.position.set(LX - 2.4, 0, -3.2); afuera.add(arbol);
  const mtr = mat(0x6e4a2e, 0.8), mho = mat(0x5f8f3a, 0.8, { flatShading: true }); exterior.push([mtr, 0x6e4a2e], [mho, 0x5f8f3a]);
  arbol.add(mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.6, 8), mtr, 0, 1.3, 0));
  for (const [x, y, z, r] of [[0, 3.0, 0, 0.9], [0.5, 2.7, 0.2, 0.6], [-0.5, 2.8, -0.1, 0.65], [0.1, 3.5, 0.1, 0.6]]) arbol.add(mesh(new THREE.IcosahedronGeometry(r, 0), mho, x, y, z));
  // el farol: poste navy, brazo, pantalla y foco
  const fp = new THREE.Group(); fp.position.set(LX - 0.95, 0, -1.3); afuera.add(fp);
  fp.add(mesh(new THREE.CylinderGeometry(0.04, 0.055, 2.7, 10), M.navy3, 0, 1.35, 0));
  fp.add(mesh(rbox(0.5, 0.05, 0.05, 0.02), M.navy3, 0.2, 2.68, 0));
  fp.add(mesh(new THREE.ConeGeometry(0.16, 0.14, 16, 1, true), mat(C.navy3, 0.5, { side: THREE.DoubleSide }), 0.42, 2.62, 0));
  farolFoco.position.set(0.42, 2.53, 0); fp.add(farolFoco);
}

// ================= LA CASA DE GRACIELA (P2), lejos del almacén =================
const CASA = V3(30, 0, 0);
{
  const casa = new THREE.Group(); casa.position.copy(CASA); scene.add(casa);
  const piso = lienzo(512, 512, (x) => { x.fillStyle = "#b98a5c"; x.fillRect(0, 0, 512, 512); x.fillStyle = "#a87a4f"; for (let i = 0; i < 8; i++) x.fillRect(0, i * 64 + 60, 512, 4); });
  piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(2, 2);
  const pp = mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshStandardMaterial({ map: piso, roughness: 0.7 }), 0, 0, 0); pp.rotation.x = -Math.PI / 2; pp.castShadow = false; casa.add(pp);
  const paredC = mat(0xe6e1d3, 0.92);
  const pw = mesh(new THREE.BoxGeometry(6, 3.2, 0.1), paredC, 0, 1.6, -1.6); pw.castShadow = false; casa.add(pw);
  casa.add(mesh(new THREE.BoxGeometry(6, 0.2, 0.03), M.navy3, 0, 0.1, -1.54));
  // la ventana con luz de mañana (a la izquierda de cuadro)
  const ven = new THREE.Group(); ven.position.set(-0.95, 1.55, -1.54); casa.add(ven);
  ven.add(mesh(new THREE.PlaneGeometry(0.9, 1.1), new THREE.MeshBasicMaterial({ color: 0xd6e6f2 }), 0, 0, 0.001));
  for (const [w, h, x, y] of [[1.02, 0.07, 0, 0.55], [1.02, 0.07, 0, -0.55], [0.07, 1.16, 0.48, 0], [0.07, 1.16, -0.48, 0], [0.05, 1.1, 0, 0], [0.9, 0.05, 0, 0.1]]) ven.add(mesh(rbox(w, h, 0.05, 0.01), M.cr, x, y, 0.02));
  ven.add(mesh(rbox(1.15, 0.05, 0.14, 0.01), M.cr, 0, -0.6, 0.06));
  // cortina lila apagado
  const cort = mat(0xb7a9c9, 0.9);
  for (const s of [-1, 1]) { const c = mesh(rbox(0.22, 1.35, 0.04, 0.02), cort, s * 0.6, 0.02, 0.05); ven.add(c); }
  // el cuadrito (un paisaje plano de colores de marca) y la planta en maceta
  const cuadro = lienzo(256, 200, (x, w, h) => { x.fillStyle = "#d6e6f2"; x.fillRect(0, 0, w, h); x.fillStyle = "#5f8f3a"; x.beginPath(); x.moveTo(0, h); x.lineTo(80, 90); x.lineTo(150, 140); x.lineTo(210, 70); x.lineTo(w, 120); x.lineTo(w, h); x.fill(); x.fillStyle = "#d9a441"; x.beginPath(); x.arc(190, 50, 22, 0, 7); x.fill(); });
  const cu = new THREE.Group(); cu.position.set(0.55, 1.95, -1.53); casa.add(cu);
  cu.add(mesh(rbox(0.5, 0.42, 0.04, 0.01), M.madera, 0, 0, 0));
  cu.add(mesh(new THREE.PlaneGeometry(0.42, 0.34), new THREE.MeshStandardMaterial({ map: cuadro, roughness: 0.7 }), 0, 0, 0.022));
  const pl = new THREE.Group(); pl.position.set(1.15, 0, -1.2); casa.add(pl);
  pl.add(mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.32, 16), mat(C.red, 0.6), 0, 0.16, 0));
  const hojaM = mat(0x4f7a2a, 0.7, { flatShading: true });
  for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; const h = mesh(new THREE.SphereGeometry(0.16, 8, 6), hojaM, Math.sin(a) * 0.12, 0.48 + (i % 3) * 0.12, Math.cos(a) * 0.08); h.scale.set(0.7, 1.4, 0.5); h.rotation.z = Math.sin(a) * 0.5; pl.add(h); }
  // una mesita con un mantel crema
  const me = new THREE.Group(); me.position.set(-1.25, 0, -0.9); casa.add(me);
  me.add(mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.04, 24), M.cr, 0, 0.72, 0));
  me.add(mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.7, 10), M.madera, 0, 0.36, 0));
}

// ================= LOS PERSONAJES =================
const G0 = { x: -0.45, z: -0.62 };     // Graciela frente al mostrador (parte 2)
const ruben = crearPersonaje({ ...ELENCO.almacenero, dedos: false, mechones: true, parpadeoCada: 3.6 });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 3.3 });
scene.add(ruben.raiz, graciela.raiz);
for (const p of [ruben, graciela]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
{ const CCg = 0.3 * 0.92; graciela.cabeza.traverse((l) => { if (!l.isMesh) return; const esL = (l.material.color && l.material.color.getHex() === 0x16243d) || (l.material.isMeshBasicMaterial && l.geometry.type === "CircleGeometry"); if (!esL) return; l.position.y -= CCg; l.position.multiplyScalar(1.04 / 1.13); l.position.y += CCg; if (Math.abs(l.scale.y - 0.26) < 1e-6) l.visible = false; if (Math.abs(l.scale.y - 0.07) < 1e-6 && Math.abs(l.scale.x - 0.011) < 1e-6) { l.position.x = -0.035; } }); }

// ================= UTILERÍA =================
const mateR = crearMate(); mateR.scale.setScalar(1.25); scene.add(mateR);
const vapor = crearVapor(10); vapor.scale.setScalar(1.25); scene.add(vapor);
const termo1 = crearTermo(); termo1.scale.setScalar(1.3); scene.add(termo1);
const termo2 = crearTermo(C.navy3, C.g); termo2.scale.setScalar(1.3); scene.add(termo2);
// el asa en C del termo genérico quedaba a 4 mm del cilindro (flotaba): se pega al cuerpo
for (const tm of [termo1, termo2]) tm.traverse((o) => { if (o.isMesh && o.geometry.type === "TorusGeometry") o.position.x = -0.052; });
const TERMO1 = V3(RI.x - 0.5, MOSTRADOR.y, -1.5);
const TERMO2 = V3(RI.x + 0.4, MOSTRADOR.y, -1.78);
const chorro = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 1, 8), new THREE.MeshStandardMaterial({ color: 0xdfeeff, roughness: 0.1, transparent: true, opacity: 0.75 }));
scene.add(chorro);
// la etiquetita "Graciela ✓" que se pega al paquete de polenta (Q2)
const etiG = crearPapelito(["Graciela"], { W: 0.3, H: 0.11, fuente: "Lexend", color: "#0b1220", fondo: "#5ce611", tilde: true });
etiG.position.set(-0.45 + 0.145 * 1, 1.74 + 0.025 + 0.1, -2.97); scene.add(etiG);

// ================= EL CELULAR DE RUBÉN =================
// una pantalla (canvas 600 x 975): el chat genérico con Graciela (navy, crema, verde; sin logo de ninguna app)
const CW = 600, CH = 975;
const pantR = lienzo(CW, CH, () => {});
const PH_S = 3.5;
const celuR = crearCelular(pantR, C.navy3, 0.085, 0.138); celuR.scale.setScalar(PH_S);
const atril = new THREE.Group(); atril.add(celuR); scene.add(atril);
const ATRIL = V3(RI.x + 0.3, MOSTRADOR.y, -1.26);
const INCL = 0.42;   // cuánto se levanta la pantalla hacia el cliente (desde acostado)
{
  const am = mat(C.navy, 0.5);
  // una cuña de madera oscura que sostiene el celular inclinado
  const cu = mesh(new THREE.BoxGeometry(0.18, 0.05, 0.12), am, 0, 0.025, -0.1); cu.rotation.x = 0.35; atril.add(cu);
}
celuR.rotation.x = -Math.PI / 2 + INCL;
celuR.position.set(0, 0.006 + Math.sin(INCL) * 0.138 * PH_S / 2, -Math.cos(INCL) * 0.0);
atril.position.copy(ATRIL);
// el mismo celular en la mano de Rubén (P5: graba el audio)
const celuMano = crearCelular(pantR, C.navy3, 0.085, 0.138); celuMano.scale.setScalar(2.1); scene.add(celuMano);
// el de Graciela (funda crema), en su casa (P2)
// la pantalla del celular de Graciela (P2): grabando, con el tiempo que corre (va por el minuto 3: el audio es largo)
const pantG = lienzo(400, 650, () => {});
let claveG = "";
function dibujarPantG(t) {
  const seg = Math.floor(posAudio(t)), txt = `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")}`;
  const fase = Math.floor(t * 6) % 4;
  if (claveG === txt + fase) return; claveG = txt + fase;
  const { x } = pantG.userData, w = 400, h = 650;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  x.fillStyle = fase % 2 ? "#c7655b" : "#e4a39b"; x.beginPath(); x.arc(w / 2, 170, 70, 0, 7); x.fill();
  x.fillStyle = "#efeee5"; x.font = F(900, 110); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(txt, w / 2, 340);
  for (let i = 0; i < 12; i++) { const hh = 30 + 70 * Math.abs(Math.sin(i * 1.7 + fase)); x.fillStyle = "#5ce611"; rr(x, 50 + i * 26, 520 - hh / 2, 16, hh, 8); }
  pantG.needsUpdate = true;
}
const celuG = crearCelular(pantG, C.cr, 0.085, 0.138); celuG.scale.setScalar(1.5); scene.add(celuG);

function barraEstado(x, w) {
  x.fillStyle = "#efeee5";
  rr(x, w - 110, 26, 60, 26, 6); x.fillRect(w - 48, 33, 6, 12);
  for (let i = 0; i < 4; i++) x.fillRect(40 + i * 16, 50 - i * 7, 10, 8 + i * 7);
}
// la onda del audio: alturas fijas (deterministas)
const ONDA = Array.from({ length: 60 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * 0.6 + Math.sin(i * 0.53 + 1) * 0.4));
// la posición del audio de 4:12 en segundos en t (parte 1) — lo que marca el contador y la bolita
function posAudio(t) {
  if (t < T.g1) return 0;
  if (t < T.p3a) return t - T.g1;
  if (t < T.tap2x) return 62 + (t - T.p3a);
  if (t < T.rodillo[0]) return 64 + (t - T.tap2x) * 2;
  if (t < T.rodillo[1]) return lerp(65, 134, sg(t, T.rodillo[0], T.rodillo[1]));
  if (t < T.k409) return 134 + (t - T.rodillo[1]) * 2;
  if (t < T.k412) return 249 + Math.min(2, Math.floor((t - T.k409) / (T.k410 - T.k409)));
  return 252;
}
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
// burbuja de audio: [x, y] arriba a la izquierda, lado "cli" (crema, a la izquierda) o "yo" (navy claro, a la derecha)
function burbujaAudio(x, y0, { lado = "cli", dur = "4:12", prog = 0, barras = 30, dosx = false, apagado = false, sale = false, play = false, u = 1 }) {
  const H = 190, W = lado === "cli" ? 556 : 360, X = lado === "cli" ? 20 : CW - 20 - W;
  x.save();
  const s = 0.6 + 0.4 * eo(u);
  x.globalAlpha = Math.min(1, u * 2);
  const ox = lado === "cli" ? X : X + W, oy = y0 + H;
  x.translate(ox, oy); x.scale(s, s); x.translate(-ox, -oy);
  x.fillStyle = lado === "cli" ? "#ffffff" : "#16243d";
  x.strokeStyle = lado === "cli" ? "#16243d" : "#16243d"; x.lineWidth = 6;
  x.beginPath(); x.roundRect(X, y0, W, H, lado === "cli" ? [34, 34, 34, 8] : [34, 34, 8, 34]); x.fill(); x.stroke();
  // play
  const cx = X + 62, cy = y0 + 78;
  x.fillStyle = lado === "cli" ? "#16243d" : "#efeee5"; x.beginPath(); x.arc(cx, cy, 40, 0, 7); x.fill();
  x.fillStyle = lado === "cli" ? "#efeee5" : "#16243d";
  if (play) { x.fillRect(cx - 15, cy - 18, 11, 36); x.fillRect(cx + 4, cy - 18, 11, 36); }
  else { x.beginPath(); x.moveTo(cx - 12, cy - 21); x.lineTo(cx + 20, cy); x.lineTo(cx - 12, cy + 21); x.closePath(); x.fill(); }
  // la onda: barras gruesas
  const x0 = X + 122, paso = 14, ancho = 10;
  const nb = barras;
  for (let i = 0; i < nb; i++) {
    const h = ONDA[i % ONDA.length] * 74 + 8, bx = x0 + i * paso;
    const hecho = i / barras < prog;
    x.fillStyle = lado === "cli" ? (hecho ? "#16243d" : "#a9b0bf") : "#efeee5";
    rr(x, bx, cy - h / 2, ancho, h, 5);
  }
  if (lado === "cli" && !sale) {
    const bxp = x0 + prog * (barras * paso - 4);
    x.fillStyle = apagado ? "#a9b0bf" : "#5ce611"; x.strokeStyle = "#16243d"; x.lineWidth = 5;
    x.beginPath(); x.arc(bxp, cy, 17, 0, 7); x.fill(); x.stroke();
  }
  // la duración, grande, abajo a la derecha (rojo apagado en las del problema)
  x.textAlign = "right"; x.textBaseline = "middle";
  x.fillStyle = lado === "cli" ? (dur === "4:12" || dur === "6:47" ? "#c7655b" : "#16243d") : "#efeee5";
  x.font = F(900, 80); x.fillText(dur, X + W - 26, y0 + 150);
  if (dosx) { x.fillStyle = "#5ce611"; rr(x, X + 26, y0 + 128, 92, 54, 27); x.fillStyle = "#0b1220"; x.font = F(900, 40); x.textAlign = "center"; x.fillText("2x", X + 72, y0 + 157); }
  x.restore();
  return H;
}
function burbujaTexto(x, y, lineas, { lado = "ag", u = 1, auto = false }) {
  const h = 40 + lineas.length * 62 + (auto ? 104 : 0) + 8;
  x.save(); x.globalAlpha = Math.min(1, u * 2);
  const s = 0.6 + 0.4 * eo(u);
  const ox = lado === "ag" ? CW - 20 : 20; x.translate(ox, y + h); x.scale(s, s); x.translate(-ox, -(y + h));
  x.textAlign = "left"; x.textBaseline = "middle";
  if (lado === "ag") {
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(40, y, CW - 60, h, [34, 34, 8, 34]); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(800, 52); lineas.forEach((l, k) => x.fillText(l, 68, y + 52 + k * 62));
    if (auto) { x.fillStyle = "#5ce611"; x.font = MONO(44); const yy = y + 52 + lineas.length * 62; x.fillText("respondido", 68, yy + 6); x.fillText("automáticamente", 68, yy + 54); }
  } else {
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(20, y, CW - 80, h, [34, 34, 34, 8]); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(800, 52); lineas.forEach((l, k) => x.fillText(l, 46, y + 52 + k * 62));
  }
  x.restore();
  return h;
}
function chipVerde(x, y, txt, u = 1) {
  x.save(); x.globalAlpha = Math.min(1, u * 2);
  const s = 0.6 + 0.4 * eo(u); x.translate(CW / 2, y + 36); x.scale(s, s); x.translate(-CW / 2, -(y + 36));
  x.font = F(900, 46); const w = x.measureText(txt).width + 120;
  x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect((CW - w) / 2, y, w, 76, 38); x.fill(); x.stroke();
  x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.lineCap = "round"; x.lineJoin = "round";
  const cx = (CW - w) / 2 + 34; x.beginPath(); x.moveTo(cx, y + 38); x.lineTo(cx + 16, y + 54); x.lineTo(cx + 42, y + 22); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(txt, cx + 60, y + 40);
  x.restore();
  return 96;
}
let claveR = "";
function dibujarCeluR(t) {
  const p2 = t >= P2;
  const u = (a) => Math.round(sg(t, a, a + 0.22) * 6) / 6;
  const pa = posAudio(t);
  const prog = p2 ? (t < T.escucha[0] ? 0 : t < T.escucha[1] ? Math.round(sg(t, T.escucha[0], T.escucha[1]) * 30) / 30 : 1) : Math.min(1, pa / 252);
  const lat = Math.floor(t / 0.3) % 2;
  const ultimo = !p2 ? -9 : [T.escuchado, T.resp1, T.resp2].filter((v) => v <= t).pop() ?? -9;
  const scroll = Math.round(eio(sg(t, ultimo, ultimo + 0.25)) * 10) / 10;
  const fase1 = !p2 ? [t >= T.tap, t >= T.tap2x, t >= T.k412, u(T.b001), t >= T.grabando && t < T.b647 ? lat + 1 : 0, u(T.b647)].join() : "";
  const fase2 = p2 ? [u(T.llega), t >= T.escucha[0], u(T.escuchado), u(T.resp1), u(T.resp2)].join() : "";
  const clave = `${p2}|${fase1}|${fase2}|${Math.round(prog * 60)}|${scroll}`;
  if (clave === claveR) return;
  claveR = clave;
  const { x } = pantR.userData, W = CW, H = CH, TOP = 214, BAR = 110;
  x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, W, H);
  const items = [];   // [alto, dibujar(y)]
  // la charla de antes (otro día) y la pastilla "Hoy": el chat no arranca vacío
  items.push([190, (y) => burbujaTexto(x, y, ["¡Gracias, Rubén!", "Divinos los fideos."], { lado: "cli" }) + 18]);
  items.push([92, (y) => { x.fillStyle = "#cfccbe"; rr(x, W / 2 - 80, y + 10, 160, 64, 32); x.fillStyle = "#16243d"; x.font = F(800, 44); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Hoy", W / 2, y + 43); return 92; }]);
  if (!p2) {
    items.push([204, (y) => burbujaAudio(x, y, { prog, play: t >= T.tap && t < T.k412, dosx: t >= T.tap2x, apagado: t >= T.k412 })]);
    if (t >= T.b001) items.push([204, (y) => burbujaAudio(x, y, { lado: "yo", dur: "0:01", barras: 6, u: u(T.b001) })]);
    if (t >= T.b647) items.push([204, (y) => burbujaAudio(x, y, { dur: "6:47", sale: true, u: u(T.b647) })]);
  } else {
    if (t >= T.llega) items.push([204, (y) => burbujaAudio(x, y, { prog, u: T.llega <= P2 ? 1 : u(T.llega), play: en(t, T.escucha[0], T.escucha[1]) })]);
    if (en(t, T.escucha[0], T.escuchado)) items.push([96, (y) => { x.fillStyle = "#16243d"; x.font = F(800, 46); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Escuchando…", W / 2, y + 40); return 96; }]);
    if (t >= T.escuchado) items.push([96, (y) => chipVerde(x, y, "Audio escuchado", u(T.escuchado))]);
    if (t >= T.resp1) items.push([40 + 4 * 62 + 104 + 8 + 18, (y) => burbujaTexto(x, y, ["¡Hola, Graciela!", "La polenta está", "a $ 90.", "¿Te la separo?"], { u: u(T.resp1), auto: true }) + 18]);
    if (t >= T.resp2) items.push([40 + 2 * 62 + 8 + 18, (y) => burbujaTexto(x, y, ["Saludos a tu", "sobrino."], { u: u(T.resp2) }) + 18]);
  }
  const ind = !p2 && en(t, T.grabando, T.b647) ? 150 : 0;      // "Graciela está grabando un audio…"
  const total = items.reduce((a, b) => a + b[0], 0);
  const libre = H - BAR - TOP - 24 - ind;
  let y = H - BAR - ind - 10 - total;
  const hoy = false;
  if (scroll < 1 && p2 && items.length > 1) { const prev = total - items[items.length - 1][0]; y = lerp(H - BAR - ind - 10 - prev, H - BAR - ind - 10 - total, scroll); }
  x.save(); x.beginPath(); x.rect(0, TOP, W, H - BAR - TOP); x.clip();
  if (hoy) { x.fillStyle = "#cfccbe"; rr(x, W / 2 - 80, TOP + 26, 160, 64, 32); x.fillStyle = "#16243d"; x.font = F(800, 44); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Hoy", W / 2, TOP + 59); }
  for (const [h, f] of items) { f(y); y += h; }
  if (ind) {
    const yi = H - BAR - ind;
    x.fillStyle = "#e9e7dc"; x.fillRect(0, yi, W, ind);
    // el micrófono y el punto rojo apagado que late
    x.fillStyle = "#16243d"; rr(x, 34, yi + 30, 34, 56, 17); x.strokeStyle = "#16243d"; x.lineWidth = 7; x.beginPath(); x.arc(51, yi + 66, 28, 0.1, Math.PI - 0.1); x.stroke(); x.fillRect(48, yi + 94, 7, 20);
    x.fillStyle = lat ? "#c7655b" : "#e4a39b"; x.beginPath(); x.arc(560, yi + 40, 16, 0, 7); x.fill();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 46); x.fillText("Graciela está", 100, yi + 44); x.fillText("grabando un audio…", 100, yi + 102);
  }
  x.restore();
  // la barra de escribir (abajo) y el encabezado navy (arriba), encima de todo
  x.fillStyle = "#e9e7dc"; x.fillRect(0, H - BAR, W, BAR);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#c9c6b8"; x.lineWidth = 4; x.beginPath(); x.roundRect(24, H - BAR + 18, W - 140, 74, 37); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(W - 62, H - BAR + 55, 37, 0, 7); x.fill();
  // el micrófono del botón de grabar
  x.fillStyle = "#efeee5"; rr(x, W - 72, H - BAR + 34, 20, 30, 10); x.strokeStyle = "#efeee5"; x.lineWidth = 4; x.beginPath(); x.arc(W - 62, H - BAR + 56, 15, 0.2, Math.PI - 0.2); x.stroke(); x.fillRect(W - 64, H - BAR + 70, 4, 9);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, TOP - 6); barraEstado(x, W);
  x.fillStyle = "#b7a9c9"; x.beginPath(); x.arc(92, 138, 50, 0, 7); x.fill();
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(92, 138, 42, 0, 7); x.fill();
  x.fillStyle = "#16243d"; x.font = F(900, 52); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("G", 92, 142);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 64); x.fillText("Graciela", 164, 140);
  x.fillStyle = "#5ce611"; x.fillRect(0, TOP - 8, W, 8);
  pantR.needsUpdate = true;
}

// ================= GLOBOS Y FICHAS (pegados a la cámara, en píxeles de pantalla) =================
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cola = true, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const anchoTxt = Math.max(...lineas.map((l) => med.measureText(l).width)) / 2;
  const W = Math.round(anchoTxt + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9);
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
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sombra.position.set(10 / PXK, -12 / PXK, -0.016); g.add(sombra);
  const bord = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); bord.position.z = -0.012; g.add(bord);
  const caja = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja);
  const colaG = new THREE.Group(); g.add(colaG); colaG.visible = cola;
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(76 / PXK, 100 / PXK), sombraM); cs.position.set(10 / PXK, -6 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(76 / PXK, 100 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(52 / PXK, 76 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja.userData.orden = 4;
  g.userData = { W, H, cola: colaG };
  return pegarACamara(g, camera, 40);
}
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0, giro = 0) {
  g.visible = s > 0.003;
  if (!g.visible) return;
  const halfH = Math.tan((camera.fov * D2R) / 2), k = (2 * halfH) / 1920;
  const { W, H, cola } = g.userData;
  cx = cl(cx, W / 2 + 50, 1030 - W / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s);
  g.rotation.z = giro;
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (W / 2), -0.62, 0.62);
  cola.position.set((lado * W) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
  const ang = Math.atan2(ox - (cx + (lado * W) / 2), oy - (cy + H / 2));
  cola.rotation.z = cl(ang, -0.9, 0.9);
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const _cab = new THREE.Vector3();
function cabezaEnPantalla(p, dy = 0.0) { p.cabeza.getWorldPosition(_cab); _cab.y += dy; return enPantalla(_cab); }
const GL = {
  g6: crearGlobo(["¡Rubén! ¿Te conté", "lo de mi sobrino?"], 70),
  resulta: crearGlobo(["Resulta que…"], 54),
  sep: crearGlobo(["Para Graciela ✓"], 60, { fondo: "#5ce611" }),
};
// las fichas de los temas del audio: crema con borde navy, sin cola; la de la polenta en verde (selección)
const FICHA = (txt, t0, t1, pos, o = {}) => ({ g: crearGlobo(txt, o.px ?? 64, { cola: false, ...(o.estilo || {}) }), t0, t1, pos, giro: o.giro ?? 0 });
const FICHAS = [
  FICHA(["¡Hola, Rubén!", "¿Cómo andás?"], 0.45, T.p2, { P1: [270, 1520] }, { giro: -0.03, px: 56 }),
  FICHA(["el sobrino"], T.fSobrino, T.fVecina, { P2: [290, 380], P3a: [300, 1290] }, { giro: 0.04 }),
  FICHA(["el perro"], T.fPerro, T.fNelly, { P2: [790, 380], P3a: [300, 1450] }, { giro: -0.05 }),
  FICHA(["el frío"], T.fFrio, T.p4, { P3a: [300, 1610], P3b: [200, 1330] }, { giro: -0.03, px: 56 }),
  FICHA(["la vecina del 3"], T.fVecina, T.p4, { P3a: [330, 1290], P3b: [280, 1480] }, { giro: 0.04, px: 56 }),
  FICHA(["la Nelly", "(o la Beba)"], T.fNelly, T.p4, { P3b: [250, 1660] }, { giro: -0.04, px: 56 }),
  FICHA(["¿A cuánto está", "la polenta?"], T.fPolenta, T.p5, { P4b: [640, 470] }, { px: 70, estilo: { fondo: "#5ce611" } }),
];

// ================= CONTADOR "Audio: m:ss / 4:12" (pegado a la cámara, arriba) =================
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 6, bevelEnabled: false });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g;
};
const contador = new THREE.Group();
const NX = 0.0;
const rojoM = new THREE.MeshBasicMaterial({ color: 0xe0786d });
// la fuente 3D (lexend800.js) solo trae dígitos: el ":" se arma con dos cubitos redondeados
const geoDig = {};
const digGeo = (d) => (geoDig[d] ??= (() => { const g = textoGeo(d, 0.12, 0.008); g.computeBoundingBox(); return g; })());
const puntoGeo = rbox(0.024, 0.024, 0.016, 0.008, 2);
const gruposNum = {};
function grupoNumero(txt) {
  if (gruposNum[txt]) return gruposNum[txt];
  const g = new THREE.Group();
  const piezas = [];
  for (const ch of txt) {
    if (ch === ":") { const c = new THREE.Group(); for (const y of [0.026, -0.03]) { const m = new THREE.Mesh(puntoGeo, rojoM); m.position.y = y; m.userData.orden = 2; c.add(m); } piezas.push([c, 0.04]); }
    else { const geo = digGeo(ch); const b = geo.boundingBox; const m = new THREE.Mesh(geo, rojoM); m.userData.orden = 2; piezas.push([m, b.max.x - b.min.x + 0.012]); }
  }
  const total = piezas.reduce((a, p) => a + p[1], 0);
  let x = -total / 2;
  for (const [m, w] of piezas) { m.position.x = x + w / 2; x += w; g.add(m); }
  g.traverse((o) => { if (o.isMesh) { o.layers.set(1); o.castShadow = false; } });
  return (gruposNum[txt] = g);
}
const numMesh = new THREE.Group(); numMesh.position.set(NX, 0, 0.05); contador.add(numMesh);
const placaTex = lienzo(1880, 440, () => {});
let clavePlaca = "";
function dibujarPlaca(barra, dosx) {
  const k = `${barra}|${dosx}`; if (k === clavePlaca) return; clavePlaca = k;   // barra: el total ("/ 4:12") o false
  const { x } = placaTex.userData, w = 1880, h = 440;
  x.clearRect(0, 0, w, h);
  x.fillStyle = "#0b1220"; rr(x, 0, 0, w, h, 110);
  x.strokeStyle = "#5ce611"; x.lineWidth = 22; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 90); x.stroke();
  x.fillStyle = "#efeee5"; x.font = F(800, 140); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("Audio:", 90, h / 2 + 8);
  if (barra) { x.textAlign = "right"; x.font = F(800, 120); x.fillText("/ " + barra, w - 90, h / 2 + 8); }
  placaTex.needsUpdate = true;
}
const escuchadoP = new THREE.Group();
{
  const W = 0.94, H = 0.22;
  const nav = mat(C.navy, 0.5);
  const placa = mesh(rbox(W, H, 0.05, 0.06, 4), [nav, nav, nav, nav, new THREE.MeshStandardMaterial({ map: placaTex, roughness: 0.5, emissive: 0xffffff, emissiveMap: placaTex, emissiveIntensity: 0.25 }), nav]);
  placa.userData.orden = 0; contador.add(placa);
  const ts = lienzo(1200, 260, (x, w, h) => {
    x.fillStyle = "#5ce611"; rr(x, 0, 0, w, h, 130); x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.beginPath(); x.roundRect(8, 8, w - 16, h - 16, 122); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 118); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("escuchado", w / 2 + 60, h / 2 + 8);
    x.strokeStyle = "#0b1220"; x.lineWidth = 26; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(110, 132); x.lineTo(155, 177); x.lineTo(235, 87); x.stroke();
  });
  const pill = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.12), new THREE.MeshBasicMaterial({ map: ts, transparent: true })); pill.userData.orden = 4; escuchadoP.add(pill);
  escuchadoP.position.set(0.155, 0, 0.06); contador.add(escuchadoP);
  // el chip "2x" (verde) arriba a la derecha de la placa
  const t2 = lienzo(300, 180, (x, w, h) => { x.fillStyle = "#5ce611"; rr(x, 0, 0, w, h, 90); x.strokeStyle = "#0b1220"; x.lineWidth = 14; x.beginPath(); x.roundRect(7, 7, w - 14, h - 14, 84); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(900, 110); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("2x", w / 2, h / 2 + 6); });
  const c2 = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.09), new THREE.MeshBasicMaterial({ map: t2, transparent: true })); c2.position.set(0.37, -0.15, 0.08); c2.userData.orden = 5; contador.add(c2); contador.userData.dosx = c2;
  pegarACamara(contador, camera, 60);
}
function ponerContador(cx, cy, s) {
  contador.visible = s > 0.003;
  if (!contador.visible) return;
  const halfH = Math.tan((camera.fov * D2R) / 2), k = (2 * halfH) / 1920;
  contador.position.set((cx - 540) * k, (960 - cy) * k, -1);
  contador.scale.setScalar(k * PXK * s);
  contador.traverse((o) => { if (o.isMesh) o.renderOrder = 60 + (o.userData.orden || 0); });
}
// los materiales del contador ya están pegados a la cámara (rojoM se clona en pegarACamara): el número usa uno propio
// con depthTest apagado, igual que el resto del contador
rojoM.depthTest = false; rojoM.transparent = true;
function ponerNumero(txt) {
  if (numMesh.userData.txt === txt) return;
  numMesh.userData.txt = txt;
  numMesh.clear(); numMesh.add(grupoNumero(txt));
}

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov, modo]. Entre planos hay corte seco;
// dentro de un plano, Catmull-Rom continua (modo "e" = tramo con ease propio).
const PH = V3(ATRIL.x, ATRIL.y + 0.1, ATRIL.z - 0.02);   // el centro de la pantalla del celular (aprox.)
// P1, P6, Q1: el celular abajo en primer término, la cara de Rubén arriba
const CEL = (dz = 0) => [ATRIL.x - 0.08, 1.62, 0.22 + dz, RI.x + 0.12, 1.12, -1.55, 46];
// P3b, P4b: más cerca, la pantalla se lee y Rubén atrás
const CEL2 = (dz = 0) => [ATRIL.x - 0.12, 1.62, 0.1 + dz, RI.x + 0.02, 1.17, -1.6, 44];
// P4, Q1b: la pantalla casi de frente
const NRM = V3(0, Math.cos(INCL), Math.sin(INCL));
// un punto de la pantalla a la altura v (0 arriba, 1 abajo del canvas) y la cámara de frente a esa altura
const ABAJO = V3(0, -Math.sin(INCL), Math.cos(INCL));
const PANT = (d, fov = 42, v = 0.62) => { const o = PH.clone().add(ABAJO.clone().multiplyScalar((v - 0.5) * 0.138 * PH_S)); const c = o.clone().add(NRM.clone().multiplyScalar(d)); return [c.x, c.y, c.z, o.x, o.y, o.z, fov]; };
// el general del almacén desde el lado de la clienta: la vidriera a la izquierda, Rubén atrás, el reloj arriba
const GEN = [1.5, 1.65, 0.6, -0.36, 1.6, -1.8, 63];
const ETI = V3(-0.45 + 0.145 * 1, 1.74 + 0.025 + 0.1, -2.97);   // vidriera y reloj a la izquierda, Rubén a la derecha
// primer plano de Rubén de frente (P5, Q4)
const PP = (z, dx = 0.0, fov = 40) => [RI.x + dx, 1.52, z, RI.x - 0.02, 1.36, RI.z, fov];
const PLANOS = [
  ["P1", 0, [[0, ...CEL(0.03)], [T.p2, ...CEL(-0.02)]]],
  // P2 · la casa de Graciela: órbita corta
  ["P2", T.p2, [[T.p2, CASA.x - 0.35, 1.42, 2.5, CASA.x, 1.2, 0, 44], [T.p3a, CASA.x + 0.35, 1.4, 2.4, CASA.x + 0.05, 1.2, 0, 44]]],
  // P3a · el general, dolly lateral lento
  ["P3a", T.p3a, [[T.p3a, ...GEN], [T.p3b, GEN[0] + 0.3, GEN[1], GEN[2] - 0.1, GEN[3] + 0.15, GEN[4], GEN[5], GEN[6]]]],
  ["P3b", T.p3b, [[T.p3b, ...CEL(0.08)], [T.mejilla, ...CEL(0.04)], [T.p4, ATRIL.x - 0.22, 1.66, 0.3, RI.x - 0.05, 1.12, -1.55, 46]]],
  ["P4", T.p4, [[T.p4, ...PANT(0.86, 42, 0.68)], [T.p4b, ...PANT(0.8, 42, 0.7)]]],
  ["P4b", T.p4b, [[T.p4b, ...GEN], [T.p5, GEN[0] - 0.08, GEN[1], GEN[2] - 0.15, GEN[3], GEN[4], GEN[5], GEN[6]]]],
  ["P5", T.p5, [[T.p5, ...PP(0.45)], [T.pushIn[0], ...PP(0.4), "e"], [T.pushIn[1], ...PP(0.05)], [T.p6, ...PP(0.0)]]],
  ["P6", T.p6, [[T.p6, ...PANT(0.72, 44, 0.7)], [T.p6b, ...PANT(0.68, 44, 0.7)]]],
  ["P6b", T.p6b, [[T.p6b, ...CEL(0.0)], [P1, ...CEL(-0.05)]]],
  // ---- parte 2 (los mismos encuadres: el callback se ve) ----
  ["Q1", P2, [[P2, ...CEL(0.03)], [T.q1b, ...CEL(-0.02)]]],
  ["Q1b", T.q1b, [[T.q1b, ...PANT(0.84, 44, 0.6)], [T.q2, ...PANT(0.78, 44, 0.6)]]],
  ["Q2", T.q2, [[T.q2, ...GEN], [T.pushQ2[0], GEN[0] + 0.06, GEN[1], GEN[2] - 0.04, GEN[3], GEN[4], GEN[5], GEN[6]]]],
  // Q2b · corte al paquete de polenta (por delante de Rubén no se puede pasar): push-in corto a la etiqueta
  ["Q2b", T.pushQ2[0], [[T.pushQ2[0], ETI.x + 0.1, ETI.y + 0.03, ETI.z + 0.92, ETI.x + 0.05, ETI.y + 0.0, ETI.z, 46], [T.q3, ETI.x + 0.08, ETI.y + 0.03, ETI.z + 0.82, ETI.x + 0.05, ETI.y + 0.0, ETI.z, 46]]],
  // Q3 · el mismo general, mirando hacia la puerta: entra Graciela
  ["Q3", T.q3, [[T.q3, 1.75, 1.72, 1.25, -1.1, 1.2, -0.6, 58], [T.entraG[1], 1.75, 1.72, 1.25, -0.3, 1.2, -1.3, 62], [T.q4, 1.72, 1.72, 1.22, -0.25, 1.2, -1.35, 62]]],
  ["Q4", T.q4, [[T.q4, ...PP(0.45, 0.06, 46)], [T.q5, ...PP(0.3, 0.06, 46)]]],
  // Q5 · de 3/4, Rubén y Graciela a los dos lados del mostrador, el celular en primer término a la derecha
  ["Q5", T.q5, [[T.q5, 1.8, 1.62, 1.0, -0.2, 1.2, -1.3, 63], [DUR, 1.8, 1.62, 1.02, -0.22, 1.2, -1.3, 63.5]]],
];
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  if (a[8] === "e") { const x = 1 - Math.pow(1 - u, 4); return a.slice(1, 8).map((q, j) => lerp(q, b[j + 1], x)); }
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 && CAM[i - 1][8] !== "e" ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length && b[8] !== "e" ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++;
  planoActual = PLANOS[pi][0];
  const v = catmull(PLANOS[pi][2], t);
  const mano = Math.sin(t * 0.9) * 0.004;
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.003, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= LA LUZ (el time-lapse) =================
// fase: 0 mañana, 1 atardecer, 2 noche. La parte 2 es siempre mañana.
function faseLuz(t) {
  if (t >= T.luz) return 0;
  if (t < T.p3a + 0.05) return 0;
  if (t < T.p3b) return eio(sg(t, T.p3a + 0.05, T.p3b));
  return 1 + eio(sg(t, T.p3b, T.farol + 0.3));
}
const K = (a, b, c, f) => (f <= 1 ? lerp(a, b, f) : lerp(b, c, f - 1));
const KC = (a, b, c, f) => (f <= 1 ? new THREE.Color(a).lerp(new THREE.Color(b), f) : new THREE.Color(b).lerp(new THREE.Color(c), f - 1));
function ponerLuz(t) {
  const f = faseLuz(t);
  // el sol baja y se pone naranja; de noche no hay sol (colores planos, sin degradés)
  const el = K(0.62, 0.22, 0.2, f);
  sol.position.set(0.2 - 7 * Math.cos(el), 7 * Math.sin(el), -1.0);
  sol.target.position.set(0.3, 0, -1.6);
  sol.color.copy(KC(0xfffaf0, 0xff8a3a, 0xff8a3a, f));
  sol.intensity = K(3.0, 3.4, 0.0, f);
  cielo.color.copy(KC(0xf4f6f8, 0xffb36b, 0x4a5f9a, f));
  cielo.groundColor.copy(KC(0x6a6052, 0x7a4a2a, 0x101828, f));
  cielo.intensity = K(1.2, 1.25, 0.75, f);
  scene.environmentIntensity = K(0.45, 0.3, 0.05, f);
  rim.intensity = K(0.6, 0.4, 1.6, f);
  rim.color.copy(KC(0xcfe0ff, 0xffb070, 0x7f9cff, f));
  scene.background.copy(KC(0xd6e6f2, 0xf0964a, 0x0b1220, f));
  const noche = sg(f, 1.3, 1.8);
  lampara.intensity = noche * 1.5;
  foco.material.color.copy(new THREE.Color(0xbfb8a6).lerp(new THREE.Color(0xfff2c8), noche));
  const prendido = t >= T.farol && f > 1.5 ? 1 : 0;
  farolL.intensity = prendido * 9;
  farolFoco.material.color.set(prendido ? 0xffe6a8 : 0x9a9486);
  for (const [m, c0] of exterior) m.color.copy(new THREE.Color(c0).multiply(KC(0xffffff, 0xffb070, 0x2a3450, f)));
  relleno.intensity = K(0.75, 0.6, 1.0, f);
  relleno.color.copy(KC(0xfff6ea, 0xffc690, 0xc8d4ff, f));
}

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const MATE_D = { manoD: [-0.28, 0.33, 0.34], codoD: [-1, -0.6, -0.2], dedoD: 0 };
const MATE_P = { manoD: [-0.36, 0.44, 0.42], codoD: [-1, -0.6, -0.2], dedoD: 0 };
const APOYA_I = { manoI: [0.24, 0.32, 0.42], codoI: null, dedoI: 0 };
const BAJA_I = { manoI: [0.29, 0.02, 0.1], codoI: null, dedoI: 0 };
// ---- Rubén ----
const RK = [
  // P1: mira el celular contento (le escribe Graciela), el mate humeante en la derecha
  [0, { x: RI.x, z: RI.z, giro: 0, inclina: 0.06, ...MATE_D, ...APOYA_I, ...aC(0.12, 0.3), ...CARA.sonrisa, ojos: { x: 0.25, y: -0.8, abiertos: 1, feliz: 0.35 } }],
  [T.tap + 0.35, { ...aC(0.1, 0.22), ojos: { x: 0.2, y: -0.6, abiertos: 1, feliz: 0.3 }, boca: { sonrisa: 0.7 } }, 0.3],
  [T.p2 - 0.2, { ...aC(0.02, 0.08), ojos: { x: 0.05, y: -0.2 }, boca: { sonrisa: 0.5 } }, 0.4],
  // P3a: escucha; sorbe; el mate ya está frío: lo mira (fastidio suave)
  [T.p3a - 0.001, { x: RI.x, z: RI.z, giro: 0.15, inclina: 0.02, ...MATE_P, ...APOYA_I, ...aC(0.15, 0.12), ...CARA.neutra, ojos: { x: 0.3, y: -0.5 }, boca: { sonrisa: 0.1 } }, 0.001],
  [T.sorbo1 + 0.55, { ...aC(0.0, 0.3), ...CARA.fastidio, ojos: { x: -0.3, y: -0.8, abiertos: 0.62, tension: 0.1 }, cejas: { alto: 0.1, ang: 0.3 }, boca: { sonrisa: -0.35 } }, 0.3],
  // P3b: el 2x, cara de resignado; apoya la mejilla en la mano izquierda (codo en el mostrador)
  [T.p3b - 0.001, { x: RI.x, z: RI.z, giro: 0.1, inclina: 0.08, ...MATE_D, ...APOYA_I, ...aC(0.1, 0.32), ...CARA.neutra, ojos: { x: 0.2, y: -0.75, abiertos: 0.85 }, boca: { sonrisa: -0.15 } }, 0.001],
  [T.mejilla + 0.3, { inclina: 0.08, ladea: 0.05, ...aC(0.0, 0.06, 0.22), ...CARA.resignado, ojos: { x: 0.25, y: -0.65, abiertos: 0.6, tension: 0.6 } }, 0.35],
  // P5: levanta la cabeza de la mano y mira a cámara, cara de nada; acerca el celular a la boca; "Noventa."
  [T.p5 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0.08, ladea: 0.05, ...MATE_D, ...aC(0.0, 0.06, 0.22), ...CARA.resignado, ojos: { x: 0.1, y: -0.55, abiertos: 0.6, tension: 0.6 } }, 0.001],
  [T.cabeza[1], { inclina: 0.02, ladea: 0, ...aC(0.0, 0.04, 0.0), ojos: { x: 0, y: 0.04, abiertos: 0.6, tension: 0.35, feliz: 0 }, cejas: { alto: 0.2, ang: 0.55, asim: 0 }, boca: { sonrisa: -0.45, abierta: 0, ancho: 0.95 } }, T.cabeza[1] - T.cabeza[0]],
  [T.voz1 + 1.0, { cejas: { alto: 0.3, ang: 0.65 } }, 0.3],
  // P6: el celular otra vez en el mostrador, cara de nada mirando a cámara; el segundo termo
  [T.p6 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0.03, ladea: 0, ...MATE_D, ...BAJA_I, ...aC(0.0, 0.06, 0.0), ojos: { x: 0, y: -0.15, abiertos: 0.6, tension: 0.35, feliz: 0 }, cejas: { alto: 0.2, ang: 0.55, asim: 0 }, boca: { sonrisa: -0.45, abierta: 0, ancho: 0.95 } }, 0.001],
  [T.b647 + 0.15, { ...aC(0.05, 0.2, 0.0), ojos: { x: 0.15, y: -0.7, abiertos: 0.55 } }, 0.2],
  [T.termo2 + 0.25, { ...aC(0.0, 0.05, 0.0), ojos: { x: 0, y: 0.05, abiertos: 0.6, tension: 0.35 }, cejas: { alto: 0.25, ang: 0.6 } }, 0.3],
  // ---- parte 2 ----
  // Q1/Q1b: ceba tranquilo, ni mira el celular
  [P2 - 0.001, { x: RI.x, z: RI.z, giro: -0.1, inclina: 0.03, ladea: 0, ...MATE_D, ...APOYA_I, ...aC(-0.12, 0.25), ...CARA.sonrisa, ojos: { x: -0.25, y: -0.5, abiertos: 1, feliz: 0.35 }, cejas: { alto: 0.25, ang: 0 }, boca: { sonrisa: 0.75 } }, 0.001],
  [T.q1b + 0.4, { ...MATE_D, ...BAJA_I, ...aC(-0.05, 0.05), ojos: { x: -0.1, y: 0.0 } }, 0.35],
  // Q2: tranquilo, toma mate
  [T.q2 - 0.001, { x: RI.x, z: RI.z, giro: 0.15, inclina: 0.0, ...MATE_P, ...BAJA_I, ...aC(0.15, 0.05), ...CARA.sonrisa, ojos: { x: 0.3, abiertos: 1, feliz: 0.3 } }, 0.001],
  // Q3: mira a Graciela que entra (hacia la puerta, a su derecha)
  [T.q3 - 0.001, { x: RI.x, z: RI.z, giro: -0.35, ...MATE_P, ...BAJA_I, ...aC(-0.4, 0.0), ...CARA.sonrisa, ojos: { x: -0.5, abiertos: 1, feliz: 0.3 } }, 0.001],
  [T.entraG[1], { giro: -0.2, ...aC(-0.25, 0.02) }, 0.4],
  // Q4: de frente: la escucha, se le arma media sonrisa, levanta el segundo termo; "Contame."
  [T.q4 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0.0, ...MATE_P, ...BAJA_I, ...aC(-0.1, 0.03), ...CARA.neutra, ojos: { x: -0.15, y: 0.03, abiertos: 0.9 }, cejas: { alto: 0.3, ang: 0.2 }, boca: { sonrisa: 0.15 } }, 0.001],
  [T.levTermo[0], { ...aC(0.0, 0.02), ...CARA.sonrisa, ojos: { x: 0, y: 0.03, abiertos: 0.95, feliz: 0.3 }, boca: { sonrisa: 0.55, ancho: 1.05 } }, 0.5],
  // Q5: le ceba un mate y se lo alcanza a Graciela (a su derecha, delante del mostrador)
  [T.q5 - 0.001, { x: RI.x, z: RI.z, giro: 0.05, inclina: 0.05, ...MATE_P, ...BAJA_I, ...aC(-0.35, 0.1), ...CARA.sonrisa, ojos: { x: -0.3, y: -0.3, abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.7 } }, 0.001],
  [T.alcanza[1] + 0.2, { ...aC(-0.35, 0.02), ojos: { x: -0.5, y: 0.05 } }, 0.3],
];
// ---- Graciela ----
const G_GIRO = Math.atan2(RI.x - G0.x, RI.z - G0.z);
const GK = [
  // P2: en su casa, caminando despacio y grabando el audio (el celular delante del mentón)
  [0, { x: CASA.x - 0.25, z: 0.0, giro: 0.25, paso: 0.55, pasoVel: 5, ...BRAZOS.costado, ...aC(0.1, 0.05), ...CARA.feliz, ojos: { x: 0.1, y: -0.1, abiertos: 0.95, feliz: 0.5 } }],
  [T.p3a, { x: CASA.x + 0.2, z: 0.05, giro: -0.2 }, T.p3a - T.p2, (u) => u],
  // parte 2 · Q3: entra por la puerta y va al mostrador; habla con Rubén
  [T.q3 - 0.001, { x: LX + 0.25, z: PUERTA.z0 + 0.5, giro: Math.PI / 2 + 0.2, paso: 1, pasoVel: 9, ...BRAZOS.costado, ...aC(0, 0), ...CARA.feliz, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.15 } }, 0.001],
  [T.entraG[1], { x: G0.x, z: G0.z, giro: G_GIRO - 0.55, paso: 0 }, T.entraG[1] - T.entraG[0], (u) => eo(u)],
  [T.q5 - 0.001, { x: G0.x, z: G0.z, giro: G_GIRO - 0.6, paso: 0, ...BRAZOS.costado, ...aC(0.05, 0.02), ...CARA.feliz, ojos: { x: 0, abiertos: 1, feliz: 0.15 } }, 0.001],
];
// ---------- helpers de mano en coordenadas del mundo ----------
const _w = new THREE.Vector3();
function manoA(per, pose, lado, mundo) {
  per.poner(pose); per.raiz.updateMatrixWorld(true);
  const l = per.cuerpo.worldToLocal(_w.copy(mundo));
  const k = per.cfg.alto || 1;
  pose[`mano${lado}`] = [l.x / k, l.y / k, l.z / k];
  return pose;
}
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
const bocaMundo = (per, d = 0.06, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(out.set(0, 0.181, 0.265 + d)); };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
};
const MATE_OFF = V3(0.11, -0.09, 0.02);
const PUNTA = V3(0, 0.31 * 1.25, -0.045 * 1.25);
// dónde está la pantalla del celular del atril (para el dedo de Rubén): u, v en 0..1 sobre la pantalla (v=0 arriba)
const _pp = new THREE.Vector3();
function puntoPantalla(u, v, sobre = 0.012) {
  celuR.updateMatrixWorld(true);
  return celuR.localToWorld(_pp.set((u - 0.5) * 0.081, (0.5 - v) * 0.132, 0.007 + sobre / PH_S)).clone();
}
// los toques: [t, u, v] (play en P1, 2x en P3b); el dedo baja desde arriba, toca y se va
const TOQUES = [[T.tap, 0.14, 0.38], [T.tap2x, 0.14, 0.53]];
const SORBOS = [[T.sorbo1 - 0.15, T.sorbo1 + 0.45], [T.sorbo2 - 0.15, T.sorbo2 + 0.45]];

function ponerPersonajes(t, plano) {
  // ---- Rubén ----
  let pr = poseEn(t, RK);
  const gR = pr.giro;
  // el dedo de la mano izquierda sobre la pantalla (toca play / 2x)
  for (const [tt, uu, vv] of TOQUES) {
    const a = tt - 0.35, b = tt + 0.3;
    if (!en(t, a, b)) continue;
    const k = eio(sg(t, a, tt - 0.04)) * (1 - eio(sg(t, tt + 0.06, b)));
    const toque = puntoPantalla(uu, vv, lerp(0.05, 0.004, eio(sg(t, tt - 0.16, tt - 0.02)) * (1 - sg(t, tt + 0.04, tt + 0.14))));
    ruben.poner(pr);
    const p1 = manoA(ruben, { ...pr, dedoI: 1, codoI: [1, -0.4, -0.3] }, "I", toque.add(V3(0.0, 0.035, 0.0)));
    pr.manoI = pr.manoI.map((v, i) => lerp(v, p1.manoI[i], k)); pr.dedoI = k; pr.codoI = [1, -0.4, -0.3];
  }
  // P3b/P4b/P5: la mejilla apoyada en la mano izquierda, el codo en el mostrador (la mano debajo del pómulo, sin entrar)
  if (en(t, T.mejilla - 0.3, T.p5)) {
    const k = eio(sg(t, T.mejilla - 0.3, T.mejilla + 0.15));
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const mej = ruben.cabeza.localToWorld(V3(0.16, 0.06, 0.22));   // debajo del pómulo, apoyada
    const p1 = manoA(ruben, { ...pr, codoI: [0.6, -1, 0.3] }, "I", mej);
    pr.manoI = pr.manoI.map((v, i) => lerp(v, p1.manoI[i], k)); pr.codoI = [0.6, -1, 0.3]; pr.dedoI = 0;
  }
  // P5: el celular de canto delante de la boca (sin taparla), en la mano izquierda
  if (en(t, T.p5, T.p6)) {
    // desde el primer cuadro de P5 el celular está en la mano (abajo, a la altura del pecho); sube a la boca y baja
    const k = eio(sg(t, T.micro[0], T.micro[1])) * (1 - eio(sg(t, T.suelta, T.suelta + 0.25)));
    ruben.poner(pr);
    const alto = bocaMundo(ruben, 0.0).add(V3(0.2, -0.26, 0.12)), bajo = bocaMundo(ruben, 0.0).add(V3(0.18, -0.26, 0.24));
    const p1 = manoA(ruben, { ...pr, codoI: [1, -0.6, -0.1] }, "I", bajo.lerp(alto, k));
    pr.manoI = p1.manoI; pr.codoI = [1, -0.6, -0.1]; pr.dedoI = 0;
  }
  // P6: saca el segundo termo de abajo del mostrador y lo apoya al lado del celular (golpe seco)
  if (en(t, T.p6b - 0.4, T.termo2 + 0.45)) {
    const k = eio(sg(t, T.p6b - 0.4, T.p6b - 0.2)) * (1 - eio(sg(t, T.termo2 + 0.2, T.termo2 + 0.45)));
    ruben.poner(pr);
    const p1 = manoA(ruben, { ...pr, codoI: [1, -0.5, -0.2] }, "I", termo2Pos(t).add(V3(-0.02, 0.44, 0.02)));
    pr.manoI = pr.manoI.map((v, i) => lerp(v, p1.manoI[i], k)); pr.codoI = [1, -0.5, -0.2];
  }
  // Q4: levanta el segundo termo (el mismo de P6) a cuadro; Q5: lo usa para cebar
  if (en(t, T.levTermo[0] - 0.05, T.ceba[0] + 0.45)) {
    ruben.poner(pr);
    const p1 = manoA(ruben, { ...pr, codoI: [1, -0.5, -0.2] }, "I", termo2Pos(t).add(V3(-0.02, 0.44, 0.02)));
    const k = eio(sg(t, T.levTermo[0] - 0.05, T.levTermo[0] + 0.2));
    pr.manoI = pr.manoI.map((v, i) => lerp(v, p1.manoI[i], k)); pr.codoI = [1, -0.5, -0.2];
  }
  // Q5: le alcanza el mate a Graciela con la derecha
  if (en(t, T.alcanza[0] - 0.05, DUR)) {
    const k = eio(sg(t, T.alcanza[0], T.alcanza[1])) * (1 - eio(sg(t, T.alcanza[1] + 0.35, T.alcanza[1] + 0.7)));
    ruben.poner(pr);
    const p1 = manoA(ruben, { ...pr, codoD: [-1, -0.4, -0.1] }, "D", ENTREGA.clone());
    pr.manoD = pr.manoD.map((v, i) => lerp(v, p1.manoD[i], k));
  }
  // sorbos: la punta de la bombilla delante de la boca
  for (const [a, b] of SORBOS) {
    const u = eio(sg(t, a, a + 0.22)) * (1 - eio(sg(t, b - 0.1, b + 0.15)));
    if (u > 0) {
      ruben.poner(pr);
      ruben.raiz.updateMatrixWorld(true);
      const bm = ruben.cabeza.localToWorld(V3(-0.07, 0.155, 0.29));
      const rot = new THREE.Matrix4().makeRotationY(gR);
      const hand = bm.clone().sub(PUNTA.clone().applyMatrix4(rot)).sub(MATE_OFF.clone().applyMatrix4(rot));
      const p1 = manoA(ruben, { ...pr, codoD: [-1, -0.4, 0.1] }, "D", hand);
      pr.manoD = pr.manoD.map((v, i) => lerp(v, p1.manoD[i], u)); pr.codoD = [-1, -0.45, 0.05];
    }
  }
  bocaVoz(pr, t, T.voz1, ENV.r1);
  bocaVoz(pr, t, T.voz2, ENV.r2);
  ruben.poner(pr);
  // ---- Graciela ----
  const pg = poseEn(t, GK);
  if (t < P2) {
    // P2: el celular en la derecha delante del mentón (sin tapar la boca); la izquierda gesticula
    graciela.poner(pg);
    const obj = bocaMundo(graciela, 0.0).add(V3(-0.15, -0.3, 0.14).applyAxisAngle(V3(0, 1, 0), pg.giro));
    const p1 = manoA(graciela, { ...pg, codoD: [-1, -0.7, -0.1] }, "D", obj);
    pg.manoD = p1.manoD; pg.codoD = [-1, -0.7, -0.1];
    const gx = Math.sin(t * 5.3) * 0.08, gy = Math.abs(Math.sin(t * 3.1)) * 0.12;
    pg.manoI = [0.34 + gx, 0.42 + gy, 0.3 + Math.sin(t * 4.1) * 0.05]; pg.codoI = [1, -0.4, -0.2];
    pg.cabeza.ladea = Math.sin(t * 2.6) * 0.08; pg.cabeza.giro += Math.sin(t * 1.7) * 0.12;
    bocaVoz(pg, t, T.g1, ENV.g1, 0.55);
    bocaVoz(pg, t, T.g2, ENV.g2, 0.55);
  } else {
    // Q5: recibe el mate con la derecha y lo sostiene
    if (t >= T.alcanza[0]) {
      graciela.poner(pg);
      const k = eio(sg(t, T.alcanza[0] + 0.15, T.alcanza[1]));
      const destino = t < T.alcanza[1] + 0.35 ? ENTREGA.clone().add(V3(0, 0.0, 0.07)) : ENTREGA.clone().lerp(V3(G0.x + 0.16, 0.86, G0.z - 0.18), eio(sg(t, T.alcanza[1] + 0.35, T.alcanza[1] + 0.75))).add(V3(0, 0, 0.07));
      const p1 = manoA(graciela, { ...pg, codoD: [-1, -0.5, -0.1] }, "D", destino);
      pg.manoD = pg.manoD.map((v, i) => lerp(v, p1.manoD[i], k)); pg.codoD = [-1, -0.5, -0.1];
    }
    bocaVoz(pg, t, T.g6, ENV.g6, 0.7);
    if (t >= T.bResulta && t < T.bResulta + 1.2) pg.boca.abierta = Math.max(pg.boca.abierta, Math.abs(Math.sin((t - T.bResulta) * 12)) * 0.4);
  }
  graciela.poner(pg);
  // visibilidad por plano (los que no están en cuadro no tapan la cámara)
  ruben.raiz.visible = plano !== "P2";
  graciela.raiz.visible = plano === "P2" || (t >= P2 && ["Q3", "Q5"].includes(plano));
}
const ENTREGA = V3((RI.x + G0.x) / 2 - 0.02, 1.04, -1.28);
// el segundo termo: oculto abajo del mostrador hasta P6; sube y se apoya; en Q4 se levanta a cuadro; en Q5 ceba
function termo2Pos(t) {
  if (t < P2) {
    // en el corte a P6b ya lo tiene en la mano, en alto; baja acelerando y golpea el mostrador en T.termo2
    // la mano lo trae desde abajo del mostrador (al costado de Rubén), sube por encima del borde y lo apoya con un golpe
    const u = sg(t, T.p6b - 0.1, T.termo2);
    const a = V3(TERMO2.x + 0.16, 0.55, -1.95), b = TERMO2.clone();
    const p = a.lerp(b, eio(u)); p.y += Math.sin(Math.PI * Math.min(1, u * 1.15)) * 0.22;
    return u >= 1 ? TERMO2.clone() : p;
  }
  if (t < T.levTermo[0]) return TERMO2.clone();
  if (t < T.q5) {
    const u = eio(sg(t, T.levTermo[0], T.levTermo[1]));
    const p = TERMO2.clone().lerp(V3(RI.x + 0.22, 1.0, -1.35), u);
    // después de "Contame." lo baja y lo inclina sobre el mate (gesto de cebar, por debajo de la cara)
    const c = eio(sg(t, T.ceba[0], T.ceba[0] + 0.25));
    return p.lerp(TERMO2.clone(), c);   // lo vuelve a apoyar en el mostrador (no ceba en cuadro)
  }
  // Q5: otra vez apoyado en el mostrador (el mate ya está cebado)
  return TERMO2.clone();
}

// ================= ESCENA EN EL TIEMPO =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3();
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  ponerCamara(t);
  const plano = planoActual;
  ponerLuz(t);
  ponerPersonajes(t, plano);
  for (const per of [ruben, graciela]) per.ojoLejano(camera.position);
  relleno.position.copy(camera.position).add(V3(0.4, 0.8, 0)); relleno.target.position.copy(camera.position).add(camera.getWorldDirection(_a).multiplyScalar(3));

  // ---- la puerta: se abre cuando entra Graciela ----
  hoja.rotation.y = -1.2 * eio(sg(t, T.campana - 0.15, T.campana + 0.15)) * (1 - eio(sg(t, T.entraG[0] + 0.7, T.entraG[0] + 1.1)));
  // ---- el reloj: 10:15; durante el time-lapse las agujas giran rápido; vuelve de golpe a 10:19 ----
  {
    let m = 15;
    if (!parte2) { if (t >= T.luz) m = 19; else if (t > T.p3a) m = 15 + Math.pow(sg(t, T.p3a, T.luz), 1.3) * 560; }
    else m = t >= T.h1016 ? 16 : 15;
    reloj.userData.poner(10 + Math.floor(m / 60), m % 60, parte2 || t >= T.luz ? (t * 6) % 60 : (m * 60) % 60);
  }
  // ---- mate (en la mano derecha de Rubén; en Q5 pasa a Graciela) con su vapor; los termos ----
  {
    let manoM = ruben, lado = "D";
    if (parte2 && t >= T.alcanza[1] + 0.05) { manoM = graciela; lado = "D"; }
    const p = manoMundo(manoM, lado, _a);
    const rot = new THREE.Matrix4().makeRotationY(manoM.raiz.rotation.y);
    mateR.position.copy(p).add(MATE_OFF.clone().applyMatrix4(rot));
    let su = 0; for (const [a2, b2] of SORBOS) su = Math.max(su, eio(sg(t, a2, a2 + 0.22)) * (1 - eio(sg(t, b2 - 0.1, b2 + 0.15))));
    mateR.rotation.set(0, manoM.raiz.rotation.y - Math.PI / 2 + (1 - su) * (-Math.PI / 2), 0);
    if (manoM === graciela) { mateR.position.copy(p).add(V3(-0.02, -0.1, 0.03)); mateR.rotation.set(0, graciela.raiz.rotation.y + Math.PI / 2, 0); }
    mateR.visible = (manoM === ruben ? ruben.raiz.visible : graciela.raiz.visible) && plano !== "P2";
    // el vapor: en P1 humea; se apaga en P3a (el mate se enfrió); vuelve en la parte 2
    const hum = parte2 ? 1 : t < T.p3a ? 1 : 1 - sg(t, T.p3a + 0.1, T.p3a + 0.6);
    vapor.position.copy(mateR.position).add(V3(0, 0.17, 0));
    vapor.userData.actualizar(t, hum);
    vapor.visible = mateR.visible && hum > 0.01;
    // termo crema: apoyado (en Q1 lo usa para cebar)
    termo1.position.copy(TERMO1); termo1.rotation.set(0, 0.6, 0); chorro.visible = false;
    termo1.visible = plano !== "P2";
    // segundo termo
    termo2.visible = plano !== "P2" && (parte2 || t >= T.p6b);
    termo2.position.copy(termo2Pos(t));
    const golpe = !parte2 ? pulso(t, T.termo2, 0.12) * 0.08 : 0;
    termo2.scale.set(1.3 * (1 + golpe), 1.3 * (1 - golpe), 1.3 * (1 + golpe));
    termo2.rotation.set(0, -0.4, 0);
  }
  // ---- la etiquetita "Graciela ✓" en el paquete de polenta (parte 2) ----
  {
    etiG.visible = parte2 && t >= T.etiqueta && plano !== "Q4";
    const e = bk(sg(t, T.etiqueta, T.etiqueta + 0.25)); etiG.scale.setScalar(Math.max(0.001, e));
  }
  // ---- los celulares ----
  {
    dibujarCeluR(t);
    atril.visible = !['P2', 'P5', 'Q4'].includes(plano);
    const vib = parte2 && en(t, T.vibra, T.vibra + 0.55) ? 1 : 0;
    atril.position.set(ATRIL.x + vib * Math.sin(t * 90) * 0.004, ATRIL.y + vib * Math.abs(Math.sin(t * 60)) * 0.003, ATRIL.z + vib * Math.cos(t * 77) * 0.003);
    atril.rotation.y = vib * Math.sin(t * 70) * 0.03;
    celuMano.visible = plano === "P5";
    if (celuMano.visible) {
      const p = manoMundo(ruben, "I", _a);
      celuMano.position.copy(p).add(V3(-0.02, 0.12, 0.02));   // la mano agarra el borde de abajo (el pulgar no tapa la pantalla)
      celuMano.rotation.set(0.15, 1.15, 0.05);
    }
    celuG.visible = plano === "P2";
    if (celuG.visible) {
      dibujarPantG(t);
      const p = manoMundo(graciela, "D", _a);
      celuG.position.copy(p).add(V3(0, 0.1, 0.03));
      celuG.rotation.set(-0.25, graciela.raiz.rotation.y, 0.0);   // la pantalla (grabando) hacia afuera: se lee
    }
  }

  // ---- globos (Graciela en persona) ----
  {
    const ent = (ti) => bk(sg(t, ti, ti + 0.28));
    const sale6 = 1 - eio(sg(t, T.bG6fin - 0.15, T.bG6fin));
    if (plano === "Q3" && t >= T.bG6) { const [hx, hy] = cabezaEnPantalla(graciela, 0.12); { const [bx, by] = enPantalla(bocaMundo(graciela, 0.05, _b)); ponerGlobo(GL.g6, hx + 140, Math.max(360, hy - 380), ent(T.bG6), [bx, by - 20]); } }
    else if (plano === "Q4" && t < T.bG6fin) ponerGlobo(GL.g6, 420, 330, sale6, [-400, 360]);   // ella está fuera de cuadro a la izquierda: la cola apunta afuera
    else GL.g6.visible = false;
    // Q2: el rótulo grande con línea guía a la etiquetita del paquete de polenta
    if (plano === "Q2b" && t >= T.etiqueta + 0.05) { etiG.updateMatrixWorld(true); const [lx, ly] = enPantalla(etiG.getWorldPosition(_b)); ponerGlobo(GL.sep, lx + 120, ly - 260, ent(T.etiqueta + 0.05), [lx, ly - 30]); } else GL.sep.visible = false;
    if (plano === "Q5" && t >= T.bResulta) { const [hx, hy] = cabezaEnPantalla(graciela, 0.12); ponerGlobo(GL.resulta, hx, Math.max(260, hy - 300), ent(T.bResulta), [hx, hy - 130]); } else GL.resulta.visible = false;
  }
  // ---- fichas de los temas del audio ----
  for (const f of FICHAS) {
    const pos = f.pos[plano];
    if (!pos || t < f.t0 || t >= f.t1) { f.g.visible = false; continue; }
    const s = bk(sg(t, f.t0, f.t0 + 0.26)) * (t > f.t1 - 0.05 ? 0 : 1);
    ponerGlobo(f.g, pos[0], pos[1], s, null, 2, f.giro + Math.sin(t * 2 + f.t0) * 0.015);
  }
  // ---- contador "Audio" ----
  {
    let s = 0, barra = true, txt = "0:00", esc = false;
    if (!parte2) {
      const vis = !["P5"].includes(plano) && t < P1;
      s = vis ? 0.92 : 0;
      // desde el 6:47 el contador es el del audio nuevo (sin escuchar): 0:00 / 6:47
      if (t >= T.b647) { txt = "0:00"; barra = "6:47"; }
      else { txt = mmss(posAudio(t)); barra = "4:12"; }
    } else {
      const vis = plano === "Q1" && t >= T.llega;
      s = vis ? 0.92 : 0;
      // el agente lo escucha entero en 0,7 s: el contador corre 0:00 → 4:12
      txt = mmss(Math.floor(252 * sg(t, T.escucha[0], T.escucha[1]))); barra = "4:12"; esc = t >= T.escuchado;
    }
    dibujarPlaca(esc ? false : barra, false);
    ponerNumero(txt);
    numMesh.visible = !esc;
    numMesh.position.x = 0.0;
    escuchadoP.visible = esc;
    const ue = bk(sg(t, T.escuchado, T.escuchado + 0.25)); escuchadoP.scale.setScalar(Math.max(0.001, ue));
    contador.userData.dosx.visible = !parte2 && t >= T.tap2x && t < T.b647;
    contador.userData.dosx.scale.setScalar(Math.max(0.001, bk(sg(t, T.tap2x, T.tap2x + 0.25))));
    // late cuando cambia el número
    const cambios = [T.p3a, T.rodillo[1], T.k409, T.k410, T.k411, T.k412, T.b647];
    let late = 0; for (const c of cambios) late = Math.max(late, pulso(t, c, 0.25));
    late += t >= T.b647 ? pulso(t, T.b647, 0.45) * 0.8 : 0;
    numMesh.scale.setScalar(1 + 0.1 * Math.min(1, late));
    ponerContador(540, 182, s * (1 + 0.06 * late));
    contador.rotation.set(0, 0, Math.sin(t * 0.6) * 0.012);
  }

  if (en(tIn, P1, P2)) { contador.visible = false; for (const k in GL) GL[k].visible = false; for (const f of FICHAS) f.g.visible = false; }
  if (LIMPIO) { contador.visible = false; for (const k in GL) GL[k].visible = false; for (const f of FICHAS) f.g.visible = false; }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
