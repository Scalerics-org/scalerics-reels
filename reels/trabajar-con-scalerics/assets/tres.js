// Capa 3D de trabajar-con-scalerics (Three.js r170 local). Base: reels/abren-hoy (el ejemplar).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek); azar con semilla.
// Dos sets en la misma escena: el almacén de Rubén (x ≈ 0) y la oficina de Sofi de Scalerics (x ≈ 20).
// La videollamada es de verdad: la notebook de Rubén muestra lo que ve la cámara de Sofi (render target) y en los
// planos de Sofi el recuadrito de arriba muestra a Rubén desde su notebook.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { crearPersonaje, ELENCO, poseEn, mezclar, CARA, BRAZOS, saludo, FACEPALM, crearMate, crearTermo, GONZALO_VARIANTES } from "./personajes.js";
import { T, DUR, PLANOS, BOCAS } from "./tiempos3d.js";
await Promise.all(["600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

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

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x16243d);
const camera = new THREE.PerspectiveCamera(38, 1080 / 1920, 0.03, 80);
camera.layers.enable(1); // la capa 1 = lo pegado a la cámara (burbujas, números): las cámaras de la videollamada no la ven
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
scene.environmentIntensity = 0.6;

// luz: sol cálido con sombras + cielo + contraluz; adentro del almacén una lámpara y un relleno
const sol = new THREE.DirectionalLight(0xffe6c8, 2.2); sol.position.set(-3.5, 6, 6); sol.target.position.set(0, 0.8, -0.8);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.camera.left = -3; sol.shadow.camera.right = 3; sol.shadow.camera.top = 3.5; sol.shadow.camera.bottom = -2; sol.shadow.camera.near = 1; sol.shadow.camera.far = 16; sol.shadow.bias = -0.0008; sol.shadow.radius = 4;
scene.add(sol, sol.target);
scene.add(new THREE.HemisphereLight(0xcfe0ff, 0x2a3348, 0.9));
const rim = new THREE.DirectionalLight(0x9cc4ff, 1.3); rim.position.set(4, 3, -5); scene.add(rim);
const lampara = new THREE.PointLight(0xffd59a, 9, 6, 1.6); lampara.position.set(0.2, 2.45, -1.0); scene.add(lampara);
const relleno = new THREE.PointLight(0xffe2b8, 5, 5, 1.8); relleno.position.set(0.4, 1.8, 0.4); scene.add(relleno);
// oficina de Sofi
const SX = 20;
const luzSofi = new THREE.PointLight(0xfff0dc, 7, 5, 1.6); luzSofi.position.set(SX - 0.7, 2.1, 1.0); scene.add(luzSofi);
const luzSofi2 = new THREE.PointLight(0xcfe0ff, 3.5, 4, 1.8); luzSofi2.position.set(SX + 0.9, 1.6, 0.8); scene.add(luzSofi2);
const solSofi = new THREE.DirectionalLight(0xffe6c8, 1.4); solSofi.position.set(SX - 2, 4, 4); solSofi.target.position.set(SX, 1, 0);
solSofi.castShadow = true; solSofi.shadow.mapSize.set(1024, 1024); Object.assign(solSofi.shadow.camera, { left: -1.6, right: 1.6, top: 2.4, bottom: -0.4, near: 1, far: 10 }); solSofi.shadow.radius = 4; solSofi.shadow.bias = -0.0008;
scene.add(solSofi, solSofi.target);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, mostaza: 0xd9a441 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  fachada: mat(C.navy2, 0.8), marco: mat(C.cr, 0.45), marcoOsc: mat(C.cr3, 0.5), g: mat(C.g, 0.5), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.65),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.55), navy3: mat(C.navy3, 0.6), red: mat(C.red, 0.55), madera: mat(C.madera, 0.55), mostaza: mat(C.mostaza, 0.5),
  pared: mat(0xe7dcc4, 0.85), estante: mat(0x7a5233, 0.6), papel: mat(0xf7f5ee, 0.8), gris: mat(0x2a3346, 0.35),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
// caja con una cara de textura (la +z)
const placa = (w, h, d, tex, lado = M.cr, r = 0.02, emis = 0) => mesh(rbox(w, h, d, r), [lado, lado, lado, lado, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, emissive: emis ? 0xffffff : 0, emissiveMap: emis ? tex : null, emissiveIntensity: emis }), lado]);
// lo pegado a la cámara: siempre arriba de todo y en la capa 1
let MATCAP = null;
const matcapDe = (m) => {
  MATCAP ??= (() => { const c = document.createElement("canvas"); c.width = c.height = 256; const x = c.getContext("2d"); const g = x.createRadialGradient(100, 90, 10, 128, 128, 140); g.addColorStop(0, "#ffffff"); g.addColorStop(0.55, "#f2f2f2"); g.addColorStop(1, "#a9adb5"); x.fillStyle = g; x.fillRect(0, 0, 256, 256); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  if (!m.isMeshStandardMaterial) return m.clone();
  return new THREE.MeshMatcapMaterial({ color: m.color, map: m.map, matcap: MATCAP });
};
const aCamara = (g, orden = 30) => { g.traverse((o) => { o.layers.set(1); if (o.isMesh) { o.material = Array.isArray(o.material) ? o.material.map(matcapDe) : matcapDe(o.material); (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.depthTest = false; m.transparent = true; m.opacity = 1; m.toneMapped = false; }); o.renderOrder = orden + (o.userData.orden || 0); o.castShadow = false; } }); camera.add(g); return g; };
// punto de pantalla (px) a coordenadas de la cámara a la distancia z (con el fov actual)
const enPx = (px, py, z) => { const h = Math.tan((camera.fov * D2R) / 2) * z; return [((2 * px) / 1080 - 1) * h * (1080 / 1920), (1 - (2 * py) / 1920) * h, -z]; };

// ================= EL ALMACÉN (el de abren-hoy) =================
const R1 = 0.05, R2 = 0.5; // dónde está Rubén: en el centro hasta el paso 3, después un poco a la derecha (deja lugar a la tablet)
const rubenX = (t) => (t < T.paso3 ? R1 : R2);
const PUERTA = { x0: -0.62, x1: 0.62, alto: 2.42 };
const VIDRIERA = { x0: 0.82, x1: 2.9, y0: 0.62, y1: 2.42 };
const frente = new THREE.Group(); scene.add(frente); // la fachada: solo en los planos que miran hacia la calle
const vereda = lienzo(1024, 1024, (x) => {
  x.fillStyle = "#c9c6b8"; x.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
    x.fillStyle = (i + j) % 2 ? "#cfccbe" : "#c4c1b2"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122);
    x.fillStyle = "rgba(0,0,0,0.06)"; for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) { x.beginPath(); x.arc(i * 128 + 20 + a * 29, j * 128 + 20 + b * 29, 7, 0, 7); x.fill(); }
  }
});
vereda.wrapS = vereda.wrapT = THREE.RepeatWrapping; vereda.repeat.set(5, 4);
{ const p = mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshStandardMaterial({ map: vereda, roughness: 0.85 }), 0, 0, 4); p.rotation.x = -Math.PI / 2; frente.add(p); }
const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(4, 3);
{ const p = mesh(new THREE.PlaneGeometry(8, 6), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.4 }), 0.9, 0.003, -0.9); p.rotation.x = -Math.PI / 2; scene.add(p); }
{
  const Z = -0.06, D = 0.12, ALTO = 4.6;
  const pared = (x0, x1, y0, y1) => frente.add(mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, D), M.fachada, (x0 + x1) / 2, (y0 + y1) / 2, Z));
  pared(-5, PUERTA.x0, 0, ALTO); pared(PUERTA.x0, VIDRIERA.x1, PUERTA.alto, ALTO); pared(PUERTA.x1, VIDRIERA.x0, 0, PUERTA.alto);
  pared(VIDRIERA.x0, VIDRIERA.x1, 0, VIDRIERA.y0); pared(VIDRIERA.x1, 5, 0, ALTO);
  const barra = (x, y, w, h) => frente.add(mesh(rbox(w, h, 0.16, 0.025), M.marco, x, y, 0.0));
  const pcx = (PUERTA.x0 + PUERTA.x1) / 2, pw = PUERTA.x1 - PUERTA.x0;
  barra(PUERTA.x0 + 0.04, PUERTA.alto / 2, 0.09, PUERTA.alto); barra(PUERTA.x1 - 0.04, PUERTA.alto / 2, 0.09, PUERTA.alto);
  barra(pcx, PUERTA.alto - 0.04, pw, 0.09); barra(pcx, 0.06, pw, 0.12);
  const vcx = (VIDRIERA.x0 + VIDRIERA.x1) / 2, vw = VIDRIERA.x1 - VIDRIERA.x0;
  barra(VIDRIERA.x0 + 0.04, (VIDRIERA.y0 + VIDRIERA.y1) / 2, 0.09, VIDRIERA.y1 - VIDRIERA.y0); barra(VIDRIERA.x1 - 0.04, (VIDRIERA.y0 + VIDRIERA.y1) / 2, 0.09, VIDRIERA.y1 - VIDRIERA.y0);
  barra(vcx, VIDRIERA.y1 - 0.04, vw, 0.09); barra(vcx, VIDRIERA.y0 + 0.04, vw, 0.09);
  // el cartel ABIERTO colgado del vidrio (visto desde adentro: la cara de atrás, crema con el horario)
  const tex = lienzo(1024, 600, (x) => { x.fillStyle = "#0b1220"; rr(x, 0, 0, 1024, 600, 60); x.strokeStyle = "#5ce611"; x.lineWidth = 16; x.beginPath(); x.roundRect(24, 24, 976, 552, 44); x.stroke(); x.textAlign = "center"; x.fillStyle = "#5ce611"; x.font = F(900, 186); x.fillText("ABIERTO", 512, 290); x.fillStyle = "#efeee5"; x.font = F(700, 104); x.fillText("Lun a Sáb", 512, 470); x.font = F(800, 92); x.fillText("9 a 20", 512, 560); });
  const c = placa(1.0, 0.586, 0.035, tex, M.navy, 0.045, 0.15); c.position.set(-0.02, 1.49, -0.09); c.rotation.y = Math.PI; c.visible = false; frente.add(c);
}
// vidrios
const vidrioMat = new THREE.MeshPhysicalMaterial({ color: 0xbfd8ff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.1, depthWrite: false });
for (const [x0, x1, y0, y1] of [[PUERTA.x0 + 0.08, PUERTA.x1 - 0.08, 0.12, PUERTA.alto - 0.08], [VIDRIERA.x0 + 0.08, VIDRIERA.x1 - 0.08, VIDRIERA.y0 + 0.08, VIDRIERA.y1 - 0.08]]) {
  const v = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), vidrioMat); v.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0.0); v.renderOrder = 5; frente.add(v);
}
// pared del fondo con estantes llenos, pared izquierda
{
  scene.add(mesh(new THREE.BoxGeometry(8, 3.4, 0.1), M.pared, 0.9, 1.7, -3.3));
  scene.add(mesh(new THREE.BoxGeometry(0.1, 3.4, 3.3), M.pared, -1.9, 1.7, -1.65));
  scene.add(mesh(new THREE.BoxGeometry(0.1, 3.4, 3.3), M.pared, 3.2, 1.7, -1.65));
  let s = 7;
  const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const colores = [C.g, C.cr, C.red, C.mostaza, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  for (const y of [0.7, 1.25, 1.8, 2.35, 2.9]) {
    scene.add(mesh(rbox(4.6, 0.05, 0.42, 0.015), M.estante, 0.7, y, -3.05));
    for (let x = -1.5; x < 2.9; x += 0.17 + az() * 0.08) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (k < 0.45) { const h = 0.22 + az() * 0.18; scene.add(mesh(rbox(0.13, h, 0.16, 0.012), mat(c, 0.6), x, y + 0.025 + h / 2, -3.0)); }
      else if (k < 0.75) { scene.add(mesh(cuerpoFrasco, mat(c, 0.35), x, y + 0.125, -3.0)); scene.add(mesh(tapa, M.cr, x, y + 0.245, -3.0)); }
      else { scene.add(mesh(botella, mat(c, 0.3), x, y + 0.175, -3.0)); scene.add(mesh(pico, mat(C.cr3, 0.4), x, y + 0.37, -3.0)); }
    }
  }
}
const MOSTRADOR = { y: 0.88, z: -1.12 };
{
  const panel = lienzo(1024, 256, (x) => { x.fillStyle = "#8a5b38"; x.fillRect(0, 0, 1024, 256); for (let i = 0; i < 6; i++) { x.fillStyle = "#9b6a43"; rr(x, 14 + i * 170, 26, 150, 204, 14); x.fillStyle = "rgba(255,240,220,0.10)"; x.fillRect(24 + i * 170, 36, 130, 10); } x.fillStyle = "#5ce611"; x.fillRect(0, 0, 1024, 12); });
  const mm = new THREE.MeshStandardMaterial({ map: panel, roughness: 0.65 });
  scene.add(mesh(rbox(3.2, 0.84, 0.62, 0.03), [mat(0x8a5b38, 0.65), mat(0x8a5b38, 0.65), mat(0x8a5b38, 0.65), mat(0x8a5b38, 0.65), mm, mat(0x8a5b38, 0.65)], 0.45, 0.42, MOSTRADOR.z));
  scene.add(mesh(rbox(3.32, 0.06, 0.72, 0.02), M.madera, 0.45, MOSTRADOR.y - 0.02, MOSTRADOR.z));
  scene.add(mesh(rbox(3.0, 0.06, 0.02, 0.01), M.g, 0.45, 0.3, MOSTRADOR.z + 0.315));
  // frasco de caramelos, balanza y termo (siempre a mano)
  const frasco = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 18), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.35, roughness: 0.05 }));
  frasco.position.set(-1.3, MOSTRADOR.y + 0.14, MOSTRADOR.z + 0.05); scene.add(frasco);
  for (let i = 0; i < 9; i++) scene.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.g, C.mostaza][i % 3], 0.3), -1.3 + Math.sin(i * 2.4) * 0.06, MOSTRADOR.y + 0.05 + Math.floor(i / 3) * 0.05, MOSTRADOR.z + 0.05 + Math.cos(i * 2.4) * 0.06));
  scene.add(mesh(rbox(0.36, 0.1, 0.3, 0.03), M.cr, 1.35, MOSTRADOR.y + 0.03, MOSTRADOR.z + 0.08));
  scene.add(mesh(rbox(0.4, 0.025, 0.32, 0.01), mat(0xb9c0c8, 0.3), 1.35, MOSTRADOR.y + 0.1, MOSTRADOR.z + 0.08));

}

// ---------- el caos del gancho: papeles, cuaderno, planillas, post-its (todo se va en el paso 1) ----------
const caos = new THREE.Group(); scene.add(caos);
const PAPELES = [];
{
  let s = 31; const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const planilla = lienzo(256, 360, (x) => { x.fillStyle = "#f7f5ee"; x.fillRect(0, 0, 256, 360); x.fillStyle = "#5ce611"; x.fillRect(0, 0, 256, 34); x.strokeStyle = "#9aa3b5"; x.lineWidth = 3; for (let i = 1; i < 14; i++) { x.beginPath(); x.moveTo(0, 34 + i * 24); x.lineTo(256, 34 + i * 24); x.stroke(); } for (let j = 1; j < 4; j++) { x.beginPath(); x.moveTo(j * 64, 34); x.lineTo(j * 64, 360); x.stroke(); } x.fillStyle = "#c7655b"; x.fillRect(70, 130, 50, 18); x.fillRect(140, 226, 60, 18); });
  const hoja = lienzo(256, 360, (x) => { x.fillStyle = "#f7f5ee"; x.fillRect(0, 0, 256, 360); x.fillStyle = "#16243d"; for (let i = 0; i < 11; i++) x.fillRect(28, 40 + i * 28, 120 + ((i * 53) % 80), 9); });
  const ph = new THREE.MeshStandardMaterial({ map: planilla, roughness: 0.85 }), hj = new THREE.MeshStandardMaterial({ map: hoja, roughness: 0.85 });
  const pilas = [[-0.42, -0.98], [0.52, -1.0], [-0.2, -0.86]];
  for (let i = 0; i < 26; i++) {
    const [px, pz] = pilas[i % 3];
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.004, 0.297), [M.papel, M.papel, i % 2 ? ph : hj, M.papel, M.papel, M.papel]);
    m.castShadow = true; m.receiveShadow = true;
    const fin = { x: px + (az() - 0.5) * 0.09, y: MOSTRADOR.y + 0.012 + Math.floor(i / 3) * 0.009, z: pz + (az() - 0.5) * 0.06, ry: (az() - 0.5) * 0.9 };
    // los primeros ya están; el resto cae del cielo durante el gancho
    const cae = i < 10 ? -1 : 0.4 + (i - 10) * 0.15;
    PAPELES.push({ m, fin, cae, giro: (az() - 0.5) * 3, lado: az() > 0.5 ? 1 : -1 });
    caos.add(m);
  }
  // cuaderno abierto con renglones y tachones
  const cuad = lienzo(512, 360, (x) => { x.fillStyle = "#f3efe0"; x.fillRect(0, 0, 512, 360); x.fillStyle = "#c9c2a8"; x.fillRect(254, 0, 4, 360); x.strokeStyle = "#8fb1d9"; x.lineWidth = 2; for (let i = 1; i < 12; i++) { x.beginPath(); x.moveTo(0, i * 30); x.lineTo(512, i * 30); x.stroke(); } x.fillStyle = "#16243d"; x.font = "italic 600 22px Lexend"; ["Graciela: yerba x2", "Nico: pago?", "envío 18hs", "fiado Pocho", "¿abren dom?"].forEach((l, i) => x.fillText(l, 18, 52 + i * 30)); ["queso 1/2", "llamar prov.", "precio ???", "stock aceite"].forEach((l, i) => x.fillText(l, 272, 52 + i * 30)); x.strokeStyle = "#c7655b"; x.lineWidth = 4; x.beginPath(); x.moveTo(270, 104); x.lineTo(440, 112); x.stroke(); });
  const c = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.012, 0.3), [M.navy3, M.navy3, new THREE.MeshStandardMaterial({ map: cuad, roughness: 0.85 }), M.navy3, M.navy3, M.navy3]);
  c.position.set(0.1, MOSTRADOR.y + 0.01, -0.92); c.rotation.y = 0.15; c.castShadow = true; caos.add(c);
  // post-its pegados en el mostrador y en el frente
  const pt = (txt, col) => lienzo(128, 128, (x) => { x.fillStyle = col; x.fillRect(0, 0, 128, 128); x.fillStyle = "#16243d"; x.font = "700 24px Lexend"; x.textAlign = "center"; txt.split("|").forEach((l, i) => x.fillText(l, 64, 50 + i * 30)); });
  [["LLAMAR|PROV.", "#5ce611", -0.95, 0.7], ["¿PAGÓ?", "#efeee5", -0.6, 0.55], ["STOCK|!!!", "#5ce611", 0.95, 0.62], ["FIADO", "#efeee5", 1.25, 0.5]].forEach(([t, col, x, y], i) => {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.12), new THREE.MeshStandardMaterial({ map: pt(t, col), roughness: 0.8 }));
    p.position.set(x, y, MOSTRADOR.z + 0.315); p.rotation.z = (i % 2 ? 1 : -1) * 0.12; caos.add(p);
  });
}

// ================= LOS PERSONAJES =================
// parpadeo corto (3 cuadros) y espaciado
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 3.9, parpadeoDur: 0.1 }); scene.add(ruben.raiz);
const sofi = crearPersonaje({ ...ELENCO.gonzalo, parpadeoCada: 4.5, parpadeoDur: 0.1, parpadeosExtra: [23.55, 32.8] }); scene.add(sofi.raiz); // el personaje de Scalerics es Gonzalo (la variable sigue llamándose sofi)
// prueba de variantes de Sofi (SOFITEST=1 node gen.mjs)
const SOFIS = window.__sofitest ? ["A", "B", "C"].map((k) => { const p = crearPersonaje(GONZALO_VARIANTES[k]); scene.add(p.raiz); return p; }) : [];
for (const p of [ruben, sofi]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const mate = crearMate(); ruben.cuerpo.add(mate);

// ================= LA OFICINA DE SOFI (x = 20) =================
const CARTEL = [];
const logoTex = await new Promise((ok) => new THREE.TextureLoader().load("assets/logo-blanco.png", (t) => { t.colorSpace = THREE.SRGBColorSpace; ok(t); }));
{
  // pared crema con una franja navy y el letrero de la marca (es Scalerics, el logo sí va)
  scene.add(mesh(new THREE.BoxGeometry(4, 3, 0.1), mat(0xe9e6d8, 0.85), SX, 1.5, -0.95));
  scene.add(mesh(new THREE.BoxGeometry(4, 0.9, 0.02), mat(0xd6cfbd, 0.8), SX, 0.45, -0.89)); // zócalo claro: la remera negra de Gonzalo no se funde con el fondo
  scene.add(mesh(new THREE.BoxGeometry(4, 0.03, 0.03), M.madera, SX, 0.91, -0.88)); // filete de madera: la franja verde se fundía con la chomba
  const cart = mesh(rbox(0.86, 0.3, 0.05, 0.05), M.navy, SX + 0.72, 1.5, -0.88); scene.add(cart); CARTEL.push(cart);
  const ar = logoTex.image.width / logoTex.image.height;
  const lw = Math.min(0.74, 0.2 * ar), logo = new THREE.Mesh(new THREE.PlaneGeometry(lw, lw / ar), new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
  logo.position.set(SX + 0.72, 1.5, -0.85); scene.add(logo); CARTEL.push(logo);
  // isotipo de Scalerics chico en el pecho de la remera de Gonzalo (recorte del logo: solo el símbolo)
  const iso = logoTex.clone(); iso.repeat.set(0.187, 1); iso.offset.set(0, 0); iso.needsUpdate = true;
  for (const p of [sofi, ...SOFIS]) { const pl = new THREE.Mesh(new THREE.PlaneGeometry(0.085, 0.09), new THREE.MeshBasicMaterial({ map: iso, transparent: true })); pl.position.set(0.095, 0.43, 0.158); pl.rotation.set(-0.08, 0.45, 0); p.cuerpo.add(pl); }
  // repisa con libros y una planta; cuadrito con un hexágono verde
  scene.add(mesh(rbox(0.9, 0.04, 0.22, 0.01), M.madera, SX - 0.62, 1.62, -0.8));
  [[C.g, 0.26], [C.navy3, 0.22], [C.cr2, 0.28], [C.red, 0.2], [C.navy2, 0.25]].forEach(([c, h], i) => scene.add(mesh(rbox(0.06, h, 0.17, 0.01), mat(c, 0.6), SX - 0.95 + i * 0.075, 1.64 + h / 2, -0.8)));
  const maceta = mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.13, 18), M.cr, SX - 0.42, 1.705, -0.8); scene.add(maceta);
  for (let i = 0; i < 7; i++) { const h = mesh(new THREE.SphereGeometry(0.06, 12, 8), mat(i % 2 ? C.gd : 0x4f8f2a, 0.7), SX - 0.42 + Math.sin(i * 2.1) * 0.06, 1.8 + (i % 3) * 0.04, -0.8 + Math.cos(i * 2.1) * 0.04); h.scale.set(1, 1.5, 0.6); scene.add(h); }
  const cuadro = mesh(rbox(0.3, 0.3, 0.03, 0.02), M.navy2, SX - 0.3, 1.74, -0.88); scene.add(cuadro);
  const hex = mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.02, 6), M.g, SX - 0.3, 1.74, -0.86); hex.rotation.x = Math.PI / 2; scene.add(hex);
  // escritorio y su notebook (de espaldas a la cámara web: la cámara está en la tapa)
  scene.add(mesh(rbox(1.5, 0.06, 0.62, 0.02), M.madera, SX, 0.93, 0.42));
  scene.add(mesh(rbox(1.4, 0.88, 0.04, 0.01), M.navy3, SX, 0.46, 0.5));
  const taza = mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.1, 16), M.g, SX + 0.45, 1.01, 0.38); scene.add(taza);
  scene.add(mesh(new THREE.BoxGeometry(4, 0.02, 3), mat(0x9b8a74, 0.8), SX, 0, 0));
}

// ================= LA VIDEOLLAMADA: dos render targets =================
const rtSofi = new THREE.WebGLRenderTarget(800, 500, { samples: 4 }); rtSofi.texture.colorSpace = THREE.SRGBColorSpace;
const camSofi = new THREE.PerspectiveCamera(30, 800 / 500, 0.03, 20); camSofi.position.set(SX, 1.38, 1.85); camSofi.lookAt(SX, 1.27, 0);
const rtRuben = new THREE.WebGLRenderTarget(400, 500, { samples: 4, type: THREE.HalfFloatType });
const camRuben = new THREE.PerspectiveCamera(40, 400 / 500, 0.03, 20);

// la notebook de Rubén: base, tapa con bisagra atrás, pantalla con la videollamada
const notebook = new THREE.Group(); scene.add(notebook);
const tapa = new THREE.Group(); notebook.add(tapa);
const pantNb = new THREE.MeshBasicMaterial({ color: 0xffffff });
const esperaTex = lienzo(800, 500, (x) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, 800, 500); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(400, 210, 60, 0, 7); x.fill(); x.fillStyle = "#16243d"; x.font = F(900, 60); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("S", 400, 214); x.fillStyle = "#efeee5"; x.font = F(700, 40); x.fillText("Llamando a Scalerics…", 400, 340); });
pantNb.map = esperaTex;
{
  notebook.add(mesh(rbox(0.42, 0.018, 0.29, 0.012), mat(0xb9c0c8, 0.35, { metalness: 0.3 }), 0, 0.009, 0));
  const teclas = lienzo(256, 160, (x) => { x.fillStyle = "#9aa1ab"; x.fillRect(0, 0, 256, 160); x.fillStyle = "#2a3346"; for (let r = 0; r < 4; r++) for (let c = 0; c < 12; c++) rr(x, 10 + c * 20, 12 + r * 22, 16, 17, 3); rr(x, 60, 102, 136, 17, 3); x.fillStyle = "#8a919b"; rr(x, 88, 126, 80, 28, 4); });
  const tk = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.22), new THREE.MeshStandardMaterial({ map: teclas, roughness: 0.6 })); tk.rotation.x = -Math.PI / 2; tk.position.set(0, 0.0185, 0.02); notebook.add(tk);
  tapa.position.set(0, 0.018, -0.14);
  tapa.add(mesh(rbox(0.42, 0.28, 0.012, 0.012), mat(0xb9c0c8, 0.35, { metalness: 0.3 }), 0, 0.14, 0));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.39, 0.244), pantNb); p.position.set(0, 0.145, 0.0065); tapa.add(p);
  tapa.add(mesh(new THREE.SphereGeometry(0.006, 8, 6), M.navy, 0, 0.272, 0.007));
}
// recuadro de Rubén en los planos de Sofi (arriba a la derecha, pegado a la cámara)
const pip = new THREE.Group();
{
  const W = 0.25, H = 0.3125;
  pip.add(mesh(rbox(W + 0.025, H + 0.025, 0.01, 0.02), new THREE.MeshBasicMaterial({ color: C.navy })));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: rtRuben.texture })); p.position.z = 0.006; p.userData.orden = 1; pip.add(p);
  const borde = mesh(rbox(W + 0.03, 0.012, 0.012, 0.004), M.g); borde.position.set(0, -H / 2 - 0.012, 0.007); pip.add(borde);
}
aCamara(pip, 40);
pip.traverse((o) => { if (o.isMesh && o.material.map === rtRuben.texture) o.material.toneMapped = true; });

// ================= BURBUJAS DEL GANCHO (chat genérico, pegadas a la cámara) =================
function burbuja(texto, col = "cr") {
  const W = 1.12, H = 0.3;
  const fondo = col === "cr" ? "#efeee5" : "#2c4268", letra = col === "cr" ? "#0b1220" : "#efeee5";
  const tex = lienzo(1024, 276, (x) => {
    x.fillStyle = fondo; x.fillRect(0, 0, 1024, 276); x.fillStyle = letra; x.textBaseline = "middle";
    let tam = 104; x.font = F(700, tam);
    while (x.measureText(texto).width > 1024 - 2 * 56 && tam > 60) { tam -= 2; x.font = F(700, tam); }
    x.fillText(texto, 56, 140);
  });
  const g = new THREE.Group();
  const cc = col === "cr" ? C.cr : 0x2c4268;
  const crB = mat(cc, 0.6, { emissive: cc, emissiveIntensity: 0.3 });
  g.add(mesh(rbox(W, H, 0.07, 0.12, 5), [crB, crB, crB, crB, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.32 }), crB]));
  const cola = new THREE.Shape(); cola.moveTo(-0.08, 0); cola.lineTo(0.08, 0); cola.lineTo(-0.1, -0.13); cola.closePath();
  const cg = new THREE.ExtrudeGeometry(cola, { depth: 0.05, bevelEnabled: false }); cg.translate(0, 0, -0.025);
  g.add(mesh(cg, crB, -W / 2 + 0.26, -H / 2 + 0.01, 0));
  return aCamara(g, 30);
}
const PREG = ["¡Hola! ¿Abren hoy?", "¿Cuánto sale el queso?", "¿Hacen envíos?", "¿Hasta qué hora abren?", "¿Tenés yerba?", "¿Me guardás pan?"];
const BG = PREG.map((p) => burbuja(p));
// posiciones en pantalla (px del centro) y giro: se apilan a los costados de Rubén, debajo del gancho
const BPOS = [[290, 1400, -1], [790, 1440, 1], [290, 1565, -1], [790, 1605, 1], [290, 1730, -1], [790, 1770, 1]];

// ================= NÚMEROS 3D Y CONTADOR =================
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 6, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g;
};
const numMat = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.4, emissive: C.g, emissiveIntensity: 0.3 });
const NUMEROS = ["01", "02", "03", "04"].map((n) => {
  const g = new THREE.Group();
  // placa navy redondeada con borde verde, el número verde extruido adelante
  const tex = lienzo(512, 512, (x) => { x.fillStyle = "#0b1220"; rr(x, 0, 0, 512, 512, 90); x.strokeStyle = "#5ce611"; x.lineWidth = 22; x.beginPath(); x.roundRect(22, 22, 468, 468, 72); x.stroke(); });
  g.add(mesh(rbox(1, 1, 0.14, 0.17, 4), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.15 }), M.navy]));
  const num = mesh(textoGeo(n, 0.5, 0.16), numMat, 0, 0, 0.14); num.userData.orden = 1; g.add(num); g.userData.num = num;
  return aCamara(g, 34);
});
// la franja del cartel de paso: navy opaca arriba (0-400 px) con filete verde; nada de la escena la invade
const FRANJA_PX = 400;
const franja = new THREE.Group();
{
  const p = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); franja.add(p); franja.userData.p = p;
  const l = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x5ce611 })); l.userData.orden = 1; franja.add(l); franja.userData.l = l;
}
aCamara(franja, 26);
const contador = new THREE.Group();
const NUM48 = {};
{
  const W = 1.95, H = 0.56;
  const tex = lienzo(1024, 340, (x) => { x.fillStyle = "#0b1220"; rr(x, 0, 0, 1024, 340, 70); x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.beginPath(); x.roundRect(20, 20, 984, 300, 54); x.stroke(); x.fillStyle = "#efeee5"; x.font = F(800, 120); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("Hoy:", 70, 178); x.textAlign = "right"; x.fillText("veces", 960, 178); });
  contador.add(mesh(rbox(W, H, 0.12, 0.1, 4), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.12 }), M.navy]));
  for (const n of ["47", "48"]) { const m = mesh(textoGeo(n, 0.32, 0.1), numMat, -0.03, 0, 0.1); m.userData.orden = 1; contador.add(m); NUM48[n] = m; }
}
aCamara(contador, 32);

// ================= PASO 2: el reloj de 48 h, la propuesta, el sello, la lupa =================
const reloj = new THREE.Group(); scene.add(reloj);
let arco, aguja, arcoK = -1;
{
  const cara = lienzo(512, 512, (x) => { x.fillStyle = "#efeee5"; x.beginPath(); x.arc(256, 256, 256, 0, 7); x.fill(); x.fillStyle = "#16243d"; for (let i = 0; i < 12; i++) { x.save(); x.translate(256, 256); x.rotate((i * Math.PI) / 6); x.fillRect(-7, -236, 14, i % 3 ? 26 : 44); x.restore(); } x.font = F(900, 92); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("48 h", 256, 392); });
  cara.center.set(0.5, 0.5); cara.rotation = Math.PI / 2;
  const caraM = new THREE.MeshStandardMaterial({ map: cara, roughness: 0.55 });
  const cuerpo = mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.12, 48), [M.navy3, caraM, M.navy3]); cuerpo.rotation.x = Math.PI / 2; reloj.add(cuerpo);
  const aro = mesh(new THREE.TorusGeometry(0.34, 0.035, 12, 48), M.navy, 0, 0, 0.06); reloj.add(aro);
  for (const s of [-1, 1]) { const c = mesh(new THREE.SphereGeometry(0.1, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.g, s * 0.22, 0.31, 0); c.rotation.z = -s * 0.5; reloj.add(c); const p = mesh(rbox(0.04, 0.2, 0.04, 0.015), M.navy, s * 0.24, -0.36, -0.01); p.rotation.z = s * 0.5; reloj.add(p); }
  reloj.add(mesh(rbox(0.06, 0.08, 0.04, 0.015), M.navy, 0, 0.38, 0));
  arco = mesh(new THREE.RingGeometry(0.25, 0.3, 48, 1, Math.PI / 2, 0.001), new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.4, emissive: C.g, emissiveIntensity: 0.35, side: THREE.DoubleSide }), 0, 0, 0.063); reloj.add(arco);
  aguja = new THREE.Group(); aguja.position.z = 0.075; reloj.add(aguja);
  aguja.add(mesh(rbox(0.035, 0.12, 0.02, 0.012), M.navy, 0, 0.05, 0));
  aguja.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 16), M.g, 0, 0, 0.0).rotateX(Math.PI / 2));
}
const doc = new THREE.Group(); scene.add(doc);
const CHECKS = [];
let impronta;
const DW = 0.62, DH = 0.86;
const CHIPS_X = [104, 104, 104], CHIPS_Y = [850, 940, 1030]; // casillas de Alcance / Plazo / Precio fijo (px de la textura 1024x1420)
{
  const tex = lienzo(1024, 1420, (x) => {
    x.fillStyle = "#fbfaf4"; x.fillRect(0, 0, 1024, 1420);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, 1024, 250);
    x.fillStyle = "#5ce611"; x.fillRect(0, 250, 1024, 16);
    x.fillStyle = "#efeee5"; x.font = F(900, 110); x.fillText("PROPUESTA", 70, 160);
    x.fillStyle = "#16243d"; x.font = F(800, 64); x.fillText("Almacén de Rubén", 70, 360);
    // las tres piezas
    const pieza = (y, nombre, dib) => { x.fillStyle = "#eef3e6"; rr(x, 60, y - 52, 904, 104, 24); x.fillStyle = "#16243d"; rr(x, 82, y - 38, 76, 76, 16); dib(120, y); x.fillStyle = "#16243d"; x.font = F(800, 56); x.fillText(nombre, 190, y + 20); };
    pieza(470, "Tienda online", (cx, cy) => { x.strokeStyle = "#5ce611"; x.lineWidth = 7; x.strokeRect(cx - 20, cy - 12, 40, 26); x.beginPath(); x.moveTo(cx - 30, cy - 22); x.lineTo(cx - 20, cy - 12); x.stroke(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(cx - 12, cy + 24, 6, 0, 7); x.arc(cx + 12, cy + 24, 6, 0, 7); x.fill(); });
    pieza(590, "Control de stock", (cx, cy) => { x.fillStyle = "#5ce611"; x.fillRect(cx - 24, cy, 12, 22); x.fillRect(cx - 6, cy - 14, 12, 36); x.fillRect(cx + 12, cy - 24, 12, 46); });
    pieza(710, "Agente de IA", (cx, cy) => { x.fillStyle = "#5ce611"; rr(x, cx - 26, cy - 20, 52, 34, 10); x.beginPath(); x.moveTo(cx - 14, cy + 12); x.lineTo(cx - 20, cy + 26); x.lineTo(cx, cy + 12); x.fill(); x.fillStyle = "#16243d"; x.font = F(900, 22); x.textAlign = "center"; x.fillText("IA", cx, cy + 4); x.textAlign = "left"; });
    x.fillStyle = "#d9d7c9"; x.fillRect(60, 782, 904, 6);
    x.fillStyle = "#4a5468"; x.font = F(700, 46); x.fillText("Etapas: tienda, stock y agente", 70, 1145);
    x.fillStyle = "#16243d"; x.fillRect(70, 1250, 380, 5); x.font = F(700, 44); x.fillStyle = "#4a5468"; x.fillText("Conforme: Rubén", 70, 1305);
    // alcance · plazo · precio fijo, con casilla
    [["Alcance", 0], ["Plazo", 1], ["Precio fijo", 2]].forEach(([t, i]) => { const X = 60, Y = CHIPS_Y[i]; x.fillStyle = "#e6e3d6"; rr(x, X, Y - 40, 904, 80, 20); x.fillStyle = "#ffffff"; rr(x, X + 16, Y - 28, 56, 56, 12); x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(X + 16, Y - 28, 56, 56, 12); x.stroke(); x.fillStyle = "#16243d"; x.font = F(800, 52); x.fillText(t, X + 98, Y + 18); });
    x.font = F(700, 40); x.fillStyle = "#4a5468"; x.fillText("scalerics.com", 70, 1385);
  });
  const hoja = mesh(rbox(DW, DH, 0.012, 0.012), [M.papel, M.papel, M.papel, M.papel, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.75 }), M.papel]); doc.add(hoja);
  const tilde = new THREE.Shape(); tilde.moveTo(-0.5, 0.05); tilde.lineTo(-0.2, -0.3); tilde.lineTo(0.55, 0.45); tilde.lineTo(0.42, 0.58); tilde.lineTo(-0.2, -0.02); tilde.lineTo(-0.38, 0.2); tilde.closePath();
  const tg = new THREE.ExtrudeGeometry(tilde, { depth: 0.25, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2 }); tg.translate(0, 0, -0.12);
  for (const [k, cx] of CHIPS_X.entries()) { const m = mesh(tg, mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.3 }), -DW / 2 + (cx / 1024) * DW, DH / 2 - (CHIPS_Y[k] / 1420) * DH, 0.02); m.scale.setScalar(0.001); doc.add(m); CHECKS.push(m); }
  const st = lienzo(512, 256, (x) => { x.strokeStyle = "#3fa60a"; x.lineWidth = 18; x.beginPath(); x.roundRect(14, 14, 484, 228, 34); x.stroke(); x.lineWidth = 6; x.beginPath(); x.roundRect(34, 34, 444, 188, 22); x.stroke(); x.fillStyle = "#3fa60a"; x.font = F(900, 92); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("PRECIO", 256, 98); x.fillText("FIJO", 256, 180); });
  impronta = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.15), new THREE.MeshStandardMaterial({ map: st, transparent: true, roughness: 0.7 }));
  impronta.position.set(0.15, -0.36, 0.009); impronta.scale.setScalar(0.85); impronta.rotation.z = 0.12; doc.add(impronta);
}
const sello = new THREE.Group(); scene.add(sello);
{
  sello.add(mesh(rbox(0.3, 0.06, 0.16, 0.02), M.navy3, 0, 0.03, 0));
  sello.add(mesh(rbox(0.28, 0.02, 0.14, 0.008), mat(C.gd, 0.5), 0, -0.005, 0));
  sello.add(mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.16, 16), M.madera, 0, 0.14, 0));
  sello.add(mesh(new THREE.SphereGeometry(0.065, 20, 14), M.g, 0, 0.25, 0));
}
const lupa = new THREE.Group(); scene.add(lupa);
{
  const aro = mesh(new THREE.TorusGeometry(0.12, 0.02, 12, 40), M.navy, 0, 0, 0); lupa.add(aro);
  const vid = new THREE.Mesh(new THREE.CircleGeometry(0.12, 40), new THREE.MeshPhysicalMaterial({ color: 0xdff0ff, transparent: true, opacity: 0.25, roughness: 0.05 })); lupa.add(vid);
  const mango = mesh(rbox(0.04, 0.2, 0.04, 0.015), M.madera, 0.12, -0.2, 0); mango.rotation.z = 0.6; lupa.add(mango);
}

// ================= PASO 3: la tablet que se arma por etapas =================
const tablet = new THREE.Group(); scene.add(tablet);
const TW = 0.5, TH = 0.76;
const PIEZAS = []; // { m, etapa (0 tienda, 1 stock, 2 agente), orden }
let saludoMat, saludoViejo, saludoNuevo, marcoSel, saludoPieza;
{
  tablet.add(mesh(rbox(TW + 0.04, TH + 0.04, 0.03, 0.04), M.navy, 0, 0, -0.012));
  tablet.add(new THREE.Mesh(new THREE.PlaneGeometry(TW, TH), new THREE.MeshBasicMaterial({ color: 0x0f1a2e })).translateZ(0.0045));
  const pieza = (w, h, x, y, dibujo, etapa, orden, tw = 512) => {
    const th = Math.round((tw * h) / w);
    const tex = lienzo(tw, th, dibujo);
    const m = new THREE.Mesh(rbox(w, h, 0.012, Math.min(0.03, h / 2.2)), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshBasicMaterial({ map: tex }), M.navy]);
    m.position.set(x, y, 0.012); m.userData = { etapa, orden, z: 0.012 }; tablet.add(m); PIEZAS.push(m); return m;
  };
  const cab = (titulo, sub, letra) => (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(56, h / 2, 34, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 36); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(letra, 56, h / 2 + 2); x.textAlign = "left"; x.fillStyle = "#efeee5"; x.font = F(800, 40); x.fillText(titulo, 108, h / 2 - 14); x.fillStyle = "#5ce611"; x.font = F(600, 28); x.fillText(sub, 108, h / 2 + 24); };
  // etapa 1 · la tienda online
  pieza(TW - 0.02, 0.11, 0, TH / 2 - 0.066, cab("Tienda online", "Almacén de Rubén", "R"), 0, 0);
  const producto = (nombre, color) => (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = color; rr(x, 30, 24, w - 60, h * 0.42, 18); x.fillStyle = "#0b1220"; x.font = F(800, 58); x.textAlign = "center"; x.fillText(nombre, w / 2, h * 0.68); x.fillStyle = "#5ce611"; rr(x, 30, h * 0.75, w - 60, h * 0.2, 16); x.fillStyle = "#0b1220"; x.font = F(800, 50); x.fillText("Agregar", w / 2, h * 0.9); };
  [["Yerba", "#3fa60a"], ["Queso", "#d9a441"], ["Aceite", "#e8cf9f"], ["Galletas", "#c7655b"]].forEach(([n, c], i) => pieza(0.215, 0.24, (i % 2 ? 1 : -1) * 0.115, 0.13 - Math.floor(i / 2) * 0.265, producto(n, c), 0, 1 + i));
  pieza(TW - 0.06, 0.07, 0, -0.33, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.font = F(800, 40); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Ver carrito", w / 2, h / 2 + 2); }, 0, 5);
  // etapa 2 · el control de stock
  pieza(TW - 0.02, 0.11, 0, TH / 2 - 0.066, cab("Control de stock", "se actualiza solo", "S"), 1, 0);
  [["Yerba", 12, 0.8, "#5ce611"], ["Aceite", 9, 0.6, "#5ce611"], ["Queso", 4, 0.25, "#c7655b"]].forEach(([n, k, f, c], i) => pieza(TW - 0.04, 0.115, 0, 0.17 - i * 0.14, (x, w, h) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.font = F(800, 46); x.textBaseline = "middle"; x.fillText(n, 26, h * 0.36); x.textAlign = "right"; x.fillText(String(k), w - 26, h * 0.36); x.fillStyle = "#0f1a2e"; rr(x, 26, h * 0.66, w - 52, h * 0.18, 8); x.fillStyle = c; rr(x, 26, h * 0.66, (w - 52) * f, h * 0.18, 8); }, 1, 1 + i));
  pieza(TW - 0.06, 0.09, 0, -0.27, (x, w, h) => { x.fillStyle = "#c7655b"; x.fillRect(0, 0, w, h); x.fillStyle = "#ffffff"; let tq = 38; x.font = F(800, tq); while (x.measureText("Queso: quedan 4. ¿Pedimos?").width > w - 40) { tq -= 2; x.font = F(800, tq); } x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Queso: quedan 4. ¿Pedimos?", w / 2, h / 2 + 2); }, 1, 4);
  // etapa 3 · el agente de IA (el saludo es el que Rubén pide cambiar)
  pieza(TW - 0.02, 0.11, 0, TH / 2 - 0.066, cab("Almacén de Rubén", "agente de IA · en línea", "R"), 2, 0);
  const dibSaludo = (txt) => (x, w, h) => { x.fillStyle = "#2c4268"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.font = F(800, 50); x.textBaseline = "middle"; const ls = txt.split("|"); ls.forEach((l, i) => x.fillText(l, 24, h / 2 + (i - (ls.length - 1) / 2) * 60)); };
  saludoPieza = pieza(0.4, 0.13, -0.035, 0.155, dibSaludo("Hola.|¿En qué te ayudo?"), 2, 1);
  saludoMat = saludoPieza.material[4]; saludoViejo = saludoMat.map; saludoNuevo = lienzo(512, Math.round((512 * 0.13) / 0.4), dibSaludo("¡Buen día, vecino!|¿En qué te ayudo?"));
  pieza(0.27, 0.085, 0.08, 0.01, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.font = F(800, 52); x.textBaseline = "middle"; x.fillText("¿Tenés yerba?", 24, h / 2 + 2); }, 2, 2);
  pieza(0.4, 0.13, -0.035, -0.135, (x, w, h) => { x.fillStyle = "#2c4268"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.font = F(800, 50); x.textBaseline = "middle"; x.fillText("Sí, quedan 12.", 24, h / 2 - 30); x.fillText("¿Te la separo?", 24, h / 2 + 30); }, 2, 3);
  pieza(TW - 0.06, 0.07, 0, -0.29, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#5ce611"; x.font = F(700, 32); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("respondido automáticamente", w / 2, h / 2 + 2); }, 2, 4);
  marcoSel = new THREE.Group(); marcoSel.position.set(-0.035, 0.155, 0.03); tablet.add(marcoSel);
  { const w = 0.43, h = 0.152, e = 0.012; const gm = mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.6 }); for (const [x, y, ww, hh] of [[0, h / 2, w, e], [0, -h / 2, w, e], [w / 2, 0, e, h], [-w / 2, 0, e, h]]) marcoSel.add(mesh(new THREE.BoxGeometry(ww, hh, 0.01), gm, x, y, 0)); }
}
// las tres etapas arriba de la tablet: chips que se tildan
const ETAPAS = ["TIENDA", "STOCK", "AGENTE"].map((nombre, n) => {
  const g = new THREE.Group();
  const gris = lienzo(512, 160, (x) => { x.fillStyle = "#1f3254"; rr(x, 0, 0, 512, 160, 40); x.fillStyle = "#efeee5"; x.font = F(800, 66); x.textBaseline = "middle"; x.fillText(nombre, 40, 84); x.strokeStyle = "#efeee5"; x.lineWidth = 10; x.beginPath(); x.arc(440, 80, 36, 0, 7); x.stroke(); });
  const verde = lienzo(512, 160, (x) => { x.fillStyle = "#5ce611"; rr(x, 0, 0, 512, 160, 40); x.fillStyle = "#0b1220"; x.font = F(800, 66); x.textBaseline = "middle"; x.fillText(nombre, 40, 84); x.beginPath(); x.arc(440, 80, 40, 0, 7); x.fill(); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.lineCap = "round"; x.beginPath(); x.moveTo(420, 82); x.lineTo(436, 98); x.lineTo(462, 64); x.stroke(); });
  const m = new THREE.MeshStandardMaterial({ map: gris, roughness: 0.5, emissive: 0xffffff, emissiveMap: gris, emissiveIntensity: 0.2 });
  g.add(mesh(rbox(0.17, 0.053, 0.02, 0.018), [M.navy, M.navy, M.navy, M.navy, m, M.navy]));
  g.userData = { m, gris, verde };
  tablet.add(g); g.position.set(-0.18 + n * 0.18, TH / 2 + 0.065, 0.01);
  return g;
});

// ================= EL CELULAR DE RUBÉN (vibra en el gancho, se contesta solo en el paso 4) =================
const MSJ = [
  { de: "ella", txt: "Hola! ¿abren hoy?" },
  { de: "local", txt: "¡Buen día, vecino! Sí, hoy de 9 a 20. ¿Te guardo algo?" },
];
function envolver(x, txt, ancho) { const ps = txt.split(" "), ls = []; let l = ""; for (const p of ps) { const n = l ? l + " " + p : p; if (x.measureText(n).width > ancho && l) { ls.push(l); l = p; } else l = n; } if (l) ls.push(l); return ls; }
const autoIcono = (x, cx, cy, r) => { x.fillStyle = "#5ce611"; x.beginPath(); for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4, r2 = i % 2 ? r * 0.38 : r; x.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); } x.closePath(); x.fill(); };
function pantallaChat(n, escribiendo, notifs = 0) {
  return lienzo(720, 1440, (x) => {
    x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 720, 1440);
    if (notifs) {
      // el gancho: la pantalla bloqueada llena de avisos
      x.fillStyle = "#efeee5"; x.font = F(800, 120); x.textAlign = "center"; x.fillText("10:14", 360, 230); x.textAlign = "left";
      for (let i = 0; i < notifs; i++) { x.fillStyle = "#efeee5"; rr(x, 30, 320 + i * 170, 660, 150, 30); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(92, 395 + i * 170, 30, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.font = F(800, 38); x.fillText(["Graciela", "Nico", "Marta", "Vecino 304", "Pocho", "Graciela"][i], 140, 382 + i * 170); x.font = F(500, 34); x.fillText(PREG[i], 140, 430 + i * 170); }
      return;
    }
    x.fillStyle = "#16243d"; x.fillRect(0, 0, 720, 200);
    x.fillStyle = "#b7a9c9"; x.beginPath(); x.arc(92, 118, 46, 0, 7); x.fill();
    x.fillStyle = "#16243d"; x.font = F(800, 46); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("G", 92, 120);
    x.textAlign = "left"; x.fillStyle = "#efeee5"; x.font = F(800, 50); x.fillText("Graciela", 160, 104);
    x.fillStyle = "#8d97ab"; x.font = F(500, 32); x.fillText("en línea", 160, 152);
    x.textBaseline = "alphabetic";
    let alto = 0;
    for (let i = 0; i < n; i++) { const m = MSJ[i]; x.font = F(700, 54); alto += envolver(x, m.txt, 520).length * 66 + 46 + (m.de === "local" ? 54 : 0) + 30; }
    if (escribiendo) alto += 114;
    let y = Math.max(250, 1060 - alto);
    for (let i = 0; i < n; i++) {
      const m = MSJ[i]; x.font = F(700, 54);
      const ls = envolver(x, m.txt, 520);
      const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 60, h = ls.length * 66 + 46 + (m.de === "local" ? 54 : 0);
      const W = m.de === "local" ? Math.max(w, 560) : w, X = m.de === "ella" ? 30 : 720 - 30 - W;
      x.fillStyle = m.de === "ella" ? "#efeee5" : "#2c4268"; rr(x, X, y, W, h, 30);
      x.fillStyle = m.de === "ella" ? "#0b1220" : "#efeee5"; ls.forEach((l, k) => x.fillText(l, X + 30, y + 70 + k * 66));
      if (m.de === "local") { autoIcono(x, X + 46, y + h - 34, 16); x.fillStyle = "#5ce611"; x.font = F(600, 30); x.fillText("respondido automáticamente", X + 72, y + h - 23); }
      y += h + 30;
    }
    if (escribiendo) { const X = 720 - 40 - 170; x.fillStyle = "#2c4268"; rr(x, X, y, 170, 84, 30); x.fillStyle = "#efeee5"; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(X + 50 + k * 36, y + 42, 11, 0, 7); x.fill(); } }
  });
}
const PANT = { n: [1, 2, 3, 4, 5, 6].map((k) => pantallaChat(0, false, k)), apagada: lienzo(16, 32, (x) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, 16, 32); }), enLinea: null, c1: pantallaChat(1, false), c1e: pantallaChat(1, true), c2: pantallaChat(2, false) };
PANT.enLinea = lienzo(720, 1440, (x) => { x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 720, 1440); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(360, 560, 150, 0, 7); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 34; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(290, 565); x.lineTo(345, 620); x.lineTo(440, 505); x.stroke(); x.fillStyle = "#efeee5"; x.font = F(900, 96); x.textAlign = "center"; x.fillText("EN LÍNEA", 360, 850); x.font = F(600, 44); x.fillStyle = "#8d97ab"; x.fillText("Agente de IA", 360, 930); });
const celu = new THREE.Group(); scene.add(celu);
const pantCel = new THREE.MeshBasicMaterial({ color: 0xffffff, map: PANT.n[0] });
{
  celu.add(mesh(rbox(0.1, 0.016, 0.2, 0.014), M.gris));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.18), pantCel); p.rotation.x = -Math.PI / 2; p.position.y = 0.0086; celu.add(p);
}
const vib = new THREE.Group(); scene.add(vib);
{ const gm = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.8 }); for (const s of [-1, 1]) for (const k of [0, 1]) { const a = mesh(new THREE.TorusGeometry(0.12 + k * 0.05, 0.008, 6, 16, 1.1), gm); a.rotation.set(-Math.PI / 2, 0, s > 0 ? -0.55 : Math.PI - 0.55); vib.add(a); } }
// "EN LÍNEA": placa verde que salta arriba del celular cuando se publica
const enLinea = new THREE.Group(); scene.add(enLinea);
{
  const tex = lienzo(1024, 300, (x) => { x.fillStyle = "#5ce611"; rr(x, 0, 0, 1024, 300, 80); x.fillStyle = "#0b1220"; x.beginPath(); x.arc(150, 150, 56, 0, 7); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(150, 150, 26, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 128); x.textBaseline = "middle"; x.fillText("EN LÍNEA", 240, 158); });
  enLinea.add(mesh(rbox(0.5, 0.146, 0.04, 0.05, 4), [M.g, M.g, M.g, M.g, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.45, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.25 }), M.g]));
}
scene.remove(enLinea); aCamara(enLinea, 31);


// ================= ETIQUETAS DEL GANCHO (pedidos · stock · mensajes), pegadas a la cámara sobre cada cosa =================
function etiqueta(texto, ancho = 1.0) {
  const g = new THREE.Group();
  const tex = lienzo(1024, 260, (x) => { x.fillStyle = "#5ce611"; rr(x, 0, 0, 1024, 260, 70); x.fillStyle = "#0b1220"; let tam = 120; x.font = F(900, tam); while (x.measureText(texto).width > 900 && tam > 70) { tam -= 4; x.font = F(900, tam); } x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(texto, 512, 138); });
  g.add(mesh(rbox(ancho, ancho * 0.254, 0.05, 0.08, 4), [M.g, M.g, M.g, M.g, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.25 }), M.g]));
  return aCamara(g, 31);
}
const TAGS = [[etiqueta("Pedidos"), [0.1, 0.92, -0.92], "pedidos"], [etiqueta("Stock"), [-0.42, 0.98, -0.98], "stock"], [etiqueta("Mensajes · 48 hoy", 1.25), [0.42, 0.92, -0.99], "mensajes"]];

// ================= EL ABANICO: un objeto 3D por servicio (lo que dice la web) =================
function iconoWeb() {
  const g = new THREE.Group();
  const tex = lienzo(512, 368, (x) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, 512, 368); x.fillStyle = "#16243d"; x.fillRect(0, 0, 512, 64); ["#c7655b", "#d9a441", "#5ce611"].forEach((c, i) => { x.fillStyle = c; x.beginPath(); x.arc(40 + i * 36, 32, 12, 0, 7); x.fill(); }); x.fillStyle = "#2c4268"; rr(x, 160, 18, 300, 28, 14); x.fillStyle = "#5ce611"; rr(x, 34, 96, 444, 120, 20); x.fillStyle = "#16243d"; for (let i = 0; i < 3; i++) rr(x, 34 + i * 152, 244, 136, 96, 14); });
  g.add(mesh(rbox(1, 0.72, 0.08, 0.06), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.15 }), M.navy]));
  return g;
}
function iconoCarrito() {
  const g = new THREE.Group(), gm = mat(C.g, 0.45);
  g.add(mesh(rbox(0.8, 0.06, 0.5, 0.02), gm, 0, -0.12, 0));
  g.add(mesh(rbox(0.8, 0.42, 0.05, 0.02), gm, 0, 0.08, 0.23)); g.add(mesh(rbox(0.8, 0.42, 0.05, 0.02), gm, 0, 0.08, -0.23));
  g.add(mesh(rbox(0.05, 0.42, 0.5, 0.02), gm, -0.38, 0.08, 0)); g.add(mesh(rbox(0.05, 0.42, 0.5, 0.02), gm, 0.38, 0.08, 0));
  g.add(mesh(rbox(0.22, 0.3, 0.14, 0.03), M.cr, -0.15, 0.2, 0)); g.add(mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.36, 14), M.red, 0.12, 0.22, 0));
  const asa = mesh(rbox(0.05, 0.05, 0.36, 0.02), M.navy, 0.56, 0.42, 0); g.add(asa); g.add(mesh(rbox(0.22, 0.04, 0.04, 0.015), M.navy, 0.47, 0.36, 0.17)); g.add(mesh(rbox(0.22, 0.04, 0.04, 0.015), M.navy, 0.47, 0.36, -0.17));
  for (const x of [-0.26, 0.26]) { const r = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 18), M.navy, x, -0.25, 0.23); r.rotation.x = Math.PI / 2; g.add(r); }
  g.rotation.set(0.35, -0.5, 0);
  return g;
}
function iconoSistema() {
  const g = new THREE.Group();
  const tex = lienzo(512, 368, (x) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, 512, 368); x.fillStyle = "#efeee5"; x.font = F(800, 40); x.fillText("Stock", 30, 56); for (let i = 0; i < 4; i++) { x.fillStyle = "#1f3254"; rr(x, 30, 84 + i * 66, 452, 50, 12); x.fillStyle = i === 3 ? "#c7655b" : "#5ce611"; rr(x, 30, 84 + i * 66, [380, 300, 240, 90][i], 50, 12); } });
  g.add(mesh(rbox(1, 0.72, 0.08, 0.06), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.15 }), M.navy]));
  const engr = engranaje(0.2, 10, C.cr); engr.position.set(0.42, 0.3, 0.08); g.add(engr); g.userData.engr = engr;
  return g;
}
function engranaje(r, dientes, color) {
  const sh = new THREE.Shape();
  for (let i = 0; i < dientes * 2; i++) { const a0 = (i / (dientes * 2)) * Math.PI * 2, a1 = ((i + 1) / (dientes * 2)) * Math.PI * 2, rr2 = i % 2 ? r * 0.8 : r; if (i === 0) sh.moveTo(Math.cos(a0) * rr2, Math.sin(a0) * rr2); sh.lineTo(Math.cos(a0) * rr2, Math.sin(a0) * rr2); sh.lineTo(Math.cos(a1) * rr2, Math.sin(a1) * rr2); }
  const hueco = new THREE.Path(); hueco.absarc(0, 0, r * 0.32, 0, Math.PI * 2, true); sh.holes.push(hueco);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: r * 0.4, bevelEnabled: true, bevelSize: r * 0.04, bevelThickness: r * 0.04, bevelSegments: 2, curveSegments: 6 }); geo.translate(0, 0, -r * 0.2);
  return mesh(geo, mat(color, 0.4));
}
function iconoAgente() {
  const g = new THREE.Group();
  const cr = mat(C.cr, 0.5, { emissive: C.cr, emissiveIntensity: 0.15 });
  g.add(mesh(rbox(1, 0.62, 0.16, 0.2, 5), cr));
  const cola = new THREE.Shape(); cola.moveTo(-0.12, 0); cola.lineTo(0.12, 0); cola.lineTo(-0.16, -0.2); cola.closePath();
  const cg = new THREE.ExtrudeGeometry(cola, { depth: 0.12, bevelEnabled: false }); cg.translate(0, 0, -0.06); g.add(mesh(cg, cr, -0.22, -0.3, 0));
  const iaTex = lienzo(512, 256, (x) => { x.fillStyle = "#0b1220"; x.font = F(900, 210); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("IA", 256, 140); });
  const ia = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.3), new THREE.MeshBasicMaterial({ map: iaTex, transparent: true })); ia.position.set(-0.04, 0.0, 0.085); g.add(ia);
  const estrella = new THREE.Shape(); for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2, r = i % 2 ? 0.05 : 0.14; if (i === 0) estrella.moveTo(Math.cos(a) * r, Math.sin(a) * r); else estrella.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  const est = mesh(new THREE.ExtrudeGeometry(estrella, { depth: 0.05, bevelEnabled: false }), mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.5 }), 0.42, 0.3, 0.08); g.add(est); g.userData.est = est;
  return g;
}
function iconoAuto() {
  const g = new THREE.Group();
  const a = engranaje(0.3, 12, C.g); a.position.set(-0.17, 0.08, 0); g.add(a);
  const b = engranaje(0.22, 9, C.cr); b.position.set(0.3, -0.16, 0.02); g.add(b);
  g.userData.gs = [a, b];
  return g;
}
const SERVICIOS = [["Webs", iconoWeb], ["Tiendas online", iconoCarrito], ["Sistemas a medida", iconoSistema], ["Agentes de IA", iconoAgente], ["Automatizaciones", iconoAuto]].map(([nombre, f], i) => {
  const g = new THREE.Group();
  const ic = f(); g.add(ic); g.userData.ic = ic;
  const tex = lienzo(1400, 280, (x) => { x.fillStyle = "#16243d"; rr(x, 0, 0, 1400, 280, 70); x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.beginPath(); x.roundRect(10, 10, 1380, 260, 60); x.stroke(); x.fillStyle = "#efeee5"; let tam = 150; x.font = F(800, tam); while (x.measureText(nombre).width > 1300) { tam -= 4; x.font = F(800, tam); } x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(nombre, 700, 148); });
  const rot = mesh(rbox(2.1, 0.42, 0.05, 0.1, 4), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 }), M.navy], 0, -0.72, 0.05); g.add(rot);
  return aCamara(g, 32);
});
// dónde va cada uno (px del centro del objeto) y tamaño (px de ancho)
const SPOS = [[270, 440], [810, 440], [270, 780], [810, 780], [540, 1110]];

// ================= LAS BURBUJAS DE RUBÉN (lo que necesita · el cambio que pide) =================
function burbujaR(texto, ancho = 1.12) {
  const PADX = 56, medir = document.createElement("canvas").getContext("2d"); medir.font = F(800, 92);
  const ls = envolver(medir, texto, 1024 - 2 * PADX), hpx = ls.length * 112 + 70, H = (ancho * hpx) / 1024;
  const tex = lienzo(1024, hpx, (x) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, 1024, hpx); x.fillStyle = "#0b1220"; x.font = F(800, 92); x.textBaseline = "alphabetic"; ls.forEach((l, k) => x.fillText(l, PADX, 110 + k * 112)); });
  const g = new THREE.Group();
  const crB = mat(C.cr, 0.6, { emissive: C.cr, emissiveIntensity: 0.3 });
  g.add(mesh(rbox(ancho, H, 0.07, 0.12, 5), [crB, crB, crB, crB, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.32 }), crB]));
  const cola = new THREE.Shape(); cola.moveTo(-0.08, 0); cola.lineTo(0.08, 0); cola.lineTo(0.1, -0.13); cola.closePath();
  const cg = new THREE.ExtrudeGeometry(cola, { depth: 0.05, bevelEnabled: false }); cg.translate(0, 0, -0.025); g.add(mesh(cg, crB, 0.2, -H / 2 + 0.01, 0));
  g.userData.H = H;
  return aCamara(g, 33);
}
const NECES = ["Vender online", "Saber qué tengo en stock", "Que los mensajes se contesten solos"].map((t) => burbujaR(t));
const NPOS = [[330, 455], [750, 640], [350, 832]];
const PIDE = burbujaR("¿Y si saluda con un «buen día, vecino»?", 1.12);

// ================= TODO JUNTO: tienda · stock · chat, andando a la vez =================
function panel(w, h, ancho = 1.0) {
  const g = new THREE.Group();
  const H = (ancho * h) / w;
  const m = new THREE.MeshBasicMaterial({ color: 0xffffff });
  g.add(mesh(rbox(ancho + 0.05, H + 0.05, 0.05, 0.05, 4), M.navy, 0, 0, -0.03));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(ancho, H), m); p.userData.orden = 1; g.add(p);
  aCamara(g, 31);
  g.userData = { m: p.material, H };
  return g;
}
const cabezal = (x, w, titulo, letra) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(64, 60, 36, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 40); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(letra, 64, 62); x.textAlign = "left"; x.fillStyle = "#efeee5"; x.font = F(800, 52); x.fillText(titulo, 120, 62); x.textBaseline = "alphabetic"; };
const tiendaTex = (pedido) => lienzo(1000, 860, (x) => {
  x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 1000, 860); cabezal(x, 1000, "Tienda online", "T");
  [["Yerba", "#3fa60a"], ["Queso", "#d9a441"], ["Aceite", "#e8cf9f"], ["Galletas", "#c7655b"]].forEach(([n, c], i) => { const X = 30 + (i % 2) * 480, Y = 150 + Math.floor(i / 2) * 260; x.fillStyle = "#efeee5"; rr(x, X, Y, 460, 240, 24); x.fillStyle = c; rr(x, X + 20, Y + 20, 150, 200, 18); x.fillStyle = "#0b1220"; x.font = F(800, 52); x.fillText(n, X + 190, Y + 110); x.fillStyle = "#5ce611"; rr(x, X + 190, Y + 140, 240, 70, 16); x.fillStyle = "#0b1220"; x.font = F(800, 38); x.fillText("Agregar", X + 228, Y + 188); });
  if (pedido) { x.fillStyle = "#5ce611"; rr(x, 40, 690, 920, 140, 30); x.fillStyle = "#0b1220"; x.font = F(900, 58); x.fillText("Nuevo pedido · 2 yerbas", 80, 782); }
});
const stockTex = (yerba) => lienzo(1000, 860, (x) => {
  x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 1000, 860); cabezal(x, 1000, "Control de stock", "S");
  [["Yerba", yerba, yerba / 15, "#5ce611"], ["Aceite", 9, 0.6, "#5ce611"], ["Queso", 4, 0.27, "#c7655b"]].forEach(([n, k, f, c], i) => { const Y = 160 + i * 220; x.fillStyle = "#1f3254"; rr(x, 30, Y, 940, 190, 24); x.fillStyle = "#efeee5"; x.font = F(800, 66); x.fillText(n, 70, Y + 90); x.textAlign = "right"; x.fillStyle = i === 0 && yerba < 12 ? "#5ce611" : "#efeee5"; x.font = F(900, 80); x.fillText(String(k), 920, Y + 96); x.textAlign = "left"; x.fillStyle = "#0f1a2e"; rr(x, 70, Y + 125, 860, 34, 12); x.fillStyle = c; rr(x, 70, Y + 125, 860 * f, 34, 12); });
  if (yerba < 12) { x.fillStyle = "#5ce611"; x.font = F(900, 60); x.fillText("−2", 640, 255); }
});
const chatTex = (n, escribiendo) => lienzo(2000, 760, (x) => {
  x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 2000, 760); cabezal(x, 2000, "Graciela · WhatsApp del almacén", "G");
  x.font = F(800, 80);
  if (n >= 1) { const w = x.measureText("Hola! ¿abren hoy?").width; x.fillStyle = "#efeee5"; rr(x, 40, 170, w + 90, 130, 36); x.fillStyle = "#0b1220"; x.fillText("Hola! ¿abren hoy?", 85, 262); }
  if (escribiendo) { x.fillStyle = "#2c4268"; rr(x, 1700, 340, 260, 120, 40); x.fillStyle = "#efeee5"; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(1770 + k * 60, 400, 16, 0, 7); x.fill(); } }
  if (n >= 2) { x.font = F(800, 74); const w = x.measureText("¡Buen día, vecino! Sí, hoy de 9 a 20.").width; const X = 1960 - w - 90; x.fillStyle = "#2c4268"; rr(x, X, 330, w + 90, 300, 36); x.fillStyle = "#efeee5"; x.fillText("¡Buen día, vecino! Sí, hoy de 9 a 20.", X + 45, 430); x.fillStyle = "#5ce611"; x.font = F(700, 52); x.fillText("✦ respondido automáticamente", X + 45, 560); }
});
const JT = { t0: tiendaTex(false), t1: tiendaTex(true), s0: stockTex(12), s1: stockTex(10), c0: chatTex(0), c1: chatTex(1), c1e: chatTex(1, true), c2: chatTex(2) };
const PAN_T = panel(1000, 860), PAN_S = panel(1000, 860), PAN_C = panel(2000, 760, 2.0);
// px: tienda arriba a la izquierda, stock arriba a la derecha, chat abajo (todo entre la franja y los subtítulos)
const PANPX = [[PAN_T, 305, 640, 410], [PAN_S, 765, 640, 410], [PAN_C, 535, 1040, 890]];

// ================= CÁMARA: planos (cortes) con movimiento continuo adentro =================
// CAM[nombre] = claves [u (0..1 dentro del plano), px, py, pz, mx, my, mz, fov]
const W2 = (px, py, pz, mx, my, mz, fov) => [px, py, pz, mx, my, mz, fov];
const CAM = {
  caos: [[0, ...W2(0.12, 1.5, 1.75, 0.06, 1.5, -1.4, 40)], [1, ...W2(0.1, 1.5, 1.5, 0.06, 1.5, -1.4, 40)]],
  caosCerca: [[0, ...W2(0.14, 1.42, 1.2, 0.08, 1.3, -1.35, 40)], [1, ...W2(0.12, 1.4, 1.0, 0.08, 1.3, -1.35, 40)]],
  abanico: [[0, ...W2(0.08, 1.35, 2.5, 0.05, 1.72, -1.68, 40)], [1, ...W2(0.06, 1.36, 2.3, 0.05, 1.72, -1.68, 40)]],
  junto: [[0, ...W2(-0.9, 2.05, 0.5, -0.92, 2.1, -3.0, 40)], [1, ...W2(-0.88, 2.05, 0.4, -0.92, 2.1, -3.0, 40)]],
  general1: [[0, ...W2(0.3, 1.42, 1.25, 0.1, 1.22, -1.3, 40)], [1, ...W2(0.27, 1.4, 1.05, 0.1, 1.22, -1.3, 40)]],
  hombro: [[0, ...W2(1.42, 1.62, -2.75, 0.13, 1.08, -0.95, 27)], [1, ...W2(1.35, 1.58, -2.6, 0.13, 1.08, -0.95, 24)]],
  sofi: "web", sofi2: "web", sofi3: "web", soporte: "web",
  rubenCuenta: [[0, ...W2(0.1, 1.36, 0.6, 0.05, 1.6, -1.68, 40)], [1, ...W2(0.09, 1.36, 0.45, 0.05, 1.6, -1.68, 40)]],
  reloj: [[0, ...W2(-0.74, 1.2, 0.35, -0.8, 1.07, -1.0, 40)], [1, ...W2(-0.76, 1.19, 0.22, -0.8, 1.07, -1.0, 40)]],
  doc: [[0, ...W2(0.2, 1.38, 1.7, 0.18, 1.32, -0.6, 40)], [1, ...W2(0.2, 1.38, 1.62, 0.18, 1.32, -0.6, 40)]],
  fijo: [[0, ...W2(0.1, 1.5, 0.6, 0.05, 1.36, -1.68, 36)], [1, ...W2(0.08, 1.48, 0.38, 0.05, 1.37, -1.68, 34)]],
  lupa: [[0, ...W2(0.34, 1.4, 1.2, 0.18, 1.43, -0.6, 40)], [1, ...W2(0.3, 1.41, 1.15, 0.18, 1.43, -0.6, 40)]],
  pantallas: [[0, ...W2(0.22, 1.5, 2.25, 0.2, 1.41, -0.85, 40)], [1, ...W2(0.2, 1.5, 2.12, 0.2, 1.41, -0.85, 40)]],
  pide: [[0, ...W2(0.45, 1.3, 2.4, 0.22, 1.4, -1.0, 40)], [1, ...W2(0.42, 1.31, 2.3, 0.22, 1.4, -1.0, 40)]],
  cambio: [[0, ...W2(0.22, 1.46, 2.3, 0.15, 1.41, -0.78, 45)], [1, ...W2(0.2, 1.46, 2.2, 0.15, 1.41, -0.78, 45)]],
  publica: [[0, ...W2(0.74, 1.3, 1.25, 0.66, 1.22, -1.3, 40)], [1, ...W2(0.72, 1.3, 1.05, 0.66, 1.22, -1.3, 40)]],
  ensena: [[0, ...W2(-1.1, 2.0, -2.9, 0.52, 1.08, -0.95, 26)], [1, ...W2(-1.02, 1.96, -2.78, 0.52, 1.08, -0.95, 23)]],
  celu: [[0, ...W2(0.79, 1.5, -0.89, 0.79, 0.9, -1.035, 34)], [1, ...W2(0.79, 1.47, -0.9, 0.79, 0.9, -1.035, 34)]],
  mate: [[0, ...W2(0.6, 1.45, 1.1, 0.56, 1.3, -1.5, 38)], [0.35, ...W2(0.59, 1.44, 0.95, 0.56, 1.3, -1.5, 38)], [1, ...W2(0.5, 1.42, 0.55, 0.48, 1.35, -1.68, 38)]],
  fin: [[0, ...W2(0.5, 1.42, 0.55, 0.48, 1.35, -1.68, 38)], [1, ...W2(0.5, 1.42, 0.5, 0.48, 1.35, -1.68, 38)]],
};
// cámara web de Sofi: el plano "videollamada" (cada vez un poco distinto)
const WEB = { sofi: [3.15, 2.95, 32], sofi2: [2.95, 2.8, 32], sofi3: [2.9, 2.75, 32], soporte: [3.1, 2.95, 32] };
const _m = new THREE.Vector3();
let plano = "caos", pIni = 0, pFin = 1;
function ponerCamara(t) {
  let i = 0; while (i + 1 < PLANOS.length && PLANOS[i + 1][0] <= t) i++;
  plano = PLANOS[i][1]; pIni = PLANOS[i][0]; pFin = PLANOS[i + 1]?.[0] ?? DUR;
  const u = sg(t, pIni, pFin);
  let v;
  if (CAM[plano] === "web") {
    const [z0, z1, fov] = WEB[plano];
    const z = lerp(z0, z1, eio(u));
    v = [SX + 0.14 + Math.sin(t * 0.7) * 0.008, 1.42, z, SX + 0.14, 1.3, 0, fov];
  } else {
    const K = CAM[plano];
    let k = 0; while (k + 1 < K.length - 1 && K[k + 1][0] <= u) k++;
    const a = K[k], b = K[k + 1], w = sg(u, a[0], b[0]);
    const p1 = a.slice(1), p2 = b.slice(1);
    const p0 = k > 0 ? K[k - 1].slice(1) : p1, p3 = k + 2 < K.length ? K[k + 2].slice(1) : p2;
    const w2 = w * w, w3 = w2 * w;
    v = p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * w + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * w2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * w3));
  }
  // cámara en mano muy suave + sacudón corto en el sello y en cada número
  let sac = 0;
  for (const g of [T.sello, T.paso1, T.paso2, T.paso3, T.paso4]) if (t >= g) sac = Math.max(sac, Math.exp(-(t - g) * 10) * (g === T.sello ? 1 : 0.5));
  camera.position.set(v[0] + Math.sin(t * 0.9) * 0.008 + Math.sin(t * 47) * 0.012 * sac, v[1] + Math.sin(t * 0.67) * 0.006 + Math.cos(t * 53) * 0.01 * sac, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
const bocaDe = (quien, t) => {
  for (const b of BOCAS) if (b.quien === quien && t >= b.t0 && t < b.t0 + b.env.length / 30) {
    const i = Math.floor((t - b.t0) * 30), f = (t - b.t0) * 30 - i;
    return cl(lerp(b.env[i] ?? 0, b.env[i + 1] ?? 0, f) * 1.15 - 0.05);
  }
  return 0;
};
const R0 = { x: R1, z: -1.68, giro: 0.06 };
const aCam = { cabeza: { giro: 0.02, asiente: -0.02, ladea: 0.04 }, ojos: { x: 0.0, y: 0.05 } };
const miraNb = { cabeza: { giro: -0.1, asiente: 0.3, ladea: 0.02 }, ojos: { x: -0.1, y: -0.6 } };
const miraTablet = { cabeza: { giro: -0.55, asiente: -0.12, ladea: -0.06 }, ojos: { x: -0.85, y: 0.25 } };
const miraCel = { cabeza: { giro: 0.32, asiente: 0.45, ladea: 0.05 }, ojos: { x: 0.25, y: -0.9 } };
const conMate = { manoI: [0.14, 0.36, 0.34], codoI: [0.9, -0.6, -0.3], manoD: [-0.3, 0.32, 0.36] };
const sorbo = { manoI: [0.02, 0.44, 0.33], codoI: [0.9, -0.5, 0.1], cabeza: { giro: 0, asiente: 0.14, ladea: 0.04 }, ojos: { abiertos: 0.05 }, cejas: { alto: 0.35, ang: 0.3 } };
const habla1 = { manoI: [0.3, 0.42, 0.36], codoI: [1, -0.6, -0.2], manoD: [-0.2, 0.5, 0.38], codoD: [-1, -0.6, -0.2] };
const habla2 = { manoI: [0.24, 0.55, 0.4], codoI: [1, -0.5, -0.2], manoD: [-0.32, 0.38, 0.34], codoD: [-1, -0.6, -0.2] };
const RK = [
  // gancho: tapado, mira el celular, mira los papeles, resopla
  [0, { ...R0, ...BRAZOS.apoyado, ...miraCel, ...CARA.fastidio, ojos: { abiertos: 0.7, x: 0.25, y: -0.9 }, cejas: { alto: 0.3, ang: 0.6 }, boca: { sonrisa: -0.4 } }],
  [0.9, { cabeza: { giro: -0.4, asiente: 0.35, ladea: -0.08 }, ojos: { x: -0.7, y: -0.7, abiertos: 0.8 } }, 0.2],
  [1.6, { ...miraCel, ojos: { abiertos: 1, x: 0.25, y: -0.9 }, cejas: { alto: 0.7, ang: 0.4 } }, 0.2],
  [2.4, { cabeza: { giro: -0.3, asiente: 0.3, ladea: 0.1 }, ojos: { x: -0.6, y: -0.5 } }, 0.25],
  // "Yo contestaba lo mismo…" a cámara, cansado
  [3.25, { ...aCam, ...BRAZOS.apoyado, ...CARA.resignado, ojos: { abiertos: 0.5, tension: 0.4, x: 0, y: 0.05 }, cejas: { alto: 0.4, ang: 0.7 } }, 0.3],
  [T.pedidos - 0.1, { manoD: [-0.16, 0.5, 0.46], codoD: [-1, -0.4, 0], dedoD: 1, cabeza: { giro: -0.15, asiente: 0.32, ladea: 0 }, ojos: { x: -0.3, y: -0.8, abiertos: 0.7 } }, 0.25],
  [T.stock - 0.1, { manoD: [-0.34, 0.46, 0.42], cabeza: { giro: -0.4, asiente: 0.28, ladea: 0.05 }, ojos: { x: -0.75, y: -0.6 } }, 0.25],
  [T.mensajes - 0.1, { manoD: [-0.3, 0.32, 0.36], dedoD: 0, ...miraCel, cejas: { alto: 0.75, ang: 0.55 }, ojos: { abiertos: 1, x: 0.25, y: -0.9 } }, 0.25],
  [T.facepalm + 0.15, { ...BRAZOS.apoyado, ...aCam, ...CARA.resignado }, 0.3],
  // el abanico: levanta la vista y sigue cada objeto
  [T.abanico + 0.15, { ...BRAZOS.apoyado, ...CARA.sorpresa, cabeza: { giro: 0, asiente: -0.28, ladea: 0 }, ojos: { x: 0, y: 0.85 } }, 0.3],
  [T.servicios[1] + 0.1, { ...CARA.feliz, cabeza: { giro: 0.3, asiente: -0.22, ladea: 0.05 }, ojos: { x: 0.7, y: 0.6 } }, 0.3],
  [T.servicios[2] + 0.1, { cabeza: { giro: -0.3, asiente: -0.1, ladea: -0.05 }, ojos: { x: -0.7, y: 0.3 } }, 0.3],
  [T.servicios[3] + 0.1, { cabeza: { giro: 0.3, asiente: -0.1, ladea: 0.05 }, ojos: { x: 0.7, y: 0.3 } }, 0.3],
  [T.servicios[4] + 0.1, { cabeza: { giro: 0, asiente: 0.05, ladea: 0 }, ojos: { x: 0, y: -0.2 } }, 0.3],
  [T.precise, { ...aCam, ...CARA.feliz, ...BRAZOS.jarras }, 0.3],
  // paso 1: abre la notebook y saluda a Sofi
  [T.paso1 + 0.05, { ...BRAZOS.apoyado, inclina: 0, ...CARA.esperanza, ...miraNb }, 0.25],
  [T.abreNotebook[0], { manoI: [0.12, 0.3, 0.55], manoD: [-0.02, 0.3, 0.55], codoI: [1, -0.6, 0], codoD: [-1, -0.6, 0] }, 0.25],
  [T.abreNotebook[1], { manoI: [0.12, 0.52, 0.52], manoD: [-0.02, 0.52, 0.52] }, 0.4],
  [T.conecta + 0.1, { ...BRAZOS.apoyado, ...CARA.feliz, ...miraNb }, 0.3],
  [T.sofiSaluda[1] + 0.2, { ...CARA.sonrisa, ...miraNb, cabeza: { giro: -0.1, asiente: 0.28, ladea: -0.1 } }, 0.3],
  // le cuenta de su almacén, con las manos
  // le cuenta lo que necesita (burbujas), con las manos
  [T.necesidades[0] - 0.05, { ...aCam, ...habla2, ...CARA.esperanza }, 0.15],
  [T.necesidades[1], { ...habla1, ...CARA.feliz }, 0.2],
  [T.necesidades[2], { ...habla2 }, 0.2],
  [T.vemos, { ...BRAZOS.apoyado, ...miraNb, ...CARA.sonrisa }, 0.3],
  // paso 2: espera la propuesta, mira el reloj y el papel
  [T.paso2 + 0.1, { ...BRAZOS.apoyado, ...aCam, ...CARA.sonrisa }, 0.3],
  // "¿Fijo?" (sorpresa) y "¿Fijo, fijo?" (entrecierra los ojos, se acerca)
  [T.fijo1 - 0.1, { ...BRAZOS.apoyado, ...aCam, ...CARA.sorpresa, inclina: 0.02, boca: { sonrisa: 0, abierta: 0.2, ancho: 0.8 } }, 0.15],
  [T.fijo2 - 0.05, { inclina: 0.12, cabeza: { giro: 0.12, asiente: 0.04, ladea: 0.16 }, ojos: { abiertos: 0.5, tension: 0, x: 0, y: 0 }, cejas: { alto: -0.1, ang: -0.2, asim: 0.95 }, boca: { sonrisa: 0.2, ancho: 0.75 } }, 0.3],
  [T.sofiFijo + 0.3, { inclina: 0, ...CARA.feliz, ...BRAZOS.apoyado, dedoD: 0, cejas: { asim: 0, alto: 0.4 } }, 0.3],
  // paso 3: mira la tablet que se arma
  [T.paso3 + 0.05, { ...R0, x: R2, ...BRAZOS.apoyado, ...miraTablet, ...CARA.esperanza }, 0.05],
  [T.etapa2, { ...miraTablet, ...CARA.feliz, cabeza: { giro: -0.5, asiente: -0.18, ladea: -0.1 } }, 0.3],
  // "¿Y si saluda con un 'buen día, vecino'?": señala el saludo
  [T.pide + 0.2, { ...miraTablet, inclina: 0.04, ladea: -0.06, manoD: [-0.44, 0.6, 0.46], codoD: [-1, -0.5, -0.2], dedoD: 1, ...CARA.esperanza, cejas: { alto: 0.7, ang: 0.3, asim: 0.4 } }, 0.3],
  [T.hecho - 0.2, { ...BRAZOS.apoyado, dedoD: 0, ...miraTablet, ...CARA.sonrisa }, 0.3],
  [T.cambio + 0.1, { ...miraTablet, ...CARA.feliz, ojos: { feliz: 0.7 }, aplasta: -0.05 }, 0.2],
  // paso 4: publica, aprende con el celular en la mano
  [T.paso4 + 0.1, { ...BRAZOS.apoyado, ...miraCel, ...CARA.esperanza, ojos: { x: 0.35, y: -0.85 } }, 0.25],
  [T.publica + 0.4, { ...CARA.feliz, ojos: { feliz: 0.6, y: -0.8, x: 0.35 } }, 0.25],
  [T.ensena - 0.1, { ...BRAZOS.apoyado, ...CARA.sonrisa, cabeza: { giro: 0.2, asiente: 0.3, ladea: 0.04 }, ojos: { x: 0.2, y: -0.6 } }, 0.2],
  [T.ensena + 0.6, { cabeza: { giro: 0.2, asiente: 0.42, ladea: 0.04 } }, 0.2],
  [T.ensena + 1.0, { cabeza: { giro: 0.2, asiente: 0.25, ladea: 0.04 } }, 0.2],
  [T.ensena + 1.4, { cabeza: { giro: 0.2, asiente: 0.42, ladea: 0.04 } }, 0.2],
  // el celular contesta solo: mate, ojos cerrados
  [T.agarra, { ...R0, x: R2, ...BRAZOS.apoyado, manoI: [0.3, 0.3, 0.4], ...aCam, ...CARA.sonrisa }, 0.05],
  [T.agarra + 0.4, { ...conMate, manoI: [0.26, 0.4, 0.36] }, 0.3],
  // "Ahora el almacén anda solo.": abre el brazo, orgulloso
  [T.anda, { manoI: [0.26, 0.4, 0.36], manoD: [-0.42, 0.5, 0.38], codoD: [-1, -0.4, 0], ...aCam, ...CARA.feliz, cejas: { alto: 0.45, ang: 0.1 } }, 0.3],
  [T.sorbo[0], { manoI: [0.26, 0.4, 0.36], ...BRAZOS.apoyado, manoI: [0.26, 0.4, 0.36], ...aCam, ...CARA.sonrisa, boca: { sonrisa: 0.85 } }, 0.3],
  // ¡salud! con guiño
  // ¡salud! con el mate al costado (la bombilla nunca pasa por la cara)
  [T.salud, { manoI: [0.42, 0.55, 0.32], codoI: [1, -0.3, -0.2], inclina: 0.03, ...aCam, ojos: { abiertos: 1, feliz: 0.15 }, cejas: { alto: 0.5, ang: 0.1, asim: 0.5 }, boca: { sonrisa: 1, abierta: 0.15, ancho: 1.15 } }, 0.25],
  [T.salud + 0.8, { manoI: [0.4, 0.5, 0.34], cejas: { asim: 0 } }, 0.25],
];
const S0 = { x: SX, z: 0, giro: 0 };
const miraWeb = { cabeza: { giro: 0, asiente: 0.02, ladea: 0.03 }, ojos: { x: 0, y: 0.05 } };
const teclado = { manoI: [0.16, 0.44, 0.42], manoD: [-0.16, 0.44, 0.42], codoI: [1, -0.6, -0.2], codoD: [-1, -0.6, -0.2] };
const SK = [
  [0, { ...S0, ...teclado, ...miraWeb, ...CARA.sonrisa }],
  [T.sinComp + 0.05, { manoD: [-0.22, 0.55, 0.42], codoD: [-1, -0.5, -0.1], cabeza: { giro: 0.08, asiente: -0.02, ladea: 0.12 }, ...CARA.feliz, ojos: { feliz: 0.4 } }, 0.25],
  [T.vemos, { ...teclado, manoI: [0.2, 0.5, 0.42], manoD: [-0.2, 0.5, 0.42], codoI: [1, -0.5, -0.1], codoD: [-1, -0.5, -0.1], inclina: 0.08, cabeza: { giro: 0, asiente: 0.06, ladea: -0.12 }, ...CARA.esperanza }, 0.3],
  [T.paso2 - 0.2, { ...teclado, inclina: 0, ...miraWeb, ...CARA.sonrisa }, 0.3],
  // "Fijo." firme, asiente
  [T.sofiFijo, { manoD: [-0.36, 0.6, 0.36], codoD: [-1, -0.4, -0.1], dedoD: 1, ...CARA.sonrisa, cejas: { alto: 0.3, ang: -0.1 }, cabeza: { giro: 0, asiente: 0.12, ladea: 0 } }, 0.15],
  [T.sofiFijo + 0.35, { cabeza: { giro: 0, asiente: -0.04, ladea: 0.05 }, ...CARA.feliz }, 0.2],
  [T.lupa[0], { ...teclado, dedoD: 0, ...miraWeb }, 0.3],
  // "Hecho.": tipea rápido y guiña
  [T.hecho - 0.15, { ...teclado, cabeza: { giro: 0, asiente: 0.08, ladea: 0 }, ojos: { y: -0.25 } }, 0.15],
  [T.hecho + 0.35, { ...miraWeb, ...CARA.sonrisa, boca: { sonrisa: 0.95 }, cejas: { alto: 0.4 } }, 0.15],
  // te enseñamos: señala la pantalla
  [T.ensena, { manoD: [-0.36, 0.66, 0.46], codoD: [-1, -0.5, 0], dedoD: 1, ...CARA.feliz, cabeza: { giro: -0.05, asiente: 0, ladea: 0.08 } }, 0.25],
  [T.soporte - 1.0, { ...teclado, dedoD: 0 }, 0.3],
];

function ponerPersonajes(t) {
  // ---- Rubén ----
  const pr = poseEn(t, RK);
  pr.x = rubenX(t);
  if (plano === "hombro" || plano === "ensena") { pr.manoI = [0.29, -0.08, 0.04]; pr.manoD = [-0.29, -0.08, 0.04]; pr.codoI = null; pr.codoD = null; pr.dedoI = 0; pr.dedoD = 0; }
  // tipeo nervioso al principio y cuando le cuenta: manos que se mueven
  if (en(t, T.necesidades[0] - 0.1, T.vemos - 0.1)) { pr.manoI = [pr.manoI[0], pr.manoI[1] + Math.sin(t * 9) * 0.05, pr.manoI[2]]; pr.manoD = [pr.manoD[0] + Math.sin(t * 7) * 0.03, pr.manoD[1] + Math.cos(t * 8) * 0.05, pr.manoD[2]]; pr.boca.abierta = Math.max(pr.boca.abierta, Math.abs(Math.sin(t * 13)) * 0.45); }
  // ojos abiertos y vivos por defecto; cerrados o entrecerrados solo en las expresiones buscadas
  {
    const sorbiendo = false;
    const desconfia = en(t, T.fijo2 - 0.1, T.sofiFijo - 0.1);
    if (!sorbiendo) {
      pr.ojos.abiertos = Math.max(pr.ojos.abiertos, desconfia ? 0.58 : 0.92);
      pr.ojos.feliz = Math.min(pr.ojos.feliz, desconfia ? 0 : 0.18);
      pr.ojos.tension = cl(pr.ojos.tension, -0.15, 0.15);
      pr.ojos.y = Math.max(pr.ojos.y, -0.55); // mirar abajo no cierra el párpado de frente
    }
  }
  pr.boca.abierta = Math.max(pr.boca.abierta, bocaDe("ruben", t) * 0.75);
  ruben.poner(pr);
  const mi = ruben.brazos[0].mano.position;
  const enMano = t >= T.agarra + 0.22;
  mate.visible = t >= T.paso4;
  if (enMano) {
    if (mate.parent !== ruben.cuerpo) ruben.cuerpo.add(mate);
    mate.position.set(mi.x - 0.01, mi.y - 0.06, mi.z + 0.02);
    mate.rotation.set(0, 0.2, -0.08);
  } else {
    if (mate.parent !== scene) scene.add(mate);
    mate.position.set(rubenX(t) + 0.3, MOSTRADOR.y + 0.01, -0.96);
    mate.rotation.set(0, 0.2, 0);
  }
  // ---- Sofi ----
  let ps = poseEn(t, SK);
  // saludo con la mano cuando conecta la llamada
  const sal = sg(t, T.sofiSaluda[0] - 0.2, T.sofiSaluda[0]) * (1 - sg(t, T.sofiSaluda[1], T.sofiSaluda[1] + 0.25));
  if (sal > 0) ps = mezclar(ps, { ...ps, ...saludo(t - T.sofiSaluda[0], "D", 1.0), ...CARA.feliz }, eio(sal));
  // saluda otra vez en "soporte" (seguimos con vos)
  const sal2 = 0;
  if (sal2 > 0) ps = mezclar(ps, { ...ps, ...saludo(t - T.soporte, "I", 0.9), ...CARA.feliz }, eio(sal2));
  // tipea
  const tip = (t > 0 && t < T.paso1 + 1.6) || (t > T.hecho - 0.15 && t < T.hecho + 0.3) || (t > T.paso2 && t < T.sofiFijo - 0.25);
  if (tip && sal < 0.1) { const k = Math.sin(t * 36) * 0.014, k2 = Math.cos(t * 29) * 0.014; ps.manoI = [ps.manoI[0], ps.manoI[1] + k, ps.manoI[2]]; ps.manoD = [ps.manoD[0], ps.manoD[1] + k2, ps.manoD[2]]; }
  ps.ojos.abiertos = Math.max(ps.ojos.abiertos, 0.95); ps.ojos.y = Math.max(ps.ojos.y, -0.35); ps.cabeza.asiente = Math.min(ps.cabeza.asiente, 0.12); ps.ojos.feliz = Math.min(ps.ojos.feliz, 0.2); ps.ojos.tension = cl(ps.ojos.tension, -0.1, 0.1);
  ps.boca.abierta = Math.max(ps.boca.abierta, bocaDe("sofi", t) * 0.6);
  // escucha a Rubén: asiente
  if (en(t, T.pide, T.hecho - 0.2)) ps.cabeza.asiente += Math.sin((t - T.pide) * 5) * 0.05;
  sofi.poner(ps);
}

// ================= LA CORTINA (alto en px desde arriba) =================
function cortinaPx(t) {
  if (window.__limpio || window.__sofitest || t < T.abanico - 0.22) return 0;
  if (t < T.paso1) return lerp(0, 1920, eio(sg(t, T.abanico - 0.22, T.abanico - 0.04)));
  if (t >= T.tarjeta - 0.3) return lerp(400, 1920, eio(sg(t, T.tarjeta - 0.3, T.tarjeta)));
  let h = 400;
  for (const a of [T.paso1, T.paso2, T.paso3, T.paso4]) if (t >= a - 0.25 && t < a + 0.8) {
    const baja = eio(sg(t, a - 0.25, a)), sube = eio(sg(t, a + 0.5, a + 0.8));
    h = lerp(lerp(a === T.paso1 ? 1920 : 400, 1920, baja), 400, sube);
  }
  return h;
}

// ================= ESCENA EN EL TIEMPO =================
const _v = new THREE.Vector3();
function renderAt(t) {
  scene.environmentRotation.y = t * 0.08;
  ponerCamara(t);
  ponerPersonajes(t);
  const rx = rubenX(t);
  frente.visible = plano === "hombro" || plano === "ensena" || !!window.__portada;

  // ---- el caos: papeles que caen y se apilan; en el paso 1 vuela todo ----
  {
    const barre = eio(sg(t, T.paso1 - 0.05, T.paso1 + 0.4));
    caos.visible = barre < 1;
    PAPELES.forEach((p, i) => {
      const f = p.fin;
      const c = p.cae < 0 ? 1 : eo(sg(t, p.cae, p.cae + 0.45));
      p.m.visible = p.cae < 0 || t >= p.cae;
      p.m.position.set(f.x + (1 - c) * 0.9 * p.lado + barre * p.lado * (1.4 + i * 0.03), f.y + (1 - c) * 0.18 + barre * (0.5 + (i % 4) * 0.15), f.z + (1 - c) * 0.1 + barre * 0.6);
      p.m.rotation.set((1 - c) * p.giro * 0.4 + barre * p.giro, f.ry + (1 - c) * p.giro + barre * p.giro * 2, (1 - c) * 0.3 * p.lado);
    });
    caos.children.filter((o) => !PAPELES.some((p) => p.m === o)).forEach((o, i) => { o.userData.base ??= o.position.clone(); o.position.copy(o.userData.base).add(_v.set(barre * (i % 2 ? 1.5 : -1.5), barre * 0.6, barre * 0.5)); });
  }

  // ---- burbujas del gancho: se apilan a los costados ----
  {
    const k = Math.tan((camera.fov * D2R) / 2) / Math.tan(19 * D2R);
    const sale = eio(sg(t, 2.3, 2.6));
    BG.forEach((B, i) => {
      const ti = T.burbujas[i];
      const s = ti <= 0 ? 1 : bk(sg(t, ti, ti + 0.3));
      B.visible = s > 0.002 && sale < 1;
      if (!B.visible) return;
      const [px, py, lado] = BPOS[i];
      const [x, y, z] = enPx(px + lado * sale * 500, py, 1.0);
      B.position.set(x, y - (1 - eo(sg(t, ti, ti + 0.3))) * 0.03, z);
      B.rotation.set(0.1, -lado * 0.22 + Math.sin((t - ti) * 1.7) * 0.05, lado * 0.04 + Math.sin((t - ti) * 2.2) * 0.015);
      B.scale.setScalar(0.163 * s * k);
    });
  }

  // ---- contador "Hoy: 48 veces" (callback de abren-hoy) ----
  {
    const s = bk(sg(t, T.cuenta48 - 0.25, T.cuenta48 + 0.1)) * (1 - eio(sg(t, T.paso1 - 0.2, T.paso1 + 0.05)));
    contador.visible = false;
    const [x, y, z] = enPx(540, 330, 0.72);
    contador.position.set(x, y, z);
    contador.scale.setScalar(0.112 * Math.max(0.001, s) * (1 + 0.14 * pulso(t, T.cuenta48, 0.3)));
    contador.rotation.set(-0.06 + Math.sin(t * 1.1) * 0.03, Math.sin(t * 0.8) * 0.12, Math.sin(t * 0.6) * 0.012);
    const n = t >= T.cuenta48 ? "48" : "47";
    for (const q in NUM48) NUM48[q].visible = q === n;
    NUM48[n].rotation.x = n === "48" ? (1 - eo(sg(t, T.cuenta48, T.cuenta48 + 0.22))) * -Math.PI * 0.5 : 0;
  }

  // ---- los números de paso: saltan grandes al centro y se van a la esquina ----
  {
    const P = [T.paso1, T.paso2, T.paso3, T.paso4], FIN = [T.paso2 - 0.08, T.paso3 - 0.08, T.paso4 - 0.08, T.tarjeta];
    NUMEROS.forEach((g, i) => {
      const a = P[i];
      const vis = t >= a - 0.14 && t < FIN[i] && !window.__limpio;
      g.visible = vis;
      if (!vis) return;
      const entra = bk(sg(t, a - 0.14, a + 0.18)), va = eio(sg(t, a + 0.5, a + 0.8)), sale = 0;
      const [cx, cy] = [540, 900], [ex, ey] = [175, 300];
      const [x, y, z] = enPx(lerp(cx, ex, va), lerp(cy, ey, va), 1.0);
      g.position.set(x, y, z);
      const h = Math.tan((camera.fov * D2R) / 2);
      const grande = 0.5 * 2 * h * (1080 / 1920) * 1.1, chico = (2 * h * 210) / 1920;
      g.scale.setScalar(Math.max(0.001, lerp(grande, chico, va) * entra * (1 - sale)));
      g.rotation.set(Math.sin(t * 1.3) * 0.05 * (1 - va), (1 - eo(sg(t, a - 0.08, a + 0.35))) * -0.8 + Math.sin(t * 1.1) * 0.06, Math.sin(t * 0.9) * 0.02);

    });
  }

  // ---- la franja/cortina: en cada paso baja tapando todo (el corte pasa debajo) y sube a ser la franja ----
  {
    const hpx = cortinaPx(t);
    franja.visible = hpx > 1;
    const Z = 0.5, H = 2 * Math.tan((camera.fov * D2R) / 2) * Z, W = H * (1080 / 1920) * 1.05;
    const h = (H * Math.max(1, hpx)) / 1920, e = (H * 8) / 1920;
    const { p, l } = franja.userData;
    p.scale.set(W, h, 1); p.position.set(0, H / 2 - h / 2, -Z);
    l.visible = hpx < 1900;
    l.scale.set(W, e, 1); l.position.set(0, H / 2 - h - e / 2, -Z + 0.001);
  }

  // ---- la notebook: aparece en el paso 1, se abre, muestra la llamada ----
  {
    const ap = bk(sg(t, T.paso1 + 0.05, T.paso1 + 0.35));
    notebook.visible = ap > 0.01;
    notebook.position.set(rx + 0.1, MOSTRADOR.y + 0.01, -0.95);
    notebook.rotation.y = Math.PI;
    notebook.scale.setScalar(Math.max(0.001, ap));
    const abre = eio(sg(t, T.abreNotebook[0], T.abreNotebook[1]));
    tapa.rotation.x = lerp(lerp(Math.PI / 2 - 0.02, -0.28, abre), Math.PI / 2 - 0.02, eio(sg(t, T.agarra - 0.1, T.agarra + 0.35))); // se cierra en cámara, al empezar "Ahora el almacén anda solo"
    const conectada = t >= T.conecta;
    const tex = conectada ? rtSofi.texture : esperaTex;
    if (pantNb.map !== tex) { pantNb.map = tex; pantNb.needsUpdate = true; }
    // la cámara de Rubén (para el recuadro en los planos de Sofi): en la tapa, mirándolo
    tapa.updateWorldMatrix(true, false);
    camRuben.position.set(rx + 0.08, 1.42, -0.5);
    camRuben.lookAt(rx, 1.34, -1.68);
  }

  // ---- paso 2: el reloj de 48 h ----
  {
    reloj.visible = true;
    reloj.position.set(-0.8, MOSTRADOR.y + 0.23, -1.0);
    reloj.scale.setScalar(0.5 * (1 + 0.06 * pulso(t, T.reloj, 0.3)));
    reloj.rotation.set(0.02, 0.15 + Math.sin(t * 0.8) * 0.03, 0);
    const vuelta = eio(sg(t, T.reloj + 0.15, T.doc - 0.35));
    aguja.rotation.z = -vuelta * Math.PI * 2;
    const kk = Math.round(vuelta * 60);
    if (kk !== arcoK) { arcoK = kk; arco.geometry.dispose(); arco.geometry = new THREE.RingGeometry(0.25, 0.3, 48, 1, Math.PI / 2 - (kk / 60) * Math.PI * 2, Math.max(0.001, (kk / 60) * Math.PI * 2)); }
  }
  // ---- la propuesta: llega volando, se tilda, sello ----
  {
    // entra desde abajo, ya de tamaño completo (antes nacía chiquita delante de la cara de Rubén)
    const subeDoc = 1 - eo(sg(t, T.doc - 0.2, T.doc + 0.2));
    doc.visible = t >= T.doc - 0.2 && plano === "doc";
    doc.position.set(0.18 + subeDoc * 1.3, 1.36, -0.6);
    doc.rotation.set(0, Math.sin(t * 0.8) * 0.025 - subeDoc * 0.6, Math.sin(t * 1.1) * 0.01 - subeDoc * 0.15);
    doc.scale.setScalar(1);
    [T.alcance, T.plazo, T.precio].forEach((a, i) => CHECKS[i].scale.setScalar(Math.max(0.001, bk(sg(t, a, a + 0.28)) * 0.05)));
    const s = sg(t, T.sello, T.sello + 0.12);
    impronta.visible = t >= T.sello;
    impronta.scale.setScalar(t >= T.sello ? 0.85 * (1 + 0.15 * (1 - eo(sg(t, T.sello, T.sello + 0.2)))) : 0.001);
    // el sello baja desde arriba, golpea y se va
    const baja2 = eio(sg(t, T.sello - 0.4, T.sello)), sube = eio(sg(t, T.sello + 0.12, T.sello + 0.45));
    sello.visible = baja2 > 0 && sube < 1 && plano === "doc";
    doc.updateWorldMatrix(true, false);
    const lejos = Math.max(1 - baja2, sube);
    _v.set(0.15 + lejos * 0.12, -0.36 + lejos * 0.42, 0.03 + lejos * 0.12).applyMatrix4(doc.matrixWorld);
    sello.position.copy(_v);
    sello.rotation.set(Math.PI / 2 - 0.35 * lejos, 0.12, 0);
    sello.scale.set(0.55, 0.55 * (1 - 0.25 * pulso(t, T.sello, 0.12)), 0.55);
    // la lupa recorre el pie de la hoja: no hay letra chica
    const lu = sg(t, T.lupa[0] + 0.05, T.lupa[1] - 0.1);
    lupa.visible = false; // la lupa salió (la línea "Sin letra chica" va en el plano de Sofi)
    _v.set(-0.2 + Math.sin(lu * Math.PI * 2) * 0.02, lerp(-0.06, -0.33, eio(lu)), 0.09).applyMatrix4(doc.matrixWorld);
    lupa.position.copy(_v); lupa.rotation.set(0, 0, -0.2 + Math.sin(t * 2) * 0.05); lupa.scale.setScalar(0.72);
  }

  // ---- paso 3: la tablet se arma por etapas ----
  {
    const entra = bk(sg(t, T.paso3 + 0.05, T.paso3 + 0.4));
    const va = eio(sg(t, T.paso4 + 0.35, T.publica + 0.05)); // se achica y vuela al celular
    tablet.visible = entra > 0.01 && va < 0.99;
    _v.set(-0.1, 1.47, -0.78).lerp(new THREE.Vector3(rx + 0.37, MOSTRADOR.y + 0.03, -1.0), va);
    tablet.position.copy(_v);
    tablet.scale.setScalar(Math.max(0.001, entra * 0.9 * (1 - va * 0.85)));
    tablet.rotation.set(-va * 1.4 + Math.sin(t * 0.9) * 0.02, 0.18 * (1 - va) + Math.sin(t * 0.7) * 0.04, 0);
    const E = [T.etapa1, T.etapa2, T.etapa3];
    // cada etapa: las piezas de la anterior se achican y llegan las nuevas, armándose de a partes
    let actual = 0; E.forEach((e, i) => { if (i > 0 && t >= e) actual = i; });
    PIEZAS.forEach((p) => {
      const { etapa, orden } = p.userData;
      const a = etapa === 0 ? T.paso3 + 0.55 + orden * 0.12 : E[etapa] - 0.02 + orden * 0.03;
      const sig = E[etapa + 1];
      // cambio de etapa seco: la pantalla nunca queda vacía ni con dos etapas encimadas
      const s2 = (etapa === 0 ? bk(sg(t, a, a + 0.26)) : t < a ? 0 : 0.6 + 0.4 * bk(sg(t, a, a + 0.22))) * (sig && t >= sig - 0.02 ? 0 : 1);
      p.visible = s2 > 0.01;
      p.userData.s = s2;
      p.scale.setScalar(Math.max(0.001, s2));
      p.position.z = 0.012 + (1 - eo(sg(t, a, a + 0.26))) * 0.05;
    });
    ETAPAS.forEach((g, i) => {
      const on = t >= E[i] + 0.3;
      const tex = on ? g.userData.verde : g.userData.gris;
      if (g.userData.m.map !== tex) { g.userData.m.map = tex; g.userData.m.emissiveMap = tex; g.userData.m.needsUpdate = true; }
      g.scale.setScalar(1 + 0.18 * pulso(t, E[i] + 0.25, 0.3));
    });
    // el saludo: Rubén lo señala (marco verde) y cambia (gira y vuelve con el texto nuevo)
    const sel = bk(sg(t, T.pide, T.pide + 0.3)) * (1 - eio(sg(t, T.cambio + 0.6, T.cambio + 0.9)));
    marcoSel.visible = sel > 0.01 && actual === 2;
    marcoSel.scale.set(lerp(1.3, 1, cl(sel)), lerp(1.5, 1, cl(sel)), 1);
    const tx = t >= T.cambio ? saludoNuevo : saludoViejo;
    if (saludoMat.map !== tx) { saludoMat.map = tx; saludoMat.needsUpdate = true; }
    const sq = pulso(t, T.cambio - 0.1, 0.2);
    const ss = Math.max(0.001, saludoPieza.userData.s ?? 0);
    saludoPieza.scale.set(ss * (1 + 0.1 * pulso(t, T.cambio + 0.05, 0.35) - 0.06 * sq), ss * (1 + 0.1 * pulso(t, T.cambio + 0.05, 0.35) - 0.06 * sq), ss); // cambia el texto con un latido, sin aplastarse
  }

  // ---- el celular: avisos en el gancho; "EN LÍNEA" y el chat que se contesta solo en el paso 4 ----
  {
    let v = 0;
    for (const [a, d] of [[0.4, 0.6], [1.75, 0.6], [T.mensajes + 0.1, 0.5]]) if (en(t, a, a + d)) v = 1;
    const x0 = rx + 0.37, z0 = MOSTRADOR.z + 0.12;
    celu.position.set(x0 + v * Math.sin(t * 90) * 0.004, MOSTRADOR.y + 0.018, z0 + v * Math.cos(t * 77) * 0.003);
    celu.rotation.set(0, v * Math.sin(t * 70) * 0.03 - 0.08, 0);
    celu.scale.setScalar(1 + 0.15 * pulso(t, T.publica, 0.35));
    const nN = Math.min(6, T.burbujas.filter((b) => t >= b).length);
    let tex = PANT.apagada;
    if (t < T.paso1) tex = PANT.n[Math.max(0, nN - 1)];
    else if (t >= T.publica && t < T.m1 - 0.1) tex = PANT.enLinea;
    else if (t >= T.m1 - 0.1) tex = PANT.enLinea;
    if (pantCel.map !== tex) { pantCel.map = tex; pantCel.needsUpdate = true; }
    vib.visible = false;
    if (vib.visible) { vib.position.set(x0, MOSTRADOR.y + 0.03, z0); vib.rotation.y = -0.08; vib.scale.setScalar(0.85 + Math.abs(Math.sin(t * 20)) * 0.25); }
    const el = bk(sg(t, T.publica + 0.1, T.publica + 0.45)) * (1 - eio(sg(t, T.ensena - 0.3, T.ensena - 0.1)));
    enLinea.visible = el > 0.01 && cortinaPx(t) < 400.5;
    { const [ex, ey, ez] = enPx(540, 1700, 1.0); enLinea.position.set(ex, ey + Math.sin(t * 2) * 0.002, ez); }
    enLinea.rotation.set(0, Math.sin(t * 1.3) * 0.15, 0);
    enLinea.scale.setScalar(Math.max(0.001, el * Math.tan((camera.fov * D2R) / 2) * 2 * (1080 / 1920) * (560 / 1080) / 0.5));
  }

  // ---- etiquetas del gancho: aparecen en cada palabra, sobre cada cosa ----
  {
    const sale = eio(sg(t, T.abanico - 0.25, T.abanico));
    for (const [g, p, k] of TAGS) {
      const s2 = bk(sg(t, T[k], T[k] + 0.3));
      const [px, py] = { pedidos: [280, 285], stock: [800, 285], mensajes: [540, 400] }[k];
      g.visible = s2 > 0.01 && plano === "caosCerca" && cortinaPx(t) < py - 70;
      if (!g.visible) continue;
      const [x, y, z] = enPx(px, py, 1.0);
      g.position.set(x, y, z);
      g.scale.setScalar(Math.tan((camera.fov * D2R) / 2) * 2 * (1080 / 1920) * (k === "mensajes" ? 0.38 : 0.36) / (k === "mensajes" ? 1.25 : 1.0) * s2);
      g.rotation.set(0, Math.sin(t * 1.3 + p[0] * 5) * 0.12, Math.sin(t * 1.7 + p[0]) * 0.03);
    }
  }
  // ---- el abanico: un objeto por servicio, entra en su palabra y se va en el paso 1 ----
  {
    const cort = cortinaPx(t);
    SERVICIOS.forEach((g, i) => {
      const a = i === 0 ? Math.min(T.servicios[0], T.abanico - 0.13) : T.servicios[i], s2 = t < a ? 0 : 0.5 + 0.5 * bk(sg(t, a, a + 0.3)), vuela = eio(sg(t, T.paso1 - 0.32, T.paso1 - 0.06));
      // se van volando hacia arriba (sin achicarse) mientras el 01 ya está entrando
      g.visible = s2 > 0.01 && t < T.paso1 - 0.06;
      if (!g.visible) return;
      const [px, py] = SPOS[i];
      const [x, y, z] = enPx(px, py - vuela * (py + 300), 1.0);
      g.position.set(x, y, z);
      const h = Math.tan((camera.fov * D2R) / 2);
      g.scale.setScalar(((2 * h * 1080) / 1920) * (220 / 1080) * s2);
      const ic = g.userData.ic;
      ic.rotation.y = (ic.userData.ry0 ??= ic.rotation.y) + Math.sin(t * 1.2 + i) * 0.18 + (1 - eo(sg(t, a, a + 0.4))) * 0.5;
      if (ic.userData.engr) ic.userData.engr.rotation.z = t * 2;
      if (ic.userData.gs) { ic.userData.gs[0].rotation.z = t * 1.6; ic.userData.gs[1].rotation.z = -t * 2.2 + 0.3; }
      if (ic.userData.est) ic.userData.est.rotation.z = t * 1.5;
    });
  }
  // ---- las burbujas de Rubén: lo que necesita (paso 1) y el cambio que pide (paso 3) ----
  {
    const k = Math.tan((camera.fov * D2R) / 2) / Math.tan(19 * D2R);
    NECES.forEach((B, i) => {
      const a = T.necesidades[i], s2 = t < a ? 0 : 0.6 + 0.4 * bk(sg(t, a, a + 0.26));
      B.visible = s2 > 0.01 && plano === "rubenCuenta";
      if (!B.visible) return;
      const [x, y, z] = enPx(NPOS[i][0], NPOS[i][1], 1.0);
      B.position.set(x, y, z); B.scale.setScalar(0.165 * s2 * k);
      B.rotation.set(0.08, (i % 2 ? -1 : 1) * 0.12 + Math.sin((t - a) * 1.7) * 0.04, Math.sin((t - a) * 2.2) * 0.012);
    });
    const s2 = t < T.pide ? 0 : 0.6 + 0.4 * bk(sg(t, T.pide, T.pide + 0.26));
    PIDE.visible = s2 > 0.01 && plano === "pide";
    if (PIDE.visible) { const [x, y, z] = enPx(790, 690, 1.0); PIDE.position.set(x, y, z); PIDE.scale.setScalar(0.155 * s2 * k); PIDE.rotation.set(0.08, -0.12 + Math.sin((t - T.pide) * 1.7) * 0.04, 0); }
  }
  // ---- todo junto: la tienda recibe un pedido, el stock baja solo, el chat contesta ----
  {
    const vis = plano === "junto";
    PANPX.forEach(([g, px, py, wpx], i) => {
      // ya están cuando entra el plano (antes había estantes vacíos un rato)
      const a = T.seguimos - 0.08 + i * 0.05, s2 = t < a ? 0 : 0.6 + 0.4 * bk(sg(t, a, a + 0.25));
      g.visible = vis && s2 > 0.01 && cortinaPx(t) < py - 200;
      if (!g.visible) return;
      const [x, y, z] = enPx(px, py, 1.0);
      const h = Math.tan((camera.fov * D2R) / 2);
      const ancho = i === 2 ? 2.0 : 1.0;
      g.position.set(x, y, z); g.scale.setScalar((((2 * h * 1080) / 1920) * (wpx / 1080) / ancho) * s2);
      g.rotation.set(Math.sin(t * 0.9 + i) * 0.03, Math.sin(t * 0.7 + i) * 0.05, 0);
    });
    const ponerTex = (g, tex) => { if (g.userData.m.map !== tex) { g.userData.m.map = tex; g.userData.m.needsUpdate = true; } };
    ponerTex(PAN_T, t >= T.pedido ? JT.t1 : JT.t0);
    ponerTex(PAN_S, t >= T.baja ? JT.s1 : JT.s0);
    ponerTex(PAN_C, t >= T.m2 ? JT.c2 : t >= T.escribe ? JT.c1e : t >= T.m1 ? JT.c1 : JT.c0);
    PAN_T.children[1].scale.setScalar(1);
    const pop = (g, a) => { const b = pulso(t, a, 0.3) * 0.06; g.scale.multiplyScalar(1 + b); };
    if (vis) for (const [g, a] of [[PAN_T, T.pedido], [PAN_S, T.baja], [PAN_C, T.m2]]) if (g.visible) pop(g, a);
  }

  // ---- el recuadro de Rubén en los planos de Sofi ----
  {
    const web = CAM[plano] === "web";
    pip.visible = web && cortinaPx(t) < 440;
    if (web) {
      const h = Math.tan((camera.fov * D2R) / 2);
      const [x, y, z] = enPx(870, 610, 1.0);
      pip.position.set(x, y, z);
      pip.scale.setScalar((2 * h * 360) / 1920 / 0.3125);
      pip.rotation.set(0, 0, 0);
    }
  }

  // ---- la videollamada: primero lo que ve cada cámara web, después la escena ----
  const verNb = plano === "hombro" || plano === "ensena" || (t >= T.paso1 && t < T.paso2 && notebook.visible);
  // el letrero solo se ve en la pantalla de la notebook: en los primeros planos de Sofi quedaba cortado contra el borde
  if (verNb && t >= T.conecta) { CARTEL.forEach((o) => (o.visible = true)); renderer.setRenderTarget(rtSofi); renderer.render(scene, camSofi); }
  CARTEL.forEach((o) => (o.visible = !!window.__portada));
  if (CAM[plano] === "web") { const nv = notebook.visible; notebook.visible = false; renderer.setRenderTarget(rtRuben); renderer.render(scene, camRuben); notebook.visible = nv; }
  renderer.setRenderTarget(null);
  if (window.__sofitest) {
    sofi.raiz.visible = false;
    for (const o of [pip, franja, ...NUMEROS, ...SERVICIOS, ...BG, ...TAGS.map((x) => x[0])]) o.visible = false;
    const XS = [SX - 0.8, SX, SX + 0.8];
    SOFIS.forEach((p, i) => p.poner({ x: XS[i], z: 0, giro: 0, ...teclado, ...miraWeb, ...CARA.sonrisa, t: 0.5 + i }));
    const k = Math.floor(t);
    if (k === 0) { camera.position.set(SX, 1.3, 5.6); camera.fov = 40; camera.updateProjectionMatrix(); camera.lookAt(SX, 1.15, 0); }
    else if (k <= 3) { const x = XS[k - 1]; camera.position.set(x, 1.38, 2.3); camera.fov = 32; camera.updateProjectionMatrix(); camera.lookAt(x, 1.26, 0); }
    else { const x = XS[(k - 4) % 3]; camera.position.set(x + 1.1, 1.5, 1.2); camera.fov = 32; camera.updateProjectionMatrix(); camera.lookAt(x, 1.3, 0); }
  }
  if (window.__portada) {
    // fondo de la portada: la notebook con Sofi saludando, entera, sin la cabeza de Rubén adelante
    ruben.raiz.visible = false; mate.visible = false;
    camera.position.set(0.32, 1.42, -2.9); camera.fov = 31; camera.updateProjectionMatrix(); camera.lookAt(0.15, 0.97, -0.95);
    for (const o of [pip, franja, celu, vib, ...NUMEROS, ...SERVICIOS, ...TAGS.map((x) => x[0])]) o.visible = false;
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
