// Capa 3D de mesa-doce (Three.js r170 local). Base técnica: reels/pasame-precio y reels/abren-hoy.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek); azar solo con semilla.
// Una pizzería de barrio de Montevideo, la mesa 12, Rubén (cliente de siempre) en primera persona y en tercera,
// Tito el dueño, Toby el perro, la pizzería nueva de enfrente. Parte 2: la misma pizzería con la tarjeta de puntos.
// Sin marcas reales: la app de puntos y el panel son genéricos, en navy, crema y verde de Scalerics.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { crearPersonaje, ELENCO, MARCA, PIEL, poseEn, CARA, BRAZOS, crearTablet } from "./personajes.js";
import { T, L, DUR, BOCAS, LIMPIO } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

// ---------- utilidades ----------
const PI = Math.PI;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
const en = (t, a, b) => t >= a && t < b;
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.setClearColor(0x0b1220, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(48, 1080 / 1920, 0.02, 80);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x1a1410);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, PI / 2.4, 0xffe2b8, 2.0);
  tira(1.4, 8, 6, 1, -1, -PI / 2.2, 0xffd6a0, 1.4);
  tira(10, 1.2, 0, 7, 0, 0, 0xfff1dc, 1.1);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.55;

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, maderaO: 0x6e4a2e, mostaza: 0xd9a441, ladrillo: 0xb5643f };
const HEX = { navy: "#0b1220", navy2: "#16243d", navy3: "#1f3254", edge: "#2c4268", cr: "#efeee5", cr2: "#d9d7c9", g: "#5ce611", gd: "#3fa60a", red: "#c7655b", mostaza: "#d9a441" };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = { g: mat(C.g, 0.5), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.65), navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), red: mat(C.red, 0.55), madera: mat(C.madera, 0.55), maderaO: mat(C.maderaO, 0.6), mostaza: mat(C.mostaza, 0.5), metal: mat(0xc9ccd2, 0.3, { metalness: 0.7 }), negro: mat(0x1c1a18, 0.6) };
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const FM = (w, s) => `${w} ${s}px "IBM Plex Mono", monospace`;
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const sinSombra = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } }); return g; };
let semilla = 7;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const sombrear = (g, recibe = true) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = recibe; } }); return g; };

// ================= LUCES =================
const llave = new THREE.DirectionalLight(0xffe6c8, 1.5);
llave.castShadow = true; llave.shadow.mapSize.set(2048, 2048);
Object.assign(llave.shadow.camera, { left: -4.5, right: 4.5, top: 4.5, bottom: -4.5, near: 1, far: 20 });
llave.shadow.bias = -0.0006; llave.shadow.radius = 4;
llave.position.set(2.5, 7, 3.5); llave.target.position.set(0, 0.5, -1); scene.add(llave, llave.target);
const cielo = new THREE.HemisphereLight(0xfff0dc, 0x3a2a20, 0.8); scene.add(cielo);
const rim = new THREE.DirectionalLight(0x9cc4ff, 0.5); rim.position.set(-6, 3, -2); scene.add(rim);
const lamp12 = new THREE.PointLight(0xffc878, 3.6, 4.5, 1.6); lamp12.position.set(0, 2.05, 0); scene.add(lamp12);
const lampG = new THREE.PointLight(0xffc878, 4, 4, 1.6); lampG.position.set(2.05, 2.05, -1.5); scene.add(lampG);
const lampM = new THREE.PointLight(0xffd8a0, 5, 5, 1.6); lampM.position.set(0.4, 2.3, -3.1); scene.add(lampM);
const horno = new THREE.PointLight(0xff7a2a, 5, 4, 1.8); horno.position.set(2.45, 0.85, -4.2); scene.add(horno);
const luzVela = new THREE.PointLight(0xffb060, 0, 1.4, 1.8); scene.add(luzVela);
const luzCalle = new THREE.PointLight(0xffd59a, 14, 9, 1.5); luzCalle.position.set(-9.2, 3.1, -0.4); scene.add(luzCalle);

// ================= LA PIZZERÍA =================
const MESA = { y: 0.74 };
{
  // piso de madera
  const tablas = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#9a6a40" : "#8a5c36"; x.fillRect(0, i * 64, 512, 64); x.fillStyle = "rgba(50,28,12,0.4)"; x.fillRect(0, i * 64, 512, 4); x.fillRect((i * 173) % 512, i * 64, 4, 64); x.fillRect((i * 291 + 200) % 512, i * 64, 4, 64); } });
  tablas.wrapS = tablas.wrapT = THREE.RepeatWrapping; tablas.repeat.set(5, 5);
  const piso = mesh(new THREE.PlaneGeometry(7, 8.6), new THREE.MeshStandardMaterial({ map: tablas, roughness: 0.55 }), 0.2, 0, -1.2); piso.rotation.x = -PI / 2; scene.add(piso);
  // paredes: arriba crema cálido, abajo azulejo navy con filete verde
  const azul = lienzo(256, 256, (x) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, 256, 256); x.strokeStyle = "#16243d"; x.lineWidth = 6; for (let i = 0; i <= 256; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 256); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(256, i); x.stroke(); } });
  azul.wrapS = azul.wrapT = THREE.RepeatWrapping;
  const pared = mat(0xeadcc2, 0.85);
  // fondo (z = -5.4)
  scene.add(mesh(new THREE.BoxGeometry(7, 3.4, 0.1), pared, 0.2, 1.7, -5.45));
  const zocalo = (w, d, x, z, ry) => {
    const t = azul.clone(); t.repeat.set(w * 3, 3); t.needsUpdate = true;
    const m = mesh(new THREE.BoxGeometry(w, 1.0, d), new THREE.MeshStandardMaterial({ map: t, roughness: 0.35 }), x, 0.5, z); m.rotation.y = ry; scene.add(m);
    const f = mesh(new THREE.BoxGeometry(w, 0.05, d + 0.02), M.g, x, 1.02, z); f.rotation.y = ry; scene.add(f);
  };
  zocalo(7, 0.12, 0.2, -5.38, 0);
  // derecha (x = 3.6)
  scene.add(mesh(new THREE.BoxGeometry(0.1, 3.4, 8.6), pared, 3.65, 1.7, -1.2)); zocalo(8.6, 0.12, 3.58, -1.2, PI / 2);
  // atrás de Rubén (z = 3.0), con la puerta
  scene.add(mesh(new THREE.BoxGeometry(7, 3.4, 0.1), pared, 0.2, 1.7, 3.05)); zocalo(7, 0.12, 0.2, 2.98, 0);
  { const pu = mesh(rbox(1.0, 2.2, 0.08, 0.02), M.navy2, -1.6, 1.1, 2.97); scene.add(pu); const vi = mesh(new THREE.PlaneGeometry(0.7, 1.2), new THREE.MeshStandardMaterial({ color: 0x0e1a30, emissive: 0x16243d, emissiveIntensity: 0.6, roughness: 0.1 }), -1.6, 1.4, 2.925); vi.rotation.y = PI; scene.add(vi); scene.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), M.metal, -1.22, 1.05, 2.92)); }
  // izquierda (x = -3.2): pared con la vidriera (z -1.9..1.5, y 0.85..2.65)
  const VZ0 = -1.9, VZ1 = 1.5, VY0 = 0.85, VY1 = 2.65;
  scene.add(mesh(new THREE.BoxGeometry(0.12, 3.4, -5.45 - VZ0 + 0.1), pared, -3.25, 1.7, (-5.45 + VZ0) / 2));
  scene.add(mesh(new THREE.BoxGeometry(0.12, 3.4, 3.05 - VZ1), pared, -3.25, 1.7, (3.05 + VZ1) / 2));
  scene.add(mesh(new THREE.BoxGeometry(0.12, VY0, VZ1 - VZ0), pared, -3.25, VY0 / 2, (VZ0 + VZ1) / 2));
  scene.add(mesh(new THREE.BoxGeometry(0.12, 3.4 - VY1, VZ1 - VZ0), pared, -3.25, (3.4 + VY1) / 2, (VZ0 + VZ1) / 2));
  zocalo(-5.45 - VZ0 + 0.1, 0.13, -3.18, (-5.45 + VZ0) / 2, PI / 2); zocalo(3.05 - VZ1, 0.13, -3.18, (3.05 + VZ1) / 2, PI / 2);
  { const t = azul.clone(); t.repeat.set(10, 2.5); t.needsUpdate = true; const z = mesh(new THREE.BoxGeometry(0.13, VY0, VZ1 - VZ0), new THREE.MeshStandardMaterial({ map: t, roughness: 0.35 }), -3.18, VY0 / 2, (VZ0 + VZ1) / 2); scene.add(z); }
  // marco y parantes de la vidriera
  for (const [y, h] of [[VY0, 0.07], [VY1, 0.07]]) scene.add(mesh(rbox(0.14, h, VZ1 - VZ0 + 0.06, 0.01), M.cr, -3.2, y, (VZ0 + VZ1) / 2));
  for (const z of [VZ0, (VZ0 + VZ1) / 2, VZ1]) scene.add(mesh(rbox(0.14, VY1 - VY0, 0.07, 0.01), M.cr, -3.2, (VY0 + VY1) / 2, z));
  // vidrio con el vinilo "PIZZERÍA TITO" (desde adentro se lee al revés)
  const vinilo = lienzo(1024, 512, (x, w, h) => { x.clearRect(0, 0, w, h); x.save(); x.translate(w, 0); x.scale(-1, 1); x.fillStyle = "rgba(239,238,229,0.75)"; x.textAlign = "center"; x.font = F(900, 64); x.fillText("PIZZERÍA TITO", w / 2, 440); x.font = F(700, 34); x.fillText("muzza · fainá · al tacho", w / 2, 490); x.restore(); });
  
  const reflejo = new THREE.Mesh(new THREE.PlaneGeometry(VZ1 - VZ0, VY1 - VY0), new THREE.MeshBasicMaterial({ color: 0xbfd2ff, transparent: true, opacity: 0.06, depthWrite: false }));
  reflejo.position.set(-3.19, (VY0 + VY1) / 2, (VZ0 + VZ1) / 2); reflejo.rotation.y = PI / 2; scene.add(reflejo);
  // techo de madera oscura con vigas
  scene.add(mesh(new THREE.BoxGeometry(7, 0.1, 8.6), mat(0x4a3322, 0.8), 0.2, 3.4, -1.2));
  for (let z = -5; z < 3; z += 1.3) scene.add(mesh(new THREE.BoxGeometry(7, 0.16, 0.18), mat(0x5c4029, 0.7), 0.2, 3.28, z));
  // pizarra del menú en el fondo
  const menu = lienzo(1024, 640, (x, w, h) => {
    x.fillStyle = "#1f2a24"; x.fillRect(0, 0, w, h); x.strokeStyle = "#9b6a43"; x.lineWidth = 30; x.strokeRect(15, 15, w - 30, h - 30);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 80); x.fillText("HOY", w / 2, 120);
    x.textAlign = "left"; x.font = F(700, 60);
    [["Muzza", "$ 390"], ["Fugazzeta", "$ 450"], ["Fainá", "$ 90"], ["Calzone", "$ 420"]].forEach(([a, b], i) => { x.fillStyle = "#efeee5"; x.fillText(a, 90, 230 + i * 100); x.textAlign = "right"; x.fillStyle = "#d9a441"; x.fillText(b, w - 90, 230 + i * 100); x.textAlign = "left"; });
  });
  const pz = mesh(new THREE.PlaneGeometry(1.7, 1.06), new THREE.MeshStandardMaterial({ map: menu, roughness: 0.85 }), -0.55, 2.3, -5.38); scene.add(pz);
  // cuadros: un póster de pizza a la derecha
  const poster = lienzo(320, 420, (x, w, h) => { x.fillStyle = "#d9a441"; x.fillRect(0, 0, w, h); x.fillStyle = "#c98a3c"; x.beginPath(); x.arc(160, 200, 120, 0, 7); x.fill(); x.fillStyle = "#f3d77e"; x.beginPath(); x.arc(160, 200, 100, 0, 7); x.fill(); x.fillStyle = "#4f6b22"; for (const [a, b] of [[120, 160], [200, 180], [150, 250], [210, 240], [130, 210]]) { x.beginPath(); x.arc(a, b, 11, 0, 7); x.fill(); } x.fillStyle = "#0b1220"; x.font = F(900, 48); x.textAlign = "center"; x.fillText("DESDE 1998", 160, 380); });
  scene.add(mesh(rbox(0.66, 0.84, 0.04, 0.01), M.navy2, 3.58, 1.95, -2.6).rotateY(-PI / 2));
  { const p = mesh(new THREE.PlaneGeometry(0.56, 0.74), new THREE.MeshStandardMaterial({ map: poster, roughness: 0.8 }), 3.555, 1.95, -2.6); p.rotation.y = -PI / 2; scene.add(p); }
  // póster en la pared de atrás (se ve en el contraplano)
  { scene.add(mesh(rbox(0.7, 0.9, 0.04, 0.01), M.navy2, 0.6, 1.95, 2.98)); const p = mesh(new THREE.PlaneGeometry(0.6, 0.8), new THREE.MeshStandardMaterial({ map: poster, roughness: 0.8 }), 0.6, 1.95, 2.955); p.rotation.y = PI; scene.add(p); }
}

// ---------- lámparas colgantes (cono mostaza con bombita) ----------
function lampara(x, z, y = 2.15) {
  const g = new THREE.Group(); g.position.set(x, y, z);
  g.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 3.4 - y, 6), M.negro, 0, (3.4 - y) / 2, 0));
  const cono = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.24, 0.22, 24, 1, true), mat(C.mostaza, 0.45, { side: THREE.DoubleSide })); g.add(cono);
  g.add(new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 10), new THREE.MeshBasicMaterial({ color: 0xfff1c8 })).translateY(-0.08));
  scene.add(sinSombra(g));
}
lampara(0, 0); lampara(2.05, -1.5); lampara(2.15, 1.3); lampara(-0.4, -3.0, 2.35); lampara(1.2, -3.0, 2.35);

// ---------- el mostrador, la caja y el horno ----------
const MOST = { x: 0.4, z: -3.3, y: 1.0 };
{
  const frente = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#d9d7c9"; x.lineWidth = 5; for (let i = 0; i <= w; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); } for (let j = 0; j <= h; j += 64) { x.beginPath(); x.moveTo(0, j); x.lineTo(w, j); x.stroke(); } x.fillStyle = "#5ce611"; x.fillRect(0, 190, w, 18); });
  frente.wrapS = THREE.RepeatWrapping; frente.repeat.set(2.5, 1);
  const cuerpo = mesh(rbox(3.0, 0.96, 0.62, 0.02), [M.cr, M.cr, M.cr, M.cr, new THREE.MeshStandardMaterial({ map: frente, roughness: 0.4 }), M.cr], MOST.x, 0.48, MOST.z); scene.add(cuerpo);
  scene.add(mesh(rbox(3.12, 0.06, 0.74, 0.02), M.maderaO, MOST.x, MOST.y - 0.01, MOST.z));
  // vitrina con porciones a la izquierda
  const vit = new THREE.Group(); vit.position.set(-0.6, MOST.y + 0.02, MOST.z); scene.add(vit);
  vit.add(mesh(rbox(0.8, 0.04, 0.5, 0.01), M.navy2, 0, 0.02, 0));
  const vidrioV = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.34, 0.5), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.18, roughness: 0.05, depthWrite: false })); vidrioV.position.y = 0.21; vit.add(vidrioV);
  // la caja registradora a la derecha
  const caja = new THREE.Group(); caja.position.set(1.55, MOST.y + 0.02, MOST.z - 0.05); scene.add(caja);
  caja.add(mesh(rbox(0.38, 0.14, 0.32, 0.02), M.navy3, 0, 0.07, 0)); { const s = mesh(rbox(0.3, 0.16, 0.03, 0.01), M.navy, 0, 0.26, -0.08); s.rotation.x = -0.4; caja.add(s); }
  // pila de cajas de pizza
  for (let i = 0; i < 4; i++) { const b = mesh(rbox(0.42, 0.05, 0.42, 0.006), mat(i % 2 ? 0xd9c29a : 0xcfb58a, 0.9), 2.35, MOST.y + 0.03 + i * 0.052, MOST.z + 0.02); b.rotation.y = 0.08 * (i % 3 - 1); scene.add(b); }
  // horno de barro (ladrillo, boca con brasas)
  const H = new THREE.Group(); H.position.set(2.55, 0, -4.75); H.rotation.y = -0.5; scene.add(H);
  const lad = lienzo(256, 256, (x) => { x.fillStyle = "#8a4a2e"; x.fillRect(0, 0, 256, 256); for (let j = 0; j < 8; j++) for (let i = 0; i < 4; i++) { x.fillStyle = (i + j) % 3 ? "#b5643f" : "#a5573a"; x.fillRect(i * 64 + (j % 2) * 32 + 3, j * 32 + 3, 58, 26); } });
  lad.wrapS = lad.wrapT = THREE.RepeatWrapping; lad.repeat.set(3, 2);
  const mLad = new THREE.MeshStandardMaterial({ map: lad, roughness: 0.85 });
  H.add(mesh(rbox(1.5, 0.9, 1.3, 0.04), mLad, 0, 0.45, 0));
  const domo = mesh(new THREE.SphereGeometry(0.72, 28, 16, 0, PI * 2, 0, PI / 2), mat(0xc77a52, 0.9), 0, 0.9, 0); domo.scale.set(1, 0.75, 0.85); H.add(domo);
  const boca = new THREE.Mesh(new THREE.CircleGeometry(0.26, 24, 0, PI), new THREE.MeshBasicMaterial({ color: 0x1a0a04 })); boca.position.set(0, 0.92, 0.615); H.add(boca);
  const brasaM = new THREE.MeshStandardMaterial({ color: 0xff7a2a, emissive: 0xff5a12, emissiveIntensity: 2.2, roughness: 0.6 });
  semilla = 41;
  for (let i = 0; i < 9; i++) H.add(mesh(new THREE.IcosahedronGeometry(0.035 + azar() * 0.02, 0), brasaM, (azar() - 0.5) * 0.36, 0.94, 0.5 + azar() * 0.08));
  H.userData.llamas = [];
  for (let i = 0; i < 4; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 8), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffb347 : 0xff7a2a })); f.position.set(-0.12 + i * 0.08, 1.0, 0.52); H.add(f); H.userData.llamas.push(f); }
  scene.userData.horno = H;
  // la pala de pizza apoyada
  const pala = new THREE.Group(); pala.position.set(1.85, 0, -4.95); pala.rotation.set(0.18, 0.3, 0.02); scene.add(pala);
  pala.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.5, 8), M.madera, 0, 1.15, 0)); pala.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.01, 24), M.metal, 0, 0.3, 0).rotateX(PI / 2));
}

// ---------- mesas, sillas, manteles ----------
const mantelTex = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } x.fillStyle = "rgba(239,238,229,0.35)"; for (let i = 0; i < 8; i++) { x.fillRect(i * 64, 0, 64, 512); } });
function mesaCon(x, z, ancho = 0.82) {
  const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
  g.add(mesh(rbox(ancho, 0.04, ancho, 0.01), M.maderaO, 0, MESA.y - 0.03, 0));
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) g.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, MESA.y - 0.05, 8), M.maderaO, dx * (ancho / 2 - 0.06), (MESA.y - 0.05) / 2, dz * (ancho / 2 - 0.06)));
  const t = mantelTex.clone(); t.needsUpdate = true;
  const mm = new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 });
  const top = mesh(new THREE.BoxGeometry(ancho + 0.04, 0.012, ancho + 0.04), mm, 0, MESA.y, 0); g.add(top);
  for (const [dx, dz, w, d] of [[0, -1, ancho + 0.04, 0.01], [0, 1, ancho + 0.04, 0.01], [-1, 0, 0.01, ancho + 0.04], [1, 0, 0.01, ancho + 0.04]]) g.add(mesh(new THREE.BoxGeometry(w, 0.2, d), mm, dx * (ancho / 2 + 0.02), MESA.y - 0.1, dz * (ancho / 2 + 0.02)));
  return g;
}
function silla(x, z, ry) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
  g.add(mesh(rbox(0.42, 0.04, 0.42, 0.01), M.madera, 0, 0.45, 0));
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) g.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.45, 8), M.madera, dx * 0.18, 0.225, dz * 0.18));
  for (const dx of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.5, 8), M.madera, dx * 0.18, 0.7, -0.19));
  g.add(mesh(rbox(0.42, 0.14, 0.03, 0.01), M.g, 0, 0.88, -0.19));
  return g;
}
const mesa12 = mesaCon(0, 0);
const sillaR = silla(0, 0.62, PI); // la de Rubén (mira hacia el mostrador)
mesaCon(2.05, -1.5); silla(2.62, -1.5, -PI / 2);
mesaCon(2.15, 1.3); silla(2.72, 1.3, -PI / 2); silla(1.58, 1.3, PI / 2);
mesaCon(-2.3, -0.4, 0.7); silla(-2.3, 0.15, PI); silla(-2.3, -0.95, 0);
mesaCon(-1.0, 1.9, 0.7); silla(-1.0, 2.42, PI);
// el número de la mesa
const numero = new THREE.Group(); numero.position.set(0.3, MESA.y + 0.006, -0.12); numero.rotation.y = -0.5; mesa12.add(numero);
{
  const tex = lienzo(256, 256, (x) => { x.fillStyle = HEX.navy; x.fillRect(0, 0, 256, 256); x.fillStyle = HEX.cr; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 170); x.fillText("12", 128, 140); });
  numero.add(mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.012, 16), M.metal, 0, 0.006, 0));
  numero.add(mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.06, 6), M.metal, 0, 0.04, 0));
  const pl = mesh(rbox(0.11, 0.11, 0.008, 0.01), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 }), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 })], 0, 0.125, 0); numero.add(pl);
}
// servilletero y aceitera
{ const s = new THREE.Group(); s.position.set(-0.31, MESA.y + 0.006, -0.3); mesa12.add(s); s.add(mesh(rbox(0.12, 0.09, 0.06, 0.01), M.metal, 0, 0.045, 0)); for (let i = 0; i < 4; i++) s.add(mesh(new THREE.BoxGeometry(0.1, 0.08, 0.004), M.cr, 0, 0.07, -0.015 + i * 0.01)); }
// el vaso (refresco genérico)
const vaso = new THREE.Group(); vaso.position.set(-0.36, MESA.y + 0.006, 0.1); mesa12.add(vaso);
{ const vv = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.032, 0.13, 20, 1, true), new THREE.MeshStandardMaterial({ color: 0xe8f2ff, transparent: true, opacity: 0.35, roughness: 0.05, side: THREE.DoubleSide })); vv.position.y = 0.065; vaso.add(vv); vaso.add(mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.1, 20), mat(0x5a2c14, 0.2, { transparent: true, opacity: 0.85 }), 0, 0.052, 0)); }

// ================= LA PIZZA =================
function sector(r0, r1, a0, a1, h, bevel = 0.004) {
  const s = new THREE.Shape();
  if (r0 <= 0) { s.moveTo(0, 0); s.lineTo(r1 * Math.cos(a0), r1 * Math.sin(a0)); s.absarc(0, 0, r1, a0, a1, false); s.lineTo(0, 0); }
  else { s.moveTo(r0 * Math.cos(a0), r0 * Math.sin(a0)); s.lineTo(r1 * Math.cos(a0), r1 * Math.sin(a0)); s.absarc(0, 0, r1, a0, a1, false); s.lineTo(r0 * Math.cos(a1), r0 * Math.sin(a1)); s.absarc(0, 0, r0, a1, a0, true); }
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 10 });
  g.rotateX(-PI / 2);
  return g;
}
const PZ = { masa: mat(0xe2b060, 0.85), borde: mat(0xc7843a, 0.65), queso: mat(0xffc92e, 0.8), dorado: mat(0xe0a64e, 0.5), tomate: mat(0xc9512f, 0.5), aceituna: mat(0x5c7a26, 0.35), hueco: mat(0x2a3a12, 0.5), oregano: mat(0x4f6b22, 0.8) };
// una porción (o un pedazo de porción entre r0 y r1): masa + queso + borde + aceitunas; apunta a +x (el ángulo 0)
function porcion(a0, a1, r0 = 0, r1 = 0.17, conBorde = true, sem = 1) {
  const g = new THREE.Group();
  g.add(mesh(sector(r0, r1, a0, a1, 0.008), PZ.masa));
  const q = mesh(sector(Math.max(0, r0 - 0.001), r1 * 0.9, a0 + 0.012, a1 - 0.012, 0.005, 0.003), PZ.queso); q.position.y = 0.012; g.add(q);
  if (conBorde && r1 > 0.12) { const b = mesh(sector(r1 * 0.88, r1, a0, a1, 0.018, 0.006), PZ.borde); g.add(b); }
  semilla = 97 + sem * 13;
  const am = (a0 + a1) / 2, da = a1 - a0;
  for (let i = 0; i < 4; i++) {
    const rad = lerp(Math.max(r0, 0.03), r1 * 0.82, azar()), ang = am + (azar() - 0.5) * da * 0.6 * Math.min(1, rad / 0.08);
    const d = mesh(new THREE.CylinderGeometry(0.012 + azar() * 0.008, 0.014, 0.003, 10), azar() > 0.5 ? PZ.dorado : PZ.tomate, rad * Math.cos(ang), 0.017, -rad * Math.sin(ang)); g.add(d);
  }
  const rA = lerp(Math.max(r0, 0.04), r1 * 0.75, 0.55);
  if (rA > r0 + 0.01) { const ol = mesh(new THREE.SphereGeometry(0.011, 12, 8), PZ.aceituna, rA * Math.cos(am), 0.02, -rA * Math.sin(am)); ol.scale.set(1, 0.7, 1.25); g.add(ol); }
  for (let i = 0; i < 6; i++) { const rad = lerp(Math.max(r0, 0.02), r1 * 0.85, azar()), ang = am + (azar() - 0.5) * da * 0.7; g.add(mesh(new THREE.BoxGeometry(0.006, 0.002, 0.004), PZ.oregano, rad * Math.cos(ang), 0.0175, -rad * Math.sin(ang))); }
  return sombrear(g);
}
// la pizza entera en su asadera, 8 porciones; `faltan` = índices sacados
function crearPizza(faltan = []) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.2, 0.19, 0.012, 40), M.metal, 0, 0.006, 0));
  g.add(mesh(new THREE.TorusGeometry(0.2, 0.006, 6, 40).rotateX(PI / 2), M.metal, 0, 0.012, 0));
  g.userData.porciones = [];
  for (let i = 0; i < 8; i++) { const p = porcion((i * PI) / 4 + 0.01, ((i + 1) * PI) / 4 - 0.01, 0, 0.175, true, i); p.position.y = 0.013; p.visible = !faltan.includes(i); g.add(p); g.userData.porciones.push(p); }
  return g;
}
const pizza = crearPizza([6, 7]); pizza.position.set(-0.04, MESA.y + 0.006, -0.08); mesa12.add(pizza);
// armamos la porción a mano para que quede clara: borde en x=0, punta en x=+0.175
function porcionMano() {
  const g = new THREE.Group(), a = 0.36, R = 0.175, H = 0.08;
  const base = porcion(-a, a, R - H - 0.002, R, true, 3); // anillo, centrado en el origen, mirando a +x
  base.position.x = R; base.rotation.y = PI; g.add(base); // el borde queda en x≈0, el corte en x = H
  const bis = new THREE.Group(); bis.position.x = H; g.add(bis);
  const punta = porcion(-a, a, 0, R - H, false, 5); punta.position.x = R - H; punta.rotation.y = PI; bis.add(punta);
  g.userData = { bis, largo: R, H };
  return sombrear(g);
}
const porcionR = porcionMano(); scene.add(porcionR);
const hilo = mesh(new THREE.CylinderGeometry(0.0035, 0.0025, 1, 6), PZ.queso); hilo.visible = false; scene.add(hilo);
const _h1 = new THREE.Vector3(), _h2 = new THREE.Vector3();
function caidaPorcion(p, u) {
  // u 0..1: la punta se dobla hacia abajo y cuelga un hilo de queso desde la punta
  p.userData.bis.rotation.z = -u * 1.15;
  hilo.visible = false; // el hilo de queso se leía como una astilla rígida (QA 3)
  if (!hilo.visible) return;
  p.updateMatrixWorld(true);
  p.userData.bis.localToWorld(_h2.set(p.userData.largo - p.userData.H - 0.012, 0.012, 0));
  const largo = 0.02 + (u - 0.3) * 0.12;
  _h1.copy(_h2); _h1.y -= largo / 2;
  hilo.position.copy(_h1); hilo.scale.set(1, largo, 1); hilo.rotation.set(0, 0, 0);
}
// la porción de cumpleaños con la vela, en un plato
const platoCumple = new THREE.Group(); scene.add(platoCumple);
let llamaVela;
{
  platoCumple.add(mesh(new THREE.CylinderGeometry(0.13, 0.1, 0.018, 32), M.cr, 0, 0.009, 0));
  const p = porcion(-0.36, 0.36, 0, 0.175, true, 8); p.position.set(-0.08, 0.018, 0); platoCumple.add(p);
  const vela = new THREE.Group(); vela.position.set(0.0, 0.035, 0); platoCumple.add(vela);
  const rayas = lienzo(64, 128, (x) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? HEX.g : HEX.cr; x.fillRect(0, i * 16, 64, 16); } });
  vela.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.09, 12), new THREE.MeshStandardMaterial({ map: rayas, roughness: 0.5 }), 0, 0.045, 0));
  vela.add(mesh(new THREE.CylinderGeometry(0.0012, 0.0012, 0.012, 4), M.negro, 0, 0.096, 0));
  llamaVela = new THREE.Group(); llamaVela.position.y = 0.11; vela.add(llamaVela);
  const fl = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffc35a })); fl.scale.set(0.75, 1.7, 0.75); llamaVela.add(fl);
  const fi = new THREE.Mesh(new THREE.SphereGeometry(0.006, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfff6d8 })); fi.scale.set(0.8, 1.5, 0.8); fi.position.y = -0.004; llamaVela.add(fi);
  sinSombra(llamaVela);
}

// ---------- el QR de la mesa (parte 2) ----------
function qrCanvas(x, X, Y, S) {
  const n = 25, c = S / n; semilla = 1234;
  x.fillStyle = "#ffffff"; x.fillRect(X, Y, S, S); x.fillStyle = HEX.navy;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const f = (i < 8 && j < 8) || (i > n - 9 && j < 8) || (i < 8 && j > n - 9); if (!f && azar() > 0.52) x.fillRect(X + i * c, Y + j * c, c + 0.5, c + 0.5); }
  for (const [i, j] of [[0, 0], [n - 7, 0], [0, n - 7]]) { x.fillRect(X + i * c, Y + j * c, 7 * c, 7 * c); x.fillStyle = "#fff"; x.fillRect(X + (i + 1) * c, Y + (j + 1) * c, 5 * c, 5 * c); x.fillStyle = HEX.navy; x.fillRect(X + (i + 2) * c, Y + (j + 2) * c, 3 * c, 3 * c); }
}
const qrMesa = new THREE.Group(); qrMesa.position.set(0.13, MESA.y + 0.006, -0.35); mesa12.add(qrMesa);
{
  const tex = lienzo(512, 720, (x, w, h) => {
    x.fillStyle = HEX.navy; x.fillRect(0, 0, w, h); x.fillStyle = HEX.g; x.fillRect(0, 0, w, 16);
    x.fillStyle = HEX.cr; x.textAlign = "center"; x.font = F(900, 66); x.fillText("Sumá puntos", w / 2, 102);
    qrCanvas(x, 86, 140, 340);
    x.fillStyle = HEX.g; x.font = F(900, 78); x.fillText("Mesa 12", w / 2, 600);
  });
  const dorso = lienzo(512, 720, (x, w, h) => { x.fillStyle = HEX.navy; x.fillRect(0, 0, w, h); x.fillStyle = HEX.g; x.fillRect(0, h - 16, w, 16); x.fillStyle = HEX.cr; x.textAlign = "center"; x.font = F(900, 150); x.fillText("12", w / 2, 330); x.fillStyle = HEX.g; x.font = F(800, 64); x.fillText("Sumá puntos", w / 2, 470); });
  const placa = mesh(rbox(0.15, 0.21, 0.008, 0.008), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.12 }), new THREE.MeshStandardMaterial({ map: dorso, roughness: 0.4 })], 0, 0.115, 0); placa.rotation.x = -0.18; qrMesa.add(placa);
  qrMesa.add(mesh(rbox(0.16, 0.012, 0.07, 0.004), M.navy, 0, 0.006, 0.0));
}

// ================= LA CALLE Y LA PIZZERÍA DE ENFRENTE =================
{
  const calle = mesh(new THREE.PlaneGeometry(9, 16), mat(0x22252b, 0.9), -8, -0.02, -0.5); calle.rotation.x = -PI / 2; scene.add(calle);
  for (let z = -7; z < 7; z += 1.6) { const l = mesh(new THREE.PlaneGeometry(0.12, 0.8), mat(0xd9d7c9, 0.8), -6.9, -0.01, z); l.rotation.x = -PI / 2; scene.add(l); }
  for (const x of [-4.0, -10.1]) scene.add(mesh(new THREE.BoxGeometry(1.4, 0.14, 16), mat(0x8f8d84, 0.9), x, 0.07, -0.5));
  // la fachada nueva (x = -10.8, mira hacia +x)
  const fach = new THREE.Group(); fach.position.set(-10.8, 0, -0.5); fach.rotation.y = PI / 2; scene.add(fach);
  fach.add(mesh(new THREE.BoxGeometry(7, 4.6, 0.2), mat(0x1f3254, 0.85), 0, 2.3, -0.1));
  // vidriera iluminada por dentro
  const interior = lienzo(1024, 512, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "#ffe2a8"); g.addColorStop(1, "#f0b56a"); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = "rgba(120,70,30,0.35)"; x.fillRect(0, 380, w, 132); for (const X of [180, 520, 820]) { x.fillStyle = "rgba(90,50,25,0.45)"; x.beginPath(); x.arc(X, 300, 46, 0, 7); x.fill(); x.fillRect(X - 50, 340, 100, 172); } });
  fach.add(mesh(new THREE.PlaneGeometry(4.2, 2.0), new THREE.MeshBasicMaterial({ map: interior, toneMapped: false }), -0.4, 1.35, 0.01));
  for (const X of [-2.5, 1.7]) fach.add(mesh(rbox(0.12, 2.1, 0.1, 0.01), M.navy, X, 1.35, 0.03));
  fach.add(mesh(rbox(4.3, 0.12, 0.1, 0.01), M.navy, -0.4, 2.37, 0.03)); fach.add(mesh(rbox(4.3, 0.12, 0.1, 0.01), M.navy, -0.4, 0.33, 0.03));
  // puerta
  fach.add(mesh(rbox(0.9, 2.2, 0.06, 0.01), M.navy3, 2.5, 1.1, 0.02));
  // el cartel
  const cartel = lienzo(1024, 256, (x, w, h) => { x.fillStyle = "#d9a441"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.strokeRect(8, 8, w - 16, h - 16); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 128); x.fillText("LA NUEVA", w / 2, 108); x.font = F(700, 52); x.fillText("PIZZERÍA · ABIERTO", w / 2, 202); });
  fach.add(mesh(rbox(3.0, 0.75, 0.14, 0.03), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: cartel, emissive: 0xffffff, emissiveMap: cartel, emissiveIntensity: 0.55, roughness: 0.5 }), M.navy], -0.75, 2.85, 0.08));
  // los dos carteles en la vidriera (entran con un pop en el push-in)
  const afiche = (txt1, txt2, fondo, tinta, borde) => lienzo(512, 640, (x, w, h) => { x.fillStyle = fondo; x.fillRect(0, 0, w, h); x.strokeStyle = borde; x.lineWidth = 22; x.strokeRect(11, 11, w - 22, h - 22); x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; let fs = 108; x.font = F(900, fs); while (Math.max(x.measureText(txt1).width, x.measureText(txt2).width) > w - 80) { fs -= 4; x.font = F(900, fs); } x.fillText(txt1, w / 2, 250); x.fillText(txt2, w / 2, 250 + fs * 1.15); });
  const af1 = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.44), new THREE.MeshBasicMaterial({ map: afiche("PORCIÓN", "DE REGALO", "#efeee5", "#0b1220", "#d9a441"), toneMapped: false }));
  const af2 = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.44), new THREE.MeshBasicMaterial({ map: afiche("SUMÁ", "PUNTOS", "#0b1220", "#efeee5", "#d9a441"), toneMapped: false }));
  af1.position.set(-1.5, 1.38, 0.06); af2.position.set(0.0, 1.38, 0.06); fach.add(af1, af2);
  scene.userData.afiches = [af1, af2];
  // farol
  const farol = new THREE.Group(); farol.position.set(-9.4, 0, 1.8); scene.add(farol);
  farol.add(mesh(new THREE.CylinderGeometry(0.05, 0.06, 3.4, 8), M.navy, 0, 1.7, 0));
  farol.add(new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffe6b0 })).translateY(3.45));
  // la vereda de enfrente sigue con otras casas oscuras
  for (const [z, w, h, c] of [[-6.4, 4.4, 5.2, 0x2c4268], [5.2, 3.6, 4.4, 0x1f3254]]) { const b = mesh(new THREE.BoxGeometry(0.3, h, w), mat(c, 0.8), -10.9, h / 2, z); scene.add(b); for (let k = 0; k < 2; k++) scene.add(mesh(new THREE.PlaneGeometry(0.8, 0.9), new THREE.MeshBasicMaterial({ color: 0xffd28a }), -10.74, 2.4 + k * 1.3, z - 0.8 + k * 1.4).rotateY(PI / 2)); }
  // el cielo de noche (atrás de todo)
  const cielo = mesh(new THREE.PlaneGeometry(40, 14), new THREE.MeshBasicMaterial({ color: 0x0f1a30 }), -14, 5, -0.5); cielo.rotation.y = PI / 2; scene.add(cielo);
}

// ================= TOBY, EL PERRO DE LA PIZZERÍA =================
const toby = new THREE.Group(); toby.position.set(-1.45, 0, -2.62); toby.rotation.y = 0.5; scene.add(toby);
const tobyCuerpo = new THREE.Group(); toby.add(tobyCuerpo);
{
  toby.add(mesh(new THREE.CylinderGeometry(0.38, 0.4, 0.08, 28), M.navy3, 0, 0.04, 0));
  toby.add(mesh(new THREE.TorusGeometry(0.38, 0.05, 10, 28).rotateX(PI / 2), M.navy3, 0, 0.09, 0));
  const pelo = mat(0xc4884a, 0.8), oscuro = mat(0x7a4a26, 0.8), claro = mat(0xe8c79a, 0.8);
  const c = mesh(new THREE.SphereGeometry(1, 20, 14), pelo, 0, 0.2, 0); c.scale.set(0.26, 0.13, 0.17); tobyCuerpo.add(c);
  const panza = mesh(new THREE.SphereGeometry(1, 16, 12), claro, 0.02, 0.16, 0.05); panza.scale.set(0.2, 0.09, 0.13); tobyCuerpo.add(panza);
  const cab = new THREE.Group(); cab.position.set(0.24, 0.2, 0.06); toby.add(cab); toby.userData.cab = cab;
  const cr = mesh(new THREE.SphereGeometry(0.1, 18, 14), pelo); cr.scale.set(1, 0.85, 0.95); cab.add(cr);
  const hocico = mesh(new THREE.SphereGeometry(0.06, 14, 10), claro, 0.08, -0.025, 0); hocico.scale.set(1.2, 0.8, 0.9); cab.add(hocico);
  cab.add(mesh(new THREE.SphereGeometry(0.02, 10, 8), M.negro, 0.15, -0.012, 0));
  for (const s of [-1, 1]) { const o = mesh(new THREE.SphereGeometry(1, 12, 8), oscuro, -0.02, 0.0, s * 0.085); o.scale.set(0.05, 0.08, 0.02); o.rotation.x = s * 0.4; cab.add(o); toby.userData["oreja" + s] = o; }
  // ojos cerrados (arquitos)
  for (const s of [-1, 1]) { const a = mesh(new THREE.TorusGeometry(0.016, 0.004, 6, 12, PI), M.negro, 0.075, 0.03, s * 0.045); a.rotation.set(0, PI / 2, PI); cab.add(a); }
  for (const s of [-1, 1]) { const p = mesh(new THREE.SphereGeometry(1, 10, 8), pelo, 0.22, 0.09, s * 0.07); p.scale.set(0.09, 0.04, 0.045); toby.add(p); }
  const cola = mesh(new THREE.CapsuleGeometry(0.025, 0.12, 4, 8), pelo, -0.27, 0.16, -0.06); cola.rotation.set(0.6, 0, 1.2); toby.add(cola); toby.userData.cola = cola;
  sombrear(toby);
  // el platito con su nombre
  const plato = new THREE.Group(); plato.position.set(-1.0, 0, -2.78); scene.add(plato);
  plato.add(mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.06, 24), M.g, 0, 0.03, 0));
  plato.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.01, 48), mat(0x2c4268, 0.6), 0, 0.058, 0));
  const nom = lienzo(512, 200, (x, w, h) => { x.fillStyle = HEX.cr; x.fillRect(0, 0, w, h); x.strokeStyle = HEX.navy; x.lineWidth = 16; x.strokeRect(8, 8, w - 16, h - 16); x.fillStyle = HEX.navy; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 120); x.fillText("TOBY", w / 2, 108); });
  // la chapita "TOBY" colgada del frente del mostrador, arriba de la cama
  const ch = mesh(rbox(0.36, 0.14, 0.012, 0.01), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: nom, roughness: 0.6 }), M.navy], -0.95, 0.62, MOST.z + 0.317); scene.add(ch);
}

// ================= LOS PERSONAJES =================
const sentado = (p, y = 0.47) => {
  // las piernas hacia adelante, horizontales, debajo de la mesa (el módulo no tiene pose de sentado)
  p.raiz.traverse((o) => { if (o.isGroup && o.parent && o.parent.parent === p.raiz && Math.abs(o.position.y - p.CADERA) < 1e-4 && Math.abs(Math.abs(o.position.x) - 0.1) < 1e-4) o.rotation.x = -PI / 2 + 0.05; });
  p.raiz.position.y = y - p.CADERA;
};
const CFG_R = { ...ELENCO.ruben, ojoDibujo: true, parpadeoCada: 3.4, dedos: true };
const ruben = crearPersonaje(CFG_R); scene.add(ruben.raiz);
const CFG_T = { nombre: "Tito", piel: PIEL.trigueña, pelo: 0x2a2220, peinado: "jopo", cejasColor: 0x1e1a18, camisa: MARCA.cr, mangas: "cortas",
  delantal: MARCA.navy2, delantalBorde: MARCA.g, pantalon: MARCA.navy, zapatos: 0x2a2220, panza: 1.12, nariz: 0.06, mejillas: 0xc9785e, alto: 1.03, ojoDibujo: true, parpadeoCada: 3.0 };
const tito = crearPersonaje(CFG_T); scene.add(tito.raiz);
const graciela = crearPersonaje({ ...ELENCO.clienta, ojoDibujo: true }); scene.add(graciela.raiz);
const nico = crearPersonaje({ ...ELENCO.empleado, ojoDibujo: true }); scene.add(nico.raiz);
const marta = crearPersonaje({ ...ELENCO.duena }); scene.add(marta.raiz);
for (const p of [ruben, tito, graciela, nico, marta]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
// los de fondo: fijos
graciela.poner({ x: 2.6, z: -1.5, giro: -PI / 2, ...BRAZOS.apoyado, manoD: [-0.2, 0.32, 0.4], cabeza: { giro: -0.2, asiente: 0.25 }, ojos: { y: -0.6 }, boca: { sonrisa: 0.4 } }); sentado(graciela);
const porG = porcion(-0.36, 0.36, 0, 0.17, true, 11); porG.position.set(1.95, MESA.y + 0.02, -1.45); porG.rotation.y = 2.4; scene.add(porG);
const pizzaG = crearPizza([0, 1, 2]); pizzaG.position.set(2.0, MESA.y + 0.006, -1.55); scene.add(pizzaG);
const pizzaN = crearPizza([3]); pizzaN.position.set(2.15, MESA.y + 0.006, 1.3); scene.add(pizzaN);
nico.poner({ x: 2.72, z: 1.3, giro: -PI / 2, ...BRAZOS.apoyado, manoI: [0.2, 0.34, 0.42], cabeza: { giro: 0.25, asiente: 0.2 }, ojos: { x: 0.3, y: -0.5 }, boca: { sonrisa: 0.3 } }); sentado(nico);
marta.poner({ x: -11.6, z: 0.4, giro: PI / 2, ...BRAZOS.costado }); // adentro de la pizzería nueva, de pie
marta.raiz.scale.setScalar(0.95);

// ---------- celular (cuerpo + pantalla canvas) ----------
function crearCelular(w, h, cw, ch) {
  const g = new THREE.Group();
  g.add(mesh(rbox(w, h, 0.012, 0.012), mat(C.navy3, 0.4)));
  const tex = lienzo(cw, ch, (x) => { x.fillStyle = HEX.navy; x.fillRect(0, 0, cw, ch); });
  const pant = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.92, h * 0.94), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
  pant.position.z = 0.0065; g.add(pant);
  g.add(mesh(rbox(w * 0.3, w * 0.3, 0.006, 0.008), mat(C.navy, 0.3), -w * 0.26, h * 0.33, -0.008));
  g.userData = { tex, w: w * 0.92, h: h * 0.94, cw, ch, clave: "" };
  return g;
}
const CW = 640, CH = 1340;
const celu = crearCelular(0.076, 0.158, CW, CH); scene.add(celu);
sinSombra(celu);

// ---------- la app de puntos (genérica, de marca) ----------
const VER = { sello: (x, cx, cy, r, on, nuevo) => {
  x.fillStyle = on ? HEX.g : "#e4e2d6"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  if (!on) { x.strokeStyle = "#c9c6b8"; x.lineWidth = 6; x.setLineDash([10, 9]); x.beginPath(); x.arc(cx, cy, r - 5, 0, 7); x.stroke(); x.setLineDash([]); return; }
  // una porción dibujada
  x.save(); x.translate(cx, cy); x.rotate(-0.3);
  x.fillStyle = HEX.navy; x.beginPath(); x.moveTo(0, r * 0.62); x.lineTo(-r * 0.42, -r * 0.45); x.quadraticCurveTo(0, -r * 0.7, r * 0.42, -r * 0.45); x.closePath(); x.fill();
  x.fillStyle = "#f4d27a"; x.beginPath(); x.moveTo(0, r * 0.45); x.lineTo(-r * 0.3, -r * 0.3); x.quadraticCurveTo(0, -r * 0.48, r * 0.3, -r * 0.3); x.closePath(); x.fill();
  x.fillStyle = "#4f6b22"; x.beginPath(); x.arc(-r * 0.05, -r * 0.1, r * 0.09, 0, 7); x.fill(); x.beginPath(); x.arc(r * 0.08, r * 0.15, r * 0.07, 0, 7); x.fill();
  x.restore();
} };
function pintarApp(tex, est) {
  const x = tex.userData.x, W = CW, H = CH;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (est.modo === "scan") {
    // la cámara del celular viendo la placa QR (un recuadro con el QR y las esquinas)
    x.fillStyle = "#2c2f36"; x.fillRect(0, 0, W, H);
    const gr = x.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, 620); gr.addColorStop(0, "#3b4250"); gr.addColorStop(1, "#1a1d24"); x.fillStyle = gr; x.fillRect(0, 0, W, H);
    x.fillStyle = HEX.navy; rr(x, 110, 330, 420, 600, 20);
    x.fillStyle = HEX.cr; x.textAlign = "center"; x.font = F(900, 46); x.fillText("Sumá puntos", W / 2, 385);
    qrCanvas(x, 150, 420, 340);
    x.fillStyle = HEX.g; x.font = F(800, 40); x.fillText("Mesa 12", W / 2, 810);
    // esquinas del visor
    x.strokeStyle = est.ok ? HEX.g : "#ffffff"; x.lineWidth = 14; x.lineCap = "round";
    const B = [[90, 300], [550, 300], [90, 960], [550, 960]];
    B.forEach(([a, b], i) => { const sx = i % 2 ? -1 : 1, sy = i < 2 ? 1 : -1; x.beginPath(); x.moveTo(a, b + sy * 80); x.lineTo(a, b); x.lineTo(a + sx * 80, b); x.stroke(); });
    if (!est.ok) { x.fillStyle = "rgba(92,230,17,0.85)"; x.fillRect(110, 330 + est.linea * 600, 420, 8); }
    x.fillStyle = "#ffffff"; x.font = F(800, 52); x.fillText("Apuntá al QR", W / 2, 1100);
    x.fillStyle = HEX.navy; x.fillRect(0, 0, W, 110); x.fillStyle = HEX.cr; x.font = F(800, 42); x.fillText("Escanear", W / 2, 60);
    if (est.ok) {
      x.fillStyle = "rgba(11,18,32,0.82)"; x.fillRect(0, 0, W, H);
      x.fillStyle = HEX.g; x.beginPath(); x.arc(W / 2, 560, 130 * est.ok, 0, 7); x.fill();
      x.strokeStyle = HEX.navy; x.lineWidth = 30; x.lineJoin = "round"; x.beginPath(); x.moveTo(W / 2 - 60, 565); x.lineTo(W / 2 - 15, 610); x.lineTo(W / 2 + 70, 510); x.stroke();
      x.fillStyle = HEX.cr; x.font = F(900, 78); x.fillText("¡+1 visita!", W / 2, 790);
    }
    tex.needsUpdate = true; return;
  }
  // la tarjeta
  x.fillStyle = HEX.navy; x.fillRect(0, 0, W, H);
  x.fillStyle = HEX.navy2; x.fillRect(0, 0, W, 200);
  x.fillStyle = HEX.g; x.beginPath(); x.arc(72, 100, 42, 0, 7); x.fill();
  x.fillStyle = HEX.navy; x.font = F(900, 44); x.textAlign = "center"; x.fillText("T", 72, 103);
  x.textAlign = "left"; x.fillStyle = HEX.cr; x.font = F(800, 46); x.fillText("Pizzería Tito", 136, 78);
  x.fillStyle = HEX.g; x.font = F(600, 34); x.fillText("Tu tarjeta de puntos", 136, 128);
  x.fillStyle = HEX.cr; x.font = F(900, 68); x.fillText("Hola, Rubén", 36, 278);
  // la tarjeta crema con los sellos
  x.fillStyle = HEX.cr; rr(x, 24, 340, W - 48, 470, 34);
  x.fillStyle = HEX.navy; x.font = F(800, 40); x.fillText("Visitas", 60, 400);
  x.textAlign = "right"; x.font = F(900, 52); x.fillText(`${est.n} de 10`, W - 60, 400); x.textAlign = "left";
  for (let i = 0; i < 10; i++) { const cx = 92 + (i % 5) * 114, cy = 500 + Math.floor(i / 5) * 118; const r = i === est.n - 1 && est.pop > 0 ? 46 * (1 + 0.35 * est.pop) : 46; VER.sello(x, cx, cy, r, i < est.n); }
  // premio: la barra
  x.fillStyle = HEX.navy; x.font = F(700, 36); x.fillText("Premio: muzza grande gratis", 60, 755);
  x.fillStyle = HEX.navy2; rr(x, 24, 850, W - 48, 210, 30);
  x.fillStyle = HEX.cr; x.font = F(800, 50); x.fillText("Te faltan", 60, 912);
  x.fillStyle = HEX.g; x.font = F(900, 64); x.fillText(`${10 - est.n}`, 300, 912);
  x.fillStyle = HEX.cr; x.font = F(800, 50); x.fillText("visitas", 352, 912);
  x.fillStyle = HEX.navy; rr(x, 60, 975, W - 120, 46, 23);
  x.fillStyle = HEX.g; rr(x, 60, 975, (W - 120) * (est.barra ?? est.n / 10), 46, 23);
  // regalos
  if (est.regalo) {
    x.fillStyle = HEX.g; rr(x, 24, 1090, W - 48, 210, 30);
    x.fillStyle = HEX.navy; x.font = F(900, 50); x.fillText("Regalo de cumple", 60, 1150);
    x.font = F(700, 38); x.fillText("Una porción, lista para vos", 60, 1215);
    x.font = F(900, 40); x.fillText("Canjear  ›", 60, 1268);
  } else {
    x.fillStyle = "#56607a"; x.font = F(600, 34); x.fillText("con Scalerics Puntos", 60, 1290);
  }
  tex.needsUpdate = true;
}
function pantallaCelu(te) {
  const d = celu.userData; let est;
  if (te < T.scan - 0.02) est = { modo: "scan", ok: 0, linea: Math.round((0.5 + 0.5 * Math.sin(te * 5)) * 20) / 20 };
  else if (te < T.scan + 0.75) est = { modo: "scan", ok: Math.round(bk(sg(te, T.scan, T.scan + 0.25)) * 20) / 20 };
  else {
    const pop = Math.round(pulso(te, T.scan + 0.75, 0.4) * 10) / 10;
    const barra = te >= T.planoI ? Math.round(lerp(0.7, 0.8, eo(sg(te, T.faltan - 0.1, T.faltan + 0.4))) * 50) / 50 : 0.8;
    est = { modo: "tarjeta", n: 8, pop, barra, regalo: te >= T.regalo };
  }
  const clave = JSON.stringify(est);
  if (clave !== d.clave) { d.clave = clave; pintarApp(d.tex, est); }
}

// ---------- el panel del dueño (tablet en el mostrador) ----------
const panelTex = lienzo(1024, 720, () => {});
let panelClave = "";
function pintarPanel(est) {
  const x = panelTex.userData.x, W = 1024, H = 720;
  x.fillStyle = HEX.navy; x.fillRect(0, 0, W, H);
  x.fillStyle = HEX.navy2; x.fillRect(0, 0, W, 112);
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = HEX.cr; x.font = F(900, 54); x.fillText("Clientes", 40, 58);
  x.fillStyle = HEX.g; x.font = F(700, 34); x.textAlign = "right"; x.fillText("Pizzería Tito", W - 40, 58); x.textAlign = "left";
  const filas = [
    ["R", "Rubén", "92 visitas", "los viernes", HEX.g, "#efeee5"],
    ["G", "Graciela", "41 visitas", "los martes", "#b7a9c9", "#efeee5"],
    ["L", "Lucía", "hace 21 días", "regalo guardado", HEX.red, HEX.red],
  ];
  filas.forEach(([ini, nom, vis, cuando, col, c2], i) => {
    const y = 140 + i * 188, on = i === 0 && est.fila;
    x.fillStyle = on ? "#22385c" : HEX.navy3; rr(x, 24, y, W - 48, 168, 26);
    if (on) { x.strokeStyle = HEX.g; x.lineWidth = 8; x.beginPath(); x.roundRect(24, y, W - 48, 168, 26); x.stroke(); }
    x.fillStyle = col; x.beginPath(); x.arc(100, y + 84, 50, 0, 7); x.fill();
    x.fillStyle = HEX.navy; x.font = F(900, 52); x.textAlign = "center"; x.fillText(ini, 100, y + 87); x.textAlign = "left";
    x.fillStyle = HEX.cr; x.font = F(800, 52); x.fillText(nom, 178, y + 58);
    x.fillStyle = i === 2 ? HEX.red : "#aab3c5"; x.font = F(700, 40); x.fillText(vis, 178, y + 118);
    // a la derecha: cada cuánto viene, o el regalo guardado
    const chip = cuando, cw = x.measureText(chip).width;
    x.font = F(800, 40); const w2 = x.measureText(chip).width + 56;
    const cOn = i === 0 && est.cada;
    x.fillStyle = i === 2 ? HEX.g : cOn ? HEX.g : HEX.navy2; rr(x, W - 48 - w2, y + 54, w2, 64, 32);
    x.fillStyle = i === 2 || cOn ? HEX.navy : HEX.cr; x.fillText(chip, W - 48 - w2 + 28, y + 88);
  });
  panelTex.needsUpdate = true;
}
const tablet = crearTablet(panelTex, 0.5, 0.35, 0.5); tablet.position.set(0.55, MOST.y + 0.02, MOST.z - 0.08); tablet.rotation.y = PI; scene.add(tablet);
// el cartel "Sumá puntos" del mostrador (parte 2)
const cartelMost = new THREE.Group(); cartelMost.position.set(0.35, 0.5, MOST.z + 0.318); scene.add(cartelMost); cartelMost.visible = false; // (sacado: en el POV quedaba pegado a los subtítulos; alcanza con la placa QR de la mesa)
{
  const tex = lienzo(512, 380, (x, w, h) => { x.fillStyle = HEX.g; x.fillRect(0, 0, w, h); x.fillStyle = HEX.navy; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 84); x.fillText("SUMÁ", w / 2, 110); x.fillText("PUNTOS", w / 2, 210); x.font = F(800, 52); x.fillText("con el QR", w / 2, 312); });
  const pl = mesh(rbox(0.5, 0.37, 0.012, 0.012), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.1 }), M.navy], 0, 0, 0); cartelMost.add(pl);
}

// ---------- el trapo de Tito ----------
const trapo = mesh(rbox(0.16, 0.012, 0.12, 0.005), mat(0xefeee5, 0.95), 0, 0, 0); scene.add(trapo);
{ const r = mesh(new THREE.BoxGeometry(0.16, 0.013, 0.02), M.g, 0, 0.001, 0.035); trapo.add(r); }
// el "+1" 3D que sale del celular
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => { const g = new TextGeometry(s, { font, size, depth, curveSegments: 6, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.03, bevelSegments: 3 }); g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g; };
const masUno = new THREE.Group(); // la fuente no trae "+": la cruz se arma con dos barras
{ const m = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.4, roughness: 0.35 }); masUno.add(mesh(textoGeo("1", 0.05, 0.016), m, 0.02, 0, 0)); masUno.add(mesh(rbox(0.034, 0.011, 0.016, 0.004), m, -0.022, 0, 0)); masUno.add(mesh(rbox(0.011, 0.034, 0.016, 0.004), m, -0.022, 0, 0)); }
sinSombra(masUno); camera.add(masUno); masUno.visible = false;

// ================= LOS BRAZOS DE RUBÉN EN PRIMERA PERSONA =================
// Pegados a la cámara. Cada brazo: antebrazo (piel) con la manga navy arremangada, reloj en la izquierda, mano con dedos.
// Ejes de la mano: +y = de la muñeca a los dedos, +z = el dorso, -z = la palma; el pulgar del lado -x en la derecha.
const PIEL_R = ELENCO.ruben.piel;
function crearBrazoPOV(lado) {
  const s = lado === "D" ? 1 : -1;
  const g = new THREE.Group(), piel = mat(PIEL_R, 0.55), manga = mat(MARCA.navy3, 0.7), puno = mat(MARCA.navy3, 0.75);
  // antebrazo: de la muñeca (origen) hacia -y
  g.add(mesh(new THREE.CylinderGeometry(0.03, 0.038, 0.24, 16), piel, 0, -0.12, 0));
  // manga arremangada (rollo grueso) y la manga que sigue hacia el codo
  const rollo = mesh(new THREE.TorusGeometry(0.047, 0.016, 10, 22), puno, 0, -0.235, 0); rollo.rotation.x = PI / 2; g.add(rollo);
  g.add(mesh(new THREE.CylinderGeometry(0.05, 0.058, 0.3, 16), manga, 0, -0.39, 0));
  if (lado === "I") { // el reloj
    const r = mesh(new THREE.TorusGeometry(0.034, 0.008, 8, 20), mat(0x2a2220, 0.6), 0, -0.035, 0); r.rotation.x = PI / 2; g.add(r);
    const caja = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.01, 18), M.metal, 0, -0.035, 0.035); caja.rotation.x = PI / 2; g.add(caja);
    const es = new THREE.Mesh(new THREE.CircleGeometry(0.014, 18), mat(0xefeee5, 0.3)); es.position.set(0, -0.035, 0.0405); g.add(es);
  }
  const mano = new THREE.Group(); g.add(mano); g.userData.mano = mano;
  const palma = mesh(rbox(0.078, 0.085, 0.032, 0.014), piel, 0, 0.042, 0); mano.add(palma);
  const dedos = [];
  for (let i = 0; i < 4; i++) {
    const largo = [0.04, 0.045, 0.042, 0.034][i];
    const b = new THREE.Group(); b.position.set(s * (0.027 - i * 0.018), 0.085, 0); mano.add(b);
    b.add(mesh(new THREE.CapsuleGeometry(0.0085, largo, 4, 10), piel, 0, largo / 2, 0));
    const b2 = new THREE.Group(); b2.position.y = largo; b.add(b2);
    b2.add(mesh(new THREE.CapsuleGeometry(0.008, largo * 0.8, 4, 10), piel, 0, largo * 0.4, 0));
    const u = mesh(new THREE.SphereGeometry(1, 8, 6), mat(0xf0c4a8, 0.3), 0, largo * 0.72, 0.0065); u.scale.set(0.006, 0.008, 0.002); b2.add(u);
    dedos.push([b, b2]);
  }
  const pul = new THREE.Group(); pul.position.set(-s * 0.035, 0.022, -0.006); mano.add(pul);
  pul.add(mesh(new THREE.CapsuleGeometry(0.0105, 0.032, 4, 10), piel, 0, 0.016, 0));
  const pul2 = new THREE.Group(); pul2.position.y = 0.034; pul.add(pul2);
  pul2.add(mesh(new THREE.CapsuleGeometry(0.0095, 0.026, 4, 10), piel, 0, 0.013, 0));
  sinSombra(g);
  // pose: curl de cada dedo (0 estirado, 1 cerrado), separación, pulgar
  g.userData.poner = ({ curl = [0.2, 0.2, 0.2, 0.2], abre = 0.1, pulgar = [0.5, 0.3, 0.3] } = {}) => {
    dedos.forEach(([b, b2], i) => { const c = curl[i]; b.rotation.set(-c * 1.35, 0, s * (1.5 - i) * abre * 0.25); b2.rotation.set(-c * 1.5, 0, 0); });
    pul.rotation.set(-pulgar[1] * 0.8, 0, -s * (0.5 + pulgar[0] * 0.6)); pul2.rotation.set(-pulgar[2] * 1.0, 0, 0);
  };
  g.userData.poner();
  camera.add(g); g.visible = false;
  return g;
}
const brazoD = crearBrazoPOV("D"), brazoI = crearBrazoPOV("I");
const MANO = {
  porcion: { curl: [0.55, 0.6, 0.65, 0.7], abre: 0.05, pulgar: [0.15, 0.2, 0.15] },
  celular: { curl: [0.62, 0.62, 0.66, 0.7], abre: 0.0, pulgar: [0.0, 0.1, 0.0] },
  toca: { curl: [0.0, 1.0, 1.0, 1.0], abre: 0.0, pulgar: [0.6, 0.6, 0.6] },
  suelta: { curl: [0.18, 0.2, 0.24, 0.28], abre: 0.2, pulgar: [0.6, 0.15, 0.1] },
};
const mezclaMano = (a, b, u) => ({ curl: a.curl.map((v, i) => lerp(v, b.curl[i], u)), abre: lerp(a.abre, b.abre, u), pulgar: a.pulgar.map((v, i) => lerp(v, b.pulgar[i], u)) });
// orientar un objeto (en el espacio de la cámara) con la muñeca en `p`, los dedos hacia `dir` y el dorso hacia `dorso`
const _x = new THREE.Vector3(), _y = new THREE.Vector3(), _z = new THREE.Vector3(), _mm = new THREE.Matrix4();
function orientar(o, p, dir, dorso) {
  _y.copy(dir).normalize(); _z.copy(dorso).addScaledVector(_y, -dorso.dot(_y)).normalize(); _x.crossVectors(_y, _z);
  _mm.makeBasis(_x, _y, _z); o.quaternion.setFromRotationMatrix(_mm); o.position.copy(p);
}

// ================= CÁMARA: los planos =================
// { d: desde, a: [pos, mira, fov], b: [pos, mira, fov] (al final del plano), pov: brazos visibles, mano: 0..1 temblor }
const P = (px, py, pz, mx, my, mz, fov) => ({ p: V(px, py, pz), m: V(mx, my, mz), fov });
const OJO = V(0.0, 1.29, 0.42); // los ojos de Rubén sentado (cabeza de radio 0,3 con centro a 1,29)
const PLANOS = [
  { d: 0, a: P(0.0, 1.3, 0.44, 0.05, 0.98, -1.6, 50), b: P(0.0, 1.29, 0.4, 0.06, 1.02, -1.6, 50), pov: true },             // A
  { d: T.planoA2, a: P(-1.05, 2.05, -2.3, 0.05, 1.0, 0.3, 40), b: P(-0.9, 1.98, -2.0, 0.05, 1.0, 0.3, 38) },                // A2 · general: Rubén en la mesa 12, Tito viene
  { d: T.planoB, a: P(0.0, 1.29, 0.42, 0.25, 1.4, -0.7, 50), b: P(0.0, 1.29, 0.4, 0.25, 1.43, -0.7, 48), pov: true },      // B
  { d: T.planoC, a: P(-0.32, 1.38, -1.1, -0.02, 1.2, 0.5, 36), b: P(-0.28, 1.37, -0.95, -0.02, 1.21, 0.5, 35) },                // C
  { d: T.perro, a: P(-0.72, 1.0, -1.42, -1.12, 0.38, -2.76, 52), b: P(-0.76, 0.95, -1.55, -1.12, 0.38, -2.76, 50) },             // D
  { d: T.planoE1, a: P(2.0, 1.78, 0.95, -3.2, 1.8, 0.5, 30), b: P(1.88, 1.76, 0.93, -3.2, 1.82, 0.48, 27) },             // E1
  { d: T.planoE2, a: P(-2.78, 1.6, 0.4, -10.8, 1.95, 0.3, 42), b: P(-2.83, 1.62, 0.4, -10.8, 1.9, 0.3, 39) },        // E2
  { d: T.planoF, a: P(1.95, 1.75, 2.15, -0.3, 0.95, -0.15, 42), b: P(1.75, 1.72, 2.3, -0.3, 0.95, -0.15, 40) },            // F
  { d: T.rebobina, rew: true },                                                                                               // rebobina
  { d: T.planoG, a: P(0.0, 1.29, 0.42, 0.0, 0.84, -0.55, 50), b: P(0.0, 1.29, 0.4, 0.0, 0.85, -0.55, 50), pov: true },        // G
  { d: T.planoH, a: P(0.0, 1.29, 0.42, 0.0, 0.9, -0.45, 50), b: P(0.0, 1.29, 0.4, 0.0, 0.9, -0.45, 50), pov: true },       // H
  { d: T.planoI, a: P(0.0, 1.29, 0.42, 0.0, 0.94, -0.6, 46), b: P(0.0, 1.29, 0.4, 0.0, 0.94, -0.6, 45), pov: true },         // I
  { d: T.planoJ1, a: P(0.0, 1.29, 0.42, 0.62, 1.3, -0.9, 50), b: P(0.0, 1.29, 0.4, 0.4, 1.2, -0.8, 49), pov: true },
  { d: T.planoJ1b, a: P(0.0, 1.27, 0.36, 0.2, 0.84, 0.0, 44), b: P(0.0, 1.25, 0.3, 0.2, 0.82, 0.02, 40), pov: true },        // J1
  { d: T.planoJ2, a: P(-0.1, 1.44, -1.05, 0.05, 1.0, 0.4, 48), b: P(-0.09, 1.43, -0.92, 0.05, 1.0, 0.4, 47) },                // J2
  { d: T.planoK, a: P(0.5, 1.82, -4.95, 0.55, 1.3, -3.4, 30), b: P(0.5, 1.78, -4.82, 0.55, 1.3, -3.4, 27) },             // K
  { d: T.planoL, a: P(1.3, 1.85, -4.5, 0.0, 1.22, 0.55, 22), b: P(1.26, 1.83, -4.35, 0.0, 1.22, 0.55, 20) },                     // L
  { d: T.planoM, a: P(0.3, 1.42, -1.2, 0.0, 1.28, 0.5, 42), b: P(0.26, 1.41, -1.05, 0.0, 1.28, 0.5, 41) },              // M
];
const _m = new THREE.Vector3(), _p = new THREE.Vector3();
let plano = PLANOS[0], pIdx = 0;
function elegirPlano(t) { let i = 0; while (i + 1 < PLANOS.length && PLANOS[i + 1].d <= t) i++; pIdx = i; plano = PLANOS[i]; return i; }
const hastaPlano = (i) => (i + 1 < PLANOS.length ? PLANOS[i + 1].d : DUR);
function ponerCamara(t) {
  let A, B, u;
  if (plano.rew) {
    // rebobina: de la mesa vacía (el final de F) a los ojos de Rubén (el arranque de G), rápido y con un giro
    const f = PLANOS[pIdx - 1], g = PLANOS[pIdx + 1];
    A = f.b; B = g.a; u = eio(sg(t, plano.d, hastaPlano(pIdx)));
    _p.lerpVectors(A.p, B.p, u); _p.y += Math.sin(u * PI) * 0.5; _m.lerpVectors(A.m, B.m, u);
    camera.position.copy(_p); camera.fov = lerp(A.fov, B.fov, u); camera.up.set(Math.sin(u * PI) * 0.25, 1, 0).normalize();
    camera.updateProjectionMatrix(); camera.lookAt(_m); return;
  }
  A = plano.a; B = plano.b; u = sg(t, plano.d, hastaPlano(pIdx)); u = u * (1.5 - 0.5 * u); // arranca con un poco de envión y frena suave
  _p.lerpVectors(A.p, B.p, u); _m.lerpVectors(A.m, B.m, u);
  // cámara en mano, suave (en los POV un poco más: es la cabeza de Rubén)
  const k = plano.pov ? 1.6 : 1;
  _p.x += Math.sin(t * 0.9) * 0.006 * k; _p.y += Math.sin(t * 0.67 + 1) * 0.005 * k;
  _m.x += Math.sin(t * 0.53) * 0.01 * k;
  camera.position.copy(_p); camera.up.set(0, 1, 0); camera.fov = lerp(A.fov, B.fov, u); camera.updateProjectionMatrix(); camera.lookAt(_m);
}

// ================= POSES =================
// Rubén, sentado en la mesa 12 mirando al mostrador (giro PI). Espacio del cuerpo: +z adelante, +x su izquierda.
const R0 = { x: 0, z: 0.66, giro: PI, inclina: 0.06 };
const manosMesa = { manoI: [0.32, 0.29, 0.4], manoD: [-0.32, 0.29, 0.4], codoI: [0.8, -0.6, -0.3], codoD: [-0.8, -0.6, -0.3], dedoI: 0, dedoD: 0 };
const conPorcion = { manoI: [0.24, 0.29, 0.46], manoD: [0.02, 0.5, 0.48], codoI: [0.8, -0.6, -0.3], codoD: [-0.9, -0.6, -0.1], dedoI: 0, dedoD: 0 };
const RK = [
  [0, { ...R0, ...conPorcion, cabeza: { giro: 0, asiente: 0.12, ladea: 0 }, ojos: { x: 0, y: 0.1, abiertos: 1 }, cejas: { alto: 0.3, ang: 0.1 }, boca: { sonrisa: 0.2, ancho: 0.9 } }],
  // C · "Noventa visitas.": mira a Tito (fuera de cuadro) con cara de piedra; la porción se le cae
  [T.planoC, { ...R0, ...conPorcion, cabeza: { giro: -0.05, asiente: -0.06, ladea: 0.04 }, ojos: { x: -0.25, y: 0.35, abiertos: 0.8, tension: 0 }, cejas: { alto: -0.15, ang: 0.0, asim: 0 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.85 } }, 0.01],
  [T.planoC + 1.0, { cabeza: { giro: 0.02, asiente: 0.02, ladea: 0.06 }, ojos: { x: 0, y: 0.05, abiertos: 0.78, tension: 0 }, cejas: { alto: 0.05, ang: 0.35, asim: 0.5 }, boca: { sonrisa: -0.45 } }, 0.35],
  // E1 · mira por la vidriera (gira la cabeza a su derecha: -x del mundo = +x de él... ver giro)
  [T.planoE1, { ...R0, ...manosMesa, cabeza: { giro: -0.15, asiente: 0.0, ladea: 0.02 }, torso: -0.5, ojos: { x: -0.6, y: 0.1, abiertos: 1 }, cejas: { alto: 0.6, ang: 0.2, asim: 0.4 }, boca: { sonrisa: 0, ancho: 0.8 } }, 0.01],
  [T.planoE2 - 0.2, { cabeza: { giro: -0.2 }, cejas: { alto: 0.9, asim: 0.6 } }, 0.5],
  // J2 · la vela
  [T.planoJ2, { ...R0, ...manosMesa, torso: 0, cabeza: { giro: 0, asiente: 0.22, ladea: -0.06 }, ojos: { x: 0, y: -0.7, abiertos: 0.95, feliz: 0.2 }, cejas: { alto: 0.75, ang: 0.45, asim: 0 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 0.95 } }, 0.01],
  [T.planoJ2 + 0.5, { cabeza: { asiente: 0.15, ladea: -0.1 }, ojos: { y: -0.2, x: 0.1, feliz: 0.12 }, boca: { sonrisa: 0.55 } }, 0.3],
  // L · lo saluda Tito: levanta la mano y sonríe
  [T.planoL, { ...R0, ...manosMesa, cabeza: { giro: 0.05, asiente: 0.05, ladea: 0 }, ojos: { x: 0.1, y: 0.15, abiertos: 1, feliz: 0 }, cejas: { alto: 0.3, ang: 0.1 }, boca: { sonrisa: 0.3, abierta: 0 } }, 0.01],
  [T.saluda + 0.35, { manoD: [-0.5, 1.02, 0.18], codoD: [-1, -0.5, 0], dedoD: 0, cejas: { alto: 0.8 }, ojos: { feliz: 0.1 }, boca: { sonrisa: 0.85, abierta: 0.25, ancho: 1.1 } }, 0.3],
  // M · "Ahora sí.": sonríe, asiente
  [T.planoM, { ...R0, ...manosMesa, cabeza: { giro: 0.0, asiente: 0.04, ladea: 0.05 }, ojos: { x: -0.25, y: 0.15, abiertos: 1, feliz: 0.12 }, cejas: { alto: 0.5, ang: 0.15, asim: 0.4 }, boca: { sonrisa: 0.7, ancho: 1.05 } }, 0.01],
  [L.r11.a + 0.5, { cabeza: { asiente: 0.18, ladea: 0.08 } }, 0.2],
  [L.r11.a + 0.85, { cabeza: { asiente: 0.0, ladea: 0.04 } }, 0.25],
];
// Tito: [t, pose, dur]
const TK = [
  [0, { x: -0.25, z: -2.62, giro: 0.25, ...BRAZOS.costado, cabeza: { giro: 0, asiente: 0.1 }, boca: { sonrisa: 0.5 } }],
  [T.llegaD + 1.15, { x: 0.5, z: -1.12, giro: -0.4, paso: 0 }, 1.15],
  [T.planoB, { ...BRAZOS.jarras, inclina: 0.12, cabeza: { giro: -0.08, asiente: 0.32, ladea: 0.06 }, ojos: { x: -0.3, y: -0.4, abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.6, ang: 0.15 }, boca: { sonrisa: 0.9, ancho: 1.15 } }, 0.25],
  [T.primera + 0.1, { manoD: [-0.42, 0.62, 0.24], codoD: [-1, -0.4, -0.2], dedoD: 1, cejas: { alto: 0.9 } }, 0.25],
  // F · la mesa vacía: Tito limpia silbando (en la mesa 12)
  [T.planoF, { x: -0.62, z: -0.05, giro: PI / 2 - 0.1, paso: 0, inclina: 0.22, manoI: [0.25, 0.32, 0.36], manoD: [-0.05, 0.12, 0.5], codoD: [-0.8, -0.6, -0.3], dedoD: 0, cabeza: { giro: 0.3, asiente: 0.1, ladea: 0.15 }, ojos: { x: 0.4, y: 0.3, abiertos: 0.7, feliz: 0.6 }, cejas: { alto: 0.5, ang: 0 }, boca: { sonrisa: 0.0, abierta: 0.22, ancho: 0.55 } }, 0.01],
  // J1 · trae la porción con vela desde la derecha
  [T.planoJ1, { x: 1.1, z: -1.5, giro: -0.9, ...BRAZOS.ofrece(0.2, 0.42, 0.44), inclina: 0, paso: 1, cabeza: { giro: 0, asiente: 0.25, ladea: 0 }, ojos: { x: 0, y: -0.5, abiertos: 1, feliz: 0.4 }, cejas: { alto: 0.7, ang: 0.2 }, boca: { sonrisa: 0.95, abierta: 0.3, ancho: 1.2 } }, 0.01],
  [T.plato - 0.05, { x: 0.55, z: -1.2, giro: -0.4, paso: 0, inclina: 0.3 }, 0.9],
  [T.plato + 0.6, { inclina: 0.06, ...BRAZOS.jarras, cabeza: { asiente: 0.15, ladea: 0.08 } }, 0.4],
  [T.planoJ2, { x: 0.8, z: -1.05, giro: -0.6 }, 0.01],
  // K · detrás del mostrador, mirando la tablet
  [T.planoK, { x: 1.4, z: -3.85, giro: -0.7, paso: 0, inclina: 0.06, manoI: [0.22, 0.42, 0.42], manoD: [-0.2, 0.42, 0.42], codoI: [0.8, -0.6, -0.3], codoD: [-0.8, -0.6, -0.3], dedoD: 0, cabeza: { giro: -0.1, asiente: 0.4, ladea: 0 }, ojos: { x: 0, y: -0.7, abiertos: 1, feliz: 0.2 }, cejas: { alto: 0.4, ang: 0.1 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 } }, 0.01],
  // L · levanta la vista y saluda a Rubén
  [T.planoL, { x: 0.55, z: -3.8, giro: 0.12, inclina: 0.02, cabeza: { giro: 0, asiente: 0.0 }, ojos: { y: 0.1 }, boca: { sonrisa: 0.9, ancho: 1.2 } }, 0.01],
  [T.saluda + 0.25, { manoD: [-0.36, 0.98, 0.16], codoD: [-1, -0.2, -0.2], dedoD: 0 }, 0.25],
];
const tituloPaso = (t) => (en(t, T.llegaD, T.llegaD + 1.15) || en(t, T.planoJ1, T.plato - 0.1) ? 1 : 0);
const _w = new THREE.Vector3(), _q = new THREE.Quaternion();

function boca(p, b, t) {
  const B = BOCAS[b]; if (!B || t < B.t || t > B.t + B.env.length / 30) return;
  const i = Math.floor((t - B.t) * 30), f = (t - B.t) * 30 - i;
  const e = lerp(B.env[i] ?? 0, B.env[i + 1] ?? 0, f);
  p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.15 - 0.05) * 0.8);
  p.boca.ancho = 0.95 + e * 0.15;
}

function ponerRuben(t) {
  const pov = !!plano.pov;
  const visible = !pov && !plano.rew && !(t >= T.planoF && t < T.planoG);
  ruben.raiz.visible = visible;
  const pr = poseEn(t, RK); pr.t = t + 1.2; // corre la fase de los parpadeos: ninguno cae en un corte
  boca(pr, "r11", t);
  ruben.poner(pr); sentado(ruben); ruben.raiz.updateMatrixWorld(true);
  sillaR.position.z = t >= T.planoF && t < T.rebobina + 0.35 ? 0.85 : 0.62; sillaR.rotation.y = t >= T.planoF && t < T.rebobina + 0.35 ? PI - 0.3 : PI;
  // la porción en su mano derecha (en tercera persona, plano C)
  porcionR.visible = false;
  if (porcionR.parent !== scene) scene.add(porcionR);
  if (visible && t < T.planoE1) {
    porcionR.visible = true;
    const mano = ruben.mano("D"); mano.updateMatrixWorld(true); mano.getWorldPosition(_w);
    porcionR.position.copy(_w).add(V(-0.03, 0.03, -0.07));
    // borde abajo, punta hacia arriba y un poco hacia la cámara (al mostrador)
    // la punta hacia la cámara (al mostrador) y un poco arriba, el queso hacia arriba: al caerse, la punta se dobla para abajo
    _x.set(-1, 0.55, -0.35).normalize(); _y.set(0, 0.45, -1).addScaledVector(_x, -_x.dot(V(0, 0.45, -1))).normalize(); _z.crossVectors(_x, _y);
    _mm.makeBasis(_x, _y, _z); porcionR.quaternion.setFromRotationMatrix(_mm);
    caidaPorcion(porcionR, eio(sg(t, T.planoC + 0.55, T.planoC + 1.15)));
  }
}
function ponerTito(t) {
  const pt = poseEn(t, TK); pt.t = t + 0.7;
  pt.paso = tituloPaso(t);
  boca(pt, "d01", t); boca(pt, "d02", t);
  // F: el trapo va y viene sobre la mesa
  if (en(t, T.planoF, T.planoG)) { const k = Math.sin((t - T.planoF) * 7); pt.manoD = [-0.05 + k * 0.12, 0.12, 0.5 + Math.cos((t - T.planoF) * 7) * 0.05]; pt.boca.abierta = 0.18 + 0.06 * Math.sin(t * 13); pt.boca.ancho = 0.5; }
  // rebobina: camina para atrás a toda velocidad
  if (plano.rew) { const u = sg(t, T.rebobina, T.planoG); pt.x = lerp(-0.62, -1.6, u); pt.z = lerp(-0.05, -2.9, u); pt.paso = 1; pt.t = t * 2.5; }
  // parte 2 antes de J1: está atrás del mostrador (no se ve en los POV de la mesa)
  if (en(t, T.planoG, T.planoJ1)) { pt.x = 1.4; pt.z = -3.9; pt.giro = 0; pt.paso = 0; Object.assign(pt, { manoI: [0.29, -0.08, 0.04], manoD: [-0.29, -0.08, 0.04], codoI: null, codoD: null }); }
  tito.poner(pt); tito.raiz.updateMatrixWorld(true);
  tito.raiz.visible = true;
  // el trapo en su mano
  trapo.visible = en(t, T.planoF, T.planoG);
  if (trapo.visible) { tito.mano("D").getWorldPosition(_w); trapo.position.set(_w.x, MESA.y + 0.015, _w.z); trapo.rotation.y = 0.3 + Math.sin(t * 7) * 0.2; }
  // J1: la porción con vela en sus manos hasta que la apoya
  if (t >= T.planoJ1) {
    platoCumple.visible = true;
    if (t < T.plato) { tito.mano("I").getWorldPosition(_w); tito.mano("D").getWorldPosition(_p); platoCumple.position.lerpVectors(_w, _p, 0.5); platoCumple.position.y -= 0.04; platoCumple.rotation.y = 0.4; }
    else { const u = eio(sg(t, T.plato, T.plato + 0.3)); tito.mano("I").getWorldPosition(_w); tito.mano("D").getWorldPosition(_p); _w.lerp(_p, 0.5); _w.y -= 0.04; _p.set(0.16, MESA.y + 0.008, -0.03); platoCumple.position.lerpVectors(_w, _p, t >= T.plato + 0.3 ? 1 : u); if (t >= T.plato + 0.3) platoCumple.position.copy(_p); platoCumple.rotation.y = lerp(0.4, 0.35 + PI, u); }
  } else platoCumple.visible = false;
}

// ---------- los brazos POV, por plano ----------
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _c = new THREE.Vector3();
function ponerPOV(t) {
  const pov = !!plano.pov;
  brazoD.visible = brazoI.visible = false; celu.visible = false; masUno.visible = false;
  if (!pov) return;
  const resp = Math.sin(t * 2.1) * 0.004;
  if (t < T.planoC) {
    // A y B: la porción pellizcada por el borde con la derecha, el dorso de la mano hacia Rubén
    brazoD.visible = true;
    const baja = eio(sg(t, T.planoB - 0.25, T.planoB + 0.1)); // en B baja la porción para no tapar a Tito
    _a.set(0.12 + baja * 0.06, -0.2 - baja * 0.13 + resp, -0.34);
    orientar(brazoD, _a, _b.set(-0.42, 0.72, -0.5), _c.set(0.3, -0.05, 1));
    brazoD.userData.poner(MANO.porcion);
    porcionR.visible = true;
    if (porcionR.parent !== brazoD.userData.mano) brazoD.userData.mano.add(porcionR);
    porcionR.position.set(0.0, 0.118, 0.006); porcionR.rotation.set(0, 0, 0);
    porcionR.rotateZ(PI / 2 - 0.15); porcionR.rotateX(1.25);
    caidaPorcion(porcionR, 0);
    return;
  }
  if (t >= T.planoG && t < T.planoH) {
    // G: las dos manos sobre la mesa (relajadas)
    brazoD.visible = brazoI.visible = true;
    orientar(brazoD, _a.set(0.15, -0.26 + resp, -0.34), _b.set(-0.2, 0.25, -1), _c.set(0.1, 1, 0.25)); brazoD.userData.poner(MANO.suelta);
    orientar(brazoI, _a.set(-0.16, -0.27 + resp, -0.33), _b.set(0.25, 0.25, -1), _c.set(-0.1, 1, 0.25)); brazoI.userData.poner(MANO.suelta);
    return;
  }
  if (t >= T.planoH && t < T.planoJ1) {
    // H e I: el celular en la izquierda; la derecha apoyada (H) o fuera (I)
    brazoI.visible = true; celu.visible = true;
    const entra = eio(sg(t, T.planoH, T.planoH + 0.45));
    let cp;
    if (t < T.planoI) cp = _a.set(-0.005, lerp(-0.2, -0.045, entra) + resp, -0.26);
    else cp = _a.set(0.0, -0.035 + resp, -0.235);
    camera.add(celu); celu.position.copy(cp); celu.rotation.set(t < T.planoI ? 0.1 : 0.04, 0, 0.03);
    // mano izquierda abajo del celular, agarrándolo del costado
    orientar(brazoI, _b.copy(cp).add(V(-0.006, -0.088, -0.016)), _c.set(0.12, 1, -0.05), V(0, -0.15, 1)); brazoI.userData.poner(MANO.celular);
    // "+1" 3D que sale del celular
    const u = sg(t, T.scan + 0.05, T.scan + 0.95);
    masUno.visible = u > 0 && u < 1 && t < T.planoI;
    if (masUno.visible) { masUno.position.set(cp.x - 0.036, cp.y + 0.03 + eo(u) * 0.03, cp.z + 0.02); masUno.scale.setScalar(0.42 * bk(sg(t, T.scan + 0.05, T.scan + 0.35)) * (1 - sg(t, T.scan + 0.75, T.scan + 0.95))); masUno.rotation.set(0, Math.sin(t * 3) * 0.25, 0); }
    return;
  }
  if (t >= T.planoJ1 && t < T.planoJ2) {
    brazoD.visible = brazoI.visible = true; // (el celular queda en el bolsillo)
    orientar(brazoD, _a.set(0.16, -0.27 + resp, -0.34), _b.set(-0.2, 0.25, -1), _c.set(0.1, 1, 0.25)); brazoD.userData.poner(MANO.suelta);
    orientar(brazoI, _a.set(-0.17, -0.27 + resp, -0.33), _b.set(0.25, 0.25, -1), _c.set(-0.1, 1, 0.25)); brazoI.userData.poner(MANO.suelta);
  }
}

// ================= ESCENA EN EL TIEMPO =================
function renderAt(tt) {
  const t = Math.max(0, Math.min(DUR, tt));
  elegirPlano(t);
  ponerCamara(t); camera.updateMatrixWorld(true);
  if (celu.parent !== scene) scene.add(celu);
  const parte2 = t >= T.rebobina + 0.35;
  // la mesa: en F vacía; en la parte 2 con el QR
  pizza.visible = !(t >= T.planoF && t < T.rebobina + 0.35);
  pizza.userData.porciones.forEach((p, i) => { p.visible = i < 6 || (i === 6 && parte2); });
  pizza.position.set(parte2 ? -0.18 : -0.04, MESA.y + 0.006, parte2 ? -0.1 : -0.08);
  numero.visible = !parte2; // en la parte 2 la mesa la marca la placa del QR
  qrMesa.visible = parte2 && !en(t, T.planoJ2, T.planoK) && t < T.planoM; // en los primeros planos de Rubén quedaba como una placa cortada en la esquina tablet.visible = parte2;
  vaso.visible = !(t >= T.planoF && t < T.rebobina + 0.35);
  hilo.visible = false;
  ponerRuben(t);
  ponerTito(t);
  ponerPOV(t);
  pantallaCelu(t);
  const est = { fila: t >= T.panelFila, cada: t >= T.panelCada };
  const k = JSON.stringify(est); if (k !== panelClave) { panelClave = k; pintarPanel(est); }
  // Toby respira, mueve una oreja
  tobyCuerpo.scale.set(1, 1 + Math.sin(t * 2.4) * 0.04, 1);
  toby.userData["oreja1"].rotation.z = Math.max(0, Math.sin((t - T.perro) * 9)) * 0.4 * (en(t, T.perro + 0.4, T.perro + 0.9) ? 1 : 0);
  toby.userData.cola.rotation.y = Math.sin(t * 6) * 0.15;
  // el horno y la vela, con titileo determinista
  const H = scene.userData.horno; H.userData.llamas.forEach((f, i) => { f.scale.set(1, 0.8 + 0.35 * Math.abs(Math.sin(t * (7 + i) + i)), 1); });
  horno.intensity = 5 + Math.sin(t * 11) * 0.8 + Math.sin(t * 17.3) * 0.5;
  llamaVela.scale.set(1, 0.9 + 0.15 * Math.sin(t * 19), 1); llamaVela.rotation.z = Math.sin(t * 7) * 0.08;
  if (platoCumple.visible) { platoCumple.updateMatrixWorld(true); llamaVela.getWorldPosition(luzVela.position); luzVela.position.y += 0.3; luzVela.intensity = 0.06 + Math.sin(t * 23) * 0.008; } else luzVela.intensity = 0;
  // los afiches de enfrente: entran con un pop en el push-in
  const [af1, af2] = scene.userData.afiches;
  const s1 = 1 + 0.14 * pulso(t, T.planoE2 + 0.3, 0.35), s2 = 1 + 0.14 * pulso(t, T.puntosE, 0.35);
  af1.scale.setScalar(Math.max(0.001, s1)); af2.scale.setScalar(Math.max(0.001, s2));
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
