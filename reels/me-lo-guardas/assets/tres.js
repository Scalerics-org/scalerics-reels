// Capa 3D de me-lo-guardas (Three.js r170 local). Base técnica: reels/que-en-paz-descanse, las-siete-y-cincuenta-y-nueve
// y lo-mismo-que-la-otra-vez (globos y contador en píxeles de pantalla, pegados a la cámara).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo set: el almacén de Rubén DE MAÑANA, con pared navy claro, el estante normal (con el hueco de la yerba) y el
// estante GUARDADOS a la derecha, la puerta vidriada con el cartel ABIERTO.
//   PARTE 1: "¿Me lo guardás? Ya vengo." → el estante GUARDADOS se llena, se arquea, un mes después la telaraña;
//            Graciela pide yerba (AGOTADA: la última es la de Walter), "Ya viene, Graciela.", Walter asoma y encarga otra.
//   PARTE 2: el agente contesta solo con seña y "hasta el martes"; el estante ordenado (3 con seña), la que vence se
//            libera y la yerba vuelve; Walter viene a buscar lo suyo; "Ya vino, Graciela."; el guiño con el mate.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import {
  crearPersonaje, ELENCO, poseEn, CARA, BRAZOS, pegarACamara,
  crearMate, crearTermo, crearCelular, crearMochila, crearLapicera,
  crearYerba, crearGalletitas, crearDulceDeLeche, crearFideos, crearMaple, crearBolsaPapel,
  crearPapelito, crearTelarana, crearZapallo, crearQueso, crearPanFlauta, crearEstanteGuardados,
} from "./personajes.js";
import { T, DUR, P1, P2, VOZ1_ENV, VOZ2_ENV, LIMPIO } from "./tiempos3d.js";
await Promise.all([...["300", "500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"'), document.fonts.load('500 40px "IBM Plex Mono"')]);

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

const CIELO = 0xd6e6f2;
const scene = new THREE.Scene();
scene.background = new THREE.Color(CIELO);
const camera = new THREE.PerspectiveCamera(40, 1080 / 1920, 0.02, 60);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x8a8f99);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(3, 9, -1, 2, 6, 0, 0xffffff, 2.0);          // la vidriera y la puerta, luz blanca de mañana
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xdde8ff, 1.2);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.0);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.5;

// luz de mañana: blanca y dura desde la vidriera (manchas en el piso), cielo, contraluz, la lámpara de adentro, una luz
// sobre GUARDADOS y un relleno suave desde la cámara para que las caras se lean siempre (la pared es navy)
const sol = new THREE.DirectionalLight(0xfffaf0, 2.9);
sol.position.set(-2.6, 5.0, 6.0); sol.target.position.set(0.8, 0.6, -1.6);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 2.5;
Object.assign(sol.shadow.camera, { left: -3.8, right: 3.8, top: 3.8, bottom: -3.8, near: 1, far: 16 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xf4f6f8, 0x5a5048, 1.15); scene.add(cielo);
const rim = new THREE.DirectionalLight(0xcfe0ff, 0.8); rim.position.set(3, 4, -5); scene.add(rim);
const lampara = new THREE.PointLight(0xffe8c0, 4.5, 6, 1.6); lampara.position.set(0.8, 2.7, -1.6); scene.add(lampara);
const luzG = new THREE.SpotLight(0xfff4e0, 9, 5, 0.75, 0.6, 1.4); luzG.position.set(1.9, 3.1, -1.6); luzG.target.position.set(1.9, 1.1, -3.2); scene.add(luzG, luzG.target);
const relleno = new THREE.DirectionalLight(0xfff6ea, 0.7); scene.add(relleno, relleno.target);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, maderaC: 0xc89a64, mostaza: 0xd9a441, kraft: 0xc49a63 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  pared: mat(0x16243d, 0.92), techo: mat(0x1f3254, 0.95), navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6),
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
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ================= EL SET: el almacén por dentro, de mañana =================
// x: izquierda (-) a derecha (+). Pared del fondo z = -3.4: el estante normal a la izquierda (x -1.85..0.6) y el
// estante GUARDADOS a la derecha (x 0.97..2.47). Mostrador cruzando en z = -1.3, Rubén atrás, Graciela adelante,
// pared del frente z = FZ con la puerta vidriada y la vidriera.
const FZ = 1.4;
const PUERTA = { x0: -0.3, x1: 0.7, alto: 2.3 };
const VIDRIERA = { x0: 1.15, x1: 2.65, y0: 0.75, y1: 2.2 };
const MOSTRADOR = { x: 0.45, y: 0.9, z: -1.3, w: 2.3, d: 0.62 };
const GX = 1.9, GZ = -3.17;                 // el estante GUARDADOS (centro, contra la pared)
const HUECO = { x: -0.32, y: 1.18, z: -3.06 }; // el lugar de la yerba en el estante normal
{
  const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(3.4, 3.3);
  const p = mesh(new THREE.PlaneGeometry(5.0, 4.8), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.5 }), 0.5, 0.0, -0.98); p.rotation.x = -Math.PI / 2; p.castShadow = false; scene.add(p);
  const pared = (w, h, d, x, y, z) => { const m = mesh(new THREE.BoxGeometry(w, h, d), M.pared, x, y, z); m.castShadow = false; scene.add(m); return m; };
  pared(5.0, 3.3, 0.1, 0.5, 1.65, -3.4);
  pared(0.1, 3.3, 4.9, -2.0, 1.65, -0.98);
  pared(0.1, 3.3, 4.9, 3.0, 1.65, -0.98);
  const techo = mesh(new THREE.BoxGeometry(5.1, 0.1, 4.9), M.techo, 0.5, 3.32, -0.98); techo.castShadow = false; scene.add(techo);
  scene.add(mesh(new THREE.BoxGeometry(4.9, 0.25, 0.03), M.navy, 0.5, 0.125, -3.34));
  scene.add(mesh(new THREE.BoxGeometry(0.03, 0.25, 4.8), M.navy, -1.94, 0.125, -0.98));
  scene.add(mesh(new THREE.BoxGeometry(0.03, 0.25, 4.8), M.navy, 2.94, 0.125, -0.98));
  scene.add(mesh(new THREE.BoxGeometry(4.9, 0.05, 0.03), M.cr2, 0.5, 2.9, -3.34));
  // estante normal (pared del fondo, izquierda); deja libre el hueco de la yerba
  semilla = 7;
  const colores = [C.cr, C.red, C.mostaza, 0xffffff, C.navy3, 0xe8cf9f, 0x8a5a3c, 0x6d86b0, 0xd98a5a];
  const mc = {}; const mm = (c, r) => (mc[c + "|" + r] ??= mat(c, r));
  const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  const X0 = -1.85, X1 = 0.6, XC = (X0 + X1) / 2, XW = X1 - X0;
  for (const y of [0.62, 1.18, 1.74, 2.3]) {
    scene.add(mesh(rbox(XW, 0.05, 0.42, 0.015), M.maderaC, XC, y, -3.12));
    scene.add(mesh(rbox(XW, 0.06, 0.03, 0.01), M.navy3, XC, y - 0.005, -2.9));
    if (y > 2.2) continue;
    for (let x = X0 + 0.14; x < X1 - 0.1; x += 0.17 + az() * 0.07) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (y === 1.18 && x > HUECO.x - 0.26 && x < HUECO.x + 0.26) continue;
      if (k < 0.4) { const h = 0.22 + az() * 0.16; scene.add(mesh(rbox(0.13, h, 0.16, 0.012), mm(c, 0.6), x, y + 0.025 + h / 2, -3.05)); }
      else if (k < 0.62) { scene.add(mesh(cuerpoFrasco, mm(c, 0.35), x, y + 0.125, -3.05)); scene.add(mesh(tapa, M.cr, x, y + 0.245, -3.05)); }
      else if (k < 0.82) { scene.add(mesh(botella, mm(c, 0.3), x, y + 0.175, -3.05)); scene.add(mesh(pico, mm(C.cr3, 0.4), x, y + 0.37, -3.05)); }
      else { const ga = crearGalletitas(); ga.position.set(x + 0.06, y + 0.025, -3.05); ga.scale.setScalar(0.8); ga.rotation.y = 0.1; scene.add(ga); x += 0.12; }
    }
  }
  for (let i = 0, x = X0 + 0.15; x < X1 - 0.1; i++, x += 0.2) { const o = i % 3 === 1 ? crearDulceDeLeche() : crearFideos(); o.position.set(x, 2.325, -3.05); scene.add(o); }
  for (const x of [X0, X1]) scene.add(mesh(rbox(0.06, 2.4, 0.44, 0.015), M.navy3, x, 1.2, -3.12));
  // la etiqueta de la yerba en el frente de la tabla (queda aunque no haya yerba)
  const et = lienzo(512, 200, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 92); x.fillText("YERBA", w / 2, h / 2 + 6);
  });
  const etM = new THREE.MeshStandardMaterial({ map: et, roughness: 0.6, emissive: 0xffffff, emissiveMap: et, emissiveIntensity: 0.2 });
  const etq = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.078), etM); etq.position.set(HUECO.x, 1.18 - 0.004, -2.884); scene.add(etq);
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
  frasco.position.set(MX.x - 0.98, MX.y + 0.13, MX.z - 0.05); scene.add(frasco);
  scene.add(mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.04, 18), M.cr, MX.x - 0.98, MX.y + 0.28, MX.z - 0.05));
  for (let i = 0; i < 9; i++) scene.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.mostaza, C.cr][i % 3], 0.3), MX.x - 0.98 + Math.sin(i * 2.4) * 0.06, MX.y + 0.04 + Math.floor(i / 3) * 0.05, MX.z - 0.05 + Math.cos(i * 2.4) * 0.06));
  scene.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.45, 6), M.navy, 0.8, 3.05, -1.6));
  const pant = mesh(new THREE.ConeGeometry(0.22, 0.16, 20, 1, true), mat(C.cr2, 0.5, { side: THREE.DoubleSide }), 0.8, 2.78, -1.6); scene.add(pant);
  { const f = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), new THREE.MeshBasicMaterial({ color: 0xfff0c8 })); f.position.set(0.8, 2.72, -1.6); scene.add(f); }
  const alm = lienzo(256, 340, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#c7655b"; x.fillRect(0, 0, w, 80); x.fillStyle = "#16243d"; for (let i = 0; i < 5; i++) for (let j = 0; j < 7; j++) x.fillRect(18 + j * 33, 104 + i * 44, 24, 30); });
  const almM = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.45), new THREE.MeshStandardMaterial({ map: alm, roughness: 0.8 })); almM.position.set(-1.94, 1.75, -1.0); almM.rotation.y = Math.PI / 2; scene.add(almM);
}
// la pared del frente: puerta vidriada (hoja que se abre hacia adentro), vidriera, marcos crema
const frente = new THREE.Group(); scene.add(frente);
const hoja = new THREE.Group();
{
  const D = 0.12, ALTO = 3.3;
  const pared = (x0, x1, y0, y1) => { const m = mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, D), M.pared, (x0 + x1) / 2, (y0 + y1) / 2, FZ); frente.add(m); };
  pared(-2.05, PUERTA.x0, 0, ALTO); pared(PUERTA.x0, VIDRIERA.x0, PUERTA.alto, ALTO); pared(PUERTA.x1, VIDRIERA.x0, 0, PUERTA.alto);
  pared(VIDRIERA.x0, VIDRIERA.x1, 0, VIDRIERA.y0); pared(VIDRIERA.x0, VIDRIERA.x1, VIDRIERA.y1, ALTO); pared(VIDRIERA.x1, 3.05, 0, ALTO);
  frente.add(mesh(new THREE.BoxGeometry(5.1, 0.25, 0.03), M.navy, 0.5, 0.125, FZ - 0.075));
  const barra = (x, y, w, h, z = FZ) => frente.add(mesh(rbox(w, h, 0.16, 0.02), M.cr2, x, y, z));
  barra(PUERTA.x0 - 0.03, PUERTA.alto / 2, 0.08, PUERTA.alto); barra(PUERTA.x1 + 0.03, PUERTA.alto / 2, 0.08, PUERTA.alto); barra((PUERTA.x0 + PUERTA.x1) / 2, PUERTA.alto + 0.03, PUERTA.x1 - PUERTA.x0 + 0.14, 0.08);
  const vcx = (VIDRIERA.x0 + VIDRIERA.x1) / 2, vw = VIDRIERA.x1 - VIDRIERA.x0, vh = VIDRIERA.y1 - VIDRIERA.y0;
  barra(VIDRIERA.x0 + 0.03, (VIDRIERA.y0 + VIDRIERA.y1) / 2, 0.08, vh); barra(VIDRIERA.x1 - 0.03, (VIDRIERA.y0 + VIDRIERA.y1) / 2, 0.08, vh);
  barra(vcx, VIDRIERA.y1 - 0.03, vw, 0.08); barra(vcx, VIDRIERA.y0 + 0.03, vw, 0.08);
  const vidrioM = new THREE.MeshPhysicalMaterial({ color: 0xdcecff, roughness: 0.05, transparent: true, opacity: 0.12, depthWrite: false });
  const vv = new THREE.Mesh(new THREE.PlaneGeometry(vw - 0.1, vh - 0.1), vidrioM); vv.position.set(vcx, (VIDRIERA.y0 + VIDRIERA.y1) / 2, FZ); vv.renderOrder = 5; frente.add(vv);
  hoja.position.set(PUERTA.x0, 0, FZ - 0.02); frente.add(hoja);
  const W = PUERTA.x1 - PUERTA.x0;
  const hb = (x, y, w, h) => hoja.add(mesh(rbox(w, h, 0.06, 0.015), M.cr2, x, y, 0));
  hb(0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W - 0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W / 2, PUERTA.alto - 0.04, W, 0.08); hb(W / 2, 0.09, W, 0.18);
  const vp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.12, PUERTA.alto - 0.26), vidrioM); vp.position.set(W / 2, PUERTA.alto / 2 + 0.06, 0); vp.renderOrder = 5; hoja.add(vp);
  hoja.add(mesh(rbox(0.04, 0.3, 0.05, 0.015), mat(0xc9ccd2, 0.25, { metalness: 0.6 }), W - 0.075, 1.12, -0.06));
  const tx = lienzo(1024, 420, (x, w, h) => {
    x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#0b1220"; x.lineWidth = 18; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 40); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 168); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ABIERTO", w / 2, h / 2 + 12);
  });
  const gm = mat(C.g, 0.5);
  const cartelM = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.5, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.12 });
  hoja.add(mesh(new THREE.BoxGeometry(0.5, 0.205, 0.02), [gm, gm, gm, gm, gm, cartelM], W / 2, 1.62, -0.05));
  const cad = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V3(W / 2 - 0.18, 1.72, -0.045), V3(W / 2, 1.86, -0.04), V3(W / 2 + 0.18, 1.72, -0.045)]), 16, 0.006, 6);
  hoja.add(mesh(cad, mat(0xc9ccd2, 0.3, { metalness: 0.6 })));
  frente.add(mesh(new THREE.ConeGeometry(0.05, 0.08, 14, 1, true), mat(0xd9b04a, 0.3, { metalness: 0.6, side: THREE.DoubleSide }), PUERTA.x0 + 0.2, PUERTA.alto - 0.1, FZ - 0.12));
}
// la pared del frente por dentro: un reloj y un estante con frascos a la izquierda de la puerta
{
  const Z = FZ - 0.07;
  const esf = lienzo(256, 256, (x) => { x.fillStyle = "#efeee5"; x.beginPath(); x.arc(128, 128, 124, 0, 7); x.fill(); x.fillStyle = "#16243d"; for (let h = 0; h < 12; h++) { const a = (h / 12) * Math.PI * 2; x.beginPath(); x.arc(128 + Math.sin(a) * 100, 128 - Math.cos(a) * 100, h % 3 ? 5 : 9, 0, 7); x.fill(); } x.lineWidth = 10; x.strokeStyle = "#16243d"; x.lineCap = "round"; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + 50, 128 + 10); x.stroke(); x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + 0, 128 - 85); x.stroke(); });
  const rel = new THREE.Group(); rel.position.set(-1.05, 2.2, Z); rel.rotation.y = Math.PI; scene.add(rel);
  rel.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.04, 32).rotateX(Math.PI / 2), M.g));
  const cara = new THREE.Mesh(new THREE.CircleGeometry(0.17, 32), new THREE.MeshStandardMaterial({ map: esf, roughness: 0.5 })); cara.position.z = 0.022; rel.add(cara);
  const est = new THREE.Group(); est.position.set(-1.05, 1.45, Z - 0.12); scene.add(est);
  est.add(mesh(rbox(1.0, 0.04, 0.24, 0.01), M.maderaC, 0, 0, 0));
  for (let i = 0; i < 5; i++) { const c = [C.red, C.mostaza, C.cr, C.navy3, 0xd98a5a][i]; est.add(mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 14), mat(c, 0.4), -0.38 + i * 0.19, 0.11, 0)); est.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 14), M.cr, -0.38 + i * 0.19, 0.215, 0)); }
}
// afuera, al sol
{
  const afuera = new THREE.Group(); scene.add(afuera);
  const baldosa = lienzo(512, 512, (x) => {
    x.fillStyle = "#c9c4b4"; x.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#d4cfbf" : "#c4bfae"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122); }
  });
  baldosa.wrapS = baldosa.wrapT = THREE.RepeatWrapping; baldosa.repeat.set(10, 2);
  const v = mesh(new THREE.PlaneGeometry(14, 3), new THREE.MeshStandardMaterial({ map: baldosa, roughness: 0.9 }), 0.5, 0.0, FZ + 1.5); v.rotation.x = -Math.PI / 2; v.castShadow = false; afuera.add(v);
  afuera.add(mesh(rbox(14, 0.16, 0.22, 0.03), M.cr3, 0.5, -0.07, FZ + 3.0));
  const calle = mesh(new THREE.PlaneGeometry(40, 8), mat(0x6f7380, 0.9), 0.5, -0.15, FZ + 7); calle.rotation.x = -Math.PI / 2; calle.castShadow = false; afuera.add(calle);
  const casa = mesh(new THREE.BoxGeometry(14, 6, 0.3), mat(0xe8d9bd, 0.9), 0.5, 3, FZ + 12.5); casa.castShadow = false; afuera.add(casa);
  for (let i = -3; i <= 4; i++) { afuera.add(mesh(rbox(1.0, 1.3, 0.1, 0.02), M.navy3, i * 1.8, 1.9, FZ + 12.3)); afuera.add(mesh(rbox(1.1, 0.12, 0.14, 0.02), M.cr, i * 1.8, 1.2, FZ + 12.28)); }
  const arbol = new THREE.Group(); arbol.position.set(-1.3, 0, FZ + 2.4); afuera.add(arbol);
  arbol.add(mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.6, 8), mat(0x6e4a2e, 0.8), 0, 1.3, 0));
  for (const [x, y, z, r] of [[0, 3.0, 0, 0.9], [0.5, 2.7, 0.2, 0.6], [-0.5, 2.8, -0.1, 0.65], [0.1, 3.5, 0.1, 0.6]]) arbol.add(mesh(new THREE.IcosahedronGeometry(r, 0), mat(0x5f8f3a, 0.8, { flatShading: true }), x, y, z));
}

// ================= EL ESTANTE GUARDADOS =================
const estante = crearEstanteGuardados({ W: 1.5, D: 0.42, ys: [0.62, 1.12, 1.6], cartelY: 2.23 });
estante.position.set(GX, 0, GZ); scene.add(estante);
const ES = estante.userData;
const GUARD = [];
const PAPEL = (lineas, o = {}) => crearPapelito(lineas, { W: 0.15, H: 0.095, inclina: 0.04, ...o });
function bolsaCon(cosa) {
  const g = new THREE.Group(); const b = crearBolsaPapel(); g.add(b);
  if (cosa === "yerba") { const y = crearYerba(); y.position.set(-0.02, 0.1, -0.01); y.rotation.set(0.05, 0.15, -0.08); g.add(y); g.userData.yerba = y; }
  else if (cosa === "dulce") { const d = crearDulceDeLeche(); d.position.set(0.04, 0.22, 0); g.add(d); const p = crearPanFlauta(0.3); p.position.set(-0.04, 0.3, 0); p.rotation.set(0.2, 0.3, 1.1); g.add(p); }
  else if (cosa === "fideos") { for (const [x, r] of [[-0.05, 0.12], [0.04, -0.1]]) { const f = crearFideos(); f.position.set(x, 0.06, 0); f.rotation.z = r; g.add(f); } }
  else if (cosa === "galletas") { const ga = crearGalletitas(); ga.position.set(0, 0.22, 0); ga.rotation.set(0.1, 0.3, 0.9); ga.scale.setScalar(0.8); g.add(ga); }
  return g;
}
function nuevoGuardado(id, tabla, xl, t, obj, papel, etiqueta, frenteZ, papelY) {
  const g = new THREE.Group(); g.add(obj); estante.add(g);
  let p = null, e = null;
  if (papel) { p = PAPEL(papel); p.position.set(0, papelY, frenteZ + 0.004); g.add(p); }
  if (etiqueta) { e = crearPapelito(etiqueta, { W: 0.2, H: 0.1, fuente: "Lexend", tilde: etiqueta.join(" ").includes("seña") }); e.position.set(0, papelY, frenteZ + 0.004); g.add(e); }
  const o = { id, tabla, xl, t, g, obj, p, e };
  GUARD.push(o); return o;
}
const ZB = 0.02;
const gW = nuevoGuardado("walter", 0, -0.47, T.dejaW, bolsaCon("yerba"), ["Walter", "ya vengo"], ["Walter · seña", "hasta mar"], 0.08, 0.125);
const gPerro = nuevoGuardado("perro", 0, -0.04, T.m1 + 0.12, crearQueso(), ["la del perro", "a la tarde"], ["la del perro", "seña"], 0.075, 0.045);
nuevoGuardado("dulce", 0, 0.17, T.cosas[4], crearDulceDeLeche(), null, null, 0, 0);
nuevoGuardado("maple", 0, 0.45, T.maple, crearMaple(), ["sobrino", "de Marta"], null, 0.1, 0.03);
nuevoGuardado("pan", 1, -0.42, T.m2 + 0.12, (() => { const g = new THREE.Group(); for (const [r, y] of [[0.35, 0.04], [-0.35, 0.075]]) { const p = crearPanFlauta(0.44); p.position.set(0, y, 0); p.rotation.set(0, 0.25, r); g.add(p); } return g; })(), ["Sr. del 4B", "ya voy"], ["Sr. del 4B", "seña"], 0.08, 0.075);
const gGorra = nuevoGuardado("gorra", 1, 0.12, T.m3 + 0.12, bolsaCon("yerba"), ["el de la gorra", "lunes"], ["el de la gorra", "lunes"], 0.08, 0.125);
nuevoGuardado("zapallo", 1, 0.53, T.zapallo, crearZapallo(0.1), ["¿?"], null, 0.11, 0.05);
nuevoGuardado("b1", 2, -0.5, T.cosas[0], bolsaCon("fideos"), ["Ana", "mañana"], null, 0.08, 0.1);
nuevoGuardado("b2", 2, -0.08, T.cosas[1], bolsaCon("dulce"), ["Coco", "ya vengo"], null, 0.08, 0.1);
nuevoGuardado("b3", 2, 0.4, T.cosas[3], bolsaCon("galletas"), ["la de", "enfrente"], null, 0.08, 0.1);
const EN_P2 = new Set(["walter", "perro", "pan", "gorra"]);
const vencio = crearPapelito(["el de la gorra", "venció"], { W: 0.2, H: 0.1, fuente: "Lexend", color: "#efeee5", fondo: "#c7655b" });
gGorra.g.add(vencio); vencio.position.copy(gGorra.e.position); vencio.position.z += 0.001;
// la telaraña y el polvo de la bolsa de Walter (parte 1, desde "UN MES DESPUÉS")
const tela = crearTelarana(0.2, 0.0034, 5);
gW.g.add(tela); tela.position.set(-0.115, 0.27, 0.07); tela.rotation.set(0, 0, 0.12);
const tela2 = crearTelarana(0.11, 0.003, 9);
gW.g.add(tela2); tela2.position.set(0.12, 0.0, 0.06); tela2.rotation.set(0, 0, -1.05);
const motas = [];
for (let i = 0; i < 7; i++) { const m = mesh(new THREE.SphereGeometry(0.0065, 8, 6), new THREE.MeshStandardMaterial({ color: 0xf2efe2, emissive: 0xefeee5, emissiveIntensity: 0.5, roughness: 0.9 })); m.castShadow = false; gW.g.add(m); motas.push(m); }
const flechaEn = (t) => (t >= P2 ? 0 : 0.045 * eio(sg(t, T.arquea[0], T.arquea[1])));
const yerbaVuela = crearYerba(); scene.add(yerbaVuela);
const yerbaG = crearYerba(); scene.add(yerbaG);
const agotada = new THREE.Group(); scene.add(agotada);
{
  const tx = lienzo(512, 220, (x, w, h) => { x.fillStyle = "#c7655b"; x.fillRect(0, 0, w, h); x.strokeStyle = "#efeee5"; x.lineWidth = 12; x.strokeRect(10, 10, w - 20, h - 20); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 88); x.fillText("AGOTADA", w / 2, h / 2 + 6); });
  const m = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.6, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.25 });
  const r = mat(C.red, 0.6);
  agotada.add(mesh(new THREE.BoxGeometry(0.26, 0.112, 0.012), [r, r, r, r, m, r], 0, 0.1, 0));
  agotada.add(mesh(rbox(0.012, 0.06, 0.012, 0.004), M.navy3, 0, 0.03, -0.01));
  agotada.position.set(HUECO.x, HUECO.y + 0.025, HUECO.z + 0.02);
}

// ================= LOS PERSONAJES =================
const RI = { x: 0.42, z: -1.85 };
const G0 = { x: 1.1, z: -0.74 };
const W0 = { x: 0.58, z: -0.84 };
const WP = { x: 0.2, z: FZ - 0.28 };
const ruben = crearPersonaje({ ...ELENCO.almacenero, dedos: false, mechones: true, parpadeoCada: 3.7 });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 3.4 });
const walter = crearPersonaje({ ...ELENCO.walter, parpadeoCada: 3.2 });
scene.add(ruben.raiz, graciela.raiz, walter.raiz);
for (const p of [ruben, graciela, walter]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
walter.ponerCampera(true);
const mochila = crearMochila(C.navy3, C.g); walter.cuerpo.add(mochila); mochila.position.set(0, 0.3, -0.24);
{ const CCg = 0.3 * 0.92; graciela.cabeza.traverse((l) => { if (!l.isMesh) return; const esL = (l.material.color && l.material.color.getHex() === 0x16243d) || (l.material.isMeshBasicMaterial && l.geometry.type === "CircleGeometry"); if (!esL) return; l.position.y -= CCg; l.position.multiplyScalar(1.04 / 1.13); l.position.y += CCg; if (Math.abs(l.scale.y - 0.26) < 1e-6) l.visible = false; if (Math.abs(l.scale.y - 0.07) < 1e-6 && Math.abs(l.scale.x - 0.011) < 1e-6) { l.position.x = -0.035; } }); }

// ================= UTILERÍA =================
const mateR = crearMate(); mateR.scale.setScalar(1.25); scene.add(mateR);
const termoR = crearTermo(); termoR.scale.setScalar(1.3); scene.add(termoR);
const TERMO = V3(RI.x - 0.45, MOSTRADOR.y, -1.6);
const MATE_APOYADO = V3(RI.x + 0.45, MOSTRADOR.y, -1.62);
const birome = crearLapicera(); birome.scale.setScalar(1.3); scene.add(birome);
const BOLSA_M = V3(RI.x - 0.02, MOSTRADOR.y, -1.1);
const PAPEL_M = V3(RI.x - 0.2, MOSTRADOR.y + 0.004, -1.3);
const papelSuelto = PAPEL(["Walter", "ya vengo"], { W: 0.17, H: 0.108 }); scene.add(papelSuelto);

// ================= LOS CELULARES =================
// una sola pantalla (canvas 600 x 975) para el celular de Rubén: el de primer término en P1/Q1 (pegado a la cámara) y
// el del atril sobre el mostrador en los planos hacia la puerta
const CW = 600, CH = 975;
const pantR = lienzo(CW, CH, () => {});
const celuR = crearCelular(pantR, C.navy3, 0.085, 0.138); celuR.scale.setScalar(1.75);
const atril = new THREE.Group(); atril.add(celuR); scene.add(atril);
{
  const am = mat(C.navy, 0.5);
  atril.add(mesh(rbox(0.2, 0.014, 0.12, 0.005), am, 0, 0.007, 0.0));
  atril.add(mesh(rbox(0.19, 0.03, 0.02, 0.006), am, 0, 0.022, 0.05));
}
const ATRIL = V3(0.9, MOSTRADOR.y, -1.2);
celuR.position.set(0, 0.13, 0.0); celuR.rotation.x = -0.32;
atril.position.copy(ATRIL); atril.rotation.y = 2.81;
const celuCam = crearCelular(pantR, C.navy3, 0.08, 0.13);
const celuCamG = new THREE.Group(); celuCamG.add(celuCam); camera.add(celuCamG);
celuCamG.position.set(-0.05, -0.004, -0.36); celuCamG.rotation.set(-0.08, 0.12, 0.04);
celuCam.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
// el de Walter (parte 2): funda crema; la pantalla entera es la tarjeta verde "Seña paga" (se lee de lejos)
const pantW = lienzo(400, 650, (x, w, h) => {
  x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "#0b1220"; x.lineWidth = 34; x.lineCap = "round"; x.lineJoin = "round";
  x.beginPath(); x.moveTo(110, 190); x.lineTo(180, 260); x.lineTo(300, 120); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
  x.font = F(900, 120); x.fillText("Seña", w / 2, 390); x.fillText("paga", w / 2, 520);
});
const celuW = crearCelular(pantW, C.cr, 0.08, 0.13); celuW.scale.setScalar(2.1); scene.add(celuW);

function barraEstado(x, w) {
  x.fillStyle = "#efeee5";
  rr(x, w - 110, 26, 60, 26, 6); x.fillRect(w - 48, 33, 6, 12);
  for (let i = 0; i < 4; i++) x.fillRect(40 + i * 16, 50 - i * 7, 10, 8 + i * 7);
}
// la pantalla: el chat genérico con Walter (navy, crema, verde; sin logo de ninguna app). Las burbujas viven debajo
// del encabezado (recorte) y encima de la barra de escribir; cuando no entran, se corren para arriba.
let claveR = "";
function dibujarCeluR(t) {
  const p2 = t >= P2;
  const fase = !p2 ? 1 : t < T.escribiendo ? 1 : t < T.resp1 ? 2 : t < T.tap ? 3 : t < T.pagada ? 4 : t < T.resp2 ? 5 : t < T.b6 ? 6 : t < T.resp3 ? 7 : 8;
  const u = (a) => Math.round(sg(t, a, a + 0.22) * 6) / 6;
  const ent = p2 ? [1, u(T.resp1), u(T.pagada), u(T.resp2), u(T.b6), u(T.resp3)] : [1, 0, 0, 0, 0, 0];
  const ultimo = !p2 ? -9 : [T.resp1, T.pagada, T.resp2, T.b6, T.resp3].filter((v) => v <= t).pop() ?? -9;
  const pts = Math.floor((t - T.escribiendo) / 0.18) % 4;
  const rip = Math.round(sg(t, T.tap, T.tap + 0.18) * 6);
  const scroll = Math.round(eio(sg(t, ultimo, ultimo + 0.25)) * 10) / 10;
  const clave = `${fase}|${ent}|${fase === 2 ? pts : 0}|${rip}|${scroll}`;
  if (clave === claveR) return;
  claveR = clave;
  const { x } = pantR.userData, W = CW, H = CH, TOP = 214, BAR = 110;
  x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, W, H);
  // burbujas (con recorte entre el encabezado y la barra)
  const burbujas = [];
  burbujas.push({ tipo: "cli", lineas: ["¿Me lo guardás?", "Ya vengo."], u: ent[0] });
  if (fase === 2) burbujas.push({ tipo: "esc" });
  if (fase >= 3) burbujas.push({ tipo: "ag", lineas: ["¡Dale, Walter!", "Te lo reservo", "con una seña."], boton: true, u: ent[1] });
  if (fase >= 5) burbujas.push({ tipo: "paga", u: ent[2] });
  if (fase >= 6) burbujas.push({ tipo: "ag", lineas: ["Te espera hasta", "el martes."], u: ent[3] });
  if (fase >= 7) burbujas.push({ tipo: "cli", lineas: ["¿Me guardás un", "dulce de leche?"], u: ent[4] });
  if (fase >= 8) burbujas.push({ tipo: "ag", lineas: ["Reservado. Te", "espera hasta", "el martes."], u: ent[5] });
  const alto = (b) => (b.tipo === "esc" ? 110 : b.tipo === "paga" ? 150 : b.tipo === "cli" ? 230 : 160 + b.lineas.length * 64 + (b.boton ? 104 : 0));
  const total = burbujas.reduce((a2, b2) => a2 + alto(b2), 0);
  const libre = H - BAR - TOP - 30;
  // arriba si entra; si no, pegado abajo (la última burbuja nueva empuja: scroll animado)
  let y = total <= libre ? TOP + 24 + (p2 ? 0 : 70) : H - BAR - 10 - total;
  if (total > libre && scroll < 1) { const prev = total - alto(burbujas[burbujas.length - 1]); y = lerp(prev <= libre ? TOP + 24 : H - BAR - 10 - prev, H - BAR - 10 - total, scroll); }
  x.save(); x.beginPath(); x.rect(0, TOP, W, H - BAR - TOP); x.clip();
  if (!p2) { x.fillStyle = "#cfccbe"; rr(x, W / 2 - 70, TOP + 18, 140, 62, 31); x.fillStyle = "#16243d"; x.font = F(700, 44); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Hoy", W / 2, TOP + 49); }
  for (const b of burbujas) {
    const h = alto(b);
    const s = 0.6 + 0.4 * eo(b.u ?? 1);
    x.save(); x.globalAlpha = Math.min(1, (b.u ?? 1) * 2);
    x.textAlign = "left"; x.textBaseline = "middle";
    if (b.tipo === "cli") {
      x.translate(30, y + h); x.scale(s, s); x.translate(-30, -(y + h));
      x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, y, 536, h - 22, [34, 34, 34, 8]); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.font = F(800, 56); b.lineas.forEach((l, k) => x.fillText(l, 50, y + 62 + k * 70));
      x.fillStyle = "#5a6478"; x.font = '500 44px "IBM Plex Mono", monospace'; x.fillText("10:15", 400, y + h - 52);
    } else if (b.tipo === "esc") {
      x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, y, 200, h - 22, 34); x.fill();
      for (let k = 0; k < 3; k++) { x.fillStyle = k === pts ? "#16243d" : "#9aa3b5"; x.beginPath(); x.arc(76 + k * 48, y + (h - 22) / 2, 15, 0, 7); x.fill(); }
    } else if (b.tipo === "ag") {
      x.translate(W - 24, y + h); x.scale(s, s); x.translate(-(W - 24), -(y + h));
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(46, y, W - 70, h - 22, [34, 34, 8, 34]); x.fill();
      x.fillStyle = "#efeee5"; x.font = F(800, 54); b.lineas.forEach((l, k) => x.fillText(l, 76, y + 60 + k * 64));
      let yy = y + 60 + b.lineas.length * 64;
      if (b.boton) {
        x.fillStyle = "#5ce611"; rr(x, 76, yy - 26, W - 140, 92, 46);
        x.fillStyle = "#0b1220"; x.font = F(900, 50); x.textAlign = "center"; x.fillText("Pagar seña", W / 2 + 6, yy + 20); x.textAlign = "left";
        if (rip > 0 && rip < 6) { const k = rip / 6; x.strokeStyle = `rgba(11,18,32,${0.8 * (1 - k)})`; x.lineWidth = 10; x.beginPath(); x.arc(W / 2 + 6, yy + 20, 30 + k * 140, 0, 7); x.stroke(); }
        yy += 104;
      }
      x.fillStyle = "#5ce611"; x.font = '500 48px "IBM Plex Mono", monospace'; x.fillText("respondido", 76, yy + 4); x.fillText("automáticamente", 76, yy + 54);
    } else if (b.tipo === "paga") {
      x.translate(W / 2, y + h / 2); x.scale(s, s); x.translate(-W / 2, -(y + h / 2));
      const cw = 420, cx0 = (W - cw) / 2;
      x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(cx0, y, cw, h - 24, 30); x.fill(); x.stroke();
      x.strokeStyle = "#0b1220"; x.lineWidth = 14; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx0 + 36, y + 62); x.lineTo(cx0 + 62, y + 88); x.lineTo(cx0 + 104, y + 40); x.stroke();
      x.fillStyle = "#0b1220"; let fz = 56; x.font = F(900, fz); while (x.measureText("Seña paga").width > cw - 150 && fz > 30) { fz -= 2; x.font = F(900, fz); }
      x.fillText("Seña paga", cx0 + 130, y + (h - 24) / 2 + 2);
    }
    x.restore();
    y += h;
  }
  x.restore();
  // la barra de escribir (abajo) y el encabezado navy (arriba), encima de todo
  x.fillStyle = "#e9e7dc"; x.fillRect(0, H - BAR, W, BAR);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#c9c6b8"; x.lineWidth = 4; x.beginPath(); x.roundRect(24, H - BAR + 18, W - 140, 74, 37); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(W - 62, H - BAR + 55, 37, 0, 7); x.fill();
  x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(W - 76, H - BAR + 38); x.lineTo(W - 44, H - BAR + 55); x.lineTo(W - 76, H - BAR + 72); x.closePath(); x.fill();
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, TOP - 6); barraEstado(x, W);
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(92, 138, 46, 0, 7); x.fill();
  x.fillStyle = "#16243d"; x.font = F(900, 54); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("W", 92, 142);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 66); x.fillText("Walter", 160, 140);
  x.fillStyle = "#5ce611"; x.fillRect(0, TOP - 8, W, 8);
  pantR.needsUpdate = true;
}

// ================= GLOBOS DE DIÁLOGO (pegados a la cámara, en píxeles de pantalla) =================
const PXK = 1000;
function crearGlobo(lineas, px = 74) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const anchoTxt = Math.max(...lineas.map((l) => med.measureText(l).width)) / 2;
  const W = Math.round(anchoTxt + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.95);
  const tex = lienzo(W * 2, H * 2, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#0b1220"; x.font = F(800, px * 2); x.textAlign = "center"; x.textBaseline = "middle";
    lineas.forEach((l, i) => x.fillText(l, w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.2 + px * 0.08));
  });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: C.navy });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: C.cr });
  const sombraM = new THREE.MeshBasicMaterial({ color: 0x050a14 });
  const w = W / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sombra.position.set(10 / PXK, -12 / PXK, -0.016); g.add(sombra);
  const borde = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); borde.position.z = -0.012; g.add(borde);
  const caja = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja);
  const cola = new THREE.Group(); g.add(cola);
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(76 / PXK, 100 / PXK), sombraM); cs.position.set(10 / PXK, -6 / PXK, -0.017); cola.add(cs);
  const cb = new THREE.Mesh(tri(76 / PXK, 100 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; cola.add(cb);
  const cc = new THREE.Mesh(tri(52 / PXK, 76 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; cola.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; borde.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja.userData.orden = 4;
  g.userData = { W, H, cola };
  return pegarACamara(g, camera, 40);
}
const _v = new THREE.Vector3();
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0) {
  g.visible = s > 0.003;
  if (!g.visible) return;
  const halfH = Math.tan((camera.fov * D2R) / 2), k = (2 * halfH) / 1920;
  const { W, H, cola } = g.userData;
  cx = cl(cx, W / 2 + 50, 1030 - W / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s);
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (W / 2), -0.62, 0.62);
  cola.position.set((lado * W) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
  const ang = Math.atan2(ox - (cx + (lado * W) / 2), oy - (cy + H / 2));
  cola.rotation.z = cl(ang, -0.9, 0.9);
}
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const _cab = new THREE.Vector3();
function cabezaEnPantalla(p, dy = 0.0) { p.cabeza.getWorldPosition(_cab); _cab.y += dy; return enPantalla(_cab); }
const GL = {
  yerba: crearGlobo(["Rubén,", "¿tenés yerba?"], 76),
  cuando: crearGlobo(["¿Y cuándo viene?"], 78),
  dulce: crearGlobo(["¡Guardame un", "dulce de leche!"], 74),
  vengo: crearGlobo(["¡Ya vengo!"], 84),
  walter: crearGlobo(["¿Walter?"], 88),
};

// ================= CONTADOR "Guardados: N" (pegado a la cámara, arriba) =================
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 5, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 2 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g;
};
const contador = new THREE.Group();
const NUMS = {};
const tacha = new THREE.Group();
const conSena = new THREE.Group();
const NX = 0.29;
{
  const W = 0.86, H = 0.24;
  const tex = lienzo(1720, 480, (x, w, h) => {
    x.fillStyle = "#0b1220"; rr(x, 0, 0, w, h, 110);
    x.strokeStyle = "#5ce611"; x.lineWidth = 22; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 90); x.stroke();
    x.fillStyle = "#efeee5"; x.font = F(800, 150); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("Guardados:", 90, h / 2 + 8);
  });
  const nav = mat(C.navy, 0.5);
  const placa = mesh(rbox(W, H, 0.05, 0.06, 4), [nav, nav, nav, nav, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.25 }), nav]);
  placa.userData.orden = 0; contador.add(placa);
  const rojo = new THREE.MeshStandardMaterial({ color: 0xe0786d, roughness: 0.45, emissive: C.red, emissiveIntensity: 0.4 });
  const verde = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.4, emissive: C.g, emissiveIntensity: 0.35 });
  for (let n = 3; n <= 28; n++) { if (n > 3 && n < 11) continue; const m = mesh(textoGeo(String(n), 0.13, 0.008), rojo, NX, 0.0, 0.05); m.userData.orden = 2; contador.add(m); NUMS[n] = m; }
  NUMS.v3 = mesh(textoGeo("3", 0.13, 0.008), verde, NX, 0.0, 0.05); NUMS.v3.userData.orden = 2; contador.add(NUMS.v3);
  const raya = mesh(rbox(0.2, 0.026, 0.02, 0.012), mat(C.red, 0.5, { emissive: C.red, emissiveIntensity: 0.3 }), 0, 0, 0); raya.userData.orden = 3; tacha.add(raya);
  tacha.position.set(NX, 0.0, 0.08); tacha.rotation.z = 0.18; contador.add(tacha);
  const ts = lienzo(1100, 260, (x, w, h) => {
    x.fillStyle = "#5ce611"; rr(x, 0, 0, w, h, 130); x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.beginPath(); x.roundRect(8, 8, w - 16, h - 16, 122); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 128); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("con seña", w / 2 + 50, h / 2 + 8);
    x.strokeStyle = "#0b1220"; x.lineWidth = 26; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(120, 132); x.lineTo(165, 177); x.lineTo(245, 87); x.stroke();
  });
  const pill = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.13), new THREE.MeshBasicMaterial({ map: ts, transparent: true })); pill.userData.orden = 4; conSena.add(pill);
  conSena.position.set(0.12, -0.2, 0.06); contador.add(conSena);
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
// el número en t: [n, desde (el último cambio; 99 = sin animación)]
function numeroEn(t) {
  if (t >= P2) return t >= T.c3s + 0.2 ? ["v3", T.c3s + 0.2] : [28, 99];
  if (t >= T.c28) return [28, T.c28];
  if (t >= T.p3) return [27, 99];
  if (t >= T.rodillo[0]) {
    const u = sg(t, T.rodillo[0], T.rodillo[1]), k = 1 - Math.pow(1 - u, 1.6), n = Math.min(27, 12 + Math.floor(k * 15.999));
    const desde = T.rodillo[0] + (T.rodillo[1] - T.rodillo[0]) * (1 - Math.pow(1 - (n - 12) / 15.999, 1 / 1.6));
    return [n, desde];
  }
  if (t >= T.c11) return [11, T.c11];
  return [3, 99];
}

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov, modo]. Entre planos hay corte seco;
// dentro de un plano, Catmull-Rom continua (modo "e" = tramo con ease propio: el push-in rápido).
const kP1 = (t0, t1, push = false) => push
  ? [[t0, RI.x - 0.2, 1.88, 0.3, RI.x - 0.3, 1.1, RI.z, 50], [T.levanta - 0.2, RI.x - 0.2, 1.86, 0.22, RI.x - 0.3, 1.1, RI.z, 50], [T.levanta + 0.25, RI.x - 0.06, 1.48, -0.12, RI.x + 0.02, 1.08, RI.z, 47], [t1, RI.x - 0.06, 1.47, -0.16, RI.x + 0.02, 1.07, RI.z, 47]]
  : [[t0, RI.x - 0.2, 1.66, 0.3, RI.x - 0.3, 1.15, RI.z, 50], [t1, RI.x - 0.2, 1.64, 0.15, RI.x - 0.3, 1.15, RI.z, 50]];
// el estante GUARDADOS de frente, entero, con el cartel por debajo de los mensajes del chat (P2)
const EST = [GX, 1.95, GZ + 3.0, GX, 1.95, GZ, 54];
// vista hacia la puerta (P3, P6, Q3, Q5): desde atrás del mostrador, al costado de Rubén (fuera de cuadro)
const PUER = [1.4, 1.75, -2.65, 0.2, 1.12, 1.4, 54];
const kPuer = (t0, t1, d = 0.06) => [[t0, ...PUER], [t1, PUER[0], PUER[1], PUER[2] + d, ...PUER.slice(3)]];
// el hueco de la yerba de cerca (P3b, Q2b)
const HUE0 = [-0.22, 1.42, -0.6, HUECO.x, 1.27, GZ, 46], HUE1 = [-0.26, 1.36, -1.25, HUECO.x, 1.27, GZ, 46];
// de frente: Rubén con la bolsa (P6b), el guiño y el general que se abre (Q6)
const FRE = [0.2, 1.45, 0.55, 0.3, 1.1, RI.z, 50];
const FRE2 = [-0.1, 1.55, 0.15, 0.32, 1.05, RI.z, 46];
// primer plano de Rubén de frente (P5, Q4): el estante GUARDADOS queda fuera de cuadro
const PP = (z, dx = 0.0) => [RI.x + dx, 1.45, z, RI.x - 0.08, 1.27, RI.z, 40];
const PLANOS = [
  ["P1", 0, kP1(0, T.p2, true)],
  // P2 · el estante GUARDADOS se llena: entero desde el corte, dolly atrás suave
  ["P2", T.p2, [[T.p2, ...EST], [T.p3, EST[0], EST[1] + 0.02, EST[2] + 0.4, EST[3], EST[4] - 0.02, EST[5], 54]]],
  // P3 · Graciela llega al mostrador (más cerca que la vista de la puerta: entra desde el fondo y se acerca)
  ["P3", T.p3, [[T.p3, 1.38, 1.7, -2.55, 0.85, 1.32, 0.0, 46], [T.p3b, 1.38, 1.68, -2.5, 0.95, 1.32, -0.3, 46]]],
  // P3b · el hueco de la yerba con AGOTADA, push-in corto
  ["P3b", T.p3b, [[T.p3b, ...HUE0], [T.p3c, ...HUE1]]],
  // P3c · vista de la puerta: Graciela gira la cabeza hacia GUARDADOS (hacia cámara)
  ["P3c", T.p3c, [[T.p3c, 1.38, 1.68, -2.5, 0.98, 1.34, -0.4, 44], [T.p4, 1.38, 1.67, -2.45, 1.0, 1.34, -0.45, 44]]],
  // P4 · zambullida: del estante (llenando el ancho) a la bolsa de Walter
  ["P4", T.p4, [[T.p4, GX - 0.15, 1.45, -0.75, GX - 0.15, 1.3, GZ, 50], [T.dive[0] + 0.35, GX - 0.3, 1.2, -1.4, GX - 0.35, 1.0, GZ, 47], [T.dive[1], GX - 0.47, 0.9, -2.3, GX - 0.47, 0.84, GZ, 42], [T.p5, GX - 0.47, 0.89, -2.36, GX - 0.47, 0.84, GZ, 42]]],
  ["P5", T.p5, [[T.p5, ...PP(0.25)], [T.pushIn[0], ...PP(0.18), "e"], [T.pushIn[1], ...PP(-0.28)], [T.p6, ...PP(-0.33)]]],
  ["P6", T.p6, kPuer(T.p6, T.p6b, 0.1)],
  ["P6b", T.p6b, [[T.p6b, ...FRE], [P1, FRE[0] + 0.03, FRE[1] - 0.02, FRE[2] - 0.12, ...FRE.slice(3)]]],
  // ---- parte 2 (los mismos encuadres: el callback se ve) ----
  ["Q1", P2, kP1(P2, T.q2)],
  // Q2 · el estante ordenado, push-in a las bolsas con seña (las etiquetas se leen)
  ["Q2", T.q2, [[T.q2, GX, 1.95, GZ + 3.0, GX, 1.95, GZ, 54], [T.c3s + 0.45, GX - 0.05, 1.7, -1.0, GX - 0.1, 1.45, GZ, 52], [T.vence - 0.05, GX - 0.18, 1.2, -1.15, GX - 0.18, 1.1, GZ, 50], [T.q2b, GX - 0.18, 1.19, -1.19, GX - 0.18, 1.1, GZ, 50]]],
  // Q2b · la yerba cae en su hueco (el mismo encuadre de P3b)
  ["Q2b", T.q2b, [[T.q2b, ...HUE0], [T.q3, ...HUE1]]],
  ["Q3", T.q3, kPuer(T.q3, T.q4)],
  ["Q4", T.q4, [[T.q4, ...PP(0.25)], [T.q5, ...PP(0.0)]]],
  ["Q5", T.q5, kPuer(T.q5, T.q6)],
  ["Q6", T.q6, [[T.q6, ...FRE2], [T.guino + 0.4, FRE2[0], FRE2[1], FRE2[2] - 0.04, ...FRE2.slice(3)], [DUR, FRE2[0] - 0.05, FRE2[1], FRE2[2] + 0.3, FRE2[3], 0.92, FRE2[5], 47]]],
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
  const mano = Math.sin(t * 0.9) * 0.005;
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.004, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const MATE_D = { manoD: [-0.25, 0.4, 0.32], codoD: [-1, -0.6, -0.2], dedoD: 0 };
// el mate a la altura del pecho (cuando habla y en los planos de frente: la bombilla lejos del bigote)
const MATE_P = { manoD: [-0.3, 0.3, 0.36], codoD: [-1, -0.6, -0.2], dedoD: 0 };
const APOYA_I = { manoI: [0.22, 0.32, 0.42], codoI: null, dedoI: 0 };
// ---- Rubén ----
const RK = [
  // P1: escribe el papelito inclinado sobre el mostrador; lo levanta a cámara; lo pega en la bolsa
  [0, { x: RI.x, z: RI.z, giro: 0, inclina: 0.04, ...aC(-0.05, 0.22), ...CARA.sonrisa, ojos: { x: 0, y: -0.85, abiertos: 0.9, feliz: 0.25 } }],
  [T.levanta + 0.12, { inclina: 0.02, ...aC(0, 0.02), ojos: { x: 0, y: 0.05, abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.95, ancho: 1.15 } }, 0.25],
  [T.pega + 0.2, { inclina: 0.06, ...aC(-0.25, 0.12), ojos: { x: -0.5, y: -0.4 } }, 0.2],
  [T.p2 - 0.25, { ...aC(0.05, 0.02), ojos: { x: 0, y: 0.05 } }, 0.25],
  // P2 (fuera de cuadro): ya con el mate
  [T.p2 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0, ...MATE_D, ...APOYA_I, ...aC(0.3, 0.02), ...CARA.sonrisa, ojos: { x: 0.35, y: 0, abiertos: 1, feliz: 0.25 } }, 0.001],
  // P3: mira a Graciela que entra
  [T.b1 + 0.2, { ...aC(0.3, 0.0), ...CARA.esperanza, ojos: { x: 0.35 } }, 0.25],
  // P3c: los dos giran la cabeza a GUARDADOS (a su izquierda)
  [T.p3c - 0.001, { giro: -0.35, ...aC(-0.35, 0.04), ...CARA.incredula, ojos: { x: -0.4, abiertos: 0.8 } }, 0.001],
  [T.giraCab[1], { giro: 0.45, ...aC(0.75, 0.05), ...CARA.resignado, ojos: { x: 0.6, abiertos: 0.6 } }, T.giraCab[1] - T.giraCab[0]],
  // P5: corte; todavía mira a GUARDADOS (a su izquierda); gira la cabeza lento a cámara; "Ya viene, Graciela."
  [T.p5 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0, ...MATE_P, ...APOYA_I, ...aC(0.75, 0.04), ojos: { x: 0.7, y: 0, abiertos: 0.62, tension: 0.35, feliz: 0 }, cejas: { alto: 0.2, ang: 0.6, asim: 0 }, boca: { sonrisa: -0.45, abierta: 0, ancho: 0.95 } }, 0.001],
  [T.giraCam[1], { ...aC(0.0, 0.02, 0.02), ojos: { x: 0, y: 0.04, abiertos: 0.62, tension: 0.35 } }, T.giraCam[1] - T.giraCam[0]],
  [T.voz1 + 1.6, { cejas: { alto: 0.3, ang: 0.7 } }, 0.3],
  // P6 (fuera de cuadro salvo el brazo con la bolsa): mira la puerta; levanta la bolsa hacia Walter
  [T.p6 - 0.001, { x: RI.x, z: RI.z, giro: 0.1, inclina: 0, ...MATE_P, manoI: [0.28, -0.05, 0.08], codoI: null, ...aC(0.0, 0.02), ...CARA.esperanza, ojos: { x: 0, y: 0, abiertos: 1 } }, 0.001],
  // P6b: de frente, la bolsa apoyada en el mostrador, mira a cámara
  [T.p6b - 0.001, { giro: 0.2, ...MATE_P, ...aC(-0.45, 0.03), ojos: { x: -0.5, y: 0.05, abiertos: 0.62, tension: 0.4 }, cejas: { alto: 0.25, ang: 0.75 }, boca: { sonrisa: -0.55, abierta: 0, ancho: 0.9 } }, 0.001],
  // ---- parte 2 ----
  [P2 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0, paso: 0, ...MATE_D, ...APOYA_I, ...aC(-0.12, 0.04), ...CARA.sonrisa, ojos: { x: -0.2, y: 0.1, abiertos: 1, feliz: 0.35 }, cejas: { alto: 0.25, ang: 0 }, boca: { sonrisa: 0.75 } }, 0.001],
  [T.q3 - 0.001, { x: RI.x, z: RI.z, giro: 0.0, ...MATE_P, ...APOYA_I, ...aC(0.1, 0), ...CARA.sonrisa, ojos: { x: 0.1, abiertos: 1, feliz: 0.3 } }, 0.001],
  [T.q4 - 0.001, { x: RI.x, z: RI.z, giro: 0, ...MATE_D, ...APOYA_I, ...aC(0.0, 0.03), ...CARA.sonrisa, ojos: { x: 0, y: 0.03, abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.5 } }, 0.001],
  [T.sorbo2[0] + 0.15, { ojos: { abiertos: 0, feliz: 0.6 } }, 0.15],
  [T.baja, { ...MATE_P, ojos: { abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55 }, cejas: { alto: 0.25 } }, 0.25],
  [T.q5 - 0.001, { x: RI.x, z: RI.z, giro: 0.1, ...MATE_P, ...APOYA_I, ...aC(0.0, 0.02), ...CARA.sonrisa, ojos: { x: 0, abiertos: 1, feliz: 0.3 }, boca: { sonrisa: 0.5 } }, 0.001],
  // Q6: de frente; levanta el mate (a la altura del pecho, hacia cámara) y guiña
  [T.q6 - 0.001, { giro: 0.2, ...MATE_P, ...aC(-0.4, 0.0), ...CARA.sonrisa, ojos: { x: -0.45, abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.9, ancho: 1.1 } }, 0.001],
  [T.guino - 0.05, { manoD: [-0.26, 0.36, 0.44], codoD: [-1, -0.5, -0.1] }, 0.25],
  [T.guino + 0.08, { ojos: { guiño: -1, feliz: 0.45 }, cejas: { asim: 0.7 }, boca: { sonrisa: 1, ancho: 1.15 } }, 0.12],
  [T.guino + 0.55, { ojos: { guiño: 0, feliz: 0.35 }, cejas: { asim: 0 } }, 0.15],
  [T.guino + 0.9, { ...aC(-0.1, 0.02), ...MATE_P, ojos: { x: 0.3 } }, 0.4],
];
// ---- Graciela ----
const G_GIRO = Math.atan2(RI.x - G0.x, RI.z - G0.z);
const GK = [
  [0, { x: 0.55, z: 0.45, giro: Math.PI - 0.3, paso: 1, ...BRAZOS.costado, ...aC(0, -0.05), ...CARA.neutra }],
  [T.entraG[1] - 0.2, { x: G0.x - 0.05, z: G0.z + 0.25 }, T.entraG[1] - T.entraG[0] - 0.2, (u) => u],
  [T.entraG[1], { x: G0.x, z: G0.z, giro: G_GIRO, paso: 0 }, 0.2],
  [T.b1 + 0.05, { ...aC(0, -0.03), ...CARA.sonrisa, boca: { sonrisa: 0.6, abierta: 0.2 } }, 0.15],
  [T.b1 + 0.35, { boca: { abierta: 0 } }, 0.15],
  [T.p3c - 0.001, { ...aC(0.1, 0.02), ojos: { x: 0.1 }, cejas: { alto: 0.4, ang: 0.5 } }, 0.001],
  [T.giraCab[1], { ...aC(-0.85, 0.0), ojos: { x: -0.8 }, ...CARA.resignado, ojos: { x: -0.8, abiertos: 0.7 } }, T.giraCab[1] - T.giraCab[0]],
  [T.p6 - 0.001, { x: 1.9, z: -0.7, giro: G_GIRO, paso: 0, ...BRAZOS.costado, ...aC(0.0, 0.05), ...CARA.neutra, cejas: { alto: 0.4, ang: 0.6 }, boca: { sonrisa: -0.2 } }, 0.001],
  [T.giran + 0.25, { ...aC(0.75, -0.05), ...CARA.esperanza, ojos: { x: 0.7 } }, 0.25],
  [T.seVa[1] + 0.3, { ...aC(0.0, 0.08), ...CARA.resignado, ojos: { x: 0, abiertos: 0.7 } }, 0.3],
  [T.p6b - 0.001, { x: 1.2, z: -0.86, giro: Math.atan2(RI.x - 1.2, RI.z + 0.86) }, 0.001],
  [T.q3 - 0.001, { x: 1.9, z: -0.7, giro: G_GIRO, paso: 0, ...BRAZOS.costado, manoD: [-0.18, 0.32, 0.36], codoD: [-1, -0.6, -0.1], ...aC(0, 0.05), ...CARA.sonrisa }, 0.001],
  [T.b5 - 0.05, { ...aC(0.7, -0.05), ...CARA.sorpresa, ojos: { x: 0.7 } }, 0.25],
  [T.q5 - 0.001, { x: 1.9, z: -0.7, giro: G_GIRO + 0.4, ...aC(0.5, 0.0), ...CARA.sorpresa, ojos: { x: 0.6 }, boca: { sonrisa: 0.3, abierta: 0.25 } }, 0.001],
  [T.q6 - 0.001, { x: G0.x, z: G0.z, giro: G_GIRO, ...aC(0, 0.03), ...CARA.sonrisa, ojos: { x: 0 }, boca: { sonrisa: 0.7, abierta: 0 } }, 0.001],
  [T.guino + 0.5, { giro: 2.4, paso: 1, ...aC(0, 0), ...CARA.sonrisa }, 0.3],
  [DUR, { x: 1.7, z: 0.0 }, DUR - T.guino - 0.5, (u) => u],
];
// ---- Walter ----
const W_GIRO = Math.atan2(RI.x - W0.x, RI.z - W0.z);
const PERDON = { ...CARA.esperanza, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.0 }, cejas: { alto: 0.7, ang: 0.6 } };
const WK = [
  // P6: viene por la vereda, abre y asoma por la puerta (la mano en el marco); pide y se va
  [0, { x: WP.x + 0.3, z: FZ + 1.4, giro: Math.PI - 0.3, paso: 1, ...BRAZOS.costado, ...aC(0, 0), ...PERDON }],
  [T.asoma[1], { x: WP.x, z: WP.z, giro: Math.PI, paso: 0, inclina: 0.18, ladea: 0.06, manoI: [0.36, 0.95, 0.12], codoI: [1, -0.2, -0.2] }, T.asoma[1] - T.asoma[0], (u) => eo(u)],
  [T.b3 + 0.05, { boca: { sonrisa: 0.7, abierta: 0.3 }, cabeza: { asiente: -0.08 } }, 0.12],
  [T.b4 + 0.05, { boca: { sonrisa: 0.9, abierta: 0.25 }, ...BRAZOS.costado, manoD: [-0.42, 0.9, 0.2], codoD: [-1, -0.2, -0.2] }, 0.15],
  [T.seVa[1], { x: WP.x + 0.35, z: FZ + 0.85, giro: 0.3, inclina: 0, paso: 1, ...BRAZOS.costado }, T.seVa[1] - T.seVa[0]],
  [T.p6b, { x: WP.x + 0.9, z: FZ + 2.4 }, T.p6b - T.seVa[1], (u) => u],
  // Q3: entra con el celular en alto ("Seña paga"), va al mostrador
  [T.q3 - 0.001, { x: WP.x, z: FZ + 0.4, giro: Math.PI, paso: 1, inclina: 0, ...BRAZOS.costado, manoD: [-0.4, 0.45, 0.34], codoD: [-1, -0.3, 0.1], ...aC(0, -0.05), ...CARA.feliz }, 0.001],
  [T.entraW[1], { x: W0.x, z: W0.z, giro: W_GIRO, paso: 0 }, T.entraW[1] - T.q3, (u) => u],
  [T.alcanza + 0.3, { manoI: [0.2, 0.32, 0.4], codoI: [1, -0.6, -0.2] }, 0.25],
  [T.b5 + 0.1, { ...aC(-0.5, 0), ojos: { x: -0.5 }, ...PERDON }, 0.25],
  // Q5: en la puerta, con su bolsa: escribe en su celular (al pecho, mirándolo); pulgar arriba con la otra mano
  [T.q5 - 0.001, { x: WP.x - 0.05, z: WP.z - 0.15, giro: Math.PI - 0.25, paso: 0, inclina: 0.05, ...BRAZOS.costado, manoD: [-0.1, 0.4, 0.32], codoD: [-1, -0.6, -0.1], manoI: [0.24, 0.2, 0.2], codoI: [1, -0.6, -0.1], ...aC(0, 0.35), ...PERDON, ojos: { y: -0.85, abiertos: 0.9 } }, 0.001],
  [T.pulgar, { ...aC(0, 0.0), ...CARA.feliz, ojos: { y: 0 }, manoI: [0.32, 0.62, 0.3], codoI: [1, -0.5, -0.1] }, 0.2],
  [T.q6, { manoI: [0.3, 0.6, 0.3] }, 0.2],
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
const bocaVoz = (p, t, t0, env) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * 0.7); }
};
const MATE_OFF = V3(0.11, -0.09, 0.02);
const PUNTA = V3(0, 0.31 * 1.25, -0.045 * 1.25);
// dónde está la bolsa de Walter en t (null = en el estante)
const BOLSA_P6B = V3(RI.x + 0.4, MOSTRADOR.y, RI.z + 0.32);
const BOLSA_P6 = V3(RI.x + 0.16, MOSTRADOR.y, RI.z + 0.3);   // en P6, pegada a Rubén (fuera del cuadro hacia la puerta)
const bolsaP6 = (t) => (t >= T.p6b ? BOLSA_P6B : BOLSA_P6);
function bolsaWalterEn(t) {
  if (t < T.p2) return "mostrador";
  if (en(t, T.p6, P1)) return "ruben";
  if (en(t, T.q3, T.alcanza + 0.3)) return "ruben";
  if (t >= T.q3 && t >= T.alcanza + 0.3) return "walter";
  return null;
}

function ponerPersonajes(t, plano) {
  // ---- Rubén ----
  let pr = poseEn(t, RK);
  const gR = pr.giro;
  // P1: escribe (la birome en la derecha sobre el papel, la izquierda sujeta el papel), lo levanta, lo pega en la bolsa
  if (t < T.p2) {
    const lev = eio(sg(t, T.levanta - 0.15, T.levanta + 0.1)) * (1 - eio(sg(t, T.pega - 0.1, T.pega + 0.12)));
    const peg = eio(sg(t, T.pega - 0.1, T.pega + 0.12));
    const wig = Math.sin(t * 38) * 0.012 * (t > T.escribe[0] && t < T.escribe[1] ? 1 : 0), wx = sg(t, T.escribe[0], T.escribe[1]) * 0.08;
    const dE = V3(PAPEL_M.x - 0.03 + wx, PAPEL_M.y + 0.05 + Math.abs(wig) * 0.5, PAPEL_M.z + wig);
    const iE = V3(PAPEL_M.x - 0.13, PAPEL_M.y + 0.03, PAPEL_M.z - 0.02);
    const dL = V3(RI.x - 0.12, 1.12, RI.z + 0.75), iL = V3(RI.x + 0.12, 1.12, RI.z + 0.75);
    const bf = BOLSA_M.clone().add(V3(0, 0.13, 0.085));
    const dP = bf.clone().add(V3(-0.1, 0.02, 0.02)), iP = bf.clone().add(V3(0.1, 0.02, 0.02));
    const mez = (a, b, c) => a.clone().lerp(b, lev).lerp(c, peg);
    pr = manoA(ruben, { ...pr }, "D", mez(dE, dL, dP)); pr.codoD = [-1, -0.6, -0.1];
    pr = manoA(ruben, { ...pr }, "I", mez(iE, iL, iP)); pr.codoI = [1, -0.6, -0.1];
    pr.dedoD = 0; pr.dedoI = 0;
  }
  // sorbos: la punta de la bombilla delante de la boca (Q1 con los ojos abiertos, Q4 con los ojos cerrados)
  for (const [a, b] of [[T.sorbo1 - 0.15, T.sorbo1 + 0.45], [T.sorbo2[0] - 0.15, T.sorbo2[1]]]) {
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
  bocaVoz(pr, t, T.voz1, VOZ1_ENV);
  bocaVoz(pr, t, T.voz2, VOZ2_ENV);
  // P6: la bolsa en la mano izquierda: sobre el mostrador, la levanta hacia Walter y la deja en el aire
  if (en(t, T.p6b, P1)) {
    const up = eio(sg(t, T.levanta2, T.levanta2 + 0.3));
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const baja = V3(RI.x + 0.3, MOSTRADOR.y + 0.03, RI.z + 0.42);
    const arriba = ruben.cuerpo.localToWorld(V3(0.24, 0.62, 0.42));
    // P6b: la bolsa ya apoyada en el mostrador, la mano agarrando el borde de arriba
    void baja; void arriba; void up;
    const objetivo = bolsaP6(t).clone().add(V3(0, 0.29, 0));
    pr = manoA(ruben, { ...pr }, "I", objetivo); pr.codoI = [1, -0.5, -0.2];
  }
  // Q3: le alcanza la bolsa a Walter (mano izquierda adelante, por encima del mostrador)
  if (en(t, T.q3, T.alcanza + 0.3)) {
    const u = eio(sg(t, T.alcanza - 0.3, T.alcanza));
    const a0 = V3(RI.x + 0.25, MOSTRADOR.y + 0.03, RI.z + 0.42), a1 = V3(RI.x + 0.15, 1.05, RI.z + 0.8);
    pr = manoA(ruben, { ...pr }, "I", a0.lerp(a1, u)); pr.codoI = [1, -0.5, -0.2];
  }
  ruben.poner(pr);
  // ---- Graciela ----
  const pg = poseEn(t, GK);
  // P6: dos palmaditas en el antebrazo izquierdo de Rubén (el de la bolsa en el aire)
  if (en(t, T.palmas[0] - 0.3, P1)) {
    const u = eio(sg(t, T.palmas[0] - 0.3, T.palmas[0] - 0.05));
    graciela.poner(pg);
    const codo = manoMundo(ruben, "I", V3()).add(V3(-0.04, -0.12, -0.14));
    const pal = Math.max(pulso(t, T.palmas[0], 0.16), pulso(t, T.palmas[0] + 0.22, 0.16)) * 0.04;
    const p1 = manoA(graciela, { ...pg, inclina: 0.18 }, "I", codo.add(V3(0, pal, 0)));
    pg.manoI = pg.manoI.map((v, i) => lerp(v, p1.manoI[i], u)); pg.codoI = [1, -0.4, -0.2]; pg.inclina = lerp(pg.inclina, 0.18, u);
  }
  graciela.poner(pg);
  // ---- Walter ----
  const pw = poseEn(t, WK);
  if (en(t, T.alcanza, T.q4)) {
    const u = eio(sg(t, T.alcanza, T.alcanza + 0.3));
    walter.poner(pw);
    const obj = V3(RI.x + 0.15, 1.05, RI.z + 0.86);
    const p1 = manoA(walter, { ...pw }, "I", obj);
    const k = u * (1 - eio(sg(t, T.alcanza + 0.35, T.alcanza + 0.6)));
    pw.manoI = pw.manoI.map((v, i) => lerp(v, p1.manoI[i], k));
    pw.codoI = [1, -0.5, -0.2];
  }
  walter.poner(pw);
  // visibilidad por plano (los que no están en cuadro no tapan la cámara)
  ruben.raiz.visible = !["P3b", "Q2b"].includes(plano);
  graciela.raiz.visible = ["P3", "P3c", "P6b", "Q6"].includes(plano);
  walter.raiz.visible = ["P6", "Q3", "Q5"].includes(plano);
}

// ================= ESCENA EN EL TIEMPO =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3();
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  ponerCamara(t);
  const plano = planoActual;
  ponerPersonajes(t, plano);
  for (const per of [ruben, graciela, walter]) per.ojoLejano(camera.position);
  relleno.position.copy(camera.position).add(V3(0.4, 0.8, 0)); relleno.target.position.copy(camera.position).add(camera.getWorldDirection(_a).multiplyScalar(3));

  // ---- la puerta: se abre cuando entra o asoma alguien ----
  {
    const abre = (a, b) => eio(sg(t, a - 0.25, a)) * (1 - eio(sg(t, b, b + 0.3)));
    hoja.rotation.y = -1.15 * Math.max(abre(T.campana1 + 0.05, T.entraG[1] - 0.1), abre(T.campana2 + 0.05, T.campana3 - 0.05), abre(T.campana4 + 0.05, T.entraW[1]), t >= T.q5 ? 1 : 0);
  }
  // ---- el estante GUARDADOS ----
  {
    const k = flechaEn(t);
    ES.curvar(k);
    for (const o of GUARD) {
      const y0 = ES.ys[o.tabla] + 0.0225 - ES.flecha(k, o.xl);
      let vis;
      if (!parte2) {
        vis = t >= o.t;
        const e = o.id === "walter" ? 1 : bk(sg(t, o.t, o.t + 0.22));
        const sq = o.id === "walter" ? 0 : pulso(t, o.t + 0.16, 0.16) * 0.14;
        const s = Math.max(0.001, e);
        o.g.scale.set(s * (1 + sq), s * (1 - sq), s);
        o.g.position.y = y0 + (o.id === "walter" ? pulso(t, T.dejaW, 0.22) * 0.03 : 0);
      } else {
        vis = EN_P2.has(o.id);
        o.g.scale.set(1, 1, 1); o.g.position.y = y0;
      }
      o.g.visible = vis;
      o.g.position.x = o.xl; o.g.position.z = ZB;
      o.g.rotation.set(0, 0, -k * 1.0 * Math.cos(Math.PI * (o.xl / ES.W + 0.5)));
      if (o.p) o.p.visible = !parte2;
      if (o.e) o.e.visible = parte2;
    }
    vencio.visible = parte2 && t >= T.vence;
    if (gGorra.e) gGorra.e.visible = parte2 && t < T.vence;
    if (vencio.visible) { const e = bk(sg(t, T.vence, T.vence + 0.22)); vencio.scale.setScalar(Math.max(0.001, 0.6 + 0.4 * e)); }
    gGorra.obj.userData.yerba.visible = !parte2 || t < T.vuela[0];
    const u = parte2 ? 0 : eo(sg(t, T.tela[0], T.tela[1]));
    tela.visible = u > 0.01; tela2.visible = u > 0.01 && bolsaWalterEn(t) === null;
    tela.userData.crecer(u); tela2.userData.crecer(sg(u, 0.3, 1));
    motas.forEach((m, i) => {
      m.visible = u > 0.5 && bolsaWalterEn(t) === null;
      const f = (t * 0.06 + i * 0.137) % 1;
      m.position.set(-0.13 + ((i * 0.071) % 0.26), 0.42 - f * 0.2 + Math.sin(t * 0.9 + i) * 0.01, 0.1 + (i % 3) * 0.015);
    });
  }
  // ---- la bolsa de Walter fuera del estante: en el mostrador (P1), en las manos (P2 hasta dejarla, P6, Q3, Walter) ----
  {
    const donde = bolsaWalterEn(t);
    const b = gW.g;
    if (donde) {
      if (b.parent !== scene) scene.add(b);
      b.visible = donde !== "walter" || walter.raiz.visible; b.scale.setScalar(1); b.rotation.set(0, 0, 0);
      if (donde === "mostrador") { b.position.copy(BOLSA_M); b.rotation.y = -0.08; }
      else if (donde === "ruben" && en(t, T.p6, P1)) { b.position.copy(bolsaP6(t)); b.rotation.y = 0.2; }
      else if (donde === "ruben") { const pi = manoMundo(ruben, "I", _a); b.position.copy(pi).add(V3(0.0, -0.22, 0.04)); b.rotation.y = 0.25; }
      else if (donde === "walter") { const pi = manoMundo(walter, "I", _a); b.position.copy(pi).add(V3(0.0, -0.2, 0.0)); b.rotation.y = walter.raiz.rotation.y; }
      if (gW.p) gW.p.visible = !parte2 && (t >= T.pega || donde !== "mostrador");
      if (gW.e) gW.e.visible = parte2;
    } else if (b.parent !== estante) estante.add(b);
  }
  // ---- el papelito suelto (P1) y la birome ----
  {
    papelSuelto.visible = t < T.pega + 0.02;
    if (papelSuelto.visible) {
      const lev = eio(sg(t, T.levanta - 0.15, T.levanta + 0.1));
      const peg = eio(sg(t, T.pega - 0.1, T.pega + 0.02));
      const pi = manoMundo(ruben, "I", _a), pd = manoMundo(ruben, "D", _b);
      const enMano = pi.clone().add(pd).multiplyScalar(0.5).add(V3(0, 0.12, 0.05));
      papelSuelto.position.copy(PAPEL_M).lerp(enMano, lev);
      papelSuelto.rotation.set(lerp(-Math.PI / 2, -0.05, Math.max(lev, peg)), 0, 0);
    }
    birome.visible = plano === "P1";
    if (birome.visible) {
      if (t < T.escribe[1] + 0.15) { const pd = manoMundo(ruben, "D", _a); birome.position.copy(pd).add(V3(0.0, -0.035, 0.03)); birome.rotation.set(0.5, 0, 0.35); }
      else { birome.position.set(PAPEL_M.x + 0.02, MOSTRADOR.y + 0.012, PAPEL_M.z + 0.06); birome.rotation.set(0, 0, Math.PI / 2 - 0.3); }
    }
  }
  // ---- mate (apoyado en el mostrador en P1/P2; en la mano derecha desde ahí) y termo ----
  {
    if (t >= T.p2) {
      const p = manoMundo(ruben, "D", _a);
      const rot = new THREE.Matrix4().makeRotationY(ruben.raiz.rotation.y);
      mateR.position.copy(p).add(MATE_OFF.clone().applyMatrix4(rot)); mateR.rotation.set(0, ruben.raiz.rotation.y - Math.PI / 2, 0);
      mateR.visible = ruben.raiz.visible;
    } else { mateR.position.copy(MATE_APOYADO); mateR.rotation.set(0, 0.4, 0); mateR.visible = true; }
    termoR.position.copy(TERMO); termoR.rotation.set(0, 0.6, 0);
  }
  // ---- la yerba de la parte 2: vuela del estante GUARDADOS al hueco; después en la mano de Graciela ----
  {
    yerbaVuela.visible = parte2 && t >= T.vuela[0] && t < T.q3;
    if (yerbaVuela.visible) {
      estante.updateMatrixWorld(true);
      const b2 = V3(HUECO.x, HUECO.y + 0.025, HUECO.z - 0.02);
      if (t < T.q2b) {
        // sale de la bolsa con un saltito y se va en arco hacia la izquierda (fuera de cuadro)
        const a = gGorra.g.localToWorld(V3(-0.02, 0.1, 0.0)), u = sg(t, T.vuela[0], T.vuela[1]);
        yerbaVuela.position.set(a.x - u * 0.9, a.y + Math.sin(Math.min(u, 0.5) * Math.PI) * 0.3 - Math.max(0, u - 0.5) * 0.2, a.z + u * 0.1);
        yerbaVuela.rotation.set(0, 0, u * 1.6);
      } else {
        // entra por la derecha en arco y cae en su lugar
        const u = sg(t, T.q2b, T.aterriza), a = b2.clone().add(V3(0.55, 0.0, 0.05));
        const p = a.lerp(b2, eo(u)); p.y += Math.sin(Math.PI * u) * 0.28;
        yerbaVuela.position.copy(p); yerbaVuela.rotation.set(0, 0, (1 - u) * 1.2);
      }
      const sq = pulso(t, T.aterriza, 0.15) * 0.15; yerbaVuela.scale.set(1 + sq, 1 - sq, 1);
    }
    yerbaG.visible = parte2 && t >= T.q3 && graciela.raiz.visible;
    if (yerbaG.visible) { const p = manoMundo(graciela, "D", _a); yerbaG.position.copy(p).add(V3(0, -0.04, 0.03)); yerbaG.rotation.set(0, graciela.raiz.rotation.y, 0); }
    agotada.visible = ["P3b", "Q2b"].includes(plano) && (!parte2 || t < T.aterriza + 0.2);
    agotada.rotation.y = parte2 ? Math.PI * eio(sg(t, T.aterriza, T.aterriza + 0.2)) : 0;
    const popA = !parte2 && en(t, T.agotada, T.agotada + 0.3) ? bk(sg(t, T.agotada, T.agotada + 0.2)) : 1;
    agotada.scale.setScalar(Math.max(0.001, popA));
  }
  // ---- los celulares ----
  {
    dibujarCeluR(t);
    celuCamG.visible = plano === "P1" || plano === "Q1";
    atril.visible = ["P3", "P3c", "P6", "Q3", "Q5"].includes(plano);
    const vib = en(t, T.vibra, T.vibra + 0.55) ? 1 : 0;
    atril.position.set(ATRIL.x + vib * Math.sin(t * 90) * 0.004, ATRIL.y + vib * Math.abs(Math.sin(t * 60)) * 0.003, ATRIL.z + vib * Math.cos(t * 77) * 0.003);
    atril.rotation.z = vib * Math.sin(t * 70) * 0.03;
    celuW.visible = walter.raiz.visible && parte2;
    if (celuW.visible) {
      const p = manoMundo(walter, "D", _a);
      if (t >= T.q5) { celuW.position.copy(p).add(V3(0, 0.07, 0)); celuW.rotation.set(0.7, walter.raiz.rotation.y + Math.PI, 0, "YXZ"); }
      else { celuW.position.copy(p).add(V3(0, 0.12, 0.02)); celuW.rotation.set(-0.1, walter.raiz.rotation.y, 0); }
    }
  }

  // ---- globos ----
  {
    const ent = (ti) => bk(sg(t, ti, ti + 0.28));
    const cab = (p) => cabezaEnPantalla(p, 0.12);
    if (plano === "P3" && t >= T.b1) { const [hx, hy] = cab(graciela); ponerGlobo(GL.yerba, hx, Math.max(330, hy - 380), ent(T.b1), [hx, hy - 190]); } else GL.yerba.visible = false;
    if (plano === "P4" && t >= T.b2) ponerGlobo(GL.cuando, 560, 1560, ent(T.b2), [-300, 1250]); else GL.cuando.visible = false;
    if (plano === "P6" && t >= T.b3 && t < T.b4) { const [hx, hy] = cab(walter); ponerGlobo(GL.dulce, hx, Math.max(330, hy - 340), ent(T.b3), [hx, hy - 150]); } else GL.dulce.visible = false;
    if (plano === "P6" && t >= T.b4 && t < T.seVa[0] + 0.2) { const [hx, hy] = cab(walter); ponerGlobo(GL.vengo, hx, Math.max(330, hy - 330), ent(T.b4) * (1 - eio(sg(t, T.seVa[0], T.seVa[0] + 0.2))), [hx, hy - 150]); } else GL.vengo.visible = false;
    // "¿Walter?": Graciela está fuera de cuadro a la izquierda (la cola sale hacia ella)
    if (plano === "Q3" && t >= T.b5) ponerGlobo(GL.walter, 300, 420, ent(T.b5), [-300, 760]); else GL.walter.visible = false;
  }
  // ---- contador "Guardados" ----
  {
    let s = 0;
    const vis = (!parte2 && t >= T.c3 && t < T.p3) || ((plano === "P6" || plano === "P6b") && t >= T.c28 - 0.15) || plano === "Q2";
    if (vis) {
      const ini = plano === "P6" || plano === "P6b" ? T.c28 - 0.15 : plano === "Q2" ? -1 : T.c3;
      s = 0.92 * (ini < 0 ? 1 : bk(sg(t, ini, ini + 0.3)));
    }
    const [n, desde] = numeroEn(t);
    for (const k in NUMS) NUMS[k].visible = false;
    const fijo = desde === 99;
    NUMS[n].visible = true; NUMS[n].scale.setScalar(fijo ? 1 : 0.55 + 0.45 * bk(sg(t, desde, desde + (n > 11 && n < 27 ? 0.06 : 0.2))));
    const u = sg(t, T.c3s - 0.02, T.c3s + 0.15);
    tacha.visible = parte2 && n === 28 && u > 0; tacha.scale.set(Math.max(0.001, u), 1, 1);
    const us = bk(sg(t, T.c3s + 0.25, T.c3s + 0.5));
    conSena.visible = parte2 && us > 0.01; conSena.scale.setScalar(Math.max(0.001, us));
    const late = (fijo ? 0 : pulso(t, desde, 0.28)) + (n === 28 ? pulso(t, T.c28, 0.45) * 0.9 : 0);
    ponerContador(540, 182, s * (1 + 0.1 * late));
    contador.rotation.set(0, 0, Math.sin(t * 0.6) * 0.012);
  }

  if (LIMPIO) { contador.visible = false; for (const k in GL) GL[k].visible = false; }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
