// Capa 3D de dist-comisiones (Three.js r170 local). Base técnica: reels/dist-cartera (utilidades, `fusionar`, tarjetas
// pegadas a la cámara, globos con la cola a la boca, rótulos con guía, catmull() quieto después de la última clave,
// avatares por render target, la herradura de pelo de Rubén y el bigote que se esconde de nuca, pallets y racks) y
// reels/dist-cliente-grande (la oficina vidriada de Rubén con la puerta). renderAt(t) es una función pura del tiempo del
// timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// EL MUNDO: LA OFICINA VIDRIADA DE RUBÉN arriba del depósito (piso y = 0), vista desde adentro. La pared del fondo (z =
//   PARED) es crema a la izquierda (el calendario de hojas grandes y el reloj) y vidrio a la derecha, con la puerta abierta
//   (Nico asoma). Del otro lado del vidrio, el descanso de la escalera metálica que baja al depósito (y = -3,2: racks,
//   pallets). Rubén sentado detrás del escritorio crema (el monitor grande a su derecha, la calculadora con rollo, los
//   talonarios de remitos, el mate y el termo, su celular). Las dos pilas de cajas (P6 / Q3b) se arman en el piso de la
//   oficina, a la izquierda del escritorio.
//   PARTE 1: día 1, 8:00 · "¿cuánto me toca?" · la planilla a mano hasta el día 2, 19:00 · 42.000 · "Súper Héctor es mío" ·
//            las pilas pasan de largo · la devolución de Graciela recalcula todo · el calendario cae a 3
//   PARTE 2: el mismo día 1, 8:00 · "Mirá el celular." · Tu comisión $ 42.000 ✓ · el pedido 0388 "Cargó: Javi" · las pilas
//            dan justo · la devolución se descuenta sola · "Ya sé. Me llegó." · Rubén a cámara
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, MARCA, CARA, BRAZOS, pegarACamara, crearMate, crearTermo } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, CORTE, LIMPIO, VER as VERM } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"')]);

// ---------- utilidades ----------
// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const en = (t, a, b) => t >= a && t < b;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (n) => Math.round(n * 100) / 100;

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x16243d);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 160);
camera.layers.enable(1);
scene.add(camera);
scene.environment = null;

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, kraft: 0xc9a46b, madera: 0xd7b98a, gris: 0xc9ccd2, celeste: 0xb9cde0, toldo: 0x365f28, hoja: 0x4f7a3a };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.85), madera: mat(C.madera, 0.75), gris: mat(C.gris, 0.35, { metalness: 0.3 }), goma: mat(0x23262c, 0.8),
  vidrio: new THREE.MeshBasicMaterial({ color: 0xcfe2f2, transparent: true, opacity: 0.1, depthWrite: false }),
  vidrioAuto: new THREE.MeshPhysicalMaterial({ color: 0x8fb4d6, roughness: 0.08, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide }),
  toldo: mat(C.toldo, 0.8), hoja: mat(C.hoja, 0.8), asfalto: mat(0x60646c, 0.95),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const caja = (w, h, d, m, x, y, z, r = 0.02) => mesh(rbox(w, h, d, r, 2), m, x, y, z);
const cajaS = (w, h, d, m, x, y, z) => mesh(new THREE.BoxGeometry(w, h, d), m, x, y, z);
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const CAV = (s, w = 700) => `${w} ${s}px "Caveat", cursive`;
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
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
function crearPallet() {
  const g = new THREE.Group(), m = M.madera, mo = mat(0xb89a6c, 0.8);
  for (let i = 0; i < 5; i++) g.add(cajaS(1.2, 0.025, 0.14, m, 0, 0.135, -0.43 + i * 0.215));
  for (const z of [-0.43, 0, 0.43]) g.add(cajaS(1.2, 0.025, 0.14, mo, 0, 0.0125, z));
  for (const x of [-0.52, 0, 0.52]) for (const z of [-0.43, 0, 0.43]) g.add(cajaS(0.14, 0.1, 0.14, mo, x, 0.075, z));
  return g;
}
const bolsaT = lienzo(256, 320, (x, w, h) => { x.fillStyle = "#dcd9c8"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; x.fillRect(0, h * 0.34, w, h * 0.3); x.fillStyle = "#efeee5"; x.font = F(900, 56); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("000", w / 2, h * 0.49); x.fillStyle = "#5ce611"; x.fillRect(0, h * 0.86, w, h * 0.05); });
// la caja de aceite (kraft con la botella dibujada) y el pack de agua crema liso
const botella = (x, cx, top, alto, ancho) => {
  x.fillStyle = "#efeee5"; x.strokeStyle = "#1f3254"; x.lineWidth = Math.max(6, ancho * 0.08);
  x.beginPath(); x.moveTo(cx - ancho * 0.16, top); x.lineTo(cx + ancho * 0.16, top); x.lineTo(cx + ancho * 0.16, top + alto * 0.18);
  x.quadraticCurveTo(cx + ancho * 0.5, top + alto * 0.26, cx + ancho * 0.5, top + alto * 0.4); x.lineTo(cx + ancho * 0.5, top + alto); x.lineTo(cx - ancho * 0.5, top + alto); x.lineTo(cx - ancho * 0.5, top + alto * 0.4);
  x.quadraticCurveTo(cx - ancho * 0.5, top + alto * 0.26, cx - ancho * 0.16, top + alto * 0.18); x.closePath(); x.fill(); x.stroke();
  x.fillStyle = "#5ce611"; x.fillRect(cx - ancho * 0.5 + x.lineWidth / 2, top + alto * 0.55, ancho - x.lineWidth, alto * 0.22);
  x.fillStyle = "#1f3254"; x.fillRect(cx - ancho * 0.2, top - alto * 0.07, ancho * 0.4, alto * 0.08);
};
const kraftCara = (x, w, h) => { x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.fillStyle = "#b8935a"; x.fillRect(0, 0, w, h * 0.06); x.fillRect(0, h * 0.94, w, h * 0.06); };
const cajaGrandeT = lienzo(512, 320, (x, w, h) => { kraftCara(x, w, h); for (const cx of [70, 150]) botella(x, cx, 70, 200, 66); x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "ACEITE", 900, 86, 280); x.fillText("ACEITE", 210, 130); x.font = F(800, 50); x.fillText("1,5 L x 12", 212, 215); });
const cajaChicaT = lienzo(256, 320, (x, w, h) => { kraftCara(x, w, h); botella(x, w / 2, 50, 190, 92); });
const CAJA_A = { x: 0.48, y: 0.3, z: 0.24 };
const CAJA_MAT = (() => { const k = mat(C.kraft, 0.85); const ch = new THREE.MeshStandardMaterial({ map: cajaChicaT, roughness: 0.85 }), gr = new THREE.MeshStandardMaterial({ map: cajaGrandeT, roughness: 0.85 }); return [ch, ch, k, k, gr, gr]; })();
const CAJA_GEO = rbox(CAJA_A.x, CAJA_A.y, CAJA_A.z, 0.015, 2);
function crearCajaAceite() { const m = new THREE.Mesh(CAJA_GEO, CAJA_MAT); m.castShadow = true; m.receiveShadow = true; return m; }
const HARINA_MAT = (() => { const hm = new THREE.MeshStandardMaterial({ map: bolsaT, roughness: 0.9 }), pm = mat(0xdcd9c8, 0.9); return [pm, pm, hm, pm, hm, pm]; })();
function crearBolsaHarina() { const m = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.36), HARINA_MAT); m.castShadow = true; m.receiveShadow = true; return m; }
const AGUA_M = mat(0xe6e3d4, 0.35);
function crearPackAgua() { const g = new THREE.Group(); g.add(caja(0.36, 0.3, 0.26, AGUA_M, 0, 0.15, 0, 0.03)); for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) g.add(mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.04, 10), M.navy3, -0.12 + i * 0.12, 0.32, -0.065 + j * 0.13)); return sombras(g); }
// las tres capas de un pallet de cliente: aceite, harina, agua (orden de llenado de la parte 2)
function cargarCapas(g, capas = 3) {
  const out = [[], [], []];
  for (let i = 0; i < 2; i++) for (let j = 0; j < 4; j++) { const c = crearCajaAceite(); c.position.set((i - 0.5) * 0.49, 0.15 + CAJA_A.y / 2, (j - 1.5) * 0.25); g.add(c); out[0].push(c); }
  if (capas > 1) for (let k = 0; k < 2; k++) for (let i = 0; i < 2; i++) { const b = crearBolsaHarina(); b.position.set(-0.26 + i * 0.52, 0.15 + CAJA_A.y + 0.08 + k * 0.16, (k ? -0.19 : 0.19)); g.add(b); out[1].push(b); }
  if (capas > 2) for (let i = 0; i < 3; i++) { const a = crearPackAgua(); a.position.set(-0.38 + i * 0.38, 0.15 + CAJA_A.y + 0.32, 0.0); g.add(a); out[2].push(a); }
  return out;
}
function cargaPallet(g, tipo) {
  const p = crearPallet(); g.add(p);
  if (tipo === 0) for (let i = 0; i < 4; i++) for (let k = 0; k < 2; k++) g.add(cajaS(0.55, 0.42, 0.42, mat(k % 2 ? C.kraft : 0xbf9a62, 0.85), -0.29 + (i % 2) * 0.58, 0.36 + k * 0.43, -0.22 + Math.floor(i / 2) * 0.44));
  else if (tipo === 1) { for (let k = 0; k < 4; k++) for (let i = 0; i < 2; i++) g.add(mesh(new THREE.BoxGeometry(0.5, 0.16, 0.36), HARINA_MAT, -0.27 + i * 0.54, 0.23 + k * 0.16, 0)); }
  else if (tipo === 2) { const fm = mat(0x7fc46a, 0.25); for (let k = 0; k < 2; k++) g.add(cajaS(1.1, 0.42, 0.85, fm, 0, 0.36 + k * 0.43, 0)); }
  else { for (let i = 0; i < 6; i++) g.add(cajaS(0.36, 0.34, 0.4, mat(C.kraft, 0.85), -0.38 + (i % 3) * 0.38, 0.32, -0.2 + Math.floor(i / 3) * 0.42)); g.add(cajaS(1.1, 0.02, 0.8, mat(C.cr, 0.8), 0, 0.5, 0)); }
  return g;
}
function crearRack(largo, bahias) {
  const g = new THREE.Group();
  const bw = largo / bahias, niveles = [0.0, 1.55, 3.1, 4.65];
  const par = mat(C.navy3, 0.55);
  for (let i = 0; i <= bahias; i++) for (const z of [-0.5, 0.5]) g.add(cajaS(0.1, 6.2, 0.1, par, -largo / 2 + i * bw, 3.1, z));
  for (const y of niveles.slice(1)) for (const z of [-0.52, 0.52]) g.add(cajaS(largo, 0.14, 0.07, M.g, 0, y, z));
  for (let i = 0; i < bahias; i++) for (let n = 0; n < 4; n++) {
    if (az() < 0.1) continue;
    const pg = new THREE.Group(); pg.position.set(-largo / 2 + (i + 0.5) * bw, niveles[n] + (n ? 0.07 : 0), 0); pg.rotation.y = Math.PI / 2;
    cargaPallet(pg, Math.floor(az() * 4)); g.add(pg);
  }
  return g;
}

// =====================================================================================================
// LA OFICINA VIDRIADA DE RUBÉN (piso y = 0) Y, DEL OTRO LADO DEL VIDRIO, EL DESCANSO, LA ESCALERA Y EL DEPÓSITO (y = -3,2)
// =====================================================================================================
const PARED = -2.4;                                   // la pared del fondo
const OF_X0 = -2.8, OF_X1 = 2.8, OF_Z1 = 3.6, ALTO = 2.85;
const VID0 = 0.0, PU0 = 0.78, PU1 = 1.62;             // vidrio desde VID0; la puerta entre PU0 y PU1
const DESK = { x0: -1.0, x1: 0.8, z0: -1.32, z1: -0.5, y: 0.76 };
const RUB = { x: 0.12, z: -1.72 };                    // Rubén sentado detrás del escritorio
const MON = { x: -0.58, z: -1.0, ry: 0.42, W: 0.9, H: 0.63 };
const CAL = { x: -0.62, y: 1.99, W: 0.56, H: 0.72 };
const DESC = { z1: -3.3 };                            // el descanso de la escalera (del vidrio a z1)
const ESCA = { x0: 0.5, x1: 1.9, n: 14, sube: 3.2 / 14, pisada: 0.27 };
const DEP_Y = -3.2;
const OF = new THREE.Group(); scene.add(OF);
const FUERA = new THREE.Group(); scene.add(FUERA);
const pantMon = lienzo(1280, 896, () => {});
const TUBOS = [];
let monitor, termo, mateM, celR, calc, cinta, talon, reloj, agujaH, agujaM, hojas = [], pizza, puerta;
const paredM = mat(C.cr, 0.9);
{
  // piso de madera, techo navy3, paredes crema
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#b08a5e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#977350"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(4, 4);
  const p = mesh(new THREE.PlaneGeometry(OF_X1 - OF_X0, OF_Z1 - PARED), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.7 }), 0, 0, (OF_Z1 + PARED) / 2); p.rotation.x = -Math.PI / 2; p.castShadow = false; OF.add(p);
  // (r2) techo claro con dos tubos (navy3 dejaba franjas vacías arriba de los planos)
  OF.add(cajaS(OF_X1 - OF_X0 + 0.2, 0.12, OF_Z1 - PARED, mat(0xd9d7c9, 0.9), 0, ALTO + 0.06, (OF_Z1 + PARED) / 2));
  for (const z of [-1.2, 1.0]) { const f = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.14), new THREE.MeshBasicMaterial({ color: 0xf6f3e6, toneMapped: false })); f.rotation.x = Math.PI / 2; f.position.set(0, ALTO - 0.005, z); OF.add(f); TUBOS.push(f); }   // (r2) sin la carcasa navy: se veía como una barra flotando
  OF.add(cajaS(0.12, ALTO, OF_Z1 - PARED, paredM, OF_X0, ALTO / 2, (OF_Z1 + PARED) / 2));
  OF.add(cajaS(0.12, ALTO, OF_Z1 - PARED, paredM, OF_X1, ALTO / 2, (OF_Z1 + PARED) / 2));
  // la pared del fondo: crema hasta VID0; arriba del vidrio, una franja crema; zócalo navy
  OF.add(cajaS(VID0 - OF_X0, ALTO, 0.12, paredM, (OF_X0 + VID0) / 2, ALTO / 2, PARED - 0.06));
  OF.add(cajaS(OF_X1 - VID0, ALTO - 2.25, 0.12, paredM, (VID0 + OF_X1) / 2, 2.25 + (ALTO - 2.25) / 2, PARED - 0.06));
  OF.add(caja(VID0 - OF_X0, 0.12, 0.03, M.navy3, (OF_X0 + VID0) / 2, 0.06, PARED + 0.015, 0.005));
  for (const x of [OF_X0 + 0.07, OF_X1 - 0.07]) OF.add(caja(0.03, 0.12, OF_Z1 - PARED, M.navy3, x, 0.06, (OF_Z1 + PARED) / 2, 0.005));
  // el vidrio (dos paños) y los parantes navy; la puerta abierta hacia afuera
  for (const [a, b] of [[VID0, PU0], [PU1, OF_X1]]) { const v = new THREE.Mesh(new THREE.PlaneGeometry(b - a, 2.25), M.vidrio); v.position.set((a + b) / 2, 1.125, PARED); v.renderOrder = 3; OF.add(v); }
  for (const x of [VID0 + 0.03, PU0, PU1, (PU1 + OF_X1) / 2, OF_X1 - 0.04]) OF.add(caja(0.07, 2.25, 0.1, M.navy, x, 1.125, PARED, 0.01));
  OF.add(caja(OF_X1 - VID0, 0.08, 0.12, M.navy, (VID0 + OF_X1) / 2, 2.25, PARED, 0.01));
  for (const [a, b] of [[VID0, PU0], [PU1, OF_X1]]) OF.add(caja(b - a, 0.1, 0.1, M.navy, (a + b) / 2, 0.05, PARED, 0.01));
  puerta = new THREE.Group(); puerta.position.set(PU1 - 0.04, 0, PARED - 0.05); puerta.rotation.y = -1.3; OF.add(puerta);
  { const PW = PU1 - PU0 - 0.06; puerta.add(caja(0.06, 2.15, 0.05, M.navy, -PW + 0.03, 1.075, 0, 0.01)); puerta.add(caja(0.06, 2.15, 0.05, M.navy, -0.03, 1.075, 0, 0.01)); for (const y of [0.04, 2.12]) puerta.add(caja(PW, 0.08, 0.05, M.navy, -PW / 2, y, 0, 0.01)); const v = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.1, 2.05), M.vidrio); v.position.set(-PW / 2, 1.075, 0); v.renderOrder = 3; puerta.add(v); puerta.add(caja(0.03, 0.3, 0.05, M.gris, -PW + 0.12, 1.0, 0.04, 0.01)); }
  // un estante con biblioratos en la pared izquierda y un archivador
  OF.add(caja(0.3, 0.04, 1.4, M.navy3, OF_X0 + 0.2, 1.62, -1.3, 0.01));
  for (let i = 0; i < 8; i++) OF.add(caja(0.24, 0.32, 0.1, [M.navy3, M.g, M.cr2, M.red, M.navy2][i % 5], OF_X0 + 0.2, 1.8, -1.85 + i * 0.13, 0.01));
  OF.add(caja(0.5, 1.05, 0.55, M.navy3, OF_X0 + 0.33, 0.525, -0.25, 0.02));
  for (let i = 0; i < 3; i++) OF.add(caja(0.04, 0.03, 0.18, M.cr2, OF_X0 + 0.6, 0.25 + i * 0.32, -0.25, 0.005));
  // EL ESCRITORIO: tapa crema con canto navy, frente navy3 (tapa las piernas de Rubén), patas
  const DW = DESK.x1 - DESK.x0, DD = DESK.z1 - DESK.z0, DCX = (DESK.x0 + DESK.x1) / 2, DCZ = (DESK.z0 + DESK.z1) / 2;
  OF.add(caja(DW, 0.045, DD, mat(0xe9e6dc, 0.6), DCX, DESK.y - 0.022, DCZ, 0.01));
  OF.add(caja(DW + 0.02, 0.03, DD + 0.02, M.navy, DCX, DESK.y - 0.05, DCZ, 0.006));
  OF.add(caja(DW - 0.04, 0.64, 0.04, M.navy3, DCX, 0.4, DESK.z1 - 0.03, 0.01));
  for (const x of [DESK.x0 + 0.04, DESK.x1 - 0.04]) OF.add(caja(0.05, DESK.y - 0.06, DD - 0.04, M.navy3, x, (DESK.y - 0.06) / 2, DCZ, 0.01));
  // la silla de Rubén
  const silla = new THREE.Group(); silla.position.set(RUB.x, 0, RUB.z); OF.add(silla);
  silla.add(caja(0.54, 0.08, 0.5, M.navy, 0, 0.5, 0.05, 0.03)); silla.add(caja(0.52, 0.78, 0.08, M.navy, 0, 0.98, -0.24, 0.03)); silla.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.44, 8), M.gris, 0, 0.25, 0)); silla.add(mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.03, 5), M.navy, 0, 0.04, 0));
  // EL MONITOR grande, girado hacia la cámara (y hacia Rubén)
  monitor = new THREE.Group(); monitor.position.set(MON.x, DESK.y, MON.z); monitor.rotation.y = MON.ry; OF.add(monitor);
  monitor.add(caja(0.12, 0.14, 0.1, M.navy, 0, 0.07, -0.06)); monitor.add(caja(0.38, 0.025, 0.26, M.navy, 0, 0.012, -0.04));
  monitor.add(caja(MON.W + 0.06, MON.H + 0.06, 0.05, M.navy, 0, 0.14 + MON.H / 2, 0, 0.02));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(MON.W, MON.H), new THREE.MeshBasicMaterial({ map: pantMon, toneMapped: false })); pm.position.set(0, 0.14 + MON.H / 2, 0.027); monitor.add(pm); monitor.userData.pant = pm;
  monitor.userData.centro = V3(0, 0.14 + MON.H / 2, 0.027);
  // teclado y mouse
  const tec = new THREE.Group(); tec.position.set(-0.1, DESK.y, -0.82); tec.rotation.y = 0.12; OF.add(tec);
  tec.add(caja(0.46, 0.022, 0.15, M.navy3, 0, 0.011, 0, 0.008));
  for (let i = 0; i < 3; i++) for (let k = 0; k < 11; k++) tec.add(caja(0.03, 0.01, 0.03, M.cr2, -0.19 + k * 0.038, 0.026, -0.042 + i * 0.042, 0.004));
  OF.add(caja(0.06, 0.03, 0.1, M.navy3, 0.25, DESK.y + 0.015, -0.8, 0.02));
  // LA CALCULADORA DE ESCRITORIO CON ROLLO (crema y navy, teclas grandes, el rollo de papel atrás)
  calc = new THREE.Group(); calc.position.set(0.5, DESK.y, -0.78); calc.rotation.y = -0.35; OF.add(calc);
  { const cu = caja(0.26, 0.07, 0.3, M.cr, 0, 0.035, 0, 0.02); cu.rotation.x = -0.1; calc.add(cu);
    for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) calc.add(caja(0.045, 0.02, 0.045, k === 3 ? M.g : M.navy3, -0.085 + k * 0.057, 0.075 - i * 0.004, 0.08 - i * 0.055, 0.008));
    calc.add(caja(0.2, 0.03, 0.05, M.navy, 0, 0.08, -0.08, 0.006));
    const rollo = mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.16, 18), mat(0xf7f6ee, 0.8), 0, 0.12, -0.16); rollo.rotation.z = Math.PI / 2; calc.add(rollo);
    for (const s of [-1, 1]) calc.add(caja(0.012, 0.08, 0.03, M.navy3, s * 0.09, 0.1, -0.16, 0.004)); }
  // los dos talonarios de remitos apilados (tapa navy, hojas crema con borde rosa apagado)
  talon = new THREE.Group(); talon.position.set(0.12, DESK.y, -0.64); talon.rotation.y = 0.25; OF.add(talon);
  for (let k = 0; k < 2; k++) { const g = new THREE.Group(); g.position.set(k * 0.03, k * 0.05, -k * 0.02); g.rotation.y = k * 0.18; talon.add(g); g.add(caja(0.17, 0.035, 0.23, mat(0xefeee5, 0.85), 0, 0.02, 0, 0.004)); g.add(caja(0.172, 0.006, 0.232, mat(0xd99a94, 0.8), 0, 0.006, 0, 0.002)); g.add(caja(0.175, 0.01, 0.235, M.navy, 0, 0.042, 0, 0.004)); }
  // el termo (crema y navy) y el mate
  termo = crearTermo(); termo.scale.setScalar(1.15); OF.add(termo);
  mateM = crearMate(); mateM.scale.setScalar(1.1); OF.add(mateM);
  // EL CALENDARIO DE PARED de hojas grandes (el clavo, la tapa navy "NOVIEMBRE", las hojas con el número)
  const cal = new THREE.Group(); cal.position.set(CAL.x, CAL.y, PARED + 0.01); OF.add(cal);
  cal.add(caja(CAL.W + 0.04, CAL.H + 0.04, 0.02, M.navy, 0, 0, 0.0, 0.01));
  const cabT = lienzo(620, 170, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "NOVIEMBRE", 900, 96, w - 60); x.fillText("NOVIEMBRE", w / 2, h / 2 + 4); });
  cal.add(plano(CAL.W, CAL.H * 0.22, cabT, 0, CAL.H * 0.39, 0.016, true));
  const hojaT = (n, rojo) => lienzo(620, 620, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, 14); x.fillStyle = rojo ? "#c7655b" : "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 470); x.fillText(String(n), w / 2, h / 2 + 30); });
  for (const [n, rojo, dz] of [[3, true, 0.012], [2, false, 0.016], [1, false, 0.02]]) { const hg = new THREE.Group(); hg.position.set(0, CAL.H * 0.28, dz); cal.add(hg); const pl = plano(CAL.W - 0.02, CAL.H * 0.76, hojaT(n, rojo), 0, -CAL.H * 0.38, 0, false); pl.material.side = THREE.DoubleSide; hg.add(pl); hg.userData.n = n; hojas.push(hg); }
  cal.add(mesh(new THREE.SphereGeometry(0.014, 8, 6), M.gris, 0, CAL.H / 2 + 0.03, 0.02));
  // EL RELOJ de pared navy
  reloj = new THREE.Group(); reloj.position.set(-1.5, 2.2, PARED + 0.02); OF.add(reloj);
  reloj.add(mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.04, 32), M.navy, 0, 0, 0).rotateX(Math.PI / 2));
  const esfera = new THREE.Mesh(new THREE.CircleGeometry(0.16, 32), mat(C.cr, 0.7)); esfera.position.z = 0.021; reloj.add(esfera);
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; reloj.add(caja(0.014, i % 3 ? 0.025 : 0.04, 0.004, M.navy, Math.sin(a) * 0.135, Math.cos(a) * 0.135, 0.024, 0.002).rotateZ(-a)); }
  agujaH = new THREE.Group(); agujaH.position.z = 0.028; reloj.add(agujaH); agujaH.add(caja(0.022, 0.09, 0.006, M.navy, 0, 0.04, 0, 0.003));
  agujaM = new THREE.Group(); agujaM.position.z = 0.032; reloj.add(agujaM); agujaM.add(caja(0.014, 0.13, 0.006, M.navy3, 0, 0.06, 0, 0.003));
  // una planta en el rincón
  const mac = mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.32, 14), M.navy3, OF_X1 - 0.35, 0.16, -1.9); OF.add(mac);
  for (let i = 0; i < 9; i++) { const a = i * 0.7; const h = mesh(new THREE.SphereGeometry(1, 8, 6), M.hoja, OF_X1 - 0.35 + Math.cos(a) * 0.1, 0.45 + (i % 4) * 0.1, -1.9 + Math.sin(a) * 0.1); h.scale.set(0.13, 0.05, 0.07); h.rotation.set(0.3, a, 0.5); OF.add(h); }
}
// LA CINTA DE LA CALCULADORA: una tira de papel que sale del rollo, cruza el escritorio, cae por el frente y se amontona en
// el piso (largo según el tiempo); números impresos en gris
const CINTA_PTS = (() => {
  calc.updateMatrixWorld(true);
  const o = calc.localToWorld(V3(0, 0.13, -0.2));
  const pts = [o, calc.localToWorld(V3(0, 0.16, -0.05)), calc.localToWorld(V3(0, 0.095, 0.12)), V3(0.42, DESK.y + 0.012, -0.6), V3(0.4, DESK.y + 0.01, DESK.z1 + 0.035), V3(0.39, DESK.y - 0.06, DESK.z1 + 0.06), V3(0.38, 0.4, DESK.z1 + 0.07), V3(0.36, 0.06, DESK.z1 + 0.09), V3(0.34, 0.006, DESK.z1 + 0.25), V3(0.3, 0.006, DESK.z1 + 0.5), V3(0.12, 0.006, DESK.z1 + 0.62), V3(-0.02, 0.006, DESK.z1 + 0.5)];
  return pts;
})();
const cintaCurva = new THREE.CatmullRomCurve3(CINTA_PTS, false, "catmullrom", 0.3);
const CINTA_N = 160, CINTA_L = cintaCurva.getLength();
{
  const pos = [], uv = [], idx = [];
  const fr = cintaCurva.computeFrenetFrames(CINTA_N, false);
  for (let i = 0; i <= CINTA_N; i++) {
    const u = i / CINTA_N, p = cintaCurva.getPointAt(u), tg = cintaCurva.getTangentAt(u);
    let lado = V3(0, 1, 0).cross(tg).normalize(); if (lado.lengthSq() < 0.1) lado = V3(1, 0, 0); else if (lado.x < 0) lado.negate();
    for (const s of [-1, 1]) { const q = p.clone().addScaledVector(lado, s * 0.028); pos.push(q.x, q.y, q.z); uv.push(s < 0 ? 0 : 1, u * CINTA_L * 6); }
    if (i < CINTA_N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
  const tx = lienzo(64, 256, (x, w, h) => { x.fillStyle = "#f7f6ee"; x.fillRect(0, 0, w, h); x.fillStyle = "#9a9a92"; for (let i = 0; i < 8; i++) x.fillRect(14 + (i % 3) * 6, 14 + i * 31, 26 - (i % 2) * 8, 8); });
  tx.wrapT = THREE.RepeatWrapping;
  cinta = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: tx, roughness: 0.85, side: THREE.DoubleSide })); cinta.castShadow = true; cinta.receiveShadow = true; OF.add(cinta);
}
function ponerCinta(k) { cinta.geometry.setDrawRange(0, Math.max(6, Math.round(CINTA_N * cl(k)) * 6)); }

// EL CELULAR DE RUBÉN, acostado en el escritorio (pantalla para arriba)
function crearCel(tex, funda, W = 0.085, H = 0.172) {
  const g = new THREE.Group();
  g.add(caja(W + 0.008, H + 0.008, 0.014, mat(funda, 0.5), 0, 0, 0, 0.012));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); p.position.z = 0.0075; g.add(p);
  g.userData = { W, H };
  return sombras(g);
}
const pantR = lienzo(600, 1215, () => {}), pantN = lienzo(600, 1215, () => {}), pantJ = lienzo(600, 1215, () => {});
celR = crearCel(pantR, C.navy3); celR.scale.setScalar(1.25); OF.add(celR);
const CELR0 = V3(-0.22, DESK.y + 0.012, -0.66);
const celN = crearCel(pantN, C.g); scene.add(celN);
const celJ = crearCel(pantJ, C.navy2); scene.add(celJ);

// ---- AFUERA: el descanso (chapa gris), la baranda navy3, la escalera que baja al depósito ----
{
  const chapa = mat(0x8a8e98, 0.5, { metalness: 0.35 });
  FUERA.add(caja(OF_X1 - VID0 + 0.4, 0.1, PARED - DESC.z1, chapa, (VID0 + OF_X1) / 2 - 0.2, -0.05, (PARED + DESC.z1) / 2, 0.01));
  const { x0, x1, n, sube, pisada } = ESCA;
  for (let i = 1; i <= n; i++) FUERA.add(caja(x1 - x0, 0.06, pisada + 0.02, chapa, (x0 + x1) / 2, -i * sube - 0.03, DESC.z1 - (i - 0.5) * pisada, 0.008));
  const L = Math.hypot(n * sube, n * pisada), ang = Math.atan2(n * sube, n * pisada);
  for (const x of [x0 - 0.03, x1 + 0.03]) {
    const z = caja(0.05, 0.3, L, M.navy3, x, -n * sube / 2 - 0.1, DESC.z1 - n * pisada / 2, 0.01); z.rotation.x = -ang; FUERA.add(z);   // zancas
    const b = caja(0.05, 0.05, L, M.navy3, x, -n * sube / 2 + 0.92, DESC.z1 - n * pisada / 2, 0.01); b.rotation.x = -ang; FUERA.add(b);   // pasamanos
    for (let i = 0; i <= n; i += 3) FUERA.add(caja(0.04, 0.92, 0.04, M.navy3, x, -i * sube + 0.46, DESC.z1 - i * pisada, 0.01));
  }
  // la baranda del descanso (a los dos lados de la escalera y del lado derecho)
  for (const [a, b] of [[VID0 - 0.2, x0 - 0.03], [x1 + 0.03, OF_X1 + 0.2]]) {
    FUERA.add(caja(b - a, 0.05, 0.05, M.navy3, (a + b) / 2, 1.0, DESC.z1, 0.01)); FUERA.add(caja(b - a, 0.04, 0.04, M.navy3, (a + b) / 2, 0.5, DESC.z1, 0.01));
    for (let x = a; x <= b + 0.01; x += (b - a) / 3) FUERA.add(caja(0.04, 1.0, 0.04, M.navy3, x, 0.5, DESC.z1, 0.01));
  }
}
// ---- EL DEPÓSITO de abajo: piso de hormigón con líneas crema, pared navy claro, racks llenos, pallets ----
{
  const g = FUERA;
  const piso = mesh(new THREE.PlaneGeometry(30, 18), mat(0x8d939c, 0.92), 0, DEP_Y, -12); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; g.add(piso);
  for (const x of [-2.2, 3.4]) { const l = mesh(new THREE.PlaneGeometry(0.1, 14), mat(0xe9e4cf, 0.85), x, DEP_Y + 0.004, -11); l.rotation.x = -Math.PI / 2; l.castShadow = false; g.add(l); }
  const pm = mat(0x34507a, 0.92);
  g.add(cajaS(30, 9, 0.3, pm, 0, DEP_Y + 4.5, -19));
  g.add(cajaS(0.3, 9, 18, pm, -9, DEP_Y + 4.5, -11)); g.add(cajaS(0.3, 9, 18, pm, 9, DEP_Y + 4.5, -11));
  for (const [x, z] of [[-3, -7.5], [3.5, -7.5], [-3, -12], [3.5, -12], [0, -16]]) { const r = crearRack(5.6, 4); r.position.set(x, DEP_Y, z); g.add(r); }
  for (const [x, z, tp] of [[0.4, -5.4, 0], [1.7, -5.2, 3], [-1.1, -5.6, 1], [5.6, -5.0, 2]]) { const p = new THREE.Group(); p.position.set(x, DEP_Y, z); p.rotation.y = 0.1 * x; cargaPallet(p, tp); g.add(p); }
  // tubos fluorescentes del depósito
  for (const [x, z] of [[-3, -9], [3, -9], [0, -13]]) { const f = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.12), new THREE.MeshBasicMaterial({ color: 0xf6f3e6, toneMapped: false })); f.rotation.x = Math.PI / 2; f.position.set(x, DEP_Y + 6.2, z); g.add(f); }
}
// LA CAJA DE PIZZA (kraft sin marca, abierta, con dos porciones) en la escalera (P3, de noche)
pizza = new THREE.Group(); scene.add(pizza);
{
  pizza.add(caja(0.42, 0.045, 0.42, M.kraft, 0, 0.022, 0, 0.006));
  for (const [x, z, w, d] of [[0, 0.2, 0.42, 0.02], [0, -0.2, 0.42, 0.02], [0.2, 0, 0.02, 0.42], [-0.2, 0, 0.02, 0.42]]) pizza.add(caja(w, 0.07, d, mat(0xb8935a, 0.85), x, 0.06, z, 0.004));   // (r1) caja abierta sin tapa (la tapa se leía como un papel)
  for (const [a, b] of [[0.2, 0.9], [1.3, 0.9]]) { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.03, 20, 1, false, a, b), mat(0xe8b45a, 0.7)); s.position.y = 0.06; pizza.add(s); const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.006, 20, 1, false, a, b), mat(0xc4513c, 0.7)); s2.position.y = 0.067; s2.scale.setScalar(0.9); pizza.add(s2); }
  sombras(pizza);
}
fusionar(FUERA);
sombras(OF);
OF.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; o.receiveShadow = false; } });
cinta.castShadow = true;

// ---- LAS DOS PILAS DE CAJAS (P6 y Q3b): 1 unidad = $ 100.000 de alto ----
const U = 0.077;   // (r2) pilas más altas: llenan el plano del remate
const PILA = { xE: -1.2, xV: -0.72, z: -0.27, W: 0.45, D: 0.38 };
function frenteCaja(lineas, fondo, tinta, hU, extra) {
  const w = 560, h = Math.max(160, Math.round(hU * U * 1400));
  return lienzo(w, h, (x) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.fillStyle = "rgba(0,0,0,0.12)"; x.fillRect(0, 0, w, 10); x.fillRect(0, h - 10, w, 10);
    if (extra) extra(x, w, h);
    x.textAlign = "center"; x.textBaseline = "middle";
    const tot = lineas.reduce((a, l) => a + l[1] * 1.12, 0); let y = h / 2 - tot / 2;
    for (const [txt, px, peso = 900, col = tinta] of lineas) { x.fillStyle = col; ajustar(x, txt, peso, px, w - 50); y += px * 0.56; x.fillText(txt, w / 2, y); y += px * 0.56; }
  });
}
function crearCajaPila(hU, lineas, color, tinta) {
  const tex = frenteCaja(lineas, color, tinta, hU, (x, w, h) => { if (color === "#c9a46b") { x.fillStyle = "#b8935a"; x.fillRect(w / 2 - 30, 0, 60, h); } });
  const lado = mat(new THREE.Color(color).getHex(), 0.85);
  const fr = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85 });
  const m = new THREE.Mesh(rbox(PILA.W, hU * U - 0.004, PILA.D, 0.012, 2), [lado, lado, lado, lado, fr, lado]);
  m.castShadow = true; m.receiveShadow = true;
  const g = new THREE.Group(); g.add(m); g.userData = { hU, m }; scene.add(g);
  return g;
}
const KR = "#c9a46b", RJ = "#c7655b";
const pilaE = crearCajaPila(28, [["FACTURÓ", 120], ["LA", 120], ["EMPRESA", 120], ["$ 2.800.000", 104]], "#16243d", "#efeee5");
const cjNico = crearCajaPila(15, [["NICO", 150], ["$ 1.500.000", 104]], KR, "#0b1220");
const cjHN = crearCajaPila(5, [["HÉCTOR", 120], ["$ 500.000", 110], ["según Nico", 104, 800]], RJ, "#efeee5");
const cjJavi = crearCajaPila(8, [["JAVI", 150], ["$ 800.000", 110]], KR, "#0b1220");
const cjHJ = crearCajaPila(5, [["HÉCTOR", 120], ["$ 500.000", 110], ["según Javi", 104, 800]], RJ, "#efeee5");
const cjHJ2 = crearCajaPila(5, [["HÉCTOR", 120], ["$ 500.000", 110], ["Javi ✓", 110]], KR, "#0b1220");   // la de Javi, ya en orden (Q3b)
const PILA_V = [cjNico, cjHN, cjJavi, cjHJ];
// la línea de referencia a la altura de la empresa y el "= ✓" verde
const lineaRef = new THREE.Group(); scene.add(lineaRef);
{
  const largo = PILA.xV - PILA.xE + PILA.W + 0.3;
  // (r2) la línea de la empresa: una regla crema con borde navy, de la pila de la empresa hasta pasar la de los vendedores,
  // con la etiqueta "EMPRESA" en la punta (se lee sin sonido)
  const L0 = PILA.xE - PILA.W / 2 - 0.02, L1 = PILA.xV + PILA.W / 2 + 0.42;
  lineaRef.add(caja(L1 - L0, 0.04, 0.03, M.navy, (L0 + L1) / 2, 0, -0.004, 0.006));
  lineaRef.add(caja(L1 - L0, 0.022, 0.03, mat(C.cr, 0.6, { emissive: C.cr, emissiveIntensity: 0.25 }), (L0 + L1) / 2, 0, 0.004, 0.006));
  const etT = lienzo(520, 170, (x, w, h) => { x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(0, 0, w, h, 30); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 14; x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "EMPRESA", 900, 110, w - 50); x.fillText("EMPRESA", w / 2, h / 2 + 4); });
  lineaRef.add(plano(0.36, 0.118, etT, L1 - 0.18, 0.09, 0.02, true));
  lineaRef.position.set(0, 28 * U, PILA.z + PILA.D / 2 + 0.03);
}
const igualT = lienzo(400, 200, (x, w, h) => { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(0, 0, w, h, 60); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 150); x.fillText("= ✓", w / 2, h / 2 + 8); });
const igual = new THREE.Group(); scene.add(igual);
{ igual.add(caja(0.5, 0.25, 0.06, M.navy, 0, 0, -0.035, 0.05)); const p = plano(0.46, 0.23, igualT, 0, 0, 0.0, true); igual.add(p); }

// ---- luces: la mañana fría del día 1, la noche (lámpara cálida, el vidrio oscuro) y la tarde del día 2 ----
const sol = new THREE.DirectionalLight(0xfff6e8, 1.6);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 3;
Object.assign(sol.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 1, far: 20 });
sol.position.set(-1.6, 5.2, 3.6); sol.target.position.set(0, 0.6, -1.2); scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xeef0f2, 0x5a5048, 1.85); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xe2eafa, 0.7); relleno.position.set(3, 3, 5); relleno.target.position.set(0, 1, -1); scene.add(relleno, relleno.target);
const luzDep = new THREE.HemisphereLight(0xe6edf5, 0x5a5048, 1.2); luzDep.position.set(0, -1, -10); scene.add(luzDep);
const MODOS = {
  manana: { sol: [0xf4f6ff, 1.6], cielo: [0xeef3f8, 0x5a5048, 1.85], rel: [0xe2eafa, 0.7], fondo: 0x34507a },
  noche: { sol: [0xffc98a, 1.5], cielo: [0xb0a08a, 0x3a3430, 1.35], rel: [0x8a9ac0, 0.6], fondo: 0x0b1220 },
  tarde: { sol: [0xffdcae, 1.75], cielo: [0xf4e9d8, 0x5a4a38, 1.7], rel: [0xe2eafa, 0.55], fondo: 0x34507a },
};
function luzModo(m) {
  const k = MODOS[m];
  sol.color.setHex(k.sol[0]); sol.intensity = k.sol[1];
  cielo.color.setHex(k.cielo[0]); cielo.groundColor.setHex(k.cielo[1]); cielo.intensity = k.cielo[2];
  relleno.color.setHex(k.rel[0]); relleno.intensity = k.rel[1];
  luzDep.intensity = m === "noche" ? 0.35 : 1.2;
  scene.background = new THREE.Color(k.fondo);
}

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q1b - 0.2), r2(T.q3b - 0.25)] });
const rubenO = crearPersonaje({ ...ELENCO.ruben, ojeras: 0x7a5a6a, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p4 + 0.02)] });   // el de las ojeras (día 2)
const nico = crearPersonaje({ ...ELENCO.empleado, cortoMechas: true, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p5b + 0.1), r2(T.q3 + 0.1)] });
const javi = crearPersonaje({ ...ELENCO.javi, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p6 + 0.3)] });
// el pelo de Rubén: la herradura de bolitas canosas (de dist-pedidos-lunes / dist-quien-debe), en los dos Rubén
function herradura(per) {
  const corona = per.cabeza.children.find((o) => o.isMesh && o.geometry.type === "SphereGeometry" && Math.abs((o.geometry.parameters.phiLength || 0) - Math.PI * 1.14) < 1e-3);
  if (!corona) return;
  corona.visible = false;
  const pm = mat(PELO.canoso, 0.85), pm2 = mat(0xa9a6a0, 0.85);
  const R0 = 0.3, CC0 = R0 * 0.92;
  semilla = 21;
  const bola = new THREE.SphereGeometry(1, 16, 12);
  const fila = (n, a0, a1, e0, eK, s0, sK, h) => {
    for (let i = 0; i < n; i++) {
      const u = (i + 0.5) / n, w = Math.sin(Math.PI * u);
      const a2 = lerp(a0, a1, u) + (az() - 0.5) * 0.07, e2 = e0 + eK * w + (az() - 0.5) * 0.09;
      const sz = s0 + sK * w + 0.008 * az(), k = 0.975;
      const x = R0 * k * Math.sin(a2) * Math.cos(e2), y = CC0 + R0 * 0.97 * k * Math.sin(e2), z = R0 * 0.95 * k * Math.cos(a2) * Math.cos(e2);
      const m = mesh(bola, (i + n) % 4 ? pm : pm2, x, y, z); m.scale.set(sz, sz * h, sz); per.cabeza.add(m);
    }
  };
  fila(26, 1.5, Math.PI * 2 - 1.5, -0.1, 0.0, 0.02, 0.017, 1.3);
  fila(9, 2.4, Math.PI * 2 - 2.4, -0.25, -0.02, 0.019, 0.01, 1.15);
}
herradura(ruben); herradura(rubenO);
const bigotes = (per) => { const L = []; per.cabeza.traverse((o) => { if (o.isMesh && o.material.color && (o.material.color.getHex() === PELO.gris || o.material.color.getHex() === ELENCO.ruben.cejasColor)) L.push(o); }); return L; };
const BIGOTE = new Map([[ruben, bigotes(ruben)], [rubenO, bigotes(rubenO)]]);
function bigoteSegunCamara(per, cam = camera) {
  per.cabeza.updateMatrixWorld(true);
  const h = per.cabeza.getWorldPosition(new THREE.Vector3()), f = V3(0, 0, 1).transformDirection(per.cabeza.matrixWorld), c = cam.position.clone().sub(h);
  f.y = 0; c.y = 0; f.normalize(); c.normalize();
  for (const b of BIGOTE.get(per)) b.visible = f.dot(c) > 0.1;
}
// la mochila de muestras crema de Javi (en la espalda, correas navy3)
{
  const mo = new THREE.Group(); javi.cuerpo.add(mo);
  mo.add(caja(0.34, 0.42, 0.17, mat(C.cr2, 0.8), 0, 0.3, -0.28, 0.06)); mo.add(caja(0.3, 0.15, 0.06, mat(C.cr2, 0.8), 0, 0.2, -0.38, 0.03));
  mo.add(caja(0.345, 0.03, 0.175, M.navy3, 0, 0.44, -0.28, 0.01));
  for (const s of [-1, 1]) { const cr = mesh(new THREE.TorusGeometry(0.21, 0.016, 6, 24, Math.PI * 0.95), M.navy3, s * 0.12, 0.38, -0.07); cr.rotation.set(0, Math.PI / 2, -Math.PI / 2 - 0.15); cr.scale.set(1, 1.15, 0.8); mo.add(cr); }
  sombras(mo);
}
const TODOS = [ruben, rubenO, nico, javi];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// ---- avatares: la cara del personaje 3D renderizada chica en un círculo ----
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
    if (per.ojoLejano) per.ojoLejano(cam.position);
    renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
    const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    const id = x.createImageData(256, 256);
    for (let y = 0; y < 256; y++) id.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
    x.putImageData(id, 0, 0);
    if (padre) padre.add(per.raiz); else esc.remove(per.raiz);
    return cv;
  };
  AVATAR.nico = leer(nico, 0xefeee5);
  AVATAR.javi = leer(javi, 0xb9cde0);
  AVATAR.ruben = leer(ruben, 0xb9cde0);
  AVATAR.graciela = leer(crearPersonaje({ ...ELENCO.clienta, lentesFinos: true, sinPatillas: true, parpadeoCada: 999 }), 0xefeee5);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
const inicial = (x, letra, cx, cy, r, fondo = "#16243d", tinta = "#efeee5") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.fillStyle = tinta; x.font = F(900, r * 1.1); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(letra, cx, cy + r * 0.06); x.textAlign = "left"; };
function parlante() {}
// ================= PANTALLAS =================
const pesos = (n) => "$ " + Math.round(n).toLocaleString("es-UY").replace(/,/g, ".");
const fit = (x, txt, peso, px, ancho) => { ajustar(x, txt, peso, px, ancho); };
// ---- el monitor de Rubén: la planilla (parte 1) · el panel de comisiones (parte 2) ----
let claveMon = "";
function dibujarMon(t) {
  const parte2 = t >= P2;
  const W = 1280, H = 896;
  let clave;
  if (!parte2) {
    const cols = T.col.filter((a) => t >= a).length;
    const res = t >= T.enter + 0.04 ? 1 : 0;
    const rec = t >= T.recalc ? (t >= T.baja ? 2 : 1) : 0;
    clave = `x|${cols}|${res}|${rec}`;
    if (clave === claveMon) return; claveMon = clave;
    const { x } = pantMon.userData;
    x.textBaseline = "middle"; x.textAlign = "left";
    x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, W, H);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 120); x.fillStyle = "#efeee5"; fit(x, "COMISIONES OCTUBRE.xlsx", 800, 70, W - 80); x.fillText("COMISIONES OCTUBRE.xlsx", 36, 62);
    // las columnas: las 3 de base (anchas) se aprietan a la izquierda cuando se abren las nuevas
    const nuevas = [["COBRADO"], ["DEVOLU-", "CIONES"], ["PAGÓ LA", "MITAD", 1], ["¿DE QUIÉN", "ES?", 1]].slice(0, cols);
    const base = [["VENDEDOR", 0.27], ["CLIENTE", 0.43], ["VENDIDO", 0.3]];
    const anchoBase = cols ? W - cols * 238 : W;
    const Y0 = 120, HH = 150, FH = 150;
    x.fillStyle = "#d9d7c9"; x.fillRect(0, Y0, W, HH);
    let cx = 0; const xs = [];
    base.forEach(([n, k]) => { const w = anchoBase * k; xs.push([cx, w]); x.fillStyle = "#1f3254"; fit(x, n, 800, cols ? 40 : 56, w - 20); x.fillText(n, cx + 14, Y0 + HH / 2); cx += w; });
    nuevas.forEach(([a, b, rojo], i) => {
      const w = 238; xs.push([cx, w]);
      x.fillStyle = rojo ? "#c7655b" : "#16243d"; x.fillRect(cx + 4, Y0 + 4, w - 8, HH - 8);
      x.fillStyle = "#efeee5"; x.textAlign = "center";
      if (b) { fit(x, a, 900, 50, w - 20); x.fillText(a, cx + w / 2, Y0 + HH / 2 - 28); fit(x, b, 900, 50, w - 20); x.fillText(b, cx + w / 2, Y0 + HH / 2 + 30); }
      else { fit(x, a, 900, 50, w - 20); x.fillText(a, cx + w / 2, Y0 + HH / 2); }
      x.textAlign = "left"; cx += w;
    });
    x.strokeStyle = "#b4b2a3"; x.lineWidth = 4;
    for (const [a] of xs) { x.beginPath(); x.moveTo(a, Y0); x.lineTo(a, H); x.stroke(); }
    const FILAS = [
      ["Nico", "Bar Walter", "200.000", ["100.000", "0", "sí", "Nico"], 0],
      ["Nico", "Rotisería Graciela", "66.000", ["66.000", "0", "no", "Nico"], 0],
      ["¿?", "Súper Héctor", "500.000", ["500.000", "0", "no", "¿Nico? ¿Javi?"], 1],
      ["Javi", "Panadería Nelly", "200.000", ["100.000", "0", "sí", "Javi"], 0],
    ];
    FILAS.forEach(([v, c, n, ex, rojo], i) => {
      const y = Y0 + HH + i * FH; x.strokeStyle = "#b4b2a3"; x.beginPath(); x.moveTo(0, y + FH); x.lineTo(W, y + FH); x.stroke();
      if (rojo) { x.fillStyle = "rgba(199,101,91,0.16)"; x.fillRect(0, y, W, FH); }
      const celdas = [v, c, n, ...ex.slice(0, cols)];
      celdas.forEach((txt, k) => { const [a, w] = xs[k]; x.fillStyle = rojo && (k === 0 || k === 6) ? "#c7655b" : "#0b1220"; fit(x, txt, 800, cols ? (k < 3 ? 40 : 50) : 62, w - 24); x.fillText(txt, a + 12, y + FH / 2); });
    });
    if (res) {
      // el resultado de dos días: "Nico · $ 42.000" resaltado
      x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(110, 330, W - 220, 300, 40); x.fill(); x.strokeStyle = "#efeee5"; x.lineWidth = 14; x.stroke();
      x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 92); x.fillText("Comisión de Nico", W / 2, 405);
      x.font = F(900, 150); x.fillText(rec === 2 ? "$ 41.802" : "$ 42.000", W / 2, 540); x.textAlign = "left";
      if (rec === 2) { x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(W - 470, 650, 420, 150, 40); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 112); x.fillText("− $ 198", W - 260, 728); x.textAlign = "left"; }
    }
    if (rec) {
      // Recalculando…: una franja roja apagada sobre toda la hoja
      x.fillStyle = "rgba(199,101,91,0.95)"; x.fillRect(0, 140, W, 170);
      x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 120); x.fillText("Recalculando…", W / 2, 228); x.textAlign = "left";
    }
  } else {
    // el panel: "Comisiones · Octubre · Cerrado ✓ · Día 1, 8:00"
    const abre = t >= T.toca && t < T.q3b ? 1 : 0;
    const dev = t >= T.devol ? 1 : 0;
    const nico = dev ? Math.round(lerp(42000, 41802, cl(sg(t, T.baja2, T.baja2 + 0.35)))) : 42000;
    const cursor = t >= T.q3m - 0.05 && t < T.toca ? cl(sg(t, T.q3m - 0.05, T.toca)) : -1;
    clave = `p|${abre}|${dev}|${nico}|${Math.round(cursor * 10)}|${t >= T.c ? 1 : 0}`;
    if (clave === claveMon) return; claveMon = clave;
    const { x } = pantMon.userData;
    x.textBaseline = "middle"; x.textAlign = "left";
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, H);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, W, 10);
    // (r2) panel con poco texto y grande (se lee aun en los planos medios): ≥ 76 px de lienzo
    x.fillStyle = "#efeee5"; x.font = F(900, 76); x.fillText("Comisiones", 36, 68);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(W - 470, 18, 440, 100, 50); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 74); x.fillText("Cerrado ✓", W - 250, 70); x.textAlign = "left";
    const FILAS = [[AVATAR.nico, "Nico", nico], [AVATAR.javi, "Javi", 36000]];
    FILAS.forEach(([av, n, com], i) => {
      const y = 165 + i * 230;
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(24, y, W - 48, 210, 30); x.fill();
      if (i === 0 && dev && t < T.baja2 + 0.6) { x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.stroke(); }
      avatar(x, av, 118, y + 105, 78);
      x.fillStyle = "#0b1220"; x.font = F(900, 110); x.fillText(n, 220, y + 110);
      x.textAlign = "right"; x.font = F(900, 120); x.fillText(pesos(com), W - 50, y + 110); x.textAlign = "left";
    });
    if (dev && t < T.c) {   // (pulido) en el cierre sin la fila de abajo (asomaba partida sobre la tarjeta)
      const y = 640; x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, y, W - 48, 210, 30); x.fill(); x.strokeStyle = "#5ce611"; x.lineWidth = 10; x.stroke();
      x.fillStyle = "#efeee5"; x.font = F(900, 90); x.fillText("Devolución", 56, y + 105);
      x.fillStyle = "#5ce611"; x.textAlign = "right"; x.font = F(900, 110); x.fillText("− $ 198", W - 56, y + 108); x.textAlign = "left";
    } else if (t < T.c) {
      x.fillStyle = "#5ce611"; x.textAlign = "center"; fit(x, "Comisiones: cerradas ✓", 900, 92, W - 80); x.fillText("Comisiones: cerradas ✓", W / 2, 750); x.textAlign = "left";
    }
    if (abre) {
      // el pedido 0388, con su vendedor desde que se cargó
      x.fillStyle = "rgba(11,18,32,0.7)"; x.fillRect(0, 140, W, H);
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(40, 180, W - 80, 680, 40); x.fill(); x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.stroke();
      x.fillStyle = "#1f3254"; x.font = F(800, 60); x.fillText("Pedido 0388 · 14/10, 10:12", 90, 260);
      x.fillStyle = "#0b1220"; x.font = F(900, 104); x.fillText("Súper Héctor", 90, 380);
      x.font = F(900, 96); x.fillText("$ 500.000", 90, 500);
      x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(80, 580, W - 160, 220, 60); x.fill();
      avatar(x, AVATAR.javi, 200, 690, 80);
      x.fillStyle = "#0b1220"; x.font = F(900, 104); x.fillText("Cargó: Javi ✓", 310, 694);
    }
    if (cursor >= 0) {
      // la flecha del mouse que va a la fila (y hace clic)
      const cx0 = lerp(260, 420, eio(cursor)), cy0 = lerp(820, 500, eio(cursor)), s = 1.6;   // (r2) sube por la izquierda hasta "Javi" (no pasa por los montos)
      x.save(); x.translate(cx0, cy0); x.scale(s, s);
      x.fillStyle = "#efeee5"; x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 56); x.lineTo(14, 44); x.lineTo(24, 66); x.lineTo(34, 61); x.lineTo(24, 40); x.lineTo(42, 40); x.closePath(); x.fill(); x.stroke();
      x.restore();
    }
  }
  pantMon.needsUpdate = true;
}
// ---- el celular de Nico: P5 su cuenta (calculadora) · Q2 "Tu comisión" · Q4n la notificación de la devolución ----
let claveN = "";
function calcPant(x, w, h, quien, a, b) {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.textBaseline = "middle"; x.textAlign = "left";
  
  x.textAlign = "right"; x.fillStyle = "#efeee5"; fit(x, a, 900, 110, w - 60); x.fillText(a, w - 30, 220);
  x.font = F(900, 104); x.fillText("× 3 %", w - 30, 350);
  x.fillStyle = "#2c4268"; x.fillRect(36, 440, w - 72, 8);
  x.fillStyle = "#efeee5"; fit(x, b, 900, 170, w - 60); x.fillText(b, w - 30, 570);
  // el teclado de la calculadora (teclas grandes, sin texto chico)
  for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) { x.fillStyle = k === 3 ? "#5ce611" : "#16243d"; x.beginPath(); x.arc(95 + k * 137, 760 + i * 120, 52, 0, 7); x.fill(); }
  x.textAlign = "left";
}
function dibujarN(t) {
  const modo = t < P2 ? "calc" : t < T.q4 ? "comision" : "noti";
  const n = modo === "comision" ? Math.round(42000 * eo(cl(sg(t, T.cuenta, T.cuentaFin)))) : 0;
  const clave = `${modo}|${Math.round(n / 1000)}|${t >= T.cuentaFin ? 1 : 0}`; if (clave === claveN) return; claveN = clave;
  const { x } = pantN.userData, w = 600, h = 1215;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "calc") { calcPant(x, w, h, "Mi cuenta", "2.000.000", "60.000"); }
  else if (modo === "comision") {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, w, 8);
    x.fillStyle = "#efeee5"; fit(x, "Distribuidora Rubén", 800, 50, w - 60); x.fillText("Distribuidora Rubén", 30, 62); x.fillStyle = "#5ce611"; x.font = F(800, 44); x.fillText("Mis comisiones", 30, 128);
    x.fillStyle = "#efeee5"; fit(x, "Tu comisión · Octubre", 800, 56, w - 60); x.fillText("Tu comisión · Octubre", 34, 270);
    const ok = t >= T.cuentaFin;
    x.fillStyle = ok ? "#5ce611" : "#efeee5"; fit(x, pesos(n) + (ok ? " ✓" : ""), 900, 132, w - 50); x.fillText(pesos(n) + (ok ? " ✓" : ""), 28, 410);
    x.fillStyle = "#efeee5"; fit(x, "Cobrado: $ 1.400.000", 800, 64, w - 60); x.fillText("Cobrado: $ 1.400.000", 34, 540); x.font = F(800, 64); x.fillText("× 3 %", 34, 615);
    x.fillStyle = "#1f3254"; x.beginPath(); x.roundRect(24, 680, w - 48, 330, 28); x.fill();
    x.fillStyle = "#b9cde0"; x.font = F(800, 62); x.fillText("Pendiente:", 50, 745);
    x.fillStyle = "#efeee5"; for (const [k, l] of ["Bar Walter: la mitad", "+ $ 3.000 al cobrar"].entries()) { fit(x, l, 800, 62, w - 90); x.fillText(l, 50, 840 + k * 86); }
  } else {
    // Q4n: la notificación de la devolución (y la comisión al día)
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 120); x.fillText("8:06", w / 2, 150); x.textAlign = "left";
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(20, 260, w - 40, 640, 40); x.fill(); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.stroke();
    x.fillStyle = "#1f3254"; x.font = F(800, 50); x.fillText("Devolución", 54, 340);
    x.fillStyle = "#0b1220"; fit(x, "Rotisería Graciela", 900, 58, w - 100); x.fillText("Rotisería Graciela", 54, 420);
    x.fillStyle = "#c7655b"; x.font = F(900, 120); x.fillText("− $ 198", 50, 560);
    x.fillStyle = "#1f3254"; x.font = F(800, 50); x.fillText("Tu comisión:", 54, 680);
    x.fillStyle = "#3fa60a"; x.font = F(900, 108); x.fillText("$ 41.802", 50, 800);
  }
  pantN.needsUpdate = true;
}
// ---- el celular de Javi (P5b: su cuenta) ----
let claveJ = "";
function dibujarJ(t) { if (claveJ) return; claveJ = "1"; const { x } = pantJ.userData; calcPant(x, 600, 1215, "Mi cuenta", "1.300.000", "39.000"); pantJ.needsUpdate = true; }
// ---- el celular de Rubén en el escritorio: la llamada de Rotisería Graciela, en altavoz ----
let claveR = "";
function dibujarR(t) {
  if (claveR) return; claveR = "1";
  const { x } = pantR.userData, w = 600, h = 1215;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  x.textAlign = "center"; x.textBaseline = "middle";
  avatar(x, AVATAR.graciela, w / 2, 330, 200);
  x.fillStyle = "#efeee5"; x.font = F(900, 74); x.fillText("Rotisería", w / 2, 640); x.fillText("Graciela", w / 2, 730);
  x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(60, 860, w - 120, 150, 75); x.fill();
  x.fillStyle = "#0b1220"; x.font = F(900, 70); x.fillText("Altavoz", w / 2, 937);
  pantR.needsUpdate = true;
}
// ================= TARJETAS PEGADAS A LA CÁMARA: globos, rótulos, guías (de veterinaria-vacunas) =================
const PXK = 1000;
function crearTarjeta(Wg, H, dibujo, { fondo = "#efeee5", borde = C.navy, sombraC = 0x050a14 } = {}) {
  const tex = lienzo(Wg * 2, H * 2, (x, w, h) => { x.fillStyle = fondo; x.fillRect(0, 0, w, h); x.save(); x.scale(2, 2); dibujo(x, Wg, H); x.restore(); });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: borde, transparent: true });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(fondo), transparent: true });
  const sombraM = new THREE.MeshBasicMaterial({ color: sombraC, transparent: true });
  const w = Wg / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sombra.position.set(12 / PXK, -14 / PXK, -0.016); g.add(sombra);
  const bord = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); bord.position.z = -0.012; g.add(bord);
  const caja2 = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex, transparent: true }), cuerpoM]); g.add(caja2);
  const colaG = new THREE.Group(); g.add(colaG);
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(80 / PXK, 104 / PXK), sombraM); cs.position.set(12 / PXK, -8 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(80 / PXK, 104 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(54 / PXK, 78 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja2.userData.orden = 4;
  g.userData = { W: Wg, H, cola: colaG, tex, dibujo, fondo };
  return pegarACamara(g, camera, 40);
}
function textoSel(x, l, cx, y, px, tinta = "#0b1220") {
  const limpio = (s) => s.replace(/[[\]{}]/g, "");
  x.font = F(800, px); x.textBaseline = "middle"; x.textAlign = "left";
  const partes = l.split(/(\[[^\]]+\]|\{[^}]+\})/).filter(Boolean);
  const anchos = partes.map((p) => x.measureText(limpio(p)).width + (p.startsWith("[") ? px * 0.5 : 0));
  let xx = cx - anchos.reduce((a, b) => a + b, 0) / 2;
  partes.forEach((p, k) => {
    if (p.startsWith("[")) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = px * 0.1; x.beginPath(); x.roundRect(xx + px * 0.05, y - px * 0.62, anchos[k] - px * 0.1, px * 1.24, px * 0.12); x.fill(); x.stroke(); x.fillStyle = tinta; x.fillText(limpio(p), xx + px * 0.25, y + px * 0.04); }
    else if (p.startsWith("{")) { x.fillStyle = "#c7655b"; x.fillText(p.slice(1, -1), xx, y + px * 0.04); }
    else { x.fillStyle = tinta; x.fillText(p, xx, y + px * 0.04); }
    xx += anchos[k];
  });
}
// globo de diálogo (texto grande); cab = { cv, nombre } (avatar) o { icono: "parlante", nombre }; minW = ancho mínimo
function crearGlobo(lineas, px = 80, { cab = null, minW = 0 } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  const limpio = (l) => l.replace(/[[\]{}]/g, "");
  const cabH = cab ? Math.round(px * 1.25) : 0, cabF = Math.max(Math.round(px * 0.78), 40);   // (r2) cabecera más grande
  med.font = F(700, cabF); const anchoCab = cab ? med.measureText(cab.nombre).width + cabF * 2.4 : 0; med.font = F(800, px);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.max(minW, Math.round(anchoT + px * 1.2)), H = Math.round(lineas.length * px * 1.22 + px * 0.75 + cabH);
  return crearTarjeta(Wg, H, (x, w, h) => {
    if (cab) {
      const r = cabF * 0.78, cy = px * 0.25 + r, cx = px * 0.35 + r;
      if (cab.icono) parlante(x, cx, cy, r); else avatar(x, cab.cv, cx, cy, r);
      x.fillStyle = "#1f3254"; x.font = F(700, cabF); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(cab.nombre, cx + r + px * 0.25, cy + 2);
    }
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + (h - cabH) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  });
}
// el rótulo: caja navy, texto crema (o rojo apagado), borde crema
function crearRotulo(lineas, px = 50) {
  const med = document.createElement("canvas").getContext("2d");
  const ancho = Math.max(...lineas.map(([l, , p]) => { med.font = F(800, p ?? px); return med.measureText(l).width; }));
  const H = Math.round(lineas.reduce((a, [, , p]) => a + (p ?? px) * 1.25, 0) + px * 0.6), Wg = Math.round(ancho + px * 1.0);
  return crearTarjeta(Wg, H, (x, w, h) => {
    let y = px * 0.3; x.textAlign = "center"; x.textBaseline = "middle";
    for (const [l, color, p] of lineas) { const q = p ?? px; x.font = F(800, q); x.fillStyle = color ?? "#efeee5"; x.fillText(l, w / 2, y + q * 0.62); y += q * 1.25; }
  }, { fondo: "#16243d", borde: C.cr });
}
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
// REGLA DE BURBUJAS (de veterinaria-vacunas): la burbuja va arriba del que habla, con su borde de abajo ~100 px sobre la
// coronilla y la cola terminando en el pelo, nunca en la cara. Si no entra (o el que habla queda cortado), se anota en
// AVISOS (prev.mjs lo imprime).

// REGLA DE BURBUJAS: la burbuja va arriba del que habla y la cola apunta a su BOCA (corta, no llega a la cara). Si no
// entra (o el que habla queda cortado), se anota en AVISOS (prev.mjs lo imprime).
const AVISOS = [];
let PROY = null;   // en la pantalla partida: la cámara y la mitad (0 arriba, 1 abajo) con que se proyecta
function enPantallaCam(v, cam, mitad) { _v.copy(v).project(cam); return [(_v.x + 1) * 540, mitad * 960 + (1 - _v.y) * 480]; }
const aPx = (v) => (PROY ? enPantallaCam(v, PROY[0], PROY[1]) : enPantalla(v));
const bocaW = (per) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(0, 0.15, 0.3)); };
const coronillaPx = (per) => { per.raiz.updateMatrixWorld(true); return aPx(per.cabeza.localToWorld(V3(0, 0.62, 0))); };
function hablar(g, per, s, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) {
  const [hx, hy] = coronillaPx(per), [mx, my] = aPx(bocaW(per));
  const { H } = g.userData;
  let cy = hy - sobre - H / 2;
  if (cy - H / 2 < minY - 10) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  cy = cl(cy, H / 2 + minY, maxY - H / 2);
  if (mx < 70 || mx > 1010 || hy < 0 || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, cy, s, [mx, my], orden);
}
// (r1) las líneas con remate se parten en dos tiempos: la burbuja "a" (mismo tamaño) muestra la primera mitad y la
// completa aparece recién cuando suena la segunda (CORTE de gen.mjs: el silencio interno de la toma), con un pop
// (r1) la burbuja crece con el texto: la "a" tiene solo la primera mitad, de su tamaño
function globo2(lineas, px, vacias) { const g = crearGlobo(lineas, px); const a = crearGlobo(lineas.filter((l, i) => !vacias.includes(i)), px); return [a, g]; }
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  if (b === a || b[0] <= a[0]) return a.slice(1, 8);   // (r3) después de la última clave (el último cuadro) quieta, sin NaN
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCam(v, t, quieta = false) {
  const mano = quieta ? 0 : Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + (quieta ? 0 : Math.sin(t * 0.67) * 0.002), v[2]);
  camera.fov = v[6]; camera.updateProjectionMatrix();
  camera.lookAt(_m.set(v[3], v[4], v[5]));
}
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }
// una cámara de frente a una pantalla (plano local del objeto): llena `llena` del alto (o del ancho) del cuadro
function camPantalla(obj, centroLocal, normalLocal, alto, llena, fov, t, extra = 0) {
  obj.updateMatrixWorld(true);
  const c = obj.localToWorld(centroLocal.clone()), n = normalLocal.clone().transformDirection(obj.matrixWorld);
  const d = alto / llena / (2 * Math.tan((fov * D2R) / 2)) + extra;
  const p = c.clone().add(n.multiplyScalar(d));
  ponerCam([p.x, p.y, p.z, c.x, c.y, c.z, fov], t, true);
  camera.up.copy(V3(0, 1, 0).transformDirection(obj.matrixWorld)); camera.lookAt(c);
  return { c, p, d };
}
const lerpV = (a, b, u) => a.map((v, i) => lerp(v, b[i], u));

// ================= POSES =================
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.88, tension: 0.15, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.95 } };
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.8, tension: 0.25, feliz: 0 }, cejas: { alto: -0.1, ang: -0.2 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca = { ...(p.boca || {}), abierta: Math.max(p.boca?.abierta ?? 0, cl(e * 1.1 - 0.05) * k) }; }
};
const _w = new THREE.Vector3();
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const MANO_MATE = [0.17, 0.33, 0.36];
const hablaEn = (t, k, t0) => t >= t0 && t < t0 + LEN[k];
// la cabeza girada hacia la cámara (yaw relativo al cuerpo), con un factor
const haciaCam = (cp, x, z, giro, k = 0.8, lim = 0.9) => cl((Math.atan2(cp[0] - x, cp[2] - z) - giro) * k, -lim, lim);

// ================= GLOBOS Y RÓTULOS =================
const [r1a, r1g] = globo2(["Fácil.", "Tres por ciento", "[de lo cobrado.]"], 70, [1, 2]);
const [n2a, n2g] = globo2(["¿Cuarenta y dos?", "Súper Héctor [es mío.]"], 66, [1]);
const [r3a, r3g] = globo2(["Felicitaciones.", "Entre los dos", "vendieron [más]", "[que la empresa.]"], 46, [1, 2, 3]);
const [r4a, r4g] = globo2(["Te toca menos.", "{Pasá el jueves.}"], 76, [1]);
const [n3a, n3g] = globo2(["Cuarenta y dos mil.", "[¿Ya?]"], 70, [1]);
const [r6a, r6full] = globo2(["Felicitaciones.", "Ahora la", "[cuenta da.]"], 46, [1, 2]);
const [n5a, n5g] = globo2(["Ya sé.", "[Me llegó.]"], 76, [1]);
const CAB_G = { cv: AVATAR.graciela, nombre: "Altavoz · Graciela" };
const GL = {
  n1: crearGlobo(["Jefe, ¿cuánto", "[me toca?]"], 78), n1b: crearGlobo(["Jefe, ¿cuánto", "[me toca?]"], 78),
  r1: r1g, r1a,
  r2: crearGlobo(["Nico: cuarenta", "y [dos mil.]"], 74),
  n2: n2g, n2a,
  j1: crearGlobo(["¡Héctor [es mío!]"], 80),
  r3: r3g, r3a,
  g1: crearGlobo(["Rubén, te devuelvo", "[seis cajas.]"], 70, { cab: CAB_G }), g2: crearGlobo(["Rubén, te devuelvo", "[seis cajas.]"], 70, { cab: CAB_G }),
  r4: r4g, r4a,
  r5: crearGlobo(["Mirá el [celular.]"], 80),
  n3: n3g, n3a,
  j2: crearGlobo(["¿Y Súper [Héctor?]"], 80),
  n4: crearGlobo(["…Es de [Javi.]"], 84),
  r6: r6full, r6a,
  r7: crearGlobo(["Te toca menos."], 76),
  n5: n5g, n5a,
};
const ROT_ = {
  remitos: crearRotulo([["2 vendedores", null, 52], ["214 remitos", "#efeee5", 60]], 52),
  walter: crearRotulo([["Bar Walter:", null, 52], ["pagó la mitad", "#c7655b", 60]], 52),
  cuenta: crearRotulo([["Su cuenta: lo vendido", null, 48], ["+ Súper Héctor", "#c7655b", 58]], 48),
  segunN: crearRotulo([["Según Nico:", null, 46], ["$ 2.000.000", "#efeee5", 58]], 46),
  segunJ: crearRotulo([["Según Javi:", null, 46], ["$ 1.300.000", "#efeee5", 58]], 46),
  mas: crearRotulo([["+ $ 500.000", "#c7655b", 64]], 64),
  sola: crearRotulo([["Se calcula sola", null, 50], ["con cada venta cobrada", "#5ce611", 54]], 50),
  pedido: crearRotulo([["Cada pedido, con su vendedor", null, 46], ["desde que se carga", "#5ce611", 56]], 46),
  devol: crearRotulo([["La devolución", null, 50], ["se descuenta sola", "#5ce611", 60]], 50),
};
const GUIAS = [crearGuia(), crearGuia()];

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
OF.updateMatrixWorld(true);
function camFrente(obj, centroLocal, normalLocal, alto, llena, fov, dx = 0, dy = 0) {
  obj.updateMatrixWorld(true);
  const c = obj.localToWorld(centroLocal.clone()), n = normalLocal.clone().transformDirection(obj.matrixWorld);
  const d = alto / llena / (2 * Math.tan((fov * D2R) / 2));
  const lado = V3(0, 1, 0).cross(n).normalize();
  const p = c.clone().add(n.multiplyScalar(d)).addScaledVector(lado, -dx).add(V3(0, dy, 0));
  const m = c.clone().addScaledVector(lado, -dx * 0.4).add(V3(0, dy * 0.6, 0));
  return [p.x, p.y, p.z, m.x, m.y, m.z, fov];
}
// el monitor llenando el ancho del cuadro (alto equivalente: ancho / (1080/1920))
const camMon = (llenaAncho, fov, dx = 0, dy = 0) => camFrente(monitor, monitor.userData.centro, V3(0, 0, 1), MON.W / (1080 / 1920), llenaAncho, fov, dx, dy);
const CAM_P1 = (k) => [lerp(0.24, 0.22, k), 1.05, lerp(2.55, 2.35, k), 0.18, 1.3, -2.4, 64];
const CAM_P2 = (k) => [lerp(1.15, 1.1, k), 1.42, lerp(0.85, 0.72, k), 0.1, 1.34, RUB.z, 40];
const CAM_ESC = (k) => [1.2, lerp(0.32, 0.36, k), lerp(-7.0, -6.85, k), 1.2, -0.25, -3.7, 60];
const CAM_CAL = (k) => [CAL.x + 0.05, CAL.y - 0.05, lerp(-0.85, -0.95, k), CAL.x, CAL.y - 0.08, PARED, 44];
const CAM_DESK = (k) => [lerp(1.5, 1.45, k), 0.98, lerp(1.0, 0.9, k), 0.62, 0.78, -1.0, 50];
const CAM_P4 = (k) => [lerp(0.3, 0.28, k), 1.38, lerp(1.4, 1.3, k), -0.42, 1.22, RUB.z, 56];
const CAM_P5 = (k) => [1.3, 1.45, lerp(-0.05, -0.2, k), 1.3, 1.38, -2.4, 46];
const CAM_P5B = (k) => [0.82, 1.55, lerp(0.8, 0.65, k), 0.78, 1.45, -2.5, 50];
const CAM_PILA = (k) => [-0.36, 1.3, lerp(2.8, 2.65, k), -0.32, 1.3, 0.1, 58];
const CAM_GRUPO = (k) => [lerp(0.28, 0.24, k), 1.3, lerp(2.65, 2.5, k), 0.36, 1.3, -1.5, 56];
const CAM_P6 = (k) => [lerp(-0.6, -0.62, k), 1.3, lerp(2.3, 2.2, k), -0.55, 1.36, -0.8, 70];   // (r2) el remate llena la pantalla   // (r1) las dos pilas enteras + Rubén + los dos en la puerta
const CAM_P7A = (k) => [CELR0.x + 0.02, lerp(1.3, 1.25, k), CELR0.z + 0.3, CELR0.x, DESK.y, CELR0.z - 0.02, 34];
const CAM_P7B = (k) => [lerp(0.44, 0.42, k), 1.4, lerp(2.25, 2.1, k), 0.24, 1.36, -1.6, 64];   // (pulido) más cerca
const CAM_C = (k) => [lerp(-0.08, -0.1, k), 1.42, lerp(1.7, 1.6, k), -0.3, 1.14, RUB.z, 56];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, [[T.p2, ...CAM_P2(0)], [T.p3, ...CAM_P2(1)]]],
  ["P3a", T.p3, [[T.p3, ...camMon(0.86, 40, 0, 0)], [T.p3b, ...camMon(0.95, 40, 0, 0)]]],   // la planilla se abre
  ["P3b", T.p3b, [[T.p3b, ...CAM_ESC(0)], [T.p3c, ...CAM_ESC(1)]]],                       // la escalera, de noche
  ["P3c", T.p3c, [[T.p3c, ...CAM_CAL(0)], [T.p3d, ...CAM_CAL(1)]]],                       // el calendario cae 1 → 2
  ["P3d", T.p3d, [[T.p3d, ...CAM_DESK(0)], [T.p4, ...CAM_DESK(1)]]],                      // el termo vacío, la cinta
  ["P4", T.p4, [[T.p4, ...CAM_P4(0)], [T.p5, ...CAM_P4(1)]]],
  ["P5", T.p5, [[T.p5, ...CAM_P5(0)], [T.p5b, ...CAM_P5(1)]]],
  ["P5b", T.p5b, [[T.p5b, ...CAM_P5B(0)], [T.p6, ...CAM_P5B(1)]]],
  ["P6", T.p6, [[T.p6, ...CAM_P6(0)], [T.p7, ...CAM_P6(1)]]],
  ["P7a", T.p7, [[T.p7, ...CAM_P7A(0)], [T.p7b, ...CAM_P7A(1)]]],
  ["P7b", T.p7b, [[T.p7b, ...CAM_P7B(0)], [P1, ...CAM_P7B(1)]]],
  // ---- parte 2 ----
  ["Q1", T.q1, [[T.q1, ...CAM_P1(0)], [T.q1b, ...CAM_P1(1)]]],
  ["Q1b", T.q1b, [[T.q1b, ...CAM_P2(0)], [T.q2, ...CAM_P2(1)]]],
  ["Q2", T.q2, null],                                                                     // el celular de Nico a pantalla llena
  ["Q3", T.q3, [[T.q3, ...CAM_P5B(0)], [T.q3m, ...CAM_P5B(1)]]],
  ["Q3m", T.q3m, [[T.q3m, ...camMon(0.88, 40, 0, 0)], [T.q3b, ...camMon(0.97, 40, 0, 0)]]],
  ["Q3b", T.q3b, [[T.q3b, ...CAM_P6(0)], [T.q4, ...CAM_P6(1)]]],
  ["Q4", T.q4, [[T.q4, ...CAM_P7A(0)], [T.q4b, ...CAM_P7A(1)]]],
  ["Q4b", T.q4b, [[T.q4b, ...CAM_P7B(0)], [T.q4n, ...CAM_P7B(1)]]],
  ["Q4n", T.q4n, null],                                                                   // (r1) inserto del celular de Nico
  ["C", T.c, [[T.c, ...CAM_C(0)], [DUR, ...CAM_C(1)]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.28) { console.warn(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); } }

// ---------- Rubén, sentado detrás del escritorio (mira a +z; su derecha, -x, es el monitor) ----------
const R_Y = -0.08;
const deskW = (x, z, dy = 0.03) => V3(x, DESK.y + dy, z);
function poseRuben(per, t, pa, cp) {
  const pr = { x: RUB.x, y: R_Y, z: RUB.z + 0.04, giro: -0.12, sentado: 1, inclina: 0.06, cabeza: { giro: -0.35, asiente: 0.08, ladea: 0.02 }, ...CARA.neutra, ojos: { x: -0.3, y: -0.1, abiertos: 0.95, feliz: 0 }, cejas: { alto: 0.1, ang: 0 }, boca: { sonrisa: 0.15, abierta: 0, ancho: 1 }, dedoI: 0, dedoD: 0, t };
  pr.manoI = [0.24, 0.3, 0.34]; pr.codoI = [1, -0.5, -0.2]; pr.manoD = [-0.24, 0.3, 0.34]; pr.codoD = [-1, -0.5, -0.2];
  const manos = () => { per.raiz.updateMatrixWorld(true); };
  const mira = (k = 0.85) => haciaCam(cp, RUB.x, RUB.z, pr.giro, k, 0.9);
  if (pa === "P1" || pa === "Q1") {
    // tranquilo con la planilla (P1) / con el mate (Q1); gira un poco la cabeza a la puerta cuando Nico pregunta
    Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.35, y: -0.15, abiertos: 0.95, feliz: 0.2 }, cejas: { alto: 0.15, ang: 0 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1 } });
    const u = eio(sg(t, (pa === "P1" ? T.n1 : T.n1b) + 0.6, (pa === "P1" ? T.n1 : T.n1b) + 1.0));
    pr.cabeza = { giro: lerp(-0.4, 0.5, u), asiente: 0.08, ladea: 0.03 }; pr.ojos.x = lerp(-0.4, 0.6, u);
  } else if (pa === "P2" || pa === "Q1b") {
    if (pa === "P2") {
      // sin levantar la vista: se arremanga (la mano izquierda va al antebrazo derecho) · "Fácil. Tres por ciento…"
      Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.45, y: -0.2, abiertos: 0.9, feliz: 0.15 }, cejas: { alto: 0.2, ang: -0.05, asim: 0.4 }, boca: { sonrisa: 0.4, abierta: 0, ancho: 1 } });
      pr.cabeza = { giro: -0.45, asiente: 0.1, ladea: 0.02 };
      const u = Math.sin(Math.PI * sg(t, T.arremanga, T.arremanga + 0.7));
      pr.manoD = [-0.22, 0.32, 0.32]; pr.manoI = lerpV([0.24, 0.3, 0.34], [-0.12, 0.33, 0.36], u); pr.codoI = [1, -0.6, -0.1];
      if (t > T.r1 + CORTE.r1 - 0.1) { pr.cabeza.giro = lerp(-0.45, mira(0.6), eio(sg(t, T.r1 + CORTE.r1 - 0.1, T.r1 + CORTE.r1 + 0.3))); pr.ojos.x = 0; }
      bocaVoz(pr, t, T.r1, ENV.r1, 0.55);
    } else {
      // Q1b: el mate en la mano, sin mirar el monitor; señala con la bombilla
      Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.1, y: 0, abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.25, ang: 0, asim: 0.3 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 } });
      pr.cabeza = { giro: mira(0.7), asiente: 0.04, ladea: 0.04 };
      const u = eo(sg(t, T.r5 - 0.15, T.r5 + 0.2));
      pr.manoI = lerpV([0.2, 0.36, 0.34], [0.42, 0.58, 0.52], u);   // (pulido) señala claro con la bombilla pr.codoI = [1, -0.5, -0.2];
      bocaVoz(pr, t, T.r5, ENV.r5, 0.55);
    }
  } else if (pa === "P3a" || pa === "P3d" || pa === "P4") {
    // con ojeras, hundido en la silla; P4 golpea Enter con el índice
    Object.assign(pr, { ...CARA.resignado, ojos: { x: -0.4, y: -0.2, abiertos: 0.55, tension: 0.5 }, cejas: { alto: 0.1, ang: 0.6 }, boca: { sonrisa: -0.45, abierta: 0, ancho: 0.95 } });
    pr.inclina = 0.0; pr.y = R_Y - 0.04; pr.cabeza = { giro: -0.4, asiente: 0.16, ladea: -0.06 };
    if (pa === "P4") {
      const u = Math.sin(Math.PI * sg(t, T.enter - 0.18, T.enter + 0.06));
      pr.manoD = lerpV([-0.2, 0.32, 0.36], [-0.14, 0.26 - 0.02, 0.44], cl(u)); pr.dedoD = 1;
      if (t > T.r2 - 0.1) { pr.cabeza.giro = lerp(-0.4, mira(0.5), eio(sg(t, T.r2 - 0.1, T.r2 + 0.3))); pr.ojos.x = 0; }
      bocaVoz(pr, t, T.r2, ENV.r2, 0.5);
    }
  } else if (pa === "P5" || pa === "P5b") {
    Object.assign(pr, { ...CARA.resignado, ojos: { x: 0.6, y: 0.0, abiertos: 0.55, tension: 0.4 } });
  } else if (pa === "P6" || pa === "Q3b") {
    // P6: cara de nada, ojos entrecerrados (el remate seco) · Q3b: satisfecho, media sonrisa
    if (pa === "P6") Object.assign(pr, { ...NADA, ojos: { x: 0, y: 0, abiertos: 0.62, tension: 0.25 }, cejas: { alto: 0.0, ang: 0.2, asim: 0.4 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.9 } });
    else Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 0.92, feliz: 0.35 }, cejas: { alto: 0.2, ang: 0, asim: 0.35 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } });
    pr.giro = 0.05; pr.cabeza = { giro: mira(0.75), asiente: 0.03, ladea: 0.02 };
    if (pa === "P6") { const u = eio(sg(t, T.r3 - 0.05, T.r3 + 0.3)) * (1 - eio(sg(t, T.r3 + 0.5, T.r3 + 0.8))); pr.manoI = lerpV(pr.manoI, [0.05, 0.42, 0.4], u); pr.manoD = lerpV(pr.manoD, [-0.05, 0.42, 0.4], u); }   // la palmada seca
    bocaVoz(pr, t, pa === "P6" ? T.r3 : T.r6, pa === "P6" ? ENV.r3 : ENV.r6, 0.5);
  } else if (pa === "P7b" || pa === "Q4b") {
    if (pa === "P7b") {
      Object.assign(pr, { ...CARA.resignado, ojos: { x: -0.4, y: -0.1, abiertos: 0.5, tension: 0.5 }, cejas: { alto: 0.15, ang: 0.7 }, boca: { sonrisa: -0.5, abierta: 0, ancho: 0.95 } });
      pr.cabeza = { giro: -0.45, asiente: 0.1, ladea: -0.04 };
      if (t > T.r4 - 0.1) { pr.cabeza.giro = lerp(-0.45, 0.55, eio(sg(t, T.r4 - 0.1, T.r4 + 0.25))); pr.ojos.x = 0.5; }   // a Nico, sin ganas
      bocaVoz(pr, t, T.r4, ENV.r4, 0.5);
    } else {
      Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.4, y: -0.1, abiertos: 0.95, feliz: 0.25 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1 } });
      pr.cabeza = { giro: -0.45, asiente: 0.08, ladea: 0.03 };
      if (t > T.r7 - 0.15) { pr.cabeza.giro = lerp(-0.45, 0.55, eio(sg(t, T.r7 - 0.15, T.r7 + 0.15))); pr.ojos.x = 0.5; }
      bocaVoz(pr, t, T.r7, ENV.r7, 0.55);
    }
  } else if (pa === "C") {
    Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 0.95, feliz: 0.25, x: 0, y: 0.05 }, cejas: { alto: 0.2, ang: 0.0, asim: 0.25 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1.0 } });
    pr.giro = 0; pr.inclina = 0.08; pr.cabeza = { giro: mira(0.9), asiente: 0.0, ladea: 0.03 };
    pr.manoI = [0.2, 0.36, 0.36];
    bocaVoz(pr, t, T.r8, ENV.r8, 0.55);
  }
  manos();
  return pr;
}
// ---------- Nico (en la puerta / adentro) ----------
const NIC_P = { x: 1.2, z: PARED + 0.12, giro: -0.4 };       // asomado a la puerta
const NIC_A = { x: 1.02, z: PARED + 0.12, giro: -0.55 };        // (r1) se queda en la puerta (P6, P7b, Q3b, Q4b): no aparece de golpe adentro
function poseNico(t, pa, cp) {
  const enP = ["P1", "Q1", "P5", "P5b", "Q3", "Q2", "Q4n"].includes(pa);
  const B = enP ? NIC_P : NIC_A;
  const pr = { x: B.x, y: 0, z: B.z, giro: B.giro, inclina: 0.03, cabeza: { giro: haciaCam(cp, B.x, B.z, B.giro, 0.6, 0.7), asiente: 0.04, ladea: 0.03 }, ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.2 }, cejas: { alto: 0.35, ang: 0.2 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1 }, manoI: [0.14, 0.32, 0.3], codoI: [1, -0.6, -0.2], manoD: [-0.29, -0.08, 0.04], codoD: [-1, 0.2, -0.2], dedoI: 0, dedoD: 0, t };
  if (pa === "P1" || pa === "Q1") { pr.cabeza.giro = -0.45; pr.ojos.x = -0.4; bocaVoz(pr, t, pa === "P1" ? T.n1 : T.n1b, ENV.n1, 0.7); }
  if (pa === "P5") { Object.assign(pr, { ...CARA.incredula, ojos: { x: 0, y: 0, abiertos: 0.9 }, cejas: { alto: 0.55, ang: 0.45, asim: 0.5 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.9 } }); pr.giro = -0.1; pr.cabeza = { giro: haciaCam(cp, B.x, B.z, -0.1, 0.8), asiente: 0.0, ladea: -0.06 }; bocaVoz(pr, t, T.n2, ENV.n2, 0.7); }
  if (pa === "P5b") { Object.assign(pr, { ...CARA.incredula, ojos: { x: -0.7, y: 0.1, abiertos: 0.9 }, cejas: { alto: 0.5, ang: 0.4, asim: 0.6 } }); pr.cabeza = { giro: -0.2, asiente: 0, ladea: 0.1 }; }
  if (pa === "Q3") { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.5, y: 0.1, abiertos: 0.95, feliz: 0.3 } }); pr.cabeza = { giro: -0.2, asiente: 0, ladea: 0.06 }; }
  if (pa === "P6") { Object.assign(pr, { ...CARA.sorpresa, ojos: { x: -0.8, y: 0.5, abiertos: 1 }, cejas: { alto: 0.7, ang: 0.4 }, boca: { sonrisa: -0.1, abierta: 0.25, ancho: 0.8 } }); pr.cabeza = { giro: -0.5, asiente: -0.25, ladea: 0.04 }; }
  if (pa === "Q3b") { Object.assign(pr, { ...CARA.feliz, ojos: { x: -0.8, y: 0.4, abiertos: 0.95, feliz: 0.35 } }); pr.cabeza = { giro: -0.5, asiente: -0.2, ladea: 0.04 }; }
  if (pa === "P7b" || pa === "Q4b") { pr.x = 1.36; pr.giro = -0.3; }   // (pulido) más adentro del marco: no se superpone con el hombro de Rubén
  if (pa === "P7b") { Object.assign(pr, { ...CARA.incredula, ojos: { x: 0, y: -0.6, abiertos: 0.7 }, cejas: { alto: 0.3, ang: 0.6 }, boca: { sonrisa: -0.35, abierta: 0, ancho: 0.85 } }); pr.cabeza = { giro: -0.1, asiente: 0.3, ladea: 0.04 }; pr.manoI = [0.08, 0.34, 0.32]; pr.manoD = [-0.08, 0.34, 0.32]; }
  if (pa === "Q4b") { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: -0.6, abiertos: 0.95, feliz: 0.25 } }); pr.cabeza = { giro: -0.1, asiente: 0.3, ladea: 0.04 }; pr.manoI = [0.08, 0.34, 0.32]; pr.manoD = [-0.08, 0.34, 0.32]; }
  if (pa === "Q4n") { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 0.95, feliz: 0.35 }, cejas: { alto: 0.3, ang: 0, asim: 0.4 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1 } }); pr.giro = -0.1; pr.cabeza = { giro: haciaCam(cp, B.x, B.z, -0.1, 0.8), asiente: 0.02, ladea: 0.06 }; bocaVoz(pr, t, T.n5, ENV.n5, 0.7); }
  if (pa === "Q2") bocaVoz(pr, t, T.n3, ENV.n3, 0.7);
  return pr;
}
// ---------- Javi (detrás de Nico, en el descanso / adentro) ----------
const JAV_P = { x: 0.38, z: PARED - 0.5, giro: 0.35 };       // en el descanso, detrás del vidrio
const JAV_A = { x: 0.68, z: PARED - 0.2, giro: -0.3 };          // (r1) asomado detrás de Nico, en la puerta (P6, Q3b)
function poseJavi(t, pa, cp) {
  const enP = ["P1", "Q1", "P5b", "Q3"].includes(pa);
  const B = enP ? JAV_P : JAV_A;
  const pr = { x: B.x, y: 0, z: B.z, giro: B.giro, inclina: 0.03, cabeza: { giro: 0, asiente: 0.04, ladea: -0.03 }, ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.2 }, cejas: { alto: 0.3, ang: 0.1 }, boca: { sonrisa: 0.4, abierta: 0, ancho: 1 }, manoI: [0.29, -0.08, 0.04], codoI: [1, 0.2, -0.2], manoD: [-0.14, 0.32, 0.3], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  if (pa === "P1" || pa === "Q1") { pr.cabeza.giro = 0.2; pr.ojos = { x: 0.2, y: -0.4, abiertos: 0.95, feliz: 0.2 }; pr.cabeza.asiente = 0.2; }
  if (pa === "P5b" || pa === "Q3") {
    // se mete por el costado de Nico, el celular en alto (P5b) / se asoma desconfiado (Q3)
    const u = eo(sg(t, pa === "P5b" ? T.p5b : T.q3, (pa === "P5b" ? T.p5b : T.q3) + 0.3));
    pr.x = lerp(0.15, 0.48, u);   // (pulido) adentro de la oficina, a la izquierda de Nico: sin marco de puerta ni Nico delante de la cara
    pr.z = PARED + 0.35; pr.giro = -0.15;
    pr.cabeza = { giro: haciaCam(cp, pr.x, pr.z, pr.giro, 0.8), asiente: 0.02, ladea: -0.08 };
    if (pa === "P5b") { Object.assign(pr, { ...CARA.fastidio, ojos: { x: 0, y: 0, abiertos: 0.95, tension: -0.2 }, cejas: { alto: 0.1, ang: -0.35 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 1 } }); bocaVoz(pr, t, T.j1, ENV.j1, 0.75); }
    else { Object.assign(pr, { ...CARA.incredula, ojos: { x: 0, y: 0, abiertos: 0.85 }, cejas: { alto: 0.4, ang: 0.2, asim: -0.6 }, boca: { sonrisa: 0.1, abierta: 0, ancho: 0.9 } }); bocaVoz(pr, t, T.j2, ENV.j2, 0.75); }
  }
  if (pa === "P6") { Object.assign(pr, { ...CARA.sorpresa, ojos: { x: -0.8, y: 0.5, abiertos: 1 }, cejas: { alto: 0.7, ang: 0.3 }, boca: { sonrisa: -0.1, abierta: 0.2, ancho: 0.8 } }); pr.cabeza = { giro: -0.4, asiente: -0.25, ladea: -0.04 }; }
  if (pa === "Q3b") { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.8, y: 0.4, abiertos: 0.95, feliz: 0.3 } }); pr.cabeza = { giro: -0.4, asiente: -0.2, ladea: -0.04 }; }
  return pr;
}
// ---------- P3b: Nico y Javi dormidos en la escalera (de noche), sentados en el escalón 2 mirando a -z ----------
function poseDormido(t, quien) {
  const i = 2, y = -i * ESCA.sube - 0.5 + 0.04, z = DESC.z1 - (i - 0.5) * ESCA.pisada - 0.05;
  const x = quien === "n" ? ESCA.x0 + 0.26 : ESCA.x1 - 0.26;
  const s = quien === "n" ? 1 : -1;
  return { x, y, z, giro: Math.PI, sentado: 1, inclina: 0.12, ladea: -s * 0.06, cabeza: { giro: -s * 0.3, asiente: 0.35, ladea: -s * 0.3 }, ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 0.0 }, cejas: { alto: 0.1, ang: 0.4 }, boca: { sonrisa: -0.1, abierta: 0.15 + 0.08 * Math.sin(t * 9), ancho: 0.8 }, manoI: [0.18, 0.1, 0.35], manoD: [-0.18, 0.1, 0.35], codoI: [1, -0.4, 0], codoD: [-1, -0.4, 0], dedoI: 0, dedoD: 0, t };
}

// ================= RENDER =================
function celEnMano(cel, per, camPos, local, giro = 0) {
  per.raiz.updateMatrixWorld(true);
  const p = per.cuerpo.localToWorld(local.clone());
  cel.position.copy(p); cel.lookAt(camPos); cel.rotateZ(giro);
  return p;
}
const RELOJ = (t) => {
  // la hora en el reloj de pared (h decimal)
  if (t >= P2) return t >= T.c ? 8.08 : 8.0;
  if (t < T.p3) return 8.0; if (t < T.p3b) return 13.0; if (t < T.p3c) return 22.0; if (t < T.p7) return 19.0 + sg(t, T.p3d, T.p7) * 0.3; return 9.1;
};
function renderAt(tIn) {
  AVISOS.length = 0;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  const camPre = pl[2] ? catmull(pl[2], t) : null;
  const cp = camPre || CAM_P5(0);
  luzModo(pa === "P3b" ? "noche" : !parte2 && t >= T.p3c ? "tarde" : "manana");
  // ---- pantallas ----
  dibujarMon(t); dibujarN(t); dibujarJ(t); dibujarR(t);
  monitor.userData.pant.visible = !(pa === "P6" || pa === "Q3b");
  for (const f of TUBOS) f.visible = !(pa === "P6" || pa === "Q3b");   // (pulido) el tubo se leía como otra línea junto a EMPRESA   // (r2) el monitor apagado detrás de las pilas: sin astillas de texto
  // ---- el escritorio según el momento ----
  const dia2 = !parte2 && t >= T.p3c;
  talon.visible = !parte2;
  ponerCinta(parte2 ? 0.035 : t < T.p3 ? 0.035 : t < T.p3d ? lerp(0.035, 0.3, sg(t, T.p3, T.p3d)) : 1);
  // el termo: parado al lado del mate; en P3d se inclina sobre el mate y no sale nada (día 2, vacío)
  termo.position.set(0.68, DESK.y, -1.12); termo.rotation.set(0, 0.4, 0);
  mateM.position.set(dia2 ? 0.52 : 0.42, DESK.y, dia2 ? -0.82 : -1.02); mateM.rotation.set(0, -0.6, 0); mateM.visible = true;
  // (r2) sin la animación que tiraba el termo contra Rubén: el día 2 está acostado (vacío), lejos de él
  if (dia2) { termo.position.set(0.72, DESK.y + 0.06, -0.85); termo.rotation.set(0, 0.5, Math.PI / 2); }   // acostado: vacío
  if (["P5", "P5b", "Q3", "Q4n", "Q2"].includes(pa)) { termo.visible = false; mateM.visible = false; } else termo.visible = true;
  // el reloj
  const hr = RELOJ(t); agujaH.rotation.z = -((hr % 12) / 12) * Math.PI * 2; agujaM.rotation.z = -((hr % 1) * Math.PI * 2);
  // el calendario: 1 (parte 1 hasta cae2), cae a 2; cae a 3 en P7b; en la parte 2 siempre 1
  const caida = (hg, ti) => {
    const u = sg(t, ti, ti + 0.42);
    hg.visible = u < 1; if (u <= 0) { hg.position.set(0, CAL.H * 0.28, hg.userData.dz ?? hg.position.z); hg.rotation.set(0, 0, 0); return; }
    hg.rotation.set(-1.1 * eo(cl(u * 1.6)), 0, 0.5 * u); hg.position.y = CAL.H * 0.28 - 1.2 * u * u; hg.position.z = (hg.userData.dz ?? 0.02) + 0.35 * eo(u);
  };
  for (const hg of hojas) { if (hg.userData.dz === undefined) hg.userData.dz = hg.position.z; hg.visible = true; hg.position.set(0, CAL.H * 0.28, hg.userData.dz); hg.rotation.set(0, 0, 0); }
  if (!parte2) { caida(hojas[2], T.cae2); if (t >= T.cae2 + 0.42) caida(hojas[1], T.cae3); }
  // el celular de Rubén en el escritorio: vibra en P7a / Q4
  celR.visible = true; celR.position.copy(CELR0); celR.rotation.set(-Math.PI / 2, 0, 0.25);
  const vib = (a) => (t >= a && t < a + 1.0 ? Math.sin(t * 90) * 0.004 * (1 - sg(t, a + 0.6, a + 1.0)) : 0);
  celR.position.x += parte2 ? vib(T.vibra2) : vib(T.vibra);
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  celN.visible = false; celJ.visible = false; pizza.visible = false;
  const R = dia2 && t < P1 ? rubenO : ruben;
  if (pa !== "P3b" && pa !== "P3c" && pa !== "P5" && pa !== "Q2" && pa !== "Q4n") {
    R.raiz.visible = true; R.poner(poseRuben(R, t, pa, cp)); R.raiz.updateMatrixWorld(true);
  }
  // el mate en la mano de Rubén (Q1, Q1b, C) / en el escritorio
  if (["Q1", "Q1b", "C", "Q4b", "Q3b"].includes(pa) && R.raiz.visible) { R.brazos[0].mano.getWorldPosition(_w); mateM.position.copy(_w).add(V3(0, -0.07, 0)); mateM.rotation.set(0, R.raiz.rotation.y + Math.PI / 2, 0); }
  const conNico = ["P1", "Q1", "P5", "P5b", "Q3", "P6", "Q3b", "P7b", "Q4b", "Q4n"].includes(pa);
  if (conNico) { nico.raiz.visible = true; nico.poner(poseNico(t, pa, cp)); nico.raiz.updateMatrixWorld(true); }
  const conJavi = ["P1", "Q1", "P5b", "Q3", "P6", "Q3b", "P7b", "Q4b"].includes(pa);   // (r2) Javi también en P7b/Q4b (continuidad)
  if (conJavi) { javi.raiz.visible = true; javi.poner(poseJavi(t, pa, cp)); javi.raiz.updateMatrixWorld(true); }
  if (pa === "P3b") {
    nico.raiz.visible = javi.raiz.visible = true; nico.poner(poseDormido(t, "n")); javi.poner(poseDormido(t + 0.4, "j"));
    pizza.visible = true; pizza.position.set((ESCA.x0 + ESCA.x1) / 2, -3 * ESCA.sube, DESC.z1 - 2.5 * ESCA.pisada); pizza.rotation.set(0, 0.3, 0);
  }
  // los celulares en la mano: Nico (P1 lo tiene bajo; P5 y Q4n lo levanta a cámara), Javi (P5b en alto)
  const camP = V3(cp[0], cp[1], cp[2]);
  if (nico.raiz.visible && pa !== "P3b") {
    celN.visible = true;
    if (pa === "P5" || pa === "Q4n") {
      const ti = pa === "P5" ? T.p5 : T.q4n, u = eo(sg(t, ti, ti + 0.3));
      celN.scale.setScalar(lerp(1.2, 2.0, u)); celEnMano(celN, nico, camP, V3(lerp(0.1, 0.2, u), lerp(0.4, 0.5, u), lerp(0.3, 0.48, u)), 0.08);
      const pn = poseNico(t, pa, cp); pn.manoI = aCuerpo(nico, celN.position.clone().add(V3(0.0, -0.205 * celN.scale.x / 2.0, 0))); pn.codoI = [1, -0.6, -0.2]; nico.poner(pn);
    } else {
      celN.scale.setScalar(1.15); celEnMano(celN, nico, camP, ["P7b", "Q4b"].includes(pa) ? V3(0.02, 0.3, 0.24) : V3(0.1, 0.38, 0.32), 0);   // (pulido) en P7b/Q4b pegado al pecho: no estira el brazo hacia Rubén
      if (["P7b", "Q4b"].includes(pa)) { celN.lookAt(nico.cuerpo.localToWorld(V3(0.0, 1.2, 0.9))); }   // (pulido) inclinado hacia él pero se ve la pantalla
      const pn = poseNico(t, pa, cp); pn.manoI = aCuerpo(nico, celN.position.clone().add(V3(0, -0.08, 0))); nico.poner(pn);
    }
  }
  if (javi.raiz.visible && (pa === "P5b")) {
    celJ.visible = true; const u = eo(sg(t, T.p5b + 0.1, T.p5b + 0.4));
    celJ.scale.setScalar(lerp(1.2, 2.1, u)); celEnMano(celJ, javi, camP, V3(0.24, lerp(0.45, 0.6, u), 0.46), 0.08);   // (pulido) en la mano izquierda, entre él y Nico, a la altura del pecho
    const pj = poseJavi(t, pa, cp); pj.manoI = aCuerpo(javi, celJ.localToWorld(V3(0, -0.1, -0.02))); pj.codoI = [1, -0.4, -0.2]; pj.codoD = [-1, -0.4, -0.2]; javi.poner(pj);
  }
  // ---- las pilas (P6, Q3b) ----
  for (const c of [pilaE, ...PILA_V, cjHJ2]) c.visible = false;
  lineaRef.visible = false; igual.visible = false;
  if (pa === "P6" || pa === "Q3b") {
    const base = PILA.z;
    const cae = (g, x, y0, ti) => {
      g.visible = true; const u = sg(t, ti, ti + 0.2);
      const caeY = pa === "P6" ? (u < 1 ? 1.4 * (1 - u * u) : 0) : 0;
      const sq = pa === "P6" ? 1 - 0.08 * Math.sin(Math.PI * sg(t, ti + 0.2, ti + 0.34)) : 1;
      g.visible = pa === "Q3b" || t >= ti - 0.01;
      g.position.set(x, y0 + caeY, base); g.scale.set(1, sq, 1); g.rotation.set(0, 0, 0);
    };
    const hU = (c) => c.userData.hU * U;
    cae(pilaE, PILA.xE, hU(pilaE) / 2, T.cajas[0]);
    let y = 0;
    PILA_V.forEach((c, i) => { cae(c, PILA.xV, y + hU(c) / 2, T.cajas[i + 1]); y += hU(c); });
    if (pa === "Q3b") {
      // (r2) la roja de Nico se achata en su lugar (sin huecos ni cajas flotando: las de arriba bajan apoyadas) y la roja de
      // Javi gira sobre sí misma y, de canto, pasa a la kraft "Javi ✓" (sin cambio de golpe)
      const v = eio(sg(t, T.vuela, T.asienta));
      const hN = cjHN.userData.hU * U * (1 - v);
      cjHN.visible = v < 0.98; cjHN.scale.setScalar(Math.max(0.02, 1 - v));   // (pulido) se achica entera: el texto no se comprime
      cjHN.position.y = 15 * U + hN / 2;
      cjJavi.position.y = 15 * U + hN + 4 * U; cjHJ.position.y = 15 * U + hN + 8 * U + 2.5 * U;
      const g2 = sg(t, T.asienta, T.asienta + 0.3), giro = Math.PI * eio(g2);
      const caraB = giro > Math.PI / 2;
      cjHJ.visible = !caraB; cjHJ2.visible = caraB;
      const sz = 1 - 0.18 * Math.sin(Math.PI * g2); for (const c of [cjHJ, cjHJ2]) { c.position.set(PILA.xV, cjHJ.position.y, base); c.rotation.set(0, caraB ? giro - Math.PI : giro, 0); c.scale.set(sz, 1, sz); }
      igual.visible = t >= T.igual; if (igual.visible) { const s = bk(sg(t, T.igual, T.igual + 0.2)); igual.scale.setScalar(Math.max(0.01, s)); igual.position.set((PILA.xE + PILA.xV) / 2, 28 * U + 0.22, base + PILA.D / 2 + 0.05); }
    }
    lineaRef.visible = pa === "P6" ? t >= T.pasa : t < T.vuela;   // (pulido) en Q3b se va antes de que baje la roja de Javi
  }
  // ---- cámara ----
  if (pl[2]) { ponerCam(camPre, t); camera.updateMatrixWorld(true); }
  if (pa === "Q2") {
    // el celular de Nico a pantalla llena (con su mano): Nico en la puerta, el teléfono delante
    nico.raiz.visible = true; nico.poner(poseNico(t, "Q2", CAM_P5(0))); nico.raiz.updateMatrixWorld(true);
    celN.visible = true; celN.scale.setScalar(1.15); celEnMano(celN, nico, V3(...CAM_P5(0).slice(0, 3)), V3(0.08, 0.42, 0.34), 0);
    celN.updateMatrixWorld(true);
    camPantalla(celN, V3(0, 0.016, 0.0075), V3(0, 0, 1), 0.172 * 1.15, 0.66, 38, t, 0.02 * (1 - eo(sg(t, T.q2, T.q2 + 0.4))));
    nico.raiz.visible = false; R.raiz.visible = false;
  }
  if (pa === "Q4n") {
    // (r1) inserto del celular de Nico: lo da vuelta hacia Rubén y se lee la notificación (texto grande)
    nico.raiz.visible = true; nico.poner(poseNico(t, "Q4n", CAM_P5(0))); nico.raiz.updateMatrixWorld(true);
    celN.visible = true; celN.scale.setScalar(1.15); celEnMano(celN, nico, V3(...CAM_P5(0).slice(0, 3)), V3(0.08, 0.42, 0.34), 0);
    celN.updateMatrixWorld(true);
    camPantalla(celN, V3(0, 0.0, 0.0075), V3(0, 0, 1), 0.172 * 1.15, 0.66, 38, t, 0.0);
    celN.rotateY(1.4 * (1 - eo(sg(t, T.q4n, T.q4n + 0.3))));
    nico.raiz.visible = false; R.raiz.visible = false;
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  if (VERM === "portada") ponerCam(CAM_PORTADA, t, true);
  monitor.visible = hojas[0].parent.visible = VERM !== "portada";   // (pulido) la portada sin el monitor ni el calendario cortados en el borde
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);
  if (ruben.raiz.visible) bigoteSegunCamara(ruben); if (rubenO.raiz.visible) bigoteSegunCamara(rubenO);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROT_) ROT_[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const di = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) => { if (t >= ti - 0.04 && t < fin) hablar(GL[k], per, ent(ti - 0.04), orden, dx, minY, maxY, sobre); };
    const rot = (k, ti, cy, fin = 99, cx = 540) => { if (t >= ti && t < fin) ponerGlobo(ROT_[k], cx, cy, ent(ti), null, 3); };
    // remate en dos tiempos: la burbuja "a" con la primera mitad; la completa recién cuando suena la segunda (pop)
    const fase = (k, ti) => { const c = ti + CORTE[k]; return t < c ? [GL[k + "a"], ent(ti - 0.04)] : [GL[k], 0.75 + 0.25 * bk(sg(t, c, c + 0.18))]; };
    const di2 = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) => { if (t >= ti - 0.04 && t < fin) { const [g, e] = fase(k, ti); hablar(g, per, e, orden, dx, minY, maxY, sobre); } };
    // la burbuja fija (mismo lugar y tamaño en P6/Q3b y en P7b/Q4b: que se lea el callback)
    // (r1) anclada por el borde de abajo: la burbuja crece hacia arriba con el texto
    const fija = (g, e, cx, abajo, obj) => ponerGlobo(g, cx, abajo - g.userData.H / 2, e, obj && obj[0] > 40 && obj[0] < 1040 && obj[1] > 0 && obj[1] < 1900 ? obj : null, 1);
    if (pa === "P1") di("n1", nico, 0.0, T.p2, 1, 0, 470);
    if (pa === "P2") di2("r1", ruben, T.r1, T.p3, 1, 170, 250);   // (pulido) corrida: no tapa el calendario
    if (pa === "P3a") rot("remitos", T.rotRem, 1600, 99, 540);   // (r2) sin "Bar Walter": no llegaba a leerse
    if (pa === "P4") di("r2", rubenO, T.r2, T.p5, 1, 170, 250);
    if (pa === "P5") { di2("n2", nico, T.n2, T.p5b, 1, 0, 250); rot("cuenta", T.n2 + 0.5, 1740); }
    if (pa === "P5b") di("j1", javi, T.j1, T.p6, 1, 0, 250);
    if (pa === "P6" || pa === "Q3b") {
      const P6 = pa === "P6";
      if (P6 && t >= T.pasa) { cjHJ.updateMatrixWorld(true); const [gx, gy] = objPx(cjHJ, V3(PILA.W / 2, cjHJ.userData.hU * U / 2, PILA.D / 2)); const [rx, ry] = MAS_POS; rot("mas", T.pasa, ry, 99, rx); ponerGuia(GUIAS[0], rx, ry + 40, gx, gy, eo(sg(t, T.pasa, T.pasa + 0.2))); }   // (r2) cuando asienta la última caja, hasta el remate
      const ti = P6 ? T.r3 : T.r6, k = P6 ? "r3" : "r6";
      if (t >= ti - 0.04) { const [g, e] = fase(k, ti); const [mx, my] = aPx(bocaW(rubenO.raiz.visible ? rubenO : ruben)); fija(g, e, BUR6[0], BUR6[1], [mx, my]); }
    }
    if (pa === "P7a" || pa === "Q4") { const ti = pa === "P7a" ? T.g1 : T.g2; if (t >= ti - 0.04) fija(GL[pa === "P7a" ? "g1" : "g2"], ent(ti - 0.04), 540, BURG, objPx(celR, V3(0, 0.09, 0.01))); }
    if (pa === "P7b") { if (t >= T.r4 - 0.04) { const [g, e] = fase("r4", T.r4); fija(g, e, BUR7[0], BUR7[1], aPx(bocaW(R))); } }
    if (pa === "Q4b") { if (t >= T.r7 - 0.04) fija(GL.r7, ent(T.r7 - 0.04), BUR7[0], BUR7[1], aPx(bocaW(R))); rot("devol", T.devol + 0.1, 1730); }
    if (pa === "Q1") di("n1b", nico, T.n1b - 0.15, T.q1b, 1, 0, 470);
    if (pa === "Q1b") di("r5", ruben, T.r5, T.q2, 1, 0, 250);
    if (pa === "Q2") { if (t >= T.n3 - 0.04) { const [g, e] = fase("n3", T.n3); ponerGlobo(g, 540, 120 + g.userData.H / 2 + 40, e, null, 1); } rot("sola", T.cuentaFin, 1790); }
    if (pa === "Q3") di("j2", javi, T.j2, T.q3m, 1, 0, 250);
    if (pa === "Q3m") { rot("pedido", T.pedido + 0.1, 1640); if (t >= T.n4 - 0.04) { ponerGlobo(GL.n4, 540, 330, ent(T.n4 - 0.04), null, 1); GL.n4.userData.cola.visible = false; } }
    if (pa === "Q4n" && t >= T.n5 - 0.04) { const [g, e] = fase("n5", T.n5); ponerGlobo(g, 540, 120 + g.userData.H / 2 + 40, e, null, 1); }
  }
  renderer.render(scene, camera);
}
const MAS_POS = [800, 225];   // (r2) "+ $ 500.000" arriba a la derecha de la pila
const BUR6 = [830, 1600], BUR7 = [780, 640], BURG = 430;   // (r1) dónde van las burbujas fijas (abajo de la burbuja)
const CAM_PORTADA = [0.66, 1.08, 1.85, 0.66, 0.98, -1.7, 58];   // (r2) sin el monitor cortado
window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
