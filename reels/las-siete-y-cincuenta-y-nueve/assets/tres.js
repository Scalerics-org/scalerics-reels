// Capa 3D de las-siete-y-cincuenta-y-nueve (Three.js r170 local). Base técnica: reels/abren-hoy.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek); azar con semilla.
// El set: la vereda de noche del almacén de Rubén con la cortina metálica enrollable, el almacén por dentro
// (mostrador, estantes, reloj de pared, perchero), la lista que se desenrolla hasta la calle y, en la parte 2, la
// oficina de Walter (el celular con la tienda genérica "Almacén de Rubén") y el mostrador a la tarde con la bolsa.
// Personajes en assets/personajes.js (copia del canónico + Walter, campera, corbata, sentado y utilería).
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { crearPersonaje, ELENCO, MARCA, poseEn, mezclar, CARA, BRAZOS, saludo, crearMate, crearTermo, crearMochila, crearBolsa, crearGancho, crearLapicera, crearCamperaColgada } from "./personajes.js";
import { T, DUR, P1, P2, VOZ1_ENV, VOZ2_ENV } from "./tiempos3d.js";
await Promise.all([...["700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('600 60px "Caveat"')]);

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
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1220);
const camera = new THREE.PerspectiveCamera(38, 1080 / 1920, 0.03, 90);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x0c1424);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, Math.PI / 2.4, 0xfff1dc, 2.2);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xbcd6ff, 1.6);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.2);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.5;

// luces: una principal con sombra que cambia según el set (farol de noche, lámpara adentro, sol a la tarde, la
// lámpara del escritorio), cielo, contraluz y relleno frontal suave para que las caras se lean
const key = new THREE.DirectionalLight(0xffd9a0, 2.2);
key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0006; key.shadow.radius = 4;
key.shadow.camera.near = 0.5; key.shadow.camera.far = 20;
scene.add(key, key.target);
const cielo = new THREE.HemisphereLight(0x9fb6e0, 0x1a2234, 0.7); scene.add(cielo);
const rim = new THREE.DirectionalLight(0x9cc4ff, 1.0); rim.position.set(4, 4, -4); scene.add(rim);
const relleno = new THREE.DirectionalLight(0xdfe8ff, 0.55); scene.add(relleno, relleno.target);
const farolLuz = new THREE.PointLight(0xffc77a, 10, 9, 1.6); scene.add(farolLuz);
const lampara = new THREE.PointLight(0xffd59a, 8, 7, 1.5); lampara.position.set(0.4, 2.85, -1.6); scene.add(lampara);
const escritorioLuz = new THREE.PointLight(0xffd29a, 0, 4, 1.6); scene.add(escritorioLuz);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, mostaza: 0xd9a441 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  fachada: mat(C.navy2, 0.85), marco: mat(C.cr, 0.45), g: mat(C.g, 0.5), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.6), cr3: mat(C.cr3, 0.55),
  navy: mat(C.navy, 0.5), navy3: mat(C.navy3, 0.6), red: mat(C.red, 0.55), madera: mat(C.madera, 0.55), maderaO: mat(0x6e4a2e, 0.6),
  pared: mat(0xe7dcc4, 0.85), estante: mat(0x7a5233, 0.6), blanco: mat(0xffffff, 0.5),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData.ctx = x; t.userData.canvas = c; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const FC = (s, w = 600) => `${w} ${s}px "Caveat", cursive`;
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ================= EL SET: la vereda de noche =================
const VEREDA_Z = 3.2; // el cordón
const PUERTA = { x0: -1.0, x1: 1.0, alto: 2.4 };
const VENT = { x0: 1.4, x1: 2.75, y0: 0.8, y1: 2.15 };
const exterior = new THREE.Group(); scene.add(exterior);
{
  const baldosa = lienzo(1024, 1024, (x) => {
    x.fillStyle = "#9d9a8e"; x.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
      x.fillStyle = (i + j) % 2 ? "#a7a497" : "#999688"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122);
      x.fillStyle = "rgba(0,0,0,0.07)"; for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) { x.beginPath(); x.arc(i * 128 + 20 + a * 29, j * 128 + 20 + b * 29, 7, 0, 7); x.fill(); }
    }
  });
  baldosa.wrapS = baldosa.wrapT = THREE.RepeatWrapping; baldosa.repeat.set(7, 2.6);
  const v = mesh(new THREE.PlaneGeometry(14, VEREDA_Z), new THREE.MeshStandardMaterial({ map: baldosa, roughness: 0.85 }), 0, 0, VEREDA_Z / 2); v.rotation.x = -Math.PI / 2; v.castShadow = false; exterior.add(v);
  exterior.add(mesh(rbox(14, 0.16, 0.22, 0.03), M.cr3, 0, -0.07, VEREDA_Z + 0.02));
  const calle = mesh(new THREE.PlaneGeometry(40, 30), mat(0x232a36, 0.95), 0, -0.15, VEREDA_Z + 15); calle.rotation.x = -Math.PI / 2; calle.castShadow = false; exterior.add(calle);
  // línea discontinua de la calle
  for (let i = -8; i < 8; i++) { const l = mesh(new THREE.PlaneGeometry(0.9, 0.1), mat(0xd9d7c9, 0.8), i * 1.8, -0.145, VEREDA_Z + 4.2); l.rotation.x = -Math.PI / 2; l.castShadow = false; exterior.add(l); }
  // cordón de enfrente
  exterior.add(mesh(rbox(40, 0.16, 0.22, 0.03), M.cr3, 0, -0.07, VEREDA_Z + 8.4));
}
// fachada: pared navy con el hueco de la cortina y una vidriera iluminada a la derecha
const fachada = new THREE.Group(); scene.add(fachada);
{
  const Z = -0.06, D = 0.12, ALTO = 4.4;
  const pared = (x0, x1, y0, y1) => { const m = mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, D), M.fachada, (x0 + x1) / 2, (y0 + y1) / 2, Z); m.castShadow = false; fachada.add(m); };
  pared(-7, PUERTA.x0, 0, ALTO); pared(PUERTA.x0, PUERTA.x1, PUERTA.alto, ALTO);
  pared(PUERTA.x1, VENT.x0, 0, ALTO); pared(VENT.x0, VENT.x1, 0, VENT.y0); pared(VENT.x0, VENT.x1, VENT.y1, ALTO); pared(VENT.x1, 7, 0, ALTO);
  // zócalo crema y marcos
  fachada.add(mesh(rbox(14, 0.22, 0.16, 0.02), M.cr2, 0, 0.11, Z + 0.03));
  const barra = (x, y, w, h) => fachada.add(mesh(rbox(w, h, 0.16, 0.025), M.marco, x, y, 0.0));
  barra(PUERTA.x0 - 0.04, PUERTA.alto / 2, 0.1, PUERTA.alto); barra(PUERTA.x1 + 0.04, PUERTA.alto / 2, 0.1, PUERTA.alto);
  const vcx = (VENT.x0 + VENT.x1) / 2, vw = VENT.x1 - VENT.x0;
  barra(VENT.x0 + 0.04, (VENT.y0 + VENT.y1) / 2, 0.09, VENT.y1 - VENT.y0); barra(VENT.x1 - 0.04, (VENT.y0 + VENT.y1) / 2, 0.09, VENT.y1 - VENT.y0);
  barra(vcx, VENT.y1 - 0.04, vw, 0.09); barra(vcx, VENT.y0 + 0.04, vw, 0.09);
  const vidrio = new THREE.Mesh(new THREE.PlaneGeometry(vw - 0.1, VENT.y1 - VENT.y0 - 0.1), new THREE.MeshPhysicalMaterial({ color: 0xbfd8ff, roughness: 0.05, transparent: true, opacity: 0.12, depthWrite: false }));
  vidrio.position.set(vcx, (VENT.y0 + VENT.y1) / 2, 0.0); fachada.add(vidrio);
  // caja del tambor de la cortina
  fachada.add(mesh(rbox(2.3, 0.3, 0.34, 0.04), M.cr3, 0, PUERTA.alto + 0.16, 0.13));
  // letrero ALMACÉN (el de abren-hoy, más grande) con una lucecita
  const tex = lienzo(1024, 230, (x) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, 1024, 230); x.strokeStyle = "#16243d"; x.lineWidth = 12; x.strokeRect(18, 18, 988, 194); x.fillStyle = "#16243d"; x.font = F(900, 132); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ALMACÉN", 512, 122); });
  const crL = mat(C.cr, 0.6);
  fachada.add(mesh(rbox(1.9, 0.43, 0.07, 0.03), [crL, crL, crL, crL, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.22 }), crL], 0, 3.12, 0.03));
  // vinilo en la vidriera
  const letrero = lienzo(1024, 200, (x) => { x.fillStyle = "#efeee5"; x.font = F(800, 96); x.textAlign = "center"; x.fillText("FIAMBRES", 512, 130); });
  const vin = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.215), new THREE.MeshBasicMaterial({ map: letrero, transparent: true, opacity: 0.92, depthWrite: false })); vin.position.set(vcx, 1.95, 0.012); fachada.add(vin);
}
// el farol de la calle (a la izquierda): poste navy, brazo y foco cálido
const FAROL = V3(-2.5, 3.3, 2.75);
{
  const g = new THREE.Group(); exterior.add(g);
  g.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 3.4, 12), M.navy3, FAROL.x, 1.7, FAROL.z));
  const brazo = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.6, 8), M.navy3, FAROL.x + 0.25, 3.35, FAROL.z); brazo.rotation.z = Math.PI / 2; g.add(brazo);
  g.add(mesh(new THREE.ConeGeometry(0.22, 0.18, 16, 1, true), M.navy3, FAROL.x + 0.5, 3.3, FAROL.z));
  const foco = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 10), new THREE.MeshBasicMaterial({ color: 0xffe2a8 })); foco.position.set(FAROL.x + 0.5, 3.2, FAROL.z); g.add(foco);
}
farolLuz.position.set(FAROL.x + 0.5, 3.0, FAROL.z);

// la cortina metálica enrollable: lamas crema con la ranura navy marcada, zócalo navy con argolla. Baja según
// `gap` (alto del hueco que queda abajo, en m): las lamas salen del tambor y bajan como una sola pieza.
const cortina = new THREE.Group(); scene.add(cortina);
const LAMA = 0.085, NL = Math.ceil(PUERTA.alto / LAMA) + 1;
const lamas = [];
{
  const lm = mat(C.cr2, 0.55, { metalness: 0.15 }), rm = mat(C.navy3, 0.7);
  const lg = rbox(PUERTA.x1 - PUERTA.x0 + 0.04, LAMA * 0.84, 0.035, 0.012), rg = new THREE.BoxGeometry(PUERTA.x1 - PUERTA.x0 + 0.02, LAMA * 0.16, 0.02);
  for (let i = 0; i < NL; i++) {
    const g = new THREE.Group(); g.add(mesh(lg, lm, 0, LAMA * 0.08, 0)); const r = mesh(rg, rm, 0, -LAMA * 0.42, -0.004); r.castShadow = false; g.add(r);
    cortina.add(g); lamas.push(g);
  }
}
const zocalo = new THREE.Group(); cortina.add(zocalo);
zocalo.add(mesh(rbox(PUERTA.x1 - PUERTA.x0 + 0.06, 0.07, 0.06, 0.02), M.navy3));
const argolla = mesh(new THREE.TorusGeometry(0.04, 0.012, 6, 16), mat(0xc9ccd2, 0.3, { metalness: 0.6 }), 0.3, -0.045, 0.04); zocalo.add(argolla);
cortina.position.set(0, 0, 0.07);
// la luz cálida que se escapa por abajo de la cortina (sobre la vereda)
const luzPiso = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.6), new THREE.MeshBasicMaterial({ map: lienzo(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, "rgba(255,214,150,0.55)"); g.addColorStop(1, "rgba(255,214,150,0)"); x.fillStyle = g; x.fillRect(0, 0, 256, 256); }), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
luzPiso.rotation.x = -Math.PI / 2; luzPiso.position.set(0, 0.006, 0.8); scene.add(luzPiso);
function ponerCortina(gap) {
  const yb = cl(gap, 0, PUERTA.alto);
  zocalo.position.y = yb;
  for (let i = 0; i < NL; i++) { const y = yb + 0.035 + (i + 0.5) * LAMA; lamas[i].position.y = y; lamas[i].visible = y < PUERTA.alto + 0.02; }
  cortina.visible = yb < PUERTA.alto - 0.03;
  luzPiso.material.opacity = cl(yb / 0.9) * (1 - sg(yb, 1.6, 2.3)) + 0.25 * sg(yb, 1.6, 2.3);
  luzPiso.scale.set(1, lerp(0.35, 1, cl(yb / 1.2)), 1); luzPiso.position.z = 0.8 * luzPiso.scale.y;
  return yb;
}
const gancho = crearGancho(); scene.add(gancho);

// ================= EL ALMACÉN POR DENTRO =================
const interior = new THREE.Group(); scene.add(interior);
const MOSTRADOR = { x: 0.5, y: 0.9, z: -1.35, w: 2.2, d: 0.62 };
{
  const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(3.4, 2.4);
  const p = mesh(new THREE.PlaneGeometry(5.0, 3.36), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.45 }), 0.5, 0.003, -1.68); p.rotation.x = -Math.PI / 2; p.castShadow = false; interior.add(p);
  const w1 = mesh(new THREE.BoxGeometry(5.0, 3.3, 0.1), M.pared, 0.5, 1.65, -3.35); w1.castShadow = false; interior.add(w1);
  for (const x of [-2.0, 3.0]) { const w = mesh(new THREE.BoxGeometry(0.1, 3.3, 3.4), M.pared, x, 1.65, -1.68); w.castShadow = false; interior.add(w); }
  const techo = mesh(new THREE.BoxGeometry(5.0, 0.1, 3.4), M.pared, 0.5, 3.3, -1.68); techo.castShadow = false; interior.add(techo);
  // zócalo verde en las paredes
  interior.add(mesh(rbox(4.9, 0.12, 0.03, 0.01), M.g, 0.5, 0.06, -3.29));
  // estantes llenos (3 niveles), con frascos, cajas y botellas de colores de marca
  semilla = 7;
  const colores = [C.g, C.cr, C.red, C.mostaza, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  for (const y of [0.72, 1.28, 1.84]) {
    interior.add(mesh(rbox(4.3, 0.05, 0.42, 0.015), M.estante, 0.5, y, -3.08));
    for (let x = -1.55; x < 2.65; x += 0.17 + az() * 0.08) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (k < 0.45) { const h = 0.22 + az() * 0.16; interior.add(mesh(rbox(0.13, h, 0.16, 0.012), mat(c, 0.6), x, y + 0.025 + h / 2, -3.02)); }
      else if (k < 0.75) { interior.add(mesh(cuerpoFrasco, mat(c, 0.35), x, y + 0.125, -3.02)); interior.add(mesh(tapa, M.cr, x, y + 0.245, -3.02)); }
      else { interior.add(mesh(botella, mat(c, 0.3), x, y + 0.175, -3.02)); interior.add(mesh(pico, mat(C.cr3, 0.4), x, y + 0.37, -3.02)); }
    }
  }
  for (const x of [-1.62, 2.62]) interior.add(mesh(rbox(0.05, 1.7, 0.42, 0.015), M.estante, x, 1.25, -3.08));
  // mostrador: frente navy con filete verde, tapa de madera
  const MX = MOSTRADOR;
  interior.add(mesh(rbox(MX.w, 0.86, MX.d, 0.03), M.navy3, MX.x, 0.43, MX.z));
  interior.add(mesh(rbox(MX.w + 0.12, 0.06, MX.d + 0.1, 0.02), M.madera, MX.x, MX.y - 0.03, MX.z));
  interior.add(mesh(rbox(MX.w - 0.2, 0.06, 0.02, 0.01), M.g, MX.x, 0.3, MX.z + MX.d / 2 + 0.005));
  // balanza y frasco de caramelos a la derecha
  interior.add(mesh(rbox(0.32, 0.1, 0.28, 0.03), M.cr, MX.x + 0.92, MX.y + 0.05, MX.z - 0.12));
  interior.add(mesh(rbox(0.36, 0.025, 0.3, 0.01), mat(0xb9c0c8, 0.3), MX.x + 0.92, MX.y + 0.12, MX.z - 0.12));
  // lámpara colgante
  interior.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 6), M.navy, 0.4, 3.05, -1.6));
  const pant = mesh(new THREE.ConeGeometry(0.22, 0.16, 20, 1, true), M.g, 0.4, 2.78, -1.6); pant.material = mat(C.g, 0.5, { side: THREE.DoubleSide }); interior.add(pant);
  { const f = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), new THREE.MeshBasicMaterial({ color: 0xfff0c8 })); f.position.set(0.4, 2.72, -1.6); interior.add(f); }
}
// el reloj de pared: esfera crema, números navy, borde verde, agujas navy (marca la hora del chiste)
const RELOJ = V3(0.62, 2.48, -3.28);
const agujaH = new THREE.Group(), agujaM = new THREE.Group();
{
  const g = new THREE.Group(); g.position.copy(RELOJ); interior.add(g);
  const esfera = lienzo(512, 512, (x) => {
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(256, 256, 250, 0, 7); x.fill();
    x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 62);
    for (let h = 1; h <= 12; h++) { const a = (h / 12) * Math.PI * 2; x.fillText(String(h), 256 + Math.sin(a) * 188, 262 - Math.cos(a) * 188); }
    for (let m = 0; m < 60; m++) { if (m % 5 === 0) continue; const a = (m / 60) * Math.PI * 2; x.beginPath(); x.arc(256 + Math.sin(a) * 232, 256 - Math.cos(a) * 232, 4, 0, 7); x.fill(); }
  });
  g.add(mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.05, 40).rotateX(Math.PI / 2), M.g));
  const cara = new THREE.Mesh(new THREE.CircleGeometry(0.22, 40), new THREE.MeshStandardMaterial({ map: esfera, roughness: 0.5 })); cara.position.z = 0.027; g.add(cara);
  const am = mat(C.navy, 0.4);
  agujaH.add(mesh(rbox(0.024, 0.12, 0.01, 0.005), am, 0, 0.05, 0)); agujaM.add(mesh(rbox(0.016, 0.18, 0.01, 0.005), am, 0, 0.08, 0));
  agujaH.position.z = 0.034; agujaM.position.z = 0.042; g.add(agujaH, agujaM);
  g.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.03, 12).rotateX(Math.PI / 2), M.red, 0, 0, 0.048));
}
// el perchero de pie (detrás del mostrador, a la derecha de Rubén): poste de madera, base y tres ganchos
const PERCHERO = V3(-0.25, 0, -2.35);
const ganchoPerchero = V3(PERCHERO.x + 0.0, 1.78, PERCHERO.z + 0.12);
{
  const g = new THREE.Group(); g.position.copy(PERCHERO); interior.add(g);
  g.add(mesh(new THREE.CylinderGeometry(0.03, 0.035, 1.9, 10), M.maderaO, 0, 0.95, 0));
  for (let i = 0; i < 3; i++) { const p = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.34, 8), M.maderaO, 0, 0.04, 0); p.rotation.set(Math.PI / 2, (i / 3) * Math.PI * 2, 0); const q = new THREE.Group(); q.rotation.y = (i / 3) * Math.PI * 2; q.add(mesh(rbox(0.36, 0.035, 0.035, 0.012), M.maderaO, 0, 0.02, 0)); g.add(q); }
  for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2 + 0.5; const h = mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.16, 8), M.maderaO, Math.sin(a) * 0.08, 1.78, Math.cos(a) * 0.08); h.rotation.set(Math.cos(a) * 0.9, 0, -Math.sin(a) * 0.9); g.add(h); }
  g.add(mesh(new THREE.SphereGeometry(0.045, 12, 8), M.maderaO, 0, 1.92, 0));
}
const camperaColgada = crearCamperaColgada({ color: C.navy3, cuello: C.navy3, cierre: C.g }); scene.add(camperaColgada);
// el cajón de verduras (dado vuelta: Walter se sienta)
const CAJON = V3(0.8, 0, -0.66);
{
  const g = new THREE.Group(); g.position.copy(CAJON); g.rotation.y = 0.25; interior.add(g);
  for (const y of [0.05, 0.16, 0.27]) for (const s of [-1, 1]) { g.add(mesh(rbox(0.52, 0.07, 0.02, 0.005), M.madera, 0, y, s * 0.17)); g.add(mesh(rbox(0.02, 0.07, 0.34, 0.005), M.madera, s * 0.25, y, 0)); }
  g.add(mesh(rbox(0.54, 0.025, 0.36, 0.005), M.madera, 0, 0.32, 0));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(mesh(rbox(0.04, 0.33, 0.04, 0.005), M.maderaO, sx * 0.25, 0.165, sz * 0.165));
}

// ================= LA OFICINA DE WALTER (parte 2, plano A): lejos, en x = 30 =================
const OF = V3(30, 0, 0);
const oficina = new THREE.Group(); oficina.position.copy(OF); scene.add(oficina);
{
  oficina.add(mesh(new THREE.BoxGeometry(6, 3.4, 0.1), mat(0x16243d, 0.9), 0, 1.7, -1.6));
  const p = mesh(new THREE.PlaneGeometry(6, 5), mat(0x3a3f4a, 0.9), 0, 0, 0); p.rotation.x = -Math.PI / 2; oficina.add(p);
  // escritorio, lámpara, planilla de papel, taza, monitor de espaldas
  oficina.add(mesh(rbox(1.6, 0.05, 0.8, 0.015), M.cr2, 0, 0.74, -0.7));
  for (const sx of [-1, 1]) oficina.add(mesh(rbox(0.05, 0.72, 0.7, 0.01), M.navy3, sx * 0.75, 0.36, -0.7));
  const lam = new THREE.Group(); lam.position.set(-0.5, 0.765, -0.9); oficina.add(lam);
  lam.add(mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.02, 16), M.navy3));
  const brazo = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.42, 8), M.navy3, 0.05, 0.2, 0); brazo.rotation.z = -0.25; lam.add(brazo);
  const cab = mesh(new THREE.ConeGeometry(0.09, 0.14, 16, 1, true), mat(C.g, 0.5, { side: THREE.DoubleSide }), 0.16, 0.4, 0.05); cab.rotation.z = 0.9; lam.add(cab);
  { const f = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfff0c8 })); f.position.set(0.19, 0.37, 0.05); lam.add(f); }
  const planilla = lienzo(256, 360, (x) => { x.fillStyle = "#ffffff"; x.fillRect(0, 0, 256, 360); x.strokeStyle = "#9aa4b8"; x.lineWidth = 3; for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(20, 40 + i * 26); x.lineTo(236, 40 + i * 26); x.stroke(); } for (const c of [90, 160]) { x.beginPath(); x.moveTo(c, 30); x.lineTo(c, 340); x.stroke(); } });
  const hoja = mesh(new THREE.PlaneGeometry(0.21, 0.297), new THREE.MeshStandardMaterial({ map: planilla, roughness: 0.8 }), 0.25, 0.768, -0.75); hoja.rotation.set(-Math.PI / 2, 0, 0.2); oficina.add(hoja);
  const taza = new THREE.Group(); taza.position.set(0.55, 0.765, -0.95); oficina.add(taza);
  taza.add(mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.1, 16), M.cr, 0, 0.05, 0));
  taza.add(mesh(new THREE.TorusGeometry(0.03, 0.009, 6, 12), M.cr, 0.05, 0.05, 0));
  oficina.add(mesh(rbox(0.6, 0.38, 0.04, 0.02), M.navy, 0.05, 1.05, -1.15));
  oficina.add(mesh(rbox(0.06, 0.25, 0.06, 0.02), M.navy, 0.05, 0.87, -1.15));
}

// ================= LOS PERSONAJES =================
const CAMPERA_R = { color: C.navy3, cuello: C.navy3, cierre: C.g };
const ruben = crearPersonaje({ ...ELENCO.almacenero, campera: CAMPERA_R });
const walter = crearPersonaje(ELENCO.walter);
scene.add(ruben.raiz, walter.raiz);
for (const p of [ruben, walter]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const mochila = crearMochila(C.navy3, C.g); walter.cuerpo.add(mochila); mochila.position.set(0, 0.3, -0.24);
const termoR = crearTermo(); scene.add(termoR);
const mateR = crearMate(); scene.add(mateR);
const lapicera = crearLapicera(); scene.add(lapicera);
const camperaW = crearCamperaColgada({ color: C.cr2, cuello: C.navy, cierre: C.navy }); scene.add(camperaW);

// ================= LA LISTA =================
const LISTA = ["Yerba", "Fideos moñita", "2 leches", "Pan flauta", "Queso rallado", "Papas 1 kg", "Arroz", "Galletitas", "Dulce de leche", "Huevos (maple)", "Papel higiénico", "Zapallo", "Aceite", "Fósforos", "Tomates", "Harina", "Café", "Jabón", "Lentejas", "Mayonesa", "Polenta", "Azúcar", "Sal fina", "Detergente"];
// textura del rollo: 16 cm de ancho = 512 px; 1 m = 3200 px (se repite cada metro, con renglones que cambian)
const ANCHO_LISTA = 0.17;
function dibujarLista(x, w, h, desde, tachado, atras) {
  x.fillStyle = "#fbfaf4"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "rgba(120,150,200,0.45)"; x.lineWidth = 3;
  const paso = 128;
  for (let y = paso * 0.75; y < h; y += paso) { x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); }
  x.fillStyle = "#16243d"; x.textBaseline = "alphabetic"; x.font = FC(92, 700);
  let y0 = paso * 0.7, i = desde;
  if (atras) { x.font = F(900, 96); x.fillText("ATRÁS", 40, 120); x.fillRect(36, 138, 340, 12); y0 = 280; x.font = FC(92, 700); }
  for (let y = y0; y < h - 10; y += paso, i++) {
    const s = LISTA[i % LISTA.length];
    x.fillText("· " + s, 28, y);
    if (tachado) { x.strokeStyle = "#16243d"; x.lineWidth = 9; x.beginPath(); x.moveTo(24, y - 26); x.lineTo(40 + x.measureText("· " + s).width, y - 34); x.stroke(); }
  }
}
const listaTex = lienzo(512, 3200, (x, w, h) => dibujarLista(x, w, h, 0, false, false));
listaTex.wrapT = THREE.RepeatWrapping;
const listaMat = new THREE.MeshStandardMaterial({ map: listaTex, roughness: 0.75, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: listaTex, emissiveIntensity: 0.12 });
// el camino del rollo: mostrador → borde → cae → piso → puerta → vereda → cordón → calle
const LX = -0.15;
const CAMINO = [V3(LX, MOSTRADOR.y + 0.004, MOSTRADOR.z - 0.05), V3(LX, MOSTRADOR.y + 0.004, MOSTRADOR.z + 0.36), V3(LX, MOSTRADOR.y - 0.08, MOSTRADOR.z + 0.4), V3(LX, 0.45, MOSTRADOR.z + 0.43), V3(LX, 0.012, MOSTRADOR.z + 0.5), V3(LX, 0.012, -0.4), V3(LX, 0.012, 0.3), V3(LX + 0.05, 0.012, VEREDA_Z - 0.05), V3(LX + 0.06, -0.06, VEREDA_Z + 0.12), V3(LX + 0.07, -0.143, VEREDA_Z + 0.3), V3(LX + 0.2, -0.143, VEREDA_Z + 12)];
const curva = new THREE.CatmullRomCurve3(CAMINO, false, "centripetal", 0.0);
const LARGO = curva.getLength();
const NSEG = 600;
const ptsC = curva.getSpacedPoints(NSEG);
const listaGeo = new THREE.BufferGeometry();
{
  const pos = new Float32Array((NSEG + 1) * 2 * 3), uv = new Float32Array((NSEG + 1) * 2 * 2), idx = [];
  for (let i = 0; i <= NSEG; i++) {
    const p = ptsC[i];
    pos.set([p.x - ANCHO_LISTA / 2, p.y, p.z, p.x + ANCHO_LISTA / 2, p.y, p.z], i * 6);
    const v = 1 - ((i / NSEG) * LARGO) / 1.0;
    uv.set([0, v, 1, v], i * 4);
    if (i < NSEG) idx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
  }
  listaGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  listaGeo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  listaGeo.setIndex(idx); listaGeo.computeVertexNormals();
}
const listaPiso = new THREE.Mesh(listaGeo, listaMat); listaPiso.receiveShadow = true; scene.add(listaPiso);
// el rollo de la punta (se achica a medida que se desenrolla)
const rollo = new THREE.Group(); scene.add(rollo);
{
  const r = mesh(new THREE.CylinderGeometry(1, 1, ANCHO_LISTA, 28).rotateZ(Math.PI / 2), mat(0xfbfaf4, 0.7)); rollo.add(r);
  const marca = mesh(rbox(ANCHO_LISTA * 0.9, 0.04, 0.02, 0.005), M.navy3, 0, 0, 1.0); marca.scale.set(1, 1, 1); rollo.add(marca);
}
// el papelito doblado (la "cosita nomás") y la hoja que Walter da vuelta (frente tachado / dorso ATRÁS)
const papelito = new THREE.Group(); scene.add(papelito);
{
  const t = lienzo(256, 256, (x) => { x.fillStyle = "#fbfaf4"; x.fillRect(0, 0, 256, 256); x.strokeStyle = "#c9c6b8"; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 128); x.lineTo(256, 128); x.stroke(); x.fillStyle = "#16243d"; x.font = FC(86, 700); x.textAlign = "center"; x.fillText("lista", 128, 104); });
  const m = new THREE.MeshStandardMaterial({ map: t, roughness: 0.75, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.15 });
  papelito.add(mesh(rbox(0.07, 0.07, 0.012, 0.004), [M.cr, M.cr, M.cr, M.cr, m, M.cr]));
}
const hojaFrente = lienzo(512, 900, (x, w, h) => dibujarLista(x, w, h, 14, true, false));
const hojaDorso = lienzo(512, 900, (x, w, h) => dibujarLista(x, w, h, 4, false, true));
const hoja = new THREE.Group(); scene.add(hoja);
const tiraHoja = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 1.2), listaMat);
{
  const g = new THREE.PlaneGeometry(0.17, 0.3);
  const a = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: hojaFrente, roughness: 0.75, emissive: 0xffffff, emissiveMap: hojaFrente, emissiveIntensity: 0.15 })); a.position.z = 0.002; hoja.add(a);
  const b = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: hojaDorso, roughness: 0.75, emissive: 0xffffff, emissiveMap: hojaDorso, emissiveIntensity: 0.15 })); b.rotation.y = Math.PI; b.position.z = -0.002; hoja.add(b);
  // la tira que sigue colgando hasta el piso
  tiraHoja.position.y = -0.75; tiraHoja.rotation.x = 0.06; hoja.add(tiraHoja);
}

// ================= LA MERCADERÍA (reconocible, sin marcas) =================
function etiqueta(texto, fondo, letra, w = 256, h = 384, size = 64, banda) {
  return lienzo(w, h, (x) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    if (banda) { x.fillStyle = banda; x.fillRect(0, h * 0.58, w, h * 0.16); }
    x.fillStyle = letra; x.font = F(900, size); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(texto, w / 2, h * 0.38);
  });
}
function crearYerba() {
  const g = new THREE.Group();
  const t = etiqueta("YERBA", "#efeee5", "#16243d", 256, 384, 60, "#5ce611");
  const lado = mat(C.cr, 0.8), m = new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 });
  g.add(mesh(rbox(0.12, 0.2, 0.07, 0.01), [lado, lado, lado, lado, m, lado], 0, 0.1, 0));
  g.add(mesh(rbox(0.12, 0.03, 0.075, 0.01), M.g, 0, 0.205, 0));
  return g;
}
function crearFideos() {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.16, 0.22, 0.07, 0.03), new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.2, transparent: true, opacity: 0.35 }), 0, 0.11, 0));
  const mo = mat(0xe9cf8c, 0.6);
  semilla = 31;
  for (let i = 0; i < 16; i++) { const b = mesh(new THREE.SphereGeometry(0.018, 8, 6), mo, (az() - 0.5) * 0.12, 0.03 + az() * 0.16, (az() - 0.5) * 0.04); b.scale.set(1.6, 0.6, 0.8); b.rotation.z = az() * 3; g.add(b); }
  g.add(mesh(rbox(0.16, 0.035, 0.074, 0.01), M.red, 0, 0.2, 0));
  return g;
}
function crearLeches() {
  const g = new THREE.Group();
  for (const s of [-1, 1]) {
    const l = mesh(rbox(0.1, 0.05, 0.17, 0.024, 4), M.blanco, s * 0.055, 0.026 + (s > 0 ? 0.05 : 0), 0); l.rotation.y = s * 0.15; g.add(l);
    const f = mesh(rbox(0.102, 0.052, 0.04, 0.02), M.navy3, s * 0.055, 0.026 + (s > 0 ? 0.05 : 0), 0.02); f.rotation.y = s * 0.15; g.add(f);
  }
  return g;
}
function crearPan() {
  const g = new THREE.Group();
  const p = mesh(new THREE.CapsuleGeometry(0.04, 0.46, 6, 14), mat(0xd9a45a, 0.7)); p.rotation.z = Math.PI / 2; p.position.y = 0.04; p.scale.set(1, 1, 0.85); g.add(p);
  for (const x of [-0.15, -0.05, 0.05, 0.15]) { const c = mesh(rbox(0.06, 0.012, 0.03, 0.005), mat(0xf2d9a8, 0.8), x, 0.077, 0); c.rotation.y = 0.6; g.add(c); }
  return g;
}
function crearHuevos() {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.3, 0.035, 0.3, 0.01), mat(0xa7a08c, 0.9), 0, 0.018, 0));
  const hm = mat(0xf3e2c4, 0.5);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const e = mesh(new THREE.SphereGeometry(0.035, 12, 10), hm, (i - 1) * 0.09, 0.05, (j - 1) * 0.09); e.scale.y = 1.25; g.add(e); }
  return g;
}
function crearZapallo() {
  const g = new THREE.Group();
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const s = mesh(new THREE.SphereGeometry(0.075, 14, 10), mat(0x4a6a34, 0.6), Math.sin(a) * 0.05, 0.08, Math.cos(a) * 0.05); s.scale.set(0.8, 1, 0.8); g.add(s); }
  g.add(mesh(new THREE.CylinderGeometry(0.012, 0.016, 0.05, 8), mat(0x8a6a3a, 0.7), 0, 0.17, 0));
  return g;
}
function crearPapelHig() {
  const g = new THREE.Group();
  for (const [x, z] of [[-0.055, -0.055], [0.055, -0.055], [-0.055, 0.055], [0.055, 0.055]]) { g.add(mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.11, 16), M.blanco, x, 0.055, z)); g.add(mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.112, 10), mat(0xb08a5a, 0.8), x, 0.055, z)); }
  g.add(mesh(rbox(0.22, 0.02, 0.222, 0.008), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, roughness: 0.2 }), 0, 0.115, 0));
  return g;
}
const FAB = [crearYerba, crearFideos, crearLeches, crearPan, crearHuevos, crearZapallo, crearPapelHig];
// parte 1: aparecen en el mostrador, uno por vuelta de Rubén
const items = FAB.map((f, i) => { const g = f(); g.position.set(MOSTRADOR.x - 0.6 + i * 0.22, MOSTRADOR.y, MOSTRADOR.z + 0.1 - (i % 2) * 0.13); scene.add(g); return g; });
items[3].rotation.y = 0.15;
// parte 2: los mismos objetos vuelan a la bolsa
const bolsa = crearBolsa(); scene.add(bolsa);
const items2 = FAB.map((f) => { const g = f(); scene.add(g); return g; });
const ticket = new THREE.Group(); bolsa.add(ticket);
{
  const t = lienzo(256, 320, (x) => {
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, 256, 320);
    x.fillStyle = "#16243d"; x.textAlign = "center"; x.font = F(900, 54); x.fillText("WALTER", 128, 110);
    x.fillStyle = "#5ce611"; rr(x, 22, 150, 212, 92, 18); x.fillStyle = "#0b1220"; x.font = F(900, 46); x.fillText("PAGADO ✓", 128, 212);
    x.fillStyle = "#16243d"; x.font = F(700, 28); x.fillText("RETIRA HOY", 128, 290);
  });
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.163), new THREE.MeshStandardMaterial({ map: t, roughness: 0.7, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.18 }));
  ticket.add(p);
  const grapa = mesh(rbox(0.035, 0.006, 0.006, 0.002), mat(0xc9ccd2, 0.25, { metalness: 0.7 }), 0, 0.068, 0.004); ticket.add(grapa);
}
ticket.position.set(0, 0.2, 0.084);

// ================= LOS CELULARES =================
// el de Walter (plano A): la tienda genérica "Almacén de Rubén", navy y crema, sin colores de ninguna app
const tiendaTex = lienzo(540, 1100, () => {});
const celuW = new THREE.Group(); scene.add(celuW);
{
  celuW.add(mesh(rbox(0.082, 0.165, 0.011, 0.012), mat(0x1a1f2b, 0.35)));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.074, 0.154), new THREE.MeshBasicMaterial({ map: tiendaTex, toneMapped: false })); p.position.z = 0.0058; celuW.add(p);
}
// las manos de Walter sosteniendo el celular (en el plano A solo se ven las manos)
{
  const piel = mat(ELENCO.walter.piel, 0.55), manga = mat(C.cr2, 0.75);
  for (const s of [-1, 1]) {
    const m = mesh(new THREE.SphereGeometry(1, 18, 12), piel, s * 0.05, -0.05, -0.012); m.scale.set(0.024, 0.042, 0.02); celuW.add(m);
    const p = mesh(new THREE.CapsuleGeometry(0.0062, 0.014, 4, 8), piel, s * 0.042, -0.045, 0.008); p.rotation.z = s * 0.35; celuW.add(p);
    const pu = mesh(new THREE.CylinderGeometry(0.03, 0.032, 0.08, 14), manga, s * 0.07, -0.115, -0.03); pu.rotation.set(0.3, 0, s * 0.45); celuW.add(pu);
  }
}
const TIENDA = ["Yerba", "Fideos moñita", "2 leches", "Pan flauta", "Huevos (maple)", "Zapallo", "Papel higiénico", "Queso rallado", "Papas 1 kg", "Arroz"];
function dibujarTienda(t) {
  const x = tiendaTex.userData.ctx, W = 540, H = 1100;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  // lista con scroll (callback al rollo de papel)
  const n = TIENDA.length, fila = 104;
  const tick = (i) => sg(t, T.tildes + i * 0.15, T.tildes + i * 0.15 + 0.1);
  const scroll = eio(sg(t, T.tildes + 0.4, T.tildes + 1.25)) * (n * fila - 560);
  x.save(); x.beginPath(); x.rect(0, 170, W, 650); x.clip();
  for (let i = 0; i < n; i++) {
    const y = 200 + i * fila - scroll;
    if (y < 100 || y > 860) continue;
    x.fillStyle = "#ffffff"; rr(x, 24, y, W - 48, fila - 16, 18);
    const k = tick(i);
    x.fillStyle = k > 0 ? "#5ce611" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5;
    x.beginPath(); x.roundRect(46, y + 20, 48, 48, 10); x.fill(); x.stroke();
    if (k > 0) { x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.lineCap = "round"; x.beginPath(); x.moveTo(56, y + 44); x.lineTo(56 + 10 * Math.min(1, k * 2), y + 44 + 10 * Math.min(1, k * 2)); if (k > 0.5) x.lineTo(66 + 20 * (k - 0.5) * 2, y + 54 - 22 * (k - 0.5) * 2); x.stroke(); }
    x.fillStyle = "#16243d"; x.font = F(700, 38); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText(TIENDA[i], 116, y + 45);
  }
  x.restore();
  // cabecera
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 170);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(70, 100, 34, 0, 7); x.fill();
  x.fillStyle = "#0b1220"; x.font = F(900, 36); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("R", 70, 102);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 40); x.fillText("Almacén de Rubén", 122, 86);
  x.font = F(600, 26); x.fillStyle = "#b4b2a3"; x.fillText("Tu pedido", 124, 128);
  // pie: botón Pagar → Pagado ✓ y el retiro
  x.fillStyle = "#efeee5"; x.fillRect(0, 830, W, 270);
  const pg = t >= T.pagado;
  const apr = pulso(t, T.pagar - 0.05, 0.18);
  x.fillStyle = pg ? "#5ce611" : "#16243d"; rr(x, 34 + apr * 8, 850 + apr * 4, W - 68 - apr * 16, 116 - apr * 8, 26);
  x.fillStyle = pg ? "#0b1220" : "#efeee5"; x.font = F(900, 50); x.textAlign = "center"; x.fillText(pg ? "Pagado ✓" : "Pagar", W / 2, 910);
  x.fillStyle = "#16243d"; x.font = F(700, 30); x.fillText("Retiro en el local", W / 2, 1012); x.font = F(800, 30); x.fillText("hasta las 20:00", W / 2, 1056);
  tiendaTex.needsUpdate = true;
}
// el de Rubén (plano B): el aviso del pedido
const avisoTex = lienzo(300, 600, (x) => {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, 300, 600);
  x.fillStyle = "#efeee5"; rr(x, 14, 140, 272, 300, 26);
  x.fillStyle = "#5ce611"; rr(x, 14, 140, 272, 70, 26); x.fillRect(14, 180, 272, 30);
  x.fillStyle = "#0b1220"; x.font = F(800, 30); x.textAlign = "center"; x.fillText("Pedido nuevo", 150, 186);
  x.fillStyle = "#16243d"; x.font = F(900, 44); x.fillText("Walter", 150, 270);
  x.fillStyle = "#3fa60a"; x.font = F(900, 36); x.fillText("Pagado ✓", 150, 335);
  x.fillStyle = "#16243d"; x.font = F(700, 30); x.fillText("Retira hoy", 150, 400);
});
const pantR = new THREE.MeshStandardMaterial({ color: 0x0b1220, emissive: 0xffffff, emissiveMap: avisoTex, map: avisoTex, emissiveIntensity: 0 });
const celuR = new THREE.Group(); scene.add(celuR);
{
  celuR.add(mesh(rbox(0.11, 0.016, 0.21, 0.014), mat(0x2a3346, 0.35)));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.098, 0.192), pantR); p.rotation.x = -Math.PI / 2; p.position.y = 0.0086; celuR.add(p);
}
const vib = new THREE.Group(); scene.add(vib);
{
  const gm = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.8 });
  for (const s of [-1, 1]) for (const k of [0, 1]) { const a = mesh(new THREE.TorusGeometry(0.13 + k * 0.06, 0.01, 6, 16, 1.1), gm); a.rotation.set(-Math.PI / 2, 0, s > 0 ? -0.55 : Math.PI - 0.55); vib.add(a); }
}

// ================= BURBUJAS DE DIÁLOGO (pegadas a la cámara, pico hacia quien habla) =================
function burbuja(lineas, pico = "izq") {
  const filas = lineas.length, W = 1.25, H = 0.2 + filas * 0.14;
  const tex = lienzo(1024, Math.round((1024 * H) / W), (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#0b1220"; x.textBaseline = "middle"; x.textAlign = "center";
    let tam = 112; x.font = F(800, tam);
    while (lineas.some((l) => x.measureText(l).width > w - 2 * 60) && tam > 60) { tam -= 2; x.font = F(800, tam); }
    lineas.forEach((l, i) => x.fillText(l, w / 2, h / 2 + (i - (filas - 1) / 2) * tam * 1.08));
  });
  const g = new THREE.Group();
  const crB = mat(C.cr, 0.6, { emissive: C.cr, emissiveIntensity: 0.35 });
  const borde = mat(C.navy, 0.5);
  const caja = mesh(rbox(W, H, 0.07, 0.12, 5), [crB, crB, crB, crB, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.35 }), crB]);
  caja.userData.orden = 2; g.add(caja);
  const marco = mesh(rbox(W + 0.06, H + 0.06, 0.05, 0.14, 5), borde, 0, 0, -0.02); marco.userData.orden = 0; g.add(marco);
  const s = pico === "izq" ? -1 : 1;
  const cola = new THREE.Shape(); cola.moveTo(-0.09, 0); cola.lineTo(0.09, 0); cola.lineTo(s * 0.14, -0.17); cola.closePath();
  const cg = new THREE.ExtrudeGeometry(cola, { depth: 0.05, bevelEnabled: false }); cg.translate(0, 0, -0.025);
  const c = mesh(cg, crB, s * (W / 2 - 0.3), -H / 2 + 0.02, 0.005); c.userData.orden = 3; g.add(c);
  const cola2 = new THREE.Shape(); cola2.moveTo(-0.13, 0); cola2.lineTo(0.13, 0); cola2.lineTo(s * 0.18, -0.23); cola2.closePath();
  const cb = mesh(new THREE.ExtrudeGeometry(cola2, { depth: 0.04, bevelEnabled: false }).translate(0, 0, -0.04), borde, s * (W / 2 - 0.3), -H / 2 + 0.035, -0.01); cb.userData.orden = 1; g.add(cb);
  camera.add(g);
  g.traverse((o) => { if (o.isMesh) { o.layers.set(1); (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.depthTest = false; m.transparent = true; }); o.renderOrder = 30 + (o.userData.orden || 0); o.castShadow = false; } });
  g.traverse((o) => { if (o.isMesh) o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone(); });
  g.userData.H = H;
  return g;
}
const B = {
  para: burbuja(["¡Pará, pará!"], "izq"),
  perdon: burbuja(["¡Perdón! Es una", "cosita nomás."], "der"),
  ay1: burbuja(["Ah, y…"], "izq"),
  ay2: burbuja(["Ah, y…"], "izq"),
  gracias: burbuja(["¡Gracias, Rubén!"], "der"),
  ay3: burbuja(["Ah, y…"], "der"),
};

// ================= EL CHIP DE HORA (pegado a la cámara, arriba) =================
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 6, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g;
};
const chip = new THREE.Group(); camera.add(chip);
const CHIP_W = 2.8, CHIP_H = 0.6;
const placaTex = (fondo, borde, letra) => lienzo(1148, 246, (x) => {
  x.fillStyle = fondo; rr(x, 0, 0, 1148, 246, 64);
  x.strokeStyle = borde; x.lineWidth = 14; x.beginPath(); x.roundRect(16, 16, 1116, 214, 50); x.stroke();
  x.fillStyle = letra; x.font = F(800, 92); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("VIERNES ·", 60, 128);
});
const placaNoche = mesh(rbox(CHIP_W, CHIP_H, 0.12, 0.12, 4), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: placaTex("#0b1220", "#5ce611", "#efeee5"), roughness: 0.5, emissive: 0xffffff, emissiveMap: placaTex("#0b1220", "#5ce611", "#efeee5"), emissiveIntensity: 0.15 }), M.navy]);
const placaTarde = mesh(rbox(CHIP_W, CHIP_H, 0.12, 0.12, 4), [M.cr, M.cr, M.cr, M.cr, new THREE.MeshStandardMaterial({ map: placaTex("#efeee5", "#16243d", "#16243d"), roughness: 0.5, emissive: 0xffffff, emissiveMap: placaTex("#efeee5", "#16243d", "#16243d"), emissiveIntensity: 0.15 }), M.cr]);
chip.add(placaNoche, placaTarde);
const matDig = { g: new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.4, emissive: C.g, emissiveIntensity: 0.3 }), red: new THREE.MeshStandardMaterial({ color: 0xe0786d, roughness: 0.45, emissive: C.red, emissiveIntensity: 0.35 }), navy: new THREE.MeshStandardMaterial({ color: C.navy2, roughness: 0.4 }) };
const HORAS = {};
for (const [k, txt, m] of [["1959", "19:59", "g"], ["2000", "20:00", "g"], ["2007", "20:07", "red"], ["2023", "20:23", "red"], ["2041", "20:41", "red"], ["1612", "16:12", "navy"], ["2000b", "20:00", "g"]]) {
  // la fuente 3D no trae ":": dos pares de dígitos y los dos puntos hechos con cajitas
  const g = new THREE.Group(); const [hh, mm] = txt.split(":");
  const a = mesh(textoGeo(hh, 0.3, 0.1), matDig[m]), b = mesh(textoGeo(mm, 0.3, 0.1), matDig[m]);
  a.geometry.computeBoundingBox(); const wa = a.geometry.boundingBox.max.x - a.geometry.boundingBox.min.x;
  a.position.x = -0.07 - wa / 2; b.position.x = 0.07 + wa / 2; g.add(a, b);
  for (const y of [0.075, -0.075]) g.add(mesh(rbox(0.055, 0.055, 0.1, 0.015), matDig[m], 0, y - 0.01, 0));
  g.position.set(k === "2000b" ? 0.56 : 0.72, 0, 0.09); chip.add(g); HORAS[k] = g;
}
// el tilde del 20:00 ✓ (parte 2)
const tildeChip = new THREE.Group(); chip.add(tildeChip);
{
  const s = new THREE.Shape(); s.moveTo(-0.12, 0.0); s.lineTo(-0.04, -0.09); s.lineTo(0.13, 0.1); s.lineTo(0.09, 0.14); s.lineTo(-0.04, -0.01); s.lineTo(-0.08, 0.04); s.closePath();
  tildeChip.add(mesh(new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.01, bevelSegments: 2 }), matDig.g));
  tildeChip.position.set(1.2, 0.0, 0.06); tildeChip.scale.setScalar(0.85);
}
chip.traverse((o) => { if (o.isMesh) { o.layers.set(1); o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone(); (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.depthTest = false; m.transparent = true; }); o.renderOrder = o === placaNoche || o === placaTarde ? 20 : 21; o.castShadow = false; } });
// la secuencia de horas: [desde, clave]
const SEC_HORA = [[0, "1959"], [T.h2000, "2000"], [T.h2007, "2007"], [T.h2023, "2023"], [T.h2041, "2041"], [P2, "1612"], [T.pC, "1959"], [T.h2000b, "2000b"]];

// ================= CÁMARA =================
// PLANOS: [desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov, modo]. Entre planos hay corte seco;
// dentro de un plano, Catmull-Rom continua (modo "e" = tramo con ease propio: el push-in rápido).
// El plano 5 (la lista) no usa claves: sigue la punta del rollo (ver camLista).
const RB = { x: 0.95, z: 0.45 };  // Rubén en la vereda
const WB = { x: -0.2, z: 0.68 };  // Walter en la vereda
const RI = { x: 0.55, z: -2.0 };  // Rubén detrás del mostrador
const WI = { x: -0.42, z: -0.78 }; // Walter frente al mostrador
const PLAN1 = [[0, 0.32, 1.62, 6.75, 0.27, 1.62, 0.2, 38], [2.0, 0.3, 1.6, 6.45, 0.27, 1.6, 0.2, 38]];
const PLANOS = [
  // 1 · general de la vereda de noche (portada en movimiento)
  [0, PLAN1],
  // 2 · por encima del hombro de Walter: Rubén lo mira, mira la hora, resopla
  [T.p2, [[T.p2, WB.x - 0.78, 1.64, WB.z + 1.55, RB.x + 0.02, 1.42, RB.z, 32], [T.p3, WB.x - 0.7, 1.62, WB.z + 1.4, RB.x + 0.02, 1.42, RB.z, 32]]],
  // 3 · primer plano de Walter (la cortina detrás): perdón, cosita nomás, el papelito; la cortina sube
  [T.p3, [[T.p3, WB.x + 1.45, 1.48, WB.z + 1.95, WB.x + 0.02, 1.3, WB.z - 0.1, 34], [T.p4, WB.x + 1.35, 1.47, WB.z + 1.8, WB.x + 0.02, 1.32, WB.z - 0.1, 34]]],
  // 4 · general interior: Walter entra y deja el papelito; Rubén detrás del mostrador
  [T.p4, [[T.p4, -0.82, 1.62, 0.12, 0.42, 1.2, -1.95, 38], [T.p5, -0.78, 1.6, 0.0, 0.42, 1.2, -1.95, 38]]],
  // 5 · la lista (camLista)
  [T.p5, null],
  // 6 · general frontal por la puerta: el montaje, push-in lento
  [T.p6, [[T.p6, 0.08, 1.55, 2.0, 0.1, 1.38, -2.2, 38], [T.p7, 0.08, 1.5, 1.35, 0.1, 1.36, -2.2, 38]]],
  // 7 · medio de Walter desde atrás del mostrador: tacha el último, sonríe, da vuelta el papel
  [T.p7, [[T.p7, 0.25, 1.6, -2.75, WI.x, 1.38, WI.z, 36], [T.p8, 0.22, 1.58, -2.65, WI.x, 1.38, WI.z, 36]]],
  // 8 · Rubén de frente, mira a cámara; push-in rápido a la cara
  [T.p8, [[T.p8, RI.x - 0.05, 1.5, 0.7, RI.x, 1.42, RI.z, 34], [T.pushIn[0], RI.x - 0.05, 1.5, 0.55, RI.x, 1.42, RI.z, 34, "e"], [T.pushIn[1], RI.x, 1.49, -0.45, RI.x, 1.43, RI.z, 34], [T.cuelga, RI.x, 1.49, -0.5, RI.x, 1.43, RI.z, 34]]],
  // 8b · ya sin campera, la cuelga en el perchero y le habla a Walter (a cámara)
  [T.cuelga, [[T.cuelga, 0.12, 1.45, 0.6, 0.1, 1.3, RI.z - 0.1, 38], [T.remate, 0.12, 1.45, 0.3, 0.1, 1.32, RI.z - 0.1, 38]]],
  // 9 · remate del remate: general interior, Walter se sienta en el cajón, Rubén apoya termo y mate
  [T.remate, [[T.remate, 0.42, 1.78, 2.4, 0.56, 0.85, -1.4, 40], [P1, 0.42, 1.74, 2.15, 0.56, 0.85, -1.4, 40]]],
  // ---- parte 2 ----
  // A · el celular de Walter en grande (la oficina atrás)
  [T.pA, [[T.pA, OF.x + 0.015, 1.165, -0.035, OF.x, 1.02, -0.34, 38], [T.pB, OF.x + 0.0, 1.16, -0.05, OF.x, 1.02, -0.34, 38]]],
  // B · el mostrador a la tarde: el aviso, el mate, la bolsa que se llena; push-in a la bolsa
  [T.pB, [[T.pB, 0.72, 1.7, 0.08, 0.32, 1.15, -1.6, 40], [T.abrocha, 0.58, 1.45, -0.38, 0.3, 1.1, -1.4, 40], [T.pC, 0.48, 1.32, -0.68, 0.3, 1.1, -1.35, 40]]],
  // C · callback del plano 1: misma vereda, mismo encuadre
  [T.pC, PLAN1.map((k, i) => [i ? T.pD : T.pC, ...k.slice(1)])],
  // D · primer plano de Rubén con el mate
  [T.pD, [[T.pD, -0.72, 1.62, 2.05, RB.x - 0.02, 1.36, RB.z, 34], [T.pIns, -0.62, 1.6, 1.9, RB.x - 0.02, 1.37, RB.z, 34]]],
  // inserto · Walter mira adentro de la bolsa: el pan flauta asoma
  [T.pIns, [[T.pIns, WB.x - 0.6, 1.32, WB.z + 2.7, WB.x, 1.08, WB.z, 32], [T.pE, WB.x - 0.55, 1.32, WB.z + 2.55, WB.x, 1.1, WB.z, 32]]],
  // E · general de la vereda: la cortina baja a las 20:00 en punto; Rubén guiña; push-in lento
  [T.pE, [[T.pE, 0.32, 1.52, 6.3, 0.27, 1.32, 0.2, 38], [T.aCamara, 0.45, 1.55, 4.6, 0.6, 1.45, 0.3, 38], [DUR, 0.72, 1.52, 3.2, 0.82, 1.4, 0.35, 38]]],
];
const _m = new THREE.Vector3();
let planoActual = 0;
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
// cuánto se desenrolló (m) en t
const desenrollado = (t) => { const u = sg(t, T.rodar[0], T.rodar[1]); return LARGO * (u < 0.25 ? 0.25 * Math.pow(u / 0.25, 2) * 0.5 : 0.125 + (u - 0.25) / 0.75 * 0.875); };
const puntaEn = (t) => curva.getPointAt(cl(desenrollado(t) / LARGO, 0.0005, 1));
function camLista(t) {
  // arranca arriba del papel (se leen los renglones), baja con el rollo, lo sigue a ras del piso y al final la grúa
  const p = puntaEn(Math.min(t, T.grua[0]));
  const u = sg(t, T.p5, T.p5 + 0.55);
  const cerca = [p.x + 0.22, p.y + 0.42, p.z + 0.42, p.x, p.y, p.z - 0.12];
  const raso = [p.x + 0.32, Math.max(0.24, p.y + 0.26), p.z + 0.85, p.x, p.y + 0.03, p.z - 0.25];
  const k = eio(sg(t, T.p5 + 0.25, T.p5 + 0.75));
  let v = cerca.map((q, j) => lerp(q, raso[j], k));
  if (u < 1) { const ini = [LX + 0.18, MOSTRADOR.y + 0.38, MOSTRADOR.z + 0.45, LX, MOSTRADOR.y, MOSTRADOR.z - 0.02]; v = ini.map((q, j) => lerp(q, v[j], eio(u))); }
  const g = eio(sg(t, T.grua[0], T.grua[1]));
  const alto = [1.9, 4.4, 12.0, 0.15, 0.7, 1.2];
  v = v.map((q, j) => lerp(q, alto[j], g));
  return [...v, lerp(44, 40, g)];
}
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
  planoActual = pi;
  let v;
  if (PLANOS[pi][1] === null) { const c = camLista(t); v = [c[0], c[1], c[2], c[3], c[4], c[5], c[6]]; }
  else v = catmull(PLANOS[pi][1], t);
  const mano = Math.sin(t * 0.9) * 0.008;
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.006, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}
const parte2 = (t) => t >= P2;
const set = (t) => {
  // qué set se ve: "vereda" (noche afuera), "adentro" (noche), "tarde" (adentro de día), "oficina"
  if (t < T.p4) return "vereda";
  if (t < T.p5) return "adentro";
  if (t < T.p6) return t < T.rodar[0] + 0.3 ? "adentro" : "vereda";
  if (t < P1) return "adentro";
  if (t < T.pB) return "oficina";
  if (t < T.pC) return "tarde";
  return "vereda";
};

// ================= POSES =================
const aC = (giro = 0, asiente = 0) => ({ cabeza: { giro, asiente, ladea: 0.03 }, ojos: { x: giro * 0.6, y: 0.05 } });
const conTermo = { manoI: [0.24, 0.1, 0.16], codoI: [1, -0.4, -0.5], dedoI: 0 };
// ---- Rubén ----
const RK = [
  // vereda: baja la cortina con el gancho (la mano derecha la pone ponerPersonajes), termo bajo el brazo
  [0, { x: RB.x, z: RB.z, giro: -0.9, ...conTermo, cabeza: { giro: -0.35, asiente: 0.18, ladea: 0.05 }, ojos: { x: -0.2, y: -0.3, abiertos: 0.5, tension: 0.2 }, cejas: { alto: -0.1, ang: 0.2 }, boca: { sonrisa: 0.3 } }],
  [T.frena + 0.05, { cabeza: { giro: -0.75, asiente: -0.05, ladea: 0 }, ojos: { x: -0.7, y: 0, abiertos: 1 }, cejas: { alto: 0.8, ang: 0.2 }, boca: { sonrisa: 0, abierta: 0.25, ancho: 0.7 } }, 0.2],
  [T.p2 + 0.1, { cabeza: { giro: -0.85, asiente: 0, ladea: -0.06 }, ojos: { x: -0.6, y: 0.05, abiertos: 0.85 }, cejas: { alto: 0.7, ang: 0.15 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.85 } }, 0.2],
  [T.miraHora, { cabeza: { giro: -0.2, asiente: -0.35, ladea: 0.05 }, ojos: { x: 0, y: 0.95, abiertos: 0.8 }, cejas: { alto: 0.9, ang: 0.4 } }, 0.2],
  [T.resopla, { cabeza: { giro: -0.75, asiente: 0.12, ladea: -0.1 }, ojos: { x: -0.6, y: -0.1, abiertos: 0.5, tension: 0.4 }, cejas: { alto: 0.2, ang: 0.6 }, boca: { sonrisa: -0.35, abierta: 0.2, ancho: 0.7 } }, 0.2],
  [T.resopla + 0.3, { boca: { sonrisa: -0.2, abierta: 0, ancho: 0.9 } }, 0.2],
  // adentro, detrás del mostrador (corte)
  [T.p4 - 0.001, { x: RI.x - 0.5, z: RI.z, giro: 0.5, paso: 1, ...conTermo, ...aC(-0.6, 0.1), ...CARA.neutra, ojos: { x: -0.6, abiertos: 0.6 }, boca: { sonrisa: 0 } }, 0.001],
  [T.apoya, { x: RI.x, z: RI.z, giro: -0.15, paso: 0, manoI: [0.28, 0.3, 0.42], codoI: null }, 0.25],
  [T.deja + 0.05, { ...aC(-0.35, 0.45), ojos: { x: -0.35, y: -0.9, abiertos: 0.9 }, cejas: { alto: 0.3 } }, 0.2],
  [T.alivio, { ...BRAZOS.apoyado, ...CARA.sonrisa, ...aC(-0.4, 0.2), ojos: { x: -0.5, y: -0.4, feliz: 0.4 }, boca: { sonrisa: 0.85 } }, 0.25],
  [T.suelta + 0.25, { ...CARA.sorpresa, ...aC(-0.2, 0.55), ojos: { x: -0.2, y: -1, abiertos: 1 }, boca: { sonrisa: 0, abierta: 0.55, ancho: 0.7 } }, 0.15],
  // montaje (la ida y vuelta a los estantes la pone ponerPersonajes)
  [T.p6, { ...BRAZOS.apoyado, ...CARA.fastidio, cejas: { alto: -0.2, ang: -0.3 }, ojos: { abiertos: 0.65 }, boca: { sonrisa: -0.3 } }, 0.001],
  // plano 8: mira a cámara, cara de nada
  [T.p8 - 0.001, { x: RI.x, z: RI.z, giro: 0, paso: 0, ...BRAZOS.apoyado, ...aC(0.02, 0.0), ojos: { x: 0, y: 0.04, abiertos: 0.42, tension: 0.35 }, cejas: { alto: 0.15, ang: 0.55, asim: 0 }, boca: { sonrisa: -0.45, abierta: 0, ancho: 0.95 } }, 0.001],
  [T.solapas[0] + 0.25, { manoI: [0.1, 0.42, 0.28], manoD: [-0.1, 0.42, 0.28], codoI: [1, -0.5, 0], codoD: [-1, -0.5, 0] }, 0.25],
  // 8b: ya sin campera; la cuelga con la derecha y mira a cámara
  [T.cuelga - 0.001, { x: RI.x - 0.25, giro: -0.15, ...BRAZOS.costado, ...aC(0.12, 0.02), ...CARA.resignado, ojos: { x: 0.15, y: 0.05, abiertos: 0.4, tension: 0.55 } }, 0.001],
  [T.cuelga + 0.45, { manoD: [-0.28, -0.06, 0.06], codoD: null }, 0.3],
  [T.voz1 + 2.25, { cabeza: { giro: 0.25, asiente: 0.05, ladea: 0.1 }, ojos: { x: 0.35, y: 0.0 }, cejas: { alto: 0.35, ang: 0.6 } }, 0.25],
  // remate: apoya termo y mate en el mostrador (está para rato)
  [T.remate - 0.001, { x: RI.x - 0.1, z: RI.z, giro: -0.25, manoI: [0.24, 0.32, 0.4], manoD: [-0.2, 0.32, 0.4], codoI: null, codoD: null, ...aC(-0.4, 0.15), ...CARA.sonrisa, ojos: { x: -0.5, y: -0.2, feliz: 0.3 }, boca: { sonrisa: 0.5 } }, 0.001],
  [T.remate + 0.4, { ...BRAZOS.apoyado }, 0.3],
  // ---- parte 2 ----
  // B: a la tarde, con el mate, arma la bolsa sin apuro
  [T.pB - 0.001, { x: RI.x - 0.1, z: RI.z, giro: -0.2, manoI: [0.2, 0.45, 0.3], codoI: [1, -0.6, -0.2], manoD: [-0.28, 0.3, 0.38], codoD: null, ...aC(-0.2, 0.35), ...CARA.sonrisa, ojos: { x: -0.2, y: -0.6, abiertos: 0.7, feliz: 0.3 } }, 0.001],
  [T.sorboB - 0.05, { manoI: [0.06, 0.66, 0.24], codoI: [1, -0.4, 0.1], ojos: { abiertos: 0, feliz: 0.6 }, cabeza: { giro: -0.05, asiente: -0.1 } }, 0.25],
  [T.sorboB + 0.55, { manoI: [0.2, 0.45, 0.3], codoI: [1, -0.6, -0.2], ojos: { abiertos: 0.7, feliz: 0.3, y: -0.6, x: -0.3 }, cabeza: { giro: -0.3, asiente: 0.35 } }, 0.25],
  [T.abrocha, { manoD: [-0.1, 0.38, 0.42], ...CARA.feliz, ojos: { y: -0.5, x: -0.3, feliz: 0.5 } }, 0.15],
  [T.abrocha + 0.3, { manoD: [-0.28, 0.3, 0.38], boca: { sonrisa: 0.7, abierta: 0 } }, 0.2],
  // C: la vereda de noche otra vez; termo bajo el brazo y el mate en la izquierda
  [T.pC - 0.001, { x: RB.x, z: RB.z, giro: -0.9, manoI: [0.2, 0.18, 0.24], codoI: [1, -0.4, -0.4], manoD: [-0.3, -0.06, 0.05], codoD: null, ...aC(0.15, 0.1), ...CARA.neutra, ojos: { x: 0.2, abiertos: 0.6 }, boca: { sonrisa: 0.35 } }, 0.001],
  [T.agarra, { inclina: 0.35, manoD: [-0.25, -0.3, 0.28], ...aC(-0.3, 0.3) }, 0.25],
  [T.da, { inclina: 0.05, manoD: [-0.22, 0.25, 0.5], codoD: [-0.8, -0.5, 0], ...aC(0.1, 0.05), ojos: { x: 0.25, abiertos: 0.6 } }, 0.25],
  [T.b3, { manoD: [-0.3, -0.06, 0.05], codoD: null, ...CARA.sonrisa, ojos: { x: 0.25, feliz: 0.3, abiertos: 0.65 } }, 0.3],
  // D: "Está en la bolsa, Walter." sin dejarlo terminar, con parsimonia
  [T.pD - 0.001, { ...aC(-0.45, 0.04), ojos: { x: -0.6, y: 0.0, abiertos: 0.55, tension: 0.1 }, cejas: { alto: 0.25, ang: 0.1 }, boca: { sonrisa: 0.2 } }, 0.001],
  [T.voz2 + 2.1, { ...CARA.sonrisa, ojos: { x: -0.6, feliz: 0.45, abiertos: 0.65 } }, 0.3],
  // E: baja la cortina de un tirón con la derecha, se acomoda, sorbo, mira a cámara y guiña
  [T.pE - 0.001, { x: RB.x - 0.1, z: RB.z - 0.1, giro: -0.6, ...aC(-0.3, 0.2), codoD: [-0.8, -0.5, 0] }, 0.001],
  [T.tiron[1] + 0.35, { codoD: null, giro: -0.2 }, 0.3],
  [T.sorboE - 0.05, { manoI: [0.06, 0.66, 0.24], codoI: [1, -0.4, 0.1], ojos: { abiertos: 0, feliz: 0.6 }, cabeza: { giro: -0.05, asiente: -0.1 } }, 0.25],
  [T.aCamara, { manoI: [0.2, 0.18, 0.24], codoI: [1, -0.4, -0.4], ...aC(0.12, 0.02), ojos: { x: 0.15, y: 0.05, abiertos: 0.8, feliz: 0.35 }, ...CARA.sonrisa, boca: { sonrisa: 0.8 } }, 0.3],
  [T.guino, { ojos: { guiño: -1, feliz: 0.4 }, cejas: { asim: 0.7 }, boca: { sonrisa: 1, ancho: 1.15 } }, 0.12],
  [T.guino + 0.45, { ojos: { guiño: 0, feliz: 0.35 }, cejas: { asim: 0 } }, 0.15],
];
// ---- Walter ----
const WK = [
  // entra corriendo desde la izquierda (el x lo pone ponerPersonajes), frena y pone la mano en la cortina
  [0, { x: WB.x - 3.2, z: WB.z, giro: 1.45, paso: 1, pasoVel: 15, inclina: 0.18, ...CARA.esperanza, ...aC(0, 0), boca: { sonrisa: 0, abierta: 0.4, ancho: 0.8 } }],
  [T.frena, { x: WB.x, giro: 1.1, paso: 0, inclina: 0.05, ...aC(0.2, -0.05), ojos: { x: 0.4 }, ...CARA.esperanza, boca: { sonrisa: 0.1, abierta: 0.5, ancho: 0.8 } }, 0.15],
  [T.b1 + 0.5, { boca: { sonrisa: 0.4, abierta: 0, ancho: 1 } }, 0.2],
  // plano 3: sonrisa de perdón, manos juntas, después el papelito entre dos dedos
  [T.p3 - 0.001, { giro: 1.0, manoI: [0.07, 0.3, 0.3], manoD: [-0.07, 0.3, 0.3], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2], ...aC(0.55, -0.02), ojos: { x: 0.65, y: 0 }, ...CARA.esperanza, cejas: { alto: 0.7, ang: 0.75 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } }, 0.001],
  [T.b2 + 0.1, { boca: { sonrisa: 0.4, abierta: 0.3, ancho: 0.9 } }, 0.12],
  [T.b2 + 0.4, { boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } }, 0.15],
  [T.papelito, { manoD: [-0.16, 0.52, 0.42], codoD: [-0.8, -0.5, 0] }, 0.25],
  // plano 4: entra y deja el papelito en el mostrador
  [T.p4 - 0.001, { x: 0.35, z: 0.35, giro: 3.74, paso: 1, pasoVel: 10, ...BRAZOS.costado, ...aC(0, 0), ...CARA.esperanza }, 0.001],
  [T.entra[1], { x: WI.x, z: WI.z, giro: Math.PI - 0.45, paso: 0 }, T.entra[1] - T.entra[0]],
  [T.deja, { manoD: [-0.12, 0.38, 0.45], codoD: null, inclina: 0.1 }, 0.25],
  [T.deja + 0.3, { manoD: [-0.25, 0.05, 0.1], inclina: 0, ...CARA.sonrisa }, 0.25],
  [T.suelta - 0.25, { manoD: [-0.1, 0.38, 0.47], inclina: 0.12, ...CARA.feliz }, 0.2],
  [T.suelta + 0.2, { manoD: [-0.2, 0.32, 0.32], inclina: 0.02 }, 0.2],
  // montaje: lee la lista que le cuelga, tacha con la lapicera
  [T.p6, { x: WI.x - 0.08, giro: Math.PI - 0.55, manoI: [0.06, 0.4, 0.3], manoD: [-0.06, 0.42, 0.32], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2], ...aC(0.0, 0.4), ojos: { y: -0.8 }, ...CARA.concentrada, boca: { sonrisa: 0.3, ancho: 0.9 } }, 0.001],
  // plano 7: tacha el último, sonríe, levanta la vista... da vuelta el papel
  [T.p7, { ...aC(0.0, 0.42), ojos: { y: -0.85 }, manoI: [0.12, 0.36, 0.38], manoD: [-0.12, 0.36, 0.4] }, 0.001],
  [T.sonrie, { ...aC(0.35, -0.02), ojos: { x: 0.5, y: 0.05 }, ...CARA.feliz }, 0.18],
  [T.vuelta + 0.15, { ...CARA.esperanza, cejas: { alto: 0.95, ang: 0.6 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 } }, 0.2],
  // remate: sin campera, sentado en el cajón, contento
  [T.remate - 0.001, { x: CAJON.x, y: -0.24, z: CAJON.z, giro: 0.35, sentado: 1, paso: 0, manoI: [0.22, 0.12, 0.3], manoD: [-0.22, 0.12, 0.3], codoI: null, codoD: null, ...aC(-0.7, -0.08), ojos: { x: -0.7, y: 0.15 }, ...CARA.feliz }, 0.001],
  // ---- parte 2 ----
  // A: en la oficina (no se ve: solo sus manos con el celular). Lo dejamos sentado al escritorio
  [P2 - 0.001, { x: OF.x, y: -0.2, z: 0.05, giro: Math.PI, sentado: 1, ...BRAZOS.celular, ...aC(0, 0.4), ...CARA.concentrada }, 0.001],
  // C: llega caminando (el x lo pone ponerPersonajes), recibe la bolsa
  [T.pC - 0.001, { x: WB.x - 2.4, y: 0, z: WB.z, giro: 1.45, sentado: 0, paso: 1, pasoVel: 9, ...BRAZOS.costado, ...aC(0.1, 0), ...CARA.sonrisa }, 0.001],
  [T.llega[1], { x: WB.x, giro: 1.15, paso: 0 }, T.llega[1] - T.llega[0]],
  [T.da, { manoD: [-0.2, 0.3, 0.42], codoD: [-0.8, -0.5, 0] }, 0.25],
  [T.da + 0.3, { manoD: [-0.27, 0.0, 0.12], codoD: null, ...CARA.feliz }, 0.25],
  [T.seVa + 0.25, { giro: -1.2, paso: 1, ...aC(0, 0) }, 0.25],
  [T.frenaVuelta, { giro: 0.9, paso: 0, ...aC(0.4, 0), manoI: [0.32, 0.6, 0.28], codoI: [1, -0.4, -0.2], dedoI: 1, ...CARA.esperanza, boca: { sonrisa: 0.2, abierta: 0.35, ancho: 0.85 } }, 0.2],
  [T.pD + 1.0, { manoI: [0.28, -0.06, 0.06], codoI: null, dedoI: 0, boca: { sonrisa: 0.3, abierta: 0 } }, 0.3],
  // inserto: mira adentro de la bolsa, sonrisa grande, se va saludando
  [T.pIns - 0.001, { x: WB.x, giro: 0.0, manoD: [-0.12, 0.26, 0.36], codoD: [-0.8, -0.5, 0], ...aC(-0.1, 0.5), ojos: { y: -0.9 }, ...CARA.sorpresa, boca: { sonrisa: 0.5, abierta: 0.2 } }, 0.001],
  [T.pIns + 0.3, { ...CARA.feliz, ...aC(-0.1, 0.45), ojos: { y: -0.8 } }, 0.15],
  [T.saluda, { ...aC(0.6, -0.05), ojos: { x: 0.7, y: 0 } }, 0.2],
  [T.pE - 0.001, { x: WB.x - 0.6, giro: -1.35, paso: 1, ...BRAZOS.costado }, 0.001],
];

// ---------- helpers de mano en coordenadas del mundo ----------
const _v = new THREE.Vector3();
function manoA(per, pose, lado, mundo) {
  per.poner(pose); per.raiz.updateMatrixWorld(true);
  const l = per.cuerpo.worldToLocal(_v.copy(mundo));
  pose[`mano${lado}`] = [l.x / (per.cfg.alto || 1), l.y / (per.cfg.alto || 1), l.z / (per.cfg.alto || 1)];
  return pose;
}
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
const bocaVoz = (p, t, t0, env) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * 0.7); }
};

// la cortina en el tiempo (alto del hueco abajo, m)
function gapEn(t) {
  if (t < T.p4) {
    let g = lerp(1.38, 1.02, eio(sg(t, T.baja[0], T.frena)));
    g += 0.04 * Math.exp(-Math.max(0, t - T.frena) * 10) * (t > T.frena ? Math.sin((t - T.frena) * 40) : 0); // el clanc
    return lerp(g, PUERTA.alto + 0.1, eio(sg(t, T.sube[0], T.sube[1])));
  }
  if (t < P1) return PUERTA.alto + 0.1;
  if (t < T.pC) return PUERTA.alto + 0.1;
  if (t < T.pE) return 1.02;
  return lerp(1.02, 0, sg(t, T.tiron[0], T.tiron[1]) ** 1.6) + 0.025 * Math.exp(-Math.max(0, t - T.tiron[1]) * 9) * (t > T.tiron[1] ? Math.abs(Math.sin((t - T.tiron[1]) * 30)) : 0);
}

function ponerPersonajes(t, gap) {
  const s = set(t);
  // ---- Rubén ----
  let pr = poseEn(t, RK);
  ruben.ponerCampera(t < T.cuelga || (t >= T.pC));
  if (t < T.p4) {
    // el gancho: la punta en la argolla del zócalo, la mano derecha en la varilla
    const punta = V3(0.3, gap + 0.0, 0.11);
    const dir = V3(0.42, 0.62, 0.66).normalize();
    gancho.visible = true; gancho.position.copy(punta); gancho.quaternion.setFromUnitVectors(V3(0, 1, 0), dir);
    const agarre = punta.clone().addScaledVector(dir, 0.58);
    if (t < T.frena + 0.4) pr = manoA(ruben, pr, "D", agarre);
    else { const suelta = eio(sg(t, T.frena + 0.4, T.frena + 0.8)); const p2 = manoA(ruben, { ...pr }, "D", agarre); pr.manoD = p2.manoD.map((v, i) => lerp(v, [-0.3, -0.06, 0.05][i], suelta)); }
    if (t > T.frena + 0.4) { // el gancho queda apoyado contra la pared
      const u = eio(sg(t, T.frena + 0.4, T.frena + 0.8));
      gancho.position.lerp(V3(1.15, 0, 0.12), u); gancho.quaternion.slerp(new THREE.Quaternion().setFromUnitVectors(V3(0, 1, 0), V3(0.05, 1, -0.08).normalize()), u);
    }
  } else if (t >= T.pE && t < T.tiron[1] + 0.3) {
    // E: la baja de un tirón con la mano, hasta la rodilla; el resto cae sola (clanc)
    gancho.visible = true; gancho.position.set(1.15, 0, 0.12); gancho.quaternion.setFromUnitVectors(V3(0, 1, 0), V3(0.05, 1, -0.08).normalize());
    const y = Math.max(gap, 0.5), suelta = sg(t, T.tiron[1], T.tiron[1] + 0.3);
    pr.inclina = lerp(0.05, 0.45, sg(y, 1.0, 0.5)) * (1 - suelta);
    const p2 = manoA(ruben, { ...pr }, "D", V3(0.55, y + 0.02, 0.15));
    pr.manoD = p2.manoD.map((v, i) => lerp(v, [-0.3, -0.06, 0.05][i], eio(suelta)));
  } else if (t >= T.pC) { gancho.visible = true; gancho.position.set(1.15, 0, 0.12); gancho.quaternion.setFromUnitVectors(V3(0, 1, 0), V3(0.05, 1, -0.08).normalize()); }
  else gancho.visible = false;
  // montaje: va a los estantes y vuelve con cada cosa
  if (en(t, T.p6, T.p7)) {
    const ci = T.items.findIndex((x) => x > t);
    const prox = ci < 0 ? T.p7 : T.items[ci], prev = ci <= 0 ? T.p6 : T.items[ci - 1];
    const u = sg(t, prev, prox), ida = Math.sin(u * Math.PI);
    pr.z = RI.z - ida * 0.45; pr.giro = ida > 0.3 && u < 0.5 ? Math.PI * 0.9 : -0.1 + (u > 0.5 ? (1 - u) * 0.4 : 0); pr.paso = ida > 0.05 ? 1 : 0;
    if (ida < 0.3) pr = mezclar(pr, { ...pr, ...BRAZOS.apoyado, inclina: 0.06 }, 1 - ida / 0.3);
    pr.cabeza = { ...pr.cabeza, giro: u > 0.5 ? -0.4 : 0, asiente: 0.15 };
  }
  // el resoplido: los cachetes inflados un instante
  pr.aplasta += 0.04 * pulso(t, T.resopla, 0.35);
  bocaVoz(pr, t, T.voz1, VOZ1_ENV);
  bocaVoz(pr, t, T.voz2, VOZ2_ENV);
  // la boca no se abre en el suspiro, pero el pecho sube y baja
  pr.aplasta -= 0.04 * pulso(t, T.voz1 + 0.15, 0.7);
  // el sacarse la campera (antes del corte): se abre los hombros
  if (en(t, T.solapas[0], T.cuelga)) { const u = sg(t, T.solapas[0], T.cuelga); pr.torso = Math.sin(u * Math.PI) * 0.12; pr.ladea = Math.sin(u * Math.PI) * -0.05; }
  // colgar la campera: la mano derecha llega al gancho del perchero y suelta
  if (en(t, T.cuelga, T.cuelga + 0.6)) { const u = 1 - sg(t, T.cuelga + 0.25, T.cuelga + 0.6); if (u > 0) { const p2 = manoA(ruben, { ...pr }, "D", ganchoPerchero.clone().add(V3(0.02, -0.05, 0.06))); pr.manoD = pr.manoD.map((v, i) => lerp(v, p2.manoD[i], eio(u))); } }
  ruben.poner(pr);
  // ---- Walter ----
  let pw = poseEn(t, WK);
  walter.ponerCampera(t < T.remate || t >= T.pC);
  mochila.visible = t < T.remate || t >= T.pC;
  if (t < T.frena) { const u = sg(t, T.corre[0], T.frena); pw.x = lerp(WB.x - 3.2, WB.x, 1 - Math.pow(1 - u, 1.6)); }
  if (en(t, T.pC, T.llega[1])) pw.x = lerp(WB.x - 2.4, WB.x, sg(t, T.llega[0], T.llega[1]));
  if (en(t, T.seVa + 0.25, T.frenaVuelta - 0.05)) pw.x = WB.x - (t - T.seVa - 0.25) * 0.8;
  else if (en(t, T.frenaVuelta - 0.05, T.pE)) pw.x = WB.x - (T.frenaVuelta - 0.3 - T.seVa) * 0.8;
  if (t >= T.pE) pw.x = WB.x - 0.6 - (t - T.pE) * 1.3;
  // la mano en la cortina cuando la frena
  if (en(t, T.frena - 0.1, T.p3)) { const u = eio(sg(t, T.frena - 0.1, T.frena + 0.1)); pw = mezclar(pw, { ...pw, manoI: [0.24, 0.62, 0.36], manoD: [-0.2, 0.6, 0.38], codoI: [1, -0.4, -0.3], codoD: [-1, -0.4, -0.3] }, u); const sac = Math.sin(t * 26) * 0.03 * (t < T.b1 + 0.6 ? 1 : 0); pw.manoI[1] += sac; pw.manoD[1] -= sac; }
  // tachar: la lapicera se mueve sobre la lista
  if (en(t, T.p6, T.p7) || en(t, T.tacha[0], T.tacha[1] + 0.05)) { const k = Math.sin(t * 22) * 0.025; pw.manoD = [pw.manoD[0] + k, pw.manoD[1] + Math.cos(t * 17) * 0.008, pw.manoD[2]]; }
  // da vuelta el papel: las dos manos giran hacia afuera
  if (en(t, T.vuelta - 0.1, T.p8)) { pw.manoI = [0.13, 0.36, 0.4]; pw.manoD = [-0.13, 0.36, 0.4]; }
  // saluda al irse
  if (en(t, T.saluda, T.pE)) pw = mezclar(pw, { ...pw, ...saludo(t - T.saluda, "I", 1.1) }, eio(sg(t, T.saluda, T.saluda + 0.2)));
  if (t >= T.pE) pw = mezclar(pw, { ...pw, ...saludo(t - T.pE, "I", 1.1) }, 1);
  walter.poner(pw);
  ruben.raiz.visible = s !== "oficina";
  walter.raiz.visible = s !== "tarde" && !(s === "oficina");
}

// ================= ESCENA EN EL TIEMPO =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3();
function luces(s, t) {
  const noche = s === "vereda" || s === "adentro";
  exterior.visible = s !== "oficina"; fachada.visible = s !== "oficina"; interior.visible = s !== "oficina"; oficina.visible = s === "oficina";
  farolLuz.intensity = s === "vereda" ? 14 : s === "adentro" ? 2 : 0;
  lampara.intensity = s === "adentro" ? 10 : s === "vereda" ? 6 : s === "tarde" ? 3 : 0;
  escritorioLuz.intensity = s === "oficina" ? 6 : 0; escritorioLuz.position.set(OF.x - 0.3, 1.25, -0.8);
  scene.background.set(s === "tarde" ? 0xcfe0f0 : 0x0b1220);
  if (s === "vereda") {
    key.color.set(0xffcf8f); key.intensity = 2.0; key.position.set(FAROL.x + 0.5, 3.4, FAROL.z + 0.6); key.target.position.set(0.4, 0.9, 0.3);
    Object.assign(key.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -2.5 }); cielo.intensity = 0.55; cielo.color.set(0x7f9ccf);
    relleno.intensity = 0.55; relleno.color.set(0xb8cbff);
  } else if (s === "adentro") {
    key.color.set(0xffe0b0); key.intensity = 1.8; key.position.set(1.6, 4.5, 1.2); key.target.position.set(0.3, 0.8, -1.5);
    Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3 }); cielo.intensity = 0.75; cielo.color.set(0xfff0d8);
    relleno.intensity = 0.45; relleno.color.set(0xfff2e0);
  } else if (s === "tarde") {
    key.color.set(0xfff0d0); key.intensity = 2.6; key.position.set(-1.5, 4.0, 5.0); key.target.position.set(0.3, 0.8, -1.5);
    Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3 }); cielo.intensity = 1.0; cielo.color.set(0xeaf3ff);
    relleno.intensity = 0.6; relleno.color.set(0xffffff);
  } else {
    key.color.set(0xffdcaa); key.intensity = 1.6; key.position.set(OF.x - 1, 3, 1.5); key.target.position.set(OF.x, 0.8, -0.7);
    Object.assign(key.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2 }); cielo.intensity = 0.6; cielo.color.set(0xd0dcff);
    relleno.intensity = 0.4;
  }
  key.shadow.camera.updateProjectionMatrix();
  // relleno desde la cámara (las caras se leen siempre)
  relleno.position.copy(camera.position).add(V3(0.5, 0.8, 0)); relleno.target.position.copy(camera.position).add(camera.getWorldDirection(_a).multiplyScalar(3));
}

function renderAt(tIn) {
  // durante el cartel el canvas muestra el último cuadro de la parte 1 (se va girando) y el primero de la 2 (iris)
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  const s = set(t);
  luces(s, t);
  const gap = ponerCortina(gapEn(t));
  ponerPersonajes(t, gap);

  // ---- termo y mate de Rubén ----
  {
    const parte1 = t < P1;
    const conCampera = t < T.cuelga;
    // termo: bajo el brazo izquierdo (vereda), sobre el mostrador (adentro)
    if (s === "vereda" || (s === "adentro" && t < T.apoya)) {
      ruben.cuerpo.add(termoR); termoR.position.set(0.27, 0.05, 0.08); termoR.rotation.set(0.15, 0, 0.35); termoR.visible = true;
    } else if (s === "adentro" || s === "tarde") {
      scene.add(termoR); termoR.position.set(MOSTRADOR.x + 0.95, MOSTRADOR.y, MOSTRADOR.z - 0.2); termoR.rotation.set(0, 0.4, 0); termoR.visible = t >= T.apoya;
    } else termoR.visible = false;
    // mate: en la mano izquierda en la parte 2 (vereda y tarde); en el remate lo apoya en el mostrador
    const mateEnMano = (s === "vereda" && t >= T.pC) || s === "tarde";
    if (mateEnMano) { const p = manoMundo(ruben, "I", _a); mateR.position.copy(p).add(V3(0, -0.07, 0.02)); mateR.rotation.set(0, 0.5, 0); mateR.visible = true; }
    else if (parte1 && t >= T.remate) { mateR.position.set(MOSTRADOR.x + 0.72, MOSTRADOR.y, MOSTRADOR.z + 0.05); mateR.rotation.set(0, 0, 0); mateR.visible = true; mateR.scale.setScalar(1 + 0.15 * pulso(t, T.remate + 0.35, 0.25)); }
    else mateR.visible = false;
    void conCampera;
  }

  // ---- la campera colgada en el perchero (desde el corte) / la de Walter en el cajón ----
  camperaColgada.visible = t >= T.cuelga && t < P1;
  if (camperaColgada.visible) {
    camperaColgada.position.copy(ganchoPerchero); camperaColgada.position.y += 0.03;
    camperaColgada.rotation.set(0, -0.3, Math.sin((t - T.cuelga) * 7) * 0.12 * Math.exp(-(t - T.cuelga) * 2.5));
  }
  camperaW.visible = t >= T.remate && t < P1;
  if (camperaW.visible) { camperaW.position.set(CAJON.x + 0.12, 0.42, CAJON.z + 0.12); camperaW.rotation.set(-1.35, -0.6, 0.1); camperaW.scale.setScalar(0.85); }

  // ---- el papelito / la lista / la hoja ----
  {
    papelito.visible = false; listaPiso.visible = false; rollo.visible = false; hoja.visible = false; lapicera.visible = false;
    if (en(t, T.papelito - 0.2, T.deja)) { // entre dos dedos de Walter
      const p = manoMundo(walter, "D", _a); papelito.position.copy(p).add(V3(0.0, 0.06, 0.03)); papelito.rotation.set(0, walter.raiz.rotation.y, 0.2); papelito.visible = t >= T.papelito - 0.05 || s === "adentro";
    } else if (en(t, T.deja, T.suelta)) { papelito.position.set(LX, MOSTRADOR.y + 0.008, MOSTRADOR.z + 0.1); papelito.rotation.set(-Math.PI / 2, 0, 0.3); papelito.visible = true; }
    if (t >= T.suelta && t < P1) {
      const L = desenrollado(t);
      listaPiso.visible = true;
      const n = Math.max(2, Math.round((L / LARGO) * NSEG));
      listaGeo.setDrawRange(0, (n - 1) * 6);
      if (L < LARGO - 0.05 && t < T.p6) {
        const r = lerp(0.075, 0.03, L / LARGO);
        const p = curva.getPointAt(cl(L / LARGO, 0.0005, 1)), tg = curva.getTangentAt(cl(L / LARGO, 0.0005, 1));
        rollo.visible = true; rollo.scale.set(1, r, r); rollo.position.copy(p).add(V3(0, r, 0)).addScaledVector(tg, 0.0);
        rollo.rotation.set(-L / r, 0, 0);
      }
    }
    // la hoja en las manos de Walter (montaje y plano 7): frente tachado, y el dorso "ATRÁS" cuando la da vuelta
    if (en(t, T.p6, T.p8)) {
      const pi = manoMundo(walter, "I", _a), pd = manoMundo(walter, "D", _b);
      hoja.visible = true; hoja.position.copy(pi).add(pd).multiplyScalar(0.5).add(V3(0, t >= T.p7 ? 0.14 : 0.1, 0));
      const giroV = eio(sg(t, T.vuelta, T.vuelta + 0.22)) * Math.PI;
      // de frente a la cámara del plano 7 (Rubén): el frente tachado se ve, después el dorso
      hoja.rotation.order = "YXZ";
      hoja.rotation.set(-0.15, walter.raiz.rotation.y + giroV, 0);
      if (t < T.p7) hoja.rotation.set(-1.94, walter.raiz.rotation.y, 0);
      tiraHoja.visible = t >= T.p7; hoja.scale.setScalar(t >= T.p7 ? 1.45 : 1);
      lapicera.visible = t < T.vuelta - 0.05; lapicera.position.copy(pd).add(V3(0, 0.05, 0.02)); lapicera.rotation.set(0.6, 0, 0.5);
    }
  }

  // ---- la mercadería: parte 1 aparece en el mostrador con pop y squash; parte 2 vuela a la bolsa ----
  items.forEach((it, i) => {
    const ti = T.items[i];
    const vis = t >= ti && t < P1;
    it.visible = vis;
    if (vis) { const s2 = bk(sg(t, ti, ti + 0.22)); const sq = pulso(t, ti + 0.1, 0.18) * 0.25; it.scale.set(Math.max(0.001, s2) * (1 + sq), Math.max(0.001, s2) * (1 - sq), Math.max(0.001, s2) * (1 + sq)); }
  });
  {
    const enB = s === "tarde";
    bolsa.visible = enB || (s === "vereda" && t >= T.pC) || en(t, T.pIns, T.pE + 0.6);
    if (enB) { bolsa.position.set(MOSTRADOR.x - 0.22, MOSTRADOR.y, MOSTRADOR.z + 0.08); bolsa.rotation.set(0, 0.15, 0); bolsa.scale.setScalar(1); }
    else if (bolsa.visible) {
      // en la vereda: junto a la puerta, Rubén la agarra y se la da a Walter
      if (t < T.agarra) { bolsa.position.set(RB.x + 0.05, 0, RB.z + 0.35); bolsa.rotation.set(0, -0.4, 0); }
      else if (t < T.da + 0.15) { const p = manoMundo(ruben, "D", _a); bolsa.position.copy(p).add(V3(0, -0.38, 0)); bolsa.rotation.set(0, -0.4, 0); }
      else { const p = manoMundo(walter, "D", _a); bolsa.position.copy(p).add(V3(0, -0.38, 0.0)); bolsa.rotation.set(0, walter.raiz.rotation.y, 0); }
    }
    ticket.visible = !enB || t >= T.abrocha;
    if (enB) ticket.scale.setScalar(1 + 0.3 * pulso(t, T.abrocha, 0.2));
    items2.forEach((it, i) => {
      const t0 = T.embolsa[0] + i * 0.13;
      if (enB) {
        it.visible = true;
        const u = sg(t, t0, t0 + 0.3);
        const desde = V3(MOSTRADOR.x + 0.25 + (i % 4) * 0.1, MOSTRADOR.y + 0.0, MOSTRADOR.z - 0.15 + Math.floor(i / 4) * 0.12);
        const hasta = V3(bolsa.position.x + ((i % 3) - 1) * 0.06, MOSTRADOR.y + 0.08 + (i % 2) * 0.04, bolsa.position.z);
        it.position.lerpVectors(desde, hasta, eio(u)); it.position.y += Math.sin(u * Math.PI) * 0.35;
        it.rotation.set(0, i, u * (i % 2 ? 2 : -2));
        const sc = u >= 1 ? 0.6 : 1 - 0.4 * u; it.scale.setScalar(sc);
        it.visible = u < 1 || i === 3; // el pan flauta asoma de la bolsa
        if (i === 3 && u >= 1) { it.position.set(bolsa.position.x + 0.04, MOSTRADOR.y + 0.36, bolsa.position.z); it.rotation.set(0, 0.3, 1.25); it.scale.setScalar(0.8); }
      } else if (i === 3 && bolsa.visible) {
        // el pan flauta asomando de la bolsa (afuera)
        it.visible = true; bolsa.updateMatrixWorld(true);
        it.position.copy(V3(0.03, 0.36, 0)).applyMatrix4(bolsa.matrixWorld); it.rotation.set(0, bolsa.rotation.y + 0.3, 1.25); it.scale.setScalar(0.8);
        if (en(t, T.pIns, T.pIns + 0.4)) it.position.y += pulso(t, T.pIns + 0.1, 0.3) * 0.05;
      } else it.visible = false;
    });
  }

  // ---- los celulares ----
  {
    celuW.visible = s === "oficina";
    if (celuW.visible) {
      dibujarTienda(t);
      celuW.position.set(OF.x, 1.02, -0.34); celuW.rotation.set(-0.42, 0, 0);
      celuW.position.y += Math.sin(t * 1.3) * 0.002;
    }
    celuR.visible = s === "tarde";
    if (celuR.visible) {
      const v = en(t, T.vibra, T.vibra + 0.7) ? 1 : 0;
      const x0 = MOSTRADOR.x + 0.08, z0 = MOSTRADOR.z + 0.2;
      celuR.position.set(x0 + v * Math.sin(t * 90) * 0.006, MOSTRADOR.y + 0.012, z0 + v * Math.cos(t * 77) * 0.005);
      celuR.rotation.set(0, -0.5 + v * Math.sin(t * 70) * 0.05, 0);
      pantR.emissiveIntensity = sg(t, T.vibra, T.vibra + 0.1) * 0.95;
      vib.visible = v > 0;
      if (vib.visible) { vib.position.set(x0, MOSTRADOR.y + 0.03, z0); vib.rotation.y = -0.5; vib.scale.setScalar(0.85 + Math.abs(Math.sin(t * 20)) * 0.25); }
    } else vib.visible = false;
    // la oficina: Walter (solo sus manos) sostiene el celular
    if (s === "oficina") { walter.raiz.visible = false; }
  }

  // ---- reloj de pared ----
  {
    let min = 19 * 60 + 59;
    if (t >= T.h2000) min = 20 * 60 + lerp(0, 23, eio(sg(t, T.h2000, T.h2023 + 0.2)));
    if (t >= T.h2041) min = 20 * 60 + 41;
    if (s === "tarde") min = 17 * 60 + 5;
    agujaM.rotation.z = -((min % 60) / 60) * Math.PI * 2;
    agujaH.rotation.z = -(((min / 60) % 12) / 12) * Math.PI * 2;
  }

  // ---- burbujas (en el espacio de la cámara, debajo del chip) ----
  const kf = Math.tan((camera.fov * D2R) / 2) / Math.tan(19 * D2R);
  const ponerB = (b, ti, tf, x, y) => {
    const e = bk(sg(t, ti, ti + 0.3)), sale = eio(sg(t, tf - 0.15, tf));
    b.visible = e > 0.002 && sale < 1 && t < tf;
    if (!b.visible) return;
    b.position.set(x * kf, (y + (1 - eo(sg(t, ti, ti + 0.3))) * -0.03 + sale * 0.05) * kf, -1.0);
    b.rotation.set(0.08, Math.sin((t - ti) * 1.7) * 0.05, Math.sin((t - ti) * 2.2) * 0.02);
    b.scale.setScalar(0.19 * e * (1 - sale) * kf);
  };
  ponerB(B.para, T.b1, T.p3, -0.05, 0.13);
  ponerB(B.perdon, T.b2, T.p4, 0.04, 0.14);
  ponerB(B.ay1, T.ay1, T.p7, -0.04, 0.17);
  ponerB(B.ay2, T.ay2, T.p7, -0.02, 0.105);
  ponerB(B.gracias, T.b3, T.seVa + 0.2, -0.02, 0.15);
  ponerB(B.ay3, T.b4, T.pD + 0.7, 0.05, 0.15);

  // ---- el chip de hora ----
  {
    const vis = !en(t, T.pIns, T.pE) && t < T.cierre + 0.3;
    chip.visible = vis;
    if (vis) {
      const kk = kf;
      chip.position.set(0, 0.2 * 0.72 / 0.72 * kk * 0.72 / 0.72 * 1, -0.72); chip.position.y = 0.198 * kk;
      const tarde = en(t, P2, T.pC);
      placaNoche.visible = !tarde; placaTarde.visible = tarde;
      let actual = 0; for (let i = 0; i < SEC_HORA.length; i++) if (t >= SEC_HORA[i][0]) actual = i;
      const [tc, kc] = SEC_HORA[actual];
      const prev = actual > 0 ? SEC_HORA[actual - 1][1] : null;
      for (const k in HORAS) HORAS[k].visible = false;
      const flip = sg(t, tc, tc + 0.24);
      const corte = tc === P2 || tc === T.pC || tc === 0; // en los cortes de plano no hay flip
      if (!corte && flip < 0.5 && prev) { HORAS[prev].visible = true; HORAS[prev].rotation.x = eio(flip * 2) * Math.PI / 2; }
      else { HORAS[kc].visible = true; HORAS[kc].rotation.x = corte ? 0 : (1 - eo((flip - 0.5) * 2)) * -Math.PI / 2; }
      tildeChip.visible = kc === "2000b" && flip >= 0.5;
      if (tildeChip.visible) tildeChip.scale.setScalar(0.85 * Math.max(0.001, bk(sg(t, tc + 0.15, tc + 0.4))));
      const late = pulso(t, tc, 0.3) * (corte ? 0 : 1);
      chip.scale.setScalar(0.08 * kk * (1 + 0.1 * late));
      chip.rotation.set(-0.05 + Math.sin(t * 1.1) * 0.02, Math.sin(t * 0.8) * 0.08, Math.sin(t * 0.6) * 0.01);
      matDig.g.emissiveIntensity = 0.3 + 0.9 * late;
    }
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
