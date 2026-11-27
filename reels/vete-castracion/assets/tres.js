// Capa 3D de vete-castracion (Three.js r170 local). Base técnica: reels/vete-racion (globos pegados a la cámara en
// píxeles de pantalla, avatares y fotos por render target, poses por claves, bocas por envolvente, PLANOS con
// Catmull-Rom, insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de
// rAF, Date.now ni azar sin semilla.
// TRES lugares: la recepción de Veterinaria Inés (x = VX: mostrador, vidriera a la vereda, pizarra de cirugías, el
// inalámbrico), la sala de recuperación (x = RX: dos camillas, la lámpara de calor, la puerta del quirófano) y la cocina
// de Vero (x = 0).
//   PARTE 1: jueves 9:02, el teléfono ya suena: "¿Cómo está Toto?" / "Vero. Te estoy viendo." · 10:30, 12:00, 14:00 ·
//            15:30 la sala de recuperación: "Doctora. Vero quiere hablar con él." / "Está anestesiado." / "Dice que no
//            importa." · la pausa · el teléfono en la oreja de Toto, que ronca · "¡Ay, mi amor!" · "Ahora el de Coco."
//   PARTE 2: el mismo jueves con avisos: "Toto ingresó ✓" · "¡Ay, mirá! ¡Ya entró!" · el panel · el video del despertar ·
//            "Ahora el de Coco." (mandando el aviso) · "Bruno, ¿llamó alguien?" / "Nadie." · "¿Cómo está Toto?" /
//            "Preguntale a él." · Inés: "Comentá AVISOS…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet, saludo } from "./personajes.js";
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
const mesh = (g, m, x = 0, y = 0, z = 0, sx, sy = sx, sz = sx) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); if (sx !== undefined) o.scale.set(sx, sy, sz); o.castShadow = true; o.receiveShadow = true; return o; };
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
  const Wv = Wg * Math.min(1, s);   // (qa4) el ancho a la escala pedida (para una burbuja más chica)
  cx = Wv + 120 > 1080 ? 540 : cl(cx, Wv / 2 + 50, 1030 - Wv / 2);
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
// LOS SETS: la cocina de Vero (x = 0, Q3), la recepción de Veterinaria Inés (x = VX) con la vidriera a la vereda, la sala
// de recuperación (x = RX). Cada uno en su lugar del mundo; la cámara salta de uno a otro con los cortes.
// =====================================================================================================
const VX = 40, RX = 80;
M.gaz = mat(0x365f28, 0.85); M.acero = mat(0xb9bec4, 0.45, { metalness: 0.35 }); M.verde = mat(0x365f28, 0.8);
M.pared2 = mat(0x16243d, 0.9); M.gris = mat(0xb9bec4, 0.85); M.grisO = mat(0x8f969f, 0.8); M.vereda = mat(0xc9ccd0, 0.95);
M.latex = mat(0xefeee5, 0.45); M.gorro = mat(0x365f28, 0.9); M.barbijo = mat(0xcfe3e8, 0.9);
const azulejoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#365f28"; x.fillRect(0, 0, w, h); x.fillStyle = "#2c4f20"; for (let i = 0; i < 8; i++) { x.fillRect(0, i * 64, w, 4); x.fillRect(i * 64, 0, 4, h); } });
azulejoT.wrapS = azulejoT.wrapT = THREE.RepeatWrapping;
const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, h); x.fillStyle = "#d2d0c1"; for (let i = 0; i < 4; i++) x.fillRect(0, i * 128, w, 3); });
pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(5, 5);
const HW = 3.0, AZ = 1.8;
function pared(g, x0, x1, y0 = 0, y1 = HW) {
  const w = x1 - x0;
  if (y0 < AZ) { const hb = Math.min(AZ, y1) - y0, t = azulejoT.clone(); t.needsUpdate = true; t.repeat.set(w / 0.6, hb / 0.6); t.offset.set(0, (y0 % 0.6) / 0.6); const b = mesh(new THREE.BoxGeometry(w, hb, 0.2), [M.gaz, M.gaz, M.gaz, M.gaz, new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), M.gaz], (x0 + x1) / 2, y0 + hb / 2, -0.1); b.castShadow = false; g.add(b); }
  if (y1 > AZ) { const y = Math.max(AZ, y0), c = mesh(new THREE.BoxGeometry(w, y1 - y, 0.2), M.navy, (x0 + x1) / 2, (y + y1) / 2, -0.1); c.castShadow = false; g.add(c); }
}
const huella = (x, hx, hy, k = 1) => { x.beginPath(); x.ellipse(hx, hy + 30 * k, 52 * k, 42 * k, 0, 0, 7); x.fill(); for (const [dx, dy] of [[-56, -36], [-20, -66], [20, -66], [56, -36]]) { x.beginPath(); x.ellipse(hx + dx * k, hy + dy * k, 20 * k, 25 * k, 0, 0, 7); x.fill(); } };
// ---- LA RECEPCIÓN (x = VX): la pared del fondo (z = ZF) es azulejo a la izquierda y la VIDRIERA a la vereda a la derecha
// (con la puerta de calle); el mostrador adelante; la pizarra de cirugías y el cartel en la pared; la puerta QUIRÓFANO en
// la pared izquierda; las sillas de espera contra la pared derecha ----
const VET = new THREE.Group(); VET.position.x = VX; scene.add(VET);
const ZF = -2.2, XL = -2.4, XR = 2.4, VID0 = 0.3, VID1 = 1.72, PU0 = 1.78, PU1 = 2.36;
const MOS = { x: -0.25, z: -1.05, w: 1.7, d: 0.55, alto: 1.02 };
{
  const piso = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0, 0, 2.6); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; VET.add(piso);
  // el fondo: azulejo hasta la vidriera; abajo y arriba de la vidriera, pared
  { const g = new THREE.Group(); g.position.z = ZF; VET.add(g); pared(g, XL, VID0); pared(g, VID0, XR, 0, 0.5); pared(g, VID0, XR, 2.4, HW); pared(g, VID1, PU0, 0.5, 2.4); g.add(caja(VID0 - XL, 0.1, 0.03, M.navy3, (XL + VID0) / 2, 0.05, 0.015, 0.01)); }
  { const g = new THREE.Group(); g.position.x = XL; g.rotation.y = Math.PI / 2; VET.add(g); pared(g, -7.4, -1.55); pared(g, -1.55, -0.55, 2.15, HW); pared(g, -0.55, -ZF + 0.01); }
  { const g = new THREE.Group(); g.position.x = XR; g.rotation.y = -Math.PI / 2; VET.add(g); pared(g, ZF - 0.01, 7.4); }
  const techo = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, HW, 2.6); techo.rotation.x = Math.PI / 2; techo.castShadow = false; VET.add(techo);
  // el marco navy de la vidriera (barras de 9 cm) y el de la puerta de calle
  const mv = (w, h, x, y) => VET.add(caja(w, h, 0.1, M.navy3, x, y, ZF + 0.01, 0.01));
  mv(VID1 - VID0 + 0.1, 0.09, (VID0 + VID1) / 2, 0.5); mv(PU1 - VID0 + 0.06, 0.09, (VID0 + PU1) / 2, 2.4); mv(0.09, 1.95, VID0, 1.45); mv(0.09, 1.95, VID1, 1.45); mv(0.08, 2.4, PU0, 1.2); mv(0.08, 2.4, PU1, 1.2);
  mv(VID1 - VID0, 0.06, (VID0 + VID1) / 2, 1.0);   // el travesaño del vidrio (a la altura de la cintura de Vero)
  // el mostrador (frente navy3, tapa crema con canto verde)
  const mo = new THREE.Group(); mo.position.set(MOS.x, 0, MOS.z); VET.add(mo);
  mo.add(caja(MOS.w + 0.08, 0.05, MOS.d + 0.08, M.cr, 0, MOS.alto - 0.025, 0, 0.012));
  mo.add(caja(MOS.w, MOS.alto - 0.05, MOS.d, M.navy3, 0, (MOS.alto - 0.05) / 2, 0, 0.012));
  mo.add(caja(MOS.w - 0.1, 0.05, 0.02, M.g, 0, MOS.alto - 0.2, MOS.d / 2 + 0.005, 0.01));
  // la huellita crema en el frente del mostrador
  const hT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; huella(x, w / 2, h / 2 + 10, 1.3); });
  mo.add(plano(0.26, 0.26, hT, 0, 0.5, MOS.d / 2 + 0.004));
  // el cartel "VETERINARIA INÉS" arriba, sobre el azulejo
  const cartelT = lienzo(1400, 300, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "VETERINARIA INÉS", 800, 150, w - 330); x.fillText("VETERINARIA INÉS", 290, h / 2 + 10); huella(x, 150, h / 2 + 10); x.fillStyle = "#5ce611"; x.fillRect(40, h - 30, w - 80, 12); });
  VET.add(caja(1.62, 0.37, 0.04, M.navy3, -1.1, 2.42, ZF + 0.02, 0.01)); VET.add(plano(1.56, 0.334, cartelT, -1.1, 2.42, ZF + 0.045));
  // la puerta QUIRÓFANO (pared izquierda): marco navy3; la hoja de vaivén aparte (QHOJA)
  for (const z of [-1.55, -0.55]) VET.add(caja(0.1, 2.15, 0.08, M.navy3, XL + 0.04, 1.075, z, 0.01));
  VET.add(caja(0.1, 0.1, 1.08, M.navy3, XL + 0.04, 2.15, -1.05, 0.01));
  // las sillas de espera (tres, navy3 con asiento crema) contra la pared derecha
  for (let i = 0; i < 3; i++) { const s = new THREE.Group(); s.position.set(XR - 0.32, 0, -1.25 + i * 0.58); s.rotation.y = -Math.PI / 2; VET.add(s); s.add(caja(0.5, 0.06, 0.48, M.cr, 0, 0.46, 0, 0.02)); s.add(caja(0.5, 0.48, 0.05, M.navy3, 0, 0.72, -0.24, 0.02)); for (const [a, b] of [[-0.22, -0.2], [0.22, -0.2], [-0.22, 0.2], [0.22, 0.2]]) s.add(caja(0.035, 0.44, 0.035, M.navy3, a, 0.22, b, 0.008)); }
  // el estante de atrás del mostrador (collares y frascos) a la izquierda de la pizarra
  const st = new THREE.Group(); st.position.set(-2.05, 0, ZF + 0.18); VET.add(st);
  for (const y of [1.2, 1.62]) st.add(caja(0.6, 0.03, 0.3, M.cr, 0, y, 0, 0.008));
  for (let i = 0; i < 2; i++) { st.add(mesh(new THREE.TorusGeometry(0.06, 0.016, 8, 20), [M.g, M.red][i], -0.14 + i * 0.28, 1.29, 0.02)); st.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 18), M.cr2, -0.14 + i * 0.28, 1.715, 0)); st.add(mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 18), i % 2 ? M.g : M.navy3, -0.14 + i * 0.28, 1.81, 0)); }
  sombras(VET);
}
fusionar(VET);
// el vinilo crema de la vidriera (una franja con huellitas, sin texto: desde adentro se leería al revés) y el de la puerta
{
  const vT = lienzo(1024, 96, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.fillRect(0, 34, w, 16); for (let i = 0; i < 6; i++) huella(x, 90 + i * 170, 44, 0.42); });
  const v = new THREE.Mesh(new THREE.PlaneGeometry(VID1 - VID0 - 0.1, 0.1), new THREE.MeshBasicMaterial({ map: vT, transparent: true, toneMapped: false })); v.position.set(VX + (VID0 + VID1) / 2, 2.2, ZF + 0.02); scene.add(v);
}
// el vidrio de la vidriera: apenas celeste (sin reflejos: Instagram los rompe) para que se lea que Vero está afuera
const VIDRIO = new THREE.Mesh(new THREE.PlaneGeometry(VID1 - VID0, 1.9), new THREE.MeshBasicMaterial({ color: 0xcfe0ea, transparent: true, opacity: 0.22, depthWrite: false, toneMapped: false })); VIDRIO.position.set(VX + (VID0 + VID1) / 2, 1.45, ZF + 0.005); VIDRIO.renderOrder = 5; scene.add(VIDRIO);
// AFUERA: la vereda gris claro, el cordón, la calle, la casa de enfrente crema con ventanas navy y un árbol low-poly
const AFUERA = new THREE.Group(); AFUERA.position.x = VX; scene.add(AFUERA);
{
  const ve = mesh(new THREE.PlaneGeometry(9, 2.8), M.vereda, 0.5, 0.0, ZF - 1.4); ve.rotation.x = -Math.PI / 2; ve.castShadow = false; AFUERA.add(ve);
  AFUERA.add(caja(9, 0.12, 0.2, M.cr2, 0.5, 0.0, ZF - 2.85, 0.01));
  const ca = mesh(new THREE.PlaneGeometry(9, 4), M.grisO, 0.5, -0.06, ZF - 4.9); ca.rotation.x = -Math.PI / 2; ca.castShadow = false; AFUERA.add(ca);
  const fa = mesh(new THREE.PlaneGeometry(10, 4.5), new THREE.MeshBasicMaterial({ color: 0xe9dcc0 }), 0.5, 2.1, ZF - 6.6); fa.castShadow = false; AFUERA.add(fa);
  for (const x of [-1.6, 0.2, 2.0, 3.6]) { AFUERA.add(mesh(new THREE.PlaneGeometry(0.9, 1.1), new THREE.MeshBasicMaterial({ color: 0x1f3254 }), x, 2.0, ZF - 6.58)); AFUERA.add(mesh(new THREE.PlaneGeometry(0.9, 0.1), new THREE.MeshBasicMaterial({ color: 0xefeee5 }), x, 1.4, ZF - 6.57)); }
  // el árbol: tronco y copa de icosaedros verde apagado
  const ar = new THREE.Group(); ar.position.set(2.6, 0, ZF - 2.4); AFUERA.add(ar);
  ar.add(mesh(new THREE.CylinderGeometry(0.07, 0.1, 2.0, 8), mat(0x6b4a33, 0.9), 0, 1.0, 0));
  for (const [x, y, z, r] of [[0, 2.3, 0, 0.7], [-0.45, 2.0, 0.1, 0.5], [0.45, 2.05, -0.1, 0.5], [0.1, 2.75, 0.05, 0.45]]) ar.add(mesh(new THREE.IcosahedronGeometry(r, 0), mat([0x365f28, 0x2f5a22, 0x3f6b2e][Math.round(r * 10) % 3], 0.85, { flatShading: true }), x, y, z));
  sombras(AFUERA);
}
// el vidrio de la puerta de calle (hoja que abre hacia afuera) y su campanita
const PCALLE = new THREE.Group(); PCALLE.position.set(VX + PU0 + 0.04, 0, ZF + 0.01); scene.add(PCALLE);
{ PCALLE.add(caja(0.06, 2.3, 0.05, M.navy3, 0.02, 1.15, 0, 0.01)); PCALLE.add(caja(0.5, 0.06, 0.05, M.navy3, 0.27, 2.27, 0, 0.01)); PCALLE.add(caja(0.5, 0.06, 0.05, M.navy3, 0.27, 0.04, 0, 0.01)); PCALLE.add(caja(0.06, 2.3, 0.05, M.navy3, 0.52, 1.15, 0, 0.01)); PCALLE.add(caja(0.04, 0.3, 0.06, M.g, 0.45, 1.05, 0.03, 0.01)); sombras(PCALLE); }
// la hoja de vaivén del QUIRÓFANO en la recepción (pared izquierda) y en la sala de recuperación (pared del fondo)
function crearVaiven(ancho = 1.0, alto = 2.1) {
  const g = new THREE.Group();
  g.add(caja(ancho, alto, 0.06, M.navy3, ancho / 2, alto / 2, 0, 0.015));
  // el ojo de buey: aro crema con el vidrio navy oscuro
  const ojo = mesh(new THREE.TorusGeometry(0.15, 0.03, 10, 32), M.cr, ancho / 2, 1.42, 0.04); g.add(ojo);
  const vi = mesh(new THREE.CircleGeometry(0.15, 32), mat(0x0b1220, 0.2), ancho / 2, 1.42, 0.035); g.add(vi);
  const t = lienzo(640, 140, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "QUIRÓFANO", 900, 104, w - 30); x.fillText("QUIRÓFANO", w / 2, h / 2 + 4); });
  const v = new THREE.Mesh(new THREE.PlaneGeometry(ancho * 0.86, ancho * 0.86 * 140 / 640), new THREE.MeshBasicMaterial({ map: t, transparent: true })); v.position.set(ancho / 2, 1.82, 0.035); g.add(v);
  g.add(caja(0.12, 0.05, 0.05, M.cr2, ancho - 0.12, 1.0, 0.04, 0.01));
  return sombras(g);
}
const QHOJA = crearVaiven(0.98, 2.1); QHOJA.position.set(VX + XL + 0.06, 0, -0.56); QHOJA.rotation.y = Math.PI / 2; scene.add(QHOJA);

// ---- LA PIZARRA "CIRUGÍAS · JUEVES" (parte 1): blanca con marco navy, seis renglones en Caveat navy ----
const PIZ_P = V3(VX - 0.98, 1.7, ZF + 0.03);
const PIZARRA = new THREE.Group(); PIZARRA.position.copy(PIZ_P); scene.add(PIZARRA);
{
  const W = 1.05, H = 1.0;
  PIZARRA.add(caja(W + 0.08, H + 0.08, 0.04, M.navy3, 0, 0, 0, 0.012));
  const t = lienzo(840, 800, (x, w, h) => {
    x.fillStyle = "#f8f7f2"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "CIRUGÍAS · JUEVES", 900, 74, w - 50); x.fillText("CIRUGÍAS · JUEVES", w / 2, 68);
    x.fillStyle = "#0b1220"; x.textAlign = "left";
    ["TOTO", "COCO", "PANCHO", "SIMÓN", "NEGRO", "MORA"].forEach((n, i) => { const y = 200 + i * 104; x.font = CAV(100); x.fillText(n, 40, y + 6); x.font = CAV(66); x.fillStyle = "#16243d"; x.fillText("castración", 420, y + 10); x.fillStyle = "#0b1220"; });
  });
  PIZARRA.add(plano(W, H, t, 0, 0, 0.022));
  sombras(PIZARRA);
}

// ---- EL TELÉFONO INALÁMBRICO DE MOSTRADOR (EL objeto del dolor): base crema con luz, auricular navy3 con teclado crema,
// antena corta y pantallita verde apagado con el nombre de quien llama ----
const TEL_BASE_P = V3(VX + MOS.x - 0.48, MOS.alto, MOS.z + 0.08);
const TELB = new THREE.Group(); TELB.position.copy(TEL_BASE_P); TELB.rotation.y = 0.35; scene.add(TELB);
const luzBaseM = mat(0x8f969f, 0.4, { emissive: 0xfff3c8, emissiveIntensity: 0 });
{
  TELB.add(caja(0.17, 0.045, 0.2, M.cr, 0, 0.0225, 0, 0.02));
  const cuna = caja(0.11, 0.05, 0.08, M.cr2, 0, 0.06, -0.035, 0.018); cuna.rotation.x = -0.5; TELB.add(cuna);
  TELB.add(caja(0.035, 0.012, 0.035, luzBaseM, 0.05, 0.048, 0.065, 0.006));
  sombras(TELB);
}
const nombreTel = { txt: "", k: -1 };
const pantTelT = lienzo(240, 160, () => {});
function dibujarPantTel(txt, brillo) {
  const x = pantTelT.userData.x, w = 240, h = 160;
  x.fillStyle = brillo ? "#8fbf6a" : "#5d7f45"; x.fillRect(0, 0, w, h);
  if (txt) { x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 900, 64, w - 20); x.fillText(txt, w / 2, h / 2 + 3); }
  pantTelT.needsUpdate = true;
}
const TELK = 1.35;   // el auricular más grande que la vida real: que se lea en el celular
function crearAuricular() {
  const g = new THREE.Group(), h = new THREE.Group(); h.scale.setScalar(TELK); g.add(h);   // origen en el centro; el parlante arriba (+y), el micrófono abajo; mira a +z
  h.add(caja(0.058, 0.19, 0.03, M.navy3, 0, 0, 0, 0.013));
  h.add(mesh(new THREE.CylinderGeometry(0.008, 0.009, 0.05, 10), M.navy, 0.018, 0.115, -0.004));
  h.add(mesh(new THREE.SphereGeometry(0.009, 10, 8), M.navy, 0.018, 0.142, -0.004));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.044, 0.03), new THREE.MeshBasicMaterial({ map: pantTelT, toneMapped: false })); p.position.set(0, 0.048, 0.0155); h.add(p);
  for (let i = 0; i < 9; i++) h.add(caja(0.012, 0.008, 0.004, M.cr, -0.015 + (i % 3) * 0.015, 0.012 - Math.floor(i / 3) * 0.016, 0.0155, 0.002));
  for (let i = 0; i < 3; i++) h.add(caja(0.022, 0.003, 0.003, M.navy, 0, 0.082 - i * 0.006, 0.0155, 0.001));
  return sombras(g);
}
const TEL = crearAuricular(); scene.add(TEL); TEL.children.forEach((o) => o.scale.multiplyScalar(1));
// los tres arcos de "ring" (planos crema con borde navy, pegados al auricular, de cara a la cámara)
const RING = new THREE.Group(); scene.add(RING);
for (let i = 0; i < 3; i++) for (const s of [-1, 1]) {
  const a = new THREE.Mesh(new THREE.RingGeometry(0.06 + i * 0.035, 0.072 + i * 0.035, 24, 1, s > 0 ? -0.6 : Math.PI - 0.6, 1.2), new THREE.MeshBasicMaterial({ color: C.cr, side: THREE.DoubleSide, transparent: true, depthWrite: false }));
  a.userData.i = i; RING.add(a);
}

// ---- LA TRANSPORTADORA DE LUNA (de veterinaria-vacunas) y LA SEÑORA ----
const TRANS = new THREE.Group();
{
  TRANS.add(caja(0.34, 0.3, 0.48, M.cr, 0, 0.15, 0, 0.05)); TRANS.add(caja(0.36, 0.035, 0.08, M.navy3, 0, 0.31, 0, 0.015));
  const cara = crearCaraGato(); cara.position.set(0, 0.15, 0.17); cara.scale.setScalar(0.95); TRANS.add(cara);
  for (let i = 0; i < 5; i++) TRANS.add(caja(0.016, 0.24, 0.016, M.navy, -0.12 + i * 0.06, 0.15, 0.25, 0.004));
  for (const y of [0.06, 0.24]) TRANS.add(caja(0.28, 0.016, 0.016, M.navy, 0, y, 0.25, 0.004));
  sombras(TRANS); scene.add(TRANS);
}

// ---- LA SALA DE RECUPERACIÓN (x = RX): pared navy arriba y azulejo verde apagado abajo; dos camillas de acero con
// mantas; la lámpara de calor; la puerta del QUIRÓFANO al fondo a la derecha y la puerta abierta a la recepción a la
// izquierda (por donde se asoma Bruno). Sin instrumental. ----
const REC = new THREE.Group(); REC.position.x = RX; scene.add(REC);
const RZ = -2.0, RXL = -2.4, RXR = 2.4, PREC0 = -1.85, PREC1 = -0.85;   // el vano a la recepción en la pared del fondo
const CAM1 = { x: -0.05, z: -0.35, w: 1.15, d: 0.62, alto: 0.84 }, CAM2 = { x: 1.2, z: -1.3, w: 0.95, d: 0.56, alto: 0.84 };
{
  const piso = mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0, 0, 2.0); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; REC.add(piso);
  { const g = new THREE.Group(); g.position.z = RZ; REC.add(g); pared(g, RXL, PREC0); pared(g, PREC0, PREC1, 2.15, HW); pared(g, PREC1, RXR); }
  for (const s of [-1, 1]) { const g = new THREE.Group(); g.position.x = s * RXR; g.rotation.y = -s * Math.PI / 2; REC.add(g); pared(g, s > 0 ? RZ - 0.01 : -6, s > 0 ? 6 : -RZ + 0.01); }
  const techo = mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, HW, 2.0); techo.rotation.x = Math.PI / 2; techo.castShadow = false; REC.add(techo);
  // el vano a la recepción: marco navy3; detrás, un pedazo del pasillo (pared crema)
  for (const x of [PREC0, PREC1]) REC.add(caja(0.09, 2.15, 0.14, M.navy3, x, 1.075, RZ + 0.02, 0.01)); REC.add(caja(PREC1 - PREC0 + 0.09, 0.09, 0.14, M.navy3, (PREC0 + PREC1) / 2, 2.15, RZ + 0.02, 0.01));
  REC.add(mesh(new THREE.BoxGeometry(2.0, 2.4, 0.1), M.cr2, (PREC0 + PREC1) / 2, 1.2, RZ - 1.3)); const pp = mesh(new THREE.PlaneGeometry(1.4, 1.4), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), (PREC0 + PREC1) / 2, 0.001, RZ - 0.6); pp.rotation.x = -Math.PI / 2; REC.add(pp);
  for (const s of [-1, 1]) REC.add(mesh(new THREE.BoxGeometry(0.1, 2.4, 1.3), M.cr2, (s < 0 ? PREC0 : PREC1) + s * 0.05, 1.2, RZ - 0.65));
  // el marco de la puerta del quirófano (al fondo a la derecha)
  for (const x of [0.62, 1.66]) REC.add(caja(0.09, 2.2, 0.12, M.navy3, x, 1.1, RZ + 0.03, 0.01)); REC.add(caja(1.13, 0.09, 0.12, M.navy3, 1.14, 2.2, RZ + 0.03, 0.01));
  // las camillas: tapa de acero gris claro con canto, pata central y base; la manta encima (con pliegue y volumen)
  const camilla = (c, manta, borde) => {
    const g = new THREE.Group(); g.position.set(c.x, 0, c.z); REC.add(g);
    g.add(caja(c.w, 0.05, c.d, M.acero, 0, c.alto - 0.025, 0, 0.012));
    g.add(caja(c.w + 0.02, 0.03, 0.03, M.acero, 0, c.alto - 0.01, c.d / 2, 0.01)); g.add(caja(c.w + 0.02, 0.03, 0.03, M.acero, 0, c.alto - 0.01, -c.d / 2, 0.01));
    g.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, c.alto - 0.12, 16), M.acero, 0, (c.alto - 0.12) / 2 + 0.07, 0));
    g.add(caja(c.w * 0.6, 0.07, c.d * 0.7, M.grisO, 0, 0.035, 0, 0.02));
    const m = caja(c.w * 0.86, 0.05, c.d * 0.92, manta, 0, c.alto + 0.024, 0.0, 0.022); g.add(m);
    const pl = caja(c.w * 0.86, 0.03, 0.14, borde, 0, c.alto + 0.06, -c.d * 0.36, 0.014); g.add(pl);   // el pliegue doblado atrás
    g.add(caja(0.03, 0.035, c.d * 0.92, borde, -c.w * 0.43, c.alto + 0.026, 0, 0.01)); g.add(caja(0.03, 0.035, c.d * 0.92, borde, c.w * 0.43, c.alto + 0.026, 0, 0.01));
  };
  camilla(CAM1, M.cr, M.verde); camilla(CAM2, M.verde, M.cr);
  // un banquito navy3 y el perchero con dos ambos colgados (contra la pared izquierda)
  REC.add(caja(0.4, 0.05, 0.4, M.navy3, -1.95, 0.5, -0.9, 0.02)); REC.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.48, 10), M.navy3, -1.95, 0.25, -0.9));
  sombras(REC);
}
fusionar(REC);
const QHOJA2 = crearVaiven(0.98, 2.1); QHOJA2.position.set(RX + 0.65, 0, RZ + 0.04); scene.add(QHOJA2);
// la lámpara de calor colgante sobre la camilla de Toto: pantalla navy, luz crema plana
const LAMPC = new THREE.Group(); LAMPC.position.set(RX + CAM1.x + 0.15, HW, CAM1.z - 0.05); scene.add(LAMPC);
{ LAMPC.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.85, 6), M.navy, 0, -0.42, 0)); LAMPC.add(mesh(new THREE.CylinderGeometry(0.07, 0.24, 0.2, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0x1f3254, roughness: 0.6, side: THREE.DoubleSide }), 0, -0.93, 0)); LAMPC.add(mesh(new THREE.CircleGeometry(0.2, 28).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xfff1d2, side: THREE.DoubleSide }), 0, -1.02, 0)); }
const luzCalor = new THREE.PointLight(0xffe2b8, 0, 3.5, 1.6); luzCalor.position.set(RX + CAM1.x + 0.15, HW - 1.15, CAM1.z - 0.05); scene.add(luzCalor);

// ---- EL COLLAR ISABELINO (Toto y Coco): un cono truncado crema con el borde navy grueso, cerrado con una tira; va
// alrededor del cuello (pegado a la CABEZA), abierto hacia adelante: la boca queda adentro, adelante ----
function crearIsabelino() {
  const g = new THREE.Group();   // eje +z (hacia donde mira la cabeza); centro del aro chico en el origen
  const L = 0.22, r0 = 0.125, r1 = 0.245;
  const geo = new THREE.LatheGeometry([new THREE.Vector2(r0, 0), new THREE.Vector2(r1, L)], 40, 0, Math.PI * 2);
  geo.rotateX(Math.PI / 2);
  const cono = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xece9dc, roughness: 0.35, side: THREE.DoubleSide, transparent: true, opacity: 0.88 }));
  cono.castShadow = true; g.add(cono);
  const borde = mesh(new THREE.TorusGeometry(r1, 0.016, 10, 48), M.navy3, 0, 0, L); g.add(borde);
  const bordeC = mesh(new THREE.TorusGeometry(r0, 0.014, 10, 36), M.navy3, 0, 0, 0); g.add(bordeC);
  // la tira de cierre (navy) a lo largo, abajo, con los agujeritos
  const tira = new THREE.Mesh(rbox(0.05, 0.012, L * 1.02, 0.005, 1), M.navy3); tira.position.set(0, -(r0 + r1) / 2 - 0.004, L / 2); tira.rotation.x = Math.atan2(r1 - r0, L); g.add(tira);
  g.userData = { r0, r1, L };
  return g;
}
const ISA = [crearIsabelino(), crearIsabelino()];
// ---- LA TABLET EN SU ATRIL (parte 2) ----
const pantT = lienzo(1000, 760, () => {});
const tablet = crearTablet(pantT, 0.32, 0.24, 0.35); tablet.position.set(VX + MOS.x + 0.42, MOS.alto, MOS.z + 0.02); tablet.rotation.y = -0.25; scene.add(tablet);
const pantTM = lienzo(760, 560, () => {});   // la tablet en la mano de Bruno (Q1, Q3)
const tabletM = new THREE.Group(); { tabletM.add(caja(0.27, 0.2, 0.012, M.navy, 0, 0, 0, 0.012)); const p = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.18), new THREE.MeshBasicMaterial({ map: pantTM, toneMapped: false })); p.position.z = 0.0065; tabletM.add(p); const p2 = mesh(new THREE.CircleGeometry(0.006, 12), M.cr2, 0.1, 0.075, -0.0065); p2.rotation.y = Math.PI; tabletM.add(p2); scene.add(sombras(tabletM)); }
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
// =====================================================================================================
// LOS PERSONAJES, TOTO Y COCO
// =====================================================================================================
const bruno = crearPersonaje({ ...ELENCO.bruno, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p2a + 0.5), r2(T.q2 + 0.3), r2(T.q4 + 0.4)] });
// Vero de calle (campera navy2: la vereda y la recepción) y Vero de entrecasa (la cocina, Q3)
const vero = crearPersonaje({ ...ELENCO.vero, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.v12 + 1.1)] });
if (vero.campera) vero.campera.traverse((o) => { if (o.isMesh && o.geometry.type === "TorusGeometry") o.visible = false; });
const veroC = crearPersonaje({ ...ELENCO.vero, nombre: "Vero", campera: null, pantalon: MARCA.navy2, zapatos: MARCA.cr, pantuflas: { color: MARCA.cr, borde: MARCA.navy3, suela: MARCA.navy }, dedos: true, parpadeoCada: 999 });
// Inés de consultorio (ambo verde oscuro, sin gorro: el cierre) e Inés de cirugía (gorro, barbijo bajado al cuello, guantes)
const ines = crearPersonaje({ ...ELENCO.ines, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.c + 2.4)] });
const inesQ = crearPersonaje({ ...ELENCO.ines, nombre: "Inés", peinado: "corto", dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.6), r2(T.p4 + 0.15)] });
// la señora de Luna (sin voz)
const senora = crearPersonaje({ ...DEFECTO, nombre: "Señora", piel: PIEL.clara, pelo: PELO.canoso, peinado: "corto", cejasColor: 0xb9b6b0, camisa: MARCA.navy3, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, pantalon: 0x3a3f4a, nariz: 0.055, alto: 0.95, parpadeoCada: 999 });
const TODOS = [bruno, vero, veroC, ines, inesQ, senora];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// el estetoscopio navy de Inés (las dos)
for (const per of [ines, inesQ]) {
  const pts = [V3(-0.05, 0.31, 0.19), V3(-0.1, 0.44, 0.14), V3(-0.1, 0.53, 0.0), V3(0, 0.55, -0.1), V3(0.1, 0.53, 0.0), V3(0.1, 0.44, 0.14), V3(0.07, 0.36, 0.19)];
  if (per === ines) { per.cuerpo.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.011, 8), M.navy)); const c = mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.016, 20), M.metal, -0.05, 0.3, 0.2); c.rotation.x = Math.PI / 2 - 0.25; per.cuerpo.add(c); }
}
// Inés de cirugía: el gorro (casquete de tela verde apagado con el pliegue de la vincha, tapa todo el pelo), el barbijo
// bajado al cuello (tela celeste muy pálida con las tiras) y los guantes de látex crema
const GORRO = new THREE.Group();
{
  // gorro de TELA (no casco): un casquete bajo y blando, más largo atrás (tapa la nuca), con arrugas, la tira elástica
  // fina y el lazo atado atrás con las dos puntas que cuelgan
  const R = 0.3, CC = R * 0.92;
  GORRO.position.set(0, CC + R * 0.3, -0.035); GORRO.rotation.x = -0.26; inesQ.cabeza.add(GORRO);
  inesQ.cabeza.traverse((o) => { if (o.isMesh && o.material && o.material.color && o.material.color.getHex() === ELENCO.ines.pelo) o.visible = false; });   // el pelo queda adentro del gorro
  const geo = new THREE.SphereGeometry(1, 40, 20, 0, Math.PI * 2, 0, Math.PI * 0.56);
  { const p = geo.attributes.position; for (let k = 0; k < p.count; k++) { const x = p.getX(k), y = p.getY(k), z = p.getZ(k); const a = Math.atan2(z, x); const w = 1 + 0.035 * Math.sin(a * 7 + y * 3) * (1 - y); p.setXYZ(k, x * w, y, z * w); } geo.computeVertexNormals(); }
  const cas = mesh(geo, M.gorro, 0, 0, 0, R * 1.06, R * 0.86, R * 1.1); GORRO.add(cas);
  const tela2 = mat(0x2f5523, 0.95);
  const vin = mesh(new THREE.TorusGeometry(1, 0.022, 8, 48), tela2, 0, -R * 0.7 * Math.cos(Math.PI * 0.56) * -1, 0); vin.rotation.x = Math.PI / 2; vin.scale.set(R * 1.06 * Math.sin(Math.PI * 0.56), R * 1.1 * Math.sin(Math.PI * 0.56), R * 1.0); vin.position.y = R * 0.86 * Math.cos(Math.PI * 0.56); GORRO.add(vin);
  // el lazo atrás: el nudo y las dos puntas colgando
  const yb = R * 0.86 * Math.cos(Math.PI * 0.56), zb = -R * 1.1 * Math.sin(Math.PI * 0.56);
  GORRO.add(mesh(new THREE.SphereGeometry(1, 10, 8), tela2, 0, yb + 0.01, zb - 0.005, 0.03, 0.022, 0.02));
  for (const s2 of [-1, 1]) { const tira = mesh(rbox(0.032, 0.13, 0.008, 0.004, 1), tela2, s2 * 0.025, yb - 0.06, zb - 0.01); tira.rotation.set(0.25, 0, s2 * 0.25); GORRO.add(tira); }
}
const BARBIJO = new THREE.Group();
{
  // el barbijo bajado al cuello: celeste pálido, con los pliegues y las tiras (debajo del mentón, sobre el cuello del ambo)
  BARBIJO.position.set(0, 0.6, 0.035); BARBIJO.rotation.x = 0.2; inesQ.cuerpo.add(BARBIJO);
  const bm = new THREE.MeshStandardMaterial({ color: 0xcfe2e8, roughness: 0.9, side: THREE.DoubleSide });
  BARBIJO.add(mesh(new THREE.CylinderGeometry(0.125, 0.115, 0.1, 28, 1, true, -1.15, 2.3), bm));
  for (let k = 0; k < 3; k++) BARBIJO.add(mesh(new THREE.CylinderGeometry(0.1265, 0.1165, 0.007, 28, 1, true, -1.1, 2.2), new THREE.MeshStandardMaterial({ color: 0xa9c4cc, roughness: 0.9, side: THREE.DoubleSide }), 0, -0.03 + k * 0.03, 0));
  for (const s2 of [-1, 1]) { const t = mesh(new THREE.TorusGeometry(0.12, 0.006, 6, 20, 1.9), mat(0xcfe2e8, 0.9)); t.rotation.set(Math.PI / 2, 0, s2 > 0 ? -0.15 : Math.PI + 0.15 - 1.9); t.position.y = 0.03; BARBIJO.add(t); }
}
const GUANTES = [];
function ponerGuante(per, lado, on) { const b = per.brazos[lado === "I" ? 0 : 1]; b.mano.traverse((o) => { if (o.isMesh) { if (!o.userData.piel) o.userData.piel = o.material; o.material = on ? M.latex : o.userData.piel; } }); }
ponerGuante(inesQ, "I", true); ponerGuante(inesQ, "D", true);
// el guante que se saca (Q4): un bollito crema en la mano
const GUANTE_SUELTO = new THREE.Group(); { const g = mesh(new THREE.SphereGeometry(0.05, 12, 10), M.latex, 0, -0.04, 0.02); g.scale.set(0.8, 1.3, 0.6); GUANTE_SUELTO.add(g); for (let i = 0; i < 3; i++) { const d = mesh(new THREE.CylinderGeometry(0.012, 0.01, 0.07, 8), M.latex, -0.02 + i * 0.02, -0.12, 0.02); d.rotation.z = (i - 1) * 0.2; GUANTE_SUELTO.add(d); } scene.add(sombras(GUANTE_SUELTO)); }

const toto = crearPerro({ ...PERROS.toto, escala: 0.9 }); scene.add(toto.raiz);
const coco = crearPerro({ ...PERROS.coco }); scene.add(coco.raiz);
for (const d of [toto, coco]) d.raiz.traverse((o) => { if (o.isMesh) o.receiveShadow = false; });
// el collar isabelino va pegado a la cabeza de cada uno: el aro chico detrás de las orejas, abierto hacia el hocico
const ISA_POS = [0, -0.03, -0.11];
for (const [d, I] of [[toto, ISA[0]], [coco, ISA[1]]]) { I.position.set(...ISA_POS); d.cabeza.add(I); }
// el hocico de cada perro (para el ronquido: se infla apenas)
const hocico = (d) => d.cabeza.children[0].children[3];
// dormido: los ojos sin el brillo (se leen como dos líneas, no como ojos entreabiertos)
function dormir(d, on) { for (const g of d.cabeza.children[0].children) if (g.isGroup && g.children.length === 3 && g.children[1].material && g.children[1].material.isMeshBasicMaterial) { g.children[1].visible = !on; g.children[2].visible = !on; } }
// la correa de Toto (verde oscuro)
const CORREA = [0, 1].map(() => { const m = mesh(new THREE.CylinderGeometry(1, 1, 1, 8).translate(0, 0.5, 0), mat(0x2f6b1f, 0.6)); m.castShadow = false; scene.add(m); return m; });
function ponerCorrea(a, b, on, caida = 0.25) {
  for (const m of CORREA) m.visible = on; if (!on) return;
  const mid = a.clone().lerp(b, 0.5); mid.y -= Math.min(caida, a.distanceTo(b) * 0.2);
  entre(CORREA[0], a, mid, 0.009); entre(CORREA[1], mid, b, 0.009);
}
// el celular de Vero (la vereda: en la oreja; Q1 en la mano; Q3 en la cocina)
const pantCel = lienzo(400, 820, () => {});
const celuV = crearCelular(pantCel, C.navy2, 0.08, 0.162); celuV.scale.setScalar(1.25); scene.add(celuV);

// ---- FOTOS para los avisos: cuadros renderizados del mismo 3D (Toto en el mostrador; Toto dormido con el collar) ----
function fotoRT(W, H, armar, camPos, mira, fondo, fov = 30) {
  const rt = new THREE.WebGLRenderTarget(W, H); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene(); esc.background = new THREE.Color(fondo);
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a80, 2.0)); const dl = new THREE.DirectionalLight(0xffffff, 1.7); dl.position.set(1, 3, 3); esc.add(dl);
  esc.environment = scene.environment;
  const cam = new THREE.PerspectiveCamera(fov, W / H, 0.05, 20); cam.position.set(...camPos); cam.lookAt(...mira);
  const deshacer = armar(esc);
  renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
  const px = new Uint8Array(W * H * 4); renderer.readRenderTargetPixels(rt, 0, 0, W, H, px);
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d");
  const id = x.createImageData(W, H);
  for (let y = 0; y < H; y++) id.data.set(px.subarray((H - 1 - y) * W * 4, (H - y) * W * 4), y * W * 4);
  x.putImageData(id, 0, 0);
  deshacer(); rt.dispose();
  return cv;
}
// mover un objeto a la escena de la foto y devolverlo después
const prestar = (esc, o, pos, rotY = 0) => { const padre = o.parent, p0 = o.position.clone(), r0 = o.rotation.clone(), v0 = o.visible; esc.add(o); o.position.copy(pos); o.rotation.set(0, rotY, 0); o.visible = true; o.updateMatrixWorld(true); return () => { o.position.copy(p0); o.rotation.copy(r0); o.visible = v0; if (padre) padre.add(o); }; };
const FOTO = {};
{
  // 1) Toto sentado en el mostrador de la recepción (la tapa crema y el frente navy), con la correa
  FOTO.ingreso = fotoRT(640, 480, (esc) => {
    ISA[0].visible = false; toto.poner({ sentado: 1, orejas: 0.85, cola: 0.4, cejas: 0.4, jadeo: 0.6, cabeza: { giro: 0.15, asiente: -0.05, ladea: 0.12 }, t: 0.4 });
    const tapa = mesh(rbox(1.6, 0.05, 0.6, 0.012), M.cr, 0, -0.03, 0); esc.add(tapa); const fr = mesh(rbox(1.6, 0.6, 0.55, 0.012), M.navy3, 0, -0.35, 0); esc.add(fr);
    const pz = mesh(new THREE.PlaneGeometry(3, 2), M.gaz, 0, 0.6, -0.6); esc.add(pz);
    const d = prestar(esc, toto.raiz, V3(0, 0, 0), 0.25); return () => { d(); esc.remove(tapa, fr, pz); };
  }, [0.25, 0.62, 1.55], [0, 0.42, 0], 0x365f28, 34);
  // 2) Toto dormido con el collar sobre la manta (el cuadro del video "Despertando" y de "En cirugía")
  FOTO.dormido = fotoRT(640, 480, (esc) => {
    ISA[0].visible = true; toto.poner({ echado: 1, orejas: 0.15, cola: 0.0, colaAlta: 0.3, cejas: 0, ojos: { abiertos: 0.45 }, cabeza: { giro: 0.35, asiente: 0.15, ladea: 0.25 }, t: 0.4 });
    const manta = mesh(rbox(1.6, 0.05, 1.0, 0.02), M.cr, 0, -0.025, 0); esc.add(manta); const pl = mesh(rbox(1.6, 0.03, 0.14, 0.012), M.verde, 0, 0.01, -0.45); esc.add(pl);
    const d = prestar(esc, toto.raiz, V3(0, 0, 0), 0.9); return () => { d(); esc.remove(manta, pl); };
  }, [0.55, 0.85, 1.35], [0.1, 0.22, 0], 0x16243d, 36);
  ISA[0].visible = true;
}
// el avatar redondo de cada paciente (para el panel): la cabeza del perro / la gata
const AVATAR = {};
{
  const cabeza = (d, fondo, conIsa = false) => fotoRT(256, 256, (esc) => { ISA[d === toto ? 0 : 1].visible = conIsa; d.poner({ sentado: 1, orejas: 0.85, cola: 0, t: 0.3 }); const dz = prestar(esc, d.raiz, V3(0, 0, 0)); return dz; }, [0.08, 0.95 * d.cfg.escala + 0.02, 1.1 * d.cfg.escala], [0, 0.9 * d.cfg.escala, 0], fondo, 30);
  AVATAR.toto = cabeza(toto, 0xcfeebc); AVATAR.coco = cabeza(coco, 0xd9d7c9);
  for (const I of ISA) I.visible = true;
}
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
function inserto(fondo, IW, IH, cy, marco, opc = {}) { const I = { g: new THREE.Group() }; crearFondoInserto(I.g, opc.sinPiso ? [fondo[0], fondo[1], fondo[1]] : fondo); const c = crearCelInserto(IW, IH, 540, cy, marco, opc); if (opc.esc) { c.g.scale.setScalar(opc.esc); c.g.position.set(0, -((960 - cy) / PXK) * (opc.esc - 1), 0); } I.g.add(c.g);   // (qa4) esc: más grande; sinPiso: sin la franja gris de abajo
  I.tex = c.tex; I.IW = IW; I.IH = IH; pegarACamara(I.g, camera, 10); I.g.visible = false; return I; }
const chip = (txt, px = 62, fondo = "#16243d", tinta = "#efeee5") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo }); };
// =====================================================================================================
// LA INTERFAZ: los avisos en el celular de Vero (Ingresó, Despertando, Listo), el panel "Pacientes de hoy" (tablet), la
// pantallita del inalámbrico (P5) y la tablet en la mano de Bruno (cámara)
// =====================================================================================================
const NAV = "#0b1220", NAV2 = "#16243d", NAV3 = "#1f3254", CRM = "#efeee5", CR2 = "#d9d7c9", VRD = "#5ce611", VERD = "#3fa60a", ROJ = "#c7655b";
// el avatar de la veterinaria: círculo verde con la huellita navy
const AV_VET = (() => { const c = document.createElement("canvas"); c.width = c.height = 256; const x = c.getContext("2d"); x.fillStyle = VRD; x.fillRect(0, 0, 256, 256); x.fillStyle = NAV; huella(x, 128, 128, 1.25); return c; })();
// el avatar de un paciente sin foto 3D (Pancho, Simón, Negro, Mora): la cabeza de perro plana en su color
const avPerro = (fondo, color, oreja) => { const c = document.createElement("canvas"); c.width = c.height = 256; const x = c.getContext("2d"); x.fillStyle = fondo; x.fillRect(0, 0, 256, 256); x.fillStyle = oreja; x.beginPath(); x.ellipse(70, 110, 34, 64, 0.3, 0, 7); x.fill(); x.beginPath(); x.ellipse(186, 110, 34, 64, -0.3, 0, 7); x.fill(); x.fillStyle = color; x.beginPath(); x.ellipse(128, 136, 80, 76, 0, 0, 7); x.fill(); x.fillStyle = "#efe6d6"; x.beginPath(); x.ellipse(128, 176, 46, 34, 0, 0, 7); x.fill(); x.fillStyle = NAV; x.beginPath(); x.ellipse(128, 160, 16, 11, 0, 0, 7); x.fill(); for (const s of [-1, 1]) { x.beginPath(); x.arc(128 + s * 32, 120, 9, 0, 7); x.fill(); } return c; };
AVATAR.pancho = avPerro("#cfeebc", "#2a2624", "#1a1716"); AVATAR.simon = avPerro("#d9d7c9", "#c8894a", "#9a6232"); AVATAR.negro = avPerro("#cfeebc", "#3a3532", "#1a1716"); AVATAR.mora = avPerro("#d9d7c9", "#8d8c8c", "#5d5c5c");
// la foto dentro de un recuadro redondeado con borde navy
function foto(x, cv, X, Y, W, H, R = 22) { x.save(); x.beginPath(); x.roundRect(X, Y, W, H, R); x.clip(); const k = Math.max(W / cv.width, H / cv.height); x.drawImage(cv, X + (W - cv.width * k) / 2, Y + (H - cv.height * k) / 2, cv.width * k, cv.height * k); x.restore(); x.strokeStyle = NAV; x.lineWidth = 6; x.beginPath(); x.roundRect(X, Y, W, H, R); x.stroke(); }
const okCirc = (x, cx, cy, r, fondo = VRD) => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); tilde(x, cx + 1, cy + 1, r, NAV); };
// el chat de la veterinaria en el celular de Vero. tipo: "ingreso" | "despierta" | "listo"; k: avance del video (0..1)
function dibujarAviso(x, W, H, tipo, k = 0) {
  x.fillStyle = CRM; x.fillRect(0, 0, W, H);
  cabecera(x, W, "Veterinaria Inés", "Avisos de Toto", AV_VET);
  const dia = tipo === "listo" ? "Hoy 17:00" : tipo === "despierta" ? "Hoy 15:30" : "Hoy 9:05";
  x.font = F(800, 40); const dw = x.measureText(dia).width + 60; x.fillStyle = CR2; rr(x, W / 2 - dw / 2, 222, dw, 64, 32); x.fillStyle = NAV2; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(dia, W / 2, 255);
  let y = 316;
  // la burbuja del aviso (blanca, borde navy)
  const bx = 24, bw = W - 48;
  const titulo = tipo === "ingreso" ? "Toto ingresó" : tipo === "despierta" ? "Toto está despertando" : "Toto está listo para retirar";
  x.font = F(900, 60); const lt = renglones(x, titulo, bw - 150);
  const fotoH = tipo === "listo" ? 0 : 600;
  const cuerpo = tipo === "ingreso" ? ["Lo opera la Dra. Inés.", "Te avisamos en cada paso."] : tipo === "despierta" ? ["Ya salió de la cirugía.", "Está tranquilo."] : [];
  x.font = F(700, 46); const lc = cuerpo.flatMap((l) => renglones(x, l, bw - 70));
  const ind = tipo === "listo" ? ["Collar puesto", "Reposo hoy", "Control: lunes 10:00"] : [];
  const bh = 30 + (fotoH ? fotoH + 26 : 0) + lt.length * 72 + (lc.length ? 14 + lc.length * 58 : 0) + (ind.length ? 30 + 62 + ind.length * 70 : 0) + 34;
  x.fillStyle = "#ffffff"; x.strokeStyle = NAV2; x.lineWidth = 6; x.beginPath(); x.roundRect(bx, y, bw, bh, [10, 34, 34, 34]); x.fill(); x.stroke();
  let yy = y + 28;
  if (fotoH) {
    const fx = bx + 26, fw = bw - 52;
    foto(x, tipo === "ingreso" ? FOTO.ingreso : FOTO.dormido, fx, yy, fw, fotoH);
    if (tipo === "despierta") {
      // el video: el ▶ (o la pausa) en el medio y la barra de avance abajo
      const cx = fx + fw / 2, cy = yy + fotoH / 2;
      x.fillStyle = "rgba(11,18,32,0.55)"; x.beginPath(); x.arc(cx, cy, 70, 0, 7); x.fill();
      x.fillStyle = CRM; if (k <= 0) { x.beginPath(); x.moveTo(cx - 22, cy - 34); x.lineTo(cx + 36, cy); x.lineTo(cx - 22, cy + 34); x.closePath(); x.fill(); } else { x.fillRect(cx - 26, cy - 32, 18, 64); x.fillRect(cx + 8, cy - 32, 18, 64); }
      x.fillStyle = "rgba(11,18,32,0.65)"; x.fillRect(fx + 20, yy + fotoH - 50, fw - 40, 14); x.fillStyle = VRD; x.fillRect(fx + 20, yy + fotoH - 50, (fw - 40) * k, 14);
      x.fillStyle = NAV; x.beginPath(); x.roundRect(fx + 20, yy + 20, 150, 54, 27); x.fill(); x.fillStyle = CRM; x.font = F(800, 36); x.textAlign = "center"; x.fillText("0:0" + Math.min(5, Math.floor(k * 5)), fx + 95, yy + 48);
    }
    yy += fotoH + 26;
  }
  x.textAlign = "left"; x.textBaseline = "middle";
  lt.forEach((l, i) => { x.fillStyle = NAV; x.font = F(900, 60); x.fillText(l, bx + 32, yy + 34 + i * 72); });
  okCirc(x, bx + bw - 66, yy + 34, 36);
  yy += lt.length * 72;
  if (lc.length) { yy += 14; x.fillStyle = NAV2; x.font = F(700, 46); lc.forEach((l, i) => x.fillText(l, bx + 32, yy + 28 + i * 58)); yy += lc.length * 58; }
  if (ind.length) {
    yy += 30; x.fillStyle = NAV2; x.font = F(800, 44); x.fillText("Indicaciones de la Dra. Inés:", bx + 32, yy + 30); yy += 62;
    ind.forEach((l, i) => { const cy = yy + 34 + i * 70; okCirc(x, bx + 62, cy, 26, "#cfeebc"); x.fillStyle = NAV; x.font = F(800, 50); x.fillText(l, bx + 104, cy + 2); });
  }
  // la hora del mensaje
  x.fillStyle = "#8f969f"; x.font = F(700, 34); x.textAlign = "right"; x.fillText(tipo === "listo" ? "17:00" : tipo === "despierta" ? "15:30" : "9:05", bx + bw - 24, y + bh - 24);
  // listo: arriba, el recorrido de las etapas ya hechas
  if (tipo === "listo") {
    y = y + bh + 30; x.fillStyle = "#cfeebc"; x.strokeStyle = VERD; x.lineWidth = 5; x.beginPath(); x.roundRect(bx, y, bw, 120, 30); x.fill(); x.stroke();
    x.fillStyle = NAV; x.textAlign = "center"; ajustar(x, "Ingresó ✓  En cirugía ✓  Despertando ✓", 800, 40, bw - 40); x.fillText("Ingresó ✓  En cirugía ✓  Despertando ✓", W / 2, y + 62);
  }
}
// el panel "Pacientes de hoy" (tablet). e = { toto, coco: etapa (0 Esperando, 1 Ingresó, 2 En cirugía, 3 Despertando, 4
// Listo), toque: fila tocada (-1 nada), aviso: texto del aviso enviado | "", llam: null | { gira 0..1 }, atendidas: 0/1 }
const ETAPAS = ["Esperando", "Ingresó", "En cirugía", "Despertando", "Listo"];
const ETAPA_C = [["#ffffff", "#8f969f", "#8f969f"], ["#ffffff", NAV2, NAV2], [NAV2, CRM, NAV2], ["#cfeebc", NAV, VERD], [VRD, NAV, NAV]];
const PAC = [["toto", "Toto", "Vero"], ["coco", "Coco", "Julio"], ["pancho", "Pancho", "Ana"], ["simon", "Simón", "Raúl"], ["negro", "Negro", "Laura"], ["mora", "Mora", "Pablo"]];
function dibujarPanel(x, W, H, e) {
  x.fillStyle = CRM; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = NAV2; x.fillRect(0, 0, W, 140); x.fillStyle = VRD; x.fillRect(0, 140, W, 10);
  x.fillStyle = CRM; x.textAlign = "left"; ajustar(x, "Pacientes de hoy · 6", 900, 66, W - 300); x.fillText("Pacientes de hoy · 6", 34, 74);
  x.textAlign = "right"; x.font = F(700, 44); x.fillText("Jueves", W - 34, 76);
  // la línea de etapas
  const et = ["Ingresó", "En cirugía", "Despertando", "Listo"];
  x.font = F(800, 38); let ex = 34; const ey = 200;
  et.forEach((t, i) => { const w = x.measureText(t).width + 40; const [f, tx, b] = ETAPA_C[i + 1]; x.fillStyle = f; x.strokeStyle = b; x.lineWidth = 4; x.beginPath(); x.roundRect(ex, ey - 32, w, 64, 32); x.fill(); x.stroke(); x.fillStyle = tx; x.textAlign = "center"; x.fillText(t, ex + w / 2, ey + 2); ex += w + (i < 3 ? 30 : 0); if (i < 3) { x.fillStyle = NAV3; x.beginPath(); x.moveTo(ex - 24, ey - 10); x.lineTo(ex - 10, ey); x.lineTo(ex - 24, ey + 10); x.fill(); } });
  const etapa = { toto: e.toto, coco: e.coco, pancho: e.coco >= 2 ? 2 : 1, simon: 1, negro: 0, mora: 0 };
  PAC.forEach(([k, n, d], i) => {
    const y = 252 + i * 100, h = 88, tocada = e.toque === i;
    x.fillStyle = tocada ? "#e3f5d6" : "#ffffff"; x.strokeStyle = tocada ? VERD : "#b4b2a3"; x.lineWidth = tocada ? 7 : 4; x.beginPath(); x.roundRect(24, y, W - 48, h, 22); x.fill(); x.stroke();
    avatar(x, AVATAR[k], 84, y + h / 2, 38);
    x.fillStyle = NAV; x.textAlign = "left"; x.font = F(900, 50); x.fillText(n, 140, y + h / 2 + 2); const nw = x.measureText(n).width;
    x.fillStyle = "#5a6070"; x.font = F(700, 38); x.fillText("· " + d, 140 + nw + 14, y + h / 2 + 3);
    const s = etapa[k], [f, tx, b] = ETAPA_C[s], txt = ETAPAS[s] + (s >= 1 && s !== 2 ? " ✓" : "");
    x.font = F(800, 40); const cw = x.measureText(txt).width + 46;
    x.fillStyle = f; x.strokeStyle = b; x.lineWidth = 4; x.beginPath(); x.roundRect(W - 48 - cw, y + 16, cw, h - 32, (h - 32) / 2); x.fill(); x.stroke();
    x.fillStyle = tx; x.textAlign = "center"; x.fillText(txt, W - 48 - cw / 2, y + h / 2 + 2);
    if (tocada) { x.fillStyle = "rgba(11,18,32,0.22)"; x.beginPath(); x.arc(W - 48 - cw / 2, y + h / 2, 46, 0, 7); x.fill(); }
  });
  let yb = 252 + 6 * 100 + 10;
  if (e.aviso) {
    x.fillStyle = NAV2; x.beginPath(); x.roundRect(24, yb, W - 48, 120, 30); x.fill();
    okCirc(x, 92, yb + 60, 38); x.fillStyle = CRM; x.textAlign = "left"; ajustar(x, e.aviso, 800, 52, W - 200); x.fillText(e.aviso, 150, yb + 62);
    yb += 140;
  }
  if (e.llam) {
    x.fillStyle = "#ffffff"; x.strokeStyle = NAV; x.lineWidth = 6; x.beginPath(); x.roundRect(24, yb, W - 48, 140, 26); x.fill(); x.stroke();
    x.fillStyle = NAV2; x.textAlign = "left"; ajustar(x, "Llamadas hoy", 800, 58, W * 0.55); x.fillText("Llamadas hoy", 60, yb + 72);
    const g = e.llam.gira, sx = Math.abs(Math.cos(g * Math.PI)), v = g < 0.5 ? "34" : "3", col = g < 0.5 ? ROJ : VERD;
    x.save(); x.translate(W - 140, yb + 72); x.scale(Math.max(0.05, sx), 1); x.fillStyle = col; x.textAlign = "center"; x.font = F(900, 104); x.fillText(v, 0, 4); x.restore();
    yb += 160;
  }
  if (e.atendidas) { x.fillStyle = VRD; x.strokeStyle = NAV; x.lineWidth = 6; x.beginPath(); x.roundRect(24, yb, W - 48, 120, 30); x.fill(); x.stroke(); x.fillStyle = NAV; x.textAlign = "left"; ajustar(x, "Consultas atendidas", 900, 58, W - 200); x.fillText("Consultas atendidas", 60, yb + 62); okCirc(x, W - 96, yb + 60, 38, CRM); }
}
// la tablet en la mano de Bruno: la cámara (la foto de Toto con el botón)
function dibujarCamara(x, W, H, cv, grabando) {
  x.fillStyle = NAV; x.fillRect(0, 0, W, H);
  const k = Math.max(W / cv.width, H / cv.height); x.drawImage(cv, (W - cv.width * k) / 2, (H - cv.height * k) / 2, cv.width * k, cv.height * k);
  x.strokeStyle = CRM; x.lineWidth = 6; for (const [a, b, c, d] of [[40, 40, 1, 1], [W - 40, 40, -1, 1], [40, H - 40, 1, -1], [W - 40, H - 40, -1, -1]]) { x.beginPath(); x.moveTo(a, b + d * 60); x.lineTo(a, b); x.lineTo(a + c * 60, b); x.stroke(); }
  x.fillStyle = CRM; x.beginPath(); x.arc(W - 70, H / 2, 46, 0, 7); x.fill(); x.fillStyle = grabando ? ROJ : CRM; x.strokeStyle = NAV; x.lineWidth = 6; x.beginPath(); x.arc(W - 70, H / 2, 34, 0, 7); x.fill(); x.stroke();
}
// ---- los insertos pegados a la cámara (fondo plano del set) ----
const FONDO_COC = [0x16243d, 0x1f3254, 0xd9d7c9];
const INS_AV1 = inserto(FONDO_DIA, 860, 1320, 1090, 34, { camara: true, funda: 0x16243d });
const INS_AV3 = inserto(FONDO_COC, 860, 1320, 1090, 34, { camara: true, funda: 0x16243d });
const INS_AV5 = inserto(FONDO_DIA, 860, 1320, 1090, 34, { camara: true, funda: 0x16243d });
const INS_PANEL = inserto(FONDO_VET, 1000, 1290, 1080, 18, { sinPiso: true });
// la pantallita del inalámbrico (P5): el auricular dibujado grande, sonando
const INS_TEL = { g: new THREE.Group() };
{
  crearFondoInserto(INS_TEL.g, [0x16243d, 0x365f28, 0x365f28]);
  const tex = lienzo(900, 1500, () => {}); INS_TEL.tex = tex; INS_TEL.IW = 900; INS_TEL.IH = 1500;
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.5), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false })); p.position.set(0, -0.14, -0.02); INS_TEL.g.add(p);
  pegarACamara(INS_TEL.g, camera, 10); INS_TEL.g.visible = false;
}
function dibujarTelGrande(k) {
  const x = INS_TEL.tex.userData.x, W = 900, H = 1500; x.clearRect(0, 0, W, H);
  const vib = Math.sin(k * 60) * 6;
  x.save(); x.translate(W / 2 + vib, 820); x.rotate(-0.08 + Math.sin(k * 45) * 0.015);
  // los arcos del ring
  x.strokeStyle = CRM; x.lineCap = "round";
  for (let i = 0; i < 3; i++) { const a = 0.5 + 0.5 * Math.sin(k * 14 - i * 1.2); x.globalAlpha = 0.35 + 0.65 * a; x.lineWidth = 22; for (const s of [-1, 1]) { x.beginPath(); x.arc(0, -560, 230 + i * 70, s > 0 ? -0.55 : Math.PI - 0.55, (s > 0 ? -0.55 : Math.PI - 0.55) + 1.1); x.stroke(); } }
  x.globalAlpha = 1;
  // el cuerpo navy3 con borde navy, la antena, la pantallita, el teclado crema
  x.fillStyle = NAV; x.beginPath(); x.roundRect(-240 + 14, -620 + 18, 480, 1240, 120); x.fill();
  x.fillStyle = NAV3; x.strokeStyle = NAV; x.lineWidth = 14; x.beginPath(); x.roundRect(-240, -620, 480, 1240, 120); x.fill(); x.stroke();
  x.fillStyle = NAV; x.beginPath(); x.roundRect(110, -760, 56, 170, 28); x.fill();
  for (let i = 0; i < 3; i++) { x.fillStyle = NAV; x.fillRect(-80, -560 + i * 24, 160, 10); }
  x.fillStyle = "#8fbf6a"; x.strokeStyle = NAV; x.lineWidth = 12; x.beginPath(); x.roundRect(-200, -440, 400, 270, 30); x.fill(); x.stroke();
  x.fillStyle = NAV; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "PAPÁ", 900, 104, 360); x.fillText("PAPÁ", 0, -360); ajustar(x, "DE COCO", 900, 92, 360); x.fillText("DE COCO", 0, -250);
  for (let i = 0; i < 12; i++) { const cx = -130 + (i % 3) * 130, cy = -60 + Math.floor(i / 3) * 140; x.fillStyle = CRM; x.beginPath(); x.roundRect(cx - 50, cy - 40, 100, 80, 24); x.fill(); }
  x.fillStyle = VRD; x.beginPath(); x.roundRect(-180, 500, 160, 80, 40); x.fill(); x.fillStyle = ROJ; x.beginPath(); x.roundRect(20, 500, 160, 80, 40); x.fill();
  x.restore();
  INS_TEL.tex.needsUpdate = true;
}
const INSERTOS = [INS_AV1, INS_AV3, INS_AV5, INS_PANEL, INS_TEL];
dibujarAviso(INS_AV1.tex.userData.x, INS_AV1.IW, INS_AV1.IH, "ingreso"); INS_AV1.tex.needsUpdate = true;
dibujarAviso(INS_AV5.tex.userData.x, INS_AV5.IW, INS_AV5.IH, "listo"); INS_AV5.tex.needsUpdate = true;
let cAv3 = "", cPanel = "", cT3 = "", cTM = "", cTel = -1;
function estadoPanel(t) {
  if (t < T.q3) return { toto: t >= T.tocaCir ? 2 : 1, coco: 1, toque: t >= T.tocaCir - 0.05 && t < T.enviadoCir + 0.25 ? 0 : -1, aviso: t >= T.enviadoCir ? "Aviso a Vero enviado · con foto" : "", llam: null, atendidas: 0 };
  return { toto: 3, coco: t >= T.tocaCoco ? 3 : 2, toque: t >= T.tocaCoco - 0.05 && t < T.enviadoCoco + 0.25 ? 1 : -1, aviso: t >= T.enviadoCoco ? "Aviso a Julio enviado · con video" : "", llam: t >= T.q4i ? { gira: Math.round(sg(t, T.giraN, T.giraN + 0.3) * 10) / 10 } : null, atendidas: t >= T.atendidas ? 1 : 0 };
}
function dibujarInterfaz(t) {
  const k3 = Math.round(sg(t, T.play, T.play + 1.6) * 20) / 20;
  if (`${k3}` !== cAv3) { cAv3 = `${k3}`; dibujarAviso(INS_AV3.tex.userData.x, INS_AV3.IW, INS_AV3.IH, "despierta", t >= T.play ? Math.max(0.02, k3) : 0); INS_AV3.tex.needsUpdate = true; }
  const eP = estadoPanel(t), kP = JSON.stringify(eP);
  if (kP !== cPanel) { cPanel = kP; dibujarPanel(INS_PANEL.tex.userData.x, INS_PANEL.IW, INS_PANEL.IH, eP); INS_PANEL.tex.needsUpdate = true; }
  // la tablet del mostrador (parte 2): el panel achicado
  const kT = t >= P2 ? JSON.stringify(eP) : "";
  if (kT !== cT3) { cT3 = kT; const x = pantT.userData.x; x.save(); x.scale(1000 / 1000, 760 / 1290); dibujarPanel(x, 1000, 1290, eP); x.restore(); pantT.needsUpdate = true; }
  // la tablet en la mano de Bruno: la cámara
  const kM = t < T.q2 ? "f" : "v";
  if (kM !== cTM) { cTM = kM; dibujarCamara(pantTM.userData.x, 760, 560, kM === "f" ? FOTO.ingreso : FOTO.dormido, kM === "v"); pantTM.needsUpdate = true; }
  // la pantallita del auricular: el nombre de quien llama (y se ilumina cuando suena)
  const nom = t >= T.ring5 - 0.05 && t < P1 ? "PAPÁ DE COCO" : t < P1 ? "VERO" : "";
  const br = sonando(t) ? 1 : 0;
  if (nom + br !== nombreTel.txt) { nombreTel.txt = nom + br; dibujarPantTel(nom, br); }
  if (planoActual === "P5i") { const kk = Math.round((t - T.p5i) * 30); if (kk !== cTel) { cTel = kk; dibujarTelGrande(t - T.p5i); } }
}
// el celular de Vero en 3D: el aviso "Ingresó" (la vereda, Q1) o el del video (la cocina, Q3)
let cCel = "";
function pantallaCel(tipo) { if (tipo === cCel) return; cCel = tipo; const x = pantCel.userData.x; x.save(); x.scale(400 / 860, 820 / 1320); dibujarAviso(x, 860, 1320, tipo, 0.5); x.restore(); pantCel.needsUpdate = true; }
// ¿el teléfono de mostrador está sonando en t? (P1 desde el cuadro 0 hasta que atiende; cada chip; P5 en la mano de Inés)
function sonando(t) {
  if (t >= P1) return false;
  if (t < T.atiende) return true;
  for (const m of T.mont) if (t >= m.ini && t < m.atiende) return true;
  return t >= T.ring5 && t < T.p5b + 0.3;
}

// =====================================================================================================
// LAS TARJETAS DE ESTE REEL (globos, globos de teléfono, chips, rótulos)
// =====================================================================================================
// el globo de TELÉFONO: borde punteado y el iconito del auricular adelante (se entiende sin sonido que sale del teléfono)
function crearGloboTel(lineas, px = 76) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const ic = px * 1.15;
  const anchoT = Math.max(...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.3 + ic), H = Math.round(lineas.length * px * 1.22 + px * 0.85);
  const g = crearTarjeta(Wg, H, (x, w, h) => {
    x.strokeStyle = NAV3; x.lineWidth = 6; x.setLineDash([16, 12]); x.beginPath(); x.roundRect(12, 12, w - 24, h - 24, Math.min(30, (h - 24) / 2)); x.stroke(); x.setLineDash([]);
    // el auricular: navy con la pantallita verde
    const ix = px * 0.45, iy = h / 2 - ic * 0.62;
    x.save(); x.translate(ix + ic * 0.32, h / 2); x.rotate(-0.35); x.fillStyle = NAV3; x.beginPath(); x.roundRect(-ic * 0.22, -ic * 0.62, ic * 0.44, ic * 1.24, ic * 0.14); x.fill(); x.fillStyle = "#8fbf6a"; x.fillRect(-ic * 0.14, -ic * 0.42, ic * 0.28, ic * 0.2); x.fillStyle = CRM; for (let i = 0; i < 6; i++) x.fillRect(-ic * 0.12 + (i % 2) * ic * 0.14, -ic * 0.1 + Math.floor(i / 2) * ic * 0.16, ic * 0.1, ic * 0.09); x.restore();
    lineas.forEach((l, i) => textoSel(x, l, ic + (w - ic) / 2 - px * 0.1, h / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  });
  g.userData.lineas = lineas; g.userData.px = px;
  return g;
}
const dibujarContador = (x, W, H, n) => { x.fillStyle = "#ffffff"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 54); x.fillText("Llamadas hoy", W / 2, 54); x.font = F(900, 120); x.fillText(String(n), W / 2, 156); };
const GL = {
  jue: chip("Jueves, 9:02. Cirugías.", 58), h1030: chip("10:30.", 84), h1200: chip("12:00.", 84), h1400: chip("14:00.", 84), h1530: chip("15:30.", 84),
  jue2: chip("Jueves, 9:02.", 62), h1100: chip("11:00.", 84), h1530b: chip("15:30.", 84), h1700: chip("17:00.", 84),
  cont: crearTarjeta(440, 220, (x, W, H) => dibujarContador(x, W, H, 2), { fondo: "#c7655b" }),
  v1: crearGloboTel(["¿Cómo está [Toto?]"], 70),
  b2: crearGlobo(["Vero.", "Te estoy [viendo.]"], 72),
  b3: crearGlobo(["Está [dormido.]"], 76), b4: crearGlobo(["Sigue [dormido.]"], 76), b5: crearGlobo(["Sí. Dormido.", "[Todavía.]"], 76),
  b6: crearGlobo(["Doctora. Vero quiere", "hablar con [él.]"], 64),
  i7: crearGlobo(["Está [anestesiado.]"], 70),
  b8: crearGlobo(["Dice que no [importa.]"], 70),
  r1: crearRotulo([["34 llamadas", "#ff9d92", 64], ["2 horas de teléfono", "#ff9d92", 54]], 54),
  r2: crearRotulo([["3 consultas que se fueron", "#ff9d92", 52], ["$ 4.500", "#ff9d92", 72]], 52),
  v9: crearGloboTel(["¡Ay, mi [amor!]"], 76),
  b10: crearGlobo(["Ahora el de [Coco.]"], 72),
  v12: crearGlobo(["¡Ay, mirá!", "¡Ya [entró!]"], 72),
  rAv1: crearRotulo([["Un aviso con foto"], ["en cada etapa"]], 54),
  rPanel: crearRotulo([["Un toque y le llega al dueño"]], 50),
  v9b: crearGloboTel(["¡Ay, mi [amor!]"], 76),
  rAv3: crearRotulo([["Despertando: con video"]], 52),
  b10b: crearGlobo(["Ahora el de [Coco.]"], 72),
  i13: crearGlobo(["Bruno, ¿llamó", "[alguien?]"], 70),
  b14: crearGlobo(["[Nadie.]"], 84),
  rLlam: crearRotulo([["Las llamadas de hoy"]], 52),
  rAv5: crearRotulo([["Listo, con las indicaciones"]], 50),
  v1b: crearGlobo(["¿Cómo está [Toto?]"], 74),
  b15: crearGlobo(["Preguntale a [él.]"], 74),
};
let contN = -1;
function ponerContador(n, cx, cy, s = 1) { if (n !== contN) { contN = n; redibujar(GL.cont, (x, W, H) => dibujarContador(x, W, H, n)); } ponerGlobo(GL.cont, cx, cy, s, null, 1); }
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];
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

const SECO = { ...CARA.neutra, ojos: { abiertos: 0.88, tension: 0.2, feliz: 0 }, cejas: { alto: -0.05, ang: -0.1 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const FELIZ = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, boca: { sonrisa: 0.95, abierta: 0.05, ancho: 1.15 } };
const DERRETIDA = { ...CARA.sonrisa, ojos: { abiertos: 0.8, feliz: 0.7 }, cejas: { alto: 0.55, ang: 0.6, asim: 0 }, boca: { sonrisa: 1, abierta: 0.1, ancho: 1.1 } };
const CANSADO = { ...CARA.neutra, ojos: { abiertos: 0.6, tension: 0.3 }, cejas: { alto: 0.1, ang: 0.5 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const GASTADO = { ...CARA.resignado, ojos: { abiertos: 0.45, tension: 0.6 } };
const MEDIA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.25, ang: 0.0, asim: 0.4 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } };

// =====================================================================================================
// LUGARES
// =====================================================================================================
const BRUNO_M = { x: VX - 0.55, z: -1.62 };          // Bruno detrás del mostrador
const TOTO_M = { x: VX + 0.25, z: -1.02 };           // Toto sentado sobre el mostrador (P1)
const VERO_A = { x: VX + 1.05, z: ZF - 1.15 };        // Vero en la vereda, del otro lado de la vidriera
const SILLAS = [{ x: VX + 0.9, z: ZF + 0.42 }, { x: VX + 1.42, z: ZF + 0.42 }];   // las sillas de espera (contra la vidriera, de frente)
const SEN_S = SILLAS[1];
const SEN_Q4 = { x: VX + 0.55, z: -0.42 };           // la señora en el mostrador (Q4)
const INES_R = { x: RX - 0.28, z: -1.0 };            // Inés detrás de la camilla de Toto
const BRUNO_PU = { x: RX - 1.35, z: RZ - 0.05 };     // Bruno asomado al vano
const BRUNO_R = { x: RX - 1.05, z: -0.5 };          // Bruno ya adentro, al lado de la camilla (P3c en adelante)
const BRUNO_R3 = { x: RX + 0.72, z: 0.05 };         // Bruno filmando (Q3), en la punta de la camilla
const TOTO_R = { x: RX - 0.18, y: CAM1.alto + 0.05, z: CAM1.z + 0.02 };   // Toto echado en la camilla, mirando a +x
const COCO_R = { x: RX + CAM2.x - 0.0 + 0.0, y: CAM2.alto + 0.05, z: CAM2.z + 0.04 };
const QPUERTA = { x: VX + XL + 0.35, z: -1.05 };     // delante de la puerta del quirófano (recepción)
const PCALLE_V = { x: VX + 2.07, z: ZF - 0.3 };      // la puerta de calle (afuera)
const VERO_Q5 = { x: VX + 0.75, z: -0.25 };           // Vero adentro, frente al mostrador
const TOTO_Q5 = { x: VX + 0.25, z: -0.1 };             // Toto sentado delante de Vero
const VERO_K = { x: -0.3, z: -0.12 };                 // la cocina

// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves | null (inserto)]; cada clave [t, px, py, pz, mx, my, mz, fov]
// =====================================================================================================
const CK = (globalThis.__CK || {});
const K0 = CK.K0 || [VX - 0.02, 1.58, 2.85, VX + 0.03, 1.32, -1.6, 53];              // el cuadro 0 (P1 = P2 = Q1)
const K1B = CK.K1B || [VX - 1.15, 1.75, 0.35, VX + 1.0, 1.4, -3.4, 38];          // por encima del hombro de Bruno: Vero en la vereda
const KR = CK.KR || [RX - 0.25, 2.15, 2.75, RX - 0.25, 1.05, -1.0, 56];                // la sala de recuperación (P3 = Q3)
const KRI = CK.KRI || [RX - 0.75, 1.75, 0.75, RX - 0.28, 1.45, -1.0, 40];            // contraplano de Inés
const KRB = CK.KRB || [RX + 0.25, 1.6, 1.45, RX - 0.95, 1.38, -0.6, 48];             // Bruno
const KR4 = CK.KR4 || [RX - 0.55, 1.95, 2.1, RX - 0.62, 1.15, -0.8, 55];            // la pausa: Inés, Bruno y Toto
const KTO = CK.KTO || [RX + 1.4, 1.45, -0.2, RX + 0.12, 1.08, -0.45, 46];         // primer plano de Toto con el teléfono
const KQ4 = CK.KQ4 || [VX - 1.2, 1.6, 2.3, VX + 0.05, 1.2, -1.0, 52];               // Bruno con la tablet y la señora (Q4)
const KQ4B = CK.KQ4B || [VX + 0.1, 1.65, 3.0, VX - 1.05, 1.25, -1.2, 62];   // la puerta del quirófano y Bruno detrás del mostrador en el mismo plano           // la puerta del quirófano: Inés sale
const KQ5 = CK.KQ5 || [VX - 1.2, 1.62, 2.15, VX + 0.32, 1.15, -0.8, 58];              // Vero entra; Toto trota
const KK = CK.KK || [0.75, 1.5, 2.4, -0.3, 1.2, -0.3, 44];                        // la cocina: Vero con el celular
const KC = CK.KC || [VX - 0.15, 1.5, 1.45, VX - 0.12, 1.36, -1.6, 46];                // el cierre
const off = (k, d) => k.map((v, i) => v + (d[i] ?? 0));
const PLANOS = [
  ["P1", 0, [[0, ...K0], [T.p1b, ...off(K0, [0, -0.02, -0.25, 0, 0, 0, 0])]]],
  ["P1b", T.p1b, [[T.p1b, ...K1B], [T.p2a, ...off(K1B, [0.03, 0, -0.08, 0, 0, 0, -1])]]],
  ["P2a", T.p2a, [[T.p2a, ...K0], [T.p2b, ...off(K0, [0, 0, -0.08, 0, 0, 0, 0])]]],
  ["P2b", T.p2b, [[T.p2b, ...off(K0, [-0.1, 0, -0.15, 0, 0, 0, 0])], [T.p2c, ...off(K0, [-0.1, 0, -0.23, 0, 0, 0, 0])]]],
  ["P2c", T.p2c, [[T.p2c, ...off(K0, [-0.2, -0.05, -0.3, -0.1, -0.05, 0, 0])], [T.p3, ...off(K0, [-0.22, -0.05, -0.5, -0.1, -0.05, 0, -1])]]],
  ["P3", T.p3, [[T.p3, ...KR], [T.p3b, ...off(KR, [0, 0, -0.2, 0, 0, 0, 0])]]],
  ["P3b", T.p3b, [[T.p3b, ...KRI], [T.p3c, ...off(KRI, [0, 0, -0.08, 0, 0, 0, -2])]]],
  ["P3c", T.p3c, [[T.p3c, ...KRB], [T.p4, ...off(KRB, [0, 0, -0.06, 0, 0, 0, -1])]]],
  ["P4", T.p4, [[T.p4, ...KR4], [T.p4b, ...off(KR4, [0, -0.03, -0.25, 0, 0, 0, -2])]]],
  ["P4b", T.p4b, [[T.p4b, ...KTO], [T.p5, ...off(KTO, [-0.05, 0, -0.08, 0, 0, 0, -3])]]],
  ["P5i", T.p5i, null],
  ["P5b", T.p5b, [[T.p5b, RX - 0.15, 2.15, 3.0, RX + 0.0, 1.05, -1.0, 62], [T.miraCoco, RX - 0.12, 2.12, 2.9, RX + 0.02, 1.05, -1.0, 61], [r2(T.roncaCoco + 0.1), RX + 0.75, 1.6, 0.7, RX + 1.2, 1.0, -1.3, 48], [P1, RX + 0.78, 1.58, 0.6, RX + 1.2, 1.0, -1.3, 46]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...K0], [T.q1i, ...off(K0, [0, 0, -0.15, 0, 0, 0, 0])]]],
  ["Q1i", T.q1i, null],
  ["Q1b", T.q1b, [[T.q1b, ...off(K0, [0.05, 0, -0.35, 0.05, 0, 0, -2])], [T.q2, ...off(K0, [0.05, 0, -0.45, 0.05, 0, 0, -2])]]],
  ["Q2i", T.q2i, null],
  ["Q3", T.q3, [[T.q3, RX + 0.25, 2.0, 2.6, RX + 0.25, 1.1, -0.6, 56], [T.q3k, RX + 0.25, 1.98, 2.4, RX + 0.25, 1.1, -0.6, 55]]],
  ["Q3i", T.q3i, null],
  ["Q3v", T.q3v, [[T.q3v, ...off(KK, [0, 0, -0.1, 0, 0, 0, -2])], [T.q4, ...off(KK, [0, 0, -0.2, 0, 0, 0, -4])]]],
  ["Q4", T.q4, [[T.q4, ...KQ4], [T.q4b, ...off(KQ4, [0, 0, -0.15, 0, 0, 0, 0])]]],
  ["Q4b", T.q4b, [[T.q4b, ...KQ4B], [T.q4i, ...off(KQ4B, [0, 0, -0.15, 0, 0, 0, -1])]]],
  ["Q4i", T.q4i, null],
  ["Q5i", T.q5i, null],
  ["Q5", T.q5, [[T.q5, ...KQ5], [T.c, ...off(KQ5, [0, 0, -0.25, 0, 0, 0, 0])]]],
  ["C", T.c, [[T.c, ...KC], [DUR, ...off(KC, [0, 0, -0.1, 0, 0, 0, 0])]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s), se saca`); PLANOS.splice(i, 1); } }

// =====================================================================================================
// EL TELÉFONO EN LA OREJA, EL CELULAR, LA TABLET: objetos que siguen a una cabeza o a una mano
// =====================================================================================================
// el auricular contra la oreja DERECHA de un personaje (espacio de la cabeza): el parlante en la oreja, el micrófono hacia
// la boca, la pantalla para afuera
const OREJA_D = (() => { const Y = V3(0, 0.55, -0.83).normalize(), Z = V3(-1, 0, 0), X = new THREE.Vector3().crossVectors(Y, Z).normalize(); const m = new THREE.Matrix4().makeBasis(X, Y, Z); return { q: new THREE.Quaternion().setFromRotationMatrix(m), c: V3(-0.34, 0.27, 0.04).addScaledVector(Y, -0.07 * TELK) }; })();
const _qh = new THREE.Quaternion();
function enOreja(obj, per, esc = 1) { per.raiz.updateMatrixWorld(true); obj.position.copy(per.cabeza.localToWorld(OREJA_D.c.clone())); per.cabeza.getWorldQuaternion(_qh); obj.quaternion.copy(_qh).multiply(OREJA_D.q); obj.scale.setScalar(esc); }
// en la mano (el auricular de pie en el puño, la pantalla hacia `mira`)
function enMano(obj, per, lado, inclina = 0.3, dy = 0.06) { const m = manoMundo(per, lado, _a); obj.position.copy(m).add(V3(0, dy, 0)); per.cuerpo.getWorldQuaternion(_qh); obj.quaternion.copy(_qh); obj.rotateX(-inclina); obj.scale.setScalar(1); }
// la base del auricular (acostado en la cuna)
function enBase(obj) { obj.position.copy(TELB.position).add(V3(0, 0.075, -0.015)); obj.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2 + 0.5, 0.35, 0, "YXZ")); obj.scale.setScalar(1); }
// la oreja de Toto (la izquierda, la caída: del lado de Inés) y la pose del auricular ahí: el parlante en la oreja, el
// micrófono hacia la boca del collar (afuera), la pantalla hacia Inés
function enOrejaToto(obj, u = 1) {
  toto.raiz.updateMatrixWorld(true);
  const f = V3(0, 0, 1).transformDirection(toto.cabeza.matrixWorld), l = V3(1, 0, 0).transformDirection(toto.cabeza.matrixWorld);
  const oreja = toto.cabeza.localToWorld(V3(0.15, -0.03, 0.02));
  const Y = f.clone().multiplyScalar(-1).add(V3(0, 0.25, 0)).normalize(), Z = l.clone(), X = new THREE.Vector3().crossVectors(Y, Z).normalize(); Z.crossVectors(X, Y).normalize();
  const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
  const pos = oreja.clone().addScaledVector(l, 0.035 * 0.9).addScaledVector(Y, -0.08);
  obj.position.copy(pos); obj.quaternion.copy(q); obj.scale.setScalar(1);
  return obj.localToWorld(V3(0, -0.11 * TELK, 0));   // el agarre (la punta del micrófono)
}

// =====================================================================================================
// POSES
// =====================================================================================================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
// pone el objeto en la oreja derecha (con la cabeza ya puesta en t) y lleva la mano derecha a agarrarlo
function alOido(per, p, obj, esc = 1) { per.poner(p); enOreja(obj, per, esc); obj.updateMatrixWorld(true); manoA(per, p, "D", obj.localToWorld(V3(0.0, -0.035 / esc, 0.0)), 1, [-0.9, -0.45, -0.2]); }
function chipActual(t) { for (let i = 0; i < 3; i++) if (t >= T.mont[i].ini && t < T.mont[i].fin) return i; return -1; }
// Bruno · P1 (atiende, la correa, se da vuelta a la vidriera), P2 (cada vez más hundido), P3-P5 (el inalámbrico en la mano),
// Q1 (la tablet), Q2/Q4 (el panel), Q3 (filma), Q5 (señala)
function poseBruno(t) {
  const pa = planoActual;
  if (t < T.p2a) {
    const g = sg(t, T.gira, T.gira + 0.35);
    const p = poseEn(t, [
      [0, { x: BRUNO_M.x, z: BRUNO_M.z, giro: 0.15, ...aC(0.35, 0.12), ...CARA.neutra, ...BRAZOS.apoyado }],
      [T.v1 + 0.2, { ...aC(0.15, 0.05), ...BUENA }, 0.25],
    ]);
    p.giro += 0.55 * g; p.cabeza.giro += 1.05 * g; p.cabeza.asiente -= 0.05 * g; if (g > 0.5) Object.assign(p, { ...MEDIA, ojos: { ...MEDIA.ojos, x: 0.8 } });
    // la izquierda sostiene la correa (abajo, del lado de Toto)
    p.manoI = [0.3, 0.28, 0.32]; p.codoI = [0.8, -0.6, -0.2];
    if (t >= T.atiende) alOido(bruno, p, TEL); else { enBase(TEL); manoA(bruno, p, "D", TELB.position.clone().add(V3(0.0, 0.12, 0.05)), sg(t, -0.2, T.atiende), [-0.9, -0.5, -0.2]); }
    p.t = t; bocaVoz(p, t, T.b2, ENV.b2, 0.6); return p;
  }
  if (t < P1 && pa.startsWith("P2")) {
    const i = chipActual(t), m = T.mont[Math.max(0, i)];
    const base = [
      { giro: 0.1, ...aC(0.1, 0.12), ...CANSADO, ...BRAZOS.apoyado, inclina: 0.05 },
      { giro: 0.1, ...aC(0.0, 0.22, 0.12), ...GASTADO, ...BRAZOS.apoyado, inclina: 0.3, manoI: [0.12, 0.33, 0.4], codoI: [0.6, -0.8, 0.2] },
      { giro: 0.0, ...aC(0.0, 0.62, 0.0), ...GASTADO, ojos: { abiertos: 0.2, tension: 0.6 }, ...BRAZOS.apoyado, inclina: 0.62, manoI: [0.2, 0.15, 0.45], codoI: [0.8, -0.6, 0.1] },
    ][Math.max(0, i)];
    const p = poseEn(t, [[0, { x: BRUNO_M.x, z: BRUNO_M.z, ...base }]]);
    if (t >= m.atiende) alOido(bruno, p, TEL); else { enBase(TEL); manoA(bruno, p, "D", TELB.position.clone().add(V3(0.0, 0.12, 0.05)), 1, [-0.9, -0.5, -0.2]); }
    p.t = t; bocaVoz(p, t, T.b3, ENV.b3, 0.55); bocaVoz(p, t, T.b4, ENV.b4, 0.5); bocaVoz(p, t, T.b5, ENV.b5, 0.45); return p;
  }
  if (t < P1) {
    // la sala de recuperación: asomado en el vano (P3) y después adentro, al lado de la camilla
    const adentro = t >= T.p3c - 0.05;
    const gI = dirGiro(BRUNO_R.x, BRUNO_R.z, INES_R.x, INES_R.z);
    const p = adentro ? poseEn(t, [
      [0, { x: BRUNO_R.x, z: BRUNO_R.z, giro: gI * 0.7, ...aC(0.2, 0.05), ...SECO, ...BRAZOS.costado, manoD: [-0.2, 0.33, 0.32], codoD: [-0.8, -0.6, -0.2] }],
      [T.p4 + 0.4, { ...aC(0.25, 0.0), ...CARA.neutra }, 0.3],
      [T.ronca + 0.2, { ...aC(0.45, 0.3), ...MEDIA }, 0.3],
      [T.ring5 + 0.15, { ...aC(0.55, 0.35), ...CARA.neutra, cejas: { alto: 0.35, ang: 0.3 } }, 0.2],
      [T.b10 + 0.1, { ...aC(0.35, 0.1), ...GASTADO, ojos: { abiertos: 0.6, tension: 0.4 } }, 0.25],
    ]) : poseEn(t, [[0, { x: BRUNO_PU.x, z: BRUNO_PU.z, giro: 0.75, inclina: 0.12, ladea: -0.1, ...aC(0.1, 0.1, 0.15), ...CARA.esperanza, cejas: { alto: 0.45, ang: 0.7 }, ...BRAZOS.costado, manoD: [-0.16, 0.38, 0.3], codoD: [-0.8, -0.6, -0.2] }]]);
    p.t = t; bocaVoz(p, t, T.b6, ENV.b6, 0.55); bocaVoz(p, t, T.b8, ENV.b8, 0.55); bocaVoz(p, t, T.b10, ENV.b10, 0.55); return p;
  }
  // ---- parte 2 ----
  if (pa.startsWith("Q1")) {
    // la tablet en las dos manos, apuntando a Toto (foto) y después la baja; el pulgar arriba para Vero
    const p = poseEn(t, [
      [0, { x: BRUNO_M.x, z: BRUNO_M.z, giro: 0.3, ...aC(0.35, 0.15), ...BUENA, ...BRAZOS.ofrece(0.27, 0.46, 0.42) }],
      [T.envia + 0.25, { ...aC(0.2, 0.2), ...BRAZOS.ofrece(0.27, 0.34, 0.36) }, 0.3],
      [T.v12 + 0.1, { giro: 0.45, ...aC(0.9, 0.0), ...FELIZ }, 0.35],
      [T.pulgar, { ...BRAZOS.ofrece(0.27, 0.34, 0.36), manoI: [0.33, 0.62, 0.3], codoI: [0.9, -0.4, -0.2] }, 0.25],
    ]);
    p.t = t; return p;
  }
  if (pa.startsWith("Q2") || pa.startsWith("Q4") || pa === "Q5i") {
    const p = poseEn(t, [[0, { x: BRUNO_M.x + 0.55, z: BRUNO_M.z, giro: -0.15, ...aC(-0.1, 0.3), ...BUENA, ...BRAZOS.apoyado }],
      [T.q4 + 0.05, { ...aC(0.25, 0.25), ...CARA.neutra }, 0.2],
      [T.b10b + LEN.b10, { ...aC(0.35, 0.1), ...BUENA }, 0.3],
      [T.i13 + 0.4, { giro: -0.6, ...aC(-0.6, 0.0), ...CARA.neutra }, 0.3],
      [T.b14, { ...aC(-0.65, 0.0), ...MEDIA }, 0.2]]);
    // el dedo en la tablet cuando toca
    const toc = [T.tocaCir, T.tocaCoco].find((x) => t >= x - 0.3 && t < x + 0.25);
    if (toc !== undefined) { tablet.updateMatrixWorld(true); manoA(bruno, p, "D", tablet.localToWorld(V3(0.05, 0.12, 0.04)), Math.sin(sg(t, toc - 0.3, toc + 0.25) * Math.PI), [-0.8, -0.6, -0.2]); p.dedoD = 1; }
    p.t = t; bocaVoz(p, t, T.b10b, ENV.b10, 0.55); bocaVoz(p, t, T.b14, ENV.b14, 0.6); return p;
  }
  if (pa === "Q3") {
    const g = dirGiro(BRUNO_R3.x, BRUNO_R3.z, TOTO_R.x + 0.3, TOTO_R.z);
    const p = poseEn(t, [[0, { x: BRUNO_R3.x, z: BRUNO_R3.z, giro: g, ...aC(0.0, 0.3), ...MEDIA, ...BRAZOS.ofrece(0.27, 0.42, 0.42) }]]);
    p.t = t; return p;
  }
  // Q5: detrás del mostrador; señala la puerta del quirófano con "Preguntale a él."
  const p = poseEn(t, [
    [0, { x: BRUNO_M.x + 0.4, z: BRUNO_M.z, giro: 0.2, ...aC(0.45, 0.05), ...BUENA, ...BRAZOS.apoyado }],
    [T.b15, { giro: 0.0, ...aC(-0.5, 0.0), ...MEDIA, manoD: [-0.55, 0.5, 0.2], codoD: [-1, -0.3, -0.1], dedoD: 1 }, 0.3],
    [T.ladra, { giro: 0.3, ...aC(0.3, 0.2), ...FELIZ, ...BRAZOS.apoyado }, 0.4],
  ]);
  p.t = t; bocaVoz(p, t, T.b15, ENV.b15, 0.6); return p;
}
// Inés de cirugía
function poseInesQ(t) {
  const pa = planoActual;
  if (t < P1) {
    const gB = dirGiro(INES_R.x, INES_R.z, BRUNO_PU.x, BRUNO_PU.z), gB2 = dirGiro(INES_R.x, INES_R.z, BRUNO_R.x, BRUNO_R.z);
    const p = poseEn(t, [
      [0, { x: INES_R.x, z: INES_R.z, giro: -0.15, inclina: 0.16, ...aC(0.3, 0.3), ...CARA.concentrada, manoI: [0.2, 0.42, 0.42], manoD: [-0.2, 0.42, 0.42], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2] }],
      [T.b6 + 0.5, { inclina: 0.1, ...aC(-0.55, 0.05), ...CARA.neutra }, 0.35],
      [T.i7, { ...aC(-0.5, 0.05), ...SECO }, 0.2],
      [T.p3c, { ...aC(gB2 * 0.6, 0.05), ...SECO }, 0.3],
      [T.b8 + LEN.b8, { ...aC(gB2 * 0.6, 0.05), ...SECO, ojos: { abiertos: 0.85, tension: 0.1 }, cejas: { alto: 0.1, ang: -0.05 } }, 0.15],
      [T.toma, { inclina: 0.22, ...aC(0.45, 0.3), ...SECO }, 0.4],
      [T.oreja + 0.35, { inclina: 0.18, ...aC(0.75, 0.05), ...SECO, ojos: { abiertos: 0.8, tension: 0.1 }, cejas: { alto: 0.05, ang: -0.05 } }, 0.35],
      [T.ring5 + 0.1, { ...aC(0.05, 0.35), ...SECO, cejas: { alto: 0.3, ang: 0.1 } }, 0.2],
      [T.miraCoco + 0.15, { ...aC(0.75, 0.2), ...SECO, cejas: { alto: 0.55, ang: 0.0 } }, 0.3],
    ]);
    // el teléfono: lo toma de la mano de Bruno y se lo lleva a la oreja de Toto (el auricular ya está puesto: ponerTelFinal)
    if (t >= T.toma - 0.35) { TEL.updateMatrixWorld(true); manoA(inesQ, p, "D", TEL.localToWorld(V3(0, -0.11 * TELK, 0)), sg(t, T.toma - 0.35, T.toma - 0.05), [-0.9, -0.5, -0.1]); }
    p.t = t; bocaVoz(p, t, T.i7, ENV.i7, 0.55); return p;
  }
  if (pa.startsWith("Q2")) {
    // cruza la recepción hacia la puerta del quirófano, los guantes en alto
    const u = sg(t, T.q2 - 0.1, T.q2i - 0.05);
    const x0 = VX + 0.2, z0 = -0.2;
    const p = poseEn(t, [[0, { ...aC(0.3, 0.0), ...CARA.neutra, manoI: [0.22, 0.6, 0.3], manoD: [-0.22, 0.6, 0.3], codoI: [0.8, -0.6, 0.1], codoD: [-0.8, -0.6, 0.1] }]]);
    Object.assign(p, { x: lerp(x0, QPUERTA.x + 0.2, u), z: lerp(z0, QPUERTA.z, u), giro: dirGiro(x0, z0, QPUERTA.x, QPUERTA.z), paso: u > 0 && u < 1 ? 1 : 0 });
    p.t = t; return p;
  }
  // Q4b: sale del quirófano sacándose el guante izquierdo
  const u = sg(t, T.q4b - 0.05, T.q4b + 0.7);
  const p = poseEn(t, [
    [0, { ...aC(0.35, 0.1), ...CARA.neutra, manoI: [0.12, 0.42, 0.38], manoD: [-0.08, 0.42, 0.4], codoI: [0.8, -0.6, 0.0], codoD: [-0.8, -0.6, 0.0] }],
    [T.guante + 0.1, { manoI: [0.24, 0.3, 0.3], manoD: [-0.18, 0.3, 0.34] }, 0.3],
    [T.i13, { ...aC(0.5, 0.0), ...CARA.neutra, cejas: { alto: 0.35, ang: 0.15 } }, 0.3],
    [T.b14 + 0.3, { ...aC(0.5, 0.0), ...CARA.sonrisa, cejas: { alto: 0.5, ang: 0.05 } }, 0.3],
  ]);
  Object.assign(p, { x: lerp(VX + XL + 0.1, QPUERTA.x + 0.25, eio(u)), z: QPUERTA.z + 0.1, giro: lerp(Math.PI / 2, 0.9, eio(u)), paso: u > 0.02 && u < 0.98 ? 1 : 0 });
  p.t = t; bocaVoz(p, t, T.i13, ENV.i13, 0.55); return p;
}
// Inés de consultorio (el cierre)
function poseInes(t) {
  const p = poseEn(t, [[0, { x: VX - 0.25, z: BRUNO_M.z + 0.08, giro: 0, ...aC(0.0, 0.03), ...CARA.sonrisa, ...BRAZOS.apoyado }], [T.i16 + 1.4, { ...aC(0.06, 0.0, 0.06), ...BUENA }, 0.6]]);
  p.t = t; bocaVoz(p, t, T.i16, ENV.i16, 0.55); return p;
}
// Vero de calle: la vereda (P1, Q1) y la recepción (Q5)
function poseVero(t) {
  const pa = planoActual;
  if (t < P1) {
    const s = t >= T.saluda ? saludo(t, "I", sg(t, T.saluda, T.saluda + 0.2)) : { manoI: [0.29, -0.08, 0.04], codoI: [0.8, -0.6, -0.2] };
    const p = poseEn(t, [[0, { x: VERO_A.x, z: VERO_A.z, giro: 0.15, ...aC(0.1, 0.0), ...CARA.esperanza, ...BRAZOS.costado }],
      [T.b2 + 0.6, { ...aC(0.0, 0.0), ...CARA.sorpresa, boca: { sonrisa: 0.4, abierta: 0.2, ancho: 0.9 } }, 0.2],
      [T.saluda, { ...aC(0.05, 0.0, 0.1), ...FELIZ }, 0.2]]);
    Object.assign(p, s);
    p.t = t; alOido(vero, p, celuV, 1.25); return p;   // el celular en la oreja derecha
  }
  if (pa.startsWith("Q1")) {
    const p = poseEn(t, [[0, { x: VERO_A.x - 0.1, z: VERO_A.z, giro: 0.05, ...aC(0.0, 0.4), ...CARA.neutra, ...BRAZOS.celular }],
      [T.vibra1 + 0.1, { ...aC(0.0, 0.45), ...CARA.sorpresa }, 0.15],
      [T.v12, { ...aC(0.0, 0.1), ...FELIZ, manoI: [0.14, 0.62, 0.36], manoD: [0.02, 0.62, 0.36] }, 0.3]]);
    p.t = t; bocaVoz(p, t, T.v12, ENV.v12, 0.6); return p;
  }
  // Q5: entra por la puerta de calle y llega al mostrador
  const u = sg(t, T.entraV[0], T.entraV[1]);
  const p = poseEn(t, [[0, { ...aC(-0.2, 0.0), ...BUENA, ...BRAZOS.costado }], [T.v1b + LEN.v1, { ...aC(-0.6, 0.05), ...CARA.esperanza }, 0.3], [T.trota[0] + 0.3, { ...aC(-1.0, 0.25), ...FELIZ }, 0.3], [T.ladra, { ...aC(-0.4, 0.5), ...DERRETIDA }, 0.3]]);
  Object.assign(p, { x: lerp(PCALLE_V.x, VERO_Q5.x, eio(u)), z: lerp(PCALLE_V.z, VERO_Q5.z, eio(u)), giro: u < 1 ? dirGiro(PCALLE_V.x, PCALLE_V.z, VERO_Q5.x, VERO_Q5.z) : lerp(-1.35, -1.0, sg(t, T.trota[0], T.trota[1])), paso: u > 0.02 && u < 0.98 ? 1 : 0 });
  p.t = t; bocaVoz(p, t, T.v1b, ENV.v1, 0.6); return p;
}
// Vero de entrecasa (la cocina, Q3): el celular en altavoz cerca de la cara
function poseVeroC(t) {
  const p = poseEn(t, [[0, { x: VERO_K.x, z: VERO_K.z, giro: 0.35, ...aC(0.0, 0.35), ...CARA.neutra, manoI: [0.07, 0.4, 0.33], manoD: [-0.07, 0.4, 0.33], codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] }],
    [T.vibra3 + 0.15, { ...aC(0.0, 0.4), ...CARA.sorpresa }, 0.15],
    [T.q3v, { ...aC(0.05, 0.2, 0.12), ...DERRETIDA, manoI: [0.08, 0.36, 0.38], manoD: [-0.08, 0.36, 0.38] }, 0.25]]);
  p.t = t; bocaVoz(p, t, T.v9b, ENV.v9, 0.5); return p;
}
// la señora de Luna: sentada esperando (P2a, P2b); a las 14:00 se levanta y se va; Q4 en el mostrador
function poseSenora(t) {
  if (t < P1) {
    const u = sg(t, T.seVa, T.seVa + 1.1);
    if (u <= 0) return { x: SEN_S.x, y: 0, z: SEN_S.z, sentado: 1, giro: 0, ...aC(-0.25, 0.1), ...CARA.neutra, ...BRAZOS.costado, manoD: [-0.2, 0.25, 0.25], manoI: [0.2, 0.25, 0.25], t };
    const sube = sg(u, 0, 0.3);
    return { x: lerp(SEN_S.x, VX + 2.4, sg(u, 0.25, 1)), y: 0, z: lerp(SEN_S.z, ZF + 0.25, sg(u, 0.25, 1)), sentado: 1 - sube, giro: lerp(0, Math.PI / 2 + 0.3, sg(u, 0.1, 0.4)), paso: u > 0.3 ? 1 : 0, ...aC(0.2, 0.0), ...CARA.fastidio, ...BRAZOS.costado, manoD: [-0.3, -0.02, 0.06], t };
  }
  return { x: SEN_Q4.x, z: SEN_Q4.z, giro: Math.PI - 0.35, ...aC(0.2, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado, t };
}
// Toto
function poseToto(t) {
  const pa = planoActual;
  if ((t < P1 && (pa === "P1" || pa === "P1b")) || pa.startsWith("Q1") || pa === "C") {
    const c = poseEn(t, [[0, { cab: [-0.35, -0.05, 0.1], cola: 0.3, orejas: 0.8, cejas: 0.3 }], [T.v1 + 0.3, { cab: [-0.6, -0.15, 0.2], cola: 0.5, orejas: 0.9, cejas: 0.6 }, 0.3], [T.gira + 0.3, { cab: [0.6, -0.05, 0.1], cola: 0.6, orejas: 1, cejas: 0.4 }, 0.3], [T.saluda, { cab: [0.7, -0.1, 0.15], cola: 1, orejas: 1, cejas: 0.6 }, 0.25]]);
    if (pa.startsWith("Q1")) Object.assign(c, { cab: t < T.v12 ? [-0.5, -0.1, 0.15] : [0.7, -0.1, 0.15], cola: 0.7, orejas: 0.9, cejas: 0.4 });
    if (pa === "C") Object.assign(c, { cab: [-0.15, -0.12, 0.18], cola: 0.9, orejas: 0.95, cejas: 0.5 });
    return { x: pa === "C" ? VX + 0.12 : TOTO_M.x, y: MOS.alto, z: TOTO_M.z, giro: -0.3, sentado: 1, orejas: c.orejas, cola: c.cola, cejas: c.cejas, jadeo: 0.4, cabeza: { giro: c.cab[0], asiente: c.cab[1], ladea: c.cab[2] }, t };
  }
  if (t < P1 || pa === "Q3") {
    // echado en la camilla, dormido: ojos como dos líneas, la cabeza apoyada; Q3 se despierta (la cabeza sube, ojos a media asta)
    const desp = pa === "Q3" ? eio(sg(t, T.despierta, T.despierta + 0.6)) : 0;
    const env = t >= T.ronca && t < T.ronca + ENV.ronq.length / 30 && t < P1 ? ENV.ronq[Math.floor((t - T.ronca) * 30)] ?? 0 : 0;
    const or = 0.12 + env * 0.3 * (0.5 + 0.5 * Math.sin(t * 45));
    return { x: TOTO_R.x, y: TOTO_R.y, z: TOTO_R.z, giro: Math.PI / 2, echado: 1, orejas: lerp(or, 0.55, desp), cola: 0.0, colaAlta: 0.3, cejas: lerp(0, 0.5, desp), ojos: { abiertos: lerp(0.12, 0.5, desp) }, cabeza: { giro: lerp(-0.45, -0.75, desp), asiente: lerp(0.32, -0.05, desp), ladea: lerp(0.3, 0.1, desp) }, t, _ronca: env };
  }
  if (pa === "Q5") {
    // entra trotando desde la puerta del quirófano, con el collar; se sienta delante de Vero y le ladra contento
    const u = sg(t, T.trota[0], T.trota[1]), anda = u > 0.01 && u < 0.99;
    const x0 = QPUERTA.x - 0.2, z0 = QPUERTA.z;
    const lad = t >= T.ladra && t < T.ladra + 0.5 ? Math.sin(sg(t, T.ladra, T.ladra + 0.5) * Math.PI * 2) : 0;
    return { x: lerp(x0, TOTO_Q5.x, eio(u)), y: 0, z: lerp(z0, TOTO_Q5.z, eio(u)), giro: anda ? dirGiro(x0, z0, TOTO_Q5.x, TOTO_Q5.z) : dirGiro(TOTO_Q5.x, TOTO_Q5.z, VERO_Q5.x, VERO_Q5.z), sentado: sg(t, T.trota[1] - 0.1, T.trota[1] + 0.2), paso: anda ? 1 : 0, pasoVel: 16, cola: 1, orejas: 0.9, cejas: 0.6, jadeo: 0.6 + 0.4 * Math.abs(lad), cabeza: { giro: 0.2, asiente: -0.3 - 0.1 * lad, ladea: 0.1 }, t };
  }
  // C: con las patas en el mostrador, el collar puesto
  return { x: VX + 0.45, y: 0, z: MOS.z + MOS.d / 2 + 0.32, giro: Math.PI, erguido: 1, apoyo: [0.1, MOS.alto / 0.9 - 0.02, 0.34], cola: 0.8, orejas: 0.9, cejas: 0.5, jadeo: 0.7, cabeza: { giro: -0.35, asiente: -0.15, ladea: 0.12 }, t };
}
function poseCoco(t) {
  const env = t >= T.roncaCoco && t < T.roncaCoco + ENV.ronq.length / 30 ? ENV.ronq[Math.floor((t - T.roncaCoco) * 30)] ?? 0 : 0;
  return { x: COCO_R.x, y: COCO_R.y, z: COCO_R.z, giro: -0.25, echado: 1, orejas: 0.25 + env * 0.3 * Math.sin(t * 45), cola: 0, colaAlta: 0.3, ojos: { abiertos: 0.12 }, cabeza: { giro: 0.2, asiente: 0.3, ladea: -0.3 }, t, _ronca: env };
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function luces(pa) {
  const cocina = pa.startsWith("Q3k") || pa === "Q3v";
  const rec = /^P3|^P4|^P5[b]?$|^Q3$/.test(pa);
  cielo.intensity = 1.85; relleno.intensity = 0.75; sol.intensity = rec ? 1.1 : 1.35; sol.color.set(0xf6f8ff);
  luzLamp.intensity = 0; LAMPARA.visible = !cocina ? false : true;
  luzCalor.intensity = rec ? 1.6 : 0;
  VENTANA.material.color.set(0xefe6cc);
  const cx = cocina ? 0 : rec ? RX : VX;
  if (cocina) { sol.position.set(-0.3, 2.6, -0.2); sol.target.position.set(0.1, 0, 0.3); } else { sol.position.set(cx + 1.2, 6.5, 1.7); sol.target.position.set(cx, 0.5, -0.5); }
  sol.target.updateMatrixWorld();
}
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  luces(pa);
  dibujarInterfaz(t);
  const recep = /^P1|^P2|^Q1|^Q2|^Q4|^Q5|^C/.test(pa) && !/i$/.test(pa);
  const sala = /^P3|^P4|^P5$|^P5b|^Q3$/.test(pa);
  const cocina = pa === "Q3k" || pa === "Q3v";
  const vis = {
    bruno: (recep && pa !== "P1b" && pa !== "C") || (sala && pa !== "P3b" && pa !== "P4b"),
    vero: (t < P1 && (pa === "P1" || pa === "P1b")) || pa === "Q1" || pa === "Q1b" || pa === "Q5",
    veroC: cocina, inesQ: (sala && pa !== "P3c" && pa !== "Q3") || pa === "Q2" || pa === "Q4b" || pa === "Q4c", ines: pa === "C",
    senora: (pa === "P2a" || pa === "P2b" || pa === "P2c") || pa === "Q4",
    toto: pa === "P1" || pa === "P1b" || sala || pa === "Q1" || pa === "Q1b" || (pa === "Q5" && t >= T.trota[0] - 0.05) || pa === "C",
    coco: sala,
  };
  if (pa === "P1b") vis.bruno = true;
  bruno.raiz.visible = vis.bruno; vero.raiz.visible = vis.vero; veroC.raiz.visible = vis.veroC; inesQ.raiz.visible = vis.inesQ; ines.raiz.visible = vis.ines; senora.raiz.visible = vis.senora; toto.raiz.visible = vis.toto; coco.raiz.visible = vis.coco;
  // el set de la parte 1 / 2: la pizarra solo en la parte 1; la tablet del mostrador solo en la parte 2
  PIZARRA.visible = !p2; tablet.visible = p2;
  ISA[0].visible = !(pa === "P1" || pa === "P1b" || pa.startsWith("Q1")); ISA[1].visible = true;
  TEL.visible = true; RING.visible = false; celuV.visible = false; tabletM.visible = false; TRANS.visible = false; GUANTE_SUELTO.visible = false;
  ponerGuante(inesQ, "I", !(pa.startsWith("Q4") && t >= T.guante));
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  // ---- poses ----
  if (vis.toto) { toto.poner(poseToto(t)); toto.panuelo.visible = false; toto.curita.visible = false; const P = poseToto(t); const r = P._ronca ?? 0; hocico(toto).scale.setScalar(1 + 0.14 * r); const resp = P.echado ? 1 + 0.045 * Math.sin(t * 2.6) : 1; toto.torso.scale.set(1 + (resp - 1) * 0.6, resp, 1); }
  dormir(toto, sala && (t < P1 || t < T.despierta + 0.3)); dormir(coco, true);
  if (vis.coco) { const P = poseCoco(t); coco.poner(P); hocico(coco).scale.setScalar(1 + 0.14 * (P._ronca ?? 0)); const resp = 1 + 0.04 * Math.sin(t * 3.1 + 1); coco.torso.scale.set(1 + (resp - 1) * 0.6, resp, 1); }
  if (vis.bruno || (sala && t < P1)) bruno.poner(poseBruno(t));
  if (vis.toto) toto.raiz.updateMatrixWorld(true);
  ponerTelFinal(t);
  if (vis.vero) { vero.poner(poseVero(t)); ponerCeluVero(t); }
  if (vis.veroC) { veroC.poner(poseVeroC(t)); veroC.cuerpo.getWorldQuaternion(_q); const a = manoMundo(veroC, "I", _a), b = manoMundo(veroC, "D", _b); celuV.visible = true; celuV.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.09, 0)); celuV.quaternion.copy(_q); celuV.rotateX(-0.35); pantallaCel("despierta"); }
  if (vis.inesQ) inesQ.poner(poseInesQ(t));
  if (vis.ines) ines.poner(poseInes(t));
  if (vis.senora) { senora.poner(poseSenora(t)); TRANS.visible = true; if (t < P1) { if (t < T.seVa + 0.3) { TRANS.position.set(SILLAS[0].x, 0.49, SILLAS[0].z); TRANS.rotation.set(0, 0.1, 0); } else { const m = manoMundo(senora, "D", _a); TRANS.position.copy(m).add(V3(0, -0.36, 0)); TRANS.rotation.set(0, senora.raiz.rotation.y, 0); } } else { TRANS.position.set(SEN_Q4.x - 0.2, MOS.alto, MOS.z + 0.05); TRANS.rotation.set(0, Math.PI / 2, 0); } }
  // la tablet en la mano de Bruno (Q1 la foto; Q3 el video)
  if (vis.bruno && (pa === "Q1" || pa === "Q3")) { tabletM.visible = true; const a = manoMundo(bruno, "I", _a), b = manoMundo(bruno, "D", _b); tabletM.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.1, 0)); bruno.cuerpo.getWorldQuaternion(_q); tabletM.quaternion.copy(_q); tabletM.rotateY(Math.PI); tabletM.rotateX(-0.15); }
  // la correa de Toto (P1): de la mano izquierda de Bruno al collar
  if (vis.toto && vis.bruno && (pa === "P1" || pa === "P1b" || pa === "Q1" || pa === "Q1b")) { toto.collar.updateMatrixWorld(true); const mv = manoMundo(bruno, "I", _a).clone().add(V3(0, -0.06, 0)); ponerCorrea(mv, toto.collar.localToWorld(V3(0, 0.02, -0.1)), true, 0.12); } else ponerCorrea(null, null, false);
  // los arcos del ring alrededor del auricular cuando suena
  if (sonando(t) && TEL.visible) { RING.visible = true; RING.position.copy(TEL.position); RING.quaternion.copy(camera.quaternion); const k = halfK(); RING.children.forEach((a) => { const i = a.userData.i, f = 0.5 + 0.5 * Math.sin(t * 14 - i * 1.2); a.material.opacity = 0.35 + 0.65 * f; }); }
  const lb = sonando(t) && t < P1 ? 0.5 + 0.5 * Math.sin(t * 20) : 0; luzBaseM.emissiveIntensity = lb * 1.2;
  // la puerta de vaivén de la recepción (Q2 entra Inés, Q4b sale, Q5 sale Toto) y la de la calle (la señora, Vero)
  const uQ = Math.max(sg(t, T.q2i - 0.35, T.q2i - 0.1) * (1 - sg(t, T.q2i, T.q2i + 0.2)), sg(t, T.abreQ - 0.3, T.abreQ - 0.02) * (1 - sg(t, T.abreQ + 0.85, T.abreQ + 1.2)), sg(t, T.trota[0] - 0.2, T.trota[0]) * (1 - sg(t, T.trota[0] + 0.35, T.trota[0] + 0.6)));
  QHOJA.rotation.y = Math.PI / 2 + 1.25 * eio(uQ); QHOJA.visible = uQ < 0.5;   // abre hacia el quirófano (no barre a quien sale)
  const uC = Math.max(sg(t, T.campana - 0.3, T.campana) * (1 - sg(t, T.campana + 0.4, T.campana + 0.8)), sg(t, T.entraV[0] - 0.25, T.entraV[0] + 0.05) * (1 - sg(t, T.entraV[0] + 0.5, T.entraV[0] + 0.9)));
  PCALLE.rotation.y = 1.2 * eio(uC);
  // el guante que se sacó, en la mano derecha (Q4b)
  if (vis.inesQ && pa.startsWith("Q4") && t >= T.guante) { GUANTE_SUELTO.visible = true; const m = manoMundo(inesQ, "D", _a); GUANTE_SUELTO.position.copy(m).add(V3(0, -0.06, 0.03)); }
  // ---- insertos ----
  const INS = { P5i: INS_TEL, Q1i: INS_AV1, Q2i: INS_PANEL, Q3i: INS_AV3, Q4i: INS_PANEL, Q5i: INS_AV5 }[pa];
  for (const I of INSERTOS) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
  }
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);
  // ---- tarjetas ----
  AVISOS.length = 0;
  for (const k in GL) { if (Array.isArray(GL[k])) GL[k].forEach((g) => (g.visible = false)); else GL[k].visible = false; }
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t);
  renderer.render(scene, camera);
}
// el auricular en la sala (P3-P5): en la mano de Bruno; desde T.toma viaja a la oreja de Toto (Bruno ya puesto en t)
function ponerTelFinal(t) {
  const pa = planoActual;
  if (t >= P1) { enBase(TEL); return; }
  if (!/^P3|^P4|^P5/.test(pa)) return;
  if (t < T.toma) { enMano(TEL, bruno, "D", 0.25, 0.08); return; }
  const u = eio(sg(t, T.toma, T.oreja));
  enOrejaToto(TEL); const q1 = TEL.quaternion.clone(), p1 = TEL.position.clone();
  if (u < 1) { enMano(TEL, bruno, "D", 0.25, 0.08); const q0 = TEL.quaternion.clone(), p0 = TEL.position.clone(); TEL.position.lerpVectors(p0, p1, u); TEL.position.y += Math.sin(u * Math.PI) * 0.12; TEL.quaternion.slerpQuaternions(q0, q1, u); }
  if (t >= T.ring5) { TEL.position.x += Math.sin(t * 70) * 0.006; TEL.position.y += 0.05 * sg(t, T.ring5, T.ring5 + 0.2); }
}
// el celular de Vero (afuera): en la oreja derecha (P1) o en las manos (Q1)
function ponerCeluVero(t) {
  const pa = planoActual;
  celuV.visible = true;
  if (t < P1) { enOreja(celuV, vero, 1.25); pantallaCel("ingreso"); return; }
  vero.cuerpo.getWorldQuaternion(_q); const a = manoMundo(vero, "I", _a), b = manoMundo(vero, "D", _b);
  celuV.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.09, 0)); celuV.quaternion.copy(_q);
  if (t >= T.v12) { celuV.rotateY(Math.PI); celuV.rotateX(0.1); } else celuV.rotateX(-0.6);
  pantallaCel("ingreso");
}
function tarjetas(t) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const pa = planoActual;
  const telPx = () => objPx(TEL, V3(0, 0.05, 0));
  if (pa === "P1") {
    ponerGlobo(GL.jue, 330, 470, 1, null);
    if (t >= T.v1 && t < T.b2 - 0.02) { const [x, y] = telPx(); ponerGlobo(GL.v1, 700, 640, ent(T.v1), [x, y], 2); }
    if (t >= T.b2) { verGlobo(GL.b2, t >= T.b2 + 0.75 ? 99 : 1); hablar(GL.b2, bruno, ent(T.b2), 1, 60); }
  }
  if (pa === "P1b") ponerGlobo(GL.jue, 330, 200, 1, null);
  if (pa.startsWith("P2")) {
    const i = chipActual(t), m = T.mont[i];
    ponerGlobo([GL.h1030, GL.h1200, GL.h1400][i], 220, 220, ent(m.ini), null, 1);
    const g = [GL.b3, GL.b4, GL.b5][i]; if (t >= m.voz) { if (i === 2) verGlobo(g, t >= m.voz + 1.25 ? 99 : 2); hablar(g, bruno, ent(m.voz), 1, 40); }
    const [tx, ty] = objPx(TELB, V3(0, 0.04, 0));
    ponerContador([2, 13, 27][i], 780, 1500, ent(m.ini + 0.1)); ponerGuia(GUIAS[0], 780 - 120, 1500 - 110, tx, ty, eo(sg(t, m.ini + 0.1, m.ini + 0.35)));
  }
  if (pa === "P3") { ponerGlobo(GL.h1530, 220, 220, 1, null, 1); if (t >= T.b6) { verGlobo(GL.b6, t >= T.b6 + 0.7 ? 99 : 1); hablar(GL.b6, bruno, ent(T.b6), 1, 120); } }
  if (pa === "P3b" && t >= T.i7) hablar(GL.i7, inesQ, ent(T.i7), 1, 0);
  if (pa === "P3c" && t >= T.b8) hablar(GL.b8, bruno, ent(T.b8), 1, 0);
  if (pa === "P4") { ponerGlobo(GL.r1, 330, 1450, ent(T.rot[0]), null, 1); ponerGlobo(GL.r2, 690, 1690, ent(T.rot[1]), null, 1); }
  if (pa === "P4b" && t >= T.v9) { const [x, y] = telPx(); ponerGlobo(GL.v9, 560, 560, ent(T.v9), [x, y], 2); }
  if (pa === "P5b" && t >= T.b10 && t < T.miraCoco) hablar(GL.b10, bruno, ent(T.b10), 1, 0);
  if (pa === "Q1") ponerGlobo(GL.jue2, 280, 220, 1, null);
  if (pa === "Q1i") ponerGlobo(GL.rAv1, 540, 220, 1, null, 1);
  if (pa === "Q1b" && t >= T.v12) hablar(GL.v12, vero, ent(T.v12), 1, 0);
  if (pa === "Q2") ponerGlobo(GL.h1100, 220, 220, 1, null, 1);
  if (pa === "Q2i") { ponerGlobo(GL.h1100, 220, 160, 1, null, 1); ponerGlobo(GL.rPanel, 540, 320, 1, null, 2); }
  if (pa === "Q3") ponerGlobo(GL.h1530b, 220, 220, 1, null, 1);
  if (pa === "Q3i") ponerGlobo(GL.rAv3, 540, 220, 1, null, 1);
  if (pa === "Q3v" && t >= T.v9b) { const [x, y] = objPx(celuV, V3(0, 0.05, 0)); ponerGlobo(GL.v9b, 560, 560, ent(T.v9b), [x, y], 2); }
  if (pa === "Q4" && t >= T.b10b) hablar(GL.b10b, bruno, ent(T.b10b), 1, 0);
  if (pa === "Q4b" && t >= T.i13 && t < T.b14 - 0.02) hablar(GL.i13, inesQ, ent(T.i13), 1, 0);
  if (pa === "Q4b" && t >= T.b14) hablar(GL.b14, bruno, ent(T.b14), 1, 0);
  if (pa === "Q4i") ponerGlobo(GL.rLlam, 540, 230, 1, null, 1);
  if (pa === "Q5i") { ponerGlobo(GL.h1700, 220, 220, 1, null, 1); ponerGlobo(GL.rAv5, 640, 330, 1, null, 2); }
  if (pa === "Q5") { if (t >= T.v1b && t < T.b15 - 0.05) hablar(GL.v1b, vero, ent(T.v1b), 1, 0); if (t >= T.b15) hablar(GL.b15, bruno, ent(T.b15), 1, 0); }
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice() }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
