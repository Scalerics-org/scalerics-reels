// Capa 3D de taller-esta-pronto (Three.js r170 local). Infraestructura de reels/taller-presupuestos (el taller de día,
// el elevador, el sedán de juguete, la tablet) y de reels/dist-quien-debe (tarjetas pegadas a la cámara con la regla de
// burbujas, avatares por render target, la rotisería de Graciela con el spiedo, pantalla partida con scissor, cámara de
// frente a una pantalla). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni
// azar sin semilla.
// LUGARES: "Mecánica Óscar" (el taller lleno: el auto de Daniel clavado arriba en el elevador sin una rueda, el de
// Graciela en caballetes con Óscar abajo en la camilla con rueditas, el banquito con el celular, la pizarra de turnos),
// la rotisería de Graciela (x = 40) y el ómnibus de Daniel (x = 60).
//   PARTE 1: suena (GRACIELA), sale rodando: "Óscar, ¿está pronto?" / "A la tarde." · Maxi abajo del elevador: "Jefe, el
//            de Daniel: pierde la bomba de agua." · Daniel no contesta (×2), la foto, entregado y nada · la escalada
//            (WALTER, los cortes, el contador hasta 22, la pizarra tachada) · DANIEL: "¡Daniel!" / pantalla partida
//            "Óscar, ¿está pronto?" · la mirada al auto · "Está pronto para empezar." · la ruedita que se sale (24)
//   PARTE 2: el celular se prende solo (Aviso enviado) · Graciela: "¡Ay, mi autito!" · el panel · el mismo "Jefe…" /
//            "Mandale la foto." · el extra con Aprobar: "Dale, cambiala." · 12:30 baja el auto, la pizarra en verde,
//            "Pronto para retirar" y el timbre de parada · 17:30 "Maxi, ¿está pronto el mate?" / "A la tarde." · Óscar a
//            cámara: "Comentá PRONTO…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet, crearMate, crearTermo, crearBanquito, crearMochila } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"')]);

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const r2 = (n) => Math.round(n * 100) / 100;
const en = (t, a, b) => t >= a && t < b;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (a, b, u) => a.map((v, i) => lerp(v, b[i], u));

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
scene.background = new THREE.Color(0xe9ece6);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.03, 160);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x6a6a66);
  const tira = (w, h, x, y, z, ry, c, k) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide })); m.position.set(x, y, z); m.rotation.y = ry; env.add(m); };
  tira(10, 1.2, 0, 7, 0, 0, 0xf4f6f2, 1.4); tira(4, 6, 0, 2, -6, 0, 0xf6f6ee, 1.3); tira(1.4, 8, -4, 1, 6, 0, 0xe8eeff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer); const rt = pm.fromScene(env, 0.035); pm.dispose(); return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.5;

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, gp: 0xcfeebc, red: 0xc7655b, blanco: 0xf8f7f2, metal: 0xc4c8cf, kraft: 0xc9a46b, gris: 0xc9ccd2 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.75), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.75), cr2: mat(C.cr2, 0.75), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  blanco: mat(C.blanco, 0.85), metal: mat(C.metal, 0.3, { metalness: 0.5 }), acero: mat(0x8f969f, 0.35, { metalness: 0.6 }), goma: mat(0x23262c, 0.85),
  madera: mat(0xb98d5e, 0.8), pared: mat(0xece9dc, 0.92), asfalto: mat(0x50545c, 0.95), hormigon: mat(0xd9d7c9, 0.85),
  paragolpe: mat(0x3a3f4a, 0.6), kraft: mat(C.kraft, 0.85), gris: mat(C.gris, 0.4),
  vidrio: new THREE.MeshStandardMaterial({ color: 0xdfeaf2, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.22, depthWrite: false }),
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
const CAV = (s, w = 700) => `${w} ${s}px "Caveat", cursive`;
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const rr = (x, X, Y, W, H, R) => { x.beginPath(); x.roundRect(X, Y, W, H, R); x.fill(); };
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
function renglones(x, txt, ancho) { const ws = txt.split(" "), out = []; let l = ""; for (const w of ws) { const p = l ? l + " " + w : w; if (x.measureText(p).width > ancho && l) { out.push(l); l = w; } else l = p; } if (l) out.push(l); return out; }
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

// ---------- luces del taller: el mediodía entra por el portón ----------
const sol = new THREE.DirectionalLight(0xfff8ec, 1.55);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 0.5, far: 30 });
scene.add(sol, sol.target);
sol.position.set(3, 9, -9.5); sol.target.position.set(0, 0.6, -1.5);
const cielo = new THREE.HemisphereLight(0xf8faf6, 0x8a8678, 1.75); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xf4f6ff, 0.8); relleno.position.set(2, 3.5, 9); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xfff6e6, 0.45); rim.position.set(-4, 5, -10); scene.add(rim);

// =====================================================================================================
// EL AUTO: el sedán de juguete de taller-presupuestos, en el color de cada uno, vidrios navy, paragolpes gris oscuro,
// ruedas negras con llanta crema, patente inventada. Mira hacia +z; su izquierda es +x. Origen en el piso, en el centro.
// =====================================================================================================
const llantaT = lienzo(256, 256, (x, w) => { x.fillStyle = "#23262c"; x.fillRect(0, 0, w, w); x.fillStyle = "#efeee5"; x.beginPath(); x.arc(w / 2, w / 2, w * 0.3, 0, 7); x.fill(); x.fillStyle = "#b4b2a3"; for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; x.beginPath(); x.arc(w / 2 + Math.cos(a) * w * 0.17, w / 2 + Math.sin(a) * w * 0.17, w * 0.045, 0, 7); x.fill(); } x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, w / 2, w * 0.07, 0, 7); x.fill(); });
const ML = { vidrio: mat(0x3a5480, 0.12, { metalness: 0.25 }), interior: mat(0x1f3254, 0.9), faro: new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff4d0, emissiveIntensity: 0.6, roughness: 0.2 }), llanta: new THREE.MeshStandardMaterial({ map: llantaT, roughness: 0.6 }) };
function crearRueda() { const r = new THREE.Group(); const cub = mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 28), [M.goma, ML.llanta, ML.llanta]); cub.rotation.z = Math.PI / 2; r.add(cub); return sombras(r); }
function crearAuto(color, patente) {
  const carro = mat(color, 0.45);
  const patenteT = lienzo(512, 150, (x, w, h) => { x.fillStyle = "#f8f7f2"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, patente, 800, 104, w - 50); x.fillText(patente, w / 2, h / 2 + 4); });
  const g = new THREE.Group();
  const L = 3.3, W = 1.5;
  g.add(caja(W, 0.5, L, carro, 0, 0.53, 0, 0.16));
  const capot = new THREE.Group(); capot.position.set(0, 0.77, 0.56); g.add(capot);
  capot.add(caja(W - 0.04, 0.08, 1.05, carro, 0, 0, 0.52, 0.04));
  g.add(caja(W - 0.04, 0.1, 0.75, carro, 0, 0.79, -1.22, 0.05));
  const cab = new THREE.Group(); g.add(cab);
  cab.add(caja(W - 0.06, 0.13, 1.5, M.navy3, 0, 1.26, -0.15, 0.06));
  for (const sx of [-1, 1]) for (const [z, inc] of [[0.58, 0.35], [-0.12, 0], [-0.88, -0.3]]) { const p = caja(0.07, 0.44, 0.08, carro, sx * (W / 2 - 0.08), 1.02, z, 0.02); p.rotation.x = inc; cab.add(p); }
  const para = caja(W - 0.18, 0.46, 0.03, ML.vidrio, 0, 1.02, 0.62, 0.02); para.rotation.x = 0.6; cab.add(para);
  const luneta = caja(W - 0.18, 0.44, 0.03, ML.vidrio, 0, 1.02, -0.92, 0.02); luneta.rotation.x = -0.5; cab.add(luneta);
  for (const sx of [-1, 1]) { cab.add(caja(0.03, 0.36, 0.66, ML.vidrio, sx * (W / 2 - 0.08), 1.02, -0.5, 0.02)); cab.add(caja(0.03, 0.36, 0.6, ML.vidrio, sx * (W / 2 - 0.08), 1.02, 0.24, 0.02)); }
  for (const z of [0.15, -0.5]) cab.add(caja(W - 0.3, 0.42, 0.42, ML.interior, 0, 0.9, z, 0.06));
  for (const sx of [-1, 1]) { const f = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.04, 20), ML.faro, sx * 0.5, 0.64, L / 2 + 0.01); f.rotation.x = Math.PI / 2; g.add(f); g.add(caja(0.26, 0.1, 0.04, M.red, sx * 0.52, 0.66, -L / 2 - 0.005, 0.02)); }
  for (let i = 0; i < 3; i++) g.add(caja(0.52, 0.035, 0.03, M.navy3, 0, 0.58 + i * 0.07, L / 2 + 0.01, 0.01));
  for (const sz of [-1, 1]) {
    g.add(caja(W + 0.04, 0.16, 0.14, M.paragolpe, 0, 0.36, sz * (L / 2 + 0.02), 0.05));
    const pat = plano(0.42, 0.123, patenteT, 0, 0.37, sz * (L / 2 + 0.095)); if (sz < 0) pat.rotation.y = Math.PI; g.add(pat);
  }
  for (const sx of [-1, 1]) { g.add(caja(0.1, 0.07, 0.12, carro, sx * (W / 2 + 0.04), 0.9, 0.55, 0.02)); for (const z of [0.0, -0.7]) g.add(caja(0.02, 0.03, 0.12, M.paragolpe, sx * (W / 2 + 0.005), 0.72, z, 0.01)); }
  // la panza (se ve desde abajo en el elevador): chapa navy, el túnel, el escape
  g.add(caja(W - 0.2, 0.03, L - 0.5, M.navy3, 0, 0.27, 0, 0.01));
  g.add(caja(0.26, 0.08, 1.8, M.navy2, 0, 0.24, -0.3, 0.02));
  { const esc = mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.2, 10), M.acero, -0.35, 0.22, -0.4); esc.rotation.x = Math.PI / 2; g.add(esc); g.add(caja(0.3, 0.12, 0.45, M.acero, -0.35, 0.21, -1.25, 0.04)); }
  const ruedas = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const r = crearRueda(); r.position.set(sx * (W / 2 - 0.08), 0.3, sz * 1.05); g.add(r); r.userData = { sx, sz }; ruedas.push(r); }
  g.userData = { patentes: g.children.filter((o) => o.isMesh && o.material.map === patenteT), ruedas, capot, rueda: (sx, sz) => ruedas.find((r) => r.userData.sx === sx && r.userData.sz === sz) };
  return sombras(g);
}

// =====================================================================================================
// EL TALLER (de taller-presupuestos): pared del fondo z = -5 con el portón, el elevador, el banco, el panel de
// herramientas, el carro; nuevo: la pizarra de turnos, el tablero de llaves, la radio
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const ZF = -5.0, HW = 4.4;
const PORTON = { x0: -1.95, x1: 1.55, alto: 3.0 };
const LX = -0.2, LZ = -3.05;
const COL = [LX - 1.3, LX + 1.3];
const BANCO = { x: -1.82, z0: 0.9, z1: 3.3, alto: 0.94, prof: 0.7 };
const ALTO_EL = 2.05;
const PANEL = { x0: -4.6, x1: -2.5, y0: 0.95, y1: 2.15 };
const BOTONERA = { x: -2.05, z: -2.85 };
const PIZ = { x: 2.7, y: 1.62, w: 2.1, h: 1.4 };   // la pizarra de turnos (pared del fondo, a la derecha del portón)
const bloqueT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; for (let i = 0; i < 4; i++) { x.fillRect(0, i * 128, w, 6); for (let j = 0; j < 3; j++) x.fillRect(((j * 2 + (i % 2)) * 256) / 2 % w, i * 128, 6, 128); } });
bloqueT.wrapS = bloqueT.wrapT = THREE.RepeatWrapping;
let luzPorton;
{
  const piso = mesh(new THREE.PlaneGeometry(13, 15), M.hormigon, 0, 0, 2.0); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  const franja = (w, d, x, z) => { const f = mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ color: C.g }), x, 0.004, z); f.rotation.x = -Math.PI / 2; f.castShadow = false; SET.add(f); };
  const fx0 = COL[0] - 0.45, fx1 = COL[1] + 0.45, fz0 = LZ - 2.05, fz1 = LZ + 2.05;
  franja(fx1 - fx0, 0.09, (fx0 + fx1) / 2, fz0); franja(fx1 - fx0, 0.09, (fx0 + fx1) / 2, fz1); franja(0.09, fz1 - fz0, fx0, (fz0 + fz1) / 2); franja(0.09, fz1 - fz0, fx1, (fz0 + fz1) / 2);
  { const s = new THREE.Shape(); s.moveTo(PORTON.x0, 0); s.lineTo(PORTON.x1, 0); s.lineTo(PORTON.x1 + 0.9, 2.6); s.lineTo(PORTON.x0 + 0.5, 2.6); s.closePath();
    luzPorton = new THREE.Mesh(new THREE.ShapeGeometry(s), new THREE.MeshBasicMaterial({ color: 0xf6f2e4, transparent: true, opacity: 0.55, depthWrite: false })); luzPorton.rotation.x = Math.PI / 2; luzPorton.position.set(0, 0.006, ZF); luzPorton.renderOrder = 1; scene.add(luzPorton); }
  const tramo = (x0, x1, y0, y1, z = ZF) => {
    const w = x1 - x0;
    if (y0 < 2.2) { const hb = Math.min(2.2, y1) - y0, t = bloqueT.clone(); t.needsUpdate = true; t.repeat.set(w / 1.6, hb / 1.6); const b = mesh(new THREE.BoxGeometry(w, hb, 0.2), [M.navy2, M.navy2, M.navy2, M.navy2, new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }), M.navy2], (x0 + x1) / 2, y0 + hb / 2, z); b.castShadow = false; SET.add(b); }
    if (y1 > 2.2) { const y = Math.max(2.2, y0), c = mesh(new THREE.BoxGeometry(w, y1 - y, 0.2), M.pared, (x0 + x1) / 2, (y + y1) / 2, z); c.castShadow = false; SET.add(c); }
  };
  tramo(-6.5, PORTON.x0, 0, HW); tramo(PORTON.x1, 6.5, 0, HW); tramo(PORTON.x0, PORTON.x1, PORTON.alto, HW);
  for (const sx of [-1, 1]) { const g = new THREE.Group(); g.position.set(sx * 6.4, 0, 0); g.rotation.y = -sx * Math.PI / 2; SET.add(g); const b = mesh(new THREE.BoxGeometry(13, 2.2, 0.2), M.navy2, 0, 1.1, 0); b.castShadow = false; g.add(b); const c = mesh(new THREE.BoxGeometry(13, HW - 2.2, 0.2), M.pared, 0, 2.2 + (HW - 2.2) / 2, 0); c.castShadow = false; g.add(c); }
  // la pared de atrás de la cámara (z = 7.5): que los contraplanos no vean el vacío
  { const b = mesh(new THREE.BoxGeometry(13, 2.2, 0.2), M.navy2, 0, 1.1, 9.0); b.castShadow = false; SET.add(b); const c = mesh(new THREE.BoxGeometry(13, HW - 2.2, 0.2), M.pared, 0, 2.2 + (HW - 2.2) / 2, 9.0); c.castShadow = false; SET.add(c); }
  const techo = mesh(new THREE.PlaneGeometry(13, 15), new THREE.MeshBasicMaterial({ color: 0xdedbcd }), 0, HW, 2.0); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
  for (const z of [-2.5, 1.0, 4.5]) SET.add(caja(13, 0.22, 0.2, M.navy3, 0, HW - 0.11, z, 0.01));
  for (const x of [PORTON.x0 - 0.08, PORTON.x1 + 0.08]) SET.add(caja(0.16, PORTON.alto + 0.1, 0.3, M.navy3, x, (PORTON.alto + 0.1) / 2, ZF + 0.08, 0.02));
  SET.add(caja(PORTON.x1 - PORTON.x0 + 0.32, 0.16, 0.3, M.navy3, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto + 0.04, ZF + 0.08, 0.02));
  { const rollo = mesh(new THREE.CylinderGeometry(0.22, 0.22, PORTON.x1 - PORTON.x0 + 0.2, 28), M.cr, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto - 0.16, ZF + 0.42); rollo.rotation.z = Math.PI / 2; SET.add(rollo); }
  // el cordón del portón (la ruedita se frena acá)
  SET.add(caja(PORTON.x1 - PORTON.x0, 0.06, 0.12, M.cr3, (PORTON.x0 + PORTON.x1) / 2, 0.03, ZF + 0.12, 0.01));
  const af = (w, d, x, z, m, y = 0) => { const p = mesh(new THREE.PlaneGeometry(w, d), m, x, y, z); p.rotation.x = -Math.PI / 2; p.castShadow = false; SET.add(p); };
  af(30, 1.8, 0, ZF - 1.0, M.cr, 0.12); SET.add(caja(30, 0.12, 0.14, M.cr3, 0, 0.06, ZF - 1.93, 0.02));
  af(30, 4.2, 0, ZF - 4.0, M.asfalto, 0.0);
  for (let i = -6; i <= 6; i++) af(1.2, 0.12, i * 2.4, ZF - 4.0, M.cr, 0.003);
  af(30, 2.0, 0, ZF - 7.1, M.cr, 0.12);
  const fach = mesh(new THREE.BoxGeometry(30, 5, 0.3), M.pared, 0, 2.5, ZF - 8.2); fach.castShadow = false; SET.add(fach);
  for (let i = -4; i <= 4; i++) { SET.add(caja(1.1, 1.3, 0.08, M.navy3, i * 2.6 + 0.6, 2.4, ZF - 8.02, 0.03)); SET.add(caja(0.96, 1.16, 0.06, mat(0x2c4268, 0.3), i * 2.6 + 0.6, 2.4, ZF - 7.99, 0.02)); }
  SET.add(caja(30, 0.5, 0.1, M.g, 0, 0.25, ZF - 8.02, 0.02));
  { const g = new THREE.Group(); g.position.set(PORTON.x1 + 0.4, 0.12, ZF - 7.0); SET.add(g);
    g.add(mesh(new THREE.CylinderGeometry(0.08, 0.11, 1.9, 8), mat(0x6b4a32, 0.9), 0, 0.95, 0));
    semilla = 5; for (let i = 0; i < 5; i++) g.add(mesh(new THREE.IcosahedronGeometry(0.55 + az() * 0.2, 0), i % 2 ? M.gd : M.g, (az() - 0.5) * 0.7, 2.25 + az() * 0.55, (az() - 0.5) * 0.5)); }
}
// ---- el elevador de dos columnas ----
const ELEV = { g: new THREE.Group(), brazos: [] };
{
  SET.add(ELEV.g);
  for (const x of COL) { SET.add(caja(0.3, 3.4, 0.34, M.navy3, x, 1.7, LZ, 0.03)); SET.add(caja(0.5, 0.04, 0.6, M.navy3, x, 0.02, LZ, 0.01)); SET.add(caja(0.06, 3.1, 0.06, M.acero, x + Math.sign(LX - x) * 0.17, 1.65, LZ + 0.12, 0.01)); }
  SET.add(caja(COL[1] - COL[0] + 0.3, 0.16, 0.26, M.navy3, LX, 3.48, LZ, 0.02));
  SET.add(caja(0.12, 1.0, 0.12, M.navy3, BOTONERA.x, 0.5, BOTONERA.z, 0.02)); SET.add(caja(0.24, 0.3, 0.16, M.cr, BOTONERA.x, 1.12, BOTONERA.z, 0.03));
  SET.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16).rotateX(Math.PI / 2), M.g, BOTONERA.x, 1.16, BOTONERA.z + 0.09));
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
function ponerElevador(h, abre) {
  for (const b of ELEV.brazos) {
    b.carro.position.y = h - 0.17;
    const xp = b.carro.position.x, dx = (LX - b.sx * 0.55) - xp, dz = b.sz * 0.95 - b.sz * 0.14;
    const aCerr = Math.atan2(dx, dz), aAb = b.sz > 0 ? -b.sx * 0.18 : Math.PI + b.sx * 0.18;
    b.piv.rotation.y = lerp(aCerr, aAb, abre);
  }
}
// ---- el banco de trabajo (adelante a la izquierda), la radio, el mate y el termo de Óscar ----
const trapoT = lienzo(256, 256, (x, w) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, w); x.fillStyle = "rgba(58,63,74,0.55)"; for (const [cx, cy, r] of [[70, 80, 34], [170, 160, 26], [120, 200, 18]]) { x.beginPath(); x.ellipse(cx, cy, r, r * 0.7, 0.5, 0, 7); x.fill(); } });
{
  const g = new THREE.Group(); g.position.set(BANCO.x, 0, (BANCO.z0 + BANCO.z1) / 2); SET.add(g);
  const L = BANCO.z1 - BANCO.z0, P = BANCO.prof, H = BANCO.alto;
  g.add(caja(P, 0.08, L, M.madera, 0, H - 0.04, 0, 0.015));
  g.add(caja(P - 0.06, H - 0.1, L - 0.08, M.navy3, 0, (H - 0.1) / 2, 0, 0.02));
  for (let i = 0; i < 3; i++) { g.add(caja(0.02, 0.22, 0.62, M.navy2, P / 2 - 0.025, H - 0.26, -L / 2 + 0.45 + i * 0.75, 0.01)); g.add(caja(0.03, 0.03, 0.18, M.g, P / 2 - 0.005, H - 0.26, -L / 2 + 0.45 + i * 0.75, 0.01)); }
  const mo = new THREE.Group(); mo.position.set(0.12, H, L / 2 - 0.22); g.add(mo);
  mo.add(caja(0.2, 0.06, 0.24, M.acero, 0, 0.03, 0, 0.01)); mo.add(caja(0.18, 0.16, 0.08, M.acero, 0, 0.14, 0.06, 0.01)); mo.add(caja(0.18, 0.16, 0.08, M.acero, 0, 0.14, -0.06, 0.01));
  // la radio vieja: crema con frente navy, perilla verde, antena, una mancha de grasa
  const ra = new THREE.Group(); ra.position.set(-0.05, H, -L / 2 + 0.35); ra.rotation.y = Math.PI / 2; g.add(ra);
  ra.add(caja(0.34, 0.2, 0.12, M.cr, 0, 0.1, 0, 0.03)); ra.add(caja(0.2, 0.14, 0.01, M.navy2, -0.05, 0.1, 0.061, 0.01));
  ra.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 14).rotateX(Math.PI / 2), M.g, 0.11, 0.12, 0.065));
  { const an = mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.42, 6), M.metal, 0.12, 0.38, -0.02); an.rotation.z = -0.4; ra.add(an); }
  const bi = new THREE.Group(); bi.position.set(P / 2 + 0.2, 0, 0.95); g.add(bi);
  bi.add(caja(0.22, 0.34, 0.15, M.cr, 0, 0.17, 0, 0.03)); bi.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 12), M.navy, 0.05, 0.36, 0));
  const la = new THREE.Group(); la.position.set(0.05, 2.05, -0.45); g.add(la);
  la.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, HW - 2.05, 6), M.navy, 0, (HW - 2.05) / 2 + 0.2, 0));
  la.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.36, 14), new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff3d2, emissiveIntensity: 1.1 }), 0, 0, 0));
  for (const y of [-0.15, 0, 0.15]) { const a = mesh(new THREE.TorusGeometry(0.06, 0.007, 6, 18), M.navy3, 0, y, 0); a.rotation.x = Math.PI / 2; la.add(a); }
}
// ---- el panel de herramientas (pared del fondo, a la izquierda del portón) ----
const panelT = lienzo(1024, 586, (x, w, h) => {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#d9d7c9"; for (let i = 18; i < w; i += 36) for (let j = 18; j < h; j += 36) { x.beginPath(); x.arc(i, j, 4.5, 0, 7); x.fill(); }
  const k = 1024 / 2.1, px = (X) => (X - PANEL.x0) * k, py = (Y) => (PANEL.y1 - Y) * k;
  x.fillStyle = "#16243d";
  for (let i = 0; i < 6; i++) { const X = PANEL.x0 + 0.18 + i * 0.1, L = 0.22 + i * 0.035; rr(x, px(X) - 9, py(1.95), 18, L * k, 9); }
  for (let i = 0; i < 4; i++) { const X = PANEL.x0 + 0.95 + i * 0.12; rr(x, px(X) - 14, py(1.95), 28, 0.14 * k, 10); }
  rr(x, px(PANEL.x0 + 1.6) - 10, py(1.98), 20, 0.3 * k, 8); rr(x, px(PANEL.x0 + 1.6) - 60, py(1.98) - 6, 120, 34, 10);
});
{
  const g = new THREE.Group(); SET.add(g);
  const W = PANEL.x1 - PANEL.x0, H = PANEL.y1 - PANEL.y0;
  g.add(caja(W + 0.08, H + 0.08, 0.04, M.navy3, (PANEL.x0 + PANEL.x1) / 2, (PANEL.y0 + PANEL.y1) / 2, ZF + 0.12, 0.01));
  g.add(plano(W, H, panelT, (PANEL.x0 + PANEL.x1) / 2, (PANEL.y0 + PANEL.y1) / 2, ZF + 0.142));
  const z = ZF + 0.17;
  for (let i = 0; i < 6; i++) { const X = PANEL.x0 + 0.18 + i * 0.1, L = 0.22 + i * 0.035; g.add(caja(0.032, L, 0.012, M.acero, X, 1.95 - L / 2, z, 0.006)); }
  for (let i = 0; i < 4; i++) { const X = PANEL.x0 + 0.95 + i * 0.12; g.add(caja(0.055, 0.14, 0.05, i % 2 ? M.navy : M.g, X, 1.95 - 0.07, z + 0.01, 0.02)); }
  g.add(caja(0.035, 0.3, 0.03, M.madera, PANEL.x0 + 1.6, 1.98 - 0.15, z, 0.01)); g.add(caja(0.24, 0.06, 0.06, M.acero, PANEL.x0 + 1.6, 1.98, z + 0.01, 0.01));
}
// ---- el carro de herramientas, la pila de cubiertas y el gato ----
{
  const g = new THREE.Group(); g.position.set(-4.0, 0, ZF + 1.0); g.rotation.y = 0.25; SET.add(g);
  g.add(caja(0.72, 0.82, 0.46, M.navy3, 0, 0.53, 0, 0.03)); g.add(caja(0.76, 0.04, 0.5, M.navy, 0, 0.96, 0, 0.01));
  for (let i = 0; i < 5; i++) { const y = 0.24 + i * 0.15; g.add(caja(0.66, 0.12, 0.03, M.navy2, 0, y, 0.24, 0.01)); g.add(caja(0.3, 0.025, 0.03, M.g, 0, y + 0.02, 0.27, 0.008)); }
}
const bandaT = lienzo(512, 64, (x, w, h) => { x.fillStyle = "#23262c"; x.fillRect(0, 0, w, h); x.fillStyle = "#3a3f4a"; for (let i = 0; i < 32; i++) { x.fillRect(i * 16, 8, 6, 20); x.fillRect(i * 16 + 8, 36, 6, 20); } });
bandaT.wrapS = THREE.RepeatWrapping; bandaT.repeat.set(3, 1);
function crearCubierta() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.2, 32, 1, true), new THREE.MeshStandardMaterial({ map: bandaT, roughness: 0.9, side: THREE.DoubleSide })));
  for (const s of [-1, 1]) { const a = mesh(new THREE.RingGeometry(0.17, 0.34, 32), new THREE.MeshStandardMaterial({ color: 0x2a2d33, roughness: 0.9, side: THREE.DoubleSide }), 0, s * 0.1, 0); a.rotation.x = Math.PI / 2; g.add(a); }
  return g;
}
{ const P = new THREE.Group(); P.position.set(4.6, 0, -3.6); SET.add(P); for (let i = 0; i < 4; i++) { const c = crearCubierta(); c.position.set((i % 2) * 0.03, 0.1 + i * 0.2, 0); c.rotation.y = i * 0.7; P.add(c); } sombras(P); }
// ---- la pizarra de turnos (crema, marco navy, escrita a mano en Caveat navy); se tachan (P4) y se tildan (Q4) ----
const TURNOS = [["9:00", "PABLO"], ["10:30", "ANDRÉS"], ["14:00", "NELLY"], ["16:00", "RAMÓN"]];
const pizT = lienzo(1200, 800, () => {});
function dibujarPizarra(tachados, tildes) {
  const { x } = pizT.userData, w = 1200, h = 800;
  x.fillStyle = "#f4f3ec"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.textBaseline = "alphabetic"; x.textAlign = "left";
  x.font = CAV(112); x.fillText("Miércoles · turnos", 60, 130);
  x.fillRect(60, 158, 760, 8);
  TURNOS.forEach(([hh, nom], i) => {
    const y = 290 + i * 140;
    x.fillStyle = "#16243d"; x.font = CAV(96); x.fillText(`${hh} · SERVICE · ${nom}`, 60, y, 990);
    const u = cl(tachados - i);
    if (u > 0) { x.strokeStyle = "#c7655b"; x.lineWidth = 20; x.lineCap = "round"; x.beginPath(); x.moveTo(50, y - 34); x.lineTo(50 + 1040 * u, y - 30 - 8 * Math.sin(u * 3)); x.stroke(); }
    if (tildes > i) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(1128, y - 32, 46, 0, 7); x.fill(); tilde(x, 1130, y - 30, 50, "#0b1220", 15); }
  });
  pizT.needsUpdate = true;
}
dibujarPizarra(0, 0);
{
  const g = new THREE.Group(); g.position.set(PIZ.x, PIZ.y, ZF + 0.12); SET.add(g);
  g.add(caja(PIZ.w + 0.1, PIZ.h + 0.1, 0.05, M.navy3, 0, 0, 0, 0.02));
  const p = plano(PIZ.w, PIZ.h, pizT, 0, 0, 0.03); p.material.emissive = new THREE.Color(0xffffff); p.material.emissiveMap = pizT; p.material.emissiveIntensity = 0.15; g.add(p);
  g.add(caja(PIZ.w * 0.6, 0.04, 0.08, M.navy3, 0, -PIZ.h / 2 - 0.06, 0.05, 0.01));
  g.add(caja(0.14, 0.025, 0.025, M.navy, 0.3, -PIZ.h / 2 - 0.02, 0.09, 0.01));   // el fibrón
}
// ---- el tablero de llaves (madera navy3 con ganchos y etiquetas kraft), a la derecha de la pizarra ----
const LLAVES = ["GRACIELA", "WALTER", "SERGIO", "DANIEL", "FABIÁN"];
{
  const g = new THREE.Group(); g.position.set(4.55, 1.55, ZF + 0.12); SET.add(g);
  g.add(caja(0.9, 0.62, 0.04, M.navy3, 0, 0, 0, 0.02));
  LLAVES.forEach((n, i) => {
    const cx = -0.34 + (i % 3) * 0.34, cy = 0.15 - Math.floor(i / 3) * 0.3;
    g.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.05, 6).rotateX(Math.PI / 2), M.acero, cx, cy + 0.08, 0.04));
    g.add(caja(0.02, 0.06, 0.01, M.acero, cx, cy + 0.03, 0.05, 0.004));
    const et = lienzo(256, 100, (x, w, h) => { x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = CAV(64); x.fillText(n, w / 2, h / 2 + 4); });
    g.add(plano(0.26, 0.1, et, cx, cy - 0.04, 0.055));
  });
}
// ---- otro auto al fondo, con el capó abierto (verde apagado), a la derecha ----
const autoFondo = crearAuto(0x365f28, "SCD 1142"); autoFondo.position.set(3.75, 0, 2.7); autoFondo.rotation.y = -0.2; autoFondo.userData.capot.rotation.x = -0.9; SET.add(autoFondo);
fusionar(SET, [ELEV.g]);

// =====================================================================================================
// LOS AUTOS DEL CHISTE: el de Daniel (navy claro) clavado en el elevador sin la rueda delantera izquierda, con la bomba de
// agua que gotea; el de Graciela (crema) en caballetes con Óscar abajo
// =====================================================================================================
const autoD = crearAuto(0x4d6a96, "STR 7720"); scene.add(autoD);
const RUEDA_D = autoD.userData.rueda(1, 1);          // la delantera izquierda: está apoyada contra la columna
const ruedaSuelta = crearRueda(); ruedaSuelta.position.set(COL[1] + 0.5, 0.3, LZ + 0.55); ruedaSuelta.rotation.set(0, 0.25, -0.12); scene.add(ruedaSuelta);
// la bomba de agua (vista desde abajo del motor): el bloque, la bomba gris con la polea, la correa, dos mangueras
const BOMBA = new THREE.Group(); autoD.add(BOMBA); BOMBA.position.set(0.5, 0.13, 1.22); BOMBA.rotation.y = Math.PI / 2; BOMBA.scale.setScalar(1.45);
const bombaM = mat(0xb9c0c8, 0.4, { metalness: 0.25 }), bombaNueva = mat(0xe4e8ec, 0.25, { metalness: 0.35 });
{
  autoD.add(caja(0.8, 0.22, 0.6, mat(0x3a3f4a, 0.55), 0, 0.2, 1.0, 0.04));   // el bloque del motor
  // la brida atornillada al bloque, el cuerpo de aluminio, la polea navy con cuatro tornillos crema y el cubo
  BOMBA.add(caja(0.22, 0.2, 0.03, M.acero, 0, 0, -0.07, 0.03));
  const cuerpo = mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.12, 22), bombaM, 0, 0, 0); cuerpo.rotation.x = Math.PI / 2; BOMBA.add(cuerpo); BOMBA.userData.cuerpo = cuerpo;
  const polea = mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.035, 28), M.navy3, 0, 0, 0.08); polea.rotation.x = Math.PI / 2; BOMBA.add(polea);
  const ranura = mesh(new THREE.TorusGeometry(0.12, 0.01, 6, 28), M.navy, 0, 0, 0.08); BOMBA.add(ranura);
  for (let k = 0; k < 4; k++) { const a = (k / 4) * Math.PI * 2 + 0.4; BOMBA.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.02, 10).rotateX(Math.PI / 2), M.cr, Math.cos(a) * 0.06, Math.sin(a) * 0.06, 0.1)); }
  BOMBA.add(mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.03, 14).rotateX(Math.PI / 2), M.acero, 0, 0, 0.11));
  // dos mangueras negras que salen del cuerpo hacia el motor
  for (const [dx, dy, rz] of [[-0.1, 0.06, 0.9], [0.1, 0.07, -0.9]]) { const m = mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.22, 10), M.goma, dx, dy, -0.02); m.rotation.set(0, 0, rz); BOMBA.add(m); }
  const humedo = mesh(new THREE.SphereGeometry(1, 14, 10), new THREE.MeshStandardMaterial({ color: 0x7fc4dd, roughness: 0.1, transparent: true, opacity: 0.85 }), 0, -0.08, 0.0); humedo.scale.set(0.06, 0.02, 0.06); BOMBA.add(humedo); BOMBA.userData.humedo = humedo;
}
const BANDEJA = caja(0.5, 0.05, 0.36, M.navy3, LX + 0.28, 0.025, LZ + 1.15, 0.02); scene.add(BANDEJA);
const charco = mesh(new THREE.CircleGeometry(0.11, 20), mat(0x7fc4dd, 0.15, { transparent: true, opacity: 0.85 }), LX + 0.28, 0.052, LZ + 1.15); charco.rotation.x = -Math.PI / 2; scene.add(charco);
const GOTA = mesh(new THREE.SphereGeometry(0.02, 12, 10), new THREE.MeshStandardMaterial({ color: 0x9fd8ec, emissive: 0x4a8aa0, emissiveIntensity: 0.35, roughness: 0.05, transparent: true, opacity: 0.92 })); GOTA.scale.set(1, 1.5, 1); scene.add(GOTA);
// el auto de Graciela (crema, en cuatro caballetes navy)
const autoG = crearAuto(0xefeee5, "SAB 3315"); scene.add(autoG);
const GZ = 1.0, GX = 0.15, LIFT = 0.42;
autoG.position.set(GX, LIFT, GZ);
for (const r of autoG.userData.ruedas) r.position.y = 0.3 - 0.08;   // las ruedas cuelgan un poco
{
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const c = new THREE.Group(); c.position.set(GX + sx * 0.5, 0, GZ + sz * 0.7); scene.add(c);
    for (let k = 0; k < 3; k++) { const a = (k / 3) * Math.PI * 2; const p = mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.5, 6), M.navy3, Math.cos(a) * 0.09, 0.22, Math.sin(a) * 0.09); p.rotation.set(Math.sin(a) * 0.35, 0, -Math.cos(a) * 0.35); c.add(p); }
    c.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.25, 10), M.g, 0, 0.5, 0));
    c.add(caja(0.1, 0.03, 0.1, M.navy3, 0, LIFT + 0.27 - 0.015 - 0.01, 0, 0.01));
    sombras(c);
  }
}

// =====================================================================================================
// LA CAMILLA CON RUEDITAS (EL objeto del chiste): tabla baja acolchada navy3 con costuras crema, apoyacabeza crema,
// bastidor de caño gris acero, seis rueditas giratorias negras (una se sale en P7; en la parte 2 hay una nueva verde)
// =====================================================================================================
const CAMILLA = { g: new THREE.Group(), ruedas: [], largo: 1.05, ancho: 0.46 };
const RR = 0.035, ALTO_TABLA = 0.13;   // radio de las rueditas, la cara de arriba del acolchado
{
  const g = CAMILLA.g; scene.add(g);
  const L = CAMILLA.largo, A = CAMILLA.ancho;
  // bastidor de caño
  for (const sx of [-1, 1]) { const c = mesh(new THREE.CylinderGeometry(0.014, 0.014, L, 10), M.acero, sx * (A / 2 - 0.02), 0.085, 0); c.rotation.x = Math.PI / 2; g.add(c); }
  for (const z of [-L / 2 + 0.02, L / 2 - 0.02]) { const c = mesh(new THREE.CylinderGeometry(0.014, 0.014, A - 0.04, 10), M.acero, 0, 0.085, z); c.rotation.z = Math.PI / 2; g.add(c); }
  // la tabla y el acolchado navy3 con costuras crema
  g.add(caja(A - 0.02, 0.02, L - 0.02, M.navy2, 0, 0.1, 0, 0.008));
  const costuraT = lienzo(256, 512, (x, w, h) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, h); x.strokeStyle = "#efeee5"; x.lineWidth = 5; x.setLineDash([16, 12]); for (const xx of [24, w - 24]) { x.beginPath(); x.moveTo(xx, 20); x.lineTo(xx, h - 20); x.stroke(); } for (const yy of [170, 340]) { x.beginPath(); x.moveTo(24, yy); x.lineTo(w - 24, yy); x.stroke(); } });
  const acol = mesh(rbox(A - 0.04, 0.035, L - 0.24, 0.015, 2), [M.navy3, M.navy3, new THREE.MeshStandardMaterial({ map: costuraT, roughness: 0.7 }), M.navy3, M.navy3, M.navy3], 0, 0.1 + 0.0275, 0.1); g.add(acol);
  // el apoyacabeza crema (punta de la cabeza: -z)
  g.add(caja(A - 0.1, 0.06, 0.2, M.cr, 0, 0.14, -L / 2 + 0.13, 0.03));
  // seis rueditas: horquilla gris que gira en su eje vertical (según la dirección) y la rueda negra
  const pos = [[-1, L / 2 - 0.06], [1, L / 2 - 0.06], [-1, 0], [1, 0], [-1, -L / 2 + 0.06], [1, -L / 2 + 0.06]];
  for (const [sx, z] of pos) {
    const piv = new THREE.Group(); piv.position.set(sx * (A / 2 - 0.02), 0.07, z); g.add(piv);
    piv.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.02, 8), M.acero, 0, 0.0, 0));
    const fork = new THREE.Group(); piv.add(fork);
    for (const s of [-1, 1]) fork.add(caja(0.006, 0.04, 0.03, M.acero, s * 0.016, -0.02, 0.012, 0.002));
    const rueda = new THREE.Group(); rueda.position.set(0, -0.035, 0.012); fork.add(rueda);
    const w = mesh(new THREE.CylinderGeometry(RR, RR, 0.024, 16), M.goma); w.rotation.z = Math.PI / 2; rueda.add(w);
    const eje = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.03, 8), M.acero); eje.rotation.z = Math.PI / 2; rueda.add(eje);
    CAMILLA.ruedas.push({ piv, fork, rueda, w, sx, z });
  }
  sombras(g);
}
const RUEDA_SALE = 0;   // la que se sale: adelante (lado de los pies, +z local) a la izquierda (-x)
const ruedaVerdeM = mat(C.g, 0.55);
// la ruedita suelta (P7): una copia que sale rodando
const RUEDITA = new THREE.Group();
{ RUEDITA.scale.setScalar(1.4); const w = mesh(new THREE.CylinderGeometry(RR, RR, 0.024, 16), M.goma); w.rotation.z = Math.PI / 2; RUEDITA.add(w); for (const s of [-1, 1]) RUEDITA.add(caja(0.006, 0.04, 0.03, M.acero, s * 0.016, 0.015, -0.01, 0.002)); scene.add(sombras(RUEDITA)); }
// el banquito con el celular de Óscar, el trapo y una llave combinada
const BANQ = { x: -0.62, z: 3.5 };
const banquito = crearBanquito(0.5); banquito.position.set(BANQ.x, 0, BANQ.z); scene.add(banquito);
{ const tp = plano(0.2, 0.16, trapoT, BANQ.x + 0.05, 0.505, BANQ.z - 0.06); tp.rotation.x = -Math.PI / 2; tp.rotation.z = 0.4; scene.add(tp); scene.add(caja(0.02, 0.008, 0.2, M.acero, BANQ.x - 0.07, 0.506, BANQ.z + 0.02, 0.003)); }

// =====================================================================================================
// LA ROTISERÍA DE GRACIELA (x = 40), de dist-quien-debe
// =====================================================================================================
const ROT = new THREE.Group(); ROT.position.x = 40; scene.add(ROT);
const MOSTR = { x0: -1.6, x1: 1.8, y: 1.0, d: 0.7, z: -1.15 };
const GRA = { x: 40 + 0.45, z: -1.95 }, GRA_Y = 0.12;
let spiedoBarras = [];
const pantG = lienzo(600, 1215, () => {});
let celGsoporte;
{
  const RD = 3.4;
  const azul = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#f4f4ef"; x.fillRect(0, 0, w, h); x.strokeStyle = "#cfd2cc"; x.lineWidth = 6; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 128); x.lineTo(w, i * 128); x.stroke(); } });
  azul.wrapS = azul.wrapT = THREE.RepeatWrapping;
  const pared = (w, h, x, y, z, ry) => { const tx = azul.clone(); tx.needsUpdate = true; tx.repeat.set(w / 0.5, h / 0.5); const p = mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.4 }), x, y, z); p.rotation.y = ry; p.castShadow = false; ROT.add(p); };
  pared(8, 3.1, 0, 1.55, -RD, 0); pared(RD + 3, 3.1, -3.4, 1.55, -RD / 2 + 1.5, Math.PI / 2); pared(RD + 3, 3.1, 3.4, 1.55, -RD / 2 + 1.5, -Math.PI / 2);
  ROT.add(caja(8, 0.12, 0.03, M.g, 0, 1.55, -RD + 0.02));
  const piso = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(6, 5);
  const p = mesh(new THREE.PlaneGeometry(8, RD + 3), new THREE.MeshStandardMaterial({ map: piso, roughness: 0.5 }), 0, 0.005, -RD / 2 + 1.5); p.rotation.x = -Math.PI / 2; p.castShadow = false; ROT.add(p);
  ROT.add(caja(8, 0.1, RD + 3, mat(0xe8e6da, 0.95), 0, 3.12, -RD / 2 + 1.5));
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
    else { ROT.add(mesh(new THREE.CylinderGeometry(0.2, 0.18, 0.08, 20), tarta, bx, MOSTR.y + 0.07, MOSTR.z)); }
  }
  const piz = lienzo(900, 600, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#c89a64"; x.lineWidth = 34; x.strokeRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = CAV(118); ["Pollo al spiedo", "Milanesa", "Tarta"].forEach((s, i) => x.fillText(s, w / 2, 170 + i * 150)); });
  ROT.add(plano(1.2, 0.8, piz, 1.6, 2.15, -RD + 0.03));
  const sp = new THREE.Group(); sp.position.set(-1.05, 0.95, -RD + 0.45); ROT.add(sp);
  const acero = mat(0xc9ccd2, 0.3, { metalness: 0.55 }), aceroOsc = mat(0x8a8e98, 0.4, { metalness: 0.5 });
  sp.add(caja(1.6, 0.9, 0.6, aceroOsc, 0, -0.45, 0));
  for (const s of [-1, 1]) sp.add(caja(0.08, 1.3, 0.62, acero, s * 0.78, 0.63, 0));
  sp.add(caja(1.64, 0.1, 0.64, acero, 0, 1.3, 0)); sp.add(caja(1.64, 0.06, 0.64, acero, 0, 0.0, 0));
  const brasas = lienzo(512, 384, (x, w, h) => { x.fillStyle = "#c46a3a"; x.fillRect(0, 0, w, h); x.fillStyle = "#e09a5a"; for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(i * 60 - 10, h); x.quadraticCurveTo(i * 60 + 20, h * 0.2, i * 60 + 50, h); x.fill(); } });
  const llama = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.05), new THREE.MeshBasicMaterial({ map: brasas, toneMapped: false })); llama.position.set(0, 0.64, -0.26); sp.add(llama);
  const doradoM = mat(0xc98a3a, 0.45), doradoO = mat(0xa86a2a, 0.5);
  for (let b = 0; b < 3; b++) {
    const barra = new THREE.Group(); barra.position.set(0, 0.28 + b * 0.36, 0.02); sp.add(barra); spiedoBarras.push(barra);
    barra.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.5, 8), acero).rotateZ(Math.PI / 2));
    for (let k = 0; k < 3; k++) {
      const pg = new THREE.Group(); pg.position.x = -0.46 + k * 0.46; barra.add(pg);
      const cu = mesh(new THREE.SphereGeometry(0.13, 18, 14), doradoM); cu.scale.set(1.0, 0.82, 0.86); pg.add(cu);
      const pe = mesh(new THREE.SphereGeometry(0.085, 14, 10), doradoM, 0.11, 0.02, 0.0); pe.scale.set(0.8, 0.75, 0.9); pg.add(pe);
      for (const s of [-1, 1]) { const mu = mesh(new THREE.SphereGeometry(0.055, 12, 8), doradoO, -0.05, -0.06, s * 0.08); mu.scale.set(1.4, 0.9, 0.9); pg.add(mu); }
      pg.rotation.x = k * 1.3;
    }
  }
  // el celular de Graciela en un soporte sobre el mostrador (a su derecha)
  celGsoporte = new THREE.Group(); celGsoporte.position.set(1.05, MOSTR.y, MOSTR.z + 0.05); celGsoporte.rotation.y = Math.PI; ROT.add(celGsoporte);
  celGsoporte.add(caja(0.1, 0.02, 0.09, M.navy, 0, 0.01, 0, 0.005));
  const brazoS = caja(0.02, 0.1, 0.02, M.navy, 0, 0.06, -0.035, 0.004); brazoS.rotation.x = -0.35; celGsoporte.add(brazoS);
  ROT.add(caja(0.36, 0.18, 0.32, M.navy3, 1.55, MOSTR.y + 0.09, MOSTR.z - 0.02, 0.04));
  ROT.add(caja(1.4, 0.04, 0.35, M.navy3, 1.6, 1.45, -RD + 0.2, 0.01));
  for (let i = 0; i < 5; i++) ROT.add(caja(0.18, 0.28, 0.12, M.kraft, 1.1 + i * 0.25, 1.61, -RD + 0.2, 0.01));
}
sombras(ROT);
ROT.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; o.receiveShadow = false; } });
const luzRot = new THREE.DirectionalLight(0xfff3e2, 1.6); luzRot.castShadow = true; luzRot.shadow.mapSize.set(1024, 1024); luzRot.shadow.bias = -0.0006;
Object.assign(luzRot.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
luzRot.position.set(42, 6, 3); luzRot.target.position.set(40, 0.8, -1.5); scene.add(luzRot, luzRot.target);
const cieloRot = new THREE.HemisphereLight(0xf6f2ea, 0x6a6458, 1.7); scene.add(cieloRot);

// =====================================================================================================
// EL ÓMNIBUS DE DANIEL (x = 60): genérico, interior navy y crema; pasamanos crema con agarraderas, asientos navy3, las
// ventanas con la ciudad low-poly que pasa, el caño con el botón de parada verde y el cartel PARADA. Mira a +z (pasillo
// a lo largo de x).
// =====================================================================================================
const BUS = new THREE.Group(); BUS.position.x = 60; scene.add(BUS);
const CIUDAD = new THREE.Group(); BUS.add(CIUDAD);
const BOTON_PARADA = new THREE.Group();
{
  const pisoT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#8e949c"; x.fillRect(0, 0, w, h); x.fillStyle = "#858a92"; for (let i = 0; i < 8; i++) x.fillRect(0, i * 32, w, 3); });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(6, 3);
  const piso = mesh(new THREE.PlaneGeometry(8, 3), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.9 }), 0, 0, 0.2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; BUS.add(piso);
  BUS.add(caja(8, 0.012, 0.08, M.cr, 0, 0.006, 0.55, 0.003));
  // la pared del fondo (z = -1.1): zócalo navy, ventanas grandes con marco navy, franja crema arriba
  BUS.add(caja(8, 0.85, 0.1, M.navy2, 0, 0.425, -1.15, 0.01));
  BUS.add(caja(8, 0.55, 0.1, M.cr, 0, 2.15, -1.15, 0.01));
  for (let i = -3; i <= 3; i++) BUS.add(caja(0.14, 1.1, 0.12, M.navy3, i * 1.15, 1.35, -1.13, 0.02));
  BUS.add(caja(8, 0.08, 0.12, M.navy3, 0, 0.88, -1.12, 0.02)); BUS.add(caja(8, 0.08, 0.12, M.navy3, 0, 1.88, -1.12, 0.02));
  const vid = new THREE.Mesh(new THREE.PlaneGeometry(8, 1.0), new THREE.MeshStandardMaterial({ color: 0xdfeaf2, roughness: 0.05, transparent: true, opacity: 0.18, depthWrite: false })); vid.position.set(0, 1.38, -1.1); BUS.add(vid);
  // el techo crema y la pared de adelante (la cámara mira desde z+)
  BUS.add(caja(8, 0.06, 2.6, mat(0xe8e6da, 0.95), 0, 2.45, 0.1, 0.01));
  // el pasamanos crema a lo largo del pasillo y las agarraderas
  { const p = mesh(new THREE.CylinderGeometry(0.02, 0.02, 8, 12), M.cr, 0, 1.92, 0.15); p.rotation.z = Math.PI / 2; BUS.add(p); }
  for (let i = -3; i <= 3; i++) { const a = new THREE.Group(); a.position.set(i * 0.55 + 0.25, 1.92, 0.15); BUS.add(a); a.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.18, 6), M.navy3, 0, -0.09, 0)); const r = mesh(new THREE.TorusGeometry(0.05, 0.012, 8, 18), M.cr, 0, -0.22, 0); a.add(r); }
  // los asientos navy3 de dos contra la pared
  for (const sx of [-2.3, -1.15, 1.15, 2.3]) { const s = new THREE.Group(); s.position.set(sx, 0, -0.75); BUS.add(s); s.add(caja(0.9, 0.1, 0.45, M.navy3, 0, 0.45, 0, 0.03)); s.add(caja(0.9, 0.55, 0.08, M.navy3, 0, 0.75, -0.2, 0.03)); s.add(caja(0.06, 0.45, 0.06, M.acero, 0, 0.22, 0.1, 0.01)); s.add(caja(0.92, 0.04, 0.04, M.cr, 0, 1.04, -0.22, 0.01)); }
  // el caño vertical con el botón de parada y el cartel PARADA (a la derecha de Daniel)
  BOTON_PARADA.position.set(0.43, 0, 0.25); BUS.add(BOTON_PARADA);
  BOTON_PARADA.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.45, 12), M.cr, 0, 1.22, 0));
  BOTON_PARADA.add(caja(0.08, 0.12, 0.06, M.navy, 0, 1.35, 0.03, 0.02));
  const boton = mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.02, 16).rotateX(Math.PI / 2), M.g, 0, 1.35, 0.065); BOTON_PARADA.add(boton); BOTON_PARADA.userData.boton = boton;
  const cartel = lienzo(400, 140, (x, w, h) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 84); x.fillText("PARADA", w / 2, h / 2 + 4); });
  BOTON_PARADA.add(plano(0.2, 0.07, cartel, 0, 1.5, 0.025, true));
  // afuera: la vereda, las fachadas crema y navy y los árboles (se mueven a lo largo de x con t)
  semilla = 31;
  for (let i = 0; i < 14; i++) {
    const b = new THREE.Group(); b.position.set(i * 1.3 - 9, 0, -3.2); CIUDAD.add(b);
    const alto = 2.2 + az() * 2.2, col = [M.cr, M.cr2, M.navy3, M.edge][i % 4];
    b.add(caja(1.2, alto, 1.0, col, 0, alto / 2 - 0.3, 0, 0.02));
    for (let k = 0; k < 3; k++) b.add(caja(0.3, 0.36, 0.04, i % 4 >= 2 ? M.cr : M.navy3, -0.3 + (k % 2) * 0.6, 1.2 + Math.floor(k / 2) * 0.7, 0.51, 0.01));
    if (i % 3 === 0) { const ar = new THREE.Group(); ar.position.set(0.6, 0, 1.3); b.add(ar); ar.add(mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.6, 6), mat(0x6b4a32, 0.9), 0, 0.5, 0)); ar.add(mesh(new THREE.IcosahedronGeometry(0.6, 0), i % 2 ? M.gd : M.g, 0, 1.6, 0)); }
  }
  const vereda = mesh(new THREE.PlaneGeometry(30, 3), M.cr, 0, -0.32, -2.2); vereda.rotation.x = -Math.PI / 2; BUS.add(vereda);
  sombras(BUS);
}
const luzBus = new THREE.DirectionalLight(0xfff4e6, 1.3); luzBus.castShadow = true; luzBus.shadow.mapSize.set(1024, 1024); luzBus.shadow.bias = -0.0006;
Object.assign(luzBus.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 20 });
luzBus.position.set(61.5, 4, 3.5); luzBus.target.position.set(60, 1.0, 0); scene.add(luzBus, luzBus.target);
const cieloBus = new THREE.HemisphereLight(0xf4f2ea, 0x6a6458, 1.8); scene.add(cieloBus);

const LUCES = { taller: [sol, cielo, relleno, rim], rot: [luzRot, cieloRot], bus: [luzBus, cieloBus] };
const INTENS = new Map(); for (const k in LUCES) for (const l of LUCES[k]) INTENS.set(l, l.intensity);
function ponerLuces(lugares, k = 1) { for (const key in LUCES) for (const l of LUCES[key]) { l.visible = lugares.includes(key); l.intensity = INTENS.get(l) * k; } }
const FONDO = { taller: 0xe9ece6, rot: 0xf4f4ef, bus: 0xcfdbe6 };

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const oscar = crearPersonaje({ ...ELENCO.oscar, franja: null, cuelloAlto: 0.03, dedos: true, parpadeoCada: 999, parpadeoDur: 0.08, parpadeosExtra: [r2(T.cortes[1] + 0.06), r2(T.q5 + 0.08)] });
const maxi = crearPersonaje({ ...ELENCO.maxi, mangas: "largas", dedos: true, parpadeoCada: 999, parpadeoDur: 0.08, parpadeosExtra: [] });
const daniel = crearPersonaje({ ...ELENCO.daniel, lentesFinos: true, sinPatillas: true, dedos: true, parpadeoCada: 999, parpadeoDur: 0.08, parpadeosExtra: [] });
const graciela = crearPersonaje({ ...ELENCO.clienta, lentesFinos: true, sinPatillas: true, delantal: C.cr, delantalBorde: C.navy3, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const pasajeros = [
  crearPersonaje({ ...DEFECTO, nombre: "Pasajera", piel: PIEL.media, pelo: PELO.negro, peinado: "rodete", camisa: 0x9fb3c9, mangas: "largas", pantalon: C.navy2, labios: 0xb5555a, parpadeoCada: 999 }),
  crearPersonaje({ ...DEFECTO, nombre: "Pasajero", piel: PIEL.clara, pelo: PELO.gris, peinado: "corto", camisa: C.cr2, mangas: "largas", pantalon: 0x3a3f4a, parpadeoCada: 999 }),
];
const TODOS = [oscar, maxi, daniel, graciela, ...pasajeros];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
const GRASA = new THREE.MeshStandardMaterial({ color: 0x2a2d33, roughness: 0.6, transparent: true, opacity: 0.75, depthWrite: false });
{
  for (const b of oscar.brazos) { const g1 = mesh(new THREE.SphereGeometry(1, 12, 8), GRASA, 0.0, -0.095, 0.032); g1.scale.set(0.035, 0.02, 0.012); b.mano.add(g1); }
  const mp = mesh(new THREE.SphereGeometry(1, 12, 8), GRASA, 0.11, 0.18, 0.215); mp.scale.set(0.035, 0.022, 0.01); oscar.cuerpo.add(mp);
  const m = mesh(new THREE.SphereGeometry(1, 12, 8), GRASA); const R = 0.3, CC = 0.276, a = 0.6, e = -0.18; m.position.set(R * Math.sin(a) * Math.cos(e), CC + R * 0.97 * Math.sin(e), R * 0.95 * Math.cos(a) * Math.cos(e)); m.lookAt(m.position.clone().multiplyScalar(2)); m.scale.set(0.035, 0.022, 0.008); maxi.cabeza.add(m);
}
// la mochila de laptop de Daniel, colgada de un hombro
const mochilaD = crearMochila(C.navy2, C.navy3); mochilaD.position.set(-0.04, 0.3, -0.22); mochilaD.rotation.set(0, 0, 0.12); daniel.cuerpo.add(mochilaD);
// la lámpara de inspección de Maxi (jaula + tubo emisivo crema), la tablet de Maxi (Q3), el mate y el termo
const LAMPARA = new THREE.Group();
{ LAMPARA.add(mesh(new THREE.CylinderGeometry(0.03, 0.034, 0.16, 14), M.navy3, 0, 0.0, 0)); LAMPARA.add(mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.03, 16), M.g, 0, 0.095, 0)); LAMPARA.add(mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.22, 14), new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff3d2, emissiveIntensity: 1.3 }), 0, 0.22, 0)); LAMPARA.add(mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.025, 16), M.navy3, 0, 0.335, 0)); scene.add(LAMPARA); }
const luzLampara = new THREE.PointLight(0xfff3d2, 0.0, 1.6, 2); scene.add(luzLampara);
const pantTM = lienzo(400, 300, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); });
const tabletM = new THREE.Group();
{ tabletM.add(caja(0.26, 0.18, 0.012, M.navy, 0, 0, 0, 0.012)); const p = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.16), new THREE.MeshBasicMaterial({ map: pantTM, toneMapped: false })); p.position.z = -0.0065; p.rotation.y = Math.PI; tabletM.add(p); scene.add(sombras(tabletM)); }
const mate = crearMate(); mate.scale.setScalar(1.1); scene.add(mate);
const termo = crearTermo(); termo.scale.setScalar(1.05); scene.add(termo);

// ---- los celulares (pantalla canvas): el de Óscar (funda negra con huellas de grasa), el de Graciela (en su soporte), el
// de Daniel (funda navy) ----
function crearCel(tex, funda, W = 0.085, H = 0.172) {
  const g = new THREE.Group();
  g.add(caja(W + 0.008, H + 0.008, 0.014, mat(funda, 0.5), 0, 0, 0, 0.012));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); p.position.z = 0.0075; g.add(p);
  g.userData = { W, H, pantalla: p };
  return sombras(g);
}
const pantO = lienzo(600, 1215, () => {}), pantD = lienzo(600, 1215, () => {});
const celO = crearCel(pantO, 0x1a1c20); scene.add(celO);
const celG = crearCel(pantG, C.g); celGsoporte.add(celG); celG.position.set(0, 0.105, 0.0); celG.rotation.x = -0.32;
const celD = crearCel(pantD, C.navy3); scene.add(celD);
const celGm = crearCel(pantG, C.g); celGm.scale.setScalar(1.25); scene.add(celGm);
function crearManoInserto(piel, manga) {
  const g = new THREE.Group(), m = mat(piel, 0.55);
  const palma = mesh(new THREE.SphereGeometry(1, 18, 12), m, 0.035, -0.02, -0.03); palma.scale.set(0.045, 0.06, 0.026); g.add(palma);
  const pul = new THREE.Group(); g.add(pul); pul.position.set(0.02, -0.0, 0.0);
  pul.add(mesh(new THREE.CapsuleGeometry(0.0092, 0.048, 4, 10), m, 0, 0.035, 0));
  const yema = mesh(new THREE.SphereGeometry(1, 10, 8), mat(0xf0d2bf, 0.4), 0, 0.062, 0.006); yema.scale.set(0.007, 0.009, 0.003); pul.add(yema);
  const mg = mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.22, 16), mat(manga, 0.6), 0.05, -0.14, -0.035); mg.rotation.z = 0.25; g.add(mg); g.userData.manga = mg;
  g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  g.userData.pulgar = pul;
  return g;
}
const manoO = crearManoInserto(ELENCO.oscar.piel, C.navy2); scene.add(manoO);
{ const gm = mesh(new THREE.SphereGeometry(1, 12, 8), GRASA, 0.04, -0.03, 0.0); gm.scale.set(0.03, 0.025, 0.02); manoO.add(gm); }
const manoD = crearManoInserto(ELENCO.daniel.piel, C.navy3); scene.add(manoD);

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
  AVATAR.graciela = leer(graciela, 0xefeee5);
  AVATAR.daniel = leer(daniel, 0xcfeebc);
  AVATAR.walter = leer(crearPersonaje({ ...ELENCO.walter, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.sergio = leer(crearPersonaje({ ...ELENCO.sergio, parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.fabian = leer(crearPersonaje({ ...DEFECTO, nombre: "Fabián", piel: PIEL.clara, pelo: 0x3a2f2a, peinado: "corto", cejasColor: 0x3a2f2a, camisa: 0xb9cde0, cuello: 0xb9cde0, cuelloBotones: false, nariz: 0.06, parpadeoCada: 999 }), 0xd9d7c9);
  AVATAR.silvia = leer(crearPersonaje({ ...DEFECTO, nombre: "Silvia", piel: PIEL.trigueña, pelo: PELO.castaño, peinado: "rodete", cejasColor: 0x4a3222, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xb5555a, camisa: MARCA.cr, cuello: null, cuelloBotones: false, aros: MARCA.g, nariz: 0.048, parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.oscar = leer(crearPersonaje({ ...ELENCO.oscar, parpadeoCada: 999 }), 0x5ce611);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
// el avatar del taller: una llave combinada dibujada (no la cara de Óscar)
function llaveAvatar(x, cx, cy, r) {
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.save(); x.translate(cx, cy); x.rotate(-0.75); x.fillStyle = "#0b1220";
  rr(x, -r * 0.12, -r * 0.5, r * 0.24, r * 1.0, r * 0.08);
  x.beginPath(); x.arc(0, -r * 0.55, r * 0.26, 0, 7); x.fill(); x.fillStyle = "#5ce611"; x.fillRect(-r * 0.09, -r * 0.85, r * 0.18, r * 0.3);
  x.fillStyle = "#0b1220"; x.beginPath(); x.arc(0, r * 0.55, r * 0.22, 0, 7); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(0, r * 0.55, r * 0.1, 0, 7); x.fill();
  x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}

// =====================================================================================================
// LAS FOTOS (render target de la misma escena, una vez): la bomba de agua goteando (la manda Óscar/Maxi), el auto de
// Graciela en el taller (el aviso) y el sedán de Daniel abajo del elevador, arreglado (Pronto para retirar)
// =====================================================================================================
const FOTO = {};
function sacarFoto(nombre, cam, prep) {
  const rt = new THREE.WebGLRenderTarget(480, 360); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const c = new THREE.PerspectiveCamera(cam[6], 480 / 360, 0.02, 60); c.position.set(cam[0], cam[1], cam[2]); c.lookAt(cam[3], cam[4], cam[5]);
  prep();
  renderer.setRenderTarget(rt); renderer.render(scene, c); renderer.setRenderTarget(null);
  const px = new Uint8Array(480 * 360 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 480, 360, px);
  const cv = document.createElement("canvas"); cv.width = 480; cv.height = 360; const x = cv.getContext("2d");
  const id = x.createImageData(480, 360);
  for (let y = 0; y < 360; y++) id.data.set(px.subarray((359 - y) * 1920, (360 - y) * 1920), y * 1920);
  x.putImageData(id, 0, 0); rt.dispose();
  FOTO[nombre] = cv;
}
function fotoEn(x, cv, X, Y, W, H, R = 18) { x.save(); x.beginPath(); x.roundRect(X, Y, W, H, R); x.clip(); x.drawImage(cv, X, Y, W, H); x.restore(); x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, W, H, R); x.stroke(); }

// =====================================================================================================
// TARJETAS PEGADAS A LA CÁMARA (en píxeles de pantalla): globos, rótulos, guías (de dist-quien-debe)
// =====================================================================================================
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
// globo de diálogo; cab = { cv, nombre } (avatar y nombre del que llama); minW = ancho mínimo
function crearGlobo(lineas, px = 80, { cab = null, minW = 0 } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  const limpio = (l) => l.replace(/[[\]{}]/g, "");
  const cabH = cab ? Math.round(px * 1.15) : 0, cabF = Math.max(Math.round(px * 0.6), 40);
  med.font = F(700, cabF); const anchoCab = cab ? med.measureText(cab.nombre).width + cabF * 2.4 : 0; med.font = F(800, px);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.max(minW, Math.round(anchoT + px * 1.2)), H = Math.round(lineas.length * px * 1.22 + px * 0.75 + cabH);
  return crearTarjeta(Wg, H, (x, w, h) => {
    if (cab) { const r = cabF * 0.78, cy = px * 0.25 + r, cx = px * 0.35 + r; avatar(x, cab.cv, cx, cy, r); x.fillStyle = "#1f3254"; x.font = F(700, cabF); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(cab.nombre, cx + r + px * 0.25, cy + 2); }
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + (h - cabH) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  });
}
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
  if (oy >= cy) { cola.position.set((lado * Wg) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0); cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * Wg) / 2), oy - (cy + H / 2)), -1.15, 1.15); }
  else { cola.position.set((lado * Wg) / 2 / PXK, H / 2 / PXK - 4 / PXK, 0); cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * Wg) / 2), (cy - H / 2) - oy), -1.15, 1.15); }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const AVISOS = [];
let PROY = null;   // en la pantalla partida: la cámara y la mitad (0 arriba, 1 abajo) con que se proyecta
function enPantallaCam(v, cam, mitad) { _v.copy(v).project(cam); return [(_v.x + 1) * 540, mitad * 960 + (1 - _v.y) * 480]; }
const aPx = (v) => (PROY ? enPantallaCam(v, PROY[0], PROY[1]) : enPantalla(v));
const bocaW = (per) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(0, 0.15, 0.3)); };
const coronillaPx = (per) => { per.raiz.updateMatrixWorld(true); return aPx(per.cabeza.localToWorld(V3(0, 0.62, 0))); };
const objPx = (o, local = V3(0, 0, 0)) => { o.updateMatrixWorld(true); return aPx(o.localToWorld(local.clone())); };
// REGLA DE BURBUJAS: arriba del que habla, la cola a su BOCA (corta, no llega a la cara)
function hablar(g, per, s, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) {
  const [hx, hy] = coronillaPx(per), [mx, my] = aPx(bocaW(per));
  const { H } = g.userData;
  let cy = hy - sobre - H / 2;
  if (cy - H / 2 < minY - 10) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  cy = cl(cy, H / 2 + minY, maxY - H / 2);
  if (mx < 70 || mx > 1010 || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, cy, s, [mx, my], orden);
}
const CAB = (k, nombre) => ({ cab: { cv: AVATAR[k], nombre } });
const GL = {
  g1: crearGlobo(["Óscar, ¿está [pronto?]"], 72, { ...CAB("graciela", "Graciela"), minW: 720 }),
  o1: crearGlobo(["A la [tarde.]"], 84),
  w1: crearGlobo(["¿Está [pronto?]"], 72, { ...CAB("walter", "Walter"), minW: 560 }),
  o2: crearGlobo(["A la tarde."], 80),
  k0: crearGlobo(["¿Está [pronto?]"], 72, { ...CAB("walter", "Walter"), minW: 560 }),
  k1: crearGlobo(["¿Está [pronto?]"], 72, { ...CAB("silvia", "Silvia"), minW: 560 }),
  k2: crearGlobo(["Óscar, ¿[y?]"], 74, { ...CAB("graciela", "Graciela"), minW: 560 }),
  m1: crearGlobo(["Jefe, el de Daniel:", "pierde la", "[bomba de agua.]"], 56),
  o3: crearGlobo(["¡[Daniel!]"], 96),
  d1: crearGlobo(["Óscar, ¿está [pronto?]"], 72, { ...CAB("daniel", "Daniel"), minW: 720 }),
  o4: crearGlobo(["Está pronto", "para [empezar.]"], 84),
  g2: crearGlobo(["¡Ay, mi [autito!]", "Ya lo están mirando."], 64),
  o5: crearGlobo(["Mandale la [foto.]"], 76),
  d2: crearGlobo(["Dale, [hacelo.]"], 80),
  o6: crearGlobo(["Maxi, ¿está pronto", "el [mate?]"], 68),
  m2: crearGlobo(["A la [tarde.]"], 84),
};
const ROT_ = {
  elev: crearRotulo([["Elevador ocupado:", null, 46], ["martes y miércoles", "#e08377", 56]], 46),
  serv: crearRotulo([["4 services que no entran:", null, 46], ["$ 26.000", "#e08377", 74]], 46),
  enviado: crearRotulo([["Aviso enviado ✓", "#5ce611", 52]], 52),
  aviso: crearRotulo([["Lo marcás con un toque", null, 48], ["y le avisa solo", "#5ce611", 58]], 48),
  panel: crearRotulo([["Cada auto y su estado,", null, 48], ["en un panel", "#5ce611", 58]], 48),
  extra: crearRotulo([["Con foto y precio,", null, 48], ["aprueba con un botón", "#5ce611", 58]], 48),
  sinfoto: crearRotulo([["Un audio sin escuchar.", null, 46], ["Sin foto ni precio", "#e08377", 56]], 46),
  aprob: crearRotulo([["Extra aprobado", null, 46], ["desde el ómnibus", "#5ce611", 60]], 46),
  entra: crearRotulo([["Mañana entran 4 services:", null, 44], ["$ 26.000", "#5ce611", 70]], 44),
  pronto: crearRotulo([["Pronto para retirar ✓", "#5ce611", 54]], 54),
};
const GUIAS = [crearGuia(), crearGuia()];

// =====================================================================================================
// LAS PANTALLAS
// =====================================================================================================
// ---- el celular de Óscar: la llamada entrante, en llamada, P3 (llamando / no contesta / el chat), la parte 2 ----
const LLAMADAS = [
  [T.ring1, T.o1 + LEN.o1 + 0.1, "graciela", "Graciela"],
  ...T.cortes.map((c, i) => [c, i < 2 ? c + 0.42 : T.piz, ["walter", "silvia", "graciela"][i], ["Walter", "Silvia", "Graciela"][i]]),
  [T.p5 - 0.1, T.p6 + 3, "daniel", "Daniel"], [T.ring7, P1, "graciela", "Graciela"],
];
const ATIENDE = [T.g1 - 0.08, ...T.cortes.map((c) => c + 0.05), T.o3 - 0.1, P1 + 1];   // desde cuándo está en llamada
function cabecera(x, W, txt, sub = null, av = null) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 190); x.fillStyle = "#5ce611"; x.fillRect(0, 190, W, 10);
  if (av) av(x, 92, 100, 58);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, txt, 800, 54, W - (av ? 190 : 60)); x.fillText(txt, av ? 170 : 36, sub ? 78 : 100);
  if (sub) { x.font = F(700, 38); x.fillText(sub, av ? 172 : 38, 138); }
}
function huellas(x, W, H) { x.fillStyle = "rgba(58,63,74,0.14)"; for (const [cx, cy, r, a] of [[W - 120, 330, 80, 0.4], [150, H - 200, 70, -0.6]]) { x.beginPath(); x.ellipse(cx, cy, r, r * 0.7, a, 0, 7); x.fill(); } }
let claveO = "";
function dibujarCelO(t) {
  const W = 600, H = 1215, { x } = pantO.userData;
  let estado = "apagado", quien = null, k = 0;
  if (t >= P2) estado = t >= T.aviso ? (t < T.q5 ? "aviso" : "apagado") : "apagado";
  else if (en(t, T.p3, T.p4)) estado = t >= T.foto ? (t >= T.entregado ? "chat2" : "chat") : t >= T.nocont[1] ? "no2" : t >= T.llama[1] ? "llama2" : t >= T.nocont[0] ? "no1" : "llama1";
  else for (let i = 0; i < LLAMADAS.length; i++) { const [a, b, kk, nom] = LLAMADAS[i]; if (en(t, a, b)) { estado = t >= ATIENDE[i] ? "habla" : "suena"; quien = [kk, nom]; k = i; } }
  const clave = `${estado}|${quien?.[0]}|${k}`; if (clave === claveO) return; claveO = clave;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textAlign = "center"; x.textBaseline = "middle";
  if (estado === "apagado") { x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H); x.fillStyle = "#2c4268"; x.font = F(800, 120); x.fillText("10:00", W / 2, 360); }
  else if (estado === "suena" || estado === "habla") {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H);
    x.fillStyle = "#efeee5"; x.font = F(700, 44); x.fillText(estado === "suena" ? "Llamada entrante" : "En llamada", W / 2, 150);
    avatar(x, AVATAR[quien[0]], W / 2, 450, 190);
    x.fillStyle = "#efeee5"; ajustar(x, quien[1].toUpperCase(), 900, 104, W - 50); x.fillText(quien[1].toUpperCase(), W / 2, 760);
    if (estado === "suena") { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(160, 1020, 92, 0, 7); x.fill(); x.fillStyle = "#c7655b"; x.beginPath(); x.arc(W - 160, 1020, 92, 0, 7); x.fill(); }
    else { x.fillStyle = "#c7655b"; x.beginPath(); x.arc(W / 2, 1020, 92, 0, 7); x.fill(); }
  } else if (estado.startsWith("llama") || estado.startsWith("no")) {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H);
    const no = estado.startsWith("no");
    avatar(x, AVATAR.daniel, W / 2, 380, 170);
    x.fillStyle = "#efeee5"; x.font = F(900, 92); x.fillText("DANIEL", W / 2, 650);
    if (no) { x.fillStyle = "#c7655b"; rr(x, 40, 760, W - 80, 150, 75); x.fillStyle = "#efeee5"; x.font = F(900, 66); x.fillText("No contesta", W / 2, 838); }
    else { x.fillStyle = "#efeee5"; x.font = F(800, 62); x.fillText("Llamando…", W / 2, 830); }
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(W / 2, 1060, 80, 0, 7); x.fill();
  } else if (estado.startsWith("chat")) {
    cabecera(x, W, "Daniel", "Sedán STR 7720", (x2, cx, cy, r) => avatar(x2, AVATAR.daniel, cx, cy, r));
    // un audio largo de Óscar ("Daniel, llamame…"), sin foto ni precio; queda sin escuchar
    for (const [i] of [0, 1].entries()) { const yy = 270 + i * 105; x.fillStyle = "#e8e7de"; rr(x, 40, yy, W - 80, 88, 30); x.fillStyle = "#c7655b"; x.beginPath(); x.arc(92, yy + 44, 26, 0, 7); x.fill(); x.fillStyle = "#16243d"; x.textAlign = "left"; x.font = F(800, 36); x.fillText("Llamada sin respuesta", 134, yy + 46, W - 200); }
    x.fillStyle = "#e8e7de"; rr(x, 30, 1090, W - 160, 90, 45); x.fillStyle = "#9a9ca5"; x.textAlign = "left"; x.font = F(700, 36); x.fillText("Escribí un mensaje", 70, 1136); x.fillStyle = "#16243d"; x.beginPath(); x.arc(W - 75, 1135, 45, 0, 7); x.fill();
    const bx = 60, by = 500, bw = W - 84;
    x.fillStyle = "#cfeebc"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(bx, by, bw, 230, [30, 30, 8, 30]); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.beginPath(); x.arc(bx + 70, by + 90, 42, 0, 7); x.fill();
    x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(bx + 58, by + 66); x.lineTo(bx + 90, by + 90); x.lineTo(bx + 58, by + 114); x.closePath(); x.fill();
    for (let k = 0; k < 18; k++) { const h = 14 + 40 * Math.abs(Math.sin(k * 1.7) * Math.cos(k * 0.6)); x.fillStyle = "#6b7080"; x.fillRect(bx + 130 + k * 19, by + 90 - h / 2, 10, h); }
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 44); x.fillText("0:47", bx + 30, by + 178);
    x.fillStyle = "#16243d"; x.font = F(700, 40); x.fillText("Audio", bx + 140, by + 178);
    if (estado === "chat2") { x.textAlign = "right"; x.fillStyle = "#6b7080"; x.font = F(800, 42); x.fillText("Entregado ✓✓ 10:16", bx + bw - 10, by + 290); x.textAlign = "center"; x.fillStyle = "#c7655b"; x.font = F(900, 50); x.fillText("Sin escuchar", W / 2, by + 400); }
  } else if (estado === "aviso") {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H);
    x.fillStyle = "#2c4268"; x.font = F(800, 120); x.fillText("10:00", W / 2, 230);
    x.fillStyle = "#efeee5"; rr(x, 30, 380, W - 60, 380, 40);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(110, 470, 50, 0, 7); x.fill(); tilde(x, 112, 472, 52, "#0b1220");
    x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, "Aviso enviado", 900, 58, W - 230); x.fillText("Aviso enviado", 180, 470);
    x.font = F(800, 48); x.fillText("Graciela", 60, 590); x.fillStyle = "#3fa60a"; x.fillText("En diagnóstico", 60, 680);
  }
  pantO.needsUpdate = true;
}
// ---- el celular de Graciela: "Mecánica Óscar · Tu auto: En diagnóstico" con la foto y los pasos ----
const PASOS = ["Recibido", "En diagnóstico", "Esperando repuesto", "Pronto para retirar"];
let claveG = "";
function dibujarCelG(t) {
  const e = t >= T.llegaG ? 1 : 0, late = Math.floor(t * 4) % 2;
  const clave = `${e}|${late}`; if (clave === claveG) return; claveG = clave;
  const W = 600, H = 1215, { x } = pantG.userData;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  cabecera(x, W, "Mecánica Óscar", "en línea", llaveAvatar);
  if (e) {
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(24, 230, W - 48, 950, [8, 30, 30, 30]); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(700, 42); x.fillText("Hola, Graciela.", 50, 290);
    x.font = F(900, 54); x.fillText("Tu auto:", 50, 360); x.fillStyle = "#3fa60a"; x.fillText("En diagnóstico", 50, 425);
    fotoEn(x, FOTO.graciela, 46, 470, W - 92, 330);
    PASOS.forEach((p, i) => {
      const y = 860 + i * 78, hecho = i === 0, actual = i === 1;
      if (i < 3) { x.fillStyle = i < 1 ? "#3fa60a" : "#b4b2a3"; x.fillRect(73, y + 16, 8, 62); }
      x.fillStyle = hecho ? "#3fa60a" : actual ? "#5ce611" : "#d9d7c9"; x.beginPath(); x.arc(77, y, actual && late ? 26 : 22, 0, 7); x.fill();
      if (hecho) tilde(x, 78, y + 1, 24, "#0b1220", 6);
      x.fillStyle = hecho || actual ? "#0b1220" : "#8a8e98"; const tx = p + (hecho ? " ✓" : ""); ajustar(x, tx, actual ? 900 : 800, 42, W - 170); x.fillText(tx, 120, y + 2);
    });
  }
  pantG.needsUpdate = true;
}
// ---- el celular de Daniel: el extra con Aprobar / Llamame → Aprobado ✓ (Q3); Pronto para retirar ✓ (Q4b) ----
let claveD = "";
function dibujarCelD(t) {
  const fase = t >= T.q4 ? (t >= T.llegaP ? 4 : 3) : t >= T.aprobado ? 3 : t >= T.aprueba ? 2 : t >= T.llegaD ? 1 : 0;
  if (`${fase}` === claveD) return; claveD = `${fase}`;
  const W = 600, H = 1215, { x } = pantD.userData;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  cabecera(x, W, "Mecánica Óscar", "en línea", llaveAvatar);
  if (fase === 0) { pantD.needsUpdate = true; return; }
  if (fase <= 3) {
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(24, 226, W - 48, 960, [8, 30, 30, 30]); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 40); x.fillText("Extra:", 50, 276);
    x.fillStyle = "#0b1220"; x.font = F(900, 56); x.fillText("Bomba de agua", 50, 334);
    x.font = F(900, 80); x.fillText("$ 11.500", 50, 418);
    fotoEn(x, FOTO.bomba, 46, 470, W - 92, 300);
    x.fillStyle = "#16243d"; x.font = F(700, 40); ["Encontramos esto. Si lo", "aprobás, sale hoy."].forEach((l, i) => x.fillText(l, 50, 820 + i * 50));
    if (fase < 3) {
      x.fillStyle = fase === 2 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(40, 920, W - 80, 120, 60); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 60); x.fillText("Aprobar", W / 2, 982);
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(40, 1060, W - 80, 100, 50); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.font = F(800, 50); x.fillText("Llamame", W / 2, 1112);
    } else {
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(40, 930, W - 80, 200, 40); x.fill();
      x.fillStyle = "#5ce611"; x.beginPath(); x.arc(130, 1030, 54, 0, 7); x.fill(); tilde(x, 132, 1032, 56, "#0b1220");
      x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(900, 64); x.fillText("Aprobado", 210, 1000); x.fillStyle = "#5ce611"; x.font = F(800, 50); x.fillText("✓ 10:04", 210, 1064);
    }
  } else {
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(24, 226, W - 48, 960, [8, 30, 30, 30]); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(700, 42); x.fillText("Hola, Daniel.", 50, 290);
    x.font = F(900, 56); x.fillText("Tu auto:", 50, 360);
    fotoEn(x, FOTO.sedan, 46, 420, W - 92, 360);
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(40, 830, W - 80, 200, 40); x.fill();
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(130, 930, 54, 0, 7); x.fill(); tilde(x, 132, 932, 56, "#0b1220");
    x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "para retirar", 900, 56, W - 250); x.fillText("Pronto", 210, 895); x.fillText("para retirar", 210, 960);
    x.fillStyle = "#16243d"; ajustar(x, "Retiralo hasta las 19:00.", 800, 46, W - 90); x.fillText("Retiralo hasta las 19:00.", 50, 1100);
  }
  pantD.needsUpdate = true;
}
// ---- la tablet del banco: el panel "Autos en el taller · Martes" ----
const TAB_W = 1040, TAB_H = 1200;
const pantT = lienzo(TAB_W, TAB_H, () => {});
const tablet = crearTablet(pantT, 0.3, 0.4, 0.22); tablet.position.set(BANCO.x - 0.04, BANCO.alto, 1.75); tablet.rotation.y = Math.PI / 2; tablet.scale.setScalar(1.45); scene.add(tablet);
const AUTOS = [["graciela", "Graciela", "Sedán SAB 3315", "En diagnóstico", "#5ce611"], ["walter", "Walter", "Sedán SCD 2210", "Esperando repuesto", "#d9d7c9"], ["sergio", "Sergio", "Sedán STR 4581", "Pronto para retirar ✓", "#5ce611"], ["daniel", "Daniel", "Sedán STR 7720", "En el elevador", "#d9d7c9"]];
let claveT = "";
function dibujarTablet(t) {
  const n = t >= T.q2 - 0.05 ? 4 : T.tarj.filter((a) => t >= a).length, av = T.tarj.filter((a) => t >= a + 0.12).length, ceros = t >= T.ceros ? 1 : 0;
  const dan = t >= T.aprobado ? 2 : t >= T.q3 ? 1 : 0;
  const clave = `${n}|${av}|${ceros}|${dan}`; if (clave === claveT) return; claveT = clave;
  const W = TAB_W, H = TAB_H, { x } = pantT.userData;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 132); x.fillStyle = "#5ce611"; x.fillRect(0, 132, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Autos en el taller · Martes", 800, 58, W - 60); x.fillText("Autos en el taller · Martes", 34, 68);
  AUTOS.slice(0, n).forEach(([k, nom, auto, estado, col], i) => {
    const y = 162 + i * 196, h = 180;
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, y, W - 48, h, 26); x.fill(); x.stroke();
    avatar(x, AVATAR[k], 104, y + h / 2, 62);
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 56); x.fillText(nom, 190, y + 46);
    x.fillStyle = "#16243d"; ajustar(x, auto, 700, 44, W - 260); x.fillText(auto, 190, y + 98);
    let est = estado, ec = col;
    if (k === "daniel" && dan === 1) { est = "Extra: esperando OK"; ec = "#d9d7c9"; }
    if (k === "daniel" && dan === 2) { est = "Aprobado ✓ 10:04"; ec = "#5ce611"; }
    x.font = F(800, 44); const ew = x.measureText(est).width + 40;
    x.fillStyle = ec; rr(x, 190, y + 120, ew, 54, 27); x.fillStyle = "#0b1220"; x.fillText(est, 210, y + 148);
    if (i < av) { x.fillStyle = "#3fa60a"; x.textAlign = "right"; x.font = F(900, 46); x.fillText("Avisado ✓", W - 50, y + 50); }
  });
  if (ceros) {
    const y = 960;
    x.fillStyle = "#16243d"; rr(x, 24, y, W - 48, 210, 30);
    x.fillStyle = "#5ce611"; x.textAlign = "center"; ajustar(x, "Llamadas “¿está pronto?”: 0", 900, 62, W - 100); x.fillText("Llamadas “¿está pronto?”: 0", W / 2, y + 62);
    ajustar(x, "Óscar salió a atender: 0", 900, 62, W - 100); x.fillText("Óscar salió a atender: 0", W / 2, y + 150);
  }
  pantT.needsUpdate = true;
}
// la tablet de Maxi (Q3): la cámara apuntando a la bomba
function dibujarTabM() { const { x } = pantTM.userData; x.fillStyle = "#0b1220"; x.fillRect(0, 0, 400, 300); if (FOTO.bomba) x.drawImage(FOTO.bomba, 20, 20, 300, 260); x.strokeStyle = "#efeee5"; x.lineWidth = 4; x.strokeRect(70, 70, 200, 160); x.fillStyle = "#efeee5"; x.beginPath(); x.arc(362, 150, 26, 0, 7); x.fill(); pantTM.needsUpdate = true; }

// =====================================================================================================
// CÁMARA
// =====================================================================================================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
const CAM_P1 = (k) => [lerp(0.25, 0.15, k), lerp(1.55, 1.45, k), lerp(6.3, 5.7, k), -0.25, lerp(1.15, 1.05, k), -0.6, 50];
const CAM_P4 = (k) => [lerp(0.05, -0.05, k), 1.35, lerp(6.5, 6.25, k), 0.0, 1.05, 2.6, 44];
const CAM_P2 = (k) => [1.95 - 0.15 * k, 0.75, -0.75 - 0.1 * k, -1.42 + 0.05 * k, 1.8 + 0.02 * k, -2.3, 64 - 3 * k];
const CAM_PIZ = (k) => [PIZ.x, 1.75, lerp(0.6, 0.45, k), PIZ.x, 1.62, -4.8, 46];
const CAM_P5 = (k) => [1.25 - 0.1 * k, 0.95, 6.3 - 0.15 * k, -0.2, 0.92, 3.4, 46];
const CAM_P6A = (k) => [0.05, 2.2, 3.0 - 0.25 * k, -0.2, 2.45, -3.05, 30 - 3 * k];
const CAM_Q4 = (k) => [-0.2, lerp(5.6, 5.0, k), lerp(-0.5, -0.8, k), -0.2, 0.7, -2.85, 42];
const CAM_P6 = (k) => [0.12, 1.15, lerp(6.35, 6.15, k), 0.12, 1.02, 3.5, 34];
const CAM_C = (k) => [0.15, 1.2, lerp(6.5, 6.3, k), 0.12, 0.84, 3.4, 44];
const CAM_Q3O = (k) => [0.12, 1.3, lerp(7.3, 7.1, k), 0.12, 0.62, 3.7, 38];
const CAM_G = (k) => [GRA.x - 0.12, 1.45, lerp(0.7, 0.6, k), GRA.x + 0.05, 1.3, GRA.z, 38];
const CAM_BUS = (k) => [60.15 - 0.05 * k, 1.5, lerp(2.4, 2.25, k), 60.05, 1.45, 0.0, 44];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, [[T.p2, ...CAM_P2(0)], [T.p3, ...CAM_P2(1)]]],
  ["P3", T.p3, null],
  ...T.cortes.map((c, i) => [`P4c${i}`, c, [[c, ...CAM_P4(0.3 + i * 0.15)], [i < 2 ? c + 0.42 : T.piz, ...CAM_P4(0.4 + i * 0.2)]]]),
  ["Ppiz", T.piz, [[T.piz, ...CAM_PIZ(0)], [T.p5, ...CAM_PIZ(1)]]],
  ["P5", T.p5, [[T.p5, ...CAM_P5(0)], [T.split, ...CAM_P5(1)]]],
  ["P5s", T.split, null],
  ["P6a", T.p6, [[T.p6, ...CAM_P6A(0)], [T.p6b, ...CAM_P6A(1)]]],
  ["P6", T.p6b, [[T.p6b, ...CAM_P6(0)], [T.p7, ...CAM_P6(1)]]],
  ["P7", T.p7, [[T.p7, ...CAM_P1(0.5)], [T.sueltaR, 0.2, 1.3, 5.9, 0.05, 0.7, 1.6, 50], [P1, 0.35, 1.0, 6.1, 0.45, 0.3, 3.3, 50]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, -0.5, 1.3, 4.3, -0.6, 0.52, 3.53, 38], [T.q1i, -0.56, 1.08, 4.0, -0.6, 0.5, 3.53, 34]]],
  ["Q1i", T.q1i, null],
  ["Q1g", T.q1g, [[T.q1g, ...CAM_G(0)], [T.q2, ...CAM_G(1)]]],
  ["Q2", T.q2, null],
  ["Q3", T.q3, [[T.q3, ...CAM_P2(0)], [T.q3o, ...CAM_P2(1)]]],
  ["Q3o", T.q3o, [[T.q3o, ...CAM_Q3O(0)], [T.q3f, ...CAM_Q3O(1)]]],
  ["Q3f", T.q3f, [[T.q3f, ...CAM_P2(0)], [T.q3d, ...CAM_P2(0.3)]]],
  ["Q3d", T.q3d, null],
  ["Q3e", T.q3e, [[T.q3e, ...CAM_BUS(0)], [T.q3a, ...CAM_BUS(1)]]],
  ["Q3a", T.q3a, null],
  ["Q4", T.q4, [[T.q4, ...CAM_Q4(0)], [T.q4p, ...CAM_Q4(1)]]],
  ["Q4p", T.q4p, [[T.q4p, ...CAM_PIZ(0.4)], [T.q4b, ...CAM_PIZ(1)]]],
  ["Q4bi", T.q4b, null],
  ["Q5", T.q5, [[T.q5, ...CAM_P1(0.2)], [T.q5b, ...CAM_P1(0.5)]]],
  ["Q5b", T.q5b, [[T.q5b, -0.25, 1.4, 7.4, -0.45, 0.95, 2.8, 56], [T.c, -0.25, 1.38, 7.25, -0.45, 0.95, 2.8, 55]]],
  ["C", T.c, [[T.c, ...CAM_C(0)], [DUR, ...CAM_C(1)]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.25) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); } }
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
  camera.fov = v[6]; camera.aspect = 1080 / 1920; camera.updateProjectionMatrix();
  camera.lookAt(_m.set(v[3], v[4], v[5]));
}
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }
function camPantalla(obj, centroLocal, normalLocal, alto, llena, fov, t, extra = 0) {
  obj.updateMatrixWorld(true);
  const c = obj.localToWorld(centroLocal.clone()), n = normalLocal.clone().transformDirection(obj.matrixWorld);
  const d = alto / llena / (2 * Math.tan((fov * D2R) / 2)) + extra;
  const p = c.clone().add(n.multiplyScalar(d));
  ponerCam([p.x, p.y, p.z, c.x, c.y, c.z, fov], t, true);
  camera.up.copy(V3(0, 1, 0).transformDirection(obj.matrixWorld)); camera.lookAt(c);
  return { c, p, d };
}

// =====================================================================================================
// POSES
// =====================================================================================================
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.88, tension: 0.15, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.95 } };
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.62, tension: 0.35, feliz: 0 }, cejas: { alto: -0.25, ang: -0.15 }, boca: { sonrisa: -0.55, abierta: 0, ancho: 0.85 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.92, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca = { ...(p.boca || {}), abierta: Math.max(p.boca?.abierta ?? 0, cl(e * 1.1 - 0.05) * k) }; }
  if (env && t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos = { ...(p.ojos || {}), abiertos: Math.max(p.ojos?.abiertos ?? 1, 0.85) };   // hablando, nunca con los ojos cerrados
};
const _w = new THREE.Vector3();
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });

// ---------- la camilla: dónde está (z del centro), cuánto se incorpora Óscar ----------
// "adentro": la cabeza abajo del motor del auto de Graciela; "afuera": la cabeza delante del paragolpes
const CZ = { adentro: 2.32, afuera: 3.45, x: 0.12 };
const HIP = 0.31;   // la cadera (el eje del torso acostado) sobre el piso
// estado de la camilla y de Óscar en t: { z, incl (0 acostado .. 1 sentado), paso, camilla visible }
function rodadas(t) {
  // [t0, t1, de, a] tramos de rodada (z del centro de la camilla); entre tramos queda donde quedó
  const R = [];
  if (t < P2) {
    R.push([T.sale1[0] - 0.42, T.sale1[1], CZ.adentro + 0.55, CZ.afuera]);          // en el cuadro 0 ya viene saliendo
    R.push([T.vuelve1, T.vuelve1 + 0.42, CZ.afuera, CZ.adentro]);
    R.push([T.sale4[0], T.sale4[1], CZ.adentro, CZ.afuera]);
    R.push([T.vuelve4, T.vuelve4 + 0.35, CZ.afuera, CZ.adentro]);
    R.push([T.piz, T.piz + 0.01, CZ.afuera, CZ.adentro]);
    R.push([T.sale5[0], T.sale5[1], CZ.adentro, CZ.afuera + 0.15]);
    R.push([T.vuelve7[0], T.vuelve7[1], CZ.afuera + 0.15, CZ.adentro]);
    R.push([T.empuja, T.empuja + 0.22, CZ.adentro, CZ.adentro + 0.28]);
  } else {
    R.push([P2 - 0.01, P2, CZ.afuera, CZ.adentro]);
    R.push([T.q3o - 0.3, T.q3o + 0.1, CZ.adentro, CZ.adentro + 0.9]);
    R.push([T.q3f, T.q3f + 0.3, CZ.adentro + 0.9, CZ.adentro]);
    R.push([T.sale6[0], T.sale6[1], CZ.adentro, CZ.afuera]);
  }
  let z = R[0][2], paso = 0, vel = 0;
  for (const [a, b, de, hasta] of R) { if (t >= b) z = hasta; else if (t > a) { const u = sg(t, a, b); z = lerp(de, hasta, eio(u)); paso = 1; vel = Math.sign(hasta - de); } }
  return { z, paso, vel };
}
function incorporado(t) {
  // 0 acostado, 0.55 incorporado a medias (apoyado en el codo, el celular en la oreja), 1 sentado
  const K = t < P2 ? [
    [0, 0.0], [T.sale1[1] - 0.12, 0.0], [T.sale1[1] + 0.25, 0.55], [T.vuelve1 - 0.1, 0.55], [T.vuelve1 + 0.05, 0.0],
    [T.p4 - 0.01, 0.0], [T.p4, 0.55], [T.vuelve4 - 0.05, 0.55], [T.vuelve4 + 0.08, 0.0], [T.piz, 0.0],
    [T.sienta[0], 0.0], [T.sienta[1], 1.0], [T.p7 - 0.05, 1.0], [T.p7 + 0.35, 0.0],
  ] : [[0, 0], [T.q3o - 0.2, 0], [T.q3o + 0.15, 0.3], [T.q3f, 0.3], [T.q3f + 0.2, 0], [T.sale6[1] - 0.1, 0.0], [T.sale6[1] + 0.35, 1.0]];
  let v = K[0][1];
  for (let i = 1; i < K.length; i++) { if (t >= K[i][0]) v = K[i][1]; else { const u = sg(t, K[i - 1][0], K[i][0]); v = lerp(K[i - 1][1], K[i][1], (1 - Math.cos(Math.PI * u)) / 2); break; } }
  return v;
}
function poseOscar(t, pa) {
  const { z, paso } = rodadas(t);
  const inc = incorporado(t);
  const p2 = t >= P2;
  // la cara según el momento
  let cara = CARA.neutra, cab = aC(0, -0.2);
  if (!p2) {
    if (t < T.p4) cara = { ...CARA.neutra, ojos: { abiertos: 0.95 } };
    else if (t < T.p5) { const k = sg(t, T.p4, T.piz); cara = { ...CARA.resignado, ojos: { abiertos: lerp(0.7, 0.45, k), tension: 0.6 }, boca: { sonrisa: lerp(-0.3, -0.75, k), abierta: 0, ancho: 0.95 } }; }
    else if (t < T.p6) cara = { ...CARA.esperanza, ojos: { abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.9, ang: 0.3 }, boca: { sonrisa: 0.85, abierta: 0, ancho: 1.1 } };
    else if (t < T.p7) cara = t < T.p6b ? { ...NADA, ojos: { abiertos: 0.9, y: 0.7 } } : SECO;
    else cara = { ...CARA.resignado, ojos: { abiertos: 0.6, tension: 0.5 } };
  } else { cara = t >= T.c ? MEDIA : t >= T.m2 + LEN.m2 ? { ...CARA.feliz, ojos: { abiertos: 0.9, feliz: 0.5 } } : MEDIA; }
  const p = poseEn(t, [[0, { ...cara, ...BRAZOS.costado }]]);
  Object.assign(p, cara);
  // el cuerpo: sentado con las piernas dobladas (rodillas a 90°, los pies en el piso) y el torso acostado hacia atrás
  const incl = -Math.PI / 2 + inc * (Math.PI / 2);
  Object.assign(p, { x: CZ.x, y: HIP - 0.571, z: z + 0.32, giro: 0, sentado: 1, piernasRectas: 0, inclina: incl, paso: paso * 0.6, pasoVel: 16 });
  // la cabeza: acostado mira para arriba (asiente negativo levanta la cara hacia los pies); incorporado, a cámara
  { const k = cl(inc / 0.3); p.cabeza = { giro: 0, asiente: (Math.PI / 2) * (1 - inc) * 0.75 * k - 0.15 * (1 - k), ladea: 0.02 }; }
  if (!p2 && en(t, T.p6, T.p6b)) p.cabeza = { giro: 0.05, asiente: -0.55, ladea: 0 };     // mira el auto clavado arriba
  if (!p2 && en(t, T.p6b, T.p7)) p.cabeza = { giro: 0, asiente: 0.04, ladea: -0.02 };
  p.t = t;
  for (const [v, t0] of [["o1", T.o1], ["o2", T.o2], ["o3", T.o3], ["o4", T.o4]]) if (!p2) bocaVoz(p, t, t0, ENV[v], 0.6);
  for (const [v, t0] of [["o5", T.o5], ["o6", T.o6], ["o7", T.o7]]) if (p2) bocaVoz(p, t, t0, ENV[v], 0.6);
  return p;
}
// ---------- Maxi: abajo del auto de Daniel con la lámpara (P2, Q3); con la tablet (Q3f); con el termo y el mate (Q5) ----------
const MAXI_EL = { x: LX - 1.03, z: LZ + 1.5 };
function poseMaxi(t) {
  if (t < T.q5) {
    const p = poseEn(t, [[0, { x: MAXI_EL.x, z: MAXI_EL.z, giro: 1.05, ...aC(0.5, -0.45), ...CARA.concentrada, ...BRAZOS.costado }]]);
    p.ojos = { ...p.ojos, y: 0.6, abiertos: 1 };
    for (const [t0] of [[T.m1], [T.m1b]]) if (en(t, t0 - 0.1, t0 + LEN.m1 + 0.2)) { p.cabeza = { giro: -0.35, asiente: -0.05, ladea: 0.05 }; p.ojos = { x: -0.3, y: 0, abiertos: 0.95 }; }
    p.t = t; bocaVoz(p, t, T.m1, ENV.m1, 0.65); bocaVoz(p, t, T.m1b, ENV.m1, 0.65); return p;
  }
  // Q5: entra con el termo bajo el brazo y el mate; canchero
  const u = sg(t, T.q5 - 0.2, T.o6);
  const p = poseEn(t, [[0, { giro: -0.35, ...aC(0.2, 0.05), ...MEDIA, ...BRAZOS.costado, manoD: [-0.2, 0.25, 0.32], codoD: [-0.8, -0.6, -0.2] }], [T.m2 - 0.05, { ...aC(0.35, 0.1), ...MEDIA, cejas: { alto: 0.4, ang: 0.1, asim: 0.8 } }, 0.2]]);
  Object.assign(p, { x: lerp(-1.45, -0.85, eio(u)), z: lerp(3.65, 3.5, eio(u)), paso: u > 0 && u < 1 ? 1 : 0 });
  p.t = t; bocaVoz(p, t, T.m2, ENV.m2, 0.65); return p;
}
// ---------- Daniel en el ómnibus: de pie, colgado del pasamanos con la izquierda, el celular en la derecha ----------
const DAN = { x: 60.05, z: 0.05 };
function poseDaniel(t) {
  const enOreja = t < P2;
  const cara = enOreja ? { ...CARA.esperanza, ojos: { abiertos: 1 }, boca: { sonrisa: 0.4, abierta: 0, ancho: 1 } } : t >= T.q4b ? { ...BUENA, ojos: { abiertos: 1, feliz: 0.1 } } : { ...MEDIA, ojos: { abiertos: 1, feliz: 0, y: -0.2 } };
  const p = poseEn(t, [[0, { x: DAN.x, z: DAN.z, giro: -0.12, ...aC(0.1, enOreja ? 0.0 : 0.3), ...cara, ...BRAZOS.costado }]]);
  Object.assign(p, cara);
  // el vaivén del ómnibus
  p.ladea = Math.sin(t * 1.7) * 0.03; p.inclina = 0.02 + Math.sin(t * 1.1) * 0.015;
  p.t = t; bocaVoz(p, t, T.d1, ENV.d1, 0.65); bocaVoz(p, t, T.d2, ENV.d2, 0.65);
  return p;
}
function poseGraciela(t) {
  const p = poseEn(t, [[0, { x: GRA.x, y: GRA_Y, z: GRA.z, giro: 0, ...aC(0.25, 0.3), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.2 }, ...BRAZOS.apoyado }], [T.g2 - 0.05, { ...aC(0.05, 0.05), ...CARA.sonrisa, ojos: { abiertos: 0.95, feliz: 0.35 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } }, 0.25]]);
  p.t = t; bocaVoz(p, t, T.g2, ENV.g2, 0.6); return p;
}

// =====================================================================================================
// RENDER
// =====================================================================================================
const camA = new THREE.PerspectiveCamera(40, 1080 / 960, 0.02, 160), camB = new THREE.PerspectiveCamera(40, 1080 / 960, 0.02, 160);
scene.add(camA, camB);
function ponerCamX(cam, v) { cam.position.set(v[0], v[1], v[2]); cam.up.set(0, 1, 0); cam.fov = v[6]; cam.updateProjectionMatrix(); cam.lookAt(v[3], v[4], v[5]); cam.updateMatrixWorld(true); }
const _q = new THREE.Quaternion();
// el auto de Daniel en el elevador (arriba sin la rueda en la parte 1 y hasta que baja en Q4)
function ponerAutoD(t) {
  const baja = t >= P2 ? eio(sg(t, T.baja[0], T.baja[1])) : 0;
  const h = lerp(ALTO_EL, 0.3, baja);
  ponerElevador(h, 0);
  autoD.position.set(LX, h - 0.28, LZ);
  const arreglado = t >= T.q4;
  RUEDA_D.visible = arreglado; ruedaSuelta.visible = !arreglado;
  BOMBA.userData.cuerpo.material = t >= T.q4 ? bombaNueva : bombaM; BOMBA.userData.humedo.visible = t < T.q4;
  // la gota: cae de la bomba a la bandeja cada 0,9 s (parte 1 y Q3); en Q4 no
  autoD.updateMatrixWorld(true);
  const src = BOMBA.localToWorld(V3(0, -0.1, 0));
  const fase = ((t + 0.3) % 0.9) / 0.9;
  GOTA.visible = t < T.q4 && h > 1;
  BANDEJA.position.set(src.x, 0.025, src.z); charco.position.set(src.x, 0.052, src.z);
  GOTA.position.set(src.x, lerp(src.y, 0.06, fase * fase), src.z);
  GOTA.scale.set(1, fase < 0.1 ? 0.6 + fase * 6 : 1.6, 1);
  BANDEJA.visible = charco.visible = t < T.q4 + 0.6;
}
// la camilla: posición, las rueditas (giran en su eje según la dirección y ruedan), la que se sale
function ponerCamilla(t) {
  const { z, vel } = rodadas(t);
  const g = CAMILLA.g;
  g.position.set(CZ.x, 0, z); g.rotation.set(0, 0, 0);
  const sinRueda = t < P2 && t >= T.sueltaR;
  // sin la ruedita: la esquina de adelante a la izquierda se ladea
  if (sinRueda) { const k = eo(sg(t, T.sueltaR, T.sueltaR + 0.12)); g.rotation.z = -0.19 * k; g.rotation.x = 0.1 * k; g.position.y = -0.04 * k; }
  CAMILLA.ruedas.forEach((r, i) => {
    r.fork.rotation.y = vel < 0 ? Math.PI : 0;
    r.rueda.rotation.x = (z / RR) * (vel < 0 ? -1 : 1);
    r.piv.visible = !(i === RUEDA_SALE && sinRueda);
    r.w.material = i === RUEDA_SALE && t >= P2 ? ruedaVerdeM : M.goma;
  });
  // la ruedita suelta: salta, rebota dos veces y rueda en línea recta hasta el cordón del portón
  RUEDITA.visible = sinRueda;
  if (sinRueda) {
    g.updateMatrixWorld(true);
    const o = CAMILLA.g.localToWorld(V3(-(CAMILLA.ancho / 2 - 0.02), RR, CAMILLA.largo / 2 - 0.06));
    const u = sg(t, T.sueltaR, T.frena);
    const dest = V3(0.85, RR, 4.05);
    const p = o.clone().lerp(dest, eo(u));
    const reb = Math.abs(Math.sin(u * Math.PI * 3)) * 0.06 * (1 - u) * (u < 0.66 ? 1 : 0);
    RUEDITA.position.set(p.x, RR * 1.4 + reb, p.z);
    RUEDITA.rotation.set(0, Math.atan2(dest.x - o.x, dest.z - o.z), 0); RUEDITA.rotateX(-o.distanceTo(p) / RR);
  }
}
// el celular de Óscar: en el banquito (vibra cuando suena) o en su mano en la oreja (incorporado)
function ponerCelO(t, pOscar) {
  const banq = V3(BANQ.x + 0.02, 0.513, BANQ.z + 0.03);
  const inc = incorporado(t);
  let enMano = 0;
  if (t < P2) enMano = cl((inc - 0.25) / 0.25);
  celO.visible = true;
  if (enMano < 0.02) {
    const suena = LLAMADAS.some(([a, b], i) => en(t, a, Math.min(b, ATIENDE[i])));
    celO.position.copy(banq).add(V3(suena ? Math.sin(t * 150) * 0.003 : 0, 0, 0));
    celO.rotation.set(-Math.PI / 2, 0, 0.4 + (suena ? Math.sin(t * 90) * 0.02 : 0));
    return 0;
  }
  // en la oreja derecha (lado -x del personaje)
  oscar.raiz.updateMatrixWorld(true);
  const oreja = oscar.cabeza.localToWorld(V3(-0.31, 0.17, 0.05));
  celO.position.copy(banq).lerp(oreja, enMano);
  oscar.cabeza.getWorldQuaternion(_q);
  celO.quaternion.copy(_q); celO.rotateY(-Math.PI / 2 + 0.25); celO.rotateZ(0.3);
  if (enMano < 1) { const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0.4)); celO.quaternion.slerp(q0, 1 - enMano); }
  // la mano derecha al celular
  pOscar.manoD = aCuerpo(oscar, celO.position.clone().add(V3(0, -0.06, 0))); pOscar.codoD = [-1, -0.5, -0.4];
  oscar.poner(pOscar);
  return enMano;
}
function renderAt(tIn) {
  AVISOS.length = 0; PROY = null;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  const split = pa === "P5s";
  const lugar = ["Q1i", "Q1g"].includes(pa) ? "rot" : ["Q3d", "Q3e", "Q3a", "Q4bi", "Q4b"].includes(pa) ? "bus" : "taller";
  const tarde = pa === "Q5" || pa === "Q5b" || pa === "C";
  ponerLuces(split ? ["taller", "bus"] : [lugar], split ? 0.75 : 1);
  scene.background = new THREE.Color(tarde ? 0xf0e4c8 : FONDO[lugar]);
  sol.color.set(tarde ? 0xffdcae : 0xfff8ec); luzPorton.material.color.set(tarde ? 0xf3d9a8 : 0xf6f2e4);
  SET.visible = lugar === "taller" || split; ROT.visible = lugar === "rot"; BUS.visible = lugar === "bus" || split;
  for (const o of [autoD, autoG, CAMILLA.g, banquito, ruedaSuelta, BANDEJA, charco, tablet]) o.visible = SET.visible;
  luzPorton.visible = SET.visible;
  // ---- pantallas y objetos ----
  dibujarCelO(t); dibujarCelG(t); dibujarCelD(t); dibujarTablet(t);
  for (const [i, b] of spiedoBarras.entries()) b.rotation.x = t * 1.6 + i * 0.9;
  CIUDAD.position.x = -(((t * 2.2) % 5.2));
  BOTON_PARADA.userData.boton.position.z = 0.065 - 0.008 * Math.sin(Math.PI * sg(t, T.timbre - 0.08, T.timbre + 0.12));
  if (SET.visible) { ponerAutoD(t); ponerCamilla(t); }
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  for (const o of [LAMPARA, tabletM, mate, termo, celD, manoO, manoD, celGm]) o.visible = false;
  luzLampara.intensity = 0;
  celO.visible = false; celG.visible = true; celO.scale.setScalar(1);
  if (SET.visible) {
    oscar.raiz.visible = true;
    const po = poseOscar(t, pa); oscar.poner(po);
    ponerCelO(t, po);
    if (p2 && t >= T.sale6[1] - 0.05) {
      // Óscar con el mate (Q5 tras salir y en el cierre)
      oscar.raiz.updateMatrixWorld(true);
      po.manoI = [0.24, 0.16, 0.34]; po.codoI = [0.8, -0.6, -0.2]; oscar.poner(po);
      mate.visible = true; oscar.brazos[0].mano.getWorldPosition(_w); mate.position.copy(_w).add(V3(0, -0.07, 0.0)); mate.rotation.set(0, 0.3, 0);
    }
    // Maxi
    const vMaxi = ["P2", "Q3", "Q3f", "Ppiz"].includes(pa) || (pa === "Q5" && t >= T.q5 - 0.1) || pa === "Q5b";
    maxi.raiz.visible = vMaxi;
    if (vMaxi) {
      const pm = poseMaxi(t); maxi.poner(pm); maxi.raiz.updateMatrixWorld(true);
      if (t < T.q5) {
        // la lámpara de inspección en la mano izquierda (del lado de la bomba), apuntando a la bomba; en Q3f la tablet en la derecha
        const destBomba = BOMBA.localToWorld(V3(0, -0.05, 0));
        maxi.cuerpo.updateMatrixWorld(true); const mano = maxi.cuerpo.localToWorld(V3(0.46, 0.8, 0.25));
        pm.manoI = aCuerpo(maxi, mano); pm.codoI = [0.9, -0.5, -0.2];
        if (pa === "Q3f") { pm.manoI = aCuerpo(maxi, maxi.cuerpo.localToWorld(V3(0.52, 0.86, 0.3))); pm.codoI = [0.9, -0.5, -0.2]; }
        maxi.poner(pm); maxi.raiz.updateMatrixWorld(true);
        LAMPARA.visible = true; maxi.brazos[0].mano.getWorldPosition(_w); LAMPARA.position.copy(_w); LAMPARA.lookAt(destBomba); LAMPARA.rotateX(Math.PI / 2); LAMPARA.translateY(0.02);
        luzLampara.position.copy(_w).lerp(destBomba, 0.5); luzLampara.intensity = ["P2", "Q3", "Q3f"].includes(pa) ? 2.5 : 0;
        if (pa === "Q3f") { LAMPARA.visible = false; tabletM.visible = true; tabletM.scale.setScalar(1.6); maxi.brazos[0].mano.getWorldPosition(_w); tabletM.position.copy(_w).add(V3(0, 0.13, 0)); tabletM.lookAt(destBomba); }
      } else {
        // el mate en la mano derecha (hasta que Óscar se lo saca) y el termo bajo el brazo izquierdo
        termo.visible = true; maxi.cuerpo.updateMatrixWorld(true); termo.position.copy(maxi.cuerpo.localToWorld(V3(0.33, 0.05, 0.0))); termo.quaternion.copy(maxi.cuerpo.getWorldQuaternion(_q)); termo.rotateZ(0.25);
        if (t < T.sale6[1] - 0.05) { mate.visible = true; maxi.brazos[1].mano.getWorldPosition(_w); mate.position.copy(_w).add(V3(0, -0.07, 0)); mate.rotation.set(0, 0, 0); }
      }
    }
  }
  if (BUS.visible) {
    daniel.raiz.visible = true; const pd = poseDaniel(t); daniel.poner(pd); daniel.raiz.updateMatrixWorld(true);
    // la izquierda en el pasamanos
    pd.manoI = aCuerpo(daniel, V3(60.25, 1.74, 0.15)); pd.codoI = [0.8, -0.3, -0.2];
    celD.visible = true;
    if (t < P2) {
      const oreja = daniel.cabeza.localToWorld(V3(-0.33, 0.24, 0.1)); celD.position.copy(oreja); daniel.cabeza.getWorldQuaternion(_q); celD.quaternion.copy(_q); celD.rotateY(-Math.PI / 2 + 0.25); celD.rotateZ(0.3);
      pd.manoD = aCuerpo(daniel, celD.position.clone().add(V3(0, -0.06, 0))); pd.codoD = [-1, -0.5, -0.4];
    } else {
      const pos = daniel.cuerpo.localToWorld(V3(-0.1, 0.36, 0.34)); celD.position.copy(pos); daniel.cuerpo.getWorldQuaternion(_q); celD.quaternion.copy(_q); celD.rotateX(-0.75);
      pd.manoD = aCuerpo(daniel, celD.position.clone().add(V3(0, -0.07, -0.01))); pd.codoD = [-0.8, -0.7, -0.2];
      if (en(t, T.timbre - 0.4, T.timbre + 0.3)) { const k = Math.sin(Math.PI * sg(t, T.timbre - 0.4, T.timbre + 0.3)); BOTON_PARADA.updateMatrixWorld(true); pd.manoI = lerpV(pd.manoI, aCuerpo(daniel, BOTON_PARADA.localToWorld(V3(0, 1.35, 0.1))), k); pd.dedoI = k; }
    }
    daniel.poner(pd);
    if (pa === "Q3d" || pa === "Q3a" || pa === "Q4bi") daniel.raiz.visible = false;
    pasajeros[0].raiz.visible = pasajeros[1].raiz.visible = true;
    pasajeros[0].poner({ x: 58.35, y: 0.0, z: -0.62, giro: 0.15, sentado: 1, ...CARA.neutra, ojos: { abiertos: 0.8, y: -0.6 }, cabeza: { giro: 0.2, asiente: 0.3 }, manoI: [0.12, 0.3, 0.32], manoD: [-0.12, 0.3, 0.32], t });
    pasajeros[1].poner({ x: 61.35, y: 0.0, z: -0.62, giro: -0.1, sentado: 1, ...CARA.neutra, ojos: { abiertos: 0.85 }, cabeza: { giro: -0.4, asiente: 0.0 }, manoI: [0.15, 0.3, 0.3], manoD: [-0.15, 0.3, 0.3], t });
  }
  if (ROT.visible) { graciela.raiz.visible = pa !== "Q1i"; const pg = poseGraciela(t); if (pa === "Q1g") { const yaw = Math.atan2(GRA.x - 0.12 - GRA.x, 0.7 - GRA.z); pg.cabeza = { ...(pg.cabeza || {}), giro: cl(yaw * 0.9, -0.6, 0.6) }; } if (pa === "Q1g") { pg.cabeza = { ...(pg.cabeza || {}), giro: -0.25, asiente: 0.18 }; pg.ojos = { ...(pg.ojos || {}), x: -0.5, y: -0.5, abiertos: 1 }; } if (pa === "Q1g") { pg.manoD = [-0.1, 0.4, 0.36]; pg.codoD = [-0.8, -0.6, -0.2]; pg.manoI = [0.08, 0.36, 0.36]; pg.codoI = [0.8, -0.6, -0.2]; pg.cabeza = { ...(pg.cabeza || {}), giro: 0.05, asiente: 0.3 }; pg.ojos = { ...(pg.ojos || {}), x: 0, y: -0.75, abiertos: 1 }; }
    graciela.poner(pg);
    if (pa === "Q1g") { graciela.raiz.updateMatrixWorld(true); celG.visible = false; celGm.visible = true; const a = new THREE.Vector3(), b = new THREE.Vector3(); graciela.brazos[1].mano.getWorldPosition(a); graciela.brazos[0].mano.getWorldPosition(b); celGm.position.copy(a).lerp(b, 0.5).add(V3(0, 0.1, 0.02)); celGm.lookAt(graciela.cabeza.localToWorld(V3(0, 0.1, 0.3))); } }
  // ---- cámara ----
  if (pl[2]) { ponerCam(catmull(pl[2], t), t); camera.updateMatrixWorld(true); }
  if (pa === "P3") {
    // el inserto: el celular de Óscar, de frente, con el taller detrás
    celO.visible = true; manoO.visible = false; celO.scale.setScalar(1);
    celO.position.set(-0.55, 1.15, 3.6); celO.rotation.set(-0.12, 0.25, 0.03);
    camPantalla(celO, V3(0, 0.0, 0.0075), V3(0, 0, 1), 0.172, 0.68, 36, t, 0.02 * (1 - eo(sg(t, T.p3, T.p3 + 0.6))));
    celO.updateMatrixWorld(true);
    manoO.position.copy(celO.localToWorld(V3(0.035, -0.105, -0.012))); manoO.quaternion.copy(celO.quaternion);
    manoO.userData.pulgar.rotation.set(0, 0, 0.55); manoO.visible = false;
  }
  if (pa === "Q1i") {
    celGsoporte.updateMatrixWorld(true);
    camPantalla(celG, V3(0, 0.0, 0.0075), V3(0, 0, 1), 0.172, 0.7, 36, t, 0.03 * (1 - eo(sg(t, T.q1i, T.q1i + 0.5))));
  }
  if (pa === "Q2") {
    tablet.updateMatrixWorld(true);
    const piv = tablet.children[0];
    camPantalla(piv, V3(0, 0.2, 0.0065), V3(0, 0, 1), 0.36 * 1.45, 0.64, 40, t, 0.08 * (1 - eo(sg(t, T.q2, T.q2 + 0.7))));
  }
  if (pa === "Q3d" || pa === "Q3a" || pa === "Q4bi") {
    // el inserto del celular de Daniel (sostenido delante, en el ómnibus)
    celD.updateMatrixWorld(true);
    camPantalla(celD, V3(0, 0.0, 0.0075), V3(0, 0, 1), 0.172, 0.7, 36, t, pa === "Q3d" ? 0.03 * (1 - eo(sg(t, T.q3d, T.q3d + 0.5))) : pa === "Q4bi" ? 0.02 * (1 - eo(sg(t, T.q4b, T.q4b + 0.5))) : 0);
    if (pa === "Q3a") {
      manoD.visible = true; celD.updateMatrixWorld(true);
      const toca = Math.sin(Math.PI * sg(t, T.aprueba - 0.2, T.aprueba + 0.12)) * (t < T.aprobado + 0.05 ? 1 : 0);
      const r = 0.5, punta = V3(0.02 - 0.062 * Math.sin(r), 0.062 * Math.cos(r), 0), boton = V3(0.0, -0.034, 0);
      const pos = V3(0.05, -0.15, -0.006).lerp(boton.clone().sub(punta), toca);
      manoD.position.copy(celD.localToWorld(pos)); manoD.quaternion.copy(celD.getWorldQuaternion(new THREE.Quaternion()));
      manoD.userData.pulgar.rotation.set(0, 0, r); manoD.userData.pulgar.position.set(0.02, 0, 0.019);
      manoD.visible = toca > 0.02;
    }
  }
  if (split) {
    // arriba: Óscar sentado en la camilla con el celular, el elevador detrás · abajo: Daniel en el ómnibus
    const kA = sg(t, pl[1], T.p6);
    ponerCamX(camA, [0.15, 1.2, lerp(5.45, 5.3, kA), 0.12, 1.12, 3.6, 38]);
    ponerCamX(camB, [DAN.x + 0.1, 1.55, lerp(1.6, 1.5, kA), DAN.x - 0.05, 1.5, DAN.z, 44]);
    camera.position.set(0, 0, 0); camera.fov = 50; camera.aspect = 1080 / 1920; camera.updateProjectionMatrix(); camera.lookAt(0, 0, -1);
  }
  if (VER === "portada") { maxi.raiz.visible = false; LAMPARA.visible = false; luzLampara.intensity = 0; ponerCam([0.2, 1.0, 5.75, 0.05, 0.72, 3.4, 44], t, true); }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  for (const pt of autoG.userData.patentes) pt.visible = !(pa === "P6" || pa === "C" || pa === "P5s" || pa === "Q5b" || VER === "portada");
  const camOjo = split ? camA : camera;
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camOjo.position);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROT_) ROT_[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const di = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) => { if (t >= ti - 0.04 && t < fin) hablar(GL[k], per, ent(ti - 0.04), orden, dx, minY, maxY, sobre); };
    // las llamadas: la burbuja sale del celular (con el avatar y el nombre)
    const delCel = (k, ti, fin, cx = 540, cy = 640, orden = 1) => { if (t >= ti - 0.04 && t < fin) { celO.updateMatrixWorld(true); ponerGlobo(GL[k], cx, cy, ent(ti - 0.04), enPantalla(celO.getWorldPosition(new THREE.Vector3())), orden); } };
    if (pa === "P1") { delCel("g1", T.g1, T.p2, 540, 640); di("o1", oscar, T.o1, T.p2, 2, 120, 820); }
    if (pa === "P2" || pa === "Q3") di("m1", maxi, pa === "P2" ? T.m1 : T.m1b, pa === "P2" ? T.p3 : T.q3o, 1, 0, 330);
    T.cortes.forEach((c, i) => { if (pa === `P4c${i}`) delCel(`k${i}`, c + 0.02, i < 2 ? c + 0.5 : T.piz, 540, 560); });
    if (pa === "P4c2") di("o2", oscar, T.o2, T.piz, 2, 120, 740);
    if (pa === "P3" && t >= T.foto + 0.02) ponerGlobo(ROT_.sinfoto, 540, 150, ent(T.foto + 0.02), null, 2);
    if (pa === "Ppiz") {
      const [px2, py2] = enPantalla(V3(PIZ.x, PIZ.y - PIZ.h / 2 + 0.05, ZF + 0.2));
      const r0 = ROT_.elev, r1 = ROT_.serv;
      ponerGlobo(r0, 540, 480, ent(T.rotP[0]), null, 2);
      ponerGlobo(r1, 540, 1560, ent(T.rotP[1]), null, 2); if (t >= T.rotP[1]) ponerGuia(GUIAS[1], 540, 1560 - r1.userData.H / 2 + 4, px2, py2, sg(t, T.rotP[1], T.rotP[1] + 0.2));
    }
    if (pa === "P5" && t >= T.o3 - 0.04) ponerGlobo(GL.o3, 760, 1150, ent(T.o3 - 0.04), enPantalla(bocaW(oscar)), 1);
    if (split) {
      if (t >= T.d1 - 0.04) { PROY = [camB, 1]; hablar(GL.d1, daniel, ent(T.d1 - 0.04), 2, -140, 990, 1880, 50); PROY = null; }
    }
    if (pa === "P6") { if (t >= T.o4 - 0.04) { const b = enPantalla(bocaW(oscar)); ponerGlobo(GL.o4, 540, 1540, ent(T.o4 - 0.04), b, 1); } }
    if (pa === "P7" && t >= T.ring7 && t < P1) { celO.updateMatrixWorld(true); ponerGlobo(GL.k2, 540, 560, ent(T.ring7), enPantalla(celO.getWorldPosition(new THREE.Vector3())), 1); }
    if (pa === "Q1" && t >= T.aviso) { const r = ROT_.enviado; const [bx, by] = objPx(celO, V3(0, 0.092, 0.008)); ponerGlobo(r, 540, 330, ent(T.aviso), null, 2); ponerGuia(GUIAS[0], 540, 330 + r.userData.H / 2 - 4, bx, by, sg(t, T.aviso, T.aviso + 0.2)); }
    if (pa === "Q1i") ponerGlobo(ROT_.aviso, 540, 175, ent(T.q1i + 0.02), null, 2);
    if (pa === "Q1g") di("g2", graciela, T.g2, T.q2, 1, 0, 230);
    if (pa === "Q2" && t >= T.tarj[0] + 0.3) ponerGlobo(ROT_.panel, 540, 1790, ent(T.tarj[0] + 0.3), null, 2);
    if (pa === "Q3o" && t >= T.o5 - 0.04) { const [lx, ly] = enPantalla(CAMILLA.g.localToWorld(V3(0, 0.2, -0.2))); ponerGlobo(GL.o5, 540, 330, ent(T.o5 - 0.04), [lx, ly], 1); }
    if (pa === "Q3d") ponerGlobo(ROT_.extra, 540, 175, ent(T.q3d + 0.05), null, 2);
    if (pa === "Q3e") di("d2", daniel, T.d2, T.q3a, 1, 0, 230);
    if (pa === "Q4") {
      const [ex, ey] = objPx(autoD, V3(-0.86, 0.75, 1.3)), r0 = ROT_.aprob;
      ponerGlobo(r0, 330, 1650, ent(T.rotQ[0]), null, 2); if (t >= T.rotQ[0]) ponerGuia(GUIAS[0], 330, 1650 - r0.userData.H / 2 + 4, ex, ey, sg(t, T.rotQ[0], T.rotQ[0] + 0.2));
    }
    if (pa === "Q4p") {
      const [px2, py2] = enPantalla(V3(PIZ.x, PIZ.y - PIZ.h / 2 + 0.05, ZF + 0.2)), r1 = ROT_.entra;
      ponerGlobo(r1, 540, 1560, ent(T.rotQ[1]), null, 2); if (t >= T.rotQ[1]) ponerGuia(GUIAS[1], 540, 1560 - r1.userData.H / 2 + 4, px2, py2, sg(t, T.rotQ[1], T.rotQ[1] + 0.2));
    }
    if (pa === "Q4bi") ponerGlobo(ROT_.pronto, 540, 175, ent(T.q4b), null, 2);
    if (pa === "Q5" || pa === "Q5b") {
      if (pa === "Q5" && t >= T.o6 - 0.04) { celO.updateMatrixWorld(true); const [lx, ly] = enPantalla(CAMILLA.g.localToWorld(V3(0, 0.2, -0.2))); ponerGlobo(GL.o6, 560, 640, ent(T.o6 - 0.04), [lx, ly], 1); }
      if (t >= T.m2 - 0.04 && t < T.m2 + LEN.m2 + 0.3) { const b = enPantalla(bocaW(maxi)); ponerGlobo(GL.m2, b[0] + 400, b[1] - 230, ent(T.m2 - 0.04), [b[0] + 60, b[1] - 20], 2); }
    }
  }
  // pizarra: los tachones (P4) y los tildes (Q4)
  { const tach = p2 ? 0 : T.tacha.reduce((a, b, i) => a + sg(t, b, b + 0.16), 0); const til = p2 ? T.tilde.filter((b) => t >= b).length : 0; const k = `${tach.toFixed(2)}|${til}`; if (pizT.userData.k !== k) { pizT.userData.k = k; dibujarPizarra(tach, til); } }
  if (split) {
    renderer.setScissorTest(true);
    renderer.setViewport(0, 960, 1080, 960); renderer.setScissor(0, 960, 1080, 960);
    ponerLuces(["taller"]); scene.background = new THREE.Color(FONDO.taller); renderer.render(scene, camA);
    for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camB.position);
    ponerLuces(["bus"]); scene.background = new THREE.Color(FONDO.bus);
    renderer.setViewport(0, 0, 1080, 960); renderer.setScissor(0, 0, 1080, 960); renderer.render(scene, camB);
    renderer.setScissorTest(false); renderer.setViewport(0, 0, 1080, 1920);
    const bg = scene.background; scene.background = null; renderer.autoClear = false; camera.layers.set(1);
    renderer.clearDepth(); renderer.render(scene, camera);
    camera.layers.enableAll(); renderer.autoClear = true; scene.background = bg;
  } else renderer.render(scene, camera);
}

// ---- las fotos (con la escena armada) ----
{
  ponerLuces(["taller"]); SET.visible = true; ROT.visible = BUS.visible = false;
  for (const p of TODOS) p.raiz.visible = false;
  for (const o of [LAMPARA, tabletM, mate, termo, celD, manoO, manoD, celO]) o.visible = false;
  { ponerAutoD(T.p2 + 0.4); autoD.updateMatrixWorld(true); const b = BOMBA.localToWorld(V3(0, 0, 0)); luzLampara.position.set(b.x + 0.25, b.y - 0.35, b.z + 0.3); luzLampara.intensity = 4; luzLampara.distance = 2.5;
    sacarFoto("bomba", [b.x + 0.55, b.y - 0.55, b.z + 0.6, b.x, b.y - 0.02, b.z, 38], () => { ponerAutoD(T.p2 + 0.4); ponerCamilla(0); }); luzLampara.intensity = 0; luzLampara.distance = 1.6; }
  sacarFoto("graciela", [GX + 2.6, 1.3, GZ + 3.6, GX, 0.7, GZ, 42], () => { ponerAutoD(0); ponerCamilla(T.p2); oscar.raiz.visible = true; oscar.poner(poseOscar(T.p2 + 0.5)); });
  sacarFoto("sedan", [LX + 2.4, 1.2, LZ + 3.6, LX, 0.6, LZ, 40], () => { ponerAutoD(T.q4 + 1.5); });
  oscar.raiz.visible = false;
}
dibujarTabM();

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)), bomba: enPantalla(BOMBA.localToWorld(V3(0, 0, 0))).map(Math.round), gota: enPantalla(GOTA.position).map(Math.round), tab: [tabletM.visible, ...tabletM.position.toArray().map((v) => +v.toFixed(2))], ruedita: [RUEDITA.visible, ...RUEDITA.position.toArray().map((v) => +v.toFixed(2)), ...enPantalla(RUEDITA.position).map(Math.round)] }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
