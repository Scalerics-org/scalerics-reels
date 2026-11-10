// Capa 3D de me-haces-precio (Three.js r170 local). Base técnica: reels/el-audio y reels/me-lo-guardas (set del
// almacén, globos y números en píxeles de pantalla pegados a la cámara, poses por claves, bocas por envolvente).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo set: el almacén de Rubén con PARED NAVY OSCURO (#0b1220, lisa, sin degradé) y dos lamparitas cálidas sobre el
// mostrador. La puerta vidriada con campanita en la pared izquierda; estantes de madera clara con mercadería plana.
//   PARTE 1: Héctor regatea un dulce de leche de $ 200 (180, 190: los números rojos chocan contra el 200 crema y caen),
//            se sienta en el banquito, apila monedas; a Rubén se le vacía el termo; "Ciento noventa y cinco." (el 200
//            rueda a 195); "¡Hecho!" (PUÑO); paga con un billete de 200; Rubén saca una moneda de 5: "Dejá. Quedate
//            con el vuelto."; en la puerta: "¡Me lo dejó en ciento noventa y cinco!" / Graciela: "Rubén, ¿me hacés
//            precio?"; Rubén apoya la frente en el mostrador.
//   PARTE 2: la tarjeta de puntos en el celular de Héctor (180 / 200 · Premio: un dulce de leche); "¿Cuánto es?" /
//            "Doscientos." / "¡Pago!" · +20 · ¡Premio! · "¡Gané!" (el mismo PUÑO); el segundo pote; en la puerta:
//            "¡Pagué doscientos y me llevo dos!" / Graciela: "Rubén, ¿me hacés puntos?" · +20 ✓.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import {
  crearPersonaje, ELENCO, poseEn, CARA, BRAZOS, pegarACamara,
  crearMate, crearTermo, crearCelular, crearYerba, crearGalletitas, crearDulceDeLeche, crearPolenta, crearQueso,
  crearTablet, crearMonedero, crearMoneda, crearBillete, crearLatita, crearBanquito, crearLamparita,
} from "./personajes.js";
import { T, DUR, P1, P2, ENV, LIMPIO } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('500 40px "IBM Plex Mono"')]);

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const ei = (x) => x * x * x;
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
scene.background = new THREE.Color(0xdfe9f0);   // lo que se ve por la puerta (la vereda de día)
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 80);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x3a3530);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(3, 9, -6, 2, -1, Math.PI / 2, 0xfff0dc, 1.6);   // la puerta (a la izquierda)
  tira(10, 1.2, 0, 7, 0, 0, 0xffd9a8, 1.2);             // las lamparitas
  tira(1.4, 8, 4, 1, 6, 0, 0x9fb8ff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.35;

// ---------- luces: la principal tibia de arriba a la izquierda, las dos lamparitas ámbar sobre el mostrador, dos
// contraluces fríos (uno de cada lado) para despegar las siluetas de la pared navy, un relleno desde la cámara ----------
const sol = new THREE.DirectionalLight(0xffe4c2, 2.3);
sol.position.set(-2.6, 5.2, 2.2); sol.target.position.set(0.4, 0.9, -1.2);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 2.5;
Object.assign(sol.shadow.camera, { left: -3.6, right: 3.6, top: 3.6, bottom: -3.6, near: 1, far: 16 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xc9cfdc, 0x2a2018, 0.7); scene.add(cielo);
const rimA = new THREE.DirectionalLight(0xa9c0ff, 1.1); rimA.position.set(2.5, 3.2, -5); scene.add(rimA);   // desde el fondo
const rimB = new THREE.DirectionalLight(0xa9c0ff, 0.9); rimB.position.set(-1.5, 3.0, 5); scene.add(rimB);  // desde adelante
const relleno = new THREE.DirectionalLight(0xfff1e0, 0.65); scene.add(relleno, relleno.target);
const LAMP = [V3(-0.05, 2.32, -1.3), V3(0.95, 2.32, -1.3)];
for (const p of LAMP) { const l = new THREE.PointLight(0xffb468, 2.6, 4.2, 1.4); l.position.copy(p).add(V3(0, -0.06, 0)); scene.add(l); }

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, maderaC: 0xc89a64, mostaza: 0xd9a441 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  // la pared es lisa de verdad: color plano, sin luz (la compresión de Instagram no le saca bandas)
  pared: new THREE.MeshBasicMaterial({ color: C.navy, toneMapped: false }),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6),
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
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 6, bevelEnabled: false });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g;
};

// ================= EL SET =================
// x: izquierda (-) a derecha (+). Pared del fondo z = BZ con la estantería (la fila de DULCE DE LECHE detrás de Rubén);
// pared izquierda x = LX con la puerta; pared de adelante z = FZ con otra estantería (el fondo de Héctor); mostrador
// cruzando en z = -1.3, Rubén atrás, Héctor adelante.
const LX = -2.2, RX = 4.3, FZ = 1.4, BZ = -3.4, TECHO_Y = 3.0;
const PUERTA = { z0: -0.75, z1: 0.3, alto: 2.25 };
const MOSTRADOR = { x: 0.45, y: 0.9, z: -1.3, w: 2.3, d: 0.62 };
const RI = { x: 0.3, z: -1.85 };     // Rubén atrás del mostrador
const H0 = { x: 0.2, z: -0.7 };      // Héctor parado frente al mostrador
const BANCO0 = V3(-0.62, 0, -0.32);   // el banquito "contra la pared" (al costado de Héctor): de ahí lo arrastra
const BANCO1 = V3(0.2, 0, -0.36);     // donde se sienta
const SEAT = 0.62;
{
  const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(4.4, 3.3);
  const p = mesh(new THREE.PlaneGeometry(RX - LX, FZ - BZ), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.55 }), (LX + RX) / 2, 0.0, (FZ + BZ) / 2); p.rotation.x = -Math.PI / 2; p.castShadow = false; scene.add(p);
  const pared = (w, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M.pared); m.position.set(x, y, z); scene.add(m); return m; };
  pared(RX - LX, TECHO_Y, 0.1, (LX + RX) / 2, TECHO_Y / 2, BZ);
  pared(RX - LX, TECHO_Y, 0.1, (LX + RX) / 2, TECHO_Y / 2, FZ);
  pared(0.1, TECHO_Y, FZ - BZ, RX, TECHO_Y / 2, (FZ + BZ) / 2);
  pared(RX - LX, 0.1, FZ - BZ, (LX + RX) / 2, TECHO_Y, (FZ + BZ) / 2);
  // pared izquierda con el hueco de la puerta
  const pz = (z0, z1, y0, y1) => pared(0.12, y1 - y0, z1 - z0, LX, (y0 + y1) / 2, (z0 + z1) / 2);
  pz(BZ, PUERTA.z0, 0, TECHO_Y); pz(PUERTA.z1, FZ, 0, TECHO_Y); pz(PUERTA.z0, PUERTA.z1, PUERTA.alto, TECHO_Y);
  // zócalo navy3 (el borde de la pared contra el piso)
  scene.add(mesh(new THREE.BoxGeometry(RX - LX, 0.12, 0.03), M.navy3, (LX + RX) / 2, 0.06, BZ + 0.06));
  scene.add(mesh(new THREE.BoxGeometry(RX - LX, 0.12, 0.03), M.navy3, (LX + RX) / 2, 0.06, FZ - 0.06));
  for (const [z0, z1] of [[BZ, PUERTA.z0], [PUERTA.z1, FZ]]) scene.add(mesh(new THREE.BoxGeometry(0.03, 0.12, z1 - z0), M.navy3, LX + 0.07, 0.06, (z0 + z1) / 2));
  // marco navy3 de la puerta con filete crema (se lee sobre la pared oscura)
  const marco = (y, z, h, d) => scene.add(mesh(rbox(0.16, h, d, 0.02), M.navy3, LX + 0.02, y, z));
  marco(PUERTA.alto + 0.05, (PUERTA.z0 + PUERTA.z1) / 2, 0.1, PUERTA.z1 - PUERTA.z0 + 0.2);
  marco(PUERTA.alto / 2, PUERTA.z0 - 0.05, PUERTA.alto + 0.1, 0.1); marco(PUERTA.alto / 2, PUERTA.z1 + 0.05, PUERTA.alto + 0.1, 0.1);
  const fil = (y, z, h, d) => scene.add(mesh(new THREE.BoxGeometry(0.02, h, d), M.cr2, LX + 0.105, y, z));
  fil(PUERTA.alto + 0.1, (PUERTA.z0 + PUERTA.z1) / 2, 0.02, PUERTA.z1 - PUERTA.z0 + 0.3); fil(PUERTA.alto / 2, PUERTA.z0 - 0.1, PUERTA.alto + 0.2, 0.02); fil(PUERTA.alto / 2, PUERTA.z1 + 0.1, PUERTA.alto + 0.2, 0.02);
  // estanterías: tablas de madera clara, laterales navy3, mercadería de colores planos (poco verde)
  semilla = 7;
  const colores = [C.cr, C.red, C.mostaza, 0xffffff, C.cr2, 0xe8cf9f, 0x8a5a3c, 0xd98a5a, C.mostaza];
  const mc = {}; const mm = (c, r) => (mc[c + "|" + r] ??= mat(c, r));
  const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  const llenar = (gr, x0, x1, y, hueco) => {
    for (let x = x0 + 0.14; x < x1 - 0.1; x += 0.17 + az() * 0.07) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (hueco && x > hueco[0] - 0.05 && x < hueco[1] + 0.05) continue;
      if (k < 0.36) { const h = 0.22 + az() * 0.16; gr.add(mesh(rbox(0.13, h, 0.16, 0.012), mm(c, 0.6), x, y + 0.025 + h / 2, 0)); }
      else if (k < 0.56) { gr.add(mesh(cuerpoFrasco, mm(c, 0.35), x, y + 0.125, 0)); gr.add(mesh(tapa, M.cr, x, y + 0.245, 0)); }
      else if (k < 0.72) { gr.add(mesh(botella, mm(c, 0.3), x, y + 0.175, 0)); gr.add(mesh(pico, mm(C.cr3, 0.4), x, y + 0.37, 0)); }
      else if (k < 0.82) { const yb = crearYerba(); yb.position.set(x, y + 0.025, 0); yb.scale.setScalar(0.85); gr.add(yb); x += 0.02; }
      else if (k < 0.9) { const pl = crearPolenta(); pl.position.set(x, y + 0.025, 0); gr.add(pl); }
      else { const ga = crearGalletitas(); ga.position.set(x + 0.06, y + 0.025, 0); ga.scale.setScalar(0.8); ga.rotation.y = 0.1; gr.add(ga); x += 0.12; }
    }
  };
  const estante = (x0, x1, ys, huecos = {}) => {
    const gr = new THREE.Group();
    const XC = (x0 + x1) / 2, XW = x1 - x0;
    for (const y of ys) {
      gr.add(mesh(rbox(XW, 0.05, 0.42, 0.015), M.maderaC, XC, y, -0.07));
      gr.add(mesh(rbox(XW, 0.06, 0.03, 0.01), M.navy3, XC, y - 0.005, 0.15));
      llenar(gr, x0, x1, y, huecos[y]);
    }
    for (const x of [x0, x1]) gr.add(mesh(rbox(0.06, ys[ys.length - 1] + 0.1, 0.44, 0.015), M.navy3, x, (ys[ys.length - 1] + 0.1) / 2, -0.07));
    return gr;
  };
  // el fondo de Rubén (pared z = BZ): la fila de dulce de leche a la altura de su cabeza
  const DL = { y: 1.18, x0: -0.4, x1: 1.15 };
  const ef = estante(-1.9, 2.9, [0.62, 1.18, 1.74, 2.3], { 1.18: [DL.x0, DL.x1] }); ef.position.z = BZ + 0.3; scene.add(ef);
  for (let x = DL.x0; x <= DL.x1 + 0.001; x += 0.13) { const d = crearDulceDeLeche(); d.position.set(x, DL.y + 0.025, BZ + 0.3); d.scale.setScalar(1.05); d.rotation.y = (az() - 0.5) * 0.3; scene.add(d); const d2 = crearDulceDeLeche(); d2.position.set(x + 0.004, DL.y + 0.025 + 0.13, BZ + 0.3); d2.scale.setScalar(1.05); d2.rotation.y = (az() - 0.5) * 0.3; scene.add(d2); }
  // el precio del estante: "$ 200" (el mismo de la etiqueta del pote)
  const etq = lienzo(512, 200, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 104); x.fillText("$ 200", w / 2, h / 2 + 6); });
  const et = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.086), new THREE.MeshStandardMaterial({ map: etq, roughness: 0.6, emissive: 0xffffff, emissiveMap: etq, emissiveIntensity: 0.2 }));
  et.position.set(0.98, DL.y - 0.005, BZ + 0.47); scene.add(et);
  // el fondo de Héctor (pared de adelante, z = FZ, mira a -z)
  const ea = estante(-1.6, 2.0, [0.5, 1.05, 1.6, 2.15]); ea.rotation.y = Math.PI; ea.position.set(0.2, 0, FZ - 0.3); scene.add(ea);
  // la pared izquierda, del lado del fondo (mira a +x): el fondo de los generales de perfil
  const ei2 = estante(-0.3, 1.9, [0.7, 1.25, 1.8]); ei2.rotation.y = Math.PI / 2; ei2.position.set(LX + 0.3, 0, -1.55); scene.add(ei2);
  // y del lado de adelante (entre la puerta y la pared de adelante)
  const ei3 = estante(-0.5, 0.5, [0.7, 1.25, 1.8]); ei3.rotation.y = Math.PI / 2; ei3.position.set(LX + 0.3, 0, 0.88); scene.add(ei3);
  // mostrador (el de abren-hoy): navy3 con tapa de madera, filete verde y paneles
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
  // la balanza crema en la punta derecha del mostrador y un queso (llenan los planos del mostrador)
  const bal = new THREE.Group(); bal.visible = false; bal.position.set(MX.x + 0.88, MX.y, MX.z + 0.02); bal.rotation.y = -0.4; scene.add(bal);
  bal.add(mesh(rbox(0.26, 0.1, 0.22, 0.03), M.cr, 0, 0.05, 0));
  bal.add(mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.02, 24), mat(0xc9ccd2, 0.3, { metalness: 0.6 }), 0, 0.11, 0));
  bal.add(mesh(rbox(0.16, 0.06, 0.012, 0.01), M.navy2, 0, 0.06, 0.112));
  const qs = crearQueso(); qs.position.set(MX.x + 1.0, MX.y, MX.z - 0.18); qs.rotation.y = 0.5; qs.visible = false; scene.add(qs);
}
// las dos lamparitas colgantes (pantalla de chapa navy3, foco ámbar)
const LAMPS = LAMP.map((p) => { const l = crearLamparita(TECHO_Y - p.y - 0.12); l.position.copy(p); scene.add(l); return l; });
// (ronda 2: en los generales hacia la puerta y en el cenital quedaban cortadas por el borde de arriba: ahí no se dibujan)
const SIN_LAMPS = ["P6", "P7", "P7c", "P7b", "Q4", "Q4b"];
// la puerta vidriada (hoja con bisagra del lado de adelante, abre hacia afuera) y la campanita
const hoja = new THREE.Group();
const campanita = new THREE.Group();
{
  const vidrioM = new THREE.MeshPhysicalMaterial({ color: 0xdcecff, roughness: 0.05, transparent: true, opacity: 0.12, depthWrite: false });
  hoja.position.set(LX - 0.02, 0, PUERTA.z1); scene.add(hoja);
  const W = PUERTA.z1 - PUERTA.z0;
  const hb = (z, y, d, h) => hoja.add(mesh(rbox(0.06, h, d, 0.015), M.navy3, 0, y, -z));
  hb(0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W - 0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W / 2, PUERTA.alto - 0.04, W, 0.08); hb(W / 2, 0.1, W, 0.2);
  const vp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.12, PUERTA.alto - 0.28), vidrioM); vp.position.set(0, PUERTA.alto / 2 + 0.06, -W / 2); vp.rotation.y = Math.PI / 2; vp.renderOrder = 5; hoja.add(vp);
  hoja.add(mesh(rbox(0.05, 0.3, 0.04, 0.015), mat(0xc9ccd2, 0.25, { metalness: 0.6 }), 0.06, 1.12, -(W - 0.08)));
  const tx = lienzo(1024, 420, (x, w, h) => {
    x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#0b1220"; x.lineWidth = 18; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 40); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 168); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ABIERTO", w / 2, h / 2 + 12);
  });
  const gm = mat(C.g, 0.5);
  const cartelM = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.5, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.12 });
  const cartel = mesh(new THREE.BoxGeometry(0.46, 0.19, 0.02), [gm, gm, gm, gm, cartelM, gm], 0.05, 1.6, -W / 2); cartel.rotation.y = Math.PI / 2; hoja.add(cartel);
  // la campanita: soporte, la campana dorada y el badajo (se sacude cuando se abre la puerta)
  campanita.position.set(LX + 0.14, PUERTA.alto - 0.02, PUERTA.z1 - 0.18); scene.add(campanita);
  campanita.add(mesh(rbox(0.12, 0.02, 0.03, 0.006), M.navy3, -0.05, 0.0, 0));
  const cb = new THREE.Group(); cb.position.set(0.0, -0.01, 0); campanita.add(cb); campanita.userData.cb = cb;
  cb.add(mesh(new THREE.ConeGeometry(0.06, 0.1, 18, 1, true), mat(0xd9b04a, 0.25, { metalness: 0.7, side: THREE.DoubleSide }), 0, -0.06, 0));
  cb.add(mesh(new THREE.SphereGeometry(0.016, 10, 8), mat(0xb8902e, 0.3, { metalness: 0.7 }), 0, -0.115, 0));
  // afuera: la vereda de baldosas, el cordón y la casa de enfrente (de día: colores planos y claros)
  const baldosa = lienzo(512, 512, (x) => { x.fillStyle = "#cfcabb"; x.fillRect(0, 0, 512, 512); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#d8d3c4" : "#c8c3b3"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122); } });
  baldosa.wrapS = baldosa.wrapT = THREE.RepeatWrapping; baldosa.repeat.set(2, 10);
  const v = mesh(new THREE.PlaneGeometry(3, 14), new THREE.MeshBasicMaterial({ map: baldosa }), LX - 1.5, 0.0, -1); v.rotation.x = -Math.PI / 2; v.castShadow = false; scene.add(v);
  scene.add(mesh(rbox(0.22, 0.16, 14, 0.03), new THREE.MeshBasicMaterial({ color: 0xb4b2a3 }), LX - 3.0, -0.07, -1));
  const calle = mesh(new THREE.PlaneGeometry(8, 40), new THREE.MeshBasicMaterial({ color: 0x8a8e98 }), LX - 7, -0.15, -1); calle.rotation.x = -Math.PI / 2; scene.add(calle);
  scene.add(mesh(new THREE.BoxGeometry(0.3, 6, 16), new THREE.MeshBasicMaterial({ color: 0xead9b6 }), LX - 8.5, 3, -1));
  for (let i = -4; i <= 4; i++) scene.add(mesh(rbox(0.1, 1.3, 1.0, 0.02), new THREE.MeshBasicMaterial({ color: 0x46608a }), LX - 8.3, 1.9, i * 1.8 - 1));
  const arbol = new THREE.Group(); arbol.position.set(LX - 2.6, 0, 0.9); scene.add(arbol);
  arbol.add(mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.6, 8), new THREE.MeshBasicMaterial({ color: 0x6e4a2e }), 0, 1.3, 0));
  for (const [x, y, z, r] of [[0, 3.0, 0, 0.9], [0.5, 2.7, 0.2, 0.6], [-0.5, 2.8, -0.1, 0.65]]) arbol.add(mesh(new THREE.IcosahedronGeometry(r, 0), new THREE.MeshBasicMaterial({ color: 0x6f9a44 }), x, y, z));
}

// ================= LOS PERSONAJES =================
const ruben = crearPersonaje({ ...ELENCO.almacenero, dedos: true, mechones: true, parpadeoCada: 3.6 });
const hector = crearPersonaje({ ...ELENCO.hector, dedos: true, parpadeoCada: 3.45 });   // (3,45: no parpadea justo en "¡Hecho!")
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 3.35 });   // (r2: no parpadea en el arranque de "¿me hacés precio?")
scene.add(ruben.raiz, hector.raiz, graciela.raiz);
for (const p of [ruben, hector, graciela]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
// los lentes un poco más adentro de la cara (de el-audio: con el cráneo de 0,3 los aros se salían de la cara)
function lentesAdentro(per, color) {
  const CC = 0.3 * 0.92;
  per.cabeza.traverse((l) => {
    if (!l.isMesh || l.parent !== per.cabeza) return;
    const esL = (l.material.color && l.material.color.getHex() === color && (l.geometry.type === "TorusGeometry" || l.geometry.type === "CylinderGeometry")) || (l.material.isMeshBasicMaterial && l.geometry.type === "CircleGeometry");
    if (!esL) return;
    l.position.y -= CC; l.position.multiplyScalar(1.04 / 1.13); l.position.y += CC;
    if (Math.abs(l.scale.y - 0.26) < 1e-6) l.visible = false;
    if (Math.abs(l.scale.y - 0.07) < 1e-6 && Math.abs(l.scale.x - 0.011) < 1e-6) l.position.x = -0.035;
  });
}
lentesAdentro(graciela, 0x16243d); lentesAdentro(hector, 0x1f3254);
// la herradura de pelo de Rubén vista desde atrás (P6h) se leía como un caño que le cruzaba la cabeza: de espaldas no va
const HERR = ruben.cabeza.children.find((o) => o.isGroup && Math.abs(o.scale.y - 1.3) < 1e-6);
const _hc = new THREE.Vector3(), _hf2 = new THREE.Vector3(), _he = new THREE.Vector3();
function herraduraSegunCamara() {
  if (!HERR) return;
  ruben.cabeza.updateMatrixWorld(true); ruben.cabeza.getWorldPosition(_hc);
  _hf2.set(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld); _he.copy(camera.position).sub(_hc); _hf2.y = 0; _he.y = 0; _hf2.normalize(); _he.normalize();
  HERR.visible = Math.acos(cl(_hf2.dot(_he), -1, 1)) < 1.9;
}
// de perfil (más de ~35°), el aro del ojo de atrás quedaba flotando fuera de la cara: se esconde, como el ojo
const arosDe = (per, color) => per.cabeza.children.filter((l) => l.isMesh && l.geometry.type === "TorusGeometry" && l.material.color && l.material.color.getHex() === color && l.parent === per.cabeza);
const LENTES = [[graciela, arosDe(graciela, 0x16243d)], [hector, arosDe(hector, 0x1f3254)]];
const _lc = new THREE.Vector3(), _lf = new THREE.Vector3(), _le = new THREE.Vector3(), _lw = new THREE.Vector3();
function lenteLejano(per, aros) {
  per.cabeza.updateMatrixWorld(true);
  per.cabeza.getWorldPosition(_lc); _lf.set(0, 0, 1).transformDirection(per.cabeza.matrixWorld); _le.copy(camera.position).sub(_lc);
  _lf.y = 0; _le.y = 0; _lf.normalize(); _le.normalize();
  const ang = Math.acos(cl(_lf.dot(_le), -1, 1));
  let lejos = null, dmax = -1;
  for (const a of aros) { a.visible = true; a.getWorldPosition(_lw); const d = _lw.distanceTo(camera.position); if (d > dmax) { dmax = d; lejos = a; } }
  if (ang > 0.62 && lejos) lejos.visible = false;   // (ronda 2: de 3/4 se ven los dos aros: nada de monóculo)
  // el puente también se ve de canto: se esconde con el aro
  per.cabeza.children.forEach((l) => { if (l.isMesh && l.geometry.type === "CylinderGeometry" && Math.abs(l.scale.y - 0.07) < 1e-6) l.visible = ang <= 0.62; });
}

// ================= UTILERÍA =================
// el pote protagonista (×1,8 de los del estante) con la etiqueta colgante de cartulina crema "$ 200" atada a la tapa
const POTE_S = 1.8;
function crearPoteConEtiqueta() {
  const g = new THREE.Group();
  const d = crearDulceDeLeche(); d.scale.setScalar(POTE_S); g.add(d);
  const tex = lienzo(640, 380, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(0, 0, w, h, 40); x.fill();
    x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.beginPath(); x.roundRect(8, 8, w - 16, h - 16, 34); x.stroke();
    x.fillStyle = "#0b1220"; x.beginPath(); x.arc(70, h / 2, 22, 0, 7); x.fill();
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(70, h / 2, 11, 0, 7); x.fill();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 172); x.fillText("$ 200", w / 2 + 36, h / 2 + 10);
  });
  const fm = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.28 });
  const dm = mat(0xe4e2d6, 0.8);
  const et = new THREE.Group(); g.add(et);
  et.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.119, 0.003), [dm, dm, dm, dm, fm, dm]));
  const hilo = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 1, 6), mat(C.red, 0.6)); g.add(hilo);
  g.userData = { et, hilo, pote: d };
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}
const pote1 = crearPoteConEtiqueta(); scene.add(pote1);
const pote2 = crearPoteConEtiqueta(); scene.add(pote2);
const POTE_H = 0.118 * POTE_S;
// la etiqueta cuelga del borde de la tapa del lado que mira a la cámara, corrida al costado `lado` (+1 / -1 en pantalla)
const _tq = new THREE.Vector3(), _tq2 = new THREE.Vector3();
function ponerEtiqueta(p, haciaCam, oscila = 0, lado = 1) {
  const { et, hilo } = p.userData;
  p.updateMatrixWorld(true);
  const tope = p.localToWorld(_tq.set(0, POTE_H - 0.01, 0)).clone();
  const dir = haciaCam.clone().sub(tope); dir.y = 0; dir.normalize();
  const lat = V3(dir.z, 0, -dir.x).multiplyScalar(lado);     // a la derecha de la pantalla con lado = +1
  const ancla = tope.clone().add(dir.clone().multiplyScalar(0.08)).add(lat.clone().multiplyScalar(0.06));
  const centro = ancla.clone().add(dir.clone().multiplyScalar(0.06)).add(lat.clone().multiplyScalar(0.11)).add(V3(0, -0.1 + oscila * 0.008, 0));
  et.position.copy(p.worldToLocal(centro.clone()));
  const yaw = Math.atan2(dir.x, dir.z) - p.rotation.y;
  et.rotation.set(-0.06, yaw, lado * (0.06 + oscila * 0.04));
  et.updateMatrixWorld(true);
  const agujero = et.localToWorld(_tq2.set(-lado * 0.075, 0.0, 0.002)).clone();
  const la = p.worldToLocal(ancla.clone()), lag = p.worldToLocal(agujero);
  hilo.position.copy(la.clone().add(lag).multiplyScalar(0.5));
  hilo.scale.set(1, Math.max(0.001, la.distanceTo(lag)), 1);
  hilo.quaternion.setFromUnitVectors(V3(0, 1, 0), lag.clone().sub(la).normalize());
}
// el banquito
const banco = crearBanquito(SEAT); scene.add(banco);
// las monedas: tres torres sobre la madera; un "5" en relieve
const geo5 = (() => { const g = new TextGeometry("5", { font, size: 0.026, depth: 0.0012, curveSegments: 4, bevelEnabled: false }); g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, 0); return g; })();
const MON_S = 1.25;
const monedas = Array.from({ length: 9 }, () => { const m = crearMoneda(geo5); m.scale.setScalar(MON_S); scene.add(m); return m; });
const TORRES = [V3(0.04, MOSTRADOR.y, -1.17), V3(0.15, MOSTRADOR.y, -1.12), V3(0.26, MOSTRADOR.y, -1.17)];
const monedero = crearMonedero(); monedero.scale.setScalar(1.35); scene.add(monedero);
const MONEDERO = V3(0.14, 1.04, -1.08);
// los billetes (P6 y Q3: dos distintos) y la latita de Rubén con la moneda de 5
const billete1 = crearBillete(); billete1.scale.setScalar(1.25); scene.add(billete1);
const billete2 = crearBillete(); billete2.scale.setScalar(1.25); scene.add(billete2);
const latita = crearLatita(); latita.scale.setScalar(1.3); scene.add(latita);
const LATITA = V3(0.3, MOSTRADOR.y, -1.47);
const moneda5 = crearMoneda(geo5); moneda5.scale.setScalar(1.4); scene.add(moneda5);
// el mate y el termo de Rubén
const mateR = crearMate(); mateR.scale.setScalar(1.25); scene.add(mateR);
const termo = crearTermo(); termo.scale.setScalar(1.3); scene.add(termo);
termo.traverse((o) => { if (o.isMesh && o.geometry.type === "TorusGeometry") o.position.x = -0.052; });
const MATE_C = V3(-0.18, MOSTRADOR.y, -1.5);    // el mate apoyado
const TERMO_C = V3(-0.36, MOSTRADOR.y, -1.52);    // el termo apoyado

// ================= PANTALLAS =================
const CW = 600, CH = 975;
function poteIcono(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  x.fillStyle = "#16243d"; rr(x, -46, -64, 92, 22, 8);
  x.fillStyle = "#ffffff"; x.beginPath(); x.moveTo(-42, -42); x.lineTo(42, -42); x.lineTo(36, 50); x.lineTo(-36, 50); x.closePath(); x.fill();
  x.fillStyle = "#d9a441"; x.beginPath(); x.moveTo(-40, -22); x.lineTo(40, -22); x.lineTo(37, 26); x.lineTo(-37, 26); x.closePath(); x.fill();
  x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.moveTo(-42, -42); x.lineTo(42, -42); x.lineTo(36, 50); x.lineTo(-36, 50); x.closePath(); x.stroke();
  x.restore();
}
// la tarjeta de puntos del almacén (genérica: sin logo ni la palabra Scalerics)
function tarjetaPuntos(x, W, H, { nombre, pts, mas = 0, premio = 0, late = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, 230);
  x.fillStyle = "#efeee5"; for (let i = 0; i < 4; i++) x.fillRect(36 + i * 16, 52 - i * 7, 10, 8 + i * 7);
  rr(x, W - 110, 30, 60, 26, 6);
  x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#efeee5"; x.font = F(900, 72); x.fillText("Mis puntos", 40, 122);
  x.fillStyle = "#5ce611"; x.font = F(700, 46); x.fillText("Almacén de Rubén", 40, 188);
  x.fillStyle = "#5ce611"; x.fillRect(0, 222, W, 10);
  x.fillStyle = "#0b1220"; x.font = F(800, 64); x.fillText(nombre, 40, 310);
  const sp = 1 + 0.12 * late;
  { x.font = F(900, 96); const wn = x.measureText(`${pts}`).width; x.font = F(800, 46); const ws = x.measureText(" / 200 puntos").width; const k = Math.min(1, (W - 80) / ((wn + ws) * sp));
  x.save(); x.translate(40, 395); x.scale(sp * k, sp * k); x.font = F(900, 96); x.fillStyle = "#0b1220"; x.fillText(`${pts}`, 0, 0); x.font = F(800, 46); x.fillStyle = "#16243d"; x.fillText(" / 200 puntos", wn, 10); x.restore(); }
  const bx = 40, by = 448, bw = W - 80, bh = 70;
  x.fillStyle = "#16243d"; rr(x, bx, by, bw, bh, 38);
  const f = Math.min(1, pts / 200);
  x.fillStyle = late > 0.3 ? "#9af06a" : "#5ce611"; rr(x, bx + 8, by + 8, Math.max(60, (bw - 16) * f), bh - 16, 30);
  if (pts < 200) { x.strokeStyle = "#efeee5"; x.lineWidth = 6; x.setLineDash([14, 10]); x.beginPath(); x.roundRect(bx + 10 + (bw - 16) * f, by + 10, (bw - 16) * (1 - f) - 4, bh - 20, 28); x.stroke(); x.setLineDash([]); }
  // "Esta compra: +20" (por qué le conviene pagar el precio entero)
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 46); x.fillText("Esta compra:", 40, 568);
  { const w0 = x.measureText("Esta compra: ").width; x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.roundRect(40 + w0, 534, 120, 66, 33); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(900, 46); x.textAlign = "center"; x.fillText("+20", 40 + w0 + 60, 569); x.textAlign = "left"; }
  if (!premio) {
    x.fillStyle = "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(30, 625, W - 60, 290, 30); x.fill(); x.stroke();
    poteIcono(x, 112, 770, 1.1);
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 46); x.fillText("Premio:", 190, 686); x.font = F(900, 44); x.fillText("200 puntos =", 190, 744); x.font = F(800, 44); x.fillText("un dulce", 190, 806); x.fillText("de leche", 190, 862);   // (r2: una sola unidad, puntos)
  } else {
    const s = 0.6 + 0.4 * eo(premio);
    x.save(); x.translate(W / 2, 760); x.scale(s, s); x.globalAlpha = Math.min(1, premio * 2);
    x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(-(W - 60) / 2, -150, W - 60, 300, 30); x.fill(); x.stroke();
    poteIcono(x, -170, 10, 1.25);
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 62); x.fillText("¡Premio!", -90, -72); x.font = F(800, 50); x.fillText("Un dulce", -90, 0); x.fillText("de leche", -90, 62);
    x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(150, 70); x.lineTo(182, 104); x.lineTo(236, 36); x.stroke();
    x.restore();
  }
  if (mas > 0) {
    x.save(); x.globalAlpha = Math.min(1, mas * 2); const s = 0.6 + 0.4 * eo(mas); x.translate(W - 50, 420); x.scale(s, s);
    x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(-230, -52, 230, 104, 52); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 66); x.fillText("+20", -115, 4); x.restore();
  }
  x.fillStyle = "#d9d7c9"; x.fillRect(0, H - 40, W, 40); x.fillStyle = "#16243d"; rr(x, W / 2 - 80, H - 26, 160, 10, 5);
}
// el celular de Héctor (funda mostaza a juego con el chaleco)
const pantH = lienzo(CW, CH, () => {});
const celuH = crearCelular(pantH, C.mostaza, 0.085, 0.138); celuH.scale.setScalar(2.2); scene.add(celuH);
let claveH = "";
function dibujarPantH(t) {
  const u = (a, d = 0.22) => Math.round(sg(t, a, a + d) * 6) / 6;
  const pts = t < T.mas20 ? 180 : Math.round(lerp(180, 200, eio(sg(t, T.mas20, T.mas20 + 0.45))));
  const lt = en(t, T.late, T.late + 0.6) ? Math.round(pulso(t, T.late, 0.6) * 4) / 4 : 0;
  const mas = t >= T.mas20 && t < T.premio + 0.4 ? u(T.mas20) : 0;
  const premio = t >= T.premio ? u(T.premio, 0.25) : 0;
  const clave = `${pts}|${lt}|${mas}|${premio}`;
  if (clave === claveH) return; claveH = clave;
  tarjetaPuntos(pantH.userData.x, CW, CH, { nombre: "Héctor", pts, mas, premio, late: lt });
  pantH.needsUpdate = true;
}
// el celular de Graciela (funda crema): su tarjeta 0 / 200 → 20 / 200
const pantG = lienzo(CW, CH, () => {});
const celuG = crearCelular(pantG, C.cr, 0.085, 0.138); celuG.scale.setScalar(2.0); scene.add(celuG);
let claveG = "";
function dibujarPantG(t) {
  const pts = t < T.ok20 ? 0 : 20, mas = t >= T.ok20 ? Math.round(sg(t, T.ok20, T.ok20 + 0.22) * 6) / 6 : 0;
  const clave = `${pts}|${mas}`; if (clave === claveG) return; claveG = clave;
  tarjetaPuntos(pantG.userData.x, CW, CH, { nombre: "Graciela", pts, mas });
  pantG.needsUpdate = true;
}
// la tablet de Rubén en su atril (solo en la parte 2): lo que ve el dueño (la ficha de Héctor; después "+20 ✓")
const TW = 900, TH = 640;
const pantT = lienzo(TW, TH, () => {});
const tablet = crearTablet(pantT, 0.3, 0.21, 0.42); tablet.scale.setScalar(1.25); scene.add(tablet);
const TABLET = V3(0.42, MOSTRADOR.y, -1.34);
let claveT = "";
function dibujarPantT(t) {
  const ok = t >= T.scan + 0.12 ? 1 : 0, cara = t >= T.q4 ? "Graciela" : "Héctor";
  const clave = `${ok}|${cara}`; if (clave === claveT) return; claveT = clave;
  const { x } = pantT.userData, W = TW, H = TH;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#5ce611"; x.fillRect(0, 128, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 64); x.fillText("Clientes", 44, 68);
  if (!ok) {
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(36, 176, W - 72, 420, 34); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 96); x.fillText(cara, 80, 290);
    x.font = F(800, 70); x.fillStyle = "#16243d";
    if (cara === "Héctor") { x.fillText("5 veces", 80, 410); x.fillText("esta semana", 80, 500); }
    else x.fillText("Sumar puntos", 80, 430);
  } else {
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(36, 176, W - 72, 420, 34); x.fill();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 220); x.fillText("+20", W / 2 - 70, 400);
    x.lineWidth = 34; x.lineCap = "round"; x.lineJoin = "round"; x.strokeStyle = "#0b1220"; x.beginPath(); x.moveTo(W / 2 + 190, 400); x.lineTo(W / 2 + 250, 460); x.lineTo(W / 2 + 350, 330); x.stroke();
  }
  pantT.needsUpdate = true;
}

// ================= GLOBOS (pegados a la cámara, en píxeles de pantalla) =================
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cola = true, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy, tilde = false } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const tw0 = med.measureText(lineas[0]).width;   // ancho del primer renglón (en el lienzo, x2)
  const extra = tilde ? px * 2 * 1.25 : 0;          // lugar para el tilde (a la derecha del primer renglón)
  const anchoTxt = Math.max(...lineas.map((l, i) => med.measureText(l).width + (i === 0 ? extra : 0))) / 2;
  const W = Math.round(anchoTxt + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9);
  const tex = lienzo(W * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.fillStyle = tinta; x.font = F(800, px * 2); x.textAlign = "center"; x.textBaseline = "middle";
    lineas.forEach((l, i) => x.fillText(l, w / 2 - (i === 0 ? extra / 2 : 0), h / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.2 + px * 0.08));
    if (tilde) {
      const px2 = px * 2, cx = w / 2 - extra / 2 + tw0 / 2 + px2 * 0.75, cy = h / 2 - ((lineas.length - 1) / 2) * px2 * 1.2;
      x.strokeStyle = tinta; x.lineWidth = px2 * 0.17; x.lineCap = "round"; x.lineJoin = "round";
      x.beginPath(); x.moveTo(cx - px2 * 0.36, cy + px2 * 0.02); x.lineTo(cx - px2 * 0.08, cy + px2 * 0.3); x.lineTo(cx + px2 * 0.4, cy - px2 * 0.3); x.stroke();
    }
  });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: borde });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(fondo) });
  const sombraM = new THREE.MeshBasicMaterial({ color: 0x050a14 });
  const w = W / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sombra.position.set(12 / PXK, -14 / PXK, -0.016); g.add(sombra);
  const bord = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); bord.position.z = -0.012; g.add(bord);
  const caja = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja);
  const colaG = new THREE.Group(); g.add(colaG); colaG.visible = cola;
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(80 / PXK, 104 / PXK), sombraM); cs.position.set(12 / PXK, -8 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(80 / PXK, 104 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(54 / PXK, 78 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja.userData.orden = 4;
  g.userData = { W, H, cola: colaG };
  return pegarACamara(g, camera, 40);
}
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0, giro = 0) {
  // las burbujas nunca arrancan de un puntito: aparecen desde el 40 % (antes, nada: sin texto fantasma diminuto)
  g.visible = s > 0.4;
  if (!g.visible) return;
  const k = halfK();
  const { W, H, cola } = g.userData;
  // dentro del 80 % seguro (100 px de margen a cada lado)
  cx = W + 200 > 1080 ? 540 : cl(cx, W / 2 + 100, 980 - W / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s);
  g.rotation.z = giro;
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (W / 2), -0.62, 0.62);
  if (oy >= cy) {
    cola.position.set((lado * W) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
    cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * W) / 2), oy - (cy + H / 2)), -0.9, 0.9);
  } else {
    // el que habla está arriba de la burbuja: la cola sale por arriba
    cola.position.set((lado * W) / 2 / PXK, H / 2 / PXK - 4 / PXK, 0);
    cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * W) / 2), (cy - H / 2) - oy), -0.9, 0.9);
  }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaMundo = (per, d = 0.06, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(out.set(0, 0.181, 0.265 + d)); };
const bocaPx = (per) => enPantalla(bocaMundo(per, 0.04, new THREE.Vector3()));
const coronaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(new THREE.Vector3(0, 0.62, 0))); };
const GL = {
  dos1: crearGlobo(["Doscientos."], 84),
  c180: crearGlobo(["¿Ciento ochenta?"], 70),
  dos2: crearGlobo(["Doscientos."], 70),
  c190: crearGlobo(["¿Ciento noventa?", "Vengo siempre."], 66),
  dos3: crearGlobo(["Doscientos."], 70),
  mon: crearGlobo(["Tengo ciento noventa", "en monedas."], 64),
  hecho: crearGlobo(["¡Hecho!"], 120),
  r1: crearGlobo(["Ciento noventa", "y cinco."], 86),
  r2: crearGlobo(["Doscientos."], 96),
  deja1: crearGlobo(["Dejá."], 104),
  deja2: crearGlobo(["Quedate con", "el vuelto."], 96),
  h4: crearGlobo(["¡Me lo dejó en", "ciento noventa y cinco!"], 62),
  g1: crearGlobo(["Rubén,", "¿me hacés precio?"], 70),
  mehac: crearGlobo(["¿Me hac…"], 100),
  cuanto: crearGlobo(["¿Cuánto es?"], 96),
  pago: crearGlobo(["¡Pago!"], 100),
  gane: crearGlobo(["¡Gané!"], 120),
  g2: crearGlobo(["Rubén,", "¿me hacés puntos?"], 70),
  // los rótulos verdes de la parte 2
  mas20: crearGlobo(["+20 puntos"], 76, { cola: false, fondo: "#5ce611" }),
  premio: crearGlobo(["¡Premio!", "Un dulce de leche"], 62, { cola: false, fondo: "#5ce611", tilde: true }),
  ok20: crearGlobo(["+20"], 88, { cola: false, fondo: "#5ce611", tilde: true }),
  ficha: crearGlobo(["Héctor:", "5 veces", "esta semana"], 54, { fondo: "#5ce611" }),
};

// ================= LOS NÚMEROS DEL REGATEO (TextGeometry, pegados a la cámara arriba) =================
// el "$ 200" crema con canto navy, siempre al centro; las ofertas de Héctor en rojo apagado entran desde la izquierda,
// chocan, una raya navy las tacha y caen girando por la izquierda (nunca sobre una cara). El 200 rueda a 195 (rojo).
// La fuente 3D solo trae dígitos: el "$" es un tubo en S con su barra. Van a 12 cm de la cámara con prueba de
// profundidad (las caras de la extrusión se tapan bien entre sí y nada de la escena llega tan cerca).
const NUM_S = 0.17;   // alto de los dígitos (en unidades del grupo: 1 = 1000 px)
const geoDig = {};
const digGeo = (d) => (geoDig[d] ??= (() => { const g = textoGeo(d, NUM_S, 0.06); g.computeBoundingBox(); return g; })());
const crMat = () => [new THREE.MeshBasicMaterial({ color: C.cr, toneMapped: false }), new THREE.MeshBasicMaterial({ color: 0x0b1220, toneMapped: false })];
const rjMat = () => [new THREE.MeshBasicMaterial({ color: 0xd2685d, toneMapped: false }), new THREE.MeshBasicMaterial({ color: 0x0b1220, toneMapped: false })];
function filaDigitos(txt, mats) {
  const g = new THREE.Group(); const piezas = [];
  for (const ch of txt) { const geo = digGeo(ch); const b = geo.boundingBox; const m = new THREE.Mesh(geo, mats); piezas.push([m, b.max.x - b.min.x + 0.016]); }
  const total = piezas.reduce((a, p) => a + p[1], 0);
  let x = -total / 2; for (const [m, w] of piezas) { m.position.x = x + w / 2; x += w; g.add(m); }
  g.userData.ancho = total; g.userData.piezas = piezas.map((p) => p[0]);
  return g;
}
function signoPeso(mats) {
  const g = new THREE.Group();
  const s = NUM_S;
  const pts = [[0.34, 0.36], [0.16, 0.46], [-0.12, 0.42], [-0.3, 0.22], [-0.12, 0.03], [0.14, -0.06], [0.32, -0.25], [0.14, -0.45], [-0.18, -0.46], [-0.36, -0.34]].map(([x, y]) => V3(x * s * 0.66, y * s * 0.98, 0.01));
  const tubo = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, s * 0.09, 10), mats[0]); g.add(tubo);
  const barra = new THREE.Mesh(rbox(s * 0.14, s * 1.28, s * 0.14, s * 0.05, 2), mats[0]); barra.position.z = 0.01; g.add(barra);
  // el canto navy (como la extrusión de los dígitos): la misma forma corrida hacia atrás
  for (const m of [tubo, barra]) { const c = m.clone(); c.material = mats[1]; c.position.set(0.004, -0.006, -0.025); c.scale.set(1.04, 1.03, 1); g.add(c); }
  g.userData.ancho = s * 0.62;
  return g;
}
const NUM = new THREE.Group(); pegarACamara(NUM, camera, 70);
const n200 = new THREE.Group(); NUM.add(n200);
const n200peso = signoPeso(crMat()); n200.add(n200peso);
const n200dig = filaDigitos("200", crMat()); n200.add(n200dig);
const n195dig = filaDigitos("195", rjMat()); n200.add(n195dig);
const n195peso = signoPeso(rjMat()); n200.add(n195peso);
const W200 = n200dig.userData.ancho + n200peso.userData.ancho + 0.03;
n200peso.position.x = -n200dig.userData.ancho / 2 - n200peso.userData.ancho / 2 - 0.03; n195peso.position.x = n200peso.position.x;
n200dig.position.x = n195dig.position.x = 0;
const PLACA = {};
// la placa del precio: navy con borde crema, detrás del "$" y los dígitos (se lee sobre la góndola, la pared o una cara)
{
  const wP = n200dig.userData.ancho + n200peso.userData.ancho + 0.03 + 0.09, hP = NUM_S + 0.08, xP = -(n200peso.userData.ancho + 0.03) / 2;
  const borde = new THREE.Mesh(rbox(wP + 0.018, hP + 0.018, 0.012, 0.03, 3), new THREE.MeshBasicMaterial({ color: C.cr, toneMapped: false })); borde.position.set(xP, 0, -0.045);
  const placa = new THREE.Mesh(rbox(wP, hP, 0.014, 0.026, 3), new THREE.MeshBasicMaterial({ color: 0x0b1220, toneMapped: false })); placa.position.set(xP, 0, -0.038);
  n200.add(borde, placa);
  PLACA.xP = xP; PLACA.wP = wP + 0.018;
}
// el tilde verde del 200 (parte 2)
const tilde = new THREE.Group(); n200.add(tilde);
{
  const gm = new THREE.MeshBasicMaterial({ color: C.g, toneMapped: false }), nm = new THREE.MeshBasicMaterial({ color: 0x0b1220, toneMapped: false });
  tilde.add(new THREE.Mesh(new THREE.CircleGeometry(0.08, 40), nm));
  const c2 = new THREE.Mesh(new THREE.CircleGeometry(0.068, 40), gm); c2.position.z = 0.003; tilde.add(c2);
  const tc = new THREE.CatmullRomCurve3([V3(-0.034, 0.0, 0.006), V3(-0.01, -0.026, 0.006), V3(0.038, 0.032, 0.006)], false, "catmullrom", 0.01);
  tilde.add(new THREE.Mesh(new THREE.TubeGeometry(tc, 12, 0.011, 6), nm));
  tilde.position.set(n200dig.userData.ancho / 2 + 0.12, 0, 0.03);
}
// las ofertas (180 y 190) con la raya que las tacha
function oferta(txt) {
  const g = new THREE.Group(); NUM.add(g);
  const d = filaDigitos(txt, rjMat()); g.add(d);
  const raya = new THREE.Group(); g.add(raya);
  const w = d.userData.ancho + 0.05;
  raya.add(new THREE.Mesh(rbox(w + 0.02, 0.046, 0.02, 0.016, 2), new THREE.MeshBasicMaterial({ color: C.cr, toneMapped: false })));
  const r2m = new THREE.Mesh(rbox(w, 0.028, 0.03, 0.012, 2), new THREE.MeshBasicMaterial({ color: 0x0b1220, toneMapped: false })); r2m.position.z = 0.006; raya.add(r2m);
  raya.rotation.z = 0.16; raya.position.z = 0.045;
  g.userData = { d, raya, w };
  return g;
}
const o180 = oferta("180"), o190 = oferta("190");
const NUM_D = 0.12;
NUM.traverse((o) => { if (o.isMesh) { o.renderOrder = 70; o.material.depthTest = true; o.material.depthWrite = true; o.material.transparent = false; } });

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov, modo]. Entre planos hay corte seco;
// dentro de un plano, Catmull-Rom continua (modo "e" = tramo con ease propio). Los planos de la parte 2 repiten
// EXACTO el encuadre de su par de la parte 1 (P1→Q1, P2→Q2b, P3a→Q3, P5→Q2, P7→Q4).
const HEC = (dz = 0, fov = 44) => [1.12, 1.6, -2.42 + dz, H0.x - 0.08, 1.4, H0.z, fov];        // P1/Q1: Héctor de 3/4 desde atrás del mostrador
const HEC5 = (dz = 0) => [1.35, 1.5, -2.62 + dz, H0.x - 0.02, 1.25, H0.z, 50];                  // P5/Q2: más abierto
const RUB = (dz = 0, fov = 46) => [RI.x, 1.55, -0.05 + dz, RI.x, 1.5, RI.z, fov];              // P2/Q2b: Rubén de frente, plano medio
const RUBQ = (dz = 0, fov = 46) => [RI.x, 1.55, -0.05 + dz, RI.x, 1.43, RI.z, fov];            // Q2b: el mismo, un poco más abajo (se lee la tablet)
const PER = (dx = 0) => [3.65 + dx, 1.5, -1.3, 0.22, 1.46, -1.3, 50];                          // P3a/Q3: general de perfil
const MOS = (dz = 0) => [0.95, 2.35, -0.95 + dz, 0.12, 0.92, -1.36, 34];                      // P3b/P6: el mostrador
const PPR = (dz = 0, fov = 40) => [RI.x, 1.5, -0.12 + dz, RI.x, 1.3, RI.z, fov];
const FRE = (dz = 0) => [-0.02, 2.0, 0.45 + dz, -0.04, 1.12, -1.6, 38];                // P7b: la frente contra el mostrador             // P4/P6b/P7b: primer plano de Rubén
const PUE = (dz = 0, fov = 40) => [2.6, 1.65, -2.2 + dz, -1.4, 1.2, -0.1, fov];             // P7/Q4: general hacia la puerta
const GRA = (dz = 0) => [0.4, 1.55, -1.3 + dz, -1.2, 1.36, 0.3, 36];                        // P7c: Graciela en la puerta, desde atrás del mostrador
const DOS = (dz = 0, fov = 50) => [3.4 + dz * 3, 1.62, 0.1 + dz * 1.3, -0.1, 1.25, -1.26, fov];   // (r2: más abierto y corrido a Rubén: entra entero)                // Q4b: Graciela y Rubén con el lector
const CEL = (dz = 0) => [H0.x, 1.42, -2.3 + dz, H0.x - 0.03, 1.3, -1.0, 28];           // Q1b: el celular de Héctor
const PLANOS = [
  ["P1", 0, [[0, ...HEC(0, 44)], [T.p2, ...HEC(0.1, 41)]]],
  ["P2", T.p2, [[T.p2, ...RUB(0)], [T.p3a, ...RUB(-0.08)]]],
  ["P3a", T.p3a, [[T.p3a, ...PER(0)], [T.p4, ...PER(-0.2)]]],
  ["P4", T.p4, [[T.p4, ...PPR(0, 42)], [T.p5, ...PPR(-0.12, 38)]]],
  ["P5", T.p5, [[T.p5, ...HEC5(0)], [T.p6, ...HEC5(0.05)]]],
  ["P6", T.p6, [[T.p6, ...MOS(0)], [T.p6h, ...MOS(-0.05)]]],
  ["P6h", T.p6h, [[T.p6h, ...HEC5(0)], [T.p6b, ...HEC5(0.08)]]],
  ["P6b", T.p6b, [[T.p6b, ...PPR(0.02, 42)], [T.p7, ...PPR(-0.03, 41)]]],
  ["P7", T.p7, [[T.p7, ...PUE(0, 40)], [T.p7c, ...PUE(0.04, 38.5)]]],
  ["P7c", T.p7c, [[T.p7c, ...GRA(0)], [T.p7b, ...GRA(0.06)]]],
  ["P7b", T.p7b, [[T.p7b, ...FRE(0)], [P1, ...FRE(-0.06)]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...HEC(0, 44)], [T.q1b, ...HEC(0.1, 41)]]],
  ["Q1b", T.q1b, [[T.q1b, ...CEL(0)], [T.q2, ...CEL(0.06)]]],
  ["Q2", T.q2, [[T.q2, ...HEC5(0)], [T.q2b, ...HEC5(0.05)]]],
  ["Q2b", T.q2b, [[T.q2b, ...RUBQ(0)], [T.q3, ...RUBQ(-0.08)]]],
  ["Q3", T.q3, [[T.q3, ...PER(0)], [T.q4, ...PER(-0.2)]]],
  ["Q4", T.q4, [[T.q4, ...PUE(0, 40)], [T.q4b, ...PUE(0.04, 38.5)]]],
  ["Q4b", T.q4b, [[T.q4b, ...DOS(0, 58)], [DUR, ...DOS(-0.03, 55)]]],
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
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const APOYA = { manoI: [0.24, 0.32, 0.42], manoD: [-0.24, 0.32, 0.42], codoI: null, codoD: null, dedoI: 0, dedoD: 0 };
const MATE_P = { manoD: [-0.3, 0.42, 0.38], codoD: [-1, -0.6, -0.2], dedoD: 0 };
const BAJA = { manoI: [0.29, 0.02, 0.1], manoD: [-0.29, 0.02, 0.1], codoI: null, codoD: null, dedoI: 0, dedoD: 0 };
const CANCHERO = { ...CARA.sonrisa, cejas: { alto: 0.25, ang: -0.05, asim: 0.7 }, boca: { sonrisa: 0.7, abierta: 0, ancho: 1.05 }, ojos: { abiertos: 0.95, feliz: 0.35 } };
// giros (rad sobre y): Héctor mira a -z (π); en los planos de 3/4 se "abre" a la cámara
const GH_P1 = 2.72, GH_PER = Math.PI - 0.62, GR_PER = 0.55;
const G_RUB_PUERTA = Math.atan2(-1.65, 1.55);
// en la puerta (P7/Q4): Héctor y Graciela de perfil a la cámara, uno frente al otro
const HP = { x: -1.62, z: -0.5 }, GP = { x: -1.2, z: 0.3 };
const GH_PUERTA = 1.45, GG_PUERTA = 2.6, GG_RUBEN = 2.3;   // (ronda 2: de 3/4 a cámara, ~0,5 rad: nada de perfiles con monóculo)
// ---- Rubén ----
const RK = [
  [0, { x: RI.x, z: RI.z, giro: 0, ...BAJA, ...aC(0, 0.05), ...CARA.neutra }],
  // P2: de frente, el mate en la derecha; sorbe; párpados a media asta: ya sabe lo que viene
  [T.p2 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0.03, ...BAJA, ...MATE_P, ...aC(0.0, 0.06), ...CARA.neutra, ojos: { x: 0, y: 0.0, abiertos: 0.62, tension: 0.15 }, cejas: { alto: 0.05, ang: 0.15 }, boca: { sonrisa: -0.1 } }, 0.001],
  [T.bDos1 + 0.1, { ...aC(0.0, 0.02), ojos: { x: 0, y: 0.05, abiertos: 0.58 } }, 0.3],
  // P3a: de perfil (3/4 a cámara), las manos en el mostrador, mira a Héctor
  [T.p3a - 0.001, { x: RI.x, z: RI.z, giro: GR_PER, inclina: 0.22, ...APOYA, ...aC(0.35, 0.05), ...CARA.neutra, ojos: { x: 0.45, y: 0.0, abiertos: 0.6, tension: 0.15 }, cejas: { alto: 0.0, ang: 0.1 }, boca: { sonrisa: -0.15 } }, 0.001],
  [T.bMon + 0.2, { ...aC(0.45, 0.12), ojos: { x: 0.6, y: -0.3, abiertos: 0.55 }, cejas: { alto: 0.25, ang: 0.4 }, boca: { sonrisa: -0.3 } }, 0.35],
  // P4: cierra los ojos, suspira, abre: "Ciento noventa y cinco." (resignado, sin enojo)
  [T.p4 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0.02,  ...BAJA, ...aC(0.0, 0.04, 0.0), ...CARA.neutra, ojos: { x: 0, y: 0.0, abiertos: 0.6, tension: 0.2 }, cejas: { alto: 0.1, ang: 0.3 }, boca: { sonrisa: -0.2 } }, 0.001],
  [T.ojos[1], { ...CARA.resignado, ojos: { x: 0, y: -0.2, abiertos: 0.0, tension: 0.6 }, inclina: 0.06, ...aC(0.0, 0.14, 0.04) }, 0.25],
  [T.r1 + 0.05, { ojos: { x: 0, y: 0.0, abiertos: 0.42, tension: 0.6 }, inclina: 0.02, ...aC(0.0, 0.04, 0.02) }, 0.3],
  // P5: estrecha la mano (la derecha la maneja ponerPersonajes)
  [T.p5 - 0.001, { x: RI.x, z: RI.z, giro: 0.1, inclina: 0.03, ...BAJA, ...aC(0.1, 0.05), ...CARA.neutra, ojos: { abiertos: 0.55, tension: 0.3 }, cejas: { alto: 0.2, ang: 0.5 }, boca: { sonrisa: -0.3 } }, 0.001],
  // P6: abre la latita, saca la moneda (la izquierda)
  [T.p6 - 0.001, { x: RI.x + 0.02, z: RI.z - 0.03, giro: 0.1, inclina: 0.05,   /* r2: la panza asomaba por la madera (la línea negra) */ ...BAJA, ...aC(0.1, 0.3), ...CARA.neutra, ojos: { x: 0.2, y: -0.7, abiertos: 0.6 } }, 0.001],
  [T.deja + 0.25, { ...aC(0.0, 0.08), ojos: { x: 0, y: 0.1, abiertos: 0.75 }, cejas: { alto: 0.35, ang: 0.4 } }, 0.3],
  // P6b: cara de nada, mira la moneda, mira a cámara
  [T.p6b - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0.0, ...BAJA, ...aC(0.12, 0.12, 0.0), ojos: { x: 0.45, y: -0.25, abiertos: 0.6, tension: 0.3, feliz: 0 }, cejas: { alto: 0.15, ang: 0.45, asim: 0 }, boca: { sonrisa: -0.35, abierta: 0, ancho: 0.9 } }, 0.001],
  [T.p6b + 0.42, { ...aC(0.0, 0.03, 0.0), ojos: { x: 0, y: 0.04, abiertos: 0.6, tension: 0.3 } }, 0.22],
  // P7: mira hacia la puerta (de espaldas a cámara, borde derecho)
  [T.p7 - 0.001, { x: RI.x, z: RI.z, giro: G_RUB_PUERTA, inclina: 0.0, ...BAJA, ...aC(0.0, 0.0), ...CARA.neutra, ojos: { abiertos: 0.65 } }, 0.001],
  // P7b: de frente; apoya despacio la frente en la madera
  [T.p7b - 0.001, { x: -0.1, z: RI.z, giro: 0, inclina: 0.03, ...BAJA, ...aC(0.0, 0.05, 0.0), ...CARA.resignado, ojos: { x: 0, y: 0.0, abiertos: 0.45, tension: 0.6 } }, 0.001],
  [T.frente[1], { inclina: 0.5, ...aC(0.0, 0.6, 0.0), ojos: { abiertos: 0.0 } }, T.frente[1] - T.frente[0], (u) => eio(u)],
  // ---- parte 2 ----
  [P2 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0.0, ...BAJA, ...aC(0, 0.02), ...CARA.sonrisa }, 0.001],
  // Q2b: de frente, mate en la mano, media sonrisa: "Doscientos." (tranquilo)
  [T.q2b - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0.0, ...BAJA, ...MATE_P, manoD: [-0.34, 0.56, 0.3],   /* r2: el mate más arriba, no tapa la tablet */ ...aC(0.0, 0.04), ...CARA.sonrisa, ojos: { x: 0, y: 0.0, abiertos: 1, feliz: 0.3 }, cejas: { alto: 0.2, ang: 0.0 }, boca: { sonrisa: 0.45, ancho: 1.0 } }, 0.001],
  // Q3: de perfil; apoya el segundo pote (la izquierda la maneja ponerPersonajes)
  [T.q3 - 0.001, { x: RI.x, z: RI.z, giro: GR_PER, inclina: 0.2, ...APOYA, ...aC(0.35, 0.05), ...CARA.sonrisa, ojos: { x: 0.45, abiertos: 1, feliz: 0.3 } }, 0.001],
  // Q4/Q4b: de 3/4 a cámara, la cabeza hacia Graciela; le acerca la tablet (la derecha)
  [T.q4 - 0.001, { x: RI.x - 0.25, z: RI.z + 0.1, giro: 0.3, inclina: 0.0, ...BAJA, ...aC(0.25, 0.02), ...CARA.sonrisa, ojos: { x: -0.6, abiertos: 1, feliz: 0.3 } }, 0.001],
];
// ---- Héctor ----
const SENTADO = { y: 0.11, sentado: 1, inclina: 0.32 };
const HK = [
  // P1: apoyado en el mostrador, de 3/4 a cámara, el pote levantado en la derecha a la altura de la cara (sonrisa canchera)
  [0, { x: H0.x, z: H0.z, giro: GH_P1, inclina: 0.05, ...APOYA, ...aC(-0.12, -0.02, -0.06), ...CANCHERO }],
  // P3a: de perfil (3/4 a cámara), inclinado hacia Rubén; regatea; se instala (los codos en el mostrador) y saca el
  // monedero (lo maneja ponerPersonajes). Siempre de 3/4: nunca de nuca
  [T.p3a - 0.001, { x: H0.x, z: H0.z - 0.06, giro: GH_PER, inclina: 0.2, sentado: 0, y: 0, ...APOYA, ...aC(-0.3, 0.0, -0.05), ...CANCHERO }, 0.001],
  [T.instala, { inclina: 0.3, y: -0.05, manoI: [0.22, 0.26, 0.46], manoD: [-0.22, 0.26, 0.46], ...aC(-0.35, -0.04, -0.08) }, 0.3],
  // P5: PUÑO "¡Hecho!" (ojos abiertos, contento); le da la mano a Rubén
  [T.p5 - 0.001, { x: H0.x, z: H0.z, y: 0, sentado: 0, giro: GH_P1, inclina: 0.05, ...APOYA, ...aC(-0.12, 0.0, -0.05), ...CANCHERO }, 0.001],
  [T.puno + 0.18, { inclina: 0.0, z: H0.z + 0.05, ...BRAZOS.puno, manoI: [0.26, 0.2, 0.2], codoI: null, ...CARA.feliz, ...aC(-0.12, -0.12, -0.05), ojos: { abiertos: 1, feliz: 0.2 } }, 0.2],
  [T.mano[0], { inclina: 0.06, manoD: [-0.2, 0.36, 0.45], codoD: null, ...CANCHERO, ...aC(-0.05, 0.02, -0.04) }, T.mano[0] - T.puno - 0.25],
  // P6: de frente al mostrador (el billete) · P6h: el encuadre de P5, "Dejá." · "Quedate con el vuelto."
  [T.p6 - 0.001, { x: H0.x, z: H0.z, y: 0, sentado: 0, giro: Math.PI, inclina: 0.08, ...APOYA, ...aC(0, 0.25), ...CANCHERO }, 0.001],
  [T.p6h - 0.001, { x: H0.x, z: H0.z, giro: GH_P1, inclina: 0.04, ...APOYA, ...aC(-0.12, 0.0, -0.04), ...CANCHERO, ojos: { abiertos: 1, feliz: 0.3 } }, 0.001],
  // P7: en la puerta, le muestra el pote a Graciela (de 3/4 a cámara). Sale recién en P7c (fuera de cuadro)
  [T.p7 - 0.001, { x: HP.x, z: HP.z, y: 0, sentado: 0, giro: GH_PUERTA, inclina: 0.0, ...BRAZOS.costado, ...aC(0.0, 0.0), ...CARA.feliz, ojos: { abiertos: 0.95, feliz: 0.3 } }, 0.001],
  [T.hSale[1], { x: -3.3, z: -0.65, paso: 1, giro: -Math.PI / 2 }, T.hSale[1] - T.hSale[0], (u) => u],
  // ---- parte 2 ----
  // Q1: el mismo encuadre de P1, el mismo pote; "¿Me hac…" y le vibra el celular: lo saca y mira
  [P2 - 0.001, { x: H0.x, z: H0.z, y: 0, sentado: 0, paso: 0, giro: GH_P1, inclina: 0.05, ...APOYA, ...aC(-0.12, -0.02, -0.06), ...CANCHERO }, 0.001],
  [T.vibra + 0.05, { ...CARA.sorpresa, cejas: { alto: 0.7, ang: 0.1, asim: 0 }, boca: { sonrisa: 0.1, abierta: 0.25 }, ...aC(-0.05, 0.15, 0.0) }, 0.15],
  [T.saca[1], { ...CARA.concentrada, ...aC(0.0, 0.28, 0.0), ojos: { x: 0, y: -0.8, abiertos: 0.85 }, boca: { sonrisa: 0.2 } }, 0.3],
  // Q1b: mira la tarjeta
  [T.q1b - 0.001, { x: H0.x, z: H0.z, giro: Math.PI, inclina: 0.05, ...aC(0.0, 0.3, 0.0), ...CARA.concentrada, ojos: { x: 0, y: -0.85, abiertos: 0.9 }, boca: { sonrisa: 0.25 } }, 0.001],
  // Q2: "ya entendí" (cejas arriba): "¿Cuánto es?"
  [T.q2 - 0.001, { x: H0.x, z: H0.z, giro: GH_P1, inclina: 0.03, ...APOYA, ...aC(-0.12, -0.04, -0.03), ...CARA.esperanza, cejas: { alto: 0.85, ang: 0.15 }, ojos: { abiertos: 1, feliz: 0.15 } }, 0.001],
  // Q3: de perfil (el encuadre de P3a); estampa el billete; PUÑO (la misma pose de "¡Hecho!"): "¡Gané!"
  [T.q3 - 0.001, { x: H0.x, z: H0.z - 0.06, giro: GH_PER, inclina: 0.2, ...APOYA, ...aC(-0.3, 0.0, -0.05), ...CANCHERO }, 0.001],
  [T.puno2 + 0.18, { inclina: 0.05, ...BRAZOS.puno, manoD: [-0.58, 0.76, 0.26],   /* r2: más afuera: no toca la boina ni la cola */ ...CARA.feliz, ...aC(-0.35, -0.12, -0.05), ojos: { abiertos: 1, feliz: 0.2 } }, 0.2],
  [T.pote2 + 0.3, { ...CANCHERO, ...aC(-0.3, 0.05, -0.05), ...APOYA, inclina: 0.15 }, 0.35],
  // Q4: en la puerta con los dos potes en alto, DE FRENTE a cámara (orgulloso, sin hablar); se da vuelta y sale por el
  // carril de la izquierda de la puerta (Graciela espera afuera y entra por el otro carril cuando él ya pasó)
  [T.q4 - 0.001, { x: HP.x, z: HP.z, giro: 1.95, inclina: 0.0, ...BRAZOS.costado, ...aC(0.0, 0.0), ...CARA.feliz, ojos: { abiertos: 1, feliz: 0.3 } }, 0.001],
  [T.hSale2[0] + 0.12, { giro: -Math.PI / 2 - 0.1, paso: 1 }, 0.2],
  [T.hSale2[1], { x: -3.3, z: -0.65, paso: 1 }, T.hSale2[1] - T.hSale2[0] - 0.1, (u) => u],
];
// ---- Graciela ----
const G_MOST = V3(-0.32, 0, -0.72);
const GK = [
  [0, { x: -4.5, z: 0.05, giro: Math.PI / 2, ...BRAZOS.costado, ...CARA.feliz }],
  // P7: ya entró (la puerta se está cerrando detrás de ella), escucha a Héctor, mira el pote, mira a Rubén:
  // "Rubén, ¿me hacés precio?"
  [T.p7 - 0.001, { x: GP.x, z: GP.z, giro: GG_PUERTA, paso: 0, ...BRAZOS.costado, ...aC(0, 0), ...CARA.feliz, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.25 } }, 0.001],
  [T.h4 + 1.0, { ...aC(0.0, 0.25), ...CARA.sorpresa, ojos: { x: 0, y: -0.5, abiertos: 1 } }, 0.3],
  [T.g1 - 0.05, { giro: GG_RUBEN, ...aC(0.1, 0.0), ...CARA.esperanza, ojos: { x: 0.2, y: 0.05, abiertos: 1, feliz: 0.3 }, manoI: [0.12, 0.42, 0.34], manoD: [-0.12, 0.42, 0.34], codoI: null, codoD: null }, 0.35],
  // Q4: espera afuera, del otro lado del vidrio, hasta que Héctor sale por su carril; entra por el suyo (sin cruzarse);
  // "Rubén, ¿me hacés puntos?" (celular en alto) · Q4b: ya en el mostrador
  // (ronda 2) no está en Q4 (no se cruza con Héctor en la puerta): en Q4b entra caminando desde la izquierda hasta el
  // mostrador y recién ahí habla (la burbuja nace en el plano nuevo)
  [T.q4b - 0.001, { x: -1.08, z: -0.4, giro: 2.1, paso: 1, ...BRAZOS.costado, ...aC(0.0, 0), ...CARA.feliz, ojos: { x: 0.2, y: 0, abiertos: 1, feliz: 0.25 } }, 0.001],
  [T.entraG[1], { x: G_MOST.x, z: G_MOST.z, giro: 1.72 }   /* r2: de 3/4 a cámara (0,4 rad): los dos aros, sin perfil */, T.entraG[1] - T.entraG[0], (u) => eo(u)],
  [T.entraG[1] + 0.1, { paso: 0 }, 0.12],
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
// el punto entre el pulgar y el índice (donde se agarra una moneda), en el mundo
const puntaMano = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); const s = lado === "I" ? 1 : -1; return per.brazos[lado === "I" ? 0 : 1].mano.localToWorld(out.set(s * -0.03, -0.075, 0.05)); };
// la mano que lleva ESE punto a `mundo` (dos pasadas: la segunda corrige el largo de la mano)
function manoConPunta(per, pose, lado, mundo) {
  const p1 = manoA(per, { ...pose }, lado, mundo); per.poner(p1);
  const tip = puntaMano(per, lado, new THREE.Vector3());
  return manoA(per, { ...pose }, lado, mundo.clone().add(mundo.clone().sub(tip)));
}
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
};
const mezclaMano = (pose, p1, lado, k) => { pose[`mano${lado}`] = pose[`mano${lado}`].map((v, i) => lerp(v, p1[`mano${lado}`][i], k)); if (k > 0.5) pose[`codo${lado}`] = p1[`codo${lado}`]; };
const MATE_OFF = V3(0.11, -0.09, 0.02);
const PUNTA = V3(0, 0.31 * 1.25, -0.045 * 1.25);
const POTE_MOST = V3(-0.18, MOSTRADOR.y, -1.18);     // apoyado en el mostrador (parte 1, de P3a a P6)
const POTE_MOST2 = V3(0.6, MOSTRADOR.y, -1.12);      // parte 2 (Q3): el primero (del lado de la cámara: no lo tapa la tablet)
const POTE2_MOST = V3(0.74, MOSTRADOR.y, -1.3);     // el segundo, al lado
const MEET = V3(0.26, 1.06, -1.28);                  // donde se dan la mano
const BILL1 = V3(0.2, MOSTRADOR.y + 0.002, -1.19);   // el billete de P6, sobre la madera (r2: lejos del pote: se ve entero)
const BILL2 = V3(0.3, MOSTRADOR.y + 0.002, -1.28);   // el de Q3

function ponerPersonajes(t, plano) {
  // ---- Rubén ----
  const pr = poseEn(t, RK);
  const gR = pr.giro;
  // (ronda 2: sin sorbo: Rubén sostiene el mate)
  // P5: el choque de manos (la derecha de Rubén)
  if (en(t, T.p5, T.p6)) {
    const k = eio(sg(t, T.mano[0] - 0.05, T.mano[1])) * (1 - eio(sg(t, T.mano[1] + 0.12, T.mano[1] + 0.35)));
    ruben.poner(pr);
    const sacude = Math.sin(sg(t, T.mano[1], T.mano[1] + 0.25) * Math.PI * 2) * 0.02;
    const p1 = manoA(ruben, { ...pr, codoD: [-1, -0.6, -0.2] }, "D", MEET.clone().add(V3(0, sacude, -0.055)));
    mezclaMano(pr, p1, "D", k);
  }
  // P6: abre la latita (izquierda), busca, saca la moneda de 5 y la levanta para dársela
  if (en(t, T.p6, T.p6b)) {
    ruben.poner(pr);
    // (ronda 2) la moneda va ENTRE el pulgar y el índice: la mano lleva ese punto por el camino de la moneda
    const p1 = manoConPunta(ruben, { ...pr, codoI: [1, -0.6, -0.2] }, "I", monedaRubenPos(t));
    const k = eio(sg(t, T.p6 + 0.1, T.latita - 0.02));
    mezclaMano(pr, p1, "I", k); pr.dedoI = 0;
  }
  // P6b: la moneda entre el índice y el pulgar a la altura del pecho, al costado de la cara
  if (en(t, T.p6b, T.p7)) { pr.manoI = [0.13, 0.42, 0.44]; pr.codoI = [1, -0.6, -0.1]; pr.dedoI = 0; }   // (r2: más al centro, lejos del borde)
  // Q3: apoya el segundo pote al lado del primero (izquierda)
  if (en(t, T.q3, T.q4)) {
    const k = eio(sg(t, T.pote2 - 0.55, T.pote2 - 0.3)) * (1 - eio(sg(t, T.pote2 + 0.2, T.pote2 + 0.5)));
    if (k > 0) { ruben.poner(pr); const p1 = manoA(ruben, { ...pr, codoI: [1, -0.5, -0.2] }, "I", pote2Pos(t).add(V3(0.0, 0.2, -0.06))); mezclaMano(pr, p1, "I", k); }
  }
  // Q4: le acerca la tablet al celular de Graciela (derecha)
  if (en(t, T.q4, DUR)) {
    const k = eio(sg(t, T.scan - 0.65, T.scan - 0.35));
    if (k > 0) { ruben.poner(pr); const p1 = manoA(ruben, { ...pr, codoD: [-1, -0.5, -0.2] }, "D", tabletPos(t).add(V3(0.0, 0.03, -0.06))); mezclaMano(pr, p1, "D", k); }
  }
  bocaVoz(pr, t, T.r1, ENV.ruben1, 0.6);
  bocaVoz(pr, t, T.r2, ENV.ruben2, 0.6);
  // las burbujas mudas de Rubén ("Doscientos."): la boca se mueve un poquito
  for (const b of [T.bDos1, T.bDos2, T.bDos3]) if (en(t, b, b + 0.5)) pr.boca.abierta = Math.max(pr.boca.abierta, Math.abs(Math.sin((t - b) * 14)) * 0.3);
  ruben.poner(pr);

  // ---- Héctor ----
  const ph = poseEn(t, HK);
  // el pote en la derecha, levantado a la altura de la cara (P1, Q1): al costado, sin tapar la boca
  if (en(t, 0, T.p2) || en(t, P2, T.q1b)) {
    const baja = t >= P2 ? eio(sg(t, T.saca[0] - 0.1, T.saca[0] + 0.3)) : 0;
    ph.manoD = [-0.17 + 0 * baja, 0.54, 0.5]; ph.codoD = [-1, -0.7, -0.1];
  }
  // Q1: saca el celular del bolsillo del chaleco (izquierda) y lo mira; Q1b: lo sostiene mostrando la pantalla
  if (en(t, P2, T.q2)) {
    const k = eio(sg(t, T.saca[0], T.saca[1]));
    const p0 = [0.26, 0.18, 0.26], p1 = [0.17, 0.62, 0.44];   // (r2: arriba de la etiqueta y adentro del cuadro) del lado izquierdo de Héctor: no pasa por detrás de la etiqueta
    ph.manoI = t < T.saca[0] ? [0.24, 0.32, 0.42] : p0.map((v, i) => lerp(v, p1[i], k)); ph.codoI = [0.8, -0.8, -0.2];
    if (plano === "Q1b") { ph.manoI = [0.03, 0.55, 0.42]; ph.codoI = [0.8, -0.8, -0.2]; }
  }
  // P3a (el tercer escalón): instalado en el mostrador, levanta el monedero abierto con la DERECHA (del lado de la
  // cámara, en primer término) y lo sacude
  if (en(t, T.bMon - 0.2, T.p4)) {
    const k = eio(sg(t, T.bMon - 0.2, T.bMon + 0.05));
    ph.manoD = ph.manoD.map((v, i) => lerp(v, [-0.26, 0.62 + Math.sin(t * 34) * 0.012 * k, 0.4][i], k)); ph.codoD = [-1, -0.6, -0.2];
  }
  // P5: el choque de manos (la derecha de Héctor)
  if (en(t, T.mano[0] - 0.3, T.p6)) {
    const k = eio(sg(t, T.mano[0] - 0.25, T.mano[1])) * (1 - eio(sg(t, T.mano[1] + 0.12, T.mano[1] + 0.35)));
    hector.poner(ph);
    const sacude = Math.sin(sg(t, T.mano[1], T.mano[1] + 0.25) * Math.PI * 2) * 0.02;
    const p1 = manoA(hector, { ...ph, codoD: [-1, -0.6, -0.2] }, "D", MEET.clone().add(V3(0, sacude, 0.055)));
    mezclaMano(ph, p1, "D", k);
  }
  // P6: apoya el billete (derecha) con un golpecito; "dejá": la palma abierta hacia Rubén
  if (en(t, T.p6, T.p6b)) {
    hector.poner(ph);
    const kb = eio(sg(t, T.p6, T.billete)) * (1 - eio(sg(t, T.billete + 0.06, T.billete + 0.26)));   // (r2: la mano se va enseguida: el billete queda a la vista)
    const p1 = manoA(hector, { ...ph, codoD: [-1, -0.6, -0.2] }, "D", billete1Pos(t).add(V3(0.0, 0.05, 0.03)));
    mezclaMano(ph, p1, "D", kb);
    const kd = eio(sg(t, T.deja, T.deja + 0.25));   // (r2: recién en P6h: en el inserto no tapa nada)
    if (kd > 0) { const p2 = manoA(hector, { ...ph, codoD: [-1, -0.4, -0.3] }, "D", V3(0.42, 1.08 + Math.sin(t * 9) * 0.01 * kd, -1.12)); mezclaMano(ph, p2, "D", kd); ph.dedoD = 0; }
  }
  // P7 / Q4: el pote (o los dos) en alto
  if (en(t, T.p7, T.p7b) || en(t, T.q4, DUR)) {
    const muestra = t < P2 ? 1 - eio(sg(t, T.hSale[0], T.hSale[0] + 0.3)) * 0.4 : 1 - eio(sg(t, T.hSale2[0], T.hSale2[0] + 0.3)) * 0.4;
    ph.manoD = [-0.42, lerp(0.3, 0.5, muestra), 0.24]; ph.codoD = [-1, -0.6, -0.1];
    if (t >= P2) { ph.manoD = [-0.21, lerp(0.3, 0.48, muestra), 0.38]; ph.codoD = [-1, -0.6, -0.1]; ph.manoI = [0.21, lerp(0.3, 0.48, muestra), 0.38]; ph.codoI = [1, -0.6, -0.1]; }   // (r2: los dos potes juntos adelante del pecho)
  }
  // Q3: estampa el billete (derecha) y levanta el celular adelante del pecho, pantalla a cámara (izquierda)
  if (en(t, T.q3, T.q4)) {
    hector.poner(ph);
    const kb = eio(sg(t, T.q3, T.pago - 0.02)) * (1 - eio(sg(t, T.pago + 0.15, T.pago + 0.45)));
    const p1 = manoA(hector, { ...ph, codoD: [-1, -0.6, -0.2] }, "D", BILL2.clone().add(V3(0.0, 0.05 + (1 - sg(t, T.pago - 0.15, T.pago)) * 0.06, 0.03)));
    if (t < T.puno2) mezclaMano(ph, p1, "D", kb);
    const kc = eio(sg(t, T.pago + 0.1, T.mas20 - 0.15));
    if (kc > 0) { ph.manoI = ph.manoI.map((v, i) => lerp(v, [-0.02, 0.42, 0.5][i], kc)); ph.codoI = [1, -0.6, -0.2]; }
  }
  for (const [t0, e] of [[T.h1, "hector1"], [T.h2, "hector2"], [T.h3, "hector3"], [T.h4, "hector4"], [T.h5, "hector5"], [T.h6, "hector6"]]) bocaVoz(ph, t, t0, ENV[e], 0.65);
  for (const b of [T.b180, T.b190, T.bMon, T.pago]) if (en(t, b, b + 0.6)) ph.boca.abierta = Math.max(ph.boca.abierta, Math.abs(Math.sin((t - b) * 13)) * 0.35);
  if (en(t, T.bMeHac, T.vibra + 0.05)) ph.boca.abierta = Math.max(ph.boca.abierta, t < T.bMeHac + 0.3 ? Math.abs(Math.sin((t - T.bMeHac) * 13)) * 0.35 : 0.3);   // "¿Me hac…" queda con la boca abierta
  hector.poner(ph);

  // ---- Graciela ----
  const pg = poseEn(t, GK);
  if (t >= T.q4 && t >= T.g2 - 0.3) {
    const k = eio(sg(t, T.g2 - 0.3, T.g2 + 0.1));
    pg.manoD = [lerp(-0.29, -0.22, k), lerp(-0.08, 0.45, k), lerp(0.04, 0.3, k)]; pg.codoD = [-1, -0.7, -0.1];
  }
  for (const [t0, e] of [[T.g1, "graciela1"], [T.g2, "graciela2"]]) bocaVoz(pg, t, t0, ENV[e], 0.6);
  graciela.poner(pg);

  // visibilidad por plano (los que no están en cuadro no tapan la cámara)
  ruben.raiz.visible = plano !== "Q1b";
  hector.raiz.visible = !["P2", "P4", "P6b", "P7b", "Q2b"].includes(plano) && !(plano === "P7" && t > T.hSale[1] - 0.05) && !(plano === "Q4" && t > T.hSale2[1] - 0.05) && plano !== "Q4b" && plano !== "P7c";
  graciela.raiz.visible = ["P7", "P7c", "Q4b"].includes(plano);
  // en los planos cenitales del mostrador (P3b, P6) las cabezas quedarían cortadas en el borde: no se dibujan
  const cen = plano === "P6";
  hector.cabeza.visible = ruben.cabeza.visible = !cen;
}
// ---------- trayectorias de la utilería ----------
function bancoPos(t) {
  return BANCO0.clone();   // (ronda 2: el banquito queda contra la pared en las dos partes)
}
// el termo: apoyado (TERMO_C); en P3b la mano lo levanta, lo inclina sobre el mate (no sale nada) y lo devuelve
const SOBRE_MATE = V3(-0.29, 1.12, -1.5);
function termoPos(t) {
  return TERMO_C.clone();   // (ronda 1: sin el gag del termo)
}
function termoInclina(t) { return 0; }
function termoMano(t) { termo.updateMatrixWorld(true); return termo.localToWorld(V3(0.0, 0.24, 0.07)); }
function monedaTorre(i) { const k = i % 3, n = Math.floor(i / 3); return TORRES[k].clone().add(V3(0, 0.0042 * MON_S + n * 0.0075 * MON_S, 0)); }
function monedaPos(i, t) {
  // cada moneda sale del monedero y cae a su torre
  return null;   // (ronda 1: sin monedas en el mostrador)
  const t0 = T.monedas[0] + i * 0.066;
  if (t < t0 - 0.12) return "oculta";
  const fin = monedaTorre(i);
  if (t >= t0) return fin;
  const u = sg(t, t0 - 0.12, t0);
  const ini = MONEDERO.clone().add(V3(0, 0.02, 0));
  const p = ini.clone().lerp(fin, u); p.y = lerp(ini.y, fin.y, u * u);
  return p;
}
function billete1Pos(t) {
  if (t < T.p6 || t >= P2) return null;
  const u = eio(sg(t, T.p6, T.billete));
  return BILL1.clone().add(V3(0.0, 0.1, 0.0).multiplyScalar(1 - u));   // (r2: baja en el lugar: nunca cortado por el borde)
}
function monedaRubenPos(t) {
  // en la latita → levantada entre el índice y el pulgar (para dársela)
  const enLata = LATITA.clone().add(V3(0, 0.06, 0.0));
  const arriba = LATITA.clone().add(V3(0.04, 0.32, 0.12));      // sube a cámara (P6 cenital)
  const ofrece = V3(0.42, 1.12, -1.3);                           // P6h: se la ofrece a Héctor
  if (t >= T.p6h) return ofrece.clone();
  if (t < T.moneda[0]) return LATITA.clone().add(V3(0.0, 0.18, 0.0)).lerp(enLata, eio(sg(t, T.latita, T.moneda[0])));
  return enLata.lerp(arriba, eio(sg(t, T.moneda[0], T.moneda[1])));
}
function pote2Pos(t) {
  // Rubén lo trae desde atrás del mostrador (abajo, a su izquierda) y lo apoya al lado del primero con un rebote
  const desde = V3(0.55, 0.72, -1.62);
  const u = eio(sg(t, T.pote2 - 0.5, T.pote2));
  const p = desde.lerp(POTE2_MOST, u); p.y += Math.sin(Math.PI * Math.min(1, u * 1.1)) * 0.14;
  return t >= T.pote2 ? POTE2_MOST.clone() : p;
}
function tabletPos(t) {
  if (t < T.q4) return TABLET.clone();
  return V3(0.02, 0.75, -1.62).lerp(V3(-0.08, 1.02, -1.0), eio(sg(t, T.scan - 0.65, T.scan - 0.1)));
}

// ================= ESCENA EN EL TIEMPO =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3();
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  ponerCamara(t);
  const plano = planoActual;
  // el termo primero (la mano de Rubén lo sigue en P3b)
  termo.position.copy(termoPos(t)); termo.rotation.set(0, 0, -termoInclina(t) * 1.15);
  ponerPersonajes(t, plano);
  for (const per of [ruben, hector, graciela]) per.ojoLejano(camera.position);
  for (const [per, aros] of LENTES) lenteLejano(per, aros);
  herraduraSegunCamara();
  for (const l of LAMPS) l.visible = !SIN_LAMPS.includes(plano);
  relleno.position.copy(camera.position).add(V3(0.4, 0.8, 0)); relleno.target.position.copy(camera.position).add(camera.getWorldDirection(_a).multiplyScalar(3));

  // ---- la puerta y la campanita ----
  {
    // parte 1: Graciela acaba de entrar (la puerta se cierra al empezar P7); parte 2: se abre cuando sale Héctor y se
    // cierra cuando entró Graciela. Abierta, la hoja queda casi pegada a la fachada (no se cruza con nadie)
    const abre = (a, b) => eio(sg(t, a - 0.1, a + 0.25)) * (1 - eio(sg(t, b, b + 0.35)));
    const k = parte2 ? abre(T.campana2 - 0.05, T.entraG[1]) : t >= T.p7 - 0.5 ? 1 - eio(sg(t, T.p7, T.p7 + 0.35)) : 0;
    hoja.rotation.y = 1.5 * k;
    const tc = parte2 ? T.campana2 : T.campana;
    campanita.userData.cb.rotation.z = t >= tc ? Math.sin((t - tc) * 30) * 0.5 * Math.exp(-(t - tc) * 4) : 0;
  }
  // ---- el banquito ----
  banco.position.copy(bancoPos(t)); banco.rotation.y = 0.3;
  // ---- los potes ----
  {
    const enMano = en(t, 0, T.p3a) || en(t, P2, T.q3) || en(t, T.p7, T.p7b) || en(t, T.q4, DUR);
    if (enMano) {
      const p = manoMundo(hector, "D", _a);
      pote1.position.copy(p).add(V3(0, -0.07, 0)); pote1.rotation.set(0, hector.raiz.rotation.y + Math.PI, 0);
      // sobre la madera nunca se hunde
      if (pote1.position.z < -0.95 && pote1.position.z > -1.65 && pote1.position.y < MOSTRADOR.y) pote1.position.y = MOSTRADOR.y;
    } else { pote1.position.copy(parte2 ? POTE_MOST2 : POTE_MOST); pote1.rotation.set(0, 0.25, 0); }
    pote1.visible = !['P4', 'P6b', 'P7b', 'Q2b'].includes(plano) && !(plano === "P7" && t > T.hSale[1] - 0.05) && !(plano === "Q4" && t > T.hSale2[1] - 0.05) && plano !== "Q1b";
    ponerEtiqueta(pote1, camera.position, Math.sin(t * 3.1), 1);   // en Q1 la etiqueta se corre: el celular no sale de atrás de ella
    // pote2: el segundo (solo desde Q3, en la mano de Rubén; en Q4 en la izquierda de Héctor)
    pote2.visible = parte2 && t >= T.pote2 - 0.5;
    if (pote2.visible) {
      if (t >= T.q4) { const p = manoMundo(hector, "I", _a); pote2.position.copy(p).add(V3(0, -0.07, 0)); pote2.rotation.set(0, hector.raiz.rotation.y + Math.PI, 0); pote2.visible = !(t > T.hSale2[1] - 0.05); pote2.scale.setScalar(1); }
      else { pote2.position.copy(pote2Pos(t)); pote2.rotation.set(0, -0.2, 0); const sq = pulso(t, T.pote2, 0.18) * 0.12; pote2.scale.set(1 + sq, 1 - sq, 1 + sq); }
      ponerEtiqueta(pote2, camera.position, Math.sin(t * 3.1 + 1), 1);
    }
  }
  // ---- el monedero (P3b, en la izquierda de Héctor) y las monedas ----
  {
    monedero.visible = plano === "P3a" && t >= T.bMon - 0.2;
    if (monedero.visible) {
      const p = manoMundo(hector, "D", _a);
      monedero.scale.setScalar(2.8);
      monedero.position.copy(p).add(V3(0.0, -0.2, 0.0));
      monedero.userData.abrir(eio(sg(t, T.bMon - 0.05, T.bMon + 0.1)));
      monedero.rotation.set(0.15, hector.raiz.rotation.y + Math.PI, Math.sin(t * 34) * 0.08);
    }
    monedas.forEach((m, i) => {
      const p = monedaPos(i, t);
      m.visible = p !== null && p !== "oculta" && !["P1", "P2", "P4", "P6b", "P7b"].includes(plano);
      if (m.visible) { m.position.copy(p); m.rotation.set(0, i * 0.9, 0); }
    });
  }
  // ---- el billete, la latita y la moneda de 5 ----
  {
    const b1 = billete1Pos(t);
    billete1.visible = b1 !== null && plano !== 'P6b';
    if (b1) { billete1.position.copy(b1); billete1.rotation.set(0, 0.25, 0); }
    billete2.visible = parte2 && t >= T.q3;
    if (billete2.visible) { const u = sg(t, T.q3, T.pago); billete2.position.copy(BILL2).add(V3(0, 0.12 * (1 - eio(u)), 0.06 * (1 - u))); billete2.rotation.set(0, -0.2, 0); }
    latita.position.copy(LATITA); latita.rotation.set(0, -0.4, 0);
    latita.visible = !['P1', 'Q1', 'P5', 'Q2', 'P6h', 'P4', 'P6b', 'Q2b'].includes(plano);   // (Q2b: tapaba la tablet)   // en los planos de Héctor quedaba como un domo cortado abajo
    latita.userData.abrir(!parte2 ? eio(sg(t, T.latita - 0.12, T.latita + 0.08)) : 0);
    moneda5.visible = en(t, T.latita, T.p7);
    if (moneda5.visible) {
      // (r2) en la latita hasta que la agarra; después, siempre entre el pulgar y el índice de Rubén, de cara a la cámara
      if (t < T.moneda[0]) { moneda5.position.copy(monedaRubenPos(t)); moneda5.rotation.set(0, -0.5, 0); }
      else { moneda5.position.copy(puntaMano(ruben, "I", _a)); const dc = camera.position.clone().sub(moneda5.position).normalize(); moneda5.quaternion.setFromUnitVectors(V3(0, 1, 0), dc); }
    }
  }
  // ---- mate de Rubén ----
  {
    const conMate = en(t, T.p2, T.p3a) || en(t, T.q2b, T.q3);
    if (conMate) {
      const p = manoMundo(ruben, "D", _a);
      const rot = new THREE.Matrix4().makeRotationY(ruben.raiz.rotation.y);
      mateR.position.copy(p).add(MATE_OFF.clone().applyMatrix4(rot));
      mateR.rotation.set(0, ruben.raiz.rotation.y - Math.PI, 0);
    } else { mateR.position.copy(MATE_C); mateR.rotation.set(0, -1.2, 0); }
    mateR.visible = plano !== "P7b";   // (r2: la bombilla le atravesaba la nariz cuando apoya la frente)
  }
  // ---- los celulares y la tablet ----
  {
    celuH.visible = parte2 && (en(t, T.saca[0] + 0.18, T.q2) || en(t, T.pago + 0.1, T.puno2 + 0.02));
    if (celuH.visible) {
      dibujarPantH(t);
      const p = manoMundo(hector, "I", _a);
      const vib = en(t, T.vibra, T.vibra + 0.5) ? Math.sin(t * 90) * 0.004 : 0;
      const dd = camera.position.clone().sub(p); dd.y = 0; dd.normalize();
      celuH.position.copy(p).add(V3(vib, plano === 'Q1b' ? 0.2 : 0.15, 0.0)).add(dd.multiplyScalar(0.09));
      const d = camera.position.clone().sub(celuH.position);
      celuH.rotation.set(plano === "Q3" ? -0.05 : -0.12, Math.atan2(d.x, d.z), 0.0);
    }
    celuG.visible = parte2 && plano === "Q4b" && t >= T.g2 - 0.3;
    if (celuG.visible) {
      dibujarPantG(t);
      const p = manoMundo(graciela, "D", _a);
      { const dd = camera.position.clone().sub(p); dd.y = 0; dd.normalize(); celuG.position.copy(p).add(V3(0, 0.11, 0.0)).add(dd.multiplyScalar(0.05)); }
      const d = camera.position.clone().sub(celuG.position); celuG.rotation.set(-0.05, Math.atan2(d.x, d.z) - 0.35, 0);
    }
    tablet.visible = parte2 && !['Q1', 'Q1b', 'Q2', 'Q4'].includes(plano) && !(plano === 'Q4b' && t < T.scan - 0.65);
    if (tablet.visible) {
      dibujarPantT(t);
      tablet.position.copy(tabletPos(t));
      tablet.rotation.set(0, t >= T.q4 ? lerp(-0.3, 1.0, eio(sg(t, T.scan - 0.65, T.scan - 0.1))) : -0.3, 0);
      if (plano === "Q2b") { tablet.position.set(0.4, MOSTRADOR.y, -1.42); tablet.rotation.set(0, -0.12, 0); }   // (r2: entera en cuadro)
    }
  }

  // ---- globos ----
  {
    const ent = (ti) => (t < ti ? 0 : 0.7 + 0.3 * bk(sg(t, ti, ti + 0.2)));
    const sale = (tf) => 1 - eio(sg(t, tf - 0.12, tf));
    for (const k in GL) GL[k].visible = false;
    const hb = () => bocaPx(hector), rb = () => bocaPx(ruben), gb = () => bocaPx(graciela);
    if (plano === "P2" && t >= T.bDos1) { const [bx, by] = rb(); ponerGlobo(GL.dos1, 600, 470, ent(T.bDos1), [bx, by - 30]); }
    if (plano === "P3a") {
      // una burbuja por vez: la vieja se va cuando entra la nueva; arriba de las cabezas, sin tapar caras
      const [hx, hy] = hb(), [rx, ry] = rb();
      const yH = (b) => Math.min(620, hy - 330), yR = Math.min(620, ry - 330);
      if (en(t, T.b180, T.bDos2)) ponerGlobo(GL.c180, hx + 40, yH(), ent(T.b180) * sale(T.bDos2), [hx, hy - 70]);
      if (en(t, T.bDos2, T.b190)) ponerGlobo(GL.dos2, rx - 40, yR, ent(T.bDos2) * sale(T.b190), [rx, ry - 70], 1);
      if (en(t, T.b190, T.bDos3)) ponerGlobo(GL.c190, hx + 80, yH(), ent(T.b190) * sale(T.bDos3), [hx, hy - 70]);
      if (en(t, T.bDos3, T.bMon)) ponerGlobo(GL.dos3, rx - 40, yR, ent(T.bDos3) * sale(T.bMon), [rx, ry - 70], 1);
      if (t >= T.bMon) ponerGlobo(GL.mon, hx + 80, yH(), ent(T.bMon), [hx, hy - 70]);
    }
    // P4 · "Ciento noventa y cinco." en burbuja (abajo, la cola sube a la boca)
    if (plano === "P4" && t >= T.r1) { const [bx, by] = rb(); ponerGlobo(GL.r1, 540, 1480, ent(T.r1), [bx, by + 30]); }
    if (plano === "P5" && t >= T.puno) { const [hx, hy] = hb(); ponerGlobo(GL.hecho, hx + 150, Math.max(330, hy - 520), ent(T.puno), [hx + 40, hy - 50]); }   // (r2: del lado contrario al puño)
    // P6h · "Dejá." sola; la pausa; "Quedate con el vuelto." en otra burbuja, más grande: las dos con la cola a Héctor
    if (plano === "P6h") {
      const [hx, hy] = hb();
      if (t >= T.h3 && t < T.quedate) ponerGlobo(GL.deja1, hx - 60, 430, ent(T.h3) * sale(T.quedate), [hx, hy - 40]);
      if (t >= T.quedate) ponerGlobo(GL.deja2, hx - 40, 450, ent(T.quedate), [hx, hy - 40]);
    }
    if (plano === "P7") {
      if (t >= T.h4 && t < T.g1) { const [hx, hy] = hb(); ponerGlobo(GL.h4, hx + 60, Math.max(330, hy - 330), ent(T.h4) * sale(T.g1), [hx, hy - 40]); }
    }
    if (plano === "P7c" && t >= T.g1) { const [gx, gy] = gb(); ponerGlobo(GL.g1, gx + 40, Math.max(330, gy - 560), ent(T.g1), [gx, gy - 60]); }
    if (plano === "Q1" && t >= T.bMeHac) { const [hx, hy] = hb(); const tiembla = t > T.vibra ? Math.sin(t * 70) * 0.04 * Math.exp(-(t - T.vibra) * 3) : 0; ponerGlobo(GL.mehac, 560 + tiembla * 300, 470, ent(T.bMeHac), [hx, hy - 40], 0, tiembla); }
    // Q2b · "Doscientos." en burbuja (arriba, la cola baja a la boca)
    if (plano === "Q2b" && t >= T.r2) { const [bx, by] = rb(); ponerGlobo(GL.r2, 560, 380, ent(T.r2), [bx, by - 60]); }
    if (plano === "Q2" && t >= T.h5) { const [hx, hy] = hb(); ponerGlobo(GL.cuanto, hx - 80, Math.max(360, hy - 470), ent(T.h5), [hx, hy - 40]); }
    // la ficha de lo que ve el dueño (sin tapar la cara: abajo a la izquierda, la cola a la tablet)
    if (false && plano === "Q2b") {   // (ronda 2: la tablet ya se lee y la ficha la repetía)
 tablet.updateMatrixWorld(true); const [tx, ty] = enPantalla(tablet.localToWorld(V3(0, 0.12, 0))); ponerGlobo(GL.ficha, 260, 1250, ent(T.q2b + 0.12), [tx - 40, ty + 40]); }
    if (plano === "Q3") {
      const [hx, hy] = hb();
      if (t >= T.pago && t < T.mas20) ponerGlobo(GL.pago, hx + 40, Math.min(620, hy - 330), ent(T.pago) * sale(T.mas20), [hx, hy - 70]);
      // "¡Gané!" arriba, corrida hacia Rubén: no tapa la cara ni el puño (el puño está del lado de la cámara)
      if (t >= T.h6) ponerGlobo(GL.gane, hx + 220, Math.min(560, hy - 380), ent(T.h6), [hx + 40, hy - 70]);
      if (celuH.visible) {
        const [cx, cy] = enPantalla(celuH.getWorldPosition(_b));
        if (t >= T.mas20 && t < T.premio) ponerGlobo(GL.mas20, cx + 60, 600, ent(T.mas20) * sale(T.premio), null, 2);
        if (t >= T.premio && t < T.h6) ponerGlobo(GL.premio, cx + 60, 610, ent(T.premio) * sale(T.h6), null, 2);
      }
    }
    if (plano === "Q4b") {
      if (t >= T.g2 && t < T.ok20) { const [gx, gy] = gb(); ponerGlobo(GL.g2, gx + 80, Math.max(330, gy - 360), ent(T.g2) * sale(T.ok20), [gx, gy - 40]); }
      if (t >= T.ok20 && plano === "Q4b") { const [tx, ty] = enPantalla(tablet.getWorldPosition(_b)); ponerGlobo(GL.ok20, tx, ty + 260, ent(T.ok20), null, 2); }
    }
  }
  // ---- los números del regateo ----
  {
    o180.visible = o190.visible = false;
    const vis200 = ["P2", "P3a", "P4", "P6h", "P6b"].includes(plano) || (parte2 && ["Q2", "Q3"].includes(plano));
    NUM.visible = vis200;
    if (vis200) {
      // dónde va el 200 (siempre sobre su placa navy con borde crema: se lee sobre cualquier fondo)
      let cx = 540, cy = 330, s = 1;
      if (plano === "P2") { cy = 250; s = 0.9; }
      if (plano === "P3a") { cx = 660; cy = 300; s = 0.85; }
      if (plano === "P4") { cy = 210; s = 0.8; }
      if (plano === "P6h") { cx = 540; cy = 190; s = 0.85; }
      if (plano === "P6b") { cx = 740; cy = 250; s = 0.7; }
      if (plano === "Q2") { cy = 250; s = 0.7; }
      if (plano === "Q3") { cx = 600; cy = 300; s = 0.85; }
      const entra = plano === "P2" ? bk(sg(t, T.bDos1 - 0.05, T.bDos1 + 0.25)) : 1;
      const k = halfK();
      NUM.position.set(0, 0, -NUM_D); NUM.scale.setScalar(k * PXK * NUM_D);
      let nx = (cx - 540) / PXK + (n200peso.userData.ancho + 0.03) / 2 * s;
      // (ronda 2) P3a: la oferta (a la izquierda) y la placa del 200 (a la derecha) entran las dos con 75 px de margen
      const OFS = 0.8, MARG = 0.075, GAP = 0.035, L0 = -0.54 + MARG;
      if (plano === "P3a") {
        const wo0 = Math.max(o180.userData.w, o190.userData.w);
        s = Math.min(s, (1.08 - 2 * MARG - GAP) / (wo0 * OFS + PLACA.wP));
        nx = L0 + wo0 * OFS * s + GAP - (PLACA.xP - PLACA.wP / 2) * s;
      }
      n200.position.set(nx, (960 - cy) / PXK, 0);
      let golpe = 0; for (const c of [T.b180 + 0.3, T.b190 + 0.3]) golpe = Math.max(golpe, pulso(t, c, 0.22));
      const late = parte2 ? pulso(t, T.tilde, 0.3) : 0;
      const golpe2 = !parte2 && t >= T.rodillo2 ? pulso(t, T.rodillo2 + 0.2, 0.25) : 0;
      n200.scale.setScalar(Math.max(0.001, s * entra * (1 + 0.08 * golpe + 0.1 * late + 0.12 * golpe2)));
      n200.rotation.set(0.12 + Math.sin(t * 0.8) * 0.03, -0.2 + Math.sin(t * 0.6) * 0.05 + golpe * 0.08, golpe * 0.04);
      // los cambios de precio dan vuelta en el lugar (cada dígito se achata y aparece el nuevo): nada viaja fuera de la
      // placa ni cruza una cabeza. 200 → 195 en P4; con "Quedate con el vuelto." 195 → 200 crema (pagó el precio entero)
      // (r2: los tres dígitos a la vez y rápido: a mitad del giro nunca se lee un número mezclado como "$ 100")
      const rd = (i) => (parte2 ? 0 : eio(sg(t, T.rodillo, T.rodillo + 0.16)));
      const rv = (i) => (parte2 ? 0 : eio(sg(t, T.rodillo2, T.rodillo2 + 0.16)));
      const vuelta = !parte2 && t >= T.rodillo2;
      const flip = (m, sy) => { m.position.y = 0; m.scale.y = Math.max(0.001, sy); m.visible = sy > 0.08; };
      n200dig.userData.piezas.forEach((m, i) => { const f = vuelta ? rv(i) : 1 - rd(i); flip(m, Math.max(0, f * 2 - 1)); });
      n195dig.userData.piezas.forEach((m, i) => { const f = vuelta ? 1 - rv(i) : rd(i); flip(m, Math.max(0, f * 2 - 1)); });
      const r = vuelta ? 1 - rv(0) : rd(0);
      n200peso.visible = r < 0.5; n195peso.visible = r >= 0.5;
      tilde.visible = parte2 && t >= T.tilde && plano === "Q3";
      tilde.scale.setScalar(Math.max(0.001, bk(sg(t, T.tilde, T.tilde + 0.25))));
      // las ofertas (P3a): entran desde la izquierda, chocan contra el $ 200, se tachan y se achican en su lugar
      // (siempre dentro del cuadro, del mismo tamaño que el 200)
      if (plano === "P3a") {
        for (const [o, t0] of [[o180, T.b180], [o190, T.b190]]) {
          if (t < t0 || t > t0 + 1.05) continue;
          o.visible = true;
          const choque = t0 + 0.3, tacha = t0 + 0.42, cae = t0 + 0.62;
          const so = s * OFS, ws = o.userData.w * so;
          // nace adentro del cuadro (pop desde el 50 %) y se arrima a la placa: nunca cortado por el borde
          const xC = L0 + Math.max(o180.userData.w, o190.userData.w) * so - ws / 2;
          const u0 = sg(t, t0, choque);
          let x = xC - 0.04 * (1 - eo(u0)), y = (960 - cy) / PXK, rz = 0, sc = so * (0.5 + 0.5 * bk(sg(t, t0, t0 + 0.2)));
          if (t > choque) x -= pulso(t, choque, 0.18) * 0.03;
          if (t > cae) { const u = eio(sg(t, cae, cae + 0.4)); y -= u * 0.08; rz = u * 0.9; sc = so * (1 - u); }
          o.visible = sc > so * 0.3;   // (r2: sin la mota roja que quedaba al final de la caída)
          o.position.set(x, y, 0.02); o.rotation.set(0.1, 0.2, rz); o.scale.setScalar(Math.max(0.001, sc));
          o.userData.raya.scale.set(Math.max(0.001, eo(sg(t, tacha, tacha + 0.12))), 1, 1);
          o.userData.raya.visible = t > tacha;
        }
      }
    }
  }

  if (en(tIn, P1, P2) || LIMPIO) { NUM.visible = false; for (const k in GL) GL[k].visible = false; }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
