// Capa 3D de tres-segundos (Three.js r170 local). Base: reels/caso-pedidosya.
// Todo se dibuja desde el tiempo del timeline (hf-seek): renderAt(t) es una función pura de t, el azar va
// con semilla. Objetos de marca (navy, verde, crema; rojo apagado solo para el problema): el cronómetro de
// mano (caja crema, bisel navy, corona con botón verde, aguja verde, la zona después del 3 en rojo apagado),
// el celular gigante con la ruedita de carga, las visitas (siluetas low-poly), el 53 %, la parada de ómnibus
// genérica, el pulgar, la pizzería genérica con la campanita, la caja de pizza, los marcos de foto pesados,
// el tilde, la página rápida con horario, fotos y WhatsApp (en texto, sin el ícono de la app).
// Google solo se nombra en la capa HTML (pill "Fuente: Google").
//
// Tres lugares y la cámara que viaja entre ellos en una curva continua: el ESTUDIO (0,0,0: cronómetro,
// visitas, celular de las fotos pesadas, cierre), la PARADA (a la izquierda) y la PIZZERÍA (a la derecha).
// Cuando el celular llena la pantalla queda pegado a la cámara (pantalla completa con los bordes a la vista).
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { E, W, DUR } from "./tiempos3d.js";
import { crearPersonaje, ELENCO, PIEL, PELO, MARCA, poseEn, mezclar, CARA } from "./personajes.js";

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.6, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const S = E; // inicios de escena
const D2R = Math.PI / 180;
let semilla = 3053;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const en = (t, a, b) => t >= a && t < b;

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 400);
const VH = 2 * Math.tan(15 * D2R); // alto visible por unidad de distancia

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x070b14);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, Math.PI / 2.4, 0xfff1dc, 2.4);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xbcd6ff, 1.8);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.2);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ color: 0x15233d, side: THREE.DoubleSide }));
  top.position.y = 9; top.rotation.x = Math.PI / 2; env.add(top);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.55;

const key = new THREE.DirectionalLight(0xffe3c2, 2.6); key.position.set(-4, 6, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0x9cc4ff, 2.3); rim.position.set(5, 3, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0x2c4270, 0x0b1220, 0.9); scene.add(fill);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xb5544a, white: 0xffffff, gris: 0x6b7385 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.5), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.65),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.52), edge: mat(C.edge, 0.5),
  red: mat(C.red, 0.58), white: mat(C.white, 0.5), gris: mat(C.gris, 0.62),
  num: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.22 }), oscuro: mat(0x131a26, 0.7),
  luz: new THREE.MeshStandardMaterial({ color: 0xfff0d0, emissive: 0xffe2a8, emissiveIntensity: 1.6, roughness: 0.4 }),
  piso: mat(0x131d31, 0.85),
};
const ACEITUNA = mat(0x7a9a35, 0.35);
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };

const sombraTex = (() => {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const x = c.getContext("2d"); const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(2,4,10,0.75)"); gr.addColorStop(0.5, "rgba(2,4,10,0.35)"); gr.addColorStop(1, "rgba(2,4,10,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const sombra = (w, d) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, opacity: 1 }));
  m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m;
};
const PISO = -1.55;
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
function apoyar(som, x, z, s, op = 1, y = PISO) { som.visible = s > 0.002; if (!som.visible) return; som.position.set(x, y + 0.005, z); som.scale.setScalar(Math.max(0.001, s)); som.material.opacity = op * cl(s); }

const font = new FontLoader().parse(LEXEND);
const DIG = Array.from({ length: 10 }, (_, d) => {
  const g = new TextGeometry(String(d), { font, size: 1, depth: 0.3, curveSegments: 6, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.028, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -0.15); return g;
});
const DIGP = Array.from({ length: 4 }, (_, d) => { // números chatos del dial
  const g = new TextGeometry(String(d), { font, size: 0.3, depth: 0.04, curveSegments: 5, bevelEnabled: false });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, 0); return g;
});
// "?" hecho a mano (la fuente 3D solo trae dígitos): un tubo curvo y un punto
const pregGeo = (() => {
  const pts = [[-0.25, 0.3], [-0.19, 0.5], [0, 0.59], [0.21, 0.5], [0.26, 0.3], [0.13, 0.13], [0.0, 0.03], [0, -0.13]].map(([x, y]) => new THREE.Vector3(x, y, 0));
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.085, 12, false);
})();
const puntoGeo = new THREE.SphereGeometry(0.1, 16, 12);


// ================= CRONÓMETRO DE MANO =================
// cara hacia +z; la aguja marca 0 arriba, 1 a la derecha, 2 abajo, 3 a la izquierda (una vuelta = 4 marcas);
// la zona del 3 al 4 (cuadrante de arriba a la izquierda) es rojo apagado.
const crono = new THREE.Group(); scene.add(crono);
const R_CR = 1.5;
const zonaMat = mat(C.red, 0.5, { emissive: C.red, emissiveIntensity: 0.0 });
const dialMat = mat(C.white, 0.45);
const biselMat = mat(C.navy3, 0.45);
const agujaMat = mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.15 });
const estelaMat = mat(0xc9d3e6, 0.5);
const aguja = new THREE.Group();
const estela = new THREE.Mesh(new THREE.BufferGeometry(), estelaMat);
const botonCr = new THREE.Group();
const numsCr = [];
const pregCr = grupo(new THREE.Mesh(pregGeo, M.g), mesh(puntoGeo, M.g, 0, -0.36, 0));
{
  crono.add(mesh(new THREE.CylinderGeometry(R_CR, R_CR, 0.5, 72).rotateX(Math.PI / 2), M.cr, 0, 0, 0));
  crono.add(mesh(new THREE.TorusGeometry(R_CR, 0.15, 20, 96), biselMat, 0, 0, 0.25));
  crono.add(mesh(new THREE.CylinderGeometry(R_CR - 0.1, R_CR - 0.1, 0.04, 72).rotateX(Math.PI / 2), dialMat, 0, 0, 0.26));
  const zona = new THREE.Mesh(new THREE.RingGeometry(0.98, 1.3, 40, 1, Math.PI / 2, Math.PI / 2), zonaMat); zona.position.z = 0.285; crono.add(zona);
  estela.position.z = 0.29; crono.add(estela);
  for (let i = 0; i < 16; i++) {
    const mayor = i % 4 === 0, a = Math.PI / 2 - (i / 16) * Math.PI * 2;
    const m = mesh(rbox(mayor ? 0.11 : 0.06, mayor ? 0.3 : 0.16, 0.05, 0.02), mayor ? M.navy : M.cr3, Math.cos(a) * 1.16, Math.sin(a) * 1.16, 0.3);
    m.rotation.z = a - Math.PI / 2; crono.add(m);
  }
  for (let d = 0; d < 4; d++) {
    const a = Math.PI / 2 - d * (Math.PI / 2);
    const m = mesh(DIGP[d], M.navy, Math.cos(a) * 0.76, Math.sin(a) * 0.76, 0.29); crono.add(m); numsCr.push(m);
  }
  aguja.add(mesh(rbox(0.1, 1.2, 0.06, 0.03), agujaMat, 0, 0.45, 0));
  aguja.add(mesh(rbox(0.1, 0.32, 0.06, 0.03), agujaMat, 0, -0.2, 0));
  aguja.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 24).rotateX(Math.PI / 2), M.navy, 0, 0, 0.04));
  aguja.position.z = 0.33; crono.add(aguja);
  pregCr.position.set(0, 0.06, 0.4); pregCr.scale.setScalar(1.25); crono.add(pregCr);
  // corona, botón verde y aro
  crono.add(mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.3, 16), M.cr3, 0, R_CR + 0.18, 0));
  const corona = mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.24, 18), M.navy3, 0, R_CR + 0.4, 0); crono.add(corona);
  botonCr.add(mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.16, 24), M.g, 0, 0, 0));
  botonCr.position.y = R_CR + 0.58; crono.add(botonCr);
  crono.add(mesh(new THREE.TorusGeometry(0.34, 0.075, 12, 36), M.cr3, 0, R_CR + 0.98, 0));
  // botones de los costados
  [45, 135].forEach((g) => { const a = g * D2R; const b = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 14), M.navy3, Math.cos(a) * (R_CR + 0.12), Math.sin(a) * (R_CR + 0.12), 0); b.rotation.z = a - Math.PI / 2; crono.add(b); });
}
const estelaGeo = {};
function ponerAguja(m, colorEstela) {
  aguja.rotation.z = -m * (Math.PI / 2);
  const k = Math.round(cl(m / 4) * 120);
  if (!estelaGeo[k]) estelaGeo[k] = new THREE.RingGeometry(0.2, 0.9, Math.max(3, k), 1, Math.PI / 2 - (k / 120) * Math.PI * 2, (k / 120) * Math.PI * 2);
  estela.geometry = estelaGeo[k]; estela.visible = k > 0;
  estelaMat.color.set(colorEstela);
}
const cronoSombra = sombra(3.6, 1.4);

// ================= CELULAR =================
const PW = 1.56, PH = 3.16;
const celMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.78 });
const bordeMat = mat(C.edge, 0.5, { emissive: C.g, emissiveIntensity: 0 });
const cel = (() => {
  const cuerpo = mesh(rbox(PW + 0.1, PH + 0.1, 0.16, 0.2, 4), M.navy);
  const borde = mesh(rbox(PW + 0.16, PH + 0.16, 0.12, 0.22, 4), bordeMat, 0, 0, -0.02);
  const pant = mesh(new THREE.PlaneGeometry(PW - 0.06, PH - 0.06), celMat, 0, 0, 0.082);
  const cam = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16).rotateX(Math.PI / 2), M.oscuro, 0, PH / 2 - 0.07, 0.085);
  return grupo(borde, cuerpo, pant, cam);
})();
scene.add(cel);
const celSombra = sombra(2.4, 1.0);
// la ruedita de carga (roja apagada) y la flecha "atrás" (gris), pegadas a la pantalla
const ruedita = new THREE.Group();
{
  const arco = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.055, 12, 48, Math.PI * 1.5), mat(C.red, 0.45, { emissive: C.red, emissiveIntensity: 0.25 }));
  const pista = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 8, 48), mat(0xe4e2d6, 0.6));
  ruedita.add(pista, arco); ruedita.position.set(0, 0.42, 0.13); cel.add(ruedita);
}
const flecha = new THREE.Group();
{
  flecha.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.05, 28).rotateX(Math.PI / 2), M.cr3, 0, 0, 0));
  const a = mesh(rbox(0.2, 0.05, 0.05, 0.02), M.navy3, -0.02, 0.05, 0.04); a.rotation.z = 0.75; flecha.add(a);
  const b = mesh(rbox(0.2, 0.05, 0.05, 0.02), M.navy3, -0.02, -0.05, 0.04); b.rotation.z = -0.75; flecha.add(b);
  flecha.position.set(-0.5, -1.36, 0.12); cel.add(flecha);
}
// los marcos de foto pesados (viven pegados al celular, que está acostado)
const marcos = [];
let fotoTex = [];
for (let i = 0; i < 4; i++) {
  const fm = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.25 });
  const g = grupo(mesh(rbox(1.5, 1.12, 0.26, 0.06), M.cr2), mesh(new THREE.PlaneGeometry(1.22, 0.86), fm, 0, 0, 0.135));
  g.userData.fm = fm; cel.add(g); marcos.push(g);
}
// el tilde grande de "rápida"
const tilde = grupo(mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.16, 40).rotateX(Math.PI / 2), M.g));
{ const a = mesh(rbox(0.36, 0.15, 0.1, 0.05), M.navy, -0.15, -0.06, 0.1); a.rotation.z = -0.8; tilde.add(a);
  const b = mesh(rbox(0.66, 0.15, 0.1, 0.05), M.navy, 0.1, 0.03, 0.1); b.rotation.z = 0.9; tilde.add(b); }
scene.add(tilde);

// ================= VISITAS (gente del mismo estilo que el elenco, más chica) =================
// Del mismo módulo de personajes (reels/abren-hoy/assets/personajes.js). Miran el celular de espaldas; las que se
// van giran hacia la cámara con cara de fastidio, se ponen grises y salen caminando de costado.
const VIS_CFG = [
  { piel: PIEL.clara, pelo: PELO.castaño, peinado: "coleta", camisa: MARCA.navy3, pantalon: MARCA.navy2, labios: 0xb5555a },
  { piel: PIEL.trigueña, pelo: PELO.negro, peinado: "corto", camisa: MARCA.cr, pantalon: 0x3a3f4a },
  { piel: PIEL.morena, pelo: PELO.negro, peinado: "rodete", camisa: MARCA.g, pollera: MARCA.navy3, pantalon: null, labios: 0x8e3f3c },
  { piel: PIEL.media, pelo: PELO.canoso, peinado: "pelado", bigote: PELO.gris, camisa: MARCA.cr2, pantalon: MARCA.navy2, panza: 1.12 },
  { piel: PIEL.clara, pelo: PELO.rubio, peinado: "mediaCola", camisa: MARCA.navy2, pantalon: MARCA.navy3, labios: 0xc0505a },
  { piel: PIEL.media, pelo: PELO.castaño, peinado: "jopo", camisa: MARCA.g, pantalon: MARCA.navy2 },
  { piel: PIEL.trigueña, pelo: PELO.negro, peinado: "rulos", camisa: MARCA.cr, pollera: MARCA.navy2, pantalon: null, lentes: MARCA.navy2 },
  { piel: PIEL.clara, pelo: PELO.gris, peinado: "corto", camisa: MARCA.navy3, pantalon: 0x3a3f4a, lentes: MARCA.navy2 },
  { piel: PIEL.morena, pelo: PELO.negro, peinado: "texturado", camisa: MARCA.cr2, pantalon: MARCA.navy3 },
  { piel: PIEL.media, pelo: PELO.castaño, peinado: "coletaAlta", camisa: MARCA.g, pantalon: MARCA.navy2 },
];
const VIS = [];
const GRIS_C = new THREE.Color(C.gris);
{
  const filas = [[-1.12, 1.7], [-0.56, 1.75], [0.0, 1.8], [0.56, 1.75], [1.12, 1.7], [-0.86, 0.95], [-0.28, 1.0], [0.28, 1.0], [0.86, 0.95], [1.3, 0.9]].map(([x, z]) => [x * 0.82, z]); // sin cortarse en el borde
  filas.forEach(([x, z], i) => {
    const pj = crearPersonaje({ nombre: "Visita" + i, ...VIS_CFG[i] }); scene.add(pj.raiz);
    const mats = []; pj.raiz.traverse((o) => { if (o.isMesh && !mats.includes(o.material)) mats.push(o.material); });
    mats.forEach((m) => (m.userData.base = m.color.clone()));
    VIS.push({ pj, mats, x, z, sale: [0, 2, 4, 5, 7, 9].includes(i), s: sombra(0.9, 0.6), gris: -1 });
  });
}
const visGris = (v, k) => { if (Math.abs(k - v.gris) < 0.004) return; v.gris = k; v.mats.forEach((m) => m.color.copy(m.userData.base).lerp(GRIS_C, k * 0.75)); };

// ================= 53 % =================
const pct = new THREE.Group(); scene.add(pct);
{
  const M53 = mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.18 }); // verde de marca (contraste sobre navy)
  pct.add(mesh(DIG[5], M53, -1.05, 0, 0)); pct.add(mesh(DIG[3], M53, -0.27, 0, 0));
  const aro = new THREE.TorusGeometry(0.15, 0.065, 12, 24);
  pct.add(mesh(aro, M53, 0.52, 0.28, 0)); pct.add(mesh(aro, M53, 0.96, -0.28, 0));
  const barra = mesh(rbox(0.12, 1.05, 0.14, 0.05), M53, 0.74, 0, 0); barra.rotation.z = -0.5; pct.add(barra);
}
// los números 1, 2, 3 de "uno, dos, tres"
const cuenta = [1, 2, 3].map((d) => { const m = new THREE.Mesh(DIG[d], d === 3 ? mat(C.red, 0.45, { emissive: C.red, emissiveIntensity: 0.2 }) : M.num); scene.add(m); return m; });

// ================= LA PARADA (genérica, sin número de línea) =================
const PAR = new THREE.Vector3(-4.6, 0, -3);
const parada = new THREE.Group(); parada.position.copy(PAR); scene.add(parada);
{
  parada.add(mesh(rbox(6.2, 0.16, 3.0, 0.05), M.piso, 0.2, PISO - 0.08, 0.2)); // vereda
  parada.add(mesh(rbox(6.2, 0.2, 0.22, 0.04), M.cr3, 0.2, PISO - 0.02, 1.7)); // cordón
  parada.add(mesh(rbox(3.3, 1.9, 0.08, 0.04), M.navy3, 0, PISO + 1.35, -0.75)); // panel de atrás
  parada.add(mesh(rbox(3.3, 0.12, 0.1, 0.04), M.cr2, 0, PISO + 2.3, -0.72));
  [-1.62, 1.62].forEach((x) => parada.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.75, 12), M.cr2, x, PISO + 1.37, -0.7)));
  // techo curvo verde
  const sh = new THREE.Shape(); const R0 = 2.4, R1 = 2.56, a0 = -0.42, a1 = 0.42;
  sh.moveTo(Math.sin(a0) * R0, Math.cos(a0) * R0);
  for (let a = a0; a <= a1 + 1e-6; a += 0.05) sh.lineTo(Math.sin(a) * R0, Math.cos(a) * R0);
  for (let a = a1; a >= a0 - 1e-6; a -= 0.05) sh.lineTo(Math.sin(a) * R1, Math.cos(a) * R1);
  sh.closePath();
  const tg = new THREE.ExtrudeGeometry(sh, { depth: 3.6, bevelEnabled: false }); tg.translate(0, 0, -1.8); tg.rotateY(Math.PI / 2);
  const techo = mesh(tg, M.g, 0, PISO + 2.75 - 2.45, -0.35); parada.add(techo);
  // cielorraso navy debajo del techo (desde abajo no se ve verde: en el primer plano el subtítulo queda sobre oscuro)
  { const sh2 = new THREE.Shape(); const r0 = 2.34, r1 = 2.395;
    sh2.moveTo(Math.sin(a0) * r0, Math.cos(a0) * r0);
    for (let a = a0; a <= a1 + 1e-6; a += 0.05) sh2.lineTo(Math.sin(a) * r0, Math.cos(a) * r0);
    for (let a = a1; a >= a0 - 1e-6; a -= 0.05) sh2.lineTo(Math.sin(a) * r1, Math.cos(a) * r1);
    sh2.closePath();
    const cg = new THREE.ExtrudeGeometry(sh2, { depth: 3.56, bevelEnabled: false }); cg.translate(0, 0, -1.78); cg.rotateY(Math.PI / 2);
    parada.add(mesh(cg, M.navy3, 0, PISO + 2.75 - 2.45, -0.35)); }
  // banco
  parada.add(mesh(rbox(2.3, 0.1, 0.42, 0.04), M.cr, 0, PISO + 0.58, -0.45));
  [-0.95, 0.95].forEach((x) => parada.add(mesh(rbox(0.08, 0.55, 0.3, 0.03), M.cr3, x, PISO + 0.28, -0.45)));
  // cartel de parada: poste y chapa crema con franja verde y un ómnibus dibujado
  parada.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.3, 12), M.cr3, 1.95, PISO + 1.65, 0.6));
  const chapa = new THREE.Group(); chapa.position.set(1.95, PISO + 3.0, 0.62); parada.add(chapa);
  chapa.add(mesh(rbox(0.86, 1.0, 0.07, 0.06), M.cr, 0, 0, 0));
  chapa.add(mesh(rbox(0.86, 0.2, 0.08, 0.04), M.g, 0, 0.38, 0.005));
  chapa.add(mesh(rbox(0.56, 0.32, 0.05, 0.06), M.navy3, 0, -0.08, 0.05));
  chapa.add(mesh(rbox(0.42, 0.1, 0.05, 0.02), M.cr2, 0, -0.02, 0.07));
  [-0.16, 0.16].forEach((x) => chapa.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 14).rotateX(Math.PI / 2), M.navy, x, -0.26, 0.07)));
}
// la persona de la parada: Nico (el empleado del elenco, de civil: misma cara, mismo pelo) con el celular en la mano izquierda
const YO_S = 1.42;
const nico = crearPersonaje({ ...ELENCO.empleado, camisa: MARCA.g }); nico.raiz.scale.setScalar(YO_S); scene.add(nico.raiz);
const yo = nico.raiz;
const _mw = new THREE.Vector3();
// globito con hambre: una porción de pizza de muzzarella con aceitunas
const globo = new THREE.Group(); scene.add(globo);
{
  const nube = mesh(new THREE.SphereGeometry(0.62, 28, 18), M.white, 0, 0, 0); nube.scale.set(1.25, 0.95, 0.42); globo.add(nube);
  globo.add(mesh(new THREE.SphereGeometry(0.12, 14, 10), M.white, -0.36, -0.72, 0));
  globo.add(mesh(new THREE.SphereGeometry(0.07, 12, 8), M.white, -0.42, -0.9, 0));
}
const porcion = new THREE.Group();
{
  const sh = new THREE.Shape(); sh.moveTo(0, -1.0); sh.lineTo(-0.72, 0.42); sh.quadraticCurveTo(0, 0.7, 0.72, 0.42); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, curveSegments: 16 });
  porcion.add(new THREE.Mesh(g, mat(0xf1d896, 0.5)));
  const borde = new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-0.74, 0.43, 0.08), new THREE.Vector3(0, 0.74, 0.08), new THREE.Vector3(0.74, 0.43, 0.08)), 24, 0.12, 10);
  porcion.add(new THREE.Mesh(borde, mat(0xc99a5e, 0.6)));
  // muzzarella con aceitunas verdes (pizza uruguaya): aceitunas enteras, no aros
  const ace = new THREE.SphereGeometry(0.085, 14, 10);
  [[-0.22, 0.2], [0.25, 0.24], [0.02, -0.28], [-0.02, 0.43], [0.08, -0.02]].forEach(([x, y]) => { const o = mesh(ace, ACEITUNA, x, y, 0.2); o.scale.set(1, 0.8, 0.7); porcion.add(o); });
  porcion.scale.setScalar(0.5); porcion.position.set(0.02, 0.0, 0.3); globo.add(porcion);
}

// ================= LA CUADRA entre la parada y la pizzería (vereda, faroles, un árbol) =================
// Solo se ve en los viajes de cámara entre los dos lugares: que la cámara nunca pase por un cuadro vacío.
const cuadra = new THREE.Group(); scene.add(cuadra);
{
  cuadra.add(mesh(rbox(9.6, 0.14, 2.6, 0.05), M.piso, 0, PISO - 0.09, PAR.z + 0.5));
  cuadra.add(mesh(rbox(9.6, 0.2, 0.22, 0.04), M.cr3, 0, PISO - 0.02, PAR.z + 1.9));
  const farol = (x) => {
    const g = new THREE.Group(); g.position.set(x, 0, PAR.z + 1.45); cuadra.add(g);
    g.add(mesh(new THREE.CylinderGeometry(0.07, 0.09, 3.6, 10), M.cr3, 0, PISO + 1.8, 0));
    g.add(mesh(rbox(0.56, 0.1, 0.1, 0.03), M.cr3, 0.2, PISO + 3.58, 0));
    g.add(mesh(new THREE.SphereGeometry(0.17, 16, 10), M.luz, 0.42, PISO + 3.45, 0));
  };
  // (los faroles se sacaron: la lámpara quedaba como una bola suelta en el borde de cuadro)
  const arbol = new THREE.Group(); arbol.position.set(-0.9, 0, PAR.z + 0.7); cuadra.add(arbol);
  arbol.add(mesh(new THREE.CylinderGeometry(0.12, 0.16, 2.2, 8), mat(0x6b4a33, 0.8, { flatShading: true }), 0, PISO + 1.1, 0));
  const copa = mat(C.gd, 0.7, { flatShading: true });
  [[0, 2.6, 0, 0.95], [-0.55, 2.2, 0.1, 0.65], [0.55, 2.3, -0.1, 0.7]].forEach(([x, y, z, r]) => arbol.add(mesh(new THREE.IcosahedronGeometry(r, 0), copa, x, PISO + y, z)));
  arbol.add(mesh(rbox(0.9, 0.1, 0.9, 0.03), M.cr3, 0, PISO + 0.0, 0));
}

// ================= PULGAR (low-poly) =================
const pulgar = new THREE.Group(); scene.add(pulgar);
{
  const m = mat(C.cr, 0.6, { flatShading: true });
  pulgar.add(mesh(new THREE.CylinderGeometry(0.2, 0.24, 1.3, 8), m, 0, -0.65, 0));
  pulgar.add(mesh(new THREE.IcosahedronGeometry(0.205, 1), m, 0, 0, 0));
  const una = mesh(rbox(0.24, 0.3, 0.06, 0.05), M.cr2, 0, -0.06, 0.17); una.rotation.x = -0.15; pulgar.add(una);
  pulgar.add(mesh(rbox(0.72, 1.0, 0.42, 0.18), m, 0.3, -1.45, -0.05));
  pulgar.add(mesh(rbox(0.8, 0.5, 0.5, 0.12), M.navy3, 0.3, -2.1, -0.05)); // puño de la manga
}

// ================= PIZZERÍA (genérica) con la campanita y la caja =================
const PIZ = new THREE.Vector3(4.6, 0, -3);
const EST2 = new THREE.Vector3(PIZ.x - 0.6, 0, PIZ.z + 3.2); // el celular de las fotos pesadas, delante de la pizzería
const vidrioMat = new THREE.MeshStandardMaterial({ color: 0x0c1526, emissive: 0xffe2a8, emissiveIntensity: 0.9, roughness: 0.35 });
const cartelMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.35 });
const pizzeria = new THREE.Group(); pizzeria.position.copy(PIZ); scene.add(pizzeria);
const toldo = [mat(C.g, 0.55), mat(C.cr, 0.6)];
{
  const g = pizzeria;
  g.add(mesh(rbox(5.4, 0.16, 2.6, 0.05), M.piso, 0, PISO - 0.08, 0.6));
  g.add(mesh(rbox(3.6, 3.3, 1.0, 0.06), M.cr2, 0, PISO + 1.65, -0.5));
  g.add(mesh(rbox(3.75, 0.62, 1.1, 0.06), M.navy3, 0, PISO + 3.3, -0.45));
  g.add(mesh(new THREE.PlaneGeometry(2.6, 0.46), cartelMat, 0, PISO + 3.3, 0.105));
  for (let i = 0; i < 9; i++) { const r = mesh(rbox(0.4, 0.1, 0.8, 0.03), toldo[i % 2], (i - 4) * 0.4, PISO + 2.72, 0.28); r.rotation.x = 0.42; g.add(r); }
  g.add(mesh(new THREE.PlaneGeometry(2.0, 1.25), vidrioMat, -0.55, PISO + 1.75, 0.012)); // ventanilla
  g.add(mesh(rbox(0.85, 2.1, 0.08, 0.04), M.navy3, 1.2, PISO + 1.05, 0.02)); // puerta
  g.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), M.cr, 0.92, PISO + 1.05, 0.08));
  g.add(mesh(rbox(2.4, 0.14, 0.72, 0.04), M.cr, -0.55, PISO + 1.06, 0.3)); // mostrador de la ventanilla
  g.add(mesh(rbox(2.3, 0.9, 0.1, 0.04), M.cr3, -0.55, PISO + 0.55, 0.05));
  // la pizza en la ventanilla (adentro, iluminada)
  {
    const pz = new THREE.Group(); pz.position.set(-0.8, PISO + 1.9, 0.06); pz.rotation.x = Math.PI / 2; pz.scale.setScalar(0.85); g.add(pz);
    pz.add(mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.06, 36), mat(0xf1d896, 0.5)));
    pz.add(mesh(new THREE.TorusGeometry(0.46, 0.06, 10, 36).rotateX(Math.PI / 2), mat(0xc99a5e, 0.6), 0, 0.02, 0));
    const ac = new THREE.SphereGeometry(0.06, 12, 8);
    [[0.15, 0.1], [-0.2, 0.15], [0.05, -0.22], [-0.12, -0.08], [0.25, -0.15]].forEach(([x, z]) => { const o = mesh(ac, ACEITUNA, x, 0.06, z); o.scale.set(1, 0.7, 0.8); pz.add(o); });
  }
}
const campana = new THREE.Group(); scene.add(campana);
const campMat = mat(C.cr, 0.3, { metalness: 0.35 });
{
  campana.add(mesh(new THREE.CylinderGeometry(0.36, 0.38, 0.1, 32), M.navy3, 0, 0.05, 0));
  const dom = mesh(new THREE.SphereGeometry(0.31, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), campMat, 0, 0.1, 0); dom.scale.y = 0.55; campana.add(dom);
  campana.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.16, 10), M.cr3, 0, 0.33, 0)); // vástago
  campana.add(mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.07, 20), M.cr2, 0, 0.43, 0)); // el botón que se aprieta (timbre de mostrador)
}
const cajaPizza = new THREE.Group(); scene.add(cajaPizza);
const CAJA_S = 0.56;
const tapaPizza = new THREE.Group();
const cartonMat = mat(0xe3d3b0, 0.7), cartonTapa = mat(0xece0c2, 0.7, { emissive: 0xece0c2, emissiveIntensity: 0.22 }); // el interior de la tapa no queda negro
{
  cajaPizza.add(mesh(rbox(1.9, 0.06, 1.9, 0.02), cartonMat, 0, 0.03, 0));
  [[0, 0.93, 1.9, 0.06], [0, -0.93, 1.9, 0.06], [0.93, 0, 0.06, 1.9], [-0.93, 0, 0.06, 1.9]].forEach(([x, z, w, d]) => cajaPizza.add(mesh(rbox(w, 0.38, d, 0.02), cartonMat, x, 0.19, z)));
  // la pizza adentro (se ve al abrir)
  cajaPizza.add(mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.07, 40), mat(0xf1d896, 0.48), 0, 0.1, 0));
  cajaPizza.add(mesh(new THREE.TorusGeometry(0.82, 0.08, 10, 40).rotateX(Math.PI / 2), mat(0xc99a5e, 0.6), 0, 0.13, 0));
  const ace = new THREE.SphereGeometry(0.085, 14, 10);
  for (let i = 0; i < 7; i++) { const a = i * 0.9 + 0.3, r = 0.25 + (i % 3) * 0.17; const o = mesh(ace, ACEITUNA, Math.cos(a) * r, 0.16, Math.sin(a) * r); o.scale.set(1, 0.7, 0.8); cajaPizza.add(o); }
  const t = mesh(rbox(1.92, 0.07, 1.92, 0.03), cartonTapa, 0, 0.035, 0.96); tapaPizza.add(t);
  tapaPizza.add(mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.02, 32), M.navy3, 0, 0.075, 0.96));
  tapaPizza.add(mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.025, 32), M.cr, 0, 0.08, 0.96));
  tapaPizza.position.set(0, 0.38, -0.96); cajaPizza.add(tapaPizza);
}
const cajaSombra = sombra(3.0, 2.4);
const campSombra = sombra(1.0, 0.7);

// ================= PANTALLAS (canvas) =================
const P = {};
const hoja = () => { const c = document.createElement("canvas"); c.width = 720; c.height = 1458; return c; };
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const pantCanvas = hoja(), pc = pantCanvas.getContext("2d");
const pantTex = new THREE.CanvasTexture(pantCanvas); pantTex.colorSpace = THREE.SRGBColorSpace; pantTex.anisotropy = 4;
celMat.map = pantTex; celMat.emissiveMap = pantTex;
let pantClave = "";
// ESTADO = false: la barra de estado (hora, batería) se tapa mientras el celular cruza la franja de los subtítulos
let ESTADO = true;
function pantalla(clave, pintar) { clave += ESTADO ? "" : "-ns"; if (clave === pantClave) return; pantClave = clave; pintar(pc); if (!ESTADO) { pc.fillStyle = "#0b1220"; pc.fillRect(0, 0, 720, 112); } pantTex.needsUpdate = true; }
function pizzaDib(x, cx, cy, r) {
  x.fillStyle = "#c99a5e"; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#f1d896"; x.beginPath(); x.arc(cx, cy, r * 0.86, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#e9c46f"; [[-0.3, -0.2, 0.18], [0.35, 0.1, 0.14], [-0.05, 0.42, 0.16], [0.2, -0.45, 0.12]].forEach(([a, b, s]) => { x.beginPath(); x.arc(cx + a * r, cy + b * r, s * r, 0, Math.PI * 2); x.fill(); });
  [[-0.45, 0.1], [0.1, -0.15], [0.5, -0.35], [0.4, 0.45], [-0.2, -0.55], [-0.35, 0.5], [0.05, 0.25]].forEach(([a, b]) => { x.fillStyle = "#5f7f27"; x.beginPath(); x.ellipse(cx + a * r, cy + b * r, r * 0.1, r * 0.08, 0.4, 0, Math.PI * 2); x.fill(); x.fillStyle = "#93b44a"; x.beginPath(); x.arc(cx + a * r - r * 0.025, cy + b * r - r * 0.02, r * 0.03, 0, Math.PI * 2); x.fill(); });
}
const tickDib = (x, cx, cy, r, fondo = "#5ce611", trazo = "#0b1220") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = trazo; x.lineWidth = r * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.45, cy + r * 0.02); x.lineTo(cx - r * 0.1, cy + r * 0.38); x.lineTo(cx + r * 0.5, cy - r * 0.36); x.stroke(); };
async function dibujarPantallas() {
  await document.fonts.load('700 60px "Lexend"');
  await document.fonts.load('800 60px "Lexend"');
  await document.fonts.load('500 40px "IBM Plex Mono"');
  const logo = await new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = "assets/logo-blanco.png"; });
  const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
  // navegador: barra navy arriba (alta, ahí se apoyan los subtítulos) y barra de abajo con "atrás"
  const nav = (x, url, cargando) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, 720, 420);
    x.fillStyle = "#efeee5"; x.font = F(700, 50); x.textAlign = "left"; x.fillText("21:40", 44, 80); x.fillRect(590, 50, 80, 32);
    x.fillStyle = "#1f3254"; rr(x, 30, 286, 660, 112, 56);
    x.fillStyle = "#cdd7ea"; x.font = F(700, 56); x.fillText(url, 74, 362);
    if (cargando) { x.fillStyle = "#b5544a"; x.fillRect(0, 412, 150, 8); }
    x.fillStyle = "#0b1220"; x.fillRect(0, 1318, 720, 140);
  };
  P.blanco = hoja(); { const x = P.blanco.getContext("2d"); x.fillStyle = "#ffffff"; x.fillRect(0, 0, 720, 1458); nav(x, "pizzería cerca", true); }
  P.busca = hoja(); {
    const x = P.busca.getContext("2d"); x.fillStyle = "#efeee5"; x.fillRect(0, 0, 720, 1458); nav(x, "pizzería cerca", false);
    [480, 760, 1040].forEach((y, i) => { x.fillStyle = "#ffffff"; rr(x, 36, y, 648, 240, 30); x.fillStyle = i === 0 ? "#5ce611" : "#1f3254"; rr(x, 64, y + 30, 380, 40, 14); x.fillStyle = "#b4b2a3"; rr(x, 64, y + 100, 560, 26, 10); rr(x, 64, y + 146, 460, 26, 10); });
  }
  P.otra = hoja(); {
    const x = P.otra.getContext("2d"); x.fillStyle = "#efeee5"; x.fillRect(0, 0, 720, 1458); nav(x, "otra página", false);
    x.fillStyle = "#1f3254"; rr(x, 36, 456, 648, 330, 34);
    x.fillStyle = "#16243d"; rr(x, 36, 820, 648, 64, 20); x.fillStyle = "#b4b2a3"; rr(x, 36, 910, 520, 34, 12); rr(x, 36, 962, 440, 34, 12);
    x.fillStyle = "#16243d"; rr(x, 36, 1030, 310, 250, 30); rr(x, 374, 1030, 310, 250, 30);
  }
  P.vieja = hoja(); {
    const x = P.vieja.getContext("2d"); x.fillStyle = "#d4d3cb"; x.fillRect(0, 0, 720, 1458); nav(x, "tu página", true);
    x.fillStyle = "#9b9a90"; x.fillRect(20, 440, 680, 90); x.fillStyle = "#7d7c74"; x.fillRect(40, 474, 520, 22);
    x.fillStyle = "#b5b4ab"; x.fillRect(20, 550, 330, 300); x.strokeStyle = "#8a8980"; x.lineWidth = 6; x.beginPath(); x.moveTo(40, 570); x.lineTo(330, 830); x.moveTo(330, 570); x.lineTo(40, 830); x.stroke();
    for (let i = 0; i < 13; i++) { x.fillStyle = "#a3a29a"; x.fillRect(370, 560 + i * 22, 300 - (i % 3) * 40, 9); }
    for (let i = 0; i < 16; i++) { x.fillStyle = "#a3a29a"; x.fillRect(20, 880 + i * 24, 660 - (i % 4) * 70, 9); }
  }
  // la página rápida: horario, foto y WhatsApp (en texto, sin el ícono de la app); con tildes de a una
  const rapida = (n) => {
    const c = hoja(), x = c.getContext("2d");
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 720, 1458); nav(x, "tu página", false);
    x.fillStyle = "#0b1220"; x.font = F(800, 66); x.fillText("Tu pizzería", 44, 512);
    // horario
    x.fillStyle = "#ffffff"; rr(x, 36, 548, 648, 150, 30);
    x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.arc(110, 623, 34, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(110, 623); x.lineTo(110, 603); x.moveTo(110, 623); x.lineTo(126, 632); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(800, 54); x.fillText("Abierto hoy", 168, 614); x.fillStyle = "#3d475e"; x.font = F(700, 46); x.fillText("de 19 a 24 h", 168, 672);
    // foto
    x.fillStyle = "#16243d"; rr(x, 36, 724, 648, 400, 30); pizzaDib(x, 360, 924, 170);
    // WhatsApp
    x.fillStyle = "#5ce611"; rr(x, 36, 1152, 648, 136, 40); x.fillStyle = "#0b1220"; x.font = F(800, 54); x.textAlign = "center"; x.fillText("Pedí por WhatsApp", 330, 1240); x.textAlign = "left";
    if (n >= 1) tickDib(x, 630, 623, 34);
    if (n >= 2) tickDib(x, 630, 776, 34);
    if (n >= 3) tickDib(x, 648, 1220, 26, "#0b1220", "#5ce611");
    return c;
  };
  P.rap = [0, 1, 2, 3].map(rapida);
  // fotos de los marcos (pizza y la vidriera)
  fotoTex = [0, 1].map((k) => {
    const c = document.createElement("canvas"); c.width = 512; c.height = 360; const x = c.getContext("2d");
    if (k === 0) { x.fillStyle = "#16243d"; x.fillRect(0, 0, 512, 360); pizzaDib(x, 256, 180, 150); }
    else { x.fillStyle = "#1f3254"; x.fillRect(0, 0, 512, 360); x.fillStyle = "#d9d7c9"; x.fillRect(90, 90, 332, 270); for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? "#efeee5" : "#5ce611"; x.fillRect(80 + i * 59, 70, 59, 50); } x.fillStyle = "#ffe2a8"; x.fillRect(120, 170, 160, 110); x.fillStyle = "#1f3254"; x.fillRect(310, 170, 80, 190); }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  });
  marcos.forEach((g, i) => { const fm = g.userData.fm; fm.map = fotoTex[i % 2]; fm.emissiveMap = fotoTex[i % 2]; fm.needsUpdate = true; });
  // la videollamada (cierre)
  P.llamada = hoja(); {
    const x = P.llamada.getContext("2d"); x.fillStyle = "#0b1220"; x.fillRect(0, 0, 720, 1458);
    x.fillStyle = "#efeee5"; x.font = F(600, 34); x.fillText("10:00", 48, 70); x.fillRect(600, 46, 64, 26);
    x.fillStyle = "#16243d"; rr(x, 36, 110, 648, 760, 40);
    if (logo) { const w = 420, h = (logo.height / logo.width) * w; x.drawImage(logo, 360 - w / 2, 490 - h / 2, w, h); }
    x.fillStyle = "#1f3254"; rr(x, 36, 900, 648, 360, 40);
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(360, 1040, 70, 0, Math.PI * 2); x.fill(); rr(x, 250, 1120, 220, 110, 55);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(360, 1360, 62, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; rr(x, 330, 1338, 60, 44, 10);
  }
  // cartel de la pizzería
  {
    const c = document.createElement("canvas"); c.width = 1024; c.height = 180; const x = c.getContext("2d");
    x.fillStyle = "#1f3254"; x.fillRect(0, 0, 1024, 180); x.fillStyle = "#efeee5"; x.font = F(800, 120); x.textAlign = "center"; x.fillText("PIZZERÍA", 512, 135);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; cartelMat.map = t; cartelMat.emissiveMap = t; cartelMat.needsUpdate = true;
  }
}
const pagina = (nombre) => pantalla(nombre, (x) => x.drawImage(P[nombre], 0, 0));
const paginaRap = (n) => pantalla("rap" + n, (x) => x.drawImage(P.rap[n], 0, 0));

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ, modo]: curva Catmull-Rom continua (la
// cámara nunca se frena del todo ni corta), con la distancia en escala logarítmica.
const CAM = [
  [0, -14, 6, 16.0, 0, 1.2, 0],
  [W[6], -7, 5, 15.4, 0, 1.15, 0],
  [W[10] - 0.05, -2, 6, 14.8, 0, 0.95, 0],
  [S["s02-mitad"] - 0.25, -9, 13, 10.8, 0, 0.9, 0.3],
  [W[18], 4, 14, 11.2, 0, 0.9, 0.3],
  [W[21] + 0.62, 9, 12, 11.4, 0, 0.9, 0.2, "e"],
  [S["s03-parada"] + 0.1, 6, 7, 15.8, PAR.x + 0.4, 0.3, PAR.z + 0.3],
  [W[29], -3, 7, 15.2, PAR.x + 0.4, 0.3, PAR.z + 0.3],
  [S["s04-blanco"] + 0.1, -6, 7, 13.8, PAR.x + 0.4, 0.3, PAR.z + 0.3],
  [S["s05-atras"], -9, 6, 13.2, PAR.x + 0.4, 0.3, PAR.z + 0.3],
  [S["s05-atras"] + 0.45, -12, 2, 5.4, PAR.x + 0.75, 0.5, PAR.z + 1.25],
  // corte limpio en "Y nunca": del primer plano de Nico a la pizzería (antes el viaje pasaba por cuadros sin protagonista)
  [S["s06-avisa"] - 0.005, -16, 2, 5.0, PAR.x + 0.75, 0.52, PAR.z + 1.25, "c"],
  [S["s06-avisa"], -16, 8, 12.4, PIZ.x - 0.1, 0.25, PIZ.z + 0.4],
  [S["s06-avisa"] + 0.9, -13, 9, 12.8, PIZ.x - 0.1, 0.25, PIZ.z + 0.4],
  [S["s07-venta"] - 0.5, -10, 10, 13.0, PIZ.x - 0.1, 0.25, PIZ.z + 0.4],
  [S["s07-venta"] - 0.08, -2, 16, 8.4, PIZ.x - 0.06, -0.3, PIZ.z + 0.45],
  // corte limpio en "Pasa": de la caja al celular acostado
  [S["s08-pesadas"] - 0.005, 3, 20, 8.9, PIZ.x - 0.06, -0.3, PIZ.z + 0.45, "c"],
  [S["s08-pesadas"], 4, 32, 8.3, EST2.x, -0.62, EST2.z + 0.2],
  [W[61], -4, 34, 8.3, EST2.x, -0.66, EST2.z + 0.2],
  [S["s09-rapida"] + 0.32, -6, 16, 9.4, EST2.x, 0.3, EST2.z + 0.2],
  [W[67], 6, 8, 8.8, EST2.x, 0.6, EST2.z + 0.1],
  // corte limpio en "Misma parada": del celular de s09 a la parada (antes el viaje cortaba a Nico y al árbol)
  [S["s10-abre"] - 0.005, 8, 8, 9.0, EST2.x, 0.6, EST2.z + 0.1, "c"],
  [S["s10-abre"], 6, 7, 13.0, PAR.x + 0.05, 0.62, PAR.z + 0.9],
  [W[75], 2, 6, 12.6, PAR.x + 0.05, 0.62, PAR.z + 0.95],
  [S["s11-pagina"] + 0.3, -4, 6, 12.4, PAR.x + 0.05, 0.62, PAR.z + 0.95],
  // corte limpio en "¿Cuánto": de la página a pantalla completa al cronómetro gigante
  [S["s12-tuya"] - 0.005, -8, 6, 12.4, PAR.x + 0.05, 0.62, PAR.z + 0.95, "c"],
  [S["s12-tuya"], -10, 6, 14.2, 0, 0.55, 0],
  [S["s13-llamada"] - 0.2, 4, 5, 12.6, 0, 0.78, 0],
  [S["s13-llamada"] + 0.6, 2, 5, 13.0, 0, 0.15, 0],
  [DUR, 0, 5, 12.6, 0, 0.1, 0],
];
const _mira = new THREE.Vector3();
const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6]];
function ponerCamara(t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = val(a), p2 = val(b);
  // "e" = tramo de viaje con ease propio; los tramos vecinos llegan y salen con tangente suave (no se pasan)
  // "c" = corte: se sostiene la clave hasta la siguiente y ahí salta (los vecinos no la usan de tangente)
  const p0 = i > 0 && CAM[i - 1][7] !== "e" && CAM[i - 1][7] !== "c" ? val(CAM[i - 1]) : p1;
  const p3 = i + 2 < CAM.length && b[7] !== "e" && b[7] !== "c" ? val(CAM[i + 2]) : p2;
  const u2 = u * u, u3 = u2 * u;
  const v = a[7] === "c" ? p1 : a[7] === "e" ? p1.map((q, j) => lerp(q, p2[j], eio(u))) : p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
  const [az, el, ld, tx, ty, tz] = v;
  const d = Math.exp(ld);
  _mira.set(tx, ty, tz);
  camera.position.set(tx + d * Math.cos(el * D2R) * Math.sin(az * D2R), ty + d * Math.sin(el * D2R), tz + d * Math.cos(el * D2R) * Math.cos(az * D2R));
  camera.position.x += Math.sin(t * 0.7) * 0.04; camera.position.y += Math.sin(t * 0.53) * 0.025;
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  camera.updateMatrixWorld();
  return d;
}

// ---------- pantalla completa: el celular (y lo que va encima) pegado a la cámara ----------
const DP = 6.25; // distancia del celular a la cámara: llena el alto con el borde a la vista
const _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _e = new THREE.Euler();
const frente = (x, y, z) => new THREE.Vector3(x, y, -z).applyMatrix4(camera.matrixWorld);
function pegar(o, x, y, z, rx = 0, ry = 0, rz = 0) {
  o.position.copy(frente(x, y, z));
  _q.setFromEuler(_e.set(rx, ry, rz)); o.quaternion.copy(camera.quaternion).multiply(_q);
}
// coordenadas de pantalla del celular a pantalla completa (x, y en unidades del celular) → mundo
const enPantalla = (x, y, z) => frente(x, y, DP - z);

// ================= NICO EN LA PARADA =================
// pose en el tiempo (claves de poseEn) y la mano izquierda (con el celular) en coordenadas del mundo
const SOSTIENE = { manoI: [0.25, 0.2, 0.34], codoI: [0.7, -0.7, -0.3], dedoI: 0 };
const MIRA_CEL = { cabeza: { giro: 0.42, asiente: 0.3, ladea: 0.06 }, ojos: { abiertos: 0.9, x: 0.7, y: -0.8 } };
const BRAZO_D = { manoD: [-0.29, -0.06, 0.06], codoD: null, dedoD: 0 };
let NK = null;
function clavesNico() {
  const S3 = S["s03-parada"], S4 = S["s04-blanco"], S5 = S["s05-atras"], S6 = S["s06-avisa"], S10 = S["s10-abre"];
  const tipea = { manoD: [0.17, 0.28, 0.42], codoD: [-0.7, -0.7, -0.2], dedoD: 1 };
  const panza = { manoD: [-0.02, 0.14, 0.27], codoD: [-0.8, -0.5, 0.1], dedoD: 0 };
  const cerca = { manoI: [0.27, 0.29, 0.38], codoI: [0.8, -0.6, -0.2] };
  return [
    [0, { ...SOSTIENE, ...BRAZO_D, ...CARA.concentrada, ...MIRA_CEL }],
    [W[24] + 0.1, { ...tipea }, 0.25],
    [W[27], { ...BRAZO_D }, 0.3],
    [W[28] + 0.05, { ...panza, ...CARA.esperanza, cabeza: { giro: 0.12, asiente: 0.05, ladea: -0.12 }, ojos: { abiertos: 1, x: 0.2, y: 0.3 }, cejas: { alto: 0.7, ang: 0.8 }, boca: { sonrisa: -0.25, abierta: 0.15, ancho: 0.8 } }, 0.3],
    [S4 - 0.05, { ...BRAZO_D, ...CARA.concentrada, ...MIRA_CEL }, 0.3],
    // s05 · "se cansa": primer plano, fastidio; toca "atrás" y después otro resultado
    [S5 + 0.3, { ...cerca, ...CARA.fastidio, cabeza: { giro: 0.4, asiente: 0.22, ladea: 0.12 }, ojos: { abiertos: 0.45, tension: -0.25, x: 0.7, y: -0.7 }, inclina: -0.05 }, 0.35],
    [W[37] + 0.05, { manoD: [0.2, 0.44, 0.44], codoD: [-0.7, -0.6, -0.2], dedoD: 1 }, 0.25],
    [W[39] - 0.05, { manoD: [0.21, 0.4, 0.44] }, 0.25],
    [W[40], { ...CARA.sonrisa, cabeza: { giro: 0.4, asiente: 0.22, ladea: -0.08 }, ojos: { abiertos: 0.85, feliz: 0.3, x: 0.7, y: -0.7 } }, 0.3],
    [S6 + 0.5, { ...BRAZO_D, ...SOSTIENE }, 0.4],
    // s10 · misma parada: sostiene el celular; en "abre" sorpresa y en "al toque" feliz
    [S10 + 0.2, { ...SOSTIENE, ...BRAZO_D, ...CARA.concentrada, ...MIRA_CEL }, 0.05],
    [W[73] + 0.1, { ...CARA.sorpresa, cabeza: { giro: 0.3, asiente: 0.1, ladea: 0 }, ojos: { abiertos: 1, x: 0.6, y: -0.5 } }, 0.2],
    [W[74] + 0.1, { ...CARA.feliz, cabeza: { giro: 0.22, asiente: 0.05, ladea: -0.1 }, ojos: { abiertos: 0.9, feliz: 0.55, x: 0.5, y: -0.4 }, panza: 0 }, 0.25],
  ];
}
function ponerNico(t) {
  if (!NK) NK = clavesNico();
  const S5 = S["s05-atras"], S6 = S["s06-avisa"], S10 = S["s10-abre"], S12 = S["s12-tuya"];
  const on1 = en(t, W[21] + 0.6, S6 + 0.6), on2 = en(t, S10, S12);
  let s = 0;
  if (on1) s = bk(sg(t, W[21] + 0.6, W[21] + 0.95));
  if (on2) s = 1; // corte limpio: la parada ya está
  const p = poseEn(t, NK);
  // los toques del índice en la pantalla
  const toque = Math.max(Math.sin(Math.PI * sg(t, W[37] + 0.05, W[37] + 0.25)), Math.sin(Math.PI * sg(t, W[39] + 0.0, W[39] + 0.2)));
  if (toque > 0) p.manoD = [p.manoD[0], p.manoD[1], p.manoD[2] - 0.015 * toque];
  // el tipeo: el índice salta
  if (en(t, W[24] + 0.1, W[27] - 0.2)) p.manoD = [p.manoD[0], p.manoD[1] + Math.sin(t * 34) * 0.012, p.manoD[2]];
  // la mano en la panza: frota
  if (en(t, W[28] + 0.05, S["s04-blanco"] - 0.3)) p.manoD = [p.manoD[0] + Math.sin(t * 9) * 0.02, p.manoD[1], p.manoD[2]];
  p.x = PAR.x + 0.55; p.y = PISO; p.z = PAR.z + 1.1; p.giro = -0.15 + Math.sin(t * 0.7) * 0.04;
  nico.poner(p);
  yo.visible = s > 0.002; yo.scale.setScalar(Math.max(0.001, s) * YO_S);
  yo.updateMatrixWorld(true);
  nico.mano("I").getWorldPosition(_mw);
  return _mw.clone().add(new THREE.Vector3(0.0, 0.13, 0.05));
}

// ================= ESCENA EN EL TIEMPO =================
const MARCAS1 = [W[6] / 3, (2 * W[6]) / 3, W[6]]; // la aguja del gancho pasa el 1, el 2 y el 3
function renderAt(t) {
  scene.environmentRotation.y = t * 0.12;
  ponerCamara(t);
  const S2 = S["s02-mitad"], S3 = S["s03-parada"], S4 = S["s04-blanco"], S5 = S["s05-atras"], S6 = S["s06-avisa"], S7 = S["s07-venta"], S8 = S["s08-pesadas"], S9 = S["s09-rapida"], S10 = S["s10-abre"], S11 = S["s11-pagina"], S12 = S["s12-tuya"], S13 = S["s13-llamada"];

  // ---------------- CELULAR ----------------
  ESTADO = true;
  let celOn = false, celS = 0, celSombraOn = false;
  ruedita.visible = false; flecha.visible = false; marcos.forEach((m) => (m.visible = false));
  bordeMat.emissiveIntensity = 0;
  cel.quaternion.identity();
  // posición de la mano de la persona de la parada (el celular en la mano)
  const mano = ponerNico(t);
  // en el primer plano de s05 el celular crece un poco en la mano (que se lea la pantalla)
  const cercaCel = eio(sg(t, S5 - 0.02, S5 + 0.42)) * (1 - eio(sg(t, S6 - 0.3, S6 + 0.1)));
  const MANO_S = 0.15 + 0.05 * cercaCel, MANO_R = [0.12, -0.42 + 0.1 * cercaCel, 0];
  const enMano = () => { cel.position.copy(mano); cel.rotation.set(...MANO_R); };
  // viaje de un lugar a otro: el celular pasa por el centro del cuadro (siempre entero y grande) y recién al final baja a la mano
  // (pegado a la cámara mientras la cámara gira: así no se va de cuadro ni pasa un cuadro vacío)
  const porCentro = (p0, va, d0 = 8.4, y0 = 0) => {
    const C = frente(0, -0.25, 8.6);
    if (va < 0.55) { const k = eio(va / 0.55); cel.position.lerpVectors(p0, frente(0, lerp(y0, -0.25, k), lerp(d0, 8.6, k)), Math.min(1, va / 0.12)); }
    else cel.position.lerpVectors(C, mano, eio((va - 0.55) / 0.45));
  };
  // a pantalla completa (fs = 0..1 entre la mano y la pantalla completa)
  const zambullida = (u, rz = 0, ry = 0) => {
    enMano(); const p0 = cel.position.clone(), q0 = cel.quaternion.clone();
    pegar(cel, 0, 0, DP, 0, ry, rz); const p1 = cel.position.clone(), q1 = cel.quaternion.clone();
    cel.position.lerpVectors(p0, p1, u); cel.quaternion.slerpQuaternions(q0, q1, u);
    return lerp(MANO_S, 1.0, u);
  };
  if (t < S3 + 0.65) {
    // s01 → s02: el celular-vidriera crece desde el centro del cronómetro; s03: viaja a la mano
    const nace = bk(sg(t, W[10] - 0.05, W[10] + 0.4));
    if (nace > 0.002) {
      celOn = true;
      let x = 0, y = 0.55, z = 0, s = 0.95 * nace, ry = Math.sin(t * 0.8) * 0.12;
      // "se va": retrocede un poco y baja para dejar lugar al 53 %
      const baja = eio(sg(t, W[15] - 0.6, W[15] - 0.1));
      y = lerp(y, -0.35, baja); s *= lerp(1, 0.8, baja);
      // la visita que se queda: el celular viaja a la mano (travelling a la parada)
      const va = eio(sg(t, W[21] + 0.62, S3 + 0.1));
      if (va > 0.02 && va < 0.98) ESTADO = false;
      cel.position.set(x, y, z); cel.rotation.set(0, ry, 0);
      if (va > 0) { const p0 = cel.position.clone(); enMano(); porCentro(p0, va, 11.0, -1.0); cel.rotation.set(lerp(0, MANO_R[0], va), lerp(ry, MANO_R[1], va), 0); s = lerp(lerp(s, 0.62, eio(sg(va, 0, 0.4))), MANO_S, eio(sg(va, 0.5, 1))); }
      celS = s; celSombraOn = va < 0.4;
      if (va > 0.5) pagina("busca"); else { pagina("blanco"); ruedita.visible = true; }
    }
  } else if (t < S6 + 0.58) {
    celOn = true;
    if (t < S4 - 0.08) { enMano(); celS = MANO_S; pagina("busca"); }
    else {
      // s04 · zambullida: pantalla en blanco a pantalla completa; s05 · "se cansa": vuelve a la mano (primer plano de Nico)
      const u = eio(sg(t, S4 - 0.08, S4 + 0.5)) * (1 - eio(sg(t, S5 - 0.02, S5 + 0.42)));
      celS = zambullida(u, 0, Math.sin(t * 0.9) * 0.03 * u);
      if (u > 0.02 && u < 0.985) ESTADO = false;
      if (t >= S5 - 0.02) {
        celS = lerp(MANO_S, 1.0, Math.pow(u, 3)); // al volver a la mano se achica antes de cruzar la cara
        // y baja por debajo de la cara (curva hacia abajo y a la derecha), nunca por delante de ella
        const arco = Math.sin(Math.PI * u) * (u < 0.98 ? 1 : 0);
        cel.position.add(new THREE.Vector3(0.3 * arco, -0.85 * arco, 0).applyQuaternion(camera.quaternion));
      }
      celSombraOn = false;
      // páginas: blanco con la ruedita → toca "atrás" (vuelven los resultados) → toca otro resultado (otra página)
      const T1 = W[37] + 0.12, T2 = W[39] + 0.1;
      const d1 = eio(sg(t, T1, T1 + 0.28)), d2 = eio(sg(t, T2, T2 + 0.28));
      if (d1 <= 0) { pagina("blanco"); ruedita.visible = u > 0.3 || t >= S5; flecha.visible = true; }
      else if (d1 < 1) { const k = Math.round(d1 * 40); pantalla("desliza" + k, (x) => { x.drawImage(P.blanco, (k / 40) * 720, 0); x.drawImage(P.busca, (k / 40) * 720 - 720, 0); }); }
      else if (d2 <= 0) pagina("busca");
      else if (d2 < 1) { const k = Math.round(d2 * 40); pantalla("entra" + k, (x) => { x.drawImage(P.busca, -(k / 40) * 720, 0); x.drawImage(P.otra, 720 - (k / 40) * 720, 0); }); }
      else pagina("otra");
    }
  } else if (en(t, S8, S10 + 0.9)) {
    // s08 · acostado en el estudio, le caen los marcos; s09 · se levanta y las fotos entran comprimidas
    celOn = true;
    const llega = t >= S8 ? 1 : 0; // corte: ya está acostado
    const para = eio(sg(t, S9 - 0.05, S9 + 0.42));
    let x = EST2.x, y = lerp(-0.9, 0.4, para), z = EST2.z + 0.2, rx = lerp(-1.05, 0, para), ry = lerp(0.1, Math.sin(t * 0.8) * 0.1, para), rz = 0;
    // hundimiento con cada marco, rebote al final
    const CAIDAS = [0, 1, 2, 3].map((k) => W[60] + 0.05 + k * 0.2);
    let hunde = 0; CAIDAS.forEach((c, k) => { hunde += 0.07 * eio(sg(t, c + 0.12, c + 0.24)); });
    const rebote = Math.sin(Math.PI * sg(t, CAIDAS[3] + 0.24, CAIDAS[3] + 0.6)) * 0.12;
    y -= (hunde - rebote) * (1 - para);
    y = lerp(-4.5, y, llega);
    cel.position.set(x, y, z); cel.rotation.set(rx, ry, rz); celS = 1.0;
    celSombraOn = true;
    // página: vieja → (fotos que entran) → rápida
    const entra = sg(t, S9 + 0.3, S9 + 0.9);
    if (entra >= 1) { paginaRap(0); bordeMat.emissiveIntensity = 0.9 * eio(sg(t, W[67] - 0.1, W[67] + 0.3)); }
    else pagina("vieja");
    // marcos: caen uno por uno (en coordenadas del celular: z es la normal de la pantalla)
    marcos.forEach((m, k) => {
      const c = CAIDAS[k];
      if (t < c) return;
      const u = sg(t, c, c + 0.24); const caida = u * u;
      const POS = [[-0.1, 0.15], [0.05, -0.45], [-0.12, -0.95], [0.05, 0.4]][k];
      let zx = POS[0], zy = POS[1], zz = lerp(0.9, 0.25 + k * 0.27, caida), s = 1, rr2 = [0.4, -0.3, 0.25, -0.15][k] * (1 - caida) + [0.08, -0.1, 0.05, -0.06][k];
      // s09 · se comprimen y entran a la pantalla como tarjetas
      const comp = eio(sg(t, S9 + 0.05 + k * 0.08, S9 + 0.75 + k * 0.05));
      if (comp > 0) { s = lerp(1, 0.3, comp); zx = lerp(zx, 0, comp); zy = lerp(zy, -0.1, comp); zz = lerp(zz, 0.1, comp); rr2 = lerp(rr2, 0, comp); }
      m.visible = comp < 0.98; m.position.set(zx, zy, zz); m.rotation.set(0, 0, rr2); m.scale.setScalar(s);
    });
    // s10 · vuelve a la parada: el celular viaja del estudio a la mano
    // s10 · corte limpio a la parada: el celular ya está en la mano de Nico
    if (t >= S10) { enMano(); celS = MANO_S; celSombraOn = false; }
  } else if (en(t, S10 + 0.9, S12)) {
    celOn = true;
    // s10 · "al toque": zambullida a pantalla completa; s11 · la página entera con tildes
    const u = eio(sg(t, W[75] - 0.05, W[75] + 0.45));
    celS = zambullida(u, 0, Math.sin(t * 0.9) * 0.03);
    if (u > 0.02 && u < 0.985) ESTADO = false;
    const n = t >= W[80] ? 3 : t >= W[78] ? 2 : t >= W[77] ? 1 : 0;
    paginaRap(n);
    bordeMat.emissiveIntensity = 0.6;
    // s12 · se va hacia abajo
    // sigue a pantalla completa hasta el corte de s12
  } else if (t >= S13 - 0.06) {
    // cierre: el celular con la videollamada
    celOn = true;
    const e = lerp(0.6, 1, bk(sg(t, S13 - 0.06, S13 + 0.22)));
    cel.position.set(0, -0.02, 0.4); cel.rotation.set(-0.05, Math.sin(t * 0.8) * 0.1, 0); celS = 0.98 * e;
    pagina("llamada"); celSombraOn = true;
  }
  ocultar(cel, celOn ? celS : 0);
  if (ruedita.visible) ruedita.rotation.z = -t * 7;
  apoyar(celSombra, cel.position.x, cel.position.z, celSombraOn && celOn ? celS : 0, 0.55, PISO);

  // ---------------- CRONÓMETRO ----------------
  {
    let s = 0, m = 0, colorEst = 0xc9d3e6, preg = false, zona = 0.0, pulsa = 0;
    numsCr.forEach((n) => n.material = M.navy);
    if (t < W[10] + 0.6) {
      // gancho: gigante, la aguja ya corriendo; pasa el 1, el 2 y el 3 y entra en la zona roja
      s = 1;
      m = t < W[6] ? 0.08 + (3 - 0.08) * (t / W[6]) : 3 + 0.85 * eo(sg(t, W[6], W[10] + 0.4));
      zona = eo(sg(t, W[6], W[6] + 0.25));
      pulsa = Math.sin(Math.PI * sg(t, W[6] - 0.05, W[6] + 0.15));
      crono.position.set(0, -0.15, 0); crono.rotation.set(0.04, -0.12 + Math.sin(t * 0.9) * 0.08, 0);
      // "celular": se achica y se mete en el celular (se vuelve la ruedita)
      const va = eio(sg(t, W[10] - 0.05, W[10] + 0.35));
      if (va > 0) { crono.position.lerp(new THREE.Vector3(0, 0.55 + 0.42 * 0.95, 0.3), va); s = lerp(1, 0.1, va); }
      if (va > 0.55) s = 0;
      s *= 1 + 0.04 * Math.sin(Math.PI * sg(t, W[6] - 0.05, W[6] + 0.25));
      apoyar(cronoSombra, crono.position.x, 0.2, s * (1 - va), 0.75);
    } else if (en(t, S4 + 0.2, S5 + 0.45)) {
      // s04 · sobre la pantalla en blanco: cuenta uno, dos, tres
      s = t < S4 + 0.2 || t >= S5 + 0.02 ? 0 : 0.25 * lerp(0.6, 1, bk(sg(t, S4 + 0.2, S4 + 0.5))) * lerp(1, 0.55, eio(sg(t, S5 - 0.12, S5 + 0.02)));
      const A = S4 + 0.55;
      m = t < W[33] ? lerp(0, 1, eio(sg(t, A, W[33]))) : t < W[34] ? 1 + eio(sg(t, W[33] + 0.08, W[34])) : t < W[35] ? 2 + eio(sg(t, W[34] + 0.08, W[35])) : 3 + 0.6 * eo(sg(t, W[35] + 0.05, S5 + 0.3));
      zona = eo(sg(t, W[35], W[35] + 0.25));
      pulsa = [W[33], W[34], W[35]].reduce((a, w) => Math.max(a, Math.sin(Math.PI * sg(t, w - 0.03, w + 0.15))), 0);
      pegar(crono, 0, -0.82, DP - 0.6, 0.05, Math.sin(t * 1.1) * 0.12, 0);
      // (se achica en su lugar: antes bajaba y quedaba cortado por el borde de abajo)
      cronoSombra.visible = false;
    } else if (en(t, S10 + 0.2, W[75] + 0.2)) {
      // s10 · misma parada: arranca en "abre" y frena EN VERDE mucho antes del 1
      s = (t < S10 + 0.45 || t >= W[75] + 0.06 ? 0 : 0.4 * lerp(0.6, 1, bk(sg(t, S10 + 0.45, S10 + 0.7)))) * lerp(1, 0.55, eio(sg(t, W[75] - 0.1, W[75] + 0.06)));
      m = 1.85 * eo(sg(t, W[73], W[73] + 0.36));
      colorEst = C.g;
      pulsa = Math.sin(Math.PI * sg(t, W[73] + 0.32, W[73] + 0.5));
      crono.position.set(PAR.x - 0.42, 0.3, PAR.z + 2.3); crono.rotation.set(0.05, 0.1 + Math.sin(t * 0.9) * 0.08, 0);
      cronoSombra.visible = false;
    } else if (en(t, S12, S13 + 0.2)) {
      // s12 · "¿cuánto tarda la tuya?": gigante otra vez, con un "?" verde en lugar de la aguja
      s = t < S12 ? 0 : 0.95 * lerp(0.82, 1, bk(sg(t, S12, S12 + 0.22)));
      preg = true;
      crono.position.set(0, -0.25, 0); crono.rotation.set(0.04, Math.sin(t * 1.2) * 0.22, 0);
      pulsa = Math.max(Math.sin(Math.PI * sg(t, S12 + 0.58, S12 + 0.78)), Math.sin(Math.PI * sg(t, S12 + 1.4, S12 + 1.6)));
      // cierre: sale hacia arriba
      const sale = eio(sg(t, S13 - 0.22, S13 - 0.08));
      crono.rotation.z = -sale * 0.6; s *= lerp(1, 0.55, sale); if (t >= S13 - 0.08) s = 0;
      apoyar(cronoSombra, 0, 0.2, s * (1 - sale), 0.75);
    } else cronoSombra.visible = false;
    ocultar(crono, s);
    aguja.visible = !preg; pregCr.visible = preg; if (preg) { pregCr.rotation.y = Math.sin(t * 1.6) * 0.5; pregCr.scale.setScalar(1.25 * (1 + 0.18 * pulsa)); }
    ponerAguja(preg ? 0 : m, colorEst);
    estela.visible = estela.visible && !preg;
    zonaMat.emissiveIntensity = 0.55 * zona;
    biselMat.color.set(C.navy3).lerp(new THREE.Color(C.red), zona * 0.85);
    if (colorEst === C.g && t >= W[73] + 0.34) biselMat.color.set(C.g);
    botonCr.position.y = R_CR + 0.58 - 0.16 * pulsa;
  }

  // ---------------- VISITAS ----------------
  VIS.forEach((v, i) => {
    const ti = W[10] + 0.1 + (i % 5) * 0.025;
    let s = t >= ti ? 0.82 : 0; // a su tamaño; suben desde abajo de cuadro cuando el cronómetro ya se metió en el celular
    const sube = (1 - eo(sg(t, ti, ti + 0.3))) * 2.2;
    let x = v.x, z = v.z, giro = Math.PI, paso = 0, gris = 0; // de espaldas a la cámara, mirando el celular
    let cara = { ...CARA.neutra, cabeza: { giro: 0, asiente: -0.12, ladea: 0 }, ojos: { abiertos: 1, y: 0.4 } };
    if (v.sale) {
      const gira = eio(sg(t, W[14] + (i % 3) * 0.07, W[14] + 0.35 + (i % 3) * 0.07));
      const lado = x < 0 ? -1 : 1;
      giro = Math.PI - Math.PI * gira * lado;
      gris = gira;
      cara = mezclar(cara, { ...CARA.fastidio, cabeza: { giro: 0.25 * lado, asiente: 0.05, ladea: -0.1 * lado }, ojos: { abiertos: 0.5, tension: -0.3, x: 0.5 * lado } }, gira);
      const camina = sg(t, W[18] + (i % 3) * 0.06, W[18] + 0.9 + (i % 3) * 0.06);
      x += lado * 4.2 * camina * camina;
      if (camina > 0) { giro = lerp(giro, lado * Math.PI / 2, eio(sg(camina, 0, 0.25))); paso = 1; }
      s *= 1 - sg(camina, 0.85, 1);
    }
    visGris(v, gris);
    // las que se quedan: se achican con el travelling a la parada
    if (t > W[21] + 0.78) s = 0; // sin achicarse a motas: se van de cuadro con el viaje
    v.pj.raiz.visible = s > 0.002;
    if (v.pj.raiz.visible) {
      v.pj.raiz.scale.setScalar(s);
      v.pj.poner({ x, y: PISO - sube, z, giro, paso, t: t + i * 0.37, ...cara, manoI: [0.29, -0.08, 0.04], manoD: [-0.29, -0.08, 0.04] });
    }
    apoyar(v.s, x, z, s / 0.82 * 0.95, 0.6);
  });

  // ---------------- 53 % ----------------
  {
    const sp = en(t, W[15] - 0.3, W[21] + 0.36) ? 0.95 * lerp(0.6, 1, bk(sg(t, W[15] - 0.3, W[15] + 0.05))) : 0; // sale con corte seco, junto con su rótulo
    ocultar(pct, sp); pct.position.set(0.05, 2.0 + eio(sg(t, W[21] + 0.3, W[21] + 0.42)) * 0.4, 0.3); pct.rotation.set(0, Math.sin(t * 0.9) * 0.18, 0);
    if (pct.visible) pct.scale.multiplyScalar(1 + 0.06 * Math.sin(Math.PI * sg(t, W[19], W[19] + 0.3)));
  }
  // ---------------- 1 · 2 · 3 ----------------
  cuenta.forEach((m, k) => {
    const w = [W[33], W[34], W[35]][k], fin = k < 2 ? [W[34], W[35]][k] : S5 - 0.2;
    const s = en(t, w - 0.05, fin) ? 0.56 * lerp(0.6, 1, bk(sg(t, w - 0.05, w + 0.2))) : 0;
    ocultar(m, s); if (m.visible) pegar(m, 0, 1.2, DP - 0.8, 0, Math.sin(t * 1.4) * 0.25, 0);
  });

  // ---------------- PARADA y la persona ----------------
  {
    const on1 = en(t, W[21] + 0.6, S6 + 0.6), on2 = en(t, S10, S12);
    let s = 0;
    if (on1) s = bk(sg(t, W[21] + 0.6, W[21] + 0.95));
    if (on2) s = 1; // corte limpio: la parada ya está
    parada.visible = s > 0.002; if (parada.visible) parada.scale.set(1, Math.max(0.001, s), 1);
    // globito de hambre (s03, y vuelve en s10)
    const g1 = en(t, W[29] - 0.1, S5) ? lerp(0.6, 1, bk(sg(t, W[29] - 0.1, W[29] + 0.2))) : 0;
    const g2 = en(t, S10 + 0.3, S11) ? lerp(0.6, 1, bk(sg(t, S10 + 0.3, S10 + 0.55))) : 0;
    const gs = Math.max(g1, g2);
    ocultar(globo, gs); globo.position.set(PAR.x + 0.4, 1.62 + Math.sin(t * 2) * 0.05, PAR.z + 1.35); globo.scale.multiplyScalar(1.15); globo.rotation.set(0, -0.2 + Math.sin(t * 1.1) * 0.08, 0);
    porcion.rotation.set(0, 0, Math.sin(t * 2.2) * 0.12);
  }

  // ---------------- la cuadra (solo en los viajes entre lugares) ----------------
  {
    const S6v = S["s06-avisa"], S10v = S["s10-abre"], S12v = S["s12-tuya"];
    cuadra.visible = false; // (con los cortes limpios ya no hay viajes que la muestren)
  }

  // ---------------- PULGAR (s05) ----------------
  {
    const on = false; // el pulgar suelto se reemplazó por la mano de Nico
    let s = 0;
    if (on) {
      s = 1;
      // entra desde abajo a la derecha, toca "atrás" (abajo a la izquierda), toca la otra página y se va
      const P0 = [1.6, -3.4], P1 = [-0.5, -1.36 + 0.02], P2 = [0.15, 0.2], P3 = [1.8, -3.6];
      const a = eio(sg(t, S5 - 0.25, W[36] + 0.08)), b = eio(sg(t, W[36] + 0.3, W[39] + 0.1)), c = eio(sg(t, W[40] + 0.15, S6 + 0.05));
      let x = lerp(P0[0], P1[0], a), y = lerp(P0[1], P1[1], a);
      x = lerp(x, P2[0], b); y = lerp(y, P2[1], b); x = lerp(x, P3[0], c); y = lerp(y, P3[1], c);
      const toque = Math.max(Math.sin(Math.PI * sg(t, W[36] + 0.0, W[36] + 0.2)), Math.sin(Math.PI * sg(t, W[39] + 0.05, W[39] + 0.25)));
      const p = enPantalla(x, y, 0.32 - toque * 0.12);
      pulgar.position.copy(p);
      _q.setFromEuler(_e.set(0.35, 0, 0.45)); pulgar.quaternion.copy(camera.quaternion).multiply(_q);
      s = 0.92;
    }
    ocultar(pulgar, s);
  }

  // ---------------- PIZZERÍA, campanita y la caja ----------------
  {
    const on = en(t, S6 - 0.48, S8 + 0.36);
    const s = on ? bk(sg(t, S6 - 0.48, S6 - 0.1)) : 0;
    const baja = t >= S8 ? 0 : 1; // corte limpio en "Pasa": la pizzería deja de verse
    pizzeria.visible = s * baja > 0.002; if (pizzeria.visible) pizzeria.scale.set(1, Math.max(0.001, s * baja), 1);
    // la campanita: grande sobre el mostrador; en "avisa" se apaga a gris y no suena
    const cs = on && t >= S6 + 0.25 ? 1.45 * lerp(0.6, 1, bk(sg(t, S6 + 0.25, S6 + 0.5))) : 0;
    ocultar(campana, cs); campana.position.set(PIZ.x + 0.5, (PISO + 1.13) * baja, PIZ.z + 0.42); campana.rotation.set(0.1, 0, 0);
    if (campana.visible) campana.scale.y *= Math.max(0.001, baja);
    if (baja < 0.02) campana.visible = false; // se aplasta con la pizzería (nada de pop al salir)
    campMat.color.set(C.cr).lerp(new THREE.Color(C.gris), eio(sg(t, W[44], W[45] + 0.1)));
    campMat.metalness = lerp(0.35, 0.0, sg(t, W[44], W[45]));
    apoyar(campSombra, campana.position.x, campana.position.z, cs * 0.6 * (baja > 0.9 ? 1 : 0), 0.6, (PISO + 1.135) * baja);
    vidrioMat.emissiveIntensity = lerp(0.9, 0.45, eio(sg(t, W[44], W[45] + 0.2)));
    // en el push-in a la caja el cartel se apaga (pasa por detrás del subtítulo: nada de texto sobre texto)
    // en el push-in a la caja las letras del cartel se funden en su chapa navy (pasan por detrás del subtítulo: nada de texto sobre texto)
    { const k = eio(sg(t, S7 - 0.64, S7 - 0.4)); cartelMat.transparent = true; cartelMat.opacity = 1 - k; cartelMat.depthWrite = k < 0.5; }
    // la caja: cae sobre el mostrador; en "antes" la tapa intenta abrir y se cierra; se pone gris
    const cae = sg(t, S7 - 0.05, S7 + 0.3);
    const ks = en(t, S7 - 0.05, S8 + 0.36) ? CAJA_S * lerp(0.55, 1, bk(sg(t, S7 - 0.05, S7 + 0.1))) : 0;
    ocultar(cajaPizza, ks); cajaPizza.position.set(PIZ.x - 0.6, (PISO + 1.13 + (1 - bk(cae)) * 0.8) * baja, PIZ.z + 0.5);
    if (cajaPizza.visible) cajaPizza.scale.y *= Math.max(0.001, baja);
    if (baja < 0.02 && t < S10) cajaPizza.visible = false; cajaPizza.rotation.set(0, -0.25 + Math.sin(t * 0.8) * 0.04, 0);
    const abre = Math.sin(Math.PI * sg(t, W[52], W[52] + 0.55));
    tapaPizza.rotation.x = -abre * 0.55;
    const gris = eio(sg(t, W[52] + 0.5, W[55]));
    cartonMat.color.set(0xe3d3b0).lerp(new THREE.Color(C.gris), gris); cartonTapa.color.set(0xece0c2).lerp(new THREE.Color(0x868d9c), gris);
    apoyar(cajaSombra, cajaPizza.position.x, cajaPizza.position.z, ks * cae * (baja > 0.9 ? 1 : 0), 0.7, (PISO + 1.135) * baja);
    // s11 · callback: la caja vuelve ABIERTA, con la pizza, delante de la página
    if (false) { // (la caja abierta del callback se sacó: cruzaba la interfaz de la página)
      const e = bk(sg(t, W[80] + 0.05, W[80] + 0.38)) * (1 - eio(sg(t, S12 - 0.2, S12)));
      ocultar(cajaPizza, 0.25 * e);
      pegar(cajaPizza, 0.26, -0.62, DP - 0.9, 1.1, -0.15 + Math.sin(t * 1.2) * 0.1, 0);
      tapaPizza.rotation.x = -1.75;
      cartonMat.color.set(0xe3d3b0); cartonTapa.color.set(0xece0c2);
      cajaSombra.visible = false;
    }
  }

  // ---------------- tilde de "rápida" ----------------
  {
    let s = 0;
    if (en(t, W[67] - 0.05, S10 - 0.1)) {
      s = t >= S10 - 0.2 ? 0 : 0.5 * lerp(0.6, 1, bk(sg(t, W[67] - 0.05, W[67] + 0.25))) * lerp(1, 0.55, eio(sg(t, S10 - 0.4, S10 - 0.2)));
      cel.updateMatrixWorld(); tilde.position.copy(new THREE.Vector3(0.8, 0.95, 0.3).applyMatrix4(cel.matrixWorld)); tilde.quaternion.copy(cel.quaternion);
      tilde.rotateY(Math.sin(t * 1.3) * 0.25);
    } else if (en(t, W[73] + 0.34, W[75] + 0.2)) {
      s = t >= W[75] + 0.06 ? 0 : 0.32 * lerp(0.6, 1, bk(sg(t, W[73] + 0.34, W[73] + 0.58))) * lerp(1, 0.55, eio(sg(t, W[75] - 0.1, W[75] + 0.06)));
      crono.updateMatrixWorld(); tilde.position.copy(new THREE.Vector3(1.25, -1.25, 0.6).applyMatrix4(crono.matrixWorld)); tilde.rotation.set(0, Math.sin(t * 1.3) * 0.25, 0);
    }
    ocultar(tilde, s);
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
dibujarPantallas().then(() => {
  renderAt(window.__hfThreeTime || 0);
  if (window.__tresListo) window.__tresListo();
});
