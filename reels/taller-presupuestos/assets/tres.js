// Capa 3D de taller-presupuestos (Three.js r170 local). Base técnica: reels/estetica-turnos (globos pegados a la cámara
// en píxeles de pantalla, avatares por render target, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom,
// insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// UN lugar: "Mecánica Óscar", un taller de día. La pared del fondo (z = -5) de bloques navy claro con el portón abierto
// (la calle afuera, con vereda crema y un árbol), el elevador de dos columnas en el medio (el sedán crema de Sergio), el
// banco de trabajo con el pincho de presupuestos adelante a la izquierda, el panel de herramientas a la izquierda del
// portón, la pila de cubiertas a la derecha. La vereda de Sergio (Q2b) es un set chico aparte (x = 30).
//   PARTE 1: "Lo pienso y te aviso." · chac · la semana en el celular de Óscar (MARTES a VIERNES, chac, chac, chac, chac) ·
//            sábado: "Jefe, ¿a esos no los llamamos?" / "Si les interesa, llaman." · la bocina: Sergio pasa con el auto
//            arreglado ("¡Me llamaron!") · la pausa con el costo · "Lo pensó. Y me avisó." · el segundo pincho
//   PARTE 2: "Lo pienso y te aviso." / "Pensalo tranquilo." + Enviar · el presupuesto con botón · el seguimiento solo ·
//            "Justo lo estaba pensando." · Aceptar y agendar · el tablero · "Ya les escribió el sistema." · jueves 8:30:
//            "Lo pensé." / "Y me avisaste." · sube el elevador, el pincho al panel · Sofi: "Comentá PRESUPUESTO…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet, saludo } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"')]);

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const ei = (x) => x * x * x;
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const r2 = (n) => Math.round(n * 100) / 100;
const en = (t, a, b) => t >= a && t < b;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const plata = (n) => "$ " + Math.round(n).toLocaleString("es-UY").replace(/,/g, ".");

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
scene.background = new THREE.Color(0xe9ece6);   // el cielo de mediodía por el portón: liso, sin degradé
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.03, 140);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x6a6a66);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(10, 1.2, 0, 7, 0, 0, 0xf4f6f2, 1.4);
  tira(4, 6, 0, 2, -6, 0, 0xf6f6ee, 1.3);
  tira(1.4, 8, -4, 1, 6, 0, 0xe8eeff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.5;

// ---------- luces: el mediodía entra por el portón (sol frío desde atrás y arriba), cielo, relleno desde adelante ----------
const sol = new THREE.DirectionalLight(0xfff8ec, 1.55);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 0.5, far: 30 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xf8faf6, 0x8a8678, 1.75); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xf4f6ff, 0.8); relleno.position.set(2, 3.5, 9); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xfff6e6, 0.45); rim.position.set(-4, 5, -10); scene.add(rim);
function ponerSol(cx, cz) { sol.position.set(cx + 3, 9, cz - 8); sol.target.position.set(cx, 0.6, cz); sol.target.updateMatrixWorld(); }

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, gp: 0xcfeebc, red: 0xc7655b, blanco: 0xf8f7f2, metal: 0xc4c8cf };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.75), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.75), cr2: mat(C.cr2, 0.75), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  blanco: mat(C.blanco, 0.85), metal: mat(C.metal, 0.3, { metalness: 0.5 }), acero: mat(0x8f969f, 0.35, { metalness: 0.6 }), goma: mat(0x23262c, 0.85),
  madera: mat(0xb98d5e, 0.8), pared: mat(0xece9dc, 0.92), asfalto: mat(0x50545c, 0.95), hormigon: mat(0xd9d7c9, 0.85),
  paragolpe: mat(0x3a3f4a, 0.6),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const caja = (w, h, d, m, x, y, z, r = 0.02) => mesh(rbox(w, h, d, r, 2), m, x, y, z);
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const CAV = (s) => `700 ${s}px "Caveat", cursive`;
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const rr = (x, X, Y, W, H, R) => { x.beginPath(); x.roundRect(X, Y, W, H, R); x.fill(); };
// la geometría estática de un grupo, en una malla por material (SwiftShader: menos llamadas de dibujo)
function fusionar(grupo, excluir = []) {
  grupo.updateMatrixWorld(true);
  const inv = grupo.matrixWorld.clone().invert();
  const fuera = new Set(); for (const e of excluir) e.traverse((o) => fuera.add(o));
  const porMat = new Map(), quitar = [];
  grupo.traverse((o) => {
    if (!o.isMesh || fuera.has(o) || Array.isArray(o.material) || o.material.transparent || !o.visible) return;
    let p = o.parent, oculto = false; while (p && p !== grupo) { if (!p.visible) oculto = true; p = p.parent; } if (oculto) return;
    let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    for (const k of Object.keys(g.attributes)) if (!["position", "normal", "uv"].includes(k)) g.deleteAttribute(k);
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    g.applyMatrix4(inv.clone().multiply(o.matrixWorld));
    if (!porMat.has(o.material)) porMat.set(o.material, { geos: [], sombra: o.castShadow });
    porMat.get(o.material).geos.push(g); quitar.push(o);
  });
  for (const o of quitar) o.parent.remove(o);
  for (const [m, { geos, sombra }] of porMat) {
    let n = 0; for (const g of geos) n += g.attributes.position.count;
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2);
    let i = 0; for (const g of geos) { pos.set(g.attributes.position.array, i * 3); nor.set(g.attributes.normal.array, i * 3); uv.set(g.attributes.uv.array, i * 2); i += g.attributes.position.count; }
    const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3)); geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geo.computeBoundingSphere();
    const mm = new THREE.Mesh(geo, m); mm.castShadow = sombra; mm.receiveShadow = true; grupo.add(mm);
  }
}

// =====================================================================================================
// EL AUTO: sedán familiar de juguete, crema con vidrios navy, paragolpes gris oscuro, ruedas negras con llanta crema,
// patente "STR 4581". Mira hacia +z; su izquierda es +x. Origen en el piso, en el centro. Sin logo ni rejilla reconocible.
// =====================================================================================================
const patenteT = lienzo(512, 150, (x, w, h) => { x.fillStyle = "#f8f7f2"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "STR 4581", 800, 104, w - 50); x.fillText("STR 4581", w / 2, h / 2 + 4); });
const llantaT = lienzo(256, 256, (x, w) => { x.fillStyle = "#23262c"; x.fillRect(0, 0, w, w); x.fillStyle = "#efeee5"; x.beginPath(); x.arc(w / 2, w / 2, w * 0.3, 0, 7); x.fill(); x.fillStyle = "#b4b2a3"; for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; x.beginPath(); x.arc(w / 2 + Math.cos(a) * w * 0.17, w / 2 + Math.sin(a) * w * 0.17, w * 0.045, 0, 7); x.fill(); } x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, w / 2, w * 0.07, 0, 7); x.fill(); });
const ML = { carro: mat(C.cr, 0.45), vidrio: mat(0x16243d, 0.15, { metalness: 0.2 }), interior: mat(0x1f3254, 0.9), faro: new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff4d0, emissiveIntensity: 0.6, roughness: 0.2 }), llanta: new THREE.MeshStandardMaterial({ map: llantaT, roughness: 0.6 }) };
function crearAuto() {
  const g = new THREE.Group();
  const L = 3.3, W = 1.5;
  // la carrocería de abajo y el capot / baúl (más bajos que la cabina)
  g.add(caja(W, 0.5, L, ML.carro, 0, 0.53, 0, 0.16));
  g.add(caja(W - 0.04, 0.08, 1.05, ML.carro, 0, 0.77, 1.08, 0.04));          // el capot (más bajo que la cabina)
  g.add(caja(W - 0.04, 0.1, 0.75, ML.carro, 0, 0.79, -1.22, 0.05));        // el baúl
  // la cabina: techo, parantes y vidrios (la ventanilla de adelante de cada lado es aparte: se puede bajar)
  const cab = new THREE.Group(); g.add(cab);
  cab.add(caja(W - 0.1, 0.14, 1.45, ML.carro, 0, 1.28, -0.15, 0.06));   // (r1) el techo, grueso: que no parezca descapotable
  for (const sx of [-1, 1]) for (const [z, inc] of [[0.58, 0.35], [-0.12, 0], [-0.88, -0.3]]) { const p = caja(0.07, 0.44, 0.08, ML.carro, sx * (W / 2 - 0.08), 1.02, z, 0.02); p.rotation.x = inc; cab.add(p); }
  const para = caja(W - 0.18, 0.46, 0.03, ML.vidrio, 0, 1.02, 0.62, 0.02); para.rotation.x = 0.6; cab.add(para);   // parabrisas
  const luneta = caja(W - 0.18, 0.44, 0.03, ML.vidrio, 0, 1.02, -0.92, 0.02); luneta.rotation.x = -0.5; cab.add(luneta);
  const vent = {};
  for (const sx of [-1, 1]) {
    const tras = caja(0.03, 0.36, 0.66, ML.vidrio, sx * (W / 2 - 0.08), 1.02, -0.5, 0.02); cab.add(tras);
    const del = caja(0.03, 0.36, 0.6, ML.vidrio, sx * (W / 2 - 0.08), 1.02, 0.24, 0.02); cab.add(del); vent[sx] = del;
  }
  // el interior oscuro (asientos) que se ve por la ventanilla abierta
  for (const z of [0.15, -0.5]) cab.add(caja(W - 0.3, 0.42, 0.42, ML.interior, 0, 0.9, z, 0.06));
  // adelante: faros, rejilla de barras navy, paragolpes y la patente; atrás: luces y patente
  for (const sx of [-1, 1]) { const f = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.04, 20), ML.faro, sx * 0.5, 0.64, L / 2 + 0.01); f.rotation.x = Math.PI / 2; g.add(f); g.add(caja(0.26, 0.1, 0.04, M.red, sx * 0.52, 0.66, -L / 2 - 0.005, 0.02)); }
  for (let i = 0; i < 3; i++) g.add(caja(0.52, 0.035, 0.03, M.navy3, 0, 0.58 + i * 0.07, L / 2 + 0.01, 0.01));
  for (const sz of [-1, 1]) {
    g.add(caja(W + 0.04, 0.16, 0.14, M.paragolpe, 0, 0.36, sz * (L / 2 + 0.02), 0.05));
    const pat = plano(0.42, 0.123, patenteT, 0, 0.37, sz * (L / 2 + 0.095)); if (sz < 0) pat.rotation.y = Math.PI; g.add(pat);
  }
  // los espejos y las manijas
  for (const sx of [-1, 1]) { g.add(caja(0.1, 0.07, 0.12, ML.carro, sx * (W / 2 + 0.04), 0.9, 0.55, 0.02)); for (const z of [0.0, -0.7]) g.add(caja(0.02, 0.03, 0.12, M.paragolpe, sx * (W / 2 + 0.005), 0.72, z, 0.01)); }
  // las ruedas (cubierta + llanta crema), las delanteras en su grupo (giran); la delantera izquierda se puede sacar
  const ruedas = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const r = new THREE.Group(); r.position.set(sx * (W / 2 - 0.08), 0.3, sz * 1.05); g.add(r);
    const cub = mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 28), [M.goma, ML.llanta, ML.llanta]); cub.rotation.z = Math.PI / 2; r.add(cub);
    r.userData = { sx, sz }; ruedas.push(r);
  }
  g.userData = { ruedas, vent, rueda: (sx, sz) => ruedas.find((r) => r.userData.sx === sx && r.userData.sz === sz) };
  return sombras(g);
}

// =====================================================================================================
// EL TALLER
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const ZF = -5.0, HW = 4.4;                         // la pared del fondo y su alto
const PORTON = { x0: -1.95, x1: 1.55, alto: 3.0 }; // el hueco del portón
const LX = -0.2, LZ = -2.6;                        // el centro del elevador
const COL = [LX - 1.3, LX + 1.3];                  // las dos columnas (x)
const BANCO = { x: -1.82, z0: 0.9, z1: 3.3, alto: 0.94, prof: 0.7 };
const PINCHO = { x: -1.74, z: 1.18 };
const ALTO_EL = 1.8;                             // el auto levantado: la cara de arriba de los tacos
const CUB = { x: 0.62, z: 2.05 };                  // la pila de cubiertas (donde se sienta Maxi el sábado)
const PANEL = { x0: -4.6, x1: -2.5, y0: 0.95, y1: 2.15 };
const SILUETA = { x: -2.95, y: 1.18 };             // el lugar del pincho en el panel
const BOTONERA = { x: -1.62, z: -1.35 };           // el pedestal con el botón del elevador
const bloqueT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; for (let i = 0; i < 4; i++) { x.fillRect(0, i * 128, w, 6); for (let j = 0; j < 3; j++) x.fillRect(((j * 2 + (i % 2)) * 256) / 2 % w, i * 128, 6, 128); } });
bloqueT.wrapS = bloqueT.wrapT = THREE.RepeatWrapping;
const cartelT = lienzo(1200, 260, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "MECÁNICA ÓSCAR", 800, 170, w - 80); x.fillText("MECÁNICA ÓSCAR", w / 2, h / 2 + 8); x.fillStyle = "#5ce611"; x.fillRect(80, h - 34, w - 160, 14); });
{
  // piso de hormigón alisado (adentro) y la franja verde de seguridad alrededor del elevador
  const piso = mesh(new THREE.PlaneGeometry(13, 12), M.hormigon, 0, 0, 1.0); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  const franja = (w, d, x, z) => { const f = mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ color: C.g }), x, 0.004, z); f.rotation.x = -Math.PI / 2; f.castShadow = false; SET.add(f); };
  const fx0 = COL[0] - 0.45, fx1 = COL[1] + 0.45, fz0 = LZ - 2.05, fz1 = LZ + 2.05;
  franja(fx1 - fx0, 0.09, (fx0 + fx1) / 2, fz0); franja(fx1 - fx0, 0.09, (fx0 + fx1) / 2, fz1); franja(0.09, fz1 - fz0, fx0, (fz0 + fz1) / 2); franja(0.09, fz1 - fz0, fx1, (fz0 + fz1) / 2);
  // la luz del mediodía que entra por el portón: un trapecio crema plano sobre el piso (sin degradé)
  { const s = new THREE.Shape(); s.moveTo(PORTON.x0, 0); s.lineTo(PORTON.x1, 0); s.lineTo(PORTON.x1 + 0.9, 2.6); s.lineTo(PORTON.x0 + 0.5, 2.6); s.closePath();
    const luz = new THREE.Mesh(new THREE.ShapeGeometry(s), new THREE.MeshBasicMaterial({ color: 0xf6f2e4, transparent: true, opacity: 0.55, depthWrite: false })); luz.rotation.x = Math.PI / 2; luz.position.set(0, 0.006, ZF); luz.renderOrder = 1; SET.add(luz); }
  // la pared del fondo: abajo bloques navy claro hasta 2,2 m, arriba crema; con el hueco del portón
  const tramo = (x0, x1, y0, y1, z = ZF) => {
    const w = x1 - x0, h = y1 - y0;
    if (y0 < 2.2) {
      const hb = Math.min(2.2, y1) - y0, t = bloqueT.clone(); t.needsUpdate = true; t.repeat.set(w / 1.6, hb / 1.6);
      const b = mesh(new THREE.BoxGeometry(w, hb, 0.2), [M.navy2, M.navy2, M.navy2, M.navy2, new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }), M.navy2], (x0 + x1) / 2, y0 + hb / 2, z); b.castShadow = false; SET.add(b);
    }
    if (y1 > 2.2) { const y = Math.max(2.2, y0), c = mesh(new THREE.BoxGeometry(w, y1 - y, 0.2), M.pared, (x0 + x1) / 2, (y + y1) / 2, z); c.castShadow = false; SET.add(c); }
  };
  tramo(-6.5, PORTON.x0, 0, HW); tramo(PORTON.x1, 6.5, 0, HW); tramo(PORTON.x0, PORTON.x1, PORTON.alto, HW);
  // las paredes de los costados (lo mismo, navy abajo, crema arriba) y el techo con dos vigas
  for (const sx of [-1, 1]) { const g = new THREE.Group(); g.position.set(sx * 6.4, 0, 0); g.rotation.y = -sx * Math.PI / 2; SET.add(g); const b = mesh(new THREE.BoxGeometry(13, 2.2, 0.2), M.navy2, 0, 1.1, 0); b.castShadow = false; g.add(b); const c = mesh(new THREE.BoxGeometry(13, HW - 2.2, 0.2), M.pared, 0, 2.2 + (HW - 2.2) / 2, 0); c.castShadow = false; g.add(c); }
  const techo = mesh(new THREE.PlaneGeometry(13, 12), new THREE.MeshBasicMaterial({ color: 0xdedbcd }), 0, HW, 1.0); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
  for (const z of [-2.5, 1.0]) SET.add(caja(13, 0.22, 0.2, M.navy3, 0, HW - 0.11, z, 0.01));
  // el portón levadizo: marco navy, la hoja enrollada arriba en una caja crema, las guías
  for (const x of [PORTON.x0 - 0.08, PORTON.x1 + 0.08]) SET.add(caja(0.16, PORTON.alto + 0.1, 0.3, M.navy3, x, (PORTON.alto + 0.1) / 2, ZF + 0.08, 0.02));
  SET.add(caja(PORTON.x1 - PORTON.x0 + 0.32, 0.16, 0.3, M.navy3, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto + 0.04, ZF + 0.08, 0.02));
  { const rollo = mesh(new THREE.CylinderGeometry(0.22, 0.22, PORTON.x1 - PORTON.x0 + 0.2, 28), M.cr, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto - 0.16, ZF + 0.42); rollo.rotation.z = Math.PI / 2; SET.add(rollo); SET.add(caja(PORTON.x1 - PORTON.x0 + 0.3, 0.08, 0.5, M.cr2, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto + 0.08, ZF + 0.38, 0.02)); }
  // el cartel "MECÁNICA ÓSCAR" arriba del portón (placa crema con borde navy; se lee de frente)
  // (r1) a la derecha del portón, lejos del travesaño del elevador (detrás del travesaño se perdían las tildes)
  SET.add(caja(2.7, 0.66, 0.06, M.navy3, 4.15, 2.75, ZF + 0.14, 0.03));
  SET.add(plano(2.56, 0.555, cartelT, 4.15, 2.75, ZF + 0.175));
  // ---- afuera: la vereda crema con su cordón, la calle, la vereda de enfrente y la fachada crema con ventanas navy ----
  const af = (w, d, x, z, m, y = 0) => { const p = mesh(new THREE.PlaneGeometry(w, d), m, x, y, z); p.rotation.x = -Math.PI / 2; p.castShadow = false; SET.add(p); };
  af(30, 1.8, 0, ZF - 1.0, M.cr, 0.12); SET.add(caja(30, 0.12, 0.14, M.cr3, 0, 0.06, ZF - 1.93, 0.02));
  af(30, 4.2, 0, ZF - 4.0, M.asfalto, 0.0);
  for (let i = -6; i <= 6; i++) af(1.2, 0.12, i * 2.4, ZF - 4.0, M.cr, 0.003);   // la línea punteada
  af(30, 2.0, 0, ZF - 7.1, M.cr, 0.12); SET.add(caja(30, 0.12, 0.14, M.cr3, 0, 0.06, ZF - 6.07, 0.02));
  const fach = mesh(new THREE.BoxGeometry(30, 5, 0.3), M.pared, 0, 2.5, ZF - 8.2); fach.castShadow = false; SET.add(fach);
  for (let i = -4; i <= 4; i++) { SET.add(caja(1.1, 1.3, 0.08, M.navy3, i * 2.6 + 0.6, 2.4, ZF - 8.02, 0.03)); SET.add(caja(0.96, 1.16, 0.06, mat(0x2c4268, 0.3), i * 2.6 + 0.6, 2.4, ZF - 7.99, 0.02)); }
  SET.add(caja(30, 0.5, 0.1, M.g, 0, 0.25, ZF - 8.02, 0.02));
  // el árbol de la vereda (low-poly verde), a la izquierda del portón
  { const g = new THREE.Group(); g.position.set(PORTON.x0 + 0.35, 0.12, ZF - 1.35); SET.add(g);
    g.add(mesh(new THREE.CylinderGeometry(0.08, 0.11, 1.9, 8), mat(0x6b4a32, 0.9), 0, 0.95, 0));
    semilla = 5; for (let i = 0; i < 5; i++) { const b = mesh(new THREE.IcosahedronGeometry(0.55 + az() * 0.2, 0), i % 2 ? M.gd : M.g, (az() - 0.5) * 0.7, 2.25 + az() * 0.55, (az() - 0.5) * 0.5); g.add(b); } }
}

// ---- el elevador de dos columnas: columnas navy3, travesaño arriba, cuatro brazos verdes con tacos negros y el panel de
// mando (botón verde) en la columna derecha. Los carros y los brazos suben (ELEV.h) y se abren (ELEV.abre) ----
const ELEV = { g: new THREE.Group(), brazos: [], h: 0, abre: 0 };
{
  SET.add(ELEV.g);
  for (const x of COL) {
    SET.add(caja(0.3, 3.3, 0.34, M.navy3, x, 1.65, LZ, 0.03));
    SET.add(caja(0.5, 0.04, 0.6, M.navy3, x, 0.02, LZ, 0.01));
    SET.add(caja(0.06, 3.0, 0.06, M.acero, x + Math.sign(LX - x) * 0.17, 1.6, LZ + 0.12, 0.01));   // la guía del carro
  }
  SET.add(caja(COL[1] - COL[0] + 0.3, 0.16, 0.26, M.navy3, LX, 3.38, LZ, 0.02));
  // la botonera en su pedestal, adelante de la columna izquierda (botón verde arriba)
  SET.add(caja(0.12, 1.0, 0.12, M.navy3, BOTONERA.x, 0.5, BOTONERA.z, 0.02)); SET.add(caja(0.24, 0.3, 0.16, M.cr, BOTONERA.x, 1.12, BOTONERA.z, 0.03));
  SET.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16).rotateX(Math.PI / 2), M.g, BOTONERA.x, 1.16, BOTONERA.z + 0.09));
  SET.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 14).rotateX(Math.PI / 2), M.navy, BOTONERA.x, 1.06, BOTONERA.z + 0.09));
  // los carros (suben por las columnas) y los brazos (pivotan)
  for (const x of COL) {
    const carro = new THREE.Group(); carro.position.set(x + Math.sign(LX - x) * 0.2, 0, LZ); ELEV.g.add(carro);
    carro.add(caja(0.16, 0.42, 0.42, M.navy, 0, 0.21, 0, 0.02));
    for (const sz of [-1, 1]) {
      const piv = new THREE.Group(); piv.position.set(0, 0.06, sz * 0.14); carro.add(piv);
      const brazo = new THREE.Group(); piv.add(brazo);
      brazo.add(caja(0.12, 0.08, 1.0, M.g, 0, 0, 0.5, 0.02));
      brazo.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.07, 16), M.goma, 0, 0.075, 0.95));
      ELEV.brazos.push({ piv, sx: Math.sign(LX - x), sz, carro });
    }
  }
  sombras(ELEV.g);
}
// h: altura de la cara de arriba de los tacos sobre el piso; abre 0 = debajo del auto, 1 = abiertos hacia afuera
function ponerElevador(h, abre) {
  for (const b of ELEV.brazos) {
    b.carro.position.y = h - 0.17;
    // cerrado: apuntan a los puntos de apoyo del auto (x = LX ± 0.55, z = LZ ± 0.95); abierto: hacia afuera, paralelos a z
    const xp = b.carro.position.x, dx = (LX - b.sx * 0.55) - xp, dz = b.sz * 0.95 - b.sz * 0.14;
    const aCerr = Math.atan2(dx, dz), aAb = b.sz > 0 ? -b.sx * 0.18 : Math.PI + b.sx * 0.18;
    b.piv.rotation.y = lerp(aCerr, aAb, abre);
    b.largo = Math.hypot(dx, dz);
  }
}

// ---- el banco de trabajo (adelante a la izquierda, a lo largo de z): mesada de madera gruesa, frente navy3 con cajones,
// la morsa en la punta, el kit de embrague sobre un trapo, el bidón de aceite y la lámpara de taller colgada ----
const trapoT = lienzo(256, 256, (x, w) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, w); x.fillStyle = "rgba(58,63,74,0.55)"; for (const [cx, cy, r] of [[70, 80, 34], [170, 160, 26], [120, 200, 18]]) { x.beginPath(); x.ellipse(cx, cy, r, r * 0.7, 0.5, 0, 7); x.fill(); } });
{
  const g = new THREE.Group(); g.position.set(BANCO.x, 0, (BANCO.z0 + BANCO.z1) / 2); SET.add(g);
  const L = BANCO.z1 - BANCO.z0, P = BANCO.prof, H = BANCO.alto;
  g.add(caja(P, 0.08, L, M.madera, 0, H - 0.04, 0, 0.015));
  g.add(caja(P - 0.06, H - 0.1, L - 0.08, M.navy3, 0, (H - 0.1) / 2, 0, 0.02));
  for (let i = 0; i < 3; i++) { g.add(caja(0.02, 0.22, 0.62, M.navy2, P / 2 - 0.025, H - 0.26, -L / 2 + 0.45 + i * 0.75, 0.01)); g.add(caja(0.03, 0.03, 0.18, M.g, P / 2 - 0.005, H - 0.26, -L / 2 + 0.45 + i * 0.75, 0.01)); }
  // la morsa (punta lejana a la cámara del cuadro 0, z alto)
  const mo = new THREE.Group(); mo.position.set(0.12, H, L / 2 - 0.22); g.add(mo);
  mo.add(caja(0.2, 0.06, 0.24, M.acero, 0, 0.03, 0, 0.01)); mo.add(caja(0.18, 0.16, 0.08, M.acero, 0, 0.14, 0.06, 0.01)); mo.add(caja(0.18, 0.16, 0.08, M.acero, 0, 0.14, -0.06, 0.01));
  const tor = mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3, 8), M.metal, 0, 0.12, 0.2); tor.rotation.x = Math.PI / 2; mo.add(tor);
  // el kit de embrague sobre su trapo: el disco con los resortes a la vista y la placa de presión
  const kit = new THREE.Group(); kit.position.set(0.02, H, 0.66); g.add(kit);
  const tp = plano(0.42, 0.36, trapoT, 0, 0.003, 0); tp.rotation.x = -Math.PI / 2; kit.add(tp);
  kit.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 32), M.acero, 0.03, 0.03, -0.04));
  kit.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.06, 20), M.navy, 0.03, 0.06, -0.04));
  const disco = new THREE.Group(); disco.position.set(-0.05, 0.08, 0.1); disco.rotation.set(0.5, 0, -0.2); kit.add(disco);
  disco.add(mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.02, 32), mat(0x6d6a66, 0.7)));
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; const r = mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.05, 8), M.metal, Math.cos(a) * 0.06, 0.015, Math.sin(a) * 0.06); r.rotation.z = Math.PI / 2; r.rotation.y = -a; disco.add(r); }
  // el bidón de aceite crema liso (en el piso, al lado del banco), tapa navy, manija
  const bi = new THREE.Group(); bi.position.set(P / 2 + 0.2, 0, 0.95); g.add(bi);
  bi.add(caja(0.22, 0.34, 0.15, M.cr, 0, 0.17, 0, 0.03)); bi.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 12), M.navy, 0.05, 0.36, 0)); bi.add(caja(0.07, 0.06, 0.04, M.cr, -0.05, 0.37, 0, 0.015));
  // la lámpara de taller colgada de un gancho: el cable, la jaula y el tubo prendido
  const la = new THREE.Group(); la.position.set(0.05, 2.05, -0.45); g.add(la);
  la.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, HW - 2.05, 6), M.navy, 0, (HW - 2.05) / 2 + 0.2, 0));
  la.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.36, 14), new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff3d2, emissiveIntensity: 1.1 }), 0, 0, 0));
  for (const y of [-0.15, 0, 0.15]) { const a = mesh(new THREE.TorusGeometry(0.06, 0.007, 6, 18), M.navy3, 0, y, 0); a.rotation.x = Math.PI / 2; la.add(a); }
  for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI * 2; la.add(mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.34, 4), M.navy3, Math.cos(a) * 0.06, 0, Math.sin(a) * 0.06)); }
  la.add(caja(0.09, 0.06, 0.09, M.navy3, 0, 0.21, 0, 0.01));
}
// ---- el panel de herramientas (pared del fondo, a la izquierda del portón): tablero perforado crema con la silueta navy
// de cada herramienta, y la herramienta encima; una silueta vacía con la forma del pincho ----
const panelT = lienzo(1024, 586, (x, w, h) => {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#d9d7c9"; for (let i = 18; i < w; i += 36) for (let j = 18; j < h; j += 36) { x.beginPath(); x.arc(i, j, 4.5, 0, 7); x.fill(); }
  // las siluetas (en px del lienzo: 1024 = 2,1 m)
  const k = 1024 / 2.1, px = (X) => (X - PANEL.x0) * k, py = (Y) => (PANEL.y1 - Y) * k;
  x.fillStyle = "#16243d";
  for (let i = 0; i < 6; i++) { const X = PANEL.x0 + 0.18 + i * 0.1, L = 0.22 + i * 0.035; rr(x, px(X) - 9, py(1.95), 18, L * k, 9); x.beginPath(); x.arc(px(X), py(1.95), 17, 0, 7); x.fill(); x.beginPath(); x.arc(px(X), py(1.95 - L), 13, 0, 7); x.fill(); }
  for (let i = 0; i < 4; i++) { const X = PANEL.x0 + 0.95 + i * 0.12; rr(x, px(X) - 14, py(1.95), 28, 0.14 * k, 10); rr(x, px(X) - 5, py(1.81), 10, 0.16 * k, 4); }
  rr(x, px(PANEL.x0 + 1.6) - 10, py(1.98), 20, 0.3 * k, 8); rr(x, px(PANEL.x0 + 1.6) - 60, py(1.98) - 6, 120, 34, 10);   // el martillo
  rr(x, px(PANEL.x0 + 0.42) - 50, py(1.42), 100, 0.26 * k, 20);   // la pinza (dos mangos)
  // la silueta del pincho: base redonda abajo y el clavo
  x.beginPath(); x.ellipse(px(SILUETA.x), py(SILUETA.y - 0.14), 46, 14, 0, 0, 7); x.fill(); rr(x, px(SILUETA.x) - 6, py(SILUETA.y + 0.18), 12, 0.3 * k, 6);
});
{
  const g = new THREE.Group(); SET.add(g);
  const W = PANEL.x1 - PANEL.x0, H = PANEL.y1 - PANEL.y0;
  g.add(caja(W + 0.08, H + 0.08, 0.04, M.navy3, (PANEL.x0 + PANEL.x1) / 2, (PANEL.y0 + PANEL.y1) / 2, ZF + 0.12, 0.01));
  g.add(plano(W, H, panelT, (PANEL.x0 + PANEL.x1) / 2, (PANEL.y0 + PANEL.y1) / 2, ZF + 0.142));
  const z = ZF + 0.17;
  // llaves combinadas en escalera
  for (let i = 0; i < 6; i++) { const X = PANEL.x0 + 0.18 + i * 0.1, L = 0.22 + i * 0.035; g.add(caja(0.032, L, 0.012, M.acero, X, 1.95 - L / 2, z, 0.006)); const a = mesh(new THREE.TorusGeometry(0.03, 0.009, 6, 16), M.acero, X, 1.95, z); g.add(a); g.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.012, 12).rotateX(Math.PI / 2), M.acero, X, 1.95 - L, z)); }
  // destornilladores (mango verde o navy)
  for (let i = 0; i < 4; i++) { const X = PANEL.x0 + 0.95 + i * 0.12; g.add(caja(0.055, 0.14, 0.05, i % 2 ? M.navy : M.g, X, 1.95 - 0.07, z + 0.01, 0.02)); g.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.16, 8), M.metal, X, 1.81 - 0.08, z)); }
  // el martillo y la pinza
  g.add(caja(0.035, 0.3, 0.03, M.madera, PANEL.x0 + 1.6, 1.98 - 0.15, z, 0.01)); g.add(caja(0.24, 0.06, 0.06, M.acero, PANEL.x0 + 1.6, 1.98, z + 0.01, 0.01));
  for (const s of [-1, 1]) { const p = caja(0.035, 0.26, 0.025, M.g, PANEL.x0 + 0.42 + s * 0.04, 1.42 - 0.13, z, 0.012); p.rotation.z = s * 0.15; g.add(p); }
  // la repisita del pincho (un gancho en L navy, abajo de la silueta)
  g.add(caja(0.2, 0.025, 0.12, M.navy3, SILUETA.x, SILUETA.y - 0.17, ZF + 0.2, 0.008));
}
// ---- el carro de herramientas (navy, cinco cajones con manijas verdes, uno entreabierto con llaves de tubo) ----
{
  const g = new THREE.Group(); g.position.set(-4.0, 0, ZF + 1.0); g.rotation.y = 0.25; SET.add(g);
  g.add(caja(0.72, 0.82, 0.46, M.navy3, 0, 0.53, 0, 0.03)); g.add(caja(0.76, 0.04, 0.5, M.navy, 0, 0.96, 0, 0.01));
  for (let i = 0; i < 5; i++) { const y = 0.24 + i * 0.15, abre = i === 3 ? 0.14 : 0; g.add(caja(0.66, 0.12, 0.03, M.navy2, 0, y, 0.24 + abre, 0.01)); g.add(caja(0.3, 0.025, 0.03, M.g, 0, y + 0.02, 0.27 + abre, 0.008)); if (abre) for (let k = 0; k < 6; k++) g.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.05, 10), M.metal, -0.24 + k * 0.09, y + 0.07, 0.16)); }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), M.goma, sx * 0.3, 0.05, sz * 0.18));
}
// ---- la pila de cubiertas (cuatro, acostadas, con el dibujo de la banda) ----
const bandaT = lienzo(512, 64, (x, w, h) => { x.fillStyle = "#23262c"; x.fillRect(0, 0, w, h); x.fillStyle = "#3a3f4a"; for (let i = 0; i < 32; i++) { x.fillRect(i * 16, 8, 6, 20); x.fillRect(i * 16 + 8, 36, 6, 20); } });
bandaT.wrapS = THREE.RepeatWrapping; bandaT.repeat.set(3, 1);
function crearCubierta() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.2, 32, 1, true), new THREE.MeshStandardMaterial({ map: bandaT, roughness: 0.9, side: THREE.DoubleSide })));
  for (const s of [-1, 1]) { const a = mesh(new THREE.RingGeometry(0.17, 0.34, 32), new THREE.MeshStandardMaterial({ color: 0x2a2d33, roughness: 0.9, side: THREE.DoubleSide }), 0, s * 0.1, 0); a.rotation.x = Math.PI / 2; g.add(a); }
  g.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.2, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0x1a1c20, roughness: 0.9, side: THREE.DoubleSide })));
  return g;
}
const PILA = new THREE.Group(); PILA.position.set(CUB.x, 0, CUB.z); scene.add(PILA);
{ for (let i = 0; i < 4; i++) { const c = crearCubierta(); c.position.set((i % 2) * 0.03, 0.1 + i * 0.2, -(i % 2) * 0.02); c.rotation.y = i * 0.7; PILA.add(c); } sombras(PILA); }
// la rueda que le sacaron al sedán (P1), parada contra la columna derecha
const RUEDA_SUELTA = new THREE.Group();
{ const cub = mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 28), [M.goma, ML.llanta, ML.llanta]); cub.rotation.z = Math.PI / 2; RUEDA_SUELTA.add(cub); RUEDA_SUELTA.position.set(COL[1] + 0.55, 0.11, LZ - 0.7); RUEDA_SUELTA.rotation.set(0, 0, Math.PI / 2); scene.add(sombras(RUEDA_SUELTA)); }
// ---- el gato carrito (navy3 con la manija verde), al lado del elevador ----
{
  const g = new THREE.Group(); g.position.set(1.75, 0, -0.95); g.rotation.y = -0.5; SET.add(g);
  g.add(caja(0.3, 0.12, 0.75, M.navy3, 0, 0.12, 0, 0.03));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 14).rotateZ(Math.PI / 2), M.goma, sx * 0.17, 0.06, sz * 0.3));
  const br = caja(0.1, 0.06, 0.4, M.navy3, 0, 0.22, 0.25, 0.02); br.rotation.x = -0.25; g.add(br); g.add(mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16), M.acero, 0, 0.29, 0.43));
  const ma = mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 8), M.g, 0, 0.5, -0.65); ma.rotation.x = 0.85; g.add(ma);
}
fusionar(SET, [ELEV.g]);
// =====================================================================================================
// TARJETAS PEGADAS A LA CÁMARA (en píxeles de pantalla): globos de diálogo, audios, chats, rótulos
// =====================================================================================================
const PXK = 1000;
// una tarjeta: cuerpo con borde navy de 8 px y sombra dura; contenido en canvas (W x H px); cola opcional
function crearTarjeta(Wg, H, dibujo, { fondo = "#efeee5", borde = C.navy, sombraC = 0x050a14 } = {}) {
  const tex = lienzo(Wg * 2, H * 2, (x, w, h) => { x.fillStyle = fondo; x.fillRect(0, 0, w, h); x.save(); x.scale(2, 2); dibujo(x, Wg, H); x.restore(); });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: borde });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(fondo) });
  const sombraM = new THREE.MeshBasicMaterial({ color: sombraC });
  const w = Wg / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sombra.position.set(12 / PXK, -14 / PXK, -0.016); g.add(sombra);
  const bord = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); bord.position.z = -0.012; g.add(bord);
  const caja2 = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja2);
  const colaG = new THREE.Group(); g.add(colaG);
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(80 / PXK, 104 / PXK), sombraM); cs.position.set(12 / PXK, -8 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(80 / PXK, 104 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(54 / PXK, 78 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja2.userData.orden = 4;
  g.userData = { W: Wg, H, cola: colaG, tex, dibujo, fondo };
  return pegarACamara(g, camera, 40);
}
function redibujar(g, dibujo) { const { tex, W, H, fondo } = g.userData; const x = tex.userData.x; x.setTransform(1, 0, 0, 1, 0, 0); x.fillStyle = fondo; x.fillRect(0, 0, W * 2, H * 2); x.save(); x.scale(2, 2); dibujo(x, W, H); x.restore(); tex.needsUpdate = true; }
// texto con la palabra [clave] en el recuadro verde de selección
function textoSel(x, l, cx, y, px, tinta = "#0b1220", ver = Infinity) {
  const limpio = (s) => s.replace(/[[\]]/g, "");
  x.font = F(800, px); x.textBaseline = "middle"; x.textAlign = "left";
  // (r1 11:11) cada palabra es una parte, así se puede revelar el remate palabra por palabra sin mover nada
  const partes = l.split(/(\[[^\]]+\])/).filter(Boolean).flatMap((p) => (p.startsWith("[") ? [p] : p.split(/(?<= )/)));
  const anchos = partes.map((p) => x.measureText(limpio(p)).width + (p.startsWith("[") ? px * 0.5 : 0));
  let xx = cx - anchos.reduce((a, b) => a + b, 0) / 2;
  partes.forEach((p, k) => {
    if (k >= ver) return;
    if (p.startsWith("[")) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = px * 0.1; x.beginPath(); x.roundRect(xx + px * 0.05, y - px * 0.62, anchos[k] - px * 0.1, px * 1.24, px * 0.12); x.fill(); x.stroke(); x.fillStyle = tinta; x.fillText(limpio(p), xx + px * 0.25, y + px * 0.04); }
    else { x.fillStyle = tinta; x.fillText(p, xx, y + px * 0.04); }
    xx += anchos[k];
  });
}
// globo de diálogo (texto grande), con cabecera opcional (avatar + nombre)
function crearGlobo(lineas, px = 80, { cab = null } = {}) {
  const g = crearGloboV(lineas, px, { cab });
  g.userData.lineas = lineas; g.userData.px = px; g.userData.cab = cab; g.userData.ver = -1;
  return g;
}
// cuántas palabras se ven en total (las de las líneas de arriba primero); redibuja solo si cambia
function verGlobo(g, n) {
  if (g.userData.ver === n) return; g.userData.ver = n;
  const { lineas, px } = g.userData;
  redibujar(g, (x, w, h) => { let resto = n; lineas.forEach((l, i) => { const c = l.split(/(\[[^\]]+\])/).filter(Boolean).flatMap((p) => (p.startsWith("[") ? [p] : p.split(/(?<= )/))).length; textoSel(x, l, w / 2, (h - 0) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px, "#0b1220", resto); resto -= c; }); });
}
function crearGloboV(lineas, px = 80, { cab = null } = {}) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const cabH = cab ? Math.round(px * 1.25) : 0, cabF = Math.max(Math.round(px * 0.62), 42);
  med.font = F(700, cabF); const anchoCab = cab ? med.measureText(cab.nombre).width + px * 1.3 : 0; med.font = F(800, px);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.2), H = Math.round(lineas.length * px * 1.22 + px * 0.75 + cabH);
  return crearTarjeta(Wg, H, (x, w, h) => {
    if (cab) { const r = px * 0.48, cy = px * 0.2 + r, cx = px * 0.25 + r; avatar(x, cab.cv, cx, cy, r); x.fillStyle = "#1f3254"; x.font = F(700, cabF); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(cab.nombre, cx + r + px * 0.25, cy + 2); }
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + (h - cabH) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  });
}
// el rótulo con línea guía: caja navy, texto crema (o rojo apagado)
function crearRotulo(lineas, px = 50) {
  const med = document.createElement("canvas").getContext("2d");
  const ancho = Math.max(...lineas.map(([l, , p]) => { med.font = F(800, p ?? px); return med.measureText(l).width; }));
  const H = Math.round(lineas.reduce((a, [, , p]) => a + (p ?? px) * 1.25, 0) + px * 0.6), Wg = Math.round(ancho + px * 1.0);
  return crearTarjeta(Wg, H, (x, w, h) => {
    let y = px * 0.3; x.textAlign = "center"; x.textBaseline = "middle";
    for (const [l, color, p] of lineas) { const q = p ?? px; x.font = F(800, q); x.fillStyle = color ?? "#efeee5"; x.fillText(l, w / 2, y + q * 0.62); y += q * 1.25; }
  }, { fondo: "#16243d", borde: C.cr });
}
// la línea guía (un plano fino crema con borde navy) y el punto en el objetivo
function crearGuia() {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: C.navy })); b.userData.orden = 0; g.add(b);
  const l = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: C.cr })); l.userData.orden = 1; l.position.z = 0.001; g.add(l);
  const p = new THREE.Mesh(new THREE.CircleGeometry(1, 24), new THREE.MeshBasicMaterial({ color: C.cr })); p.userData.orden = 2; p.position.z = 0.002; g.add(p);
  const pb = new THREE.Mesh(new THREE.CircleGeometry(1, 24), new THREE.MeshBasicMaterial({ color: C.navy })); pb.userData.orden = 1; pb.position.z = 0.0015; g.add(pb);
  g.userData = { b, l, p, pb };
  return pegarACamara(g, camera, 38);
}
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
function ponerGuia(g, x0, y0, x1, y1, u = 1) {
  g.visible = u > 0.02; if (!g.visible) return;
  const k = halfK(), { b, l, p, pb } = g.userData;
  const xe = lerp(x0, x1, u), ye = lerp(y0, y1, u), L = Math.hypot(xe - x0, ye - y0), a = Math.atan2(-(ye - y0), xe - x0);
  g.position.set(0, 0, -1); g.scale.setScalar(k);
  for (const [m, grosor] of [[b, 16], [l, 8]]) { m.position.set((x0 + xe) / 2 - 540, 960 - (y0 + ye) / 2, m.position.z); m.scale.set(L, grosor, 1); m.rotation.z = a; }
  p.position.set(xe - 540, 960 - ye, 0.002); p.scale.setScalar(u > 0.95 ? 12 : 0.001); pb.position.set(xe - 540, 960 - ye, 0.0015); pb.scale.setScalar(u > 0.95 ? 19 : 0.001);
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 38 + (o.userData.orden || 0); });
}
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0) {
  g.visible = s > 0.03;
  const op = cl(s / 0.85); s = Math.max(s, 0.85);
  g.traverse((o) => { if (o.isMesh) [].concat(o.material).forEach((m) => (m.opacity = op)); });
  if (!g.visible) return;
  const k = halfK();
  const { W: Wg, H, cola } = g.userData;
  cx = Wg + 120 > 1080 ? 540 : cl(cx, Wg / 2 + 50, 1030 - Wg / 2);
  cy = cl(cy, H / 2 + 60, 1860 - H / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.set(k * PXK * s, k * PXK * s, k * PXK * s);
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  cola.visible = !!objetivo;
  if (!objetivo) return;
  const [ox, oy] = objetivo;
  const lado = cl((ox - cx) / (Wg / 2), -0.8, 0.8);
  if (oy >= cy) {
    cola.position.set((lado * Wg) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
    cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * Wg) / 2), oy - (cy + H / 2)), -1.15, 1.15);
  } else {
    cola.position.set((lado * Wg) / 2 / PXK, H / 2 / PXK - 4 / PXK, 0);
    cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * Wg) / 2), (cy - H / 2) - oy), -1.15, 1.15);
  }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(V3(0, 0.181, 0.3))); };
const objPx = (o, local = V3(0, 0, 0)) => { o.updateMatrixWorld(true); return enPantalla(o.localToWorld(local.clone())); };

// =====================================================================================================
// EL PINCHO DE PRESUPUESTOS: base redonda navy pesada + clavo de acero; los papeles (presupuestos de papel con la huella
// de grasa) se clavan por el medio, cada uno un poco torcido. El segundo pincho es igual y vacío.
// =====================================================================================================
const PRESUS = [["Sedán STR 4581", "Embrague completo", "$ 38.000"], ["Fabián", "Frenos y discos", "$ 14.500"], ["Pablo", "Distribución", "$ 22.000"], ["Silvia", "Tren delantero", "$ 9.800"], ["Andrés", "Service", "$ 6.500"]];
function dibujarPresu(x, W, H, [a, b, monto], { agujero = true } = {}) {
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 78); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "MECÁNICA ÓSCAR", 800, 38, W - 40); x.fillText("MECÁNICA ÓSCAR", W / 2, 41);
  x.fillStyle = "#0b1220"; ajustar(x, "PRESUPUESTO", 800, 40, W - 60); x.fillText("PRESUPUESTO", W / 2, 118);
  x.strokeStyle = "#cfd8e3"; x.lineWidth = 3; for (let y = 210; y < H - 20; y += 78) { x.beginPath(); x.moveTo(20, y); x.lineTo(W - 20, y); x.stroke(); }
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "alphabetic";
  x.font = CAV(58); x.fillText(a, 30, 200); x.font = CAV(62); x.fillText(b, 30, 280);
  x.font = CAV(124); x.fillText(monto, 26, 430);
  // la huella del pulgar con grasa (esquina de abajo a la derecha)
  x.save(); x.translate(W - 82, H - 82); x.rotate(-0.5); x.strokeStyle = "rgba(42,45,51,0.6)"; x.lineWidth = 5;
  for (let r = 8; r < 52; r += 9) { x.beginPath(); x.ellipse(0, 0, r * 0.75, r, 0, 0.2, Math.PI * 2 - 0.4); x.stroke(); }
  x.fillStyle = "rgba(42,45,51,0.18)"; x.beginPath(); x.ellipse(0, 0, 42, 56, 0, 0, 7); x.fill(); x.restore();
  if (agujero) { x.fillStyle = "#3a3f4a"; x.beginPath(); x.arc(W / 2, H / 2 + 20, 9, 0, 7); x.fill(); }
}
const PRESU_T = PRESUS.map((p) => lienzo(400, 560, (x, W, H) => dibujarPresu(x, W, H, p)));
const PRESU_LIMPIO = lienzo(400, 560, (x, W, H) => dibujarPresu(x, W, H, PRESUS[0], { agujero: false }));
const PAP = { w: 0.2, h: 0.28 };
const papelM = (tex) => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.12 });
function crearPapel(tex) {
  const g = new THREE.Group();
  const geo = new THREE.PlaneGeometry(PAP.w, PAP.h, 4, 6);
  const ps = geo.attributes.position; for (let i = 0; i < ps.count; i++) { const yy = ps.getY(i); ps.setZ(i, 0.012 * Math.sin((yy / PAP.h + 0.5) * Math.PI)); }   // un poco curvado
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, papelM(tex)); m.castShadow = true; m.receiveShadow = true; g.add(m);
  return g;
}
const PIN = { base: 0.035, alto: 0.3 };
function crearPincho() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.085, 0.09, PIN.base, 28), M.navy3, 0, PIN.base / 2, 0));
  g.add(mesh(new THREE.TorusGeometry(0.087, 0.006, 6, 28).rotateX(Math.PI / 2), M.acero, 0, PIN.base, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.0065, 0.0065, PIN.alto - 0.03, 10), M.acero, 0, PIN.base + (PIN.alto - 0.03) / 2, 0));
  g.add(mesh(new THREE.ConeGeometry(0.0065, 0.035, 10), M.acero, 0, PIN.base + PIN.alto - 0.012, 0));
  return sombras(g);
}
const PINCHO1 = crearPincho(); scene.add(PINCHO1);
const PINCHO2 = crearPincho(); scene.add(PINCHO2);
const PAPELES = PRESU_T.map((t) => { const p = crearPapel(t); scene.add(p); return p; });
// cómo queda cada papel clavado (torcido, girado): [giro, inclinación x, inclinación z]
const TORCIDO = [[0.15, 0.06, -0.05], [-0.45, -0.07, 0.04], [0.8, 0.05, 0.07], [-1.1, -0.06, -0.05], [0.35, 0.08, 0.03]];
// pone el papel i clavado en el pincho p, a la altura de la pila (k = cuántos debajo), con un descenso u (0 arriba, 1 en la pila)
const _pp = new THREE.Vector3();
function papelEnPincho(pap, pincho, i, k, u = 1) {
  pincho.updateMatrixWorld(true);
  const yPila = PIN.base + 0.006 + k * 0.007, yTope = PIN.base + PIN.alto - 0.02;
  _pp.set(0, lerp(yTope, yPila, u), 0); pincho.localToWorld(_pp);
  pap.position.copy(_pp);
  const [gi, ix, iz] = TORCIDO[i];
  pap.rotation.set(0, 0, 0); pap.rotateY(gi); pap.rotateX(-Math.PI / 2 + ix); pap.rotateY(iz);
  pap.visible = true; pap.scale.setScalar(1);
}

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const oscar = crearPersonaje({ ...ELENCO.oscar, dedos: true, parpadeoCada: 999, parpadeosExtra: [1.1, r2(T.p3 + 0.3), r2(T.p5 + 0.7), r2(T.p7 + 0.55), r2(T.q1 + 0.05), r2(T.q4b + 0.02)] });
const maxi = crearPersonaje({ ...ELENCO.maxi, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.05), r2(T.p5 + 0.6), r2(T.q3b + 0.9)] });
const sergio = crearPersonaje({ ...ELENCO.sergio, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.s1 + LEN.s1 + 0.1), r2(T.q4b + 1.6)] });
const TODOS = [oscar, maxi, sergio];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
const GRASA = new THREE.MeshStandardMaterial({ color: 0x2a2d33, roughness: 0.6, transparent: true, opacity: 0.75, depthWrite: false });
// Óscar: el trapo crema con manchas colgando del bolsillo de atrás; grasa en las manos y una mancha en el pecho
const TRAPO_BOLSILLO = new THREE.Group();
{
  const m = plano(0.16, 0.24, trapoT, 0, -0.1, 0); m.material.side = THREE.DoubleSide; TRAPO_BOLSILLO.add(m);
  TRAPO_BOLSILLO.position.set(-0.11, 0.0, -0.205); TRAPO_BOLSILLO.rotation.set(0.12, Math.PI + 0.25, 0.05); oscar.cuerpo.add(TRAPO_BOLSILLO); sombras(TRAPO_BOLSILLO);
  for (const b of oscar.brazos) { const g1 = mesh(new THREE.SphereGeometry(1, 12, 8), GRASA, 0.0, -0.095, 0.032); g1.scale.set(0.035, 0.02, 0.012); b.mano.add(g1); const g2 = mesh(new THREE.SphereGeometry(1, 12, 8), GRASA, b.s * 0.03, -0.06, -0.035); g2.scale.set(0.025, 0.018, 0.012); b.mano.add(g2); }
  const mp = mesh(new THREE.SphereGeometry(1, 12, 8), GRASA, 0.11, 0.18, 0.215); mp.scale.set(0.035, 0.022, 0.01); oscar.cuerpo.add(mp);
}
const TRAPO_MANO = plano(0.2, 0.26, trapoT); TRAPO_MANO.material.side = THREE.DoubleSide; scene.add(TRAPO_MANO); sombras(TRAPO_MANO);
// Maxi: una mancha de grasa en la mejilla izquierda
{ const m = mesh(new THREE.SphereGeometry(1, 12, 8), GRASA); const R = 0.3, CC = 0.276, a = 0.6, e = -0.18; m.position.set(R * Math.sin(a) * Math.cos(e) * 1.0, CC + R * 0.97 * Math.sin(e), R * 0.95 * Math.cos(a) * Math.cos(e) * 1.0); m.lookAt(m.position.clone().multiplyScalar(2)); m.scale.set(0.035, 0.022, 0.008); maxi.cabeza.add(m); }
// Sergio: la llave del auto con el llavero verde (va en la mano o en la de Óscar) y el presupuesto de papel
const LLAVE = new THREE.Group();
{ LLAVE.add(caja(0.016, 0.07, 0.008, M.acero, 0, -0.045, 0, 0.003)); LLAVE.add(caja(0.035, 0.03, 0.014, M.navy, 0, 0.0, 0, 0.006)); LLAVE.add(mesh(new THREE.TorusGeometry(0.018, 0.004, 6, 16), M.acero, 0, 0.03, 0)); LLAVE.add(caja(0.05, 0.065, 0.014, M.g, 0.0, 0.075, 0, 0.012)); scene.add(sombras(LLAVE)); LLAVE.scale.setScalar(1.6); }
const PRESU_MANO = crearPapel(PRESU_LIMPIO); scene.add(PRESU_MANO);
// el celular de Óscar (funda negra gastada) y el de Sergio (funda navy3), 3D en la mano
const pantO = lienzo(600, 975, () => {});
const celuO = crearCelular(pantO, 0x1a1c20, 0.08, 0.162); celuO.scale.setScalar(1.25); scene.add(celuO);
const pantS = lienzo(600, 975, () => {});
const celuSe = crearCelular(pantS, C.navy3, 0.08, 0.162); celuSe.scale.setScalar(1.25); scene.add(celuSe);

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (para las burbujas y los chats) ----
const AVATAR = {};
{
  const rt = new THREE.WebGLRenderTarget(256, 256); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene();
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(1, 2, 3); esc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const leer = (per, fondo) => {
    esc.background = new THREE.Color(fondo);
    const padre = per.raiz.parent; esc.add(per.raiz);
    per.poner({ x: 0, y: 0, z: 0, giro: 0, ...CARA.sonrisa, ...BRAZOS.costado, t: 0 });
    per.raiz.updateMatrixWorld(true);
    const c = per.cabeza.localToWorld(V3(0, 0.25, 0));
    cam.position.set(c.x + 0.12, c.y + 0.04, c.z + 1.6); cam.lookAt(c.x, c.y - 0.03, c.z);
    renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
    const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    const id = x.createImageData(256, 256);
    for (let y = 0; y < 256; y++) id.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
    x.putImageData(id, 0, 0);
    if (padre) padre.add(per.raiz); else esc.remove(per.raiz);
    return cv;
  };
  const otro = (o) => crearPersonaje({ nombre: "x", parpadeoCada: 999, ...o });
  AVATAR.fabian = leer(otro({ piel: PIEL.clara, pelo: 0x3a2f2a, peinado: "costados", cejasColor: 0x3a2f2a, lentes: MARCA.navy, camisa: 0xb9cde0, cuello: 0xb9cde0, cuelloBotones: false, nariz: 0.06 }), 0xd9d7c9);
  AVATAR.pablo = leer(otro({ piel: PIEL.media, pelo: PELO.negro, peinado: "texturado", texturaAlto: 0.6, barba: 0x2c211b, barbaLarga: 0.6, barbaOpacidad: 0.6, barbaBigote: true, cejasColor: 0x1e1a18, camisa: MARCA.navy3, cuello: null, cuelloBotones: false }), 0xcfeebc);
  AVATAR.silvia = leer(otro({ piel: PIEL.trigueña, pelo: PELO.castaño, peinado: "rodete", cejasColor: 0x4a3222, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xb5555a, camisa: MARCA.cr, cuello: null, cuelloBotones: false, aros: MARCA.g, nariz: 0.048 }), 0xb9cde0);
  AVATAR.andres = leer(otro({ piel: PIEL.clara, pelo: PELO.rubio, peinado: "corto", cejasColor: 0x8a6a40, camisa: MARCA.navy2, cuello: MARCA.cr, cuelloBotones: false, nariz: 0.056 }), 0xefeee5);
  AVATAR.maxi = leer(crearPersonaje({ ...ELENCO.maxi, parpadeoCada: 999 }), 0xcfeebc);
  AVATAR.sergio = leer(crearPersonaje({ ...ELENCO.sergio, parpadeoCada: 999 }), 0xd9d7c9);
  AVATAR.oscar = leer(crearPersonaje({ ...ELENCO.oscar, parpadeoCada: 999 }), 0x5ce611);
  // el que escribe sin nombre: silueta gris
  const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d"); x.fillStyle = "#b4b2a3"; x.fillRect(0, 0, 256, 256); x.fillStyle = "#efeee5"; x.beginPath(); x.arc(128, 104, 52, 0, 7); x.fill(); x.beginPath(); x.ellipse(128, 250, 96, 78, 0, 0, 7); x.fill(); AVATAR.gris = cv;
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// texto partido en renglones que entran en `ancho`
function renglones(x, txt, ancho) { const ws = txt.split(" "), out = []; let l = ""; for (const w of ws) { const p = l ? l + " " + w : w; if (x.measureText(p).width > ancho && l) { out.push(l); l = w; } else l = p; } if (l) out.push(l); return out; }

// ---- Sofi en videollamada: una escena aparte que se renderiza a una textura cada cuadro (Q5) ----
const sofi = crearPersonaje({ ...ELENCO.sofi, camisa: 0x2c4268, franja: null, cuello: MARCA.cr, cuelloBotones: false, cuelloFino: true, auricularFino: false, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });   // (r1) sin los aros crema en el torso; auriculares verdes grandes
const SOFI = { esc: new THREE.Scene(), rt: new THREE.WebGLRenderTarget(432, 768), cam: new THREE.PerspectiveCamera(28, 432 / 768, 0.05, 20) };
{
  SOFI.rt.texture.colorSpace = THREE.SRGBColorSpace;
  SOFI.esc.background = new THREE.Color(0x16243d);
  SOFI.esc.add(new THREE.HemisphereLight(0xffffff, 0x6a7080, 2.0)); const dl = new THREE.DirectionalLight(0xfff4e8, 1.7); dl.position.set(1.2, 2.2, 3); SOFI.esc.add(dl);
  SOFI.esc.add(sofi.raiz);
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ color: 0x1f3254 })); fondo.position.set(0, 1.4, -0.9); SOFI.esc.add(fondo);
  const logoT = await new THREE.TextureLoader().loadAsync("assets/logo-blanco.png"); logoT.colorSpace = THREE.SRGBColorSpace;
  const ar = logoT.image.width / logoT.image.height;
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34 / ar), new THREE.MeshBasicMaterial({ map: logoT, transparent: true })); logo.position.set(0.24, 1.86, -0.88); SOFI.esc.add(logo);
}

// =====================================================================================================
// LA TABLET DEL BANCO (parte 2) Y EL CELULAR PARADO DE LA VIDEOLLAMADA
// =====================================================================================================
const TAB_W = 1040, TAB_H = 1200;
const pantT = lienzo(TAB_W, TAB_H, () => {});
const tablet = crearTablet(pantT, 0.3, 0.4, 0.22); tablet.position.set(BANCO.x - 0.08, BANCO.alto, 1.66); tablet.rotation.y = Math.PI / 2; tablet.scale.setScalar(1.45); scene.add(tablet);
const celuS = new THREE.Group(); celuS.position.set(BANCO.x - 0.08, BANCO.alto, 2.24); celuS.rotation.y = Math.PI / 2 - 0.15; scene.add(celuS);
{
  const S = 1.9, W = 0.08 * S, H = 0.165 * S;
  const piv = new THREE.Group(); piv.position.y = 0.035; piv.rotation.x = -0.18; celuS.add(piv);
  piv.add(mesh(rbox(W + 0.008, H + 0.008, 0.014, 0.014), mat(C.navy, 0.4), 0, H / 2, 0));
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: SOFI.rt.texture, toneMapped: false })); pan.position.set(0, H / 2, 0.0076); piv.add(pan);
  celuS.add(caja(0.17, 0.02, 0.13, M.g, 0, 0.01, 0.0, 0.008)); celuS.add(caja(0.14, 0.08, 0.02, M.g, 0, 0.05, -0.06, 0.006));
  sombras(celuS);
}
// ---- el tablero: tres columnas ENVIADO · VISTO · ACEPTADO, tarjetas (nombre · trabajo · monto) y los totales ----
// e = { col: [c0..c4] (0 enviado, 1 visto, 2 aceptado; fraccionario mientras se mueve), duda, manana, aceptados, cero }
const CARDS = [["Sergio", "Embrague", 38000], ["Fabián", "Frenos y discos", 14500], ["Pablo", "Distribución", 22000], ["Silvia", "Tren delantero", 9800], ["Andrés", "Service", 6500]];
function dibujarTablero(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 132); x.fillStyle = "#5ce611"; x.fillRect(0, 132, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Presupuestos · esta semana", 800, 54, W - 60); x.fillText("Presupuestos · esta semana", 30, 68);
  const cw = (W - 16) / 3, cx = (c) => 8 + c * cw;
  ["ENVIADO", "VISTO", "ACEPTADO"].forEach((n, c) => { x.fillStyle = c === 2 ? "#5ce611" : "#1f3254"; rr(x, cx(c) + 6, 158, cw - 12, 74, 18); x.fillStyle = c === 2 ? "#0b1220" : "#efeee5"; x.textAlign = "center"; ajustar(x, n, 900, 40, cw - 30); x.fillText(n, cx(c) + cw / 2, 196); });
  // dónde va cada tarjeta: apiladas por columna en el orden de CARDS
  const alto = (i) => 166 + (i === 3 && e.duda ? 100 : 0) + (i === 4 && e.manana ? 100 : 0);
  const pos = CARDS.map(() => null), cuenta = [0, 0, 0], yCol = [250, 250, 250];
  const destino = CARDS.map((_, i) => Math.round(e.col[i]));
  CARDS.forEach((_, i) => { const c = destino[i]; pos[i] = { c, y: yCol[c] }; yCol[c] += alto(i) + 10; cuenta[c]++; });
  // el origen (de dónde viene la que se mueve): columna entera de abajo
  CARDS.forEach(([nom, trab, monto], i) => {
    const f = e.col[i], c0 = Math.floor(f), u = f - c0;
    let X = cx(pos[i].c) + 5, Y = pos[i].y;
    if (u > 0.001) { X = lerp(cx(c0) + 5, cx(c0 + 1) + 5, eio(u)); Y = lerp(e.desdeY?.[i] ?? Y, Y, eio(u)) - Math.sin(u * Math.PI) * 30; }
    const w = cw - 10, h = alto(i), ok = Math.round(f) === 2;
    x.fillStyle = "rgba(11,18,32,0.25)"; rr(x, X + 6, Y + 8, w, h, 22);
    x.fillStyle = ok ? "#cfeebc" : "#ffffff"; x.strokeStyle = ok ? "#3fa60a" : "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(X, Y, w, h, 22); x.fill(); x.stroke();
    x.textAlign = "left"; x.fillStyle = "#0b1220"; ajustar(x, nom, 800, 50, w - 76); x.fillText(nom, X + 16, Y + 42);
    if (ok) { x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(X + w - 34, Y + 38, 22, 0, 7); x.fill(); tilde(x, X + w - 33, Y + 39, 22, "#0b1220"); }
    x.fillStyle = "#16243d"; ajustar(x, trab, 700, 40, w - 24); x.fillText(trab, X + 14, Y + 94);
    x.fillStyle = "#0b1220"; ajustar(x, plata(monto), 900, 52, w - 28); x.fillText(plata(monto), X + 16, Y + 138);
    if (i === 3 && e.duda) { x.fillStyle = "#16243d"; rr(x, X + 8, Y + 166, w - 16, 92, 16); x.fillStyle = "#efeee5"; x.textAlign = "center"; ajustar(x, "Tiene una duda", 800, 38, w - 30); x.fillText("Tiene una duda", X + w / 2, Y + 192); x.fillStyle = "#5ce611"; ajustar(x, "te toca a vos", 800, 38, w - 30); x.fillText("te toca a vos", X + w / 2, Y + 234); }
    if (i === 4 && e.manana) { x.fillStyle = "#3fa60a"; x.textAlign = "center"; ajustar(x, "Seguimiento:", 800, 38, w - 24); x.fillText("Seguimiento:", X + w / 2, Y + 194); ajustar(x, "mañana", 800, 38, w - 24); x.fillText("mañana", X + w / 2, Y + 236); }
  });
  if (cuenta[0] === 0) { x.strokeStyle = "#b4b2a3"; x.lineWidth = 5; x.setLineDash([18, 14]); x.beginPath(); x.roundRect(cx(0) + 5, 250, cw - 10, 180, 22); x.stroke(); x.setLineDash([]); x.fillStyle = "#16243d"; x.textAlign = "center"; ajustar(x, "Nada", 800, 42, cw - 60); x.fillText("Nada", cx(0) + cw / 2, 318); ajustar(x, "sin ver", 800, 42, cw - 60); x.fillText("sin ver", cx(0) + cw / 2, 366); }
  // los totales
  const yT = e.cero ? 880 : 990;
  const abiertos = CARDS.reduce((a, c, i) => a + (Math.round(e.col[i]) < 2 ? c[2] : 0), 0);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(20, yT, W / 2 - 30, 170, 26); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "center"; ajustar(x, "Abiertos", 800, 40, W / 2 - 80); x.fillText("Abiertos", 20 + (W / 2 - 30) / 2, yT + 50);
  x.fillStyle = "#0b1220"; ajustar(x, plata(abiertos), 900, 66, W / 2 - 70); x.fillText(plata(abiertos), 20 + (W / 2 - 30) / 2, yT + 118);
  x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.beginPath(); x.roundRect(W / 2 + 10, yT, W / 2 - 30, 170, 26); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; ajustar(x, "Aceptados", 800, 40, W / 2 - 80); x.fillText("Aceptados", W / 2 + 10 + (W / 2 - 30) / 2, yT + 50);
  ajustar(x, plata(e.aceptados), 900, 66, W / 2 - 70); x.fillText(plata(e.aceptados), W / 2 + 10 + (W / 2 - 30) / 2, yT + 118);
  if (e.cero) { x.fillStyle = "#16243d"; rr(x, 20, yT + 190, W - 40, 96, 30); x.fillStyle = "#5ce611"; ajustar(x, "Seguimientos a mano: 0", 900, 54, W - 100); x.fillText("Seguimientos a mano: 0", W / 2, yT + 240); }
}
// el estado del tablero en t (Q3 en adelante): Fabián y Pablo pasan a ACEPTADO, Silvia con duda, Andrés mañana
function estadoTablero(t) {
  const u = (a) => sg(t, a, a + 0.28);
  const col = [2, 1 + u(T.cards[0]), 1 + u(T.cards[1]), 1, 1];
  const ac = 38000 + 14500 * (t >= T.cards[0] + 0.14 ? 1 : 0) + 22000 * (t >= T.cards[1] + 0.14 ? 1 : 0);
  return { col, duda: t >= T.cards[2], manana: t >= T.cards[3], aceptados: ac, cero: t >= T.cero, desdeY: [0, 250, 426, 0, 0] };
}
// Q1: el formulario "Nuevo presupuesto" en la tablet del banco, con el botón Enviar → Enviado ✓
function dibujarNuevo(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 132); x.fillStyle = "#5ce611"; x.fillRect(0, 132, W, 10);
  x.fillStyle = "#efeee5"; ajustar(x, "Nuevo presupuesto", 800, 60, W - 60); x.fillText("Nuevo presupuesto", 34, 68);
  const fila = (y, a, b, px = 54) => { x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, y, W - 60, 150, 24); x.fill(); x.stroke(); x.fillStyle = "#16243d"; ajustar(x, a, 700, 40, W - 120); x.fillText(a, 60, y + 44); x.fillStyle = "#0b1220"; ajustar(x, b, 800, px, W - 120); x.fillText(b, 60, y + 104); };
  fila(180, "Cliente", "Sergio · STR 4581"); fila(350, "Trabajo", "Embrague completo"); fila(520, "Total", "$ 38.000", 74);
  if (e < 2) { x.fillStyle = e === 1 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(30, 730, W - 60, 190, 95); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Enviar", 900, 96, W - 120); x.fillText("Enviar", W / 2, 828); }
  else { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 730, W - 60, 190, 40); x.fill(); x.fillStyle = "#5ce611"; x.textAlign = "center"; ajustar(x, "Enviado ✓", 900, 92, W - 120); x.fillText("Enviado ✓", W / 2, 828); }
  x.fillStyle = "#16243d"; x.textAlign = "center"; ajustar(x, "Por WhatsApp, con botón", 700, 46, W - 80); x.fillText("Por WhatsApp, con botón", W / 2, 1010);
}
let claveTab = "";
function dibujarTablet(t) {
  const q3 = t >= T.q3;
  const e = q3 ? estadoTablero(t) : t >= T.enviar + 0.12 ? 2 : t >= T.enviar ? 1 : 0;
  const k = JSON.stringify(e) + q3; if (k === claveTab) return; claveTab = k;
  if (q3) dibujarTablero(pantT.userData.x, TAB_W, TAB_H, e); else dibujarNuevo(pantT.userData.x, TAB_W, TAB_H, e);
  pantT.needsUpdate = true;
}

// =====================================================================================================
// LOS CELULARES Y LA TABLET A PANTALLA (pegados a la cámara)
// =====================================================================================================
function crearFondoInserto(g) {
  // el taller desenfocado: la pared de bloques navy claro abajo, crema arriba, el piso claro con la franja verde
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: 0x16243d })); bg.position.z = -0.06; g.add(bg);
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 900 / PXK), new THREE.MeshBasicMaterial({ color: 0xe4e1d3 })); pc.position.set(0, 820 / PXK, -0.058); g.add(pc);
  const pi = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 700 / PXK), new THREE.MeshBasicMaterial({ color: 0xd2cfc1 })); pi.position.set(0, -900 / PXK, -0.058); g.add(pi);
  const fr = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 26 / PXK), new THREE.MeshBasicMaterial({ color: 0x5ce611 })); fr.position.set(0, -620 / PXK, -0.057); g.add(fr);
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: opc.funda ?? 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  const brillo = new THREE.Mesh(rbox((IW + 2 * marcoR - 10) / PXK, (IH + 2 * marcoR - 10) / PXK, 0.005, 76 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x2c4268 })); brillo.position.set((cx - 540 - 3) / PXK, (960 - cy + 3) / PXK, -0.035); g.add(brillo);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  if (opc.mano) {
    const piel = new THREE.MeshBasicMaterial({ color: opc.mano }), sombraP = new THREE.MeshBasicMaterial({ color: new THREE.Color(opc.mano).multiplyScalar(0.82) });
    const palma = new THREE.Mesh(rbox(330 / PXK, 420 / PXK, 0.01, 120 / PXK, 3), piel); palma.position.set((cx - 540 - IW / 2 + 90) / PXK, (960 - cy - IH / 2 - 120) / PXK, -0.045); palma.rotation.z = -0.35; g.add(palma);
    const pulgar = new THREE.Mesh(rbox(86 / PXK, 250 / PXK, 0.01, 43 / PXK, 3), piel); pulgar.position.set((cx - 540 - IW / 2 + 20) / PXK, (960 - cy - IH / 2 + 160) / PXK, -0.015); pulgar.rotation.z = -0.5; if (!opc.sinPulgar) g.add(pulgar);
    const una = new THREE.Mesh(rbox(50 / PXK, 60 / PXK, 0.01, 22 / PXK, 3), sombraP); una.position.set((cx - 540 - IW / 2 + 70) / PXK, (960 - cy - IH / 2 + 250) / PXK, -0.014); una.rotation.z = -0.5; if (!opc.sinPulgar) g.add(una);
    if (opc.grasa) { const gm = new THREE.MeshBasicMaterial({ color: 0x3a3f4a, transparent: true, opacity: 0.7 }); const m = new THREE.Mesh(new THREE.CircleGeometry(26 / PXK, 16), gm); m.position.set(pulgar.position.x + 0.01, pulgar.position.y + 0.09, -0.013); m.scale.set(1, 0.7, 1); g.add(m); }
  }
  return { g, tex, IW, IH };
}
// P2 · el celular de Óscar con el chat de la semana (arriba; el pincho queda abajo, en 3D)
const INSO = { g: new THREE.Group() };
const CELO = crearCelInserto(680, 1010, 540, 620, 30, { camara: true, funda: 0x1a1c20 }); INSO.g.add(CELO.g);
// Q1b / Q2 / Q2c · el celular de Sergio a pantalla
const INS1 = { g: new THREE.Group() }; crearFondoInserto(INS1.g);
const CEL1 = crearCelInserto(740, 1290, 540, 1010, 34, { camara: true, funda: 0x1f3254 }); INS1.g.add(CEL1.g);
// Q3 · la tablet a pantalla (el tablero)
const INS3 = { g: new THREE.Group() }; crearFondoInserto(INS3.g);
const TAB = crearCelInserto(1040, 1200, 540, 1110, 16, { camara: false }); INS3.g.add(TAB.g);
for (const I of [INSO, INS1, INS3]) { pegarACamara(I.g, camera, 10); I.g.visible = false; }

// ---- el chat de Óscar (la semana): cada fila con el DÍA grande (el reloj del chiste), el avatar y la respuesta ----
const SEMANA = [
  { dia: "MARTES", cv: AVATAR.fabian, nom: "Fabián", yo: ["Frenos y discos", "$ 14.500"], visto: "Visto 10:12" },
  { dia: "MIÉRCOLES", cv: AVATAR.pablo, nom: "Pablo", txt: "Lo hablo con mi señora." },
  { dia: "JUEVES", cv: AVATAR.silvia, nom: "Silvia", txt: "Te confirmo el lunes." },
  { dia: "VIERNES", cv: AVATAR.andres, nom: "Andrés", txt: "Dale, cualquier cosa te escribo." },
];
function filaSemana(x, W, y, f, k = 1) {
  // devuelve el alto de la fila; k = 0..1 aparición de la burbuja
  x.textBaseline = "middle"; x.textAlign = "left";
  x.font = F(900, 46); const wd = x.measureText(f.dia).width + 44;
  x.fillStyle = "#16243d"; rr(x, 24, y, wd, 70, 35); x.fillStyle = "#efeee5"; x.fillText(f.dia, 46, y + 37);
  avatar(x, f.cv, 70, y + 140, 44); x.fillStyle = "#0b1220"; x.font = F(800, 42); x.fillText(f.nom, 128, y + 118);
  let h;
  if (f.yo) {
    // el presupuesto que mandó Óscar (burbuja de la derecha con el papel) y "Visto" en gris, sin respuesta
    const bw = 400, bx = W - 24 - bw, by = y + 150;
    x.globalAlpha = k; x.fillStyle = "#cfeebc"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(bx, by, bw, 142, [30, 30, 8, 30]); x.fill(); x.stroke();
    x.fillStyle = "#f7f5ec"; x.strokeStyle = "#b4b2a3"; x.lineWidth = 3; x.beginPath(); x.roundRect(bx + 16, by + 16, 70, 108, 6); x.fill(); x.stroke(); x.fillStyle = "#16243d"; x.fillRect(bx + 16, by + 16, 70, 16); x.fillStyle = "#b4b2a3"; for (let i = 0; i < 4; i++) x.fillRect(bx + 24, by + 46 + i * 18, 52, 5);
    x.fillStyle = "#0b1220"; ajustar(x, f.yo[0], 800, 38, bw - 120); x.fillText(f.yo[0], bx + 102, by + 48); x.font = F(900, 46); x.fillText(f.yo[1], bx + 102, by + 102);
    x.textAlign = "right"; x.fillStyle = "#6b7080"; x.font = F(800, 42); x.fillText(f.visto, W - 30, by + 180); x.globalAlpha = 1;
    h = 150 + 142 + 60;
  } else {
    x.font = F(800, 44); const ls = renglones(x, f.txt, W - 190);
    const bh = 30 + ls.length * 54, bx = 128, by = y + 150;
    x.globalAlpha = k; x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(bx, by, W - bx - 24, bh, [8, 30, 30, 30]); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; ls.forEach((l, i) => x.fillText(l, bx + 22, by + 42 + i * 54)); x.globalAlpha = 1;
    h = 150 + bh + 26;
  }
  return h;
}
let claveO = "";
function dibujarCeluOscar(t) {
  const n = T.dia.filter((d) => t >= d).length, k = Math.round(sg(t, T.msg[Math.max(0, n - 1)], T.msg[Math.max(0, n - 1)] + 0.15) * 4) / 4;
  const clave = `${n}|${k}`; if (clave === claveO) return; claveO = clave;
  const { x } = CELO.tex.userData, W = CELO.IW, H = CELO.IH;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  // las filas, de abajo hacia arriba: la última siempre entera abajo
  const hs = SEMANA.slice(0, n).map((f, i) => { const c = document.createElement("canvas").getContext("2d"); return filaSemana(c, W, 0, f, 1); });
  let y = H - 30 - hs.reduce((a, b) => a + b, 0); y = Math.min(y, 170);
  SEMANA.slice(0, n).forEach((f, i) => { filaSemana(x, W, y, f, i === n - 1 ? k : 1); y += hs[i]; });
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 150); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 56); x.fillText("Presupuestos", 36, 62); x.font = F(700, 42); x.fillText("enviados esta semana", 38, 116);
  // las huellas de grasa en la pantalla (semitransparentes, sin tapar el texto)
  x.fillStyle = "rgba(58,63,74,0.13)"; for (const [cx, cy, r, a] of [[W - 120, 300, 70, 0.4], [150, H - 160, 60, -0.6]]) { x.beginPath(); x.ellipse(cx, cy, r, r * 0.7, a, 0, 7); x.fill(); }
  CELO.tex.needsUpdate = true;
}
// el celular 3D de Óscar (P7): el mensaje nuevo
let claveO3 = "";
function dibujarCeluO3(t) {
  const e = t >= T.vibra ? 1 : 0; if (`${e}` === claveO3) return; claveO3 = `${e}`;
  const { x } = pantO.userData, w = 600, h = 975;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.textAlign = "left"; x.font = F(800, 58); x.fillText("Chats", 36, 80);
  if (e) { x.fillStyle = "#ffffff"; rr(x, 20, 190, w - 40, 260, 30); avatar(x, AVATAR.gris, 100, 270, 56); x.fillStyle = "#0b1220"; x.font = F(800, 44); x.fillText("Hola, ¿me pasás", 30, 380); x.fillText("presupuesto…?", 30, 428); }
  pantO.needsUpdate = true;
}
// ---- el celular de Sergio: el presupuesto con botones (Q1b), el seguimiento (Q2), aceptar y agendar (Q2c) ----
function botones(x, W, y, toca = 0) {
  x.fillStyle = toca === 1 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(30, y, W - 60, 120, 60); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Aceptar y agendar", 900, 56, W - 120); x.fillText("Aceptar y agendar", W / 2, y + 62);
  x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(30, y + 140, W - 60, 110, 55); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; ajustar(x, "Tengo una duda", 800, 50, W - 120); x.fillText("Tengo una duda", W / 2, y + 197);
  if (toca === 1) { x.strokeStyle = "rgba(11,18,32,0.45)"; x.lineWidth = 12; x.beginPath(); x.arc(W / 2 + 190, y + 60, 64, 0, 7); x.stroke(); }
}
let claveS = "";
function dibujarCeluSergio(t) {
  const fase = t >= T.q2c ? (t >= T.agendado ? 5 : t >= T.jue ? 4 : t >= T.acepta ? 3 : 2) : t >= T.q2 ? (t >= T.seg ? 1.5 : 1) : t >= T.llega ? 0.5 : 0;
  if (`${fase}` === claveS) return; claveS = `${fase}`;
  const { x } = CEL1.tex.userData, W = CEL1.IW, H = CEL1.IH;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 180); x.fillStyle = "#5ce611"; x.fillRect(0, 180, W, 10);
  avatar(x, AVATAR.oscar, 90, 90, 56); x.fillStyle = "#efeee5"; x.font = F(800, 54); x.fillText("Mecánica Óscar", 168, 70); x.font = F(700, 38); x.fillText("en línea", 170, 128);
  if (fase === 0) { CEL1.tex.needsUpdate = true; return; }
  if (fase === 0.5) {
    // el presupuesto con botones
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, 230, W - 48, 690, [10, 34, 34, 34]); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.font = F(800, 42); x.fillText("Presupuesto", 56, 290);
    x.fillStyle = "#0b1220"; ajustar(x, "Embrague completo", 800, 58, W - 110); x.fillText("Embrague completo", 56, 360);
    x.fillStyle = "#16243d"; x.font = F(700, 42); x.fillText("Kit + mano de obra", 56, 428);
    x.fillStyle = "#0b1220"; x.font = F(900, 110); x.fillText("$ 38.000", 50, 540);
    x.fillStyle = "#16243d"; x.font = F(700, 42); x.fillText("Válido 7 días", 56, 640);
    x.fillStyle = "#3fa60a"; x.font = F(800, 40); x.fillText("Sedán STR 4581", 56, 700);
    botones(x, W, 960);
    CEL1.tex.needsUpdate = true; return;
  }
  // Q2 en adelante: arriba el presupuesto chico; abajo el seguimiento (miércoles) con sus botones o la agenda
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(24, 220, W - 48, 120, 26); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; ajustar(x, "Presupuesto · Embrague", 800, 42, W - 110); x.fillText("Presupuesto · Embrague", 50, 258); x.font = F(900, 46); x.fillText("$ 38.000", 50, 310);
  if (fase === 1) { CEL1.tex.needsUpdate = true; return; }
  const msg = "Hola, Sergio. ¿Pudiste ver el presupuesto del embrague? Si querés, te lo agendamos esta semana.";
  x.font = F(800, 46); const ls = renglones(x, msg, W - 120);
  const by = 370, bh = 40 + ls.length * 58;
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, by, W - 48, bh, [10, 34, 34, 34]); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; ls.forEach((l, i) => x.fillText(l, 54, by + 50 + i * 58));
  const yb = by + bh + 30;
  if (fase < 4) botones(x, W, yb, fase === 3 ? 1 : 0);
  else {
    // la tira de turnos y el agendado
    x.fillStyle = "#16243d"; x.font = F(800, 44); x.textAlign = "left"; x.fillText("Elegí el turno:", 40, yb + 30);
    [["Mié", "16:00"], ["Jue", "8:30"], ["Vie", "10:00"]].forEach(([d, h], i) => { const xx = 24 + i * 234, sel = i === 1; x.fillStyle = sel ? "#5ce611" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(xx, yb + 70, 218, 150, 28); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(800, 48); x.fillText(d, xx + 109, yb + 118); x.font = F(900, 52); x.fillText(h, xx + 109, yb + 182); });
    if (fase === 5) {
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, yb + 250, W - 48, 190, 40); x.fill();
      x.fillStyle = "#5ce611"; x.beginPath(); x.arc(110, yb + 345, 56, 0, 7); x.fill(); tilde(x, 112, yb + 347, 58, "#0b1220");
      x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Turno agendado", 900, 60, W - 240); x.fillText("Turno agendado", 190, yb + 312); x.fillStyle = "#5ce611"; x.font = F(800, 54); x.fillText("Jueves 8:30", 190, yb + 380);
    }
  }
  CEL1.tex.needsUpdate = true;
}
let claveTab3 = "";
function dibujarTabInserto(t) { const e = estadoTablero(t); const k = JSON.stringify(e); if (k === claveTab3) return; claveTab3 = k; dibujarTablero(TAB.tex.userData.x, TAB.IW, TAB.IH, e); TAB.tex.needsUpdate = true; }

// =====================================================================================================
// LAS TARJETAS DE ESTE REEL
// =====================================================================================================
const chip = (txt, px = 62, fondo = "#5ce611", tinta = "#0b1220") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo }); };
const GL = {
  presu: crearTarjeta(560, 250, (x, W, H) => { x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 40); x.fillText("PRESUPUESTO", 30, 46); x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText("Embrague completo", 30, 108); x.font = F(900, 84); x.fillText("$ 38.000", 28, 190); }, { fondo: "#f7f5ec" }),
  lunes: chip("LUNES", 60),
  s1: crearGlobo(["Lo pienso y te [aviso.]"], 76),
  sabado: chip("SÁBADO", 60),
  m1: crearGlobo(["Jefe, ¿a esos", "no los [llamamos?]"], 72),
  o1: crearGlobo(["Si les interesa,", "[llaman.]"], 76),
  s2: crearGlobo(["¡Óscar! Al final lo", "hice acá a la vuelta.", "[¡Me llamaron!]"], 66),
  r1: crearRotulo([["5 presupuestos"], ["esta semana"]], 50),
  r2: crearRotulo([["$ 90.800", "#ff9d92", 70], ["en el pincho", "#ff9d92"]], 52),
  r3: crearRotulo([["Embrague $ 38.000:", "#ff9d92"], ["a la vuelta", "#ff9d92"]], 50),
  o2: crearGlobo(["Lo pensó.", "Y me [avisó.]"], 84),
  nuevo: crearTarjeta(880, 270, (x, W) => { avatar(x, AVATAR.gris, 80, 80, 54); x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(700, 40); x.fillText("Mensaje nuevo · ahora", 152, 80); x.fillStyle = "#0b1220"; x.font = F(800, 52); x.fillText("Hola, ¿me pasás presupuesto", 34, 168); x.fillText("de embrague?", 34, 230); }, { fondo: "#ffffff" }),
  o3: crearGlobo(["Pensalo [tranquilo.]"], 80),
  rBoton: crearRotulo([["Presupuesto con botón"]], 50),
  estado: crearTarjeta(620, 120, (x, W, H) => dibujarEstado(x, W, H, 0), { fondo: "#efeee5" }),
  miercoles: chip("Miércoles · 2 días después", 50),
  rSeg: crearRotulo([["Seguimiento automático"]], 50),
  s3: crearGlobo(["Justo lo estaba", "[pensando.]"], 78),
  m1b: crearGlobo(["Jefe, ¿a esos", "no los [llamamos?]"], 62, { cab: { cv: AVATAR.maxi, nombre: "Maxi" } }),
  o4: crearGlobo(["Ya les escribió", "el [sistema.]"], 78),
  jueves: chip("JUEVES · 8:30", 60),
  viernes: chip("VIERNES", 56),
  s4: crearGlobo(["Lo [pensé.]"], 84),
  o5: crearGlobo(["Y me [avisaste.]"], 84),
};
function dibujarEstado(x, W, H, e) {
  x.textBaseline = "middle"; x.textAlign = "left"; x.fillStyle = "#16243d"; x.font = F(800, 40); x.fillText("Tablero:", 26, H / 2 + 2);
  x.fillStyle = e ? "#5ce611" : "#1f3254"; rr(x, 210, 20, W - 230, H - 40, (H - 40) / 2); x.fillStyle = e ? "#0b1220" : "#efeee5"; x.textAlign = "center"; x.font = F(900, 46); x.fillText(e ? "VISTO ✓" : "ENVIADO", 210 + (W - 230) / 2, H / 2 + 3);
}
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// =====================================================================================================
// LOS AUTOS: el de Sergio (en el elevador, en la calle, entrando) y el mismo estacionado en su vereda (Q2b)
// =====================================================================================================
const auto = crearAuto(); scene.add(auto);
// la vereda de Sergio (Q2b, set chico en x = 30): fachada crema con ventana navy, vereda crema, el árbol
const VER_S = new THREE.Group(); VER_S.position.set(30, 0, 0); scene.add(VER_S);
{
  const p = mesh(new THREE.PlaneGeometry(8, 6), M.cr2, 0, 0.0, 0.5); p.rotation.x = -Math.PI / 2; VER_S.add(p);
  VER_S.add(mesh(new THREE.BoxGeometry(8, 4, 0.2), M.pared, 0, 2, -1.3));
  VER_S.add(mesh(new THREE.BoxGeometry(8, 1.1, 0.22), M.navy2, 0, 0.55, -1.28));
  VER_S.add(caja(1.3, 1.2, 0.08, M.navy3, -1.2, 1.9, -1.18, 0.03)); VER_S.add(caja(1.16, 1.06, 0.06, mat(0x2c4268, 0.3), -1.2, 1.9, -1.15, 0.02));
  VER_S.add(caja(1.0, 2.2, 0.08, M.navy3, 1.3, 1.1, -1.18, 0.03)); VER_S.add(caja(0.06, 0.2, 0.06, M.g, 1.0, 1.1, -1.12, 0.02));
  const ar = new THREE.Group(); ar.position.set(2.4, 0, 0.6); VER_S.add(ar);
  ar.add(mesh(new THREE.CylinderGeometry(0.08, 0.11, 1.9, 8), mat(0x6b4a32, 0.9), 0, 0.95, 0));
  semilla = 9; for (let i = 0; i < 5; i++) ar.add(mesh(new THREE.IcosahedronGeometry(0.55 + az() * 0.2, 0), i % 2 ? M.gd : M.g, (az() - 0.5) * 0.7, 2.25 + az() * 0.55, (az() - 0.5) * 0.5));
  sombras(VER_S);
}
fusionar(VER_S);

// =====================================================================================================
// CÁMARA
// =====================================================================================================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un
// plano, Catmull-Rom continua. Q1 y Q4 repiten el encuadre del cuadro 0 (callback). null = inserto a pantalla.
const P1C = (k) => [-0.2, lerp(2.15, 2.12, k), lerp(5.5, 5.05, k), -0.2, 2.45, -1.4, lerp(50, 48, k)];
const PLANOS = [
  ["P1", 0, [[0, ...P1C(0)], [T.p2, ...P1C(1)]]],
  // P1b: el chac, de cerca, desde atrás del banco (Óscar de frente clava la copia)
  ["P1b", r2(T.clava[0] + 0.12), [[r2(T.clava[0] + 0.12), -3.35, 1.62, 2.75, -1.4, 1.22, 0.75, 44], [T.p2, -3.3, 1.62, 2.68, -1.4, 1.22, 0.75, 42]]],
  ["P2", T.p2, [[T.p2, PINCHO.x + 0.9, 1.62, PINCHO.z + 0.72, PINCHO.x, 1.52, PINCHO.z, 46], [T.p3, PINCHO.x + 0.86, 1.6, PINCHO.z + 0.68, PINCHO.x, 1.5, PINCHO.z, 44]]],
  ["P3", T.p3, [[T.p3, 0.85, 1.55, 5.6, -0.55, 1.22, 0.6, 48], [T.p4, 0.82, 1.55, 5.35, -0.55, 1.22, 0.6, 46]]],
  ["P4", T.p4, [[T.p4, 0.2, 1.55, 4.3, -0.15, 1.4, -7.5, 42], [T.p5, 0.2, 1.55, 4.1, -0.05, 1.4, -7.5, 41]]],
  // (r1) P4b: de cerca, desde la vereda del taller, la cámara acompaña a Sergio asomado por la ventanilla
  ["P4b", r2(T.s2 + 0.05), "sergio"],
  ["P5", T.p5, [[T.p5, -1.98, 1.5, 2.3, -0.9, 0.95, -4.0, 50], [T.p6, -1.98, 1.5, 2.22, -0.9, 0.95, -4.0, 48]]],
  ["P6", T.p6, [[T.p6, -0.45, 1.6, -2.75, -0.8, 1.45, -4.35, 42], [T.p7, -0.47, 1.58, -2.85, -0.8, 1.45, -4.35, 40]]],
  ["P7", T.p7, [[T.p7, -0.55, 1.62, 1.75, -2.05, 1.28, 1.18, 46], [P1, -0.62, 1.6, 1.72, -2.05, 1.28, 1.18, 43]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...P1C(0)], [r2(T.enviar - 0.4), ...P1C(0.6)]]],
  // Q1t: por encima del hombro de Óscar, toca Enviar en la tablet
  ["Q1t", r2(T.enviar - 0.4), [[r2(T.enviar - 0.4), -0.62, 1.72, 2.45, -1.95, 1.2, 1.5, 40], [T.q1b, -0.66, 1.7, 2.38, -1.95, 1.2, 1.5, 38]]],
  ["Q1b", T.q1b, null],
  ["Q2", T.q2, null],
  ["Q2b", T.q2b, [[T.q2b, 30.6, 1.55, 2.6, 29.85, 1.42, 0.0, 40], [T.q2c, 30.55, 1.55, 2.4, 29.85, 1.42, 0.0, 37]]],
  ["Q2c", T.q2c, null],
  ["Q3", T.q3, null],
  ["Q3b", T.q3b, [[T.q3b, -4.25, 1.95, 2.95, -1.05, 1.38, 0.98, 46], [T.q4, -4.1, 1.94, 2.9, -1.05, 1.38, 0.98, 44]]],
  ["Q4", T.q4, [[T.q4, ...P1C(0)], [T.q4b, ...P1C(0.3)]]],
  ["Q4b", T.q4b, [[T.q4b, -0.22, 1.62, 3.4, -0.2, 1.42, -0.6, 44], [T.q4c, -0.22, 1.62, 3.2, -0.2, 1.42, -0.6, 42]]],
  ["Q4c", T.q4c, [[T.q4c, 1.2, 1.8, 5.4, -1.4, 1.65, -3.0, 50], [T.q5, 1.15, 1.85, 5.2, -1.4, 1.7, -3.0, 49]]],
  ["Q5", T.q5, [[T.q5, -0.5, 1.3, 1.66, -1.9, 1.2, 1.66, 44], [T.viaje[0], -0.55, 1.3, 1.66, -1.9, 1.2, 1.66, 43], [T.viaje[1], -1.33, 1.16, 2.2, -1.9, 1.14, 2.22, 40], [DUR, -1.36, 1.16, 2.21, -1.9, 1.14, 2.22, 39]]],
];
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCam(v, t) {
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6]; camera.updateProjectionMatrix();
  camera.lookAt(_m.set(v[3], v[4], v[5]));
}
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }

// =====================================================================================================
// POSES
// =====================================================================================================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.2, feliz: 0 }, cejas: { alto: -0.1, ang: -0.15 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.92, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } };
const SEGURO = { ...CARA.neutra, ojos: { abiertos: 0.9, feliz: 0.1 }, cejas: { alto: 0.25, ang: 0.1, asim: 0 }, boca: { sonrisa: 0.2, abierta: 0, ancho: 1.0 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);   // hablando, nunca con los ojos cerrados
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
// un punto del mundo en el espacio del cuerpo del personaje (para mandar la mano ahí): pone la pose, mide y devuelve
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const OSC1 = { x: -0.98, z: 0.95 };   // Óscar en el cuadro 0
const SER1 = { x: 0.38, z: 1.1 };    // Sergio en el cuadro 0
const OSC4 = { x: -0.5, z: -4.35 };   // Óscar en el portón, mirando la calle (P4-P7)
const MAX4 = { x: 0.8, z: -4.45 };
const OSCQ4 = { x: -0.68, z: -0.55 }, SERQ4 = { x: 0.38, z: -0.45 };
const topePincho = () => V3(PINCHO.x, BANCO.alto + PIN.base + PIN.alto + 0.02, PINCHO.z);
function poseOscar(t) {
  const p2 = t >= P2;
  if (!p2) {
    if (t < T.p3) {
      // P1: le dio el presupuesto a Sergio (la copia en la mano derecha); se da vuelta y la clava en el pincho
      const gP = dirGiro(OSC1.x, OSC1.z, PINCHO.x, PINCHO.z);
      const p = poseEn(t, [
        [0, { x: OSC1.x, z: OSC1.z, giro: 0.7, ...aC(0.1, 0.05), ...CARA.neutra, ...BRAZOS.costado, manoD: [-0.16, 0.24, 0.3], codoD: [-0.8, -0.6, -0.2] }],
        [T.s1 + 0.3, { ...aC(0.15, 0.0), ...SECO }, 0.3],
        [T.clava[0] + 0.15, { giro: gP + 0.25, ...aC(-0.1, 0.25) }, 0.3],
        [T.chac0 + 0.4, { giro: 0.55, ...aC(0.2, 0.0), ...SECO, manoD: [-0.29, -0.08, 0.04], codoD: null }, 0.35],
      ]);
      // la mano derecha va al tope del pincho y empuja para abajo (dos pasadas: pose, medir, mano)
      const k = sg(t, T.clava[0], T.clava[0] + 0.3) * (1 - sg(t, T.chac0 + 0.05, T.chac0 + 0.35));
      if (k > 0) { const w = topePincho().add(V3(0, 0.05 - 0.13 * sg(t, T.chac0 - 0.12, T.chac0), 0)); const m = aCuerpo(oscar, p, w); p.manoD = p.manoD.map((v, i) => lerp(v, m[i], eio(k))); p.codoD = [-0.6, -0.6, -0.4]; }
      p.t = t; return p;
    }
    if (t < T.p4) {
      // P3: en el banco, limpiándose las manos con el trapo; "Si les interesa, llaman." y guarda el trapo
      const fr = Math.sin(t * 9) * 0.03;
      const p = poseEn(t, [
        [0, { x: -1.0, z: 1.62, giro: 0.95, inclina: 0.03, ...aC(0.25, 0.25), ...SECO, manoI: [0.06 + fr, 0.16, 0.3], manoD: [-0.06 + fr, 0.18, 0.31], codoI: [0.9, -0.6, -0.1], codoD: [-0.9, -0.6, -0.1] }],
        [T.o1 - 0.05, { ...aC(0.55, 0.02), ...SEGURO }, 0.3],
        [T.trapo + 0.3, { manoD: [-0.22, -0.02, -0.12], codoD: [-1, -0.3, 0.2], manoI: [0.29, -0.08, 0.04] }, 0.3],
      ]);
      p.t = t; bocaVoz(p, t, T.o1, ENV.o1, 0.6); return p;
    }
    // P4 · P5 · P6 · P7: en el medio del taller, mirando la calle; se da vuelta hacia el pincho; el remate; el celular
    const gP = dirGiro(OSC4.x, OSC4.z, PINCHO.x, PINCHO.z) + Math.PI * 2;
    const p = poseEn(t, [
      [0, { x: OSC4.x, z: OSC4.z, giro: Math.PI + 0.1, ...aC(0, -0.05), ...CARA.neutra, ...BRAZOS.costado }],
      [T.s2 + 1.2, { ...aC(0.05, -0.05), ...CARA.incredula, ojos: { abiertos: 0.9 } }, 0.3],
      [T.vuelta[1], { giro: gP, ...aC(0, 0.2), ...SECO }, T.vuelta[1] - T.vuelta[0]],
      [T.o2 - 0.05, { ...aC(0.05, 0.12), ...SECO, cejas: { alto: 0.05, ang: 0.2 } }, 0.2],
      [T.p7 + 0.05, { ...BRAZOS.celular, ...aC(-0.05, 0.38) }, 0.15],
      [T.vibra + 0.45, { ...aC(0.0, 0.36), ...CARA.incredula, ojos: { abiertos: 0.95 } }, 0.15],
      [T.pincho2[1] + 0.12, { ...aC(-0.6, 0.18) }, 0.25],
    ]);
    p.t = t; bocaVoz(p, t, T.o2, ENV.o2, 0.55); return p;
  }
  // ---- parte 2 ----
  if (t < T.q4) {
    if (t < T.q3) {
      // Q1: el mismo lugar del cuadro 0, media sonrisa; toca Enviar en la tablet
      const gT = dirGiro(-1.22, 1.32, tablet.position.x, tablet.position.z);
      const p = poseEn(t, [
        [0, { x: OSC1.x, z: OSC1.z, giro: 0.7, ...aC(0.1, 0.05), ...MEDIA, ...BRAZOS.costado }],
        [T.o3 - 0.1, { ...aC(0.2, 0.02), ...MEDIA }, 0.3],
        [T.enviar - 0.05, { x: -1.22, z: 1.32, giro: gT, ...aC(0, 0.3) }, 0.4],
      ]);
      if (t > T.enviar - 0.45 && t < T.enviar - 0.05) p.paso = 1;
      const k = sg(t, T.enviar - 0.25, T.enviar) * (1 - sg(t, T.enviar + 0.2, T.enviar + 0.45));
      if (k > 0) { const w = tablet.position.clone().add(V3(0.09, 0.28, 0)); const m = aCuerpo(oscar, p, w); p.manoD = p.manoD.map((v, i) => lerp(v, m[i], eio(k))); p.dedoD = k; p.codoD = [-0.7, -0.6, -0.3]; }
      p.t = t; bocaVoz(p, t, T.o3, ENV.o3, 0.55); return p;
    }
    // Q3b: en el banco frente a la tablet, sin levantar la vista: "Ya les escribió el sistema."
    const p = poseEn(t, [[0, { x: -1.13, z: 1.66, giro: -Math.PI / 2 - 0.05, inclina: 0.06, ...aC(0.0, 0.32), ...MEDIA, ...BRAZOS.apoyado, manoI: [0.24, 0.3, 0.34], manoD: [-0.24, 0.3, 0.34] }], [T.o4 - 0.05, { ...aC(0.15, 0.08), ...MEDIA, ojos: { abiertos: 0.9, y: -0.6 } }, 0.25]]);
    p.t = t; bocaVoz(p, t, T.o4, ENV.o4, 0.55); return p;
  }
  // Q4: el auto entra; Q4b frente a Sergio, recibe la llave; Q4c se da vuelta y aprieta el botón del elevador
  const gB = dirGiro(OSCQ4.x, OSCQ4.z, BOTONERA.x, BOTONERA.z);
  const p = poseEn(t, [
    [0, { x: OSCQ4.x, z: OSCQ4.z, giro: 1.3, ...aC(0.1, 0.0), ...MEDIA, ...BRAZOS.costado }],
    [T.o5 - 0.1, { ...aC(0.15, 0.05), ...CARA.sonrisa }, 0.3],
    [T.llave + 0.12, { manoD: [-0.2, 0.25, 0.4], codoD: [-0.8, -0.6, -0.2] }, 0.2],
    [T.q4c + 0.08, { giro: gB, ...aC(0.0, 0.1), manoD: [-0.16, 0.12, 0.3] }, 0.25],
  ]);
  const k = sg(t, T.sube[0] - 0.25, T.sube[0] - 0.05) * (1 - sg(t, T.sube[0] + 0.1, T.sube[0] + 0.35));
  if (k > 0) { const w = V3(BOTONERA.x, 1.16, BOTONERA.z + 0.13); const m = aCuerpo(oscar, p, w); p.manoD = p.manoD.map((v, i) => lerp(v, m[i], eio(k))); p.dedoD = k; }
  if (t >= T.q4c + 0.4) Object.assign(p, { cabeza: { ...p.cabeza, giro: 0.6, asiente: -0.2 } });
  p.t = t; bocaVoz(p, t, T.o5, ENV.o5, 0.55); return p;
}
function poseMaxi(t) {
  const p2 = t >= P2;
  if (!p2) {
    if (t < T.p4) {
      // P3: sentado en la pila de cubiertas, aburrido, mira el pincho lleno: "Jefe, ¿a esos no los llamamos?"
      const p = poseEn(t, [
        [0, { x: CUB.x, y: 0.31, z: CUB.z, giro: -0.85, sentado: 1, inclina: 0.18, ...aC(-0.15, 0.08), ...CARA.neutra, ojos: { abiertos: 0.8 }, manoI: [0.14, 0.05, 0.36], manoD: [-0.14, 0.05, 0.36], codoI: [0.8, -0.6, -0.1], codoD: [-0.8, -0.6, -0.1] }],
        [T.m1, { ...aC(-0.2, 0.0), ...CARA.esperanza, ojos: { abiertos: 0.95 } }, 0.25],
        [T.o1 + 0.2, { ...aC(-0.35, 0.05), ...CARA.neutra }, 0.3],
      ]);
      p.t = t; bocaVoz(p, t, T.m1, ENV.m1, 0.65); return p;
    }
    if (t < T.p7) {
      const gP = dirGiro(MAX4.x, MAX4.z, PINCHO.x, PINCHO.z) + Math.PI * 2;
      const p = poseEn(t, [[0, { x: MAX4.x, z: MAX4.z, giro: Math.PI - 0.15, ...aC(0, -0.05), ...CARA.neutra, ...BRAZOS.costado }], [T.vuelta[1] + 0.1, { giro: gP, ...aC(0, 0.15) }, T.vuelta[1] - T.vuelta[0]], [T.o2b, { ...aC(-0.4, 0.05), ...CARA.incredula }, 0.3]]);
      p.t = t; return p;
    }
    // P7: entra por la derecha con el segundo pincho y lo apoya en el banco, al lado del primero
    const u = sg(t, T.p7 - 0.1, T.pincho2[0]);
    const p = poseEn(t, [[0, { giro: Math.PI / 2 + 0.25, ...aC(0.2, 0.25), ...CARA.neutra, ...BRAZOS.costado, manoD: [-0.25, 0.25, 0.35], codoD: [-0.8, -0.6, -0.2] }], [T.pincho2[1] + 0.25, { manoD: [-0.29, -0.08, 0.04], ...aC(0.5, 0.05) }, 0.3]]);
    Object.assign(p, { x: BANCO.x - 0.75, z: lerp(-0.4, 0.98, eo(u)), paso: u > 0 && u < 1 ? 1 : 0 });
    const k = sg(t, T.pincho2[0] - 0.3, T.pincho2[0]) * (1 - sg(t, T.pincho2[1] + 0.1, T.pincho2[1] + 0.35));
    if (k > 0) { const w = pincho2Lugar().add(V3(0, 0.12 + 0.1 * (1 - sg(t, T.pincho2[0], T.pincho2[1])), 0)); const m = aCuerpo(maxi, p, w); p.manoD = p.manoD.map((v, i) => lerp(v, m[i], eio(k))); }
    p.t = t; return p;
  }
  if (t < T.q4) {
    // parte 2: de pie, trabajando (al lado del gato); Q3b: en el banco, al lado de Óscar, mira la tablet
    if (t < T.q3) { const p = poseEn(t, [[0, { x: 1.55, z: -0.3, giro: -2.2, ...aC(0, 0.3), ...CARA.concentrada, ...BRAZOS.costado }]]); p.t = t; return p; }
    const p = poseEn(t, [[0, { x: -1.08, z: 0.5, giro: -1.25, ...aC(-0.3, 0.25), ...CARA.esperanza, ...BRAZOS.costado }], [T.o4 + 0.2, { ...aC(0.2, 0.25), ...CARA.sorpresa }, 0.3]]);
    p.t = t; bocaVoz(p, t, T.m1b, ENV.m1, 0.65); return p;
  }
  // Q4c: en el panel de herramientas, cuelga el pincho vacío en su silueta
  const p = poseEn(t, [[0, { x: SILUETA.x + 0.2, z: ZF + 0.75, giro: Math.PI + 0.15, ...aC(0, -0.15), ...CARA.sonrisa, ...BRAZOS.costado }]]);
  const k = sg(t, T.q4c - 0.1, T.cuelga[0]) * (1 - sg(t, T.cuelga[1] + 0.15, T.cuelga[1] + 0.45));
  if (k > 0) { const w = V3(SILUETA.x, SILUETA.y + 0.05 + 0.12 * (1 - sg(t, T.cuelga[0], T.cuelga[1])), ZF + 0.3); const m = aCuerpo(maxi, p, w); p.manoD = p.manoD.map((v, i) => lerp(v, m[i], eio(k))); p.codoD = [-0.8, -0.5, -0.2]; }
  p.t = t; return p;
}
const pincho2Lugar = () => V3(PINCHO.x - 0.3, BANCO.alto, PINCHO.z + 0.06);
function poseSergio(t) {
  const p2 = t >= P2;
  if (!p2) {
    // P1: con el presupuesto en la mano izquierda, simpático: "Lo pienso y te aviso." y se va hacia el portón
    const u = sg(t, T.vaSe[0], T.vaSe[1]);
    const p = poseEn(t, [
      [0, { giro: -0.6, ...aC(-0.1, 0.12), ...BUENA, ...BRAZOS.costado, manoI: [0.16, 0.3, 0.3], codoI: [0.8, -0.6, -0.2], manoD: [-0.22, 0.0, 0.18] }],
      [T.s1, { ...aC(-0.25, 0.02), ...BUENA, cejas: { alto: 0.4, ang: 0.3 } }, 0.25],
      [T.vaSe[0] + 0.2, { giro: -2.4, ...aC(0.5, 0.0), manoI: [0.29, -0.06, 0.06] }, 0.4],
    ]);
    Object.assign(p, { x: lerp(SER1.x, SER1.x + 0.35, eio(u)), z: lerp(SER1.z, SER1.z - 0.55, eio(u)), paso: u > 0.15 && u < 1 ? 1 : 0 });
    p.t = t; bocaVoz(p, t, T.s1, ENV.s1, 0.6); return p;
  }
  if (t < T.q4) {
    if (t < T.q2b) {
      // Q1: igual que el cuadro 0, sin papel; después mira el celular
      const p = poseEn(t, [[0, { x: SER1.x, z: SER1.z, giro: -0.6, ...aC(-0.1, 0.12), ...BUENA, ...BRAZOS.costado }], [T.s1b, { ...aC(-0.25, 0.02), cejas: { alto: 0.4, ang: 0.3 } }, 0.25], [T.enviar + 0.1, { ...BRAZOS.celular, ...aC(0, 0.35), ...CARA.sorpresa, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 } }, 0.25]]);
      p.t = t; bocaVoz(p, t, T.s1b, ENV.s1, 0.6); return p;
    }
    // Q2b: en su vereda, con el celular: "Justo lo estaba pensando."
    const p = poseEn(t, [[0, { x: 29.85, z: 0.0, giro: 0.35, ...aC(0, 0.3), ...CARA.sorpresa, ...BRAZOS.celular }], [T.s3, { ...aC(-0.15, 0.05), ...CARA.feliz, ojos: { abiertos: 0.95, feliz: 0.3 } }, 0.2]]);
    p.t = t; bocaVoz(p, t, T.s3, ENV.s3, 0.65); return p;
  }
  // Q4: se baja del lado del conductor y camina hasta Óscar; Q4b: con la llave del llavero verde: "Lo pensé." y se la da
  const u = sg(t, T.baja[0], T.baja[1]);
  const p = poseEn(t, [
    [0, { x: SERQ4.x, z: SERQ4.z, giro: -1.45, ...aC(-0.1, 0.05), ...BUENA, ...BRAZOS.costado, manoI: [0.2, 0.18, 0.3], codoI: [0.8, -0.6, -0.2] }],
    [T.llave + 0.05, { manoI: [0.12, 0.25, 0.45] }, 0.25],
    [T.llave + 0.5, { manoI: [0.29, -0.06, 0.06] }, 0.3],
    [T.q4c + 0.3, { ...aC(0.6, -0.2) }, 0.3],
  ]);
  if (t < T.baja[1]) { Object.assign(p, { x: lerp(LX + 1.0, SERQ4.x, eio(u)), z: lerp(LZ + 0.3, SERQ4.z, eio(u)), giro: lerp(0.2, -1.45, sg(t, T.baja[1] - 0.2, T.baja[1])), paso: u < 1 ? 1 : 0 }); }
  p.t = t; bocaVoz(p, t, T.s4, ENV.s4, 0.65); return p;
}
function poseSofi(t) {
  const p = poseEn(t, [[0, { x: 0, z: 0, giro: 0, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.f1 + 1.2, { ...aC(0.08, 0.02), manoD: [-0.2, 0.4, 0.32], codoD: [-0.8, -0.6, 0] }, 0.4], [T.f1 + LEN.f1 - 0.3, { ...BRAZOS.costado }, 0.4]]);
  const habla = sg(t, T.f1 - 0.15, T.f1) * (1 - sg(t, T.f1 + LEN.f1, T.f1 + LEN.f1 + 0.2));
  p.boca.sonrisa = lerp(p.boca.sonrisa, 0.15, habla);
  p.t = t; bocaVoz(p, t, T.f1, ENV.f1, 0.6); return p;
}

// =====================================================================================================
// ESTADOS DE LOS OBJETOS
// =====================================================================================================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
// el auto: en el elevador levantado (P1, Q1), cruzando la calle (P4), entrando y subiendo (Q4)
function ponerAuto(t) {
  auto.visible = true; auto.rotation.set(0, 0, 0);
  const rueda = auto.userData.rueda(1, 1); rueda.visible = true; RUEDA_SUELTA.visible = false;
  for (const s of [-1, 1]) auto.userData.vent[s].visible = true;
  let gira = 0;
  if (t < T.p3) { ponerElevador(ALTO_EL, 0); auto.position.set(LX, ALTO_EL - 0.28, LZ); rueda.visible = false; RUEDA_SUELTA.visible = true; return; }
  if (t < P2) {
    ponerElevador(0.32, 1);
    if (t >= T.auto[0] - 0.05 && t < T.auto[1] + 0.05) {
      // la calle, de izquierda a derecha, frena un poco frente al portón mientras Sergio grita
      const K = [[T.auto[0], -7.5], [T.s2 + 0.25, -1.6], [T.s2 + LEN.s2 - 0.3, 0.7], [T.auto[1], 7.5]];
      const x = claves(t, K, (u) => u);
      auto.position.set(x, 0, ZF - 3.2); auto.rotation.y = Math.PI / 2; auto.userData.vent[-1].visible = false; gira = x;
    } else auto.visible = false;
  } else if (t < T.q4) { ponerElevador(ALTO_EL, 0); auto.position.set(LX, ALTO_EL - 0.28, LZ); rueda.visible = false; RUEDA_SUELTA.visible = true; }
  else {
    // entra por el portón y se acomoda entre las columnas; después sube
    const u = eo(sg(t, T.entra[0], T.entra[1])), h = lerp(0.28, ALTO_EL, eio(sg(t, T.sube[0], T.sube[1])));
    ponerElevador(h, 1 - sg(t, T.entra[1] + 0.05, T.entra[1] + 0.45));
    const z = lerp(ZF - 4.0, LZ, u);
    auto.position.set(LX, h - 0.28, z); gira = z;
  }
  for (const r of auto.userData.ruedas) r.rotation.x = gira / 0.3;
}
function claves(t, K, f = eio) {
  if (t <= K[0][0]) return K[0][1];
  for (let i = 1; i < K.length; i++) if (t < K[i][0]) return lerp(K[i - 1][1], K[i][1], f(sg(t, K[i - 1][0], K[i][0])));
  return K[K.length - 1][1];
}
// Sergio dentro del auto (P4): sentado del lado de la vereda, asomado por la ventanilla baja, saludando
function sergioEnAuto(t) {
  auto.updateMatrixWorld(true);
  const p = poseEn(t, [[0, { sentado: 1, inclina: 0.5, ladea: 0.0, ...aC(0, -0.2), ...BUENA, cejas: { alto: 0.6, ang: 0.3 }, ...BRAZOS.costado }]]);
  Object.assign(p, saludo(t, "D", 1));
  const w = auto.localToWorld(V3(-0.42, 0.02, 0.2));
  Object.assign(p, { x: w.x, y: w.y, z: w.z, giro: auto.rotation.y - Math.PI / 2, t });
  bocaVoz(p, t, T.s2, ENV.s2, 0.7);
  return p;
}
// los papeles del pincho: la copia de Sergio (P1) y los cuatro de la semana (P2), cada uno con su chac; el rebote
function ponerPinchos(t) {
  const p2 = t >= P2;
  PINCHO1.visible = true; PINCHO1.position.set(PINCHO.x, BANCO.alto, PINCHO.z); PINCHO1.rotation.set(0, 0, 0);
  PINCHO2.visible = !p2 && t >= T.pincho2[0] - 0.35;
  for (const p of PAPELES) p.visible = false;
  // el rebote: cada chac sacude el pincho un instante
  const chacs = [T.chac0, ...T.chacs];
  for (const c of chacs) { const u = (t - c) / 0.3; if (u >= 0 && u < 1 && !p2) PINCHO1.rotation.z += Math.sin(u * Math.PI * 3) * 0.05 * (1 - u); }
  if (p2) {
    // parte 2: el pincho vacío en el banco (Q1-Q4b) y colgado en el panel (desde Q4c)
    if (t >= T.q4c) {
      if (t < T.cuelga[1]) { const m = manoMundo(maxi, "D", _a); PINCHO1.position.set(m.x, m.y - 0.24, m.z + 0.02); }
      else PINCHO1.position.set(SILUETA.x, SILUETA.y - 0.155, ZF + 0.22);
    } else if (t >= T.q4b) PINCHO1.visible = false;
    return;
  }
  // el segundo pincho: en la mano de Maxi, después en el banco
  if (PINCHO2.visible) { const L = pincho2Lugar(); if (t < T.pincho2[1]) { const m = manoMundo(maxi, "D", _a); PINCHO2.position.set(m.x, Math.max(L.y, m.y - 0.12), m.z); } else PINCHO2.position.copy(L); }
  // la copia (papel 0): en la mano de Óscar hasta que la clava
  if (t < T.chac0) {
    const m = manoMundo(oscar, "D", _a);
    const pap = PAPELES[0]; pap.visible = true;
    if (t < T.chac0 - 0.1) { oscar.cuerpo.getWorldQuaternion(_q); pap.position.copy(m).add(V3(0, -0.02, 0)); pap.quaternion.copy(_q); pap.rotateX(-1.1); pap.rotateZ(0.2); }
    else papelEnPincho(pap, PINCHO1, 0, 0, sg(t, T.chac0 - 0.1, T.chac0));
  } else papelEnPincho(PAPELES[0], PINCHO1, 0, 0, 1);
  // los de la semana: vuelan desde abajo del celular hasta el tope del clavo y bajan (chac)
  for (let i = 0; i < 4; i++) {
    const c = T.chacs[i], pap = PAPELES[i + 1];
    if (t < c - 0.34) continue;
    if (t >= c) { papelEnPincho(pap, PINCHO1, i + 1, i + 1, 1); continue; }
    if (t >= c - 0.08) { papelEnPincho(pap, PINCHO1, i + 1, i + 1, sg(t, c - 0.08, c)); continue; }
    // el vuelo: del borde de abajo del celular (en la pantalla) al tope del clavo, girando
    const u = eio(sg(t, c - 0.34, c - 0.08));
    const ini = new THREE.Vector3(0.05, -0.3, 0.5).unproject(camera).sub(camera.position).normalize().multiplyScalar(0.9).add(camera.position);
    papelEnPincho(pap, PINCHO1, i + 1, i + 1, 0);
    const fin = pap.position.clone(), qf = pap.quaternion.clone();
    pap.position.lerpVectors(ini, fin, u).add(V3(0, Math.sin(u * Math.PI) * 0.08, 0));
    const q0 = camera.quaternion.clone().multiply(new THREE.Quaternion().setFromAxisAngle(V3(1, 0, 0), -0.3)); pap.quaternion.slerpQuaternions(q0, qf, u);
    pap.scale.setScalar(lerp(0.4, 1, u));
  }
}
// el presupuesto de papel en la mano de Sergio (P1), el celular de Óscar (P7), el de Sergio (Q1 y Q2b), la llave
function ponerManos(t) {
  const p2 = t >= P2;
  PRESU_MANO.visible = !p2 && t < T.p2;
  if (PRESU_MANO.visible) { const m = manoMundo(sergio, "I", _a); sergio.cuerpo.getWorldQuaternion(_q); PRESU_MANO.position.copy(m).add(V3(0, 0.1, 0)); PRESU_MANO.quaternion.copy(_q); PRESU_MANO.rotateX(-0.5); PRESU_MANO.rotateZ(-0.15); PRESU_MANO.translateZ(0.06); }
  celuO.visible = !p2 && t >= T.p7;
  if (celuO.visible) { const a = manoMundo(oscar, "I", _a), b = manoMundo(oscar, "D", _b); oscar.cuerpo.getWorldQuaternion(_q); celuO.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0)); celuO.quaternion.copy(_q); celuO.rotateX(-0.6); }
  celuSe.visible = p2 && ((t >= T.enviar + 0.1 && t < T.q2b + 10 && t < T.q3) || false);
  if (celuSe.visible) { const a = manoMundo(sergio, "I", _a), b = manoMundo(sergio, "D", _b); sergio.cuerpo.getWorldQuaternion(_q); celuSe.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0)); celuSe.quaternion.copy(_q); celuSe.rotateX(-0.6); }
  TRAPO_BOLSILLO.visible = !(t >= T.p3 && t < T.trapo + 0.25 && !p2);
  TRAPO_MANO.visible = !TRAPO_BOLSILLO.visible;
  if (TRAPO_MANO.visible) { const a = manoMundo(oscar, "I", _a), b = manoMundo(oscar, "D", _b); oscar.cuerpo.getWorldQuaternion(_q); TRAPO_MANO.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, -0.02, 0)); TRAPO_MANO.quaternion.copy(_q); TRAPO_MANO.rotateX(-0.2); }
  // la llave: Sergio (Q4b) hasta que se la da a Óscar
  LLAVE.visible = p2 && t >= T.baja[0];
  if (LLAVE.visible) { const quien = t < T.llave + 0.15 ? [sergio, "I"] : [oscar, "D"]; const m = manoMundo(quien[0], quien[1], _a); LLAVE.position.copy(m).add(V3(0, -0.05, 0.02)); LLAVE.rotation.set(0.3, 0, 0.2); }
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  ponerSol(0, -1.5);
  dibujarTablet(t); dibujarCeluOscar(t); dibujarCeluO3(t); dibujarCeluSergio(t); dibujarTabInserto(t);
  // ---- cámara primero (el vuelo de los papeles usa la cámara) ----
  if (pl[2] && pl[2] !== "sergio") ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  // ---- personajes ----
  oscar.raiz.visible = true; oscar.poner(poseOscar(t));
  maxi.raiz.visible = !(planoActual === "Q4" || planoActual === "Q4b" || (!p2 && t < T.p3) || planoActual === "P6"); maxi.poner(poseMaxi(t));
  ponerAuto(t);
  const enAuto = !p2 && t >= T.auto[0] - 0.05 && t < T.auto[1] + 0.05;
  sergio.raiz.visible = (!p2 && (t < T.p3 || enAuto)) || (p2 && (t < T.q3 || t >= T.baja[0]));
  for (const k of [0, 1]) sergio.raiz.children[0].children[k].visible = !enAuto;   // (r1) en el auto, sin piernas (atravesaban el piso)
  if (sergio.raiz.visible) sergio.poner(enAuto ? sergioEnAuto(t) : poseSergio(t));
  if (pl[2] === "sergio") {
    // P4b: desde la vereda del taller, acompaña la cabeza de Sergio en la ventanilla
    sergio.raiz.updateMatrixWorld(true); const h = sergio.cabeza.localToWorld(V3(0, 0.25, 0));
    ponerCam([h.x + 0.3, 1.4, ZF - 0.55, h.x + 0.1, h.y - 0.35, h.z, 58], t);
    if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
    if (window.__cam) ponerCam(window.__cam, t);
    camera.updateMatrixWorld(true);
  }
  ponerPinchos(t); ponerManos(t);
  tablet.visible = p2; celuS.visible = p2 && t >= T.q5 - 0.1;
  PILA.visible = !p2 && t >= T.p3;
  // ---- Sofi: su escena a la textura del celular parado ----
  if (planoActual === "Q5") {
    sofi.poner(poseSofi(t)); sofi.raiz.updateMatrixWorld(true);
    const c = sofi.cabeza.localToWorld(V3(0, 0.2, 0));
    SOFI.cam.position.set(c.x + 0.05, c.y + 0.0, c.z + 2.1); SOFI.cam.lookAt(c.x, c.y - 0.2, c.z);
    renderer.setRenderTarget(SOFI.rt); renderer.render(SOFI.esc, SOFI.cam); renderer.setRenderTarget(null);
  }
  // ---- insertos ----
  const INS = { Q1b: INS1, Q2: INS1, Q2c: INS1, Q3: INS3 }[planoActual];
  for (const I of [INS1, INS3]) I.g.visible = I === INS;
  INSO.g.visible = planoActual === "P2";
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.035, eo(k)));
  }
  if (INSO.g.visible) { const kk = halfK(); INSO.g.position.set(0, 0, -1); INSO.g.scale.setScalar(kk * PXK * lerp(1.0, 1.02, eo(sg(t, T.p2, T.p3)))); }
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- portada (VER=portada): Óscar y Maxi detrás del banco, de frente, con el pincho lleno adelante ----
  if (VER === "portada") {
    sergio.raiz.visible = false; PINCHO2.visible = false; celuO.visible = false; TRAPO_MANO.visible = false; TRAPO_BOLSILLO.visible = true;
    oscar.poner({ ...poseEn(t, [[0, { x: BANCO.x - 0.62, z: 1.42, giro: Math.PI / 2 + 0.25, ...aC(-0.05, 0.12), ...SECO, cejas: { alto: 0.1, ang: 0.25 }, ...BRAZOS.costado, manoI: [0.22, 0.32, 0.3], manoD: [-0.22, 0.32, 0.3] }]]), t });
    maxi.raiz.visible = true; maxi.poner({ ...poseEn(t, [[0, { x: BANCO.x - 0.6, z: 0.62, giro: Math.PI / 2 + 0.45, ...aC(-0.25, 0.08), ...CARA.incredula, ojos: { abiertos: 0.95 }, ...BRAZOS.costado }]]), t });
    ponerCam([-0.5, 1.42, 1.32, -2.2, 1.42, 1.0, 46], t); camera.updateMatrixWorld(true);
    for (const p of TODOS) if (p.raiz.visible) p.ojoLejano(camera.position);
  }
  // ---- tarjetas ----
  for (const k in GL) GL[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const sale = (tf) => 1 - eio(sg(t, tf - 0.12, tf));
    const pa = planoActual;
    const boca = (per) => bocaPx(per);
    if (pa === "P1") {
      const [px, py] = objPx(PRESU_MANO);
      ponerGlobo(GL.lunes, 170, 535, 1, null);
      ponerGlobo(GL.presu, 320, 1770, 1 * sale(T.vaSe[0] + 0.3), null, 1); ponerGuia(GUIAS[0], 470, 1660, px, py, 1 * sale(T.vaSe[0] + 0.3) > 0.5 ? 1 : 0);
      if (t >= T.s1) { const [bx, by] = boca(sergio); ponerGlobo(GL.s1, 640, 640, ent(T.s1), [bx, by - 30], 2); }
    }
    if (pa === "P3") {
      ponerGlobo(GL.sabado, 540, 150, 1, null);
      if (t >= T.m1) { const [bx, by] = boca(maxi); ponerGlobo(GL.m1, 720, 420, ent(T.m1) * sale(T.o1), [bx, by - 30], 1); }
      if (t >= T.o1) { const [bx, by] = boca(oscar); ponerGlobo(GL.o1, 330, 480, ent(T.o1), [bx, by - 30], 2); }
    }
    if (pa === "P4" && t >= T.s2) { const [bx, by] = boca(sergio); ponerGlobo(GL.s2, 540, 330, ent(T.s2), bx > -50 && bx < 1130 ? [bx, by - 30] : null); }
    if (pa === "P5") {
      const [ax, ay] = objPx(PINCHO1, V3(0, 0.12, 0)), [ex, ey] = enPantalla(V3(LX + 0.4, 0.4, LZ + 1.0));
      const u0 = ent(T.rot[0]), u1 = ent(T.rot[1]), u2 = ent(T.rot[2]);
      ponerGlobo(GL.r1, 330, 1180, u0, null, 1); if (u0 > 0) ponerGuia(GUIAS[0], 330, 1250, ax, ay, eo(sg(t, T.rot[0], T.rot[0] + 0.25)));
      ponerGlobo(GL.r2, 330, 1360, u1, null, 1);
      ponerGlobo(GL.r3, 330, 600, u2, null, 1); if (u2 > 0) ponerGuia(GUIAS[1], 330, 670, ex, ey, eo(sg(t, T.rot[2], T.rot[2] + 0.25)));
    }
    if (pa === "P6" && t >= T.o2) { const [bx, by] = boca(oscar); verGlobo(GL.o2, t >= T.o2b ? 6 : 2); ponerGlobo(GL.o2, 540, 330, ent(T.o2), [bx, by - 40]); }
    if (pa === "P7" && t >= T.vibra) ponerGlobo(GL.nuevo, 540, 300, ent(T.vibra), null);
    if (pa === "Q1") {
      if (t >= T.s1b) { const [bx, by] = boca(sergio); if (t < T.o3) ponerGlobo(GL.s1, 640, 640, ent(T.s1b), [bx, by - 30], 1); }
      if (t >= T.o3) { const [bx, by] = boca(oscar); ponerGlobo(GL.o3, 400, 520, ent(T.o3), [bx, by - 30], 2); }
    }
    if (pa === "Q1b") {
      ponerGlobo(GL.rBoton, 540, 190, ent(T.q1b + 0.12), null);
      const e = t >= T.visto ? 1 : 0; if (GL.estado.userData.e !== e) { GL.estado.userData.e = e; redibujar(GL.estado, (x, W, H) => dibujarEstado(x, W, H, e)); }
      ponerGlobo(GL.estado, 700, 1800, ent(T.q1b + 0.3), null, 1);
    }
    if (pa === "Q2" || pa === "Q2c") { ponerGlobo(GL.miercoles, 540, 140, ent(T.q2), null); ponerGlobo(GL.rSeg, 540, 262, ent(T.seg + 0.25), null, 1); }
    if (pa === "Q2b") { const [bx, by] = boca(sergio); if (t >= T.s3) ponerGlobo(GL.s3, 540, 360, ent(T.s3), [bx, by - 40]); }
    if (pa === "Q3") ponerGlobo(GL.viernes, 540, 1815, ent(T.q3 + 0.05), null);
    if (pa === "Q3" && t >= T.m1b) ponerGlobo(GL.m1b, 540, 230, ent(T.m1b), null);
    if (pa === "Q3b") {
      if (t < T.o4) { const [bx, by] = boca(maxi); ponerGlobo(GL.m1, 700, 400, 1, [bx, by - 30], 1); }
      if (t >= T.o4) { const [bx, by] = boca(oscar); ponerGlobo(GL.o4, 400, 420, ent(T.o4), [bx, by - 30], 2); }
    }
    if (pa === "Q4") ponerGlobo(GL.jueves, 540, 150, ent(T.q4), null);
    if (pa === "Q4b") {
      if (t >= T.s4) { const [bx, by] = boca(sergio); ponerGlobo(GL.s4, 760, 360, ent(T.s4), [bx, by - 30], 1); }
      if (t >= T.o5) { const [bx, by] = boca(oscar); ponerGlobo(GL.o5, 360, 560, ent(T.o5), [bx, by - 30], 2); }
    }
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, oscar: bocaPx(oscar), sergio: bocaPx(sergio), maxi: bocaPx(maxi) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
