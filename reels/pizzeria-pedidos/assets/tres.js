// LO GENERA gen.mjs concatenando assets/src/*.js: editar las partes, no este archivo
// ===== 00-base.js: render, utilidades, tarjetas pegadas a la cámara (de reels/vete-racion) =====
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet, crearVapor } from "./personajes.js";
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


// ===== 10-objetos.js: la muzza, el fainá, la caja, la comanda, la birome, el gancho, el horno, la masa, el casco, la
// mochila, la moto, la impresora, el ticket, el riel =====
const PI = Math.PI;
M.kraft = mat(0xc9a774, 0.85); M.kraftO = mat(0xa98a5a, 0.85); M.gaz = mat(0x365f28, 0.85); M.acero = mat(0xb9bec4, 0.45, { metalness: 0.35 });
M.aceroO = mat(0x8f969f, 0.4, { metalness: 0.45 }); M.madera = mat(0xd9c39a, 0.8); M.masa = mat(0xefe6c8, 0.9); M.marmol = mat(0xe9e6da, 0.5);
M.luz = new THREE.MeshBasicMaterial({ color: 0xfff1d0 }); M.luzHorno = new THREE.MeshBasicMaterial({ color: 0xffd9a0 }); M.negro = mat(0x14181f, 0.7);
// ---------- la muzza uruguaya ----------
const PZ = { masa: mat(0xe2b060, 0.85), borde: mat(0xc7843a, 0.6), queso: mat(0xffd75e, 0.75), dorado: mat(0xe0a64e, 0.5), tomate: mat(0xc9512f, 0.5), aceituna: mat(0x5c7a26, 0.35), hueco: mat(0x1f2a10, 0.6), oregano: mat(0x3d5a1a, 0.8) };
function sector(r0, r1, a0, a1, h, bevel = 0.004) {
  const s = new THREE.Shape();
  if (r0 <= 0) { s.moveTo(0, 0); s.lineTo(r1 * Math.cos(a0), r1 * Math.sin(a0)); s.absarc(0, 0, r1, a0, a1, false); s.lineTo(0, 0); }
  else { s.moveTo(r0 * Math.cos(a0), r0 * Math.sin(a0)); s.lineTo(r1 * Math.cos(a0), r1 * Math.sin(a0)); s.absarc(0, 0, r1, a0, a1, false); s.lineTo(r0 * Math.cos(a1), r0 * Math.sin(a1)); s.absarc(0, 0, r0, a1, a0, true); }
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 10 });
  g.rotateX(-PI / 2);
  return g;
}
const ACE_G = new THREE.SphereGeometry(0.0135, 12, 8), HUECO_G = new THREE.CircleGeometry(0.0055, 12), DISCO_G = new THREE.CylinderGeometry(1, 1, 0.003, 12);
// una porción (o un pedazo entre r0 y r1): masa + queso + borde inflado + salsa asomando + burbujas + aceituna entera + orégano
function porcion(a0, a1, r0 = 0, r1 = 0.19, conBorde = true, sem = 1) {
  const g = new THREE.Group();
  g.add(mesh(sector(r0, r1, a0, a1, 0.008), PZ.masa));
  const q = mesh(sector(Math.max(0, r0 - 0.001), r1 * 0.88, a0 + 0.01, a1 - 0.01, 0.006, 0.003), PZ.queso); q.position.y = 0.011; g.add(q);
  if (conBorde && r1 > 0.12) {
    const b = mesh(sector(r1 * 0.87, r1, a0, a1, 0.02, 0.008), PZ.borde); g.add(b);
    const sa = mesh(sector(r1 * 0.84, r1 * 0.885, a0 + 0.02, a1 - 0.02, 0.004, 0.002), PZ.tomate); sa.position.y = 0.012; g.add(sa);   // la salsa asoma entre el queso y el borde
  }
  semilla = 97 + sem * 13;
  const am = (a0 + a1) / 2, da = a1 - a0;
  for (let i = 0; i < 4; i++) {   // burbujas doradas
    const rad = lerp(Math.max(r0, 0.03), r1 * 0.78, az()), ang = am + (az() - 0.5) * da * 0.6 * Math.min(1, rad / 0.08), rr2 = 0.01 + az() * 0.009;
    const d = mesh(DISCO_G, PZ.dorado, rad * Math.cos(ang), 0.0185, -rad * Math.sin(ang)); d.scale.set(rr2, 1, rr2 * 0.8); g.add(d);
  }
  const rA = lerp(Math.max(r0, 0.04), r1 * 0.72, 0.6);
  if (rA > r0 + 0.012) {   // la aceituna verde entera, con el hueco
    const ol = mesh(ACE_G, PZ.aceituna, rA * Math.cos(am), 0.021, -rA * Math.sin(am)); ol.scale.set(1, 0.72, 1.25); g.add(ol);
    const h = new THREE.Mesh(HUECO_G, PZ.hueco); h.rotation.x = -PI / 2; h.position.set(rA * Math.cos(am), 0.031, -rA * Math.sin(am)); g.add(h);
  }
  for (let i = 0; i < 7; i++) { const rad = lerp(Math.max(r0, 0.02), r1 * 0.84, az()), ang = am + (az() - 0.5) * da * 0.75; g.add(mesh(new THREE.BoxGeometry(0.007, 0.002, 0.005), PZ.oregano, rad * Math.cos(ang), 0.019, -rad * Math.sin(ang))); }
  return sombras(g);
}
// el fainá: rectángulo naranja dorado, canto liso, la superficie tostada con manchas y pimienta
const fainaT = lienzo(256, 200, (x, w, h) => {
  x.fillStyle = "#e3a43a"; x.fillRect(0, 0, w, h); semilla = 5;
  for (let i = 0; i < 26; i++) { x.fillStyle = `rgba(181,112,31,${0.35 + az() * 0.4})`; x.beginPath(); x.ellipse(az() * w, az() * h, 8 + az() * 20, 6 + az() * 12, az() * 3, 0, 7); x.fill(); }
  x.fillStyle = "#16243d"; for (let i = 0; i < 60; i++) { x.beginPath(); x.arc(az() * w, az() * h, 1.6 + az() * 1.6, 0, 7); x.fill(); }
});
const FAINA_C = mat(0xd89530, 0.7), FAINA_T = new THREE.MeshStandardMaterial({ map: fainaT, roughness: 0.7 });
function crearFaina() { const m = mesh(rbox(0.12, 0.012, 0.1, 0.004, 2), [FAINA_C, FAINA_C, FAINA_T, FAINA_C, FAINA_C, FAINA_C]); return m; }
// la pizza entera (8 porciones) con los dos fainá a caballo; `faltan` = porciones sacadas
function crearMuzza(conFaina = true) {
  const g = new THREE.Group(); g.userData.porciones = [];
  for (let i = 0; i < 8; i++) { const p = porcion((i * PI) / 4 + 0.012, ((i + 1) * PI) / 4 - 0.012, 0, 0.19, true, i); g.add(p); g.userData.porciones.push(p); }
  g.userData.fainas = [];
  if (conFaina) for (const [x, z, r, y] of [[-0.045, 0.02, 0.35, 0.026], [0.05, -0.035, -0.4, 0.038]]) { const f = crearFaina(); f.position.set(x, y, z); f.rotation.set(0, r, y > 0.03 ? 0.06 : 0); g.add(f); g.userData.fainas.push(f); }
  return g;
}
// la porción en la mano: el borde en x = 0, la punta en x = +0,19 (la punta se dobla con `bis`)
function crearPorcionMano() {
  const g = new THREE.Group(), a = 0.37, R = 0.19, H = 0.09;
  const base = porcion(-a, a, R - H - 0.002, R, true, 3); base.position.x = R; base.rotation.y = PI; g.add(base);
  const bis = new THREE.Group(); bis.position.x = H; g.add(bis);
  const punta = porcion(-a, a, 0, R - H, false, 5); punta.position.x = R - H; punta.rotation.y = PI; bis.add(punta);
  // la mordida (Q4): un hueco en la punta = un disco del color del queso tapado por el "aire": se arma achicando la punta
  g.userData = { bis, punta, largo: R, H };
  return sombras(g);
}
// el hilo de queso: un tubo curvo que se afina (se rearma cuando cambia)
const HILO_M = mat(0xffe28a, 0.6);
function crearHilo() { const m = new THREE.Mesh(new THREE.BufferGeometry(), HILO_M); m.castShadow = false; m.userData.k = ""; return m; }
function ponerHilo(m, a, b, k) {
  m.visible = k > 0.02; if (!m.visible) return;
  const key = `${a.x.toFixed(3)}${a.y.toFixed(3)}${a.z.toFixed(3)}${b.x.toFixed(3)}${b.y.toFixed(3)}${b.z.toFixed(3)}${k.toFixed(2)}`; if (key === m.userData.k) return; m.userData.k = key;
  const mid = a.clone().lerp(b, 0.5); mid.y -= 0.03 + a.distanceTo(b) * 0.25;
  const curva = new THREE.QuadraticBezierCurve3(a, mid, b);
  m.geometry.dispose(); m.geometry = new THREE.TubeGeometry(curva, 14, 0.004 * k + 0.0015, 6, false);
}
// ---------- la caja de pizza kraft (la tapa con bisagra atrás) ----------
const tapaTex = {};
function texTapa(nombre) {
  return (tapaTex[nombre] ??= lienzo(512, 512, (x, w, h) => {
    x.fillStyle = "#c9a774"; x.fillRect(0, 0, w, h); x.strokeStyle = "#a98a5a"; x.lineWidth = 10; x.strokeRect(16, 16, w - 32, h - 32);
    x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, 196, 92, 0, 7); x.fill(); x.fillStyle = "#c9a774"; x.beginPath(); x.arc(w / 2, 196, 74, 0, 7); x.fill();
    x.fillStyle = "#0b1220"; for (let i = 0; i < 8; i++) { x.save(); x.translate(w / 2, 196); x.rotate((i * PI) / 4); x.fillRect(-3, -74, 6, 74); x.restore(); }
    x.textAlign = "center"; x.textBaseline = "middle"; const [a, b] = nombre.split("|");
    ajustar(x, a, 900, 76, w - 70); x.fillText(a, w / 2, 352); ajustar(x, b, 800, 46, w - 120); x.fillText(b, w / 2, 424);
  }));
}
function crearCaja(nombre = "DON TANO|PIZZAS", L = 0.44, H = 0.045) {
  const g = new THREE.Group();
  g.add(caja(L, 0.004, L, M.kraft, 0, 0.002, 0, 0.002));
  for (const [x, z, w, d] of [[0, L / 2, L, 0.006], [0, -L / 2, L, 0.006], [L / 2, 0, 0.006, L], [-L / 2, 0, 0.006, L]]) g.add(caja(w, H, d, M.kraft, x, H / 2, z, 0.002));
  const bis = new THREE.Group(); bis.position.set(0, H, -L / 2); g.add(bis);
  const tapa = new THREE.Group(); bis.add(tapa);
  const top = mesh(new THREE.BoxGeometry(L + 0.008, 0.005, L + 0.008), [M.kraft, M.kraft, new THREE.MeshStandardMaterial({ map: texTapa(nombre), roughness: 0.85 }), M.kraftO, M.kraft, M.kraft], 0, 0.003, L / 2); tapa.add(top);
  tapa.add(caja(L + 0.008, 0.03, 0.005, M.kraft, 0, -0.012, L + 0.004, 0.002));   // la pestaña de adelante
  g.userData = { bis, L, H };
  return sombras(g);
}
const abrirCaja = (c, u) => { c.userData.bis.rotation.x = -2.15 * eio(cl(u)); };
// ---------- la comanda (talonario) y la birome ----------
// k: cuánto de "1 MUZZA · 2 FAINÁ" (0..1) y de "DUBIMIOSO TERA 14??" (k2); circ: el círculo rojo en la B (0..1)
function dibujarComanda(x, W, H, k1, k2, circ = 0) {
  x.save(); x.scale(W / 600, H / 820); const w = 600, h = 820;
  x.fillStyle = "#f4f1e4"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 108); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "COMANDA N° 0347", 800, 54, w - 60); x.fillText("COMANDA N° 0347", 30, 56);
  x.strokeStyle = "#9fb0c8"; x.lineWidth = 3; for (let y = 230; y < h - 30; y += 115) { x.beginPath(); x.moveTo(24, y); x.lineTo(w - 24, y); x.stroke(); }
  x.fillStyle = "rgba(201,81,47,0.22)"; x.beginPath(); x.ellipse(w - 70, h - 70, 46, 34, 0.5, 0, 7); x.fill(); x.beginPath(); x.ellipse(w - 112, h - 46, 18, 12, 0.2, 0, 7); x.fill();
  x.fillStyle = "#0b1220"; x.font = CAV(100); x.textBaseline = "alphabetic";
  const esc = (txt, X, Y, k) => { const n = Math.round(txt.length * cl(k)); if (n > 0) x.fillText(txt.slice(0, n), X, Y); return x.measureText(txt.slice(0, n)).width; };
  esc("1 MUZZA", 36, 215, k1 * 2); esc("2 FAINÁ", 36, 330, k1 * 2 - 1);
  const wD = esc("DUBIMIOSO", 36, 445, k2 * 1.6); esc("TERA 14??", 36, 560, k2 * 1.6 - 0.6);
  if (circ > 0) {   // la B, marcada con un círculo rojo apagado
    x.font = CAV(100); const xB = 36 + x.measureText("DU").width, wB = x.measureText("B").width;
    x.strokeStyle = "#c7655b"; x.lineWidth = 11; x.lineCap = "round"; x.beginPath(); x.ellipse(xB + wB / 2, 410, wB * 0.95, 66, -0.1, -PI / 2, -PI / 2 + 2 * PI * cl(circ)); x.stroke();
  }
  x.restore();
  return wD;
}
const comandaT = lienzo(600, 820, (x, w, h) => dibujarComanda(x, w, h, 0, 0));
let comandaK = "";
function ponerComanda(k1, k2, circ) { const key = `${Math.round(k1 * 40)}|${Math.round(k2 * 40)}|${Math.round(circ * 20)}`; if (key === comandaK) return; comandaK = key; dibujarComanda(comandaT.userData.x, 600, 820, k1, k2, circ); comandaT.needsUpdate = true; }
function crearTalonario() {
  const g = new THREE.Group();
  g.add(caja(0.135, 0.012, 0.18, M.cr2, 0, 0.006, 0, 0.003));
  const hoja = mesh(new THREE.PlaneGeometry(0.13, 0.175), new THREE.MeshStandardMaterial({ map: comandaT, roughness: 0.85 }), 0, 0.0125, 0); hoja.rotation.x = -PI / 2; g.add(hoja);
  return sombras(g);
}
function crearBirome() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.13, 10), M.cr, 0, 0, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.0062, 0.0062, 0.035, 10), M.navy, 0, 0.055, 0));
  g.add(mesh(new THREE.ConeGeometry(0.0055, 0.016, 10).rotateX(PI), mat(0x3a3f4a, 0.5), 0, -0.073, 0));
  return sombras(g);
}
// el gancho de comandas: el pincho de acero en una base navy, con papelitos clavados y torcidos
function crearGancho() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.02, 20), M.navy3, 0, 0.01, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.003, 0.0045, 0.17, 8), M.acero, 0, 0.1, 0));
  const pap = mesh(new THREE.PlaneGeometry(0.075, 0.095), new THREE.MeshStandardMaterial({ color: 0xf1eee2, roughness: 0.9, side: THREE.DoubleSide }));
  for (let i = 0; i < 9; i++) { const p = pap.clone(); p.position.y = 0.025 + i * 0.012; p.rotation.set(-PI / 2 + (i % 3 - 1) * 0.18, (i * 1.7) % 6.28, (i % 2 ? 0.12 : -0.1)); g.add(p); }
  return sombras(g);
}
// ---------- la masa ----------
// un bollo (u = 0) que se estira y cuelga como un disco blando desparejo (u = 1): deformación de vértices fija
const MASA_G0 = (() => { const g = new THREE.SphereGeometry(0.07, 24, 16); g.userData.base = g.attributes.position.array.slice(); return g; })();
function crearMasa() { const m = mesh(MASA_G0.clone(), M.masa); m.geometry.userData.base = MASA_G0.userData.base; m.userData.u = -1; return m; }
function estirarMasa(m, u) {
  u = Math.round(cl(u) * 20) / 20; if (u === m.userData.u) return; m.userData.u = u;
  const p = m.geometry.attributes.position, b = m.geometry.userData.base;
  for (let i = 0; i < p.count; i++) {
    let x = b[i * 3], y = b[i * 3 + 1], z = b[i * 3 + 2];
    // u = 1: un disco de ~0,2 de diámetro, fino (z), que cuelga (y hacia abajo) desde arriba (la mano en y = 0,07)
    const yy = lerp(y, 0.07 - (0.07 - y) * 2.4 - Math.abs(x) * 0.25, u), xx = lerp(x, x * 1.45 + Math.sin(y * 40) * 0.008 * u, u), zz = lerp(z, z * 0.22, u);
    p.setXYZ(i, xx, yy - 0.03 * u * Math.sin(x * 30) * (y < 0 ? 1 : 0), zz);
  }
  p.needsUpdate = true; m.geometry.computeVertexNormals();
}
// el disco perfecto de Lucía (gira entre las manos)
function crearDisco() { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.16, 0.155, 0.012, 32), M.masa, 0, 0, 0)); g.add(mesh(new THREE.TorusGeometry(0.155, 0.009, 8, 32).rotateX(PI / 2), M.masa, 0, 0.004, 0)); return sombras(g); }
// ---------- el horno pizzero de acero (dos bocas, la de arriba abierta con la muzza adentro) y la pala ----------
function crearHorno() {
  const g = new THREE.Group();
  const W = 1.3, D = 0.95;
  for (const [x, z] of [[-W / 2 + 0.06, -D / 2 + 0.06], [W / 2 - 0.06, -D / 2 + 0.06], [-W / 2 + 0.06, D / 2 - 0.06], [W / 2 - 0.06, D / 2 - 0.06]]) g.add(caja(0.06, 0.5, 0.06, M.aceroO, x, 0.25, z, 0.01));
  for (const [y0, abierta] of [[0.5, false], [0.98, true]]) {
    const h = 0.46;
    if (abierta) {
      // cámara de cocción a la vista: piso de piedra, paredes y la luz crema cálida plana (sin bloom)
      g.add(caja(W, 0.05, D, M.navy3, 0, y0 + 0.025, 0, 0.01)); g.add(caja(W, 0.05, D, M.navy3, 0, y0 + h - 0.025, 0, 0.01));
      g.add(caja(0.06, h, D, M.navy3, -W / 2 + 0.03, y0 + h / 2, 0, 0.01)); g.add(caja(0.06, h, D, M.navy3, W / 2 - 0.03, y0 + h / 2, 0, 0.01)); g.add(caja(W, h, 0.05, M.navy3, 0, y0 + h / 2, -D / 2 + 0.025, 0.01));
      const fondo = mesh(new THREE.PlaneGeometry(W - 0.12, h - 0.1), M.luzHorno, 0, y0 + h / 2, -D / 2 + 0.06); g.add(fondo);
      const piso = mesh(new THREE.PlaneGeometry(W - 0.12, D - 0.1), mat(0xd9b98a, 0.9), 0, y0 + 0.052, 0); piso.rotation.x = -PI / 2; g.add(piso);
      for (const s of [-1, 1]) { const l = mesh(new THREE.PlaneGeometry(D - 0.1, h - 0.1), M.luzHorno, s * (W / 2 - 0.062), y0 + h / 2, 0); l.rotation.y = -s * PI / 2; g.add(l); }
      // la puerta abierta (rebatida hacia abajo) con la manija crema
      const pu = new THREE.Group(); pu.position.set(0, y0 + 0.05, D / 2); pu.rotation.x = PI / 2 - 0.05; g.add(pu);
      pu.add(caja(W - 0.1, h - 0.1, 0.04, M.acero, 0, (h - 0.1) / 2, 0.02, 0.01)); pu.add(caja(0.5, 0.035, 0.05, M.cr, 0, h - 0.18, 0.07, 0.012));
    } else {
      g.add(caja(W, h, D, M.navy3, 0, y0 + h / 2, 0, 0.012));
      g.add(caja(W - 0.12, h - 0.12, 0.03, M.acero, 0, y0 + h / 2, D / 2 + 0.01, 0.01)); g.add(caja(0.5, 0.035, 0.05, M.cr, 0, y0 + h / 2 + 0.1, D / 2 + 0.05, 0.012));
    }
  }
  g.add(caja(W + 0.04, 0.08, D + 0.04, M.aceroO, 0, 1.48, 0, 0.012));
  // la campana de acero gris arriba
  const camp = new THREE.Group(); camp.position.set(0, 2.05, 0); g.add(camp);
  camp.add(mesh(new THREE.CylinderGeometry(0.42, 0.95, 0.45, 4, 1).rotateY(PI / 4).scale(1, 1, 0.75), M.acero, 0, 0, 0));
  camp.add(caja(0.42, 0.9, 0.36, M.acero, 0, 0.62, -0.08, 0.01));
  const muzza = crearMuzza(false); muzza.position.set(0, 0.98 + 0.06, 0.05); g.add(muzza); g.userData.muzza = muzza;
  return sombras(g);
}
function crearPala() { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.016, 0.016, 1.35, 10), M.madera, 0, 0.675 + 0.34, 0)); g.add(caja(0.34, 0.34, 0.012, M.madera, 0, 0.17, 0, 0.03)); return sombras(g); }
// ---------- el casco integral (visera que sube) y la mochila térmica ----------
function crearCasco(color = MARCA.navy3) {
  const g = new THREE.Group(); const R = 0.37;
  const cm = mat(color, 0.4), fr = mat(0xefeee5, 0.5), neg = mat(0x14181f, 0.8);
  // arco horizontal (en el plano XZ) de ancho `arco`, centrado en el ángulo `centro` (PI/2 = adelante, -PI/2 = atrás)
  const arcoH = (r, tubo, arco, centro, m, y) => { const p = new THREE.Group(); p.rotation.y = arco / 2 - centro; p.position.y = y; const t = mesh(new THREE.TorusGeometry(r, tubo, 10, 32, arco), m); t.rotation.x = PI / 2; p.add(t); g.add(p); return p; };
  // la cáscara: arriba entera; abajo atrás y a los costados (la cara queda abierta adelante)
  g.add(mesh(new THREE.SphereGeometry(R, 32, 16, 0, PI * 2, 0, PI * 0.42), cm));
  g.add(mesh(new THREE.SphereGeometry(R, 32, 12, PI / 2 + 0.85, PI * 2 - 1.7, PI * 0.42, PI * 0.38), cm));
  // la mentonera: un arco grueso adelante, por debajo de la boca
  arcoH(R * 0.86, 0.055, 1.7, PI / 2, cm, -R * 0.62);
  // el borde negro de la ventana (arriba de las cejas) y la franja reflectiva crema atrás
  arcoH(R * 0.97, 0.018, 1.7, PI / 2, neg, R * Math.cos(PI * 0.42));
  arcoH(R * 1.005, 0.02, PI * 1.3, -PI / 2, fr, 0.05);
  // la visera levantada (bisagra a los costados): un casquete gris humo, semitransparente, sin brillo fuerte
  const vis = new THREE.Group(); g.add(vis);
  vis.add(mesh(new THREE.SphereGeometry(R * 1.04, 24, 10, PI / 2 - 0.95, 1.9, PI * 0.36, PI * 0.26), new THREE.MeshStandardMaterial({ color: 0x3a4250, roughness: 0.4, transparent: true, opacity: 0.6, depthWrite: false })));
  vis.rotation.x = -1.25;   // levantada
  for (const s of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 14).rotateZ(PI / 2), neg, s * R * 1.0, 0.0, 0.02));
  g.userData = { vis, R };
  return sombras(g);
}
function crearMochila(color = MARCA.navy3, franja = MARCA.cr) {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.42, 0.42, 0.36, 0.05), mat(color, 0.7), 0, 0, 0));
  g.add(caja(0.425, 0.04, 0.365, mat(franja, 0.5), 0, 0.08, 0, 0.01));
  g.add(caja(0.3, 0.03, 0.03, mat(0x14181f, 0.7), 0, 0.2, 0.19, 0.01));
  return sombras(g);
}
// ---------- la moto de reparto (110 cc, sin logo) ----------
function crearMoto(color = MARCA.navy3, baul = MARCA.cr) {
  const g = new THREE.Group(); const cm = mat(color, 0.45), go = M.goma ?? mat(0x23262c, 0.85), cr = M.acero;
  const rueda = (z) => { const r = new THREE.Group(); r.position.set(0, 0.28, z); r.add(mesh(new THREE.TorusGeometry(0.22, 0.065, 10, 28).rotateY(PI / 2), go, 0, 0, 0)); r.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 20).rotateZ(PI / 2), mat(0xd9d7c9, 0.5), 0, 0, 0)); g.add(r); return r; };
  rueda(-0.62); rueda(0.62);
  g.add(caja(0.2, 0.18, 0.95, cm, 0, 0.48, -0.05, 0.05));                // el cuerpo
  g.add(caja(0.26, 0.09, 0.6, mat(0x14181f, 0.8), 0, 0.68, -0.18, 0.04)); // el asiento
  const fr = mesh(rbox(0.34, 0.55, 0.12, 0.05), cm, 0, 0.75, 0.45); fr.rotation.x = -0.35; g.add(fr);   // el escudo de adelante
  g.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8).rotateZ(PI / 2), cr, 0, 1.05, 0.55));       // el manubrio
  g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16).rotateX(PI / 2), M.luz, 0, 0.96, 0.62));  // el faro
  { const h = mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8), cr, 0, 0.55, 0.58); h.rotation.x = -0.35; g.add(h); }   // la horquilla
  g.add(caja(0.42, 0.36, 0.4, mat(baul, 0.6), 0, 0.92, -0.55, 0.05));                                   // el baúl
  const luzT = mesh(new THREE.BoxGeometry(0.12, 0.04, 0.02), new THREE.MeshBasicMaterial({ color: 0x7a3a34 }), 0, 0.62, -0.62); g.add(luzT);
  g.userData.luzT = luzT;
  return sombras(g);
}
// ---------- la impresora térmica, el ticket y el riel ----------
const TICKET_TXT = [["#47", 900, 66], ["1 MUZZA", 800, 46], ["2 FAINÁ", 800, 46], ["DUVIMIOSO", 700, 40], ["TERRA 1432", 700, 40], ["PAGADO ✓", 900, 48, "#3fa60a"], ["22:16", 700, 36]];
function dibujarTicket(x, W, H, lineas = TICKET_TXT) {
  x.fillStyle = "#f7f6ee"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 10);
  let y = 30; x.textAlign = "left"; x.textBaseline = "top";
  for (const [l, p, s, c] of lineas) { x.fillStyle = c ?? "#0b1220"; x.font = `${p} ${s}px "Lexend", sans-serif`; if (x.measureText(l).width > W - 40) ajustar(x, l, p, s, W - 40); x.fillText(l, 22, y); y += s * 1.32; }
  x.strokeStyle = "#9fb0c8"; x.lineWidth = 3; x.setLineDash([8, 8]); x.beginPath(); x.moveTo(10, H - 12); x.lineTo(W - 10, H - 12); x.stroke(); x.setLineDash([]);
}
const ticketT = lienzo(320, 560, (x, w, h) => dibujarTicket(x, w, h));
const ticketMini = (n) => lienzo(160, 280, (x, w, h) => dibujarTicket(x, w, h, [[`#${n}`, 900, 44], ["1 MUZZA", 800, 22], ["PAGADO ✓", 900, 22, "#3fa60a"]]));
function crearImpresora() {
  const g = new THREE.Group();
  g.add(caja(0.15, 0.1, 0.18, M.navy3, 0, 0.05, 0, 0.025));
  g.add(caja(0.13, 0.03, 0.11, M.navy, 0, 0.105, -0.025, 0.012));
  g.add(caja(0.1, 0.006, 0.01, mat(0x14181f, 0.7), 0, 0.1, 0.035, 0.002));
  g.add(mesh(new THREE.SphereGeometry(0.008, 10, 8), mat(0x5ce611, 0.4), 0.05, 0.08, 0.091));
  // el ticket que sale: un plano que crece hacia arriba desde la ranura (se escala con u) con la punta curvada
  const tk = new THREE.Group(); tk.position.set(0, 0.102, 0.035); g.add(tk);
  const pl = mesh(new THREE.PlaneGeometry(0.08, 0.14), new THREE.MeshBasicMaterial({ map: ticketT, side: THREE.DoubleSide, toneMapped: false }), 0, 0.07, 0); pl.castShadow = false; tk.add(pl);
  g.userData = { tk, pl };
  return sombras(g);
}
// u: 0 (adentro) .. 1 (afuera entero, 14 cm); el plano se recorta con el UV (sale de la ranura, el texto de arriba primero)
function sacarTicket(imp, u) {
  const { tk, pl } = imp.userData; u = cl(u);
  tk.visible = u > 0.01; if (!tk.visible) return;
  pl.scale.y = u; pl.position.y = 0.07 * u; tk.rotation.x = -0.12 - 0.25 * u;
  const uv = pl.geometry.attributes.uv; uv.setY(0, 1); uv.setY(1, 1); uv.setY(2, 1 - u); uv.setY(3, 1 - u); uv.needsUpdate = true;
}
function crearRiel(n = 6) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.0, 10).rotateZ(PI / 2), M.acero, 0, 0, 0));
  for (const s of [-1, 1]) g.add(caja(0.03, 0.06, 0.04, M.aceroO, s * 0.5, 0, -0.02, 0.005));
  for (let i = 0; i < n; i++) { const t = mesh(new THREE.PlaneGeometry(0.08, 0.14), new THREE.MeshStandardMaterial({ map: ticketMini(41 + i), roughness: 0.85 }), -0.4 + i * 0.13, -0.075, 0.013); g.add(t); }
  return sombras(g);
}


// ===== 20-sets.js: las dos pizzerías enfrentadas (el mismo módulo, en espejo), la calle, el living y la puerta de Martín =====
// Mundo: Pizzería Don Tano con la vidriera en z = 0 y el local hacia -z; la calle de z = 0 a z = CALLE; Lucía Pizzas es el
// mismo módulo girado 180° con la vidriera en z = CALLE (su local hacia +z). Coordenadas LOCALES del módulo: x a lo ancho,
// el mostrador en z = MZ (de frente a +z, la vidriera), el horno contra el fondo (z = FZ).
const CALLE = 9.0;
const LOC = { XL: -2.6, XR: 2.6, FZ: -5.5, H: 3.0, MZ: -2.75, MW: 2.8, MD: 0.62, MA: 0.8, VX0: -2.2, VX1: 0.7, VY0: 0.75, VY1: 2.45, PX0: 1.15, PX1: 2.05, PH: 2.3 };
const subteT = (junta) => lienzo(512, 256, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = junta; for (let j = 0; j < 4; j++) { x.fillRect(0, j * 64, w, 5); for (let i = 0; i < 5; i++) x.fillRect(i * 128 + (j % 2 ? 64 : 0), j * 64, 5, 64); } });
const ladrilloT = (base, junta) => lienzo(512, 256, (x, w, h) => { x.fillStyle = junta; x.fillRect(0, 0, w, h); x.fillStyle = base; for (let j = 0; j < 8; j++) for (let i = -1; i < 5; i++) x.fillRect(i * 128 + (j % 2 ? 64 : 0) + 4, j * 32 + 4, 120, 24); });
const pisoLocT = lienzo(512, 512, (x, w, h) => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#b9bec4" : "#d9d7c9"; x.fillRect(i * 128, j * 128, 128, 128); } });
pisoLocT.wrapS = pisoLocT.wrapT = THREE.RepeatWrapping; pisoLocT.repeat.set(5.2 / 0.6, 5.5 / 0.6);
const conRep = (t, rx, ry) => { const c = t.clone(); c.wrapS = c.wrapT = THREE.RepeatWrapping; c.repeat.set(rx, ry); c.needsUpdate = true; return c; };
// texto plano en un lienzo (toldos, pizarra, vinilo)
function cartelT(w, h, fondo, dib) { return lienzo(w, h, (x) => { x.fillStyle = fondo; x.fillRect(0, 0, w, h); x.textAlign = "center"; x.textBaseline = "middle"; dib(x, w, h); }); }
function crearLocal(tipo) {
  const L = LOC, g = new THREE.Group(), esT = tipo === "tano";
  const arriba = esT ? mat(0x365f28, 0.9) : mat(0x16243d, 0.9);
  const sub = subteT("#1f3254");
  // piso, techo, paredes (azulejo subte crema hasta 1,6 y arriba el color del local)
  const piso = mesh(new THREE.PlaneGeometry(L.XR - L.XL, -L.FZ), new THREE.MeshStandardMaterial({ map: pisoLocT, roughness: 0.85 }), 0, 0, L.FZ / 2); piso.rotation.x = -PI / 2; piso.castShadow = false; g.add(piso);
  const techo = mesh(new THREE.PlaneGeometry(L.XR - L.XL, -L.FZ), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, L.H, L.FZ / 2); techo.rotation.x = PI / 2; techo.castShadow = false; g.add(techo);
  const pared = (w, x, z, ry) => {
    const az1 = mesh(new THREE.PlaneGeometry(w, 1.6), new THREE.MeshStandardMaterial({ map: conRep(sub, w / 0.6, 1.6 / 0.3), roughness: 0.6 }), x, 0.8, z); az1.rotation.y = ry; az1.castShadow = false; g.add(az1);
    const ar = mesh(new THREE.PlaneGeometry(w, L.H - 1.6), arriba, x, 1.6 + (L.H - 1.6) / 2, z); ar.rotation.y = ry; ar.castShadow = false; g.add(ar);
    const gu = mesh(new THREE.PlaneGeometry(w, 0.05), M.navy3, x, 1.6, z); gu.rotation.y = ry; gu.position.add(V3(Math.sin(ry) * 0.004, 0, Math.cos(ry) * 0.004)); g.add(gu);
  };
  pared(L.XR - L.XL, 0, L.FZ, 0); pared(-L.FZ, L.XL, L.FZ / 2, PI / 2); pared(-L.FZ, L.XR, L.FZ / 2, -PI / 2);
  // el tubo de luz del techo (crema plano)
  for (const z of [-1.4, -3.6]) g.add(mesh(new THREE.BoxGeometry(1.4, 0.04, 0.1), M.luz, 0, L.H - 0.03, z));
  // el mostrador: tapa de mármol crema, frente navy (Don Tano) o navy con la franja verde de marca (Lucía)
  const mo = new THREE.Group(); mo.position.set(0, 0, L.MZ); g.add(mo);
  mo.add(caja(L.MW + 0.08, 0.05, L.MD + 0.08, M.marmol, 0, L.MA - 0.025, 0, 0.012));
  mo.add(caja(L.MW, L.MA - 0.05, L.MD, M.navy, 0, (L.MA - 0.05) / 2, 0, 0.012));
  if (!esT) mo.add(caja(L.MW - 0.02, 0.14, 0.02, M.g, 0, L.MA - 0.22, L.MD / 2 + 0.005, 0.01));
  else for (const x of [-0.9, 0, 0.9]) mo.add(caja(0.86, 0.6, 0.015, M.navy3, x, 0.42, L.MD / 2 + 0.004, 0.01));
  // la mesada del fondo a la derecha (x 0,4 a 2,5): cajas, pizarra arriba
  g.add(caja(2.1, 0.9, 0.6, M.navy3, 1.45, 0.45, L.FZ + 0.32, 0.012)); g.add(caja(2.14, 0.04, 0.64, M.marmol, 1.45, 0.92, L.FZ + 0.32, 0.01));
  // el horno contra el fondo a la izquierda y la pala apoyada
  const horno = crearHorno(); horno.position.set(-1.15, 0, L.FZ + 0.52); g.add(horno);
  const pala = crearPala(); pala.position.set(-2.3, 0, L.FZ + 0.28); pala.rotation.set(0.12, 0.4, -0.1); g.add(pala);
  // la pila de cajas kraft en la mesada (Don Tano: torcidas; Lucía: armadas con el ticket pegado, en un estante)
  for (let i = 0; i < 7; i++) { const c = caja(0.42, 0.045, 0.42, M.kraft, 2.0 + (esT ? (i % 3 - 1) * 0.03 : 0), 0.965 + i * 0.047, L.FZ + 0.3, 0.004); c.rotation.y = esT ? ((i * 5) % 7 - 3) * 0.06 : 0; g.add(c); }
  if (!esT) { g.add(caja(1.2, 0.03, 0.4, M.navy3, 1.2, 1.95, L.FZ + 0.2, 0.008)); for (let i = 0; i < 3; i++) { const c = caja(0.36, 0.08, 0.36, M.kraft, 0.8 + i * 0.4, 2.005, L.FZ + 0.2, 0.004); g.add(c); g.add(plano(0.09, 0.07, ticketMini(44 + i), 0.8 + i * 0.4, 2.005, L.FZ + 0.385)); } }
  // la pizarra de precios (navy con tiza crema)
  const piz = cartelT(900, 560, "#0b1220", (x, w, h) => {
    x.strokeStyle = "#8f969f"; x.lineWidth = 22; x.strokeRect(11, 11, w - 22, h - 22); x.fillStyle = "#efeee5";
    const filas = [["MUZZA", "$ 520"], ["FUGAZZETA", "$ 580"], ["JAMÓN Y MORRÓN", "$ 610"], ["FAINÁ", "$ 110"]];
    x.font = CAV(92); x.fillText(esT ? "PIZZAS" : "MENÚ", w / 2, 92);
    filas.forEach(([a, b], i) => { x.textAlign = "left"; x.font = CAV(66); x.fillText(a, 60, 200 + i * 92); x.textAlign = "right"; x.fillText(b, w - 60, 200 + i * 92); x.textAlign = "center"; });
  });
  g.add(caja(1.12, 0.72, 0.03, M.navy3, 1.2, 2.25, L.FZ + 0.02, 0.01)); g.add(plano(1.06, 0.66, piz, 1.2, 2.25, L.FZ + 0.04));
  // la fachada (pared con la vidriera y la puerta), del lado de la calle
  const lad = conRep(esT ? ladrilloT("#1f3254", "#0b1220") : ladrilloT("#d9d7c9", "#b4b2a3"), 1, 1);
  const fach = esT ? mat(0x1f3254, 0.85) : mat(0xd9d7c9, 0.85);
  const muro = (x0, x1, y0, y1) => { const w = x1 - x0, h = y1 - y0; const t = lad.clone(); t.needsUpdate = true; t.repeat.set(w / 1.2, h / 0.6); const m = mesh(new THREE.BoxGeometry(w, h, 0.22), [fach, fach, fach, fach, new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), esT ? mat(0x365f28, 0.9) : mat(0x16243d, 0.9)], (x0 + x1) / 2, (y0 + y1) / 2, -0.11); m.castShadow = false; g.add(m); };
  muro(L.XL - 1.4, L.VX0, 0, 4.4); muro(L.VX0, L.VX1, 0, L.VY0); muro(L.VX0, L.VX1, L.VY1, 4.4); muro(L.VX1, L.PX0, 0, 4.4); muro(L.PX0, L.PX1, L.PH, 4.4); muro(L.PX1, L.XR + 1.4, 0, 4.4);
  // marcos navy de la vidriera y de la puerta
  for (const [x, y, w, h] of [[(L.VX0 + L.VX1) / 2, L.VY0, L.VX1 - L.VX0 + 0.1, 0.08], [(L.VX0 + L.VX1) / 2, L.VY1, L.VX1 - L.VX0 + 0.1, 0.08], [L.VX0, (L.VY0 + L.VY1) / 2, 0.08, L.VY1 - L.VY0], [L.VX1, (L.VY0 + L.VY1) / 2, 0.08, L.VY1 - L.VY0], [L.PX0, L.PH / 2, 0.08, L.PH], [L.PX1, L.PH / 2, 0.08, L.PH], [(L.PX0 + L.PX1) / 2, L.PH, L.PX1 - L.PX0 + 0.08, 0.08]]) g.add(caja(w, h, 0.26, esT ? M.navy : M.navy3, x, y, -0.11, 0.01));
  // el toldo (navy con "DON TANO · PIZZAS" crema / crema con "LUCÍA · PIZZAS" navy) y el faldón con el texto
  const tf = esT ? "#16243d" : "#efeee5", tt = esT ? "#efeee5" : "#16243d";
  const toldoM = mat(new THREE.Color(tf).getHex(), 0.8);
  const to = mesh(new THREE.BoxGeometry(L.VX1 - L.VX0 + 2.0, 0.04, 1.35), toldoM, (L.VX0 + L.PX1) / 2, 2.98, 0.62); to.rotation.x = 0.36; g.add(to);
  const fal = cartelT(2000, 220, tf, (x, w, h) => { x.fillStyle = tt; ajustar(x, esT ? "DON TANO · PIZZAS" : "LUCÍA · PIZZAS", 900, 150, w - 160); x.fillText(esT ? "DON TANO · PIZZAS" : "LUCÍA · PIZZAS", w / 2, h / 2 + 8); x.fillStyle = esT ? "#5ce611" : "#365f28"; x.fillRect(0, h - 18, w, 18); });
  const fw = L.PX1 - L.VX0 + 0.4;
  g.add(caja(fw, 0.36, 0.03, toldoM, (L.VX0 + L.PX1) / 2, 2.6, 1.27, 0.01)); g.add(plano(fw - 0.04, 0.34, fal, (L.VX0 + L.PX1) / 2, 2.6, 1.29));
  sombras(g);
  // lo que no se fusiona (transparente o que se mueve)
  const vidrio = mesh(new THREE.PlaneGeometry(L.VX1 - L.VX0, L.VY1 - L.VY0), new THREE.MeshStandardMaterial({ color: 0xb9cde0, roughness: 0.1, transparent: true, opacity: 0.14, depthWrite: false }), (L.VX0 + L.VX1) / 2, (L.VY0 + L.VY1) / 2, -0.05); vidrio.castShadow = false; vidrio.receiveShadow = false;
  const hoja = new THREE.Group(); hoja.position.set(L.PX0 + 0.04, 0, -0.08);
  hoja.add(caja(L.PX1 - L.PX0 - 0.08, L.PH - 0.04, 0.05, esT ? M.navy : M.navy3, (L.PX1 - L.PX0 - 0.08) / 2, (L.PH - 0.04) / 2, 0, 0.01));
  hoja.add(mesh(new THREE.PlaneGeometry(L.PX1 - L.PX0 - 0.3, 1.3), vidrio.material, (L.PX1 - L.PX0 - 0.08) / 2, 1.3, 0.03));
  hoja.add(caja(0.04, 0.3, 0.06, M.acero, L.PX1 - L.PX0 - 0.2, 1.05, 0.05, 0.01));
  return { g, horno, vidrio, hoja };
}
const TANO = crearLocal("tano"); scene.add(TANO.g); fusionar(TANO.g); TANO.g.add(TANO.vidrio, TANO.hoja);
const LUCI = crearLocal("lucia"); LUCI.g.rotation.y = PI; LUCI.g.position.z = CALLE; scene.add(LUCI.g); fusionar(LUCI.g); LUCI.g.add(LUCI.vidrio, LUCI.hoja);
// de local a mundo (para cada pizzería)
const enT = (x, y, z) => V3(x, y, z);
const enL = (x, y, z) => V3(-x, y, CALLE - z);
// el vinilo "Pedí online" con el QR (cuadritos ilegibles a propósito) en la vidriera de Lucía, mirando a la calle
const vinT = lienzo(600, 600, (x, w, h) => {
  x.clearRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(10, 10, w - 20, h - 20, 40); x.fill();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 88); x.fillText("Pedí online", w / 2, 92);
  semilla = 3; const q = 300, q0 = (w - q) / 2, n = 15, c = q / n;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const esq = (i < 4 && j < 4) || (i > 10 && j < 4) || (i < 4 && j > 10); if (esq ? (i % 3 === 0 || j % 3 === 0 || (i % 3 === 1 && j % 3 === 1)) && !((i === 1 || i === 2 || i === 12 || i === 13) && (j === 1 || j === 2 || j === 12 || j === 13) && !(i % 3 === 1 && j % 3 === 1)) : az() > 0.5) x.fillRect(q0 + i * c, 170 + j * c, c, c); }
  x.fillStyle = "#3fa60a"; x.font = F(800, 50); x.fillText("y pagás ahí", w / 2, 530);
});
const VINILO = plano(0.95, 0.95, vinT, 0, 0, 0, true); VINILO.material.transparent = true; VINILO.position.copy(enL(-1.3, 1.55, 0.02)); VINILO.rotation.y = PI; scene.add(VINILO);   // mira a -z del mundo (hacia Don Tano)
// ---------- la calle de noche: veredas crema, adoquines navy, el farol, vecinos a los costados ----------
const CAL = new THREE.Group(); scene.add(CAL);
{
  const adoq = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; for (let j = 0; j < 8; j++) { x.fillRect(0, j * 64, w, 5); for (let i = 0; i < 5; i++) x.fillRect(i * 128 + (j % 2 ? 64 : 0), j * 64, 5, 64); } });
  adoq.wrapS = adoq.wrapT = THREE.RepeatWrapping; adoq.repeat.set(30 / 2.4, 5 / 2.4);
  const calle = mesh(new THREE.PlaneGeometry(30, CALLE - 4), new THREE.MeshStandardMaterial({ map: adoq, roughness: 0.9 }), 0, 0, CALLE / 2); calle.rotation.x = -PI / 2; calle.castShadow = false; CAL.add(calle);
  for (const z of [1, CALLE - 1]) { CAL.add(caja(30, 0.14, 2, mat(0xd9d7c9, 0.85), 0, 0.07, z, 0.01)); CAL.add(caja(30, 0.15, 0.1, mat(0xb4b2a3, 0.8), 0, 0.075, z < 4 ? 2 : CALLE - 2, 0.01)); }
  // la senda peatonal (rayas crema) entre las dos pizzerías: se lee "cruzar la calle" desde arriba
  for (let i = 0; i < 6; i++) { const r = mesh(new THREE.PlaneGeometry(1.8, 0.42), mat(0xd9d7c9, 0.85), 1.4, 0.006, 2.55 + i * 0.8); r.rotation.x = -PI / 2; r.castShadow = false; CAL.add(r); }
  // vecinos: fachadas lisas navy a los costados (los dos lados), con ventanas crema apagadas
  for (const [zf, sz] of [[0, 1], [CALLE, -1]]) for (const x of [-7.5, 7.5]) { CAL.add(caja(10.4 - 5.2 + 0.4, 5, 0.4, mat(x < 0 ? 0x16243d : 0x1f3254, 0.9), x, 2.5, zf - sz * 0.2, 0.01)); for (const dx of [-1.2, 1.2]) CAL.add(caja(1.0, 1.2, 0.05, mat(0x2c4268, 0.6), x + dx, 1.9, zf + sz * 0.01, 0.01)); }
  // el farol (en la vereda de Lucía, entre los dos locales)
  const fa = new THREE.Group(); fa.position.set(3.4, 0.14, CALLE - 1.6); CAL.add(fa);
  fa.add(mesh(new THREE.CylinderGeometry(0.05, 0.07, 3.6, 10), M.navy3, 0, 1.8, 0)); fa.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8).rotateZ(PI / 2), M.navy3, -0.35, 3.55, 0));
  fa.add(mesh(new THREE.ConeGeometry(0.2, 0.22, 16, 1, true), mat(0x1f3254, 0.6, { side: THREE.DoubleSide }), -0.7, 3.42, 0)); fa.add(mesh(new THREE.SphereGeometry(0.1, 12, 8), M.luz, -0.7, 3.32, 0));
  sombras(CAL);
}
fusionar(CAL);
const luzFarol = new THREE.PointLight(0xffe6bf, 0, 9, 1.5); luzFarol.position.set(2.7, 3.2, CALLE - 1.6); scene.add(luzFarol);
// ---------- el living de Martín (x = LX): pared crema, el sillón verde apagado, la lámpara de pie ----------
const LX = 40;
const LIV = new THREE.Group(); LIV.position.x = LX; scene.add(LIV);
{
  const piso = mesh(new THREE.PlaneGeometry(8, 6), mat(0xb98d5e, 0.85), 0, 0, 0); piso.rotation.x = -PI / 2; piso.castShadow = false; LIV.add(piso);
  LIV.add(mesh(new THREE.BoxGeometry(8, 3, 0.2), mat(0xe9e5d6, 0.9), 0, 1.5, -1.6));
  LIV.add(mesh(new THREE.BoxGeometry(0.2, 3, 6), mat(0xd9d4c2, 0.9), -2.6, 1.5, 1.0));
  const alf = mesh(new THREE.PlaneGeometry(2.4, 1.6), mat(0x1f3254, 0.95), 0.1, 0.004, 0.2); alf.rotation.x = -PI / 2; alf.castShadow = false; LIV.add(alf);
  // el sillón (dos cuerpos) verde apagado
  const so = new THREE.Group(); so.position.set(0, 0, -0.95); LIV.add(so); const sm = mat(0x365f28, 0.9), sm2 = mat(0x2c4f20, 0.9);
  so.add(caja(2.0, 0.38, 0.85, sm2, 0, 0.19, 0, 0.06)); so.add(caja(0.92, 0.16, 0.7, sm, -0.47, 0.46, 0.06, 0.06)); so.add(caja(0.92, 0.16, 0.7, sm, 0.47, 0.46, 0.06, 0.06));
  so.add(caja(2.0, 0.62, 0.22, sm, 0, 0.66, -0.34, 0.08)); for (const s of [-1, 1]) so.add(caja(0.2, 0.5, 0.85, sm, s * 1.05, 0.5, 0, 0.08));
  so.add(caja(0.36, 0.3, 0.12, mat(0xefeee5, 0.95), 0.75, 0.66, -0.15, 0.05));
  // la lámpara de pie (luz crema plana) y un cuadro
  const la = new THREE.Group(); la.position.set(1.6, 0, -1.0); LIV.add(la); la.add(mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.03, 16), M.navy3, 0, 0.015, 0)); la.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5, 8), M.navy3, 0, 0.75, 0)); la.add(mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.3, 20, 1, true), mat(0xefeee5, 0.8, { side: THREE.DoubleSide }), 0, 1.6, 0));
  LIV.add(caja(0.9, 0.6, 0.03, M.navy3, -0.6, 1.75, -1.49, 0.01)); LIV.add(caja(0.8, 0.5, 0.01, mat(0x5ce611, 0.8), -0.6, 1.75, -1.47, 0.006)); LIV.add(caja(0.8, 0.2, 0.012, mat(0x16243d, 0.8), -0.6, 1.6, -1.465, 0.004));
  // la mesa ratona
  LIV.add(caja(0.9, 0.05, 0.5, M.cr, 0.0, 0.4, 0.35, 0.012)); for (const [a, b] of [[-0.4, 0.15], [0.4, 0.15], [-0.4, 0.55], [0.4, 0.55]]) LIV.add(caja(0.04, 0.38, 0.04, M.navy3, a, 0.19, b, 0.006));
  sombras(LIV);
}
fusionar(LIV);
// ---------- la puerta de Martín (x = PX2): el palier de afuera crema, la puerta navy2 que abre hacia adentro ----------
const PX2 = 60, PZ2 = -1.0;
const PUE = new THREE.Group(); PUE.position.x = PX2; scene.add(PUE);
{
  const piso = mesh(new THREE.PlaneGeometry(6, 5), mat(0xb98d5e, 0.85), 0, 0, 1.4); piso.rotation.x = -PI / 2; piso.castShadow = false; PUE.add(piso);
  const pm = mat(0xe9e5d6, 0.9);
  PUE.add(mesh(new THREE.BoxGeometry(2.2, 2.8, 0.14), pm, -1.6, 1.4, PZ2)); PUE.add(mesh(new THREE.BoxGeometry(2.2, 2.8, 0.14), pm, 1.6, 1.4, PZ2)); PUE.add(mesh(new THREE.BoxGeometry(1.0, 0.6, 0.14), pm, 0, 2.5, PZ2));
  for (const x of [-0.53, 0.53]) PUE.add(caja(0.08, 2.24, 0.18, M.cr, x, 1.12, PZ2, 0.01)); PUE.add(caja(1.14, 0.08, 0.18, M.cr, 0, 2.24, PZ2, 0.01));
  // afuera: el palier (pared crema con la luz crema, piso)
  const af = mesh(new THREE.PlaneGeometry(6, 3), new THREE.MeshBasicMaterial({ color: 0xd9cdaa }), 0, 1.5, PZ2 - 2.0); af.castShadow = false; PUE.add(af);
  const ve = mesh(new THREE.PlaneGeometry(6, 2.0), mat(0xb4b2a3, 0.9), 0, 0.001, PZ2 - 1.0); ve.rotation.x = -PI / 2; ve.castShadow = false; PUE.add(ve);
  PUE.add(mesh(new THREE.SphereGeometry(0.1, 12, 8), M.luz, 0, 2.6, PZ2 - 1.9));
  // el perchero con la campera y un cuadro
  PUE.add(caja(0.5, 0.6, 0.03, M.navy3, -1.3, 1.6, PZ2 + 0.09, 0.01)); PUE.add(caja(0.4, 0.5, 0.01, mat(0xc9a774, 0.8), -1.3, 1.6, PZ2 + 0.11, 0.006));
  sombras(PUE);
}
fusionar(PUE);
const PHOJA = new THREE.Group(); PHOJA.position.set(PX2 + 0.49, 0, PZ2 + 0.05); scene.add(PHOJA);
{ PHOJA.add(caja(0.96, 2.16, 0.05, M.navy2, -0.48, 1.08, 0, 0.01)); PHOJA.add(caja(0.8, 0.04, 0.06, M.cr, -0.48, 1.6, 0.0, 0.01)); PHOJA.add(mesh(new THREE.SphereGeometry(0.03, 12, 10), M.acero, -0.86, 1.05, 0.05)); sombras(PHOJA); }


// ===== 30-personajes.js: Tano, Facu, Lucía, Sabri, Martín y lo que llevan encima =====
const tano = crearPersonaje({ ...ELENCO.tano, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3c + 0.55)] });
const facu = crearPersonaje({ ...ELENCO.facu, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const lucia = crearPersonaje({ ...ELENCO.lucia, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q1 + 1.2), r2(T.q3b + 0.6)] });
const sabri = crearPersonaje({ ...ELENCO.sabri, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const martin = crearPersonaje({ ...ELENCO.martin, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q2 + 0.3)] });
const TODOS = [tano, facu, lucia, sabri, martin];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// Tano: la harina en el delantal (manchas crema planas) y el repasador verde apagado al hombro derecho
{
  const hm = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.85, depthWrite: false });
  for (const [x, y, s] of [[0.06, 0.12, 0.05], [-0.08, 0.2, 0.035], [0.02, 0.3, 0.03], [-0.03, 0.05, 0.04], [0.1, 0.24, 0.025]]) { const m = mesh(new THREE.CircleGeometry(s, 14), hm, x, y, 0.262); m.scale.y = 0.7; m.castShadow = false; tano.cuerpo.add(m); }
  const rep = caja(0.12, 0.012, 0.3, M.gaz, -0.2, 0.47, 0.0, 0.004); rep.rotation.z = 0.5; tano.cuerpo.add(rep);
  const rep2 = caja(0.11, 0.2, 0.012, M.gaz, -0.235, 0.37, 0.14, 0.004); rep2.rotation.z = 0.18; tano.cuerpo.add(rep2);
}
// Lucía: el pañuelo verde de marca que envuelve el rodete y la harina en los antebrazos (puntitos claros)
{
  const pm = mat(MARCA.g, 0.6);
  const ban = mesh(new THREE.SphereGeometry(1, 32, 12, 0, PI * 2, 0, PI * 0.36), pm, 0, 0.276 + 0.012, -0.03); ban.scale.setScalar(0.322); ban.rotation.x = -0.5; lucia.cabeza.add(ban);
  const nudo = mesh(new THREE.SphereGeometry(0.05, 12, 8), pm, 0, 0.276 + 0.36, -0.24); nudo.scale.set(1.3, 0.8, 0.8); lucia.cabeza.add(nudo);
  for (const s of [-1, 1]) { const pt = mesh(new THREE.SphereGeometry(0.03, 10, 8), pm, 0.04 * s, 0.276 + 0.33, -0.3); pt.scale.set(0.8, 1.6, 0.5); pt.rotation.z = s * 0.6; lucia.cabeza.add(pt); }
}
// Martín: la capucha del buzo (un rollo en la nuca)
{ const ca = mesh(new THREE.TorusGeometry(0.15, 0.05, 8, 20), mat(0x2c4f20, 0.9), 0, 0.52, -0.1); ca.rotation.x = PI / 2 - 0.5; ca.scale.set(1.1, 1, 0.7); martin.cuerpo.add(ca); }
// los cascos (Facu navy3, Sabri verde apagado) y las mochilas térmicas
const CASCO_F = crearCasco(MARCA.navy3), CASCO_S = crearCasco(0x365f28);
scene.add(CASCO_F, CASCO_S);
const MOCH_F = crearMochila(MARCA.navy3, MARCA.cr), MOCH_S = crearMochila(MARCA.navy2, MARCA.cr);
facu.cuerpo.add(MOCH_F); MOCH_F.position.set(0, 0.26, -0.33); MOCH_F.scale.setScalar(0.95);
sabri.cuerpo.add(MOCH_S); MOCH_S.position.set(0, 0.26, -0.33); MOCH_S.scale.setScalar(0.9);
// el casco en la cabeza (calza: el centro del casco en el centro del cráneo) o en la mano
const CR_HEAD = V3(0, 0.276 + 0.03, -0.01);
function cascoEnCabeza(c, per) { if (c.parent !== per.cabeza) { per.cabeza.add(c); } c.position.copy(CR_HEAD); c.rotation.set(0, 0, 0); c.scale.setScalar(1); }
function cascoEnMano(c, per, lado = "I") { if (c.parent !== scene) scene.add(c); const m = manoMundo(per, lado, _a); c.position.copy(m).add(V3(0, -0.2, 0.02)); per.cuerpo.getWorldQuaternion(_q); c.quaternion.copy(_q); c.rotateX(0.4); c.scale.setScalar(0.92); }
// los celulares: el del hombro de Tano (canto navy3), el del mostrador (funda verde apagado), el de Martín y el de Sabri
const pantTano = lienzo(400, 820, () => {}), pantMart = lienzo(400, 820, () => {}), pantSab = lienzo(400, 820, () => {});
const celHombro = crearCelular(lienzo(40, 80, (x, w, h) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); }), 0x8f969f, 0.078, 0.16); scene.add(celHombro);
const celMostr = crearCelular(pantTano, 0x365f28, 0.08, 0.162); scene.add(celMostr);
const celMart = crearCelular(pantMart, MARCA.navy, 0.08, 0.162); scene.add(celMart);
const celSab = crearCelular(pantSab, MARCA.navy2, 0.08, 0.162); scene.add(celSab);
// la tablet de Lucía en el atril (tablero de pedidos / panel)
const pantTab = lienzo(1000, 760, () => {});
const tabletL = crearTablet(pantTab, 0.34, 0.25, 0.35); scene.add(tabletL);
// la impresora, el riel, el talonario, la birome, el gancho, la masa, el disco de Lucía
const IMP = crearImpresora(); scene.add(IMP);
const RIEL = crearRiel(5); scene.add(RIEL);
const TALON = crearTalonario(); scene.add(TALON);
const BIROME = crearBirome(); scene.add(BIROME);
const GANCHO = crearGancho(); scene.add(GANCHO);
const MASA = crearMasa(); scene.add(MASA);
const DISCO = crearDisco(); scene.add(DISCO);
const SERV = new THREE.Group(); { SERV.add(caja(0.12, 0.1, 0.06, M.acero, 0, 0.05, 0, 0.01)); for (let i = 0; i < 4; i++) SERV.add(mesh(new THREE.BoxGeometry(0.1, 0.08, 0.004), M.cr, 0, 0.075, -0.015 + i * 0.01)); scene.add(sombras(SERV)); }
// las cajas que viajan: la de Don Tano que vuelve (P3, P4), la de Lucía con el ticket #47 (Q3, Q4); y su pizza
const CAJA_T = crearCaja("DON TANO|PIZZAS"); scene.add(CAJA_T);
const CAJA_L = crearCaja("LUCÍA|PIZZAS"); scene.add(CAJA_L);
{ const tk = plano(0.09, 0.15, ticketT, 0, 0, 0); tk.rotation.x = -PI / 2; tk.position.set(0.12, 0.009, 0.1); CAJA_L.userData.bis.children[0].add(tk); }
const PIZZA_T = crearMuzza(true); CAJA_T.add(PIZZA_T); PIZZA_T.position.y = 0.006;
const PIZZA_L = crearMuzza(true); CAJA_L.add(PIZZA_L); PIZZA_L.position.y = 0.006;
const VAPOR_T = crearVapor(9); CAJA_T.add(VAPOR_T); VAPOR_T.position.set(0.02, 0.04, 0.02); VAPOR_T.scale.setScalar(0.85);
const VAPOR_L = crearVapor(9); CAJA_L.add(VAPOR_L); VAPOR_L.position.set(0.02, 0.04, 0.02); VAPOR_L.scale.setScalar(0.85);
// las porciones en la mano (Facu, Tano, Martín) y los hilos de queso
const POR_F = crearPorcionMano(), POR_T = crearPorcionMano(), POR_M = crearPorcionMano();
scene.add(POR_F, POR_T, POR_M);
const HILO_F = crearHilo(), HILO_M2 = crearHilo(); scene.add(HILO_F, HILO_M2);
// las motos: la de Facu (navy3, en la vereda de Don Tano) y la de Sabri (verde apagado, en la vereda de Lucía)
const MOTO_F = crearMoto(MARCA.navy3, MARCA.cr); MOTO_F.position.set(1.0, 0.14, 1.55); MOTO_F.rotation.y = PI / 2 + 0.15; scene.add(MOTO_F);
const MOTO_S = crearMoto(0x365f28, MARCA.navy2); scene.add(MOTO_S);


// ===== 40-interfaz.js: las pantallas (chat de Don Tano, el celular de Martín con el menú de Lucía, el tablero, el mapa de
// Sabri, la notificación, el panel), los insertos pegados a la cámara y las tarjetas (globos, chips, rótulos) =====
const fila = (x, W, y, a, b, { ok = false, color = "#0b1220", h = 104, fondo = "#ffffff" } = {}) => {
  x.fillStyle = fondo; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 60, h, 22); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, a, 700, 46, W * 0.55); x.fillText(a, 60, y + h / 2 + 2);
  x.fillStyle = color; x.textAlign = "right"; ajustar(x, b, 900, 50, W * 0.38); x.fillText(b, W - (ok ? 124 : 60), y + h / 2 + 2);
  if (ok) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 80, y + h / 2, 28, 0, 7); x.fill(); tilde(x, W - 79, y + h / 2 + 1, 28, "#0b1220"); }
};
const cabecera = (x, W, titulo, sub = null, inicial = null, colorIni = "#5ce611") => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, W, 10);
  let tx = 40; if (inicial) { x.fillStyle = colorIni; x.beginPath(); x.arc(92, 85, 54, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 56); x.fillText(inicial, 92, 88); tx = 168; }
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, titulo, 800, 54, W - tx - 30); x.fillText(titulo, tx, sub ? 64 : 88);
  if (sub) { x.font = F(700, 38); x.fillStyle = "#cfeebc"; x.fillText(sub, tx + 2, 124); }
};
const onda = (x, X, Y, w, h, k, color, fondo = "#b4b2a3") => { const n = 22; for (let i = 0; i < n; i++) { const a = 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)); x.fillStyle = i / n < k ? color : fondo; x.fillRect(X + (i * w) / n, Y - (a * h) / 2, (w / n) * 0.6, a * h); } };
// ---- el celular del mostrador de Tano: los mensajes que se apilan (n), el contador (cont), el micrófono (mic: 0/1) y el
// de Martín arriba (mi: 0/1) ----
const MSGS = [["C", "Caro", "¿Hacen envíos?"], ["J", "Juan P.", "¿Cuánto demora?"], ["V", "Vale", "Hola??"], ["S", "Seba", "¿Están abiertos?"], ["R", "Rocío", "¿Me pasás el menú?"]];
const COLS_AV = ["#b9bec4", "#cfeebc", "#d9d7c9", "#b9cde0", "#e9c9a8", "#c7655b"];
function dibujarChatTano(x, W, H, { n = 0, cont = 9, mic = 0, mi = 0, seg = "0:01" } = {}) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 58); x.fillText("Mensajes", 40, 88);
  // el contador rojo apagado
  x.font = F(900, 58); const cw = Math.max(110, x.measureText(String(cont)).width + 60); x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(W - 40 - cw, 44, cw, 88, 44); x.fill(); x.fillStyle = "#ffffff"; x.textAlign = "center"; x.fillText(String(cont), W - 40 - cw / 2, 90);
  // las filas: la más nueva arriba
  const filas = [];
  if (mi) filas.push(["M", "Martín", "¿Y mi pizza?", true]);
  for (let i = n - 1; i >= 0; i--) filas.push([...MSGS[i], false]);
  filas.slice(0, 6).forEach(([ini, nom, txt, rojo], k) => {
    const y = 206 + k * 152, h = 136;
    x.fillStyle = rojo ? "#f6e1dd" : "#ffffff"; x.strokeStyle = rojo ? "#c7655b" : "#b4b2a3"; x.lineWidth = 5; x.beginPath(); x.roundRect(20, y, W - 40, h, 26); x.fill(); x.stroke();
    x.fillStyle = COLS_AV[(ini.charCodeAt(0) + k) % COLS_AV.length]; if (rojo) x.fillStyle = "#c7655b"; x.beginPath(); x.arc(86, y + h / 2, 46, 0, 7); x.fill();
    x.fillStyle = rojo ? "#ffffff" : "#0b1220"; x.textAlign = "center"; x.font = F(900, 46); x.fillText(ini, 86, y + h / 2 + 3);
    x.textAlign = "left"; x.fillStyle = "#16243d"; x.font = F(700, 38); x.fillText(nom, 152, y + 40);
    x.fillStyle = rojo ? "#c7655b" : "#0b1220"; ajustar(x, txt, 800, 50, W - 260); x.fillText(txt, 152, y + 94);
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(W - 64, y + h / 2, 18, 0, 7); x.fill();
  });
  // abajo: el audio que graba (el micrófono apretado)
  const yb = H - 170;
  x.fillStyle = "#16243d"; x.fillRect(0, yb, W, 170);
  if (mic) {
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(64, yb + 85, 16, 0, 7); x.fill();
    x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 50); x.fillText(seg, 96, yb + 88);
    onda(x, 230, yb + 85, W - 440, 70, 1, "#efeee5");
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 96, yb + 85, 66, 0, 7); x.fill();
  } else { x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, yb + 40, W - 220, 90, 45); x.fill(); x.fillStyle = "#8f969f"; x.textAlign = "left"; x.font = F(700, 42); x.fillText("Mensaje", 70, yb + 88); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 96, yb + 85, 58, 0, 7); x.fill(); }
  // el micrófono (cápsula navy)
  x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(W - 112, yb + 52, 32, 50, 16); x.fill(); x.fillRect(W - 98, yb + 104, 4, 16); x.fillRect(W - 112, yb + 118, 32, 5);
}
// ---- el celular de Martín (Q2): e = { pant: "chat" | "menu" | "dir" | "pago", audio (0..1), cant: [muzza, fainá],
// tipeo (0..1), sug (0/1), pin (0..1), pago (0 | 1 toca | 2 pagado) } ----
const PLATOS = [["Muzza", "$ 520", "muzza"], ["Fugazzeta", "$ 580", "fuga"], ["Jamón y morrón", "$ 610", "jym"], ["Fainá", "$ 110", "faina"]];
function fotoPlato(x, cx, cy, r, tipo) {
  if (tipo === "faina") { x.fillStyle = "#e3a43a"; x.beginPath(); x.roundRect(cx - r, cy - r * 0.75, r * 2, r * 1.5, 10); x.fill(); x.fillStyle = "#b5701f"; for (const [a, b] of [[-0.4, -0.2], [0.3, 0.3], [0.1, -0.4], [-0.3, 0.35]]) { x.beginPath(); x.arc(cx + a * r, cy + b * r, r * 0.16, 0, 7); x.fill(); } return; }
  x.fillStyle = "#c7843a"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.fillStyle = "#ffd75e"; x.beginPath(); x.arc(cx, cy, r * 0.84, 0, 7); x.fill();
  const pts = [[0.4, 0.1], [-0.35, 0.3], [0.05, -0.45], [-0.2, -0.15], [0.3, -0.35], [-0.45, -0.2]];
  if (tipo === "muzza") { x.fillStyle = "#5c7a26"; for (const [a, b] of pts) { x.beginPath(); x.ellipse(cx + a * r, cy + b * r, r * 0.11, r * 0.08, 0.3, 0, 7); x.fill(); } }
  if (tipo === "fuga") { x.strokeStyle = "#f4f0e0"; x.lineWidth = r * 0.07; for (const [a, b] of pts) { x.beginPath(); x.arc(cx + a * r, cy + b * r, r * 0.13, 0.3, 2.8); x.stroke(); } }
  if (tipo === "jym") { for (const [a, b] of pts) { x.fillStyle = "#e9a3a0"; x.fillRect(cx + a * r - r * 0.12, cy + b * r - r * 0.06, r * 0.24, r * 0.12); } x.fillStyle = "#c9512f"; for (const [a, b] of pts.slice(0, 3)) x.fillRect(cx + b * r, cy + a * r, r * 0.08, r * 0.25); }
}
function dibujarMapa(x, X, Y, w, h, { pin = 1, ruta = 0, etiqueta = null } = {}) {
  x.save(); x.beginPath(); x.roundRect(X, Y, w, h, 24); x.clip();
  x.fillStyle = "#b9cde0"; x.fillRect(X, Y, w, h);   // las calles (navy claro)
  x.fillStyle = "#efeee5"; const bw = w / 4.2, bh = h / 3.4;
  for (let i = -1; i < 5; i++) for (let j = -1; j < 4; j++) x.fillRect(X + i * bw + (j % 2 ? bw * 0.35 : 0) + 14, Y + j * bh + 14, bw - 28, bh - 28);
  x.fillStyle = "#cfeebc"; x.fillRect(X + bw * 2 + 14, Y + bh * 2 + 14, bw - 28, bh - 28);   // una plaza
  const px = X + w * 0.62, py = Y + h * 0.42;
  if (ruta > 0) { x.strokeStyle = "#16243d"; x.lineWidth = 14; x.lineCap = "round"; x.lineJoin = "round"; x.setLineDash([]); x.beginPath(); const R = [[X + w * 0.1, Y + h * 0.92], [X + w * 0.1, Y + h * 0.66], [X + w * 0.45, Y + h * 0.66], [X + w * 0.45, py + 40], [px, py + 40]]; x.moveTo(...R[0]); for (let i = 1; i < R.length; i++) x.lineTo(...R[i]); x.stroke(); x.fillStyle = "#16243d"; x.beginPath(); x.arc(X + w * 0.1, Y + h * 0.92, 20, 0, 7); x.fill(); }
  x.restore();
  if (pin > 0) {
    const yy = py - (1 - eo(cl(pin))) * 160, s = 1;
    x.fillStyle = "rgba(11,18,32,0.25)"; x.beginPath(); x.ellipse(px, py + 44, 26 * cl(pin), 9 * cl(pin), 0, 0, 7); x.fill();
    x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.arc(px, yy - 34 * s, 34 * s, Math.PI * 0.82, Math.PI * 2.18); x.lineTo(px, yy + 40 * s); x.closePath(); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.beginPath(); x.arc(px, yy - 34 * s, 12 * s, 0, 7); x.fill();
  }
  if (etiqueta) { x.font = F(800, 40); const tw = x.measureText(etiqueta).width + 44; x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(X + w / 2 - tw / 2, Y + h - 80, tw, 64, 32); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(etiqueta, X + w / 2, Y + h - 47); }
}
function dibujarMartin(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  if (e.pant === "chat") {
    cabecera(x, W, "Pizzería Don Tano", "en línea", "T", "#b9bec4");
    const burb = (y, txt, hora, mio = true, h = 0) => { x.font = F(800, 48); const ls = renglones(x, txt, W - 220); const bh = h || 60 + ls.length * 62; const bx = mio ? 110 : 30, bw = W - 140; x.fillStyle = mio ? "#cfeebc" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(bx, y, bw, bh, 28); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "left"; ls.forEach((l, i) => x.fillText(l, bx + 30, y + 52 + i * 62)); x.fillStyle = "#16243d"; x.font = F(700, 32); x.textAlign = "right"; x.fillText(hora, bx + bw - 24, y + bh - 28); return y + bh + 26; };
    let y = 220;
    y = burb(y, "Una muzza y dos fainá a Duvimioso Terra 1432", "21:02");
    y = burb(y, "¿Y mi pizza?", "22:05");
    // el audio que llega de Don Tano
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 140, 150, 28); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.beginPath(); x.arc(110, y + 75, 46, 0, 7); x.fill(); x.fillStyle = "#efeee5";
    if (e.audio > 0 && e.audio < 1) { x.fillRect(94, y + 52, 12, 46); x.fillRect(114, y + 52, 12, 46); } else { x.beginPath(); x.moveTo(96, y + 50); x.lineTo(132, y + 75); x.lineTo(96, y + 100); x.closePath(); x.fill(); }
    onda(x, 180, y + 70, W - 420, 64, e.audio, "#16243d"); x.fillStyle = "#16243d"; x.font = F(800, 40); x.textAlign = "left"; x.fillText("0:01", 180, y + 128); x.textAlign = "right"; x.font = F(700, 32); x.fillText("22:15", W - 134, y + 128);
    return;
  }
  cabecera(x, W, "Lucía Pizzas · Pedí acá", "Abierto · Envío 30-40 min", "L");
  if (e.pant === "menu") {
    PLATOS.forEach(([n, p, tipo], i) => {
      const y = 205 + i * 196, h = 178, c = tipo === "muzza" ? e.cant[0] : tipo === "faina" ? e.cant[1] : 0;
      x.fillStyle = c ? "#ecf8e2" : "#ffffff"; x.strokeStyle = c ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, y, W - 48, h, 28); x.fill(); x.stroke();
      fotoPlato(x, 112, y + h / 2, 64, tipo);
      x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, n, 800, 52, W - 420); x.fillText(n, 200, y + 62); x.fillStyle = "#16243d"; x.font = F(900, 50); x.fillText(p, 200, y + 128);
      // el botón +, y la cantidad
      x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.arc(W - 96, y + h / 2, 52, 0, 7); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.fillRect(W - 120, y + h / 2 - 7, 48, 14); x.fillRect(W - 103, y + h / 2 - 24, 14, 48);
      if (c) { x.fillStyle = "#0b1220"; x.beginPath(); x.arc(W - 200, y + h / 2, 40, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 50); x.fillText(String(c), W - 200, y + h / 2 + 3); }
    });
    const n = e.cant[0] + e.cant[1];
    if (n) { const tot = e.cant[0] * 520 + e.cant[1] * 110; const y = H - 170; x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, y, W - 48, 146, 36); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "left"; const tx = `${e.cant[0]} Muzza · ${e.cant[1]} Fainá`; ajustar(x, tx, 800, 50, W - 330); x.fillText(tx, 60, y + 74); x.fillStyle = "#5ce611"; x.textAlign = "right"; x.font = F(900, 58); x.fillText(plata(tot), W - 60, y + 76); }
    return;
  }
  if (e.pant === "dir") {
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 50); x.fillText("Dirección", 40, 246);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 290, W - 60, 116, 26); x.fill(); x.stroke();
    const txt = "Duvi".slice(0, Math.round(4 * cl(e.tipeo))); x.fillStyle = "#0b1220"; x.font = F(800, 56); x.fillText(txt, 66, 350); if (!e.sug) { const w = x.measureText(txt).width; x.fillRect(70 + w, 318, 5, 62); }
    if (e.sug) { x.fillStyle = "#ecf8e2"; x.strokeStyle = "#3fa60a"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 428, W - 60, 116, 26); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; ajustar(x, "Duvimioso Terra 1432", 900, 54, W - 210); x.fillText("Duvimioso Terra 1432", 66, 488); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 92, 486, 34, 0, 7); x.fill(); tilde(x, W - 91, 487, 34, "#0b1220"); }
    dibujarMapa(x, 30, 570, W - 60, H - 600, { pin: e.pin });
    return;
  }
  // pago
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 210, W - 60, 300, 30); x.fill(); x.stroke();
  x.textAlign = "left"; x.fillStyle = "#0b1220"; x.font = F(800, 50); x.fillText("1 Muzza", 66, 270); x.fillText("2 Fainá", 66, 340); x.textAlign = "right"; x.fillText("$ 520", W - 66, 270); x.fillText("$ 220", W - 66, 340);
  x.textAlign = "left"; x.fillStyle = "#16243d"; x.font = F(700, 42); ajustar(x, "Envío · Duvimioso Terra 1432", 700, 42, W - 130); x.fillText("Envío · Duvimioso Terra 1432", 66, 430);
  x.fillStyle = "#0b1220"; x.font = F(800, 56); x.textAlign = "left"; x.fillText("Total", 40, 600); x.textAlign = "right"; x.font = F(900, 74); x.fillText("$ 740", W - 40, 600);
  if (e.pago < 2) { x.fillStyle = e.pago === 1 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(30, 680, W - 60, 170, 85); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 84); x.fillText("Pagar", W / 2, 768); if (e.pago === 1) { x.fillStyle = "rgba(11,18,32,0.25)"; x.beginPath(); x.arc(W / 2 + 170, 765, 50, 0, 7); x.fill(); } }
  else { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 660, W - 60, 330, 40); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(122, 760, 60, 0, 7); x.fill(); tilde(x, 124, 762, 62, "#0b1220"); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(900, 76); x.fillText("Pagado", 210, 740); x.fillStyle = "#5ce611"; ajustar(x, "Pedido #47", 800, 54, W - 260); x.fillText("Pedido #47", 210, 812); x.fillStyle = "#efeee5"; ajustar(x, "Llega 22:55", 800, 60, W - 120); x.fillText("Llega 22:55", 66, 920); }
}
// ---- la notificación en el celular de Martín (Q4) ----
function dibujarNoti(x, W, H) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 150); x.fillText("22:54", W / 2, 230); x.font = F(700, 44); x.fillText("viernes", W / 2, 340);
  const y = 430; x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(26, y, W - 52, 330, 40); x.fill();
  x.fillStyle = "#b9bec4"; x.beginPath(); x.arc(100, y + 84, 46, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 50); x.fillText("T", 100, y + 88);
  x.textAlign = "left"; x.fillStyle = "#16243d"; ajustar(x, "Pizzería Don Tano", 800, 46, W - 240); x.fillText("Pizzería Don Tano", 166, y + 70); x.font = F(700, 34); x.fillText("ahora", 166, y + 118);
  x.fillStyle = "#c7655b"; x.font = F(900, 60); x.fillText("Disculpá,", 56, y + 206); x.fillText("¿calle qué?", 56, y + 280);
  // la caja de pizza abierta, abajo (la foto de fondo de pantalla: la muzza)
  fotoPlato(x, W / 2, H - 230, 150, "muzza");
}
// ---- el tablero de pedidos de Lucía (Q3): f = 0 (En horno), 1 (Listo), 2 (En camino) para el #47 ----
function dibujarTablero(x, W, H, f) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, W, 8);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Pedidos · viernes", 800, 60, W - 60); x.fillText("Pedidos · viernes", 34, 62);
  const cols = ["En horno", "Listo", "En camino"], cw = (W - 40) / 3;
  const fijos = [[0, "#46"], [1, "#45"], [2, "#44"]];
  cols.forEach((c, i) => { const X = 20 + i * cw; x.fillStyle = i === 2 ? "#cfeebc" : "#d9d7c9"; x.beginPath(); x.roundRect(X + 8, 146, cw - 16, H - 166, 22); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, c, 900, 50, cw - 40); x.fillText(c, X + cw / 2, 196); });
  const tarjeta = (i, k, num, nom, dir, ok, glow) => { const X = 20 + i * cw + 20, Y = 236 + k * 250, w = cw - 40, h = 230; x.fillStyle = glow ? "#16243d" : "#ffffff"; x.strokeStyle = glow ? "#5ce611" : "#16243d"; x.lineWidth = glow ? 9 : 5; x.beginPath(); x.roundRect(X, Y, w, h, 20); x.fill(); x.stroke(); x.textAlign = "left"; x.fillStyle = glow ? "#5ce611" : "#0b1220"; x.font = F(900, 62); x.fillText(num, X + 22, Y + 52); x.fillStyle = glow ? "#efeee5" : "#16243d"; ajustar(x, nom, 800, 40, w - 40); x.fillText(nom, X + 22, Y + 112); if (dir) { ajustar(x, dir, 700, 30, w - 40); x.fillText(dir, X + 22, Y + 156); } if (ok) { x.fillStyle = "#5ce611"; ajustar(x, "Pagado ✓", 900, 36, w - 40); x.fillText("Pagado ✓", X + 22, Y + 200); } };
  fijos.forEach(([i, n]) => tarjeta(i, 1, n, ["Pablo", "Inés", "Rodri"][i], null, true, false));
  tarjeta(f, 0, "#47", "Martín", "Duvimioso Terra 1432", true, true);
}
// ---- el panel del viernes (Q5): e = { filas 0..3, gira 0..1, f47 0/1 } ----
function dibujarPanel(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 116); x.fillStyle = "#5ce611"; x.fillRect(0, 116, W, 8);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Viernes · Lucía Pizzas", 800, 58, W - 60); x.fillText("Viernes · Lucía Pizzas", 30, 60);
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, 140, W * 0.38, 190, 26); x.fill(); x.fillStyle = "#5ce611"; x.textAlign = "center"; x.font = F(900, 110); x.fillText("64", 24 + W * 0.19, 222); x.fillStyle = "#efeee5"; x.font = F(800, 40); x.fillText("pedidos", 24 + W * 0.19, 298);
  const filas = [["Pagados online", "64"], ["Dirección con mapa", "64"]];
  filas.forEach(([a, b], i) => { const X = W * 0.38 + 44, Y = 140 + i * 100, w = W - X - 24; const ok = i < e.filas; x.fillStyle = ok ? "#ecf8e2" : "#ffffff"; x.strokeStyle = ok ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w, 88, 20); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, a, 800, 40, w - 200); x.fillText(a, X + 22, Y + 46); if (ok) { x.textAlign = "right"; x.font = F(900, 50); x.fillText(b, X + w - 80, Y + 46); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(X + w - 40, Y + 44, 24, 0, 7); x.fill(); tilde(x, X + w - 39, Y + 45, 24, "#0b1220"); } });
  // los dos que giran a 0: el 3 y el 26 (rojo apagado, "Don Tano, enfrente") → 0 verde
  [["Pizzas que volvieron", "3"], ["Sin contestar", "26"]].forEach(([a, v0], i) => {
    const Y = 356 + i * 132, X = 24, w = W - 48;
    x.fillStyle = "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w, 116, 22); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.textAlign = "left"; ajustar(x, a, 800, 48, w * 0.6); x.fillText(a, X + 26, Y + 58);
    if (e.filas > 2 && e.gira < 0.5) { x.fillStyle = "#c7655b"; x.font = F(700, 28); x.textAlign = "right"; x.fillText("Don Tano, enfrente", X + w - 190, Y + 62); }
    const g = e.filas > 2 ? e.gira : 0, sx = Math.abs(Math.cos(g * Math.PI)), val = g < 0.5 ? v0 : "0", col = g < 0.5 ? "#c7655b" : "#3fa60a";
    if (e.filas > 2) { x.save(); x.translate(X + w - 90, Y + 60); x.scale(Math.max(0.05, sx), 1); x.fillStyle = col; x.textAlign = "center"; x.font = F(900, 86); x.fillText(val, 0, 2); x.restore(); }
  });
  if (e.f47) { const Y = 640; x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, Y, W - 48, 100, 24); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "left"; const t = "#47 · Martín · cliente nuevo ✓ · entregado 22:54"; ajustar(x, t, 800, 40, W - 100); x.fillText(t, 50, Y + 52); }
}
// ---- los insertos pegados a la cámara (de vete-racion): fondo plano + celular grande ----
function crearFondoInserto(g, [c1, c2, c3]) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: c1 })); bg.position.z = -0.06; g.add(bg);
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1300 / PXK), new THREE.MeshBasicMaterial({ color: c2 })); pc.position.set(0, -560 / PXK, -0.058); g.add(pc);
  const pi = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 420 / PXK), new THREE.MeshBasicMaterial({ color: c3 })); pi.position.set(0, -1000 / PXK, -0.057); g.add(pi);
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, (opc.radio ?? 80) / PXK, 3), new THREE.MeshBasicMaterial({ color: opc.funda ?? 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  return { g, tex, IW, IH };
}
const FONDO_TANO = [0x365f28, 0xe9e6da, 0x0b1220], FONDO_LIV = [0xe9e5d6, 0x365f28, 0xb98d5e], FONDO_LUC = [0x16243d, 0xe9e6da, 0x0b1220];
function inserto(fondo, IW, IH, cy, marco, opc = {}) { const I = { g: new THREE.Group() }; crearFondoInserto(I.g, opc.sinPiso ? [fondo[0], fondo[1], fondo[1]] : fondo); const c = crearCelInserto(IW, IH, 540, cy, marco, opc); if (opc.esc) { c.g.scale.setScalar(opc.esc); c.g.position.set(0, -((960 - cy) / PXK) * (opc.esc - 1), 0); } if (opc.rot) c.g.rotation.z = opc.rot; I.g.add(c.g);
  I.tex = c.tex; I.IW = IW; I.IH = IH; pegarACamara(I.g, camera, 10); I.g.visible = false; return I; }
const INS_COM = inserto(FONDO_TANO, 760, 1040, 1010, 14, { funda: 0xd9d7c9, radio: 20, rot: 0.04 });   // la comanda (P1, P3)
const INS_CHAT = inserto(FONDO_TANO, 860, 1420, 1130, 34, { camara: true, funda: 0x365f28, esc: 0.86 });           // el celular del mostrador (P2, P4)
const INS_MART = inserto(FONDO_LIV, 860, 1420, 1110, 34, { camara: true, funda: 0x0b1220, esc: 0.88 });            // el celular de Martín (Q2)
const INS_NOTI = inserto(FONDO_LIV, 820, 1360, 1010, 34, { camara: true, funda: 0x0b1220 });            // la notificación (Q4)
const INSERTOS = [INS_COM, INS_CHAT, INS_MART, INS_NOTI];
dibujarNoti(INS_NOTI.tex.userData.x, INS_NOTI.IW, INS_NOTI.IH); INS_NOTI.tex.needsUpdate = true;
// la birome dibujada en el inserto de la comanda (la punta en (px, py))
function biromeDib(x, px, py) { x.save(); x.translate(px, py); x.rotate(-0.55); x.fillStyle = "#efeee5"; x.fillRect(-13, -230, 26, 220); x.fillStyle = "#0b1220"; x.fillRect(-14, -240, 28, 46); x.fillStyle = "#3a3f4a"; x.beginPath(); x.moveTo(-13, -10); x.lineTo(13, -10); x.lineTo(0, 16); x.closePath(); x.fill(); x.restore(); }
let cCom = "", cChat = "", cMart = "", cTab = "";
function dibujarInterfaz(t, pa) {
  // la comanda (3D y el inserto)
  const k1 = sg(t, T.esc1[0], T.esc1[1]), k2 = sg(t, T.esc2[0], T.esc2[1]), circ = sg(t, T.circ[0], T.circ[1]);
  ponerComanda(k1, k2, circ);
  if (pa === "P1i" || pa === "P3i") {
    const key = `${Math.round(k2 * 40)}|${Math.round(circ * 20)}`;
    if (key !== cCom) { cCom = key; const x = INS_COM.tex.userData.x, W = INS_COM.IW, H = INS_COM.IH; x.setTransform(1, 0, 0, 1, 0, 0); const wD = dibujarComanda(x, W, H, 1, k2, circ);
      if (pa === "P1i" && k2 > 0 && k2 < 1) { const u = cl(k2 * 1.6), v = cl(k2 * 1.6 - 0.6), sx = W / 600, sy = H / 820; const px = u < 1 ? (36 + 330 * u) * sx : (36 + 360 * cl(v)) * sx, py = (u < 1 ? 430 : 545) * sy; biromeDib(x, px, py); }
      INS_COM.tex.needsUpdate = true; }
  }
  // el chat de Tano
  const n = T.msgs.filter((m) => t >= m).length, cont = t >= T.cont[2] ? 26 : t >= T.cont[1] ? 17 : 9, mic = (t >= T.mic && t < T.p3) || t >= T.mic2 ? 1 : 0, mi = t >= T.mPizza ? 1 : 0;
  const kC = `${n}|${cont}|${mic}|${mi}`;
  if (kC !== cChat) { cChat = kC; dibujarChatTano(INS_CHAT.tex.userData.x, INS_CHAT.IW, INS_CHAT.IH, { n: t >= T.p3 ? 5 : n, cont: mi ? 27 : cont, mic, mi }); INS_CHAT.tex.needsUpdate = true;
    const xx = pantTano.userData.x; xx.save(); xx.scale(400 / 860, 820 / 1420); dibujarChatTano(xx, 860, 1420, { n: t >= T.p3 ? 5 : n, cont: mi ? 27 : cont, mic, mi }); xx.restore(); pantTano.needsUpdate = true; }
  // el celular de Martín
  const pant = t < T.menu ? "chat" : t < T.dir ? "menu" : t < T.pago ? "dir" : "pago";
  const eM = { pant, audio: Math.round(sg(t, T.audio, T.audio + LEN.t5) * 12) / 12, cant: [t >= T.mas[0] ? 1 : 0, (t >= T.mas[1] ? 1 : 0) + (t >= T.mas[2] ? 1 : 0)], tipeo: Math.round(sg(t, T.tipea[0], T.tipea[1]) * 4) / 4, sug: t >= T.sug ? 1 : 0, pin: Math.round(sg(t, T.pin, T.pin + 0.25) * 8) / 8, pago: t >= T.pagado ? 2 : t >= T.pagar ? 1 : 0 };
  const kM = JSON.stringify(eM);
  if (kM !== cMart) { cMart = kM; dibujarMartin(INS_MART.tex.userData.x, INS_MART.IW, INS_MART.IH, eM); INS_MART.tex.needsUpdate = true;
    const xx = pantMart.userData.x; xx.save(); xx.scale(400 / 860, 820 / 1420); if (t >= T.q4) dibujarNoti(xx, 860, 1420); else dibujarMartin(xx, 860, 1420, eM); xx.restore(); pantMart.needsUpdate = true; }
  // la tablet de Lucía: el tablero (Q1-Q3) o el panel (Q5 en adelante)
  const kT = t >= T.q5 ? `P|${T.filas.filter((f) => t >= f).length}|${Math.round(sg(t, T.gira, T.gira + 0.3) * 10)}|${t >= T.fila47 ? 1 : 0}` : `T|${T.cols.filter((c) => t >= c).length}`;
  if (kT !== cTab) { cTab = kT; const x = pantTab.userData.x;
    if (t >= T.q5) dibujarPanel(x, 1000, 760, { filas: T.filas.filter((f) => t >= f).length, gira: Math.round(sg(t, T.gira, T.gira + 0.3) * 10) / 10, f47: t >= T.fila47 ? 1 : 0 });
    else dibujarTablero(x, 1000, 760, Math.max(0, T.cols.filter((c) => t >= c).length - 1)); pantTab.needsUpdate = true; }
}
// el mapa de Sabri (pantalla de su celular)
{ const x = pantSab.userData.x; x.fillStyle = "#efeee5"; x.fillRect(0, 0, 400, 820); x.save(); x.scale(400 / 860, 820 / 1420); cabecera(x, 860, "Pedido #47", "Duvimioso Terra 1432"); dibujarMapa(x, 30, 210, 800, 1180, { pin: 1, ruta: 1, etiqueta: "8 min" }); x.restore(); pantSab.needsUpdate = true; }
// =====================================================================================================
// LAS TARJETAS DE ESTE REEL (globos, chips, rótulos)
// =====================================================================================================
const chip = (txt, px = 62, fondo = "#16243d", tinta = "#efeee5") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo }); };
// el globo que sale del teléfono: mismo globo, con el borde punteado adentro
function crearGloboTel(lineas, px) { const g = crearGlobo(lineas, px); const { W, H } = g.userData; const viejo = g.userData.dibujo; g.userData.punteado = true; redibujar(g, (x, w, h) => { viejo(x, w, h); x.strokeStyle = "#16243d"; x.lineWidth = 6; x.setLineDash([16, 12]); x.beginPath(); x.roundRect(10, 10, w - 20, h - 20, 26); x.stroke(); x.setLineDash([]); }); return g; }
// la mapa de Sabri como tarjeta chica pegada a la cámara
const MAPA_S = crearTarjeta(520, 720, (x, W, H) => { x.save(); x.scale(W / 860, H / 1190); cabecera(x, 860, "Pedido #47", "Duvimioso Terra 1432"); dibujarMapa(x, 30, 210, 800, 960, { pin: 1, ruta: 1, etiqueta: "8 min" }); x.restore(); });
const GL = {
  vie: chip("Viernes, 21:00.", 60), vie2: chip("Viernes, 22:10.", 60), vieL: chip("Viernes, 21:00.", 60), vieQ2: chip("Viernes, 22:15.", 60), vieQ4: chip("Viernes, 22:54.", 60),
  donT: chip("DON TANO", 46, "#efeee5", "#16243d"), luc: chip("LUCÍA", 46, "#5ce611", "#0b1220"),
  t1: crearGlobo(["Una muzza y dos fainá…", "¿Calle [qué?]"], 60),
  m1: crearGloboTel(["¡Duvimioso Terra!"], 64),
  t2: crearGlobo(["Ajá.", "¿Con [be] larga?"], 66),
  conV: crearGloboTel(["¡Con [V] corta!"], 62),
  t3: crearGlobo(["¡Ya [sale!]"], 84),
  rP2a: crearRotulo([["Mensajes sin", "#ff9d92"], ["contestar: 26", "#ff9d92", 62]], 54),
  rP2b: crearRotulo([["Cada uno, un pedido", "#ff9d92"], ["que se fue a otro lado", "#ff9d92"]], 46),
  f1: crearGlobo(["Tano.", "[Dubimioso] no existe."], 62),
  rP3a: crearRotulo([["Pizzas que", "#ff9d92"], ["volvieron hoy: 3", "#ff9d92", 60]], 52),
  rP3b: crearRotulo([["$ 2.220", "#ff9d92", 84]], 84),
  t4: crearGlobo(["[Cenamos.]"], 86),
  t5: crearGlobo(["¡Ya [sale!]"], 84),
  rQ1: crearRotulo([["Los pedidos entran"], ["solos, en orden"]], 52),
  rQ2: crearRotulo([["La dirección la pone él,"], ["con el mapa"]], 48),
  m2: crearGlobo(["¿Ya [está?]"], 86),
  rQ3: crearRotulo([["Pedido pago,"], ["dirección exacta"]], 54),
  s1: crearGlobo(["¿Martín?", "Una muzza y dos [fainá.]"], 62),
  rQ5: crearRotulo([["Panel del viernes"]], 54),
  t6: crearGlobo(["¿Y esa cómo [hace?]"], 70),
};
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];


// ===== 50-escena.js: lugares, cámara (PLANOS con Catmull-Rom), poses, objetos en el tiempo, tarjetas y render =====
// lugares en coordenadas LOCALES del módulo de pizzería (enT = Don Tano, enL = Lucía, el mismo módulo girado 180°)
const MZ = LOC.MZ;
const DUENO = { x: -0.1, z: MZ - 0.62 };                  // Tano / Lucía detrás del mostrador
const COMANDA = V3(-0.34, LOC.MA + 0.001, MZ - 0.12);       // el talonario
const CEL_M = V3(0.52, LOC.MA, MZ - 0.06);                  // el celular del mostrador (contra el servilletero)
const GANCHO_P = V3(0.98, LOC.MA, MZ - 0.14);
const CAJA_MO = V3(0.18, LOC.MA + 0.002, MZ + 0.1);        // donde Facu apoya la caja
const FACU_M = { x: 1.15, z: MZ + 0.6 };                   // Facu frente al mostrador
const IMP_P = V3(-0.86, LOC.MA, MZ - 0.06);                 // la impresora de Lucía (donde Tano tiene la comanda... en espejo)
const RIEL_P = V3(0.95, 1.45, MZ - 0.3);                    // el riel de tickets (donde Tano tiene el gancho)
const TAB_P = V3(0.78, LOC.MA, MZ + 0.04);                  // la tablet de Lucía
const SABRI_L = { x: 1.15, z: MZ + 1.15 };                  // Sabri en el local de Lucía (Q3)
const MESA_M = V3(PX2 - 0.95, 0.9, PZ2 + 0.75);         // la consola al lado de la puerta de Martín (Q4)
const LIV_M = { x: LX + 0.05, z: -0.7 };                // Martín en el sillón
// la consola del hall de Martín (donde abre la caja: el mismo encuadre que el mostrador de P4)
{ const g = new THREE.Group(); g.position.set(MESA_M.x, 0, MESA_M.z); g.add(caja(0.9, 0.04, 0.45, M.cr, 0, 0.88, 0, 0.01)); g.add(caja(0.86, 0.8, 0.4, M.navy2, 0, 0.44, 0, 0.012)); scene.add(sombras(g)); }
// ---- poner los objetos fijos de cada local ----
const ponerL = (o, p, ry = 0, loc = "T") => { if (loc === "T") { o.position.copy(p); o.rotation.y = ry; } else { o.position.copy(enL(p.x, p.y, p.z)); o.rotation.y = ry + PI; } };
ponerL(TALON, COMANDA, 0.12); ponerL(GANCHO, GANCHO_P, 0);
ponerL(SERV, V3(CEL_M.x + 0.02, LOC.MA, CEL_M.z - 0.08), 0);
ponerL(IMP, IMP_P, 0.25, "L"); ponerL(RIEL, RIEL_P, 0, "L"); ponerL(tabletL, TAB_P, -0.2, "L");
// las manchas de harina en el mostrador de Tano (planas)
{ const hm = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.8, depthWrite: false }); for (const [x, z, r] of [[-0.75, -2.7, 0.09], [-0.6, -2.55, 0.05], [0.2, -2.82, 0.07], [-0.05, -2.5, 0.04]]) { const m = mesh(new THREE.CircleGeometry(r, 16), hm, x, LOC.MA + 0.002, z); m.rotation.x = -PI / 2; m.scale.y = 0.7; m.castShadow = false; scene.add(m); } }
// el ticket #47 que cuelga del riel después de Q3, y el que va en la mano de Lucía
const TK_MANO = plano(0.08, 0.14, ticketT, 0, 0, 0); TK_MANO.material.side = THREE.DoubleSide; scene.add(TK_MANO);
const TK_RIEL = plano(0.08, 0.14, ticketT, 0, 0, 0); scene.add(TK_RIEL); { const p = enL(RIEL_P.x + 0.27, RIEL_P.y - 0.075, RIEL_P.z + 0.02); TK_RIEL.position.copy(p); TK_RIEL.rotation.y = PI; }

// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves | null (inserto)]; cada clave [t, px, py, pz, mx, my, mz, fov] en el MUNDO
// =====================================================================================================
const wT = (px, py, pz, mx, my, mz, fov) => [px, py, pz, mx, my, mz, fov];
const wL = (px, py, pz, mx, my, mz, fov) => { const a = enL(px, py, pz), b = enL(mx, my, mz); return [a.x, a.y, a.z, b.x, b.y, b.z, fov]; };
const off = (k, d) => k.map((v, i) => v + (d[i] ?? 0));
const K_P1 = globalThis.__KP1 || [0.42, 1.62, -0.85, -0.02, 1.18, -3.4, 46];         // el cuadro 0 (local): desde el lado del cliente
const K_P2B = [1.3, 1.62, -0.6, 0.2, 1.05, -3.1, 50];
const K_P3 = [-1.4, 1.8, -3.0, 1.0, 1.25, -2.0, 56];                                  // sobre el hombro de Tano, hacia la puerta
const K_P3B = [-0.3, 1.45, -1.55, -0.08, 1.3, -3.4, 44];                               // contraplano: Tano de frente
const K_P4 = [0.35, 1.95, -1.1, 0.1, 1.05, -3.1, 54];                                  // los dos sobre la caja
const K_P4B = [0.4, 1.52, -2.2, 0.16, 0.9, -2.77, 46.0];                                 // la caja de cerca (desde arriba)
const K_P4C = [0.1, 1.72, -0.8, 0.22, 1.25, -3.0, 62];
const K_Q3 = [-0.48, 1.2, -2.27, -0.86, 1.0, -2.81, 40.0];                                // la impresora de cerca (local de Lucía)
const K_Q3B = [0.45, 1.52, -1.3, 0.1, 1.25, -3.25, 50.0];
const K_Q3T = [0.8, 1.38, -1.9, 0.78, 1.0, -2.73, 44];                               // la tablet (tablero)
const K_Q3S = [-0.4, 1.55, -0.4, 1.2, 1.15, -1.75, 60];
const K_Q5 = [0.79, 1.36, -1.95, 0.78, 1.0, -2.73, 44];                                  // la tablet (panel)
const K_C = [0.05, 1.5, -0.85, -0.08, 1.22, -3.4, 42];                                 // Lucía a cámara
const PLANOS = [
  ["P1", 0, [[0, ...wT(...K_P1)], [T.p1i, ...wT(...off(K_P1, [-0.12, -0.03, -0.3]))]]],
  ["P1i", T.p1i, null],
  ["P1b", T.p1b, [[T.p1b, ...wT(...off(K_P1, [-0.18, -0.04, -0.45]))], [T.p2, ...wT(...off(K_P1, [-0.24, -0.05, -0.58]))]]],
  ["P2", T.p2, null],
  ["P2b", T.p2b, [[T.p2b, ...wT(...off(K_P2B, [0.15, 0.08, 0.2]))], [T.p3, ...wT(...K_P2B)]]],
  ["P3", T.p3, [[T.p3, ...wT(...K_P3)], [T.p3b, ...wT(...off(K_P3, [0.05, 0, 0.12, 0, 0, 0, -3]))]]],
  ["P3b", T.p3b, [[T.p3b, ...wT(...K_P3B)], [T.p3i, ...wT(...off(K_P3B, [0, 0, -0.1, 0, 0, 0, -2]))]]],
  ["P3i", T.p3i, null],
  ["P3c", T.p3c, [[T.p3c, ...wT(...off(K_P3B, [0.1, 0.1, -0.1, 0, -0.12, 0, 6]))], [T.p4, ...wT(...off(K_P3B, [0.1, 0.1, -0.25, 0, -0.12, 0, 4]))]]],
  ["P4", T.p4, [[T.p4, ...wT(...K_P4)], [T.p4b, ...wT(...off(K_P4, [-0.1, -0.03, -0.12]))]]],
  ["P4b", T.p4b, [[T.p4b, ...wT(...K_P4B)], [T.p4i, ...wT(...off(K_P4B, [0, 0.05, 0.08]))]]],
  ["P4i", T.p4i, null],
  ["P4c", T.p4c, [[T.p4c, ...wT(...K_P4C)], [P1, ...wT(...off(K_P4C, [-0.05, 0, -0.12, 0, 0, 0, -2]))]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, 0, 0, 0, 0, 0, 0, 50], [T.q2, 0, 0, 0, 0, 0, 0, 50]]],   // la grúa: camQ1(t)
  ["Q2", T.q2, [[T.q2, LX + 1.05, 1.28, 1.55, LX - 0.05, 0.92, -0.75, 46], [T.q2i, LX + 0.95, 1.26, 1.35, LX - 0.05, 0.94, -0.75, 44]]],
  ["Q2i", T.q2i, null],
  ["Q2b", T.q2b, [[T.q2b, LX + 1.1, 1.75, 2.0, LX + 0.0, 0.82, -0.75, 44], [T.q3, LX + 1.05, 1.75, 1.9, LX + 0.0, 0.83, -0.75, 42]]],
  ["Q3", T.q3, [[T.q3, ...wL(...K_Q3)], [T.q3b, ...wL(...off(K_Q3, [0.02, 0.02, 0.06, 0, 0.03, 0, 0]))]]],
  ["Q3b", T.q3b, [[T.q3b, ...wL(...K_Q3B)], [T.q3t, ...wL(...off(K_Q3B, [0, 0, -0.1]))]]],
  ["Q3t", T.q3t, [[T.q3t, ...wL(...K_Q3T)], [T.q3s, ...wL(...off(K_Q3T, [0, 0, -0.05]))]]],
  ["Q3s", T.q3s, [[T.q3s, ...wL(...K_Q3S)], [T.q4, ...wL(...off(K_Q3S, [0, 0, -0.1]))]]],
  ["Q4", T.q4, [[T.q4, PX2 + 1.25, 1.55, PZ2 + 2.6, PX2 - 0.1, 1.3, PZ2 - 0.6, 50], [T.q4b, PX2 + 1.2, 1.55, PZ2 + 2.45, PX2 - 0.1, 1.3, PZ2 - 0.6, 49]]],
  ["Q4b", T.q4b, [[T.q4b, MESA_M.x + 0.22, 1.52, MESA_M.z + 0.52, MESA_M.x - 0.02, 0.9, MESA_M.z - 0.02, 46], [T.q4i, MESA_M.x + 0.22, 1.57, MESA_M.z + 0.6, MESA_M.x - 0.02, 0.9, MESA_M.z - 0.02, 46]]],
  ["Q4i", T.q4i, null],
  ["Q4c", T.q4c, [[T.q4c, PX2 - 0.15, 1.6, PZ2 + 2.5, PX2 - 0.62, 1.42, PZ2 + 0.6, 40], [T.q5, PX2 - 0.17, 1.6, PZ2 + 2.35, PX2 - 0.62, 1.44, PZ2 + 0.6, 37]]],
  ["Q5", T.q5, [[T.q5, ...wL(...K_Q5)], [T.q5b, ...wL(...off(K_Q5, [0, 0, 0.08]))]]],
  ["Q5b", T.q5b, [[T.q5b, 0.9, 1.5, 9.55, 1.55, 1.25, 0.3, 22], [T.c, 0.9, 1.5, 9.55, 1.6, 1.55, 0.3, 11]]],
  ["C", T.c, [[T.c, ...wL(...K_C)], [DUR, ...wL(...off(K_C, [0, 0, -0.12, 0, 0, 0, -2]))]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); }
// Q1 · la grúa que cruza la calle: mira la fachada de Don Tano, sube hasta ver la calle desde arriba, gira 180° en el aire
// y baja hacia la vidriera de Lucía hasta el encuadre de P1 en espejo (orientaciones con slerp; nada de pantalla vacía)
const _mt = new THREE.Matrix4();
const oriQ = (pos, mira, up) => { _mt.lookAt(pos, mira, up); return new THREE.Quaternion().setFromRotationMatrix(_mt); };
const Q1K = (() => {
  const fin = wL(...off(K_P1, [0.0, 0.05, 0.45])), fin2 = wL(...off(K_P1, [-0.1, -0.02, -0.1]));
  const k = (t, p, m, up, fov) => ({ t, p: V3(...p), q: oriQ(V3(...p), V3(...m), V3(...up)), fov });
  return [
    k(P2, [1.6, 1.9, 6.9], [0.0, 2.0, 0.0], [0, 1, 0], 62),
    k(r2(P2 + 0.55), [1.4, 4.6, 4.3], [1.4, 0, 4.42], [0, 0, -1], 76),
    k(r2(P2 + 0.8), [1.4, 4.5, 4.5], [1.4, 0, 4.5], [1, 0, 0], 76),
    k(r2(P2 + 1.05), [1.3, 4.3, 4.7], [1.3, 0, 4.82], [0, 0, 1], 74),
    k(T.q1m, [0.9, 2.1, 6.9], [0.7, 1.5, 9.8], [0, 1, 0], 54),
    k(T.q1in, fin.slice(0, 3), fin.slice(3, 6), [0, 1, 0], fin[6]),
    k(T.q2, fin2.slice(0, 3), fin2.slice(3, 6), [0, 1, 0], fin2[6]),
  ];
})();
const _qq = new THREE.Quaternion();
function camQ1(t) {
  let i = 0; while (i + 1 < Q1K.length - 1 && Q1K[i + 1].t <= t) i++;
  const a = Q1K[i], b = Q1K[i + 1], u = sg(t, a.t, b.t), ue = i === 0 ? eio(u) * 0.5 + u * 0.5 : u;
  const pts = Q1K.map((k) => k.p), cr = new THREE.CatmullRomCurve3(pts);
  const g = (i + ue) / (Q1K.length - 1);
  camera.position.copy(cr.getPoint(g));
  _qq.slerpQuaternions(a.q, b.q, eio(u)); camera.quaternion.copy(_qq);
  camera.fov = lerp(a.fov, b.fov, eio(u)); camera.updateProjectionMatrix();
}
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  const u = eio(sg(t, a[0], b[0])) * 0.35 + sg(t, a[0], b[0]) * 0.65;
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
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const VENDEDOR = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.5 }, cejas: { alto: 0.55, ang: 0.0 }, boca: { sonrisa: 1, abierta: 0.1, ancho: 1.2 } };
const APURADO = { ...CARA.concentrada, ojos: { abiertos: 0.85, y: -0.6 }, cejas: { alto: 0.2, ang: 0.35 } };
const QUIETO = { ...CARA.neutra, ojos: { abiertos: 0.9, y: -0.5 }, cejas: { alto: 0.05, ang: 0.2 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.95 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.75, feliz: 0.2 }, cejas: { alto: 0.3, ang: 0.5, asim: 0.4 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1.05 } };
const CURIOSO = { ...CARA.esperanza, ojos: { abiertos: 1, feliz: 0.1 }, cejas: { alto: 0.6, ang: 0.25, asim: 0.5 }, boca: { sonrisa: 0.3, abierta: 0, ancho: 0.95 } };
const FELIZ = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, boca: { sonrisa: 0.95, abierta: 0.05, ancho: 1.15 } };
const ELOGIO = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, cejas: { alto: 0.75, ang: 0.0, asim: 0.3 }, boca: { sonrisa: 1, abierta: 0.12, ancho: 1.15 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); p.boca.sonrisa = Math.min(p.boca.sonrisa, 0.5); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);   // hablando, nunca con los ojos cerrados
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const toW = (per, local) => { per.raiz.updateMatrixWorld(true); return per.cuerpo.localToWorld(V3(...local)); };
function manoA(per, p, lado, w, k, codo = null) { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "I" ? "manoI" : "manoD"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(cl(k)))); if (codo) p[lado === "I" ? "codoI" : "codoD"] = codo; }
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
const LADEA_TEL = globalThis.__LT ?? -0.38;   // la cabeza ladeada hacia el hombro izquierdo (el del celular)
// ---- Tano ----
function poseTano(t, pa) {
  if (t >= P2) {
    // Q5b: en la puerta de su pizzería, del lado de la vereda, la caja vacía bajo el brazo; mira enfrente, curioso
    const p = poseEn(t, [[0, { x: 1.62, y: 0.14, z: 0.42, giro: 0.12, ...aC(-0.05, -0.05, 0.06), ...CURIOSO, ...BRAZOS.costado, manoI: [0.3, 0.12, 0.12], codoI: [1, -0.4, -0.2] }], [T.t6 + LEN.t6, { ...aC(0.0, -0.08, 0.1), ...CURIOSO, cejas: { alto: 0.75, ang: 0.3, asim: 0.6 } }, 0.4]]);
    p.t = t; bocaVoz(p, t, T.t6, ENV.t6, 0.6); return p;
  }
  const L = { x: DUENO.x, z: DUENO.z };
  if (t < T.p2) {
    // P1: escribe con la derecha, el bollo en la izquierda, el celular entre la oreja y el hombro izquierdo
    const p = poseEn(t, [
      [0, { ...L, giro: -0.28, ...aC(-0.12, 0.42, LADEA_TEL), ...APURADO, ...BRAZOS.costado, manoI: [0.34, 0.36, 0.3], codoI: [0.9, -0.6, -0.2] }],
      [T.t1 + W2_.t1, { ...aC(0.12, 0.2, LADEA_TEL), ...CARA.sorpresa, boca: { sonrisa: 0, abierta: 0.1, ancho: 0.8 }, cejas: { alto: 0.7, ang: 0.3 } }, 0.2],   // "¿Calle qué?"
      [T.m1 + 0.3, { ...aC(-0.1, 0.45, LADEA_TEL), ...APURADO }, 0.25],
      [T.t2 + 0.2, { ...aC(0.2, 0.3, LADEA_TEL), ...APURADO, ojos: { abiertos: 0.9, y: -0.2, x: 0.3 } }, 0.25],
    ]);
    const u = t < T.esc2[0] ? sg(t, T.esc1[0], T.esc1[1]) : sg(t, T.esc2[0], T.esc2[1]);
    const escribe = (t >= T.esc1[0] && t < T.esc1[1]) || (t >= T.esc2[0] && t < T.esc2[1]);
    const w = COMANDA.clone().add(V3(-0.03 + 0.09 * ((u * 3) % 1), 0.04, 0.05 - 0.04 * Math.floor(u * 3) / 3)); if (escribe) w.x += Math.sin(t * 38) * 0.005;
    manoA(tano, p, "D", w, 1, [-0.8, -0.6, -0.3]);
    p.t = t; bocaVoz(p, t, T.t1, ENV.t1, 0.65); bocaVoz(p, t, T.t2, ENV.t2, 0.65); return p;
  }
  if (t < T.p3) {
    // P2b: se agacha al celular del mostrador con la masa estirada colgando de la izquierda; el índice en el micrófono
    const p = poseEn(t, [
      [0, { ...L, giro: 0.35, inclina: 0.22, ...aC(0.1, 0.3, 0.05), ...VENDEDOR, ...BRAZOS.costado, manoI: [0.44, 0.66, 0.26], codoI: [1, -0.3, -0.2] }],
    ]);
    const cel = CEL_M.clone().add(V3(0, 0.09, 0.0));
    manoA(tano, p, "D", cel, 1, [-0.8, -0.5, -0.2]); p.dedoD = 1;
    p.t = t; bocaVoz(p, t, T.t3, ENV.t3, 0.75); return p;
  }
  if (t < T.p4) {
    // P3: de espaldas (vemos entrar a Facu); P3b: de frente, la cara cae; P3c: mira la caja, quieto
    const p = poseEn(t, [
      [0, { ...L, giro: 0.15, ...aC(0.25, 0.1), ...CARA.neutra, ...BRAZOS.apoyado }],
      [T.f1 + W2_.f1, { ...aC(0.3, 0.05), ...CARA.sorpresa, boca: { sonrisa: 0, abierta: 0.25, ancho: 0.8 } }, 0.2],
      [T.p3c, { giro: 0.05, ...aC(0.05, 0.42, 0.0), ...QUIETO }, 0.35],
    ]);
    p.t = t; return p;
  }
  if (t < T.p4c) {
    // P4: abre la tapa con la derecha · "Cenamos." resignado con media sonrisa
    const p = poseEn(t, [
      [0, { ...L, giro: 0.15, ...aC(0.05, 0.42, 0.0), ...QUIETO, ...BRAZOS.apoyado }],
      [T.t4, { ...aC(0.35, 0.1, 0.08), ...MEDIA }, 0.25],
      [T.p4b + 0.3, { ...aC(0.1, 0.4, 0.0), ...BUENA }, 0.3],
    ]);
    const u = eio(sg(t, T.abre[0], T.abre[1]));
    if (t < T.abre[1] + 0.3) { CAJA_T.updateMatrixWorld(true); const w = CAJA_T.userData.bis.localToWorld(V3(0, 0.0, CAJA_T.userData.L * 0.96)); manoA(tano, p, "D", w, 1 - sg(t, T.abre[1], T.abre[1] + 0.3), [-0.8, -0.6, -0.3]); }
    p.t = t; bocaVoz(p, t, T.t4, ENV.t4, 0.6); return p;
  }
  // P4c: la porción en la boca (izquierda), el celular en la derecha cerca de la cara grabando el audio, masticando
  const p = poseEn(t, [[0, { ...L, giro: 0.2, ...aC(0.12, 0.05, 0.05), ...VENDEDOR, ojos: { abiertos: 1, feliz: 0.55 }, ...BRAZOS.costado }]]);
  manoA(tano, p, "I", toW(tano, [0.06, 0.66, 0.36]), 1, [0.9, -0.6, -0.1]);
  manoA(tano, p, "D", toW(tano, [-0.2, 0.52, 0.36]), 1, [-0.9, -0.6, -0.1]);
  const mast = 0.12 + 0.1 * Math.abs(Math.sin(t * 9));
  p.boca.abierta = mast; p.boca.sonrisa = 0.2; p.t = t; bocaVoz(p, t, T.t5, ENV.t5, 0.35); return p;
}
const W2_ = T.W2;
// ---- Facu ----
function poseFacu(t, pa) {
  const u = sg(t, T.entra[0], T.entra[1]);
  const x0 = (LOC.PX0 + LOC.PX1) / 2, z0 = 0.35;
  const anda = u > 0.01 && u < 0.99;
  const x = lerp(x0, FACU_M.x, eio(u)), z = lerp(z0, FACU_M.z, eio(u));
  const gT = dirGiro(FACU_M.x, FACU_M.z, DUENO.x, DUENO.z);
  if (t < T.p4b) {
    const p = poseEn(t, [
      [0, { x, z, giro: anda ? dirGiro(x0, z0, FACU_M.x, FACU_M.z) : gT, paso: anda ? 1 : 0, ...aC(0.0, 0.05), ...CARA.neutra, ojos: { abiertos: 0.8 }, cejas: { alto: 0.1, ang: 0.4 }, ...BRAZOS.costado }],
      [T.f1 + 0.1, { ...aC(0.0, 0.0), ...CARA.neutra, ojos: { abiertos: 0.85 }, cejas: { alto: 0.2, ang: 0.5 } }, 0.2],
      [T.p4 + 0.5, { ...aC(-0.2, 0.3), ...CARA.sonrisa }, 0.3],
    ]);
    Object.assign(p, { x, z, giro: anda ? dirGiro(x0, z0, FACU_M.x, FACU_M.z) : gT, paso: anda ? 1 : 0 });
    // las manos a los costados de la caja (mientras la trae)
    const b = cajaFacuEn(t);
    if (b.k > 0) { CAJA_T.updateMatrixWorld(true); const L = CAJA_T.userData.L; manoA(facu, p, "I", CAJA_T.localToWorld(V3(L / 2 + 0.01, 0.0, 0.05)), b.k, [0.8, -0.6, -0.2]); manoA(facu, p, "D", CAJA_T.localToWorld(V3(-L / 2 - 0.01, 0.0, 0.05)), b.k, [-0.8, -0.6, -0.2]); }
    p.t = t; bocaVoz(p, t, T.f1, ENV.f1, 0.6); return p;
  }
  // P4b/P4c: sin el casco (en la izquierda), la porción en la derecha a mitad de camino; mira a Tano
  const p = poseEn(t, [[0, { x: FACU_M.x, z: FACU_M.z, giro: gT - 0.2, ...aC(-0.35, 0.1), ...CARA.sonrisa, ...BRAZOS.costado, manoI: [0.3, 0.1, 0.18] }], [T.t5, { ...aC(-0.45, 0.0), ...CARA.incredula, ojos: { abiertos: 0.9 }, cejas: { alto: 0.5, ang: 0.2, asim: 0.8 } }, 0.25]]);
  const kl = eio(sg(t, T.levanta[0], T.levanta[1]));
  CAJA_T.updateMatrixWorld(true);
  const desde = CAJA_T.localToWorld(V3(0.04, 0.03, 0.12)), hasta = toW(facu, [-0.08, 0.5, 0.38]);
  manoA(facu, p, "D", desde.clone().lerp(hasta, kl).add(V3(0, 0.03, 0)), 1, [-0.8, -0.6, -0.2]);
  p.t = t; return p;
}
// la caja de Don Tano: en las manos de Facu (entrando) → en el mostrador
let PECHO_F = null;
function cajaFacuEn(t) {
  const u = sg(t, T.entra[0], T.entra[1]), x0 = (LOC.PX0 + LOC.PX1) / 2, z0 = 0.35;
  const x = lerp(x0, FACU_M.x, eio(u)), z = lerp(z0, FACU_M.z, eio(u)), g = dirGiro(FACU_M.x, FACU_M.z, DUENO.x, DUENO.z);
  const pecho = V3(x, 1.08, z).add(V3(Math.sin(g) * 0.4, 0, Math.cos(g) * 0.4));
  const k = sg(t, T.apoyaCaja - 0.3, T.apoyaCaja);
  const pos = pecho.clone().lerp(CAJA_MO, eio(k)); pos.y += Math.sin(k * PI) * 0.05;
  return { pos, giro: lerp(g, 0.05, k), k: 1 - sg(t, T.apoyaCaja, T.apoyaCaja + 0.25) };
}
// ---- Lucía ----
function poseLucia(t, pa) {
  const g0 = PI;   // de frente a la vidriera (mundo)
  const L = enL(DUENO.x, 0, DUENO.z);
  if (pa === "C") {
    const p = poseEn(t, [[0, { x: L.x, z: L.z, giro: g0, ...aC(0.0, 0.03), ...CARA.sonrisa, ...BRAZOS.apoyado }], [T.l1 + 1.6, { ...aC(0.06, 0.0, 0.06), ...BUENA }, 0.6]]);
    p.t = t; bocaVoz(p, t, T.l1, ENV.l1, 0.55); return p;
  }
  if (t < T.q3b || pa === "Q5" || pa === "Q5b") {
    // estira la masa con las dos manos (el disco gira entre las manos), tranquila
    const p = poseEn(t, [[0, { x: L.x, z: L.z, giro: g0 - 0.1, ...aC(0.0, 0.48), ...CARA.sonrisa, ojos: { abiertos: 0.85, y: -0.9, feliz: 0.25 }, ...BRAZOS.costado }]]);
    const c = discoEn(t);
    manoA(lucia, p, "I", c.clone().add(V3(-0.15, 0.02, 0.0)), 1, [0.8, -0.6, -0.2]);
    manoA(lucia, p, "D", c.clone().add(V3(0.15, 0.02, 0.0)), 1, [-0.8, -0.6, -0.2]);
    p.t = t; return p;
  }
  // Q3b: corta el ticket de la impresora y lo cuelga en el riel
  const p = poseEn(t, [[0, { x: L.x, z: L.z, giro: g0 + 0.5, ...aC(0.2, 0.4), ...CARA.sonrisa, ojos: { abiertos: 0.9, feliz: 0.2, y: -0.6 }, ...BRAZOS.costado }], [T.cuelga[1], { giro: g0 - 0.55, ...aC(-0.25, 0.0) }, 0.45]]);
  manoA(lucia, p, "D", ticketManoEn(t), 1, [-0.8, -0.6, -0.2]);
  p.t = t; return p;
}
const discoEn = (t) => { const c = enL(DUENO.x, 0.98, DUENO.z + 0.45); c.y += Math.sin(t * 3.2) * 0.012; return c; };
function ticketManoEn(t) {
  const a = enL(IMP_P.x, IMP_P.y + 0.22, IMP_P.z + 0.04), b = enL(RIEL_P.x + 0.27, RIEL_P.y - 0.04, RIEL_P.z + 0.04);
  const u = eio(sg(t, T.cuelga[0], T.cuelga[1])); const p = a.clone().lerp(b, u); p.y += Math.sin(u * PI) * 0.12; return p;
}
// ---- Sabri ----
function poseSabri(t, pa) {
  if (pa === "Q3s") {
    const L = enL(SABRI_L.x, 0, SABRI_L.z);
    const p = poseEn(t, [[0, { x: L.x, z: L.z, giro: PI - 0.9, ...aC(-0.3, 0.42), ...CARA.sonrisa, ojos: { abiertos: 0.9, y: -0.9, feliz: 0.2 }, ...BRAZOS.celular }], [T.q4 - 0.25, { giro: PI - 1.6, ...aC(0.2, 0.1) }, 0.35]]);
    p.t = t; return p;
  }
  if (pa === "Q5" || pa === "Q5b") {
    // en la moto, saliendo (sentada, las manos en el manubrio)
    const m = motoSabriEn(t);
    const p = { x: m.x, y: 0.18, z: m.z + 0.05, giro: m.giro, sentado: 1, ...aC(0.1, 0.05), ...CARA.sonrisa, ...BRAZOS.costado, manoI: [0.28, 0.42, 0.42], manoD: [-0.28, 0.42, 0.42], codoI: [0.8, -0.5, -0.2], codoD: [-0.8, -0.5, -0.2], t };
    return p;
  }
  // Q4: en la puerta de Martín con la caja en las dos manos
  const p = poseEn(t, [[0, { x: PX2 + 0.05, z: PZ2 - 0.85, giro: 0.1, ...aC(-0.1, 0.05), ...FELIZ, ...BRAZOS.costado }], [T.s1 + W2_.s1, { ...aC(-0.2, 0.15), ...BUENA }, 0.3]]);
  const k = 1 - sg(t, T.q4b - 0.3, T.q4b);
  const c = cajaSabriEn(t);
  CAJA_L.position.copy(c); CAJA_L.rotation.set(0, 0.1, 0); CAJA_L.updateMatrixWorld(true);
  const L = CAJA_L.userData.L;
  manoA(sabri, p, "I", CAJA_L.localToWorld(V3(L / 2 + 0.01, 0, 0.04)), k, [0.8, -0.6, -0.2]); manoA(sabri, p, "D", CAJA_L.localToWorld(V3(-L / 2 - 0.01, 0, 0.04)), k, [-0.8, -0.6, -0.2]);
  p.t = t; bocaVoz(p, t, T.s1, ENV.s1, 0.6); return p;
}
const cajaSabriEn = (t) => V3(PX2 + 0.05 + Math.sin(0.1) * 0.38, 1.08, PZ2 - 0.85 + Math.cos(0.1) * 0.38);
function motoSabriEn(t) { const u = ei(sg(t, T.moto, T.moto + 2.2)); return { x: lerp(2.4, -5.0, u), z: CALLE - 1.75, giro: -PI / 2 }; }
// ---- Martín ----
function poseMartin(t, pa) {
  if (pa === "Q2" || pa === "Q2i" || pa === "Q2b") {
    const p = poseEn(t, [
      [0, { x: LIV_M.x, y: -0.04, z: LIV_M.z, giro: 0.2, sentado: 1, ...aC(0.0, 0.4), ...CARA.fastidio, ojos: { abiertos: 0.7, y: -0.9 }, ...BRAZOS.celular }],
      [T.ceja, { ...aC(0.0, 0.38), ...CARA.incredula, ojos: { abiertos: 0.8, y: -0.8 }, cejas: { alto: 0.2, ang: 0.0, asim: 1 } }, 0.2],
      [T.q2b, { ...aC(0.25, 0.15, 0.08), ...ELOGIO }, 0.15],
    ]);
    p.t = t; bocaVoz(p, t, T.m2, ENV.m2, 0.7); return p;
  }
  if (pa === "Q4") {
    // de 3/4 de espaldas, abre la puerta con la derecha
    const p = poseEn(t, [[0, { x: PX2 - 0.45, z: PZ2 + 0.5, giro: PI - 0.35, ...aC(0.1, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.s1, { ...aC(0.15, 0.1), ...FELIZ }, 0.3]]);
    if (t < T.abreP + 0.4) { const w = PERILLA(t); manoA(martin, p, "D", w, sg(t, T.q4 - 0.1, T.abreP - 0.05) * (1 - sg(t, T.abreP + 0.05, T.abreP + 0.35)), [-0.8, -0.6, -0.2]); }
    p.t = t; return p;
  }
  // Q4b / Q4c: frente a la consola; la porción en la derecha y el celular en la izquierda; mira el celular, mira la pizza, muerde
  const p = poseEn(t, [
    [0, { x: PX2 - 0.62, z: PZ2 + 0.55, giro: 0.35, ...aC(-0.3, 0.35), ...CARA.sonrisa, ...BRAZOS.costado }],
    [T.mira[0], { ...aC(0.35, 0.4), ...CARA.neutra, ojos: { abiertos: 0.95, y: -0.7, x: 0.5 } }, 0.15],       // mira el celular
    [T.mira[1] + 0.05, { ...aC(-0.12, 0.25), ...CARA.neutra, ojos: { abiertos: 1, y: -0.4, x: -0.2 }, cejas: { alto: 0.4, ang: 0, asim: 0.6 } }, 0.15],   // mira la pizza
    [T.muerde, { ...aC(0.0, 0.05), ...CARA.feliz, ojos: { abiertos: 0.6, feliz: 0.7 }, boca: { sonrisa: 0.4, abierta: 0.0, ancho: 1 } }, 0.2],
  ]);
  if (pa === "Q4c") {
    manoA(martin, p, "I", toW(martin, [0.24, 0.5, 0.34]), 1, [0.9, -0.6, -0.2]);
    const boca = toW(martin, [0.0, 0.86, 0.33]), cerca = toW(martin, [-0.16, 0.6, 0.38]);
    const k = eio(sg(t, T.muerde - 0.3, T.muerde)) * (1 - eio(sg(t, T.muerde + 0.35, T.muerde + 0.7)));
    manoA(martin, p, "D", cerca.clone().lerp(boca.clone().add(V3(0, -0.05, 0)), k), 1, [-0.9, -0.5, -0.1]);
    if (t > T.muerde - 0.15 && t < T.muerde + 0.5) p.boca.abierta = Math.max(p.boca.abierta, 0.5 * (1 - sg(t, T.muerde - 0.02, T.muerde + 0.08)) + 0.08 * Math.abs(Math.sin((t - T.muerde) * 12)));
  }
  p.t = t; return p;
}
const PUERTA_ANG = (t) => -1.35 * eio(sg(t, T.abreP - 0.1, T.abreP + 0.45));
const PERILLA = (t) => { PHOJA.rotation.y = PUERTA_ANG(t); PHOJA.updateMatrixWorld(true); return PHOJA.localToWorld(V3(-0.86, 1.05, 0.12)); };
// =====================================================================================================
// OBJETOS EN EL TIEMPO
// =====================================================================================================
const enTano = (pa) => pa.startsWith("P");
function ponerObjetos(t, pa) {
  const p1 = !(t >= P2);
  // el celular en el hombro de Tano (P1 y P1i), pegado a la cabeza: toca oreja y hombro
  celHombro.visible = pa === "P1" || pa === "P1b";
  if (celHombro.visible) { if (celHombro.parent !== tano.cabeza) tano.cabeza.add(celHombro); celHombro.position.set(0.355, 0.12, 0.03); celHombro.scale.setScalar(1.25); celHombro.rotation.set(0, -PI / 2, 0); celHombro.rotateX(0.12); }
  // el celular del mostrador (vibra), el talonario, la birome (en la derecha de Tano en P1)
  celMostr.visible = enTano(pa) || pa === "Q5b";
  if (celMostr.visible) {
    const vib = (en(t, 0, 0.45) || en(t, 1.2, 1.6) || en(t, 2.6, 3.0) || en(t, T.p4i, T.p4i + 0.6)) ? Math.sin(t * 90) * 0.0025 : 0;
    if (pa === "P4c") { const m = manoMundo(tano, "D", _a); celMostr.position.copy(m).add(V3(0, 0.06, 0.02)); tano.cuerpo.getWorldQuaternion(_q); celMostr.quaternion.copy(_q); celMostr.rotateX(-0.25); celMostr.rotateY(-0.35); }
    else { celMostr.position.copy(CEL_M).add(V3(vib, 0.012, 0)); celMostr.rotation.set(-PI / 2 + 0.35, 0, 0); }
  }
  BIROME.visible = pa === "P1" || pa === "P1b" || pa === "P2b" || pa === "P3" || pa === "P3b" || pa === "P3c";
  if (BIROME.visible) {
    if (t < T.p2) { const m = manoMundo(tano, "D", _a); BIROME.position.copy(m).add(V3(0.0, -0.04, 0.03)); BIROME.rotation.set(0.5, 0, 0.35); }
    else { BIROME.position.copy(COMANDA).add(V3(0.1, 0.006, 0.02)); BIROME.rotation.set(0, 0, PI / 2); BIROME.rotateX(0.3); }
  }
  // la masa: un bollo en la mano izquierda (P1); cuelga estirada en P2b
  MASA.visible = pa === "P1" || pa === "P1b" || pa === "P2b";
  if (MASA.visible) { const m = manoMundo(tano, "I", _a); estirarMasa(MASA, pa === "P2b" ? 1 : 0); MASA.position.copy(m).add(V3(0, pa === "P2b" ? -0.09 : -0.07, 0.02)); MASA.rotation.set(0, pa === "P2b" ? 0.4 : 0, 0); }
  // la caja de Don Tano: la trae Facu (P3) → en el mostrador (P3c, P4) → abierta; la pizza adentro
  CAJA_T.visible = (pa.startsWith("P3") && pa !== "P3i") || pa === "P4" || pa === "P4b" || pa === "P4c" || pa === "Q5b";
  if (CAJA_T.visible) {
    if (pa === "Q5b") { const m = manoMundo(tano, "I", _a); CAJA_T.position.copy(m).add(V3(0.05, -0.02, -0.1)); CAJA_T.rotation.set(0, 0.2, -1.35); abrirCaja(CAJA_T, 0); }
    else { const b = cajaFacuEn(t); CAJA_T.position.copy(b.pos); CAJA_T.rotation.set(0, b.giro, 0); abrirCaja(CAJA_T, sg(t, T.abre[0], T.abre[1])); }
  }
  PIZZA_T.visible = CAJA_T.visible && pa !== "Q5b";
  VAPOR_T.visible = PIZZA_T.visible && t >= T.abre[0]; if (VAPOR_T.visible) VAPOR_T.userData.actualizar(t, sg(t, T.abre[0], T.abre[1] + 0.3));
  // las porciones: Facu saca la 1 (P4b); Tano tiene la 6 en la boca (P4c)
  PIZZA_T.userData.porciones.forEach((q, i) => (q.visible = !((i === 1 && t >= T.levanta[0]) || (i === 6 && t >= T.p4c))));
  PIZZA_T.userData.fainas.forEach((f) => (f.visible = true));
  POR_F.visible = (pa === "P4b" && t >= T.levanta[0]) || pa === "P4c";
  if (POR_F.visible) { const m = manoMundo(facu, "D", _a); POR_F.position.copy(m).add(V3(0, -0.06, 0.02)); facu.cuerpo.getWorldQuaternion(_q); POR_F.quaternion.copy(_q); POR_F.rotateY(PI / 2 + 0.3); POR_F.rotateZ(pa === "P4c" ? 0.35 : 0.1); POR_F.userData.bis.rotation.z = -0.35; }
  { // el hilo de queso: de la punta de la porción a la pizza, se estira y se corta
    const k = pa === "P4b" ? sg(t, T.levanta[0], T.levanta[0] + 0.15) * (1 - sg(t, T.levanta[1] - 0.15, T.levanta[1] + 0.05)) : 0;
    if (k > 0) { POR_F.updateMatrixWorld(true); const a = POR_F.userData.bis.localToWorld(V3(0.07, 0.015, 0)); CAJA_T.updateMatrixWorld(true); const b = CAJA_T.localToWorld(V3(0.05, 0.03, 0.08)); ponerHilo(HILO_F, a, b, k); } else HILO_F.visible = false;
  }
  POR_T.visible = pa === "P4c";
  if (POR_T.visible) { const m = manoMundo(tano, "I", _a); POR_T.position.copy(m).add(V3(0.0, 0.02, 0.03)); tano.cuerpo.getWorldQuaternion(_q); POR_T.quaternion.copy(_q); POR_T.rotateY(-PI / 2); POR_T.rotateZ(0.5); POR_T.userData.bis.rotation.z = -0.5; }
  // el casco de Facu: en la cabeza (P3, P4) o en la mano (P4c)
  CASCO_F.visible = (pa.startsWith("P3") && pa !== "P3i") || pa === "P4" || pa === "P4c";
  if (CASCO_F.visible) { if (pa === "P4c") cascoEnMano(CASCO_F, facu, "I"); else cascoEnCabeza(CASCO_F, facu); }
  // la puerta de Don Tano (entra Facu)
  const uP = sg(t, T.entra[0] - 0.1, T.entra[0] + 0.25) * (1 - sg(t, T.entra[0] + 0.8, T.entra[0] + 1.2));
  TANO.hoja.rotation.y = -1.3 * eio(uP) * (p1 ? 1 : 0);
  // ---- Lucía ----
  DISCO.visible = pa === "Q1" || pa === "Q5b" || pa === "C";
  if (DISCO.visible) { DISCO.position.copy(discoEn(t)); DISCO.rotation.set(0.25, t * 2.4, 0); }
  // los tickets que salen solos (Q1) y el #47 (Q3)
  const uTk = pa === "Q1" ? Math.max(sg(t, T.tks[0], T.tks[0] + 0.4) * (1 - sg(t, T.tks[0] + 0.45, T.tks[0] + 0.46)), sg(t, T.tks[1], T.tks[1] + 0.45)) : pa === "Q3" ? sg(t, T.imprime[0], T.imprime[1]) : pa === "C" ? sg(t, DUR - 0.75, DUR - 0.15) : 0;
  sacarTicket(IMP, uTk);
  TK_MANO.visible = pa === "Q3b" && t >= T.corta && t < T.cuelga[1];
  if (TK_MANO.visible) { TK_MANO.position.copy(ticketManoEn(t)).add(V3(0, -0.06, 0)); TK_MANO.rotation.set(0, PI + 0.2, 0.1); }
  TK_RIEL.visible = t >= T.cuelga[1] && !p1 && pa !== "Q3";
  // Sabri: el celular en las manos (Q3s), la caja en las manos (Q4), el casco puesto
  celSab.visible = pa === "Q3s";
  if (celSab.visible) { const a = manoMundo(sabri, "I", _a), b = manoMundo(sabri, "D", _b); celSab.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0)); sabri.cuerpo.getWorldQuaternion(_q); celSab.quaternion.copy(_q); celSab.rotateX(-0.7); }
  CASCO_S.visible = pa === "Q3s" || pa === "Q4" || pa === "Q5" || pa === "Q5b"; if (CASCO_S.visible) cascoEnCabeza(CASCO_S, sabri);
  CAJA_L.visible = pa === "Q4" || pa === "Q4b" || pa === "Q4c";
  if (CAJA_L.visible && pa !== "Q4") { CAJA_L.position.copy(MESA_M).add(V3(0, 0.002, 0)); CAJA_L.rotation.set(0, 0.0, 0); }
  abrirCaja(CAJA_L, pa === "Q4" ? 0 : sg(t, T.abre2[0], T.abre2[1]));
  PIZZA_L.visible = CAJA_L.visible; VAPOR_L.visible = CAJA_L.visible && t >= T.abre2[0]; if (VAPOR_L.visible) VAPOR_L.userData.actualizar(t, sg(t, T.abre2[0], T.abre2[1] + 0.3));
  PIZZA_L.userData.porciones.forEach((q, i) => (q.visible = !(i === 1 && pa === "Q4c")));
  // la porción de Martín y su mordida
  POR_M.visible = pa === "Q4c";
  if (POR_M.visible) { const m = manoMundo(martin, "D", _a); POR_M.position.copy(m).add(V3(0, -0.05, 0.02)); martin.cuerpo.getWorldQuaternion(_q); POR_M.quaternion.copy(_q); POR_M.rotateY(-PI / 2 - 0.25); POR_M.rotateZ(0.55); POR_M.userData.bis.rotation.z = -0.3; POR_M.userData.bis.scale.x = t >= T.muerde ? 0.45 : 1; }
  HILO_M2.visible = false;
  celMart.visible = pa === "Q2" || pa === "Q2b" || pa === "Q4c";
  if (celMart.visible) {
    martin.cuerpo.getWorldQuaternion(_q);
    if (pa === "Q4c") { const m = manoMundo(martin, "I", _a); celMart.position.copy(m).add(V3(0, 0.07, 0)); celMart.quaternion.copy(_q); celMart.rotateX(-0.6); celMart.rotateY(0.5); }
    else { const a = manoMundo(martin, "I", _a), b = manoMundo(martin, "D", _b); celMart.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0)); celMart.quaternion.copy(_q); celMart.rotateX(-0.75); }
  }
  // la puerta de Martín
  PHOJA.rotation.y = PUERTA_ANG(t);
  // la moto de Sabri (Q5b sale; antes, estacionada en su vereda)
  const ms = motoSabriEn(t); MOTO_S.position.set(ms.x, 0.0, ms.z); MOTO_S.rotation.y = ms.giro; MOTO_S.userData.luzT.material.color.set(t >= T.moto ? 0xc7655b : 0x7a3a34);
  MOTO_F.visible = true;
}
// =====================================================================================================
// RENDER
// =====================================================================================================
function luces(pa, t) {
  const calle = pa === "Q1" && t < T.q1in - 0.2 || pa === "Q5b";
  cielo.intensity = calle ? 0.9 : pa.startsWith("Q2") || pa.startsWith("Q4") ? 1.6 : 1.75; relleno.intensity = calle ? 0.35 : 0.7; sol.intensity = calle ? 0.6 : 1.25;
  sol.color.set(0xfff1dc); luzFarol.intensity = calle ? 3.0 : 0;
  const c = camera.position;
  sol.position.set(c.x + 0.8, 5.2, c.z + (c.z > 4.5 && c.x < 20 ? -1.5 : 1.5)); sol.target.position.set(c.x, 0.6, c.z + (c.z > 4.5 && c.x < 20 ? 2.5 : -2.5)); sol.target.updateMatrixWorld();
}
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  // ---- cámara ----
  if (pl[0] === "Q1") camQ1(t); else if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  luces(pa, t);
  dibujarInterfaz(t, pa);
  // ---- quién está en cuadro ----
  const vis = {
    tano: (enTano(pa) && !pa.endsWith("i")) || pa === "Q1" && t < T.q1m || pa === "Q5b",
    facu: ["P3", "P3b", "P3c", "P4", "P4b", "P4c"].includes(pa),
    lucia: ["Q1", "Q3", "Q3b", "Q3t", "Q3s", "Q5", "C"].includes(pa),
    sabri: ["Q3s", "Q4", "Q5b"].includes(pa),
    martin: ["Q2", "Q2b", "Q4", "Q4b", "Q4c"].includes(pa),
  };
  tano.raiz.visible = vis.tano; facu.raiz.visible = vis.facu; lucia.raiz.visible = vis.lucia; sabri.raiz.visible = vis.sabri; martin.raiz.visible = vis.martin;
  if (vis.tano) tano.poner(pa === "Q1" ? poseTano(T.p1i - 0.2, "P1") : poseTano(t, pa));
  if (vis.facu) facu.poner(poseFacu(t, pa));
  if (vis.lucia) lucia.poner(poseLucia(t, pa));
  if (vis.sabri) sabri.poner(poseSabri(t, pa));
  if (vis.martin) martin.poner(poseMartin(t, pa));
  ponerObjetos(t, pa);
  if (pa === "Q1" && t < T.q1m) { celHombro.visible = true; MASA.visible = true; BIROME.visible = true; }
  // ---- insertos ----
  const INS = { P1i: INS_COM, P3i: INS_COM, P2: INS_CHAT, P4i: INS_CHAT, Q2i: INS_MART, Q4i: INS_NOTI }[pa];
  for (const I of INSERTOS) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
  }
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);
  // ---- tarjetas ----
  AVISOS.length = 0;
  for (const k in GL) GL[k].visible = false;
  MAPA_S.visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t, pa);
  renderer.render(scene, camera);
}
const ent = (t, ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
// el globo que sale del celular del hombro de Tano (cola al celular)
function globoTel(g, t, ti, cx, cy) { celHombro.updateMatrixWorld(true); const [ox, oy] = enPantalla(celHombro.localToWorld(V3(0, 0, 0.0))); ponerGlobo(g, cx, cy, ent(t, ti), [ox, oy], 2); }
function chips(t, a, b, y = 200) { ponerGlobo(a, 60 + a.userData.W / 2, y, 1, null); ponerGlobo(b, 60 + a.userData.W + 36 + b.userData.W / 2, y, 1, null); }
function tarjetas(t, pa) {
  // P1: el chip debajo de "PIZZERÍAS" (HTML, y 150-350)
  if (pa === "P1" || pa === "P1b") {
    chips(t, GL.vie, GL.donT, 440);
    if (t >= T.t1 && t < T.m1 + 0.15) { verLineas(GL.t1, t >= T.t1 + W2_.t1 ? 2 : 1); hablarLado(GL.t1, tano, ent(t, T.t1), -1); }
    if (t >= T.m1 && t < T.p1i) globoTel(GL.m1, t, T.m1, 640, 640);
    if (pa === "P1b" && t >= T.p1b) { verLineas(GL.t2, 99); const [mx, my] = bocaPx(tano); ponerGlobo(GL.t2, 300, 660, 1, [mx - 60, my], 2); }
    if (t >= T.conV) globoTel(GL.conV, t, T.conV, 800, 820);
  }
  if (pa === "P1i" && t >= T.t2) { verLineas(GL.t2, t >= T.t2 + W2_.t2 ? 2 : 1); ponerGlobo(GL.t2, 540, 170, ent(t, T.t2), null, 1); }
  if (pa === "P2") {
    if (t >= T.rotP2[0]) ponerGlobo(GL.rP2a, 300, 210, ent(t, T.rotP2[0]), null, 1);
    if (t >= T.rotP2[1]) ponerGlobo(GL.rP2b, 700, 400, ent(t, T.rotP2[1]), null, 1);
  }
  if (pa === "P2b" && t >= T.t3) hablar(GL.t3, tano, ent(t, T.t3), 1, -60);
  if (pa === "P3" || pa === "P3b") { chips(t, GL.vie2, GL.donT); }
  if (pa === "P3" && t >= T.f1) { verLineas(GL.f1, t >= T.f1 + W2_.f1 ? 2 : 1); hablar(GL.f1, facu, ent(t, T.f1), 1, 0); }
  if (pa === "P3b" && t < T.f1 + LEN.f1 + 0.05) { verGlobo(GL.f1, 99); ponerGlobo(GL.f1, 560, 320, 1, null, 1); }
  if (pa === "P3c") {
    CAJA_T.updateMatrixWorld(true); const [bx, by] = enPantalla(CAJA_T.localToWorld(V3(0, 0.05, 0.1)));
    if (t >= T.rotP3[0]) { ponerGlobo(GL.rP3a, 290, 1380, ent(t, T.rotP3[0]), null, 1); ponerGuia(GUIAS[0], 290 + GL.rP3a.userData.W / 2 - 10, 1380, bx - 60, by, eo(sg(t, T.rotP3[0], T.rotP3[0] + 0.25))); }
    if (t >= T.rotP3[1]) ponerGlobo(GL.rP3b, 250, 1590, ent(t, T.rotP3[1]), null, 1);
  }
  if (pa === "P4" && t >= T.t4) hablar(GL.t4, tano, ent(t, T.t4), 1, 0);
  if (pa === "P4c" && t >= T.t5) hablar(GL.t5, tano, ent(t, T.t5), 1, -40);
  // ---- parte 2 ----
  if (pa === "Q1" && t >= T.q1in - 0.15) { chips(t, GL.vieL, GL.luc); if (t >= T.rotQ1) { IMP.updateMatrixWorld(true); const [ix, iy] = enPantalla(IMP.localToWorld(V3(0, 0.12, 0))); ponerGlobo(GL.rQ1, 560, 1500, ent(t, T.rotQ1), null, 1); ponerGuia(GUIAS[0], 560, 1500 - GL.rQ1.userData.H / 2, ix, iy, eo(sg(t, T.rotQ1, T.rotQ1 + 0.25))); } }
  if (pa === "Q2") { chips(t, GL.vieQ2, GL.luc); }
  if (pa === "Q2i" && t >= T.sug) ponerGlobo(GL.rQ2, 540, 230, ent(t, T.sug), null, 1);
  if (pa === "Q2b" && t >= T.m2) hablar(GL.m2, martin, ent(t, T.m2), 1, 0);
  if (pa === "Q3" && t >= T.imprime[0] + 0.35) { IMP.updateMatrixWorld(true); const [ix, iy] = enPantalla(IMP.userData.tk.localToWorld(V3(0, 0.1, 0))); ponerGlobo(GL.rQ3, 330, 1560, ent(t, T.imprime[0] + 0.35), null, 1); ponerGuia(GUIAS[0], 330 + GL.rQ3.userData.W / 2 - 20, 1560 - 40, ix - 40, iy, eo(sg(t, T.imprime[0] + 0.35, T.imprime[0] + 0.6))); }
  if (pa === "Q3s") { celSab.updateMatrixWorld(true); const [sx, sy] = enPantalla(celSab.localToWorld(V3(0, 0, 0))); ponerGlobo(MAPA_S, 300, 700, ent(t, T.q3s + 0.1), null, 1); ponerGuia(GUIAS[0], 300 + 260, 900, sx, sy, eo(sg(t, T.q3s + 0.1, T.q3s + 0.35))); }
  if (pa === "Q4") { chips(t, GL.vieQ4, GL.luc); if (t >= T.s1) { verLineas(GL.s1, t >= T.s1 + W2_.s1 ? 2 : 1); hablar(GL.s1, sabri, ent(t, T.s1), 1, 0); } }
  if (pa === "Q5") ponerGlobo(GL.rQ5, 540, 200, ent(t, T.q5 + 0.05), null, 1);
  if (pa === "Q5b" && t >= T.t6) hablar(GL.t6, tano, ent(t, T.t6), 1, 0);
}
// la burbuja al costado de la cabeza (cuando arriba está "PIZZERÍAS"); lado -1 = a la izquierda de la cabeza
function hablarLado(g, per, s, lado = -1, dy = 0) {
  const [hx, hy] = coronillaPx(per), [bx, by] = bocaPx(per), { W: Wg, H } = g.userData;
  const cx = lado < 0 ? Math.max(Wg / 2 + 40, hx + 60 - Wg / 2) : Math.min(1040 - Wg / 2, hx - 60 + Wg / 2);
  const cy = Math.max(540 + H / 2, hy - 50 - H / 2 + dy); ponerGlobo(g, cx, cy, s, cy + H / 2 > hy ? [bx + lado * 70, by] : [hx + lado * 10, hy + 10], 2);
}
const partesL = (l) => l.split(/(\[[^\]]+\])/).filter(Boolean).flatMap((p) => (p.startsWith("[") ? [p] : p.split(/(?<= )/))).length;
const verLineas = (g, n) => verGlobo(g, n >= g.userData.lineas.length ? 99 : g.userData.lineas.slice(0, n).reduce((a, l) => a + partesL(l), 0));

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice() }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
