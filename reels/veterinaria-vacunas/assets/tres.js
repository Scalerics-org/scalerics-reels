// Capa 3D de veterinaria-vacunas (Three.js r170 local). Base técnica: reels/taller-presupuestos (globos pegados a la cámara
// en píxeles de pantalla, avatares por render target, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom,
// insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// UN lugar: "Veterinaria Inés", de mañana, luz fría y pareja. Pared del fondo (z = -2,2) de azulejo verde apagado hasta
// 1,8 m y navy arriba; la mesa de acero en el medio (Toto sentado arriba), el carrito con el fichero de cartón adelante a
// la izquierda (en la parte 2, la tablet en su atril), la mesada con la pileta contra la pared izquierda, el mostrador de
// recepción a la derecha (el cartel "VETERINARIA INÉS" arriba) y la sala de espera contra la pared derecha (banco,
// vidriera y puerta). El living de Vero (Q2b) es un set chico aparte (x = 30).
//   PARTE 1: "Doctora, ¿y cuándo le toca la próxima?" · "Yo le aviso." · plac · el fichero: ABRIL, MAYO, JUNIO, la ficha
//            de Toto se hunde y las pestañas rojas crecen · JUNIO 21:40, el teléfono · Bruno: "¿y los avisos?" / "El que
//            quiere a su perro, se acuerda." · JULIO: Vero con Toto y el pañuelo de la otra · la pausa con el costo ·
//            "¿Vos también, Toto?" · Toto le da la pata
//   PARTE 2: la misma pregunta / "Le vamos a escribir a él." + la ficha en la tablet · el recordatorio solo · "¡Toto! ¡Te
//            escribieron!" · Sí, martes 10:00 · el panel · "Ya salieron solos." · martes 10:00, la sala llena, Toto
//            puntual: "¿Vos también, Toto?" y la pata · Sofi: "Comentá VACUNA…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet } from "./personajes.js";
import { crearPerro, PERROS, crearCaraGato } from "./perro.js";
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


// ---------- luces: el tubo del techo (luz fría pareja desde arriba), el cielo, relleno desde adelante ----------
const sol = new THREE.DirectionalLight(0xf6f8ff, 1.35);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 20 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xf8faf8, 0x8a8a80, 1.85); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xf4f6ff, 0.75); relleno.position.set(1, 3, 9); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xffffff, 0.35); rim.position.set(-3, 5, -8); scene.add(rim);
function ponerSol(cx, cz) { sol.position.set(cx + 1.2, 6.5, cz + 2.2); sol.target.position.set(cx, 0.5, cz); sol.target.updateMatrixWorld(); }
function noche(on) { cielo.intensity = on ? 1.15 : 1.85; relleno.intensity = on ? 0.45 : 0.75; sol.intensity = on ? 0.95 : 1.35; VID.material.color.set(on ? 0x0e1626 : 0xe3e9ec); }
// =====================================================================================================
// LA VETERINARIA
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const ZF = -2.2, HW = 3.0, XL = -3.2, XR = 4.6, AZ = 1.8;      // pared del fondo, alto, paredes de los costados, alto del azulejo
const MESA = { x: -0.45, z: -0.15, alto: 0.72 };                 // la mesa de acero (Toto arriba)
const CARRO = { x: -0.8, z: 1.4, alto: 0.8 };                  // el carrito del fichero (parte 2: la tablet)
const MOS = { x: 2.35, z: -1.05, w: 1.7, d: 0.55, alto: 1.02 };   // el mostrador de recepción (el frente mira a +z)
const MESADA = { x: XL + 0.32, z0: -1.95, z1: 0.35, alto: 0.92 }; // la mesada con la pileta, contra la pared izquierda
const PILETA = { z: -0.95 };
const BANCO = { x: XR - 0.3, z0: -1.9, z1: -0.25 };              // el banco de la sala de espera (pared derecha)
const PUERTA = { z0: 0.15, z1: 1.15 };                            // la puerta (pared derecha)
const azulejoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#365f28"; x.fillRect(0, 0, w, h); x.fillStyle = "#2c4f20"; for (let i = 0; i < 8; i++) { x.fillRect(0, i * 64, w, 4); x.fillRect(i * 64, 0, 4, h); } });
azulejoT.wrapS = azulejoT.wrapT = THREE.RepeatWrapping;
const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, h); x.fillStyle = "#d2d0c1"; for (let i = 0; i < 4; i++) x.fillRect(0, i * 128, w, 3); });
pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(5, 5);
// una pared: azulejo hasta AZ y navy arriba (BoxGeometry de frente +z en el espacio del grupo)
function pared(g, x0, x1, y0 = 0, y1 = HW) {
  const w = x1 - x0;
  if (y0 < AZ) { const hb = Math.min(AZ, y1) - y0, t = azulejoT.clone(); t.needsUpdate = true; t.repeat.set(w / 0.6, hb / 0.6); t.offset.set(0, (y0 % 0.6) / 0.6); const b = mesh(new THREE.BoxGeometry(w, hb, 0.2), [M.gaz, M.gaz, M.gaz, M.gaz, new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), M.gaz], (x0 + x1) / 2, y0 + hb / 2, -0.1); b.castShadow = false; g.add(b); }
  if (y1 > AZ) { const y = Math.max(AZ, y0), c = mesh(new THREE.BoxGeometry(w, y1 - y, 0.2), M.navy, (x0 + x1) / 2, (y + y1) / 2, -0.1); c.castShadow = false; g.add(c); }
}
M.gaz = mat(0x365f28, 0.85); M.acero = mat(0xb9bec4, 0.5, { metalness: 0.35 }); M.goma = mat(0xe4e0d0, 0.95); M.kraft = mat(0xc9a774, 0.85);
{
  const piso = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0.7, 0, 2.6); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  // la pared del fondo (con el zócalo navy) y las de los costados; la derecha con la vidriera y la puerta
  { const g = new THREE.Group(); g.position.z = ZF; SET.add(g); pared(g, XL, XR); g.add(caja(XR - XL, 0.1, 0.03, M.navy3, (XL + XR) / 2, 0.05, 0.015, 0.01)); }
  { const g = new THREE.Group(); g.position.x = XL; g.rotation.y = Math.PI / 2; SET.add(g); pared(g, -7.4, -ZF + 0.01); }
  { const g = new THREE.Group(); g.position.x = XR; g.rotation.y = -Math.PI / 2; SET.add(g);
    // en el espacio del grupo, x = z del mundo (la pared mira a -x)
    pared(g, ZF - 0.01, -1.95, 0, HW); pared(g, -1.95, -0.25, 0, 0.85); pared(g, -1.95, -0.25, 2.2, HW); pared(g, -0.25, PUERTA.z0, 0, HW); pared(g, PUERTA.z0, PUERTA.z1, 2.25, HW); pared(g, PUERTA.z1, 7.4, 0, HW); }
  const techo = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0.7, HW, 2.6); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
  // los tubos de luz del techo (paneles crema emisivos)
  for (const [x, z] of [[-0.5, -0.4], [2.4, -0.6], [-0.5, 1.6]]) SET.add(mesh(rbox(1.3, 0.04, 0.32, 0.02), new THREE.MeshBasicMaterial({ color: 0xfbfaf2 }), x, HW - 0.03, z));
  // ---- la mesa de consulta de acero: tapa con borde redondeado y la goma crema, columna y base ----
  const m = new THREE.Group(); m.position.set(MESA.x, 0, MESA.z); SET.add(m);
  m.add(caja(1.05, 0.05, 0.6, M.acero, 0, MESA.alto - 0.025, 0, 0.02));
  m.add(caja(0.95, 0.012, 0.5, M.goma, 0, MESA.alto + 0.003, 0, 0.005));
  m.add(mesh(new THREE.CylinderGeometry(0.06, 0.07, MESA.alto - 0.08, 18), M.acero, 0, (MESA.alto - 0.05) / 2, 0));
  m.add(mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.05, 28), M.acero, 0, 0.025, 0));
  // ---- el carrito auxiliar de acero (el fichero en la parte 1, la tablet en la parte 2) ----
  const c = new THREE.Group(); c.position.set(CARRO.x, 0, CARRO.z); SET.add(c);
  c.add(caja(0.56, 0.035, 0.44, M.acero, 0, CARRO.alto - 0.018, 0, 0.012)); c.add(caja(0.56, 0.03, 0.44, M.acero, 0, 0.3, 0, 0.012));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { c.add(mesh(new THREE.CylinderGeometry(0.014, 0.014, CARRO.alto - 0.06, 8), M.acero, sx * 0.25, (CARRO.alto - 0.04) / 2 + 0.04, sz * 0.19)); c.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), M.navy3, sx * 0.25, 0.035, sz * 0.19)); }
  // ---- la mesada contra la pared izquierda: frente navy3, tapa crema, la pileta de acero y la canilla ----
  const L = MESADA.z1 - MESADA.z0, md = new THREE.Group(); md.position.set(MESADA.x, 0, (MESADA.z0 + MESADA.z1) / 2); SET.add(md);
  md.add(caja(0.62, 0.05, L, M.cr, 0, MESADA.alto - 0.025, 0, 0.012)); md.add(caja(0.58, MESADA.alto - 0.05, L - 0.04, M.navy3, 0, (MESADA.alto - 0.05) / 2, 0, 0.012));
  for (let i = 0; i < 3; i++) md.add(caja(0.03, 0.025, 0.2, M.g, 0.3, MESADA.alto - 0.16, -L / 2 + 0.4 + i * 0.75, 0.008));
  const zp = PILETA.z - (MESADA.z0 + MESADA.z1) / 2;
  md.add(caja(0.42, 0.012, 0.5, M.acero, 0.02, MESADA.alto + 0.001, zp, 0.006));
  md.add(caja(0.34, 0.006, 0.42, mat(0x8f969f, 0.4, { metalness: 0.5 }), 0.02, MESADA.alto + 0.008, zp, 0.003));
  const ca = new THREE.Group(); ca.position.set(-0.22, MESADA.alto, zp); md.add(ca);
  ca.add(mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.3, 12), M.acero, 0, 0.15, 0)); const pico = mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.2, 12), M.acero, 0.1, 0.29, 0); pico.rotation.z = Math.PI / 2 - 0.25; ca.add(pico);
  // el rollo de toallas de papel, el frasco de premios (galletitas hueso crema, tapa verde) y el dispensador
  md.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.22, 16).rotateX(Math.PI / 2), M.blanco, -0.18, MESADA.alto + 0.33, zp + 0.4));
  const fr = new THREE.Group(); fr.position.set(0.05, MESADA.alto, 0.75); md.add(fr);
  fr.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.2, 20), new THREE.MeshStandardMaterial({ color: 0xdfeaea, roughness: 0.15, transparent: true, opacity: 0.45 }), 0, 0.1, 0));
  fr.add(mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 20), M.g, 0, 0.22, 0));
  for (let i = 0; i < 7; i++) { const h = caja(0.07, 0.022, 0.025, M.cr, Math.cos(i * 2.1) * 0.03, 0.03 + i * 0.022, Math.sin(i * 2.1) * 0.03, 0.01); h.rotation.y = i * 0.9; fr.add(h); }
  // ---- el mostrador de recepción (frente navy3, tapa crema con canto verde) ----
  const mo = new THREE.Group(); mo.position.set(MOS.x, 0, MOS.z); SET.add(mo);
  mo.add(caja(MOS.w + 0.08, 0.05, MOS.d + 0.08, M.cr, 0, MOS.alto - 0.025, 0, 0.012));
  mo.add(caja(MOS.w, MOS.alto - 0.05, MOS.d, M.navy3, 0, (MOS.alto - 0.05) / 2, 0, 0.012));
  mo.add(caja(MOS.w - 0.1, 0.05, 0.02, M.g, 0, MOS.alto - 0.2, MOS.d / 2 + 0.005, 0.01));
  // el estante de atrás con bolsas de ración lisas (kraft con un hueso navy dibujado)
  const st = new THREE.Group(); st.position.set(MOS.x, 0, ZF + 0.18); SET.add(st);
  for (const y of [1.15, 1.6]) st.add(caja(1.6, 0.03, 0.32, M.cr, 0, y, 0, 0.008));
  for (let i = 0; i < 5; i++) for (const y of [1.165, 1.615]) { const b = caja(0.2, 0.3, 0.12, M.kraft, -0.6 + i * 0.3, y + 0.15, 0, 0.03); st.add(b); st.add(caja(0.1, 0.035, 0.005, M.navy, -0.6 + i * 0.3, y + 0.18, 0.062, 0.012)); }
  // el cartel "VETERINARIA INÉS" (placa crema con una huellita navy; se lee de frente) arriba del mostrador
  const cartelT = lienzo(1400, 300, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "VETERINARIA INÉS", 800, 150, w - 330); x.fillText("VETERINARIA INÉS", 290, h / 2 + 10);
    const hx = 150, hy = h / 2 + 10; x.beginPath(); x.ellipse(hx, hy + 30, 52, 42, 0, 0, 7); x.fill(); for (const [dx, dy] of [[-56, -36], [-20, -66], [20, -66], [56, -36]]) { x.beginPath(); x.ellipse(hx + dx, hy + dy, 20, 25, 0, 0, 7); x.fill(); } x.fillStyle = "#5ce611"; x.fillRect(40, h - 30, w - 80, 12); });
  SET.add(caja(1.62, 0.37, 0.04, M.navy3, MOS.x, 2.25, ZF + 0.02, 0.01)); SET.add(plano(1.56, 0.334, cartelT, MOS.x, 2.25, ZF + 0.045));
  // el póster de la silueta de un perro (líneas navy sobre crema, sin texto) en el azulejo, detrás de la mesa
  const posterT = lienzo(400, 520, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 14; x.lineJoin = "round"; x.lineCap = "round"; x.strokeRect(24, 24, w - 48, h - 48);
    x.beginPath(); x.moveTo(90, 330); x.quadraticCurveTo(100, 250, 170, 245); x.lineTo(265, 245); x.quadraticCurveTo(300, 200, 285, 160); x.lineTo(300, 130); x.lineTo(325, 175); x.quadraticCurveTo(345, 215, 320, 260); x.lineTo(320, 400); x.moveTo(110, 300); x.lineTo(110, 400); x.moveTo(170, 330); x.lineTo(170, 400); x.moveTo(270, 330); x.lineTo(270, 400); x.moveTo(90, 300); x.quadraticCurveTo(60, 260, 70, 220); x.stroke();
    x.fillStyle = "#5ce611"; x.fillRect(60, 440, w - 120, 22); });
  SET.add(plano(0.5, 0.65, posterT, MESA.x + 1.0, 1.25, ZF + 0.012));
  // la balanza de piso (plataforma gris con la pantallita) y el estante alto (parte 2: el fichero jubilado con una planta)
  { const b = new THREE.Group(); b.position.set(0.75, 0, ZF + 0.5); SET.add(b); b.add(caja(0.6, 0.06, 0.45, M.acero, 0, 0.03, 0, 0.015)); b.add(caja(0.56, 0.008, 0.41, mat(0x3a3f4a, 0.9), 0, 0.064, 0, 0.003)); b.add(caja(0.16, 0.08, 0.05, M.navy3, 0, 0.1, -0.2, 0.01)); b.add(caja(0.11, 0.04, 0.005, mat(0xcfeebc, 0.4), 0, 0.105, -0.17, 0.003)); }
  // ---- la sala de espera: el banco crema contra la pared derecha ----
  const bn = new THREE.Group(); bn.position.set(BANCO.x, 0, (BANCO.z0 + BANCO.z1) / 2); SET.add(bn);
  const LB = BANCO.z1 - BANCO.z0; bn.add(caja(0.42, 0.06, LB, M.cr, 0, 0.45, 0, 0.02)); for (const z of [-LB / 2 + 0.1, LB / 2 - 0.1]) bn.add(caja(0.36, 0.42, 0.05, M.navy3, 0, 0.21, z, 0.01));
  // la puerta (marco navy y vidrio) y el marco de la vidriera
  for (const z of [PUERTA.z0, PUERTA.z1]) SET.add(caja(0.12, 2.25, 0.08, M.navy3, XR - 0.04, 1.125, z, 0.01));
  SET.add(caja(0.12, 0.1, PUERTA.z1 - PUERTA.z0 + 0.08, M.navy3, XR - 0.04, 2.25, (PUERTA.z0 + PUERTA.z1) / 2, 0.01));
  for (const y of [0.85, 2.2]) SET.add(caja(0.12, 0.08, 1.78, M.navy3, XR - 0.04, y, -1.1, 0.01));
  for (const z of [-1.95, -0.25]) SET.add(caja(0.12, 1.43, 0.08, M.navy3, XR - 0.04, 1.525, z, 0.01));
}
// la vidriera (de día clara, de noche navy) y la hoja de la puerta (gira al abrir)
const VID = mesh(new THREE.PlaneGeometry(1.7, 1.35), new THREE.MeshBasicMaterial({ color: 0xe3e9ec }), XR + 0.02, 1.525, -1.1); VID.rotation.y = -Math.PI / 2; VID.castShadow = false; scene.add(VID);
const AFUERA = mesh(new THREE.PlaneGeometry(1.2, 2.3), VID.material, XR + 0.4, 1.15, (PUERTA.z0 + PUERTA.z1) / 2); AFUERA.rotation.y = -Math.PI / 2; AFUERA.castShadow = false; scene.add(AFUERA);
const HOJA = new THREE.Group(); HOJA.position.set(XR - 0.02, 0, PUERTA.z0 + 0.04); scene.add(HOJA);
{ HOJA.add(caja(0.05, 2.18, 0.94, M.navy3, 0, 1.09, 0.47, 0.01)); HOJA.add(caja(0.055, 1.9, 0.78, mat(0xb9cde0, 0.15, { transparent: true, opacity: 0.55 }), 0, 1.15, 0.47, 0.005)); HOJA.add(caja(0.08, 0.04, 0.18, M.g, -0.05, 1.05, 0.82, 0.01)); }
fusionar(SET);
// (r3) el cartel (su malla con la textura) para esconderlo en los planos donde quedaría cortado en el borde
const CARTEL = SET.children.find((o) => o.isMesh && o.material && o.material.map && o.material.map.image && o.material.map.image.width === 1400 && o.material.map.image.height === 300);
if (!CARTEL) console.error("no encontré el cartel");
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// texto partido en renglones que entran en `ancho`
function renglones(x, txt, ancho) { const ws = txt.split(" "), out = []; let l = ""; for (const w of ws) { const p = l ? l + " " + w : w; if (x.measureText(p).width > ancho && l) { out.push(l); l = w; } else l = p; } if (l) out.push(l); return out; }
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
// LOS PERSONAJES Y LOS PERROS
// =====================================================================================================
const ines = crearPersonaje({ ...ELENCO.ines, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.4), r2(T.p5 + 0.6), r2(T.q1 + 1.4)] });
const vero = crearPersonaje({ ...ELENCO.vero, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.i1 + 0.4), r2(T.p5 + 0.3)] });
const bruno = crearPersonaje({ ...ELENCO.bruno, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.i2 + 0.3), r2(T.q3b + 0.5)] });
// la sala de espera de la parte 2 (sin voz): el dueño de Coco (canoso) y la dueña de Mora (coleta castaña)
const donCoco = crearPersonaje({ ...DEFECTO, nombre: "Coco", piel: PIEL.clara, pelo: PELO.canoso, peinado: "corto", cejasColor: 0xb9b6b0, camisa: MARCA.navy2, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, pantalon: 0x3a3f4a, nariz: 0.062, alto: 1.0, parpadeoCada: 999 });
const donaMora = crearPersonaje({ ...DEFECTO, nombre: "Mora", piel: PIEL.trigueña, pelo: PELO.castaño, peinado: "coleta", cejasColor: 0x4a3222, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xa8484f, camisa: MARCA.cr, mangas: "largas", cuello: MARCA.navy, cuelloBotones: false, cuelloFino: true, pantalon: MARCA.navy2, nariz: 0.048, alto: 0.96, parpadeoCada: 999 });
const TODOS = [ines, vero, bruno, donCoco, donaMora];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// Inés: el estetoscopio navy al cuello (tubo en U por detrás del cuello, la campana gris en el pecho) y la lapicera
{
  const em = mat(C.navy, 0.45);
  const pts = [V3(-0.05, 0.31, 0.19), V3(-0.1, 0.44, 0.14), V3(-0.1, 0.53, 0.0), V3(0, 0.55, -0.1), V3(0.1, 0.53, 0.0), V3(0.1, 0.44, 0.14), V3(0.07, 0.36, 0.19)];
  ines.cuerpo.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.011, 8), em));
  const campana = mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.016, 20), M.metal, -0.05, 0.3, 0.2); campana.rotation.x = Math.PI / 2 - 0.25; ines.cuerpo.add(campana);
  ines.cuerpo.add(mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.12, 8), M.navy, 0.12, 0.33, 0.19));
  ines.cuerpo.add(caja(0.012, 0.03, 0.01, M.g, 0.12, 0.395, 0.195, 0.004));
}
// Toto (el protagonista), Coco y Mora (la sala de espera de la parte 2)
const toto = crearPerro({ ...PERROS.toto, escala: 0.9 }); scene.add(toto.raiz);
const coco = crearPerro(PERROS.coco); scene.add(coco.raiz);
const mora = crearPerro(PERROS.mora); scene.add(mora.raiz);
for (const d of [toto, coco, mora]) d.raiz.traverse((o) => { if (o.isMesh) o.receiveShadow = false; });
// Luna en su transportadora crema con la rejilla navy (solo se ven los ojos y las orejas)
const TRANS = new THREE.Group();
{
  TRANS.add(caja(0.34, 0.3, 0.48, M.cr, 0, 0.15, 0, 0.05)); TRANS.add(caja(0.36, 0.035, 0.08, M.navy3, 0, 0.31, 0, 0.015));
  const cara = crearCaraGato(); cara.position.set(0, 0.15, 0.17); cara.scale.setScalar(0.95); TRANS.add(cara);
  TRANS.add(caja(0.28, 0.24, 0.02, mat(0x1a2236, 0.6), 0, 0.15, 0.235, 0.01));
  for (let i = 0; i < 5; i++) TRANS.add(caja(0.016, 0.24, 0.016, M.navy, -0.12 + i * 0.06, 0.15, 0.25, 0.004));
  for (const y of [0.06, 0.24]) TRANS.add(caja(0.28, 0.016, 0.016, M.navy, 0, y, 0.25, 0.004));
  TRANS.children[2].visible = false;   // el fondo oscuro detrás de la rejilla solo se ve por los costados de la cara
  sombras(TRANS); TRANS.position.set(BANCO.x - 0.02, 0.48, -1.68); TRANS.rotation.y = -Math.PI / 2; scene.add(TRANS);
}
// la ficha de cartón en la mano de Inés (P1) · el teléfono inalámbrico de la clínica (P2c) · la bolsa de ración (P4)
// · la tablet en la mano de Inés y la de Bruno (Q3b) · la correa de Toto (verde oscuro)
const fichaManoT = lienzo(600, 420, () => {});
const FICHA_MANO = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.105), new THREE.MeshStandardMaterial({ map: fichaManoT, roughness: 0.8, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: fichaManoT, emissiveIntensity: 0.15 })); FICHA_MANO.castShadow = true; scene.add(FICHA_MANO);
const TEL = new THREE.Group();
{ TEL.add(caja(0.05, 0.17, 0.028, M.navy3, 0, 0, 0, 0.012)); TEL.add(caja(0.036, 0.05, 0.004, mat(0x9fb2c8, 0.3), 0, 0.04, 0.015, 0.003)); TEL.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.06, 8), M.navy, 0.014, 0.11, -0.004)); for (let i = 0; i < 6; i++) TEL.add(caja(0.01, 0.007, 0.003, M.cr, -0.011 + (i % 2) * 0.022 - 0.0, -0.01 - Math.floor(i / 2) * 0.017, 0.015, 0.002)); scene.add(sombras(TEL)); }
// la base del teléfono en el mostrador
{ const b = new THREE.Group(); b.position.set(MOS.x + 0.6, MOS.alto, MOS.z - 0.08); b.add(caja(0.12, 0.04, 0.14, M.navy3, 0, 0.02, 0, 0.015)); scene.add(sombras(b)); }
const racionT = lienzo(256, 380, (x, w, h) => { x.fillStyle = "#c9a774"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "RACIÓN", 900, 62, w - 30); x.fillText("RACIÓN", w / 2, 250);
  x.save(); x.translate(w / 2, 140); x.fillRect(-60, -12, 120, 24); for (const [dx, dy] of [[-60, -14], [-60, 14], [60, -14], [60, 14]]) { x.beginPath(); x.arc(dx, dy, 18, 0, 7); x.fill(); } x.restore(); });
const BOLSA = new THREE.Group();
{ const cuerpo = new THREE.Mesh(rbox(0.24, 0.34, 0.11, 0.03, 2), [M.kraft, M.kraft, M.kraft, M.kraft, new THREE.MeshStandardMaterial({ map: racionT, roughness: 0.85 }), M.kraft]); cuerpo.position.y = 0.17; BOLSA.add(cuerpo); BOLSA.add(caja(0.24, 0.03, 0.06, mat(0xb3925f, 0.85), 0, 0.355, 0, 0.01)); scene.add(sombras(BOLSA)); }
const pantTI = lienzo(1040, 760, () => {}), pantTB = lienzo(1040, 760, () => {});
const tabIn = new THREE.Group(), tabBr = new THREE.Group();
for (const [g, tx] of [[tabIn, null], [tabBr, null]]) { g.add(caja(0.18, 0.21, 0.012, M.navy, 0, 0, 0, 0.012)); const p = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.19), new THREE.MeshBasicMaterial({ toneMapped: false })); p.position.z = 0.0065; g.add(p); g.userData.pan = p; scene.add(sombras(g)); }
const CORREA = [0, 1].map(() => { const m = mesh(new THREE.CylinderGeometry(1, 1, 1, 8).translate(0, 0.5, 0), mat(0x2f6b1f, 0.6)); m.castShadow = false; scene.add(m); return m; });
const _up = V3(0, 1, 0);
function entre(m, a, b, r) { const d = b.clone().sub(a); const L = Math.max(1e-4, d.length()); m.position.copy(a); m.quaternion.setFromUnitVectors(_up, d.normalize()); m.scale.set(r, L, r); }
function ponerCorrea(a, b, on) {
  for (const m of CORREA) m.visible = on; if (!on) return;
  const mid = a.clone().lerp(b, 0.5); mid.y -= Math.min(0.25, a.distanceTo(b) * 0.25);
  entre(CORREA[0], a, mid, 0.009); entre(CORREA[1], mid, b, 0.009);
}

// ---- avatares: la cara renderizada chica en un círculo (burbujas, la ficha, el chat) ----
const AVATAR = {};
{
  const rt = new THREE.WebGLRenderTarget(256, 256); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene();
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(1, 2, 3); esc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const leer = (raiz, cabeza, fondo, dist = 1.6, alto = 0.25, poner = null) => {
    esc.background = new THREE.Color(fondo);
    const padre = raiz.parent; esc.add(raiz); const pos = raiz.position.clone(), rot = raiz.rotation.clone(); raiz.position.set(0, 0, 0); raiz.rotation.set(0, 0, 0);
    if (poner) poner(); raiz.updateMatrixWorld(true);
    const c = cabeza.localToWorld(V3(0, alto, 0));
    cam.position.set(c.x + 0.12 * dist / 1.6, c.y + 0.04, c.z + dist); cam.lookAt(c.x, c.y - 0.03, c.z);
    renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
    const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    const id = x.createImageData(256, 256);
    for (let y = 0; y < 256; y++) id.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
    x.putImageData(id, 0, 0);
    raiz.position.copy(pos); raiz.rotation.copy(rot); if (padre) padre.add(raiz); else esc.remove(raiz);
    return cv;
  };
  const per = (cfg, fondo) => { const p = crearPersonaje({ ...cfg, parpadeoCada: 999 }); return leer(p.raiz, p.cabeza, fondo, 1.6, 0.25, () => p.poner({ ...CARA.sonrisa, ...BRAZOS.costado, t: 0 })); };
  AVATAR.bruno = per(ELENCO.bruno, 0xcfeebc);
  AVATAR.ines = per(ELENCO.ines, 0x5ce611);
  AVATAR.vero = per(ELENCO.vero, 0xd9d7c9);
  const pt = crearPerro({ ...PERROS.toto }); AVATAR.toto = leer(pt.raiz, pt.cabeza, 0xcfeebc, 1.05, 0.0, () => pt.poner({ sentado: 1, orejas: 0.8, cola: 0, t: 0.3 }));
  rt.dispose();
}

// =====================================================================================================
// LA FICHA DE TOTO Y EL FICHERO DE CARTÓN
// =====================================================================================================
// la ficha de cartón (A6): encabezado navy "FICHA", la foto de Toto pegada, a mano en Caveat: "TOTO · Vero", "Vacuna: hoy ✓"
// y "Próxima: JUNIO" grande (se escribe en P1: k = 0..1 cuánto de esa línea se ve)
function dibujarFicha(x, W, H, k = 1, nombre = "TOTO", dueno = "Vero", foto = AVATAR.toto) {
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H);
  const s = W / 600;
  x.save(); x.scale(s, s);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, 600, 74); x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.textAlign = "left"; x.font = F(900, 44); x.fillText("FICHA", 24, 40);
  x.textAlign = "right"; x.font = F(700, 30); x.fillText("Veterinaria Inés", 576, 40);
  x.strokeStyle = "#cfd8e3"; x.lineWidth = 3; for (let y = 160; y < 420; y += 64) { x.beginPath(); x.moveTo(200, y); x.lineTo(580, y); x.stroke(); }
  if (foto) { x.fillStyle = "#ffffff"; x.fillRect(22, 92, 158, 172); x.drawImage(foto, 30, 100, 142, 142); x.strokeStyle = "#b4b2a3"; x.lineWidth = 3; x.strokeRect(22, 92, 158, 172); }
  else { x.fillStyle = "#d9d7c9"; x.fillRect(22, 92, 158, 172); }
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "alphabetic";
  x.font = CAV(66); x.fillText(`${nombre} · ${dueno}`, 200, 150);
  x.font = CAV(54); x.fillText("Vacuna: hoy ✓", 200, 218);
  if (k > 0) {
    x.save(); x.beginPath(); x.rect(0, 250, 30 + 570 * k, 170); x.clip();
    x.fillStyle = "#0b1220"; x.font = CAV(92); x.fillText("Próxima: JUNIO", 26, 372);
    x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.moveTo(30, 392); x.quadraticCurveTo(300, 404, 560, 386); x.stroke();
    x.restore();
  }
  x.restore();
}
// las fichas genéricas (otros pacientes) y las seis con nombre que entran en P2
const NOMBRES = ["LUNA", "COCO", "NEGRO", "MORA", "SIMÓN", "PANCHO"];
function dibujarFichaOtra(x, W, H, nombre) {
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 74); x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.textAlign = "left"; x.font = F(900, 44); x.fillText("FICHA", 24, 40);
  x.strokeStyle = "#cfd8e3"; x.lineWidth = 3; for (let y = 160; y < 420; y += 64) { x.beginPath(); x.moveTo(30, y); x.lineTo(570, y); x.stroke(); }
  if (nombre) { x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "alphabetic"; x.font = CAV(150); x.fillText(nombre, 300, 290); }
}
const FICHA_T = lienzo(600, 420, (x, w, h) => dibujarFicha(x, w, h, 1));
const OTRA_T = lienzo(300, 210, (x, w, h) => { x.scale(0.5, 0.5); dibujarFichaOtra(x, 600, 420, null); });
const NOM_T = NOMBRES.map((n) => lienzo(600, 420, (x, w, h) => dibujarFichaOtra(x, w, h, n)));
let claveFM = -1;
function dibujarFichaMano(k) { k = Math.round(k * 12) / 12; if (k === claveFM) return; claveFM = k; dibujarFicha(fichaManoT.userData.x, 600, 420, k); fichaManoT.needsUpdate = true; }
// la pestaña de Toto: más alta, con "TOTO" (navy y después roja)
const pestT = (fondo) => lienzo(256, 96, (x, w, h) => { x.fillStyle = fondo; x.fillRect(0, 0, w, h); x.fillStyle = "#ffffff"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "TOTO", 900, 70, w - 20); x.fillText("TOTO", w / 2, h / 2 + 4); });
const PEST_TOTO = { navy: new THREE.MeshStandardMaterial({ map: pestT("#16243d"), roughness: 0.7 }), roja: new THREE.MeshStandardMaterial({ map: pestT("#c7655b"), roughness: 0.7 }) };
// el fichero: caja kraft larga (el largo a lo largo de z), sin tapa, con una cinta vieja en un costado
const FIC = { L: 0.44, W: 0.17, H: 0.085, SP: 0.0062, N0: 28, NN: 36 };
const FICHERO = new THREE.Group(); scene.add(FICHERO);
{
  const { L, W, H } = FIC, e = 0.008;
  FICHERO.add(caja(W + 2 * e, e, L + 2 * e, M.kraft, 0, e / 2, 0, 0.003));
  for (const s of [-1, 1]) { FICHERO.add(caja(e, H, L + 2 * e, M.kraft, s * (W / 2 + e / 2), H / 2, 0, 0.003)); FICHERO.add(caja(W + 2 * e, H, e, M.kraft, 0, H / 2, s * (L / 2 + e / 2), 0.003)); }
  FICHERO.add(caja(e + 0.002, 0.035, 0.24, mat(0xd8c9a0, 0.5), W / 2 + e, H * 0.6, 0.02, 0.002));   // la cinta de embalar vieja
  sombras(FICHERO);
}
// las fichas: cada una un plano parado (mira a +z) con su pestaña arriba; slot 0 = la de adelante
const FICHAS = [];
const fichaGeo = new THREE.PlaneGeometry(0.15, 0.105);
const pestGeo = rbox(0.036, 0.024, 0.004, 0.004, 2);
const PEST = { navy: mat(C.navy3, 0.6), roja: mat(C.red, 0.6) };
const ORDEN_ROJA = [];   // en qué orden se ponen rojas (las viejas primero)
function crearFicha(tex, i) {
  const g = new THREE.Group();
  const m = new THREE.Mesh(fichaGeo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, side: THREE.DoubleSide })); m.position.y = 0.0525; m.castShadow = true; m.receiveShadow = true; g.add(m);
  const p = new THREE.Mesh(pestGeo, PEST.navy); p.position.set([-0.052, -0.018, 0.018, 0.052][i % 4], 0.105 + 0.011, 0); g.add(p);
  g.userData = { m, p };
  FICHERO.add(g); return g;
}
for (let j = 0; j < FIC.N0; j++) FICHAS.push({ tipo: "vieja", j, g: crearFicha(OTRA_T, j * 3 + 1) });
const FT = { tipo: "toto", g: crearFicha(FICHA_T, 0) };
FT.g.userData.p.geometry = rbox(0.075, 0.05, 0.005, 0.006, 2); FT.g.userData.p.material = PEST_TOTO.navy; FT.g.userData.p.position.set(0.0, 0.105 + 0.03, 0.0);   // (r1) más alta: asoma sobre las demás
FICHAS.push(FT);
const NUEVAS = [];
const NOMBRADAS = [0, 4, 12, 16, 24, 28];   // dos por mes, en los plac de T.fichas
for (let m = 0; m < FIC.NN; m++) { const k = NOMBRADAS.indexOf(m); const f = { tipo: "nueva", m, g: crearFicha(k >= 0 ? NOM_T[k] : OTRA_T, m * 5 + 2) }; NUEVAS.push(f); FICHAS.push(f); }
// cuándo entra cada ficha nueva: de a 12 por mes; las 6 con nombre en los plac de T.fichas
const ENTRA = [];
for (let mes = 0; mes < 3; mes++) for (let q = 0; q < 12; q++) ENTRA[mes * 12 + q] = r2(T.mes[mes] + 0.04 + (0.5 * q) / 12);
NOMBRADAS.forEach((m, k) => (ENTRA[m] = T.fichas[k]));
// las vencidas: 4 (P1) → 12 (ABRIL) → 31 (MAYO) → 63 (JUNIO). Toto se pone roja en JUNIO.
const VENC = [[0, 12], [T.mes[0], 25], [T.mes[1], 41], [T.mes[2], 63]];   // (r3) la cifra cambia con el mes (no 0,2 s después)
const vencidasEn = (t) => { let v = 12; for (const [a, n] of VENC) if (t >= a) v = n; if (t >= P2) v = 0; return v; };
const ROJAS = (() => { let s0 = 11; const v = FICHAS.filter((f) => f.tipo === "vieja"); for (let i = v.length - 1; i > 0; i--) { s0 = (s0 * 16807) % 2147483647; const j = s0 % (i + 1); [v[i], v[j]] = [v[j], v[i]]; } return [...v, ...[...NUEVAS].sort((a, b) => ENTRA[a.m] - ENTRA[b.m])]; })();
// dónde va cada ficha en t: slot continuo (0 adelante); la que entra cae desde arriba
const zSlot = (k) => FIC.L / 2 - 0.012 - k * FIC.SP;
function ponerFichero(t) {
  const enCaja = t >= T.guarda - 0.05;
  // n continuo: cada entrada empuja durante 0,08 s
  let n = 0; for (const e of ENTRA) n += sg(t, e - 0.04, e + 0.06);
  const v = vencidasEn(t);
  FICHAS.forEach((f) => {
    let slot, vis = true, cae = 0;
    if (f.tipo === "vieja") slot = n + f.j + sg(t, T.guarda - 0.1, T.guarda);
    else if (f.tipo === "toto") { slot = n; vis = enCaja; cae = 1 - sg(t, T.guarda - 0.05, T.guarda); }
    else { const e = ENTRA[f.m]; vis = t >= e - 0.14; slot = ENTRA.reduce((a, x) => a + (x > e ? sg(t, x - 0.04, x + 0.06) : 0), 0); cae = 1 - sg(t, e - 0.14, e - 0.02); }
    const g = f.g; g.visible = vis; if (!vis) return;
    g.position.set(0, FIC.H * 0.08 + cae * 0.2, zSlot(slot) + cae * 0.04);
    g.rotation.set(-0.1 - cae * 0.4, 0, cae * 0.15 * (f.m % 2 ? 1 : -1));
    // pestaña roja
    const totoRoja = t >= T.mes[2] && t < P2, ir = ROJAS.indexOf(f);
    const roja = f.tipo === "toto" ? totoRoja : ir >= 0 && ir < v - (totoRoja ? 1 : 0);
    if (f.tipo === "toto") g.userData.p.material = roja ? PEST_TOTO.roja : PEST_TOTO.navy;
    else g.userData.p.material = roja ? PEST.roja : PEST.navy;
  });
}

// =====================================================================================================
// LA INTERFAZ DE LA PARTE 2: la ficha en la tablet, el recordatorio en el celular de Vero, el panel
// =====================================================================================================
const chipTx = (x, txt, cx, cy, px, fondo, tinta, borde = null) => { x.font = F(900, px); const w = x.measureText(txt).width + px * 0.9; x.fillStyle = fondo; rr(x, cx - w / 2, cy - px * 0.72, w, px * 1.44, px * 0.72); if (borde) { x.strokeStyle = borde; x.lineWidth = 6; x.beginPath(); x.roundRect(cx - w / 2, cy - px * 0.72, w, px * 1.44, px * 0.72); x.stroke(); } x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(txt, cx, cy + 2); };
// la ficha de Toto en la tablet: e = 0 (Guardar), 1 (apretado), 2 (Guardado ✓)
function dibujarFichaTab(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, W, 10);
  x.fillStyle = "#efeee5"; ajustar(x, "Pacientes · Toto", 800, 62, W - 60); x.fillText("Pacientes · Toto", 34, 68);
  avatar(x, AVATAR.toto, 150, 290, 112);
  x.fillStyle = "#0b1220"; x.font = F(900, 82); x.fillText("Toto", 300, 246); x.fillStyle = "#16243d"; ajustar(x, "Mestizo · 6 años · Vero", 700, 44, W - 330); x.fillText("Mestizo · 6 años · Vero", 302, 330);
  const fila = (y, a, b, ok = true, color = "#0b1220") => { x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 60, 104, 22); x.fill(); x.stroke(); x.fillStyle = "#16243d"; x.textAlign = "left"; x.font = F(700, 46); x.fillText(a, 60, y + 54); x.fillStyle = color; x.textAlign = "right"; x.font = F(900, 50); x.fillText(b, W - (ok ? 120 : 60), y + 54); if (ok) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 78, y + 52, 28, 0, 7); x.fill(); tilde(x, W - 77, y + 53, 28, "#0b1220"); } };
  fila(440, "Vacuna", "hoy"); fila(560, "Próxima", "junio", false); fila(680, "Desparasitación", "al día");
  x.fillStyle = "#cfeebc"; x.strokeStyle = "#3fa60a"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 806, W - 60, 120, 24); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, "Aviso por WhatsApp: activado", 800, 48, W - 200); x.fillText("Aviso por WhatsApp: activado", 60, 868); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(W - 78, 866, 30, 0, 7); x.fill(); tilde(x, W - 77, 867, 30, "#0b1220");
  if (e < 2) { x.fillStyle = e === 1 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(30, 960, W - 60, 170, 85); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 86); x.fillText("Guardar", W / 2, 1048); }
  else { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 960, W - 60, 170, 40); x.fill(); x.fillStyle = "#5ce611"; x.textAlign = "center"; x.font = F(900, 82); x.fillText("Guardado ✓", W / 2, 1048); }
}
// el panel de vacunas: e = { tildes (0..5), turnos, gira (0..1: el 63 rojo que gira y queda 15), plata, aviso, cero }
const LISTA = [["Luna", "mar 9:45"], ["Coco", "mar 10:15"], ["Mora", "mar 10:30"], ["Simón", "mié 17:30"], ["Toto", "mar 10:00"]];
function dibujarPanel(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Vacunas de junio", 800, 62, W - 60); x.fillText("Vacunas de junio", 34, 68);
  // recordatorios enviados
  x.fillStyle = "#16243d"; rr(x, 30, 168, W - 60, 110, 26); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 50); x.fillText("Recordatorios enviados", 64, 224);
  x.fillStyle = "#5ce611"; x.textAlign = "right"; x.font = F(900, 66); x.fillText("63 ✓", W - 64, 226);
  // la lista con tildes
  LISTA.forEach(([n, h], i) => {
    const y = 302 + i * 84, ok = i < e.tildes;
    x.fillStyle = ok ? "#cfeebc" : "#ffffff"; x.strokeStyle = ok ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 60, 72, 18); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 52); x.fillText(n, 70, y + 38);
    if (ok) { x.fillStyle = "#16243d"; x.textAlign = "right"; x.font = F(800, 48); x.fillText(h, W - 120, y + 38); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(W - 74, y + 36, 24, 0, 7); x.fill(); tilde(x, W - 73, y + 37, 24, "#0b1220"); }
  });
  // los tres números
  const caja3 = (X, Y, w, h, titulo, valor, fondo, tinta, px = 84) => { x.fillStyle = fondo; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(X, Y, w, h, 26); x.fill(); x.stroke(); x.fillStyle = tinta; x.textAlign = "center"; ajustar(x, titulo, 800, 48, w - 30); x.fillText(titulo, X + w / 2, Y + 46); x.font = F(900, px); x.fillText(valor, X + w / 2, Y + 126); };
  const y3 = 736, w3 = (W - 80) / 2;
  caja3(30, y3, w3, 180, "Turnos reservados", String(e.turnos) + (e.cero ? " ✓" : ""), "#5ce611", "#0b1220");
  // vencidas: el 63 rojo gira (de canto) y del otro lado queda el 15
  x.fillStyle = "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(50 + w3, y3, w3, 180, 26); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "center"; ajustar(x, "Pendientes", 800, 48, w3 - 30); x.fillText("Pendientes", 50 + w3 + w3 / 2, y3 + 46);
  // (r3) baja a la par que suben los turnos: 63 → 15 (rojo mientras baja, navy al llegar)
  { const v = 63 - e.turnos; x.fillStyle = v > 15 ? "#c7655b" : "#0b1220"; x.font = F(900, 84); x.fillText(String(v), 50 + w3 + w3 / 2, y3 + 126); }
  if (e.aviso && !e.cero) { x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y3 + 194, W - 60, 74, 37); x.fill(); x.stroke(); x.fillStyle = "#16243d"; x.textAlign = "center"; ajustar(x, "A los 15: segundo aviso mañana", 800, 46, W - 100); x.fillText("A los 15: segundo aviso mañana", W / 2, y3 + 232); }
  // la plata en turnos
  const yP = e.cero ? 940 : 1030;
  x.fillStyle = "#16243d"; rr(x, 30, yP, W - 60, e.cero ? 110 : 150, 30);
  x.fillStyle = "#5ce611"; x.textAlign = "center"; ajustar(x, `${plata(e.plata)} en turnos reservados`, 900, 58, W - 100); x.fillText(`${plata(e.plata)} en turnos reservados`, W / 2, yP + (e.cero ? 56 : 76));
  if (e.cero) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(30, 1066, W - 60, 118, 30); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; ajustar(x, "Llamadas a mano: 0", 900, 76, W - 100); x.fillText("Llamadas a mano: 0", W / 2, 1127); }
}
function estadoPanel(t) {
  const u = sg(t, T.cuenta[0], T.cuenta[1]);
  return { tildes: T.tildes.filter((x) => t >= x).length, turnos: Math.round(48 * eo(u)), gira: sg(t, T.gira, T.gira + 0.3), plata: Math.round(48 * eo(u)) * 1500, aviso: t >= T.gira + 0.35, cero: t >= T.cero };
}
// el celular de Vero: f = 1 (llegó el recordatorio), 2 (toca Sí), 3 (Turno reservado ✓)
function dibujarCeluVero(x, W, H, f) {
  // (r3) más lleno: la fecha, el mensaje con la tarjeta de Toto adentro y los botones grandes (antes quedaba vacío el 40 % de abajo)
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 180); x.fillStyle = "#5ce611"; x.fillRect(0, 180, W, 10);
  avatar(x, AVATAR.ines, 90, 90, 56); x.fillStyle = "#efeee5"; x.font = F(800, 52); x.fillText("Veterinaria Inés", 168, 70); x.font = F(700, 38); x.fillText("en línea", 170, 128);
  x.fillStyle = "#d9d7c9"; x.font = F(800, 38); const dw = x.measureText("Hoy").width + 60; rr(x, W / 2 - dw / 2, 222, dw, 62, 31); x.fillStyle = "#16243d"; x.textAlign = "center"; x.fillText("Hoy", W / 2, 254); x.textAlign = "left";
  const msg = "Hola, Vero. A Toto le toca la vacuna. ¿Te reservo el martes a las 10:00?";
  x.font = F(800, 58); const ls = renglones(x, msg, W - 130);
  const by = 316, bh = 50 + 180 + 24 + ls.length * 74;
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, by, W - 48, bh, [10, 34, 34, 34]); x.fill(); x.stroke();
  // la tarjeta de Toto adentro del mensaje
  x.fillStyle = "#cfeebc"; x.strokeStyle = "#3fa60a"; x.lineWidth = 5; x.beginPath(); x.roundRect(48, by + 26, W - 96, 180, 26); x.fill(); x.stroke();
  avatar(x, AVATAR.toto, 136, by + 116, 66);
  x.fillStyle = "#0b1220"; x.font = F(900, 62); x.fillText("Toto", 230, by + 84); x.fillStyle = "#16243d"; ajustar(x, "Vacuna anual", 800, 46, W - 300); x.fillText("Vacuna anual", 232, by + 150);
  x.fillStyle = "#0b1220"; x.font = F(800, 58); ls.forEach((l, i) => x.fillText(l, 56, by + 26 + 180 + 24 + 40 + i * 74));
  const yb = by + bh + 36;
  if (f < 3) {
    x.fillStyle = f === 2 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(30, yb, W - 60, 150, 75); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Sí, martes 10:00", 900, 66, W - 120); x.fillText("Sí, martes 10:00", W / 2, yb + 77);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, yb + 176, W - 60, 136, 68); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; ajustar(x, "Elegir otro día", 800, 58, W - 120); x.fillText("Elegir otro día", W / 2, yb + 246);
    if (f === 2) { x.fillStyle = "rgba(11,18,32,0.25)"; x.beginPath(); x.arc(W - 110, yb + 75, 48, 0, 7); x.fill(); }
  } else {
    // la respuesta de Vero (derecha) y la confirmación
    x.fillStyle = "#cfeebc"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(W - 24 - 520, yb, 520, 120, [34, 34, 10, 34]); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(800, 56); x.fillText("Sí, martes 10:00", W - 24 - 260, yb + 62);
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, yb + 150, W - 48, 230, 40); x.fill();
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(116, yb + 265, 62, 0, 7); x.fill(); tilde(x, 118, yb + 267, 64, "#0b1220");
    x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Turno reservado", 900, 66, W - 240); x.fillText("Turno reservado", 200, yb + 226); x.fillStyle = "#5ce611"; x.font = F(800, 58); x.fillText("Martes 10:00", 200, yb + 302);
  }
}
// ---- los insertos pegados a la cámara (el consultorio desenfocado de fondo) ----
function crearFondoInserto(g, living = false) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: living ? 0xe9e6d8 : 0x0b1220 })); bg.position.z = -0.06; g.add(bg);
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1300 / PXK), new THREE.MeshBasicMaterial({ color: living ? 0xd9d7c9 : 0x365f28 })); pc.position.set(0, -560 / PXK, -0.058); g.add(pc);
  const pi = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 420 / PXK), new THREE.MeshBasicMaterial({ color: living ? 0xc9c6b6 : 0xd9d7c9 })); pi.position.set(0, -1000 / PXK, -0.057); g.add(pi);
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: opc.funda ?? 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  return { g, tex, IW, IH };
}
const INSF = { g: new THREE.Group() }; crearFondoInserto(INSF.g);
const TABF = crearCelInserto(1000, 1150, 540, 1090, 18); INSF.g.add(TABF.g);
const INSV = { g: new THREE.Group() }; crearFondoInserto(INSV.g, true);
const CELV = crearCelInserto(860, 1400, 540, 1040, 34, { camara: true, funda: 0x16243d }); INSV.g.add(CELV.g);
const INSP = { g: new THREE.Group() }; crearFondoInserto(INSP.g);
const TABP = crearCelInserto(1000, 1200, 540, 1090, 18); INSP.g.add(TABP.g);
for (const I of [INSF, INSV, INSP]) { pegarACamara(I.g, camera, 10); I.g.visible = false; }
let cFT = "", cCV = "", cTP = "", cT3 = "";
function dibujarInterfaz(t) {
  const eF = t >= T.guardado ? 2 : t >= T.guardar ? 1 : 0;
  if (`${eF}` !== cFT) { cFT = `${eF}`; dibujarFichaTab(TABF.tex.userData.x, TABF.IW, TABF.IH, eF); TABF.tex.needsUpdate = true; }
  const fV = t >= T.reservado ? 3 : t >= T.si ? 2 : 1;
  if (`${fV}` !== cCV) { cCV = `${fV}`; dibujarCeluVero(CELV.tex.userData.x, CELV.IW, CELV.IH, fV); CELV.tex.needsUpdate = true; }
  const eP = estadoPanel(t), kP = JSON.stringify(eP);
  if (kP !== cTP) { cTP = kP; dibujarPanel(TABP.tex.userData.x, TABP.IW, TABP.IH, eP); TABP.tex.needsUpdate = true; }
  // la tablet 3D del carrito: la ficha (Q1) y el panel (Q3 en adelante)
  const k3 = t >= T.q3 ? "P" + kP : "F" + eF;
  if (k3 !== cT3) { cT3 = k3; if (t >= T.q3) dibujarPanel(pantT.userData.x, 1000, 1200, eP); else dibujarFichaTab(pantT.userData.x, 1000, 1200, eF); pantT.needsUpdate = true; }
}
// la tablet en su atril sobre el carrito (parte 2) y el celular parado de la videollamada
const pantT = lienzo(1000, 1200, () => {});
const tablet = crearTablet(pantT, 0.3, 0.36, 0.25); tablet.position.set(CARRO.x + 0.1, CARRO.alto, CARRO.z - 0.04); tablet.rotation.y = 0.05; tablet.scale.setScalar(1.25); scene.add(tablet);
// ---- Sofi en videollamada: una escena aparte que se renderiza a una textura cada cuadro (Q5) ----
const sofi = crearPersonaje({ ...ELENCO.sofi, camisa: 0x2c4268, franja: null, cuello: MARCA.cr, cuelloBotones: false, cuelloFino: true, auricularFino: true, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });   // (r1) sin los aros crema en el torso
// (r1) las copas verdes de los auriculares más grandes y por fuera del pelo: que se vean de frente en la videollamada
for (const sx of [-1, 1]) { const c = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.07, 24).rotateZ(Math.PI / 2), M.g, sx * 0.37, 0.24, 0.02); sofi.cabeza.add(c); const v = mesh(new THREE.TorusGeometry(0.36, 0.02, 8, 32, Math.PI), M.navy, 0, 0.27, 0.0); if (sx > 0) sofi.cabeza.add(v); }
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
const celuS = new THREE.Group(); celuS.position.set(CARRO.x - 0.13, CARRO.alto, CARRO.z + 0.1); celuS.rotation.y = 0.12; scene.add(celuS);
{
  const S = 1.9, W = 0.08 * S, H = 0.165 * S;
  const piv = new THREE.Group(); piv.position.y = 0.035; piv.rotation.x = -0.18; celuS.add(piv);
  piv.add(mesh(rbox(W + 0.008, H + 0.008, 0.014, 0.014), mat(C.navy, 0.4), 0, H / 2, 0));
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: SOFI.rt.texture, toneMapped: false })); pan.position.set(0, H / 2, 0.0076); piv.add(pan);
  celuS.add(caja(0.17, 0.02, 0.13, M.g, 0, 0.01, 0.0, 0.008)); celuS.add(caja(0.14, 0.08, 0.02, M.g, 0, 0.05, -0.06, 0.006));
  sombras(celuS);
}

// =====================================================================================================
// EL LIVING DE VERO (Q2b, set chico aparte en x = 30): pared crema, ventana de mañana, sillón crema con almohadón verde
// =====================================================================================================
const LIV = new THREE.Group(); LIV.position.set(30, 0, 0); scene.add(LIV);
{
  const p = mesh(new THREE.PlaneGeometry(8, 6), mat(0xcfc7b2, 0.85), 0, 0, 0.5); p.rotation.x = -Math.PI / 2; LIV.add(p);
  LIV.add(mesh(new THREE.BoxGeometry(8, 3.2, 0.2), M.pared, 0, 1.6, -1.6));
  LIV.add(caja(1.3, 1.25, 0.08, M.navy3, 0.9, 1.65, -1.48, 0.03)); LIV.add(caja(1.16, 1.11, 0.06, mat(0xcfe3ee, 0.4), 0.9, 1.65, -1.45, 0.02)); LIV.add(caja(0.05, 1.11, 0.07, M.navy3, 0.9, 1.65, -1.44, 0.01));
  // el sillón: base, asiento en dos almohadones, respaldo y brazos crema; el almohadón verde
  const s = new THREE.Group(); s.position.set(0, 0, -0.95); LIV.add(s);
  s.add(caja(1.9, 0.3, 0.85, M.cr2, 0, 0.17, 0, 0.06));
  for (const x of [-0.45, 0.45]) s.add(caja(0.88, 0.14, 0.75, M.cr, x, 0.38, 0.04, 0.06));
  s.add(caja(1.9, 0.55, 0.22, M.cr2, 0, 0.6, -0.33, 0.08));
  for (const x of [-0.97, 0.97]) s.add(caja(0.2, 0.5, 0.85, M.cr2, x, 0.4, 0, 0.08));
  const al = caja(0.42, 0.36, 0.13, M.g, -0.6, 0.62, -0.17, 0.08); al.rotation.set(-0.2, 0.2, 0.08); s.add(al);
  // la mesita con la lámpara
  const m = new THREE.Group(); m.position.set(-1.35, 0, -0.95); LIV.add(m); m.add(caja(0.4, 0.5, 0.4, M.navy3, 0, 0.25, 0, 0.02)); m.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8), M.navy, 0, 0.65, 0)); m.add(mesh(new THREE.CylinderGeometry(0.1, 0.15, 0.18, 18), M.cr, 0, 0.85, 0));
  sombras(LIV);
}
fusionar(LIV);

// =====================================================================================================
// LAS TARJETAS DE ESTE REEL
// =====================================================================================================
const chip = (txt, px = 62, fondo = "#5ce611", tinta = "#0b1220") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo }); };
const dibujarVenc = (x, W, H, n) => { x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 50); x.fillText("Vencidas:", 30, H / 2 + 3); x.font = F(900, 70); x.textAlign = "right"; x.fillText(String(n), W - 30, H / 2 + 4); };
const GL = {
  marzo: chip("JUNIO", 60),
  ficha: crearTarjeta(600, 420, (x, W, H) => dibujarFicha(x, W, H, 0), { fondo: "#f7f5ec" }),
  v1: crearGlobo(["Doctora, ¿y cuándo", "le toca la [próxima?]"], 52),
  i1: crearGlobo(["Yo le [aviso.]"], 76),
  abril: chip("AGOSTO", 62), mayo: chip("DICIEMBRE", 62), junio: chip("JUNIO", 62), junioUn: chip("JUNIO · un año después", 50),
  venc: crearTarjeta(400, 104, (x, W, H) => dibujarVenc(x, W, H, 12), { fondo: "#c7655b" }),
  rToto: crearRotulo([["Ficha de Toto"]], 54),
  noche: chip("JUNIO · 21:40", 58, "#16243d", "#efeee5"),
  guau: crearGlobo(["¡Guau! [¡Guau!]"], 64),
  b1: crearGlobo(["Doctora, ¿y los avisos", "de las [vacunas?]"], 66),
  i2: crearGlobo(["El que quiere a su", "perro, se [acuerda.]"], 68),
  julio: chip("JULIO", 62),
  v2: crearGlobo(["A Toto le escribieron", "de la de la vuelta.", "[Ya está vacunado.]"], 64),
  r1: crearRotulo([["63 vacunas vencidas"], ["en el fichero"]], 54),
  r2: crearRotulo([["$ 94.500", "#ff9d92", 74], ["que no volvieron", "#ff9d92"]], 54),
  r3: crearRotulo([["Vacunado", "#ff9d92"], ["a la vuelta", "#ff9d92"]], 56),
  i3: crearGlobo(["¿Vos también, [Toto?]"], 82),
  i4: crearGlobo(["Le vamos a escribir", "[a él.]"], 78),
  rFicha: crearRotulo([["La ficha de cada paciente"]], 52),
  junio5: chip("Un año después · 5 días antes", 46),
  rRec: crearRotulo([["Recordatorio automático"]], 52),
  v3: crearGlobo(["¡Toto!", "¡Te [escribieron!]"], 80),
  b1b: crearGlobo(["Doctora, ¿y los avisos", "de las [vacunas?]"], 62, { cab: { cv: AVATAR.bruno, nombre: "Bruno" } }),
  i5: crearGlobo(["Ya salieron [solos.]"], 74, { cab: { cv: AVATAR.ines, nombre: "Inés" } }),
  martes: chip("MARTES · 10:00", 60),
};
let vencN = -1;
function ponerVenc(t, cx, cy, s = 1) { const n = vencidasEn(t); if (n !== vencN) { vencN = n; redibujar(GL.venc, (x, W, H) => dibujarVenc(x, W, H, n)); } ponerGlobo(GL.venc, cx, cy, s, null); }
let fichaK = -1;
function ponerFichaGL(t, cx, cy, s) { const k = Math.round(sg(t, T.escribe[0], T.escribe[1]) * 12) / 12; if (k !== fichaK) { fichaK = k; redibujar(GL.ficha, (x, W, H) => dibujarFicha(x, W, H, k)); } ponerGlobo(GL.ficha, cx, cy, s, null, 1); }
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];
// las dos fichas que escupe el fichero en P3 (caen al piso y quedan ahí)
const CAIDAS = [0, 1].map((i) => { const g = new THREE.Mesh(fichaGeo, new THREE.MeshStandardMaterial({ map: OTRA_T, roughness: 0.85, side: THREE.DoubleSide })); g.castShadow = true; scene.add(g); return g; });

// =====================================================================================================
// LUGARES
// =====================================================================================================
const TOTO_MESA = { x: MESA.x + 0.2, y: MESA.alto + 0.008, z: MESA.z + 0.0 };   // (r3) más a la derecha: lejos de la cara de Inés   // (r2) más cerca de Vero, lejos de la cara de Inés
const INES1 = { x: -1.12, z: -0.74 }, VERO1 = { x: 0.3, z: -0.5 };   // (r3) Vero detrás de la mesa, de 3/4 (ya no de espaldas)
const FICH_CARRO = V3(CARRO.x + 0.02, CARRO.alto, CARRO.z - 0.02);
const FICH_MOS = V3(MOS.x - 0.62, MOS.alto, MOS.z + 0.02);
const FICH_MESADA = V3(MESADA.x + 0.22, MESADA.alto, -0.3);
const INES_MOS = { x: MOS.x - 0.1, z: MOS.z - 0.44 };   // (r3) pegada al mostrador
const TOTO_MOS = { x: MOS.x - 0.05, z: MOS.z + 0.56 };   // (r3) más cerca del mostrador (P6: Toto e Inés en el mismo cuadro)
const VERO_MOS = { x: MOS.x + 0.72, z: MOS.z + 0.72 };
const PUERTA_C = { x: XR - 0.25, z: (PUERTA.z0 + PUERTA.z1) / 2 };
const TOTO_PIE = { x: MESA.x + 0.55, z: MESA.z + 0.62 };   // Q4: al pie de la mesa
const INES_Q4 = { x: MESA.x - 0.3, z: MESA.z + 0.66 };
// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves | "fichero"]; cada clave [t, px, py, pz, mx, my, mz, fov]
// =====================================================================================================
const P1C = (k) => [-0.3, lerp(1.45, 1.43, k), lerp(3.9, 3.65, k), -0.35, 1.18, -0.3, lerp(52, 51, k)];   // (r3) más abierto y Vero de 3/4
const PLANOS = [
  ["P1", 0, [[0, ...P1C(0)], [T.p2, ...P1C(1)]]],
  ["P2", T.p2, "fichero"],
  ["P2c", T.p2c, [[T.p2c, MOS.x - 0.3, 1.32, MOS.z + 1.9, MOS.x - 0.18, 1.12, MOS.z - 0.45, 40], [T.p3, MOS.x - 0.3, 1.31, MOS.z + 1.78, MOS.x - 0.18, 1.12, MOS.z - 0.45, 39]]],
  ["P3", T.p3, [[T.p3, -1.45, 1.52, 2.15, -1.78, 1.1, -0.6, 50], [T.p3b, -1.46, 1.5, 2.0, -1.78, 1.1, -0.6, 48]]],
  // (r1) P3b: contraplano a Inés en la pileta, de 3/4, en su línea
  ["P3b", T.p3b, [[T.p3b, -2.62, 1.55, 1.15, -2.3, 1.3, -0.95, 40], [T.p4, -2.62, 1.54, 1.02, -2.3, 1.3, -0.95, 38]]],
  ["P4", T.p4, [[T.p4, 1.55, 1.5, 2.85, 3.45, 0.98, -0.3, 50], [r2(T.entra[1] + 0.2), 1.35, 1.48, 2.7, 3.0, 0.98, -0.55, 48], [T.p4b, 1.3, 1.46, 2.6, 2.95, 0.98, -0.6, 47]]],
  // (r1) P4b: contraplano desde atrás del mostrador: Vero de frente y Toto con el pañuelo
  ["P4b", T.p4b, [[T.p4b, MOS.x - 1.7, 1.52, MOS.z + 2.1, VERO_MOS.x - 0.12, 1.1, VERO_MOS.z - 0.05, 50], [T.p5, MOS.x - 1.65, 1.51, MOS.z + 2.0, VERO_MOS.x - 0.12, 1.1, VERO_MOS.z - 0.05, 48]]],
  ["P5", T.p5, [[T.p5, 0.85, 2.0, 0.7, MOS.x - 0.12, 0.95, MOS.z - 0.15, 52], [T.p6, 0.87, 1.98, 0.65, MOS.x - 0.12, 0.95, MOS.z - 0.15, 50]]],
  // (r3) P6: cámara baja desde el costado de Toto (lado de la vidriera): Toto de 3/4-perfil abajo, Inés derecha arriba
  ["P6", T.p6, [[T.p6, 4.3, 1.05, 0.7, MOS.x - 0.05, 0.92, MOS.z + 0.24, 56], [T.p7, 4.25, 1.05, 0.64, MOS.x - 0.05, 0.92, MOS.z + 0.24, 54]]],
  // (r3) P7: de costado, más alto: Inés entera detrás del mostrador, la pata y la mano a la vista
  ["P7", T.p7, [[T.p7, 4.2, 1.35, 0.5, MOS.x - 0.05, 1.12, MOS.z + 0.12, 47], [P1, 4.15, 1.34, 0.45, MOS.x - 0.05, 1.12, MOS.z + 0.12, 45]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...P1C(0)], [T.q1t, ...P1C(0.7)]]],
  // (r1) Q1b: más cerca de Inés y Toto en "Le vamos a escribir a él." (el plano general duraba 3,7 s)
  ["Q1b", r2(T.i4 - 0.05), [[r2(T.i4 - 0.05), -2.3, 1.5, 2.3, -0.72, 1.15, -0.3, 44], [T.q1t, -2.24, 1.49, 2.22, -0.72, 1.15, -0.3, 43]]],   // (r3) desde la izquierda: Inés y Toto enteros, Vero detrás de Toto (ya no cortada a la derecha)
  ["Q1t", T.q1t, null],
  ["Q2", T.q2, null],
  ["Q2b", T.q2b, [[T.q2b, 29.95, 1.25, 2.0, 29.9, 0.82, -0.85, 46], [T.q2c, 29.93, 1.22, 1.85, 29.9, 0.82, -0.85, 44]]],
  ["Q2c", T.q2c, null],
  ["Q3", T.q3, [[T.q3, -0.65, 1.48, 2.95, -0.68, 1.24, 0.3, 46], [T.q3c, -0.65, 1.46, 2.8, -0.68, 1.24, 0.3, 44]]],
  ["Q3c", T.q3c, null],
  ["Q4", T.q4, "q4"],
  // (r3) sin Q4b: duraba 2 cuadros (el flash de 34,37 s); Q4 sigue a Toto hasta el contraplano Q4c
  // (r2) Q4c: contraplano de 3/4 sobre Inés en "¿Vos también, Toto?"; Q4d la pata
  ["Q4c", T.q4c, [[T.q4c, 1.2, 1.5, 1.32, -0.72, 1.22, 0.42, 40], [T.q4d, 1.13, 1.49, 1.28, -0.72, 1.22, 0.42, 39]]],   // (r3) plano medio de 3/4 frontal (no el primer plano de perfil)
  ["Q4d", T.q4d, [[T.q4d, 0.9, 1.45, 3.1, -0.3, 1.12, 0.45, 46], [T.q5, 0.87, 1.44, 3.0, -0.3, 1.12, 0.45, 45]]],   // (r3) Inés con la cabeza entera
  ["Q5", T.q5, "q5"],
];
// (r3) ningún plano de menos de 0,3 s: un plano más corto es un flash de 1-2 cuadros en el corte; se saca (el anterior
// sigue) y avisa en la consola
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
function ponerCam(v, t) {
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6]; camera.updateProjectionMatrix();
  camera.lookAt(_m.set(v[3], v[4], v[5]));
}
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }
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

// =====================================================================================================
// POSES
// =====================================================================================================
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const FELIZ = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, boca: { sonrisa: 0.95, abierta: 0.05, ancho: 1.15 } };
const toW = (per, local) => { per.raiz.updateMatrixWorld(true); return per.cuerpo.localToWorld(V3(...local)); };
// la mano a un punto del mundo, con un peso k (0..1)
function manoA(per, p, lado, w, k, codo = null) { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "I" ? "manoI" : "manoD"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(cl(k)))); if (codo) p[lado === "I" ? "codoI" : "codoD"] = codo; }
const cabezaW = (per, local = [0, 0.25, 0]) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(...local)); };
// el lomo de Toto en el mundo (para la caricia de Vero) y su pata derecha
const lomoToto = () => { toto.raiz.updateMatrixWorld(true); return toto.torso.localToWorld(V3(0.02, 0.17, 0.12)); };
// un punto del mundo en el espacio del perro (sin escala), para pataA / apoyo
const enPerro = (d, w) => { d.raiz.updateMatrixWorld(true); const v = d.raiz.worldToLocal(w.clone()); return [v.x / d.cfg.escala, v.y / d.cfg.escala, v.z / d.cfg.escala]; };
function poseInes(t) {
  const p2 = t >= P2, pa = planoActual;
  if (!p2) {
    if (t < T.p2c) {
      // P1: escribe la ficha (la izquierda la sostiene, la derecha escribe) y la tira al fichero: plac
      const gT = dirGiro(INES1.x, INES1.z, TOTO_MESA.x, TOTO_MESA.z);
      const p = poseEn(t, [
        [0, { x: INES1.x, z: INES1.z, giro: gT - 0.3, ...aC(0.15, 0.1), ...CARA.sonrisa, ...BRAZOS.costado, manoI: [0.1, 0.27, 0.32], codoI: [0.8, -0.6, -0.2], manoD: [-0.02, 0.3, 0.34], codoD: [-0.8, -0.6, -0.2] }],
        [T.v1 + 0.4, { ...aC(0.1, 0.22), ...SEGURO, ojos: { abiertos: 1 } }, 0.3],
        [T.i1 + 0.05, { ...aC(0.3, 0.12), ...SEGURO, ojos: { abiertos: 1 } }, 0.25],
        [T.guarda - 0.12, { giro: gT + 0.2, ...aC(0.1, 0.12), manoI: [0.32, 0.22, 0.34], codoI: [0.9, -0.5, 0] , manoD: [-0.29, -0.08, 0.04], codoD: null }, 0.22],
        [T.guarda + 0.35, { ...aC(-0.05, 0.12), ...CARA.sonrisa, manoI: [0.29, -0.08, 0.04], codoI: null }, 0.3],
      ]);
      if (t > T.escribe[0] && t < T.escribe[1]) { p.manoD[0] += Math.sin(t * 38) * 0.012; p.manoD[1] += Math.sin(t * 23) * 0.006; }
      p.t = t; bocaVoz(p, t, T.i1, ENV.i1, 0.6); return p;
    }
    if (t < T.p3) {
      // P2c · JUNIO 21:40: el teléfono en la oreja (derecha), la ficha en la izquierda; ladra la sala; cuelga
      const p = poseEn(t, [
        [0, { x: INES_MOS.x, z: INES_MOS.z, giro: 0.12, ...aC(-0.15, 0.08), ...SEGURO, ...BRAZOS.costado, manoI: [0.1, 0.25, 0.33], codoI: [0.8, -0.6, -0.2] }],
        [T.ladra + 0.15, { ...aC(0.45, 0.0), ...CARA.incredula, ojos: { abiertos: 0.9 } }, 0.15],
        [T.cuelga + 0.05, { ...aC(0.1, 0.2), ...CARA.resignado, ojos: { abiertos: 0.6, tension: 0.6 } }, 0.25],
      ]);
      const k = 1 - sg(t, T.cuelga - 0.05, T.cuelga + 0.2);
      const oreja = cabezaW(ines, [-0.31, 0.2, 0.02]);
      const base = V3(MOS.x + 0.6, MOS.alto + 0.1, MOS.z - 0.08);
      const costado = toW(ines, [-0.42, 0.42, 0.12]);
      const u = 1 - k, w = u < 0.5 ? oreja.clone().lerp(costado, eio(u * 2)) : costado.clone().lerp(base, eio(u * 2 - 1));
      manoA(ines, p, "D", w, 1, [-0.9, -0.3, -0.2]);
      p.t = t; return p;
    }
    if (t < T.p4) {
      // P3: en la pileta, lavándose las manos; "El que quiere a su perro, se acuerda." (se seca, segura)
      const g0 = -Math.PI / 2 + 0.55;
      const lav = Math.sin(t * 14) * 0.03;
      const p = poseEn(t, [
        [0, { x: MESADA.x + 0.62, z: PILETA.z + 0.05, giro: g0, inclina: 0.1, ...aC(0.2, 0.22), ...CARA.neutra, ojos: { abiertos: 1, y: -0.4 }, manoI: [0.1 + lav, 0.12, 0.38], manoD: [-0.1 - lav, 0.14, 0.38], codoI: [0.8, -0.6, -0.1], codoD: [-0.8, -0.6, -0.1] }],
        [T.i2 - 0.25, { inclina: 0.03, ...aC(0.5, 0.0), ...SEGURO, ojos: { abiertos: 1 }, manoI: [0.08, 0.3, 0.3], manoD: [-0.06, 0.3, 0.32] }, 0.3],
      ]);
      if (t > T.i2 - 0.1) { const r = Math.sin(t * 10) * 0.02; p.manoI[0] += r; p.manoD[0] -= r; }
      p.t = t; bocaVoz(p, t, T.i2, ENV.i2, 0.6); return p;
    }
    // P4 · P5 · P6 · P7: detrás del mostrador
    const p = poseEn(t, [
      [0, { x: INES_MOS.x, z: INES_MOS.z, giro: 0.15, ...aC(0.25, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado }],
      [T.v2 + 2.1, { ...aC(0.2, 0.08), ...CARA.incredula, ojos: { abiertos: 0.9 } }, 0.3],
      [T.p5 + 0.3, { ...aC(0.0, 0.3), ...SECO, ojos: { abiertos: 0.95 }, cejas: { alto: 0.05, ang: 0.3 } }, 0.35],
      [T.p6 + 0.1, { giro: 0.45, inclina: 0.06, ...aC(-0.2, 0.32), ...SECO, ojos: { abiertos: 0.95, y: -0.6 } }, 0.3],   // (r3) casi derecha, mira abajo a Toto
      [T.p7 + 0.15, { giro: 0.4, inclina: 0.08, ...aC(0.05, 0.25), ...SECO, ojos: { abiertos: 0.95, y: -0.4 }, cejas: { alto: -0.05, ang: 0.15 } }, 0.2],
    ]);
    if (t >= T.p7) { const w = toto.pataD(_a).add(V3(0, 0.02, -0.02)); manoA(ines, p, "D", w, sg(t, T.pata[1] - 0.05, T.apreton), [-0.8, -0.6, -0.3]); if (t > T.apreton) p.manoD[1] += Math.sin((t - T.apreton) * 16) * 0.025 * (1 - sg(t, T.apreton + 0.3, T.apreton + 0.5)); }
    p.t = t; bocaVoz(p, t, T.i3, ENV.i3, 0.5); return p;
  }
  // ---- parte 2 ----
  if (t < T.q3) {
    const gT = dirGiro(INES1.x, INES1.z, TOTO_MESA.x, TOTO_MESA.z);
    const p = poseEn(t, [
      [0, { x: INES1.x, z: INES1.z, giro: gT - 0.3, ...aC(0.15, 0.1), ...MEDIA, ...BRAZOS.costado }],
      [T.i4 - 0.1, { ...aC(0.35, 0.1, 0.1), ...MEDIA, ojos: { abiertos: 0.95, feliz: 0.3 } }, 0.3],
    ]);
    p.t = t; bocaVoz(p, t, T.i4, ENV.i4, 0.55); return p;
  }
  if (t < T.q4) {
    // Q3b: con su tablet, sin levantar la vista: "Ya salieron solos."
    const p = poseEn(t, [[0, { x: -1.08, z: 0.32, giro: 0.4, ...aC(0.35, 0.12), ...MEDIA, ojos: { abiertos: 1, y: -0.2 }, ...BRAZOS.celular, manoI: [0.1, 0.12, 0.3], manoD: [-0.1, 0.12, 0.3] }], [T.b1b + 0.8, { ...aC(0.4, 0.05), ...MEDIA, ojos: { abiertos: 1 } }, 0.3]]);
    p.t = t; bocaVoz(p, t, T.i5, ENV.i5, 0.55); return p;
  }
  // Q4 / Q4b: se asoma sonriendo, "¿Vos también, Toto?" y le da la mano a Toto
  const gT = dirGiro(INES_Q4.x, INES_Q4.z, TOTO_PIE.x, TOTO_PIE.z);
  const p = poseEn(t, [
    [0, { x: INES_Q4.x, z: INES_Q4.z, giro: gT - 0.55, ...aC(0.35, 0.2), ...CARA.sonrisa, ...BRAZOS.costado }],
    [T.i6, { inclina: 0.06, ...aC(0.4, 0.2, 0.08), ...FELIZ }, 0.3],
    [T.pata2[1], { inclina: 0.12, ...aC(0.2, 0.25, 0.08), ...FELIZ }, 0.3],
  ]);
  if (t >= T.pata2[0]) { const w = toto.pataD(_a).add(V3(0, 0.03, 0)); manoA(ines, p, "D", w, sg(t, T.pata2[0], T.pata2[1] + 0.05), [-0.8, -0.6, -0.3]); if (t > T.pata2[1] + 0.05) p.manoD[1] += Math.sin((t - T.pata2[1]) * 14) * 0.03; }
  p.t = t; bocaVoz(p, t, T.i6, ENV.i6, 0.55); return p;
}
function poseVero(t) {
  const p2 = t >= P2;
  if ((!p2 && t < T.p2) || (p2 && t < T.q2)) {
    // P1 / Q1: al lado de la mesa, acaricia a Toto con la derecha
    const tv = p2 ? T.v1b : T.v1;
    const gT = dirGiro(VERO1.x, VERO1.z, TOTO_MESA.x, TOTO_MESA.z);
    const p = poseEn(t, [
      [0, { x: VERO1.x, z: VERO1.z, giro: gT + 0.75, ...aC(-0.35, 0.1), ...BUENA, ...BRAZOS.costado }],   // (r3) de 3/4 a cámara
      [tv, { ...aC(-0.3, 0.02), ...BUENA, cejas: { alto: 0.45, ang: 0.3 } }, 0.25],
      [tv + LEN.v1 + 0.2, { ...aC(-0.5, 0.05), ...CARA.sonrisa }, 0.3],
    ]);
    const w = lomoToto().add(V3(Math.sin(t * 3.2) * 0.03, 0.04, 0));
    manoA(vero, p, "D", w, 1, [-0.8, -0.6, -0.1]);
    p.t = t; bocaVoz(p, t, tv, ENV.v1, 0.6); return p;
  }
  if (!p2) {
    // P4-P7: entra con Toto de la correa y la bolsa de ración; la apoya; "¡Doctora! A Toto le escribieron…"
    const u = sg(t, T.entra[0], T.entra[1]);
    const gC = -Math.PI + 0.35;   // (r3) el mismo ángulo, sin dar la vuelta larga
    const p = poseEn(t, [
      [0, { giro: -Math.PI / 2 - 0.4, ...aC(0.1, 0.05), ...BUENA, ...BRAZOS.costado, manoD: [-0.25, 0.0, 0.12], manoI: [0.27, 0.08, 0.2], codoI: [0.8, -0.6, -0.2] }],
      [T.entra[1] - 0.2, { giro: gC, ...aC(-0.1, -0.05), ...BUENA, cejas: { alto: 0.5, ang: 0.3 } }, 0.3],
      [T.p4b + 0.02, { giro: -Math.PI / 2 - 0.15, ...aC(-0.05, 0.1), ...BUENA, ojos: { abiertos: 1, x: -0.5, y: -0.4 } }, 0.3],   // (r3) ya de frente en el corte a P4b (y gira por el lado corto)
      [T.bolsa + 0.4, { manoD: [-0.29, -0.08, 0.04] }, 0.3],
      [T.p6, { ...aC(0.5, 0.3), ...CARA.sonrisa }, 0.3],
      [T.p7 + 0.4, { ...aC(0.3, 0.2), ...CARA.sorpresa, boca: { sonrisa: 0.2, abierta: 0.1, ancho: 0.8 } }, 0.3],
    ]);
    Object.assign(p, { x: lerp(PUERTA_C.x - 0.75, VERO_MOS.x, eio(u)), z: lerp(PUERTA_C.z - 0.2, VERO_MOS.z, eio(u)), paso: u > 0.02 && u < 0.98 ? 1 : 0 });
    if (t > T.bolsa - 0.25) manoA(vero, p, "D", V3(MOS.x + 0.45, MOS.alto + 0.36, MOS.z + 0.12), sg(t, T.bolsa - 0.25, T.bolsa) * (1 - sg(t, T.bolsa + 0.1, T.bolsa + 0.4)), [-0.8, -0.5, -0.2]);
    p.t = t; bocaVoz(p, t, T.v2, ENV.v2, 0.6); return p;
  }
  if (t < T.q3) {
    // Q2b: en el sillón, con el celular: "¡Toto! ¡Te escribieron!"
    const p = poseEn(t, [[0, { x: 29.58, y: -0.08, z: -0.78, giro: 0.25, sentado: 1, ...aC(0.0, 0.42), ...CARA.sorpresa, ...BRAZOS.celular }], [T.v3, { ...aC(0.75, 0.15), ...FELIZ, cejas: { alto: 0.6, ang: 0.3 } }, 0.2]]);
    p.t = t; bocaVoz(p, t, T.v3, ENV.v3, 0.65); return p;
  }
  // Q4: entra a las 10:00 en punto con Toto
  const u = sg(t, T.campana, T.campana + 0.9);
  const p = poseEn(t, [[0, { giro: -Math.PI / 2, ...aC(-0.1, 0.05), ...CARA.sonrisa, ...BRAZOS.costado, manoI: [0.27, 0.08, 0.2] }]]);
  Object.assign(p, { x: lerp(PUERTA_C.x - 0.05, PUERTA_C.x - 0.75, eio(u)), z: PUERTA_C.z - 0.1, paso: u > 0.02 && u < 0.98 ? 1 : 0 });
  p.t = t; return p;
}
function poseBruno(t) {
  if (t < P2) {
    // P3: entra con el fichero en brazos (ya no cierra); "Doctora, ¿y los avisos de las vacunas?"; lo apoya en la mesada
    const u = sg(t, T.p3 - 0.1, T.p3 + 0.7);
    const gI = 0.05;
    const p = poseEn(t, [
      [0, { giro: 0.1, ...aC(0.2, 0.05), ...CARA.esperanza, ...BRAZOS.costado, manoI: [0.165, 0.2, 0.42], manoD: [-0.165, 0.2, 0.42], codoI: [0.9, -0.5, -0.1], codoD: [-0.9, -0.5, -0.1] }],
      [T.p3 + 0.95, { giro: gI, ...aC(-0.75, 0.05), ...CARA.esperanza }, 0.3],
      [T.i2 + 0.3, { ...aC(-0.8, 0.02), ...CARA.neutra, ojos: { abiertos: 0.9 } }, 0.3],
      [T.caen + 0.25, { ...aC(-0.1, 0.4), ...CARA.incredula, ojos: { abiertos: 0.85 } }, 0.2],
    ]);
    Object.assign(p, { x: lerp(-1.3, -1.4, eio(u)), z: lerp(-0.8, -0.2, eio(u)), paso: u > 0.02 && u < 0.98 ? 1 : 0 }); if (t > T.apoya - 0.2) { const k2 = Math.sin(sg(t, T.apoya - 0.2, T.apoya + 0.2) * Math.PI); p.inclina = 0.12 * k2; p.manoI[1] += 0.06 * k2; p.manoD[1] -= 0.04 * k2; }
    p.t = t; bocaVoz(p, t, T.b1, ENV.b1, 0.65); return p;
  }
  // Q3b: al lado de Inés con su tablet
  const p = poseEn(t, [[0, { x: -0.25, z: 0.42, giro: -0.4, ...aC(-0.3, 0.05), ...CARA.esperanza, ...BRAZOS.celular, manoI: [0.1, 0.12, 0.3], manoD: [-0.1, 0.12, 0.3] }]]);
  p.t = t; bocaVoz(p, t, T.b1b, ENV.b1, 0.65); return p;
}
// Toto: { pose del perro }
function poseToto(t) {
  const p2 = t >= P2;
  const B = { orejas: 0.65, cola: 0.35, colaAlta: 0.6 };
  if ((!p2 && t < T.p2) || (p2 && t < T.q2)) {
    // P1 / Q1: sentado en la mesa (3/4, la oreja caída hacia la cámara); mira a quien habla; mueve la cola
    const tv = p2 ? T.v1b : T.v1, ti = p2 ? T.i4 : T.i1;
    const c = poseEn(t, [
      [0, { cab: [0.35, -0.1, 0.0], cejas: 0.2 }],
      [tv + 0.3, { cab: [0.55, -0.05, 0.05], cejas: 0.3 }, 0.3],
      [ti, { cab: [-0.45, -0.12, -0.05], cejas: 0.5 }, 0.25],
      [ti + LEN.i4, { cab: [-0.35, -0.15, p2 ? 0.38 : 0.0], cejas: p2 ? 0.8 : 0.4 }, 0.3],
    ].map(([a, b, d]) => [a, { x: 0, ...b }, d]));
    const cola = p2 ? 0.75 : t > T.guarda - 0.1 ? 0.95 : 0.4;
    return { ...B, x: TOTO_MESA.x, y: TOTO_MESA.y, z: TOTO_MESA.z, giro: -0.35, sentado: 1, cola, cejas: c.cejas, cabeza: { giro: c.cab[0], asiente: c.cab[1], ladea: c.cab[2] }, jadeo: p2 ? 0.5 : 0, t };
  }
  if (!p2) {
    // P4: entra con Vero (camina), se sienta frente al mostrador; P5 mira a Inés; P6 las orejas gachas; P7 se para y da la pata
    const u = sg(t, T.entra[0] + 0.1, T.entra[1] - 0.05);
    const x = lerp(PUERTA_C.x - 0.4, TOTO_MOS.x, eio(u)), z = lerp(PUERTA_C.z - 0.25, TOTO_MOS.z, eio(u));
    const anda = u > 0.01 && u < 0.99;
    const giro = anda ? dirGiro(PUERTA_C.x - 0.4, PUERTA_C.z - 0.25, TOTO_MOS.x, TOTO_MOS.z) : 0.3;
    const sent = sg(t, T.entra[1] - 0.05, T.entra[1] + 0.25) * (1 - sg(t, T.p7 - 0.22, T.p7 + 0.1));
    const c = poseEn(t, [
      [0, { cab: [0.0, -0.05, 0.0], orejas: 0.8, cola: 0.8, cejas: 0.2 }],
      [T.entra[1], { cab: [0.5, -0.15, 0.1], orejas: 0.8, cola: 0.8, cejas: 0.3 }, 0.3],
      [T.p5 + 0.2, { cab: [0.0, -0.45, 0.0], orejas: 0.5, cola: 0.25, cejas: 0.0 }, 0.3],
      [T.p6 + 0.15, { cab: [0.55, -0.55, 0.0], orejas: 0.0, cola: 0.08, cejas: -1 }, 0.3],
      [T.pata[1], { cab: [0.35, -0.35, 0.12], orejas: 0.1, cola: 0.15, cejas: -0.8 }, 0.3],
    ]);
    const er = sg(t, T.p7 - 0.22, T.p7 + 0.1);
    const gP6 = lerp(0.3, Math.PI - 1.05, eio(sg(t, T.p5 + 0.05, T.p5 + 0.45)));   // (r3) sentado mira hacia Vero (de frente en P4b, pañuelo a la vista); en la pausa se da vuelta hacia Inés   // (r3) en P6 se ve de 3/4 desde la vidriera
    const gLlega = lerp(dirGiro(PUERTA_C.x - 0.4, PUERTA_C.z - 0.25, TOTO_MOS.x, TOTO_MOS.z), 0.3, eio(sg(t, T.entra[1] - 0.2, T.entra[1] + 0.2)));
    const P = { ...B, x, y: 0, z, giro: t < T.entra[1] + 0.2 ? gLlega : lerp(gP6, Math.PI - 0.45, er), sentado: sent, erguido: er, paso: anda ? 1 : 0, pasoVel: 14, cola: c.orejas > 0.7 && anda ? 0.8 : c.cola, colaAlta: lerp(0.15, 0.6, c.orejas), orejas: c.orejas, cejas: c.cejas, cabeza: { giro: c.cab[0], asiente: c.cab[1], ladea: c.cab[2] }, t };
    P.x = x; P.z = lerp(z, MOS.z + MOS.d / 2 + 0.24, er);
    if (er > 0) { toto.raiz.position.set(P.x, 0, P.z); toto.raiz.rotation.set(0, P.giro, 0); P.apoyo = enPerro(toto, V3(P.x - 0.09, MOS.alto + 0.035, MOS.z + MOS.d / 2 + 0.05)); const ap = sg(t, T.pata[0], T.pata[1]); P.pataA = enPerro(toto, V3(P.x + 0.08, MOS.alto + 0.035 + 0.1 * ap, MOS.z + MOS.d / 2 + 0.05 - 0.1 * ap)); P.pata = Math.min(1, er * 1.2); }
    return P;
  }
  if (t < T.q3) {
    // Q2b: echado en el sillón; levanta la cabeza y la ladea cuando Vero le habla
    const c = poseEn(t, [[0, { cab: [-0.3, 0.1, 0.0], orejas: 0.3, cola: 0.15 }], [T.v3 + 0.35, { cab: [-0.45, -0.25, 0.42], orejas: 1.0, cola: 0.85 }, 0.25]]);
    return { ...B, x: 30.42, y: 0.45, z: -0.86, giro: -0.55, echado: 1, cola: c.cola, colaAlta: 0.5, orejas: c.orejas, cejas: 0.6, cabeza: { giro: c.cab[0], asiente: c.cab[1], ladea: c.cab[2] }, jadeo: sg(t, T.v3 + 0.4, T.v3 + 0.7) * 0.8, t };
  }
  // Q4: entra puntual y va derecho al consultorio (corre), se sienta al pie de la mesa y da la pata, contento
  const u = sg(t, T.corre[0], T.corre[1]);
  const x0 = PUERTA_C.x - 0.35, z0 = PUERTA_C.z - 0.2;
  const anda = u > 0.01 && u < 0.99;
  const x = lerp(x0, TOTO_PIE.x, eio(u)), z = lerp(z0, TOTO_PIE.z, eio(u));
  const gI = dirGiro(TOTO_PIE.x, TOTO_PIE.z, INES_Q4.x, INES_Q4.z);
  const P = { ...B, x, y: 0, z, giro: anda ? dirGiro(x0, z0, TOTO_PIE.x, TOTO_PIE.z) : gI, sentado: sg(t, T.corre[1] - 0.05, T.corre[1] + 0.2), paso: anda ? 1 : 0, pasoVel: 18, cola: 1, colaAlta: 0.85, orejas: 1, cejas: 0.6, jadeo: 1, cabeza: { giro: 0, asiente: -0.3, ladea: 0.12 }, t };
  // (r1) se para en dos patas frente a Inés y le da la pata a la altura de su mano (sin acercarle el hocico a la cara)
  const er = sg(t, T.pata2[0] - 0.35, T.pata2[0] - 0.05);
  if (er > 0) { P.erguido = er; P.sentado = P.sentado * (1 - er); toto.raiz.position.set(P.x, 0, P.z); toto.raiz.rotation.set(0, P.giro, 0); P.pata = sg(t, T.pata2[0] - 0.1, T.pata2[0] + 0.2); P.pataA = enPerro(toto, V3(TOTO_PIE.x - 0.27, 0.8, TOTO_PIE.z + 0.02)); P.cabeza = { giro: 0, asiente: -0.15, ladea: 0.12 }; }
  return P;
}

// =====================================================================================================
// OBJETOS EN EL TIEMPO
// =====================================================================================================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
// el estante alto de la parte 2: el fichero jubilado con una planta encima
const PLANTA = new THREE.Group();
{ PLANTA.add(mesh(new THREE.CylinderGeometry(0.06, 0.045, 0.1, 14), M.navy3, 0, 0.05, 0)); semilla = 4; for (let i = 0; i < 5; i++) PLANTA.add(mesh(new THREE.IcosahedronGeometry(0.05 + az() * 0.02, 0), i % 2 ? M.gd : M.g, (az() - 0.5) * 0.08, 0.13 + az() * 0.06, (az() - 0.5) * 0.06)); scene.add(sombras(PLANTA)); }
function ponerFicheroLugar(t) {
  const p2 = t >= P2;
  FICHERO.visible = true; FICHERO.rotation.set(0, 0, 0); PLANTA.visible = p2; FICHERO.scale.setScalar(t < T.p2 ? 2.3 : t < T.p3 ? 1.7 : 1.15);   // (r3) más grande en el cuadro 0
  if (p2) { FICHERO.visible = false; PLANTA.visible = false; return; }
  if (planoActual === "P2c") { FICHERO.scale.setScalar(1.15); FICHERO.position.set(MOS.x - 0.42, MOS.alto, MOS.z + 0.12); FICHERO.rotation.y = 0.35; return; }
  if (t < T.p3) { FICHERO.position.copy(FICH_CARRO); return; }
  if (t < T.p4) {
    // en los brazos de Bruno, hasta que lo apoya en la mesada
    const a = manoMundo(bruno, "I", _a), b = manoMundo(bruno, "D", _b);
    const mid = a.clone().add(b).multiplyScalar(0.5).add(V3(0, -0.06, 0));
    bruno.cuerpo.getWorldQuaternion(_q); const e = new THREE.Euler().setFromQuaternion(_q, "YXZ");
    FICHERO.position.copy(mid); FICHERO.rotation.y = e.y; FICHERO.rotation.z = Math.sin(sg(t, T.apoya - 0.2, T.apoya + 0.2) * Math.PI) * 0.2;
    return;
  }
  FICHERO.position.copy(FICH_MOS); FICHERO.rotation.y = -Math.PI / 2 + 0.25;
}
function ponerCaidas(t) {
  for (const [i, g] of CAIDAS.entries()) {
    g.visible = t >= T.caen && t < T.p4;
    if (!g.visible) continue;
    const u = eo(sg(t, T.caen + i * 0.08, T.caen + 0.32 + i * 0.08));
    if (!CAIDAS.ini) { const bp = bruno.raiz.position; CAIDAS.ini = 1; CAIDAS.b = bp.clone(); }
    FICHERO.updateMatrixWorld(true); const a = FICHERO.localToWorld(V3(i ? -0.04 : 0.04, FIC.H + 0.06, 0.15 - i * 0.05));
    const bp = V3(-1.62, 0, -0.3); const b = V3(bp.x + 0.12 + i * 0.22, 0.004 + i * 0.002, bp.z + 0.5 - i * 0.12);
    g.position.lerpVectors(a, b, u); g.position.y += Math.sin(u * Math.PI) * 0.12;
    g.rotation.set(lerp(-0.2, -Math.PI / 2, u), i ? 0.7 : -0.4, lerp(0, i ? 1.2 : -0.6, u));
  }
}
function ponerManos(t) {
  const p2 = t >= P2, pa = planoActual;
  // la ficha de Toto: en la mano de Inés (P1 hasta que la tira; P2c en la izquierda)
  FICHA_MANO.visible = (!p2 && t < T.guarda - 0.05) || pa === "P2c";
  if (FICHA_MANO.visible) {
    const m = manoMundo(ines, "I", _a); ines.cuerpo.getWorldQuaternion(_q);
    FICHA_MANO.position.copy(m).add(V3(0, 0.03, 0)); FICHA_MANO.quaternion.copy(_q); FICHA_MANO.rotateX(-0.75); FICHA_MANO.rotateZ(0.12); FICHA_MANO.translateZ(0.03);
    if (pa === "P1" && t > T.guarda - 0.32) {
      // la tira al fichero: un arco corto de la mano a la ficha de adelante
      const u = eio(sg(t, T.guarda - 0.32, T.guarda - 0.05));
      FICHERO.updateMatrixWorld(true); const dst = FICHERO.localToWorld(V3(0, 0.06, zSlot(0)));
      FICHA_MANO.position.lerp(dst, u); FICHA_MANO.position.y += Math.sin(u * Math.PI) * 0.12;
      FICHERO.getWorldQuaternion(_q); FICHA_MANO.quaternion.slerp(_q, u);
    }
    dibujarFichaMano(pa === "P2c" ? 1 : sg(t, T.escribe[0], T.escribe[1]));
  }
  // el teléfono (P2c): en la mano derecha, después en su base
  TEL.visible = pa === "P2c";
  if (TEL.visible) { const m = manoMundo(ines, "D", _a); ines.cuerpo.getWorldQuaternion(_q); TEL.position.copy(m).add(V3(0, 0.05, 0)); TEL.quaternion.copy(_q); TEL.rotateZ(-0.3); TEL.rotateX(-0.2); TEL.translateZ(0.05); TEL.scale.setScalar(1.5); }
  // la bolsa de ración: en la mano de Vero (P4) y en el mostrador
  BOLSA.visible = !p2 && t >= T.p4 && pa !== "P6" && pa !== "P7";   // (r3) en P7 la cámara de costado la tendría en el eje
  if (BOLSA.visible) {
    if (t < T.bolsa) { const m = manoMundo(vero, "D", _a); BOLSA.position.copy(m).add(V3(0, -0.36, 0.0)); BOLSA.rotation.set(0, vero.raiz.rotation.y, 0); }
    else { BOLSA.position.set(MOS.x + 0.45, MOS.alto, MOS.z + 0.1); BOLSA.rotation.set(0, -0.25, 0); }
  }
  // las tablets de Inés y Bruno (Q3b)
  tabIn.visible = tabBr.visible = pa === "Q3"; if (!tabIn.userData.pan.material.map) for (const g of [tabIn, tabBr]) { g.userData.pan.material.map = pantT; g.userData.pan.material.needsUpdate = true; }
  for (const [g, per] of [[tabIn, ines], [tabBr, bruno]]) if (g.visible) { const a = manoMundo(per, "I", _a), b = manoMundo(per, "D", _b); per.cuerpo.getWorldQuaternion(_q); g.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.06, 0)); g.quaternion.copy(_q); g.rotateX(-0.95); }
  // el celular de Vero en el living
  celuV.visible = pa === "Q2b";
  if (celuV.visible) { const a = manoMundo(vero, "I", _a), b = manoMundo(vero, "D", _b); vero.cuerpo.getWorldQuaternion(_q); celuV.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0)); celuV.quaternion.copy(_q); celuV.rotateX(-0.7); }
  // la correa (P4-P7 y Q4): de la mano izquierda de Vero al collar de Toto
  const conCorrea = (!p2 && t >= T.p4 && pa !== "P6" && pa !== "P7") || (pa === "Q4" && t < T.corre[0] + 0.1);
  if (conCorrea) { toto.collar.updateMatrixWorld(true); ponerCorrea(manoMundo(vero, "I", _a).clone().add(V3(0, -0.05, 0)), toto.collar.localToWorld(V3(0, -0.02, 0.1)), true); } else ponerCorrea(null, null, false);
}
function ponerPuerta(t) {
  const u = Math.max(sg(t, T.entra[0] - 0.1, T.entra[0] + 0.3) * (1 - sg(t, T.entra[0] + 0.9, T.entra[0] + 1.3)), sg(t, T.campana - 0.1, T.campana + 0.3) * (1 - sg(t, T.campana + 0.9, T.campana + 1.3)));
  HOJA.rotation.y = 1.25 * eio(u);
}
const celuV = crearCelular(CELV.tex, C.navy2, 0.08, 0.162); celuV.scale.setScalar(1.25); scene.add(celuV);

// =====================================================================================================
// RENDER
// =====================================================================================================
let dbgCam = null;
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  noche(pa === "P2c");
  ponerSol(pa === "Q2b" ? 30 : pa.startsWith("P4") || pa === "P5" || pa === "P6" || pa === "P7" || pa === "P2c" ? 2.2 : -0.5, -0.5);
  dibujarInterfaz(t);
  // ---- personajes y perros (antes de la cámara: el plano del fichero sigue la ficha) ----
  const vis = {
    ines: pa !== "P2" && pa !== "P4b" && pa !== "Q2b" && pa !== "Q3c" && pa !== "Q5",
    vero: (!p2 && (t < T.p2 || t >= T.p4) && pa !== "P6" && pa !== "P7") || (p2 && (t < T.q2 || pa === "Q2b" || pa === "Q4")),
    bruno: pa === "P3" || pa === "P3b" || pa === "Q3",
    toto: pa !== "P2" && pa !== "P2c" && pa !== "P3" && pa !== "P3b" && pa !== "Q3" && pa !== "Q3c" && pa !== "Q5",
    sala: pa === "Q4" || pa === "Q4c" || pa === "Q4d",
  };
  ines.raiz.visible = vis.ines; vero.raiz.visible = vis.vero; bruno.raiz.visible = vis.bruno; toto.raiz.visible = vis.toto;
  for (const o of [donCoco.raiz, donaMora.raiz, coco.raiz, mora.raiz, TRANS]) o.visible = vis.sala;
  if (vis.toto) {
    const pt = poseToto(t); toto.poner(pt);
    toto.panuelo.visible = !p2 && t >= T.p4; toto.curita.visible = (!p2 && t < T.p2) || (p2 && t < T.q2);
    toto.chapita(p2 ? 0x5ce611 : 0xefeee5);
    toto.chapitaM.visible = !toto.panuelo.visible;
  }
  if (vis.ines) ines.poner(poseInes(t));
  if (vis.vero) vero.poner(poseVero(t));
  if (vis.bruno) bruno.poner(poseBruno(t));
  if (vis.sala) {
    donCoco.poner({ x: BANCO.x - 0.02, y: -0.08, z: -0.32, giro: -Math.PI / 2, sentado: 1, ...aC(0.2, 0.15), ...CARA.sonrisa, ...BRAZOS.costado, manoI: [0.2, 0.06, 0.32], manoD: [-0.2, 0.06, 0.32], t });
    donaMora.poner({ x: BANCO.x - 0.02, y: -0.08, z: -1.18, giro: -Math.PI / 2, sentado: 1, ...aC(-0.15, 0.25), ...CARA.sonrisa, ...BRAZOS.costado, manoI: [0.14, 0.12, 0.34], manoD: [-0.14, 0.12, 0.34], t });
    coco.poner({ x: BANCO.x - 0.5, z: -0.2, giro: -Math.PI / 2 - 0.3, sentado: 1, cola: 0.5, orejas: 0.9, cabeza: { giro: 0.4 }, t });
    const lap = toW(donaMora, [0, 0.03, 0.2]); mora.poner({ x: lap.x, y: lap.y - 0.02, z: lap.z, giro: -Math.PI / 2, sentado: 1, cola: 0.4, orejas: 0.5, cabeza: { giro: 0.3, asiente: -0.1 }, t });
  }
  if (CARTEL) CARTEL.visible = !(pa === "P4" || pa === "P6" || pa === "P7" || pa === "Q4");
  ponerFicheroLugar(t); ponerFichero(t); ponerCaidas(t); ponerPuerta(t);
  // ---- cámara ----
  if (pl[2] === "fichero") {
    FICHERO.updateMatrixWorld(true); const c = FT.g.localToWorld(V3(0, 0.1, 0));
    const k = sg(t, T.p2, T.p2c);
    ponerCam([c.x + lerp(0.06, 0.08, k), c.y + lerp(0.85, 0.9, k), c.z + lerp(0.36, 0.4, k), c.x - 0.005, c.y - 0.08, c.z - 0.06, 40], t);
  } else if (pl[2] === "q5") {
    tablet.updateMatrixWorld(true); const ct = tablet.userData.pantalla.localToWorld(V3(0, 0, 0)), nt = V3(0, 0, 1).transformDirection(tablet.userData.pantalla.matrixWorld);
    celuS.updateMatrixWorld(true); const cs = celuS.children[0].localToWorld(V3(0, 0.165 * 1.9 / 2, 0)), ns = V3(0, 0, 1).transformDirection(celuS.children[0].matrixWorld);
    // (r1) el panel entero y Sofi en el mismo cuadro; un push-in suave hacia Sofi (sin barrido)
    const c = ct.clone().lerp(cs, 0.3).add(V3(0, -0.035, 0)), n = nt.clone().add(ns).normalize();
    const u = eio(sg(t, T.q5, DUR)), d = lerp(1.12, 1.05, u), c2 = c.clone().lerp(cs, 0.05 * u);
    ponerCam([c2.x + n.x * d, c2.y + n.y * d + 0.03, c2.z + n.z * d, c2.x, c2.y, c2.z, 48], t);
  } else if (pl[2] === "q4") {
    // sigue a Toto desde la puerta hasta el consultorio
    const u = eio(sg(t, T.corre[0], T.corre[1])), tp = toto.raiz.position, k = sg(t, T.corre[0] - 0.1, T.corre[0] + 0.25);
    ponerCam([lerp(1.1, 0.5, u), lerp(1.5, 1.3, u), lerp(2.7, 2.6, u), lerp(3.5, tp.x, k), lerp(0.95, 0.6, u), lerp(-0.5, tp.z, k), 50], t);
  } else if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  ponerManos(t);
  tablet.visible = p2; celuS.visible = p2 && t >= T.q5 - 0.1;
  // ---- Sofi: su escena a la textura del celular parado ----
  if (pa === "Q5") {
    sofi.poner(poseSofi(t)); sofi.raiz.updateMatrixWorld(true);
    const c = sofi.cabeza.localToWorld(V3(0, 0.2, 0));
    SOFI.cam.position.set(c.x + 0.05, c.y + 0.02, c.z + 2.75); SOFI.cam.lookAt(c.x, c.y - 0.28, c.z);
    renderer.setRenderTarget(SOFI.rt); renderer.render(SOFI.esc, SOFI.cam); renderer.setRenderTarget(null);
  }
  // ---- insertos ----
  const INS = { Q1t: INSF, Q2: INSV, Q2c: INSV, Q3c: INSP }[pa];
  for (const I of [INSF, INSV, INSP]) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
  }
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- portada (VER=portada): Inés detrás del mostrador y Toto parado con las patas en el mostrador, de frente ----
  if (VER === "portada") {
    vero.raiz.visible = false; BOLSA.visible = false; ponerCorrea(null, null, false); toto.raiz.visible = true; ines.raiz.visible = true;
    ines.poner({ ...poseEn(t, [[0, { x: MOS.x + 0.42, z: INES_MOS.z + 0.05, giro: -0.3, inclina: 0.3, ...aC(-0.1, 0.22), ...SECO, ojos: { abiertos: 1, y: -0.5, x: -0.3 }, cejas: { alto: 0.05, ang: 0.35 }, ...BRAZOS.apoyado }]]), t });
    toto.poner({ x: MOS.x - 0.02, y: 0, z: MOS.z + MOS.d / 2 + 0.16, giro: 0.05, erguido: 0.85, orejas: 0, cejas: -1, cola: 0.05, colaAlta: 0.2, cabeza: { giro: 0.05, asiente: 0.15, ladea: 0.14 }, t });
    FICHERO.position.copy(FICH_MOS).add(V3(-0.05, 0, 0)); FICHERO.rotation.y = -0.2;
    ponerCam([MOS.x + 0.1, 1.3, MOS.z + 3.9, MOS.x + 0.1, 1.12, MOS.z + 0.1, 40], t); camera.updateMatrixWorld(true);
    for (const p of TODOS) if (p.raiz.visible) p.ojoLejano(camera.position);
  }
  // ---- tarjetas ----
  for (const k in GL) GL[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t);
  renderer.render(scene, camera);
}
function poseSofi(t) {
  const p = poseEn(t, [[0, { x: 0, z: 0, giro: 0, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.f1 + 1.2, { ...aC(0.08, 0.02), manoD: [-0.2, 0.4, 0.32], codoD: [-0.8, -0.6, 0] }, 0.4]]);
  const habla = sg(t, T.f1 - 0.15, T.f1) * (1 - sg(t, T.f1 + LEN.f1, T.f1 + LEN.f1 + 0.2));
  p.boca.sonrisa = lerp(p.boca.sonrisa, 0.15, habla);
  p.t = t; bocaVoz(p, t, T.f1, ENV.f1, 0.6); return p;
}
function tarjetas(t) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const pa = planoActual;
  const boca = (per) => bocaPx(per);
  if (pa === "P1") {
    ponerGlobo(GL.marzo, 160, 412, 1, null); ponerVenc(t, 230, 1290, 1);   // (r3) la cifra de vencidas sobre el fichero desde el cuadro 0
    if (t >= T.v1 && t < T.i1) { const [bx, by] = boca(vero); ponerGlobo(GL.v1, 760, 540, ent(T.v1), [bx, by - 30], 2); }
    if (t >= T.i1) { const [bx, by] = boca(ines); ponerGlobo(GL.i1, 330, 545, ent(T.i1), [bx, by - 60], 2); }
    if (t >= T.v1 + 0.6 && t < T.guarda - 0.2) { const [fx, fy] = objPx(FICHA_MANO); ponerFichaGL(t, 730, 1300, ent(T.v1 + 0.6)); ponerGuia(GUIAS[0], 560, 1080, fx, fy, eo(sg(t, T.v1 + 0.6, T.v1 + 0.85))); }
  }
  if (pa === "P2") {
    const m = T.mes.filter((x) => t >= x).length;
    if (m > 0) ponerGlobo([GL.abril, GL.mayo, GL.junioUn][m - 1], m === 3 ? 320 : 220, 180, ent(T.mes[m - 1]), null);
    ponerVenc(t, 820, 300, 1);
    FICHERO.updateMatrixWorld(true); const [tx, ty] = objPx(FT.g, V3(0, 0.15, 0));
    if (t >= T.mes[0] + 0.25) { ponerGlobo(GL.rToto, 540, 1400, ent(T.mes[0] + 0.25), null, 1); ponerGuia(GUIAS[0], 540, 1340, tx, ty, eo(sg(t, T.mes[0] + 0.25, T.mes[0] + 0.45))); }
  }
  if (pa === "P2c") {
    ponerGlobo(GL.noche, 300, 200, 1, null); ponerVenc(t, 300, 330, 1);
    if (t >= T.ladra) ponerGlobo(GL.guau, 800, 520, ent(T.ladra), [1180, 600], 1);
  }
  if (pa === "P3" || pa === "P3b") {
    ponerGlobo(GL.junio, 540, 200, 1, null);
    if (pa === "P3" && t >= T.b1 && t < T.i2) { const [bx, by] = boca(bruno); ponerGlobo(GL.b1, 620, 470, ent(T.b1), [bx, by - 30], 1); }
    if (t >= T.i2) { const [bx, by] = boca(ines); ponerGlobo(GL.i2, 540, 420, ent(T.i2), [bx, by - 30], 2); }
  }
  if (pa === "P4" || pa === "P4b") {
    ponerGlobo(GL.julio, 540, 200, 1, null);
    if (pa === "P4b" && t >= T.v2) { const [bx, by] = boca(vero); verGlobo(GL.v2, t >= T.v2 + 2.02 ? 99 : 9); /* (r3) "Ya está vacunado." entra en "Ya" (12,15 s) */ ponerGlobo(GL.v2, 540, 470, ent(T.p4b), [bx, by - 30], 1); }
  }
  if (pa === "P5") {
    const [fx, fy] = objPx(FICHERO, V3(0, 0.1, 0)); toto.raiz.updateMatrixWorld(true); const [px, py] = objPx(toto.collar, V3(0, -0.1, 0.12));
    const u0 = ent(T.rot[0]), u1 = ent(T.rot[1]), u2 = ent(T.rot[2]);
    ponerGlobo(GL.r1, 300, 1200, u0, null, 1); if (u0 > 0) ponerGuia(GUIAS[0], 300, 1130, fx, fy, eo(sg(t, T.rot[0], T.rot[0] + 0.25)));
    ponerGlobo(GL.r2, 300, 1390, u1, null, 1);
    ponerGlobo(GL.r3, 860, 1330, u2, null, 1); if (u2 > 0) ponerGuia(GUIAS[1], 860, 1260, px, py, eo(sg(t, T.rot[2], T.rot[2] + 0.25)));
  }
  if (pa === "P6" && t >= T.i3) { const [bx, by] = boca(ines); ponerGlobo(GL.i3, 540, 330, ent(T.i3), [bx, by - 20]); }
  if (pa === "Q1" || pa === "Q1b") {
    if (pa === "Q1") ponerGlobo(GL.marzo, 160, 412, 1, null);
    if (pa === "Q1" && t >= T.v1b && t < T.i4) { const [bx, by] = boca(vero); ponerGlobo(GL.v1, 760, 540, ent(T.v1b), [bx, by - 30], 2); }
    if (t >= T.i4) { const [bx, by] = boca(ines); ponerGlobo(GL.i4, 400, pa === "Q1b" ? 380 : 590, ent(T.i4), [bx, by - 30], 2); }
  }
  if (pa === "Q1t") ponerGlobo(GL.rFicha, 540, 180, 1, null);
  if (pa === "Q2" || pa === "Q2c") { ponerGlobo(GL.junio5, 540, 140, 1, null); ponerGlobo(GL.rRec, 540, 258, 1, null, 1); }
  if (pa === "Q2b" && t >= T.v3) { const [bx, by] = boca(vero); ponerGlobo(GL.v3, 680, 330, ent(T.v3), [bx, by - 30]); }
  if (pa === "Q3" && t >= T.b1b) { const [bx, by] = boca(bruno); ponerGlobo(GL.b1, 620, 430, ent(T.b1b), [bx, by - 30], 1); }
  if (pa === "Q3c" && t >= T.i5) ponerGlobo(GL.i5, 540, 220, ent(T.i5), null);
  if (pa === "Q4") ponerGlobo(GL.martes, 540, 200, ent(T.q4), null);
  if (pa === "Q4c" && t >= T.i6) { const [bx, by] = boca(ines); ponerGlobo(GL.i3, 540, 330, ent(T.i6), [bx, by - 30]); }
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); const vp = poseVero(t); return { plano: planoActual, vero: bocaPx(vero), vp: JSON.stringify(vp).slice(0, 900) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
