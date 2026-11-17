// Capa 3D de corralon-portland (Three.js r170 local). Base técnica: reels/taller-presupuestos (globos pegados a la cámara
// en píxeles de pantalla, avatares por render target, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom,
// insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// UN lugar: "Materiales Gustavo", un corralón en un galpón de chapa navy, lunes 6:45. Adentro, los tubos prendidos, el
// mostrador de madera con el celular, el pizarrón de precios con tiza y el teléfono de pared; afuera, por el portón, el
// patio de tierra con la pila de 40 bolsas de portland, la arena, el pedregullo, los hierros y el cielo de amanecer navy
// claro con una franja crema en el horizonte. Las fotos del chat (los dos camiones en la vereda de la obra) son una
// escena aparte que se renderiza una vez a un canvas.
//   PARTE 1: el audio de Beto ("¿Tenés portland? Cuarenta bolsas.") · "¡Ya te digo!" · Gustavo cuenta la pila (37, 38,
//            39, ¡40!) mientras el celular se llena (20 → 27) · "Beto espera. Es de la casa." · "Ya está, Gustavo. Me
//            contestó otro." + la foto del camión gris · la pausa con el costo · "Era de la casa." · Tito: "¿Me das una
//            bolsita de portland?"
//   PARTE 2: el mismo audio y el agente contesta antes de que termine · "¡Ya te digo!" · "Ya le dijo." · los 27 chats
//            contestados · Tito / "Las que quieras, Tito." · el panel ($ 48.900) · "Ya las están bajando." + la foto del
//            camión navy de Materiales Gustavo · "Es de la casa." · Sofi: "Comentá OBRA…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet, saludo } from "./personajes.js";
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
scene.background = new THREE.Color(0x16243d);   // el cielo de amanecer por el portón: navy claro liso, sin degradé
const camera = new THREE.PerspectiveCamera(46, 1080 / 1920, 0.03, 200);
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

// ---------- luces: los tubos del galpón (cielo + relleno de frente) y el amanecer que entra bajo desde el patio ----------
const sol = new THREE.DirectionalLight(0xfff0d8, 1.45);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 0.5, far: 40 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xf7f4ea, 0x8a8678, 1.7); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xf4f6ff, 0.75); relleno.position.set(1.5, 3.6, 9); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xfff6e6, 0.4); rim.position.set(-4, 5, -10); scene.add(rim);
function ponerSol(cx, cz) { sol.position.set(cx + 7, 6.5, cz - 9); sol.target.position.set(cx, 0.6, cz); sol.target.updateMatrixWorld(); }

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
M.chapa = mat(0x1f3254, 0.5, { metalness: 0.25 }); M.onda = mat(0x2c4268, 0.45, { metalness: 0.25 });
M.kraft = mat(0xe8dcc0, 0.85); M.tierra = mat(0xcfc9b6, 0.95); M.piso = mat(0xd9d7c9, 0.8); M.arena = mat(0xd8c7a0, 0.95, { flatShading: true });
M.pedre = mat(0x8f8c86, 0.9, { flatShading: true }); M.pallet = mat(0xa9845a, 0.85); M.polvo = mat(0xd6d3ca, 0.95);
M.mesada = mat(0xb08a5e, 0.75); M.marco = mat(0x8a6542, 0.8);

// =====================================================================================================
// EL GALPÓN
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const ZF = -1.6, HW = 4.6;                         // la pared del fondo (chapa) y el alto del galpón
const PORTON = { x0: 0.55, x1: 3.15, alto: 3.0 };  // el portón al patio
const MOS = { x0: -2.4, x1: 0.3, alto: 1.0, z0: -0.33, z1: 0.33 };   // el mostrador
const PILA_P = { x: 1.85, z: -4.3 };               // el pallet con las bolsas de portland, en el patio
const TEL = { x: -1.85, y: 1.45, z: ZF + 0.07 };   // el teléfono de pared
const G1 = { x: -1.0, z: -0.8 };                   // Gustavo atrás del mostrador
// chapa acanalada: placa navy con las ondas marcadas con geometría (una costilla cada 16 cm)
function chapa(grupo, w, h, cx, cy, ondas = true) {
  const g = new THREE.Group(); g.position.set(cx, cy, 0); grupo.add(g);
  const b = mesh(new THREE.BoxGeometry(w, h, 0.06), M.chapa, 0, 0, 0); b.castShadow = false; g.add(b);
  if (ondas) for (let x = -w / 2 + 0.08; x < w / 2 - 0.04; x += 0.16) { const o = mesh(new THREE.BoxGeometry(0.055, h, 0.04), M.onda, x, 0, 0.045); o.castShadow = false; g.add(o); }
  return g;
}
const cartelT = lienzo(1400, 270, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "MATERIALES GUSTAVO", 800, 170, w - 90); x.fillText("MATERIALES GUSTAVO", w / 2, h / 2 - 4); x.fillStyle = "#5ce611"; x.fillRect(90, h - 36, w - 180, 16); });
const PRECIOS = [["PORTLAND 25 kg", "$ 520"], ["ARENA GRUESA m³", "$ 2.400"], ["PEDREGULLO m³", "$ 2.900"], ["HIERRO DEL 8", "$ 380"]];
const pizarraT = lienzo(1520, 800, (x, w, h) => {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "rgba(239,238,229,0.07)"; for (const [cx, cy, r] of [[300, 200, 160], [1100, 520, 200], [700, 700, 150]]) { x.beginPath(); x.ellipse(cx, cy, r, r * 0.5, 0.3, 0, 7); x.fill(); }
  x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.textAlign = "center"; x.font = CAV(110); x.fillText("PRECIOS", w / 2, 92);
  x.strokeStyle = "#efeee5"; x.lineWidth = 6; x.beginPath(); x.moveTo(w / 2 - 210, 150); x.lineTo(w / 2 + 210, 152); x.stroke();
  PRECIOS.forEach(([a, b], i) => { const y = 250 + i * 150; x.textAlign = "left"; x.font = CAV(96); x.fillText(a, 60, y); x.textAlign = "right"; x.font = CAV(110); x.fillStyle = "#5ce611"; x.fillText(b, w - 60, y); x.fillStyle = "#efeee5"; });
});
{
  // piso de portland alisado (adentro) y el patio de tierra (afuera)
  const piso = mesh(new THREE.PlaneGeometry(12, 11), M.piso, 0.5, 0, ZF + 5.5); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  const pat = mesh(new THREE.PlaneGeometry(40, 30), M.tierra, 2, -0.004, ZF - 15); pat.rotation.x = -Math.PI / 2; pat.castShadow = false; SET.add(pat);
  // la pared del fondo de chapa (con el hueco del portón), las de los costados y el techo con las cerchas
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
  // los dos tubos fluorescentes colgados (emisivos crema, sin halo)
  const tuboM = new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff4d8, emissiveIntensity: 1.2, roughness: 0.3 });
  for (const z of [0.1, 2.7]) {
    const g = new THREE.Group(); g.position.set(-0.8, 3.45, z); SET.add(g);
    g.add(caja(1.32, 0.06, 0.16, M.navy3, 0, 0.05, 0, 0.01));
    for (const dz of [-0.04, 0.04]) { const tu = mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.24, 12), tuboM, 0, -0.01, dz); tu.rotation.z = Math.PI / 2; tu.castShadow = false; g.add(tu); }
    for (const dx of [-0.55, 0.55]) g.add(mesh(new THREE.CylinderGeometry(0.004, 0.004, HW - 3.5, 4), M.navy, dx, (HW - 3.45) / 2 + 0.05, 0));
  }
  // el cartel "MATERIALES GUSTAVO" (placa crema con borde navy) arriba del pizarrón
  SET.add(caja(2.72, 0.58, 0.05, M.navy, -1.0, 3.5, ZF + 0.07, 0.02));
  SET.add(plano(2.62, 0.5, cartelT, -1.0, 3.5, ZF + 0.1));
  // el pizarrón de precios (marco de madera, tiza)
  SET.add(caja(1.98, 1.1, 0.05, M.marco, -1.05, 2.45, ZF + 0.07, 0.02));
  SET.add(plano(1.86, 0.98, pizarraT, -1.05, 2.45, ZF + 0.1));
  SET.add(caja(1.7, 0.04, 0.08, M.marco, -1.05, 1.88, ZF + 0.12, 0.01));
  SET.add(caja(0.09, 0.025, 0.025, M.cr, -0.6, 1.915, ZF + 0.12, 0.01));   // la tiza en el borde
  // el portón: marco navy3 y la hoja enrollada arriba (caja crema)
  for (const x of [PORTON.x0 - 0.08, PORTON.x1 + 0.08]) SET.add(caja(0.16, PORTON.alto + 0.1, 0.3, M.navy3, x, (PORTON.alto + 0.1) / 2, ZF + 0.04, 0.02));
  SET.add(caja(PORTON.x1 - PORTON.x0 + 0.32, 0.16, 0.3, M.navy3, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto + 0.04, ZF + 0.04, 0.02));
  { const rollo = mesh(new THREE.CylinderGeometry(0.22, 0.22, PORTON.x1 - PORTON.x0 + 0.2, 28), M.cr, (PORTON.x0 + PORTON.x1) / 2, PORTON.alto - 0.16, ZF + 0.38); rollo.rotation.z = Math.PI / 2; SET.add(rollo); }
  // el umbral: la franja verde de seguridad en el piso del portón
  { const f = mesh(new THREE.PlaneGeometry(PORTON.x1 - PORTON.x0, 0.12), new THREE.MeshBasicMaterial({ color: C.g }), (PORTON.x0 + PORTON.x1) / 2, 0.004, ZF + 0.12); f.rotation.x = -Math.PI / 2; f.castShadow = false; SET.add(f); }
}
// ---- el mostrador: mesada de madera gastada, frente de chapa navy3; talonario de remitos y el vaso de biromes ----
{
  const g = new THREE.Group(); SET.add(g);
  const L = MOS.x1 - MOS.x0, cx = (MOS.x0 + MOS.x1) / 2, P = MOS.z1 - MOS.z0;
  g.add(caja(L + 0.08, 0.07, P + 0.08, M.mesada, cx, MOS.alto - 0.035, 0, 0.015));
  const fr = new THREE.Group(); fr.position.z = MOS.z1 - 0.01; g.add(fr); chapa(fr, L - 0.02, MOS.alto - 0.08, cx, (MOS.alto - 0.08) / 2);
  g.add(caja(L - 0.04, MOS.alto - 0.08, P - 0.08, M.navy3, cx, (MOS.alto - 0.08) / 2, -0.02, 0.02));
  g.add(caja(L + 0.02, 0.06, 0.05, M.g, cx, MOS.alto - 0.11, MOS.z1 + 0.035, 0.01));   // el canto verde de marca
  // el talonario de remitos y el vaso con biromes (punta izquierda)
  g.add(caja(0.2, 0.03, 0.28, M.cr, -2.05, MOS.alto + 0.015, 0.02, 0.005)); g.add(caja(0.2, 0.012, 0.06, M.navy3, -2.05, MOS.alto + 0.034, -0.09, 0.004));
  g.add(mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.11, 14), M.navy3, -1.8, MOS.alto + 0.055, -0.08));
  for (const [dx, dz, c] of [[-0.01, 0, M.g], [0.015, 0.01, M.navy], [0, -0.015, M.cr]]) { const b = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.16, 6), c, -1.8 + dx, MOS.alto + 0.12, -0.08 + dz); b.rotation.z = dx * 6; g.add(b); }
}
// ---- el patio: la montaña de arena, la de pedregullo, los hierros en el caballete, dos carretillas, el tacho, el cerco ----
{
  const ar = mesh(new THREE.ConeGeometry(1.35, 1.05, 9), M.arena, 4.35, 0.52, -6.6); ar.rotation.y = 0.4; SET.add(ar);
  const pe = mesh(new THREE.ConeGeometry(1.05, 0.75, 7), M.pedre, 0.05, 0.37, -7.4); pe.rotation.y = 0.2; SET.add(pe);
  // los hierros: dos caballetes navy3 y las barras largas encima
  for (const z of [-2.7, -4.3]) { const cb = new THREE.Group(); cb.position.set(5.1, 0, z); SET.add(cb); for (const s of [-1, 1]) { const p = caja(0.07, 0.95, 0.07, M.navy3, s * 0.22, 0.45, 0, 0.01); p.rotation.z = -s * 0.35; cb.add(p); } cb.add(caja(0.6, 0.06, 0.08, M.navy3, 0, 0.86, 0, 0.01)); }
  for (let i = 0; i < 9; i++) { const b = mesh(new THREE.CylinderGeometry(0.014, 0.014, 3.4, 6), M.navy3, 5.0 + (i - 4) * 0.045, 0.92 + (i % 2) * 0.02, -3.5); b.rotation.x = Math.PI / 2; SET.add(b); }
  // el tacho de 200 L navy
  SET.add(mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.88, 22), M.navy3, 3.7, 0.44, -2.55)); SET.add(mesh(new THREE.TorusGeometry(0.3, 0.015, 6, 22).rotateX(Math.PI / 2), M.navy, 3.7, 0.3, -2.55)); SET.add(mesh(new THREE.TorusGeometry(0.3, 0.015, 6, 22).rotateX(Math.PI / 2), M.navy, 3.7, 0.6, -2.55));
  // el cerco del fondo del patio (muro bajo de bloques gris claro)
  SET.add(caja(40, 1.25, 0.25, M.cr3, 2, 0.62, -11.5, 0.02));
  // el cielo: una sola franja crema baja en el horizonte (plana, sin degradé)
  const franja = mesh(new THREE.PlaneGeometry(400, 3.2), new THREE.MeshBasicMaterial({ color: 0xefeee5, fog: false }), 0, 1.7, -90); franja.castShadow = false; franja.receiveShadow = false; SET.add(franja);
  const tierraLej = mesh(new THREE.PlaneGeometry(400, 80), new THREE.MeshBasicMaterial({ color: 0xbfb9a6 }), 0, -0.02, -60); tierraLej.rotation.x = -Math.PI / 2; tierraLej.castShadow = false; SET.add(tierraLej);
}
// una carretilla (batea gris, rueda negra, manijas de madera); origen en el piso, mira a +z (la rueda adelante)
function crearCarretilla() {
  const g = new THREE.Group();
  const bat = new THREE.Group(); bat.position.set(0, 0.42, -0.05); bat.rotation.x = 0.12; g.add(bat);
  bat.add(caja(0.56, 0.04, 0.7, M.cr3, 0, 0, 0, 0.02));
  for (const s of [-1, 1]) { const l = caja(0.04, 0.26, 0.72, M.cr3, s * 0.3, 0.12, 0, 0.015); l.rotation.z = s * 0.25; bat.add(l); }
  const fr = caja(0.62, 0.26, 0.04, M.cr3, 0, 0.12, 0.37, 0.015); fr.rotation.x = -0.4; bat.add(fr); bat.add(caja(0.62, 0.26, 0.04, M.cr3, 0, 0.12, -0.37, 0.015));
  const ru = mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.08, 18), M.goma, 0, 0.17, 0.5); ru.rotation.z = Math.PI / 2; g.add(ru);
  for (const s of [-1, 1]) { const m = caja(0.04, 0.04, 1.35, M.madera, s * 0.24, 0.4, -0.25, 0.012); m.rotation.x = 0.22; g.add(m); g.add(caja(0.035, 0.32, 0.035, M.navy3, s * 0.22, 0.16, -0.45, 0.01)); }
  return sombras(g);
}
{ const c1 = crearCarretilla(); c1.position.set(0.25, 0, -3.3); c1.rotation.y = 0.9; SET.add(c1); const c2 = crearCarretilla(); c2.position.set(3.4, 0, -5.0); c2.rotation.y = -2.2; SET.add(c2); }
fusionar(SET);

// =====================================================================================================
// LAS BOLSAS DE PORTLAND: papel kraft crema con una franja navy y "PORTLAND · 25 kg" (genéricas, sin marca)
// =====================================================================================================
const BOL = { w: 0.58, h: 0.135, d: 0.38 };
const bolsaLadoT = lienzo(1160, 270, (x, w, h) => { x.fillStyle = "#e8dcc0"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; x.fillRect(0, h * 0.28, w, h * 0.44); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "PORTLAND · 25 kg", 800, 92, w - 120); x.fillText("PORTLAND · 25 kg", w / 2, h / 2 + 4); });
const bolsaTapaT = lienzo(1160, 760, (x, w, h) => {
  x.fillStyle = "#e8dcc0"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "rgba(160,140,100,0.5)"; x.lineWidth = 8; x.setLineDash([22, 16]); x.strokeRect(40, 40, w - 80, h - 80); x.setLineDash([]);
  x.fillStyle = "#1f3254"; x.fillRect(0, h * 0.34, w, h * 0.32);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "PORTLAND", 900, 190, w - 160); x.fillText("PORTLAND", w / 2, h / 2 + 8);
  x.fillStyle = "#1f3254"; x.font = F(800, 110); x.fillText("25 kg", w / 2, h * 0.84);
});
const MB = { lado: new THREE.MeshStandardMaterial({ map: bolsaLadoT, roughness: 0.85 }), tapa: new THREE.MeshStandardMaterial({ map: bolsaTapaT, roughness: 0.85 }) };
const geoBolsa = rbox(BOL.w, BOL.h, BOL.d, 0.055, 3);
function crearBolsaPortland(mats = MB) { const m = new THREE.Mesh(geoBolsa, [M.kraft, M.kraft, mats.tapa, M.kraft, mats.lado, mats.lado]); m.castShadow = true; m.receiveShadow = true; return m; }
// el pallet y las 40 bolsas trabadas: 6 hileras de 6 (alternando el sentido) y 4 arriba (las que cuenta Gustavo: 37-40)
const PILA = new THREE.Group(); PILA.position.set(PILA_P.x, 0, PILA_P.z); scene.add(PILA);
const BOLSAS = [];
const MTOP = []; // materiales propios de las 4 de arriba (el brillo cuando las toca)
{
  for (const z of [-0.5, 0, 0.5]) PILA.add(caja(1.22, 0.035, 0.12, M.pallet, 0, 0.125, z, 0.008));
  for (const x of [-0.52, 0, 0.52]) PILA.add(caja(0.1, 0.09, 1.16, M.pallet, x, 0.06, 0, 0.008));
  for (const z of [-0.5, 0.5]) PILA.add(caja(1.22, 0.025, 0.12, M.pallet, 0, 0.013, z, 0.008));
  semilla = 21;
  const y0 = 0.142 + BOL.h / 2;
  for (let k = 0; k < 7; k++) {
    const pos = [];
    if (k % 2 === 0) { for (const x of [-0.295, 0.295]) for (const z of [-0.39, 0, 0.39]) pos.push([x, z, 0]); }
    else { for (const x of [-0.39, 0, 0.39]) for (const z of [-0.295, 0.295]) pos.push([x, z, Math.PI / 2]); }
    const usar = k < 6 ? pos : [pos[3], pos[0], pos[4], pos[1]];   // arriba: 4 (la de 40 queda al frente)
    for (const [x, z, ry] of usar) {
      let mats = MB;
      if (k === 6) { mats = { lado: MB.lado.clone(), tapa: MB.tapa.clone() }; MTOP.push(mats); }
      const b = crearBolsaPortland(mats);
      b.position.set(x + (az() - 0.5) * 0.02, y0 + k * BOL.h * 0.97, z + (az() - 0.5) * 0.02); b.rotation.y = ry + (az() - 0.5) * 0.05;
      PILA.add(b); BOLSAS.push(b);
    }
  }
}
// la bolsa que Gustavo le carga a Tito (Q3) y la del inserto del costo
const BOLSA_MANO = crearBolsaPortland(); scene.add(BOLSA_MANO);
// el polvo de portland: copitos chatos gris claro (con semilla) que salen de un punto y se apagan
const POLVO = new THREE.Group(); scene.add(POLVO);
const polvoM = new THREE.MeshStandardMaterial({ color: 0xdedbd2, roughness: 1, transparent: true, opacity: 0.8, depthWrite: false });
{ semilla = 33; for (let i = 0; i < 16; i++) { const p = new THREE.Mesh(new THREE.IcosahedronGeometry(0.035 + az() * 0.035, 0), polvoM); p.userData = { dx: (az() - 0.5) * 2, dy: 0.3 + az() * 0.8, dz: (az() - 0.5) * 2, s: 0.7 + az() * 0.8 }; POLVO.add(p); } }
function ponerPolvo(t, t0, centro) {
  const u = (t - t0) / 0.75; POLVO.visible = u >= 0 && u < 1; if (!POLVO.visible) return;
  POLVO.position.copy(centro); polvoM.opacity = 0.85 * (1 - u);
  for (const p of POLVO.children) { const d = p.userData, e = eo(u); p.position.set(d.dx * 0.35 * e, d.dy * 0.25 * e, d.dz * 0.35 * e); p.scale.setScalar(d.s * (0.6 + u)); }
}

// =====================================================================================================
// EL TELÉFONO DE PARED: aparato crema con teclado navy, el tubo y el cable en espiral (se rehace si se mueve)
// =====================================================================================================
const TELEF = new THREE.Group(); TELEF.position.set(TEL.x, TEL.y, TEL.z); scene.add(TELEF);
{
  TELEF.add(caja(0.2, 0.28, 0.09, M.cr, 0, 0, 0.045, 0.03));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) TELEF.add(caja(0.03, 0.022, 0.012, M.navy, 0.02 + (j - 1) * 0.042, 0.06 - i * 0.036, 0.094, 0.005));
  TELEF.add(caja(0.035, 0.08, 0.04, M.navy3, -0.095, 0.075, 0.07, 0.01));   // la horquilla
  sombras(TELEF);
}
// el tubo: mango con auricular y micrófono; origen en el medio, largo en y
const TUBO = new THREE.Group(); scene.add(TUBO);
{
  TUBO.add(caja(0.045, 0.2, 0.04, M.cr, 0, 0, 0, 0.018));
  for (const s of [-1, 1]) { const c = mesh(new THREE.CylinderGeometry(0.036, 0.03, 0.04, 16), M.cr, 0, s * 0.105, 0.025); c.rotation.x = Math.PI / 2; TUBO.add(c); TUBO.add(mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.005, 14).rotateX(Math.PI / 2), M.navy, 0, s * 0.105, 0.047)); }
  sombras(TUBO);
}
const cableM = mat(0xefeee5, 0.6);
const CABLE = new THREE.Mesh(new THREE.BufferGeometry(), cableM); CABLE.castShadow = true; scene.add(CABLE);
let claveCable = "";
function ponerCable(a, b) {
  const k = `${a.x.toFixed(3)},${a.y.toFixed(3)},${a.z.toFixed(3)},${b.x.toFixed(3)},${b.y.toFixed(3)},${b.z.toFixed(3)}`; if (k === claveCable) return; claveCable = k;
  const L = a.distanceTo(b), caida = Math.max(0.08, 0.55 - L * 0.4);
  const m = a.clone().add(b).multiplyScalar(0.5); m.y -= caida;
  const base = new THREE.QuadraticBezierCurve3(a, m, b);
  const pts = [], N = 120, vueltas = 26, r = 0.014;
  for (let i = 0; i <= N; i++) {
    const u = i / N, p = base.getPoint(u), tg = base.getTangent(u);
    const n1 = new THREE.Vector3(0, 0, 1).cross(tg).normalize(); if (n1.lengthSq() < 0.1) n1.set(1, 0, 0); const n2 = tg.clone().cross(n1).normalize();
    const th = u * vueltas * Math.PI * 2, rr = r * Math.min(1, u * 12, (1 - u) * 12);
    pts.push(p.add(n1.multiplyScalar(Math.cos(th) * rr)).add(n2.multiplyScalar(Math.sin(th) * rr)));
  }
  CABLE.geometry.dispose(); CABLE.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), N * 2, 0.0045, 5, false);
}

// =====================================================================================================
// LOS PERSONAJES (Gustavo, Tito y los albañiles de la fila; Beto solo en las fotos y el avatar; Sofi en la videollamada)
// =====================================================================================================
// accesorios de cabeza (hijos de per.cabeza; el cráneo tiene centro (0, CC, 0) y radio R = 0.3)
const R0 = 0.3, CC0 = R0 * 0.92;
function casco(per, color = C.cr) {
  const g = new THREE.Group(); g.position.set(0, CC0 + 0.085, -0.012); g.rotation.x = -0.1; per.cabeza.add(g);
  const m = mat(color, 0.4);
  g.add(mesh(new THREE.SphereGeometry(R0 * 1.09, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), m, 0, 0, 0));
  const ala = mesh(new THREE.CylinderGeometry(R0 * 1.24, R0 * 1.26, 0.022, 36), m, 0, 0.005, 0.025); ala.scale.z = 1.08; g.add(ala);
  g.add(caja(0.05, 0.06, R0 * 1.9, m, 0, R0 * 1.06, 0, 0.02));   // la cresta
  return sombras(g);
}
function gorro(per, color = C.navy3) {
  const g = new THREE.Group(); g.position.set(0, CC0 + 0.03, -0.01); g.rotation.x = -0.08; per.cabeza.add(g);
  const m = mat(color, 0.95);
  g.add(mesh(new THREE.SphereGeometry(R0 * 1.07, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), m, 0, 0.02, 0));
  const dob = mesh(new THREE.CylinderGeometry(R0 * 1.1, R0 * 1.12, 0.1, 32, 1, true), m, 0, 0.04, 0); dob.material = m.clone(); dob.material.side = THREE.DoubleSide; dob.material.color.multiplyScalar(0.85); g.add(dob);
  for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2; g.add(caja(0.012, 0.09, 0.012, dob.material, Math.sin(a) * R0 * 1.115, 0.04, Math.cos(a) * R0 * 1.115, 0.004)); }   // el punto del doblez
  return sombras(g);
}
function gorra(per, color = C.navy3) {
  const g = new THREE.Group(); g.position.set(0, CC0 + 0.05, -0.01); g.rotation.x = -0.12; per.cabeza.add(g);
  const m = mat(color, 0.7);
  g.add(mesh(new THREE.SphereGeometry(R0 * 1.06, 32, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), m, 0, 0, 0));
  const vis = mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 24, 1, false, -Math.PI / 2, Math.PI), m, 0, 0.01, R0 * 0.98); vis.scale.set(1.1, 1, 0.9); g.add(vis);
  return sombras(g);
}
// el lápiz de carpintero apoyado sobre la oreja izquierda (prisma octogonal chato crema con punta navy, a lo largo)
function lapizOreja(per) {
  const g = new THREE.Group(); g.position.set(R0 * 1.03, CC0 + 0.07, 0.01); g.rotation.set(Math.PI / 2 - 0.12, 0, 0.08); per.cabeza.add(g);
  const cu = mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.17, 8), mat(0xe9d8a6, 0.6), 0, 0, 0); cu.scale.x = 0.7; g.add(cu);
  const pu = mesh(new THREE.ConeGeometry(0.0125, 0.035, 8), mat(0xd9c7a0, 0.7), 0, 0.102, 0); pu.scale.x = 0.7; g.add(pu);
  g.add(mesh(new THREE.ConeGeometry(0.005, 0.014, 6), M.navy, 0, 0.116, 0));
  return sombras(g);
}
const gustavo = crearPersonaje({ nombre: "Gustavo", piel: PIEL.media, pelo: 0x3a3330, peinado: "texturado", texturaAlto: 0.35, cejasColor: 0x2e2724, cejaGruesa: true,
  barba: 0x3a3330, barbaLarga: 0.35, barbaOpacidad: 0.35, barbaBigote: false,
  camisa: MARCA.cr, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, cuelloAlto: 0.06, chaleco: { color: MARCA.navy2, botones: MARCA.g },
  pantalon: 0x3a3f4a, zapatos: 0x3b2a20, panza: 1.08, nariz: 0.062, mejillas: 0xd08a72, alto: 1.03,
  dedos: true, parpadeoCada: 999, parpadeosExtra: [1.4, r2(T.p3b + 0.05), r2(T.p5 + 0.4), r2(T.p7 + 0.1), r2(T.q1 + 0.3), r2(T.q3 + 0.5), r2(T.q4g + 0.6)] });
lapizOreja(gustavo);
// el chaleco acolchado: tres costuras horizontales (aros navy un poco más oscuros) sobre el chaleco
{ const mq = mat(0x0f1a2e, 0.8); for (const [y, r] of [[0.12, 0.262], [0.24, 0.266], [0.35, 0.252]]) { const a = mesh(new THREE.TorusGeometry(r, 0.008, 5, 40, Math.PI * 2 - 0.75), mq, 0, y, 0); a.rotation.set(Math.PI / 2, 0, Math.PI / 2 + 0.375); a.scale.y = 0.86; gustavo.cuerpo.add(a); } }
const tito = crearPersonaje({ nombre: "Tito", piel: PIEL.morena, pelo: 0xb9b6b0, peinado: "costados", cejasColor: 0xd8d4cc, cejaGruesa: true,
  camisa: MARCA.cr2, mangas: "largas", cuello: MARCA.navy3, cuelloBotones: false, cuelloAlto: 0.04,
  campera: { color: MARCA.cr, cuello: MARCA.navy3, cierre: 0xb4b2a3, abierta: false },
  pantalon: 0x5a5550, zapatos: 0x3b2a20, panza: 1.05, nariz: 0.066, mejillas: 0xa8604a, alto: 0.97,
  dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p7 + 1.1), r2(T.q3 + 1.2)] });
gorro(tito, C.navy3);
// el polvo de portland en la campera de Tito (discos chatos gris claro en el pecho, la panza y las mangas)
{ const mp = mat(0xc9c6bd, 0.95); for (const [x, y, z, s] of [[0.11, 0.24, 0.225, 0.05], [-0.07, 0.1, 0.245, 0.04], [0.05, -0.02, 0.25, 0.035], [-0.15, 0.3, 0.18, 0.03]]) { const d = mesh(new THREE.SphereGeometry(1, 12, 8), mp, x, y, z); d.scale.set(s, s * 0.75, 0.012); d.lookAt(d.position.clone().multiplyScalar(3)); d.scale.set(s, s * 0.75, 0.012); tito.cuerpo.add(d); }
  for (const b of tito.brazos) { const d = mesh(new THREE.SphereGeometry(1, 12, 8), mp, 0, -0.05, 0.05); d.scale.set(0.04, 0.03, 0.03); b.ante?.add?.(d); } }
// los albañiles de la fila (sin voz): variantes con casco, gorro o gorra; ninguno se parece al elenco
const ALB = [
  crearPersonaje({ nombre: "a1", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "costados", cejasColor: 0x2a2220, camisa: MARCA.navy3, mangas: "largas", cuello: null, cuelloBotones: false, pantalon: 0x4a4f5a, zapatos: 0x3b2a20, panza: 1.04, nariz: 0.06, alto: 1.02, dedos: true, parpadeoCada: 999 }),
  crearPersonaje({ nombre: "a2", piel: PIEL.clara, pelo: PELO.castaño, peinado: "costados", cejasColor: 0x4a3222, camisa: 0x8a8f98, mangas: "largas", cuello: null, cuelloBotones: false, pantalon: MARCA.navy2, zapatos: 0x2a2220, panza: 1.0, nariz: 0.056, alto: 0.99, parpadeoCada: 999 }),
  crearPersonaje({ nombre: "a3", piel: PIEL.media, pelo: PELO.negro, peinado: "rulos", cejasColor: 0x2a2220, camisa: MARCA.cr2, mangas: "largas", cuello: MARCA.navy3, cuelloBotones: false, pantalon: 0x4a4f5a, zapatos: 0x2a2220, panza: 1.02, nariz: 0.058, alto: 1.0, parpadeoCada: 999 }),
  crearPersonaje({ nombre: "a4", piel: PIEL.trigueña, pelo: PELO.castaño, peinado: "costados", cejasColor: 0x3a2f2a, camisa: MARCA.navy2, mangas: "largas", cuello: null, cuelloBotones: false, pantalon: 0x5a5550, zapatos: 0x3b2a20, panza: 1.06, nariz: 0.06, alto: 1.01, parpadeoCada: 999 }),
  crearPersonaje({ nombre: "a5", piel: PIEL.media, pelo: PELO.negro, peinado: "costados", cejasColor: 0x2a2220, camisa: MARCA.gd, mangas: "largas", cuello: null, cuelloBotones: false, pantalon: MARCA.navy2, zapatos: 0x2a2220, panza: 1.0, nariz: 0.055, alto: 1.0, parpadeoCada: 999 }),
];
casco(ALB[0], C.cr); gorro(ALB[1], C.gd); gorra(ALB[3], C.navy3); casco(ALB[4], C.cr);
const TODOS = [gustavo, tito, ...ALB];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// Beto, el maestro de obra (solo en las fotos y en el avatar): casco crema, barba de tres días, chaleco reflectivo verde
// con dos bandas crema sobre campera navy
const beto = crearPersonaje({ nombre: "Beto", piel: PIEL.trigueña, pelo: PELO.castaño, peinado: "costados", cejasColor: 0x3a2618,
  barba: 0x3a2a20, barbaLarga: 0.4, barbaOpacidad: 0.55, barbaBigote: true, camisa: MARCA.navy3, mangas: "largas", cuello: MARCA.navy3, cuelloBotones: false,
  chaleco: { color: MARCA.g, botones: MARCA.cr }, pantalon: 0x4a4f5a, zapatos: 0x3b2a20, panza: 1.03, nariz: 0.058, mejillas: 0xb8644e, alto: 1.0, parpadeoCada: 999 });
casco(beto, C.cr);
{ const mb = mat(C.cr, 0.5); for (const y of [0.1, 0.22]) { const a = mesh(new THREE.TorusGeometry(0.262, 0.014, 5, 40, Math.PI * 2 - 0.75), mb, 0, y, 0); a.rotation.set(Math.PI / 2, 0, Math.PI / 2 + 0.375); a.scale.y = 0.86; beto.cuerpo.add(a); } }
const PER_PX = (per) => per;

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (para los chats y las burbujas) ----
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
  AVATAR.beto = leer(beto, 0xd9d7c9, 0.3, 1.75);
  AVATAR.tito = leer(tito, 0xcfeebc, 0.27, 1.7);
  AVATAR.gustavo = leer(gustavo, 0x5ce611, 0.25, 1.6);
  // los que escriben sin cara: la inicial en un círculo de color
  const ini = (l, fondo, tinta = "#efeee5") => { const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d"); x.fillStyle = fondo; x.fillRect(0, 0, 256, 256); x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 140); x.fillText(l, 128, 140); return cv; };
  AVATAR.marcos = ini("M", "#1f3254"); AVATAR.luis = ini("L", "#3fa60a"); AVATAR.ana = ini("A", "#8a8f98"); AVATAR.ramon = ini("R", "#16243d"); AVATAR.facundo = ini("F", "#b4b2a3", "#0b1220"); AVATAR.cli = ini("C", "#d9d7c9", "#0b1220"); AVATAR.obra = ini("O", "#2c4268");
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
function renglones(x, txt, ancho) { const ws = txt.split(" "), out = []; let l = ""; for (const w of ws) { const p = l ? l + " " + w : w; if (x.measureText(p).width > ancho && l) { out.push(l); l = w; } else l = p; } if (l) out.push(l); return out; }

// =====================================================================================================
// LAS FOTOS DEL CHAT: un camión plataforma descargando bolsas en la vereda de la obra (escena aparte, render a canvas)
//   gris: el de "otro" (sin nombre), Beto de espaldas · navy: el de Materiales Gustavo, Beto de frente saludando
// =====================================================================================================
function crearCamion(color, conNombre) {
  const g = new THREE.Group(), mc = mat(color, 0.5), mv = mat(0x2c4268, 0.15, { metalness: 0.3 });
  // la cabina (adelante, +x) y el chasis
  g.add(caja(4.6, 0.25, 1.9, M.paragolpe ?? M.navy, 0.0, 0.62, 0, 0.04));
  g.add(caja(1.55, 1.55, 2.0, mc, 1.65, 1.55, 0, 0.12));
  const pb = caja(0.05, 0.75, 1.7, mv, 2.43, 1.85, 0, 0.03); pb.rotation.z = -0.12; g.add(pb);
  for (const s of [-1, 1]) g.add(caja(0.8, 0.6, 0.04, mv, 1.75, 1.85, s * 1.0, 0.02));
  g.add(caja(0.1, 0.45, 1.7, M.navy, 2.43, 1.05, 0, 0.02)); for (const s of [-1, 1]) g.add(caja(0.06, 0.16, 0.3, mat(0xfffbea, 0.2, { emissive: 0xfff4d0, emissiveIntensity: 0.4 }), 2.46, 1.0, s * 0.68, 0.02));
  g.add(caja(0.18, 0.2, 2.06, M.navy, 2.45, 0.62, 0, 0.04));
  // la plataforma con barandas bajas (crema en el navy, gris oscuro en el gris)
  const mb = mat(conNombre ? C.cr : 0x6d727b, 0.6);
  g.add(caja(3.0, 0.14, 2.0, mb, -0.75, 0.82, 0, 0.02));
  for (const s of [-1, 1]) g.add(caja(3.0, 0.42, 0.06, mb, -0.75, 1.1, s * 0.98, 0.02));
  g.add(caja(0.06, 0.42, 2.0, mb, -2.22, 1.1, 0, 0.02));
  if (conNombre) {
    const t = lienzo(1200, 160, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "MATERIALES GUSTAVO", 900, 118, w - 60); x.fillText("MATERIALES GUSTAVO", w / 2, h / 2 + 4); });
    const p = plano(2.9, 0.38, t, -0.75, 1.1, 1.015); g.add(p);
    const pc = plano(1.3, 0.2, t, 1.65, 1.2, 1.005); g.add(pc);
  }
  for (const [x, z] of [[1.5, 1], [1.5, -1], [-1.1, 1], [-1.1, -1], [-1.75, 1], [-1.75, -1]]) { const r = mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 24), M.goma, x, 0.42, z * 0.88); r.rotation.x = Math.PI / 2; g.add(r); const ll = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.31, 16), mat(0xb4b2a3, 0.5), x, 0.42, z * 0.88); ll.rotation.x = Math.PI / 2; g.add(ll); }
  // las bolsas en la plataforma (dos hileras, a medio bajar)
  for (let k = 0; k < 3; k++) for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { if (k === 2 && (i + j) % 2) continue; const b = crearBolsaPortland(); b.position.set(-1.9 + i * 0.6, 0.96 + k * 0.135, -0.4 + j * 0.4); g.add(b); }
  return sombras(g);
}
const FOTO = { esc: new THREE.Scene(), rt: new THREE.WebGLRenderTarget(1200, 820), cam: new THREE.PerspectiveCamera(36, 1200 / 820, 0.1, 80), cv: {} };
{
  const E = FOTO.esc; FOTO.rt.texture.colorSpace = THREE.SRGBColorSpace;
  E.background = new THREE.Color(0x16243d);
  E.add(new THREE.HemisphereLight(0xf8f6ee, 0x8a8678, 1.9)); const dl = new THREE.DirectionalLight(0xfff0d8, 1.6); dl.position.set(6, 8, 6); dl.castShadow = true; dl.shadow.mapSize.set(1024, 1024); Object.assign(dl.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 }); E.add(dl);
  E.environment = scene.environment;
  const calle = mesh(new THREE.PlaneGeometry(40, 20), M.asfalto ?? mat(0x50545c, 0.95), 0, 0, 2); calle.rotation.x = -Math.PI / 2; E.add(calle);
  const vereda = mesh(new THREE.PlaneGeometry(40, 3.2), M.cr2, 0, 0.12, -2.6); vereda.rotation.x = -Math.PI / 2; E.add(vereda);
  E.add(caja(40, 0.12, 0.16, M.cr3, 0, 0.06, -1.0, 0.02));
  // el cerco de chapa crema de la obra, el andamio navy, la mezcladora y el edificio en obra (losa gris)
  const cerco = new THREE.Group(); cerco.position.set(0, 0, -4.2); E.add(cerco);
  cerco.add(caja(16, 2.2, 0.05, M.cr, 0, 1.1, 0, 0.01)); for (let x = -7.9; x < 8; x += 0.18) cerco.add(caja(0.06, 2.2, 0.04, M.cr2, x, 1.1, 0.04, 0.01));
  E.add(caja(9, 0.3, 4, M.hormigon ?? M.cr2, -1, 3.4, -6.5, 0.02)); for (const x of [-5, -2, 1, 3.4]) E.add(caja(0.3, 3.3, 0.3, M.cr3, x, 1.7, -4.8, 0.02));
  for (const x of [3.6, 5.0]) for (const y of [0, 1.2, 2.4]) { E.add(caja(0.06, 1.2, 0.06, M.navy3, x, y + 0.6, -3.7, 0.01)); E.add(caja(1.4, 0.05, 0.05, M.navy3, 4.3, y + 1.2, -3.7, 0.01)); }
  const mez = new THREE.Group(); mez.position.set(-4.6, 0.12, -2.6); E.add(mez); const tam = mesh(new THREE.CylinderGeometry(0.42, 0.62, 0.95, 18), M.navy3, 0, 1.05, 0); tam.rotation.z = 0.6; mez.add(tam); mez.add(caja(0.9, 0.5, 0.5, M.navy, 0.1, 0.4, 0, 0.03)); sombras(mez);
  // las bolsas ya bajadas en la vereda
  for (let k = 0; k < 3; k++) for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) { const b = crearBolsaPortland(); b.position.set(-2.6 + i * 0.6 + (k % 2) * 0.05, 0.12 + 0.07 + k * 0.13, -2.5 + j * 0.4); E.add(b); }
  sombras(E);
}
const _fotoPer = beto;
function sacarFoto(color, conNombre, frente) {
  const cam = crearCamion(color, conNombre); cam.position.set(1.2, 0, 0.6); FOTO.esc.add(cam);
  const padre = beto.raiz.parent; FOTO.esc.add(beto.raiz);
  if (frente) beto.poner({ x: -1.35, y: 0.12, z: -1.4, giro: 0.35, ...CARA.feliz, ojos: { abiertos: 0.95, feliz: 0.5 }, ...BRAZOS.costado, ...saludo(0.3, "D", 0.6), t: 0 });
  else beto.poner({ x: -0.9, y: 0.12, z: -1.2, giro: Math.PI - 0.5, ...CARA.neutra, ...BRAZOS.costado, manoD: [-0.2, 0.3, 0.3], manoI: [0.2, 0.3, 0.3], t: 0 });
  FOTO.cam.position.set(0.0, 2.0, 6.6); FOTO.cam.lookAt(0.4, 1.15, -0.4);
  renderer.setRenderTarget(FOTO.rt); renderer.render(FOTO.esc, FOTO.cam); renderer.setRenderTarget(null);
  const W = 1200, H = 820, px = new Uint8Array(W * H * 4); renderer.readRenderTargetPixels(FOTO.rt, 0, 0, W, H, px);
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d"); const id = x.createImageData(W, H);
  for (let y = 0; y < H; y++) id.data.set(px.subarray((H - 1 - y) * W * 4, (H - y) * W * 4), y * W * 4);
  x.putImageData(id, 0, 0);
  FOTO.esc.remove(cam); if (padre) padre.add(beto.raiz); else FOTO.esc.remove(beto.raiz);
  return cv;
}
FOTO.cv.gris = sacarFoto(0x8a8f98, false, false);
FOTO.cv.navy = sacarFoto(0x1f3254, true, true);
FOTO.rt.dispose();

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
// LAS PANTALLAS (chat genérico: encabezado navy, fondo crema, burbujas blancas / verde pálido; "WhatsApp" solo en texto)
// =====================================================================================================
const CW = 740, CH = 1290;   // el celular a pantalla (inserto)
// encabezado de un chat: avatar, nombre y subtítulo (o "escribiendo…" en verde)
function cabecera(x, W, cv, nombre, sub, subVerde = false) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 176); x.fillStyle = "#5ce611"; x.fillRect(0, 176, W, 8);
  x.strokeStyle = "#efeee5"; x.lineWidth = 9; x.lineCap = "round"; x.beginPath(); x.moveTo(52, 70); x.lineTo(30, 92); x.lineTo(52, 114); x.stroke();
  avatar(x, cv, 124, 92, 54);
  x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#efeee5"; ajustar(x, nombre, 800, 52, W - 230); x.fillText(nombre, 196, 70);
  x.fillStyle = subVerde ? "#5ce611" : "#b9c3d3"; x.font = F(700, 38); x.fillText(sub, 198, 126);
}
// la onda del audio (barras), el play y la duración
function burbujaAudio(x, X, Y, w, dur, avance = 0, cv = null) {
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w, 132, [8, 32, 32, 32]); x.fill(); x.stroke();
  let x0 = X + 30; if (cv) { avatar(x, cv, X + 70, Y + 66, 44); x0 = X + 128; }
  x.fillStyle = "#16243d"; x.beginPath(); x.moveTo(x0, Y + 40); x.lineTo(x0 + 44, Y + 66); x.lineTo(x0, Y + 92); x.closePath(); x.fill();
  const b0 = x0 + 70, b1 = X + w - 120; semilla = 77;
  for (let bx = b0, i = 0; bx < b1; bx += 14, i++) { const hh = 12 + Math.abs(Math.sin(i * 0.9) * 26) + az() * 18; x.fillStyle = (bx - b0) / (b1 - b0) < avance ? "#3fa60a" : "#8a93a3"; rr(x, bx, Y + 66 - hh / 2, 8, hh, 4); }
  x.fillStyle = "#16243d"; x.textAlign = "right"; x.textBaseline = "middle"; x.font = F(800, 38); x.fillText(dur, X + w - 22, Y + 68);
  return 132;
}
function burbujaTexto(x, X, Y, w, lineas, { yo = false, px = 46, tilde: tl = null, etiqueta = null } = {}) {
  let h = 34 + lineas.length * px * 1.24 + (tl ? 36 : 0), y0 = Y;
  if (etiqueta) { x.fillStyle = "#3fa60a"; x.font = F(800, 36); x.textAlign = yo ? "right" : "left"; x.textBaseline = "middle"; x.fillText(etiqueta, yo ? X + w - 6 : X + 6, Y + 18); y0 = Y + 48; }
  x.fillStyle = yo ? "#cfeebc" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, y0, w, h, yo ? [32, 8, 32, 32] : [8, 32, 32, 32]); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, px); x.textAlign = "left"; x.textBaseline = "middle";
  lineas.forEach((l, i) => x.fillText(l, X + 26, y0 + 17 + px * 0.62 + i * px * 1.24));
  if (tl) { const cx = X + w - 46, cy = y0 + h - 30; tilde(x, cx, cy, 30, tl === "gris" ? "#8a93a3" : "#3fa60a", 7); if (tl === "doble") tilde(x, cx + 16, cy, 30, "#3fa60a", 7); }
  return h + (y0 - Y);
}
function fotoChat(x, X, Y, w, cv) {
  const h = Math.round((w * cv.height) / cv.width);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w + 24, h + 24, [8, 30, 30, 30]); x.fill(); x.stroke();
  x.save(); x.beginPath(); x.roundRect(X + 12, Y + 12, w, h, 20); x.clip(); x.drawImage(cv, X + 12, Y + 12, w, h); x.restore();
  return h + 24;
}
function tarjetaVerde(x, X, Y, w, titulo, lineas, px = 40) {
  const h = 104 + lineas.length * px * 1.3;
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(X, Y, w, h, 30); x.fill();
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(X + 62, Y + 58, 36, 0, 7); x.fill(); tilde(x, X + 63, Y + 60, 38, "#0b1220", 9);
  x.fillStyle = "#5ce611"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, titulo, 900, 52, w - 140); x.fillText(titulo, X + 116, Y + 60);
  x.fillStyle = "#efeee5"; lineas.forEach((l, i) => { ajustar(x, l, 800, px, w - 60); x.fillText(l, X + 34, Y + 120 + i * px * 1.3); });
  return h;
}
// un chat con los mensajes apilados desde abajo (el último siempre entero abajo)
function dibujarChat(x, W, H, { cv, nombre, sub, subVerde, msgs, input = "" }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  const medir = document.createElement("canvas").getContext("2d");
  const alto = (m) => m.dibujar(medir, 0);
  const hs = msgs.map(alto), gap = 26;
  const piso = H - (input !== null ? 150 : 30);
  let y = piso - hs.reduce((a, b) => a + b + gap, 0) + gap;
  msgs.forEach((m, i) => { m.dibujar(x, y); y += hs[i] + gap; });
  if (input !== null) {
    x.fillStyle = "#d9d7c9"; x.fillRect(0, H - 130, W, 130);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 4; x.beginPath(); x.roundRect(24, H - 108, W - 160, 86, 43); x.fill(); x.stroke();
    x.fillStyle = input ? "#0b1220" : "#8a93a3"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 38); x.fillText(input || "Mensaje", 52, H - 64);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 70, H - 65, 44, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(W - 88, H - 88); x.lineTo(W - 46, H - 65); x.lineTo(W - 88, H - 42); x.closePath(); x.fill();
  }
  cabecera(x, W, cv, nombre, sub, subVerde);
}
const M_ = {   // los mensajes (cada uno sabe dibujarse y devuelve su alto)
  audio: (dur, avance = 1, cv = AVATAR.beto) => ({ dibujar: (x, y) => burbujaAudio(x, 24, y, 560, dur, avance, cv) }),
  yo: (ls, o = {}) => ({ dibujar: (x, y) => { x.font = F(800, o.px ?? 46); const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 110; return burbujaTexto(x, CW - 24 - w, y, w, ls, { yo: true, ...o }); } }),
  el: (ls, o = {}) => ({ dibujar: (x, y) => { x.font = F(800, o.px ?? 46); const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 60; return burbujaTexto(x, 24, y, w, ls, o); } }),
  foto: (cv, w = 560) => ({ dibujar: (x, y) => fotoChat(x, 24, y, w, cv) }),
  verde: (titulo, ls, w = 640) => ({ dibujar: (x, y) => tarjetaVerde(x, CW - 24 - w, y, w, titulo, ls) }),
  dia: (txt) => ({ dibujar: (x, y) => { x.font = F(800, 36); const w = x.measureText(txt).width + 50; x.fillStyle = "#d9d7c9"; rr(x, (CW - w) / 2, y, w, 60, 30); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(txt, CW / 2, y + 31); return 60; } }),
  escribe: () => ({ dibujar: (x, y) => { x.fillStyle = "#cfeebc"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(CW - 24 - 190, y, 190, 92, [32, 8, 32, 32]); x.fill(); x.stroke(); x.fillStyle = "#16243d"; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(CW - 24 - 140 + i * 45, y + 46, 12, 0, 7); x.fill(); } return 92; } }),
};
// P2 · la lista de chats que se llena (20 → 27 sin leer)
const NUEVOS = [{ h: "6:47", cv: AVATAR.luis, nom: "Luis", q: "¿A cuánto el portland?" }, { h: "6:48", cv: AVATAR.ana, nom: "Ana", q: "¿Tenés arena gruesa?" }, { h: "6:49", cv: AVATAR.ramon, nom: "Ramón", q: "¿Llevan a obra hoy?" }, { h: "6:50", cv: AVATAR.marcos, nom: "Marcos", q: "¿Hola?", n: 2 }];
const VIEJOS = [{ h: "6:45", cv: AVATAR.beto, nom: "Beto (obra)", q: "Audio · 0:03", leido: true }, { h: "6:41", cv: AVATAR.cli, nom: "Cliente nuevo", q: "¿Abren a las 7?" }, { h: "6:30", cv: AVATAR.marcos, nom: "Marcos", q: "¿Tenés hierro del 8?" }, { h: "6:22", cv: AVATAR.obra, nom: "Obra Pocitos", q: "¿Mañana traen la arena?" }];
function filaChat(x, W, y, f, resaltar = 0) {
  if (resaltar) { x.fillStyle = `rgba(199,101,91,${0.18 * resaltar})`; x.fillRect(0, y, W, 168); }
  avatar(x, f.cv, 82, y + 84, 54);
  x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#0b1220"; ajustar(x, f.nom, 800, 46, W - 360); x.fillText(f.nom, 156, y + 56);
  x.fillStyle = "#3a4256"; ajustar(x, f.q, 700, 40, W - 290); x.fillText(f.q, 156, y + 118);
  x.textAlign = "right"; x.fillStyle = f.leido ? "#6b7080" : "#c7655b"; x.font = F(800, 40); x.fillText(f.h, W - 28, y + 54);
  if (!f.leido) { x.fillStyle = "#c7655b"; x.beginPath(); x.arc(W - 62, y + 116, 28, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 34); x.fillText(String(f.n ?? 1), W - 62, y + 118); }
  x.fillStyle = "#d9d7c9"; x.fillRect(150, y + 166, W - 150, 3);
}
function dibujarLista(x, W, H, n, k) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  const visibles = [...NUEVOS.slice(0, n).reverse(), ...VIEJOS.filter((v) => !(n >= 4 && v.nom === "Marcos"))];
  visibles.slice(0, 7).forEach((f, i) => filaChat(x, W, 200 + i * 170, f, i === 0 && n > 0 ? 1 - k * 0.5 : 0));
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 176); x.fillStyle = "#5ce611"; x.fillRect(0, 176, W, 8);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 60); x.fillText("Chats", 34, 74); x.font = F(700, 36); x.fillStyle = "#b9c3d3"; x.fillText("WhatsApp · Materiales Gustavo", 36, 136);
  const cnt = [20, 22, 24, 26, 27][n], txt = `${cnt} sin leer`;
  x.font = F(900, 46); const w = x.measureText(txt).width + 44;
  x.fillStyle = "#c7655b"; rr(x, W - 24 - w, 40, w, 72, 36); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.fillText(txt, W - 24 - w / 2, 78);
}
// Q2 · los chats contestados (cada fila: hora, nombre, pregunta y la respuesta del agente con ✓), el contador a 0 y el de
// 300 bolsas marcado "Para vos, Gustavo"
const RESP = [
  { h: "6:30", cv: AVATAR.marcos, nom: "Marcos", q: "¿Tenés hierro del 8?", a: "Sí, $ 380 la barra. ¿Cuántas?", antes: true },
  { h: "6:47", cv: AVATAR.luis, nom: "Luis", q: "¿A cuánto el portland?", a: "$ 520 la bolsa de 25 kg." },
  { h: "6:48", cv: AVATAR.ana, nom: "Ana", q: "¿Tenés arena gruesa?", a: "Sí, $ 2.400 el m³." },
  { h: "6:49", cv: AVATAR.ramon, nom: "Ramón", q: "¿Llevan a obra hoy?", a: "Sí, de 9 a 17. ¿Dirección?" },
];
function dibujarRespondidos(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  RESP.forEach((f, i) => {
    const y = 196 + i * 202, k = e.filas[i];
    avatar(x, f.cv, 72, y + 62, 46);
    x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#0b1220"; x.font = F(800, 44); x.fillText(f.nom, 136, y + 44);
    x.fillStyle = "#16243d"; x.font = F(900, 42); x.fillText(f.h, 136 + x.measureText(f.nom).width + 24 + 0, y + 44);
    if (f.antes) { x.font = F(800, 36); const tx = "antes de abrir"; const w = x.measureText(tx).width + 34; const x0 = W - 24 - w; x.fillStyle = "#efeee5"; x.strokeStyle = "#16243d"; x.lineWidth = 4; x.beginPath(); x.roundRect(x0, y + 18, w, 54, 27); x.fill(); x.stroke(); x.fillStyle = "#16243d"; x.textAlign = "center"; x.fillText(tx, x0 + w / 2, y + 46); x.textAlign = "left"; }
    x.fillStyle = "#3a4256"; ajustar(x, f.q, 700, 40, W - 170); x.fillText(f.q, 136, y + 98);
    if (k > 0) { x.globalAlpha = Math.min(1, k * 1.5); x.fillStyle = "#cfeebc"; x.strokeStyle = "#16243d"; x.lineWidth = 4; x.beginPath(); x.roundRect(120, y + 128, W - 144, 62, 18); x.fill(); x.stroke(); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(156, y + 159, 22, 0, 7); x.fill(); tilde(x, 157, y + 160, 22, "#0b1220", 6); x.fillStyle = "#0b1220"; ajustar(x, f.a, 800, 40, W - 240); x.fillText(f.a, 192, y + 160); x.globalAlpha = 1; }
  });
  // el de 300 bolsas: se separa con borde verde y el chip "Para vos, Gustavo"
  if (e.paraVos > 0) {
    const y = 1012 - (1 - e.paraVos) * 30; x.globalAlpha = Math.min(1, e.paraVos * 1.6);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#5ce611"; x.lineWidth = 10; x.beginPath(); x.roundRect(16, y, W - 32, 258, 26); x.fill(); x.stroke();
    avatar(x, AVATAR.facundo, 70, y + 62, 42); x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 42); x.fillText("Facundo · 6:52", 128, y + 62);
    x.font = F(800, 40); x.fillText("300 bolsas para un edificio,", 40, y + 128); x.fillText("¿qué precio me hacés?", 40, y + 176);
    x.font = F(900, 40); const tx = "Para vos, Gustavo"; const w = x.measureText(tx).width + 50; x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.roundRect(W - 34 - w, y + 198, w, 50, 25); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.fillText(tx, W - 34 - w / 2, y + 224);
    x.globalAlpha = 1;
  }
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 176); x.fillStyle = "#5ce611"; x.fillRect(0, 176, W, 8);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 60); x.fillText("Chats", 34, 74); x.font = F(700, 36); x.fillStyle = "#b9c3d3"; x.fillText("Agente de IA atendiendo", 36, 136);
  const txt = `Sin contestar: ${e.cuenta}`; x.font = F(900, 42); const w = x.measureText(txt).width + 44;
  x.fillStyle = e.cuenta === 0 ? "#5ce611" : "#c7655b"; rr(x, W - 24 - w, 44, w, 70, 35); x.fillStyle = e.cuenta === 0 ? "#0b1220" : "#efeee5"; x.textAlign = "center"; x.fillText(txt, W - 24 - w / 2, 80);
}
// el panel del mostrador (Q3, monitor): "Hoy · antes de las 8"
const SUMAS = [20800, 28500, 36100, 43900, 48900];
const MW = 1000, MH = 760;
function dibujarPanel(x, W, H, n) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, W, 9);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 58); x.fillText("Hoy · antes de las 8", 34, 62);
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(28, 156, W - 56, 250, 30); x.fill();
  x.fillStyle = "#efeee5"; x.font = F(800, 44); x.fillText("Pedidos por WhatsApp: " + n, 62, 212);
  x.fillStyle = "#5ce611"; x.font = F(900, 150); x.fillText(plata(n ? SUMAS[n - 1] : 0), 54, 324);
  const caja2 = (X, Y, w, a, b, verde) => { x.fillStyle = verde ? "#5ce611" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(X, Y, w, 116, 24); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, a, 800, 40, w - 30); x.fillText(a, X + w / 2, Y + 40); ajustar(x, b, 900, 46, w - 30); x.fillText(b, X + w / 2, Y + 86); };
  caja2(28, 430, (W - 76) / 2, "Sin contestar", "0", true);
  caja2(48 + (W - 76) / 2, 430, (W - 76) / 2, "Para vos", "1", false);
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.font = F(800, 42); x.fillText("Entregas a obra:", 34, 606);
  x.fillStyle = "#0b1220"; ajustar(x, "9:00 Beto · 10:30 Luis · 11:00 Marcos", 800, 42, W - 70); x.fillText("9:00 Beto · 10:30 Luis · 11:00 Marcos", 34, 668);
}

// ---- los insertos a pantalla (pegados a la cámara): el celular y el monitor, con el galpón desenfocado atrás ----
function crearFondoInserto(g) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: 0x1f3254 })); bg.position.z = -0.06; g.add(bg);
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
  const brillo = new THREE.Mesh(rbox((IW + 2 * marcoR - 10) / PXK, (IH + 2 * marcoR - 10) / PXK, 0.005, 76 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x2c4268 })); brillo.position.set((cx - 540 - 3) / PXK, (960 - cy + 3) / PXK, -0.035); g.add(brillo);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  if (opc.mano) {
    const piel = new THREE.MeshBasicMaterial({ color: opc.mano }), sombraP = new THREE.MeshBasicMaterial({ color: new THREE.Color(opc.mano).multiplyScalar(0.82) });
    const palma = new THREE.Mesh(rbox(330 / PXK, 420 / PXK, 0.01, 120 / PXK, 3), piel); palma.position.set((cx - 540 - IW / 2 + 90) / PXK, (960 - cy - IH / 2 - 120) / PXK, -0.045); palma.rotation.z = -0.35; g.add(palma);
    const pulgar = new THREE.Mesh(rbox(86 / PXK, 250 / PXK, 0.01, 43 / PXK, 3), piel); pulgar.position.set((cx - 540 - IW / 2 + 20) / PXK, (960 - cy - IH / 2 + 160) / PXK, -0.015); pulgar.rotation.z = -0.5; if (!opc.sinPulgar) g.add(pulgar);
    const una = new THREE.Mesh(rbox(50 / PXK, 60 / PXK, 0.01, 22 / PXK, 3), sombraP); una.position.set((cx - 540 - IW / 2 + 70) / PXK, (960 - cy - IH / 2 + 250) / PXK, -0.014); una.rotation.z = -0.5; if (!opc.sinPulgar) g.add(una);
    if (opc.grasa) { const gm = new THREE.MeshBasicMaterial({ color: 0x3a3f4a, transparent: true, opacity: 0.7 }); const m = new THREE.Mesh(new THREE.CircleGeometry(26 / PXK, 16), gm); m.position.set(pulgar.position.x + 0.01, pulgar.position.y + 0.09, -0.013); m.scale.set(1, 0.7, 1); g.add(m); }
  }
  return { g, tex, IW, IH };
}
const INS1 = { g: new THREE.Group() }; crearFondoInserto(INS1.g);
const CEL = crearCelInserto(CW, CH, 540, 1010, 34, { camara: true, funda: 0x1a1c20 }); INS1.g.add(CEL.g);
const INS3 = { g: new THREE.Group() }; crearFondoInserto(INS3.g);
const MON = crearCelInserto(MW, MH, 540, 1000, 26, { camara: false, funda: 0x0b1220 }); INS3.g.add(MON.g);
{ const pie = new THREE.Mesh(new THREE.PlaneGeometry(140 / PXK, 260 / PXK), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); pie.position.set(0, (960 - 1520) / PXK, -0.035); INS3.g.add(pie); const base = new THREE.Mesh(rbox(420 / PXK, 40 / PXK, 0.005, 16 / PXK, 2), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); base.position.set(0, (960 - 1650) / PXK, -0.034); INS3.g.add(base); }
for (const I of [INS1, INS3]) { pegarACamara(I.g, camera, 10); I.g.visible = false; }

// el estado del celular a pantalla en t (qué chat y en qué momento)
function estadoCel(t, pa) {
  const b1msg = M_.audio("0:03", 1);
  const HIST = [M_.dia("VIERNES"), M_.el(["¿Me reservás arena", "para el lunes?"]), M_.yo(["Listo, Beto."], { tilde: "doble" }), M_.dia("HOY")];
  if (pa === "P2i") { const n = T.fila.filter((f) => t >= f).length; return { lista: true, n, k: n ? Math.round(sg(t, T.fila[n - 1], T.fila[n - 1] + 0.25) * 4) / 4 : 1 }; }
  if (pa === "P3i") {
    const txt = "Tengo las 40. ¿Te las mando?", c = Math.round(cl((t - T.tipea) / (T.manda - 0.05 - T.tipea)) * txt.length);
    return { chat: true, cv: AVATAR.beto, nombre: "Beto (obra)", sub: "en línea", msgs: t >= T.manda ? [...HIST, b1msg, M_.yo(["Tengo las 40.", "¿Te las mando?"], { tilde: "gris" })] : [...HIST, b1msg], input: t >= T.manda ? "" : txt.slice(0, c) };
  }
  if (pa === "P4") {
    const msgs = [...HIST, b1msg, M_.yo(["Tengo las 40.", "¿Te las mando?"], { tilde: "gris" })];
    if (t >= T.b2) msgs.push(M_.audio("0:02", sg(t, T.b2, T.b2 + LEN.b2)));
    if (t >= T.b3) msgs.push(M_.audio("0:01", sg(t, T.b3, T.b3 + LEN.b3)));
    if (t >= T.foto) msgs.push(M_.foto(FOTO.cv.gris, 660));
    return { chat: true, cv: AVATAR.beto, nombre: "Beto (obra)", sub: "en línea", msgs, input: "" };
  }
  if (pa === "Q1i") {
    const msgs = [...HIST, M_.audio("0:03", sg(t, T.b1b, T.b1b + LEN.b1))];
    if (t >= T.escr && t < T.resp) msgs.push(M_.escribe());
    if (t >= T.resp) msgs.push(M_.yo(["Hola, Beto. Sí: 40 bolsas", "de portland en stock,", "$ 20.800. ¿Te las llevamos", "hoy a la obra?"], { tilde: "doble", px: 42, etiqueta: "Agente de IA · Materiales Gustavo" }));
    if (t >= T.dale) msgs.push(M_.el(["Dale. A las 9,", "Rivera 2340."]));
    if (t >= T.conf) msgs.push(M_.verde("Pedido confirmado", ["40 portland · $ 20.800", "Entrega hoy 9:00 · Rivera 2340"]));
    return { chat: true, cv: AVATAR.beto, nombre: "Beto (obra)", sub: t >= T.escr && t < T.resp ? "Agente escribiendo…" : "en línea", subVerde: t >= T.escr && t < T.resp, msgs, input: "" };
  }
  if (pa === "Q2") {
    const u = sg(t, T.q2 + 0.2, T.cero);
    return { resp: true, filas: T.filas.map((f) => Math.round(sg(t, f, f + 0.2) * 4) / 4), cuenta: Math.round(27 * (1 - u)), paraVos: Math.round(sg(t, T.paraVos, T.paraVos + 0.25) * 4) / 4 };
  }
  if (pa === "Q4") {
    const msgs = [M_.verde("Pedido confirmado", ["40 portland · $ 20.800", "Entrega hoy 9:00 · Rivera 2340"])];
    if (t >= T.b3b) msgs.push(M_.audio("0:01", sg(t, T.b3b, T.b3b + LEN.b3)));
    if (t >= T.foto2) msgs.push(M_.foto(FOTO.cv.navy, 660));
    if (t >= T.entregado) msgs.push(M_.verde("Entregado 9:02", ["40 bolsas en Rivera 2340"]));
    return { chat: true, cv: AVATAR.beto, nombre: "Beto (obra)", sub: "en línea", msgs, input: "" };
  }
  return null;
}
let claveCel = "";
function dibujarCel(t, pa) {
  const e = estadoCel(t, pa); if (!e) return;
  const k = pa + "|" + (e.lista ? `${e.n}|${e.k}` : e.resp ? JSON.stringify(e) : Math.round(t * 15));
  if (k === claveCel) return; claveCel = k;
  const x = CEL.tex.userData.x;
  if (e.lista) dibujarLista(x, CW, CH, e.n, e.k); else if (e.resp) dibujarRespondidos(x, CW, CH, e); else dibujarChat(x, CW, CH, e);
  CEL.tex.needsUpdate = true;
}
let clavePanel = "";
function dibujarMonInserto(t) { const n = T.suma.filter((s) => t >= s).length; if (`${n}` === clavePanel) return; clavePanel = `${n}`; dibujarPanel(MON.tex.userData.x, MW, MH, n); MON.tex.needsUpdate = true; }

// =====================================================================================================
// LOS OBJETOS DEL MOSTRADOR: el celular acostado (parte 1), el celular parado y el monitor (parte 2)
// =====================================================================================================
// parte 1: la pantalla bloqueada con "20 sin leer" y la notificación del audio de Beto
const pantA = lienzo(600, 975, (x, w, h) => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 150); x.fillText("6:45", w / 2, 190); x.font = F(700, 44); x.fillText("lunes", w / 2, 300);
  x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(40, 380, w - 80, 120, 60); x.fill(); x.fillStyle = "#efeee5"; x.font = F(900, 56); x.fillText("20 sin leer", w / 2, 442);
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, 540, w - 60, 230, 30); x.fill();
  avatar(x, AVATAR.beto, 110, 640, 56); x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 46); x.fillText("Beto (obra)", 186, 610); x.fillStyle = "#3a4256"; x.font = F(700, 40); x.fillText("Audio · 0:03", 186, 672);
});
const celuA = crearCelular(pantA, 0x1a1c20, 0.08, 0.162); celuA.scale.setScalar(1.3); celuA.rotation.set(-Math.PI / 2, 0, 0.35); celuA.position.set(-0.42, MOS.alto + 0.01, 0.1); scene.add(celuA);
// parte 2: el celular parado en su soporte verde (el chat del agente; en el cierre, Sofi en videollamada)
const pantS = lienzo(600, 1100, (x, w, h) => {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 56); x.fillText("Chats", 30, 78);
  for (let i = 0; i < 5; i++) { const y = 190 + i * 180; x.fillStyle = "#ffffff"; rr(x, 20, y, w - 40, 150, 24); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(80, y + 75, 34, 0, 7); x.fill(); tilde(x, 81, y + 76, 34, "#0b1220", 8); x.fillStyle = "#0b1220"; x.font = F(800, 42); x.fillText(["Beto (obra)", "Luis", "Ana", "Ramón", "Marcos"][i], 136, y + 56); x.fillStyle = "#3fa60a"; x.font = F(800, 36); x.fillText("Contestado", 136, y + 106); }
});
const SOFI_RT = new THREE.WebGLRenderTarget(432, 768); SOFI_RT.texture.colorSpace = THREE.SRGBColorSpace;
const celuP = new THREE.Group(); celuP.position.set(-0.52, MOS.alto, 0.1); celuP.rotation.y = 0.12; celuP.scale.setScalar(1.35); scene.add(celuP);
let pantP;
{
  const S = 1.9, W = 0.08 * S, H = 0.165 * S;
  const piv = new THREE.Group(); piv.position.y = 0.035; piv.rotation.x = -0.18; celuP.add(piv);
  piv.add(mesh(rbox(W + 0.008, H + 0.008, 0.014, 0.014), mat(0x1a1c20, 0.4), 0, H / 2, 0));
  pantP = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: pantS, toneMapped: false })); pantP.position.set(0, H / 2, 0.0076); piv.add(pantP);
  celuP.add(caja(0.17, 0.02, 0.13, M.g, 0, 0.01, 0.0, 0.008)); celuP.add(caja(0.14, 0.08, 0.02, M.g, 0, 0.05, -0.06, 0.006));
  sombras(celuP);
}
// el monitor del mostrador (parte 2) en su brazo, con el panel
const pantMon = lienzo(1000, 760, (x, w, h) => dibujarPanel(x, w, h, 5));
const monitor = new THREE.Group(); monitor.position.set(-0.02, MOS.alto, -0.02); monitor.rotation.y = -0.18; scene.add(monitor);
{
  const W = 0.62, H = W * 0.76;
  monitor.add(caja(0.26, 0.02, 0.18, M.navy, 0, 0.01, 0, 0.008)); monitor.add(caja(0.05, 0.22, 0.04, M.navy, 0, 0.12, -0.02, 0.01));
  const p = new THREE.Group(); p.position.set(0, 0.22 + H / 2, 0); p.rotation.x = -0.08; monitor.add(p);
  p.add(mesh(rbox(W + 0.03, H + 0.03, 0.03, 0.01), mat(0x0b1220, 0.4), 0, 0, -0.012));
  const s = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: pantMon, toneMapped: false })); s.position.z = 0.0045; p.add(s);
  sombras(monitor);
}

// ---- Sofi en videollamada: una escena aparte que se renderiza a la textura del celular parado (Q5) ----
const sofi = crearPersonaje({ ...ELENCO.sofi, camisa: 0x2c4268, franja: null, cuello: MARCA.cr, cuelloBotones: false, cuelloFino: true, auricularFino: true, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
for (const sx of [-1, 1]) { const c = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.07, 24).rotateZ(Math.PI / 2), M.g, sx * 0.37, 0.24, 0.02); sofi.cabeza.add(c); const v = mesh(new THREE.TorusGeometry(0.36, 0.02, 8, 32, Math.PI), M.navy, 0, 0.27, 0.0); if (sx > 0) sofi.cabeza.add(v); }
const SOFI = { esc: new THREE.Scene(), cam: new THREE.PerspectiveCamera(28, 432 / 768, 0.05, 20) };
{
  SOFI.esc.background = new THREE.Color(0x16243d);
  SOFI.esc.add(new THREE.HemisphereLight(0xffffff, 0x6a7080, 2.0)); const dl = new THREE.DirectionalLight(0xfff4e8, 1.7); dl.position.set(1.2, 2.2, 3); SOFI.esc.add(dl);
  SOFI.esc.add(sofi.raiz);
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ color: 0x1f3254 })); fondo.position.set(0, 1.4, -0.9); SOFI.esc.add(fondo);
  const logoT = await new THREE.TextureLoader().loadAsync("assets/logo-blanco.png"); logoT.colorSpace = THREE.SRGBColorSpace;
  const ar = logoT.image.width / logoT.image.height;
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34 / ar), new THREE.MeshBasicMaterial({ map: logoT, transparent: true })); logo.position.set(0.24, 1.86, -0.88); SOFI.esc.add(logo);
}

// =====================================================================================================
// LAS TARJETAS DE ESTE REEL (globos, audios transcriptos, rótulos, chips)
// =====================================================================================================
const chip = (txt, px = 62, fondo = "#5ce611", tinta = "#0b1220") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo }); };
const CAB_B = { cv: AVATAR.beto, nombre: "Beto (obra) · audio" };
const GL = {
  lunes: chip("LUNES · 6:45", 58),
  hora: chip("LUNES · 7:58", 64),
  b1: crearGlobo(["Gustavo, ¿tenés", "[portland?] Cuarenta", "bolsas. Hoy llenamos", "la losa."], 60, { cab: CAB_B }),
  g1: crearGlobo(["¡Ya te [digo!]"], 86),
  c37: crearGlobo(["37…"], 96), c38: crearGlobo(["38…"], 96), c39: crearGlobo(["39…"], 96), c40: crearGlobo(["[¡40!]"], 140),
  g23: crearGlobo(["Beto espera.", "Es de la [casa.]"], 84),
  b2: crearGlobo(["Ya está, Gustavo.", "Me contestó [otro.]"], 70, { cab: CAB_B }),
  b3: crearGlobo(["Ya las están [bajando.]"], 70, { cab: CAB_B }),
  r1: crearRotulo([["40 bolsas · $ 20.800:", "#ff9d92", 58], ["con otro", "#ff9d92", 58]], 58),
  r2: crearRotulo([["27 mensajes", "#ff9d92", 54], ["sin contestar", "#ff9d92", 54]], 54),
  g4: crearGlobo(["Era de la [casa.]"], 92),
  t1: crearGlobo(["¿Me das una", "[bolsita] de portland?"], 76),
  rStock: crearRotulo([["Contesta con tu stock"], ["y tus precios"]], 54),
  g1b: crearGlobo(["¡Ya te [digo!]"], 86),
  g5: crearGlobo(["Ya le [dijo.]"], 96),
  rq2a: crearRotulo([["Toma el pedido con"], ["dirección y día"]], 52),
  rq2b: crearRotulo([["Te pasa lo que"], ["es para vos"]], 52),
  t1b: crearGlobo(["¿Me das una", "[bolsita] de portland?"], 76),
  g6: crearGlobo(["Las que quieras, [Tito.]"], 80),
  g3b: crearGlobo(["Es de la [casa.]"], 92),
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
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un
// plano, Catmull-Rom continua. Q1 repite el encuadre del cuadro 0 (callback). null = inserto a pantalla.
const P1C = (k) => [lerp(0.1, -0.05, k), lerp(1.85, 1.8, k), lerp(3.3, 2.85, k), -1.05, lerp(1.32, 1.3, k), -0.85, lerp(46, 44, k)];
const P2C = (k) => [lerp(1.15, 1.25, k), lerp(1.95, 1.9, k), lerp(-1.7, -2.0, k), 1.9, 1.05, -4.6, lerp(46, 44, k)];
const PLANOS = [
  ["P1", 0, [[0, ...P1C(0)], [T.p2, ...P1C(1)]]],
  // P2: el patio (la pila llena el cuadro, Gustavo detrás contando), cortado por los insertos del celular
  ["P2", T.p2, [[T.p2, ...P2C(0)], [T.p3, ...P2C(1)]]],
  ...T.ins.flatMap(([a, b], i) => [["P2i", a, null], [i < 2 ? "P2" : "P2b", b, [[T.p2, ...P2C(0)], [T.p3, ...P2C(1)]]]]),
  ["P3i", T.p3, null],
  ["P3", T.p3b, [[T.p3b, 0.15, 1.7, 1.8, -1.15, 1.38, -0.6, 42], [T.p4, 0.08, 1.68, 1.65, -1.15, 1.4, -0.6, 40]]],
  ["P4", T.p4, null],
  ["P5", T.p5, [[T.p5, -0.85, 1.78, 1.55, 1.9, 0.8, -4.3, 46], [T.p6, -0.8, 1.78, 1.45, 1.9, 0.8, -4.3, 45]]],
  ["P6", T.p6, [[T.p6, 1.0, 1.7, -4.0, 1.75, 1.6, -2.15, 34], [T.p7, 1.05, 1.7, -3.85, 1.75, 1.6, -2.15, 31]]],
  ["P7", T.p7, [[T.p7, -0.55, 1.75, -1.35, -1.38, 1.35, 0.7, 42], [T.gira, -0.6, 1.74, -1.3, -1.38, 1.35, 0.7, 40]]],
  // P7b: Gustavo de frente, gira despacio la cabeza hacia el portón (la pila al fondo)
  ["P7b", T.gira, [[T.gira, -0.95, 1.62, 1.5, -0.05, 1.4, -1.6, 42], [P1, -0.9, 1.62, 1.4, -0.05, 1.4, -1.6, 40]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...P1C(0)], [T.q1i, ...P1C(0.75)]]],
  ["Q1i", T.q1i, null],
  ["Q1g", T.q1g, [[T.q1g, 0.55, 1.98, 1.95, -1.15, 1.4, -0.9, 42], [T.q2, 0.48, 1.95, 1.8, -1.15, 1.4, -0.9, 40]]],
  ["Q2", T.q2, null],
  ["Q3", T.q3, [[T.q3, -2.95, 2.1, 1.65, -1.15, 1.25, -0.3, 48], [T.q3m, -2.8, 2.05, 1.5, -1.15, 1.25, -0.3, 46]]],
  ["Q3m", T.q3m, null],
  ["Q4", T.q4, null],
  ["Q4g", T.q4g, [[T.q4g, 1.35, 1.62, 2.1, 0.85, 1.35, -1.6, 42], [T.q5, 1.3, 1.62, 1.95, 0.85, 1.35, -1.6, 40]]],
  ["Q5", T.q5, [[T.q5, -0.2, 1.5, 2.2, -0.2, 1.42, -0.02, 47], [DUR, -0.2, 1.49, 1.98, -0.2, 1.42, -0.02, 46]]],
];

// =====================================================================================================
// POSES
// =====================================================================================================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.2, feliz: 0 }, cejas: { alto: -0.1, ang: -0.15 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.92, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } };
const SEGURO = { ...CARA.neutra, ojos: { abiertos: 0.9, feliz: 0.1 }, cejas: { alto: 0.25, ang: 0.1, asim: 0 }, boca: { sonrisa: 0.25, abierta: 0, ancho: 1.0 } };
const AMABLE = { ...CARA.sonrisa, ojos: { abiertos: 0.95, feliz: 0.3 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const manoA = (per, p, w, k, lado = "D") => { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "D" ? "manoD" : "manoI"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(k))); };
const HOOK = () => V3(TEL.x - 0.095, TEL.y + 0.0, TEL.z + 0.1);              // dónde cuelga el tubo
const BOLSA_TOP = (i) => { const b = BOLSAS[36 + i]; b.updateMatrixWorld(true); return b.getWorldPosition(new THREE.Vector3()).add(V3(0, BOL.h / 2 + 0.03, 0)); };
const PORT_G = { x: 1.75, z: -2.15 };   // Gustavo en el portón, mirando la pila (P5, P6)
const PILA_G = { x: 1.95, z: -5.15 };   // Gustavo detrás de la pila (de frente a la cámara), contando (P2)
const TITO_M = { x: -1.38, z: 0.7 };    // Tito con los codos en el mostrador (P7, Q3)
const FILA = [[-1.3, 1.15], [-2.0, 1.45], [-1.95, 2.15], [-2.6, 2.8], [-2.15, 3.5], [-2.8, 4.2]];
function poseGustavo(t) {
  const p2 = t >= P2;
  if (!p2) {
    if (t < T.p2) {
      // P1: el tubo en el oído derecho (mano derecha), mira el celular del mostrador; cuelga; "¡Ya te digo!"; sale
      const gT = dirGiro(G1.x, G1.z, TEL.x, TEL.z) + Math.PI * 2;
      const p = poseEn(t, [
        [0, { x: G1.x, z: G1.z, giro: 0.15, ladea: -0.05, ...aC(0.25, 0.32, -0.18), ...CARA.concentrada, ...BRAZOS.costado, ...BRAZOS.oreja, manoI: [0.2, 0.3, 0.32], codoI: [0.8, -0.6, -0.2] }],
        [T.b1 + 1.6, { ...aC(0.2, 0.36, -0.15), ...CARA.concentrada, cejas: { alto: 0.4, ang: 0.3 } }, 0.3],
        [T.cuelga - 0.25, { giro: gT * 0.0 - 0.6, ...aC(-0.3, 0.05) }, 0.3],
        [T.g1, { giro: 0.2, ...aC(0.25, 0.1), ...CARA.esperanza, ojos: { abiertos: 1 }, ...BRAZOS.costado }, 0.25],
        [T.sale[1], { giro: 1.4, ...aC(0.3, 0.0) }, 0.35],
      ]);
      // la mano derecha lleva el tubo a la horquilla
      const k = sg(t, T.cuelga - 0.35, T.cuelga - 0.05) * (1 - sg(t, T.cuelga + 0.1, T.cuelga + 0.35));
      manoA(gustavo, p, HOOK().add(V3(0.02, -0.02, 0.06)), k, "D");
      const u = sg(t, T.sale[0], T.sale[1] + 0.4);
      if (u > 0) { p.x = lerp(G1.x, 0.2, eio(u)); p.z = lerp(G1.z, -0.95, eio(u)); p.paso = 1; }
      p.t = t; bocaVoz(p, t, T.g1, ENV.g1, 0.65); return p;
    }
    if (t < T.p3) {
      // P2: al costado de la pila, cuenta con el dedo las de arriba (37, 38, 39) y palmea la de 40
      const p = poseEn(t, [[0, { x: PILA_G.x, z: PILA_G.z, giro: 0.1, inclina: 0.18, ...aC(-0.1, 0.45), ...CARA.concentrada, ...BRAZOS.costado }], [T.n40 - 0.1, { ...aC(0.3, 0.1), ...CARA.esperanza, ojos: { abiertos: 1, feliz: 0.4 }, boca: { sonrisa: 0.7, abierta: 0.25, ancho: 1.1 } }, 0.2]]);
      const quien = T.cuenta.filter((c) => t >= c - 0.25).length;   // a cuál apunta
      if (t < T.n40 - 0.25) { const i = Math.min(3, Math.max(0, quien - 1)); manoA(gustavo, p, BOLSA_TOP(i).add(V3(0, 0.06, 0)), sg(t, T.p2, T.p2 + 0.15), "D"); p.dedoD = 1; }
      else { manoA(gustavo, p, BOLSA_TOP(3).add(V3(0, 0.03 + 0.08 * (1 - sg(t, T.n40 - 0.1, T.n40)), 0)), 1, "D"); p.dedoD = 0; }
      p.t = t; return p;
    }
    if (t < T.p4) {
      // P3: de vuelta atrás del mostrador, agitado, con el celular; levanta un dedo: "Beto espera. Es de la casa."
      const p = poseEn(t, [
        [0, { x: G1.x, z: G1.z, giro: 0.35, ...aC(0.0, 0.42), ...CARA.concentrada, ...BRAZOS.celular }],
        [T.g2 - 0.1, { giro: 0.55, ...aC(0.35, 0.05), ...SEGURO, manoI: [0.08, 0.33, 0.3], codoI: [0.6, -0.8, -0.3], manoD: [-0.38, 0.5, 0.34], codoD: [-1, -0.4, 0.1], dedoD: 1 }, 0.22],
        [T.g3 + 0.1, { ...aC(0.4, 0.12, 0.08), ...SEGURO, boca: { sonrisa: 0.35, abierta: 0, ancho: 1.0 } }, 0.25],
      ]);
      p.t = t; bocaVoz(p, t, T.g2, ENV.g2, 0.6); bocaVoz(p, t, T.g3, ENV.g3, 0.6); return p;
    }
    if (t < T.p7) {
      // P5 · P6: en el portón, de espaldas, mira la pila; "Era de la casa."
      const gP = dirGiro(PORT_G.x, PORT_G.z, PILA_P.x, PILA_P.z);
      const p = poseEn(t, [[0, { x: PORT_G.x, z: PORT_G.z, giro: gP, ...aC(0, 0.12), ...SECO, ...BRAZOS.costado }], [T.g4 - 0.1, { ...aC(0.05, 0.1), ...SECO, cejas: { alto: 0.0, ang: 0.25 } }, 0.25]]);
      p.t = t; bocaVoz(p, t, T.g4, ENV.g4, 0.55); return p;
    }
    // P7: atrás del mostrador; Tito pide "una bolsita"; Gustavo gira despacio la cabeza hacia el portón
    const p = poseEn(t, [[0, { x: -0.45, z: G1.z, giro: -0.25, ...aC(-0.2, 0.08), ...SECO, ...BRAZOS.apoyado }], [T.gira + 0.45, { ...aC(1.25, 0.05), ...SECO, cejas: { alto: 0.05, ang: 0.3 } }, 0.45]]);
    p.t = t; return p;
  }
  // ---- parte 2 ----
  if (t < T.q2) {
    // Q1: atiende la fila tranquilo (escribe un remito); Q1g: "¡Ya te digo!" por costumbre, la mano al tubo; ding; mira
    // el celular parado: "Ya le dijo."
    const gC = dirGiro(G1.x, G1.z, celuP.position.x, celuP.position.z);
    const p = poseEn(t, [
      [0, { x: G1.x, z: G1.z, giro: 0.1, ...aC(0.05, 0.35), ...MEDIA, ...BRAZOS.escribe }],
      [T.g1b - 0.1, { giro: -0.35, ...aC(-0.45, 0.0), ...CARA.esperanza, ojos: { abiertos: 1 }, ...BRAZOS.costado }, 0.25],
      [T.ding + 0.2, { giro: gC * 0.5, ...aC(0.55, 0.3), ...CARA.sorpresa, boca: { sonrisa: 0.3, abierta: 0, ancho: 0.9 } }, 0.25],
      [T.g5 - 0.05, { ...aC(0.5, 0.26), ...MEDIA, cejas: { alto: 0.75, ang: 0.2, asim: 0.4 } }, 0.2],
    ]);
    const k = sg(t, T.g1b - 0.2, T.g1b + 0.15) * (1 - sg(t, T.ding + 0.05, T.ding + 0.35));
    manoA(gustavo, p, HOOK().add(V3(0.0, 0.02, 0.07)), k, "D");
    p.t = t; bocaVoz(p, t, T.g1b, ENV.g1, 0.65); bocaVoz(p, t, T.g5, ENV.g5, 0.6); return p;
  }
  if (t < T.q4) {
    // Q3: Tito en el mostrador; "Las que quieras, Tito." y le apoya una bolsa adelante
    const p = poseEn(t, [[0, { x: G1.x - 0.15, z: G1.z, giro: -0.2, ...aC(-0.2, 0.12), ...AMABLE, ...BRAZOS.costado }], [T.g6 - 0.1, { ...aC(-0.25, 0.1), ...AMABLE }, 0.25]]);
    const k = sg(t, T.g6 - 0.3, T.g6) ;
    if (k > 0) { const b = bolsaQ3(t); manoA(gustavo, p, b.clone().add(V3(0.26, 0.02, -0.04)), k, "I"); manoA(gustavo, p, b.clone().add(V3(-0.26, 0.02, -0.04)), k, "D"); p.inclina = 0.12 * k; }
    p.t = t; bocaVoz(p, t, T.g6, ENV.g6, 0.6); return p;
  }
  // Q4g: en la punta del mostrador, con el portón atrás (el pallet vacío): "Es de la casa."; Q5: atiende al fondo
  const p = poseEn(t, [[0, { x: 0.68, z: -0.62, giro: 0.25, ...aC(-0.15, 0.08), ...MEDIA, ...BRAZOS.apoyado }], [T.g3b - 0.05, { ...aC(-0.2, 0.05), ...AMABLE, cejas: { alto: 0.3, ang: 0.1 } }, 0.25], [T.q5 + 0.1, { x: G1.x - 0.4, giro: 0.2, ...aC(0.2, 0.3), ...MEDIA, ...BRAZOS.escribe }, 0.01]]);
  p.t = t; bocaVoz(p, t, T.g3b, ENV.g3, 0.6); return p;
}
// la bolsa que Gustavo le pone a Tito en el mostrador (Q3): sube desde abajo del mostrador y se apoya
function bolsaQ3(t) { const u = eio(sg(t, T.g6, T.apoya)); return V3(lerp(-1.2, -1.32, u), lerp(0.62, MOS.alto + BOL.h / 2, u) + Math.sin(u * Math.PI) * 0.18, lerp(-0.55, 0.12, u)); }
function poseTito(t) {
  const p2 = t >= P2;
  const mostrador = (!p2 && t >= T.p7) || (p2 && t >= T.q3 && t < T.q4);
  if (mostrador) {
    const t0 = p2 ? T.t1b : T.t1;
    const p = poseEn(t, [[0, { x: TITO_M.x, z: TITO_M.z, giro: Math.PI + 0.12, inclina: 0.28, ...aC(0.0, -0.25), ...AMABLE, ...BRAZOS.apoyado, manoI: [0.24, 0.3, 0.34], manoD: [-0.24, 0.3, 0.34] }]]);
    if (!p2 && t >= T.dedo) { p.manoD = [-0.12, 0.52, 0.42]; p.codoD = [-0.8, -0.6, 0]; p.dedoD = 1; }
    if (p2 && t >= T.apoya) Object.assign(p, { ...CARA.feliz, ...aC(0.1, -0.05) });
    p.t = t; bocaVoz(p, t, t0, ENV.t1, 0.6); return p;
  }
  // en la fila (segundo), de espaldas al cuadro 0
  const [x, z] = FILA[1];
  const p = poseEn(t, [[0, { x, z, giro: Math.PI - 0.2, ...aC(0.1, 0.05), ...CARA.neutra, ...BRAZOS.costado }]]); p.t = t; return p;
}
function poseAlb(i, t) {
  const [x, z] = FILA[i === 1 ? 4 : i === 4 ? 5 : i];
  const g = Math.PI - 0.45 + [0.1, 0, -0.15, 0.2, -0.1][i];
  const p = poseEn(t, [[0, { x, z, giro: g, ...aC([0.15, 0, -0.2, 0.3, 0][i], 0.05), ...CARA.neutra, ...BRAZOS.costado }]]);
  // el primero de la fila le señala el celular a Gustavo con la cabeza (P3)
  if (i === 0 && t >= T.p3b && t < T.p4) Object.assign(p, poseEn(t, [[T.p3b, { ...aC(0.0, 0.1) }], [T.p3b + 0.25, { ...aC(0.35, 0.35) }, 0.2], [T.g2 + 0.3, { ...aC(0.1, 0.05), ...CARA.incredula, ojos: { abiertos: 0.85 } }, 0.25]]));
  if (i === 4) { const u = sg(t, T.p2 + 0.3, T.p3); p.x = lerp(-0.5, x, eo(u)); p.z = lerp(5.5, z, eo(u)); if (u > 0 && u < 1) p.paso = 1; }
  p.t = t; return p;
}
function poseSofi(t) {
  const p = poseEn(t, [[0, { x: 0, z: 0, giro: 0, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.f1 + 1.2, { ...aC(0.08, 0.02), manoD: [-0.2, 0.4, 0.32], codoD: [-0.8, -0.6, 0] }, 0.4]]);
  const habla = sg(t, T.f1 - 0.15, T.f1) * (1 - sg(t, T.f1 + LEN.f1, T.f1 + LEN.f1 + 0.2));
  p.boca.sonrisa = lerp(p.boca.sonrisa, 0.15, habla);
  p.t = t; bocaVoz(p, t, T.f1, ENV.f1, 0.6); return p;
}

// =====================================================================================================
// RENDER
// =====================================================================================================
const _a = new THREE.Vector3(), _q = new THREE.Quaternion();
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  ponerSol(1.0, -2.5);
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  // ---- personajes ----
  gustavo.poner(poseGustavo(t));
  tito.poner(poseTito(t));
  ALB.forEach((a, i) => { a.poner(poseAlb(i, t)); });
  // quién se ve: en P7 y Q3 Tito está en el mostrador (el segundo lugar de la fila queda vacío)
  ALB[4].raiz.visible = t >= T.p2 + 0.3;
  for (const a of ALB) a.raiz.visible = a === ALB[4] ? ALB[4].raiz.visible : true;
  if (pa === "Q5" || pa === "Q4g") for (const a of ALB) a.raiz.visible = false;
  if (pa === "Q3") ALB[0].raiz.visible = false;
  // ---- el tubo y el cable: en la mano de Gustavo (P1 hasta colgar) o en la horquilla ----
  const enMano = (!p2 && t < T.cuelga) || (p2 && t >= T.g1b - 0.05 && t < T.ding + 0.2);
  if (enMano) {
    const m = manoMundo(gustavo, "D", _a); gustavo.cuerpo.getWorldQuaternion(_q);
    TUBO.position.copy(m).add(V3(0, 0.03, 0)); TUBO.quaternion.copy(_q); TUBO.rotateX(-0.2); TUBO.rotateZ(0.5);
  } else { TUBO.position.copy(HOOK()).add(V3(0, -0.02, 0.025)); TUBO.rotation.set(0, 0, 0); }
  TUBO.updateMatrixWorld(true);
  ponerCable(V3(TEL.x + 0.0, TEL.y - 0.14, TEL.z + 0.06), TUBO.localToWorld(V3(0, -0.11, 0.0)));
  // ---- la pila: las 4 de arriba brillan cuando las cuenta; en la parte 2 el pallet queda vacío desde Q4 ----
  const vacio = p2 && t >= T.q4;
  BOLSAS.forEach((b) => (b.visible = !vacio));
  MTOP.forEach((m, i) => { const tc = i < 3 ? T.cuenta[i] : T.n40; const k = !p2 && t >= tc && t < tc + 0.25 ? 1 - (t - tc) / 0.25 : 0; for (const mm of [m.lado, m.tapa]) { mm.emissive.setHex(0xfff4d8); mm.emissiveIntensity = 0.45 * k; } });
  // ---- la bolsa de Tito (Q3), el polvo (palmada en P2, bolsa en el mostrador en Q3) ----
  BOLSA_MANO.visible = p2 && t >= T.g6 && t < T.q4;
  if (BOLSA_MANO.visible) { BOLSA_MANO.position.copy(bolsaQ3(t)); BOLSA_MANO.rotation.set(0, 0.12, 0); }
  if (!p2) ponerPolvo(t, T.n40, BOLSA_TOP(3).add(V3(0, -0.02, 0))); else ponerPolvo(t, T.apoya, V3(-1.32, MOS.alto + 0.06, 0.12));
  // ---- los objetos del mostrador: el celular acostado (parte 1), el parado y el monitor (parte 2) ----
  celuA.visible = !p2 && !(t >= T.sale[0] && t < T.p5);   // se lo lleva al patio
  if (!p2 && t >= T.p3b && t < T.p4) { celuA.visible = true; const a = manoMundo(gustavo, "I", _a); gustavo.cuerpo.getWorldQuaternion(_q); celuA.position.copy(a).add(V3(0, 0.06, 0)); celuA.quaternion.copy(_q); celuA.rotateX(-0.9); }
  else if (!p2 && t >= T.p5) { celuA.position.set(0.05, MOS.alto + 0.01, 0.12); celuA.rotation.set(-Math.PI / 2, 0, -0.4); }
  else { celuA.position.set(-0.42, MOS.alto + 0.01, 0.1); celuA.rotation.set(-Math.PI / 2, 0, 0.35); }
  celuP.visible = p2; monitor.visible = p2;
  pantP.material.map = pa === "Q5" ? SOFI_RT.texture : pantS;
  if (pa === "Q5") {
    sofi.poner(poseSofi(t)); sofi.raiz.updateMatrixWorld(true);
    const c = sofi.cabeza.localToWorld(V3(0, 0.2, 0));
    SOFI.cam.position.set(c.x + 0.05, c.y + 0.02, c.z + 2.75); SOFI.cam.lookAt(c.x, c.y - 0.28, c.z);
    renderer.setRenderTarget(SOFI_RT); renderer.render(SOFI.esc, SOFI.cam); renderer.setRenderTarget(null);
  }
  // ---- insertos ----
  const INS = { P2i: INS1, P3i: INS1, P4: INS1, Q1i: INS1, Q2: INS1, Q4: INS1, Q3m: INS3 }[pa];
  for (const I of [INS1, INS3]) I.g.visible = I === INS;
  if (INS) {
    if (INS === INS1) dibujarCel(t, pa); else dibujarMonInserto(t);
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.4), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.035, eo(k)));
  }
  for (const p of [...TODOS]) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- portada (VER=portada): el cuadro 0 sin capa plana ----
  // ---- tarjetas ----
  for (const k in GL) GL[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const boca = (per) => bocaPx(per);
    if (pa === "P1") {
      ponerGlobo(GL.lunes, 540, 485, 1, null);
      const [cx, cy] = objPx(celuA);
      if (t >= T.b1) ponerGlobo(GL.b1, 540, 1560, ent(T.b1), t < T.b1 + LEN.b1 + 0.1 ? [cx, cy] : null, 1);
      if (t >= T.g1) { const [bx, by] = boca(gustavo); ponerGlobo(GL.g1, 700, 640, ent(T.g1), [bx, by - 30], 2); }
    }
    if (pa === "P2" || pa === "P2b") {
      const [bx, by] = objPx(BOLSAS[36], V3(0, 0.3, 0));
      const n = T.cuenta.filter((c) => t >= c).length;
      if (t < T.n40 && n > 0) ponerGlobo([GL.c37, GL.c38, GL.c39][n - 1], 360, 520, ent(T.cuenta[n - 1]), [bx, by]);
      if (t >= T.n40) ponerGlobo(GL.c40, 540, 520, ent(T.n40), [bx, by]);
    }
    if (pa === "P3") {
      const [bx, by] = boca(gustavo);
      if (t >= T.g2) { verGlobo(GL.g23, t >= T.g3 ? 9 : 2); ponerGlobo(GL.g23, 560, 440, ent(T.g2), [bx, by - 30]); }
    }
    if (pa === "P4") {
      if (t >= T.b2 && t < T.b3) ponerGlobo(GL.b2, 540, 200, ent(T.b2), null);
      if (t >= T.b3) ponerGlobo(GL.b3, 540, 200, ent(T.b3), null);
    }
    if (pa === "P5") {
      const [ax, ay] = objPx(BOLSAS[38], V3(0, 0.1, 0)), [ex, ey] = objPx(celuA);
      const u0 = ent(T.rot[0]), u1 = ent(T.rot[1]);
      ponerGlobo(GL.r1, 540, 330, u0, null, 1); if (u0 > 0) ponerGuia(GUIAS[0], 540, 400, ax, ay, eo(sg(t, T.rot[0], T.rot[0] + 0.25)));
      ponerGlobo(GL.r2, 330, 1500, u1, null, 1); if (u1 > 0) ponerGuia(GUIAS[1], 330, 1430, ex, ey, eo(sg(t, T.rot[1], T.rot[1] + 0.25)));
    }
    if (pa === "P6" && t >= T.g4) { const [bx, by] = boca(gustavo); ponerGlobo(GL.g4, 540, 330, ent(T.g4), [bx, by - 40]); }
    if (pa === "P7" && t >= T.t1) { const [bx, by] = boca(tito); ponerGlobo(GL.t1, 540, 360, ent(T.t1), t < T.gira + 0.3 ? [bx, by - 40] : null); }
    if (pa === "Q1") {
      ponerGlobo(GL.lunes, 540, 485, 1, null);
      const [cx, cy] = objPx(celuP, V3(0, 0.2, 0));
      if (t >= T.b1b) ponerGlobo(GL.b1, 540, 1560, ent(T.b1b), [cx, cy], 1);
    }
    if (pa === "Q1i") {
      ponerGlobo(GL.rStock, 540, 190, ent(T.q1i + 0.25), null, 1);
    }
    if (pa === "Q1g") {
      if (t >= T.g1b && t < T.ding + 0.15) { const [bx, by] = boca(gustavo); ponerGlobo(GL.g1b, 560, 420, ent(T.g1b), [bx, by - 30]); }
      if (t >= T.g5) { const [bx, by] = boca(gustavo); ponerGlobo(GL.g5, 560, 420, ent(T.g5), [bx, by - 30]); }
    }
    if (pa === "Q2") { ponerGlobo(GL.rq2a, 540, 175, ent(T.rq2[0]), null); if (t >= T.rq2[1]) ponerGlobo(GL.rq2b, 540, 1805, ent(T.rq2[1]), null, 1); }
    if (pa === "Q3") {
      if (t >= T.t1b && t < T.g6) { const [bx, by] = boca(tito); ponerGlobo(GL.t1b, 560, 380, ent(T.t1b), [bx, by - 40]); }
      if (t >= T.g6) { const [bx, by] = boca(gustavo); ponerGlobo(GL.g6, 540, 380, ent(T.g6), [bx, by - 30]); }
    }
    if (pa === "Q3m") ponerGlobo(GL.hora, 540, 330, ent(T.q3m + 0.05), null);
  if (pa === "Q4") { if (t >= T.b3b) ponerGlobo(GL.b3, 540, 200, ent(T.b3b), null); }
    if (pa === "Q4g" && t >= T.g3b) { const [bx, by] = boca(gustavo); ponerGlobo(GL.g3b, 540, 400, ent(T.g3b), [bx, by - 30]); }
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, gustavo: bocaPx(gustavo), tito: bocaPx(tito) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
