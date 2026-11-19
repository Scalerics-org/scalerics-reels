// Capa 3D de ferreteria-encargo (Three.js r170 local). Base técnica: reels/corralon-portland (globos pegados a la cámara
// en píxeles de pantalla, avatares por render target, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom,
// insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// UN lugar: "Materiales Gustavo" (el galpón de chapa navy de corralon-portland), sábado 10:00, del lado FERRETERÍA del
// mostrador: la pared de cajoncitos de tornillos, el panel perforado con blísteres, la caja registradora, el rollo de
// papel de envolver con su cuchilla dentada y el cajón ENCARGOS. Aparte (x = 30): la cocina de Susana con la canilla que
// gotea.
//   PARTE 1: Susana trae el cartucho con sarro · Gustavo lo mide ("35"): "Ese no me queda. Te lo encargo." · arranca papel:
//            "Dejame tu número." · el papelito pegado en la caja registradora · Tito: "Seis tornillos del ocho." · el
//            papelito se va como cucurucho · martes: llega el cartucho, en la caja solo la cinta, al cajón ENCARGOS (9
//            piezas sin nombre) · "Gustavo, ¿llegó lo mío?" · "Elegí." · "Ya lo compré." · "¿Me encargás este?" ·
//            "Dejame tu número."
//   PARTE 2: el mismo pedido se carga en la tablet ("Anotamos tu encargo ✓") · el cucurucho de papel en blanco · la
//            entrada de mercadería se cruza con el encargo y le avisa a Susana en su cocina: "¡Llegó lo mío!" · el panel
//            Encargos (9 → 0) · miércoles: el cajón ordenado, "Ya lo tenés." · Gustavo: "Comentá ENCARGO…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearTablet } from "./personajes.js";
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
// EL GALPÓN (corralon-portland) · lado ferretería
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const ZF = -1.6, HW = 4.6;                          // la pared del fondo (chapa) y el alto del galpón
const PORTON = { x0: 1.9, x1: 4.5, alto: 3.0 };     // el portón al patio (a la derecha, casi siempre fuera de cuadro)
const MOS = { x0: -2.6, x1: 0.75, alto: 1.0, z0: -0.33, z1: 0.33 };   // el mostrador
const G0 = { x: -0.95, z: -0.66 };                   // Gustavo atrás del mostrador
const CAJ = { x0: -2.05, x1: -0.15, y0: 0.98, y1: 2.18, z: -1.3, cols: 8, filas: 6 };   // la pared de cajoncitos
function chapa(grupo, w, h, cx, cy, ondas = true) {
  const g = new THREE.Group(); g.position.set(cx, cy, 0); grupo.add(g);
  const b = mesh(new THREE.BoxGeometry(w, h, 0.06), M.chapa, 0, 0, 0); b.castShadow = false; g.add(b);
  if (ondas) for (let x = -w / 2 + 0.08; x < w / 2 - 0.04; x += 0.16) { const o = mesh(new THREE.BoxGeometry(0.055, h, 0.04), M.onda, x, 0, 0.045); o.castShadow = false; g.add(o); }
  return g;
}
const cartelT = lienzo(1400, 270, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "MATERIALES GUSTAVO", 800, 170, w - 90); x.fillText("MATERIALES GUSTAVO", w / 2, h / 2 - 4); x.fillStyle = "#5ce611"; x.fillRect(90, h - 36, w - 180, 16); });
const PRECIOS = [["PORTLAND 25 kg", "$ 520"], ["ARENA GRUESA m³", "$ 2.400"], ["TORNILLO 8 x 1\"", "$ 12"], ["CINTA TEFLÓN", "$ 45"]];
const pizarraT = lienzo(1520, 800, (x, w, h) => {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "rgba(239,238,229,0.07)"; for (const [cx, cy, r] of [[300, 200, 160], [1100, 520, 200], [700, 700, 150]]) { x.beginPath(); x.ellipse(cx, cy, r, r * 0.5, 0.3, 0, 7); x.fill(); }
  x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.textAlign = "center"; x.font = CAV(110); x.fillText("PRECIOS", w / 2, 92);
  x.strokeStyle = "#efeee5"; x.lineWidth = 6; x.beginPath(); x.moveTo(w / 2 - 210, 150); x.lineTo(w / 2 + 210, 152); x.stroke();
  PRECIOS.forEach(([a, b], i) => { const y = 250 + i * 150; x.textAlign = "left"; x.font = CAV(96); x.fillText(a, 60, y); x.textAlign = "right"; x.font = CAV(110); x.fillStyle = "#5ce611"; x.fillText(b, w - 60, y); x.fillStyle = "#efeee5"; });
});
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
  const tuboM = new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff4d8, emissiveIntensity: 1.2, roughness: 0.3 });
  for (const z of [0.1, 2.7]) {
    const g = new THREE.Group(); g.position.set(-0.8, 3.45, z); SET.add(g);
    g.add(caja(1.32, 0.06, 0.16, M.navy3, 0, 0.05, 0, 0.01));
    for (const dz of [-0.04, 0.04]) { const tu = mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.24, 12), tuboM, 0, -0.01, dz); tu.rotation.z = Math.PI / 2; tu.castShadow = false; g.add(tu); }
    for (const dx of [-0.55, 0.55]) g.add(mesh(new THREE.CylinderGeometry(0.004, 0.004, HW - 3.5, 4), M.navy, dx, (HW - 3.45) / 2 + 0.05, 0));
  }
  // el cartel de chapa "MATERIALES GUSTAVO" arriba de los cajoncitos y el pizarrón de precios a la izquierda
  SET.add(caja(2.06, 0.42, 0.04, M.navy, -1.1, 2.72, ZF + 0.08, 0.02)); SET.add(plano(1.96, 0.36, cartelT, -1.1, 2.72, ZF + 0.105));
  SET.add(caja(1.3, 0.72, 0.05, M.marco, -3.05, 1.95, ZF + 0.07, 0.02)); SET.add(plano(1.22, 0.64, pizarraT, -3.05, 1.95, ZF + 0.1));
  // el portón: marco navy3 y la hoja enrollada arriba
  for (const x of [PORTON.x0 - 0.08, PORTON.x1 + 0.08]) SET.add(caja(0.16, PORTON.alto + 0.1, 0.3, M.navy3, x, (PORTON.alto + 0.1) / 2, ZF + 0.04, 0.02));
  SET.add(caja(PORTON.x1 - PORTON.x0 + 0.32, 0.16, 0.3, M.navy3, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto + 0.04, ZF + 0.04, 0.02));
  { const rollo = mesh(new THREE.CylinderGeometry(0.22, 0.22, PORTON.x1 - PORTON.x0 + 0.2, 28), M.cr, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto - 0.16, ZF + 0.38); rollo.rotation.z = Math.PI / 2; SET.add(rollo); }
  { const f = mesh(new THREE.PlaneGeometry(PORTON.x1 - PORTON.x0, 0.12), new THREE.MeshBasicMaterial({ color: C.g }), (PORTON.x0 + PORTON.x1) / 2, 0.004, ZF + 0.12); f.rotation.x = -Math.PI / 2; f.castShadow = false; SET.add(f); }
  // la pared del frente (detrás de los clientes): chapa navy con la puerta y una góndola de pinturas
  { const fr = new THREE.Group(); fr.position.z = 4.2; fr.rotation.y = Math.PI; SET.add(fr); chapa(fr, 11.2, HW, -0.6, HW / 2); }
  { const gd = new THREE.Group(); gd.position.set(-1.4, 0, 3.75); SET.add(gd);
    gd.add(caja(2.4, 1.9, 0.5, M.navy3, 0, 0.95, 0, 0.02));
    for (const y of [0.35, 0.8, 1.25, 1.7]) { gd.add(caja(2.36, 0.03, 0.46, M.cr2, 0, y - 0.18, -0.02, 0.005)); for (let i = 0; i < 9; i++) { const lata = mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.2, 16), [M.cr, M.g, M.navy2, M.cr3][(i + Math.round(y * 10)) % 4], -1.05 + i * 0.26, y - 0.06, -0.12); gd.add(lata); } } }
  // el patio de día: arena, un pallet con bolsas y el muro
  const ar = mesh(new THREE.ConeGeometry(1.35, 1.05, 9), M.arena, 4.6, 0.52, -6.6); ar.rotation.y = 0.4; SET.add(ar);
  SET.add(caja(40, 1.25, 0.25, M.cr3, 2, 0.62, -11.5, 0.02));
}
// ---- el mostrador: mesada de madera, frente de chapa navy3 con el canto verde ----
{
  const g = new THREE.Group(); SET.add(g);
  const L = MOS.x1 - MOS.x0, cx = (MOS.x0 + MOS.x1) / 2, P = MOS.z1 - MOS.z0;
  g.add(caja(L + 0.08, 0.07, P + 0.08, M.mesada, cx, MOS.alto - 0.035, 0, 0.015));
  const fr = new THREE.Group(); fr.position.z = MOS.z1 - 0.01; g.add(fr); chapa(fr, L - 0.02, MOS.alto - 0.08, cx, (MOS.alto - 0.08) / 2);
  g.add(caja(L - 0.04, MOS.alto - 0.08, P - 0.08, M.navy3, cx, (MOS.alto - 0.08) / 2, -0.02, 0.02));
  g.add(caja(L + 0.02, 0.06, 0.05, M.g, cx, MOS.alto - 0.11, MOS.z1 + 0.075, 0.01));
}
// ---- la pared de cajoncitos de tornillos: mueble navy3 con 48 frentes crema, la manija navy y la medida en Lexend ----
const MEDIDAS = ["4", "5", "6", "7", "8", "10", "12", "14", "1/8", "3/16", "1/4", "5/16", "3/8", "1/2", "M4", "M5", "M6", "M8", "M10", "M12", "6x1", "6x1½", "8x1", "8x2", "10x1", "10x2", "12x2", "12x3", "T6", "T8", "T10", "T12", "A4", "A6", "A8", "A10", "G6", "G8", "G10", "G12", "R1", "R2", "R3", "R4", "C6", "C8", "C10", "C12"];
const CAJ_W = (CAJ.x1 - CAJ.x0) / CAJ.cols, CAJ_H = (CAJ.y1 - CAJ.y0) / CAJ.filas;
const OCHO = { col: 4, fila: 2 };   // el cajoncito "8" (fila desde arriba)
MEDIDAS[OCHO.fila * CAJ.cols + OCHO.col] = "8";
function frenteCajoncito(x, X, Y, w, h, txt) {
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(X + 6, Y + 6, w - 12, h - 12, 10); x.fill();
  x.strokeStyle = "#b4b2a3"; x.lineWidth = 4; x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 800, h * 0.42, w * 0.7); x.fillText(txt, X + w / 2, Y + h * 0.38);
}
const cajT = lienzo(CAJ.cols * 128, CAJ.filas * 96, (x, w, h) => {
  x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, h);
  for (let f = 0; f < CAJ.filas; f++) for (let c = 0; c < CAJ.cols; c++) { if (f === OCHO.fila && c === OCHO.col) continue; frenteCajoncito(x, c * 128, f * 96, 128, 96, MEDIDAS[f * CAJ.cols + c]); }
});
const CAJONERA = new THREE.Group(); scene.add(CAJONERA);
{
  const W = CAJ.x1 - CAJ.x0, H = CAJ.y1 - CAJ.y0;
  CAJONERA.add(caja(W + 0.08, H + 0.08, 0.32, M.navy3, (CAJ.x0 + CAJ.x1) / 2, (CAJ.y0 + CAJ.y1) / 2, CAJ.z - 0.16, 0.01));
  CAJONERA.add(caja(W + 0.08, CAJ.y0, 0.32, M.navy3, (CAJ.x0 + CAJ.x1) / 2, CAJ.y0 / 2, CAJ.z - 0.16, 0.01));
  CAJONERA.add(plano(W, H, cajT, (CAJ.x0 + CAJ.x1) / 2, (CAJ.y0 + CAJ.y1) / 2, CAJ.z + 0.003));
  for (let f = 0; f < CAJ.filas; f++) for (let c = 0; c < CAJ.cols; c++) { if (f === OCHO.fila && c === OCHO.col) continue; CAJONERA.add(caja(CAJ_W * 0.36, 0.022, 0.03, M.navy, CAJ.x0 + (c + 0.5) * CAJ_W, CAJ.y1 - (f + 0.78) * CAJ_H, CAJ.z + 0.016, 0.008)); }
  sombras(CAJONERA); fusionar(CAJONERA);
}
// el cajoncito "8": sale hacia afuera (P2, Q2) con los tornillos adentro
const CAJ8 = new THREE.Group(); scene.add(CAJ8);
const CAJ8_P = V3(CAJ.x0 + (OCHO.col + 0.5) * CAJ_W, CAJ.y1 - (OCHO.fila + 0.5) * CAJ_H, CAJ.z);
{
  const w = CAJ_W - 0.012, h = CAJ_H - 0.012, d = 0.28;
  const ft = lienzo(128, 96, (x, W, H) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, W, H); frenteCajoncito(x, 0, 0, W, H, "8"); });
  CAJ8.add(caja(w, h, 0.012, M.cr, 0, 0, -0.006, 0.004)); CAJ8.add(plano(w, h, ft, 0, 0, 0.001));
  CAJ8.add(caja(w * 0.36, 0.022, 0.03, M.navy, 0, -0.28 * h, 0.016, 0.008));
  CAJ8.add(caja(w - 0.01, 0.01, d, M.cr2, 0, -h / 2 + 0.01, -d / 2, 0.003));
  for (const s of [-1, 1]) CAJ8.add(caja(0.006, h * 0.6, d, M.cr2, s * (w / 2 - 0.006), -h * 0.2, -d / 2, 0.002));
  sombras(CAJ8);
}
// ---- el panel perforado crema con blísteres colgados (a la derecha, detrás) ----
{
  const g = new THREE.Group(); SET.add(g);
  const px0 = 0.05, px1 = 1.55, py0 = 0.95, py1 = 2.3, z = ZF + 0.09;
  const pt = lienzo(1200, 1080, (x, w, h) => { x.fillStyle = "#e6e3d6"; x.fillRect(0, 0, w, h); x.fillStyle = "#b9b5a4"; for (let yy = 30; yy < h; yy += 48) for (let xx = 30; xx < w; xx += 48) { x.beginPath(); x.arc(xx, yy, 6, 0, 7); x.fill(); } });
  g.add(caja(px1 - px0 + 0.04, py1 - py0 + 0.04, 0.03, M.navy3, (px0 + px1) / 2, (py0 + py1) / 2, z - 0.02, 0.01));
  g.add(plano(px1 - px0, py1 - py0, pt, (px0 + px1) / 2, (py0 + py1) / 2, z));
  const BL = ["LLAVE DE PASO", "FLEXIBLE", "BISAGRA", "CANDADO", "TEFLÓN", "ABRAZADERA", "TARUGOS", "CINTA", "SOPAPA", "PICO", "SILICONA", "MECHAS"];
  BL.forEach((n, i) => {
    const c = i % 4, f = Math.floor(i / 4), bx = px0 + 0.2 + c * 0.38, by = py1 - 0.3 - f * 0.42;
    const t = lienzo(256, 300, (x, w, h) => { x.fillStyle = i % 3 === 1 ? "#1f3254" : "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = i % 3 === 1 ? "#efeee5" : "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, n, 800, 34, w - 24); x.fillText(n, w / 2, 48); x.fillStyle = "#5ce611"; x.fillRect(20, h - 34, w - 40, 12); x.fillStyle = "#16243d"; x.beginPath(); x.arc(w / 2, 22, 9, 0, 7); });
    g.add(plano(0.2, 0.235, t, bx, by, z + 0.035));
    g.add(caja(0.12, 0.13, 0.035, new THREE.MeshStandardMaterial({ color: 0xf4f4f0, roughness: 0.2, transparent: true, opacity: 0.35 }), bx, by - 0.03, z + 0.055, 0.02));
    const forma = [M.gris, M.navy3, M.metal, M.cr3][i % 4]; g.add(caja(0.07, 0.08, 0.025, forma, bx, by - 0.03, z + 0.05, 0.012));
    const gancho = mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.12, 6), M.metal, bx, by + 0.14, z + 0.05); gancho.rotation.x = Math.PI / 2; g.add(gancho);
  });
  sombras(g);
}
fusionar(SET);

// =====================================================================================================
// LOS OBJETOS DEL MOSTRADOR
// =====================================================================================================
// ---- la caja registradora (cuerpo crema, teclado navy de botones redondos, cajón, visor navy con números crema).
// El costado -x mira al cliente (rotada): ahí se pega el papelito con cinta ----
const CR = { x: -0.36, z: 0.0, giro: -0.6 };
const REG = new THREE.Group(); REG.position.set(CR.x, MOS.alto, CR.z); REG.rotation.y = CR.giro; scene.add(REG);
{
  const cr = mat(0xe9e5d6, 0.55), n3 = M.navy3;
  REG.add(caja(0.4, 0.17, 0.36, cr, 0, 0.085, 0, 0.025));
  REG.add(caja(0.38, 0.02, 0.012, mat(0xd9d4c2, 0.6), 0, 0.012, -0.182, 0.004));   // el cajón del dinero (del lado de Gustavo)
  const tp = caja(0.36, 0.06, 0.2, cr, 0, 0.19, -0.04, 0.02); tp.rotation.x = 0.32; REG.add(tp);
  const tecl = new THREE.Group(); tecl.position.set(0, 0.225, -0.04); tecl.rotation.x = 0.32; REG.add(tecl);
  for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) { const b = cil(0.016, 0.016, 0.012, i === 4 && j === 0 ? M.g : n3, 14); b.position.set(-0.12 + i * 0.06, 0.0, -0.06 + j * 0.055); tecl.add(b); }
  // el visor (torre navy, números crema de los dos lados)
  REG.add(caja(0.05, 0.12, 0.05, n3, 0.1, 0.23, 0.12, 0.01));
  const vis = caja(0.2, 0.08, 0.05, M.navy, 0.1, 0.32, 0.12, 0.012); REG.add(vis);
  const vt = lienzo(256, 96, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "right"; x.textBaseline = "middle"; x.font = F(800, 62); x.fillText("0.00", w - 20, h / 2 + 3); });
  for (const s of [-1, 1]) { const p = plano(0.17, 0.06, vt, 0.1, 0.32, 0.12 + s * 0.026, true); if (s < 0) p.rotation.y = Math.PI; REG.add(p); }
  sombras(REG);
}
// el frente de la caja del lado de Gustavo (abajo del teclado): ahí va el papelito
const PAPEL_EN_CAJA = () => { REG.updateMatrixWorld(true); return { p: REG.localToWorld(V3(-0.03, 0.09, -0.19)), q: REG.getWorldQuaternion(new THREE.Quaternion()).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0))) }; };

// ---- el rollo de papel de envolver en su soporte de hierro con la cuchilla dentada (punta izquierda) ----
const ROL = { x: -1.52, z: 0.02 };
const ROLLO = new THREE.Group(); ROLLO.position.set(ROL.x, MOS.alto, ROL.z); ROLLO.rotation.y = 0.15; scene.add(ROLLO);
{
  const hi = M.navy3;
  ROLLO.add(caja(0.56, 0.02, 0.3, hi, 0, 0.01, 0, 0.006));
  for (const s of [-1, 1]) { ROLLO.add(caja(0.02, 0.22, 0.2, hi, s * 0.26, 0.12, 0.0, 0.006)); }
  const r = cil(0.085, 0.085, 0.48, M.kraft, 32); r.rotation.z = Math.PI / 2; r.position.set(0, 0.14, 0.0); ROLLO.add(r);
  const eje = cil(0.014, 0.014, 0.56, M.metal, 10); eje.rotation.z = Math.PI / 2; eje.position.set(0, 0.14, 0); ROLLO.add(eje);
  for (const s of [-1, 1]) { const ta = cil(0.03, 0.03, 0.02, M.metal, 12); ta.rotation.z = Math.PI / 2; ta.position.set(s * 0.255, 0.14, 0); ROLLO.add(ta); }
  // el papel que baja del rollo por adelante (lado de Gustavo, -z) hasta la cuchilla
  const bajada = caja(0.47, 0.13, 0.004, M.kraft, 0, 0.085, -0.088, 0.001); ROLLO.add(bajada);
  // la cuchilla dentada: barra de hierro con dientes marcados (lado de Gustavo)
  ROLLO.add(caja(0.52, 0.03, 0.025, hi, 0, 0.03, -0.11, 0.004));
  for (let i = 0; i < 26; i++) { const d = mesh(new THREE.ConeGeometry(0.008, 0.018, 4), M.metal, -0.24 + i * 0.0192, 0.052, -0.11); ROLLO.add(d); }
  sombras(ROLLO);
}
const BORDE_ROLLO = () => { ROLLO.updateMatrixWorld(true); return ROLLO.localToWorld(V3(0, 0.05, -0.12)); };

// ---- el papelito: papel kraft con el borde de arriba dentado, escrito con lápiz de carpintero (Caveat navy) ----
// Una sola malla que pasa de plano (u = 0) a cucurucho (u = 1): cada vértice se interpola entre la hoja y el cono.
const PAP = { W: 0.19, H: 0.133 };
function dibujarPapel(x, w, h, n, lineas) {
  x.clearRect(0, 0, w, h);
  x.fillStyle = "#e8dcc0"; x.beginPath(); x.moveTo(0, h); x.lineTo(0, 22);
  for (let i = 0; i <= 24; i++) x.lineTo((i / 24) * w, i % 2 ? 4 : 22);   // los dientes de la cuchilla
  x.lineTo(w, h); x.closePath(); x.fill();
  x.strokeStyle = "rgba(160,130,80,0.35)"; x.lineWidth = 3; x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle";
  let resto = n;
  lineas.forEach(([txt, px, y]) => { x.font = CAV(px); const s = txt.slice(0, Math.max(0, resto)); resto -= txt.length; if (s) x.fillText(s, 34, y); });
}
const LIN_PAP = [["SUSANA", 128, 108], ["CARTUCHO 35", 104, 224], ["099 4", 104, 330]];
const N_PAP = LIN_PAP.reduce((a, l) => a + l[0].length, 0);
const papT = lienzo(640, 448, (x, w, h) => dibujarPapel(x, w, h, N_PAP, LIN_PAP));
const papBlancoT = lienzo(640, 448, (x, w, h) => dibujarPapel(x, w, h, 0, LIN_PAP));
let clavePap = -1;
function escribirPapel(n) { n = Math.round(n); if (n === clavePap) return; clavePap = n; dibujarPapel(papT.userData.x, 640, 448, n, LIN_PAP); papT.needsUpdate = true; }
function crearPapelito(tex) {
  const geo = new THREE.PlaneGeometry(PAP.W, PAP.H, 24, 8);
  const base = geo.attributes.position.array.slice();
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }));
  m.castShadow = true; m.receiveShadow = true;
  let u0 = -1;
  m.userData.enrollar = (u) => {
    u = Math.round(cl(u) * 40) / 40; if (u === u0) return; u0 = u;
    const p = geo.attributes.position;
    const R = 0.052;
    for (let i = 0; i < p.count; i++) {
      const x0 = base[i * 3], y0 = base[i * 3 + 1];
      const yy = y0 + PAP.H / 2;                         // 0 abajo (la punta) .. H arriba (la boca)
      const th = (x0 / PAP.W) * Math.PI * 2 * 1.12;
      const r = R * (0.08 + 0.92 * (yy / PAP.H));
      const cx = r * Math.sin(th), cz = r * Math.cos(th) - R * 0.6, cy = yy * 1.15 - PAP.H / 2;
      p.setXYZ(i, lerp(x0, cx, eio(u)), lerp(y0, cy, eio(u)), lerp(0, cz, eio(u)));
    }
    p.needsUpdate = true; geo.computeVertexNormals();
  };
  m.userData.enrollar(0);
  return m;
}
const PAPEL = crearPapelito(papT); scene.add(PAPEL);
// dónde está la punta del lápiz (local del papelito) con n letras escritas
const _medP = document.createElement("canvas").getContext("2d");
function puntaLocal(n) {
  let resto = n, cx = 34, cy = LIN_PAP[0][2];
  for (const [txt, px, y] of LIN_PAP) { const k = Math.min(txt.length, Math.max(0, resto)); _medP.font = CAV(px); cx = 34 + _medP.measureText(txt.slice(0, k)).width; cy = y; if (resto <= txt.length) break; resto -= txt.length; }
  return V3((cx / 640 - 0.5) * PAP.W, (0.5 - cy / 448) * PAP.H, 0.0);
}
const PAPEL2 = crearPapelito(papBlancoT); scene.add(PAPEL2);    // parte 2: el cucurucho de papel en blanco
const PAPEL3 = crearPapelito(papBlancoT); scene.add(PAPEL3);    // P5 / Q5: el pedazo que arranca de reflejo
// la cinta: franja crema translúcida plana arriba del papelito (queda sola en la caja cuando el papel se va)
const CINTA = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.034), new THREE.MeshStandardMaterial({ color: 0xd9be7a, roughness: 0.3, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false })); scene.add(CINTA);
const RESTO = (() => { const sh = new THREE.Shape(); sh.moveTo(-0.045, 0.012); sh.lineTo(0.03, 0.012); sh.lineTo(0.008, -0.006); sh.lineTo(-0.01, 0.0); sh.lineTo(-0.03, -0.01); sh.closePath(); const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshStandardMaterial({ color: 0xe8dcc0, roughness: 0.85, side: THREE.DoubleSide })); scene.add(m); return m; })();

// ---- el lápiz de carpintero (en la oreja de Gustavo, y en la mano cuando escribe) ----
function crearLapizCarp() {
  const g = new THREE.Group();
  const cu = mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.17, 8), mat(0xe9d8a6, 0.6), 0, 0, 0); cu.scale.x = 0.7; g.add(cu);
  const pu = mesh(new THREE.ConeGeometry(0.0125, 0.035, 8), mat(0xd9c7a0, 0.7), 0, 0.102, 0); pu.scale.x = 0.7; g.add(pu);
  g.add(mesh(new THREE.ConeGeometry(0.005, 0.014, 6), M.navy, 0, 0.116, 0));
  return sombras(g);
}
const LAPIZ = crearLapizCarp(); scene.add(LAPIZ);

// ---- los tornillos del 8 (cabeza + rosca con anillos), gris plano ----
function crearTornillo() {
  const g = new THREE.Group(), m = M.gris;
  const cab = cil(0.009, 0.009, 0.004, m, 12); cab.position.y = 0.032; g.add(cab);
  const ra = caja(0.012, 0.0015, 0.002, M.navy, 0, 0.0345, 0, 0.0005); g.add(ra);
  const cue = cil(0.004, 0.0015, 0.034, m, 8); cue.position.y = 0.014; g.add(cue);
  for (let i = 0; i < 5; i++) { const a = mesh(new THREE.TorusGeometry(0.0042 - i * 0.0004, 0.0011, 4, 10), m, 0, 0.026 - i * 0.0055, 0); a.rotation.x = Math.PI / 2; g.add(a); }
  g.scale.setScalar(1.5);
  return sombras(g);
}
const TORN = new THREE.Group(); scene.add(TORN);
semilla = 61; for (let i = 0; i < 6; i++) { const t = crearTornillo(); t.position.set((az() - 0.5) * 0.04, (az() - 0.5) * 0.02, (az() - 0.5) * 0.03); t.rotation.set(az() * 3, az() * 3, az() * 3); TORN.add(t); }

// ---- el calibre (pie de rey gris plano, la regla con marcas navy; en el inserto se lee "35") ----
const calT = lienzo(1024, 96, (x, w, h) => {
  x.fillStyle = "#c9ccd1"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#0b1220"; for (let i = 0; i <= 100; i++) { const xx = 30 + i * 9.6, lg = i % 10 === 0 ? 46 : i % 5 === 0 ? 32 : 20; x.fillRect(xx, 0, 3, lg); }
  x.font = F(800, 40); x.textBaseline = "middle"; x.textAlign = "center"; for (let i = 0; i <= 10; i++) x.fillText(String(i * 10), 30 + i * 96, 72);
});
const CALIBRE = new THREE.Group(); scene.add(CALIBRE);
const CAL_JAW = new THREE.Group(); CALIBRE.add(CAL_JAW);
{
  const m = mat(0xc4c7cc, 0.4, { metalness: 0.3 });
  CALIBRE.add(caja(0.22, 0.02, 0.004, m, 0.08, 0, 0, 0.002));
  CALIBRE.add(plano(0.2, 0.019, calT, 0.09, 0, 0.0025));
  CALIBRE.add(caja(0.012, 0.11, 0.005, m, -0.03, -0.06, 0, 0.002));   // la boca fija
  CAL_JAW.add(caja(0.034, 0.03, 0.009, m, 0, 0.0, 0.0, 0.003));
  CAL_JAW.add(caja(0.012, 0.11, 0.005, m, -0.011, -0.06, 0, 0.002));   // la boca móvil
  const lt = lienzo(128, 96, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 78); x.fillText("35", w / 2, h / 2 + 4); });
  CAL_JAW.add(plano(0.03, 0.022, lt, 0.002, 0, 0.0047, true));
  sombras(CALIBRE);
}
function ponerCalibre(abre) { CAL_JAW.position.set(-0.03 + 0.012 + abre, 0, 0); }

// ---- el cartucho cerámico de 35 mm (con sarro: el viejo; limpio: el del blíster) ----
const CART_S = 1.7;   // un poco más grande que el real: tiene que leerse en el plano medio
function crearCartucho(sarro) {
  const g = new THREE.Group();
  const blanco = mat(0xe9e6dc, 0.6), base = M.navy3, goma = mat(0x16243d, 0.85), br = mat(sarro ? 0x9c8858 : 0xb08a4a, 0.45, { metalness: 0.35 });
  const b0 = cil(0.0175, 0.0175, 0.012, base, 24); b0.position.y = 0.006; g.add(b0);
  for (const s of [-1, 1]) { g.add(caja(0.006, 0.008, 0.01, base, s * 0.009, -0.003, 0, 0.002)); }
  const cu = cil(0.0175, 0.0175, 0.045, blanco, 28); cu.position.y = 0.0345; g.add(cu);
  for (const y of [0.02, 0.05]) { const a = mesh(new THREE.TorusGeometry(0.0178, 0.0022, 6, 28), goma, 0, y, 0); a.rotation.x = Math.PI / 2; g.add(a); }
  const co = cil(0.012, 0.014, 0.01, br, 20); co.position.y = 0.062; g.add(co);
  const va = cil(0.0062, 0.0062, 0.02, br, 12); va.position.y = 0.077; g.add(va);
  for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; const e = caja(0.0018, 0.017, 0.0018, br, Math.sin(a) * 0.0063, 0.078, Math.cos(a) * 0.0063, 0.0004); e.rotation.y = a; g.add(e); }
  if (sarro) {
    const sm = mat(0xf7f5ef, 1.0), vm = mat(0x7d9a6a, 0.95);
    semilla = 9;
    for (let i = 0; i < 16; i++) { const a = az() * Math.PI * 2, y = 0.004 + az() * 0.058; const r = y > 0.057 ? 0.014 : 0.0182; const d = mesh(new THREE.SphereGeometry(1, 10, 6), sm, Math.sin(a) * r, y, Math.cos(a) * r); d.scale.set(0.006 + az() * 0.006, 0.004 + az() * 0.005, 0.0018); d.lookAt(d.position.clone().multiplyScalar(3).setY(y)); g.add(d); }
    for (let i = 0; i < 6; i++) { const a = az() * Math.PI * 2, y = 0.07 + az() * 0.012; const d = mesh(new THREE.SphereGeometry(1, 8, 6), vm, Math.sin(a) * 0.0068, y, Math.cos(a) * 0.0068); d.scale.set(0.003, 0.003, 0.0015); d.lookAt(d.position.clone().multiplyScalar(3).setY(y)); g.add(d); }
  }
  g.scale.setScalar(CART_S);
  return sombras(g);
}
// la bolsita de nylon: transparente plana con el nudo arriba; `pieza` adentro
const NYLON = new THREE.MeshStandardMaterial({ color: 0xf6f6f2, roughness: 0.25, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide });
function crearBolsita(pieza, { w = 0.1, h = 0.16, d = 0.05, etiqueta = null } = {}) {
  const g = new THREE.Group();
  const b = new THREE.Mesh(rbox(w, h, d, 0.02, 3), NYLON); b.position.y = h / 2; b.renderOrder = 2; g.add(b);
  const nudo = new THREE.Mesh(new THREE.SphereGeometry(0.012, 10, 8), NYLON); nudo.position.y = h + 0.008; g.add(nudo);
  for (const s of [-1, 1]) { const o = new THREE.Mesh(new THREE.ConeGeometry(0.01, 0.035, 8), NYLON); o.position.set(s * 0.012, h + 0.026, 0); o.rotation.z = -s * 0.5; g.add(o); }
  if (pieza) { pieza.position.y = 0.012; g.add(pieza); }
  if (etiqueta) {
    const t = lienzo(512, 160, (x, W, H) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.strokeRect(5, 5, W - 10, H - 10); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, etiqueta[0], 900, 64, W - 40); x.fillText(etiqueta[0], W / 2, 52); ajustar(x, etiqueta[1], 800, 48, W - 40); x.fillText(etiqueta[1], W / 2, 116); });
    const e = plano(w * 0.94, w * 0.94 * 160 / 512, t, 0, h * 0.78, d / 2 + 0.003, true); g.add(e); g.userData.etiqueta = e;
  }
  return g;
}
// el flotador de la cisterna: bocha de plástico crema con el brazo de alambre gris
function crearFlotador(k = 1) {
  const g = new THREE.Group();
  const b = mesh(new THREE.SphereGeometry(0.04, 20, 14), M.pvc, 0, 0.04, 0); b.scale.set(1, 0.9, 1); g.add(b);
  g.add(mesh(new THREE.TorusGeometry(0.04, 0.003, 6, 24), M.cr3, 0, 0.04, 0)).rotation.x = Math.PI / 2;
  const a = cil(0.003, 0.003, 0.13, M.metal, 8); a.rotation.z = Math.PI / 2 - 0.25; a.position.set(0.085, 0.058, 0); g.add(a);
  const p = caja(0.016, 0.03, 0.014, M.cr3, 0.15, 0.075, 0, 0.004); g.add(p);
  g.scale.setScalar(k);
  return sombras(g);
}
// el blíster (cartón crema con "CARTUCHO 35 mm" y la burbuja de plástico) con el cartucho nuevo
const blisT = lienzo(320, 480, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 120); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "CARTUCHO", 900, 58, w - 30); x.fillText("CARTUCHO", w / 2, 50); x.font = F(800, 40); x.fillText("35 mm", w / 2, 96); x.fillStyle = "#16243d"; x.beginPath(); x.arc(w / 2, 22, 0, 0, 7); x.fill(); x.fillStyle = "#5ce611"; x.fillRect(30, h - 40, w - 60, 14); });
function crearBlister() {
  const g = new THREE.Group();
  g.add(caja(0.1, 0.15, 0.004, M.cr, 0, 0.075, 0, 0.003));
  g.add(plano(0.098, 0.147, blisT, 0, 0.075, 0.0025));
  const c = crearCartucho(false); c.scale.setScalar(0.95); c.rotation.z = 0; c.position.set(0, 0.012, 0.02); g.add(c);
  const bur = new THREE.Mesh(rbox(0.07, 0.1, 0.04, 0.015, 3), new THREE.MeshStandardMaterial({ color: 0xf6f6f2, roughness: 0.2, transparent: true, opacity: 0.25, depthWrite: false })); bur.position.set(0, 0.07, 0.022); g.add(bur);
  return sombras(g);
}
const BOLSA_S = crearBolsita(crearCartucho(true)); BOLSA_S.scale.setScalar(1.25); scene.add(BOLSA_S);            // la bolsita de Susana con el cartucho viejo
const BOLSA_F = crearBolsita(crearFlotador(1.0), { w: 0.14, h: 0.17, d: 0.09 }); scene.add(BOLSA_F);   // la del flotador
const BLISTER = crearBlister(); scene.add(BLISTER);                               // el cartucho nuevo (P3, Q3)
const CART_M = crearCartucho(true); scene.add(CART_M);                            // el viejo, en la mano de Gustavo (medido)

// ---- las otras piezas del cajón ENCARGOS (genéricas, sin marca) ----
function crearLlavePaso() { const g = new THREE.Group(); const c = cil(0.018, 0.018, 0.1, M.metal, 16); c.rotation.z = Math.PI / 2; g.add(c); g.add(mesh(new THREE.SphereGeometry(0.03, 16, 12), M.metal, 0, 0, 0)); const v = cil(0.006, 0.006, 0.04, M.metal, 8); v.position.y = 0.04; g.add(v); const m = caja(0.11, 0.012, 0.022, M.navy3, 0.03, 0.062, 0, 0.005); g.add(m); for (const s of [-1, 1]) { const h = cil(0.02, 0.02, 0.012, M.metal, 6); h.rotation.z = Math.PI / 2; h.position.x = s * 0.055; g.add(h); } return sombras(g); }
function crearBisagras() { const g = new THREE.Group(); for (let i = 0; i < 4; i++) { const b = new THREE.Group(); b.position.set(0, i * 0.012, 0); const cz = cil(0.018, 0.016, 0.012, M.metal, 16); cz.position.set(-0.03, 0, 0); b.add(cz); b.add(caja(0.08, 0.004, 0.026, M.metal, 0.02, 0.004, 0, 0.002)); g.add(b); } g.add(caja(0.012, 0.06, 0.04, M.cr, 0.0, 0.02, 0, 0.003)); return sombras(g); }
function crearSifon() { const g = new THREE.Group(); const t1 = cil(0.016, 0.016, 0.08, M.pvc, 14); t1.position.set(-0.04, 0.06, 0); g.add(t1); const cu = mesh(new THREE.TorusGeometry(0.04, 0.016, 10, 20, Math.PI), M.pvc, 0, 0.02, 0); cu.rotation.z = Math.PI; g.add(cu); const t2 = cil(0.016, 0.016, 0.05, M.pvc, 14); t2.position.set(0.04, 0.045, 0); g.add(t2); const sal = cil(0.016, 0.016, 0.07, M.pvc, 14); sal.rotation.z = Math.PI / 2; sal.position.set(0.075, 0.07, 0); g.add(sal); for (const [x, y] of [[-0.04, 0.1], [0.04, 0.07]]) { const r = cil(0.021, 0.021, 0.014, M.cr3, 14); r.position.set(x, y, 0); g.add(r); } return sombras(g); }
function crearValvula() { const g = new THREE.Group(); const c = cil(0.022, 0.022, 0.11, M.pvc, 18); c.position.y = 0.055; g.add(c); const f = cil(0.04, 0.04, 0.012, M.cr3, 20); f.position.y = 0.012; g.add(f); const t = cil(0.03, 0.022, 0.025, M.navy3, 18); t.position.y = 0.12; g.add(t); return sombras(g); }
function crearCanilla() { const g = new THREE.Group(); const c = cil(0.012, 0.012, 0.05, M.metal, 12); c.rotation.z = Math.PI / 2; g.add(c); const cu = cil(0.02, 0.02, 0.05, M.metal, 14); cu.position.set(0.02, 0.02, 0); g.add(cu); const pico = cil(0.009, 0.007, 0.05, M.metal, 10); pico.rotation.z = -0.7; pico.position.set(0.05, -0.0, 0); g.add(pico); const ma = caja(0.05, 0.01, 0.014, M.navy3, 0.02, 0.05, 0, 0.004); g.add(ma); return sombras(g); }
function crearCerradura() { const g = new THREE.Group(); g.add(caja(0.09, 0.022, 0.12, M.gris, 0, 0.011, 0, 0.004)); const ci = cil(0.012, 0.012, 0.01, M.bronce, 14); ci.position.set(0.015, 0.026, 0.02); g.add(ci); g.add(caja(0.012, 0.024, 0.13, M.metal, -0.05, 0.012, 0, 0.003)); const ll = caja(0.012, 0.004, 0.05, M.bronce, 0.015, 0.03, 0.06, 0.002); g.add(ll); return sombras(g); }
function crearBrazoDucha() { const g = new THREE.Group(); const t = cil(0.008, 0.008, 0.26, M.metal, 10); t.rotation.z = Math.PI / 2; g.add(t); const c = mesh(new THREE.TorusGeometry(0.025, 0.008, 6, 12, Math.PI / 2), M.metal, 0.13, -0.025, 0); g.add(c); const r = cil(0.03, 0.03, 0.01, M.metal, 16); r.rotation.z = Math.PI / 2; r.position.set(-0.13, 0, 0); g.add(r); return sombras(g); }
// ---- el cajón ENCARGOS: cajón de madera con "ENCARGOS" a mano en una cinta de papel ----
const CJ = { W: 0.66, H: 0.15, D: 0.42 };
const CAJON = new THREE.Group(); scene.add(CAJON);
const encT = lienzo(512, 96, (x, w, h) => { x.fillStyle = "#e8dcc0"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = CAV(96); x.fillText("ENCARGOS", w / 2, h / 2 + 4); });
{
  const m = M.madera, e = 0.018;
  CAJON.add(caja(CJ.W, e, CJ.D, m, 0, e / 2, 0, 0.004));
  for (const s of [-1, 1]) { CAJON.add(caja(e, CJ.H, CJ.D, m, s * (CJ.W / 2 - e / 2), CJ.H / 2, 0, 0.004)); CAJON.add(caja(CJ.W, CJ.H, e, m, 0, CJ.H / 2, s * (CJ.D / 2 - e / 2), 0.004)); }
  // la cinta de papel con "ENCARGOS" en el frente (+z: hacia el cliente cuando Gustavo lo apoya)
  CAJON.add(plano(0.4, 0.075, encT, 0, CJ.H * 0.55, CJ.D / 2 + 0.002));
  sombras(CAJON);
}
// las 9 piezas sin nombre (revueltas) y, en la parte 2, cada una en su bolsita con etiqueta
const REV = new THREE.Group(); CAJON.add(REV);
const ORD = new THREE.Group(); CAJON.add(ORD);
const PIEZAS = [crearFlotador(1.0), crearLlavePaso(), crearBisagras(), crearSifon(), crearValvula(), crearCanilla(), crearCerradura(), crearBrazoDucha()];
const REV_POS = [[-0.2, 0.12, 0.6], [0.04, -0.13, 0.2], [0.2, 0.11, -0.4], [-0.21, -0.1, 0.9], [0.22, -0.1, 1.2], [0.03, 0.1, -0.8], [-0.04, 0.0, 0.3], [0.08, 0.16, 0.05]];
PIEZAS.forEach((p, i) => { const [x, z, ry] = REV_POS[i]; p.position.set(x, 0.022, z); p.rotation.y = ry; if (i === 3 || i === 4) { p.rotation.z = Math.PI / 2; p.position.y = 0.04; } REV.add(p); });
PIEZAS[7].position.set(0.02, 0.03, 0.155); PIEZAS[7].rotation.set(0, 0.1, 0);
const BLIS_CAJON = V3(-0.05, 0.03, -0.06);   // dónde cae el blíster (la pieza 9)
const ETQ = [["SUSANA", "CARTUCHO 35"], ["RAMÍREZ", "LLAVE 3/4"], ["PEREIRA", "BISAGRAS x4"], ["SOSA", "SIFÓN"], ["MÉNDEZ", "VÁLVULA"], ["LUIS", "CANILLA"], ["ANA", "CERRADURA"], ["ROSSI", "BRAZO DUCHA"], ["BETO", "FLOTADOR"]];
const BOLSAS_ORD = [];
ETQ.forEach((e, i) => {
  const pieza = i === 0 ? crearCartucho(false) : null;
  const b = crearBolsita(pieza, { w: 0.15, h: 0.11, d: 0.03, etiqueta: e });
  b.rotation.x = -Math.PI / 2 + 0.25; const c = i % 3, f = Math.floor(i / 3);
  b.position.set(-0.2 + c * 0.2, 0.03 + f * 0.012, 0.13 - f * 0.12); ORD.add(b); BOLSAS_ORD.push(b);
});
const BOLSA_SUSANA = crearBolsita(crearCartucho(false), { w: 0.15, h: 0.13, d: 0.03, etiqueta: ETQ[0] }); scene.add(BOLSA_SUSANA);   // la que Gustavo le da en Q5
// ---- la caja del proveedor (cartón con cinta y el remito pegado) ----
const remT = lienzo(256, 320, (x, w, h) => { x.fillStyle = "#f8f7f2"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.font = F(900, 40); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("REMITO", 20, 40); x.fillStyle = "#8a93a3"; for (let i = 0; i < 6; i++) x.fillRect(20, 90 + i * 36, 120 + (i * 37) % 90, 12); });
const PROV = new THREE.Group(); scene.add(PROV);
{
  const W = 0.42, H = 0.26, D = 0.32;
  PROV.add(caja(W, H, D, M.carton, 0, H / 2, 0, 0.006));
  PROV.add(caja(W + 0.002, 0.004, 0.06, M.cinta, 0, H + 0.001, 0, 0.001));
  for (const s of [-1, 1]) { const s2 = caja(W - 0.01, 0.006, D / 2, M.carton, 0, H + 0.04, s * (D / 2 + 0.05), 0.002); s2.rotation.x = s * 0.9; PROV.add(s2); }
  PROV.add(plano(0.12, 0.15, remT, 0.05, H * 0.5, D / 2 + 0.002));
  sombras(PROV);
}
// ---- la tablet en el atril (parte 2) ----
const TW = 1200, TH = 840;
const tabT = lienzo(TW, TH, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); });
const TABLET = crearTablet(tabT, 0.34, 0.238, 0.38); TABLET.position.set(0.32, MOS.alto, 0.02); TABLET.rotation.y = -0.35; scene.add(TABLET);

// =====================================================================================================
// LA COCINA DE SUSANA (x = 30): azulejos navy claro con junta crema, mesada crema, pileta de acero, la canilla monocomando
// que gotea, la ventana con luz crema plana
// =====================================================================================================
const KX = 30;
const COC = new THREE.Group(); COC.position.set(KX, 0, 0); scene.add(COC);
const GOTA = new THREE.Mesh(new THREE.SphereGeometry(0.009, 12, 10), new THREE.MeshStandardMaterial({ color: 0xdfeef4, emissive: 0xbfe0ee, emissiveIntensity: 0.6, roughness: 0.1 })); GOTA.scale.set(1, 1.4, 1); scene.add(GOTA);
const CANILLA_PICO = V3(0, 0, 0);
{
  const azT = lienzo(1024, 1024, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; for (let yy = 0; yy < h; yy += 128) for (let xx = 0; xx < w; xx += 128) x.fillRect(xx + 5, yy + 5, 118, 118); });
  azT.wrapS = azT.wrapT = THREE.RepeatWrapping; azT.repeat.set(3, 2);
  const pared = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3.0), new THREE.MeshStandardMaterial({ map: azT, roughness: 0.6 })); pared.position.set(0, 1.5, -0.62); pared.receiveShadow = true; COC.add(pared);
  const pared2 = new THREE.Mesh(new THREE.PlaneGeometry(4, 3.0), new THREE.MeshStandardMaterial({ map: azT, roughness: 0.6 })); pared2.position.set(-1.4, 1.5, 1.2); pared2.rotation.y = Math.PI / 2; COC.add(pared2);
  const piso = mesh(new THREE.PlaneGeometry(6, 6), mat(0xcfc9b6, 0.9), 0, 0, 1.5); piso.rotation.x = -Math.PI / 2; COC.add(piso);
  // la mesada crema con el bajo mesada navy3
  COC.add(caja(2.4, 0.84, 0.58, M.navy3, 0.2, 0.42, -0.31, 0.02));
  COC.add(caja(2.46, 0.05, 0.62, mat(0xe7e3d4, 0.5), 0.2, 0.865, -0.3, 0.01));
  for (const x of [-0.6, 0.2, 1.0]) COC.add(caja(0.06, 0.02, 0.02, M.cr, x, 0.75, 0.0, 0.006));
  // la pileta: hueco de acero gris plano
  COC.add(caja(0.56, 0.012, 0.4, mat(0xb9bdc4, 0.35, { metalness: 0.3 }), 0.0, 0.894, -0.3, 0.004));
  COC.add(caja(0.5, 0.008, 0.34, mat(0x8f949c, 0.4, { metalness: 0.3 }), 0.0, 0.902, -0.3, 0.003));
  COC.add(mesh(new THREE.CircleGeometry(0.03, 16).rotateX(-Math.PI / 2), M.goma, 0.0, 0.907, -0.3));
  // la canilla monocomando: base, cuerpo, pico curvo y la palanca arriba
  const cm = mat(0xc9ccd1, 0.3, { metalness: 0.45 });
  const base = cil(0.035, 0.04, 0.03, cm, 20); base.position.set(0, 0.905, -0.53); COC.add(base);
  const cue = cil(0.026, 0.03, 0.2, cm, 20); cue.position.set(0, 1.02, -0.53); COC.add(cue);
  const curva = new THREE.CatmullRomCurve3([V3(0, 1.08, -0.53), V3(0, 1.17, -0.5), V3(0, 1.17, -0.4), V3(0, 1.11, -0.33)]);
  COC.add(mesh(new THREE.TubeGeometry(curva, 20, 0.015, 12), cm));
  const pal = caja(0.022, 0.018, 0.13, cm, 0, 1.135, -0.58, 0.006); pal.rotation.x = 0.35; COC.add(pal);
  CANILLA_PICO.set(KX, 1.095, -0.33);
  { const pf = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3.0), new THREE.MeshStandardMaterial({ map: azT, roughness: 0.6 })); pf.position.set(0, 1.5, 2.4); pf.rotation.y = Math.PI; COC.add(pf);
    COC.add(caja(0.9, 2.0, 0.06, M.madera, -0.3, 1.0, 2.36, 0.01)); COC.add(caja(1.2, 0.9, 0.5, M.navy3, 0.9, 0.45, 2.1, 0.02)); }
  // la ventana con luz crema plana y el marco navy
  COC.add(mesh(new THREE.PlaneGeometry(0.9, 0.8), new THREE.MeshBasicMaterial({ color: 0xf5f1e2 }), 1.05, 1.55, -0.61));
  for (const [w, h, x, y] of [[0.98, 0.05, 1.05, 1.95], [0.98, 0.05, 1.05, 1.15], [0.05, 0.85, 0.58, 1.55], [0.05, 0.85, 1.52, 1.55], [0.03, 0.8, 1.05, 1.55]]) COC.add(caja(w, h, 0.04, M.navy, x, y, -0.6, 0.006));
  // sobre la mesada: el escurridor, un frasco, la pava
  COC.add(caja(0.34, 0.06, 0.24, M.cr3, -0.62, 0.92, -0.32, 0.01));
  for (let i = 0; i < 4; i++) { const p = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.012, 24), M.blanco, -0.62 + (i - 1.5) * 0.06, 1.0, -0.32); p.rotation.z = Math.PI / 2; COC.add(p); }
  const pava = cil(0.07, 0.085, 0.14, M.g, 20); pava.position.set(0.72, 0.96, -0.4); COC.add(pava);
  COC.add(caja(0.02, 0.06, 0.1, M.navy, 0.72, 1.06, -0.4, 0.008));
  sombras(COC);
}

// =====================================================================================================
// LOS PERSONAJES (Gustavo, Tito, Susana y dos albañiles al fondo)
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
function gorro(per, color = C.navy3) {
  const g = new THREE.Group(); g.position.set(0, CC0 + 0.03, -0.01); g.rotation.x = -0.08; per.cabeza.add(g);
  const m = mat(color, 0.95);
  g.add(mesh(new THREE.SphereGeometry(R0 * 1.07, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), m, 0, 0.02, 0));
  const dob = mesh(new THREE.CylinderGeometry(R0 * 1.1, R0 * 1.12, 0.1, 32, 1, true), m, 0, 0.04, 0); dob.material = m.clone(); dob.material.side = THREE.DoubleSide; dob.material.color.multiplyScalar(0.85); g.add(dob);
  for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2; g.add(caja(0.012, 0.09, 0.012, dob.material, Math.sin(a) * R0 * 1.115, 0.04, Math.cos(a) * R0 * 1.115, 0.004)); }
  return sombras(g);
}
// el lápiz de carpintero apoyado sobre la oreja izquierda de Gustavo (se esconde mientras lo tiene en la mano)
function lapizOreja(per) {
  const g = new THREE.Group(); g.position.set(R0 * 1.0, CC0 + 0.045, 0.06); g.rotation.set(Math.PI / 2 - 0.2, 0, 0.1); per.cabeza.add(g);
  const cu = mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.17, 8), mat(0xe9d8a6, 0.6), 0, 0, 0); cu.scale.x = 0.7; g.add(cu);
  const pu = mesh(new THREE.ConeGeometry(0.0125, 0.035, 8), mat(0xd9c7a0, 0.7), 0, 0.102, 0); pu.scale.x = 0.7; g.add(pu);
  g.add(mesh(new THREE.ConeGeometry(0.005, 0.014, 6), M.navy, 0, 0.116, 0));
  return sombras(g);
}
const parp = (...ts) => ts.filter((v) => typeof v === "number" && !Number.isNaN(v)).map(r2);
const gustavo = crearPersonaje({ nombre: "Gustavo", piel: PIEL.media, pelo: 0x3a3330, peinado: "texturado", texturaAlto: 0.35, cejasColor: 0x2e2724, cejaGruesa: true,
  barba: 0x3a3330, barbaLarga: 0.35, barbaOpacidad: 0.35, barbaBigote: false,
  camisa: MARCA.cr, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, cuelloAlto: 0.06, chaleco: { color: MARCA.navy2, botones: MARCA.g },
  pantalon: 0x3a3f4a, zapatos: 0x3b2a20, panza: 1.08, nariz: 0.062, mejillas: 0xd08a72, alto: 1.03,
  dedos: true, parpadeoCada: 999, parpadeosExtra: parp(1.2, T.p2 + 0.9, T.p4 + 0.2, T.q1 + 1.0, T.q5 + 0.8, T.g12 + 1.45) });
const LAPIZ_OREJA = lapizOreja(gustavo);
{ const pm = mat(0x3a3330, 0.9); const nuca = mesh(new THREE.SphereGeometry(R0 * 1.035, 36, 16, Math.PI * 1.5 - 1.42, 2.84, Math.PI * 0.2, Math.PI * 0.46), pm, 0, CC0 + 0.01, -0.012); nuca.scale.set(1, 0.98, 0.97); gustavo.cabeza.add(nuca);
  semilla = 41; for (let i = 0; i < 17; i++) { const a = Math.PI * 1.5 - 1.35 + (i / 16) * 2.7, e = -0.38 + az() * 0.08, r = R0 * 1.03; const m = mesh(new THREE.SphereGeometry(1, 10, 8), pm, r * -Math.cos(a) * Math.cos(e), CC0 + 0.01 + R0 * 0.97 * Math.sin(e), r * Math.sin(a) * Math.cos(e) * 0.97 - 0.012); m.scale.set(0.05, 0.045 + az() * 0.02, 0.022); m.lookAt(m.position.clone().multiplyScalar(2).setY(m.position.y)); m.scale.set(0.05, 0.045, 0.022); gustavo.cabeza.add(m); } }
{ const mq = mat(0x0f1a2e, 0.8); for (const [y, r] of [[0.12, 0.262], [0.24, 0.266], [0.35, 0.252]]) { const a = mesh(new THREE.TorusGeometry(r, 0.008, 5, 40, Math.PI * 2 - 0.75), mq, 0, y, 0); a.rotation.set(Math.PI / 2, 0, Math.PI / 2 + 0.375); a.scale.y = 0.86; gustavo.cuerpo.add(a); } }
const tito = crearPersonaje({ nombre: "Tito", piel: PIEL.morena, pelo: 0xb9b6b0, peinado: "costados", cejasColor: 0xd8d4cc, cejaGruesa: true,
  camisa: MARCA.cr2, mangas: "largas", cuello: MARCA.navy3, cuelloBotones: false, cuelloAlto: 0.04,
  campera: { color: MARCA.cr, cuello: MARCA.navy3, cierre: 0xb4b2a3, abierta: false },
  pantalon: 0x5a5550, zapatos: 0x3b2a20, panza: 1.05, nariz: 0.066, mejillas: 0xa8604a, alto: 0.97,
  dedos: true, parpadeoCada: 999, parpadeosExtra: parp(T.p2 + 1.6, T.q2 + 1.3) });
gorro(tito, C.navy3);
{ const mp = mat(0xc9c6bd, 0.95); for (const [x, y, z, s] of [[0.11, 0.24, 0.225, 0.05], [-0.07, 0.1, 0.245, 0.04], [0.05, -0.02, 0.25, 0.035], [-0.15, 0.3, 0.18, 0.03]]) { const d = mesh(new THREE.SphereGeometry(1, 12, 8), mp, x, y, z); d.scale.set(s, s * 0.75, 0.012); d.lookAt(d.position.clone().multiplyScalar(3)); d.scale.set(s, s * 0.75, 0.012); tito.cuerpo.add(d); } }
// Susana (nueva): ~60, pelo corto canoso con volumen, anteojos de leer colgados de un cordón sobre el pecho, saco de lana
// verde oscuro sobre blusa crema, cartera navy al hombro
const susana = crearPersonaje({ nombre: "Susana", piel: PIEL.clara, pelo: 0xd2cfc8, peinado: "texturado", texturaAlto: 1.1, cejasColor: 0x9a948a, cejaFina: true,
  pestanas: 0x2a2424, cuelloFino: true, camisa: MARCA.cr, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, cuelloAlto: 0.05,
  labiosPegados: true, campera: { color: 0x365f28, cuello: 0x2b4d20, cierre: 0x2b4d20, abierta: true },
  pantalon: MARCA.navy2, zapatos: 0x3b2a20, panza: 1.04, nariz: 0.05, mejillas: 0xe8968a, labios: 0xa8555a, aros: MARCA.cr, alto: 0.95,
  dedos: true, parpadeoCada: 999, parpadeosExtra: parp(1.0, T.p4 + 1.0, T.p5 + 0.9, T.q1 + 1.6, T.k + 0.4, T.q5 + 0.6) });
{
  // volumen del pelo: mechones redondeados a los costados (hasta la mitad de la oreja) y la nuca, más alto arriba
  const pm = mat(0xd2cfc8, 0.85), pm2 = mat(0xbdb9b1, 0.9);
  const sobreC = (m, azi, el, k) => { const r = R0 * k; m.position.set(Math.sin(azi) * Math.cos(el) * r, CC0 + Math.sin(el) * r, Math.cos(azi) * Math.cos(el) * r); m.lookAt(m.position.clone().multiplyScalar(2).setY(m.position.y + Math.sin(el) * 0.3)); };
  semilla = 77;
  for (let i = 0; i < 14; i++) { const azi = Math.PI * 0.45 + (i / 13) * Math.PI * 1.1, el = 0.05 + (i % 2) * 0.22; const m = mesh(new THREE.SphereGeometry(1, 14, 10), i % 3 ? pm : pm2); m.scale.set(0.1, 0.11, 0.035); sobreC(m, azi, el, 1.0); susana.cabeza.add(m); }
  // los anteojos de leer colgados del cordón sobre el pecho (dos aros navy y el cordón navy)
  const an = mat(MARCA.navy, 0.4);
  for (const s of [-1, 1]) { const a = mesh(new THREE.TorusGeometry(0.045, 0.009, 8, 22), an, s * 0.052, 0.36, 0.215); a.rotation.x = -0.25; susana.cuerpo.add(a); }
  susana.cuerpo.add(caja(0.022, 0.008, 0.008, an, 0, 0.375, 0.218, 0.003));
  const cord = new THREE.CatmullRomCurve3([V3(-0.1, 0.38, 0.2), V3(-0.12, 0.47, 0.12), V3(-0.07, 0.53, 0.0), V3(0.07, 0.53, 0.0), V3(0.12, 0.47, 0.12), V3(0.1, 0.38, 0.2)]);
  susana.cuerpo.add(mesh(new THREE.TubeGeometry(cord, 24, 0.0045, 5), an));
  // la cartera navy al hombro derecho (-x), la correa por arriba del hombro
  const cm = mat(MARCA.navy, 0.55);
  susana.cuerpo.add(caja(0.07, 0.2, 0.22, cm, -0.27, 0.02, -0.02, 0.03));
  const corr = new THREE.CatmullRomCurve3([V3(-0.26, 0.11, 0.05), V3(-0.22, 0.4, 0.07), V3(-0.15, 0.5, 0.02), V3(-0.18, 0.46, -0.08), V3(-0.25, 0.11, -0.09)]);
  susana.cuerpo.add(mesh(new THREE.TubeGeometry(corr, 20, 0.009, 6), cm));
  sombras(susana.raiz);
}
// dos albañiles al fondo (sin voz), de espaldas en la fila
const ALB = [
  crearPersonaje({ nombre: "a1", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "costados", cejasColor: 0x2a2220, camisa: MARCA.navy3, mangas: "largas", cuello: null, cuelloBotones: false, pantalon: 0x4a4f5a, zapatos: 0x3b2a20, panza: 1.04, nariz: 0.06, alto: 1.02, parpadeoCada: 999 }),
  crearPersonaje({ nombre: "a2", piel: PIEL.clara, pelo: PELO.castaño, peinado: "costados", cejasColor: 0x4a3222, camisa: 0x8a8f98, mangas: "largas", cuello: null, cuelloBotones: false, pantalon: MARCA.navy2, zapatos: 0x2a2220, panza: 1.0, nariz: 0.056, alto: 0.99, parpadeoCada: 999 }),
];
casco(ALB[0], C.cr); gorro(ALB[1], C.gd);
const TODOS = [gustavo, tito, susana, ...ALB];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }

// ---- avatar de la ferretería para el chat: la cara de Gustavo en un círculo verde ----
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
  AVATAR.susana = leer(susana, 0xd9d7c9, 0.27, 1.65);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };

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
function textoSel(x, l, cx, y, px, tinta = "#0b1220") {
  const limpio = (s) => s.replace(/[[\]]/g, "");
  x.font = F(800, px); x.textBaseline = "middle"; x.textAlign = "left";
  const partes = l.split(/(\[[^\]]+\])/).filter(Boolean);
  const anchos = partes.map((p) => x.measureText(limpio(p)).width + (p.startsWith("[") ? px * 0.5 : 0));
  let xx = cx - anchos.reduce((a, b) => a + b, 0) / 2;
  partes.forEach((p, k) => {
    if (p.startsWith("[")) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = px * 0.1; x.beginPath(); x.roundRect(xx + px * 0.05, y - px * 0.62, anchos[k] - px * 0.1, px * 1.24, px * 0.12); x.fill(); x.stroke(); x.fillStyle = tinta; x.fillText(limpio(p), xx + px * 0.25, y + px * 0.04); }
    else { x.fillStyle = tinta; x.fillText(p, xx, y + px * 0.04); }
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
    for (const [l, color, p] of lineas) { const q = p ?? px; if (l.includes("[")) textoSel(x, l, w / 2, y + q * 0.62, q, color ?? "#0b1220"); else { x.font = F(800, q); x.fillStyle = color ?? "#efeee5"; x.fillText(l, w / 2, y + q * 0.62); } y += q * 1.25; }
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
// LAS PANTALLAS: la tablet de encargos y el chat genérico del celular de Susana
// =====================================================================================================
function enc(x, W, titulo, sub) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, W, 9);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, titulo, 800, 60, W - 420); x.fillText(titulo, 40, 66);
  if (sub) { x.textAlign = "right"; x.fillStyle = "#b9c3d3"; x.font = F(700, 46); x.fillText(sub, W - 40, 68); }
}
// Q1 · "Nuevo encargo": los campos se llenan con tipeo; el botón verde "Guardar ✓"
const CAMPOS = [["Cliente", "Susana"], ["Celular", "099 4·· ···"], ["Pieza", "Cartucho monocomando 35 mm"], ["Proveedor", "llega el martes"]];
function dibujarNuevo(x, W, H, { n = 0, guardado = 0, pulsa = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  enc(x, W, "Nuevo encargo", "Materiales Gustavo");
  let resto = n;
  CAMPOS.forEach(([a, b], i) => {
    const y = 172 + i * 138;
    x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 46); x.fillText(a, 44, y + 50);
    x.fillStyle = "#ffffff"; x.strokeStyle = resto > 0 && resto < b.length ? "#3fa60a" : "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(300, y, W - 344, 104, 20); x.fill(); x.stroke();
    const s = b.slice(0, Math.max(0, resto)); resto -= b.length;
    x.fillStyle = "#0b1220"; ajustar(x, b, 800, 58, W - 400); x.fillText(s, 330, y + 54);
  });
  const bw = 440, bx = W - 44 - bw, by = H - 140;
  x.fillStyle = guardado ? "#5ce611" : pulsa ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(bx, by, bw, 108, 54); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "right"; x.font = F(900, 56); x.fillText(guardado ? "Guardado" : "Guardar", bx + bw - 110, by + 56); tilde(x, bx + bw - 64, by + 56, 44, "#0b1220", 10);
  if (guardado) { x.fillStyle = "#3fa60a"; x.textAlign = "left"; x.font = F(800, 42); x.fillText("Aviso a Susana ✓", 44, by + 56); }
}
// Q3 · "Entrada de mercadería": el remito, la fila del cartucho, la tarjeta verde "Coincide con 1 encargo: Susana"
function dibujarEntrada(x, W, H, { fila = 0, coincide = 0, aviso = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  enc(x, W, "Entrada de mercadería", "martes 9:00");
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 46); x.fillText("Remito del proveedor", 44, 192);
  const filas = [["Flexible 40 cm", "x 6"], ["Llave de paso 1/2", "x 2"], ["Cartucho monocomando 35 mm", "x 1"]];
  filas.forEach(([a, b], i) => {
    if (i === 2 && fila <= 0) return;
    const y = 236 + i * 104;
    x.globalAlpha = i === 2 ? Math.min(1, fila * 1.5) : 1;
    x.fillStyle = i === 2 ? "#ffffff" : "#e3e0d2"; x.strokeStyle = i === 2 ? "#3fa60a" : "#b4b2a3"; x.lineWidth = i === 2 ? 7 : 4; x.beginPath(); x.roundRect(36, y, W - 72, 88, 16); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, a, 800, 50, W - 300); x.fillText(a, 64, y + 46); x.textAlign = "right"; x.font = F(900, 50); x.fillText(b, W - 64, y + 46);
    x.globalAlpha = 1;
  });
  if (coincide > 0) {
    const y = 560 + (1 - coincide) * 24; x.globalAlpha = Math.min(1, coincide * 1.6);
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(36, y, W - 72, 236, 30); x.fill();
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(110, y + 70, 42, 0, 7); x.fill(); tilde(x, 111, y + 72, 44, "#0b1220", 10);
    x.fillStyle = "#5ce611"; x.textAlign = "left"; x.font = F(900, 54); x.fillText("Coincide con 1 encargo: Susana", 172, y + 72);
    x.fillStyle = "#efeee5"; x.font = F(800, 44); x.fillText(aviso > 0 ? "Aviso enviado por WhatsApp ✓" : "Enviando aviso…", 172, y + 160);
    x.globalAlpha = 1;
  }
}
// Q4 · el panel "Encargos": tres columnas con contador, filas, recordatorio; arriba "Llegaron y nadie avisó: 9 → 0"
function dibujarPanel(x, W, H, { cuenta = 9, record = 0, k = 1 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  enc(x, W, "Encargos", "Materiales Gustavo");
  const txt = `Llegaron y nadie avisó: ${cuenta}`; x.font = F(900, 50); const tw = x.measureText(txt).width + 60;
  x.fillStyle = cuenta === 0 ? "#5ce611" : "#c7655b"; rr(x, (W - tw) / 2, 160, tw, 84, 42); x.fillStyle = cuenta === 0 ? "#0b1220" : "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(txt, W / 2, 204);
  const cols = [["Pendientes", 4, "#16243d"], ["Avisados", 3, "#3fa60a"], ["Retirados", 12, "#16243d"]];
  const cw = (W - 120) / 3;
  cols.forEach(([a, n, c], i) => { const X = 40 + i * (cw + 20); x.fillStyle = i === 1 ? "#cfeebc" : "#ffffff"; x.strokeStyle = c; x.lineWidth = 6; x.beginPath(); x.roundRect(X, 268, cw, 150, 22); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText(a, X + cw / 2, 308); x.font = F(900, 72); x.fillText(String(Math.round(n * k)), X + cw / 2, 372); });
  const filas = [["Susana · Cartucho 35", "Avisada ✓", "#3fa60a"], ["Ramírez · Llave de paso 3/4", "llega jueves", "#16243d"], ["Pereira · Bisagras x4", "Retirado ✓", "#3fa60a"]];
  filas.forEach(([a, b, c], i) => { const y = 440 + i * 84; x.fillStyle = "#ffffff"; rr(x, 40, y, W - 80, 72, 14); x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, a, 800, 46, W - 470); x.fillText(a, 64, y + 38); x.textAlign = "right"; x.fillStyle = c; x.font = F(900, 46); x.fillText(b, W - 64, y + 38); });
  if (record > 0) { x.globalAlpha = Math.min(1, record * 1.6); x.fillStyle = "#16243d"; rr(x, 40, H - 110, W - 80, 90, 24); x.fillStyle = "#5ce611"; x.textAlign = "left"; ajustar(x, "Jueves: recordatorio a los que no retiraron", 900, 48, W - 200); x.fillText("Jueves: recordatorio a los que no retiraron", 70, H - 64); tilde(x, W - 90, H - 64, 40, "#5ce611", 10); x.globalAlpha = 1; }
}
// Q5 · la tablet del mostrador (3D): "Susana · Cartucho 35 · Retirado ✓" y "Nuevo encargo · Susana · Flotador ✓"
function dibujarQ5(x, W, H, { retirado = 0, nuevo = 0 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  enc(x, W, "Encargos", "miércoles");
  const fila = (y, a, b, ok, c = "#3fa60a") => { x.fillStyle = "#ffffff"; x.strokeStyle = ok ? c : "#b4b2a3"; x.lineWidth = 8; x.beginPath(); x.roundRect(40, y, W - 80, 200, 26); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, a, 900, 64, W - 160); x.fillText(a, 76, y + 62); x.fillStyle = ok ? c : "#3a4256"; x.font = F(900, 60); x.fillText(b, 76, y + 144); if (ok) tilde(x, W - 120, y + 140, 60, c, 14); };
  fila(180, "Susana · Cartucho 35", retirado ? "Retirado" : "Avisada", retirado > 0);
  if (nuevo > 0) { x.globalAlpha = Math.min(1, nuevo * 1.6); fila(420, "Nuevo · Susana · Flotador", "Encargado", true); x.globalAlpha = 1; }
}
function dibujarReposo(x, W, H) { x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 90); x.fillText("Encargos", W / 2, H / 2 - 30); x.fillStyle = "#5ce611"; x.fillRect(W / 2 - 170, H / 2 + 50, 340, 16); }
// el chat del celular de Susana (genérico: burbujas crema y navy, sin logo)
const CW = 740, CH = 1290;
function cabecera(x, W, cv, nombre, sub) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 176); x.fillStyle = "#5ce611"; x.fillRect(0, 176, W, 8);
  x.strokeStyle = "#efeee5"; x.lineWidth = 9; x.lineCap = "round"; x.beginPath(); x.moveTo(52, 70); x.lineTo(30, 92); x.lineTo(52, 114); x.stroke();
  avatar(x, cv, 124, 92, 54);
  x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#efeee5"; ajustar(x, nombre, 800, 52, W - 230); x.fillText(nombre, 196, 70);
  x.fillStyle = "#b9c3d3"; x.font = F(700, 38); x.fillText(sub, 198, 126);
}
function burbuja(x, Y, lineas, { px = 48, hora = "", verde = false, ult = 1 } = {}) {
  x.font = F(800, px); const w = Math.min(CW - 60, Math.max(...lineas.map((l) => x.measureText(l).width)) + 70), h = 40 + lineas.length * px * 1.26 + 40;
  const X = 26;
  x.globalAlpha = ult; x.fillStyle = "#ffffff"; x.strokeStyle = verde ? "#3fa60a" : "#16243d"; x.lineWidth = verde ? 8 : 5; x.beginPath(); x.roundRect(X, Y, w, h, [8, 34, 34, 34]); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; lineas.forEach((l, i) => x.fillText(l, X + 30, Y + 24 + px * 0.62 + i * px * 1.26));
  x.fillStyle = "#6b7080"; x.font = F(700, 36); x.textAlign = "right"; x.fillText(hora, X + w - 26, Y + h - 28);
  x.globalAlpha = 1;
  return h;
}
function dibujarChat(x, W, H, msgs, ult = 1) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  const medir = document.createElement("canvas").getContext("2d");
  const hs = msgs.map((m) => burbujaAlto(medir, m)), gap = 30;
  let y = H - 60 - hs.reduce((a, b) => a + b + gap, 0) + gap + (1 - eo(ult)) * (hs[hs.length - 1] + gap);
  msgs.forEach((m, i) => { if (m.dia) { x.font = F(800, 36); const w = x.measureText(m.dia).width + 50; x.fillStyle = "#d9d7c9"; rr(x, (W - w) / 2, y, w, 60, 30); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(m.dia, W / 2, y + 31); } else burbuja(x, y, m.l, { ...m, ult: i === msgs.length - 1 ? Math.min(1, ult * 2) : 1 }); y += hs[i] + gap; });
  cabecera(x, W, AVATAR.gustavo, "Ferretería Gustavo", "Materiales Gustavo");
}
function burbujaAlto(x, m) { if (m.dia) return 60; const px = m.px ?? 48; return 40 + m.l.length * px * 1.26 + 40; }

// ---- los insertos a pantalla (pegados a la cámara): la tablet y el celular, con el fondo plano detrás ----
function crearFondoInserto(g, cocina = false) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: cocina ? 0x16243d : 0x1f3254 })); bg.position.z = -0.06; g.add(bg);
  if (cocina) { for (let i = -8; i <= 8; i++) { const o = new THREE.Mesh(new THREE.PlaneGeometry(10 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: 0xefeee5 })); o.position.set((i * 150) / PXK, 0, -0.059); g.add(o); const h = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 10 / PXK), new THREE.MeshBasicMaterial({ color: 0xefeee5 })); h.position.set(0, (i * 150) / PXK, -0.059); g.add(h); } return; }
  for (let i = -8; i <= 8; i++) { const o = new THREE.Mesh(new THREE.PlaneGeometry(26 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: 0x2c4268 })); o.position.set((i * 84) / PXK, 0, -0.059); g.add(o); }
  const pi = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 560 / PXK), new THREE.MeshBasicMaterial({ color: 0xb08a5e })); pi.position.set(0, -1000 / PXK, -0.058); g.add(pi);
  const fr = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 26 / PXK), new THREE.MeshBasicMaterial({ color: 0x5ce611 })); fr.position.set(0, -720 / PXK, -0.057); g.add(fr);
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: opc.funda ?? 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  if (opc.mano) {
    const piel = new THREE.MeshBasicMaterial({ color: opc.mano }), sombraP = new THREE.MeshBasicMaterial({ color: new THREE.Color(opc.mano).multiplyScalar(0.82) });
    const palma = new THREE.Mesh(rbox(330 / PXK, 420 / PXK, 0.01, 120 / PXK, 3), piel); palma.position.set((cx - 540 - IW / 2 + 90) / PXK, (960 - cy - IH / 2 - 120) / PXK, -0.045); palma.rotation.z = -0.35; g.add(palma);
    const manga = new THREE.Mesh(rbox(300 / PXK, 420 / PXK, 0.01, 60 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x365f28 })); manga.position.set((cx - 540 - IW / 2 - 30) / PXK, (960 - cy - IH / 2 - 420) / PXK, -0.046); manga.rotation.z = -0.35; g.add(manga);
    const pulgar = new THREE.Mesh(rbox(86 / PXK, 250 / PXK, 0.01, 43 / PXK, 3), piel); pulgar.position.set((cx - 540 - IW / 2 + 20) / PXK, (960 - cy - IH / 2 + 160) / PXK, -0.015); pulgar.rotation.z = -0.5; if (!opc.sinPulgar) g.add(pulgar);
    const una = new THREE.Mesh(rbox(50 / PXK, 60 / PXK, 0.01, 22 / PXK, 3), sombraP); una.position.set((cx - 540 - IW / 2 + 70) / PXK, (960 - cy - IH / 2 + 250) / PXK, -0.014); una.rotation.z = -0.5; if (!opc.sinPulgar) g.add(una);
  }
  return { g, tex, IW, IH };
}
const INS_T = { g: new THREE.Group() }; crearFondoInserto(INS_T.g);
const TAB = crearCelInserto(TW * 0.86, TH * 0.86, 540, 1000, 36, { funda: 0x0b1220 }); INS_T.g.add(TAB.g);
{ const at = new THREE.Mesh(rbox(560 / PXK, 46 / PXK, 0.005, 16 / PXK, 2), new THREE.MeshBasicMaterial({ color: 0x2c4268 })); at.position.set(0, (960 - 1400) / PXK, -0.034); INS_T.g.add(at); }
const INS_C = { g: new THREE.Group() }; crearFondoInserto(INS_C.g);
const CEL = crearCelInserto(CW, CH, 600, 1060, 34, { camara: true, funda: 0x1f3254, mano: 0xf2c9a8, sinPulgar: true }); INS_C.g.add(CEL.g);
const INS_K = { g: new THREE.Group() }; crearFondoInserto(INS_K.g, true);
const CELK = crearCelInserto(CW, CH, 600, 1060, 34, { camara: true, funda: 0x1f3254, mano: 0xf2c9a8, sinPulgar: true }); INS_K.g.add(CELK.g);
for (const I of [INS_T, INS_C, INS_K]) { pegarACamara(I.g, camera, 10); I.g.visible = false; }
TAB.tex.userData.c.width = TAB.IW; // (el lienzo del inserto ya tiene el tamaño del inserto)
let claveTab = "", claveTab3 = "", claveCel = "";
function estadoTab(t, pa) {
  if (pa === "Q1t") return { k: "nuevo", n: Math.round(sg(t, T.campos[0], T.campos[1]) * CAMPOS.reduce((a, c) => a + c[1].length, 0)), guardado: t >= T.guardar ? 1 : 0, pulsa: t >= T.guardar - 0.08 ? 1 : 0 };
  if (pa === "Q3t") return { k: "entrada", fila: Math.round(sg(t, T.fila, T.fila + 0.25) * 4) / 4, coincide: Math.round(sg(t, T.coincide, T.coincide + 0.25) * 4) / 4, aviso: t >= T.aviso ? 1 : 0 };
  if (pa === "Q4") return { k: "panel", cuenta: Math.round(9 * (1 - sg(t, T.baja[0], T.baja[1]))), record: Math.round(sg(t, T.record, T.record + 0.25) * 4) / 4, k2: 1 };
  return null;
}
function dibujarTabInserto(t, pa) {
  const e = estadoTab(t, pa); if (!e) return; const k = JSON.stringify(e); if (k === claveTab) return; claveTab = k;
  const x = TAB.tex.userData.x, W = TAB.IW, H = TAB.IH;
  x.save(); x.setTransform(W / TW, 0, 0, H / TH, 0, 0);
  if (e.k === "nuevo") dibujarNuevo(x, TW, TH, e); else if (e.k === "entrada") dibujarEntrada(x, TW, TH, e); else dibujarPanel(x, TW, TH, { cuenta: e.cuenta, record: e.record });
  x.restore(); TAB.tex.needsUpdate = true;
}
// la tablet 3D del mostrador (parte 2)
function ponerTablet3D(t) {
  let e;
  if (t < T.toca) e = "reposo"; else if (t < T.q2) e = "nuevo:" + (t >= T.guardar ? 1 : 0); else if (t < T.q3) e = "reposo"; else if (t < T.q4) e = "entrada:" + (t >= T.aviso ? 1 : 0); else if (t < T.q5) e = "panel"; else e = "q5:" + (t >= T.retirado ? 1 : 0) + (t >= T.nuevo ? 1 : 0);
  if (e === claveTab3) return; claveTab3 = e;
  const x = tabT.userData.x;
  if (e === "reposo") dibujarReposo(x, TW, TH);
  else if (e.startsWith("nuevo")) dibujarNuevo(x, TW, TH, { n: 99, guardado: e.endsWith("1") ? 1 : 0 });
  else if (e.startsWith("entrada")) dibujarEntrada(x, TW, TH, { fila: 1, coincide: 1, aviso: e.endsWith("1") ? 1 : 0 });
  else if (e === "panel") dibujarPanel(x, TW, TH, { cuenta: 0, record: 1 });
  else dibujarQ5(x, TW, TH, { retirado: e[3] === "1" ? 1 : 0, nuevo: e[4] === "1" ? 1 : 0 });
  tabT.needsUpdate = true;
}
function dibujarCelInserto(t, pa) {
  let msgs, ult = 1, I = CEL;
  if (pa === "Q1c") {
    const hist = [{ dia: "AGOSTO" }, { l: ["Tu pedido de teflón y la", "llave de paso está listo ✓"], hora: "16:20" }, { dia: "HOY" }];
    msgs = [...hist, { l: ["Anotamos tu encargo ✓", "Cartucho 35 mm.", "Te avisamos", "cuando llegue."], hora: "10:01", verde: true, px: 52 }];
    ult = sg(t, T.anotamos, T.anotamos + 0.3); if (t < T.anotamos) msgs = hist;
  } else if (pa === "Q3c") {
    I = CELK;
    msgs = [{ dia: "SÁBADO" }, { l: ["Anotamos tu encargo ✓", "Cartucho 35 mm."], hora: "10:01" }, { dia: "HOY" }, { l: ["Susana, llegó tu", "cartucho de 35 ✓", "Te lo guardamos", "hasta el sábado."], hora: "9:02", verde: true, px: 52 }];
    ult = sg(t, T.noti, T.noti + 0.3); if (t < T.noti) msgs = msgs.slice(0, 3);
  } else return;
  const k = pa + Math.round(ult * 8); if (k === claveCel) return; claveCel = k;
  dibujarChat(I.tex.userData.x, CW, CH, msgs, ult); I.tex.needsUpdate = true;
}

// =====================================================================================================
// LAS TARJETAS DE ESTE REEL
// =====================================================================================================
const chip = (txt, px = 58) => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo: "#0b1220", borde: C.cr }); };
const GL = {
  sab: chip("Sábado, 10:00."), mar: chip("Martes, 9:00."), tres: chip("Tres semanas después."), mie: chip("Miércoles, 18:00."),
  s1: crearGlobo(["Gustavo, ¿tenés este", "[cartucho?] Me gotea", "la canilla."], 60),
  g2: crearGlobo(["Ese no me queda.", "Te lo [encargo.]"], 66),
  g3: crearGlobo(["Dejame tu [número.]"], 70),
  t4: crearGlobo(["Seis tornillos", "del [ocho.]"], 70),
  preg: crearGlobo(["?"], 130, { tinta: "#efeee5", fondo: "#c7655b" }),
  s5: crearGlobo(["Gustavo,", "¿llegó lo [mío?]"], 74),
  g6: crearGlobo(["[Elegí.]"], 110),
  s7: crearGlobo(["Ya lo [compré.]"], 74),
  s8: crearGlobo(["¿Me encargás [este?]"], 68),
  s10: crearGlobo(["¡Llegó lo [mío!]"], 78),
  s11: crearGlobo(["Ya lo [tenés.]"], 80),
  rCosto: crearRotulo([["Llegaron y nadie avisó: 9", "#efeee5", 50], ["$ 14.300 en el cajón", "#efeee5", 50]], 50, { fondo: "#c7655b", borde: C.navy }),
  rOtro: crearRotulo([["Cartucho 35 · $ 780", "#efeee5", 50], ["lo compró en otro lado", "#efeee5", 46]], 50, { fondo: "#c7655b", borde: C.navy }),
  rQ1: crearRotulo([["Cada encargo, con"], ["nombre y [celular]", "#0b1220"]], 52),
  rQ3: crearRotulo([["Cuando entra la"], ["mercadería, [avisa solo]", "#0b1220"]], 52),
  rQ4: crearRotulo([["Si no lo retira,"], ["se lo [recuerda]", "#0b1220"]], 52),
  rRet: crearRotulo([["Retirado ✓", "#5ce611", 58]], 58),
  rNuevo: crearRotulo([["Nuevo encargo · Susana"], ["Flotador ✓", "#5ce611"]], 50),
  rSus: crearRotulo([["SUSANA · CARTUCHO 35", "#efeee5", 46]], 46),
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
// encuadres que se repiten (callbacks): A = el cuadro 0 por encima del hombro de Susana · B = las manos (P1b) ·
// D = Tito con los codos (P2) · E = el martes (P3) · K = la cocina
const CA = (k) => [lerp(-0.55, -0.6, k), lerp(1.7, 1.68, k), lerp(2.15, 1.95, k), lerp(-0.92, -0.92, k), lerp(1.26, 1.25, k), -0.6, lerp(48, 46, k)];
const CB = (k) => [lerp(-1.12, -1.1, k), lerp(2.02, 1.96, k), -0.05, lerp(-1.12, -1.1, k), 1.0, -0.02, 50, 1];   // desde arriba, el +z arriba
const CD = (k) => [lerp(-0.48, -0.48, k), lerp(1.6, 1.58, k), lerp(-0.86, -0.8, k), -0.62, lerp(1.2, 1.18, k), 0.7, lerp(62, 60, k)];
const CE = (k) => [lerp(0.78, 0.7, k), lerp(1.74, 1.72, k), lerp(-0.12, -0.16, k), -0.82, lerp(1.22, 1.16, k), -0.28, lerp(52, 50, k)];
const CK = (k) => [KX + lerp(0.92, 0.86, k), lerp(1.52, 1.5, k), lerp(-0.48, -0.45, k), KX + lerp(-0.22, -0.25, k), lerp(1.14, 1.17, k), lerp(0.02, 0.05, k), lerp(62, 60, k)];
const CQ = (k) => [lerp(-0.6, -0.61, k), lerp(1.24, 1.22, k), lerp(0.42, 0.37, k), -0.72, 1.08, 0.06, lerp(40, 38, k)];   // inserto del cucurucho
const CF = (k) => [lerp(-0.4, -0.42, k), lerp(1.64, 1.62, k), lerp(-0.8, -0.74, k), -1.2, 1.4, 0.85, lerp(52, 50, k)];   // contraplano a Susana
const PLANOS = [];   // se arma en armarPlanos() (necesita T)
function armarPlanos() {
  const P = (n, a, b, f) => PLANOS.push([n, a, f ? [[a, ...f(0)], [b, ...f(1)]] : null]);
  P("P1", 0, T.insCal[0], CA);
  PLANOS.push(["P1i", T.insCal[0], [[T.insCal[0], PT.mide.x + 0.05, PT.mide.y - 0.04, 0.62, PT.mide.x + 0.04, PT.mide.y - 0.06, 0.05, 36], [T.insCal[1], PT.mide.x + 0.05, PT.mide.y - 0.04, 0.56, PT.mide.x + 0.04, PT.mide.y - 0.06, 0.05, 35]]]);
  PLANOS.push(["P1", T.insCal[1], [[T.insCal[1], ...CA(0.45)], [T.p1b, ...CA(1)]]]);
  P("P1b", T.p1b, T.p2, CB);
  P("P2", T.p2, T.insCuc[0], CD);
  PLANOS.push(["P2i", T.insCuc[0], [[T.insCuc[0], ...CQ(0)], [T.insCuc[1], ...CQ(1)]]]);
  PLANOS.push(["P2", T.insCuc[1], [[T.insCuc[1], ...CD(0.6)], [T.p3, ...CD(1)]]]);
  P("P3", T.p3, T.p4, CE);
  PLANOS.push(["P4", T.p4, [[T.p4, ...CA(0)], [T.saca, ...CA(0.5)], [T.g6 - 0.1, -0.64, 1.6, 1.5, -0.95, 1.26, -0.3, 48], [T.p5, -0.65, 1.58, 1.4, -0.95, 1.26, -0.3, 47]]]);
  P("P5", T.p5, T.p5b, CF);
  P("P5b", T.p5b, P1, CB);
  // ---- parte 2 ----
  P("Q1", P2, T.q1t, CA);
  PLANOS.push(["Q1t", T.q1t, null]);
  PLANOS.push(["Q1c", T.q1c, null]);
  P("Q2", T.q2, T.insCucB[0], CD);
  PLANOS.push(["Q2i", T.insCucB[0], [[T.insCucB[0], ...CQ(0)], [T.insCucB[1], ...CQ(1)]]]);
  PLANOS.push(["Q2", T.insCucB[1], [[T.insCucB[1], ...CD(0.6)], [T.q3, ...CD(1)]]]);
  P("Q3", T.q3, T.q3t, CE);
  PLANOS.push(["Q3t", T.q3t, null]);
  P("Q3k", T.k, T.noti - 0.05, CK);
  PLANOS.push(["Q3c", T.noti - 0.05, null]);
  P("Q3s", T.s10 - 0.12, T.q4, (k) => [KX + lerp(0.7, 0.64, k), 1.52, lerp(-0.47, -0.44, k), KX - 0.6, lerp(1.3, 1.32, k), 0.5, lerp(52, 49, k)]);
  PLANOS.push(["Q4", T.q4, null]);
  PLANOS.push(["Q5", T.q5, [[T.q5, ...CA(0)], [T.daBolsa, ...CA(0.5)], [T.s11, ...CA(0.9)], [T.c, ...CA(1)]]]);
  PLANOS.push(["C", T.c, [[T.c, -0.92, 1.52, 1.6, -0.95, 1.2, -0.6, 42], [DUR, -0.93, 1.51, 1.42, -0.95, 1.2, -0.6, 41]]]);
}

// =====================================================================================================
// POSES
// =====================================================================================================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.82, tension: 0.2, feliz: 0 }, cejas: { alto: -0.05, ang: -0.1 }, boca: { sonrisa: 0.12, abierta: 0, ancho: 0.8 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.92, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } };
const AMABLE = { ...CARA.sonrisa, ojos: { abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.4, ang: 0.25, asim: 0 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } };
const PICARA = { ...CARA.sonrisa, ojos: { abiertos: 0.85, feliz: 0.45 }, cejas: { alto: 0.3, ang: 0, asim: 0.6 }, boca: { sonrisa: 0.7, abierta: 0, ancho: 1.0 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (!env) return;
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const manoA = (per, p, w, k, lado = "D") => { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "D" ? "manoD" : "manoI"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(Math.min(1, k)))); };
const Y = MOS.alto;
// puntos del mostrador (mundo)
const PT = {
  mide: V3(-0.82, 1.3, 0.06),                     // donde Gustavo mide el cartucho (P1, Q1)
  escribe: V3(-1.0, Y + 0.004, -0.04),           // el papelito en el mostrador mientras escribe
  cuc: V3(-0.72, Y + 0.002, 0.06),                // donde se enrolla el cucurucho (inserto)
  cajon: V3(-0.98, Y, 0.0),                       // el cajón ENCARGOS apoyado
  cajonAbajo: V3(-0.98, 0.46, -0.6),              // el cajón abajo (de donde lo saca)
  prov: V3(-1.62, Y, -0.02),                      // la caja del proveedor
};
const SUS0 = { x: -1.2, z: 0.85 }, TITO0 = { x: -0.7, z: 0.68, giro: -2.95 };
const enTito = (dx, dy, dz) => { const g = TITO0.giro, c = Math.cos(g), sn = Math.sin(g); return V3(TITO0.x + dx * c + dz * sn, dy, TITO0.z - dx * sn + dz * c); };
armarPlanos();
// el cajón: abajo (oculto) → arriba del mostrador (plano) → inclinado hacia el cliente (P4, Q5)
function poseCajon(t) {
  const p2 = t >= P2;
  // P3: lo sube y lo apoya plano; P4: lo sube inclinado hacia Susana; Q5 igual
  let sube = 0, incl = 0;
  if (!p2) {
    if (t >= T.abre && t < T.p4) { sube = eio(sg(t, T.abre, T.abre + 0.4)); }
    if (t >= T.p4 && t < T.p5) { sube = eio(sg(t, T.saca, T.saca + 0.45)); incl = sube; }
    if (t >= T.p5 && t < T.p5b) { sube = 1; incl = 1; }
  } else if (t >= T.q5) { sube = eio(sg(t, T.q5 + 0.05, T.q5 + 0.45)); incl = sube; }
  const p = PT.cajonAbajo.clone().lerp(PT.cajon, sube); p.y += Math.sin(sube * Math.PI) * 0.12 + incl * 0.07; p.z += incl * 0.04;
  return { p, rx: incl * 0.55, vis: sube > 0.001 };
}
function poseGustavo(t) {
  const p2 = t >= P2;
  const base = { x: G0.x, z: G0.z, giro: 0, ...aC(0, 0.1), ...CARA.neutra, ...BRAZOS.apoyado };
  // ---------- parte 1 ----------
  if (!p2 && t < T.p1b) {
    // P1: mira la bolsita, la agarra, saca el cartucho y lo mide con el calibre; "Ese no me queda. Te lo encargo."
    const p = poseEn(t, [
      [0, { ...base, giro: 0.12, ...aC(0.2, 0.18), ...CARA.concentrada, ...BRAZOS.costado }],
      [T.agarra, { ...aC(0.12, 0.3), ...CARA.concentrada }, 0.3],
      [T.g2 - 0.05, { giro: 0.2, ...aC(0.25, 0.08), ...AMABLE }, 0.3],
    ]);
    const kM = sg(t, T.agarra - 0.3, T.agarra) ;
    if (kM > 0) { manoA(gustavo, p, PT.mide.clone().add(V3(0.2, 0.01, -0.02)), kM, "I"); manoA(gustavo, p, PT.mide.clone().add(V3(0.0, -0.2, -0.03)), kM, "D"); }
    p.t = t; bocaVoz(p, t, T.g2, ENV.g2, 0.6); return p;
  }
  if (!p2 && t < T.p2) {
    // P1b: arranca el papel contra la cuchilla, baja el lápiz de la oreja, escribe; pega el papelito en la caja
    const p = poseEn(t, [[0, { ...base, giro: -0.1, ...aC(-0.1, 0.55), ...CARA.concentrada }], [T.pega, { giro: 0.3, ...aC(0.45, 0.35) }, 0.25]]);
    const k1 = sg(t, T.p1b - 0.1, T.arranca) * (1 - sg(t, T.arranca + 0.15, T.arranca + 0.35));
    manoA(gustavo, p, BORDE_ROLLO().add(V3(0.1, 0.02, -0.04)), k1, "I");
    const kE = sg(t, T.escribe[0] - 0.2, T.escribe[0]) * (1 - sg(t, T.escribe[1], T.escribe[1] + 0.15));
    manoA(gustavo, p, puntaMundo(t).add(V3(-0.07, 0.1, -0.05)), kE, "D");
    manoA(gustavo, p, PT.escribe.clone().add(V3(PAP.W / 2 + 0.05, 0.03, -0.02)), sg(t, T.arranca + 0.2, T.escribe[0]) * (1 - sg(t, T.escribe[1], T.escribe[1] + 0.1)), "I");
    const kP = sg(t, T.escribe[1], T.pega) * (1 - sg(t, T.pega + 0.15, T.pega + 0.35));
    manoA(gustavo, p, PAPEL_EN_CAJA().p.add(V3(-0.04, 0.0, 0.03)), kP, "I");
    p.t = t; bocaVoz(p, t, T.g3, ENV.g3, 0.6); return p;
  }
  if (!p2 && t < T.p3) {
    // P2: gira a la pared de cajoncitos, saca seis del 8; despega el papelito sin mirar; el cucurucho; se lo da a Tito
    const atras = Math.PI - 0.25;
    const p = poseEn(t, [
      [0, { ...base, giro: -0.1, ...aC(-0.15, 0.05), ...MEDIA }],
      [T.cajon8, { giro: atras, ...aC(0.0, 0.1), ...CARA.concentrada }, 0.3],
      [T.cajon8 + 0.55, { giro: 0, ...aC(-0.2, 0.25) }, 0.3],
      [T.da, { giro: -0.1, ...aC(-0.3, 0.05), ...MEDIA }, 0.2],
    ]);
    const kC = sg(t, T.cajon8 - 0.05, T.cajon8 + 0.15) * (1 - sg(t, T.cajon8 + 0.35, T.cajon8 + 0.5));
    if (kC > 0) { gustavo.poner(p); manoA(gustavo, p, CAJ8_P.clone().add(V3(0, 0.04, 0.12)), kC, "D"); }
    const kD = sg(t, T.despega - 0.25, T.despega) * (1 - sg(t, T.despega + 0.1, T.despega + 0.3));
    manoA(gustavo, p, PAPEL_EN_CAJA().p.add(V3(-0.04, 0, 0.03)), kD, "I");
    const kDa = sg(t, T.insCuc[1], T.da);
    manoA(gustavo, p, manoTito().add(V3(-0.02, 0.04, -0.06)), kDa * (1 - sg(t, T.da + 0.1, T.da + 0.35)), "I");
    p.t = t; return p;
  }
  if (!p2 && t < T.p4) {
    // P3: martes; levanta el blíster de la caja del proveedor, mira la caja registradora (solo la cinta); saca el cajón
    const p = poseEn(t, [
      [0, { ...base, giro: -0.25, ...aC(-0.35, 0.3), ...CARA.neutra }],
      [T.mira, { giro: 0.2, ...aC(0.55, 0.15), ...CARA.incredula }, 0.25],
      [T.abre, { giro: 0, ...aC(0.0, 0.45), ...SECO }, 0.25],
    ]);
    const kB = sg(t, T.p3, T.p3 + 0.3) * (1 - sg(t, T.mete, T.mete + 0.2));
    manoA(gustavo, p, blisterMano(t), kB, "I");
    const kc = sg(t, T.abre - 0.15, T.abre + 0.1);
    if (kc > 0) { const c = poseCajon(t).p; manoA(gustavo, p, c.clone().add(V3(-0.3, 0.1, -0.12)), kc, "D"); if (t > T.mete + 0.1) manoA(gustavo, p, c.clone().add(V3(0.3, 0.1, -0.12)), sg(t, T.mete + 0.1, T.mete + 0.3), "I"); }
    p.t = t; return p;
  }
  if (!p2 && t < P1) {
    // P4: "¿llegó lo mío?": saca el cajón y lo inclina hacia ella; pausa; "Elegí." (seco, media sonrisa amarga)
    // P5: Susana "Ya lo compré."; "¿Me encargás este?"; ya arrancando papel: "Dejame tu número."
    const p = poseEn(t, [
      [0, { ...base, giro: 0.12, ...aC(0.2, 0.05), ...CARA.esperanza }],
      [T.saca, { ...aC(0.15, 0.2), ...SECO }, 0.3],
      [T.g6 - 0.1, { ...aC(0.18, 0.02, 0.06), ...SECO, boca: { sonrisa: 0.22, abierta: 0, ancho: 0.85 }, cejas: { alto: 0.12, ang: 0.15, asim: 0.4 } }, 0.25],
      [T.p5b, { giro: -0.1, ...aC(-0.1, 0.55), ...CARA.concentrada }, 0.2],
    ]);
    const kc = sg(t, T.saca - 0.2, T.saca) * (1 - sg(t, T.p5 + 0.1, T.p5 + 0.3));
    if (kc > 0) { const c = poseCajon(t).p; manoA(gustavo, p, c.clone().add(V3(-0.3, 0.12, -0.15)), kc, "D"); manoA(gustavo, p, c.clone().add(V3(0.3, 0.12, -0.15)), kc, "I"); }
    const kA = sg(t, T.p5b - 0.1, T.arranca2) * (1 - sg(t, T.arranca2 + 0.2, T.arranca2 + 0.4));
    manoA(gustavo, p, BORDE_ROLLO().add(V3(0.1, 0.02, -0.04)), kA, "I");
    manoA(gustavo, p, PT.escribe.clone().add(V3(0.1, 0.04, -0.04)), sg(t, T.arranca2 + 0.25, T.arranca2 + 0.5), "I");
    p.t = t; bocaVoz(p, t, T.g6, ENV.g6, 0.5); bocaVoz(p, t, T.g3b, ENV.g3, 0.6); return p;
  }
  // ---------- parte 2 ----------
  if (t < T.q2) {
    // Q1: mide ("35"), toca "Nuevo encargo" en la tablet, "Dejame tu número." mientras se carga
    const p = poseEn(t, [
      [0, { ...base, giro: 0.12, ...aC(0.2, 0.18), ...CARA.concentrada, ...BRAZOS.costado }],
      [T.agarraB, { ...aC(0.12, 0.3), ...CARA.concentrada }, 0.3],
      [T.toca, { giro: 0.35, ...aC(0.45, 0.3), ...AMABLE }, 0.3],
      [T.anotamos, { giro: 0.2, ...aC(0.2, 0.05), ...AMABLE }, 0.3],
    ]);
    const kM = sg(t, T.agarraB - 0.3, T.agarraB) * (1 - sg(t, T.toca - 0.4, T.toca - 0.15));
    if (kM > 0) { manoA(gustavo, p, PT.mide.clone().add(V3(0.2, 0.01, -0.02)), kM, "I"); manoA(gustavo, p, PT.mide.clone().add(V3(0.0, -0.2, -0.03)), kM, "D"); }
    const kT = sg(t, T.toca - 0.25, T.toca) * (1 - sg(t, T.guardar + 0.2, T.guardar + 0.5));
    TABLET.updateMatrixWorld(true);
    manoA(gustavo, p, TABLET.localToWorld(V3(-0.05, 0.12, 0.06)), kT, "D"); if (kT > 0.5) p.dedoD = 1;
    p.t = t; bocaVoz(p, t, T.g3c, ENV.g3, 0.6); return p;
  }
  if (t < T.q3) {
    // Q2: lo mismo que P2, pero el cucurucho es de papel en blanco (arranca un pedazo del rollo)
    const atras = Math.PI - 0.25;
    const p = poseEn(t, [
      [0, { ...base, giro: -0.1, ...aC(-0.15, 0.05), ...MEDIA }],
      [T.cajon8b, { giro: atras, ...aC(0.0, 0.1), ...CARA.concentrada }, 0.3],
      [T.cajon8b + 0.55, { giro: -0.1, ...aC(-0.35, 0.3) }, 0.3],
      [T.daB, { giro: -0.1, ...aC(-0.3, 0.05), ...AMABLE }, 0.2],
    ]);
    const kC = sg(t, T.cajon8b - 0.05, T.cajon8b + 0.15) * (1 - sg(t, T.cajon8b + 0.35, T.cajon8b + 0.5));
    if (kC > 0) manoA(gustavo, p, CAJ8_P.clone().add(V3(0, 0.04, 0.12)), kC, "D");
    const kA = sg(t, T.cajon8b + 0.5, T.cajon8b + 0.75) * (1 - sg(t, T.insCucB[0] - 0.1, T.insCucB[0]));
    manoA(gustavo, p, BORDE_ROLLO().add(V3(0.1, 0.02, -0.04)), kA, "I");
    const kDa = sg(t, T.insCucB[1], T.daB);
    manoA(gustavo, p, manoTito().add(V3(-0.02, 0.04, -0.06)), kDa * (1 - sg(t, T.daB + 0.1, T.daB + 0.35)), "I");
    p.t = t; return p;
  }
  if (t < T.q5) {
    // Q3: martes, carga el remito en la tablet
    const p = poseEn(t, [[0, { ...base, giro: 0.3, ...aC(0.35, 0.35), ...MEDIA }], [T.aviso, { ...aC(0.3, 0.2), ...AMABLE }, 0.3]]);
    const kB = sg(t, T.q3, T.q3 + 0.3);
    manoA(gustavo, p, blisterMano(t), kB, "I");
    TABLET.updateMatrixWorld(true); manoA(gustavo, p, TABLET.localToWorld(V3(-0.04, 0.1, 0.06)), sg(t, T.q3 + 0.1, T.q3 + 0.4), "D"); p.dedoD = 1;
    p.t = t; return p;
  }
  if (t < T.c) {
    // Q5: miércoles; el cajón ordenado, le da la suya sin buscar; "Dejame tu número."; "Ya lo tenés." → se ríe
    const p = poseEn(t, [
      [0, { ...base, giro: 0.12, ...aC(0.2, 0.2), ...AMABLE }],
      [T.daBolsa + 0.3, { ...aC(0.2, 0.0), ...AMABLE }, 0.3],
      [T.g3d, { ...aC(0.2, 0.05), ...CARA.neutra }, 0.2],
      [T.s11 + LEN.s11 * 0.6, { ...aC(0.35, 0.1, 0.1), ...CARA.feliz, ojos: { abiertos: 0.6, feliz: 0.7 } }, 0.3],
    ]);
    const kc = sg(t, T.q5, T.q5 + 0.1) * (1 - sg(t, T.daBolsa - 0.3, T.daBolsa - 0.1));
    if (kc > 0) { const c = poseCajon(t).p; manoA(gustavo, p, c.clone().add(V3(-0.3, 0.12, -0.15)), kc, "D"); manoA(gustavo, p, c.clone().add(V3(0.3, 0.12, -0.15)), kc, "I"); }
    const kb = sg(t, T.daBolsa - 0.3, T.daBolsa) * (1 - sg(t, T.daBolsa + 0.25, T.daBolsa + 0.45));
    manoA(gustavo, p, bolsaSusanaQ5(t), kb, "D");
    p.t = t; bocaVoz(p, t, T.g3d, ENV.g3, 0.6);
    const ri = sg(t, T.s11 + LEN.s11 * 0.6, T.s11 + LEN.s11 * 0.6 + 0.2) * (1 - sg(t, T.c - 0.1, T.c));
    if (ri > 0) p.boca.abierta = Math.max(p.boca.abierta, ri * (0.35 + 0.15 * Math.abs(Math.sin(t * 18))));
    return p;
  }
  // C: a cámara, de colega
  const p = poseEn(t, [[0, { ...base, giro: 0.05, ...aC(0.02, 0.02, 0.04), ...MEDIA, ...BRAZOS.apoyado }], [T.g12 + 0.6, { ...aC(0.05, 0.0, 0.0), ...AMABLE }, 0.4]]);
  p.ojos.x = 0.05; p.ojos.y = 0.05;
  p.t = t; bocaVoz(p, t, T.g12, ENV.g12, 0.6); return p;
}
function puntaMundo(t) { PAPEL.updateMatrixWorld(true); const n = sg(t, T.escribe[0], T.escribe[1]) * N_PAP; return PAPEL.localToWorld(puntaLocal(n)).add(V3(0, 0.004, 0)); }
// dónde está el blíster (P3/Q3): sale de la caja del proveedor, sube a la altura de la cara, baja al cajón
function blisterMano(t) {
  const p2 = t >= P2, t0 = p2 ? T.q3 : T.p3;
  const a = PT.prov.clone().add(V3(0, 0.26, 0)), b = V3(-0.72, 1.22, -0.2);
  const u = eio(sg(t, t0, t0 + 0.45));
  const p = a.clone().lerp(b, u);
  if (!p2 && t >= T.mete - 0.25) { const c = poseCajon(t).p; const d = c.clone().add(BLIS_CAJON).add(V3(0, 0.05, 0)); p.lerp(d, eio(sg(t, T.mete - 0.25, T.mete))); }
  return p;
}
function bolsaSusanaQ5(t) {
  const c = poseCajon(t).p.clone().add(V3(-0.2, 0.12, 0.1));
  const dest = V3(-0.95, 1.18, 0.38);
  return c.lerp(dest, eio(sg(t, T.daBolsa, T.daBolsa + 0.35)));
}
// la mano de Tito (para darle el cucurucho)
const manoTito = () => manoMundo(tito, "D", new THREE.Vector3());
function poseSusana(t) {
  const p2 = t >= P2;
  const base = { x: SUS0.x, z: SUS0.z, giro: Math.PI - 0.2, ...aC(0, 0.0), ...CARA.esperanza, ...BRAZOS.costado };
  if (!p2) {
    if (t < T.p1b + 0.2) {
      // P1: levanta la bolsita con el cartucho (mano derecha) mientras habla; la suelta cuando Gustavo la agarra
      const p = poseEn(t, [[0, { ...base, ...aC(0.0, 0.05), manoD: [-0.32, 0.72, 0.4], codoD: [-1, -0.5, -0.2] }], [T.agarra + 0.1, { ...BRAZOS.costado, ...aC(0.05, 0.12), ...CARA.sonrisa }, 0.35]]);
      p.t = t; bocaVoz(p, t, T.s1, ENV.s1, 0.55); return p;
    }
    if (t < T.p4) { const p = poseEn(t, [[0, { ...base, x: 12, z: 6 }]]); p.t = t; return p; }   // no está
    // P4 · P5: "¿llegó lo mío?" esperanzada; "Ya lo compré." amable; levanta la bolsita del flotador: "¿Me encargás este?"
    const p = poseEn(t, [
      [0, { ...base, ...aC(0.0, 0.05), ...CARA.esperanza }],
      [T.g6 + 0.2, { ...aC(0.05, 0.15), ...CARA.neutra, ojos: { abiertos: 0.9 } }, 0.3],
      [T.s7, { ...aC(0.08, 0.05), ...CARA.sonrisa, ojos: { abiertos: 0.9, feliz: 0.3 }, cejas: { alto: 0.1, ang: 0 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 } }, 0.25],
      [T.levanta, { manoD: [-0.16, 0.42, 0.42], codoD: [-0.8, -0.7, -0.1], ...aC(0.0, 0.0), ...CARA.sonrisa }, 0.3],
    ]);
    p.t = t; bocaVoz(p, t, T.s5, ENV.s5, 0.55); bocaVoz(p, t, T.s7, ENV.s7, 0.55); bocaVoz(p, t, T.s8, ENV.s8, 0.55); return p;
  }
  if (t < T.q2 + 0.2) {
    const p = poseEn(t, [[0, { ...base, ...aC(0.0, 0.05), manoD: [-0.32, 0.72, 0.4], codoD: [-1, -0.5, -0.2] }], [T.agarraB + 0.1, { ...BRAZOS.costado, ...aC(0.05, 0.12), ...CARA.sonrisa }, 0.35], [T.q1c, { ...BRAZOS.celular, ...aC(0.0, 0.35), ...AMABLE }, 0.3]]);
    p.t = t; bocaVoz(p, t, T.s1b, ENV.s1, 0.55); return p;
  }
  if (t >= T.k && t < T.q4) {
    // la cocina: de 3/4 junto a la pileta, con el celular; "¡Llegó lo mío!"
    const p = poseEn(t, [[0, { x: KX - 0.62, z: 0.52, giro: 2.29, ...aC(-0.1, 0.35), ...CARA.neutra, ...BRAZOS.celular }], [T.noti + 0.2, { ...aC(-0.05, 0.3), ...CARA.esperanza, boca: { sonrisa: 0.6, abierta: 0, ancho: 1 } }, 0.25], [T.s10 - 0.05, { ...aC(0.15, 0.08), ...CARA.feliz, ojos: { abiertos: 0.9, feliz: 0.6 }, cejas: { alto: 0.5, ang: 0.1 }, boca: { sonrisa: 1, abierta: 0, ancho: 1.2 } }, 0.25]]);
    p.t = t; bocaVoz(p, t, T.s10, ENV.s10, 0.4); return p;
  }
  if (t >= T.q5 && t < T.c) {
    const p = poseEn(t, [
      [0, { ...base, ...aC(0.0, 0.1), ...AMABLE }],
      [T.daBolsa + 0.35, { manoI: [0.16, 0.36, 0.4], codoI: [0.8, -0.7, -0.1] }, 0.3],
      [T.levantaQ, { manoD: [-0.16, 0.42, 0.42], codoD: [-0.8, -0.7, -0.1], ...CARA.sonrisa }, 0.3],
      [T.s11 - 0.15, { manoD: [-0.12, 0.3, 0.5], codoD: [-0.8, -0.6, 0], dedoD: 1, ...PICARA, ...aC(0.25, 0.05, 0.12) }, 0.25],
    ]);
    const kb = sg(t, T.daBolsa + 0.1, T.daBolsa + 0.35);
    if (kb > 0) manoA(susana, p, bolsaSusanaQ5(t), kb, "I");
    if (t >= T.s11 - 0.15) { TABLET.updateMatrixWorld(true); manoA(susana, p, TABLET.localToWorld(V3(0.0, 0.16, 0.22)), sg(t, T.s11 - 0.35, T.s11 - 0.1), "D"); p.dedoD = 1; }
    p.t = t; bocaVoz(p, t, T.s8b, ENV.s8, 0.55); bocaVoz(p, t, T.s11, ENV.s11, 0.55); return p;
  }
  const p = poseEn(t, [[0, { ...base, x: 12, z: 6 }]]); p.t = t; return p;
}
function poseTito(t) {
  const p2 = t >= P2;
  const t0 = p2 ? T.q2 : T.p2, t1 = p2 ? T.t4b : T.t4, se = p2 ? T.daB + 0.25 : T.da + 0.25, fin = p2 ? T.q3 : T.p3;
  if (t >= t0 && t < fin) {
    const p = poseEn(t, [[0, { x: TITO0.x, z: TITO0.z, giro: TITO0.giro, inclina: 0.28, ...aC(0.0, -0.25), ...AMABLE, ...BRAZOS.apoyado, manoI: [0.24, 0.3, 0.34], manoD: [-0.24, 0.3, 0.34] }], [se, { inclina: 0.05, giro: 0.9, ...aC(-0.3, 0.0), ...CARA.sonrisa }, 0.3]]);
    const apoya = 1 - sg(t, se - 0.4, se - 0.2);
    manoA(tito, p, enTito(0.2, MOS.alto + 0.04, 0.42), apoya, "I"); manoA(tito, p, enTito(-0.2, MOS.alto + 0.04, 0.42), apoya, "D");
    const recibe = sg(t, se - 0.45, se - 0.25);
    if (recibe > 0) { tito.poner(p); manoA(tito, p, enTito(-0.1, MOS.alto + 0.2, 0.42), recibe, "D"); }
    const u = sg(t, se, se + 0.5); p.x = lerp(TITO0.x, TITO0.x + 0.5, eio(u)); p.z = lerp(TITO0.z, TITO0.z + 0.6, eio(u)); if (u > 0 && u < 1) p.paso = 1;
    p.t = t; bocaVoz(p, t, t1, ENV.t4, 0.6); return p;
  }
  const p = poseEn(t, [[0, { x: 13, z: 6, giro: Math.PI - 0.2, ...aC(0.1, 0.05), ...CARA.neutra, ...BRAZOS.costado }]]); p.t = t; return p;
}
function poseAlb(i, t) {
  const [x, z] = [[-0.95, 3.0], [-2.1, 2.6]][i];
  const p = poseEn(t, [[0, { x, z, giro: Math.PI - 0.3 + i * 0.2, ...aC(0.1, 0.05), ...CARA.neutra, ...BRAZOS.costado }]]); p.t = t; return p;
}

// =====================================================================================================
// RENDER
// =====================================================================================================
const _a = new THREE.Vector3(), _q = new THREE.Quaternion();
const enManoDe = (obj, per, lado, off = V3(0, 0, 0), rot = null) => { const m = manoMundo(per, lado, _a); obj.position.copy(m).add(off); if (rot) obj.rotation.set(...rot); };
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  ponerSol(pa === "Q3k" || pa === "Q3s" ? KX : -0.8, 0);
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  // ---- personajes ----
  gustavo.poner(poseGustavo(t));
  susana.poner(poseSusana(t));
  tito.poner(poseTito(t));
  ALB.forEach((a, i) => a.poner(poseAlb(i, t)));
  for (const a of ALB) a.raiz.visible = ["P5", "P2", "P2i", "Q2", "Q2i"].includes(pa);
  if (pa === "P5") ALB[1].raiz.visible = false;
  gustavo.raiz.visible = !(pa === "Q3k" || pa === "Q3s");
  tito.raiz.visible = !(pa === "P2i" || pa === "Q2i");
  // ---- el lápiz: en la oreja o en la mano (P1b) ----
  const escribiendo = !p2 && t >= T.escribe[0] - 0.15 && t < T.escribe[1] + 0.1;
  LAPIZ_OREJA.visible = !escribiendo; LAPIZ.visible = escribiendo;
  if (escribiendo) { const m = manoMundo(gustavo, "D", new THREE.Vector3()), pt = t < T.escribe[0] ? m.clone().add(V3(0.05, -0.08, 0.06)) : puntaMundo(t); const d = pt.clone().sub(m).normalize(); LAPIZ.position.copy(pt).addScaledVector(d, -0.12); LAPIZ.quaternion.setFromUnitVectors(V3(0, 1, 0), d); }
  // ---- la bolsita de Susana con el cartucho (P1, Q1): en su mano; después en el mostrador ----
  const enP1 = (!p2 && t < T.p2) || (p2 && t >= P2 && t < T.q2);
  BOLSA_S.visible = enP1;
  const tA = p2 ? T.agarraB : T.agarra;
  if (enP1) { if (t < tA) { enManoDe(BOLSA_S, susana, "D", V3(0.01, 0.03, 0.04)); BOLSA_S.rotation.set(0, 0.3, -0.1); } else { BOLSA_S.position.set(-0.62, Y + 0.002, 0.16); BOLSA_S.rotation.set(-Math.PI / 2 + 0.05, 0, 0.6); } }
  // el cartucho viejo medido (sale de la bolsita) y el calibre
  const midiendo = (!p2 && t >= T.agarra && t < T.p1b) || (p2 && t >= T.agarraB && t < T.toca - 0.2);
  CART_M.visible = midiendo; CALIBRE.visible = midiendo;
  if (midiendo) {
    const t0 = p2 ? T.agarraB : T.agarra;
    CALIBRE.position.copy(PT.mide); CALIBRE.rotation.set(0, 0, 0);
    CART_M.position.copy(PT.mide).add(V3(0.006, -0.154, 0.0)); CART_M.rotation.set(0, 0.3, 0);
    ponerCalibre(lerp(0.105, 0.0705, eio(sg(t, t0 + 0.15, t0 + 0.45))));
  }
  // ---- el papel: arrancado, escrito, pegado en la caja (P1b–P2), despegado, cucurucho (P2), en la mano de Tito ----
  const vPap = !p2 && t >= T.arranca && t < T.p3 + 0.01;
  PAPEL.visible = vPap; CINTA.visible = !p2 ? t >= T.pega - 0.05 : false;
  escribirPapel(sg(t, T.escribe[0], T.escribe[1]) * N_PAP);
  if (vPap) {
    const caja0 = PAPEL_EN_CAJA();
    if (t < T.escribe[0]) { const a = BORDE_ROLLO(), b = PT.escribe.clone(); const u = eio(sg(t, T.arranca + 0.1, T.escribe[0] - 0.05)); PAPEL.position.copy(a.lerp(b, u)); PAPEL.rotation.set(-Math.PI / 2 * u - 0.2 * (1 - u), Math.PI, 0); PAPEL.userData.enrollar(0); }
    else if (t < T.escribe[1]) { PAPEL.position.copy(PT.escribe); PAPEL.rotation.set(-Math.PI / 2, 0, Math.PI); PAPEL.rotation.set(-Math.PI / 2, 0, 0); PAPEL.rotateZ(Math.PI); PAPEL.userData.enrollar(0); }
    else if (t < T.despega) { const u = eio(sg(t, T.escribe[1], T.pega)); const a = PT.escribe.clone().add(V3(0, 0.002, 0)), b = caja0.p.clone().add(V3(0, -0.005, 0)); PAPEL.position.copy(a.lerp(b, u)); PAPEL.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, Math.PI)).slerp(caja0.q, u)); PAPEL.userData.enrollar(0); }
    else if (t < T.insCuc[0]) { const u = eio(sg(t, T.despega, T.insCuc[0] - 0.02)); const b = PT.cuc.clone().add(V3(0, PAP.H / 2 + 0.004, 0)); PAPEL.position.copy(caja0.p.clone().lerp(b, u)); PAPEL.quaternion.copy(caja0.q.clone().slerp(new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.35, 0.25, 0)), u)); PAPEL.userData.enrollar(0); }
    else if (t < T.insCuc[1]) { PAPEL.position.copy(PT.cuc).add(V3(0, PAP.H / 2 + 0.004, 0)); PAPEL.rotation.set(-0.35, 0.25, 0); PAPEL.userData.enrollar(sg(t, T.insCuc[0] + 0.02, T.insCuc[1] - 0.05)); }
    else { const u = sg(t, T.insCuc[1], T.da); const a = PT.cuc.clone().add(V3(0, PAP.H / 2 + 0.004, 0)); const m = manoMundo(gustavo, "I", new THREE.Vector3()).add(V3(0, 0.06, 0.04)); if (t > T.da) m.copy(manoMundo(tito, "D", new THREE.Vector3()).add(V3(0, 0.06, 0.04))); PAPEL.position.copy(t > T.da ? m : a.lerp(m, eio(u))); PAPEL.rotation.set(-0.1, 0.4, 0.15); PAPEL.userData.enrollar(1); }
  }
  { const caja0 = PAPEL_EN_CAJA(); CINTA.position.copy(caja0.p).add(V3(0, PAP.H / 2 - 0.006, 0)); CINTA.quaternion.copy(caja0.q); CINTA.translateZ(0.0025); RESTO.position.copy(caja0.p).add(V3(0, PAP.H / 2 - 0.004, 0)); RESTO.quaternion.copy(caja0.q); RESTO.translateZ(0.0012); RESTO.visible = !p2 && t >= T.despega + 0.05; }
  // el cucurucho en blanco (Q2) y el pedazo que arranca de reflejo (P5) / en Q5
  PAPEL2.visible = p2 && t >= T.insCucB[0] - 0.4 && t < T.q3;
  if (PAPEL2.visible) {
    if (t < T.insCucB[0]) { const m = manoMundo(gustavo, "I", new THREE.Vector3()); PAPEL2.position.copy(m).add(V3(0, 0.05, 0.03)); PAPEL2.rotation.set(-0.4, 0.3, 0); PAPEL2.userData.enrollar(0); }
    else if (t < T.insCucB[1]) { PAPEL2.position.copy(PT.cuc).add(V3(0, PAP.H / 2 + 0.004, 0)); PAPEL2.rotation.set(-0.35, 0.25, 0); PAPEL2.userData.enrollar(sg(t, T.insCucB[0] + 0.02, T.insCucB[1] - 0.05)); }
    else { const u = sg(t, T.insCucB[1], T.daB); const a = PT.cuc.clone().add(V3(0, PAP.H / 2 + 0.004, 0)); const m = manoMundo(gustavo, "I", new THREE.Vector3()).add(V3(0, 0.06, 0.04)); if (t > T.daB) m.copy(manoMundo(tito, "D", new THREE.Vector3()).add(V3(0, 0.06, 0.04))); PAPEL2.position.copy(t > T.daB ? m : a.lerp(m, eio(u))); PAPEL2.rotation.set(-0.1, 0.4, 0.15); PAPEL2.userData.enrollar(1); }
  }
  PAPEL3.visible = !p2 && t >= T.arranca2;
  if (PAPEL3.visible) { const a = BORDE_ROLLO(), b = PT.escribe.clone(); const u = eio(sg(t, T.arranca2 + 0.1, T.arranca2 + 0.5)); PAPEL3.position.copy(a.lerp(b, u)); PAPEL3.rotation.set(-Math.PI / 2 * u - 0.2 * (1 - u), Math.PI, 0); PAPEL3.userData.enrollar(0); }
  // ---- los tornillos: del cajoncito a la mano, al cucurucho ----
  const tT = p2 ? T.cajon8b : T.cajon8, tI = p2 ? T.insCucB : T.insCuc, tDa = p2 ? T.daB : T.da;
  TORN.visible = (t >= tT + 0.2 && t < (p2 ? T.q3 : T.p3)) && (!p2 || t >= T.q2);
  if (TORN.visible) {
    if (t < tI[0]) { enManoDe(TORN, gustavo, "D", V3(0, -0.02, 0.03)); TORN.scale.setScalar(1); }
    else { const cuc = (p2 ? PAPEL2 : PAPEL); const u = sg(t, tI[0] + 0.1, tI[1] - 0.05); const a = PT.cuc.clone().add(V3(0.02, 0.24, 0.02)), b = cuc.position.clone().add(V3(0, 0.03, 0)); TORN.position.copy(t < tI[1] ? a.lerp(b, ei(u)) : b); TORN.scale.setScalar(t > tDa + 0.05 ? 0.001 : 1); }
  }
  // el cajoncito "8" sale y vuelve
  const kC8 = Math.max(sg(t, T.cajon8 - 0.15, T.cajon8 + 0.1) * (1 - sg(t, T.cajon8 + 0.45, T.cajon8 + 0.65)), p2 ? sg(t, T.cajon8b - 0.15, T.cajon8b + 0.1) * (1 - sg(t, T.cajon8b + 0.45, T.cajon8b + 0.65)) : 0);
  CAJ8.position.copy(CAJ8_P).add(V3(0, 0, 0.002 + 0.16 * eio(kC8)));
  // ---- la caja del proveedor y el blíster (P3, Q3) ----
  const martes = (!p2 && t >= T.p3 && t < T.p4) || (p2 && t >= T.q3 && t < T.q4);
  PROV.visible = martes; PROV.position.copy(PT.prov); PROV.rotation.y = 0.25;
  BLISTER.visible = martes && !(!p2 && t >= T.mete);
  if (BLISTER.visible) { BLISTER.position.copy(blisterMano(t)).add(V3(0, -0.07, 0.02)); BLISTER.rotation.set(-0.15, 0.25, 0); }
  // ---- el cajón ENCARGOS ----
  const cj = poseCajon(t);
  CAJON.visible = cj.vis && pa !== "C"; CAJON.position.copy(cj.p); CAJON.rotation.set(cj.rx, 0, 0);
  REV.visible = !p2; ORD.visible = p2;
  const blisDentro = !p2 && t >= T.mete;
  if (blisDentro) { BLIS_EN_CAJON.visible = true; } else BLIS_EN_CAJON.visible = false;
  BOLSAS_ORD[0].visible = !(p2 && t >= T.daBolsa);
  BOLSA_SUSANA.visible = p2 && t >= T.daBolsa && t < T.c;
  if (BOLSA_SUSANA.visible) { const pos = t < T.daBolsa + 0.4 ? bolsaSusanaQ5(t) : manoMundo(susana, "I", new THREE.Vector3()).add(V3(0, -0.12, 0.02)); BOLSA_SUSANA.position.copy(pos); BOLSA_SUSANA.rotation.set(0, 0.3, 0); }
  // la bolsita del flotador (P5 y Q5) en la mano de Susana
  const flot = (!p2 && t >= T.levanta - 0.3 && t < P1) || (p2 && t >= T.levantaQ - 0.3 && t < T.c);
  BOLSA_F.visible = flot;
  if (flot) { enManoDe(BOLSA_F, susana, "D", V3(0, -0.21, 0.02)); BOLSA_F.rotation.set(0, 0.3, 0.1); }
  // ---- la tablet (no existe en la parte 1) ----
  TABLET.visible = p2 && !(pa === "Q3k" || pa === "Q3s"); if (TABLET.visible) ponerTablet3D(t);
  // ---- la gota de la canilla (cada 0,6 s) ----
  const fase = ((t - T.k) / 0.6) % 1; GOTA.visible = (pa === "Q3k" || pa === "Q3s") && t >= T.k;
  if (GOTA.visible) { const f = fase < 0 ? fase + 1 : fase; GOTA.position.copy(CANILLA_PICO).add(V3(0, -0.012 - (f < 0.35 ? 0 : ei((f - 0.35) / 0.65) * 0.18), 0)); GOTA.scale.set(1, 1.4, 1).multiplyScalar(f < 0.35 ? 0.5 + f / 0.35 * 0.5 : 1); }
  // el celular de Susana en la cocina (3D, en su mano izquierda)
  CELU_K.visible = GOTA.visible; if (CELU_K.visible) { enManoDe(CELU_K, susana, "I", V3(-0.02, 0.05, 0.03)); CELU_K.rotation.set(-0.5, -0.55, 0); }
  // ---- insertos ----
  const INS = { Q1t: INS_T, Q3t: INS_T, Q4: INS_T, Q1c: INS_C, Q3c: INS_K }[pa];
  for (const I of [INS_T, INS_C, INS_K]) I.g.visible = I === INS;
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
    const chipEn = (g, ti, y = 370) => ponerGlobo(g, 60 + g.userData.W / 2, y, ent(ti), null, 1);
    if (pa === "P1" || pa === "P1i") {
      if (pa === "P1") chipEn(GL.sab, 0, T.p1b > t ? 372 : 170);
      const [sx, sy] = boca(susana);
      if (t < T.g2 - 0.05 && pa === "P1") ponerGlobo(GL.s1, 440, 600, ent(Math.min(t, T.s1)), [sx, sy], 1);
      if (t >= T.g2) { const [bx, by] = boca(gustavo); ponerGlobo(GL.g2, 600, 560, ent(T.g2), [bx, by - 30], 2); }
    }
    if (pa === "P1b" && t >= T.g3) ponerGlobo(GL.g3, 560, 300, ent(T.g3), null);
    if (pa === "P2" || pa === "P2i") {
      if (t >= T.t4 && t < T.da + 0.2) { const [bx, by] = boca(tito); ponerGlobo(GL.t4, 360, 380, ent(T.t4), pa === "P2" ? [bx, by - 30] : null); }
    }
    if (pa === "P3") {
      chipEn(GL.mar, T.p3);
      if (t >= T.preg && t < T.abre + 0.2) { const [bx, by] = boca(gustavo); ponerGlobo(GL.preg, bx - 300, by - 330, ent(T.preg), [bx - 60, by - 120], 1); }
      if (t >= T.rot1) { const [ax, ay] = objPx(CAJON, V3(0, 0.08, 0)); ponerGlobo(GL.rCosto, 540, 1560, ent(T.rot1), null, 1); ponerGuia(GUIAS[0], 540, 1490, ax, ay, eo(sg(t, T.rot1, T.rot1 + 0.25))); }
    }
    if (pa === "P4") {
      chipEn(GL.tres, T.p4);
      if (t >= T.s5 && t < T.g6) { const [sx, sy] = boca(susana); ponerGlobo(GL.s5, 600, 560, ent(T.s5), [sx, sy], 1); }
      if (t >= T.g6) { const [bx, by] = boca(gustavo); ponerGlobo(GL.g6, 640, Math.min(420, by - 260), ent(T.g6), [bx, by - 40], 2); }
    }
    if (pa === "P5") {
      const [sx, sy] = boca(susana);
      if (t >= T.s7 && t < T.s8) ponerGlobo(GL.s7, 540, 330, ent(T.s7), [sx, sy - 30], 1);
      if (t >= T.s8) ponerGlobo(GL.s8, 540, 330, ent(T.s8), [sx, sy - 30], 1);
      if (t >= T.rot2) ponerGlobo(GL.rOtro, 540, 1640, ent(T.rot2), null, 2);
    }
    if (pa === "P5b" && t >= T.g3b) ponerGlobo(GL.g3, 560, 300, ent(T.g3b), null);
    // ---- parte 2 ----
    if (pa === "Q1") {
      chipEn(GL.sab, P2, 372);
      const [sx, sy] = boca(susana);
      if (t >= T.s1b) ponerGlobo(GL.s1, 560, 640, ent(T.s1b), [sx, sy], 1);
    }
    if (pa === "Q1t") { if (t >= T.g3c) ponerGlobo(GL.g3, 560, 300, ent(T.g3c), null); ponerGlobo(GL.rQ1, 540, 1650, ent(T.q1t + 0.3), null, 1); }
    if (pa === "Q1c") ponerGlobo(GL.rQ1, 540, 180, 1, null, 1);
    if (pa === "Q2" || pa === "Q2i") { if (t >= T.t4b && t < T.daB + 0.2) { const [bx, by] = boca(tito); ponerGlobo(GL.t4, 360, 380, ent(T.t4b), pa === "Q2" ? [bx, by - 30] : null); } }
    if (pa === "Q3") chipEn(GL.mar, T.q3);
    if (pa === "Q3t") ponerGlobo(GL.rQ3, 540, 1650, ent(T.q3t + 0.4), null, 1);
    if (pa === "Q3s" && t >= T.s10) { const [sx, sy] = boca(susana); ponerGlobo(GL.s10, 600, 620, ent(T.s10), [sx, sy], 1); }
    if (pa === "Q4") ponerGlobo(GL.rQ4, 540, 1650, ent(T.q4 + 0.6), null, 1);
    if (pa === "Q5") {
      chipEn(GL.mie, T.q5);
      const [tx, ty] = objPx(TABLET, V3(0, 0.15, 0));
      if (t >= T.retirado && t < T.nuevo) { ponerGlobo(GL.rRet, 820, 1540, ent(T.retirado), null, 1); ponerGuia(GUIAS[0], 820, 1490, tx, ty, eo(sg(t, T.retirado, T.retirado + 0.2))); }
      if (t >= T.daBolsa && t < T.levantaQ) { const [bx, by] = objPx(BOLSA_SUSANA, V3(0, 0.1, 0)); ponerGlobo(GL.rSus, 420, 1700, ent(T.daBolsa), null, 1); ponerGuia(GUIAS[1], 420, 1650, bx, by, eo(sg(t, T.daBolsa, T.daBolsa + 0.2))); }
      const [sx, sy] = boca(susana), [gx, gy] = boca(gustavo);
      if (t >= T.s8b && t < T.g3d) ponerGlobo(GL.s8, 560, 640, ent(T.s8b), [sx, sy], 1);
      if (t >= T.g3d && t < T.s11) ponerGlobo(GL.g3, 600, 520, ent(T.g3d), [gx, gy - 30], 2);
      if (t >= T.s11) ponerGlobo(GL.s11, 560, 640, ent(T.s11), [sx, sy], 1);
      if (t >= T.nuevo) { ponerGlobo(GL.rNuevo, 600, 1580, ent(T.nuevo), null, 1); ponerGuia(GUIAS[0], 600, 1500, tx, ty, eo(sg(t, T.nuevo, T.nuevo + 0.2))); }
    }
  }
  renderer.render(scene, camera);
}
// el blíster que queda adentro del cajón (P3 en adelante, parte 1)
const BLIS_EN_CAJON = crearBlister(); BLIS_EN_CAJON.position.copy(BLIS_CAJON); BLIS_EN_CAJON.rotation.set(-Math.PI / 2 + 0.1, 0, 0.4); CAJON.add(BLIS_EN_CAJON);
// el celular de Susana en la cocina (3D)
const celKT = lienzo(300, 600, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 80); x.fillStyle = "#ffffff"; x.strokeStyle = "#3fa60a"; x.lineWidth = 6; x.beginPath(); x.roundRect(14, 300, w - 28, 180, 18); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(800, 30); x.fillText("Susana, llegó", 30, 350); x.fillText("tu cartucho ✓", 30, 400); });
const CELU_K = new THREE.Group(); scene.add(CELU_K);
{ CELU_K.add(caja(0.08 * 1.3, 0.165 * 1.3, 0.012, mat(0x1f3254, 0.5), 0, 0, 0, 0.012)); const p = plano(0.074 * 1.3, 0.155 * 1.3, celKT, 0, 0, 0.0065, true); CELU_K.add(p); sombras(CELU_K); }

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, gustavo: bocaPx(gustavo), susana: bocaPx(susana), tito: bocaPx(tito) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
