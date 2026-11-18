// Capa 3D de dist-quien-debe (Three.js r170 local). Base técnica: reels/dist-cliente-grande (utilidades, tarjetas
// pegadas a la cámara, rótulos con guía, catmull() quieto después de la última clave), reels/ya-lo-cargo (la rotisería
// de Graciela con el spiedo) y reels/contable-papeles / tienda-tenes-stock (celular sostenido, regla de burbujas con la
// cola a la boca). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin
// semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   EL BANCO (alrededor del origen): el box de atención a empresas. Escritorio en el origen (x ±0,75); Patricia del lado
//     -x mirando a +x, Rubén del lado +x mirando a -x, los dos abiertos a la cámara (+z). El monitor en brazo giratorio al
//     medio, el turnero colgado arriba a la derecha, la mampara esmerilada a la izquierda (x = -2,2), la pared crema al
//     fondo (z = -1,7) y la sala de espera hacia +x (sillas, el cartel ATENCIÓN EMPRESAS).
//   EL BOX DE INVERSIONES (x = 20): pared navy2, sillón capitoné, cuadro, lámpara de pie, mesita con el café.
//   LA ROTISERÍA DE GRACIELA (x = 40): azulejo con guarda verde, el mostrador, el spiedo con los pollos, la pizarra.
//   EL MUELLE DE LA DISTRIBUIDORA (x = 60): portón navy3, la camioneta de reparto, Nico.
//   LA OFICINA DE RUBÉN (x = 80): el panel de cuentas por cobrar en el monitor grande (Q2).
//   La pantalla partida (P4, Q4) se arma con dos cámaras (arriba el banco, abajo la rotisería) y una pasada más para las
//   burbujas pegadas a la cámara principal.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, MARCA, CARA, BRAZOS, pegarACamara, crearMate, crearTermo } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER as VERM } from "./tiempos3d.js";
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

// =====================================================================================================
// EL BANCO: el box de atención a empresas (viernes de tarde, luz de oficina pareja, fría-neutra)
// =====================================================================================================
const BAN = new THREE.Group(); scene.add(BAN);
const MESA_Y = 0.76;
const DESK = { x0: -0.5, x1: 0.5, z0: -0.46, z1: 0.46 };
const PAT = { x: -0.79, z: 0.02, giro: Math.PI / 2 - 0.55 };     // Patricia (del lado -x)
const RUB = { x: 0.8, z: 0.06, giro: -Math.PI / 2 + 0.55 };      // Rubén (del lado +x, la silla del cliente)
const pantSaldo = lienzo(1100, 700, () => {});                    // el monitor de Patricia
const pantTurno = lienzo(1500, 560, () => {});                    // el turnero
let monPivote, timbreBoton, turnero;
const MON = { W: 0.84, H: 0.534, y: 0.5 };
{
  const alfombra = mesh(new THREE.PlaneGeometry(18, 12), mat(0x5b6b80, 0.95), 2, 0, 0); alfombra.rotation.x = -Math.PI / 2; alfombra.castShadow = false; BAN.add(alfombra);
  const crema = mat(C.cr, 0.9), zoc = M.navy3;
  // la pared del fondo (crema, zócalo navy3) del box y de la sala de espera
  BAN.add(caja(9.2, 3.1, 0.14, crema, 2.2, 1.55, -1.77, 0.01));
  BAN.add(caja(9.2, 0.14, 0.04, zoc, 2.2, 0.07, -1.69, 0.005));
  // el techo (placas crema) y la pared de la sala de espera (x = 6,6), navy2
  const techo = mesh(new THREE.BoxGeometry(12, 0.1, 6), mat(0xe9e7dc, 0.95), 1.6, 3.15, 0.8); techo.castShadow = false; BAN.add(techo);
  for (const [x, z] of [[0.2, 0.2], [3.4, 0.2], [0.2, 2.4], [3.4, 2.4]]) { const l = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), new THREE.MeshBasicMaterial({ color: 0xf6f7f2, toneMapped: false })); l.rotation.x = Math.PI / 2; l.position.set(x, 3.09, z); BAN.add(l); }
  BAN.add(caja(0.14, 3.1, 6.0, mat(C.navy2, 0.9), 6.6, 1.55, 1.2, 0.01));
  // la mampara esmerilada a la izquierda (separa el box de al lado): marco navy, vidrio blanco translúcido, franja crema
  const esm = new THREE.MeshStandardMaterial({ color: 0xe9eef2, roughness: 0.35, transparent: true, opacity: 0.88, emissive: 0xe9eef2, emissiveIntensity: 0.18 });
  const v = mesh(new THREE.PlaneGeometry(3.0, 2.3), esm, -2.25, 1.2, -0.25); v.rotation.y = Math.PI / 2; v.castShadow = false; BAN.add(v);
  const fr = mesh(new THREE.PlaneGeometry(3.0, 0.16), mat(C.cr2, 0.6), -2.24, 1.15, -0.25); fr.rotation.y = Math.PI / 2; fr.castShadow = false; BAN.add(fr);
  for (const z of [-1.75, -0.25, 1.25]) BAN.add(caja(0.06, 2.4, 0.06, M.navy, -2.25, 1.2, z, 0.01));
  for (const y of [0.04, 2.36]) BAN.add(caja(0.06, 0.06, 3.0, M.navy, -2.25, y, -0.25, 0.01));
  // el escritorio: tapa crema claro con canto navy, panel de adelante y patas navy3
  const DW = DESK.x1 - DESK.x0, DD = DESK.z1 - DESK.z0;
  BAN.add(caja(DW, 0.045, DD, mat(0xf3f1e8, 0.55), 0, MESA_Y - 0.022, 0, 0.01));
  BAN.add(caja(DW + 0.02, 0.03, DD + 0.02, M.navy, 0, MESA_Y - 0.05, 0, 0.008));
  BAN.add(caja(DW - 0.08, 0.6, 0.03, M.navy3, 0, MESA_Y - 0.36, DESK.z1 - 0.06, 0.01));
  for (const x of [DESK.x0 + 0.04, DESK.x1 - 0.04]) BAN.add(caja(0.05, MESA_Y - 0.06, DD - 0.06, M.navy3, x, (MESA_Y - 0.06) / 2, 0, 0.01));
  // el teclado (frente a Patricia), el portalápices con lapiceras, la plantita en maceta navy, el bowl de caramelos
  const tec = new THREE.Group(); tec.position.set(-0.28, MESA_Y, 0.06); tec.rotation.y = Math.PI / 2 - 0.15; BAN.add(tec);
  tec.add(caja(0.44, 0.022, 0.15, M.navy3, 0, 0.011, 0, 0.008));
  for (let i = 0; i < 3; i++) for (let k = 0; k < 11; k++) tec.add(caja(0.03, 0.01, 0.03, M.cr2, -0.19 + k * 0.038, 0.026, -0.042 + i * 0.042, 0.004));
  const port = new THREE.Group(); port.position.set(-0.4, MESA_Y, -0.33); BAN.add(port);
  port.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.11, 16), M.navy3, 0, 0.055, 0));
  for (const [dx, dz, c] of [[0.012, 0, C.navy], [-0.012, 0.01, C.g], [0, -0.014, C.cr]]) { const l = mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.16, 8), mat(c, 0.5), dx, 0.13, dz); l.rotation.z = dx * 6; port.add(l); }
  const pl = new THREE.Group(); pl.position.set(0.22, MESA_Y, -0.4); BAN.add(pl);
  pl.add(mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.1, 18), M.navy, 0, 0.05, 0));
  semilla = 9;
  for (let i = 0; i < 9; i++) { const a = i * 2.3; const h = mesh(new THREE.SphereGeometry(1, 8, 6), M.hoja, Math.cos(a) * 0.035, 0.13 + (i % 3) * 0.03, Math.sin(a) * 0.035); h.scale.set(0.035, 0.012, 0.02); h.rotation.set(0.3, a, 0.6); pl.add(h); }
  const bowl = new THREE.Group(); bowl.position.set(-0.02, MESA_Y, 0.3); BAN.add(bowl);
  bowl.add(mesh(new THREE.SphereGeometry(0.085, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat(C.cr2, 0.3, { side: THREE.DoubleSide }), 0, 0.075, 0));
  for (let i = 0; i < 6; i++) {
    const c = new THREE.Group(); const a = i * 1.1; c.position.set(Math.cos(a) * 0.04, 0.065 + (i % 2) * 0.012, Math.sin(a) * 0.04); c.rotation.set(0.2, a, 0.3); bowl.add(c);
    const cm = mat([C.cr, 0x6a8f4f, C.red][i % 3], 0.45);
    c.add(mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.03, 10), cm).rotateZ(Math.PI / 2));
    for (const s of [-1, 1]) c.add(mesh(new THREE.ConeGeometry(0.012, 0.016, 8), cm, s * 0.022, 0, 0).rotateZ(s * Math.PI / 2));
  }
  // el timbre del turnero (botón redondo crema con aro navy), al alcance de la mano derecha de Patricia
  const tb = new THREE.Group(); tb.position.set(-0.43, MESA_Y, 0.24); BAN.add(tb);
  tb.add(mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.025, 24), M.navy, 0, 0.0125, 0));
  timbreBoton = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.018, 24), mat(C.cr, 0.4), 0, 0.034, 0); tb.add(timbreBoton);
  // el monitor en su brazo giratorio (la abrazadera atrás, el brazo, el pivote): gira hacia Rubén
  const base = new THREE.Group(); base.position.set(0, MESA_Y, -0.33); BAN.add(base);
  base.add(caja(0.12, 0.02, 0.1, M.navy, 0, 0.01, 0, 0.005));
  base.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.3, 10), M.gris, 0, 0.16, 0));
  monPivote = new THREE.Group(); monPivote.position.set(0, 0.0, 0.0); base.add(monPivote);
  monPivote.add(caja(0.05, 0.04, 0.16, M.navy, 0, MON.y - 0.12, 0.07, 0.01));
  monPivote.add(caja(MON.W + 0.05, MON.H + 0.05, 0.04, M.navy, 0, MON.y, 0.15, 0.02));
  const ps = new THREE.Mesh(new THREE.PlaneGeometry(MON.W, MON.H), new THREE.MeshBasicMaterial({ map: pantSaldo, toneMapped: false })); ps.position.set(0, MON.y, 0.172); monPivote.add(ps);
  monPivote.userData.centro = V3(0, MON.y, 0.172);
  // las sillas: la de Patricia (giratoria navy) y las dos del cliente (tapizadas navy3)
  const silla = (x, z, ry, alto = 0.82) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; BAN.add(g); g.add(caja(0.5, 0.08, 0.48, M.navy3, 0, 0.48, 0, 0.03)); g.add(caja(0.48, 0.5, 0.07, M.navy3, 0, 0.48 + alto / 2 - 0.1, -0.24, 0.03)); for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(caja(0.03, 0.44, 0.03, M.navy, sx * 0.21, 0.22, sz * 0.19, 0.005)); return g; };
  silla(PAT.x - 0.04, PAT.z, PAT.giro);
  silla(RUB.x + 0.04, RUB.z, RUB.giro);
  silla(1.1, -1.15, -Math.PI / 2 + 0.3);
  // la sala de espera (+x): dos filas de sillas navy3, el dispensador de números, el cartel ATENCIÓN EMPRESAS
  for (const xr of [3.6, 4.5]) for (let i = 0; i < 5; i++) silla(xr, -1.0 + i * 0.6, -Math.PI / 2, 0.7);
  const disp = new THREE.Group(); disp.position.set(2.6, 0, -1.35); BAN.add(disp);
  disp.add(mesh(new THREE.CylinderGeometry(0.03, 0.05, 1.1, 10), M.navy3, 0, 0.55, 0));
  disp.add(caja(0.26, 0.34, 0.16, M.cr, 0, 1.25, 0, 0.04)); disp.add(caja(0.2, 0.06, 0.02, M.navy, 0, 1.3, 0.085, 0.01)); disp.add(caja(0.06, 0.03, 0.03, M.cr2, 0, 1.15, 0.09, 0.008));
  const cartT = lienzo(1400, 300, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#efeee5"; x.lineWidth = 14; x.strokeRect(20, 20, w - 40, h - 40); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "ATENCIÓN EMPRESAS", 900, 140, w - 140); x.fillText("ATENCIÓN EMPRESAS", w / 2, h / 2 + 6); });
  const cart = plano(2.8, 0.6, cartT, 6.52, 2.35, 0.6, true); cart.rotation.y = -Math.PI / 2; BAN.add(cart);
  // una planta alta en maceta navy en la sala de espera y un cuadro abstracto en la pared del fondo del box
  const pg = new THREE.Group(); pg.position.set(5.9, 0, -1.3); BAN.add(pg);
  pg.add(mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.5, 18), M.navy, 0, 0.25, 0));
  for (let i = 0; i < 14; i++) { const a = i * 2.4; const h = mesh(new THREE.SphereGeometry(1, 8, 6), i % 2 ? M.hoja : mat(0x6a8f4f, 0.8), Math.cos(a) * 0.18, 0.75 + (i % 5) * 0.16, Math.sin(a) * 0.18); h.scale.set(0.2, 0.05, 0.1); h.rotation.set(0.4, a, 0.7); pg.add(h); }
  const cuadT = lienzo(600, 420, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(40, 40, w - 80, h - 80); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(220, 220, 110, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.fillRect(320, 120, 160, 200); x.fillStyle = "#c9a46b"; x.beginPath(); x.arc(420, 300, 50, 0, 7); x.fill(); });
  BAN.add(caja(0.98, 0.7, 0.03, M.navy, -1.3, 1.85, -1.69, 0.01)); BAN.add(plano(0.9, 0.63, cuadT, -1.3, 1.85, -1.67));
  // EL TURNERO: pantalla navy colgada de dos varillas del techo, marco navy3, letras crema en canvas
  turnero = new THREE.Group(); turnero.position.set(0.78, 2.55, -1.2); turnero.rotation.y = -0.18; turnero.scale.setScalar(0.82); BAN.add(turnero);
  turnero.add(caja(1.56, 0.6, 0.1, M.navy3, 0, 0, -0.03, 0.03));
  const tp = new THREE.Mesh(new THREE.PlaneGeometry(1.48, 0.53), new THREE.MeshBasicMaterial({ map: pantTurno, toneMapped: false })); tp.position.z = 0.025; turnero.add(tp);
  for (const s of [-1, 1]) turnero.add(mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.4, 8), M.gris, s * 0.6, 0.5, -0.03));
  turnero.userData.centro = V3(0, 0, 0.025);
  // un cliente en la sala de espera (de espaldas, con el número en la mano) se agrega con los personajes
}
sombras(BAN);
BAN.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; } });
const luzBan = new THREE.DirectionalLight(0xf6f8fb, 1.7);
luzBan.castShadow = true; luzBan.shadow.mapSize.set(2048, 2048); luzBan.shadow.bias = -0.0006; luzBan.shadow.radius = 3;
Object.assign(luzBan.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
luzBan.position.set(1.5, 6.5, 4.0); luzBan.target.position.set(0, 0.8, 0); scene.add(luzBan, luzBan.target);
const cieloBan = new THREE.HemisphereLight(0xf2f4f6, 0x6a7686, 1.75); scene.add(cieloBan);
const rellBan = new THREE.DirectionalLight(0xe8eefa, 0.6); rellBan.position.set(-3, 3, 5); rellBan.target.position.set(0, 1, 0); scene.add(rellBan, rellBan.target);

// ---- el turnero: E-051 · BOX 2 → E-051 → COBRANZAS · BOX 3 (rojo apagado) → (Q4) E-051 → INVERSIONES · BOX 1 (verde)
let claveTurno = "";
function dibujarTurno(t) {
  const modo = t < T.flip ? 0 : t < P2 ? 1 : t < T.flip2 ? 0 : 2;
  const flip = (t >= T.flip && t < T.flip + 0.07) || (t >= T.flip2 && t < T.flip2 + 0.07) ? 1 : 0;
  const clave = `${modo}|${flip}`; if (clave === claveTurno) return; claveTurno = clave;
  const { x } = pantTurno.userData, w = 1500, h = 560;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.textAlign = "center"; x.textBaseline = "middle";
  if (flip) { x.fillStyle = "#16243d"; for (let i = 0; i < 7; i++) x.fillRect(0, i * 80 + 20, w, 40); pantTurno.needsUpdate = true; return; }
  if (modo === 0) {
    x.fillStyle = "#efeee5"; x.font = F(900, 250); x.fillText("E-051", w / 2, 190);
    x.font = F(800, 150); x.fillText("BOX 2", w / 2, 420);
  } else {
    const area = modo === 1 ? "COBRANZAS" : "INVERSIONES", col = modo === 1 ? "#d9786d" : "#5ce611", box = modo === 1 ? "BOX 3" : "BOX 1";
    x.fillStyle = "#efeee5"; x.font = F(900, 180); x.fillText(`E-051 → ${box}`, w / 2, 150);
    x.fillStyle = col; ajustar(x, area, 900, 230, w - 80); x.fillText(area, w / 2, 395);
  }
  pantTurno.needsUpdate = true;
}
// ---- el monitor de Patricia: la cuenta de la Distribuidora Rubén (parte 1 en rojo; Q4 en verde)
let claveSaldo = "";
function dibujarSaldo(t) {
  const verde = t >= P2 ? 1 : 0, marca = t >= T.tic - 0.05 && t < P2 ? 1 : 0;
  const clave = `${verde}|${marca}`; if (clave === claveSaldo) return; claveSaldo = clave;
  const { x } = pantSaldo.userData, w = 1100, h = 700;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle";
  ajustar(x, "Distribuidora Rubén", 900, 80, w - 80); x.fillText("Distribuidora Rubén", 40, 68);
  x.fillStyle = "#1f3254"; x.font = F(800, 70); x.fillText("Saldo", 44, 205);
  if (!verde) {
    x.fillStyle = "#c7655b"; ajustar(x, "− $ 140.000", 900, 170, w - 80); x.fillText("− $ 140.000", 36, 335);
    x.fillStyle = marca ? "#f6e3e0" : "#e2e0d4"; x.beginPath(); x.roundRect(24, 450, w - 48, 200, 28); x.fill();
    if (marca) { x.strokeStyle = "#c7655b"; x.lineWidth = 12; x.stroke(); }
    x.fillStyle = "#0b1220"; x.font = F(800, 76); x.fillText("Sueldos hoy:", 46, 550); x.textAlign = "right"; x.font = F(900, 84); x.fillText("$ 780.000", w - 40, 550);
    x.textAlign = "left";
  } else {
    x.fillStyle = "#3fa60a"; ajustar(x, "+ $ 320.000", 900, 170, w - 80); x.fillText("+ $ 320.000", 36, 335);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(24, 450, w - 48, 200, 28); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(800, 82); x.fillText("Sueldos $ 780.000", 50, 550); x.textAlign = "right"; x.font = F(900, 100); x.fillText("✓", w - 60, 552);
    x.textAlign = "left";
  }
  pantSaldo.needsUpdate = true;
}

// =====================================================================================================
// EL BOX DE INVERSIONES (x = 20): pared navy2, sillón de cuero capitoné navy3, cuadro, lámpara de pie, mesita con el café
// =====================================================================================================
const INV = new THREE.Group(); INV.position.x = 20; scene.add(INV);
let taza;
{
  const piso = mesh(new THREE.PlaneGeometry(8, 6), mat(0x5b6b80, 0.95), 0, 0, 0); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; INV.add(piso);
  INV.add(caja(8, 3.1, 0.14, mat(C.navy2, 0.85), 0, 1.55, -1.3, 0.01));
  INV.add(caja(8, 0.14, 0.04, M.navy, 0, 0.07, -1.22, 0.005));
  for (const s of [-1, 1]) INV.add(caja(0.14, 3.1, 4, mat(C.navy2, 0.85), s * 2.6, 1.55, 0.5, 0.01));
  // el sillón capitoné (cuero navy3): base, almohadón, respaldo con botones, apoyabrazos
  const cuero = mat(0x24385c, 0.42), cuero2 = mat(0x1c2d4a, 0.45);
  const sil = new THREE.Group(); sil.position.set(0, 0, -0.75); INV.add(sil);
  sil.add(caja(1.9, 0.36, 0.8, cuero2, 0, 0.2, 0, 0.06));
  sil.add(caja(1.6, 0.14, 0.7, cuero, 0, 0.44, 0.04, 0.06));
  sil.add(caja(1.9, 0.62, 0.22, cuero, 0, 0.72, -0.32, 0.08));
  for (const s of [-1, 1]) sil.add(caja(0.18, 0.5, 0.8, cuero, s * 0.88, 0.48, 0, 0.08));
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) sil.add(mesh(new THREE.SphereGeometry(0.016, 8, 6), M.navy, -0.65 + i * 0.26 + (j ? 0.13 : 0), 0.62 + j * 0.2, -0.205));
  // el cuadro abstracto verde apagado con manchas crema
  const cT = lienzo(700, 520, (x, w, h) => { x.fillStyle = "#365f28"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; for (const [cx, cy, r] of [[200, 180, 90], [470, 330, 120], [560, 120, 50], [120, 420, 60]]) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); } });
  INV.add(caja(1.32, 0.98, 0.04, mat(0xb08a4a, 0.4, { metalness: 0.4 }), 0.1, 1.85, -1.21, 0.01)); INV.add(plano(1.2, 0.86, cT, 0.1, 1.85, -1.185));
  // la lámpara de pie de bronce mate (a la derecha) con su luz cálida
  const lam = new THREE.Group(); lam.position.set(1.25, 0, -0.95); INV.add(lam);
  const bronce = mat(0xb08a4a, 0.4, { metalness: 0.45 });
  lam.add(mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.03, 20), bronce, 0, 0.015, 0)); lam.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.6, 8), bronce, 0, 0.8, 0));
  lam.add(mesh(new THREE.CylinderGeometry(0.15, 0.24, 0.3, 24, 1, true), mat(C.cr, 0.8, { side: THREE.DoubleSide, emissive: 0xffe2b0, emissiveIntensity: 0.6 }), 0, 1.66, 0));
  // la mesita con la taza de café servida y el platito con dos galletitas
  const mes = new THREE.Group(); mes.position.set(-0.05, 0, 0.35); INV.add(mes); mes.visible = false;
  mes.add(caja(0.9, 0.04, 0.5, mat(0xc89a64, 0.5), 0, 0.42, 0, 0.01)); for (const sx of [-1, 1]) for (const sz of [-1, 1]) mes.add(caja(0.035, 0.4, 0.035, M.navy, sx * 0.4, 0.2, sz * 0.2, 0.005));
  taza = new THREE.Group(); mes.add(taza);
  taza.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.01, 20), mat(C.cr, 0.35), 0, 0.445, 0));
  taza.add(mesh(new THREE.CylinderGeometry(0.042, 0.034, 0.07, 18), mat(C.cr, 0.35), 0, 0.485, 0));
  taza.add(mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.005, 18), mat(0x4a2c1a, 0.3), 0, 0.518, 0));
  taza.add(mesh(new THREE.TorusGeometry(0.018, 0.006, 6, 12, Math.PI), mat(C.cr, 0.35), 0.045, 0.488, 0).rotateZ(-Math.PI / 2));
  for (const dx of [-0.25, -0.18]) { const g = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.012, 16), mat(0xd9a45a, 0.7), dx, 0.448, 0.08); mes.add(g); }
  mes.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.008, 18), mat(C.cr, 0.35), -0.215, 0.443, 0.08));
}
sombras(INV);
const luzInv = new THREE.PointLight(0xffd9a0, 2.5, 0, 0); luzInv.position.set(21.25, 1.62, -0.85); scene.add(luzInv);
const solInv = new THREE.DirectionalLight(0xfff0dc, 1.4); solInv.castShadow = true; solInv.shadow.mapSize.set(1024, 1024); solInv.shadow.bias = -0.0006;
Object.assign(solInv.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 20 });
solInv.position.set(22, 5, 4); solInv.target.position.set(20, 0.8, -0.5); scene.add(solInv, solInv.target);
const cieloInv = new THREE.HemisphereLight(0xf2e8dc, 0x5a6478, 1.8); scene.add(cieloInv);

// =====================================================================================================
// LA ROTISERÍA DE GRACIELA (x = 40), de ya-lo-cargo: azulejo blanco con guarda verde, el mostrador con la vitrina, el
// spiedo con los pollos girando contra la pared del fondo, la pizarra. Graciela detrás del mostrador mirando a +z.
// =====================================================================================================
const ROT = new THREE.Group(); ROT.position.x = 40; scene.add(ROT);
const MOSTR = { x0: -1.6, x1: 1.8, y: 1.0, d: 0.7, z: -1.15 };
const GRA = { x: 40 + 0.45, z: -1.95 }, GRA_Y = 0.12;   // (r3) parada en un escalón detrás del mostrador: se le ve el pecho
let spiedoBarras = [];
const pantG = lienzo(600, 1215, () => {});          // el celular de Graciela
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
// EL MUELLE DE LA DISTRIBUIDORA (x = 60): pared navy claro, portón navy3, la camioneta de reparto crema con franja verde
// =====================================================================================================
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
  MUE.add(plano(2.3, 0.42, cT, 1.3, 2.72, -3.03, true));
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

// =====================================================================================================
// LA OFICINA DE RUBÉN (x = 80): el monitor grande con el panel de cuentas por cobrar; detrás, la ventana, el mate
// =====================================================================================================
const OFI = new THREE.Group(); OFI.position.x = 80; scene.add(OFI);
const pantP = lienzo(1280, 1000, () => {});
const PANEL = { W: 1.05, H: 0.82 };
let panelMon;
{
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#b08a5e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#977350"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(3, 2);
  const p = mesh(new THREE.PlaneGeometry(6, 5), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.7 }), 0, 0, 0); p.rotation.x = -Math.PI / 2; p.castShadow = false; OFI.add(p);
  OFI.add(caja(6, 3, 0.12, mat(C.cr, 0.9), 0, 1.5, -1.4, 0.01));
  // la ventana con la persiana (el depósito y el cielo de afuera)
  const cielo = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), new THREE.MeshBasicMaterial({ color: 0xe7eef3, toneMapped: false })); cielo.position.set(-1.3, 1.7, -1.33); OFI.add(cielo);
  for (let i = 0; i < 12; i++) OFI.add(caja(1.8, 0.04, 0.02, M.cr, -1.3, 2.25 - i * 0.1, -1.3, 0.005));
  OFI.add(caja(1.9, 0.08, 0.08, M.navy3, -1.3, 2.33, -1.3, 0.01)); OFI.add(caja(1.9, 0.06, 0.12, M.navy3, -1.3, 1.08, -1.28, 0.01));
  // el escritorio de madera, el monitor grande, el mate humeando en su termo
  OFI.add(caja(1.8, 0.05, 0.9, mat(0xc89a64, 0.55), 0, MESA_Y - 0.025, -0.4, 0.012));
  for (const x of [-0.85, 0.85]) OFI.add(caja(0.06, 0.72, 0.8, M.navy3, x, 0.36, -0.4, 0.01));
  panelMon = new THREE.Group(); panelMon.position.set(0.0, MESA_Y, -0.55); OFI.add(panelMon);
  panelMon.add(caja(0.12, 0.3, 0.1, M.navy, 0, 0.15, -0.05)); panelMon.add(caja(0.4, 0.03, 0.28, M.navy, 0, 0.015, -0.03));
  panelMon.add(caja(PANEL.W + 0.07, PANEL.H + 0.07, 0.06, M.navy, 0, 0.3 + PANEL.H / 2, 0, 0.025));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(PANEL.W, PANEL.H), new THREE.MeshBasicMaterial({ map: pantP, toneMapped: false })); pm.position.set(0, 0.3 + PANEL.H / 2, 0.032); panelMon.add(pm);
  panelMon.userData.centro = V3(0, 0.3 + PANEL.H / 2, 0.032);
  const mt = crearMate(); mt.scale.setScalar(1.1); mt.position.set(0.68, MESA_Y, -0.2); OFI.add(mt);
  const tm = crearTermo(); tm.scale.setScalar(1.1); tm.position.set(0.82, MESA_Y, -0.45); OFI.add(tm);
}
sombras(OFI);
const luzOfi = new THREE.DirectionalLight(0xffeedb, 1.7); luzOfi.castShadow = true; luzOfi.shadow.mapSize.set(1024, 1024); luzOfi.shadow.bias = -0.0006;
Object.assign(luzOfi.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 20 });
luzOfi.position.set(78, 5, 4); luzOfi.target.position.set(80, 0.8, -0.5); scene.add(luzOfi, luzOfi.target);
const cieloOfi = new THREE.HemisphereLight(0xf4efe4, 0x6a5a48, 1.6); scene.add(cieloOfi);
// el chip 3D "Pagado ✓" que viaja del celular de Graciela al panel (placa redondeada verde con el texto navy)
const chipT = lienzo(640, 200, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 118); x.fillText("Pagado ✓", w / 2, h / 2 + 6); });
const chip3d = new THREE.Mesh(rbox(0.32, 0.1, 0.03, 0.03, 3), [M.gd, M.gd, M.gd, M.gd, new THREE.MeshBasicMaterial({ map: chipT, toneMapped: false }), M.gd]); scene.add(chip3d);

const LUCES = { ban: [luzBan, cieloBan, rellBan], inv: [luzInv, solInv, cieloInv], rot: [luzRot, cieloRot], mue: [luzMue, cieloMue], ofi: [luzOfi, cieloOfi] };
const INTENS = new Map(); for (const k in LUCES) for (const l of LUCES[k]) INTENS.set(l, l.intensity);
function ponerLuces(lugares, k = 1) { for (const key in LUCES) for (const l of LUCES[key]) { l.visible = lugares.includes(key); l.intensity = INTENS.get(l) * k; } }
const FONDO = { ban: 0xe9e7dc, inv: 0x16243d, rot: 0xf4f4ef, mue: 0xd9e6ef, ofi: 0xe7eef3 };

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 - 0.5), r2(T.p5 + 0.3), r2(T.q4 + 0.4)] });
const patricia = crearPersonaje({ ...ELENCO.patricia, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p2 + 0.6), r2(T.p6 + 0.5), r2(T.q4p6 + 0.6)] });
const graciela = crearPersonaje({ ...ELENCO.clienta, lentesFinos: true, sinPatillas: true, delantal: C.cr, delantalBorde: C.navy3, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p4 + 0.4)] });
const nico = crearPersonaje({ ...ELENCO.empleado, cortoMechas: true, dedos: true, parpadeoCada: 999 });
const cliente = crearPersonaje({ ...DEFECTO, nombre: "Cliente", piel: PIEL.clara, pelo: PELO.gris, peinado: "corto", camisa: 0x9fb3c9, mangas: "largas", pantalon: C.navy2, parpadeoCada: 999 });
// el pelo de Rubén: la herradura de bolitas canosas (de dist-pedidos-lunes / dist-cliente-grande)
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
// el bigote de Rubén se esconde cuando la cámara le ve la nuca (asomaba por los costados de la cabeza)
const BIGOTE_R = []; ruben.cabeza.traverse((o) => { if (o.isMesh && o.material.color && (o.material.color.getHex() === PELO.gris || o.material.color.getHex() === ELENCO.ruben.cejasColor)) BIGOTE_R.push(o); });
function bigoteSegunCamara(cam = camera) {
  ruben.cabeza.updateMatrixWorld(true);
  const h = ruben.cabeza.getWorldPosition(new THREE.Vector3()), f = V3(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld), c = cam.position.clone().sub(h);
  f.y = 0; c.y = 0; f.normalize(); c.normalize();
  for (const b of BIGOTE_R) b.visible = f.dot(c) > 0.1;   // (r3) también las cejas: de nuca asomaban como bultos
}
// la credencial de Patricia (tarjeta crema lisa, sin logo, con la cinta navy) colgada sobre la camisa
const credencial = new THREE.Group(); patricia.cuerpo.add(credencial);
{
  credencial.add(caja(0.075, 0.1, 0.006, M.cr, 0, 0, 0, 0.006));
  credencial.add(caja(0.05, 0.012, 0.007, M.navy3, 0, 0.032, 0.001, 0.002));
  const cinta = mesh(new THREE.TorusGeometry(0.12, 0.006, 6, 30, Math.PI * 0.8), M.navy, 0, 0.17, -0.06); cinta.rotation.set(0.35, 0, Math.PI * 1.1); credencial.add(cinta);
  credencial.position.set(0.0, 0.27, 0.3);
}
// el termo bajo el brazo de Rubén (izquierdo) y el mate en su mano izquierda; la lapicera de Patricia en su mano derecha
const termoR = crearTermo(); termoR.scale.setScalar(1.05); scene.add(termoR);
const mate = crearMate(); mate.scale.setScalar(1.1); scene.add(mate);
const lapicera = new THREE.Group(); lapicera.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.14, 8), M.navy, 0, 0.0, 0)); lapicera.add(mesh(new THREE.ConeGeometry(0.006, 0.016, 8), M.cr2, 0, 0.078, 0)); scene.add(lapicera);
// los celulares: el de Rubén (navy, pantalla canvas: la planilla / la llamada) y el de Nico (el aviso)
const pantR = lienzo(600, 1215, () => {});
const pantN = lienzo(600, 1215, () => {});
function crearCel(tex, funda, W = 0.085, H = 0.172) {
  const g = new THREE.Group();
  g.add(caja(W + 0.008, H + 0.008, 0.014, mat(funda, 0.5), 0, 0, 0, 0.012));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); p.position.z = 0.0075; g.add(p);
  g.userData = { W, H };
  return sombras(g);
}
const celR = crearCel(pantR, C.navy3); scene.add(celR);
const celG = crearCel(pantG, C.g); celGsoporte.add(celG); celG.position.set(0, 0.105, 0.0); celG.rotation.x = -0.32;
const celN = crearCel(pantN, C.navy); scene.add(celN);
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
// la mano suelta de los insertos: palma, pulgar estirado sobre la pantalla, la manga (navy3 = Rubén, crema = Graciela)
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
const manoG = crearManoInserto(ELENCO.clienta.piel, C.g); manoG.userData.manga.visible = false; scene.add(manoG);
const TODOS = [ruben, patricia, graciela, nico, cliente];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (el panel) ----
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
  AVATAR.hector = leer(crearPersonaje({ ...ELENCO.hector, chaleco: null, parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.walter = leer(crearPersonaje({ ...ELENCO.walter, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.marta = leer(crearPersonaje({ ...ELENCO.duena, parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.nelly = leer(crearPersonaje({ ...DEFECTO, nombre: "Nelly", piel: PIEL.media, pelo: PELO.rubio, peinado: "rodete", camisa: C.cr, mangas: "largas", labios: 0xb5555a, aros: C.g, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.tito = leer(crearPersonaje({ ...DEFECTO, nombre: "Tito", piel: PIEL.media, pelo: PELO.gris, peinado: "corto", bigote: PELO.gris, camisa: C.cr, mangas: "cortas", parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.dante = leer(crearPersonaje({ ...DEFECTO, nombre: "Dante", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "corto", camisa: C.navy3, mangas: "cortas", parpadeoCada: 999 }), 0xefeee5);
  AVATAR.beto = leer(crearPersonaje({ ...DEFECTO, nombre: "Beto", piel: PIEL.clara, pelo: PELO.castaño, peinado: "corto", bigote: PELO.castaño, camisa: C.navy3, mangas: "cortas", parpadeoCada: 999 }), 0x5ce611);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
function parlante() {}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// una caja kraft dibujada (el avatar de la distribuidora en el chat)
function cajita(x, cx, cy, r) {
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.fillStyle = "#c9a46b"; x.fillRect(cx - r * 0.55, cy - r * 0.35, r * 1.1, r * 0.85); x.fillStyle = "#b8935a"; x.fillRect(cx - r * 0.55, cy - r * 0.35, r * 1.1, r * 0.18);
  x.fillStyle = "#16243d"; x.fillRect(cx - r * 0.1, cy - r * 0.35, r * 0.2, r * 0.85);
  x.strokeStyle = "#0b1220"; x.lineWidth = r * 0.1; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}

// ================= PANTALLAS =================
const fmt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// ---- el celular de Rubén: la planilla de cuentas corrientes (P3) y la llamada (P4, Q4) ----
const FILAS = (() => {
  // nombres únicos (51 filas visibles al bajar), sin "almacén"; los clientes del panel con los mismos saldos que el panel
  const tipos = ["Bar", "Kiosco", "Panadería", "Pizzería", "Rotisería", "Autoservicio", "Cafetería", "Carnicería", "Minimercado", "Verdulería"];
  const nom = ["Lola", "Fede", "Rulo", "Sol", "Mabel", "Coco", "Pocho", "Nené", "Toto", "Chela", "Rita", "Lalo", "Gabi", "Pepe", "Moni", "Quique", "Susi", "Tano", "Beba", "Cacho", "Lili", "Pato", "Yoli", "Dino", "Fito", "Ñato", "Olga", "Pirulo", "Tota", "Zulma", "Mingo", "Kika", "Lucho", "Negro", "Pupi", "Ruso", "Tati", "Vico", "Yuyo", "Chiche", "Lito", "Mecha"];
  const fijos = { 6: ["Súper Héctor", "312.000"], 13: ["Cafetería Marta", "205.400"], 21: ["Panadería Nelly", "161.000"], 29: ["Bar Walter", "51.200"], 37: ["Kiosco Beto", "22.400", "42"], 42: ["Panadería Tito", "31.000", "35"], 44: ["Pizzería Dante", "43.000", "33"] };
  const out = []; semilla = 33; let k = 0;
  for (let i = 0; i < 46; i++) {
    if (fijos[i]) { const d = `${8 + Math.floor(az() * 40)}`; out.push([fijos[i][0], "", "30", fijos[i][2] ?? d, fijos[i][1]]); continue; }
    out.push([`${tipos[(k * 3) % tipos.length]} ${nom[k % nom.length]}`, "", "30", `${8 + Math.floor(az() * 40)}`, fmt(12000 + Math.floor(az() * 60) * 1000)]); k++;
  }
  out.push(["Rotisería Graciela", "", "30", "94", "186.000", 1]);
  for (let i = 0; i < 4; i++) { out.push([`${tipos[(k * 3) % tipos.length]} ${nom[k % nom.length]}`, "", "30", `${12 + i * 7}`, fmt(22000 + i * 9000)]); k++; }
  return out;
})();
const FILA_G = 46, FH = 92, Y0 = 300;
let claveR = "";
function dibujarCelR(t) {
  const enQ4 = t >= P2;
  let modo = "plan";
  if (!enQ4 && t >= T.p4) modo = t < T.r2 - 0.05 ? "llama" : "habla";
  if (enQ4) modo = "habla";
  // el desplazamiento de la planilla (función del tiempo): baja rápido y frena en Graciela
  const u = eo(sg(t, T.p3 - 0.05, T.frena));
  const filaArriba = lerp(0, FILA_G - 4, u);
  const toq = modo === "plan" && t >= T.llamar - 0.12 ? 1 : 0;
  const seg = modo === "habla" ? Math.floor(t - (enQ4 ? T.q4s : T.r2)) : 0;
  const clave = `${modo}|${Math.round(filaArriba * 20)}|${toq}|${seg}|${t >= T.frena ? 1 : 0}`; if (clave === claveR) return; claveR = clave;
  const { x } = pantR.userData, w = 600, h = 1215;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "plan") {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.save(); x.beginPath(); x.rect(0, Y0, w, h - Y0 - 150); x.clip();
    const k0 = Math.floor(filaArriba), fr = filaArriba - k0;
    for (let i = -1; i < 11; i++) {
      const k = k0 + i; if (k < 0 || k >= FILAS.length) continue;
      const [n, , , dias, saldo, esG] = FILAS[k], y = Y0 + (i - fr) * FH;
      x.fillStyle = esG ? "#f6e3e0" : k % 2 ? "#e2e0d4" : "#f7f6f0"; x.fillRect(0, y, w, FH);
      if (esG && t >= T.frena) { x.strokeStyle = "#c7655b"; x.lineWidth = 8; x.strokeRect(4, y + 4, w - 8, FH - 8); }
      x.fillStyle = "#0b1220"; ajustar(x, n, esG ? 900 : 700, 38, 300); x.fillText(n, 16, y + FH / 2);
      x.textAlign = "right"; x.fillStyle = esG ? "#c7655b" : "#1f3254"; x.font = F(900, 38); x.fillText(dias, 402, y + FH / 2); x.font = F(900, 36); x.fillText(saldo, w - 16, y + FH / 2); x.textAlign = "left";
    }
    x.restore();
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 190); x.fillStyle = "#efeee5"; ajustar(x, "Cuentas corrientes", 800, 52, w - 60); x.fillText("Cuentas corrientes", 26, 70);
    x.fillStyle = "#5ce611"; x.font = F(700, 36); x.fillText("312 filas · 38 clientes", 26, 140);
    x.fillStyle = "#1f3254"; x.fillRect(0, 190, w, Y0 - 190); x.fillStyle = "#efeee5"; x.font = F(800, 34); x.fillText("Cliente", 18, 245); x.textAlign = "right"; x.fillText("Días", 400, 245); x.fillText("Saldo", w - 16, 245); x.textAlign = "left";
    // abajo: el contador de filas o el botón Llamar
    x.fillStyle = "#16243d"; x.fillRect(0, h - 150, w, 150);
    if (t < T.frena) { x.fillStyle = "#efeee5"; x.font = F(800, 46); x.textAlign = "center"; x.fillText(`fila ${Math.round(filaArriba) + 1} de 312`, w / 2, h - 75); }
    else { x.fillStyle = toq ? "#3fa60a" : "#5ce611"; x.beginPath(); x.roundRect(40, h - 130, w - 80, 110, 55); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 58); x.textAlign = "center"; x.fillText("Llamar", w / 2, h - 73); }
    x.textAlign = "left";
  } else {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
    avatar(x, AVATAR.graciela, w / 2, 400, 170);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; ajustar(x, "Rotisería Graciela", 900, 66, w - 60); x.fillText("Rotisería Graciela", w / 2, 680);
    x.fillStyle = "#5ce611"; x.font = F(800, 60); x.fillText(modo === "llama" ? "Llamando…" : `0:0${Math.min(9, Math.max(0, seg))}`, w / 2, 780);
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2, 1030, 84, 0, 7); x.fill();
    x.strokeStyle = "#efeee5"; x.lineWidth = 20; x.lineCap = "round"; x.beginPath(); x.arc(w / 2, 1052, 46, Math.PI * 1.15, Math.PI * 1.85); x.stroke();
  }
  pantR.needsUpdate = true;
}
// ---- el celular de Graciela: en llamada (P4, Q4) · el recordatorio (Q1) · Pagado ✓ ----
let claveG = "";
function dibujarCelG(t) {
  let modo = "llamada";
  if (t >= P2 && t < T.q4) modo = t < T.llega ? "inicio" : t < T.pagado ? "recordatorio" : "pagado";
  const toq = modo === "recordatorio" && t >= T.pagar - 0.12 ? 1 : 0;
  const subr = modo === "recordatorio" ? cl(sg(t, T.llega + 0.35, T.llega + 0.75)) : 0;
  const clave = `${modo}|${toq}|${Math.round(subr * 10)}`; if (clave === claveG) return; claveG = clave;
  const { x } = pantG.userData, w = 600, h = 1215;
  x.textBaseline = "middle"; x.textAlign = "left";
  const cab = () => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); cajita(x, 80, 92, 52); x.fillStyle = "#efeee5"; ajustar(x, "Distribuidora Rubén", 800, 46, w - 170); x.fillText("Distribuidora Rubén", 150, 72); x.fillStyle = "#5ce611"; x.font = F(700, 32); x.fillText("en línea", 150, 124); };
  if (modo === "llamada") {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); cajita(x, w / 2, 400, 170);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; ajustar(x, "Distribuidora Rubén", 900, 62, w - 60); x.fillText("Distribuidora Rubén", w / 2, 680);
    x.fillStyle = "#5ce611"; x.font = F(800, 58); x.fillText("En llamada", w / 2, 780);
  } else if (modo === "inicio") {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h); cab();
  } else if (modo === "recordatorio") {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h); cab();
    // la burbuja recibida (crema) con el mensaje, el botón Pagar, la transferencia y el estado de cuenta
    x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(22, 200, w - 44, 960, 34); x.fill();
    let y = 270; x.fillStyle = "#0b1220"; x.font = F(800, 50); x.fillText("Hola, Graciela.", 52, y); y += 70; x.fillText("Tenés", 52, y); y += 92;
    x.font = F(900, 84); x.fillText("$ 208.000", 52, y); y += 86;
    x.font = F(900, 60); x.fillText("vencidos.", 52, y); const anchoVH = x.measureText("vencidos").width;
    if (subr > 0) { x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.lineCap = "round"; x.beginPath(); x.moveTo(50, y + 40); x.quadraticCurveTo(50 + anchoVH * 0.5 * subr, y + 50, 50 + anchoVH * subr, y + 38); x.stroke(); }
    y += 96; x.font = F(800, 48); x.fillText("Podés pagarlo acá:", 52, y);
    y += 100; x.fillStyle = toq ? "#3fa60a" : "#5ce611"; x.beginPath(); x.roundRect(52, y - 62, w - 104, 124, 62); x.fill(); if (toq) { x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.stroke(); }
    x.fillStyle = "#0b1220"; x.font = F(900, 70); x.textAlign = "center"; x.fillText("Pagar", w / 2, y + 2); x.textAlign = "left";
    y += 120; x.fillStyle = "#1f3254"; x.font = F(700, 36); x.fillText("o por transferencia:", 52, y); y += 48; x.fillText("Cuenta 00-123456", 52, y);
    y += 74; x.fillStyle = "#3fa60a"; x.font = F(800, 40); x.fillText("▤  Ver estado de cuenta", 52, y);
  } else {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h); cab();
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(22, 220, w - 44, 900, 36); x.fill();
    x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, 430, 130, 0, 7); x.fill(); tilde(x, w / 2, 435, 150, "#5ce611");
    x.textAlign = "center"; x.fillStyle = "#0b1220"; x.font = F(900, 104); x.fillText("Pagado", w / 2, 680);
    x.font = F(800, 52); x.fillText("Saldo al día", w / 2, 800); x.font = F(900, 80); x.fillText("$ 208.000", w / 2, 920);
  }
  pantG.needsUpdate = true;
}
// ---- el celular de Nico (Q3): el aviso "Visitar hoy" ----
let claveN = "";
function dibujarCelN(t) {
  if (claveN) return; claveN = "1";
  const { x } = pantN.userData, w = 600, h = 1215;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, w, 8);
  x.fillStyle = "#efeee5"; ajustar(x, "Distribuidora Rubén", 800, 46, w - 60); x.fillText("Distribuidora Rubén", 30, 62); x.fillStyle = "#5ce611"; x.font = F(700, 36); x.fillText("Cobranza · Nico", 30, 124);
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(22, 210, w - 44, 960, 36); x.fill();
  x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(52, 250, 330, 76, 38); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 46); x.fillText("Visitar hoy", 76, 290);
  avatar(x, AVATAR.beto, 120, 450, 74);
  x.fillStyle = "#0b1220"; x.font = F(900, 62); x.fillText("Kiosco", 220, 420); x.fillText("Beto", 220, 490);
  x.fillStyle = "#c7655b"; x.font = F(800, 46); x.fillText("vencida hace", 52, 640); x.font = F(900, 66); x.fillText("12 días", 52, 715);
  x.fillStyle = "#0b1220"; x.font = F(900, 92); x.fillText("$ 22.400", 52, 840);
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(52, 960, w - 104, 120, 60); x.fill(); x.fillStyle = "#efeee5"; x.font = F(900, 58); x.textAlign = "center"; x.fillText("Ver ruta", w / 2, 1022);
  pantN.needsUpdate = true;
}
// ---- el panel de Rubén (Q2): Cuentas por cobrar ----
const PAGOS = [[AVATAR.graciela, "Rotisería Graciela", "$ 208.000"], [AVATAR.hector, "Súper Héctor", "$ 312.000"], [AVATAR.marta, "Cafetería Marta", "$ 205.400"], [AVATAR.nelly, "Panadería Nelly", "$ 161.000"], [AVATAR.walter, "Bar Walter", "$ 51.200"]];
const VENCIDO = [1034000, 826000, 514000, 308600, 147600, 96400];   // (r2) arranca donde terminó la parte 1; pagos = 937.600
let claveP = "";
function dibujarPanel(t) {
  const n = T.fila.filter((a) => t >= a).length, q = t >= T.quien ? 1 : 0;
  const k = n ? sg(t, T.fila[n - 1], T.fila[n - 1] + 0.25) : 0;
  const v = n ? Math.round(lerp(VENCIDO[n - 1], VENCIDO[n], eo(k)) / 100) * 100 : VENCIDO[0];
  const clave = `${n}|${q}|${Math.round(v / 1000)}`; if (clave === claveP) return; claveP = clave;
  const { x } = pantP.userData, w = 1280, h = 1000;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, w, 10);
  x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Cuentas por cobrar", 40, 64);
  // el contador grande
  const fin = n >= 5 && k >= 1;
  x.fillStyle = "#efeee5"; x.font = F(800, 54); x.fillText("Te deben:", 40, 200);
  x.fillStyle = fin ? "#5ce611" : "#c7655b"; x.font = F(900, 104); x.fillText(`$ ${fmt(v)}`, 320, 204);
  if (!q) {
    PAGOS.forEach(([cv, nom, m], i) => {
      const y = 280 + i * 140, ok = i < n;
      x.fillStyle = ok ? "#efeee5" : "#1f3254"; x.beginPath(); x.roundRect(30, y, w - 60, 124, 26); x.fill();
      avatar(x, cv, 98, y + 62, 46);
      x.fillStyle = ok ? "#0b1220" : "#b9cde0"; x.font = F(800, 52); x.fillText(nom, 162, y + 62);
      x.fillStyle = ok ? "#5ce611" : "#2c4268"; x.beginPath(); x.roundRect(820, y + 22, 420, 80, 40); x.fill();
      x.fillStyle = ok ? "#0b1220" : "#efeee5"; x.font = F(900, 52); x.textAlign = "center"; x.fillText(ok ? "Pagado ✓" : m, 1030, y + 63); x.textAlign = "left";
    });
  } else {
    x.fillStyle = "#5ce611"; x.font = F(900, 66); x.fillText("Quién y desde cuándo", 40, 330);
    const L = [[AVATAR.beto, "Kiosco Beto", "12 días · $ 22.400", "Visitar hoy → Nico", "#c7655b"], [AVATAR.tito, "Panadería Tito", "5 días · $ 31.000", "Recordatorio enviado ✓", "#5ce611"], [AVATAR.dante, "Pizzería Dante", "3 días · $ 43.000", "Recordatorio enviado ✓", "#5ce611"]];
    L.forEach(([cv, nom, d, acc, col], i) => {
      const y = 400 + i * 196;
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, y, w - 60, 176, 26); x.fill();
      avatar(x, cv, 100, y + 88, 56);
      x.fillStyle = "#0b1220"; x.font = F(900, 54); x.fillText(nom, 180, y + 52); x.fillStyle = "#1f3254"; x.font = F(800, 46); x.fillText(d, 180, y + 122);
      x.fillStyle = i === 0 ? "#c7655b" : "#16243d"; x.beginPath(); x.roundRect(690, y + 44, 560, 88, 44); x.fill();
      x.fillStyle = i === 0 ? "#0b1220" : "#5ce611"; ajustar(x, acc, 900, 44, 520); x.textAlign = "center"; x.fillText(acc, 970, y + 90); x.textAlign = "left";
    });
  }
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
const GL = {
  pa1: crearGlobo(["Rubén, estás", "en {rojo.} Y hoy", "pagás [sueldos.]"], 62),
  r1: crearGlobo(["Tranquila. La calle", "me debe [un millón.]"], 68),
  r2: crearGlobo(["Graciela, querida…", "te llamaba por lo", "de la fac…"], 58),
  g1: crearGlobo(["¡Rubén! Justo.", "Mandame [veinte cajas.]"], 62),
  r3: crearGlobo(["…Dale."], 76),
  pa2: crearGlobo(["¿Y? ¿[Cobraste?]"], 84),
  r4: crearGlobo(["Mejor.", "Ahora me deben {más.}"], 80),
  pa3: crearGlobo(["Te paso con", "{cobranzas.}"], 76),
  g2: crearGlobo(["Mirá vos.", "Rubén [nunca me cobra.]"], 66),
  n1: crearGlobo(["Beto. [Hoy paso.]"], 74),
  g3: crearGlobo(["¡Rubén! [Ya te pagué.]", "Mandame veinte cajas."], 58),
  r5: crearGlobo(["Dale."], 76),
  pa2b: crearGlobo(["¿Y? ¿[Cobraste?]"], 84),
  r6: crearGlobo(["Mejor.", "[Cobré y vendí.]"], 80),
  pa4: crearGlobo(["Te paso con", "[inversiones.]"], 76),
};
const ROT_ = {
  dist: crearRotulo([["Distribuidora Rubén", null, 50], ["15 empleados", "#5ce611", 56]], 50),
  deben: crearRotulo([["Te deben", null, 44], ["$ 1.012.000 · 38 clientes", null, 50]], 44),
  va94: crearRotulo([["Factura a 30 días:", null, 44], ["va por 94", "#d9786d", 64]], 44),
  recordatorio: crearRotulo([["Recordatorio automático", null, 46], ["de lo vencido", "#5ce611", 56]], 46),
  solo: crearRotulo([["El pago", null, 48], ["se marca solo", "#5ce611", 58]], 48),
  visitar: crearRotulo([["El vendedor sabe", null, 46], ["a quién visitar", "#5ce611", 56]], 46),
};
const GUIAS = [crearGuia(), crearGuia()];

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt. "split" = pantalla partida.
const FRENTE_R = V3(Math.sin(RUB.giro), 0, Math.cos(RUB.giro)), FRENTE_P = V3(Math.sin(PAT.giro), 0, Math.cos(PAT.giro));
const CAM_P1 = (k) => [0.03, lerp(1.16, 1.14, k), lerp(4.25, 4.05, k), 0.03, 1.1, -0.05, 57];
const CAM_P2 = (k) => [-1.45 + 0.06 * k, 1.5, 0.78 - 0.04 * k, RUB.x, 1.17, RUB.z, 40 - 2 * k];   // por encima del hombro de Patricia
const CAM_P5 = (k) => [1.82 - 0.05 * k, 1.58, 0.82 - 0.05 * k, PAT.x, 1.14, PAT.z, 40 - 2 * k];      // por encima del hombro de Rubén
const CAM_P6 = (k) => { const d = 2.25 - 0.25 * k; return [RUB.x + FRENTE_R.x * d, 1.33, RUB.z + FRENTE_R.z * d, RUB.x, 1.17, RUB.z, 38]; };
const CAM_P4D = (k) => { const d = 2.75 - 0.2 * k; return [RUB.x + FRENTE_R.x * d, 1.42, RUB.z + FRENTE_R.z * d, RUB.x, 1.12, RUB.z, 40]; };
const CAM_G = (k) => [GRA.x - 0.12, 1.5, lerp(0.75, 0.6, k), GRA.x + 0.08, 1.4, GRA.z, 42];   // Graciela de pecho, el celular en el soporte
const CAM_P7 = (k) => [lerp(-0.74, -0.72, k), 1.45, lerp(2.75, 2.62, k), -0.74, 1.04, 0.1, 46];
const CAM_C = (k) => [20.02, 1.12, lerp(3.05, 2.85, k), 20.02, 0.78, -0.45, 42];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, [[T.p2, ...CAM_P2(0)], [T.p3, ...CAM_P2(1)]]],
  ["P3", T.p3, null],                          // el inserto de la planilla en el celular de Rubén
  ["P4", T.p4, null],                          // pantalla partida: arriba el banco, abajo la rotisería
  ["P4g", r2(T.g1 - 0.03), [[r2(T.g1 - 0.03), ...CAM_G(0)], [T.p4d, ...CAM_G(1)]]],   // Graciela en la rotisería: "¡Rubén! Justo…"
  ["P4d", T.p4d, [[T.p4d, ...CAM_P4D(0)], [T.p5, ...CAM_P4D(1)]]],   // primer plano de Rubén: "…Dale." y el contador
  ["P5", T.p5, [[T.p5, ...CAM_P5(0)], [T.p6, ...CAM_P5(1)]]],
  ["P6", T.p6, [[T.p6, ...CAM_P6(0)], [T.p7, ...CAM_P6(1)]]],
  ["P7", T.p7, [[T.p7, ...CAM_P7(0)], [r2(T.timbre + 0.12), ...CAM_P7(1)]]],
  ["P7t", r2(T.timbre + 0.0), null],          // tilt al turnero: COBRANZAS
  // ---- parte 2 ----
  ["Q1i", T.q1i, null],                        // el inserto: el recordatorio ("¿Por favor?" sobre el inserto)
  ["Q1g", T.q1g, null],                        // Graciela se ríe: "Esto no lo escribió Rubén."
  ["Q1p", r2(T.pagar - 0.3), null],            // el inserto: Pagar → Pagado ✓
  ["Q2", T.q2, null],                          // el panel de Rubén
  ["Q3i", T.q3, null],                         // el aviso en el celular de Nico
  ["Q3", r2(T.n1 - 0.12), null],               // Nico junto a la camioneta: "Beto. Hoy paso."
  ["Q4s", T.q4s, null],                        // pantalla partida otra vez
  ["Q4g", r2(T.g3 + 0.4), [[r2(T.g3 + 0.4), ...CAM_G(0)], [r2(T.r5 - 0.1), ...CAM_G(1)]]],
  ["Q4d", r2(T.r5 - 0.1), [[r2(T.r5 - 0.1), ...CAM_P4D(0)], [T.q4p5, ...CAM_P4D(1)]]],
  ["Q4p5", T.q4p5, [[T.q4p5, ...CAM_P5(0)], [T.q4p6, ...CAM_P5(1)]]],
  ["Q4p6", T.q4p6, [[T.q4p6, ...CAM_P6(0)], [T.q4p7, ...CAM_P6(1)]]],
  ["Q4p7", T.q4p7, [[T.q4p7, ...CAM_P7(0)], [r2(T.timbre2 + 0.12), ...CAM_P7(1)]]],
  ["Q4t", r2(T.timbre2 + 0.0), null],         // tilt al turnero: INVERSIONES
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
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca = { ...(p.boca || {}), abierta: Math.max(p.boca?.abierta ?? 0, cl(e * 1.1 - 0.05) * k) }; }
};
const envEn = (t, t0, env) => { if (!env || t < t0 || t >= t0 + env.length / 30) return 0; const i = Math.floor((t - t0) * 30); return env[i] ?? 0; };
const _w = new THREE.Vector3();
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });

// ---------- Rubén en el banco (sentado del lado del cliente; el termo bajo el brazo izquierdo, el mate en la mano izquierda) ----------
const MANO_MATE = [0.17, 0.33, 0.36];
function poseRuben(t) {
  const parte2 = t >= P2;
  const pr = { x: RUB.x, y: -0.08, z: RUB.z, giro: RUB.giro, sentado: 1, inclina: -0.04, cabeza: { giro: 0.25, asiente: 0.04, ladea: 0.03 }, ...CARA.neutra, ojos: { x: 0.3, y: 0, abiertos: 0.95, tension: 0.05, feliz: 0.1 }, cejas: { alto: 0.1, ang: 0 }, boca: { sonrisa: 0.25, abierta: 0, ancho: 1 }, manoI: MANO_MATE, codoI: [1, -0.6, -0.25], manoD: [-0.2, 0.28, 0.32], codoD: [-1, -0.6, -0.1], dedoI: 0, dedoD: 0, t };
  if (!parte2) {
    if (t < T.p2) { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.3, y: 0.05, abiertos: 0.92, feliz: 0.2 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1 } }); }
    else if (t < T.p4) {
      // P2: canchero, recostado; "Tranquila." · al final saca el celular
      Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.1, y: 0.05, abiertos: 0.95, feliz: 0.25 }, cejas: { alto: 0.25, ang: 0, asim: 0.3 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.05 } });
      pr.inclina = -0.1; pr.cabeza = { giro: 0.1, asiente: -0.02, ladea: 0.06 };
      bocaVoz(pr, t, T.r1, ENV.r1, 0.6);
    } else if (t < T.p5) {
      // P4: la llamada, de golpe chiquito y meloso; se encoge (inclina adelante, hombros); "…Dale." resignado
      const u = sg(t, T.r2, T.r2 + LEN.r2);
      Object.assign(pr, { ...CARA.esperanza, ojos: { x: 0.0, y: -0.15, abiertos: 0.95, feliz: 0.25 }, cejas: { alto: 0.6, ang: 0.6 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 0.85 } });
      pr.inclina = 0.06 + 0.08 * u; pr.cabeza = { giro: -0.1, asiente: 0.1 + 0.1 * u, ladea: 0.12 };
      if (t >= T.g1 - 0.1) { Object.assign(pr, { ...CARA.sorpresa, ojos: { abiertos: 1, x: 0, y: -0.1 }, cejas: { alto: 0.7, ang: 0.3 }, boca: { sonrisa: 0.1, abierta: 0.15, ancho: 0.8 } }); }
      if (t >= T.g1 + LEN.g1 - 0.05) { Object.assign(pr, { ...CARA.resignado, ojos: { abiertos: 0.5, tension: 0.4, x: 0, y: -0.2 }, cejas: { alto: 0.35, ang: 0.8 }, boca: { sonrisa: -0.4, abierta: 0.1, ancho: 0.9 } }); }
      bocaVoz(pr, t, T.r2, ENV.r2, 0.55); bocaVoz(pr, t, T.r3, ENV.r3, 0.5);
    } else if (t < T.p6) {
      Object.assign(pr, { ...NADA }); pr.cabeza = { giro: 0.2, asiente: 0.06, ladea: 0 };
    } else if (t < T.p7) {
      // P6: el remate: cara de nada, los ojos un poco entrecerrados; seco
      Object.assign(pr, { ...SECO, ojos: { x: 0, y: 0.0, abiertos: 0.78, tension: 0.3 }, cejas: { alto: -0.05, ang: 0.05, asim: 0.4 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.9 } });
      pr.cabeza = { giro: 0, asiente: 0.03, ladea: 0.02 };
      bocaVoz(pr, t, T.r4, ENV.r4, 0.55);
    } else {
      // P7: mira para arriba al turnero
      Object.assign(pr, { ...NADA, ojos: { x: 0, y: 0.8, abiertos: 0.95 }, cejas: { alto: 0.3, ang: 0.2 } });
      pr.cabeza = { giro: 0.25, asiente: -0.35 * eio(sg(t, T.flip - 0.3, T.flip)), ladea: 0 };
    }
    return pr;
  }
  // parte 2 (Q4): tranquilo, contento
  Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.2, y: 0.05, abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } });
  if (t >= T.q4s && t < T.q4p5) { pr.cabeza = { giro: -0.1, asiente: 0.05, ladea: 0.05 }; bocaVoz(pr, t, T.r5, ENV.r5, 0.55); }
  if (t >= T.q4p6 && t < T.q4p7) { pr.cabeza = { giro: 0, asiente: 0.03, ladea: 0.02 }; Object.assign(pr, { ojos: { x: 0, y: 0, abiertos: 0.9, feliz: 0.35 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1 } }); bocaVoz(pr, t, T.r6, ENV.r6, 0.55); }
  if (t >= T.q4p7) { pr.cabeza = { giro: 0.25, asiente: -0.35 * eio(sg(t, T.flip2 - 0.3, T.flip2)), ladea: 0 }; pr.ojos = { x: 0, y: 0.8, abiertos: 1, feliz: 0.4 }; }
  return pr;
}
// ---------- Rubén en el box de inversiones (C): sentado en el sillón, a cámara ----------
function poseRubenC(t) {
  const pr = { x: 20.0, y: -0.1, z: -0.62, giro: 0, sentado: 1, inclina: 0.05, cabeza: { giro: 0, asiente: 0.02, ladea: 0.02 }, ...CARA.sonrisa, ojos: { abiertos: 0.97, feliz: 0.2, x: 0, y: 0.05 }, cejas: { alto: 0.18, ang: 0, asim: 0.25 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 }, manoI: MANO_MATE, codoI: [1, -0.6, -0.25], manoD: [-0.26, 0.2, 0.4], codoD: [-1, -0.4, -0.2], dedoI: 0, dedoD: 0, t };
  bocaVoz(pr, t, T.r7, ENV.r7, 0.6);
  return pr;
}
// ---------- Patricia (sentada del otro lado) ----------
function posePatricia(t) {
  const pr = { x: PAT.x, y: -0.08, z: PAT.z, giro: PAT.giro, sentado: 1, inclina: 0.02, cabeza: { giro: -0.12, asiente: 0.04, ladea: 0.02 }, ...CARA.sonrisa, ojos: { x: -0.1, y: 0, abiertos: 1, feliz: 0.15 }, cejas: { alto: 0.15, ang: 0.05 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 0.95 }, manoI: [0.2, 0.33, 0.38], codoI: [1, -0.6, -0.2], manoD: [-0.2, 0.33, 0.38], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  const parte2 = t >= P2;
  if (!parte2 && t < T.p2) {
    // P1: le gira el monitor (la mano izquierda en el canto) y señala "Sueldos hoy" con la lapicera
    Object.assign(pr, { ...CARA.neutra, ojos: { x: -0.2, y: 0, abiertos: 1, feliz: 0 }, cejas: { alto: 0.25, ang: 0.15 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.95 } });
    pr.cabeza = { giro: -0.25, asiente: 0.05, ladea: 0 };
    bocaVoz(pr, t, T.pa1, ENV.pa1, 0.6);
  }
  if (!parte2 && t >= T.p5 && t < T.p7) { Object.assign(pr, { ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0 }, cejas: { alto: 0.75, ang: 0.15 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.95 } }); pr.cabeza = { giro: 0.05, asiente: -0.02, ladea: 0.05 }; bocaVoz(pr, t, T.pa2, ENV.pa2, 0.6); }
  if (!parte2 && t >= T.p7) { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: -0.2, y: 0, abiertos: 1, feliz: 0.2 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1 } }); pr.cabeza = { giro: -0.45, asiente: 0.02, ladea: 0.04 }; bocaVoz(pr, t, T.pa3, ENV.pa3, 0.6); }
  if (parte2 && t >= T.q4p5 && t < T.q4p7) { Object.assign(pr, { ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0 }, cejas: { alto: 0.75, ang: 0.15 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.95 } }); pr.cabeza = { giro: 0.05, asiente: -0.02, ladea: 0.05 }; bocaVoz(pr, t, T.pa2b, ENV.pa2, 0.6); if (t >= T.q4p6 + 0.6) { pr.cejas = { alto: 0.6, ang: 0.05 }; pr.boca = { sonrisa: 0.5, abierta: 0, ancho: 1 }; } }
  if (parte2 && t >= T.q4p7) { Object.assign(pr, { ...CARA.feliz, ojos: { x: -0.2, y: 0, abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } }); pr.cabeza = { giro: -0.45, asiente: 0.02, ladea: 0.04 }; bocaVoz(pr, t, T.pa4, ENV.pa4, 0.6); }
  return pr;
}
// ---------- Graciela en la rotisería (detrás del mostrador, mirando a +z) ----------
function poseGraciela(t) {
  const pr = { x: GRA.x, y: GRA_Y, z: GRA.z, giro: 0, inclina: 0.02, cabeza: { giro: 0.25, asiente: 0.15, ladea: 0.05 }, ...CARA.feliz, ojos: { x: 0.3, y: -0.3, abiertos: 1, feliz: 0.35 }, ...BRAZOS.apoyado, codoI: [1, -0.4, -0.2], codoD: [-1, -0.4, -0.2], t };
  pr.manoI = [0.3, 0.3, 0.4]; pr.manoD = [-0.3, 0.3, 0.4];
  if (t < P2) { bocaVoz(pr, t, T.g1, ENV.g1, 0.7); pr.cabeza = { giro: 0.12, asiente: 0.12, ladea: 0.06 }; pr.ojos = { x: 0.2, y: -0.2, abiertos: 1, feliz: 0.3 }; }
  else if (t < T.q4) {
    // Q1: el celular vibra en el soporte (a su izquierda), lo lee, se ríe, toca Pagar
    Object.assign(pr, { ...CARA.sorpresa, ojos: { x: 0.45, y: -0.6, abiertos: 1, feliz: 0 }, cejas: { alto: 0.8, ang: 0.2 }, boca: { sonrisa: 0.3, abierta: 0, ancho: 0.9 } });
    pr.cabeza = { giro: 0.08, asiente: 0.04, ladea: 0.03 };
    if (t >= T.g2 + 0.6) { Object.assign(pr, { ...CARA.feliz, ojos: { x: 0.45, y: -0.4, abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.45, ang: 0.3 } }); }
    bocaVoz(pr, t, T.g2, ENV.g2, 0.7);
    const k = Math.sin(Math.PI * sg(t, T.pagar - 0.3, T.pagar + 0.2));
    if (k > 0) pr.manoI = lerpV(pr.manoI, aCuerpoG(celG, V3(0, -0.02, 0.05)), k);
  } else { Object.assign(pr, { ...CARA.feliz, ojos: { x: 0.3, y: -0.3, abiertos: 1, feliz: 0.4 } }); bocaVoz(pr, t, T.g3, ENV.g3, 0.7); }
  return pr;
}
function aCuerpoG(obj, local) { obj.updateMatrixWorld(true); graciela.poner({ x: GRA.x, y: GRA_Y, z: GRA.z, giro: 0, inclina: 0.02, t: 0 }); return aCuerpo(graciela, obj.localToWorld(local.clone())); }
// ---------- Nico en el muelle (Q3): el celular en la izquierda, el maletín en la derecha; se va a la cabina ----------
const NIC = V3(60.75, 0, 1.15);
function poseNico(t) {
  const va = sg(t, T.sube - 0.05, T.portazo + 0.25);
  const pr = { x: lerp(NIC.x, 58.7, va), y: 0, z: lerp(NIC.z, 1.25, va), giro: lerp(-0.25, -Math.PI / 2, eio(sg(t, T.sube - 0.1, T.sube + 0.2))), paso: va > 0 && va < 1 ? 1 : 0, inclina: 0.03, cabeza: { giro: 0, asiente: 0.25, ladea: 0 }, ...CARA.concentrada, ojos: { x: 0, y: -0.6, abiertos: 0.9 }, manoI: [0.12, 0.42, 0.38], codoI: [1, -0.6, -0.2], manoD: [-0.29, -0.06, 0.04], codoD: [-1, 0.2, -0.2], dedoI: 0, dedoD: 0, t };
  if (t >= T.n1 - 0.05) { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: -0.1, abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.3, ang: 0 } }); pr.cabeza = { giro: 0.0, asiente: 0.05, ladea: 0.03 }; }
  if (t >= T.sube - 0.1) { pr.manoI = [0.29, -0.06, 0.04]; pr.codoI = [1, 0.2, -0.2]; }
  bocaVoz(pr, t, T.n1, ENV.n1, 0.75);
  return pr;
}

// ================= RENDER =================
const camA = new THREE.PerspectiveCamera(40, 1080 / 960, 0.02, 160), camB = new THREE.PerspectiveCamera(40, 1080 / 960, 0.02, 160);
scene.add(camA, camB);
function ponerCamX(cam, v) { cam.position.set(v[0], v[1], v[2]); cam.up.set(0, 1, 0); cam.fov = v[6]; cam.updateProjectionMatrix(); cam.lookAt(v[3], v[4], v[5]); cam.updateMatrixWorld(true); }
// el monitor gira hacia Rubén al arrancar (función del tiempo)
function ryMonitor(t) { return 0.36; }
// el celular sostenido delante de la cara (en altavoz), a un costado, con la pantalla hacia la cámara
function celEnMano(cel, per, lado, cam, local) {
  per.raiz.updateMatrixWorld(true);
  const p = per.cabeza.localToWorld(local.clone());
  cel.position.copy(p); cel.lookAt(cam.position); cel.rotateZ(lado * 0.12);
  return p;
}
function renderAt(tIn) {
  AVISOS.length = 0; PROY = null;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const camPre = pl[2] ? catmull(pl[2], t) : null;
  const pa = planoActual;
  const split = pa === "P4" || pa === "Q4s";
  const lugar = ["Q1i", "Q1g", "Q1p", "P4g", "Q4g"].includes(pa) ? "rot" : pa === "Q2" ? "ofi" : ["Q3", "Q3i"].includes(pa) ? "mue" : pa === "C" ? "inv" : "ban";
  ponerLuces(split ? ["ban", "rot"] : [lugar], split ? 0.62 : 1);
  scene.background = new THREE.Color(FONDO[lugar]);
  BAN.visible = lugar === "ban"; ROT.visible = lugar === "rot" || split; INV.visible = lugar === "inv"; MUE.visible = lugar === "mue"; OFI.visible = lugar === "ofi";
  // ---- objetos ----
  monPivote.rotation.y = ryMonitor(t); monPivote.visible = !(pa === "P7t" || pa === "Q4t");
  dibujarSaldo(t); dibujarTurno(t);
  dibujarCelR(t); dibujarCelG(t); if (lugar === "mue") dibujarCelN(t); if (lugar === "ofi") dibujarPanel(t);
  for (const [i, b] of spiedoBarras.entries()) b.rotation.x = t * 1.6 + i * 0.9;
  timbreBoton.position.y = 0.034 - 0.006 * (Math.sin(Math.PI * sg(t, T.timbre - 0.05, T.timbre + 0.12)) + Math.sin(Math.PI * sg(t, T.timbre2 - 0.05, T.timbre2 + 0.12)));
  // la vibración del celular de Graciela (Q1)
  celG.position.x = en(t, T.vibra - 0.15, T.vibra + 0.25) ? Math.sin(t * 160) * 0.004 : 0;
  // el café se corre cuando Rubén apoya el termo (C)
  // la camioneta: se sacude con el portazo (Q3)
  camioneta.position.y = en(t, T.portazo, T.portazo + 0.2) ? Math.sin((t - T.portazo) * 60) * 0.008 * (1 - sg(t, T.portazo, T.portazo + 0.2)) : 0;
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  celR.scale.setScalar(1); termoR.visible = mate.visible = lapicera.visible = celR.visible = celN.visible = maletin.visible = manoR.visible = manoG.visible = chip3d.visible = false;
  celG.visible = true;
  if (BAN.visible || split) {
    ruben.raiz.visible = patricia.raiz.visible = true;
    const pr = poseRuben(t); ruben.poner(pr);
    const pp = posePatricia(t);
    if (camPre && ["P1", "P5", "P7", "Q4p5", "Q4p7"].includes(pa)) {
      const yaw = Math.atan2(camPre[0] - PAT.x, camPre[2] - PAT.z) - PAT.giro, k = pa === "P1" ? 0.75 : 0.9;
      pp.cabeza = { ...(pp.cabeza || {}), giro: cl(yaw * k, -1.0, 1.0) }; pp.ojos = { ...(pp.ojos || {}), x: 0 };
    }
    patricia.poner(pp);
    // Patricia: la mano izquierda en el canto del monitor mientras lo gira (P1) y la lapicera que señala "Sueldos hoy"
    BAN.updateMatrixWorld(true);
    if (!parte2 && t < T.p2) {
      const gira = 0, se = Math.sin(Math.PI * sg(t, T.tic - 0.45, T.tic + 0.55));
      const canto = monPivote.localToWorld(V3(-MON.W / 2 - 0.02, MON.y - 0.05, 0.15)), sueldos = monPivote.localToWorld(V3(0.2, MON.y - 0.08, 0.3));
      if (gira > 0) { pp.manoI = lerpV(pp.manoI, aCuerpo(patricia, canto), gira); }
      if (se > 0) { pp.manoI = lerpV(pp.manoI, aCuerpo(patricia, sueldos), se); }
      patricia.poner(pp);
    }
    // P7 / Q4: Patricia aprieta el timbre con el índice derecho (toca el botón, no lo atraviesa)
    for (const tb of [T.timbre, T.timbre2]) {
      const k = Math.sin(Math.PI * sg(t, tb - 0.45, tb + 0.35));
      if (k > 0) { timbreBoton.parent.updateMatrixWorld(true); const top = timbreBoton.parent.localToWorld(V3(0.0, 0.06 - 0.012 * k, -0.01)); pp.manoD = lerpV(pp.manoD, aCuerpo(patricia, top), k); pp.dedoD = 1; patricia.poner(pp); }
    }
    patricia.raiz.updateMatrixWorld(true);
    lapicera.visible = true; patricia.brazos[0].mano.getWorldPosition(_w);
    lapicera.position.copy(_w); lapicera.quaternion.copy(patricia.brazos[0].mano.getWorldQuaternion(new THREE.Quaternion())); lapicera.rotateX(Math.PI / 2);
    // Rubén: el termo bajo el brazo izquierdo, el mate en la mano izquierda (sorbo al final de "un millón"; el sorbo
    // vacío antes del remate)
    ruben.raiz.updateMatrixWorld(true);
    termoR.visible = true; termoR.position.set(0.44, MESA_Y, -0.36); termoR.rotation.set(0, 0.4, 0);   // (r2) en el escritorio: bajo el brazo salía por el borde del plano general
    mate.visible = true;
    const m = ruben.brazos[0].mano.getWorldPosition(_w).clone();
    let so = 0;
    if (!parte2) so = Math.max(Math.sin(Math.PI * sg(t, T.r1 + LEN.r1 - 0.15, T.r1 + LEN.r1 + 0.6)), Math.sin(Math.PI * sg(t, T.sorbo - 0.1, T.r4 - 0.02)), pa === "P7t" ? 1 : 0);
    mate.rotation.set(0, ruben.raiz.rotation.y + Math.PI / 2, 0.35 * so); mate.position.copy(m).add(V3(0, -0.07, 0));
    if (so > 0) {
      const boca = ruben.cabeza.localToWorld(V3(0.0, 0.1, 0.33));
      mate.updateMatrixWorld(true);
      const punta = V3(0.075, 0.305, 0).multiplyScalar(1.1).applyEuler(mate.rotation);
      mate.position.lerp(boca.sub(punta), so);
    }
    if (pa === "P5" || pa === "Q4p5") mate.visible = false;   // (r3) por encima del hombro: el dedo atravesaba el mate
    // el celular de Rubén: en la mano derecha delante de la cara (altavoz) en la llamada
    if ((pa === "P4" || pa === "Q4s")) { celR.visible = true; }
  }
  if (lugar === "ban") {
    cliente.raiz.visible = true; cliente.poner({ x: 4.5, y: -0.08, z: 0.2, giro: Math.PI / 2 + 0.2, sentado: 1, ...CARA.neutra, manoI: [0.15, 0.3, 0.3], manoD: [-0.15, 0.3, 0.3], t });
  }
  if (ROT.visible) {
    graciela.raiz.visible = !(pa === "Q1i" || pa === "Q1p"); const pg = poseGraciela(t);
    { const cp = split ? null : camPre; const cx = cp ? cp[0] : GRA.x + 0.1, cz = cp ? cp[2] : 1.1; const yaw = Math.atan2(cx - GRA.x, cz - GRA.z); pg.cabeza = { ...(pg.cabeza || {}), giro: cl(yaw * 0.9, -0.6, 0.6) }; }
    graciela.poner(pg);
  }
  if (lugar === "mue") { nico.raiz.visible = pa === "Q3"; nico.poner(poseNico(t)); nico.raiz.updateMatrixWorld(true); maletin.visible = pa === "Q3"; nico.brazos[1].mano.getWorldPosition(_w); maletin.position.copy(_w).add(V3(0, -0.01, 0)); maletin.rotation.set(0, nico.raiz.rotation.y, 0); }
  if (lugar === "inv") {
    ruben.raiz.visible = true; ruben.poner(poseRubenC(t)); ruben.raiz.updateMatrixWorld(true);
    mate.visible = true; ruben.brazos[0].mano.getWorldPosition(_w); mate.position.copy(_w).add(V3(0, -0.07, 0)); mate.rotation.set(0, Math.PI / 2, 0);
  }
  // ---- cámara ----
  if (pl[2]) { ponerCam(catmull(pl[2], t), t); camera.updateMatrixWorld(true); }
  if (pa === "P3") {
    // el inserto de la planilla: el celular de Rubén de frente, la mano con el pulgar que baja
    celR.visible = manoR.visible = true; ruben.raiz.visible = false; mate.visible = termoR.visible = false;
    celR.position.set(0.55, 1.05, 0.55); celR.rotation.set(-0.15, -0.35, 0.04);
    camPantalla(celR, V3(0, 0.018, 0.0075), V3(0, 0, 1), 0.172, 0.7, 36, t, 0.02 * (1 - eo(sg(t, T.p3, T.p3 + 0.9))));
    celR.updateMatrixWorld(true);
    const baja = t < T.frena ? Math.abs(Math.sin((t - T.p3) * 9)) : 0;
    const toca = Math.sin(Math.PI * sg(t, T.llamar - 0.22, T.llamar + 0.12));
    manoR.position.copy(celR.localToWorld(V3(0.035, -0.105, -0.012))); manoR.quaternion.copy(celR.quaternion);
    manoR.userData.pulgar.rotation.set(0, 0, 0.55 - 0.35 * baja - 0.25 * toca); manoR.userData.pulgar.position.set(0.02, -0.0, 0.026 - 0.004 * toca);
  }
  if (split) {
    // arriba: Rubén en el banco con el celular en altavoz y Patricia mirándolo · abajo: la rotisería
    const kA = sg(t, pl[1], pl[1] + 2.5);
    ponerCamX(camA, [lerp(-0.2, -0.15, kA), 1.3, lerp(2.45, 2.3, kA), 0.42, 1.18, RUB.z - 0.1, 44]);
    ponerCamX(camB, [GRA.x + lerp(0.1, 0.12, kA), 1.5, lerp(0.95, 0.85, kA), GRA.x + 0.3, 1.32, GRA.z + 0.2, 46]);
    celR.visible = true; celR.scale.setScalar(1.6); celEnMano(celR, ruben, -1, camA, V3(-0.4, 0.08, 0.36));
    const pr = poseRuben(t); pr.manoD = aCuerpo(ruben, celR.position.clone().add(V3(0, -0.075, 0))); pr.codoD = [-1, -0.6, -0.1]; ruben.poner(pr);
    camera.position.set(0, 0, 0); camera.fov = 50; camera.aspect = 1080 / 1920; camera.updateProjectionMatrix();
  }
  if (pa === "P7i" || pa === "Q4i") {
    // el dedo de Patricia en el timbre (inserto corto)
    timbreBoton.parent.updateMatrixWorld(true);
    const c = timbreBoton.parent.localToWorld(V3(0, 0.04, 0));
    ponerCam([c.x + 0.42, c.y + 0.32, c.z + 0.5, c.x - 0.06, c.y + 0.02, c.z, 40], t, true);
  }
  if (pa === "P7t" || pa === "Q4t") {
    // tilt al turnero: sube de la mesa al turnero y se acerca (lo llena de ancho)
    turnero.updateMatrixWorld(true);
    const c = turnero.localToWorld(turnero.userData.centro.clone());
    const u = eio(sg(t, pl[1], pl[1] + 0.25));
    // final: el turnero arriba (~80 % del ancho) y Rubén abajo, entero, mirándolo con la bombilla en la boca
    const FOV = 50, fin = V3(0.82, 1.72, 2.4), centro = V3(0.85, 1.9, -0.55);
    const desde = V3(-0.33, 0.8, 0.33), mira = desde.clone().lerp(centro, u);
    const pos = V3(-0.5, 1.45, 2.3).lerp(fin, u);
    ponerCam([pos.x, pos.y, pos.z, mira.x, mira.y, mira.z, FOV], t, true); void c;
  }
  if (pa === "Q1") {
    const u = eio(sg(t, P2, T.q1i));
    ponerCam([lerp(40.02, 40.08, u), lerp(1.32, 1.3, u), lerp(1.35, 1.05, u), 40.56, 1.42, -1.5, 52], t);
  }
  if (pa === "Q1i" || pa === "Q1p") {
    celGsoporte.updateMatrixWorld(true);
    const ex = pa === "Q1i" ? 0.03 * (1 - eo(sg(t, T.q1i, T.q1i + 0.5))) : 0;
    camPantalla(celG, V3(0, 0.012, 0.0075), V3(0, 0, 1), 0.172, 0.7, 36, t, ex);
    if (pa === "Q1p") {
      manoG.visible = true; celG.updateMatrixWorld(true);
      const toca = Math.sin(Math.PI * sg(t, T.pagar - 0.2, T.pagar + 0.12)) * (t < T.pagado + 0.05 ? 1 : 0);
      const r = 0.5, punta = V3(0.02 - 0.062 * Math.sin(r), 0.062 * Math.cos(r), 0), boton = V3(0.0, -0.016, 0);
      const pos = V3(0.05, -0.15, -0.006).lerp(boton.clone().sub(punta), toca);
      manoG.position.copy(celG.localToWorld(pos)); manoG.quaternion.copy(celG.getWorldQuaternion(new THREE.Quaternion()));
      manoG.userData.pulgar.rotation.set(0, 0, r); manoG.userData.pulgar.position.set(0.02, 0, 0.019);
      manoG.visible = toca > 0.02;
    }
  }
  if (pa === "Q1g") {
    const u = sg(t, pl[1], T.pagar - 0.3);
    ponerCam([GRA.x - lerp(0.12, 0.1, u), 1.5, lerp(0.75, 0.62, u), GRA.x + 0.08, 1.4, GRA.z, 40], t);
  }
  if (pa === "Q2") {
    // el panel: push-in hasta el inserto; el chip "Pagado ✓" entra volando desde arriba a la izquierda a la fila de Graciela
    panelMon.updateMatrixWorld(true);
    const u = eio(sg(t, T.q2, T.q2 + 0.7));
    const c = panelMon.localToWorld(panelMon.userData.centro.clone());
    const FOV = 42, dIns = (PANEL.W * 1.04) / (2 * Math.tan((FOV * D2R) / 2) * (1080 / 1920));
    ponerCam([lerp(c.x - 0.35, c.x, u), lerp(c.y + 0.12, c.y - 0.04, u), c.z + lerp(dIns + 0.9, dIns, u), c.x, c.y - 0.04 * u, c.z, FOV], t, true);
    const v = sg(t, T.q2 - 0.05, T.fila[0]);
    if (v < 1) {
      chip3d.visible = true; camera.updateMatrixWorld(true);
      const dest = panelMon.localToWorld(V3(((1030 / 1280) - 0.5) * PANEL.W, 0.3 + PANEL.H / 2 + (0.5 - 342 / 1000) * PANEL.H, 0.06));
      const ori = camera.localToWorld(V3(-0.16, -0.4, -0.6));
      chip3d.position.copy(ori.clone().lerp(dest, eio(v))); chip3d.position.y += Math.sin(Math.PI * v) * 0.08;
      chip3d.quaternion.copy(panelMon.getWorldQuaternion(new THREE.Quaternion())); chip3d.rotateZ((1 - eo(v)) * 0.9); chip3d.scale.setScalar(lerp(1.5, 0.95, eo(v)));
    }
  }
  if (pa === "Q3i") {
    // el aviso en el celular de Nico (sin Nico: el celular sostenido, de frente)
    celN.visible = true; celN.position.set(60.55, 1.25, 1.25); celN.rotation.set(-0.1, 0.15, 0.03);
    camPantalla(celN, V3(0, 0.012, 0.0075), V3(0, 0, 1), 0.172, 0.7, 36, t, 0.02 * (1 - eo(sg(t, T.q3, T.q3 + 0.5))));
  }
  if (pa === "Q3") {
    const u = sg(t, pl[1], T.q4);
    ponerCam([lerp(60.45, 60.42, u), 1.35, lerp(5.0, 4.8, u), lerp(60.45, 60.42, u), 1.15, 0.2, 48], t);
    nico.raiz.updateMatrixWorld(true);
    if (t < T.sube) { celN.visible = true; celEnMano(celN, nico, 1, camera, V3(0.22, -0.12, 0.42)); const pn = poseNico(t); pn.manoI = aCuerpo(nico, celN.position.clone().add(V3(0, -0.075, 0))); nico.poner(pn); }
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  const camOjo = split ? camA : camera;
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano((p === graciela && split ? camB : camOjo).position);
  bigoteSegunCamara(camOjo);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROT_) ROT_[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const di = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) => { if (t >= ti - 0.04 && t < fin) hablar(GL[k], per, ent(ti - 0.04), orden, dx, minY, maxY, sobre); };
    if (pa === "P1") {
      if (t >= T.pa1 - 0.04) ponerGlobo(GL.pa1, 300, 560, ent(T.pa1 - 0.04), aPx(bocaW(patricia)), 1);
      const r = ROT_.dist, rx = 690, ry = 1560; ponerGlobo(r, rx, ry, ent(T.rotD), null, 2);
      const [bx, by] = enPantalla(ruben.cuerpo.localToWorld(V3(0, 0.15, 0.3)));
      ponerGuia(GUIAS[1], rx, ry - r.userData.H / 2 + 4, bx, by, sg(t, T.rotD, T.rotD + 0.25));
    }
    if (pa === "P2") di("r1", ruben, T.r1, T.p3, 1, 0, 260);
    if (pa === "P3") {
      if (t >= T.rotA && t < T.rotB) ponerGlobo(ROT_.deben, 540, 175, ent(T.rotA), null, 2);
      if (t >= T.rotB) {
        const r = ROT_.va94; ponerGlobo(r, 760, 175, ent(T.rotB), null, 3);
        celR.updateMatrixWorld(true); const [gx, gy] = enPantalla(celR.localToWorld(V3(0.03, 0.086 - (Y0 + 4.5 * FH) / 1215 * 0.166, 0.008)));
        ponerGuia(GUIAS[0], 900, 175 + r.userData.H / 2 - 4, gx, gy, sg(t, T.rotB, T.rotB + 0.2));
      }
    }
    if (split) {
      PROY = [camA, 0];
      di("r2", ruben, T.r2, T.g1 + 0.3, 1, -120, 30, 900, 95);
      PROY = [camB, 1];
      di("g1", graciela, T.g1, T.r3 - 0.05, 2, -140, 990, 1880, 50);
      di("g3", graciela, T.g3, T.r5 - 0.05, 2, -140, 990, 1880, 50);
      PROY = null;
    }
    if (pa === "P4d") di("r3", ruben, T.r3, T.p5, 1, 0, 200, 1100, 70);
    if (pa === "Q4d") di("r5", ruben, T.r5, T.q4p5, 1, 0, 200, 1100, 70);
    if (pa === "P4g") di("g1", graciela, T.g1, T.p4d, 1, 0, 230);
    if (pa === "Q4g") di("g3", graciela, T.g3, T.r5 - 0.1, 1, 0, 230);
    if (pa === "P5") di("pa2", patricia, T.pa2, T.p6, 1, 0, 280);
    if (pa === "P6") di("r4", ruben, T.r4, T.p7, 1, 0, 260);
    if (pa === "P7") di("pa3", patricia, T.pa3, P1, 1, 0, 280);
    if (pa === "P7i" && t >= T.pa3 - 0.04) ponerGlobo(GL.pa3, 540, 420, 1, null, 1);
    if (pa === "Q1i" && t >= T.q1i + 0.1 && t < T.g2 - 0.04) ponerGlobo(ROT_.recordatorio, 540, 1745, ent(T.q1i + 0.1), null, 2);
    if (pa === "Q1i" && t >= T.g2 - 0.04) ponerGlobo(GL.g2, 540, 1720, ent(T.g2 - 0.04), null, 3);
    if (pa === "Q1g") di("g2", graciela, T.g2, T.pagar, 1, 0, 260);
    if (pa === "Q2" && t >= T.fila[0] + 0.1) ponerGlobo(ROT_.solo, 540, 1700, ent(T.fila[0] + 0.1), null, 2);
    if (pa === "Q3i") ponerGlobo(ROT_.visitar, 540, 175, ent(T.q3 + 0.1), null, 2);
    if (pa === "Q3") di("n1", nico, T.n1, T.n1 + LEN.n1 + 0.15, 1, 0, 260);
    if (pa === "Q4p5") di("pa2b", patricia, T.pa2b, T.q4p6, 1, 0, 280);
    if (pa === "Q4p6") di("r6", ruben, T.r6, T.q4p7, 1, 0, 260);
    if (pa === "Q4p7") di("pa4", patricia, T.pa4, T.c, 1, 0, 280);
    if (pa === "Q4i" && t >= T.pa4 - 0.04) ponerGlobo(GL.pa4, 540, 420, 1, null, 1);
  }
  if (split) {
    renderer.setScissorTest(true);
    turnero.visible = false;
    renderer.setViewport(0, 960, 1080, 960); renderer.setScissor(0, 960, 1080, 960); renderer.render(scene, camA);
    turnero.visible = true;
    for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camB.position);
    bigoteSegunCamara(camB);
    renderer.setViewport(0, 0, 1080, 960); renderer.setScissor(0, 0, 1080, 960); renderer.render(scene, camB);
    renderer.setScissorTest(false); renderer.setViewport(0, 0, 1080, 1920);
    // las burbujas (capa 1, pegadas a la cámara principal) en una pasada más, sin borrar
    const bg = scene.background; scene.background = null; renderer.autoClear = false; camera.layers.set(1);
    renderer.clearDepth(); renderer.render(scene, camera);
    camera.layers.enableAll(); renderer.autoClear = true; scene.background = bg;
  } else renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
