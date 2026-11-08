// Capa 3D de lo-mismo-que-la-otra-vez (Three.js r170 local). Base técnica: reels/abren-hoy y abren-hoy-2.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo set (el almacén de Rubén por dentro, pared del fondo navy claro) con dos "días":
//   PARTE 1: Graciela pide "lo mismo que la otra vez", Rubén saca medio almacén (la pila crece), "¡Era verde!",
//            latigazo a la estantería verde (pared izquierda), "Todo es verde, Graciela.", "Verde clarito."
//   PARTE 2: otro sábado: tablet en el mostrador, ficha de Graciela, la bolsa lista antes de que termine la frase.
// Globos de diálogo 3D pegados a la cámara, ubicados en píxeles de pantalla (1080 x 1920), la cola apunta al que habla.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import {
  crearPersonaje, ELENCO, poseEn, mezclar, CARA, BRAZOS, INDICE, FRENTE, niega, pegarACamara,
  crearMate, crearTermo, crearYerba, crearGalletitas, crearDulceDeLeche, crearFideos, crearMaple,
  crearJabonPan, crearLavandina, crearEsponja, crearBolsaPapel, crearTablet,
} from "./personajes.js";
import { PARTE, T, DUR, VOZ_T, VOZ_ENV, LIMPIO } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

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
const P1 = PARTE === 1, P2 = PARTE === 2;

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.setClearColor(0x16243d, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x16243d);
const camera = new THREE.PerspectiveCamera(40, 1080 / 1920, 0.05, 60);
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
scene.environmentIntensity = 0.55;

// luz principal cálida desde adelante-izquierda (la puerta), cielo, contraluz fría, lámpara sobre el mostrador
const sol = new THREE.DirectionalLight(0xffe6c8, 2.3); sol.position.set(-2.5, 5.5, 4.5); sol.target.position.set(0, 0.9, -1.4);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.camera.left = -3; sol.shadow.camera.right = 3; sol.shadow.camera.top = 3; sol.shadow.camera.bottom = -2.5; sol.shadow.camera.near = 1; sol.shadow.camera.far = 14; sol.shadow.bias = -0.0008; sol.shadow.radius = 4;
scene.add(sol, sol.target);
scene.add(new THREE.HemisphereLight(0xcfe0ff, 0x2a3348, 0.85));
const rim = new THREE.DirectionalLight(0x9cc4ff, 1.2); rim.position.set(3, 3, -5); scene.add(rim);
const lampara = new THREE.PointLight(0xffd59a, 8, 6, 1.6); lampara.position.set(0.2, 2.6, -1.0); scene.add(lampara);
const relleno = new THREE.PointLight(0xffe2b8, 3.5, 6, 1.8); relleno.position.set(0.4, 1.8, 0.6); scene.add(relleno);
// la estantería verde tiene su propia luz (que se lea bien en el latigazo)
const luzVerde = new THREE.PointLight(0xfff4e0, 5, 4, 1.6); luzVerde.position.set(-0.6, 2.2, -1.3); scene.add(luzVerde);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, mostaza: 0xd9a441 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = { navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.85), navy3: mat(C.navy3, 0.6), cr: mat(C.cr, 0.6), madera: mat(C.madera, 0.55), estante: mat(0xb88a5c, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.6) };
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
let semilla = 11;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ================= EL SET: el almacén por dentro =================
// x: izquierda (-) a derecha (+); el mostrador cruza en z = -1.12; Rubén atrás (z -1.68); Graciela adelante (z -0.4).
// Pared del fondo z = -3.3 (navy claro, estantes de colores sin verde); pared izquierda x = -1.95 con el tramo
// TODO VERDE (solo lo ven el latigazo y el primer plano de Rubén); pared del frente z = 1.6 con la puerta (solo la ve
// el contraplano de Graciela).
const MOSTRADOR = { y: 0.89, z: -1.12, x0: -1.0, x1: 1.5 };
{
  const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(4.5, 5);
  const piso = mesh(new THREE.PlaneGeometry(9, 10), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.45 }), 0.3, 0, -0.9); piso.rotation.x = -Math.PI / 2; scene.add(piso);
  const techo = new THREE.Mesh(new THREE.PlaneGeometry(9, 10), mat(0x22324f, 0.9)); techo.position.set(0.3, 3.2, -0.9); techo.rotation.x = Math.PI / 2; scene.add(techo);
  scene.add(mesh(new THREE.BoxGeometry(9, 3.2, 0.1), M.navy2, 0.3, 1.6, -3.35));   // fondo
  scene.add(mesh(new THREE.BoxGeometry(0.1, 3.2, 6), M.navy2, -2.0, 1.6, -0.4));   // izquierda
  scene.add(mesh(new THREE.BoxGeometry(0.1, 3.2, 6), M.navy2, 3.0, 1.6, -0.4));    // derecha
  // zócalo crema
  scene.add(mesh(new THREE.BoxGeometry(9, 0.16, 0.04), mat(C.cr2, 0.6), 0.3, 0.08, -3.29));
  // estantes del fondo: colores de siempre, NINGÚN verde (si no, el chiste de la estantería no funciona)
  const colores = [C.cr, C.red, C.mostaza, 0xffffff, C.navy3, 0xe8cf9f, 0x8a5a3c, 0x6d86b0];
  const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  const matCache = {};
  const mc = (c, r) => (matCache[c + "|" + r] ??= mat(c, r));
  for (const y of [0.62, 1.17, 1.72, 2.27]) {
    scene.add(mesh(rbox(4.6, 0.05, 0.42, 0.015), M.estante, 0.45, y, -3.08));
    for (let x = -1.75; x < 2.6; x += 0.17 + az() * 0.08) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (k < 0.45) { const h = 0.22 + az() * 0.18; scene.add(mesh(rbox(0.13, h, 0.16, 0.012), mc(c, 0.6), x, y + 0.025 + h / 2, -3.03)); }
      else if (k < 0.75) { scene.add(mesh(cuerpoFrasco, mc(c, 0.35), x, y + 0.125, -3.03)); scene.add(mesh(tapa, M.cr, x, y + 0.245, -3.03)); }
      else { scene.add(mesh(botella, mc(c, 0.3), x, y + 0.175, -3.03)); scene.add(mesh(pico, mc(C.cr3, 0.4), x, y + 0.37, -3.03)); }
    }
  }
  // la heladera de bebidas en la pared derecha (llena el costado en los generales)
  const hel = new THREE.Group(); hel.position.set(2.55, 0, -1.6); scene.add(hel);
  hel.add(mesh(rbox(0.8, 2.0, 0.7, 0.05), mat(0xf2f1ea, 0.4), 0, 1.0, 0));
  const vidrio = mesh(new THREE.PlaneGeometry(0.62, 1.5), new THREE.MeshStandardMaterial({ color: 0xcfe4ff, emissive: 0xbad8ff, emissiveIntensity: 0.35, roughness: 0.1 }), -0.405, 1.1, 0); vidrio.rotation.y = -Math.PI / 2; hel.add(vidrio);
  for (const y of [0.55, 0.95, 1.35, 1.7]) for (let i = 0; i < 4; i++) { const b = mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.24, 10), mc([C.red, C.mostaza, 0xffffff, C.navy3][(i + Math.round(y * 10)) % 4], 0.3), -0.36, y + 0.12, -0.24 + i * 0.16); hel.add(b); }
}
// el mostrador (navy3 con tapa de madera y filete verde, como en abren-hoy) y el frasco de caramelos
{
  const mx = (MOSTRADOR.x0 + MOSTRADOR.x1) / 2, mw = MOSTRADOR.x1 - MOSTRADOR.x0;
  scene.add(mesh(rbox(mw, 0.84, 0.62, 0.03), M.navy3, mx, 0.42, MOSTRADOR.z));
  scene.add(mesh(rbox(mw + 0.12, 0.06, 0.72, 0.02), M.madera, mx, MOSTRADOR.y - 0.03, MOSTRADOR.z));
  scene.add(mesh(rbox(mw - 0.2, 0.06, 0.02, 0.01), M.g, mx, 0.3, MOSTRADOR.z + 0.315));
  const frasco = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 18), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.35, roughness: 0.05 }));
  frasco.position.set(-0.78, MOSTRADOR.y + 0.13, MOSTRADOR.z - 0.05); scene.add(frasco);
  scene.add(mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.04, 18), M.cr, -0.78, MOSTRADOR.y + 0.28, MOSTRADOR.z - 0.05));
  for (let i = 0; i < 9; i++) scene.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.mostaza, C.cr][i % 3], 0.3), -0.78 + Math.sin(i * 2.4) * 0.06, MOSTRADOR.y + 0.04 + Math.floor(i / 3) * 0.05, MOSTRADOR.z - 0.05 + Math.cos(i * 2.4) * 0.06));
}
// la pared del frente con la puerta de vidrio (luz de día): solo en el contraplano de Graciela
const frente = new THREE.Group(); scene.add(frente);
{
  const Z = 1.6;
  frente.add(mesh(new THREE.BoxGeometry(1.6, 3.2, 0.1), M.navy2, -1.2, 1.6, Z));
  frente.add(mesh(new THREE.BoxGeometry(3.0, 3.2, 0.1), M.navy2, 1.9, 1.6, Z));
  frente.add(mesh(new THREE.BoxGeometry(1.0, 0.8, 0.1), M.navy2, 0.0, 2.8, Z));
  const luz = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 2.4), new THREE.MeshBasicMaterial({ color: 0xf4efe0 })); luz.position.set(0, 1.2, Z + 0.06); luz.rotation.y = Math.PI; frente.add(luz);
  for (const [x, y, w, h] of [[-0.48, 1.2, 0.08, 2.4], [0.48, 1.2, 0.08, 2.4], [0, 2.38, 1.0, 0.08], [0, 1.1, 1.0, 0.06]]) frente.add(mesh(rbox(w, h, 0.12, 0.02), M.cr, x, y, Z - 0.02));
}

// ================= EL TRAMO TODO VERDE (pared izquierda, x = -1.95, z -2.9 a -0.1) =================
const verde = new THREE.Group(); scene.add(verde);
const JABONES_ESTANTE = [];
{
  const X = -1.95, Z0 = -2.9, Z1 = -0.1, ZC = (Z0 + Z1) / 2, L = Z1 - Z0;
  const fondoV = mesh(new THREE.BoxGeometry(0.03, 2.95, L), mat(C.gd, 0.7), X + 0.07, 1.475, ZC); verde.add(fondoV);
  for (const z of [Z0, Z1]) verde.add(mesh(rbox(0.46, 2.95, 0.06, 0.015), M.estante, X + 0.24, 1.475, z));
  const NIV = [0.12, 0.6, 1.08, 1.56, 2.04, 2.52];
  for (const y of NIV) verde.add(mesh(rbox(0.46, 0.05, L, 0.015), M.estante, X + 0.24, y, ZC));
  // etiquetas de precio crema en el borde de cada estante
  const precio = mat(C.cr, 0.6);
  for (const y of NIV.slice(0, 5)) for (let z = Z0 + 0.2; z < Z1 - 0.1; z += 0.42) verde.add(mesh(new THREE.BoxGeometry(0.01, 0.04, 0.09), precio, X + 0.475, y - 0.005, z));
  const G1 = mat(C.g, 0.45), G2 = mat(C.gd, 0.5), G3 = mat(0x7fdc3a, 0.4), Gtap = mat(0x2f8a08, 0.4), crE = mat(C.cr, 0.6);
  const vidrio = new THREE.MeshStandardMaterial({ color: 0xdff5d0, transparent: true, opacity: 0.38, roughness: 0.05 });
  const aceit = mat(0x6f9a2a, 0.35), manz = new THREE.MeshPhysicalMaterial({ color: 0x8be04a, roughness: 0.3, clearcoat: 0.6 });
  const jabonM = new THREE.MeshPhysicalMaterial({ color: C.g, roughness: 0.18, clearcoat: 1, emissive: 0x2c7a06, emissiveIntensity: 0.2 });
  const etiqV = lienzo(256, 128, (x, w, h) => { x.fillStyle = "#3fa60a"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.fillRect(0, 44, w, 40); x.fillStyle = "#3fa60a"; x.font = F(900, 34); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ARVEJAS", w / 2, 66); });
  const latEt = new THREE.MeshStandardMaterial({ map: etiqV, roughness: 0.5 });
  const geo = {
    deter: new THREE.CylinderGeometry(0.05, 0.058, 0.26, 14), picoD: new THREE.CylinderGeometry(0.012, 0.028, 0.08, 10),
    lata: new THREE.CylinderGeometry(0.045, 0.045, 0.11, 16), frasco: new THREE.CylinderGeometry(0.055, 0.055, 0.16, 16), tapaF: new THREE.CylinderGeometry(0.058, 0.058, 0.03, 16),
    bola: new THREE.SphereGeometry(1, 10, 8), rollo: new THREE.CylinderGeometry(0.05, 0.05, 0.16, 14), agua: new THREE.CylinderGeometry(0.038, 0.042, 0.26, 12), tapaA: new THREE.CylinderGeometry(0.018, 0.018, 0.03, 10),
  };
  const poner = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; verde.add(o); return o; };
  const XI = X + 0.26; // línea de frente de los productos
  NIV.slice(0, 5).forEach((y0, nivel) => {
    const y = y0 + 0.025;
    let z = Z0 + 0.1;
    let k = 0;
    while (z < Z1 - 0.12) {
      const tipo = (nivel * 3 + k + Math.floor(az() * 3)) % 8;
      k++;
      if (nivel === 2 && z > -1.55 && z < -1.05 && JABONES_ESTANTE.length < 3) {
        // los jabones en pan verdes, en el estante del medio, sin destacar
        for (let j = 0; j < 3; j++) { const b = mesh(rbox(0.1, 0.05, 0.06, 0.012), jabonM, XI, y + 0.025 + j * 0.052, z); verde.add(b); JABONES_ESTANTE.push(b); }
        z += 0.14; continue;
      }
      if (tipo === 0) { const b = poner(mesh(geo.deter, G1), XI, y + 0.13, z); verde.add(mesh(geo.picoD, Gtap, XI, y + 0.3, z)); z += 0.13; }
      else if (tipo === 1) { for (let j = 0; j < 2; j++) { verde.add(mesh(geo.lata, latEt, XI, y + 0.055 + j * 0.112, z)); } z += 0.1; }
      else if (tipo === 2) {
        verde.add(mesh(geo.frasco, vidrio, XI, y + 0.08, z)); verde.add(mesh(geo.tapaF, G2, XI, y + 0.175, z));
        for (let j = 0; j < 7; j++) { const a = mesh(geo.bola, aceit, XI + Math.sin(j * 2.1) * 0.025, y + 0.025 + (j % 4) * 0.032, z + Math.cos(j * 2.1) * 0.025); a.scale.set(0.02, 0.026, 0.02); verde.add(a); }
        z += 0.125;
      }
      else if (tipo === 3) {
        // cajón de madera con manzanas verdes
        verde.add(mesh(rbox(0.3, 0.1, 0.24, 0.01), M.madera, XI + 0.02, y + 0.05, z + 0.08));
        for (let j = 0; j < 8; j++) { const a = mesh(geo.bola, manz, XI - 0.08 + (j % 4) * 0.055, y + 0.12 + (j > 3 ? 0.04 : 0), z + (j % 2 ? 0.02 : 0.13) - 0.01 + (j > 3 ? 0.03 : 0)); a.scale.setScalar(0.042); verde.add(a); }
        z += 0.3;
      }
      else if (tipo === 4) { const h = 0.18 + az() * 0.1; verde.add(mesh(rbox(0.14, h, 0.11, 0.012), [G1, G1, G1, G1, G1, G1][0], XI - 0.02, y + h / 2, z)); verde.add(mesh(new THREE.BoxGeometry(0.004, h * 0.4, 0.09), crE, XI + 0.051, y + h * 0.55, z)); z += 0.15; }
      else if (tipo === 5) { for (let j = 0; j < 3; j++) { const r = mesh(geo.rollo, j % 2 ? G3 : G1, XI - 0.02, y + 0.05 + j * 0.0, z + j * 0.0); r.rotation.x = Math.PI / 2; r.position.y = y + 0.05 + (j === 2 ? 0.09 : 0); r.position.z = z + (j === 2 ? 0.05 : j * 0.1); verde.add(r); } z += 0.22; }
      else if (tipo === 6) { for (let j = 0; j < 2; j++) { verde.add(mesh(geo.agua, vidrio, XI, y + 0.13, z + j * 0.09)); verde.add(mesh(geo.tapaA, G1, XI, y + 0.275, z + j * 0.09)); } z += 0.19; }
      else { const h = 0.24; verde.add(mesh(rbox(0.12, h, 0.09, 0.01), G2, XI - 0.02, y + h / 2, z)); verde.add(mesh(new THREE.BoxGeometry(0.004, 0.06, 0.07), crE, XI + 0.042, y + h * 0.7, z)); z += 0.11; }
      z += 0.015 + az() * 0.02;
    }
  });
  // escobillón de cerdas verdes apoyado al costado del tramo
  const esc = new THREE.Group(); esc.position.set(X + 0.3, 0, Z1 + 0.12); esc.rotation.z = -0.12; verde.add(esc);
  esc.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.4, 8), G2, 0, 0.82, 0));
  esc.add(mesh(rbox(0.08, 0.06, 0.3, 0.01), G1, 0, 0.14, 0));
  esc.add(mesh(rbox(0.06, 0.12, 0.28, 0.01), G3, 0, 0.06, 0));
}

// ================= LOS PERSONAJES =================
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeosExtra: [] }); scene.add(ruben.raiz);
const graciela = crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 3.4 }); // que no parpadee justo en un corte (4,6 s de la parte 2) scene.add(graciela.raiz);
for (const p of [ruben, graciela]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });

// ================= UTILERÍA =================
const S = 1.9; // los productos, a escala de los personajes (cabezas grandes)
// envuelve un objeto con origen en la base para que su origen quede en el centro
function centrar(o) { const g = new THREE.Group(); o.position.y = -o.userData.tam[1] / 2; g.add(o); g.userData.tam = o.userData.tam; return g; }
const pila = new THREE.Group(); scene.add(pila);
pila.position.set(0.88, MOSTRADOR.y, MOSTRADOR.z - 0.09);
// [objeto, rotación en la mano, posición y rotación en la pila (relativas a la base de la pila), ancho entre manos]
const PROD = [];
if (P1) {
  const yer = centrar(crearYerba()), gal = centrar(crearGalletitas()), dul = centrar(crearDulceDeLeche()), fid = centrar(crearFideos()), map = centrar(crearMaple());
  const hY = yer.userData.tam[0] * S, hD = dul.userData.tam[1] * S, hF = fid.userData.tam[0] * S, hM = map.userData.tam[1] * S;
  // la yerba acostada con la etiqueta al frente; arriba el dulce, los fideos de canto y el maple torcido; las
  // galletitas al costado de la pila, en el mostrador (son las que se caen al final)
  PROD.push(
    { o: yer, mano: [0, 0, Math.PI / 2], ancho: yer.userData.tam[1] * S, pila: [0, hY / 2, 0], rot: [0, 0.1, Math.PI / 2 - 0.05] },
    { o: gal, mano: [0, 0, 0], ancho: gal.userData.tam[0] * S, pila: [0.3, gal.userData.tam[1] * S / 2, 0.22], rot: [0, 0.3, 0] },
    { o: dul, mano: [0, 0, 0], ancho: dul.userData.tam[0] * S, pila: [0.04, hY + hD / 2, 0.02], rot: [0, -0.4, 0.06] },
    { o: fid, mano: [0, 0, -Math.PI / 2], ancho: fid.userData.tam[1] * S, pila: [-0.02, hY + hD + hF / 2, 0.0], rot: [0, 0.15, -Math.PI / 2 + 0.07] },
    { o: map, mano: [0.45, 0, 0], ancho: map.userData.tam[0] * S, pila: [0.03, hY + hD + hF + hM / 2 - 0.012, 0.0], rot: [0.06, 0.22, -0.06] },
  );
  for (const p of PROD) { p.o.scale.setScalar(S); scene.add(p.o); }
}
// parte 2: tablet en su atril, mate en la mano de Rubén, termo, la bolsa con la compra de la otra vez
const tabletTex = lienzo(1024, 704, () => {});
const tablet = crearTablet(tabletTex, 0.27 * 1.6, 0.185 * 1.6, 1.2); // casi acostada: el inserto cenital la ve de frente
const TABLET = { x: -0.2, z: MOSTRADOR.z - 0.1 };
tablet.position.set(TABLET.x, MOSTRADOR.y, TABLET.z); tablet.rotation.y = Math.PI - 0.25; // la pantalla mira a Rubén
const mate = crearMate(); mate.scale.setScalar(1.25);
const termo = crearTermo(); termo.scale.setScalar(1.35);
const bolsa = crearBolsaPapel(); bolsa.scale.setScalar(1.3);
const jabones = [crearJabonPan(), crearJabonPan()], lavandina = crearLavandina(), esponjas = [crearEsponja(), crearEsponja(), crearEsponja()];
if (P2) {
  scene.add(tablet); ruben.cuerpo.add(mate);
  termo.position.set(0.62, MOSTRADOR.y, MOSTRADOR.z - 0.2); termo.rotation.y = 0.5; scene.add(termo);
  scene.add(bolsa);
  for (const o of [...jabones, lavandina, ...esponjas]) { o.scale.setScalar(1.55); bolsa.add(o); o.scale.setScalar(1); }
}

// ---------- pantalla de la tablet (se redibuja según t) ----------
const CLIENTES = ["Alberto", "Graciela", "Marta", "Nico"];
let pantallaClave = "";
function dibujarTablet(t) {
  const fase = t < T.tapG ? 0 : t < T.ficha ? 1 : 2;
  const tildes = fase === 2 ? T.tildes.filter((x) => t >= x).length : 0;
  const rip = fase === 1 ? Math.round(sg(t, T.tapG, T.ficha) * 10) : -1;
  const clave = `${fase}|${tildes}|${rip}|${fase === 2 ? Math.round(sg(t, T.ficha, T.ficha + 0.25) * 8) : 0}|${T.tildes.map((x) => Math.round(sg(t, x, x + 0.2) * 6)).join(",")}`;
  if (clave === pantallaClave) return;
  pantallaClave = clave;
  const { x } = tabletTex.userData, w = 1024, h = 704;
  x.clearRect(0, 0, w, h);
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 96);
  x.fillStyle = "#efeee5"; x.font = F(800, 54); x.textBaseline = "middle"; x.textAlign = "left";
  if (fase < 2) {
    x.fillText("Clientes", 40, 50);
    CLIENTES.forEach((n, i) => {
      const Y = 120 + i * 146;
      const sel = i === 1 && fase === 1;
      x.fillStyle = sel ? "#d8f7c4" : "#ffffff"; rr(x, 28, Y, w - 56, 128, 22);
      x.fillStyle = i === 1 ? "#5ce611" : "#c9cdd6"; x.beginPath(); x.arc(100, Y + 64, 42, 0, 7); x.fill();
      x.fillStyle = "#0b1220"; x.font = F(800, 44); x.textAlign = "center"; x.fillText(n[0], 100, Y + 66);
      x.textAlign = "left"; x.font = F(700, 62); x.fillText(n, 170, Y + 66);
      if (sel) { const u = rip / 10; x.strokeStyle = `rgba(92,230,17,${1 - u})`; x.lineWidth = 14; x.beginPath(); x.arc(560, Y + 64, 40 + u * 260, 0, 7); x.stroke(); }
    });
  } else {
    const k = Math.round(sg(t, T.ficha, T.ficha + 0.25) * 8) / 8;
    x.fillText("‹ Clientes", 40, 50);
    x.save(); x.globalAlpha = k; x.translate((1 - k) * 80, 0);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(110, 190, 66, 0, 7); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 72); x.textAlign = "center"; x.fillText("G", 110, 194);
    x.textAlign = "left"; x.font = F(900, 78); x.fillText("Graciela", 200, 172);
    x.font = F(600, 44); x.fillStyle = "#3a4560"; x.fillText("Última compra: sáb 17/10", 200, 240);
    x.restore();
    const filas = ["2 jabones en pan (verdes)", "1 lavandina 2 L", "3 esponjas"];
    filas.forEach((f, i) => {
      const u = sg(t, T.tildes[i], T.tildes[i] + 0.2);
      if (u <= 0) return;
      const Y = 300 + i * 128;
      x.save(); x.globalAlpha = Math.round(u * 6) / 6; x.translate((1 - eo(u)) * 60, 0);
      x.fillStyle = "#ffffff"; rr(x, 28, Y, w - 56, 112, 20);
      x.fillStyle = "#5ce611"; x.beginPath(); x.arc(92, Y + 56, 36, 0, 7); x.fill();
      x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(74, Y + 57); x.lineTo(88, Y + 71); x.lineTo(112, Y + 42); x.stroke();
      x.fillStyle = "#0b1220"; x.font = F(700, 56); let s = 56; while (x.measureText(f).width > w - 220 && s > 40) { s -= 2; x.font = F(700, s); } x.fillText(f, 150, Y + 58);
      x.restore();
    });
  }
  tabletTex.needsUpdate = true;
}

// ================= GLOBOS DE DIÁLOGO (pegados a la cámara, en píxeles de pantalla) =================
// Unidades de la geometría: 1 = 1000 px de pantalla. Graciela: crema con texto navy. Rubén: navy claro con borde verde
// y texto crema. Texto Lexend 700, el tamaño en px de pantalla que se pida (>= 54).
const PXK = 1000;
function crearGlobo(lineas, quien, px = 64) {
  const esR = quien === "R";
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(700, px * 2);
  const anchoTxt = Math.max(...lineas.map((l) => med.measureText(l).width)) / 2;
  const W = Math.round(anchoTxt + px * 1.3), H = Math.round(lineas.length * px * 1.18 + px * 0.95);
  const fondo = esR ? "#16243d" : "#efeee5", tinta = esR ? "#efeee5" : "#0b1220";
  const tex = lienzo(W * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.fillStyle = tinta; x.font = F(700, px * 2); x.textAlign = "center"; x.textBaseline = "middle";
    lineas.forEach((l, i) => x.fillText(l, w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.18 + px * 0.08));
  });
  const g = new THREE.Group();
  const bordeM = mat(esR ? C.g : C.navy, 0.5, { emissive: esR ? C.g : C.navy, emissiveIntensity: 0.25 });
  const cuerpoM = mat(esR ? C.navy2 : C.cr, 0.6, { emissive: esR ? C.navy2 : C.cr, emissiveIntensity: 0.3 });
  const w = W / PXK, h = H / PXK, R = Math.min(h / 2, 34 / PXK), B = 9 / PXK;
  const borde = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); borde.position.z = -0.012; g.add(borde);
  const caja = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja);
  // la cola: un triángulo (con su borde) que apunta al que habla; se rota en ponerGlobo
  const cola = new THREE.Group(); g.add(cola);
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cb = new THREE.Mesh(tri(70 / PXK, 92 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; cola.add(cb);
  const cc = new THREE.Mesh(tri(50 / PXK, 72 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; cola.add(cc);
  // orden de dibujo: borde, cola, caja
  borde.userData.orden = 0; cb.userData.orden = 1; cc.userData.orden = 2; caja.userData.orden = 3;
  g.userData = { W, H, cola, tex, px, lineas, quien };
  return pegarACamara(g, camera, 40);
}
// ubica un globo: centro (cx, cy) en px de pantalla, escala s (0..), la cola apunta al punto de pantalla (ox, oy)
const _v = new THREE.Vector3();
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0) {
  g.visible = s > 0.003;
  if (!g.visible) return;
  const halfH = Math.tan((camera.fov * D2R) / 2), k = (2 * halfH) / 1920;
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s);
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 5 + (o.userData.orden || 0); });
  const { W, H, cola } = g.userData;
  // la cola sale del borde de abajo, del lado del que habla
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (W / 2), -0.62, 0.62);
  cola.position.set((lado * W) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
  const ang = Math.atan2(ox - (cx + (lado * W) / 2), oy - (cy + H / 2)); // 0 = derecho para abajo
  cola.rotation.z = cl(ang, -0.9, 0.9);
}
// dónde está en pantalla (px) un punto del mundo
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const _cab = new THREE.Vector3();
function cabezaEnPantalla(p, dy = 0.28) { p.cabeza.getWorldPosition(_cab); _cab.y += dy; return enPantalla(_cab); }

// ================= CONTADOR "Cosas verdes: N" (pegado a la cámara, arriba) =================
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 5, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 2 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g;
};
const contador = new THREE.Group();
const NUMS = {};
const tacha = new THREE.Group(), clarito = new THREE.Group();
if (P1) {
  // placa de 860 x 250 px; el número a la derecha (TextGeometry verde)
  const W = 0.86, H = 0.25;
  const tex = lienzo(1720, 500, (x, w, h) => {
    x.fillStyle = "#0b1220"; rr(x, 0, 0, w, h, 110);
    x.strokeStyle = "#5ce611"; x.lineWidth = 22; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 90); x.stroke();
    x.fillStyle = "#efeee5"; x.font = F(800, 150); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("Cosas verdes:", 90, h / 2 + 8);
  });
  const nav = mat(C.navy, 0.5);
  const placa = mesh(rbox(W, H, 0.05, 0.06, 4), [nav, nav, nav, nav, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.22 }), nav]);
  placa.userData.orden = 0; contador.add(placa);
  const numMat = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.4, emissive: C.g, emissiveIntensity: 0.35 });
  for (let n = 1; n <= 37; n++) { const m = mesh(textoGeo(String(n), 0.13, 0.04), numMat, 0.29, 0.0, 0.05); m.userData.orden = 2; contador.add(m); NUMS[n] = m; }
  // la raya roja apagada que tacha "verdes" y la placa "verde clarito" que entra abajo
  const rojo = mat(C.red, 0.5, { emissive: C.red, emissiveIntensity: 0.3 });
  const raya = mesh(rbox(0.34, 0.026, 0.02, 0.012), rojo, 0, 0, 0); raya.userData.orden = 3; tacha.add(raya);
  tacha.position.set(0.035, 0.0, 0.04); tacha.rotation.z = 0.08; contador.add(tacha);
  const tex2 = lienzo(1200, 220, (x, w, h) => {
    x.fillStyle = "#5ce611"; rr(x, 0, 0, w, h, 70);
    x.fillStyle = "#0b1220"; x.font = F(800, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("verde clarito", w / 2, h / 2 + 6);
  });
  const vm = mat(C.g, 0.5);
  const placa2 = mesh(rbox(0.6, 0.11, 0.04, 0.05, 4), [vm, vm, vm, vm, new THREE.MeshStandardMaterial({ map: tex2, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex2, emissiveIntensity: 0.2 }), vm]);
  placa2.userData.orden = 4; clarito.add(placa2);
  clarito.position.set(0.0, -0.2, 0.03); clarito.rotation.z = -0.05; contador.add(clarito);
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

// ================= GLOBOS DE CADA PARTE =================
const GL = {};
if (P1) {
  GL.otraVez = crearGlobo(["Lo mismo que", "la otra vez."], "G", 74);
  GL.ofertas = [["¿Yerba?"], ["¿Galletitas?"], ["¿Dulce de leche?"], ["¿Fideos?"], ["¿Huevos?"]].map((l) => crearGlobo(l, "R", 64));
  GL.nos = [0, 1, 2, 3].map((i) => crearGlobo(["No."], "G", i === 3 ? 54 : 64));
  GL.verde = crearGlobo(["¡Era verde!"], "G", 84);
  GL.clarito = crearGlobo(["Verde clarito."], "G", 74);
} else {
  GL.otraVez = crearGlobo(["Lo mismo que la ot…"], "G", 66);
  GL.eso = crearGlobo(["¡Eso!", "¿Cómo supiste?"], "G", 72);
}
// el globo que se escribe letra por letra (parte 2): se redibuja su textura
const TIPEO = "Lo mismo que la ot…";
let tipeoN = -1;
function escribirGlobo(t) {
  const g = GL.otraVez;
  const n = Math.round(cl((t - T.tipea[0]) / (T.tipea[1] - T.tipea[0])) * TIPEO.length);
  const cursor = n < TIPEO.length || Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  const clave = n * 2 + cursor;
  if (clave === tipeoN) return;
  tipeoN = clave;
  const { tex, px } = g.userData; const { c, x } = tex.userData;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = "#0b1220"; x.font = F(700, px * 2); x.textAlign = "left"; x.textBaseline = "middle";
  const txt = TIPEO.slice(0, n);
  const full = x.measureText(TIPEO).width, x0 = (c.width - full) / 2;
  x.fillText(txt, x0, c.height / 2 + px * 0.08);
  if (cursor) { const cxp = x0 + x.measureText(txt).width + 6; x.fillRect(cxp, c.height / 2 - px * 0.75, 7, px * 1.5); }
  tex.needsUpdate = true;
}

// ================= CÁMARA =================
// PLANOS: [desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un plano,
// Catmull-Rom continua. El latigazo (parte 1) es su propio tramo con barrido de movimiento (ver renderAt).
const R0 = { x: 0.12, z: -1.68, giro: -0.1 };
const G0 = { x: -0.42, z: -0.52, giro: 1.25 };
const G_CONTRA = 2.55; // en el contraplano (P4 / Q4) Graciela mira al mostrador de frente
let PLANOS;
if (P1) PLANOS = [
  // P1 · general 3/4 desde el lado de la clienta, a la altura del pecho; push-in lento
  [0, [[0, 0.15, 1.52, 2.75, 0.1, 1.3, -1.0, 46], [1.7, 0.15, 1.52, 2.5, 0.1, 1.31, -1.0, 46]]],
  // P2 · primer plano de Rubén, por arriba del hombro de Graciela
  [1.7, [[1.7, 0.02, 1.6, 0.2, 0.12, 1.38, -1.68, 31], [2.6, 0.02, 1.6, 0.1, 0.12, 1.39, -1.68, 31]]],
  // P3 · plano medio frontal del mostrador, desde atrás de Graciela; se aleja a medida que crece la pila
  [2.6, [[2.6, -0.3, 1.62, 1.25, 0.55, 1.25, -1.2, 46], [4.4, -0.26, 1.64, 1.5, 0.56, 1.27, -1.2, 46], [6.2, -0.2, 1.67, 1.8, 0.57, 1.3, -1.2, 46]]],
  // P4 · contraplano bajo de Graciela (desde atrás del mostrador)
  [6.2, [[6.2, 0.36, 1.2, -2.3, -0.42, 1.44, -0.52, 40], [7.4, 0.33, 1.2, -2.2, -0.42, 1.45, -0.52, 38]]],
  // P5 · la estantería verde (pared izquierda): travelling lateral lento
  [7.65, [[7.65, -0.25, 1.32, -2.45, -1.95, 1.32, -2.25, 54], [9.2, -0.28, 1.34, -1.65, -1.95, 1.34, -1.5, 54]]],
  // P6 · primer plano de Rubén con la estantería verde atrás (cámara a su derecha, mira hacia la pared izquierda)
  [9.2, [[9.2, 1.95, 1.52, -0.88, 0.12, 1.38, -1.68, 40], [12.3, 1.85, 1.5, -0.92, 0.12, 1.38, -1.68, 37]]],
  // P7 · general (el de P1 más abierto: entra la pila entera)
  [12.3, [[12.3, 0.36, 1.55, 3.05, 0.36, 1.32, -1.0, 46], [14.0, 0.36, 1.55, 2.9, 0.36, 1.33, -1.0, 46]]],
];
else PLANOS = [
  // Q1 · general 3/4, el mismo encuadre que P1
  [0, [[0, 0.15, 1.52, 2.75, 0.1, 1.3, -1.0, 46], [1.3, 0.15, 1.52, 2.55, 0.1, 1.31, -1.0, 46]]],
  // Q2 · inserto casi cenital de la tablet (desde atrás del mostrador, del lado de Rubén)
  [1.3, [[1.3, -0.11, 2.29, -1.58, -0.234, 0.974, -1.086, 33], [3.1, -0.12, 2.2, -1.55, -0.234, 0.974, -1.086, 33]]],
  // Q3 · plano medio frontal (el de P3: callback de la pila)
  [3.1, [[3.1, -0.22, 1.62, 1.25, 0.4, 1.25, -1.2, 46], [4.6, -0.22, 1.63, 1.35, 0.4, 1.26, -1.2, 46]]],
  // Q4 · primer plano de Graciela (desde atrás del mostrador)
  [4.6, [[4.6, -0.6, 1.62, -2.3, -0.42, 1.4, -0.52, 36], [6.0, -0.58, 1.61, -2.2, -0.42, 1.41, -0.52, 35]]],
  // Q5 · primer plano de Rubén, push-in lento
  [6.0, [[6.0, 0.3, 1.5, 1.1, 0.12, 1.36, -1.68, 27], [9.4, 0.3, 1.48, 0.7, 0.12, 1.36, -1.68, 27]]],
  // Q6 · general que se abre
  [9.4, [[9.4, 0.12, 1.5, 2.2, 0.08, 1.2, -1.0, 46], [11.6, 0.12, 1.55, 2.9, 0.0, 1.22, -1.0, 48]]],
];
const _m = new THREE.Vector3();
let planoActual = 0;
function camaraEn(t, pi) {
  const CAM = PLANOS[pi][1];
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
  let v;
  if (P1 && en(t, T.latigo[0], T.latigo[1])) {
    // latigazo: de mirar a Graciela a mirar la estantería verde, girando rápido (ease in-out) y moviéndose a la vez
    const a = camaraEn(T.latigo[0] - 0.001, 3), b = camaraEn(T.latigo[1], 4);
    const u = eio(sg(t, T.latigo[0], T.latigo[1]));
    const ya = Math.atan2(a[3] - a[0], a[5] - a[2]), yb = Math.atan2(b[3] - b[0], b[5] - b[2]);
    const yaw = lerp(ya, yb, u);
    const pos = [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
    v = [...pos, pos[0] + Math.sin(yaw) * 2, lerp(a[4], b[4], u), pos[2] + Math.cos(yaw) * 2, lerp(a[6], b[6], u)];
    planoActual = 3.5;
  } else {
    let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
    planoActual = pi;
    v = camaraEn(t, pi);
  }
  // cámara en mano, muy suave
  camera.position.set(v[0] + Math.sin(t * 0.9) * 0.008, v[1] + Math.sin(t * 0.67) * 0.006, v[2]);
  camera.fov = v[6];
  // inserto cenital de la tablet: la cámara mira hacia abajo con el 'arriba' de la pantalla
  if (P2 && planoActual === 1) camera.up.set(-0.23, 0.36, 0.9).normalize(); else camera.up.set(0, 1, 0);
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
const mirarR = { cabeza: { giro: 0.25, asiente: -0.06, ladea: -0.04 }, ojos: { x: 0.75, y: 0.1 } };       // Graciela mira a Rubén
const mirarG = { cabeza: { giro: -0.35, asiente: 0.02, ladea: 0.03 }, ojos: { x: -0.65, y: -0.05 } };    // Rubén mira a Graciela
const ofreceA = (i) => { const p = PROD[i]; return { ...BRAZOS.ofrece(p.ancho, 0.53, 0.5), inclina: 0.08 }; };
let GK, RK;
if (P1) {
  const o = T.ofertas;
  GK = [
    [0, { ...G0, ...mirarR, ...BRAZOS.costado, manoI: [0.3, 0.05, 0.12], ...CARA.sonrisa, boca: { sonrisa: 0.55, abierta: 0.2, ancho: 1 } }],
    [T.globo0 + 0.6, { boca: { sonrisa: 0.6, abierta: 0, ancho: 1 } }, 0.2],
    // en el plano de la pila, mira los productos; cada "No." con la boca y un ceño chico
    ...o.slice(0, 4).flatMap(([a, no]) => [[no, { boca: { sonrisa: -0.1, abierta: 0.35, ancho: 0.8 }, cejas: { alto: 0.2, ang: 0.1 } }, 0.08], [no + 0.2, { boca: { sonrisa: 0.15, abierta: 0, ancho: 0.85 } }, 0.12]]),
    [T.niega[0], { boca: { sonrisa: -0.25, abierta: 0, ancho: 0.6 }, cejas: { alto: 0.1, ang: 0.15 }, ojos: { abiertos: 0.8 } }, 0.15],
    // piensa: ojos arriba, índice en el mentón
    [T.piensa + 0.12, { ...CARA.concentrada, ojos: { abiertos: 0.85, x: 0.35, y: 0.9 }, cabeza: { giro: 0.12, asiente: -0.18, ladea: 0.12 }, ...BRAZOS.piensa, manoI: [0.3, 0.05, 0.12] }, 0.25],
    [T.verde - 0.08, { ...CARA.feliz, ojos: { abiertos: 1, feliz: 0.45, x: 0.4, y: 0.2 }, cejas: { alto: 0.8, ang: 0.1 }, boca: { sonrisa: 1, abierta: 0.45, ancho: 1.15 }, cabeza: { giro: 0.2, asiente: -0.1, ladea: -0.06 }, ...INDICE, manoD: [-0.3, -0.05, 0.08], codoD: null, dedoD: 0 }, 0.14],
    [T.latigo[0] + 0.5, { boca: { sonrisa: 0.85, abierta: 0.1 } }, 0.3],
    // "Verde clarito.": servicial, la mano abierta
    [T.clarito - 0.05, { ...mirarR, ...CARA.esperanza, boca: { sonrisa: 0.6, abierta: 0.3, ancho: 1 }, manoI: [0.24, 0.45, 0.36], codoI: [1, -0.6, 0], dedoI: 0, manoD: [-0.3, 0.05, 0.12] }, 0.18],
    [T.clarito + 0.45, { boca: { sonrisa: 0.7, abierta: 0 } }, 0.2],
  ];
  RK = [
    [0, { ...R0, ...BRAZOS.apoyado, ...mirarG, ...CARA.sonrisa, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 } }],
    // se le congela la sonrisa: ojos abiertos de más, cejas arriba, la sonrisa fija
    [T.congela, { ojos: { abiertos: 1, feliz: 0, x: -0.55, y: 0 }, cejas: { alto: 1, ang: 0.2 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.2 } }, 0.12],
    // piensa (P2): mano al mentón, ojos arriba a la derecha, una ceja arriba
    [T.planos[1] + 0.05, { ...BRAZOS.piensa, ...CARA.incredula, ojos: { abiertos: 0.7, x: 0.6, y: 0.8 }, cabeza: { giro: 0.1, asiente: -0.12, ladea: 0.1 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.8 } }, 0.2],
    ...o.flatMap(([a, no, deja], i) => [
      [a - 0.02, { ...ofreceA(i), cabeza: { giro: -0.25, asiente: 0.06, ladea: 0 }, ojos: { abiertos: 1, x: -0.5, y: 0, feliz: 0.2 }, cejas: { alto: 0.55, ang: 0.3 }, boca: { sonrisa: 0.6, abierta: 0.25, ancho: 1 } }, i === 0 ? 0.06 : 0.12],
      [a + 0.2, { boca: { sonrisa: 0.55, abierta: 0, ancho: 1 } }, 0.15],
      ...(no ? [[no + 0.08, { cejas: { alto: 0.2, ang: 0.6 }, boca: { sonrisa: -0.1 + i * -0.08, abierta: 0 }, ojos: { abiertos: 0.85 - i * 0.07 } }, 0.1]] : []),
      // lo deja en la pila: las manos se van a su izquierda (la pila)
      [deja + 0.05, { manoI: [0.42, 0.38, 0.5], manoD: [0.06, 0.38, 0.5], codoI: [0.8, -0.8, -0.2], codoD: [-0.2, -0.9, -0.2], torso: 0.35, inclina: 0.06 }, 0.12],
    ]),
    [T.niega[0] + 0.25, { ...BRAZOS.apoyado, codoI: null, codoD: null, torso: 0, ...CARA.resignado, ojos: { abiertos: 0.45, x: -0.4, y: 0, tension: 0.5 }, boca: { sonrisa: -0.6, abierta: 0, ancho: 0.95 } }, 0.25],
    // P6: de mirar la estantería verde a mirar a cámara, lento, cara de nada
    [T.gira - 0.01, { giro: 0.85, ...BRAZOS.apoyado, cabeza: { giro: -0.75, asiente: -0.05, ladea: 0 }, ojos: { abiertos: 0.5, x: -0.8, y: 0.05, tension: 0.3 }, cejas: { alto: 0.1, ang: 0.4 }, boca: { sonrisa: -0.35, abierta: 0, ancho: 0.9 } }, 0.01],
    [T.gira + 0.55, { cabeza: { giro: 0.25, asiente: 0.0, ladea: 0.05 }, ojos: { abiertos: 0.36, x: 0.05, y: 0.05, tension: 0.6 }, cejas: { alto: 0.25, ang: 0.85 }, boca: { sonrisa: -0.7, abierta: 0, ancho: 0.95 } }, 0.55],
    // P7: vuelve a su lugar (corte), mira a Graciela
    [T.planos[6], { giro: R0.giro, ...mirarG, ...CARA.resignado, ojos: { abiertos: 0.4, x: -0.6, y: 0, tension: 0.6 } }, 0.01],
    // apoya la frente en la pila (gira hacia la pila, a su izquierda)
    [T.frente, { ...FRENTE, giro: 0.85, cabeza: { giro: 0, asiente: 0.45, ladea: 0.06 }, ojos: { abiertos: 0, tension: 0.6 }, cejas: { alto: 0.3, ang: 0.9 }, boca: { sonrisa: -0.7, abierta: 0, ancho: 1 } }, 0.22],
  ];
} else {
  const conMate = { manoI: [0.16, 0.36, 0.36], codoI: [0.9, -0.6, -0.3] };
  const contento = { ojos: { abiertos: 0.6, tension: 0.2, feliz: 0.35, x: -0.4, y: 0 }, cejas: { alto: 0.1, ang: 0.25 }, boca: { sonrisa: 0.45, ancho: 0.9 } };
  const sorbo = { manoI: [0.03, 0.38, 0.36], codoI: [0.9, -0.5, 0.1], cabeza: { giro: 0, asiente: 0.14, ladea: 0.04 }, ojos: { abiertos: 0.04 }, cejas: { alto: 0.35, ang: 0.3 } };
  // dónde está la tablet en el espacio de Rubén (para el toque)
  const toque = { manoD: [-0.3, 0.37, 0.46], codoD: [-0.6, -0.8, 0.1], dedoD: 1, inclina: 0.08 };
  GK = [
    [0, { ...G0, ...mirarR, ...BRAZOS.costado, manoI: [0.3, 0.05, 0.12], ...CARA.sonrisa, boca: { sonrisa: 0.5, abierta: 0.2, ancho: 1 } }],
    // habla mientras se escribe el globo
    [T.tipea[1], { boca: { sonrisa: 0.3, abierta: 0.3, ancho: 0.9 } }, 0.1],
    // se queda con la boca abierta a mitad de palabra
    [T.bolsa[0] + 0.1, { ...CARA.sorpresa, ...mirarR, ojos: { abiertos: 1, x: 0.65, y: -0.2 }, boca: { sonrisa: 0, abierta: 0.55, ancho: 0.75 } }, 0.15],
    // Q4: sorpresa → feliz; saca el jabón de la bolsa
    [T.feliz, { ...CARA.feliz, ojos: { abiertos: 0.95, feliz: 0.5, x: 0.4, y: -0.3 }, cejas: { alto: 0.7, ang: 0.15 }, boca: { sonrisa: 1, abierta: 0.4, ancho: 1.15 }, reflejo: 0 }, 0.25],
    [T.saca[1], { manoI: [0.2, 0.66, 0.34], codoI: [1, -0.6, 0], dedoI: 0, reflejo: 0.9 }, 0.3],
    [T.eso + 0.6, { boca: { sonrisa: 0.9, abierta: 0.1 } }, 0.2],
    // se va contenta: baja la mano con la bolsa y gira
    [T.sale[0] + 0.25, { manoI: [0.3, 0.02, 0.1], codoI: null, ...CARA.sonrisa, reflejo: 0, cabeza: { giro: 0, asiente: 0, ladea: 0 } }, 0.3],
  ];
  RK = [
    [0, { ...R0, ...conMate, manoD: [-0.3, 0.32, 0.36], cabeza: { giro: 0.1, asiente: 0.05, ladea: 0.06 }, ...contento }],
    // toca la tablet sin mirar
    [T.toca, { ...toque }, 0.25],
    [T.tapG - 0.05, { ...toque, manoD: [-0.3, 0.33, 0.47] }, 0.12],
    [T.tapG + 0.22, { ...toque, manoD: [-0.3, 0.42, 0.42] }, 0.15],
    // saca la mano de la pantalla (que se lea la ficha)
    [T.ficha + 0.05, { manoD: [-0.32, 0.3, 0.3], codoD: null, dedoD: 0, inclina: 0 }, 0.3],
    // pone las cosas en la bolsa (Q3) y la empuja hacia ella con la mano derecha
    [T.bolsa[0] - 0.02, { manoD: [-0.1, 0.4, 0.5], codoD: [-0.7, -0.8, 0], dedoD: 0, inclina: 0.06, ...contento, ojos: { abiertos: 0.6, x: -0.5, y: -0.4, feliz: 0.3 } }, 0.1],
    [T.empuja, { manoD: [0.2, 0.33, 0.5], codoD: [-0.5, -0.8, -0.2], inclina: 0.1, torso: 0.15 }, 0.2],
    [T.empuja + 0.4, { manoD: [-0.05, 0.33, 0.62], inclina: 0.18, torso: -0.1 }, 0.4],
    [T.planos[4] - 0.01, { manoD: [-0.3, 0.32, 0.36], codoD: null, inclina: 0, torso: 0, ...conMate, ...contento }, 0.01],
    // sorbe el mate con los ojos cerrados, lo baja y mira a cámara de reojo, canchero
    [T.sorbo[0] + 0.25, sorbo, 0.25],
    [T.baja, { ...conMate, cabeza: { giro: 0.12, asiente: 0.02, ladea: 0.1 }, ojos: { abiertos: 0.62, x: 0.25, y: 0.05, feliz: 0.35, tension: 0 }, cejas: { alto: 0.3, ang: -0.1, asim: 0.6 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1 } }, 0.25],
    // guiño + sonrisa, levanta apenas el mate (brindis)
    [T.guino, { manoI: [0.26, 0.42, 0.42], codoI: [1, -0.4, 0], ojos: { abiertos: 0.85, guiño: 1, feliz: 0.5, x: 0.1 }, cejas: { alto: 0.45, ang: 0.1, asim: 0.6 }, boca: { sonrisa: 1, abierta: 0.12, ancho: 1.15 } }, 0.2],
    [T.guino + 0.7, { ojos: { guiño: 0, abiertos: 0.8 } }, 0.15],
    [T.sale[0] + 0.4, { ...conMate, ...contento, ojos: { abiertos: 0.65, x: -0.3, feliz: 0.35 } }, 0.3],
  ];
}

function bocaVoz(pr, t) {
  if (t >= VOZ_T && t < VOZ_T + VOZ_ENV.length / 30) {
    const i = Math.floor((t - VOZ_T) * 30), f = (t - VOZ_T) * 30 - i;
    const e = lerp(VOZ_ENV[i] ?? 0, VOZ_ENV[i + 1] ?? 0, f);
    pr.boca.abierta = Math.max(pr.boca.abierta, cl(e * 1.1 - 0.05) * 0.72);
  }
}
const _w = new THREE.Vector3(), _w2 = new THREE.Vector3();
function ponerPersonajes(t) {
  // ---- Graciela ----
  const pg = poseEn(t, GK);
  if (P1) pg.cabeza.giro += niega(t, T.niega[0], T.niega[1], 0.35, 2);
  if (P2 && t >= T.sale[0]) {
    // se va: media vuelta y camina hacia la puerta (afuera de cuadro, a la izquierda)
    const u = sg(t, T.sale[0], T.sale[1]);
    pg.giro = lerp(G0.giro, -2.2, eio(sg(t, T.sale[0], T.sale[0] + 0.5)));
    const d = eio(sg(t, T.sale[0] + 0.3, T.sale[1] + 0.6)) * 2.4;
    pg.x = G0.x - d * 0.75; pg.z = G0.z + d * 0.65;
    pg.paso = u > 0.12 ? 1 : 0;
  }
  if (P1 ? planoActual === 3 || planoActual === 3.5 : planoActual === 3 && t < T.sale[0]) { pg.giro = P1 ? G_CONTRA : Math.PI + 0.08; pg.cabeza.giro *= 0.3; }
  // en el plano de la pila (P3 / Q3) se la ve de atrás: hombro y rulos al borde del cuadro
  if (planoActual === 2) { pg.giro = Math.PI - 0.35; pg.cabeza.giro = 0; }
  graciela.poner(pg);
  // ---- Rubén ----
  const pr = poseEn(t, RK);
  if (P1) {
    // el maple: tambalea la pila y Rubén se tensa
    const tamb = pulso(t, T.tambalea - 0.05, 0.5);
    pr.inclina += -tamb * 0.04;
    // la frente: un golpe (squash) al llegar
    const golpe = pulso(t, T.frente + 0.08, 0.18);
    pr.aplasta += golpe * 0.05;
  }
  bocaVoz(pr, t);
  ruben.poner(pr);
  if (P2) {
    const mi = ruben.brazos[0].mano.position;
    mate.position.set(mi.x - 0.01, mi.y - 0.075, mi.z + 0.02);
    const brindis = pulso(t, T.guino - 0.05, 0.8);
    mate.rotation.set(-0.1 - brindis * 0.3, -Math.PI / 2 + 0.15, 0.05);
  }
}

// ---------- productos de la parte 1: en la mano, volando a la pila, en la pila ----------
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion(), _e = new THREE.Euler();
function ponerProductos(t) {
  const o = T.ofertas;
  // tambaleo de la pila (maple) y sacudón de la frente
  const tamb = Math.exp(-Math.max(0, t - T.tambalea) * 3.5) * Math.sin((t - T.tambalea) * 22) * (t > T.tambalea ? 1 : 0);
  const fr = Math.exp(-Math.max(0, t - T.frente - 0.1) * 4) * Math.sin((t - T.frente - 0.1) * 26) * (t > T.frente + 0.1 ? 1 : 0);
  // manos de Rubén en el mundo
  ruben.brazos[0].mano.getWorldPosition(_a); ruben.brazos[1].mano.getWorldPosition(_b);
  const mid = _a.clone().add(_b).multiplyScalar(0.5);
  PROD.forEach((p, i) => {
    const [a, , deja] = o[i];
    const obj = p.o;
    if (t < a) { obj.visible = false; return; }
    obj.visible = true;
    const vuelo = sg(t, deja, deja + 0.2);
    // en la mano (pop de entrada 0 → 1,15 → 1)
    const s = t < a + 0.3 ? bk(sg(t, a, a + 0.26)) : 1;
    const enMano = new THREE.Vector3(mid.x, mid.y + 0.02, mid.z + 0.03);
    const rotMano = new THREE.Euler(p.mano[0] - 0.05, R0.giro + 0.0, p.mano[2]);
    const reposo = new THREE.Vector3(pila.position.x + p.pila[0], pila.position.y + p.pila[1], pila.position.z + p.pila[2]);
    let pos, rx, ry, rz;
    if (t < deja) { pos = enMano; rx = rotMano.x; ry = rotMano.y; rz = rotMano.z; }
    else {
      const u = eio(vuelo);
      pos = enMano.clone().lerp(reposo, u); pos.y += Math.sin(u * Math.PI) * (i === 1 ? 0.4 : 0.28);
      rx = lerp(rotMano.x, p.rot[0], u); ry = lerp(rotMano.y, p.rot[1], u); rz = lerp(rotMano.z, p.rot[2], u);
      // rebotito al caer
      const tb = t - (deja + 0.2);
      if (tb > 0) pos.y += Math.abs(Math.sin(tb * 18)) * 0.035 * Math.exp(-tb * 12);
      // la pila entera tambalea (con pivote en su base) cuando cae el maple y cuando Rubén apoya la frente
      if (i !== 1 && vuelo >= 1) {
        const ang = tamb * 0.05 + fr * 0.035;
        const dx = pos.x - pila.position.x, dy = pos.y - pila.position.y;
        pos.x = pila.position.x + dx * Math.cos(ang) - dy * Math.sin(ang); pos.y = pila.position.y + dx * Math.sin(ang) + dy * Math.cos(ang);
        rz += ang;
      }
      // las galletitas se caen: ruedan hacia adelante por el mostrador y caen al piso
      if (i === 1 && t > T.cae) {
        const tc = t - T.cae;
        const borde = MOSTRADOR.z + 0.36 - reposo.z;   // hasta el borde de adelante
        const R = p.o.userData.tam[1] * S / 2;
        const vel = 1.1;
        const dz = Math.min(borde, vel * tc + 1.4 * tc * tc);
        pos.z += dz; rx += dz / R;
        const tl = Math.max(0, tc - 0.3);
        if (dz >= borde - 1e-4 && tl > 0) {
          const tf = tc - 0.3;
          pos.z += vel * 0.9 * tf; rx += (vel * 0.9 * tf) / R;
          const caida = Math.min(4.9 * tf * tf, MOSTRADOR.y - R);
          pos.y -= caida;
          if (caida >= MOSTRADOR.y - R - 1e-4) { const tr = tf - Math.sqrt((MOSTRADOR.y - R) / 4.9); pos.y += Math.abs(Math.sin(tr * 10)) * 0.08 * Math.exp(-tr * 6); }
        }
      }
    }
    obj.position.copy(pos); obj.rotation.set(rx, ry, rz); obj.scale.setScalar(S * s);
  });
}

// ---------- la bolsa y la compra de la otra vez (parte 2) ----------
const BOLSA0 = new THREE.Vector3(0.52, MOSTRADOR.y, MOSTRADOR.z + 0.02);
function ponerBolsa(t) {
  // aparece con pop en el primer ítem; Rubén la empuja hacia Graciela
  const s = bk(sg(t, T.bolsa[0] - 0.12, T.bolsa[0] + 0.12));
  bolsa.visible = s > 0.003 && t < T.sale[0] + 0.3 || (t >= T.sale[0] && t < DUR);
  const em = eio(sg(t, T.empuja, T.empuja + 0.55));
  const p = BOLSA0.clone(); p.x += em * -0.6; p.z += em * 0.24;
  bolsa.rotation.set(0, 0.25 - em * 0.35, 0);
  let sc = 1.3 * s;
  if (t >= T.sale[0]) {
    // en la mano de Graciela
    graciela.brazos[0].mano.getWorldPosition(_a);
    const u = eio(sg(t, T.sale[0], T.sale[0] + 0.3));
    p.lerp(new THREE.Vector3(_a.x, _a.y - 0.42, _a.z + 0.02), u);
    bolsa.rotation.y = lerp(bolsa.rotation.y, graciela.raiz.rotation.y, u);
  }
  bolsa.position.copy(p); bolsa.scale.setScalar(sc);
  // la compra: entra de a una por arriba de la bolsa (asoma)
  const items = [[jabones[0], 0, [-0.04, 0.27, 0.02], [0.35, 0.2, 0.15]], [jabones[1], 0, [0.05, 0.25, -0.02], [-0.25, -0.3, 0.1]], [lavandina, 1, [0.06, 0.06, 0.0], [0, 0.4, 0.06]], [esponjas[0], 2, [-0.07, 0.27, 0.04], [0.6, 0, 0.25]], [esponjas[1], 2, [-0.06, 0.25, -0.04], [0.3, 0.6, -0.3]], [esponjas[2], 2, [0.0, 0.28, 0.05], [-0.5, 0.2, 0.35]]];
  items.forEach(([o, k, pos, rot], j) => {
    const t0 = T.bolsa[k];
    const u = sg(t, t0 - 0.02, t0 + 0.22);
    o.visible = u > 0;
    const caer = 1 - eo(u);
    o.position.set(pos[0], pos[1] + caer * 0.2, pos[2]);
    o.rotation.set(rot[0], rot[1], rot[2]);
    o.scale.setScalar(Math.max(0.001, bk(u)));
  });
  // Graciela saca un jabón de la bolsa y lo levanta (Q4)
  if (t >= T.saca[0]) {
    const j = jabones[0];
    const u = eio(sg(t, T.saca[0], T.saca[1]));
    if (u > 0) {
      graciela.brazos[0].mano.getWorldPosition(_a);
      const local = bolsa.worldToLocal(_a.clone().add(new THREE.Vector3(0, 0.02, 0.05)));
      j.position.lerp(local, u);
      j.rotation.set(lerp(0.3, 0.1, u), lerp(0.2, Math.PI * 0.15, u), lerp(0.1, 0.0, u));
      j.scale.setScalar(1);
    }
  }
}

// ================= ESCENA EN EL TIEMPO =================
const barrido = document.getElementById("barrido");
const bctx = barrido ? barrido.getContext("2d") : null;
function escena(t) {
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  ponerPersonajes(t);
  // qué se ve en cada plano
  frente.visible = P1 ? planoActual === 3 || planoActual === 3.5 : planoActual === 3;
  graciela.raiz.visible = !(P1 && planoActual === 4);
  ruben.raiz.visible = planoActual !== 3 && planoActual !== 3.5; // en el contraplano de Graciela (y al arrancar el latigazo) la cámara está donde él
  if (P1) { ponerProductos(t); if (planoActual === 5) for (const p of PROD) p.o.visible = false; } // en el primer plano de Rubén la pila taparía la cara
  if (P2) { dibujarTablet(t); ponerBolsa(t); tablet.visible = planoActual !== 3; } // en el contraplano de Graciela la tablet taparía el primer plano
  ponerGlobos(t);
  if (P1) {
    // contador: P5 (rueda de 1 a 37) y P7 (vuelve, tachado, "verde clarito")
    let s = 0, n = 1;
    if (planoActual === 4) { s = bk(sg(t, T.contador, T.contador + 0.3)); n = 1 + T.rodillo.filter((x) => t >= x).length; }
    if (planoActual === 6 && t >= T.contador2) { s = bk(sg(t, T.contador2, T.contador2 + 0.3)); n = 37; }
    s = LIMPIO ? 0 : s;
    const pop37 = pulso(t, T.cuenta37, 0.3) * 0.12;
    ponerContador(560, planoActual === 4 ? 300 : 260, s * (1 + pop37));
    for (const k in NUMS) NUMS[k].visible = Number(k) === n;
    if (s > 0) {
      // rodillo: el número nuevo baja desde arriba
      const ult = [...T.rodillo].reverse().find((x) => t >= x) ?? T.contador;
      const r = 1 - eo(sg(t, ult, ult + 0.05));
      NUMS[n].position.y = r * 0.03;
      contador.rotation.set(Math.sin(t * 1.1) * 0.03, Math.sin(t * 0.8) * 0.08, Math.sin(t * 0.6) * 0.01);
      const ta = sg(t, T.tacha, T.tacha + 0.18);
      tacha.visible = planoActual === 6 && ta > 0; tacha.scale.set(Math.max(0.001, eo(ta)), 1, 1); tacha.position.x = 0.035 - (1 - eo(ta)) * 0.17;
      const ca = bk(sg(t, T.tacha + 0.16, T.tacha + 0.42));
      clarito.visible = planoActual === 6 && ca > 0.003; clarito.scale.setScalar(Math.max(0.001, ca));
      // "verdes" pasa a "verde clarito": el número no cambia; un golpe de escala con la tuba
      if (planoActual === 6) contador.scale.multiplyScalar(1 + pulso(t, T.tacha + 0.05, 0.3) * 0.06);
    }
  }
}
function ponerGlobos(t) {
  for (const k in GL) (Array.isArray(GL[k]) ? GL[k] : [GL[k]]).forEach((g) => (g.visible = false));
  if (LIMPIO) return;
  const hG = () => cabezaEnPantalla(graciela, 0.3), hR = () => cabezaEnPantalla(ruben, 0.3);
  if (P1) {
    // P1: "Lo mismo que la otra vez." (cuadro 0: ya entrando, 0,6 → 1)
    if (planoActual === 0) ponerGlobo(GL.otraVez, 330, 470, t < T.globo0 ? lerp(0.6, 0.8, t / T.globo0) : bk(sg(t, T.globo0, T.globo0 + 0.2)) * 0.2 + 0.8, hG());
    // P3: los globos de la tanda, como un chat (el nuevo abajo empuja al viejo; se ven los dos últimos)
    if (planoActual === 2) {
      const ev = [];
      T.ofertas.forEach(([a, no], i) => { ev.push([a, GL.ofertas[i], "R"]); if (no) ev.push([no, GL.nos[i], "G"]); });
      const vivos = ev.filter(([ti]) => t >= ti);
      const salen = eio(sg(t, T.globosSalen - 0.15, T.globosSalen + 0.05));
      vivos.forEach(([ti, g, q], j) => {
        const desde = vivos.length - 1 - j; // 0 = el último
        if (desde > 1) {
          // el que sale por arriba (se achica)
          const tNext2 = vivos[j + 2][0];
          const u = sg(t, tNext2, tNext2 + 0.18);
          if (u >= 1) return;
          const y = lerp(300, 170, eo(u));
          ponerGlobo(g, q === "R" ? 700 : 330, y, (1 - eo(u)) * (1 - salen), q === "R" ? hR() : hG(), 0);
          return;
        }
        const entra = bk(sg(t, ti, ti + 0.22));
        const tSig = vivos[j + 1]?.[0];
        const sube = tSig !== undefined ? eo(sg(t, tSig, tSig + 0.18)) : 0;
        const y = lerp(490, 300, sube) + (1 - entra) * 40;
        ponerGlobo(g, q === "R" ? 700 : 330, y, entra * (1 - salen), q === "R" ? hR() : hG(), desde === 0 ? 2 : 1);
      });
    }
    if (planoActual === 3 && t >= T.verde - 0.05) ponerGlobo(GL.verde, 560, 420, bk(sg(t, T.verde - 0.05, T.verde + 0.18)), hG(), 2);
    if (planoActual === 6 && t >= T.clarito - 0.05) ponerGlobo(GL.clarito, 330, 700, bk(sg(t, T.clarito - 0.05, T.clarito + 0.18)), hG(), 2);
  } else {
    // el globo que se escribe y queda cortado (Q1 a Q3)
    if (t >= T.tipea[0] - 0.08 && planoActual <= 2) {
      escribirGlobo(t);
      const pos = planoActual === 0 ? [420, 470] : planoActual === 1 ? [540, 330] : [420, 330];
      const obj = planoActual === 1 ? [140, 120] : hG();
      ponerGlobo(GL.otraVez, pos[0], pos[1], bk(sg(t, T.tipea[0] - 0.08, T.tipea[0] + 0.12)), obj, 2);
    }
    if (planoActual === 3 && t >= T.eso - 0.05) ponerGlobo(GL.eso, 560, 380, bk(sg(t, T.eso - 0.05, T.eso + 0.18)), hG(), 2);
  }
}

function renderAt(t) {
  if (P1 && en(t, T.latigo[0], T.latigo[1]) && bctx) {
    // barrido de movimiento: 7 sub-cuadros hacia atrás en el tiempo, promediados
    const N = 7, dt = 0.011;
    bctx.clearRect(0, 0, 1080, 1920);
    for (let k = 0; k < N; k++) {
      escena(Math.max(T.latigo[0], t - (N - 1 - k) * dt));
      renderer.render(scene, camera);
      bctx.globalAlpha = 1 / (k + 1);
      bctx.drawImage(canvas, 0, 0);
    }
    bctx.globalAlpha = 1;
    barrido.style.visibility = "visible";
    return;
  }
  if (barrido) barrido.style.visibility = "hidden";
  escena(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
