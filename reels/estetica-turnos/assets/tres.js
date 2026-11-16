// Capa 3D de estetica-turnos (Three.js r170 local). Base técnica: reels/dice-cuarenta (globos pegados a la cámara en
// píxeles de pantalla, avatares por render target, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom,
// insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// UN lugar: el centro de estética de Lorena, de día. El gabinete (z de -3 a 0) se ve por un arco ancho desde la
// recepción (z de 0 a 4,4). La camilla corre a lo largo de z (la cabecera levantada al fondo); la lámpara lupa sobre la
// cabecera, el carrito a la izquierda, Vale en el banquito a la derecha, el reloj en la pared del fondo, la persiana a la
// derecha del reloj. En la recepción: el mostrador con la tablet, el estante con las toallas (y los dos cisnes en la
// parte 2), la puerta de vidrio con la campanita. El living de Graciela es un set chico aparte (x = 30).
//   PARTE 1: 15:00 el audio de Carolina ("me surgió algo") · "Tranqui." · tacha · el reloj corre · el mensaje a Mariana
//            y "escribiendo…" · tacha · 17:00 el audio de Jimena · tacha · Vale: rollo → cisne → dos cisnes en corazón ·
//            la pausa con el costo · "Lo único puntual hoy fueron las excusas." · Carolina otra vez · la hoja nueva ·
//            "Te lo guardo." · Vale agarra otra toalla
//   PARTE 2: la recepción: "Te mando el link." · la reserva con seña · el recordatorio a los tres celulares · la lista
//            de espera (Graciela: "¡Me lo quedo!") · jueves 15:00: entra Carolina · "Mirá vos. Hoy le surgió venir." ·
//            la tablet con el jueves lleno y Sofi en videollamada: "Comentá TURNOS…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, CARA, BRAZOS, poseEn, pegarACamara, crearCelular, crearLapicera, crearTablet } from "./personajes.js";
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
const en = (t, a, b) => t >= a && t < b;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
function claves(t, K, f = eio) {
  if (t <= K[0][0]) return K[0][1];
  for (let i = 1; i < K.length; i++) if (t < K[i][0]) return lerp(K[i - 1][1], K[i][1], f(sg(t, K[i - 1][0], K[i][0])));
  return K[K.length - 1][1];
}

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
scene.background = new THREE.Color(0xd9d7c9);
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

// ---------- luces: tarde por la persiana (sol cálido desde atrás a la derecha), techo, relleno desde la recepción ----------
const sol = new THREE.DirectionalLight(0xfff1dc, 1.7);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 25 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xfffaf0, 0x8a8072, 1.75); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xf4f6ff, 0.75); relleno.position.set(-2, 3, 8); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xfff0dc, 0.5); rim.position.set(3, 4, -9); scene.add(rim);
function ponerSol(cx, cz) { sol.position.set(cx + 4, 7, cz - 6); sol.target.position.set(cx, 0.6, cz); sol.target.updateMatrixWorld(); }

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, gp: 0xcfeebc, red: 0xc7655b, blanco: 0xf8f7f2, piso: 0xc9c5b6, metal: 0xc4c8cf };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.75), cr2: mat(C.cr2, 0.75), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  blanco: mat(C.blanco, 0.85), metal: mat(C.metal, 0.3, { metalness: 0.5 }), goma: mat(0x23262c, 0.8), pared: mat(0xece9dc, 0.92),
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
// LAS TOALLAS (textura de rizo: blanco con líneas finas crema) Y SUS FORMAS
// =====================================================================================================
const rizoT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#f8f7f2"; x.fillRect(0, 0, w, h); x.fillStyle = "#e4e1d4"; for (let i = 0; i < 16; i++) x.fillRect(0, i * 16 + 6, w, 4); });
rizoT.wrapS = rizoT.wrapT = THREE.RepeatWrapping;
const TOALLA = new THREE.MeshStandardMaterial({ map: rizoT, roughness: 0.95 });
const TOALLA_V = mat(C.gp, 0.95);
// el rollo: cilindro con la espiral en las puntas
const espiralT = lienzo(256, 256, (x, w) => { x.fillStyle = "#f8f7f2"; x.beginPath(); x.arc(w / 2, w / 2, w / 2, 0, 7); x.fill(); x.strokeStyle = "#d8d4c4"; x.lineWidth = 10; x.beginPath(); for (let a = 0; a < 6 * Math.PI; a += 0.1) { const r = 12 + a * 6; x.lineTo(w / 2 + Math.cos(a) * r, w / 2 + Math.sin(a) * r); } x.stroke(); });
function crearRollo(R = 0.05, L = 0.3, m = TOALLA) {
  const g = new THREE.Group();
  const pm = new THREE.MeshStandardMaterial({ map: espiralT, roughness: 0.95 });
  const c = mesh(new THREE.CylinderGeometry(R, R, L, 24), [m, pm, pm]); c.rotation.z = Math.PI / 2; g.add(c);
  return g;
}
// el cisne de toalla: cuerpo de rollo (bote) con la cola levantada, cuello en S y la cabeza en punta. Mira hacia +x.
// k = 0..1: cuánto está armado (0 = rollo, 1 = cisne): el cuello sube desde el cuerpo
const CUELLO = new THREE.CatmullRomCurve3([V3(0.11, 0.05, 0), V3(0.06, 0.16, 0), V3(0.02, 0.27, 0), V3(0.07, 0.36, 0), V3(0.14, 0.35, 0), V3(0.17, 0.3, 0)]);
function crearCisne() {
  const g = new THREE.Group();
  const cuerpo = mesh(new THREE.SphereGeometry(1, 24, 16), TOALLA); cuerpo.scale.set(0.16, 0.075, 0.1); cuerpo.position.y = 0.06; g.add(cuerpo);
  const cola = mesh(new THREE.ConeGeometry(0.06, 0.12, 14), TOALLA); cola.position.set(-0.15, 0.1, 0); cola.rotation.z = 1.0; g.add(cola);
  for (const s of [-1, 1]) { const ala = mesh(new THREE.SphereGeometry(1, 16, 10), TOALLA); ala.scale.set(0.12, 0.05, 0.035); ala.position.set(-0.02, 0.1, s * 0.075); ala.rotation.z = 0.25; g.add(ala); }
  // el cuello: tubo que se afina (radios por segmento)
  const tubo = new THREE.TubeGeometry(CUELLO, 40, 0.026, 10, false);
  const pos = tubo.attributes.position, n = 41, r = 11;
  for (let i = 0; i < n; i++) {
    const k = lerp(1.15, 0.7, i / (n - 1)), c = CUELLO.getPointAt(i / (n - 1));
    for (let j = 0; j < r; j++) { const id = i * r + j; pos.setXYZ(id, c.x + (pos.getX(id) - c.x) * k, c.y + (pos.getY(id) - c.y) * k, c.z + (pos.getZ(id) - c.z) * k); }
  }
  tubo.computeVertexNormals();
  const cuello = mesh(tubo, TOALLA); g.add(cuello);
  const cab = mesh(new THREE.SphereGeometry(1, 16, 12), TOALLA); cab.scale.set(0.03, 0.026, 0.024); cab.position.copy(CUELLO.getPointAt(1)); g.add(cab);
  const pico = mesh(new THREE.ConeGeometry(0.016, 0.06, 10), TOALLA); pico.position.copy(CUELLO.getPointAt(1)).add(V3(0.025, -0.03, 0)); pico.rotation.z = Math.PI * 0.82; g.add(pico);
  g.userData = { cuello, cab, pico };
  return g;
}
// la toalla doblada en cuadrado
function crearDoblada(m = TOALLA) { const g = new THREE.Group(); g.add(caja(0.3, 0.05, 0.22, m, 0, 0.025, 0, 0.02)); g.add(caja(0.3, 0.012, 0.2, mat(0xe4e1d4, 0.95), 0, 0.052, -0.005, 0.005)); return g; }

// =====================================================================================================
// EL CENTRO DE ESTÉTICA: gabinete (z -3 .. 0) + recepción (z 0 .. 4,4)
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const GX = 1.95, GZ = -3.05, RZ = 4.45, ALTO = 2.75;
const CAMILLA = { x: -0.2, z: -1.75, rot: 0.55, largo: 1.85, ancho: 0.66, alto: 0.7 };   // a lo largo de z girada 0,55 rad: la cabecera atrás a la izquierda
const VALE0 = { x: 0.78, z: -1.85 };
const LOR0 = { x: -0.5, z: 0.3 };
const MOSTR = { x: 0, z: 3.2, ancho: 1.8, prof: 0.55, alto: 1.02 };
let relojG, persiana, puertaV;
const vinT = lienzo(1024, 256, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "Lorena Estética", 800, 150, w - 40); x.fillText("Lorena Estética", w / 2, h / 2); });
{
  // piso vinílico gris-crema liso, zócalo navy, paredes crema lisas
  const piso = mesh(new THREE.PlaneGeometry(6, 9), mat(C.piso, 0.8), 0, 0, 0.7); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  const pared = (w, h, x, y, z, ry) => { const p = mesh(new THREE.BoxGeometry(w, h, 0.1), M.pared, x, y, z); p.rotation.y = ry; p.castShadow = false; SET.add(p); return p; };
  const zocalo = (w, x, z, ry) => { const p = caja(w, 0.12, 0.03, M.navy3, x, 0.06, z, 0.005); p.rotation.y = ry; SET.add(p); };
  // gabinete
  pared(2 * GX + 0.1, ALTO, 0, ALTO / 2, GZ, 0); zocalo(2 * GX, 0, GZ + 0.065, 0);
  for (const s of [-1, 1]) { pared(-GZ + RZ + 0.1, ALTO, s * GX, ALTO / 2, (GZ + RZ) / 2, Math.PI / 2); zocalo(-GZ + RZ, s * (GX - 0.065), (GZ + RZ) / 2, Math.PI / 2); }
  // el arco ancho entre el gabinete y la recepción (paños a los costados y dintel), con el marco navy
  for (const s of [-1, 1]) { const p = caja(0.8, ALTO, 0.12, M.pared, s * (GX - 0.4), ALTO / 2, 0, 0.005); p.castShadow = false; SET.add(p); SET.add(caja(0.06, 2.3, 0.16, M.navy3, s * (GX - 0.8), 1.15, 0, 0.01)); }
  { const d = caja(2 * GX, ALTO - 2.3, 0.12, M.pared, 0, 2.3 + (ALTO - 2.3) / 2, 0, 0.005); d.castShadow = false; SET.add(d); SET.add(caja(2 * (GX - 0.8) + 0.06, 0.06, 0.16, M.navy3, 0, 2.3, 0, 0.01)); }
  // techo
  const techo = mesh(new THREE.PlaneGeometry(6, 9), mat(0xe2dfd2, 0.95), 0, ALTO, 0.7); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
  // la recepción: la pared del fondo (detrás del mostrador)
  pared(2 * GX + 0.1, ALTO, 0, ALTO / 2, RZ, 0); zocalo(2 * GX, 0, RZ - 0.065, 0);
  // ---- la ventana con persiana americana (pared del fondo del gabinete, a la derecha) ----
  const VX = 0.95, VY = 1.55, VW = 1.15, VH = 1.15;
  const luzV = mesh(new THREE.PlaneGeometry(VW, VH), new THREE.MeshBasicMaterial({ color: 0xfff6e2 }), VX, VY, GZ + 0.056); luzV.castShadow = false; SET.add(luzV);
  for (const [w, h, x, y] of [[VW + 0.12, 0.07, VX, VY + VH / 2], [VW + 0.12, 0.09, VX, VY - VH / 2], [0.06, VH, VX - VW / 2, VY], [0.06, VH, VX + VW / 2, VY]]) SET.add(caja(w, h, 0.08, M.navy3, x, y, GZ + 0.09, 0.01));
  SET.add(caja(VW + 0.24, 0.04, 0.16, M.cr, VX, VY - VH / 2 - 0.06, GZ + 0.12, 0.01));   // el alféizar
  persiana = new THREE.Group(); SET.add(persiana);
  for (let i = 0; i < 15; i++) { const l = caja(VW - 0.04, 0.05, 0.012, mat(C.cr, 0.6), VX, VY + VH / 2 - 0.06 - i * 0.072, GZ + 0.12, 0.004); l.rotation.x = 0.55; l.castShadow = true; persiana.add(l); }
  SET.add(caja(VW, 0.06, 0.06, M.cr2, VX, VY + VH / 2 - 0.01, GZ + 0.12, 0.01));
  // las franjas de luz de la persiana en el piso (planas, sin degradé)
  for (let i = 0; i < 7; i++) { const f = mesh(new THREE.PlaneGeometry(1.0, 0.07), new THREE.MeshBasicMaterial({ color: 0xf2e7cf, transparent: true, opacity: 0.55, depthWrite: false }), 1.05 - i * 0.05, 0.004, -2.35 + i * 0.16); f.rotation.x = -Math.PI / 2; f.rotation.z = 0.35; f.castShadow = false; f.renderOrder = 1; SET.add(f); }
  // ---- la planta (sansevieria en maceta navy) en el rincón izquierdo del fondo, y el cuadrito de la hoja ----
  const planta = (x, z, k = 1) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(k); SET.add(g);
    g.add(mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.36, 24), M.navy3, 0, 0.18, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 24), mat(0x5a4632, 0.9), 0, 0.35, 0));
    semilla = 3 + Math.round(x * 10);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + az(), h = 0.45 + az() * 0.35;
      const hoja = mesh(new THREE.ConeGeometry(0.035, h, 4), i % 3 ? M.gd : M.g, Math.cos(a) * 0.06, 0.35 + h / 2, Math.sin(a) * 0.06);
      hoja.scale.set(1, 1, 0.35); hoja.rotation.set(Math.sin(a) * 0.18, a, -Math.cos(a) * 0.18); g.add(hoja);
    }
  };
  planta(-1.62, -2.7); planta(1.55, 4.12, 0.8);
  const cuadroT = lienzo(256, 320, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#3fa60a"; x.lineWidth = 10; x.lineCap = "round"; x.beginPath(); x.moveTo(w / 2, h * 0.85); x.quadraticCurveTo(w * 0.15, h * 0.5, w / 2, h * 0.15); x.quadraticCurveTo(w * 0.85, h * 0.5, w / 2, h * 0.85); x.stroke(); x.beginPath(); x.moveTo(w / 2, h * 0.85); x.lineTo(w / 2, h * 0.25); x.stroke(); });
  { const g = new THREE.Group(); g.position.set(-GX + 0.06, 1.55, -1.2); g.rotation.y = Math.PI / 2; SET.add(g); g.add(caja(0.42, 0.52, 0.03, M.navy3, 0, 0, 0, 0.01)); g.add(plano(0.34, 0.44, cuadroT, 0, 0, 0.017)); }
  // ---- la camilla: patas navy, colchoneta crema en tres tramos (respaldo levantado ~30°), sábana blanca y la toalla
  // enrollada en la cabecera ----
  {
    const g = new THREE.Group(); g.position.set(CAMILLA.x, 0, CAMILLA.z); g.rotation.y = CAMILLA.rot; SET.add(g);
    const L = CAMILLA.largo, W = CAMILLA.ancho, H = CAMILLA.alto;
    g.add(caja(W - 0.1, 0.08, L - 0.3, M.navy3, 0, H - 0.2, 0.05, 0.02));            // el bastidor
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { g.add(caja(0.06, H - 0.22, 0.06, M.navy3, sx * (W / 2 - 0.12), (H - 0.22) / 2, sz * (L / 2 - 0.25), 0.01)); g.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 14), M.goma, sx * (W / 2 - 0.12), 0.01, sz * (L / 2 - 0.25))); }
    for (const sz of [-1, 1]) g.add(caja(W - 0.24, 0.04, 0.04, M.navy3, 0, 0.18, sz * (L / 2 - 0.25), 0.01));
    g.add(caja(W - 0.24, 0.025, L - 0.6, M.cr2, 0, 0.19, 0, 0.01));                  // la bandeja de abajo
    for (let i = 0; i < 3; i++) g.add(caja(0.24, 0.05, 0.18, i % 2 ? TOALLA_V : TOALLA, -0.12 + (i % 2) * 0.24, 0.24 + Math.floor(i / 2) * 0.05, 0.3, 0.02));   // toallas dobladas abajo
    // colchoneta: tramo de los pies + tramo del medio (planos) y el respaldo levantado
    const col = M.cr, sab = mat(C.blanco, 0.9);
    const LP = 1.15, LR = 0.62;
    g.add(caja(W, 0.12, LP, col, 0, H - 0.06, L / 2 - LP / 2, 0.05));
    g.add(caja(W + 0.02, 0.02, LP + 0.02, sab, 0, H + 0.01, L / 2 - LP / 2, 0.01));     // la sábana estirada
    g.add(caja(W + 0.03, 0.12, 0.03, sab, 0, H - 0.05, L / 2 + 0.005, 0.01));          // el borde de la sábana que cae a los pies
    const resp = new THREE.Group(); resp.position.set(0, H - 0.02, L / 2 - LP); resp.rotation.x = -0.5; g.add(resp);
    resp.add(caja(W, 0.12, LR, col, 0, -0.04, -LR / 2, 0.05));
    resp.add(caja(W + 0.02, 0.02, LR, sab, 0, 0.03, -LR / 2, 0.01));
    const rollo = crearRollo(0.065, W - 0.08); rollo.position.set(0, 0.1, -LR + 0.12); resp.add(rollo);
    // el borde doblado de la sábana (una franja más gruesa a la mitad)
    g.add(caja(W + 0.04, 0.035, 0.12, sab, 0, H + 0.02, L / 2 - LP + 0.2, 0.015));
  }
  // ---- la lámpara lupa: pie con ruedas, columna, brazo de dos tramos con resorte, aro grande con lente y tubo prendido ----
  {
    const g = new THREE.Group(); g.position.set(-1.38, 0, -2.72); g.rotation.y = 0.35; SET.add(g);
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; const p = caja(0.3, 0.03, 0.05, M.navy3, Math.cos(a) * 0.14, 0.06, Math.sin(a) * 0.14, 0.01); p.rotation.y = -a; g.add(p); g.add(mesh(new THREE.SphereGeometry(0.03, 10, 8), M.goma, Math.cos(a) * 0.27, 0.03, Math.sin(a) * 0.27)); }
    g.add(mesh(new THREE.CylinderGeometry(0.022, 0.026, 1.05, 12), M.navy3, 0, 0.58, 0));
    const pts1 = [V3(0, 1.1, 0), V3(0.18, 1.42, 0.2), V3(0.42, 1.55, 0.42)], pts2 = [V3(0.42, 1.55, 0.42), V3(0.6, 1.48, 0.6), V3(0.7, 1.35, 0.68)];
    for (const pts of [pts1, pts2]) { g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.018, 8), M.navy3)); g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => p.clone().add(V3(0, 0.035, 0)))), 12, 0.006, 6), M.metal)); }
    g.add(mesh(new THREE.SphereGeometry(0.035, 12, 10), M.navy, 0.42, 1.55, 0.42));
    const cab = new THREE.Group(); cab.position.set(0.74, 1.3, 0.72); cab.rotation.set(-1.0, 0.75, 0); g.add(cab);
    cab.add(mesh(new THREE.TorusGeometry(0.16, 0.035, 12, 40), M.cr));
    cab.add(mesh(new THREE.TorusGeometry(0.13, 0.016, 8, 40), new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff6dc, emissiveIntensity: 1.2 })));
    const lente = new THREE.Mesh(new THREE.CircleGeometry(0.12, 32), new THREE.MeshPhysicalMaterial({ color: 0xbfe0f0, roughness: 0.05, transparent: true, opacity: 0.25, depthWrite: false })); lente.position.z = 0.005; cab.add(lente);
    cab.add(caja(0.08, 0.06, 0.05, M.navy3, 0, 0.19, -0.02, 0.01));
  }
  // ---- el carrito auxiliar: tres bandejas navy con ruedas, frascos (crema y verde pálido, tapa navy), pomos, bowl con
  // algodones, pincel y el vaporizador ----
  {
    const g = new THREE.Group(); g.position.set(-1.42, 0, -1.25); g.rotation.y = 0.35; SET.add(g);
    for (const y of [0.25, 0.55, 0.85]) g.add(caja(0.5, 0.025, 0.4, M.navy3, 0, y, 0, 0.01));
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.82, 8), M.metal, sx * 0.23, 0.48, sz * 0.18)); g.add(mesh(new THREE.SphereGeometry(0.03, 10, 8), M.goma, sx * 0.23, 0.04, sz * 0.18)); }
    const frasco = (x, y, z, c, h = 0.11, r = 0.045) => { g.add(mesh(new THREE.CylinderGeometry(r, r, h, 18), mat(c, 0.3), x, y + h / 2, z)); g.add(mesh(new THREE.CylinderGeometry(r * 1.02, r * 1.02, 0.03, 18), M.navy, x, y + h + 0.015, z)); g.add(mesh(new THREE.CylinderGeometry(r * 1.01, r * 1.01, h * 0.4, 18, 1, true), mat(C.cr, 0.8), x, y + h * 0.45, z)); };
    frasco(-0.15, 0.865, -0.08, C.gp); frasco(-0.02, 0.865, -0.1, C.cr, 0.08, 0.05); frasco(0.13, 0.865, -0.06, C.gp, 0.14, 0.035);
    g.add(mesh(new THREE.SphereGeometry(0.08, 16, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M.cr2, 0.1, 0.94, 0.1)); for (let i = 0; i < 4; i++) g.add(mesh(new THREE.SphereGeometry(0.03, 10, 8), M.blanco, 0.07 + (i % 2) * 0.05, 0.9 + 0.02, 0.07 + Math.floor(i / 2) * 0.05));
    for (let i = 0; i < 3; i++) { const p = caja(0.04, 0.03, 0.15, [M.cr, TOALLA_V, M.blanco][i], -0.15 + i * 0.07, 0.58, 0.05, 0.012); g.add(p); }
    const pin = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.18, 8), M.navy, -0.1, 0.88, 0.12); pin.rotation.z = 1.4; g.add(pin);
    // el vaporizador facial (al costado): pie con cuerpo crema y el pico
    const v = new THREE.Group(); v.position.set(0.44, 0, 0.0); g.add(v);
    v.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 10), M.metal, 0, 0.5, 0)); v.add(mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.03, 18), M.navy3, 0, 0.02, 0));
    v.add(mesh(new THREE.SphereGeometry(0.09, 18, 14), M.cr, 0, 1.05, 0)); v.add(mesh(new THREE.CylinderGeometry(0.075, 0.08, 0.1, 18), new THREE.MeshPhysicalMaterial({ color: 0xd8ecf2, roughness: 0.1, transparent: true, opacity: 0.5 }), 0, 0.93, 0));
    const pico = mesh(new THREE.CylinderGeometry(0.02, 0.028, 0.22, 12), M.cr, 0.0, 1.12, 0.12); pico.rotation.x = 1.0; v.add(pico);
  }
  // ---- el banquito de cosmetóloga: asiento redondo navy, columna, aro para los pies, cinco ruedas ----
  {
    const g = new THREE.Group(); g.position.set(VALE0.x, 0, VALE0.z); SET.add(g);
    g.add(mesh(new THREE.CylinderGeometry(0.2, 0.19, 0.07, 24), M.navy3, 0, 0.5, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.42, 10), M.metal, 0, 0.27, 0));
    const aro = mesh(new THREE.TorusGeometry(0.17, 0.012, 8, 30), M.metal, 0, 0.24, 0); aro.rotation.x = Math.PI / 2; g.add(aro);
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; const p = caja(0.22, 0.025, 0.04, M.navy3, Math.cos(a) * 0.1, 0.06, Math.sin(a) * 0.1, 0.01); p.rotation.y = -a; g.add(p); g.add(mesh(new THREE.SphereGeometry(0.025, 10, 8), M.goma, Math.cos(a) * 0.2, 0.025, Math.sin(a) * 0.2)); }
  }
  // ---- el estante de toallas del gabinete (pared derecha): toallas enrolladas blancas y verde pálido en pila ----
  {
    const g = new THREE.Group(); g.position.set(GX - 0.18, 0, -2.25); g.rotation.y = -Math.PI / 2; SET.add(g);
    for (const y of [1.05, 1.45]) g.add(caja(0.9, 0.035, 0.3, M.navy3, 0, y, 0, 0.01));
    for (const sx of [-1, 1]) g.add(caja(0.035, 0.5, 0.3, M.navy3, sx * 0.44, 1.25, 0, 0.01));
    semilla = 41;
    for (let k = 0; k < 2; k++) for (let i = 0; i < 4; i++) for (let j = 0; j < (k ? 1 : 2); j++) {
      const r = crearRollo(0.055, 0.28, (i + j + k) % 2 ? TOALLA_V : TOALLA); r.rotation.y = Math.PI / 2; r.position.set(-0.3 + i * 0.2, (k ? 1.47 : 1.07) + 0.055 + j * 0.1, 0.01); g.add(r);
    }
  }
  // ---- recepción: el mostrador navy con tapa crema; la puerta de vidrio con "Lorena Estética" y la campanita; el sillón
  // de espera con la mesita y revistas; el estante de la pared del fondo; el cartel ----
  {
    const g = new THREE.Group(); g.position.set(MOSTR.x, 0, MOSTR.z); SET.add(g);
    g.add(caja(MOSTR.ancho, MOSTR.alto - 0.04, MOSTR.prof, M.navy3, 0, (MOSTR.alto - 0.04) / 2, 0, 0.03));
    g.add(caja(MOSTR.ancho + 0.08, 0.045, MOSTR.prof + 0.1, M.cr, 0, MOSTR.alto - 0.02, 0.02, 0.02));
    g.add(caja(MOSTR.ancho - 0.1, 0.06, 0.02, M.g, 0, MOSTR.alto - 0.16, -MOSTR.prof / 2 - 0.005, 0.01));   // la franja verde del frente
    const lv = plano(0.9, 0.225, vinT, 0, 0.55, -MOSTR.prof / 2 - 0.012); lv.rotation.y = Math.PI; lv.material.transparent = true; g.add(lv);
    // el frasquito de tarjetas y una planta chica sobre el mostrador
    g.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 16), mat(0xd8ecf2, 0.1, { transparent: true, opacity: 0.6 }), 0.7, MOSTR.alto + 0.05, 0.05));
    for (let i = 0; i < 4; i++) g.add(caja(0.08, 0.05, 0.004, M.cr, 0.7, MOSTR.alto + 0.1 + i * 0.003, 0.05 + i * 0.006, 0.002));
    // la pared del fondo: estante (los cisnes van aparte) y el cartel "Lorena Estética" navy
    const e = new THREE.Group(); e.position.set(0, 0, RZ - MOSTR.z - 0.2); g.add(e);
    e.add(caja(1.5, 0.035, 0.28, M.navy3, 0, 1.42, 0, 0.01));
    for (const sx of [-1, 1]) e.add(caja(0.035, 0.12, 0.25, M.navy3, sx * 0.6, 1.36, 0.0, 0.01));
    for (let i = 0; i < 3; i++) { const r = crearRollo(0.055, 0.26, i % 2 ? TOALLA_V : TOALLA); r.rotation.y = Math.PI / 2; r.position.set(0.48 + (i % 2) * 0.12, 1.49 + Math.floor(i / 2) * 0.1, 0); e.add(r); }
    for (let i = 0; i < 3; i++) e.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.12 + i * 0.02, 14), mat([C.gp, C.cr, C.gp][i], 0.3), 0.1 + i * 0.09, 1.5 + i * 0.01, 0));
    const placa = new THREE.Group(); placa.position.set(0, 2.0, 0.1); placa.rotation.y = Math.PI; e.add(placa);
    placa.add(caja(1.3, 0.36, 0.03, M.navy3, 0, 0, 0, 0.02));
    const pv = plano(1.12, 0.28, vinT, 0, 0, 0.017); pv.material.transparent = true; placa.add(pv);
  }
  // la puerta de calle (pared derecha de la recepción): vidrio con marco navy, vinilo, campanita colgada
  {
    const g = new THREE.Group(); g.position.set(GX - 0.06, 0, 1.55); g.rotation.y = -Math.PI / 2; SET.add(g);
    for (const [w, h, x, y] of [[1.0, 0.07, 0, 2.17], [0.07, 2.2, -0.5, 1.1], [0.07, 2.2, 0.5, 1.1], [1.0, 0.1, 0, 0.05]]) g.add(caja(w, h, 0.08, M.navy3, x, y, 0, 0.01));
    puertaV = new THREE.Mesh(new THREE.PlaneGeometry(0.93, 2.07), new THREE.MeshBasicMaterial({ color: 0xf6f3e6 })); puertaV.position.set(0, 1.12, -0.02); g.add(puertaV);
    g.add(caja(0.035, 0.32, 0.05, M.metal, -0.38, 1.05, 0.05, 0.015));
    const camp = new THREE.Group(); camp.position.set(0.38, 2.38, 0.12); g.add(camp);
    camp.add(mesh(new THREE.ConeGeometry(0.06, 0.09, 16, 1, true), mat(0xd9a441, 0.3, { metalness: 0.6, side: THREE.DoubleSide }), 0, -0.07, 0));
    camp.add(mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.05, 6), M.navy, 0, -0.01, 0));
  }
  {
    const g = new THREE.Group(); g.position.set(-GX + 0.45, 0, 1.6); g.rotation.y = Math.PI / 2; SET.add(g);
    g.add(caja(1.3, 0.38, 0.62, M.cr, 0, 0.33, 0, 0.08)); g.add(caja(1.3, 0.5, 0.18, M.cr, 0, 0.7, -0.24, 0.08));
    for (const sx of [-1, 1]) g.add(caja(0.16, 0.24, 0.62, M.cr, sx * 0.64, 0.6, 0, 0.07));
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(caja(0.05, 0.14, 0.05, M.navy3, sx * 0.58, 0.07, sz * 0.25, 0.01));
    g.add(caja(0.42, 0.42, 0.12, M.g, -0.35, 0.65, -0.12, 0.05));   // almohadón verde
    const m = new THREE.Group(); m.position.set(1.0, 0, 0.2); g.add(m);
    m.add(mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.03, 24), M.navy3, 0, 0.45, 0)); m.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.44, 10), M.navy3, 0, 0.22, 0));
    for (let i = 0; i < 3; i++) { const r = caja(0.2, 0.012, 0.27, [M.g, M.cr2, M.red][i], -0.05 + i * 0.04, 0.475 + i * 0.012, 0.0 + i * 0.02, 0.004); r.rotation.y = 0.3 * i - 0.2; m.add(r); }
  }
}

// ---- el reloj de pared: marco navy, esfera crema, números grandes Lexend 800, agujas navy y segundero verde ----
{
  const R = 0.27;
  relojG = new THREE.Group(); relojG.position.set(-0.42, 2.02, GZ + 0.08); SET.add(relojG);
  relojG.add(mesh(new THREE.CylinderGeometry(R, R, 0.06, 48).rotateX(Math.PI / 2), M.navy3));
  const esf = lienzo(768, 768, (x, w) => {
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(w / 2, w / 2, w / 2, 0, 7); x.fill();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    for (let h = 1; h <= 12; h++) { const a = (h / 12) * Math.PI * 2; x.font = F(800, h % 3 ? 92 : 118); x.fillText(String(h), w / 2 + Math.sin(a) * 288, w / 2 - Math.cos(a) * 288 + 6); }
    for (let m = 0; m < 60; m++) { if (m % 5 === 0) continue; const a = (m / 60) * Math.PI * 2; x.beginPath(); x.arc(w / 2 + Math.sin(a) * 362, w / 2 - Math.cos(a) * 362, 6, 0, 7); x.fill(); }
  });
  const cara = new THREE.Mesh(new THREE.CircleGeometry(R * 0.9, 48), new THREE.MeshStandardMaterial({ map: esf, roughness: 0.5, emissive: 0xffffff, emissiveMap: esf, emissiveIntensity: 0.15 })); cara.position.z = 0.032; relojG.add(cara);
  const aguja = (L, A, color, z) => { const p = new THREE.Group(); const m = new THREE.Mesh(rbox(A, L, 0.01, A / 2 - 0.001, 2), mat(color, 0.4)); m.position.y = L / 2 - A * 1.5; p.add(m); p.position.z = z; relojG.add(p); return p; };
  const hor = aguja(R * 0.52, 0.032, C.navy, 0.04), min = aguja(R * 0.78, 0.022, C.navy, 0.05), seg = aguja(R * 0.82, 0.009, C.g, 0.06);
  relojG.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.04, 16).rotateX(Math.PI / 2), M.navy, 0, 0, 0.06));
  relojG.userData.poner = (hd, sgs) => { const h = Math.floor(hd), m = (hd - h) * 60; hor.rotation.z = -((h % 12) + m / 60) / 12 * Math.PI * 2; min.rotation.z = -m / 60 * Math.PI * 2; seg.rotation.z = -sgs / 60 * Math.PI * 2; };
  sombras(relojG);
}
fusionar(SET, [relojG]);

// ---- los cisnes de la recepción (parte 2): los dos de la parte 1, en corazón, de adorno en el estante ----
const CISNES_REC = new THREE.Group(); CISNES_REC.position.set(-0.42, 1.44, RZ - 0.2); CISNES_REC.rotation.y = Math.PI; scene.add(CISNES_REC);

// =====================================================================================================
// EL LIVING DE GRACIELA (Q3b, set chico en x = 30): pared crema, cortina navy, sillón crema, lámpara de pie
// =====================================================================================================
const LIV = new THREE.Group(); LIV.position.set(30, 0, 0); scene.add(LIV);
{
  const piso = mesh(new THREE.PlaneGeometry(6, 6), mat(0xb89a74, 0.8)); piso.rotation.x = -Math.PI / 2; LIV.add(piso);
  const pared = mesh(new THREE.BoxGeometry(6, 3, 0.1), M.pared, 0, 1.5, -1.2); LIV.add(pared);
  for (let i = 0; i < 6; i++) LIV.add(caja(0.2, 2.5, 0.08, i % 2 ? M.navy3 : M.navy2, 0.75 + i * 0.17, 1.3, -1.1, 0.06));   // la cortina en pliegues
  LIV.add(caja(1.1, 0.04, 0.08, M.navy, 1.18, 2.6, -1.1, 0.01));
  const s = new THREE.Group(); s.position.set(-0.2, 0, -0.65); LIV.add(s);
  s.add(caja(1.7, 0.4, 0.75, M.cr, 0, 0.3, 0, 0.1)); s.add(caja(1.7, 0.55, 0.2, M.cr, 0, 0.72, -0.3, 0.1));
  for (const sx of [-1, 1]) s.add(caja(0.2, 0.3, 0.75, M.cr, sx * 0.85, 0.58, 0, 0.09));
  s.add(caja(0.42, 0.42, 0.12, M.g, -0.55, 0.7, -0.15, 0.05)); s.add(caja(0.38, 0.38, 0.12, M.red, 0.55, 0.68, -0.15, 0.05));
  const l = new THREE.Group(); l.position.set(-1.25, 0, -0.75); LIV.add(l);
  l.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 20), M.navy3, 0, 0.015, 0)); l.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5, 8), M.navy3, 0, 0.77, 0));
  l.add(mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.3, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xf6efd8, emissive: 0xfff2d0, emissiveIntensity: 0.5, side: THREE.DoubleSide }), 0, 1.6, 0));
  const cuadro = new THREE.Group(); cuadro.position.set(-0.2, 1.75, -1.14); LIV.add(cuadro); cuadro.add(caja(0.7, 0.5, 0.03, M.navy3, 0, 0, 0, 0.01)); cuadro.add(caja(0.6, 0.4, 0.02, M.g, 0, 0, 0.012, 0.01));
  sombras(LIV);
}
fusionar(LIV);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const lorena = crearPersonaje({ ...ELENCO.lorena, dedos: true, parpadeoCada: 999, parpadeosExtra: [1.4, 6.3, 9.9, 13.0, 18.8, 24.0, 30.4, 34.3] });
const vale = crearPersonaje({ ...ELENCO.vale, dedos: true, parpadeoCada: 4.3 });
const carolina = crearPersonaje({ ...ELENCO.carolina, dedos: true, parpadeoCada: 999, parpadeosExtra: [31.0, 35.2] });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 999 });
const TODOS = [lorena, vale, carolina, graciela];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// la cartera verde oscuro de Carolina (al hombro izquierdo)
const cartera = new THREE.Group();
{ cartera.add(caja(0.26, 0.2, 0.09, mat(C.gd, 0.55), 0, -0.1, 0, 0.03)); cartera.add(caja(0.27, 0.035, 0.095, M.navy3, 0, -0.03, 0, 0.01)); const correa = mesh(new THREE.TorusGeometry(0.17, 0.008, 6, 24, Math.PI), M.navy3, 0, 0.0, 0); correa.rotation.z = 0; cartera.add(correa); cartera.position.set(0.24, 0.17, 0.0); cartera.rotation.set(0, 0, 0.05); carolina.cuerpo.add(cartera); sombras(cartera); }

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (para las burbujas y los chats) ----
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
    renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
    const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    const id = x.createImageData(256, 256);
    for (let y = 0; y < 256; y++) id.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
    x.putImageData(id, 0, 0);
    if (padre) padre.add(per.raiz); else esc.remove(per.raiz);
    return cv;
  };
  AVATAR.carolina = leer(crearPersonaje({ ...ELENCO.carolina, parpadeoCada: 999 }), 0xcfeebc);
  AVATAR.jimena = leer(crearPersonaje({ ...ELENCO.jimena, parpadeoCada: 999 }), 0xd9d7c9);
  AVATAR.mariana = leer(crearPersonaje({ ...ELENCO.mariana, parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.graciela = leer(crearPersonaje({ ...ELENCO.clienta, lentes: null, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.lorena = leer(crearPersonaje({ ...ELENCO.lorena, parpadeoCada: 999 }), 0x5ce611);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
const dobleTilde = (x, cx, cy, s, color) => { tilde(x, cx - s * 0.3, cy, s, color, s * 0.2); tilde(x, cx + s * 0.15, cy, s, color, s * 0.2); };

// ---- Sofi en videollamada: una escena aparte que se renderiza a una textura cada cuadro (Q5) ----
const sofi = crearPersonaje({ ...ELENCO.sofi, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const SOFI = { esc: new THREE.Scene(), rt: new THREE.WebGLRenderTarget(432, 768), cam: new THREE.PerspectiveCamera(28, 432 / 768, 0.05, 20) };
{
  SOFI.rt.texture.colorSpace = THREE.SRGBColorSpace;
  SOFI.esc.background = new THREE.Color(0x16243d);
  SOFI.esc.add(new THREE.HemisphereLight(0xffffff, 0x6a7080, 2.0)); const dl = new THREE.DirectionalLight(0xfff4e8, 1.7); dl.position.set(1.2, 2.2, 3); SOFI.esc.add(dl);
  SOFI.esc.add(sofi.raiz);
  // la pared de atrás: navy con una franja verde y el logo de Scalerics chico
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ color: 0x1f3254 })); fondo.position.set(0, 1.4, -0.9); SOFI.esc.add(fondo);
  const fr = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.05), new THREE.MeshBasicMaterial({ color: 0x5ce611 })); fr.position.set(0, 1.12, -0.89); SOFI.esc.add(fr);
  const logoT = await new THREE.TextureLoader().loadAsync("assets/logo-blanco.png"); logoT.colorSpace = THREE.SRGBColorSpace;
  const ar = logoT.image.width / logoT.image.height;
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34 / ar), new THREE.MeshBasicMaterial({ map: logoT, transparent: true })); logo.position.set(0.24, 1.86, -0.88); SOFI.esc.add(logo);
}

// =====================================================================================================
// LA AGENDA DE PAPEL, LA LAPICERA, EL CELULAR DE LORENA, LA TABLET, EL CELULAR PARADO DE LA VIDEOLLAMADA
// =====================================================================================================
// la página: "JUEVES 12" con los tres turnos manuscritos; las tachaduras se dibujan (0..1 cada una). La de la semana que
// viene: "JUEVES 19" y "15:00 Carolina" que se escribe (0..1)
const PAG = { W: 640, H: 860 };
const TURNOS = [["15:00", "Carolina", "limpieza facial"], ["16:00", "Mariana", "peeling"], ["17:00", "Jimena", "depilación"]];
function dibujarHoja(x, { semana = 0, tachas = [0, 0, 0], escrito = 0 }) {
  const { W, H } = PAG;
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H);
  x.strokeStyle = "#cfd8e3"; x.lineWidth = 3; for (let y = 230; y < H; y += 92) { x.beginPath(); x.moveTo(30, y); x.lineTo(W - 20, y); x.stroke(); }
  x.strokeStyle = "#e3a9a1"; x.beginPath(); x.moveTo(150, 170); x.lineTo(150, H); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "alphabetic"; x.font = F(800, 96); x.fillText(semana ? "JUEVES 19" : "JUEVES 12", 34, 120);
  x.fillStyle = "#5ce611"; x.fillRect(34, 140, 200, 14);
  const fila = (i, hora, nom, serv, k = 1) => {
    const y = 300 + i * 184;
    x.save(); x.beginPath(); x.rect(0, y - 80, 30 + (W - 30) * k, 180); x.clip();
    x.fillStyle = "#16243d"; x.font = CAV(78); x.fillText(hora, 26, y); x.fillText(nom, 200, y);
    x.font = CAV(60); x.fillText(serv, 200, y + 66);
    x.restore();
  };
  if (!semana) {
    TURNOS.forEach(([h, n, s], i) => fila(i, h, n, s));
    tachas.forEach((k, i) => {
      if (k <= 0) return;
      const y = 300 + i * 184 + 8;
      x.strokeStyle = "#c7655b"; x.lineWidth = 16; x.lineCap = "round";
      x.beginPath(); x.moveTo(20, y - 18); x.lineTo(20 + (W - 60) * Math.min(1, k * 1.6), y - 26 + 6 * k); x.stroke();
      if (k > 0.6) { const k2 = (k - 0.6) / 0.4; x.beginPath(); x.moveTo(40, y + 40); x.lineTo(40 + (W - 90) * k2, y + 32); x.stroke(); }
    });
  } else if (escrito > 0) fila(0, "15:00", "Carolina", "limpieza facial", escrito);
}
const hojaA = lienzo(PAG.W, PAG.H, (x) => dibujarHoja(x, {}));
const hojaB = lienzo(PAG.W, PAG.H, (x) => dibujarHoja(x, { semana: 1 }));
const hojaIzq = lienzo(PAG.W, PAG.H, (x, W, H) => { x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H); x.strokeStyle = "#cfd8e3"; x.lineWidth = 3; for (let y = 230; y < H; y += 92) { x.beginPath(); x.moveTo(20, y); x.lineTo(W - 30, y); x.stroke(); } x.fillStyle = "#0b1220"; x.font = F(800, 96); x.fillText("MIÉRCOLES", 34, 120); x.fillStyle = "#16243d"; x.font = CAV(72); x.fillText("10:00 Rosa ✓", 40, 300); x.fillText("11:30 Inés ✓", 40, 484); });
const AG = { w: 0.2, h: 0.27 };
const agenda = new THREE.Group();
const hojaVuelta = new THREE.Group();   // la hoja que se da vuelta (pivote en el lomo)
let hojaMalla, hojaVueltaFrente, hojaVueltaDorso;
{
  agenda.add(caja(2 * AG.w + 0.03, AG.h + 0.025, 0.014, M.navy3, 0, 0, -0.008, 0.008));            // la tapa
  agenda.add(plano(AG.w, AG.h, hojaIzq, -AG.w / 2 - 0.004, 0, 0.001));
  hojaMalla = plano(AG.w, AG.h, hojaA, AG.w / 2 + 0.004, 0, 0.001); agenda.add(hojaMalla);
  for (let i = 0; i < 11; i++) { const r = mesh(new THREE.TorusGeometry(0.011, 0.0025, 6, 14), M.metal, 0, AG.h / 2 - 0.02 - i * 0.023, 0.004); r.rotation.y = Math.PI / 2; agenda.add(r); }
  hojaVuelta.position.set(0.004, 0, 0.003); agenda.add(hojaVuelta);
  hojaVueltaFrente = plano(AG.w, AG.h, hojaA, AG.w / 2, 0, 0.0005); hojaVuelta.add(hojaVueltaFrente);
  hojaVueltaDorso = plano(AG.w, AG.h, hojaIzq, AG.w / 2, 0, -0.0005); hojaVueltaDorso.rotation.y = Math.PI; hojaVuelta.add(hojaVueltaDorso);
  for (const m of [hojaMalla, hojaVueltaFrente, hojaVueltaDorso]) { m.material.emissive = new THREE.Color(0xffffff); m.material.emissiveMap = m.material.map; m.material.emissiveIntensity = 0.22; }
  sombras(agenda);
}
let claveHoja = "";
function dibujarAgenda(t) {
  const k = (a) => Math.round(sg(t, a, a + 0.32) * 12) / 12;
  const tachas = [k(T.tacha1), k(T.tacha2), k(T.tacha3)], esc = Math.round(sg(t, T.anota[0], T.anota[1]) * 12) / 12;
  const clave = tachas.join(",") + "|" + esc;
  if (clave !== claveHoja) {
    claveHoja = clave;
    dibujarHoja(hojaA.userData.x, { tachas }); hojaA.needsUpdate = true;
    dibujarHoja(hojaB.userData.x, { semana: 1, escrito: esc }); hojaB.needsUpdate = true;
  }
  // la hoja se da vuelta en T.hoja: la de arriba (JUEVES 12 tachado) pasa a la izquierda; debajo queda JUEVES 19
  const u = eio(sg(t, T.hoja[0], T.hoja[1]));
  const vuelta = t >= T.hoja[0] && t < P2;
  hojaVuelta.visible = vuelta && u < 1;
  hojaVuelta.rotation.y = -Math.PI * u;
  hojaMalla.material.map = hojaMalla.material.emissiveMap = vuelta ? hojaB : hojaA;
  hojaVueltaFrente.material.map = hojaVueltaFrente.material.emissiveMap = hojaA;
}
const lapicera = crearLapicera(); lapicera.scale.setScalar(1.3); scene.add(lapicera);
// el celular de Lorena (pantalla canvas): el chat del momento
const pantL = lienzo(600, 975, () => {});
const celuL = crearCelular(pantL, C.navy3, 0.08, 0.162); scene.add(celuL);
// la tablet de la recepción (vertical, en atril) y su pantalla: la agenda del jueves
const pantT = lienzo(720, 1000, () => {});
const tablet = crearTablet(pantT, 0.3, 0.42, 0.25); tablet.position.set(0.3, MOSTR.alto, MOSTR.z + 0.02); tablet.rotation.y = Math.PI; scene.add(tablet);
// el celular parado con la videollamada de Sofi (en su soporte, al lado de la tablet)
const celuS = new THREE.Group(); celuS.position.set(0.6, MOSTR.alto, MOSTR.z - 0.06); celuS.rotation.y = Math.PI + 0.2; scene.add(celuS);
{
  const S = 1.35, W = 0.08 * S, H = 0.165 * S;
  const piv = new THREE.Group(); piv.position.y = 0.035; piv.rotation.x = -0.18; celuS.add(piv);
  piv.add(mesh(rbox(W + 0.008, H + 0.008, 0.014, 0.014), mat(C.navy, 0.4), 0, H / 2, 0));
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: SOFI.rt.texture, toneMapped: false })); pan.position.set(0, H / 2, 0.0076); piv.add(pan);
  celuS.add(caja(0.12, 0.02, 0.1, M.g, 0, 0.01, 0.0, 0.008)); celuS.add(caja(0.1, 0.06, 0.015, M.g, 0, 0.04, -0.045, 0.006));
  sombras(celuS);
}
// la tablet de la recepción, dibujada por estado: e = { libre, avisando, graciela, cubierto, filas (verdes), cero }
function dibujarTablaJueves(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 150); x.fillStyle = "#5ce611"; x.fillRect(0, 150, W, 12);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 46); x.fillText("Lorena Estética", 40, 52); x.font = F(900, 74); x.fillText("JUEVES", 40, 112);
  const filas = [
    { h: "15:00", n: "Carolina", s: "limpieza facial", tag: "seña ✓", ok: true },
    e.graciela ? { h: "16:00", n: "Graciela", s: "peeling", tag: "lista de espera", ok: true } : e.libre ? { h: "16:00", n: "Libre", s: e.avisando ? "avisando a la lista…" : "Mariana reprogramó", libre: true } : { h: "16:00", n: "Mariana", s: "peeling", tag: "", ok: false },
    { h: "17:00", n: "Jimena", s: "depilación", tag: "confirmó ✓", ok: true },
  ];
  filas.forEach((f, i) => {
    const y = 200 + i * 210, verde = f.ok && (e.filas == null || e.filas > i);
    x.fillStyle = f.libre ? "#efeee5" : verde ? "#5ce611" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 7;
    if (f.libre) x.setLineDash([22, 16]); x.beginPath(); x.roundRect(28, y, W - 56, 186, 30); x.fill(); x.stroke(); x.setLineDash([]);
    x.fillStyle = "#0b1220"; x.font = F(900, 52); x.fillText(f.h, 46, y + 62);
    x.font = F(800, 56); x.fillText(f.n, 236, y + 62);
    x.font = F(700, 38); x.fillStyle = f.libre ? "#c7655b" : "#16243d"; x.fillText(f.s, 236, y + 134);
    if (f.tag && verde) { x.fillStyle = "#0b1220"; x.font = F(800, 36); x.textAlign = "right"; x.fillText(f.tag, W - 50, y + 134); x.textAlign = "left"; }
  });
  if (e.cubierto) {
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(28, 850, W - 56, 120, 60); x.fill();
    x.fillStyle = "#5ce611"; x.font = F(800, 46); x.textAlign = "center"; x.fillText(e.cero ? "Camilla vacía: 0 h" : "Hueco cubierto en 2 minutos", W / 2, 912); x.textAlign = "left";
  }
}
let claveT = "";
function dibujarTablet(t) {
  const p2 = t >= P2;
  const e = { libre: t >= T.libre, avisando: t >= T.avisa, graciela: t >= T.cubierto, cubierto: t >= T.chip, filas: t >= T.q5 ? T.filas.filter((f) => t >= f).length : null, cero: t >= T.cero };
  if (t < T.reservado) Object.assign(e, { libre: false, graciela: false, cubierto: false });
  const clave = JSON.stringify(e) + p2;
  if (clave === claveT) return; claveT = clave;
  dibujarTablaJueves(pantT.userData.x, 720, 1000, e); pantT.needsUpdate = true;
}

// el chat del celular de Lorena (se ve chico; lo que se lee va en las tarjetas)
let claveL = "";
function dibujarCeluL(t) {
  const n = t >= T.carolina2 ? 4 : t >= T.jimena ? 3 : t >= T.msj ? 2 : 1, p2 = t >= P2;
  const clave = `${n}|${p2}`; if (clave === claveL) return; claveL = clave;
  const { x } = pantL.userData, w = 600, h = 975;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 60); x.fillText("Chats", 40, 80);
  const items = p2 ? [[AVATAR.carolina, "Carolina", "¿me guardás el jueves…?"]] : [[AVATAR.carolina, "Carolina", n >= 4 ? "Audio 0:03" : "Audio 0:02"], [AVATAR.mariana, "Mariana", "escribiendo…"], [AVATAR.jimena, "Jimena", "Audio 0:03"]].slice(0, Math.min(3, n));
  items.forEach(([cv, nom, sub], i) => { const y = 180 + i * 230; x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(20, y, w - 40, 210, 30); x.fill(); avatar(x, cv, 100, y + 105, 64); x.fillStyle = "#0b1220"; x.font = F(800, 56); x.fillText(nom, 190, y + 75); x.font = F(700, 44); x.fillStyle = "#16243d"; x.fillText(sub, 190, y + 145); });
  pantL.needsUpdate = true;
}

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
// globo de diálogo (texto grande), con cabecera opcional (avatar + nombre)
function crearGlobo(lineas, px = 80, { cab = null } = {}) {
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
// el audio de WhatsApp genérico: avatar, nombre, la HORA bien grande (el chiste de "puntual"), play + onda + duración,
// y debajo el texto de lo que dice (se entiende sin sonido)
const ONDA = Array.from({ length: 40 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * 0.6 + Math.sin(i * 0.53 + 1) * 0.4));
function dibujarAudio(x, W, H, { cv, nombre, hora, dur, lineas, prog = 0, horaRoja = true }) {
  avatar(x, cv, 74, 74, 54);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 54); x.fillText(nombre, 148, 58);
  x.fillStyle = "#16243d"; x.font = F(700, 38); x.fillText("audio de WhatsApp", 150, 108);
  x.textAlign = "right"; x.fillStyle = horaRoja ? "#c7655b" : "#0b1220"; x.font = F(900, 96); x.fillText(hora, W - 30, 80);
  // la barra del audio
  const y0 = 150; x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(24, y0, W - 48, 104, 52); x.fill(); x.stroke();
  const cx = 78, cy = y0 + 52; x.fillStyle = "#16243d"; x.beginPath(); x.arc(cx, cy, 36, 0, 7); x.fill();
  x.fillStyle = "#efeee5"; if (prog > 0 && prog < 1) { x.fillRect(cx - 13, cy - 16, 10, 32); x.fillRect(cx + 4, cy - 16, 10, 32); } else { x.beginPath(); x.moveTo(cx - 10, cy - 19); x.lineTo(cx + 19, cy); x.lineTo(cx - 10, cy + 19); x.closePath(); x.fill(); }
  const nb = 26, x0 = 134, paso = Math.min(16, (W - 300) / nb);
  for (let i = 0; i < nb; i++) { const h = ONDA[i] * 60 + 8; x.fillStyle = i / nb < prog ? "#16243d" : "#a9b0bf"; rr(x, x0 + i * paso, cy - h / 2, 9, h, 4); }
  x.fillStyle = "#16243d"; x.textAlign = "right"; x.font = F(800, 44); x.fillText(dur, W - 50, cy + 2);
  // lo que dice
  x.textAlign = "left"; x.fillStyle = "#0b1220";
  lineas.forEach((l, i) => textoSel(x, l, W / 2, 316 + i * 70, 56));
}
function crearAudio(o) { const H = 286 + o.lineas.length * 70; const g = crearTarjeta(860, H, (x, W, Hh) => dibujarAudio(x, W, Hh, o), { fondo: "#efeee5" }); g.userData.o = o; g.userData.prog = -1; return g; }
function progAudio(g, p) { const k = Math.round(cl(p) * 20) / 20; if (k === g.userData.prog) return; g.userData.prog = k; redibujar(g, (x, W, H) => dibujarAudio(x, W, H, { ...g.userData.o, prog: k })); }
// el chat con Mariana: el mensaje de Lorena (verde pálido, a la derecha) con ✓✓ 16:05; "escribiendo…" que aparece y se va
function dibujarMariana(x, W, H, e) {
  avatar(x, AVATAR.mariana, 74, 70, 50);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 54); x.fillText("Mariana", 146, 56);
  x.font = F(700, 40); x.fillStyle = e === 1 ? "#3fa60a" : "#16243d"; x.fillText(e === 1 ? "escribiendo…" : e === 2 ? "últ. vez 16:06" : "en línea", 148, 104);
  x.fillStyle = "#cfeebc"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(110, 150, W - 134, 214, [34, 34, 8, 34]); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, 52); x.fillText("Mariana, ¿venís?", 140, 206); x.fillText("Te esperamos a las 16.", 140, 270);
  x.textAlign = "right"; x.font = F(800, 40); x.fillStyle = "#16243d"; x.fillText("16:05", W - 120, 330); dobleTilde(x, W - 70, 326, 30, "#3f8fd0");
  if (e === 1) { x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(24, 390, 210, 84, [34, 34, 34, 8]); x.fill(); x.stroke(); x.fillStyle = "#a9b0bf"; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(80 + i * 48, 432, 13, 0, 7); x.fill(); } }
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

const GL = {
  c1: crearAudio({ cv: AVATAR.carolina, nombre: "Carolina", hora: "15:00", dur: "0:02", lineas: ["Ay, Lore, justo me", "surgió [algo.]"] }),
  l1: crearGlobo(["Tranqui."], 88),
  mar: crearTarjeta(900, 400, (x, W, H) => dibujarMariana(x, W, H, 0), { fondo: "#efeee5" }),
  j1: crearAudio({ cv: AVATAR.jimena, nombre: "Jimena", hora: "17:00", dur: "0:03", lineas: ["¿Era [hoy?] Lo tenía para", "el jueves que viene."] }),
  l2: crearGlobo(["Lo único puntual hoy", "fueron las [excusas.]"], 78),
  c2: crearAudio({ cv: AVATAR.carolina, nombre: "Carolina", hora: "17:52", dur: "0:03", horaRoja: false, lineas: ["Lore, ¿me guardás el", "jueves que viene? Esta vez [voy.]"] }),
  l3: crearGlobo(["Te lo [guardo.]"], 88),
  q1c: crearGlobo(["Lore, ¿me guardás el", "jueves que viene?"], 62, { cab: { cv: AVATAR.carolina, nombre: "Carolina" } }),
  l4: crearGlobo(["Te mando el [link.]"], 84),
  link: crearTarjeta(860, 250, (x, W, H) => {
    x.fillStyle = "#16243d"; rr(x, 22, 22, 206, 206, 30);
    x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.lineCap = "round"; x.beginPath(); x.moveTo(125, 190); x.quadraticCurveTo(55, 125, 125, 55); x.quadraticCurveTo(195, 125, 125, 190); x.stroke(); x.beginPath(); x.moveTo(125, 190); x.lineTo(125, 80); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 56); x.fillText("Lorena Estética", 262, 82);
    x.fillStyle = "#16243d"; x.font = F(700, 46); x.fillText("Reservá tu turno", 264, 150);
    x.fillStyle = "#3fa60a"; x.font = F(700, 38); x.fillText("lorenaestetica.uy/turnos", 264, 206);
  }, { fondo: "#ffffff" }),
  g1: crearGlobo(["¡Me lo [quedo!]"], 92),
  c3: crearGlobo(["¡Llegué! Pagué la [seña,]", "¿cómo no voy a venir?"], 70),
  l5: crearGlobo(["Mirá vos.", "Hoy le surgió [venir.]"], 80),
  r1: crearRotulo([["3 turnos · 3 horas"], ["de camilla vacía"]], 52),
  r2: crearRotulo([["$ 5.400 que", "#ff9d92"], ["no entraron", "#ff9d92"]], 56),
  r3: crearRotulo([["A Vale se le"], ["paga igual"]], 52),
  rReserva: crearRotulo([["Reserva online con seña"]], 50),
  rRecord: crearRotulo([["Recordatorio automático"], ["el día antes", "#5ce611"]], 50),
  rEspera: crearRotulo([["Lista de espera"]], 52),
  chipMie: crearTarjeta(560, 104, (x, W, H) => { x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 60); x.fillText("Miércoles · 15:00", W / 2, H / 2 + 3); }, { fondo: "#5ce611" }),
};
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// =====================================================================================================
// INSERTOS A PANTALLA COMPLETA (pegados a la cámara): el celular de Carolina (Q1b), los tres celulares (Q2), la tablet
// (Q3a / Q3c), el celular de Graciela (Q3b va en 3D: su living)
// =====================================================================================================
function crearFondoInserto(g) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: 0x1f3254 })); bg.position.z = -0.06; g.add(bg);
  // la recepción desenfocada: la pared crema arriba, el mostrador navy abajo con la tapa crema, una planta verde
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1300 / PXK), new THREE.MeshBasicMaterial({ color: 0xd8d5c6 })); pc.position.set(0, 600 / PXK, -0.058); g.add(pc);
  const tapa = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 60 / PXK), new THREE.MeshBasicMaterial({ color: 0xefeee5 })); tapa.position.set(0, -50 / PXK, -0.057); g.add(tapa);
  const fr = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 26 / PXK), new THREE.MeshBasicMaterial({ color: 0x5ce611 })); fr.position.set(0, -140 / PXK, -0.057); g.add(fr);
  for (const [x, y, r, c] of [[-470, 520, 120, 0x3fa60a], [-560, 380, 90, 0x5ce611], [480, 700, 70, 0xefeee5]]) { const m = new THREE.Mesh(new THREE.CircleGeometry(r / PXK, 32), new THREE.MeshBasicMaterial({ color: c })); m.position.set(x / PXK, y / PXK, -0.056); g.add(m); }
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  return { g, tex, IW, IH };
}
// Q1b: el celular de Carolina, 74 % del ancho
const INS1 = { g: new THREE.Group() }; crearFondoInserto(INS1.g);
const CEL1 = crearCelInserto(780, 1400, 540, 1010, 34); INS1.g.add(CEL1.g);
// Q2: tres celulares en tríptico
const INS2 = { g: new THREE.Group() }; crearFondoInserto(INS2.g);
const CEL3 = [0, 1, 2].map((i) => { const c = crearCelInserto(318, 760, 185 + i * 355, 1010, 16); INS2.g.add(c.g); return c; });
// Q3a / Q3c: la tablet a pantalla
const INS3 = { g: new THREE.Group() }; crearFondoInserto(INS3.g);
const TAB = crearCelInserto(720, 1000, 540, 1050, 40); INS3.g.add(TAB.g);
for (const I of [INS1, INS2, INS3]) { pegarACamara(I.g, camera, 10); I.g.visible = false; }

let clave1 = "";
function dibujarReserva(t) {
  const e = t >= T.reservado ? 4 : t >= T.paga ? 3 : t >= T.hora ? 2 : t >= T.jue ? 1 : 0;
  if (`${e}` === clave1) return; clave1 = `${e}`;
  const { x } = CEL1.tex.userData, W = CEL1.IW, H = CEL1.IH;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 190); x.fillStyle = "#5ce611"; x.fillRect(0, 190, W, 12);
  x.fillStyle = "#efeee5"; x.font = F(800, 58); x.fillText("Lorena Estética", 44, 72); x.font = F(700, 46); x.fillText("Reservá tu turno", 44, 140);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(34, 240, W - 68, 160, 30); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, 56); x.fillText("Limpieza facial", 64, 296); x.font = F(700, 44); x.fillStyle = "#16243d"; x.fillText("60 min · $ 1.800", 64, 360);
  // días
  ["Mar", "Mié", "Jue", "Vie"].forEach((d, i) => { const xx = 34 + i * 180, sel = d === "Jue" && e >= 1; x.fillStyle = sel ? "#5ce611" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(xx, 440, 160, 140, 28); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(800, 48); x.fillText(d, xx + 80, 490); x.font = F(700, 40); x.fillText(String(17 + i), xx + 80, 545); });
  // horas
  ["14:00", "15:00", "16:00"].forEach((h, i) => { const xx = 34 + i * 240, sel = h === "15:00" && e >= 2; x.fillStyle = sel ? "#5ce611" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(xx, 620, 222, 120, 60); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(800, 52); x.fillText(h, xx + 111, 682); });
  x.textAlign = "left"; x.fillStyle = "#0b1220"; x.font = F(800, 52); x.fillText("Seña para reservar:", 44, 810); x.font = F(900, 64); x.fillText("$ 500", 44, 885);
  if (e < 4) {
    x.fillStyle = e >= 3 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(34, 960, W - 68, 160, 80); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 72); x.fillText("Pagar seña", W / 2, 1043);
    if (e === 3) { x.strokeStyle = "rgba(11,18,32,0.5)"; x.lineWidth = 12; x.beginPath(); x.arc(W / 2 + 200, 1040, 70, 0, 7); x.stroke(); }
  } else {
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(34, 950, W - 68, 360, 44); x.fill();
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(130, 1060, 62, 0, 7); x.fill(); tilde(x, 132, 1062, 66, "#0b1220");
    x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(900, 66); x.fillText("Turno", 220, 1030); x.fillText("reservado", 220, 1102);
    x.font = F(700, 50); x.fillText("Jueves 15:00 · con Vale", 70, 1200); x.fillStyle = "#5ce611"; x.font = F(800, 44); x.fillText("Seña paga · $ 500", 70, 1262);
  }
  CEL1.tex.needsUpdate = true;
}
// el recordatorio en los tres celulares: [avatar, nombre, hora, servicio, respuesta]
const RECS = [[AVATAR.carolina, "Carolina", "15:00", "limpieza facial", "ok"], [AVATAR.mariana, "Mariana", "16:00", "peeling", "repro"], [AVATAR.jimena, "Jimena", "17:00", "depilación", "ok"]];
const claves3 = ["", "", ""];
function dibujarRecordatorios(t) {
  RECS.forEach(([cv, nom, hora, serv, resp], i) => {
    const tc = T.conf[[0, 2, 1][i]];   // Carolina, Jimena (segunda), Mariana (tercera)
    const llego = t >= T.llega + i * 0.08, toca = t >= tc, fin = resp === "repro" ? t >= T.martes : t >= tc + 0.1;
    const e = `${llego}|${toca}|${fin}`; if (claves3[i] === e) return; claves3[i] = e;
    const { x } = CEL3[i].tex.userData, W = CEL3[i].IW, H = CEL3[i].IH;
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "center";
    x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 210); avatar(x, cv, W / 2, 86, 62);
    x.fillStyle = "#efeee5"; x.font = F(800, 42); x.fillText(nom, W / 2, 180);
    if (!llego) { CEL3[i].tex.needsUpdate = true; return; }
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(14, 236, W - 28, 300, [26, 26, 26, 6]); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 38); x.fillText(`Hola, ${nom}.`, 32, 282);
    x.font = F(700, 36); x.fillText("Te esperamos", 32, 336); x.fillText("mañana jueves", 32, 380);
    x.font = F(900, 58); x.fillText(hora, 32, 442); x.font = F(700, 36); x.fillStyle = "#16243d"; x.fillText(serv, 32, 500);
    x.textAlign = "center";
    if (!fin) {
      const repro = resp === "repro";
      x.fillStyle = toca && !repro ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.roundRect(14, 562, W - 28, 84, 42); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.font = F(800, 40); x.fillText("Confirmar", W / 2, 606);
      x.fillStyle = toca && repro ? "#d9d7c9" : "#ffffff"; x.beginPath(); x.roundRect(14, 660, W - 28, 84, 42); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.font = F(800, 38); x.fillText("Reprogramar", W / 2, 704);
    } else if (resp === "ok") {
      x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.roundRect(14, 562, W - 28, 180, 34); x.fill(); x.stroke();
      tilde(x, W / 2, 610, 54); x.fillStyle = "#0b1220"; x.font = F(900, 46); x.fillText("Confirmado", W / 2, 694);
    } else {
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(14, 562, W - 28, 180, 34); x.fill();
      x.fillStyle = "#efeee5"; x.font = F(800, 38); x.fillText("Reprogramado", W / 2, 604); x.fillStyle = "#5ce611"; x.font = F(900, 44); x.fillText("Martes 10:00 ✓", W / 2, 676);
    }
    CEL3[i].tex.needsUpdate = true;
  });
}
let claveTab = "";
function dibujarTabInserto(t) {
  const e = { libre: true, avisando: t >= T.avisa, graciela: t >= T.cubierto, cubierto: t >= T.chip, filas: null, cero: false };
  const k = JSON.stringify(e); if (k === claveTab) return; claveTab = k;
  dibujarTablaJueves(TAB.tex.userData.x, 720, 1000, e); TAB.tex.needsUpdate = true;
}
// el celular de Graciela (3D, en su mano): el aviso de la lista de espera
const pantG = lienzo(600, 975, () => {});
const celuG = crearCelular(pantG, C.g, 0.08, 0.162); celuG.scale.setScalar(1.25); scene.add(celuG);
let claveG = "";
function dibujarCeluG(t) {
  const e = t >= T.quiero + 0.1 ? 2 : t >= T.quiero ? 1 : 0;
  if (`${e}` === claveG) return; claveG = `${e}`;
  const { x } = pantG.userData, w = 600, h = 975;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.font = F(800, 52); x.fillText("Lorena Estética", 36, 78);
  x.fillStyle = "#0b1220"; x.font = F(800, 58); x.fillText("Se liberó", 40, 240); x.fillText("un turno", 40, 310);
  x.font = F(900, 64); x.fillText("Jueves 16:00", 40, 410); x.font = F(700, 50); x.fillStyle = "#16243d"; x.fillText("Peeling", 40, 480);
  if (e < 2) { x.fillStyle = e ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(34, 580, w - 68, 150, 75); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 70); x.fillText("Lo quiero", w / 2, 658); }
  else { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(34, 560, w - 68, 230, 40); x.fill(); x.fillStyle = "#5ce611"; x.textAlign = "center"; x.font = F(900, 70); x.fillText("Reservado ✓", w / 2, 640); x.fillStyle = "#efeee5"; x.font = F(700, 46); x.fillText("seña paga", w / 2, 720); }
  pantG.needsUpdate = true;
}
const GL_G = crearTarjeta(900, 330, (x, W) => {
  x.fillStyle = "#16243d"; rr(x, 24, 24, 120, 120, 26); x.strokeStyle = "#5ce611"; x.lineWidth = 9; x.lineCap = "round"; x.beginPath(); x.moveTo(84, 128); x.quadraticCurveTo(40, 84, 84, 40); x.quadraticCurveTo(128, 84, 84, 128); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 52); x.fillText("Se liberó un turno", 170, 66); x.fillStyle = "#16243d"; x.font = F(700, 42); x.fillText("Lorena Estética · lista de espera", 172, 122);
  x.fillStyle = "#0b1220"; x.font = F(900, 66); x.fillText("Jueves 16:00", 34, 216); x.font = F(800, 52); x.fillText("Peeling · ¿Lo querés?", 34, 286);
}, { fondo: "#ffffff" });

// =====================================================================================================
// LAS TOALLAS DE VALE: la doblada en las rodillas → rollo → cisne → dos cisnes en corazón; la nueva del final
// =====================================================================================================
const T_DOBLADA = crearDoblada(); const T_ROLLO = crearRollo(0.055, 0.3); const CIS1 = crearCisne(); const CIS2 = crearCisne();
const T_NUEVA = crearDoblada(); const T_NUEVA_R = crearRollo(0.055, 0.3);
for (const o of [T_DOBLADA, T_ROLLO, CIS1, CIS2, T_NUEVA, T_NUEVA_R]) { scene.add(o); sombras(o); }
const CIS_R = [crearCisne(), crearCisne()]; CIS_R[0].position.set(-0.16, 0, 0); CIS_R[1].position.set(0.16, 0, 0); CIS_R[1].rotation.y = Math.PI; CISNES_REC.add(...CIS_R); sombras(CISNES_REC);
CISNES_REC.scale.setScalar(1.15);

// =====================================================================================================
// CÁMARA
// =====================================================================================================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un
// plano, Catmull-Rom continua. Q4 repite el encuadre de P1 (callback).
const P1C = (k) => [lerp(0.25, 0.2, k), lerp(2.0, 1.98, k), lerp(2.9, 2.6, k), -0.1, 1.08, -1.6, 50];
const PLANOS = [
  ["P1", 0, [[0, ...P1C(0)], [T.p2, ...P1C(1)]]],
  ["P2", T.p2, [[T.p2, 0.0, 1.45, 1.4, 0.2, 1.45, -2.4, 46], [T.p3, 0.0, 1.45, 1.25, 0.2, 1.45, -2.4, 45]]],
  // 17:00 en punto: apretado al reloj y baja a Vale con el segundo cisne
  ["P3", T.p3, [[T.p3, 0.0, 1.95, 0.4, -0.42, 2.0, -3.0, 26], [T.p3 + 0.45, 0.0, 1.95, 0.4, -0.42, 2.0, -3.0, 26], [T.p3 + 1.2, -0.35, 1.4, 1.0, 0.55, 1.0, -1.85, 42], [T.p4, -0.35, 1.4, 0.9, 0.55, 1.0, -1.85, 41]]],
  ["P4", T.p4, [[T.p4, 0.15, 2.2, 3.4, -0.1, 1.0, -1.6, 50], [T.p5, 0.15, 2.2, 3.35, -0.1, 1.0, -1.6, 50]]],
  ["P5", T.p5, [[T.p5, -0.35, 1.6, -2.2, -0.5, 1.45, 0.3, 40], [T.l2 + 0.6, -0.35, 1.6, -2.0, -0.5, 1.47, 0.3, 34], [T.p6, -0.35, 1.6, -1.9, -0.5, 1.48, 0.3, 32]]],
  ["P6", T.p6, [[T.p6, 0.1, 1.65, -2.2, -0.45, 1.3, 0.3, 44], [T.l3, 0.1, 1.65, -2.1, -0.45, 1.3, 0.3, 42]]],
  ["P6b", T.l3, [[T.l3, 0.15, 2.2, 3.4, -0.1, 1.0, -1.6, 50], [P1, 0.15, 2.2, 3.3, -0.1, 1.0, -1.6, 50]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, 0.0, 1.45, 1.6, -0.15, 1.35, 3.7, 46], [T.q1b, 0.0, 1.45, 1.8, -0.15, 1.35, 3.7, 44]]],
  ["Q1b", T.q1b, null],
  ["Q2", T.q2, null],
  ["Q3", T.q3, null],
  ["Q3b", T.q3b, [[T.q3b, 30.0, 1.2, 2.5, 29.8, 0.95, -0.55, 40], [T.q3c, 29.98, 1.18, 2.3, 29.8, 0.95, -0.55, 38]]],
  ["Q3c", T.q3c, null],
  ["Q4", T.q4, [[T.q4, ...P1C(0)], [T.q4b, ...P1C(0.7)]]],
  ["Q4b", T.q4b, [[T.q4b, -0.95, 1.6, -2.1, -0.5, 1.4, 0.3, 42], [T.q5, -0.92, 1.6, -1.9, -0.5, 1.42, 0.3, 38]]],
  ["Q5", T.q5, [[T.q5, 0.3, 1.5, 1.3, 0.42, 1.25, 3.2, 50], [T.q5 + 1.2, 0.4, 1.42, 2.0, 0.42, 1.24, 3.2, 44], [DUR, 0.41, 1.4, 2.08, 0.46, 1.24, 3.2, 45]]],
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

// =====================================================================================================
// POSES
// =====================================================================================================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.8, tension: 0.25, feliz: 0 }, cejas: { alto: -0.1, ang: -0.2 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.15, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.95 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.9, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.8);   // hablando, nunca con los ojos cerrados
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
// Lorena con la agenda (mano izquierda la sostiene; la derecha con la lapicera)
const AGENDA_POSE = { manoI: [0.2, 0.3, 0.3], codoI: [0.9, -0.6, -0.2], manoD: [-0.06, 0.36, 0.34], codoD: [-0.9, -0.6, -0.2] };
const ESCRIBE = (k) => ({ manoD: [lerp(-0.02, 0.1, k), 0.35, 0.33] });
function poseLorena(t) {
  const p2 = t >= P2;
  if (!p2) {
    const mira = (a, g = 0) => ({ cabeza: { giro: g, asiente: a, ladea: 0.02 }, ojos: { x: g * 0.6, y: -a * 0.9, abiertos: 0.9 } });
    const p = poseEn(t, [
      [0, { x: LOR0.x, z: LOR0.z, giro: Math.PI + 0.12, inclina: 0.04, ...mira(0.45), ...CARA.incredula, ...AGENDA_POSE }],
      [T.c1 + 0.9, { ...mira(0.05, -0.15) }, 0.4],                                   // mira la camilla
      [T.l1, { ...mira(0.15, 0), ...NADA }, 0.25],
      [T.tacha1, { ...mira(0.5), ...ESCRIBE(0) }, 0.2], [T.tacha1 + 0.3, { ...ESCRIBE(1) }, 0.3], [T.tacha1 + 0.55, { ...AGENDA_POSE }, 0.25],
      [T.msj - 0.1, { ...mira(0.5) }, 0.2],
      [T.tacha2, { ...ESCRIBE(0) }, 0.2], [T.tacha2 + 0.3, { ...ESCRIBE(1) }, 0.3], [T.tacha2 + 0.55, { ...AGENDA_POSE }, 0.25],
      [T.p3, { ...mira(0.3, 0.3), ...CARA.incredula }, 0.15],
      [T.j1 + 0.5, { ...mira(0.45) }, 0.3],
      [T.tacha3, { ...ESCRIBE(0) }, 0.2], [T.tacha3 + 0.3, { ...ESCRIBE(1) }, 0.3], [T.tacha3 + 0.55, { ...AGENDA_POSE }, 0.25],
      [T.p4 + 0.3, { ...mira(0.05, -0.2), ...SECO }, 0.4],                          // mira la camilla vacía
      [T.p5, { giro: Math.PI + 0.15, ...mira(0.05, 0.05), ...SECO }, 0.01],
      [T.l2 + LEN.l2 + 0.1, { ...mira(0.1, 0.1) }, 0.3],
      [T.carolina2 + 0.1, { ...mira(0.5), ...CARA.incredula }, 0.25],
      [T.hoja[0], { manoD: [0.0, 0.42, 0.36] }, 0.15], [T.hoja[1], { manoD: [0.18, 0.4, 0.33] }, 0.3],
      [T.anota[0], { ...ESCRIBE(0) }, 0.1], [T.anota[1], { ...ESCRIBE(1) }, T.anota[1] - T.anota[0]],
      [T.l3, { ...mira(0.35), ...CARA.resignado, ojos: { abiertos: 0.75 } }, 0.2],
    ]);
    p.t = t;
    // la lapicera tacha: un vaivén chico mientras escribe
    for (const a of [T.tacha1, T.tacha2, T.tacha3, T.anota[0]]) { const k = sg(t, a, a + 0.32); if (k > 0 && k < 1) p.manoD = [p.manoD[0], p.manoD[1] + Math.sin(k * Math.PI * 4) * 0.01, p.manoD[2]]; }
    bocaVoz(p, t, T.l1, ENV.l1, 0.6); bocaVoz(p, t, T.l2, ENV.l2, 0.6); bocaVoz(p, t, T.l3, ENV.l3, 0.6);
    return p;
  }
  // parte 2
  if (t < T.q4) {
    const p = poseEn(t, [
      [0, { x: MOSTR.x - 0.3, z: MOSTR.z + 0.55, giro: Math.PI + 0.15, inclina: 0.04, ...aC(0, 0.3), ...CARA.neutra, ...BRAZOS.apoyado, manoD: [-0.12, 0.36, 0.3], codoD: [-0.8, -0.6, -0.2] }],
      [T.l4 - 0.1, { ...aC(0.0, 0.4), ...MEDIA }, 0.3],
    ]);
    p.t = t; bocaVoz(p, t, T.l4, ENV.l4, 0.6); return p;
  }
  const p = poseEn(t, [
    [0, { x: LOR0.x, z: LOR0.z, giro: Math.PI + 0.12, inclina: 0.03, ...aC(0, 0.1), ...CARA.esperanza, ...BRAZOS.costado }],
    [T.q4b, { giro: Math.PI - 0.55, ...aC(0.35, 0.05), ...MEDIA }, 0.35],
  ]);
  p.t = t; bocaVoz(p, t, T.l5, ENV.l5, 0.55); return p;
}
// Vale: sentada en el banquito con la toalla en las rodillas (parte 1); de pie junto a la camilla (parte 2)
const REG = { manoI: [0.11, 0.08, 0.3], manoD: [-0.11, 0.08, 0.3], codoI: [0.8, -0.6, -0.1], codoD: [-0.8, -0.6, -0.1] };
function poseVale(t) {
  const p2 = t >= P2;
  if (!p2) {
    const mov = (a, b) => { const k = sg(t, a, b); return k > 0 && k < 1 ? Math.sin(k * Math.PI * 5) : 0; };
    const m = mov(T.rollo[0], T.rollo[1]) + mov(T.cisne1[0], T.cisne1[1]) + mov(T.cisne2[0], T.cisne2[1]) + mov(T.corazon[0], T.corazon[1]);
    const p = poseEn(t, [
      [0, { x: VALE0.x, y: -0.03, z: VALE0.z, giro: -Math.PI / 2 + 0.85, sentado: 1, inclina: 0.1, ...aC(0, 0.32), ...CARA.concentrada, ...REG }],
      [T.p4, { ...aC(-0.35, 0.1), ...NADA, ojos: { abiertos: 0.75, x: -0.4, y: 0 } }, 0.4],
      [T.p6, { ...aC(0, 0.32), ...CARA.concentrada }, 0.3],
      [T.vale[0], { inclina: 0.3, manoI: [0.12, 0.2, 0.45], manoD: [-0.12, 0.2, 0.45] }, 0.3],
      [T.vale[1], { giro: -Math.PI / 2 + 1.6, inclina: 0.15, manoD: [-0.25, 0.65, 0.3], codoD: [-0.9, -0.3, 0], ...aC(0.2, -0.2) }, 0.4],
      [T.vale[2], { giro: -Math.PI / 2 + 0.85, inclina: 0.1, ...aC(0, 0.32), ...CARA.concentrada, ...REG }, 0.4],
    ]);
    p.manoI = [p.manoI[0] + m * 0.03, p.manoI[1] + Math.abs(m) * 0.03, p.manoI[2]]; p.manoD = [p.manoD[0] - m * 0.03, p.manoD[1] + Math.abs(m) * 0.02, p.manoD[2]];
    p.t = t; return p;
  }
  // parte 2: de pie junto a la camilla, la mano abierta hacia la camilla cuando entra Carolina
  const p = poseEn(t, [
    [0, { x: 0.62, z: -1.55, giro: -Math.PI / 2 + 0.9, ...aC(0, 0.1), ...CARA.sonrisa, ...BRAZOS.costado }],
    [T.c3 + 0.3, { ...aC(0.35, 0.0), ...BUENA }, 0.3],
    [T.pasa[0], { manoD: [-0.42, 0.42, 0.25], codoD: [-1, -0.4, 0] }, 0.3],
    [T.pasa[1], { ...BRAZOS.costado }, 0.4],
  ]);
  p.t = t; return p;
}
// Carolina: entra por la recepción (Q4) y camina hasta la camilla
function poseCarolina(t) {
  const u = sg(t, T.entra[0], T.entra[1]), w = sg(t, T.pasa[0], T.pasa[1]);
  const x = lerp(1.25, 0.2, eo(u)) + lerp(0, 0.15, eio(w)), z = lerp(1.25, -0.25, eo(u)) + lerp(0, -0.95, eio(w));
  const andando = (u > 0 && u < 1) || (w > 0 && w < 1);
  const p = poseEn(t, [
    [0, { giro: -Math.PI + 0.5, ...aC(0, 0), ...BUENA, manoI: [0.25, 0.05, 0.08], codoI: [1, -0.2, 0], manoD: [-0.29, -0.08, 0.04] }],
    [T.c3, { giro: 0.25, ...aC(0.1, -0.05), ...BUENA }, 0.4],
    [T.c3 + LEN.c3 - 0.2, { giro: -0.2 }, 0.4],
    [T.pasa[1], { giro: -Math.PI + 0.3, ...aC(0, 0.1), ...CARA.sonrisa }, 0.5],
  ]);
  Object.assign(p, { x, z, paso: andando ? 1 : 0, t });
  bocaVoz(p, t, T.c3, ENV.c3, 0.7);
  return p;
}
function poseGraciela(t) {
  const toca = Math.sin(Math.PI * sg(t, T.quiero - 0.12, T.quiero + 0.12));
  const p = poseEn(t, [
    [0, { x: 29.8, y: 0.06, z: -0.55, giro: 0, sentado: 1, inclina: 0.06, ...aC(0, 0.42), ...CARA.esperanza, ...BRAZOS.celular, codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] }],
    [T.g1, { ...aC(0.1, 0.0), ...CARA.feliz }, 0.2],
  ]);
  if (toca > 0) { p.manoD = [0.0, 0.36 + 0.03 * (1 - toca), 0.34]; p.dedoD = 1; }
  p.t = t; bocaVoz(p, t, T.g1, ENV.g1, 0.7); return p;
}
function poseSofi(t) {
  const p = poseEn(t, [[0, { x: 0, z: 0, giro: 0, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.s1 + 1.2, { ...aC(0.08, 0.02), manoD: [-0.2, 0.4, 0.32], codoD: [-0.8, -0.6, 0] }, 0.4], [T.s1 + LEN.s1 - 0.3, { ...BRAZOS.costado }, 0.4]]);
  p.t = t; bocaVoz(p, t, T.s1, ENV.s1, 0.6); return p;
}

// =====================================================================================================
// ESTADOS DE LOS OBJETOS
// =====================================================================================================
const _q = new THREE.Quaternion(), _a = new THREE.Vector3(), _b = new THREE.Vector3();
// la agenda pegada al pecho de Lorena (espacio del cuerpo), mirando hacia ella y un poco hacia la cámara
function ponerAgenda(t) {
  const enMano = t < P2;
  agenda.visible = enMano;
  if (!enMano) return;
  if (agenda.parent !== lorena.cuerpo) lorena.cuerpo.add(agenda);
  agenda.position.set(0.06, 0.33, 0.36); agenda.rotation.set(-1.05, 0, 0.05);
  // la lapicera en la mano derecha, la punta hacia la hoja
  manoMundo(lorena, "D", _a); lapicera.visible = true;
  lapicera.position.copy(_a).add(V3(0, -0.04, 0)); lapicera.quaternion.copy(lorena.raiz.quaternion); lapicera.rotateX(-0.5); lapicera.rotateZ(0.6);
  // el celular apoyado sobre la hoja izquierda
  if (celuL.parent !== agenda) agenda.add(celuL);
  celuL.position.set(-AG.w / 2 - 0.004, -0.01, 0.009); celuL.rotation.set(0, 0, 0.1); celuL.scale.setScalar(1.0); celuL.visible = true;
}
// las toallas de Vale en su regazo (espacio del cuerpo de Vale)
function ponerToallas(t) {
  const p2 = t >= P2;
  for (const o of [T_DOBLADA, T_ROLLO, CIS1, CIS2, T_NUEVA, T_NUEVA_R]) o.visible = false;
  CISNES_REC.visible = p2;
  if (p2) return;
  const cu = vale.cuerpo; cu.updateMatrixWorld(true);
  const enRegazo = (o, lx, ly, lz, ry = 0, s = 1) => { o.visible = true; o.position.copy(cu.localToWorld(V3(lx, ly, lz))); cu.getWorldQuaternion(_q); o.quaternion.copy(_q); o.rotateY(ry); o.scale.setScalar(s); };
  const pop = (a, b) => bk(sg(t, a, b));
  // fase 1: doblada → rollo (en las manos)
  if (t < T.rollo[1]) { const k = sg(t, T.rollo[0], T.rollo[1]); if (k < 0.5) enRegazo(T_DOBLADA, 0, 0.05, 0.25, 0, 1, 1); else { enRegazo(T_ROLLO, 0, 0.1, 0.28, 0, 1); T_ROLLO.scale.set(1, lerp(0.4, 1, pop(T.rollo[0] + 0.25, T.rollo[1])), 1); } if (k < 0.5) T_DOBLADA.scale.set(1, lerp(1, 0.6, k * 2), lerp(1, 0.5, k * 2)); return; }
  // fase 2: el rollo se vuelve cisne (el cuello sube)
  const enManos = t < T.vale[0];
  if (enManos) {
    if (t < T.cisne1[0] + 0.35) { enRegazo(T_ROLLO, 0, 0.1, 0.28, 0, 1); return; }
    const c1 = pop(T.cisne1[0] + 0.35, T.cisne1[1]);
    if (t < T.cisne2[0]) { enRegazo(CIS1, 0, 0.06, 0.3, -Math.PI / 2, 1.0); CIS1.scale.set(1, lerp(0.35, 1, c1), 1); return; }
    // fase 3: el segundo cisne; después los dos se juntan en corazón
    const c2 = pop(T.cisne2[0] + 0.3, T.cisne2[1]), h = eio(sg(t, T.corazon[0], T.corazon[1]));
    enRegazo(CIS1, lerp(0.0, 0.16, h), 0.06, lerp(0.3, 0.33, h), lerp(-Math.PI / 2, 0, h), 1.0);
    enRegazo(CIS2, lerp(-0.2, -0.16, h), 0.06, 0.32, Math.PI, 1.0); CIS2.scale.set(1, lerp(0.35, 1, c2), 1);
    if (t < T.cisne2[0] + 0.3) CIS2.visible = false;
    if (h > 0) { CIS1.rotation.y += 0; }
    return;
  }
  // fase 4: deja los cisnes en la camilla (sobre la sábana, a los pies) y agarra otra toalla del estante
  const yC = CAMILLA.alto + 0.03, zC = CAMILLA.z + 0.55;
  for (const [o, dx, ry] of [[CIS1, 0.16, Math.PI], [CIS2, -0.16, 0]]) { o.visible = true; o.position.set(CAMILLA.x + dx, yC, zC); o.rotation.set(0, ry + Math.PI / 2 * 0, 0); o.scale.setScalar(1); }
  CIS1.rotation.y = Math.PI; CIS2.rotation.y = 0;
  if (t < T.vale[1]) { const k = eio(sg(t, T.vale[0], T.vale[0] + 0.35)); const m = manoMundo(vale, "D", _a); for (const [o, dx] of [[CIS1, 0.16], [CIS2, -0.16]]) o.position.lerpVectors(V3(m.x + dx * 0.6, m.y - 0.05, m.z), V3(CAMILLA.x + dx, yC, zC), k); return; }
  // la toalla nueva: del estante a la mano y al regazo, y empieza a enrollarse
  const k = sg(t, T.vale[1], T.vale[2]);
  if (k < 1) { const m = manoMundo(vale, "D", _a); T_NUEVA.visible = true; T_NUEVA.position.set(m.x, m.y - 0.06, m.z); T_NUEVA.rotation.set(0, 0.5, 0); T_NUEVA.scale.setScalar(1); return; }
  const r = sg(t, T.vale[2] + 0.1, T.vale[2] + 0.6);
  if (r < 0.5) enRegazo(T_NUEVA, 0, 0.05, 0.25, 0); else { enRegazo(T_NUEVA_R, 0, 0.1, 0.28, 0); T_NUEVA_R.scale.set(1, lerp(0.4, 1, (r - 0.5) * 2), 1); }
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  ponerSol(0, -1.2);
  // el reloj
  const hd = t < P2 ? claves(t, T.relojK.map(([a, b]) => [a, b]), (x) => x) : 15.0 - (T.q4 - t) / 3600 * 60;
  relojG.userData.poner(t < P2 ? hd : 15.0, ((t * 1.0) % 60 + 60) % 60);
  dibujarAgenda(t); dibujarCeluL(t); dibujarTablet(t); dibujarReserva(t); dibujarRecordatorios(t); dibujarTabInserto(t); dibujarCeluG(t);
  // ---- personajes ----
  lorena.raiz.visible = true; lorena.poner(poseLorena(t));
  vale.raiz.visible = !p2 || t >= T.q4; vale.poner(poseVale(t));
  carolina.raiz.visible = p2 && t >= T.q4; if (carolina.raiz.visible) carolina.poner(poseCarolina(t));
  graciela.raiz.visible = planoActual === "Q3b"; if (graciela.raiz.visible) graciela.poner(poseGraciela(t));
  ponerAgenda(t); ponerToallas(t);
  if (p2) { lapicera.visible = false; if (celuL.parent !== scene) scene.add(celuL); if (t < T.q4) { const m = manoMundo(lorena, "D", _a); celuL.visible = true; celuL.position.copy(m).add(V3(0, 0.07, 0)); celuL.rotation.set(-0.9, lorena.raiz.rotation.y, 0); celuL.scale.setScalar(1.2); } else celuL.visible = false; }
  celuG.visible = graciela.raiz.visible;
  if (celuG.visible) { const a = manoMundo(graciela, "I", _a), b = manoMundo(graciela, "D", _b); celuG.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0.02)); celuG.rotation.set(-0.55, 0, 0); }
  // ---- Sofi: su escena a la textura del celular parado ----
  if (planoActual === "Q5" || planoActual === "Q4b") {
    sofi.poner(poseSofi(t)); sofi.raiz.updateMatrixWorld(true);
    const c = sofi.cabeza.localToWorld(V3(0, 0.2, 0));
    SOFI.cam.position.set(c.x + 0.05, c.y + 0.02, c.z + 1.55); SOFI.cam.lookAt(c.x, c.y - 0.12, c.z);
    renderer.setRenderTarget(SOFI.rt); renderer.render(SOFI.esc, SOFI.cam); renderer.setRenderTarget(null);
  }
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  const INS = { Q1b: INS1, Q2: INS2, Q3: INS3, Q3c: INS3 }[planoActual];
  for (const I of [INS1, INS2, INS3]) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.035, eo(k)));
    for (const p of TODOS) p.raiz.visible = false;
  }
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);   // depuración (probar.mjs)
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- tarjetas ----
  for (const k in GL) GL[k].visible = false; GL_G.visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const sale = (tf) => 1 - eio(sg(t, tf - 0.12, tf));
    const lb = () => bocaPx(lorena);
    const pa = planoActual;
    const celPx = () => objPx(celuL);
    if (pa === "P1") {
      const [cx, cy] = celPx();
      ponerGlobo(GL.c1, 540, 1640, 1, [cx, cy]); progAudio(GL.c1, sg(t, T.c1, T.c1 + LEN.c1));
      if (t >= T.l1) { const [bx, by] = lb(); ponerGlobo(GL.l1, 760, 560, ent(T.l1) * sale(T.p2 + 0.01), [bx + 40, by - 40], 1); }
    }
    if (pa === "P2") {
      const [cx, cy] = celPx();
      const e = t >= T.escribe[1] ? 2 : t >= T.escribe[0] ? 1 : 0;
      if (GL.mar.userData.e !== e) { GL.mar.userData.e = e; redibujar(GL.mar, (x, W, H) => dibujarMariana(x, W, H, e)); }
      if (t >= T.msj) ponerGlobo(GL.mar, 540, 1600, ent(T.msj), [cx, cy]);
    }
    if (pa === "P3") {
      const [cx, cy] = celPx();
      ponerGlobo(GL.j1, 540, 1620, ent(T.jimena), [cx, cy]); progAudio(GL.j1, sg(t, T.j1, T.j1 + LEN.j1));
    }
    if (pa === "P4") {
      // los rótulos del costo: a la agenda (abajo) y a Vale
      const [ax, ay] = objPx(agenda, V3(AG.w / 2, 0.02, 0.01)), [vx, vy] = bocaPx(vale);
      const u0 = ent(T.rot[0]), u1 = ent(T.rot[1]), u2 = ent(T.rot[2]);
      ponerGlobo(GL.r1, 330, 1240, u0, null, 1); if (u0 > 0) ponerGuia(GUIAS[0], 330, 1300, ax, ay - 10, eo(sg(t, T.rot[0], T.rot[0] + 0.25)));
      ponerGlobo(GL.r2, 330, 1440, u1, null, 1);
      ponerGlobo(GL.r3, 760, 520, u2, null, 1); if (u2 > 0) ponerGuia(GUIAS[1], 760, 590, vx, vy + 60, eo(sg(t, T.rot[2], T.rot[2] + 0.25)));
    }
    if (pa === "P5") { const [bx, by] = lb(); if (t >= T.l2) ponerGlobo(GL.l2, 540, 330, ent(T.l2), [bx, by - 40]); }
    if (pa === "P6") {
      const [cx, cy] = celPx(), [bx, by] = lb();
      ponerGlobo(GL.c2, 540, 380, ent(T.carolina2), [cx, cy]); progAudio(GL.c2, sg(t, T.c2, T.c2 + LEN.c2));
    }
    if (pa === "P6b") { const [bx, by] = lb(); ponerGlobo(GL.l3, 540, 1560, ent(T.l3), [bx, by + 60]); }
    if (pa === "Q1") {
      const [cx, cy] = celPx(), [bx, by] = lb();
      ponerGlobo(GL.q1c, 540, 420, ent(T.carolina3), [cx, cy]);
      if (t >= T.l4) ponerGlobo(GL.l4, 700, 1480, ent(T.l4), [bx + 20, by + 40], 1);
      if (t >= T.link) ponerGlobo(GL.link, 540, 1700, ent(T.link), [cx, cy], 2);
    }
    if (pa === "Q1b") ponerGlobo(GL.rReserva, 540, 190, ent(T.q1b + 0.15), null);
    if (pa === "Q2") { ponerGlobo(GL.chipMie, 540, 330, ent(T.q2 + 0.05), null); ponerGlobo(GL.rRecord, 540, 1600, ent(T.q2 + 0.35), null); }
    if (pa === "Q3" || pa === "Q3c") ponerGlobo(GL.rEspera, 540, 300, ent(pl[1] + 0.1), null);
    if (pa === "Q3b") {
      const [gx, gy] = objPx(celuG), [bx, by] = bocaPx(graciela);
      ponerGlobo(GL_G, 540, 330, ent(T.aviso), [gx, gy]);
      if (t >= T.g1) ponerGlobo(GL.g1, 760, 1520, ent(T.g1), [bx + 30, by + 60], 1);
    }
    if (pa === "Q4") { const [bx, by] = bocaPx(carolina); if (t >= T.c3) ponerGlobo(GL.c3, 540, 360, ent(T.c3), [bx, by - 40]); }
    if (pa === "Q4b") { const [bx, by] = lb(); if (t >= T.l5) ponerGlobo(GL.l5, 540, 340, ent(T.l5), [bx, by - 40]); }
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { lorena: bocaPx(lorena), vale: bocaPx(vale), plano: planoActual }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
