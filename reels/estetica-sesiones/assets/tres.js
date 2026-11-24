// Capa 3D de estetica-sesiones (Three.js r170 local). Base técnica: reels/estetica-turnos (el mismo centro de estética,
// los mismos personajes; globos pegados a la cámara en píxeles de pantalla, avatares por render target, poses por
// claves, bocas por envolvente, PLANOS con Catmull-Rom, insertos a pantalla completa). renderAt(t) es una función pura
// del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// UN lugar: "Lorena Estética", jueves de tarde. El gabinete (z de -3 a 0): Carolina sentada en la camilla con las gafas
// de láser en la frente y una toalla sobre las piernas; Vale en el banquito con el cabezal; el equipo de depilación
// láser a la derecha (un post-it "CARO" en el costado que mira a cámara, el otro costado forrado de post-its); Lorena en
// el arco con el cuaderno de paquetes. La recepción (z de 0 a 4,4) con la tablet del panel. El living de Carolina es un
// set chico aparte (x = 30).
//   PARTE 1: "Lore, ¿cuántas me quedan?" · el cuaderno (9 palitos: queda 1) · la tarjetita (7 sellos: quedan 3) · el
//            post-it (8 palitos: quedan 2) · "Hagamos el promedio." · "Tres." · "Vale, ¿y la de Jimena?" · Vale gira el
//            equipo: el costado de post-its
//   PARTE 2: "Asistió" en la tablet de Vale · la ficha 4 → 3 · el mensaje a Carolina · "Ah. Tres." · "Tres. Sin
//            promedio." · la ficha de Jimena · el último post-it al tacho · el aviso de renovar · "Chau, tarjetita." · el
//            panel de paquetes · Lorena a cámara: "Comentá SESIONES…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, CARA, BRAZOS, MARCA, poseEn, pegarACamara, crearCelular, crearLapicera, crearTablet } from "./personajes.js";
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
const CAMILLA = { x: -0.2, z: -1.75, rot: 0.0, largo: 1.85, ancho: 0.66, alto: 0.7 };   // a lo largo de z girada 0,55 rad: la cabecera atrás a la izquierda
const VALE0 = { x: -1.12, z: -0.98 };   // (estetica-sesiones) a la izquierda de la camilla, a la altura de las piernas
const LOR0 = { x: 0.5, z: -2.3 };   // (estetica-sesiones) Lorena parada a la derecha de la camilla, frente a Carolina
const MOSTR = { x: 0, z: 3.2, ancho: 1.8, prof: 0.55, alto: 0.9 };
let relojG, persiana, puertaV, LAMPARA;
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
  const techo = mesh(new THREE.PlaneGeometry(6, 9), new THREE.MeshBasicMaterial({ color: 0xe4e1d3 }), 0, ALTO, 0.7); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
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
  planta(-1.72, -2.82);   /* (r3) más al rincón: la punta se pegaba a la cintura de Vale en Q2b */ planta(1.55, 4.12, 0.8);
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
    const resp = new THREE.Group(); resp.position.set(0, H - 0.02, L / 2 - LP); resp.rotation.x = -1.0;   // (estetica-sesiones) respaldo bien levantado: Carolina sentada, recostada g.add(resp);
    resp.add(caja(W, 0.12, LR, col, 0, -0.04, -LR / 2, 0.05));
    resp.add(caja(W + 0.02, 0.02, LR, sab, 0, 0.03, -LR / 2, 0.01));
    const rollo = crearRollo(0.065, W - 0.08); rollo.position.set(0, 0.1, -LR + 0.12); resp.add(rollo);
    // el borde doblado de la sábana (una franja más gruesa a la mitad)
    g.add(caja(W + 0.04, 0.035, 0.12, sab, 0, H + 0.02, L / 2 - LP + 0.2, 0.015));
  }
  // ---- la lámpara lupa: pie con ruedas, columna, brazo de dos tramos con resorte, aro grande con lente y tubo prendido ----
  {
    const g = new THREE.Group(); g.position.set(1.62, 0, -2.72); g.rotation.y = -0.9; SET.add(g); LAMPARA = g;   // (estetica-sesiones) la lámpara lupa apagada en el rincón de la derecha
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; const p = caja(0.3, 0.03, 0.05, M.navy3, Math.cos(a) * 0.14, 0.06, Math.sin(a) * 0.14, 0.01); p.rotation.y = -a; g.add(p); g.add(mesh(new THREE.SphereGeometry(0.03, 10, 8), M.goma, Math.cos(a) * 0.27, 0.03, Math.sin(a) * 0.27)); }
    g.add(mesh(new THREE.CylinderGeometry(0.022, 0.026, 1.05, 12), M.navy3, 0, 0.58, 0));
    const pts1 = [V3(0, 1.1, 0), V3(0.18, 1.42, 0.2), V3(0.42, 1.55, 0.42)], pts2 = [V3(0.42, 1.55, 0.42), V3(0.6, 1.48, 0.6), V3(0.7, 1.35, 0.68)];
    for (const pts of [pts1, pts2]) { g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.018, 8), M.navy3)); g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => p.clone().add(V3(0, 0.035, 0)))), 12, 0.006, 6), M.metal)); }
    g.add(mesh(new THREE.SphereGeometry(0.035, 12, 10), M.navy, 0.42, 1.55, 0.42));
    const cab = new THREE.Group(); cab.position.set(0.74, 1.3, 0.72); cab.rotation.set(-1.0, 0.75, 0); g.add(cab);
    cab.add(mesh(new THREE.TorusGeometry(0.16, 0.035, 12, 40), M.cr));
    cab.add(mesh(new THREE.TorusGeometry(0.13, 0.016, 8, 40), new THREE.MeshStandardMaterial({ color: 0xfffbea, emissive: 0xfff6dc, emissiveIntensity: 0.0 })));
    const lente = new THREE.Mesh(new THREE.CircleGeometry(0.12, 32), new THREE.MeshPhysicalMaterial({ color: 0xbfe0f0, roughness: 0.05, transparent: true, opacity: 0.25, depthWrite: false })); lente.position.z = 0.005; cab.add(lente);
    cab.add(caja(0.08, 0.06, 0.05, M.navy3, 0, 0.19, -0.02, 0.01));
  }
  // ---- el carrito auxiliar: tres bandejas navy con ruedas, frascos (crema y verde pálido, tapa navy), pomos, bowl con
  // algodones, pincel y el vaporizador ----
  {
    const g = new THREE.Group(); g.position.set(1.5, 0, -0.55); g.rotation.y = -0.4; SET.add(g);   // (estetica-sesiones) el carrito a la derecha, adelante
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
    // (ronda 2) sin cartel en la pared del fondo: quedaba cortado en los primeros planos y "hablaba" sobre Lorena
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
fusionar(SET, [relojG, LAMPARA]);
LAMPARA.traverse((o) => { if (o.isMesh) o.castShadow = false; });   // (r2) su sombra grande en el piso del cuadro 0

const VINILO = []; SET.traverse((o) => { if (o.isMesh && o.material && o.material.map === vinT) VINILO.push(o); });
// ---- los dos cisnes de toalla de estetica-turnos, de adorno en el estante de la recepción (parte 2, guiño de serie) ----
const CISNES_REC = new THREE.Group(); CISNES_REC.position.set(-0.42, 1.44, RZ - 0.2); CISNES_REC.rotation.y = Math.PI; scene.add(CISNES_REC);
{ const a = crearCisne(), b = crearCisne(); a.position.set(-0.16, 0, 0); b.position.set(0.16, 0, 0); b.rotation.y = Math.PI; CISNES_REC.add(a, b); sombras(CISNES_REC); }

const LIV = new THREE.Group(); LIV.position.set(30, 0, 0); scene.add(LIV);
{
  const piso = mesh(new THREE.PlaneGeometry(6, 6), mat(0xb89a74, 0.8)); piso.rotation.x = -Math.PI / 2; LIV.add(piso);
  const pared = mesh(new THREE.BoxGeometry(6, 3, 0.1), M.pared, 0, 1.5, -1.2); LIV.add(pared);
  for (let i = 0; i < 6; i++) LIV.add(caja(0.2, 2.5, 0.08, i % 2 ? M.navy3 : M.navy2, 0.75 + i * 0.17, 1.3, -1.1, 0.06));   // la cortina en pliegues
  LIV.add(caja(1.1, 0.04, 0.08, M.navy, 1.18, 2.6, -1.1, 0.01));
  const s = new THREE.Group(); s.position.set(-0.2, 0, -0.65); LIV.add(s);
  s.add(caja(1.7, 0.4, 0.75, M.cr, 0, 0.3, 0, 0.1)); s.add(caja(1.7, 0.55, 0.2, M.cr, 0, 0.72, -0.3, 0.1));
  for (const sx of [-1, 1]) s.add(caja(0.2, 0.3, 0.75, M.cr, sx * 0.85, 0.58, 0, 0.09));
  s.add(caja(0.42, 0.42, 0.12, M.g, -0.55, 0.7, -0.15, 0.05)); s.add(caja(0.38, 0.38, 0.12, M.cr2, -0.1, 0.68, -0.18, 0.05));   // (estetica-sesiones) otros almohadones: es el living de Carolina
  const l = new THREE.Group(); l.position.set(-1.25, 0, -0.75); LIV.add(l);
  l.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 20), M.navy3, 0, 0.015, 0)); l.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5, 8), M.navy3, 0, 0.77, 0));
  l.add(mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.3, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xf6efd8, emissive: 0xfff2d0, emissiveIntensity: 0.5, side: THREE.DoubleSide }), 0, 1.6, 0));
  // (r1 11:11) el cuadro, corrido a la izquierda y más alto: detrás de la cabeza de Graciela parecían dos parantes
  const cuadro = new THREE.Group(); cuadro.position.set(-1.3, 2.05, -1.14); LIV.add(cuadro); cuadro.add(caja(0.5, 0.4, 0.03, M.navy3, 0, 0, 0, 0.01)); cuadro.add(caja(0.42, 0.32, 0.02, M.cr2, 0, 0, 0.012, 0.01));
  sombras(LIV);
}
fusionar(LIV);

// ---- utilidades del set: un punto en coordenadas de la camilla (x a lo ancho, z a lo largo, +z hacia los pies) ----
const CR_ = Math.cos(CAMILLA.rot), SR_ = Math.sin(CAMILLA.rot);
const camL = (lx, ly, lz) => V3(CAMILLA.x + lx * CR_ + lz * SR_, ly, CAMILLA.z - lx * SR_ + lz * CR_);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const lorena = crearPersonaje({ ...ELENCO.lorena, dedos: true, parpadeoCada: 999, parpadeosExtra: [1.5, r2(T.p4 + 0.6), r2(T.q1b + 0.9), r2(T.q4 + 0.5)] });   // nunca mientras habla
const vale = crearPersonaje({ ...ELENCO.vale, dedos: true, parpadeoCada: 4.3 });
// Carolina en la camilla: remera crema (la campera quedó colgada) · en su casa: la campera crema con cuello navy
const carolina = crearPersonaje({ ...ELENCO.carolina, cuello: null, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p4 + 0.25), r2(T.q1b - 0.2)] });
const carolinaCasa = crearPersonaje({ ...ELENCO.carolina, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q3b + 0.9)] });   // (r2) arrancaba el living parpadeando
const TODOS = [lorena, vale, carolina, carolinaCasa];
const LOR_MESHES = []; lorena.raiz.traverse((o) => { if (o.isMesh) LOR_MESHES.push(o); });   // (r2) para sacarla del inserto del cuaderno (su manga asomaba como un arco)
// la coleta de Carolina con volumen (se ve de frente, por encima del hombro), como en estetica-turnos
for (const per of [carolina, carolinaCasa]) {
  const R0 = 0.3, CC0 = R0 * 0.92, pc = mat(0xd8b56f, 0.75);
  const co = new THREE.Group(); co.position.set(0.12, CC0 - 0.02, -R0 * 0.85); co.rotation.set(0.2, 0, -0.35); per.cabeza.add(co);
  co.add(mesh(new THREE.TorusGeometry(0.045, 0.016, 8, 16), M.navy3, 0, 0.0, 0).rotateX(Math.PI / 2));
  for (const [y2, z2, sx, sy] of [[-0.08, -0.03, 0.08, 0.12], [-0.22, -0.02, 0.075, 0.13], [-0.35, 0.0, 0.06, 0.1]]) { const m = mesh(new THREE.SphereGeometry(1, 16, 12), pc, 0, y2, z2); m.scale.set(sx, sy, sx * 0.9); co.add(m); }
  sombras(per.cabeza);
}
sombras(lorena.cabeza);
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }

// ---- las gafas de láser en la frente de Carolina: lente envolvente verde oscuro opaco, marco y patillas navy ----
const GAFAS = new THREE.Group();
{
  const R0 = 0.3, CC0 = R0 * 0.92;
  // el lente: un tramo de cono que sigue la curva del cráneo por encima del pelo (casquete R·1,05)
  const e0 = 0.2, e1 = 0.5, k = 1.12;
  const r0 = R0 * k * Math.cos(e0), r1 = R0 * k * Math.cos(e1), y0 = CC0 + R0 * 1.06 * Math.sin(e0), y1 = CC0 + R0 * 1.06 * Math.sin(e1);
  const lente = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, y1 - y0, 40, 1, true, -1.05, 2.1), new THREE.MeshStandardMaterial({ color: 0x365f28, roughness: 0.22, metalness: 0.1, side: THREE.DoubleSide }));
  lente.position.y = (y0 + y1) / 2; GAFAS.add(lente);
  // el marco: dos aros finos (arriba y abajo) y el puente
  for (const [r, y] of [[r0 + 0.004, y0], [r1 + 0.004, y1]]) { const geo = new THREE.TorusGeometry(r, 0.009, 6, 40, 2.1); geo.rotateX(Math.PI / 2); geo.rotateY(-(Math.PI / 2 - 1.05)); const a = new THREE.Mesh(geo, M.navy); a.position.y = y; GAFAS.add(a); }
  // las patillas: de los extremos del lente hacia atrás, por encima de las orejas
  for (const s of [-1, 1]) {
    const a = s * 1.05, ym = (y0 + y1) / 2, rm = (r0 + r1) / 2 + 0.006;
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.022, 0.2), M.navy);
    p.position.set(Math.sin(a) * rm - s * 0.0, ym - 0.01, Math.cos(a) * rm - 0.1); p.rotation.y = s * 0.28; GAFAS.add(p);
  }
  // los dos lentes abombados (que se lea "gafas" y no vincha), con un brillo
  const lenteM = new THREE.MeshStandardMaterial({ color: 0x2f5422, roughness: 0.12, metalness: 0.15 });
  for (const s of [-1, 1]) {
    const az = s * 0.4, el = (e0 + e1) / 2, rr0 = R0 * k * 1.0;
    const b = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), lenteM); b.scale.set(0.085, 0.06, 0.03);
    b.position.set(Math.sin(az) * Math.cos(el) * rr0, CC0 + R0 * 1.06 * Math.sin(el), Math.cos(az) * Math.cos(el) * rr0); b.lookAt(b.position.clone().multiplyScalar(2).setY(b.position.y + 0.05)); GAFAS.add(b);
    const br = new THREE.Mesh(new THREE.CircleGeometry(0.014, 12), new THREE.MeshBasicMaterial({ color: 0xcfe7c0 })); br.position.copy(b.position).multiplyScalar(1.0); br.position.y += 0.022; br.position.x += -s * 0.02; br.lookAt(br.position.clone().multiplyScalar(2)); br.position.addScaledVector(br.position.clone().setY(0).normalize(), 0.032); GAFAS.add(br);
  }
  GAFAS.rotation.x = -0.05;
  carolina.cabeza.add(GAFAS); sombras(GAFAS);
}

// ---- la toalla blanca sobre las piernas de Carolina (las tapa enteras: de la cadera a más allá de los pies) ----
const TOALLA_P = new THREE.Group();
{
  const g = TOALLA_P;
  const W = 0.6, top = 0.875;
  g.add(caja(W, 0.05, 0.6, TOALLA, 0, top - 0.025, 0.27, 0.025));                     // sobre los muslos y las canillas
  const pies = caja(W - 0.02, 0.2, 0.22, TOALLA, 0, 0.885, 0.6, 0.08); g.add(pies);     // el bulto de los pies
  g.add(caja(W - 0.04, 0.24, 0.05, TOALLA, 0, 0.8, 0.72, 0.025));                        // el borde que cae a los pies
  for (const s of [-1, 1]) g.add(caja(0.05, 0.16, 0.66, TOALLA, s * (W / 2 - 0.01), 0.8, 0.33, 0.02));   // los costados que caen
  g.add(caja(W + 0.02, 0.03, 0.08, mat(0xe4e1d4, 0.95), 0, top + 0.005, 0.02, 0.012));   // el borde doblado arriba
  g.position.copy(camL(0, 0, 0)); g.rotation.y = CAMILLA.rot; scene.add(g); sombras(g);
}

// ---- la cartera verde oscuro de Carolina (P3: sobre su falda, a la izquierda; Q3: en el sillón) ----
function crearCartera() {
  const c = new THREE.Group();
  c.add(caja(0.28, 0.2, 0.1, mat(C.gd, 0.55), 0, 0.1, 0, 0.03)); c.add(caja(0.29, 0.03, 0.105, M.navy3, 0, 0.19, 0, 0.01));
  const correa = mesh(new THREE.TorusGeometry(0.11, 0.009, 6, 24, Math.PI), M.navy3, 0, 0.2, 0); c.add(correa);
  c.add(caja(0.03, 0.03, 0.03, M.metal, 0.1, 0.2, 0.05, 0.006));   // el tirador del cierre
  return sombras(c);
}
const CARTERA = crearCartera(); scene.add(CARTERA);
const CARTERA2 = crearCartera(); scene.add(CARTERA2);

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (para las fichas y los chats) ----
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
  AVATAR.lorena = leer(crearPersonaje({ ...ELENCO.lorena, parpadeoCada: 999 }), 0x5ce611);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };


// =====================================================================================================
// LOS PALITOS (de a cinco: cuatro y el tachado) Y LOS POST-ITS
// =====================================================================================================
// dibuja n palitos desde (x0, y0) hacia abajo de alto h; devuelve el x donde terminan. verde: el índice que va en verde
function palitos(x, n, x0, y0, h, { color = "#16243d", ancho = 8, paso = null, verde = -1, semilla: sm = 1 } = {}) {
  const p = paso ?? h * 0.22;
  let xx = x0, k = 0;
  x.lineCap = "round"; x.lineWidth = ancho;
  const jit = (i) => Math.sin(i * 12.9898 + sm * 4.1) * 0.5;
  while (k < n) {
    const g = Math.min(5, n - k);
    const xs = [];
    for (let i = 0; i < Math.min(4, g); i++) {
      const xi = xx + i * p, j = jit(k + i);
      x.strokeStyle = k + i === verde ? "#3fa60a" : color;
      x.beginPath(); x.moveTo(xi + j * h * 0.06, y0 + j * h * 0.04); x.lineTo(xi - j * h * 0.04, y0 + h); x.stroke(); xs.push(xi);
    }
    if (g === 5) { x.strokeStyle = k + 4 === verde ? "#3fa60a" : color; x.beginPath(); x.moveTo(xx - p * 0.6, y0 + h * 0.78); x.lineTo(xx + p * 3.6, y0 + h * 0.2); x.stroke(); }
    xx += (Math.min(4, g)) * p + p * 1.1; k += g;
  }
  return xx;
}
const POSTIT_C = ["#e3f2c8", "#efeee5", "#d6ecb8", "#f3f1e4"];
function dibujarPostit(x, w, h, nom, n, { fondo = "#e3f2c8", signo = "", px = 96 } = {}) {
  x.fillStyle = fondo; x.fillRect(0, 0, w, h);
  x.fillStyle = "rgba(11,18,32,0.07)"; x.fillRect(0, 0, w, h * 0.12);   // la franja de pegamento
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "alphabetic"; let pp = px; x.font = CAV(pp); while (x.measureText(nom).width > w * 0.84 && pp > 20) { pp -= 2; x.font = CAV(pp); } x.fillText(nom, w * 0.08, h * 0.38); x.font = CAV(px);   // (r1) el nombre entra en el post-it
  if (n > 0) palitos(x, n, w * 0.12, h * 0.5, h * 0.36, { ancho: Math.max(5, w * 0.03), paso: w * 0.085, semilla: nom.length });
  if (signo) { x.font = CAV(px); x.fillText(signo, w * (n > 0 ? 0.7 : 0.12), h * 0.86); }
}
// un post-it 3D: plano con la esquina de abajo a la derecha levantada (curva leve)
function crearPostit(tex, L = 0.1, levanta = 0.03) {
  const geo = new THREE.PlaneGeometry(L, L, 6, 6);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) { const u = pos.getX(i) / L + 0.5, v = 0.5 - pos.getY(i) / L; const k = Math.max(0, u + v - 1.15); pos.setZ(i, k * k * levanta * 4); }
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, side: THREE.DoubleSide }));
  m.castShadow = true; m.receiveShadow = true; return m;
}

// =====================================================================================================
// EL EQUIPO DE DEPILACIÓN LÁSER: torre crema sobre cuatro ruedas, frente navy redondeado, pantalla táctil inclinada
// arriba, botón de emergencia, el cabezal tipo pistola colgado de su soporte y el cable espiralado. Coordenadas locales:
// el frente (pantalla) mira a +z; los costados planos (x = ±W/2) llevan los post-its. En el mundo el frente mira a +x
// (a la camilla) y el costado -x (el del post-it CARO) mira a cámara; Vale lo gira 180° sobre las ruedas en P6 y aparece
// el costado +x, forrado de post-its.
// =====================================================================================================
const LZ = { x: -1.06, z: -2.46, W: 0.42, H: 0.95, D: 0.54, y0: 0.14 };
const LASER = new THREE.Group(); LASER.position.set(LZ.x, 0, LZ.z); scene.add(LASER);
const pantLaserT = lienzo(512, 360, (x, w, h) => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 60); x.fillText("Piernas", 34, 62);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w - 60, 62, 22, 0, 7); x.fill();
  for (let i = 0; i < 5; i++) { x.fillStyle = i < 4 ? "#5ce611" : "#2c4268"; rr(x, 34 + i * 92, 300 - 40 - i * 34, 70, 40 + i * 34, 10); }
  x.fillStyle = "#efeee5"; x.font = F(700, 40); x.fillText("Nivel 4", 34, 140);
});
let CABEZAL, PORT = V3(), SOPORTE;
const POSTIT_CARO = { m: null }, POSTITS = [], POSTIT_JIME = { m: null };
{
  const g = new THREE.Group(); LASER.add(g);   // la parte fija
  const { W, H, D, y0 } = LZ;
  // base con cuatro ruedas giratorias
  g.add(caja(W + 0.06, 0.06, D + 0.04, M.navy3, 0, 0.1, 0, 0.02));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.04, 8), M.metal, sx * (W / 2 - 0.02), 0.07, sz * (D / 2 - 0.03)));
    const r = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 16), M.goma, sx * (W / 2 - 0.02), 0.036, sz * (D / 2 - 0.03)); r.rotation.z = Math.PI / 2; g.add(r);
  }
  // el cuerpo crema (redondeado) y el frente navy
  g.add(caja(W, H, D, M.cr, 0, y0 + H / 2, 0, 0.07));
  g.add(caja(W - 0.08, H - 0.3, 0.03, M.navy3, 0, y0 + H / 2 - 0.06, D / 2 + 0.005, 0.03));
  g.add(caja(W - 0.16, 0.025, 0.012, M.g, 0, y0 + H - 0.24, D / 2 + 0.022, 0.006));   // una franja verde fina
  // las rejillas de ventilación del frente (franjas)
  for (let i = 0; i < 5; i++) g.add(caja(W - 0.18, 0.012, 0.01, M.navy, 0, y0 + 0.16 + i * 0.04, D / 2 + 0.022, 0.004));
  // la pantalla táctil inclinada arriba
  const pan = new THREE.Group(); pan.position.set(0, y0 + H + 0.02, 0.08); pan.rotation.x = -0.75; g.add(pan);
  pan.add(caja(0.36, 0.26, 0.03, M.navy, 0, 0.13, 0, 0.02));
  const pl = plano(0.32, 0.225, pantLaserT, 0, 0.13, 0.017, true); pan.add(pl);
  g.add(caja(0.12, 0.05, 0.08, M.navy3, 0, y0 + H + 0.01, 0.05, 0.015));
  // el botón de emergencia (rojo apagado) y la manija de atrás
  g.add(mesh(new THREE.CylinderGeometry(0.03, 0.034, 0.025, 20), M.navy, 0.13, y0 + H + 0.012, -0.12));
  g.add(mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.03, 20), M.red, 0.13, y0 + H + 0.035, -0.12));
  const manija = mesh(new THREE.TorusGeometry(0.11, 0.013, 8, 20, Math.PI), M.navy3, 0, y0 + H - 0.02, -D / 2 - 0.01); manija.rotation.x = -Math.PI / 2; manija.rotation.z = 0; g.add(manija);
  // el soporte del cabezal (en el frente, abajo de la pantalla) y el conector del cable
  SOPORTE = new THREE.Group(); SOPORTE.position.set(-0.12, y0 + H - 0.16, D / 2 + 0.04); g.add(SOPORTE);
  SOPORTE.add(caja(0.08, 0.1, 0.06, M.navy, 0, 0, 0, 0.015));
  g.add(mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.03, 16).rotateX(Math.PI / 2), M.navy, 0.1, y0 + 0.52, D / 2 + 0.03));
  PORT.set(0.1, y0 + 0.52, D / 2 + 0.045);
  // los post-its: el "CARO" (costado +x, el que mira a cámara) y el costado -x forrado (P6)
  const sx = W / 2 + 0.002;
  {
    const t = lienzo(256, 256, (x, w, h) => dibujarPostit(x, w, h, "CARO", 8, { px: 84 }));
    const m = crearPostit(t, 0.17, 0.04); m.position.set(-sx - 0.001, y0 + 0.66, -0.05); m.rotation.y = -Math.PI / 2; m.rotation.z = 0.06; g.add(m); POSTIT_CARO.m = m;
  }
  {
    const t = lienzo(256, 256, (x, w, h) => dibujarPostit(x, w, h, "JIME", 6, { px: 84, fondo: "#efeee5" }));
    const m = crearPostit(t, 0.11, 0.03); m.position.set(-sx - 0.001, y0 + 0.66, 0.06); m.rotation.y = -Math.PI / 2; m.rotation.z = -0.08; g.add(m); POSTIT_JIME.m = m; POSTIT_JIME.base = m.position.clone(); POSTIT_JIME.rot = m.rotation.clone();
  }
  // el costado de post-its: ~38, nombres y palitos, rotaciones y alturas con semilla fija; los de las filas de arriba
  // se leen de cerca
  const NOMBRES = [["JIME", 4], ["PATO", 7], ["MÓNICA", 0, "?"], ["SOFÍA", 6], ["LU", 2], ["ANA", 3], ["FLOR", 0, "?"], ["MARU", 6], ["VIVI", 2], ["LAU", 7], ["BETTY", 1], ["ROCÍO", 4], ["NATI", 0, "??"], ["EMI", 3], ["PAOLA", 5], ["CECI", 9], ["SILVI", 2], ["JUANA", 8], ["MECHI", 1, "?"], ["GABY", 4], ["ROMI", 6], ["KARINA", 3], ["DANI", 7], ["ELE", 2], ["TERE", 5], ["MAJO", 1], ["INÉS", 4, "?"], ["CLAU", 8], ["SOLE", 3], ["PILI", 6], ["NOE", 2], ["RAQUEL", 5], ["VERO", 7], ["MILI", 0, "?"], ["LETI", 4], ["ANDRE", 9], ["BEA", 3], ["FER", 6]];
  semilla = 77;
  const cols = 4, filas = 9;   // (r1) cuatro columnas: los nombres ya no se pisan ni sobresalen del costado
  NOMBRES.forEach(([nom, n, sig], i) => {
    const c = i % cols, f = Math.floor(i / cols);
    if (f >= filas) return;
    const t = lienzo(200, 200, (x, w, h) => dibujarPostit(x, w, h, nom, n, { fondo: POSTIT_C[(i * 7) % 4], signo: sig || "", px: nom.length > 5 ? 60 : 72 }));
    const L = 0.105 + az() * 0.01;
    const m = crearPostit(t, L, az() < 0.35 ? 0.018 : 0.006);
    const zz = (D / 2 - 0.08) - c * ((D - 0.16) / (cols - 1)) + (az() - 0.5) * 0.012;
    const yy = y0 + H - 0.085 - f * ((H - 0.15) / (filas - 1)) + (az() - 0.5) * 0.015;
    m.position.set(sx + 0.0012 + i * 0.00006, yy, -zz); m.rotation.y = Math.PI / 2; m.rotation.z = (az() - 0.5) * 0.28;
    g.add(m); POSTITS.push(m);
  });
  sombras(g);
  for (const m of [POSTIT_CARO.m, POSTIT_JIME.m, ...POSTITS]) m.castShadow = false;
  // el cabezal tipo pistola: mango navy, cabeza navy con la punta crema y la ventana verde oscuro (escala de juguete)
  CABEZAL = new THREE.Group();
  CABEZAL.add(caja(0.045, 0.15, 0.05, M.navy3, 0, -0.06, 0, 0.018));            // el mango (hacia abajo)
  CABEZAL.add(caja(0.06, 0.065, 0.17, M.navy, 0, 0.03, 0.05, 0.022));           // la cabeza (hacia +z)
  CABEZAL.add(caja(0.064, 0.07, 0.035, M.cr, 0, 0.03, 0.145, 0.016));            // la punta crema
  const vent = mesh(new THREE.PlaneGeometry(0.04, 0.045), new THREE.MeshStandardMaterial({ color: 0x1e3a14, emissive: 0x2c5a1a, emissiveIntensity: 0.4, roughness: 0.2 }), 0, 0.03, 0.163); CABEZAL.add(vent);
  CABEZAL.add(caja(0.02, 0.025, 0.03, M.g, 0, 0.065, 0.02, 0.006));             // el gatillo/botón verde
  CABEZAL.scale.setScalar(1.25); sombras(CABEZAL); scene.add(CABEZAL);
}
// el cable espiralado: tubo enrollado entre el conector del equipo y la cola del cabezal (con panza); se rearma solo
// cuando cambian las puntas
const CABLE = new THREE.Mesh(new THREE.BufferGeometry(), mat(C.navy3, 0.5)); CABLE.castShadow = true; scene.add(CABLE);
let claveCable = "";
function ponerCable(a, b, panza = 0.25) {
  const k = [a, b].map((v) => v.toArray().map((n) => n.toFixed(3)).join(",")).join("|");
  if (k === claveCable) return; claveCable = k;
  const base = new THREE.CatmullRomCurve3([a, a.clone().lerp(b, 0.33).add(V3(0, -panza, 0)), a.clone().lerp(b, 0.66).add(V3(0, -panza * 0.9, 0)), b]);
  const N = 260, vueltas = Math.max(8, Math.round(base.getLength() / 0.03)), R = 0.018;
  const pts = [];
  const fr = base.computeFrenetFrames(N, false);
  for (let i = 0; i <= N; i++) {
    const u = i / N, p = base.getPointAt(u), ang = u * vueltas * Math.PI * 2, rr2 = R * Math.min(1, u * 12, (1 - u) * 12);
    pts.push(p.clone().addScaledVector(fr.normals[i], Math.cos(ang) * rr2).addScaledVector(fr.binormals[i], Math.sin(ang) * rr2));
  }
  CABLE.geometry.dispose();
  CABLE.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), N * 2, 0.0065, 6, false);
}

// =====================================================================================================
// EL CUADERNO DE PAQUETES: espiralado, tapa verde apagado gastada con "PAQUETES" en etiqueta crema; adentro, la página
// de Carolina (9 palitos, uno verde, uno con "?", una aureola de café) y, en el revés de la tapa, la de otra clienta
// =====================================================================================================
const PAG = { W: 640, H: 860 };
function renglones(x, W, H, y0 = 230) { x.strokeStyle = "rgba(31,50,84,0.45)"; x.lineWidth = 5; for (let y = y0; y < H; y += 96) { x.beginPath(); x.moveTo(24, y); x.lineTo(W - 20, y); x.stroke(); } x.strokeStyle = "rgba(199,101,91,0.55)"; x.beginPath(); x.moveTo(70, 0); x.lineTo(70, H); x.stroke(); }
const pagCarolina = lienzo(PAG.W, PAG.H, (x, W, H) => {
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H); renglones(x, W, H, 210);
  // la aureola de café (plana, traslúcida)
  x.strokeStyle = "rgba(122,84,48,0.33)"; x.lineWidth = 16; x.beginPath(); x.arc(W - 150, H - 150, 92, 0.4, 6.0); x.stroke();
  x.strokeStyle = "rgba(122,84,48,0.18)"; x.lineWidth = 7; x.beginPath(); x.arc(W - 146, H - 152, 72, 0, 7); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "alphabetic";
  x.font = CAV(112); x.fillText("CAROLINA", 92, 120);
  x.font = CAV(76); x.fillText("LÁSER PIERNAS", 92, 196); x.fillText("PAQ. 10 · PAGÓ", 92, 290);
  tilde(x, 560, 262, 56, "#3fa60a", 12);
  // los 9 palitos: |||| tachado + ||||, uno en birome verde, uno con "?"
  const fin = palitos(x, 9, 110, 380, 200, { ancho: 13, paso: 54, verde: 6, semilla: 3 });
  x.fillStyle = "#16243d"; x.font = CAV(110); x.fillText("?", fin - 30, 560);
});
const pagOtra = lienzo(PAG.W, PAG.H, (x, W, H) => {
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H); renglones(x, W, H, 210);
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "alphabetic";
  x.font = CAV(96); x.fillText("MÓNICA", 92, 120); x.font = CAV(70); x.fillText("FACIAL · PAQ. 6", 92, 196);
  palitos(x, 4, 110, 240, 120, { ancho: 10, paso: 40 });
  x.font = CAV(96); x.fillText("PATO", 92, 520); x.font = CAV(70); x.fillText("LÁSER AXILAS", 92, 596);
  palitos(x, 7, 110, 640, 120, { ancho: 10, paso: 40 });
});
const pagHoja = lienzo(PAG.W, PAG.H, (x, W, H) => { x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H); renglones(x, W, H, 210); x.fillStyle = "#16243d"; x.font = CAV(90); x.fillText("SOFÍA", 92, 120); palitos(x, 5, 110, 250, 120, { ancho: 10, paso: 40 }); });
const tapaT = lienzo(PAG.W, PAG.H, (x, W, H) => {
  x.fillStyle = "#3fa60a"; x.fillRect(0, 0, W, H);
  // gastada: manchas más claras y esquinas
  semilla = 21; for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(239,238,229,${0.04 + az() * 0.06})`; x.beginPath(); x.arc(az() * W, az() * H, 10 + az() * 50, 0, 7); x.fill(); }
  x.fillStyle = "rgba(11,18,32,0.18)"; x.beginPath(); x.moveTo(W, H); x.lineTo(W - 90, H); x.lineTo(W, H - 90); x.fill();
  x.fillStyle = "#efeee5"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(70, 120, W - 140, 220, 18); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = CAV(120); x.fillText("PAQUETES", W / 2, 236);
});
const CU = { w: 0.2, h: 0.27 };
const CUADERNO = new THREE.Group();
const TAPA = new THREE.Group();     // pivote en el espiral (x = 0): cerrada tapa la página de la derecha
const HOJAS_V = [new THREE.Group(), new THREE.Group()];   // las dos hojas que se pasan al hojear
{
  CUADERNO.add(caja(CU.w + 0.012, CU.h + 0.012, 0.012, mat(C.gd, 0.7), CU.w / 2, 0, -0.008, 0.006));   // contratapa
  CUADERNO.add(caja(CU.w, CU.h, 0.01, M.cr, CU.w / 2 + 0.002, 0, -0.001, 0.003));                      // el bloque de hojas
  const pd = plano(CU.w - 0.006, CU.h - 0.006, pagCarolina, CU.w / 2 + 0.004, 0, 0.0046); CUADERNO.add(pd);
  // los separadores de colores asomando por el costado
  [[C.cr, 0.07], [C.navy3, 0.0], [C.gp, -0.07]].forEach(([c, y]) => CUADERNO.add(caja(0.02, 0.035, 0.004, mat(c, 0.7), CU.w + 0.01, y, 0.0, 0.002)));
  // el espiral
  for (let i = 0; i < 12; i++) { const r = mesh(new THREE.TorusGeometry(0.01, 0.0024, 6, 14), M.metal, 0, CU.h / 2 - 0.02 - i * 0.021, 0.004); r.rotation.y = Math.PI / 2; CUADERNO.add(r); }
  TAPA.position.set(0, 0, 0.008); CUADERNO.add(TAPA);
  const tf = plano(CU.w + 0.01, CU.h + 0.01, tapaT, CU.w / 2 + 0.003, 0, 0.0025); TAPA.add(tf);
  TAPA.add(caja(CU.w + 0.01, CU.h + 0.01, 0.004, mat(C.gd, 0.7), CU.w / 2 + 0.003, 0, 0.0, 0.002));
  const tr = plano(CU.w - 0.006, CU.h - 0.006, pagOtra, CU.w / 2 + 0.003, 0, -0.0028); tr.rotation.y = Math.PI; TAPA.add(tr);
  HOJAS_V.forEach((h, i) => { h.position.set(0, 0, 0.0055 + i * 0.0004); CUADERNO.add(h); const a = plano(CU.w - 0.008, CU.h - 0.008, pagHoja, CU.w / 2 + 0.004, 0, 0.0004); h.add(a); const b = plano(CU.w - 0.008, CU.h - 0.008, pagOtra, CU.w / 2 + 0.004, 0, -0.0004); b.rotation.y = Math.PI; h.add(b); });
  for (const m of [pd, tf, tr]) { m.material.emissive = new THREE.Color(0xffffff); m.material.emissiveMap = m.material.map; m.material.emissiveIntensity = 0.2; }
  sombras(CUADERNO); scene.add(CUADERNO);
}
const birome = crearLapicera(); birome.scale.setScalar(1.3); scene.add(birome);

// =====================================================================================================
// LA TARJETITA DE CARTÓN: "Lorena Estética · Láser piernas · 10 sesiones", 10 casilleros: 7 sellos de hojita verde
// (levemente torcidos, uno corrido) y 3 vacíos; doblada al medio, con una esquina gastada
// =====================================================================================================
const TJ = { w: 0.22, h: 0.142 };
function hojita(x, cx, cy, s, rot, color = "#3fa60a") {
  x.save(); x.translate(cx, cy); x.rotate(rot);
  x.strokeStyle = color; x.lineWidth = s * 0.12; x.lineCap = "round"; x.globalAlpha = 0.88;
  x.beginPath(); x.moveTo(0, s * 0.42); x.quadraticCurveTo(-s * 0.42, 0, 0, -s * 0.42); x.quadraticCurveTo(s * 0.42, 0, 0, s * 0.42); x.stroke();
  x.beginPath(); x.moveTo(0, s * 0.42); x.lineTo(0, -s * 0.25); x.stroke();
  x.globalAlpha = 1; x.restore();
}
const tarjetaT = lienzo(880, 568, (x, W, H) => {
  x.fillStyle = "#ece6d2"; x.fillRect(0, 0, W, H);
  // la esquina gastada y el doblez al medio
  x.fillStyle = "rgba(120,100,70,0.22)"; x.beginPath(); x.moveTo(0, H); x.lineTo(70, H); x.lineTo(0, H - 60); x.fill();
  x.strokeStyle = "rgba(90,80,60,0.28)"; x.lineWidth = 5; x.beginPath(); x.moveTo(W / 2, 0); x.lineTo(W / 2, H); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle";
  x.font = F(800, 66); x.fillText("Lorena Estética", W / 2, 66);
  x.font = F(700, 46); x.fillText("Láser piernas · 10 sesiones", W / 2, 130);
  x.fillStyle = "#3fa60a"; x.fillRect(W / 2 - 120, 166, 240, 8);
  for (let i = 0; i < 10; i++) {
    const c = i % 5, f = Math.floor(i / 5), cx = 110 + c * 165, cy = 280 + f * 170;
    x.strokeStyle = "#16243d"; x.lineWidth = 7; x.setLineDash(i < 7 ? [] : [18, 12]);
    x.beginPath(); x.roundRect(cx - 66, cy - 66, 132, 132, 18); x.stroke(); x.setLineDash([]);
    if (i < 7) hojita(x, cx + (i === 4 ? 16 : 0), cy + (i === 4 ? -10 : 0), 120, [-0.15, 0.1, 0.22, -0.05, 0.3, -0.25, 0.08][i]);
    else { x.fillStyle = "rgba(22,36,61,0.3)"; x.font = F(800, 52); x.fillText(String(i + 1), cx, cy + 2); }
  }
});
const TARJETA = new THREE.Group();
{
  // dos mitades con un doblez leve (5°): pivote en el doblez
  const mat2 = (ox) => { const t = tarjetaT.clone(); t.needsUpdate = true; t.repeat.set(0.5, 1); t.offset.set(ox, 0); t.colorSpace = THREE.SRGBColorSpace; return new THREE.MeshStandardMaterial({ map: t, roughness: 0.9, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.18 }); };
  const iz = new THREE.Mesh(new THREE.PlaneGeometry(TJ.w / 2, TJ.h), mat2(0)); iz.position.x = -TJ.w / 4; const pi = new THREE.Group(); pi.rotation.y = 0.07; pi.add(iz); TARJETA.add(pi);
  const de = new THREE.Mesh(new THREE.PlaneGeometry(TJ.w / 2, TJ.h), mat2(0.5)); de.position.x = TJ.w / 4; const pd = new THREE.Group(); pd.rotation.y = -0.07; pd.add(de); TARJETA.add(pd);
  sombras(TARJETA); scene.add(TARJETA);
}

// =====================================================================================================
// LA TABLET DE VALE (parte 2, funda navy), EL CELULAR DE CAROLINA, EL TACHO, EL BOLLITO, LA TABLET DEL PANEL
// =====================================================================================================
const pantV = lienzo(640, 440, () => {});
const TABV = new THREE.Group();
{
  TABV.add(caja(0.31, 0.22, 0.02, M.navy3, 0, 0, 0, 0.02));
  const p = plano(0.28, 0.19, pantV, 0, 0, 0.0105, true); TABV.add(p);
  sombras(TABV); scene.add(TABV);
}
const pantC = lienzo(600, 975, () => {});
const CELU = crearCelular(pantC, C.gd, 0.08, 0.162); CELU.scale.setScalar(1.3); scene.add(CELU);
// el tacho: papelera chica navy con tapa a pedal (la tapa pivota atrás)
const TACHO = new THREE.Group(); TACHO.position.set(-0.98, 0, -1.6); scene.add(TACHO);
const TACHO_TAPA = new THREE.Group();
{
  TACHO.add(mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.34, 28), M.navy3, 0, 0.17, 0));
  TACHO.add(mesh(new THREE.TorusGeometry(0.13, 0.008, 6, 28).rotateX(Math.PI / 2), M.navy, 0, 0.34, 0));
  TACHO.add(caja(0.08, 0.02, 0.06, M.metal, 0, 0.02, 0.13, 0.006));   // el pedal
  TACHO_TAPA.position.set(0, 0.345, -0.13); TACHO.add(TACHO_TAPA);
  TACHO_TAPA.add(mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.02, 28), M.navy, 0, 0.01, 0.13));
  sombras(TACHO);
}
const BOLLITO = new THREE.Mesh((() => { const g = new THREE.IcosahedronGeometry(0.035, 1); const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const k = 0.8 + 0.35 * Math.abs(Math.sin(i * 7.3)); p.setXYZ(i, p.getX(i) * k, p.getY(i) * k, p.getZ(i) * k); } g.computeVertexNormals(); return g; })(), mat(0xefeee5, 0.9, { flatShading: true }));
BOLLITO.castShadow = true; scene.add(BOLLITO);
// la tablet del atril de la recepción: el panel de paquetes
const pantT = lienzo(720, 1000, () => {});
const tablet = crearTablet(pantT, 0.3, 0.42, 0.25); tablet.position.set(0.27, MOSTR.alto, MOSTR.z + 0.02); tablet.rotation.y = Math.PI; tablet.scale.setScalar(1.35); scene.add(tablet);

// ---- la mesita con cajón del living de Carolina (Q3): navy chica; adentro un sobre crema y una birome ----
const MESITA = new THREE.Group(); MESITA.position.set(30 + 0.76, 0, 0.0);   /* (r2) más lejos de la rodilla: el cajón ya no cruza la pierna */ MESITA.rotation.y = -Math.PI / 2; scene.add(MESITA);   // (r1) al lado de la rodilla, el cajón hacia Carolina
const CAJON = new THREE.Group();
{
  const W = 0.5, H = 0.52, D = 0.42;
  MESITA.add(caja(W, 0.03, D, M.navy3, 0, H - 0.015, 0, 0.012)); MESITA.add(caja(W + 0.02, 0.025, D + 0.02, M.cr, 0, H + 0.012, 0, 0.01));
  for (const sx of [-1, 1]) MESITA.add(caja(0.03, H - 0.03, D, M.navy3, sx * (W / 2 - 0.015), (H - 0.03) / 2, 0, 0.01));
  MESITA.add(caja(W, H - 0.2, 0.02, M.navy3, 0, (H - 0.2) / 2, -D / 2 + 0.01, 0.005));
  MESITA.add(caja(W, 0.02, D, M.navy3, 0, 0.11, 0, 0.005));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) MESITA.add(caja(0.04, 0.1, 0.04, M.navy, sx * (W / 2 - 0.03), 0.05, sz * (D / 2 - 0.03), 0.008));
  // el cajón (se desliza hacia +z)
  CAJON.position.set(0, H - 0.12, 0); MESITA.add(CAJON);
  CAJON.add(caja(W - 0.07, 0.015, D - 0.04, M.navy3, 0, -0.06, 0, 0.004));
  for (const sx of [-1, 1]) CAJON.add(caja(0.012, 0.1, D - 0.04, M.navy3, sx * (W / 2 - 0.042), -0.015, 0, 0.004));
  CAJON.add(caja(W - 0.07, 0.1, 0.012, M.navy3, 0, -0.015, -D / 2 + 0.03, 0.004));
  CAJON.add(caja(W - 0.04, 0.15, 0.02, M.navy3,   /* (r3) el cajón del mismo navy que el mueble */ 0, -0.005, D / 2 - 0.005, 0.01));   // el frente
  CAJON.add(mesh(new THREE.SphereGeometry(0.018, 12, 10), M.g, 0, -0.005, D / 2 + 0.012));
  CAJON.add(caja(0.2, 0.006, 0.14, M.cr, -0.06, -0.05, -0.02, 0.002));   // el sobre
  const b = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.15, 8), M.navy, 0.12, -0.046, 0.0); b.rotation.x = Math.PI / 2; b.rotation.z = 0.4; CAJON.add(b);
  sombras(MESITA);
}


// =====================================================================================================
// TARJETAS PEGADAS A LA CÁMARA (en píxeles de pantalla): globos de diálogo, rótulos (de estetica-turnos)
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

function crearFondoInserto(g) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: 0x1f3254 })); bg.position.z = -0.06; g.add(bg);
  // la recepción desenfocada: la pared crema arriba, el mostrador navy abajo con la tapa crema, una planta verde
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1300 / PXK), new THREE.MeshBasicMaterial({ color: 0xd8d5c6 })); pc.position.set(0, 600 / PXK, -0.058); g.add(pc);
  const tapa = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 60 / PXK), new THREE.MeshBasicMaterial({ color: 0xefeee5 })); tapa.position.set(0, -50 / PXK, -0.057); g.add(tapa);
  const fr = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 26 / PXK), new THREE.MeshBasicMaterial({ color: 0x5ce611 })); fr.position.set(0, -140 / PXK, -0.057); g.add(fr);
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  // (ronda 1) que parezca un aparato: el reborde con brillo, la cámara arriba y, si va en la mano, la mano que lo sostiene
  const brillo = new THREE.Mesh(rbox((IW + 2 * marcoR - 10) / PXK, (IH + 2 * marcoR - 10) / PXK, 0.005, 76 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x2c4268 })); brillo.position.set((cx - 540 - 3) / PXK, (960 - cy + 3) / PXK, -0.035); g.add(brillo);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  if (opc.mano) {
    const piel = new THREE.MeshBasicMaterial({ color: opc.mano }), sombraP = new THREE.MeshBasicMaterial({ color: new THREE.Color(opc.mano).multiplyScalar(0.82) });
    const palma = new THREE.Mesh(rbox(330 / PXK, 420 / PXK, 0.01, 120 / PXK, 3), piel); palma.position.set((cx - 540 - IW / 2 + 90) / PXK, (960 - cy - IH / 2 - 120) / PXK, -0.045); palma.rotation.z = -0.35; g.add(palma);
    const pulgar = new THREE.Mesh(rbox(86 / PXK, 250 / PXK, 0.01, 43 / PXK, 3), piel); pulgar.position.set((cx - 540 - IW / 2 + 20) / PXK, (960 - cy - IH / 2 + 160) / PXK, -0.015); pulgar.rotation.z = -0.5; g.add(pulgar);
    const una = new THREE.Mesh(rbox(50 / PXK, 60 / PXK, 0.01, 22 / PXK, 3), sombraP); una.position.set((cx - 540 - IW / 2 + 70) / PXK, (960 - cy - IH / 2 + 250) / PXK, -0.014); una.rotation.z = -0.5; g.add(una);
    // (r1 11:11) sin los tres dedos del borde derecho (se leían como rectángulos sueltos): la palma y el pulgar alcanzan
  }
  return { g, tex, IW, IH };
}

// =====================================================================================================
// LAS PANTALLAS (canvas): la ficha de Carolina, el mensaje, la ficha de Jimena, el aviso de renovar, el panel
// =====================================================================================================
const fit = (x, txt, peso, px, ancho) => ajustar(x, txt, peso, px, ancho);
// la ficha de una clienta con su paquete: e = { nombre, serv, cv, usadas, nueva (0..1 el círculo que se llena), antes,
// despues, cuenta (0..1), enviado, boton (0 sin tocar, 1 tocado) }
function dibujarFicha(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 210); x.fillStyle = "#5ce611"; x.fillRect(0, 210, W, 12);
  avatar(x, e.cv, 100, 105, 70);
  x.fillStyle = "#efeee5"; fit(x, e.nombre, 800, 64, W - 220); x.fillText(e.nombre, 196, 76);
  x.fillStyle = "#5ce611"; fit(x, e.serv, 700, 48, W - 220); x.fillText(e.serv, 198, 146);
  x.fillStyle = "#0b1220"; x.font = F(700, 46); x.fillText("Paquete de 10 · pagado", 44, 282); tilde(x, W - 70, 280, 50, "#3fa60a", 12);
  // los 10 círculos (dos filas de 5)
  for (let i = 0; i < 10; i++) {
    const c = i % 5, f = Math.floor(i / 5), cx = 110 + c * ((W - 220) / 4), cy = 400 + f * 132, r = 52;
    const usada = i < e.usadas, nueva = i === e.usadas && e.nueva > 0;
    x.lineWidth = 8; x.strokeStyle = "#16243d";
    if (usada) { x.fillStyle = "#1f3254"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); tilde(x, cx, cy + 2, 46, "#efeee5", 10); }
    else if (nueva) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(cx, cy, r * (0.6 + 0.4 * e.nueva), 0, 7); x.fill(); x.stroke(); if (e.nueva > 0.6) tilde(x, cx, cy + 2, 50, "#0b1220", 11); }
    else { x.fillStyle = "#ffffff"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.stroke(); x.fillStyle = "rgba(22,36,61,0.45)"; x.font = F(800, 40); x.textAlign = "center"; x.fillText(String(i + 1), cx, cy + 2); x.textAlign = "left"; }
  }
  // el contador grande
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 7; x.beginPath(); x.roundRect(30, 640, W - 60, 190, 34); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, 60); x.fillText("Te quedan:", 64, 736);
  const k = e.cuenta ?? 0;
  if (e.despues == null || k <= 0) { x.font = F(900, 120); x.textAlign = "right"; x.fillText(String(e.antes), W - 70, 742); x.textAlign = "left"; }
  else {
    x.textAlign = "right"; x.font = F(900, 92); x.fillStyle = "rgba(11,18,32,0.4)"; x.fillText(String(e.antes), W - 262, 740);
    x.fillStyle = "#16243d"; x.font = F(900, 70); x.fillText("→", W - 160, 736);
    x.fillStyle = "#3fa60a"; x.font = F(900, 120 * (0.7 + 0.3 * k)); x.fillText(String(e.despues), W - 64, 742); x.textAlign = "left";
  }
  // el botón "Asistió" y el envío
  if (e.boton != null) {
    x.fillStyle = e.boton ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(30, 860, W - 60, 130, 65); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 64); x.fillText(e.boton ? "Asistió ✓" : "Asistió", W / 2, 927); x.textAlign = "left";
    if (e.boton === 0.5) { x.strokeStyle = "rgba(11,18,32,0.45)"; x.lineWidth = 12; x.beginPath(); x.arc(W / 2 + 190, 925, 60, 0, 7); x.stroke(); }
  }
  if (e.enviado) { x.fillStyle = "#16243d"; x.textAlign = "center"; x.font = F(800, 46); x.fillText("Enviado a " + e.corto + " ✓", W / 2, 1020); x.textAlign = "left"; }
  if (e.pie) { x.fillStyle = "#16243d"; x.textAlign = "center"; x.font = F(800, 50); x.fillText(e.pie, W / 2, 926); x.textAlign = "left"; }
}
// el chat genérico: encabezado navy "Lorena Estética" con avatar; burbujas blancas con borde navy
function cabeceraChat(x, W) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, 2000);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 190); avatar(x, AVATAR.lorena, 92, 98, 60);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; fit(x, "Lorena Estética", 800, 58, W - 200); x.fillText("Lorena Estética", 176, 98);
}
function burbuja(x, X, Y, W, H) { x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(X, Y, W, H, [36, 36, 36, 8]); x.fill(); x.stroke(); }
function dibujarMensaje(x, W, H, e) {
  cabeceraChat(x, W);
  if (!e) return;
  // (r2) la burbuja llena la pantalla (antes quedaba el 40 % de abajo vacío)
  burbuja(x, 30, 240, W - 90, 800);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(700, 64); x.fillText("Hola, Carolina.", 70, 345);
  x.font = F(800, 74); x.fillText("Sesión 7 de 10", 70, 495); x.fillText("hecha", 70, 590); tilde(x, 70 + x.measureText("hecha ").width + 34, 584, 64, "#3fa60a", 15);
  fit(x, "Te quedan 3.", 900, 124, W - 170); x.fillText("Te quedan 3.", 70, 800);
  x.fillStyle = "#3fa60a"; x.fillRect(70, 880, W - 230, 12);
  x.fillStyle = "#16243d"; x.font = F(700, 44); x.textAlign = "right"; x.fillText("18:01", W - 90, 990); x.textAlign = "left";
}
function dibujarRenovar(x, W, H, e) {
  cabeceraChat(x, W);
  if (e >= 3) {
    // pagado
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 250, W - 60, 760, 44); x.fill();
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W / 2, 420, 110, 0, 7); x.fill(); tilde(x, W / 2, 424, 120, "#0b1220", 26);
    x.fillStyle = "#5ce611"; x.textAlign = "center"; x.font = F(900, 96); x.fillText("Pagado", W / 2, 620);
    x.fillStyle = "#efeee5"; x.font = F(800, 56); x.fillText("Paquete nuevo:", W / 2, 740); x.font = F(900, 66); x.fillText("10 sesiones", W / 2, 820);
    x.font = F(700, 46); x.fillText("Arranca después de", W / 2, 916); x.fillText("la que te queda", W / 2, 970); x.textAlign = "left";
    return;
  }
  if (e === 2) {
    // la pantalla de pago genérica, de un toque
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 7; x.beginPath(); x.roundRect(30, 250, W - 60, 560, 40); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(800, 56); x.fillText("Lorena Estética", W / 2, 340);
    x.font = F(700, 46); x.fillText("Láser piernas · 10 sesiones", W / 2, 420);
    x.font = F(900, 120); x.fillText("$ 18.000", W / 2, 560);
    x.fillStyle = "#3fa60a"; x.strokeStyle = "#0b1220"; x.beginPath(); x.roundRect(70, 640, W - 140, 130, 65); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 66); x.fillText("Confirmar", W / 2, 707); x.textAlign = "left";
    x.strokeStyle = "rgba(11,18,32,0.45)"; x.lineWidth = 12; x.beginPath(); x.arc(W / 2 + 170, 705, 60, 0, 7); x.stroke();
    return;
  }
  burbuja(x, 30, 230, W - 90, 430);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(700, 50); x.fillText("Hola, Carolina.", 66, 296);
  x.font = F(700, 48); x.fillText("Hoy hiciste la 9 de 10:", 66, 370);
  x.font = F(900, 76); x.fillText("te queda 1.", 66, 456);
  fit(x, "¿Renovás tu paquete?", 800, 54, W - 150); x.fillText("¿Renovás tu paquete?", 66, 560);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 690, W - 90, 150, 30); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, 48); x.fillText("Láser piernas · 10", 66, 745); x.font = F(900, 56); x.fillText("$ 18.000", 66, 808);
  x.fillStyle = e === 1 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(30, 870, W - 90, 140, 70); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; fit(x, "Renovar y pagar", 900, 64, W - 160); x.fillText("Renovar y pagar", (W - 60) / 2 + 15, 942); x.textAlign = "left";
  if (e === 1) { x.strokeStyle = "rgba(11,18,32,0.45)"; x.lineWidth = 12; x.beginPath(); x.arc(W / 2 + 160, 940, 60, 0, 7); x.stroke(); }
}
// el panel de paquetes (la tablet del atril): n filas visibles y el cero
function dibujarPanel(x, W, H, n, cero) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 150); x.fillStyle = "#5ce611"; x.fillRect(0, 150, W, 12);
  x.fillStyle = "#efeee5"; x.font = F(800, 42); x.fillText("Lorena Estética", 36, 48); x.font = F(900, 74); x.fillText("PAQUETES", 36, 110);
  const filas = [["Activos", "42", false], ["Descontadas este mes", "96", true], ["Por terminar · avisadas", "5", true], ["Renovaron", "4", false]];
  filas.forEach(([a, b, ok], i) => {
    if (i >= n) return;
    const y = 190 + i * 150;
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, y, W - 48, 132, 26); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; fit(x, a, 700, 44, W - 260); x.fillText(a, 50, y + 66);
    x.textAlign = "right"; x.font = F(900, 72); x.fillText(b, W - (ok ? 120 : 52), y + 68); x.textAlign = "left";
    if (ok) tilde(x, W - 74, y + 66, 44, "#3fa60a", 12);
  });
  if (cero) {
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(16, 800, W - 32, 186, 34); x.fill();
    x.fillStyle = "#efeee5"; x.textAlign = "center"; fit(x, "Sesiones regaladas por las dudas:", 700, 40, W - 70); x.fillText("Sesiones regaladas por las dudas:", W / 2, 846);
    x.fillStyle = "#5ce611"; x.font = F(900, 112); x.fillText("0", W / 2, 936); x.textAlign = "left";
  }
}
// la pantalla chica de la tablet de Vale (se ve en 3D; lo que se lee va en el inserto)
function dibujarTabV(x, W, H, k) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 110); x.fillStyle = "#efeee5"; x.font = F(800, 52); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText(k === "jimena" ? "Jimena" : "Carolina", 30, 56);
  for (let i = 0; i < 10; i++) { x.fillStyle = i < (k === "jimena" ? 5 : k ? 7 : 6) ? (i === 6 && k === 1 ? "#5ce611" : "#1f3254") : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.arc(70 + (i % 5) * 125, 180 + Math.floor(i / 5) * 110, 40, 0, 7); x.fill(); x.stroke(); }
  x.fillStyle = k === 1 ? "#3fa60a" : "#5ce611"; x.beginPath(); x.roundRect(30, 340, W - 60, 80, 40); x.fill();
}


// ---- globos, rótulos ----
const RJ = "#ff9d92";   // el rojo apagado, más claro sobre la caja navy (que se lea)
const GL = {
  c1: crearGlobo(["Lore, ¿cuántas", "me [quedan?]"], 84),
  l1: crearGlobo(["Dejame [ver.]"], 86),
  l2: crearGlobo(["Según el cuaderno,", "[una.]"], 78),
  c2: crearGlobo(["¿Una? Acá tengo", "[siete] sellos."], 80),
  l3: crearGlobo(["Hagamos el", "[promedio.]"], 88),
  c3: crearGlobo(["¿Y cuánto [da?]"], 88),
  l4: crearGlobo(["[Tres.]"], 120),
  l5: crearGlobo(["Vale, ¿y la", "de [Jimena?]"], 80, { cab: { cv: AVATAR.lorena, nombre: "Lorena" } }),   // (r1) con su nombre: Lorena habla fuera de cuadro
  c4: crearGlobo(["Ah. [Tres.]"], 96),
  l6: crearGlobo(["[Tres.]", "Sin promedio."], 88),
  c5: crearGlobo(["Chau, [tarjetita.]"], 80),
  rCuad: crearRotulo([["Cuaderno:"], ["queda 1", RJ, 64]], 50),
  rTarj: crearRotulo([["Tarjetita:"], ["quedan 3", RJ, 64]], 50),
  rPost: crearRotulo([["Post-it:"], ["quedan 2", RJ, 64]], 50),
  rProm: crearRotulo([["El promedio daba 2.", RJ], ["Le dio 3 para no discutir."]], 56),   // (r2) más grande
  rPlata: crearRotulo([["Este mes: 8 sesiones"], ["regaladas por las dudas"], ["$ 14.400", RJ, 92]], 56),
  rPost6: crearRotulo([["6 paquetes terminados."], ["Nadie les avisó.", RJ], ["No renovaron.", RJ]], 54),   // (r2) frases con punto
  rSola: crearRotulo([["Cada sesión se"], ["descuenta sola", "#5ce611"]], 54),
  rRenov: crearRotulo([["Con 1 sesión, le llega"], ["el aviso para renovar", "#5ce611"]], 50),
};
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// =====================================================================================================
// INSERTOS A PANTALLA COMPLETA (pegados a la cámara): la ficha de Carolina (Q1f), su celular (Q1c), la ficha de Jimena
// (Q2i), el aviso de renovar (Q3i)
// =====================================================================================================
const INS_F = { g: new THREE.Group() }; crearFondoInserto(INS_F.g);
const TABF = crearCelInserto(760, 1056, 540, 1060, 44, { camara: true }); INS_F.g.add(TABF.g); TABF.g.scale.setScalar(1.18); TABF.g.position.y = -0.09;
const INS_M = { g: new THREE.Group() }; crearFondoInserto(INS_M.g);
const CELM = crearCelInserto(740, 1240, 560, 1060, 34, { camara: true });   /* (r3) sin el dedo quieto: queda solo el círculo del toque */ INS_M.g.add(CELM.g); CELM.g.scale.setScalar(1.1); CELM.g.position.y = -0.06;
const INS_J = { g: new THREE.Group() }; crearFondoInserto(INS_J.g);
const TABJ = crearCelInserto(760, 1056, 540, 1060, 44, { camara: true }); INS_J.g.add(TABJ.g); TABJ.g.scale.setScalar(1.18); TABJ.g.position.y = -0.09;
const INS_R = { g: new THREE.Group() }; crearFondoInserto(INS_R.g);
const CELR = crearCelInserto(740, 1240, 560, 1060, 34, { camara: true }); INS_R.g.add(CELR.g); CELR.g.scale.setScalar(1.1); CELR.g.position.y = -0.06;
const INSERTOS = [INS_F, INS_M, INS_J, INS_R];
for (const I of INSERTOS) { pegarACamara(I.g, camera, 10); I.g.visible = false; }

const clavesP = {};
const una = (k, v, f) => { const s = JSON.stringify(v); if (clavesP[k] === s) return; clavesP[k] = s; f(); };
function dibujarPantallas(t) {
  // la ficha de Carolina (inserto): 6 usadas, la 7.ª se llena, 4 → 3, enviado
  const fF = { nombre: "Carolina", corto: "Carolina", serv: "Láser piernas", cv: AVATAR.carolina, usadas: 6, nueva: Math.round(eo(sg(t, T.circulo, T.circulo + 0.25)) * 8) / 8, antes: 4, despues: 3, cuenta: Math.round(sg(t, T.cuenta2, T.cuenta2 + 0.2) * 6) / 6, enviado: t >= T.enviado, boton: t >= T.asistio + 0.12 ? 1 : t >= T.asistio ? 0.5 : 0 };
  una("F", fF, () => { dibujarFicha(TABF.tex.userData.x, TABF.IW, TABF.IH, fF); TABF.tex.needsUpdate = true; });
  una("M", t >= T.msg, () => { dibujarMensaje(CELM.tex.userData.x, CELM.IW, CELM.IH, t >= T.msg); CELM.tex.needsUpdate = true; });
  una("J", 1, () => { dibujarFicha(TABJ.tex.userData.x, TABJ.IW, TABJ.IH, { nombre: "Jimena", corto: "Jimena", serv: "Láser axilas", cv: AVATAR.jimena, usadas: 5, nueva: 0, antes: 5, pie: "5 de 10 · al día" }); TABJ.tex.needsUpdate = true; });
  const eR = t >= T.pagado ? 3 : t >= T.renovar + 0.15 ? 2 : t >= T.renovar ? 1 : 0;
  una("R", eR, () => { dibujarRenovar(CELR.tex.userData.x, CELR.IW, CELR.IH, eR); CELR.tex.needsUpdate = true; });
  const nP = T.filas.filter((a) => t >= a).length, cP = t >= T.cero;
  una("P", [nP, cP], () => { dibujarPanel(pantT.userData.x, 720, 1000, nP, cP); pantT.needsUpdate = true; });
  const kV = t >= T.q2 ? "jimena" : t >= T.asistio ? 1 : 0;
  una("V", kV, () => { dibujarTabV(pantV.userData.x, 640, 440, kV); pantV.needsUpdate = true; });
  una("C", t >= T.q3 ? 2 : t >= T.msg ? 1 : 0, () => { const x = pantC.userData.x; cabeceraChat(x, 600); if (t >= T.msg) { burbuja(x, 24, 230, 540, 320); x.fillStyle = "#0b1220"; x.font = F(800, 52); x.fillText(t >= T.q3 ? "te queda 1." : "Te quedan 3.", 50, 330); x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(24, 600, 540, 120, 60); x.fill(); } pantC.needsUpdate = true; });
}

// =====================================================================================================
// CÁMARA
// =====================================================================================================
// PLANOS: [nombre, desde, claves | función(t) | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte
// seco; dentro de un plano, Catmull-Rom continua. null = inserto. Q1 repite el encuadre de P1, Q1e el de P5 y Q2 el de P6.
const P1C = (k) => [lerp(0.62, 0.58, k), lerp(1.72, 1.68, k), lerp(1.75, 1.45, k), -0.38, 1.2, -1.9, 66];   // (r2) mira más arriba: menos piso vacío abajo   // (r1) más abierto: Vale y Lorena enteras
const P5C = (k) => [lerp(0.0, 0.05, k), 1.46, lerp(-0.85, -1.0, k), 0.48, 1.33, -2.3, lerp(54, 48, k)];   // (r1) menos encima
const P6C = (k) => [lerp(0.3, -0.3, k), lerp(1.5, 1.32, k), lerp(0.85, -0.55, k), lerp(-1.32, -1.2, k),   /* (r2) más a la izquierda: Vale no se corta al levantarse */ lerp(0.92, 0.82, k), -2.2, lerp(48, 40, k)];
// cámara pegada a un objeto (insertos 3D): a d de su centro sobre su normal, con el "arriba" del objeto
const _c = new THREE.Vector3(), _n = new THREE.Vector3(), _u = new THREE.Vector3();
function camObj(obj, centro, d, fov, ladeo = V3(0, 0, 0)) {
  obj.updateMatrixWorld(true);
  obj.localToWorld(_c.copy(centro));
  _n.set(0, 0, 1).add(ladeo).normalize().transformDirection(obj.matrixWorld);
  _u.set(0, 1, 0).transformDirection(obj.matrixWorld);
  camera.position.copy(_c).addScaledVector(_n, d);
  camera.up.copy(_u); camera.fov = fov; camera.updateProjectionMatrix(); camera.lookAt(_c);
}
const PLANOS = [
  ["P1", 0, [[0, ...P1C(0)], [T.p2, ...P1C(1)]]],
  ["P2", T.p2, "cuaderno"],
  ["P3", T.p3, [[T.p3, 0.38, 1.62, -0.3, -0.05, 1.45, -2.1, 46], [T.p3b, 0.36, 1.6, -0.5, -0.05, 1.45, -2.1, 43]]],   // (r2) la cara más abajo: el globo ya no le tapa la frente
  ["P3b", T.p3b, "tarjeta"],
  ["P4", T.p4, [[T.p4, 0.6, 1.75, 1.52, -0.45, 1.05, -1.95, 68], [T.p4b, 0.6, 1.75, 1.47, -0.45, 1.05, -1.95, 68]]],   // (r3) más abierto: Vale entera a la izquierda
  ["P4b", T.p4b, "postit"],
  ["P4c", T.p4c, [[T.p4c, 0.6, 1.75, 1.47, -0.45, 1.05, -1.95, 68], [T.p5, 0.6, 1.75, 1.42, -0.45, 1.05, -1.95, 67.5]]],   // (r2) Lorena entera a la derecha
  ["P5", T.p5, [[T.p5, ...P5C(0)], [T.p5b, ...P5C(0.5)]]],
  ["P5b", T.p5b, [[T.p5b, 0.3, 1.62, -0.95, -0.15, 1.48, -2.1, 48], [T.p5c, 0.28, 1.62, -1.05, -0.15, 1.48, -2.1, 45]]],
  ["P5c", T.p5c, [[T.p5c, ...P5C(0.5)], [T.p6, ...P5C(1)]]],
  ["P6", T.p6, [[T.p6, ...P6C(0)], [T.gira[0], ...P6C(0.25)], [T.gira[1], ...P6C(0.45)], [P1, ...P6C(0.52)]]],   // (r2) termina menos encima: Vale entera   // (r1) el push-in termina antes: Vale no queda cortada
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...P1C(0.6)], [T.q1f, ...P1C(0.8)]]],
  ["Q1f", T.q1f, null],
  ["Q1b", T.q1b, [[T.q1b, 0.35, 1.5, -0.2, -0.1, 1.3, -2.1, 46], [T.q1c, 0.33, 1.49, -0.4, -0.1, 1.3, -2.1, 43]]],   // (r2) más baja: el reloj ya no le sale de la cabeza
  ["Q1c", T.q1c, null],
  ["Q1d", T.q1d, [[T.q1d, 0.3, 1.62, -0.8, -0.15, 1.42, -2.1, 50], [T.q1e, 0.28, 1.62, -0.95, -0.15, 1.42, -2.1, 47]]],
  ["Q1e", T.q1e, [[T.q1e, ...P5C(0.3)], [T.q2, ...P5C(0.9)]]],
  ["Q2", T.q2, [[T.q2, ...P6C(0)], [T.q2i, ...P6C(0.15)]]],
  ["Q2i", T.q2i, null],
  ["Q2b", T.q2b, [[T.q2b, 0.1, 1.3, 0.7, -1.15, 0.7, -1.85, 52], [T.q3, 0.06, 1.29, 0.6, -1.15, 0.7, -1.85, 51]]],   // (r2) más abierto y bajo: el tacho, el post-it y el tiro
  ["Q3", T.q3, [[T.q3, 30.34, 1.32, 2.05, 30.36, 0.82, -0.5, 48], [T.q3i, 30.34, 1.3, 1.95, 30.36, 0.82, -0.5, 47]]],   // (r2) más cerca y bajo: menos piso
  ["Q3i", T.q3i, null],
  ["Q3b", T.q3b, [[T.q3b, 30.38, 1.32, 2.5, 30.38, 0.82, -0.4, 50], [T.q4, 30.38, 1.31, 2.35, 30.38, 0.82, -0.4, 49]]],
  ["Q4", T.q4, [[T.q4, 0.27, 1.32, 2.0, 0.27, 1.18, 3.22, 40], [T.c, 0.27, 1.28, 2.25, 0.27, 1.18, 3.22, 39]]],   // (r1) entra ya cerca, con las filas cargando
  ["C", T.c, [[T.c, 0.02, 1.48, 1.5, 0.02, 0.98, 3.6, 55], [DUR, 0.02, 1.48, 1.6, 0.02, 0.99, 3.6, 54]]],   // (r2) la cara entera   /* (r1) el 0 verde queda arriba de la tarjeta */
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
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.2, feliz: 0 }, cejas: { alto: -0.05, ang: -0.15 }, boca: { sonrisa: -0.05, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.92, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } };
const SORPRESA = { ...CARA.sorpresa, ojos: { abiertos: 1, feliz: 0 }, cejas: { alto: 0.7, ang: 0.3 }, boca: { sonrisa: 0.35, abierta: 0.2, ancho: 0.9 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (!env) return;
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);   // hablando, nunca con los ojos cerrados
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
// un punto del mundo en el espacio del cuerpo de un personaje (para apuntar las manos)
const enCuerpo = (per, v) => { per.raiz.updateMatrixWorld(true); const p = per.cuerpo.worldToLocal(v.clone()); return [p.x, p.y, p.z]; };

// ---- Lorena: el cuaderno (mano izquierda), la birome (derecha) ----
const CUAD_POSE = { manoI: [0.27, 0.26, 0.3], codoI: [0.9, -0.6, -0.2], manoD: [-0.14, 0.34, 0.36], codoD: [-0.9, -0.6, -0.2] };
const lorMira = (g, a) => ({ cabeza: { giro: g, asiente: a, ladea: 0.02 }, ojos: { x: g * 0.5, y: -a * 0.6, abiertos: 0.95 } });
function poseLorena(t) {
  if (t < P2) {
    const p = poseEn(t, [
      [0, { x: LOR0.x, z: LOR0.z, giro: -0.35, inclina: 0.04, ...lorMira(-0.62, 0.08), ...CARA.neutra, ...CUAD_POSE }],
      [T.hojea[0] + 0.1, { ...lorMira(-0.1, 0.42), ...CARA.concentrada, ojos: { abiertos: 0.9, y: -0.3 } }, 0.3],
      [T.l2 + 0.6, { ...lorMira(-0.62, 0.12), ...CARA.neutra }, 0.3],
      [T.p3 + 0.5, { ...lorMira(-0.62, 0.1), ...CARA.sorpresa, cejas: { alto: 0.5, ang: 0.2 }, boca: { sonrisa: 0.1, abierta: 0.05 } }, 0.3],
      [T.mira, { ...lorMira(0.12, 0.08), ...SECO }, 0.35],                                        // mira a Vale
      [T.tres3 + 0.2, { ...lorMira(-0.62, 0.06), ...SECO }, 0.35],
      [T.p5, { ...lorMira(-0.62, 0.05), ...MEDIA }, 0.01],
      [T.cierra[0], { ...lorMira(-0.3, 0.3), manoD: [-0.04, 0.3, 0.36] }, 0.15],
      [T.l4 - 0.05, { ...lorMira(-0.62, 0.05), ...BUENA, ...CUAD_POSE }, 0.25],
      [T.p6, { giro: -0.35, ...lorMira(-0.3, 0.05), ...SECO, cejas: { alto: 0.35, ang: 0.45 } }, 0.01],
    ]);
    // P2 (el cuaderno de cerca): las dos manos en los bordes de afuera, no tapan las páginas
    if (t >= T.p2 && t < T.p3) { p.manoI = [0.36, 0.24, 0.3]; p.manoD = [-0.36, 0.26, 0.32]; }
    // en sus primeros planos (P5 y P5c) la cabeza casi al frente (la melena le tapaba la cara de 3/4); los ojos a Carolina
    if (t >= T.p5 && t < T.p6 && !(t >= T.p5b && t < T.p5c)) { p.cabeza.giro = -0.08; p.ojos.x = -0.55; }
    bocaVoz(p, t, T.l1, ENV.l1, 0.6); bocaVoz(p, t, T.l2, ENV.l2, 0.6); bocaVoz(p, t, T.l3, ENV.l3, 0.6); bocaVoz(p, t, T.l4, ENV.l4, 0.7); bocaVoz(p, t, T.l5, ENV.l5, 0.6);
    return p;
  }
  if (t < T.q4) {
    const p = poseEn(t, [
      [0, { x: LOR0.x, z: LOR0.z, giro: -0.35, inclina: 0.02, ...lorMira(-0.62, 0.06), ...CARA.sonrisa, manoI: [0.2, 0.1, 0.22], manoD: [-0.2, 0.1, 0.22], codoI: [0.9, -0.5, 0], codoD: [-0.9, -0.5, 0] }],
      [T.l6 - 0.1, { ...lorMira(-0.62, 0.04), ...MEDIA }, 0.3],
      [T.q2, { ...lorMira(-0.3, 0.05), ...CARA.neutra }, 0.01],
      [T.q2i + 0.3, { ...lorMira(-0.25, 0.1), ...CARA.sonrisa }, 0.3],
    ]);
    if (t >= T.q1e && t < T.q2) { p.cabeza.giro = -0.08; p.ojos.x = -0.55; }
    bocaVoz(p, t, T.l6, ENV.l6, 0.6); bocaVoz(p, t, T.l5b, ENV.l5, 0.6);
    return p;
  }
  // la recepción: detrás del mostrador, a cámara
  const p = poseEn(t, [
    [0, { x: MOSTR.x - 0.12, z: MOSTR.z + 0.45, giro: Math.PI - 0.05, inclina: 0.02, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado, manoI: [0.26, -0.2, 0.06], codoI: [0.9, -0.5, 0], manoD: [-0.26, -0.2, 0.06], codoD: [-0.9, -0.5, 0] }],   // (r2) las manos debajo del mostrador: los dedos lo atravesaban
    [T.l7 + 0.4, { ...aC(0, 0.06), ...MEDIA, ojos: { x: 0, y: -0.05, abiertos: 0.95 } }, 0.3],   // (r2) de frente a cámara (de 3/4 la boca se torcía)
  ]);
  bocaVoz(p, t, T.l7, ENV.l7, 0.6);
  return p;
}
// ---- Vale: en el banquito con el cabezal (parte 1), se levanta y gira el equipo (P6); parte 2 con la tablet ----
const VALE_S = { x: VALE0.x, y: -0.03, z: VALE0.z, giro: 1.1, sentado: 1 };
function poseVale(t) {
  if (t < P2) {
    const pip = (a) => Math.sin(Math.PI * sg(t, a - 0.12, a + 0.12)) * 0.03;
    const p = poseEn(t, [
      [0, { ...VALE_S, inclina: 0.2, ...aC(0.15, 0.38), ...CARA.concentrada, manoD: [0.0, 0.36, 0.5], codoD: [-0.8, -0.6, -0.1], manoI: [0.16, 0.2, 0.44], codoI: [0.8, -0.6, -0.1] }],
      [T.c1 + 0.6, { torso: 0.15, ...aC(0.55, 0.05), ...CARA.neutra }, 0.4],                                   // mira a Carolina y a Lorena
      [T.p4, { torso: 0.15, ...aC(0.55, 0.05), ...CARA.neutra, inclina: 0.08, manoD: [-0.16, 0.08, 0.3], manoI: [0.15, 0.1, 0.3] }, 0.01],
      [T.senala[1], { torso: 0.35, ...aC(0.7, 0.05), ...CARA.neutra, manoI: [0.46, 0.32, -0.02], codoI: [1, -0.2, -0.3], dedoI: 1 }, T.senala[1] - T.senala[0]],
      [T.tres3 + 0.5, { torso: 0.15, ...aC(0.55, 0.06), manoI: [0.15, 0.1, 0.3], dedoI: 0 }, 0.4],
      [T.p6, { ...aC(0.5, 0.05), ...CARA.neutra }, 0.01],
      // se levanta y queda parada al frente del equipo, de 3/4 a cámara, las manos arriba del equipo
      [T.levanta[1], { x: -1.52, y: 0, z: -1.98, sentado: 0, giro: 0.9, inclina: 0.05, torso: 0, ...aC(-0.35, 0.05), ...CARA.resignado, ojos: { abiertos: 0.7 }, manoI: [0.12, 0.42, 0.3], manoD: [-0.2, 0.42, 0.34], codoI: [0.8, -0.5, -0.1], codoD: [-0.8, -0.5, -0.1] }, T.levanta[1] - T.levanta[0]],
      [T.gira[0] - 0.02, { manoI: [0.3, 0.15, 0.2], manoD: [-0.2, 0.15, 0.25] }, 0.25],   // (r1) suelta el equipo: la mano se metía en los post-its
      [T.gira[1], { ...aC(-0.15, 0.05), ...BRAZOS.costado }, 0.3],
    ]);
    p.manoD = [p.manoD[0], p.manoD[1] + pip(T.pips[0]) + pip(T.pips[1]), p.manoD[2]];
    return p;
  }
  if (t < T.q2) {
    const toca = Math.sin(Math.PI * sg(t, T.asistio - 0.15, T.asistio + 0.15));
    const p = poseEn(t, [
      [0, { ...VALE_S, inclina: 0.12, ...aC(0.1, 0.3), ...CARA.concentrada, manoI: [0.06, 0.28, 0.36], codoI: [0.7, -0.7, -0.2], manoD: [-0.14, 0.3, 0.38], codoD: [-0.8, -0.6, -0.1] }],
      [T.asistio + 0.3, { ...aC(0.4, 0.05), ...CARA.sonrisa }, 0.4],
    ]);
    if (toca > 0) { p.manoD = [lerp(p.manoD[0], -0.0, toca), lerp(p.manoD[1], 0.36, toca), lerp(p.manoD[2], 0.4, toca)]; p.dedoD = toca; }
    return p;
  }
  // Q2 · parada al frente del equipo (el plano de P6) con la tablet; la gira hacia Lorena; despega el post-it y lo tira
  const p = poseEn(t, [
    [0, { x: -1.52, y: 0, z: -1.98, giro: 0.9, inclina: 0.03, ...aC(-0.35, 0.05), ...CARA.sonrisa, manoI: [0.04, 0.3, 0.3], codoI: [0.8, -0.6, -0.1], manoD: [-0.2, 0.0, 0.15], codoD: [-0.9, -0.5, 0] }],
    [T.giraTab[1], { giro: 0.3, ...aC(0.3, 0.05), ...CARA.sonrisa, manoI: [0.1, 0.4, 0.42] }, T.giraTab[1] - T.giraTab[0]],
    // (r2) Q2b: de 3/4, con la izquierda despega el post-it del costado del equipo (a su izquierda), lo hace un bollito
    // delante del pecho y lo tira al tacho que tiene adelante; la tablet quedó en el banquito
    [T.q2b, { x: -1.42, z: -1.9, giro: 0.88, ...aC(0.05, 0.1),   /* (r3) más a cámara */ ...CARA.sonrisa, manoI: [0.2, -0.12, 0.08], codoI: [0.9, -0.5, 0], manoD: [-0.2, -0.12, 0.08], codoD: [-0.9, -0.5, 0] }, 0.01],
    [T.despega[0] + 0.1, { manoI: [0.46, 0.1, 0.12], codoI: [1, -0.3, 0], ...aC(0.35, 0.15) }, 0.25],
    [T.bollo[1], { manoI: [0.1, 0.32, 0.42], codoI: [0.8, -0.6, -0.1], manoD: [-0.08, 0.3, 0.4], codoD: [-0.8, -0.6, -0.1], ...aC(0.0, 0.35) }, 0.25],
    [T.tira[0] + 0.1, { manoI: [0.14, 0.4, 0.5], manoD: [-0.2, -0.12, 0.08], codoD: [-0.9, -0.5, 0], ...aC(0.1, 0.3) }, 0.15],
    [T.tira[1], { manoI: [0.12, 0.05, 0.42], ...aC(0.1, 0.3), ...BUENA }, 0.25],
  ]);
  return p;
}
// ---- Carolina en la camilla (respaldo levantado, piernas estiradas bajo la toalla, gafas en la frente) ----
const CARO_S = (() => { const v = camL(0, 0, -0.1); return { x: v.x, y: 0.245, z: v.z, giro: CAMILLA.rot, sentado: 1, estira: 1, inclina: -0.32 }; })();
const REGAZO = { manoI: [0.14, 0.06, 0.32], manoD: [-0.14, 0.06, 0.32], codoI: [0.8, -0.6, -0.1], codoD: [-0.8, -0.6, -0.1] };
function poseCarolina(t) {
  if (t < P2) {
    const p = poseEn(t, [
      [0, { ...CARO_S, torso: 0.2, ...aC(0.42, 0.02), ...CARA.sonrisa, ...REGAZO }],
      [T.l1, { ...aC(0.45, 0.06), ...CARA.neutra }, 0.3],
      // abre la cartera (sobre su falda, a la izquierda) y saca la tarjetita; la extiende hacia Lorena
      [T.saca[0] + 0.25, { ...aC(0.2, 0.3), ...SORPRESA, manoI: [0.22, 0.12, 0.42], manoD: [0.06, 0.12, 0.42] }, 0.25],
      [T.c2 + 0.1, { ...aC(0.42, 0.05), ...SORPRESA, manoD: [-0.14, 0.06, 0.32] }, 0.25],
      [T.extiende[1], { manoI: [0.36, 0.3, 0.46], codoI: [0.9, -0.4, -0.1] }, T.extiende[1] - T.extiende[0]],
      [T.p4 + 0.2, { ...aC(0.42, 0.05), ...CARA.sonrisa }, 0.3],
      [T.p4 + 1.1, { manoI: [0.16, 0.1, 0.34] }, 0.3],
      [T.p5b - 0.3, { ...aC(0.45, 0.04), ...CARA.esperanza }, 0.3],
      [T.l4 + 0.15, { ...CARA.feliz, boca: { sonrisa: 1, abierta: 0.15, ancho: 1.15 } }, 0.2],
    ]);
    bocaVoz(p, t, T.c1, ENV.c1, 0.7); bocaVoz(p, t, T.c2, ENV.c2, 0.7); bocaVoz(p, t, T.c3, ENV.c3, 0.7);
    return p;
  }
  const p = poseEn(t, [
    [0, { ...CARO_S, torso: 0.1, ...aC(0.1, 0.3), ...CARA.sonrisa, ...BRAZOS.celular, manoI: [0.075, 0.25, 0.32], manoD: [-0.075, 0.25, 0.32] }],
    [T.c1b - 0.1, { ...aC(0.05, 0.4), ...CARA.neutra }, 0.3],
    [T.c4 + 0.3, { ...aC(0.35, 0.12), ...BUENA }, 0.3],
    [T.q2, { ...aC(0.4, 0.08), ...CARA.sonrisa }, 0.3],
  ]);
  bocaVoz(p, t, T.c1b, ENV.c1, 0.7); bocaVoz(p, t, T.c4, ENV.c4, 0.7);
  return p;
}
// ---- Carolina en el living (Q3): el celular en la derecha; con la izquierda saca la tarjetita y la guarda en el cajón ----
function poseCarolinaCasa(t) {
  const toca = (a) => Math.sin(Math.PI * sg(t, a - 0.12, a + 0.12));
  const p = poseEn(t, [
    [0, { x: 30.05, y: 0.06, z: -0.58, giro: 0, sentado: 1, inclina: 0.06, ...aC(0, 0.3), ...CARA.esperanza, ...BRAZOS.celular, codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] }],
    [T.pagado + 0.1, { ...CARA.feliz }, 0.2],
    [T.q3b, { ...aC(0.2, 0.2), ...CARA.sonrisa, manoD: [-0.12, 0.08, 0.3], manoI: [0.3, 0.02, 0.18] }, 0.01],
    [T.sacaT[1], { manoI: [0.12, 0.45, 0.4], codoI: [0.8, -0.6, -0.1], ...aC(0.05, 0.12), ...BUENA, cejas: { alto: 0.45, ang: 0.6 } }, T.sacaT[1] - T.sacaT[0]],
    [T.cajon[1], { manoI: [0.44, 0.0, 0.46], codoI: [1, -0.4, -0.1], inclina: 0.3, torso: 0.15, ...aC(0.3, 0.35), ...CARA.sonrisa }, T.cajon[1] - T.cajon[0]],   // (r2) la mano encima del cajón
    [T.cierraCajon[1], { manoI: [0.42, -0.02, 0.44] }, 0.3],
    [T.q4, { inclina: 0.06, manoI: [0.24, 0.05, 0.2] }, 0.3],
    [T.q4, { torso: 0.1, ...aC(0.2, 0.15) }, 0.3],
  ]);
  const k = toca(T.renovar) + toca(T.confirmar);
  if (k > 0) { p.manoD = [p.manoD[0], p.manoD[1] + 0.03 * k, p.manoD[2]]; p.dedoD = k; }
  bocaVoz(p, t, T.c5, ENV.c5, 0.7);
  return p;
}

// =====================================================================================================
// ESTADOS DE LOS OBJETOS
// =====================================================================================================
const _q = new THREE.Quaternion(), _a = new THREE.Vector3(), _b = new THREE.Vector3();
function ponerCuaderno(t) {
  const enMano = t < P2;
  CUADERNO.visible = enMano;
  if (!enMano) { birome.visible = false; return; }
  if (CUADERNO.parent !== lorena.cuerpo) lorena.cuerpo.add(CUADERNO);
  // en las manos de Lorena (el espiral en el medio): inclinado hacia ella y un poco hacia la cámara
  // la página mira a Lorena (arriba y atrás), el borde de arriba hacia adelante; la de Carolina queda a su derecha
  const enP5 = t >= T.p5 && t < T.p6;
  CUADERNO.position.set(0.02, enP5 ? 0.16 : 0.3, enP5 ? 0.32 : 0.36); CUADERNO.rotation.set(enP5 ? 0.6 : 1.05, Math.PI, -0.04); CUADERNO.scale.setScalar(1.25);
  // la tapa: cerrada hasta que hojea, abierta, y se cierra antes de "Tres."
  const abre = eio(sg(t, T.hojea[0], T.hojea[0] + 0.3)), cierra = eio(sg(t, T.cierra[0], T.cierra[1]));
  TAPA.rotation.y = -Math.PI * 0.985 * abre * (1 - cierra);
  // dos hojas que se pasan al hojear
  HOJAS_V.forEach((h, i) => { const u = eio(sg(t, T.hojea[0] + 0.25 + i * 0.12, T.hojea[0] + 0.45 + i * 0.12)); h.visible = u > 0 && u < 1 && cierra === 0; h.rotation.y = -Math.PI * 0.98 * u; });
  // la birome en la mano derecha (la punta hacia la hoja)
  manoMundo(lorena, "D", _a); birome.visible = t < T.p6 && !(t >= T.p5 && t < T.p6) && !(t >= T.p2 && t < T.p3);
  birome.position.copy(_a).add(V3(0, -0.03, 0)); birome.quaternion.copy(lorena.raiz.quaternion); birome.rotateX(-0.6); birome.rotateZ(0.6);
}
function ponerTarjeta(t) {
  TARJETA.visible = false;
  if (t < P2) {
    if (t < T.saca[0] + 0.3) return;
    if (planoActual === "P5" || planoActual === "P5c") return;   // (r2) asomaba recortada en el borde de los primeros planos de Lorena
    // en la mano derecha de Carolina, de frente a Lorena (hacia adelante)
    TARJETA.visible = true; TARJETA.scale.setScalar(1);
    const m = manoMundo(carolina, "I", _a);
    carolina.cuerpo.getWorldQuaternion(_q);
    TARJETA.quaternion.copy(_q); TARJETA.rotateY(0.25); TARJETA.rotateX(-0.15);
    TARJETA.position.copy(m).add(V3(0, 0.105, 0.025).applyQuaternion(_q));   // agarrada del borde de abajo (r2: el puño muerde el borde, no flota debajo)
    return;
  }
  if (t >= T.q3b && t < T.q4) {
    // el living: sale de la cartera, la mira con cariño y la guarda en el cajón
    const guardada = t >= T.guarda[1];
    TARJETA.visible = true; TARJETA.scale.setScalar(0.85);
    // (r1) de la mano entra al cajón abierto (vuela los últimos centímetros, se apoya adentro) y el cajón se cierra con ella
    const m = manoMundo(carolinaCasa, "I", _a); carolinaCasa.cuerpo.getWorldQuaternion(_q);
    TARJETA.quaternion.copy(_q); TARJETA.rotateY(0.25); TARJETA.rotateX(-0.25);
    TARJETA.position.copy(m).add(V3(0, 0.06, 0.02).applyQuaternion(_q));
    const k = eio(sg(t, T.guarda[0], T.guarda[1]));
    if (k > 0) {
      CAJON.updateMatrixWorld(true); const d = CAJON.localToWorld(V3(0.0, -0.045, 0.0));
      TARJETA.position.lerp(d, k);
      const qa = TARJETA.quaternion.clone(), qb = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0.15)); TARJETA.quaternion.slerpQuaternions(qa, qb, k);
    }
    if (guardada) TARJETA.visible = true;
  }
}
function ponerLaser(t) {
  // el giro de P6 (180° sobre las ruedas); en la parte 2 vuelve a como estaba (el costado limpio a cámara)
  const u = t < P2 ? eio(sg(t, T.gira[0], T.gira[1])) : 0;
  LASER.rotation.y = Math.PI / 2 + Math.PI * u;
  LASER.position.set(LZ.x + Math.sin(u * Math.PI) * 0.02, 0, LZ.z);
  POSTIT_CARO.m.visible = t < P2;
  for (const m of POSTITS) m.visible = t < P2;
  // el último post-it viejo ("JIME") en la parte 2, hasta que Vale lo despega
  POSTIT_JIME.m.visible = t >= P2 && t < T.despega[0] + 0.15;
  // el cabezal: en la mano de Vale (P1 a P3) o en su soporte
  LASER.updateMatrixWorld(true);
  const enMano = t < T.p2 || (t >= P2 && false);
  if (enMano) {
    const m = manoMundo(vale, "D", _a); vale.cuerpo.getWorldQuaternion(_q);
    CABEZAL.quaternion.copy(_q); CABEZAL.rotateX(0.5);
    CABEZAL.position.copy(m).add(V3(0, 0.05, 0.02).applyQuaternion(_q));
  } else {
    SOPORTE.updateMatrixWorld(true); CABEZAL.position.copy(SOPORTE.localToWorld(V3(0, 0.1, 0.02))); LASER.getWorldQuaternion(_q); CABEZAL.quaternion.copy(_q); CABEZAL.rotateX(-Math.PI / 2 + 0.25);
  }
  CABEZAL.updateMatrixWorld(true);
  ponerCable(LASER.localToWorld(PORT.clone()), CABEZAL.localToWorld(V3(0, -0.12, 0)), enMano ? 0.35 : 0.25);
  // el tacho: la tapa se abre cuando llega el bollito
  const ab = t >= P2 ? Math.sin(Math.PI * sg(t, T.tira[1] - 0.25, T.tapa + 0.05)) : 0;
  TACHO_TAPA.rotation.x = -1.1 * ab;
  // el post-it de Jimena: de la mano de Vale, se hace un bollito y vuela al tacho
  BOLLITO.visible = false;
  if (t >= P2 && t >= T.despega[0] + 0.15 && t < T.tira[1] + 0.05) {
    const m = manoMundo(vale, "I", _a);   // (r2) con la izquierda
    if (t < T.tira[0]) { BOLLITO.visible = true; BOLLITO.position.copy(m).add(V3(0, 0.04, 0)); BOLLITO.scale.setScalar(lerp(2.2, 1.6, sg(t, T.bollo[0], T.bollo[1]))); }   // (r2) más grande: que se lea
    else { const k = sg(t, T.tira[0], T.tira[1]); TACHO.updateMatrixWorld(true); const d = TACHO.localToWorld(V3(0, 0.3, 0)); BOLLITO.visible = k < 0.98; BOLLITO.position.lerpVectors(m.clone().add(V3(0, 0.04, 0)), d, k); BOLLITO.position.y += Math.sin(k * Math.PI) * 0.3; BOLLITO.rotation.set(k * 6, k * 4, 0); BOLLITO.scale.setScalar(1.6); }
  }
  // el post-it en la mano de Vale mientras lo despega
  if (POSTIT_JIME.m.visible && t >= T.despega[0]) {
    const k = sg(t, T.despega[0], T.despega[0] + 0.15);
    POSTIT_JIME.m.position.copy(POSTIT_JIME.base).add(V3(0.02 * k, 0.01 * k, 0));
  } else if (POSTIT_JIME.base) POSTIT_JIME.m.position.copy(POSTIT_JIME.base);
}
function ponerManos(t) {
  // la tablet de Vale (parte 2) en su mano izquierda; el celular de Carolina en sus manos (Q1) y en el living (Q3)
  TABV.visible = t >= P2 && t < T.q3;
  if (TABV.visible) {
    const m = manoMundo(vale, "I", _a); vale.cuerpo.getWorldQuaternion(_q);
    TABV.quaternion.copy(_q); TABV.rotateX(t >= T.q2 ? -0.35 : -1.0);
    if (t >= T.q2) { const g = eio(sg(t, T.giraTab[0], T.giraTab[1])) * (1 - eio(sg(t, T.q2b - 0.01, T.q2b + 0.2))); TABV.rotateY(-Math.PI * 0.7 * g); }
    TABV.position.copy(m).add(V3(-0.08, 0.13, 0.03).applyQuaternion(_q));   // (r1) agarrada del borde de abajo: el puño no tapa la pantalla
    // (r2) Q2b: la dejó sobre el banquito (se le metía en la panza) y tiene las dos manos libres para el post-it
    if (t >= T.q2b) { TABV.position.set(VALE0.x + 0.02, 0.585, VALE0.z + 0.02); TABV.rotation.set(-Math.PI / 2, 0, 0.5); }
  }
  CELU.visible = false;
  if (t >= P2 && t < T.q2) {
    CELU.visible = t >= T.q1;
    const a = manoMundo(carolina, "I", _a), b = manoMundo(carolina, "D", _b); carolina.cuerpo.getWorldQuaternion(_q);
    CELU.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.07, 0.0).applyQuaternion(_q)); CELU.quaternion.copy(_q); CELU.rotateX(-0.75);
  }
  if (t >= T.q3 && t < T.q4) {
    CELU.visible = true;
    const b = manoMundo(carolinaCasa, "D", _b); carolinaCasa.cuerpo.getWorldQuaternion(_q);
    if (t < T.q3b) { const a = manoMundo(carolinaCasa, "I", _a); CELU.position.copy(a).add(b).multiplyScalar(0.5); } else CELU.position.copy(b);
    CELU.position.add(V3(0, 0.07, 0.0).applyQuaternion(_q)); CELU.quaternion.copy(_q); CELU.rotateX(-0.7);
  }
  // las carteras: sobre la falda de Carolina (camilla) y en el sillón (living)
  CARTERA.visible = t < P2;
  CARTERA.position.copy(camL(0.16, 0.9, 0.34)); CARTERA.rotation.set(0, CAMILLA.rot, 0); CARTERA.rotateX(-1.35);
  CARTERA2.visible = t >= T.q3 && t < T.q4;
  CARTERA2.position.set(30 + 0.62, 0.43, -0.6); CARTERA2.rotation.set(0, -0.3, 0);
  // el cajón
  const ab = eio(sg(t, T.cajon[0], T.cajon[1])) * (1 - eio(sg(t, T.cierraCajon[0], T.cierraCajon[1])));
  CAJON.position.z = 0.2 * ab;   // (r2) sale menos: queda enganchado en la mesita y no llega a la pierna
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const living = planoActual.startsWith("Q3");
  if (living) ponerSol(30, -0.5); else ponerSol(0, -1.2);
  relojG.userData.poner(18.0 + (p2 && t >= T.q2 ? 0.5 : 0) + t / 3600, ((t * 1.0) % 60 + 60) % 60);
  dibujarPantallas(t);
  // ---- personajes ----
  const dbg = window.__dbg || {};
  lorena.raiz.visible = !living && planoActual !== "Q4" && planoActual !== "Q1b";   /* (r3) en Q1b asomaba de perfil al borde */ /* (r1) en el panel asomaba cortada detrás de la tablet */ lorena.poner({ ...poseLorena(t), ...(dbg.lor && t < P2 ? { x: dbg.lor[0], z: dbg.lor[1], giro: dbg.lor[2] } : {}), t });
  vale.raiz.visible = !living && t < T.q3; vale.poner({ ...poseVale(t), t });
  carolina.raiz.visible = !living && t < T.q3; carolina.poner({ ...poseCarolina(t), t });
  carolinaCasa.raiz.visible = living; carolinaCasa.poner({ ...poseCarolinaCasa(t), t });
  TOALLA_P.visible = t < T.q3;
  ponerCuaderno(t); ponerTarjeta(t); ponerLaser(t); ponerManos(t);
  for (const m of LOR_MESHES) m.layers.set(planoActual === "P2" ? 5 : 0);
  CISNES_REC.visible = t >= T.q4 && t < T.c;
  for (const m of VINILO) m.visible = t < T.c;   // en el cierre el vinilo del mostrador quedaba cortado abajo   // en el cierre quedaban como orejas sobre la cabeza de Lorena
  // ---- cámara ----
  if (pl[2] === "cuaderno") { const d = lerp(0.6, 0.52, eo(sg(t, T.p2, T.p3))); camObj(CUADERNO, V3(0.115, 0.06, 0), d, 42, V3(0, 1.0, 0)); }
  else if (pl[2] === "postit") { const d = lerp(0.42, 0.36, eo(sg(t, T.p4b, T.p4c))); camObj(POSTIT_CARO.m, V3(0, 0, 0), d, 40, V3(0, 0, 0)); }
  else if (pl[2] === "tarjeta") { const d = lerp(0.66, 0.58, eo(sg(t, T.p3b, T.p4))); camObj(TARJETA, V3(0, -0.005, 0), d, 40, V3(0, 0.25, 0)); }
  else if (Array.isArray(pl[2])) ponerCam(catmull(pl[2], t), t);
  const INS = { Q1f: INS_F, Q1c: INS_M, Q2i: INS_J, Q3i: INS_R }[planoActual];
  for (const I of INSERTOS) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.035, eo(k)));
    for (const p of TODOS) p.raiz.visible = false;
  }
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);   // depuración (prev.mjs)
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- tarjetas ----
  for (const k in GL) GL[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const sale = (tf) => (t < tf ? 1 : 0);   // (r1) sin fundido semitransparente
    const bL = () => bocaPx(lorena), bC = () => bocaPx(carolina), bV = () => bocaPx(vale);
    const pa = planoActual;
    const habla = (g, t0, f, cx, cy, boca, fin = 1e6, orden = 0) => { if (t >= t0 && t < fin) { const [bx, by] = boca(); ponerGlobo(g, cx, cy, ent(t0) * sale(fin), [bx, by - 40], orden); } };
    if (pa === "P1") { habla(GL.c1, T.c1 - 0.05, "c1", 480, 1560, bC, T.l1 + 0.05); habla(GL.l1, T.l1, "l1", 640, 1560, bL, 1e6, 1); }
    if (pa === "P2") { if (t >= T.rotC) ponerGlobo(GL.rCuad, 820, 1520, ent(T.rotC), null, 1); habla(GL.l2, T.l2, "l2", 540, 300, () => [540, 900]); GL.l2.userData.cola.visible = false; }
    if (pa === "P3") habla(GL.c2, T.c2, "c2", 540, 330, bC);
    if (pa === "P3b") { ponerGlobo(GL.rTarj, 540, 1560, ent(T.rotT), null, 1); }
    if (pa === "P4b") { ponerGlobo(GL.rPost, 540, 1580, ent(T.rotP), null, 1); }
    if (pa === "P4c") {
      // los tres rótulos, cada uno con su línea guía a su papel
      const [ax, ay] = objPx(CUADERNO, V3(CU.w / 2, 0, 0)), [tx, ty] = objPx(TARJETA), [px, py] = objPx(POSTIT_CARO.m);
      const u0 = t >= T.p4 ? 1 : 0, u1 = ent(T.rotP), u2 = ent(T.tres3);
      // (r1) los tres abajo; las guías suben a cada papel sin pasar por ninguna cara
      const g3 = eo(sg(t, T.tres3, T.tres3 + 0.25));
      if (t >= T.tres3) { ponerGlobo(GL.rPost, 200, 1560, u2, null, 1); ponerGuia(GUIAS[2], 200, 1490, px, py, g3); }
      if (t >= T.tres3) { ponerGlobo(GL.rTarj, 540, 1720, u2, null, 1); ponerGuia(GUIAS[1], 540, 1650, tx, ty, g3); }
      if (t >= T.tres3) { ponerGlobo(GL.rCuad, 880, 1560, u2, null, 1); ponerGuia(GUIAS[0], 880, 1490, ax, ay, g3); }
    }
    if (pa === "P5" || pa === "P5c") { habla(GL.l3, T.l3, "l3", 540, 330, bL, T.p5b); habla(GL.l4, T.l4, "l4", 540, 330, bL); if (t >= T.rotProm) { ponerGlobo(GL.rProm, 540, 1330, ent(T.rotProm), null, 1); } if (t >= T.rotPlata) ponerGlobo(GL.rPlata, 540, 1650, ent(T.rotPlata), null, 2); }
    if (pa === "P5b") habla(GL.c3, T.c3, "c3", 540, 330, bC);
    if (pa === "P6") { if (t < T.gira[1]) ponerGlobo(GL.l5, 720, 330, ent(T.l5), [1300, 520]); if (t >= T.rotPost) ponerGlobo(GL.rPost6, 540, 1600, ent(T.rotPost), null, 1); }
    if (pa === "Q1" && t >= T.asistio) { /* el toque se ve en el inserto */ }
    if (pa === "Q1b") habla(GL.c1, T.c1b - 0.05, "c1", 480, 1560, bC);   // la misma burbuja y el mismo lugar que en P1
    if (pa === "Q1c") ponerGlobo(GL.rSola, 540, 230, ent(T.rotSola), null, 1);
    verGlobo(GL.c4, t < T.c4 + 1.18 ? 1 : 2);   // (r2) "Tres." cuando se oye
    if (pa === "Q1d") { ponerGlobo(GL.rSola, 540, 230, 1, null, 1); habla(GL.c4, T.q1d, "c4", 540, 1700, bC); }   // (r3) el rótulo arriba y el globo abajo, como en el inserto
    if (pa === "Q1c" && t >= T.c4) { /* "Ah." arranca sobre el inserto */ ponerGlobo(GL.c4, 540, 1700, ent(T.c4), null, 2); }
    if (pa === "Q1e") habla(GL.l6, T.l6, "l6", 540, 330, bL);
    if (pa === "Q2" && t >= T.l5b) ponerGlobo(GL.l5, 720, 440, ent(T.l5b), [1300, 620]);   // (r2) debajo del chip de la hora
    if (pa === "Q3i") ponerGlobo(GL.rRenov, 540, 200, ent(T.rotRenov), null, 1);
    if (pa === "Q3b") habla(GL.c5, T.c5, "c5", 540, 260, () => bocaPx(carolinaCasa));   // (r2) más arriba: no le pisa el pelo
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
const cab = (p) => { p.raiz.updateMatrixWorld(true); return p.cabeza.localToWorld(V3(0, 0.28, 0)).toArray().map((n) => r2(n)); };
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, cabL: cab(lorena), cabC: cab(carolina), cabV: cab(vale), lor: bocaPx(lorena).map(Math.round), car: bocaPx(carolina).map(Math.round), val: bocaPx(vale).map(Math.round) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
