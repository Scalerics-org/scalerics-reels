// Capa 3D de vete-racion (Three.js r170 local). Base técnica: reels/veterinaria-vacunas (globos pegados a la cámara en
// píxeles de pantalla, avatares por render target, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom,
// insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// CUATRO lugares: la cocina de Vero (x = 0, de noche en P1 y Q3, de día en Q1), el pasillo del súper (x = -40), la
// recepción de Veterinaria Inés (x = 40: mostrador, torre de bolsas / estante ENVÍOS DE HOY) y la puerta de Vero (x = 80).
//   PARTE 1: domingo 21:40, el plato vacío y la última croqueta · "Uy. Se terminó." · "Cerrado" · "Bueno, Toto. Al súper." ·
//            la bolsa verde al carro, NOVIEMBRE, DICIEMBRE, ENERO · febrero: la torre, "¡Vero! ¿Qué está comiendo Toto?" /
//            "La que me recomendaste. La compro en el súper." · la pausa · "¿Me la anotás?" y la receta · Toto se echa
//   PARTE 2: jueves, el aviso de recompra · "¿Cómo sabe?" · la ficha · la tienda: Pagado ✓ · viernes, Bruno: "¡Ración
//            para Toto!" · domingo 21:40, el plato lleno · febrero: "Me llega sola." · el panel · Inés: "Comentá RACIÓN…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet } from "./personajes.js";
import { crearPerro, PERROS, crearCaraGato } from "./perro.js";
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
scene.background = new THREE.Color(0x0b1220);
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


// ---------- luces: el tubo del techo (luz fría pareja desde arriba), el cielo, relleno desde adelante ----------
const sol = new THREE.DirectionalLight(0xf6f8ff, 1.35);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 20 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xf8faf8, 0x8a8a80, 1.85); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xf4f6ff, 0.75); relleno.position.set(1, 3, 9); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xffffff, 0.35); rim.position.set(-3, 5, -8); scene.add(rim);
function ponerSol(cx, cz) { sol.position.set(cx + 1.2, 6.5, cz + 2.2); sol.target.position.set(cx, 0.5, cz); sol.target.updateMatrixWorld(); }
const _up = V3(0, 1, 0);
function entre(m, a, b, r) { const d = b.clone().sub(a); const L = Math.max(1e-4, d.length()); m.position.copy(a); m.quaternion.setFromUnitVectors(_up, d.normalize()); m.scale.set(r, L, r); }
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
function hablar(g, per, s, orden = 1, dx = 0) {
  const [hx, hy] = coronillaPx(per), [mx, my] = bocaPx(per);
  const { W: Wg, H } = g.userData;
  const cy = hy - 100 - H / 2;
  if (cy - H / 2 < 250) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  if (mx < 70 || mx > 1010 || hy < 0 || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, Math.max(cy, H / 2 + 260), s, [hx, hy + 6], orden);
}
// =====================================================================================================
// LOS SETS: la cocina de Vero (x = 0), el pasillo del súper (x = SUX), la recepción de Veterinaria Inés (x = VX), la puerta
// de Vero (x = PX). Cada uno en su lugar del mundo; la cámara salta de uno a otro con los cortes.
// =====================================================================================================
const SUX = -40, VX = 40, PX = 80;
M.gaz = mat(0x365f28, 0.85); M.acero = mat(0xb9bec4, 0.5, { metalness: 0.3 }); M.kraft = mat(0xc9a774, 0.85); M.verde = mat(0x365f28, 0.8);
M.croq = mat(0x8a5a30, 0.8); M.pared2 = mat(0x16243d, 0.9); M.gris = mat(0xb9bec4, 0.85); M.grisO = mat(0x8f969f, 0.8);
const silueta = (x, cx, cy, s, color) => {
  // (r1) un PERRO parado de perfil, mirando a la derecha: lomo largo, cuatro patas, cuello, cabeza con hocico largo y
  // trufa, oreja CAÍDA, cola recta para arriba (nada de gato sentado)
  x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = color; x.strokeStyle = color; x.lineCap = "round"; x.lineJoin = "round";
  x.beginPath(); x.roundRect(-62, -14, 112, 46, 23); x.fill();                                  // lomo
  for (const px of [-52, -30, 22, 40]) x.fillRect(px, 20, 13, 48);                               // cuatro patas
  for (const px of [-52, -30, 22, 40]) { x.beginPath(); x.ellipse(px + 9, 68, 11, 6, 0, 0, 7); x.fill(); }   // pies
  x.beginPath(); x.moveTo(30, 0); x.lineTo(52, -38); x.lineTo(72, -30); x.lineTo(58, 8); x.closePath(); x.fill();   // cuello
  x.beginPath(); x.ellipse(64, -44, 20, 17, 0, 0, 7); x.fill();                                 // cráneo
  x.beginPath(); x.roundRect(64, -50, 42, 20, 9); x.fill();                                     // hocico largo
  x.beginPath(); x.arc(106, -44, 6, 0, 7); x.fill();                                            // trufa
  x.beginPath(); x.ellipse(56, -30, 9, 22, 0.35, 0, 7); x.fill();                               // oreja caída
  x.lineWidth = 11; x.beginPath(); x.moveTo(-58, -6); x.lineTo(-84, -44); x.stroke();          // cola recta
  x.restore();
};
// ---- la bolsa de 15 kg (EL objeto): tipo "vete" (kraft con el sticker de Veterinaria Inés), "super" (verde, sin sticker)
// o "otra" (colores de la góndola). nombre: la etiqueta de envío. vacia: desinflada y arrugada.
const frenteBolsa = {};
function texFrente(tipo, nombre, color, kg = "15 kg") {
  const k = `${tipo}|${nombre}|${color}|${kg}`;
  if (frenteBolsa[k]) return frenteBolsa[k];
  const fondo = tipo === "vete" || tipo === "super" ? "#c9a774" : color;   // (r1) "super" = LA MISMA bolsa kraft, sin el sticker de la veterinaria
  const tinta = tipo === "vete" || tipo === "super" ? "#0b1220" : "#efeee5";
  return (frenteBolsa[k] = lienzo(400, 580, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    silueta(x, w / 2 - 6, 200, 1.3, tinta);
    x.fillStyle = tipo === "vete" ? "#efeee5" : tipo === "super" ? "#efeee5" : "#efeee5"; x.fillRect(0, 316, w, 150);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    ajustar(x, "ADULTO MEDIANO", 800, 40, w - 40); x.fillText("ADULTO MEDIANO", w / 2, 346);
    ajustar(x, kg, 900, 96, w - 60); x.fillText(kg, w / 2, 420);
    if (tipo === "vete") {
      // (r2) el sticker arriba a la izquierda y más chico: no tapa la cabeza del perro
      x.fillStyle = "#365f28"; x.beginPath(); x.arc(62, 58, 50, 0, 7); x.fill(); x.strokeStyle = "#efeee5"; x.lineWidth = 5; x.beginPath(); x.arc(62, 58, 43, 0, 7); x.stroke();
      x.fillStyle = "#efeee5"; ajustar(x, "VETERINARIA", 800, 17, 76); x.fillText("VETERINARIA", 62, 50); x.font = F(900, 23); x.fillText("INÉS", 62, 74);
    }
    if (nombre) {
      x.fillStyle = "#efeee5"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(46, 482, w - 92, 84, 14); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; ajustar(x, nombre, 900, 62, w - 130); x.fillText(nombre, w / 2, 526);
    }
  }));
}
function crearBolsa15({ tipo = "vete", nombre = null, vacia = false, color = "#16243d", kg = "15 kg", esc = 1 } = {}) {
  const g = new THREE.Group();
  const W = 0.4, H = 0.58, D = vacia ? 0.06 : 0.15;
  const lado = tipo === "vete" || tipo === "super" ? M.kraft : mat(new THREE.Color(color).getHex(), 0.8);
  const geo = rbox(W, H, D, 0.035, 3);
  if (vacia) {
    // arrugada: los lados hundidos y tres pliegues (función fija de la posición, sin azar)
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i); const k = Math.sin(x * 23 + y * 9) * 0.012 + Math.sin(y * 17) * 0.01; p.setZ(i, z * (0.7 + 0.3 * Math.abs(Math.sin(y * 6 + x * 4))) + k * Math.sign(z)); p.setX(i, x * (1 - 0.06 * Math.cos(y * 5))); }
    geo.computeVertexNormals();
  }
  const frente = new THREE.MeshStandardMaterial({ map: texFrente(tipo, nombre, color, kg), roughness: 0.85 });
  const cuerpo = new THREE.Mesh(geo, [lado, lado, lado, lado, frente, lado]); cuerpo.position.y = H / 2; g.add(cuerpo);
  // la parte de arriba doblada y cosida (la costura en zigzag navy)
  const tapa = caja(W * 0.98, 0.06, D * 0.6 + 0.01, lado, 0, H + 0.02, 0, 0.012); g.add(tapa);
  for (let i = 0; i < 9; i++) { const z = caja(0.05, 0.012, 0.006, M.navy, -W / 2 + 0.04 + i * 0.04, H + 0.022, (D * 0.6 + 0.01) / 2 + 0.002, 0.003); z.rotation.z = i % 2 ? 0.6 : -0.6; g.add(z); }
  g.scale.setScalar(esc);
  sombras(g); g.userData = { H, W, D };
  return g;
}
// ---- el plato de acero de Toto (Lathe) y las croquetas ----
const platoGeo = new THREE.LatheGeometry([V3(0, 0, 0), V3(0.1, 0, 0), V3(0.12, 0.012, 0), V3(0.135, 0.06, 0), V3(0.15, 0.07, 0), V3(0.155, 0.064, 0), V3(0.12, 0.055, 0), V3(0.105, 0.012, 0), V3(0, 0.012, 0)], 36);
function crearPlato() {
  const g = new THREE.Group();
  g.add(mesh(platoGeo, M.acero));
  const lleno = new THREE.Group(); g.add(lleno); g.userData.lleno = lleno;
  semilla = 21;
  const croG = new THREE.SphereGeometry(0.014, 8, 6);
  for (let i = 0; i < 70; i++) {
    const r = Math.sqrt(az()) * 0.11, a = az() * 6.28, h = 0.02 + (1 - r / 0.11) * 0.045 + az() * 0.01;
    const c = mesh(croG, M.croq, Math.cos(a) * r, h, Math.sin(a) * r); c.scale.set(1.2, 0.7, 1); c.rotation.set(az() * 3, az() * 3, 0); lleno.add(c);
  }
  return g;
}
const croqSola = mesh(new THREE.SphereGeometry(0.016, 10, 8), M.croq); croqSola.scale.set(1.2, 0.7, 1); scene.add(croqSola);

// ---- LA COCINA DE VERO (x = 0): pared del fondo z = -1,8 navy claro; mesada con azulejo crema; damero; lámpara verde ----
const COC = new THREE.Group(); scene.add(COC);
const KZ = -1.8, KXL = -2.6, KXR = 2.6, KH = 2.7;
const damero = lienzo(512, 512, (x, w, h) => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#b9bec4" : "#d9d7c9"; x.fillRect(i * 128, j * 128, 128, 128); } });
damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(6, 4.5);
const azuCr = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; for (let j = 0; j < 4; j++) { x.fillRect(0, j * 64, w, 4); for (let i = 0; i < 4; i++) x.fillRect(i * 128 + (j % 2 ? 64 : 0), j * 64, 4, 64); } });
azuCr.wrapS = azuCr.wrapT = THREE.RepeatWrapping;
{
  const piso = mesh(new THREE.PlaneGeometry(KXR - KXL, 4.8), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.85 }), 0, 0, KZ + 2.4); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; COC.add(piso);
  COC.add(mesh(new THREE.BoxGeometry(KXR - KXL, KH, 0.2), M.pared2, 0, KH / 2, KZ - 0.1));
  for (const s of [-1, 1]) { const w = mesh(new THREE.BoxGeometry(0.2, KH, 4.8), M.pared2, s * (KXR + 0.1), KH / 2, KZ + 2.4); COC.add(w); }
  const techo = mesh(new THREE.PlaneGeometry(KXR - KXL, 4.8), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, KH, KZ + 2.4); techo.rotation.x = Math.PI / 2; COC.add(techo);
  // la mesada contra el fondo (x de -2,4 a 0,6): frente navy3, tapa crema, azulejo crema arriba hasta 1,55
  const mx0 = -2.4, mx1 = 0.6, mw = mx1 - mx0, mc = (mx0 + mx1) / 2;
  COC.add(caja(mw, 0.86, 0.58, M.navy3, mc, 0.43, KZ + 0.3, 0.012)); COC.add(caja(mw + 0.04, 0.05, 0.62, M.cr, mc, 0.885, KZ + 0.31, 0.012));
  for (let i = 0; i < 5; i++) COC.add(caja(0.03, 0.12, 0.02, M.cr2, mx0 + 0.3 + i * 0.6, 0.7, KZ + 0.6, 0.008));
  const t = azuCr.clone(); t.needsUpdate = true; t.repeat.set(mw / 0.8, 0.62 / 0.4);
  const az1 = mesh(new THREE.PlaneGeometry(mw, 0.62), new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), mc, 0.91 + 0.31, KZ + 0.005); az1.castShadow = false; COC.add(az1);
  // la alacena alta (navy3 con tiradores crema) y la heladera crema a la izquierda
  COC.add(caja(1.8, 0.7, 0.35, M.navy3, -1.4, 2.0, KZ + 0.18, 0.015)); for (let i = 0; i < 3; i++) COC.add(caja(0.12, 0.025, 0.02, M.cr, -2.0 + i * 0.6, 1.72, KZ + 0.36, 0.008));
  COC.add(caja(0.7, 1.85, 0.66, M.cr, -2.15 + 0.0, 0.925, KZ + 0.95, 0.04)); COC.add(caja(0.03, 0.4, 0.03, M.navy3, -1.83, 1.2, KZ + 1.3, 0.01));
  // la ventana (x 1,1 a 2,1): marco crema, vidrio (de noche navy oscuro liso; de día crema)
  COC.add(caja(1.1, 1.1, 0.06, M.cr, 1.55, 1.55, KZ + 0.03, 0.01));
  // la silla y la mesita a la derecha (siluetas simples navy3 / crema)
  const me = new THREE.Group(); me.position.set(1.7, 0, -0.6); COC.add(me); me.add(caja(0.8, 0.04, 0.6, M.cr, 0, 0.74, 0, 0.012)); for (const [a, b] of [[-0.35, -0.25], [0.35, -0.25], [-0.35, 0.25], [0.35, 0.25]]) me.add(caja(0.04, 0.72, 0.04, M.navy3, a, 0.36, b, 0.008));
  sombras(COC);
}
fusionar(COC);
const VENTANA = mesh(new THREE.PlaneGeometry(0.98, 0.98), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 1.55, 1.55, KZ + 0.065); scene.add(VENTANA);
// la lámpara colgante (pantalla verde apagado; la luz crema plana de noche)
const LAMPARA = new THREE.Group(); LAMPARA.position.set(-0.3, KH, -0.4); scene.add(LAMPARA);
{ LAMPARA.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.6, 6), M.navy, 0, -0.3, 0)); const p = mesh(new THREE.CylinderGeometry(0.09, 0.26, 0.22, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0x365f28, roughness: 0.7, side: THREE.DoubleSide }), 0, -0.7, 0); LAMPARA.add(p); LAMPARA.add(mesh(new THREE.SphereGeometry(0.06, 14, 10), new THREE.MeshBasicMaterial({ color: 0xfff6dc }), 0, -0.79, 0)); }
const luzLamp = new THREE.PointLight(0xffe9c2, 0, 6, 1.4); luzLamp.position.set(-0.3, KH - 0.85, -0.4); scene.add(luzLamp);
// la alfombrita "TOTO" y el plato
const alfT = lienzo(512, 300, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#1f3254"; x.lineWidth = 14; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "TOTO", 800, 120, w - 80); x.fillText("TOTO", w / 2, h / 2 + 6); });
const ALF = mesh(new THREE.PlaneGeometry(0.66, 0.39), new THREE.MeshStandardMaterial({ map: alfT, roughness: 0.95 }), 0, 0.004, 0); ALF.rotation.x = -Math.PI / 2; ALF.castShadow = false; scene.add(ALF);
const PLATO = crearPlato(); scene.add(PLATO);
const TOTO_G = -Math.PI / 2 + 0.12;
let HOCICO = null;   // (r1) la nariz de Toto con la cabeza baja, relativa a su raíz: el plato se pone ahí (el hocico toca el borde)
function calibrarHocico() { toto.poner({ x: 0, y: 0, z: 0, giro: TOTO_G, sentado: 0, baja: 1, cabeza: { giro: 0, asiente: 0.45, ladea: 0 }, t: 0 }); const n = toto.nariz(new THREE.Vector3()); HOCICO = { x: n.x, z: n.z }; }
// la taza de Vero (Q3)
const TAZA = new THREE.Group(); { TAZA.add(mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.1, 18), M.cr, 0, 0.05, 0)); const as = mesh(new THREE.TorusGeometry(0.03, 0.009, 8, 16), M.cr, 0.05, 0.05, 0); TAZA.add(as); TAZA.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.005, 18), mat(0x5a3a26, 0.4), 0, 0.09, 0)); scene.add(sombras(TAZA)); }

// ---- EL PASILLO DEL SÚPER (x = SUX): la góndola gris claro de cuatro estantes con bolsas de colores, el piso gris ----
const SUP = new THREE.Group(); SUP.position.x = SUX; scene.add(SUP);
const GZ = -0.95;   // el frente de la góndola
const BOLSA_GOND = V3(SUX - 0.05, 0.72, GZ - 0.18);   // la bolsa verde de 15 kg en el estante del medio (de donde la saca)
{
  const piso = mesh(new THREE.PlaneGeometry(8, 6), M.gris, 0, 0, 1.5); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SUP.add(piso);
  SUP.add(mesh(new THREE.BoxGeometry(8, 3.2, 0.2), M.pared2, 0, 1.6, GZ - 0.65));
  const gw = 4.4;
  SUP.add(caja(gw, 2.0, 0.06, M.cr2, 0, 1.0, GZ - 0.5, 0.01));
  for (const y of [0.08, 0.68, 1.26, 1.82]) { SUP.add(caja(gw, 0.04, 0.5, M.gris, 0, y, GZ - 0.25, 0.008)); SUP.add(caja(gw, 0.07, 0.02, M.navy3, 0, y + 0.0, GZ + 0.01, 0.006)); }
  SUP.add(caja(gw + 0.06, 0.12, 0.55, M.navy3, 0, 2.05, GZ - 0.25, 0.01));
  for (const x of [-gw / 2, gw / 2]) SUP.add(caja(0.06, 2.1, 0.55, M.gris, x, 1.05, GZ - 0.25, 0.01));
  // los carteles de precio en el borde de los estantes
  const precioT = (txt) => lienzo(200, 90, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 900, 56, w - 16); x.fillText(txt, w / 2, h / 2 + 3); });
  const precios = [[-1.5, 0.68, "$ 2.100"], [-0.05, 0.68, "$ 3.900"], [1.3, 0.68, "$ 4.400"], [-0.9, 1.26, "$ 980"], [0.8, 1.26, "$ 1.350"], [-1.2, 0.08, "$ 2.900"], [0.9, 0.08, "$ 3.600"]];
  for (const [x, y, t] of precios) SUP.add(plano(0.16, 0.072, precioT(t), x, y - 0.012, GZ + 0.024));
}
// las bolsas de la góndola (fijas): grandes abajo y al medio, chicas arriba; la verde de 15 kg se mueve aparte
const COL_G = ["#16243d", "#365f28", "#b9bec4", "#1f3254", "#efeee5", "#8f969f"];   // (r1) ninguna kraft: la kraft "ADULTO MEDIANO" es la de Inés
{
  let k = 0;
  for (const [y, n, esc, kg] of [[0.1, 9, 0.95, "20 kg"], [0.7, 9, 0.9, "15 kg"], [1.28, 12, 0.6, "3 kg"], [1.84, 12, 0.52, "1 kg"]]) {
    for (let i = 0; i < n; i++) {
      const x = -2.0 + (i + 0.5) * (4.0 / n);
      if (y === 0.7 && Math.abs(x - -0.05) < 0.25) continue;   // el hueco de la verde
      const c = COL_G[(k++ * 5 + i) % COL_G.length];
      const b = crearBolsa15({ tipo: "otra", color: c, kg, esc }); b.position.set(x, y + 0.02, GZ - 0.22); b.rotation.y = ((i * 7) % 5 - 2) * 0.03; SUP.add(b);
    }
  }
}
fusionar(SUP);
const BOLSA_SUP = crearBolsa15({ tipo: "super" }); scene.add(BOLSA_SUP);
// el carro de alambre navy3 (barras de 6 px o más en pantalla): canasto, manija, patas y ruedas
const CARRO = new THREE.Group(); scene.add(CARRO);
{
  const bar = (a, b, r = 0.008) => { const m = mesh(new THREE.CylinderGeometry(r, r, 1, 6).translate(0, 0.5, 0), M.navy3); entre(m, a, b, r); m.scale.x = m.scale.z = 1; CARRO.add(m); };
  const W = 0.5, L = 0.75, y0 = 0.42, y1 = 0.85;
  for (const y of [y0, (y0 + y1) / 2, y1]) { bar(V3(-W / 2, y, -L / 2), V3(W / 2, y, -L / 2)); bar(V3(-W / 2, y, L / 2), V3(W / 2, y, L / 2)); bar(V3(-W / 2, y, -L / 2), V3(-W / 2, y, L / 2)); bar(V3(W / 2, y, -L / 2), V3(W / 2, y, L / 2)); }
  for (let i = 0; i <= 6; i++) { const z = -L / 2 + (i * L) / 6; bar(V3(-W / 2, y0, z), V3(-W / 2, y1, z)); bar(V3(W / 2, y0, z), V3(W / 2, y1, z)); }
  for (let i = 0; i <= 4; i++) { const x = -W / 2 + (i * W) / 4; bar(V3(x, y0, -L / 2), V3(x, y1, -L / 2)); bar(V3(x, y0, L / 2), V3(x, y1, L / 2)); }
  CARRO.add(caja(W, 0.01, L, M.navy3, 0, y0, 0, 0.004));
  bar(V3(-W / 2, y1, L / 2), V3(-W / 2, 1.0, L / 2 + 0.12)); bar(V3(W / 2, y1, L / 2), V3(W / 2, 1.0, L / 2 + 0.12)); CARRO.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, W + 0.04, 10).rotateZ(Math.PI / 2), M.verde, 0, 1.0, L / 2 + 0.12));
  for (const [x, z] of [[-W / 2, -L / 2], [W / 2, -L / 2], [-W / 2, L / 2], [W / 2, L / 2]]) { bar(V3(x, 0.07, z), V3(x, y0, z)); CARRO.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 14).rotateZ(Math.PI / 2), M.goma ?? M.navy, x, 0.04, z)); }
  sombras(CARRO);
}
fusionar(CARRO);
const CARRO_POS = V3(SUX + 0.75, 0, 0.0);
CARRO.position.copy(CARRO_POS); CARRO.rotation.y = -0.35;

// ---- LA RECEPCIÓN DE VETERINARIA INÉS (x = VX): azulejo verde apagado y navy arriba, el mostrador, el cartel, la vidriera
// y la puerta a la derecha; la torre de bolsas (parte 1) / el estante "ENVÍOS DE HOY" (parte 2) a la izquierda ----
const VET = new THREE.Group(); VET.position.x = VX; scene.add(VET);
const ZF = -2.2, HW = 3.0, XL = -3.0, XR = 2.6, AZ = 1.8;
const MOS = { x: 0, z: -1.05, w: 1.7, d: 0.55, alto: 1.02 };
const PUERTA = { z0: 0.15, z1: 1.15 };
const azulejoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#365f28"; x.fillRect(0, 0, w, h); x.fillStyle = "#2c4f20"; for (let i = 0; i < 8; i++) { x.fillRect(0, i * 64, w, 4); x.fillRect(i * 64, 0, 4, h); } });
azulejoT.wrapS = azulejoT.wrapT = THREE.RepeatWrapping;
const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, h); x.fillStyle = "#d2d0c1"; for (let i = 0; i < 4; i++) x.fillRect(0, i * 128, w, 3); });
pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(5, 5);
function pared(g, x0, x1, y0 = 0, y1 = HW) {
  const w = x1 - x0;
  if (y0 < AZ) { const hb = Math.min(AZ, y1) - y0, t = azulejoT.clone(); t.needsUpdate = true; t.repeat.set(w / 0.6, hb / 0.6); t.offset.set(0, (y0 % 0.6) / 0.6); const b = mesh(new THREE.BoxGeometry(w, hb, 0.2), [M.gaz, M.gaz, M.gaz, M.gaz, new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), M.gaz], (x0 + x1) / 2, y0 + hb / 2, -0.1); b.castShadow = false; g.add(b); }
  if (y1 > AZ) { const y = Math.max(AZ, y0), c = mesh(new THREE.BoxGeometry(w, y1 - y, 0.2), M.navy, (x0 + x1) / 2, (y + y1) / 2, -0.1); c.castShadow = false; g.add(c); }
}
{
  const piso = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0, 0, 2.6); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; VET.add(piso);
  { const g = new THREE.Group(); g.position.z = ZF; VET.add(g); pared(g, XL, XR); g.add(caja(XR - XL, 0.1, 0.03, M.navy3, (XL + XR) / 2, 0.05, 0.015, 0.01)); }
  { const g = new THREE.Group(); g.position.x = XL; g.rotation.y = Math.PI / 2; VET.add(g); pared(g, -7.4, -ZF + 0.01); }
  { const g = new THREE.Group(); g.position.x = XR; g.rotation.y = -Math.PI / 2; VET.add(g);
    pared(g, ZF - 0.01, -1.95, 0, HW); pared(g, -1.95, -0.25, 0, 0.85); pared(g, -1.95, -0.25, 2.2, HW); pared(g, -0.25, PUERTA.z0, 0, HW); pared(g, PUERTA.z0, PUERTA.z1, 2.25, HW); pared(g, PUERTA.z1, 7.4, 0, HW); }
  const techo = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, HW, 2.6); techo.rotation.x = Math.PI / 2; techo.castShadow = false; VET.add(techo);
  // el mostrador (frente navy3, tapa crema con canto verde)
  const mo = new THREE.Group(); mo.position.set(MOS.x, 0, MOS.z); VET.add(mo);
  mo.add(caja(MOS.w + 0.08, 0.05, MOS.d + 0.08, M.cr, 0, MOS.alto - 0.025, 0, 0.012));
  mo.add(caja(MOS.w, MOS.alto - 0.05, MOS.d, M.navy3, 0, (MOS.alto - 0.05) / 2, 0, 0.012));
  mo.add(caja(MOS.w - 0.1, 0.05, 0.02, M.g, 0, MOS.alto - 0.2, MOS.d / 2 + 0.005, 0.01));
  // el estante de atrás: collares, premios en frascos y juguetes genéricos (sin texto)
  const st = new THREE.Group(); st.position.set(0, 0, ZF + 0.18); VET.add(st);
  for (const y of [1.2, 1.62]) st.add(caja(1.7, 0.03, 0.3, M.cr, 0, y, 0, 0.008));
  for (let i = 0; i < 6; i++) { const c = mesh(new THREE.TorusGeometry(0.06, 0.016, 8, 20), [M.g, M.red, M.navy3, M.gaz, M.kraft, M.cr2][i], -0.65 + i * 0.26, 1.29, 0.02); st.add(c); }
  for (let i = 0; i < 5; i++) { st.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 18), M.cr2, -0.6 + i * 0.3, 1.715, 0)); st.add(mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 18), i % 2 ? M.g : M.navy3, -0.6 + i * 0.3, 1.81, 0)); }
  // el cartel "VETERINARIA INÉS" arriba del mostrador
  const cartelT = lienzo(1400, 300, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "VETERINARIA INÉS", 800, 150, w - 330); x.fillText("VETERINARIA INÉS", 290, h / 2 + 10);
    const hx = 150, hy = h / 2 + 10; x.beginPath(); x.ellipse(hx, hy + 30, 52, 42, 0, 0, 7); x.fill(); for (const [dx, dy] of [[-56, -36], [-20, -66], [20, -66], [56, -36]]) { x.beginPath(); x.ellipse(hx + dx, hy + dy, 20, 25, 0, 0, 7); x.fill(); } x.fillStyle = "#5ce611"; x.fillRect(40, h - 30, w - 80, 12); });
  VET.add(caja(1.62, 0.37, 0.04, M.navy3, 0, 2.2, ZF + 0.02, 0.01)); VET.add(plano(1.56, 0.334, cartelT, 0, 2.2, ZF + 0.045));
  // la balanza de piso y una planta en la esquina
  { const b = new THREE.Group(); b.position.set(1.55, 0, ZF + 0.5); VET.add(b); b.add(caja(0.6, 0.06, 0.45, M.acero, 0, 0.03, 0, 0.015)); b.add(caja(0.56, 0.008, 0.41, mat(0x3a3f4a, 0.9), 0, 0.064, 0, 0.003)); }
  // la puerta (marco navy) y el marco de la vidriera, en la pared derecha
  for (const z of [PUERTA.z0, PUERTA.z1]) VET.add(caja(0.12, 2.25, 0.08, M.navy3, XR - 0.04, 1.125, z, 0.01));
  VET.add(caja(0.12, 0.1, PUERTA.z1 - PUERTA.z0 + 0.08, M.navy3, XR - 0.04, 2.25, (PUERTA.z0 + PUERTA.z1) / 2, 0.01));
  for (const y of [0.85, 2.2]) VET.add(caja(0.12, 0.08, 1.78, M.navy3, XR - 0.04, y, -1.1, 0.01));
  for (const z of [-1.95, -0.25]) VET.add(caja(0.12, 1.43, 0.08, M.navy3, XR - 0.04, 1.525, z, 0.01));
  // el banco de espera contra la pared izquierda
  const bn = new THREE.Group(); bn.position.set(XL + 0.3, 0, -0.2); VET.add(bn); bn.add(caja(0.42, 0.06, 1.4, M.cr, 0, 0.45, 0, 0.02)); for (const z of [-0.6, 0.6]) bn.add(caja(0.36, 0.42, 0.05, M.navy3, 0, 0.21, z, 0.01));
  sombras(VET);
}
fusionar(VET);
const VID = mesh(new THREE.PlaneGeometry(1.7, 1.35), new THREE.MeshBasicMaterial({ color: 0xe3e9ec }), VX + XR + 0.02, 1.525, -1.1); VID.rotation.y = -Math.PI / 2; VID.castShadow = false; scene.add(VID);
const AFUERA = mesh(new THREE.PlaneGeometry(1.2, 2.3), VID.material, VX + XR + 0.4, 1.15, (PUERTA.z0 + PUERTA.z1) / 2); AFUERA.rotation.y = -Math.PI / 2; AFUERA.castShadow = false; scene.add(AFUERA);
const HOJA = new THREE.Group(); HOJA.position.set(VX + XR - 0.02, 0, PUERTA.z0 + 0.04); scene.add(HOJA);
{ HOJA.add(caja(0.05, 2.18, 0.94, M.navy3, 0, 1.09, 0.47, 0.01)); HOJA.add(caja(0.055, 1.9, 0.78, mat(0xb9cde0, 0.15, { transparent: true, opacity: 0.55 }), 0, 1.15, 0.47, 0.005)); HOJA.add(caja(0.08, 0.04, 0.18, M.g, -0.05, 1.05, 0.82, 0.01)); }
// la torre de bolsas (parte 1): 3 de ancho × 3 de fondo × 2 de alto + 2 arriba = 20, sobre un pallet bajo crema
const TORRE_P = V3(VX - 1.45, 0, -0.55);
const TORRE = new THREE.Group(); TORRE.position.copy(TORRE_P); scene.add(TORRE);
{
  TORRE.add(caja(1.3, 0.12, 0.52, M.cr2, 0, 0.06, 0, 0.01));
  let n = 0;
  for (let h = 0; h < 2; h++) for (let f = 0; f < 3; f++) for (let i = 0; i < 3; i++) { const b = crearBolsa15({ tipo: "vete" }); b.position.set(-0.42 + i * 0.42, 0.12 + h * 0.66, 0.17 - f * 0.17); b.rotation.y = ((n * 3) % 5 - 2) * 0.015; TORRE.add(b); n++; }
  for (let i = 0; i < 2; i++) { const b = crearBolsa15({ tipo: "vete" }); b.position.set(-0.21 + i * 0.42, 1.44, 0.0); b.rotation.y = (i ? 1 : -1) * 0.04; TORRE.add(b); }
  // el cartel de cartón colgado adelante: "RACIÓN 15 kg · $ 3.900" en Caveat navy
  const ct = lienzo(520, 260, (x, w, h) => { x.fillStyle = "#d8bf8e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#a68a5a"; x.lineWidth = 8; x.strokeRect(6, 6, w - 12, h - 12); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = CAV(96); x.fillText("RACIÓN 15 kg", w / 2, 88); x.font = CAV(110); x.fillText("$ 3.900", w / 2, 190); });
  const cc = plano(0.5, 0.25, ct, 0, 0.94, 0.27); TORRE.add(cc);
  sombras(TORRE);
}
fusionar(TORRE);
// el estante "ENVÍOS DE HOY" (parte 2), en el lugar de la torre: navy, dos niveles, cinco bolsas con nombre
const ENVIOS = new THREE.Group(); ENVIOS.position.copy(TORRE_P); scene.add(ENVIOS);
{
  ENVIOS.add(caja(1.3, 0.04, 0.5, M.navy3, 0, 0.1, 0, 0.01)); ENVIOS.add(caja(1.3, 0.04, 0.5, M.navy3, 0, 0.82, 0, 0.01));
  for (const x of [-0.64, 0.64]) ENVIOS.add(caja(0.04, 1.62, 0.5, M.navy3, x, 0.81, 0, 0.01));
  ENVIOS.add(caja(1.3, 0.04, 0.5, M.navy3, 0, 1.6, 0, 0.01));
  const nom = ["LUNA", "TOTO", "COCO", "MORA", "SIMÓN"];
  nom.forEach((n, i) => { const b = crearBolsa15({ tipo: "vete", nombre: n, esc: 0.98 }); b.position.set(i < 3 ? -0.42 + i * 0.42 : -0.21 + (i - 3) * 0.42, i < 3 ? 0.12 : 0.84, 0.02); ENVIOS.add(b); });
  const et = lienzo(700, 130, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "ENVÍOS DE HOY", 900, 86, w - 40); x.fillText("ENVÍOS DE HOY", w / 2, h / 2 + 4); });
  ENVIOS.add(caja(1.24, 0.24, 0.03, M.navy, 0, 1.74, 0.23, 0.01)); ENVIOS.add(plano(1.18, 0.2, et, 0, 1.74, 0.247));
  sombras(ENVIOS);
}
// el talonario de recetas de Inés (en el mostrador) y la lapicera
const TALON_P = V3(VX - 0.1, MOS.alto + 0.006, MOS.z + 0.05);
function dibujarReceta(x, W, H, k) {
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 120); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "VETERINARIA INÉS", 900, 60, W - 150); x.fillText("VETERINARIA INÉS", 120, 62);
  const hx = 62, hy = 66; x.beginPath(); x.ellipse(hx, hy + 12, 22, 18, 0, 0, 7); x.fill(); for (const [dx, dy] of [[-24, -14], [-8, -28], [8, -28], [24, -14]]) { x.beginPath(); x.ellipse(hx + dx, hy + dy, 8, 10, 0, 0, 7); x.fill(); }
  x.fillStyle = "#5ce611"; x.fillRect(0, 120, W, 10);
  x.fillStyle = "#16243d"; x.font = F(700, 36); x.fillText("Receta", 34, 178);
  x.strokeStyle = "#cfd8e3"; x.lineWidth = 3; for (let y = 300; y < H - 20; y += 110) { x.beginPath(); x.moveTo(30, y); x.lineTo(W - 30, y); x.stroke(); }
  if (k > 0) {
    x.save(); const L1 = "Ración adulto", L2 = "mediano", L3 = "bolsa 15 kg";
    const total = 3, u = k * total;
    x.fillStyle = "#0b1220"; x.font = CAV(104); x.textBaseline = "alphabetic";
    [[L1, 285], [L2, 395], [L3, 505]].forEach(([l, y], i) => { const v = cl(u - i); if (v <= 0) return; x.save(); x.beginPath(); x.rect(0, y - 110, 30 + (W - 30) * v, 140); x.clip(); x.fillText(l, 40, y); x.restore(); });
    x.restore();
  }
}
const recetaT = lienzo(600, 600, (x, w, h) => dibujarReceta(x, w, h, 0));
const TALON = new THREE.Group(); TALON.position.copy(TALON_P); scene.add(TALON);
{ TALON.add(caja(0.17, 0.014, 0.17, M.cr2, 0, 0.007, 0, 0.004)); const hoja = mesh(new THREE.PlaneGeometry(0.165, 0.165), new THREE.MeshStandardMaterial({ map: recetaT, roughness: 0.85 }), 0, 0.0145, 0); hoja.rotation.x = -Math.PI / 2; TALON.add(hoja); TALON.userData.hoja = hoja; sombras(TALON); }
let recetaK = -1;
function ponerReceta(k) { k = Math.round(k * 24) / 24; if (k === recetaK) return; recetaK = k; dibujarReceta(recetaT.userData.x, 600, 600, k); recetaT.needsUpdate = true; }
let recInsK = -1;
function dibujarRecetaIns(t) {
  const k = Math.round(sg(t, T.escribe[0], T.escribe[1]) * 30) / 30; if (k === recInsK) return; recInsK = k;
  const x = INS_REC.tex.userData.x, W = INS_REC.IW, H = INS_REC.IH;
  x.save(); x.scale(W / 600, H / 600); dibujarReceta(x, 600, 600, k); x.restore();
  // la lapicera navy donde va la letra (la punta en el renglón que se escribe)
  const u = k * 3, i = Math.min(2, Math.floor(u)), v = u - i, ys = [285, 395, 505], anchos = [470, 330, 420];
  const px = (40 + anchos[i] * cl(v)) * (W / 600), py = (ys[i] - 30) * (H / 600);
  if (k > 0 && k < 1) { x.save(); x.translate(px, py); x.rotate(Math.PI - 0.6); x.fillStyle = "#3fa60a"; x.fillRect(-70, -560, 150, 260); x.fillStyle = "#f2c9a8"; x.beginPath(); x.ellipse(5, -250, 62, 70, 0, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.fillRect(-14, -230, 28, 220); x.fillStyle = "#5ce611"; x.fillRect(-14, -230, 28, 40); x.fillStyle = "#b4b2a3"; x.beginPath(); x.moveTo(-14, -10); x.lineTo(14, -10); x.lineTo(0, 22); x.closePath(); x.fill(); x.restore(); }
  INS_REC.tex.needsUpdate = true;
}
const HOJA_R = mesh(new THREE.PlaneGeometry(0.165, 0.165), new THREE.MeshStandardMaterial({ map: recetaT, roughness: 0.9, side: THREE.DoubleSide }), 0, 0, 0); scene.add(HOJA_R);
const LAPICERA = new THREE.Group(); { const c = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.2, 12), M.navy, 0, 0, 0); LAPICERA.add(c); LAPICERA.add(mesh(new THREE.CylinderGeometry(0.0125, 0.0125, 0.05, 12), M.g, 0, 0.085, 0)); LAPICERA.add(mesh(new THREE.ConeGeometry(0.012, 0.03, 12), mat(0x3a3f4a, 0.5), 0, -0.115, 0)); scene.add(sombras(LAPICERA)); }   // (r3) más larga y gruesa, punta gris oscuro (no color piel)

// ---- LA PUERTA DE VERO (x = PX): pared navy2 con la puerta navy2 (marco crema), afuera la tarde crema ----
const PUE = new THREE.Group(); PUE.position.x = PX; scene.add(PUE);
const PZ = -1.0, PDX = 0.0;
{
  const piso = mesh(new THREE.PlaneGeometry(6, 5), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.85 }), 0, 0, 1.4); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; PUE.add(piso);
  PUE.add(mesh(new THREE.BoxGeometry(2.2, 2.8, 0.14), M.pared2, -1.6, 1.4, PZ)); PUE.add(mesh(new THREE.BoxGeometry(2.2, 2.8, 0.14), M.pared2, 1.6, 1.4, PZ)); PUE.add(mesh(new THREE.BoxGeometry(1.0, 0.6, 0.14), M.pared2, 0, 2.5, PZ));
  for (const x of [-0.53, 0.53]) PUE.add(caja(0.08, 2.24, 0.18, M.cr, x, 1.12, PZ, 0.01)); PUE.add(caja(1.14, 0.08, 0.18, M.cr, 0, 2.24, PZ, 0.01));
  // afuera: la vereda crema y la tarde (planos lisos)
  const af = mesh(new THREE.PlaneGeometry(6, 3), new THREE.MeshBasicMaterial({ color: 0xe9dcc0 }), 0, 1.5, PZ - 2.2); af.castShadow = false; PUE.add(af);
  const ve = mesh(new THREE.PlaneGeometry(6, 2.2), M.cr2, 0, 0.001, PZ - 1.1); ve.rotation.x = -Math.PI / 2; ve.castShadow = false; PUE.add(ve);
  const fe = mesh(new THREE.PlaneGeometry(0.9, 0.5), M.cr, 0, 0.003, PZ + 0.4); fe.rotation.x = -Math.PI / 2; PUE.add(fe);
  // un cuadro con una huellita y el perchero
  PUE.add(caja(0.5, 0.6, 0.03, M.cr, -1.3, 1.6, PZ + 0.09, 0.01)); PUE.add(caja(0.4, 0.5, 0.01, M.gaz, -1.3, 1.6, PZ + 0.11, 0.006));
  sombras(PUE);
}
fusionar(PUE);
const PHOJA = new THREE.Group(); PHOJA.position.set(PX + 0.49, 0, PZ + 0.05); scene.add(PHOJA);
{ PHOJA.add(caja(0.96, 2.16, 0.05, M.navy3, -0.48, 1.08, 0, 0.01)); PHOJA.add(caja(0.86, 0.04, 0.06, M.cr, -0.48, 1.6, 0.0, 0.01)); PHOJA.add(mesh(new THREE.SphereGeometry(0.03, 12, 10), M.g, -0.86, 1.05, 0.05)); sombras(PHOJA); }
// (qa4) el picaporte en el mundo (la puerta gira hacia adentro: la mano de Vero lo acompaña hasta soltarlo)
const PERILLA_V = (t) => { PHOJA.rotation.y = 1.4 * eio(sg(t, T.abre - 0.12, T.abre + 0.45)); PHOJA.updateMatrixWorld(true); return PHOJA.localToWorld(V3(-0.86, 1.05, 0.12)); };
// =====================================================================================================
// LOS PERSONAJES Y TOTO
// =====================================================================================================
const ines = crearPersonaje({ ...ELENCO.ines, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.5), r2(T.p5 + 0.2), r2(T.q4b + 0.9), r2(T.c + 2.6)] });
// Vero de calle (campera navy, súper y veterinaria) y Vero de entrecasa (buzo crema, jogging navy2, pantuflas crema)
const vero = crearPersonaje({ ...ELENCO.vero, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p2 + 0.4)] });   // (r1) sin parpadeo en "¿Me la anotás?"
if (vero.campera) vero.campera.traverse((o) => { if (o.isMesh && o.geometry.type === "TorusGeometry") o.visible = false; });   // (vacunas r5) el ruedo crema
const veroC = crearPersonaje({ ...ELENCO.vero, nombre: "Vero", campera: null, pantalon: MARCA.navy2, zapatos: MARCA.cr, pantuflas: { color: MARCA.cr, borde: MARCA.navy3, suela: MARCA.navy }, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.cel + 0.5), r2(T.q1v + 0.6)] });
const bruno = crearPersonaje({ ...ELENCO.bruno, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q2 + 0.2)] });
// la señora del súper, al fondo (sin voz)
const senora = crearPersonaje({ ...DEFECTO, nombre: "Señora", piel: PIEL.clara, pelo: PELO.canoso, peinado: "corto", cejasColor: 0xb9b6b0, camisa: MARCA.navy3, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, pantalon: 0x3a3f4a, nariz: 0.055, alto: 0.95, parpadeoCada: 999 });
const TODOS = [ines, vero, veroC, bruno, senora];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// Inés: el estetoscopio navy al cuello y la lapicera del bolsillo (de vacunas)
const LAP_BOLSILLO = [];
{
  const em = mat(C.navy, 0.45);
  const pts = [V3(-0.05, 0.31, 0.19), V3(-0.1, 0.44, 0.14), V3(-0.1, 0.53, 0.0), V3(0, 0.55, -0.1), V3(0.1, 0.53, 0.0), V3(0.1, 0.44, 0.14), V3(0.07, 0.36, 0.19)];
  ines.cuerpo.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.011, 8), em));
  const campana = mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.016, 20), M.metal, -0.05, 0.3, 0.2); campana.rotation.x = Math.PI / 2 - 0.25; ines.cuerpo.add(campana);
  LAP_BOLSILLO.push(mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.12, 8), M.navy, 0.12, 0.33, 0.19), caja(0.012, 0.03, 0.01, M.g, 0.12, 0.395, 0.195, 0.004));
  for (const m of LAP_BOLSILLO) ines.cuerpo.add(m);
}
const toto = crearPerro({ ...PERROS.toto, escala: 0.9 }); scene.add(toto.raiz);
toto.raiz.traverse((o) => { if (o.isMesh) o.receiveShadow = false; });
calibrarHocico();
// la correa de Toto (verde oscuro)
const CORREA = [0, 1].map(() => { const m = mesh(new THREE.CylinderGeometry(1, 1, 1, 8).translate(0, 0.5, 0), mat(0x2f6b1f, 0.6)); m.castShadow = false; scene.add(m); return m; });
function ponerCorrea(a, b, on) {
  for (const m of CORREA) m.visible = on; if (!on) return;
  const mid = a.clone().lerp(b, 0.5); mid.y -= Math.min(0.25, a.distanceTo(b) * 0.2);
  entre(CORREA[0], a, mid, 0.009); entre(CORREA[1], mid, b, 0.009);
}
// las bolsas que se mueven: la vacía de P1 (con sticker), la de la mesada de Q1 (con poco) y la llena de Q3, la que trae Bruno
const BOLSA_VACIA = crearBolsa15({ tipo: "vete", vacia: true }); scene.add(BOLSA_VACIA);
const BOLSA_POCA = crearBolsa15({ tipo: "vete", vacia: true }); scene.add(BOLSA_POCA);
const BOLSA_NUEVA = crearBolsa15({ tipo: "vete", nombre: "TOTO" }); scene.add(BOLSA_NUEVA);
// el celular de Vero (P1 en la mano; Q1 en la mano) y la tablet del mostrador (parte 2)
const pantCel = lienzo(400, 820, () => {});
const celuV = crearCelular(pantCel, C.navy2, 0.08, 0.162); celuV.scale.setScalar(1.25); scene.add(celuV);
const pantT = lienzo(1000, 760, () => {});
const tablet = crearTablet(pantT, 0.32, 0.24, 0.35); tablet.position.set(VX + 0.5, MOS.alto, MOS.z + 0.02); tablet.rotation.y = -0.15; scene.add(tablet);

// ---- avatares: la cara renderizada chica en un círculo (chat, ficha) ----
const AVATAR = {};
{
  const rt = new THREE.WebGLRenderTarget(256, 256); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene();
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(1, 2, 3); esc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const leer = (raiz, cabeza, fondo, dist = 1.6, alto = 0.25, poner = null) => {
    esc.background = new THREE.Color(fondo);
    const padre = raiz.parent; esc.add(raiz); const pos = raiz.position.clone(), rot = raiz.rotation.clone(); raiz.position.set(0, 0, 0); raiz.rotation.set(0, 0, 0);
    if (poner) poner(); raiz.updateMatrixWorld(true);
    const c = cabeza.localToWorld(V3(0, alto, 0));
    cam.position.set(c.x + 0.12 * dist / 1.6, c.y + 0.04, c.z + dist); cam.lookAt(c.x, c.y - 0.03, c.z);
    renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
    const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    const id = x.createImageData(256, 256);
    for (let y = 0; y < 256; y++) id.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
    x.putImageData(id, 0, 0);
    raiz.position.copy(pos); raiz.rotation.copy(rot); if (padre) padre.add(raiz); else esc.remove(raiz);
    return cv;
  };
  const per = (cfg, fondo) => { const p = crearPersonaje({ ...cfg, parpadeoCada: 999 }); return leer(p.raiz, p.cabeza, fondo, 1.6, 0.25, () => p.poner({ ...CARA.sonrisa, ...BRAZOS.costado, t: 0 })); };
  AVATAR.ines = per(ELENCO.ines, 0x5ce611);
  AVATAR.vero = per(ELENCO.vero, 0xd9d7c9);
  const pt = crearPerro({ ...PERROS.toto }); AVATAR.toto = leer(pt.raiz, pt.cabeza, 0xcfeebc, 1.05, 0.0, () => pt.poner({ sentado: 1, orejas: 0.8, cola: 0, t: 0.3 }));
  rt.dispose();
}

// =====================================================================================================
// LA INTERFAZ: el celular "Cerrado" (P1), el chat de recompra, la ficha de recompra, la tienda (Q1) y el panel (Q5)
// =====================================================================================================
const fila = (x, W, y, a, b, { ok = false, color = "#0b1220", h = 104, fondo = "#ffffff" } = {}) => {
  x.fillStyle = fondo; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 60, h, 22); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, a, 700, 46, W * 0.55); x.fillText(a, 60, y + h / 2 + 2);
  x.fillStyle = color; x.textAlign = "right"; ajustar(x, b, 900, 50, W * 0.38); x.fillText(b, W - (ok ? 124 : 60), y + h / 2 + 2);
  if (ok) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 80, y + h / 2, 28, 0, 7); x.fill(); tilde(x, W - 79, y + h / 2 + 1, 28, "#0b1220"); }
};
const cabecera = (x, W, titulo, sub = null, av = null) => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 180); x.fillStyle = "#5ce611"; x.fillRect(0, 180, W, 10);
  let tx = 40; if (av) { avatar(x, av, 96, 90, 58); tx = 176; }
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, titulo, 800, 56, W - tx - 30); x.fillText(titulo, tx, sub ? 70 : 92);
  if (sub) { x.font = F(700, 38); x.fillText(sub, tx + 2, 130); }
};
// P1 · la tarjeta del lugar: "Veterinaria Inés · Cerrado · Abre el lunes 9:00"
function dibujarCerrado(x, W, H) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 120); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 60); x.fillText("21:40", 40, 62);
  // la foto plana del local: la vidriera navy con el cartel crema
  x.fillStyle = "#365f28"; x.fillRect(30, 160, W - 60, 380); x.fillStyle = "#0b1220"; x.fillRect(30, 160, W - 60, 120); x.fillStyle = "#efeee5"; ajustar(x, "VETERINARIA INÉS", 800, 56, W - 140); x.textAlign = "center"; x.fillText("VETERINARIA INÉS", W / 2, 222);
  x.fillStyle = "#16243d"; x.fillRect(110, 320, 300, 220); x.fillStyle = "#0b1220"; x.fillRect(470, 320, W - 560, 220);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, "Veterinaria Inés", 900, 70, W - 80); x.fillText("Veterinaria Inés", 40, 612);
  x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(40, 676, 330, 104, 52); x.fill(); x.fillStyle = "#ffffff"; x.textAlign = "center"; x.font = F(900, 62); x.fillText("Cerrado", 205, 730);
  x.fillStyle = "#16243d"; x.textAlign = "left"; ajustar(x, "Abre el lunes 9:00", 800, 62, W - 80); x.fillText("Abre el lunes 9:00", 40, 856);
  // (r1) sin la línea chica de abajo
}
// Q1 · el chat de recompra: f = 1 (llegó), 2 (toca Repetir)
function dibujarChat(x, W, H, f) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  cabecera(x, W, "Veterinaria Inés", "en línea", AVATAR.ines);
  x.fillStyle = "#d9d7c9"; x.font = F(800, 38); const dw = x.measureText("Jueves 10:00").width + 60; rr(x, W / 2 - dw / 2, 222, dw, 62, 31); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Jueves 10:00", W / 2, 254);
  const msg = "Hola, Vero. A Toto le quedan unos 4 días de ración. ¿Te la mandamos?";
  x.font = F(800, 58); const ls = renglones(x, msg, W - 130);
  const by = 316, bh = 50 + 180 + 24 + ls.length * 74;
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, by, W - 48, bh, [10, 34, 34, 34]); x.fill(); x.stroke();
  x.fillStyle = "#cfeebc"; x.strokeStyle = "#3fa60a"; x.lineWidth = 5; x.beginPath(); x.roundRect(48, by + 26, W - 96, 180, 26); x.fill(); x.stroke();
  avatar(x, AVATAR.toto, 136, by + 116, 66);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 60); x.fillText("Toto", 230, by + 84); x.fillStyle = "#16243d"; ajustar(x, "Ración 15 kg · ~4 días", 800, 44, W - 300); x.fillText("Ración 15 kg · ~4 días", 232, by + 150);
  x.fillStyle = "#0b1220"; x.font = F(800, 58); ls.forEach((l, i) => x.fillText(l, 56, by + 26 + 180 + 24 + 40 + i * 74));
  const yb = by + bh + 36;
  x.fillStyle = f === 2 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(30, yb, W - 60, 150, 75); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Repetir pedido · $ 3.900", 900, 62, W - 120); x.fillText("Repetir pedido · $ 3.900", W / 2, yb + 77);
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, yb + 176, W - 60, 136, 68); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; ajustar(x, "La paso a buscar", 800, 58, W - 120); x.fillText("La paso a buscar", W / 2, yb + 246);
  if (f === 2) { x.fillStyle = "rgba(11,18,32,0.25)"; x.beginPath(); x.arc(W - 120, yb + 75, 48, 0, 7); x.fill(); }
}
// Q1 · la ficha de recompra de Toto en la tablet de Inés
function dibujarFichaRec(x, W, H) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "Recompras · Toto (Vero)", 800, 60, W - 60); x.fillText("Recompras · Toto (Vero)", 34, 68);
  avatar(x, AVATAR.toto, 140, 270, 100);
  x.fillStyle = "#0b1220"; x.font = F(900, 78); x.fillText("Toto", 280, 232); x.fillStyle = "#16243d"; ajustar(x, "Ración adulto mediano · 15 kg", 700, 42, W - 300); x.fillText("Ración adulto mediano · 15 kg", 282, 308);
  fila(x, W, 400, "Compra cada", "30 días"); fila(x, W, 520, "Última compra", "hace 26 días"); fila(x, W, 640, "Le quedan", "~4 días", { color: "#c7655b" });
  x.fillStyle = "#cfeebc"; x.strokeStyle = "#3fa60a"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 776, W - 60, 130, 26); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, "Aviso enviado · jueves 10:00", 800, 50, W - 200); x.fillText("Aviso enviado · jueves 10:00", 60, 842); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(W - 80, 840, 32, 0, 7); x.fill(); tilde(x, W - 79, 841, 32, "#0b1220");
  // (r1) sin "Próximo aviso"
}
// Q1 · la tienda con el pedido armado: e = 0 (envío marcado), 1 (toca Pagar), 2 (Pagado ✓)
function dibujarTienda(x, W, H, e, env = true) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  cabecera(x, W, "Tienda · Veterinaria Inés", "Tu pedido");
  // la bolsa (dibujo plano) y el renglón
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 222, W - 60, 250, 30); x.fill(); x.stroke();
  x.fillStyle = "#c9a774"; x.beginPath(); x.roundRect(60, 248, 150, 200, 16); x.fill(); silueta(x, 125, 322, 0.5, "#0b1220"); x.fillStyle = "#efeee5"; x.fillRect(60, 380, 150, 40); x.fillStyle = "#0b1220"; x.font = F(900, 30); x.textAlign = "center"; x.fillText("15 kg", 135, 401);
  x.textAlign = "left"; x.fillStyle = "#0b1220"; ajustar(x, "Ración adulto mediano", 800, 46, W - 300); x.fillText("Ración adulto mediano", 240, 300); x.fillStyle = "#16243d"; x.font = F(700, 44); x.fillText("15 kg · × 1", 240, 362); x.fillStyle = "#0b1220"; x.font = F(900, 54); x.fillText("$ 3.900", 240, 428);
  const op = (y, txt, on) => { x.fillStyle = on ? "#cfeebc" : "#ffffff"; x.strokeStyle = on ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, y, W - 60, 118, 26); x.fill(); x.stroke(); x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.arc(84, y + 59, 24, 0, 7); x.stroke(); if (on) { x.fillStyle = "#0b1220"; x.beginPath(); x.arc(84, y + 59, 13, 0, 7); x.fill(); } x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, txt, 800, 48, W - 170); x.fillText(txt, 130, y + 61); };
  op(500, "Envío · viernes 18 a 20 h", env); op(636, "Retiro en la veterinaria", false);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 54); x.fillText("Total", 40, 818); x.textAlign = "right"; x.font = F(900, 66); x.fillText("$ 3.900", W - 40, 818);
  if (e < 2) { x.fillStyle = e === 1 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(30, 880, W - 60, 160, 80); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 80); x.fillText("Pagar", W / 2, 962); if (e === 1) { x.fillStyle = "rgba(11,18,32,0.25)"; x.beginPath(); x.arc(W / 2 + 160, 960, 48, 0, 7); x.fill(); } }
  else { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 880, W - 60, 230, 40); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(118, 995, 58, 0, 7); x.fill(); tilde(x, 120, 997, 60, "#0b1220"); x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Pagado", 900, 70, W - 260); x.fillText("Pagado", 200, 955); x.fillStyle = "#5ce611"; ajustar(x, "Llega el viernes", 800, 54, W - 240); x.fillText("Llega el viernes", 200, 1035); }
}
// Q5 · el panel de recompras: e = { filas (0..4), gira (0..1), plata (0/1) }
const FILAS = [["Toto · Vero", "Enviado"], ["Luna · Marta", "Retiro"], ["Coco · Julio", "Enviado"], ["Mora · Ana", "Enviado"]];
function dibujarPanel(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Recompras de ración · febrero", 800, 58, W - 60); x.fillText("Recompras de ración · febrero", 34, 68);
  const caja2 = (X, Y, w, h, tit, val, fondo, tinta) => { x.fillStyle = fondo; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(X, Y, w, h, 26); x.fill(); x.stroke(); x.fillStyle = tinta; x.textAlign = "center"; ajustar(x, tit, 800, 42, w - 30); x.fillText(tit, X + w / 2, Y + 44); x.font = F(900, 86); x.fillText(val, X + w / 2, Y + 122); };
  const w2 = (W - 80) / 2;
  caja2(30, 164, w2, 176, "Avisos enviados", "23 ✓", "#16243d", "#efeee5");
  caja2(50 + w2, 164, w2, 176, "Repitieron", "19 ✓", "#5ce611", "#0b1220");
  x.fillStyle = "#16243d"; x.textAlign = "center"; ajustar(x, "Envío 14 · Retiro 5", 700, 40, W - 80); x.fillText("Envío 14 · Retiro 5", W / 2 + w2 / 2 + 10, 372);
  FILAS.forEach(([n, h], i) => {
    const y = 404 + i * 86, ok = i < e.filas;
    x.fillStyle = ok ? "#cfeebc" : "#ffffff"; x.strokeStyle = ok ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 60, 74, 18); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 46); x.fillText(n, 66, y + 39);
    if (ok) { x.fillStyle = "#16243d"; x.textAlign = "right"; x.font = F(800, 44); x.fillText(h, W - 120, y + 39); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(W - 76, y + 37, 24, 0, 7); x.fill(); tilde(x, W - 75, y + 38, 24, "#0b1220"); }
  });
  // "Compran afuera 11 → 2": el 11 rojo gira de canto y queda el 2 verde
  const yD = 762;
  x.fillStyle = "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, yD, W - 60, 150, 26); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "left"; ajustar(x, "Compran afuera", 800, 56, W * 0.55); x.fillText("Compran afuera", 60, yD + 76);
  { const g = e.gira, sx = Math.abs(Math.cos(g * Math.PI)), v = g < 0.5 ? "11" : "2", col = g < 0.5 ? "#c7655b" : "#3fa60a"; x.save(); x.translate(W - 150, yD + 76); x.scale(Math.max(0.05, sx), 1); x.fillStyle = col; x.textAlign = "center"; x.font = F(900, 100); x.fillText(v, 0, 4); x.restore(); }
  if (e.plata) { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 936, W - 60, 140, 30); x.fill(); x.fillStyle = "#5ce611"; x.textAlign = "center"; ajustar(x, "$ 74.100 en ración este mes", 900, 64, W - 100); x.fillText("$ 74.100 en ración este mes", W / 2, 1008); }
}
// ---- los insertos pegados a la cámara (fondo plano del set) ----
function crearFondoInserto(g, [c1, c2, c3]) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: c1 })); bg.position.z = -0.06; g.add(bg);
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1300 / PXK), new THREE.MeshBasicMaterial({ color: c2 })); pc.position.set(0, -560 / PXK, -0.058); g.add(pc);
  const pi = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 420 / PXK), new THREE.MeshBasicMaterial({ color: c3 })); pi.position.set(0, -1000 / PXK, -0.057); g.add(pi);
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
const FONDO_NOCHE = [0x16243d, 0x1f3254, 0xb9bec4], FONDO_DIA = [0xd9d7c9, 0x16243d, 0xb9bec4], FONDO_VET = [0x0b1220, 0x365f28, 0xd9d7c9];
function inserto(fondo, IW, IH, cy, marco, opc = {}) { const I = { g: new THREE.Group() }; crearFondoInserto(I.g, fondo); const c = crearCelInserto(IW, IH, 540, cy, marco, opc); I.g.add(c.g); I.tex = c.tex; I.IW = IW; I.IH = IH; pegarACamara(I.g, camera, 10); I.g.visible = false; return I; }
const INS_CERR = inserto(FONDO_NOCHE, 760, 1100, 1060, 32, { camara: true, funda: 0x16243d });
const INS_CHAT = inserto(FONDO_DIA, 860, 1400, 1060, 34, { camara: true, funda: 0x16243d });
const INS_FICHA = inserto(FONDO_VET, 1000, 1120, 1080, 18);
const INS_TIENDA = inserto(FONDO_DIA, 860, 1180, 1060, 34, { camara: true, funda: 0x16243d });
const INS_PANEL = inserto(FONDO_VET, 1000, 1120, 1080, 18);
const INS_REC = inserto(FONDO_VET, 900, 900, 1000, 14, { funda: 0xd9d7c9 });
const INSERTOS = [INS_CERR, INS_CHAT, INS_FICHA, INS_TIENDA, INS_PANEL, INS_REC];
dibujarCerrado(INS_CERR.tex.userData.x, INS_CERR.IW, INS_CERR.IH); INS_CERR.tex.needsUpdate = true;
dibujarFichaRec(INS_FICHA.tex.userData.x, INS_FICHA.IW, INS_FICHA.IH); INS_FICHA.tex.needsUpdate = true;
let cChat = "", cTienda = "", cPanel = "", cT3 = "";
function dibujarInterfaz(t) {
  const fC = t >= T.toca ? 2 : 1;   // (r1) se ve el toque en "Repetir pedido"
  if (`${fC}` !== cChat) { cChat = `${fC}`; dibujarChat(INS_CHAT.tex.userData.x, INS_CHAT.IW, INS_CHAT.IH, fC); INS_CHAT.tex.needsUpdate = true; }
  const eT = t >= T.pagado ? 2 : t >= T.pagar ? 1 : 0;
  const envT = t >= T.envio; if (`${eT}${envT}` !== cTienda) { cTienda = `${eT}${envT}`; dibujarTienda(INS_TIENDA.tex.userData.x, INS_TIENDA.IW, INS_TIENDA.IH, eT, envT); INS_TIENDA.tex.needsUpdate = true; }
  const eP = { filas: T.filas.filter((x) => t >= x).length, gira: Math.round(sg(t, T.gira, T.gira + 0.3) * 10) / 10, plata: t >= T.plata ? 1 : 0 }, kP = JSON.stringify(eP);
  if (kP !== cPanel) { cPanel = kP; dibujarPanel(INS_PANEL.tex.userData.x, INS_PANEL.IW, INS_PANEL.IH, eP); INS_PANEL.tex.needsUpdate = true; }
  // la tablet 3D del mostrador (parte 2): el panel ya resuelto
  const k3 = t >= P2 ? "P" : "";
  if (k3 !== cT3) { cT3 = k3; dibujarPanel(pantT.userData.x, 1000, 760, { filas: 4, gira: 1, plata: 0 }); pantT.needsUpdate = true; }
  // el celular de Vero en 3D: la tarjeta "Cerrado" (parte 1) o el chat (parte 2)
}
{ const x = pantCel.userData.x; x.save(); x.scale(400 / 760, 820 / 1100); dibujarCerrado(x, 760, 1100); x.restore(); pantCel.needsUpdate = true; }
// =====================================================================================================
// LAS TARJETAS DE ESTE REEL (globos, chips, rótulos)
// =====================================================================================================
const chip = (txt, px = 62, fondo = "#16243d", tinta = "#efeee5") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo }); };
const dibujarContador = (x, W, H, n) => { x.fillStyle = "#ffffff"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 52); x.fillText("Ración que no se vendió", W / 2, 54); x.fillText("en la veterinaria:", W / 2, 118); x.font = F(900, 124); x.fillText(plata(n), W / 2, 226); };
const GL = {
  dom: chip("Domingo, 21:40.", 60), dom2: chip("Domingo, 22:05.", 62), feb: chip("Febrero.", 66),
  jue: chip("Jueves, 10:00.", 62), vie: chip("Viernes, 18:40.", 62), domQ: chip("Domingo, 21:40.", 62), febQ: chip("Febrero.", 66),
  meses: ["NOVIEMBRE", "DICIEMBRE", "ENERO"].map((m) => chip(m, 104, "#c7655b", "#ffffff")),
  cont: crearTarjeta(760, 300, (x, W, H) => dibujarContador(x, W, H, 3900), { fondo: "#c7655b" }),
  v1: crearGlobo(["Uy. Se [terminó.]"], 74),
  v2: crearGlobo(["Bueno, Toto.", "Al [súper.]"], 76),
  rSup: crearRotulo([["15 kg · $ 3.900"], ["en el súper", "#ff9d92"]], 54),
  i1: crearGlobo(["¡Vero! ¿Qué está", "comiendo [Toto?]"], 70),
  v3: crearGlobo(["La que me recomendaste.", "La compro en el [súper.]"], 60),
  r1: crearRotulo([["$ 3.900 por mes", "#ff9d92", 60], ["$ 46.800 al año", "#ff9d92", 60], ["que se van al súper", "#ff9d92", 52]], 52),
  r2: crearRotulo([["Compran la ración", "#ff9d92"], ["afuera: 11", "#ff9d92", 64]], 54),
  v4: crearGlobo(["¿Me la anotás?", "Así no me [equivoco.]"], 68),
  rRec: crearRotulo([["Aviso antes de que se termine"]], 50),
  v5: crearGlobo(["¿Cómo [sabe?]"], 84),
  rFicha: crearRotulo([["Sabe qué bolsa lleva"], ["cada uno y cada cuánto"]], 50),
  rTienda: crearRotulo([["Repetir y pagar: un toque"]], 52),
  b1: crearGlobo(["¡Ración para [Toto!]"], 76),
  i1b: crearGlobo(["¡Vero! ¿Qué está", "comiendo [Toto?]"], 70),
  v6: crearGlobo(["La que me recomendaste.", "Me llega [sola.]"], 60),
  rPanel: crearRotulo([["Panel de recompras"]], 54),
};
let contN = -1;
function ponerContador(t, cx, cy, s = 1) { const n = 3900 * (1 + T.mes.filter((m) => t >= m + 0.1).length); if (n !== contN) { contN = n; redibujar(GL.cont, (x, W, H) => dibujarContador(x, W, H, n)); } ponerGlobo(GL.cont, cx, cy, s, null, 1); }
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// =====================================================================================================
// LUGARES
// =====================================================================================================
const VERO_K = { x: -0.3, z: -0.12 };            // la cocina: Vero de pie, de 3/4
const TOTO_K = { x: 0.62, z: 0.36 };   // (r3) más lejos de Vero: la trufa no toca su puño             // Toto a la derecha del plato, mirando a -x (de perfil)
const VERO_S = { x: SUX + 0.12, z: 0.02 };       // el súper
const SENORA_S = { x: SUX - 1.45, z: -0.15 };
const INES_M = { x: VX + 0.0, z: -1.52 };        // Inés detrás del mostrador
const BRUNO_T = { x: VX - 0.62, z: -0.25 };      // Bruno acomodando la torre (P3)
const BRUNO_M = { x: VX - 0.6, z: -1.6 };   // (r1) del lado izquierdo de Inés: Vero ya no le tapa la cara; y está ahí desde P3 (continuidad)      // Bruno detrás del mostrador (P4 en adelante)
const PUERTA_V = { x: VX + XR - 0.3, z: (PUERTA.z0 + PUERTA.z1) / 2 };
const VERO_V = { x: VX + 0.55, z: -0.22 };        // Vero frente al mostrador
const TOTO_T = { x: VX - 1.05, z: 0.12 };        // Toto oliendo la torre
const TOTO_Q4 = { x: VX - 0.3, z: 0.45 };   // (r1) del lado de la cámara: no lo tapan las piernas de Vero       // Q4: Toto sentado al lado de Vero (pasa de largo el estante)
const VERO_P = { x: PX - 0.42, z: -0.35 };       // la puerta de Vero
const BRUNO_P = { x: PX + 0.08, z: PZ - 0.55 };

// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves | null (inserto)]; cada clave [t, px, py, pz, mx, my, mz, fov]
// =====================================================================================================
const K0 = [-0.55, 1.22, 3.3, 0.1, 1.02, 0.1, 50];   // el cuadro 0 de la cocina (P1 = Q1 = Q3)
const KV = [0.55, 1.35, 2.8, -0.02, 0.75, 0.0, 52];   // (r3) Vero entra entera por la izquierda   // (r2) Toto entra entero   // Q1v: Vero y Toto más cerca
const S0 = [SUX + 1.95, 1.62, 3.05, SUX + 0.2, 0.95, -0.5, 52];
const V4 = [VX - 1.3, 1.6, 3.6, VX - 0.55, 1.12, -0.6, 58];   // (r2) el cartel de la torre entero
const V4Q = [VX - 1.4, 1.5, 4.0, VX - 0.7, 1.12, -0.5, 64];   // (r2) más cerca y más bajo, el cartel despegado del borde   // (r1) Q4: el cartel ENVÍOS DE HOY entero y Vero en cuadro cuando Inés le habla   // (r1) Q4: el cartel ENVÍOS DE HOY entero
const V4B = [VX + 1.55, 1.58, -1.6, VX + 0.5, 1.25, -0.2, 58];   // (r1) fuera del mostrador: sin la losa blanca abajo
const off = (k, d) => k.map((v, i) => v + (d[i] ?? 0));
const PLANOS = [
  ["P1", 0, [[0, ...K0], [T.cel, ...off(K0, [-0.08, -0.03, -0.25, 0, 0, 0, 0])]]],
  ["P1c", T.cel, null],
  ["P1b", T.celFin, [[T.celFin, ...off(K0, [-0.1, -0.04, -0.3, 0, 0, 0, 0])], [T.p2, ...off(K0, [-0.14, -0.05, -0.42, 0, 0, 0, 0])]]],
  ["P2", T.p2, [[T.p2, ...S0], [T.carro, ...off(S0, [-0.1, 0, -0.15, 0.05, 0, 0, 0])], [T.p3, ...off(S0, [-0.12, 0, -0.2, 0.05, 0, 0, 0])]]],
  ["P3", T.p3, [[T.p3, VX - 0.75, 1.5, 3.3, VX - 0.7, 1.15, -0.9, 54], [T.p4, VX - 0.78, 1.5, 3.1, VX - 0.7, 1.15, -0.9, 53]]],   // (r2) la torre y su cartel enteros, menos piso
  ["P4", T.p4, [[T.p4, ...V4], [T.p4b, ...off(V4, [-0.05, 0, -0.2, 0, 0, 0, -1])]]],
  ["P4b", T.p4b, [[T.p4b, ...V4B], [r2(T.v3 + 1.9), ...off(V4B, [-0.04, 0, 0.04, 0, 0.01, 0, -3])], [T.p4c, ...off(V4B, [-0.12, 0, 0.12, 0, 0.04, 0, -14])]]],   // (r2) push-in marcado en el remate
  ["P4c", T.p4c, [[T.p4c, VX + 0.0, 1.5, 2.35, VX + 0.0, 1.38, -1.0, 50], [T.p5, VX + 0.0, 1.5, 2.2, VX + 0.0, 1.38, -1.0, 49]]],   // (r1) Inés al centro y el cartel entero   // (r1) el cartel queda arriba, fuera de cuadro
  ["P5", T.p5, [[T.p5, VX - 0.95, 1.6, -1.7, VX + 0.45, 1.2, -0.3, 56], [T.p5i, VX - 0.9, 1.6, -1.62, VX + 0.45, 1.2, -0.3, 54]]],   // (pasada 1) otro encuadre que P4b: Vero de frente y el talonario en el mostrador
  ["P5w", T.p5w, [[T.p5w, VX - 0.1, 1.8, 0.3, VX - 0.08, 1.02, -1.1, 46], [T.p5i, VX - 0.1, 1.78, 0.24, VX - 0.08, 1.02, -1.1, 45]]],   // (r3) más cerca: el recetario, la lapicera y la hoja   // (r2) desde arriba: el recetario, la lapicera y el tirón   // (r1) Inés, seria, toma el recetario y arranca la hoja
  ["P5i", T.p5i, null],
  ["P5t", T.p5t, [[T.p5t, VX - 0.35, 0.8, 1.9, VX - 1.3, 0.55, -0.25, 50], [P1, VX - 0.4, 0.78, 1.78, VX - 1.3, 0.55, -0.25, 49]]],   // (r2) el cartel de la torre entero
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...K0], [T.q1c, ...off(K0, [-0.04, 0, -0.1, 0, 0, 0, 0])]]],
  ["Q1c", T.q1c, null],
  ["Q1v", T.q1v, [[T.q1v, ...KV], [T.q1t, ...off(KV, [0, 0, -0.08, 0, 0, 0, 0])]]],
  ["Q1t", T.q1t, null],
  ["Q1s", T.q1s, null],
  ["Q2", T.q2, [[T.q2, PX + 0.75, 1.42, 1.85, PX - 0.05, 1.15, -1.1, 50], [T.q3, PX + 0.7, 1.42, 1.7, PX - 0.05, 1.15, -1.1, 49]]],
  ["Q3", T.q3, [[T.q3, 0.75, 0.95, 2.0, 0.22, 0.3, 0.3, 50], [T.para, 0.7, 0.9, 1.85, 0.2, 0.3, 0.3, 48], [T.q4, 0.66, 0.86, 1.7, 0.18, 0.28, 0.3, 46]]],   // (r3) cerrado sobre Toto y el plato (sin pared vacía ni la bolsa cortada)
  ["Q4", T.q4, [[T.q4, ...V4Q], [T.q4b, ...off(V4Q, [-0.05, 0, -0.2, 0, 0, 0, -1])]]],
  ["Q4b", T.q4b, [[T.q4b, ...V4B], [T.q5, ...off(V4B, [-0.1, 0, 0.1, 0, 0.02, 0, -6])]]],
  ["Q5", T.q5, null],
  ["C", T.c, [[T.c, VX + 0.0, 1.62, 2.1, VX + 0.0, 1.15, -1.5, 46], [DUR, VX + 0.0, 1.62, 2.0, VX + 0.0, 1.16, -1.5, 45]]],   // (r3) el cartel entero   // (r1) Inés hasta la cintura sobre la tarjeta
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
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.88, tension: 0.2, feliz: 0 }, cejas: { alto: -0.05, ang: -0.1 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const QUIETA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.05 }, cejas: { alto: 0.25, ang: 0.1 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } };   // la sonrisa congelada de la pausa
const ELOGIO = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, cejas: { alto: 0.55, ang: 0.0, asim: 0 }, boca: { sonrisa: 1, abierta: 0.12, ancho: 1.15 } };   // (r1) un elogio: sonrisa abierta, cejas arriba parejas
const ELOGIO2 = { ...ELOGIO, ojos: { abiertos: 1, feliz: 0.6 }, cejas: { alto: 0.75, ang: 0.05, asim: 0 } };
const FELIZ = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, boca: { sonrisa: 0.95, abierta: 0.05, ancho: 1.15 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); p.boca.sonrisa = Math.min(p.boca.sonrisa, 0.5); }   // (vacunas r2 A2) hablando, la sonrisa cerrada se achica: sin doble boca
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);   // hablando, nunca con los ojos cerrados
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const toW = (per, local) => { per.raiz.updateMatrixWorld(true); return per.cuerpo.localToWorld(V3(...local)); };
function manoA(per, p, lado, w, k, codo = null) { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "I" ? "manoI" : "manoD"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(cl(k)))); if (codo) p[lado === "I" ? "codoI" : "codoD"] = codo; }
const enPerro = (d, w) => { d.raiz.updateMatrixWorld(true); const v = d.raiz.worldToLocal(w.clone()); return [v.x / d.cfg.escala, v.y / d.cfg.escala, v.z / d.cfg.escala]; };
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();

// =====================================================================================================
// POSES
// =====================================================================================================
// la bolsa vacía en las manos de Vero (P1): dada vuelta sobre el plato hasta que cae la croqueta; después cuelga de la izquierda
const BOLSA_ARRIBA = () => V3(PLATO.position.x - 0.02, 1.02, PLATO.position.z - 0.02);
function poseVeroC(t) {
  const p2 = t >= P2;
  const g0 = dirGiro(VERO_K.x, VERO_K.z, 1.2, 2.5) - 0.45;   // de 3/4 a cámara, mirando al plato
  if (!p2) {
    const p = poseEn(t, [
      [0, { x: VERO_K.x, z: VERO_K.z, giro: g0, ...aC(-0.25, 0.45), ...CARA.sorpresa, boca: { sonrisa: 0.1, abierta: 0.15, ancho: 0.8 }, ...BRAZOS.costado }],
      [T.v1 + 0.5, { ...aC(-0.2, 0.42), ...CARA.esperanza, cejas: { alto: 0.55, ang: 0.6 }, boca: { sonrisa: 0.2, abierta: 0, ancho: 0.9 } }, 0.3],
      [T.cel + 0.5, { ...aC(0.05, 0.35), ...CARA.neutra, ...BRAZOS.costado, manoD: [-0.08, 0.36, 0.3], codoD: [-0.7, -0.7, -0.2] }, 0.3],   // (r3) saca el celular durante el inserto
      [T.celFin, { ...aC(-0.35, 0.4), ...BUENA, cejas: { alto: 0.4, ang: 0.2 } }, 0.25],
    ]);
    // las dos manos en la base de la bolsa dada vuelta (hasta T.croqueta + 0.4); sacude un poco
    const kB = 1 - sg(t, T.cel + 0.1, T.cel + 0.5);   // (r3) suelta la bolsa durante el inserto del celular (sin salto en cuadro)
    if (kB > 0) { const c = BOLSA_ARRIBA(); c.x += Math.sin(t * 22) * 0.012 * (1 - sg(t, T.croqueta, T.croqueta + 0.3)); manoA(veroC, p, "I", c.clone().add(V3(0.16, 0.02, 0.0)), kB, [0.8, -0.6, -0.2]); manoA(veroC, p, "D", c.clone().add(V3(-0.16, 0.02, 0.0)), kB, [-0.8, -0.6, -0.2]); }
    p.t = t; bocaVoz(p, t, T.v1, ENV.v1, 0.6); bocaVoz(p, t, T.v2, ENV.v2, 0.6); return p;
  }
  if (t < T.q2) {
    // Q1: de pie al lado de la mesada, con el celular en las dos manos; "¿Cómo sabe?" mira a Toto
    const p = poseEn(t, [
      [0, { x: VERO_K.x - 0.1, z: VERO_K.z - 0.05, giro: g0 + 0.15, ...aC(0.0, 0.42), ...CARA.neutra, ...BRAZOS.celular }],
      [T.ding + 0.1, { ...aC(0.05, 0.45), ...CARA.sorpresa, boca: { sonrisa: 0.3, abierta: 0.1, ancho: 0.8 } }, 0.2],
      [T.v5 - 0.1, { ...aC(-0.45, 0.35), ...ELOGIO, cejas: { alto: 0.8, ang: 0.0, asim: 0.2 } }, 0.25],   // (r2) incrédula y contenta
    ]);
    p.t = t; bocaVoz(p, t, T.v5, ENV.v5, 0.65); return p;
  }
  if (t < T.q3) {
    // Q2: abre la puerta (de 3/4 de espaldas), contenta
    const p = poseEn(t, [
      [0, { x: VERO_P.x, z: VERO_P.z, giro: dirGiro(VERO_P.x, VERO_P.z, PX + 0.1, PZ - 0.4) + 0.25, ...aC(0.2, 0.0), ...BUENA, ...BRAZOS.costado }],
      [T.b1 + 0.2, { ...aC(0.3, -0.05), ...FELIZ }, 0.3],
    ]);
    if (t < T.abre + 0.4) { const w = PERILLA_V(t); manoA(veroC, p, "D", w, sg(t, T.q2, T.abre - 0.1) * (1 - sg(t, T.abre + 0.1, T.abre + 0.4)), [-0.8, -0.6, -0.2]); }   // (qa4) la mano sigue el picaporte y lo suelta
    p.t = t; return p;
  }
  // Q3: al fondo, tranquila, con la taza (sentada a la mesita)
  const p = poseEn(t, [[0, { x: 1.55, y: -0.05, z: -0.2, sentado: 1, giro: -0.5, ...aC(-0.3, 0.2), ...CARA.sonrisa, ...BRAZOS.costado, manoD: [-0.12, 0.3, 0.32], codoD: [-0.7, -0.7, -0.2], manoI: [0.2, 0.08, 0.3] }]]);
  p.t = t; return p;
}
// el súper: saca la bolsa verde y la tira al carro (y otra vez cada mes)
const BOLSA_CARRO = () => CARRO_POS.clone().add(V3(0.0, 0.43, 0.0));
const tirones = () => [[T.agarra, T.carro], ...T.carroMes.map((c) => [r2(c - 0.38), c])];
function bolsaSuperEn(t) {
  // [posición, giro, 0..1 cuánto la sostiene Vero]
  const TT = tirones();
  let i = -1; for (let k = 0; k < TT.length; k++) if (t >= TT[k][0]) i = k;
  if (i < 0) return [BOLSA_GOND.clone(), 0, 0];
  const [a, b] = TT[i], u = sg(t, a, b);
  if (u >= 1) return [BOLSA_CARRO(), -0.35, 0];
  const p0 = BOLSA_GOND.clone().add(V3(0, 0, 0.2 * sg(u, 0, 0.3))), p1 = BOLSA_CARRO();
  const pos = p0.clone().lerp(p1, eio(sg(u, 0.25, 1))); pos.y += Math.sin(sg(u, 0.25, 1) * Math.PI) * 0.35;
  return [pos, lerp(0, -0.35, sg(u, 0.3, 1)), u < 0.95 ? 1 : 0];
}
function poseVeroS(t) {
  const gG = dirGiro(VERO_S.x, VERO_S.z, BOLSA_GOND.x - 0.1, BOLSA_GOND.z), gC = dirGiro(VERO_S.x, VERO_S.z, CARRO_POS.x, CARRO_POS.z);
  const [bp, , k] = bolsaSuperEn(t);
  const TT = tirones(); let i = -1; for (let q = 0; q < TT.length; q++) if (t >= TT[q][0] - 0.25) i = q;
  const u = i < 0 ? 0 : sg(t, TT[i][0], TT[i][1]);
  const giro = lerp(gG, gC, eio(sg(u, 0.3, 0.9)));
  const p = { x: VERO_S.x, z: VERO_S.z, giro, ...aC(lerp(0.1, -0.15, u), 0.15), ...CARA.neutra, ojos: { abiertos: 0.9, feliz: 0.1 }, ...BRAZOS.costado, t };
  if (k > 0 || (u > 0 && u < 1)) { manoA(vero, p, "I", bp.clone().add(V3(0.17, 0.28, 0.0)), 1, [0.8, -0.6, -0.2]); manoA(vero, p, "D", bp.clone().add(V3(-0.17, 0.28, 0.0)), 1, [-0.8, -0.6, -0.2]); }
  return p;
}
function poseVeroV(t) {
  const p2 = t >= P2;
  const t0 = p2 ? T.entra2[0] : T.entra[0], t1 = p2 ? T.entra2[1] : T.entra[1];
  const u = sg(t, t0, t1);
  const gI = dirGiro(VERO_V.x, VERO_V.z, INES_M.x, INES_M.z), gC0 = dirGiro(VERO_V.x, VERO_V.z, V4B[0], V4B[2]), gC = gC0 - gI > Math.PI ? gC0 - 2 * Math.PI : gC0 - gI < -Math.PI ? gC0 + 2 * Math.PI : gC0, gF = lerp(gI, gC, 0.6);   // (r1) sin la vuelta larga   // (r1) en el contraplano, de 3/4 casi frontal
  const p = poseEn(t, p2 ? [
    [0, { giro: -Math.PI / 2 - 0.3, ...aC(0.1, 0.05), ...BUENA, ...BRAZOS.costado, manoI: [0.27, 0.08, 0.2], codoI: [0.8, -0.6, -0.2] }],
    [t1 - 0.2, { giro: gI, ...aC(0.0, 0.0), ...BUENA }, 0.3],
    [T.q4b - 0.05, { giro: gF, ...aC(0.12, -0.04), ...ELOGIO }, 0.2],
    [T.v6 + 1.7, { ...aC(0.16, -0.06, 0.08), ...ELOGIO2 }, 0.3],
  ] : [
    [0, { giro: -Math.PI / 2 - 0.3, ...aC(0.1, 0.05), ...BUENA, ...BRAZOS.costado, manoI: [0.27, 0.08, 0.2], codoI: [0.8, -0.6, -0.2] }],
    [t1 - 0.2, { giro: gI, ...aC(0.0, 0.0), ...BUENA }, 0.3],
    [T.p4b - 0.05, { giro: gF, ...aC(0.12, -0.04), ...ELOGIO }, 0.2],
    [T.v3 + 1.9, { ...aC(0.16, -0.06, 0.08), ...ELOGIO2 }, 0.3],
    [T.p4c - 0.05, { giro: gI, ...aC(0.0, 0.0), ...ELOGIO }, 0.2],
    [T.v4, { ...aC(0.1, 0.05), ...CARA.esperanza }, 0.3],
    [T.arranca + 0.2, { ...aC(0.0, 0.25), ...BUENA, ojos: { abiertos: 1, y: -0.6 } }, 0.3],
  ]);
  Object.assign(p, { x: lerp(PUERTA_V.x - 0.4, VERO_V.x, eio(u)), z: lerp(PUERTA_V.z - 0.1, VERO_V.z, eio(u)), paso: u > 0.02 && u < 0.98 ? 1 : 0 });
  p.t = t; bocaVoz(p, t, T.v3, ENV.v3, 0.6); bocaVoz(p, t, T.v4, ENV.v4, 0.6); bocaVoz(p, t, T.v6, ENV.v6, 0.6); return p;
}
function poseInes(t) {
  const p2 = t >= P2;
  if (t >= T.c) {
    // C · a cámara, de colega
    const p = poseEn(t, [[0, { x: INES_M.x, z: INES_M.z + 0.1, giro: 0, ...aC(0.0, 0.02), ...CARA.sonrisa, ...BRAZOS.apoyado }], [T.i2 + 1.4, { ...aC(0.06, 0.0, 0.06), ...BUENA }, 0.6]]);
    p.t = t; bocaVoz(p, t, T.i2, ENV.i2, 0.55); return p;
  }
  if (!p2) {
    const gV = dirGiro(INES_M.x, INES_M.z, VERO_V.x, VERO_V.z);
    const p = poseEn(t, [
      [0, { x: INES_M.x, z: INES_M.z, giro: 0, ...aC(-0.35, 0.35), ...CARA.concentrada, ...BRAZOS.apoyado }],
      [T.campana, { ...aC(0.35, 0.05), ...CARA.sonrisa }, 0.3],
      [T.i1, { giro: gV * 0.6, ...aC(0.3, 0.0), ...FELIZ, cejas: { alto: 0.5, ang: 0.2 } }, 0.25],
      [T.v3 + 0.6, { ...aC(0.12, 0.0), ...BUENA }, 0.3],
      [T.v3 + 1.75, { ...aC(0.08, 0.0), ...QUIETA }, 0.15],   // "La compro en el súper": la sonrisa queda quieta
      [T.p5 + 0.1, { ...aC(0.1, 0.05), ...QUIETA }, 0.3],
      [T.p5w - 0.25, { giro: 0, ...aC(-0.05, 0.42), ...SECO, ojos: { abiertos: 0.75, y: -0.9 } }, 0.2],   // escribe, profesional, sin mirar a nadie
    ]);
    if (t >= T.p5w - 0.4 && t < T.p5t + 0.3) {
      // la derecha escribe en el talonario (la lapicera en la mano); la izquierda lo sujeta
      const k = sg(t, T.p5w - 0.4, T.p5w - 0.1) * (1 - sg(t, T.p5t, T.p5t + 0.3));   // (r3) ya están arriba en el primer cuadro
      const u = sg(t, T.escribe[0], T.escribe[1]);
      // (r2) antes de escribir: la lapicera al costado (se ve) y el tirón de la hoja en T.arranca - 0,35
      const tir = Math.sin(sg(t, T.arranca - 0.45, T.arranca - 0.15) * Math.PI);
      let w = TALON_P.clone().add(V3(-0.15, 0.07, 0.03)).add(V3(-0.06 * tir, 0.1 * tir, -0.04 * tir));
      if (t >= T.escribe[0]) { w = TALON_P.clone().add(V3(-0.05 + 0.1 * ((u * 3) % 1), 0.05, 0.03 - 0.05 * Math.floor(u * 3) / 3)); w.x += Math.sin(t * 40) * 0.006 * (u > 0 && u < 1 ? 1 : 0); }
      manoA(ines, p, "D", w, k, [-0.8, -0.6, -0.3]);
      // (r3) la izquierda queda abajo (la mano con el pulgar estirado se leía como un cuerno): solo la derecha, con la lapicera y la hoja
    }
    p.t = t; bocaVoz(p, t, T.i1, ENV.i1, 0.55); return p;
  }
  // parte 2 (Q4, Q4b): detrás del mostrador; el mismo "¡Vero!…"; sonríe con "Me llega sola."
  const gV = dirGiro(INES_M.x, INES_M.z, VERO_V.x, VERO_V.z);
  const p = poseEn(t, [
    [0, { x: INES_M.x, z: INES_M.z, giro: 0, ...aC(0.35, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado }],
    [T.i1b, { giro: gV * 0.6, ...aC(0.3, 0.0), ...FELIZ, cejas: { alto: 0.5, ang: 0.2 } }, 0.25],
    [T.v6 + 1.5, { ...aC(0.1, 0.0), ...FELIZ }, 0.3],
  ]);
  p.t = t; bocaVoz(p, t, T.i1b, ENV.i1, 0.55); return p;
}
function poseBruno(t) {
  if (t < P2) { const p = poseEn(t, [[0, { x: BRUNO_M.x, z: BRUNO_M.z, giro: 0.25, ...aC(0.4, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado }], [T.p4c, { ...aC(0.35, 0.1), ...CARA.incredula, ojos: { abiertos: 0.8 } }, 0.3]]); p.t = t; return p; }
  if (t < T.q3) {
    // Q2: en la puerta de Vero con la bolsa de 15 kg al hombro derecho (las dos manos la sujetan)
    const p = poseEn(t, [[0, { x: BRUNO_P.x, z: BRUNO_P.z, giro: 0.2, ...aC(-0.2, 0.0), ...FELIZ, ...BRAZOS.costado }], [T.b1 + LEN.b1, { ...aC(-0.1, 0.25), ...BUENA }, 0.3]]);
    const b = bolsaBrunoEn(t);
    p.inclina = b.inclina;
    if (b.k > 0) { const lado = V3(Math.cos(0.2), 0, -Math.sin(0.2)); manoA(bruno, p, "I", b.pos.clone().add(V3(0, 0.3, 0)).addScaledVector(lado, 0.22), b.k, [0.8, -0.6, -0.2]); manoA(bruno, p, "D", b.pos.clone().add(V3(0, 0.3, 0)).addScaledVector(lado, -0.22), b.k, [-0.8, -0.6, -0.2]); }
    p.t = t; bocaVoz(p, t, T.b1, ENV.b1, 0.65); return p;
  }
  // Q4 en adelante: detrás del mostrador, armando envíos
  const p = poseEn(t, [[0, { x: BRUNO_M.x, z: BRUNO_M.z, giro: 0.25, ...aC(0.2, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado }]]);
  p.t = t; return p;
}
// la bolsa TOTO de Bruno: al hombro hasta T.apoya; después en el piso adentro
// (r3) la bolsa TOTO: abrazada al pecho; en 0,45 s Bruno se agacha y la apoya en el umbral; las manos la sueltan en 0,3 s
let PECHO_B = null;
function bolsaBrunoEn(t) {
  if (!PECHO_B) { bruno.poner({ x: BRUNO_P.x, z: BRUNO_P.z, giro: 0.2, ...BRAZOS.costado, t: 0 }); PECHO_B = toW(bruno, [0.0, 0.0, 0.3]); }
  const piso = V3(BRUNO_P.x + Math.sin(0.2) * 0.45, 0, BRUNO_P.z + Math.cos(0.2) * 0.45);
  const u = eio(sg(t, T.apoya - 0.45, T.apoya)), suelta = sg(t, T.apoya, T.apoya + 0.3);
  const pos = PECHO_B.clone().lerp(piso, u);
  return { enHombro: true, pos, u, k: 1 - suelta, inclina: 0.45 * Math.sin(Math.min(1, u * 0.5 + suelta * 0.5) * Math.PI) };
}
// Toto
function poseToto(t) {
  const p2 = t >= P2, pa = planoActual;
  const B = { orejas: 0.65, cola: 0.35, colaAlta: 0.6, cejas: 0 };
  if (pa.startsWith("P1") || pa === "Q1" || pa === "Q1v" || pa === "Q3") {
    // la cocina: P1 empuja el plato vacío (de perfil, mirando a -x); Q1 echado al lado; Q3 empuja el lleno, para, mira, come
    if (pa === "Q1" || pa === "Q1v") {
      const c = poseEn(t, [[0, { cab: [0.2, -0.1, 0.0], orejas: 0.5, cola: 0.2, cejas: 0.2 }], [T.v5 + 0.1, { cab: [-0.55, -0.25, 0.4], orejas: 1, cola: 0.7, cejas: 0.8 }, 0.25]]);
      return { ...B, x: TOTO_K.x + 0.1, y: 0, z: TOTO_K.z + 0.1, giro: -Math.PI / 2 + 0.5, echado: 1, cola: c.cola, orejas: c.orejas, cejas: c.cejas, cabeza: { giro: c.cab[0], asiente: c.cab[1], ladea: c.cab[2] }, t };
    }
    // (r1) el hocico baja al plato (baja = 1) en cada empujón y al comer; el plato está calibrado contra la nariz
    const q = pa === "Q3";
    const e1 = q ? [T.empujaQ - 0.2, T.empujaQ + 0.25] : T.empuja, e2 = q ? null : [T.empuja2, r2(T.empuja2 + 0.45)];
    const avance = 0.07 * eio(sg(t, e1[0], e1[1])) + (e2 ? 0.07 * eio(sg(t, e2[0], e2[1])) : 0);
    const P = { ...B, x: TOTO_K.x - avance, y: 0, z: TOTO_K.z, giro: TOTO_G, sentado: 0, paso: (en(t, e1[0], e1[1]) || (e2 && en(t, e2[0], e2[1]))) ? 0.5 : 0, pasoVel: 10, t };
    const c = poseEn(t, q ? [
      [0, { cab: [0, 0.3, 0], baja: 0.35, orejas: 0.5, cola: 0.4, cejas: 0.0 }],
      [T.empujaQ - 0.12, { cab: [0, 0.45, 0], baja: 1, orejas: 0.5, cola: 0.4, cejas: 0 }, 0.18],        // el hocico contra el plato lleno
      [T.para, { cab: [0, 0.2, 0.0], baja: 0.25, orejas: 1, cola: 0.1, cejas: 1 }, 0.2],                 // para: ¿y esto?
      [T.mira[0], { cab: [0.95, -0.05, 0.35], baja: 0, orejas: 1, cola: 0.2, cejas: 1 }, 0.22],          // mira a cámara, ladeado
      [T.mira[1], { cab: [0.95, -0.05, 0.35], baja: 0, orejas: 1, cola: 0.6, cejas: 0.8 }, 0.1],
      [T.come - 0.05, { cab: [0, 0.45, 0], baja: 1, orejas: 0.8, cola: 0.9, cejas: 0.3 }, 0.25],         // come
    ] : [
      [0, { cab: [0, 0.45, 0], baja: 1, orejas: 0.35, cola: 0.15, cejas: -0.7 }],                        // empuja el plato vacío
      [T.empuja[1] + 0.1, { cab: [0, 0.45, 0], baja: 1, orejas: 0.5, cola: 0.3, cejas: -0.3 }, 0.2],    // huele la única croqueta
      [T.cel + 0.45, { cab: [0.25, -0.05, 0.1], baja: 0, orejas: 0.3, cola: 0.1, cejas: -0.9 }, 0.3],   // mira a Vero: ¿eso es todo?
      [T.empuja2 - 0.05, { cab: [0, 0.45, 0], baja: 1, orejas: 0.3, cola: 0.1, cejas: -0.8 }, 0.25],    // empuja otra vez
      [T.orejas, { cab: [0.3, -0.15, 0.12], baja: 0, orejas: 1, cola: 1, cejas: 0.8 }, 0.2],
    ]);
    const come = q && t > T.come ? Math.sin((t - T.come) * 14) * 0.08 : 0;
    Object.assign(P, { orejas: c.orejas, cola: c.cola, cejas: c.cejas, baja: c.baja, cabeza: { giro: c.cab[0], asiente: c.cab[1] + come, ladea: c.cab[2] }, jadeo: q ? 0 : sg(t, T.orejas, T.orejas + 0.3) * 0.7 });
    return P;
  }
  if (pa === "Q2") {
    // contento, parado en dos patas mirando a Bruno (sin tocar la bolsa)
    const er = sg(t, T.b1 - 0.1, T.b1 + 0.2) * (1 - sg(t, T.apoya - 0.2, T.apoya));
    const P = { ...B, x: PX + 0.0, y: 0, z: PZ + 0.62, giro: Math.PI - 0.15, sentado: 1 - er, erguido: er * 0.7, cola: 1, orejas: 1, cejas: 0.7, jadeo: 1, cabeza: { giro: 0, asiente: -0.35, ladea: 0.1 }, t };
    return P;
  }
  // la veterinaria
  if (!p2) {
    const u = sg(t, T.entra[0] + 0.1, T.entra[1] - 0.05);
    const x0 = PUERTA_V.x - 0.5, z0 = PUERTA_V.z - 0.2;
    if (t < T.p5t) {
      const anda = u > 0.01 && u < 0.99;
      const x = lerp(x0, TOTO_T.x, eio(u)), z = lerp(z0, TOTO_T.z, eio(u));
      const gT = dirGiro(TOTO_T.x, TOTO_T.z, TOTO_T.x - 0.25, TORRE_P.z + 0.3);
      const huele = t > T.huele ? Math.sin((t - T.huele) * 11) * 0.08 : 0;
      const c = poseEn(t, [[0, { cab: [0, 0.0, 0], orejas: 0.9, cola: 0.8, cejas: 0.4 }], [T.huele, { cab: [0.0, 0.3, 0.05], orejas: 0.8, cola: 0.9, cejas: 0.5 }, 0.25], [T.p4c + 0.2, { cab: [0.0, 0.35, 0.05], orejas: 0.6, cola: 0.5, cejas: 0.3 }, 0.3]]);
      return { ...B, x, y: 0, z, giro: anda ? dirGiro(x0, z0, TOTO_T.x, TOTO_T.z) : gT, sentado: 0, paso: anda ? 1 : 0, pasoVel: 14, orejas: c.orejas, cola: c.cola, cejas: c.cejas, cabeza: { giro: c.cab[0], asiente: c.cab[1] + huele, ladea: c.cab[2] }, t };
    }
    // P5t: echado contra la base de la torre, con un suspiro (la respiración marcada)
    const s = t > T.suspiro ? Math.sin(sg(t, T.suspiro, T.suspiro + 0.9) * Math.PI) : 0;
    return { ...B, x: TORRE_P.x + 0.45, y: 0, z: TORRE_P.z + 0.55, giro: Math.PI / 2 - 0.2, echado: 1, orejas: 0.5, cola: 0.05, colaAlta: 0.3, cejas: -1, ojos: { abiertos: 0.75 - 0.4 * s }, cabeza: { giro: -0.3, asiente: 0.25 + 0.1 * s, ladea: 0.1 }, t };
  }
  // Q4: entra con Vero, pasa de largo el estante, se sienta al lado de ella moviendo la cola
  const u = sg(t, T.entra2[0] + 0.1, T.entra2[1]);
  const x0 = PUERTA_V.x - 0.5, z0 = PUERTA_V.z + 0.35;
  const anda = u > 0.01 && u < 0.99;
  const x = lerp(x0, TOTO_Q4.x, eio(u)), z = lerp(z0, TOTO_Q4.z, eio(u));
  return { ...B, x, y: 0, z, giro: anda ? dirGiro(x0, z0, TOTO_Q4.x, TOTO_Q4.z) : -2.6, sentado: sg(t, T.entra2[1] - 0.1, T.entra2[1] + 0.2), paso: anda ? 1 : 0, pasoVel: 14, cola: 1, orejas: 0.9, cejas: 0.6, jadeo: 0.8, cabeza: { giro: -0.3, asiente: -0.2, ladea: 0.1 }, t };
}

// =====================================================================================================
// OBJETOS EN EL TIEMPO
// =====================================================================================================
function ponerObjetos(t) {
  const p2 = t >= P2, pa = planoActual;
  const cocina = pa.startsWith("P1") || pa === "Q1" || pa === "Q1v" || pa === "Q3";
  // el plato: pegado a la nariz de Toto (el hocico toca el borde, no lo atraviesa); lleno en la parte 2
  PLATO.visible = cocina; ALF.visible = cocina;
  if (cocina) {
    const q = pa === "Q1" || pa === "Q1v";
    const bx = pa === "Q3" ? TOTO_K.x - 0.07 * eio(sg(t, T.empujaQ - 0.2, T.empujaQ + 0.25)) : TOTO_K.x - 0.07 * eio(sg(t, T.empuja[0], T.empuja[1])) - 0.07 * eio(sg(t, T.empuja2, T.empuja2 + 0.45));
    const dP = pa === "Q3" ? -0.04 : 0.14;   // (r2) en Q3 el hocico va DENTRO del plato (cerca del centro); en P1 toca el borde
    PLATO.position.set(q ? 0.1 : bx + HOCICO.x - dP * Math.cos(0.12), 0, q ? TOTO_K.z + 0.02 : TOTO_K.z + HOCICO.z + dP * Math.sin(0.12));
    const ll = PLATO.userData.lleno.children; if (!PLATO.userData.y0) PLATO.userData.y0 = ll.map((c) => c.position.y);
    for (let i = 0; i < ll.length; i++) ll[i].position.y = PLATO.userData.y0[i];
    if (pa === "Q3") { for (let i = 0; i < 3; i++) { const t0 = T.empujaQ - 0.05 + i * 0.07; if (t > t0) ll[i].position.y += Math.abs(Math.sin((t - t0) * 9)) * 0.035 * Math.exp(-(t - t0) * 4); } if (t > T.come) for (let i = 3; i < 6; i++) ll[i].position.y += Math.max(0, Math.sin((t - T.come) * 14 + i)) * 0.02; }
    PLATO.userData.lleno.visible = p2;
    ALF.position.set(0.05, 0.004, TOTO_K.z);
  }
  // la croqueta única: cae de la boca de la bolsa y rebota en el plato
  croqSola.visible = pa === "P1" && t >= T.croqueta && t < T.cel;
  if (croqSola.visible) {
    const u = sg(t, T.croqueta, T.croqueta + 0.33), boca = BOLSA_ARRIBA().add(V3(0, -0.62, 0));
    const piso = PLATO.position.clone().add(V3(0.02, 0.025, 0.01));
    croqSola.position.lerpVectors(boca, piso, u); croqSola.position.y = lerp(boca.y, piso.y, u * u);
    if (t > T.croqueta + 0.33) { const v = t - T.croqueta - 0.33; croqSola.position.y = piso.y + Math.abs(Math.sin(v * 18)) * 0.03 * Math.exp(-v * 9); }
  }
  // la bolsa vacía (P1): dada vuelta entre las manos y después colgando de la izquierda
  BOLSA_VACIA.visible = pa === "P1" || pa === "P1b";
  if (BOLSA_VACIA.visible) {
    const kB = 1 - sg(t, T.cel + 0.1, T.cel + 0.5);
    if (kB > 0.02) { const c = BOLSA_ARRIBA(); c.x += Math.sin(t * 22) * 0.012 * (1 - sg(t, T.croqueta, T.croqueta + 0.3)); BOLSA_VACIA.position.copy(c); BOLSA_VACIA.rotation.set(0, 0.35, Math.PI); }
    else { BOLSA_VACIA.position.set(-0.95, 0, KZ + 0.66); BOLSA_VACIA.rotation.set(-0.12, 0.3, 0.0); }   // (r3) vacía, apoyada contra la mesada (lejos de Toto)
  }
  // la bolsa con poco en la mesada (Q1) y la nueva llena en la mesada (Q3)
  BOLSA_POCA.visible = pa === "Q1" || pa === "Q1v"; BOLSA_POCA.position.set(-0.75, 0.91, KZ + 0.32); BOLSA_POCA.rotation.set(0, 0.25, 0); BOLSA_POCA.scale.set(1, 0.75, 1);
  // la bolsa de Bruno (Q2) → en el piso adentro (Q2) → llena en la mesada (Q3)
  BOLSA_NUEVA.visible = pa === "Q2" || pa === "Q3";
  if (pa === "Q2") { const b = bolsaBrunoEn(t); BOLSA_NUEVA.position.copy(b.pos); BOLSA_NUEVA.rotation.set(0, 0.2, 0); BOLSA_NUEVA.translateZ(0.09 * (1 - b.u)); }
  if (pa === "Q3") { BOLSA_NUEVA.position.set(-1.7, 0.91, KZ + 0.32); BOLSA_NUEVA.rotation.set(0, 0.25, 0); }   // (r3) fuera del encuadre cerrado (no queda cortada en el borde)
  // la taza de Vero (Q3)
  TAZA.visible = pa === "Q3"; if (TAZA.visible) { const m = manoMundo(veroC, "D", _a); TAZA.position.copy(m).add(V3(0, -0.04, 0.02)); }
  // el celular de Vero (P1 desde que lo saca; Q1 en las dos manos)
  celuV.visible = pa === "P1b" || pa === "Q1" || pa === "Q1v";
  if (celuV.visible) {
    veroC.cuerpo.getWorldQuaternion(_q);
    if (pa.startsWith("P1")) { const m = manoMundo(veroC, "D", _a); celuV.position.copy(m).add(V3(0, 0.07, 0)); celuV.quaternion.copy(_q); celuV.rotateX(-0.5); celuV.translateZ(0.03); }
    else { const a = manoMundo(veroC, "I", _a), b = manoMundo(veroC, "D", _b); celuV.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0)); celuV.quaternion.copy(_q); celuV.rotateX(-0.7); }
  }
  // el súper: la bolsa verde (de la góndola al carro)
  BOLSA_SUP.visible = pa === "P2"; if (BOLSA_SUP.visible) { const [bp, g] = bolsaSuperEn(t); BOLSA_SUP.position.copy(bp); BOLSA_SUP.rotation.set(0, g, 0); }
  // la veterinaria: la torre (parte 1) o el estante ENVÍOS (parte 2); la tablet solo en la parte 2; el talonario
  TORRE.visible = !p2; ENVIOS.visible = p2; tablet.visible = p2;
  TALON.visible = !p2; ponerReceta(sg(t, T.escribe[0], T.escribe[1]));
  // la hoja arrancada: en P5i se ve la hoja de arriba; la lapicera en la mano de Inés mientras escribe
  LAPICERA.visible = !p2 && t >= T.p5w - 0.4 && t < T.p5t + 0.3;
  for (const m of LAP_BOLSILLO) m.visible = !LAPICERA.visible;
  HOJA_R.visible = pa === "P5w" && t > T.arranca - 0.42 && t < T.arranca + 0.25;   // (r2) la hoja arrancada en el tirón (r3: en la derecha, con el membrete a la vista)
  if (HOJA_R.visible) { const m = manoMundo(ines, "D", _a); HOJA_R.position.copy(m).add(V3(-0.06, 0.02 + 0.05 * sg(t, T.arranca - 0.4, T.arranca - 0.15), 0.06)); HOJA_R.rotation.set(-1.2 + 0.6 * sg(t, T.arranca - 0.4, T.arranca - 0.15), 0.2, 0); }
  if (LAPICERA.visible) { const m = manoMundo(ines, "D", _a); LAPICERA.position.copy(m).add(V3(0.03, 0.0, 0.05)); LAPICERA.rotation.set(1.25, 0, 0.75); }   // (r3) acostada en diagonal: se ve entera
  // la puerta de la veterinaria
  const uP = Math.max(sg(t, T.entra[0] - 0.1, T.entra[0] + 0.3) * (1 - sg(t, T.entra[0] + 0.9, T.entra[0] + 1.3)), sg(t, T.entra2[0] - 0.1, T.entra2[0] + 0.3) * (1 - sg(t, T.entra2[0] + 0.9, T.entra2[0] + 1.3)));
  HOJA.rotation.y = 1.25 * eio(uP);
  // la puerta de Vero (abre hacia adentro)
  PHOJA.rotation.y = 1.4 * eio(sg(t, T.abre - 0.12, T.abre + 0.45));   // (qa4) abre hacia adentro (antes salía hacia afuera y atravesaba a Bruno), en 0,57 s
  // la correa: de la mano izquierda de Vero al collar de Toto (veterinaria)
  const conCorrea = (pa === "P3" || pa === "P4" || pa === "P4b" || pa === "P4c" || pa === "P5" || pa === "Q4" || pa === "Q4b") && t >= (p2 ? T.entra2[0] : T.entra[0]);
  if (conCorrea && toto.raiz.visible && vero.raiz.visible) { toto.collar.updateMatrixWorld(true); const mv = manoMundo(vero, "I", _a).clone().add(V3(0, -0.05, 0)); const ml = toto.collar.worldToLocal(mv.clone()); ml.y = 0; ml.z = Math.min(ml.z, -0.02); ml.setLength(0.1); ml.y = 0.02; ponerCorrea(mv, toto.collar.localToWorld(ml), true); } else ponerCorrea(null, null, false);
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function luces(pa, t) {
  const cocina = pa.startsWith("P1") || pa === "Q1" || pa === "Q1v" || pa === "Q3";
  const nocheK = pa.startsWith("P1") || pa === "Q3";
  cielo.intensity = nocheK ? 1.25 : 1.85; relleno.intensity = nocheK ? 0.5 : 0.75; sol.intensity = nocheK ? 0.8 : 1.35;
  sol.color.set(nocheK ? 0xffe6c4 : 0xf6f8ff);
  luzLamp.intensity = nocheK ? 2.2 : 0; LAMPARA.visible = pa !== "Q3";
  VENTANA.material.color.set(nocheK ? 0x0b1220 : 0xefe6cc);
  const cx = cocina ? 0 : pa === "P2" ? SUX : pa === "Q2" ? PX : VX;
  if (cocina) { sol.position.set(-0.3, 2.6, -0.2); sol.target.position.set(0.1, 0, 0.3); } else { sol.position.set(cx + 1.2, 6.5, 1.7); sol.target.position.set(cx, 0.5, -0.5); }
  sol.target.updateMatrixWorld();
}
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  luces(pa, t);
  dibujarInterfaz(t);
  const cocina = pa.startsWith("P1") || pa === "Q1" || pa === "Q1v" || pa === "Q3";
  const vet = ["P3", "P4", "P4b", "P4c", "P5", "P5w", "P5i", "P5t", "Q4", "Q4b", "C"].includes(pa);
  const vis = {
    veroC: (cocina && pa !== "Q3") || pa === "Q2", vero: pa === "P2" || (vet && pa !== "P3" && pa !== "C" && pa !== "P5t" && pa !== "P5i"),
    ines: vet && pa !== "P5t" && pa !== "P5",   // (pasada 1) en P5 la cabeza de Inés quedaba cortada en el borde
    bruno: pa === "P3" || pa === "P4" || pa === "P4c" || pa === "Q2" || pa === "Q4",
    toto: cocina || pa === "Q2" || (vet && pa !== "C" && pa !== "P5i" && pa !== "P5w" && pa !== "Q4b" && (p2 || pa !== "P3")), senora: pa === "P2",
  };
  veroC.raiz.visible = vis.veroC; vero.raiz.visible = vis.vero; ines.raiz.visible = vis.ines; bruno.raiz.visible = vis.bruno; toto.raiz.visible = vis.toto; senora.raiz.visible = vis.senora;
  if (vis.toto) { toto.poner(poseToto(t)); toto.panuelo.visible = false; toto.curita.visible = false; toto.chapita(p2 ? 0x5ce611 : 0xefeee5); toto.chapitaM.visible = true; }
  if (vis.veroC) veroC.poner(poseVeroC(t));
  if (vis.vero) vero.poner(pa === "P2" ? poseVeroS(t) : poseVeroV(t));
  if (vis.ines) ines.poner(poseInes(t));
  if (vis.bruno) bruno.poner(poseBruno(t));
  if (vis.senora) senora.poner({ x: SENORA_S.x, z: SENORA_S.z, giro: Math.PI - 0.3, ...aC(-0.2, 0.25), ...CARA.neutra, ...BRAZOS.costado, manoD: [-0.2, 0.3, 0.35], t });
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  ponerObjetos(t);
  // ---- insertos ----
  const INS = { P1c: INS_CERR, P5i: INS_REC, Q1c: INS_CHAT, Q1t: INS_FICHA, Q1s: INS_TIENDA, Q5: INS_PANEL }[pa];
  for (const I of INSERTOS) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
  }
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);
  // ---- portada (VER=portada): el cuadro 0 limpio ----
  // ---- tarjetas ----
  AVISOS.length = 0;
  for (const k in GL) { if (Array.isArray(GL[k])) GL[k].forEach((g) => (g.visible = false)); else GL[k].visible = false; }
  for (const g of GUIAS) g.visible = false;
  if (pa === "P5i") dibujarRecetaIns(t);
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t);
  renderer.render(scene, camera);
}
function tarjetas(t) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const pa = planoActual;
  // P1: el chip del día debajo de "VETERINARIAS" (HTML, y 150-370)
  if (pa === "P1" || pa === "P1b") {
    ponerGlobo(GL.dom, 300, 470, 1, null);
    // (la burbuja al costado de la cabeza de Vero: arriba está "VETERINARIAS")
    const [bx, by] = bocaPx(veroC), lado = (g) => ponerGlobo(g, Math.min(1030 - g.userData.W / 2, bx + 140 + g.userData.W / 2), Math.max(560 + g.userData.H / 2, by - 40), 1, [bx + 30, by], 2);
    if (t >= T.v1 && t < T.cel) { lado(GL.v1); GL.v1.scale.multiplyScalar(ent(T.v1)); }
    if (t >= T.v2) { verGlobo(GL.v2, t >= T.v2 + 0.55 ? 99 : 2); lado(GL.v2); GL.v2.scale.multiplyScalar(ent(T.v2)); }
  }
  if (pa === "P2") {
    const m = T.mes.filter((x) => t >= x).length;
    if (m === 0) ponerGlobo(GL.dom2, 300, 200, 1, null);
    else ponerGlobo(GL.meses[m - 1], 540, 250, ent(T.mes[m - 1]), null, 1);
    if (t >= T.carro + 0.05 && m === 0) { const [bx, by] = objPx(BOLSA_SUP, V3(0, 0.5, 0)); ponerGlobo(GL.rSup, 300, 1500, ent(T.carro + 0.05), null, 1); ponerGuia(GUIAS[0], 300, 1500 - GL.rSup.userData.H / 2, bx, by, eo(sg(t, T.carro + 0.05, T.carro + 0.3))); }
    if (m > 0) ponerContador(t, 540, 1400, 1);
  }
  if (pa === "P3") ponerGlobo(GL.feb, 220, 200, 1, null);
  if (pa === "P4" || pa === "P4b") {
    if (pa === "P4" && t >= T.i1) hablar(GL.i1, ines, ent(T.i1), 1, 0);
    if (pa === "P4b" && t >= T.v3) { verGlobo(GL.v3, t >= T.v3 + 1.98 ? 99 : 4); hablar(GL.v3, vero, ent(T.v3), 1, 0); }
  }
  if (pa === "P4c") {
    ponerGlobo(GL.r1, 340, 1330, ent(T.rot[0]), null, 1);   // (r1) abajo: ya no tapa el cartel
    const [tx, ty] = objPx(TORRE, V3(0, 1.0, 0.3));
    const y2 = 1610; ponerGlobo(GL.r2, 600, y2, ent(T.rot[1]), null, 1);
  }
  if (pa === "P5" && t >= T.v4) hablar(GL.v4, vero, ent(T.v4), 1, 0);
  if (pa === "P5w" && t < T.v4 + LEN.v4 + 0.1) ponerGlobo(GL.v4, 540, 1480, 1, null, 1);   // (r1) la frase de Vero sigue abajo (arriba está el cartel) mientras Inés toma el recetario
  if (pa === "Q1") ponerGlobo(GL.jue, 300, 200, 1, null);
  if (pa === "Q1c") ponerGlobo(GL.rRec, 540, 190, 1, null, 1);
  if (pa === "Q1v" && t >= T.v5) hablar(GL.v5, veroC, ent(T.v5), 1, 0);
  if (pa === "Q1t") ponerGlobo(GL.rFicha, 540, 200, 1, null, 1);
  if (pa === "Q1s") ponerGlobo(GL.rTienda, 540, 190, 1, null, 1);
  if (pa === "Q2") { ponerGlobo(GL.vie, 300, 200, 1, null); if (t >= T.b1) hablar(GL.b1, bruno, ent(T.b1), 1, 0); }
  if (pa === "Q3") ponerGlobo(GL.domQ, 300, 200, 1, null);
  if (pa === "Q4" || pa === "Q4b") {
    if (pa === "Q4") ponerGlobo(GL.febQ, 220, 200, 1, null);
    if (pa === "Q4" && t >= T.i1b) hablar(GL.i1b, ines, ent(T.i1b), 1, 0);
    if (pa === "Q4b" && t >= T.v6) { verGlobo(GL.v6, t >= T.v6 + 1.7 ? 99 : 4); hablar(GL.v6, vero, ent(T.v6), 1, 0); }
  }
  if (pa === "Q5") ponerGlobo(GL.rPanel, 540, 200, 1, null, 1);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice() }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
