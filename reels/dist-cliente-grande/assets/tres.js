// Capa 3D de dist-cliente-grande (Three.js r170 local). Base técnica: reels/dist-pedidos-lunes (oficina vidriada y
// depósito), reels/ya-lo-cargo (el auto de Nico), reels/veterinaria-vacunas (tarjetas, rótulos con guía, regla de
// burbujas, planos de menos de 0,3 s). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   LA OFICINA DE RUBÉN DE TARDE (alrededor del origen, arriba del depósito): piso y = 3,2. Rubén se sienta de espaldas a
//     la pared del fondo (z = 0) mirando a +z (a la cámara). El monitor a su derecha (-x, la facturación por cliente), el
//     teléfono de escritorio en altavoz delante a su izquierda (+x, primer término a la derecha del cuadro), la puerta de
//     vidrio esmerilado detrás a su izquierda (Nico). El sol bajo entra por la persiana de la pared derecha.
//   EL DEPÓSITO (abajo, y = 0): la ZONA DE ARMADO por cliente (z = ZA): GRACIELA · LUNES, MARTA · LUNES, WALTER · JUEVES y
//     HÉCTOR · MARTES, este último sin pallet: el rincón del operario (reposera, radio, termo, táper, planta en lata).
//   LA CALLE DEL SÚPER HÉCTOR (x = VX): la vereda de baldosas de 9 panes, la fachada con el toldo verde apagado, el camión
//     gris sin nombre (furgón) estacionado, el auto de Nico detrás; más allá, la misma calle con el semáforo (Q1).
//   PARTE 1: "Rubén, ¿y Héctor?" · "¿Héctor? Compra todos los martes." · "Compraba." · la grúa al lugar vacío de Héctor ·
//            "Yo pensé que lo llamabas vos." · la vereda: "¡Rubén! ¿Cerraste?…" · "Te extrañó el contador." · "Llamame el
//            martes." · el post-it en el tablero que se vuela y se pega en el camión gris
//   PARTE 2: el aviso en el celular del auto · "¡Héctor! Ayer no pediste." · "¡Uh, se me pasó!" · Pedido ✓ · el pallet
//            HÉCTOR vuelve · la ficha · el panel · "Rubén, ¿y Héctor?" · "Compra." · Rubén a cámara
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, poseEn, CARA, BRAZOS, FACEPALM, saludo, pegarACamara, crearMate, crearTermo } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER as VERM } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"')]);

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

// =====================================================================================================
// EL DEPÓSITO (de día): piso gris-crema, paredes navy claro, racks, la zona de armado por cliente
// =====================================================================================================
const DEP = new THREE.Group(); scene.add(DEP);
const PASO = new THREE.Group(); DEP.add(PASO);   // lo que se esconde mientras la grúa cruza (baranda, perfiles, pasamanos)
const DX0 = -10, DX1 = 10, DZ0 = -16, DZ1 = 0, DH = 8.5;
const OFI = { x0: -3.6, x1: 3.6, z0: 0, z1: 6.2, piso: 3.2, alto: 2.8 };
const MESA_Y = OFI.piso + 0.76;
{
  const piso = mesh(new THREE.PlaneGeometry(DX1 - DX0 + 2, DZ1 - DZ0 + 2), mat(0xc4c0b0, 0.9), 0, 0, (DZ0 + DZ1) / 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; DEP.add(piso);
  const paredM = mat(0x34507a, 0.92);
  const pared = (w, h, x, y, z, ry) => { const p = mesh(new THREE.BoxGeometry(w, h, 0.3), paredM, x, y, z); p.rotation.y = ry; p.castShadow = false; DEP.add(p); };
  for (const x of [DX0 - 0.15, DX1 + 0.15]) pared(DZ1 + OFI.z1 - DZ0 + 0.3, DH, x, DH / 2, (DZ0 + DZ1 + OFI.z1) / 2, Math.PI / 2);
  pared(DX1 - DX0, DH, 0, DH / 2, OFI.z1 + 0.15, 0);
  pared(DX1 - 2.2, DH, (DX1 + 2.2) / 2, DH / 2, DZ0 - 0.15, 0); pared(-2.2 - DX0, DH, (DX0 - 2.2) / 2, DH / 2, DZ0 - 0.15, 0);
  pared(4.4, DH - 4.6, 0, 4.6 + (DH - 4.6) / 2, DZ0 - 0.15, 0);
  DEP.add(caja(0.3, 4.7, 0.4, M.navy3, -2.3, 2.35, DZ0)); DEP.add(caja(0.3, 4.7, 0.4, M.navy3, 2.3, 2.35, DZ0)); DEP.add(caja(4.9, 0.35, 0.4, M.navy3, 0, 4.65, DZ0));
  const afuera = mesh(new THREE.PlaneGeometry(30, 14), new THREE.MeshBasicMaterial({ color: 0xe8edf0 }), 0, 6, DZ0 - 14); afuera.castShadow = false; DEP.add(afuera);
  const patio = mesh(new THREE.PlaneGeometry(20, 14), mat(0xb7b3a6, 0.9), 0, 0.0, DZ0 - 7); patio.rotation.x = -Math.PI / 2; DEP.add(patio);
  const techo = mesh(new THREE.BoxGeometry(DX1 - DX0 + 0.6, 0.2, DZ1 + OFI.z1 - DZ0 + 0.6), mat(0x4a5b78, 0.95), 0, DH + 0.1, (DZ0 + DZ1 + OFI.z1) / 2); techo.castShadow = false; DEP.add(techo);
  for (let z = -14; z < 0; z += 4) for (const x of [-5, 0, 5]) { const c = mesh(new THREE.PlaneGeometry(2.6, 1.3), new THREE.MeshBasicMaterial({ color: 0xf2f4ee }), x, DH - 0.01, z); c.rotation.x = Math.PI / 2; c.castShadow = false; DEP.add(c); }
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
semilla = 5;
for (const x of [-7.6, -4.6, 4.6, 7.6]) { const r = crearRack(12, 8); r.rotation.y = Math.PI / 2; r.position.set(x, 0, -8.5); DEP.add(r); }
for (const [x, z, tp] of [[2.6, -11.5, 3], [-2.9, -12.8, 0], [0.4, -12.0, 1]]) { const p = new THREE.Group(); p.position.set(x, 0, z); cargaPallet(p, tp); DEP.add(p); }
for (const [x, z] of [[-2.5, -4], [2.5, -4], [-2.5, -11], [2.5, -11]]) {
  const g = new THREE.Group(); g.position.set(x, 7.0, z); DEP.add(g);
  g.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.4, 6), M.navy3, 0, 0.7, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.16, 0.62, 0.5, 24, 1, true), mat(C.navy3, 0.5, { side: THREE.DoubleSide })));
  const foco = new THREE.Mesh(new THREE.CircleGeometry(0.56, 24), new THREE.MeshBasicMaterial({ color: 0xfff1d6, toneMapped: false })); foco.rotation.x = Math.PI / 2; foco.position.y = -0.24; g.add(foco);
}
{
  const n = 12, ez = -0.6;
  for (let i = 0; i < n; i++) DEP.add(caja(0.95, 0.06, 0.3, mat(0x8a8e98, 0.5, { metalness: 0.4 }), -3.0, OFI.piso - (i + 1) * (OFI.piso / n) + 0.05, ez - (i + 1) * 0.28 + 0.1));
  const L = Math.hypot(OFI.piso, n * 0.28), ang = Math.atan2(OFI.piso, n * 0.28);
  for (const dx of [-0.5, 0.5]) { const l = caja(0.06, 0.1, L, M.navy3, -3.0 + dx, OFI.piso / 2 + 0.06, ez - n * 0.14); l.rotation.x = -ang; DEP.add(l); }
  for (const dx of [-0.5, 0.5]) { const l = caja(0.05, 0.05, L, M.g, -3.0 + dx, OFI.piso / 2 + 0.95, ez - n * 0.14); l.rotation.x = -ang; PASO.add(l); }
}
DEP.add(caja(OFI.x1 - OFI.x0 + 0.4, 0.3, OFI.z1 - OFI.z0 + 0.4, M.navy3, 0, OFI.piso - 0.15, (OFI.z0 + OFI.z1) / 2));
for (const x of [OFI.x0, 0, OFI.x1]) DEP.add(caja(0.28, OFI.piso - 0.3, 0.28, M.navy3, x, (OFI.piso - 0.3) / 2, 0.2));
DEP.add(caja(OFI.x1 - OFI.x0, 0.12, 1.0, M.navy3, 0, OFI.piso - 0.06, -0.5));
for (let x = OFI.x0 + 0.05; x <= OFI.x1; x += 0.9) PASO.add(caja(0.05, 0.95, 0.05, M.navy3, x, OFI.piso + 0.47, -0.97));
PASO.add(caja(OFI.x1 - OFI.x0, 0.06, 0.08, M.g, 0, OFI.piso + 0.95, -0.97));

// ---- LA ZONA DE ARMADO: un rectángulo crema pintado por cliente y el cartel kraft colgado de una viga con cadenitas ----
const ZA = -5.0;                                        // la fila de pallets de clientes
const SLOT = { GRACIELA: -3.05, MARTA: -1.25, WALTER: 0.55, HECTOR: 2.35 };
const CARTELES = [["GRACIELA · LUNES", SLOT.GRACIELA], ["MARTA · LUNES", SLOT.MARTA], ["WALTER · JUEVES", SLOT.WALTER], ["HÉCTOR · MARTES", SLOT.HECTOR]];
{
  const linea = (x, z, w, d) => { const l = mesh(new THREE.PlaneGeometry(w, d), mat(0xf2efe2, 0.85), x, 0.006, z); l.rotation.x = -Math.PI / 2; l.castShadow = false; DEP.add(l); };
  for (const [, x] of CARTELES) { const W = 1.45, D = 1.2; linea(x, ZA - D / 2, W, 0.08); linea(x, ZA + D / 2, W, 0.08); linea(x - W / 2, ZA, 0.08, D + 0.08); linea(x + W / 2, ZA, 0.08, D + 0.08); }
  // la viga con los carteles (detrás de la fila, a 2,85 m), dos parantes navy3
  const vz = ZA - 0.95;
  DEP.add(caja(0.12, 2.95, 0.12, M.navy3, -4.0, 1.47, vz)); DEP.add(caja(0.12, 2.95, 0.12, M.navy3, 3.5, 1.47, vz));
  DEP.add(caja(7.62, 0.14, 0.14, M.navy3, -0.25, 2.92, vz));
  for (const [txt, x] of CARTELES) {
    const t = lienzo(900, 300, (c, w, h) => { c.fillStyle = "#c9a46b"; c.fillRect(0, 0, w, h); c.strokeStyle = "#0b1220"; c.lineWidth = 18; c.strokeRect(9, 9, w - 18, h - 18); c.fillStyle = "#0b1220"; c.textAlign = "center"; c.textBaseline = "middle"; ajustar(c, txt, 900, 118, w - 80); c.fillText(txt, w / 2, h / 2 + 6); });
    const g = new THREE.Group(); g.position.set(x, 2.15, vz + 0.12); DEP.add(g);
    const pc = plano(1.32, 0.44, t, 0, 0, 0.012); pc.material.emissive = new THREE.Color(0xffffff); pc.material.emissiveMap = t; pc.material.emissiveIntensity = 0.3; g.add(pc);
    g.add(caja(1.36, 0.48, 0.02, M.navy, 0, 0, 0, 0.01));
    for (const s of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.55, 6), M.gris, s * 0.55, 0.5, 0));
  }
  // los pallets de los otros clientes: GRACIELA y MARTA armados, WALTER a medio armar
  for (const [x, capas] of [[SLOT.GRACIELA, 3], [SLOT.MARTA, 3], [SLOT.WALTER, 2]]) { const g = new THREE.Group(); g.position.set(x, 0, ZA); g.add(crearPallet()); cargarCapas(g, capas); DEP.add(g); }
}
// ---- el camión de reparto propio (cabina navy3, caja crema con franja verde) en el portón del fondo ----
const CAJA_C = { L: 6.0, W: 2.5, H: 2.6, piso: 1.2 };
function crearFurgon({ cue, cab, franja, conCarga = true }) {
  const g = new THREE.Group(), fr = cab;
  const { L, W: CW, H, piso } = CAJA_C;
  g.add(caja(CW, 0.12, L, M.navy3, 0, piso - 0.06, L / 2));
  g.add(caja(0.08, H, L, cue, -CW / 2 + 0.04, piso + H / 2, L / 2, 0.02)); g.add(caja(0.08, H, L, cue, CW / 2 - 0.04, piso + H / 2, L / 2, 0.02));
  g.add(caja(CW, 0.08, L, cue, 0, piso + H - 0.04, L / 2, 0.02)); g.add(caja(CW, H, 0.08, cue, 0, piso + H / 2, L - 0.04, 0.02));
  if (franja) for (const s of [-1, 1]) g.add(caja(0.02, 0.32, L - 0.2, franja, s * (CW / 2 + 0.005), piso + H * 0.5, L / 2, 0.01));
  g.add(caja(CW + 0.06, 0.12, 0.12, fr, 0, piso + H, 0.02, 0.02)); for (const s of [-1, 1]) g.add(caja(0.12, H + 0.1, 0.12, fr, s * CW / 2, piso + H / 2, 0.02, 0.02));
  g.add(caja(CW + 0.1, 0.18, 0.2, M.navy, 0, piso - 0.2, 0.0, 0.03));
  const puertas = [];
  for (const s of [-1, 1]) { const p = new THREE.Group(); p.position.set(s * CW / 2, piso, -0.04); p.rotation.y = s * -(Math.PI * 0.92); g.add(p); p.add(caja(CW / 2 - 0.02, H - 0.04, 0.06, cue, -s * (CW / 4), H / 2, -0.03, 0.02)); p.add(caja(0.05, 0.4, 0.03, fr, -s * (CW / 2 - 0.12), H * 0.45, -0.07, 0.01)); p.userData.s = s; puertas.push(p); }
  g.add(caja(CW, 2.3, 1.9, cab, 0, 1.55, L + 1.1, 0.18));
  g.add(caja(CW - 0.3, 0.8, 0.05, mat(0x2c4268, 0.15, { metalness: 0.3 }), 0, 2.15, L + 2.06, 0.02));
  for (const s of [-1, 1]) for (const z of [1.0, 2.3, L + 1.2]) g.add(mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.36, 22), M.goma, s * (CW / 2 - 0.2), 0.5, z).rotateZ(Math.PI / 2));
  const carga = [];
  if (conCarga) for (let i = 0; i < 4; i++) { const p = new THREE.Group(); p.position.set(i % 2 ? 0.6 : -0.6, piso, L - 0.8 - Math.floor(i / 2) * 1.3); p.rotation.y = Math.PI / 2; cargaPallet(p, i % 2 ? 3 : 0); g.add(p); carga.push(p); }
  g.userData = { carga, puertas };
  return sombras(g);
}
const camionPropio = crearFurgon({ cue: mat(C.cr, 0.55), cab: M.navy3, franja: M.g }); camionPropio.rotation.y = Math.PI; camionPropio.position.set(0, 0, DZ0 - 0.3); scene.add(camionPropio);
fusionar(DEP, [PASO]);

// ---- EL RINCÓN DEL OPERARIO en el lugar de HÉCTOR (parte 1) · el pallet de Héctor (parte 2) ----
const RIN = new THREE.Group(); RIN.position.set(SLOT.HECTOR, 0, ZA); scene.add(RIN);
// la reposera: caño navy, lona a rayas crema y verde apagado; el respaldo es un grupo que se pliega (Q3)
const lonaT = lienzo(256, 256, (x, w, h) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#5d7d4a" : "#efeee5"; x.fillRect(i * 32, 0, 32, h); } });
const reposera = new THREE.Group(); reposera.position.set(-0.05, 0, 0.1); reposera.rotation.y = -0.35; RIN.add(reposera);
const respaldo = new THREE.Group(); respaldo.position.set(0, 0.36, -0.22); reposera.add(respaldo);
{
  const cm = mat(C.navy, 0.4, { metalness: 0.3 }), lm = new THREE.MeshStandardMaterial({ map: lonaT, roughness: 0.85, side: THREE.DoubleSide });
  const tubo = (a, b, padre = reposera) => { const d = b.clone().sub(a), L = d.length(); const m = mesh(new THREE.CylinderGeometry(0.018, 0.018, L, 8), cm); m.position.copy(a.clone().add(b).multiplyScalar(0.5)); m.quaternion.setFromUnitVectors(V3(0, 1, 0), d.normalize()); padre.add(m); return m; };
  for (const s of [-1, 1]) { tubo(V3(s * 0.27, 0.0, 0.32), V3(s * 0.27, 0.36, -0.22)); tubo(V3(s * 0.27, 0.0, -0.3), V3(s * 0.27, 0.34, 0.3)); tubo(V3(s * 0.27, 0.0, 0.0), V3(s * 0.27, 0.62, -0.05), respaldo); }
  const asiento = mesh(new THREE.PlaneGeometry(0.54, 0.56), lm, 0, 0.33, 0.04); asiento.rotation.x = -Math.PI / 2 + 0.12; reposera.add(asiento);
  const lr = mesh(new THREE.PlaneGeometry(0.54, 0.62), lm, 0, 0.31, -0.03); lr.rotation.x = -0.08; respaldo.add(lr);
  respaldo.rotation.x = -0.45;
  // el almohadón crema
  const al = caja(0.4, 0.08, 0.26, M.cr, 0, 0.42, -0.1, 0.04); al.rotation.x = -0.5; respaldo.add(al);
}
sombras(reposera);
// el cajón de plástico crema dado vuelta con el termo y el táper, la radio portátil, la planta en la lata de aceite
const cajon = new THREE.Group(); cajon.position.set(0.52, 0, 0.0); RIN.add(cajon);
cajon.add(caja(0.42, 0.3, 0.32, mat(C.cr2, 0.6), 0, 0.15, 0, 0.02));
for (let i = 0; i < 3; i++) cajon.add(caja(0.08, 0.16, 0.01, M.cr3, -0.12 + i * 0.12, 0.16, 0.165, 0.004));
const termoR = crearTermo(); termoR.scale.setScalar(0.85); termoR.position.set(0.1, 0.3, 0.02); cajon.add(termoR);
const taper = caja(0.16, 0.06, 0.12, mat(0xe8ecef, 0.3), -0.1, 0.33, 0.04, 0.02); cajon.add(taper); cajon.add(caja(0.17, 0.015, 0.13, M.g, -0.1, 0.365, 0.04, 0.006));
const radio = new THREE.Group(); RIN.add(radio);
{
  radio.add(caja(0.34, 0.2, 0.1, M.navy, 0, 0.1, 0, 0.03));
  const dial = new THREE.Mesh(new THREE.CircleGeometry(0.055, 24), mat(C.cr, 0.5)); dial.position.set(0.08, 0.1, 0.052); radio.add(dial);
  for (let i = 0; i < 5; i++) radio.add(caja(0.012, 0.09, 0.005, M.cr3, -0.13 + i * 0.03, 0.1, 0.051, 0.002));
  const ant = mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.38, 6), M.gris, -0.1, 0.36, 0); ant.rotation.z = 0.35; radio.add(ant);
  radio.add(caja(0.2, 0.02, 0.03, M.navy3, 0, 0.215, 0, 0.01));
  sombras(radio);
}
const RADIO0 = V3(0.42, 0.3, 0.12);   // sobre el cajón, al lado del termo (en RIN)
const planta = new THREE.Group(); RIN.add(planta);
{
  // la lata de aceite vieja (cilindro crema con la franja navy) y la planta crecida, que cuelga por el borde
  planta.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 18), mat(0xd9d2b8, 0.5, { metalness: 0.2 }), 0, 0.11, 0));
  planta.add(mesh(new THREE.CylinderGeometry(0.102, 0.102, 0.05, 18), M.navy3, 0, 0.13, 0));
  semilla = 41;
  const hm = M.hoja, hm2 = mat(0x6a8f4f, 0.8);
  const hojaG = new THREE.SphereGeometry(1, 8, 6);
  for (let i = 0; i < 22; i++) {
    const a = i * 2.4, r = 0.04 + (i % 5) * 0.035, y = 0.24 + (i % 7) * 0.05, cae = i % 4 === 0 ? -0.18 - (i % 3) * 0.06 : 0;
    const h = mesh(hojaG, i % 3 ? hm : hm2, Math.cos(a) * (r + (cae ? 0.12 : 0)), y + cae, Math.sin(a) * (r + (cae ? 0.12 : 0)));
    h.scale.set(0.055, 0.016, 0.035); h.rotation.set(az() * 0.8, a, 0.4 + az() * 0.4); planta.add(h);
  }
  for (const s of [-1, 1]) { const tallo = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.3, 5), hm, s * 0.06, 0.32, 0); tallo.rotation.z = s * 0.3; planta.add(tallo); }
  sombras(planta);
}
const PLANTA0 = V3(-0.5, 0, -0.32);
// el pallet de HÉCTOR (parte 2): entra vacío y se llena por capas (aceite, harina, agua)
const palletH = new THREE.Group(); palletH.position.set(SLOT.HECTOR, 0, ZA); scene.add(palletH);
palletH.add(crearPallet());
const CAPAS_H = cargarCapas(palletH, 3);
sombras(palletH);

// =====================================================================================================
// LA OFICINA DE RUBÉN DE TARDE (pared del fondo: vidrio a la izquierda, crema a la derecha con la puerta)
// =====================================================================================================
const OF = new THREE.Group(); scene.add(OF);
const VXG = -0.15;                                // donde termina el vidrio y empieza la pared crema
const pantM = lienzo(1280, 800, () => {});        // el monitor
const DESK = { x0: -0.95, x1: 0.95, z0: 1.25, z1: 2.75 };
const PUERTA = { x0: 0.95, x1: 1.75, alto: 2.15 };
const MON = { x: -0.95, z: 1.45, ry: 0.6, W: 0.92, H: 0.575 };   // el monitor grande a su derecha, girado hacia la cámara
let monitor, termo, mate, telefono, puerta, franjas, franjasMesa, ledTel;
const paredM = mat(0xefeee5, 0.9);
{
  const OW = OFI.x1 - OFI.x0, OC = (OFI.x0 + OFI.x1) / 2, OZ = (OFI.z0 + OFI.z1) / 2;
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#b08a5e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#977350"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(3, 2);
  const p2 = mesh(new THREE.PlaneGeometry(OW, OFI.z1 - OFI.z0), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.7 }), OC, OFI.piso + 0.005, OZ); p2.rotation.x = -Math.PI / 2; p2.castShadow = false; OF.add(p2);
  OF.add(caja(OW, 0.15, OFI.z1 - OFI.z0, M.navy3, OC, OFI.piso + OFI.alto + 0.07, OZ));
  OF.add(caja(OW, OFI.alto, 0.12, paredM, OC, OFI.piso + OFI.alto / 2, OFI.z1));
  OF.add(caja(0.12, OFI.alto, OFI.z1 - OFI.z0, paredM, OFI.x0, OFI.piso + OFI.alto / 2, OZ));
  const WZ0 = 1.4, WZ1 = 3.6, WY0 = 0.9, WY1 = 2.5;
  OF.add(caja(0.12, OFI.alto, WZ0, paredM, OFI.x1, OFI.piso + OFI.alto / 2, WZ0 / 2));
  OF.add(caja(0.12, OFI.alto, OFI.z1 - WZ1, paredM, OFI.x1, OFI.piso + OFI.alto / 2, (WZ1 + OFI.z1) / 2));
  OF.add(caja(0.12, WY0, WZ1 - WZ0, paredM, OFI.x1, OFI.piso + WY0 / 2, (WZ0 + WZ1) / 2));
  OF.add(caja(0.12, OFI.alto - WY1, WZ1 - WZ0, paredM, OFI.x1, OFI.piso + WY1 + (OFI.alto - WY1) / 2, (WZ0 + WZ1) / 2));
  const cielo = new THREE.Mesh(new THREE.PlaneGeometry(WZ1 - WZ0, WY1 - WY0), new THREE.MeshBasicMaterial({ color: 0xf7e4bf, toneMapped: false })); cielo.position.set(OFI.x1 + 0.2, OFI.piso + (WY0 + WY1) / 2, (WZ0 + WZ1) / 2); cielo.rotation.y = -Math.PI / 2; OF.add(cielo);
  for (let i = 0; i < 20; i++) { const l = caja(0.012, 0.055, WZ1 - WZ0 - 0.04, mat(C.cr, 0.6), OFI.x1 - 0.1, OFI.piso + WY1 - 0.06 - i * 0.078, (WZ0 + WZ1) / 2, 0.004); l.rotation.z = 0.5; OF.add(l); }
  OF.add(caja(0.08, 0.07, WZ1 - WZ0 + 0.1, M.navy3, OFI.x1 - 0.1, OFI.piso + WY1 + 0.04, (WZ0 + WZ1) / 2));
  OF.add(caja(OW, 0.14, 0.03, M.navy3, OC, OFI.piso + 0.07, OFI.z1 - 0.07));
  for (const x of [OFI.x0 + 0.07, OFI.x1 - 0.07]) OF.add(caja(0.03, 0.14, OFI.z1 - OFI.z0, M.navy3, x, OFI.piso + 0.07, OZ));
  const v = new THREE.Mesh(new THREE.PlaneGeometry(VXG - OFI.x0, OFI.alto), M.vidrio); v.position.set((OFI.x0 + VXG) / 2, OFI.piso + OFI.alto / 2, 0); v.renderOrder = 3; OF.add(v);
  for (const x of [OFI.x0 + 0.04, -2.35, -1.15, VXG]) PASO.add(caja(0.07, OFI.alto, 0.09, M.navy, x, OFI.piso + OFI.alto / 2, 0));
  PASO.add(caja(VXG - OFI.x0, 0.08, 0.1, M.navy, (OFI.x0 + VXG) / 2, OFI.piso + OFI.alto - 0.04, 0)); PASO.add(caja(VXG - OFI.x0, 0.12, 0.1, M.navy, (OFI.x0 + VXG) / 2, OFI.piso + 0.06, 0));
  const tramo = (a, b, y0, y1) => OF.add(caja(b - a, y1 - y0, 0.12, paredM, (a + b) / 2, OFI.piso + (y0 + y1) / 2, -0.03));
  tramo(VXG, PUERTA.x0, 0, OFI.alto); tramo(PUERTA.x1, OFI.x1, 0, OFI.alto); tramo(PUERTA.x0, PUERTA.x1, PUERTA.alto, OFI.alto);
  OF.add(caja(OFI.x1 - VXG, 0.14, 0.03, M.navy3, (VXG + OFI.x1) / 2, OFI.piso + 0.07, 0.04));
  for (const x of [PUERTA.x0 - 0.03, PUERTA.x1 + 0.03]) OF.add(caja(0.06, PUERTA.alto, 0.16, M.navy3, x, OFI.piso + PUERTA.alto / 2, 0.0));
  OF.add(caja(PUERTA.x1 - PUERTA.x0 + 0.12, 0.06, 0.16, M.navy3, (PUERTA.x0 + PUERTA.x1) / 2, OFI.piso + PUERTA.alto + 0.03, 0.0));
  // el pizarrón chico con la ruta de los vendedores (a la derecha de la puerta) y el almanaque de la distribuidora
  const piz = lienzo(560, 380, (x, w, h) => { x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, w, h); x.strokeStyle = "#1f3254"; x.lineWidth = 28; x.strokeRect(0, 0, w, h); x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = CAV(96); x.fillText("Ruta Nico", 50, 110); x.font = CAV(80); x.fillText("lun · mié · vie", 50, 230); });
  OF.add(plano(0.7, 0.475, piz, 2.45, OFI.piso + 1.7, 0.04));
  const DW = DESK.x1 - DESK.x0, DD = DESK.z1 - DESK.z0, DCX = (DESK.x0 + DESK.x1) / 2, DCZ = (DESK.z0 + DESK.z1) / 2;
  OF.add(caja(DW, 0.05, DD, mat(0xc89a64, 0.55), DCX, MESA_Y - 0.025, DCZ, 0.012));
  for (const x of [DESK.x0 + 0.06, DESK.x1 - 0.06]) OF.add(caja(0.06, 0.72, DD - 0.1, M.navy3, x, OFI.piso + 0.36, DCZ));
  OF.add(caja(DW - 0.15, 0.5, 0.03, M.navy3, DCX, OFI.piso + 0.45, DESK.z1 - 0.08));
  const silla = new THREE.Group(); silla.position.set(0, OFI.piso, 0.62); OF.add(silla);
  silla.add(caja(0.52, 0.08, 0.5, M.navy, 0, 0.5, 0.18)); silla.add(caja(0.5, 0.7, 0.08, M.navy, 0, 0.92, -0.08)); silla.add(caja(0.06, 0.48, 0.06, M.gris, 0, 0.25, 0.15));
  monitor = new THREE.Group(); monitor.position.set(MON.x, MESA_Y, MON.z); monitor.rotation.y = MON.ry; OF.add(monitor);
  monitor.add(caja(0.1, 0.32, 0.1, M.navy, 0, 0.16, -0.05)); monitor.add(caja(0.36, 0.03, 0.28, M.navy, 0, 0.015, -0.03));
  monitor.add(caja(MON.W + 0.07, MON.H + 0.07, 0.06, M.navy, 0, 0.36 + MON.H / 2, 0, 0.025));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(MON.W, MON.H), new THREE.MeshBasicMaterial({ map: pantM, toneMapped: false })); pm.position.set(0, 0.36 + MON.H / 2, 0.032); monitor.add(pm);
  monitor.userData.centro = V3(0, 0.36 + MON.H / 2, 0.032);
  const teclado = new THREE.Group(); teclado.position.set(-0.05, MESA_Y, 1.6); OF.add(teclado);
  teclado.add(caja(0.5, 0.025, 0.17, M.navy3, 0, 0.012, 0, 0.01));
  for (let i = 0; i < 3; i++) for (let k = 0; k < 12; k++) teclado.add(caja(0.032, 0.012, 0.032, M.cr2, -0.21 + k * 0.038, 0.03, -0.045 + i * 0.042, 0.004));
  // EL TELÉFONO DE ESCRITORIO EN ALTAVOZ (primer término, a la derecha del cuadro): pantallita crema "CONTADOR" y el led
  // verde del altavoz
  telefono = new THREE.Group(); telefono.position.set(-0.22, MESA_Y, 2.45); telefono.rotation.y = -0.12; telefono.scale.setScalar(1.45); OF.add(telefono);
  telefono.add(caja(0.26, 0.07, 0.24, M.navy3, 0, 0.035, 0, 0.03));
  const cuna = caja(0.24, 0.045, 0.08, M.navy, 0, 0.095, -0.075, 0.02); telefono.add(cuna);
  const tubo = caja(0.27, 0.05, 0.075, M.navy3, 0, 0.13, -0.075, 0.03); telefono.add(tubo);
  for (let i = 0; i < 12; i++) telefono.add(caja(0.026, 0.012, 0.022, M.cr, 0.04 + (i % 3) * 0.032, 0.075, 0.0 + Math.floor(i / 3) * 0.028, 0.004));
  const pantT = lienzo(320, 120, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "CONTADOR", 900, 70, w - 30); x.fillText("CONTADOR", w / 2, h / 2 + 3); });
  const pantTel = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.05), new THREE.MeshBasicMaterial({ map: pantT, toneMapped: false })); pantTel.rotation.x = -Math.PI / 2 + 0.25; pantTel.position.set(-0.055, 0.073, 0.025); telefono.add(pantTel);
  // el parlante (rejilla de rayitas) y el led
  for (let i = 0; i < 4; i++) telefono.add(caja(0.075, 0.004, 0.006, M.navy, -0.06, 0.071, 0.065 + i * 0.012, 0.002));
  ledTel = new THREE.Mesh(new THREE.SphereGeometry(0.009, 10, 8), new THREE.MeshBasicMaterial({ color: C.g, toneMapped: false })); ledTel.position.set(-0.115, 0.074, 0.075); telefono.add(ledTel);
  const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V3(0.13, 0.13, -0.075), V3(0.17, 0.08, -0.06), V3(0.16, 0.03, -0.0), V3(0.14, 0.02, 0.05), V3(0.135, 0.06, 0.02)]), 30, 0.005, 6), M.navy); telefono.add(cable);
  mate = crearMate(); mate.scale.setScalar(1.12); OF.add(mate);
  termo = crearTermo(); termo.scale.setScalar(1.15); termo.position.set(0.72, MESA_Y, 2.3); termo.rotation.y = 0.4; OF.add(termo);
  // la pila de remitos con el broche y los biblioratos (atrás, a la izquierda del teclado)
  for (let i = 0; i < 6; i++) OF.add(caja(0.21, 0.006, 0.29, mat(i % 2 ? C.cr : 0xe8e4d6, 0.9), 0.05 + i * 0.004, MESA_Y + 0.004 + i * 0.006, 2.45, 0.002).rotateY(0.1 * i - 0.3));
  OF.add(caja(0.08, 0.02, 0.04, M.gris, 0.06, MESA_Y + 0.05, 2.35, 0.006));
  OF.add(caja(0.5, 1.1, 0.5, M.navy3, -3.1, OFI.piso + 0.55, 3.6));
  OF.add(caja(0.3, 0.05, 1.4, M.navy3, -3.42, OFI.piso + 1.6, 3.0));
  for (let i = 0; i < 7; i++) OF.add(caja(0.26, 0.34, 0.12, [M.navy3, M.g, M.cr2, M.red][i % 4], -3.42, OFI.piso + 1.8, 2.45 + i * 0.17, 0.01));
}
puerta = new THREE.Group(); puerta.position.set(PUERTA.x1, OFI.piso, 0.0); OF.add(puerta);
{
  const PW = PUERTA.x1 - PUERTA.x0;
  puerta.add(caja(PW, PUERTA.alto - 0.02, 0.05, M.navy3, -PW / 2, PUERTA.alto / 2, 0, 0.01));
  const esm = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.16, PUERTA.alto - 0.5), mat(0xdfe7ee, 0.3, { emissive: 0xdfe7ee, emissiveIntensity: 0.25 })); esm.position.set(-PW / 2, PUERTA.alto / 2 + 0.12, 0.028); puerta.add(esm);
  const esm2 = esm.clone(); esm2.position.z = -0.028; esm2.rotation.y = Math.PI; puerta.add(esm2);
  puerta.add(caja(0.12, 0.03, 0.06, M.gris, -PW + 0.1, 1.0, 0.05, 0.01));
  sombras(puerta);
}
// las franjas de sol de la persiana (de tarde: cálidas, bajas y largas)
const rayasT = lienzo(512, 512, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#ffe2b0"; for (let i = 0; i < 8; i++) x.fillRect(0, i * 64 + 6, w, 30); });
rayasT.wrapS = rayasT.wrapT = THREE.RepeatWrapping;
{
  const m = new THREE.MeshBasicMaterial({ map: rayasT, transparent: true, opacity: 0.45, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 });
  franjas = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.4), m); franjas.position.set(1.4, OFI.piso + 1.0, 0.065); franjas.rotation.z = -0.1; franjas.renderOrder = 2; OF.add(franjas);
  const m2 = m.clone(); m2.map = rayasT.clone(); m2.map.needsUpdate = true; m2.opacity = 0.3;
  franjasMesa = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.4), m2); franjasMesa.rotation.x = -Math.PI / 2; franjasMesa.rotation.z = 0.12; franjasMesa.position.set(0.3, MESA_Y + 0.003, 1.95); franjasMesa.renderOrder = 2; OF.add(franjasMesa);
}
sombras(OF);
OF.traverse((o) => { if (o.isMesh && (o.material === M.vidrio || o.material.transparent)) { o.castShadow = false; o.receiveShadow = false; } });
// ---- luces de la oficina de tarde: el sol bajo y cálido por la persiana (con sombra), el cielo, un relleno frío ----
const solOf = new THREE.DirectionalLight(0xffdcae, 2.4);
solOf.castShadow = true; solOf.shadow.mapSize.set(2048, 2048); solOf.shadow.bias = -0.0008; solOf.shadow.radius = 2;
Object.assign(solOf.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 20 });
solOf.position.set(7.0, OFI.piso + 2.6, 2.6); solOf.target.position.set(0, OFI.piso + 0.9, 1.4); scene.add(solOf, solOf.target);
const cieloOf = new THREE.HemisphereLight(0xf4efe4, 0x6a5a48, 1.6); scene.add(cieloOf);
const rellenoOf = new THREE.DirectionalLight(0xe2eafa, 0.85); rellenoOf.position.set(-1.5, OFI.piso + 3.5, 7); rellenoOf.target.position.set(0, OFI.piso + 1.2, 1); scene.add(rellenoOf, rellenoOf.target);
const solDep = new THREE.DirectionalLight(0xfffaf2, 1.6);
solDep.castShadow = true; solDep.shadow.mapSize.set(2048, 2048); solDep.shadow.bias = -0.0006; solDep.shadow.radius = 2;
Object.assign(solDep.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 40 });
solDep.position.set(-2, 13, 0); solDep.target.position.set(0, 0, -5); scene.add(solDep, solDep.target);
const cieloDep = new THREE.HemisphereLight(0xe6edf5, 0x5a5048, 2.0); scene.add(cieloDep);

// =====================================================================================================
// LA CALLE DEL SÚPER HÉCTOR (x = VX): vereda de baldosas de 9 panes, la fachada con el toldo verde apagado, el camión gris
// sin nombre, el auto de Nico, los vecinos; la calle sigue hacia -x (el semáforo de Q1)
// =====================================================================================================
const VX = 60;
const CA = new THREE.Group(); CA.position.x = VX; scene.add(CA);
const VER = 0.14;                                  // el alto de la vereda
const FZ = -3.0;                                   // el frente de las casas
let semaforoLuz;
{
  // la calle (asfalto liso, una raya crema discontinua al medio) y la vereda de enfrente
  const calle = mesh(new THREE.PlaneGeometry(120, 12), M.asfalto, -30, 0, 5.5); calle.rotation.x = -Math.PI / 2; calle.castShadow = false; CA.add(calle);
  for (let x = -88; x < 28; x += 3) { const r = mesh(new THREE.PlaneGeometry(1.4, 0.12), mat(0xe6e2cf, 0.8), x, 0.005, 5.6); r.rotation.x = -Math.PI / 2; r.castShadow = false; CA.add(r); }
  // las baldosas de 9 panes (gris claro, cuadrícula de 3x3 con líneas gruesas: que no haga moiré)
  const bal = lienzo(512, 512, (x, w, h) => {
    x.fillStyle = "#cfccc0"; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#b3b0a4"; x.lineWidth = 14; x.strokeRect(0, 0, w, h);
    x.lineWidth = 8; x.strokeStyle = "#bdbaae";
    for (let i = 1; i < 3; i++) { x.beginPath(); x.moveTo((i * w) / 3, 10); x.lineTo((i * w) / 3, h - 10); x.stroke(); x.beginPath(); x.moveTo(10, (i * h) / 3); x.lineTo(w - 10, (i * h) / 3); x.stroke(); }
  });
  bal.wrapS = bal.wrapT = THREE.RepeatWrapping; bal.repeat.set(120 / 0.6, 3 / 0.6);
  const ver = mesh(new THREE.BoxGeometry(120, VER, 3.0), [M.cr3, M.cr3, new THREE.MeshStandardMaterial({ map: bal, roughness: 0.85 }), M.cr3, M.cr3, M.cr3], -30, VER / 2, FZ / 2); CA.add(ver);
  CA.add(caja(120, VER + 0.02, 0.2, mat(0xa9a69a, 0.8), -30, VER / 2, 0.05, 0.03));   // el cordón
  const ver2 = mesh(new THREE.BoxGeometry(120, VER, 3.0), mat(0xc4c1b5, 0.9), -30, VER / 2, 12.5); CA.add(ver2);
  // los vecinos (cuadras de casas bajas de colores de la paleta), a los dos lados
  const colores = [0xd9d7c9, 0xb9cde0, 0xd8c9a8, 0xe6e3d4, 0x9fb3c9, 0xd9d7c9, 0xc9b99a];
  const vecinos = (z0, cara) => {
    let i = 0;
    for (let x = -90; x < 26; i++) {
      const w = 5 + (i % 3) * 1.5, h = 3.6 + ((i * 7) % 4) * 0.7;
      if (z0 < 0 && x + w > -4.2 && x < 4.2) { x = 4.2; continue; }   // el lugar del Súper Héctor
      const cx = x + w / 2, m = mat(colores[i % colores.length], 0.9);
      CA.add(caja(w - 0.1, h, 3, m, cx, h / 2, z0 + cara * -1.5, 0.02));
      CA.add(caja(w - 0.05, 0.25, 3.1, M.navy3, cx, h + 0.1, z0 + cara * -1.5, 0.02));
      const vm = mat(0x2c4268, 0.3);
      for (const dx of [-w / 4, w / 4]) CA.add(caja(1.0, 1.2, 0.05, vm, cx + dx, 1.7, z0 + cara * 0.03, 0.01));
      CA.add(caja(0.9, 2.1, 0.05, M.navy3, cx + (i % 2 ? w / 4 : -w / 4) * 0.0, 1.05, z0 + cara * 0.035, 0.01));
      x += w;
    }
  };
  vecinos(FZ, 1); vecinos(14.0, -1);
  // árboles de vereda (tronco + copa low-poly), uno cada tanto
  const copaG = new THREE.IcosahedronGeometry(1, 0);
  for (const [x, z] of [[-4.7, -0.55], [-16, -0.55], [-30, -0.55], [-44, -0.55], [9, -0.55], [-10, 12.0], [-26, 12.0], [5, 12.0]]) {
    CA.add(mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.6, 8), mat(0x6b4f3a, 0.9), x, 1.3, z));
    const c = mesh(copaG, M.hoja, x, 3.1, z); c.scale.set(1.15, 1.0, 1.15); CA.add(c);
    const c2 = mesh(copaG, mat(0x5d8846, 0.85), x + 0.4, 3.6, z - 0.2); c2.scale.setScalar(0.75); CA.add(c2);
  }
  // el semáforo (Q1) en la esquina, del lado del cordón
  const sem = new THREE.Group(); sem.position.set(-30, 0, -0.3); CA.add(sem);
  sem.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 10), M.navy3, 0, 1.6, 0));
  sem.add(caja(0.34, 0.95, 0.3, M.navy, 0, 3.4, 0.0, 0.05));
  for (let i = 0; i < 3; i++) { const l = new THREE.Mesh(new THREE.CircleGeometry(0.1, 18), new THREE.MeshBasicMaterial({ color: i === 0 ? C.red : 0x2c3446, toneMapped: false })); l.position.set(0.171, 3.7 - i * 0.3, 0); l.rotation.y = Math.PI / 2; sem.add(l); if (i === 0) semaforoLuz = l; }
}
// ---- EL SÚPER HÉCTOR: fachada navy3, dos vidrieras con góndolas, doble puerta de vidrio, persiana, toldo verde apagado,
// cartel crema "SÚPER HÉCTOR · AUTOSERVICIO" ----
const SUPER = new THREE.Group(); CA.add(SUPER);
const PUERTA_S = { x0: -0.8, x1: 0.8, alto: 2.3 };
let hojasSuper = [];
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
    x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "SÚPER HÉCTOR", 900, 150, w - 140); x.fillText("SÚPER HÉCTOR", w / 2, h * 0.43); x.font = F(800, 52); x.fillStyle = "#3a5a2c"; x.fillText("AUTOSERVICIO", w / 2, h * 0.83);
  });
  const cp = plano(6.2, 1.15, cart, 0, VER + 3.55, FZ + 0.02); cp.material.emissive = new THREE.Color(0xffffff); cp.material.emissiveMap = cart; cp.material.emissiveIntensity = 0.2; SUPER.add(cp);
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
fusionar(CA, [SUPER]);
fusionar(SUPER, hojasSuper);
// ---- el camión gris sin nombre (furgón, de otra distribuidora: nadie lo nombra): estacionado en el cordón delante del
// súper, la caja hacia +x (las puertas traseras miran al auto de Nico), la cabina hacia -x ----
const camionGris = crearFurgon({ cue: mat(0xb9bcc2, 0.55), cab: mat(0x9aa0a8, 0.55), franja: null, conCarga: true });
camionGris.rotation.y = -Math.PI / 2; camionGris.position.set(VX - 1.25, 0, 1.45); scene.add(camionGris);
// la zorra del chofer (carretilla de dos ruedas) con cajas kraft
function crearZorra(n = 3) {
  const g = new THREE.Group(), gm = mat(0x8d97a8, 0.4, { metalness: 0.35 });
  for (const s of [-1, 1]) { const l = caja(0.04, 1.2, 0.04, gm, s * 0.2, 0.62, -0.02, 0.01); g.add(l); }
  g.add(caja(0.44, 0.03, 0.04, gm, 0, 1.2, -0.02, 0.01)); g.add(caja(0.46, 0.02, 0.24, gm, 0, 0.03, 0.12, 0.005));
  for (const s of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16), M.goma, s * 0.25, 0.1, -0.05).rotateZ(Math.PI / 2));
  const cajas = [];
  for (let i = 0; i < n; i++) { const c = caja(0.4, 0.3, 0.3, mat(i % 2 ? C.kraft : 0xbf9a62, 0.85), 0, 0.2 + i * 0.31, 0.15, 0.015); g.add(c); cajas.push(c); }
  g.userData.cajas = cajas;
  return sombras(g);
}
const zorra = crearZorra(3); scene.add(zorra);
const cajaHector = caja(0.4, 0.3, 0.3, mat(0xbf9a62, 0.85), 0, 0, 0, 0.015); scene.add(cajaHector);
// ---- el auto de Nico (de ya-lo-cargo, limpio): carrocería crema, franja navy3, el celular en el soporte del tablero ----
const AUTO = { L: 3.4, W: 1.8, H: 1.75, piso: 0.32, asiento: 0.6 };
const pantN = lienzo(600, 1110, () => {});       // el celular de Nico en el soporte
function crearAuto() {
  const g = new THREE.Group(), cue = mat(C.cr, 0.45, { metalness: 0.05 }), fr = M.navy3;
  const { L, W: AW, H } = AUTO;
  g.add(caja(AW, 0.66, L, cue, 0, 0.63, 0, 0.2));
  g.add(caja(AW - 0.04, 0.16, 1.05, cue, 0, 0.92, L / 2 - 0.55, 0.12));
  for (const s of [-1, 1]) g.add(caja(0.02, 0.14, L - 0.4, fr, s * (AW / 2 + 0.002), 0.72, 0, 0.01));
  for (const s of [-1, 1]) g.add(caja(AW + 0.04, 0.16, 0.14, M.navy3, 0, 0.42, s * (L / 2 + 0.02), 0.05));
  for (const s of [-1, 1]) { g.add(mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 18), mat(0xfff6dc, 0.2, { emissive: 0xfff2c8, emissiveIntensity: 0.25 }), s * 0.6, 0.86, L / 2 + 0.01).rotateX(Math.PI / 2)); g.add(caja(0.26, 0.16, 0.04, M.red, s * 0.62, 0.9, -L / 2 - 0.005, 0.03)); }
  g.add(caja(0.9, 0.2, 0.03, M.navy3, 0, 0.62, L / 2 + 0.01, 0.03));
  const cab = { z0: -L / 2 + 0.15, z1: L / 2 - 1.05, y0: 0.95, y1: H };
  const cz = (cab.z0 + cab.z1) / 2, cl2 = cab.z1 - cab.z0;
  for (const s of [-1, 1]) g.add(caja(0.26, 0.12, cl2 + 0.12, cue, s * (AW / 2 - 0.15), cab.y1 - 0.06, cz, 0.05));
  g.add(caja(AW - 0.04, 0.12, cl2 - 0.1, cue, 0, cab.y1 - 0.04, cz, 0.05));
  for (const s of [-1, 1]) for (const [z, w] of [[cab.z0 + 0.08, 0.2], [cab.z1 - 0.06, 0.13], [-0.08, 0.13]]) g.add(caja(0.1, cab.y1 - cab.y0, w, cue, s * (AW / 2 - 0.06), (cab.y0 + cab.y1) / 2, z, 0.03));
  for (const s of [-1, 1]) g.add(caja(0.06, 0.06, cl2, fr, s * (AW / 2 - 0.05), cab.y0 + 0.02, cz, 0.02));
  const vid = (w, h, x, y, z, ry) => { const v = new THREE.Mesh(new THREE.PlaneGeometry(w, h), M.vidrioAuto); v.position.set(x, y, z); v.rotation.y = ry; v.renderOrder = 6; g.add(v); return v; };
  const vH = cab.y1 - cab.y0 - 0.12, vY = (cab.y0 + cab.y1) / 2 - 0.02;
  vid(cl2 - 0.1, vH, AW / 2 - 0.04, vY, cz, Math.PI / 2);
  // la ventanilla del acompañante (-x local = el lado del cordón): BAJA (por ahí sale volando el post-it)
  const parab = vid(AW - 0.16, vH, 0, vY, cab.z1, 0); parab.rotation.x = -0.12;
  vid(AW - 0.16, vH, 0, vY, cab.z0, Math.PI);
  const puertaA = new THREE.Group(); puertaA.position.set(-AW / 2 - 0.01, 0, cab.z1 - 0.05); g.add(puertaA);
  puertaA.add(caja(0.05, 0.64, 1.15, cue, -0.01, 0.63, -0.58, 0.03));
  puertaA.add(caja(0.02, 0.14, 1.1, fr, -0.035, 0.72, -0.58, 0.01));
  puertaA.add(caja(0.03, 0.04, 0.16, M.navy, -0.045, 0.86, -0.95, 0.01));
  for (const s of [-1, 1]) for (const z of [-L / 2 + 0.62, L / 2 - 0.62]) {
    const r = new THREE.Group(); r.position.set(s * (AW / 2 - 0.12), 0.34, z); g.add(r);
    r.add(mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.26, 24), M.goma).rotateZ(Math.PI / 2));
    r.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.27, 16), M.cr2).rotateZ(Math.PI / 2));
  }
  for (const s of [-1, 1]) { g.add(caja(0.62, 0.16, 0.6, M.navy2, s * 0.42, AUTO.asiento - 0.06, -0.05, 0.05)); g.add(caja(0.62, 0.7, 0.14, M.navy2, s * 0.42, AUTO.asiento + 0.32, -0.4, 0.06)); }
  g.add(caja(AW - 0.2, 0.16, 0.6, M.navy2, 0, AUTO.asiento - 0.06, -1.05, 0.05)); g.add(caja(AW - 0.2, 0.62, 0.14, M.navy2, 0, AUTO.asiento + 0.28, -1.38, 0.06));
  g.add(caja(AW - 0.12, 0.26, 0.3, M.navy3, 0, 0.98, cab.z1 - 0.07, 0.06));
  const volante = mesh(new THREE.TorusGeometry(0.17, 0.025, 8, 24), M.navy, 0.42, 1.08, cab.z1 - 0.3); volante.rotation.x = -0.5; g.add(volante);
  g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.16, 10), M.navy, 0.42, 1.06, cab.z1 - 0.22).rotateX(Math.PI / 2 - 0.5));
  g.add(caja(AW - 0.12, 0.05, 0.12, M.navy, 0, 1.12, cab.z1 - 0.06, 0.02));
  // el celular en su soporte (al medio del tablero), la pantalla mirando hacia atrás (a los asientos)
  const celu = new THREE.Group(); celu.position.set(0.05, 1.27, cab.z1 - 0.22); celu.rotation.x = -0.12; g.add(celu);
  celu.add(caja(0.15, 0.27, 0.025, M.navy, 0, 0, 0, 0.02));
  const cp = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.24), new THREE.MeshBasicMaterial({ map: pantN, toneMapped: false })); cp.position.z = -0.014; cp.rotation.y = Math.PI; celu.add(cp);
  celu.add(caja(0.19, 0.03, 0.07, M.navy3, 0, -0.15, 0.0, 0.01));
  for (const sx of [-1, 1]) celu.add(caja(0.02, 0.09, 0.05, M.navy3, sx * 0.087, -0.1, 0.0, 0.006));
  celu.add(caja(0.06, 0.05, 0.06, M.navy3, 0, -0.17, 0.03, 0.01));
  g.userData = { puertaA, celu, cab };
  return sombras(g);
}
const auto = crearAuto(); scene.add(auto);
auto.traverse((o) => { if (o.isMesh && o.material === M.vidrioAuto) o.castShadow = false; });
const AUTO_EST = V3(VX + 2.95, 0, 1.35);          // estacionado detrás del camión gris (mirando a -x)
const AUTO_SEM = V3(VX - 24, 0, 2.7);            // parado en el semáforo (Q1), en el carril
// el post-it crema con la letra de Nico (Caveat navy)
const postT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#f4ecc6"; x.fillRect(0, 0, w, h); x.fillStyle = "#e6dcae"; x.fillRect(0, 0, w, 26); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = CAV(84); x.fillText("HÉCTOR", w / 2, 108); x.font = CAV(78); x.fillText("MARTES", w / 2, 192); });
const postit = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.13), new THREE.MeshStandardMaterial({ map: postT, roughness: 0.8, side: THREE.DoubleSide })); postit.castShadow = true; scene.add(postit);
// ---- luces de la calle: el sol de media mañana (con sombra) y el cielo ----
const solCa = new THREE.DirectionalLight(0xfff4e2, 2.1);
solCa.castShadow = true; solCa.shadow.mapSize.set(2048, 2048); solCa.shadow.bias = -0.0008; solCa.shadow.radius = 2;
Object.assign(solCa.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 40 });
const cieloCa = new THREE.HemisphereLight(0xeaf0f6, 0x6a6458, 1.9); scene.add(cieloCa);
scene.add(solCa, solCa.target);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben, dedos: true, parpadeoCada: 999, parpadeosExtra: [2.0, r2(T.p3 + 0.15), r2(T.p5 + 0.2), r2(T.q4 + 0.5), r2(T.r3 + 2.0)] });
const nico = crearPersonaje({ ...ELENCO.empleado, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p4 + 1.5), r2(T.q1 + 0.6)] });
const hector = crearPersonaje({ ...ELENCO.hector, lentesCerca: 1.05, campera: { color: C.cr, cuello: C.cr2, cierre: C.cr3, abierta: true }, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p5 + 0.35), r2(T.q2 + 0.05)] });
const operario = crearPersonaje({ ...DEFECTO, nombre: "Darío", piel: PIEL.morena, pelo: PELO.negro, peinado: "corto", bigote: PELO.negro, cejasColor: 0x1e1a18, camisa: C.navy3, mangas: "largas", cuello: C.g, pantalon: C.navy3, zapatos: 0x2a2220, panza: 1.0, nariz: 0.058, parpadeoCada: 999 });
const chofer = crearPersonaje({ ...DEFECTO, nombre: "Chofer", piel: PIEL.media, pelo: PELO.castaño, peinado: "corto", camisa: 0x9aa0a8, mangas: "cortas", cuello: 0x9aa0a8, pantalon: 0x5a5e66, zapatos: 0x2a2220, panza: 1.05, parpadeoCada: 999 });
// el pelo de Rubén: la herradura de bolitas canosas (de dist-pedidos-lunes)
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
// gorras: el operario (navy, visera verde) y el chofer (gris)
for (const [per, gc, vc] of [[operario, C.navy3, C.g], [chofer, 0x8d939c, 0x6d727b]]) {
  const R0 = 0.3, CC0 = R0 * 0.92, gm = mat(gc, 0.7), vm = mat(vc, 0.5);
  per.cabeza.add(mesh(new THREE.SphereGeometry(R0 * 1.05, 28, 14, 0, Math.PI * 2, 0, Math.PI * 0.4), gm, 0, CC0 + 0.01, -0.01));
  const vis = mesh(new THREE.CylinderGeometry(R0 * 0.75, R0 * 0.75, 0.025, 24, 1, false, -Math.PI * 0.45, Math.PI * 0.9), vm, 0, CC0 + R0 * 0.66, R0 * 0.5); vis.scale.set(1.1, 1, 0.85); vis.rotation.x = -0.32; per.cabeza.add(vis);
}
// el maletín de muestras de Nico (navy3, franja y manija verdes; el origen en la manija)
const maletin = (() => {
  const g = new THREE.Group();
  g.add(caja(0.42, 0.3, 0.1, M.navy3, 0, -0.2, 0, 0.03));
  g.add(caja(0.425, 0.04, 0.105, M.g, 0, -0.13, 0, 0.01));
  for (const s of [-1, 1]) g.add(caja(0.04, 0.03, 0.11, M.cr, s * 0.12, -0.08, 0, 0.008));
  g.add(mesh(new THREE.TorusGeometry(0.055, 0.014, 8, 18, Math.PI), M.g, 0, -0.05, 0));
  return sombras(g);
})();
scene.add(maletin);
// el celular de Héctor (Q2, en la oreja) y el de Nico en la mano (P3)
const celH = new THREE.Group(); celH.add(caja(0.075, 0.15, 0.012, mat(0xd9a441, 0.6), 0, 0, 0, 0.012)); sombras(celH); scene.add(celH);
const celNmano = new THREE.Group(); celNmano.add(caja(0.075, 0.15, 0.012, M.navy, 0, 0, 0, 0.012)); sombras(celNmano); scene.add(celNmano);
const TODOS = [ruben, nico, hector, operario, chofer];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (el aviso, la ficha, el panel) ----
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
  AVATAR.hector = leer(hector, 0xb9cde0); AVATAR.nico = leer(nico, 0xefeee5);
  AVATAR.nelly = leer(crearPersonaje({ ...DEFECTO, nombre: "Nelly", piel: PIEL.media, pelo: PELO.rubio, peinado: "rodete", camisa: C.cr, mangas: "largas", labios: 0xb5555a, aros: C.g, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.fede = leer(crearPersonaje({ ...DEFECTO, nombre: "Fede", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "texturado", camisa: C.g, mangas: "cortas", parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.beto = leer(crearPersonaje({ ...DEFECTO, nombre: "Beto", piel: PIEL.clara, pelo: PELO.castaño, peinado: "corto", bigote: PELO.castaño, camisa: C.navy3, mangas: "cortas", parpadeoCada: 999 }), 0x5ce611);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// el íconito del parlante (para la cabecera de la burbuja del contador)
function parlante(x, cx, cy, r) {
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(cx - r * 0.5, cy - r * 0.2); x.lineTo(cx - r * 0.22, cy - r * 0.2); x.lineTo(cx + r * 0.1, cy - r * 0.5); x.lineTo(cx + r * 0.1, cy + r * 0.5); x.lineTo(cx - r * 0.22, cy + r * 0.2); x.lineTo(cx - r * 0.5, cy + r * 0.2); x.closePath(); x.fill();
  x.strokeStyle = "#5ce611"; x.lineWidth = r * 0.14; x.lineCap = "round"; for (const k of [0.32, 0.55]) { x.beginPath(); x.arc(cx + r * 0.1, cy, r * k, -0.8, 0.8); x.stroke(); }
}

// ================= PANTALLAS =================
// ---- el monitor de Rubén: la facturación por cliente (parte 1) · la ficha de Héctor (Q3b) · el panel (Q4) ----
let claveM = "";
function dibujarMonitor(t) {
  const modo = t < P2 ? "fact" : t < T.q4 ? "ficha" : "panel";
  const hueco = modo === "ficha" && t >= T.hueco ? 1 : 0;
  const nt = modo === "panel" ? T.tildes.filter((a) => t >= a).length : 0, cero = modo === "panel" && t >= T.cero ? 1 : 0, th = modo === "panel" && t >= T.tildeH ? 1 : 0;
  const clave = `${modo}|${hueco}|${nt}|${cero}|${th}`; if (clave === claveM) return; claveM = clave;
  const { x } = pantM.userData, w = 1280, h = 800;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "fact") {
    // la planilla genérica: grilla crema con encabezado navy (sin ícono de ningún programa); la fila de Héctor grande
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#efeee5"; ajustar(x, "Facturación por cliente", 800, 74, w - 80); x.fillText("Facturación por cliente", 40, 68);
    const cols = [20, 400, 620, 840, 1060, w - 20];
    x.fillStyle = "#1f3254"; x.fillRect(cols[0], 146, cols[5] - cols[0], 86);
    x.fillStyle = "#efeee5"; x.font = F(800, 54); ["Cliente", "AGO", "SET", "OCT", "NOV"].forEach((c, i) => x.fillText(c, cols[i] + 20, 190));
    const filas = [["Graciela", "62.400", "60.900", "63.100", "31.200", 0], ["Súper Héctor", "114.000", "0", "0", "0", 1], ["Marta", "48.300", "47.900", "49.500", "24.100", 0]];
    let y = 232;
    filas.forEach(([n, ...v], i) => {
      const hh = v[4] ? 250 : 130, big = v[4];
      x.fillStyle = big ? "#f7f6f0" : i % 2 ? "#e2e0d4" : "#f7f6f0"; x.fillRect(cols[0], y, cols[5] - cols[0], hh);
      if (big) { x.strokeStyle = "#c7655b"; x.lineWidth = 10; x.strokeRect(cols[0] + 5, y + 5, cols[5] - cols[0] - 10, hh - 10); }
      x.fillStyle = "#0b1220";
      if (big) { x.font = F(900, 66); x.fillText("Súper", cols[0] + 22, y + hh / 2 - 38); x.fillText("Héctor", cols[0] + 22, y + hh / 2 + 40); }
      else { x.font = F(700, 52); x.fillText(n, cols[0] + 22, y + hh / 2); }
      for (let k = 0; k < 4; k++) {
        const cero = big && v[k] === "0";
        x.fillStyle = cero ? "#c7655b" : "#0b1220"; x.font = F(big ? 900 : 700, big ? (cero ? 92 : 50) : 46);
        x.textAlign = "center"; x.fillText(cero ? "$ 0" : (big ? "$ " : "") + v[k], (cols[k + 1] + cols[k + 2]) / 2, y + hh / 2 + 2); x.textAlign = "left";
      }
      y += hh;
    });
    x.strokeStyle = "#1f3254"; x.lineWidth = 4; for (const c of cols) { x.beginPath(); x.moveTo(c, 146); x.lineTo(c, y); x.stroke(); }
  } else if (modo === "ficha") {
    // la ficha del cliente: cada cuánto compra, la tira de los martes, el último pedido
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, w, 10);
    x.fillStyle = "#efeee5"; x.font = F(800, 62); x.fillText("Clientes · Súper Héctor", 40, 62);
    avatar(x, AVATAR.hector, 130, 260, 92);
    x.fillStyle = "#efeee5"; x.font = F(900, 70); x.fillText("Héctor · dueño", 250, 222);
    x.fillStyle = "#5ce611"; x.font = F(800, 56); x.fillText("Compra cada 7 días · martes", 250, 300);
    x.fillStyle = "#b9cde0"; x.font = F(700, 48); x.fillText("Promedio: $ 38.000 · Vendedor: Nico", 40, 420);
    // la tira de 8 martes
    const n = 8, cw = 128, gap = 18, x0 = (w - (n * cw + (n - 1) * gap)) / 2;
    for (let i = 0; i < n; i++) {
      const ok = i < n - 1 || hueco, xx = x0 + i * (cw + gap);
      x.fillStyle = ok ? "#5ce611" : "#16243d"; x.beginPath(); x.roundRect(xx, 480, cw, 120, 20); x.fill();
      if (!ok) { x.strokeStyle = "#c7655b"; x.lineWidth = 10; x.setLineDash([22, 14]); x.stroke(); x.setLineDash([]); }
      else tilde(x, xx + cw / 2, 540, 62, "#0b1220");
    }
    x.fillStyle = hueco ? "#5ce611" : "#c7655b"; x.beginPath(); x.roundRect(40, 650, w - 80, 120, 30); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 68); x.textAlign = "center"; x.fillText(hueco ? "Último pedido: hoy ✓" : "No pidió ayer", w / 2, 712); x.textAlign = "left";
  } else {
    // el panel: "Dejaron de pedir esta semana"
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, w, 10);
    x.fillStyle = "#efeee5"; ajustar(x, "Dejaron de pedir esta semana", 800, 62, w - 80); x.fillText("Dejaron de pedir esta semana", 40, 62);
    const filas = [[AVATAR.hector, "Súper Héctor", "$ 38.000"], [AVATAR.nelly, "Panadería Nelly", "$ 9.500"], [AVATAR.fede, "Rotisería Fede", "$ 7.200"], [AVATAR.beto, "Kiosco Beto", "$ 6.300"]];
    filas.forEach(([cv, nom, m], i) => {
      const y = 150 + i * 112, ok = i < nt, luz = i === 0 && th;
      x.fillStyle = luz ? "#5ce611" : "#efeee5"; x.beginPath(); x.roundRect(30, y, w - 60, 98, 22); x.fill();
      avatar(x, cv, 84, y + 49, 38);
      x.fillStyle = "#0b1220"; x.font = F(800, 54); x.fillText(nom, 140, y + 51);
      x.fillStyle = "#1f3254"; x.font = F(800, 50); x.textAlign = "right"; x.fillText(m, 860, y + 51); x.textAlign = "left";
      x.fillStyle = ok ? (luz ? "#0b1220" : "#5ce611") : "#c9ccd2"; x.beginPath(); x.roundRect(890, y + 14, 330, 70, 35); x.fill();
      x.fillStyle = ok ? (luz ? "#5ce611" : "#0b1220") : "#6d727b"; x.font = F(900, 44); x.textAlign = "center"; x.fillText(ok ? "Pidió ✓" : "Llamado…", 1055, y + 50); x.textAlign = "left";
    });
    const yc = 610;
    x.fillStyle = cero ? "#5ce611" : "#16243d"; x.beginPath(); x.roundRect(30, yc, 520, 160, 30); x.fill();
    x.fillStyle = cero ? "#0b1220" : "#efeee5"; x.font = F(800, 50); x.fillText("Sin pedir:", 60, yc + 80);
    x.fillStyle = cero ? "#0b1220" : "#c7655b"; x.font = F(900, 120); x.fillText(cero ? "0" : String(4 - nt), 340, yc + 86);
    x.fillStyle = "#5ce611"; x.font = F(900, 72); x.textAlign = "right"; x.fillText(cero ? "$ 61.000" : "", w - 40, yc + 52); x.font = F(800, 44); x.fillStyle = "#efeee5"; x.fillText(cero ? "que no se fueron" : "", w - 40, yc + 122); x.textAlign = "left";
  }
  pantM.needsUpdate = true;
}
// ---- el celular de Nico en el soporte del auto (parte 2): el aviso → llamando → en llamada → Pedido ✓ ----
let claveN = "";
function dibujarCelN(t) {
  const modo = t < T.vibra ? "mapa" : t < T.llamar ? "aviso" : t < T.n2 + 0.2 ? "llama" : t < T.pedido ? "habla" : "pedido";
  const seg = modo === "habla" ? Math.floor(t - T.n2) : 0, toq = modo === "aviso" && t >= T.llamar - 0.15 ? 1 : 0;
  const clave = `${modo}|${seg}|${toq}`; if (clave === claveN) return; claveN = clave;
  const { x } = pantN.userData, w = 600, h = 1110;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  const cab = () => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#5ce611"; x.fillRect(0, 150, w, 8); x.fillStyle = "#efeee5"; ajustar(x, "Distribuidora Rubén", 800, 48, w - 60); x.fillText("Distribuidora Rubén", 30, 56); x.fillStyle = "#5ce611"; x.font = F(700, 38); x.fillText("Clientes", 30, 112); };
  if (modo === "mapa") {
    // la ruta del día (mapita plano) antes del aviso
    cab(); x.fillStyle = "#1f3254"; x.fillRect(0, 158, w, h - 158);
    x.strokeStyle = "#2c4268"; x.lineWidth = 26; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(0, 260 + i * 200); x.lineTo(w, 220 + i * 200); x.stroke(); x.beginPath(); x.moveTo(80 + i * 130, 158); x.lineTo(60 + i * 130, h); x.stroke(); }
    x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.beginPath(); x.moveTo(110, 1000); x.lineTo(190, 640); x.lineTo(450, 560); x.lineTo(470, 300); x.stroke();
    x.fillStyle = "#efeee5"; x.font = F(900, 96); x.textAlign = "center"; x.fillText("8:10", w / 2, 860);
  } else if (modo === "aviso") {
    cab();
    // la tarjeta del aviso (crema), el chip rojo apagado, los datos y el botón verde
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(22, 190, w - 44, 890, 36); x.fill();
    avatar(x, AVATAR.hector, 102, 282, 64);
    x.fillStyle = "#0b1220"; ajustar(x, "Súper Héctor", 900, 56, w - 230); x.fillText("Súper Héctor", 186, 262);
    x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(186, 296, 300, 60, 30); x.fill(); x.fillStyle = "#efeee5"; x.font = F(800, 36); x.fillText("No pidió ayer", 206, 328);
    const datos = [["Compra cada 7 días", 48, "#0b1220", 900], ["los martes", 46, "#1f3254", 800], ["Último pedido:", 40, "#1f3254", 700], ["hace 8 días", 46, "#c7655b", 900], ["$ 38.000 por semana", 44, "#0b1220", 800], ["Vendedor: Nico", 40, "#1f3254", 700]];
    let y = 420; for (const [s, p, c, wgt] of datos) { x.fillStyle = c; ajustar(x, s, wgt, p, w - 100); x.fillText(s, 52, y); y += p * 1.45; }
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(46, 920, w - 92, 130, 65); x.fill();
    if (toq) { x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.stroke(); }
    x.fillStyle = "#0b1220"; x.font = F(900, 66); x.textAlign = "center"; x.fillText("Llamar", w / 2, 987);
  } else if (modo === "llama" || modo === "habla") {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
    avatar(x, AVATAR.hector, w / 2, 380, 150);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 64); x.fillText("Súper Héctor", w / 2, 620);
    x.fillStyle = "#5ce611"; x.font = F(800, 52); x.fillText(modo === "llama" ? "Llamando…" : `0:0${Math.min(9, seg)}`, w / 2, 710);
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2, 940, 74, 0, 7); x.fill();
    x.strokeStyle = "#efeee5"; x.lineWidth = 18; x.lineCap = "round"; x.beginPath(); x.arc(w / 2, 960, 40, Math.PI * 1.15, Math.PI * 1.85); x.stroke();
  } else {
    cab();
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(22, 200, w - 44, 860, 36); x.fill();
    x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, 400, 130, 0, 7); x.fill(); tilde(x, w / 2, 405, 150, "#5ce611");
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 92); x.fillText("Pedido ✓", w / 2, 640);
    x.font = F(800, 52); x.fillText("Súper Héctor", w / 2, 760); x.font = F(900, 64); x.fillText("$ 38.000", w / 2, 860); x.font = F(800, 52); x.fillText("Sale hoy", w / 2, 960);
  }
  pantN.needsUpdate = true;
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
  const limpio = (s) => s.replace(/[[\]]/g, "");
  x.font = F(800, px); x.textBaseline = "middle"; x.textAlign = "left";
  const partes = l.split(/(\[[^\]]+\])/).filter(Boolean);
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
  const limpio = (l) => l.replace(/[[\]]/g, "");
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
const AVISOS = [];
const coronillaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(V3(0, 0.62, 0))); };
function hablar(g, per, s, orden = 1, dx = 0, minY = 250) {
  const [hx, hy] = coronillaPx(per), [mx, my] = bocaPx(per);
  const { H } = g.userData;
  const cy = hy - 100 - H / 2;
  if (cy - H / 2 < minY - 10) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  if (mx < 70 || mx > 1010 || hy < 0 || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, Math.max(cy, H / 2 + minY), s, [hx, hy + 6], orden);
}
const CONT = { icono: "parlante", nombre: "Contador · altavoz" };
const GL = {
  c1: crearGlobo(["Rubén, ¿y [Héctor?]"], 76, { cab: CONT, minW: 760 }),
  r1: crearGlobo(["¿Héctor? Compra", "[todos los martes.]"], 72),
  c2: crearGlobo(["{Compraba.}"], 104, { cab: CONT, minW: 760 }),
  n1: crearGlobo(["Yo pensé que lo", "llamabas [vos.]"], 78),
  h1a: crearGlobo(["¡Rubén!", "¿[Cerraste?]"], 84),
  h1: crearGlobo(["Dejé de pedir", "y [nadie me llamó.]"], 72),
  r2: crearGlobo(["Te extrañó", "el [contador.]"], 92),
  h2: crearGlobo(["Llamame", "el [martes.]"], 84),
  n2: crearGlobo(["¡Héctor! Ayer no", "pediste. ¿[Todo bien?]"], 68),
  h3: crearGlobo(["¡Uh, se me pasó!", "Mandame [lo de los martes.]"], 62),
  c1b: crearGlobo(["Rubén, ¿y [Héctor?]"], 76, { cab: CONT, minW: 760 }),
  r1b: crearGlobo(["¿Héctor? Compra", "[todos los martes.]"], 72),
  c3: crearGlobo(["[Compra.]"], 104, { cab: CONT, minW: 760 }),
};
const ROT = [
  crearRotulo([["Súper Héctor:", null, 46], ["$ 38.000 por semana", null, 52]], 46),
  crearRotulo([["Último pedido:", null, 44], ["martes 18 de agosto", null, 50]], 46),
  crearRotulo([["12 martes sin pedir", "#c7655b", 56], ["$ 456.000", "#c7655b", 88]], 50),
];
const ROT_Q = [crearRotulo([["Aviso automático:", null, 50], ["dejó de pedir", "#5ce611", 60]]), crearRotulo([["La ficha de cada cliente:", null, 48], ["cada cuánto compra", "#5ce611", 56]])];
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// ================= MANO SUELTA (inserto del celular: el índice de Nico que toca) =================
function crearDedo(piel) {
  const g = new THREE.Group(), m = mat(piel, 0.55);
  const d = mesh(new THREE.CapsuleGeometry(0.0105, 0.07, 4, 10), m, 0, -0.035, 0); g.add(d);
  const pu = mesh(new THREE.SphereGeometry(1, 16, 12), m, 0.006, -0.105, -0.004); pu.scale.set(0.034, 0.036, 0.024); g.add(pu);
  const pulg = mesh(new THREE.CapsuleGeometry(0.01, 0.035, 4, 8), m, 0.03, -0.085, 0.004); pulg.rotation.z = -0.7; g.add(pulg);
  g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  return g;
}
const DEDO_N = crearDedo(ELENCO.empleado.piel); DEDO_N.scale.setScalar(0.5); auto.userData.celu.add(DEDO_N);
// la mano de Nico que pega el post-it (P7b): una palma con el pulgar arriba
const MANO_POST = (() => {   // (no se usa: el post-it cae solo)
  const g = new THREE.Group(), m = mat(ELENCO.empleado.piel, 0.55);
  const palma = mesh(new THREE.SphereGeometry(1, 18, 12), m, 0, 0, 0); palma.scale.set(0.045, 0.055, 0.02); g.add(palma);
  for (let i = 0; i < 4; i++) { const d = mesh(new THREE.CapsuleGeometry(0.009, 0.04, 4, 8), m, -0.03 + i * 0.02, 0.06, 0); g.add(d); }
  const pul = mesh(new THREE.CapsuleGeometry(0.01, 0.035, 4, 8), m, 0.05, 0.0, 0.01); pul.rotation.z = -0.9; g.add(pul);
  const manga = mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.14, 14), mat(C.g, 0.6), 0, -0.1, 0); g.add(manga);
  g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  return g;
})();
scene.add(MANO_POST);

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
const OY = OFI.piso;
const CAM_P1 = (k) => [lerp(-0.52, -0.49, k), lerp(OY + 1.8, OY + 1.77, k), lerp(4.25, 3.95, k), -0.58, OY + 1.08, 1.3, 52];
const HZ = V3(SLOT.HECTOR, 0, ZA);
const P2_FIN = [HZ.x - 0.3, 1.95, HZ.z + 4.0, HZ.x - 0.78, 0.95, HZ.z - 0.2, 50];
const K_GRUA = () => [
  [T.p2, ...CAM_P1(1)],
  [r2(T.p2 + 0.3), -1.1, OY + 2.25, 2.4, -1.4, OY + 0.4, -2.0, 52],
  [r2(T.p2 + 0.62), -1.5, OY + 1.7, -0.6, 0.2, 1.2, ZA, 54],
  [T.llega, ...P2_FIN],
  [T.p3, P2_FIN[0] - 0.05, P2_FIN[1] - 0.05, P2_FIN[2] - 0.35, ...P2_FIN.slice(3, 6), 49],
];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, null],   // la grúa (se arma en renderAt)
  // P3: de frente a la puerta: Rubén en primer término de 3/4, Nico asomado
  ["P3", T.p3, [[T.p3, -0.25, OY + 1.7, 4.4, 0.75, OY + 1.15, 0.55, 50], [T.p4, -0.22, OY + 1.68, 4.15, 0.75, OY + 1.15, 0.55, 49]]],
  // P4: la vereda desde la calle: el camión gris a la izquierda, el auto a la derecha, la puerta del súper al medio
  ["P4", T.p4, [[T.p4, VX + 0.1, 1.7, 7.6, VX + 0.1, 1.35, FZ, 54], [T.p4b, VX + 0.1, 1.68, 7.0, VX + 0.12, 1.35, FZ, 53]]],
  // P4b: push-in a Héctor y Rubén (dos personas en cuadro, la burbuja arriba de Héctor)
  ["P4b", T.p4b, [[T.p4b, VX + 1.05, 1.62, 0.15, VX - 0.35, 1.55, -2.0, 50], [T.p5, VX + 1.0, 1.61, 0.0, VX - 0.35, 1.55, -2.0, 49]]],
  // P5: la pausa desde atrás de Héctor: Rubén de frente, el camión gris detrás a la izquierda
  ["P5", T.p5, [[T.p5, VX - 1.9, 1.8, -1.75, VX + 0.85, 1.42, -1.35, 46], [T.p6, VX - 1.82, 1.79, -1.73, VX + 0.85, 1.42, -1.35, 45]]],
  // P6: el remate: primer plano de Rubén de frente, el camión gris desenfocado atrás
  ["P6", T.p6, [[T.p6, VX - 0.85, 1.55, -2.5, VX + 0.85, 1.52, -1.35, 54], [T.p7, VX - 0.72, 1.55, -2.42, VX + 0.85, 1.52, -1.35, 53]]],
  // P7: Héctor entrando con la caja, por encima del hombro; Nico junto al auto con el post-it
  ["P7", T.p7, [[T.p7, VX + 0.95, 1.6, -0.15, VX - 0.3, 1.45, -2.3, 54], [T.p7b, VX + 0.9, 1.6, -0.3, VX - 0.3, 1.45, -2.3, 53]]],
  ["P7b", T.p7b, null],  // el post-it en el tablero (dentro del auto)
  ["P7c", T.p7c, null],  // el auto arranca; el post-it vuela al camión gris
  // ---- parte 2 ----
  ["Q1", P2, null],       // el auto en el semáforo: push-in al celular del soporte
  // Q2: Héctor en la puerta con el celular en la oreja (la misma vereda, sin camión)
  ["Q2", T.q2, [[T.q2, VX + 1.3, 1.62, -0.2, VX + 0.05, 1.45, -2.35, 46], [T.q2i, VX + 1.22, 1.61, -0.4, VX + 0.05, 1.45, -2.35, 45]]],
  ["Q2i", T.q2i, null],   // el inserto: Pedido ✓
  ["Q3", T.q3, [[T.q3, ...P2_FIN.map((v, i) => v + [0.2, 0.1, 0.35, 0.2, 0, 0, 2][i])], [r2(T.grua2[0] - 0.05), ...P2_FIN.map((v, i) => v + [0.25, 0.08, 0.1, 0.15, 0, 0, 1][i])]]],
  ["Q3b", r2(T.grua2[0] - 0.05), null],   // la ficha en el monitor (inserto)
  ["Q4", T.q4, [[T.q4, ...CAM_P1(0)], [T.q4b, ...CAM_P1(0.6)]]],
  ["Q4b", T.q4b, null],   // push al monitor con Rubén en cuadro
  ["C", T.c, [[T.c, 0.02, OY + 1.3, 3.5, 0.02, OY + 1.0, 1.0, 40], [DUR, 0.02, OY + 1.29, 3.3, 0.02, OY + 1.0, 1.0, 39]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s), se saca`); PLANOS.splice(i, 1); } }
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
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca = { ...(p.boca || {}), abierta: Math.max(p.boca?.abierta ?? 0, cl(e * 1.1 - 0.05) * k) }; }
};
const envEn = (t, t0, env) => { if (!env || t < t0 || t >= t0 + env.length / 30) return 0; const i = Math.floor((t - t0) * 30); return env[i] ?? 0; };
const _w = new THREE.Vector3();
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
// ---------- Rubén en la oficina (sentado de espaldas a la pared del fondo, mirando a +z) ----------
const R_POS = { x: 0, y: OFI.piso - 0.08, z: 1.02 };
const MIRA_MON = -0.55;
function rubenOficina(t) {
  const parte2 = t >= P2;
  const pr = { ...R_POS, giro: 0.12, sentado: 1, inclina: -0.04, cabeza: { giro: 0.18, asiente: 0.06, ladea: 0.04 }, ...NADA, ojos: { x: 0.2, y: -0.1, abiertos: 0.95, tension: 0.05, feliz: 0 }, manoI: [0.22, 0.4, 0.3], codoI: [1, -0.6, -0.2], manoD: [-0.3, 0.24, 0.32], codoD: null, dedoI: 0, dedoD: 0, t };
  if (!parte2) {
    if (t < T.p3) {
      // P1: relajado, mirando el teléfono (a su izquierda, +x); "Compraba.": la bombilla se frena, cara de incrédulo, los
      // ojos al monitor
      Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.35, y: -0.25, abiertos: 0.92, feliz: 0.15 }, cejas: { alto: 0.1, ang: 0 }, boca: { sonrisa: 0.25, abierta: 0, ancho: 1 } });
      pr.cabeza = { giro: 0.32, asiente: 0.1, ladea: 0.05 };
      if (t >= T.frena) {
        const u = eio(sg(t, T.frena, T.frena + 0.35));
        pr.cabeza = { giro: lerp(0.32, MIRA_MON, u), asiente: 0.06, ladea: 0.0 }; pr.ojos = { x: lerp(0.35, -0.6, u), y: -0.05, abiertos: 0.62, tension: 0 };
        pr.cejas = { alto: 0.1, ang: 0, asim: 0.9 }; pr.boca = { sonrisa: -0.35, abierta: 0, ancho: 0.8 };
      }
      bocaVoz(pr, t, T.r1, ENV.r1, 0.6);
    } else {
      // P3: Nico en la puerta (detrás, a su izquierda): Rubén gira la silla y la cabeza despacio
      const u = eio(sg(t, T.gira, T.gira + 0.45));
      Object.assign(pr, { cejas: { alto: 0.1, ang: 0, asim: 0.6 }, boca: { sonrisa: -0.3, abierta: 0, ancho: 0.85 } });
      pr.giro = lerp(0.12, 0.85, u); pr.cabeza = { giro: lerp(MIRA_MON, 0.95, u), asiente: 0.04, ladea: 0 }; pr.ojos = { x: lerp(-0.6, 0.5, u), y: 0.05, abiertos: 0.72, tension: 0.2 };
    }
    return pr;
  }
  // parte 2 (Q4): tranquilo de verdad, el mate; mira el teléfono; "¿Héctor? Compra todos los martes."
  Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.35, y: -0.25, abiertos: 0.95, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.05 } });
  pr.cabeza = { giro: 0.32, asiente: 0.1, ladea: 0.05 };
  bocaVoz(pr, t, T.r1b, ENV.r1, 0.6);
  if (t >= T.c3) { pr.boca.sonrisa = 0.7; pr.ojos.feliz = 0.45; }
  if (t >= T.c) {
    // C: a cámara, media sonrisa, de colega
    Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 0.95, feliz: 0.2, x: 0, y: 0.05 }, cejas: { alto: 0.15, ang: 0.0, asim: 0.25 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1.0 } });
    pr.giro = 0; pr.inclina = 0.06; pr.cabeza = { giro: 0, asiente: 0.0, ladea: 0.0 };
    bocaVoz(pr, t, T.r3, ENV.r3, 0.6);
  }
  return pr;
}
// ---------- Rubén en la vereda (parado, las manos en los bolsillos) ----------
const R_VER = V3(VX + 0.85, VER, -1.35);
function rubenVereda(t) {
  const pr = { x: R_VER.x, y: VER, z: R_VER.z, giro: -2.15, inclina: 0.0, ...aC(0, 0.02), ...NADA, manoI: [0.24, -0.02, -0.02], manoD: [-0.24, -0.02, -0.02], codoI: [1, 0.2, -0.3], codoD: [-1, 0.2, -0.3], dedoI: 0, dedoD: 0, t };
  if (t < T.p4 + 0.55) { const u = sg(t, T.p4, T.p4 + 0.55); pr.x = lerp(VX + 1.45, R_VER.x, eo(u)); pr.z = lerp(-0.6, R_VER.z, eo(u)); pr.paso = u < 1 ? 1 : 0; pr.giro = lerp(-2.6, -2.15, u); }
  if (t >= T.h1) { Object.assign(pr, { ...NADA, cejas: { alto: 0.25, ang: 0.3, asim: 0.4 } }); }
  if (t >= T.p5) {
    // la pausa: mira el camión gris (a su izquierda, -x), después vuelve los ojos a Héctor
    const u = eio(sg(t, T.p5 + 0.05, T.p5 + 0.3)) * (1 - eio(sg(t, T.cierra[1], T.cierra[1] + 0.25)));
    pr.cabeza = { giro: lerp(0, 0.95, u), asiente: 0.03, ladea: 0 }; pr.ojos = { x: lerp(0, 0.8, u), y: 0, abiertos: 0.85, tension: 0.2 };
  }
  if (t >= T.p6) { Object.assign(pr, { ...SECO, ojos: { x: 0, y: -0.05, abiertos: 0.7, tension: 0.3 }, cejas: { alto: -0.05, ang: 0.05, asim: 0.35 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.9 } }); pr.cabeza = { giro: -0.05, asiente: 0.06, ladea: 0.03 }; }
  bocaVoz(pr, t, T.r2, ENV.r2, 0.6);
  if (t >= T.p7) { pr.cabeza = { giro: -0.35, asiente: 0.0, ladea: 0 }; Object.assign(pr, { ...NADA }); }
  return pr;
}
// ---------- Héctor en la vereda (parte 1: sale con los brazos abiertos; parte 2: en la puerta con el celular) ----------
const H_VER = V3(VX - 0.15, VER, -2.0);
function poseHector(t) {
  if (t < P2) {
    const sale = eo(sg(t, T.sale[0], T.sale[1]));
    const pr = { x: H_VER.x, y: VER, z: lerp(FZ - 0.25, H_VER.z, sale), giro: 0.95, paso: sale < 1 && sale > 0 ? 1 : 0, inclina: 0.02, ...aC(0.1, -0.02), ...CARA.feliz, ojos: { abiertos: 1, feliz: 0.35, x: 0.1, y: 0.05 }, ...BRAZOS.costado, t };
    // los brazos abiertos al salir y en "¡Rubén!"
    const ab = sg(t, T.sale[0] + 0.1, T.sale[1]) * (1 - sg(t, T.h1 + 0.9, T.h1 + 1.3));
    if (ab > 0) { pr.manoI = lerpV([0.29, -0.08, 0.04], [0.55, 0.75, 0.18], ab); pr.manoD = lerpV([-0.29, -0.08, 0.04], [-0.55, 0.75, 0.18], ab); pr.codoI = [1, 0, 0]; pr.codoD = [-1, 0, 0]; }
    // en "nadie me llamó": la mano en el hombro de Rubén (la derecha, hacia adelante)
    const hb = sg(t, T.h1 + 1.5, T.h1 + 1.8) * (1 - sg(t, T.p5 + 0.2, T.p5 + 0.5));
    if (hb > 0) { pr.manoD = lerpV(pr.manoD ?? [-0.29, -0.08, 0.04], [-0.24, 0.42, 0.34], hb); pr.manoI = lerpV(pr.manoI ?? [0.29, -0.08, 0.04], [0.24, 0.42, 0.34], hb); pr.codoD = [-1, -0.5, 0]; pr.codoI = [1, -0.5, 0]; }
    if (t >= T.h1 + 1.3) { pr.cejas = { alto: 0.45, ang: 0.4 }; pr.boca = { sonrisa: 0.5, abierta: 0, ancho: 1.05 }; pr.ojos = { abiertos: 1, feliz: 0.25, x: 0.1, y: 0.05 }; }
    bocaVoz(pr, t, T.h1, ENV.h1, 0.7);
    if (t >= T.p7) {
      // P7: entrando con la caja en brazos, la cabeza por encima del hombro
      const u = sg(t, T.p7, T.p7b + 0.3);
      Object.assign(pr, { x: VX - 0.35, z: lerp(-2.25, -2.4, u), giro: lerp(0.55, 0.35, u), paso: 0, ...BUENA, ojos: { abiertos: 1, feliz: 0.3, x: 0.4, y: 0 } });
      pr.cabeza = { giro: 0.25, asiente: 0.0, ladea: 0.05 }; pr.manoI = [0.2, 0.22, 0.4]; pr.manoD = [-0.2, 0.22, 0.4]; pr.codoI = [1, -0.6, 0]; pr.codoD = [-1, -0.6, 0];
      bocaVoz(pr, t, T.h2, ENV.h2, 0.7);
    }
    return pr;
  }
  // Q2: en la puerta, el celular en la oreja derecha; "¡Uh, se me pasó!": la palmada en la frente con la izquierda
  const pr = { x: H_VER.x, y: VER, z: H_VER.z - 0.2, giro: 0.4, inclina: 0.03, ...aC(0.15, 0.0), ...CARA.feliz, ojos: { abiertos: 1, feliz: 0.3, x: 0.1, y: 0.05 }, ...BRAZOS.costado, t };
  pr.manoD = [-0.12, 0.3, 0.36]; pr.codoD = [-1, -0.6, -0.1]; pr.cabeza = { giro: 0.0, asiente: 0.18, ladea: 0.03 }; pr.ojos = { abiertos: 1, feliz: 0.35, x: -0.1, y: -0.4 };
  const fp = Math.sin(Math.PI * sg(t, T.h3 + 0.05, T.h3 + 0.9));
  if (fp > 0) { pr.manoI = lerpV([0.29, -0.08, 0.04], [0.01, 0.72, 0.43], fp); pr.codoI = [0.8, -0.5, 0.1]; pr.inclina = 0.03 + 0.12 * fp; pr.cabeza = { giro: 0.15, asiente: lerp(0, 0.25, fp), ladea: 0.05 }; pr.ojos = { abiertos: lerp(1, 0.5, fp), feliz: 0.6, x: 0, y: 0 }; }
  bocaVoz(pr, t, T.h3, ENV.h3, 0.7);
  return pr;
}
// ---------- Nico ----------
function poseNico(t, lugar) {
  if (lugar === "of") {
    // P3: asomado en la puerta (adentro), el celular en la izquierda señalando a Rubén, el maletín en la derecha
    const p = { x: 1.4, y: OFI.piso, z: 0.35, giro: -1.15, inclina: 0.1, ...aC(-0.15, 0.06), ...CARA.sorpresa, ojos: { abiertos: 1, x: -0.1, y: 0.05 }, cejas: { alto: 0.55, ang: 0.4 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.9 }, ...BRAZOS.costado, t };
    p.manoD = [-0.14, 0.18, 0.3]; p.codoD = [-1, -0.6, 0.2];
    p.manoI = [0.18, 0.12, 0.42]; p.codoI = [1, -0.6, -0.2];
    bocaVoz(p, t, T.n1, ENV.n1, 0.75);
    return p;
  }
  if (lugar === "ca") {
    // P4-P7: en la vereda junto al auto (cierra la puerta del acompañante en el portazo); P7: el post-it
    const p = { x: VX + 1.55, y: VER, z: -0.55, giro: Math.PI + 0.5, inclina: 0.02, ...aC(0.1, 0.0), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.15, x: 0.1, y: 0 }, ...BRAZOS.costado, t };
    p.manoD = [-0.14, 0.18, 0.3]; p.codoD = [-1, -0.6, 0.2];
    const cie = Math.sin(Math.PI * sg(t, T.portazo - 0.25, T.portazo + 0.1)); if (cie > 0) { p.manoI = lerpV([0.29, -0.08, 0.04], [0.42, 0.28, 0.4], cie); p.codoI = [1, -0.4, 0]; }
    if (t >= T.h1 + 1.0) Object.assign(p, { ...NADA, cejas: { alto: 0.3, ang: 0.4 }, ojos: { abiertos: 0.95, x: -0.2, y: 0 } });
    if (t >= T.p7) { Object.assign(p, BUENA); p.manoI = [0.12, 0.42, 0.42]; p.codoI = [1, -0.6, -0.2]; p.manoD = [-0.05, 0.45, 0.4]; p.cabeza = { giro: 0, asiente: 0.4, ladea: 0 }; p.ojos = { abiertos: 1, feliz: 0.25, x: 0, y: -0.6 }; }
    return p;
  }
  // en el auto (Q1, P7b): sentado al volante
  const p = { x: 0.42, y: AUTO.asiento - 0.58, z: -0.08, giro: 0, sentado: 1, inclina: 0.0, ...aC(0.0, 0.05), ...CARA.sonrisa, manoI: [0.2, 0.42, 0.42], manoD: [-0.2, 0.42, 0.42], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  if (t >= P2) {
    // mira el celular del soporte (a su derecha, -x local) cuando vibra; lo toca
    const m = eio(sg(t, T.vibra, T.vibra + 0.35)); p.cabeza = { giro: lerp(0, -0.55, m), asiente: lerp(0.05, 0.25, m), ladea: 0 }; p.ojos = { x: lerp(0, -0.5, m), y: -0.3, abiertos: 1, feliz: 0.1 };
    const k = Math.sin(Math.PI * sg(t, T.llamar - 0.3, T.llamar + 0.15)); if (k > 0) { p.manoD = lerpV(p.manoD, [-0.3, 0.6, 0.55], k); p.dedoD = 1; }
    if (t >= T.n2) { Object.assign(p, BUENA); p.cabeza = { giro: -0.4, asiente: 0.15, ladea: 0.03 }; p.ojos = { x: -0.4, y: -0.1, abiertos: 1, feliz: 0.3 }; }
    bocaVoz(p, t, T.n2, ENV.n2, 0.75);
  }
  return p;
}
// ---------- Darío, el operario ----------
const DARIO_SENT = { x: SLOT.HECTOR - 0.05, z: ZA + 0.12 };
function poseOperario(t) {
  if (t < P2) {
    // P2: en su reposera, contento (su descanso del mediodía); levanta el mate y saluda a cámara cuando llega la grúa
    const pr = { x: DARIO_SENT.x, y: -0.2, z: DARIO_SENT.z, giro: -0.35 + 0.3, sentado: 1, inclina: -0.12, ...aC(-0.05, -0.12), ...CARA.feliz, ojos: { abiertos: 1, feliz: 0.4, x: 0, y: 0.1 }, manoI: [0.2, 0.3, 0.32], manoD: [-0.2, 0.3, 0.32], codoI: null, codoD: null, t };
    const s = eio(sg(t, T.saluda, T.saluda + 0.3));
    if (s > 0) Object.assign(pr, saludo(t, "D", s));
    return pr;
  }
  // Q3: se para, agarra la radio y la planta y se va hacia la derecha, resignado
  const u = sg(t, T.q3 + 0.05, T.q3 + 0.4), v = sg(t, T.q3 + 0.5, T.q3 + 2.1);
  const pr = { x: lerp(DARIO_SENT.x, DARIO_SENT.x + 0.15, u) + v * 2.2, y: lerp(-0.2, 0, u), z: lerp(DARIO_SENT.z, ZA + 0.85, u), giro: lerp(-0.05, Math.PI / 2 + 0.15, sg(t, T.q3 + 0.35, T.q3 + 0.55)), sentado: 1 - u, paso: v > 0 && v < 1 ? 1 : 0, inclina: 0.03, ...aC(-0.4, 0.05), ...CARA.resignado, ojos: { abiertos: 0.6, tension: 0.4, x: -0.3, y: 0 }, manoI: [0.24, 0.18, 0.2], manoD: [-0.24, 0.2, 0.22], codoI: [1, -0.5, -0.1], codoD: [-1, -0.5, -0.1], t };
  return pr;
}
// ---------- el chofer del camión gris (extra sin voz, de espaldas o de 3/4) ----------
function poseChofer(t) {
  if (t < T.p5) return { x: VX - 0.95, y: VER, z: -0.35, giro: -Math.PI / 2 - 0.4, inclina: 0.15, ...aC(0, 0.2), ...CARA.concentrada, manoI: [0.22, 0.55, 0.35], manoD: [-0.22, 0.55, 0.35], codoI: null, codoD: null, t };
  // P5: cierra las puertas del camión (al cordón, de espaldas)
  const k = sg(t, T.cierra[0] - 0.2, T.cierra[1]);
  return { x: VX - 0.6, y: 0, z: 1.45, giro: -Math.PI / 2, inclina: 0.05, ...aC(0, 0.0), ...CARA.concentrada, manoI: [0.3, lerp(0.4, 0.7, k), 0.4], manoD: [-0.3, lerp(0.7, 0.4, k), 0.4], codoI: null, codoD: null, t };
}

// ================= RENDER =================
function ponerLuces(lugar) {
  const of = lugar === "of", dep = lugar === "dep", ca = lugar === "ca" || lugar === "auto";
  for (const l of [solOf, cieloOf, rellenoOf]) l.visible = of;
  solDep.visible = dep; cieloDep.visible = dep || of; cieloDep.intensity = of ? 0.0 : 2.0;
  solCa.visible = cieloCa.visible = ca;
}
function ponerSolCa(centro) { solCa.position.set(centro.x + 5, 9, centro.z + 6); solCa.target.position.copy(centro); }
// el auto: estacionado (parte 1), arrancando (P7c), en el semáforo (Q1, Q2i)
function ponerAuto(t, lugar) {
  auto.visible = lugar === "ca" || lugar === "auto";
  const { puertaA } = auto.userData;
  puertaA.rotation.y = 0;
  if (lugar === "auto" && t >= P2) { auto.position.copy(AUTO_SEM); auto.rotation.set(0, -Math.PI / 2, 0); return; }
  let x = AUTO_EST.x, z = AUTO_EST.z, giro = -Math.PI / 2;
  if (t < T.portazo) puertaA.rotation.y = -1.0 * (1 - eio(sg(t, T.portazo - 0.3, T.portazo)));
  if (t >= T.arranca) {
    // P7c: arranca, sale del cordón (hacia +z) y pasa al camión gris
    const u = sg(t, T.arranca, P1);
    x = AUTO_EST.x - 4.2 * u * u * 1.3; z = AUTO_EST.z + 1.5 * eio(cl(u * 1.4)); giro = -Math.PI / 2 - 0.35 * Math.sin(Math.PI * cl(u * 1.2));
  }
  auto.position.set(x, 0, z); auto.rotation.set(0, giro, 0);
}
// las hojas de la puerta del súper (se abren cuando sale Héctor; en Q2 quedan abiertas)
function ponerSuper(t) {
  const ab = t >= P2 ? 1 : eio(sg(t, T.sale[0] - 0.3, T.sale[0])) * (t < T.p7 ? 1 : 1);
  for (const h of hojasSuper) h.rotation.y = h.userData.s * -1.35 * ab;
}
// la reposera que se pliega en 3 tiempos (Q3); la radio y la planta: en el rincón (parte 1) o en las manos de Darío (Q3)
function ponerRincon(t) {
  const parte2 = t >= P2;
  RIN.visible = true;
  const k = parte2 ? T.pliega.filter((a) => t >= a).length + sg(t, T.pliega[Math.min(2, T.pliega.filter((a) => t >= a).length)] - 0.08, T.pliega[Math.min(2, T.pliega.filter((a) => t >= a).length)]) : 0;
  const f = Math.min(3, k) / 3;
  respaldo.rotation.x = lerp(-0.45, 1.25, eio(Math.min(1, f * 1.5)));
  reposera.position.y = 0; reposera.rotation.z = lerp(0, -1.45, eio(sg(f, 0.66, 1))); reposera.position.x = lerp(-0.05, -0.45, eio(sg(f, 0.66, 1)));
  cajon.visible = !parte2 || t < T.q3 + 0.6;
  const enMano = parte2 && t >= T.q3 + 0.3;
  if (enMano) {
    operario.raiz.updateMatrixWorld(true);
    operario.brazos[0].mano.getWorldPosition(_w); RIN.worldToLocal(_w); radio.position.copy(_w).add(V3(0, -0.15, 0)); radio.rotation.set(0, operario.raiz.rotation.y, 0);
    operario.brazos[1].mano.getWorldPosition(_w); RIN.worldToLocal(_w); planta.position.copy(_w).add(V3(0, -0.2, 0));
  } else { radio.position.copy(RADIO0); radio.rotation.set(0, -0.3, 0); planta.position.copy(PLANTA0); }
  // el pallet de Héctor: no está en la parte 1; en Q3 entra y se llena por capas
  palletH.visible = parte2 && t >= T.q3 + 0.35;
  CAPAS_H.forEach((capa, i) => capa.forEach((o) => { const s = t >= T.capas[i] ? 0.75 + 0.25 * bk(sg(t, T.capas[i], T.capas[i] + 0.2)) : 0; o.visible = s > 0; o.scale.setScalar(Math.max(0.001, s)); }));
  if (!parte2) { palletH.visible = false; }
}
function renderAt(tIn) {
  AVISOS.length = 0;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  const lugar = ["P1", "P3", "Q3b", "Q4", "Q4b", "C"].includes(pa) ? "of" : pa === "P2" ? (t < T.p2 + 0.32 ? "of" : "dep") : pa === "Q3" ? "dep" : ["P7b", "Q1", "Q2i"].includes(pa) ? "auto" : "ca";
  ponerLuces(lugar);
  scene.background = new THREE.Color(lugar === "dep" ? 0xe8edf0 : lugar === "ca" || lugar === "auto" ? 0xd9e6ef : 0x16243d);
  OF.visible = DEP.visible = lugar === "of" || lugar === "dep";
  CA.visible = camionGris.visible = lugar === "ca" || lugar === "auto";
  camionPropio.visible = lugar === "dep" || lugar === "of";
  if (pl[2]) { ponerCam(catmull(pl[2], t), t); camera.updateMatrixWorld(true); }
  // ---- pantallas y objetos ----
  dibujarMonitor(t);
  if (parte2) dibujarCelN(t);
  ponerSuper(t); ponerAuto(t, lugar); ponerRincon(t);
  RIN.visible = lugar === "dep" || lugar === "of"; palletH.visible = palletH.visible && RIN.visible;
  // el led del altavoz: titila con la voz del contador
  const ledK = Math.max(envEn(t, T.c1, ENV.c1), envEn(t, T.c2, ENV.c2), envEn(t, T.c1b, ENV.c1), envEn(t, T.c3, ENV.c3));
  ledTel.material.color.setHex(ledK > 0.15 ? C.g : 0x2c4a22); ledTel.scale.setScalar(ledK > 0.15 ? 1.3 : 1);
  // el camión gris: en la parte 1 está (puertas abiertas hasta que el chofer las cierra; arranca al final); en la 2, no
  camionGris.visible = camionGris.visible && !parte2;
  {
    const ci = sg(t, T.cierra[0] - 0.15, T.cierra[1] + 0.05);
    camionGris.userData.puertas.forEach((p, i) => { const u = eio(sg(t, T.cierra[i] - 0.18, T.cierra[i])); p.rotation.y = p.userData.s * -(Math.PI * 0.92) * (1 - u); });
    const arr = sg(t, T.vuela[1] - 0.05, P1 + 0.3);
    camionGris.position.set(VX - 1.25 - 1.2 * arr * arr, 0, 1.45);
    void ci;
  }
  // la zorra del chofer: entre el camión y la puerta (P4-P7); la caja que Héctor lleva en P7
  zorra.visible = lugar === "ca" && !parte2;
  zorra.position.set(VX - 1.05, VER, -2.35); zorra.rotation.set(0, 0.7, 0);
  zorra.userData.cajas[2].visible = t < T.p7;
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  maletin.visible = celH.visible = celNmano.visible = cajaHector.visible = false;
  // Rubén
  if (lugar === "of") {
    ruben.raiz.visible = !["Q3b"].includes(pa);
    const pr = rubenOficina(t); ruben.poner(pr);
    // el mate: en la mano izquierda (P1, Q4), con el sorbo; en C, apoyado en el escritorio
    let so = 0;
    if (!parte2) so = 0.55 * eio(sg(t, T.r1 + LEN.r1 - 0.25, T.c2 + 0.05));
    else so = Math.sin(Math.PI * sg(t, T.r1b + LEN.r1 - 0.05, T.r1b + LEN.r1 + 0.75)) * 0.95;
    if (pa === "C" || (parte2 && t >= T.c)) {
      const k = eio(sg(t, T.c, T.c + 0.3)), apoyo = aCuerpo(ruben, V3(0.32, MESA_Y + 0.08, 1.75));
      pr.manoI = pr.manoI.map((v, i) => lerp(v, apoyo[i], k)); ruben.poner(pr);
    }
    ruben.raiz.updateMatrixWorld(true);
    const m = ruben.brazos[0].mano.getWorldPosition(_w).clone();
    mate.rotation.set(0, ruben.raiz.rotation.y + Math.PI / 2, 0.35 * so); mate.position.copy(m).add(V3(0, -0.07, 0));
    if (so > 0 && pa !== "C") {
      const boca = ruben.cabeza.localToWorld(V3(0.05, 0.12, 0.34));
      mate.updateMatrixWorld(true);
      const punta = V3(0.075, 0.305, 0).multiplyScalar(1.12).applyEuler(mate.rotation);
      mate.position.lerp(boca.sub(punta), so);
    }
    if (pa === "P3") { mate.position.set(0.32, MESA_Y, 1.85); mate.rotation.set(0, -Math.PI / 2, 0); pr.manoI = [0.24, 0.3, 0.3]; ruben.poner(pr); }
  } else if (lugar === "ca" && !parte2) {
    ruben.raiz.visible = pa !== "P7"; ruben.poner(rubenVereda(t));
  }
  // Héctor
  if (lugar === "ca") {
    hector.raiz.visible = pa !== "P6"; hector.poner(poseHector(t));
    if (t >= T.p7 && !parte2) {
      hector.raiz.updateMatrixWorld(true);
      cajaHector.visible = true; hector.brazos[0].mano.getWorldPosition(_w); const b = hector.brazos[1].mano.getWorldPosition(new THREE.Vector3());
      cajaHector.position.copy(_w.add(b).multiplyScalar(0.5)).add(V3(0, 0.06, 0)); cajaHector.rotation.set(0, hector.raiz.rotation.y, 0);
    }
    if (parte2) {
      // el celular en altavoz delante del pecho (la regla de los celulares de la-lista: nunca en la oreja, que la mano no
      // cruce la boina ni la cara)
      const ph = poseHector(t); hector.poner(ph); hector.raiz.updateMatrixWorld(true);
      const q = new THREE.Quaternion(); hector.raiz.getWorldQuaternion(q);
      const cab = hector.cabeza.getWorldPosition(new THREE.Vector3());
      const objetivo = cab.clone().add(V3(-0.1, -0.1, 0.4).applyQuaternion(q));
      ph.manoD = aCuerpo(hector, objetivo); ph.codoD = [-1, -0.6, -0.1]; hector.poner(ph); hector.raiz.updateMatrixWorld(true);
      celH.visible = true; hector.brazos[1].mano.getWorldPosition(celH.position); celH.position.add(V3(0, 0.08, 0.02).applyQuaternion(q));
      celH.quaternion.copy(q).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.55, 0.2, 0)));
    }
  }
  // Nico
  if (pa === "P3") {
    nico.raiz.visible = true; nico.poner(poseNico(t, "of"));
    nico.raiz.updateMatrixWorld(true); maletin.visible = celNmano.visible = true;
    nico.brazos[1].mano.getWorldPosition(_w); maletin.position.copy(_w).add(V3(0, -0.02, 0.0)); maletin.rotation.set(0, nico.raiz.rotation.y, 0);
    nico.brazos[0].mano.getWorldPosition(_w); celNmano.position.copy(_w).add(V3(0, 0.06, 0)); celNmano.rotation.set(-0.3, nico.raiz.rotation.y, 0.3);
  } else if (lugar === "ca" && !parte2 && pa !== "P7c") {
    nico.raiz.visible = pa !== "P7"; if (nico.raiz.parent !== scene) scene.add(nico.raiz); nico.poner(poseNico(t, "ca"));
  } else if (lugar === "auto" || pa === "P7c") {
    if (nico.raiz.parent !== auto) auto.add(nico.raiz);
    nico.raiz.visible = true; nico.poner(poseNico(t, "auto"));
  }
  if (nico.raiz.parent === auto && !(lugar === "auto" || pa === "P7c")) scene.add(nico.raiz);
  // Darío y el chofer
  if (lugar === "dep") { operario.raiz.visible = !(parte2 && t > T.q3 + 2.1); operario.poner(poseOperario(t)); }
  if (lugar === "ca" && !parte2 && pa !== "P7c" && pa !== "P7b") { chofer.raiz.visible = true; chofer.poner(poseChofer(t)); }
  // el post-it: en la mano de Nico (P7), pegado en el tablero (P7b), vuela (P7c) y queda en la puerta del camión gris
  postit.visible = false; MANO_POST.visible = false;
  {
    auto.updateMatrixWorld(true);
    const cab = auto.userData.cab;
    const tablero = auto.localToWorld(V3(-0.35, 1.118, cab.z1 - 0.19));
    if (pa === "P7b") {
      // cae desde arriba (Nico lo pega con el pulgar, fuera de cuadro) y queda pegado: pop
      const u = eio(sg(t, T.p7b + 0.05, T.pega)), pp = bk(sg(t, T.pega - 0.05, T.pega + 0.15));
      postit.visible = true;
      const q = new THREE.Quaternion(); auto.getWorldQuaternion(q);
      postit.quaternion.copy(q).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2 + 0.25 * (1 - u), 0.25 * (1 - u), Math.PI)));
      postit.position.copy(tablero).add(V3(0, 0.14 * (1 - u), -0.05 * (1 - u)).applyQuaternion(q)).add(V3(0, 0.004, 0));
      postit.scale.setScalar(t >= T.pega - 0.05 ? 0.9 + 0.1 * pp : 1);
    } else if (pa === "P7c") {
      postit.visible = true; postit.scale.setScalar(1);
      const dest = V3(camionGris.position.x + 0.13, 1.85, 1.0);
      const u = sg(t, T.vuela[0], T.vuela[1]);
      if (t < T.vuela[0]) { postit.position.copy(tablero); const q = new THREE.Quaternion(); auto.getWorldQuaternion(q); postit.quaternion.copy(q).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, Math.PI))); }
      else {
        const sale = auto.localToWorld(V3(-0.95, 1.35, cab.z1 - 0.4));
        const a = u < 0.3 ? tablero.clone().lerp(sale, u / 0.3) : sale.clone().lerp(dest, eo((u - 0.3) / 0.7));
        a.y += Math.sin(Math.PI * u) * 0.35 + Math.sin(u * 18) * 0.04 * (1 - u);
        postit.position.copy(a);
        postit.rotation.set(Math.sin(u * 14) * 0.9 * (1 - u), lerp(0, Math.PI / 2, eo(u)), Math.cos(u * 11) * 0.8 * (1 - u));
        if (u >= 1) { postit.position.copy(dest); postit.rotation.set(0, Math.PI / 2, 0.12); }
      }
    }
  }
  // ---- cámara (planos armados a mano) ----
  if (pa === "P2") {
    ponerCam(t < T.p3 ? catmull(K_GRUA(), t) : catmull(K_GRUA(), t), t);
    PASO.visible = !en(t, T.p2 + 0.15, T.p2 + 0.75);
  } else PASO.visible = true;
  if (pa === "P7b") {
    // dentro del auto, desde el asiento del acompañante: el post-it en el tablero, el camión gris por el parabrisas
    const q = new THREE.Quaternion(); auto.getWorldQuaternion(q);
    const ojo = auto.localToWorld(V3(-0.36, 1.38, auto.userData.cab.z1 - 0.85)), mira = auto.localToWorld(V3(-0.35, 1.12, auto.userData.cab.z1 + 0.3));
    const u = eio(sg(t, T.p7b, T.p7c)); ojo.lerp(mira, 0.08 * u);
    ponerCam([ojo.x, ojo.y, ojo.z, mira.x, mira.y, mira.z, 46], t, true);
  }
  if (pa === "P7c") {
    // desde la vereda, detrás del auto: arranca, pasa al camión gris; el post-it vuela a la puerta del camión
    { const u = eio(sg(t, T.p7c + 0.1, P1)), d = V3(camionGris.position.x + 0.13, 1.8, 1.0); ponerCam([lerp(VX + 5.3, d.x + 2.0, u), lerp(1.45, d.y - 0.05, u), lerp(-1.35, d.z - 1.0, u), lerp(VX - 0.7, d.x, u), lerp(1.45, d.y - 0.1, u), lerp(1.2, d.z + 0.1, u), lerp(46, 40, u)], t); }
  }
  if (pa === "Q1" || pa === "Q2i") {
    // Q1: desde el asiento del acompañante; push-in continuo al celular del soporte (inserto ≥ 60 %)
    const celu = auto.userData.celu; celu.updateMatrixWorld(true);
    const c = celu.localToWorld(V3(0, 0, -0.014)), n = V3(0, 0, -1).transformDirection(celu.matrixWorld), up = V3(0, 1, 0).transformDirection(celu.matrixWorld);
    const fov = 40, dIns = 0.24 / 0.66 / (2 * Math.tan((fov * D2R) / 2));
    const pIns = c.clone().add(n.clone().multiplyScalar(dIns));
    const p0 = auto.localToWorld(V3(-0.42, 1.55, -1.0)), m0 = auto.localToWorld(V3(0.2, 1.3, 0.4));
    const u = pa === "Q2i" ? 1 : eio(sg(t, T.q1i, T.q1i + 1.0));
    const pos = p0.clone().lerp(pIns, u), mira = m0.clone().lerp(c, eo(cl(u * 1.3)));
    camera.position.copy(pos); camera.fov = lerp(52, fov, u); camera.updateProjectionMatrix(); camera.up.copy(V3(0, 1, 0).lerp(up, u).normalize()); camera.lookAt(mira);
    // el índice de Nico toca "Llamar"
    const toq = Math.sin(Math.PI * sg(t, T.llamar - 0.22, T.llamar + 0.1));
    DEDO_N.visible = pa === "Q1" && toq > 0.01;
    if (DEDO_N.visible) { DEDO_N.position.set(-0.01, -0.085, -0.03 - 0.02 * (1 - toq)); DEDO_N.rotation.set(-0.2, Math.PI, -0.3); }
  } else DEDO_N.visible = false;
  if (pa === "Q3b") {
    // la ficha de Héctor en el monitor (inserto que llena el ancho)
    const FOV = 44, d = (MON.W * 1.04) / (2 * Math.tan((FOV * D2R) / 2) * (1080 / 1920));
    monitor.updateMatrixWorld(true);
    const c = monitor.localToWorld(monitor.userData.centro.clone()), n = V3(0, 0, 1).transformDirection(monitor.matrixWorld);
    const p = c.clone().add(n.multiplyScalar(d * lerp(1.08, 1.0, eio(sg(t, pl[1], T.q4)))));
    ponerCam([p.x, p.y + 0.06, p.z, c.x, c.y + 0.06, c.z, FOV], t, true);
  }
  if (pa === "Q4b") {
    // push al monitor con el panel; Rubén sigue en cuadro a la derecha
    const u = eio(sg(t, T.q4b, T.q4b + 0.7));
    const v0 = CAM_P1(0.6), v1 = [0.24, OY + 1.45, 3.18, -0.95, OY + 1.41, 1.45, 48];
    ponerCam(lerpV(v0, v1, u), t);
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  // el sol de la calle sigue al plano
  if (lugar === "ca" || lugar === "auto") ponerSolCa(lugar === "auto" && parte2 ? AUTO_SEM.clone() : V3(VX, 0, -1));
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const r of [...ROT, ...ROT_Q]) r.visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const tel = () => objPx(telefono, V3(-0.06, 0.09, 0.05));
    // P1 / Q4: el contador sale del teléfono (cola al parlante), Rubén arriba de su cabeza
    if (pa === "P1" || pa === "Q4") {
      const b = parte2;
      const c1 = b ? GL.c1b : GL.c1, r1 = b ? GL.r1b : GL.r1, c2 = b ? GL.c3 : GL.c2;
      const tc1 = b ? T.c1b : T.c1, tr1 = b ? T.r1b : T.r1, tc2 = b ? T.c3 : T.c2;
      const [tx, ty] = tel();
      if (t >= tc1 - 0.05 && t < tc2 - 0.02) ponerGlobo(c1, 600, ty - 300, ent(tc1 - 0.05), [tx, ty], 1);
      if (t >= tc2 - 0.05) ponerGlobo(c2, 600, ty - 300, ent(tc2 - 0.05), [tx, ty], 1);
      if (t >= tr1 - 0.04 && t < tc2 - 0.05) { const [bx, by] = bocaPx(ruben); ponerGlobo(r1, 330, 600, ent(tr1 - 0.04), [bx - 40, by - 10], 2); }
    }
    if (pa === "Q4b") {
      const [tx, ty] = tel();
      if (t >= T.c3 - 0.05) ponerGlobo(GL.c3, 540, 420, ent(T.c3 - 0.05), null, 1);
    }
    // P2: los rótulos de la plata (a la izquierda, guías al cartel HÉCTOR · MARTES y al rincón)
    if (pa === "P2") {
      const cartelPx = objPx(DEP, V3(SLOT.HECTOR - 0.5, 2.15, ZA - 0.83)), rinPx = objPx(RIN, V3(0, 0.45, 0));
      const pos = [[300, 560], [300, 790], [320, 1040]];
      ROT.forEach((r, i) => {
        if (t < T.rot[i]) return;
        const s = ent(T.rot[i]); ponerGlobo(r, pos[i][0], pos[i][1], s, null, 3 + i);
        if (i === 0) ponerGuia(GUIAS[0], pos[0][0] + r.userData.W / 2 - 10, pos[0][1], cartelPx[0], cartelPx[1] + 30, sg(t, T.rot[0], T.rot[0] + 0.25));
        if (i === 2) ponerGuia(GUIAS[2], pos[2][0] + r.userData.W / 2 - 10, pos[2][1], rinPx[0], rinPx[1], sg(t, T.rot[2], T.rot[2] + 0.25));
      });
    }
    if (pa === "P3" && t >= T.n1 - 0.04) hablar(GL.n1, nico, ent(T.n1 - 0.04), 1, 0, 300);
    if ((pa === "P4" || pa === "P4b") && t >= T.h1 - 0.04) {
      const k = 2;   // "¡Rubén! ¿Cerraste?" y después "Dejé de pedir y nadie me llamó."
      const corte = T.h1 + LEN.h1 * 0.36;
      if (t < corte) hablar(GL.h1a, hector, ent(T.h1 - 0.04), k, 0, 300); else hablar(GL.h1, hector, ent(corte), k, 0, 300);
    }
    if (pa === "P6" && t >= T.r2 - 0.04) hablar(GL.r2, ruben, ent(T.r2 - 0.04), 1, 0, 280);
    if (pa === "P7" && t >= T.h2 - 0.04) hablar(GL.h2, hector, ent(T.h2 - 0.04), 1, 0, 300);
    if (pa === "Q1" && t >= T.n2 - 0.04) ponerGlobo(GL.n2, 540, 280, ent(T.n2 - 0.04), null, 1);
    if (pa === "Q1" && en(t, T.vibra + 0.2, T.n2 - 0.1)) { ponerGlobo(ROT_Q[0], 540, 250, ent(T.vibra + 0.2), null, 2); }
    if (pa === "Q2" && t >= T.h3 - 0.04) hablar(GL.h3, hector, ent(T.h3 - 0.04), 1, 0, 280);
    if (pa === "Q3b") ponerGlobo(ROT_Q[1], 540, 420, ent(pl[1] + 0.15), null, 2);
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
