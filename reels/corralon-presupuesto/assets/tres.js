// Capa 3D de corralon-presupuesto (Three.js r170 local). Base técnica: reels/ferreteria-encargo y reels/corralon-portland
// (el mismo galpón "Materiales Gustavo", globos pegados a la cámara en píxeles de pantalla, avatares por render target,
// poses por claves, bocas por envolvente, PLANOS con Catmull-Rom, insertos a pantalla) y la forma de reels/taller-service
// (globos en dos tiempos con CORTE). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// Tres lugares (y uno chico):
//   - EL GALPÓN (origen): el mostrador de Materiales Gustavo. Sábado de mañana (cielo crema plano por el portón) y, en P2,
//     domingo de noche: el portón bajado, una sola lámpara de brazo, fondo navy plano.
//   - LA CALLE (x = XC): la fachada del corralón con el portón y el cartel, la vereda, la calle y, enfrente, la obra de
//     Mónica (terreno, cimientos, primeras hiladas de ladrillo, arena, andamio, cartel de obra en blanco). Ahí descarga
//     el camión gris sin nombre (P4) y el camión navy de MATERIALES GUSTAVO (Q5).
//   - EL TABLERO del camión gris (x = XT): la hoja "MATERIALES GUSTAVO · PRESUPUESTO" apoyada en el parabrisas, tachada.
//   PARTE 1: Mónica desenrolla la lista de materiales que cae hasta el piso: "Gustavo, ¿me pasás presupuesto? Es toda la
//            casa." / "Te lo armo para el lunes." · domingo de noche: la calculadora de rollo y la cinta que llega al piso
//            (19:10 → 21:30 → 23:20, "1.260.000"), Enviado → Visto · jueves, Tito: "Gustavo, ¿la de la casa te compró?" /
//            "Yo no ando persiguiendo a nadie." · tres semanas después, el camión gris descarga enfrente: "¡Gustavo!
//            ¡Arrancamos la casa!" / "El de la otra cuadra me escribió todos los días. ¡Un pesado!" / pausa / "Por lo
//            menos yo no fui pesado." / "¡Y gracias por tu presupuesto! Se lo pasé a él." · la hoja tachada en el tablero.
//   PARTE 2: el mismo pedido: "Te lo armo ahora." (la tablet con la lista de precios) · el presupuesto con botones en el
//            celular de Mónica · a los 2 días el aviso de seguimiento con el mensaje listo · "¡Ay, qué atentos!" · Aceptar
//            · Tito: "¿La de la casa te compró?" / el panel "Presupuestos abiertos" / "Compró. Con un botón." · el camión
//            navy descarga enfrente: "Ya sé. Es mi camión." · Tito guarda la cinta en el cajón · "Comentá PRESUPUESTO…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearTablet, crearMate, crearTermo } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, CORTE, LIMPIO, VER } from "./tiempos3d.js";
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
scene.background = new THREE.Color(0xe4dfcf);   // la luz de media mañana por el portón: crema plano, sin degradé
const camera = new THREE.PerspectiveCamera(46, 1080 / 1920, 0.02, 200);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x5a5e66);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(10, 1.2, 0, 7, 0, 0, 0xf4f2ea, 1.4);
  tira(4, 6, 0, 2, -6, 0, 0xf6f0e2, 1.2);
  tira(1.4, 8, -4, 1, 6, 0, 0xe8eeff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.5;

// ---------- luces: los tubos del galpón, la luz de día que entra por el portón ----------
const sol = new THREE.DirectionalLight(0xfff4e2, 1.35);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 30 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xf7f4ea, 0x8a8678, 1.75); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xf4f6ff, 0.8); relleno.position.set(1.5, 3.6, 9); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xfff6e6, 0.45); rim.position.set(-4, 5, -10); scene.add(rim);
function ponerSol(cx, cz) { sol.position.set(cx + 4, 6.5, cz + 5); sol.target.position.set(cx, 0.6, cz); sol.target.updateMatrixWorld(); }

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, gp: 0xcfeebc, red: 0xc7655b, blanco: 0xf8f7f2, metal: 0xc4c8cf };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.75), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.75), cr2: mat(C.cr2, 0.75), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  blanco: mat(C.blanco, 0.85), metal: mat(0xbfc3c9, 0.45, { metalness: 0.35 }), gris: mat(0xa9adb3, 0.55, { metalness: 0.2 }), goma: mat(0x23262c, 0.85),
  madera: mat(0xb98d5e, 0.8), mesada: mat(0xb08a5e, 0.75), marco: mat(0x8a6542, 0.8), kraft: mat(0xe8dcc0, 0.85), piso: mat(0xd9d7c9, 0.8),
  bronce: mat(0xb08a4a, 0.45, { metalness: 0.35 }), pvc: mat(0xeceae2, 0.5), carton: mat(0xd6bf8e, 0.85), cinta: mat(0xc9a86a, 0.5),
};
M.chapa = mat(0x1f3254, 0.5, { metalness: 0.25 }); M.onda = mat(0x2c4268, 0.45, { metalness: 0.25 });
M.tierra = mat(0xcfc9b6, 0.95); M.arena = mat(0xd8c7a0, 0.95, { flatShading: true });
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.0005, h / 2 - 0.0005, d / 2 - 0.0005));
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
const cil = (r1, r2_, h, m, seg = 20) => mesh(new THREE.CylinderGeometry(r1, r2_, h, seg), m);
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
// EL GALPÓN (corralon-portland / ferreteria-encargo): el mostrador de Materiales Gustavo
// =====================================================================================================
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
const SET = new THREE.Group(); scene.add(SET);
M.pallet = mat(0xb98d5e, 0.85); M.asfalto = mat(0x4a505c, 0.95); M.vereda = mat(0xd9d7c9, 0.9); M.hormigon = mat(0xc9c6bb, 0.9);
const ZF = -1.6, HW = 4.6;                          // la pared del fondo (chapa) y el alto del galpón
const PORTON = { x0: 0.9, x1: 3.5, alto: 3.0 };     // el portón al patio (a la derecha de Gustavo)
const MOS = { x0: -2.6, x1: 0.75, alto: 1.0, z0: -0.33, z1: 0.33 };   // el mostrador
const Y = MOS.alto;
const G0 = { x: -0.95, z: -0.66 };                   // Gustavo atrás del mostrador
function chapa(grupo, w, h, cx, cy, ondas = true, m = M.chapa, mo = M.onda) {
  const g = new THREE.Group(); g.position.set(cx, cy, 0); grupo.add(g);
  const b = mesh(new THREE.BoxGeometry(w, h, 0.06), m, 0, 0, 0); b.castShadow = false; g.add(b);
  if (ondas) for (let x = -w / 2 + 0.08; x < w / 2 - 0.04; x += 0.16) { const o = mesh(new THREE.BoxGeometry(0.055, h, 0.04), mo, x, 0, 0.045); o.castShadow = false; g.add(o); }
  return g;
}
const cartelT = lienzo(1400, 270, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "MATERIALES GUSTAVO", 800, 170, w - 90); x.fillText("MATERIALES GUSTAVO", w / 2, h / 2 - 4); x.fillStyle = "#5ce611"; x.fillRect(90, h - 36, w - 180, 16); });
const PRECIOS = [["PORTLAND 25 kg", "$ 520"], ["LADRILLO CAMPO", "$ 38"], ["ARENA GRUESA m³", "$ 2.400"], ["HIERRO DEL 8", "$ 380"]];
const pizarraT = lienzo(1520, 800, (x, w, h) => {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "rgba(239,238,229,0.07)"; for (const [cx, cy, r] of [[300, 200, 160], [1100, 520, 200], [700, 700, 150]]) { x.beginPath(); x.ellipse(cx, cy, r, r * 0.5, 0.3, 0, 7); x.fill(); }
  x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.textAlign = "center"; x.font = CAV(110); x.fillText("PRECIOS", w / 2, 92);
  x.strokeStyle = "#efeee5"; x.lineWidth = 6; x.beginPath(); x.moveTo(w / 2 - 210, 150); x.lineTo(w / 2 + 210, 152); x.stroke();
  PRECIOS.forEach(([a, b], i) => { const y = 250 + i * 150; x.textAlign = "left"; x.font = CAV(96); x.fillText(a, 60, y); x.textAlign = "right"; x.font = CAV(110); x.fillStyle = "#5ce611"; x.fillText(b, w - 60, y); x.fillStyle = "#efeee5"; });
});
// ---- las bolsas de portland (de corralon-portland): papel kraft con la franja navy "PORTLAND · 25 kg", sin marca ----
const BOL = { w: 0.58, h: 0.135, d: 0.38 };
const bolsaLadoT = lienzo(1160, 270, (x, w, h) => { x.fillStyle = "#e8dcc0"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; x.fillRect(0, h * 0.28, w, h * 0.44); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "PORTLAND · 25 kg", 800, 92, w - 120); x.fillText("PORTLAND · 25 kg", w / 2, h / 2 + 4); });
const bolsaTapaT = lienzo(1160, 760, (x, w, h) => {
  x.fillStyle = "#e8dcc0"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#1f3254"; x.fillRect(0, h * 0.34, w, h * 0.32);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "PORTLAND", 900, 190, w - 160); x.fillText("PORTLAND", w / 2, h / 2 + 8);
  x.fillStyle = "#1f3254"; x.font = F(800, 110); x.fillText("25 kg", w / 2, h * 0.84);
});
const MB = { lado: new THREE.MeshStandardMaterial({ map: bolsaLadoT, roughness: 0.85 }), tapa: new THREE.MeshStandardMaterial({ map: bolsaTapaT, roughness: 0.85 }) };
const geoBolsa = rbox(BOL.w, BOL.h, BOL.d, 0.055, 3);
function crearBolsaPortland() { const m = new THREE.Mesh(geoBolsa, [M.kraft, M.kraft, MB.tapa, M.kraft, MB.lado, MB.lado]); m.castShadow = true; m.receiveShadow = true; return m; }
// ---- ladrillos de campo (terracota apagado: el único color cálido) ----
M.ladrillo = mat(0xb5694f, 0.85); M.ladrillo2 = mat(0xa45d45, 0.85); M.junta = mat(0xd8d2c0, 0.95);
const LAD = { w: 0.24, h: 0.055, d: 0.115 };
const geoLad = rbox(LAD.w, LAD.h, LAD.d, 0.006, 1);
function crearPalletLadrillos(filas = 6, cols = 4, prof = 8) {
  const g = new THREE.Group();
  for (const z of [-0.45, 0, 0.45]) g.add(caja(1.0, 0.035, 0.12, M.pallet, 0, 0.125, z, 0.008));
  for (const x of [-0.42, 0, 0.42]) g.add(caja(0.1, 0.09, 1.0, M.pallet, x, 0.06, 0, 0.008));
  // los ladrillos en bloque (una caja por hilada con la textura de las juntas: liviano para SwiftShader)
  const ladT = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#d8d2c0"; x.fillRect(0, 0, w, h); for (let f = 0; f < 4; f++) for (let c = -1; c < 4; c++) { x.fillStyle = (f + c) % 3 ? "#b5694f" : "#a45d45"; x.fillRect(c * 128 + (f % 2) * 64 + 5, f * 64 + 5, 118, 54); } });
  const mL = new THREE.MeshStandardMaterial({ map: ladT, roughness: 0.85 });
  const b = mesh(new THREE.BoxGeometry(cols * LAD.w, filas * LAD.h, prof * LAD.d), [mL, mL, M.ladrillo, M.ladrillo, mL, mL], 0, 0.145 + (filas * LAD.h) / 2, 0); g.add(b);
  return sombras(g);
}
{
  const piso = mesh(new THREE.PlaneGeometry(12, 11), M.piso, 0.5, 0, ZF + 5.5); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  const pat = mesh(new THREE.PlaneGeometry(40, 30), M.tierra, 2, -0.004, ZF - 15); pat.rotation.x = -Math.PI / 2; pat.castShadow = false; SET.add(pat);
  const fondo = new THREE.Group(); fondo.position.z = ZF; SET.add(fondo);
  chapa(fondo, PORTON.x0 + 5.0, HW, (PORTON.x0 - 5.0) / 2, HW / 2);
  chapa(fondo, 6.2 - PORTON.x1, HW, (PORTON.x1 + 6.2) / 2, HW / 2);
  chapa(fondo, PORTON.x1 - PORTON.x0, HW - PORTON.alto, (PORTON.x0 + PORTON.x1) / 2, (HW + PORTON.alto) / 2);
  for (const [x, ry] of [[-5.0, Math.PI / 2], [6.2, -Math.PI / 2]]) { const g = new THREE.Group(); g.position.set(x, 0, ZF + 5); g.rotation.y = ry; SET.add(g); chapa(g, 10, HW, 0, HW / 2); }
  const techo = mesh(new THREE.PlaneGeometry(12, 11), new THREE.MeshBasicMaterial({ color: 0x16243d }), 0.6, HW, ZF + 5.5); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
  for (const z of [ZF + 0.4, 1.4, 4.0]) {
    SET.add(caja(11.2, 0.14, 0.12, M.navy3, 0.6, HW - 0.45, z, 0.01)); SET.add(caja(11.2, 0.1, 0.1, M.navy3, 0.6, HW - 0.08, z, 0.01));
    for (let i = 0; i < 9; i++) { const x = -4.4 + i * 1.25; const d = caja(0.07, 0.5, 0.07, M.navy3, x + 0.3, HW - 0.26, z, 0.01); d.rotation.z = i % 2 ? 0.9 : -0.9; SET.add(d); }
  }
  // el cartel "MATERIALES GUSTAVO" arriba y el pizarrón de precios detrás de Gustavo
  SET.add(caja(2.06, 0.42, 0.04, M.navy, -1.1, 3.25, ZF + 0.08, 0.02)); SET.add(plano(1.96, 0.36, cartelT, -1.1, 3.25, ZF + 0.105));
  SET.add(caja(1.98, 1.1, 0.05, M.marco, -1.05, 2.25, ZF + 0.07, 0.02)); SET.add(plano(1.86, 0.98, pizarraT, -1.05, 2.25, ZF + 0.1));
  SET.add(caja(1.7, 0.04, 0.08, M.marco, -1.05, 1.68, ZF + 0.12, 0.01)); SET.add(caja(0.09, 0.025, 0.025, M.cr, -0.6, 1.715, ZF + 0.12, 0.01));
  // el portón: marco navy3 y la hoja enrollada arriba; el umbral verde
  for (const x of [PORTON.x0 - 0.08, PORTON.x1 + 0.08]) SET.add(caja(0.16, PORTON.alto + 0.1, 0.3, M.navy3, x, (PORTON.alto + 0.1) / 2, ZF + 0.04, 0.02));
  SET.add(caja(PORTON.x1 - PORTON.x0 + 0.32, 0.16, 0.3, M.navy3, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto + 0.04, ZF + 0.04, 0.02));
  { const rollo = mesh(new THREE.CylinderGeometry(0.22, 0.22, PORTON.x1 - PORTON.x0 + 0.2, 28), M.cr, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto - 0.16, ZF + 0.38); rollo.rotation.z = Math.PI / 2; SET.add(rollo); }
  { const f = mesh(new THREE.PlaneGeometry(PORTON.x1 - PORTON.x0, 0.12), new THREE.MeshBasicMaterial({ color: C.g }), (PORTON.x0 + PORTON.x1) / 2, 0.004, ZF + 0.12); f.rotation.x = -Math.PI / 2; f.castShadow = false; SET.add(f); }
  // la pared del frente (detrás de los clientes): chapa navy
  { const fr = new THREE.Group(); fr.position.z = 4.2; fr.rotation.y = Math.PI; SET.add(fr); chapa(fr, 11.2, HW, -0.6, HW / 2); }
  // adentro, a la izquierda de Gustavo: un pallet de portland contra la pared y los hierros parados
  { const p = new THREE.Group(); p.position.set(-3.6, 0, ZF + 0.75); SET.add(p);
    for (const z of [-0.45, 0, 0.45]) p.add(caja(1.22, 0.035, 0.12, M.pallet, 0, 0.125, z, 0.008)); for (const x of [-0.52, 0, 0.52]) p.add(caja(0.1, 0.09, 1.0, M.pallet, x, 0.06, 0, 0.008));
    for (let k = 0; k < 6; k++) for (const [x, z, ry] of (k % 2 ? [[-0.3, -0.2, 0], [0.3, -0.2, 0], [-0.3, 0.2, 0], [0.3, 0.2, 0]] : [[-0.39, 0, Math.PI / 2], [0, 0, Math.PI / 2], [0.39, 0, Math.PI / 2]])) { const b = crearBolsaPortland(); b.position.set(x, 0.142 + BOL.h / 2 + k * BOL.h * 0.97, z); b.rotation.y = ry; p.add(b); } }
  for (let i = 0; i < 11; i++) { const b = mesh(new THREE.CylinderGeometry(0.012, 0.012, 3.2, 6), M.navy3, -4.6 + i * 0.05, 1.6, ZF + 0.25 + (i % 2) * 0.05); b.rotation.z = 0.12; SET.add(b); }
  // el patio de día por el portón: arena, un pallet de ladrillos, el muro
  const ar = mesh(new THREE.ConeGeometry(1.35, 1.05, 9), M.arena, 3.6, 0.52, -6.6); ar.rotation.y = 0.4; SET.add(ar);
  { const pl = crearPalletLadrillos(); pl.position.set(2.0, 0, -3.6); pl.rotation.y = 0.2; SET.add(pl); }
  SET.add(caja(40, 1.25, 0.25, M.cr3, 2, 0.62, -11.5, 0.02));
}
// ---- el mostrador: mesada de madera, frente de chapa navy3 con el canto verde; el cajón del lado de Gustavo ----
const CAJ = { x: -1.55, y: Y - 0.13, w: 0.5, h: 0.13, d: 0.42 };
{
  const g = new THREE.Group(); SET.add(g);
  const L = MOS.x1 - MOS.x0, cx = (MOS.x0 + MOS.x1) / 2, P = MOS.z1 - MOS.z0;
  g.add(caja(L + 0.08, 0.07, P + 0.08, M.mesada, cx, MOS.alto - 0.035, 0, 0.015));
  const fr = new THREE.Group(); fr.position.z = MOS.z1 - 0.01; g.add(fr); chapa(fr, L - 0.02, MOS.alto - 0.08, cx, (MOS.alto - 0.08) / 2);
  // el cuerpo, con el hueco del cajón del lado de Gustavo (-z)
  const xa = CAJ.x - CAJ.w / 2 - 0.02, xb = CAJ.x + CAJ.w / 2 + 0.02;
  g.add(caja(xa - MOS.x0 - 0.02, MOS.alto - 0.08, P - 0.08, M.navy3, (MOS.x0 + 0.02 + xa) / 2, (MOS.alto - 0.08) / 2, -0.02, 0.02));
  g.add(caja(MOS.x1 - 0.02 - xb, MOS.alto - 0.08, P - 0.08, M.navy3, (xb + MOS.x1 - 0.02) / 2, (MOS.alto - 0.08) / 2, -0.02, 0.02));
  g.add(caja(xb - xa, CAJ.y - 0.08 - 0.02, P - 0.08, M.navy3, CAJ.x, (CAJ.y - 0.1) / 2, -0.02, 0.02));
  g.add(caja(xb - xa, 0.03, P - 0.08, M.navy, CAJ.x, CAJ.y - CAJ.h / 2 - 0.02, -0.02, 0.005));
  g.add(caja(L + 0.02, 0.06, 0.05, M.g, cx, MOS.alto - 0.11, MOS.z1 + 0.075, 0.01));
}
fusionar(SET);
// el cajón de madera (sale hacia Gustavo, -z)
const CAJON = new THREE.Group(); scene.add(CAJON);
{
  const m = M.madera, e = 0.016, { w, h, d } = CAJ;
  CAJON.add(caja(w, e, d, m, 0, -h / 2 + e / 2, 0, 0.003));
  for (const s of [-1, 1]) { CAJON.add(caja(e, h, d, m, s * (w / 2 - e / 2), 0, 0, 0.003)); CAJON.add(caja(w, h, e, m, 0, 0, s * (d / 2 - e / 2), 0.003)); }
  CAJON.add(caja(w + 0.03, h + 0.02, 0.02, M.navy3, 0, 0, -d / 2 - 0.01, 0.004));
  CAJON.add(caja(0.12, 0.02, 0.03, M.cr, 0, 0.01, -d / 2 - 0.03, 0.006));
  // adentro: dos biromes y un talonario (para que el cajón no esté vacío)
  CAJON.add(caja(0.14, 0.02, 0.2, M.cr, -0.12, -h / 2 + 0.03, 0.05, 0.004)); CAJON.add(caja(0.14, 0.008, 0.05, M.navy3, -0.12, -h / 2 + 0.042, -0.02, 0.003));
  sombras(CAJON);
}
const ponerCajon = (abre) => { CAJON.position.set(CAJ.x, CAJ.y - 0.02, -0.02 - abre * 0.42); };
// ---- el portón bajado y la lámpara de brazo (P2: el domingo de noche) ----
const NOCHE = new THREE.Group(); scene.add(NOCHE);
{
  const pb = new THREE.Group(); pb.position.set((PORTON.x0 + PORTON.x1) / 2, PORTON.alto / 2, ZF + 0.2); NOCHE.add(pb);
  pb.add(caja(PORTON.x1 - PORTON.x0 + 0.1, PORTON.alto, 0.04, M.navy3, 0, 0, 0, 0.005));
  for (let y = -PORTON.alto / 2 + 0.1; y < PORTON.alto / 2; y += 0.12) pb.add(caja(PORTON.x1 - PORTON.x0 + 0.1, 0.03, 0.03, M.edge, 0, y, 0.03, 0.005));
  sombras(NOCHE);
}
const LAMPARA = new THREE.Group(); scene.add(LAMPARA);
const FOCO_M = new THREE.MeshStandardMaterial({ color: 0xfff6dc, emissive: 0xfff0c8, emissiveIntensity: 2.2, roughness: 0.3 });
{
  const m = M.cr, base = cil(0.09, 0.1, 0.025, M.navy3, 24); base.position.y = 0.012; LAMPARA.add(base);
  const b1 = caja(0.022, 0.46, 0.022, m, 0, 0.24, 0, 0.008); b1.rotation.x = 0.35; b1.position.z = 0.08; LAMPARA.add(b1);
  const b2 = caja(0.022, 0.4, 0.022, m, 0, 0.5, 0.28, 0.008); b2.rotation.x = 1.55; LAMPARA.add(b2);
  const pant = mesh(new THREE.ConeGeometry(0.11, 0.15, 24, 1, true), m.clone(), 0, 0.44, 0.48); pant.material.side = THREE.DoubleSide; pant.rotation.x = -0.15; LAMPARA.add(pant);
  const foco = mesh(new THREE.SphereGeometry(0.04, 16, 12), FOCO_M, 0, 0.4, 0.49); foco.castShadow = false; LAMPARA.add(foco);
  sombras(LAMPARA); foco.castShadow = false;
}

// =====================================================================================================
// LOS OBJETOS DEL MOSTRADOR
// =====================================================================================================
// ---- tiras de papel que siguen un camino (la lista de materiales de Mónica y la cinta de la calculadora) ----
// El camino vive en un plano x = cte (la tira se dobla en y-z): una lista de puntos [z, y] cada ~1 cm con su largo
// acumulado. La malla se rehace cuando cambia el largo visible (redondeado).
function caminoDe(tramos) {
  const P = [];
  for (const f of tramos) { const n = f.n ?? 40; for (let i = P.length ? 1 : 0; i <= n; i++) P.push(f.p(i / n)); }
  const S = [0]; for (let i = 1; i < P.length; i++) S.push(S[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  return { P, S, L: S[S.length - 1] };
}
function enCamino(c, s) {
  s = cl(s, 0, c.L); let i = 0, j = c.S.length - 1; while (j - i > 1) { const k = (i + j) >> 1; if (c.S[k] <= s) i = k; else j = k; }
  const u = (s - c.S[i]) / Math.max(1e-6, c.S[j] - c.S[i]); const a = c.P[i], b = c.P[j];
  return [lerp(a[0], b[0], u), lerp(a[1], b[1], u), Math.atan2(b[1] - a[1], b[0] - a[0])];
}
function crearTira(ancho, tex, N = 220) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array((N + 1) * 2 * 3), uv = new Float32Array((N + 1) * 2 * 2), idx = [];
  for (let i = 0; i < N; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  geo.setIndex(idx); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, side: THREE.DoubleSide }));
  m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false;
  let clave = "";
  // s0..s1 del camino; vDe(s) da la coordenada de textura a lo largo; despegue: cuánto se separa del camino hacia la normal
  m.userData.poner = (c, x0, s0, s1, vDe, k = "") => {
    const kk = `${r2(s0 * 100)}:${r2(s1 * 100)}:${k}`; if (kk === clave) return; clave = kk;
    for (let i = 0; i <= N; i++) {
      const s = lerp(s0, s1, i / N); const [z, y] = enCamino(c, s); const v = vDe(s);
      pos.set([x0 - ancho / 2, y, z], i * 6); pos.set([x0 + ancho / 2, y, z], i * 6 + 3);
      uv.set([0, v, 1, v], i * 4);
    }
    geo.attributes.position.needsUpdate = true; geo.attributes.uv.needsUpdate = true; geo.computeVertexNormals(); geo.computeBoundingSphere();
  };
  return m;
}
const arco = (cz, cy, r, a0, a1) => (u) => [cz + r * Math.cos(lerp(a0, a1, u)), cy + r * Math.sin(lerp(a0, a1, u))];
const recta = (z0, y0, z1, y1) => (u) => [lerp(z0, z1, u), lerp(y0, y1, u)];

// ---- la lista de materiales de Mónica: planilla crema con renglones navy, cae por el frente del mostrador hasta el piso ----
const LISTA = { x: -0.62, ancho: 0.3 };
const RENG = ["Ladrillo de campo · 6.000 u", "Portland 25 kg · 120 bolsas", "Hierro del 8 · 90 barras", "Arena gruesa · 18 m³", "Pedregullo · 12 m³", "Bloque 12 · 900 u", "Malla 15 x 15 · 30", "Hierro del 6 · 60 barras", "Cal · 40 bolsas", "Arena fina · 6 m³", "Caño PVC 110 · 14", "Alambre negro · 8 kg", "Tirante 3 x 6 · 40", "Clavos 2½ · 10 kg", "Membrana · 6 rollos", "Bovedilla · 400 u"];
const LISTA_REP = 3.0;   // metros de papel por vuelta de la textura (más que el largo: el título no se repite)
const listaT = lienzo(512, 3072, (x, w, h) => {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 240); x.fillStyle = "#5ce611"; x.fillRect(0, 240, w, 12);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "LISTA DE MATERIALES", 900, 58, w - 40); x.fillText("LISTA DE MATERIALES", w / 2, 82);
  x.font = F(900, 74); x.fillText("CASA", w / 2, 176);
  x.textAlign = "left";
  for (let i = 0; i < 28; i++) {
    const y = 300 + i * 96; x.strokeStyle = "#9aa5b8"; x.lineWidth = 4; x.beginPath(); x.moveTo(20, y + 70); x.lineTo(w - 20, y + 70); x.stroke();
    x.fillStyle = "#16243d"; x.font = F(800, 30); x.fillText(String(i + 1), 22, y + 34);
    const r = RENG[i % RENG.length]; ajustar(x, r, 700, 36, w - 90); x.fillText(r, 72, y + 34);
  }
});
listaT.wrapT = THREE.RepeatWrapping;
const LISTA_C = caminoDe([
  { p: recta(-0.16, Y + 0.004, MOS.z1 + 0.02, Y + 0.004), n: 30 },
  { p: arco(MOS.z1 + 0.02, Y - 0.026, 0.03, Math.PI / 2, 0), n: 10 },
  { p: recta(MOS.z1 + 0.05, Y - 0.026, MOS.z1 + 0.11, 0.06), n: 50 },
  { p: arco(MOS.z1 + 0.17, 0.06, 0.06, Math.PI, Math.PI * 1.5), n: 10 },
  { p: recta(MOS.z1 + 0.17, 0.004, 1.95, 0.004), n: 90 },
]);
const LISTA_M = crearTira(LISTA.ancho, listaT); scene.add(LISTA_M);
const ROLLO_L = new THREE.Group(); scene.add(ROLLO_L);
{ const r = cil(1, 1, LISTA.ancho + 0.004, M.cr, 28); r.rotation.z = Math.PI / 2; ROLLO_L.add(r); const e = cil(0.32, 0.32, LISTA.ancho + 0.01, M.cr3, 12); e.rotation.z = Math.PI / 2; ROLLO_L.add(e); sombras(ROLLO_L); }
// L(t): cuánto papel hay desenrollado (la punta, con el rollo, avanza); el rollo gira y se achica
function ponerLista(L, girado = 0) {
  LISTA_M.userData.poner(LISTA_C, LISTA.x, 0, L, (s) => 1 - s / LISTA_REP);   // el título (arriba del lienzo) en la punta del mostrador
  const [z, y, a] = enCamino(LISTA_C, L); const R = lerp(0.055, 0.04, cl(L / LISTA_C.L));
  ROLLO_L.scale.set(1, R, R); ROLLO_L.position.set(LISTA.x, y + R * Math.cos(a), z - R * Math.sin(a)); ROLLO_L.rotation.set(-L / R * 0.5 - girado, 0, 0);
}
// ---- la calculadora de rollo: cuerpo crema, teclas navy, display verde apagado, el rollo de papel atrás ----
const CALC = { x: -1.05, z: -0.06, s: 1.45 };
const CALC_G = new THREE.Group(); CALC_G.position.set(CALC.x, Y, CALC.z); CALC_G.rotation.y = Math.PI; CALC_G.scale.setScalar(CALC.s); scene.add(CALC_G);   // el teclado mira a Gustavo (-z)
const dispT = lienzo(512, 112, (x, w, h) => { x.fillStyle = "#9db88a"; x.fillRect(0, 0, w, h); });
let claveDisp = "";
function ponerDisplay(txt) { if (txt === claveDisp) return; claveDisp = txt; const x = dispT.userData.x; x.fillStyle = "#9db88a"; x.fillRect(0, 0, 512, 112); x.fillStyle = "#16243d"; x.textAlign = "right"; x.textBaseline = "middle"; ajustar(x, txt, 900, 92, 480); x.fillText(txt, 492, 60); dispT.needsUpdate = true; }
{
  const g = CALC_G, cr = mat(0xe6e2d3, 0.55);
  // cuerpo en cuña (más alto atrás) y el portarrollo atrás
  const cu = caja(0.2, 0.05, 0.24, cr, 0, 0.025, 0, 0.012); g.add(cu);
  const cu2 = caja(0.2, 0.04, 0.12, cr, 0, 0.06, -0.06, 0.012); g.add(cu2);
  const vis = caja(0.17, 0.035, 0.012, M.navy, 0, 0.075, -0.002, 0.004); vis.rotation.x = -0.5; g.add(vis);
  const vp = plano(0.15, 0.03, dispT, 0, 0.077, 0.006, true); vp.rotation.x = -0.5; g.add(vp); CALC_G.userData.display = vp;
  // las teclas (4 x 5) en la parte de adelante (+z local: hacia Gustavo con el giro)
  for (let i = 0; i < 4; i++) for (let j = 0; j < 5; j++) { const k = caja(0.032, 0.012, 0.022, (i === 3 && j > 2) ? M.g : M.navy3, -0.06 + i * 0.04, 0.055, 0.02 + j * 0.019, 0.004); g.add(k); }
  // el portarrollo y el rollo de papel
  for (const s of [-1, 1]) g.add(caja(0.008, 0.05, 0.03, cr, s * 0.04, 0.09, -0.1, 0.002));
  const rp = cil(0.028, 0.028, 0.06, M.cr, 24); rp.rotation.z = Math.PI / 2; rp.position.set(0, 0.105, -0.1); g.add(rp); CALC_G.userData.rollo = rp;
  sombras(g);
}
// la cinta impresa: sale del portarrollo hacia el cliente (+z), corre por la mesada, cae por el frente y se enrula en el piso
const CINTA_W = 0.057 * CALC.s;
const CINTA_REP = 0.8;
const NUM = ["6.000 x 38", "= 228.000 +", "120 x 520", "= 62.400 +", "90 x 380", "= 34.200 +", "18 x 2.400", "= 43.200 +", "12 x 2.900", "= 34.800 +", "900 x 61", "= 54.900 +", "30 x 1.650", "= 49.500 +"];
const cintaT = lienzo(256, 1024, (x, w, h) => {
  x.fillStyle = "#f4f1e6"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.textAlign = "right"; x.textBaseline = "middle";
  NUM.forEach((n, i) => { x.font = F(800, 32); x.fillText(n, w - 16, 40 + i * 72); });
});
cintaT.wrapT = THREE.RepeatWrapping;
const zC0 = CALC.z + 0.13 * CALC.s;   // la salida del rollo (lado del cliente)
const CINTA_C = caminoDe([
  { p: arco(zC0, Y + 0.09, 0.06, Math.PI * 0.5, -0.0), n: 16 },
  { p: (u) => [zC0 + 0.06 + 0.05 * u, Y + 0.09 - 0.087 * Math.sin(u * Math.PI / 2)], n: 10 },
  { p: recta(zC0 + 0.11, Y + 0.003, MOS.z1 + 0.02, Y + 0.003), n: 24 },
  { p: arco(MOS.z1 + 0.02, Y - 0.026, 0.03, Math.PI / 2, 0), n: 8 },
  { p: (u) => [MOS.z1 + 0.05 + 0.08 * u + 0.012 * Math.sin(u * 9), lerp(Y - 0.026, 0.07, u)], n: 60 },
  { p: arco(MOS.z1 + 0.19, 0.07, 0.065, Math.PI, Math.PI * 1.5), n: 10 },
  // los rulos en el piso (cicloide alargada: bucles parados que avanzan)
  { p: (u) => { const f = u * Math.PI * 2 * 5.5; return [MOS.z1 + 0.19 + 0.05 * f - 0.07 * Math.sin(f), 0.005 + 0.07 * (1 - Math.cos(f))]; }, n: 260 },
]);
const CINTA = crearTira(CINTA_W, cintaT, 360); scene.add(CINTA);
function ponerCinta(L) { CINTA.visible = L > 0.01; if (CINTA.visible) CINTA.userData.poner(CINTA_C, CALC.x, 0, Math.min(L, CINTA_C.L), (s) => (L - s) / CINTA_REP); }
// el rollito de cinta (P3: Gustavo la enrolla; Q5b: Tito la guarda en el cajón)
const ROLLITO = new THREE.Group(); scene.add(ROLLITO);
{ const r = cil(0.05, 0.05, CINTA_W, mat(0xf4f1e6, 0.8), 28); r.rotation.z = Math.PI / 2; ROLLITO.add(r); const t = caja(CINTA_W, 0.003, 0.16, mat(0xf4f1e6, 0.8), 0, -0.04, 0.08, 0.001); t.rotation.x = 0.5; ROLLITO.add(t); sombras(ROLLITO); }
// ---- el mate y el termo de Gustavo (P2 de noche; en el mostrador) ----
const MATE = crearMate(); MATE.position.set(-1.62, Y, -0.12); MATE.scale.setScalar(1.15); scene.add(MATE);
const TERMO = crearTermo(); TERMO.position.set(-1.85, Y, -0.16); scene.add(TERMO);
// ---- la tablet en el atril (parte 2) ----
const TW = 1000, TH = 1430;
const tabT = lienzo(TW, TH, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); });
const TABLET = crearTablet(tabT, 0.2, 0.286, 0.28); TABLET.position.set(-0.32, Y, 0.0); TABLET.rotation.y = -0.35; scene.add(TABLET);

// =====================================================================================================
// LA CALLE (x = XC): la fachada del corralón (z = 0, mira a +z), la vereda, la calle y enfrente la obra de Mónica
// =====================================================================================================
const XC = 60;
const CALLE = new THREE.Group(); CALLE.position.set(XC, 0, 0); scene.add(CALLE);
const ZV = 2.4, ZE = 9.0, ZO = 11.0;   // fin de la vereda propia, la vereda de enfrente, el frente de la obra
{
  const g = CALLE;
  // la fachada: chapa navy con el portón abierto (x -1.5..1.5) y el cartel arriba
  const fa = new THREE.Group(); g.add(fa);
  chapa(fa, 5.0, 4.4, -4.0, 2.2); chapa(fa, 5.0, 4.4, 4.0, 2.2); chapa(fa, 3.0, 1.4, 0, 3.7);
  for (const x of [-1.58, 1.58]) fa.add(caja(0.16, 3.1, 0.3, M.navy3, x, 1.55, 0.05, 0.02));
  fa.add(caja(3.3, 0.16, 0.3, M.navy3, 0, 3.05, 0.05, 0.02));
  fa.add(caja(4.2, 0.62, 0.06, M.navy, 0, 3.75, 0.1, 0.02)); fa.add(plano(4.0, 0.56, cartelT, 0, 3.75, 0.135));
  // adentro del portón: el piso del galpón y un fondo navy plano (no se ve el patio)
  const pi = mesh(new THREE.PlaneGeometry(3.2, 3), M.piso, 0, 0.002, -1.5); pi.rotation.x = -Math.PI / 2; g.add(pi);
  g.add(mesh(new THREE.PlaneGeometry(3.4, 3.2), new THREE.MeshBasicMaterial({ color: 0x16243d }), 0, 1.6, -2.9));
  for (const s of [-1, 1]) { const p = mesh(new THREE.PlaneGeometry(3, 3.2), new THREE.MeshBasicMaterial({ color: 0x1f3254, side: THREE.DoubleSide }), s * 1.6, 1.6, -1.5); p.rotation.y = Math.PI / 2; g.add(p); }
  { const pl = crearPalletLadrillos(5, 4, 6); pl.position.set(-0.9, 0, -2.2); g.add(pl); }
  // la vereda propia, el cordón, la calle, la vereda de enfrente
  const v1 = mesh(new THREE.PlaneGeometry(60, ZV), M.vereda, 0, 0.12, ZV / 2); v1.rotation.x = -Math.PI / 2; g.add(v1);
  g.add(caja(60, 0.13, 0.14, M.cr3, 0, 0.06, ZV, 0.01));
  const ca = mesh(new THREE.PlaneGeometry(60, ZE - ZV), M.asfalto, 0, 0.0, (ZV + ZE) / 2); ca.rotation.x = -Math.PI / 2; ca.castShadow = false; g.add(ca);
  for (let x = -28; x < 28; x += 3) { const f = mesh(new THREE.PlaneGeometry(1.6, 0.1), M.cr2, x, 0.004, (ZV + ZE) / 2); f.rotation.x = -Math.PI / 2; f.castShadow = false; g.add(f); }
  g.add(caja(60, 0.13, 0.14, M.cr3, 0, 0.06, ZE, 0.01));
  const v2 = mesh(new THREE.PlaneGeometry(60, ZO - ZE), M.vereda, 0, 0.12, (ZE + ZO) / 2); v2.rotation.x = -Math.PI / 2; g.add(v2);
  // los vecinos de los costados (casas bajas crema y navy claro) y los árboles de la vereda
  for (const [x, w, h, c] of [[-10.5, 7, 3.4, M.cr], [10.5, 7, 3.0, M.cr2], [-17, 6, 4.2, M.navy3], [17, 6, 3.6, M.cr]]) g.add(caja(w, h, 6, c, x, h / 2, ZO + 3, 0.03));
  for (const [x, w, h, c] of [[-9, 6, 3.8, M.cr2], [9, 7, 3.2, M.navy3]]) g.add(caja(w, h, 0.3, c, x, h / 2, -0.4, 0.02));
  for (const x of [-5.5, 6.5]) { const tr = cil(0.09, 0.12, 2.2, M.marco, 10); tr.position.set(x, 1.2, ZV - 0.5); g.add(tr); const co = mesh(new THREE.IcosahedronGeometry(1.1, 1), mat(0x3f6b3a, 0.9, { flatShading: true }), x, 3.0, ZV - 0.5); co.scale.set(1, 0.85, 1); g.add(co); }
  // LA OBRA: el terreno, los cimientos, las primeras hiladas, la arena, el andamio, el cartel de obra en blanco
  const te = mesh(new THREE.PlaneGeometry(12, 12), M.tierra, 0, 0.1, ZO + 6); te.rotation.x = -Math.PI / 2; g.add(te);
  const OB = new THREE.Group(); OB.position.set(0, 0.1, ZO + 2.0); g.add(OB);
  // la viga de cimiento (rectángulo de 7 x 6) y las hiladas de ladrillo arriba (atrás y a los costados, más altas atrás)
  const viga = (w, d, x, z) => OB.add(caja(w, 0.22, d, M.hormigon, x, 0.11, z, 0.01));
  viga(7.2, 0.3, 0, 0); viga(7.2, 0.3, 0, 6); viga(0.3, 6.3, -3.6, 3); viga(0.3, 6.3, 3.6, 3); viga(0.3, 6.3, 0.4, 3);
  const ladMurT = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#d8d2c0"; x.fillRect(0, 0, w, h); for (let f = 0; f < 4; f++) for (let c = -1; c < 4; c++) { x.fillStyle = (f + c) % 3 ? "#b5694f" : "#a45d45"; x.fillRect(c * 128 + (f % 2) * 64 + 5, f * 64 + 5, 118, 54); } });
  ladMurT.wrapS = ladMurT.wrapT = THREE.RepeatWrapping;
  const muro = (w, h, x, z, ry = 0) => { const t = ladMurT.clone(); t.needsUpdate = true; t.repeat.set(w / 0.5, h / 0.24); const mm = new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }); const m = mesh(new THREE.BoxGeometry(w, h, 0.14), [M.ladrillo, M.ladrillo, M.ladrillo, M.ladrillo, mm, mm], x, 0.22 + h / 2, z); m.rotation.y = ry; OB.add(m); };
  muro(7.0, 1.2, 0, 6); muro(6.0, 0.72, -3.6, 3, Math.PI / 2); muro(6.0, 0.48, 3.6, 3, Math.PI / 2); muro(2.4, 0.36, -2.3, 0); muro(1.6, 0.6, 2.6, 0);
  // las esperas de hierro en las esquinas
  for (const [x, z] of [[-3.6, 0], [3.6, 0], [-3.6, 6], [3.6, 6], [0.4, 0]]) for (const d of [-0.05, 0.05]) { const e = cil(0.012, 0.012, 1.6, M.navy3, 6); e.position.set(x + d, 0.8, z + d); OB.add(e); }
  // la arena y el pedregullo
  { const a = mesh(new THREE.ConeGeometry(1.1, 0.9, 9), M.arena, -2.0, 0.45, 2.8); a.rotation.y = 0.4; OB.add(a); }
  // el andamio de caños navy3 (atrás a la derecha)
  { const an = new THREE.Group(); an.position.set(2.2, 0, 5.2); OB.add(an);
    for (const [x, z] of [[0, 0], [1.6, 0], [0, 0.9], [1.6, 0.9]]) an.add(caja(0.06, 3.2, 0.06, M.navy3, x, 1.6, z, 0.01));
    for (const y of [1.0, 2.0, 3.0]) { an.add(caja(1.7, 0.05, 0.05, M.navy3, 0.8, y, 0, 0.01)); an.add(caja(1.7, 0.05, 0.05, M.navy3, 0.8, y, 0.9, 0.01)); an.add(caja(1.6, 0.04, 0.9, M.madera, 0.8, y + 0.03, 0.45, 0.01)); }
    const dg = caja(0.05, 2.1, 0.05, M.navy3, 0.8, 1.5, 0, 0.01); dg.rotation.z = 0.68; an.add(dg); }
  // el cartel de obra en blanco (sin texto) sobre dos postes, al frente a la izquierda
  { const ca2 = new THREE.Group(); ca2.position.set(-3.0, 0, -0.6); OB.add(ca2); for (const x of [-0.6, 0.6]) ca2.add(caja(0.08, 2.4, 0.08, M.marco, x, 1.2, 0, 0.01)); ca2.add(caja(1.6, 1.0, 0.05, M.blanco, 0, 1.9, 0.04, 0.02)); ca2.add(caja(1.66, 0.06, 0.07, M.navy3, 0, 2.42, 0.04, 0.01)); }
  // el cerco provisorio de malla (crema) solo a los costados del frente
  for (const s of [-1, 1]) { const c = caja(1.8, 1.4, 0.03, mat(0xefeee5, 0.9, { transparent: true, opacity: 0.55 }), s * 4.6, 0.7 + 0.1, ZO + 0.1, 0.005); g.add(c); }
  // el cielo: crema-celeste plano (scene.background) y una franja crema baja
  sombras(g);
}
fusionar(CALLE);
// los ladrillos sueltos que baja el peón (de la plataforma a la pila de la vereda) y la pila que crece
const PILA_V = new THREE.Group(); scene.add(PILA_V);
const N_PILA = 36;
for (let i = 0; i < N_PILA; i++) { const b = mesh(geoLad, i % 3 ? M.ladrillo : M.ladrillo2); const f = Math.floor(i / 6), c = i % 6; b.position.set((c % 3) * 0.26 - 0.26, 0.12 + 0.028 + f * 0.058, Math.floor(c / 3) * 0.125); b.rotation.y = f % 2 ? 0 : 0; PILA_V.add(b); }
const LAD_MANO = mesh(geoLad, M.ladrillo); scene.add(LAD_MANO);
// ---- el camión plataforma (de corralon-portland, en 3D en la calle): gris liso sin nombre, o navy con MATERIALES GUSTAVO ----
function crearCamion(color, conNombre) {
  const g = new THREE.Group(), mc = mat(color, 0.5), mv = mat(0x2c4268, 0.15, { metalness: 0.3 });
  g.add(caja(4.6, 0.25, 1.9, M.navy, 0.0, 0.62, 0, 0.04));
  g.add(caja(1.55, 1.55, 2.0, mc, 1.65, 1.55, 0, 0.12));
  const pb = caja(0.05, 0.75, 1.7, mv, 2.43, 1.85, 0, 0.03); pb.rotation.z = -0.12; g.add(pb);
  for (const s of [-1, 1]) g.add(caja(0.8, 0.6, 0.04, mv, 1.75, 1.85, s * 1.0, 0.02));
  g.add(caja(0.1, 0.45, 1.7, M.navy, 2.43, 1.05, 0, 0.02)); for (const s of [-1, 1]) g.add(caja(0.06, 0.16, 0.3, mat(0xfffbea, 0.2, { emissive: 0xfff4d0, emissiveIntensity: 0.4 }), 2.46, 1.0, s * 0.68, 0.02));
  g.add(caja(0.18, 0.2, 2.06, M.navy, 2.45, 0.62, 0, 0.04));
  for (const s of [-1, 1]) { g.add(caja(0.06, 0.2, 0.06, M.navy, 2.0, 2.0, s * 1.08, 0.01)); g.add(caja(0.04, 0.14, 0.1, mv, 2.0, 1.9, s * 1.12, 0.01)); }
  const mb = mat(conNombre ? C.cr : 0x6d727b, 0.6);
  g.add(caja(3.0, 0.14, 2.0, mb, -0.75, 0.82, 0, 0.02));
  for (const s of [-1, 1]) g.add(caja(3.0, 0.42, 0.06, mb, -0.75, 1.1, s * 0.98, 0.02));
  g.add(caja(0.06, 0.42, 2.0, mb, -2.22, 1.1, 0, 0.02));
  if (conNombre) {
    const t = lienzo(1200, 160, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "MATERIALES GUSTAVO", 900, 118, w - 60); x.fillText("MATERIALES GUSTAVO", w / 2, h / 2 + 4); });
    for (const s of [-1, 1]) { const p = plano(2.9, 0.38, t, -0.75, 1.1, s * 1.015); if (s < 0) p.rotation.y = Math.PI; g.add(p); const pc = plano(1.3, 0.2, t, 1.65, 1.2, s * 1.005); if (s < 0) pc.rotation.y = Math.PI; g.add(pc); }
  }
  for (const [x, z] of [[1.5, 1], [1.5, -1], [-1.1, 1], [-1.1, -1], [-1.75, 1], [-1.75, -1]]) { const r = mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 24), M.goma, x, 0.42, z * 0.88); r.rotation.x = Math.PI / 2; g.add(r); const ll = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.31, 16), mat(0xb4b2a3, 0.5), x, 0.42, z * 0.88); ll.rotation.x = Math.PI / 2; g.add(ll); }
  // la carga: dos pallets de ladrillos y las bolsas de portland
  for (const x of [-1.85, -0.75]) { const pl = crearPalletLadrillos(5, 4, 7); pl.position.set(x, 0.89, 0.42); pl.scale.setScalar(0.92); g.add(pl); }
  for (let k = 0; k < 3; k++) for (let i = 0; i < 2; i++) { const b = crearBolsaPortland(); b.position.set(-1.65 + i * 0.6, 0.96 + k * 0.135, -0.5); g.add(b); }
  for (let k = 0; k < 2; k++) { const b = crearBolsaPortland(); b.position.set(-0.45, 0.96 + k * 0.135, -0.5); g.add(b); }
  return sombras(g);
}
const CAM_GRIS = crearCamion(0x8a8f98, false); scene.add(CAM_GRIS);
const CAM_NAVY = crearCamion(0x1f3254, true); scene.add(CAM_NAVY);
const CAM_POS = { x: XC + 0.6, z: 7.6 };   // estacionado contra el cordón de enfrente, la trompa hacia +x
function ponerCamion(cam, t, t0, reculando = true) {
  const u = reculando ? eo(sg(t, t0, t0 + 1.0)) : 1;
  cam.position.set(CAM_POS.x + (1 - u) * 3.2, 0, CAM_POS.z); cam.rotation.y = 0;
}

// =====================================================================================================
// EL TABLERO del camión (x = XT): el parabrisas, el volante, la hoja apoyada (P6i) y su par navy (Q5i)
// =====================================================================================================
const XT = 120;
const TAB_C = new THREE.Group(); TAB_C.position.set(XT, 0, 0); scene.add(TAB_C);
{
  const g = TAB_C, gris = mat(0x5c616b, 0.75);
  g.add(caja(1.8, 0.32, 0.55, gris, 0, 1.0, -0.25, 0.06));                       // el tablero
  g.add(caja(1.8, 0.05, 0.3, mat(0x4a4f58, 0.8), 0, 1.18, -0.42, 0.02));          // la repisa contra el parabrisas
  for (const s of [-1, 1]) { const p = caja(0.09, 1.0, 0.09, M.navy3, s * 0.9, 1.65, -0.5, 0.02); p.rotation.x = 0.25; g.add(p); }
  g.add(caja(1.9, 0.1, 0.12, M.navy3, 0, 2.12, -0.38, 0.02));
  // afuera, por el parabrisas: la vereda de la obra y la fachada del corralón (plana y clara: que la hoja se lea)
  g.add(mesh(new THREE.PlaneGeometry(6, 3), new THREE.MeshBasicMaterial({ color: 0xdfe3dc }), 0, 2.2, -3.0));
  g.add(mesh(new THREE.PlaneGeometry(6, 1.4), new THREE.MeshBasicMaterial({ color: 0x1f3254 }), 0, 1.25, -2.95));
  // el volante (a la izquierda, abajo)
  const vo = mesh(new THREE.TorusGeometry(0.2, 0.025, 10, 32), M.goma, -0.55, 1.08, 0.12); vo.rotation.x = -1.0; g.add(vo);
  g.add(caja(0.06, 0.06, 0.3, M.goma, -0.55, 1.05, 0.02, 0.02));
  sombras(g);
}
// la hoja del presupuesto de Gustavo: membrete MATERIALES GUSTAVO, Casa Mónica, los renglones; los totales tachados en birome
// roja apagada con otro número al lado (el del otro corralón, a mano), o (Q5i) el sello verde "Aceptado ✓"
const HOJA_W = 820, HOJA_H = 1100;
function dibujarHoja(x, w, h, tachada) {
  x.fillStyle = "#f8f7f2"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, w, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "MATERIALES GUSTAVO", 900, 64, w - 60); x.fillText("MATERIALES GUSTAVO", w / 2, 66);
  x.font = F(800, 44); x.fillText("PRESUPUESTO", w / 2, 132);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 58); x.fillText("Casa Mónica", 44, 250); x.fillStyle = "#3a4256"; x.font = F(700, 38); x.fillText("Obra gris · 86 renglones", 46, 312);
  const filas = [["Ladrillo de campo", "228.000"], ["Portland 25 kg", "62.400"], ["Hierro del 8", "34.200"], ["Arena gruesa", "43.200"], ["…", ""]];
  filas.forEach(([a, b], i) => { const y = 400 + i * 92; x.fillStyle = "#0b1220"; x.font = F(700, 42); x.textAlign = "left"; x.fillText(a, 44, y); x.textAlign = "right"; x.fillText(b, w - 44, y); x.fillStyle = "#c9c6bb"; x.fillRect(44, y + 38, w - 88, 3); });
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 54); x.fillText("TOTAL", 44, 920); x.textAlign = "right"; x.font = F(900, 70); x.fillText("$ 1.260.000", w - 44, 920);
  if (tachada) {
    // los tachones en birome roja apagada y el otro número a mano
    x.strokeStyle = "#c7655b"; x.lineWidth = 9; x.lineCap = "round";
    for (const [y, a, b] of [[400, 520, w - 40], [492, 560, w - 40], [584, 580, w - 40], [676, 560, w - 40]]) { x.beginPath(); x.moveTo(a, y + 4); x.lineTo(b, y - 6); x.stroke(); }
    x.lineWidth = 12; x.beginPath(); x.moveTo(380, 935); x.lineTo(w - 30, 900); x.stroke(); x.beginPath(); x.moveTo(380, 900); x.lineTo(w - 30, 935); x.stroke();
    x.fillStyle = "#c7655b"; x.textAlign = "right"; x.font = CAV(110); x.fillText("1.215.000", w - 50, 1030);
    x.save(); x.translate(250, 1030); x.rotate(-0.08); x.font = CAV(80); x.textAlign = "center"; x.fillText("−45 mil", 0, 0); x.restore();
  } else {
    x.save(); x.translate(w / 2, 690); x.rotate(-0.1); x.strokeStyle = "#3fa60a"; x.lineWidth = 14; x.fillStyle = "rgba(92,230,17,0.18)"; x.beginPath(); x.roundRect(-300, -95, 600, 190, 30); x.fill(); x.stroke();
    x.fillStyle = "#3fa60a"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 104); x.fillText("Aceptado", -40, 6); tilde(x, 230, 6, 92, "#3fa60a", 20); x.restore();
    x.fillStyle = "#3fa60a"; x.textAlign = "left"; x.font = F(800, 44); x.fillText("Primera entrega: lunes 8:00", 44, 1030);
  }
}
const hojaGrisT = lienzo(HOJA_W, HOJA_H, (x, w, h) => dibujarHoja(x, w, h, true));
const hojaNavyT = lienzo(HOJA_W, HOJA_H, (x, w, h) => dibujarHoja(x, w, h, false));
const HOJA = new THREE.Group(); scene.add(HOJA);
const HOJA_PL = plano(0.46, 0.46 * HOJA_H / HOJA_W, hojaGrisT, 0, 0, 0); HOJA.add(HOJA_PL);
HOJA.position.set(XT + 0.18, 1.2 + 0.3, -0.44); HOJA.rotation.x = -0.28; sombras(HOJA);

// =====================================================================================================
// LOS PERSONAJES (Gustavo, Tito, Mónica y el peón del camión)
// =====================================================================================================
const R0 = 0.3, CC0 = R0 * 0.92;
function casco(per, color = C.cr) {
  const g = new THREE.Group(); g.position.set(0, CC0 + 0.085, -0.012); g.rotation.x = -0.1; per.cabeza.add(g);
  const m = mat(color, 0.4);
  g.add(mesh(new THREE.SphereGeometry(R0 * 1.09, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), m, 0, 0, 0));
  const ala = mesh(new THREE.CylinderGeometry(R0 * 1.24, R0 * 1.26, 0.022, 36), m, 0, 0.005, 0.025); ala.scale.z = 1.08; g.add(ala);
  g.add(caja(0.05, 0.06, R0 * 1.9, m, 0, R0 * 1.06, 0, 0.02));
  return sombras(g);
}
// el casco blanco suelto (Mónica lo lleva en la mano: no puesto, que se vea la cara)
function crearCascoSuelto() {
  const g = new THREE.Group(), m = mat(0xf8f7f2, 0.35);
  g.add(mesh(new THREE.SphereGeometry(R0 * 1.09, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), m, 0, 0, 0));
  const ala = mesh(new THREE.CylinderGeometry(R0 * 1.24, R0 * 1.26, 0.022, 36), m, 0, 0.005, 0.025); ala.scale.z = 1.08; g.add(ala);
  g.add(caja(0.05, 0.06, R0 * 1.9, m, 0, R0 * 1.06, 0, 0.02));
  g.scale.setScalar(0.62);   // escala de mundo (la cabeza de los personajes es ~0.6 del tamaño de la geometría)
  return sombras(g);
}
function gorro(per, color = C.navy3) {
  const g = new THREE.Group(); g.position.set(0, CC0 + 0.03, -0.01); g.rotation.x = -0.08; per.cabeza.add(g);
  const m = mat(color, 0.95);
  g.add(mesh(new THREE.SphereGeometry(R0 * 1.07, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), m, 0, 0.02, 0));
  const dob = mesh(new THREE.CylinderGeometry(R0 * 1.1, R0 * 1.12, 0.1, 32, 1, true), m, 0, 0.04, 0); dob.material = m.clone(); dob.material.side = THREE.DoubleSide; dob.material.color.multiplyScalar(0.85); g.add(dob);
  for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2; g.add(caja(0.012, 0.09, 0.012, dob.material, Math.sin(a) * R0 * 1.115, 0.04, Math.cos(a) * R0 * 1.115, 0.004)); }
  return sombras(g);
}
// el lápiz de carpintero apoyado sobre la oreja izquierda de Gustavo
function lapizOreja(per) {
  const g = new THREE.Group(); g.position.set(R0 * 1.07, CC0 + 0.06, -0.05); g.rotation.set(Math.PI / 2 + 0.1, 0, 0.1); per.cabeza.add(g);
  const cu = mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.17, 8), M.navy3, 0, 0, 0); cu.scale.x = 0.7; g.add(cu);
  const pu = mesh(new THREE.ConeGeometry(0.0125, 0.035, 8), mat(0xd9c7a0, 0.7), 0, 0.102, 0); pu.scale.x = 0.7; g.add(pu);
  g.add(mesh(new THREE.ConeGeometry(0.005, 0.014, 6), M.navy, 0, 0.116, 0));
  return sombras(g);
}
const parp = (...ts) => ts.filter((v) => typeof v === "number" && !Number.isNaN(v)).map(r2);
const gustavo = crearPersonaje({ nombre: "Gustavo", piel: PIEL.media, pelo: 0x3a3330, peinado: "texturado", texturaAlto: 0.35, cejasColor: 0x2e2724, cejaGruesa: true,
  barba: 0x3a3330, barbaLarga: 0.35, barbaOpacidad: 0.35, barbaBigote: false, mejillasBajas: true,
  camisa: MARCA.cr, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, cuelloAlto: 0.06, chaleco: { color: MARCA.navy2, botones: MARCA.g },
  pantalon: 0x3a3f4a, zapatos: 0x3b2a20, panza: 1.08, nariz: 0.062, mejillas: 0xd08a72, alto: 1.03,
  dedos: true, parpadeoCada: 999, parpadeosExtra: parp(1.6, T.p2 + 0.5, T.n3 + 0.3, T.p3 + 1.2, T.p4m + 1.6, T.p6 + 1.2, T.q1 + 1.4, T.q4 + 1.0, T.q5 + 1.1, T.g14 + 1.45) });
lapizOreja(gustavo);
{ const pm = mat(0x3a3330, 0.9); const nuca = mesh(new THREE.SphereGeometry(R0 * 1.035, 36, 16, Math.PI * 1.5 - 1.42, 2.84, Math.PI * 0.2, Math.PI * 0.46), pm, 0, CC0 + 0.01, -0.012); nuca.scale.set(1, 0.98, 0.97); gustavo.cabeza.add(nuca);
  semilla = 41; for (let i = 0; i < 17; i++) { const a = Math.PI * 1.5 - 1.35 + (i / 16) * 2.7, e = -0.38 + az() * 0.08, r = R0 * 1.03; const m = mesh(new THREE.SphereGeometry(1, 10, 8), pm, r * -Math.cos(a) * Math.cos(e), CC0 + 0.01 + R0 * 0.97 * Math.sin(e), r * Math.sin(a) * Math.cos(e) * 0.97 - 0.012); m.scale.set(0.05, 0.045 + az() * 0.02, 0.022); m.lookAt(m.position.clone().multiplyScalar(2).setY(m.position.y)); m.scale.set(0.05, 0.045, 0.022); gustavo.cabeza.add(m); } }
{ const mq = mat(0x0f1a2e, 0.8); for (const [y, r] of [[0.12, 0.262], [0.24, 0.266], [0.35, 0.252]]) { const a = mesh(new THREE.TorusGeometry(r, 0.008, 5, 40, Math.PI * 2 - 0.75), mq, 0, y, 0); a.rotation.set(Math.PI / 2, 0, Math.PI / 2 + 0.375); a.scale.y = 0.86; gustavo.cuerpo.add(a); } }
const tito = crearPersonaje({ nombre: "Tito", piel: PIEL.morena, pelo: 0xb9b6b0, peinado: "costados", cejasColor: 0xd8d4cc, cejaGruesa: true, mejillasBajas: true,
  camisa: MARCA.cr2, mangas: "largas", cuello: MARCA.navy3, cuelloBotones: false, cuelloAlto: 0.04,
  campera: { color: MARCA.cr, cuello: MARCA.navy3, cierre: 0xb4b2a3, abierta: false },
  pantalon: 0x5a5550, zapatos: 0x3b2a20, panza: 1.05, nariz: 0.066, mejillas: 0xa8604a, alto: 0.97,
  dedos: true, parpadeoCada: 999, parpadeosExtra: parp(T.p3 + 1.4, T.q4 + 1.5, T.q5b + 0.5) });
gorro(tito, C.navy3);
{ const mp = mat(0xc9c6bd, 0.95); for (const [x, y, z, s] of [[0.11, 0.24, 0.225, 0.05], [-0.07, 0.1, 0.245, 0.04], [0.05, -0.02, 0.25, 0.035], [-0.15, 0.3, 0.18, 0.03]]) { const d = mesh(new THREE.SphereGeometry(1, 12, 8), mp, x, y, z); d.scale.set(s, s * 0.75, 0.012); d.lookAt(d.position.clone().multiplyScalar(3)); d.scale.set(s, s * 0.75, 0.012); tito.cuerpo.add(d); } }
// Mónica (nueva, ELENCO.monica en assets/personajes.js): ~40, castaño oscuro en coleta alta, campera crema con cuello navy
const monica = crearPersonaje({ ...ELENCO.monica, dedos: true, parpadeoCada: 999, parpadeosExtra: parp(1.3, T.p4 + 1.2, T.p4p + 0.5, T.p6i + 0.3, T.q1 + 1.6, T.q3m + 0.2, T.q5g + 0.9) });
// la carpeta de obra (navy con elástico verde) bajo el brazo derecho (P1, Q1) y el casco blanco en la mano (calle)
const CARPETA = new THREE.Group(); scene.add(CARPETA);
{ CARPETA.add(caja(0.26, 0.34, 0.025, M.navy3, 0, 0, 0, 0.008)); CARPETA.add(caja(0.27, 0.02, 0.03, M.g, 0, 0.08, 0, 0.004)); CARPETA.add(caja(0.25, 0.32, 0.01, M.cr, 0.0, 0.0, 0.006, 0.003)); sombras(CARPETA); }
const CASCO_M = crearCascoSuelto(); scene.add(CASCO_M);
// el celular de Mónica (en su terreno) y el de Gustavo (3D, en la mano)
const celMT = lienzo(300, 600, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 80); x.fillStyle = "#ffffff"; x.strokeStyle = "#3fa60a"; x.lineWidth = 6; x.beginPath(); x.roundRect(14, 260, w - 28, 220, 18); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(800, 30); x.fillText("Hola, Mónica.", 30, 310); x.fillText("¿Pudiste ver el", 30, 360); x.fillText("presupuesto?", 30, 410); });
const CELU_M = new THREE.Group(); scene.add(CELU_M);
{ CELU_M.add(caja(0.08 * 1.3, 0.165 * 1.3, 0.012, mat(0x1f3254, 0.5), 0, 0, 0, 0.012)); CELU_M.add(plano(0.074 * 1.3, 0.155 * 1.3, celMT, 0, 0, 0.0065, true)); sombras(CELU_M); }
// el peón que baja los ladrillos del camión (sin voz, de casco crema)
const PEON = crearPersonaje({ nombre: "peón", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "costados", cejasColor: 0x2a2220, camisa: MARCA.navy3, mangas: "largas", cuello: null, cuelloBotones: false, pantalon: 0x4a4f5a, zapatos: 0x3b2a20, panza: 1.04, nariz: 0.06, alto: 1.0, parpadeoCada: 999 });
casco(PEON, C.cr);
const TODOS = [gustavo, tito, monica, PEON];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }

// ---- avatares para los chats: la cara del personaje 3D en un círculo ----
const AVATAR = {};
{
  const rt = new THREE.WebGLRenderTarget(256, 256); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene();
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(1, 2, 3); esc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const leer = (per, fondo, alto = 0.25, lejos = 1.6) => {
    esc.background = new THREE.Color(fondo);
    const padre = per.raiz.parent; esc.add(per.raiz);
    per.poner({ x: 0, y: 0, z: 0, giro: 0, ...CARA.sonrisa, ...BRAZOS.costado, t: 0 });
    per.raiz.updateMatrixWorld(true);
    const c = per.cabeza.localToWorld(V3(0, alto, 0));
    cam.position.set(c.x + 0.12, c.y + 0.04, c.z + lejos); cam.lookAt(c.x, c.y - 0.03, c.z);
    renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
    const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    const id = x.createImageData(256, 256);
    for (let y = 0; y < 256; y++) id.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
    x.putImageData(id, 0, 0);
    if (padre) padre.add(per.raiz); else esc.remove(per.raiz);
    return cv;
  };
  AVATAR.gustavo = leer(gustavo, 0x5ce611, 0.25, 1.6);
  AVATAR.monica = leer(monica, 0xd9d7c9, 0.27, 1.65);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
// =====================================================================================================
// TARJETAS PEGADAS A LA CÁMARA (en píxeles de pantalla): globos de diálogo, rótulos, chips
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
function textoSel(x, l, cx, y, px, tinta = "#0b1220", tintaPlano = tinta) {
  const limpio = (s) => s.replace(/[[\]]/g, "");
  x.font = F(800, px); x.textBaseline = "middle"; x.textAlign = "left";
  const partes = l.split(/(\[[^\]]+\])/).filter(Boolean);
  const anchos = partes.map((p) => x.measureText(limpio(p)).width + (p.startsWith("[") ? px * 0.5 : 0));
  let xx = cx - anchos.reduce((a, b) => a + b, 0) / 2;
  partes.forEach((p, k) => {
    if (p.startsWith("[")) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = px * 0.1; x.beginPath(); x.roundRect(xx + px * 0.05, y - px * 0.62, anchos[k] - px * 0.1, px * 1.24, px * 0.12); x.fill(); x.stroke(); x.fillStyle = tinta; x.fillText(limpio(p), xx + px * 0.25, y + px * 0.04); }
    else { x.fillStyle = tintaPlano; x.fillText(p, xx, y + px * 0.04); }
    xx += anchos[k];
  });
}
// globo de diálogo (texto grande)
function crearGlobo(lineas, px = 80, { tinta = "#0b1220", fondo = "#efeee5", borde = C.navy } = {}) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const anchoT = Math.max(...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.2), H = Math.round(lineas.length * px * 1.22 + px * 0.75);
  return crearTarjeta(Wg, H, (x, w, h) => { lineas.forEach((l, i) => textoSel(x, l, w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px, tinta)); }, { fondo, borde });
}
// el rótulo con línea guía: caja navy, texto crema (problema: caja rojo apagado)
function crearRotulo(lineas, px = 50, { fondo = "#0b1220", borde = C.cr } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  const ancho = Math.max(...lineas.map(([l, , p]) => { med.font = F(800, p ?? px); return med.measureText(l.replace(/[[\]]/g, "")).width + (l.includes("[") ? (p ?? px) * 0.5 : 0); }));
  const H = Math.round(lineas.reduce((a, [, , p]) => a + (p ?? px) * 1.25, 0) + px * 0.6), Wg = Math.round(ancho + px * 1.0);
  return crearTarjeta(Wg, H, (x, w, h) => {
    let y = px * 0.3; x.textAlign = "center"; x.textBaseline = "middle";
    for (const [l, color, p] of lineas) { const q = p ?? px; if (l.includes("[")) textoSel(x, l, w / 2, y + q * 0.62, q, "#0b1220", color ?? "#efeee5"); else { x.font = F(800, q); x.fillStyle = color ?? "#efeee5"; x.fillText(l, w / 2, y + q * 0.62); } y += q * 1.25; }
  }, { fondo, borde });
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

// =====================================================================================================
// LAS PANTALLAS: la tablet de presupuestos (lista de precios, panel) y los chats genéricos de los celulares
// =====================================================================================================
// la tablet es vertical (1000 x 1430): en los insertos llena el 70 % del alto; todos los textos ≥ 40 px en el lienzo
function enc(x, W, titulo, sub) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 180); x.fillStyle = "#5ce611"; x.fillRect(0, 180, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, titulo, 800, 70, W - 80); x.fillText(titulo, 40, 68);
  if (sub) { x.fillStyle = "#b9c3d3"; x.font = F(700, 44); x.fillText(sub, 42, 138); }
}
const FILAS = [["Ladrillo de campo", "6.000 u · $ 38", "$ 228.000"], ["Portland 25 kg", "120 bolsas · $ 520", "$ 62.400"], ["Hierro del 8", "90 barras · $ 380", "$ 34.200"], ["Arena gruesa", "18 m³ · $ 2.400", "$ 43.200"]];
// Q1t · "Nuevo presupuesto": cliente y obra; los renglones se llenan desde la lista de precios; el total; "Enviar por WhatsApp"
function dibujarNuevo(x, W, H, { n = 0, total = 0, pulsa = 0, enviado = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  enc(x, W, "Nuevo presupuesto", "Materiales Gustavo");
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(36, 214, W - 72, 200, 26); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 62); x.fillText("Mónica · 099 3·· ···", 70, 278);
  x.fillStyle = "#3a4256"; x.font = F(800, 50); x.fillText("Obra: casa · obra gris", 70, 360);
  // la etiqueta verde: "desde tu lista de precios"
  FILAS.forEach(([a, b, c], i) => {
    const y = 440 + i * 120, k = cl(n - i);
    if (k <= 0) { x.fillStyle = "#e3e0d2"; rr(x, 36, y, W - 72, 104, 18); return; }
    x.globalAlpha = Math.min(1, 0.3 + k); x.fillStyle = "#ffffff"; x.strokeStyle = k < 1 ? "#5ce611" : "#b4b2a3"; x.lineWidth = k < 1 ? 8 : 4; x.beginPath(); x.roundRect(36, y, W - 72, 104, 18); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 46); x.fillText(a, 62, y + 34); x.fillStyle = "#3a4256"; x.font = F(700, 40); x.fillText(b, 62, y + 76);
    x.fillStyle = "#0b1220"; x.textAlign = "right"; x.font = F(900, 52); x.fillText(c, W - 62, y + 54); x.globalAlpha = 1;
  });
  x.fillStyle = n >= 4 ? "#3a4256" : "#8a93a3"; x.textAlign = "left"; x.font = F(800, 44); x.fillText(n >= 4 ? "+ 82 renglones de tu lista" : "Cargando la lista de precios…", 44, 940);
  // el total
  x.fillStyle = "#16243d"; rr(x, 36, 990, W - 72, 170, 30);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 56); x.fillText("Total", 76, 1075);
  x.fillStyle = "#5ce611"; x.textAlign = "right"; x.font = F(900, 96); x.fillText(total ? "$ 1.260.000" : "$ " + plata(n * 92000).slice(2), W - 70, 1078);
  // el botón
  const by = 1196; x.fillStyle = enviado ? "#5ce611" : pulsa ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(36, by, W - 72, 150, 75); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 62); x.fillText(enviado ? "Enviado" : "Enviar por WhatsApp", W / 2 - (enviado ? 30 : 0), by + 78); if (enviado) tilde(x, W / 2 + 150, by + 78, 56, "#0b1220", 13);
}
// Q4t · el panel "Presupuestos abiertos": la fila de Mónica aceptada; ganados (el contador sube), abiertos, perdidos
function dibujarPanel(x, W, H, { k = 1 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  enc(x, W, "Presupuestos abiertos", "Materiales Gustavo");
  // la fila de Mónica
  x.fillStyle = "#ffffff"; x.strokeStyle = "#3fa60a"; x.lineWidth = 10; x.beginPath(); x.roundRect(36, 214, W - 72, 230, 30); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 62); x.fillText("Casa Mónica", 70, 280); x.textAlign = "right"; x.font = F(900, 56); x.fillText("$ 1.260.000", W - 70, 280);
  x.fillStyle = "#3fa60a"; x.textAlign = "left"; x.font = F(900, 60); x.fillText("Aceptado", 70, 380); tilde(x, 380, 380, 56, "#3fa60a", 14);
  // las tres tarjetas
  const tarjeta = (y, h, fondo, borde, titulo, n, monto, extra, tinta = "#0b1220", gris = false) => {
    x.fillStyle = fondo; x.strokeStyle = borde; x.lineWidth = 8; x.beginPath(); x.roundRect(36, y, W - 72, h, 30); x.fill(); x.stroke();
    x.fillStyle = tinta; x.textAlign = "left"; x.font = F(900, 60); x.fillText(titulo, 70, y + 64); x.textAlign = "right"; x.font = F(900, 92); x.fillText(String(n), W - 70, y + 70);
    x.textAlign = "left"; x.font = F(800, 50); x.fillStyle = gris ? "#6b7080" : tinta; x.fillText(monto, 70, y + 140); if (extra) { x.font = F(700, 44); x.fillText(extra, 70, y + 204); }
  };
  const gan = k >= 1 ? 4 : 3, monto = k >= 1 ? "$ 2.135.000" : "$ 875.000";
  tarjeta(474, 180, "#cfeebc", "#3fa60a", "Ganados", gan, monto, null);
  tarjeta(678, 250, "#ffffff", "#16243d", "Abiertos", 5, "$ 690.000", "Seguimiento hoy: 2");
  tarjeta(952, 250, "#e3e0d2", "#b4b2a3", "Perdidos", 1, "$ 240.000", "Motivo: precio", "#3a4256", true);
  x.fillStyle = "#3a4256"; x.textAlign = "center"; x.font = F(800, 44); x.fillText("Este mes", W / 2, 1260);
}
// en reposo (antes de tocar): fondo navy, "Presupuestos" enorme y el botón verde "+ Nuevo"
function dibujarReposo(x, W, H) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "Presupuestos", 900, 140, W - 80); x.fillText("Presupuestos", W / 2, 360);
  x.fillStyle = "#5ce611"; x.fillRect(W / 2 - 300, 470, 600, 22);
  x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.beginPath(); x.roundRect(110, 760, W - 220, 330, 165); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(900, 150); x.fillText("+ Nuevo", W / 2, 930);
}
// ---- los chats (genéricos: burbujas crema y navy, sin el verde ni el logo de WhatsApp) ----
const CW = 740, CH = 1290;
function cabecera(x, W, cv, nombre, sub) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 176); x.fillStyle = "#5ce611"; x.fillRect(0, 176, W, 8);
  x.strokeStyle = "#efeee5"; x.lineWidth = 9; x.lineCap = "round"; x.beginPath(); x.moveTo(52, 70); x.lineTo(30, 92); x.lineTo(52, 114); x.stroke();
  avatar(x, cv, 124, 92, 54);
  x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#efeee5"; ajustar(x, nombre, 800, 52, W - 230); x.fillText(nombre, 196, 70);
  x.fillStyle = "#b9c3d3"; x.font = F(700, 38); x.fillText(sub, 198, 126);
}
// la tarjeta del presupuesto (en el chat): título, obra, monto, validez; con o sin botones
function tarjetaPres(x, X0, Y0, w0, o = {}) { const k = o.k ?? 1; x.save(); x.translate(X0, Y0); x.scale(k, k); const h = tarjetaPres1(x, 0, 0, w0 / k, o); x.restore(); return h * k; }
function tarjetaPres1(x, X, Y, w, { botones = false, pulsa = 0, aceptado = 0, yo = false, chico = false } = {}) {
  const h = chico ? 250 : botones ? 560 : 360;
  x.fillStyle = "#ffffff"; x.strokeStyle = yo ? "#16243d" : "#3fa60a"; x.lineWidth = 7; x.beginPath(); x.roundRect(X, Y, w, h, 30); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(X + 22, Y + 22, w - 44, 84, 18); x.fill();
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 48); x.fillText("PRESUPUESTO", X + 48, Y + 66);
  x.fillStyle = "#0b1220"; x.font = F(900, 52); x.fillText("Casa Mónica", X + 30, Y + 150);
  x.fillStyle = "#3a4256"; x.font = F(700, 40); if (!chico) x.fillText("Obra gris · 86 renglones", X + 30, Y + 206);
  x.fillStyle = "#0b1220"; x.font = F(900, chico ? 56 : 70); x.fillText("$ 1.260.000", X + 30, Y + (chico ? 210 : 276));
  if (!chico) { x.fillStyle = "#3a4256"; x.font = F(700, 38); x.fillText("Válido 10 días", X + 30, Y + 332); }
  if (botones) {
    const by = Y + 384;
    if (aceptado) {
      x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(X + 22, by, w - 44, 150, 30); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.font = F(900, 56); x.fillText("Aceptado", X + 50, by + 50); tilde(x, X + 330, by + 50, 50, "#0b1220", 12);
      x.font = F(800, 38); x.fillText("Primera entrega:", X + 50, by + 104); x.font = F(900, 40); x.fillText("lunes 8:00", X + 360, by + 104);
    } else {
      x.fillStyle = pulsa ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(X + 22, by, w - 44, 70, 35); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 46); x.fillText("Aceptar", X + w / 2, by + 37);
      x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(X + 22, by + 86, w - 44, 70, 35); x.fill(); x.stroke();
      x.fillStyle = "#16243d"; x.font = F(800, 42); x.fillText("Tengo una duda", X + w / 2, by + 123); x.textAlign = "left";
    }
  }
  return h;
}
function burbujaTxt(x, Y, lineas, { px = 46, hora = "", yo = false, verde = false } = {}) {
  x.font = F(800, px); const w = Math.min(CW - 60, Math.max(...lineas.map((l) => x.measureText(l).width)) + 80), h = 34 + lineas.length * px * 1.26 + 40;
  const X = yo ? CW - 26 - w : 26;
  x.fillStyle = yo ? "#dfe6f1" : "#ffffff"; x.strokeStyle = verde ? "#3fa60a" : "#16243d"; x.lineWidth = verde ? 7 : 5; x.beginPath(); x.roundRect(X, Y, w, h, yo ? [34, 8, 34, 34] : [8, 34, 34, 34]); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; lineas.forEach((l, i) => x.fillText(l, X + 30, Y + 22 + px * 0.62 + i * px * 1.26));
  x.fillStyle = "#6b7080"; x.font = F(700, 34); x.textAlign = "right"; x.fillText(hora, X + w - 24, Y + h - 24);
  return h;
}
// P2c · el celular de Gustavo, el domingo 23:22: el presupuesto enviado → "Visto"
function dibujarEnviado(x, W, H, { enviado = 0, visto = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  const w = 560, X = W - 26 - w, Y = 330;
  if (enviado) {
    tarjetaPres(x, X, Y, w, { yo: true });
    x.textAlign = "right"; x.textBaseline = "middle"; x.fillStyle = "#3a4256"; x.font = F(800, 44); x.fillText("Enviado 23:22", W - 40, Y + 410);
    if (visto) { x.fillStyle = "#c7655b"; rr(x, W - 330, Y + 460, 304, 96, 30); x.fillStyle = "#efeee5"; x.font = F(900, 54); x.textAlign = "center"; x.fillText("Visto ✓✓", W - 178, Y + 510); }
  }
  x.fillStyle = "#d9d7c9"; rr(x, W / 2 - 110, 220, 220, 64, 32); x.fillStyle = "#16243d"; x.font = F(800, 38); x.textAlign = "center"; x.fillText("DOMINGO", W / 2, 253);
  cabecera(x, W, AVATAR.monica, "Mónica (casa)", visto ? "en línea" : "últ. vez 21:05");
}
// Q2c · el celular de Mónica: el presupuesto de Materiales Gustavo con los botones
function dibujarLlega(x, W, H, { llega = 1, pulsa = 0, aceptado = 0, seguimiento = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  let Y = 214;
  x.fillStyle = "#d9d7c9"; rr(x, W / 2 - 100, Y, 200, 60, 30); x.fillStyle = "#16243d"; x.font = F(800, 36); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(seguimiento ? "SÁBADO" : "HOY", W / 2, Y + 31); Y += 86;
  if (seguimiento) {
    Y += tarjetaPres(x, 26, Y, 600, { chico: true }) + 26;
    x.fillStyle = "#d9d7c9"; rr(x, W / 2 - 100, Y, 200, 60, 30); x.fillStyle = "#16243d"; x.font = F(800, 36); x.textAlign = "center"; x.fillText("LUNES", W / 2, Y + 31); Y += 86;
    Y += burbujaTxt(x, Y, ["Hola, Mónica. ¿Pudiste", "ver el presupuesto de", "la casa? Si querés, lo", "dividimos por etapas."], { px: 50, hora: "10:02", verde: true }) + 28;
    if (aceptado) { x.globalAlpha = Math.min(1, aceptado * 1.5); burbujaTxt(x, Y, ["Aceptado ✓", "Primera entrega:", "lunes 8:00"], { px: 52, yo: true, verde: true, hora: "10:05" }); x.globalAlpha = 1; }
    else { const bw = 560; x.fillStyle = pulsa ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(26, Y, bw, 96, 48); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(900, 52); x.textAlign = "center"; x.fillText("Aceptar", 26 + bw / 2, Y + 50); }
  } else if (llega > 0) {
    x.globalAlpha = Math.min(1, llega * 1.6);
    const dy = (1 - eo(Math.min(1, llega))) * 60;
    const hb = burbujaTxt(x, Y + dy, ["Hola, Mónica. Te paso", "el presupuesto de la casa."], { px: 48, hora: "10:25" });
    tarjetaPres(x, 26, Y + dy + hb + 24, 688, { botones: true, pulsa, k: 1.1 });
    x.globalAlpha = 1;
  }
  cabecera(x, W, AVATAR.gustavo, "Materiales Gustavo", "en línea");
}
// Q3 · el celular de Gustavo: el aviso de seguimiento con el mensaje listo y "Enviar"
function dibujarAviso(x, W, H, { pulsa = 0, ok = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 176); x.fillStyle = "#5ce611"; x.fillRect(0, 176, W, 8);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 52); x.fillText("Presupuestos", 40, 70); x.fillStyle = "#b9c3d3"; x.font = F(700, 38); x.fillText("Materiales Gustavo", 42, 128);
  // la tarjeta del aviso
  x.fillStyle = "#16243d"; rr(x, 26, 214, W - 52, 330, 34);
  x.fillStyle = "#efeee5"; x.font = F(900, 54); x.fillText("Mónica no respondió", 60, 286);
  x.fillStyle = "#b9c3d3"; x.font = F(800, 42); x.fillText("Casa · $ 1.260.000 · 2 días", 60, 354);
  x.fillStyle = "#5ce611"; rr(x, 50, 400, W - 100, 110, 26); x.fillStyle = "#0b1220"; x.font = F(900, 52); x.textAlign = "center"; x.fillText("Hoy toca seguimiento", W / 2, 457);
  // el mensaje listo
  x.textAlign = "left"; x.fillStyle = "#3a4256"; x.font = F(800, 40); x.fillText("Mensaje listo:", 40, 600);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(26, 640, W - 52, 360, 30); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, 46); ["Hola, Mónica. ¿Pudiste", "ver el presupuesto de", "la casa? Si querés, lo", "dividimos por etapas."].forEach((l, i) => x.fillText(l, 56, 706 + i * 72));
  // el botón
  const by = 1040; x.fillStyle = ok ? "#5ce611" : pulsa ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(26, by, W - 52, 140, 70); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 64); x.fillText(ok ? "Enviado" : "Enviar", W / 2 - 40, by + 72); tilde(x, W / 2 + (ok ? 160 : 120), by + 72, 54, "#0b1220", 13);
}

// ---- los insertos a pantalla (pegados a la cámara): la tablet y el celular, con el fondo plano detrás ----
function crearFondoInserto(g, noche = false) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: noche ? 0x0b1220 : 0x1f3254 })); bg.position.z = -0.06; g.add(bg);
  for (let i = -8; i <= 8; i++) { const o = new THREE.Mesh(new THREE.PlaneGeometry(26 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: noche ? 0x16243d : 0x2c4268 })); o.position.set((i * 84) / PXK, 0, -0.059); g.add(o); }
  const pi = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 560 / PXK), new THREE.MeshBasicMaterial({ color: noche ? 0x6b5236 : 0xb08a5e })); pi.position.set(0, -1000 / PXK, -0.058); g.add(pi);
  const fr = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 26 / PXK), new THREE.MeshBasicMaterial({ color: 0x5ce611 })); fr.position.set(0, -720 / PXK, -0.057); g.add(fr);
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
const INS_T = { g: new THREE.Group() }; crearFondoInserto(INS_T.g);
const TAB = crearCelInserto(Math.round(TW * 0.94), Math.round(TH * 0.94), 540, 1000, 36, { funda: 0x0b1220 }); INS_T.g.add(TAB.g);
{ const at = new THREE.Mesh(rbox(560 / PXK, 46 / PXK, 0.005, 16 / PXK, 2), new THREE.MeshBasicMaterial({ color: 0x2c4268 })); at.position.set(0, (960 - 1720) / PXK, -0.034); INS_T.g.add(at); }
const INS_C = { g: new THREE.Group() }; crearFondoInserto(INS_C.g);
const CEL = crearCelInserto(CW, CH, 540, 1000, 34, { camara: true, funda: 0x1f3254 }); INS_C.g.add(CEL.g);
const INS_N = { g: new THREE.Group() }; crearFondoInserto(INS_N.g, true);
const CELN = crearCelInserto(CW, CH, 540, 1000, 34, { camara: true, funda: 0x1a1c20 }); INS_N.g.add(CELN.g);
for (const I of [INS_T, INS_C, INS_N]) { pegarACamara(I.g, camera, 10); I.g.visible = false; }
let claveTab = "", claveTab3 = "", claveCel = "";
function estadoTab(t, pa) {
  if (pa === "Q1t") return { k: "nuevo", n: Math.round(sg(t, T.filas[0] - 0.1, T.filas[3] + 0.08) * 4 * 4) / 4, total: t >= T.total ? 1 : 0, pulsa: t >= T.enviar - 0.08 ? 1 : 0, enviado: t >= T.enviar + 0.05 ? 1 : 0 };
  if (pa === "Q4t") return { k: "panel", k2: t >= T.gana ? 1 : 0 };
  return null;
}
function dibujarTabInserto(t, pa) {
  const e = estadoTab(t, pa); if (!e) return; const k = JSON.stringify(e); if (k === claveTab) return; claveTab = k;
  const x = TAB.tex.userData.x, W = TAB.IW, H = TAB.IH;
  x.save(); x.setTransform(W / TW, 0, 0, H / TH, 0, 0);
  if (e.k === "nuevo") dibujarNuevo(x, TW, TH, e); else dibujarPanel(x, TW, TH, { k: e.k2 });
  x.restore(); TAB.tex.needsUpdate = true;
}
// la tablet 3D del mostrador (parte 2)
function ponerTablet3D(t) {
  let e;
  if (t < T.toca) e = "reposo"; else if (t < T.q2) e = "nuevo"; else if (t < T.gira) e = "reposo"; else e = "panel";
  if (e === claveTab3) return; claveTab3 = e;
  const x = tabT.userData.x;
  if (e === "reposo") dibujarReposo(x, TW, TH); else if (e === "nuevo") dibujarNuevo(x, TW, TH, { n: 4, total: 1 }); else dibujarPanel(x, TW, TH, { k: 1 });
  tabT.needsUpdate = true;
}
function dibujarCelInserto(t, pa) {
  let I = CEL, k, f;
  if (pa === "P2c") { I = CELN; const e = { enviado: t >= T.enviado ? 1 : 0, visto: t >= T.visto ? 1 : 0 }; k = pa + JSON.stringify(e); f = (x) => dibujarEnviado(x, CW, CH, e); }
  else if (pa === "Q2c") { const e = { llega: Math.round(sg(t, T.llega, T.llega + 0.3) * 6) / 6 }; k = pa + JSON.stringify(e); f = (x) => dibujarLlega(x, CW, CH, e); }
  else if (pa === "Q3c") { const e = { pulsa: t >= T.seg - 0.06 ? 1 : 0, ok: t >= T.segOk ? 1 : 0 }; k = pa + JSON.stringify(e); f = (x) => dibujarAviso(x, CW, CH, e); }
  else if (pa === "Q3a") { const e = { seguimiento: 1, pulsa: t >= T.acepta - 0.06 ? 1 : 0, aceptado: Math.round(sg(t, T.aceptado, T.aceptado + 0.25) * 4) / 4 }; k = pa + JSON.stringify(e); f = (x) => dibujarLlega(x, CW, CH, e); }
  else return;
  if (k === claveCel) return; claveCel = k;
  f(I.tex.userData.x); I.tex.needsUpdate = true;
}

// =====================================================================================================
// LAS TARJETAS DE ESTE REEL (globos en dos tiempos: la "a" hasta CORTE, después la entera)
// =====================================================================================================
const ROJO = { fondo: "#c7655b", borde: C.navy };
const GL = {
  m1a: crearGlobo(["Gustavo, ¿me pasás", "[presupuesto?]"], 66),
  m1: crearGlobo(["Gustavo, ¿me pasás", "[presupuesto?]", "Es toda la casa."], 66),
  g2: crearGlobo(["Te lo armo", "para el [lunes.]"], 72),
  t3: crearGlobo(["Gustavo, ¿la de", "la casa te [compró?]"], 68),
  g4: crearGlobo(["Yo no ando", "[persiguiendo]", "a nadie."], 72),
  m5a: crearGlobo(["¡Gustavo!"], 76),
  m5: crearGlobo(["¡Gustavo!", "¡Arrancamos la [casa!]"], 68),
  m6a: crearGlobo(["El de la otra cuadra", "me escribió", "[todos los días.]"], 62),
  m6: crearGlobo(["El de la otra cuadra", "me escribió", "[todos los días.]", "¡Un pesado!"], 62),
  g7: crearGlobo(["Por lo menos", "yo no fui [pesado.]"], 72),
  m8a: crearGlobo(["¡Y gracias por tu", "[presupuesto!]"], 66),
  m8: crearGlobo(["¡Y gracias por tu", "[presupuesto!]", "Se lo pasé a él."], 66),
  g10: crearGlobo(["Te lo armo [ahora.]"], 72),
  m11: crearGlobo(["¡Ay, qué [atentos!]"], 74),
  g12a: crearGlobo(["Compró."], 72),
  g12: crearGlobo(["Compró.", "Con un [botón.]"], 72),
  g13a: crearGlobo(["Ya sé."], 72),
  g13: crearGlobo(["Ya sé.", "Es mi [camión.]"], 72),
  rot4h: crearRotulo([["4 horas armándolo", "#efeee5", 56]], 56, ROJO),
  rotP: crearRotulo([["Presupuesto: 4 horas", "#efeee5", 50], ["$ 1.260.000: con otro", "#efeee5", 50]], 50, ROJO),
  rotS: crearRotulo([["Seguimientos: 0", "#efeee5", 52]], 52, ROJO),
  rotQ1: crearRotulo([["Con tu [lista de precios]"]], 52),
  rotQ2: crearRotulo([["Lo acepta con un [botón]"]], 52),
  rotQ3: crearRotulo([["A los 2 días te avisa:"], ["toca [seguimiento]"]], 52),
  rotQ4: crearRotulo([["Lo ganado, lo abierto"], ["y lo [perdido]"]], 52),
};
const GUIAS = [crearGuia(), crearGuia()];

// =====================================================================================================
// CÁMARA
// =====================================================================================================
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
  return [...p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3)), a[8] ?? 0];
}
function ponerCam(v, t) {
  const mano = Math.sin(t * 0.9) * 0.002;
  if (v[7]) camera.up.set(0, 0, 1); else camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.0015, v[2]);
  camera.fov = v[6]; camera.updateProjectionMatrix();
  camera.lookAt(_m.set(v[3], v[4], v[5]));
}
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }
const L2 = (a, b, k) => a.map((v, i) => lerp(v, b[i], k));
// encuadres (px, py, pz, mx, my, mz, fov) · k: 0 → 1 a lo largo del plano (push-in suave)
const CA = (k) => L2([-0.62, 1.72, 3.45, -0.38, 1.08, 0.2, 50], [-0.6, 1.7, 3.3, -0.38, 1.1, 0.2, 49], k);   // el cuadro 0 (P1, Q1)
const CG = (k) => L2([-0.42, 1.5, 1.62, -0.95, 1.38, -0.6, 44], [-0.46, 1.5, 1.5, -0.95, 1.4, -0.6, 42], k);   // Gustavo (P1g, Q1g)
const CN1 = (k) => L2([0.35, 1.52, 1.75, -1.0, 1.12, -0.25, 42], [0.3, 1.5, 1.6, -1.0, 1.12, -0.25, 41], k);   // 19:10
const CN2 = (k) => L2([0.55, 0.95, 1.7, -0.9, 0.85, 0.2, 54], [0.48, 0.92, 1.6, -0.9, 0.85, 0.2, 52], k);   // 21:30: la cinta cuelga
const CN3 = (k) => L2([-0.98, 1.6, -0.76, -1.05, 1.11, -0.07, 44], [-1.04, 1.45, -0.53, -1.05, 1.11, -0.07, 40], eio(k));   // el punto de vista de Gustavo (él no se ve)   // 23:20: push-in al display
const CT = (k) => L2([-0.5, 1.62, -1.0, -0.6, 1.28, 0.72, 50], [-0.5, 1.6, -0.9, -0.6, 1.28, 0.72, 48], k);   // Tito con los codos, desde el lado de Gustavo (P3, Q4)
const CGu = (k) => L2([0.8, 1.72, 1.4, -0.95, 1.45, -0.6, 44], [0.74, 1.72, 1.3, -0.95, 1.46, -0.6, 42], k);   // Gustavo, por encima del hombro de Tito (P3g, Q4b)
const CQ5b = (k) => L2([-3.4, 2.05, 0.75, -1.6, 0.98, -0.72, 42], [-3.3, 2.02, 0.66, -1.6, 0.98, -0.72, 41], k);   // desde la punta del mostrador: Tito de 3/4 y el cajón   // Tito y el cajón
const CP4 = (k) => L2([XC + 0.1, 1.95, -0.7, XC - 0.2, 1.25, 8.0, 42], [XC + 0.1, 1.93, -0.55, XC - 0.2, 1.25, 8.0, 41], k);   // desde el portón
const CP4m = (k) => L2([XC + 0.18, 1.68, -0.75, XC + 0.25, 1.42, 1.95, 38], [XC + 0.18, 1.67, -0.62, XC + 0.25, 1.42, 1.95, 37], k);   // Mónica (por encima del hombro de Gustavo)
const CP4p = (k) => L2([XC - 0.1, 1.3, -1.6, XC + 0.0, 1.5, 5.0, 46], [XC - 0.1, 1.3, -1.5, XC + 0.0, 1.5, 5.0, 45], k);   // la pausa: los dos y el camión
const CP5 = (k) => L2([XC - 0.25, 1.62, 3.6, XC - 0.45, 1.62, 0.9, 30], [XC - 0.27, 1.62, 3.4, XC - 0.45, 1.62, 0.9, 29], k);   // Gustavo de cerca
const CP6 = (k) => L2([XC + 0.15, 1.66, -0.35, XC + 0.25, 1.48, 1.95, 34], [XC + 0.15, 1.66, -0.25, XC + 0.25, 1.48, 1.95, 33], k);   // Mónica de cerca
const CP6i = (k) => L2([XT + 0.02, 1.78, 1.2, XT + 0.16, 1.48, -0.44, 34], [XT + 0.08, 1.7, 0.98, XT + 0.17, 1.49, -0.44, 33], eo(k));   // el tablero
const MT = { x: XC + 0.6, z: 12.0 };   // Mónica en su terreno (Q3m)
const CQ3m = (k) => L2([XC + 0.45, 1.55, 10.0, XC + 0.6, 1.45, 12.0, 44], [XC + 0.45, 1.55, 10.2, XC + 0.6, 1.45, 12.0, 42], k);
const CC = (k) => L2([XC + 0.6, 1.55, -2.0, XC + 0.6, 1.4, 0.75, 40], [XC + 0.6, 1.55, -1.85, XC + 0.6, 1.41, 0.75, 39], k);   // el cierre
const PLANOS = [];
function armarPlanos() {
  const P = (n, a, b, f) => PLANOS.push([n, a, f ? [[a, ...f(0)], [b, ...f(1)]] : null]);
  P("P1", 0, T.p1g, CA); P("P1g", T.p1g, T.p2, CG);
  P("P2a", T.n1, T.n2, CN1); P("P2b", T.n2, T.n3, CN2); P("P2d", T.n3, T.p2c, CN3);
  PLANOS.push(["P2c", T.p2c, null]);
  P("P3", T.p3, r2(T.g4 - 0.12), CT); P("P3g", r2(T.g4 - 0.12), T.p4, CGu);
  P("P4", T.p4, T.p4m, CP4); P("P4m", T.p4m, T.p4p, CP4m); P("P4p", T.p4p, T.p5, CP4p);
  P("P5", T.p5, T.p6, CP5); P("P6", T.p6, T.p6i, CP6); P("P6i", T.p6i, P1, CP6i);
  // ---- parte 2 ----
  P("Q1", P2, T.q1g, CA); P("Q1g", T.q1g, T.q1t, CG);
  PLANOS.push(["Q1t", T.q1t, null]); PLANOS.push(["Q2c", T.q2, null]); PLANOS.push(["Q3c", T.q3, null]);
  P("Q3m", T.q3m, T.q3a, CQ3m); PLANOS.push(["Q3a", T.q3a, null]);
  P("Q4", T.q4, T.q4t, CT); PLANOS.push(["Q4t", T.q4t, null]); P("Q4b", T.q4b, T.q5, CGu);
  P("Q5", T.q5, T.q5g, CP4); P("Q5g", T.q5g, T.q5b, CP5); P("Q5b", T.q5b, T.c, CQ5b);
  P("C", T.c, DUR, CC);
}
armarPlanos();

// =====================================================================================================
// POSES
// =====================================================================================================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.82, tension: 0.2, feliz: 0 }, cejas: { alto: -0.05, ang: -0.1 }, boca: { sonrisa: 0.08, abierta: 0, ancho: 0.8 } };
const DIGNO = { ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.1, feliz: 0.1 }, cejas: { alto: 0.2, ang: -0.05, asim: 0.2 }, boca: { sonrisa: 0.2, abierta: 0, ancho: 0.9 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.92, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } };
const AMABLE = { ...CARA.sonrisa, ojos: { abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.4, ang: 0.25, asim: 0 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } };
const CANSADO = { ...CARA.neutra, ojos: { abiertos: 0.62, tension: 0.3, feliz: 0 }, cejas: { alto: 0.15, ang: 0.5 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.85 } };
const FELIZ = { ...CARA.feliz, ojos: { abiertos: 1, tension: 0, feliz: 0.28 }, boca: { sonrisa: 1, abierta: 0, ancho: 1.15 } };   // ojos abiertos: con feliz alto se leían cerrados
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (!env) return;
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const manoA = (per, p, w, k, lado = "D") => { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "D" ? "manoD" : "manoI"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(Math.min(1, k)))); };
const giroHacia = (de, a) => Math.atan2(a.x - de.x, a.z - de.z);
const MON0 = { x: 0.08, z: 0.78 }, TITO0 = { x: -0.6, z: 0.72, giro: Math.PI - 0.55 };
const GC = { x: XC - 0.45, z: 0.9 };            // Gustavo en el portón (la calle)
const MC = { x: XC + 0.28, z: 1.95 };           // Mónica frente a Gustavo, en la vereda
const MC0 = { x: XC - 2.15, z: 8.2 };            // de donde sale Mónica (detrás del camión)
const LEJOS = { x: 12, z: 6 };
const TECLAS = () => { CALC_G.updateMatrixWorld(true); return CALC_G.localToWorld(V3(0, 0.06, 0.06)); };
function poseGustavo(t) {
  const p2 = t >= P2;
  const base = { x: G0.x, z: G0.z, giro: 0, ...aC(0, 0.1), ...CARA.neutra, ...BRAZOS.apoyado };
  if (!p2 && t < T.p2) {
    // P1 · mira la lista que cae (la cabeza hacia el frente del mostrador), sonrisa de oficio; "Te lo armo para el lunes."
    const p = poseEn(t, [
      [0, { ...base, giro: 0.15, ...aC(0.25, 0.32), ...MEDIA }],
      [1.2, { ...aC(0.3, 0.5), ...CARA.incredula }, 0.4],
      [T.g2 - 0.1, { giro: 0.12, ...aC(0.12, 0.12), ...AMABLE }, 0.3],
    ]);
    p.t = t; bocaVoz(p, t, T.g2, ENV.g2, 0.6); return p;
  }
  if (!p2 && t < T.p3) {
    // P2 · el domingo a la noche: encorvado sobre la calculadora; la mano derecha teclea, la izquierda en la lista
    const p = poseEn(t, [
      [0, { ...base, inclina: 0.08, giro: 0.0, ...aC(0.0, 0.32), ...CARA.concentrada, ojos: { abiertos: 0.88, y: -0.6 } }],
      [T.n2, { inclina: 0.1, ...aC(-0.05, 0.3), ...CANSADO, ojos: { abiertos: 0.78, tension: 0.3 } }, 0.3],
      [T.n3, { inclina: 0.12, ...aC(0.0, 0.25, 0.08), ...CANSADO, ojos: { abiertos: 0.55, tension: 0.4 } }, 0.3],
    ]);
    const k = TECLAS(); const tec = Math.sin(t * 22) * 0.012;
    manoA(gustavo, p, k.clone().add(V3(0.02, 0.05 + Math.max(0, tec), -0.02)), 1 - sg(t, T.n3 - 0.05, T.n3 + 0.2), "D");   // en 23:20 suelta: el display queda a la vista
    manoA(gustavo, p, V3(LISTA_N.x + 0.05, Y + 0.05, -0.12), 1, "I");
    p.t = t; return p;
  }
  if (!p2 && t < T.p4) {
    // P3 · jueves: enrolla la cinta (las dos manos con el rollito); "Yo no ando persiguiendo a nadie." digno
    const p = poseEn(t, [
      [0, { ...base, giro: 0.55, ...aC(0.1, 0.4), ...CARA.concentrada }],
      [T.g4 - 0.1, { ...aC(0.35, -0.08, 0.05), ...DIGNO }, 0.3],
    ]);
    const r = rollitoP3(t);
    manoA(gustavo, p, r.clone().add(V3(0.09, 0.0, 0)), 1, "I"); manoA(gustavo, p, r.clone().add(V3(-0.09, 0.0, 0)), 1, "D");
    p.t = t; bocaVoz(p, t, T.g4, ENV.g4, 0.6); return p;
  }
  if (!p2 && t < P1) {
    // P4–P6 · la calle: mira a Mónica que cruza, mira el camión, el remate seco, la mira agradecida
    const hm = giroHacia(GC, MC);
    const p = poseEn(t, [
      [0, { x: GC.x, z: GC.z, giro: 0.15, ...aC(0.15, -0.02), ...MEDIA, ...BRAZOS.costado }],
      [T.p4m, { giro: hm * 0.55, ...aC(hm * 0.4, 0.0), ...CARA.esperanza }, 0.3],
      [T.m6 + 1.0, { ...aC(0.05, -0.02), ...CARA.neutra }, 0.4],
      [T.p4p + 0.1, { ...aC(0.0, -0.04), ...SECO }, 0.3],
      [T.g7, { ...aC(-0.05, 0.02, 0.05), ...SECO }, 0.25],
      [T.p6 + 0.1, { giro: hm * 0.6, ...aC(hm * 0.4, 0.05), ...CARA.neutra }, 0.25],
      [T.p6i, { ...aC(hm * 0.2, 0.15), ...SECO }, 0.25],
    ]);
    p.t = t; bocaVoz(p, t, T.g7, ENV.g7, 0.5); return p;
  }
  // ---------- parte 2 ----------
  if (t < T.q2) {
    // Q1 · mira la lista caer; toca la tablet: "Te lo armo ahora."
    const p = poseEn(t, [
      [0, { ...base, giro: 0.15, ...aC(0.25, 0.32), ...MEDIA }],
      [T.toca - 0.1, { giro: 0.3, ...aC(0.4, 0.3), ...AMABLE }, 0.3],
    ]);
    const kT = sg(t, T.toca - 0.25, T.toca);
    TABLET.updateMatrixWorld(true); manoA(gustavo, p, TABLET.localToWorld(V3(-0.04, 0.12, 0.07)), kT, "D"); if (kT > 0.5) p.dedoD = 1;
    p.t = t; bocaVoz(p, t, T.g10, ENV.g10, 0.6); return p;
  }
  if (t < T.q5) {
    // Q4 · Tito pregunta; le gira la tablet; "Compró. Con un botón."
    const p = poseEn(t, [
      [0, { ...base, giro: 0.45, ...aC(0.3, 0.15), ...MEDIA }],
      [T.gira + 0.2, { ...aC(0.3, 0.1), ...MEDIA }, 0.3],
      [T.q4b, { giro: 0.1, ...aC(0.1, 0.0), ...AMABLE }, 0.01],
    ]);
    const kT = sg(t, T.gira - 0.25, T.gira) * (1 - sg(t, T.gira + 0.55, T.gira + 0.8));
    TABLET.updateMatrixWorld(true); manoA(gustavo, p, TABLET.localToWorld(V3(0.1, 0.12, 0.0)), kT, "D");
    p.t = t; bocaVoz(p, t, T.g12, ENV.g12, 0.6); return p;
  }
  if (t < T.c) {
    // Q5 · la calle: su camión descarga; "Ya sé. Es mi camión." con media sonrisa
    const hm = giroHacia(GC, MC);
    const p = poseEn(t, [
      [0, { x: GC.x, z: GC.z, giro: 0.15, ...aC(0.15, -0.02), ...MEDIA, ...BRAZOS.costado }],
      [T.q5g, { giro: hm * 0.55, ...aC(hm * 0.35, 0.0), ...MEDIA }, 0.3],
      [T.g13 + CORTE.g13, { ...aC(hm * 0.2, -0.04, 0.06), ...AMABLE, ojos: { abiertos: 0.85, feliz: 0.45 } }, 0.25],
    ]);
    p.t = t; bocaVoz(p, t, T.g13, ENV.g13, 0.55); return p;
  }
  // C · a cámara en el portón, de colega
  const p = poseEn(t, [[0, { x: XC + 0.6, z: GC.z - 0.15, giro: Math.PI, ...aC(0.02, 0.02, 0.04), ...MEDIA, ...BRAZOS.costado }], [T.g14 + 0.6, { ...aC(0.05, 0.0, 0.0), ...AMABLE }, 0.4]]);
  p.ojos.x = 0.05; p.ojos.y = 0.05;
  p.t = t; bocaVoz(p, t, T.g14, ENV.g14, 0.6); return p;
}
// el rollito de cinta en las manos de Gustavo (P3): delante de la panza, gira mientras lo enrolla
const rollitoP3 = (t) => V3(G0.x + 0.12, Y + 0.16, G0.z + 0.42);
function poseMonica(t) {
  const p2 = t >= P2;
  const enMos = (!p2 && t < T.p2) || (p2 && t < T.q2);
  if (enMos) {
    const t0 = p2 ? T.m1b : T.m1;
    const hG = giroHacia(MON0, G0);
    const base = { x: MON0.x, z: MON0.z, giro: -1.25, ...aC(0.12, 0.1), ...CARA.sonrisa, ...BRAZOS.costado };   // de perfil hacia Gustavo, un poco a cámara
    const p = poseEn(t, [
      [0, { ...base, ...aC(0.15, 0.25) }],
      [t0 + CORTE.m1 - 0.1, { ...aC(0.1, 0.12), ...FELIZ, ojos: { abiertos: 0.9, feliz: 0.4 } }, 0.25],
      [t0 + LEN.m1 + 0.2, { ...aC(0.0, 0.3), ...CARA.sonrisa }, 0.3],
    ]);
    manoA(monica, p, V3(LISTA.x + 0.06, Y + 0.035, 0.1), 1 - sg(t, (p2 ? P2 : 0) + 1.6, (p2 ? P2 : 0) + 2.0) * 0.2, "I");   // aprieta la punta de la lista
    p.t = t; bocaVoz(p, t, t0, ENV.m1, 0.55); return p;
  }
  // la calle: cruza con el casco en la mano y llega frente a Gustavo (P4, Q5)
  const enCalle = (!p2 && t >= T.p4 && t < P1) || (p2 && t >= T.q5 && t < T.q5b);
  if (enCalle) {
    const tc = p2 ? T.q5 : T.p4, tl = p2 ? T.q5g - 0.1 : T.p4m - 0.1, tv = p2 ? T.m5b : T.m5;
    const u = sg(t, tc, tl), e = eio(u);
    const x = lerp(MC0.x, MC.x, e), z = lerp(MC0.z, MC.z, e);
    const hG = giroHacia(MC, GC);
    const dir = Math.atan2(MC.x - MC0.x, MC.z - MC0.z);
    const p = poseEn(t, [
      [0, { x, z, giro: dir, ...aC(0.0, -0.05), ...FELIZ, ...BRAZOS.costado }],
      [tl, { giro: hG - 0.15, ...aC(-0.15, 0.0), ...FELIZ }, 0.3],
      ...(p2 ? [] : [
        [T.m6, { ...aC(-0.1, 0.0), ...FELIZ }, 0.2],
        [T.m6 + CORTE.m6, { ...aC(-0.12, 0.05, 0.1), ...FELIZ, ojos: { abiertos: 0.9, feliz: 0.4 } }, 0.15],
        [T.p4p + 0.1, { ...aC(-0.1, 0.0), ...CARA.sonrisa }, 0.3],
        [T.m8, { ...aC(-0.12, 0.05, 0.06), ...AMABLE }, 0.25],
      ]),
    ]);
    p.x = x; p.z = z; if (u > 0 && u < 1) { p.paso = 1; p.giro = dir; }
    p.t = t; bocaVoz(p, t, tv, ENV.m5, 0.55); if (!p2) { bocaVoz(p, t, T.m6, ENV.m6, 0.55); bocaVoz(p, t, T.m8, ENV.m8, 0.55); } return p;
  }
  // Q3m · en su terreno, con el celular: lee y se ríe
  if (p2 && t >= T.q3m && t < T.q3a) {
    const p = poseEn(t, [[0, { x: MT.x, z: MT.z, giro: Math.PI + 0.12, ...aC(0.05, 0.22), ...CARA.neutra, ojos: { abiertos: 1, y: -0.3 }, ...BRAZOS.celular }], [T.m11 - 0.05, { ...aC(0.0, 0.05), ...FELIZ }, 0.2]]);
    p.t = t; bocaVoz(p, t, T.m11, ENV.m11, 0.5); return p;
  }
  const p = poseEn(t, [[0, { x: LEJOS.x, z: LEJOS.z, giro: 0, ...BRAZOS.costado }]]); p.t = t; return p;
}
const enTito = (dx, dy, dz, b = TITO0) => { const g = b.giro, c = Math.cos(g), sn = Math.sin(g); return V3(b.x + dx * c + dz * sn, dy, b.z - dx * sn + dz * c); };
const TITO_Q5 = { x: -1.55, z: -0.92, giro: 0.15 };   // Q5b: Tito del lado de Gustavo, guarda la cinta
function poseTito(t) {
  const p2 = t >= P2;
  const enMos = (!p2 && t >= T.p3 && t < T.p4) || (p2 && t >= T.q4 && t < T.q5);
  if (enMos) {
    const t1 = p2 ? T.t3b : T.t3;
    const p = poseEn(t, [[0, { x: TITO0.x, z: TITO0.z, giro: TITO0.giro, inclina: 0.24, ...aC(-0.15, -0.15), ...CARA.esperanza, ...BRAZOS.apoyado }], [t1 + LEN.t3 + 0.1, { ...aC(-0.25, -0.1), ...CARA.neutra }, 0.3], ...(p2 ? [[T.q4b + 0.4, { ...aC(-0.2, -0.05), ...CARA.sorpresa, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 } }, 0.3]] : [[T.g4 + 0.6, { ...aC(-0.2, -0.05), ...CARA.incredula }, 0.3]])]);
    manoA(tito, p, enTito(0.2, Y + 0.04, 0.42), 1, "I"); manoA(tito, p, enTito(-0.2, Y + 0.04, 0.42), 1, "D");
    p.t = t; bocaVoz(p, t, t1, ENV.t3, 0.6); return p;
  }
  if (p2 && t >= T.q5b && t < T.c) {
    const p = poseEn(t, [[0, { x: TITO_Q5.x, z: TITO_Q5.z, giro: TITO_Q5.giro - 0.6, inclina: 0.1, ...aC(-0.3, 0.22), ...MEDIA, ...BRAZOS.costado }], [T.cierra, { inclina: 0.05, ...aC(0.0, 0.1), ...AMABLE }, 0.25]]);
    const r = rollitoQ5(t);
    const kr = 1 - sg(t, T.guarda + 0.05, T.guarda + 0.2);
    manoA(tito, p, r.clone().add(V3(0.08, 0.02, -0.03)), kr, "I"); manoA(tito, p, r.clone().add(V3(-0.08, 0.02, -0.03)), Math.max(kr, sg(t, T.cierra - 0.25, T.cierra - 0.05) * (1 - sg(t, T.cierra + 0.1, T.cierra + 0.3))), "D");
    if (t >= T.guarda) { const c = V3(CAJ.x, CAJ.y + 0.06, -0.02 - 0.42 * cajonAbre(t) - 0.22); manoA(tito, p, c, sg(t, T.cierra - 0.25, T.cierra - 0.05) * (1 - sg(t, T.cierra + 0.1, T.cierra + 0.3)), "D"); }
    p.t = t; return p;
  }
  const p = poseEn(t, [[0, { x: LEJOS.x + 1, z: LEJOS.z, giro: 0, ...BRAZOS.costado }]]); p.t = t; return p;
}
const cajonAbre = (t) => (t >= T.q5b && t < T.c ? 1 - eio(sg(t, T.cierra - 0.15, T.cierra + 0.05)) : 0);
// el rollito en Q5b: de la calculadora (punta del mostrador) a las manos de Tito y al cajón
function rollitoQ5(t) {
  const a = V3(-1.25, Y + 0.06, -0.05), b = V3(-1.38, Y + 0.12, -0.58), c = V3(CAJ.x, CAJ.y - 0.03, -0.02 - 0.42 - 0.08);
  if (t < T.guarda) return a.lerp(b, eio(sg(t, T.q5b, T.q5b + 0.3)));
  const u = sg(t, T.guarda, T.guarda + 0.18); const p = b.clone().lerp(c, ei(u)); return p;
}
// el peón: en la plataforma, de frente a la cámara, pasa ladrillos de a uno a la pila (determinístico, cada 0,62 s)
const CICLO = 0.62;
function posePeon(t) {
  const cam = t >= P2 ? CAM_NAVY : CAM_GRIS, t0 = t >= P2 ? T.q5 : T.p4;
  const f = ((t - t0 - 0.9) / CICLO) % 1, fase = f < 0 ? f + 1 : f;
  const x = cam.position.x - 1.3, z = CAM_POS.z - 0.55;
  const agacha = Math.sin(fase * Math.PI * 2) * 0.5 + 0.5;
  const p = poseEn(t, [[0, { x, y: 0.89, z, giro: -0.4, inclina: 0.1 + agacha * 0.35, ...aC(-0.2, 0.2), ...CARA.concentrada, manoI: [0.16, 0.2 + (1 - agacha) * 0.35, 0.4], manoD: [-0.16, 0.2 + (1 - agacha) * 0.35, 0.4] }]]);
  p.t = t; return p;
}

// =====================================================================================================
// RENDER
// =====================================================================================================
const _a = new THREE.Vector3();
const enManoDe = (obj, per, lado, off = V3(0, 0, 0), rot = null) => { const m = manoMundo(per, lado, _a); obj.position.copy(m).add(off); if (rot) obj.rotation.set(...rot); };
const LISTA_N = { x: -0.5 };   // la lista de Mónica, de noche, al lado de la calculadora
const DIA_BG = new THREE.Color(0xe4dfcf), NOCHE_BG = new THREE.Color(0x0b1220), CALLE_BG = new THREE.Color(0xdde4e2);
function luces(lugar) {
  if (lugar === "noche") {
    scene.background = NOCHE_BG; scene.environmentIntensity = 0.12;
    cielo.intensity = 0.32; cielo.color.set(0x8a9ab8); cielo.groundColor.set(0x1a2030); relleno.intensity = 0.12; rim.intensity = 0.25;
    sol.color.set(0xffe2b0); sol.intensity = 2.3; sol.position.set(-0.9, Y + 1.9, 0.9); sol.target.position.set(-1.0, Y + 0.2, -0.5); sol.target.updateMatrixWorld();
    Object.assign(sol.shadow.camera, { left: -1.6, right: 1.6, top: 1.6, bottom: -1.6 }); sol.shadow.camera.updateProjectionMatrix();
    return;
  }
  scene.environmentIntensity = 0.5; cielo.color.set(0xf7f4ea); cielo.groundColor.set(0x8a8678); sol.color.set(0xfff4e2);
  if (lugar === "calle") {
    scene.background = CALLE_BG; cielo.intensity = 1.9; relleno.intensity = 0.7; rim.intensity = 0.45; sol.intensity = 1.5;
    Object.assign(sol.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 }); sol.shadow.camera.updateProjectionMatrix();
    sol.position.set(XC + 5, 9, 9); sol.target.position.set(XC, 0.6, 4.5); sol.target.updateMatrixWorld();
    return;
  }
  scene.background = DIA_BG; cielo.intensity = 1.75; relleno.intensity = 0.8; rim.intensity = 0.45; sol.intensity = 1.35;
  Object.assign(sol.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4 }); sol.shadow.camera.updateProjectionMatrix();
  const cx = lugar === "tablero" ? XT : -0.8; sol.position.set(cx + 4, 6.5, 5); sol.target.position.set(cx, 0.6, 0); sol.target.updateMatrixWorld();
}
const LUGAR = { P2a: "noche", P2b: "noche", P2d: "noche", P2c: "noche", P4: "calle", P4m: "calle", P4p: "calle", P5: "calle", P6: "calle", Q3m: "calle", Q5: "calle", Q5g: "calle", C: "calle", P6i: "tablero" };
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual, lugar = LUGAR[pa] ?? "dia";
  luces(lugar);
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (VER === "portada") ponerCam([-0.5, 1.45, 2.95, -0.33, 1.1, 0.15, 46], t);   // el fondo de la portada: Gustavo y Mónica arriba, la lista cayendo
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  // ---- los objetos del galpón ----
  const noche = lugar === "noche";
  NOCHE.visible = noche; LAMPARA.visible = noche; LAMPARA.position.set(-1.6, Y, -0.22); LAMPARA.rotation.y = 1.3; FOCO_M.emissiveIntensity = noche ? 2.2 : 0;
  // la lista de Mónica: cae en P1/Q1; de noche, doblada al lado de la calculadora; después no está
  const tL = p2 ? t - P2 : t;
  LISTA_M.visible = ROLLO_L.visible = (!p2 && t < T.p2) || (p2 && t < T.q2);
  if (LISTA_M.visible) ponerLista(lerp(1.05, LISTA_C.L - 0.02, eo(sg(tL, 0, 2.3))), 0);
  // la calculadora de rollo: de noche delante de Gustavo; el jueves al costado; en la parte 2, guardada en la punta
  CALC_G.visible = !p2 ? t >= T.p2 && t < T.p4 : t >= T.q4 && t < T.c;
  if (!p2 && t < T.p3) { CALC_G.position.set(CALC.x, Y, CALC.z); CALC_G.rotation.y = Math.PI; }
  else { CALC_G.position.set(p2 ? -1.05 : -1.95, Y, -0.08); CALC_G.rotation.y = Math.PI - 0.5; }
  // la cinta: crece en el montaje (19:10 corta, 21:30 cuelga, 23:20 enrulada en el piso)
  const Lc = !p2 && t >= T.p2 && t < T.p3 ? lerp(0.12, CINTA_C.L, eio(sg(t, T.n1 + 0.2, T.n3 + 0.3)) * 0.35 + 0.65 * eo(sg(t, T.n2, T.n3 + 0.4))) : 0;
  ponerCinta(Lc);
  const nDisp = !p2 && t >= T.p2 && t < T.p3 ? (t < T.n2 ? "228.000" : t < T.n3 ? "734.400" : "1.260.000") : "0";
  ponerDisplay(nDisp);
  // el rollito de cinta: P3 en las manos de Gustavo; Q5b de la calculadora al cajón
  ROLLITO.visible = (!p2 && t >= T.p3 && t < T.p4) || (p2 && t >= T.q4 && t < T.c && (t < T.q5b || t < T.cierra));
  if (ROLLITO.visible) {
    if (!p2) { ROLLITO.position.copy(rollitoP3(t)); ROLLITO.rotation.set(-t * 6, 0.55, 0); ROLLITO.scale.setScalar(lerp(0.7, 1.0, sg(t, T.p3, T.p4))); }
    else if (t < T.q5b) { ROLLITO.position.set(-1.25, Y + 0.06, -0.05); ROLLITO.rotation.set(0, 0.5, 0); ROLLITO.scale.setScalar(1); }
    else { ROLLITO.position.copy(rollitoQ5(t)); ROLLITO.rotation.set(-t * 3, 0.1, 0); ROLLITO.scale.setScalar(1); }
  }
  // el cajón (se abre en Q5b y se cierra de golpe)
  ponerCajon(cajonAbre(t));
  MATE.visible = TERMO.visible = true;
  if (!p2 && t >= T.p2 && t < T.p3) { MATE.position.set(-1.5, Y, -0.16); TERMO.position.set(-1.7, Y, -0.24); } else { MATE.position.set(p2 ? 0.42 : -2.18, Y, -0.12); TERMO.position.set(p2 ? 0.6 : -2.42, Y, -0.16); }
  // la tablet (no existe en la parte 1): en Q4 empieza de cara a Gustavo y se la gira a Tito
  TABLET.visible = p2 && !(lugar === "calle");
  if (TABLET.visible) {
    if (t >= T.q4 && t < T.q5) TABLET.rotation.y = lerp(Math.PI - 0.5, -0.55, eio(sg(t, T.gira, T.gira + 0.5)));
    else TABLET.rotation.y = -0.35;
    ponerTablet3D(t);
  }
  // ---- la calle: los camiones, la pila de ladrillos, el ladrillo en el aire ----
  const calleGris = !p2 && t >= T.p4 && t < P1, calleNavy = p2 && (t >= T.q5 && t < T.q5b || t >= T.c);
  CAM_GRIS.visible = calleGris; CAM_NAVY.visible = calleNavy;
  if (calleGris) ponerCamion(CAM_GRIS, t, T.p4 - 0.5);
  if (calleNavy) ponerCamion(CAM_NAVY, t, T.q5 - 0.6);
  const camAct = calleGris ? CAM_GRIS : CAM_NAVY, t0c = calleGris ? T.p4 : T.q5;
  PILA_V.visible = LAD_MANO.visible = PEON.raiz.visible = calleGris || calleNavy;
  if (PILA_V.visible) {
    PILA_V.position.set(CAM_POS.x - 3.0, 0, CAM_POS.z - 0.75);
    const n = cl(Math.floor((t - t0c - 0.9) / CICLO), 0, 30) + 6;
    PILA_V.children.forEach((b, i) => (b.visible = i < n));
    const f = ((t - t0c - 0.9) / CICLO) % 1, fase = f < 0 ? f + 1 : f;
    const a = V3(camAct.position.x - 1.5, 1.55, CAM_POS.z - 0.6), b = PILA_V.position.clone().add(V3(0, 0.3 + Math.floor(n / 6) * 0.058, 0.06));
    LAD_MANO.position.copy(a.lerp(b, eio(fase))); LAD_MANO.position.y += Math.sin(fase * Math.PI) * 0.35; LAD_MANO.rotation.set(fase * 2, 0.3, 0);
    LAD_MANO.visible = t >= t0c + 0.9;
  }
  // la hoja del tablero
  HOJA.visible = pa === "P6i";
  // ---- personajes ----
  tito.poner(poseTito(t));
  { const ps = poseMonica(t); const ab = ps.boca.abierta; if (ab > 0.02) ps.boca.sonrisa = lerp(ps.boca.sonrisa, 0.1, cl(ab * 4)); monica.poner(ps); }
  gustavo.poner(poseGustavo(t));
  if (PEON.raiz.visible) PEON.poner(posePeon(t));
  gustavo.raiz.visible = !(pa === "P6i" || pa === "Q3m" || pa === "Q5b" || pa === "P2d");   // P2d es su punto de vista
  if (pa === "Q5b") gustavo.raiz.visible = false;
  if (VER === "portada") { /* el fondo de la portada: los dos y la lista cayendo */ }
  // lo que llevan en la mano
  const conCarpeta = (!p2 && t < T.p2) || (p2 && t < T.q2);
  CARPETA.visible = conCarpeta; if (conCarpeta) { enManoDe(CARPETA, monica, "D", V3(0.0, 0.08, 0.0)); CARPETA.rotation.set(0, monica.raiz.rotation.y + Math.PI / 2, 0.1); }
  const conCasco = (!p2 && t >= T.p4 && t < P1) || (p2 && t >= T.q5 && t < T.q5b) || (p2 && t >= T.q3m && t < T.q3a);
  CASCO_M.visible = conCasco && !(p2 && t >= T.q3m && t < T.q3a);
  if (CASCO_M.visible) { enManoDe(CASCO_M, monica, "D", V3(0, -0.06, 0)); CASCO_M.rotation.set(0.4, monica.raiz.rotation.y, -1.2); }
  CELU_M.visible = p2 && t >= T.q3m && t < T.q3a;
  if (CELU_M.visible) { const a = manoMundo(monica, "I", new THREE.Vector3()), b = manoMundo(monica, "D", new THREE.Vector3()); CELU_M.position.copy(a.add(b).multiplyScalar(0.5)).add(V3(0, 0.05, 0)); CELU_M.rotation.set(-0.7, monica.raiz.rotation.y, 0); }
  // ---- insertos ----
  const INS = { Q1t: INS_T, Q4t: INS_T, P2c: INS_N, Q2c: INS_C, Q3c: INS_C, Q3a: INS_C }[pa];
  for (const I of [INS_T, INS_C, INS_N]) I.g.visible = I === INS;
  if (INS) {
    if (INS === INS_T) dibujarTabInserto(t, pa); else dibujarCelInserto(t, pa);
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.4), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.035, eo(k)));
  }
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- tarjetas ----
  for (const k in GL) GL[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const boca = (per) => bocaPx(per);
    // globo en dos tiempos: la "a" hasta CORTE, después la entera (crece sin achicarse)
    const dos = (k, ti, cx, cy, obj, orden = 1, kc = k) => { if (t < ti - 0.04) return; const tc = ti + CORTE[kc]; if (t < tc) ponerGlobo(GL[k + "a"], cx, cy, ent(ti - 0.04), obj, orden); else ponerGlobo(GL[k], cx, cy, 0.94 + 0.06 * bk(sg(t, tc, tc + 0.18)), obj, orden); };
    if (pa === "P1" || pa === "Q1") dos("m1", pa === "P1" ? T.m1 : T.m1b, 720, 560, boca(monica), 1);
    if (pa === "P1g" && t >= T.g2) ponerGlobo(GL.g2, 560, 420, ent(T.g2), boca(gustavo), 1);
    if (pa === "P2d" && t >= T.rot4h) ponerGlobo(GL.rot4h, 540, 1700, ent(T.rot4h), null, 1);
    if (pa === "P3" || pa === "Q4") { const t1 = pa === "P3" ? T.t3 : T.t3b; if (t >= t1 - 0.04 && t < t1 + LEN.t3 + 0.25) ponerGlobo(GL.t3, 380, 470, ent(t1 - 0.04), boca(tito), 1); }
    if (pa === "P3g" && t >= T.g4 - 0.04) ponerGlobo(GL.g4, 560, 420, ent(T.g4 - 0.04), boca(gustavo), 2);
    if (pa === "Q4b" && t >= T.g12 - 0.04) dos("g12", T.g12, 560, 420, boca(gustavo), 2);
    if (pa === "P4" || pa === "Q5") dos("m5", pa === "P4" ? T.m5 : T.m5b, 560, 520, boca(monica), 1);
    if (pa === "P4m") dos("m6", T.m6, 560, 430, boca(monica), 1);
    if (pa === "P4p") { const [ax, ay] = objPx(CAM_GRIS, V3(-0.75, 1.3, -1.0)); if (t >= T.rotP) { ponerGlobo(GL.rotP, 540, 330, ent(T.rotP), null, 1); ponerGuia(GUIAS[0], 540, 420, ax, ay, eo(sg(t, T.rotP, T.rotP + 0.25))); } if (t >= T.rotS) ponerGlobo(GL.rotS, 540, 1720, ent(T.rotS), null, 1); }
    if (pa === "P5" && t >= T.g7 - 0.04) ponerGlobo(GL.g7, 540, 420, ent(T.g7 - 0.04), boca(gustavo), 1);
    if (pa === "Q5g" && t >= T.g13 - 0.04) dos("g13", T.g13, 540, 420, boca(gustavo), 1);
    if (pa === "P6") dos("m8", T.m8, 560, 400, boca(monica), 1);
    if (pa === "P6i" && t < T.m8 + LEN.m8 + 0.1) ponerGlobo(GL.m8, 540, 1680, 1, null, 1);
    if (pa === "Q1g" && t >= T.g10 - 0.04) ponerGlobo(GL.g10, 560, 420, ent(T.g10 - 0.04), boca(gustavo), 1);
    if (pa === "Q1t") ponerGlobo(GL.rotQ1, 540, 1800, ent(T.q1t + 0.3), null, 1);
    if (pa === "Q2c" && t >= T.rotQ2) ponerGlobo(GL.rotQ2, 540, 1790, ent(T.rotQ2), null, 1);
    if (pa === "Q3c" && t >= T.rotQ3) ponerGlobo(GL.rotQ3, 540, 1770, ent(T.rotQ3), null, 1);
    if (pa === "Q3m" && t >= T.m11 - 0.04) ponerGlobo(GL.m11, 560, 520, ent(T.m11 - 0.04), boca(monica), 1);
    if (pa === "Q4t" && t >= T.rotQ4) ponerGlobo(GL.rotQ4, 540, 1790, ent(T.rotQ4), null, 1);
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, gustavo: bocaPx(gustavo), monica: bocaPx(monica), tito: bocaPx(tito) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
