// Capa 3D de resto-reservas (Three.js r170 local). Base técnica: reels/parrilla-no-vuelve (el mismo set: la parrilla de
// Raúl, de noche; globos pegados a la cámara en píxeles de pantalla, avatares por render target, poses por claves, bocas
// por envolvente, PLANOS con Catmull-Rom, insertos a pantalla completa) y reels/dist-quien-debe. renderAt(t) es una
// función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// UN lugar: la parrilla de Raúl. Pared del fondo (z = -3): la parrilla a leña con la campana y el brasero a la izquierda,
// el mostrador con el cuaderno de reservas (parte 1) o el celular parado y la tablet (parte 2), la puerta de calle y la
// pizarra a la derecha; en el salón, la MESA 7 (para 8) al medio. El living de Walter es un set chico aparte (x = 30).
//   PARTE 1: miércoles 20:00 "Raúl, soy Pablo. ¿Me guardás mesa para ocho, el viernes, a las diez?" · "¡Anotado, Pablo!" ·
//            viernes 21:40 Walter y su familia: "¿Tenés mesa para seis?" · "No, Walter. Esa es de Pablo." · 22:45 "¿Y los
//            de las diez?" · "Están llegando." · 23:40 "¿Y?" · "Siguen llegando."
//   PARTE 2: miércoles 2:14 el agente contesta la misma nota de voz · jueves: confirma, libera la mesa, se la ofrece a
//            Walter: "¡Esta vez sí entramos!" · viernes: contesta solo, "Ese, para mí." · "¿Y los de las diez?" ·
//            "Llegaron." · Raúl: "Comentá RESERVA…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, CARA, BRAZOS, MARCA, PIEL, pegarACamara, crearCelular, crearTablet, saludo, poseEn } from "./personajes.js";
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
scene.background = new THREE.Color(0x16243d);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.03, 120);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x6a6658);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(10, 1.2, 0, 7, 0, 0, 0xfff6e8, 1.4);
  tira(4, 6, 6, 2, -1, Math.PI / 2, 0xfff2dc, 1.3);
  tira(1.4, 8, -4, 1, 6, 0, 0xe8eeff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.5;

// ---------- luces: noche en la parrilla. Las lámparas colgantes (luz crema desde arriba, con sombra), el cielo cálido,
// un relleno frío desde el salón y la brasa (naranja, sin sombra) que le pega a Raúl desde abajo. A las 23:40 la mitad de
// las lámparas se apagan; el miércoles a las 2:14 el salón está a oscuras (la calle por la puerta) ----------
const sol = new THREE.DirectionalLight(0xfff0d8, 1.55);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 0.5, far: 25 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xfff1dc, 0x5a4a3c, 1.6); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xe6ecff, 0.6); relleno.position.set(2, 3, 8); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xffe2c0, 0.45); rim.position.set(-3, 4, -9); scene.add(rim);
const brasaL = new THREE.PointLight(0xff9a50, 2.4, 3.2, 1.6); brasaL.position.set(-1.3, 1.05, -1.75); scene.add(brasaL);
const foco = new THREE.SpotLight(0xfff2dc, 9, 4.5, 0.75, 0.6, 1.4); foco.position.set(-1.3, 2.05, -1.5); foco.target.position.set(-1.3, 0.9, -1.95); scene.add(foco, foco.target);
// la vela (P4-P6, Q4): una luz cálida chica sobre la mesa 7
const velaL = new THREE.PointLight(0xffb060, 0, 1.6, 1.8); scene.add(velaL);
// el celular del local a oscuras (Q1): la pantalla ilumina el mostrador
const celL = new THREE.PointLight(0xdfe8ff, 0, 1.4, 1.6); scene.add(celL);
function ponerSol(cx, cz) { sol.position.set(cx + 2.5, 7, cz + 4); sol.target.position.set(cx, 0.6, cz); sol.target.updateMatrixWorld(); }
ponerSol(0, -0.5);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, gp: 0xcfeebc, red: 0xc7655b, blanco: 0xf8f7f2, piso: 0xc9c5b6, metal: 0xc4c8cf };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.75), cr2: mat(C.cr2, 0.75), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  blanco: mat(C.blanco, 0.85), metal: mat(C.metal, 0.3, { metalness: 0.5 }), goma: mat(0x23262c, 0.8),
  vidrio: new THREE.MeshPhysicalMaterial({ color: 0xcfe2f2, roughness: 0.05, transparent: true, opacity: 0.18, depthWrite: false }),
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
// LA PARRILLA DE RAÚL (el set de parrilla-no-vuelve, reacomodado): pared del fondo en z = GZ con la parrilla a la
// izquierda, el mostrador del cuaderno al lado, la puerta y la pizarra a la derecha; la mesa 7 al medio del salón
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const GZ = -3.0, ALTO = 3.0, XW = 3.6;
const GRILL = { x: -1.3, z: -1.9, w: 1.5, d: 0.7, base: 0.8, y: 0.9, tilt: 0.1 };
const RAUL0 = { x: -0.66, z: -2.62 };
const MOS = { x: 0.04, z: -2.2, w: 0.76, d: 0.56, alto: 0.95 };   // el mostrador del cuaderno (al lado de la parrilla)
const PIZ = { x: 2.45, y: 1.55, z: GZ + 0.06, w: 0.95, h: 1.45 };
const PUERTA = { x: 1.3, w: 0.92 };
const M7 = { x: 0.35, z: 0.0, L: 1.9, D: 0.86, H: 0.74 };      // la mesa 7, para 8
const MADERA = mat(0x3b2a20, 0.62), MADERA2 = mat(0x4a3628, 0.6), HIERRO = mat(0x1d1f24, 0.55, { metalness: 0.35 }), CHAPA = mat(C.navy3, 0.45, { metalness: 0.25 });
const PARED = mat(C.navy2, 0.92);
const mantelT = lienzo(256, 256, (x, w) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, w); x.fillStyle = "rgba(31,50,84,0.55)"; for (let i = 0; i < 4; i++) { x.fillRect(i * 64, 0, 26, w); x.fillRect(0, i * 64, w, 26); } });
mantelT.wrapS = mantelT.wrapT = THREE.RepeatWrapping; mantelT.repeat.set(2.2, 1.8);
const MANTEL = new THREE.MeshStandardMaterial({ map: mantelT, roughness: 0.9 });
const mantel7T = mantelT.clone(); mantel7T.needsUpdate = true; mantel7T.repeat.set(4.4, 2.0);
const MANTEL7 = new THREE.MeshStandardMaterial({ map: mantel7T, roughness: 0.9 });
const LOZA = mat(0xf3f1e8, 0.35), VIDRIO_V = new THREE.MeshPhysicalMaterial({ color: 0x8fc4a0, roughness: 0.1, transparent: true, opacity: 0.55 });
const COPA_M = new THREE.MeshStandardMaterial({ color: 0xd9e6ee, roughness: 0.2, transparent: true, opacity: 0.5, depthWrite: false });
const BRASA = new THREE.MeshStandardMaterial({ color: 0x2a1a14, emissive: 0xd9772f, emissiveIntensity: 1.0, roughness: 0.9 });
const brasasT = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#d9772f"; x.fillRect(0, 0, w, h); semilla = 11; for (let i = 0; i < 70; i++) { x.fillStyle = i % 3 ? "#5a2c18" : "#8a8278"; x.beginPath(); x.ellipse(az() * w, az() * h, 10 + az() * 22, 7 + az() * 14, az() * 3, 0, 7); x.fill(); } });
const BRASAS = new THREE.MeshStandardMaterial({ map: brasasT, emissive: 0xffffff, emissiveMap: brasasT, emissiveIntensity: 0.85, roughness: 1 });
function frustum(w0, d0, w1, d1, h) {
  const g = new THREE.CylinderGeometry(Math.SQRT1_2, Math.SQRT1_2, h, 4, 1, true); g.rotateY(Math.PI / 4);
  const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const top = p.getY(i) > 0; p.setX(i, p.getX(i) * (top ? w1 : w0)); p.setZ(i, p.getZ(i) * (top ? d1 : d0)); }
  g.computeVertexNormals(); return g;
}
{
  const piso = mesh(new THREE.PlaneGeometry(2 * XW, 9.5), mat(0xb8b2a2, 0.85), 0, 0, 1.75); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  const pared = (w, h, x, y, z, ry) => { const p = mesh(new THREE.BoxGeometry(w, h, 0.1), PARED, x, y, z); p.rotation.y = ry; p.castShadow = false; SET.add(p); return p; };
  pared(2 * XW + 0.1, ALTO, 0, ALTO / 2, GZ - 0.05, 0);
  for (const s of [-1, 1]) pared(9.5, ALTO, s * (XW + 0.05), ALTO / 2, 1.75, Math.PI / 2);
  pared(2 * XW + 0.1, ALTO, 0, ALTO / 2, 6.5, 0);
  SET.add(caja(2 * XW, 0.14, 0.03, MADERA, 0, 0.07, GZ + 0.015, 0.005));
  for (const s of [-1, 1]) { const z = caja(9.5, 0.14, 0.03, MADERA, s * (XW - 0.015), 0.07, 1.75, 0.005); z.rotation.y = Math.PI / 2; SET.add(z); }
  const techo = mesh(new THREE.PlaneGeometry(2 * XW, 9.5), new THREE.MeshBasicMaterial({ color: 0x2a3550 }), 0, ALTO, 1.75); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
  for (let i = 0; i < 6; i++) { const v = caja(2 * XW, 0.16, 0.14, MADERA, 0, ALTO - 0.08, GZ + 0.5 + i * 1.5, 0.01); v.castShadow = false; SET.add(v); }
  // ---- la parrilla: base de ladrillo revocada navy3 con la tapa de madera al frente ----
  const g = new THREE.Group(); g.position.set(GRILL.x, 0, GRILL.z); SET.add(g);
  g.add(caja(GRILL.w + 0.2, GRILL.base, GRILL.d + 0.2, M.navy3, 0, GRILL.base / 2, 0, 0.02));
  for (let i = 0; i < 4; i++) g.add(caja(GRILL.w + 0.21, 0.012, 0.012, M.edge, 0, 0.18 + i * 0.16, GRILL.d / 2 + 0.105, 0.003));
  g.add(caja(GRILL.w + 0.26, 0.05, 0.08, MADERA2, 0, GRILL.base + 0.02, GRILL.d / 2 + 0.11, 0.01));
  const cama = mesh(new THREE.PlaneGeometry(GRILL.w - 0.05, GRILL.d - 0.05), BRASAS, 0, GRILL.base + 0.008, 0); cama.rotation.x = -Math.PI / 2; cama.castShadow = false; g.add(cama);
  semilla = 21;
  for (let i = 0; i < 22; i++) { const b = mesh(new THREE.DodecahedronGeometry(0.025 + az() * 0.02, 0), BRASA, (az() - 0.5) * (GRILL.w - 0.15), GRILL.base + 0.02, (az() - 0.5) * (GRILL.d - 0.12)); b.scale.y = 0.6; b.castShadow = false; g.add(b); }
  for (const s of [-1, 1]) g.add(caja(0.04, 0.16, GRILL.d + 0.04, HIERRO, s * (GRILL.w / 2 + 0.02), GRILL.base + 0.08, 0, 0.005));
  g.add(caja(GRILL.w + 0.08, 0.2, 0.04, HIERRO, 0, GRILL.base + 0.1, -GRILL.d / 2 - 0.02, 0.005));
}
const PARR = new THREE.Group(); PARR.position.set(GRILL.x, GRILL.y, GRILL.z); PARR.rotation.x = GRILL.tilt; SET.add(PARR);
{
  const n = 34;
  for (let i = 0; i < n; i++) { const x = -0.36 + (i * (GRILL.w / 2 - 0.03 + 0.36)) / (n - 1); for (const s of [-1, 1]) { const v = caja(0.006, 0.026, GRILL.d, HIERRO, x + s * 0.007, 0, 0, 0.002); v.rotation.z = s * 0.45; PARR.add(v); } }
  PARR.add(caja(GRILL.w + 0.04, 0.03, 0.03, HIERRO, 0, -0.005, -GRILL.d / 2, 0.006));
  const can = mesh(new THREE.CylinderGeometry(0.028, 0.028, GRILL.w + 0.04, 16, 1, true, 0, Math.PI), HIERRO, 0, -0.012, GRILL.d / 2 + 0.02); can.rotation.z = Math.PI / 2; can.material.side = THREE.DoubleSide; PARR.add(can);
  PARR.add(mesh(new THREE.TorusGeometry(0.05, 0.008, 6, 16), HIERRO, GRILL.w / 2 + 0.07, -0.02, 0.1).rotateY(Math.PI / 2));
}
{
  const cg = mesh(frustum(2.25, 1.0, 0.55, 0.4, 0.62), CHAPA, GRILL.x - 0.45, 2.36, GZ + 0.55); cg.material.side = THREE.DoubleSide; SET.add(cg);
  SET.add(caja(2.3, 0.08, 1.04, CHAPA, GRILL.x - 0.45, 2.06, GZ + 0.55, 0.01));
  SET.add(caja(0.42, ALTO - 2.6, 0.34, CHAPA, GRILL.x - 0.45, 2.6 + (ALTO - 2.6) / 2, GZ + 0.45, 0.01));
  SET.add(caja(2.32, 0.03, 0.02, mat(C.g, 0.5), GRILL.x - 0.45, 2.06, GZ + 1.07, 0.005));
  SET.add(caja(2.25, 1.25, 0.02, mat(0xd9d7c9, 0.5), GRILL.x - 0.45, 1.4, GZ + 0.02, 0.005));
  for (let i = 1; i < 6; i++) SET.add(caja(2.25, 0.008, 0.024, mat(0xb4b2a3, 0.6), GRILL.x - 0.45, 0.78 + i * 0.21, GZ + 0.025, 0.002));
  for (const [x, l] of [[-2.35, 0.55], [-2.22, 0.5]]) { SET.add(caja(0.014, l, 0.014, HIERRO, x, 1.55 - l / 2, GZ + 0.06, 0.004)); }
  SET.add(caja(0.09, 0.12, 0.012, HIERRO, -2.35, 1.0, GZ + 0.065, 0.004));
}
const BRASERO = new THREE.Group(); BRASERO.position.set(GRILL.x - 0.53, GRILL.base - 0.83, GRILL.z - 0.02); SET.add(BRASERO);
const LLAMAS = [];
{
  const b = BRASERO;
  for (let i = 0; i < 6; i++) for (const s of [-1, 1]) { b.add(caja(0.012, 0.3, 0.012, HIERRO, -0.25 + i * 0.1, 0.97, s * 0.22, 0.003)); b.add(caja(0.012, 0.3, 0.012, HIERRO, s * 0.25, 0.97, -0.25 + i * 0.1, 0.003)); }
  for (const y of [0.83, 1.11]) for (const s of [-1, 1]) { b.add(caja(0.52, 0.014, 0.014, HIERRO, 0, y, s * 0.22, 0.003)); b.add(caja(0.014, 0.014, 0.46, HIERRO, s * 0.25, y, 0, 0.003)); }
  const corteza = mat(0x5a3a24, 0.9), punta = new THREE.MeshStandardMaterial({ color: 0x3a2014, emissive: 0xd9772f, emissiveIntensity: 0.9 });
  semilla = 5;
  for (let i = 0; i < 6; i++) {
    const L = 0.42 + az() * 0.12, tr = mesh(new THREE.CylinderGeometry(0.04, 0.045, L, 10), [corteza, punta, punta], (az() - 0.5) * 0.2, 0.9 + (i % 3) * 0.06, (az() - 0.5) * 0.2);
    tr.rotation.set(Math.PI / 2 + (az() - 0.5) * 0.5, 0, (i % 2 ? 1 : -1) * (0.5 + az() * 0.6)); b.add(tr);
  }
  b.add(mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.04, 20), BRASAS, 0, 0.84, 0));
  const LL = [new THREE.MeshBasicMaterial({ color: 0xd9772f }), new THREE.MeshBasicMaterial({ color: 0xe8a050 }), new THREE.MeshBasicMaterial({ color: 0xf2d7a0 })];
  for (let i = 0; i < 5; i++) { const l = new THREE.Mesh(new THREE.ConeGeometry(0.06 - (i % 3) * 0.012, 0.28, 7), LL[i % 3]); l.position.set(-0.12 + i * 0.06, 1.08, (i % 2 ? 0.05 : -0.04)); l.userData.base = l.position.clone(); b.add(l); LLAMAS.push(l); }
}
// (r2) la alfombra de goma navy delante del mostrador y de la parrilla (el piso crema hacía una cuña rara en el cuadro 0)
{ const al = mesh(new THREE.PlaneGeometry(1.6, 0.9), mat(0x1a2236, 0.95), -0.35, 0.003, -1.55); al.rotation.x = -Math.PI / 2; al.castShadow = false; SET.add(al); }
// ---- el mostrador (frente navy3 con el filete verde, tapa de madera): el frasco de escarbadientes y el portaservilletas ----
{
  const g = new THREE.Group(); g.position.set(MOS.x, 0, MOS.z); SET.add(g);
  g.add(caja(MOS.w, MOS.alto - 0.04, MOS.d, M.navy3, 0, (MOS.alto - 0.04) / 2, 0, 0.02));
  g.add(caja(MOS.w + 0.06, 0.045, MOS.d + 0.06, MADERA2, 0, MOS.alto - 0.02, 0.0, 0.01));
  g.add(caja(MOS.w - 0.1, 0.05, 0.02, M.g, 0, MOS.alto - 0.15, MOS.d / 2 + 0.005, 0.01));
  g.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.1, 14), new THREE.MeshPhysicalMaterial({ color: 0xd8ecf2, roughness: 0.1, transparent: true, opacity: 0.5 }), 0.3, MOS.alto + 0.05, -0.18));
  for (let i = 0; i < 9; i++) g.add(caja(0.004, 0.11, 0.004, mat(0xe2c99a, 0.8), 0.3 + ((i % 3) - 1) * 0.012, MOS.alto + 0.07, -0.18 + (Math.floor(i / 3) - 1) * 0.012, 0.001));
}
// ---- la pizarra de tiza: "VIERNES" y el menú fijo ----
const pizT = lienzo(1024, 1560, (x, W, H) => {
  x.fillStyle = "#1c2a24"; x.fillRect(0, 0, W, H);
  x.fillStyle = "rgba(236,233,220,0.06)"; for (let i = 0; i < 6; i++) x.fillRect(60 + (i % 3) * 300, 60 + Math.floor(i / 3) * 700, 260, 160);
  x.fillStyle = "#ece9dc"; x.textAlign = "center"; x.textBaseline = "middle";
  const tit = (txt, y, px) => { x.save(); x.font = CAV(px); const w0 = x.measureText(txt).width; x.translate(W / 2, y); if (w0 > W - 60) x.scale((W - 60) / w0, 1); x.fillText(txt, 0, 0); x.restore(); };
  x.font = CAV(78); x.fillText("HOY", W / 2, 90);
  tit("VIERNES", 290, 230);
  x.fillRect(110, 505, W - 220, 9);
  ["TIRA · VACÍO", "CHORIZO", "MORCILLA", "PROVOLETA"].forEach((l, i) => tit(l, 650 + i * 225, 132));
});
{
  const g = new THREE.Group(); g.position.set(PIZ.x, PIZ.y, PIZ.z); SET.add(g);
  g.add(caja(PIZ.w + 0.08, PIZ.h + 0.08, 0.04, MADERA, 0, 0, 0, 0.01));
  const sup = plano(PIZ.w, PIZ.h, pizT, 0, 0, 0.022, true); sup.material.color = new THREE.Color(0xc8c8c0); g.add(sup);
  g.add(caja(PIZ.w * 0.8, 0.025, 0.06, MADERA, 0, -PIZ.h / 2 - 0.05, 0.03, 0.005));
}
// ---- la puerta de calle (vidrio, marco de madera, "Parrilla Raúl" en vinilo crema, campanita) ----
const PUERTA_HOJA = new THREE.Group();
const AFUERA = mat(0x0f1a2e, 0.9);
{
  const g = new THREE.Group(); g.position.set(PUERTA.x, 0, GZ + 0.02); SET.add(g);
  for (const [w, h, x, y] of [[PUERTA.w + 0.16, 0.1, 0, 2.27], [0.08, 2.3, -PUERTA.w / 2 - 0.04, 1.15], [0.08, 2.3, PUERTA.w / 2 + 0.04, 1.15]]) g.add(caja(w, h, 0.1, MADERA, x, y, 0, 0.01));
  const afuera = mesh(new THREE.PlaneGeometry(PUERTA.w, 2.2), new THREE.MeshBasicMaterial({ color: 0x0f1a2e }), 0, 1.11, -0.06); afuera.castShadow = false; g.add(afuera);
  const farol = mesh(new THREE.CircleGeometry(0.07, 20), new THREE.MeshBasicMaterial({ color: 0xf2e2b0 }), 0.25, 1.75, -0.055); g.add(farol);
  g.add(mesh(new THREE.PlaneGeometry(PUERTA.w, 0.35), new THREE.MeshBasicMaterial({ color: 0x24324c }), 0, 0.18, -0.055));
  PUERTA_HOJA.position.set(-PUERTA.w / 2, 0, 0.0); g.add(PUERTA_HOJA);
  const marco = (w, h, x, y) => PUERTA_HOJA.add(caja(w, h, 0.05, MADERA2, x, y, 0, 0.008));
  marco(0.07, 2.18, 0.035, 1.12); marco(0.07, 2.18, PUERTA.w - 0.035, 1.12); marco(PUERTA.w, 0.08, PUERTA.w / 2, 2.17); marco(PUERTA.w, 0.18, PUERTA.w / 2, 0.1);
  const vid = mesh(new THREE.PlaneGeometry(PUERTA.w - 0.14, 1.95), M.vidrio, PUERTA.w / 2, 1.15, 0); vid.castShadow = false; PUERTA_HOJA.add(vid);
  const vinT = lienzo(1024, 384, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "Parrilla", 800, 170, w - 80); x.fillText("Parrilla", w / 2, h * 0.3); ajustar(x, "Raúl", 900, 190, w - 80); x.fillText("Raúl", w / 2, h * 0.74); });
  const vin = plano(0.66, 0.25, vinT, PUERTA.w / 2, 1.38, 0.006); vin.material.transparent = true; PUERTA_HOJA.add(vin); if (VER === "portada") vin.visible = false;   // (r4) el vinilo no asoma cortado en la portada
  PUERTA_HOJA.add(caja(0.035, 0.3, 0.05, M.metal, PUERTA.w - 0.12, 1.05, 0.04, 0.012));
  const camp = new THREE.Group(); camp.position.set(PUERTA.w / 2 - 0.3, 2.3, 0.12); g.add(camp);
  camp.add(mesh(new THREE.ConeGeometry(0.06, 0.09, 16, 1, true), mat(0xd9a441, 0.3, { metalness: 0.6, side: THREE.DoubleSide }), 0, -0.07, 0));
  camp.add(mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.05, 6), M.navy, 0, -0.01, 0));
}
// ---- las lámparas colgantes (chapa navy, disco crema que brilla); las del fondo del salón se apagan a las 23:40 ----
const LAMPS = [[-1.3, -1.5, 1], [0.35, 0.0, 1], [2.45, 0.4, 0], [2.45, 2.0, 0], [-2.35, 0.9, 0], [2.45, -1.25, 0], [-1.3, 1.9, 0], [0.25, 1.8, 0]];
const LUZ_ON = new THREE.MeshBasicMaterial({ color: 0xfff1d0 }), LUZ_OFF = new THREE.MeshBasicMaterial({ color: 0x4a4636 });
const LUCES = [];
for (const [x, z, siempre] of LAMPS) {
  SET.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.7, 6), M.navy, x, ALTO - 0.35, z));
  const pant = mesh(new THREE.CylinderGeometry(0.06, 0.24, 0.2, 20, 1, true), CHAPA, x, ALTO - 0.78, z); pant.material.side = THREE.DoubleSide; SET.add(pant);
  const luz = new THREE.Mesh(new THREE.CircleGeometry(0.2, 20), LUZ_ON); luz.position.set(x, ALTO - 0.875, z); luz.rotation.x = Math.PI / 2; scene.add(luz); LUCES.push([luz, siempre]);
}

// =====================================================================================================
// LA COMIDA DE LA PARRILLA (la tira con los huesitos, chorizos, morcillas, la provoleta)
// =====================================================================================================
const TIRA_C = mat(0x8a4a22, 0.45), TIRA_T = mat(0x6a3416, 0.5), TIRA_G = mat(0xd9b77a, 0.45), HUESO = mat(0xefe6d0, 0.4), MEDULA = mat(0x9a5a3a, 0.6);
function crearTira(L = 0.5, W = 0.095) {
  const g = new THREE.Group();
  const n = Math.max(2, Math.round(L / 0.07)), paso = L / n;
  g.add(mesh(rbox(L, 0.02, W * 0.92, 0.009, 2), TIRA_T, 0, 0.01, 0));
  for (let i = 0; i < n; i++) {
    const x = -L / 2 + paso * (i + 0.5);
    const b = mesh(new THREE.SphereGeometry(1, 16, 10), i % 2 ? TIRA_C : TIRA_T, x, 0.022, 0); b.scale.set(paso * 0.5, 0.024, W * 0.48); g.add(b);
    const hx = -L / 2 + paso * i + (i === 0 ? paso * 0.12 : 0);
    if (i > 0) { const h = mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.042, 14), HUESO, hx, 0.024, 0); h.scale.z = 2.0; h.scale.x = 0.75; g.add(h);
      const m = mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.002, 10), MEDULA, hx, 0.046, 0); m.scale.z = 2.2; g.add(m); }
  }
  const gr = mesh(new THREE.CylinderGeometry(0.012, 0.012, L * 0.96, 10), TIRA_G, 0, 0.018, -W / 2 + 0.004); gr.rotation.z = Math.PI / 2; g.add(gr);
  return g;
}
const CHORIZO = mat(0x7a2c16, 0.35), CHORIZO_C = mat(0x5a2414, 0.6), MORCILLA = mat(0x2b1715, 0.32);
const rellenoT = lienzo(256, 128, (x, w, h) => { x.fillStyle = "#4a1f1c"; x.fillRect(0, 0, w, h); semilla = 3; for (let i = 0; i < 60; i++) { x.fillStyle = i % 2 ? "#d9c8a0" : "#7a3a30"; x.beginPath(); x.arc(az() * w, az() * h, 3 + az() * 4, 0, 7); x.fill(); } });
function crearEmbutido(L, R, m, curva = 0.04, corte = false) {
  const g = new THREE.Group();
  const c = new THREE.QuadraticBezierCurve3(V3(-L / 2, 0, 0), V3(0, 0, curva), V3(L / 2, 0, 0));
  g.add(mesh(new THREE.TubeGeometry(c, 16, R, 12, false), m, 0, R, 0));
  for (const p of [c.getPoint(0), c.getPoint(1)]) { const e = mesh(new THREE.SphereGeometry(R, 12, 10), m, p.x, R, p.z); g.add(e); }
  if (corte === "chorizo") for (const k of [0.35, 0.65]) { const p = c.getPoint(k); const ct = caja(0.008, 0.004, R * 1.3, CHORIZO_C, p.x, 2 * R - 0.001, p.z, 0.002); g.add(ct); }
  if (corte === "abierta") { const p = c.getPoint(0.5); const ab = mesh(new THREE.SphereGeometry(1, 16, 10), new THREE.MeshStandardMaterial({ map: rellenoT, roughness: 0.7 }), p.x, 2 * R - 0.004, p.z); ab.scale.set(L * 0.3, 0.012, R * 0.75); g.add(ab); }
  return g;
}
const provT = lienzo(256, 256, (x, w) => { x.fillStyle = "#e6b84e"; x.beginPath(); x.arc(w / 2, w / 2, w / 2, 0, 7); x.fill(); semilla = 9; for (let i = 0; i < 14; i++) { x.fillStyle = "rgba(170,100,30,0.55)"; x.beginPath(); x.ellipse(40 + az() * 176, 40 + az() * 176, 14 + az() * 20, 10 + az() * 14, az() * 3, 0, 7); x.fill(); } for (let i = 0; i < 40; i++) { x.fillStyle = "#3f6a1e"; x.fillRect(30 + az() * 196, 30 + az() * 196, 6, 4); } });
function crearProvoleta(R = 0.09) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(R + 0.018, R + 0.014, 0.022, 28), HIERRO, 0, 0.011, 0));
  g.add(caja(0.16, 0.012, 0.03, HIERRO, R + 0.09, 0.012, 0, 0.004));
  g.add(mesh(new THREE.CylinderGeometry(R, R, 0.026, 28), [mat(0xe2b04a, 0.35), new THREE.MeshStandardMaterial({ map: provT, roughness: 0.4 }), mat(0xe2b04a, 0.35)], 0, 0.035, 0));
  return g;
}
// la carne sobre la parrilla (viernes lleno; a las 23:40, una sola tira)
const CARNE_LL = new THREE.Group(), CARNE_POCA = new THREE.Group();
PARR.add(CARNE_LL, CARNE_POCA);
{
  const y = 0.012;
  for (const [x, z, L] of [[0.0, -0.21, 0.58], [-0.02, -0.08, 0.56], [0.5, -0.2, 0.4]]) { const t = crearTira(L); t.position.set(x, y, z); CARNE_LL.add(t); }
  for (let i = 0; i < 4; i++) { const c = crearEmbutido(0.2, 0.027, CHORIZO, 0.03 * (i % 2 ? 1 : -1), "chorizo"); c.position.set(-0.27 + i * 0.11, y, 0.15); c.rotation.y = Math.PI / 2 + (i % 2 ? 0.08 : -0.08); CARNE_LL.add(c); }
  for (let i = 0; i < 2; i++) { const m = crearEmbutido(0.21, 0.034, MORCILLA, 0.035, i ? "abierta" : false); m.position.set(0.2 + i * 0.12, y, 0.14); m.rotation.y = Math.PI / 2; CARNE_LL.add(m); }
  const pv = crearProvoleta(); pv.position.set(0.56, y, 0.13); CARNE_LL.add(pv);
  const t1 = crearTira(0.55); t1.position.set(0.2, y, -0.12); CARNE_POCA.add(t1);
  sombras(CARNE_LL); sombras(CARNE_POCA);
}
const HUMO = [];
for (let i = 0; i < 4; i++) { const h = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.55), new THREE.MeshBasicMaterial({ color: 0xd9d7c9, transparent: true, opacity: 0.1, depthWrite: false })); h.renderOrder = 5; scene.add(h); HUMO.push(h); }
const CHISPAS = [];
for (let i = 0; i < 5; i++) { const c = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 4), new THREE.MeshBasicMaterial({ color: 0xf2b060 })); scene.add(c); CHISPAS.push(c); }

// =====================================================================================================
// EL SALÓN: las mesas de 2 (madera oscura, mantel a cuadros) y sus sillas (abajo, o dadas vuelta arriba de la mesa
// cuando se cierra); los comensales de fondo (siluetas simples sentadas) en el viernes lleno
// =====================================================================================================
const MESAS = [[2.45, -1.25], [2.45, 0.4], [-2.35, 0.9], [-1.6, 2.1], [2.45, 2.0], [-2.1, -0.75], [-1.6, 3.6], [2.2, 3.6]];
const MESA_W = 0.86, MESA_D = 0.7, MESA_H = 0.74;
function crearSilla() {
  const s = new THREE.Group();
  s.add(caja(0.42, 0.04, 0.4, MADERA2, 0, 0.45, 0, 0.01));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) s.add(caja(0.035, 0.45, 0.035, MADERA, sx * 0.18, 0.225, sz * 0.17, 0.006));
  for (const sx of [-1, 1]) s.add(caja(0.035, 0.5, 0.035, MADERA, sx * 0.18, 0.7, -0.18, 0.006));
  s.add(caja(0.4, 0.12, 0.03, MADERA2, 0, 0.88, -0.18, 0.01));
  return s;
}
const SILLAS_ABAJO = new THREE.Group(), SILLAS_ARRIBA = new THREE.Group(); scene.add(SILLAS_ABAJO, SILLAS_ARRIBA);
{
  MESAS.forEach(([x, z]) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); SET.add(g);
    g.add(caja(MESA_W, 0.04, MESA_D, MADERA, 0, MESA_H - 0.02, 0, 0.01));
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(caja(0.05, MESA_H - 0.04, 0.05, MADERA, sx * (MESA_W / 2 - 0.06), (MESA_H - 0.04) / 2, sz * (MESA_D / 2 - 0.06), 0.008));
    g.add(caja(MESA_W + 0.08, 0.012, MESA_D + 0.08, MANTEL, 0, MESA_H + 0.006, 0, 0.004));
    for (const s of [-1, 1]) { g.add(caja(MESA_W + 0.08, 0.16, 0.008, MANTEL, 0, MESA_H - 0.07, s * (MESA_D / 2 + 0.04), 0.003)); g.add(caja(0.008, 0.16, MESA_D + 0.08, MANTEL, s * (MESA_W / 2 + 0.04), MESA_H - 0.07, 0, 0.003)); }
    for (const s of [-1, 1]) {
      const a = crearSilla(); a.position.set(x, 0, z + s * (MESA_D / 2 + 0.12)); a.rotation.y = s > 0 ? Math.PI : 0; SILLAS_ABAJO.add(a);
      // dada vuelta sobre la mesa: el asiento apoyado en el mantel, las patas para arriba
      const b = crearSilla(); b.rotation.set(Math.PI, s > 0 ? 0 : Math.PI, 0); b.position.set(x + s * 0.2, MESA_H + 0.012 + 0.47, z); b.rotation.z = 0; SILLAS_ARRIBA.add(b);
    }
  });
}
function crearSifon() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.22, 18), VIDRIO_V, 0, 0.11, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.05, 16), M.metal, 0, 0.245, 0));
  const pico = mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.09, 8), M.metal, 0.045, 0.265, 0); pico.rotation.z = -1.1; g.add(pico);
  g.add(caja(0.012, 0.07, 0.03, M.metal, -0.03, 0.29, 0, 0.004));
  return g;
}
function crearBotella(v = mat(0x23362a, 0.2), etiqueta = true) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.2, 16), v, 0, 0.1, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.013, 0.033, 0.08, 14), v, 0, 0.24, 0));
  if (etiqueta) g.add(mesh(new THREE.CylinderGeometry(0.0375, 0.0375, 0.08, 16, 1, true), mat(C.cr, 0.8), 0, 0.1, 0));
  return g;
}
function crearPlatoComida(k = 0) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.014, 24), LOZA, 0, 0.007, 0));
  if (k % 2 === 0) { const t = crearTira(0.17, 0.07); t.position.set(-0.02, 0.014, -0.02); g.add(t); }
  else { const m = crearEmbutido(0.12, 0.026, MORCILLA, 0.02, "abierta"); m.position.set(0.0, 0.014, 0.03); g.add(m); }
  const c = crearEmbutido(0.11, 0.02, CHORIZO, 0.02, "chorizo"); c.position.set(0.02, 0.014, 0.05); c.rotation.y = 0.4; g.add(c);
  return g;
}
const PELOS = [0x2a2220, 0x5a3b28, 0xb9b6b0, 0x7a4a2e, 0x3a2f2a, 0xd8b56f];
const ROPAS = [C.navy3, 0x6b7a8f, C.cr2, 0x4a5a40, 0x9a8f80, C.gd, 0x8a5a4a, C.navy2];
const PIELES = [0xf2c9a8, 0xdba57f, 0xc28a62, 0x96613f];
function crearComensal(seed) {
  semilla = 100 + seed * 13;
  const g = new THREE.Group();
  const piel = mat(PIELES[Math.floor(az() * 4)], 0.55), ropa = mat(ROPAS[Math.floor(az() * ROPAS.length)], 0.7), pelo = mat(PELOS[Math.floor(az() * PELOS.length)], 0.75);
  const perfil = [[0, 0], [0.22, 0.02], [0.23, 0.2], [0.21, 0.36], [0.17, 0.44], [0.1, 0.5], [0, 0.51]].map(([r, y]) => new THREE.Vector2(r, y));
  const torso = mesh(new THREE.LatheGeometry(perfil, 20), ropa, 0, 0.46, 0); torso.scale.z = 0.86; g.add(torso);
  g.add(mesh(new THREE.CylinderGeometry(0.06, 0.065, 0.1, 10), piel, 0, 1.0, 0));
  const R = 0.27, cab = new THREE.Group(); cab.position.set(0, 1.27, 0.01); g.add(cab);
  cab.add(mesh(new THREE.SphereGeometry(R, 20, 14), piel));
  const largo = az() > 0.55, tipo = Math.floor(az() * 3);
  const cap = mesh(new THREE.SphereGeometry(R * 1.04, 20, 10, 0, Math.PI * 2, 0, Math.PI * (largo ? 0.55 : 0.42)), pelo, 0, 0.01, -0.01); cap.rotation.x = -0.25; cab.add(cap);
  if (largo) { const atras = mesh(new THREE.SphereGeometry(1, 16, 10), pelo, 0, -0.08, -0.12); atras.scale.set(R * 0.95, R * 1.0, R * 0.7); cab.add(atras); }
  if (tipo === 2 && largo) cab.add(mesh(new THREE.SphereGeometry(0.1, 12, 8), pelo, 0, 0.25, -0.15));
  for (const s of [-1, 1]) { cab.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat(0x111722, 0.2), s * 0.09, 0.02, R * 0.93)); cab.add(mesh(new THREE.SphereGeometry(0.045, 8, 6), piel, s * R, -0.02, 0.0)); }
  cab.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), mat(new THREE.Color(PIELES[0]).multiplyScalar(0.86).getHex(), 0.6), 0, -0.04, R * 0.98));
  for (const s of [-1, 1]) {
    const a = V3(s * 0.2, 0.9, 0), b = V3(s * 0.16, 0.78, 0.33), d = b.clone().sub(a);
    const br = mesh(new THREE.CylinderGeometry(0.055, 0.05, d.length(), 10), ropa, (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); br.quaternion.setFromUnitVectors(V3(0, 1, 0), d.normalize()); g.add(br);
    g.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), piel, b.x, b.y, b.z + 0.03));
  }
  return g;
}
// el salón lleno (P1-P4, Q3-Q4): comensales y comida en las mesas de 2
const SAL = new THREE.Group(); scene.add(SAL);
MESAS.forEach(([x, z], i) => {
  for (const s of [-1, 1]) {
    if (i >= 6 && s < 0) continue;
    if (i === 5 && s > 0) continue;
    const c = crearComensal(i * 2 + (s > 0 ? 1 : 0)); c.position.set(x, -0.02, z + s * (MESA_D / 2 + 0.14)); c.rotation.y = s > 0 ? Math.PI : 0; SAL.add(c);
    const p = crearPlatoComida(i + (s > 0 ? 1 : 0)); p.position.set(x, MESA_H + 0.013, z + s * 0.2); SAL.add(p);
  }
  const sf = crearSifon(); sf.position.set(x + 0.3, MESA_H + 0.012, z - 0.05); SAL.add(sf); const bt = crearBotella(); bt.position.set(x + 0.18, MESA_H + 0.012, z + 0.08); SAL.add(bt);
});
sombras(SAL); fusionar(SAL);
sombras(SILLAS_ABAJO); fusionar(SILLAS_ABAJO); sombras(SILLAS_ARRIBA); fusionar(SILLAS_ARRIBA);

// =====================================================================================================
// LA MESA 7 (para 8): madera oscura, mantel a cuadros, 3 sillas por lado y una en cada cabecera; 8 platos de loza con
// cuchillo de asado (mango de madera) y tenedor, 8 copas, servilletas navy, panera y sifón; el cartelito RESERVADO al
// medio y la vela en botella (el reloj del chiste)
// =====================================================================================================
const MESA7 = new THREE.Group(); MESA7.position.set(M7.x, 0, M7.z); scene.add(MESA7);
const LUGARES = [[-0.6, -1], [0, -1], [0.6, -1], [-0.6, 1], [0, 1], [0.6, 1], [-0.95, 0], [0.95, 0]];   // [x, lado] lado -1 fondo, 1 frente, 0 cabecera
const lugarXZ = ([x, s]) => (s === 0 ? [x * 0.82, 0] : [x, s * 0.27]);
{
  const g = MESA7, H = M7.H;
  g.add(caja(M7.L, 0.045, M7.D, MADERA, 0, H - 0.022, 0, 0.01));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(caja(0.06, H - 0.04, 0.06, MADERA, sx * (M7.L / 2 - 0.08), (H - 0.04) / 2, sz * (M7.D / 2 - 0.08), 0.008));
  g.add(caja(M7.L + 0.08, 0.012, M7.D + 0.08, MANTEL7, 0, H + 0.006, 0, 0.004));
  for (const s of [-1, 1]) { g.add(caja(M7.L + 0.08, 0.18, 0.008, MANTEL7, 0, H - 0.08, s * (M7.D / 2 + 0.04), 0.003)); g.add(caja(0.008, 0.18, M7.D + 0.08, MANTEL7, s * (M7.L / 2 + 0.04), H - 0.08, 0, 0.003)); }
  for (const [x, s] of LUGARES) {
    const si = crearSilla();
    if (s === 0) { si.position.set(Math.sign(x) * (M7.L / 2 + 0.16), 0, 0); si.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2; }
    else { si.position.set(x, 0, s * (M7.D / 2 + 0.14)); si.rotation.y = s > 0 ? Math.PI : 0; }
    g.add(si);
  }
  // panera de mimbre y sifón
  g.add(mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.05, 14), mat(0xa8824e, 0.85), -0.32, H + 0.04, 0.02));
  const sf = crearSifon(); sf.position.set(0.56, H + 0.012, -0.04); g.add(sf);
  sombras(g);
}
fusionar(MESA7);
// los 8 lugares: plato, cuchillo de asado, tenedor, copa y servilleta (cada lugar es un grupo: aparecen de a uno en P2b,
// se juntan en P6/Q5)
const CUB = [];   // { g, cuchillo, tenedor }
const LUGAR = [];
const MANGO = mat(0x6b4a2e, 0.55), ACERO = mat(0xc9ccd2, 0.25, { metalness: 0.7 }), SERV = mat(C.navy3, 0.85);
function crearTenedor() { const g = new THREE.Group(); g.add(caja(0.012, 0.004, 0.11, ACERO, 0, 0, 0.0, 0.002)); for (const k of [-1, 0, 1]) g.add(caja(0.003, 0.003, 0.05, ACERO, k * 0.005, 0, -0.075, 0.001)); g.add(caja(0.018, 0.004, 0.02, ACERO, 0, 0, -0.05, 0.002)); return sombras(g); }
function crearCuchillo() { const g = new THREE.Group(); g.add(caja(0.016, 0.012, 0.09, MANGO, 0, 0, 0.05, 0.005)); g.add(caja(0.018, 0.003, 0.11, ACERO, 0.002, 0, -0.05, 0.002)); return sombras(g); }
function crearCopa() {
  const g = new THREE.Group();
  const perfil = [[0, 0], [0.032, 0.002], [0.032, 0.006], [0.006, 0.01], [0.005, 0.07], [0.022, 0.085], [0.034, 0.12], [0.032, 0.15], [0.03, 0.155]].map(([r, y]) => new THREE.Vector2(r, y));
  const m = new THREE.Mesh(new THREE.LatheGeometry(perfil, 18), COPA_M); m.renderOrder = 4; g.add(m);
  return g;
}
const PLATO_USADO = [];
// (r4) la mesa de adelante en Q4/Q4c: llena el tercio de abajo del plano general (antes era piso y sillas)
const MESA_FG = new THREE.Group();
{
  const W = 1.5, D = 0.8; MESA_FG.position.set(0.36, 0, 2.3); scene.add(MESA_FG);
  MESA_FG.add(caja(W, 0.04, D, MADERA, 0, MESA_H - 0.02, 0, 0.01));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) MESA_FG.add(caja(0.05, MESA_H - 0.04, 0.05, MADERA, sx * (W / 2 - 0.06), (MESA_H - 0.04) / 2, sz * (D / 2 - 0.06), 0.008));
  MESA_FG.add(caja(W + 0.08, 0.012, D + 0.08, MANTEL, 0, MESA_H + 0.006, 0, 0.004));
  for (const sd of [-1, 1]) { MESA_FG.add(caja(W + 0.08, 0.16, 0.008, MANTEL, 0, MESA_H - 0.07, sd * (D / 2 + 0.04), 0.003)); MESA_FG.add(caja(0.008, 0.16, D + 0.08, MANTEL, sd * (W / 2 + 0.04), MESA_H - 0.07, 0, 0.003)); }
  [[-0.38, 0.12, 0], [0.36, 0.1, 1], [-0.02, -0.2, 2]].forEach(([x, z, k]) => { const p = crearPlatoComida(k); p.position.set(x, MESA_H + 0.013, z); MESA_FG.add(p); });
  const b = crearBotella(); b.position.set(0.12, MESA_H + 0.012, -0.12); MESA_FG.add(b);
  for (const [x, z] of [[0.34, -0.22]]) { const c = crearCopa(); c.position.set(x, MESA_H + 0.012, z); c.scale.setScalar(1.15); MESA_FG.add(c); }
  const sf = crearSifon(); sf.position.set(-0.22, MESA_H + 0.012, -0.22); MESA_FG.add(sf);
  sombras(MESA_FG); MESA_FG.visible = false;
}
LUGARES.forEach((L, i) => {
  const [lx, lz] = lugarXZ(L);
  const g = new THREE.Group(); g.position.set(M7.x + lx, M7.H + 0.012, M7.z + lz); scene.add(g);
  const giro = L[1] === 0 ? (L[0] > 0 ? -Math.PI / 2 : Math.PI / 2) : L[1] > 0 ? Math.PI : 0;
  g.rotation.y = giro;   // el comensal mira hacia el centro de la mesa; +z local = hacia el comensal
  const plato = mesh(new THREE.CylinderGeometry(0.125, 0.105, 0.016, 26), LOZA, 0, 0.008, 0.0); g.add(plato);
  plato.add(mesh(new THREE.TorusGeometry(0.1, 0.006, 6, 26), LOZA, 0, 0.008, 0).rotateX(Math.PI / 2));
  const usado = new THREE.Group(); usado.position.y = 0.016; g.add(usado); PLATO_USADO.push(usado);
  for (let k = 0; k < 3; k++) { const h = mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.04, 10), HUESO, -0.04 + k * 0.035, 0.008, 0.02 - k * 0.015); h.rotation.set(Math.PI / 2, 0, 0.6 + k); h.scale.x = 0.75; usado.add(h); }
  usado.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.002, 16), mat(0x7a4a2a, 0.9), 0.02, 0.001, -0.02));
  const serv = caja(0.09, 0.012, 0.09, SERV, -0.17, 0.006, 0.02, 0.004); serv.rotation.y = Math.PI / 4; serv.scale.z = 0.6; g.add(serv);
  const ten = crearTenedor(); ten.position.set(-0.155, 0.014, 0.0); g.add(ten);
  const cu = crearCuchillo(); cu.position.set(0.16, 0.009, 0.0); g.add(cu);
  const copa = crearCopa(); copa.position.set(0.15, 0, -0.17); g.add(copa);
  LUGAR.push({ g, ten, cu, copa, serv, plato });
});
// el cartelito RESERVADO (tarjeta plegada en V invertida, crema con borde navy, Lexend 800 navy) de cara al frente
const reservT = lienzo(640, 220, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "RESERVADO", 800, 120, w - 80); x.fillText("RESERVADO", w / 2, h / 2 + 6); x.fillStyle = "#3fa60a"; x.fillRect(150, h - 44, w - 300, 8); });
const RESERVADO = new THREE.Group(); scene.add(RESERVADO);
{
  const W = 0.26, H = 0.09, a = 0.32;
  const cara = new THREE.MeshStandardMaterial({ map: reservT, roughness: 0.7 }), dorso = mat(C.cr, 0.75);
  for (const s of [1, -1]) {
    const p = new THREE.Group(); p.rotation.x = s * a; RESERVADO.add(p);
    const tab = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.003), s > 0 ? [dorso, dorso, dorso, dorso, cara, dorso] : [dorso, dorso, dorso, dorso, dorso, cara]); tab.position.set(0, H / 2, s * 0.0015); p.add(tab);
  }
  RESERVADO.children.forEach((p, i) => { p.position.set(0, 0, (i ? -1 : 1) * Math.sin(a) * 0.0); });
  sombras(RESERVADO);
}
// la vela en botella: botella de vino vacía navy oscura con la vela crema encajada y las chorreaduras; la altura de la
// vela es función de la hora de la historia (22:45 entera → 23:40 por la mitad → 23:58 un cabito)
const VELA = new THREE.Group(); scene.add(VELA);
const VELA_ALTA = 0.13;
const VELA_C = new THREE.Group(), LLAMA = new THREE.Group();
{
  const b = crearBotella(mat(0x1a2236, 0.25), false); VELA.add(b);
  const cera = mat(0xf2eee0, 0.6);
  for (let k = 0; k < 5; k++) { const L = 0.04 + (k % 3) * 0.025, r = 0.016 + (k % 2) * 0.004; const c = mesh(new THREE.CylinderGeometry(0.006, 0.005, L, 8), cera, Math.cos(k * 1.3) * r, 0.284 - L / 2, Math.sin(k * 1.3) * r); b.add(c); }
  b.add(mesh(new THREE.TorusGeometry(0.018, 0.008, 6, 14), cera, 0, 0.283, 0).rotateX(Math.PI / 2));
  VELA_C.position.y = 0.28; VELA.add(VELA_C);
  const cuerpoV = mesh(new THREE.CylinderGeometry(0.021, 0.022, 1, 16), cera, 0, 0.5, 0); VELA_C.add(cuerpoV); VELA_C.userData.cuerpo = cuerpoV;
  const mecha = mesh(new THREE.CylinderGeometry(0.0018, 0.0018, 0.014, 6), mat(0x1a1410, 0.8), 0, 0, 0); VELA_C.add(mecha); VELA_C.userData.mecha = mecha;
  VELA_C.add(LLAMA);
  const l1 = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.045, 10), new THREE.MeshBasicMaterial({ color: 0xe8a050 })); l1.position.y = 0.022; LLAMA.add(l1);
  const l2 = new THREE.Mesh(new THREE.ConeGeometry(0.0065, 0.026, 10), new THREE.MeshBasicMaterial({ color: 0xf8e6b8 })); l2.position.y = 0.016; LLAMA.add(l2);
  sombras(b);
}
// dónde están: el RESERVADO al medio (un poco a la izquierda), la vela a la derecha
RESERVADO.position.set(M7.x - 0.1, M7.H + 0.012, M7.z - 0.02);
VELA.position.set(M7.x + 0.3, M7.H + 0.012, M7.z + 0.2);
function alturaVela(t) {
  // 1 = entera, 0 = consumida
  if (t < T.p5) return 1;
  if (t < T.p6) return 0.5;
  if (t < P2) return 0.16;
  if (t >= P2) return 1;
  return 0.3;
}
// la comida de la familia en Q4 (la tira en la tabla, el pan) y en Q5 los platos usados
const COMIDA_Q4 = new THREE.Group(); scene.add(COMIDA_Q4);
{
  const tabla = caja(0.42, 0.025, 0.22, MADERA2, 0, 0.012, 0, 0.008); COMIDA_Q4.add(tabla);
  const t = crearTira(0.36, 0.09); t.position.set(-0.02, 0.026, -0.02); COMIDA_Q4.add(t);
  for (let i = 0; i < 2; i++) { const c = crearEmbutido(0.13, 0.024, CHORIZO, 0.02, "chorizo"); c.position.set(-0.1 + i * 0.12, 0.026, 0.07); COMIDA_Q4.add(c); }
  COMIDA_Q4.position.set(M7.x - 0.35, M7.H + 0.013, M7.z + 0.0);
  sombras(COMIDA_Q4);
}
fusionar(SET, [PARR, BRASERO, PUERTA_HOJA]);
fusionar(PARR, [CARNE_LL, CARNE_POCA]);

// el living de Walter (Q2b): sillón crema, lámpara de pie, cortina navy, un cuadro (el de estetica-turnos, otro almohadón)
const LIV = new THREE.Group(); LIV.position.set(30, 0, 0); scene.add(LIV);
{
  const piso = mesh(new THREE.PlaneGeometry(6, 6), mat(0xb89a74, 0.8)); piso.rotation.x = -Math.PI / 2; LIV.add(piso);
  const pared = mesh(new THREE.BoxGeometry(6, 3, 0.1), mat(0xece9dc, 0.92), 0, 1.5, -1.2); LIV.add(pared);
  for (let i = 0; i < 6; i++) LIV.add(caja(0.2, 2.5, 0.08, i % 2 ? M.navy3 : M.navy2, 0.75 + i * 0.17, 1.3, -1.1, 0.06));
  LIV.add(caja(1.1, 0.04, 0.08, M.navy, 1.18, 2.6, -1.1, 0.01));
  const s = new THREE.Group(); s.position.set(-0.2, 0, -0.65); LIV.add(s);
  s.add(caja(1.7, 0.4, 0.75, M.cr, 0, 0.3, 0, 0.1)); s.add(caja(1.7, 0.55, 0.2, M.cr, 0, 0.72, -0.3, 0.1));
  for (const sx of [-1, 1]) s.add(caja(0.2, 0.3, 0.75, M.cr, sx * 0.85, 0.58, 0, 0.09));
  s.add(caja(0.42, 0.42, 0.12, M.gd, -0.55, 0.7, -0.15, 0.05)); s.add(caja(0.38, 0.38, 0.12, M.navy3, 0.55, 0.68, -0.15, 0.05));
  const l = new THREE.Group(); l.position.set(-1.9, 0, -0.85); LIV.add(l);
  l.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 20), M.navy3, 0, 0.015, 0)); l.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5, 8), M.navy3, 0, 0.77, 0));
  l.add(mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.3, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xf6efd8, emissive: 0xfff2d0, emissiveIntensity: 0.5, side: THREE.DoubleSide }), 0, 1.6, 0));
  const cuadro = new THREE.Group(); cuadro.position.set(-1.3, 2.05, -1.14); LIV.add(cuadro); cuadro.add(caja(0.5, 0.4, 0.03, M.navy3, 0, 0, 0, 0.01)); cuadro.add(caja(0.42, 0.32, 0.02, M.cr2, 0, 0, 0.012, 0.01));
  sombras(LIV);
}
fusionar(LIV);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const raul = crearPersonaje({ ...ELENCO.raul, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3c + 0.5), r2(T.p5 + 0.15), r2(T.q3 + 0.5)] });
const fabian = crearPersonaje({ ...ELENCO.fabian, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p2b + 0.6), r2(T.p6 + 0.5), r2(T.q4 + 1.6)] });
const walter = crearPersonaje({ ...ELENCO.walter, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const FAM_CFG = [ELENCO.walterMujer, ELENCO.walterAdo, ELENCO.walterNena, ELENCO.walterNene, ELENCO.walterAbuela];
const FAM = FAM_CFG.map((c, i) => crearPersonaje({ ...c, parpadeoCada: 3.3 + i * 0.4 }));
const TODOS = [raul, fabian, walter, ...FAM];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// la pinza de parrillero de Raúl (en la derecha) y, en Q3, la pala en la izquierda
const PINZA = new THREE.Group();
{
  const acero = mat(0xc4c8cf, 0.25, { metalness: 0.7 });
  PINZA.add(caja(0.032, 0.11, 0.032, mat(0x6b4a2e, 0.6), 0, -0.02, 0, 0.01));
  for (const s of [-1, 1]) { const b = caja(0.026, 0.34, 0.012, acero, s * 0.02, -0.24, 0, 0.004); b.rotation.z = s * 0.06; PINZA.add(b); const p = caja(0.03, 0.035, 0.008, acero, s * 0.03, -0.405, 0, 0.003); PINZA.add(p); }
  sombras(PINZA);
  raul.brazos[1].mano.add(PINZA);
}
const PALA = new THREE.Group();
{
  PALA.add(caja(0.03, 0.12, 0.03, mat(0x6b4a2e, 0.6), 0, -0.02, 0, 0.01));
  PALA.add(caja(0.012, 0.3, 0.012, HIERRO, 0, -0.22, 0, 0.004));
  PALA.add(caja(0.1, 0.12, 0.006, HIERRO, 0, -0.42, 0, 0.003));
  sombras(PALA); raul.brazos[0].mano.add(PALA);
}
// el trapo crema al hombro de Fabián
{
  const tr = mat(C.cr, 0.95);
  const g = new THREE.Group(); g.position.set(0.17, 0.45, 0); fabian.cuerpo.add(g);
  g.add(caja(0.12, 0.022, 0.2, tr, 0, 0.0, 0, 0.008));
  const f = caja(0.11, 0.2, 0.018, tr, 0.012, -0.1, 0.16, 0.006); f.rotation.x = -0.25; g.add(f);
  const b = caja(0.11, 0.24, 0.018, tr, 0.012, -0.12, -0.15, 0.006); b.rotation.x = 0.2; g.add(b);
  for (const k of [-0.05, 0.05]) g.add(caja(0.112, 0.008, 0.02, mat(C.navy3, 0.8), 0.012, -0.08 + k, 0.17, 0.002));
  sombras(g);
}
// la bandeja redonda bajo el brazo de Fabián (P4, Q4) y la silla que sube (P5)
const BANDEJA = new THREE.Group();
{ const d = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.012, 32), M.metal, 0, 0, 0); d.rotation.x = Math.PI / 2; BANDEJA.add(d); const r = mesh(new THREE.TorusGeometry(0.2, 0.008, 6, 32), M.metal, 0, 0, 0); BANDEJA.add(r); sombras(BANDEJA); scene.add(BANDEJA); }
const SILLA_F = crearSilla(); sombras(SILLA_F); scene.add(SILLA_F);
// el manojo de cubiertos en el puño de Fabián (P6, Q5): cuchillos y tenedores a lo largo de la mano (-y)
const MANOJO = new THREE.Group();
{
  for (let k = 0; k < 6; k++) {
    const e = k % 2 ? crearTenedor() : crearCuchillo();
    e.rotation.x = -Math.PI / 2; e.position.set((k % 3 - 1) * 0.008, -0.07, (Math.floor(k / 3) - 0.5) * 0.008 + 0.01);
    MANOJO.add(e);
  }
  fabian.brazos[1].mano.add(MANOJO);
}
// el tenedor que vuelve a la mesa (P6b, Q5): en la mano izquierda de Fabián
const TEN_F = crearTenedor(); TEN_F.rotation.x = -Math.PI / 2; TEN_F.position.set(0, -0.08, 0.01); fabian.brazos[0].mano.add(TEN_F);
// la copa de Walter (Q4)
const COPA_W = crearCopa(); COPA_W.scale.setScalar(1.4); scene.add(COPA_W); COPA_W.children[0].material = new THREE.MeshStandardMaterial({ color: 0xbcd6e4, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.8 });   // (r4) derecha siempre: se ubica en la mano en cada cuadro
{ const vino = new THREE.Mesh(new THREE.CylinderGeometry(0.031, 0.022, 0.045, 16), mat(0x7a1830, 0.3)); vino.position.y = 0.108; COPA_W.add(vino); const pie = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.07, 8), mat(0xd9e6ee, 0.2)); pie.position.y = 0.04; COPA_W.add(pie); }

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (para el chat y el panel) ----
const AVATAR = {};
{
  const rt = new THREE.WebGLRenderTarget(256, 256); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene();
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(1, 2, 3); esc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const leer = (per, fondo) => {
    esc.background = new THREE.Color(fondo);
    esc.add(per.raiz);
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
    esc.remove(per.raiz);
    return cv;
  };
  AVATAR.walter = leer(crearPersonaje({ ...ELENCO.walter, parpadeoCada: 999 }), 0xcfeebc);
  AVATAR.raul = leer(crearPersonaje({ ...ELENCO.raul, parpadeoCada: 999 }), 0x5ce611);
  rt.dispose();
  // los que no tienen cuerpo: un círculo navy con la inicial crema (Pablo y los clientes del chat)
  const letra = (l, fondo = "#16243d") => { const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d"); x.fillStyle = fondo; x.fillRect(0, 0, 256, 256); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 150); x.fillText(l, 128, 140); return cv; };
  AVATAR.pablo = letra("P"); AVATAR.local = (() => { const cv = letra("", "#5ce611"); const x = cv.getContext("2d"); x.fillStyle = "#0b1220"; x.font = F(900, 92); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("PR", 128, 136); return cv; })();
  AVATAR.m = letra("M", "#3a5a8a"); AVATAR.carla = letra("C", "#8a3a5a"); AVATAR.l = letra("L", "#6b4a2e"); AVATAR.s = letra("S", "#2c4268");
  // el auricular de la llamada (para el globo de Pablo)
  AVATAR.tel = (() => { const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d"); x.fillStyle = "#16243d"; x.fillRect(0, 0, 256, 256); x.save(); x.translate(128, 132); x.rotate(-0.6); x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(-26, -78, 52, 156, 26); x.fill(); x.beginPath(); x.roundRect(-46, -92, 70, 44, 18); x.fill(); x.beginPath(); x.roundRect(-46, 48, 70, 44, 18); x.fill(); x.restore(); return cv; })();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
const RED = "#c7655b", RED_T = "#e98a7f";

// =====================================================================================================
// EL CUADERNO DE RESERVAS (P1, P2, P6), LA BIROME ATADA, EL CELULAR EN EL HOMBRO, EL CELULAR PARADO, LA TABLET
// =====================================================================================================
// el cuaderno: tapa dura navy3 gastada, dos hojas crema con renglones; manchas de grasa y chimichurri; la esquina
// doblada. Hoja derecha: "VIERNES" con las reservas y "PABLO · 8 · 22:00" que se escribe con la voz; en P6 la hoja de
// la izquierda pasa a "SÁBADO" con "PABLO · 8 · 22:00" otra vez
const CUAD = { x: MOS.x - 0.17, z: MOS.z + 0.06, w: 0.4, d: 0.28, giro: 0.42 };
const cuadT = lienzo(1024, 720, () => {});
const LINEAS_CUAD = [["GONZÁLEZ · 4 · 21:00", false], ["PÉREZ · 2 · 21:30", true], ["SOSA · 2 · 21:30", false], ["FERREIRA · 5 · 21:45", false]];
function dibujarCuaderno(x, W, H, { k = 1, sabado = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  // renglones navy
  x.fillStyle = "rgba(31,50,84,0.45)"; for (let y = 150; y < H - 20; y += 78) { x.fillRect(30, y, W / 2 - 60, 5); x.fillRect(W / 2 + 30, y, W / 2 - 60, 5); }
  x.fillStyle = "rgba(199,101,91,0.5)"; x.fillRect(W / 2 + 70, 20, 4, H - 40); x.fillRect(70, 20, 4, H - 40);
  // el lomo
  x.fillStyle = "rgba(11,18,32,0.35)"; x.fillRect(W / 2 - 6, 0, 12, H);
  // las manchas: grasa (traslúcida) y chimichurri (verde apagado con puntitos rojos)
  x.fillStyle = "rgba(160,120,60,0.22)"; x.beginPath(); x.ellipse(W * 0.82, H * 0.78, 70, 50, 0.4, 0, 7); x.fill();
  x.fillStyle = "rgba(54,95,40,0.55)"; x.beginPath(); x.ellipse(W * 0.2, H * 0.84, 46, 30, -0.3, 0, 7); x.fill();
  x.fillStyle = "#b5483e"; for (const [a, b] of [[-12, -6], [8, 4], [18, -10], [-4, 10]]) { x.beginPath(); x.arc(W * 0.2 + a, H * 0.84 + b, 5, 0, 7); x.fill(); }
  x.fillStyle = "#16243d"; x.textBaseline = "middle"; x.textAlign = "left";
  // hoja derecha: VIERNES
  x.font = CAV(78); x.fillText("VIERNES", W / 2 + 90, 100);
  LINEAS_CUAD.forEach(([l, tach], i) => { const y = 182 + i * 78; x.font = CAV(56); x.fillText(l, W / 2 + 90, y); if (tach) { x.fillRect(W / 2 + 84, y - 2, x.measureText(l).width + 12, 6); } });
  // "PABLO · 8 · 22:00" letra por letra (k de 0 a 1)
  const txt = "PABLO · 8 · 22:00", n = Math.round(txt.length * k);
  if (n > 0) { x.font = CAV(62); x.fillText(txt.slice(0, n), W / 2 + 90, 182 + 4 * 78); }
  // hoja izquierda: en P6, SÁBADO
  if (sabado > 0) { x.font = CAV(78); x.fillText("SÁBADO", 100, 100); const m = Math.round(txt.length * sabado); if (m > 0) { x.font = CAV(62); x.fillText(txt.slice(0, m), 100, 182); } }
  // la esquina doblada (abajo a la derecha)
  x.fillStyle = "#d9d7c9"; x.beginPath(); x.moveTo(W - 70, H); x.lineTo(W, H - 70); x.lineTo(W - 70, H - 70); x.closePath(); x.fill();
}
const CUADERNO = new THREE.Group(); CUADERNO.position.set(CUAD.x, MOS.alto + 0.003, CUAD.z); CUADERNO.rotation.y = CUAD.giro; scene.add(CUADERNO);
{
  CUADERNO.add(caja(CUAD.w + 0.02, 0.01, CUAD.d + 0.02, mat(C.navy3, 0.75), 0, 0.005, 0, 0.004));
  const hojas = mesh(new THREE.BoxGeometry(CUAD.w, 0.008, CUAD.d), [mat(C.cr2, 0.9), mat(C.cr2, 0.9), new THREE.MeshStandardMaterial({ map: cuadT, roughness: 0.85 }), mat(C.cr2, 0.9), mat(C.cr2, 0.9), mat(C.cr2, 0.9)], 0, 0.014, 0); CUADERNO.add(hojas);
  // el espiral (aros navy a lo largo del lomo)
  for (let i = 0; i < 9; i++) { const a = mesh(new THREE.TorusGeometry(0.008, 0.0018, 6, 12), M.navy, 0, 0.018, -CUAD.d / 2 + 0.02 + i * 0.03); a.rotation.y = Math.PI / 2; CUADERNO.add(a); }
  sombras(CUADERNO);
}
let claveCuad = "";
function ponerCuaderno(t) {
  const k = t >= T.p3 ? 1 : Math.round(sg(t, T.escribe[0], T.escribe[1]) * 17) / 17;
  const sab = t >= T.p6b ? Math.round(sg(t, T.r5 + 0.25, T.r5 + 0.25 + 0.6) * 17) / 17 + 0.001 : 0;
  const c = `${k}|${sab}`; if (c === claveCuad) return; claveCuad = c;
  dibujarCuaderno(cuadT.userData.x, 1024, 720, { k, sabado: sab }); cuadT.needsUpdate = true;
}
// dónde escribe (en coordenadas del mundo): la punta va por el renglón de PABLO
const puntoCuad = (u, linea = 4, hoja = 1) => {
  const px = hoja ? (1024 / 2 + 90 + u * 380) / 1024 : (100 + u * 380) / 1024, pz = (182 + linea * 78) / 720;
  CUADERNO.updateMatrixWorld(true);
  return CUADERNO.localToWorld(V3((px - 0.5) * CUAD.w, 0.02, (pz - 0.5) * CUAD.d));
};
// la birome crema con capuchón navy, atada con un piolín al espiral del cuaderno
const BIROME = new THREE.Group(); scene.add(BIROME);
{
  BIROME.add(mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.13, 10), mat(C.cr, 0.5), 0, 0.075, 0));
  BIROME.add(mesh(new THREE.ConeGeometry(0.0055, 0.014, 10), mat(C.cr2, 0.5), 0, 0.004, 0).rotateX(Math.PI));
  BIROME.add(mesh(new THREE.CylinderGeometry(0.0062, 0.0062, 0.03, 10), M.navy, 0, 0.13, 0));
  BIROME.add(caja(0.003, 0.03, 0.006, M.navy, 0.006, 0.125, 0, 0.001));
  sombras(BIROME);
}
const PEN_DIR = V3(0.18, 0.9, 0.4).normalize();   // (r4) la birome inclinada hacia la mano
const PIOLIN = new THREE.Mesh(new THREE.BufferGeometry(), mat(0xa8865a, 0.9)); PIOLIN.castShadow = true; scene.add(PIOLIN);
let clavePiolin = "";
function ponerPiolin(a, b) {
  const c = `${a.x.toFixed(3)}|${a.y.toFixed(3)}|${a.z.toFixed(3)}|${b.x.toFixed(3)}|${b.z.toFixed(3)}`; if (c === clavePiolin) return; clavePiolin = c;
  // cae en una curva: del final de la birome baja hasta el mostrador y vuelve al espiral
  const m1 = a.clone().lerp(b, 0.35); m1.y = Math.min(a.y, b.y) - 0.01; m1.y = Math.max(m1.y, MOS.alto + 0.012);
  const m2 = a.clone().lerp(b, 0.7); m2.y = MOS.alto + 0.01;
  PIOLIN.geometry.dispose(); PIOLIN.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([a, m1, m2, b]), 20, 0.0032, 5, false);
}
// el celular de Raúl: en el hombro (P1), en la mano (P4, P6); el celular parado del mostrador (P2 y, en la parte 2,
// contestando solo); la tablet del plano de mesas en su atril (parte 2)
const pantR = lienzo(600, 975, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w / 2, h * 0.42, 90, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.font = F(800, 64); x.textAlign = "center"; x.fillText("Pablo", w / 2, h * 0.65); x.font = F(700, 46); x.fillText("altavoz", w / 2, h * 0.72); });
const celuR = crearCelular(pantR, C.navy3, 0.08, 0.162); scene.add(celuR);
const pantM = lienzo(600, 975, () => {});
const CELM = new THREE.Group(); scene.add(CELM);   // el celular parado del mostrador, contra el frasco de escarbadientes
{
  const S = 1.0, W = 0.08 * S, H = 0.162 * S;
  const piv = new THREE.Group(); piv.position.y = 0.006; piv.rotation.x = -0.32; CELM.add(piv);
  piv.add(mesh(rbox(W + 0.008, H + 0.008, 0.012, 0.012), mat(C.navy, 0.4), 0, H / 2, 0));
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: pantM, toneMapped: false })); pan.position.set(0, H / 2, 0.0066); piv.add(pan);
  sombras(CELM);
}
const pantT = lienzo(720, 1000, () => {});
const tablet = crearTablet(pantT, 0.3, 0.42, 0.25); tablet.scale.setScalar(1.0); scene.add(tablet);
// el celular de Walter (Q2b)
const pantW = lienzo(600, 975, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.font = F(800, 50); x.textBaseline = "middle"; x.fillText("Parrilla Raúl", 36, 78); x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(40, 620, w - 80, 140, 40); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 70); x.textAlign = "center"; x.fillText("Sí", w / 2, 692); x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 46); ["Walter, se liberó", "una mesa para 6", "mañana a las 22:00."].forEach((l, i) => x.fillText(l, 40, 260 + i * 70)); });
const celuW = crearCelular(pantW, C.navy, 0.08, 0.162); celuW.scale.setScalar(1.3); scene.add(celuW);

// =====================================================================================================
// TARJETAS PEGADAS A LA CÁMARA (en píxeles de pantalla): globos de diálogo, rótulos, chats, insertos
// =====================================================================================================
const PXK = 1000;
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
// texto con la palabra [clave] en el recuadro verde de selección y la {palabra} subrayada en rojo apagado
const PARTES_RE = /(\[[^\]]+\]|\{[^}]+\})/;
const limpioTx = (s) => s.replace(/[[\]{}]/g, "");
const partesDe = (l) => l.split(PARTES_RE).filter(Boolean).flatMap((p) => (p.startsWith("[") || p.startsWith("{") ? [p] : p.split(/(?<= )/)));
function textoSel(x, l, cx, y, px, tinta = "#0b1220") {
  x.font = F(800, px); x.textBaseline = "middle"; x.textAlign = "left";
  const partes = partesDe(l);
  const anchos = partes.map((p) => x.measureText(limpioTx(p)).width + (p.startsWith("[") ? px * 0.5 : 0));
  let xx = cx - anchos.reduce((a, b) => a + b, 0) / 2;
  partes.forEach((p, k) => {
    if (p.startsWith("[")) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = px * 0.1; x.beginPath(); x.roundRect(xx + px * 0.05, y - px * 0.62, anchos[k] - px * 0.1, px * 1.24, px * 0.12); x.fill(); x.stroke(); x.fillStyle = tinta; x.fillText(limpioTx(p), xx + px * 0.25, y + px * 0.04); }
    else if (p.startsWith("{")) { const w = x.measureText(limpioTx(p).replace(/[!?.,]+$/, "")).width; x.fillStyle = "#c7655b"; x.fillRect(xx, y + px * 0.42, w, px * 0.14); x.fillStyle = tinta; x.fillText(limpioTx(p), xx, y + px * 0.04); }
    else { x.fillStyle = tinta; x.fillText(p, xx, y + px * 0.04); }
    xx += anchos[k];
  });
}
// globo de diálogo (texto grande), con cabecera opcional (avatar + nombre)
function crearGlobo(lineas, px = 80, { cab = null, fondo = "#efeee5" } = {}) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const cabH = cab ? Math.round(px * 1.3) : 0, cabF = Math.max(Math.round(px * 0.62), 46);
  med.font = F(700, cabF); const anchoCab = cab ? med.measureText(cab.nombre).width + px * 1.3 : 0; med.font = F(800, px);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpioTx(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.2), H = Math.round(lineas.length * px * 1.22 + px * 0.75 + cabH);
  return crearTarjeta(Wg, H, (x, w, h) => {
    if (cab) { const r = px * 0.48, cy = px * 0.2 + r, cx = px * 0.25 + r; avatar(x, cab.cv, cx, cy, r); x.fillStyle = "#1f3254"; x.font = F(700, cabF); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(cab.nombre, cx + r + px * 0.25, cy + 2); }
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + (h - cabH) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  }, { fondo });
}
// el rótulo con línea guía: caja navy, texto crema (o rojo apagado / verde)
function crearRotulo(lineas, px = 50) {
  const med = document.createElement("canvas").getContext("2d");
  const ancho = Math.max(...lineas.map(([l, , p]) => { med.font = F(800, p ?? px); return med.measureText(l).width; }));
  const H = Math.round(lineas.reduce((a, [, , p]) => a + (p ?? px) * 1.25, 0) + px * 0.6), Wg = Math.round(ancho + px * 1.0);
  return crearTarjeta(Wg, H, (x, w, h) => {
    let y = px * 0.3; x.textAlign = "center"; x.textBaseline = "middle";
    for (const [l, color, p] of lineas) { const q = p ?? px; x.font = F(800, q); x.fillStyle = color ?? "#efeee5"; x.fillText(l, w / 2, y + q * 0.62); y += q * 1.25; }
  }, { fondo: "#0b1220", borde: C.cr });
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
// pone una tarjeta en (cx, cy) px de pantalla; s: escala de entrada (pop); objetivo: a dónde apunta la cola
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0, libre = false) {
  g.visible = s > 0.03;
  const op = cl(s / 0.85); s = Math.max(s, 0.85);
  g.traverse((o) => { if (o.isMesh) [].concat(o.material).forEach((m) => (m.opacity = op)); });
  if (!g.visible) return;
  const k = halfK();
  const { W: Wg, H, cola } = g.userData;
  cx = Wg + 120 > 1080 ? 540 : cl(cx, Wg / 2 + 50, 1030 - Wg / 2);
  if (!libre) cy = cl(cy, H / 2 + 60, 1860 - H / 2);
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
// LAS PANTALLAS (chat genérico: encabezado navy, fondo crema, burbujas blancas; ninguna app real)
// =====================================================================================================
const CW = 740;
function renglones(x, txt, ancho) { const ws = txt.split(" "), out = []; let l = ""; for (const w of ws) { const p = l ? l + " " + w : w; if (x.measureText(p).width > ancho && l) { out.push(l); l = w; } else l = p; } if (l) out.push(l); return out; }
function cabecera(x, W, cv, nombre, sub, subVerde = false) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 176); x.fillStyle = "#5ce611"; x.fillRect(0, 176, W, 8);
  x.strokeStyle = "#efeee5"; x.lineWidth = 9; x.lineCap = "round"; x.beginPath(); x.moveTo(52, 70); x.lineTo(30, 92); x.lineTo(52, 114); x.stroke();
  avatar(x, cv, 124, 92, 54);
  x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#efeee5"; ajustar(x, nombre, 800, 50, W - 230); x.fillText(nombre, 196, 68);
  if (subVerde) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(206, 126, 12, 0, 7); x.fill(); }
  x.fillStyle = subVerde ? "#5ce611" : "#b9c3d3"; x.font = F(700, 38); x.fillText(sub, subVerde ? 228 : 198, 126);
}
function burbujaAudio(x, X, Y, w, dur, avance = 0, cv = null) {
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w, 132, [8, 32, 32, 32]); x.fill(); x.stroke();
  let x0 = X + 30; if (cv) { avatar(x, cv, X + 70, Y + 66, 44); x0 = X + 128; }
  x.fillStyle = "#16243d"; x.beginPath(); x.moveTo(x0, Y + 40); x.lineTo(x0 + 44, Y + 66); x.lineTo(x0, Y + 92); x.closePath(); x.fill();
  const b0 = x0 + 70, b1 = X + w - 120; semilla = 77;
  for (let bx = b0, i = 0; bx < b1; bx += 14, i++) { const hh = 12 + Math.abs(Math.sin(i * 0.9) * 26) + az() * 18; x.fillStyle = (bx - b0) / (b1 - b0) < avance ? "#3fa60a" : "#8a93a3"; rr(x, bx, Y + 66 - hh / 2, 8, hh, 4); }
  x.fillStyle = "#16243d"; x.textAlign = "right"; x.textBaseline = "middle"; x.font = F(800, 38); x.fillText(dur, X + w - 22, Y + 68);
  return 132;
}
function burbujaTexto(x, X, Y, w, lineas, { yo = false, px = 46, tl = null, etiqueta = null, borde = null, rojo = false } = {}) {
  const h = 34 + lineas.length * px * 1.24 + (tl ? 30 : 0); let y0 = Y;
  if (etiqueta) { x.fillStyle = "#3fa60a"; x.font = F(800, 36); x.textAlign = yo ? "right" : "left"; x.textBaseline = "middle"; x.fillText(etiqueta, yo ? X + w - 6 : X + 6, Y + 18); y0 = Y + 48; }
  x.fillStyle = rojo ? "#f6e3df" : "#ffffff"; x.strokeStyle = borde ?? (yo ? "#3fa60a" : "#16243d"); x.lineWidth = yo ? 7 : 5; x.beginPath(); x.roundRect(X, y0, w, h, yo ? [32, 8, 32, 32] : [8, 32, 32, 32]); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, px); x.textAlign = "left"; x.textBaseline = "middle";
  lineas.forEach((l, i) => x.fillText(l, X + 26, y0 + 17 + px * 0.62 + i * px * 1.24));
  if (tl) { const cx = X + w - 46, cy = y0 + h - 26; tilde(x, cx, cy, 28, "#3fa60a", 7); tilde(x, cx + 16, cy, 28, "#3fa60a", 7); }
  return h + (y0 - Y);
}
function dibujarChat(x, W, H, { cv, nombre, sub, subVerde, msgs, ult = 1, input = "", extra = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  const medir = document.createElement("canvas").getContext("2d");
  const hs = msgs.map((m) => m.dibujar(medir, 0)), gap = 24;
  const piso = H - (input !== null ? 150 : 30) - extra;
  const total = hs.reduce((a, b) => a + b + gap, 0) - gap;
  const hU = (hs[hs.length - 1] ?? 0) + gap, totalAnt = total - (msgs.length > 1 ? hU : 0);
  const yAnt = totalAnt < piso - 214 ? 214 : piso - totalAnt, yNue = total < piso - 214 ? 214 : piso - total;
  let y = lerp(yAnt, yNue, eo(ult));   // (r3) del lugar de antes al de ahora: nunca baja
  msgs.forEach((m, i) => { m.dibujar(x, y); y += hs[i] + gap; });
  if (input !== null) {
    x.fillStyle = "#d9d7c9"; x.fillRect(0, H - 130, W, 130);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 4; x.beginPath(); x.roundRect(24, H - 108, W - 160, 86, 43); x.fill(); x.stroke();
    x.fillStyle = "#8a93a3"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 38); x.fillText(input || "Mensaje", 52, H - 64);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 70, H - 65, 44, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(W - 88, H - 88); x.lineTo(W - 46, H - 65); x.lineTo(W - 88, H - 42); x.closePath(); x.fill();
  }
  cabecera(x, W, cv, nombre, sub, subVerde);
}
const M_ = {
  audio: (dur, avance = 1, cv = AVATAR.pablo, trans = null) => ({ dibujar: (x, y) => { const h = burbujaAudio(x, 24, y, 600, dur, avance, cv); if (!trans) return h; x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(24, y + h + 8, 600, 104, [8, 26, 26, 26]); x.fill(); x.stroke(); x.fillStyle = "#3a4256"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(700, 36); x.fillText(trans[0], 50, y + h + 38); x.fillStyle = "#0b1220"; x.font = F(800, 36); x.fillText(trans[1], 50, y + h + 80); return h + 112; } }),
  yo: (ls, o = {}) => ({ dibujar: (x, y) => { x.font = F(800, o.px ?? 46); const w = Math.max(...ls.map((l) => x.measureText(l).width)) + (o.tl ? 110 : 60); return burbujaTexto(x, CW - 24 - w, y, w, ls, { yo: true, ...o }); } }),
  el: (ls, o = {}) => ({ dibujar: (x, y) => { x.font = F(800, o.px ?? 46); const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 60; return burbujaTexto(x, 24, y, w, ls, o); } }),
  dia: (txt) => ({ dibujar: (x, y) => { x.font = F(800, 36); const w = x.measureText(txt).width + 50; x.fillStyle = "#d9d7c9"; rr(x, (CW - w) / 2, y, w, 60, 30); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(txt, CW / 2, y + 31); return 60; } }),
  escribe: () => ({ dibujar: (x, y) => { x.fillStyle = "#cfeebc"; x.strokeStyle = "#3fa60a"; x.lineWidth = 5; x.beginPath(); x.roundRect(CW - 24 - 190, y, 190, 92, [32, 8, 32, 32]); x.fill(); x.stroke(); x.fillStyle = "#16243d"; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(CW - 24 - 140 + i * 45, y + 46, 12, 0, 7); x.fill(); } return 92; } }),
};

// ---- insertos a pantalla completa: el celular (P2, Q1i) y la tablet (Q2) ----
function crearFondoInserto(g, oscuro = false) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: oscuro ? 0x0b1220 : 0x16243d })); bg.position.z = -0.06; g.add(bg);
  const mos = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 700 / PXK), new THREE.MeshBasicMaterial({ color: oscuro ? 0x241a14 : 0x4a3628 })); mos.position.set(0, -900 / PXK, -0.058); g.add(mos);
  const fil = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 24 / PXK), new THREE.MeshBasicMaterial({ color: oscuro ? 0x2a6a10 : 0x5ce611 })); fil.position.set(0, -560 / PXK, -0.057); g.add(fil);
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  const brillo = new THREE.Mesh(rbox((IW + 2 * marcoR - 10) / PXK, (IH + 2 * marcoR - 10) / PXK, 0.005, 76 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x2c4268 })); brillo.position.set((cx - 540 - 3) / PXK, (960 - cy + 3) / PXK, -0.035); g.add(brillo);
  const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam);
  return { g, tex, IW, IH };
}
const INS_M = { g: new THREE.Group() }; crearFondoInserto(INS_M.g);
const CEL_M = crearCelInserto(740, 1360, 540, 1040, 34); INS_M.g.add(CEL_M.g);
const INS_A = { g: new THREE.Group() }; crearFondoInserto(INS_A.g, true);
const CEL_A = crearCelInserto(740, 1320, 540, 1100, 34); INS_A.g.add(CEL_A.g);
const INS_T = { g: new THREE.Group() }; crearFondoInserto(INS_T.g);
const TAB = crearCelInserto(860, 1300, 540, 1040, 44); INS_T.g.add(TAB.g);
for (const I of [INS_M, INS_A, INS_T]) { pegarACamara(I.g, camera, 10); I.g.visible = false; }

// la pantalla del celular parado en 3D: en la parte 1, la lista (cuántos sin contestar); en la parte 2, el chat del agente
function dibujarCelM(x, w, h, parte2) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 160); x.fillStyle = parte2 ? "#5ce611" : "#c7655b"; x.fillRect(0, 160, w, 10);
  x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.textAlign = "left"; x.font = F(800, 52); x.fillText(parte2 ? "agente de IA" : "Mensajes", 30, 82);
  if (parte2 === "viernes") {   // (r3) la lista de chats del viernes, todos contestados por el agente
    x.fillStyle = "#16243d"; x.textAlign = "center"; x.font = F(800, 38); x.fillText("Viernes", w / 2, 212);
    [["Martín", "Sí: mesa 4 ✓"], ["Laura", "A las 22:30 ✓"], ["Sergio", "Mesa 9 ✓"], ["Carla", "Para Raúl"]].forEach(([n, r], i) => {
      const y = 250 + i * 176; x.fillStyle = "#ffffff"; rr(x, 20, y, w - 40, 156, 26);
      avatar(x, [AVATAR.m, AVATAR.l, AVATAR.s, AVATAR.carla][i], 92, y + 78, 52);
      x.textAlign = "left"; x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText(n, 164, y + 52);
      x.fillStyle = i === 3 ? "#8a3a5a" : "#3fa60a"; x.font = F(800, 42); x.fillText(r, 164, y + 112);
    });
    return;
  }
  if (!parte2) { for (let i = 0; i < 4; i++) { const y = 210 + i * 180; x.fillStyle = "#ffffff"; rr(x, 30, y, w - 190, 140, 30); x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w - 70, y + 70, 30, 0, 7); x.fill(); } return; }
  // la nota de voz de Pablo, grande: la onda verde y la transcripción
  x.fillStyle = "#d9d7c9"; rr(x, 150, 200, 300, 64, 32); x.fillStyle = "#16243d"; x.textAlign = "center"; x.font = F(800, 38); x.fillText("2:14", 300, 233);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, 300, w - 48, 300, [10, 36, 36, 36]); x.fill(); x.stroke();
  avatar(x, AVATAR.pablo, 90, 380, 52);
  x.fillStyle = "#16243d"; x.beginPath(); x.moveTo(160, 352); x.lineTo(205, 380); x.lineTo(160, 408); x.closePath(); x.fill();
  semilla = 77; for (let i = 0; i < 18; i++) { const hh = 16 + Math.abs(Math.sin(i * 0.9) * 34) + az() * 20; x.fillStyle = "#3fa60a"; rr(x, 230 + i * 18, 380 - hh / 2, 10, hh, 5); }
  x.textAlign = "left"; x.fillStyle = "#0b1220"; x.font = F(800, 44); ["mesa para 8", "el viernes a las 10"].forEach((l, i) => x.fillText(l, 50, 480 + i * 56));
  x.fillStyle = "#cfeebc"; x.strokeStyle = "#3fa60a"; x.beginPath(); x.roundRect(w - 230, 640, 206, 100, [36, 10, 36, 36]); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(w - 175 + i * 48, 690, 13, 0, 7); x.fill(); }
}
dibujarCelM(pantM.userData.x, 600, 975, false); pantM.needsUpdate = true;
// Q1i · el chat del agente a las 2:14: la nota de voz de Pablo (la misma), "escribiendo…", la respuesta con la mesa
// real, "Dale", "Listo ✓"
function dibujarAgente(x, W, H, t) {
  const msgs = [M_.dia("Miércoles, 2:14")];
  const av = cl((t - T.nota) / LEN.p1);
  msgs.push(M_.audio("0:03", av, AVATAR.pablo, ["Transcripción: «mesa para 8", "el viernes a las 10»"]));
  let ult = 1;
  if (t >= T.escribiendo && t < T.resp1) msgs.push(M_.escribe());
  if (t >= T.resp1) { msgs.push(M_.yo(["¡Hola, Pablo! El viernes", "a las 22:00 tengo la", "mesa 7, para 8.", "¿Te la reservo?"], { etiqueta: "agente de IA" })); ult = sg(t, T.resp1, T.resp1 + 0.2); }
  if (t >= T.dale) { msgs.push(M_.el(["Dale"], { px: 50 })); ult = sg(t, T.dale, T.dale + 0.18); }
  if (t >= T.listo) { msgs.push(M_.yo(["Listo ✓ Mesa 7 · viernes", "22:00 · 8 personas.", "El jueves te pido", "que confirmes."], { tl: true, borde: "#3fa60a" })); ult = sg(t, T.listo, T.listo + 0.2); }
  dibujarChat(x, W, H, { cv: AVATAR.local, nombre: "Parrilla Raúl · agente de IA", sub: "en línea", subVerde: true, msgs, ult, input: "", extra: Math.round(470 * eo(sg(t, T.plano, T.plano + 0.3))) });
}
let claveA = "";
function ponerAgente(t) { const c = `${Math.round(t * 30)}`; if (c === claveA) return; claveA = c; dibujarAgente(CEL_A.tex.userData.x, CEL_A.IW, CEL_A.IH, t); CEL_A.tex.needsUpdate = true; }
// el plano de mesas (vista desde arriba): 12 mesas con su número; libres en crema, reservadas en navy3; la 7 se pinta
const PLANO_MESAS = [[1, 0.12, 0.16, 0], [2, 0.38, 0.16, 1], [3, 0.64, 0.16, 1], [4, 0.88, 0.16, 0], [5, 0.12, 0.42, 1], [6, 0.12, 0.68, 0], [7, 0.5, 0.52, 2], [8, 0.88, 0.42, 1], [9, 0.88, 0.68, 0], [10, 0.12, 0.9, 1], [11, 0.5, 0.86, 0], [12, 0.88, 0.9, 1]];
function dibujarPlano(x, W, H, { m7 = 0, libera = 0, etiqueta = "Pablo · 8 · 22:00", tachada = false, walter = 0 }) {
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, W, H);
  for (const [n, px, py, tipo] of PLANO_MESAS) {
    const cx = px * W, cy = py * H, larga = tipo === 2, w = larga ? W * 0.34 : W * 0.15, h = larga ? H * 0.17 : H * 0.12;
    let res = tipo === 1;
    let fondo = res ? "#1f3254" : "#efeee5";
    if (larga) { const u = m7 * (1 - libera) + walter; fondo = u > 0.5 ? (walter > 0.5 ? "#3fa60a" : "#1f3254") : "#efeee5"; res = u > 0.5; }
    x.fillStyle = fondo; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, 16); x.fill(); x.stroke();
    x.fillStyle = res ? "#efeee5" : "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, larga ? 52 : 40); x.fillText(String(n), cx, cy + 2);
  }
  if (m7 > 0.5 || walter > 0.5) {
    const txt = walter > 0.5 ? "Walter · 6 · 22:00" : etiqueta;
    x.font = F(800, 38); const w = x.measureText(txt).width + 40, cx = 0.5 * W, cy = 0.52 * H - H * 0.17;
    x.fillStyle = walter > 0.5 ? "#3fa60a" : "#0b1220"; rr(x, cx - w / 2, cy - 30, w, 60, 30); x.fillStyle = "#efeee5"; x.fillText(txt, cx, cy + 2);
    if (tachada && walter < 0.5) { x.fillStyle = "#c7655b"; x.fillRect(cx - w / 2 - 6, cy - 3, w + 12, 7); }
  }
}
// Q2 · la tablet: "Reservas de mañana" con las tildes de a una, Pablo sin confirmar, la línea de tiempo y la lista de espera
const FILAS_R = [["González", 4, "21:00", 2], ["Ferreira", 2, "21:30", 3], ["Sosa", 2, "21:30", 5], ["Pablo", 8, "22:00", 7], ["Rodríguez", 4, "22:00", 8], ["Méndez", 3, "22:30", 10]];
function dibujarPanel(x, W, H, t) {
  const k = W / 860;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 200 * k); x.fillStyle = "#5ce611"; x.fillRect(0, 200 * k, W, 12 * k);
  x.fillStyle = "#b9c3d3"; x.font = F(700, 38 * k); x.fillText("Parrilla Raúl · agente de IA", 36 * k, 50 * k);
  x.fillStyle = "#efeee5"; x.font = F(900, 62 * k); x.fillText("Viernes · reservas", 36 * k, 134 * k);
  // el contador de confirmadas
  const n = T.tildes.filter((a) => t >= a).length;
  x.fillStyle = "#0b1220"; rr(x, 24 * k, 236 * k, W - 48 * k, 124 * k, 30 * k);
  x.fillStyle = "#efeee5"; x.font = F(800, 50 * k); x.fillText("Confirmadas:", 54 * k, 298 * k);
  x.textAlign = "right"; x.font = F(900, 74 * k); x.fillStyle = n >= 11 ? "#5ce611" : "#efeee5"; x.fillText(`${n} de 12`, W - 50 * k, 300 * k); x.textAlign = "left";
  // las filas
  const libera = t >= T.libera, ofrecida = t >= T.espera;
  FILAS_R.forEach(([nom, p, h, mesa], i) => {
    const pablo = nom === "Pablo", y = 384 * k + i * 94 * k + (i > 3 ? 24 * k : 0), hF = pablo ? 112 : 88;
    const conf = !pablo && n > [0, 1, 2, -1, 4, 6][i];
    x.fillStyle = pablo ? "#f6e3df" : "#ffffff"; x.strokeStyle = pablo ? "#c7655b" : "#16243d"; x.lineWidth = 5 * k; x.beginPath(); x.roundRect(24 * k, y, W - 48 * k, hF * k, 24 * k); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(800, 42 * k); x.fillText(`${nom} · ${p} · ${h}`, 50 * k, pablo ? y + 34 * k : y + 46 * k);
    // la mesa: un círculo navy con el número
    x.fillStyle = "#16243d"; x.beginPath(); x.arc(W - 262 * k, y + hF / 2 * k, 34 * k, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 34 * k); x.fillText(String(mesa), W - 262 * k, y + (hF / 2 + 2) * k); x.textAlign = "left";
    if (pablo) {
      x.fillStyle = "#b5483e"; x.font = F(800, 40 * k); x.fillText(libera ? "no confirmó · liberada" : "sin confirmar", 50 * k, y + 82 * k);
      if (libera) { x.fillStyle = "#c7655b"; x.fillRect(46 * k, y + 32 * k, 380 * k, 6 * k); }
    } else if (conf) { x.fillStyle = "#5ce611"; rr(x, W - 200 * k, y + 17 * k, 160 * k, 58 * k, 29 * k); tilde(x, W - 120 * k, y + 46 * k, 34 * k, "#0b1220", 8 * k); }
  });
  // la línea de tiempo y la lista de espera
  const yL = 384 * k + 6 * 94 * k + 24 * k + 50 * k;
  x.fillStyle = "#3fa60a"; x.font = F(800, 36 * k); x.fillText(n >= 11 ? "+ 6 reservas más · confirmadas ✓" : "+ 6 reservas más", 50 * k, yL - 22 * k);
  const pasos = [["12:00 · pedido de confirmación ✓", T.tildes[0], "#16243d"], ["18:00 · segundo aviso ✓", T.aviso18, "#16243d"], ["20:00 · Mesa 7 liberada", T.libera, "#c7655b"]];
  pasos.forEach(([l, a, c], i) => { if (t < a) return; x.fillStyle = c; x.font = F(800, 38 * k); x.fillText(l, 50 * k, yL + 24 * k + i * 46 * k); });
  if (ofrecida) {
    const y = yL + 3 * 46 * k + 4 * k, s = 0.85 + 0.15 * bk(sg(t, T.espera, T.espera + 0.2));
    x.save(); x.translate(W / 2, y + 65 * k); x.scale(s, s);
    x.fillStyle = "#3fa60a"; rr(x, -W / 2 + 24 * k, -65 * k, W - 48 * k, 130 * k, 40 * k);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 38 * k); x.fillText("Lista de espera: Walter · 6", 0, -24 * k);
    x.font = F(800, 36 * k); x.fillText("(pidió el martes) → Ofrecida ✓", 0, 26 * k);
    x.restore(); x.textAlign = "left";
  }
}
let claveTab = "";
function ponerPanel(t) { const c = `${T.tildes.filter((a) => t >= a).length}|${t >= T.aviso18}|${t >= T.libera}|${Math.round(sg(t, T.espera, T.espera + 0.2) * 6)}`; if (c === claveTab) return; claveTab = c; dibujarPanel(TAB.tex.userData.x, TAB.IW, TAB.IH, t); TAB.tex.needsUpdate = true; }
// la tablet en 3D (parte 2): el plano de mesas (Q5 y fondo)
let claveT3 = "";
function ponerTablet3D(t) {
  const e = t >= T.q5 ? { m7: 1, etiqueta: "Pablo · sábado 22:00" } : t >= T.q3 ? { walter: 1 } : { m7: 1 };
  const c = JSON.stringify(e); if (c === claveT3) return; claveT3 = c;
  const x = pantT.userData.x; x.fillStyle = "#16243d"; x.fillRect(0, 0, 720, 1000); x.fillStyle = "#efeee5"; x.font = F(900, 60); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("Plano de mesas", 36, 80);
  x.save(); x.translate(20, 170); const cv = document.createElement("canvas"); cv.width = 680; cv.height = 800; dibujarPlano(cv.getContext("2d"), 680, 800, e); x.drawImage(cv, 0, 0); x.restore();
  pantT.needsUpdate = true;
}

// =====================================================================================================
// TARJETAS: globos, rótulos, chats pegados a la cámara
// =====================================================================================================
const GL = {
  p1: crearGlobo(["Raúl, soy Pablo. ¿Me guardás", "mesa para [ocho] el [viernes]", "a las diez?"], 56, { cab: { cv: AVATAR.tel, nombre: "Pablo · llamada" } }),
  r1: crearGlobo(["¡Anotado, [Pablo!]"], 84),
  w1: crearGlobo(["Raúl, ¿tenés mesa", "para [seis?]"], 74),
  r2a: crearGlobo(["No, Walter."], 80), r2: crearGlobo(["No, Walter.", "Esa es de [Pablo.]"], 80),
  rot9: crearRotulo([["Familia de 6 que se fue:", "#efeee5", 46], ["$ 9.000", RED_T, 72]], 46),
  f1: crearGlobo(["Raúl, ¿y los", "de las [diez?]"], 80),
  r3: crearGlobo(["Están llegando."], 84),
  f2: crearGlobo(["¿Y?"], 110),
  r4: crearGlobo(["[Siguen] llegando."], 84),
  rotA: crearRotulo([["Mesa de 8 vacía:", "#efeee5", 46], ["22:00 → 23:40", RED_T, 64]], 46),
  rotB: crearRotulo([["Cubiertos puestos: 8", "#efeee5", 46], ["usados: 0", RED_T, 64]], 46),
  // parte 2
  rotQ1: crearRotulo([["Contesta a cualquier hora,"], ["con tus mesas reales"]], 48),
  rotQ2: crearRotulo([["Si no confirman, la mesa", "#efeee5"], ["se libera sola", "#5ce611"]], 50),
  w2: crearGlobo(["¡Esta vez sí [entramos!]"], 76),
  rotQ3: crearRotulo([["Un cumpleaños de 20:"], ["lo cerrás vos", "#5ce611"]], 50),
  r6: crearGlobo(["Ese, [para mí.]"], 84),
  r7: crearGlobo(["[Llegaron.]"], 96),
  rotQ4a: crearRotulo([["Mesa 7 · Walter · 6", "#efeee5", 46], ["$ 9.000 ✓", "#5ce611", 64]], 46),
  rotQ4b: crearRotulo([["Mesas vacías por reservas", "#efeee5", 44], ["que no vinieron: 0", "#5ce611", 58]], 44),
};
// los mensajes que llegan al celular de Raúl (P4 y P6): chat genérico, encabezado navy "Pablo"
const tarjetaMsj = (lineas, hora, px = 50) => crearTarjeta(900, 176 + lineas.length * px * 1.3 + 40, (x, W, H) => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); avatar(x, AVATAR.pablo, 74, 65, 46);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 52); x.fillText("Pablo", 140, 66);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, 156, W - 60, H - 186, [8, 30, 30, 30]); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, px); lineas.forEach((l, i) => x.fillText(l, 58, 156 + 24 + px * 0.66 + i * px * 1.3));
  x.fillStyle = "#4a5568"; x.textAlign = "right"; x.font = F(800, 40); x.fillText(hora, W - 56, H - 56);
});
// Q1 · el plano de mesas (se abre debajo del chat)
GL.plano = crearTarjeta(900, 640, () => {}, { fondo: "#ffffff" });
let clavePlano = "";
function ponerPlano(t) {
  const m7 = t >= T.mesa7 ? 1 : 0, c = `${m7}`; if (c === clavePlano) return; clavePlano = c;
  redibujar(GL.plano, (x, W, H) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 96); x.fillStyle = "#efeee5"; x.font = F(900, 52); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Plano de mesas · viernes", 30, 50); x.save(); x.translate(20, 110); const cv = document.createElement("canvas"); cv.width = W - 40; cv.height = H - 126; dibujarPlano(cv.getContext("2d"), W - 40, H - 126, { m7 }); x.drawImage(cv, 0, 0); x.restore(); });
}
// Q2b · el aviso de Walter (chat del agente con los botones Sí / No)
GL.avisoW = crearTarjeta(940, 600, () => {}, { fondo: "#efeee5" });
let claveAW = "";
function ponerAvisoW(t) {
  const si = t >= T.si ? 1 : 0, res = t >= T.reservada ? 1 : 0, c = `${si}|${res}`; if (c === claveAW) return; claveAW = c;
  redibujar(GL.avisoW, (x, W, H) => {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 120); avatar(x, AVATAR.local, 70, 60, 44); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 46); x.fillText("Parrilla Raúl · agente de IA", 130, 60);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#3fa60a"; x.lineWidth = 7; x.beginPath(); x.roundRect(28, 146, W - 56, 236, [8, 30, 30, 30]); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(800, 50); ["Walter, se liberó una mesa", "para 6 mañana a las 22:00.", "¿La querés?"].forEach((l, i) => x.fillText(l, 54, 200 + i * 64));
    if (!res) {
      const b = (bx, txt, verde, toca) => { x.fillStyle = verde ? "#5ce611" : "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = toca ? 10 : 6; x.beginPath(); x.roundRect(bx, 410, 400, 150, 75); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 72); x.fillText(txt, bx + 200, 486); x.textAlign = "left"; };
      b(40, "Sí", true, si); b(W - 440, "No", false, false);
    } else {
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(28, 404, W - 56, 168, 36); x.fill();
      x.fillStyle = "#5ce611"; x.beginPath(); x.arc(100, 488, 44, 0, 7); x.fill(); tilde(x, 101, 490, 46, "#0b1220", 11);
      x.fillStyle = "#5ce611"; x.font = F(900, 56); x.fillText("Reservada ✓", 170, 456); x.fillStyle = "#efeee5"; x.font = F(800, 42); x.fillText("Mesa 7 · viernes 22:00 · 6", 170, 520);
    }
  });
}
// Q3 · el chat del celular parado que contesta solo y la tarjeta "Para vos, Raúl"
GL.chatQ3 = crearTarjeta(660, 590, () => {}, { fondo: "#efeee5" });
let claveQ3 = "";
function ponerChatQ3(t) {
  const n = T.rq.filter((a) => t >= a).length;
  const c = `${n}`; if (c === claveQ3) return; claveQ3 = c;
  redibujar(GL.chatQ3, (x, W, H) => {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 116); avatar(x, AVATAR.local, 66, 58, 42); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 34); x.fillText("Parrilla Raúl · agente de IA", 116, 58);
    const txt = "12 reservas confirmadas ✓"; x.font = F(900, 40); const w = x.measureText(txt).width + 56;
    x.fillStyle = "#5ce611"; rr(x, (W - w) / 2, 136, w, 88, 44); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.fillText(txt, W / 2, 182); x.textAlign = "left";
    const items = [["¿Mesa para 2 a las 21:30?", false], ["Sí: mesa 4 ✓", true], ["¿Tenés mesa para cuatro?", false], ["A las 22:30, mesa 6 ✓", true]];
    items.slice(0, n).forEach(([l, yo], i) => {
      const y = 240 + i * 88; x.font = F(800, 40); const bw = x.measureText(l).width + 60, bx = yo ? W - 30 - bw : 30;
      x.fillStyle = yo ? "#ffffff" : "#ffffff"; x.strokeStyle = yo ? "#3fa60a" : "#16243d"; x.lineWidth = yo ? 7 : 5; x.beginPath(); x.roundRect(bx, y, bw, 76, yo ? [30, 8, 30, 30] : [8, 30, 30, 30]); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.fillText(l, bx + 30, y + 40);
    });
  });
}
GL.paraVos = crearTarjeta(960, 250, (x, W) => {
  x.fillStyle = "#5ce611"; x.fillRect(0, 0, 22, 250);
  avatar(x, AVATAR.carla, 110, 125, 72);
  x.fillStyle = "#3fa60a"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 52); x.fillText("Para vos, Raúl", 208, 62);
  x.fillStyle = "#0b1220"; ajustar(x, "Carla · cumpleaños de 20 · sábado", 800, 48, W - 240); x.fillText("Carla · cumpleaños de 20 · sábado", 208, 130);
  x.fillStyle = "#16243d"; ajustar(x, "quiere menú cerrado: lo cerrás vos", 700, 44, W - 240); x.fillText("quiere menú cerrado: lo cerrás vos", 208, 192);
}, { fondo: "#ffffff", borde: C.gd });
// Q5 · la tablet: la reserva de Pablo del sábado, confirmada
GL.confirmada = crearTarjeta(960, 260, (x, W) => {
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(110, 130, 70, 0, 7); x.fill(); tilde(x, 112, 134, 74, "#0b1220", 16);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 54); x.fillText("Sábado 22:00 · Mesa 7", 210, 70);
  x.font = F(800, 50); x.fillText("Pablo · 8", 210, 136); x.fillStyle = "#3fa60a"; x.font = F(900, 56); x.fillText("Confirmada ✓", 210, 200);
}, { fondo: "#ffffff", borde: C.gd });
// Q1 · la nota de voz que llega al celular del local a las 2:14 (el mismo audio de Pablo)
GL.notaQ1 = crearTarjeta(900, 400, () => {}, { fondo: "#efeee5" });
let claveNQ = "";
function ponerNotaQ1(t) {
  const av = Math.round(cl((t - T.nota) / LEN.p1) * 30) / 30, c = `${av}`; if (c === claveNQ) return; claveNQ = c;
  redibujar(GL.notaQ1, (x, W) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 110); avatar(x, AVATAR.pablo, 64, 55, 40); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 46); x.fillText("Pablo · nota de voz", 122, 56); x.textAlign = "right"; x.fillStyle = "#b9c3d3"; x.font = F(800, 40); x.fillText("2:14", W - 30, 56); burbujaAudio(x, 24, 134, W - 48, "0:03", av, AVATAR.pablo); x.fillStyle = "#3a4256"; x.textAlign = "left"; x.font = F(700, 40); x.fillText("Transcripción:", 30, 314); x.fillStyle = "#0b1220"; x.font = F(800, 44); x.fillText("«mesa para 8 el viernes a las 10»", 30, 364); });
}
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro
// de un plano, Catmull-Rom continua. null = inserto pegado a la cámara. Q3 repite el cuadro 0, Q4 el plano de P4 y Q5 el
// de P6 (callbacks).
// =====================================================================================================
const CAM0 = (k) => [lerp(0.36, 0.3, k), lerp(1.78, 1.76, k), lerp(0.05, -0.2, k), -0.42, lerp(1.13, 1.16, k), -2.3, 54];
const MESA_CAM = (k, d = 0, sube = 0) => [lerp(1.02, 0.97, k), 1.72 + sube * 0.2, lerp(1.95, 1.82, k) - d + sube * 0.3, lerp(0.12, 0.14, k), 0.95 + sube, -1.3, 54];
const PLANOS = [
  ["P1", 0, [[0, ...CAM0(0)], [T.p3, ...CAM0(1)]]],
  ["P3", T.p3, [[T.p3, 0.32, 1.85, 1.55, 0.38, 1.05, -2.2, 64], [T.p3b, 0.32, 1.83, 1.43, 0.38, 1.05, -2.2, 63]]],
  ["P3b", T.p3b, [[T.p3b, -0.05, 1.62, -0.5, -0.62, 1.3, -2.62, 50], [T.p3c, -0.08, 1.6, -0.62, -0.62, 1.3, -2.62, 48]]],
  ["P3c", T.p3c, [[T.p3c, 0.32, 1.83, 1.43, 0.38, 1.05, -2.2, 63], [T.p4, 0.32, 1.8, 1.3, 0.38, 1.05, -2.2, 62]]],
  ["P4", T.p4, [[T.p4, ...MESA_CAM(0)], [T.p5, ...MESA_CAM(1)]]],
  ["P5", T.p5, [[T.p5, ...MESA_CAM(0)], [T.p5b, ...MESA_CAM(0.5)]]],
  ["P5b", T.p5b, [[T.p5b, -0.6, 1.56, -0.75, -0.66, 1.33, -2.62, 46], [T.p5c, -0.61, 1.55, -0.9, -0.66, 1.33, -2.62, 44]]],
  ["P5c", T.p5c, [[T.p5c, ...MESA_CAM(1)], [T.p6, ...MESA_CAM(1, 0.05)]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, 0.42, 1.32, -1.15, -0.08, 1.13, -2.15, 46], [T.q1i, 0.32, 1.28, -1.38, -0.08, 1.15, -2.15, 42]]],
  ["Q1i", T.q1i, null],
  ["Q2", T.q2, null],
  ["Q2b", T.q2b, [[T.q2b, 30.0, 1.5, 2.7, 29.8, 1.72, -0.55, 42], [T.q3, 29.98, 1.5, 2.55, 29.8, 1.72, -0.55, 40]]],
  ["Q3", T.q3, [[T.q3, 0.46, 1.82, 0.42, -0.4, 1.12, -2.3, 60], [T.q4, 0.42, 1.8, 0.25, -0.4, 1.14, -2.3, 60]]],
  ["Q4", T.q4, [[T.q4, 0.36, 1.75, 3.9, 0.36, 1.0, -0.95, 66], [r2(T.r7 - 0.08), 0.36, 1.74, 3.82, 0.36, 1.0, -0.95, 66]]],
  ["Q4b", r2(T.r7 - 0.08), [[r2(T.r7 - 0.08), 0.1, 2.25, 0.3, -0.52, 1.12, -2.5, 44], [r2(T.rotQ4 - 0.02), 0.08, 2.22, 0.18, -0.52, 1.12, -2.5, 43]]],
  ["Q4c", r2(T.rotQ4 - 0.02), [[r2(T.rotQ4 - 0.02), 0.36, 1.74, 3.8, 0.36, 1.0, -0.95, 66], [T.c, 0.36, 1.74, 3.77, 0.36, 1.0, -0.95, 66]]],
  ["C", T.c, [[T.c, -0.6, 1.66, -0.55, -0.66, 1.06, -2.62, 50], [DUR, -0.61, 1.64, -0.68, -0.66, 1.08, -2.62, 48]]],
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

const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
const _a = new THREE.Vector3(), _b = new THREE.Vector3();
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);   // hablando, nunca con los ojos cerrados
};
// dos pasadas: pone la pose, lleva una mano a un punto del mundo (en el espacio del cuerpo) y la vuelve a poner
function manoA(per, p, lado, w, k = 1) {
  per.poner(p); per.raiz.updateMatrixWorld(true);
  const l = per.cuerpo.worldToLocal(w.clone()); const key = lado === "I" ? "manoI" : "manoD";
  p[key] = [lerp(p[key][0], l.x, k), lerp(p[key][1], l.y, k), lerp(p[key][2], l.z, k)];
}
const giroA = (ax, az2, bx, bz) => Math.atan2(bx - ax, bz - az2);
function recorrido(t, K) {
  if (t <= K[0][0]) return { x: K[0][1], z: K[0][2], giro: null, anda: false };
  for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const u = sg(t, K[i - 1][0], K[i][0]); return { x: lerp(K[i - 1][1], K[i][1], u), z: lerp(K[i - 1][2], K[i][2], u), giro: giroA(K[i - 1][1], K[i - 1][2], K[i][1], K[i][2]), anda: true }; }
  const L = K[K.length - 1]; return { x: L[1], z: L[2], giro: null, anda: false };
}

// =====================================================================================================
// POSES
// =====================================================================================================
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.8, tension: 0.15, feliz: 0 }, cejas: { alto: 0.05, ang: 0.12, asim: 0.3 }, boca: { sonrisa: -0.05, abierta: 0, ancho: 0.95 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.92, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } };
const PENA = { ojos: { abiertos: 0.95, feliz: 0.15 }, cejas: { alto: 0.4, ang: 0.55, asim: 0 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1.0 } };
const AMARGA = { ojos: { abiertos: 0.7, tension: 0.3, feliz: 0 }, cejas: { alto: 0.3, ang: 0.7, asim: 0.4 }, boca: { sonrisa: 0.2, abierta: 0, ancho: 1.05 } };
const PARRILLA = { manoD: [-0.28, 0.44, 0.44], codoD: [-0.9, -0.5, 0], manoI: [0.27, 0.12, 0.22], codoI: [0.9, -0.6, -0.2], dedoD: 0, dedoI: 0 };
const DOS_MANOS = { manoD: [-0.22, 0.36, 0.44], codoD: [-0.9, -0.5, 0], manoI: [0.16, 0.34, 0.46], codoI: [0.9, -0.5, 0], dedoD: 0, dedoI: 0 };
// Raúl, detrás de la parrilla (no se mueve de su lugar); mira al cuaderno (+x) o al salón
const G_CUAD = giroA(RAUL0.x, RAUL0.z, CUAD.x, CUAD.z);
function poseRaul(t) {
  const p2 = t >= P2;
  let p;
  if (!p2) {
    p = poseEn(t, [
      // P1: el celular en el hombro izquierdo (cabeza ladeada), anota en el cuaderno, la pinza en la parrilla
      [0, { x: RAUL0.x, z: RAUL0.z, giro: G_CUAD - 0.35, inclina: 0.1, ...aC(0.1, 0.22, 0.02), ...CARA.concentrada, ojos: { abiertos: 0.8, y: -0.7 }, boca: { sonrisa: 0.3 }, ...PARRILLA }],
      [T.r1, { ...aC(-0.1, 0.1, 0.02), ...BUENA }, 0.15],
      // P3: mira a la puerta; la pinza apunta a la mesa 7
      [T.p3, { giro: 0.45, inclina: 0.04, ...aC(0.35, 0.02, 0.02), ...PENA, ...PARRILLA }, 0.01],
      [T.pinza + 0.18, { manoD: [-0.44, 0.5, 0.46], codoD: [-0.9, -0.6, 0], ...aC(0.3, 0.02, 0.02) }, 0.22],
      [T.p3c + 0.3, { ...PARRILLA }, 0.3],
      // P4: mira el celular en la izquierda, confiado
      [T.p4, { giro: 0.3, inclina: 0.06, ...aC(0.35, 0.05, 0.02), ...MEDIA, ...PARRILLA }, 0.01],
      [T.r3 - 0.15, { ...aC(0.35, 0.05, 0.02) }, 0.2],
      // P5: seco, de frente
      [T.p5, { giro: 0.2, inclina: 0.04, ...aC(0.3, 0.08, 0.02), ...SECO, ...PARRILLA }, 0.01],
      [T.p5b, { giro: 0.0, ...aC(0.0, 0.05, 0.0), ...SECO }, 0.01],
      // P6: lee el celular, pausa, media sonrisa amarga
      [T.p6, { giro: 0.25, ...aC(0.2, 0.3, 0.02), ...SECO, manoI: [0.12, 0.38, 0.36], codoI: [0.8, -0.6, -0.2], manoD: [-0.2, 0.36, 0.44] }, 0.01],
      [T.r5 - 0.3, { ...aC(0.4, 0.1, 0.02), ...AMARGA }, 0.3],
    ]);
    if (t < T.p3) {
      // la birome por el renglón: la mano izquierda arriba de la punta
      const u = sg(t, T.escribe[0], T.escribe[1]), w = puntoCuad(lerp(0.05, 0.92, u)).add(PEN_DIR.clone().multiplyScalar(0.05));
      manoA(raul, p, "I", w, 1);
    }
    bocaVoz(p, t, T.r1, ENV.r1, 0.7); bocaVoz(p, t, T.r2, ENV.r2, 0.6); bocaVoz(p, t, T.r3, ENV.r3, 0.6); bocaVoz(p, t, T.r4, ENV.r4, 0.55);
  } else {
    p = poseEn(t, [
      [0, { x: RAUL0.x, z: RAUL0.z, giro: 0.25, inclina: 0.08, ...aC(0.3, 0.15, 0.02), ...BUENA, ...DOS_MANOS }],
      [T.r6 - 0.35, { ...aC(0.75, 0.2, 0.02), ...MEDIA }, 0.25],             // mira de reojo el celular parado
      [T.r6 - 0.02, { ...aC(0.25, 0.08, 0.02), ...BUENA }, 0.2],
      [T.q4, { giro: 0.3, inclina: 0.04, ...aC(0.35, 0.02, 0.02), ...MEDIA, ...PARRILLA }, 0.01],
      [T.r7 - 0.05, { giro: 0.42, manoD: [-0.44, 0.5, 0.46], codoD: [-0.9, -0.6, 0], ...BUENA }, 0.22],
      [T.c, { giro: 0.0, inclina: 0.03, ...aC(0.0, 0.02, 0.02), ...MEDIA, boca: { sonrisa: 0.55 }, manoD: [-0.3, 0.46, 0.4], codoD: [-0.9, -0.6, 0], manoI: [0.27, 0.12, 0.22] }, 0.01],
    ]);
    { // señala la mesa 7 con la pinza mientras dice "Llegaron."
      const k = sg(t, T.r7 - 0.1, T.r7 + 0.18) * (1 - sg(t, T.c - 0.35, T.c - 0.05));
      if (k > 0) manoA(raul, p, "D", V3(RAUL0.x + 0.26 * 0.62, 1.06, RAUL0.z + 0.96 * 0.62), k);
    }
    bocaVoz(p, t, T.r6, ENV.r6, 0.6); bocaVoz(p, t, T.r7, ENV.r7, 0.6); bocaVoz(p, t, T.r9, ENV.r9, 0.6);
  }
  p.t = t; return p;
}
// Fabián: P2b planta el RESERVADO y pone los cubiertos (del otro lado de la mesa 7, de frente); P4 con la bandeja bajo el
// brazo; P5 sube una silla a la mesa de al lado (P6 y Q5 se sacaron en la ronda 1)
const F_MESA = { x: M7.x + 0.45, z: M7.z - M7.D / 2 - 0.3 };
const F_P4 = { x: M7.x + 0.32, z: M7.z - M7.D / 2 - 0.55 };
function poseFabian(t) {
  const p2 = t >= P2;
  const gR = giroA(F_P4.x, F_P4.z, RAUL0.x, RAUL0.z);
  let p;
  if (!p2) {
    p = poseEn(t, [
      [0, { x: F_MESA.x, z: F_MESA.z, giro: 0, inclina: 0.18, ...aC(0, 0.35), ...CARA.concentrada, boca: { sonrisa: 0.3 }, manoD: [-0.12, 0.3, 0.5], manoI: [0.2, 0.2, 0.42], codoD: [-0.8, -0.6, 0], codoI: [0.8, -0.6, 0] }],
      [T.reservado, { manoD: [-0.05, 0.12, 0.55] }, 0.15],
      [T.cubiertos[0], { manoD: [-0.32, 0.1, 0.5], manoI: [0.3, 0.1, 0.48] }, 0.15],
      [T.cubiertos[0] + 0.25, { manoD: [-0.1, 0.1, 0.55], manoI: [0.12, 0.1, 0.55] }, 0.2],
      [T.cubiertos[1], { manoD: [-0.36, 0.08, 0.48], manoI: [0.36, 0.08, 0.48] }, 0.2],
      // P4: parado al costado, la bandeja bajo el brazo derecho, mira a Raúl
      [T.p4, { x: F_P4.x, z: F_P4.z, giro: gR + 1.85, inclina: 0, ...aC(-0.5, 0.0), ...CARA.neutra, cejas: { alto: 0.3, ang: 0.2 }, manoD: [-0.3, 0.12, 0.08], codoD: [-1, -0.3, 0], manoI: [0.29, -0.08, 0.04] }, 0.01],
      // P5: una silla en las manos (la va a subir a la mesa de al lado), cejas arriba
      [T.p5, { x: F_P4.x + 0.15, z: F_P4.z + 0.1, giro: gR + 1.8, ...aC(-0.5, 0.0), ...CARA.neutra, cejas: { alto: 0.75, ang: 0.35 }, manoD: [-0.24, 0.3, 0.32], manoI: [0.24, 0.3, 0.32], codoD: [-1, -0.5, 0], codoI: [1, -0.5, 0] }, 0.01],
      // P6: del otro lado de la mesa, juntando los cubiertos (el manojo en el puño derecho)
      [T.p6, { x: F_MESA.x, z: F_MESA.z, giro: 0, inclina: 0.2, ...aC(0, 0.35), ...CARA.concentrada, boca: { sonrisa: 0 }, manoD: [-0.18, 0.2, 0.5], manoI: [0.22, 0.12, 0.5], codoD: [-0.8, -0.6, 0], codoI: [0.8, -0.6, 0] }, 0.01],
      [T.junta[1], { manoD: [-0.1, 0.35, 0.42], manoI: [0.3, 0.1, 0.46], inclina: 0.1, ...aC(-0.3, 0.1) }, 0.25],
      // P6b: se congela con el tenedor en el aire; lo vuelve a poner (incrédulo)
      [T.r5 - 0.1, { ...aC(-0.4, 0.05), ...CARA.incredula, ojos: { abiertos: 0.75 }, manoI: [0.18, 0.38, 0.45], codoI: [0.8, -0.6, 0] }, 0.2],
      [T.tenedor, { manoI: [0.2, 0.12, 0.55], inclina: 0.2, ...aC(-0.2, 0.3) }, 0.22],
    ]);
  } else {
    p = poseEn(t, [
      [0, { x: 0.4, z: -1.05, giro: giroA(0.4, -1.05, RAUL0.x, RAUL0.z) + 1.5, ...aC(-0.3, 0.0), ...CARA.sonrisa, manoD: [-0.3, 0.12, 0.08], codoD: [-1, -0.3, 0], manoI: [0.29, -0.08, 0.04] }],
      [T.q5, { x: F_MESA.x, z: F_MESA.z, giro: 0, inclina: 0.2, ...aC(0, 0.35), ...CARA.sonrisa, manoD: [-0.18, 0.2, 0.5], manoI: [0.22, 0.12, 0.5], codoD: [-0.8, -0.6, 0], codoI: [0.8, -0.6, 0] }, 0.01],
      [T.q5 + 0.5, { manoD: [-0.1, 0.35, 0.42], inclina: 0.1, ...aC(-0.3, 0.1) }, 0.25],
      [T.r8 + 0.2, { ...aC(-0.4, 0.05), ...CARA.feliz, ojos: { abiertos: 0.95, feliz: 0.3 }, manoI: [0.18, 0.38, 0.45], codoI: [0.8, -0.6, 0] }, 0.2],
      [T.tenedor2, { manoI: [0.2, 0.12, 0.55], inclina: 0.2, ...aC(-0.2, 0.3) }, 0.22],
    ]);
  }
  bocaVoz(p, t, T.f1, ENV.f1, 0.65); bocaVoz(p, t, T.f2, ENV.f2, 0.7); bocaVoz(p, t, T.f1b, ENV.f1, 0.65);
  p.t = t; return p;
}
// Walter: P3 en la puerta con la familia; se van saludando. Q2b en su living con el celular. Q4 en la mesa 7 (levanta la copa)
// (r2) VER=portada: la familia más cerca de Raúl para que la portada los junte en la mitad de arriba (solo en el fondo limpio)
const PORTADA = VER === "portada";
const W_PUERTA = PORTADA ? { x: 0.42, z: -1.62 } : { x: 0.85, z: -1.68 };
const FAM_PUERTA = PORTADA ? [[0.62, -2.42], [9, 9.4], [9, 9], [9, 9.2], [9, 9.6]] : [[1.25, -2.0], [1.75, -1.85], [1.22, -1.38], [0.55, -1.42], [1.6, -2.38]];   // mujer, ado, nena, nene, abuela
// en la mesa 7 (Q4): Walter al medio del fondo, de frente; mujer e hija a los costados; la abuela, el ado y el nene
const SIENTA = { walter: [0.6, -1], nena: [-0.6, -1], ado: [0, -1], mujer: [-0.95, 0], abuela: [0.95, 0], nene: [-0.6, 1] };
const asiento = ([x, s]) => (s === 0 ? { x: M7.x + Math.sign(x) * (M7.L / 2 + 0.16), z: M7.z, giro: x > 0 ? -Math.PI / 2 : Math.PI / 2 } : { x: M7.x + x, z: M7.z + s * (M7.D / 2 + 0.14), giro: s > 0 ? Math.PI : 0 });
function poseWalter(t) {
  let p;
  if (t < P2) {
    const g0 = giroA(W_PUERTA.x, W_PUERTA.z, RAUL0.x, RAUL0.z) + 1.48;
    p = poseEn(t, [
      [0, { x: W_PUERTA.x, z: W_PUERTA.z, giro: g0, ...aC(-0.45, 0.0), ...CARA.esperanza, ...BRAZOS.costado }],
      [T.r2 + 0.4, { ...aC(-0.35, 0.05), ...CARA.sonrisa, cejas: { alto: 0.45, ang: 0.6 } }, 0.25],
    ]);
    if (t >= T.p3c + 0.15) { Object.assign(p, saludo(t, "D", 1)); const r = recorrido(t, [[T.p3c + 0.35, W_PUERTA.x, W_PUERTA.z], [T.p3c + 1.2, PUERTA.x + 0.05, GZ + 0.1]]); p.x = r.x; p.z = r.z; if (r.anda) { p.paso = 1; p.giro = lerp(g0, r.giro, sg(t, T.p3c + 0.35, T.p3c + 0.6)); } }
    bocaVoz(p, t, T.w1, ENV.w1, 0.75);
  } else if (t < T.q3) {
    p = poseEn(t, [[0, { x: 29.8, y: 0.06, z: -0.55, giro: 0, sentado: 1, inclina: 0.06, ...aC(0, 0.25), ...CARA.esperanza, ...BRAZOS.celular, codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] }],
      [T.reservada, { ...aC(0, 0.12), ...CARA.feliz, manoI: [0.36, 0.62, 0.3], codoI: [1, -0.4, 0] }, 0.2]]);
    bocaVoz(p, t, T.w2, ENV.w2, 0.8);
  } else {
    const a = asiento(SIENTA.walter);
    p = poseEn(t, [[0, { x: a.x, y: -0.08, z: a.z, giro: a.giro, sentado: 1, inclina: 0.06, ...aC(-0.35, 0.05), ...CARA.feliz, ...BRAZOS.apoyado }],
      [r2(T.rotQ4 + 0.15), { manoI: [0.14, 0.4, 0.46], codoI: [1, -0.7, 0], ...aC(-0.3, 0.0), ...BUENA }, 0.25]]);
  }
  p.t = t; return p;
}
function poseFam(i, t) {
  const pa = planoActual;
  if (pa === "P3" || pa === "P3b" || pa === "P3c") {
    const [x, z] = FAM_PUERTA[i];
    const p = poseEn(t, [[0, { x, z, giro: giroA(x, z, RAUL0.x, RAUL0.z) + 1.0, ...aC(-0.3, i === 3 ? -0.2 : 0), ...CARA.esperanza, ...BRAZOS.costado }], [T.r2 + 0.5, { ...CARA.sonrisa }, 0.3]]);
    if (t >= T.p3c + 0.25) { const r = recorrido(t, [[T.p3c + 0.3 + i * 0.06, x, z], [T.p3c + 1.25 + i * 0.06, PUERTA.x + (i % 2 ? 0.15 : -0.15), GZ + 0.1]]); p.x = r.x; p.z = r.z; if (r.anda) { p.paso = 1; p.giro = r.giro; } if (i === 0 || i === 2) Object.assign(p, saludo(t + i, "I", 0.8)); }
    p.visible = true; p.t = t; return p;
  }
  if (pa === "Q4" || pa === "Q4b" || pa === "Q4c") {
    const a = asiento(SIENTA[["mujer", "ado", "nena", "nene", "abuela"][i]]);
    const alto = FAM_CFG[i].alto ?? 1;
    const p = poseEn(t, [[0, { x: a.x, y: -0.08 + (alto < 0.8 ? (0.8 - alto) * 0.95 : 0), z: a.z, giro: a.giro, sentado: 1, inclina: 0.06, ...aC(i === 0 ? -0.75 : i === 4 ? 0.75 : i % 2 ? 0.25 : -0.25, 0.08), ...CARA.feliz, ...BRAZOS.apoyado }]]);   // (r4) las de las cabeceras miran a cámara (los lentes de frente)
    p.visible = true; p.t = t; return p;
  }
  return { visible: false };
}

// =====================================================================================================
// RENDER
// =====================================================================================================
const bump = (t, a, abre = 0.25, queda = 0.35, cierra = 0.4) => (t < a || t > a + abre + queda + cierra ? 0 : t < a + abre ? eo((t - a) / abre) : t < a + abre + queda ? 1 : 1 - eio((t - a - abre - queda) / cierra));
const PUERTAS = [[T.campana1 - 0.3, 0.3], [T.campana2 - 0.05, 0.9]];
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  // ---- la hora: el salón lleno, cerrando (23:40+), a oscuras (miércoles 2:14) ----
  const cerrando = (!p2 && t >= T.p5) || (p2 && t >= T.q5), oscuro = pa === "Q1", lleno = !cerrando && !oscuro && pa !== "Q2b";
  SAL.visible = lleno;
  SILLAS_ABAJO.visible = !cerrando && !oscuro; SILLAS_ARRIBA.visible = cerrando || oscuro;
  CARNE_LL.visible = !cerrando && !oscuro; CARNE_POCA.visible = cerrando;
  for (const [l, siempre] of LUCES) l.material = oscuro || (cerrando && !siempre) ? LUZ_OFF : LUZ_ON;
  sol.intensity = oscuro ? 0.15 : cerrando ? 1.0 : 1.55; cielo.intensity = oscuro ? 0.35 : cerrando ? 1.15 : 1.6; relleno.intensity = oscuro ? 0.35 : 0.6;
  brasaL.intensity = oscuro ? 0.0 : cerrando ? 1.8 : 2.4; foco.intensity = oscuro ? 0 : 9;
  BRASERO.visible = true; LLAMAS.forEach((l) => (l.visible = !oscuro));
  celL.intensity = oscuro && t >= T.prende ? 1.6 : 0; celL.position.set(MOS.x - 0.1, MOS.alto + 0.25, MOS.z + 0.2);
  PUERTA_HOJA.rotation.y = -1.15 * Math.max(...PUERTAS.map(([a, q]) => bump(t, a, 0.25, q, 0.45)));
  // ---- el mostrador: el cuaderno (parte 1) o el celular parado y la tablet (parte 2) ----
  CUADERNO.visible = BIROME.visible = PIOLIN.visible = !p2;
  ponerCuaderno(t);
  CELM.visible = p2;
  if (!p2) { CELM.position.set(MOS.x + 0.24, MOS.alto, MOS.z - 0.1); CELM.rotation.y = -0.1; }
  else { CELM.position.set(CUAD.x + 0.02, MOS.alto, CUAD.z); CELM.rotation.y = 0.5; }
  CELM.scale.setScalar(p2 ? 2.5 : 1.0);
  { const e = !p2 ? "p1" : t < T.prende ? "apagado" : t >= T.q3 ? "viernes" : "p2";   // Q1: el celular del local se prende solo a las 2:14
    if (e !== CELM.userData.e) { CELM.userData.e = e; const x = pantM.userData.x; if (e === "apagado") { x.fillStyle = "#05080f"; x.fillRect(0, 0, 600, 975); } else dibujarCelM(x, 600, 975, e === "p1" ? false : e); pantM.needsUpdate = true; } }
  tablet.visible = p2 && pa !== "Q1"; tablet.position.set(MOS.x + 0.2, MOS.alto, MOS.z - 0.05); tablet.rotation.y = -0.2; ponerTablet3D(t);
  // ---- la mesa 7: el RESERVADO, los lugares, la vela ----
  const puesta = (i) => (!p2 ? t >= T.cubiertos[0] + (i * (T.cubiertos[1] - T.cubiertos[0])) / 8 : true);
  RESERVADO.visible = !p2 ? t >= T.reservado - 0.12 : t < T.q4;
  { const u = !p2 ? sg(t, T.reservado - 0.12, T.reservado) : 1; RESERVADO.position.y = M7.H + 0.012 + (1 - eo(u)) * 0.22; RESERVADO.scale.setScalar(!p2 ? 0.85 + 0.15 * bk(sg(t, T.reservado, T.reservado + 0.18)) : 1); }
  LUGAR.forEach((L, i) => {
    const vis = puesta(i), u = !p2 ? sg(t, T.cubiertos[0] + (i * (T.cubiertos[1] - T.cubiertos[0])) / 8, T.cubiertos[0] + (i * (T.cubiertos[1] - T.cubiertos[0])) / 8 + 0.15) : 1;
    L.g.visible = vis; L.g.scale.setScalar(0.6 + 0.4 * bk(u));
    // P6 / Q5: los cubiertos se van al puño de Fabián (de a uno); el tenedor del lugar 1 vuelve con "Dejá"
    const junta = (!p2 && t >= T.p6) || (p2 && t >= T.q5);
    const t0 = !p2 ? T.junta[0] : T.q5, t1 = !p2 ? T.junta[1] : T.q5 + 0.5;
    const ido = junta && t >= t0 + ((i % 4) * (t1 - t0)) / 4 && i < 4;
    L.ten.visible = L.cu.visible = !ido;
    if (i === 1 && junta) L.ten.visible = (!p2 ? t >= T.tenedor + 0.05 : t >= T.tenedor2 + 0.05);
    PLATO_USADO[i].visible = p2 && t >= T.q5;
  });
  VELA.visible = !(pa === "Q1");
  { const h = alturaVela(t), H = Math.max(0.012, VELA_ALTA * h); const cu = VELA_C.userData.cuerpo; cu.scale.set(1, H, 1); cu.position.y = H / 2; VELA_C.userData.mecha.position.y = H + 0.005;
    const prendida = (!p2 && t >= T.p4) || (p2 && t >= T.q4);
    LLAMA.visible = prendida; LLAMA.position.y = H + 0.006; const s = 0.9 + 0.12 * Math.sin(t * 13.1) + 0.06 * Math.sin(t * 29.7); LLAMA.scale.set(1, s, 1); LLAMA.rotation.z = Math.sin(t * 7.3) * 0.08;
    velaL.intensity = prendida ? (cerrando ? 0.9 : 0.5) : 0; velaL.position.set(VELA.position.x, VELA.position.y + 0.28 + H + 0.05, VELA.position.z); }
  COMIDA_Q4.visible = p2 && t >= T.q4 && t < T.q5;
  // las llamas, el humo y las chispas (deterministas)
  LLAMAS.forEach((l, i) => { const s = 0.75 + 0.25 * Math.sin(t * (9 + i * 1.7) + i * 2.1); l.scale.set(1, s, 1); l.position.y = l.userData.base.y + (s - 1) * 0.14; });
  HUMO.forEach((h, i) => { const f = ((t * 0.22 + i / HUMO.length) % 1 + 1) % 1; h.position.set(GRILL.x - 0.55 + i * 0.12 + Math.sin(t * 0.7 + i) * 0.06, GRILL.y + 0.3 + f * 1.0, GRILL.z - 0.25); h.material.opacity = 0.07 * Math.sin(Math.PI * f) * (oscuro ? 0.4 : cerrando ? 0.5 : 1); h.lookAt(camera.position); });
  CHISPAS.forEach((c, i) => { const f = ((t * 0.9 + i * 0.37) % 1 + 1) % 1; c.position.set(BRASERO.position.x - 0.1 + ((i * 0.13) % 0.25), 1.15 + f * 0.7, BRASERO.position.z + ((i * 0.07) % 0.12) - 0.05); c.visible = f < 0.8 && !oscuro; });
  // ---- personajes ----
  const living = pa === "Q2b", insert = pa === "P2" || pa === "Q1i" || pa === "Q2";
  raul.raiz.visible = !living && !oscuro; raul.poner(poseRaul(t));
  fabian.raiz.visible = !living && !oscuro && !(pa === "P1" || pa === "P3" || pa === "P3b" || pa === "P3c" || pa === "P5c" || pa === "Q3" || pa === "Q4b" || pa === "C");
  fabian.poner(poseFabian(t));
  walter.raiz.visible = pa === "P3" || pa === "P3b" || pa === "P3c" || living || pa === "Q4" || pa === "Q4b" || pa === "Q4c";
  if (pa === "P3c" && t > T.p3c + 1.15) walter.raiz.visible = false;
  if (walter.raiz.visible) walter.poner(poseWalter(t));
  FAM.forEach((e, i) => { const p = poseFam(i, t); e.raiz.visible = !!p.visible; if (pa === "P3c" && t > T.p3c + 1.2 + i * 0.06) e.raiz.visible = false; if (e.raiz.visible) e.poner(p); });
  // objetos en las manos
  PINZA.visible = !oscuro; PALA.visible = p2 && (pa === "Q3");
  // el celular de Raúl: en el hombro (P1), en la mano izquierda (P4, P6)
  celuR.visible = pa === "P1";
  if (pa === "P1") {
    // (r4) en altavoz, acostado sobre el mostrador a la derecha del cuaderno (antes flotaba en la oreja)
    celuR.position.set(MOS.x + 0.2, MOS.alto + 0.01, MOS.z + 0.08); celuR.rotation.set(-Math.PI / 2, 0, 0.35);
    celuR.scale.setScalar(1.5);
  } else if (celuR.visible) {
    const a = manoMundo(raul, "I", _a); celuR.position.copy(a).add(V3(0.0, 0.1, 0.03)); celuR.rotation.set(-0.7, 0.4, 0); celuR.scale.setScalar(1.15);
  }
  // la birome y el piolín (P1, P2, P6)
  if (!p2) {
    const u = t < T.p3 ? sg(t, T.escribe[0], T.escribe[1]) : 1;
    const escribiendo = t >= T.escribe[0] - 0.2 && t < T.p3;
    let tip;
    if (escribiendo) { tip = puntoCuad(lerp(0.05, 0.92, u)); tip.y += 0.004 + Math.abs(Math.sin(u * 60)) * 0.006; }
    else tip = puntoCuad(1.05, 6.4, 1).add(V3(0, 0.0, 0));
    BIROME.position.copy(tip);
    if (escribiendo) { BIROME.quaternion.setFromUnitVectors(V3(0, 1, 0), PEN_DIR); } else { BIROME.rotation.set(Math.PI / 2, 0, 0.6); BIROME.position.y = MOS.alto + 0.022; }
    BIROME.updateMatrixWorld(true);
    const fin = BIROME.localToWorld(V3(0, 0.145, 0));
    const ancla = CUADERNO.localToWorld(V3(0, 0.02, -CUAD.d / 2 + 0.02));
    ponerPiolin(fin, ancla);
  }
  BANDEJA.visible = (pa === "P4" && !p2) || pa === "Q4" || pa === "Q4c"; MESA_FG.visible = pa === "Q4" || pa === "Q4c";
  if (BANDEJA.visible) { fabian.raiz.updateMatrixWorld(true); const w = fabian.cuerpo.localToWorld(V3(-0.36, 0.2, 0.0)); BANDEJA.position.copy(w); const q = new THREE.Quaternion(); fabian.cuerpo.getWorldQuaternion(q); BANDEJA.quaternion.copy(q); BANDEJA.rotateY(Math.PI / 2); }
  SILLA_F.visible = pa === "P5";
  if (SILLA_F.visible) { fabian.raiz.updateMatrixWorld(true); const w = fabian.cuerpo.localToWorld(V3(0, -0.15, 0.48)); SILLA_F.position.copy(w); SILLA_F.rotation.set(0, fabian.raiz.rotation.y + Math.PI, 0); }
  MANOJO.visible = (pa === "P6" || pa === "P6b") || pa === "Q5";
  TEN_F.visible = (pa === "P6b" && t < T.tenedor) || (pa === "Q5" && t >= T.r8 - 0.2 && t < T.tenedor2);
  COPA_W.visible = pa === "Q4" || pa === "Q4b" || pa === "Q4c";
  if (COPA_W.visible) { walter.raiz.updateMatrixWorld(true); const w = walter.brazos[0].mano.localToWorld(V3(0, 0, 0)); COPA_W.position.set(w.x, w.y - 0.07, w.z); COPA_W.rotation.set(0, 0, 0); }
  celuW.visible = living;
  if (living) { const b = manoMundo(walter, "D", _b); celuW.position.copy(b).add(V3(0.0, 0.07, 0.035)); celuW.rotation.set(-0.55, 0, 0); }
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  const INS = { P2: INS_M, Q1i: INS_A, Q2: INS_T }[pa];
  for (const I of [INS_M, INS_A, INS_T]) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t);
    const k = sg(t, pl[1], pl[1] + 1.4), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
    for (const p of TODOS) p.raiz.visible = false;
    if (pa === "Q1i") ponerAgente(t); else ponerPanel(t);
  }
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- tarjetas ----
  for (const k in GL) GL[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const bR = () => bocaPx(raul), bF = () => bocaPx(fabian), bW = () => bocaPx(walter);
    if (pa === "P1") {
      if (t < T.r1) { const [x, y] = objPx(celuR); ponerGlobo(GL.p1, 540, 1540, ent(0), [x, y + 30]); }
      else { const [x, y] = bR(); ponerGlobo(GL.r1, 540, 1560, ent(T.r1), [x, y + 40]); }
    }
    if (pa === "P3") { const [x, y] = bW(); ponerGlobo(GL.w1, 700, 560, ent(T.w1), [x, y - 30]); }
    if (pa === "P3b") { const [x, y] = bR(); ponerGlobo(t < T.r2 + 0.7 ? GL.r2a : GL.r2, 540, 360, t < T.r2 + 0.7 ? ent(T.r2) : 1, [x, y - 40]); }
    if (pa === "P3c") { ponerGlobo(GL.rot9, 540, 1500, ent(T.rot9), null, 1); if (walter.raiz.visible) { const [ax, ay] = objPx(walter.cuerpo, V3(0, 0.3, 0)); ponerGuia(GUIAS[0], 640, 1420, ax, ay, eo(sg(t, T.rot9, T.rot9 + 0.2)) * (1 - sg(t, T.p3c + 0.85, T.p3c + 1.05))); } }
    if (pa === "P4") {
      if (t >= T.f1 && t < T.r3 - 0.04) { const [x, y] = bF(); ponerGlobo(GL.f1, 690, 380, ent(T.f1), [x, y - 30]); }
      if (t >= T.r3) { const [x, y] = bR(); ponerGlobo(GL.r3, 370, 340, ent(T.r3), [x, y - 40], 2); }
    }
    if (pa === "P5" && t >= T.f2) { const [x, y] = bF(); ponerGlobo(GL.f2, 760, 420, ent(T.f2), [x, y - 30]); }
    if (pa === "P5b" && t >= T.r4) { const [x, y] = bR(); ponerGlobo(GL.r4, 540, 360, ent(T.r4), [x, y - 40]); }
    if (pa === "P5c") {
      const [mx, my] = objPx(RESERVADO, V3(0, 0.09, 0)), [vx, vy] = enPantalla(V3(LUGAR[4].g.position.x, M7.H + 0.03, LUGAR[4].g.position.z));
      ponerGlobo(GL.rotA, 540, 300, ent(T.rotA), null, 1); ponerGuia(GUIAS[0], 540, 380, mx, my, eo(sg(t, T.rotA, T.rotA + 0.2)));
      ponerGlobo(GL.rotB, 540, 1560, ent(T.rotB), null, 1); ponerGuia(GUIAS[1], 640, 1480, vx, vy, eo(sg(t, T.rotB, T.rotB + 0.2)));
    }
    // parte 2
    if (pa === "Q1i") {
      if (t >= T.plano) { ponerPlano(t); ponerGlobo(GL.plano, 540, lerp(2330, 1490, eo(sg(t, T.plano, T.plano + 0.3))), 1, null, 1, true); }
    }
    if (pa === "Q1i") ponerGlobo(GL.rotQ1, 540, 320, ent(T.resp1 + 0.2), null, 2);
    if (pa === "Q1" && t >= T.nota) { ponerNotaQ1(t); ponerGlobo(GL.notaQ1, 540, 380, ent(T.nota), null, 1); }
    if (pa === "Q2" && t >= T.libera) ponerGlobo(GL.rotQ2, 540, 262, ent(T.libera + 0.05), null, 2);
    if (pa === "Q2b") { ponerAvisoW(t); ponerGlobo(GL.avisoW, 540, 450, ent(T.notiW), null, 1); if (t >= T.w2) { const [x, y] = bW(); ponerGlobo(GL.w2, 540, 845, ent(T.w2), [x, y - 30], 2); } }
    if (pa === "Q3") {
      ponerChatQ3(t); ponerGlobo(GL.chatQ3, 720, 1555, ent(T.q3 + 0.02), null, 1);
      if (t >= T.paraVos) ponerGlobo(GL.paraVos, 540, 330, ent(T.paraVos), null, 2);
      if (t >= T.r6) { const [x, y] = objPx(raul.cabeza, V3(0.05, 0.62, 0.1)); ponerGlobo(GL.r6, 560, 560, ent(T.r6), [x, y - 10], 3); }
    }
    if (pa === "Q4") {
      if (t >= T.f1b) { const [x, y] = bF(); ponerGlobo(GL.f1, 640, 330, ent(T.f1b), [x, y - 30]); }
    }
    if (pa === "Q4b" && t >= T.r7) { const [x, y] = bR(); ponerGlobo(GL.r7, 540, 360, ent(T.r7), [x, y - 40], 1); }
    if (pa === "Q4c") { ponerGlobo(GL.rotQ4a, 540, 1430, ent(T.rotQ4), null, 2); if (t >= T.rotQ4 + 0.15) ponerGlobo(GL.rotQ4b, 540, 1660, ent(T.rotQ4 + 0.15), null, 2); }
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { raul: bocaPx(raul), plano: planoActual }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
