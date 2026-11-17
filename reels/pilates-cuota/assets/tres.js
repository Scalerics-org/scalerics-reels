// Capa 3D de pilates-cuota (Three.js r170 local). Base técnica: reels/veterinaria-vacunas (globos pegados a la cámara en
// píxeles de pantalla, avatares por render target, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom,
// insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// UN lugar: "Estudio Ceci", planta alta, de mañana: piso de madera clara, pared del fondo navy con listones crema arriba,
// ventanal a la derecha, cinco reformers en fila (el largo a lo largo de z, las poleas hacia la cámara, la barra de pies
// atrás). La recepción al fondo a la izquierda: mostrador, la pizarra de cuotas colgada arriba. La cocina de Alicia (Q1)
// es un set chico aparte (x = 30).
//   PARTE 1: "Ceci, ¿te pagué marzo?" / "Ahora me fijo." · el celular lleno de comprobantes · la pizarra con "?" rojos ·
//            22:40, la laptop que no cierra · Joaco: "¿Y si les mandamos un link de pago?" / "No. Yo no persigo a nadie."
//            (17 mensajes de cobro) · DÍA 11: "¡Ceci! Te transferí el 2. Mirá." · CECILIA · PELUQUERÍA · la pausa ·
//            "¡Con razón me hizo las mechas gratis!" · "Inhalamos." · Flor: "¿me pasás el número de cuenta de nuevo?"
//   PARTE 2: la cuota sola en el celular de Alicia: "¿Ya? ¿Así nomás?" · el panel · Joaco (el mismo audio) / "Ya pagaron
//            39." · la clase: "Ceci, ¿te pagué marzo?" (el mismo audio) / "El 1, a las 7:02." / "Uy. Entonces las mechas
//            las debo." · Flor paga: "Y exhalamos." · Sofi: "Comentá CUOTA…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet, crearVapor, crearMochila } from "./personajes.js";
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


// ---------- luces: la mañana por el ventanal (derecha), el cielo pareja, relleno desde adelante ----------
const sol = new THREE.DirectionalLight(0xfff6e6, 1.4);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0012; sol.shadow.normalBias = 0.02; sol.shadow.radius = 4;   // (r1) sin dientes de sierra
Object.assign(sol.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 20 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xfbf8f0, 0x8a8070, 1.8); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xfff8ee, 0.75); relleno.position.set(1, 3, 9); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xffffff, 0.35); rim.position.set(-3, 5, -8); scene.add(rim);
// la lámpara de recepción (de noche): una luz puntual cálida
const lampara = new THREE.PointLight(0xfff0d0, 0, 3.2, 1.6); scene.add(lampara);
function ponerSol(cx, cz) { sol.position.set(cx + 3.2, 6.0, cz + 2.0); sol.target.position.set(cx, 0.5, cz); sol.target.updateMatrixWorld(); }
Object.assign(sol.shadow.camera, { left: -2.8, right: 2.8, top: 2.8, bottom: -2.8 }); sol.shadow.camera.updateProjectionMatrix();   // (r2) sombra más definida (sin dientes de sierra)
let NOCHE = false;
function noche(on) {
  NOCHE = on;
  cielo.intensity = on ? 0.55 : 1.8; relleno.intensity = on ? 0.18 : 0.75; sol.intensity = on ? 0.0 : 1.4; rim.intensity = on ? 0.15 : 0.35;
  lampara.intensity = on ? 4.2 : 0; scene.environmentIntensity = on ? 0.18 : 0.5;
  VIDRIO.material.color.set(on ? 0x16243d : 0xf3efe2); for (const m of LUZ_PISO) m.visible = !on; CONO.visible = on;
  scene.background.set(on ? 0x0b1220 : 0xe9ece6);
}
// =====================================================================================================
// EL ESTUDIO
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const ZF = -2.65, HW = 3.0, XL = -4.0, XR = 2.95, ZB = 3.6;   // pared del fondo, alto, paredes de los costados, pared de atrás
const MOS = { x: -2.9, z: -1.75, w: 1.5, d: 0.5, alto: 1.0 };        // el mostrador de recepción (el frente mira a +z)
const PIZ = { x: -2.9, y: 1.86, z: ZF + 0.03, w: 1.36, h: 0.9 };      // la pizarra de cuotas
const REF = { L: 1.9, W: 0.62, alto: 0.27 };                             // el reformer
const REF_X = [-2.45, -1.35, -0.25, 0.85, 1.95];                           // los cinco reformers; Alicia en el de la derecha
const REF_Z = (x) => 0.4 + (x - 1.95) * 0.2;   // la fila un poco en diagonal (los de la izquierda más atrás)
M.madera = mat(0xc9a77a, 0.75); M.maderaC = mat(0xd8c3a0, 0.8); M.listones = mat(0xefeee5, 0.85); M.acero = mat(0xb9bec4, 0.45, { metalness: 0.4 });
const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#d8c3a0"; x.fillRect(0, 0, w, h); x.fillStyle = "#cbb38c"; for (let i = 0; i < 4; i++) { x.fillRect(0, i * 128, w, 4); const o = (i % 2) * 256 + 120; x.fillRect(o % w, i * 128, 4, 128); } });
pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(5, 6);
{
  const piso = mesh(new THREE.PlaneGeometry(14, 12), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), -0.3, 0, 1.2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  // la pared del fondo: navy3 abajo, listones verticales crema arriba (sobre navy3), zócalo crema
  const pf = new THREE.Group(); pf.position.z = ZF; SET.add(pf);
  pf.add(caja(XR - XL, HW, 0.2, M.navy3, (XL + XR) / 2, HW / 2, -0.1, 0.01));
  for (let x = XL + 0.1; x < XR - 0.05; x += 0.17) if (!(x > PIZ.x - PIZ.w / 2 - 0.12 && x < PIZ.x + PIZ.w / 2 + 0.12)) pf.add(caja(0.05, HW - 1.45, 0.025, M.listones, x, 1.45 + (HW - 1.45) / 2, 0.012, 0.008));
  pf.add(caja(XR - XL, 0.04, 0.04, M.listones, (XL + XR) / 2, 1.43, 0.02, 0.01));
  pf.add(caja(XR - XL, 0.09, 0.03, M.listones, (XL + XR) / 2, 0.045, 0.015, 0.01));
  // la pared izquierda (navy3) con la barra de madera y el interruptor; la de atrás (detrás de la cámara)
  const pi = new THREE.Group(); pi.position.x = XL; pi.rotation.y = Math.PI / 2; SET.add(pi);
  pi.add(caja(ZB - ZF + 0.4, HW, 0.2, M.navy3, -(ZF + ZB) / 2, HW / 2, -0.1, 0.01));
  pi.add(caja(ZB - ZF, 0.09, 0.03, M.listones, -(ZF + ZB) / 2, 0.045, 0.015, 0.01));
  for (const z of [-1.2, 0.2, 1.6]) pi.add(caja(0.05, 0.08, 0.12, M.navy, -z, 1.1, 0.05, 0.01));
  pi.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 3.2, 14).rotateZ(Math.PI / 2), M.madera, -0.2, 1.1, 0.12));
  pi.add(caja(0.08, 0.12, 0.02, M.cr, -(MOS.z + 0.95), 1.3, 0.01, 0.01));
  const pa = new THREE.Group(); pa.position.z = ZB; pa.rotation.y = Math.PI; SET.add(pa); pa.add(caja(XR - XL, HW, 0.2, M.navy3, -(XL + XR) / 2, HW / 2, -0.1, 0.01));
  // la pared derecha con el ventanal (marco navy, vidrio crema plano)
  const pd = new THREE.Group(); pd.position.x = XR; pd.rotation.y = -Math.PI / 2; SET.add(pd);
  const V0 = -2.25, V1 = 1.35, VY0 = 0.55, VY1 = 2.65;   // en el espacio del grupo, x = z del mundo
  const tramo = (a, b, y0, y1) => pd.add(caja(b - a, y1 - y0, 0.2, M.navy3, (a + b) / 2, (y0 + y1) / 2, -0.1, 0.01));
  tramo(ZF - 0.2, V0, 0, HW); tramo(V1, ZB + 0.2, 0, HW); tramo(V0, V1, 0, VY0); tramo(V0, V1, VY1, HW);
  for (const z of [V0, (V0 + V1) / 2, V1]) pd.add(caja(0.08, VY1 - VY0, 0.1, M.navy, z, (VY0 + VY1) / 2, 0.02, 0.01));
  for (const y of [VY0, 1.75, VY1]) pd.add(caja(V1 - V0 + 0.08, 0.08, 0.1, M.navy, (V0 + V1) / 2, y, 0.02, 0.01));
  const techo = mesh(new THREE.PlaneGeometry(14, 12), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), -0.3, HW, 1.2); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
  // las macetas crema con plantas low-poly (verde apagado) junto al ventanal
  semilla = 9;
  for (const [x, z, k] of []) {   // (r1) sin plantas: el bulto facetado detrás del cuello de Ceci
    const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(k); SET.add(g);
    g.add(mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.36, 18), M.cr, 0, 0.18, 0));
    for (let i = 0; i < 9; i++) { const a = i * 2.4, r = 0.06 + az() * 0.12; g.add(mesh(new THREE.IcosahedronGeometry(0.11 + az() * 0.06, 0), mat(i % 3 ? 0x3fa60a : 0x2f7d08, 0.8), Math.cos(a) * r, 0.5 + az() * 0.45, Math.sin(a) * r)); }
  }
  // el estante con colchonetas enrolladas (verde apagado y navy), pelotitas crema y el aro mágico colgado
  const es = new THREE.Group(); es.position.set(0.95, 0, ZF + 0.2); SET.add(es);
  for (const y of [0.55, 1.05]) es.add(caja(1.5, 0.035, 0.36, M.maderaC, 0, y, 0, 0.01));
  for (const sx of [-0.73, 0.73]) es.add(caja(0.035, 1.07, 0.36, M.maderaC, sx, 0.535, 0, 0.01));
  for (let i = 0; i < 6; i++) { const c = mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.32, 20).rotateX(Math.PI / 2), i % 2 ? M.navy2 : M.gd, -0.6 + i * 0.16, 0.65, 0); es.add(c); }
  for (let i = 0; i < 4; i++) es.add(mesh(new THREE.SphereGeometry(0.1, 20, 14), M.cr, -0.45 + i * 0.3, 1.17, 0));
  const aro = mesh(new THREE.TorusGeometry(0.19, 0.022, 10, 36), M.navy2, 0.95, 1.95, 0.03); SET.add(aro); aro.position.set(0.15, 1.75, ZF + 0.05); aro.visible = false;   // (r2) sin aro: asomaba cortado en el borde
  // ---- la recepción: mostrador (tapa de madera clara, frente crema con canto verde) ----
  const mo = new THREE.Group(); mo.position.set(MOS.x, 0, MOS.z); SET.add(mo);
  mo.add(caja(MOS.w + 0.08, 0.05, MOS.d + 0.08, M.maderaC, 0, MOS.alto - 0.025, 0, 0.012));
  mo.add(caja(MOS.w, MOS.alto - 0.05, MOS.d, M.cr, 0, (MOS.alto - 0.05) / 2, 0, 0.012));
  mo.add(caja(MOS.w - 0.1, 0.05, 0.02, M.g, 0, MOS.alto - 0.2, MOS.d / 2 + 0.005, 0.01));
  mo.add(caja(MOS.w, 0.08, MOS.d - 0.02, M.navy3, 0, 0.04, 0.0, 0.01));
  // la pizarra: el marco navy (la superficie es una malla aparte con textura que cambia)
  const pz = new THREE.Group(); pz.position.set(PIZ.x, PIZ.y, PIZ.z); SET.add(pz);
  for (const s of [-1, 1]) { pz.add(caja(PIZ.w + 0.1, 0.05, 0.04, M.navy, 0, s * (PIZ.h / 2 + 0.025), 0.02, 0.01)); pz.add(caja(0.05, PIZ.h + 0.1, 0.04, M.navy, s * (PIZ.w / 2 + 0.025), 0, 0.02, 0.01)); }
  pz.add(caja(0.5, 0.03, 0.06, M.navy, 0.3, -PIZ.h / 2 - 0.06, 0.04, 0.01));
}
// el vidrio del ventanal (de día crema, de noche navy) y la luz de la mañana en el piso (paños crema planos)
const VIDRIO = mesh(new THREE.PlaneGeometry(3.6, 2.1), new THREE.MeshBasicMaterial({ color: 0xf3efe2 }), XR + 0.03, 1.6, -0.45); VIDRIO.rotation.y = -Math.PI / 2; VIDRIO.castShadow = false; scene.add(VIDRIO);
const LUZ_PISO = [[XR - 0.75, -1.35], [XR - 0.75, 0.45]].map(([x, z]) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.55), new THREE.MeshBasicMaterial({ color: 0xe7d8b8, transparent: true, opacity: 0.85 })); m.rotation.x = -Math.PI / 2; m.rotation.z = 0.0; m.position.set(x, 0.003, z); scene.add(m); return m; });
fusionar(SET);
// =====================================================================================================
// EL REFORMER: marco de madera clara en patitas, rieles navy, carro acolchado crema que corre (con apoyacabezas y dos
// apoyahombros), barra de pies navy en U atrás (-z), resortes de acero con topes verdes entre el carro y la barra, dos
// postes con poleas adelante (+z) y las correas navy con asas verdes. Origen: centro del marco en el piso.
// =====================================================================================================
const CARRO = { L: 0.78, y: 0.33, z0: -0.12 };   // carro: largo, alto del centro, z del centro en reposo (local)
const POLEA = { x: 0.35, y: 0.66, z: REF.L / 2 - 0.06 };   // (r2) postes por fuera del marco: la correa pasa por fuera del cuerpo
const resorteGeo = (() => {   // un resorte de largo 1 (a lo largo de z): cilindro fino + anillos
  const g = []; const base = new THREE.CylinderGeometry(0.011, 0.011, 1, 10).rotateX(Math.PI / 2); g.push(base);
  for (let i = 0; i <= 12; i++) { const a = new THREE.TorusGeometry(0.016, 0.0045, 6, 14); a.translate(0, 0, -0.5 + i / 12); g.push(a); }
  let n = 0; for (const x of g) n += (x.index ? x.toNonIndexed() : x).attributes.position.count;
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3); let k = 0;
  for (let x of g) { x = x.index ? x.toNonIndexed() : x; pos.set(x.attributes.position.array, k * 3); nor.set(x.attributes.normal.array, k * 3); k += x.attributes.position.count; }
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3)); return geo;
})();
const CORREA_M = mat(0x16243d, 0.7);
function crearReformer() {
  const g = new THREE.Group(), fijo = new THREE.Group(); g.add(fijo);
  const { L, W } = REF;
  // el marco: dos largueros de madera, travesaños en las puntas, patitas navy
  for (const s of [-1, 1]) fijo.add(caja(0.075, 0.13, L, M.madera, s * (W / 2 - 0.0375), 0.17, 0, 0.02));
  for (const s of [-1, 1]) fijo.add(caja(W, 0.13, 0.075, M.madera, 0, 0.17, s * (L / 2 - 0.0375), 0.02));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) fijo.add(caja(0.08, 0.11, 0.08, M.navy, sx * (W / 2 - 0.05), 0.055, sz * (L / 2 - 0.06), 0.015));
  // los rieles navy por dentro de los largueros
  for (const s of [-1, 1]) fijo.add(caja(0.035, 0.025, L - 0.16, M.navy2, s * 0.215, 0.248, 0, 0.008));
  // la barra de pies (U navy3, atrás) y su travesaño acolchado
  const zb = -L / 2 + 0.1;
  for (const s of [-1, 1]) { const p = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 12), M.navy3, s * (W / 2 - 0.03), 0.43, zb); p.rotation.x = 0.28; fijo.add(p); }
  fijo.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, W - 0.02, 16).rotateZ(Math.PI / 2), M.navy3, 0, 0.63, zb - 0.06));
  // la barra de los resortes (donde se enganchan) y los postes con poleas adelante
  fijo.add(caja(W - 0.16, 0.04, 0.04, M.acero, 0, 0.27, -L / 2 + 0.2, 0.01));
  for (const s of [-1, 1]) {
    fijo.add(caja(0.045, POLEA.y - 0.2, 0.045, M.navy3, s * POLEA.x, 0.2 + (POLEA.y - 0.2) / 2, POLEA.z, 0.01)); fijo.add(caja(0.09, 0.04, 0.05, M.navy3, s * (POLEA.x - 0.04), 0.22, POLEA.z, 0.01));
    const po = mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.025, 18).rotateZ(Math.PI / 2), M.acero, s * POLEA.x, POLEA.y + 0.01, POLEA.z); fijo.add(po);
  }
  // el carro (se mueve en z): base navy, acolchado crema, apoyacabezas y apoyahombros
  const carro = new THREE.Group(); carro.position.set(0, 0, CARRO.z0); g.add(carro);
  carro.add(caja(0.5, 0.03, CARRO.L, M.navy2, 0, 0.275, 0, 0.01));
  carro.add(caja(0.5, 0.06, CARRO.L, M.cr, 0, 0.32, 0, 0.025));
  carro.add(caja(0.26, 0.035, 0.16, M.cr2, 0, 0.36, CARRO.L / 2 - 0.1, 0.015));
  for (const s of [-1, 1]) carro.add(mesh(new THREE.CylinderGeometry(0.035, 0.038, 0.07, 16), M.navy2, s * 0.22, 0.385, CARRO.L / 2 - 0.05));   // (r1) más bajos y navy: no son cajas blancas en el regazo
  // los resortes (de la barra al borde de atrás del carro): se estiran con el carro
  const resortes = [-0.12, -0.04, 0.04, 0.12].map((x) => { const r = new THREE.Mesh(resorteGeo, M.acero); r.castShadow = true; g.add(r); r.position.x = x; r.position.y = 0.27; return r; });
  const topes = resortes.map((r) => { const t = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.04, 12).rotateX(Math.PI / 2), M.g, r.position.x, 0.27, -L / 2 + 0.235); g.add(t); return t; });
  // las correas: de la polea a la mano (dos tramos rectos) y el asa verde
  const correas = [-1, 1].map((s) => { const c = mesh(new THREE.CylinderGeometry(1, 1, 1, 6).translate(0, 0.5, 0), CORREA_M); c.castShadow = false; scene.add(c); const asa = mesh(new THREE.TorusGeometry(0.035, 0.011, 8, 18), M.g); scene.add(asa); return { s, c, asa }; });
  sombras(fijo);
  g.userData = { carro, resortes, topes, correas, fijo };
  scene.add(g);
  return g;
}
// pone el carro (dz: cuánto se corrió hacia las poleas) y estira los resortes
function ponerCarro(r, dz) {
  const { carro, resortes } = r.userData;
  carro.position.z = CARRO.z0 + dz;
  const z0 = -REF.L / 2 + 0.25, z1 = carro.position.z - CARRO.L / 2;
  for (const s of resortes) { s.position.z = (z0 + z1) / 2; s.scale.set(1, 1, Math.max(0.02, z1 - z0)); }
}
const _cA = new THREE.Vector3(), _cB = new THREE.Vector3(), _ejeY = new THREE.Vector3(0, 1, 0);
function entre(m, a, b, rad) { const d = _cB.copy(b).sub(a); const L = Math.max(1e-4, d.length()); m.position.copy(a); m.quaternion.setFromUnitVectors(_ejeY, d.normalize()); m.scale.set(rad, L, rad); }
// las correas de la polea a las manos (manos en el mundo); visibles o no
function ponerCorreas(r, manos, on = true) {
  r.updateMatrixWorld(true);
  for (const { s, c, asa } of r.userData.correas) {
    c.visible = asa.visible = on && !!manos; if (!c.visible) continue;
    const p = r.localToWorld(_cA.set(s * POLEA.x, POLEA.y, POLEA.z - 0.03));
    const m = manos[0].distanceTo(p) < manos[1].distanceTo(p) ? manos[0] : manos[1];   // (r2) la mano del mismo lado
    const ma = _cB.copy(p).sub(m).normalize().multiplyScalar(0.06).add(m);   // (r1) el asa asoma delante del puño
    entre(c, p, ma.clone(), 0.0085);
    asa.position.copy(ma); asa.lookAt(p); asa.rotateY(Math.PI / 2); asa.scale.setScalar(1.25);
  }
}
const REFS = REF_X.map((x) => { const r = crearReformer(); r.position.set(x, 0, REF_Z(x)); r.rotation.y = Math.PI; ponerCarro(r, 0); return r; });   // (r2) dado vuelta: las poleas detrás de la alumna, la barra de pies hacia cámara
// el taburete alto de recepción (P3: Ceci de noche)
const TABURETE = new THREE.Group();
{ TABURETE.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.05, 22), M.navy3, 0, 0.7, 0)); TABURETE.add(mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.68, 10), M.acero, 0, 0.35, 0)); TABURETE.add(mesh(new THREE.TorusGeometry(0.15, 0.012, 8, 24).rotateX(Math.PI / 2), M.acero, 0, 0.28, 0)); TABURETE.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.025, 22), M.acero, 0, 0.012, 0)); scene.add(sombras(TABURETE)); }
TABURETE.position.set(MOS.x + 0.1, 0, MOS.z - 0.5);
// la lámpara de escritorio navy (cono de luz crema plano de noche) y la planilla impresa con resaltador
const LAMP = new THREE.Group(); LAMP.userData.portada = 1; LAMP.position.set(MOS.x - 0.62, MOS.alto, MOS.z - 0.12); scene.add(LAMP);
{ LAMP.add(mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.025, 20), M.navy, 0, 0.012, 0)); const b1 = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.36, 8), M.navy, 0.05, 0.19, 0); b1.rotation.z = -0.3; LAMP.add(b1); const b2 = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.26, 8), M.navy, 0.18, 0.4, 0); b2.rotation.z = -1.25; LAMP.add(b2);
  const pan = mesh(new THREE.ConeGeometry(0.085, 0.12, 20, 1, true), mat(C.navy, 0.5, { side: THREE.DoubleSide }), 0.3, 0.42, 0); pan.rotation.z = 0.5; LAMP.add(pan); sombras(LAMP); }
const CONO = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.62, 28, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1cc, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }));
CONO.position.set(LAMP.position.x + 0.42, MOS.alto + 0.12, LAMP.position.z); CONO.castShadow = false; scene.add(CONO); CONO.visible = false;
lampara.position.set(LAMP.position.x + 0.32, MOS.alto + 0.36, LAMP.position.z + 0.1);
const planillaT = lienzo(420, 560, (x, w, h) => { x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, w, h); x.strokeStyle = "#b4b2a3"; x.lineWidth = 3; for (let y = 60; y < h; y += 34) { x.beginPath(); x.moveTo(20, y); x.lineTo(w - 20, y); x.stroke(); } x.fillStyle = "rgba(92,230,17,0.55)"; for (const y of [94, 162, 230, 332, 400]) x.fillRect(20, y - 26, w - 40, 22); x.fillStyle = "#16243d"; x.font = F(800, 30); x.fillText("Cuotas · marzo", 22, 40); });
const PLANILLA = plano(0.21, 0.28, planillaT, MOS.x + 0.12, MOS.alto + 0.003, MOS.z + 0.08); PLANILLA.rotation.x = -Math.PI / 2; PLANILLA.rotation.z = 0.25; scene.add(PLANILLA);
// la taza
const TAZA = new THREE.Group(); { TAZA.add(mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.09, 18), M.cr, 0, 0.045, 0)); TAZA.add(mesh(new THREE.TorusGeometry(0.022, 0.007, 6, 12), M.cr, 0.045, 0.05, 0)); scene.add(sombras(TAZA)); }
TAZA.position.set(MOS.x - 0.3, MOS.alto, MOS.z + 0.12);
// =====================================================================================================
// LA PIZARRA DE CUOTAS · LA LAPTOP · EL CHAT DE CECI · EL COMPROBANTE · LA CUOTA · EL PANEL
// =====================================================================================================
const NOMBRES = ["Alicia", "Flor", "Gabi", "Marce", "Lucía", "Sole", "Pato", "Vicky", "Ana", "Caro", "Mili", "Laura", "Pao", "Romi", "Silvia", "Bea", "Nati", "Cris", "Moni", "Elena", "Susi", "Tere", "Rosa", "Mabel"];
const MARCAS = ["?", "?", "?", "✓", "✓", "✓", "?", "✓", "✓", "?", "✓", "✓", "?", "✓", "✓", "?", "✓", "?", "✓", "✓", "?", "✓", "✓", "?"];
const ORDEN_Q = MARCAS.map((m, i) => (m === "?" ? i : -1)).filter((i) => i >= 0);   // en qué orden aparecen los "?"
const chulo = (x, cx, cy, s, color, lw) => { x.strokeStyle = color; x.lineWidth = lw; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// nQ: cuántos "?" se ven; pop: escala del último (0..1); horarios: la pizarra borrada de la parte 2
function dibujarPizarra(x, W, H, nQ, pop = 1, horarios = false) {
  x.fillStyle = "#f7f6ef"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#e9e7dc"; for (let i = 0; i < 5; i++) x.fillRect(80 + i * 260, 0, 120, H);   // borrones viejos, planos
  x.textBaseline = "middle";
  if (horarios) {
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 86); x.fillText("HORARIOS", W / 2 + 60, 140);   // (r2) más chico y adentro: el borde del cuadro no lo corta
    x.fillStyle = "#5ce611"; x.fillRect(W / 2 + 60 - 230, 196, 460, 12);
    x.fillStyle = "#16243d"; x.font = CAV(100); x.fillText("Lun · Mié · Vie", W / 2 + 60, 320); x.fillText("8:00 · 19:00", W / 2 + 60, 440);
    x.font = CAV(84); x.fillText("Mar · Jue  9:00", W / 2 + 60, 570);
    return;
  }
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 84); x.fillText("CUOTAS", 46, 82); x.fillStyle = "#16243d"; x.font = F(800, 42); x.fillText("MARZO", 50, 176);
  x.fillStyle = "#5ce611"; x.fillRect(46, 132, 330, 12);
  { x.fillStyle = "#16243d"; x.font = F(800, 42); x.textAlign = "center"; x.fillText("MARZO", 46 + 640 + 340, 176); }   // (r2) la columna de la izquierda sin encabezado: el chip no lo tapa
  x.strokeStyle = "#16243d"; x.lineWidth = 4; x.beginPath(); x.moveTo(W / 2 + 6, 40); x.lineTo(W / 2 + 6, H - 30); x.stroke();
  const visQ = new Set(ORDEN_Q.slice(0, nQ));
  NOMBRES.forEach((n, i) => {
    const c = Math.floor(i / 12), r = i % 12, x0 = 46 + c * 640, y = 236 + r * 52;
    x.fillStyle = "#16243d"; x.textAlign = "left"; x.font = CAV(54); x.fillText(n, x0, y);
    x.strokeStyle = "#c9c6b6"; x.lineWidth = 2; x.beginPath(); x.moveTo(x0, y + 24); x.lineTo(x0 + 420, y + 24); x.stroke();
    const mx = x0 + 340;
    if (MARCAS[i] === "✓") chulo(x, mx, y, 40, "#16243d", 8);
    else if (visQ.has(i)) {
      const s = ORDEN_Q.indexOf(i) === nQ - 1 ? 0.4 + 0.6 * pop : 1;
      x.save(); x.translate(mx, y); x.scale(s, s); x.fillStyle = "#c7655b"; x.textAlign = "center"; x.font = `700 84px "Caveat", cursive`; x.fillText("?", 0, 4); x.restore();
    }
  });
}
const pizT = lienzo(1300, 860, (x, w, h) => dibujarPizarra(x, w, h, 0));
const PIZARRA = new THREE.Mesh(new THREE.PlaneGeometry(PIZ.w, PIZ.h), new THREE.MeshStandardMaterial({ map: pizT, roughness: 0.6, emissive: 0xffffff, emissiveMap: pizT, emissiveIntensity: 0.12 }));
PIZARRA.position.set(PIZ.x, PIZ.y, PIZ.z + 0.012); PIZARRA.receiveShadow = true; scene.add(PIZARRA);
let cPiz = "";
function ponerPizarra(t) {
  let nQ = 2, pop = 1;
  if (t >= T.p2b - 0.02) { const k = T.marcas.filter((m) => t >= m).length; nQ = 2 + k * 3; const last = T.marcas.filter((m) => t >= m).at(-1); pop = last !== undefined ? bk(sg(t, last, last + 0.16)) : 1; }
  if (t >= T.p3) { nQ = ORDEN_Q.length; pop = 1; }
  const hor = t >= P2;
  nQ = Math.min(nQ, ORDEN_Q.length);
  const k = `${hor}-${nQ}-${Math.round(pop * 10)}`; if (k === cPiz) return; cPiz = k;
  dibujarPizarra(pizT.userData.x, 1300, 860, nQ, pop, hor); pizT.needsUpdate = true;
}
// ---- la laptop (P3): base crema, tapa navy, pantalla con el home banking genérico ----
const bancoT = lienzo(900, 580, (x, W, H) => {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 96);
  x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(44, 62); x.lineTo(70, 34); x.lineTo(96, 62); x.closePath(); x.fill(); x.fillRect(52, 60, 36, 24);
  x.font = F(800, 46); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("Movimientos · marzo", 120, 52);
  const fil = ["Transferencia recibida", "Transferencia recibida", "Transferencia recibida", "Transferencia recibida", "Transferencia recibida"];
  fil.forEach((f, i) => { const y = 150 + i * 86; x.fillStyle = i % 2 ? "#ffffff" : "#f6f4ea"; x.fillRect(20, y - 38, W - 40, 76); x.fillStyle = "#16243d"; x.font = F(700, 38); x.fillText(f, 40, y); x.textAlign = "right"; x.font = F(800, 40); x.fillText("$ 3.000", W - 40, y); x.textAlign = "left"; });
});
const LAPTOP = new THREE.Group();
{ LAPTOP.add(caja(0.36, 0.018, 0.25, M.cr2, 0, 0.009, 0, 0.008)); LAPTOP.add(caja(0.31, 0.003, 0.12, mat(0xc9c6b6, 0.7), 0, 0.019, -0.03, 0.002));
  const tapa = new THREE.Group(); tapa.position.set(0, 0.018, -0.12); tapa.rotation.x = -0.32; LAPTOP.add(tapa);
  tapa.add(caja(0.36, 0.24, 0.012, M.navy2, 0, 0.12, -0.006, 0.008));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.33, 0.212), new THREE.MeshBasicMaterial({ map: bancoT, toneMapped: false })); p.position.set(0, 0.12, 0.001); tapa.add(p);
  scene.add(sombras(LAPTOP)); }
LAPTOP.position.set(MOS.x + 0.12, MOS.alto, MOS.z - 0.05); LAPTOP.rotation.y = Math.PI - 0.15;   // la pantalla mira a Ceci (detrás del mostrador)
// ---- el chat de Ceci (P2): comprobantes en fotos y mensajes que caen cada vez más rápido ----
const CHAT = [
  { de: "Sole", foto: "torcida" }, { de: "Caro", txt: "Te pago el viernes" }, { de: "Lucía", foto: "pantalla" },
  { de: "Pato", txt: "¿Me pasás el número de cuenta?" }, { de: "Gabi", foto: "cortada" }, { de: "Flor", txt: "Ceci, ¿esto llegó?" }, { de: "Romi", foto: "torcida2" },
];
function dibujarRecibo(x, w, h, tipo) {
  // un comprobante de transferencia genérico (crema, casita navy), fotografiado mal
  x.save();
  if (tipo === "pantalla") { x.fillStyle = "#0b1220"; x.fillRect(-10, -10, w + 20, h + 20); x.translate(26, 22); w -= 52; h -= 44; }
  x.fillStyle = "#fbfaf4"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 64);
  x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(24, 42); x.lineTo(42, 22); x.lineTo(60, 42); x.closePath(); x.fill(); x.fillRect(29, 40, 26, 16);
  x.fillStyle = "#16243d"; x.font = F(800, 34); x.textBaseline = "middle"; x.textAlign = "left"; x.fillText("Transferencia", 24, 110);
  if (tipo !== "cortada") { x.font = F(900, 56); x.fillText("$ 3.000", 24, 180); }
  x.fillStyle = "#b4b2a3"; for (let i = 0; i < 3; i++) x.fillRect(24, 230 + i * 34, w - 60 - i * 40, 14);
  if (tipo === "pantalla") { x.fillStyle = "rgba(255,255,255,0.55)"; x.beginPath(); x.moveTo(w * 0.55, 0); x.lineTo(w * 0.8, 0); x.lineTo(w * 0.35, h); x.lineTo(w * 0.1, h); x.closePath(); x.fill(); }
  x.restore();
}
function dibujarChatCeci(x, W, H, n, pop = 1) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  // los mensajes de arriba hacia abajo; si no entran, el chat sube (el último queda abajo)
  const alto = (m) => (m.foto ? 440 : 190) * (W / 860);
  let tot = 0; for (let i = 0; i < n; i++) tot += alto(CHAT[i]) + 18;
  let y = 160 + Math.min(0, H - 30 - 160 - tot);
  for (let i = 0; i < n; i++) {
    const m = CHAT[i], k = W / 860, s = i === n - 1 ? 0.6 + 0.4 * pop : 1;
    const bh = alto(m), bw = (m.foto ? 600 : 760) * k;
    if (y + bh > 120) {
      x.save(); x.translate(30 * k, y); x.translate(0, bh / 2); x.scale(s, s); x.translate(0, -bh / 2);
      x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(0, 0, bw, bh - 10, [10, 30, 30, 30]); x.fill(); x.stroke();
      x.fillStyle = "#16243d"; x.font = F(900, 42 * k); x.textAlign = "left"; x.fillText(m.de, 26 * k, 40 * k);
      if (m.txt) { x.fillStyle = "#0b1220"; ajustar(x, m.txt, 800, 58 * k, bw - 52 * k); x.fillText(m.txt, 26 * k, 118 * k); }
      else { x.save(); x.translate(26 * k, 74 * k); const fw = bw - 52 * k, fh = bh - 100 * k; x.beginPath(); x.rect(0, 0, fw, fh); x.clip(); x.fillStyle = "#3a3f4a"; x.fillRect(0, 0, fw, fh);
        const rot = m.foto === "torcida" ? 0.26 : m.foto === "torcida2" ? -0.2 : m.foto === "cortada" ? 0.05 : 0.0;
        x.translate(fw / 2, fh / 2); x.rotate(rot); x.translate(-fw * 0.42, -fh * (m.foto === "cortada" ? 0.25 : 0.55)); dibujarRecibo(x, fw * 0.84, fh * 1.1, m.foto); x.restore(); }
      x.restore();
    }
    y += bh + 18;
  }
  // el encabezado: "Alumnas · marzo" y los sin leer
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130 * W / 860); x.fillStyle = "#5ce611"; x.fillRect(0, 130 * W / 860, W, 10);
  x.fillStyle = "#efeee5"; x.font = F(800, 58 * W / 860); x.textAlign = "left"; x.fillText("Alumnas · marzo", 40 * W / 860, 68 * W / 860);
  x.fillStyle = "#c7655b"; const nb = String(n * 3 + 2); x.font = F(900, 46 * W / 860); const bw2 = x.measureText(nb).width + 40; rr(x, W - 40 - bw2, 40 * W / 860, bw2, 56 * W / 860, 28 * W / 860); x.fillStyle = "#ffffff"; x.textAlign = "center"; x.fillText(nb, W - 40 - bw2 / 2, 70 * W / 860);
}
// ---- el comprobante de Alicia (P4): Transferencia realizada · $ 3.000 · 2 de marzo · CECILIA · PELUQUERÍA ----
function dibujarComprobante(x, W, H, sub) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "center";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 170);
  x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(W / 2 - 46, 100); x.lineTo(W / 2, 54); x.lineTo(W / 2 + 46, 100); x.closePath(); x.fill(); x.fillRect(W / 2 - 34, 96, 68, 42);
  x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(W / 2, 290, 74, 0, 7); x.fill(); chulo(x, W / 2 + 4, 292, 74, "#0b1220", 16);
  x.fillStyle = "#0b1220"; x.font = F(800, 62); x.fillText("Transferencia realizada", W / 2, 430);
  x.font = F(900, 150); x.fillText("$ 3.000", W / 2, 590);
  x.fillStyle = "#16243d"; x.font = F(700, 54); x.fillText("2 de marzo", W / 2, 720);
  // (r1) el destinatario es lo más grande después del monto: dos renglones, PELUQUERÍA subrayada en rojo desde que entra
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 780, W - 60, 440, 30); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.font = F(700, 52); x.fillText("Destinatario:", W / 2, 850);
  x.fillStyle = "#0b1220"; x.font = F(900, 100); x.fillText("CECILIA ·", W / 2, 960);
  ajustar(x, "PELUQUERÍA", 900, 112, W - 110); x.fillText("PELUQUERÍA", W / 2, 1090);
  if (sub > 0) { const pw = x.measureText("PELUQUERÍA").width; x.fillStyle = "#c7655b"; x.fillRect(W / 2 - pw / 2, 1150, pw * sub, 18); }
}
// ---- la cuota en el celular de Alicia (Q1): f = 0 llegó, 1 toca Pagar, 2 Confirmar, 3 Pagado ----
function dibujarCuota(x, W, H, f) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 160); x.fillStyle = "#5ce611"; x.fillRect(0, 160, W, 10);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(88, 80, 52, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 50); x.textAlign = "center"; x.fillText("EC", 88, 83);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 58); x.fillText("Estudio Ceci", 162, 66); x.font = F(700, 44); x.fillText("cuotas", 164, 122);
  // el mensaje con la cuota
  const by = 196;   // (r2) más grande: textos ≥ 46 px y sin zonas lisas
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, by, W - 48, 430, [10, 34, 34, 34]); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.font = F(700, 46); x.fillText("1 de marzo · 7:00", 60, by + 58);
  x.fillStyle = "#0b1220"; x.font = F(800, 70); x.fillText("Hola, Alicia.", 60, by + 146);
  x.font = F(700, 62); x.fillText("Tu cuota de marzo:", 60, by + 240); x.font = F(900, 124); x.fillText("$ 3.000", 60, by + 356);
  const yb = by + 466;
  if (f <= 1) {
    x.fillStyle = f === 1 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(30, yb, W - 60, 190, 95); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Pagar con tarjeta", 900, 68, W - 140); x.fillText("Pagar con tarjeta", W / 2, yb + 68); ajustar(x, "o débito", 900, 68, W - 140); x.fillText("o débito", W / 2, yb + 136);
    if (f === 1) { x.fillStyle = "rgba(11,18,32,0.22)"; x.beginPath(); x.arc(W - 150, yb + 95, 56, 0, 7); x.fill(); }
    x.fillStyle = "#16243d"; x.textAlign = "center"; ajustar(x, "o dejalo en débito automático", 700, 48, W - 60); x.fillText("o dejalo en débito automático", W / 2, yb + 262);
  } else if (f === 2) {
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, yb, W - 48, 410, 40); x.fill();
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 54); x.fillText("Estudio Ceci", W / 2, yb + 66); x.font = F(900, 116); x.fillText("$ 3.000", W / 2, yb + 180);
    x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(60, yb + 262, W - 120, 132, 66); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 72); x.fillText("Confirmar", W / 2, yb + 330);
  } else {
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, yb, W - 48, 280, 40); x.fill();
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(122, yb + 140, 70, 0, 7); x.fill(); chulo(x, 126, yb + 142, 72, "#0b1220", 16);
    x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(900, 84); x.fillText("Pagado", 222, yb + 96); x.fillStyle = "#5ce611"; ajustar(x, "a Estudio Ceci", 800, 64, W - 260); x.fillText("a Estudio Ceci", 222, yb + 190);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, yb + 310, W - 60, 120, 30); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.font = F(700, 50); x.fillText("Débito automático", 70, yb + 372); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(W - 100, yb + 370, 38, 0, 7); x.fill(); chulo(x, W - 98, yb + 372, 38, "#0b1220", 9);
  }
}
// ---- el panel de cuotas (Q2, inserto): e = { pagaron, dia, rec, filas, cobrado, comp, gabi } ----
const FILAS = [["Alicia", "día 1 · 7:02"], ["Lucía", "día 1 · 8:15"], ["Marce", "día 2"], ["Sole", "día 3"]];
function dibujarPanel(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 62); x.fillText("Cuotas de marzo", 34, 68);
  x.fillStyle = "#5ce611"; x.font = F(900, 46); x.textAlign = "right"; x.fillText(`DÍA ${e.dia}`, W - 34, 70);
  // el contador grande con la barra
  x.fillStyle = "#16243d"; rr(x, 30, 166, W - 60, 200, 30);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 54); x.fillText("Pagaron", 64, 220);
  x.fillStyle = "#5ce611"; x.textAlign = "right"; x.font = F(900, 96); x.fillText(`${e.pagaron} de 40${e.pagaron >= 40 ? " ✓" : ""}`, W - 60, 230);
  x.fillStyle = "#2c4268"; rr(x, 64, 300, W - 128, 34, 17); x.fillStyle = "#5ce611"; rr(x, 64, 300, Math.max(34, (W - 128) * e.pagaron / 40), 34, 17);
  // los tildes que se prenden
  FILAS.forEach(([n, h], i) => {
    const y = 392 + i * 88, ok = i < e.filas;
    x.fillStyle = ok ? "#cfeebc" : "#ffffff"; x.strokeStyle = ok ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 60, 76, 18); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 52); x.fillText(n, 66, y + 40);
    if (ok) { x.fillStyle = "#16243d"; x.textAlign = "right"; x.font = F(800, 46); x.fillText(h, W - 120, y + 40); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(W - 74, y + 38, 25, 0, 7); x.fill(); chulo(x, W - 73, y + 39, 25, "#0b1220", 7); }
  });
  let y = 750;
  if (e.rec) { x.fillStyle = "#16243d"; rr(x, 30, y, W - 60, 92, 46); x.fillStyle = "#efeee5"; x.textAlign = "center"; ajustar(x, "DÍA 5 · Recordatorio automático a 6 ✓", 800, 46, W - 110); x.fillText("DÍA 5 · Recordatorio automático a 6 ✓", W / 2, y + 48); }
  y += 112;
  if (e.cobrado) {
    const w2 = (W - 80) / 2;
    x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, y, w2, 170, 26); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(800, 44); x.fillText("Cobrado", 30 + w2 / 2, y + 46); ajustar(x, plata(e.cobrado), 900, 74, w2 - 30); x.fillText(plata(e.cobrado), 30 + w2 / 2, y + 120);
    x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(50 + w2, y, w2, 170, 26); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; ajustar(x, "Comprobantes", 800, 44, w2 - 30); x.fillText("Comprobantes", 50 + w2 * 1.5, y + 40); ajustar(x, "para revisar", 800, 40, w2 - 30); x.fillText("para revisar", 50 + w2 * 1.5, y + 84); x.fillStyle = "#3fa60a"; x.font = F(900, 64); x.fillText(String(e.comp), 50 + w2 * 1.5, y + 136);
  }
  y += 196;
  if (e.gabi) {
    x.fillStyle = "#16243d"; x.textAlign = "left"; x.font = F(800, 44); x.fillText("Asistencia", 40, y + 26);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y + 60, W - 60, 190, 26); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 58); x.fillText("Gabi", 66, y + 112); x.fillStyle = "#c7655b"; x.font = F(800, 50); x.fillText("3 semanas sin venir", 230, y + 114);
    x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(84, y + 192, 24, 0, 7); x.fill(); chulo(x, 85, y + 193, 24, "#0b1220", 7);
    x.fillStyle = "#16243d"; ajustar(x, "Aviso enviado · vuelve el jueves", 800, 50, W - 170); x.fillText("Aviso enviado · vuelve el jueves", 124, y + 194);
  }
}
function estadoPanel(t) {
  if (t < T.q2) return { pagaron: 0, dia: 1, rec: false, filas: 0, cobrado: 0, comp: 0, gabi: false };
  const u = sg(t, T.cuenta[0], T.cuenta[1]), u2 = sg(t, T.rec + 0.1, T.rec + 0.5);
  const pagaron = t >= T.flor ? 40 : Math.round(34 * eo(u)) + Math.round(5 * eo(u2));
  const dia = t >= T.rec ? 5 : 1 + Math.min(3, Math.floor(u * 4));
  return { pagaron, dia, rec: t >= T.rec, filas: Math.min(4, Math.floor(u * 6)), cobrado: t >= T.rec + 0.5 ? pagaron * 3000 : 0, comp: 0, gabi: t >= T.gabi };
}
// ---- el panel del cierre (Q5, la tablet del atril): tres números grandes ----
function dibujarPanelCierre(x, W, H, n) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "center";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 150); x.fillStyle = "#5ce611"; x.fillRect(0, 150, W, 12);
  x.fillStyle = "#efeee5"; x.font = F(800, 76); x.fillText("Cuotas de marzo", W / 2, 80);
  const fila = (y, a, b, fondo, tinta) => { x.fillStyle = fondo; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(36, y, W - 72, 300, 34); x.fill(); x.stroke(); x.fillStyle = tinta; x.font = F(800, 70); x.fillText(a, W / 2, y + 82); ajustar(x, b, 900, 140, W - 140); x.fillText(b, W / 2, y + 200); };
  fila(200, "Pagaron", `${n} de 40${n >= 40 ? " ✓" : ""}`, "#16243d", "#5ce611");
  fila(530, "Cobrado", plata(n * 3000), "#5ce611", "#0b1220");
  fila(860, "Cobros a mano", "0", "#ffffff", "#0b1220");
}
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
// (r4) REGLA DE BURBUJAS (todas): la burbuja va arriba del que habla, con su borde de abajo ~100 px sobre la coronilla
// (≥ 40 px de aire) y la cola termina en el pelo, nunca en la cara. Si no entra (o el que habla queda cortado por el
// borde), se anota en AVISOS (prev.mjs lo imprime): ahí hay que abrir la cámara de ese plano.
const AVISOS = [];
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
const ceci = crearPersonaje({ ...ELENCO.ceci, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p5 + 0.5), r2(T.q2b + 0.3), r2(T.q3 + 0.4)] });
const alicia = crearPersonaje({ ...ELENCO.alicia, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p5 + 0.7), r2(T.q3 + 0.9)] });
const joaco = crearPersonaje({ ...ELENCO.joaco, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.2)] });
// las alumnas de la clase (sin voz), en los otros cuatro reformers
const ALUMNAS = [
  { ...DEFECTO, nombre: "Uno", piel: PIEL.media, pelo: PELO.castaño, peinado: "coleta", cejasColor: 0x4a3222, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xa8484f, camisa: MARCA.gd, mangas: "largas", cuelloBotones: false, cuelloFino: true, pantalon: MARCA.navy, zapatos: MARCA.cr, nariz: 0.048, alto: 0.96 },
  { ...DEFECTO, nombre: "Dos", piel: PIEL.clara, pelo: PELO.canoso, peinado: "corto", cejasColor: 0xb9b6b0, cejaFina: true, labiosPegados: true, labios: 0xb5555a, camisa: 0xb9cde0, mangas: "largas", cuelloBotones: false, cuelloFino: true, pantalon: MARCA.navy2, zapatos: MARCA.cr, nariz: 0.05, alto: 0.94 },
  { ...DEFECTO, nombre: "Tres", piel: PIEL.morena, pelo: PELO.negro, peinado: "mediaCola", cejasColor: 0x1e1a18, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0x8e3f3c, camisa: MARCA.cr, mangas: "largas", cuelloBotones: false, cuelloFino: true, pantalon: MARCA.navy, zapatos: MARCA.cr, nariz: 0.047, alto: 0.97 },
  { ...DEFECTO, nombre: "Cuatro", piel: PIEL.trigueña, pelo: 0x6b4429, peinado: "melena", cejasColor: 0x4a3222, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xa8484f, camisa: MARCA.navy3, mangas: "largas", cuelloBotones: false, cuelloFino: true, pantalon: MARCA.navy2, zapatos: MARCA.cr, nariz: 0.049, alto: 0.95 },
].map((c) => crearPersonaje({ ...c, parpadeoCada: 999 }));
const TODOS = [ceci, alicia, joaco, ...ALUMNAS];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// la mochila de Joaco al hombro (P3) y la botella de agua (Q2b); la toalla verde de Alicia (P4-P6)
const MOCHILA = (() => { const m = crearMochila(MARCA.navy2, MARCA.g); m.traverse((o) => { if (o.isMesh && o.geometry.type === "TorusGeometry") o.visible = false; }); m.position.set(0.25, 0.22, -0.12); m.rotation.set(0.1, 1.1, -0.12); m.scale.setScalar(0.85); joaco.cuerpo.add(m); m.add(mesh(rbox(0.035, 0.36, 0.02, 0.008), mat(MARCA.g, 0.5), -0.04, 0.3, 0.06)); return m; })();   // (r1) colgada de un hombro, a la vista, con la correa pegada
const BOTELLA = new THREE.Group(); { BOTELLA.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.2, 16), M.cr, 0, 0.1, 0)); BOTELLA.add(mesh(new THREE.CylinderGeometry(0.022, 0.03, 0.04, 14), M.g, 0, 0.22, 0)); scene.add(sombras(BOTELLA)); }
const TOALLA = new THREE.Group();
{ const tm = mat(MARCA.gd, 0.95); const a = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.13, 20, 1, true, -Math.PI / 2, Math.PI).rotateZ(Math.PI / 2), mat(MARCA.gd, 0.95, { side: THREE.DoubleSide }), 0, -0.07, 0); TOALLA.add(a); const b = caja(0.13, 0.13, 0.012, tm, 0, -0.135, 0.11, 0.005); b.rotation.x = 0.12; TOALLA.add(b); const c2 = caja(0.13, 0.16, 0.012, tm, 0, -0.15, -0.11, 0.005); c2.rotation.x = -0.12; TOALLA.add(c2); }   // (r1) doblada sobre el hombro, fina
TOALLA.position.set(-0.17, 0.53, 0.0); alicia.cuerpo.add(TOALLA);
// la tablilla de la clase de Ceci (P1/Q3)
const tablillaT = lienzo(256, 340, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.font = F(800, 30); x.fillText("CLASE 8:00", 22, 48); x.fillStyle = "#b4b2a3"; for (let i = 0; i < 6; i++) x.fillRect(22, 90 + i * 40, w - 60 - (i % 2) * 40, 10); });
const TABLILLA = new THREE.Group(); { TABLILLA.add(caja(0.17, 0.23, 0.008, M.navy3, 0, 0, 0, 0.006)); TABLILLA.add(plano(0.15, 0.2, tablillaT, 0, -0.008, 0.0045)); TABLILLA.add(caja(0.07, 0.02, 0.012, M.g, 0, 0.11, 0.005, 0.004)); scene.add(sombras(TABLILLA)); }
// los celulares en mano: Ceci (funda navy2, pantalla del chat) y Alicia (funda verde apagado, comprobante / cuota)
const celCeciT = lienzo(420, 860, () => {});
const CEL_CECI = crearCelular(celCeciT, MARCA.navy2, 0.08, 0.162); CEL_CECI.scale.setScalar(1.15); scene.add(CEL_CECI);
const celAliT = lienzo(420, 860, () => {});
const CEL_ALI = crearCelular(celAliT, MARCA.gd, 0.08, 0.162); CEL_ALI.scale.setScalar(1.15); scene.add(CEL_ALI);
// la taza de Alicia (Q1)
const TAZA_A = new THREE.Group(); { TAZA_A.add(mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.1, 18), M.navy2, 0, 0.05, 0)); TAZA_A.add(mesh(new THREE.TorusGeometry(0.026, 0.008, 6, 12), M.navy2, 0.05, 0.055, 0)); const caf = mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.005, 18), mat(0x3a2418, 0.4), 0, 0.093, 0); TAZA_A.add(caf); scene.add(sombras(TAZA_A)); }
const VAPOR = crearVapor(9); scene.add(VAPOR);

// =====================================================================================================
// LA COCINA DE ALICIA (Q1, set chico aparte en x = 30): pared crema, ventana de mañana, mesada con frente navy3
// =====================================================================================================
const COC = new THREE.Group(); COC.position.set(30, 0, 0); scene.add(COC);
{
  const p = mesh(new THREE.PlaneGeometry(8, 6), mat(0xcfc7b2, 0.85), 0, 0, 0.5); p.rotation.x = -Math.PI / 2; COC.add(p);
  COC.add(mesh(new THREE.BoxGeometry(8, 3.2, 0.2), mat(0xe6e1cf, 0.9), 0, 1.6, -1.2));
  COC.add(caja(1.3, 1.0, 0.08, M.navy3, -0.15, 1.75, -1.08, 0.03)); COC.add(caja(1.16, 0.86, 0.06, mat(0xf3efe2, 0.4), -0.15, 1.75, -1.05, 0.02)); COC.add(caja(0.05, 0.86, 0.07, M.navy3, -0.15, 1.75, -1.04, 0.01));
  COC.add(caja(2.6, 0.06, 0.62, M.cr, 0, 0.92, -0.78, 0.015)); COC.add(caja(2.56, 0.88, 0.56, M.navy3, 0, 0.45, -0.8, 0.015));
  // la frutera (navy) con manzanas verdes y un limón crema
  const fr = new THREE.Group(); fr.position.set(0.62, 0.95, -0.85); COC.add(fr); fr.add(mesh(new THREE.CylinderGeometry(0.16, 0.1, 0.07, 24), M.navy2, 0, 0.035, 0));
  for (const [x, z, c] of [[-0.06, 0.02, M.g], [0.06, -0.02, M.gd], [0.0, -0.07, M.g], [0.02, 0.07, M.cr2]]) fr.add(mesh(new THREE.SphereGeometry(0.06, 16, 12), c, x, 0.1, z));
  sombras(COC);
}
fusionar(COC);

// =====================================================================================================
// INSERTOS PEGADOS A LA CÁMARA (el estudio de fondo en planos de color)
// =====================================================================================================
function crearFondoInserto(g, cocina = false) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: cocina ? 0xe6e1cf : 0x1f3254 })); bg.position.z = -0.06; g.add(bg);
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1100 / PXK), new THREE.MeshBasicMaterial({ color: cocina ? 0x1f3254 : 0xd8c3a0 })); pc.position.set(0, -700 / PXK, -0.058); g.add(pc);
  if (!cocina) for (let i = 0; i < 7; i++) { const l = new THREE.Mesh(new THREE.PlaneGeometry(36 / PXK, 900 / PXK), new THREE.MeshBasicMaterial({ color: 0xefeee5 })); l.position.set((-600 + i * 200) / PXK, 750 / PXK, -0.059); g.add(l); }
  else { const m = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 60 / PXK), new THREE.MeshBasicMaterial({ color: 0xefeee5 })); m.position.set(0, -150 / PXK, -0.057); g.add(m); }
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
const INSC = { g: new THREE.Group() }; crearFondoInserto(INSC.g);              // P2: el chat de Ceci
const CELC = crearCelInserto(860, 1420, 540, 1010, 34, { camara: true, funda: 0x16243d }); INSC.g.add(CELC.g);
const INSA = { g: new THREE.Group() }; crearFondoInserto(INSA.g);              // P4i: el comprobante de Alicia
const CELA = crearCelInserto(860, 1260, 540, 1050, 34, { camara: true, funda: 0x3fa60a }); INSA.g.add(CELA.g);
const INSQ = { g: new THREE.Group() }; crearFondoInserto(INSQ.g, true);        // Q1i: la cuota en el celular de Alicia
const CELQ = crearCelInserto(880, 1150, 540, 1010, 34, { camara: true, funda: 0x3fa60a }); INSQ.g.add(CELQ.g);   // (r1) más grande: sin franja vacía abajo
const INSP = { g: new THREE.Group() }; crearFondoInserto(INSP.g);              // Q2: el panel en la tablet
const TABP = crearCelInserto(950, 1300, 540, 1080, 18); INSP.g.add(TABP.g);
for (const I of [INSC, INSA, INSQ, INSP]) { pegarACamara(I.g, camera, 10); I.g.visible = false; }
let cCC = "", cCA = "", cCQ = "", cTP = "", cT3 = "", cCel = "", cAli = "";
function dibujarInterfaz(t) {
  const n = T.chat.filter((m) => t >= m).length, last = T.chat.filter((m) => t >= m).at(-1), pop = last !== undefined ? Math.round(bk(sg(t, last, last + 0.14)) * 8) / 8 : 1;
  const kC = `${n}-${pop}`; if (kC !== cCC) { cCC = kC; dibujarChatCeci(CELC.tex.userData.x, CELC.IW, CELC.IH, Math.max(1, n), pop); CELC.tex.needsUpdate = true; }
  const sub = Math.round(eo(sg(t, T.subraya, T.subraya + 0.3)) * 10) / 10;
  if (`${sub}` !== cCA) { cCA = `${sub}`; dibujarComprobante(CELA.tex.userData.x, CELA.IW, CELA.IH, sub); CELA.tex.needsUpdate = true; }
  const f = t >= T.pagado ? 3 : t >= T.confirma ? 2 : t >= T.toca ? 1 : 0;
  if (`${f}` !== cCQ) { cCQ = `${f}`; dibujarCuota(CELQ.tex.userData.x, CELQ.IW, CELQ.IH, f); CELQ.tex.needsUpdate = true; }
  const eP = estadoPanel(t), kP = JSON.stringify(eP);
  if (kP !== cTP) { cTP = kP; dibujarPanel(TABP.tex.userData.x, TABP.IW, TABP.IH, eP); TABP.tex.needsUpdate = true; }
  const n3 = t >= T.flor ? 40 : 39; if (`${n3}` !== cT3) { cT3 = `${n3}`; dibujarPanelCierre(pantT.userData.x, 1000, 1240, n3); pantT.needsUpdate = true; }
  // la pantalla chica de los celulares en mano
  const kc = t < P2 ? "chat" : "panel"; if (kc !== cCel) { cCel = kc; const x = celCeciT.userData.x; if (kc === "chat") dibujarChatCeci(x, 420, 860, 4, 1); else { x.save(); x.translate(420, 0); x.rotate(Math.PI / 2); x.scale(860 / 1000, 420 / 1240); dibujarPanelCierre(x, 1000, 1240, 39); x.restore(); } celCeciT.needsUpdate = true; }   // (r2) en la tablet de Ceci, el panel (39 de 40)
  const ka = t < P2 ? "comp" : t >= T.pagado ? "pagado" : "cuota"; if (ka !== cAli) { cAli = ka; const x = celAliT.userData.x; x.save(); x.scale(420 / 880, 860 / (ka === "comp" ? 1260 : 1150)); if (ka === "comp") dibujarComprobante(x, 880, 1260, 1); else dibujarCuota(x, 880, 1150, ka === "pagado" ? 3 : 0); x.restore(); celAliT.needsUpdate = true; }   // (r2) en Q1b el celular muestra "Pagado ✓"
}
// la tablet en su atril sobre el mostrador (parte 2) y el celular parado de la videollamada
const pantT = lienzo(1000, 1240, () => {});
const tablet = crearTablet(pantT, 0.3, 0.37, 0.3); tablet.position.set(MOS.x + 0.2, MOS.alto + 0.06, MOS.z - 0.02); tablet.rotation.y = 0.0; tablet.scale.setScalar(1.25); scene.add(tablet);
// ---- Sofi en videollamada: una escena aparte que se renderiza a una textura cada cuadro (Q5) ----
const sofi = crearPersonaje({ ...ELENCO.sofi, camisa: 0x2c4268, franja: null, cuello: MARCA.cr, cuelloBotones: false, cuelloFino: true, auricularFino: true, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
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
const celuS = new THREE.Group(); celuS.position.set(MOS.x + 0.5, MOS.alto, MOS.z + 0.0); celuS.rotation.y = -0.05; scene.add(celuS);
{
  const S = 2.35, W = 0.08 * S, H = 0.165 * S;
  const piv = new THREE.Group(); piv.position.y = 0.035; piv.rotation.x = -0.12; celuS.add(piv);
  piv.add(mesh(rbox(W + 0.008, H + 0.008, 0.014, 0.014), mat(C.navy, 0.4), 0, H / 2, 0));
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: SOFI.rt.texture, toneMapped: false })); pan.position.set(0, H / 2, 0.0076); piv.add(pan);
  celuS.add(caja(0.21, 0.02, 0.14, M.g, 0, 0.01, 0.0, 0.008)); celuS.add(caja(0.17, 0.09, 0.02, M.g, 0, 0.05, -0.065, 0.006));
  sombras(celuS);
}
// =====================================================================================================
// LAS TARJETAS DE ESTE REEL
// =====================================================================================================
const chip = (txt, px = 62, fondo = "#5ce611", tinta = "#0b1220") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo }); };
// "Pagaron 23 de 40" (el 23 en rojo apagado)
const chipPagaron = crearTarjeta(580, 116, (x, w, h) => { x.textBaseline = "middle"; x.textAlign = "left"; x.font = F(800, 54); x.fillStyle = "#efeee5"; const a = "Pagaron ", b = "23", c = " de 40"; const wa = x.measureText(a).width; x.font = F(900, 80); const wb = x.measureText(b).width; x.font = F(800, 54); const wc = x.measureText(c).width; let xx = (w - wa - wb - wc) / 2; x.fillText(a, xx, h / 2 + 3); xx += wa; x.font = F(900, 80); x.fillStyle = "#ff8f84"; x.fillText(b, xx, h / 2 + 3); xx += wb; x.font = F(800, 54); x.fillStyle = "#efeee5"; x.fillText(c, xx, h / 2 + 3); }, { fondo: "#16243d", borde: C.cr });
// la notificación del celular (Flor en P7; el pago de Flor en Q4)
function crearNoti(nombre, lineas, px = 54, verde = false) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const W = Math.round(Math.max(...lineas.map((l) => med.measureText(l).width)) + px * 1.4 + 20), H = Math.round(lineas.length * px * 1.25 + px * 1.9);
  return crearTarjeta(W, H, (x, w, h) => {
    x.textBaseline = "middle"; x.textAlign = "left";
    x.fillStyle = verde ? "#3fa60a" : "#16243d"; rr(x, px * 0.5, px * 0.38, px * 0.9, px * 0.9, px * 0.45);
    x.fillStyle = "#efeee5"; x.font = F(900, px * 0.5); x.textAlign = "center"; x.fillText(verde ? "✓" : nombre[0], px * 0.95, px * 0.85);
    x.textAlign = "left"; x.fillStyle = "#3f5270"; x.font = F(800, px * 0.72); x.fillText(nombre, px * 1.65, px * 0.86);
    x.fillStyle = "#0b1220"; x.font = F(800, px); lineas.forEach((l, i) => x.fillText(l, px * 0.6, px * 1.75 + i * px * 1.25 + px * 0.25));
  });
}
// la cascada de "Hola, ¿pudiste ver lo de la cuota?" con el contador (P3b)
function dibujarEnvios(x, W, H, n) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 100); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 46); x.fillText("Enviados:", 28, 52);
  x.fillStyle = "#c7655b"; x.font = F(900, 66); x.textAlign = "right"; x.fillText(String(n), W - 28, 54);
  const vis = Math.min(n, 3);   // (r1) tres burbujas: el contador "Enviados" siempre a la vista
  for (let i = 0; i < vis; i++) { const y = H - 30 - (i + 1) * 132; x.fillStyle = "#cfeebc"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(24, y, W - 48, 116, [30, 30, 8, 30]); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, "Hola, ¿pudiste ver", 800, 40, W - 100); x.fillText("Hola, ¿pudiste ver", 46, y + 38); x.fillText("lo de la cuota?", 46, y + 82); }   // (r1) el texto entra en la tarjeta
}
const GL = {
  dia10: chip("DÍA 10 · 8:00", 56, "#16243d", "#efeee5"),
  a1: crearGlobo(["Ceci, ¿te pagué [marzo?]"], 66),
  c1: crearGlobo(["Ahora me [fijo.]"], 72),
  pagaron: chipPagaron,
  noche: chip("DÍA 10 · 22:40", 56, "#16243d", "#efeee5"),
  noCierra: crearRotulo([["No cierra", "#ff9d92", 70]], 60),
  banco: crearTarjeta(620, 400, (x, W, H) => { x.drawImage(bancoT.userData.c, 0, 0, W, H); }),
  j1: crearGlobo(["¿Y si les mandamos", "un link de [pago?]"], 64),
  c2: crearGlobo(["No. Yo no", "persigo a [nadie.]"], 72),
  envios: crearTarjeta(440, 560, (x, W, H) => dibujarEnvios(x, W, H, 1)),
  dia11: chip("DÍA 11", 60, "#16243d", "#efeee5"),
  a2: crearGlobo(["¡Ceci! Te transferí el", "2 de marzo. [¡Mirá!]"], 64),
  r1: crearRotulo([["17 cuotas sin cobrar"], ["$ 51.000", "#ff9d92", 90]], 60),
  r3: crearRotulo([["Pagado a", "#ff9d92"], ["la peluquera", "#ff9d92"]], 60),
  a3: crearGlobo(["¡Con razón me hizo", "las mechas [gratis!]"], 66),
  c3: crearGlobo(["[Inhalamos.]"], 86),
  florMsg: crearNoti("Flor", ["Ceci, ¿me pasás el", "número de cuenta", "de nuevo?"], 58),
  dia1: chip("DÍA 1 · 7:00", 58, "#16243d", "#efeee5"),
  rCobra: crearRotulo([["Le llega sola el día 1"]], 56),
  a4: crearGlobo(["¿Ya? ¿Así [nomás?]"], 74),
  rPanel: crearRotulo([["Cuotas y asistencia en un panel"]], 48),
  c4: crearGlobo(["Sale sola, el [día 1.]"], 74),
  c5: crearGlobo(["El 1, a las [7:02.]"], 74),
  noti: crearNoti("Pago recibido", ["Flor · $ 3.000"], 62, true),
  p40: chip("Pagaron: 40 de 40 ✓", 56),
  c6: crearGlobo(["Y [exhalamos.]"], 80),
};
let envN = -1;
function ponerEnvios(t, cx, cy, s) { const n = Math.max(1, Math.round(17 * sg(t, T.envios[0], T.envios[1]))); if (n !== envN) { envN = n; redibujar(GL.envios, (x, W, H) => dibujarEnvios(x, W, H, n)); } ponerGlobo(GL.envios, cx, cy, s, null, 1); }
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// =====================================================================================================
// LUGARES
// =====================================================================================================
const REF_A = REFS[4];                                         // el reformer de Alicia
const CECI_CLASE = { x: 2.55, z: -0.55 };                      // Ceci de pie a la derecha del reformer de Alicia (junto al ventanal)
const CECI_MOS = { x: MOS.x + 0.1, z: MOS.z - 0.52 };          // Ceci detrás del mostrador
const ALI_MOS = { x: MOS.x + 1.05, z: MOS.z + 0.38 };           // Alicia frente al mostrador (P4-P6)
const JOACO_N = { x: MOS.x + 0.75, z: MOS.z + 1.45 };          // Joaco de noche (P3j), del lado de la sala
const JOACO_D = { x: MOS.x + 0.95, z: MOS.z - 0.42 };           // Joaco de día (Q2b), con la botella
const ALI_COC = { x: 30.05, z: -0.22 };                        // Alicia en su cocina (Q1)
// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves | especial]; cada clave [t, px, py, pz, mx, my, mz, fov]
// =====================================================================================================
const P1C = (k) => [2.45, lerp(1.62, 1.6, k), lerp(3.45, 3.25, k), 1.98, 1.3, -0.45, lerp(50, 49, k)];
const PLANOS = [
  ["P1", 0, [[0, ...P1C(0)], [T.p2, ...P1C(1)]]],
  ["P2", T.p2, null],
  ["P2b", T.p2b, [[T.p2b, PIZ.x - 0.3, PIZ.y - 0.1, ZF + 1.25, PIZ.x - 0.42, PIZ.y - 0.03, ZF, 44], [T.p3, PIZ.x - 0.31, PIZ.y - 0.1, ZF + 1.13, PIZ.x - 0.42, PIZ.y - 0.03, ZF, 43]]],
  ["P3", T.p3, [[T.p3, -1.3, 1.45, 0.65, -2.55, 1.12, -2.0, 50], [T.p3j, -1.35, 1.44, 0.5, -2.55, 1.12, -2.0, 49]]],
  // P3j: Joaco del lado de la sala, con la sala a oscuras detrás
  ["P3j", T.p3j, [[T.p3j, MOS.x + 1.15, 1.6, MOS.z - 0.6, JOACO_N.x, 1.42, JOACO_N.z, 50], [T.p3b, MOS.x + 1.15, 1.59, MOS.z - 0.5, JOACO_N.x, 1.42, JOACO_N.z, 49]]],
  ["P3b", T.p3b, [[T.p3b, -2.15, 1.7, 0.85, -2.55, 1.32, -2.27, 48], [T.p4, -2.16, 1.7, 0.75, -2.55, 1.32, -2.27, 47]]],   // (r2) desde más arriba: abajo la tapa del mostrador (laptop, planilla, taza), no el frente liso   // (r1) Ceci a la izquierda: el panel de envíos no le tapa la cara
  ["P4", T.p4, [[T.p4, -1.1, 1.45, 1.45, -2.3, 1.2, -1.7, 48], [T.p4i, -1.15, 1.45, 1.3, -2.3, 1.2, -1.7, 47]]],
  ["P4i", T.p4i, null],
  ["P5", T.p5, [[T.p5, -1.9, 1.62, 1.85, -2.45, 1.4, -2.05, 52], [T.p6, -1.92, 1.61, 1.75, -2.45, 1.4, -2.05, 51]]],
  ["P6", T.p6, [[T.p6, -1.45, 1.45, 0.75, -1.85, 1.5, -1.25, 50], [T.p6b, -1.46, 1.45, 0.65, -1.85, 1.5, -1.25, 49]]],
  ["P6b", T.p6b, [[T.p6b, -2.55, 1.55, -0.2, -2.8, 1.6, -2.27, 47], [P1, -2.56, 1.55, -0.35, -2.8, 1.6, -2.27, 46]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ALI_COC.x + 0.3, 1.45, 2.55, ALI_COC.x + 0.12, 1.22, ALI_COC.z - 0.3, 48], [T.q1i, ALI_COC.x + 0.28, 1.44, 2.35, ALI_COC.x + 0.12, 1.22, ALI_COC.z - 0.3, 47]]],
  ["Q1i", T.q1i, null],
  ["Q1b", T.q1b, [[T.q1b, ALI_COC.x + 0.42, 1.45, 2.0, ALI_COC.x + 0.05, 1.35, ALI_COC.z, 44], [T.q2, ALI_COC.x + 0.4, 1.44, 1.88, ALI_COC.x + 0.05, 1.35, ALI_COC.z, 43]]],
  ["Q2", T.q2, null],
  ["Q2b", T.q2b, [[T.q2b, MOS.x + 0.42, 1.68, MOS.z + 2.35, MOS.x + 0.52, 1.5, MOS.z - 0.3, 50], [T.q3, MOS.x + 0.43, 1.67, MOS.z + 2.25, MOS.x + 0.52, 1.5, MOS.z - 0.3, 49]]],
  // (r2) Q2c: push-in a Ceci con la tablet a la vista en "Sale sola, el día uno."
  ["Q2c", r2(T.c4 - 0.1), [[r2(T.c4 - 0.1), MOS.x + 0.22, 1.55, MOS.z + 1.45, CECI_MOS.x + 0.05, 1.42, CECI_MOS.z, 44], [T.q3, MOS.x + 0.2, 1.55, MOS.z + 1.3, CECI_MOS.x + 0.05, 1.42, CECI_MOS.z, 43]]],
  ["Q3", T.q3, [[T.q3, ...P1C(0)], [T.q4, ...P1C(1)]]],
  // (r1) Q3b: contraplano a Ceci en "El 1, a las 7:02." (Q3 duraba 6,2 s en un plano)
  ["Q3b", T.q3b, [[T.q3b, 2.62, 1.55, 1.75, CECI_CLASE.x - 0.12, 1.45, CECI_CLASE.z, 44], [T.q4, 2.62, 1.55, 1.62, CECI_CLASE.x - 0.12, 1.45, CECI_CLASE.z, 43]]],
  ["Q4", T.q4, [[T.q4, 2.72, 1.5, 2.0, CECI_CLASE.x - 0.1, 1.42, CECI_CLASE.z, 48], [T.q5, 2.72, 1.5, 1.85, CECI_CLASE.x - 0.1, 1.42, CECI_CLASE.z, 47]]],
  ["Q5", T.q5, [[T.q5, MOS.x + 0.32, 1.82, MOS.z + 1.52, MOS.x + 0.32, 1.13, MOS.z - 0.02, 42], [DUR, MOS.x + 0.32, 1.8, MOS.z + 1.47, MOS.x + 0.32, 1.13, MOS.z - 0.02, 41.5]]   /* (r2) desde más arriba: abajo se ve la tapa del mostrador con la planilla y la taza, no el frente liso */],
];
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
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const toW = (per, local) => { per.raiz.updateMatrixWorld(true); return per.cuerpo.localToWorld(V3(...local)); };
function manoA(per, p, lado, w, k, codo = null) { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "I" ? "manoI" : "manoD"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(cl(k)))); if (codo) p[lado === "I" ? "codoI" : "codoD"] = codo; }
const cabezaW = (per, local = [0, 0.25, 0]) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(...local)); };
// =====================================================================================================
// POSES
// =====================================================================================================
// remo sentado en el carro (mira a las poleas, +z): u = 0 brazos adelante, 1 manos a la cadera (el carro se corre)
const remoU = (t, off = 0, per = 2.2) => 0.5 - 0.5 * Math.cos(2 * Math.PI * (t / per + off));
function poseRemo(per, ref, t, u, extra = {}) {
  const dz = 0.1 * u; ponerCarro(ref, dz);
  const al = per.cfg.alto ?? 1;
  const p = {
    x: ref.position.x, y: 0.415 - per.CADERA * al, z: ref.position.z - (CARRO.z0 + dz - 0.2), giro: 0, sentado: 1, piernasRectas: 1, inclina: lerp(0.04, -0.03, u),
    ...aC(0, 0.05), ...CARA.neutra,
    // (r2) "abrazar el árbol": las manos se juntan adelante y se abren a los costados; las correas van a las poleas de atrás
    manoI: [lerp(0.27, 0.5, u), lerp(0.38, 0.36, u), lerp(0.46, 0.08, u)], manoD: [-lerp(0.27, 0.5, u), lerp(0.38, 0.36, u), lerp(0.46, 0.08, u)],
    codoI: [1, -0.2, -0.3], codoD: [-1, -0.2, -0.3], dedoI: 0, dedoD: 0, t,
  };
  return { ...p, ...extra };
}
// cuánto rema cada una: la clase rema hasta "Y exhalamos." (ahí bajan los brazos todas juntas)
const brazosAbajo = (t) => (t >= T.q4 ? sg(t, T.c6 + 0.1, T.c6 + 0.6) : 0);
function ponerClase(t) {
  ALUMNAS.forEach((a, i) => {
    if (i === 3) { ponerCarro(REFS[i], 0); ponerCorreas(REFS[i], null); return; }
    const ref = REFS[i], u = remoU(t, i * 0.17), b = brazosAbajo(t);
    const p = poseRemo(a, ref, t, u * (1 - b), { ...aC(0.05 * Math.sin(i), 0.05), ...CARA.neutra, ojos: { abiertos: 0.95, y: -0.2 } });
    if (b > 0) { p.manoI = p.manoI.map((v, k) => lerp(v, [0.26, -0.02, 0.12][k], b)); p.manoD = p.manoD.map((v, k) => lerp(v, [-0.26, -0.02, 0.12][k], b)); p.boca.sonrisa = lerp(p.boca.sonrisa, 0.6, b); }
    a.poner(p);
    ponerCorreas(ref, b > 0.9 ? null : [manoMundo(a, "I", new THREE.Vector3()), manoMundo(a, "D", new THREE.Vector3())]);
  });
}
function poseAlicia(t) {
  const p2 = t >= P2, pa = planoActual;
  if (pa === "P1" || pa === "Q3" || pa === "Q3b" || pa === "Q4") {
    // en el carro, remando; P1 / Q3: "Ceci, ¿te pagué marzo?"; Q3: se toca el pelo y "Uy. Entonces las mechas las debo."
    const ta = p2 ? T.a1b : T.a1;
    const quieta = 0;
    const u = remoU(t, 0.55, 2.4) * (1 - quieta) * (1 - brazosAbajo(t));
    const p = poseRemo(alicia, REF_A, t, u);
    const c = poseEn(t, [
      [0, { ...aC(-0.25, 0.0), ...BUENA }],
      [ta + 0.1, { ...aC(-0.38, -0.05, 0.08), ...BUENA, cejas: { alto: 0.4, ang: 0.2 } }, 0.25],
      [ta + LEN.a1 + 0.3, { ...aC(-0.3, 0.02), ...CARA.sonrisa }, 0.3],
      ...(p2 ? [[T.c5 + 0.4, { ...aC(-0.35, 0.05, 0.1), ...CARA.sorpresa, boca: { sonrisa: 0.3, abierta: 0.1, ancho: 0.8 }, cejas: { alto: 0.7, ang: 0.3 } }, 0.25]] : []),
    ]);
    Object.assign(p, { cabeza: c.cabeza, ojos: c.ojos, cejas: c.cejas, boca: c.boca });
    p.t = t; bocaVoz(p, t, ta, ENV.a1, 0.6);
    return p;
  }
  if (!p2) {
    // DÍA 11: entra con la toalla al hombro y el celular en alto; se da vuelta a cámara en el remate
    const u = sg(t, T.entra[0], T.entra[1]);
    const gC = 0.1;   // mira a Ceci (la cabeza), abierta a cámara
    const p = poseEn(t, [
      [0, { giro: -1.2, ...aC(-0.3, 0.05), ...BUENA, ...BRAZOS.costado }],
      [T.entra[1] - 0.1, { giro: gC, ...aC(-0.55, -0.05), ...BUENA, cejas: { alto: 0.5, ang: 0.3 } }, 0.35],
      [T.p5 + 0.3, { ...aC(-0.55, 0.0), ...FELIZ }, 0.3],
      [T.a3, { giro: 0.0, ...aC(0.0, -0.05, 0.08), ...CARA.sorpresa, boca: { sonrisa: 0.5, abierta: 0.2, ancho: 0.9 }, cejas: { alto: 0.9, ang: 0.3 } }, 0.25],
      [T.a3 + 0.6, { ...aC(0.05, -0.02, 0.1), ...CARA.feliz }, 0.3],
    ]);
    Object.assign(p, { x: lerp(ALI_MOS.x + 0.45, ALI_MOS.x, eio(u)), z: ALI_MOS.z, paso: u > 0.02 && u < 0.98 ? 1 : 0 });   // (pasada 2) entra de la derecha, no pegada a la cámara
    // el celular en alto hacia Ceci (mano izquierda) hasta el remate; la derecha al pelo en "mechas"
    const muestra = sg(t, T.entra[1] - 0.45, T.entra[1]) * (1 - sg(t, T.a3 - 0.1, T.a3 + 0.2));
    manoA(alicia, p, "D", V3(ALI_MOS.x - 0.3, 1.0, ALI_MOS.z + 0.34), muestra, [-0.9, -0.5, -0.2]);   // (r1) el celular hacia su derecha y hacia cámara: no tapa la boca de Ceci
    if (t >= T.a3 - 0.1) { manoA(alicia, p, "I", cabezaW(alicia, [0.38, 0.12, 0.0]), sg(t, T.a3 - 0.1, T.a3 + 0.25), [1, 0.1, -0.4]); p.manoD = [-0.27, 0.1, 0.26]; }   // (r1) la mano al costado del pelo, por fuera de la cabeza; (r2) el celular abajo, lejos de la toalla
    p.t = t; bocaVoz(p, t, T.a2, ENV.a2, 0.6); bocaVoz(p, t, T.a3, ENV.a3, 0.65); return p;
  }
  // Q1 / Q1b: en la cocina, con el celular en las dos manos; "¿Ya? ¿Así nomás?"
  const p = poseEn(t, [
    [0, { x: ALI_COC.x, z: ALI_COC.z, giro: -0.15, ...aC(0.0, 0.3), ...CARA.neutra, ojos: { abiertos: 1, y: -0.35 }, ...BRAZOS.celular }],
    [T.pagado + 0.1, { ...aC(0.0, 0.3), ...CARA.sorpresa, boca: { sonrisa: 0.2, abierta: 0.1, ancho: 0.8 } }, 0.2],
    [T.a4 + 0.05, { ...aC(0.2, 0.0, 0.08), ...CARA.sorpresa, cejas: { alto: 0.9, ang: 0.35 } }, 0.25],
    [T.a4 + LEN.a4 * 0.5, { ...aC(0.15, 0.05, 0.1), ...FELIZ }, 0.3],
  ]);
  p.t = t; bocaVoz(p, t, T.a4, ENV.a4, 0.65); return p;
}
function poseCeci(t) {
  const p2 = t >= P2, pa = planoActual;
  if (pa === "P1" || pa === "Q3" || pa === "Q3b" || pa === "Q4") {
    const gA = -0.35;
    if (!p2) {
      // P1: la tablilla en la izquierda, el celular en la derecha; vibra, lo mira: "Ahora me fijo."
      const p = poseEn(t, [
        [0, { x: CECI_CLASE.x, z: CECI_CLASE.z, giro: gA, ...aC(0.15, 0.05), ...CARA.sonrisa, ...BRAZOS.costado, manoI: [0.2, 0.3, 0.3], codoI: [0.9, -0.6, -0.2], manoD: [-0.27, -0.05, 0.08] }],
        [T.a1 + 0.5, { ...aC(0.2, 0.0), ...SEGURO }, 0.3],
        [T.vibra1 + 0.25, { ...aC(0.0, 0.22), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.15, y: -0.4 }, manoD: [-0.08, 0.36, 0.34], codoD: [-0.8, -0.6, -0.2] }, 0.3],
        [T.c1 + 0.1, { ...aC(0.25, 0.12), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.2 } }, 0.25],
      ]);
      p.t = t; bocaVoz(p, t, T.c1, ENV.c1, 0.55); return p;
    }
    if (pa === "Q3" || pa === "Q3b") {
      // Q3: las manos libres; "El 1, a las 7:02." sonriendo, sin mirar el celular
      const p = poseEn(t, [
        [0, { x: CECI_CLASE.x, z: CECI_CLASE.z, giro: gA, ...aC(0.15, 0.05), ...BUENA, ...BRAZOS.costado, manoI: [0.12, 0.28, 0.22], manoD: [-0.12, 0.28, 0.22], codoI: [0.9, -0.6, -0.2], codoD: [-0.9, -0.6, -0.2] }],
        [T.c5, { ...aC(0.3, 0.02, 0.06), ...FELIZ, cejas: { alto: 0.3, ang: 0.1 } }, 0.25],
        [T.c5 + LEN.c5 + 0.2, { ...aC(0.3, 0.05, 0.08), ...BUENA }, 0.3],
      ]);
      p.t = t; bocaVoz(p, t, T.c5, ENV.c5, 0.55); return p;
    }
    // Q4: las manos al pecho, feliz: "Y exhalamos."
    const p = poseEn(t, [
      [0, { x: CECI_CLASE.x, z: CECI_CLASE.z, giro: gA + 0.25, ...aC(0.0, 0.05), ...BUENA, manoI: [0.11, 0.4, 0.2], manoD: [-0.11, 0.4, 0.2], codoI: [0.9, -0.7, -0.2], codoD: [-0.9, -0.7, -0.2] }],
      [T.c6, { ...aC(0.0, -0.08, 0.05), ...FELIZ, ojos: { abiertos: 0.9, feliz: 0.6 }, cejas: { alto: 0.25, ang: -0.05, asim: 0 }, manoI: [0.32, 0.18, 0.2], manoD: [-0.32, 0.18, 0.2] }, 0.5],
    ]);
    p.t = t; bocaVoz(p, t, T.c6, ENV.c6, 0.55); return p;
  }
  if (pa === "P3" || pa === "P3j" || pa === "P3b") {
    // 22:40 en el taburete: la laptop, después el celular (manda 17 mensajes) · "No. Yo no persigo a nadie."
    const p = poseEn(t, [
      [0, { x: TABURETE.position.x, y: 0.225, z: TABURETE.position.z, giro: 0, sentado: 1, ...aC(0.05, 0.22), ...SEGURO, ojos: { abiertos: 1, y: -0.35 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.85 }, manoI: [0.14, 0.42, 0.42], manoD: [-0.14, 0.42, 0.42], codoI: [0.9, -0.6, -0.3], codoD: [-0.9, -0.6, -0.3], dedoI: 0, dedoD: 0 }],
      [T.j1 + 0.4, { ...aC(0.12, 0.08), ...SEGURO, ojos: { abiertos: 0.95 } }, 0.3],
      [T.c2 - 0.05, { ...aC(0.12, 0.0), ...SEGURO, cejas: { alto: 0.3, ang: 0.15 }, manoD: [-0.06, 0.36, 0.34], manoI: [0.1, 0.3, 0.3], codoD: [-0.8, -0.6, -0.3] }, 0.3],
      [T.c2 + 0.7, { ...aC(0.1, 0.12), ...SEGURO, ojos: { abiertos: 0.95, y: -0.4 } }, 0.3],
    ]);
    if (t > T.envios[0] && t < T.envios[1]) p.manoD[1] += Math.abs(Math.sin(t * 22)) * 0.012;
    if (t < T.j1 + 0.3) { p.manoI[0] += Math.sin(t * 31) * 0.01; p.manoD[0] += Math.sin(t * 27 + 1) * 0.01; }
    p.t = t; bocaVoz(p, t, T.c2, ENV.c2, 0.55); return p;
  }
  if (!p2) {
    // DÍA 11 detrás del mostrador; la pausa (incrédula); "Inhalamos." (ojos cerrados, manos al pecho); vibra; abre un ojo
    const gA = dirGiro(CECI_MOS.x, CECI_MOS.z, ALI_MOS.x, ALI_MOS.z) - 0.25;
    const p = poseEn(t, [
      [0, { x: CECI_MOS.x, z: CECI_MOS.z, giro: gA, ...aC(0.1, 0.1), ...CARA.sonrisa, ...BRAZOS.apoyado }],
      [T.p4i, { ...aC(0.2, 0.2), ...SEGURO, ojos: { abiertos: 0.95, y: -0.3 } }, 0.3],
      [T.p5 + 0.25, { ...aC(0.25, 0.15), ...INCRE }, 0.3],
      [T.p6b + 0.1, { giro: 0.2, ...aC(0.0, 0.0), ...INCRE, manoI: [0.11, 0.4, 0.2], manoD: [-0.11, 0.4, 0.2], codoI: [0.9, -0.7, -0.2], codoD: [-0.9, -0.7, -0.2] }, 0.3],   // (r1) las dos palmas al pecho sin atravesarse
      [T.c3 - 0.1, { ...aC(0.0, -0.06), ...RESPIRA }, 0.3],
      [T.ojo + 0.12, { ...aC(0.12, 0.05, 0.06), ...CARA.neutra, ojos: { abiertos: 0.95, guiño: 1, y: -0.2, x: 0.4 }, cejas: { alto: 0.1, ang: -0.1, asim: -0.6 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.85 } }, 0.12],
    ]);
    p.cierraHablando = t > T.c3 - 0.2 && t < T.ojo; p.t = t;
    bocaVoz(p, t, T.c3, ENV.c3, 0.4); if (p.cierraHablando) p.ojos.abiertos = Math.min(p.ojos.abiertos, 0.04);
    return p;
  }
  // Q2b: detrás del mostrador con la tablet en las manos: "Ya pagaron 39." sin levantar la vista
  // (r2) la tablet en alto (se ve sobre el mostrador); en "Sale sola, el día uno." la da vuelta y la muestra
  const p = poseEn(t, [[0, { x: CECI_MOS.x, z: CECI_MOS.z, giro: 0.35, ...aC(0.0, 0.3), ...CARA.sonrisa, ojos: { abiertos: 0.95, y: -0.35, x: 0 }, ...BRAZOS.celular, manoI: [0.12, 0.4, 0.34], manoD: [-0.12, 0.4, 0.34] }],
    [T.c4, { ...aC(0.1, 0.05), ...BUENA, ojos: { abiertos: 0.95, y: 0, x: 0.1 }, manoI: [0.12, 0.52, 0.42], manoD: [-0.12, 0.52, 0.42] }, 0.35]]);
  p.t = t; bocaVoz(p, t, T.c4, ENV.c4, 0.55); return p;
}
function poseJoaco(t) {
  if (t < P2) {
    // 22:40: con la mochila al hombro, del lado de la sala, la pregunta al pasar
    const g = dirGiro(JOACO_N.x, JOACO_N.z, CECI_MOS.x, CECI_MOS.z) - 0.65;
    const p = poseEn(t, [[0, { x: JOACO_N.x, z: JOACO_N.z, giro: g, ...aC(-0.1, 0.05), ...CARA.esperanza, ...BRAZOS.costado, manoI: [0.29, -0.08, 0.04] }], [T.j1 + LEN.j1, { ...aC(-0.15, 0.08), ...CARA.sonrisa }, 0.3], [T.c2 + 0.5, { ...aC(-0.1, 0.0), ...CARA.esperanza, cejas: { alto: 0.6, ang: 0.4 } }, 0.3]]);
    p.t = t; bocaVoz(p, t, T.j1, ENV.j1, 0.6); return p;
  }
  // Q2b: con la botella de agua (el mismo audio)
  const g = 0.0;
  const p = poseEn(t, [[0, { x: JOACO_D.x, z: JOACO_D.z, giro: g, ...aC(-0.45, 0.05), ...CARA.esperanza, ...BRAZOS.costado, manoI: [0.2, 0.25, 0.2], codoI: [0.9, -0.6, -0.2] }], [T.c4 + 0.4, { ...aC(-0.3, 0.1), ...CARA.sorpresa, boca: { sonrisa: 0.4, abierta: 0.1, ancho: 0.8 } }, 0.25]]);
  p.t = t; bocaVoz(p, t, T.j1b, ENV.j1, 0.6); return p;
}
function poseSofi(t) {
  const p = poseEn(t, [[0, { x: 0, z: 0, giro: 0, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.f1 + 1.2, { ...aC(0.08, 0.02), manoD: [-0.2, 0.4, 0.32], codoD: [-0.8, -0.6, 0] }, 0.4]]);
  const habla = sg(t, T.f1 - 0.15, T.f1) * (1 - sg(t, T.f1 + LEN.f1, T.f1 + LEN.f1 + 0.2));
  p.boca.sonrisa = lerp(p.boca.sonrisa, 0.15, habla);
  p.t = t; bocaVoz(p, t, T.f1, ENV.f1, 0.6); return p;
}
// =====================================================================================================
// OBJETOS EN EL TIEMPO
// =====================================================================================================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
function enMano(obj, per, lado, rx = 0, ry = 0, rz = 0, dy = 0, dz = 0) { const m = manoMundo(per, lado, _a); per.cuerpo.getWorldQuaternion(_q); obj.position.copy(m); obj.quaternion.copy(_q); obj.rotateX(rx); obj.rotateY(ry); obj.rotateZ(rz); obj.translateY(dy); obj.translateZ(dz); }
function ponerObjetos(t) {
  const p2 = t >= P2, pa = planoActual;
  const clase = pa === "P1" || pa === "Q3" || pa === "Q3b" || pa === "Q4";
  // el celular de Ceci: en la mano (P1, P3/P3b, P6b), vibra en T.vibra1 y T.vibra2
  CEL_CECI.visible = (pa === "P1") || pa === "P3" || pa === "P3j" || pa === "P3b";   // (r1) en P6b no (flotaba al costado)
  if (CEL_CECI.visible) {
    const vib = (a) => (t > a && t < a + 0.35 ? Math.sin(t * 90) * 0.006 : 0);
    if (pa === "P6b") enMano(CEL_CECI, ceci, "D", -1.2, 0, 0.2, 0.06, 0.02); else enMano(CEL_CECI, ceci, "D", pa === "P1" && t < T.vibra1 ? -0.2 : -1.0, 0, 0.15, 0.07, 0.03);
    CEL_CECI.position.x += vib(T.vibra1) + vib(T.vibra2);
  }
  TABLILLA.visible = pa === "P1"; if (TABLILLA.visible) enMano(TABLILLA, ceci, "I", -0.3, 0.2, 0, 0.1, 0.02);
  // el celular de Alicia: en alto en P4-P5; en la cocina (Q1, Q1b)
  CEL_ALI.visible = (!p2 && (pa === "P4" || pa === "P5" || pa === "P6")) || pa === "Q1" || pa === "Q1b";   // (r2) en P6 sigue en la mano
  if (CEL_ALI.visible) {
    if (p2) { const a = manoMundo(alicia, "I", _a), b = manoMundo(alicia, "D", _b); alicia.cuerpo.getWorldQuaternion(_q); CEL_ALI.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.13, 0)); CEL_ALI.quaternion.copy(_q); CEL_ALI.rotateX(-0.5); CEL_ALI.translateZ(0.05); }   // (r1) por encima de las manos
    else { enMano(CEL_ALI, alicia, "D", 0, 0, 0, 0.08, 0.02); const c = V3(CECI_MOS.x, 1.5, CECI_MOS.z); CEL_ALI.lookAt(c); }
  }
  TOALLA.visible = !p2 && (pa === "P4" || pa === "P5" || pa === "P6");
  // la laptop, la planilla, la lámpara: siempre en el mostrador (la laptop cerrada de día no hace falta: queda abierta)
  // la tablet en mano de Ceci (Q2b) = el celular de Ceci con la pantalla del panel, más grande
  if (pa === "Q2b" || pa === "Q2c") { CEL_CECI.visible = true; const a = manoMundo(ceci, "I", _a), b = manoMundo(ceci, "D", _b); ceci.cuerpo.getWorldQuaternion(_q); const g = eio(sg(t, T.c4 - 0.25, T.c4 + 0.15)); CEL_CECI.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08 + 0.1 * g, 0.02)); CEL_CECI.quaternion.copy(_q); CEL_CECI.rotateX(lerp(-1.05, -0.2, g)); CEL_CECI.rotateZ(Math.PI / 2); CEL_CECI.scale.setScalar(1.9); } else CEL_CECI.scale.setScalar(1.15);   // (r2) la da vuelta hacia cámara: el panel a la vista
  BOTELLA.visible = pa === "Q2b"; if (BOTELLA.visible) enMano(BOTELLA, joaco, "I", 0, 0, 0, -0.05, 0.0);
  MOCHILA.visible = false;   // (r2) sin mochila: no se leía
  TAZA_A.visible = VAPOR.visible = pa === "Q1" || pa === "Q1b";
  if (TAZA_A.visible) { TAZA_A.position.set(ALI_COC.x + 0.42, 0.95, -0.62); VAPOR.position.set(TAZA_A.position.x, 1.05, TAZA_A.position.z); VAPOR.userData.actualizar(t, 1); }
  tablet.visible = pa === "Q5"; celuS.visible = pa === "Q5"; PIZARRA.visible = pa !== "Q5";   // (r1) en el cierre no asoman letras de la pizarra
  LAPTOP.visible = !p2 && pa !== "P6b"; PLANILLA.visible = (!p2 && pa !== "P6b") || pa === "Q5"; TAZA.visible = pa !== "P6b"; LAMP.visible = pa !== "P6b";
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  noche(pa === "P3" || pa === "P3j" || pa === "P3b");
  ponerSol(pa === "Q1" || pa === "Q1b" ? 30 : pa === "P1" || pa.startsWith("Q3") || pa === "Q4" ? 1.2 : -2.2, -0.6);
  dibujarInterfaz(t); ponerPizarra(t);
  const clase = pa === "P1" || pa === "Q3" || pa === "Q3b" || pa === "Q4";
  const mos = ["P4", "P5", "P6", "P6b"].includes(pa);
  const vis = {
    ceci: clase || pa === "P3" || pa === "P3j" || pa === "P3b" || pa === "P4" || pa === "P5" || pa === "P6" || pa === "P6b" || pa === "Q2b" || pa === "Q2c",
    alicia: (clase && pa !== "Q4" && pa !== "Q3b") || pa === "P4" || pa === "P5" || pa === "P6" || pa === "P6b" || pa === "Q1" || pa === "Q1b",
    joaco: pa === "P3j" || pa === "Q2b",
    alumnas: clase,
  };
  ceci.raiz.visible = vis.ceci; alicia.raiz.visible = vis.alicia; joaco.raiz.visible = vis.joaco;
  ALUMNAS.forEach((a, i) => (a.raiz.visible = vis.alumnas && i !== 3));   // (r1) la del reformer de al lado quedaba cortada en el borde
  TABURETE.visible = pa === "P3" || pa === "P3j" || pa === "P3b";
  if (vis.alumnas) ponerClase(t); else for (let i = 0; i < 4; i++) { ponerCarro(REFS[i], 0); ponerCorreas(REFS[i], null); }
  if (vis.ceci) ceci.poner(poseCeci(t));
  if (vis.alicia) alicia.poner(poseAlicia(t));
  if (vis.joaco) joaco.poner(poseJoaco(t));
  if (vis.alicia && clase) ponerCorreas(REF_A, [manoMundo(alicia, "I", new THREE.Vector3()), manoMundo(alicia, "D", new THREE.Vector3())]);
  else { if (!clase) ponerCarro(REF_A, 0); ponerCorreas(REF_A, null); }
  // ---- cámara ----
  if (pl[2] === "q5") {
    tablet.updateMatrixWorld(true); const ct = tablet.userData.pantalla.localToWorld(V3(0, 0, 0)), nt = V3(0, 0, 1).transformDirection(tablet.userData.pantalla.matrixWorld);
    celuS.updateMatrixWorld(true); const cs = celuS.children[0].localToWorld(V3(0, 0.165 * 1.9 / 2, 0)), ns = V3(0, 0, 1).transformDirection(celuS.children[0].matrixWorld);
    const c = ct.clone().lerp(cs, 0.42).add(V3(0, -0.05, 0)), n = nt.clone().add(ns).normalize();
    const u = eio(sg(t, T.q5, DUR)), d = lerp(1.18, 1.12, u), c2 = c.clone().lerp(cs, 0.05 * u);
    ponerCam([c2.x + n.x * d, c2.y + n.y * d + 0.05, c2.z + n.z * d, c2.x, c2.y, c2.z, 48], t);
  } else if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  ponerObjetos(t);
  // ---- Sofi: su escena a la textura del celular parado ----
  if (pa === "Q5") {
    sofi.poner(poseSofi(t)); sofi.raiz.updateMatrixWorld(true);
    const c = sofi.cabeza.localToWorld(V3(0, 0.2, 0));
    SOFI.cam.position.set(c.x + 0.04, c.y - 0.05, c.z + 1.75); SOFI.cam.lookAt(c.x, c.y - 0.2, c.z);   // (r2) Sofi en plano medio
    renderer.setRenderTarget(SOFI.rt); renderer.render(SOFI.esc, SOFI.cam); renderer.setRenderTarget(null);
  }
  // ---- insertos ----
  const INS = { P2: INSC, P4i: INSA, Q1i: INSQ, Q2: INSP }[pa];
  for (const I of [INSC, INSA, INSQ, INSP]) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.4), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
  }
  for (const p of TODOS) if (p.raiz.visible) p.ojoLejano(camera.position);
  // ---- portada (VER=portada): Ceci detrás del mostrador, incrédula, y Alicia sonriente con el celular en alto ----
  // (r1) portada (VER=portada, t en la clase del día 10): el mismo cuadro 0 más cerca, las dos caras en la mitad de arriba
  if (VER === "portada") { ponerCam([1.95, 1.42, 3.25, 2.18, 0.9, -0.3, 46], t); camera.updateMatrixWorld(true); ponerObjetos(t); for (const p of TODOS) if (p.raiz.visible) p.ojoLejano(camera.position); }
  // ---- tarjetas ----
  AVISOS.length = 0;
  for (const k in GL) GL[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t);
  renderer.render(scene, camera);
}
function tarjetas(t) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const pa = planoActual;
  if (pa === "P1") {
    ponerGlobo(GL.dia10, 230, 448, 1, null);
    if (t < T.c1) hablar(GL.a1, alicia, 1, 2, 40, 530);   // (r1) entera desde el cuadro 0
    if (t >= T.c1) hablar(GL.c1, ceci, ent(T.c1), 2, 0, 530);
  }
  if (pa === "P2b") { ponerGlobo(GL.pagaron, 770, 330, ent(T.p2b + 0.1), null, 1); }   // (r1) arriba a la derecha, sin tapar renglones
  if (pa === "P3" || pa === "P3j" || pa === "P3b") {
    ponerGlobo(GL.noche, 300, 200, 1, null);
    if (pa === "P3") { LAPTOP.updateMatrixWorld(true); const [lx, ly] = objPx(LAPTOP, V3(0, 0.13, -0.12)); ponerGlobo(GL.banco, 540, 1240, ent(T.p3), null, 1); ponerGlobo(GL.noCierra, 540, 1500 - 70, ent(T.noCierra + 0.15), null, 2); if (t >= T.noCierra) ponerGuia(GUIAS[0], 540, 1040, lx, ly, eo(sg(t, T.noCierra, T.noCierra + 0.25))); }
    if (pa === "P3j" && t >= T.j1) hablar(GL.j1, joaco, ent(T.j1), 1, 0);
    if (pa === "P3b" && t >= T.c2) hablar(GL.c2, ceci, ent(T.c2), 1, -40);
    if (pa === "P3b" && t >= T.envios[0] - 0.1) { CEL_CECI.updateMatrixWorld(true); const [cx, cy] = objPx(CEL_CECI, V3(0, 0.09, 0)); ponerEnvios(t, 790, 1200, ent(T.envios[0] - 0.1)); ponerGuia(GUIAS[1], 600, 1300, cx, cy, eo(sg(t, T.envios[0] - 0.1, T.envios[0] + 0.15))); }
  }
  if (pa === "P4") {
    ponerGlobo(GL.dia11, 200, 200, 1, null);
    if (t >= T.a2) hablar(GL.a2, alicia, ent(T.a2), 1, 0);
  }
  if (pa === "P5") {
    // (r1) dos rótulos fijos en pantalla: el costo arriba a la izquierda (franja navy), anclado en la columna derecha de la
    // pizarra (que no queda detrás de Ceci); "Pagado a la peluquera" abajo a la derecha, anclado en el celular de Alicia
    PIZARRA.updateMatrixWorld(true); const [zx, zy] = objPx(PIZARRA, V3(0.39, 0.2, 0));   // (r2) en un "?" rojo (Pao)
    CEL_ALI.updateMatrixWorld(true); const [ax, ay] = objPx(CEL_ALI, V3(0, -0.05, 0));
    const u0 = ent(T.rot[0]), u2 = ent(T.rot[2]);
    ponerGlobo(GL.r1, 300, 210, u0, null, 1); if (u0 > 0) ponerGuia(GUIAS[0], 300 + GL.r1.userData.W / 2 - 40, 210 + GL.r1.userData.H / 2, zx, zy, eo(sg(t, T.rot[0], T.rot[0] + 0.25)));
    ponerGlobo(GL.r3, 790, 1380, u2, null, 1); if (u2 > 0) ponerGuia(GUIAS[2], 790, 1380 - GL.r3.userData.H / 2, ax, ay, eo(sg(t, T.rot[2], T.rot[2] + 0.25)));
  }
  if (pa === "P6" && t >= T.a3) hablar(GL.a3, alicia, ent(T.a3), 1, 0);
  if (pa === "P6b") {
    if (t >= T.c3 && t < T.florMsg) hablar(GL.c3, ceci, ent(T.c3), 1, 0);
    if (t >= T.florMsg) ponerGlobo(GL.florMsg, 540, 380, ent(T.florMsg), null, 2);
  }
  if (pa === "Q1" || pa === "Q1b") ponerGlobo(GL.dia1, 250, 200, 1, null);
  if (pa === "Q1i") { ponerGlobo(GL.dia1, 250, 120, 1, null); ponerGlobo(GL.rCobra, 560, 296, ent(T.q1i + 0.3), null, 1); }
  if (pa === "Q1b" && t >= T.a4) hablar(GL.a4, alicia, ent(T.a4), 1, 0);
  if (pa === "Q2") ponerGlobo(GL.rPanel, 540, 200, ent(T.q2 + 0.1), null, 1);
  if (pa === "Q2b" || pa === "Q2c") {
    if (pa === "Q2b" && t >= T.j1b && t < T.c4) hablar(GL.j1, joaco, ent(T.j1b), 1, 0);
    if (pa === "Q2c" && t >= T.c4) hablar(GL.c4, ceci, ent(T.c4), 1, -120, 330);
  }
  if (pa === "Q3" || pa === "Q3b") {
    ponerGlobo(GL.dia10, 230, 170, 1, null);   // (r1) arriba: ninguna burbuja lo tapa
    if (pa === "Q3" && t >= T.a1b) hablar(GL.a1, alicia, ent(T.a1b), 2, 40, 330);
    if (pa === "Q3b" && t >= T.c5) hablar(GL.c5, ceci, ent(T.c5), 2, 0, 330);
  }
  if (pa === "Q4") {
    if (t >= T.flor) { ponerGlobo(GL.noti, 290, 1310, ent(T.flor), null, 2); ponerGlobo(GL.p40, 300, 1455, ent(T.flor + 0.15), null, 2); }   // (r2) al pecho, sin tocar la cara
    if (t >= T.c6) hablar(GL.c6, ceci, ent(T.c6), 1, 0);
  }
}
window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice() }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
