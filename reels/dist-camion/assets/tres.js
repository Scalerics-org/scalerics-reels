// Capa 3D de dist-camion (Three.js r170 local). Base técnica: reels/dist-quien-debe (utilidades, `fusionar`, pantalla
// partida con dos cámaras y una pasada para las burbujas, la rotisería de Graciela), reels/dist-comisiones (la oficina
// vidriada de Rubén con la puerta, el descanso y el depósito, pallets y racks), reels/dist-cartera (la cafetería de Marta),
// reels/dist-cliente-grande (la calle y el Súper Héctor), reels/ya-lo-cargo (el camión) y reels/importadora-dolar
// (tarjetas pegadas a la cámara, globos en dos tiempos, zona segura). renderAt(t) es una función pura del tiempo del
// timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   LA OFICINA VIDRIADA DE RUBÉN (origen, piso y = 0): Rubén sentado detrás del escritorio mirando a +z, el monitor a su
//     derecha, el celular en altavoz sobre el escritorio, el reloj en las 9:40; la puerta vidriada (Nico) y el depósito abajo.
//   LA ROTISERÍA DE GRACIELA (x = 40) · LA CAFETERÍA DE MARTA por dentro (x = 60)
//   LA CALLE (x = 100): el Súper Héctor (x local 0) y Cafetería Marta por fuera con la persiana (x local -9)
//   LA CABINA DEL CAMIÓN por dentro (x = 140), andando por la rambla
//   EL MUELLE DEL DEPÓSITO (x = 180), 18:00: el camión de culata, las cajas que vuelven, los remitos
//   PARTE 1: "Rubén, ¿por dónde viene el camión?" · "Está llegando." · el montaje de llamadas (Marta, Héctor; 7 → 12 → 19)
//            · el Ruso no atiende (maneja) · "Jefe, ¿dónde está el camión?" / "Llegando." / "¿Adónde?" / "Es un camión,
//            Nico. A algún lado llega." · 12:10 la persiana baja · 18:00 las 6 cajas vuelven, el remito de "un señor"
//   PARTE 2: el aviso con la ventana de entrega · "Al banco voy a la una." · el panel "Entregas de hoy" · la firma y la foto
//            en el celular · 18 de 18 · "¿Pasó algún señor?" / "Ni uno." · Rubén a cámara
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
const CALE = { x: -0.62, y: 1.99, W: 0.56, H: 0.72 };
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
  const cal = new THREE.Group(); cal.position.set(CALE.x, CALE.y, PARED + 0.01); OF.add(cal);
  cal.add(caja(CALE.W + 0.04, CALE.H + 0.04, 0.02, M.navy, 0, 0, 0.0, 0.01));
  const cabT = lienzo(620, 170, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "NOVIEMBRE", 900, 96, w - 60); x.fillText("NOVIEMBRE", w / 2, h / 2 + 4); });
  cal.add(plano(CALE.W, CALE.H * 0.22, cabT, 0, CALE.H * 0.39, 0.016, true));
  const hojaT = (n, rojo) => lienzo(620, 620, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, 14); x.fillStyle = rojo ? "#c7655b" : "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 470); x.fillText(String(n), w / 2, h / 2 + 30); });
  for (const [n, rojo, dz] of [[3, true, 0.012], [2, false, 0.016], [1, false, 0.02]]) { const hg = new THREE.Group(); hg.position.set(0, CALE.H * 0.28, dz); cal.add(hg); const pl = plano(CALE.W - 0.02, CALE.H * 0.76, hojaT(n, rojo), 0, -CALE.H * 0.38, 0, false); pl.material.side = THREE.DoubleSide; hg.add(pl); hg.userData.n = n; hojas.push(hg); }
  cal.add(mesh(new THREE.SphereGeometry(0.014, 8, 6), M.gris, 0, CALE.H / 2 + 0.03, 0.02));
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
fusionar(FUERA);
sombras(OF);
OF.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; o.receiveShadow = false; } });
// el reloj de pared: las 9:40 (parte 1 y 2: la misma mañana)
agujaH.rotation.z = -((9 + 40 / 60) / 12) * Math.PI * 2; agujaM.rotation.z = -(40 / 60) * Math.PI * 2;
// el celular de Rubén, acostado en el escritorio (en altavoz): pantalla para arriba
function crearCel(tex, funda, W = 0.085, H = 0.172) {
  const g = new THREE.Group();
  g.add(caja(W + 0.008, H + 0.008, 0.014, mat(funda, 0.5), 0, 0, 0, 0.012));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); p.position.z = 0.0075; g.add(p);
  g.userData = { W, H };
  return sombras(g);
}
const pantR = lienzo(600, 1215, () => {});
celR = crearCel(pantR, C.navy3); celR.scale.setScalar(1.3); scene.add(celR);
const CELR0 = V3(-0.66, DESK.y + 0.012, -0.64);
// ---- luces de la oficina: la mañana ----
const sol = new THREE.DirectionalLight(0xfff6e8, 1.6);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 3;
Object.assign(sol.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 1, far: 20 });
sol.position.set(-1.6, 5.2, 3.6); sol.target.position.set(0, 0.6, -1.2); scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xeef3f8, 0x5a5048, 1.85); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xe2eafa, 0.7); relleno.position.set(3, 3, 5); relleno.target.position.set(0, 1, -1); scene.add(relleno, relleno.target);
const luzDep = new THREE.HemisphereLight(0xe6edf5, 0x5a5048, 1.2); luzDep.position.set(0, -1, -10); scene.add(luzDep);
// =====================================================================================================
// LA ROTISERÍA DE GRACIELA (x = 40), de ya-lo-cargo: azulejo blanco con guarda verde, el mostrador con la vitrina, el
// spiedo con los pollos girando contra la pared del fondo, la pizarra. Graciela detrás del mostrador mirando a +z.
// =====================================================================================================
const ROT = new THREE.Group(); ROT.position.x = 40; scene.add(ROT);
const MOSTR = { x0: -1.6, x1: 1.8, y: 1.0, d: 0.7, z: -1.15 };
const GRA = { x: 40 + 0.45, z: -1.95 }, GRA_Y = 0.12;   // (r3) parada en un escalón detrás del mostrador: se le ve el pecho
let spiedoBarras = [];

let celGsoporte;
{
  const RD = 3.4;
  const azul = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#f4f4ef"; x.fillRect(0, 0, w, h); x.strokeStyle = "#cfd2cc"; x.lineWidth = 6; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 128); x.lineTo(w, i * 128); x.stroke(); } });
  azul.wrapS = azul.wrapT = THREE.RepeatWrapping;
  const pared = (w, h, x, y, z, ry) => { const tx = azul.clone(); tx.needsUpdate = true; tx.repeat.set(w / 0.5, h / 0.5); const p = mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.4 }), x, y, z); p.rotation.y = ry; p.castShadow = false; ROT.add(p); };
  pared(8, 3.1, 0, 1.55, -RD, 0); pared(RD + 3, 3.1, -3.4, 1.55, -RD / 2 + 1.5, Math.PI / 2); pared(RD + 3, 3.1, 3.4, 1.55, -RD / 2 + 1.5, -Math.PI / 2);
  ROT.add(caja(8, 0.12, 0.03, M.g, 0, 1.55, -RD + 0.02)); ROT.add(caja(0.03, 0.12, RD + 3, M.g, -3.38, 1.55, -RD / 2 + 1.5)); ROT.add(caja(0.03, 0.12, RD + 3, M.g, 3.38, 1.55, -RD / 2 + 1.5));
  const piso = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(6, 5);
  const p = mesh(new THREE.PlaneGeometry(8, RD + 3), new THREE.MeshStandardMaterial({ map: piso, roughness: 0.5 }), 0, 0.005, -RD / 2 + 1.5); p.rotation.x = -Math.PI / 2; p.castShadow = false; ROT.add(p);
  ROT.add(caja(8, 0.1, RD + 3, mat(0xe8e6da, 0.95), 0, 3.12, -RD / 2 + 1.5));
  // el mostrador navy3 con tapa de madera clara y la vitrina (milanesas, tarta, papas)
  const MW = MOSTR.x1 - MOSTR.x0, MC = (MOSTR.x0 + MOSTR.x1) / 2;
  ROT.add(caja(MW, MOSTR.y - 0.06, MOSTR.d, M.navy3, MC, (MOSTR.y - 0.06) / 2, MOSTR.z, 0.03));
  ROT.add(caja(MW + 0.1, 0.06, MOSTR.d + 0.08, mat(0xc89a64, 0.55), MC, MOSTR.y - 0.03, MOSTR.z, 0.02));
  ROT.add(caja(MW - 0.2, 0.06, 0.02, M.g, MC, 0.32, MOSTR.z + MOSTR.d / 2 + 0.005, 0.01));
  const vit = new THREE.Mesh(rbox(1.5, 0.36, MOSTR.d - 0.1, 0.02, 2), M.vidrio); vit.position.set(-0.8, MOSTR.y + 0.18, MOSTR.z); vit.renderOrder = 3; ROT.add(vit);
  ROT.add(caja(1.5, 0.03, MOSTR.d - 0.08, M.gris, -0.8, MOSTR.y + 0.37, MOSTR.z));
  const milanesa = mat(0xb9803e, 0.8), tarta = mat(0xd9a441, 0.7);
  for (let i = 0; i < 2; i++) {
    const bx = -1.15 + i * 0.7;
    ROT.add(caja(0.6, 0.03, 0.42, M.gris, bx, MOSTR.y + 0.02, MOSTR.z));
    if (i === 0) for (let k = 0; k < 3; k++) { const m = mesh(new THREE.SphereGeometry(0.1, 12, 8), milanesa, bx - 0.15 + k * 0.15, MOSTR.y + 0.05, MOSTR.z + (k % 2 ? 0.08 : -0.06)); m.scale.set(1.25, 0.22, 0.9); ROT.add(m); }
    else { ROT.add(mesh(new THREE.CylinderGeometry(0.2, 0.18, 0.08, 20), tarta, bx, MOSTR.y + 0.07, MOSTR.z)); ROT.add(mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.012, 20), mat(0x8a5a2c, 0.7), bx, MOSTR.y + 0.115, MOSTR.z)); }
  }
  // la pizarra navy con tiza crema (a la derecha, en la pared del fondo)
  const piz = lienzo(900, 600, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#c89a64"; x.lineWidth = 34; x.strokeRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = CAV(118); ["Pollo al spiedo", "Milanesa", "Tarta"].forEach((s, i) => x.fillText(s, w / 2, 170 + i * 150)); });
  ROT.add(plano(1.2, 0.8, piz, 1.6, 2.15, -RD + 0.03));
  // el spiedo contra la pared del fondo, detrás de Graciela a la izquierda: 3 barras con 3 pollos que giran, la llama
  const sp = new THREE.Group(); sp.position.set(-1.05, 0.95, -RD + 0.45); ROT.add(sp);
  const acero = mat(0xc9ccd2, 0.3, { metalness: 0.55 }), aceroOsc = mat(0x8a8e98, 0.4, { metalness: 0.5 });
  sp.add(caja(1.6, 0.9, 0.6, aceroOsc, 0, -0.45, 0));
  for (const s of [-1, 1]) sp.add(caja(0.08, 1.3, 0.62, acero, s * 0.78, 0.63, 0));
  sp.add(caja(1.64, 0.1, 0.64, acero, 0, 1.3, 0)); sp.add(caja(1.64, 0.06, 0.64, acero, 0, 0.0, 0));
  const vsp = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.2), M.vidrio); vsp.position.set(0, 0.64, 0.31); vsp.renderOrder = 3; sp.add(vsp);
  const brasas = lienzo(512, 384, (x, w, h) => { x.fillStyle = "#c46a3a"; x.fillRect(0, 0, w, h); x.fillStyle = "#e09a5a"; for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(i * 60 - 10, h); x.quadraticCurveTo(i * 60 + 20, h * 0.2, i * 60 + 50, h); x.fill(); } });
  const llama = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.05), new THREE.MeshBasicMaterial({ map: brasas, toneMapped: false })); llama.position.set(0, 0.64, -0.26); sp.add(llama);
  const doradoM = mat(0xc98a3a, 0.45), doradoO = mat(0xa86a2a, 0.5), hiloM = mat(C.cr, 0.8);
  for (let b = 0; b < 3; b++) {
    const barra = new THREE.Group(); barra.position.set(0, 0.28 + b * 0.36, 0.02); sp.add(barra); spiedoBarras.push(barra);
    barra.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.5, 8), acero).rotateZ(Math.PI / 2));
    for (let k = 0; k < 3; k++) {
      const pg = new THREE.Group(); pg.position.x = -0.46 + k * 0.46; barra.add(pg);
      const cu = mesh(new THREE.SphereGeometry(0.13, 18, 14), doradoM); cu.scale.set(1.0, 0.82, 0.86); pg.add(cu);
      const pe = mesh(new THREE.SphereGeometry(0.085, 14, 10), doradoM, 0.11, 0.02, 0.0); pe.scale.set(0.8, 0.75, 0.9); pg.add(pe);
      for (const s of [-1, 1]) { const mu = mesh(new THREE.SphereGeometry(0.055, 12, 8), doradoO, -0.05, -0.06, s * 0.08); mu.scale.set(1.4, 0.9, 0.9); pg.add(mu); }
      const hilo = mesh(new THREE.TorusGeometry(0.03, 0.007, 6, 14), hiloM, -0.17, -0.08, 0); hilo.rotation.y = Math.PI / 2; pg.add(hilo);
      pg.rotation.x = k * 1.3;
    }
  }
  // el celular de Graciela en un soporte sobre el mostrador (a su derecha): lo usa en altavoz y lee el recordatorio
  celGsoporte = new THREE.Group(); celGsoporte.position.set(1.05, MOSTR.y, MOSTR.z + 0.05); celGsoporte.rotation.y = Math.PI; ROT.add(celGsoporte);
  celGsoporte.add(caja(0.1, 0.02, 0.09, M.navy, 0, 0.01, 0, 0.005));
  const brazoS = caja(0.02, 0.1, 0.02, M.navy, 0, 0.06, -0.035, 0.004); brazoS.rotation.x = -0.35; celGsoporte.add(brazoS);
  // un frasco de chimichurri y la balanza (lado de Graciela)
  ROT.add(caja(0.36, 0.18, 0.32, M.navy3, 1.55, MOSTR.y + 0.09, MOSTR.z - 0.02, 0.04));
  ROT.add(caja(0.3, 0.03, 0.26, M.gris, 1.55, MOSTR.y + 0.2, MOSTR.z - 0.02, 0.02));
  // estante con bandejas de aluminio y bolsas kraft a la derecha
  ROT.add(caja(1.4, 0.04, 0.35, M.navy3, 1.6, 1.45, -RD + 0.2, 0.01));
  for (let i = 0; i < 5; i++) ROT.add(caja(0.18, 0.28, 0.12, M.kraft, 1.1 + i * 0.25, 1.61, -RD + 0.2, 0.01));
}
sombras(ROT);
ROT.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; o.receiveShadow = false; } });
const luzRot = new THREE.DirectionalLight(0xfff3e2, 1.6); luzRot.castShadow = true; luzRot.shadow.mapSize.set(2048, 2048); luzRot.shadow.bias = -0.0006; luzRot.shadow.radius = 3;
Object.assign(luzRot.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
luzRot.position.set(42, 6, 3); luzRot.target.position.set(40, 0.8, -1.5); scene.add(luzRot, luzRot.target);
const cieloRot = new THREE.HemisphereLight(0xf6f2ea, 0x6a6458, 1.7); scene.add(cieloRot);
// =====================================================================================================
// LA CAFETERÍA DE MARTA (x = 60): pared crema con azulejo navy claro a media altura, mostrador de madera con frente
// navy2, cafetera de dos grupos gris plano, molinillo, frasco de medialunas, pizarra navy con tiza crema; Marta detrás
// =====================================================================================================
const CAF = new THREE.Group(); CAF.position.x = 60; scene.add(CAF);
const MOS = { x0: -1.4, x1: 1.4, y: 1.0, d: 0.62, z: -1.0 };
const MAR = { x: 60 + 0.25, z: -1.75 }, MAR_Y = 0.1;
const pantMa = lienzo(600, 1215, () => {});
let soporteMa;
{
  const RD = 3.0;
  const piso = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#c4c1b2"; x.fillRect(i * 64, j * 64, 64, 64); } });
  piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(5, 4);
  const p = mesh(new THREE.PlaneGeometry(8, 6), new THREE.MeshStandardMaterial({ map: piso, roughness: 0.6 }), 0, 0.005, 0); p.rotation.x = -Math.PI / 2; p.castShadow = false; CAF.add(p);
  CAF.add(cajaS(8, 3.2, 0.2, mat(C.cr, 0.9), 0, 1.6, -RD));
  const az2 = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#2c4268"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); } for (let j = 0; j <= 4; j++) { x.beginPath(); x.moveTo(0, j * 64); x.lineTo(w, j * 64); x.stroke(); } });
  az2.wrapS = az2.wrapT = THREE.RepeatWrapping; az2.repeat.set(6, 2);
  CAF.add(plano(8, 1.3, az2, 0, 0.65, -RD + 0.11));
  CAF.add(cajaS(8, 0.06, 0.04, M.g, 0, 1.32, -RD + 0.12));
  for (const s of [-1, 1]) CAF.add(cajaS(0.2, 3.2, 6, mat(C.cr, 0.9), s * 3.6, 1.6, 0));
  // el mostrador
  const MW = MOS.x1 - MOS.x0;
  CAF.add(caja(MW, MOS.y - 0.06, MOS.d, M.navy2, 0, (MOS.y - 0.06) / 2, MOS.z, 0.03));
  CAF.add(caja(MW + 0.1, 0.06, MOS.d + 0.08, mat(0xc89a64, 0.55), 0, MOS.y - 0.03, MOS.z, 0.02));
  for (let i = 0; i < 6; i++) CAF.add(caja(0.02, MOS.y - 0.2, 0.01, M.navy3, MOS.x0 + 0.25 + i * 0.46, MOS.y / 2 - 0.05, MOS.z + MOS.d / 2 + 0.005, 0.003));
  // el frasco de medialunas (vidrio con tapa navy) y la bandeja
  const fr = new THREE.Group(); fr.position.set(-0.85, MOS.y, MOS.z + 0.05); CAF.add(fr);
  const vf = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.3, 24, 1, true), M.vidrio); vf.position.y = 0.15; vf.renderOrder = 3; fr.add(vf);
  fr.add(mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.03, 24), M.navy, 0, 0.31, 0)); fr.add(mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.012, 24), M.gris, 0, 0.006, 0));
  const med = mat(0xd9a45a, 0.6);
  for (let i = 0; i < 5; i++) { const m = mesh(new THREE.TorusGeometry(0.06, 0.028, 8, 14, Math.PI * 1.2), med, Math.cos(i * 1.3) * 0.06, 0.05 + Math.floor(i / 3) * 0.07, Math.sin(i * 1.3) * 0.06); m.rotation.set(Math.PI / 2, 0, i); fr.add(m); }
  // la cafetera de dos grupos (gris plano, frente navy) en la mesada del fondo y el molinillo
  CAF.add(caja(3.0, 0.9, 0.6, M.navy3, -0.3, 0.45, -RD + 0.42, 0.02)); CAF.add(caja(3.04, 0.05, 0.64, mat(0xc89a64, 0.55), -0.3, 0.92, -RD + 0.42, 0.01));
  const caf = new THREE.Group(); caf.position.set(-0.75, 0.95, -RD + 0.42); CAF.add(caf);
  caf.add(caja(0.7, 0.42, 0.45, mat(0xc9ccd2, 0.35, { metalness: 0.35 }), 0, 0.21, 0, 0.03));
  caf.add(caja(0.7, 0.1, 0.46, M.navy, 0, 0.36, 0.005, 0.02));
  for (const s of [-1, 1]) { caf.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.06, 14), M.navy, s * 0.16, 0.2, 0.25)); caf.add(caja(0.02, 0.012, 0.1, M.navy, s * 0.16, 0.19, 0.31, 0.004)); caf.add(mesh(new THREE.CylinderGeometry(0.04, 0.032, 0.06, 14), mat(C.cr, 0.4), s * 0.16, 0.03, 0.22)); }
  for (let i = 0; i < 4; i++) caf.add(mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.06, 12), mat(C.cr, 0.4), -0.24 + i * 0.16, 0.45, 0.0));
  const mol = new THREE.Group(); mol.position.set(-1.6, 0.95, -RD + 0.42); CAF.add(mol);
  mol.add(caja(0.18, 0.28, 0.2, M.navy, 0, 0.14, 0, 0.02)); { const tolva = mesh(new THREE.ConeGeometry(0.1, 0.22, 16, 1, true), mat(0x9a6b43, 0.5, { side: THREE.DoubleSide }), 0, 0.4, 0); tolva.rotation.x = Math.PI; mol.add(tolva); }
  // la pizarra navy con tiza crema
  const pz = lienzo(900, 600, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#c89a64"; x.lineWidth = 34; x.strokeRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = CAV(130); x.fillText("Café", w / 2, 200); x.fillText("Medialunas", w / 2, 380); x.fillStyle = "#5ce611"; x.font = CAV(90); x.fillText("Cafetería Marta", w / 2, 520); });
  CAF.add(plano(1.2, 0.8, pz, 2.6, 2.05, -RD + 0.12));
  // estante con tazas
  CAF.add(caja(1.6, 0.04, 0.25, M.navy3, -0.6, 1.95, -RD + 0.25, 0.01));
  for (let i = 0; i < 7; i++) CAF.add(mesh(new THREE.CylinderGeometry(0.045, 0.038, 0.09, 12), mat(i % 3 ? C.cr : C.g, 0.4), -1.25 + i * 0.21, 2.015, -RD + 0.25));
  // el soporte del celular de Marta sobre el mostrador (a su izquierda), en altavoz
  soporteMa = new THREE.Group(); soporteMa.position.set(0.62, MOS.y, MOS.z - 0.05); soporteMa.rotation.y = Math.PI - 0.35; CAF.add(soporteMa);
  soporteMa.add(caja(0.1, 0.02, 0.09, M.navy, 0, 0.01, 0, 0.005));
  const bs = caja(0.02, 0.1, 0.02, M.navy, 0, 0.06, -0.035, 0.004); bs.rotation.x = -0.35; soporteMa.add(bs);
}
sombras(CAF);
CAF.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; o.receiveShadow = false; } });
const luzCaf = new THREE.DirectionalLight(0xfff1de, 1.6); luzCaf.castShadow = true; luzCaf.shadow.mapSize.set(2048, 2048); luzCaf.shadow.bias = -0.0006; luzCaf.shadow.radius = 3;
Object.assign(luzCaf.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
luzCaf.position.set(62, 6, 3); luzCaf.target.position.set(60, 0.8, -1.2); scene.add(luzCaf, luzCaf.target);
const cieloCaf = new THREE.HemisphereLight(0xf6f2ea, 0x6a6458, 1.7); scene.add(cieloCaf);
// =====================================================================================================
// LA CALLE (x = 100): vereda de baldosas de 9 panes, el SÚPER HÉCTOR (de dist-cliente-grande, en x local 0) y CAFETERÍA
// MARTA (x local -9, con la persiana que baja); los vecinos; la calle hacia +z. El camión se estaciona en el cordón.
// =====================================================================================================
const CX = 100;
const CAL = new THREE.Group(); CAL.position.x = CX; scene.add(CAL);
const VER = 0.14;                                  // el alto de la vereda
const FZ = -3.0;                                   // el frente de las casas
const CAFX = -9;                                   // la cafetería (x local)
let persiana, cartelBanco, cartelBancoT;
{
  const calle = mesh(new THREE.PlaneGeometry(80, 14), M.asfalto, 0, 0, 6.5); calle.rotation.x = -Math.PI / 2; calle.castShadow = false; CAL.add(calle);
  for (let x = -38; x < 38; x += 3) { const r = mesh(new THREE.PlaneGeometry(1.4, 0.12), mat(0xe6e2cf, 0.8), x, 0.005, 6.4); r.rotation.x = -Math.PI / 2; r.castShadow = false; CAL.add(r); }
  const bal = lienzo(512, 512, (x, w, h) => {
    x.fillStyle = "#cfccc0"; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#b3b0a4"; x.lineWidth = 14; x.strokeRect(0, 0, w, h);
    x.lineWidth = 8; x.strokeStyle = "#bdbaae";
    for (let i = 1; i < 3; i++) { x.beginPath(); x.moveTo((i * w) / 3, 10); x.lineTo((i * w) / 3, h - 10); x.stroke(); x.beginPath(); x.moveTo(10, (i * h) / 3); x.lineTo(w - 10, (i * h) / 3); x.stroke(); }
  });
  bal.wrapS = bal.wrapT = THREE.RepeatWrapping; bal.repeat.set(80 / 0.6, 3 / 0.6);
  CAL.add(mesh(new THREE.BoxGeometry(80, VER, 3.0), [M.cr3, M.cr3, new THREE.MeshStandardMaterial({ map: bal, roughness: 0.85 }), M.cr3, M.cr3, M.cr3], 0, VER / 2, FZ / 2));
  CAL.add(caja(80, VER + 0.02, 0.2, mat(0xa9a69a, 0.8), 0, VER / 2, 0.05, 0.03));   // el cordón
  CAL.add(mesh(new THREE.BoxGeometry(80, VER, 3.0), mat(0xc4c1b5, 0.9), 0, VER / 2, 14.5));
  // los vecinos (casas bajas de colores de la paleta): menos en el lugar del súper y de la cafetería
  const colores = [0xd9d7c9, 0xb9cde0, 0xd8c9a8, 0xe6e3d4, 0x9fb3c9, 0xd9d7c9, 0xc9b99a];
  const vecinos = (z0, cara, libres) => {
    let i = 0;
    for (let x = -38; x < 38; i++) {
      const w = 5 + (i % 3) * 1.5, h = 3.6 + ((i * 7) % 4) * 0.7;
      const choca = libres.find(([a, b]) => x + w > a && x < b);
      if (choca) { x = choca[1]; continue; }
      const cx = x + w / 2, m = mat(colores[i % colores.length], 0.9);
      CAL.add(caja(w - 0.1, h, 3, m, cx, h / 2, z0 + cara * -1.5, 0.02));
      CAL.add(caja(w - 0.05, 0.25, 3.1, M.navy3, cx, h + 0.1, z0 + cara * -1.5, 0.02));
      const vm = mat(0x2c4268, 0.3);
      for (const dx of [-w / 4, w / 4]) CAL.add(caja(1.0, 1.2, 0.05, vm, cx + dx, 1.7, z0 + cara * 0.03, 0.01));
      CAL.add(caja(0.9, 2.1, 0.05, M.navy3, cx, 1.05, z0 + cara * 0.035, 0.01));
      x += w;
    }
  };
  vecinos(FZ, 1, [[-4.2, 4.2], [CAFX - 3.2, CAFX + 3.2]]); vecinos(16.0, -1, []);
  const copaG = new THREE.IcosahedronGeometry(1, 0);
  for (const [x, z] of [[-4.8, -0.55], [5.2, -0.55], [-13.8, -0.55], [14, -0.55], [-10, 14.0], [6, 14.0]]) {
    CAL.add(mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.6, 8), mat(0x6b4f3a, 0.9), x, 1.3, z));
    const c = mesh(copaG, M.hoja, x, 3.1, z); c.scale.set(1.15, 1.0, 1.15); CAL.add(c);
    const c2 = mesh(copaG, mat(0x5d8846, 0.85), x + 0.4, 3.6, z - 0.2); c2.scale.setScalar(0.75); CAL.add(c2);
  }
}
// ---- CAFETERÍA MARTA por fuera: pared crema, marco navy, letrero navy con letras crema, la persiana metálica (gris
// acanalada) que baja hasta el piso, el cartel a mano pegado con cinta ----
const CAFE = new THREE.Group(); CAFE.position.x = CAFX; CAL.add(CAFE);
{
  const pm = mat(C.cr, 0.88), W = 6, H = 4.4, Z = FZ - 0.15;
  CAFE.add(caja(W, H - 2.7, 0.3, pm, 0, VER + 2.7 + (H - 2.7) / 2, Z, 0.01));
  for (const s of [-1, 1]) CAFE.add(caja(0.5, 2.7, 0.3, pm, s * (W / 2 - 0.25), VER + 1.35, Z, 0.01));
  CAFE.add(caja(W - 1, 0.14, 0.4, M.navy, 0, VER + 2.62, Z + 0.05, 0.01));
  for (const s of [-1, 1]) CAFE.add(caja(0.12, 2.6, 0.36, M.navy, s * (W / 2 - 0.56), VER + 1.3, Z + 0.03, 0.01));
  // adentro (cuando la persiana está arriba): el mostrador y la pared en penumbra cálida
  CAFE.add(caja(W - 1.2, 2.5, 0.05, mat(0x6a5a48, 0.85), 0, VER + 1.25, Z - 1.4));
  CAFE.add(caja(3.0, 1.0, 0.5, M.navy2, 0.4, VER + 0.5, Z - 0.9, 0.02)); CAFE.add(caja(3.1, 0.05, 0.56, mat(0xc89a64, 0.55), 0.4, VER + 1.02, Z - 0.9, 0.01));
  // el letrero
  const lt = lienzo(1600, 300, (x, w, h) => {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#efeee5"; x.lineWidth = 16; x.strokeRect(12, 12, w - 24, h - 24);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "CAFETERÍA MARTA", 900, 170, w - 160); x.fillText("CAFETERÍA MARTA", w / 2, h / 2 + 8);
  });
  CAFE.add(caja(5.2, 0.92, 0.12, M.navy, 0, VER + 3.4, Z + 0.18, 0.02)); CAFE.add(plano(5.0, 0.82, lt, 0, VER + 3.4, Z + 0.25));
  // la persiana: lamas acanaladas grises (un lienzo con franjas y relieve), el cajón enrollado arriba
  const lamas = lienzo(512, 1024, (x, w, h) => { x.fillStyle = "#9aa3b0"; x.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 48) { x.fillStyle = "#7d8694"; x.fillRect(0, y, w, 10); x.fillStyle = "#b9c0ca"; x.fillRect(0, y + 12, w, 6); } x.fillStyle = "#6d7684"; x.fillRect(0, h - 40, w, 40); });
  persiana = new THREE.Group(); persiana.position.set(0, VER + 2.55, Z + 0.12); CAFE.add(persiana);
  const pl = new THREE.Mesh(new THREE.PlaneGeometry(W - 1.2, 2.55), new THREE.MeshStandardMaterial({ map: lamas, roughness: 0.5, metalness: 0.25 })); pl.position.y = -2.55 / 2; pl.receiveShadow = true; persiana.add(pl);
  persiana.userData.pl = pl;
  CAFE.add(caja(W - 1.0, 0.32, 0.36, mat(0x8d97a8, 0.5, { metalness: 0.2 }), 0, VER + 2.6, Z + 0.14, 0.1));
  // el cartel a mano (hoja crema, letra de marcador navy, dos tiras de cinta), pegado en la persiana
  cartelBancoT = lienzo(900, 640, (x, w, h) => {
    x.fillStyle = "#f6f3e6"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    x.font = CAV(150); x.fillText("Fui al banco.", w / 2, 190);
    x.font = CAV(104); x.fillText("¡No sabía a qué", w / 2, 380); x.fillText("hora venían!", w / 2, 500);
  });
  cartelBanco = new THREE.Group(); persiana.add(cartelBanco); cartelBanco.position.set(0.32, -1.12, 0.012); cartelBanco.rotation.z = 0.04;
  cartelBanco.add(plano(1.05, 0.75, cartelBancoT, 0, 0, 0));
  for (const s of [-1, 1]) { const ci = mesh(new THREE.PlaneGeometry(0.22, 0.07), mat(0xe2dcc4, 0.6, { transparent: true, opacity: 0.85 }), s * 0.42, 0.36, 0.004); ci.rotation.z = s * 0.5; ci.castShadow = false; cartelBanco.add(ci); }
}
// ---- EL SÚPER HÉCTOR: fachada navy3, dos vidrieras con góndolas, doble puerta de vidrio, persiana, toldo verde apagado,
// cartel crema "SÚPER HÉCTOR · AUTOSERVICIO" ----
const SUPER = new THREE.Group(); CAL.add(SUPER);
const PUERTA_S = { x0: -0.8, x1: 0.8, alto: 2.3 };
let hojasSuper = [], cartelSuper;
{
  const fm = mat(C.navy3, 0.8);
  const SW = 8, SH = 4.6;
  const tr = (x0, x1, y0, y1) => SUPER.add(caja(x1 - x0, y1 - y0, 0.3, fm, (x0 + x1) / 2, VER + (y0 + y1) / 2, FZ - 0.15, 0.01));
  tr(-SW / 2, -3.65, 0, SH); tr(3.65, SW / 2, 0, SH); tr(-1.05, -0.8, 0, SH); tr(0.8, 1.05, 0, SH);
  tr(-3.65, -1.05, 0, 0.55); tr(1.05, 3.65, 0, 0.55); tr(-3.65, 3.65, 2.35, SH);
  SUPER.add(caja(SW + 0.2, 0.3, 3.4, M.navy, 0, VER + SH + 0.15, FZ - 1.6, 0.02));
  // adentro: las góndolas (lienzo plano detrás del vidrio, con productos de colores planos)
  const gond = lienzo(1024, 512, (x, w, h) => {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h);
    const cols = ["#5ce611", "#c9a46b", "#efeee5", "#b9cde0", "#1f3254", "#d8c9a8", "#c7655b"];
    for (let k = 0; k < 4; k++) { const y = 70 + k * 110; x.fillStyle = "#1f3254"; x.fillRect(0, y + 70, w, 16);
      for (let i = 0; i < 26; i++) { x.fillStyle = cols[(i * 3 + k * 5) % cols.length]; const hh = 40 + ((i * 7 + k) % 3) * 14; x.fillRect(10 + i * 39, y + 70 - hh, 30, hh); } }
    x.fillStyle = "rgba(31,50,84,0.18)"; x.fillRect(0, 0, w, h);
  });
  for (const [x0, x1] of [[-3.65, -1.05], [1.05, 3.65], [-0.8, 0.8]]) {
    const p = plano(x1 - x0, x0 === -0.8 ? 2.3 : 1.8, gond, (x0 + x1) / 2, VER + (x0 === -0.8 ? 1.15 : 1.45), FZ - 0.7); SUPER.add(p);
    if (x0 !== -0.8) { const v = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, 1.8), M.vidrio); v.position.set((x0 + x1) / 2, VER + 1.45, FZ - 0.02); v.renderOrder = 3; SUPER.add(v); SUPER.add(caja(x1 - x0, 0.06, 0.08, M.navy, (x0 + x1) / 2, VER + 0.57, FZ, 0.01)); }
  }
  // el piso de adentro y las paredes del hueco de la puerta (que no se vea el vacío)
  const pa = mesh(new THREE.PlaneGeometry(8, 1.0), mat(0xd9d7c9, 0.8), 0, VER + 0.005, FZ - 0.5); pa.rotation.x = -Math.PI / 2; SUPER.add(pa);
  // la doble puerta de vidrio (dos hojas que se abren hacia adentro)
  for (const s of [-1, 1]) {
    const h = new THREE.Group(); h.position.set(s * 0.8, VER, FZ - 0.05); SUPER.add(h);
    h.add(caja(0.8, 2.28, 0.05, M.navy, -s * 0.4, 1.14, 0, 0.01));
    const vh = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 2.0), mat(0xb9cde0, 0.15, { transparent: true, opacity: 0.35 })); vh.position.set(-s * 0.4, 1.16, 0.03); vh.renderOrder = 4; h.add(vh);
    h.add(caja(0.04, 0.45, 0.06, M.gris, -s * 0.72, 1.05, 0.05, 0.01));
    h.userData.s = s; hojasSuper.push(h);
  }
  // la persiana enrollada arriba
  SUPER.add(caja(7.4, 0.24, 0.32, mat(0x8d97a8, 0.5, { metalness: 0.2 }), 0, VER + 2.48, FZ + 0.05, 0.08));
  // el toldo verde apagado liso (inclinado), con el faldón
  const toldo = caja(7.6, 0.04, 1.35, M.toldo, 0, VER + 2.72, FZ + 0.62, 0.01); toldo.rotation.x = 0.32; SUPER.add(toldo);
  SUPER.add(caja(7.6, 0.24, 0.03, M.toldo, 0, VER + 2.4, FZ + 1.27, 0.01));
  for (const s of [-1, 1]) { const b = mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.4, 6), M.navy, s * 3.7, VER + 2.68, FZ + 0.62); b.rotation.x = Math.PI / 2 - 0.32; SUPER.add(b); }
  // el cartel crema
  const cart = lienzo(1400, 260, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.strokeRect(8, 8, w - 16, h - 16);
    x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "SÚPER HÉCTOR", 900, 138, w - 140); x.fillText("SÚPER HÉCTOR", w / 2, h * 0.4); x.font = F(800, 66); x.fillStyle = "#3a5a2c"; x.fillText("AUTOSERVICIO", w / 2, h * 0.83);
  });
  const cp = plano(3.9, 0.72, cart, 0, VER + 3.85, FZ + 0.02); /* (r1) más angosto: entra entero en el plano general */ cp.material.emissive = new THREE.Color(0xffffff); cp.material.emissiveMap = cart; cp.material.emissiveIntensity = 0.2; cp.renderOrder = 2; SUPER.add(cp); cartelSuper = cp;
  // los cajones de fruta (kraft) con naranjas y peras, y la pila de canastos crema
  const naranja = mat(0xe08a3a, 0.6), pera = mat(0xd9c25a, 0.6), frutaG = new THREE.SphereGeometry(0.06, 10, 8);
  for (const [cx, fm2] of [[-2.85, naranja], [-2.25, pera]]) {
    const cj = new THREE.Group(); cj.position.set(cx, VER, FZ + 0.55); SUPER.add(cj);
    cj.add(caja(0.56, 0.08, 0.4, M.kraft, 0, 0.42, 0, 0.01)); for (const s of [-1, 1]) { cj.add(caja(0.56, 0.12, 0.02, M.kraft, 0, 0.5, s * 0.2, 0.005)); cj.add(caja(0.02, 0.12, 0.4, M.kraft, s * 0.28, 0.5, 0, 0.005)); }
    for (const s of [-1, 1]) for (const z of [-0.17, 0.17]) cj.add(caja(0.04, 0.42, 0.04, mat(0x6b4f3a, 0.8), s * 0.24, 0.21, z, 0.01));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) cj.add(mesh(frutaG, fm2, -0.2 + i * 0.13, 0.52 + ((i + j) % 2) * 0.03, -0.12 + j * 0.12));
  }
  for (let k = 0; k < 5; k++) { const c = new THREE.Group(); c.position.set(2.75, VER + k * 0.12, FZ + 0.45); c.rotation.y = 0.15 * (k % 2); SUPER.add(c); c.add(caja(0.5, 0.2, 0.34, mat(C.cr, 0.5), 0, 0.1, 0, 0.03)); for (const s of [-1, 1]) c.add(caja(0.02, 0.06, 0.12, M.navy3, s * 0.25, 0.2, 0, 0.005)); }
  sombras(SUPER);
  SUPER.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; o.receiveShadow = false; } });
}
fusionar(CAL, [SUPER, CAFE]);
fusionar(SUPER, [...hojasSuper, cartelSuper]);
sombras(CAFE); CAFE.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; o.receiveShadow = false; } });
const luzCal = new THREE.DirectionalLight(0xfff4e2, 1.8); luzCal.castShadow = true; luzCal.shadow.mapSize.set(2048, 2048); luzCal.shadow.bias = -0.0006; luzCal.shadow.radius = 3;
Object.assign(luzCal.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 40 });
luzCal.position.set(CX + 6, 12, 9); luzCal.target.position.set(CX - 3, 0.5, -1); scene.add(luzCal, luzCal.target);
const cieloCal = new THREE.HemisphereLight(0xeef3f8, 0x7a7466, 1.75); scene.add(cieloCal);

// =====================================================================================================
// EL CAMIÓN DE REPARTO DE LA DISTRIBUIDORA (base crearCamion de ya-lo-cargo): cabina navy3 con parabrisas y ventanillas,
// paragolpes y faros, la caja crema con la franja verde y el panel navy "DISTRIBUIDORA RUBÉN"; las dos hojas de atrás
// abren (puertasCam); la cola en z = 0, la cabina hacia +z. Sin marca de fabricante.
// =====================================================================================================
const CJ = { L: 5.2, W: 2.4, H: 2.4, piso: 1.15 };
const cajaKraftT = lienzo(512, 400, (x, w, h) => {
  x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.fillStyle = "#b8935a"; x.fillRect(0, 0, w, h * 0.07); x.fillRect(0, h * 0.93, w, h * 0.07);
  x.fillStyle = "#b8935a"; x.fillRect(w / 2 - 34, 0, 68, h);
  x.fillStyle = "#f6f3e6"; x.beginPath(); x.roundRect(60, 120, w - 120, 170, 16); x.fill(); x.strokeStyle = "#16243d"; x.lineWidth = 8; x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = CAV(120); x.fillText("MARTA", w / 2, 210);
});
const KRAFT_M = (() => { const k = mat(C.kraft, 0.85), f = new THREE.MeshStandardMaterial({ map: cajaKraftT, roughness: 0.85 }); return [k, k, k, k, f, k]; })();
const KRAFT_G = rbox(0.5, 0.38, 0.4, 0.015, 2);
const cajaMarta = () => { const m = new THREE.Mesh(KRAFT_G, KRAFT_M); m.castShadow = true; m.receiveShadow = true; return m; };
const ladoCamT = lienzo(1600, 320, (x, w, h) => {
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(0, 0, w, h, 40); x.fill();
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "DISTRIBUIDORA RUBÉN", 900, 170, w - 140); x.fillText("DISTRIBUIDORA RUBÉN", w / 2, h * 0.44);
  x.fillStyle = "#5ce611"; x.font = F(800, 64); x.fillText("MAYORISTA · REPARTO", w / 2, h * 0.84);
});
function crearCamion() {
  const g = new THREE.Group(), cue = mat(C.cr, 0.55), fr = M.navy3, vid = mat(0x8fb4d6, 0.12, { metalness: 0.2 });
  const { L, W: CW, H, piso } = CJ;
  // la caja: piso, paredes, techo, el frente; adentro, crema más oscuro
  g.add(caja(CW, 0.12, L, M.navy3, 0, piso - 0.06, L / 2));
  g.add(caja(0.08, H, L, cue, -CW / 2 + 0.04, piso + H / 2, L / 2, 0.02)); g.add(caja(0.08, H, L, cue, CW / 2 - 0.04, piso + H / 2, L / 2, 0.02));
  g.add(caja(CW, 0.08, L, cue, 0, piso + H - 0.04, L / 2, 0.02)); g.add(caja(CW, H, 0.08, cue, 0, piso + H / 2, L - 0.04, 0.02));
  for (const s of [-1, 1]) { const p = mesh(new THREE.PlaneGeometry(L - 0.12, H - 0.14), mat(0xcfccbd, 0.9), s * (CW / 2 - 0.085), piso + H / 2, L / 2); p.rotation.y = -s * Math.PI / 2; g.add(p); }
  g.add(mesh(new THREE.PlaneGeometry(CW - 0.18, H - 0.14), mat(0xc4c1b2, 0.9), 0, piso + H / 2, L - 0.085));
  { const p = mesh(new THREE.PlaneGeometry(CW - 0.16, L - 0.12), mat(0x8a6a4a, 0.85), 0, piso + 0.002, L / 2); p.rotation.x = -Math.PI / 2; g.add(p); }
  // la franja verde y el panel navy con el nombre (a los dos lados)
  for (const s of [-1, 1]) {
    g.add(caja(0.02, 0.16, L - 0.2, M.g, s * (CW / 2 + 0.005), piso + 0.32, L / 2, 0.01));
    const pn = plano(3.4, 0.68, ladoCamT, s * (CW / 2 + 0.012), piso + H * 0.6, L / 2 + 0.2); pn.rotation.y = s * Math.PI / 2; g.add(pn);
  }
  // el marco de atrás, el paragolpes, las luces traseras
  g.add(caja(CW + 0.06, 0.12, 0.12, fr, 0, piso + H, 0.02, 0.02)); for (const s of [-1, 1]) g.add(caja(0.12, H + 0.1, 0.12, fr, s * CW / 2, piso + H / 2, 0.02, 0.02));
  g.add(caja(CW + 0.1, 0.18, 0.2, M.navy, 0, piso - 0.2, 0.0, 0.03));
  for (const s of [-1, 1]) g.add(caja(0.22, 0.12, 0.04, M.red, s * (CW / 2 - 0.25), piso - 0.2, -0.11, 0.02));
  // las dos hojas de atrás (bisagras en los bordes): verde de marca por dentro no, crema con la manija navy
  const puertas = [-1, 1].map((s) => {
    const p = new THREE.Group(); p.position.set(s * CW / 2, piso, -0.04); g.add(p);
    p.add(caja(CW / 2 - 0.02, H - 0.04, 0.06, cue, -s * (CW / 4), H / 2, -0.03, 0.02));
    p.add(caja(0.04, H - 0.3, 0.03, M.navy3, -s * (CW / 2 - 0.12), H / 2, -0.07, 0.01));
    for (const y of [0.4, H - 0.4]) p.add(caja(0.1, 0.12, 0.05, M.navy, -s * 0.02, y, -0.06, 0.01));
    p.add(caja(CW / 2 - 0.1, 0.16, 0.02, M.g, -s * (CW / 4), 0.32, -0.065, 0.01));
    p.userData.s = s; return p;
  });
  // la cabina (navy3): el cuerpo, el capó corto, parabrisas y ventanillas, la parrilla, los faros, los espejos
  const CZ = L + 0.15;
  g.add(caja(CW, 1.6, 1.8, fr, 0, 1.75, CZ + 0.9, 0.16));
  g.add(caja(CW, 0.8, 0.5, fr, 0, 0.95, CZ + 1.9, 0.12));
  g.add(caja(CW - 0.3, 0.86, 0.04, vid, 0, 2.05, CZ + 1.81, 0.02));
  for (const s of [-1, 1]) { const v = caja(0.04, 0.7, 0.9, vid, s * (CW / 2 + 0.002), 2.08, CZ + 1.15, 0.02); g.add(v); }
  g.add(caja(CW - 0.5, 0.36, 0.04, M.navy, 0, 1.0, CZ + 2.16, 0.02));
  for (let i = 0; i < 4; i++) g.add(caja(CW - 0.6, 0.03, 0.02, M.navy2, 0, 0.88 + i * 0.08, CZ + 2.185, 0.005));
  for (const s of [-1, 1]) { g.add(caja(0.34, 0.18, 0.05, mat(0xf6f3e6, 0.3, { emissive: 0xf6f3e6, emissiveIntensity: 0.25 }), s * (CW / 2 - 0.3), 1.05, CZ + 2.17, 0.03)); }
  g.add(caja(CW + 0.1, 0.22, 0.18, M.navy, 0, 0.6, CZ + 2.18, 0.04));
  for (const s of [-1, 1]) { g.add(caja(0.05, 0.05, 0.36, M.navy, s * (CW / 2 + 0.14), 2.1, CZ + 1.75, 0.01)); g.add(caja(0.06, 0.34, 0.18, M.navy, s * (CW / 2 + 0.3), 2.1, CZ + 1.6, 0.03)); }
  // las ruedas (goma + llanta)
  for (const s of [-1, 1]) for (const z of [1.0, 2.15, CZ + 1.2]) { g.add(mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.36, 22), M.goma, s * (CW / 2 - 0.2), 0.5, z).rotateZ(Math.PI / 2)); g.add(mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.38, 14), M.gris, s * (CW / 2 - 0.2), 0.5, z).rotateZ(Math.PI / 2)); }
  for (const s of [-1, 1]) g.add(caja(0.3, 0.12, 0.6, M.navy, s * (CW / 2 - 0.05), 0.62, CZ + 0.4, 0.02));   // el escalón de la cabina
  // la carga: 6 cajas kraft "MARTA" al fondo de la caja (vuelven en P6b) y unas cajas sueltas más
  const carga = [];
  for (let i = 0; i < 6; i++) { const c = cajaMarta(); c.position.set(-0.55 + (i % 3) * 0.55, piso + 0.19 + Math.floor(i / 3) * 0.39, 0.6); c.rotation.y = Math.PI; g.add(c); carga.push(c); }
  g.userData = { puertas, carga };
  return sombras(g);
}
// la zorra del chofer (de dist-cliente-grande): dos ruedas, la pala, las cajas kraft
function crearZorra(n = 3) {
  const g = new THREE.Group(), gm = mat(0x8d97a8, 0.4, { metalness: 0.35 });
  for (const s of [-1, 1]) g.add(caja(0.04, 1.2, 0.04, gm, s * 0.2, 0.62, -0.02, 0.01));
  g.add(caja(0.44, 0.03, 0.04, gm, 0, 1.2, -0.02, 0.01)); g.add(caja(0.46, 0.02, 0.24, gm, 0, 0.03, 0.12, 0.005));
  for (const s of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16), M.goma, s * 0.25, 0.1, -0.05).rotateZ(Math.PI / 2));
  const cajas = [];
  for (let i = 0; i < n; i++) { const c = cajaMarta(); c.position.set(0, 0.23 + i * 0.39, 0.16); g.add(c); cajas.push(c); }
  g.userData.cajas = cajas;
  return sombras(g);
}

// =====================================================================================================
// LA CABINA POR DENTRO (x = 140), andando por la rambla: el tablero navy2, el volante, el parabrisas y la ventanilla del
// chofer (la rambla, el murallón crema, el agua y los faroles pasan); el portavasos de la consola con el celular del Ruso.
// Piso de la cabina y = 0; el chofer a la izquierda (x -0,45) mirando a -z; afuera el asfalto en y = -1,15.
// =====================================================================================================
const CBX = 140;
const CAB = new THREE.Group(); CAB.position.x = CBX; scene.add(CAB);
const RAMB = new THREE.Group(); CAB.add(RAMB);        // lo de afuera que pasa (se mueve en +z con el tiempo)
const RUSO_C = { x: -0.45, z: 0.12 };
const VOL = V3(-0.45, 1.06, -0.42);
let volante, portavasos;
{
  const tab = mat(0x2c4268, 0.6), tab2 = mat(0x24385c, 0.7), cuero = mat(0x34507a, 0.65);   // (r2) más claros: la cabina no queda negra
  CAB.add(caja(2.3, 0.08, 2.4, mat(0x24272d, 0.9), 0, -0.04, 0.0, 0.01));              // el piso de goma
  // el tablero: el cuerpo, la tapa inclinada, el visor del chofer, las rejillas
  CAB.add(caja(2.3, 0.5, 0.5, tab, 0, 0.78, -0.72, 0.05));
  { const tp = caja(2.3, 0.06, 0.42, tab2, 0, 1.06, -0.66, 0.02); tp.rotation.x = 0.18; CAB.add(tp); }
  CAB.add(caja(0.5, 0.14, 0.2, tab2, -0.45, 1.1, -0.62, 0.05));
  for (const x of [0.25, 0.75]) CAB.add(caja(0.2, 0.08, 0.02, M.navy, x, 0.92, -0.465, 0.01));
  // la columna y el volante (aro navy, rayos crema)
  CAB.add(mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.4, 10), M.navy, -0.45, 0.95, -0.55).rotateX(0.95));
  volante = new THREE.Group(); volante.position.copy(VOL); volante.rotation.x = -0.62; CAB.add(volante);
  volante.add(mesh(new THREE.TorusGeometry(0.2, 0.028, 10, 36), M.cr3, 0, 0, 0));
  for (const a of [0, 2.1, 4.2]) { const r = caja(0.03, 0.18, 0.02, M.cr2, 0, 0, 0, 0.008); r.position.set(Math.sin(a) * 0.09, -Math.cos(a) * 0.09, 0); r.rotation.z = a; volante.add(r); }
  volante.add(mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 16), M.navy3, 0, 0, 0.01).rotateX(Math.PI / 2));
  // el soporte del celular sobre el tablero (pinza navy, brazo corto)
  CAB.add(caja(0.11, 0.03, 0.05, M.navy, -0.02, 1.18, -0.62, 0.01)); { const b = caja(0.025, 0.12, 0.025, M.navy, -0.02, 1.13, -0.66, 0.006); b.rotation.x = 0.5; CAB.add(b); }
  // la consola del medio con el portavasos (aro navy) y la palanca
  CAB.add(caja(0.34, 0.55, 0.7, tab, 0.1, 0.28, -0.25, 0.04));
  portavasos = new THREE.Group(); portavasos.position.set(0.1, 0.56, -0.38); CAB.add(portavasos);
  portavasos.add(mesh(new THREE.TorusGeometry(0.055, 0.014, 8, 20), M.navy, 0, 0.0, 0).rotateX(Math.PI / 2));
  portavasos.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16), mat(0x101826, 0.8), 0, -0.01, 0));
  CAB.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8), M.navy, 0.12, 0.66, -0.05).rotateX(-0.3)); CAB.add(mesh(new THREE.SphereGeometry(0.045, 12, 10), M.navy3, 0.12, 0.79, -0.01));
  // los asientos (chofer y acompañante): almohadón y respaldo cuero navy
  for (const x of [-0.45, 0.62]) { CAB.add(caja(0.52, 0.12, 0.5, cuero, x, 0.48, 0.2, 0.05)); CAB.add(caja(0.52, 0.8, 0.12, cuero, x, 0.92, 0.48, 0.06)); CAB.add(caja(0.34, 0.18, 0.1, cuero, x, 1.42, 0.5, 0.05)); CAB.add(caja(0.35, 0.42, 0.4, mat(0x24272d, 0.8), x, 0.21, 0.2, 0.03)); }
  // el parabrisas (marco navy, vidrio casi invisible), el techo, la ventanilla del chofer (marco) y la puerta
  const marco = M.navy;
  CAB.add(caja(2.3, 0.1, 0.12, marco, 0, 1.12, -0.86, 0.02)); CAB.add(caja(2.3, 0.14, 0.12, marco, 0, 1.94, -0.9, 0.02));
  for (const s of [-1, 1]) CAB.add(caja(0.12, 0.86, 0.12, marco, s * 1.1, 1.53, -0.88, 0.02));
  CAB.add(caja(2.3, 0.08, 1.5, mat(0x2a3448, 0.85), 0, 2.0, -0.15, 0.02));
  // la puerta del chofer (x = -1.15): el panel de abajo, el marco de la ventanilla, el apoyabrazos
  CAB.add(caja(0.08, 1.05, 1.4, tab, -1.15, 0.6, -0.15, 0.02));
  CAB.add(caja(0.1, 0.06, 1.4, marco, -1.15, 1.12, -0.15, 0.01)); CAB.add(caja(0.1, 0.06, 1.4, marco, -1.15, 1.92, -0.15, 0.01));
  CAB.add(caja(0.1, 0.86, 0.1, marco, -1.15, 1.52, 0.52, 0.01));
  CAB.add(caja(0.12, 0.07, 0.6, cuero, -1.08, 0.88, -0.05, 0.02));
  CAB.add(caja(0.08, 1.95, 1.4, tab, 1.15, 0.97, -0.15, 0.02));
  // los remitos sueltos sobre el tablero (papel crema, sujetos con un broche navy)
  for (let i = 0; i < 4; i++) { const p = caja(0.2, 0.004, 0.27, mat(0xf0ecdc, 0.85), 0.55 + i * 0.03, 1.115 + i * 0.004, -0.66 - i * 0.01, 0.002); p.rotation.set(0.18, 0.2 * i - 0.2, 0); CAB.add(p); }
  CAB.add(caja(0.08, 0.02, 0.04, M.navy, 0.58, 1.13, -0.56, 0.005));
  sombras(CAB);
  // AFUERA: el asfalto con la raya, el murallón de la rambla y el agua a la izquierda, los faroles; edificios a la derecha
  const Y = -1.15;
  const asf = mesh(new THREE.PlaneGeometry(14, 300), M.asfalto, 0.8, Y, -100); asf.rotation.x = -Math.PI / 2; asf.castShadow = false; CAB.add(asf);
  const vereda = mesh(new THREE.BoxGeometry(3, 0.16, 300), mat(0xcfccc0, 0.85), -6.6, Y + 0.08, -100); CAB.add(vereda);
  CAB.add(mesh(new THREE.BoxGeometry(0.5, 0.75, 300), mat(C.cr, 0.85), -8.3, Y + 0.38, -100));      // el murallón crema
  const agua = mesh(new THREE.PlaneGeometry(200, 400), mat(0x5a7fa6, 0.35), -110, Y - 0.6, -100); agua.rotation.x = -Math.PI / 2; agua.castShadow = agua.receiveShadow = false; CAB.add(agua);
  const veredaD = mesh(new THREE.BoxGeometry(3, 0.16, 300), mat(0xc4c1b5, 0.9), 8.6, Y + 0.08, -100); CAB.add(veredaD);
  // lo que se repite y pasa: las rayas, los faroles, los edificios
  for (let k = 0; k < 20; k++) {
    const r = mesh(new THREE.PlaneGeometry(0.14, 2.2), mat(0xe6e2cf, 0.8), 0.9, Y + 0.004, -k * 6); r.rotation.x = -Math.PI / 2; r.castShadow = false; RAMB.add(r);
  }
  for (let k = 0; k < 12; k++) {
    const f = new THREE.Group(); f.position.set(-7.4, Y, -k * 10); RAMB.add(f);
    f.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 4.2, 8), M.navy3, 0, 2.1, 0));
    f.add(caja(0.9, 0.08, 0.12, M.navy3, 0.4, 4.15, 0, 0.02)); f.add(caja(0.3, 0.08, 0.16, mat(C.cr, 0.4), 0.78, 4.08, 0, 0.02));
  }
  const colores = [0xd9d7c9, 0xb9cde0, 0xd8c9a8, 0xe6e3d4, 0x9fb3c9, 0xefeee5];
  for (let k = 0; k < 16; k++) { const h = 9 + ((k % 8) * 7) % 4 * 3; RAMB.add(caja(6.6, h, 6.6, mat(colores[k % 8 % 6], 0.9), 15, Y + h / 2, -k * 7.5, 0.05)); for (let j = 1; j < h / 3; j++) RAMB.add(caja(5.2, 0.5, 0.1, mat(0x2c4268, 0.3), 15, Y + j * 3, -k * 7.5 + 3.32, 0.02)); }
  RAMB.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
}
// el camino de la rambla corre: todo lo que se repite tiene un paso que divide 60 m (rayas 6, faroles 10, edificios 7,5) y
// cubre 120 m: el corrimiento vuelve a 0 cada 60 m sin que se note
function moverRambla(t) { RAMB.position.z = (t * 11) % 60; }
const luzCab = new THREE.DirectionalLight(0xfff4e2, 1.5); luzCab.castShadow = true; luzCab.shadow.mapSize.set(1024, 1024); luzCab.shadow.bias = -0.0008;
Object.assign(luzCab.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2, near: 1, far: 15 });
luzCab.position.set(CBX - 3, 5, -3); luzCab.target.position.set(CBX, 0.8, 0); scene.add(luzCab, luzCab.target);
const cieloCab = new THREE.HemisphereLight(0xf0f4f8, 0x8a8478, 2.6); scene.add(cieloCab);
// =====================================================================================================
// EL MUELLE DEL DEPÓSITO (x = 180), 18:00: piso de hormigón con líneas crema, la pared navy claro con el portón abierto
// (adentro, los racks), el cartel DISTRIBUIDORA RUBÉN; el camión entra de culata hacia la pared (la cola en z = MZ0)
// =====================================================================================================
const MX = 180;
const MUE = new THREE.Group(); MUE.position.x = MX; scene.add(MUE);
const MZ0 = -2.2;                                   // la cola del camión
let fajo, remitoG, remitoT;
{
  const piso = mesh(new THREE.PlaneGeometry(30, 22), mat(0xa8a499, 0.92), 0, 0, 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; MUE.add(piso);
  for (const x of [-1.5, 1.5]) { const l = mesh(new THREE.PlaneGeometry(0.12, 9), mat(0xe9e4cf, 0.8), x, 0.004, 1.5); l.rotation.x = -Math.PI / 2; l.castShadow = false; MUE.add(l); }
  const paredM = mat(0x34507a, 0.92);
  MUE.add(cajaS(4.6, 6, 0.3, paredM, -6.0, 3, -4.0)); MUE.add(cajaS(8.6, 6, 0.3, paredM, 5.0, 3, -4.0)); MUE.add(cajaS(4.0, 2.2, 0.3, paredM, -1.7, 4.9, -4.0));
  // el portón abierto (marco navy3, la cortina enrollada arriba) y adentro el depósito: racks con pallets, luz pareja
  for (const s of [-1, 1]) MUE.add(caja(0.2, 3.9, 0.36, M.navy3, -1.7 + s * 2.0, 1.95, -3.85, 0.01));
  MUE.add(caja(4.2, 0.4, 0.5, mat(0x2a3b58, 0.8), -1.7, 3.85, -3.8, 0.03));
  MUE.add(mesh(new THREE.PlaneGeometry(14, 10), mat(0x8d939c, 0.92), -1.7, 0.002, -9).rotateX(-Math.PI / 2));
  MUE.add(cajaS(14, 7, 0.3, paredM, -1.7, 3.5, -14));
  semilla = 41;
  for (const [x, z] of [[-4.2, -7.5], [0.8, -7.5], [-1.7, -11.5]]) { const r = crearRack(4.0, 3); r.position.set(x, 0, z); MUE.add(r); }
  // el cartel de la distribuidora (crema sobre navy, borde verde) arriba a la derecha del portón
  const cT = lienzo(1400, 260, (x, w, h) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "DISTRIBUIDORA RUBÉN", 900, 130, w - 120); x.fillText("DISTRIBUIDORA RUBÉN", w / 2, h / 2 + 6); });
  // el topes de goma del muelle y una pila de pallets vacíos contra la pared
  for (const x of [-0.9, 0.9]) MUE.add(caja(0.3, 0.4, 0.18, M.goma, x, 1.2, -3.78, 0.03));
  for (let k = 0; k < 4; k++) { const p = crearPallet(); p.position.set(4.6, k * 0.15, -3.1); MUE.add(p); }
  // un tacho navy y un matafuegos (rojo apagado) en la pared
  MUE.add(mesh(new THREE.CylinderGeometry(0.28, 0.25, 0.8, 16), M.navy3, 6.2, 0.4, -3.4));
  MUE.add(mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.5, 12), M.red, 3.4, 1.0, -3.76)); MUE.add(caja(0.26, 0.04, 0.14, M.navy, 3.4, 1.3, -3.8, 0.01));
}
fusionar(MUE);
// el fajo de remitos arrugados (papel crema, bordes doblados; vértices desplazados con semilla fija) y el remito del inserto
function hojaArrugada(w, h, tex, sem, k = 1) {
  const g = new THREE.PlaneGeometry(w, h, 14, 18), p = g.attributes.position;
  semilla = sem;
  const ondas = Array.from({ length: 5 }, () => [az() * 6 + 2, az() * 6 + 2, az() * 6.28, (az() - 0.3) * 0.012 * k]);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i); let z = 0;
    for (const [a, b, f, amp] of ondas) z += amp * Math.sin((x / w) * a * 3.1 + f) * Math.cos((y / h) * b * 3.1 + f * 0.5);
    z += 0.01 * k * Math.pow(Math.abs(x / w) * 2, 3) * (az() > 0.5 ? 1 : -1) * 0.5;
    p.setZ(i, z);
  }
  g.computeVertexNormals();
  return new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, side: THREE.DoubleSide }));
}
remitoT = lienzo(800, 1060, (x, w, h) => {
  x.fillStyle = "#f4f0e0"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.textAlign = "left";
  x.font = F(900, 66); x.fillText("REMITO", 40, 60); x.font = F(700, 36); x.fillText("Distribuidora Rubén", 40, 118);
  x.fillStyle = "#0b1220"; x.font = F(800, 50); x.fillText("Súper Héctor", 40, 225);
  x.strokeStyle = "#b4b2a3"; x.lineWidth = 4; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(40, 312 + i * 90); x.lineTo(w - 40, 312 + i * 90); x.stroke(); }
  x.fillStyle = "#1f3254"; x.font = F(600, 36); [["Aceite 1,5 L · 12 cajas", "38.400"], ["Harina 25 kg · 10 bolsas", "30.000"], ["Yerba 1 kg · 6 fardos", "18.000"]].forEach(([s, m], i) => { x.font = F(700, 40); x.textAlign = "left"; x.fillText(s, 44, 275 + i * 90); x.textAlign = "right"; x.font = F(800, 40); x.fillText(m, w - 44, 275 + i * 90); }); x.textAlign = "left";
  x.fillStyle = "#0b1220"; x.font = F(900, 74); x.textAlign = "right"; x.fillText("$ 86.400", w - 40, 680); x.textAlign = "left"; x.font = F(700, 40); x.fillText("Total", 44, 680);
  x.font = F(800, 50); x.fillText("Recibió:", 44, 860);
  // el garabato (la firma de "un señor") y la mancha de grasa
  x.strokeStyle = "#1f3254"; x.lineWidth = 7; x.lineCap = "round"; x.beginPath(); x.moveTo(270, 880);
  for (let i = 0; i < 14; i++) x.quadraticCurveTo(290 + i * 22, 820 + (i % 2) * 90, 300 + i * 22 + 11, 860 + ((i * 37) % 30));
  x.stroke();
  x.fillStyle = "#c7655b"; x.font = F(900, 110); x.fillText("¿?", 600, 860);
  const gr = x.createRadialGradient(610, 420, 10, 610, 420, 150); gr.addColorStop(0, "rgba(110,80,40,0.55)"); gr.addColorStop(0.7, "rgba(120,90,50,0.3)"); gr.addColorStop(1, "rgba(120,90,50,0)");
  x.fillStyle = gr; x.beginPath(); x.ellipse(610, 420, 150, 110, 0.4, 0, 7); x.fill();
  x.fillStyle = "rgba(90,70,40,0.25)"; x.beginPath(); x.arc(160, 980, 40, 0, 7); x.fill();
});
const remitoLisoT = lienzo(400, 530, (x, w, h) => { x.fillStyle = "#f4f0e0"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 70); x.strokeStyle = "#b4b2a3"; x.lineWidth = 4; for (let i = 0; i < 7; i++) { x.beginPath(); x.moveTo(20, 130 + i * 50); x.lineTo(w - 20, 130 + i * 50); x.stroke(); } x.fillStyle = "rgba(110,80,40,0.25)"; x.beginPath(); x.arc(280, 300, 60, 0, 7); x.fill(); });
fajo = new THREE.Group(); scene.add(fajo);
for (let i = 0; i < 6; i++) { const h = hojaArrugada(0.21, 0.28, remitoLisoT, 50 + i, 1.4); h.position.set((i % 2 ? 0.012 : -0.01) * i, 0, -i * 0.006); h.rotation.z = (i - 2.5) * 0.12; h.castShadow = true; fajo.add(h); }
remitoG = new THREE.Group(); scene.add(remitoG);
{ const h = hojaArrugada(0.21, 0.28, remitoT, 77, 1.0); remitoG.add(h); remitoG.userData.hoja = h; }

const luzMue = new THREE.DirectionalLight(0xffd9a8, 1.9); luzMue.castShadow = true; luzMue.shadow.mapSize.set(2048, 2048); luzMue.shadow.bias = -0.0006; luzMue.shadow.radius = 3;
Object.assign(luzMue.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 });
luzMue.position.set(MX + 7, 6, 6); luzMue.target.position.set(MX, 0.8, -1); scene.add(luzMue, luzMue.target);
const cieloMue = new THREE.HemisphereLight(0xf6e6cf, 0x5a4a3a, 1.75); scene.add(cieloMue);

// el camión (uno solo: va a la calle de la cafetería, a la del súper o al muelle según el plano)
const camion = crearCamion(); scene.add(camion);
const puertasCam = camion.userData.puertas, cargaCam = camion.userData.carga;
function ponerPuertas(a) { for (const p of puertasCam) p.rotation.y = p.userData.s * -a; }
const zorra = crearZorra(3); scene.add(zorra);
// las 6 cajas que vuelven (P6b): del camión a la pila del piso, de a una
const cajasPila = Array.from({ length: 6 }, () => { const c = cajaMarta(); scene.add(c); return c; });

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.5), r2(T.p5 + 0.5), r2(T.q3 + 0.6), r2(T.c + 1.6)] });
const nico = crearPersonaje({ ...ELENCO.empleado, cortoMechas: true, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p5 + 1.6)] });
const graciela = crearPersonaje({ ...ELENCO.clienta, lentesFinos: true, sinPatillas: true, delantal: C.cr, delantalBorde: C.navy3, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q1 + 0.2)] });
const marta = crearPersonaje({ ...ELENCO.duena, dedos: true, parpadeoCada: 999 });
const hector = crearPersonaje({ ...ELENCO.hector, cuello: null, lentesCerca: 1.05, campera: { color: C.cr, cuello: C.cr2, cierre: C.cr3, abierta: true }, dedos: true, parpadeoCada: 999 });
const ruso = crearPersonaje({ ...ELENCO.ruso, dedos: false, parpadeoCada: 999, parpadeosExtra: [r2(T.p4b + 0.9), r2(T.p6c + 0.9), r2(T.q5 + 0.3)] });
// las dos franjas reflectivas crema del chaleco del Ruso (aros que siguen el torso, abiertos adelante)
{
  const fm = mat(C.cr, 0.35, { emissive: 0xefeee5, emissiveIntensity: 0.15 }), P = ELENCO.ruso.panza;
  // (r2) las franjas siguen la cáscara del chaleco (mismo torno, misma abertura adelante): ya no sobresalen como púas
  for (const [y, r] of [[0.14, 0.235 * P], [0.3, 0.2357]]) { const rr = r * 1.07 + 0.013; const f = mesh(new THREE.LatheGeometry([new THREE.Vector2(rr, y - 0.024), new THREE.Vector2(rr, y + 0.024)], 36, 0.34, Math.PI * 2 - 0.68), fm, 0, 0, 0); f.scale.z = 0.86; f.material.side = THREE.DoubleSide; ruso.cuerpo.add(f); }
  if (false) for (const y of [0.16, 0.3]) { const f = mesh(new THREE.TorusGeometry(0.245 * (y < 0.2 ? P : 1.0) + 0.012, 0.022, 6, 40, Math.PI * 1.7), fm, 0, y, 0); f.rotation.set(Math.PI / 2, 0, Math.PI * 0.65); f.scale.set(1, 0.88, 1); ruso.cuerpo.add(f); }
}
// el pelo de Rubén: la herradura de bolitas canosas (de dist-comisiones) y el bigote que se esconde de nuca
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
herradura(ruben);
const BIGOTE_R = []; ruben.cabeza.traverse((o) => { if (o.isMesh && o.material.color && (o.material.color.getHex() === PELO.gris || o.material.color.getHex() === ELENCO.ruben.cejasColor)) BIGOTE_R.push(o); });
function bigoteSegunCamara(cam = camera) {
  ruben.cabeza.updateMatrixWorld(true);
  const h = ruben.cabeza.getWorldPosition(new THREE.Vector3()), f = V3(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld), c = cam.position.clone().sub(h);
  f.y = 0; c.y = 0; f.normalize(); c.normalize();
  for (const b of BIGOTE_R) b.visible = f.dot(c) > 0.1;
}
// la carpeta de pedidos de Nico (navy3 con la etiqueta crema) y el mate de Rubén
const carpeta = new THREE.Group(); scene.add(carpeta);
{ carpeta.add(caja(0.24, 0.32, 0.025, M.navy3, 0, 0, 0, 0.008)); carpeta.add(caja(0.12, 0.05, 0.004, M.cr, 0, 0.08, 0.014, 0.003)); for (let i = 0; i < 3; i++) carpeta.add(caja(0.22, 0.3, 0.003, mat(0xf4f0e0, 0.85), 0.004 * i, -0.004 * i, -0.014 - 0.004 * i, 0.002)); sombras(carpeta); }
const mate = crearMate(); mate.scale.setScalar(1.1); scene.add(mate);
// (r2) la bombilla más corta (llegaba al mentón)
mate.traverse((o) => { if (o.isGroup && Math.abs(o.rotation.z + 0.32) < 1e-3) o.scale.setScalar(0.72); });
const TODOS = [ruben, nico, graciela, marta, hector, ruso];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// los celulares: Graciela (funda verde), Marta (crema), Héctor (navy), el Ruso (navy con borde verde)
const pantG = lienzo(600, 1215, () => {}), pantH = lienzo(600, 1215, () => {}), pantRu = lienzo(600, 1215, () => {});
const celG = crearCel(pantG, C.g); scene.add(celG);
const celMa = crearCel(pantMa, C.cr2); scene.add(celMa);
const celH = crearCel(pantH, C.navy); scene.add(celH);
const celRu = crearCel(pantRu, C.navy3); scene.add(celRu);
// el cartel "Fui al banco" en la mano de Marta (Q2): el mismo papel de la persiana
const cartelMano = new THREE.Group(); scene.add(cartelMano);
cartelMano.add(plano(0.42, 0.3, cartelBancoT, 0, 0, 0)); cartelMano.children[0].material.side = THREE.DoubleSide; sombras(cartelMano);

// ---- avatares (la cara del personaje 3D renderizada chica en un círculo) ----
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
  AVATAR.graciela = leer(graciela, 0xefeee5);
  AVATAR.marta = leer(marta, 0xb9cde0);
  AVATAR.hector = leer(hector, 0xefeee5);
  AVATAR.ruso = leer(ruso, 0xb9cde0);
  AVATAR.ruben = leer(ruben, 0xefeee5);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// una caja kraft dibujada (el avatar de la distribuidora en el chat)
function cajita(x, cx, cy, r) {
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.fillStyle = "#c9a46b"; x.fillRect(cx - r * 0.55, cy - r * 0.35, r * 1.1, r * 0.85); x.fillStyle = "#b8935a"; x.fillRect(cx - r * 0.55, cy - r * 0.35, r * 1.1, r * 0.18);
  x.fillStyle = "#16243d"; x.fillRect(cx - r * 0.1, cy - r * 0.35, r * 0.2, r * 0.85);
  x.strokeStyle = "#0b1220"; x.lineWidth = r * 0.1; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
// el camioncito (verde de marca, cabina navy) visto de costado, para los mapas
function camioncito(x, cx, cy, s, dir = 1) {
  x.save(); x.translate(cx, cy); x.scale(dir, 1);
  x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(-s * 0.62, -s * 0.42, s * 0.86, s * 0.62, s * 0.1); x.fill();
  x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(-s * 0.56, -s * 0.36, s * 0.74, s * 0.5, s * 0.08); x.fill();
  x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(s * 0.22, -s * 0.22, s * 0.42, s * 0.42, s * 0.1); x.fill();
  x.fillStyle = "#b9cde0"; x.fillRect(s * 0.34, -s * 0.14, s * 0.2, s * 0.14);
  for (const wx of [-s * 0.36, s * 0.4]) { x.fillStyle = "#0b1220"; x.beginPath(); x.arc(wx, s * 0.22, s * 0.13, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.beginPath(); x.arc(wx, s * 0.22, s * 0.05, 0, 7); x.fill(); }
  x.restore();
}
// el mapa dibujado (manzanas navy claro, calles crema, la ruta verde, el pin, el camioncito en la fracción u de la ruta)
const RUTA = [[0.08, 0.86], [0.08, 0.6], [0.4, 0.6], [0.4, 0.32], [0.72, 0.32], [0.72, 0.14], [0.9, 0.14]];
function puntoRuta(u) {
  const segs = []; let L = 0; for (let i = 0; i < RUTA.length - 1; i++) { const d = Math.hypot(RUTA[i + 1][0] - RUTA[i][0], RUTA[i + 1][1] - RUTA[i][1]); segs.push(d); L += d; }
  let r = u * L; for (let i = 0; i < segs.length; i++) { if (r <= segs[i] || i === segs.length - 1) { const k = cl(r / segs[i]); return [lerp(RUTA[i][0], RUTA[i + 1][0], k), lerp(RUTA[i][1], RUTA[i + 1][1], k), RUTA[i + 1][0] - RUTA[i][0]]; } r -= segs[i]; }
  return RUTA.at(-1);
}
function mapa(x, x0, y0, w, h, u, { pinTxt = null, paradas = [] } = {}) {
  x.save(); x.beginPath(); x.roundRect(x0, y0, w, h, 24); x.clip();
  x.fillStyle = "#e6e2cf"; x.fillRect(x0, y0, w, h);
  x.fillStyle = "#b9cde0";
  const nx = 5, ny = 6, cw = w / nx, ch = h / ny;
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) x.fillRect(x0 + i * cw + cw * 0.12, y0 + j * ch + ch * 0.12, cw * 0.76, ch * 0.76);
  x.strokeStyle = "#5ce611"; x.lineWidth = Math.max(10, w * 0.03); x.lineCap = "round"; x.lineJoin = "round";
  x.beginPath(); RUTA.forEach(([a, b], i) => (i ? x.lineTo(x0 + a * w, y0 + b * h) : x.moveTo(x0 + a * w, y0 + b * h))); x.stroke();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, w * 0.01); x.setLineDash([w * 0.02, w * 0.02]);
  x.beginPath(); RUTA.forEach(([a, b], i) => (i ? x.lineTo(x0 + a * w, y0 + b * h) : x.moveTo(x0 + a * w, y0 + b * h))); x.stroke(); x.setLineDash([]);
  for (const pu of paradas) { const [a, b] = puntoRuta(pu); x.fillStyle = "#0b1220"; x.beginPath(); x.arc(x0 + a * w, y0 + b * h, w * 0.022, 0, 7); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(x0 + a * w, y0 + b * h, w * 0.012, 0, 7); x.fill(); }
  // el pin (el destino) al final de la ruta
  const [pa, pb] = RUTA.at(-1), px = x0 + pa * w, py = y0 + pb * h, R = w * 0.055;
  x.fillStyle = "#0b1220"; x.beginPath(); x.arc(px, py - R * 1.2, R, Math.PI * 0.85, Math.PI * 0.15); x.lineTo(px, py); x.closePath(); x.fill();
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(px, py - R * 1.2, R * 0.45, 0, 7); x.fill();
  const [ca, cb, dx] = puntoRuta(u);
  camioncito(x, x0 + ca * w, y0 + cb * h - w * 0.03, w * 0.11, dx < 0 ? -1 : 1);
  x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(x0, y0, w, h, 24); x.stroke();
}
// ================= PANTALLAS =================
const fmt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// pantalla de llamada (entrante / en curso): avatar grande, nombre, estado, botones
function pantLlamada(x, w, h, cv, nombre, estado, { entrante = false, rojo = false } = {}) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  if (cv) avatar(x, cv, w / 2, 360, 170); else cajita(x, w / 2, 360, 170);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, nombre, 900, 70, w - 60); x.fillText(nombre, w / 2, 640);
  x.fillStyle = rojo ? "#d9786d" : "#5ce611"; ajustar(x, estado, 800, 58, w - 60); x.fillText(estado, w / 2, 740);
  if (entrante) {
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(150, 1020, 84, 0, 7); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w - 150, 1020, 84, 0, 7); x.fill();
    x.strokeStyle = "#0b1220"; x.lineWidth = 18; x.lineCap = "round"; for (const cx of [150, w - 150]) { x.beginPath(); x.arc(cx, cx === 150 ? 1040 : 1000, 40, cx === 150 ? Math.PI * 1.15 : Math.PI * 0.15, cx === 150 ? Math.PI * 1.85 : Math.PI * 0.85); x.stroke(); }
  } else {
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2, 1030, 84, 0, 7); x.fill();
    x.strokeStyle = "#efeee5"; x.lineWidth = 20; x.lineCap = "round"; x.beginPath(); x.arc(w / 2, 1052, 46, Math.PI * 1.15, Math.PI * 1.85); x.stroke();
  }
  x.textAlign = "left";
}
// ---- el celular de Rubén: las llamadas (P1-P3), el contacto del Ruso (P4), "Súper Héctor llamando" (P6), quieto (parte 2)
let claveR = "";
function dibujarCelR(t) {
  let modo = "reposo", seg = 0;
  if (t < T.p3) { modo = "g"; seg = Math.floor(t + 14); }
  else if (t < T.p4b) modo = t < T.m1 - 0.08 ? "mEnt" : "m";   // (r1) sin la llamada de Héctor ni el inserto de Llamar
  else if (t < P1 && t >= T.ring3 - 0.05) modo = "hEnt3";
  else if (t < P1 && t >= T.p6b) modo = "reposoP";
  const toq = modo === "ruso" && t >= T.tap - 0.12 ? 1 : 0;
  const clave = `${modo}|${seg}|${toq}`; if (clave === claveR) return; claveR = clave;
  const { x } = pantR.userData, w = 600, h = 1215;
  x.textBaseline = "middle";
  if (modo === "g") pantLlamada(x, w, h, AVATAR.graciela, "Rotisería Graciela", `En llamada 0:${String(seg % 60).padStart(2, "0")}`);
  else if (modo === "mEnt") pantLlamada(x, w, h, AVATAR.marta, "Cafetería Marta", "llamando…", { entrante: true });
  else if (modo === "m") pantLlamada(x, w, h, AVATAR.marta, "Cafetería Marta", "En llamada");
  else if (modo === "hEnt" || modo === "hEnt3") pantLlamada(x, w, h, AVATAR.hector, "Súper Héctor", "llamando…", { entrante: true });
  else if (modo === "h") pantLlamada(x, w, h, AVATAR.hector, "Súper Héctor", "En llamada");
  else if (modo === "ruso" || modo === "rusoLlama") {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 560);
    avatar(x, AVATAR.ruso, w / 2, 250, 160);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 92); x.fillText("RUSO", w / 2, 470);
    x.fillStyle = "#5ce611"; x.font = F(800, 52); x.fillText("CHOFER", w / 2, 610 - 20);
    x.fillStyle = "#1f3254"; x.font = F(700, 42); x.fillText("Camión · reparto", w / 2, 680);
    if (modo === "ruso") {
      x.fillStyle = toq ? "#3fa60a" : "#5ce611"; x.beginPath(); x.roundRect(60, 820, w - 120, 170, 85); x.fill(); if (toq) { x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.stroke(); }
      x.fillStyle = "#0b1220"; x.font = F(900, 92); x.fillText("Llamar", w / 2, 908);
    } else { x.fillStyle = "#16243d"; x.font = F(900, 80); x.fillText("Llamando…", w / 2, 900); }
    x.textAlign = "left";
  } else {
    // en reposo: la hora grande, sin llamadas
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 170); x.fillText(modo === "reposoP" ? "18:02" : t >= P2 ? "10:50" : "9:41", w / 2, 360); x.textAlign = "left";
  }
  pantR.needsUpdate = true;
}
// ---- el celular del Ruso: las 14 llamadas perdidas (P4b) · la hoja de ruta, el remito con firma y foto, Entregado ✓ (Q4)
// · el resumen del día (Q5)
let claveRu = "";
function dibujarCelRu(t) {
  let modo = "perdidas";
  if (t >= P2) modo = t < T.q4i ? "ruta" : t < T.q5 ? (t < T.entregado ? "remito" : "entregado") : "dia";
  const u = modo === "remito" ? cl(sg(t, T.firma, T.firma + 0.9)) : 0, foto = modo === "remito" && t >= T.foto ? 1 : 0;
  const clave = `${modo}|${Math.round(u * 24)}|${foto}`; if (clave === claveRu) return; claveRu = clave;
  const { x } = pantRu.userData, w = 600, h = 1215;
  x.textBaseline = "middle"; x.textAlign = "left";
  const cab = (t1, t2) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, w, 8); x.fillStyle = "#efeee5"; ajustar(x, t1, 800, 54, w - 60); x.fillText(t1, 30, 62); x.fillStyle = "#5ce611"; ajustar(x, t2, 700, 38, w - 60); x.fillText(t2, 30, 124); };
  if (modo === "perdidas") {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 140); x.fillText("9:42", w / 2, 200);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(28, 330, w - 56, 560, 40); x.fill();
    avatar(x, AVATAR.ruben, w / 2, 470, 104);
    x.fillStyle = "#0b1220"; x.font = F(900, 84); x.fillText("Rubén", w / 2, 640);
    x.fillStyle = "#c7655b"; x.font = F(900, 150); x.fillText("14", w / 2, 765);
    x.font = F(800, 50); x.fillText("llamadas perdidas", w / 2, 850);
    x.textAlign = "left";
  } else if (modo === "ruta") {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h); cab("Hoja de ruta", "Martes · 18 entregas");
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(28, 210, w - 56, 250, 30); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(800, 44); x.fillText("Parada 15 de 18", 60, 262); x.font = F(900, 74); ajustar(x, "Súper Héctor", 900, 74, w - 120); x.fillText("Súper Héctor", 60, 340); x.font = F(800, 46); x.fillText("10:52", 60, 410);
    const L = [["13 · Bar Walter", 1], ["14 · Panadería Nelly", 1], ["16 · Cafetería Marta", 0], ["17 · Kiosco Beto", 0]];
    L.forEach(([n, ok], i) => { const y = 520 + i * 150; x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(28, y, w - 56, 130, 26); x.fill(); x.fillStyle = ok ? "#0b1220" : "#4a5060"; ajustar(x, n, 800, 46, w - 200); x.fillText(n, 56, y + 66); if (ok) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w - 90, y + 65, 40, 0, 7); x.fill(); tilde(x, w - 90, y + 67, 44); } });
  } else if (modo === "remito" || modo === "entregado") {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h); cab("Remito · Súper Héctor", "Parada 15 de 18");
    x.fillStyle = "#0b1220"; x.font = F(700, 40); x.fillText("Total", 40, 230); x.font = F(900, 96); x.fillText("$ 86.400", 40, 312);
    if (modo === "remito") {
      x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(28, 380, w - 56, 380, 30); x.fill(); x.strokeStyle = "#1f3254"; x.lineWidth = 6; x.setLineDash([18, 12]); x.stroke(); x.setLineDash([]);
      x.fillStyle = "#1f3254"; x.font = F(800, 46); x.fillText("Firmá acá", 56, 430);
      // la firma con el dedo: trazo navy grueso que se dibuja solo (u de 0 a 1)
      if (u > 0) {
        const P = []; for (let i = 0; i <= 60; i++) { const k = i / 60; P.push([90 + k * 400, 610 + Math.sin(k * 15) * 60 * (1 - k * 0.4) - k * 40 + Math.cos(k * 31) * 18]); }
        const n = Math.max(2, Math.round(P.length * u));
        x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); P.slice(0, n).forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.stroke();
      }
      x.fillStyle = "#1f3254"; x.font = F(700, 40); x.fillText("Recibió: Héctor", 56, 720);
      // la foto de las cajas (miniatura) y el botón
      x.fillStyle = foto ? "#c9a46b" : "#d9d7c9"; x.beginPath(); x.roundRect(28, 800, 250, 190, 22); x.fill();
      if (foto) { x.fillStyle = "#b8935a"; x.fillRect(60, 860, 90, 100); x.fillRect(160, 880, 90, 80); x.fillStyle = "#f6f3e6"; x.fillRect(75, 890, 60, 30); x.fillRect(175, 905, 60, 26); }
      else { x.fillStyle = "#1f3254"; x.font = F(800, 42); x.textAlign = "center"; x.fillText("Foto", 153, 895); x.textAlign = "left"; }
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(300, 800, w - 328, 190, 30); x.fill(); x.fillStyle = "#efeee5"; x.font = F(900, 52); x.textAlign = "center"; x.fillText("Entregar", 300 + (w - 328) / 2, 897); x.textAlign = "left";
    } else {
      x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(28, 380, w - 56, 720, 36); x.fill();
      x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, 540, 110, 0, 7); x.fill(); tilde(x, w / 2, 545, 130, "#5ce611");
      x.textAlign = "center"; x.fillStyle = "#0b1220"; x.font = F(900, 88); x.fillText("Entregado", w / 2, 740); x.font = F(900, 64); x.fillText("10:52", w / 2, 830);
      x.font = F(800, 46); x.fillText("Recibió: Héctor", w / 2, 930); x.fillText("Firma ✓  ·  Foto ✓", w / 2, 1010); x.textAlign = "left";
    }
  } else {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h); cab("Hoja de ruta", "Martes · terminada");
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(28, 210, w - 56, 330, 36); x.fill();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "18 de 18", 900, 150, w - 110); x.fillText("18 de 18", w / 2, 350); x.font = F(800, 60); x.fillText("entregadas ✓", w / 2, 470);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(28, 580, w - 56, 220, 30); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 66); x.fillText("18 remitos", w / 2, 650); x.font = F(800, 46); x.fillText("con firma y foto", w / 2, 735);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(28, 840, w - 56, 220, 30); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 66); x.fillText("0 cajas", w / 2, 910); x.font = F(800, 46); x.fillText("de vuelta", w / 2, 995); x.textAlign = "left";
  }
  pantRu.needsUpdate = true;
}
// ---- el chat genérico de la distribuidora (Graciela en Q1, Marta en Q2) ----
function chatDist(x, w, h, nombre, desde, hasta, a2, u) {
  x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); cajita(x, 80, 88, 54); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle";
  ajustar(x, "Distribuidora Rubén", 800, 46, w - 170); x.fillText("Distribuidora Rubén", 150, 66); x.fillStyle = "#5ce611"; x.font = F(700, 34); x.fillText("aviso de entrega", 150, 122);
  // el globo 1: la ventana de entrega
  x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(26, 200, w - 52, 400, 34); x.fill();
  x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText(`Hola, ${nombre}.`, 56, 256); x.fillText("Tu pedido llega hoy", 56, 320); x.fillText("entre", 56, 384);
  x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(48, 420, w - 96, 110, 22); x.fill(); x.fillStyle = "#0b1220"; ajustar(x, `${desde} y ${hasta}`, 900, 70, w - 150); x.textAlign = "center"; x.fillText(`${desde} y ${hasta}`, w / 2, 478); x.textAlign = "left";
  x.fillStyle = "#3fa60a"; x.font = F(800, 38); x.fillText("✓ confirmado", 56, 568);
  if (a2 > 0) {
    // el globo 2: en camino, sos la próxima parada, con el mapa y el camioncito
    x.save(); const k = Math.min(1, a2); x.globalAlpha = k;
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(26, 630, w - 52, 560, 34); x.fill();
    x.fillStyle = "#5ce611"; x.font = F(900, 58); x.fillText("En camino", 56, 690);
    x.fillStyle = "#efeee5"; ajustar(x, "Sos la próxima parada", 800, 46, w - 112); x.fillText("Sos la próxima parada", 56, 752);
    mapa(x, 50, 800, w - 100, 360, u, { paradas: [0.25, 0.55] });
    x.restore();
  }
}
let claveG = "";
function dibujarCelG(t) {
  let modo = "llamada";
  if (t >= P2) modo = t < T.aviso1 ? "vacio" : "chat";
  const a2 = modo === "chat" ? sg(t, T.aviso2, T.aviso2 + 0.15) : 0, u = modo === "chat" ? lerp(0.62, 0.86, sg(t, T.aviso2, T.q2)) : 0;
  const clave = `${modo}|${Math.round(a2 * 6)}|${Math.round(u * 60)}`; if (clave === claveG) return; claveG = clave;
  const { x } = pantG.userData, w = 600, h = 1215;
  if (modo === "llamada") pantLlamada(x, w, h, null, "Distribuidora Rubén", "En llamada");
  else if (modo === "vacio") { chatDist(x, w, h, "Graciela", "10:00", "11:00", 0, 0); x.fillStyle = "#e9e6d8"; x.fillRect(0, 190, w, h - 190); }
  else chatDist(x, w, h, "Graciela", "10:00", "11:00", a2, u);
  pantG.needsUpdate = true;
}
let claveMa = "";
function dibujarCelMa(t) {
  const modo = t >= P2 ? "chat" : "llamada";
  if (claveMa === modo) return; claveMa = modo;
  const { x } = pantMa.userData, w = 600, h = 1215;
  if (modo === "llamada") pantLlamada(x, w, h, null, "Distribuidora Rubén", "En llamada");
  else chatDist(x, w, h, "Marta", "12:00", "13:00", 0, 0);
  pantMa.needsUpdate = true;
}
let claveH = "";
function dibujarCelH(t) { if (claveH) return; claveH = "1"; pantLlamada(pantH.userData.x, 600, 1215, null, "Distribuidora Rubén", "En llamada"); pantH.needsUpdate = true; }
// ---- el monitor de Rubén: la planilla de pedidos (parte 1) / el panel "Entregas de hoy" (parte 2) ----
let claveMon = "";
function dibujarMon(t) {
  const parte2 = t >= P2, n = !parte2 ? 0 : t >= T.vuela + 0.45 ? 15 : 14, fila = parte2 && t >= T.fila15 ? 1 : 0;
  const u = parte2 ? lerp(0.66, 0.74, sg(t, T.q3, T.q4)) : 0;
  const clave = `${parte2}|${n}|${fila}|${Math.round(u * 50)}`; if (clave === claveMon) return; claveMon = clave;
  const { x } = pantMon.userData, w = 1280, h = 896;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (!parte2) {
    // la planilla de pedidos del martes: grilla crema, encabezado navy (los números no importan: no se leen)
    x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 110); x.fillStyle = "#efeee5"; x.font = F(800, 60); x.textAlign = "right"; x.fillText("Pedidos · martes", w - 40, 58); x.textAlign = "left";
    x.fillStyle = "#1f3254"; x.fillRect(0, 110, w, 70);
    x.strokeStyle = "#c9c7b8"; x.lineWidth = 3;
    for (let i = 0; i < 12; i++) { const y = 180 + i * 60; if (i % 2) { x.fillStyle = "#e9e6d8"; x.fillRect(0, y, w, 60); } x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); }
    for (const cx of [420, 760, 1010]) { x.beginPath(); x.moveTo(cx, 110); x.lineTo(cx, h); x.stroke(); }
    x.fillStyle = "#9a988c"; for (let i = 0; i < 12; i++) { x.fillRect(30, 200 + i * 60, 220 + ((i * 53) % 140), 20); x.fillRect(450, 200 + i * 60, 120 + ((i * 31) % 90), 20); x.fillRect(790, 200 + i * 60, 110, 20); x.fillRect(1040, 200 + i * 60, 150, 20); }
  } else {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, w, 10);
    x.fillStyle = "#efeee5"; x.font = F(800, 66); x.fillText("Entregas de hoy", 40, 64);
    // el número grande y los chips
    x.fillStyle = "#5ce611"; x.font = F(900, 150); x.fillText(`${n} de 18 ✓`, 40, 260);
    const chips = [["En camino 1", "#efeee5"], [`Pendientes ${18 - n - 1}`, "#efeee5"], ["Devueltas 0", "#5ce611"]];
    chips.forEach(([tx, col], i) => { const cx = 40 + i * 300; x.fillStyle = "#1f3254"; x.beginPath(); x.roundRect(cx, 360, 280, 84, 42); x.fill(); x.fillStyle = col; ajustar(x, tx, 800, 40, 250); x.textAlign = "center"; x.fillText(tx, cx + 140, 403); x.textAlign = "left"; });
    // el mapa a la derecha
    mapa(x, 940, 150, 310, 300, u, { paradas: [0.2, 0.45] });
    // la fila de Súper Héctor
    const filas = [["Parada 14 · Panadería Nelly", "✓ 10:31", 0], [n >= 15 ? "Parada 15 · Súper Héctor" : "Parada 15 · Súper Héctor", n >= 15 ? "✓ 10:52" : "llega 10:52", 1], ["Parada 16 · Cafetería Marta", "12 a 13 h", 0]];
    filas.forEach(([a, b, esH], i) => {
      const y = 490 + i * 130, hi = esH && fila;
      x.fillStyle = hi ? "#5ce611" : "#efeee5"; x.beginPath(); x.roundRect(30, y, w - 60, 112, 24); x.fill();
      if (hi) { x.strokeStyle = "#efeee5"; x.lineWidth = 8; x.stroke(); }
      x.fillStyle = "#0b1220"; ajustar(x, a, 800, 52, 790); x.fillText(a, 60, y + 58);
      x.textAlign = "right"; x.font = F(900, 54); x.fillText(b, w - 60, y + 58); x.textAlign = "left";
    });
  }
  pantMon.needsUpdate = true;
}
// ================= TARJETAS PEGADAS A LA CÁMARA: globos, rótulos, guías =================
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
    else if (p.startsWith("{")) { x.fillStyle = "#c7655b"; x.fillText(limpio(p), xx, y + px * 0.04); }
    else { x.fillStyle = tinta; x.fillText(p, xx, y + px * 0.04); }
    xx += anchos[k];
  });
}
function crearGlobo(lineas, px = 80, { minW = 0 } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  const limpio = (l) => l.replace(/[[\]{}]/g, "");
  med.font = F(800, px);
  const anchoT = Math.max(...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.max(minW, Math.round(anchoT + px * 1.2)), H = Math.round(lineas.length * px * 1.22 + px * 0.75);
  return crearTarjeta(Wg, H, (x, w, h) => { lineas.forEach((l, i) => textoSel(x, l, w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px)); });
}
// el rótulo: caja navy, texto crema (o verde / rojo apagado), borde crema
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
  // zona segura: toda tarjeta entre y 200 (borde de arriba, r3) e y 1650 (borde de abajo, r1)
  cy = cl(cy, H / 2 + 200, 1650 - H / 2);
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
const _v = new THREE.Vector3(), _w = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const objPx = (o, local = V3(0, 0, 0)) => { o.updateMatrixWorld(true); return enPantalla(o.localToWorld(local.clone())); };
// REGLA DE BURBUJAS: la burbuja va arriba del que habla y la cola apunta a su BOCA (corta, no llega a la cara). Si no
// entra (o el que habla queda cortado), se anota en AVISOS (prev.mjs lo imprime). En la pantalla partida se proyecta con
// la cámara de esa mitad (PROY).
const AVISOS = [];
let PROY = null;
function enPantallaCam(v, cam, mitad) { _v.copy(v).project(cam); return [(_v.x + 1) * 540, mitad * 960 + (1 - _v.y) * 480]; }
const aPx = (v) => (PROY ? enPantallaCam(v, PROY[0], PROY[1]) : enPantalla(v));
const bocaW = (per) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(0, 0.15, 0.3)); };
const coronillaPx = (per) => { per.raiz.updateMatrixWorld(true); return aPx(per.cabeza.localToWorld(V3(0, 0.62, 0))); };
function hablar(g, per, s, orden = 1, dx = 0, minY = 250, maxY = 1650, sobre = 110) {
  const [hx, hy] = coronillaPx(per), [mx, my] = aPx(bocaW(per));
  const { H } = g.userData;
  let cy = hy - sobre - H / 2;
  if (cy - H / 2 < minY - 10) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  cy = cl(cy, H / 2 + minY, maxY - H / 2);
  if (mx < 70 || mx > 1010 || hy < (PROY && PROY[1] ? 960 : 0) || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, cy, s, [mx, my], orden, minY);
}
// las líneas con remate se parten en dos tiempos: la burbuja "a" muestra la primera mitad y la completa aparece cuando
// suena la segunda (CORTE de gen.mjs)
function globo2(lineas, px, vacias) { const g = crearGlobo(lineas, px); const a = crearGlobo(lineas.filter((l, i) => !vacias.includes(i)), px); return [a, g]; }

// ================= GLOBOS Y RÓTULOS =================
const [r5a, r5g] = globo2(["Es un camión, Nico.", "[A algún lado llega.]"], 70, [1]);
const [g2a, g2g] = globo2(["Ah.", "[Soy la próxima.]"], 80, [1]);
const [r8a, r8g] = globo2(["A lo de Héctor.", "[En dos minutos.]"], 76, [1]);
const [u3a, u3g] = globo2(["Vos.", "No un {señor.}"], 84, [1]);
const [r9a, r9g] = globo2(["¿Y hoy?", "¿Pasó algún {señor?}"], 76, [1]);
const GL = {
  g1: crearGlobo(["Rubén,", "¿por dónde viene", "[el camión?]"], 50),
  r1: crearGlobo(["Está [llegando.]"], 84),
  m1: crearGlobo(["¿Por dónde viene?"], 66),
  r2: crearGlobo(["Llegando."], 70),
  h1: crearGlobo(["Rubén, ¿y el camión?"], 64),
  r3: crearGlobo(["Llegando…"], 66),
  n1: crearGlobo(["Jefe, ¿dónde está", "[el camión?]"], 70), n1b: crearGlobo(["Jefe, ¿dónde está", "[el camión?]"], 70),
  r4: crearGlobo(["Llegando."], 80), r4b: crearGlobo(["Llegando."], 80),
  n2: crearGlobo(["¿Adónde?"], 84), n2b: crearGlobo(["¿Adónde?"], 84),
  r5: r5g, r5a,
  r6: crearGlobo(["¿Y esta {firma?}"], 84),
  u1: crearGlobo(["Un señor."], 84),
  r7: crearGlobo(["¿Qué… señor?"], 84),
  u2: crearGlobo(["Uno que {pasaba.}"], 80),
  g2: g2g, g2a,
  m2: crearGlobo(["Al banco voy", "[a la una.]"], 76),
  r8: r8g, r8a,
  h2: crearGlobo(["¿Firmo yo?"], 84),
  u3: u3g, u3a,
  r9: r9g, r9a,
  u4: crearGlobo(["[Ni uno.]"], 92),
};
const ROTU = {
  pidio: crearRotulo([["Rotisería Graciela", null, 44], ["pidió para las 10", "#d9786d", 50]], 44),
  cab: crearRotulo([["Maneja.", null, 56], ["No atiende.", "#d9786d", 64]], 56),
  marta: crearRotulo([["Cafetería Marta", null, 46], ["vuelve al depósito", "#d9786d", 52]], 46),
  viaje: crearRotulo([["Viaje perdido", null, 48], ["flete $ 4.200", "#d9786d", 60]], 48),
  horas: crearRotulo([["3 horas", "#d9786d", 60], ["de teléfono", null, 48]], 48),
  aviso: crearRotulo([["Aviso automático", "#5ce611", 56], ["a cada cliente", null, 48]], 48),
  panel: crearRotulo([["Todo el reparto", "#5ce611", 56], ["en una pantalla", null, 48]], 48),
  firma: crearRotulo([["Firma y foto", "#5ce611", 56], ["en el celular", null, 48]], 48),
  llamando: crearRotulo([["Súper Héctor", null, 52], ["llamando…", "#d9786d", 56]], 52),
};
const GUIAS = [crearGuia(), crearGuia()];
// el chip 3D "Entregado ✓" que vuela del remito al panel (placa redondeada verde con el texto navy)
const chipT = lienzo(700, 200, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 110); x.fillText("Entregado ✓", w / 2, h / 2 + 6); });
const chip3d = new THREE.Mesh(rbox(0.36, 0.1, 0.03, 0.03, 3), [M.gd, M.gd, M.gd, M.gd, new THREE.MeshBasicMaterial({ map: chipT, toneMapped: false }), M.gd]); scene.add(chip3d);
// la mano suelta de los insertos (de dist-quien-debe): palma, pulgar estirado sobre la pantalla, la manga
function crearManoInserto(piel, manga) {
  const g = new THREE.Group(), m = mat(piel, 0.55);
  const palma = mesh(new THREE.SphereGeometry(1, 18, 12), m, 0.035, -0.02, -0.03); palma.scale.set(0.045, 0.06, 0.026); g.add(palma);
  const pul = new THREE.Group(); g.add(pul); pul.position.set(0.02, -0.0, 0.0);
  const p1 = mesh(new THREE.CapsuleGeometry(0.0092, 0.048, 4, 10), m, 0, 0.035, 0); pul.add(p1);
  const yema = mesh(new THREE.SphereGeometry(1, 10, 8), mat(0xf0d2bf, 0.4), 0, 0.062, 0.006); yema.scale.set(0.007, 0.009, 0.003); pul.add(yema);
  const mg = mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.22, 16), mat(manga, 0.6), 0.05, -0.14, -0.035); mg.rotation.z = 0.25; g.add(mg); g.userData.manga = mg;
  g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  g.userData.pulgar = pul;
  return g;
}
const manoR = crearManoInserto(ELENCO.ruben.piel, C.navy3); scene.add(manoR);
const manoH = crearManoInserto(ELENCO.hector.piel, C.cr); scene.add(manoH);
const manosRem = [crearManoInserto(ELENCO.ruben.piel, C.navy3), crearManoInserto(ELENCO.ruben.piel, C.navy3)]; for (const m of manosRem) scene.add(m);

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt. Los partidos (P1, P3, Q1) tienen dos cámaras.
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  if (b === a || b[0] <= a[0]) return a.slice(1, 8);
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
// una cámara de frente a una pantalla (plano local del objeto): llena `llena` del alto del cuadro
function camPantalla(obj, centroLocal, normalLocal, alto, llena, fov, t, extra = 0, dy = 0) {
  obj.updateMatrixWorld(true);
  const c = obj.localToWorld(centroLocal.clone()), n = normalLocal.clone().transformDirection(obj.matrixWorld);
  const d = alto / llena / (2 * Math.tan((fov * D2R) / 2)) + extra;
  const up = V3(0, 1, 0).transformDirection(obj.matrixWorld);
  const p = c.clone().add(n.multiplyScalar(d)).addScaledVector(up, dy), m = c.clone().addScaledVector(up, dy);
  ponerCam([p.x, p.y, p.z, m.x, m.y, m.z, fov], t, true);
  camera.up.copy(up); camera.lookAt(m);
  return { c, p, d };
}
const lerpV = (a, b, u) => a.map((v, i) => lerp(v, b[i], u));
// ---- los encuadres ----
const MUE_R = { x: MX + 2.6, z: -0.95 }, MUE_U = { x: MX + 1.55, z: -0.25 }; const MUE_U2 = { x: MX + 1.85, z: -0.4 };   // en el muelle: Rubén y el Ruso
const CAM_OFI = (k) => [lerp(0.55, 0.53, k), 1.44, lerp(1.8, 1.68, k), 0.57, 1.24, -2.0, 56];                  // P5/Q3: Rubén y Nico en la puerta
const CAM_R2 = (k) => [lerp(0.42, 0.4, k), 1.36, lerp(0.5, 0.38, k), 0.12, 1.22, RUB.z, 40];                   // P2: primer plano de Rubén
const CAM_R5 = (k) => [lerp(1.3, 1.25, k), 1.42, lerp(0.05, -0.05, k), 0.12, 1.12, RUB.z, 46];                // P5b: Rubén desde el lado de Nico
const CAB_A = [CBX + 0.45, 1.36, 0.25, CBX - 0.04, 1.24, -0.6, 46], CAB_B = [CBX + 0.95, 1.45, -0.7, CBX - 0.45, 1.32, 0.1, 70];
const CAM_CAB = (k) => lerpV(CAB_A, CAB_B, eio(cl((k - 0.32) / 0.68)));
const CAM_CAFE = (k) => [CX + CAFX + lerp(1.3, 1.25, k), 1.55, lerp(0.35, 0.22, k), CX + CAFX - 0.12, 1.35, FZ, 56];   // P6a: la persiana
const CAM_MUE = (k) => [MX + lerp(3.95, 3.85, k), 1.45, lerp(2.75, 2.6, k), MX + 2.2, 1.05, -0.45, 54];             // P6b/Q5: el muelle general
const CAM_Q5 = (k) => [MX + lerp(3.45, 3.45, k), 1.5, lerp(2.25, 2.2, k), MX + lerp(2.28, 2.34, k), 1.12, -0.6, 50];   // (r2) Q5: más cerca que el muelle general
const CAM_DOS = (k) => [MX + lerp(2.8, 2.75, k), 1.52, lerp(2.35, 2.22, k), MX + 2.14, 1.32, -0.6, 52];            // P6c/Q5d: Rubén y el Ruso
const CAM_C = (k) => [MUE_R.x + lerp(0.4, 0.46, k), lerp(1.5, 1.38, k), MUE_R.z + lerp(2.0, 2.75, k), MUE_R.x + 0.04, lerp(1.06, 0.84, k), MUE_R.z - 0.3, 46];   // (r2) se abre cuando entra la tarjeta: Rubén y el mate quedan arriba
const CAM_SUP = (k) => [CX + lerp(1.02, 1.04, k), 1.52, lerp(1.45, 1.47, k), CX + lerp(0.84, 0.87, k), 1.32, -2.2, 54];            // Q4: la vereda del súper
const CAM_G = (k) => [40.38 + lerp(0.02, 0, k), 1.5, lerp(0.62, 0.52, k), 40.45, 1.42, GRA.z, 40];                 // Q1g: Graciela de pecho
const CAM_MA = (k) => [MAR.x + lerp(-0.04, -0.05, k), 1.48, lerp(0.56, 0.48, k), MAR.x - 0.05, 1.36, MAR.z, 50];              // Q2: Marta, el cartel y el celular
const PLANOS = [
  ["P1", 0, null],                         // pantalla partida: arriba Graciela, abajo Rubén
  ["P2", T.p2, [[T.p2, ...CAM_R2(0)], [T.p3, ...CAM_R2(1)]]],
  ["P3", T.p3, null],                      // pantalla partida: arriba Marta → Héctor, abajo Rubén
  ["P4b", T.p4b, null],                   // el celular del Ruso en el portavasos (empuje)
  ["P5", T.p5, [[T.p5, ...CAM_OFI(0)], [T.p5b, ...CAM_OFI(1)]]],
  ["P5b", T.p5b, [[T.p5b, ...CAM_R5(0)], [T.p6a, ...CAM_R5(1)]]],
  ["P6a", T.p6a, [[T.p6a, ...CAM_CAFE(0)], [T.p6b, ...CAM_CAFE(1)]]],
  ["P6b", T.p6b, [[T.p6b, ...CAM_MUE(0)], [T.p6i, ...CAM_MUE(1)]]],
  ["P6i", T.p6i, null],                    // el inserto del remito arrugado
  ["P6c", T.p6c, [[T.p6c, ...CAM_DOS(0)], [T.ring3, ...CAM_DOS(1)]]],
  ["P6d", r2(T.ring3 - 0.05), null],       // Rubén con el celular sonando, los ojos cerrados
  // ---- parte 2 ----
  ["Q1", P2, null],
  ["Q1i", T.q1i, null],                    // el aviso en el celular de Graciela
  ["Q1g", T.q1g, [[T.q1g, ...CAM_G(0)], [T.q2, ...CAM_G(1)]]],
  ["Q2i", T.q2, null],                     // (r2) el aviso de Marta a pantalla
  ["Q2", r2(T.q2 + 0.8), [[r2(T.q2 + 0.8), ...CAM_MA(0)], [T.q3, ...CAM_MA(1)]]],
  ["Q3", T.q3, [[T.q3, ...CAM_OFI(0)], [T.q3m, ...CAM_OFI(1)]]],
  ["Q3m", T.q3m, null],                    // el panel: Parada 15 · Súper Héctor
  ["Q4r", T.q4r, null],                    // (r1) la hoja de ruta en el soporte de la cabina: Parada 15 de 18
  ["Q4", T.q4, [[T.q4, ...CAM_SUP(0)], [T.q4i, ...CAM_SUP(1)]]],
  ["Q4i", T.q4i, null],                    // el remito en el celular: la firma, la foto, Entregado ✓
  ["Q4p", T.q4p, null],                    // el panel: 15 de 18
  ["Q5", T.q5, [[T.q5, ...CAM_Q5(0)], [T.q5i, ...CAM_Q5(1)]]],
  ["Q5i", T.q5i, null],                    // el celular del Ruso: 18 de 18
  ["Q5d", T.q5d, [[T.q5d, ...CAM_DOS(0)], [T.c, ...CAM_DOS(1)]]],
  ["C", T.c, [[T.c, ...CAM_C(0)], [T.palabra - 0.05, ...CAM_C(0.08)], [T.palabra + 0.55, ...CAM_C(0.92)], [DUR, ...CAM_C(1)]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.28) console.warn(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); }
const LUGAR = { Q2i: "caf", P1: "split", P2: "ofi", P3: "split", P4: "ofi", P4b: "cab", P4c: "cab", P5: "ofi", P5b: "ofi", P6a: "cal", P6b: "mue", P6i: "mue", P6c: "mue", P6d: "mue", Q1: "split", Q1i: "rot", Q1g: "rot", Q2: "caf", Q3: "ofi", Q3m: "ofi", Q4r: "cab", Q4: "cal", Q4i: "cal", Q4p: "ofi", Q5: "mue", Q5i: "mue", Q5d: "mue", C: "mue" };

// ================= POSES =================
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca = { ...(p.boca || {}), abierta: Math.max(p.boca?.abierta ?? 0, cl(e * 1.1 - 0.05) * k), sonrisa: Math.min(p.boca?.sonrisa ?? 0.1, 0.35) }; p.ojos = { ...(p.ojos || {}), abiertos: Math.max(p.ojos?.abiertos ?? 1, 0.85) }; }
};
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const haciaCam = (cp, x, z, giro, k = 0.8, lim = 0.9) => cl((Math.atan2(cp[0] - x, cp[2] - z) - giro) * k, -lim, lim);
const giroA = (x, z, wx, wz) => Math.atan2(wx - x, wz - z);
const NADA = { ojos: { abiertos: 0.88, tension: 0.15, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.95 } };
const SECO = { ojos: { abiertos: 0.72, tension: 0.25, feliz: 0, x: 0, y: 0 }, cejas: { alto: -0.1, ang: -0.15 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.9 } };
const _q = new THREE.Quaternion();
// el celular en la oreja (lado -1: la derecha del personaje): pegado al costado de la cabeza, inclinado hacia la boca; la
// mano debajo
function alOido(per, cel, lado = -1, sube = 0.2) {
  per.raiz.updateMatrixWorld(true);
  cel.position.copy(per.cabeza.localToWorld(V3(lado * 0.34, sube, 0.04)));
  cel.quaternion.copy(per.cabeza.getWorldQuaternion(_q)); cel.rotateY(-lado * Math.PI * 0.32); cel.rotateX(-0.3);
  cel.updateMatrixWorld(true);
  return aCuerpo(per, cel.localToWorld(V3(0, -0.06, -0.025)));
}
// el celular en la mano, delante del pecho, con la pantalla hacia `mira`
function celEnMano(cel, per, mira, local, giro = 0) {
  per.raiz.updateMatrixWorld(true);
  const p = per.cuerpo.localToWorld(local.clone());
  cel.position.copy(p); cel.lookAt(mira); cel.rotateZ(giro);
  cel.updateMatrixWorld(true);
  return aCuerpo(per, cel.localToWorld(V3(0, -0.075, -0.015)));
}
// ---------- Rubén ----------
const MANO_MATE = [0.2, 0.33, 0.34];
function poseRuben(t, pa, cp, lugar) {
  const pr = { x: RUB.x, y: -0.08, z: RUB.z + 0.04, giro: 0, sentado: 1, inclina: 0.04, cabeza: { giro: 0, asiente: 0.05, ladea: 0.02 }, ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 0.95, feliz: 0.2 }, cejas: { alto: 0.15, ang: 0 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1 }, manoI: MANO_MATE, codoI: [1, -0.6, -0.25], manoD: [-0.22, 0.3, 0.34], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  if (lugar === "mue") {
    Object.assign(pr, { x: MUE_R.x, y: 0, z: MUE_R.z, sentado: 0, giro: giroA(MUE_R.x, MUE_R.z, MUE_U.x, MUE_U.z) + 0.45, inclina: 0.02 });
    if (pa === "C") { pr.giro = giroA(MUE_R.x, MUE_R.z, cp[0], cp[2]); pr.manoI = [0.24, 0.72, 0.3]; pr.codoI = [1, -0.7, -0.2]; Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: 0.02, abiertos: 0.97, feliz: 0.25 }, cejas: { alto: 0.2, ang: 0, asim: 0.3 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1.05 } }); pr.cabeza = { giro: 0, asiente: 0.03, ladea: 0.03 }; bocaVoz(pr, t, T.r10, ENV.r10, 0.6); return pr; }
    if (t < P2) {
      Object.assign(pr, { ...NADA, ojos: { x: 0, y: 0, abiertos: 0.85, tension: 0.2 } });
      if (t >= T.p6i - 0.1) { Object.assign(pr, { ...SECO, ojos: { x: 0, y: -0.2, abiertos: 0.62, tension: 0.4 }, cejas: { alto: -0.15, ang: 0.25, asim: 0.4 } }); }
      if (t >= T.r7 - 0.05) pr.cabeza = { giro: 0.0, asiente: 0.0, ladea: 0.02 };
      if (t >= T.ojos) { Object.assign(pr, { ...CARA.resignado, ojos: { abiertos: 0.0, tension: 0.6, feliz: 0 }, cejas: { alto: 0.35, ang: 0.85 }, boca: { sonrisa: -0.6, abierta: 0, ancho: 0.95 } }); pr.cabeza = { giro: 0, asiente: 0.12, ladea: 0.04 }; }
      bocaVoz(pr, t, T.r6, ENV.r6, 0.6); bocaVoz(pr, t, T.r7, ENV.r7, 0.6);
    } else {
      Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.25, ang: 0, asim: 0.35 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 } });
      bocaVoz(pr, t, T.r9, ENV.r9, 0.6);
    }
    return pr;
  }
  // en la oficina
  const parte2 = t >= P2;
  if (!parte2) {
    if (t < T.p2) { pr.cabeza = { giro: -0.1, asiente: 0.05, ladea: 0.04 }; pr.ojos = { x: -0.2, y: -0.25, abiertos: 0.85, feliz: 0.2 }; }
    else if (t < T.p3) {
      // P2: seguro, canchero, sin mirar nada: los ojos a medio cerrar, la ceja arriba
      Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.25, y: 0.15, abiertos: 0.7, feliz: 0.3 }, cejas: { alto: 0.3, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.05 } });
      pr.inclina = -0.08; pr.cabeza = { giro: 0.15, asiente: -0.06, ladea: 0.06 };
      bocaVoz(pr, t, T.r1, ENV.r1, 0.6);
    } else if (t < T.p4) {
      // P3: cada llamada más hundido
      const k = t < T.p3b ? 0.35 : t < T.c19 ? 0.7 : 1;
      Object.assign(pr, { ...CARA.resignado, ojos: { x: 0, y: -0.4, abiertos: lerp(0.8, 0.42, k), tension: 0.3 * k, feliz: 0 }, cejas: { alto: 0.15 + 0.2 * k, ang: 0.4 + 0.45 * k }, boca: { sonrisa: lerp(0.1, -0.6, k), abierta: 0, ancho: 0.95 } });
      pr.inclina = 0.05 + 0.1 * k; pr.cabeza = { giro: 0, asiente: 0.06 + 0.12 * k, ladea: 0.06 * k };
      bocaVoz(pr, t, T.r2, ENV.r2, 0.45); bocaVoz(pr, t, T.r3, ENV.r3, 0.35);
    } else {
      // P5: "Llegando." sin mirar (los ojos al monitor); el remate: deja el mate y lo mira a Nico
      Object.assign(pr, { ...NADA, ojos: { x: -0.4, y: -0.2, abiertos: 0.8, tension: 0.2 } }); pr.cabeza = { giro: -0.35, asiente: 0.08, ladea: 0.02 };
      if (t >= T.n2 + 0.2) { pr.cabeza = { giro: lerp(-0.35, 0.5, eio(sg(t, T.n2 + 0.2, T.deja + 0.3))), asiente: 0.04, ladea: 0.02 }; }
      if (pa === "P5b") { Object.assign(pr, { ...SECO, ojos: { x: 0, y: 0.05, abiertos: 0.72, tension: 0.3 }, cejas: { alto: 0.05, ang: 0.1, asim: 0.45 } }); pr.cabeza = { giro: haciaCam(cp, RUB.x, RUB.z, 0, 0.85), asiente: 0.03, ladea: 0.03 }; }
      bocaVoz(pr, t, T.r4, ENV.r4, 0.4); bocaVoz(pr, t, T.r5, ENV.r5, 0.6);
    }
  } else {
    Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.3, y: -0.1, abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1.05 } });
    pr.cabeza = { giro: -0.3, asiente: 0.05, ladea: 0.04 };
    if (pa === "Q3" || pa === "Q3m") { pr.cabeza = { giro: lerp(-0.35, 0.45, eio(sg(t, T.gira - 0.1, T.gira + 0.4))), asiente: 0.04, ladea: 0.03 }; bocaVoz(pr, t, T.r4b, ENV.r4, 0.45); bocaVoz(pr, t, T.r8, ENV.r8, 0.6); }
  }
  return pr;
}
// ---------- Nico (en la puerta vidriada, con la carpeta) ----------
const NIC = { x: 1.2, z: PARED + 0.12, giro: -0.4 };
function poseNico(t, pa, cp) {
  const pr = { x: NIC.x, y: 0, z: NIC.z, giro: NIC.giro, inclina: 0.06, cabeza: { giro: -0.35, asiente: 0.04, ladea: 0.05 }, ...CARA.sonrisa, ojos: { x: -0.4, y: 0, abiertos: 1, feliz: 0.2 }, cejas: { alto: 0.35, ang: 0.2 }, boca: { sonrisa: 0.4, abierta: 0, ancho: 1 }, manoI: [0.16, 0.32, 0.3], codoI: [1, -0.6, -0.2], manoD: [-0.29, -0.08, 0.04], codoD: [-1, 0.2, -0.2], dedoI: 0, dedoD: 0, t };
  const n1 = t < P2 ? T.n1 : T.n1b, n2 = t < P2 ? T.n2 : T.n2b;
  if (t >= n2 - 0.05) { Object.assign(pr, { ...CARA.sorpresa, ojos: { x: -0.4, y: 0, abiertos: 1, feliz: 0 }, cejas: { alto: 0.75, ang: 0.3 }, boca: { sonrisa: 0.2, abierta: 0, ancho: 0.8 } }); }
  if (t < P2 && t >= T.r5 + 0.3) { Object.assign(pr, { ...CARA.incredula, ojos: { x: -0.4, y: 0, abiertos: 0.7 }, cejas: { alto: 0.5, ang: 0.45, asim: 0.5 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.85 } }); }
  if (t >= P2 && t >= T.r8) { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.2, y: 0, abiertos: 1, feliz: 0.35 }, cejas: { alto: 0.45, ang: 0.2 } }); }
  bocaVoz(pr, t, n1, ENV.n1, 0.7); bocaVoz(pr, t, n2, ENV.n2, 0.7);
  return pr;
}
// ---------- Graciela (detrás del mostrador de la rotisería) ----------
function poseGraciela(t, pa) {
  const pr = { x: GRA.x, y: GRA_Y, z: GRA.z, giro: 0, inclina: 0.02, cabeza: { giro: 0.15, asiente: 0.05, ladea: 0.05 }, ...CARA.neutra, ojos: { x: 0.2, y: 0.1, abiertos: 1, feliz: 0 }, cejas: { alto: 0.45, ang: 0.35 }, boca: { sonrisa: 0.1, abierta: 0, ancho: 0.95 }, manoI: [0.3, 0.3, 0.38], codoI: [1, -0.4, -0.2], manoD: [-0.3, 0.3, 0.38], codoD: [-1, -0.4, -0.2], dedoI: 0, dedoD: 0, t };
  if (t < P2) { bocaVoz(pr, t, T.g1, ENV.g1, 0.7); pr.cabeza = { giro: 0.1 + 0.08 * Math.sin(t * 2.2), asiente: 0.0, ladea: 0.08 }; }
  else {
    Object.assign(pr, { ...CARA.neutra, ojos: { x: 0, y: -0.7, abiertos: 0.95, feliz: 0 }, cejas: { alto: 0.3, ang: 0.15 } }); pr.cabeza = { giro: -0.05, asiente: 0.3, ladea: 0.03 };
    if (t >= T.aviso1 + 0.1) Object.assign(pr, { ...CARA.sorpresa, ojos: { x: 0, y: -0.7, abiertos: 1, feliz: 0 }, cejas: { alto: 0.85, ang: 0.25 }, boca: { sonrisa: 0.25, abierta: 0, ancho: 0.8 } });
    if (pa === "Q1g") { Object.assign(pr, { ...CARA.feliz, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.35 }, cejas: { alto: 0.55, ang: 0.25 } }); pr.cabeza = { giro: 0.05, asiente: 0.05, ladea: 0.06 }; }
    bocaVoz(pr, t, T.g2, ENV.g2, 0.7);
  }
  return pr;
}
// ---------- Marta (detrás del mostrador de la cafetería) ----------
function poseMarta(t, pa) {
  const pr = { x: MAR.x, y: MAR_Y, z: MAR.z, giro: -0.15, inclina: 0.02, cabeza: { giro: -0.1, asiente: 0.04, ladea: 0.04 }, ...CARA.neutra, ojos: { x: -0.1, y: 0, abiertos: 1, feliz: 0 }, cejas: { alto: 0.4, ang: 0.3 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.95 }, manoI: [0.3, 0.3, 0.38], codoI: [1, -0.4, -0.2], manoD: [-0.3, 0.3, 0.38], codoD: [-1, -0.4, -0.2], dedoI: 0, dedoD: 0, t };
  if (t < P2) bocaVoz(pr, t, T.m1, ENV.m1, 0.7);
  else {
    Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.5, y: -0.5, abiertos: 1, feliz: 0.2 }, cejas: { alto: 0.3, ang: 0 } }); pr.cabeza = { giro: -0.45, asiente: 0.2, ladea: 0.03 }; pr.ojos = { x: -0.6, y: -0.5, abiertos: 1, feliz: 0.2 };
    if (t >= T.m2 + 0.4) { pr.cabeza = { giro: 0.0, asiente: 0.03, ladea: 0.04 }; pr.ojos = { x: 0, y: 0, abiertos: 1, feliz: 0.3 }; }
    bocaVoz(pr, t, T.m2, ENV.m2, 0.7);
  }
  return pr;
}
// ---------- Héctor (en la puerta del súper) ----------
const HEC = { x: CX + 0.15, z: -2.3 };
function poseHector(t, pa) {
  const pr = { x: HEC.x, y: VER, z: HEC.z, giro: 0.15, inclina: 0.02, cabeza: { giro: 0.1, asiente: 0.04, ladea: 0.04 }, ...CARA.sonrisa, ojos: { x: 0.1, y: 0, abiertos: 1, feliz: 0.2 }, cejas: { alto: 0.3, ang: 0.1 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1 }, manoI: [0.29, -0.06, 0.04], codoI: [1, 0.2, -0.2], manoD: [-0.29, -0.06, 0.04], codoD: [-1, 0.2, -0.2], dedoI: 0, dedoD: 0, t };
  if (t < P2) { bocaVoz(pr, t, T.h1, ENV.h1, 0.7); }
  else {
    pr.giro = 0.55; pr.cabeza = { giro: 0.0, asiente: 0.25, ladea: 0.03 }; pr.ojos = { x: 0, y: -0.5, abiertos: 1, feliz: 0.1 };
    Object.assign(pr, { cejas: { alto: 0.7, ang: 0.3 } });
    if (t >= T.u3 + CORTE.u3) { Object.assign(pr, { ...CARA.feliz, ojos: { x: 0, y: -0.3, abiertos: 1, feliz: 0.4 } }); }
    bocaVoz(pr, t, T.h2, ENV.h2, 0.7);
  }
  return pr;
}
// ---------- el Ruso ----------
const RUS_CAF = { x: CX + CAFX - 0.62, z: -2.45 }, RUS_SUP = { x: CX + 1.35, z: -2.0 };
function poseRuso(t, pa, cp, lugar) {
  const pr = { x: 0, y: 0, z: 0, giro: 0, inclina: 0.03, cabeza: { giro: 0, asiente: 0.04, ladea: 0.02 }, ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 0.95, feliz: 0 }, cejas: { alto: 0.1, ang: 0 }, boca: { sonrisa: 0.15, abierta: 0, ancho: 1 }, manoI: [0.29, -0.06, 0.04], codoI: [1, 0.2, -0.2], manoD: [-0.29, -0.06, 0.04], codoD: [-1, 0.2, -0.2], dedoI: 0, dedoD: 0, t };
  if (lugar === "cab") {
    Object.assign(pr, { x: CBX + RUSO_C.x, y: -0.06, z: RUSO_C.z, giro: Math.PI, sentado: 1, inclina: 0.06, cabeza: { giro: 0.05 * Math.sin(t * 1.3), asiente: -0.02, ladea: 0.01 }, ojos: { x: 0, y: 0.05, abiertos: 0.95 } });
    return pr;   // las manos al volante se ponen en renderAt (aCuerpo)
  }
  if (lugar === "cal" && t < P2) {
    // P6a: golpea la persiana con la derecha (de perfil, mirando a -z)
    Object.assign(pr, { x: RUS_CAF.x, y: VER, z: RUS_CAF.z, giro: Math.PI - 1.15, ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 0.9 }, cejas: { alto: 0.4, ang: 0.3 } });
    return pr;
  }
  if (lugar === "cal") {
    Object.assign(pr, { x: RUS_SUP.x, y: VER, z: RUS_SUP.z, giro: giroA(RUS_SUP.x, RUS_SUP.z, HEC.x, HEC.z) + 0.55, ...CARA.sonrisa, ojos: { x: 0, y: -0.1, abiertos: 0.95, feliz: 0.2 } });
    bocaVoz(pr, t, T.u3, ENV.u3, 0.6);
    return pr;
  }
  // en el muelle
  Object.assign(pr, { x: MUE_U.x, y: 0, z: MUE_U.z, giro: giroA(MUE_U.x, MUE_U.z, MUE_R.x, MUE_R.z) - 0.4 });
  if (pa === "P6c" || pa === "Q5d" || pa === "Q5") { pr.x = MUE_U2.x; pr.z = MUE_U2.z; pr.giro = giroA(MUE_U2.x, MUE_U2.z, MUE_R.x, MUE_R.z) - 0.4; }   // en el dos-shot se arrima (el corte del inserto lo tapa)
  if (t < P2) {
    if (t >= T.u1 - 0.1) { Object.assign(pr, { ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 0.85, feliz: 0 }, cejas: { alto: 0.35, ang: 0.2 }, boca: { sonrisa: 0.2, abierta: 0, ancho: 1 } }); }
    if (t >= T.u2 - 0.05) { pr.cejas = { alto: 0.55, ang: 0.3, asim: 0.3 }; pr.manoI = [0.3, 0.2, 0.2]; pr.manoD = [-0.3, 0.2, 0.2]; pr.codoI = [1, -0.3, -0.2]; pr.codoD = [-1, -0.3, -0.2]; }
    bocaVoz(pr, t, T.u1, ENV.u1, 0.6); bocaVoz(pr, t, T.u2, ENV.u2, 0.6);
  } else {
    Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.25, ang: 0 } });
    bocaVoz(pr, t, T.u4, ENV.u4, 0.6);
  }
  return pr;
}
// la costura de la pantalla partida (una franja navy con un filo crema en y = 960)
const costura = (() => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: C.navy })); g.add(b); const l = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: C.cr })); l.position.z = 0.001; l.userData.orden = 1; g.add(l); g.userData = { b, l }; return pegarACamara(g, camera, 36); })();
function ponerCostura(on) { costura.visible = on; if (!on) return; const k = halfK(); costura.position.set(0, 0, -1); costura.scale.setScalar(k); costura.userData.b.scale.set(1100, 18, 1); costura.userData.l.scale.set(1100, 6, 1); }

// ================= RENDER =================
const manoG = crearManoInserto(ELENCO.clienta.piel, C.g); scene.add(manoG);
const manoMa = crearManoInserto(ELENCO.duena.piel, C.cr); scene.add(manoMa); manoMa.traverse((o) => { if (o.isMesh && o.geometry.type === "SphereGeometry" && o.scale.x < 0.01) o.material = mat(0x8a5a40, 0.45); });   // (r2) la uña clara se leía como un palito blanco
const manoRu = crearManoInserto(ELENCO.ruso.piel, C.navy); manoRu.userData.manga.visible = false; scene.add(manoRu);
const LUCES = { ofi: [sol, cielo, relleno, luzDep], rot: [luzRot, cieloRot], caf: [luzCaf, cieloCaf], cal: [luzCal, cieloCal], cab: [luzCab, cieloCab], mue: [luzMue, cieloMue] };
const INTENS = new Map(); for (const k in LUCES) for (const l of LUCES[k]) INTENS.set(l, l.intensity);
function ponerLuces(lugar) { for (const key in LUCES) for (const l of LUCES[key]) { l.visible = key === lugar; l.intensity = INTENS.get(l); } }
const FONDO = { ofi: 0x34507a, rot: 0xf4f4ef, caf: 0xefeee5, cal: 0xe7eef3, cab: 0xe9eef2, mue: 0xf0dcc0 };
const GRUPOS = { ofi: [OF, FUERA], rot: [ROT], caf: [CAF], cal: [CAL], cab: [CAB], mue: [MUE] };
function verLugares(L) { for (const k in GRUPOS) for (const g of GRUPOS[k]) g.visible = L.includes(k); }
const camA = new THREE.PerspectiveCamera(40, 1080 / 960, 0.02, 160), camB = new THREE.PerspectiveCamera(40, 1080 / 960, 0.02, 160);
scene.add(camA, camB);
function ponerCamX(cam, v) { cam.position.set(v[0], v[1], v[2]); cam.up.set(0, 1, 0); cam.fov = v[6]; cam.updateProjectionMatrix(); cam.lookAt(v[3], v[4], v[5]); cam.updateMatrixWorld(true); }
// las cámaras de la pantalla partida
const SPLIT_ROT = (k) => [GRA.x + lerp(-0.34, -0.32, k), 1.72, lerp(0.15, 0.05, k), GRA.x - 0.46, 1.78, GRA.z, 44];
const SPLIT_OFI = (k) => [lerp(0.3, 0.26, k), 1.32, lerp(0.68, 0.56, k), RUB.x - 0.54, 1.02, RUB.z + 0.1, 46];
const SPLIT_CAF = (k) => [MAR.x + lerp(-0.1, -0.08, k), 1.62, lerp(-0.05, -0.15, k), MAR.x - 0.2, 1.52, MAR.z, 44];
const SPLIT_SUP = (k) => [HEC.x + lerp(0.15, 0.12, k), 1.7, lerp(-0.6, -0.7, k), HEC.x - 0.28, 1.67, HEC.z, 44];
// los objetos sueltos que se esconden en cada cuadro
const SUELTOS = [manoMa, celR, celG, celMa, celH, celRu, mate, carpeta, cartelMano, fajo, remitoG, zorra, camion, chip3d, manoR, manoH, manoG, manoRu, ...manosRem, ...cajasPila];
function renderAt(tIn) {
  AVISOS.length = 0; PROY = null;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual, lugar = LUGAR[pa], split = lugar === "split";
  const cp = pl[2] ? catmull(pl[2], t) : [0, 0, 0, 0, 0, 0, 50];
  const arriba = pa === "P3" ? (t < T.p3b ? "caf" : "cal") : "rot";
  verLugares(split ? [arriba, "ofi"] : [lugar]);
  for (const o of SUELTOS) o.visible = false;
  for (const p of TODOS) p.raiz.visible = false;
  // ---- objetos y pantallas ----
  dibujarCelR(t); dibujarCelRu(t); dibujarCelG(t); dibujarCelMa(t); dibujarCelH(t); dibujarMon(t);
  for (const [i, b] of spiedoBarras.entries()) b.rotation.x = t * 1.6 + i * 0.9;
  moverRambla(t);
  persiana.visible = !parte2;
  monitor.rotation.y = MON.ry - (parte2 ? 0.28 * eio(sg(t, T.gira - 0.1, T.gira + 0.35)) : 0);
  // ---- la oficina: Rubén sentado con el mate, el celular en el escritorio, Nico en la puerta ----
  const enOfi = split || lugar === "ofi";
  if (enOfi) {
    celR.visible = true; celR.position.copy(CELR0); celR.rotation.set(-Math.PI / 2, 0, 0.35);
    const vib = (t >= T.ring1 - 0.1 && t < T.m1 - 0.08) || (t >= T.ring2 - 0.1 && t < T.h1 - 0.08);
    if (vib) celR.position.x += Math.sin(t * 170) * 0.003;
    if (pa !== "P4") {
      ruben.raiz.visible = true; const pr = poseRuben(t, pa, cp, "ofi"); ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
      // el mate en la izquierda (sorbo al final de "Está llegando."); en el remate lo deja en el escritorio
      mate.visible = true;
      const deja = !parte2 && t >= T.deja && t < P1 ? eio(sg(t, T.deja, T.deja + 0.25)) : 0;
      const enMesa = V3(-0.05, DESK.y, -0.95);
      if (deja >= 1) { mate.position.copy(enMesa); mate.rotation.set(0, 0, 0); }
      else {
        const m = ruben.brazos[0].mano.getWorldPosition(_w).clone().add(V3(0, -0.07, 0));
        let so = 0;
        if (!parte2) so = Math.sin(Math.PI * sg(t, T.r1 + LEN.r1 + 0.02, T.r1 + LEN.r1 + 0.75)) * (t < T.p3 ? 1 : 0);
        else so = Math.sin(Math.PI * sg(t, P2 + 0.3, P2 + 1.2));
        mate.rotation.set(0, Math.PI / 2, 0.35 * so); mate.position.copy(m);
        if (so > 0) { const boca = ruben.cabeza.localToWorld(V3(0.0, 0.1, 0.33)); mate.updateMatrixWorld(true); const punta = V3(0.075, 0.305, 0).multiplyScalar(1.1).applyEuler(mate.rotation); mate.position.lerp(boca.sub(punta), so); }
        if (deja > 0) mate.position.lerp(enMesa, deja);
      }
      if (!parte2 && t >= T.deja + 0.2 && t < P1) { pr.manoI = [0.24, 0.26, 0.38]; ruben.poner(pr); }
      // Q3: la mano derecha gira el monitor
      if (parte2 && (pa === "Q3" || pa === "Q3m")) { const k = Math.sin(Math.PI * sg(t, T.gira - 0.3, T.gira + 0.5)); if (k > 0) { monitor.updateMatrixWorld(true); pr.manoD = lerpV(pr.manoD, aCuerpo(ruben, monitor.localToWorld(V3(MON.W / 2 + 0.02, 0.4, 0.0))), k); ruben.poner(pr); } }
      // P3: atiende con un toque en el celular cuando suena
      for (const ta of [T.m1, T.h1]) { const k = Math.sin(Math.PI * sg(t, ta - 0.4, ta + 0.05)); if (!parte2 && k > 0) { pr.manoD = lerpV(pr.manoD, aCuerpo(ruben, CELR0.clone().add(V3(0.0, 0.05, 0.02))), k); ruben.poner(pr); } }
    }
    if (["P5", "P5b", "Q3", "Q3m"].includes(pa)) {
      nico.raiz.visible = true; nico.poner(poseNico(t, pa, cp)); nico.raiz.updateMatrixWorld(true);
      carpeta.visible = true; nico.brazos[0].mano.getWorldPosition(_w); carpeta.position.copy(_w).add(V3(0.0, 0.08, 0.02)); carpeta.rotation.set(-0.2, NIC.giro, 0.1);
    }
  }
  // ---- la rotisería: Graciela ----
  if (split ? arriba === "rot" : lugar === "rot") {
    graciela.raiz.visible = pa !== "Q1i"; const pg = poseGraciela(t, pa);
    graciela.poner(pg);
    celG.visible = true;
    if (!parte2) { pg.manoI = alOido(graciela, celG, 1); pg.codoI = [1, -0.2, -0.3]; graciela.poner(pg); alOido(graciela, celG, 1); }
    else if (pa !== "Q1i") {
      const baja = pa === "Q1g" ? eio(sg(t, T.g2 + 0.2, T.g2 + 0.8)) : 0;
      pg.manoD = celEnMano(celG, graciela, graciela.cabeza.localToWorld(V3(0, 0, 0.3)), V3(-0.12, lerp(0.42, 0.3, baja), 0.4), 0); pg.codoD = [-0.8, -0.8, -0.2]; graciela.poner(pg);
      celEnMano(celG, graciela, graciela.cabeza.localToWorld(V3(0, 0, 0.3)), V3(-0.12, lerp(0.42, 0.3, baja), 0.4), 0);
      if (en(t, T.aviso1 - 0.15, T.aviso1 + 0.25)) celG.position.x += Math.sin(t * 160) * 0.003;
    }
  }
  // ---- la cafetería: Marta ----
  if (split ? arriba === "caf" : lugar === "caf") {
    marta.raiz.visible = true; const pm = poseMarta(t, pa); marta.poner(pm);
    celMa.visible = true;
    if (!parte2) { pm.manoI = alOido(marta, celMa, 1); pm.codoI = [1, -0.2, -0.3]; marta.poner(pm); alOido(marta, celMa, 1); }
    else {
      celMa.scale.setScalar(1.8); { const cam = V3(cp[0], cp[1], cp[2]); pm.manoD = celEnMano(celMa, marta, cam, V3(-0.24, 0.52, 0.56), 0); pm.codoD = [-0.8, -0.8, -0.2]; marta.poner(pm); celEnMano(celMa, marta, cam, V3(-0.24, 0.52, 0.56), 0); }
      // el cartel "Fui al banco" en la mano izquierda; lo guarda (baja) después de "a la una"
      cartelMano.visible = true;
      const guarda = eio(sg(t, T.cajon - 0.2, T.cajon + 0.25));
      pm.manoI = [0.24, lerp(0.42, 0.05, guarda), 0.34]; pm.codoI = [1, -0.5, -0.2]; marta.poner(pm); marta.raiz.updateMatrixWorld(true);
      marta.brazos[0].mano.getWorldPosition(_w); cartelMano.position.copy(_w).add(V3(0.06, 0.14, 0.04)); cartelMano.rotation.set(-0.1, marta.raiz.rotation.y + 0.1, 0.06);
      if (guarda > 0.45) cartelMano.visible = false;   // (r1) se guarda antes de pasar por el mostrador
    }
  }
  // ---- la calle: Héctor en la puerta del súper (P3, Q4); el Ruso y el camión (P6a, Q4) ----
  if (split ? arriba === "cal" : lugar === "cal") {
    if (pa === "P3" || parte2) { hector.raiz.visible = true; const ph = poseHector(t, pa); hector.poner(ph); if (!parte2) { celH.visible = true; ph.manoD = alOido(hector, celH, -1); ph.codoD = [-1, -0.2, -0.3]; hector.poner(ph); alOido(hector, celH, -1); } }
    if (pa === "P6a" || parte2) {
      camion.visible = true; camion.rotation.set(0, Math.PI / 2, 0); ponerPuertas(parte2 ? 1.6 : 0.05);
      camion.position.set(parte2 ? CX + 2.6 : CX + CAFX + 2.2, 0, 1.45);
      for (const c of cargaCam) c.visible = !parte2;
      ruso.raiz.visible = true; const pu = poseRuso(t, pa, cp, "cal");
      zorra.visible = true;
      if (!parte2) {
        // los golpes en la persiana (puño derecho)
        let g = 0; for (const tg of T.golpes) g = Math.max(g, Math.sin(Math.PI * sg(t, tg - 0.12, tg + 0.06)));
        ruso.poner(pu); persiana.updateMatrixWorld(true);
        const golpe = persiana.localToWorld(V3(-0.3, -0.95, 0.06 + 0.12 * (1 - g)));
        pu.manoI = aCuerpo(ruso, golpe); pu.codoI = [1, -0.3, -0.2]; pu.dedoI = 0; ruso.poner(pu);
        zorra.position.set(RUS_CAF.x - 0.6, VER, RUS_CAF.z + 0.3); zorra.rotation.set(0, 0.4, 0);
      } else {
        ruso.poner(pu);
        zorra.position.set(RUS_SUP.x + 0.55, VER, RUS_SUP.z + 0.25); zorra.rotation.set(0, -0.6, 0);
        // le extiende el celular a Héctor
        celRu.visible = true; celRu.scale.setScalar(1.25);
        const mira = hector.cabeza.localToWorld(V3(0, 0, 0.3)).lerp(V3(cp[0], cp[1], cp[2]), 0.55); celRu.scale.setScalar(1.5);
        pu.manoD = celEnMano(celRu, ruso, mira, V3(-0.1, 0.45, 0.48), 0); pu.codoD = [-0.8, -0.6, -0.2]; ruso.poner(pu);
        celEnMano(celRu, ruso, mira, V3(-0.1, 0.45, 0.48), 0);
      }
    }
  }
  // ---- la cabina: el Ruso maneja, el celular vibra en el portavasos ----
  if (lugar === "cab") {
    ruso.raiz.visible = true; const pu = poseRuso(t, pa, cp, "cab"); ruso.poner(pu); CAB.updateMatrixWorld(true);
    const a = 0.03 * Math.sin(t * 1.1);
    pu.manoI = aCuerpo(ruso, CAB.localToWorld(V3(VOL.x + 0.17 * Math.cos(a) + 0.0, VOL.y + 0.04, VOL.z + 0.03))); pu.manoD = aCuerpo(ruso, CAB.localToWorld(V3(VOL.x - 0.17, VOL.y + 0.04 + a, VOL.z + 0.03)));
    pu.codoI = [1, -0.6, 0.2]; pu.codoD = [-1, -0.6, 0.2]; ruso.poner(pu);
    volante.rotation.z = a * 2;
    celRu.visible = true; celRu.scale.setScalar(1.2);
    portavasos.updateMatrixWorld(true);
    if (pa === "Q4r" || pa === "P4b") { celRu.scale.setScalar(pa === "P4b" ? 1.15 : 1); CAB.updateMatrixWorld(true); celRu.position.copy(CAB.localToWorld(V3(-0.02, 1.27, -0.6))); celRu.rotation.set(-0.3, 0.28, 0); }
    else { celRu.position.copy(portavasos.localToWorld(V3(0, 0.075, 0.0))); celRu.rotation.set(-0.25, 0.35, 0); }
    const vib = en(t, T.p4b, T.p4b + 0.55) || en(t, T.p4b + 0.75, T.p4b + 1.3);
    if (vib) { celRu.position.x += Math.sin(t * 170) * 0.0035; celRu.rotation.z = Math.sin(t * 130) * 0.04; }
  }
  // ---- el muelle: el camión de culata, el Ruso, Rubén, las cajas, los remitos ----
  if (lugar === "mue") {
    camion.visible = true; camion.rotation.set(0, -Math.PI / 2, 0); camion.position.set(MX + 1.0, 0, -1.4);
    const abre = 1;   // (r2) abiertas desde el primer cuadro: la hoja ya no barre la cabeza del Ruso
    ponerPuertas(lerp(0.05, 2.75, abre));
    // las 6 cajas: adentro hasta que bajan (de a una, con un arco) a la pila del piso; en la parte 2, el camión vacío
    const PILA = V3(MX + 1.8, 0, 0.62);
    cargaCam.forEach((c, i) => { c.visible = false; });
    if (!parte2) cajasPila.forEach((c, i) => {
      c.visible = true;
      const u = eio(sg(t, T.baja + i * 0.17, T.baja + i * 0.17 + 0.3));
      cargaCam[i].updateMatrixWorld(true); camion.updateMatrixWorld(true);
      const ori = cargaCam[i].getWorldPosition(new THREE.Vector3());
      const dest = PILA.clone().add(V3((i % 3) * 0.52 - 0.52, 0.19 + Math.floor(i / 3) * 0.39, 0));
      c.position.copy(ori.clone().lerp(dest, u)); c.position.y += Math.sin(Math.PI * u) * 0.35;
      c.rotation.set(0, lerp(0, 0.2 * (i % 2 ? 1 : -1), u) + Math.PI / 2 * (1 - u), 0);
    });
    ruben.raiz.visible = pa !== "P6i"; ruso.raiz.visible = pa !== "P6i" && pa !== "Q5i" && pa !== "C";
    const pr = poseRuben(t, pa, cp, "mue"), pu = poseRuso(t, pa, cp, "mue");
    ruben.poner(pr); ruso.poner(pu); ruben.raiz.updateMatrixWorld(true); ruso.raiz.updateMatrixWorld(true);
    mate.visible = true; ruben.brazos[0].mano.getWorldPosition(_w); mate.position.copy(_w).add(V3(0, -0.07, 0)); mate.rotation.set(0, ruben.raiz.rotation.y + Math.PI / 2, 0);
    if (!parte2) {
      // el fajo: en la mano del Ruso, se lo da a Rubén (T.fajo) y Rubén lo sostiene
      const da = eio(sg(t, T.fajo - 0.1, T.fajo + 0.35));
      fajo.visible = pa === "P6b" || pa === "P6c";
      if (pa === "P6b") {
        if (t < T.fajo - 0.1) { pu.manoD = [-0.3, 0.35, 0.3]; pu.codoD = [-1, -0.6, -0.2]; }
        else { pu.manoD = lerpV([-0.3, 0.35, 0.3], [-0.05, 0.42, 0.55], Math.sin(Math.PI * Math.min(1, da * 1.3))); }
        ruso.poner(pu); ruso.raiz.updateMatrixWorld(true);
        const mR = ruso.brazos[1].mano.getWorldPosition(new THREE.Vector3());
        if (da > 0.5) { pr.manoD = [-0.15, 0.4, 0.42]; ruben.poner(pr); ruben.raiz.updateMatrixWorld(true); }
        const mB = ruben.brazos[1].mano.getWorldPosition(new THREE.Vector3());
        fajo.position.copy(da < 0.5 ? mR : mB).add(V3(0, 0.1, 0)); fajo.rotation.set(-0.3, ruben.raiz.rotation.y + Math.PI, 0.1);
      }
      if (pa === "P6c" || pa === "P6d") {
        // Rubén con un remito desplegado en la derecha (lo mira); en P6d el celular
        pr.manoD = [-0.12, 0.45, 0.4]; pr.codoD = [-1, -0.6, -0.2]; ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
        const mB = ruben.brazos[1].mano.getWorldPosition(new THREE.Vector3());
        remitoG.visible = pa === "P6c"; remitoG.scale.setScalar(1); remitoG.position.copy(mB).add(V3(0, 0.14, 0.02)); remitoG.lookAt(ruben.cabeza.localToWorld(V3(0, 0.2, 0.8))); remitoG.rotateX(0.3);
        fajo.visible = false;
      }
      if (pa === "P6d") {
        celR.visible = true; celR.scale.setScalar(1.6);
        pr.manoD = celEnMano(celR, ruben, camera.position.clone(), V3(-0.1, 0.5, 0.42), 0.0); pr.codoD = [-1, -0.7, -0.1]; ruben.poner(pr);
      }
    } else {
      // el Ruso con el celular en alto (18 de 18)
      celRu.visible = pa !== "C"; celRu.scale.setScalar(1.35);
      if (pa === "Q5" || pa === "Q5d") { pu.manoD = celEnMano(celRu, ruso, ruben.cabeza.localToWorld(V3(0, 0, 0.3)).lerp(V3(cp[0], cp[1], cp[2]), 0.6), V3(-0.14, 0.52, 0.42), 0); pu.codoD = [-1, -0.6, -0.2]; ruso.poner(pu); celEnMano(celRu, ruso, ruben.cabeza.localToWorld(V3(0, 0, 0.3)).lerp(V3(cp[0], cp[1], cp[2]), 0.6), V3(-0.14, 0.52, 0.42), 0); }
    }
  }
  // ---- cámara ----
  if (pl[2]) { ponerCam(catmull(pl[2], t), t); camera.updateMatrixWorld(true); }
  if (pa === "Q4r") camPantalla(celRu, V3(0, -0.06, 0.0075), V3(0, 0, 1), 0.172, lerp(0.36, 0.44, eo(sg(t, T.q4r, T.q4))), 40, t);
  if (pa === "P4b") ponerCam(lerpV(CAB_A, [CBX + 0.38, 1.34, 0.12, CBX - 0.03, 1.25, -0.6, 36], eo(sg(t, T.p4b, T.p5))), t);
  if (pa === "P4c") ponerCam(lerpV(CAB_B, [CBX + 0.88, 1.45, -0.62, CBX - 0.45, 1.32, 0.1, 66], sg(t, T.rotCab, T.p5)), t);
  if (pa === "P4") {
    // el inserto: el celular de Rubén en el escritorio, desde arriba; el dedo toca Llamar
    ruben.raiz.visible = false; mate.visible = false;
    celR.visible = true; manoR.visible = true;
    camPantalla(celR, V3(0, 0.0, 0.0075), V3(0, 0, 1), 0.172 * 1.3, 0.62, 36, t, 0.03 * (1 - eo(sg(t, T.p4, T.p4 + 0.6))));
    celR.updateMatrixWorld(true);
    const toca = Math.sin(Math.PI * sg(t, T.tap - 0.2, T.tap + 0.12));
    const boton = V3(0, (0.5 - 905 / 1215) * 0.166, 0.0075), punta = V3(0.02 - 0.062 * Math.sin(0.5), 0.062 * Math.cos(0.5), 0);
    const pos = V3(0.07, -0.16, 0.03).lerp(boton.clone().sub(punta).add(V3(0, 0, 0.012)), Math.max(toca, sg(t, T.p4, T.tap - 0.2) * 0.6));
    manoR.position.copy(celR.localToWorld(pos)); manoR.quaternion.copy(celR.getWorldQuaternion(_q));
    manoR.userData.pulgar.rotation.set(0, 0, 0.5); manoR.userData.pulgar.position.set(0.02, 0, 0.019);
  }
  if (pa === "P6i") {
    // el inserto del remito arrugado en las manos de Rubén (la mancha, el garabato, el "¿?")
    remitoG.visible = true; remitoG.scale.setScalar(1);
    remitoG.position.set(MUE_R.x - 0.15, 1.3, MUE_R.z + 0.3); remitoG.rotation.set(-0.15, 0.35, 0.05);
    const u = eo(sg(t, T.p6i, T.p6i + 0.35));
    camPantalla(remitoG, V3(0, 0.02, 0), V3(0, 0, 1), 0.28, lerp(0.5, 0.58, u), 36, t);
    remitoG.updateMatrixWorld(true);
    manosRem.forEach((m, i) => { m.visible = true; const s = i ? 1 : -1; m.position.copy(remitoG.localToWorld(V3(s * 0.125, -0.19, -0.015))); m.quaternion.copy(remitoG.getWorldQuaternion(_q)); m.rotateZ(s * 0.5); m.userData.pulgar.rotation.set(0, 0, 0.3 * s); m.userData.pulgar.position.set(0.02, 0.02, 0.016); });
  }
  if (pa === "P6d") {
    const h = ruben.cabeza.localToWorld(V3(0, 0.1, 0)), f = V3(Math.sin(ruben.raiz.rotation.y), 0, Math.cos(ruben.raiz.rotation.y));
    const p = h.clone().addScaledVector(f, 2.1).add(V3(0.1, -0.05, 0));
    ponerCam([p.x, p.y, p.z, h.x, h.y - 0.12, h.z, 44], t);
    camera.updateMatrixWorld(true);
    ruso.raiz.visible = false;   // (r2) quedaba su mano como una mancha abajo a la izquierda
    const pr = poseRuben(t, pa, cp, "mue"); pr.manoD = celEnMano(celR, ruben, camera.position.clone(), V3(-0.1, 0.5, 0.42), 0.0); pr.codoD = [-1, -0.7, -0.1]; ruben.poner(pr); celEnMano(celR, ruben, camera.position.clone(), V3(-0.1, 0.5, 0.42), 0.0);
    ruben.raiz.updateMatrixWorld(true); ruben.brazos[0].mano.getWorldPosition(_w); mate.position.copy(_w).add(V3(0, -0.07, 0));
  }
  if (pa === "Q2i") {
    // (r2) el aviso de Marta a pantalla (como el de Graciela): la mano la sostiene de costado
    marta.raiz.visible = false; cartelMano.visible = false;
    celMa.visible = true; celMa.scale.setScalar(1); celMa.position.set(MAR.x - 0.1, 1.32, -0.75); celMa.rotation.set(-0.06, -0.15, 0.02);
    camPantalla(celMa, V3(0, 0.012, 0.0075), V3(0, 0, 1), 0.172, 0.54, 36, t, 0.025 * (1 - eo(sg(t, T.q2, T.q2 + 0.5))));
    celMa.updateMatrixWorld(true); manoMa.visible = true; manoMa.position.copy(celMa.localToWorld(V3(0.036, -0.12, 0.004))); manoMa.quaternion.copy(celMa.getWorldQuaternion(_q)); manoMa.userData.pulgar.rotation.set(0, 0, 0.22); manoMa.userData.pulgar.position.set(0.022, 0, 0.006);
  }
  if (pa === "Q1i") {
    // el celular de Graciela a pantalla (sin Graciela): la mano verde que lo sostiene
    celG.visible = true; celG.scale.setScalar(1); celG.position.set(GRA.x + 0.05, 1.3, -1.2); celG.rotation.set(-0.08, 0.12, 0.02);
    camPantalla(celG, V3(0, 0.0, 0.0075), V3(0, 0, 1), 0.172, 0.54, 36, t, 0.03 * (1 - eo(sg(t, T.q1i, T.q1i + 0.5))));
    celG.updateMatrixWorld(true); manoG.visible = true; manoG.position.copy(celG.localToWorld(V3(0.028, -0.112, 0.004))); manoG.quaternion.copy(celG.getWorldQuaternion(_q)); manoG.userData.pulgar.rotation.set(0, 0, 0.06); manoG.userData.pulgar.position.set(0.022, 0, 0.006);
  }
  if (pa === "Q3m" || pa === "Q4p") {
    // el panel de entregas a pantalla
    ruben.raiz.visible = nico.raiz.visible = mate.visible = carpeta.visible = false;
    monitor.updateMatrixWorld(true);
    const u = eio(sg(t, pl[1], pl[1] + 0.45));
    camPantalla(monitor, monitor.userData.centro, V3(0, 0, 1), MON.W / (1080 / 1920), lerp(0.82, 0.94, u), 40, t);
    if (pa === "Q4p") {
      const v = sg(t, T.vuela, T.vuela + 0.45);
      if (v < 1) {
        chip3d.visible = true; camera.updateMatrixWorld(true);
        const dest = monitor.localToWorld(V3(((760 / 1280) - 0.5) * MON.W, 0.14 + MON.H / 2 + (0.5 - 676 / 896) * MON.H, 0.06));
        const ori = camera.localToWorld(V3(0.12, -0.35, -0.55));
        chip3d.position.copy(ori.clone().lerp(dest, eio(v))); chip3d.position.y += Math.sin(Math.PI * v) * 0.06;
        chip3d.quaternion.copy(monitor.getWorldQuaternion(_q)); chip3d.rotateZ((1 - eo(v)) * 0.8); chip3d.scale.setScalar(lerp(1.4, 0.8, eo(v)));
      }
    }
  }
  if (pa === "Q4i") {
    // el remito en el celular del Ruso a pantalla; el dedo de Héctor firma
    hector.raiz.visible = ruso.raiz.visible = zorra.visible = false;
    celRu.visible = true; celRu.scale.setScalar(1); celRu.position.set(CX + 0.9, 1.25, -1.6); celRu.rotation.set(-0.12, 0.6, 0.03);
    camPantalla(celRu, V3(0, 0.014, 0.0075), V3(0, 0, 1), 0.172, 0.54, 36, t, 0.025 * (1 - eo(sg(t, T.q4i, T.q4i + 0.5))));
    celRu.updateMatrixWorld(true);
    manoRu.visible = true; manoRu.position.copy(celRu.localToWorld(V3(-0.028, -0.112, 0.004))); manoRu.quaternion.copy(celRu.getWorldQuaternion(_q)); manoRu.scale.set(-1, 1, 1); manoRu.userData.pulgar.rotation.set(0, 0, 0.06); manoRu.userData.pulgar.position.set(0.022, 0, 0.006);
    const u = cl(sg(t, T.firma, T.firma + 0.9));
    if (t < T.firma + 1.0) {
      const k = 60 * u, cx = 90 + (k / 60) * 400, cy = 610 + Math.sin((k / 60) * 15) * 60 * (1 - (k / 60) * 0.4) - (k / 60) * 40;
      const loc = V3((cx / 600 - 0.5) * 0.081, (0.5 - cy / 1215) * 0.166, 0.0075);
      const r = 0.5, punta = V3(0.02 - 0.062 * Math.sin(r), 0.062 * Math.cos(r), 0);
      const aleja = t < T.firma ? 1 - sg(t, T.q4i, T.firma) : 0;
      manoH.visible = true; manoH.position.copy(celRu.localToWorld(loc.clone().sub(punta).add(V3(0.02 * aleja, -0.03 * aleja, 0.012 + 0.03 * aleja)))); manoH.quaternion.copy(celRu.getWorldQuaternion(_q));
      manoH.userData.pulgar.rotation.set(0, 0, r); manoH.userData.pulgar.position.set(0.02, 0, 0.019);
    }
  }
  if (pa === "Q5i") {
    // el celular del Ruso a pantalla: 18 de 18
    celRu.visible = true; celRu.scale.setScalar(1); celRu.position.set(MX + 2.3, 1.35, 0.8); celRu.rotation.set(-0.08, 0.5, -0.03);
    camPantalla(celRu, V3(0, 0.02, 0.0075), V3(0, 0, 1), 0.172, 0.54, 36, t, 0.025 * (1 - eo(sg(t, T.q5i, T.q5i + 0.5))));
    celRu.updateMatrixWorld(true); manoRu.visible = true; manoRu.scale.set(1, 1, 1); manoRu.position.copy(celRu.localToWorld(V3(0.028, -0.112, 0.004))); manoRu.quaternion.copy(celRu.getWorldQuaternion(_q)); manoRu.userData.pulgar.rotation.set(0, 0, 0.06); manoRu.userData.pulgar.position.set(0.022, 0, 0.006);
  }
  if (split) {
    const k = sg(t, pl[1], pl[1] + 2.5);
    ponerCamX(camA, arriba === "rot" ? SPLIT_ROT(k) : arriba === "caf" ? SPLIT_CAF(sg(t, T.p3, T.p3b)) : SPLIT_SUP(sg(t, T.p3b, T.p4)));
    ponerCamX(camB, SPLIT_OFI(k));
    camera.position.set(0, 0, 0); camera.fov = 50; camera.aspect = 1080 / 1920; camera.updateProjectionMatrix(); camera.lookAt(0, 0, -1);
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano((split ? (p === ruben ? camB : camA) : camera).position);
  bigoteSegunCamara(split ? camB : camera);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROTU) ROTU[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  ponerCostura(false);
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const di = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1650, sobre = 110) => { if (t >= ti - 0.04 && t < fin) hablar(GL[k], per, ent(ti - 0.04), orden, dx, minY, maxY, sobre); };
    const dos = (k, per, ti, corte, fin, orden = 1, dx = 0, minY = 250, maxY = 1650, sobre = 110) => { if (t < ti + corte - 0.04) di(k + "a", per, ti, fin, orden, dx, minY, maxY, sobre); else di(k, per, ti + corte, fin, orden, dx, minY, maxY, sobre); };
    if (split) {
      PROY = [camA, 0];
      if (pa === "P1") { if (t >= T.g1 - 0.04) ponerGlobo(GL.g1, 250, 600, ent(T.g1 - 0.04), aPx(bocaW(graciela)), 1); if (t >= 0.5) ponerGlobo(ROTU.pidio, 790, 880, ent(0.5), null, 2); }
      if (pa === "P3") { if (en(t, T.m1 - 0.04, T.p3b)) ponerGlobo(GL.m1, 250, 250, ent(T.m1 - 0.04), aPx(bocaW(marta)), 1); if (en(t, T.h1 - 0.04, T.p4)) ponerGlobo(GL.h1, 330, 300, ent(T.h1 - 0.04), aPx(bocaW(hector)), 1); }
      PROY = [camB, 1];
      if (pa === "P3") { if (en(t, T.r2 - 0.04, T.p3b)) ponerGlobo(GL.r2, 210, 1110, ent(T.r2 - 0.04), aPx(bocaW(ruben)), 1); if (en(t, T.r3 - 0.04, T.p4)) ponerGlobo(GL.r3, 210, 1110, ent(T.r3 - 0.04), aPx(bocaW(ruben)), 1); }
      PROY = null;
    }
    if (pa === "P2") di("r1", ruben, T.r1, T.p3, 1, 0, 260);
    if (pa === "P4b" && t >= T.rotCab) ponerGlobo(ROTU.cab, 540, 290, ent(T.rotCab), null, 2);
    if (pa === "P5") { di("n1", nico, T.n1, T.r4 - 0.05, 1, 0, 260); di("r4", ruben, T.r4, T.n2 - 0.05, 2, 0, 260); di("n2", nico, T.n2, T.p5b, 1, 0, 260); }
    if (pa === "P5b") dos("r5", ruben, T.r5, CORTE.r5, T.p6a, 1, 0, 260);
    if (pa === "P6b") {
      const pila = enPantalla(V3(MX + 1.8, 0.62, 0.62));
      if (t >= T.rotMarta) { ponerGlobo(ROTU.marta, 330, 1560, ent(T.rotMarta), null, 2); ponerGuia(GUIAS[0], 330, 1560 - ROTU.marta.userData.H / 2 + 4, pila[0], pila[1], sg(t, T.rotMarta, T.rotMarta + 0.2)); }
      if (t >= T.rotViaje) ponerGlobo(ROTU.viaje, 790, 330, ent(T.rotViaje), null, 2);
      if (t >= T.rotHoras) ponerGlobo(ROTU.horas, 820, 560, ent(T.rotHoras), null, 3);
    }
    if (pa === "P6i" && t >= T.r6 - 0.04) ponerGlobo(GL.r6, 540, 300, ent(T.r6 - 0.04), null, 1);
    if (pa === "P6c") { di("u1", ruso, T.u1, T.r7 - 0.04, 1, 0, 260); di("r7", ruben, T.r7, T.u2 - 0.04, 2, 0, 260); di("u2", ruso, T.u2, T.ring3, 1, 0, 260); }
    if (pa === "P6d") ponerGlobo(ROTU.llamando, 330, 1430, ent(T.ring3), null, 2);
    if (pa === "Q1i" && t >= T.rotAviso) ponerGlobo(ROTU.aviso, 540, 1600, ent(T.rotAviso), null, 2);
    if (pa === "Q1g") dos("g2", graciela, T.g2, CORTE.g2, T.q2, 1, 0, 260);
    if (pa === "Q2") di("m2", marta, T.m2, T.q3, 1, 0, 260);
    if (pa === "Q2i" && t >= T.m2 - 0.04) ponerGlobo(GL.m2, 540, 290, ent(T.m2 - 0.04), null, 1);
    if (pa === "Q3") { di("n1b", nico, T.n1b, T.r4b - 0.05, 1, 0, 260); di("r4b", ruben, T.r4b, T.n2b - 0.05, 2, 0, 260); di("n2b", nico, T.n2b, T.q3m, 1, 0, 260); }
    if (pa === "Q3m") { const k = t < T.r8 + CORTE.r8 - 0.04 ? "r8a" : "r8"; ponerGlobo(GL[k], 540, 300, ent(k === "r8a" ? T.r8 - 0.04 : T.r8 + CORTE.r8 - 0.04), null, 1); if (t >= T.q3m + 0.5) ponerGlobo(ROTU.panel, 540, 1610, ent(T.q3m + 0.5), null, 2); }
    if (pa === "Q4") di("h2", hector, T.h2, T.q4i, 1, 0, 260);
    if (pa === "Q4i") { const k = t < T.u3 + CORTE.u3 - 0.04 ? "u3a" : "u3"; if (t >= T.u3 - 0.04) ponerGlobo(GL[k], 540, 300, ent(k === "u3a" ? T.u3 - 0.04 : T.u3 + CORTE.u3 - 0.04), null, 1); if (t >= T.foto) ponerGlobo(ROTU.firma, 540, 1610, ent(T.foto), null, 2); }
    if (pa === "Q5") { if (t >= T.r9 - 0.04) hablar(GL.r9a, ruben, ent(T.r9 - 0.04), 1, 0, 260); }
    if (pa === "Q5i") { const k = t < T.r9 + CORTE.r9 - 0.04 ? "r9a" : "r9"; ponerGlobo(GL[k], 540, 300, 1, null, 1); }
    if (pa === "Q5d") di("u4", ruso, T.u4, T.c, 1, 0, 260);
  }
  if (split) {
    renderer.setScissorTest(true);
    ponerLuces(arriba); scene.background = new THREE.Color(FONDO[arriba]);
    for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camA.position);
    renderer.setViewport(0, 960, 1080, 960); renderer.setScissor(0, 960, 1080, 960); renderer.render(scene, camA);
    ponerLuces("ofi"); scene.background = new THREE.Color(FONDO.ofi);
    for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camB.position);
    bigoteSegunCamara(camB);
    renderer.setViewport(0, 0, 1080, 960); renderer.setScissor(0, 0, 1080, 960); renderer.render(scene, camB);
    renderer.setScissorTest(false); renderer.setViewport(0, 0, 1080, 1920);
    // la costura entre las dos mitades y las burbujas (capa 1, pegadas a la cámara principal) en una pasada más
    ponerCostura(true);
    const bg = scene.background; scene.background = null; renderer.autoClear = false; camera.layers.set(1);
    renderer.clearDepth(); renderer.render(scene, camera);
    camera.layers.enableAll(); renderer.autoClear = true; scene.background = bg;
  } else {
    ponerLuces(lugar); scene.background = new THREE.Color(FONDO[lugar]);
    renderer.render(scene, camera);
  }
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)), rub: [...ruben.cabeza.getWorldPosition(new THREE.Vector3()).toArray(), ...ruben.cabeza.rotation.toArray().slice(0, 3), ...ruben.cuerpo.rotation.toArray().slice(0, 3)].map((v) => +(+v).toFixed(3)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
