// Capa 3D de abren-hoy-2 (Three.js r170 local). Base: reels/abren-hoy (y su base técnica, reels/caso-pedidosya).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek); azar con semilla.
// Parte 2: el mismo almacén, otro día. Graciela pregunta otra vez; esta vez el celular de Rubén contesta solo
// (agente de IA) mientras él toma mate. Personajes, mate y termo en assets/personajes.js (reutilizable).
// Chat genérico: burbujas crema con letra navy, sin logo ni colores de ninguna app.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { crearPersonaje, ELENCO, poseEn, mezclar, CARA, BRAZOS, crearMate, crearTermo } from "./personajes.js";
import { T, DUR, VOZ_T, VOZ_ENV } from "./tiempos3d.js";
// las texturas con letra se dibujan recién con Lexend cargada
await Promise.all(["700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));

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
const camera = new THREE.PerspectiveCamera(34, 1080 / 1920, 0.05, 80);
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

// luz de día de afuera (cálida, con sombras) + cielo + contraluz fría; adentro, una lámpara cálida
const sol = new THREE.DirectionalLight(0xffd3a0, 2.5); sol.position.set(-4.5, 4.2, 6); // jueves 16:40: sol más bajo y cálido sol.target.position.set(0, 0.8, -0.5);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.camera.left = -3; sol.shadow.camera.right = 3; sol.shadow.camera.top = 3.5; sol.shadow.camera.bottom = -2; sol.shadow.camera.near = 1; sol.shadow.camera.far = 16; sol.shadow.bias = -0.0008; sol.shadow.radius = 4;
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xcfe0ff, 0x2a3348, 0.9); scene.add(cielo);
const rim = new THREE.DirectionalLight(0x9cc4ff, 1.3); rim.position.set(4, 3, -5); scene.add(rim);
const lampara = new THREE.PointLight(0xffd59a, 9, 6, 1.6); lampara.position.set(0.2, 2.45, -1.55); scene.add(lampara);
const relleno = new THREE.PointLight(0xffe2b8, 4, 5, 1.8); relleno.position.set(0.6, 1.7, -0.6); scene.add(relleno);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, mostaza: 0xd9a441 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  fachada: mat(C.navy2, 0.8), marco: mat(C.cr, 0.45), marcoOsc: mat(C.cr3, 0.5), g: mat(C.g, 0.5), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.65),
  navy: mat(C.navy, 0.5), navy3: mat(C.navy3, 0.6), red: mat(C.red, 0.55), madera: mat(C.madera, 0.55), mostaza: mat(C.mostaza, 0.5),
  pared: mat(0xe7dcc4, 0.85), estante: mat(0x7a5233, 0.6),
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

// ================= EL SET =================
const PUERTA = { x0: -0.62, x1: 0.62, alto: 2.42 };
const VIDRIERA = { x0: 0.82, x1: 2.9, y0: 0.62, y1: 2.42 };
// vereda de baldosas (afuera) y piso de damero (adentro)
const vereda = lienzo(1024, 1024, (x) => {
  x.fillStyle = "#c9c6b8"; x.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
    x.fillStyle = (i + j) % 2 ? "#cfccbe" : "#c4c1b2"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122);
    x.fillStyle = "rgba(0,0,0,0.06)"; for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) { x.beginPath(); x.arc(i * 128 + 20 + a * 29, j * 128 + 20 + b * 29, 7, 0, 7); x.fill(); }
  }
});
vereda.wrapS = vereda.wrapT = THREE.RepeatWrapping; vereda.repeat.set(5, 4);
const piso = mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshStandardMaterial({ map: vereda, roughness: 0.85 }), 0, 0, 4); piso.rotation.x = -Math.PI / 2; scene.add(piso);
const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(3, 2);
const pisoIn = mesh(new THREE.PlaneGeometry(7, 4.2), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.4 }), 0.9, 0.003, -2.1); pisoIn.rotation.x = -Math.PI / 2; scene.add(pisoIn);
// cordón de la vereda
scene.add(mesh(rbox(10, 0.14, 0.3, 0.04), M.cr2, 0, 0.0, 4.2));

// fachada: una pared con dos huecos (puerta y vidriera)
{
  const Z = -0.06, D = 0.12, ALTO = 4.6;
  const pared = (x0, x1, y0, y1) => scene.add(mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, D), M.fachada, (x0 + x1) / 2, (y0 + y1) / 2, Z));
  pared(-5, PUERTA.x0, 0, ALTO);
  pared(PUERTA.x0, VIDRIERA.x1, PUERTA.alto, ALTO);
  pared(PUERTA.x1, VIDRIERA.x0, 0, PUERTA.alto);
  pared(VIDRIERA.x0, VIDRIERA.x1, 0, VIDRIERA.y0);
  pared(VIDRIERA.x1, 5, 0, ALTO);
  // zócalo crema
  scene.add(mesh(rbox(10, 0.22, 0.16, 0.02), M.cr2, 0, 0.11, Z + 0.03));
  // marcos crema de puerta y vidriera
  const barra = (x, y, w, h) => scene.add(mesh(rbox(w, h, 0.16, 0.025), M.marco, x, y, 0.0));
  const pcx = (PUERTA.x0 + PUERTA.x1) / 2, pw = PUERTA.x1 - PUERTA.x0;
  barra(PUERTA.x0 + 0.04, PUERTA.alto / 2, 0.09, PUERTA.alto); barra(PUERTA.x1 - 0.04, PUERTA.alto / 2, 0.09, PUERTA.alto);
  barra(pcx, PUERTA.alto - 0.04, pw, 0.09); barra(pcx, 0.06, pw, 0.12);
  const vcx = (VIDRIERA.x0 + VIDRIERA.x1) / 2, vw = VIDRIERA.x1 - VIDRIERA.x0;
  barra(VIDRIERA.x0 + 0.04, (VIDRIERA.y0 + VIDRIERA.y1) / 2, 0.09, VIDRIERA.y1 - VIDRIERA.y0);
  barra(VIDRIERA.x1 - 0.04, (VIDRIERA.y0 + VIDRIERA.y1) / 2, 0.09, VIDRIERA.y1 - VIDRIERA.y0);
  barra(vcx, VIDRIERA.y1 - 0.04, vw, 0.09); barra(vcx, VIDRIERA.y0 + 0.04, vw, 0.09);
  // toldo verde y crema
  const rayas = lienzo(512, 64, (x) => { for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? "#efeee5" : "#5ce611"; x.fillRect(i * 32, 0, 32, 64); } });
  rayas.wrapS = THREE.RepeatWrapping; rayas.repeat.set(2.2, 1);
  const toldoMat = new THREE.MeshStandardMaterial({ map: rayas, roughness: 0.8, side: THREE.DoubleSide });
  const toldo = mesh(new THREE.PlaneGeometry(4.4, 0.95), toldoMat, 1.0, 3.25, 0.38); toldo.rotation.x = -0.95; scene.add(toldo);
  const fleco = lienzo(512, 64, (x) => { for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? "#efeee5" : "#5ce611"; x.beginPath(); x.moveTo(i * 32, 0); x.lineTo(i * 32 + 32, 0); x.lineTo(i * 32 + 32, 34); x.arc(i * 32 + 16, 34, 16, 0, Math.PI); x.fill(); } });
  fleco.wrapS = THREE.RepeatWrapping; fleco.repeat.set(2.2, 1);
  const fl = mesh(new THREE.PlaneGeometry(4.4, 0.2), new THREE.MeshStandardMaterial({ map: fleco, transparent: true, alphaTest: 0.5, roughness: 0.8, side: THREE.DoubleSide }), 1.0, 2.89, 0.77); scene.add(fl);
  // letrero sobre la puerta: tabla crema con letras navy
  {
    const tex = lienzo(1024, 220, (x) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, 1024, 220); x.strokeStyle = "#16243d"; x.lineWidth = 12; x.strokeRect(18, 18, 988, 184); x.fillStyle = "#16243d"; x.font = F(900, 128); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ALMACÉN", 512, 118); });
    const crL = mat(C.cr, 0.6);
    scene.add(mesh(rbox(1.5, 0.33, 0.07, 0.03), [crL, crL, crL, crL, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 }), crL], -0.05, 2.66, 0.03));
  }
  // letrero de la vidriera (vinilo crema)
  const letrero = lienzo(1024, 256, (x) => { x.fillStyle = "#efeee5"; x.font = F(800, 92); x.textAlign = "center"; x.fillText("FIAMBRES · BEBIDAS", 512, 170); });
  const vin = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), new THREE.MeshBasicMaterial({ map: letrero, transparent: true, opacity: 0.92, depthWrite: false })); vin.position.set(vcx, 2.05, 0.012); scene.add(vin);
}

// ================= LA PUERTA (hoja que se abre hacia adentro, bisagra a la izquierda) =================
// Lleva el vidrio, los reflejos, la manija y el cartel colgado: cuando se abre, todo gira con ella.
const BISAGRA = PUERTA.x0 + 0.09;
const puerta = new THREE.Group(); puerta.position.set(BISAGRA, 0, 0); scene.add(puerta);
const vidrioMat = new THREE.MeshPhysicalMaterial({ color: 0xbfd8ff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.1, depthWrite: false, envMapIntensity: 1.4 });
const reflejoTex = lienzo(512, 512, (x) => {
  x.translate(256, 256); x.rotate(-0.6);
  const g = x.createLinearGradient(-60, 0, 60, 0); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.5, "rgba(255,255,255,0.55)"); g.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = g; x.fillRect(-60, -400, 120, 800); x.fillRect(110, -400, 36, 800);
});
const HOJA = { w: PUERTA.x1 - PUERTA.x0 - 0.18, h: PUERTA.alto - 0.2 };
{
  const L = (x, y, w, h) => puerta.add(mesh(rbox(w, h, 0.07, 0.02), M.marco, x, y, -0.01));
  L(0.035, HOJA.h / 2 + 0.11, 0.07, HOJA.h); L(HOJA.w - 0.035, HOJA.h / 2 + 0.11, 0.07, HOJA.h);
  L(HOJA.w / 2, HOJA.h + 0.075, HOJA.w, 0.07); L(HOJA.w / 2, 0.16, HOJA.w, 0.1);
  const v = new THREE.Mesh(new THREE.PlaneGeometry(HOJA.w - 0.1, HOJA.h - 0.1), vidrioMat); v.position.set(HOJA.w / 2, HOJA.h / 2 + 0.13, -0.01); v.renderOrder = 5; puerta.add(v);
  const r = new THREE.Mesh(new THREE.PlaneGeometry(HOJA.w - 0.1, HOJA.h - 0.1), new THREE.MeshBasicMaterial({ map: reflejoTex, transparent: true, opacity: 0.35, depthWrite: false })); r.position.set(HOJA.w / 2, HOJA.h / 2 + 0.13, -0.005); r.renderOrder = 6; puerta.add(r);
  // manija (del lado de la cerradura, a la derecha)
  puerta.add(mesh(rbox(0.05, 0.5, 0.05, 0.02), M.marcoOsc, HOJA.w - 0.12, 1.05, 0.06));
  puerta.add(mesh(rbox(0.05, 0.05, 0.08, 0.02), M.marcoOsc, HOJA.w - 0.12, 1.24, 0.03));
  puerta.add(mesh(rbox(0.05, 0.05, 0.08, 0.02), M.marcoOsc, HOJA.w - 0.12, 0.86, 0.03));
}
// vidriera (fija)
{
  const [x0, x1, y0, y1] = [VIDRIERA.x0 + 0.08, VIDRIERA.x1 - 0.08, VIDRIERA.y0 + 0.08, VIDRIERA.y1 - 0.08];
  const v = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), vidrioMat); v.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0); v.renderOrder = 5; scene.add(v);
  const r = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), new THREE.MeshBasicMaterial({ map: reflejoTex, transparent: true, opacity: 0.35, depthWrite: false })); r.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0.005); r.renderOrder = 6; scene.add(r);
}
// el cartel colgado en el vidrio de la puerta (del lado de adentro)
const cartelTex = lienzo(1024, 600, (x) => {
  x.fillStyle = "#0b1220"; rr(x, 0, 0, 1024, 600, 60);
  x.strokeStyle = "#5ce611"; x.lineWidth = 16; x.beginPath(); x.roundRect(24, 24, 976, 552, 44); x.stroke();
  x.textAlign = "center"; x.fillStyle = "#5ce611"; x.font = F(900, 186); x.fillText("ABIERTO", 512, 290);
  x.fillStyle = "#efeee5"; x.fillRect(150, 350, 724, 8);
  x.font = F(700, 104); x.fillText("Lun a Sáb", 512, 470); x.font = F(800, 92); x.fillText("9 a 20", 512, 560);
});
const cartel = new THREE.Group(); puerta.add(cartel);
{
  const navyM = mat(C.navy, 0.5);
  cartel.add(mesh(rbox(1.0, 0.586, 0.035, 0.045), [navyM, navyM, navyM, navyM, new THREE.MeshStandardMaterial({ map: cartelTex, roughness: 0.5, emissive: 0xffffff, emissiveMap: cartelTex, emissiveIntensity: 0.18 }), navyM], 0, -0.35, 0));
  cartel.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-0.38, -0.06, 0), new THREE.Vector3(0, 0.12, 0), new THREE.Vector3(0.38, -0.06, 0)]), 20, 0.008, 6), M.cr));
  cartel.add(mesh(new THREE.SphereGeometry(0.04, 16, 10), M.cr, 0, 0.12, 0.02));
}
cartel.position.set(-0.02 - BISAGRA, 1.84 + 0.35, -0.05);

// adentro: pared del fondo con estantes llenos (con paquetes de yerba), mostrador, balanza, frasco, termo
{
  scene.add(mesh(new THREE.BoxGeometry(7, 3.2, 0.1), M.pared, 0.9, 1.6, -3.3));
  scene.add(mesh(new THREE.BoxGeometry(0.1, 3.2, 3.3), M.pared, -1.9, 1.6, -1.65));
  let s = 7;
  const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const colores = [C.g, C.cr, C.red, C.mostaza, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  for (const y of [0.7, 1.25, 1.8, 2.35]) {
    scene.add(mesh(rbox(3.9, 0.05, 0.42, 0.015), M.estante, 0.6, y, -3.05));
    for (let x = -1.25; x < 2.5; x += 0.17 + az() * 0.08) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (k < 0.45) { const h = 0.22 + az() * 0.18; scene.add(mesh(rbox(0.13, h, 0.16, 0.012), mat(c, 0.6), x, y + 0.025 + h / 2, -3.0)); }
      else if (k < 0.75) { scene.add(mesh(cuerpoFrasco, mat(c, 0.35), x, y + 0.125, -3.0)); scene.add(mesh(tapa, M.cr, x, y + 0.245, -3.0)); }
      else { scene.add(mesh(botella, mat(c, 0.3), x, y + 0.175, -3.0)); scene.add(mesh(pico, mat(C.cr3, 0.4), x, y + 0.37, -3.0)); }
    }
  }
}
const MOSTRADOR = { y: 0.88, z: -1.12 };
{
  scene.add(mesh(rbox(2.5, 0.84, 0.62, 0.03), M.navy3, 0.25, 0.42, MOSTRADOR.z));
  scene.add(mesh(rbox(2.62, 0.06, 0.72, 0.02), M.madera, 0.25, MOSTRADOR.y - 0.02, MOSTRADOR.z));
  scene.add(mesh(rbox(2.3, 0.06, 0.02, 0.01), M.g, 0.25, 0.3, MOSTRADOR.z + 0.315));
  const frasco = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 18), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.35, roughness: 0.05 }));
  frasco.position.set(-0.62, MOSTRADOR.y + 0.14, MOSTRADOR.z + 0.05); scene.add(frasco);
  for (let i = 0; i < 9; i++) scene.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.g, C.mostaza][i % 3], 0.3), -0.62 + Math.sin(i * 2.4) * 0.06, MOSTRADOR.y + 0.05 + Math.floor(i / 3) * 0.05, MOSTRADOR.z + 0.05 + Math.cos(i * 2.4) * 0.06));
  scene.add(mesh(rbox(0.36, 0.1, 0.3, 0.03), M.cr, 0.95, MOSTRADOR.y + 0.03, MOSTRADOR.z + 0.08));
  scene.add(mesh(rbox(0.4, 0.025, 0.32, 0.01), mat(0xb9c0c8, 0.3), 0.95, MOSTRADOR.y + 0.1, MOSTRADOR.z + 0.08));
  // el termo, al lado de Rubén
  const termo = crearTermo(); termo.position.set(-0.3, MOSTRADOR.y + 0.01, MOSTRADOR.z - 0.05); termo.rotation.y = 0.6; scene.add(termo);
  // los 3 paquetes de yerba, a mano sobre el mostrador (genéricos: verde y crema, sin marca)
  const yerbaTex = lienzo(256, 384, (x) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, 256, 384); x.fillStyle = "#3fa60a"; x.fillRect(0, 0, 256, 120); x.fillStyle = "#5ce611"; x.beginPath(); x.ellipse(128, 230, 70, 46, -0.5, 0, 7); x.fill(); x.fillStyle = "#16243d"; x.font = F(900, 64); x.textAlign = "center"; x.fillText("YERBA", 128, 345); });
  const ym = mat(C.cr, 0.7), yf = new THREE.MeshStandardMaterial({ map: yerbaTex, roughness: 0.7 });
  for (let i = 0; i < 3; i++) scene.add(mesh(rbox(0.14, 0.22, 0.08, 0.015), [ym, ym, ym, ym, yf, ym], 1.28 + i * 0.07, MOSTRADOR.y + 0.11, MOSTRADOR.z - 0.02 + i * 0.03));
}

// ================= LOS PERSONAJES Y EL MATE =================
const ruben = crearPersonaje(ELENCO.almacenero); scene.add(ruben.raiz);
const graciela = crearPersonaje(ELENCO.clienta); scene.add(graciela.raiz);
for (const p of [ruben, graciela]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const mate = crearMate(); ruben.cuerpo.add(mate);

// el celular de Graciela (en su cuerpo)
const pantallaG = lienzo(256, 512, (x) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, 256, 512); x.fillStyle = "#efeee5"; rr(x, 24, 300, 208, 70, 22); x.fillStyle = "#16243d"; rr(x, 24, 400, 208, 50, 18); });
const celuG = new THREE.Group();
{
  celuG.add(mesh(rbox(0.075, 0.14, 0.014, 0.012), mat(0x2a3346, 0.35)));
  const pant = new THREE.Mesh(new THREE.PlaneGeometry(0.065, 0.125), new THREE.MeshStandardMaterial({ map: pantallaG, emissive: 0xffffff, emissiveMap: pantallaG, emissiveIntensity: 0.7 }));
  pant.position.z = -0.0075; pant.rotation.y = Math.PI; celuG.add(pant);
}
graciela.cuerpo.add(celuG);

// ================= EL CELULAR DE RUBÉN: el chat que se contesta solo =================
// Chat genérico (nada de una app real): fondo navy, mensajes de ella en crema, las respuestas en navy claro
// con la etiqueta chica "respondido automáticamente".
const MSJ = [
  { de: "ella", txt: "Hola! ¿abren hoy?", t: T.m1 },
  { de: "local", txt: "¡Hola Graciela! Sí, hoy de 9 a 20. ¿Te guardo algo?", t: T.m2 },
  { de: "ella", txt: "¿tenés yerba?", t: T.m3 },
  { de: "local", txt: "Sí, quedan 3. ¿Te la separo?", t: T.m4 },
];
function envolver(x, txt, ancho) {
  const ps = txt.split(" "), ls = []; let l = "";
  for (const p of ps) { const n = l ? l + " " + p : p; if (x.measureText(n).width > ancho && l) { ls.push(l); l = p; } else l = n; }
  if (l) ls.push(l); return ls;
}
const autoIcono = (x, cx, cy, r) => { // destellito: "lo contestó solo"
  x.fillStyle = "#5ce611"; x.beginPath();
  for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4, rr2 = i % 2 ? r * 0.38 : r; x.lineTo(cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2); }
  x.closePath(); x.fill();
};
function pantallaChat(n, escribiendo) {
  return lienzo(720, 1440, (x) => {
    x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 720, 1440);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, 720, 200);
    x.fillStyle = "#b7a9c9"; x.beginPath(); x.arc(92, 118, 46, 0, 7); x.fill();
    x.fillStyle = "#16243d"; x.font = F(800, 46); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("G", 92, 120);
    x.textAlign = "left"; x.fillStyle = "#efeee5"; x.font = F(800, 50); x.fillText("Graciela", 160, 104);
    x.fillStyle = "#8d97ab"; x.font = F(500, 32); x.fillText("en línea", 160, 152);
    // los mensajes se apilan desde abajo, como en cualquier chat
    x.textBaseline = "alphabetic";
    let alto = 0;
    for (let i = 0; i < n; i++) { const m = MSJ[i]; x.font = F(700, 54); alto += envolver(x, m.txt, 520).length * 66 + 46 + (m.de === "local" ? 54 : 0) + 30; }
    if (escribiendo) alto += 84 + 30;
    let y = Math.max(250, 1330 - alto);
    for (let i = 0; i < n; i++) {
      const m = MSJ[i];
      x.font = F(700, 54);
      const ls = envolver(x, m.txt, 520);
      const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 60, h = ls.length * 66 + 46 + (m.de === "local" ? 54 : 0);
      const X = m.de === "ella" ? 30 : 720 - 30 - Math.max(w, 520);
      const W = m.de === "local" ? Math.max(w, 520) : w;
      x.fillStyle = m.de === "ella" ? "#efeee5" : "#2c4268"; rr(x, X, y, W, h, 30);
      x.fillStyle = m.de === "ella" ? "#0b1220" : "#efeee5";
      ls.forEach((l, k) => x.fillText(l, X + 30, y + 70 + k * 66));
      if (m.de === "local") { autoIcono(x, X + 46, y + h - 34, 16); x.fillStyle = "#5ce611"; x.font = F(600, 30); x.fillText("respondido automáticamente", X + 72, y + h - 23); }
      y += h + 30;
    }
    if (escribiendo) { const X = 720 - 40 - 170; x.fillStyle = "#2c4268"; rr(x, X, y, 170, 84, 30); x.fillStyle = "#efeee5"; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(X + 50 + k * 36, y + 42, 11, 0, 7); x.fill(); } }
  });
}
const PANT = { c1: pantallaChat(1, false), c1e: pantallaChat(1, true), c2: pantallaChat(2, false), c3: pantallaChat(3, false), c3e: pantallaChat(3, true), c4: pantallaChat(4, false) };
const celuR = new THREE.Group(); scene.add(celuR);
const pantR = new THREE.MeshBasicMaterial({ color: 0xffffff, map: PANT.c1 }); // pantalla sin luz de escena: se lee nítida
{
  celuR.add(mesh(rbox(0.1, 0.016, 0.2, 0.014), mat(0x2a3346, 0.35)));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.18), pantR); p.rotation.x = -Math.PI / 2; p.position.y = 0.0086; celuR.add(p);
}
const vib = new THREE.Group(); scene.add(vib);
{
  const gm = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.8 });
  for (const s of [-1, 1]) for (const k of [0, 1]) { const a = mesh(new THREE.TorusGeometry(0.12 + k * 0.05, 0.007, 6, 16, 1.1), gm); a.rotation.set(-Math.PI / 2, 0, s > 0 ? -0.55 : Math.PI - 0.55); vib.add(a); }
}

// ================= BURBUJAS (capa de chat pegada a la cámara) =================
// Las de ella a la derecha en crema; las del local a la izquierda en navy claro, con "respondido automáticamente".
function burbuja(m) {
  const W = 1.15, PADX = 56;
  const medir = document.createElement("canvas").getContext("2d"); medir.font = F(700, 96);
  const ls = envolver(medir, m.txt, 1024 - 2 * PADX);
  const tagH = m.de === "local" ? 70 : 0;
  const hpx = ls.length * 118 + 80 + tagH, H = (W * hpx) / 1024;
  const fondo = m.de === "ella" ? "#efeee5" : "#2c4268", letra = m.de === "ella" ? "#0b1220" : "#efeee5";
  const tex = lienzo(1024, hpx, (x) => {
    x.fillStyle = fondo; x.fillRect(0, 0, 1024, hpx);
    x.fillStyle = letra; x.font = F(700, 96); x.textBaseline = "alphabetic";
    ls.forEach((l, k) => x.fillText(l, PADX, 118 + k * 118));
    if (tagH) { autoIcono(x, PADX + 18, hpx - 52, 20); x.fillStyle = "#5ce611"; x.font = F(600, 50); x.fillText("respondido automáticamente", PADX + 52, hpx - 34); }
  });
  const g = new THREE.Group();
  const col = m.de === "ella" ? C.cr : 0x2c4268;
  const bm = mat(col, 0.6, { emissive: col, emissiveIntensity: 0.3 });
  const caja = mesh(rbox(W, H, 0.07, 0.12, 5), [bm, bm, bm, bm, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.32 }), bm]);
  g.add(caja);
  const cola = new THREE.Shape(); cola.moveTo(-0.08, 0); cola.lineTo(0.08, 0); cola.lineTo(m.de === "ella" ? 0.1 : -0.1, -0.13); cola.closePath();
  const cg = new THREE.ExtrudeGeometry(cola, { depth: 0.05, bevelEnabled: false }); cg.translate(0, 0, -0.025);
  g.add(mesh(cg, bm, m.de === "ella" ? W / 2 - 0.26 : -W / 2 + 0.26, -H / 2 + 0.01, 0));
  camera.add(g);
  g.traverse((o) => { if (o.isMesh) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((mm) => { mm.depthTest = false; mm.transparent = true; }); o.renderOrder = o === caja ? 30 : 29; o.castShadow = false; } });
  g.userData = { W, H, m };
  return g;
}
const BUR = MSJ.map(burbuja);

// ================= CONTADOR 3D (pegado a la cámara): 48 veces → tachado → 0 =================
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 6, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g;
};
const contador = new THREE.Group(); camera.add(contador);
const numMat = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.4, emissive: C.g, emissiveIntensity: 0.25 });
const num48Mat = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.4, emissive: C.g, emissiveIntensity: 0.25 });
const NUMS = {};
const tachaMat = new THREE.MeshStandardMaterial({ color: C.red, roughness: 0.45, emissive: C.red, emissiveIntensity: 0.35 });
let tacha, linea2;
{
  const W = 1.95, H = 0.56;
  const tex = lienzo(1024, 340, (x) => {
    x.fillStyle = "#0b1220"; rr(x, 0, 0, 1024, 340, 70);
    x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.beginPath(); x.roundRect(20, 20, 984, 300, 54); x.stroke();
    x.fillStyle = "#efeee5"; x.font = F(800, 120); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("Hoy:", 70, 178);
    x.textAlign = "right"; x.fillText("veces", 960, 178);
  });
  const placa = mesh(rbox(W, H, 0.12, 0.1, 4), [M.navy, M.navy, M.navy, M.navy, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.12 }), M.navy]);
  contador.add(placa);
  NUMS["48"] = mesh(textoGeo("48", 0.32, 0.1), num48Mat, -0.03, 0, 0.1); contador.add(NUMS["48"]);
  NUMS["0"] = mesh(textoGeo("0", 0.36, 0.1), numMat, -0.03, 0, 0.1); contador.add(NUMS["0"]);
  tacha = mesh(rbox(0.62, 0.075, 0.06, 0.03), tachaMat, -0.03, 0.0, 0.2); tacha.rotation.z = 0.32; contador.add(tacha);
  // segunda línea: "que contestó Rubén" (debajo, crema con letra navy)
  const tex2 = lienzo(1024, 200, (x) => { x.fillStyle = "#efeee5"; rr(x, 0, 0, 1024, 200, 60); x.fillStyle = "#0b1220"; x.font = F(800, 88); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("que contestó Rubén", 512, 106); });
  const crL = mat(C.cr, 0.55, { emissive: C.cr, emissiveIntensity: 0.25 });
  linea2 = mesh(rbox(1.6, 0.31, 0.08, 0.1, 4), [crL, crL, crL, crL, new THREE.MeshStandardMaterial({ map: tex2, roughness: 0.55, emissive: 0xffffff, emissiveMap: tex2, emissiveIntensity: 0.25 }), crL], 0, -0.48, 0.02);
  contador.add(linea2);
  contador.traverse((o) => { if (o.isMesh) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.depthTest = false; m.transparent = true; }); o.renderOrder = o === placa || o === linea2 ? 20 : 21; o.castShadow = false; } });
}

// ================= CÁMARA: planos con cortes =================
const GX = -0.46;
const PLANOS = [
  // 1 · general: la puerta, ella tipeando, Rubén tomando mate
  [0, [[0, 0.3, 1.5, 4.75, -0.3, 1.58, -0.4, 38], [T.planos[1] + 0.02, 0.28, 1.51, 4.62, -0.3, 1.6, -0.42, 38]]],
  // 2 · el celular de Rubén en grande, desde arriba: se contesta solo
  [T.planos[1], [[T.planos[1], 0.42, 1.24, -0.86, 0.42, 0.9, -1.0, 34], [T.planos[2] + 0.02, 0.42, 1.21, -0.88, 0.42, 0.9, -1.0, 34]]],
  // 3 · primer plano de Graciela: lee, se sorprende, escribe
  [T.planos[2], [[T.planos[2], GX + 1.3, 1.08, 2.25, GX + 0.02, 1.4, 0.46, 34], [T.planos[3] + 0.02, GX + 1.24, 1.09, 2.12, GX + 0.02, 1.4, 0.46, 34]]],
  // 4 · Rubén de frente, desde la puerta: toma mate, ni mira el celular que vibra
  [T.planos[3], [[T.planos[3], 0.25, 1.22, 0.85, 0.1, 1.6, -1.5, 36], [T.planos[4] + 0.02, 0.23, 1.22, 0.75, 0.1, 1.6, -1.5, 36]]],
  // 5 · general: guarda el celular, abre la puerta, suena la campanita, entra
  [T.planos[4], [[T.planos[4], 0.3, 1.5, 4.7, -0.18, 1.45, -0.6, 38], [T.planos[5] + 0.02, 0.26, 1.48, 4.45, -0.12, 1.42, -0.8, 38]]],
  // 6 · remate: Rubén con el mate, el contador baja a 0, "salud" a cámara
  [T.planos[5], [[T.planos[5], 0.14, 1.06, 1.6, 0.05, 1.33, -1.68, 38], [T.salud, 0.13, 1.08, 1.32, 0.06, 1.36, -1.68, 38], [DUR, 0.11, 1.12, 0.98, 0.07, 1.38, -1.68, 38]]], // push-in lento al guiño
];
const _m = new THREE.Vector3();
let planoActual = 0;
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
  planoActual = pi;
  const CAM = PLANOS[pi][1];
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  const v = p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
  camera.position.set(v[0] + Math.sin(t * 0.9) * 0.01, v[1] + Math.sin(t * 0.67) * 0.007, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
const en = (t, a, b) => t >= a && t < b;
const G0 = { x: GX, z: 0.46, giro: 1.0 };
const R0 = { x: 0.05, z: -1.68, giro: 0.06 };
const conCel = { ...BRAZOS.celular };
const mirarCel = { cabeza: { giro: -0.32, asiente: 0.4, ladea: 0.05 }, ojos: { x: 0, y: -0.9 } };
const mirarRuben = { torso: 0.45, cabeza: { giro: 1.05, asiente: -0.05, ladea: -0.08 }, ojos: { x: 0.85, y: 0.05 } };
const GK = [
  [0, { ...G0, ...conCel, ...mirarCel, ...CARA.concentrada, boca: { sonrisa: 0.2 }, reflejo: 0.8 }],
  [T.m1, { inclina: -0.04, boca: { sonrisa: 0.4 } }, 0.2],
  [T.planos[2], { ...mirarCel, ...CARA.concentrada, boca: { sonrisa: 0.1 }, reflejo: 1 }, 0.1],
  // lee la respuesta: ¡sorpresa!
  [T.sorpresa, { ...CARA.sorpresa, reflejo: 0, ojos: { abiertos: 1, y: 0.1 }, cejas: { alto: 1, ang: 0.3 }, boca: { sonrisa: 0.1, abierta: 0.75, ancho: 0.65 }, inclina: -0.08, cabeza: { giro: -0.3, asiente: 0.2, ladea: 0.12 } }, 0.16],
  [T.sorpresa + 0.55, { ...CARA.feliz, reflejo: 0.6, ojos: { y: -0.7, feliz: 0.4 }, cabeza: { giro: -0.3, asiente: 0.32, ladea: -0.05 }, inclina: 0 }, 0.25],
  [T.tipea2[0], { ...mirarCel, ...CARA.concentrada, boca: { sonrisa: 0.5 } }, 0.2],
  [T.m3 + 0.2, { ...CARA.sonrisa, boca: { sonrisa: 0.55 } }, 0.2],
  // guarda el celular, sonríe y va a la puerta
  [T.guarda, { manoD: [-0.29, -0.08, 0.04], manoI: [0.29, -0.08, 0.04], codoD: null, codoI: null, ...CARA.feliz, cabeza: { giro: 0.4, asiente: 0, ladea: 0 }, reflejo: 0 }, 0.35],
  [T.gira, { giro: Math.PI - 0.15, torso: 0, cabeza: { giro: 0, asiente: 0, ladea: 0 }, manoI: [0.18, 0.62, 0.48], codoI: [1, -0.6, 0] }, 0.3],
  [T.entra[0], { manoI: [0.29, -0.08, 0.04], codoI: null }, 0.25],
];
const mirarCelR = { cabeza: { giro: 0.3, asiente: 0.42, ladea: 0.05 }, ojos: { x: 0.2, y: -0.9 } };
const contento = { ojos: { abiertos: 0.55, tension: 0.2, feliz: 0.35, x: 0.1, y: 0 }, cejas: { alto: 0.1, ang: 0.25 }, boca: { sonrisa: 0.45, ancho: 0.9 } };
const conMate = { manoI: [0.14, 0.36, 0.34], codoI: [0.9, -0.6, -0.3], manoD: [-0.3, 0.32, 0.36] };
const sorbo = { manoI: [0.02, 0.44, 0.33], codoI: [0.9, -0.5, 0.1], cabeza: { giro: 0, asiente: 0.14, ladea: 0.04 }, ojos: { abiertos: 0.05 }, cejas: { alto: 0.35, ang: 0.3 } };
const RK = [
  [0, { ...R0, ...conMate, cabeza: { giro: 0.12, asiente: 0.05, ladea: 0.06 }, ...contento }],
  [T.sorbos[0][0], sorbo, 0.3],
  [T.sorbos[0][1], { ...conMate, cabeza: { giro: 0.12, asiente: 0.05, ladea: 0.06 }, ...contento }, 0.3],
  [T.sorbos[1][0], sorbo, 0.3],
  [T.sorbos[1][1], { ...conMate, cabeza: { giro: 0.1, asiente: 0.02, ladea: 0.04 }, ...contento }, 0.3],
  // "Pase, Graciela": levanta un poco el mate hacia ella
  [T.voz + 0.1, { manoI: [0.2, 0.5, 0.38], cabeza: { giro: -0.3, asiente: 0, ladea: 0.05 }, ojos: { abiertos: 0.75, x: -0.5, feliz: 0.3 }, cejas: { alto: 0.3, ang: 0 }, boca: { sonrisa: 0.6 } }, 0.3],
  [T.planos[5], { ...conMate, cabeza: { giro: 0.06, asiente: 0.02, ladea: 0.04 }, ...contento, ojos: { abiertos: 0.6, x: 0.05, y: 0.05, feliz: 0.3 } }, 0.2],
  [T.cero + 0.1, { cejas: { alto: 0.5, ang: 0, asim: 0.8 }, boca: { sonrisa: 0.7 } }, 0.25],
  // ¡salud!: el mate hacia la cámara y un guiño
  [T.salud, { manoI: [0.16, 0.6, 0.48], codoI: [1, -0.3, 0], inclina: 0.06, ojos: { abiertos: 0.85, guiño: 1, feliz: 0.5, x: 0.05 }, cejas: { alto: 0.45, ang: 0.1, asim: 0.6 }, boca: { sonrisa: 1, abierta: 0.15, ancho: 1.15 } }, 0.25],
  [T.salud + 0.8, { ojos: { guiño: 0, abiertos: 0.8 } }, 0.15],
];

function ponerPersonajes(t) {
  // ---- Graciela ----
  let pg = poseEn(t, GK);
  for (const [a, b] of [T.tipea1, T.tipea2]) if (t >= a && t <= b) { const k = Math.sin(t * 38) * 0.012, k2 = Math.cos(t * 31) * 0.012; pg.manoI = [pg.manoI[0], pg.manoI[1] + k, pg.manoI[2]]; pg.manoD = [pg.manoD[0], pg.manoD[1] + k2, pg.manoD[2]]; }
  // camina hacia adentro: de la puerta al mostrador
  const camino = eio(sg(t, T.entra[0], T.entra[1]));
  if (t >= T.gira) {
    const P = [[GX, 0.46], [0.02, 0.35], [-0.05, -0.35], [-0.42, -0.7]];
    const s = camino * (P.length - 1), i = Math.min(P.length - 2, Math.floor(s)), f = s - i;
    pg.x = lerp(P[i][0], P[i + 1][0], f); pg.z = lerp(P[i][1], P[i + 1][1], f);
    if (camino > 0.01) { const dx = P[i + 1][0] - P[i][0], dz = P[i + 1][1] - P[i][1]; pg.giro = lerp(pg.giro, Math.atan2(dx, dz), cl(camino * 4)); }
    pg.paso = camino > 0 && camino < 1 ? 1 : 0;
  }
  graciela.poner(pg);
  const mD = graciela.brazos[1].mano.position, mI = graciela.brazos[0].mano.position;
  const dos = mD.distanceTo(mI) < 0.25 ? 1 : 0;
  const guardado = t >= T.guarda;
  celuG.visible = !guardado;
  celuG.position.set(dos ? (mD.x + mI.x) / 2 : mD.x + 0.04, (dos ? (mD.y + mI.y) / 2 : mD.y) + 0.035, (dos ? (mD.z + mI.z) / 2 : mD.z) + 0.02);
  celuG.rotation.set(-0.55, 0, 0);
  // ---- Rubén ----
  const pr = poseEn(t, RK);
  if (t >= VOZ_T && t < VOZ_T + VOZ_ENV.length / 30) {
    const i = Math.floor((t - VOZ_T) * 30), f = (t - VOZ_T) * 30 - i;
    pr.boca.abierta = Math.max(pr.boca.abierta, cl(lerp(VOZ_ENV[i] ?? 0, VOZ_ENV[i + 1] ?? 0, f) * 1.1 - 0.05) * 0.7);
  }
  ruben.poner(pr);
  // el mate en la mano izquierda, con la bombilla hacia su boca
  const mi = ruben.brazos[0].mano.position;
  mate.position.set(mi.x - 0.01, mi.y - 0.06, mi.z + 0.02);
  const brindis = pulso(t, T.salud - 0.05, 0.9);
  mate.rotation.set(-0.1 - brindis * 0.35, -Math.PI / 2 + 0.15, 0.05);
}

// ================= ESCENA EN EL TIEMPO =================
function renderAt(t) {
  scene.environmentRotation.y = t * 0.08;
  ponerCamara(t);
  ponerPersonajes(t);

  // ---- la puerta se abre (y se cierra sola un poco después de que entra) ----
  const abre = eio(sg(t, T.puerta, T.puerta + 0.4)); // queda abierta (si se cerraba, cruzaba el plano final)
  puerta.rotation.y = abre * 1.35;
  cartel.visible = planoActual !== 5 && planoActual !== 3; // en los planos de Rubén asomaba enorme
  cartel.rotation.z = Math.sin((t - T.puerta) * 8) * 0.06 * Math.exp(-Math.max(0, t - T.puerta) * 2) * (t > T.puerta ? 1 : 0) + Math.sin(t * 1.3) * 0.006;

  // ---- el celular de Rubén: vibra, se prende y se contesta solo ----
  {
    let v = 0;
    for (const [a, d] of [[T.vibra[0], 0.5], [T.vibra[1], 0.5]]) if (en(t, a, a + d)) v = 1;
    const x0 = 0.42, z0 = MOSTRADOR.z + 0.12;
    celuR.position.set(x0 + v * Math.sin(t * 90) * 0.004, MOSTRADOR.y + 0.018, z0 + v * Math.cos(t * 77) * 0.003);
    celuR.rotation.set(0, v * Math.sin(t * 70) * 0.03, 0);
    const tex = t >= T.m4 ? PANT.c4 : t >= T.escribe[1] ? PANT.c3e : t >= T.m3 ? PANT.c3 : t >= T.m2 ? PANT.c2 : t >= T.escribe[0] ? PANT.c1e : PANT.c1;
    if (pantR.map !== tex) { pantR.map = tex; pantR.needsUpdate = true; }
    vib.visible = v > 0;
    if (vib.visible) { vib.position.set(x0, MOSTRADOR.y + 0.03, z0); vib.rotation.y = -0.12; vib.scale.setScalar(0.85 + Math.abs(Math.sin(t * 20)) * 0.25); }
  }

  // ---- burbujas: se ven las 2 últimas; la nueva entra abajo y empuja la vieja hacia arriba ----
  {
    const k = Math.tan((camera.fov * D2R) / 2) / Math.tan(19 * D2R);
    const ocultas = planoActual === 1 || planoActual >= 4; // en el celular grande ya se leen; en el final, no
    const BASE = 0.17, ESC = 0.17;
    BUR.forEach((B, i) => {
      const m = MSJ[i];
      const s = bk(sg(t, m.t, m.t + 0.32));
      let arriba = 0;
      for (let j = i + 1; j < MSJ.length; j++) arriba += eo(sg(t, MSJ[j].t, MSJ[j].t + 0.3)) * (BUR[j].userData.H * ESC * 0.5 + B.userData.H * ESC * 0.5 + 0.02);
      const nuevas = MSJ.filter((mm, j) => j > i && t >= mm.t).length;
      const desv = nuevas >= 2 ? eo(sg(t, MSJ[i + 2].t, MSJ[i + 2].t + 0.25)) : 0;
      B.visible = s > 0.002 && desv < 0.99 && !ocultas;
      if (!B.visible) return;
      const x = m.de === "ella" ? 0.045 : -0.045;
      B.position.set(x * k, (BASE + arriba - (1 - eo(sg(t, m.t, m.t + 0.3))) * 0.05) * k, -1.0);
      B.rotation.set(0.1, (m.de === "ella" ? 0.16 : -0.16) + Math.sin((t - m.t) * 1.7) * 0.04, Math.sin((t - m.t) * 2.2) * 0.012);
      B.scale.setScalar(ESC * s * (1 - desv) * k);
    });
  }

  // ---- contador: "Hoy: 48 veces" → tachado → 0, y "que contestó Rubén" ----
  {
    const s = bk(sg(t, T.contador, T.contador + 0.35));
    contador.visible = s > 0.002 && planoActual === 5;
    contador.position.set(0, 0.2, -0.72);
    contador.scale.setScalar(0.135 * Math.max(0.001, s) * (1 + 0.12 * pulso(t, T.cero, 0.3)));
    contador.rotation.set(-0.06 + Math.sin(t * 1.1) * 0.03, Math.sin(t * 0.8) * 0.1, Math.sin(t * 0.6) * 0.012);
    const tch = eo(sg(t, T.tacha, T.tacha + 0.22));
    tacha.visible = tch > 0.01 && t < T.cero + 0.05;
    tacha.scale.set(Math.max(0.001, tch), 1, 1);
    num48Mat.color.set(C.g).lerp(new THREE.Color(0x7d8597), tch);
    num48Mat.emissiveIntensity = 0.25 * (1 - tch);
    const sale = eio(sg(t, T.cero - 0.12, T.cero + 0.12));
    NUMS["48"].visible = sale < 1; NUMS["48"].rotation.x = sale * Math.PI * 0.5; NUMS["48"].position.y = -sale * 0.1;
    const entra = eo(sg(t, T.cero, T.cero + 0.25));
    NUMS["0"].visible = entra > 0; NUMS["0"].rotation.x = (1 - entra) * -Math.PI * 0.5;
    numMat.emissiveIntensity = 0.25 + 1.0 * pulso(t, T.cero, 0.5);
    const l2 = bk(sg(t, T.linea2, T.linea2 + 0.3));
    linea2.visible = l2 > 0.01; linea2.scale.setScalar(Math.max(0.001, l2));
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
