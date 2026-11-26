// Capa 3D de taller-service (Three.js r170 local). Infraestructura de reels/importadora-dolar (tarjetas pegadas a la cámara,
// globos en dos tiempos con CORTE, globos fijos para los callbacks, camPantalla, avatares por render target, `fusionar`) y
// el taller "Mecánica Óscar" de reels/taller-esta-pronto (paredes, portón a la calle, elevador de dos columnas, el auto de
// juguete). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// LUGARES: el taller (piso y = 0, pared del fondo z = -5 con el portón a la calle) y el interior del auto de Walter (x = 40,
// visto desde el asiento del conductor: el parabrisas con el papelito y el tablero con el cuentakilómetros).
//   PARTE 1: Marzo 18:00, el papelito: "Listo, Walter. Volvé a los diez mil kilómetros." / "¡Obvio! Vos sos mi mecánico." ·
//            el montaje (el papelito se destiñe, 91.000 → 125.000) · el martes vacío: "Jefe, ¿hoy no viene nadie?" / "Ya
//            vuelven. Tienen el papelito." · la grúa: "Óscar, no entiendo…" · el papelito en blanco, 125.000 km · "Volviste
//            a los diez mil, Walter. Cuatro veces." · "Ponele otro papelito, así no me olvido."
//   PARTE 2: la ficha en la tablet · el WhatsApp a Walter con el turno · el panel "Les toca este mes" · "Ya vinieron. Tenían
//            el aviso." · Walter entra manejando: "¡Volví a los diez mil!" / "Una vez. Así me gusta." · "¿No me ponés el
//            papelito?" / "El papelito ahora te escribe." · Óscar a cámara: "Comentá SERVICE…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, MARCA, CARA, BRAZOS, pegarACamara, crearCelular, crearTablet, crearMate } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, CORTE, LIMPIO, VER as VERM } from "./tiempos3d.js";
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
renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe9ece6);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 160);
camera.layers.enable(1);
scene.add(camera);
{
  const env = new THREE.Scene(); env.background = new THREE.Color(0x6a6a66);
  const tira = (w, h, x, y, z, ry, c, k) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide })); m.position.set(x, y, z); m.rotation.y = ry; env.add(m); };
  tira(10, 1.2, 0, 7, 0, 0, 0xf4f6f2, 1.4); tira(4, 6, 0, 2, -6, 0, 0xf6f6ee, 1.3); tira(1.4, 8, -4, 1, 6, 0, 0xe8eeff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(env, 0.035).texture; pm.dispose();
  scene.environmentIntensity = 0.45;
}

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, blanco: 0xf6f5f0, kraft: 0xc9a46b };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.75), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.75), cr2: mat(C.cr2, 0.75), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  acero: mat(0x8f969f, 0.35, { metalness: 0.6 }), goma: mat(0x23262c, 0.85), madera: mat(0xb98d5e, 0.8), pared: mat(0xece9dc, 0.92),
  asfalto: mat(0x50545c, 0.95), hormigon: mat(0xd9d7c9, 0.85), paragolpe: mat(0x3a3f4a, 0.6), kraft: mat(C.kraft, 0.85), chasis: mat(0x2e3238, 0.6, { metalness: 0.2 }),
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
const rr = (x, X, Y, W, H, R) => { x.beginPath(); x.roundRect(X, Y, W, H, R); x.fill(); };
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
function fusionar(grupo, excluir = []) {
  grupo.updateMatrixWorld(true);
  const inv = grupo.matrixWorld.clone().invert();
  const fuera = new Set(); for (const e of excluir) e.traverse((o) => fuera.add(o));
  const porMat = new Map(), quitar = [];
  grupo.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh || fuera.has(o) || Array.isArray(o.material) || o.material.transparent || !o.visible) return;
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

// ---------- luces del taller: la tarde entra por el portón ----------
const sol = new THREE.DirectionalLight(0xfff3e0, 1.55);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 0.5, far: 40 });
scene.add(sol, sol.target);
sol.position.set(4, 9, -11); sol.target.position.set(0.5, 0.6, -1.5);
const cielo = new THREE.HemisphereLight(0xf8faf6, 0x8a8678, 1.75); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xf4f6ff, 0.8); relleno.position.set(2, 3.5, 9); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xfff6e6, 0.45); rim.position.set(-4, 5, -10); scene.add(rim);

// =====================================================================================================
// EL AUTO: el de juguete de los talleres, ahora también hatchback (Walter: blanco, sin marca), con la puerta del conductor
// que se abre. Mira hacia +z; su izquierda (el lado del conductor) es +x. Origen en el piso, en el centro.
// =====================================================================================================
const llantaT = lienzo(256, 256, (x, w) => { x.fillStyle = "#23262c"; x.fillRect(0, 0, w, w); x.fillStyle = "#efeee5"; x.beginPath(); x.arc(w / 2, w / 2, w * 0.3, 0, 7); x.fill(); x.fillStyle = "#b4b2a3"; for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; x.beginPath(); x.arc(w / 2 + Math.cos(a) * w * 0.17, w / 2 + Math.sin(a) * w * 0.17, w * 0.045, 0, 7); x.fill(); } x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, w / 2, w * 0.07, 0, 7); x.fill(); });
const ML = { vidrio: mat(0x3a5480, 0.3, { metalness: 0.2, transparent: true, opacity: 0.6, depthWrite: false }), interior: mat(0x1f3254, 0.9), faro: new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff4d0, emissiveIntensity: 0.6, roughness: 0.2 }), llanta: new THREE.MeshStandardMaterial({ map: llantaT, roughness: 0.6 }) };
function crearRueda() { const r = new THREE.Group(); const cub = mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 28), [M.goma, ML.llanta, ML.llanta]); cub.rotation.z = Math.PI / 2; r.add(cub); return sombras(r); }
function crearAuto(color, patente, { hatch = false, puerta = false } = {}) {
  const carro = mat(color, 0.42);
  const patenteT = lienzo(512, 150, (x, w, h) => { x.fillStyle = "#f8f7f2"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, patente, 800, 104, w - 50); x.fillText(patente, w / 2, h / 2 + 4); });
  const g = new THREE.Group();
  const L = hatch ? 3.05 : 3.3, W = 1.5;
  g.add(caja(W, 0.5, L, carro, 0, 0.53, 0, 0.16));
  const capot = new THREE.Group(); capot.position.set(0, 0.77, L / 2 - 1.09); g.add(capot);
  capot.add(caja(W - 0.04, 0.08, 1.05, carro, 0, 0, 0.52, 0.04));
  const cab = new THREE.Group(); g.add(cab);
  const zA = L / 2 - 1.07;   // el pie del parabrisas
  let para;
  if (hatch) {
    // techo largo hasta atrás, luneta casi vertical, sin baúl
    cab.add(caja(W - 0.06, 0.13, 1.78, M.navy3, 0, 1.26, zA - 0.97, 0.06));
    for (const sx of [-1, 1]) for (const [z, inc] of [[zA, -0.35], [zA - 0.72, 0], [-L / 2 + 0.22, 0.12]]) { const p = caja(0.07, 0.44, 0.09, carro, sx * (W / 2 - 0.08), 1.02, z, 0.02); p.rotation.x = inc; cab.add(p); }
    para = caja(W - 0.18, 0.46, 0.03, ML.vidrio, 0, 1.02, zA + 0.04, 0.02); para.rotation.x = -0.6; cab.add(para);
    const luneta = caja(W - 0.18, 0.44, 0.03, ML.vidrio, 0, 1.02, -L / 2 + 0.2, 0.02); luneta.rotation.x = 0.12; cab.add(luneta);
    for (const sx of [-1, 1]) { cab.add(caja(0.03, 0.36, 0.64, ML.vidrio, sx * (W / 2 - 0.08), 1.02, zA - 0.38, 0.02)); cab.add(caja(0.03, 0.36, 0.78, ML.vidrio, sx * (W / 2 - 0.08), 1.02, zA - 1.14, 0.02)); }
    g.add(caja(W - 0.3, 0.06, 0.03, M.navy3, 0, 0.92, -L / 2 + 0.02, 0.01));   // el labio del portón trasero
  } else {
    cab.add(caja(W - 0.06, 0.13, 1.5, M.navy3, 0, 1.26, -0.15, 0.06));
    for (const sx of [-1, 1]) for (const [z, inc] of [[0.58, -0.35], [-0.12, 0], [-0.88, 0.3]]) { const p = caja(0.07, 0.44, 0.08, carro, sx * (W / 2 - 0.08), 1.02, z, 0.02); p.rotation.x = inc; cab.add(p); }
    para = caja(W - 0.18, 0.46, 0.03, ML.vidrio, 0, 1.02, 0.62, 0.02); para.rotation.x = -0.6; cab.add(para);
    const luneta = caja(W - 0.18, 0.44, 0.03, ML.vidrio, 0, 1.02, -0.92, 0.02); luneta.rotation.x = 0.5; cab.add(luneta);
    for (const sx of [-1, 1]) { cab.add(caja(0.03, 0.36, 0.66, ML.vidrio, sx * (W / 2 - 0.08), 1.02, -0.5, 0.02)); cab.add(caja(0.03, 0.36, 0.6, ML.vidrio, sx * (W / 2 - 0.08), 1.02, 0.24, 0.02)); }
    g.add(caja(W - 0.04, 0.1, 0.75, carro, 0, 0.79, -1.22, 0.05));
  }
  for (const z of [zA - 0.3, zA - 1.0]) cab.add(caja(W - 0.3, 0.42, 0.42, ML.interior, 0, 0.9, z, 0.06));
  for (const sx of [-1, 1]) { const lp = caja(0.5, 0.025, 0.025, M.navy, sx * 0.3, 0.84, zA + 0.2, 0.008); lp.rotation.z = sx * 0.12; g.add(lp); }   // (r2) los limpiaparabrisas
  { const vo = mesh(new THREE.TorusGeometry(0.16, 0.022, 8, 24), M.navy, 0.35, 1.0, zA - 0.2); vo.rotation.x = -0.9; cab.add(vo); }   // (r2) el volante (se ve por el vidrio)
  for (const sx of [-1, 1]) { const f = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.04, 20), ML.faro, sx * 0.5, 0.64, L / 2 + 0.01); f.rotation.x = Math.PI / 2; g.add(f); g.add(caja(0.26, 0.1, 0.04, M.red, sx * 0.52, 0.66, -L / 2 - 0.005, 0.02)); }
  for (let i = 0; i < 3; i++) g.add(caja(0.52, 0.035, 0.03, M.navy3, 0, 0.58 + i * 0.07, L / 2 + 0.01, 0.01));
  for (const sz of [-1, 1]) {
    g.add(caja(W + 0.04, 0.16, 0.14, M.paragolpe, 0, 0.36, sz * (L / 2 + 0.02), 0.05));
    const pat = plano(0.42, 0.123, patenteT, 0, 0.37, sz * (L / 2 + 0.095)); if (sz < 0) pat.rotation.y = Math.PI; g.add(pat);
  }
  for (const sx of [-1, 1]) g.add(caja(0.1, 0.07, 0.12, carro, sx * (W / 2 + 0.04), 0.9, zA - 0.03, 0.02));   // espejos
  // la panza (se ve desde abajo en el elevador)
  g.add(caja(W - 0.2, 0.03, L - 0.5, M.navy3, 0, 0.27, 0, 0.01));
  const ruedas = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const r = crearRueda(); r.position.set(sx * (W / 2 - 0.08), 0.3, sz * (L / 2 - 0.58)); g.add(r); r.userData = { sx, sz }; ruedas.push(r); }
  // la puerta del conductor (+x): bisagra adelante, se abre hacia afuera
  let puertaG = null;
  if (puerta) {
    puertaG = new THREE.Group(); puertaG.position.set(W / 2 + 0.012, 0, zA - 0.02); g.add(puertaG);
    puertaG.add(caja(0.04, 0.5, 0.92, carro, 0, 0.55, -0.46, 0.03));
    puertaG.add(caja(0.03, 0.36, 0.84, ML.vidrio, -0.005, 1.0, -0.48, 0.02));
    puertaG.add(caja(0.035, 0.06, 0.88, carro, 0, 1.2, -0.46, 0.02));
    puertaG.add(caja(0.03, 0.03, 0.14, M.paragolpe, 0.025, 0.72, -0.76, 0.01));   // la manija
  } else {
    for (const sx of [-1, 1]) for (const z of [zA - 0.4, zA - 1.1]) g.add(caja(0.02, 0.03, 0.12, M.paragolpe, sx * (W / 2 + 0.005), 0.72, z, 0.01));
  }
  g.userData = { ruedas, capot, para, cab, puerta: puertaG, L, W, zA, patentes: g.children.filter((o) => o.isMesh && o.material.map === patenteT) };
  return sombras(g);
}

// =====================================================================================================
// EL TALLER "MECÁNICA ÓSCAR": pared del fondo z = -5 con el portón a la calle (a la derecha), el elevador de dos columnas a
// la izquierda, el banco de trabajo con cajón y la tablet en el atril, la pila de cubiertas, el panel de herramientas, el
// tablero de llaves y el cartel con el nombre arriba del portón
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const ZF = -5.0, HW = 4.4;
const PORTON = { x0: -0.6, x1: 3.5, alto: 3.0 }, PCX = (PORTON.x0 + PORTON.x1) / 2;
const LX = -2.75, LZ = -2.75;
const COL = [LX - 1.3, LX + 1.3];
const BANCO = { x: -2.85, z: 1.05, L: 2.0, P: 0.7, alto: 0.94 };   // el banco de trabajo, largo en x, de frente a la cámara
const CUB = { x: -1.05, z: -0.9 };                                   // la pila de cubiertas (Maxi se sienta)
const CARPOS = { x: PCX, z: -3.0 };                                 // donde queda el auto de Walter (P1, Q1, Q4, Q5)
const bloqueT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; for (let i = 0; i < 4; i++) { x.fillRect(0, i * 128, w, 6); for (let j = 0; j < 3; j++) x.fillRect(((j * 2 + (i % 2)) * 256) / 2 % w, i * 128, 6, 128); } });
bloqueT.wrapS = bloqueT.wrapT = THREE.RepeatWrapping;
let luzPorton;
{
  const piso = mesh(new THREE.PlaneGeometry(13, 15), M.hormigon, 0, 0, 2.0); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  const franja = (w, d, x, z) => { const f = mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ color: C.g }), x, 0.004, z); f.rotation.x = -Math.PI / 2; f.castShadow = false; SET.add(f); };
  const fx0 = COL[0] - 0.45, fx1 = COL[1] + 0.45, fz0 = LZ - 1.85, fz1 = LZ + 1.85;
  franja(fx1 - fx0, 0.09, (fx0 + fx1) / 2, fz0); franja(fx1 - fx0, 0.09, (fx0 + fx1) / 2, fz1); franja(0.09, fz1 - fz0, fx0, (fz0 + fz1) / 2); franja(0.09, fz1 - fz0, fx1, (fz0 + fz1) / 2);
  { const s = new THREE.Shape(); s.moveTo(PORTON.x0, 0); s.lineTo(PORTON.x1, 0); s.lineTo(PORTON.x1 + 0.9, 2.6); s.lineTo(PORTON.x0 + 0.5, 2.6); s.closePath();
    luzPorton = new THREE.Mesh(new THREE.ShapeGeometry(s), new THREE.MeshBasicMaterial({ color: 0xf6efdc, transparent: true, opacity: 0.5, depthWrite: false })); luzPorton.rotation.x = Math.PI / 2; luzPorton.position.set(0, 0.006, ZF); luzPorton.renderOrder = 1; scene.add(luzPorton); }
  const tramo = (x0, x1, y0, y1, z = ZF) => {
    const w = x1 - x0;
    if (y0 < 2.2) { const hb = Math.min(2.2, y1) - y0, t = bloqueT.clone(); t.needsUpdate = true; t.repeat.set(w / 1.6, hb / 1.6); const b = mesh(new THREE.BoxGeometry(w, hb, 0.2), [M.navy2, M.navy2, M.navy2, M.navy2, new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }), M.navy2], (x0 + x1) / 2, y0 + hb / 2, z); b.castShadow = false; SET.add(b); }
    if (y1 > 2.2) { const y = Math.max(2.2, y0), c = mesh(new THREE.BoxGeometry(w, y1 - y, 0.2), M.pared, (x0 + x1) / 2, (y + y1) / 2, z); c.castShadow = false; SET.add(c); }
  };
  tramo(-6.5, PORTON.x0, 0, HW); tramo(PORTON.x1, 6.5, 0, HW); tramo(PORTON.x0, PORTON.x1, PORTON.alto, HW);
  for (const sx of [-1, 1]) { const g = new THREE.Group(); g.position.set(sx * 6.4, 0, 0); g.rotation.y = -sx * Math.PI / 2; SET.add(g); const b = mesh(new THREE.BoxGeometry(15, 2.2, 0.2), M.navy2, 0, 1.1, 0); b.castShadow = false; g.add(b); const c = mesh(new THREE.BoxGeometry(15, HW - 2.2, 0.2), M.pared, 0, 2.2 + (HW - 2.2) / 2, 0); c.castShadow = false; g.add(c); }
  { const b = mesh(new THREE.BoxGeometry(13, 2.2, 0.2), M.navy2, 0, 1.1, 9.0); b.castShadow = false; SET.add(b); const c = mesh(new THREE.BoxGeometry(13, HW - 2.2, 0.2), M.pared, 0, 2.2 + (HW - 2.2) / 2, 9.0); c.castShadow = false; SET.add(c); }
  const techo = mesh(new THREE.PlaneGeometry(13, 15), new THREE.MeshBasicMaterial({ color: 0xdedbcd }), 0, HW, 2.0); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
  for (const z of [-2.5, 1.0, 4.5]) SET.add(caja(13, 0.22, 0.2, M.navy3, 0, HW - 0.11, z, 0.01));
  for (const x of [PORTON.x0 - 0.08, PORTON.x1 + 0.08]) SET.add(caja(0.16, PORTON.alto + 0.1, 0.3, M.navy3, x, (PORTON.alto + 0.1) / 2, ZF + 0.08, 0.02));
  SET.add(caja(PORTON.x1 - PORTON.x0 + 0.32, 0.16, 0.3, M.navy3, PCX, PORTON.alto + 0.04, ZF + 0.08, 0.02));
  { const rollo = mesh(new THREE.CylinderGeometry(0.2, 0.2, PORTON.x1 - PORTON.x0 + 0.2, 28), M.cr, PCX, PORTON.alto + 0.25, ZF + 0.36); rollo.rotation.z = Math.PI / 2; SET.add(rollo); }
  SET.add(caja(PORTON.x1 - PORTON.x0, 0.05, 0.12, M.cr3, PCX, 0.025, ZF + 0.12, 0.01));
  // el cartel "MECÁNICA ÓSCAR" arriba del portón (inventado; navy con letras crema)
  const nomT = lienzo(1024, 200, (x, w, h) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.fillStyle = "#5ce611"; x.fillRect(0, h - 22, w, 22); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "MECÁNICA ÓSCAR", 900, 120, w - 80); x.fillText("MECÁNICA ÓSCAR", w / 2, h / 2 - 4); });
  const cartelIn = plano(2.9, 0.56, nomT, PCX, 3.72, ZF + 0.12); SET.add(cartelIn); SET.userData.cartelIn = cartelIn;
  { const af2 = plano(3.2, 0.62, nomT, PCX, 3.62, ZF - 0.12); af2.rotation.y = Math.PI; SET.add(af2); SET.userData.cartelAf = af2; }   // (r2) el cartel de afuera
  // la calle: vereda, asfalto, vereda de enfrente, fachadas
  const af = (w, d, x, z, m, y = 0) => { const p = mesh(new THREE.PlaneGeometry(w, d), m, x, y, z); p.rotation.x = -Math.PI / 2; p.castShadow = false; SET.add(p); };
  af(30, 1.8, 0, ZF - 1.0, M.cr, 0.12); SET.add(caja(30, 0.12, 0.14, M.cr3, 0, 0.06, ZF - 1.93, 0.02));
  af(30, 4.4, 0, ZF - 4.1, M.asfalto, 0.0);
  for (let i = -6; i <= 6; i++) af(1.2, 0.12, i * 2.4, ZF - 4.1, M.cr, 0.003);
  af(30, 2.0, 0, ZF - 7.3, M.cr, 0.12);
  const fach = mesh(new THREE.BoxGeometry(30, 5, 0.3), M.pared, 0, 2.5, ZF - 8.4); fach.castShadow = false; SET.add(fach);
  for (let i = -4; i <= 4; i++) { SET.add(caja(1.1, 1.3, 0.08, M.navy3, i * 2.6 + 0.6, 2.4, ZF - 8.22, 0.03)); SET.add(caja(0.96, 1.16, 0.06, mat(0x2c4268, 0.3), i * 2.6 + 0.6, 2.4, ZF - 8.19, 0.02)); }
  SET.add(caja(30, 0.5, 0.1, M.g, 0, 0.25, ZF - 8.22, 0.02));
  for (const x of [PORTON.x0 - 2.6]) { const g = new THREE.Group(); g.position.set(x, 0.12, ZF - 7.2); SET.add(g);
    g.add(mesh(new THREE.CylinderGeometry(0.08, 0.11, 1.9, 8), mat(0x6b4a32, 0.9), 0, 0.95, 0));
    semilla = 5 + Math.round(x); for (let i = 0; i < 5; i++) g.add(mesh(new THREE.IcosahedronGeometry(0.55 + az() * 0.2, 0), i % 2 ? M.gd : M.g, (az() - 0.5) * 0.7, 2.25 + az() * 0.55, (az() - 0.5) * 0.5)); }
}
// ---- el elevador de dos columnas (brazos verdes) ----
const ELEV = { g: new THREE.Group(), brazos: [] };
{
  SET.add(ELEV.g);
  for (const x of COL) { SET.add(caja(0.3, 3.4, 0.34, M.cr3, x, 1.7, LZ, 0.03)); SET.add(caja(0.5, 0.04, 0.6, M.navy3, x, 0.02, LZ, 0.01)); SET.add(caja(0.06, 3.1, 0.06, M.acero, x + Math.sign(LX - x) * 0.17, 1.65, LZ + 0.12, 0.01)); }
  SET.add(caja(COL[1] - COL[0] + 0.3, 0.16, 0.26, M.navy3, LX, 3.48, LZ, 0.02));
  SET.add(caja(0.24, 0.3, 0.16, M.cr, COL[1] + 0.02, 1.25, LZ + 0.25, 0.03));
  SET.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16).rotateX(Math.PI / 2), M.g, COL[1] + 0.02, 1.29, LZ + 0.34));
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
    b.carro.position.y = h;
    const xp = b.carro.position.x, dx = (LX - b.sx * 0.55) - xp, dz = b.sz * 0.95 - b.sz * 0.14;
    const aCerr = Math.atan2(dx, dz), aAb = b.sz > 0 ? -b.sx * 0.18 : Math.PI + b.sx * 0.18;
    b.piv.rotation.y = lerp(aCerr, aAb, abre);
  }
}
// ---- el banco de trabajo: tablón de madera, frente navy3 con cajones (manijas verdes; uno se abre en Q5), una morsa ----
const CAJON = new THREE.Group();
{
  const g = new THREE.Group(); g.position.set(BANCO.x, 0, BANCO.z); SET.add(g);
  const { L, P, alto: H } = BANCO;
  g.add(caja(L, 0.08, P, M.madera, 0, H - 0.04, 0, 0.015));
  g.add(caja(L - 0.08, H - 0.1, P - 0.06, M.navy3, 0, (H - 0.1) / 2, 0, 0.02));
  for (let i = 0; i < 3; i++) { if (i === 2) continue; g.add(caja(0.58, 0.22, 0.02, M.navy2, -L / 2 + 0.38 + i * 0.64, H - 0.26, P / 2 - 0.02, 0.01)); g.add(caja(0.18, 0.03, 0.03, M.g, -L / 2 + 0.38 + i * 0.64, H - 0.26, P / 2 - 0.005, 0.008)); }
  const mo = new THREE.Group(); mo.position.set(-L / 2 + 0.22, H, 0.05); g.add(mo);
  mo.add(caja(0.2, 0.06, 0.24, M.acero, 0, 0.03, 0, 0.01)); mo.add(caja(0.18, 0.16, 0.08, M.acero, 0, 0.14, 0.06, 0.01)); mo.add(caja(0.18, 0.16, 0.08, M.acero, 0, 0.14, -0.06, 0.01));
  // el cajón de la derecha (se abre): frente navy2 con manija verde, caja de madera
  CAJON.position.set(BANCO.x - L / 2 + 0.38 + 2 * 0.64, H - 0.26, BANCO.z + P / 2 - 0.02); scene.add(CAJON);
  CAJON.add(caja(0.58, 0.22, 0.02, M.navy2, 0, 0, 0, 0.01)); CAJON.add(caja(0.18, 0.03, 0.03, M.g, 0, 0, 0.015, 0.008));
  CAJON.add(caja(0.52, 0.16, 0.5, M.madera, 0, 0, -0.26, 0.01));
  sombras(CAJON);
  // el atril con las llaves ordenadas y unas llaves combinadas sueltas
  for (let i = 0; i < 5; i++) { const k = caja(0.03, 0.012, 0.2, M.acero, 0.1 + i * 0.07, H + 0.006, 0.12, 0.004); k.rotation.y = 0.1 * (i - 2); g.add(k); }
}
// ---- el panel de herramientas (pared del fondo, detrás del elevador) y el tablero de llaves (a la derecha del portón) ----
const panelT = lienzo(1024, 586, (x, w, h) => {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#d9d7c9"; for (let i = 18; i < w; i += 36) for (let j = 18; j < h; j += 36) { x.beginPath(); x.arc(i, j, 4.5, 0, 7); x.fill(); }
  x.fillStyle = "#16243d";
  for (let i = 0; i < 6; i++) rr(x, 80 + i * 48, 80, 18, 110 + i * 18, 9);
  for (let i = 0; i < 4; i++) rr(x, 460 + i * 58, 80, 28, 70, 10);
  rr(x, 780, 70, 20, 150, 8); rr(x, 730, 64, 120, 34, 10);
});
{
  const PX0 = -5.9, PX1 = -3.8, PY0 = 1.0, PY1 = 2.2;
  SET.add(caja(PX1 - PX0 + 0.08, PY1 - PY0 + 0.08, 0.04, M.navy3, (PX0 + PX1) / 2, (PY0 + PY1) / 2, ZF + 0.12, 0.01));
  SET.add(plano(PX1 - PX0, PY1 - PY0, panelT, (PX0 + PX1) / 2, (PY0 + PY1) / 2, ZF + 0.142));
  const g = new THREE.Group(); g.position.set(4.7, 1.55, ZF + 0.12); SET.add(g);
  g.add(caja(1.1, 0.7, 0.04, M.navy3, 0, 0, 0, 0.02));
  ["GRACIELA", "WALTER", "SERGIO", "DANIEL", "NELLY", "PABLO"].forEach((n, i) => {
    const cx = -0.36 + (i % 3) * 0.36, cy = 0.17 - Math.floor(i / 3) * 0.32;
    g.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.05, 6).rotateX(Math.PI / 2), M.acero, cx, cy + 0.08, 0.04));
    g.add(caja(0.02, 0.06, 0.01, M.acero, cx, cy + 0.03, 0.05, 0.004));
    const et = lienzo(256, 100, (x, w, h) => { x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = CAV(64); x.fillText(n, w / 2, h / 2 + 4); });
    g.add(plano(0.28, 0.11, et, cx, cy - 0.04, 0.055));
  });
  // el carro de herramientas al fondo a la derecha
  const k = new THREE.Group(); k.position.set(5.2, 0, ZF + 0.9); k.rotation.y = -0.2; SET.add(k);
  k.add(caja(0.72, 0.82, 0.46, M.navy3, 0, 0.53, 0, 0.03)); k.add(caja(0.76, 0.04, 0.5, M.navy, 0, 0.96, 0, 0.01));
  for (let i = 0; i < 5; i++) { const y = 0.24 + i * 0.15; k.add(caja(0.66, 0.12, 0.03, M.navy2, 0, y, 0.24, 0.01)); k.add(caja(0.3, 0.025, 0.03, M.g, 0, y + 0.02, 0.27, 0.008)); }
}
// ---- la pila de cubiertas (Maxi se sienta arriba) ----
const bandaT = lienzo(512, 64, (x, w, h) => { x.fillStyle = "#23262c"; x.fillRect(0, 0, w, h); x.fillStyle = "#3a3f4a"; for (let i = 0; i < 32; i++) { x.fillRect(i * 16, 8, 6, 20); x.fillRect(i * 16 + 8, 36, 6, 20); } });
bandaT.wrapS = THREE.RepeatWrapping; bandaT.repeat.set(3, 1);
function crearCubierta() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.2, 32, 1, true), new THREE.MeshStandardMaterial({ map: bandaT, roughness: 0.9, side: THREE.DoubleSide })));
  for (const s of [-1, 1]) { const a = mesh(new THREE.RingGeometry(0.17, 0.34, 32), new THREE.MeshStandardMaterial({ color: 0x2a2d33, roughness: 0.9, side: THREE.DoubleSide }), 0, s * 0.1, 0); a.rotation.x = Math.PI / 2; SET.add; g.add(a); }
  return g;
}
const N_CUB = 3, ALTO_CUB = N_CUB * 0.2;
{ const P = new THREE.Group(); P.position.set(CUB.x, 0, CUB.z); SET.add(P); for (let i = 0; i < N_CUB; i++) { const c = crearCubierta(); c.position.set((i % 2) * 0.02, 0.1 + i * 0.2, 0); c.rotation.y = i * 0.7; P.add(c); } sombras(P);
  const P2b = new THREE.Group(); P2b.position.set(5.0, 0, -2.4); SET.add(P2b); for (let i = 0; i < 4; i++) { const c = crearCubierta(); c.position.set((i % 2) * 0.03, 0.1 + i * 0.2, 0); c.rotation.y = i * 0.5; P2b.add(c); } sombras(P2b); }
// la tablet del banco (en el atril): la ficha y el panel
const pantBancoT = lienzo(1280, 900, () => {});
const tabletBanco = crearTablet(pantBancoT, 0.44, 0.31, 0.35); tabletBanco.position.set(BANCO.x + 0.45, BANCO.alto, BANCO.z + 0.12); tabletBanco.rotation.y = 0.25; scene.add(tabletBanco);
fusionar(SET, [ELEV.g, SET.userData.cartelIn, SET.userData.cartelAf]);   // (r2b) los carteles quedan sueltos: se ocultan por plano

// ---- autos: el de Walter (hatchback blanco, SBC 4127, puerta que se abre), otro en el elevador (Q3g) y tres en la vereda ----
const autoW = crearAuto(0xf3f2ec, "SBC 4127", { hatch: true, puerta: true }); scene.add(autoW);
const autoE = crearAuto(0x4d6a96, "STR 7720"); scene.add(autoE);
const autosVereda = [[0x365f28, "SCD 1142", -0.12], [0xd9d7c9, "SAB 3315", 1.45], [0x8a2f2a, "SRE 5521", 3.02]].map(([c, p, x]) => { const a = crearAuto(c, p); a.position.set(x, 0.12, ZF - 1.75); a.rotation.y = 0; scene.add(a); return a; });   // (r3) en fila, de trompa al portón, esperando

// ---- el papelito del service: calco crema con borde verde, escrito a birome navy; se destiñe por etapas (0..4) ----
const papelT = [0, 1, 2, 3, 4].map((e) => lienzo(512, 330, (x, w, h) => {
  const tinta = [1, 0.7, 0.4, 0.13, 0][e], amar = [0, 0.04, 0.08, 0.11, 0.13][e];
  x.fillStyle = `rgb(${Math.round(244 - amar * 40)},${Math.round(242 - amar * 30)},${Math.round(232 - amar * 120)})`; x.fillRect(0, 0, w, h);
  x.strokeStyle = `rgba(92,230,17,${1 - e * 0.18})`; x.lineWidth = 22; x.strokeRect(11, 11, w - 22, h - 22);
  x.fillStyle = `rgba(22,36,61,${Math.max(tinta, e < 4 ? 0.12 : 0) * (e === 3 ? 1 : 1)})`; x.textAlign = "center"; x.textBaseline = "middle";
  if (e < 3) { ajustar(x, "PRÓXIMO SERVICE", 900, 52, w - 80); x.fillText("PRÓXIMO SERVICE", w / 2, 82); }
  else if (e === 3) { x.fillStyle = "rgba(22,36,61,0.12)"; ajustar(x, "PRÓXIMO SERVICE", 900, 52, w - 80); x.fillText("PRÓXIMO SERVICE", w / 2, 82); }
  x.fillStyle = `rgba(22,36,61,${tinta})`; { let k = 150; x.font = CAV(k); while (x.measureText("95.000 KM").width > w - 70 && k > 40) { k -= 4; x.font = CAV(k); } } x.fillText("95.000 KM", w / 2, 212);
  if (e >= 1) { x.fillStyle = `rgba(255,252,236,${0.12 * e})`; x.fillRect(0, 0, w, h); }   // el sol
}));
// el papelito en el parabrisas de Walter (afuera, del lado del conductor, arriba)
const papel = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.135), new THREE.MeshStandardMaterial({ map: papelT[0], roughness: 0.8 }));
{ const p = autoW.userData.para; p.add(papel); papel.position.set(0.36, 0.12, 0.022); papel.castShadow = false; }
// el papelito suelto (en el dedo de Óscar, P5/P6)
const papelSuelto = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.135), new THREE.MeshStandardMaterial({ map: papelT[4], roughness: 0.8, side: THREE.DoubleSide })); scene.add(papelSuelto);
// el rollo de papelitos nuevos (cilindro crema con los bordes verdes)
const rollo = new THREE.Group(); scene.add(rollo);
{ rollo.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.14, 24), M.cr, 0, 0, 0)); for (const s of [-1, 1]) rollo.add(mesh(new THREE.CylinderGeometry(0.077, 0.077, 0.012, 24), M.g, 0, s * 0.064, 0)); rollo.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.145, 16), M.kraft, 0, 0, 0)); rollo.rotation.z = Math.PI / 2; }

// =====================================================================================================
// LA GRÚA: camión de plancha genérico (cabina crema, plancha navy con barandas, baliza crema que gira), sin nombre de
// empresa. Local: la cabina hacia -z (la calle), la plancha hacia +z (entra de culata al taller). La plancha se inclina
// sobre su pivote de adelante (la cola baja al piso). El auto de Walter va arriba, con la trompa hacia la cola (+z).
// =====================================================================================================
const GRUA = new THREE.Group(); scene.add(GRUA);
const PLANCHA = new THREE.Group();
const BALIZA = new THREE.Group();
const PUERTA_G = new THREE.Group();
const PL = { y: 1.08, z0: -2.3, L: 5.4 };
{
  const g = GRUA;
  const cabM = mat(C.cr, 0.45);
  for (const s of [-1, 1]) g.add(cajaS(0.16, 0.26, 6.6, M.chasis, s * 0.6, 0.82, -0.4));
  // cabina
  g.add(caja(2.2, 1.55, 1.75, cabM, 0, 1.62, -3.95, 0.14));
  g.add(caja(2.15, 0.5, 0.9, cabM, 0, 1.12, -5.15, 0.1));   // el capó del camión
  g.add(caja(2.0, 0.6, 0.04, ML.vidrio, 0, 2.0, -4.83, 0.02));
  for (const s of [-1, 1]) g.add(caja(0.03, 0.55, 1.1, ML.vidrio, s * 1.1, 2.0, -3.9, 0.02));
  g.add(caja(1.2, 0.42, 0.03, ML.vidrio, 0, 2.05, -3.07, 0.02));   // la ventanita de atrás
  g.add(caja(2.3, 0.22, 0.22, M.paragolpe, 0, 0.62, -5.62, 0.05));
  for (const s of [-1, 1]) { const f = mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 18), ML.faro, s * 0.75, 1.05, -5.61); f.rotation.x = Math.PI / 2; g.add(f); }
  // la baliza en el techo
  // (r2) la puerta del acompañante (+x): bisagra adelante, se abre hacia afuera
  PUERTA_G.position.set(1.12, 0, -4.4); g.add(PUERTA_G);
  PUERTA_G.add(caja(0.05, 0.75, 1.0, cabM, 0.02, 1.25, 0.52, 0.04)); PUERTA_G.add(caja(0.04, 0.5, 0.86, ML.vidrio, 0.02, 1.9, 0.52, 0.03)); PUERTA_G.add(caja(0.04, 0.06, 1.0, cabM, 0.02, 2.17, 0.52, 0.02)); PUERTA_G.add(caja(0.03, 0.03, 0.14, M.paragolpe, 0.05, 1.45, 0.85, 0.01));
  g.add(caja(0.3, 0.06, 0.5, M.acero, 1.15, 0.62, -3.85, 0.01));   // el estribo
  // (r3) que se lea grúa de auxilio: chapa "AUXILIO" en la trompa, franja navy, baliza más grande
  { const auxT = lienzo(512, 110, (x, w, h) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.fillStyle = "#5ce611"; x.fillRect(0, h - 14, w, 14); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "AUXILIO", 900, 78, w - 60); x.fillText("AUXILIO", w / 2, h / 2 - 4); });
    const ax = plano(1.1, 0.24, auxT, 0, 1.2, -5.62); ax.rotation.y = Math.PI; g.add(ax);
    for (const s of [-1, 1]) g.add(caja(0.02, 0.14, 1.72, M.navy, s * 1.105, 1.32, -3.95, 0.01));
    g.add(caja(2.16, 0.14, 0.02, M.navy, 0, 1.32, -4.835, 0.01)); }
  BALIZA.position.set(0, 2.42, -3.7); BALIZA.scale.setScalar(1.45); g.add(BALIZA);
  BALIZA.add(caja(0.7, 0.08, 0.22, M.navy3, 0, 0, 0, 0.02));
  const lente = new THREE.MeshStandardMaterial({ color: 0xfff3c8, emissive: 0xffe39a, emissiveIntensity: 0.6, roughness: 0.3 });
  BALIZA.userData.lente = lente;
  for (const s of [-1, 1]) BALIZA.add(mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.14, 18), lente, s * 0.22, 0.11, 0));
  // ruedas: adelante simples, atrás dobles
  for (const [z, dob] of [[-4.65, 0], [0.7, 1], [1.75, 1]]) for (const s of [-1, 1]) {
    const r = mesh(new THREE.CylinderGeometry(0.45, 0.45, dob ? 0.46 : 0.3, 24).rotateZ(Math.PI / 2), M.goma, s * 0.92, 0.45, z); g.add(r);
    g.add(mesh(new THREE.CylinderGeometry(0.22, 0.22, dob ? 0.48 : 0.32, 16).rotateZ(Math.PI / 2), M.acero, s * 0.92, 0.45, z));
  }
  for (const s of [-1, 1]) g.add(caja(0.5, 0.06, 1.7, M.navy3, s * 0.95, 0.98, 1.22, 0.02));   // guardabarros
  // la plancha (pivote adelante): chapa navy con estrías, barandas, la cola con las rampitas y dos luces rojas
  PLANCHA.position.set(0, PL.y, PL.z0); g.add(PLANCHA);
  const estrias = lienzo(256, 1024, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; for (let i = 0; i < 40; i++) x.fillRect(0, i * 26, w, 9); });
  estrias.wrapT = THREE.RepeatWrapping; estrias.repeat.set(1, 2);
  PLANCHA.add(mesh(rbox(2.06, 0.12, PL.L, 0.03, 2), [M.navy3, M.navy3, new THREE.MeshStandardMaterial({ map: estrias, roughness: 0.6 }), M.navy3, M.navy3, M.navy3], 0, 0, PL.L / 2));
  for (const s of [-1, 1]) PLANCHA.add(caja(0.07, 0.16, PL.L, M.navy, s * 1.0, 0.1, PL.L / 2, 0.02));
  PLANCHA.add(caja(2.06, 0.9, 0.1, M.navy3, 0, 0.45, 0.05, 0.03));   // el cabezal de adelante
  PLANCHA.add(caja(0.6, 0.3, 0.3, M.acero, 0, 0.25, 0.3, 0.04));    // el malacate
  for (const s of [-1, 1]) { PLANCHA.add(caja(0.5, 0.04, 0.5, M.acero, s * 0.6, 0.02, PL.L + 0.22, 0.01)); PLANCHA.add(caja(0.24, 0.1, 0.04, M.red, s * 0.95, -0.06, PL.L + 0.02, 0.02)); }
  sombras(g);
}
// el auto de Walter arriba de la plancha (P4-P6): una copia, con la trompa hacia la cola (+z) y el papelito ya en blanco
const autoG = crearAuto(0xf3f2ec, "SBC 4127", { hatch: true }); PLANCHA.add(autoG); autoG.position.set(0, 0.06, 3.85);
const papelG = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.135), new THREE.MeshStandardMaterial({ map: papelT[4], roughness: 0.8 }));
{ const p = autoG.userData.para; p.add(papelG); papelG.position.set(0.36, 0.12, 0.022); papelG.castShadow = false; }
// el humo del capó: bocanadas grises low-poly que suben y se abren (deterministas)
const HUMO = [];
{
  const geo = new THREE.IcosahedronGeometry(1, 1);
  for (let i = 0; i < 14; i++) { const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: i % 3 ? 0x9a9ca2 : 0xb9bbc0, roughness: 1, transparent: true, opacity: 0.8, depthWrite: false })); m.castShadow = false; scene.add(m); HUMO.push(m); }
}
function ponerHumo(t, visible, fuerza = 1) {
  const orig = autoG.localToWorld(V3(0, 0.95, autoG.userData.L / 2 - 0.45));
  HUMO.forEach((m, i) => {
    m.visible = visible;
    if (!visible) return;
    semilla = 31 + i * 7; const dx = (az() - 0.5) * 1.2, dz = (az() - 0.5) * 0.7, vel = 0.55 + az() * 0.35, r0 = 0.7 + az() * 0.6;
    const f = (t * vel + i / HUMO.length + az()) % 1;
    m.position.set(orig.x + dx * (0.15 + f * 1.4), orig.y + f * 1.7, orig.z + dz * (0.1 + f) + f * 0.3);   // (r3) bocanadas separadas que suben más
    const s = (0.1 + f * 0.36) * r0 * fuerza; m.scale.set(s, s * 0.85, s);
    m.rotation.set(f * 2 + i, f * 3, i);
    m.material.opacity = 0.85 * Math.sin(Math.PI * Math.min(1, f * 1.15)) * fuerza;
  });
}

// =====================================================================================================
// EL INTERIOR DEL AUTO DE WALTER (x = 40), desde el asiento del conductor (mira hacia -z): el parabrisas con el papelito
// arriba a la izquierda, el tablero navy con el cuentakilómetros grande (pantalla canvas), el volante, el espejo; afuera la
// calle de Montevideo low-poly. El sol cambia de ángulo por mes.
// =====================================================================================================
const CAB = new THREE.Group(); CAB.position.x = 40; scene.add(CAB);
const odoT = lienzo(1024, 420, () => {});
const PAP_I = { x: -0.22, y: 1.3, z: -0.53 };   // el papelito del interior (sobre el vidrio, arriba a la izquierda)
let papelI, ticket, paredP4c;
{
  const g = CAB;
  // el tablero
  g.add(caja(1.9, 0.26, 0.6, M.edge, 0.38, 0.86, -0.62, 0.08));
  g.add(caja(1.86, 0.06, 0.2, M.navy2, 0.38, 1.0, -0.82, 0.03));
  // la capota del cuadro de instrumentos y la pantalla
  g.add(caja(0.56, 0.2, 0.2, M.navy, 0.0, 1.03, -0.42, 0.05));
  const odo = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.205), new THREE.MeshBasicMaterial({ map: odoT, toneMapped: false })); odo.position.set(0, 1.0, -0.288); odo.rotation.x = -0.12; g.add(odo);
  g.add(caja(0.56, 0.25, 0.02, M.edge, 0, 1.0, -0.312, 0.02));
  // el volante (aro navy con tres rayos crema) más abajo: no tapa el cuentakilómetros
  const vol = new THREE.Group(); vol.position.set(0, 0.6, -0.12); vol.rotation.x = -0.35; g.add(vol);
  vol.add(mesh(new THREE.TorusGeometry(0.19, 0.026, 12, 40), M.navy, 0, 0, 0));
  vol.add(mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 20).rotateX(Math.PI / 2), M.navy3, 0, 0, 0));
  for (const a of [0, 2.3, -2.3]) { const r = caja(0.17, 0.035, 0.02, M.cr2, Math.cos(a - Math.PI / 2) * 0.09, Math.sin(a - Math.PI / 2) * 0.09, 0, 0.01); r.rotation.z = a - Math.PI / 2; vol.add(r); }
  // el parabrisas: vidrio casi transparente, los parantes, el techo, el espejo
  const vid = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.62), new THREE.MeshStandardMaterial({ color: 0xcfe0ea, roughness: 0.05, transparent: true, opacity: 0.12, depthWrite: false })); vid.position.set(0.38, 1.2, -0.66); vid.rotation.x = -0.75; vid.castShadow = false; g.add(vid);
  for (const x of [-0.42, 1.18]) { const p = caja(0.09, 0.7, 0.08, M.navy3, x, 1.22, -0.66, 0.03); p.rotation.x = -0.75; g.add(p); }
  g.add(caja(1.8, 0.06, 0.9, new THREE.MeshStandardMaterial({ color: 0xe8e5d8, emissive: 0xb9b6a8, emissiveIntensity: 0.6, roughness: 0.9 }), 0.38, 1.47, -0.1, 0.03));   // el techo
  g.add(caja(1.7, 0.08, 0.06, M.navy3, 0.38, 1.44, -0.44, 0.02));
  { const e = new THREE.Group(); e.position.set(0.38, 1.36, -0.46); g.add(e); e.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.07, 6), M.navy, 0, 0.04, 0)); e.add(caja(0.2, 0.06, 0.02, M.navy, 0, 0, 0, 0.01)); }
  // la puerta del conductor (a la izquierda), el asiento de al lado
  g.add(caja(0.06, 0.5, 1.0, M.navy2, -0.6, 0.75, -0.1, 0.03));
  g.add(caja(0.5, 0.55, 0.45, ML.interior, 0.78, 0.75, 0.2, 0.08));
  // el papelito del lado de adentro (se lee desde el asiento)
  papelI = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.135), new THREE.MeshBasicMaterial({ map: papelT[0], toneMapped: false })); papelI.position.set(PAP_I.x, PAP_I.y, PAP_I.z); papelI.rotation.x = -0.75 + Math.PI / 2 - Math.PI / 2; g.add(papelI);
  papelI.rotation.set(-0.75 + 0.0, 0, 0); papelI.rotateX(0); papelI.position.z += 0.01;
  // el ticket del estacionamiento (septiembre): papel crema arriba del tablero, contra el vidrio
  const tkT = lienzo(256, 160, (x, w, h) => { x.fillStyle = "#f4f1e2"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.font = F(800, 30); x.fillText("ESTACIONAMIENTO", 14, 40); x.font = F(600, 26); x.fillText("12/09 · 14:20", 14, 90); x.fillRect(14, 112, 200, 6); });
  ticket = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.09), new THREE.MeshStandardMaterial({ map: tkT, roughness: 0.8 })); ticket.position.set(0.62, 1.035, -0.8); ticket.rotation.x = -1.2; ticket.rotation.z = 0.15; g.add(ticket);
  // (r2) P4c: el auto está arriba de la grúa, adentro del taller: la pared de bloques navy y el techo crema detrás del vidrio
  { const pt = bloqueT.clone(); pt.needsUpdate = true; pt.repeat.set(4, 1.2); paredP4c = new THREE.Group(); g.add(paredP4c);
    const pb = mesh(new THREE.PlaneGeometry(8, 2.4), new THREE.MeshStandardMaterial({ map: pt, roughness: 0.9 }), 0.4, 1.2, -3.2); paredP4c.add(pb);
    paredP4c.add(mesh(new THREE.PlaneGeometry(8, 3), M.pared, 0.4, 3.9, -3.2)); paredP4c.add(caja(8, 0.2, 0.2, M.navy3, 0.4, 2.45, -3.1, 0.02)); paredP4c.visible = false; }
  // afuera: la calle, las veredas, casas low-poly, árboles, el cielo
  const af = (w, d, x, z, m, y = 0) => { const p = mesh(new THREE.PlaneGeometry(w, d), m, x, y, z); p.rotation.x = -Math.PI / 2; p.castShadow = false; g.add(p); };
  af(7, 80, 0.4, -40, M.asfalto, 0.0);
  for (let i = 0; i < 12; i++) af(0.14, 1.4, 0.4, -4 - i * 3.5, M.cr, 0.004);
  af(3, 80, -4.6, -40, M.cr, 0.1); af(3, 80, 5.4, -40, M.cr, 0.1);
  semilla = 77;
  for (let i = 0; i < 10; i++) for (const s of [-1, 1]) {
    const h = 2.6 + az() * 3.2, w = 3 + az() * 1.5, z = -6 - i * 7;
    const col = [0xefeee5, 0xd9d7c9, 0x9fb3c9, 0xe8d9b8][Math.floor(az() * 4)];
    g.add(cajaS(3, h, w, mat(col, 0.9), 0.4 + s * 7.6, h / 2, z));
    for (let k = 0; k < 2; k++) g.add(cajaS(0.05, 0.9, 0.9, M.navy3, 0.4 + s * 6.08, 1.4 + k * 1.4, z + (k ? 0.6 : -0.6)));
    if (i % 2 === 0) { g.add(mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.8, 8), mat(0x6b4a32, 0.9), 0.4 + s * 4.3, 0.9, z + 3)); g.add(mesh(new THREE.IcosahedronGeometry(0.9, 0), i % 4 ? M.gd : M.g, 0.4 + s * 4.3, 2.3, z + 3)); }
  }
  sombras(g);
  vid.castShadow = false; vid.receiveShadow = false;
}
// la mano de Walter con el celular (Q2, Q5i) y la de Óscar con la tablet (Q1i)
function crearManoInserto(piel, manga) {
  const g = new THREE.Group(), m = mat(piel, 0.55);
  const palma = mesh(new THREE.SphereGeometry(1, 18, 12), m, 0.035, -0.02, -0.03); palma.scale.set(0.045, 0.06, 0.026); g.add(palma);
  const pul = new THREE.Group(); g.add(pul); pul.position.set(0.02, -0.0, 0.0);
  pul.add(mesh(new THREE.CapsuleGeometry(0.0092, 0.048, 4, 10), m, 0, 0.035, 0));
  const mg = mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.22, 16), mat(manga, 0.6), 0.05, -0.14, -0.035); mg.rotation.z = 0.25; g.add(mg);
  g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  g.userData.pulgar = pul;
  return g;
}
const pantCelT = lienzo(600, 1215, () => {});
const celW = crearCelular(pantCelT, MARCA.navy3, 0.085, 0.172); scene.add(celW);
const manoW = crearManoInserto(ELENCO.walter.piel, MARCA.cr2); celW.add(manoW); manoW.position.set(0.035, -0.07, -0.012); manoW.rotation.z = 0.1;
const manoO = crearManoInserto(ELENCO.oscar.piel, MARCA.navy2); scene.add(manoO); manoO.visible = false;
const pantTabT = lienzo(900, 1280, () => {});   // (r2) la ficha, vertical
const tabletO = new THREE.Group(); scene.add(tabletO);
{ tabletO.add(caja(0.235, 0.33, 0.014, M.navy, 0, 0, 0, 0.014)); const p = new THREE.Mesh(new THREE.PlaneGeometry(0.215, 0.31), new THREE.MeshBasicMaterial({ map: pantTabT, toneMapped: false })); p.position.z = 0.0075; tabletO.add(p); sombras(tabletO);
  // (r2) las manos de Óscar agarrando la tablet de los costados (solo en el inserto Q1i)
  for (const sx of [-1, 1]) { const mh = crearManoInserto(ELENCO.oscar.piel, MARCA.navy2); mh.position.set(sx * 0.125, -0.06, -0.012); mh.rotation.set(0, 0, sx * -0.35); if (sx < 0) mh.scale.x = -1; mh.scale.multiplyScalar(1.15); tabletO.add(mh); tabletO.userData[sx < 0 ? "manoI" : "manoD"] = mh; } }

// ---------- luces del interior (otra "locación": se prenden solo ahí) ----------
const solCab = new THREE.DirectionalLight(0xfff1dc, 1.6); solCab.castShadow = true; solCab.shadow.mapSize.set(1024, 1024); solCab.shadow.bias = -0.0008; solCab.shadow.radius = 3;
Object.assign(solCab.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2, near: 0.5, far: 20 });
solCab.target.position.set(40.3, 0.9, -0.5); scene.add(solCab, solCab.target);
const cieloCab = new THREE.HemisphereLight(0xf4f2ea, 0x6a6458, 1.6); scene.add(cieloCab);
const LUCES = { taller: [sol, cielo, relleno, rim], cab: [solCab, cieloCab] };
function ponerLuces(lugar) { for (const k in LUCES) for (const l of LUCES[k]) l.visible = k === lugar; }
// el sol de cada mes (mayo bajo de costado, julio más bajo, septiembre, noviembre alto y de frente)
const SOL_MES = [[-3.5, 2.2, -2.5], [-4, 1.6, -1.5], [2.5, 3.2, -3], [0.8, 5.5, -4], [1.5, 4.5, -5]];

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const oscar = crearPersonaje({ ...ELENCO.oscar, franja: null, cuelloAlto: 0.03, dedos: true, parpadeoCada: 999, parpadeoDur: 0.08, parpadeosExtra: [] });
const maxi = crearPersonaje({ ...ELENCO.maxi, mangas: "largas", dedos: true, parpadeoCada: 999, parpadeoDur: 0.08, parpadeosExtra: [] });
const walter = crearPersonaje({ ...ELENCO.walter, dedos: true, parpadeoCada: 999, parpadeoDur: 0.08, parpadeosExtra: [] });
const TODOS = [oscar, maxi, walter];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
const GRASA = new THREE.MeshStandardMaterial({ color: 0x2a2d33, roughness: 0.6, transparent: true, opacity: 0.7, depthWrite: false });
{ const mp = mesh(new THREE.SphereGeometry(1, 12, 8), GRASA, 0.11, 0.18, 0.215); mp.scale.set(0.035, 0.022, 0.01); oscar.cuerpo.add(mp); }
// el trapo de Óscar: en el bolsillo de atrás (cuelga) y en la mano (saluda en P1)
const trapoT = lienzo(256, 256, (x, w) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, w); x.fillStyle = "rgba(58,63,74,0.55)"; for (const [cx, cy, r] of [[70, 80, 34], [170, 160, 26], [120, 200, 18]]) { x.beginPath(); x.ellipse(cx, cy, r, r * 0.7, 0.5, 0, 7); x.fill(); } x.strokeStyle = "#c7655b"; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, w - 10); });
const trapoM = new THREE.MeshStandardMaterial({ map: trapoT, roughness: 0.9, side: THREE.DoubleSide });
const trapoBolsillo = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.2), trapoM); trapoBolsillo.position.set(-0.12, 0.02, -0.2); trapoBolsillo.rotation.set(0.1, Math.PI, 0.1); oscar.cuerpo.add(trapoBolsillo);
const trapoMano = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.22, 3, 3), trapoM); trapoMano.position.set(0, -0.15, 0.02); oscar.brazos[0].mano.add(trapoMano);
// la llave de Walter con el llavero verde
const llave = new THREE.Group(); walter.brazos[1].mano.add(llave); llave.position.set(0, -0.1, 0.04);
{ llave.add(caja(0.035, 0.05, 0.015, M.navy, 0, 0, 0, 0.008)); llave.add(caja(0.012, 0.055, 0.004, M.acero, 0, 0.05, 0, 0.002)); llave.add(mesh(new THREE.TorusGeometry(0.018, 0.004, 6, 14), M.acero, 0, -0.035, 0)); llave.add(caja(0.04, 0.055, 0.012, M.g, 0, -0.075, 0, 0.012)); }
// el mate de Maxi
const mate = crearMate(); mate.scale.setScalar(1.1); scene.add(mate);

// ---- avatares (la cara del personaje 3D renderizada chica en un círculo) ----
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
  AVATAR.walter = leer(walter, 0xefeee5);
  AVATAR.graciela = leer(crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 999 }), 0xcfeebc);
  AVATAR.daniel = leer(crearPersonaje({ nombre: "Daniel", piel: PIEL.clara, pelo: 0x3b2a22, peinado: "costados", cejasColor: 0x3b2a22, lentes: MARCA.navy2, camisa: MARCA.cr, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, campera: { color: MARCA.navy3, cuello: MARCA.navy3, cierre: MARCA.navy3, abierta: true }, pantalon: 0x3a3f4a, zapatos: 0x3b2a20, panza: 1.05, nariz: 0.06, mejillas: 0xe39282, alto: 1.03, parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.sergio = leer(crearPersonaje({ ...ELENCO.sergio, parpadeoCada: 999 }), 0xd9d7c9);
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
function renglones(x, txt, ancho) { const ws = txt.split(" "), out = []; let l = ""; for (const w of ws) { const p = l ? l + " " + w : w; if (x.measureText(p).width > ancho && l) { out.push(l); l = w; } else l = p; } if (l) out.push(l); return out; }

// ================= PANTALLAS =================
// ---- el cuentakilómetros: dos relojes chicos a los costados y el display grande con los km ----
let claveOdo = "";
function dibujarOdo(km, color = "#efeee5", extra = "") {
  const clave = `${km}|${color}|${extra}`; if (clave === claveOdo) return; claveOdo = clave;
  const { x } = odoT.userData, w = 1024, h = 420;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  for (const cx of [130, w - 130]) { x.strokeStyle = "#2c4268"; x.lineWidth = 14; x.beginPath(); x.arc(cx, 230, 105, Math.PI * 0.8, Math.PI * 2.2); x.stroke(); x.strokeStyle = "#efeee5"; x.lineWidth = 10; x.beginPath(); x.moveTo(cx, 230); x.lineTo(cx - 60, 170); x.stroke(); x.fillStyle = "#efeee5"; x.beginPath(); x.arc(cx, 230, 14, 0, 7); x.fill(); }
  x.fillStyle = "#16243d"; rr(x, 270, 70, 484, 290, 28);
  x.strokeStyle = color; x.lineWidth = 8; x.beginPath(); x.roundRect(270, 70, 484, 290, 28); x.stroke();
  x.fillStyle = color; x.textAlign = "center"; x.textBaseline = "middle";
  ajustar(x, pesosKm(km), 900, 150, 450); x.fillText(pesosKm(km), w / 2, 190);
  x.font = F(800, 70); x.fillText("km", w / 2, 300);
  odoT.needsUpdate = true;
}
const pesosKm = (n) => Math.round(n).toLocaleString("es-UY").replace(/,/g, ".");
// ---- la tablet de Óscar (Q1, la ficha del auto) ----
let claveTab = "";
function dibujarFicha(t) {
  const g = t >= T.guarda ? 1 : 0;
  const clave = `${g}`; if (clave === claveTab) return; claveTab = clave;
  const { x } = pantTabT.userData, w = 900, h = 1280;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, w, 12);
  x.fillStyle = "#efeee5"; ajustar(x, "SBC 4127 · Walter", 900, 84, w - 70); x.fillText("SBC 4127 · Walter", 36, 88);
  x.fillStyle = "#1f3254"; x.font = F(800, 64); x.fillText("Hatchback blanco", 40, 245);
  x.fillStyle = "#ffffff"; rr(x, 24, 300, w - 48, 210, 26);
  x.fillStyle = "#1f3254"; x.font = F(800, 58); x.fillText("Último service", 52, 350);
  x.fillStyle = "#0b1220"; ajustar(x, "12/03 · 85.000 km", 900, 90, w - 100); x.fillText("12/03 · 85.000 km", 52, 445);
  x.fillStyle = "#ffffff"; rr(x, 24, 530, w - 48, 270, 26);
  x.fillStyle = "#1f3254"; x.font = F(800, 58); x.fillText("Próximo", 52, 580);
  x.fillStyle = "#0b1220"; x.font = F(900, 104); x.fillText("95.000 km", 52, 675);
  x.fillStyle = "#1f3254"; x.font = F(800, 64); x.fillText("o en 6 meses", 52, 760);
  x.fillStyle = "#ffffff"; rr(x, 24, 820, w - 48, 150, 26); x.fillStyle = "#0b1220"; ajustar(x, "Aviso por WhatsApp", 900, 64, w - 220); x.fillText("Aviso por WhatsApp", 52, 895);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w - 100, 895, 50, 0, 7); x.fill(); tilde(x, w - 98, 897, 52, "#0b1220", 14);
  x.fillStyle = g ? "#5ce611" : "#16243d"; rr(x, 24, 995, w - 48, 150, 75);
  x.fillStyle = g ? "#0b1220" : "#efeee5"; x.textAlign = "center"; x.font = F(900, 80); x.fillText(g ? "Guardado ✓" : "Guardar", w / 2, 1072); x.textAlign = "left";
  x.fillStyle = "#1f3254"; x.font = F(800, 56); x.fillText("Cliente desde 2019", 40, 1220);
  pantTabT.needsUpdate = true;
}
// ---- la tablet del banco: el panel "Les toca este mes" ----
let claveBanco = "";
function dibujarPanel(t) {
  const f = 4, n = t < T.cuenta ? 8 : Math.round(lerp(8, 10, eio(sg(t, T.cuenta, T.cuentaFin))));
  const clave = `${f}|${n}`; if (clave === claveBanco) return; claveBanco = clave;
  const { x } = pantBancoT.userData, w = 1280, h = 900;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, w, 10);
  x.fillStyle = "#efeee5"; x.font = F(900, 74); x.fillText("Les toca este mes · 12", 36, 68);
  const FIL = [[AVATAR.walter, "Walter", "Reservó · Jue 9:00", 1], [AVATAR.graciela, "Graciela", "Reservó · Mar 10:30", 1], [AVATAR.daniel, "Daniel", "Reservó · Mar 8:30", 1], [AVATAR.sergio, "Sergio", "Aviso enviado", 0]];
  FIL.forEach(([cv, nom, est, ok], i) => {
    if (i >= Math.max(f, 0) && f < 4 && i >= f) return;
    const y = 160 + i * 150;
    x.fillStyle = "#ffffff"; rr(x, 24, y, w - 48, 134, 24);
    avatar(x, cv, 96, y + 67, 52);
    x.fillStyle = "#0b1220"; x.font = F(900, 60); x.fillText(nom, 170, y + 67);
    x.fillStyle = ok ? "#5ce611" : "#d9d7c9"; rr(x, 560, y + 18, 690, 98, 49);
    x.fillStyle = ok ? "#0b1220" : "#1f3254"; x.textAlign = "center"; ajustar(x, est + (ok ? " ✓" : ""), 900, 56, 650); x.fillText(est + (ok ? " ✓" : ""), 905, y + 69); x.textAlign = "left";
  });
  x.fillStyle = "#16243d"; x.fillRect(0, h - 150, w, 150);
  x.fillStyle = "#5ce611"; x.textAlign = "center"; x.font = F(900, 92); x.fillText(`Reservaron: ${n} de 12`, w / 2, h - 72); x.textAlign = "left";
  pantBancoT.needsUpdate = true;
}
// ---- el celular de Walter: el chat del taller (Q2) · el aviso del service hecho (Q5) ----
let claveCel = "";
function dibujarCel(t, modo) {
  const w = 600, h = 1215;
  const ok = t >= T.reservado ? 1 : 0, toc = t >= T.toca ? 1 : 0, msj = t >= T.msj ? 1 : 0;
  const clave = `${modo}|${ok}|${toc}|${msj}`; if (clave === claveCel) return; claveCel = clave;
  const { x } = pantCelT.userData;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 160); x.fillStyle = "#5ce611"; x.fillRect(0, 160, w, 8);
  llaveAvatar(x, 76, 80, 52);
  x.fillStyle = "#efeee5"; ajustar(x, "Mecánica Óscar", 800, 74, w - 160); x.fillText("Mecánica Óscar", 140, 56); x.fillStyle = "#5ce611"; x.font = F(700, 50); x.fillText("en línea", 140, 122);   // (r3) encabezado ≥ 36 px en pantalla
  if (modo === "chat") {
    if (!msj) { pantCelT.needsUpdate = true; return; }
    x.fillStyle = "#ffffff"; rr(x, 20, 200, w - 70, 520, 30);
    x.fillStyle = "#0b1220"; x.font = F(700, 44);
    const L = ["Hola, Walter.", "A tu auto le toca", "el service (SBC 4127,", "unos 95.000 km).", "¿Te reservo el", "jueves 9:00?"];
    L.forEach((l, i) => { x.font = F(i === 0 || i >= 4 ? 800 : 600, 46); x.fillText(l, 46, 254 + i * 76); });
    if (!ok) {
      x.fillStyle = toc ? "#3fa60a" : "#5ce611"; rr(x, 20, 750, w - 40, 130, 65); x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Reservar jueves 9:00", 900, 52, w - 90); x.fillText("Reservar jueves 9:00", w / 2, 817);
      x.fillStyle = "#ffffff"; rr(x, 20, 900, w - 40, 120, 60); x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(20, 900, w - 40, 120, 60); x.stroke(); x.fillStyle = "#16243d"; ajustar(x, "Elegir otro día", 800, 50, w - 90); x.fillText("Elegir otro día", w / 2, 962); x.textAlign = "left";
    } else {
      x.fillStyle = "#5ce611"; rr(x, 70, 750, w - 90, 250, 30);
      x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 60); x.fillText("Turno reservado ✓", w / 2 + 25, 830, w - 120); x.font = F(800, 56); x.fillText("Jueves 9:00", w / 2 + 25, 920); x.textAlign = "left";
    }
  } else {
    x.fillStyle = "#16243d"; x.fillRect(0, 168, w, h);
    x.fillStyle = "#ffffff"; rr(x, 16, 210, w - 32, 960, 40); x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.beginPath(); x.roundRect(16, 210, w - 32, 960, 40); x.stroke();
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w / 2, 340, 80, 0, 7); x.fill(); tilde(x, w / 2 + 3, 345, 86, "#0b1220", 22);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Service hecho", 900, 84, w - 80); x.fillText("Service hecho", w / 2, 500);
    x.fillStyle = "#1f3254"; x.font = F(800, 56); x.fillText("95.300 km", w / 2, 610);
    x.fillStyle = "#16243d"; x.fillRect(60, 670, w - 120, 6);
    x.fillStyle = "#0b1220"; x.font = F(700, 50); x.fillText("Próximo:", w / 2, 760); x.font = F(900, 80); x.fillText("105.000 km", w / 2, 860);
    x.fillStyle = "#3fa60a"; x.font = F(900, 66); x.fillText("Te avisamos", w / 2, 1030);
    x.textAlign = "left";
  }
  pantCelT.needsUpdate = true;
}

// ================= TARJETAS PEGADAS A LA CÁMARA: globos, rótulos, guías =================
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
    else if (p.startsWith("{")) { x.fillStyle = "#c7655b"; x.fillText(limpio(p), xx, y + px * 0.04); }
    else { x.fillStyle = tinta; x.fillText(p, xx, y + px * 0.04); }
    xx += anchos[k];
  });
}
function crearGlobo(lineas, px = 80, { minW = 0 } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  const limpio = (l) => l.replace(/[[\]{}]/g, "");
  med.font = F(800, px);
  const anchoT = Math.max(...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.max(minW, Math.round(anchoT + px * 1.2)), H = Math.round(lineas.length * px * 1.22 + px * 0.75);
  return crearTarjeta(Wg, H, (x, w, h) => { lineas.forEach((l, i) => textoSel(x, l, w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px)); });
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
  cy = cl(cy, H / 2 + 200, 1650 - H / 2);   // zona segura: toda tarjeta entre y 200 e y 1650
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
const objPx = (o, local = V3(0, 0, 0)) => { o.updateMatrixWorld(true); return enPantalla(o.localToWorld(local.clone())); };
// REGLA DE BURBUJAS: la burbuja va arriba del que habla y la cola apunta a su BOCA. Si no entra (o el que habla queda
// cortado), se anota en AVISOS (prev.mjs lo imprime).
const AVISOS = [];
const bocaW = (per) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(0, 0.15, 0.3)); };
const coronillaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(V3(0, 0.62, 0))); };
function hablar(g, per, s, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) {
  const [hx, hy] = coronillaPx(per), [mx, my] = enPantalla(bocaW(per));
  const { H } = g.userData;
  let cy = hy - sobre - H / 2;
  if (cy - H / 2 < minY - 10) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  cy = cl(cy, H / 2 + minY, maxY - H / 2);
  if (mx < 70 || mx > 1010 || hy < 0 || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, cy, s, [mx, my], orden);
}
function globo2(lineas, px, vacias) { const g = crearGlobo(lineas, px); const a = crearGlobo(lineas.filter((l, i) => !vacias.includes(i)), px); return [a, g]; }

// ================= GLOBOS Y RÓTULOS =================
const [o3a, o3g] = globo2(["Volviste a los diez mil,", "Walter. {Cuatro veces.}"], 66, []);
const [o5a, o5g] = globo2(["Una vez.", "[Así me gusta.]"], 78, [1]);
const [w2a, w2g] = globo2(["Óscar, no entiendo.", "Si le hice el service", "[hace poquito.]"], 60, [1, 2]);
const [o2a, o2g] = globo2(["Ya vuelven.", "Tienen [el papelito.]"], 70, [1]);
const [o4a, o4g] = globo2(["Ya vinieron.", "Tenían [el aviso.]"], 70, [1]);
const [o1a, o1g] = globo2(["Listo, Walter.", "Volvé a los", "[diez mil kilómetros.]"], 64, [1, 2]);
const [o1ba, o1bg] = globo2(["Listo, Walter.", "Volvé a los", "[diez mil kilómetros.]"], 64, [1, 2]);
// "Cuatro veces." entra con la segunda mitad: la burbuja "a" muestra solo la primera línea partida
const o3x = crearGlobo(["Volviste a los diez mil,", "Walter."], 66);
const GL = {
  o1: o1g, o1a, o1b: o1bg, o1ba,
  w1: crearGlobo(["¡Obvio! Vos sos", "[mi mecánico.]"], 70), w1b: crearGlobo(["¡Obvio! Vos sos", "[mi mecánico.]"], 70),
  m1: crearGlobo(["Jefe, ¿hoy no", "[viene nadie?]"], 72), m1b: crearGlobo(["Jefe, ¿hoy no", "[viene nadie?]"], 72),
  o2: o2g, o2a, w2: w2g, w2a, o3: o3g, o3a: o3x,
  w3: crearGlobo(["Ponele otro papelito,", "[así no me olvido.]"], 62),
  w4: crearGlobo(["¡Uh! Justo me", "[estaba olvidando.]"], 66),
  o4: o4g, o4a,
  w5: crearGlobo(["¡Óscar! ¡Volví a", "[los diez mil!]"], 70),
  o5: o5g, o5a,
  w6: crearGlobo(["¿No me ponés", "[el papelito?]"], 72),
  o6: crearGlobo(["El papelito ahora", "[te escribe.]"], 72),
};
const ROT_ = {
  cero: crearRotulo([["Martes: 0 turnos", "#c7655b", 72]], 72),
  n38: crearRotulo([["Services que no volvieron", null, 48], ["este año: 38", "#c7655b", 64], ["$ 247.000", "#c7655b", 76]], 48),
  ultimo: crearRotulo([["Último service:", null, 52], ["85.000 km", "#c7655b", 76]], 52),
  q1: crearRotulo([["La ficha de cada auto,", null, 48], ["con el próximo service", "#5ce611", 54]], 48),
  q2: crearRotulo([["Le avisa solo cuando le toca,", null, 46], ["con el turno", "#5ce611", 60]], 46),
  q3: crearRotulo([["Quién reservó y a quién", null, 48], ["le falta, en un panel", "#5ce611", 56]], 48),
  n44: crearRotulo([["Martes: 4 de 4 turnos ✓", "#5ce611", 66]], 66),
};
// el inserto chico del papelito (P1): la calcomanía a la vista, con la guía al parabrisas
const INS_PAPEL = crearTarjeta(460, 310, (x, w, h) => { x.drawImage(papelT[0].userData.c, 18, 18, w - 36, h - 36); });
const GUIAS = [crearGuia(), crearGuia()];

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  if (b === a || b[0] <= a[0] || t >= b[0]) return (t >= b[0] ? b : a).slice(1, 8);
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
function camPantalla(obj, centroLocal, normalLocal, alto, llena, fov, t, extra = 0) {
  obj.updateMatrixWorld(true);
  const c = obj.localToWorld(centroLocal.clone()), n = normalLocal.clone().transformDirection(obj.matrixWorld);
  const d = alto / llena / (2 * Math.tan((fov * D2R) / 2)) + extra;
  const p = c.clone().add(n.multiplyScalar(d));
  ponerCam([p.x, p.y, p.z, c.x, c.y, c.z, fov], t, true);
  camera.up.copy(V3(0, 1, 0).transformDirection(obj.matrixWorld)); camera.lookAt(c);
  return { c, p, d };
}
const X0 = CARPOS.x, Z0 = CARPOS.z;
// ---- dónde está cada uno ----
const OSC_P1 = { x: X0 + 1.15, z: Z0 + 0.85 };    // P1/Q1: Óscar en la esquina del parabrisas, del lado del conductor
const WAL_P1 = { x: X0 + 1.65, z: Z0 + 2.0 };    // Walter adelante a la derecha, con la llave
const OSC_G = { x: X0 + 1.5, z: Z0 + 1.0 };       // P4-P6: Óscar a la derecha de la plancha, al lado del parabrisas
const WAL_G = { x: X0 - 1.2, z: Z0 + 1.85 };     // P4-P6: Walter entró por la izquierda, adelante
const MAX_A = { x: X0 - 2.6, z: Z0 + 3.6 }, MAX_G = { x: X0 + 0.05, z: Z0 + 2.3 };
const OSC_P6 = { x: X0 + 1.05, z: Z0 + 1.75 }, WAL_P6 = { x: X0 - 0.95, z: Z0 + 1.85 };   // (r2b) los dos más cerca del auto: plano más cerrado   // (r2) en P6 Óscar un paso más adelante (entra en el plano)   // P6: Maxi llega con el rollo
const OSC_Q = { x: X0 + 0.25, z: Z0 + 2.6 };     // Q4b-Q5: Óscar adelante a la izquierda del auto
const WAL_Q = { x: X0 + 1.4, z: Z0 + 1.75 };      // Q4b-Q5: Walter bajó por la puerta del conductor
const OSC_B = { x: BANCO.x + 0.05, z: BANCO.z - 0.55 };   // Óscar detrás del banco, de frente
// P1/Q1: desde adelante a la izquierda: el auto de 3/4, Óscar en el parabrisas, Walter adelante
const CAM_P1 = (k) => [X0 + lerp(0.15, 0.25, k), 1.55, Z0 + lerp(6.6, 6.35, k), X0 + 1.15, 1.15, Z0 + 0.9, 54];
// P2/Q2: desde el asiento del conductor (x = 40): el papelito arriba, el cuentakilómetros abajo
const CAM_P2 = (k) => [40 + lerp(-0.05, -0.04, k), 1.24, lerp(0.34, 0.27, k), 40 - 0.05, 1.07, -0.9, 62];
// P3/Q3g/Q5b: el plano general del taller hacia el elevador
const CAM_P3 = (k) => [lerp(-1.25, -1.35, k), 1.38, lerp(5.0, 4.7, k), -2.35, 1.42, -1.6, 58];
// Q3m: Maxi de cerca, desde arriba (de fondo el piso: todavía no se ve el elevador)
const CAM_Q3M = (k) => [lerp(0.3, 0.25, k), 1.5, lerp(1.95, 1.8, k), CUB.x, 1.62, CUB.z, 42];
// Q3h: Óscar y Maxi más de cerca
const CAM_Q3H = (k) => [lerp(-1.6, -1.65, k), 1.55, lerp(3.4, 3.2, k), -2.75, 1.3, 0.0, 54];
const CAM_Q3G = (k) => [lerp(-1.3, 0.6, k), lerp(1.68, 0.7, k), lerp(5.0, 1.2, k), lerp(-2.6, 1.35, k), lerp(1.55, 1.3, k), lerp(-1.8, -6.0, k), lerp(58, 60, k)];   // (r3) termina de frente a los tres autos de la fila   // (r3) termina de frente al portón: los tres autos enteros
// P4: desde adentro, adelante a la izquierda, hacia el portón (la grúa entra de culata)
const CAM_P4 = (k) => [lerp(3.45, 3.35, k), 2.9, -13.1, lerp(0.15, 0.1, k), 1.35, -6.5, 64];   // (r3) 3/4 de adelante y de arriba: trompa, parabrisas, baliza, el auto en la plancha; la grúa recula   // (r2b) 3/4 de adelante: cabina con Walter en la ventanilla + plancha + auto
const WAL_P4 = { x: PCX + 1.65, z: -7.55 };   // Walter, recién bajado de la cabina
const CAM_P4W = (k) => [lerp(3.55, 3.5, k), 1.5, lerp(-5.15, -5.35, k), WAL_P4.x - 0.15, 1.38, WAL_P4.z - 0.4, 46];
// P4b: el parabrisas del auto en la plancha, de cerca; Óscar se asoma desde la derecha
const CAM_P4B = (k) => [X0 + lerp(0.6, 0.65, k), 1.55, Z0 + lerp(2.75, 2.55, k), X0 + 0.7, 1.5, Z0 + 0.7, 46];
// P4c/Q4i: el cuentakilómetros, de cerca
const CAM_ODO = (k) => [40 + 0.0, 1.13, lerp(0.75, 0.66, k), 40, 1.03, -0.3, 44];
const CAM_P4C = (k) => [40, 1.1, lerp(0.64, 0.58, k), 40, 1.0, -0.3, 33];   // (r3) más cerrado: el 125.000 al centro, sin el bloque navy arriba
// P5: primer plano de Óscar (seco), desde adelante a la izquierda
const CAM_P5 = (k) => [X0 + lerp(0.75, 0.8, k), 1.52, Z0 + lerp(3.0, 2.85, k), OSC_G.x - 0.05, 1.5, OSC_G.z, 38];   // (r2b) más de frente: los dos ojos
// P6: Walter señala el parabrisas; Óscar con el papelito en el dedo; Maxi llega con el rollo
const CAM_P6 = (k) => [X0 + lerp(0.1, 0.05, k), 1.0, Z0 + lerp(6.4, 6.2, k), X0 + 0.05, 1.85, Z0 + 1.4, 58];   // (r2b) más cerca y de abajo: sin piso vacío
// Q4: el portón; Walter entra manejando y baja
const CAM_Q4 = (k) => [X0 + lerp(1.3, 1.25, k), 1.5, Z0 + lerp(5.8, 5.6, k), X0 + 0.78, 1.15, Z0 + 1.4, 56];   // (r3) Walter entero
// Q4b: primer plano de Óscar que recibe la llave (el mismo tamaño que P5), desde adelante a la derecha
const CAM_Q4B = (k) => [X0 + lerp(1.55, 1.5, k), 1.52, Z0 + lerp(3.75, 3.6, k), OSC_Q.x, 1.5, OSC_Q.z, 38];
// Q5: Walter señala el parabrisas limpio; Óscar le señala el celular (desde adelante a la izquierda)
const CAM_Q5 = (k) => [X0 + lerp(0.68, 0.72, k), 1.5, Z0 + lerp(5.25, 5.1, k), X0 + 0.78, 1.2, Z0 + 1.4, 58];   // (r2b) Walter entero dentro del cuadro
// C: Óscar a cámara en la columna del elevador, el auto de Walter arriba
const CAM_C = (k) => [lerp(-0.6, -0.62, k), 1.25, lerp(0.15, 0.0, k), -1.15, 1.2, -2.1, 54];   // (r2b) la cara arriba de la tarjeta
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, [[T.p2, ...CAM_P2(0)], [T.p3, ...CAM_P2(1)]]],
  ["P3", T.p3, [[T.p3, ...CAM_P3(0)], [T.p4, ...CAM_P3(1)]]],
  ["P4", T.p4, [[T.p4, ...CAM_P4(0)], [T.p4w, ...CAM_P4(1)]]],
  ["P4w", T.p4w, [[T.p4w, ...CAM_P4W(0)], [T.p4b, ...CAM_P4W(1)]]],
  ["P4b", T.p4b, null],
  ["P4c", T.p4c, [[T.p4c, ...CAM_P4C(0)], [T.p5, ...CAM_P4C(1)]]],
  ["P5", T.p5, [[T.p5, ...CAM_P5(0)], [T.p6, ...CAM_P5(1)]]],
  ["P6", T.p6, [[T.p6, ...CAM_P6(0)], [P1, ...CAM_P6(1)]]],
  // ---- parte 2 ----
  ["Q1", T.q1, [[T.q1, ...CAM_P1(0)], [T.q1i, ...CAM_P1(1)]]],
  ["Q1i", T.q1i, null],   // la ficha en la tablet de Óscar
  ["Q2", T.q2, null],     // agosto: el celular de Walter en el auto
  ["Q3", T.q3, null],     // la tablet del banco: el panel
  ["Q3m", T.q3m, [[T.q3m, ...CAM_Q3M(0)], [T.gira, ...CAM_Q3M(1)]]],   // Maxi, mirando el mate: "¿hoy no viene nadie?"
  ["Q3g", T.gira, [[T.gira, ...CAM_Q3G(0)], [T.q3h, ...CAM_Q3G(1)]]],   // la revelación: el elevador ocupado, los autos en la vereda
  ["Q3h", T.q3h, [[T.q3h, ...CAM_Q3H(0)], [T.q4, ...CAM_Q3H(1)]]],   // Óscar contesta (vuelta al banco)
  ["Q4", T.q4, [[T.q4, ...CAM_Q4(0)], [T.q4b, ...CAM_Q4(1)]]],
  ["Q4b", T.q4b, [[T.q4b, ...CAM_Q4B(0)], [T.q5, ...CAM_Q4B(1)]]],
  ["Q5", T.q5, [[T.q5, ...CAM_Q5(0)], [T.q5i, ...CAM_Q5(1)]]],
  ["Q5i", T.q5i, null],   // el celular de Walter: Service hecho
  ["C", T.c, [[T.c, ...CAM_C(0)], [DUR, ...CAM_C(1)]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.28) console.warn(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); }
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }


// ================= POSES =================
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca = { ...(p.boca || {}), abierta: Math.max(p.boca?.abierta ?? 0, cl(e * 1.1 - 0.05) * k), sonrisa: Math.min(p.boca?.sonrisa ?? 0.1, 0.35) }; p.ojos = { ...(p.ojos || {}), abiertos: Math.max(p.ojos?.abiertos ?? 1, 0.85) }; }
};
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const haciaCam = (cp, x, z, giro, k = 0.8, lim = 0.9) => cl((Math.atan2(cp[0] - x, cp[2] - z) - giro) * k, -lim, lim);
const giroA = (x, z, wx, wz) => Math.atan2(wx - x, wz - z);
function mirar(x, z, g, w, alto = 1.5, lim = 0.8) {
  const dx = w.x - x, dz = w.z - z;
  const lx = dx * Math.cos(g) - dz * Math.sin(g), lz = dx * Math.sin(g) + dz * Math.cos(g);
  const giro = cl(Math.atan2(lx, lz), -lim, lim), asiente = cl(Math.atan2(alto - w.y, Math.hypot(dx, dz)), -0.4, 0.6);
  return { cabeza: { giro, asiente, ladea: 0.02 }, ojos: { x: cl(giro * 0.5, -0.6, 0.6), y: cl(-asiente * 0.8, -0.8, 0.4) } };
}
const BASE = (x, z, giro, t) => ({ x, y: 0, z, giro, inclina: 0.03, cabeza: { giro: 0, asiente: 0.02, ladea: 0.02 }, ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0 }, boca: { sonrisa: 0.4, abierta: 0, ancho: 1.0 }, manoI: [0.29, -0.08, 0.05], manoD: [-0.29, -0.08, 0.05], codoI: null, codoD: null, dedoI: 0, dedoD: 0, t });
const SECO = { ojos: { abiertos: 0.66, tension: 0.2, feliz: 0, x: 0, y: 0 }, cejas: { alto: -0.08, ang: 0.15, asim: 0.3 }, boca: { sonrisa: -0.3, abierta: 0, ancho: 0.88 } };
const ang = (a) => Math.atan2(Math.sin(a), Math.cos(a));
// el giro "de teatro": hacia el otro, corrido k hacia la cámara
const cheat = (x, z, wx, wz, cp, k = 0.45) => { const a = giroA(x, z, wx, wz), b = giroA(x, z, cp[0], cp[2]); return a + ang(b - a) * k; };
const W3 = (p, y = 1.55) => V3(p.x, y, p.z);
// ---------- Óscar ----------
function poseOscar(t, pa, cp) {
  const pr = BASE(OSC_P1.x, OSC_P1.z, 0, t);
  if (pa === "P1" || pa === "Q1") {
    // de 3/4 hacia Walter (y la cámara); en P1 termina de pegar el papelito y recién ahí se da vuelta
    pr.giro = cheat(pr.x, pr.z, WAL_P1.x, WAL_P1.z, cp, 0.5);
    Object.assign(pr, mirar(pr.x, pr.z, pr.giro, W3(WAL_P1), 1.55, 0.8));
    pr.ojos = { ...pr.ojos, abiertos: 1, feliz: 0.35 }; pr.boca = { sonrisa: 0.55, abierta: 0, ancho: 1.05 }; pr.cejas = { alto: 0.25, ang: 0 };
    if (pa === "P1") {
      const pap = papel.getWorldPosition(new THREE.Vector3());
      const u = eio(sg(t, 0.5, 0.95));
      const g0 = giroA(pr.x, pr.z, pap.x, pap.z);
      // (r1) desde el cuadro 0 se le ve la cara: el cuerpo a medias hacia el parabrisas, la cabeza ya hacia Walter
      pr.giro = g0 + ang(pr.giro - g0) * (0.6 + 0.4 * u); pr.inclina = lerp(0.14, 0.04, u);
      Object.assign(pr, mirar(pr.x, pr.z, pr.giro, W3(WAL_P1), 1.55, 0.85)); pr.ojos = { ...pr.ojos, abiertos: 1, feliz: 0.35 };
      oscar.poner({ ...pr }); oscar.raiz.updateMatrixWorld(true);
      pr.manoD = lerpV(aCuerpo(oscar, pap.clone().add(V3(0.03, -0.01, 0.05))), [-0.29, -0.08, 0.05], u); pr.codoD = [-1, -0.3, 0]; pr.dedoD = 0;
      // Walter se va: lo saluda con el trapo
      if (t >= T.sube + 0.1) { const w = eo(sg(t, T.sube + 0.1, T.sube + 0.3)); pr.manoI = lerpV([0.29, -0.08, 0.05], [0.42, 0.82 + Math.sin((t - T.sube) * 14) * 0.05, 0.2 + Math.sin((t - T.sube) * 14) * 0.07], w); pr.codoI = [1, -0.4, -0.1]; }
    } else {
      // Q1: la tablet en las dos manos, a la altura del pecho
      pr.manoI = [0.11, 0.34, 0.36]; pr.manoD = [-0.11, 0.34, 0.36]; pr.codoI = [0.6, -0.8, -0.3]; pr.codoD = [-0.6, -0.8, -0.3];
    }
    bocaVoz(pr, t, pa === "P1" ? T.o1 : T.o1b, ENV.o1, 0.6);
  } else if (pa === "P3" || pa === "Q3m" || pa === "Q3g" || pa === "Q3h") {
    // detrás del banco ordenando llaves; levanta la vista para contestar
    pr.x = OSC_B.x; pr.z = OSC_B.z; pr.giro = 0.15;
    pr.manoI = [0.2, 0.36, 0.38]; pr.manoD = [-0.16, 0.36, 0.4]; pr.inclina = 0.12;
    pr.cabeza = { giro: 0.1, asiente: 0.45, ladea: 0.02 }; pr.ojos = { x: 0, y: -0.7, abiertos: 0.9, feliz: 0.2 };
    const habla = pa === "P3" ? T.o2 : T.o4;
    if (pa !== "Q5b" && t >= habla - 0.25) { const u = eio(sg(t, habla - 0.25, habla + 0.05)); const m = mirar(pr.x, pr.z, pr.giro, V3(CUB.x, 1.45, CUB.z), 1.5, 0.7); pr.cabeza = { giro: lerp(0.1, m.cabeza.giro, u), asiente: lerp(0.45, 0.02, u), ladea: 0.03 }; pr.ojos = { ...m.ojos, abiertos: 1, feliz: 0.35 }; pr.boca = { sonrisa: pa === "Q3g" ? 0.7 : 0.45, abierta: 0, ancho: 1.05 }; pr.inclina = lerp(0.12, 0.03, u); }
    if (pa === "Q5b") { pr.cabeza = { giro: 0.35, asiente: 0.1, ladea: 0.03 }; pr.ojos = { x: 0.4, y: -0.1, abiertos: 0.9, feliz: 0.4 }; pr.boca = { sonrisa: 0.6, abierta: 0, ancho: 1.05 }; }
    bocaVoz(pr, t, habla, pa === "P3" ? ENV.o2 : ENV.o4, 0.6);
  } else if (pa === "P4" || pa === "P4b" || pa === "P5" || pa === "P6") {
    pr.x = OSC_G.x; pr.z = OSC_G.z;
    const pap = papelG.getWorldPosition(new THREE.Vector3());
    if (pa === "P4" || pa === "P4w") {
      // (r2) en la vereda, delante del portón: mira la grúa que llega
      pr.x = PCX + 3.1; pr.z = -5.5;
      pr.giro = giroA(pr.x, pr.z, PCX + 1.5, -8.8);
      Object.assign(pr, { ...CARA.sorpresa, ojos: { x: 0, y: 0, abiertos: 1 }, boca: { sonrisa: 0, abierta: 0.15, ancho: 0.8 } });
      const m = mirar(pr.x, pr.z, pr.giro, t < T.w2 ? V3(X0, 1.6, Z0 - 1.5) : walter.raiz.position.clone().add(V3(0, 1.55, 0)), 1.55, 0.8); pr.cabeza = m.cabeza; pr.ojos = { ...pr.ojos, x: m.ojos.x, y: m.ojos.y };
    } else if (pa === "P4b") {
      // se asoma al parabrisas y despega el papelito
      pr.giro = giroA(pr.x, pr.z, pap.x, pap.z) + 0.2;
      pr.inclina = 0.3; Object.assign(pr, mirar(pr.x, pr.z, pr.giro, pap, 1.4, 0.8)); pr.ojos = { ...pr.ojos, abiertos: 0.8 }; pr.boca = { sonrisa: -0.1, abierta: 0, ancho: 0.9 }; pr.cejas = { alto: 0.35, ang: 0.3 };
      oscar.poner({ ...pr }); oscar.raiz.updateMatrixWorld(true);
      const u = eo(sg(t, T.p4b + 0.05, T.despega)), v = eio(sg(t, T.despega, T.despega + 0.35));
      pr.manoD = lerpV([-0.29, -0.08, 0.05], aCuerpo(oscar, pap.clone().add(V3(0.04, -0.03, 0.05))), u);
      if (v > 0) pr.manoD = lerpV(pr.manoD, [-0.16, 0.34, 0.38], v); pr.codoD = [-1, -0.4, -0.1]; pr.dedoD = 1;
    } else if (pa === "P5") {
      // el remate: seco, a Walter
      pr.giro = cheat(pr.x, pr.z, WAL_G.x, WAL_G.z, cp, 0.92);   // (r2b) casi de frente: se ven los dos ojos
      Object.assign(pr, SECO); Object.assign(pr, mirar(pr.x, pr.z, pr.giro, W3(WAL_G), 1.55, 0.12));
      pr.ojos = { ...pr.ojos, abiertos: 0.62, tension: 0.25 }; pr.cejas = { alto: -0.05, ang: 0.2, asim: 0.35 }; pr.boca = { sonrisa: -0.35, abierta: 0, ancho: 0.85 };
      pr.manoD = [-0.16, 0.3, 0.36]; pr.codoD = [-1, -0.4, -0.1]; pr.dedoD = 1;
      bocaVoz(pr, t, T.o3, ENV.o3, 0.45); pr.boca.sonrisa = -0.35; pr.ojos.abiertos = 0.64;
    } else {
      // mira el papelito en blanco en su dedo; después a Maxi, que le trae el rollo
      pr.x = OSC_P6.x; pr.z = OSC_P6.z;
      pr.giro = cheat(pr.x, pr.z, WAL_P6.x, WAL_P6.z, cp, 0.45);
      Object.assign(pr, SECO);
      pr.manoD = [-0.1, 0.44, 0.36]; pr.codoD = [-1, -0.4, -0.1]; pr.dedoD = 1;
      pr.cabeza = { giro: -0.15, asiente: 0.32, ladea: 0.04 }; pr.ojos = { x: -0.2, y: -0.75, abiertos: 0.62, tension: 0.3 };
      if (t >= T.rollo + 0.15) { const m = mirar(pr.x, pr.z, pr.giro, maxi.raiz.position.clone().add(V3(0, 1.4, 0)), 1.55, 0.8); pr.cabeza = m.cabeza; pr.ojos = { ...pr.ojos, x: m.ojos.x, y: m.ojos.y }; }
    }
  } else if (pa === "Q4" || pa === "Q4b" || pa === "Q5") {
    pr.x = OSC_Q.x; pr.z = OSC_Q.z;
    const walW = walter.raiz.visible ? walter.raiz.position.clone().add(V3(0, 1.55, 0)) : W3(WAL_Q);
    pr.giro = cheat(pr.x, pr.z, WAL_Q.x, WAL_Q.z, cp, pa === "Q4" ? 0.3 : pa === "Q4b" ? 0.8 : 0.5);
    Object.assign(pr, mirar(pr.x, pr.z, pr.giro, pa === "Q4" && t < T.baja ? V3(X0, 1.2, Z0 - 0.5) : walW, 1.55, 0.8)); pr.ojos = { ...pr.ojos, abiertos: 1, feliz: 0.35 }; pr.boca = { sonrisa: 0.6, abierta: 0, ancho: 1.05 };
    if (pa === "Q4b") {
      // recibe la llave: media sonrisa, el mismo ritmo seco que el remate
      oscar.poner({ ...pr }); oscar.raiz.updateMatrixWorld(true);
      const u = eo(sg(t, T.llave - 0.15, T.llave + 0.1));
      pr.manoI = lerpV([0.29, -0.08, 0.05], aCuerpo(oscar, V3(lerp(OSC_Q.x, WAL_Q.x, 0.42), 1.15, lerp(OSC_Q.z, WAL_Q.z, 0.42))), u); pr.codoI = [1, -0.5, -0.1];
      pr.ojos = { ...pr.ojos, abiertos: 0.75, feliz: 0.45 }; pr.cejas = { alto: 0.1, ang: 0, asim: 0.4 }; pr.boca = { sonrisa: 0.5, abierta: 0, ancho: 1.0 };
      pr.cabeza = { giro: haciaCam(cp, pr.x, pr.z, pr.giro, 0.7), asiente: 0.02, ladea: 0.03 }; pr.ojos = { ...pr.ojos, x: 0.35, y: 0 };   // (r2) de 3/4 a cámara
      bocaVoz(pr, t, T.o5, ENV.o5, 0.5);
    }
    if (pa === "Q5") {
      pr.manoI = [0.2, 0.28, 0.4]; pr.codoI = [1, -0.5, -0.1];
      if (t >= T.senala) { oscar.poner({ ...pr }); oscar.raiz.updateMatrixWorld(true); const u = eo(sg(t, T.senala, T.senala + 0.2)); const cel = celW.getWorldPosition(new THREE.Vector3()); pr.manoI = lerpV([0.2, 0.28, 0.4], aCuerpo(oscar, oscar.raiz.position.clone().add(V3(0, 1.25, 0)).lerp(cel, 0.45)), u); pr.dedoI = 1; pr.codoI = [1, -0.3, -0.1]; }
      pr.ojos = { ...pr.ojos, abiertos: 0.85, feliz: 0.45 }; pr.cejas = { alto: 0.25, ang: 0, asim: 0.4 }; pr.boca = { sonrisa: 0.65, abierta: 0, ancho: 1.05 };
    }
  } else if (pa === "C") {
    pr.x = COL[1] + 0.36; pr.z = LZ + 0.55; pr.giro = 0.35;
    Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 0.95, feliz: 0.3, x: 0, y: 0.05 }, cejas: { alto: 0.4, ang: 0.2, asim: 0 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } });
    pr.cabeza = { giro: haciaCam(cp, pr.x, pr.z, pr.giro, 0.9), asiente: 0.0, ladea: 0.04 };
    oscar.poner({ ...pr }); oscar.raiz.updateMatrixWorld(true);
    pr.manoD = aCuerpo(oscar, V3(COL[1] + 0.17, 1.3, LZ + 0.2)); pr.codoD = [-1, -0.6, -0.2]; pr.manoI = [0.29, -0.08, 0.05];
    bocaVoz(pr, t, T.o7, ENV.o7, 0.55);
  }
  return pr;
}
// ---------- Walter ----------
function poseWalter(t, pa, cp) {
  const pr = BASE(WAL_P1.x, WAL_P1.z, 0, t);
  Object.assign(pr, { ...CARA.feliz, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.5 }, cejas: { alto: 0.5, ang: 0.15 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 } });
  if (pa === "P1" || pa === "Q1") {
    pr.giro = cheat(pr.x, pr.z, OSC_P1.x, OSC_P1.z, cp, 0.95);   // (r3) casi de frente: se le ve la boca
    Object.assign(pr, mirar(pr.x, pr.z, pr.giro, W3(OSC_P1), 1.55, 0.35));
    pr.manoD = [-0.2, 0.32, 0.32]; pr.codoD = [-1, -0.6, -0.1];   // la llave en la mano
    if (pa === "P1" && t >= T.sube) {
      // se va al auto: se da vuelta y camina hacia la puerta del conductor
      const u = eio(sg(t, T.sube, T.sube + 0.3)), w = sg(t, T.sube + 0.15, T.p2 + 0.4);
      pr.giro = lerp(pr.giro, Math.PI - 0.25, u); pr.x = lerp(WAL_P1.x, X0 + 1.4, w); pr.z = lerp(WAL_P1.z, Z0 + 0.2, w); pr.paso = w > 0 ? 1 : 0;
      pr.cabeza = { giro: 0, asiente: 0, ladea: 0 };
    }
    bocaVoz(pr, t, pa === "P1" ? T.w1 : T.w1b, ENV.w1, 0.7);
  } else if (pa === "P4" || pa === "P4w") {
    // (r2) baja de la cabina de la grúa (puerta del acompañante) y queda de frente; se rasca la cabeza
    GRUA.updateMatrixWorld(true);
    const a = GRUA.localToWorld(V3(0.8, 0, -3.95)), b = GRUA.localToWorld(V3(1.55, 0, -3.85));
    const tb = T.p4w, u = 1, v = eio(sg(t, tb, tb + 0.6));   // (r2b) en P4 va adentro de la cabina (no se ve); en P4w ya bajó, al lado de la puerta abierta: corte en la acción
    if (pa === "P4" && VERM !== "portada") { pr.x = a.x; pr.z = a.z; pr.y = 0.86; pr.sentado = 1; }
    else { pr.x = lerp(b.x, WAL_P4.x, v); pr.z = lerp(b.z, WAL_P4.z, v); pr.y = 0; pr.sentado = 0; }
    pr.paso = v > 0.02 && v < 0.97 ? 1 : 0;
    pr.giro = pa === "P4" && VERM !== "portada" ? 2.3 : lerp(1.3, giroA(WAL_P4.x, WAL_P4.z, cp[0], cp[2]) - 0.15, eio(sg(t, T.p4w, T.p4w + 0.35)));   // (r2b) en la cabina mira a cámara por la ventanilla; al bajar gira de frente
    Object.assign(pr, { ...CARA.incredula, ojos: { x: 0, y: 0, abiertos: 0.95 }, cejas: { alto: 0.6, ang: 0.6, asim: 0.4 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.85 } });
    pr.cabeza = { giro: 0.2, asiente: -0.02, ladea: 0.02 };
    const r = eio(sg(t, T.w2 + 0.9, T.w2 + 1.2));
    pr.manoD = lerpV([-0.29, -0.08, 0.05], [-0.2, 0.86 + Math.sin(t * 16) * 0.015, -0.06], r); pr.codoD = [-1, 0.2, -0.3];
    pr.cabeza.ladea = -0.08 * r;
    bocaVoz(pr, t, T.w2, ENV.w2, 0.65);
  } else if (pa === "P4b" || pa === "P5" || pa === "P6") {
    pr.x = WAL_G.x; pr.z = WAL_G.z; if (pa === "P6") { pr.x = WAL_P6.x; pr.z = WAL_P6.z; }
    const oo = pa === "P6" ? OSC_P6 : OSC_G; pr.giro = cheat(pr.x, pr.z, oo.x, oo.z, cp, 0.7);
    Object.assign(pr, mirar(pr.x, pr.z, pr.giro, W3(oo), 1.55, 0.8));
    pr.ojos = { ...pr.ojos, abiertos: 1, feliz: 0.15 }; pr.cejas = { alto: 0.55, ang: 0.5 }; pr.boca = { sonrisa: 0.2, abierta: 0, ancho: 0.95 };
    if (pa === "P5" && t > T.o3 + CORTE.o3) { pr.cejas = { alto: 0.8, ang: 0.4 }; pr.boca = { sonrisa: 0.05, abierta: 0.15, ancho: 0.8 }; }
    if (pa === "P6") {
      // con toda la buena fe, señala el parabrisas (la mano izquierda)
      const pap = papelG.getWorldPosition(new THREE.Vector3());
      walter.poner({ ...pr }); walter.raiz.updateMatrixWorld(true);
      const u = eo(sg(t, T.w3 - 0.05, T.w3 + 0.25));
      { const pc = walter.raiz.position.clone().add(V3(0, 1.22, 0)), d = pap.clone().sub(pc); d.y = 0; d.normalize(); pr.manoI = lerpV([0.29, -0.08, 0.05], aCuerpo(walter, pc.addScaledVector(d, 0.66).add(V3(0, -0.06, 0))), u); } pr.dedoI = 1; pr.codoI = [1, -0.1, -0.2];   // (r2) el brazo afuera, a la altura del hombro
      Object.assign(pr, { ...CARA.feliz, ojos: { ...pr.ojos, abiertos: 1, feliz: 0.55 }, cejas: { alto: 0.55, ang: 0.1 }, boca: { sonrisa: 0.9, abierta: 0, ancho: 1.15 } });
      bocaVoz(pr, t, T.w3, ENV.w3, 0.7);
    }
  } else if (pa === "Q4" || pa === "Q4b" || pa === "Q5") {
    // (r2) viene manejando (sentado, se lo ve por el vidrio), abre la puerta, baja y viene caminando con la llave en alto
    autoW.updateMatrixWorld(true);
    const asiento = autoW.localToWorld(V3(0.36, 0.0, autoW.userData.zA - 0.45)), afuera = autoW.localToWorld(V3(1.15, 0, autoW.userData.zA - 0.5));
    const s0 = eio(sg(t, T.baja, T.baja + 0.4)), u = eo(sg(t, T.baja + 0.35, T.baja + 1.0));
    pr.x = lerp(lerp(asiento.x, afuera.x, s0), WAL_Q.x, u); pr.z = lerp(lerp(asiento.z, afuera.z, s0), WAL_Q.z, u); pr.paso = u > 0.02 && u < 0.97 ? 1 : 0;
    pr.sentado = 1 - s0; pr.y = 0.3 * (1 - s0);
    pr.giro = s0 < 1 ? lerp(0, 1.4, s0) : lerp(1.4, cheat(WAL_Q.x, WAL_Q.z, OSC_Q.x, OSC_Q.z, cp, 0.6), eio(sg(u, 0.3, 1)));
    Object.assign(pr, mirar(pr.x, pr.z, pr.giro, W3(OSC_Q), 1.55, 0.8));
    if (pa === "Q4") { Object.assign(pr, { ...CARA.feliz, ojos: { ...pr.ojos, abiertos: 1, feliz: 0.55 } }); const k = eo(sg(t, T.w5 - 0.1, T.w5 + 0.2)); pr.manoD = lerpV([-0.22, 0.3, 0.3], [-0.34, 1.12, 0.02], k); pr.codoD = [-1, 0.1, 0]; bocaVoz(pr, t, T.w5, ENV.w5, 0.75); }   // (r2) la llave arriba de la cabeza
    else if (pa === "Q4b") { walter.poner({ ...pr }); walter.raiz.updateMatrixWorld(true); const k = eo(sg(t, T.llave - 0.25, T.llave + 0.05)); pr.manoD = lerpV([-0.34, 1.12, 0.02], aCuerpo(walter, V3(lerp(OSC_Q.x, WAL_Q.x, 0.55), 1.17, lerp(OSC_Q.z, WAL_Q.z, 0.55))), k); pr.codoD = [-1, -0.5, -0.1]; pr.boca = { sonrisa: 0.85, abierta: 0, ancho: 1.12 }; pr.ojos = { ...pr.ojos, feliz: 0.55 }; }
    else {
      // señala el parabrisas limpio (la derecha); el celular en la izquierda
      const pap = autoW.userData.para.localToWorld(V3(0.36, 0.12, 0.03));
      walter.poner({ ...pr }); walter.raiz.updateMatrixWorld(true);
      const k = eo(sg(t, T.w6 - 0.05, T.w6 + 0.2)), k2 = eio(sg(t, T.senala, T.senala + 0.3));
      { const pc = walter.raiz.position.clone().add(V3(0, 1.22, 0)), d = pap.clone().sub(pc); d.y = 0; d.normalize(); pr.manoD = lerpV([-0.29, -0.08, 0.05], aCuerpo(walter, pc.addScaledVector(d, 0.66).add(V3(0, -0.06, 0))), k * (1 - k2)); } pr.dedoD = 1 - k2; pr.codoD = [-1, -0.1, -0.2];
      pr.manoI = [0.08, 0.34, 0.36]; pr.codoI = [0.6, -0.8, -0.3];
      if (k2 > 0) { pr.cabeza = { giro: 0, asiente: 0.45 * k2, ladea: 0.02 }; pr.ojos = { x: 0, y: -0.7 * k2, abiertos: 1, feliz: 0.4 }; }
      pr.boca = { sonrisa: 0.6, abierta: 0, ancho: 1.05 }; pr.cejas = { alto: 0.55, ang: 0.3 };
      bocaVoz(pr, t, T.w6, ENV.w6, 0.7);
    }
  }
  return pr;
}
// ---------- Maxi ----------
function poseMaxi(t, pa, cp) {
  // sentado en la pila de cubiertas con el mate, aburrido
  const pr = BASE(CUB.x, CUB.z, 0.55, t);
  pr.y = ALTO_CUB - 0.42; pr.sentado = 1; pr.inclina = 0.08;
  Object.assign(pr, { ...CARA.neutra, ojos: { x: -0.2, y: 0, abiertos: 0.78, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.95 } });
  pr.manoD = [-0.1, 0.36, 0.32]; pr.codoD = [-0.8, -0.8, -0.2]; pr.manoI = [0.24, 0.1, 0.32];
  if (pa === "P3" || pa === "Q3m" || pa === "Q3g" || pa === "Q3h") {
    const habla = pa === "P3" ? T.m1 : T.m1b;
    const m = mirar(pr.x, pr.z, pr.giro, V3(OSC_B.x, 1.55, OSC_B.z), 1.15, 0.9);
    pr.cabeza = { giro: m.cabeza.giro, asiente: 0.02, ladea: 0.05 }; pr.ojos.x = m.ojos.x;
    if (pa === "Q3m") { pr.cabeza = { giro: 0.1, asiente: 0.42, ladea: 0.05 }; pr.ojos = { x: 0, y: -0.75, abiertos: 0.75, feliz: 0 }; pr.manoD = [-0.12, 0.08, 0.36]; pr.codoD = [-0.8, -0.6, -0.2]; }   // mira el mate, en la falda (r2)
    bocaVoz(pr, t, habla, ENV.m1, 0.6);
    if ((pa === "Q3g" || pa === "Q3h") && t >= T.o4) { pr.ojos = { ...pr.ojos, abiertos: 1, feliz: 0.3 }; pr.boca = { sonrisa: 0.5, abierta: 0, ancho: 1 }; }
  } else if (pa === "P6") {
    // llega con el rollo de papelitos y se lo acerca a Óscar, sin decir nada
    const u = eio(sg(t, T.rollo - 0.85, T.rollo + 0.1));   // (r3) entra caminando por detrás de Walter (entre él y el auto), sin taparle la cara
    const A6 = { x: X0 - 2.3, z: Z0 + 1.2 }, G6 = { x: X0 + 0.2, z: Z0 + 1.3 };
    Object.assign(pr, BASE(lerp(A6.x, G6.x, u), lerp(A6.z, G6.z, u), lerp(giroA(A6.x, A6.z, G6.x, G6.z), cheat(G6.x, G6.z, OSC_P6.x, OSC_P6.z, cp, 0.3), eio(sg(u, 0.6, 1))), t));
    pr.paso = u > 0.02 && u < 0.97 ? 1 : 0; pr.sentado = 0; pr.y = 0;   // (r2) camina parado
    Object.assign(pr, { ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 0.8, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.92 } });
    const v = eo(sg(t, T.rollo, T.rollo + 0.25));
    pr.manoD = lerpV([-0.2, 0.25, 0.3], [-0.1, 0.45, 0.52], v); pr.codoD = [-1, -0.5, -0.1];
  } else if (pa === "Q5b") {
    // tira el rollo al cajón del banco (abierto) y lo cierra
    Object.assign(pr, BASE(BANCO.x + 1.35, BANCO.z + 0.85, -2.2, t));
    Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: -0.3, abiertos: 0.9, feliz: 0.3 } });
    const u = eo(sg(t, T.tira - 0.05, T.tira + 0.2));
    pr.manoD = lerpV([-0.2, 0.4, 0.35], [-0.32, 0.4, 0.55], u); pr.codoD = [-1, -0.4, -0.1];
  }
  return pr;
}

// ================= RENDER =================
const CAM_PORTADA = [4.75, 1.4, -10.3, 2.1, 1.5, -5.6, 52];
function renderAt(tIn) {
  tIn = Math.min(tIn, DUR - 0.034);
  AVISOS.length = 0;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = VERM === "portada" ? "P4w" : planoActual;   // (r2b) portada: Walter de frente en la vereda, la grúa humeando atrás
  const tt = VERM === "portada" ? T.p4b - 0.2 : t;
  const camPre = pl[2] ? catmull(pl[2], tt) : null;
  const cp = VERM === "portada" ? CAM_PORTADA : camPre || CAM_P1(0);
  const enCab = ["P2", "P4c", "Q2"].includes(pa);
  ponerLuces(enCab ? "cab" : "taller");
  scene.background.setHex(enCab ? 0xdfe9ee : 0xe9ece6);
  const tarde = ["P1", "Q1", "Q1i", "P4", "P4w", "P4b", "P5", "P6", "C"].includes(pa);
  sol.color.setHex(tarde ? 0xffe2bf : 0xfff6ea); sol.intensity = tarde ? 1.65 : 1.5;
  tabletBanco.visible = parte2;
  // ---- el auto de Walter (en el piso): P1/Q1 quieto; Q4 entra manejando; C arriba en el elevador ----
  const uw = autoW.userData;
  autoW.visible = ["P1", "Q1", "Q1i", "Q4", "Q4b", "Q5", "Q5i", "C"].includes(pa);
  autoW.rotation.set(0, 0, 0); autoW.position.set(CARPOS.x, 0, CARPOS.z);
  for (const r of uw.ruedas) r.rotation.x = 0;
  papel.visible = pa === "P1";
  let puertaAb = 0;
  if (pa === "Q4") {
    const u = eo(sg(t, T.q4 - 0.3, T.frena));
    autoW.position.z = CARPOS.z - (1 - u) * 4.4;
    for (const r of uw.ruedas) r.rotation.x = (u - 1) * 4.4 / 0.3;
    puertaAb = 1 - eio(sg(t, T.q4 + 0.4, T.q4 + 0.6));   // (r3) ya abierta al arrancar Q4; la cierra al alejarse
  }
    uw.puerta.rotation.y = -puertaAb * 1.15;
  let hElev = 0, abreElev = 0.85;
  if (pa === "C") { hElev = 1.3; abreElev = 1; autoW.position.set(LX, hElev + 0.23, LZ); }
  autoE.visible = parte2 && (pa === "Q3g" || pa === "Q3h" || pa === "Q3");   // (r1) en Q3m todavía no se ve
  if (autoE.visible) { hElev = 1.45; abreElev = 1; autoE.position.set(LX, hElev + 0.23, LZ); }
  ponerElevador(hElev, abreElev);
  for (const a of autosVereda) a.visible = ["Q3", "Q3m", "Q3g", "Q3h"].includes(pa);
  // ---- la grúa (P4-P6): entra de culata; la plancha se inclina; la baliza gira; el humo ----
  SET.userData.cartelIn.visible = SET.userData.cartelAf.visible = !(["P1", "Q1", "P4", "P6", "Q3g", "Q5"].includes(pa));   // (r2b) en P1/Q1/P6 asomaba cortado por el borde
  const conGrua = ["P4", "P4w", "P4b", "P5", "P6"].includes(pa);
  GRUA.visible = conGrua;
  if (conGrua) {
    const u = eio(sg(tt, T.p4 - 0.1, T.gPara));   // (r3) recula de culata durante P4
    GRUA.position.set(PCX, 0, lerp(-6.6, -4.6, u));
    PUERTA_G.rotation.y = tt >= T.p4w && VERM !== "portada" ? 1.1 : 0;   // (r2b) cerrada en P4, abierta desde P4w
    PLANCHA.rotation.x = 0.16 * eio(sg(tt, T.tilt, T.tiltFin));
    BALIZA.rotation.y = tt * 7;
    BALIZA.userData.lente.emissiveIntensity = 0.5 + 0.5 * Math.max(0, Math.sin(tt * 14));
    GRUA.updateMatrixWorld(true);
  }
  papelG.visible = !(["P5", "P6"].includes(pa) || (pa === "P4b" && t >= T.despega));
  ponerHumo(tt, conGrua && pa !== "P6" && (pa !== "P4w" || VERM === "portada"), pa === "P4" ? 1 : 0.7);
  // ---- el interior del auto (P2, P4c, Q2, Q4i): el papelito por mes, el sol, el cuentakilómetros ----
  if (enCab) {
    let mes = 0, km = 91000, col = "#efeee5";
    if (pa === "P2") { mes = Math.max(0, T.meses.filter((a) => t >= a).length - 1); km = [91000, 95000, 108000, 125000][mes]; mes += 1; if (mes === 4) col = "#c7655b"; }
    if (pa === "P4c") { mes = 4; km = 125000; col = "#c7655b"; }
    if (pa === "Q2") { mes = 2; km = 94800; if (t > T.q2 + 0.15) col = "#16243d"; }   // (r2) atrás del celular no compite
    if (pa === "Q4i") { km = 95300; col = "#5ce611"; mes = 2; }
    papelI.visible = pa === "P2";   // (r2) en P4c ya se despegó
    paredP4c.visible = pa === "P4c";
    papelI.material.map = papelT[Math.min(4, mes)];
    ticket.visible = (pa === "P2" && mes >= 3) || pa === "P4c";
    const sp = SOL_MES[Math.min(mes, 4)];
    solCab.position.set(40.3 + sp[0], sp[1] + 0.9, -0.5 + sp[2]);
    dibujarOdo(km, col);
  }
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  manoO.visible = false; mate.visible = false; rollo.visible = false; papelSuelto.visible = false; celW.visible = false; tabletO.visible = false; llave.visible = false;
  const conOscar = ["P1", "Q1", "P3", "Q3m", "Q3g", "Q3h", "P4", "P4b", "P5", "P6", "Q4", "Q4b", "Q5", "Q5b", "C"].includes(pa);
  const conWalter = ["P1", "Q1", "P4", "P4w", "P5", "P6", "Q4", "Q4b", "Q5"].includes(pa);
  const conMaxi = ["P3", "Q3m", "Q3g", "Q3h", "P6", "Q5b"].includes(pa) && !(pa === "Q3g" && t > T.q3h - 0.45) && !(pa === "P6" && t < T.rollo - 0.85);
  // primero el que se mira: Walter (con una pose provisoria), después Óscar, después Walter de nuevo
  if (conWalter) { walter.raiz.visible = true; walter.poner(poseWalter(tt, pa, cp)); }
  if (conMaxi) { maxi.raiz.visible = true; maxi.poner(poseMaxi(tt, pa, cp)); }
  if (conOscar) { oscar.raiz.visible = true; oscar.poner(poseOscar(tt, pa, cp)); }
  if (conWalter) walter.poner(poseWalter(tt, pa, cp));
  walter.raiz.scale.setScalar(pa === "P4" && VERM !== "portada" ? 0.8 : 1);   // (r2b) sentado en la cabina de la grúa: entra sin pasar el techo
  llave.visible = conWalter && ["P1", "Q1", "Q4", "Q4b"].includes(pa) && !(pa === "Q4b" && t > T.llave + 0.05);
  trapoMano.visible = pa === "P1" && t >= T.sube + 0.1; trapoBolsillo.visible = !trapoMano.visible && !parte2;   // (r3) en la parte 2 no hay nada blanco y rojo en la mano que se confunda con el papelito
  // el mate de Maxi en la mano derecha (P3, Q3g)
  if (maxi.raiz.visible && (pa === "P3" || pa === "Q3m" || pa === "Q3g" || pa === "Q3h")) { mate.visible = true; maxi.raiz.updateMatrixWorld(true); const h = maxi.brazos[1].mano.getWorldPosition(new THREE.Vector3()); mate.position.copy(h).add(V3(0, -0.06, 0)); mate.rotation.set(0, 0.5, 0); }
  // el rollo de papelitos (Maxi en P6 y Q5b)
  if (maxi.raiz.visible && (pa === "P6" || pa === "Q5b")) {
    rollo.visible = true; maxi.raiz.updateMatrixWorld(true);
    const h = maxi.brazos[1].mano.getWorldPosition(new THREE.Vector3());
    rollo.position.copy(h).add(V3(0, -0.02, 0)); rollo.rotation.set(0, maxi.raiz.rotation.y, Math.PI / 2);
    if (pa === "Q5b" && t >= T.tira + 0.12) {
      const c = CAJON.localToWorld(V3(0, 0.05, -0.25)); const u = sg(t, T.tira + 0.12, T.tira + 0.45);
      rollo.position.lerpVectors(h, c, u); rollo.position.y += Math.sin(u * Math.PI) * 0.35; rollo.rotation.x = u * 6;
      if (u >= 1) rollo.visible = false;
    }
  }
  CAJON.position.z = BANCO.z + BANCO.P / 2 - 0.02 + (pa === "Q5b" ? 0.32 * (1 - eio(sg(t, T.cajon - 0.1, T.cajon + 0.12))) : 0);
  // el papelito despegado en el dedo de Óscar (P4b después de despegar, P5, P6)
  if (oscar.raiz.visible && (pa === "P5" || pa === "P6" || (pa === "P4b" && t >= T.despega + 0.05))) {
    papelSuelto.visible = true; oscar.raiz.updateMatrixWorld(true);
    const h = oscar.brazos[1].mano.localToWorld(V3(0.0, -0.13, 0.04));
    papelSuelto.position.copy(h); papelSuelto.lookAt(V3(cp[0], cp[1], cp[2])); papelSuelto.rotateZ(0.2);
  }
  // la tablet en las manos de Óscar (Q1)
  if (oscar.raiz.visible && pa === "Q1") { tabletO.visible = true; tabletO.userData.manoI.visible = tabletO.userData.manoD.visible = false; oscar.raiz.updateMatrixWorld(true); const a = oscar.brazos[0].mano.getWorldPosition(new THREE.Vector3()), b = oscar.brazos[1].mano.getWorldPosition(new THREE.Vector3()); tabletO.position.copy(a.clone().add(b).multiplyScalar(0.5)).add(V3(0, 0.1, 0)); tabletO.rotation.set(-0.55, oscar.raiz.rotation.y, 0, "YXZ"); }
  // el celular de Walter en la mano izquierda (Q5)
  if (walter.raiz.visible && pa === "Q5") {
    celW.visible = true; manoW.visible = false; celW.scale.setScalar(1.25); walter.raiz.updateMatrixWorld(true);
    const h = walter.brazos[0].mano.getWorldPosition(new THREE.Vector3());
    celW.position.copy(h).add(V3(0, 0.1, 0)); celW.lookAt(V3(cp[0], cp[1], cp[2]));
    if (t >= T.vibra && t < T.vibra + 0.4) celW.rotateZ(Math.sin(t * 90) * 0.08);
    dibujarCel(t, t >= T.vibra ? "hecho" : "chat");
  }
  // ---- cámara ----
  if (pl[2]) { ponerCam(camPre, t); camera.updateMatrixWorld(true); }
  if (pa === "P4b") {
    // el inserto: el papelito en blanco en el parabrisas, la mano de Óscar que lo despega
    papelG.updateMatrixWorld(true);
    const c = papelG.localToWorld(V3(0.06, -0.1, 0)), n = V3(0, 0, 1).transformDirection(papelG.matrixWorld);
    const d = 0.6 / (2 * Math.tan((40 * D2R) / 2) * 0.5625) + 0.08 * (1 - eo(sg(t, T.p4b, T.p4b + 0.6)));   // (r2b) el papelito ~35 % del ancho, con el parante, el techo, el capó y el limpiaparabrisas en cuadro
    const upw = V3(0, 1, 0).transformDirection(papelG.matrixWorld);
    const p = c.clone().add(n.clone().multiplyScalar(d)).addScaledVector(upw, -0.35); ponerCam([p.x, p.y, p.z, c.x, c.y, c.z, 40], t, true);
    // la mano de Óscar entra por la derecha, agarra la esquina y lo despega
    const ri = V3(1, 0, 0).transformDirection(papelG.matrixWorld), up = V3(0, 1, 0).transformDirection(papelG.matrixWorld);
    const esq = papelG.localToWorld(V3(0.1, -0.06, 0.01));
    const u = eo(sg(t, T.p4b - 0.2, T.despega - 0.02)), v = eio(sg(t, T.despega, T.despega + 0.35));   // (r2) la mano está desde el primer cuadro
    const pm = esq.clone().addScaledVector(ri, (1 - u) * 0.2).addScaledVector(up, v * 0.12).addScaledVector(n, 0.03 + v * 0.1);
    manoO.visible = true; manoO.position.copy(pm); manoO.quaternion.copy(camera.quaternion); manoO.rotateZ(0.9); manoO.scale.setScalar(1.3);
    oscar.raiz.visible = false; papelSuelto.visible = false;
    if (t >= T.despega) { papelSuelto.visible = true; papelSuelto.position.copy(papelG.getWorldPosition(new THREE.Vector3()).addScaledVector(up, v * 0.12).addScaledVector(n, 0.02 + v * 0.1)); papelSuelto.quaternion.copy(papelG.getWorldQuaternion(new THREE.Quaternion())); papelSuelto.rotateZ(-0.25 * v); papelSuelto.rotateX(-0.5 * v); }
  }
  if (pa === "Q1i") {
    // la ficha en la tablet de Óscar, a casi pantalla llena
    tabletO.visible = true; tabletO.userData.manoI.visible = tabletO.userData.manoD.visible = false; tabletO.position.set(OSC_P1.x - 0.2, 1.25, OSC_P1.z + 0.35); tabletO.rotation.set(-0.25, -0.35, 0, "YXZ");
    oscar.raiz.visible = false; walter.raiz.visible = false; llave.visible = false;
    camPantalla(tabletO, V3(0, 0.035, 0.0075), V3(0, 0, 1), 0.33, 0.6, 40, t, 0.05 * (1 - eo(sg(t, T.q1i, T.q1i + 0.5))));   // (r2) vertical, ~60 % del alto, con las manos
  }
  if (pa === "Q2") {
    // agosto: en el auto; el celular de Walter sube y la cámara se le acerca hasta llenar el cuadro
    celW.visible = true; manoW.visible = true; celW.scale.setScalar(1.0);
    const u = eo(sg(t, T.q2, T.q2 + 0.35));
    celW.position.set(40 - 0.04, lerp(0.8, 1.04, u), -0.02); celW.rotation.set(-0.12, 0, 0.03);
    const v = eio(sg(t, T.q2 + 0.15, T.q2 + 0.55));
    ponerCam(CAM_P2(0.5), t, true); camera.updateMatrixWorld(true);
    const c1 = camera.position.clone(), q1 = camera.quaternion.clone();
    const r = camPantalla(celW, V3(0, -0.012, 0.0075), V3(0, 0, 1), 0.172, 0.58, 40, t);
    const q2 = camera.quaternion.clone();
    camera.position.lerpVectors(c1, r.p, v); camera.quaternion.slerpQuaternions(q1, q2, v); camera.fov = lerp(62, 40, v); camera.updateProjectionMatrix();
    const k = eo(sg(t, T.toca - 0.2, T.toca)) * (1 - eo(sg(t, T.reservado, T.reservado + 0.25)));
    manoW.userData.pulgar.rotation.z = 0.5 * k; manoW.userData.pulgar.position.y = 0.05 * k;
    dibujarCel(t, "chat");
  }
  if (pa === "Q3") {
    // la tablet del banco a pantalla (el panel)
    tabletBanco.updateMatrixWorld(true);
    const piv = tabletBanco.userData.pivote, [, H] = tabletBanco.userData.tam;
    camPantalla(piv, V3(0, H / 2 - 0.005, 0.0065), V3(0, 0, 1), H, 0.35, 40, t, 0.08 * (1 - eo(sg(t, T.q3, T.q3 + 0.7))));
    oscar.raiz.visible = false;
  }
  if (pa === "Q5i") {
    // el celular de Walter: Service hecho
    celW.visible = true; manoW.visible = true; celW.scale.setScalar(1.0);
    celW.position.set(WAL_Q.x - 0.3, 1.25, WAL_Q.z + 0.3); celW.rotation.set(-0.2, -0.6, 0.02);
    camPantalla(celW, V3(0, 0.014, 0.0075), V3(0, 0, 1), 0.172, 0.6, 40, t, 0.02 * (1 - eo(sg(t, T.q5i, T.q5i + 0.4))));
    walter.raiz.visible = false; oscar.raiz.visible = false; llave.visible = false;
    dibujarCel(t, "hecho");
  }
  if (pa === "Q1" || pa === "Q1i") dibujarFicha(t);
  if (parte2) dibujarPanel(pa === "Q3" ? t : T.cuentaFin + 1);
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  if (VERM === "portada") ponerCam(CAM_PORTADA, t, true);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROT_) ROT_[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  INS_PAPEL.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2) && VERM !== "portada") {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const rot = (k, ti, cy, fin = 99, cx = 540) => { if (t >= ti && t < fin) ponerGlobo(ROT_[k], cx, cy, ent(ti), null, 3); };
    const fase = (k, ti, c = CORTE[k]) => { const tc = ti + c; return t < tc ? [GL[k + "a"], ent(ti - 0.04)] : [GL[k], 0.94 + 0.06 * bk(sg(t, tc, tc + 0.18))]   /* (r3) crece sin achicarse */; };
    const fija = (g, e, cx, abajo, obj) => ponerGlobo(g, cx, abajo - g.userData.H / 2, e, obj && obj[0] > 40 && obj[0] < 1040 && obj[1] > 0 && obj[1] < 1900 ? obj : null, 1);
    if (pa === "P1") {
      if (t >= T.o1 - 0.04 && t < T.w1 - 0.02) { const [g, e] = fase("o1", T.o1); fija(g, e, 540, 1650, enPantalla(bocaW(oscar))); }
      if (t >= T.w1 - 0.04 && t < T.sube + 0.1) fija(GL.w1, ent(T.w1 - 0.04), 620, 1650, enPantalla(bocaW(walter)));
      // el inserto del papelito: la calcomanía a la vista, con la guía al parabrisas
      if (t < T.w1 - 0.1) { ponerGlobo(INS_PAPEL, 790, 1230, 1, null, 2); const [px, py] = enPantalla(papel.getWorldPosition(new THREE.Vector3())); ponerGuia(GUIAS[0], 570, 1230, px, py, 1); }
    }
    if (pa === "Q1") { if (t >= T.o1b - 0.04) { const [g, e] = fase("o1b", T.o1b, CORTE.o1); fija(g, e, 540, 1650, enPantalla(bocaW(oscar))); } }
    if (pa === "Q1i") { if (t >= T.w1b - 0.04) ponerGlobo(GL.w1b, 540, 205 + GL.w1b.userData.H / 2, ent(T.w1b - 0.04), null, 1); }   // (r2) sin el rótulo: la ficha se lee sola
    if (pa === "P3") {
      if (t >= T.m1 - 0.04 && t < T.o2 - 0.05) hablar(GL.m1, maxi, ent(T.m1 - 0.04), 1, 40, 420);
      if (t >= T.o2 - 0.04) { const [g, e] = fase("o2", T.o2); hablar(g, oscar, e, 1, 0, 420); }
      if (t < T.rot38) { rot("cero", T.rot0, 330); if (t >= T.rot0 && t < T.o2 - 0.05) { const [ex, ey] = enPantalla(V3(COL[1] - 0.3, 0.3, LZ + 0.55)); ponerGuia(GUIAS[0], 470, 400, ex, ey, eo(sg(t, T.rot0, T.rot0 + 0.25))); } }
      else rot("n38", T.rot38, 1650);
    }
    if (pa === "P4w") { if (t >= T.w2 - 0.04) { const [g, e] = fase("w2", T.w2); hablar(g, walter, e, 1, 0, 260); } }
    if (pa === "P4b") {
      if (t >= T.p4b) { rot("ultimo", T.p4b, 330); const [px, py] = enPantalla((papelG.visible ? papelG : papelSuelto).getWorldPosition(new THREE.Vector3())); if (papelG.visible || papelSuelto.visible) ponerGuia(GUIAS[0], 540, 410, px, py, eo(sg(t, T.p4b + 0.1, T.p4b + 0.3))); }
    }
    if (pa === "P4c") ponerGlobo(ROT_.ultimo, 540, 330, 1, null, 3);
    if (pa === "P5") { if (t >= T.o3 - 0.04) { const c = T.o3 + CORTE.o3; const g = t < c ? GL.o3a : GL.o3, e = t < c ? ent(T.o3 - 0.04) : 0.75 + 0.25 * bk(sg(t, c, c + 0.18)); fija(g, e, 540, BUR5, enPantalla(bocaW(oscar))); } }
    if (pa === "P6") { if (t >= T.w3 - 0.04) fija(GL.w3, ent(T.w3 - 0.04), 540, BUR6, enPantalla(bocaW(walter))); }
    if (pa === "Q2") { rot("q2", T.rotQ2, 1650); }
    if (pa === "Q3") rot("q3", T.rotQ3, 1650);
    if (pa === "Q3m") { if (t >= T.m1b - 0.04) hablar(GL.m1b, maxi, ent(T.m1b - 0.04), 1, 0, 260, 1860, 150); }
    if (pa === "Q3g") rot("n44", T.rot44, 1480);   // (r3) abajo, sobre el piso: los tres autos enteros arriba
    if (pa === "Q3h") { if (t >= T.o4 - 0.04) { const [g, e] = fase("o4", T.o4); hablar(g, oscar, e, 1, 0, 420); } rot("n44", T.rot44, 330); }
    if (pa === "Q4") { if (t >= T.w5 - 0.04) hablar(GL.w5, walter, ent(T.w5 - 0.04), 1, 0, 260); }
    if (pa === "Q4b") { if (t >= T.o5 - 0.04) { const [g, e] = fase("o5", T.o5); fija(g, e, 540, BUR5, enPantalla(bocaW(oscar))); } }
    if (pa === "Q5") { if (t >= T.w6 - 0.04) fija(GL.w6, ent(T.w6 - 0.04), 540, BUR6, enPantalla(bocaW(walter))); }
    if (pa === "Q5i") { if (t >= T.o6 - 0.04) ponerGlobo(GL.o6, 540, 205 + GL.o6.userData.H / 2, ent(T.o6 - 0.04), null, 1); }
  }
  renderer.render(scene, camera);
}
const BUR5 = 640, BUR6 = 640;   // dónde van las burbujas fijas de los callbacks (el borde de abajo)
window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); const cab = (p) => p.raiz.visible ? p.cabeza.getWorldPosition(new THREE.Vector3()).toArray().map((v) => +v.toFixed(2)) : null; return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)), oscar: cab(oscar), walter: cab(walter), maxi: cab(maxi), cartelIn: SET.userData.cartelIn.visible, wRot: +walter.raiz.rotation.y.toFixed(2), wPos: walter.raiz.position.toArray().map((v) => +v.toFixed(2)), papelG: papelG.getWorldPosition(new THREE.Vector3()).toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
