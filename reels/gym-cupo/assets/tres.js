// Capa 3D de gym-cupo (Three.js r170 local). Base técnica: reels/pilates-cuota (globos pegados a la cámara en píxeles de
// pantalla, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom, insertos a pantalla completa). renderAt(t) es
// una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// UN lugar: la sala de spinning de "Estudio Mauro", de noche: pared del fondo navy oscuro con la franja diagonal crema y la
// tira de luz verde, piso de goma grafito, 14 bicis numeradas en tres filas (4 · 5 · 5) mirando a la tarima del profe,
// el reloj digital verde, la puerta de vidrio esmerilado, el ventilador de pie. El living de Majo (Q1) es un set chico aparte
// (x = 40). La recepción va en los insertos (la tablet sobre el mostrador, de fondo plano).
//   PARTE 1: el grupo que se llena de "yo voy" · "Veintidós «yo voy». Hoy explota." · el audio de Majo y "Llena" · 19:00
//            entran nueve · cinco bicis de perchero · "Los «yo voy» no pedalean." · 19:04 "Nico: ¿Ya empezó? Yo voy."
//   PARTE 2: el mapa con cupo real · "¿Quedan tres? ¡La siete!" · lista de espera · el recordatorio y "Liberar mi bici" ·
//            el aviso a la siguiente · 14 de 14 · la toalla de Graciela · el panel · "Comentá CUPO…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet, crearMochila, crearCamperaColgada } from "./personajes.js";
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


// ---------- luces: la sala de noche, los paneles del techo (luz pareja de arriba), relleno desde la tarima ----------
scene.background.set(0x0b1220);
scene.environmentIntensity = 0.35;
const techoL = new THREE.DirectionalLight(0xfff6ea, 1.25);
techoL.castShadow = true; techoL.shadow.mapSize.set(2048, 2048); techoL.shadow.bias = -0.0012; techoL.shadow.normalBias = 0.025; techoL.shadow.radius = 4;
Object.assign(techoL.shadow.camera, { left: -5, right: 5, top: 5.5, bottom: -5.5, near: 0.5, far: 16 }); techoL.shadow.camera.updateProjectionMatrix();
scene.add(techoL, techoL.target);
const cielo = new THREE.HemisphereLight(0xf4f1ea, 0x2a3040, 1.55); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xfff8ee, 0.65); relleno.position.set(0.5, 2.6, -6); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xdfe8ff, 0.4); rim.position.set(-2, 4, 6); scene.add(rim);
const caraL = new THREE.DirectionalLight(0xfff4e6, 0); scene.add(caraL, caraL.target);   // (r3 M4) luz de cara para el cierre
function ponerLuz(cx, cz) { techoL.position.set(cx + 1.2, 6.5, cz - 1.5); techoL.target.position.set(cx, 0, cz); techoL.target.updateMatrixWorld(); }

// =====================================================================================================
// LA SALA DE SPINNING
// =====================================================================================================
const C2 = { pared: 0x0b1220, lado: 0x16243d, piso: 0x3a3f4a, gris: 0xb9bec4, verdeApagado: 0x365f28 };
const SET = new THREE.Group(); scene.add(SET);
const XL = -3.4, XR = 3.4, ZF = -5.2, ZB = 3.2, HW = 3.2;     // paredes: izquierda (-x), derecha (+x), adelante (la tarima), fondo
const TAR = { x0: -1.4, x1: 1.4, z0: ZF, z1: -3.55, h: 0.2 };   // la tarima del profe
const PUERTA = { x: XL, z: 2.2, w: 0.95, h: 2.1 };              // la puerta de vidrio (pared -x)
// las 14 bicis: fila 1 (4, la más cerca de la tarima), fila 2 (5), fila 3 (5). Miran a la tarima (-z).
const FILAS_Z = [-1.8, -0.2, 1.4];
const BICIS_XZ = [
  ...[1.35, 0.45, -0.45, -1.35].map((x) => [x, FILAS_Z[0]]),
  ...[1.8, 0.9, 0, -0.9, -1.8].map((x) => [x, FILAS_Z[1]]),
  ...[1.8, 0.9, 0, -0.9, -1.8].map((x) => [x, FILAS_Z[2]]),
];
const PROFE = { x: 0, z: -4.35 };                               // la bici del profe en la tarima (mira a +z)
M.grafito = mat(C2.piso, 0.9); M.goma = mat(0x23262c, 0.85); M.gris = mat(C2.gris, 0.35, { metalness: 0.4 }); M.verdeA = mat(C2.verdeApagado, 0.7);
M.tira = new THREE.MeshBasicMaterial({ color: 0x5ce611 }); M.panel = new THREE.MeshBasicMaterial({ color: 0xf3f1e6 });
{
  // el piso de goma grafito con las juntas navy (baldosas de 1 m)
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#3a3f4a"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f2533"; x.fillRect(0, 0, w, 10); x.fillRect(0, 0, 10, h); });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(XR - XL, ZB - ZF);
  const piso = mesh(new THREE.PlaneGeometry(XR - XL, ZB - ZF), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.92 }), (XL + XR) / 2, 0, (ZF + ZB) / 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  // paredes: adelante y fondo navy oscuro, los costados navy2
  const pared = (w, x, z, ry, m) => { const p = mesh(new THREE.PlaneGeometry(w, HW), m, x, HW / 2, z); p.rotation.y = ry; p.castShadow = false; SET.add(p); return p; };
  pared(XR - XL, 0, ZF, 0, mat(C2.pared, 0.85)); pared(XR - XL, 0, ZB, Math.PI, mat(C2.pared, 0.85));
  pared(ZB - ZF, XL, (ZF + ZB) / 2, Math.PI / 2, mat(C2.lado, 0.85)); pared(ZB - ZF, XR, (ZF + ZB) / 2, -Math.PI / 2, mat(C2.lado, 0.85));
  // el techo navy3 con dos paneles de luz crema planos
  const te = mesh(new THREE.PlaneGeometry(XR - XL, ZB - ZF), new THREE.MeshBasicMaterial({ color: 0x1f3254 }), 0, HW, (ZF + ZB) / 2); te.rotation.x = Math.PI / 2; te.castShadow = false; SET.add(te);
  for (const z of [-2.6, 0.6]) { const p = mesh(new THREE.PlaneGeometry(2.4, 1.0), M.panel, 0, HW - 0.01, z); p.rotation.x = Math.PI / 2; p.castShadow = false; SET.add(p); }
  // la franja diagonal crema (60 cm) en la pared de adelante y en la del fondo: cruza de abajo a la izquierda hacia arriba a
  // la derecha; se recorta con las paredes de los costados
  const franja = (z, s) => { const f = mesh(new THREE.PlaneGeometry(9, 0.6), mat(0xefeee5, 0.85), 0, 1.35, z); f.rotation.set(0, s > 0 ? 0 : Math.PI, s * 0.42); f.castShadow = false; f.receiveShadow = true; SET.add(f); };
  franja(ZF + 0.006, 1); franja(ZB - 0.006, -1);
  // la tira de luz verde plana arriba de las cuatro paredes (un prisma emisivo de 6 cm)
  for (const [w, x, z, ry] of [[XR - XL, 0, ZF + 0.04, 0], [XR - XL, 0, ZB - 0.04, 0], [ZB - ZF, XL + 0.04, (ZF + ZB) / 2, Math.PI / 2], [ZB - ZF, XR - 0.04, (ZF + ZB) / 2, Math.PI / 2]]) { const b = mesh(new THREE.BoxGeometry(w, 0.06, 0.06), M.tira, x, HW - 0.16, z); b.rotation.y = ry; b.castShadow = false; SET.add(b); }
  // el zócalo navy3
  for (const [w, x, z, ry] of [[XR - XL, 0, ZF + 0.02, 0], [XR - XL, 0, ZB - 0.02, 0], [ZB - ZF, XL + 0.02, (ZF + ZB) / 2, Math.PI / 2], [ZB - ZF, XR - 0.02, (ZF + ZB) / 2, Math.PI / 2]]) { const b = caja(w, 0.1, 0.03, M.navy3, x, 0.05, z, 0.01); b.rotation.y = ry; SET.add(b); }
  // la tarima del profe (crema, borde navy)
  SET.add(caja(TAR.x1 - TAR.x0, TAR.h, TAR.z1 - TAR.z0, M.cr, (TAR.x0 + TAR.x1) / 2, TAR.h / 2, (TAR.z0 + TAR.z1) / 2, 0.02));
  SET.add(caja(TAR.x1 - TAR.x0 + 0.02, 0.05, 0.05, M.navy, (TAR.x0 + TAR.x1) / 2, TAR.h - 0.02, TAR.z1 + 0.005, 0.01));
  // el cartel ESTUDIO MAURO en la pared de adelante (Lexend 900 crema sobre una franja navy2 con borde verde)
  // (r1) en dos renglones y más angosto: en los primeros planos se leía "STUDIO" cortado
  const cartelT = lienzo(900, 560, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#5ce611"; x.fillRect(0, h - 26, w, 26); x.fillStyle = "#efeee5"; x.font = F(900, 210); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ESTUDIO", w / 2, 150); x.fillText("MAURO", w / 2, 370); });
  // (r2) sin cartel: en los primeros planos quedaba cortado ("ESTUDIC") o tapado por la cabeza
  // un estante con el parlante (pared de adelante, a la derecha del cartel)
  SET.add(caja(0.7, 0.04, 0.3, M.navy3, 2.45, 1.55, ZF + 0.15, 0.01));
}
fusionar(SET);
// el parlante (caja navy con dos conos y la perilla verde que gira en P5)
const PARLANTE = new THREE.Group(); PARLANTE.position.set(2.45, 1.57, ZF + 0.16); scene.add(PARLANTE);
{ PARLANTE.add(caja(0.34, 0.5, 0.26, mat(0x111827, 0.6), 0, 0.25, 0, 0.03));
  for (const [y, r] of [[0.33, 0.085], [0.14, 0.06]]) { const c = mesh(new THREE.CylinderGeometry(r, r * 0.8, 0.03, 24).rotateX(Math.PI / 2), M.navy3, 0, y, 0.135); PARLANTE.add(c); PARLANTE.add(mesh(new THREE.CylinderGeometry(r * 0.3, r * 0.3, 0.035, 16).rotateX(Math.PI / 2), M.gris, 0, y, 0.14)); }
  sombras(PARLANTE); }
// el reloj digital de la pared del fondo (caja navy, dígitos verdes de 7 segmentos)
const relojT = lienzo(640, 240, () => {});
function dibujarReloj(x, W, H, hh, mm) {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, H);
  const seg = { 0: "abcdef", 1: "bc", 2: "abged", 3: "abgcd", 4: "fgbc", 5: "afgcd", 6: "afgedc", 7: "abc", 8: "abcdefg", 9: "abcdfg" };
  const dig = (d, ox) => {
    const w = 110, h = 190, t = 22, y0 = 25;
    const S2 = { a: [ox + t, y0, w - 2 * t, t], b: [ox + w - t, y0 + t, t, h / 2 - t * 1.5], c: [ox + w - t, y0 + h / 2 + t / 2, t, h / 2 - t * 1.5], d: [ox + t, y0 + h - t, w - 2 * t, t], e: [ox, y0 + h / 2 + t / 2, t, h / 2 - t * 1.5], f: [ox, y0 + t, t, h / 2 - t * 1.5], g: [ox + t, y0 + h / 2 - t / 2, w - 2 * t, t] };
    for (const k of "abcdefg") { x.fillStyle = seg[d].includes(k) ? "#5ce611" : "#16243d"; const [a, b, c, e] = S2[k]; x.fillRect(a, b, c, e); }
  };
  const s = String(hh).padStart(2, "0") + String(mm).padStart(2, "0");
  dig(+s[0], 40); dig(+s[1], 170); dig(+s[2], 350); dig(+s[3], 480);
  x.fillStyle = "#5ce611"; x.fillRect(306, 80, 24, 24); x.fillRect(306, 150, 24, 24);
}
const RELOJ = new THREE.Group(); RELOJ.position.set(0.15, 2.3, ZB - 0.05); RELOJ.rotation.y = Math.PI; scene.add(RELOJ);
{ RELOJ.add(caja(1.25, 0.52, 0.08, M.navy3, 0, 0, -0.03, 0.02)); RELOJ.add(plano(1.12, 0.42, relojT, 0, 0, 0.012, true)); }
let cReloj = "";
function ponerReloj(hh, mm) { const k = `${hh}:${mm}`; if (k === cReloj) return; cReloj = k; dibujarReloj(relojT.userData.x, 640, 240, hh, mm); relojT.needsUpdate = true; }
// la puerta de vidrio esmerilado crema con la manija verde (gira hacia adentro sobre la bisagra del lado del fondo)
const PUERTA_G = new THREE.Group(); PUERTA_G.position.set(PUERTA.x + 0.03, 0, PUERTA.z + PUERTA.w / 2); scene.add(PUERTA_G);
{ const hoja = new THREE.Group(); hoja.name = "hoja"; PUERTA_G.add(hoja);
  hoja.add(caja(0.05, PUERTA.h, PUERTA.w, M.navy3, 0, PUERTA.h / 2, -PUERTA.w / 2, 0.01));
  hoja.add(caja(0.056, PUERTA.h - 0.16, PUERTA.w - 0.16, mat(0xe9e6da, 0.35), 0, PUERTA.h / 2, -PUERTA.w / 2, 0.01));
  hoja.add(caja(0.12, 0.05, 0.3, M.g, 0.06, 1.05, -PUERTA.w + 0.2, 0.015));
  const marco = caja(0.08, PUERTA.h + 0.1, PUERTA.w + 0.16, M.navy, -0.02, (PUERTA.h + 0.1) / 2, -PUERTA.w / 2, 0.01); marco.scale.x = 0.5; PUERTA_G.add(marco);
  sombras(PUERTA_G); }
const puertaAbre = (u) => { PUERTA_G.getObjectByName("hoja").rotation.y = -1.35 * u; };
// el ventilador de pie (navy con aspas crema; giran con el tiempo)
const VENT = new THREE.Group(); VENT.position.set(2.85, 0, -2.9); VENT.rotation.y = -2.3; scene.add(VENT);
const ASPAS = new THREE.Group();
{ VENT.add(mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.05, 24), M.navy, 0, 0.025, 0)); VENT.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.25, 10), M.navy3, 0, 0.65, 0));
  const cab = new THREE.Group(); cab.position.set(0, 1.35, 0); VENT.add(cab);
  cab.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 16).rotateX(Math.PI / 2), M.navy, 0, 0, -0.1));
  for (const z of [0.0, 0.08]) cab.add(mesh(new THREE.TorusGeometry(0.3, 0.012, 6, 36), M.navy3, 0, 0, z));
  for (let i = 0; i < 4; i++) { const r = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.6, 5), M.navy3, 0, 0, 0.04); r.rotation.z = (i * Math.PI) / 4; cab.add(r); }
  ASPAS.position.z = 0.04; cab.add(ASPAS);
  for (let i = 0; i < 3; i++) { const a = mesh(new THREE.SphereGeometry(1, 16, 8), M.cr, 0, 0, 0); a.scale.set(0.09, 0.22, 0.02); a.position.set(Math.sin((i * 2 * Math.PI) / 3) * 0.15, Math.cos((i * 2 * Math.PI) / 3) * 0.15, 0); a.rotation.z = -(i * 2 * Math.PI) / 3; ASPAS.add(a); }
  ASPAS.add(mesh(new THREE.SphereGeometry(0.05, 14, 10), M.g, 0, 0, 0.01));
  sombras(VENT); }

// =====================================================================================================
// LA BICI DE SPINNING: cuadro navy3 en "lambda" (tubo grueso en diagonal + base en T con pies redondeados crema), volante
// gris adelante con protector navy, bielas y pedales (giran), asiento crema, manubrio en "cuernos" negro-navy con la perilla
// verde, portabotella y la plaquita crema con el número. Origen en el piso bajo el asiento; mira a +z.
// =====================================================================================================
const BICI = { asiento: 0.8, eje: [0.44, 0.22], biela: 0.12, manubrio: [0.99, 0.5], volante: [0.36, 0.66, 0.21] };
const tubo = (a, b, r, m) => { const g = new THREE.CylinderGeometry(r, r, 1, 14); const o = new THREE.Mesh(g, m); entre(o, V3(...a), V3(...b), 1); o.scale.set(1, a.length && V3(...a).distanceTo(V3(...b)), 1); o.castShadow = true; o.receiveShadow = true; return o; };
const _cA = new THREE.Vector3(), _cB = new THREE.Vector3(), _ejeY = new THREE.Vector3(0, 1, 0);
function entre(m, a, b) { const d = _cB.copy(b).sub(a); m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(_ejeY, d.normalize()); }
const NUM_T = {};
function crearBici(num, profe = false) {
  const g = new THREE.Group(), fijo = new THREE.Group(); g.add(fijo);
  const mc = M.navy3, mn = mat(0x151b27, 0.45);
  const J = [0, 0.46, -0.04];
  // la base en T: dos pies transversales con tapas crema
  for (const z of [-0.44, 0.74]) { fijo.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.56, 14).rotateZ(Math.PI / 2), mc, 0, 0.05, z)); for (const s of [-1, 1]) fijo.add(mesh(new THREE.SphereGeometry(0.038, 14, 10), M.cr2, s * 0.28, 0.045, z)); }
  fijo.add(tubo([0, 0.06, -0.42], J, 0.03, mc));
  fijo.add(tubo(J, [0, 0.07, 0.72], 0.05, mc));                                         // el tubo grueso (lambda)
  fijo.add(tubo([0, 0.26, 0.47], [0, 0.93, 0.5], 0.032, mc));                           // poste del manubrio
  fijo.add(tubo([0, 0.43, -0.03], [0, 0.76, -0.03], 0.024, mc));                        // poste del asiento
  fijo.add(caja(0.17, 0.06, 0.27, M.cr, 0, BICI.asiento - 0.02, 0.0, 0.03));           // el asiento crema
  fijo.add(caja(0.1, 0.04, 0.12, M.cr, 0, BICI.asiento - 0.025, 0.12, 0.02));          // la punta del asiento
  // el manubrio en cuernos: barra transversal, dos cuernos hacia adelante y arriba, puños
  const [my, mz] = BICI.manubrio;
  fijo.add(tubo([-0.22, my, mz], [0.22, my, mz], 0.017, mn));
  for (const s of [-1, 1]) { fijo.add(tubo([s * 0.22, my, mz], [s * 0.16, my + 0.07, mz + 0.2], 0.017, mn)); fijo.add(mesh(new THREE.SphereGeometry(0.02, 10, 8), mn, s * 0.16, my + 0.07, mz + 0.2)); }
  fijo.add(tubo([0, 0.93, 0.5], [0, my, mz], 0.025, mc));
  // la perilla de resistencia verde en el tubo, el portabotella navy
  fijo.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.05, 16), M.g, 0, 0.64, 0.33).rotateX(-0.5));
  fijo.add(caja(0.06, 0.12, 0.05, M.navy, 0, 0.52, 0.36, 0.01));
  // el volante de inercia gris y su protector navy (medio disco arriba, a los dos lados)
  const [vy, vz, vr] = BICI.volante;
  const volante = new THREE.Group(); volante.position.set(0, vy, vz); g.add(volante);
  volante.add(mesh(new THREE.CylinderGeometry(vr, vr, 0.05, 32).rotateZ(Math.PI / 2), M.gris));
  volante.add(caja(0.056, 0.05, vr * 1.6, M.navy3, 0, 0, 0, 0.01));                     // un rayo (se ve girar)
  for (const s of [-1, 1]) { const pr = mesh(new THREE.CylinderGeometry(vr + 0.025, vr + 0.025, 0.012, 32, 1, false, 0, Math.PI).rotateZ(Math.PI / 2), M.navy3, s * 0.04, vy, vz); pr.rotation.x = Math.PI / 2; fijo.add(pr); }
  // bielas y pedales (giran alrededor del eje)
  const [ey, ez] = BICI.eje;
  fijo.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 18).rotateZ(Math.PI / 2), mc, 0, ey, ez));
  fijo.add(tubo([0, ey, ez], [0, vy, vz], 0.012, mn));                                  // la correa
  const bielas = new THREE.Group(); bielas.position.set(0, ey, ez); g.add(bielas);
  const pedales = [];
  for (const s of [-1, 1]) {
    const b = new THREE.Group(); bielas.add(b); b.rotation.x = s > 0 ? 0 : Math.PI;
    b.add(caja(0.02, BICI.biela + 0.03, 0.03, mn, s * 0.075, -BICI.biela / 2, 0, 0.008));
    const p = new THREE.Group(); p.position.set(s * 0.12, -BICI.biela, 0); b.add(p);
    p.add(caja(0.09, 0.02, 0.06, mn, s * 0.02, 0, 0, 0.006)); pedales.push(p);
  }
  // la plaquita con el número (al frente del poste del manubrio)
  if (!profe) {
    const tx = NUM_T[num] ??= lienzo(220, 170, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.font = F(900, 150); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(String(num), w / 2, h / 2 + 8); });
    const pl = new THREE.Group(); pl.position.set(0, 0.8, 0.56); pl.rotation.x = -0.08; fijo.add(pl);
    pl.add(caja(0.2, 0.16, 0.02, M.navy, 0, 0, -0.008, 0.01));
    pl.add(plano(0.185, 0.143, tx, 0, 0, 0.004, true));
    const at = plano(0.185, 0.143, tx, 0, 0, -0.02, true); at.rotation.y = Math.PI; pl.add(at);   // el número también del lado del que pedalea
  } else {
    // el soporte del celular en el centro del manubrio (mira al profe)
    fijo.add(caja(0.12, 0.02, 0.05, mn, 0, my + 0.02, mz - 0.03, 0.006));
    fijo.add(caja(0.02, 0.14, 0.02, mn, -0.05, my + 0.08, mz - 0.03, 0.005)); fijo.add(caja(0.02, 0.14, 0.02, mn, 0.05, my + 0.08, mz - 0.03, 0.005));
  }
  sombras(g);
  fusionar(fijo);
  g.userData = { volante, bielas, pedales, num };
  return g;
}
// gira volante y bielas; fase en radianes
function ponerBici(b, fase) { b.userData.bielas.rotation.x = fase; b.userData.volante.rotation.x = fase * 2.6; }
// dónde está el pedal (lado I = +x del ciclista) en el espacio de la bici: [z, y]
function pedalEn(fase, lado) { const a = fase + (lado === "I" ? 0 : Math.PI); return [BICI.eje[1] - Math.sin(a) * BICI.biela, BICI.eje[0] - Math.cos(a) * BICI.biela]; }
const BICIS = BICIS_XZ.map(([x, z], i) => { const b = crearBici(i + 1); b.position.set(x, 0, z); b.rotation.y = Math.PI; scene.add(b); return b; });
const BICI_P = crearBici(0, true); BICI_P.position.set(PROFE.x, TAR.h, PROFE.z); scene.add(BICI_P);
const biciN = (n) => BICIS[n - 1];
// un punto en el espacio de una bici, al mundo
const enBici = (b, x, y, z) => { b.updateMatrixWorld(true); return b.localToWorld(V3(x, y, z)); };
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
const _v = new THREE.Vector3(), _v2 = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(V3(0, 0.181, 0.3))); };
const objPx = (o, local = V3(0, 0, 0)) => { o.updateMatrixWorld(true); return enPantalla(o.localToWorld(local.clone())); };
// (r4) REGLA DE BURBUJAS (todas): la burbuja va arriba del que habla, con su borde de abajo ~100 px sobre la coronilla
// (≥ 40 px de aire) y la cola termina en el pelo, nunca en la cara. Si no entra (o el que habla queda cortado por el
// borde), se anota en AVISOS (prev.mjs lo imprime): ahí hay que abrir la cámara de ese plano.
const AVISOS = [];
const Q3_DX = [0, -40], Q3_LY = 1330;
const coronillaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(V3(0, 0.6, 0))); };
function hablar(g, per, s, orden = 1, dx = 0, minArriba = 260) {
  const [hx, hy] = coronillaPx(per), [mx, my] = bocaPx(per);
  const { W: Wg, H } = g.userData;
  const cy = hy - 100 - H / 2;
  if (cy - H / 2 < minArriba - 10) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  if (mx < 70 || mx > 1010 || hy < 0 || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, Math.max(cy, H / 2 + minArriba), s, [hx, hy + 6], orden);
}

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const mauro = crearPersonaje({ ...ELENCO.mauro, peinado: "corto", cortoMechas: true, franja: null, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.3), r2(T.p5c + 0.6)] });
// Graciela, versión gimnasio: la misma cara, rulos lila y lentes; remera crema de manga larga, calza navy, zapatillas crema
const graciela = crearPersonaje({ ...ELENCO.clienta, lentes: null,   // (r2) sin lentes: los aros del rig se rompían de 3/4
  camisa: MARCA.cr, cuello: MARCA.cr2, cuelloFino: true, cuelloBotones: false, pollera: null, pantalon: MARCA.navy, zapatos: MARCA.cr, aros: null, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q3b + 1.5)] });
const majo = crearPersonaje({ ...ELENCO.majo, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const sole = crearPersonaje({ ...ELENCO.sole, parpadeoCada: 999 });
// la franja verde de marca en el pecho de Mauro: una banda chata solo adelante (no el aro de personajes.js)
{ const f = mesh(new THREE.TorusGeometry(0.222, 0.011, 6, 40, Math.PI * 0.9), mat(MARCA.g, 0.5), 0, 0.33, 0); f.rotation.set(Math.PI / 2, 0, Math.PI * 0.05); f.scale.set(1, 0.875, 2.6); f.castShadow = false; mauro.cuerpo.add(f); }
// la vincha de tela verde de Graciela (un aro ancho apoyado arriba de la frente, por debajo de los rulos de arriba)
{ const v = mesh(new THREE.TorusGeometry(0.29, 0.03, 10, 40), mat(MARCA.g, 0.8), 0, 0.33, -0.015); v.rotation.x = Math.PI / 2 - 0.42; v.scale.set(1.04, 1.06, 0.62); v.castShadow = false; graciela.cabeza.add(v); }
// los alumnos de relleno (sin voz): A-H en la parte 1 (3, 5, 6, 8, 9, 10, 12, 14); I-K se suman en la parte 2 (2, 11, 13)
const ROPA = { cr: MARCA.cr, navyC: 0x2c4268, verdeA: 0x365f28, navy3: MARCA.navy3, celeste: 0xb9cde0, cr2: MARCA.cr2 };
const RELLENO = [
  { nombre: "A", piel: PIEL.media, pelo: PELO.castaño, peinado: "coleta", cejasColor: 0x4a3222, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xa8484f, camisa: ROPA.navyC, mangas: "cortas", pantalon: MARCA.navy, alto: 0.95 },
  { nombre: "B", piel: PIEL.morena, pelo: PELO.negro, peinado: "texturado", texturaAlto: 0.5, cejasColor: 0x1e1a18, camisa: ROPA.cr, mangas: "cortas", pantalon: MARCA.navy2, alto: 1.02 },
  { nombre: "C", piel: PIEL.clara, pelo: PELO.rubio, peinado: "mediaCola", cejasColor: 0x8a6a40, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xb5555a, camisa: ROPA.verdeA, mangas: "cortas", pantalon: MARCA.navy, alto: 0.96 },
  { nombre: "D", piel: PIEL.trigueña, pelo: 0x3b2a22, peinado: "corto", cejasColor: 0x2a2220, barba: 0x2a2220, barbaLarga: 0.3, barbaOpacidad: 0.4, camisa: ROPA.navy3, mangas: "cortas", pantalon: 0x3a3f4a, alto: 1.03 },
  { nombre: "E", piel: PIEL.clara, pelo: PELO.canoso, peinado: "corto", cejasColor: 0xb9b6b0, camisa: ROPA.celeste, mangas: "cortas", pantalon: MARCA.navy2, alto: 1.0 },
  { nombre: "F", piel: PIEL.morena, pelo: PELO.negro, peinado: "coletaAlta", sinFlequillo: true, cejasColor: 0x1e1a18, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0x8e3f3c, camisa: ROPA.cr, mangas: "cortas", pantalon: MARCA.navy, alto: 0.95 },
  { nombre: "G", piel: PIEL.media, pelo: PELO.castaño, peinado: "texturado", texturaAlto: 0.8, cejasColor: 0x4a3222, camisa: ROPA.verdeA, mangas: "cortas", pantalon: MARCA.navy, alto: 1.0 },
  { nombre: "H", piel: PIEL.trigueña, pelo: 0x6b4429, peinado: "melena", cejasColor: 0x4a3222, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xa8484f, camisa: ROPA.navyC, mangas: "cortas", pantalon: MARCA.navy2, alto: 0.95 },
  { nombre: "I", piel: PIEL.clara, pelo: PELO.negro, peinado: "texturado", texturaAlto: 0.4, cejasColor: 0x2a2220, camisa: ROPA.navy3, mangas: "cortas", pantalon: MARCA.navy, alto: 1.0 },   // (r1) varón: con rodete se confundía con Sole
  { nombre: "J", piel: PIEL.media, pelo: PELO.gris, peinado: "pelado", cejasColor: 0x5a5550, camisa: ROPA.cr2, mangas: "cortas", pantalon: MARCA.navy2, alto: 1.02 },
  { nombre: "K", piel: PIEL.morena, pelo: PELO.negro, peinado: "rulos", cejasColor: 0x1e1a18, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0x8e3f3c, camisa: ROPA.verdeA, mangas: "cortas", pantalon: MARCA.navy, alto: 0.96 },
].map((c) => crearPersonaje({ ...DEFECTO, cuelloFino: true, cuelloBotones: false, cuelloAlto: 0.05, zapatos: MARCA.cr, nariz: 0.05, ...c, parpadeoCada: 999 }));
const TODOS = [mauro, graciela, majo, sole, ...RELLENO];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// quién va en qué bici: parte 1 (los nueve que vinieron) y parte 2 (las catorce)
const EN_BICI_1 = [[graciela, 1], [RELLENO[0], 3], [RELLENO[1], 5], [RELLENO[2], 6], [RELLENO[3], 8], [RELLENO[4], 11], [RELLENO[5], 10], [RELLENO[6], 12], [RELLENO[7], 14]];
const EN_BICI_2 = [...EN_BICI_1, [sole, 4], [majo, 7], [RELLENO[8], 2], [RELLENO[9], 9], [RELLENO[10], 13]];
const VACIAS_1 = [2, 4, 7, 9, 13];   // (r2) la 9 en vez de la 11: se ve en el plano abierto

// =====================================================================================================
// UTILERÍA
// =====================================================================================================
// (r2) LAS TOALLAS DE TELA: una cinta fina y ondulada que sigue una curva (Catmull-Rom), verde de marca con dos franjas
// crema y flecos en las puntas; doble cara. pts en el espacio del padre; dir: hacia dónde va el ancho (si no, se calcula
// como tangente × radial, para la que rodea el cuello)
function crearCinta(pts, ancho, { dir = null, n = 44, m = 7, onda = 0.01, franjas = [0.1, 0.9] } = {}) {
  const cu = new THREE.CatmullRomCurve3(pts.map((p) => V3(...p)));
  const pos = [], col = [], idx = [], cG = new THREE.Color(MARCA.g), cC = new THREE.Color(0xf3f1e8);
  for (let i = 0; i <= n; i++) {
    const u = i / n, P = cu.getPoint(u), Tg = cu.getTangent(u);
    let W; if (dir) W = V3(...dir).normalize(); else { const N = V3(P.x, 0, P.z).normalize(); W = Tg.clone().cross(N).normalize(); }
    const Nn = Tg.clone().cross(W).normalize();
    const raya = franjas.some((f) => Math.abs(u - f) < 0.025);
    for (let j = 0; j <= m; j++) {
      const v = j / m - 0.5, q = P.clone().addScaledVector(W, v * ancho).addScaledVector(Nn, onda * Math.sin(v * Math.PI * 3 + u * 9));
      pos.push(q.x, q.y, q.z); const c = raya ? cC : cG; col.push(c.r, c.g, c.b);
    }
  }
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { const a = i * (m + 1) + j, b = a + m + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3)); geo.setIndex(idx); geo.computeVertexNormals();
  const g = new THREE.Group(); const tela = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, side: THREE.DoubleSide })); tela.castShadow = true; g.add(tela);
  // flecos crema en las dos puntas
  const fm = mat(0xf3f1e8, 0.9);
  for (const u of [0, 1]) { const P = cu.getPoint(u), Tg = cu.getTangent(u).multiplyScalar(u ? 1 : -1); const W = dir ? V3(...dir).normalize() : Tg.clone().cross(V3(P.x, 0, P.z).normalize()).normalize();
    for (let j = 0; j < 6; j++) { const f = mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.03, 4), fm); f.position.copy(P).addScaledVector(W, (j / 5 - 0.5) * ancho * 0.9).addScaledVector(Tg, 0.014); f.quaternion.setFromUnitVectors(V3(0, 1, 0), Tg); g.add(f); } }
  return g;
}
// colgada del manubrio (espacio de la bici, origen en la barra): cae asimétrica, la punta de adelante más larga
const crearToallaColgada = () => crearCinta([[0.04, -0.4, 0.06], [0.02, -0.22, 0.05], [0, -0.06, 0.04], [0, 0.03, 0.0], [0, -0.04, -0.04], [-0.03, -0.17, -0.06], [-0.06, -0.26, -0.03]], 0.4, { dir: [1, 0, 0.12], onda: 0.014 });
// al cuello (espacio del cuerpo): las dos puntas sobre el pecho y la vuelta por atrás del cuello
const crearToallaCuello = (k = 1) => { const g = crearCinta([[0.1, 0.26, 0.225], [0.11, 0.4, 0.2], [0.135, 0.51, 0.06], [0.07, 0.56, -0.1], [-0.07, 0.56, -0.1], [-0.135, 0.51, 0.06], [-0.11, 0.4, 0.2], [-0.095, 0.29, 0.225]], 0.11, { onda: 0.006, franjas: [0.12, 0.88] }); g.scale.setScalar(k); return g; };
// en la mano (espacio de la mano): doblada al medio, cae
const crearToallaMano = () => crearCinta([[0.0, -0.32, 0.03], [0.01, -0.15, 0.025], [0, 0.0, 0.0], [-0.01, -0.12, -0.03], [0.0, -0.28, -0.04]], 0.16, { dir: [1, 0, 0], onda: 0.01 });
const TOALLA_2 = crearToallaColgada(); scene.add(TOALLA_2);          // la de Graciela en la bici 2 (parte 1)
const TOALLA_G_MANO = crearToallaMano(); scene.add(TOALLA_G_MANO);    // Graciela en Q3
const TOALLA_SUBE = 0.15;
const TOALLA_G_CUELLO = crearToallaCuello(1.05); graciela.cuerpo.add(TOALLA_G_CUELLO);
const TOALLA_M_CUELLO = crearToallaCuello(1.0); mauro.cuerpo.add(TOALLA_M_CUELLO);
// la botella de agua verde apagado (bici 4), el celular (bici 7), la campera navy2 (bici 11), la mochila (bici 13)
const BOTELLA = new THREE.Group(); { BOTELLA.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.21, 18), mat(0xf3f1e8, 0.45), 0, 0.105, 0)); BOTELLA.add(mesh(new THREE.CylinderGeometry(0.026, 0.034, 0.045, 14), M.g, 0, 0.23, 0)); BOTELLA.add(mesh(new THREE.CylinderGeometry(0.041, 0.041, 0.05, 18), M.g, 0, 0.1, 0)); scene.add(sombras(BOTELLA)); }
const celPerT = lienzo(200, 400, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 70); x.font = F(900, 64); x.textAlign = "center"; x.fillText("19:00", w / 2, 200); });
const CEL_7 = crearCelular(celPerT, MARCA.g, 0.08, 0.162); CEL_7.scale.setScalar(1.25); scene.add(CEL_7);
const CAMPERA = crearCamperaColgada({ color: MARCA.cr2, cuello: MARCA.navy3, cierre: MARCA.g }); CAMPERA.scale.setScalar(0.62); scene.add(CAMPERA);
const MOCHILA = crearMochila(MARCA.g, MARCA.navy); scene.add(MOCHILA);
const PERCHEROS = [TOALLA_2, BOTELLA, CEL_7, CAMPERA, MOCHILA];
// dónde termina cada perchero, en el espacio de su bici: [bici, x, y, z, rx, ry, rz]
const PERCH_FIN = [[2, 0, BICI.manubrio[0], BICI.manubrio[1], 0, 0, 0], [4, 0, BICI.asiento + 0.01, 0.02, 0, 0, 0], [7, 0, BICI.manubrio[0] + 0.02, BICI.manubrio[1] - 0.02, -1.25, 0, 0], [9, -0.1, BICI.manubrio[0], BICI.manubrio[1], 0, Math.PI / 2, 0], [13, 0, BICI.asiento + 0.2, -0.02, -0.12, 0, 0]];
// de quién sale cada perchero (el vecino que lo tira): [personaje, lado de la mano]
const PERCH_DE = [[graciela, "I"], [RELLENO[0], "I"], [RELLENO[2], "I"], [RELLENO[3], "I"], [RELLENO[6], "I"]];
// el celular de Mauro (funda navy2): en la mano (P1) y en el soporte del manubrio (P5); pantalla 420 x 860
const celMT = lienzo(420, 860, () => {});
const CEL_M = crearCelular(celMT, MARCA.g, 0.08, 0.162); CEL_M.scale.setScalar(1.2); scene.add(CEL_M);   // (r2) funda verde: se ve en la mano
// el celular de Majo (funda verde apagado) en el living (Q1b)
const celJT = lienzo(420, 860, () => {});
const CEL_J = crearCelular(celJT, MARCA.navy2, 0.08, 0.162);   // (r3 M5) funda navy: verde sobre la remera verde no se veía CEL_J.scale.setScalar(1.2); scene.add(CEL_J);

// =====================================================================================================
// EL LIVING DE MAJO (Q1, set chico aparte en x = 40): pared crema lisa, sofá navy2 con almohadón verde apagado, lámpara
// de pie con pantalla crema, la mochila de gimnasio en el piso, luz de noche crema plana
// =====================================================================================================
const LIV = new THREE.Group(); LIV.position.set(40, 0, 0); scene.add(LIV);
const SOFA = { x: 40, z: -0.5, alto: 0.44 };
{
  const p = mesh(new THREE.PlaneGeometry(8, 6), mat(0x9a8a70, 0.9), 0, 0, 0.5); p.rotation.x = -Math.PI / 2; p.castShadow = false; LIV.add(p);
  LIV.add(mesh(new THREE.BoxGeometry(8, 3.2, 0.2), mat(0xe6e1cf, 0.92), 0, 1.6, -1.25));
  LIV.add(caja(8, 0.1, 0.03, mat(0xd9d2bb, 0.9), 0, 0.05, -1.14, 0.01));
  const so = new THREE.Group(); so.position.set(0, 0, -0.62); LIV.add(so); const ms = mat(0x16243d, 0.85), ms2 = mat(0x1f3254, 0.85);
  so.add(caja(2.0, 0.4, 0.85, ms, 0, 0.2, 0, 0.06)); so.add(caja(2.0, 0.55, 0.22, ms, 0, 0.62, -0.32, 0.08));
  for (const s of [-1, 1]) so.add(caja(0.2, 0.62, 0.85, ms, s * 1.0, 0.31, 0, 0.08));
  for (const s of [-1, 1]) so.add(caja(0.86, 0.13, 0.62, ms2, s * 0.44, 0.44, 0.06, 0.05));
  const al = caja(0.42, 0.38, 0.12, mat(0x365f28, 0.9), -0.62, 0.66, -0.16, 0.06); al.rotation.set(-0.2, 0.25, 0.1); so.add(al);
  // la lámpara de pie (base navy, pantalla crema)
  const la = new THREE.Group(); la.position.set(1.35, 0, -0.85); LIV.add(la);
  la.add(mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.04, 20), M.navy, 0, 0.02, 0)); la.add(mesh(new THREE.CylinderGeometry(0.016, 0.016, 1.45, 8), M.navy, 0, 0.75, 0));
  la.add(mesh(new THREE.CylinderGeometry(0.17, 0.24, 0.3, 24, 1, true), mat(0xf3eedb, 0.9, { side: THREE.DoubleSide, emissive: 0xf3eedb, emissiveIntensity: 0.35 }), 0, 1.55, 0));
  // la mochila de gimnasio en el piso
  const mo = crearMochila(MARCA.navy3, MARCA.g); mo.position.set(-1.25, 0.19, -0.1); mo.rotation.set(0.1, 0.6, 0.05); LIV.add(mo);
  // (r3 M5) sin el cuadro: asomaba entre el chip y la burbuja, o cortado en el borde
  sombras(LIV);
}
fusionar(LIV);

// =====================================================================================================
// INTERFAZ RECREADA (canvas): el grupo de WhatsApp genérico, la app de reservas con el mapa de las 14 bicis, el recordatorio,
// el aviso a la lista de espera, la tablet de la recepción y el panel de noviembre
// =====================================================================================================
const NV = "#0b1220", NV2 = "#16243d", NV3 = "#1f3254", CRm = "#efeee5", VD = "#5ce611", VDO = "#3fa60a", ROJO = "#c7655b", GRIS = "#b9bec4";
const tilde = (x, cx, cy, s, color = NV, lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
const bola = (x, cx, cy, r, fondo, letra, tinta = CRm) => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.strokeStyle = NV; x.lineWidth = Math.max(3, r * 0.1); x.stroke(); x.fillStyle = tinta; x.font = F(900, r * 1.05); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(letra, cx, cy + r * 0.06); };
function renglones(x, txt, ancho) { const ws = txt.split(" "), out = []; let l = ""; for (const w of ws) { const p = l ? l + " " + w : w; if (x.measureText(p).width > ancho && l) { out.push(l); l = w; } else l = p; } if (l) out.push(l); return out; }
const COLOR_DE = { Caro: "#c7655b", Seba: "#1f3254", Lu: "#3fa60a", Mabel: "#8a4a8a", Nati: "#2c6a8a", Gabi: "#a0642a", Nico: "#a0642a", Romi: "#2c6a8a", Pato: "#1f3254", Vicky: "#3fa60a", Ana: "#8a4a8a", Fede: "#2c6a8a", Majo: "#8a4a2a", Sole: "#3b2a22", Mauro: "#1f3254" };
// el pulgar plano (sticker genérico, navy sobre crema)
function pulgar(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = NV3; x.strokeStyle = NV; x.lineWidth = 6;
  x.beginPath(); x.roundRect(-60, -10, 34, 80, 10); x.fill(); x.stroke();
  x.beginPath(); x.moveTo(-20, -6); x.lineTo(0, -60); x.quadraticCurveTo(14, -78, 26, -60); x.lineTo(16, -18); x.lineTo(56, -18); x.quadraticCurveTo(72, -16, 68, 4); x.lineTo(56, 60); x.quadraticCurveTo(52, 72, 38, 72); x.lineTo(-20, 72); x.closePath(); x.fill(); x.stroke();
  x.restore();
}
// una burbuja del chat: { de, txt, pulgar, audio, mio, rojo (palabra en rojo), ver (cuántas letras) }; devuelve el alto
function burbujaChat(x, W, y, m, k, dibujar = true) {
  const pad = 26 * k, px = (m.px ?? 50) * k, ancho = W * 0.8;
  x.font = F(800, px);
  const txt = m.txt ?? "";
  const ls = m.txt ? renglones(x, txt, ancho - 2 * pad) : [];
  const cab = m.mio ? 0 : 52 * k;
  let h = cab + (m.pulgar ? 170 * k : m.audio ? 120 * k : ls.length * px * 1.2) + pad * 1.5;
  let w = m.pulgar ? 230 * k : m.audio ? ancho : Math.max(...ls.map((l) => x.measureText(l).width), m.mio ? 0 : 180 * k) + 2 * pad;
  if (!dibujar) return h;
  const bx = m.mio ? W - 24 * k - w : 24 * k;
  x.fillStyle = m.mio ? NV2 : "#ffffff"; x.strokeStyle = m.mio ? VD : NV2; x.lineWidth = 5 * k; x.beginPath(); x.roundRect(bx, y, w, h, m.mio ? [30 * k, 8 * k, 30 * k, 30 * k] : [8 * k, 30 * k, 30 * k, 30 * k]); x.fill(); x.stroke();
  x.textBaseline = "middle"; x.textAlign = "left";
  if (!m.mio) { x.fillStyle = COLOR_DE[m.de] ?? NV3; x.font = F(800, 42 * k); x.fillText(m.de, bx + pad, y + 36 * k); }
  if (m.pulgar) pulgar(x, bx + w / 2, y + cab + 90 * k, 1.05 * k);
  else if (m.audio) {
    const cy = y + cab + 60 * k;
    const x0 = bx + pad;
    x.fillStyle = NV2; x.beginPath(); x.roundRect(x0 + 6 * k, cy - 30 * k, 26 * k, 40 * k, 13 * k); x.fill(); x.strokeStyle = NV2; x.lineWidth = 6 * k; x.beginPath(); x.arc(x0 + 19 * k, cy - 6 * k, 22 * k, 0.15, Math.PI - 0.15); x.stroke(); x.fillRect(x0 + 16 * k, cy + 14 * k, 6 * k, 16 * k);
    x.fillStyle = NV; x.font = F(800, 46 * k); x.textAlign = "left"; x.fillText("Audio", x0 + 56 * k, cy - 6 * k);
    const xa = x0 + 210 * k, wa = w - (xa - bx) - pad - 110 * k;
    x.fillStyle = GRIS; x.fillRect(xa, cy - 7 * k, wa, 10 * k); x.fillStyle = VDO; x.fillRect(xa, cy - 7 * k, wa * (m.prog ?? 0), 10 * k); x.beginPath(); x.arc(xa + wa * (m.prog ?? 0), cy - 2 * k, 13 * k, 0, 7); x.fill();
    x.fillStyle = NV3; x.font = F(700, 40 * k); x.textAlign = "right"; x.fillText(m.audio, bx + w - pad, cy);
  } else {
    let resto = m.ver ?? Infinity;
    ls.forEach((l, i) => {
      const yy = y + cab + pad * 0.7 + px * 0.62 + i * px * 1.2; let xx = bx + pad;
      for (const w2 of l.split(/(?<= )/)) { if (resto <= 0) break; const vis = w2.slice(0, Math.max(0, resto)); resto -= w2.length; x.font = F(800, px); x.fillStyle = m.rojo && w2.startsWith(m.rojo) ? (m.mio ? "#ff9d92" : "#b04a40") : m.mio ? CRm : NV; x.fillText(vis, xx, yy); xx += x.measureText(w2).width; }
    });
  }
  return h;
}
function cabeceraGrupo(x, W, k, sub = "38 participantes") {
  x.fillStyle = NV2; x.fillRect(0, 0, W, 150 * k); x.fillStyle = VD; x.fillRect(0, 150 * k, W, 10 * k);
  bola(x, 70 * k, 76 * k, 46 * k, CRm, "19", NV);
  x.fillStyle = CRm; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 44 * k); x.fillText("SPINNING MARTES 19", 132 * k, 58 * k);
  x.font = F(700, 38 * k); x.fillStyle = "#c9d2e0"; x.fillText(sub, 134 * k, 112 * k);
}
// el chat: lista de mensajes de arriba abajo; si no entran, sube (el último queda abajo)
function dibujarChat(x, W, H, msgs, k, sub, kc = k) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H);
  let tot = 0; const hs = msgs.map((m) => burbujaChat(x, W, 0, m, k, false)); for (const h of hs) tot += h + 18 * k;
  let y = H - 24 * k - tot;   // el último abajo (como en un chat de verdad)
  msgs.forEach((m, i) => { if (y + hs[i] > 140 * kc) burbujaChat(x, W, y, m, k); y += hs[i] + 18 * k; });
  cabeceraGrupo(x, W, kc, sub);
}
// P1 · el aluvión de "yo voy" en el celular de Mauro
const MSG_YV = [{ de: "Caro", txt: "Yo voy" }, { de: "Seba", txt: "yo voooy" }, { de: "Lu", txt: "Anotame a mí y a mi prima" }, { de: "Mabel", txt: "Yo voy" }, { de: "Nati", txt: "voy pero llego 19:10" }, { de: "Gabi", txt: "Yo voy" }, { de: "Pato", txt: "Voy!!" }, { de: "Vicky", txt: "yo voy profe" }];
const MSG_PREV = [{ de: "Ana", txt: "Yo voy" }, { de: "Caro", txt: "profe hoy vamos!!" }, { de: "Fede", txt: "voy" }, { de: "Romi", txt: "Yo voy" }];   // (r3 B3) "Romi": Lu ya estaba en los "yo voy"
function msgsP1(t) {
  const n = T.yv.filter((m) => t >= m).length;
  const l = [...MSG_PREV, ...MSG_YV.slice(0, n)];
  if (t >= T.sticker) l.push({ de: "Ana", pulgar: true });
  if (t >= T.audio47) l.push({ de: "Fede", audio: "0:47", prog: 0 });
  return l;
}
// P1b · el audio de Majo, "Llena, Majo. Perdoná.", Sole, "Llena, Sole." · P3i · el mensaje de Majo a las 19:01
function msgsP1b(t) {
  const l = [...MSG_YV.slice(4).map((m) => ({ ...m, px: 58 })), { de: "Ana", pulgar: true }, { de: "Fede", audio: "0:47", prog: 0 }];
  l.push({ de: "Majo", audio: "0:02", prog: cl((t - T.j1) / LEN.j1), px: 58 });
  if (t >= T.llenaM) { const txt = "Llena, Majo. Perdoná."; l.push({ mio: true, txt, px: 62, rojo: "Llena", ver: Math.round(txt.length * cl((t - T.llenaM) / 0.55)) }); }
  if (t >= T.sole) l.push({ de: "Sole", txt: "¿Me guardás una?", px: 62 });
  if (t >= T.llenaS - 0.3) { const txt = "Llena, Sole."; l.push({ mio: true, txt, px: 62, rojo: "Llena", ver: Math.round(txt.length * cl((t - T.llenaS + 0.3) / 0.3)) }); }
  return l;
}
function msgsP3i() { return [{ mio: true, txt: "Llena, Majo. Perdoná.", rojo: "Llena", px: 58 }, { de: "Sole", txt: "¿Me guardás una?", px: 58 }, { mio: true, txt: "Llena, Sole.", rojo: "Llena", px: 58 }, { de: "Majo", txt: "Tranqui, Mauro. Me anoté en otro lado: ahí reservás la bici.", px: 64 }]; }
// P5 · la pantalla de bloqueo con la notificación de Nico (19:04)
function dibujarBloqueo(x, W, H, k, noti) {
  x.fillStyle = NV2; x.fillRect(0, 0, W, H);
  x.fillStyle = CRm; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 170 * k); x.fillText("19:04", W / 2, 210 * k);
  x.font = F(600, 46 * k); x.fillText("martes", W / 2, 320 * k);
  if (noti) {
    const y = 420 * k; x.fillStyle = "#ffffff"; x.strokeStyle = NV; x.lineWidth = 7 * k; x.beginPath(); x.roundRect(22 * k, y, W - 44 * k, 520 * k, 40 * k); x.fill(); x.stroke();
    bola(x, 90 * k, y + 76 * k, 46 * k, CRm, "19", NV); x.fillStyle = NV3; x.textAlign = "left"; x.font = F(800, 42 * k); x.fillText("SPINNING MARTES 19", 152 * k, y + 76 * k);
    x.fillStyle = NV; x.font = F(900, 84 * k); x.fillText("Nico:", 56 * k, y + 200 * k); x.font = F(800, 80 * k); x.fillText("¿Ya empezó?", 56 * k, y + 310 * k); x.fillStyle = "#b04a40"; x.font = F(900, 84 * k); x.fillText("Yo voy.", 56 * k, y + 420 * k);
  }
}
// ---- la app de reservas: cabecera, el mapa de la sala (tarima arriba, 4 · 5 · 5) ----
function cabeceraApp(x, W, k, titulo = "Reservá tu bici") {
  x.fillStyle = NV2; x.fillRect(0, 0, W, 170 * k); x.fillStyle = VD; x.fillRect(0, 170 * k, W, 10 * k);
  bola(x, 80 * k, 86 * k, 52 * k, VD, "EM", NV);
  x.fillStyle = CRm; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 54 * k); x.fillText("Estudio Mauro", 152 * k, 64 * k);
  x.font = F(700, 42 * k); x.fillStyle = VD; x.fillText(titulo, 154 * k, 124 * k);
}
// estado de cada bici: "ocu" (gris con ✓), "libre" (verde), "mia" (navy con la inicial), "toca" (verde apretado)
function dibujarMapa(x, X, Y, W, k, est, inicial = "M") {
  const H = 700 * k;
  x.fillStyle = "#f7f6ef"; x.strokeStyle = NV2; x.lineWidth = 5 * k; x.beginPath(); x.roundRect(X, Y, W, H, 30 * k); x.fill(); x.stroke();
  // la tarima con la bici del profe
  x.fillStyle = CRm; x.strokeStyle = NV; x.lineWidth = 5 * k; x.beginPath(); x.roundRect(X + W / 2 - 170 * k, Y + 24 * k, 340 * k, 104 * k, 16 * k); x.fill(); x.stroke();
  x.fillStyle = NV; x.font = F(900, 40 * k); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("PROFE", X + W / 2, Y + 77 * k);
  const S = 112 * k, filas = [[1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14]];
  filas.forEach((f, r) => {
    const gap = (W - 5 * S) / 6, y = Y + 170 * k + r * (S + 52 * k);
    f.forEach((n, i) => {
      const xx = X + (W - (f.length * S + (f.length - 1) * gap)) / 2 + i * (S + gap);
      const e = est[n] ?? "ocu", s2 = e === "toca" ? 0.9 : 1;
      x.save(); x.translate(xx + S / 2, y + S / 2); x.scale(s2, s2);
      x.fillStyle = e === "ocu" ? GRIS : e === "mia" ? NV2 : VD; x.strokeStyle = NV; x.lineWidth = 6 * k; x.beginPath(); x.roundRect(-S / 2, -S / 2, S, S, 22 * k); x.fill(); x.stroke();
      x.fillStyle = e === "mia" ? CRm : NV; x.font = F(900, 58 * k); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(e === "mia" ? inicial : String(n), 0, 3 * k);
      if (e === "mia") { x.font = F(800, 30 * k); x.fillStyle = VD; x.fillText(String(n), S * 0.32, S * 0.32); }
      x.restore();
    });
  });
  return H;
}
// Q1 · celular de Majo: f.tocado (0 nada, 1 apretó la 7, 2 reservada), f.ocup (0, 1 la 4, 2 la 13 = llena)
function dibujarReserva(x, W, H, k, f) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H); cabeceraApp(x, W, k, "Hola, Majo");
  x.fillStyle = NV; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 50 * k); x.fillText("Spinning", 40 * k, 236 * k);
  x.fillStyle = NV3; x.font = F(700, 44 * k); x.fillText("martes 19:00", 42 * k, 298 * k);
  const quedan = 3 - (f.tocado >= 2 ? 1 : 0) - f.ocup;
  const llena = quedan <= 0;
  x.fillStyle = llena ? NV : VD; x.strokeStyle = NV; x.lineWidth = 6 * k; const tx = llena ? "Llena · 14/14" : `Quedan ${quedan}`; x.font = F(900, 52 * k); const tw = x.measureText(tx).width + 60 * k;
  x.beginPath(); x.roundRect(W - 36 * k - tw, 214 * k, tw, 98 * k, 49 * k); x.fill(); x.stroke(); x.fillStyle = llena ? CRm : NV; x.textAlign = "center"; x.fillText(tx, W - 36 * k - tw / 2, 265 * k);
  const est = {}; for (let n = 1; n <= 14; n++) est[n] = "ocu";
  est[4] = f.ocup >= 1 ? "ocu" : "libre"; est[13] = f.ocup >= 2 ? "ocu" : "libre"; est[7] = f.tocado >= 2 ? "mia" : f.tocado === 1 ? "toca" : "libre";
  const hm = dibujarMapa(x, 28 * k, 350 * k, W - 56 * k, k, est);
  const yb = 350 * k + hm + 30 * k;
  if (f.tocado < 2) {
    x.fillStyle = f.tocado === 1 ? VDO : VD; x.strokeStyle = NV; x.lineWidth = 8 * k; x.beginPath(); x.roundRect(36 * k, yb, W - 72 * k, 140 * k, 70 * k); x.fill(); x.stroke();
    x.fillStyle = NV; x.font = F(900, 62 * k); x.textAlign = "center"; x.fillText(f.tocado === 1 ? "Reservar bici 7" : "Elegí tu bici", W / 2, yb + 72 * k);
  } else {
    x.fillStyle = NV2; x.beginPath(); x.roundRect(30 * k, yb, W - 60 * k, 150 * k, 34 * k); x.fill();
    x.fillStyle = VD; x.beginPath(); x.arc(100 * k, yb + 75 * k, 46 * k, 0, 7); x.fill(); tilde(x, 102 * k, yb + 77 * k, 48 * k, NV);
    x.fillStyle = CRm; x.textAlign = "left"; x.font = F(900, 58 * k); x.fillText("Bici 7 reservada", 170 * k, yb + 52 * k); x.fillStyle = VD; x.font = F(700, 42 * k); x.fillText("martes 19:00", 172 * k, yb + 110 * k);
  }
}
// Q1s · celular de Sole: "Clase llena · 14/14" → "Anotarme en la lista de espera" → "Sos la 1ª de la lista de espera ✓"
function dibujarEspera(x, W, H, k, f) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H); cabeceraApp(x, W, k, "Hola, Sole");
  x.fillStyle = NV; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 50 * k); x.fillText("Spinning · martes 19:00", 40 * k, 240 * k);
  x.fillStyle = NV2; x.beginPath(); x.roundRect(30 * k, 300 * k, W - 60 * k, 170 * k, 34 * k); x.fill();
  x.fillStyle = CRm; x.font = F(900, 74 * k); x.textAlign = "center"; x.fillText("Clase llena", W / 2, 360 * k); x.fillStyle = VD; x.font = F(800, 50 * k); x.fillText("14 de 14 bicis", W / 2, 428 * k);
  const est = {}; for (let n = 1; n <= 14; n++) est[n] = "ocu";
  x.save(); x.translate(W * 0.1, 500 * k); x.scale(0.8, 0.8); dibujarMapa(x, 0, 0, W, k, est); x.restore();
  const yb = 500 * k + 700 * k * 0.8 + 30 * k;
  if (f < 2) {
    x.fillStyle = f === 1 ? VDO : VD; x.strokeStyle = NV; x.lineWidth = 8 * k; x.beginPath(); x.roundRect(36 * k, yb, W - 72 * k, 170 * k, 50 * k); x.fill(); x.stroke();
    x.fillStyle = NV; x.font = F(900, 56 * k); x.textAlign = "center"; x.fillText("Anotarme en la", W / 2, yb + 56 * k); x.fillText("lista de espera", W / 2, yb + 118 * k);
  } else {
    x.fillStyle = NV2; x.beginPath(); x.roundRect(30 * k, yb, W - 60 * k, 180 * k, 34 * k); x.fill();
    x.fillStyle = VD; x.beginPath(); x.arc(100 * k, yb + 90 * k, 46 * k, 0, 7); x.fill(); tilde(x, 102 * k, yb + 92 * k, 48 * k, NV);
    x.fillStyle = CRm; x.textAlign = "left"; x.font = F(900, 58 * k); x.fillText("Sos la 1ª de", 170 * k, yb + 60 * k); x.fillText("la lista de espera", 170 * k, yb + 124 * k);
  }
}
// un mensaje de "Estudio Mauro" (recordatorio, aviso) con botones; f: 0 llegó, 1 apretó el botón b, 2 confirmado
function dibujarMensajeApp(x, W, H, k, { hola, lineas, botones, apretado, f, okTxt, okSub }) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H); cabeceraApp(x, W, k, "mensajes");
  const by = 220 * k;
  x.fillStyle = "#ffffff"; x.strokeStyle = NV2; x.lineWidth = 6 * k; x.beginPath(); x.roundRect(24 * k, by, W - 48 * k, 120 * k + lineas.length * 84 * k, [10 * k, 34 * k, 34 * k, 34 * k]); x.fill(); x.stroke();
  x.fillStyle = NV3; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(700, 44 * k); x.fillText(hola, 60 * k, by + 60 * k);
  lineas.forEach(([l, peso, px], i) => { x.fillStyle = NV; x.font = F(peso ?? 800, (px ?? 66) * k); x.fillText(l, 60 * k, by + 150 * k + i * 84 * k); });
  let y = by + 150 * k + lineas.length * 84 * k + 10 * k;
  if (f < 2) {
    botones.forEach((b, i) => {
      const ap = f === 1 && i === apretado;
      x.fillStyle = ap ? VDO : i === apretado ? VD : "#ffffff"; x.strokeStyle = NV; x.lineWidth = 8 * k; x.beginPath(); x.roundRect(36 * k, y, W - 72 * k, 150 * k, 75 * k); x.fill(); x.stroke();
      x.fillStyle = NV; x.font = F(900, 64 * k); x.textAlign = "center"; x.fillText(b, W / 2, y + 78 * k);
      y += 180 * k;
    });
  } else {
    x.fillStyle = NV2; x.beginPath(); x.roundRect(30 * k, y, W - 60 * k, 190 * k, 34 * k); x.fill();
    x.fillStyle = VD; x.beginPath(); x.arc(104 * k, y + 95 * k, 50 * k, 0, 7); x.fill(); tilde(x, 106 * k, y + 97 * k, 52 * k, NV);
    x.fillStyle = CRm; x.textAlign = "left"; ajustar(x, okTxt, 900, 64 * k, W - 230 * k); x.fillText(okTxt, 180 * k, y + 66 * k); x.fillStyle = VD; x.font = F(700, 46 * k); x.fillText(okSub, 182 * k, y + 132 * k);
    y += 190 * k;
  }
  // (r2) abajo, el mapa de la clase con la bici 4 marcada (no queda media pantalla vacía)
  const est = {}; for (let n = 1; n <= 14; n++) est[n] = "ocu"; est[4] = f >= 2 && okTxt.includes("reservada") ? "mia" : "libre";
  const ky = y + 30 * k, esc = Math.min(0.78, (H - ky - 20) / (700 * k));
  if (esc > 0.35) { x.save(); x.translate((W - W * esc) / 2, ky); x.scale(esc, esc); dibujarMapa(x, 0, 0, W, k, est, "S"); x.restore(); }
}
// Q2t · la tablet de la recepción: el mapa de hoy con la 4 que se libera y el aviso a la lista de espera
function dibujarTablet(x, W, H, k, f) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H); cabeceraApp(x, W, k, "Spinning martes 19:00 · hoy");
  const est = {}; for (let n = 1; n <= 14; n++) est[n] = "ocu"; if (f >= 1) est[4] = "libre"; if (f >= 2) est[4] = "mia";
  dibujarMapa(x, 28 * k, 210 * k, W - 56 * k, k, est, "S");
  const y = 950 * k;
  x.fillStyle = f >= 2 ? NV2 : f >= 1 ? VD : "#ffffff"; x.strokeStyle = NV; x.lineWidth = 7 * k; x.beginPath(); x.roundRect(30 * k, y, W - 60 * k, 290 * k, 34 * k); x.fill(); x.stroke();
  x.textAlign = "left"; x.textBaseline = "middle";
  if (f === 0) { x.fillStyle = NV; x.font = F(800, 58 * k); x.fillText("Reservadas 14 de 14", 70 * k, y + 80 * k); x.fillStyle = NV3; x.font = F(700, 46 * k); x.fillText("Lista de espera: 1 · Sole", 70 * k, y + 170 * k); }
  else if (f === 1) { x.fillStyle = NV; x.font = F(900, 66 * k); x.fillText("Bici 4 libre", 70 * k, y + 80 * k); x.font = F(800, 48 * k); x.fillText("avisando a la lista", 70 * k, y + 160 * k); x.fillText("de espera: Sole", 70 * k, y + 220 * k); }
  else { x.fillStyle = CRm; x.font = F(900, 66 * k); x.fillText("Bici 4 · Sole", 70 * k, y + 80 * k); x.fillStyle = VD; x.font = F(800, 50 * k); x.fillText("reservada otra vez ✓", 70 * k, y + 170 * k); }
}
// Q4 · el panel de noviembre (tablet): e = { filas: 0..4, gira: 0..1 }
function dibujarPanelMes(x, W, H, k, e) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H);
  x.fillStyle = NV2; x.fillRect(0, 0, W, 190 * k); x.fillStyle = VD; x.fillRect(0, 190 * k, W, 12 * k);
  x.fillStyle = CRm; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 62 * k); x.fillText("Spinning martes 19:00", 40 * k, 70 * k); x.fillStyle = VD; x.font = F(800, 50 * k); x.fillText("noviembre", 42 * k, 140 * k);
  const fila = (i, y, h, dibujo) => { if (e.filas <= i) return; x.fillStyle = "#ffffff"; x.strokeStyle = NV; x.lineWidth = 7 * k; x.beginPath(); x.roundRect(30 * k, y, W - 60 * k, h, 30 * k); x.fill(); x.stroke(); dibujo(y); };
  const ok = (y, h) => { x.fillStyle = VDO; x.beginPath(); x.arc(W - 100 * k, y + h / 2, 40 * k, 0, 7); x.fill(); tilde(x, W - 98 * k, y + h / 2 + 2 * k, 42 * k, NV); };
  fila(0, 240 * k, 200 * k, (y) => { x.fillStyle = NV; x.textAlign = "left"; x.font = F(800, 54 * k); x.fillText("Reservaron 14", 70 * k, y + 64 * k); x.fillText("vinieron 14", 70 * k, y + 136 * k); ok(y, 200 * k); });
  fila(1, 470 * k, 300 * k, (y) => {
    x.fillStyle = NV; x.textAlign = "left"; x.font = F(800, 52 * k); x.fillText("Bicis vacías en el mes", 70 * k, y + 64 * k);
    const g = e.gira, cx = W / 2, cy = y + 190 * k;
    x.save(); x.translate(cx, cy); x.scale(1, Math.abs(Math.cos(g * Math.PI)) || 0.02);
    x.font = F(900, 150 * k); x.textAlign = "center"; x.fillStyle = g < 0.5 ? ROJO : VDO; x.fillText(g < 0.5 ? "20" : "1", 0, 6 * k); x.restore();
    if (g >= 1) { x.fillStyle = GRIS; x.font = F(800, 70 * k); x.textAlign = "right"; x.fillText("20 →", cx - 70 * k, cy + 6 * k); ok(y, 300 * k); }
  });
  fila(2, 800 * k, 200 * k, (y) => { x.fillStyle = NV; x.textAlign = "left"; x.font = F(800, 50 * k); x.fillText("Lugares que llenó la", 70 * k, y + 62 * k); x.fillText("lista de espera: 6", 70 * k, y + 136 * k); ok(y, 200 * k); });
  fila(3, 1030 * k, 200 * k, (y) => { x.fillStyle = NV; x.textAlign = "left"; x.font = F(800, 50 * k); x.fillText("Alumnos nuevos", 70 * k, y + 62 * k); x.fillText("desde la lista: 3", 70 * k, y + 136 * k); ok(y, 200 * k); });
}

// =====================================================================================================
// INSERTOS PEGADOS A LA CÁMARA (el lugar de fondo en planos de color)
// =====================================================================================================
function crearFondoInserto(g, tipo) {
  const P = (w, h, c, x, y, z, rz = 0) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w / PXK, h / PXK), new THREE.MeshBasicMaterial({ color: c })); m.position.set(x / PXK, y / PXK, z); m.rotation.z = rz; g.add(m); return m; };
  if (tipo === "sala") { P(1400, 2400, 0x0b1220, 0, 0, -0.06); P(2600, 230, 0xefeee5, 0, 200, -0.059, 0.42); P(1400, 900, 0x3a3f4a, 0, -900, -0.058); P(1400, 26, 0x5ce611, 0, 1000, -0.057); }
  else if (tipo === "living") { P(1400, 2400, 0xe6e1cf, 0, 0, -0.06); P(1400, 900, 0x16243d, 0, -820, -0.059); P(1400, 60, 0x1f3254, 0, -360, -0.058); }
  else if (tipo === "oficina") { P(1400, 2400, 0xd9d7c9, 0, 0, -0.06); P(1400, 900, 0x3a3f4a, 0, -820, -0.059); P(1400, 40, 0x1f3254, 0, -370, -0.058); P(300, 420, 0x16243d, 470, 520, -0.0585); }
  else if (tipo === "recepcion") {
    P(1400, 2400, 0x0b1220, 0, 0, -0.06); P(2600, 230, 0xefeee5, 0, 350, -0.059, 0.42); P(1400, 26, 0x5ce611, 0, 1000, -0.057);
    P(1400, 820, 0xefeee5, 0, -860, -0.0585); P(1400, 560, 0x1f3254, 0, -1000, -0.058); P(1400, 30, 0x5ce611, 0, -720, -0.0578);
    for (const [x, c] of [[-470, 0xefeee5], [-410, 0x5ce611], [-350, 0x16243d], [400, 0x5ce611], [460, 0xefeee5]]) { P(52, 170, c, x, -360, -0.0575); P(30, 30, 0x0b1220, x, -265, -0.0574); }
  }
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: opc.funda ?? 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  return { g, tex, IW, IH, k: IW / 860 };
}
const inserto = (tipo, IW, IH, cx, cy, marcoR, opc) => { const I = { g: new THREE.Group() }; crearFondoInserto(I.g, tipo); I.cel = crearCelInserto(IW, IH, cx, cy, marcoR, opc); I.g.add(I.cel.g); pegarACamara(I.g, camera, 10); I.g.visible = false; return I; };
const INS = {
  P1b: inserto("sala", 860, 1400, 540, 1040, 34, { camara: true, funda: 0x16243d }),     // el chat: audio de Majo y "Llena"
  P3i: inserto("sala", 860, 1300, 540, 1060, 34, { camara: true, funda: 0x16243d }),     // 19:01: el mensaje de Majo
  P5: inserto("sala", 860, 1300, 540, 1060, 34, { camara: true, funda: 0x16243d }),      // 19:04: la notificación de Nico
  Q1: inserto("living", 860, 1420, 540, 1050, 34, { camara: true, funda: 0x16243d }),    // el mapa en el celular de Majo
  Q1s: inserto("living", 860, 1420, 540, 1050, 34, { camara: true, funda: 0x2c4268 }),   // el celular de Sole: lista de espera
  Q2: inserto("oficina", 860, 1300, 540, 1060, 34, { camara: true, funda: 0x1f3254 }),   // el recordatorio a Lucía
  Q2t: inserto("recepcion", 930, 1260, 540, 960, 20, {}),                                // la tablet de la recepción
  Q2s: inserto("living", 860, 1300, 540, 1060, 34, { camara: true, funda: 0x2c4268 }),   // el aviso a Sole
  Q4: inserto("recepcion", 940, 1300, 540, 960, 20, {}),                                 // el panel de noviembre
};
INS.Q1c = INS.Q1;
const cacheIns = {};
function pintar(clave, I, dibujo) { if (cacheIns[I.cel.tex.uuid] === clave) return; cacheIns[I.cel.tex.uuid] = clave; const x = I.cel.tex.userData.x; x.setTransform(1, 0, 0, 1, 0, 0); dibujo(x, I.cel.IW, I.cel.IH, I.cel.k); I.cel.tex.needsUpdate = true; }
let cCelM = "", cCelJ = "";
function dibujarInterfaz(t, pa) {
  // el celular de Mauro (en la mano en P1, en el soporte en P5)
  const q = (v) => Math.round(v * 8) / 8;
  if (pa === "P1") { const l = msgsP1(t), k = `p1-${l.length}`; if (k !== cCelM) { cCelM = k; dibujarChat(celMT.userData.x, 420, 860, l, 0.62, "38 participantes"); celMT.needsUpdate = true; } }
  else if (pa === "P5c") { const k = "p5"; if (k !== cCelM) { cCelM = k; dibujarBloqueo(celMT.userData.x, 420, 860, 0.5, true); celMT.needsUpdate = true; } }
  if (pa === "P5") { const n = t >= T.rodri - 0.05; pintar(`b${n}`, INS.P5, (x, W, H, k) => dibujarBloqueo(x, W, H, k * 1.02, n)); }
  if (pa === "P1b") { const l = msgsP1b(t); pintar(JSON.stringify(l.map((m) => [m.ver, q(m.prog ?? 0), m.leido])), INS.P1b, (x, W, H, k) => dibujarChat(x, W, H, l, k * 1.05, "38 participantes")); }
  if (pa === "P3i") pintar("p3i", INS.P3i, (x, W, H, k) => dibujarChat(x, W, H, msgsP3i(), k * 1.08, "19:01"));
  if (pa === "Q1" || pa === "Q1c") { const f = { tocado: t >= T.reserva7 ? 2 : t >= T.toca7 ? 1 : 0, ocup: t >= T.ocupa[1] ? 2 : t >= T.ocupa[0] ? 1 : 0 }; pintar(JSON.stringify(f), INS.Q1, (x, W, H, k) => dibujarReserva(x, W, H, k, f)); }
  if (pa === "Q1s") { const f = t >= T.espera ? 2 : t >= T.tocaEspera ? 1 : 0; pintar(`e${f}`, INS.Q1s, (x, W, H, k) => dibujarEspera(x, W, H, k, f)); }
  if (pa === "Q2") { const f = t >= T.libera + 0.18 ? 2 : t >= T.libera ? 1 : 0; pintar(`r${f}`, INS.Q2, (x, W, H, k) => dibujarMensajeApp(x, W, H, k * 1.12, { hola: "Hola, Lucía.", lineas: [["Hoy spinning 19:00"], ["Tu bici: 4", 900, 80], ["¿Venís?"]], botones: ["Voy ✓", "Liberar mi bici"], apretado: 1, f, okTxt: "Bici 4 liberada", okSub: "Gracias por avisar" })); }
  if (pa === "Q2t") { const f = t >= T.libre4 ? 1 : 0; pintar(`t${f}`, INS.Q2t, (x, W, H, k) => dibujarTablet(x, W, H, k * 0.93, f)); }
  if (pa === "Q2s") { const f = t >= T.reserva4 ? 2 : t >= T.quiero ? 1 : 0; pintar(`s${f}`, INS.Q2s, (x, W, H, k) => dibujarMensajeApp(x, W, H, k * 1.12, { hola: "Hola, Sole.", lineas: [["Se liberó la bici 4"], ["hoy 19:00", 700, 56], ["¿La querés?", 900, 74]], botones: ["La quiero"], apretado: 0, f, okTxt: "Bici 4 reservada", okSub: "martes 19:00" })); }
  if (pa === "Q4") { const e = { filas: T.filas.filter((f) => t >= f).length, gira: q(eio(sg(t, T.gira[0], T.gira[1]))) }; pintar(JSON.stringify(e), INS.Q4, (x, W, H, k) => dibujarPanelMes(x, W, H, k * 0.95, e)); }
  // el celular de Majo en el sofá: el mapa con "Quedan 3"
  if (pa === "Q1b" && cCelJ !== "q") { cCelJ = "q"; const x = celJT.userData.x; x.save(); x.scale(420 / 860, 860 / 1420); dibujarReserva(x, 860, 1420, 1, { tocado: 0, ocup: 0 }); x.restore(); celJT.needsUpdate = true; }
}

// =====================================================================================================
// LAS TARJETAS DE ESTE REEL
// =====================================================================================================
const chip = (txt, px = 60, fondo = "#16243d", tinta = "#efeee5") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo, borde: fondo === "#16243d" ? C.cr : C.navy }); };
// el micrófono (iconito navy) a la izquierda de las burbujas de Mauro por la vincha
function microfono(x, cx, cy, s) {
  x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(cx - 14 * s, cy - 40 * s, 28 * s, 50 * s, 14 * s); x.fill();
  x.strokeStyle = "#0b1220"; x.lineWidth = 7 * s; x.lineCap = "round"; x.beginPath(); x.arc(cx, cy - 6 * s, 24 * s, 0.1, Math.PI - 0.1); x.stroke();
  x.beginPath(); x.moveTo(cx, cy + 18 * s); x.lineTo(cx, cy + 36 * s); x.stroke(); x.beginPath(); x.moveTo(cx - 16 * s, cy + 38 * s); x.lineTo(cx + 16 * s, cy + 38 * s); x.stroke();
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(cx, cy - 26 * s, 6 * s, 0, 7); x.fill();
}
// globo que se revela por frase entera (cada renglón es una frase); mic: con el iconito del micrófono a la izquierda
function crearGloboF(lineas, px = 70, mic = false) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const izq = mic ? px * 1.15 : 0;
  const anchoT = Math.max(...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.1 + izq), H = Math.round(lineas.length * px * 1.22 + px * 0.72);
  const dib = (n) => (x, w, h) => { if (mic) microfono(x, px * 0.75, h / 2 + 4, px / 62); lineas.forEach((l, i) => { if (i < n) textoSel(x, l, izq / 2 + w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px); }); };
  const g = crearTarjeta(Wg, H, dib(lineas.length));
  g.userData.dib = dib; g.userData.verL = lineas.length;
  return g;
}
function verLineas(g, n) { if (g.userData.verL === n) return; g.userData.verL = n; redibujar(g, g.userData.dib(n)); }
// el contador de la parte 1 (YO VOY / BICIS / VINIERON) y el de la parte 2 (RESERVAS / VINIERON)
function dibujarContador(x, W, H, e) {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  e.filas.forEach(([et, n, color], i) => {
    const y = 58 + i * 92;
    x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(900, et.length > 7 ? 42 : 50); x.fillText(et, 26, y);
    x.fillStyle = color; x.textAlign = "right"; x.font = F(900, 78); x.fillText(String(n), W - 28, y + 2);
    if (i < e.filas.length - 1) { x.fillStyle = "#2c4268"; x.fillRect(24, y + 44, W - 48, 4); }
  });
}
const CONTADORES = { 2: crearTarjeta(430, 206, (x, W, H) => dibujarContador(x, W, H, { filas: [] }), { fondo: "#0b1220", borde: C.cr }), 3: crearTarjeta(430, 298, (x, W, H) => dibujarContador(x, W, H, { filas: [] }), { fondo: "#0b1220", borde: C.cr }) };
const cCont = {};
// arriba: cy es el borde de arriba de la tarjeta (crece hacia abajo cuando aparece la tercera fila)
function ponerContador(filas, cx, top, s, pop = 0) {
  const g = CONTADORES[filas.length], k = JSON.stringify(filas); if (k !== cCont[filas.length]) { cCont[filas.length] = k; redibujar(g, (x, W, H) => dibujarContador(x, W, H, { filas })); }
  ponerGlobo(g, cx, top + g.userData.H / 2, s * (1 + 0.08 * pop), null, 1);
}
// la notificación (Nico, 19:04)
function crearNoti(nombre, lineas, px = 54) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const W = Math.round(Math.max(...lineas.map((l) => med.measureText(l).width)) + px * 1.4 + 20), H = Math.round(lineas.length * px * 1.25 + px * 1.9);
  return crearTarjeta(W, H, (x, w, h) => {
    x.textBaseline = "middle"; x.textAlign = "left";
    x.fillStyle = "#3fa60a"; rr(x, px * 0.5, px * 0.38, px * 0.9, px * 0.9, px * 0.45);
    x.fillStyle = "#0b1220"; x.font = F(900, px * 0.5); x.textAlign = "center"; x.fillText("S", px * 0.95, px * 0.85);
    x.textAlign = "left"; x.fillStyle = "#3f5270"; x.font = F(800, px * 0.66); x.fillText(nombre, px * 1.65, px * 0.86);
    x.fillStyle = "#0b1220"; x.font = F(800, px); lineas.forEach((l, i) => x.fillText(l, px * 0.6, px * 1.75 + i * px * 1.25 + px * 0.25));
  });
}
const ROJO_CLARO = "#ff9d92";
const GL = {
  c1820: chip("Martes, 18:20."), c1900: chip("Martes, 19:00."), c1904: chip("19:04.", 64), c2130: chip("Lunes, 21:30."), c1500: chip("Martes, 15:00."), cNov: chip("Noviembre."),
  m1: crearGloboF(["Veintidós «yo voy».", "Hoy [explota.]"], 66), m1a: crearGloboF(["Veintidós «yo voy»."], 66),
  j1: crearGloboF(["Mauro, ¿hay lugar", "a las [siete?]"], 62),
  m3: crearGloboF(["Los «yo voy»", "no [pedalean.]"], 74, true), m3a: crearGloboF(["Los «yo voy»…"], 74, true),
  rLlena: crearRotulo([["A dos les dijo «llena»", ROJO_CLARO, 56]], 56),
  r5: crearRotulo([["5 bicis vacías", ROJO_CLARO, 64]], 64),
  rCosto: crearRotulo([["Majo y Sole: a otro lado", null, 50], ["2 alumnas menos", ROJO_CLARO, 64], ["$ 3.800 por mes", ROJO_CLARO, 80]], 50),   // (r3 B5) más chico, arriba del celular
  vendran: crearRotulo([["¿Vendrán?", ROJO_CLARO, 52]], 52),   // (r3 M8)
  rPerch: crearRotulo([["Bici 2: perchero", ROJO_CLARO, 64]], 64),
  rMajo: crearRotulo([["Majo · 7"]], 58), rSole: crearRotulo([["Sole · 4"]], 58),
  c1855: chip("Martes, 18:55."),
  rodri: crearNoti("SPINNING MARTES 19", ["Nico: ¿Ya empezó?", "Yo voy."], 60),
  j2: crearGloboF(["¿Quedan tres?", "¡La [siete!]"], 74), j2a: crearGloboF(["¿Quedan tres?"], 74),
  rCupo: crearRotulo([["Cupo real: 14 bicis"]], 54),
  rEspera: crearRotulo([["Sole: 1ª en la lista de espera"]], 54),
  rRecuerda: crearRotulo([["Recordatorio el mismo día"]], 52),
  rLibera: crearRotulo([["Se libera sola y le"], ["avisa a la siguiente"]], 54),
  otraVez: chip("Ocupada otra vez en 3 minutos", 54, "#5ce611", "#0b1220"),
  m4: crearGloboF(["Catorce reservas.", "Pedalean [catorce.]"], 66, true), m4a: crearGloboF(["Catorce reservas."], 66, true),
  g1: crearGloboF(["Profe, ¿y ahora la", "toalla dónde la [cuelgo?]"], 62),
  m5: crearGloboF(["En el cuello, [Graciela.]"], 66, true),
  rPanel: crearRotulo([["Panel de ocupación"]], 54),
};
const GUIAS = [crearGuia(), crearGuia()];
const GUIAS5 = [0, 1, 2, 3, 4, 5].map(() => crearGuia());
// (r3 M3) un aro rojo apagado con borde navy alrededor de cada objeto-perchero (se cuentan sin líneas que se crucen)
function crearAnillo() {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.RingGeometry(0.78, 1.22, 48), new THREE.MeshBasicMaterial({ color: C.navy, transparent: true })); b.userData.orden = 0; g.add(b);
  const l = new THREE.Mesh(new THREE.RingGeometry(0.86, 1.14, 48), new THREE.MeshBasicMaterial({ color: new THREE.Color("#ff9d92"), transparent: true })); l.userData.orden = 1; l.position.z = 0.001; g.add(l);
  return pegarACamara(g, camera, 38);
}
function ponerAnillo(a, x, y, r, u) {
  a.visible = u > 0.02; if (!a.visible) return;
  const k = halfK(), s = r * (u < 1 ? 1.35 - 0.35 * eo(u) : 1);
  a.position.set((x - 540) * k, (960 - y) * k, -1); a.scale.set(k * s, k * s, k * s);
  a.traverse((o) => { if (o.isMesh) { o.material.opacity = cl(u * 1.5); o.renderOrder = 38 + (o.userData.orden || 0); } });
}
const ANILLOS = [0, 1, 2, 3, 4].map(() => crearAnillo());
// la lupa del celular de Mauro (cuadro 0): el grupo que sube, grande, con la cola hacia el celular
const LUPA = crearTarjeta(480, 820, () => {}, { fondo: "#e9e6da" });
let cLupa = "";
function ponerLupa(t, cx, cy, s, objetivo) { const l = msgsP1(t), k = `${l.length}`; if (k !== cLupa) { cLupa = k; redibujar(LUPA, (x, W, H) => dibujarChat(x, W, H, l, 0.86, "38 participantes", 0.72)); } ponerGlobo(LUPA, cx, cy, s, objetivo, 1); }

// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves | null (inserto)]; cada clave [t, px, py, pz, mx, my, mz, fov]
// =====================================================================================================
const lerpV = (a, b, k) => a.map((v, i) => lerp(v, b[i], k));
const CAM = {
  P1a: [-0.95, 1.62, -0.75, 0.4, 1.8, -4.3, 60], P1z: [-0.88, 1.62, -0.95, 0.38, 1.8, -4.3, 58],
  Wa: [0.85, 3.05, -4.35, 0.05, -0.3, 0.8, 77], Wz: [0.84, 3.03, -4.25, 0.05, -0.28, 0.8, 76],
  P4a: [1.25, 1.95, -2.35, 0.0, 1.72, -4.35, 40], P4z: [1.15, 1.93, -2.55, 0.0, 1.74, -4.35, 38],
  P5a: [-0.42, 2.22, -4.98, 0.04, 1.3, -3.7, 42], P5z: [-0.38, 2.15, -4.88, 0.04, 1.3, -3.7, 40],
  P5c: [-0.6, 2.0, -2.2, 0.0, 1.55, -4.25, 50],
  Bb: [-1.0, 2.45, -3.65, 0.35, 0.95, 0.4, 60], Bz: [-0.85, 2.35, -3.4, 0.35, 0.95, 0.4, 58],
  Q1b: [40.7, 1.4, 2.3, 40.05, 1.12, -0.5, 50],
  Q3b: [0.15, 1.85, -4.2, 1.3, 1.25, -1.8, 54], Q3bz: [0.22, 1.83, -4.0, 1.3, 1.25, -1.8, 52],
  C: [-1.25, 1.95, -2.25, 0.08, 1.5, -4.35, 48], Cz: [-1.15, 1.93, -2.4, 0.08, 1.52, -4.35, 46],   // (r3 M4) 3/4: la bici, la tarima y la sala de costado; mira a cámara
};
const k2 = (a, b, ka, kb) => [[a, ...CAM[ka]], [b, ...CAM[kb]]];
const PLANOS = [
  ["P1", 0, k2(0, T.p1b, "P1a", "P1z")],
  ["P1b", T.p1b, null],
  ["P2", T.p2, k2(T.p2, T.p3, "Wa", "Wz")],
  // (r1) P3: el gag de cerca, push-in a la primera fila (la toalla en la 2, la botella en la 4, el celular en la 7)
  ["P3", T.p3, [[T.p3, 0.2, 3.1, -4.65, -0.35, -0.25, 1.0, 86], [T.p3i, 0.19, 3.08, -4.55, -0.35, -0.25, 1.0, 84]]],   // (r3 M3) más atrás: entran la 4 y la 9   // (r2) abierto: se cuentan las 5 bicis vacías con su objeto
  ["P3i", T.p3i, null],
  ["P4", T.p4, k2(T.p4, T.p5, "P4a", "P4z")],
  ["P5", T.p5, null],
  ["P5c", T.p5c, [[T.p5c, ...CAM.P5c], [T.p5b, ...lerpV(CAM.P5c, [-0.56, 1.98, -2.4, 0.0, 1.55, -4.25, 48], 1)]]],
  ["P5b", T.p5b, k2(T.p5b, P1, "Wz", "Wa")],
  ["Q1", P2, null],
  ["Q1b", T.q1b, [[T.q1b, ...CAM.Q1b], [T.q1c, ...lerpV(CAM.Q1b, [40.6, 1.38, 1.95, 40.05, 1.14, -0.5, 48], 1)]]],
  ["Q1c", T.q1c, null],
  ["Q1s", T.q1s, null],
  ["Q2", T.q2, null],
  ["Q2t", T.q2t, null],
  ["Q2s", T.q2s, null],
  ["Q3", T.q3, [[T.q3, 0.05, 3.12, -4.5, -0.5, -0.5, 1.0, 85], [T.q3b, 0.05, 3.1, -4.44, -0.5, -0.48, 1.0, 84]]],   // (r3 M1) entran la 4 y Sole
  ["Q3b", T.q3b, k2(T.q3b, T.q3c, "Q3b", "Q3bz")],
  ["Q3c", T.q3c, k2(T.q3c, T.q3d, "P4a", "P4z")],
  ["Q3d", T.q3d, [[T.q3d, 0.4, 1.75, -3.7, 1.3, 1.32, -1.8, 48], [T.q4, 0.46, 1.74, -3.5, 1.3, 1.34, -1.8, 45]]],   // (r2) plano corto: se pone la toalla y sonríe
  ["Q4", T.q4, null],
  ["C", T.c, k2(T.c, DUR, "C", "Cz")],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); }
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
const SEGURO = { ...CARA.neutra, ojos: { abiertos: 0.95, feliz: 0.1 }, cejas: { alto: 0.25, ang: 0.1, asim: 0 }, boca: { sonrisa: 0.25, abierta: 0, ancho: 1.0 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const FELIZ = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, boca: { sonrisa: 0.95, abierta: 0.05, ancho: 1.15 } };
const INCRE = { ...CARA.incredula, ojos: { abiertos: 0.85, tension: 0 }, cejas: { alto: 0.15, ang: 0.1, asim: 0.7 } };
const RESPIRA = { ...CARA.neutra, ojos: { abiertos: 0.04, feliz: 0 }, cejas: { alto: 0.35, ang: 0.35, asim: 0 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.85 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  { const h = sg(t, t0 - 0.12, t0) * (1 - sg(t, t0 + env.length / 30, t0 + env.length / 30 + 0.15)); if (h > 0) p.boca.sonrisa = lerp(p.boca.sonrisa, Math.min(p.boca.sonrisa, 0.08), h); }   // (r2) hablando, el arco de la sonrisa se apaga: no queda una segunda boca
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05 && !p.cierraHablando) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);   // hablando, nunca con los ojos cerrados
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
// (r3) el centro del puño (la mano cuelga 0,05 a lo largo del antebrazo): ahí va el asa
const punoMundo = (per, lado) => { per.raiz.updateMatrixWorld(true); const m = per.brazos[lado === "I" ? 0 : 1].mano; return m.localToWorld(new THREE.Vector3(0, -0.05, 0.005)); };
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const toW = (per, local) => { per.raiz.updateMatrixWorld(true); return per.cuerpo.localToWorld(V3(...local)); };
function manoA(per, p, lado, w, k, codo = null) { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "I" ? "manoI" : "manoD"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(cl(k)))); if (codo) p[lado === "I" ? "codoI" : "codoD"] = codo; }
const cabezaW = (per, local = [0, 0.25, 0]) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(...local)); };

// =====================================================================================================
// POSES
// =====================================================================================================
const INSERTOS = ["P1b", "P3i", "P5", "Q1", "Q1c", "Q1s", "Q2", "Q2t", "Q2s", "Q4"];
const CAD = 1.35;   // pedaladas por segundo (la música a 128)
const FASE0 = (n) => 1.1 + n * 0.83;
// sentado en la bici `b`: pies en los pedales (fase), manos al manubrio (si `manos`), el cuerpo un poco adelante
function enLaBici(per, b, t, base, { fase = 1.2, inclina = 0.1, manos = true, bob = 0 } = {}) {
  const al = per.cfg.alto ?? 1, ry = BICI.asiento - per.CADERA * al + 0.005, zh = -0.07;   // (r2) más atrás: las rodillas no tocan el manubrio
  const w = enBici(b, 0, ry, zh);
  const pz = (l) => { const [z, y] = pedalEn(fase, l); return [z - zh, y - ry]; };
  const p = poseEn(t, [[0, { ...base[0][1], x: w.x, y: w.y + bob, z: w.z, giro: b.rotation.y, sentado: 1, inclina }], ...base.slice(1)]);
  Object.assign(p, { x: w.x, y: w.y + bob, z: w.z, giro: b.rotation.y, sentado: 1, pies: { I: pz("I"), D: pz("D") } });
  if (manos) { const [my, mz] = BICI.manubrio; manoA(per, p, "I", enBici(b, 0.17, my + 0.03, mz - 0.01), 1, [0.9, -0.7, -0.4]); manoA(per, p, "D", enBici(b, -0.17, my + 0.03, mz - 0.01), 1, [-0.9, -0.7, -0.4]); }
  p.t = t; return p;
}
const pedaleo = (t, n, desde) => (t >= desde ? FASE0(n) + 2 * Math.PI * CAD * (t - desde) : FASE0(n));
const CONTENTO = { ...CARA.neutra, ojos: { abiertos: 0.95, y: 0.05, feliz: 0.15 }, cejas: { alto: 0.35, ang: 0.2, asim: 0 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1 } };
const ESPERA = [[0, { ...aC(0, -0.05), ...CONTENTO }]];
const pedalea = (t, n, desde, extra = {}) => { const f = pedaleo(t, n, desde), on = t >= desde; return { fase: f, inclina: on ? 0.26 : 0.1, bob: on ? Math.abs(Math.sin(f)) * 0.012 : 0, ...extra }; };
// la entrada de los nueve (P2): de la puerta caminando (cámara rápida) hasta el costado de la bici y el salto al asiento
const PUERTA_P = V3(XL + 0.35, 0, PUERTA.z);
function entrando(per, n, i, t) {
  const b = biciN(n), te = T.entra[i], ts = T.sienta[i];
  const costado = enBici(b, 0, 0, -0.72);   // detrás del asiento: sube por atrás (las piernas no cruzan el cuadro)
  if (t < ts - 0.16) {
    const u = sg(t, te, ts - 0.16), pos = PUERTA_P.clone().lerp(costado, eio(u));
    const g = dirGiro(PUERTA_P.x, PUERTA_P.z, costado.x, costado.z);
    const p = poseEn(t, [[0, { x: pos.x, z: pos.z, giro: g, ...aC(0, 0), ...CARA.sonrisa, ...BRAZOS.costado, paso: 1, pasoVel: 26 }]]);
    if (per === graciela) { p.manoI = [0.2, 0.05, 0.18]; }
    return p;
  }
  // el salto: de pie al costado → sentada
  const u = eio(sg(t, ts - 0.16, ts));
  const p = enLaBici(per, b, t, ESPERA, { fase: FASE0(n), manos: false });
  const al = per.cfg.alto ?? 1;
  Object.assign(p, { x: lerp(costado.x, p.x, u), y: lerp(0, p.y, u) + Math.sin(u * Math.PI) * 0.12, z: lerp(costado.z, p.z, u), sentado: u, giro: lerp(dirGiro(PUERTA_P.x, PUERTA_P.z, costado.x, costado.z), b.rotation.y, u) });
  if (u < 0.999) delete p.pies;
  return p;
}
// cada alumno en la parte 1 (P2-P5b) y en la parte 2 (Q3-Q3d)
function poseAlumno(per, n, i, t, pa) {
  const p2 = t >= P2;
  if (!p2 && pa === "P2" && t < T.sienta[i]) return entrando(per, n, i, t);
  const desde = p2 ? T.q3 - 2 : T.musica;
  const mira = 0.12 * Math.sin(n * 1.7);
  const base = [[0, { ...aC(mira, -0.05), ...CONTENTO }]];
  if (p2 || t >= T.musica) base.push([desde + 0.4, { ...aC(mira * 0.5, 0.05), ...CARA.sonrisa }, 0.3]);
  const p = enLaBici(per, biciN(n), t, base, pedalea(t, n, desde));
  // el que tira un perchero levanta la mano un momento
  const k = PERCH_DE.findIndex(([q]) => q === per);
  if (!p2 && k >= 0) { const tp = T.perchero[k], u = sg(t, tp - 0.2, tp) * (1 - sg(t, tp + 0.25, tp + 0.5)); if (u > 0) { const lado = PERCH_DE[k][1]; manoA(per, p, lado, enBici(biciN(n), lado === "I" ? 0.45 : -0.45, 1.45, 0.2), u, [lado === "I" ? 0.9 : -0.9, -0.3, -0.3]); } }
  return p;
}
function poseGraciela(t, pa) {
  const n = 1, p2 = t >= P2;
  if (!p2) return poseAlumno(graciela, n, 0, t, pa);
  // Q3: pedalea con la toalla en la mano izquierda; Q3b mira la bici 2 (ocupada), atrás (ocupada) y al profe; Q3d al cuello
  const gT = dirGiro(1.35, -1.8, PROFE.x, PROFE.z) - Math.PI;
  const base = [[0, { ...aC(0, 0.0), ...CARA.sonrisa, ojos: { abiertos: 1 } }],
    [T.g1 - 0.05, { ...aC(0.22, 0.0, 0.05), ...CARA.incredula, ojos: { abiertos: 0.95, x: 0.9 } }, 0.25],
    [T.g1 + LEN.g1 * 0.45, { ...aC(-0.2, -0.08, -0.05), ...CARA.incredula, ojos: { abiertos: 0.95, x: -0.9 } }, 0.3],
    [T.g1 + LEN.g1 * 0.85, { ...aC(-0.25, -0.18, 0.06), ...CARA.esperanza, cejas: { alto: 0.7, ang: 0.45 } }, 0.25],
    [T.cuello + 0.3, { ...aC(-0.1, -0.15, 0.08), ...CARA.feliz }, 0.25]];
  const p = enLaBici(graciela, biciN(n), t, base, pedalea(t, n, T.q3 - 2));
  if (t < T.cuello + 0.5) { const u = sg(t, T.q3b - 0.3, T.q3b); manoA(graciela, p, "I", enBici(biciN(n), 0.42, 1.45, 0.3), u, [0.9, -0.5, -0.3]); }
  // (r3 M2) al cuello: las dos manos suben con la toalla (0,25 s), la bajan por detrás del cuello agarrada de las puntas
  // (0,3 s, TOALLA_G_CUELLO baja con ellas), la acomodan sobre el pecho y vuelven al manubrio
  const tS = T.cuello, wC = sg(t, tS - 0.25, tS) * (1 - sg(t, tS + 0.5, tS + 0.75));
  if (wC > 0) {
    const e = eo(sg(t, tS, tS + 0.3)), sl = eio(sg(t, tS + 0.3, tS + 0.48));
    const y = lerp(0.42 + TOALLA_SUBE * (1 - e), 0.32, sl), z = 0.25, xx = lerp(0.12, 0.105, sl);
    graciela.poner(p); const wI = toW(graciela, [xx, y, z]), wD = toW(graciela, [-xx, y, z]);
    manoA(graciela, p, "I", wI, wC, [0.9, -0.4, -0.3]); manoA(graciela, p, "D", wD, wC, [-0.9, -0.4, -0.3]);
  }
  p.t = t; bocaVoz(p, t, T.g1, ENV.g1, 0.6); return p;
}
function poseMauro(t, pa) {
  const p2 = t >= P2;
  const b = BICI_P;
  if (!p2) {
    if (pa === "P1") {
      // el celular en las dos manos a la altura del pecho; mira el grupo, sonríe; en "Hoy explota" levanta la cabeza
      const base = [[0, { ...aC(-0.15, 0.3), ...CARA.sonrisa, ojos: { abiertos: 1, y: -0.45, feliz: 0.2 }, cejas: { alto: 0.5, ang: 0.3 } }],
        [T.m1 + 0.1, { ...aC(-0.35, 0.22, -0.04), ...CARA.sonrisa, ojos: { abiertos: 1, y: -0.3, x: -0.2 } }, 0.3],
        [T.m1 + LEN.m1 * 0.6, { ...aC(-0.5, 0.05, -0.06), ...CARA.feliz, ojos: { abiertos: 1, feliz: 0.4, x: -0.4 } }, 0.3]];
      const p = enLaBici(mauro, b, t, base, { fase: 1.2, inclina: 0.04, manos: false });
      Object.assign(p, { manoI: [0.09, 0.36, 0.33], manoD: [-0.09, 0.36, 0.33], codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] });
      p.t = t; bocaVoz(p, t, T.m1, ENV.m1, 0.6); return p;
    }
    if (pa === "P2" || pa === "P3") {
      // en la tarima, las manos en el manubrio, mira la sala: la sonrisa se le va apagando
      const base = [[0, { ...aC(0, -0.05), ...CARA.sonrisa }], [T.sienta[6], { ...aC(0.05, 0.0), ...CARA.sorpresa, boca: { sonrisa: 0.2, abierta: 0.1, ancho: 0.8 } }, 0.4], [T.perchero[2], { ...aC(0.0, 0.05), ...CARA.resignado }, 0.5]];
      return enLaBici(mauro, b, t, base, { fase: 1.2, inclina: 0.06 });
    }
    if (pa === "P4") {
      // la pausa: se acerca el micrófono con la izquierda; seco: "Los «yo voy» no pedalean." mirando a la sala
      const base = [[0, { ...aC(0.12, 0.08), ...CARA.resignado, ojos: { abiertos: 0.8, tension: 0.3 } }],
        [T.m3 - 0.05, { ...aC(0.05, 0.0), ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.1 }, cejas: { alto: 0.0, ang: -0.1, asim: 0.3 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.9 } }, 0.3],
        [T.m3 + T.FRASE2.m3, { ...aC(0.0, 0.04, -0.04), ...CARA.neutra, ojos: { abiertos: 0.8, tension: 0.15 }, cejas: { alto: 0.1, ang: -0.15, asim: 0.6 }, boca: { sonrisa: -0.3, abierta: 0, ancho: 0.9 } }, 0.2]];
      const p = enLaBici(mauro, b, t, base, { fase: 1.2, inclina: 0.04 });
      const u = sg(t, T.p4 + 0.05, T.p4 + 0.35) * (1 - sg(t, T.m3 + 0.25, T.m3 + 0.6));
      if (u > 0) manoA(mauro, p, "I", cabezaW(mauro, [0.36, 0.12, 0.12]), u, [1, -0.3, -0.2]);
      p.t = t; bocaVoz(p, t, T.m3, ENV.m3, 0.55); return p;
    }
    // P5 / P5c / P5b: las manos en el manubrio; vibra el celular, lo mira (incrédulo), lo da vuelta; arranca a pedalear
    const base = [[0, { ...aC(0, 0.3), ...CARA.neutra, ojos: { abiertos: 0.95, y: -0.5 } }],
      [T.v23 + 0.1, { ...aC(0.05, 0.3, 0.06), ...CARA.incredula, ojos: { abiertos: 0.8, y: -0.5 } }, 0.25],
      [T.vuelta + 0.4, { ...aC(0.0, 0.0), ...CARA.fastidio, cejas: { alto: -0.2, ang: -0.3 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.9 } }, 0.3],
      [T.musica + 0.4, { ...aC(0.0, -0.02), ...CARA.sonrisa }, 0.4]];
    const p = enLaBici(mauro, b, t, base, pedalea(t, 0, T.musica));
    const u = sg(t, T.vuelta - 0.25, T.vuelta) * (1 - sg(t, T.vuelta + 0.4, T.vuelta + 0.65));
    if (u > 0) { const fl = eio(sg(t, T.vuelta, T.vuelta + 0.32)); manoA(mauro, p, "I", enBici(b, 0.13, BICI.manubrio[0] + 0.12 + 0.08 * Math.sin(fl * Math.PI), BICI.manubrio[1] - 0.05 + 0.06 * fl), u, [0.9, -0.3, -0.4]); }   // (r2) la mano agarra el borde del celular y lo da vuelta
    return p;
  }
  // parte 2: la toalla al cuello, pedalea con la clase; Q3 "Catorce reservas. Pedalean catorce."; Q3c a Graciela; C a cámara
  const gG = dirGiro(PROFE.x, PROFE.z, 1.35, -1.8);
  const base = [[0, { ...aC(0.0, 0.0), ...CARA.sonrisa }],
    [T.m4, { ...aC(0.1, -0.02, 0.04), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.3 } }, 0.3],
    [T.m5 - 0.1, { ...aC(gG * 0.85, 0.05, 0.08), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35, x: 0.4 } }, 0.25],
    [T.c - 0.05, { ...aC(-0.45, 0.0, 0.03), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25, x: -0.25 }, cejas: { alto: 0.25, ang: 0.05 } }, 0.15]];   // (r3 M4) a la cámara de 3/4
  const p = enLaBici(mauro, b, t, base, pedalea(t, 0, T.q3 - 2, t >= T.c ? { inclina: 0.12, bob: 0.006 * Math.abs(Math.sin(pedaleo(t, 0, T.q3 - 2))) } : {}));
  p.respira = t >= T.c ? 2.2 : 1;
  p.t = t; bocaVoz(p, t, T.m4, ENV.m4, 0.55); bocaVoz(p, t, T.m5, ENV.m5, 0.55); bocaVoz(p, t, T.m6, ENV.m6, 0.6); return p;
}
function poseMajo(t, pa) {
  if (pa === "Q1b") {
    const base = [[0, { x: SOFA.x + 0.1, y: 0.57 - majo.CADERA * (majo.cfg.alto ?? 1), z: SOFA.z + 0.05, giro: 0, sentado: 1, ...aC(-0.05, 0.35), ...CARA.esperanza, ojos: { abiertos: 1, y: -0.6 }, ...BRAZOS.celular, manoI: [0.08, 0.36, 0.32], manoD: [-0.08, 0.36, 0.32], inclina: -0.05 }],
      [T.j2 + 0.05, { ...aC(0.1, 0.12, 0.06), ...CARA.sorpresa, ojos: { abiertos: 1, y: -0.2 }, cejas: { alto: 0.9, ang: 0.2 } }, 0.2],
      [T.j2 + T.FRASE2.j2, { ...aC(-0.05, 0.3, -0.05), ...CARA.feliz, ojos: { abiertos: 0.95, y: -0.5 } }, 0.2]];
    const p = poseEn(t, base); p.t = t; bocaVoz(p, t, T.j2, ENV.j2, 0.6); return p;
  }
  return enLaBici(majo, biciN(7), t, [[0, { ...aC(0.1, 0.0), ...CARA.feliz }]], pedalea(t, 7, T.q3 - 2));
}

// =====================================================================================================
// OBJETOS EN EL TIEMPO
// =====================================================================================================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
function enMano(obj, per, lado, rx = 0, ry = 0, rz = 0, dy = 0, dz = 0) { const m = manoMundo(per, lado, _a); per.cuerpo.getWorldQuaternion(_q); obj.position.copy(m); obj.quaternion.copy(_q); obj.rotateX(rx); obj.rotateY(ry); obj.rotateZ(rz); obj.translateY(dy); obj.translateZ(dz); }
function enBiciObj(obj, n, x, y, z, rx = 0, ry = 0, rz = 0) { const b = biciN(n); b.updateMatrixWorld(true); obj.position.copy(b.localToWorld(V3(x, y, z))); obj.quaternion.copy(b.quaternion); obj.rotateY(ry); obj.rotateX(rx); obj.rotateZ(rz); }
function ponerObjetos(t, pa) {
  const p2 = t >= P2, sala = !INSERTOS.includes(pa) && pa !== "Q1b";
  // los percheros: vuelan del vecino a la bici vacía y quedan; en la parte 2 no están
  PERCHEROS.forEach((o, i) => {
    o.visible = !p2 && sala && t >= T.perchero[i] - (i === 0 ? 99 : 0.02) && (pa !== "P2" || t >= T.sienta[0] || i !== 0);
    if (!o.visible) return;
    const [n, x, y, z, rx, ry, rz] = PERCH_FIN[i];
    enBiciObj(o, n, x, y, z, rx, ry, rz);
    const tp = T.perchero[i], u = sg(t, tp, tp + 0.27);
    if (u < 1) {
      const [q, lado] = PERCH_DE[i];
      if (i === 0 && t < tp) { enMano(o, graciela, "I", 0, 0, 0, -0.02, 0.03); o.scale.setScalar(0.85); return; }   // la toalla en la mano de Graciela
      const ini = manoMundo(q, lado, _b).clone(), fin = o.position.clone();
      o.position.copy(ini.lerp(fin, eio(u))); o.position.y += Math.sin(u * Math.PI) * 0.35; o.rotateX((1 - u) * 2.5);
    }
    const pop = sg(t, tp + 0.27, tp + 0.45); o.scale.setScalar([1, 1.7, 2.1, 0.75, 1.15][i] * (1 + 0.18 * Math.sin(pop * Math.PI)));   // (r1) objetos grandes: se leen de lejos
  });
  // el celular de Mauro: en las manos (P1), en el soporte (P5-P5b); lo da vuelta boca abajo en T.vuelta
  CEL_M.visible = (!p2 && (pa === "P1" || pa === "P5" || pa === "P5c" || pa === "P5b" || pa === "P4" || pa === "P2" || pa === "P3"));
  if (CEL_M.visible) {
    if (pa === "P1") { const a = manoMundo(mauro, "I", _a), b = manoMundo(mauro, "D", _b); mauro.cuerpo.getWorldQuaternion(_q); CEL_M.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.1, 0)); CEL_M.quaternion.copy(_q); CEL_M.rotateY(Math.PI); CEL_M.rotateX(0.75); CEL_M.translateZ(0.03); }
    else {
      const [my, mz] = BICI.manubrio; BICI_P.updateMatrixWorld(true);
      CEL_M.position.copy(BICI_P.localToWorld(V3(0, my + 0.1, mz - 0.03))); CEL_M.quaternion.copy(BICI_P.quaternion); CEL_M.rotateY(Math.PI); CEL_M.rotateX(-0.45);
      const vib = t > T.vibra && t < T.vibra + 0.4 ? Math.sin(t * 95) * 0.006 : 0; CEL_M.position.x += vib;
      if (pa === "P5c") { CEL_M.quaternion.copy(BICI_P.quaternion); CEL_M.rotateX(-1.05); CEL_M.translateZ(0.07); CEL_M.scale.setScalar(1.6); const u = eio(sg(t, T.vuelta, T.vuelta + 0.32)); if (u > 0) { CEL_M.translateY(0.06 * Math.sin(u * Math.PI)); CEL_M.rotateX(Math.PI * u); } }   // (r2) pantalla arriba; la da vuelta boca abajo contra el manubrio
      else CEL_M.scale.setScalar(1.2);
    }
  }
  // Graciela: la toalla en la mano en Q3/Q3b y al cuello desde Q3d
  const tc = T.cuello;
  TOALLA_G_MANO.visible = p2 && (pa === "Q3" || pa === "Q3b" || pa === "Q3c" || (pa === "Q3d" && t < tc));
  if (TOALLA_G_MANO.visible) enMano(TOALLA_G_MANO, graciela, "I", 0, 0, 0, -0.02, 0.02);
  TOALLA_G_CUELLO.visible = p2 && t >= tc && (pa === "Q3d" || pa === "Q4" || pa === "C");
  { const e = eo(sg(t, tc, tc + 0.3)); TOALLA_G_CUELLO.position.set(0, TOALLA_SUBE * (1 - e), -0.03 * (1 - e)); }   // (r3 M2) baja al cuello
  TOALLA_M_CUELLO.visible = p2 && t >= T.q3d;   // (r2) Mauro se la pone recién después de "En el cuello, Graciela."
  CEL_J.visible = pa === "Q1b";
  if (CEL_J.visible) { const a = manoMundo(majo, "I", _a), b = manoMundo(majo, "D", _b); majo.cuerpo.getWorldQuaternion(_q); CEL_J.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.13, 0.09)); CEL_J.quaternion.copy(_q); CEL_J.rotateY(Math.PI); CEL_J.rotateX(0.6); CEL_J.translateZ(0.04); CEL_J.scale.setScalar(1.35); }   // (r3 M5) más arriba de las manos: se ve
  // la puerta: se abre con la entrada y se cierra con el último
  puertaAbre(!p2 && pa === "P2" ? eio(sg(t, T.puerta, T.puerta + 0.25)) * (1 - eio(sg(t, T.cierra - 0.1, T.cierra + 0.2))) : 0);
  // el ventilador gira siempre; el reloj
  ASPAS.rotation.z = -t * 14;
  if (!p2) { if (t < T.p2) ponerReloj(18, 20); else if (t < T.cierra) ponerReloj(18, Math.min(59, 52 + Math.floor(sg(t, T.p2, T.cierra - 0.1) * 8))); else ponerReloj(19, t >= T.p5 ? 4 : t >= T.p3i ? 1 : 0); if (pa === "P2" && t >= T.cierra - 0.1) ponerReloj(19, 0); }
  else ponerReloj(19, 0);
  // las bicis: giran solo las ocupadas que pedalean
  BICIS.forEach((b, i) => { const n = i + 1, ocup = p2 || EN_BICI_1.some(([, m]) => m === n); ponerBici(b, ocup ? pedaleo(t, n, p2 ? T.q3 - 2 : T.musica) : FASE0(n)); });
  ponerBici(BICI_P, pedaleo(t, 0, p2 ? T.q3 - 2 : T.musica));
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  const living = pa === "Q1b";
  ponerLuz(living ? 40 : 0, living ? 0 : -1.4);
  dibujarInterfaz(t, pa);
  // quién se ve
  const enSala = !INSERTOS.includes(pa) && !living;
  for (const p of TODOS) p.raiz.visible = false;
  if (enSala) {
    if (!["Q3b", "Q3d", "P2", "P3", "P5b", "Q3"].includes(pa)) { mauro.raiz.visible = true; mauro.poner(poseMauro(t, pa)); }   // en Q3b/Q3d la cámara está al lado de él; en los gran planos quedaba cortado en el borde   // en Q3b/Q3d la cámara está en la tarima, al lado de Mauro
    const lista = p2 ? EN_BICI_2 : EN_BICI_1;
    lista.forEach(([per, n], i) => {
      if (!p2 && (t < T.p2 || (pa === "P2" && t < T.entra[i]))) return;   // 18:20: la sala vacía
      per.raiz.visible = true;
      if (per === graciela) per.poner(poseGraciela(t, pa));
      else if (per === majo) per.poner(poseMajo(t, pa));
      else per.poner(p2 ? enLaBici(per, biciN(n), t, [[0, { ...aC(0.1 * Math.sin(n), 0.0), ...CARA.sonrisa }]], pedalea(t, n, T.q3 - 2)) : poseAlumno(per, n, i, t, pa));
    });
  }
  if (living) { majo.raiz.visible = true; majo.poner(poseMajo(t, pa)); }
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (pa === "P5c") {   // (r2) primer plano del celular en el soporte, desde arriba: la pantalla con Nico y la mano que lo da vuelta
    const [my, mz] = BICI.manubrio, u = eo(sg(t, T.p5c, T.p5b)); BICI_P.updateMatrixWorld(true);
    const c = BICI_P.localToWorld(V3(-0.1, my + 0.78 - 0.06 * u, mz + 0.5 - 0.06 * u)), o = BICI_P.localToWorld(V3(0.03, my + 0.12, mz - 0.03));
    ponerCam([c.x, c.y, c.z, o.x, o.y, o.z, 40], t);
  }
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  caraL.intensity = pa === "C" ? 0.9 : 0; if (pa === "C") { caraL.position.copy(camera.position).add(V3(0.3, 0.6, 0)); caraL.target.position.set(0, 1.75, -4.35); caraL.target.updateMatrixWorld(); }
  ponerObjetos(t, pa);
  const ancho = ["P2", "P3", "P5b", "Q3"].includes(pa); BICI_P.visible = !ancho; if (ancho) CEL_M.visible = false;   // en los gran planos la bici del profe quedaba cortada abajo
  // ---- insertos ----
  const I = { P1b: INS.P1b, P3i: INS.P3i, P5: INS.P5, Q1: INS.Q1, Q1c: INS.Q1, Q1s: INS.Q1s, Q2: INS.Q2, Q2t: INS.Q2t, Q2s: INS.Q2s, Q4: INS.Q4 }[pa];
  for (const k in INS) INS[k].g.visible = INS[k] === I;
  if (I) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.4), kk = halfK();
    I.g.position.set(0, 0, -1); I.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
    if (pa === "P5" && t > T.vibra && t < T.vibra + 0.4) I.g.position.x += Math.sin(t * 90) * 0.004 * kk * PXK;   // vibra
  }
  for (const p of TODOS) if (p.raiz.visible) p.ojoLejano(camera.position);
  // ---- portada (VER=portada): la sala con los nueve y las cinco bicis de perchero, todo en la mitad de arriba ----
  if (VER === "portada") { ponerCam([0.7, 3.1, -4.75, 0.12, -1.0, 0.9, 82], t); camera.updateMatrixWorld(true); ponerObjetos(t, pa); CEL_M.visible = false; BICI_P.visible = false; for (const p of TODOS) if (p.raiz.visible) p.ojoLejano(camera.position); }
  // ---- tarjetas ----
  AVISOS.length = 0;
  for (const k in GL) GL[k].visible = false; for (const g of GUIAS) g.visible = false;
  for (const k in CONTADORES) CONTADORES[k].visible = false;
  for (const g of GUIAS) g.visible = false; for (const g of GUIAS5) g.visible = false; for (const a of ANILLOS) a.visible = false; LUPA.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t, pa);
  renderer.render(scene, camera);
}
function tarjetas(t, pa) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const yv = 14 + T.yv.filter((m) => t >= m).length;
  const vin = T.sienta.filter((m) => t >= m).length;
  if (pa === "P1") {
    ponerGlobo(GL.c1820, 250, 395, 1, null);
    const ult = T.yv.filter((m) => t >= m).at(-1);
    ponerContador([["YO VOY", yv, yv > 14 ? ROJO_CLARO : "#5ce611"], ["BICIS", 14, "#efeee5"]], 830, 340, 1, ult !== undefined ? 1 - sg(t, ult, ult + 0.15) : 0);   // (r2) más "yo voy" que bicis: en rojo
    CEL_M.updateMatrixWorld(true); const [px, py] = objPx(CEL_M);
    ponerLupa(t, 800, 1330, 1, [px, py]);
    if (t >= 0.66) ponerGlobo(GL.vendran, 235, 500, ent(0.66), null, 1);   // (r3 M8) 22 «yo voy» para 14 bicis
    if (t >= T.m1) { const g = t >= T.m1 + T.FRASE2.m1 ? GL.m1 : GL.m1a; const [hx, hy] = coronillaPx(mauro); ponerGlobo(g, 320, 660, ent(T.m1), [hx - 20, hy + 20], 2); }
  }
  if (pa === "P1b") {
    if (t >= T.j1 && t < T.llenaM + 0.3) ponerGlobo(GL.j1, 540, 195, ent(T.j1), null, 2);   // (r1) arriba del celular: no tapa mensajes
    if (t >= T.rotLlena) ponerGlobo(GL.rLlena, 540, 250, ent(T.rotLlena), null, 2);
  }
  if (pa === "P2" || pa === "P3") {
    if (pa !== "P2" || t >= T.cierra) ponerGlobo(GL.c1900, 250, 150, 1, null);   // (r2) mientras corre el reloj, sin chip
    const tres = t >= T.sienta[0] - 0.05;
    const filas = [["YO VOY", yv, ROJO_CLARO], ["BICIS", 14, "#efeee5"]]; if (tres) filas.push(["VINIERON", vin, ROJO_CLARO]);
    const ult = T.sienta.filter((m) => t >= m).at(-1);
    ponerContador(filas, 830, 90, 1, ult !== undefined && pa === "P2" ? 1 - sg(t, ult, ult + 0.15) : 0);
    if (pa === "P3") {
      // (r2) plano abierto: "5 bicis vacías" abajo, con una guía a cada objeto (se cuentan); "Bici 2: perchero" a la toalla
      // (r3 M3) "Bici 2: perchero" con su guía recta a la toalla; "5 bicis vacías" abajo y un aro en cada objeto (sin guías cruzadas)
      const aros = PERCHEROS.map((o, i) => { const [ox, oy] = objPx(o, V3(0, [-0.1, 0.1, 0.05, -0.1, 0][i], 0)); o.getWorldPosition(_v2); const d = _v2.distanceTo(camera.position); return [ox, oy, cl(230 / d, 30, 78) * (d > 5 ? 0.85 : 1)]; });
      if (t >= T.rotPerch) { const [tx, ty, tr] = aros[0], u0 = sg(t, T.rot5, T.rot5 + 0.2); ponerGlobo(GL.rPerch, tx + 40, 1470, ent(T.rotPerch), null, 1); ponerGuia(GUIAS5[5], tx, 1470 - GL.rPerch.userData.H / 2, tx, lerp(ty + 20, ty + tr * 1.22, u0), eo(sg(t, T.rotPerch, T.rotPerch + 0.2))); }   // con el aro, la guía termina en su borde
      if (t >= T.rot5) { ponerGlobo(GL.r5, 540, 1700, ent(T.rot5), null, 2); aros.forEach(([ox, oy, r], i) => ponerAnillo(ANILLOS[i], ox, oy, r, sg(t, T.rot5 + i * 0.12, T.rot5 + 0.2 + i * 0.12))); }
    }
  }
  if (pa === "P3i") ponerGlobo(GL.rCosto, 540, 60 + GL.rCosto.userData.H / 2, ent(T.rotCosto), null, 2);   // (r3 B5) arriba, sin el chip: no tapa "Llena, Majo."
  if (pa === "P4" && t >= T.m3) hablar(t >= T.m3 + T.FRASE2.m3 ? GL.m3 : GL.m3a, mauro, ent(T.m3), 1, 0, 200);
  if (pa === "P5" || pa === "P5c" || pa === "P5b") {
    ponerGlobo(GL.c1904, 200, 150, 1, null);
    const v = t >= T.v23 ? 23 : 22, pop = t >= T.v23 ? 1 - sg(t, T.v23, T.v23 + 0.25) : 0;
    ponerContador([["YO VOY", v, ROJO_CLARO], ["BICIS", 14, "#efeee5"], ["VINIERON", 9, ROJO_CLARO]], 830, 90, 1, pop);
  }
  if (pa === "Q1" || pa === "Q1b" || pa === "Q1c") ponerGlobo(GL.c2130, 250, 130, 1, null);
  if (pa === "Q1b" && t >= T.j2) hablar(t >= T.j2 + T.FRASE2.j2 ? GL.j2 : GL.j2a, majo, ent(T.j2), 1, 0, 200);
  if (pa === "Q1c") ponerGlobo(GL.rCupo, 600, 1800, ent(T.reserva7 + 0.1), null, 2);
  if (pa === "Q1s") { ponerGlobo(GL.c2130, 250, 130, 1, null); ponerGlobo(GL.rEspera, 600, 1800, ent(T.q1s + 0.1), null, 2); }
  if (pa === "Q2" || pa === "Q2t" || pa === "Q2s") ponerGlobo(GL.c1500, 250, 130, 1, null);
  if (pa === "Q2") ponerGlobo(GL.rRecuerda, 540, 1800, ent(T.recuerda + 0.15), null, 2);
  if (pa === "Q2t" || pa === "Q2s") ponerGlobo(GL.rLibera, 540, 1780, ent(T.q2t + 0.15), null, 2);
  if (pa === "Q2s" && t >= T.otraVez) ponerGlobo(GL.otraVez, 540, 260, ent(T.otraVez), null, 3);
  if (pa === "Q3" || pa === "Q3b" || pa === "Q3c" || pa === "Q3d") {
    ponerGlobo(GL.c1900, 250, 150, 1, null);
    if (pa === "Q3") ponerContador([["RESERVAS", 14, "#5ce611"], ["VINIERON", 14, "#5ce611"]], 830, 90, 1, 0);
    if (pa === "Q3" && t >= T.m4) ponerGlobo(t >= T.m4 + T.FRASE2.m4 ? GL.m4 : GL.m4a, 540, 1600, ent(T.m4), null, 1);   // por los parlantes: abajo, sin cola
    // (r1) el callback de la plata: Majo en la 7 y Sole en la 4, las dos que en la parte 1 se fueron
    // (r3 M1) los rótulos abajo (entre las bicis y la burbuja) y la guía sube al pecho: no cruzan caras
    if (pa === "Q3" && t >= T.m4 + 0.2) for (const [g, per, gi, dx] of [[GL.rMajo, majo, 0, Q3_DX[0]], [GL.rSole, sole, 1, Q3_DX[1]]]) { const [hx, hy] = enPantalla(toW(per, [0, 0.3, 0.16])); const lx = cl(hx + dx, 160, 900), ly = Q3_LY; ponerGlobo(g, lx, ly, ent(T.m4 + 0.2 + gi * 0.15), null, 2); ponerGuia(GUIAS[gi], hx, ly - g.userData.H / 2, hx, hy, eo(sg(t, T.m4 + 0.25, T.m4 + 0.5))); }
    if (pa === "Q3b" && t >= T.g1) hablar(GL.g1, graciela, ent(T.g1), 1, 0, 300);
    if (pa === "Q3c" && t >= T.m5) hablar(GL.m5, mauro, ent(T.m5), 1, 0, 300);
  }
  if (pa === "Q4") { ponerGlobo(GL.cNov, 250, 130, 1, null); ponerGlobo(GL.rPanel, 600, 1790, ent(T.q4 + 0.1), null, 2); }
}
window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cel: [CEL_M.visible, CEL_M.position.toArray().map((v) => +v.toFixed(2)), CEL_M.scale.x], celJ: [CEL_J.visible, CEL_J.position.toArray().map((v) => +v.toFixed(2)), CEL_J.scale.x], cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
