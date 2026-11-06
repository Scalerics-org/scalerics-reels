// Capa 3D de abren-hoy (Three.js r170 local). Base técnica: reels/caso-pedidosya.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek); azar con semilla.
// El set: la puerta de vidrio de un almacén de barrio con el cartel ABIERTO · Lun a Sáb 9 a 20, Rubén
// detrás del mostrador y Graciela afuera con el celular. Personajes en assets/personajes.js (reutilizable).
// Chat genérico: burbujas crema con letra navy, sin logo ni colores de ninguna app.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { crearPersonaje, ELENCO, poseEn, mezclar, CARA, BRAZOS, saludo, FACEPALM } from "./personajes.js";
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
const sol = new THREE.DirectionalLight(0xffe6c8, 2.4); sol.position.set(-3.5, 6, 6); sol.target.position.set(0, 0.8, -0.5);
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
  // manija de la puerta
  scene.add(mesh(rbox(0.05, 0.5, 0.05, 0.02), M.marcoOsc, PUERTA.x1 - 0.17, 1.05, 0.07));
  scene.add(mesh(rbox(0.05, 0.05, 0.08, 0.02), M.marcoOsc, PUERTA.x1 - 0.17, 1.24, 0.04));
  scene.add(mesh(rbox(0.05, 0.05, 0.08, 0.02), M.marcoOsc, PUERTA.x1 - 0.17, 0.86, 0.04));
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

// vidrios: casi transparentes, con dos reflejos en diagonal
const vidrioMat = new THREE.MeshPhysicalMaterial({ color: 0xbfd8ff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.1, depthWrite: false, envMapIntensity: 1.4 });
const reflejoTex = lienzo(512, 512, (x) => {
  x.translate(256, 256); x.rotate(-0.6);
  const g = x.createLinearGradient(-60, 0, 60, 0); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.5, "rgba(255,255,255,0.55)"); g.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = g; x.fillRect(-60, -400, 120, 800); x.fillRect(110, -400, 36, 800);
});
for (const [x0, x1, y0, y1] of [[PUERTA.x0 + 0.08, PUERTA.x1 - 0.08, 0.12, PUERTA.alto - 0.08], [VIDRIERA.x0 + 0.08, VIDRIERA.x1 - 0.08, VIDRIERA.y0 + 0.08, VIDRIERA.y1 - 0.08]]) {
  const w = x1 - x0, h = y1 - y0;
  const v = new THREE.Mesh(new THREE.PlaneGeometry(w, h), vidrioMat); v.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0.0); v.renderOrder = 5; scene.add(v);
  const r = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: reflejoTex, transparent: true, opacity: 0.35, depthWrite: false })); r.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0.005); r.renderOrder = 6; scene.add(r);
}

// el cartel colgado del lado de adentro del vidrio: navy, ABIERTO en verde, horario en crema
const cartelTex = lienzo(1024, 600, (x) => {
  x.fillStyle = "#0b1220"; rr(x, 0, 0, 1024, 600, 60);
  x.strokeStyle = "#5ce611"; x.lineWidth = 16; x.beginPath(); x.roundRect(24, 24, 976, 552, 44); x.stroke();
  x.textAlign = "center"; x.fillStyle = "#5ce611"; x.font = F(900, 186); x.fillText("ABIERTO", 512, 290);
  x.fillStyle = "#efeee5"; x.fillRect(150, 350, 724, 8);
  x.font = F(700, 104); x.fillText("Lun a Sáb", 512, 470); x.font = F(800, 92); x.fillText("9 a 20", 512, 560);
});
const cartel = new THREE.Group(); scene.add(cartel);
const CARTEL = { x: -0.02, y: 1.84, z: -0.05, w: 1.0, h: 0.586 };
{
  const placa = mesh(rbox(CARTEL.w, CARTEL.h, 0.035, 0.045), [mat(C.navy, 0.5), mat(C.navy, 0.5), mat(C.navy, 0.5), mat(C.navy, 0.5), new THREE.MeshStandardMaterial({ map: cartelTex, roughness: 0.5, emissive: 0xffffff, emissiveMap: cartelTex, emissiveIntensity: 0.18 }), mat(C.navy, 0.5)], 0, -0.35, 0);
  // la cara de la placa que mira afuera es +z: el material [4] de RoundedBox es la cara +z
  cartel.add(placa);
  const hilo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-0.38, -0.06, 0), new THREE.Vector3(0, 0.12, 0), new THREE.Vector3(0.38, -0.06, 0)]), 20, 0.008, 6);
  cartel.add(mesh(hilo, M.cr));
  cartel.add(mesh(new THREE.SphereGeometry(0.04, 16, 10), M.cr, 0, 0.12, 0.02));
}
cartel.position.set(CARTEL.x, CARTEL.y + 0.35, CARTEL.z);
const CARTEL_Y = CARTEL.y + 0.35;
// recuadro verde de "selección" cuando Rubén lo señala
const marcoSel = new THREE.Group(); scene.add(marcoSel);
{
  const w = CARTEL.w + 0.14, h = CARTEL.h + 0.14, e = 0.035;
  const gm = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.6, roughness: 0.4 });
  for (const [x, y, ww, hh] of [[0, h / 2, w, e], [0, -h / 2, w, e], [w / 2, 0, e, h], [-w / 2, 0, e, h]]) marcoSel.add(mesh(new THREE.BoxGeometry(ww, hh, 0.02), gm, x, y, 0));
  for (const [x, y] of [[-w / 2, h / 2], [w / 2, h / 2], [-w / 2, -h / 2], [w / 2, -h / 2]]) { marcoSel.add(mesh(new THREE.BoxGeometry(0.09, 0.09, 0.025), mat(0xffffff, 0.4), x, y, 0.012)); marcoSel.add(mesh(new THREE.BoxGeometry(0.06, 0.06, 0.03), gm, x, y, 0.014)); }
}
marcoSel.position.set(CARTEL.x, CARTEL.y, 0.04);

// adentro: pared del fondo con estantes llenos, mostrador, celular de Rubén, frasco de caramelos
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
  // frasco de caramelos y rollo de papel
  const frasco = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 18), new THREE.MeshStandardMaterial({ color: 0xdfeeff, transparent: true, opacity: 0.35, roughness: 0.05 }));
  frasco.position.set(-0.62, MOSTRADOR.y + 0.14, MOSTRADOR.z + 0.05); scene.add(frasco);
  for (let i = 0; i < 9; i++) scene.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat([C.red, C.g, C.mostaza][i % 3], 0.3), -0.62 + Math.sin(i * 2.4) * 0.06, MOSTRADOR.y + 0.05 + Math.floor(i / 3) * 0.05, MOSTRADOR.z + 0.05 + Math.cos(i * 2.4) * 0.06));
  scene.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.2, 16), M.cr, 1.05, MOSTRADOR.y + 0.08, MOSTRADOR.z - 0.05));
  // la balanza
  scene.add(mesh(rbox(0.36, 0.1, 0.3, 0.03), M.cr, 0.95, MOSTRADOR.y + 0.03, MOSTRADOR.z + 0.08));
  scene.add(mesh(rbox(0.4, 0.025, 0.32, 0.01), mat(0xb9c0c8, 0.3), 0.95, MOSTRADOR.y + 0.1, MOSTRADOR.z + 0.08));
}

// ================= LOS PERSONAJES =================
const ruben = crearPersonaje(ELENCO.almacenero); scene.add(ruben.raiz);
const graciela = crearPersonaje(ELENCO.clienta); scene.add(graciela.raiz);
for (const p of [ruben, graciela]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });

// el celular de Graciela (en su cuerpo) y el de Rubén (sobre el mostrador)
const pantallaG = lienzo(256, 512, (x) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, 256, 512); x.fillStyle = "#efeee5"; rr(x, 24, 300, 208, 70, 22); x.fillStyle = "#5ce611"; rr(x, 24, 400, 208, 50, 18); });
const celuG = new THREE.Group();
{
  celuG.add(mesh(rbox(0.075, 0.14, 0.014, 0.012), mat(0x2a3346, 0.35)));
  const pant = new THREE.Mesh(new THREE.PlaneGeometry(0.065, 0.125), new THREE.MeshStandardMaterial({ map: pantallaG, emissive: 0xffffff, emissiveMap: pantallaG, emissiveIntensity: 0.7 }));
  pant.position.z = -0.0085; pant.rotation.y = Math.PI; celuG.add(pant);
}
graciela.cuerpo.add(celuG);
const celuR = new THREE.Group(); scene.add(celuR);
const notifTex = lienzo(256, 512, (x) => {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, 256, 512);
  x.fillStyle = "#efeee5"; rr(x, 16, 120, 224, 150, 22);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(52, 160, 20, 0, 7); x.fill();
  x.fillStyle = "#0b1220"; x.font = F(800, 26); x.fillText("Graciela", 84, 170);
  x.font = F(500, 22); x.fillText("¿abren hoy?", 32, 230);
});
const pantR = new THREE.MeshStandardMaterial({ color: 0x0b1220, emissive: 0xffffff, emissiveMap: notifTex, map: notifTex, emissiveIntensity: 0 });
{
  celuR.add(mesh(rbox(0.1, 0.016, 0.19, 0.014), mat(0x2a3346, 0.35)));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.088, 0.172), pantR); p.rotation.x = -Math.PI / 2; p.position.y = 0.0086; celuR.add(p);
}
// rayitas de vibración (dos arcos a cada lado)
const vib = new THREE.Group(); scene.add(vib);
{
  const gm = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.8 });
  for (const s of [-1, 1]) for (const k of [0, 1]) { const a = mesh(new THREE.TorusGeometry(0.11 + k * 0.06, 0.009, 6, 16, 1.1), gm); a.rotation.set(-Math.PI / 2, 0, s > 0 ? -0.55 : Math.PI - 0.55); vib.add(a); }
}

// ================= BURBUJAS DE CHAT (genéricas) =================
function burbuja(texto) {
  const W = 1.12, H = 0.3;
  const tex = lienzo(1024, 276, (x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 1024, 276);
    x.fillStyle = "#0b1220"; x.textBaseline = "middle";
    let tam = 104; x.font = F(700, tam);
    while (x.measureText(texto).width > 1024 - 2 * 56 && tam > 60) { tam -= 2; x.font = F(700, tam); }
    x.fillText(texto, 56, 140);
  });
  const g = new THREE.Group();
  // con algo de luz propia: se ven iguales en los planos de adentro y de afuera
  const crB = mat(C.cr, 0.6, { emissive: C.cr, emissiveIntensity: 0.3 });
  const caja = mesh(rbox(W, H, 0.07, 0.12, 5), [crB, crB, crB, crB, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.32 }), crB]);
  g.add(caja);
  const cola = new THREE.Shape(); cola.moveTo(-0.08, 0); cola.lineTo(0.08, 0); cola.lineTo(-0.1, -0.13); cola.closePath();
  const cg = new THREE.ExtrudeGeometry(cola, { depth: 0.05, bevelEnabled: false }); cg.translate(0, 0, -0.025);
  const c = mesh(cg, crB, -W / 2 + 0.26, -H / 2 + 0.01, 0); g.add(c);
  g.userData.W = W;
  camera.add(g);
  g.traverse((o) => { if (o.isMesh) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.depthTest = false; m.transparent = true; }); o.renderOrder = o === caja ? 30 : 29; o.castShadow = false; } });
  return g;
}
const B1 = burbuja("Hola! ¿abren hoy?");
const B2 = burbuja("¿y hasta qué hora?");

// ================= CONTADOR 3D (pegado a la cámara, arriba) =================
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 6, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2); return g;
};
const contador = new THREE.Group(); camera.add(contador);
const NUMS = {};
const numMat = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.4, emissive: C.g, emissiveIntensity: 0.25 });
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
  const gm = numMat;
  for (const n of ["46", "47", "48"]) { const m = mesh(textoGeo(n, 0.32, 0.1), gm, -0.03, 0, 0.1); contador.add(m); NUMS[n] = m; }
  // siempre adelante de todo (está pegado a la cámara, pero el vidrio y el cartel quedan cerca)
  contador.traverse((o) => { if (o.isMesh) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.depthTest = false; m.transparent = true; }); o.renderOrder = o === placa ? 20 : 21; o.castShadow = false; } });
}

// ================= CÁMARA =================
// PLANOS: [desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov, modo]. Entre planos hay corte seco;
// dentro de un plano, Catmull-Rom continua (modo "e" = tramo con ease propio: el push-in rápido).
const GX = -0.46; // dónde está Graciela (x)
const PLANOS = [
  // 1 · general: la puerta, el cartel, ella tipeando, él aburrido
  [0, [[0, 0.3, 1.5, 4.75, -0.3, 1.58, -0.4, 38], [1.4, 0.28, 1.51, 4.62, -0.3, 1.6, -0.42, 38]]],
  // 2 · adentro, de costado al mostrador: el celular vibra en primer plano y Rubén lo mira
  [1.25, [[1.25, 0.98, 1.24, -0.2, 0.16, 1.12, -1.45, 42], [2.02, 0.94, 1.24, -0.26, 0.15, 1.14, -1.45, 42]]],
  // 3 · contraplano desde atrás de Rubén (su cabeza al borde): ella pegada al vidrio, saluda de frente
  [2.0, [[2.0, 1.05, 1.28, -2.9, GX + 0.08, 1.42, 0.45, 30], [3.52, 1.0, 1.29, -2.8, GX + 0.08, 1.44, 0.45, 30]]],
  // 4 · general: él señala el cartel
  [3.5, [[3.5, 0.26, 1.55, 4.6, -0.28, 1.65, -0.5, 38], [4.47, 0.25, 1.55, 4.5, -0.28, 1.66, -0.5, 38]]],
  // 5 · contraplano bajo desde adentro: ella mira el cartel y asiente
  [4.45, [[4.45, -0.12, 1.08, -1.0, GX, 1.4, 0.46, 40], [5.42, -0.12, 1.09, -0.92, GX, 1.41, 0.46, 40]]],
  // 6 · primer plano de ella tipeando seria, la pantalla en los anteojos
  [5.4, [[5.4, GX + 1.25, 1.02, 2.15, GX + 0.02, 1.22, 0.46, 32], [6.52, GX + 1.2, 1.03, 2.05, GX + 0.02, 1.22, 0.46, 32]]],
  // 7 · general con la pausa, mira a cámara, push-in a la cara
  [6.5, [
    [6.5, 0.24, 1.52, 4.5, -0.22, 1.64, -0.6, 38],
    [T.aCamara, 0.26, 1.45, 3.9, -0.06, 1.52, -1.0, 38],
    [T.pushIn[0], 0.26, 1.44, 3.75, -0.02, 1.5, -1.1, 38, "e"],
    [T.pushIn[1], 0.14, 1.02, 1.45, 0.05, 1.37, -1.68, 38],
    [T.voz + 1.5, 0.13, 1.02, 1.36, 0.05, 1.37, -1.68, 38],
    [DUR, 0.12, 1.01, 1.25, 0.05, 1.36, -1.68, 38],
  ]],
];
const ADENTRO = new Set([1, 2, 4]); // planos con la cámara dentro del almacén
const _m = new THREE.Vector3();
let planoActual = 0;
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
  planoActual = pi;
  const CAM = PLANOS[pi][1];
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  let v;
  if (a[8] === "e") {
    // push-in rápido: arranca seco y frena en la cara (sin rebote)
    const x = 1 - Math.pow(1 - u, 4);
    v = a.slice(1, 8).map((q, j) => lerp(q, b[j + 1], x));
  } else {
    const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
    const p0 = i > 0 && CAM[i - 1][8] !== "e" ? CAM[i - 1].slice(1, 8) : p1;
    const p3 = i + 2 < CAM.length && b[8] !== "e" ? CAM[i + 2].slice(1, 8) : p2;
    const u2 = u * u, u3 = u2 * u;
    v = p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
  }
  // cámara en mano, muy suave; y un sacudón corto en la cachetada
  const sac = Math.exp(-Math.max(0, t - T.facepalm) * 9) * (t >= T.facepalm ? 1 : 0);
  camera.position.set(v[0] + Math.sin(t * 0.9) * 0.012 + Math.sin(t * 47) * 0.012 * sac, v[1] + Math.sin(t * 0.67) * 0.008 + Math.cos(t * 53) * 0.01 * sac, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
// Graciela: de costado a la puerta, con el celular; Rubén: detrás del mostrador.
const G0 = { x: GX, z: 0.46, giro: 1.0 };
const R0 = { x: 0.05, z: -1.68, giro: 0.06 };
const conCel = { ...BRAZOS.celular };
const mirarCel = { cabeza: { giro: -0.32, asiente: 0.4, ladea: 0.05 }, ojos: { x: 0, y: -0.9 } };
const mirarRuben = { torso: 0.45, cabeza: { giro: 1.05, asiente: -0.05, ladea: -0.08 }, ojos: { x: 0.85, y: 0.05 } };
const mirarCartel = { torso: 0.55, cabeza: { giro: 1.05, asiente: -0.42, ladea: 0 }, ojos: { x: 0.7, y: 0.8 } };
const unaMano = { manoD: [-0.03, 0.36, 0.3], codoD: [-0.6, -0.8, -0.3], manoI: [0.28, 0.05, 0.06], codoI: null, dedoI: 0 };
const GK = [
  [0, { ...G0, ...conCel, ...mirarCel, ...mezclar(CARA.neutra, CARA.concentrada, 1), boca: { sonrisa: 0.2 }, reflejo: 0.8 }],
  [T.burbuja1, { inclina: -0.04, boca: { sonrisa: 0.45 } }, 0.2],
  [T.ellaMira, { ...mirarRuben, ...CARA.esperanza, reflejo: 0 }, 0.35],
  [T.saluda[0], { ...unaMano, ...CARA.feliz }, 0.25],
  [T.saluda[1] + 0.15, { ...unaMano, ...CARA.sonrisa }, 0.3],
  [T.ellaCartel, { ...mirarCartel, ...CARA.sorpresa, boca: { sonrisa: 0.1, abierta: 0.35, ancho: 0.7 } }, 0.35],
  [T.asiente[0], { ...CARA.sonrisa, cejas: { alto: 0.6, ang: 0.1 } }, 0.25],
  [T.asiente[1] + 0.05, { ...mirarRuben, ...CARA.feliz }, 0.3],
  [T.ellaCel, { ...conCel, ...mirarCel, ...CARA.concentrada, boca: { sonrisa: -0.1, ancho: 0.75 }, cejas: { alto: -0.25, ang: 0.0 }, torso: 0, reflejo: 1 }, 0.35],
  [T.burbuja2 + 0.25, { ...mirarRuben, ...CARA.esperanza, boca: { sonrisa: 0.55, abierta: 0, ancho: 1 }, ...unaMano, reflejo: 0 }, 0.35],
];
const mirarCelR = { cabeza: { giro: 0.3, asiente: 0.42, ladea: 0.05 }, ojos: { x: 0.2, y: -0.9 } };
const mirarG = { cabeza: { giro: -0.38, asiente: -0.02, ladea: 0 }, ojos: { x: -0.6, y: 0.05 } };
const aCamara = { cabeza: { giro: 0.05, asiente: -0.02, ladea: 0.04 }, ojos: { x: 0.05, y: 0.05 } };
const RK = [
  [0, { ...R0, ...BRAZOS.apoyado, cabeza: { giro: 0.12, asiente: 0.12, ladea: 0.08 }, ojos: { x: 0.35, y: -0.2, abiertos: 0.55, tension: 0.15 }, boca: { sonrisa: -0.05, ancho: 0.85 }, cejas: { alto: -0.05, ang: 0.3 } }],
  [T.miraCel, { ...mirarCelR, cejas: { alto: 0.35 } }, 0.25],
  [T.miraArriba, { ...mirarG, ...CARA.incredula }, 0.3],
  [T.saluda[0] + 0.55, { ...mirarG, ojos: { abiertos: 0.5, x: -0.6 }, cejas: { alto: 0.1, ang: 0, asim: 0.9 }, boca: { sonrisa: -0.3 } }, 0.3],
  [T.senala, { inclina: 0.06, ...CARA.fastidio, cejas: { alto: 0.55, ang: -0.1 }, ojos: { abiertos: 0.85, x: -0.55 }, boca: { sonrisa: -0.2, abierta: 0.25, ancho: 0.8 } }, 0.25],
  [T.asiente[0] + 0.1, { ...CARA.sonrisa, ojos: { x: -0.6, feliz: 0.25 }, cabeza: { asiente: 0.0 } }, 0.3],
  [T.asiente[1] + 0.1, { ...BRAZOS.apoyado, inclina: 0, ...CARA.sonrisa, ojos: { x: -0.6, feliz: 0.3 }, boca: { sonrisa: 0.8 } }, 0.35],
  [T.duenoLee, { ...mirarCelR, ...CARA.neutra, cejas: { alto: 0.3 }, boca: { sonrisa: 0.4 } }, 0.25],
  [T.duenoLee + 0.45, { ojos: { abiertos: 1 }, cejas: { alto: 0.9, ang: 0.1 }, boca: { sonrisa: 0, abierta: 0.15, ancho: 0.7 } }, 0.12],
  [T.aCamara, { ...aCamara, ojos: { abiertos: 0.42, tension: 0.1, feliz: 0 }, cejas: { alto: -0.15, ang: 0, asim: 0 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.9 } }, 0.3],
  [T.facepalm - 0.18, { ojos: { abiertos: 0.42 } }, 0.05],
  [T.facepalm, { ...FACEPALM, ojos: { abiertos: 0 }, cabeza: { giro: 0.05, asiente: 0.22, ladea: 0.1 }, cejas: { alto: 0.4, ang: 0.8 }, boca: { sonrisa: -0.8, abierta: 0, ancho: 1 } }, 0.2],
  [T.arrastra[1], { manoD: [-0.07, 0.5, 0.3], codoD: [-0.4, -1, 0.3], inclina: 0.04, cabeza: { giro: 0.12, asiente: 0.08, ladea: 0.22 }, ...CARA.resignado, ojos: { abiertos: 0.34, tension: 0.6, x: 0.08, y: 0.1 } }, T.arrastra[1] - T.arrastra[0]],
  [T.vibra3 + 0.25, { ojos: { y: -0.75, x: 0.25 } }, 0.3],
];

function ponerPersonajes(t) {
  // ---- Graciela ----
  let pg = poseEn(t, GK);
  // tipeo: los pulgares (manos) saltan
  for (const [a, b] of [T.tipea1, T.tipea2]) if (t >= a && t <= b) { const k = Math.sin(t * 38) * 0.012, k2 = Math.cos(t * 31) * 0.012; pg.manoI = [pg.manoI[0], pg.manoI[1] + k, pg.manoI[2]]; pg.manoD = [pg.manoD[0], pg.manoD[1] + k2, pg.manoD[2]]; }
  // saludo
  const sal = sg(t, T.saluda[0] - 0.2, T.saluda[0]) * (1 - sg(t, T.saluda[1], T.saluda[1] + 0.25));
  if (sal > 0) { const sa = saludo(t - T.saluda[0], "I", 1.15); sa.manoI = [sa.manoI[0] + 0.06, sa.manoI[1] - 0.06, sa.manoI[2] - 0.2]; pg = mezclar(pg, { ...pg, ...sa, torso: 0.25, cabeza: { ...pg.cabeza, giro: 0.95 } }, eio(sal)); }
  // asiente dos veces leyendo el cartel
  if (en(t, T.asiente[0], T.asiente[1])) { const u = sg(t, T.asiente[0], T.asiente[1]); pg.cabeza.asiente += Math.sin(u * Math.PI * 4) ** 2 * 0.28 * Math.sin(u * Math.PI); }
  // la chismosa al hombro (sale de la pose de reposo)
  graciela.poner(pg);
  // el celular en la mano derecha, con la pantalla hacia ella
  // en las dos manos cuando tipea; si no, en la derecha
  const mD = graciela.brazos[1].mano.position, mI = graciela.brazos[0].mano.position;
  const dos = mD.distanceTo(mI) < 0.25 ? 1 : 0;
  celuG.position.set(dos ? (mD.x + mI.x) / 2 : mD.x + 0.04, (dos ? (mD.y + mI.y) / 2 : mD.y) + 0.035, (dos ? (mD.z + mI.z) / 2 : mD.z) + 0.02);
  celuG.rotation.set(-0.55, 0, 0);
  // ---- Rubén ----
  let pr = poseEn(t, RK);
  // señala el cartel: brazo izquierdo arriba, índice estirado, dos golpecitos en el aire
  const sen = sg(t, T.senala - 0.22, T.senala) * (1 - sg(t, T.asiente[1] - 0.2, T.asiente[1] + 0.15));
  if (sen > 0) {
    const tap = Math.max(0, Math.sin((t - T.senala) * 16)) * 0.045 * (t > T.senala && t < T.senala + 0.8 ? 1 : 0);
    pr = mezclar(pr, { ...pr, manoI: [0.36 - tap * 0.3, 0.95 - tap, 0.24 - tap * 0.4], codoI: [1, -0.5, -0.4], dedoI: 1, ladea: -0.05 }, eio(sen));
  }
  // medio saludo sin ganas mientras ella saluda
  const ms = pulso(t, T.saluda[0] + 0.45, 0.7);
  if (ms > 0) pr = mezclar(pr, { ...pr, manoI: [0.3, 0.6, 0.3], codoI: [1, -0.4, -0.2] }, ms * 0.85);
  // la cachetada: un squash y la cabeza que rebota
  const golpe = pulso(t, T.facepalm, 0.2);
  pr.aplasta += golpe * 0.06; pr.cabeza.asiente += golpe * 0.08;
  // la voz: la boca se abre con la envolvente de la locución (lo que no tapa la mano)
  if (t >= VOZ_T && t < VOZ_T + VOZ_ENV.length / 30) {
    const i = Math.floor((t - VOZ_T) * 30), f = (t - VOZ_T) * 30 - i;
    const e = lerp(VOZ_ENV[i] ?? 0, VOZ_ENV[i + 1] ?? 0, f);
    pr.boca.abierta = Math.max(pr.boca.abierta, cl(e * 1.1 - 0.05) * 0.75);
  }
  ruben.poner(pr);
}
const en = (t, a, b) => t >= a && t < b;

// ================= ESCENA EN EL TIEMPO =================
function renderAt(t) {
  scene.environmentRotation.y = t * 0.08;
  ponerCamara(t);
  ponerPersonajes(t);

  // ---- burbujas: chat genérico arriba (en el espacio de la cámara), la nueva abajo de la anterior ----
  const poner = (B, ti, y) => {
    const s = bk(sg(t, ti, ti + 0.32));
    const sale = eio(sg(t, T.pushIn[0] - 0.05, T.pushIn[0] + 0.15));
    B.visible = s > 0.002 && sale < 1;
    if (!B.visible) return;
    // mismo lugar y tamaño en pantalla aunque el plano tenga otro fov
    const k = Math.tan((camera.fov * D2R) / 2) / Math.tan(19 * D2R);
    B.position.set((-0.02 + (1 - s) * -0.06) * k, (y - (1 - eo(sg(t, ti, ti + 0.3))) * 0.08 + sale * 0.15) * k, -1.0);
    B.rotation.set(0.12, 0.18 + Math.sin((t - ti) * 1.7) * 0.05, Math.sin((t - ti) * 2.2) * 0.015);
    B.scale.setScalar(0.215 * s * (1 - sale) * k);
  };
  poner(B1, T.burbuja1, 0.262);
  poner(B2, T.burbuja2, 0.188);

  // ---- el celular de Rubén vibra sobre el mostrador ----
  {
    let v = 0;
    for (const [a, d] of [[T.vibra1, 0.95], [T.vibra2, 0.75], [T.vibra3, 0.6]]) if (en(t, a, a + d)) v = 1;
    const x0 = 0.42, z0 = MOSTRADOR.z + 0.12;
    celuR.position.set(x0 + v * Math.sin(t * 90) * 0.006, MOSTRADOR.y + 0.018, z0 + v * Math.cos(t * 77) * 0.005);
    celuR.rotation.set(0, -0.35 + v * Math.sin(t * 70) * 0.05, 0);
    const luz = Math.max(sg(t, T.vibra1, T.vibra1 + 0.1) * (1 - sg(t, T.vibra1 + 2.2, T.vibra1 + 2.5)), sg(t, T.vibra2, T.vibra2 + 0.1) * (1 - sg(t, T.aCamara, T.aCamara + 0.3)), sg(t, T.vibra3, T.vibra3 + 0.1));
    pantR.emissiveIntensity = luz * 0.9;
    vib.visible = v > 0;
    if (vib.visible) { vib.position.set(x0, MOSTRADOR.y + 0.03, z0); vib.rotation.y = -0.35; vib.scale.setScalar(0.85 + Math.abs(Math.sin(t * 20)) * 0.25); }
  }

  // ---- el cartel: se hamaca un poco cuando lo señalan; recuadro verde de selección ----
  {
    const sel = bk(sg(t, T.cartel, T.cartel + 0.3)) * (1 - eio(sg(t, T.asiente[1] - 0.1, T.asiente[1] + 0.2)));
    cartel.rotation.z = Math.sin((t - T.cartel) * 9) * 0.05 * Math.exp(-Math.max(0, t - T.cartel) * 2.2) * (t > T.cartel ? 1 : 0) + Math.sin(t * 1.3) * 0.006;
    cartel.scale.setScalar(1 + 0.06 * pulso(t, T.cartel, 0.35) + 0.04 * pulso(t, T.burbuja2 + 0.1, 0.35));
    const entra = bk(sg(t, T.cartel, T.cartel + 0.3)), sale = eio(sg(t, T.asiente[1] - 0.1, T.asiente[1] + 0.15));
    // en el push-in el cartel sube y sale por arriba (si no, tapa medio primer plano)
    cartel.position.y = CARTEL_Y + eio(sg(t, T.pushIn[0], T.pushIn[1])) * 0.7;
    cartel.visible = !ADENTRO.has(planoActual); // de adentro tapaba medio plano (y nadie lo extraña)
    marcoSel.visible = entra > 0.01 && sale < 0.5 && !ADENTRO.has(planoActual);
    marcoSel.scale.set(lerp(1.25, 1, cl(entra)) * (1 + sale * 0.3), lerp(1.5, 1, cl(entra)) * (1 + sale * 0.3), 1);
  }

  // ---- contador 3D (arriba, pegado a la cámara) ----
  {
    const s = bk(sg(t, T.contador, T.contador + 0.35));
    contador.visible = s > 0.002;
    contador.position.set(0, 0.15, -0.72);
    contador.scale.setScalar(0.135 * Math.max(0.001, s) * (1 + 0.1 * pulso(t, T.cuenta47, 0.25) + 0.14 * pulso(t, T.cuenta48, 0.3)));
    numMat.emissiveIntensity = 0.25 + 1.2 * pulso(t, T.cuenta48, 0.45) + 0.6 * pulso(t, T.cuenta47, 0.35);
    contador.rotation.set(-0.06 + Math.sin(t * 1.1) * 0.03, Math.sin(t * 0.8) * 0.12, Math.sin(t * 0.6) * 0.012);
    const n = t >= T.cuenta48 ? "48" : t >= T.cuenta47 ? "47" : "46";
    for (const k in NUMS) NUMS[k].visible = k === n;
    // el número nuevo entra girando
    const giro = t >= T.cuenta48 ? sg(t, T.cuenta48, T.cuenta48 + 0.22) : sg(t, T.cuenta47, T.cuenta47 + 0.22);
    NUMS[n].rotation.x = (t >= T.cuenta47 ? (1 - eo(giro)) * -Math.PI * 0.5 : 0);
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
