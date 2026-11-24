// Capa 3D de dist-cartera (Three.js r170 local). Base técnica: reels/dist-quien-debe (utilidades, `fusionar`, tarjetas
// pegadas a la cámara, globos con la cola a la boca, rótulos con guía, catmull() quieto después de la última clave, el
// muelle y la oficina de Rubén) y reels/dist-cliente-grande (pallets, racks y cajas del depósito). renderAt(t) es una
// función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   EL DEPÓSITO DE LA DISTRIBUIDORA (alrededor del origen), viernes 18:00, la despedida de Leo: el pallet de mesa con la
//     torta "¡SUERTE, LEO!" en z = MESA.z, Leo y Rubén detrás (z ≈ 0) mirando a +z, el rack lleno al fondo, la guirnalda
//     de banderines, el portón entreabierto a la derecha con la luz de la tarde. EL ESCRITORIO DE LEO a la izquierda
//     (x = ESC.x), al pie de la escalera: el monitor con la planilla (parte 1) / el sistema de clientes (parte 2).
//   LA CAFETERÍA DE MARTA (x = 40): mostrador, cafetera de dos grupos, pizarra, el celular de Marta en su soporte.
//   EL MUELLE DE LA DISTRIBUIDORA (x = 60): de dist-quien-debe; Nico con el celular (Q4).
//   LA OFICINA DE RUBÉN (x = 80): de dist-quien-debe; el panel "Cartera" en el monitor grande (Q5).
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
// EL DEPÓSITO: piso de hormigón gris con líneas de seguridad crema, pared navy claro, el rack lleno al fondo, el portón
// entreabierto a la derecha (franja de luz de tarde, plana), la guirnalda de banderines; la mesa de la despedida
// =====================================================================================================
const DEP = new THREE.Group(); scene.add(DEP);
const MESA = { x: 0.0, z: 0.82, y: 0.78 };                 // el pallet-mesa con la torta
const LEO0 = { x: -0.3, z: 0.0, giro: 0.2 }, RUB0 = { x: 0.33, z: 0.02, giro: -0.24 };
const ESC = { x: -3.1, z: -0.7 };                          // el escritorio de Leo (al pie de la escalera)
const MONE = { W: 0.84, H: 0.84, y: 0.5 };   // (r1) cuadrado: en los insertos llena más el alto               // el monitor del escritorio (alto del centro sobre la tapa)
const ESC_Y = 0.76;
const pantMon = lienzo(1280, 1280, () => {});
let monE, torta, porcion, cuchillo, topper;
{
  const piso = mesh(new THREE.PlaneGeometry(26, 20), mat(0x8d939c, 0.92), 0, 0, -2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; DEP.add(piso);
  for (const [x, z, w, d] of [[-1.9, -1.0, 0.09, 6.5], [1.95, -1.0, 0.09, 6.5], [0, -2.25, 3.94, 0.09]]) { const l = mesh(new THREE.PlaneGeometry(w, d), mat(0xe9e4cf, 0.85), x, 0.004, z); l.rotation.x = -Math.PI / 2; l.castShadow = false; DEP.add(l); }
  const paredM = mat(0x34507a, 0.92);
  DEP.add(cajaS(26, 7, 0.3, paredM, 0, 3.5, -5.2));
  DEP.add(cajaS(0.3, 7, 14, paredM, -6.6, 3.5, 0)); DEP.add(cajaS(0.3, 7, 14, paredM, 6.6, 3.5, 0));
  const techo = mesh(new THREE.BoxGeometry(14, 0.2, 14), mat(0x4a5b78, 0.95), 0, 6.6, 0); techo.castShadow = false; DEP.add(techo);
  // tubos fluorescentes crema planos
  for (const [x, z] of [[-2.5, -1.5], [2.5, -1.5], [-2.5, 1.5], [2.5, 1.5], [0, -3.5]]) { const g = new THREE.Group(); g.position.set(x, 4.2, z); DEP.add(g); g.add(caja(1.3, 0.06, 0.16, M.navy3, 0, 0.03, 0, 0.01)); const f = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.1), new THREE.MeshBasicMaterial({ color: 0xf6f3e6, toneMapped: false })); f.rotation.x = Math.PI / 2; f.position.y = -0.005; g.add(f); for (const s of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 2.4, 5), M.gris, s * 0.5, 1.23, 0)); }
  // el portón de la derecha entreabierto: la franja de luz de la tarde (plana, sin degradé) y la persiana a medio subir
  const luzP = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 3.4), new THREE.MeshBasicMaterial({ color: 0xe8c98a, toneMapped: false })); luzP.position.set(6.44, 1.7, -0.8); luzP.rotation.y = -Math.PI / 2; DEP.add(luzP);
  for (let i = 0; i < 9; i++) DEP.add(cajaS(0.08, 0.13, 2.3, M.navy3, 6.4, 3.45 + i * 0.14, -0.8));
  const franjaPiso = mesh(new THREE.PlaneGeometry(2.6, 2.2), new THREE.MeshBasicMaterial({ color: 0xc9b48d, toneMapped: false }), 5.1, 0.006, -0.8); franjaPiso.rotation.x = -Math.PI / 2; franjaPiso.castShadow = false; DEP.add(franjaPiso);
  // el cartel de la distribuidora en la pared del fondo (arriba)
  const cT = lienzo(1400, 260, (x, w, h) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "DISTRIBUIDORA RUBÉN", 900, 130, w - 120); x.fillText("DISTRIBUIDORA RUBÉN", w / 2, h / 2 + 6); });
  DEP.add(plano(3.2, 0.6, cT, 2.6, 5.2, -5.03, true));
}
semilla = 5;
{ const r = crearRack(9.6, 7); r.position.set(0.4, 0, -3.6); DEP.add(r); }
{ const r = crearRack(6, 4); r.rotation.y = Math.PI / 2; r.position.set(5.6, 0, -3.5); DEP.add(r); }
{ const r = crearRack(7.2, 5); r.position.set(-2.2, 0, 4.5); DEP.add(r); }   // detrás de la cámara del cuadro 0: el fondo de los planos frente al monitor
for (const [x, z, tp] of [[3.4, -1.9, 0], [4.5, -2.0, 3], [-1.6, -2.4, 1]]) { const p = new THREE.Group(); p.position.set(x, 0, z); p.rotation.y = 0.1 * x; cargaPallet(p, tp); DEP.add(p); }
// la escalera metálica a la oficina vidriada (detrás del escritorio de Leo) y el piso de la oficina arriba
{
  const n = 14, ez = -1.6, ex = -4.6;
  for (let i = 0; i < n; i++) DEP.add(caja(0.95, 0.06, 0.3, mat(0x8a8e98, 0.5, { metalness: 0.4 }), ex, 3.2 - (i + 1) * (3.2 / n) + 0.05, ez - (n - i) * 0.24 + 0.1));
  const L = Math.hypot(3.2, n * 0.24), ang = Math.atan2(3.2, n * 0.24);
  for (const dx of [-0.5, 0.5]) { const l = caja(0.06, 0.1, L, M.navy3, ex + dx, 1.6 + 0.06, ez - n * 0.12 + 0.12); l.rotation.x = ang; DEP.add(l); }
  for (const dx of [-0.5, 0.5]) { const l = caja(0.05, 0.05, L, M.navy3, ex + dx, 1.6 + 0.95, ez - n * 0.12 + 0.12); l.rotation.x = ang; DEP.add(l); }
  DEP.add(caja(3.6, 0.3, 2.4, M.navy3, -4.6, 3.05, -4.0));
  const v = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.4), M.vidrio); v.position.set(-4.6, 4.4, -2.8); v.renderOrder = 3; DEP.add(v);
  for (const x of [-6.2, -4.6, -3.0]) DEP.add(caja(0.07, 2.6, 0.08, M.navy, x, 4.5, -2.8, 0.01));
}
// LA MESA DE LA DESPEDIDA: 4 pallets apilados con una tabla y el mantel de papel crema; la torta con su cartelito
{
  const g = new THREE.Group(); g.position.set(MESA.x, 0, MESA.z); DEP.add(g);
  for (let k = 0; k < 4; k++) { const p = crearPallet(); p.position.y = k * 0.15; p.rotation.y = k % 2 ? 0.02 : -0.015; g.add(p); }
  g.add(caja(1.28, 0.03, 1.06, mat(0xd7c9a8, 0.8), 0, 0.615, 0, 0.005));
  // el mantel de papel crema que cae por los costados
  g.add(caja(1.34, 0.01, 1.12, mat(C.cr, 0.95), 0, 0.635, 0, 0.003));
  g.add(cajaS(1.34, 0.16, 0.008, mat(C.cr, 0.95), 0, 0.56, 0.56)); g.add(cajaS(0.008, 0.16, 1.12, mat(C.cr, 0.95), -0.67, 0.56, 0)); g.add(cajaS(0.008, 0.16, 1.12, mat(C.cr, 0.95), 0.67, 0.56, 0));
  const top = 0.64;
  // la torta rectangular sobre la bandeja de cartón dorado apagado
  torta = new THREE.Group(); torta.position.set(0.05, top, 0.02); g.add(torta);
  torta.add(caja(0.56, 0.012, 0.4, mat(0xb08a4a, 0.55), 0, 0.006, 0, 0.004));
  const bizc = mat(0xe9d9b0, 0.8), cob = mat(0xf4efe2, 0.6), ddl = mat(0xa8743a, 0.6);
  torta.add(caja(0.46, 0.05, 0.3, bizc, 0, 0.037, 0, 0.01)); torta.add(caja(0.46, 0.012, 0.3, ddl, 0, 0.068, 0, 0.004)); torta.add(caja(0.46, 0.04, 0.3, bizc, 0, 0.094, 0, 0.01));
  torta.add(caja(0.47, 0.012, 0.31, cob, 0, 0.12, 0, 0.004));
  for (const s of [-1, 1]) torta.add(cajaS(0.47, 0.11, 0.006, cob, 0, 0.068, s * 0.154)); for (const s of [-1, 1]) torta.add(cajaS(0.006, 0.11, 0.31, cob, s * 0.234, 0.068, 0));
  // el borde de merengue con picos (conos)
  const cono = new THREE.ConeGeometry(0.016, 0.03, 8);
  for (let i = 0; i < 14; i++) for (const s of [-1, 1]) torta.add(mesh(cono, cob, -0.215 + i * 0.033, 0.14, s * 0.138));
  for (let i = 0; i < 8; i++) for (const s of [-1, 1]) torta.add(mesh(cono, cob, s * 0.215, 0.14, -0.105 + i * 0.03));
  // lo escrito con manga en verde sobre la cobertura
  // la porción que falta (parte 2): una cuña de cobertura oscura (el corte con las capas) que tapa la esquina
  porcion = new THREE.Group(); porcion.position.set(0.17, 0, 0.09); torta.add(porcion); porcion.visible = false;
  porcion.add(caja(0.13, 0.128, 0.13, mat(0x9a9480, 0.9), 0, 0.064, 0, 0.002));
  porcion.add(caja(0.132, 0.05, 0.004, bizc, 0, 0.037, -0.066)); porcion.add(caja(0.132, 0.012, 0.004, ddl, 0, 0.068, -0.066)); porcion.add(caja(0.132, 0.04, 0.004, bizc, 0, 0.094, -0.066));
  // EL CARTELITO de la torta (topper): tarjeta crema con borde verde en dos palitos, de frente a la cámara
  topper = new THREE.Group(); topper.position.set(0, 0.12, -0.11); torta.add(topper);
  const tpT = lienzo(900, 380, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#3fa60a"; x.lineWidth = 26; x.strokeRect(13, 13, w - 26, h - 26); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "¡SUERTE,", 900, 150, w - 120); x.fillText("¡SUERTE,", w / 2, 120); x.fillStyle = "#3fa60a"; ajustar(x, "LEO!", 900, 170, w - 120); x.fillText("LEO!", w / 2, 270); });
  const tp = plano(0.36, 0.152, tpT, 0, 0.2, 0, true); topper.add(tp);
  topper.add(caja(0.37, 0.16, 0.006, M.navy, 0, 0.2, -0.004, 0.004));
  for (const s of [-1, 1]) topper.add(mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.2, 6), mat(0xd7b98a, 0.6), s * 0.12, 0.06, -0.006));
  // vasitos, la gaseosa navy sin marca, servilletas, platitos de cartón
  const vaso = (x, z, c = C.cr) => { const v = mesh(new THREE.CylinderGeometry(0.035, 0.026, 0.1, 14), mat(c, 0.5), x, top + 0.05, z); g.add(v); };
  for (const [x, z] of [[-0.42, 0.3], [-0.34, 0.38], [0.42, 0.33], [0.5, 0.22], [-0.5, 0.15]]) vaso(x, z);
  for (let i = 0; i < 5; i++) g.add(caja(0.16, 0.006, 0.16, mat(C.cr, 0.9), 0.47, top + 0.003 + i * 0.006, -0.22, 0.002));
  for (let i = 0; i < 3; i++) g.add(mesh(new THREE.CylinderGeometry(0.08, 0.075, 0.008, 18), mat(0xe9e4d4, 0.8), -0.12 + i * 0.012, top + 0.004 + i * 0.008, 0.33));
  g.add(caja(0.16, 0.01, 0.16, mat(C.g, 0.8), 0.3, top + 0.005, 0.36, 0.002));
}
// LA GUIRNALDA DE BANDERINES: cordel entre dos parantes del rack, triángulos crema y verde
{
  const x0 = -2.3, x1 = 2.7, y0 = 2.75, z = -2.7, n = 16;
  const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push(V3(lerp(x0, x1, u), y0 - 0.38 * Math.sin(Math.PI * u), z)); }
  DEP.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.006, 5), M.navy));
  const tri = new THREE.Shape(); tri.moveTo(-0.12, 0); tri.lineTo(0.12, 0); tri.lineTo(0, -0.24); tri.closePath();
  const tg = new THREE.ShapeGeometry(tri);
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n; const b = new THREE.Mesh(tg, mat(i % 2 ? C.g : C.cr, 0.8, { side: THREE.DoubleSide })); b.position.set(lerp(x0, x1, u), y0 - 0.38 * Math.sin(Math.PI * u) - 0.004, z); b.rotation.z = (u - 0.5) * 0.35; DEP.add(b); }
}
// EL ESCRITORIO DE LEO (ya vacío): escritorio navy3 chico, el monitor grande en su pie, la silla corrida y la caja de
// cartón con sus cosas (taza, gorra, plantita) sobre la silla
{
  const g = new THREE.Group(); g.position.set(ESC.x, 0, ESC.z); DEP.add(g);
  g.add(caja(1.4, 0.045, 0.72, mat(0xe9e6dc, 0.6), 0, ESC_Y - 0.022, 0, 0.01));
  g.add(caja(1.42, 0.03, 0.74, M.navy, 0, ESC_Y - 0.05, 0, 0.006));
  for (const x of [-0.66, 0.66]) g.add(caja(0.05, ESC_Y - 0.06, 0.68, M.navy3, x, (ESC_Y - 0.06) / 2, 0, 0.01));
  g.add(caja(1.3, 0.5, 0.03, M.navy3, 0, ESC_Y - 0.33, -0.33, 0.01));
  monE = new THREE.Group(); monE.position.set(-0.05, ESC_Y, -0.18); g.add(monE);
  monE.add(caja(0.12, 0.12, 0.1, M.navy, 0, 0.06, -0.05)); monE.add(caja(0.36, 0.025, 0.24, M.navy, 0, 0.012, -0.03));
  monE.add(caja(MONE.W + 0.06, MONE.H + 0.06, 0.05, M.navy3, 0, MONE.y + 0.0, 0, 0.02));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(MONE.W, MONE.H), new THREE.MeshBasicMaterial({ map: pantMon, toneMapped: false })); pm.position.set(0, MONE.y, 0.027); monE.add(pm);
  monE.userData.centro = V3(0, MONE.y, 0.027);
  // teclado y mouse (el mouse de Rubén al borrar)
  const tec = new THREE.Group(); tec.position.set(-0.05, ESC_Y, 0.16); g.add(tec);
  tec.add(caja(0.46, 0.022, 0.15, M.navy3, 0, 0.011, 0, 0.008));
  for (let i = 0; i < 3; i++) for (let k = 0; k < 11; k++) tec.add(caja(0.03, 0.01, 0.03, M.cr2, -0.19 + k * 0.038, 0.026, -0.042 + i * 0.042, 0.004));
  g.add(caja(0.06, 0.03, 0.1, M.navy3, 0.55, ESC_Y + 0.015, 0.24, 0.02));
  // portalápices y una foto de equipo dada vuelta (no: un portarretrato sin foto, de espaldas) · el cubilete
  g.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.11, 14), M.navy3, 0.52, ESC_Y + 0.055, -0.2));
  for (const [dx, c] of [[0.01, C.g], [-0.012, C.cr]]) g.add(mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.16, 6), mat(c, 0.5), 0.52 + dx, ESC_Y + 0.13, -0.2));
  // la silla corrida, con la caja de cartón con sus cosas
  const silla = new THREE.Group(); silla.position.set(-0.75, 0, 0.95); silla.rotation.y = 0.5; g.add(silla);
  silla.add(caja(0.5, 0.07, 0.48, M.navy, 0, 0.48, 0, 0.03)); silla.add(caja(0.48, 0.5, 0.07, M.navy, 0, 0.8, -0.23, 0.03)); silla.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.4, 8), M.gris, 0, 0.26, 0)); silla.add(mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.03, 5), M.navy, 0, 0.04, 0));
  const cj = new THREE.Group(); cj.position.set(0, 0.52, 0.02); silla.add(cj);
  cj.add(caja(0.42, 0.26, 0.32, M.kraft, 0, 0.13, 0, 0.01));
  for (const s of [-1, 1]) { const s2 = caja(0.42, 0.01, 0.16, M.kraft, 0, 0.27, s * 0.2, 0.003); s2.rotation.x = s * 0.9; cj.add(s2); }
  cj.add(mesh(new THREE.CylinderGeometry(0.04, 0.036, 0.09, 14), mat(C.g, 0.5), -0.1, 0.3, -0.04));
  cj.add(mesh(new THREE.SphereGeometry(0.08, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.navy3, 0.08, 0.27, 0.0));
  const gv = caja(0.12, 0.01, 0.06, M.navy3, 0.08, 0.275, 0.09, 0.004); cj.add(gv);
  for (let i = 0; i < 6; i++) { const a = i * 1.1; const h = mesh(new THREE.SphereGeometry(1, 8, 6), M.hoja, -0.12 + Math.cos(a) * 0.03, 0.36 + (i % 3) * 0.03, 0.08 + Math.sin(a) * 0.03); h.scale.set(0.035, 0.012, 0.02); h.rotation.set(0.3, a, 0.6); cj.add(h); }
  // un archivador navy al costado y un almanaque en la pared (no: el parante del rack queda detrás)
  g.add(caja(0.45, 0.7, 0.55, M.navy3, -1.05, 0.35, -0.05, 0.02));
  for (let i = 0; i < 2; i++) g.add(caja(0.12, 0.025, 0.02, M.cr2, -1.05, 0.25 + i * 0.3, 0.23, 0.005));
}
fusionar(DEP, [torta, monE]);
sombras(DEP);
DEP.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; } });
const solDep = new THREE.DirectionalLight(0xfff6e8, 1.5);
solDep.castShadow = true; solDep.shadow.mapSize.set(2048, 2048); solDep.shadow.bias = -0.0006; solDep.shadow.radius = 3;
Object.assign(solDep.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 30 });
solDep.position.set(1.0, 8, 4); solDep.target.position.set(-1, 0.8, -0.5); scene.add(solDep, solDep.target);
const cieloDep = new THREE.HemisphereLight(0xeef0f2, 0x5a5048, 1.85); scene.add(cieloDep);
const tardeDep = new THREE.DirectionalLight(0xffd9a0, 0.9); tardeDep.position.set(8, 2.2, 0.5); tardeDep.target.position.set(0, 1.1, 0); scene.add(tardeDep, tardeDep.target);

// =====================================================================================================
// LA CAFETERÍA DE MARTA (x = 40): pared crema con azulejo navy claro a media altura, mostrador de madera con frente
// navy2, cafetera de dos grupos gris plano, molinillo, frasco de medialunas, pizarra navy con tiza crema; Marta detrás
// =====================================================================================================
const CAF = new THREE.Group(); CAF.position.x = 40; scene.add(CAF);
const MOS = { x0: -1.4, x1: 1.4, y: 1.0, d: 0.62, z: -1.0 };
const MAR = { x: 40 + 0.25, z: -1.75 }, MAR_Y = 0.1;
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
luzCaf.position.set(42, 6, 3); luzCaf.target.position.set(40, 0.8, -1.2); scene.add(luzCaf, luzCaf.target);
const cieloCaf = new THREE.HemisphereLight(0xf6f2ea, 0x6a6458, 1.7); scene.add(cieloCaf);
const MUE = new THREE.Group(); MUE.position.x = 60; scene.add(MUE);
let camioneta, puertaCam;
{
  const piso = mesh(new THREE.PlaneGeometry(16, 12), mat(0xb7b3a6, 0.9), 0, 0, 0); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; MUE.add(piso);
  for (let x = -6; x <= 6; x += 3) { const l = mesh(new THREE.PlaneGeometry(0.1, 5), mat(0xe9e4cf, 0.8), x, 0.004, 0.5); l.rotation.x = -Math.PI / 2; l.castShadow = false; MUE.add(l); }
  const paredM = mat(0x34507a, 0.92);
  MUE.add(caja(16, 5, 0.3, paredM, 0, 2.5, -3.2, 0.01));
  // el portón navy3 a medio subir (lamas) y el depósito adentro (estanterías con cajas kraft)
  MUE.add(caja(4.2, 3.6, 0.1, mat(0x2a3b58, 0.8), -2.6, 1.8, -3.5, 0.01));
  for (let i = 0; i < 10; i++) MUE.add(caja(4.0, 0.12, 0.06, M.navy3, -2.6, 2.6 + i * 0.13, -3.0, 0.01));
  for (const s of [-1, 1]) MUE.add(caja(0.2, 3.9, 0.35, M.navy3, -2.6 + s * 2.1, 1.95, -3.0, 0.01));
  for (let k = 0; k < 3; k++) for (let i = 0; i < 6; i++) MUE.add(caja(0.5, 0.36, 0.4, mat(i % 2 ? C.kraft : 0xbf9a62, 0.85), -4.1 + i * 0.6, 0.2 + k * 0.38, -3.35, 0.01));
  // el cartel de la distribuidora en la pared (crema sobre navy)
  const cT = lienzo(1400, 260, (x, w, h) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "DISTRIBUIDORA RUBÉN", 900, 130, w - 120); x.fillText("DISTRIBUIDORA RUBÉN", w / 2, h / 2 + 6); });
  MUE.add(plano(2.3, 0.42, cT, 3.9, 2.72, -3.03, true));
  // la camioneta de reparto (furgón chico): caja crema con franja verde, cabina navy3, la puerta del conductor se cierra
  camioneta = new THREE.Group(); camioneta.position.set(1.7, 0, -0.6); camioneta.rotation.y = -Math.PI / 2; MUE.add(camioneta);
  const cue = mat(C.cr, 0.5), cab = M.navy3;
  camioneta.add(caja(1.9, 1.75, 3.0, cue, 0, 1.35, -0.6, 0.08));
  for (const s of [-1, 1]) camioneta.add(caja(0.02, 0.26, 2.9, M.g, s * 0.96, 1.4, -0.6, 0.01));
  camioneta.add(caja(1.9, 1.45, 1.3, cab, 0, 1.15, 1.55, 0.14));
  camioneta.add(caja(1.7, 0.6, 0.05, mat(0x2c4268, 0.15, { metalness: 0.3 }), 0, 1.55, 2.2, 0.02));
  for (const s of [-1, 1]) for (const z of [-1.5, 1.45]) camioneta.add(mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.3, 22), M.goma, s * 0.82, 0.38, z).rotateZ(Math.PI / 2));
  camioneta.add(caja(1.95, 0.16, 0.15, M.navy, 0, 0.5, 2.22, 0.04));
  // la ventanilla del conductor y la puerta (a +x local, el lado que ve la cámara)
  puertaCam = new THREE.Group(); puertaCam.position.set(0.96, 0, 2.15); camioneta.add(puertaCam);
  puertaCam.add(caja(0.05, 1.0, 1.1, cab, 0.0, 1.0, -0.55, 0.03));
  puertaCam.add(caja(0.02, 0.4, 0.85, mat(0x2c4268, 0.15, { metalness: 0.3 }), 0.02, 1.62, -0.55, 0.02));
  puertaCam.add(caja(0.03, 0.04, 0.16, M.cr, 0.04, 1.2, -0.95, 0.01));
}
sombras(MUE);
const luzMue = new THREE.DirectionalLight(0xfffaf0, 1.9); luzMue.castShadow = true; luzMue.shadow.mapSize.set(2048, 2048); luzMue.shadow.bias = -0.0006;
Object.assign(luzMue.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 25 });
luzMue.position.set(63, 8, 4); luzMue.target.position.set(60, 0.8, -0.5); scene.add(luzMue, luzMue.target);
const cieloMue = new THREE.HemisphereLight(0xeaf0f6, 0x6a6458, 1.8); scene.add(cieloMue);
const MESA_Y = 0.76;
// =====================================================================================================
// LA OFICINA DE RUBÉN (x = 80): el monitor grande con el panel de cuentas por cobrar; detrás, la ventana, el mate
// =====================================================================================================
const OFI = new THREE.Group(); OFI.position.x = 80; scene.add(OFI);
const pantP = lienzo(1280, 1000, () => {});
const PANEL = { W: 1.2, H: 0.94 };
let panelMon;
{
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#b08a5e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#977350"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(3, 2);
  const p = mesh(new THREE.PlaneGeometry(6, 5), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.7 }), 0, 0, 0); p.rotation.x = -Math.PI / 2; p.castShadow = false; OFI.add(p);
  // (r1) pared alta (sin la franja del fondo arriba) y LA PANTALLA GRANDE EN LA PARED con la cartera: Rubén parado debajo,
  // sin escritorio que lo atraviese
  OFI.add(caja(6, 4.2, 0.12, mat(C.cr, 0.9), 0, 2.1, -1.4, 0.01));
  OFI.add(caja(6, 0.12, 0.04, M.navy3, 0, 0.06, -1.33, 0.005));
  const cielo = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), new THREE.MeshBasicMaterial({ color: 0xe7eef3, toneMapped: false })); cielo.position.set(-1.9, 1.7, -1.33); OFI.add(cielo);
  for (let i = 0; i < 12; i++) OFI.add(caja(1.2, 0.04, 0.02, M.cr, -1.9, 2.25 - i * 0.1, -1.3, 0.005));
  panelMon = new THREE.Group(); panelMon.position.set(0.0, 2.62, -1.3); OFI.add(panelMon);
  panelMon.add(caja(PANEL.W + 0.08, PANEL.H + 0.08, 0.06, M.navy, 0, 0, 0, 0.025));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(PANEL.W, PANEL.H), new THREE.MeshBasicMaterial({ map: pantP, toneMapped: false })); pm.position.set(0, 0, 0.032); panelMon.add(pm);
  panelMon.userData.centro = V3(0, 0, 0.032);
  // un aparador bajo navy3 a la izquierda con el termo y unos biblioratos
  OFI.add(caja(1.0, 0.8, 0.45, M.navy3, -1.15, 0.4, -1.1, 0.02));
  const tm = crearTermo(); tm.scale.setScalar(1.1); tm.position.set(-0.85, 0.8, -1.05); OFI.add(tm);
  for (let i = 0; i < 4; i++) OFI.add(caja(0.08, 0.3, 0.26, [M.g, M.cr2, M.navy, M.red][i], -1.5 + i * 0.1, 0.95, -1.15, 0.01));
}
sombras(OFI);
const luzOfi = new THREE.DirectionalLight(0xffeedb, 1.7); luzOfi.castShadow = true; luzOfi.shadow.mapSize.set(1024, 1024); luzOfi.shadow.bias = -0.0006;
Object.assign(luzOfi.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 20 });
luzOfi.position.set(78, 5, 4); luzOfi.target.position.set(80, 0.8, -0.5); scene.add(luzOfi, luzOfi.target);
const cieloOfi = new THREE.HemisphereLight(0xf4efe4, 0x6a5a48, 1.6); scene.add(cieloOfi);

const LUCES = { dep: [solDep, cieloDep, tardeDep], caf: [luzCaf, cieloCaf], mue: [luzMue, cieloMue], ofi: [luzOfi, cieloOfi] };
const INTENS = new Map(); for (const k in LUCES) for (const l of LUCES[k]) INTENS.set(l, l.intensity);
function ponerLuces(lugares, k = 1) { for (const key in LUCES) for (const l of LUCES[key]) { l.visible = lugares.includes(key); l.intensity = INTENS.get(l) * k; } }
const FONDO = { dep: 0x34507a, caf: 0xefeee5, mue: 0xd9e6ef, ofi: 0xe7eef3 };

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben, dedos: true, parpadeoCada: 999, parpadeosExtra: [1.2, r2(T.p5 + 0.06), r2(T.q1l + 0.3), r2(T.q5 + 0.05)] });
const leo = crearPersonaje({ ...ELENCO.leo, barbaOpacidad: 0.62, barbaLarga: 0.45, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3i ?? T.ins3 + 0.4)] });
const nico = crearPersonaje({ ...ELENCO.empleado, cortoMechas: true, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p6 + 0.06)] });
const marta = crearPersonaje({ ...ELENCO.duena, dedos: true, parpadeoCada: 999 });
const sofi = crearPersonaje({ ...ELENCO.sofi, franja: null, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const op1 = crearPersonaje({ ...DEFECTO, nombre: "Darío", piel: PIEL.media, pelo: PELO.negro, peinado: "corto", camisa: C.navy3, cuello: C.g, mangas: "cortas", pantalon: C.navy2, panza: 1.08, parpadeoCada: 999 });
const op2 = crearPersonaje({ ...DEFECTO, nombre: "Operaria", piel: PIEL.clara, pelo: PELO.castaño, peinado: "coleta", cejaFina: true, camisa: C.cr, mangas: "largas", pantalon: C.navy2, panza: 0.98, labios: 0xb5555a, parpadeoCada: 999 });
// el pelo de Rubén: la herradura de bolitas canosas (de dist-pedidos-lunes / dist-quien-debe)
{
  const corona = ruben.cabeza.children.find((o) => o.isMesh && o.geometry.type === "SphereGeometry" && Math.abs((o.geometry.parameters.phiLength || 0) - Math.PI * 1.14) < 1e-3);
  if (corona) {
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
        const m = mesh(bola, (i + n) % 4 ? pm : pm2, x, y, z); m.scale.set(sz, sz * h, sz); ruben.cabeza.add(m);
      }
    };
    fila(26, 1.5, Math.PI * 2 - 1.5, -0.1, 0.0, 0.02, 0.017, 1.3);
    fila(9, 2.4, Math.PI * 2 - 2.4, -0.25, -0.02, 0.019, 0.01, 1.15);
  }
}
const BIGOTE_R = []; ruben.cabeza.traverse((o) => { if (o.isMesh && o.material.color && (o.material.color.getHex() === PELO.gris || o.material.color.getHex() === ELENCO.ruben.cejasColor)) BIGOTE_R.push(o); });
function bigoteSegunCamara(cam = camera) {
  ruben.cabeza.updateMatrixWorld(true);
  const h = ruben.cabeza.getWorldPosition(new THREE.Vector3()), f = V3(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld), c = cam.position.clone().sub(h);
  f.y = 0; c.y = 0; f.normalize(); c.normalize();
  for (const b of BIGOTE_R) b.visible = f.dot(c) > 0.1;
}
// la mochila de Leo (navy3 con franja verde) en la espalda y la correa sobre el hombro izquierdo
const mochila = new THREE.Group(); leo.cuerpo.add(mochila);
{
  mochila.add(caja(0.34, 0.42, 0.16, M.navy3, 0, 0.3, -0.27, 0.06));
  mochila.add(caja(0.3, 0.16, 0.06, M.navy3, 0, 0.2, -0.37, 0.03));
  mochila.add(caja(0.345, 0.035, 0.165, M.g, 0, 0.42, -0.27, 0.01));
  for (const s of [-1, 1]) { const cr = mesh(new THREE.TorusGeometry(0.21, 0.016, 6, 24, Math.PI * 0.95), M.navy3, s * 0.12, 0.38, -0.06); cr.rotation.set(0, Math.PI / 2, -Math.PI / 2 - 0.15); cr.scale.set(1, 1.15, 0.8); mochila.add(cr); }
  sombras(mochila);
}
// los celulares (crearCel de dist-quien-debe)
function crearCel(tex, funda, W = 0.085, H = 0.172) {
  const g = new THREE.Group();
  g.add(caja(W + 0.008, H + 0.008, 0.014, mat(funda, 0.5), 0, 0, 0, 0.012));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); p.position.z = 0.0075; g.add(p);
  g.userData = { W, H };
  return sombras(g);
}
const pantL = lienzo(600, 1215, () => {}), pantR = lienzo(600, 1215, () => {}), pantN = lienzo(600, 1215, () => {});
// el celular de Leo en el bolsillo del pecho de la chomba (asoma la mitad de arriba, la pantalla hacia afuera)
const celL = crearCel(pantL, C.navy); leo.cuerpo.add(celL);
const bolsillo = caja(0.11, 0.09, 0.012, mat(C.cr2, 0.8), 0, 0, 0, 0.006); leo.cuerpo.add(bolsillo);
const celR = crearCel(pantR, C.navy3); scene.add(celR);
const celN = crearCel(pantN, C.g); scene.add(celN);
const celM = crearCel(pantMa, C.navy2); soporteMa.add(celM); celM.position.set(0, 0.105, 0.0); celM.rotation.x = -0.32;
// el cuchillo de la torta (hoja gris claro, mango navy), los vasitos de los operarios, el mate de Rubén, la tablet de Sofi,
// el platito de torta de Nico
const cuchilloG = new THREE.Group();
{
  const h = new THREE.Shape(); h.moveTo(0, -0.012); h.lineTo(0.2, -0.016); h.quadraticCurveTo(0.235, 0.0, 0.2, 0.018); h.lineTo(0, 0.016); h.closePath();
  const hoja = new THREE.Mesh(new THREE.ExtrudeGeometry(h, { depth: 0.003, bevelEnabled: false }), mat(0xd3d6dc, 0.3, { metalness: 0.4 })); hoja.position.set(0.05, 0, -0.0015); cuchilloG.add(hoja);
  cuchilloG.add(caja(0.1, 0.024, 0.018, M.navy, 0.0, 0, 0, 0.008));
  sombras(cuchilloG); scene.add(cuchilloG);
}
const vasoG = () => { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.035, 0.026, 0.1, 14), mat(C.cr, 0.5), 0, 0.03, 0)); g.add(mesh(new THREE.CylinderGeometry(0.031, 0.031, 0.004, 14), mat(0x6b3d24, 0.3), 0, 0.072, 0)); scene.add(g); return sombras(g); };
const vaso1 = vasoG(), vaso2 = vasoG();
const mate = crearMate(); mate.scale.setScalar(1.1); scene.add(mate);
const platito = new THREE.Group();
{
  platito.add(mesh(new THREE.CylinderGeometry(0.08, 0.075, 0.008, 18), mat(0xe9e4d4, 0.8), 0, 0, 0));
  platito.add(caja(0.075, 0.07, 0.07, mat(0xe9d9b0, 0.8), 0, 0.04, 0, 0.004)); platito.add(caja(0.076, 0.01, 0.071, mat(0xa8743a, 0.6), 0, 0.04, 0, 0.002)); platito.add(caja(0.077, 0.008, 0.072, mat(0xf4efe2, 0.6), 0, 0.078, 0, 0.002));
  sombras(platito); scene.add(platito);
}
const pantS = lienzo(800, 560, (x, w, h) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 110); x.fillStyle = "#efeee5"; x.font = F(800, 56); x.textBaseline = "middle"; x.fillText("Clientes", 40, 58); for (let i = 0; i < 3; i++) { x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, 140 + i * 130, w - 60, 110, 20); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(100, 195 + i * 130, 34, 0, 7); x.fill(); } });
const tablet = new THREE.Group();
{
  tablet.add(caja(0.27, 0.19, 0.012, M.navy, 0, 0, 0, 0.012));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.17), new THREE.MeshBasicMaterial({ map: pantS, toneMapped: false })); p.position.z = 0.0065; tablet.add(p);
  sombras(tablet); sofi.cuerpo.add(tablet);
}
// la mano suelta de los insertos (de dist-quien-debe): palma, índice/pulgar estirado sobre la pantalla, la manga
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
const manoN = crearManoInserto(ELENCO.empleado.piel, C.g); scene.add(manoN);
// las 38 tarjetitas que vuelan del monitor al celular de Nico (Q3): placas crema con una franja verde
const CARTAS = [];
{
  const g = rbox(0.07, 0.045, 0.004, 0.006, 2), mc = mat(C.cr, 0.6), mg = mat(C.g, 0.6);
  for (let i = 0; i < 38; i++) { const c = new THREE.Group(); c.add(new THREE.Mesh(g, mc)); const f = mesh(new THREE.BoxGeometry(0.07, 0.01, 0.005), mg, 0, 0.012, 0); c.add(f); scene.add(c); CARTAS.push(c); }
}
const TODOS = [ruben, leo, nico, marta, sofi, op1, op2];
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
  AVATAR.marta = leer(marta, 0xb9cde0);
  AVATAR.nico = leer(nico, 0xefeee5);
  AVATAR.ruben = leer(ruben, 0xb9cde0);
  AVATAR.leo = leer(leo, 0xefeee5);
  AVATAR.walter = leer(crearPersonaje({ ...ELENCO.walter, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.graciela = leer(crearPersonaje({ ...ELENCO.clienta, lentesFinos: true, sinPatillas: true, parpadeoCada: 999 }), 0xb9cde0);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
function parlante() {}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
const inicial = (x, letra, cx, cy, r, fondo = "#16243d", tinta = "#efeee5") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.fillStyle = tinta; x.font = F(900, r * 1.1); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(letra, cx, cy + r * 0.06); x.textAlign = "left"; };
// el celular y el bolsillo en el pecho de Leo (lado izquierdo, +x del cuerpo)
celL.position.set(-0.11, 0.44, 0.205); celL.rotation.set(-0.12, 0, 0.0);
bolsillo.position.set(-0.11, 0.39, 0.222); bolsillo.rotation.set(-0.12, 0, 0);

// ================= PANTALLAS =================
// ---- el monitor del escritorio de Leo: la planilla (parte 1) · el sistema de clientes (parte 2) ----
const NOMBRES = ["Cafetería Marta", "Rotisería Graciela", "Bar Walter", "Súper Héctor", "Panadería Nelly", "Kiosco Beto", "Autoservicio Pérez", "Pizzería Dante", "Panadería Tito", "Bar Lola", "Kiosco Coco", "Rotisería Pocho", "Autoservicio Sol", "Cafetería Rita", "Carnicería Lalo", "Minimercado Gabi", "Verdulería Pepe", "Bar Moni", "Kiosco Quique", "Panadería Susi", "Rotisería Tano", "Bar Beba", "Autoservicio Cacho", "Kiosco Lili", "Cafetería Pato", "Pizzería Yoli", "Bar Dino", "Carnicería Fito", "Panadería Olga", "Kiosco Tota", "Rotisería Zulma", "Bar Mingo", "Minimercado Kika", "Kiosco Lucho", "Cafetería Pupi", "Bar Ruso", "Panadería Tati", "Kiosco Vico"];
let claveMon = "";
function dibujarMon(t) {
  // (r1) pantalla cuadrada 1280×1280: todo el texto ≥ 54 px de lienzo (≥ 40 px en el cuadro del inserto)
  const parte2 = t >= P2;
  let modo = parte2 ? (t < T.ficha ? "grid" : t < T.q3 ? "ficha" : "pasar") : "excel";
  const filas = parte2 ? 0 : T.fila.filter((a) => t >= a).length;
  const tacha = !parte2 ? cl(sg(t, T.borra, T.borra + 0.18)) : 0, saca = !parte2 ? cl(sg(t, T.borra + 0.22, T.borra + 0.4)) : 0;
  const ng = parte2 ? Math.round(38 * cl(sg(t, T.grid - 0.15, T.grid + 0.3))) : 0;
  const renglon = modo === "ficha" ? Math.min(4, Math.floor(sg(t, T.ficha + 0.05, T.ficha + 0.6) * 4 + (t >= T.ficha + 0.05 ? 1 : 0))) : 0;
  const prom = t >= T.prom ? 1 : 0, perez = modo === "ficha" ? eo(cl(sg(t, T.perez, T.perez + 0.2))) : 0;
  const toca = modo === "pasar" && t >= T.pasa ? 1 : 0;
  const clave = `${modo}|${filas}|${Math.round(tacha * 10)}|${Math.round(saca * 10)}|${ng}|${renglon}|${prom}|${Math.round(perez * 10)}|${toca}`; if (clave === claveMon) return; claveMon = clave;
  const { x } = pantMon.userData, w = 1280, h = 1280;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "excel") {
    // la planilla genérica: barra de título navy, columnas A B, filas con número; 3 filas (y 2 cuando Rubén borra)
    x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#efeee5"; ajustar(x, "CARTERA ZONA ESTE.xlsx", 800, 70, w - 80); x.fillText("CARTERA ZONA ESTE.xlsx", 36, 68);
    const C0 = 80, C1 = 870, FH = 190, Y0 = 210;
    x.fillStyle = "#d9d7c9"; x.fillRect(0, 130, w, 70); x.fillRect(0, 130, C0, h);
    x.fillStyle = "#1f3254"; x.font = F(700, 44); x.textAlign = "center"; x.fillText("A", (C0 + C1) / 2, 166); x.fillText("B", (C1 + w) / 2, 166);
    x.strokeStyle = "#b4b2a3"; x.lineWidth = 4;
    for (let i = 0; i < 6; i++) { const y = Y0 + i * FH; x.beginPath(); x.moveTo(0, y + FH); x.lineTo(w, y + FH); x.stroke(); x.fillStyle = "#1f3254"; x.font = F(700, 44); x.fillText(String(i + 1), C0 / 2, y + FH / 2); }
    for (const cx of [C0, C1]) { x.beginPath(); x.moveTo(cx, 130); x.lineTo(cx, h); x.stroke(); }
    x.textAlign = "left";
    let L = [["Marta · cafetería", "martes", 0], ["Graciela · ¿rotisería?", "¿?", 0], ["El de la camioneta roja", "pide poco", 1]].slice(0, filas);
    let dy = 0;
    if (saca > 0 && L.length) { L = L.slice(1); dy = (1 - saca) * FH; }
    L.forEach(([a, b, rojo], i) => {
      const y = Y0 + (i * FH) + dy + FH / 2;
      x.fillStyle = rojo ? "#c7655b" : "#0b1220"; ajustar(x, a, 800, 80, C1 - C0 - 40); x.fillText(a, C0 + 24, y);
      x.fillStyle = rojo ? "#c7655b" : "#1f3254"; ajustar(x, b, 700, 66, w - C1 - 36); x.fillText(b, C1 + 20, y);
    });
    if (saca > 0 && saca < 1) { x.fillStyle = `rgba(199,101,91,${0.35 * (1 - saca)})`; x.fillRect(C0, Y0, w - C0, dy); }
    if (tacha > 0 && saca === 0 && filas) {
      const y = Y0 + FH / 2; x.fillStyle = "rgba(199,101,91,0.22)"; x.fillRect(C0, Y0 + 4, w - C0, FH - 8);
      x.strokeStyle = "#c7655b"; x.lineWidth = 14; x.lineCap = "round"; x.beginPath(); x.moveTo(C0 + 20, y); x.lineTo(C0 + 20 + (w - C0 - 50) * tacha, y); x.stroke();
    }
  } else {
    // el sistema de clientes: encabezado navy, filtro, contador verde
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, w, 10);
    x.fillStyle = "#efeee5"; ajustar(x, "Clientes · Distribuidora Rubén", 800, 62, w - 80); x.fillText("Clientes · Distribuidora Rubén", 32, 68);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(32, 166, 560, 92, 46); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 60); x.textAlign = "center"; x.fillText(`Zona Este · ${modo === "grid" ? ng : 38}`, 312, 214); x.textAlign = "left";
    // la grilla de las 38 fichas (6 columnas)
    for (let i = 0; i < 38; i++) {
      const col = i % 6, fil = Math.floor(i / 6), cx = 24 + col * 209, cy = 290 + fil * 140;
      const on = modo !== "grid" || i < ng;
      x.fillStyle = on ? (i === 0 ? "#5ce611" : "#efeee5") : "#16243d"; x.beginPath(); x.roundRect(cx, cy, 196, 126, 18); x.fill();
      if (on) { x.fillStyle = i === 0 ? "#0b1220" : "#16243d"; x.beginPath(); x.arc(cx + 40, cy + 40, 24, 0, 7); x.fill(); const nm = NOMBRES[i].split(" ").slice(1).join(" ") || NOMBRES[i]; x.fillStyle = "#0b1220"; ajustar(x, nm, 800, 40, 172); x.fillText(nm, cx + 14, cy + 96); }
    }
    if (modo === "ficha") {
      // la ficha de Cafetería Marta, renglón por renglón
      x.fillStyle = "rgba(11,18,32,0.6)"; x.fillRect(0, 140, w, h);
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, 170, w - 60, 1080, 34); x.fill();
      x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.stroke();
      avatar(x, AVATAR.marta, 130, 280, 80);
      x.fillStyle = "#0b1220"; x.font = F(900, 84); x.fillText("Cafetería Marta", 236, 256); x.fillStyle = "#1f3254"; x.font = F(700, 54); x.fillText("Vendedor: Leo", 238, 330);
      const RG = [["Pide:", "los martes"], ["Lo de siempre:", "6 aceite · 4 harina"], ["Precio:", "lista B · 30 días ✓"], ["Charla:", "«¿Me guardás 2?»"]];
      RG.slice(0, renglon).forEach(([a, b], i) => {
        const y = 450 + i * 130; x.fillStyle = "#1f3254"; x.font = F(700, 56); x.fillText(a, 70, y); x.fillStyle = "#0b1220"; ajustar(x, b, 800, 66, w - 500); x.fillText(b, 460, y);
      });
      if (prom) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(60, 1000, w - 120, 190, 60); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 64); x.fillText("Prometido:", w / 2, 1058); ajustar(x, "2 cajas de la oferta ✓", 900, 72, w - 200); x.fillText("2 cajas de la oferta ✓", w / 2, 1136); x.textAlign = "left"; }
      if (perez > 0) {
        // la tarjeta de Autoservicio Pérez salta al frente (el de la camioneta roja, con nombre)
        x.save(); x.translate(w / 2, 640); x.rotate(-0.04); x.scale(0.5 + 0.5 * perez, 0.5 + 0.5 * perez);
        x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(-560, -260, 1120, 520, 40); x.fill(); x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.stroke();
        x.fillStyle = "#efeee5"; ajustar(x, "Autoservicio Pérez", 900, 96, 1020); x.fillText("Autoservicio Pérez", -510, -140); x.font = F(800, 80); x.fillText("Carlos Pérez ✓", -510, -20);
        x.fillStyle = "#5ce611"; ajustar(x, "Nota: camioneta roja", 900, 92, 1020); x.fillText("Nota: camioneta roja", -510, 130); x.restore();
      }
    }
    if (modo === "pasar") {
      x.fillStyle = "rgba(11,18,32,0.6)"; x.fillRect(0, 140, w, h);
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(40, 190, w - 80, 1040, 34); x.fill();
      x.fillStyle = "#0b1220"; x.font = F(900, 100); x.fillText("Pasar cartera", 100, 320);
      x.fillStyle = "#1f3254"; x.font = F(800, 68); x.fillText("Zona Este · 38 clientes", 100, 440);
      avatar(x, AVATAR.leo, 290, 640, 110); avatar(x, AVATAR.nico, 990, 640, 110);
      x.strokeStyle = "#0b1220"; x.lineWidth = 18; x.lineCap = "round"; x.beginPath(); x.moveTo(460, 640); x.lineTo(810, 640); x.moveTo(760, 590); x.lineTo(815, 640); x.lineTo(760, 690); x.stroke();
      x.fillStyle = "#0b1220"; x.font = F(900, 70); x.textAlign = "center"; x.fillText("Leo", 290, 810); x.fillText("Nico", 990, 810);
      x.fillStyle = toca ? "#3fa60a" : "#5ce611"; x.beginPath(); x.roundRect(100, 920, w - 200, 190, 95); x.fill(); if (toca) { x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.stroke(); }
      x.fillStyle = "#0b1220"; x.font = F(900, 92); x.fillText(toca ? "Pasar cartera ✓" : "Pasar cartera", w / 2, 1018); x.textAlign = "left";
    }
  }
  pantMon.needsUpdate = true;
}
// ---- el celular del bolsillo de Leo: las notificaciones que se apilan (P3) ----
let claveL = "";
function dibujarL(t) {
  const n = t < P2 ? [0, 1, 2].filter((k) => t >= T.ins3 + 0.05 + k * 0.16).length : 0;
  const clave = `${n}`; if (clave === claveL) return; claveL = clave;
  const { x } = pantL.userData, w = 600, h = 1215;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 92); x.fillText("18:04", w / 2, 92);
  const N = [[AVATAR.marta, "Marta", "Leo, ¿pasás el martes?"], [AVATAR.walter, "Walter", "¿Pasás el jueves?"]];
  x.textAlign = "left";
  for (let k = 0; k < Math.min(n, 2); k++) {
    const y = 160 + k * 150; x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(18, y, w - 36, 138, 26); x.fill();
    avatar(x, N[k][0], 76, y + 69, 44);
    x.fillStyle = "#0b1220"; x.font = F(900, 44); x.fillText(N[k][1], 136, y + 44); x.fillStyle = "#1f3254"; ajustar(x, N[k][2], 700, 40, w - 170); x.fillText(N[k][2], 136, y + 100);
  }
  if (n >= 3) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(150, 468, 300, 96, 48); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 64); x.textAlign = "center"; x.fillText("+36", w / 2, 518); }
  pantL.needsUpdate = true;
}
// ---- el celular de Rubén (P5): llamando a Cafetería Marta, en altavoz · (r1) sin texto chico: la cara de Marta y el
// parlante verde (el celular se ve chico en el plano)
let claveR = "";
function dibujarR(t) {
  if (claveR) return; claveR = "1";
  const { x } = pantR.userData, w = 600, h = 1215;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  avatar(x, AVATAR.marta, w / 2, 430, 220);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w / 2, 930, 150, 0, 7); x.fill();
  x.fillStyle = "#0b1220"; x.fillRect(w / 2 - 70, 895, 40, 70); x.beginPath(); x.moveTo(w / 2 - 30, 895); x.lineTo(w / 2 + 20, 850); x.lineTo(w / 2 + 20, 1010); x.lineTo(w / 2 - 30, 965); x.fill();
  x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.lineCap = "round"; for (const r of [45, 85]) { x.beginPath(); x.arc(w / 2 + 20, 930, r, -0.7, 0.7); x.stroke(); }
  pantR.needsUpdate = true;
}
// ---- el celular de Marta en el soporte (P5m: un número que no tiene agendado · Q4m: la distribuidora) ----
let claveMa = "";
function dibujarMa(t) {
  const q = t >= P2 ? 1 : 0, clave = `${q}`; if (clave === claveMa) return; claveMa = clave;
  const { x } = pantMa.userData, w = 600, h = 1215;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.textAlign = "center"; x.textBaseline = "middle";
  if (!q) { x.fillStyle = "#2c4268"; x.beginPath(); x.arc(w / 2, 380, 170, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.font = F(900, 190); x.fillText("?", w / 2, 392); x.font = F(900, 62); x.fillText("099 ··· ···", w / 2, 660); }
  else { avatar(x, AVATAR.nico, w / 2, 380, 170); x.fillStyle = "#efeee5"; x.font = F(900, 70); x.fillText("Nico", w / 2, 640); x.font = F(700, 44); x.fillText("Distribuidora Rubén", w / 2, 720); }
  x.fillStyle = "#5ce611"; x.font = F(800, 56); x.fillText("En llamada", w / 2, 840);
  pantMa.needsUpdate = true;
}
// ---- el celular de Nico: Q3i "Tu cartera: 38 clientes ✓" · Q4i la ficha de Marta y el toque en "Llamar" ----
let claveN = "";
function dibujarN(t) {
  const modo = t < T.q4 ? "cartera" : "ficha";
  const n = modo === "cartera" ? Math.round(38 * cl(sg(t, T.vuela + 0.2, T.llegan + 0.05))) : 38;
  const toca = modo === "ficha" ? (t >= T.toqueN ? (t >= T.toqueN + 0.2 ? 2 : 1) : 0) : 0;
  const clave = `${modo}|${n}|${toca}`; if (clave === claveN) return; claveN = clave;
  const { x } = pantN.userData, w = 600, h = 1215;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, w, 8);
  x.fillStyle = "#efeee5"; ajustar(x, "Distribuidora Rubén", 800, 50, w - 60); x.fillText("Distribuidora Rubén", 30, 62); x.fillStyle = "#5ce611"; x.font = F(800, 44); x.fillText("Nico · Zona Este", 30, 128);
  if (modo === "cartera") {
    x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Tu cartera", 40, 270);
    x.fillStyle = n >= 38 ? "#5ce611" : "#efeee5"; x.font = F(900, 230); x.fillText(String(n), 40, 440);
    x.fillStyle = "#efeee5"; x.font = F(800, 70); x.fillText(n >= 38 ? "clientes ✓" : "clientes", 40, 600);
    x.fillStyle = "#b9cde0"; x.font = F(700, 50); x.fillText("con su historial", 40, 680);
    for (let i = 0; i < Math.min(3, Math.floor(n / 12) + 1); i++) { const y = 760 + i * 140; x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, y, w - 60, 122, 24); x.fill(); x.fillStyle = "#0b1220"; ajustar(x, NOMBRES[i], 800, 50, w - 160); x.fillText(NOMBRES[i], 120, y + 61); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(76, y + 61, 28, 0, 7); x.fill(); }
  } else {
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(20, 200, w - 40, 990, 32); x.fill();
    avatar(x, AVATAR.marta, 112, 310, 74);
    x.fillStyle = "#0b1220"; x.font = F(900, 58); x.fillText("Cafetería", 204, 286); x.fillText("Marta", 204, 350);
    x.fillStyle = "#1f3254"; x.font = F(700, 46); x.fillText("Pide:", 44, 460);
    x.fillStyle = "#0b1220"; x.font = F(900, 54); x.fillText("los martes", 190, 460);
    x.fillStyle = "#1f3254"; x.font = F(700, 46); x.fillText("Prometido:", 44, 570);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(36, 610, w - 72, 150, 32); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 56); x.fillText("2 cajas", 62, 660); x.fillText("de la oferta ✓", 62, 724);
    x.fillStyle = toca ? "#3fa60a" : "#5ce611"; x.beginPath(); x.roundRect(50, 860, w - 100, 150, 75); x.fill(); if (toca === 1) { x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.stroke(); }
    x.fillStyle = "#0b1220"; x.font = F(900, 70); x.textAlign = "center"; x.fillText(toca === 2 ? "En llamada" : "Llamar", w / 2, 936);
  }
  pantN.needsUpdate = true;
}
// ---- el panel de Rubén en la oficina (Q5), (r1) la pantalla grande en la pared: la cartera por zona, entera desde el
// primer cuadro; textos ≥ 60 px de lienzo ----
let claveP = "";
function dibujarPanel(t) {
  if (claveP) return; claveP = "1";
  const { x } = pantP.userData, w = 1280, h = 1000;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, w, 10);
  x.fillStyle = "#efeee5"; ajustar(x, "Cartera · Distribuidora Rubén", 800, 70, w - 80); x.fillText("Cartera · Distribuidora Rubén", 40, 68);
  x.fillStyle = "#efeee5"; x.font = F(800, 66); x.fillText("En el sistema:", 40, 222);
  x.fillStyle = "#5ce611"; x.font = F(900, 104); x.fillText("108 clientes", 520, 226);
  const L = [["Zona Este · Nico", AVATAR.nico, "38 ✓", 1], ["Zona Centro · Mauro", null, "41", 0], ["Zona Oeste · Rubén", AVATAR.ruben, "29", 0]];
  L.forEach(([z, av, k, ok], i) => {
    const y = 310 + i * 210;
    x.fillStyle = ok ? "#5ce611" : "#efeee5"; x.beginPath(); x.roundRect(30, y, w - 60, 188, 30); x.fill();
    if (av) avatar(x, av, 124, y + 94, 66); else inicial(x, "M", 124, y + 94, 66);
    x.fillStyle = "#0b1220"; ajustar(x, z, 900, 70, 820); x.fillText(z, 220, y + 96);
    x.font = F(900, 104); x.textAlign = "right"; x.fillText(k, w - 60, y + 98); x.textAlign = "left";
  });
  pantP.needsUpdate = true;
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
  const cabH = cab ? Math.round(px * 1.15) : 0, cabF = Math.max(Math.round(px * 0.6), 40);
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
function globo2(lineas, px, vacias) { const g = crearGlobo(lineas, px); const a = crearGlobo(lineas.map((l, i) => (vacias.includes(i) ? " " : l)), px, { minW: g.userData.W }); return [a, g]; }
const [l1a, l1g] = globo2(["Rubén, te quiero", "un montón. [Pero me voy.]"], 62, []);
const [r2a, r2g] = globo2(["Treinta y ocho clientes.", "Me dejaste {tres.}"], 64, [1]);
const [m1a, m1g] = globo2(["¿Qué Rubén?", "Yo le compro [a Leo.]"], 70, [1]);
const [r4a, r4g] = globo2(["Tuya.", "Son {dos.}"], 84, [1]);
const [r5a, r5g] = globo2(["Tuya.", "Son [treinta y ocho.]"], 76, [1]);
const [r6a, r6g] = globo2(["Treinta y ocho.", "[Con nombre y apellido.]"], 64, [1]);
const GL = {
  l1: l1g, l1a,
  r1: crearGlobo(["¿Y los [clientes?]"], 86),
  l2: crearGlobo(["Tranqui.", "Te dejé el [Excel.]"], 72),
  r2: r2g, r2a,
  r3: crearGlobo(["Marta, habla Rubén."], 66),
  m1: m1g, m1a,
  n1: crearGlobo(["Jefe, ¿y la", "zona de Leo?"], 70),
  r4: r4g, r4a,
  r1b: crearGlobo(["¿Y los [clientes?]"], 86),
  l3: crearGlobo(["Donde estuvieron", "[siempre.]"], 72),
  n1b: crearGlobo(["Jefe, ¿y la", "zona de Leo?"], 70),
  r5: r5g, r5a,
  n2: crearGlobo(["Marta, ¿lo de los martes?", "Y las dos cajas", "que te [guardó Leo.]"], 60),
  m2: crearGlobo(["¡Nico! Leo me", "habló de vos.", "[Mandame.]"], 66),
  r6: r6g, r6a,
};
const ROT_ = {
  ficha: crearRotulo([["Cada cliente,", null, 48], ["con su ficha", "#5ce611", 58]], 48),
  prom: crearRotulo([["Qué compra, cada cuánto", null, 44], ["y qué le prometieron", "#5ce611", 52]], 44),
  perez: crearRotulo([["Hasta el de la", null, 44], ["camioneta roja", "#5ce611", 54]], 44),
  cartera: crearRotulo([["Se va el vendedor.", null, 48], ["La cartera se queda.", "#5ce611", 56]], 48),
  pedido: crearRotulo([["Pedido ✓", "#5ce611", 64], ["Cafetería Marta", null, 46]], 46),
  todos: crearRotulo([["Todos tus clientes,", null, 48], ["en tu empresa", "#5ce611", 58]], 48),
};
const GUIAS = [crearGuia(), crearGuia()];

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
DEP.updateMatrixWorld(true); monE.updateMatrixWorld(true);
const MC = monE.localToWorld(monE.userData.centro.clone());           // centro de la pantalla del escritorio (mira a +z)
const camMon = (llena, fov, dx = 0, dy = 0) => { const vis = MONE.W / llena, d = vis / 2 / (Math.tan((fov * D2R) / 2) * (1080 / 1920)); return [MC.x + dx, MC.y + dy, MC.z + d, MC.x + dx * 0.4, MC.y + dy * 0.6, MC.z, fov]; };
const CAM_P1 = (k) => [0.02, 1.05, lerp(2.62, 2.45, k), 0.02, 1.53, 0.0, 56];
const CAM_P2 = (k) => [RUB0.x + 0.22, 1.66, lerp(2.15, 2.0, k), RUB0.x + 0.1, 1.5, RUB0.z, 44];   // (r1) más abierto: entra el cuchillo
const CAM_P3 = (k) => [LEO0.x - 0.24, 1.45, lerp(2.3, 2.15, k), LEO0.x - 0.12, 1.52, LEO0.z, 42];   // (r1) encuadre más bajo: la burbuja no pisa el pelo
const RD = { x: ESC.x + 0.5, z: ESC.z + 0.85 };                       // Rubén parado frente al monitor (de espaldas a la fiesta)
const CAM_DET = (k, abre = 0) => [RD.x + 0.08 + abre * 0.26, 1.72, lerp(-2.3, -2.2, k) - abre * 0.5, RD.x + 0.05 + abre * 0.3, 1.3, RD.z, 40 + abre * 12];   // detrás del monitor: la cara de Rubén (y Nico entero)
const CAM_MAR = (k) => [MAR.x - 0.1, 1.55, lerp(0.8, 0.68, k), MAR.x + 0.05, 1.66, MAR.z, 40];   // (r1) encuadre más bajo: la burbuja sobre el rodete
const CAM_NIC = (k) => [60.6, 1.4, lerp(3.75, 3.6, k), 60.68, 1.45, 1.15, 40];
const CAM_OFI = (k) => [80.0, 1.78, lerp(2.3, 2.18, k), 80.02, 1.9, -0.7, 42];   // (r1) la pantalla de la pared arriba, Rubén abajo
const CAM_C = (k) => [0.03, 1.5, lerp(3.55, 3.4, k), 0.0, 1.3, 1.7, 50];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, [[T.p2, ...CAM_P2(0)], [T.p3, ...CAM_P2(1)]]],
  ["P3", T.p3, [[T.p3, ...CAM_P3(0)], [T.ins3, ...CAM_P3(1)]]],
  ["P3i", T.ins3, null],                          // el inserto del celular en el pecho de Leo
  ["P4", T.p4, [[T.p4, ...camMon(0.92, 44, 0, -0.02)], [T.p5, ...camMon(0.98, 44, 0, -0.02)]]],   // la planilla
  ["P5", T.p5, [[T.p5, ...CAM_DET(0)], [T.p5m, ...CAM_DET(1)]]],   // Rubén llama (detrás del monitor)
  ["P5m", T.p5m, [[T.p5m, ...CAM_MAR(0)], [T.p6, ...CAM_MAR(1)]]],
  ["P6", T.p6, [[T.p6, ...CAM_DET(0, 1)], [T.p6i, ...CAM_DET(1, 1)]]],
  ["P6i", T.p6i, [[T.p6i, ...camMon(0.95, 44, 0, -0.02)], [T.p6b, ...camMon(0.99, 44, 0, -0.02)]]],
  ["P6b", T.p6b, [[T.p6b, ...CAM_DET(1, 1)], [P1, ...CAM_DET(1.6, 1)]]],
  // ---- parte 2 ---- (r1) la repetición arranca en "¿Y los clientes?"; corte limpio de Leo al monitor
  ["Q1r", T.q1r, [[T.q1r, ...CAM_P2(0)], [T.q1l, ...CAM_P2(1)]]],
  ["Q1l", T.q1l, [[T.q1l, ...CAM_P3(0)], [T.q2, ...CAM_P3(1)]]],
  ["Q2", T.q2, [[T.q2, ...camMon(0.92, 44, 0, -0.02)], [T.q3, ...camMon(0.99, 44, 0, -0.02)]]],
  ["Q3", T.q3, [[T.q3, ...CAM_DET(0, 1)], [T.q3m, ...CAM_DET(1, 1)]]],
  ["Q3m", T.q3m, [[T.q3m, ...camMon(0.95, 44, 0, -0.02)], [T.q3i, ...camMon(0.85, 44, 0, -0.02)]]],
  ["Q3i", T.q3i, null],                         // el celular de Nico: llegan las 38
  ["Q3b", T.q3b, [[T.q3b, ...CAM_DET(1, 1)], [T.q4, ...CAM_DET(1.6, 1)]]],
  ["Q4i", T.q4, null],                          // (r1) el celular de Nico: la ficha de Marta y el toque en "Llamar"
  ["Q4", T.q4n, [[T.q4n, ...CAM_NIC(0)], [T.q4m, ...CAM_NIC(1)]]],
  ["Q4m", T.q4m, [[T.q4m, ...CAM_MAR(0)], [T.q5, ...CAM_MAR(1)]]],
  ["Q5", T.q5, [[T.q5, ...CAM_OFI(0)], [T.c, ...CAM_OFI(1)]]],
  ["C", T.c, [[T.c, ...CAM_C(0)], [DUR, ...CAM_C(1)]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s), se saca`); PLANOS.splice(i, 1); } }
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

// ---------- Rubén ----------
function poseRuben(t, pa, cp) {
  const pr = { x: RUB0.x, y: 0, z: RUB0.z, giro: RUB0.giro, inclina: 0.02, cabeza: { giro: 0, asiente: 0.04, ladea: 0.03 }, ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 0.95, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1 }, manoI: [0.2, 0.24, 0.3], codoI: [1, -0.6, -0.2], manoD: [-0.29, -0.08, 0.04], codoD: [-1, 0.2, -0.2], dedoI: 0, dedoD: 0, t };
  if (pa === "P1") {
    // el abrazo de costado: la mano derecha en el hombro de Leo; el cuchillo en la izquierda, bajo
    pr.cabeza = { giro: -0.28, asiente: 0.06, ladea: -0.05 }; pr.ojos = { x: -0.35, y: 0, abiertos: 0.92, feliz: 0.35 };
    pr.manoD = aCuerpo(ruben, leo.cuerpo.localToWorld(V3(0.19, 0.64, -0.03))); pr.codoD = [-0.3, -0.9, -0.2];
  } else if (["P2", "Q1r"].includes(pa)) {
    // el corte: el cuchillo quieto en el aire, la cara de nada (parte 1) / tranquilo y curioso (parte 2)
    pr.cabeza = { giro: haciaCam(cp, RUB0.x, RUB0.z, RUB0.giro, 0.85) - 0.12, asiente: 0.05, ladea: 0.02 };
    pr.manoI = [0.24, 0.4, 0.32]; pr.codoI = [1, -0.7, -0.2];   // (r1) el cuchillo en la mano, quieto, a la vista
    if (pa === "P2") { Object.assign(pr, { ...SECO, ojos: { x: -0.25, y: 0, abiertos: 0.85, tension: 0.2 }, cejas: { alto: 0.05, ang: -0.1, asim: 0.5 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } }); bocaVoz(pr, t, T.r1, ENV.r1, 0.55); }
    else { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.25, y: 0, abiertos: 0.95, feliz: 0.2 }, cejas: { alto: 0.3, ang: 0.1 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1 } }); bocaVoz(pr, t, T.r1b, ENV.r1, 0.55); }
  } else if (["P5", "P6", "P6b", "Q3", "Q3b"].includes(pa)) {
    // frente al monitor (de espaldas a la fiesta): la cámara está detrás del monitor
    Object.assign(pr, { x: RD.x, z: RD.z, giro: Math.PI + 0.35 });
    pr.cabeza = { giro: haciaCam(cp, RD.x, RD.z, Math.PI + 0.35, 0.5, 0.4), asiente: 0.12, ladea: 0.02 }; pr.ojos = { x: 0, y: -0.25, abiertos: 0.9 };
    pr.manoI = [0.29, -0.08, 0.04]; pr.codoI = [1, 0.2, -0.2];
    if (pa === "P5") { Object.assign(pr, { ...CARA.neutra, ojos: { x: 0, y: -0.1, abiertos: 0.95 }, cejas: { alto: 0.25, ang: 0.1 }, boca: { sonrisa: 0.2, abierta: 0, ancho: 1 } }); pr.cabeza.asiente = 0.02; bocaVoz(pr, t, T.r3, ENV.r3, 0.55); }
    if (pa === "P6") { Object.assign(pr, { ...NADA, ojos: { x: 0, y: -0.35, abiertos: 0.85, tension: 0.2 } }); }
    if (pa === "P6b") { Object.assign(pr, { ...SECO, ojos: { x: 0, y: -0.35, abiertos: 0.7, tension: 0.35 }, cejas: { alto: 0.05, ang: 0.35, asim: 0.4 }, boca: { sonrisa: -0.35, abierta: 0, ancho: 0.9 } }); bocaVoz(pr, t, T.r4, ENV.r4, 0.5); }
    if (pa === "Q3") { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: -0.35, abiertos: 0.95, feliz: 0.25 } }); }
    if (pa === "Q3b") { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.4, y: -0.1, abiertos: 0.95, feliz: 0.35 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } }); pr.cabeza = { giro: 0.35, asiente: 0.05, ladea: 0.04 }; bocaVoz(pr, t, T.r5, ENV.r5, 0.55); }
    // la mano derecha en el mouse (borra / pasa la cartera)
  } else if (pa === "Q5") {
    // (r1) parado debajo de la pantalla de la pared, sin muebles alrededor
    Object.assign(pr, { x: 80.12, z: -0.55, giro: -0.18, ...CARA.sonrisa, ojos: { x: 0, y: 0.05, abiertos: 1, feliz: 0.3 }, cejas: { alto: 0.15, ang: 0, asim: 0.35 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 } });
    pr.cabeza = { giro: haciaCam(cp, 80.12, -0.55, -0.18, 0.8), asiente: -0.02, ladea: 0.03 };
    pr.manoI = MANO_MATE; pr.codoI = [1, -0.6, -0.25];
    bocaVoz(pr, t, T.r6, ENV.r6, 0.55);
  }
  return pr;
}
// ---------- Leo ----------
function poseLeo(t, pa, cp) {
  const pr = { x: LEO0.x, y: 0, z: LEO0.z, giro: LEO0.giro, inclina: 0.02, cabeza: { giro: 0.3, asiente: 0.03, ladea: 0.04 }, ...CARA.sonrisa, ojos: { x: 0.3, y: 0, abiertos: 0.95, feliz: 0.35 }, cejas: { alto: 0.35, ang: 0.35 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1 }, manoI: [0.29, -0.06, 0.06], codoI: [1, 0.2, -0.2], manoD: [-0.29, -0.08, 0.04], codoD: [-1, 0.2, -0.2], dedoI: 0, dedoD: 0, t };
  if (pa === "P1") { bocaVoz(pr, t, T.l1, ENV.l1, 0.65); pr.cabeza.giro = 0.22; }
  if (["P3", "P3i"].includes(pa)) {
    Object.assign(pr, { ...CARA.feliz, ojos: { x: 0, y: 0, abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.35, ang: 0 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 } });
    pr.cabeza = { giro: haciaCam(cp, LEO0.x, LEO0.z, LEO0.giro, 0.9), asiente: 0.0, ladea: 0.06 };
    // (r1) la mano derecha va al celular del pecho, lo palmea y se queda un momento
    const k = eio(sg(t, T.palmea - 0.25, T.palmea)) * (1 - eio(sg(t, T.palmea + 0.45, T.palmea + 0.7)));
    if (k > 0) { pr.manoD = lerpV(pr.manoD, [-0.1, 0.4, 0.3], k); pr.codoD = [-1, -0.7, 0.0]; }
    bocaVoz(pr, t, T.l2, ENV.l2, 0.65);
  }
  if (pa === "Q1l") {
    Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.2, y: 0, abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.3, ang: 0 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } });
    pr.cabeza = { giro: haciaCam(cp, LEO0.x, LEO0.z, LEO0.giro, 0.7), asiente: 0.02, ladea: -0.04 };
    const k = eo(sg(t, T.l3 - 0.1, T.l3 + 0.25));
    pr.manoD = lerpV(pr.manoD, [-0.46, 0.3, 0.2], k); pr.codoD = [-1, -0.4, -0.2]; pr.dedoD = k > 0.5 ? 1 : 0;
    bocaVoz(pr, t, T.l3, ENV.l3, 0.65);
  }
  return pr;
}
// ---------- Nico ----------
const NIC_D = { x: RD.x + 0.64, z: RD.z + 0.12, giro: Math.PI + 0.5 };
function poseNico(t, pa, cp) {
  const pr = { x: NIC_D.x, y: 0, z: NIC_D.z, giro: NIC_D.giro, inclina: 0.02, cabeza: { giro: haciaCam(cp, NIC_D.x, NIC_D.z, NIC_D.giro, 0.55, 0.6), asiente: 0.05, ladea: 0 }, ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.1 }, cejas: { alto: 0.3, ang: 0.1 }, boca: { sonrisa: 0.3, abierta: 0, ancho: 1 }, manoI: [0.14, 0.3, 0.3], codoI: [1, -0.6, -0.2], manoD: [-0.29, -0.08, 0.04], codoD: [-1, 0.2, -0.2], dedoI: 0, dedoD: 0, t };
  if (pa === "P6") bocaVoz(pr, t, T.n1, ENV.n1, 0.7);
  if (pa === "P6b") { Object.assign(pr, { ...CARA.incredula, ojos: { x: -0.4, y: -0.3, abiertos: 0.7 } }); pr.cabeza = { giro: -0.35, asiente: 0.15, ladea: 0.04 }; }
  if (pa === "Q3") { bocaVoz(pr, t, T.n1b, ENV.n1, 0.7); pr.manoI = [0.1, 0.34, 0.3]; }
  if (pa === "Q3b") { Object.assign(pr, { ...CARA.feliz, ojos: { x: 0, y: -0.6, abiertos: 0.95, feliz: 0.3 } }); pr.cabeza = { giro: 0.1, asiente: 0.3, ladea: 0.03 }; pr.manoI = [0.1, 0.34, 0.3]; }
  if (pa === "Q4") {
    Object.assign(pr, { x: 60.72, z: 1.15, giro: -0.18, ...CARA.sonrisa, ojos: { x: 0, y: -0.15, abiertos: 1, feliz: 0.3 }, cejas: { alto: 0.35, ang: 0 } });
    pr.cabeza = { giro: haciaCam(cp, 60.72, 1.15, -0.18, 0.6), asiente: 0.06, ladea: 0.03 };
    bocaVoz(pr, t, T.n2, ENV.n2, 0.7);
  }
  return pr;
}
// ---------- Marta (detrás del mostrador de la cafetería) ----------
function poseMarta(t, pa, cp) {
  const pr = { x: MAR.x, y: MAR_Y, z: MAR.z, giro: 0, inclina: 0.03, cabeza: { giro: 0.2, asiente: 0.1, ladea: 0.04 }, ...CARA.neutra, ojos: { x: 0.35, y: -0.3, abiertos: 1, feliz: 0.1 }, cejas: { alto: 0.45, ang: 0.2 }, boca: { sonrisa: 0.25, abierta: 0, ancho: 1 }, ...BRAZOS.apoyado, codoI: [1, -0.4, -0.2], codoD: [-1, -0.4, -0.2], t };
  pr.manoI = [0.3, 0.3, 0.4]; pr.manoD = [-0.3, 0.3, 0.4];
  if (pa === "P5m") { pr.cabeza.giro = 0.22; bocaVoz(pr, t, T.m1, ENV.m1, 0.7); }
  if (pa === "Q4m") { Object.assign(pr, { ...CARA.feliz, ojos: { x: 0.3, y: -0.25, abiertos: 1, feliz: 0.3 }, cejas: { alto: 0.5, ang: 0.2 } }); bocaVoz(pr, t, T.m2, ENV.m2, 0.7); }
  return pr;
}
// ---------- Sofi (cierre) ----------
const SOF = { x: 0.0, z: 1.78 };
function poseSofi(t, cp) {
  const pr = { x: SOF.x, y: 0, z: SOF.z, giro: 0, inclina: 0.02, cabeza: { giro: haciaCam(cp, SOF.x, SOF.z, 0, 0.9), asiente: 0.02, ladea: 0.05 }, ...CARA.sonrisa, ojos: { x: 0, y: 0.05, abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.25, ang: 0 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1 }, manoI: [0.3, 0.06, 0.12], codoI: [1, 0.0, -0.2], manoD: [-0.16, 0.3, 0.32], codoD: [-1, -0.7, -0.2], dedoI: 0, dedoD: 0, t };
  bocaVoz(pr, t, T.s1, ENV.s1, 0.6);
  return pr;
}
// ---------- los operarios del fondo (despedida) ----------
const OPS = [[op1, -1.45, -1.15, 0.55, "D"], [op2, 1.55, -1.3, -0.6, "I"]];
function poseOp(t, i) {
  const [, x, z, g, lado] = OPS[i];
  const brindis = Math.sin(Math.PI * sg(t, 1.0 + i * 0.15, 2.2 + i * 0.15)) * (t < P1 ? 1 : 0);
  const mano = lado === "D" ? [-0.18, 0.3 + 0.25 * brindis, 0.3] : [0.18, 0.3 + 0.25 * brindis, 0.3];
  return { x, y: 0, z, giro: g, inclina: 0.02, cabeza: { giro: -g * 0.6, asiente: 0.05, ladea: 0 }, ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 0.95, feliz: 0.35 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1 }, manoI: lado === "I" ? mano : [0.29, -0.08, 0.04], manoD: lado === "D" ? mano : [-0.29, -0.08, 0.04], codoI: [1, -0.5, -0.2], codoD: [-1, -0.5, -0.2], dedoI: 0, dedoD: 0, t };
}

// ================= RENDER =================
function celEnMano(cel, per, lado, camPos, local) {
  per.raiz.updateMatrixWorld(true);
  const p = per.cabeza.localToWorld(local.clone());
  cel.position.copy(p); cel.lookAt(camPos); cel.rotateZ(lado * 0.12);
  return p;
}
const CAM_DET_P = V3(...CAM_DET(1, 1).slice(0, 3));
function renderAt(tIn) {
  AVISOS.length = 0; PROY = null;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const camPre = pl[2] ? catmull(pl[2], t) : null;
  const pa = planoActual;
  const lugar = ["P5m", "Q4m"].includes(pa) ? "caf" : ["Q4", "Q4i"].includes(pa) ? "mue" : pa === "Q5" ? "ofi" : "dep";
  ponerLuces([lugar]);
  scene.background = new THREE.Color(FONDO[lugar]);
  DEP.visible = lugar === "dep"; CAF.visible = lugar === "caf"; MUE.visible = lugar === "mue"; OFI.visible = lugar === "ofi";
  // ---- pantallas y objetos ----
  if (lugar === "dep") { dibujarMon(t); dibujarL(t); }
  if (lugar === "caf") dibujarMa(t);
  if (lugar === "ofi") dibujarPanel(t);
  dibujarR(t); dibujarN(t);
  porcion.visible = parte2;
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  for (const o of [celR, celN, cuchilloG, vaso1, vaso2, mate, platito, manoN]) o.visible = false;
  for (const c of CARTAS) c.visible = false;
  const cp = camPre || [0, 1.4, 4, 0, 1.2, 0, 40];
  if (lugar === "dep") {
    const enFiesta = ["P1", "P2", "P3", "P3i", "Q1r", "Q1l", "C"].includes(pa);
    const enEscr = ["P5", "P6", "P6b", "Q3", "Q3b", "Q3i"].includes(pa);
    if (enFiesta && pa !== "C") {
      leo.raiz.visible = ruben.raiz.visible = true;
      leo.poner(poseLeo(t, pa, cp)); leo.raiz.updateMatrixWorld(true);
      ruben.poner(poseRuben(t, pa, cp)); ruben.raiz.updateMatrixWorld(true);
      // el cuchillo en la mano izquierda de Rubén (la hoja hacia adelante, un poco levantada en el corte)
      cuchilloG.visible = true; ruben.brazos[0].mano.getWorldPosition(_w);
      const alto = ["P2", "Q1r"].includes(pa);   // (r1) en el primer plano, la hoja para arriba (se ve entera)
      cuchilloG.scale.setScalar(alto ? 1.35 : 1); cuchilloG.position.copy(_w).add(V3(0, alto ? 0.02 : -0.01, 0));
      cuchilloG.rotation.set(0, alto ? ruben.raiz.rotation.y - 0.5 : ruben.raiz.rotation.y - Math.PI / 2 + 0.25, alto ? 1.15 : -0.25);
    }
    if (enFiesta) {
      OPS.forEach(([p], i) => { p.raiz.visible = true; p.poner(poseOp(t, i)); p.raiz.updateMatrixWorld(true); });
      const v = [vaso1, vaso2]; OPS.forEach(([p, , , , lado], i) => { v[i].visible = true; p.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(_w); v[i].position.copy(_w).add(V3(0, 0.0, 0)); });
    }
    if (enEscr) {
      ruben.raiz.visible = true; ruben.poner(poseRuben(t, pa === "Q3i" ? "Q3b" : pa, cp)); ruben.raiz.updateMatrixWorld(true);
      if (pa !== "P5") { nico.raiz.visible = true; nico.poner(poseNico(t, pa === "Q3i" ? "Q3b" : pa, cp)); nico.raiz.updateMatrixWorld(true); }
      if (pa === "P5") {
        // el celular en la mano derecha, delante, en altavoz
        celR.visible = true; celR.scale.setScalar(1.3); celEnMano(celR, ruben, -1, CAM_DET_P, V3(-0.25, -0.12, 0.42));
        const pr = poseRuben(t, pa, cp); pr.manoD = aCuerpo(ruben, celR.position.clone().add(V3(0, -0.085, 0))); pr.codoD = [-1, -0.6, -0.1]; ruben.poner(pr);
      }
      if (["P6", "P6b"].includes(pa)) { platito.visible = true; nico.brazos[0].mano.getWorldPosition(_w); platito.position.copy(_w).add(V3(0, 0.02, 0)); platito.rotation.set(0, nico.raiz.rotation.y, 0); }
      if (pa.startsWith("Q3")) {
        celN.visible = true; celN.scale.setScalar(1.2); nico.raiz.updateMatrixWorld(true);
        celN.position.copy(nico.cuerpo.localToWorld(V3(0.06, 0.5, 0.36))); celN.lookAt(CAM_DET_P); celN.rotateX(-0.25);
        const pn = poseNico(t, pa === "Q3i" ? "Q3b" : pa, cp); pn.manoI = aCuerpo(nico, celN.position.clone().add(V3(0, -0.09, 0))); nico.poner(pn);
      }
    }
    // (r1) la tablet bajo el brazo izquierdo de Sofi
    if (pa === "C") { sofi.raiz.visible = true; sofi.poner(poseSofi(t, cp)); tablet.visible = true; tablet.position.set(0.29, 0.2, 0.04); tablet.rotation.set(0.05, Math.PI / 2 - 0.4, 0.1); }
    // el cartelito de la torta solo en los planos generales (en los primeros planos asomaba cortado en la esquina)
    topper.visible = ["P1", "P3i"].includes(pa);   // (portada) sin el cartelito: su texto asomaba debajo del gancho
  }
  if (lugar === "caf") { marta.raiz.visible = true; marta.poner(poseMarta(t, pa, cp)); }
  if (lugar === "mue") {
    nico.raiz.visible = true; nico.poner(poseNico(t, pa, cp)); nico.raiz.updateMatrixWorld(true);
    const cpN = pa === "Q4i" ? CAM_NIC(0) : cp;
    celN.visible = true; celN.scale.setScalar(1.15); celEnMano(celN, nico, 1, V3(cpN[0], cpN[1], cpN[2]), V3(0.24, -0.16, 0.42));
    const pn = poseNico(t, pa, cp); pn.manoI = aCuerpo(nico, celN.position.clone().add(V3(0, -0.08, 0))); pn.codoI = [1, -0.6, -0.2]; nico.poner(pn);
  }
  if (lugar === "ofi") {
    ruben.raiz.visible = true; ruben.poner(poseRuben(t, pa, cp)); ruben.raiz.updateMatrixWorld(true);
    mate.visible = true; ruben.brazos[0].mano.getWorldPosition(_w); mate.position.copy(_w).add(V3(0, -0.07, 0)); mate.rotation.set(0, ruben.raiz.rotation.y + Math.PI / 2, 0);
  }
  // ---- cámara ----
  if (pl[2]) { ponerCam(catmull(pl[2], t), t); camera.updateMatrixWorld(true); }
  if (pa === "P3i") {
    leo.raiz.updateMatrixWorld(true); celL.updateMatrixWorld(true);
    camPantalla(celL, V3(0, 0.03, 0.0075), V3(0, 0, 1), 0.13, 0.62, 36, t, 0.03 * (1 - eo(sg(t, T.ins3, T.ins3 + 0.5))));
  }
  if (pa === "Q3i") {
    celN.updateMatrixWorld(true);
    // (r1) la pantalla llena el cuadro (no se ve el celular flotando); las fichas no entran en este plano
    camPantalla(celN, V3(0, 0.0, 0.0075), V3(0, 0, 1), 0.172 * 1.2, 0.93, 38, t, 0.02 * (1 - eo(sg(t, T.q3i, T.q3i + 0.4))));
    nico.raiz.visible = false; ruben.raiz.visible = false; manoN.visible = false;
  }
  if (pa === "Q4i") {
    // (r1) el inserto del celular de Nico: la ficha de Marta y el índice que toca "Llamar"
    celN.updateMatrixWorld(true);
    camPantalla(celN, V3(0, 0.022, 0.0075), V3(0, 0, 1), 0.172 * 1.15, 0.82, 38, t, 0.02 * (1 - eo(sg(t, T.q4, T.q4 + 0.4))));   // (r1) el teléfono más abajo: el chip no tapa el encabezado
    nico.raiz.visible = false;
    const toca = Math.sin(Math.PI * sg(t, T.toqueN - 0.22, T.toqueN + 0.14));
    manoN.visible = toca > 0.02;
    if (manoN.visible) {
      const r = 0.5, punta = V3(0.02 - 0.062 * Math.sin(r), 0.062 * Math.cos(r), 0), boton = V3(0.0, -0.047, 0);
      const pos = V3(0.06, -0.17, -0.006).lerp(boton.clone().sub(punta), toca);
      manoN.position.copy(celN.localToWorld(pos.multiplyScalar(1))); manoN.quaternion.copy(celN.getWorldQuaternion(new THREE.Quaternion()));
      manoN.userData.pulgar.rotation.set(0, 0, r); manoN.userData.pulgar.position.set(0.02, 0, 0.019);
    }
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  // ---- las 38 tarjetas que vuelan del monitor al celular de Nico (Q3m, Q3i) ----
  if (pa === "Q3m" && t >= T.vuela - 0.02) {
    celN.updateMatrixWorld(true); const dest = celN.localToWorld(V3(0, 0, 0.02));
    semilla = 77;
    CARTAS.forEach((c, i) => {
      const t0 = T.vuela + i * 0.01, u = sg(t, t0, t0 + 0.55);
      const ox = (az() - 0.5) * MONE.W * 0.8, oy = (az() - 0.5) * MONE.H * 0.6, rz = (az() - 0.5) * 6;
      if (u <= 0 || u >= 1) return;
      c.visible = true;
      const ori = V3(MC.x + ox, MC.y + oy, MC.z + 0.02);
      const p = ori.clone().lerp(dest, eio(u)); p.y += Math.sin(Math.PI * u) * 0.35; p.z += Math.sin(Math.PI * u) * 0.4;
      c.position.copy(p); c.rotation.set(0.4 * Math.sin(u * 6 + i), u * rz, u * rz * 0.5); c.scale.setScalar(lerp(1.6, 0.55, u));
    });
  }
  const camOjo = camera;
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camOjo.position);
  bigoteSegunCamara(camOjo);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROT_) ROT_[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const di = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) => { if (t >= ti - 0.04 && t < fin) hablar(GL[k], per, ent(ti - 0.04), orden, dx, minY, maxY, sobre); };
    const rot = (k, ti, cy, fin = 99, cx = 540) => { if (t >= ti && t < fin) ponerGlobo(ROT_[k], cx, cy, ent(ti), null, 3); };
    // (r1) remate en dos tiempos: la burbuja "a" con la primera mitad; la completa recién cuando suena la segunda (pop)
    const fase = (k, ti) => { const c = ti + CORTE[k]; return t < c ? [GL[k + "a"], ent(ti - 0.04)] : [GL[k], 0.75 + 0.25 * bk(sg(t, c, c + 0.18))]; };
    const di2 = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) => { if (t >= ti - 0.04 && t < fin) { const [g, e] = fase(k, ti); hablar(g, per, e, orden, dx, minY, maxY, sobre); } };
    if (pa === "P1") di("l1", leo, 0.04, T.p2, 1, -40, 470);
    if (pa === "P2") di("r1", ruben, T.r1, T.p3, 1, 0, 250);
    if (pa === "P3") di("l2", leo, T.l2, T.ins3, 1, 0, 250, 1860, 150);
    if (pa === "P3i" && t < T.l2 + LEN.l2 + 0.1) ponerGlobo(GL.l2, 540, 1690, 1, null, 1);
    if (pa === "P4" && t >= T.r2 - 0.04) { const [g, e] = fase("r2", T.r2); ponerGlobo(g, 540, 1690, e, null, 1); }
    if (pa === "P5") di("r3", ruben, T.r3, T.p5m, 1, 0, 250);
    if (pa === "P5m") di2("m1", marta, T.m1, T.p6, 1, 0, 250, 1860, 150);
    if (pa === "P6") di("n1", nico, T.n1, T.p6i, 1, 0, 330);
    if (pa === "P6b") di2("r4", ruben, T.r4, P1, 1, 0, 330);
    if (pa === "Q1r") di("r1b", ruben, T.r1b, T.q1l, 1, 0, 250);
    if (pa === "Q1l") di("l3", leo, T.l3, T.q2, 1, 0, 250, 1860, 150);
    if (pa === "Q2") { rot("ficha", T.ficha, 1640, T.prom); rot("prom", T.prom, 1640, T.perez); rot("perez", T.perez, 1640); }
    if (pa === "Q3") di("n1b", nico, T.n1b, T.q3m, 1, 0, 250);
    if (pa === "Q3i") rot("cartera", T.llegan - 0.05, 1730);
    if (pa === "Q3b") { di2("r5", ruben, T.r5, T.q4, 1, 0, 250); rot("cartera", T.q3b, 1720); }
    if (pa === "Q4i" && t >= T.n2 - 0.04) ponerGlobo(GL.n2, 540, 1700, ent(T.n2 - 0.04), null, 1);
    if (pa === "Q4") di("n2", nico, T.n2, T.q4m, 1, 0, 250);
    if (pa === "Q4m") { di("m2", marta, T.m2, T.q5, 1, 0, 250, 1860, 150); rot("pedido", T.pedido, 1650); }
    if (pa === "Q5") { rot("todos", T.q5 + 0.3, 1800); di2("r6", ruben, T.r6, T.c, 1, 0, 960, 1860, 80); }
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
