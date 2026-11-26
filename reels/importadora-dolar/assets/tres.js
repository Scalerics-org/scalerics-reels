// Capa 3D de importadora-dolar (Three.js r170 local). Base técnica: reels/tienda-tenes-stock (el depósito de Casa Pao,
// Paola y Mica) y reels/dist-comisiones (globos en dos tiempos, globos fijos, camPantalla, bocaVoz sin pisar objetos).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
//   EL DEPÓSITO DE "CASA PAO · IMPORTADOS" visto desde ADENTRO hacia el PORTÓN ABIERTO (piso y = 0, la pared del portón en
//     z = -3): la mesa de despacho con la calculadora (Paola detrás), el pizarrón "DÓLAR: 40" en la pared, el ventilador de
//     pie de muestra, la columna con la lista de JULIO pegada con cinta, estanterías casi vacías, la puerta de la oficina
//   EL PATIO: el contenedor de 20 pies navy sobre el chasis, puertas abiertas hacia el depósito; el muro y el cielo crema
//   PARTE 1: "¡Pao! ¡Vendimos todo el contenedor!" · "¡Vamos! ¿A cuánto?" · "A lista. Mil novecientos cincuenta." · la
//            proforma · el pizarrón 40 → 43, la calculadora 989.000, el contenedor 492 de 500 · "Vendimos todo. Y perdimos
//            plata." (el ventilador se frena) · "¡Graciela quiere doscientos más!" · "Seba. Por favor. Dejá de vender."
//   PARTE 2: los mismos arranques · el precio de hoy en el celular ($ 2.530) · "Ya está cargada." (el panel recalcula) · el
//            contenedor 500 de 500 · "¿Le hago un diez?" → Debajo del margen → "Le hago un cinco." · "Vendé, Seba. Vendé."
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, PIEL, MARCA, CARA, BRAZOS, pegarACamara, crearCelular, crearTablet } from "./personajes.js";
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
const r2 = (n) => Math.round(n * 100) / 100;
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
scene.background = new THREE.Color(0xf1efe4);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 160);
camera.layers.enable(1);
scene.add(camera);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, kraft: 0xc49a6c, madera: 0xd7b98a, gris: 0xc9ccd2, hoja: 0x4f7a3a };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.85), madera: mat(C.madera, 0.75), gris: mat(C.gris, 0.35, { metalness: 0.3 }), goma: mat(0x23262c, 0.8),
  chasis: mat(0x2e3238, 0.6, { metalness: 0.2 }), alu: mat(0xc3c7cc, 0.35, { metalness: 0.45 }), hoja: mat(C.hoja, 0.8),
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
const pesos = (n) => "$ " + Math.round(n).toLocaleString("es-UY").replace(/,/g, ".");
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// la geometría estática de un grupo, en una malla por material (SwiftShader: menos llamadas de dibujo)
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

// =====================================================================================================
// EL DEPÓSITO (piso y = 0; la pared del portón en z = PZ; el portón entre PX0 y PX1)
// =====================================================================================================
const PZ = -3.0, PX0 = -0.2, PX1 = 2.6, PH = 3.3, ALTO = 4.4;
const MESA = { x: -0.65, z: -1.45, w: 1.3, d: 0.62, y: 0.86 };
const PAO = { x: -0.62, z: -2.05 };                          // Paola detrás de la mesa de despacho, de frente
const FAN = { x: -0.05, z: -2.5 };                          // el ventilador de pie de muestra, a la derecha de Paola
const PIZ = { x: -3.05, y: 1.78, W: 0.92, H: 0.62 };         // el pizarrón en la pared del portón
const COL = { x: 2.9, z: -1.7, w: 0.32 };                 // la columna de hormigón con la lista (parte 1) / la tablet (parte 2)
const CONT = { x: 1.2, z: -6.0, y: 1.25, W: 2.44, H: 2.59, L: 6.06 };   // el contenedor: el frente de las puertas en z, el piso en y
const DEP = new THREE.Group(); scene.add(DEP);
// ---- piso de hormigón alisado ----
const hormigon = (base, sem) => lienzo(1024, 1024, (x, w, h) => {
  x.fillStyle = base; x.fillRect(0, 0, w, h);
  semilla = sem; for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(${az() > 0.5 ? "255,255,250" : "40,38,34"},${0.025 + az() * 0.03})`; const r = 6 + az() * 40; x.beginPath(); x.arc(az() * w, az() * h, r, 0, 7); x.fill(); }
  x.strokeStyle = "rgba(48,46,42,0.5)"; x.lineWidth = 4; x.strokeRect(2, 2, w - 4, h - 4);
});
{
  const tx = hormigon("#8a877c", 11); tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(6, 5);
  const piso = plano(10, 8.2, tx, 0.6, 0, 1.1); piso.rotation.x = -Math.PI / 2; piso.material.roughness = 0.92; DEP.add(piso);
}
// ---- paredes de bloque blanco ----
const bloqueT = lienzo(512, 512, (x, w, h) => {
  x.fillStyle = "#f7f7f2"; x.fillRect(0, 0, w, h);
  const bh = h / 4, bw = w / 2;
  x.fillStyle = "rgba(120,118,108,0.16)";
  for (let j = 0; j < 4; j++) { x.fillRect(0, j * bh, w, 6); for (let i = 0; i < 3; i++) x.fillRect(((j % 2) * bw) / 2 + i * bw - 3, j * bh, 6, bh); }
  x.fillStyle = "rgba(255,255,255,0.5)"; for (let j = 0; j < 4; j++) x.fillRect(0, j * bh + 8, w, 3);
});
bloqueT.wrapS = bloqueT.wrapT = THREE.RepeatWrapping;
function paredBloque(w, h) { const t = bloqueT.clone(); t.needsUpdate = true; t.repeat.set(w / 0.8, h / 0.8); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.92 })); m.receiveShadow = true; return m; }
const nombreT = lienzo(2048, 256, (x, w, h) => {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "CASA PAO · IMPORTADOS", 900, 170, w - 160); x.fillText("CASA PAO · IMPORTADOS", w / 2, h / 2 + 8);
});
const XL = -4.2, XR = 4.6;
{
  // la pared del portón (z = PZ): dos paños a los costados del portón y el dintel arriba; la franja navy con el nombre
  const izq = paredBloque(PX0 - XL, ALTO); izq.position.set((XL + PX0) / 2, ALTO / 2, PZ); DEP.add(izq);
  const der = paredBloque(XR - PX1, ALTO); der.position.set((PX1 + XR) / 2, ALTO / 2, PZ); DEP.add(der);
  const din = paredBloque(PX1 - PX0, ALTO - PH); din.position.set((PX0 + PX1) / 2, PH + (ALTO - PH) / 2, PZ); DEP.add(din);
  // el espesor del muro en el vano (que no se vea de papel)
  for (const x of [PX0, PX1]) { const j = cajaS(0.2, PH, 0.22, mat(0xe9e8e0, 0.9), x + (x === PX0 ? -0.1 : 0.1), PH / 2, PZ - 0.11); DEP.add(j); }
  DEP.add(cajaS(PX1 - PX0 + 0.4, 0.2, 0.22, mat(0xe9e8e0, 0.9), (PX0 + PX1) / 2, PH + 0.1, PZ - 0.11));
  DEP.add(mesh(new THREE.PlaneGeometry(XR - XL, 0.62), M.navy, (XL + XR) / 2, 3.86, PZ + 0.008));
  const franja = plano(3.3, 0.41, nombreT, (PX0 + PX1) / 2, 3.86, PZ + 0.012); franja.material.roughness = 0.8; DEP.add(franja);
  // el riel del portón corredizo (navy3) arriba del vano y las dos hojas de chapa corridas hacia afuera, contra el muro
  DEP.add(caja(XR - XL - 0.6, 0.1, 0.1, M.navy3, (XL + XR) / 2, PH + 0.28, PZ + 0.07, 0.01));
  const chapaT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, h); for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? "#2c4268" : "#18284a"; x.fillRect(i * 32, 0, 16, h); } x.fillStyle = "rgba(0,0,0,0.2)"; x.fillRect(0, h - 30, w, 30); });
  for (const [x0, x1] of [[PX0 - 1.45, PX0 + 0.06], [PX1 - 0.06, PX1 + 1.45]]) { const h = mesh(new THREE.BoxGeometry(x1 - x0, PH + 0.1, 0.05), [mat(C.navy3, 0.6), mat(C.navy3, 0.6), mat(C.navy3, 0.6), mat(C.navy3, 0.6), new THREE.MeshStandardMaterial({ map: chapaT, roughness: 0.55 }), new THREE.MeshStandardMaterial({ map: chapaT, roughness: 0.55 })], (x0 + x1) / 2, (PH + 0.1) / 2, PZ - 0.3); DEP.add(h); }
  // paredes de los costados y el fondo de atrás de la cámara (crema), techo claro con tubos
  const pi = paredBloque(8.2, ALTO); pi.rotation.y = Math.PI / 2; pi.position.set(XL, ALTO / 2, 1.1); DEP.add(pi);
  const pd = paredBloque(8.2, ALTO); pd.rotation.y = -Math.PI / 2; pd.position.set(XR, ALTO / 2, 1.1); DEP.add(pd);
  const atras = paredBloque(XR - XL, ALTO); atras.rotation.y = Math.PI; atras.position.set((XL + XR) / 2, ALTO / 2, 5.2); DEP.add(atras);
  const techo = mesh(new THREE.PlaneGeometry(XR - XL, 8.4), mat(0xdcdad0, 0.95), (XL + XR) / 2, ALTO, 1.1); techo.rotation.x = Math.PI / 2; DEP.add(techo);
  const tuboM = new THREE.MeshBasicMaterial({ color: 0xfbfbf4, toneMapped: false });
  for (const [x, z] of [[-1.6, -1.2], [1.6, -1.2], [-1.6, 1.6], [1.6, 1.6]]) { const tb = mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.3, 10).rotateZ(Math.PI / 2), tuboM, x, ALTO - 0.12, z); tb.castShadow = false; DEP.add(tb); }
  // zócalo navy a lo largo de la pared del portón
  for (const [a, b] of [[XL, PX0 - 0.2], [PX1 + 0.2, XR]]) DEP.add(caja(b - a, 0.12, 0.03, M.navy3, (a + b) / 2, 0.06, PZ + 0.015, 0.005));
  // la puerta de la oficina en la pared del portón, a la izquierda (abierta hacia adentro de la oficina: un vano oscuro con luz)
  // (r1) la puerta de la oficina en la pared de la IZQUIERDA (x = XL), para que el pizarrón quede fuera del plano de P4
  const PU = { w: 0.95, h: 2.15 };
  const pg = new THREE.Group(); pg.position.set(XL + 0.004, 0, -1.35); pg.rotation.y = Math.PI / 2; DEP.add(pg);
  pg.add(mesh(new THREE.PlaneGeometry(PU.w, PU.h), mat(0xc9c3a8, 0.9), 0, PU.h / 2, 0));
  for (const s2 of [-1, 1]) pg.add(caja(0.08, PU.h + 0.06, 0.08, M.navy, s2 * (PU.w / 2 + 0.03), (PU.h + 0.06) / 2, 0.03, 0.01));
  pg.add(caja(PU.w + 0.22, 0.08, 0.08, M.navy, 0, PU.h + 0.06, 0.03, 0.01));
  const hoja = caja(0.05, PU.h, PU.w, M.navy3, -PU.w / 2 - 0.02, PU.h / 2, PU.w / 2 + 0.04, 0.01); hoja.rotation.y = 0.15; pg.add(hoja);
  const cartelOf = lienzo(512, 140, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "OFICINA", 900, 90, w - 60); x.fillText("OFICINA", w / 2, h / 2 + 4); });
  pg.add(plano(0.55, 0.15, cartelOf, 0, PU.h + 0.24, 0.01));
}
// ---- la estantería de ángulo ranurado navy3 contra la pared, a la derecha del portón: casi vacía ----
function estanteria(x, z, ry, cajasEn) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; DEP.add(g);
  for (const xx of [-0.85, 0.85]) for (const zz of [-0.25, 0.25]) g.add(caja(0.05, 2.3, 0.05, M.navy3, xx, 1.15, zz, 0.005));
  for (const y of [0.12, 0.66, 1.2, 1.74, 2.28]) g.add(caja(1.75, 0.03, 0.56, M.navy3, 0, y, 0, 0.005));
  for (const [xx, y, k] of cajasEn) { const c = caja(0.46, 0.46, 0.3, k ? M.kraft : mat(0xb8915f, 0.85), xx, y + 0.245, 0, 0.01); c.rotation.y = (xx * 7) % 0.1; g.add(c); }
  return g;
}
estanteria(3.6, PZ + 0.35, 0, [[-0.5, 0.135, 1], [0.1, 1.215, 0]]);
estanteria(XL + 0.35, 0.6, Math.PI / 2, [[0.4, 0.135, 0], [-0.3, 0.675, 1], [0.35, 0.675, 1]]);
// unas cajas sueltas en el piso (del despacho de la mañana)
DEP.add(caja(0.46, 0.46, 0.3, M.kraft, 3.55, 0.23, -1.9, 0.01));

// ---- las cajas del ventilador: kraft con la etiqueta navy "VENTILADOR DE PIE 16"" y el dibujito ----
function dibujoVentilador(x, cx, cy, s, tinta = "#0b1220") {
  x.strokeStyle = tinta; x.lineWidth = s * 0.07; x.lineCap = "round"; x.lineJoin = "round";
  x.beginPath(); x.arc(cx, cy - s * 0.18, s * 0.3, 0, 7); x.stroke();
  for (let i = 0; i < 3; i++) { const a = i * 2.09 + 0.3; x.beginPath(); x.ellipse(cx + Math.cos(a) * s * 0.14, cy - s * 0.18 + Math.sin(a) * s * 0.14, s * 0.13, s * 0.06, a, 0, 7); x.stroke(); }
  x.beginPath(); x.moveTo(cx, cy + s * 0.12); x.lineTo(cx, cy + s * 0.42); x.stroke();
  x.beginPath(); x.ellipse(cx, cy + s * 0.46, s * 0.2, s * 0.05, 0, 0, 7); x.stroke();
}
const cajaFrenteT = lienzo(512, 512, (x, w, h) => {
  x.fillStyle = "#c49a6c"; x.fillRect(0, 0, w, h);
  semilla = 5; for (let i = 0; i < 220; i++) { x.strokeStyle = `rgba(${az() > 0.5 ? "120,82,44" : "226,190,140"},0.18)`; x.lineWidth = 1 + az() * 2; const y = az() * h, xx = az() * w; x.beginPath(); x.moveTo(xx, y); x.lineTo(xx + 20 + az() * 60, y + (az() - 0.5) * 4); x.stroke(); }
  x.strokeStyle = "rgba(90,60,30,0.45)"; x.lineWidth = 12; x.strokeRect(6, 6, w - 12, h - 12);
  x.fillStyle = "#dcc092"; x.fillRect(w / 2 - 44, 0, 88, 70);
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(34, 96, w - 68, 330, 18); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.stroke();
  dibujoVentilador(x, 130, 230, 170);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle";
  ajustar(x, "VENTILADOR", 900, 56, 260); x.fillText("VENTILADOR", 216, 180);
  ajustar(x, "DE PIE", 900, 56, 260); x.fillText("DE PIE", 216, 244);
  x.font = F(900, 92); x.fillText('16"', 216, 336);
});
const cajaLadoT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#b88d5f"; x.fillRect(0, 0, w, h); x.strokeStyle = "rgba(90,60,30,0.45)"; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8); x.fillStyle = "#cfae80"; x.fillRect(0, h / 2 - 20, w, 40); });
const MAT_VENT = (() => { const fr = new THREE.MeshStandardMaterial({ map: cajaFrenteT, roughness: 0.88 }), la = new THREE.MeshStandardMaterial({ map: cajaLadoT, roughness: 0.9 }); return [la, la, la, la, fr, la]; })();

// =====================================================================================================
// EL PATIO Y EL CONTENEDOR DE 20 PIES (navy corrugado, sobre el chasis, puertas abiertas hacia el depósito)
// =====================================================================================================
const PAT = new THREE.Group(); scene.add(PAT);
{
  const tx = hormigon("#a9a69a", 23); tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(5, 4);
  const piso = plano(24, 18, tx, 1, -0.002, -12.0); piso.rotation.x = -Math.PI / 2; piso.material.roughness = 0.95; PAT.add(piso);
  // el muro del fondo del patio (bloque crema) y el cielo crema liso
  const muro = paredBloque(24, 2.6); muro.position.set(1, 1.3, -16.5); muro.material.color.setHex(0xefe9d8); PAT.add(muro);
  PAT.add(caja(24, 0.14, 0.3, M.navy3, 1, 2.66, -16.45, 0.01));
  const cielo = mesh(new THREE.PlaneGeometry(80, 40), new THREE.MeshBasicMaterial({ color: 0xf3efe0 }), 1, 15, -24); cielo.castShadow = cielo.receiveShadow = false; PAT.add(cielo);
  // dos árboles de copa redonda verde apagado detrás del muro (low-poly)
  for (const [x, s] of [[-3.5, 1.3], [5.8, 1.6]]) { PAT.add(mesh(new THREE.CylinderGeometry(0.12, 0.16, 2.4, 8), mat(0x6b5538, 0.9), x, 1.2, -18)); const co = mesh(new THREE.IcosahedronGeometry(s, 1), mat(0x5f8a3e, 0.9), x, 2.8 + s * 0.5, -18); co.scale.y = 0.85; PAT.add(co); }
}
// la chapa corrugada: un perfil trapezoidal extruido a lo alto (relieve marcado, no líneas)
function corrugado(ancho, alto, paso = 0.26, prof = 0.05) {
  const s = new THREE.Shape(); const n = Math.round(ancho / paso), p = ancho / n;
  s.moveTo(0, 0);
  for (let i = 0; i < n; i++) { const x = i * p; s.lineTo(x + p * 0.18, prof); s.lineTo(x + p * 0.5, prof); s.lineTo(x + p * 0.68, 0); s.lineTo(x + p, 0); }
  s.lineTo(ancho, -0.012); s.lineTo(0, -0.012); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: alto, bevelEnabled: false, curveSegments: 1 });
  g.rotateX(-Math.PI / 2); g.translate(-ancho / 2, 0, 0);   // perfil en x (relieve hacia +z), alto en +y
  g.computeVertexNormals();
  return g;
}
const CONTG = new THREE.Group(); CONTG.position.set(CONT.x, 0, CONT.z); PAT.add(CONTG);
const contM = mat(C.navy2, 0.5), contM2 = mat(0x1b2c4a, 0.5), contIn = mat(0x4a6290, 0.8);
let puertas = [], cajasCont, huecosG, numCont;
{
  const { W, H, L, y } = CONT;
  const g = CONTG;
  // los dos lados largos corrugados (el relieve hacia afuera) y el techo; el fondo cerrado
  for (const s of [-1, 1]) { const lado = new THREE.Mesh(corrugado(L, H - 0.16, 0.27, 0.055), contM); lado.rotation.y = s * Math.PI / 2; lado.position.set(s * W / 2, y + 0.08, -L / 2); lado.castShadow = lado.receiveShadow = true; g.add(lado); }
  const techo = cajaS(W, 0.06, L, contM2, 0, y + H - 0.03, -L / 2); g.add(techo);
  const fondo = new THREE.Mesh(corrugado(W, H - 0.16, 0.27, 0.05), contM); fondo.rotation.y = Math.PI; fondo.position.set(0, y + 0.08, -L); g.add(fondo);
  // adentro: las paredes lisas más claras y el piso de tablas de madera
  for (const s of [-1, 1]) { const p = mesh(new THREE.PlaneGeometry(L - 0.1, H - 0.2), contIn, s * (W / 2 - 0.07), y + H / 2, -L / 2); p.rotation.y = -s * Math.PI / 2; g.add(p); }
  g.add(mesh(new THREE.PlaneGeometry(W - 0.12, H - 0.2), contIn, 0, y + H / 2, -L + 0.08));
  { const t = mesh(new THREE.PlaneGeometry(W - 0.12, L - 0.1), mat(0x5a6f96, 0.85), 0, y + H - 0.08, -L / 2); t.rotation.x = Math.PI / 2; g.add(t); }   // (r1) techo del interior más claro
  const tablas = lienzo(256, 1024, (x, w, h) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#a0784e" : "#b08a5e"; x.fillRect(i * 32, 0, 32, h); } x.strokeStyle = "rgba(60,40,20,0.5)"; x.lineWidth = 3; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 32, 0); x.lineTo(i * 32, h); x.stroke(); } for (let k = 0; k < 10; k++) { x.beginPath(); x.moveTo((k * 37) % w, (k * 211) % h); x.lineTo((k * 37) % w + 32, (k * 211) % h); x.stroke(); } });
  const piso = plano(W - 0.12, L - 0.1, tablas, 0, y + 0.07, -L / 2); piso.rotation.x = -Math.PI / 2; g.add(piso);
  // el marco del frente (postes y travesaños navy, más oscuros) y las esquineras
  for (const s of [-1, 1]) g.add(cajaS(0.14, H, 0.16, M.navy3, s * (W / 2 - 0.07), y + H / 2, -0.08));
  g.add(cajaS(W, 0.2, 0.16, M.navy3, 0, y + H - 0.1, -0.08)); g.add(cajaS(W, 0.16, 0.16, M.navy3, 0, y + 0.08, -0.08));
  for (const s of [-1, 1]) for (const yy of [y + 0.06, y + H - 0.06]) g.add(cajaS(0.18, 0.13, 0.18, M.navy, s * (W / 2 - 0.08), yy, -0.07));
  for (const s of [-1, 1]) for (const yy of [y + 0.06, y + H - 0.06]) g.add(cajaS(0.18, 0.13, 0.18, M.navy, s * (W / 2 - 0.08), yy, -L + 0.08));
  // el código inventado en el techo del frente (crema, chico)
  const codT = lienzo(512, 96, (x, w, h) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "CPIU 204518 · 20'", 800, 58, w - 30); x.fillText("CPIU 204518 · 20'", w / 2, h / 2 + 3); });
  { const p = plano(1.0, 0.19, codT, 0, y + H - 0.1, 0.005); g.add(p); }
  // las dos puertas abiertas: corrugado, las cuatro barras de cierre verticales con sus manijas crema
  for (const s of [-1, 1]) {
    const piv = new THREE.Group(); piv.position.set(s * W / 2, y + 0.04, 0); piv.rotation.y = s * -1.95; g.add(piv);   // abiertas ~112°
    const hojaD = new THREE.Mesh(corrugado(W / 2 - 0.02, H - 0.08, 0.27, 0.045), contM); hojaD.rotation.y = 0; hojaD.position.set(-s * (W / 4), 0, 0.0); piv.add(hojaD); hojaD.castShadow = true;
    const hojaB = cajaS(W / 2 - 0.02, H - 0.08, 0.03, contM2, -s * (W / 4), (H - 0.08) / 2, -0.02); piv.add(hojaB);
    for (const k of [0.3, 0.72]) {
      const bx = -s * (W / 2 - 0.02) * k;
      piv.add(mesh(new THREE.CylinderGeometry(0.028, 0.028, H - 0.2, 10), M.alu, bx, (H - 0.08) / 2, 0.11));
      for (const yy of [0.25, H - 0.35]) piv.add(caja(0.08, 0.06, 0.08, M.alu, bx, yy, 0.09, 0.01));
      const man = new THREE.Group(); man.position.set(bx, 1.05, 0.13); piv.add(man);
      man.add(caja(0.05, 0.05, 0.06, M.cr, 0, 0, 0, 0.012)); const br = caja(0.34, 0.045, 0.045, M.cr, s * -0.17, -0.02, 0.03, 0.015); man.add(br);
    }
    puertas.push(piv);
  }
  // el chasis del camión (gris oscuro): dos largueros, el paragolpes, las ruedas atrás, las patas adelante
  for (const s of [-0.85, 0.85]) g.add(cajaS(0.16, 0.26, L + 0.4, M.chasis, s, y - 0.15, -L / 2 + 0.1));
  g.add(cajaS(W - 0.1, 0.12, 0.14, M.chasis, 0, y - 0.2, -0.1));
  g.add(cajaS(W + 0.1, 0.16, 0.12, M.chasis, 0, 0.62, 0.15)); for (const s of [-1, 1]) g.add(cajaS(0.1, 0.5, 0.1, M.chasis, s * 0.9, 0.92, 0.12));
  for (const z of [-L + 1.4, -L + 2.5]) for (const s of [-1, 1]) {
    const r = mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.32, 20).rotateZ(Math.PI / 2), M.goma, s * 0.98, 0.5, z); g.add(r);
    g.add(mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.34, 14).rotateZ(Math.PI / 2), M.alu, s * 0.98, 0.5, z));
  }
  for (const s of [-1, 1]) { g.add(cajaS(0.1, y - 0.2, 0.1, M.chasis, s * 0.8, (y - 0.2) / 2, -L + 4.6)); g.add(cajaS(0.3, 0.04, 0.3, M.chasis, s * 0.8, 0.02, -L + 4.6)); }
  // las 500 cajas: 20 capas de 5 × 5 desde el fondo; las 8 de la última capa arriba a la derecha van últimas (los huecos)
  const BW = 0.455, BH = 0.465, BD = 0.288;
  const geo = new THREE.BoxGeometry(BW - 0.01, BH - 0.01, BD - 0.008);
  cajasCont = new THREE.InstancedMesh(geo, MAT_VENT, 500); cajasCont.castShadow = true; cajasCont.receiveShadow = true;
  const HUE = new Set(["4,1", "4,2", "4,3", "4,4", "3,2", "3,3", "3,4", "2,4"]);
  const lista = [];
  for (let k = 0; k < 20; k++) {
    const capa = [];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) capa.push([r, c]);
    if (k === 19) capa.sort((a, b) => (HUE.has(a.join()) ? 1 : 0) - (HUE.has(b.join()) ? 1 : 0));
    for (const [r, c] of capa) lista.push([(c - 2) * BW, y + 0.08 + BH / 2 + r * BH, -L + 0.12 + BD / 2 + k * BD, k, r, c]);
  }
  cajasCont.userData.lista = lista; cajasCont.frustumCulled = false; g.add(cajasCont);
  // los 8 huecos: el fondo oscuro y el contorno rojo apagado
  huecosG = new THREE.Group(); g.add(huecosG);
  const marcoT = lienzo(256, 256, (x, w, h) => { x.clearRect(0, 0, w, h); x.strokeStyle = "#c7655b"; x.lineWidth = 22; x.setLineDash([46, 22]); x.strokeRect(14, 14, w - 28, h - 28); });
  const fondoH = mat(0x0e1626, 0.9), marcoM = new THREE.MeshBasicMaterial({ map: marcoT, transparent: true, toneMapped: false, depthWrite: false });
  for (const key of HUE) {
    const [r, c] = key.split(",").map(Number);
    const zf = -L + 0.12 + 19 * BD;   // la cara de adelante de la capa 18
    const b = mesh(new THREE.PlaneGeometry(BW - 0.02, BH - 0.02), fondoH, (c - 2) * BW, y + 0.08 + BH / 2 + r * BH, zf + 0.004); huecosG.add(b);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(BW - 0.03, BH - 0.03), marcoM); m.position.set((c - 2) * BW, y + 0.08 + BH / 2 + r * BH, zf + BD + 0.01); m.renderOrder = 2; huecosG.add(m);
  }
  sombras(g); huecosG.traverse((o) => { if (o.isMesh && o.material.transparent) o.castShadow = false; });
}
const _o = new THREE.Object3D();
// n cajas adentro; las que acaban de entrar con pop (u0: el tiempo de cada una)
function ponerCajas(n, t, t0, t1) {
  const L = cajasCont.userData.lista;
  const N = Math.round(cl(n, 0, 500));
  for (let i = 0; i < N; i++) {
    const [x, y, z] = L[i];
    const ti = t0 + (t1 - t0) * Math.pow(i / 500, 0.85);
    const s = t1 > t0 ? Math.max(0.01, bk(sg(t, ti - 0.02, ti + 0.12))) : 1;
    _o.position.set(x, y, z + (1 - s) * 0.25); _o.rotation.set(0, 0, 0); _o.scale.setScalar(s); _o.updateMatrix(); cajasCont.setMatrixAt(i, _o.matrix);
  }
  cajasCont.count = N; cajasCont.instanceMatrix.needsUpdate = true;
}

// =====================================================================================================
// LA MESA DE DESPACHO, LA CALCULADORA, EL PIZARRÓN, LA COLUMNA CON LA LISTA, EL VENTILADOR
// =====================================================================================================
let calc, calcPant, tabletMesa, tabletCol, pizT, listaT, lista, fanG, fanAspas, fanCab;
const pantCalcT = lienzo(640, 200, () => {});
const pantTabT = lienzo(1280, 860, () => {});
const pantColT = lienzo(1280, 860, () => {});
{
  // el tablón crema sobre caballetes navy, con remitos, el rollo de cinta y una caja abierta
  const g = new THREE.Group(); g.position.set(MESA.x, 0, MESA.z); DEP.add(g);
  g.add(caja(MESA.w, 0.05, MESA.d, mat(0xe9e4d0, 0.7), 0, MESA.y - 0.025, 0, 0.012));
  for (const s of [-1, 1]) {
    const c = new THREE.Group(); c.position.set(s * (MESA.w / 2 - 0.2), 0, 0); g.add(c);
    for (const k of [-1, 1]) { const p = caja(0.05, MESA.y - 0.04, 0.05, M.navy3, 0, (MESA.y - 0.04) / 2, k * 0.2, 0.008); p.rotation.x = k * 0.18; c.add(p); }
    c.add(caja(0.05, 0.05, MESA.d - 0.06, M.navy3, 0, MESA.y - 0.08, 0, 0.008));
  }
  // el frente de la mesa: una tela navy (tapa las piernas de Paola)
  g.add(caja(MESA.w - 0.04, 0.6, 0.02, M.navy2, 0, MESA.y - 0.35, MESA.d / 2 - 0.02, 0.008));
  // remitos y el rollo de cinta de embalar
  for (let k = 0; k < 3; k++) { const r = caja(0.16, 0.008, 0.22, mat(k ? 0xf7f6ee : 0xe8c9c3, 0.9), 0.35 + k * 0.012, MESA.y + 0.004 + k * 0.008, 0.05, 0.002); r.rotation.y = -0.2 + k * 0.1; g.add(r); }
  g.add(mesh(new THREE.TorusGeometry(0.06, 0.03, 10, 20).rotateX(Math.PI / 2), mat(0xc9a46b, 0.4), 0.58, MESA.y + 0.03, -0.12));
  // la calculadora de escritorio grande (crema y navy, teclas grandes) a la izquierda
  calc = new THREE.Group(); calc.position.set(MESA.x - 0.42, MESA.y, MESA.z + 0.06); calc.rotation.y = 0.18; DEP.add(calc);
  const cu = caja(0.3, 0.06, 0.36, M.cr, 0, 0.03, 0, 0.025); cu.rotation.x = -0.12; calc.add(cu);
  for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) calc.add(caja(0.055, 0.022, 0.05, k === 3 ? M.g : M.navy3, -0.096 + k * 0.064, 0.066 - i * 0.007, 0.1 - i * 0.062, 0.01));
  { const vis = new THREE.Group(); vis.position.set(0, 0.11, -0.13); vis.rotation.x = -0.55; calc.add(vis); vis.add(caja(0.28, 0.1, 0.03, M.navy, 0, 0, -0.01, 0.01)); calcPant = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.08), new THREE.MeshBasicMaterial({ map: pantCalcT, toneMapped: false })); calcPant.position.z = 0.007; vis.add(calcPant); calc.userData.vis = vis; }
  // la tablet de Paola (parte 2), en su atril sobre la mesa
  tabletMesa = crearTablet(pantTabT, 0.42, 0.28, 0.35); tabletMesa.position.set(MESA.x + 0.18, MESA.y, MESA.z + 0.05); tabletMesa.rotation.y = 0.12; DEP.add(tabletMesa);
  sombras(g); sombras(calc);
}
// ---- el pizarrón blanco con marco de aluminio: "DÓLAR:" y el número a marcador; "julio" chiquito abajo ----
pizT = lienzo(1100, 740, () => {});
{
  const g = new THREE.Group(); g.position.set(PIZ.x, PIZ.y, PZ + 0.03); DEP.add(g);
  g.add(caja(PIZ.W + 0.06, PIZ.H + 0.06, 0.03, M.alu, 0, 0, 0, 0.01));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(PIZ.W, PIZ.H), new THREE.MeshStandardMaterial({ map: pizT, roughness: 0.35 })); p.position.z = 0.017; g.add(p);
  g.add(caja(PIZ.W * 0.6, 0.03, 0.06, M.alu, 0, -PIZ.H / 2 - 0.04, 0.03, 0.008));   // la bandejita
  g.add(mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.12, 8).rotateZ(Math.PI / 2), M.red, 0.28, -PIZ.H / 2 - 0.02, 0.05));   // un marcador rojo en la bandeja
  sombras(g);
}
// el marcador navy en la mano de Paola (P5)
const marcador = new THREE.Group(); scene.add(marcador);
{
  // (r3) el marcador real: cuerpo navy, tapa crema atrás, la punta adelante (z +); su origen es la PUNTA
  const ej = new THREE.Group(); ej.rotation.x = Math.PI / 2; marcador.add(ej);
  ej.add(mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.13, 12), M.navy, 0, -0.085, 0));
  ej.add(mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.045, 12), M.cr, 0, -0.165, 0));
  ej.add(mesh(new THREE.ConeGeometry(0.011, 0.022, 10), M.navy, 0, -0.011, 0).rotateX(Math.PI));
  sombras(marcador);
}
// el estado del pizarrón: borrado (0..1) del 40, escrito (0..1) del 43; parte 2: el despacho del día
let clavePiz = "";
function dibujarPiz(t) {
  const parte2 = t >= P2;
  const b = parte2 ? 0 : Math.round(eio(sg(t, T.borra, T.escribe - 0.05)) * 10) / 10;
  const e = parte2 ? 0 : Math.round(sg(t, T.escribe, T.escribeFin) * 20) / 20;
  const clave = `${parte2 ? "p2" : "p1"}|${b}|${e}`; if (clave === clavePiz) return; clavePiz = clave;
  const { x } = pizT.userData, w = 1100, h = 740;
  x.fillStyle = "#fbfbf8"; x.fillRect(0, 0, w, h);
  x.fillStyle = "rgba(150,160,170,0.1)"; x.fillRect(40, 40, w - 80, 20);
  x.textBaseline = "alphabetic"; x.textAlign = "left";
  if (parte2) {
    x.fillStyle = "#16243d"; x.font = CAV(120); x.fillText("Lunes:", 70, 210);
    x.font = CAV(110); x.fillText("despachar", 70, 370); x.fillText("Bazar Graciela", 70, 520);
    x.strokeStyle = "#16243d"; x.lineWidth = 10; x.lineCap = "round"; x.beginPath(); x.moveTo(70, 560); x.lineTo(800, 560); x.stroke();
  } else {
    x.fillStyle = "#16243d"; x.font = F(900, 140); x.fillText("DÓLAR:", 100, 300);
    // el 40: se borra de izquierda a derecha (queda una mancha gris); el 43 aparece trazo por trazo
    if (b < 1) { x.save(); x.beginPath(); x.rect(60 + 700 * b, 330, w, 360); x.clip(); x.fillStyle = "#16243d"; x.font = F(900, 300); x.fillText("40", 300, 640); x.restore(); }
    if (b > 0) { x.save(); x.beginPath(); x.rect(250, 330, 700 * b, 360); x.clip(); x.fillStyle = "rgba(120,130,145,0.2)"; for (let i = 0; i < 6; i++) { x.beginPath(); x.ellipse(430 + i * 50, 520 + (i % 2) * 30, 160, 70, 0.2, 0, 7); x.fill(); } x.restore(); }
    if (e > 0) {
      x.save(); x.beginPath(); x.rect(250, 330, 80 + 560 * e, 360); x.clip();
      x.fillStyle = "#c7655b"; x.font = F(900, 300); x.fillText("43", 300, 640); x.restore();
    }
    if (b < 0.6) { x.fillStyle = "rgba(22,36,61,0.75)"; x.font = CAV(80); x.fillText("julio", 860, 680); }   // (r1) "julio" se va con el 40
    if (e > 0.6) { x.fillStyle = "rgba(199,101,91,0.95)"; x.font = CAV(96); x.fillText("hoy", 870, 680); }
  }
  pizT.needsUpdate = true;
}
// ---- la columna de hormigón con la lista de JULIO pegada con dos tiras de cinta ----
listaT = lienzo(620, 860, () => {});
const tabColT = pantColT;
{
  const g = new THREE.Group(); g.position.set(COL.x, 0, COL.z); DEP.add(g);
  const tx = hormigon("#b8b5ab", 41); tx.repeat.set(0.5, 2); tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
  g.add(mesh(new THREE.BoxGeometry(COL.w, ALTO, COL.w), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.9 }), 0, ALTO / 2, 0));
  lista = new THREE.Group(); lista.position.set(0, 1.5, COL.w / 2 + 0.004); g.add(lista);
  const hojaL = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.416), new THREE.MeshStandardMaterial({ map: listaT, roughness: 0.85 })); hojaL.rotation.z = -0.03; lista.add(hojaL);
  const cintaM = new THREE.MeshStandardMaterial({ color: 0xd8b98a, roughness: 0.4, transparent: true, opacity: 0.85 });
  for (const s of [-1, 1]) { const c = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.032), cintaM); c.position.set(s * 0.15, 0.212, 0.002); c.rotation.z = s * 0.78; lista.add(c); }   // (r1) en las esquinas: no tapan el título
  tabletCol = crearTablet(tabColT, 0.3, 0.2, 0.0); tabletCol.rotation.x = Math.PI / 2 - 0.0; tabletCol.position.set(0, 1.4, COL.w / 2 + 0.012); g.add(tabletCol);
  tabletCol.rotation.set(0, 0, 0); tabletCol.userData.pivote.rotation.x = 0;
  sombras(g);
}
let claveLista = "";
function dibujarLista(t) {
  const res = t >= T.resalta ? 1 : 0;
  const clave = `${res}`; if (clave === claveLista) return; claveLista = clave;
  const { x } = listaT.userData, w = 620, h = 860;
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, w, h);
  x.textBaseline = "middle"; x.textAlign = "center";
  x.fillStyle = "#16243d"; ajustar(x, "LISTA DE PRECIOS", 900, 60, w - 170); x.fillText("LISTA DE PRECIOS", w / 2, 96);
  x.fillStyle = "#c7655b"; x.font = F(900, 96); x.fillText("JULIO", w / 2, 190);
  x.fillStyle = "#16243d"; x.fillRect(40, 254, w - 80, 8);
  const FIL = [["Ventilador", "de pie 16\"", "$ 1.950"], ["Ventilador", "de techo", "$ 3.900"], ["Caloventor", "", "$ 1.290"]];
  FIL.forEach(([a, b, p], i) => {
    const y = 300 + i * 175;
    if (i === 0 && res) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(24, y - 8, w - 48, 160, 18); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.stroke(); }
    x.textAlign = "left"; x.fillStyle = "#0b1220"; x.font = F(800, 48); x.fillText(a, 46, y + 42); if (b) x.fillText(b, 46, y + 104);
    x.textAlign = "right"; x.font = F(900, 60); x.fillText(p, w - 44, y + 72);
  });
  listaT.needsUpdate = true;
}
// ---- el ventilador de pie de muestra: base redonda navy, caño crema, motor navy, jaula de alambre gruesa, aspas crema ----
{
  fanG = new THREE.Group(); fanG.position.set(FAN.x, 0, FAN.z); fanG.rotation.y = 0.35; DEP.add(fanG);
  fanG.add(mesh(new THREE.CylinderGeometry(0.2, 0.23, 0.05, 28), M.navy, 0, 0.025, 0));
  fanG.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.15, 10), M.cr, 0, 0.6, 0));
  fanG.add(mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.25, 10), M.cr2, 0, 1.12, 0));
  fanCab = new THREE.Group(); fanCab.position.set(0, 1.27, 0); fanG.add(fanCab);
  fanCab.add(mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.16, 18).rotateX(Math.PI / 2), M.navy, 0, 0, -0.06));
  fanCab.add(mesh(new THREE.SphereGeometry(0.045, 12, 8), M.navy, 0, 0, -0.14));
  const jaulaM = mat(0xdcdcd4, 0.35, { metalness: 0.3 });
  const R = 0.24, J = new THREE.Group(); J.position.z = 0.05; fanCab.add(J);
  for (const [r, z] of [[R, 0], [R * 0.66, 0.045], [R * 0.33, 0.06], [R, -0.08], [R * 0.6, -0.11]]) J.add(mesh(new THREE.TorusGeometry(r, 0.007, 6, 40), jaulaM, 0, 0, z));
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; for (const zs of [1, -1]) { const v = mesh(new THREE.CylinderGeometry(0.006, 0.006, R, 5), jaulaM, Math.cos(a) * R / 2, Math.sin(a) * R / 2, zs > 0 ? 0.04 : -0.09); v.rotation.z = a - Math.PI / 2; v.rotation.x = zs > 0 ? 0.35 * Math.sin(1) : -0.3; J.add(v); } }
  J.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.012, 16).rotateX(Math.PI / 2), M.navy3, 0, 0, 0.066));   // el logo liso del frente (sin marca)
  fanAspas = new THREE.Group(); fanAspas.position.z = -0.02; fanCab.add(fanAspas);
  fanAspas.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.04, 14).rotateX(Math.PI / 2), M.cr2, 0, 0, 0));
  fanAspas.userData.disco = new THREE.Mesh(new THREE.CircleGeometry(0.22, 40), new THREE.MeshBasicMaterial({ color: 0x2c4268, transparent: true, opacity: 0.45, depthWrite: false }));
  fanAspas.userData.disco.position.z = 0.012; fanAspas.add(fanAspas.userData.disco);
  for (let i = 0; i < 3; i++) { const a = new THREE.Group(); a.rotation.z = (i / 3) * Math.PI * 2; fanAspas.add(a); const p = mesh(new THREE.SphereGeometry(1, 14, 8), mat(0x2c4268, 0.45), 0.12, 0, 0); p.scale.set(0.1, 0.055, 0.008); p.rotation.y = 0.35; a.add(p); }
  sombras(fanG);
}
// el ángulo de las aspas: gira a vel W; en P6 se frena en 1,2 s (sin saltos) y queda quieto hasta el cartel
const FAN_W = 11;
function velFan(t) { if (t >= P2 || t < T.frena) return 1; return 1 - cl((t - T.frena) / 1.2); }
function anguloFan(t) {
  if (t >= P2) return FAN_W * t;
  if (t < T.frena) return FAN_W * t;
  const D = 1.2, x = cl((t - T.frena) / D);
  return FAN_W * (T.frena + D * (x - (x * x) / 2));
}

// ---------- luces: mañana de verano, pareja; el sol entra desde el patio ----------
const cielo = new THREE.HemisphereLight(0xfaf8f0, 0x6a665c, 2.0); scene.add(cielo);
const sol = new THREE.DirectionalLight(0xfff3df, 1.65); sol.position.set(4.5, 7.5, 1.5); sol.target.position.set(0.8, 0.5, -3.0);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.radius = 4; Object.assign(sol.shadow.camera, { left: -7, right: 7, top: 8, bottom: -8, near: 0.5, far: 25 }); sol.shadow.bias = -0.0006; scene.add(sol, sol.target);
const relleno = new THREE.DirectionalLight(0xe8eefa, 0.6); relleno.position.set(-3, 2.5, 5); relleno.target.position.set(0, 1, -1); scene.add(relleno, relleno.target);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const paola = crearPersonaje({ ...ELENCO.paola, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const mica = crearPersonaje({ ...ELENCO.mica, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const seba = crearPersonaje({ ...ELENCO.seba, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
// el cúter navy colgado del bolsillo del chaleco de Mica (sin hoja)
{ const c = caja(0.022, 0.1, 0.012, M.navy, -0.13, 0.2, 0.17, 0.005); c.rotation.z = 0.15; mica.cuerpo.add(c); }
// Seba: los rulitos chicos arriba (sobre el texturado) y la riñonera navy cruzada
{
  const pm = mat(ELENCO.seba.pelo, 0.85), rulo = new THREE.IcosahedronGeometry(1, 1);
  semilla = 17;
  const cab = seba.cabeza;
  for (let i = 0; i < 20; i++) {
    const a = (az() - 0.5) * 1.4, e = 0.05 + az() * 0.26;
    const R0 = 0.278, y0 = 0.27;
    const m = mesh(rulo, pm, Math.sin(a) * Math.sin(e) * R0, y0 + Math.cos(e) * R0 + 0.035, Math.cos(a) * Math.sin(e) * R0 * 0.95 - 0.02);
    m.scale.setScalar(0.034 + az() * 0.008); cab.add(m);
  }
  const ri = new THREE.Group(); seba.cuerpo.add(ri);
  ri.add(caja(0.22, 0.11, 0.08, M.navy, -0.1, 0.2, 0.2, 0.035)); ri.add(caja(0.16, 0.012, 0.01, M.cr3, -0.1, 0.235, 0.242, 0.003));
  const corr = mesh(new THREE.TorusGeometry(0.3, 0.016, 6, 30, Math.PI * 0.62), M.navy, 0.02, 0.42, 0.0); corr.rotation.set(0, 0, -2.0); corr.scale.set(1, 1.15, 0.78); ri.add(corr);
  sombras(ri);
}
// la mano abierta (P7b/Q7: "pará" sin darse vuelta; el cierre): cuatro dedos estirados y el pulgar abierto; esconde los
// nudillos del puño
function crearManoAbierta(per, lado) {
  const b = per.brazos[lado], g = new THREE.Group(); b.mano.add(g);
  const pm = mat(per.cfg.piel, 0.55), sgn = lado === 0 ? -1 : 1;
  for (let i = 0; i < 4; i++) { const x = -0.039 + i * 0.026, L = i === 0 || i === 3 ? 0.075 : 0.09; const d = mesh(new THREE.CapsuleGeometry(0.0125, L, 4, 8), pm, x, -0.1 - L / 2, 0.006); d.rotation.z = (i - 1.5) * 0.08; g.add(d); }
  const pu = mesh(new THREE.CapsuleGeometry(0.013, 0.05, 4, 8), pm, sgn * 0.06, -0.06, 0.012); pu.rotation.z = sgn * -0.9; g.add(pu);
  const nud = b.mano.children.slice(-5, -1); g.visible = false;
  return (on) => { g.visible = on; for (const n of nud) n.visible = !on; };
}
const manoAbierta = crearManoAbierta(paola, 1), manoAbiertaI = crearManoAbierta(paola, 0);
const TODOS = [paola, mica, seba];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// los celulares: el de Seba (funda verde de marca) y la proforma de Mica (hoja A4 en un sobre navy)
const pantS = lienzo(600, 1215, () => {});
const celS = crearCelular(pantS, MARCA.navy3, 0.085, 0.172); scene.add(celS);
const manoCel = new THREE.Group(); celS.add(manoCel);
{ const pm = mat(ELENCO.seba.piel, 0.55);
  for (let i = 0; i < 3; i++) { const d = mesh(new THREE.CapsuleGeometry(0.0075, 0.012, 4, 8), pm, -0.052, -0.04 - i * 0.017, 0.002); d.rotation.z = Math.PI / 2; manoCel.add(d); }
  const pu = mesh(new THREE.CapsuleGeometry(0.008, 0.02, 4, 8), pm, 0.05, -0.06, 0.004); pu.rotation.z = -0.5; manoCel.add(pu);
  manoCel.add(mesh(rbox(0.07, 0.07, 0.025, 0.012), pm, 0.0, -0.075, -0.016));
  const ante = mesh(new THREE.CapsuleGeometry(0.019, 0.14, 4, 10), pm, 0.012, -0.17, -0.02); ante.rotation.z = -0.15; manoCel.add(ante);
  manoCel.visible = false; }
const proformaT = lienzo(620, 860, () => {});
const proforma = new THREE.Group(); scene.add(proforma);
{ const h = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.416, 6, 1), new THREE.MeshStandardMaterial({ map: proformaT, roughness: 0.85, side: THREE.DoubleSide })); const pos = h.geometry.attributes.position; for (let i = 0; i < pos.count; i++) pos.setZ(i, -0.012 * Math.cos((pos.getX(i) / 0.15) * Math.PI / 2)); h.geometry.computeVertexNormals(); proforma.add(h); proforma.userData.hoja = h; sombras(proforma); }

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
  AVATAR.graciela = leer(crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.seba = leer(seba, 0xb9cde0);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const inicial = (x, letra, cx, cy, r, fondo = "#16243d", tinta = "#efeee5") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.fillStyle = tinta; x.font = F(900, r * 1.1); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(letra, cx, cy + r * 0.06); x.textAlign = "left"; };

// ================= PANTALLAS =================
const cabCel = (x, w, t1, t2, cv = null) => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 160); x.fillStyle = "#5ce611"; x.fillRect(0, 160, w, 8);
  const x0 = cv ? 150 : 34; if (cv) avatar(x, cv, 76, 80, 52);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, t1, 800, 54, w - x0 - 30); x.fillText(t1, x0, 58); if (t2) { x.fillStyle = "#5ce611"; ajustar(x, t2, 700, 40, w - x0 - 30); x.fillText(t2, x0, 118); }
};
// el ícono plano del ventilador (catálogo y pedido)
function iconoVent(x, cx, cy, s) {
  x.fillStyle = "#e3e9e4"; x.beginPath(); x.roundRect(cx - s * 0.62, cy - s * 0.6, s * 1.24, s * 1.24, s * 0.16); x.fill();
  x.strokeStyle = "#16243d"; x.lineWidth = s * 0.06; x.lineCap = "round";
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(cx, cy - s * 0.17, s * 0.3, 0, 7); x.fill(); x.stroke();
  x.fillStyle = "#c9c4b0"; for (let i = 0; i < 3; i++) { const a = i * 2.09 + 0.4; x.beginPath(); x.ellipse(cx + Math.cos(a) * s * 0.13, cy - s * 0.17 + Math.sin(a) * s * 0.13, s * 0.13, s * 0.06, a, 0, 7); x.fill(); }
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(cx, cy - s * 0.17, s * 0.05, 0, 7); x.fill();
  x.beginPath(); x.moveTo(cx, cy + s * 0.13); x.lineTo(cx, cy + s * 0.4); x.stroke();
  x.fillStyle = "#16243d"; x.beginPath(); x.ellipse(cx, cy + s * 0.43, s * 0.2, s * 0.05, 0, 0, 7); x.fill();
}
// ---- el celular de Seba: el chat de pedidos (P1, P7a, Q1, Q6) · el catálogo con el precio de hoy (Q3) · el pedido con el
// descuento (Q6b) ----
let claveS = "";
function dibujarCelS(t, pa) {
  const w = 600, h = 1215;
  const { x } = pantS.userData;
  let modo = "chat";
  if (pa === "Q3") modo = "cat";
  if (pa === "Q6b" || (pa === "Q6" && t >= T.toca10)) modo = "desc";
  const graciela = (t >= T.noti && t < P2) || (t >= T.noti2) ? 1 : 0;
  const precio = modo === "cat" ? 2530 : 0;
  const hoy = t >= T.hoy ? 1 : 0;
  const desc = t < T.baja5 ? 10 : 5;
  const dk = modo === "desc" ? (t >= T.ok5 ? 2 : t >= T.baja5 ? 1 : t >= T.rojo ? 0 : -1) : -1;
  const clave = `${modo}|${graciela}|${precio}|${hoy}|${desc}|${dk}`; if (clave === claveS) return; claveS = clave;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "chat") {
    x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, w, h);
    cabCel(x, w, "Pedidos · Seba", "Casa Pao · Mayorista");
    const M2 = [["Bazar Graciela", "Confirmado ✓"], ["Ferretería Sur", "Confirmado ✓"], ["Casa Lilián", "Confirmado ✓"]];
    let y = 200;
    M2.forEach(([n, m]) => {
      x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, y, w - 48, 150, 28); x.fill();
      inicial(x, n[0], 80, y + 75, 42, "#1f3254");
      x.fillStyle = "#0b1220"; ajustar(x, n, 800, 44, w - 190); x.fillText(n, 140, y + 50);
      x.fillStyle = "#3fa60a"; x.font = F(900, 46); x.fillText(m, 140, y + 108);
      y += 168;
    });
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, y + 6, w - 48, 120, 28); x.fill();
    x.fillStyle = t >= P2 ? "#5ce611" : "#efeee5"; x.textAlign = "center"; x.font = F(900, 64); x.fillText(t >= P2 ? "500 / 500 ✓" : "500 / 500", w / 2, y + 68); x.textAlign = "left";
    if (graciela) {
      // la notificación de Graciela a pantalla llena (se lee aunque el celular quede chico en el plano)
      x.fillStyle = "#16243d"; x.fillRect(0, 168, w, h);
      x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(16, 200, w - 32, 980, 40); x.fill(); x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.stroke();
      avatar(x, AVATAR.graciela, w / 2, 300, 84);
      x.fillStyle = "#1f3254"; x.textAlign = "center"; ajustar(x, "Bazar Graciela", 900, 60, w - 80); x.fillText("Bazar Graciela", w / 2, 440);
      x.fillStyle = "#0b1220"; ajustar(x, "¡Mandame", 900, 128, w - 70); x.fillText("¡Mandame", w / 2, 580); ajustar(x, "200 más!", 900, 128, w - 70); x.fillText("200 más!", w / 2, 720);
      x.textAlign = "left";
    }
  } else if (modo === "cat") {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    cabCel(x, w, "Casa Pao · Mayorista", "Catálogo");
    x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, 196, w - 48, 940, 34); x.fill();
    iconoVent(x, w / 2, 420, 300);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Ventilador de pie 16\"", 900, 54, w - 90); x.fillText("Ventilador de pie 16\"", w / 2, 664);
    x.font = F(900, 150); x.fillText(pesos(precio), w / 2, 810);
    if (hoy) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(60, 900, w - 120, 120, 60); x.fill(); x.fillStyle = "#0b1220"; ajustar(x, "Precio de hoy ✓", 900, 64, w - 170); x.fillText("Precio de hoy ✓", w / 2, 962); }
    x.fillStyle = "#1f3254"; 
    x.textAlign = "left";
  } else {
    // el pedido de Bazar Graciela con el control de descuento
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    cabCel(x, w, "Pedido · Bazar Graciela", null);
    x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, 196, w - 48, 200, 30); x.fill();
    iconoVent(x, 120, 296, 130);
    x.fillStyle = "#0b1220"; x.font = F(900, 60); x.fillText("200 ×", 210, 262); ajustar(x, "Ventilador de pie 16\"", 800, 46, w - 240); x.fillText("Ventilador de pie 16\"", 210, 330);
    // el control: − 10 % → − 5 %
    x.fillStyle = "#0b1220"; x.font = F(800, 50); x.fillText("Descuento", 40, 470);
    const opc = [["−5 %", 5], ["−10 %", 10]];
    opc.forEach(([l, v], i) => {
      const bx = 40 + i * 270, sel = desc === v && dk >= 0 || (dk < 0 && v === 10 && t >= T.toca10);
      x.fillStyle = sel ? (v === 10 ? "#c7655b" : "#5ce611") : "#ffffff"; x.beginPath(); x.roundRect(bx, 510, 250, 120, 60); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.stroke();
      x.fillStyle = sel && v === 10 ? "#efeee5" : "#0b1220"; x.textAlign = "center"; x.font = F(900, 66); x.fillText(l, bx + 125, 572); x.textAlign = "left";
    });
    const pr = desc === 10 ? 2277 : 2404;
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 150); x.fillText(pesos(pr), w / 2, 760); x.textAlign = "left";
    if (dk >= 0 && desc === 10) {
      x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(24, 850, w - 48, 250, 34); x.fill();
      x.fillStyle = "#efeee5"; x.textAlign = "center"; ajustar(x, "margen mínimo", 900, 72, w - 90); x.fillText("Debajo del", w / 2, 930); x.fillText("margen mínimo", w / 2, 1020); x.textAlign = "left";
    } else if (dk === 2 || (dk === 1 && desc === 5)) {
      x.fillStyle = dk === 2 ? "#5ce611" : "#d9d7c9"; x.beginPath(); x.roundRect(24, 850, w - 48, 250, 34); x.fill();
      x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Margen OK ✓", 900, 80, w - 90); x.fillText("Margen OK ✓", w / 2, 930); ajustar(x, "Listo para enviar", 800, 54, w - 90); x.fillText("Listo para enviar", w / 2, 1025); x.textAlign = "left";
    }
  }
  pantS.needsUpdate = true;
}
// ---- la calculadora: "23.000 × 43 =" → "989.000" ----
let claveCalc = "";
function dibujarCalc(t) {
  const n = T.teclas.filter((a) => t >= a).length, ig = t >= T.igualC ? 1 : 0;
  const clave = `${t >= T.calc - 0.3 && t < P1 ? 1 : 0}|${n}|${ig}`; if (clave === claveCalc) return; claveCalc = clave;
  const { x } = pantCalcT.userData, w = 640, h = 200;
  x.fillStyle = "#c9d6b8"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.textAlign = "right"; x.textBaseline = "middle";
  const txt = t < T.calc - 0.3 || t >= P1 ? "0" : ig ? "989.000" : ["0", "23.000", "23.000 ×", "23.000 × 4", "23.000 × 43", "23.000 × 43 ="][n];
  ajustar(x, txt, 800, 150, w - 50); x.fillText(txt, w - 26, h / 2 + 6);
  pantCalcT.needsUpdate = true;
}
// ---- la proforma ----
let claveProf = "";
function dibujarProforma(t) {
  const m = (t >= T.usd && t < P1) || t >= T.mi1b + LEN.mi1 - 0.25 ? 1 : 0;
  const clave = `${m}`; if (clave === claveProf) return; claveProf = clave;
  const { x } = proformaT.userData, w = 620, h = 860;
  // (r1) "FACTURA PROFORMA", "Costo puesto", "antes USD 38" tachado, el total a la vista (las manos van a los costados)
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "FACTURA PROFORMA", 900, 66, w - 50); x.fillText("FACTURA PROFORMA", w / 2, 78);
  x.fillStyle = "#1f3254"; ajustar(x, "Contenedor nuevo", 800, 48, w - 60); x.fillText("Contenedor nuevo", w / 2, 196);
  x.fillStyle = "#0b1220"; ajustar(x, "500 × Ventilador de pie 16\"", 800, 44, w - 60); x.fillText("500 × Ventilador de pie 16\"", w / 2, 262);
  x.fillStyle = "#1f3254"; x.font = F(800, 50); x.fillText("Precio c/u", w / 2, 336);
  if (m) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(40, 372, w - 80, 132, 22); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.stroke(); }
  x.fillStyle = "#0b1220"; x.font = F(900, 112); x.fillText("USD 46", w / 2, 442);
  x.fillStyle = "#c7655b"; x.font = F(800, 54); x.fillText("antes USD 38", w / 2, 566);
  const aw = x.measureText("antes USD 38").width; x.strokeStyle = "#c7655b"; x.lineWidth = 9; x.beginPath(); x.moveTo(w / 2 - aw / 2 - 8, 568); x.lineTo(w / 2 + aw / 2 + 8, 560); x.stroke();
  x.fillStyle = "#16243d"; x.fillRect(40, 636, w - 80, 6);
  x.fillStyle = "#0b1220"; ajustar(x, "Total USD 23.000", 900, 66, w - 70); x.fillText("Total USD 23.000", w / 2, 712); x.textAlign = "left";
  proformaT.needsUpdate = true;
}
// ---- la tablet de Paola (parte 2): el panel de precios que recalcula solo ----
let claveTab = "";
function dibujarTab(t) {
  const ok = t >= T.cargada ? 1 : 0, f = T.filas.filter((a) => t >= a).length, banda = t >= T.banda ? 1 : 0;
  const clave = `${ok}|${f}|${banda}`; if (clave === claveTab) return; claveTab = clave;
  const { x } = pantTabT.userData, w = 1280, h = 860;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, w, 10);
  x.fillStyle = "#efeee5"; x.font = F(900, 76); x.fillText("Precios · Casa Pao", 40, 68);
  // (pasada 1) poco texto y grande: la fila del ventilador (costo de la proforma, dólar, margen) y el precio de hoy
  x.fillStyle = "#0b1220"; ajustar(x, "Ventilador de pie 16\"", 900, 78, w - 80); x.fillText("Ventilador de pie 16\"", 40, 196);
  const celda = (bx, by, bw, l, v, verde) => { x.fillStyle = verde ? "#5ce611" : "#ffffff"; x.beginPath(); x.roundRect(bx, by, bw, 190, 28); x.fill(); x.fillStyle = "#1f3254"; x.font = F(800, 62); x.fillText(l, bx + 26, by + 50); x.fillStyle = "#0b1220"; ajustar(x, v, 900, 92, bw - 40); x.fillText(v, bx + 26, by + 132); };
  celda(24, 250, 500, "Costo", ok ? "USD 46 ✓" : "USD 46", ok);
  celda(544, 250, 340, "Dólar", "43", false);
  celda(904, 250, 352, "Margen", "28 %", false);
  x.fillStyle = f >= 1 ? "#5ce611" : "#ffffff"; x.beginPath(); x.roundRect(24, 462, w - 48, 200, 28); x.fill();
  x.fillStyle = "#1f3254"; x.font = F(800, 64); x.fillText("Precio de hoy", 52, 516);
  x.fillStyle = "#0b1220"; x.textAlign = "right"; x.font = F(900, 120); x.fillText(f >= 1 ? "$ 2.530 ✓" : "$ 2.530", w - 52, 590); x.textAlign = "left";
  const otros = f >= 3 ? "Techo $ 5.060 ✓ · Caloventor $ 1.670 ✓" : f >= 2 ? "Techo $ 5.060 ✓ · Caloventor $ 1.670" : "Techo $ 5.060 · Caloventor $ 1.670";
  x.fillStyle = "#0b1220"; ajustar(x, otros, 800, 64, w - 60); x.fillText(otros, 30, 716);
  if (banda) { x.fillStyle = "#5ce611"; x.fillRect(0, h - 104, w, 104); x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Recalculado solo · 38 productos", 900, 80, w - 50); x.fillText("Recalculado solo · 38 productos", w / 2, h - 50); x.textAlign = "left"; }
  pantTabT.needsUpdate = true;
}
// la tablet de la columna (parte 2): el catálogo con el precio de hoy
{
  const { x } = pantColT.userData, w = 1280, h = 860;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.font = F(900, 84); x.fillText("Lista de hoy", 40, 78);
  [["Ventilador de pie 16\"", "$ 2.530"], ["Ventilador de techo", "$ 5.060"], ["Caloventor", "$ 1.670"]].forEach(([n, p], i) => { const y = 190 + i * 210; x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(30, y, w - 60, 180, 26); x.fill(); x.fillStyle = "#0b1220"; x.font = F(800, 66); x.fillText(n, 70, y + 92); x.textAlign = "right"; x.font = F(900, 80); x.fillText(p, w - 70, y + 92); x.textAlign = "left"; });
  pantColT.needsUpdate = true;
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
// el rótulo: caja navy, texto crema (o verde / rojo apagado), borde crema
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
  // zona segura: toda tarjeta entre y 200 (borde de arriba, r3) e y 1650 (borde de abajo, r1)
  cy = cl(cy, H / 2 + 200, 1650 - H / 2);
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
// REGLA DE BURBUJAS: la burbuja va arriba del que habla y la cola apunta a su BOCA (corta, no llega a la cara). Si no
// entra (o el que habla queda cortado), se anota en AVISOS (prev.mjs lo imprime).
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
// las líneas con remate se parten en dos tiempos: la burbuja "a" (de su tamaño) muestra la primera mitad y la completa
// aparece recién cuando suena la segunda (CORTE de gen.mjs: el silencio interno de la toma), con un pop
function globo2(lineas, px, vacias) { const g = crearGlobo(lineas, px); const a = crearGlobo(lineas.filter((l, i) => !vacias.includes(i)), px); return [a, g]; }

// ================= GLOBOS Y RÓTULOS =================
const [s2a, s2g] = globo2(["A lista.", "[Mil novecientos", "[cincuenta.]"].map((l, i) => (i === 1 ? "Mil novecientos" : l)), 74, [1, 2]);
const [pa2a, pa2g] = globo2(["Vendimos todo.", "{Y perdimos plata.}"], 78, [1]);
const [pa3a, pa3g] = globo2(["Seba. Por favor.", "{Dejá de vender.}"], 76, [1]);
const pa3x = crearGlobo(["Seba."], 76);
const [pa5a, pa5g] = globo2(["Vendimos todo.", "[Y ganamos plata.]"], 78, [1]);
const [s5a, s5g] = globo2(["¡Graciela quiere", "doscientos más!", "¿Le hago [un diez?]"], 66, [2]);
const [s4a, s4g] = globo2(["Al de hoy.", "[Dos mil quinientos treinta.]"], 52, [1]);
const [pa6a, pa6g] = globo2(["Vendé, Seba.", "[Vendé.]"], 84, [1]);
const GL = {
  s1: crearGlobo(["¡Pao! ¡Vendimos", "todo [el contenedor!]"], 66), s1b: crearGlobo(["¡Pao! ¡Vendimos", "todo [el contenedor!]"], 66),
  pa1: crearGlobo(["¡Vamos!", "¿A [cuánto?]"], 82), pa1b: crearGlobo(["¡Vamos!", "¿A [cuánto?]"], 82),
  s2: s2g, s2a,
  mi1: crearGlobo(["Pao, llegó la factura", "del [contenedor nuevo.]"], 60), mi1b: crearGlobo(["Pao, llegó la factura", "del [contenedor nuevo.]"], 60),
  pa2: pa2g, pa2a,
  s3: crearGlobo(["¡Pao! ¡Graciela", "quiere [doscientos más!]"], 64),
  pa3: pa3g, pa3a, pa3x,
  s4: s4g, s4a, pa1q: crearGlobo(["¿A [cuánto?]"], 74),
  pa4: crearGlobo(["Ya está [cargada.]"], 78),
  pa5: pa5g, pa5a,
  s5: s5g, s5a,
  s6: crearGlobo(["…Le hago [un cinco.]"], 74),
  pa6: pa6g, pa6a,
};
const ROT_ = {
  cobramos: crearRotulo([["$ 975.000 cobrados", "#efeee5", 64], ["500 × $ 1.950", null, 48]], 48),
  reponer: crearRotulo([["$ 989.000", "#c7655b", 72], ["para reponer", null, 52]], 52),
  n492: crearRotulo([["492 de 500", "#c7655b", 96]], 96),
  trae: crearRotulo([["Con lo que cobramos,", null, 52], ["traemos 492", "#c7655b", 64]], 52),
  menos: crearRotulo([["− $ 14.000", "#c7655b", 80], ["para reponer", null, 50]], 50),
  q3: crearRotulo([["El vendedor ve el precio de hoy", "#5ce611", 52], ["actualizado con la proforma nueva", null, 42]], 42),
  q4: crearRotulo([["Cambia el dólar o el costo:", null, 46], ["la lista se recalcula sola", "#5ce611", 56]], 46),
  n500: crearRotulo([["500 de 500 ✓", "#5ce611", 96]], 96),
  mas: crearRotulo([["+ $ 276.000", "#5ce611", 80], ["después de reponer", null, 50]], 50),
  q6: crearRotulo([["Avisa si un precio queda", null, 46], ["debajo del margen", "#5ce611", 58]], 46),
};
const GUIAS = [crearGuia(), crearGuia()];

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  if (b === a || b[0] <= a[0]) return a.slice(1, 8);
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
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }
// una cámara de frente a una pantalla (plano local del objeto): llena `llena` del alto del cuadro
function camPantalla(obj, centroLocal, normalLocal, alto, llena, fov, t, extra = 0) {
  obj.updateMatrixWorld(true);
  const c = obj.localToWorld(centroLocal.clone()), n = normalLocal.clone().transformDirection(obj.matrixWorld);
  const d = alto / llena / (2 * Math.tan((fov * D2R) / 2)) + extra;
  const p = c.clone().add(n.multiplyScalar(d));
  ponerCam([p.x, p.y, p.z, c.x, c.y, c.z, fov], t, true);
  camera.up.copy(V3(0, 1, 0).transformDirection(obj.matrixWorld)); camera.lookAt(c);
  return { c, p, d };
}
const CAM_P1 = (k) => [lerp(0.35, 0.37, k), 1.2, lerp(2.4, 2.2, k), 0.4, 1.55, -2.6, 58];
const CAM_P2 = (k) => [lerp(-0.62, -0.64, k), 1.52, lerp(0.72, 0.58, k), -0.6, 1.45, PAO.z, 48];
const CAM_P3 = (k) => [lerp(2.35, 2.9, k), lerp(1.5, 1.42, k), lerp(1.2, -0.72, k), lerp(2.45, 2.9, k), lerp(1.4, 1.42, k), COL.z, lerp(54, 44, k)];
const CAM_P4 = (k) => [lerp(-1.2, -1.22, k), 1.5, lerp(1.45, 1.3, k), -1.15, 1.3, -1.85, 56];
const CAM_P6 = (k) => [lerp(-0.22, -0.24, k), 1.5, lerp(0.5, 0.32, k), -0.2, 1.42, PAO.z, 46];
const CAM_P7A = (k) => [lerp(1.12, 1.1, k), 1.48, lerp(0.62, 0.42, k), 1.2, 1.38, -2.6, 56];
const CAM_P7B = (k) => [lerp(0.3, 0.32, k), 1.6, lerp(2.25, 2.1, k), 1.05, 1.72, -4.0, 62];
const CAM_C = (k) => [lerp(1.02, 1.0, k), 1.42, lerp(0.66, 0.54, k), 0.97, 1.1, -1.3, 52];
// P5/Q5: el contenedor de frente, a la altura de su centro (llena el ancho)
const CAM_CONT = (k) => [CONT.x, CONT.y + CONT.H / 2 + 0.15, lerp(-0.85, -1.05, k), CONT.x, CONT.y + CONT.H / 2 - 0.05, CONT.z - 1, 52];   // (r2) más lejos: la capa del frente entra entera
const CAM_PIZ = (k) => [PIZ.x + lerp(-0.05, -0.08, k), 1.56, PZ + lerp(2.05, 1.9, k), PIZ.x - 0.17, 1.52, PZ, 58];   // (r2) el pizarrón entero y Paola con el marcador
const CAM_CALC2 = [MESA.x - 0.38, 1.66, -0.78, MESA.x - 0.42, MESA.y + 0.08, MESA.z - 0.04, 50];
const CAM_FAN = (k) => [FAN.x + lerp(0.5, 0.44, k), 1.36, FAN.z + lerp(1.2, 1.08, k), FAN.x, 1.15, FAN.z, 46];
const CAM_CALC = [MESA.x - 0.38, 1.64, -0.8, MESA.x - 0.42, MESA.y + 0.08, MESA.z - 0.04, 50];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, [[T.p2, ...CAM_P2(0)], [T.p3, ...CAM_P2(1)]]],
  ["P3", T.p3, [[T.p3, ...CAM_P3(0)], [T.resalta, ...CAM_P3(0.08)]]],
  ["P3i", T.resalta, [[T.resalta, ...CAM_P3(0.94)], [T.p4, ...CAM_P3(1)]]],
  ["P4", T.p4, null],   // Mica con la proforma
  ["P4i", r2(T.mi1 + LEN.mi1 * 0.45), null],   // (r2) corte al inserto de la proforma (sin empuje por la cara)
  // (r1) cortes secos en vez de paneos que cruzaban la pared lisa: el pizarrón · la calculadora · el contenedor
  ["P5", T.p5, [[T.p5, ...CAM_PIZ(0)], [T.calc, ...CAM_PIZ(1)]]],
  ["P5b", T.calc, [[T.calc, ...CAM_CALC], [T.viaja, ...CAM_CALC2]]],
  ["P5c", T.viaja, [[T.viaja, CONT.x, CONT.y + CONT.H / 2 + 0.22, -0.2, CONT.x, CONT.y + CONT.H / 2, CONT.z - 1, 52], [T.llena - 0.02, ...CAM_CONT(0)], [T.p6f, ...CAM_CONT(1)]]],
  ["P6f", T.p6f, [[T.p6f, ...CAM_FAN(0)], [T.p6, ...CAM_FAN(1)]]],   // (r2) inserto: el ventilador se frena
  ["P6", T.p6, [[T.p6, ...CAM_P6(0)], [T.p7, ...CAM_P6(1)]]],
  ["P7a", T.p7, [[T.p7, ...CAM_P7A(0)], [T.p7b, ...CAM_P7A(1)]]],
  ["P7b", T.p7b, [[T.p7b, ...CAM_P7B(0)], [P1, ...CAM_P7B(1)]]],
  // ---- parte 2 ----
  ["Q1", T.q1, [[T.q1, ...CAM_P1(0)], [T.q3, ...CAM_P1(1)]]],
  ["Q3", T.q3, null],    // el celular de Seba a pantalla llena
  ["Q4", T.q4, null],    // = P4
  ["Q4b", T.q4b, null],  // la tablet de Paola
  ["Q5", T.q5, [[T.q5, ...CAM_CONT(0)], [T.q6, ...CAM_CONT(1)]]],
  ["Q6", T.q6, [[T.q6, ...CAM_P7A(0)], [T.q6b, ...CAM_P7A(1)]]],
  ["Q6b", T.q6b, null],  // el celular: el margen
  ["Q7", T.q7, [[T.q7, ...CAM_P7B(0)], [T.c, ...CAM_P7B(1)]]],
  ["C", T.c, [[T.c, ...CAM_C(0)], [DUR, ...CAM_C(1)]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.28) console.warn(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); }

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
const SECO = { ojos: { abiertos: 0.72, tension: 0.2, feliz: 0, x: 0, y: 0 }, cejas: { alto: -0.08, ang: 0.15 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.9 } };
// ---------- Paola ----------
const P7B_PAO = { x: -0.05, z: -0.45 };   // P7b/Q7: de 3/4 de espaldas mirando el contenedor
const C_PAO = { x: 0.98, z: -1.2 };      // el cierre: delante del portón
function posePaola(t, pa, cp) {
  const pr = { x: PAO.x, y: 0, z: PAO.z, giro: 0.1, inclina: 0.03, cabeza: { giro: 0, asiente: 0.05, ladea: 0.02 }, ...CARA.sonrisa, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.3 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1.05 }, manoI: [0.24, 0.36, 0.3], manoD: [-0.24, 0.36, 0.3], codoI: [1, -0.5, -0.2], codoD: [-1, -0.5, -0.2], dedoI: 0, dedoD: 0, t };
  const sebaW = seba.raiz.position.clone().add(V3(0, 1.5, 0));
  if (pa === "P1" || pa === "Q1") {
    // empacando en la mesa, levanta la vista cuando entra Seba
    const u = eio(sg(t, (pa === "P1" ? 0 : T.q1) + 0.5, (pa === "P1" ? 0 : T.q1) + 0.9));
    const m = mirar(PAO.x, PAO.z, pr.giro, sebaW, 1.5);
    pr.cabeza = { giro: lerp(0.0, m.cabeza.giro, u), asiente: lerp(0.35, m.cabeza.asiente, u), ladea: 0.03 }; pr.ojos = { x: lerp(0, m.ojos.x, u), y: lerp(-0.6, m.ojos.y, u), abiertos: 1, feliz: 0.25 };
    pr.manoI = [0.2, 0.34, 0.34]; pr.manoD = [-0.18, 0.34, 0.36];
    pr.cejas = { alto: 0.6, ang: 0.3, asim: 0 }; pr.boca = { sonrisa: 0.75, abierta: 0, ancho: 1.1 }; pr.ojos.feliz = 0.45;
    if (pa === "Q1" && t >= T.q3 - 0.4) { pr.cabeza.giro = 0.4; pr.boca = { sonrisa: 0.6, abierta: 0.25, ancho: 1 }; }
  } else if (pa === "P2" || pa === "Q2") {
    // festejo: el puño en alto, sonrisa grande
    const t0 = pa === "P2" ? T.puno : T.puno2;
    const u = eo(sg(t, t0, t0 + 0.22));
    Object.assign(pr, { ...CARA.feliz, ojos: { x: 0.2, y: 0.05, abiertos: 0.95, feliz: 0.55 }, cejas: { alto: 0.55, ang: 0.1 }, boca: { sonrisa: 0.9, abierta: 0, ancho: 1.15 } });
    pr.giro = 0.35; pr.cabeza = { giro: haciaCam(cp, PAO.x, PAO.z, 0.35, 0.5), asiente: -0.06, ladea: 0.06 };
    pr.manoD = lerpV([-0.2, 0.36, 0.34], [-0.42, 0.86, 0.16], u); pr.codoD = [-1, -0.3, 0];
    pr.manoI = [0.2, 0.34, 0.34];
    bocaVoz(pr, t, pa === "P2" ? T.pa1 : T.pa1b, ENV.pa1, 0.65);
  } else if (pa === "P3") {
    Object.assign(pr, { ...CARA.sonrisa }); pr.giro = 0.5;
  } else if (pa === "P4" || pa === "Q4") {
    // mira a Mica que entra por la izquierda
    const micaW = mica.raiz.position.clone().add(V3(0, 1.5, 0));
    pr.giro = -0.05; Object.assign(pr, mirar(PAO.x, PAO.z, -0.05, micaW, 1.5, 0.5));
    if (pa === "P4") { pr.ojos = { ...pr.ojos, abiertos: 1, feliz: 0.2 }; pr.boca = { sonrisa: 0.45, abierta: 0, ancho: 1 }; pr.cejas = { alto: 0.25, ang: 0 }; }
    else { pr.ojos = { ...pr.ojos, abiertos: 0.95, feliz: 0.3 }; pr.boca = { sonrisa: 0.55, abierta: 0, ancho: 1.05 }; }
    if (t >= T.usd && pa === "P4") { pr.cejas = { alto: 0.55, ang: 0.4 }; pr.boca = { sonrisa: -0.05, abierta: 0, ancho: 0.9 }; pr.ojos.feliz = 0; }
  } else if (pa === "P5") {
    // en el pizarrón: de costado, el brazo derecho al número (borra con el canto de la mano, escribe con el marcador)
    pr.x = PIZ.x - 0.44; pr.z = PZ + 0.44; pr.giro = 2.62;
    Object.assign(pr, SECO, { ojos: { x: 0.2, y: 0.2, abiertos: 0.85, tension: 0.1 } });
    pr.cabeza = { giro: 0.25, asiente: -0.05, ladea: 0.02 };
  } else if (pa === "P6") {
    // el remate: plano medio, seca, ojos entrecerrados
    pr.giro = 0.18; Object.assign(pr, SECO);
    pr.cabeza = { giro: haciaCam(cp, PAO.x, PAO.z, 0.18, 0.7), asiente: 0.04, ladea: 0.0 };
    pr.ojos = { x: 0, y: 0, abiertos: 0.62, tension: 0.25 }; pr.cejas = { alto: -0.05, ang: 0.2, asim: 0.35 }; pr.boca = { sonrisa: -0.4, abierta: 0, ancho: 0.85 };
    pr.manoI = [0.18, 0.3, 0.34]; pr.manoD = [-0.18, 0.3, 0.34];
    bocaVoz(pr, t, T.pa2, ENV.pa2, 0.4); pr.boca.sonrisa = -0.4; pr.ojos.abiertos = 0.66;
  } else if (pa === "P7a" || pa === "Q6") {
    pr.giro = 0.6;
  } else if (pa === "P7b" || pa === "Q7") {
    // de 3/4 de espaldas, mirando el contenedor; levanta la mano derecha (hacia Seba) sin darse vuelta
    const p7 = pa === "P7b";
    pr.x = P7B_PAO.x; pr.z = P7B_PAO.z; pr.giro = Math.PI - 0.55;
    const cont = V3(CONT.x, 2.2, CONT.z);
    Object.assign(pr, mirar(pr.x, pr.z, pr.giro, cont, 1.5));
    if (p7) { Object.assign(pr, { ...SECO, ojos: { ...pr.ojos, abiertos: 0.6, tension: 0.3 }, cejas: { alto: -0.05, ang: 0.3 } }); }
    else { Object.assign(pr, { ...CARA.sonrisa, ojos: { ...pr.ojos, abiertos: 0.95, feliz: 0.4 }, cejas: { alto: 0.3, ang: 0 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } }); }
    const u = eo(sg(t, p7 ? T.mano : T.mano2, (p7 ? T.mano : T.mano2) + 0.22));
    pr.manoD = lerpV([-0.27, -0.05, 0.06], [-0.48, 0.72, 0.2], u); pr.codoD = [-1, -0.4, -0.1]; pr.manoI = [0.27, -0.06, 0.05];
    bocaVoz(pr, t, p7 ? T.pa3 : T.pa6, p7 ? ENV.pa3 : ENV.pa6, 0.55);
  } else if (pa === "Q4b") {
    // no levanta la vista de la tablet
    pr.giro = 0.1; Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.2, y: -0.7, abiertos: 0.9, feliz: 0.3 }, cejas: { alto: 0.15, ang: 0 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1.0 } });
    pr.cabeza = { giro: 0.15, asiente: 0.4, ladea: 0.03 };
    bocaVoz(pr, t, T.pa4, ENV.pa4, 0.55);
  } else if (pa === "C") {
    pr.x = C_PAO.x; pr.z = C_PAO.z; pr.giro = 0.05;
    Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 0.95, feliz: 0.3, x: 0, y: 0.05 }, cejas: { alto: 0.5, ang: 0.3, asim: 0 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } });
    pr.cabeza = { giro: haciaCam(cp, pr.x, pr.z, pr.giro, 0.9), asiente: 0.0, ladea: 0.04 };
    pr.manoI = [0.29, -0.08, 0.06]; pr.manoD = [-0.29, -0.08, 0.06];
    bocaVoz(pr, t, T.pa7, ENV.pa7, 0.55);
  }
  return pr;
}
// ---------- Seba ----------
const SEB_A = { x: 1.15, z: -4.6 }, SEB_B = { x: 1.0, z: -1.25 };   // del patio al lado de la columna
function poseSeba(t, pa, cp) {
  const pr = { x: SEB_B.x, y: 0, z: SEB_B.z, giro: -0.4, inclina: 0.04, cabeza: { giro: 0, asiente: 0.0, ladea: 0.03 }, ...CARA.feliz, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.5 }, cejas: { alto: 0.6, ang: 0.1 }, boca: { sonrisa: 0.9, abierta: 0, ancho: 1.15 }, manoI: [0.27, -0.06, 0.05], manoD: [-0.3, 0.8, 0.2], codoI: [1, 0.2, -0.2], codoD: [-1, -0.3, -0.1], dedoI: 0, dedoD: 0, t };
  const paoW = V3(PAO.x, 1.5, PAO.z);
  if (pa === "P1" || pa === "Q1" || pa === "P7a" || pa === "Q6") {
    // entra a paso rápido por el portón con el celular en alto
    const t0 = pa === "P1" ? -0.35 : pa === "Q1" ? T.q1 - 0.35 : pa === "P7a" ? T.p7 - 0.6 : T.q6 - 0.6;
    const t1 = pa === "P1" || pa === "Q1" ? t0 + 2.4 : t0 + 1.7;
    const u = eo(sg(t, t0, t1));
    const A = pa === "P1" || pa === "Q1" ? SEB_A : { x: 1.25, z: -3.6 }, B = pa === "P1" || pa === "Q1" ? SEB_B : { x: 1.3, z: -1.6 };
    pr.x = lerp(A.x, B.x, u); pr.z = lerp(A.z, B.z, u); pr.paso = u < 0.97 ? 1 : 0; pr.pasoVel = 11;
    pr.giro = lerp(Math.atan2(B.x - A.x, B.z - A.z), pa === "P1" || pa === "Q1" ? -0.55 : -0.15, eio(sg(u, 0.2, 0.7)));
    const m = mirar(pr.x, pr.z, pr.giro, paoW, 1.55);
    pr.cabeza = { giro: m.cabeza.giro * 0.7, asiente: -0.05, ladea: 0.04 }; pr.ojos = { ...pr.ojos, x: m.ojos.x };
    if (pa === "P7a" || pa === "Q6") { pr.cabeza = { giro: haciaCam(cp, pr.x, pr.z, pr.giro, 0.6), asiente: -0.05, ladea: 0.05 }; }
    if (pa === "Q6" && t >= T.s5 + CORTE.s5 - 0.1) { Object.assign(pr, { ...CARA.esperanza, ojos: { x: 0, y: -0.6, abiertos: 0.95, feliz: 0.1 }, cejas: { alto: 0.55, ang: 0.55 }, boca: { sonrisa: 0.3, abierta: 0, ancho: 0.95 } }); pr.cabeza = { giro: 0, asiente: 0.12, ladea: 0.04 }; pr.ojos.y = -0.85; }
    const k = pa === "P1" ? T.s1 : pa === "Q1" ? T.s1b : pa === "P7a" ? T.s3 : T.s5;
    bocaVoz(pr, t, k, ENV[pa === "P1" || pa === "Q1" ? "s1" : pa === "P7a" ? "s3" : "s5"], 0.75);
  } else if (pa === "P2" || pa === "Q2") {
    pr.giro = giroA(SEB_B.x, SEB_B.z, PAO.x, PAO.z);
  } else if (pa === "P3") {
    // al lado de la columna, señala la lista con la izquierda, orgulloso
    pr.giro = 0.3; pr.x = 2.15; pr.z = -1.45;
    Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.2, y: 0, abiertos: 1, feliz: 0.4 }, cejas: { alto: 0.45, ang: 0, asim: 0.4 }, boca: { sonrisa: 0.7, abierta: 0, ancho: 1.1 } });
    pr.cabeza = { giro: -0.35, asiente: -0.02, ladea: 0.05 };
    const u = eo(sg(t, T.p3, T.p3 + 0.3));
    pr.manoI = lerpV([0.27, -0.06, 0.05], [0.5, 0.62, 0.32], u); pr.codoI = [1, -0.3, -0.1]; pr.dedoI = u;
    pr.manoD = [-0.18, 0.3, 0.3];
    bocaVoz(pr, t, T.s2, ENV.s2, 0.7);
  } else if (pa === "P7b" || pa === "Q7") {
    // al fondo, al lado de la columna, el celular en la mano, esperando
    pr.x = 1.65; pr.z = -2.3; pr.giro = giroA(1.65, -2.3, P7B_PAO.x, P7B_PAO.z);
    pr.manoD = [-0.1, 0.36, 0.3]; pr.codoD = [-1, -0.6, -0.2];
    if (pa === "P7b") Object.assign(pr, { ...CARA.feliz, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.5 } });
    if (pa === "P7b" && t > T.pa3 + CORTE.pa3) { Object.assign(pr, { ...CARA.sorpresa, ojos: { x: 0, y: 0, abiertos: 1 }, boca: { sonrisa: 0.1, abierta: 0.15, ancho: 0.8 } }); }
    if (pa === "Q7") Object.assign(pr, { ...CARA.feliz, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.6 } });
  } else if (pa === "C") {
    pr.x = 1.75; pr.z = -2.3; pr.giro = -0.3;
  }
  return pr;
}
// ---------- Mica ----------
const MIC_A = { x: -3.9, z: -1.35 }, MIC_B = { x: -1.7, z: -1.6 };
function poseMica(t, pa, cp) {
  const t0 = pa === "P4" ? T.p4 : T.q4;
  const u = eo(sg(t, t0 - 0.5, t0 + 0.35));
  const pr = { x: lerp(MIC_A.x, MIC_B.x, u), y: 0, z: lerp(MIC_A.z, MIC_B.z, u), giro: 0, inclina: 0.03, cabeza: { giro: 0, asiente: 0.04, ladea: 0.02 }, ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 0.95, feliz: 0 }, cejas: { alto: 0.15, ang: 0.15 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.95 }, manoI: [0.12, 0.42, 0.36], manoD: [-0.12, 0.42, 0.36], codoI: [1, -0.6, -0.2], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, paso: u < 0.97 ? 1 : 0, t };
  pr.giro = lerp(Math.atan2(MIC_B.x - MIC_A.x, MIC_B.z - MIC_A.z), 0.35, eio(sg(u, 0.6, 1)));
  const m = mirar(pr.x, pr.z, pr.giro, V3(PAO.x, 1.5, PAO.z), 1.45);
  pr.cabeza = { giro: m.cabeza.giro * 0.5 + haciaCam(cp, pr.x, pr.z, pr.giro, 0.4), asiente: 0.02, ladea: 0.02 }; pr.ojos.x = m.ojos.x * 0.6;
  if (pa === "Q4") { pr.boca = { sonrisa: 0.35, abierta: 0, ancho: 1 }; pr.ojos.feliz = 0.2; }
  bocaVoz(pr, t, pa === "P4" ? T.mi1 : T.mi1b, ENV.mi1, 0.6);
  return pr;
}

// ================= RENDER =================
function celEnMano(cel, per, camPos, local, giro = 0) {
  per.raiz.updateMatrixWorld(true);
  const p = per.cuerpo.localToWorld(local.clone());
  cel.position.copy(p); cel.lookAt(camPos); cel.rotateZ(giro);
  return p;
}
const CAM_PORTADA = [0.3, 1.25, 2.35, 0.24, 0.92, -2.6, 50];
function renderAt(tIn) {
  tIn = Math.min(tIn, DUR - 0.034);   // (r2) el último cuadro sigue siendo el cierre
  AVISOS.length = 0;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = VERM === "portada" ? "P1" : planoActual;
  const tt = VERM === "portada" ? 1.6 : t;
  const camPre = pl[2] ? catmull(pl[2], tt) : null;
  const cp = camPre || CAM_P1(0);
  // ---- objetos de la parte 1 / parte 2 ----
  lista.visible = !parte2; tabletCol.visible = parte2; tabletMesa.visible = parte2 && planoActual !== "Q7";
  dibujarPiz(t); dibujarLista(t); dibujarCalc(t); dibujarProforma(t); if (parte2) dibujarTab(t);
  dibujarCelS(t, pa);
  // el contenedor: vacío (P1-P4, Q1-Q4), se llena a 492 (P5-P7b), a 500 (Q5-C)
  let n = 0, t0 = 0, t1 = 0;
  if (!parte2 && t >= T.llena - 0.01) { n = 492 * eio(sg(t, T.llena, T.llenaFin)); t0 = T.llena; t1 = T.llenaFin; }
  if (parte2 && t >= T.llena2 - 0.01) { n = 500 * eio(sg(t, T.llena2, T.llena2Fin)); t0 = T.llena2; t1 = T.llena2Fin; }
  ponerCajas(n, t, t0, t1);
  huecosG.visible = !parte2 && n >= 476;   // (r2) los huecos se ven mientras se llena la capa del frente
  // el ventilador: gira (oscila un poco); en P6 se frena y la cabeza baja
  fanAspas.rotation.z = -anguloFan(t);
  fanAspas.userData.disco.material.opacity = 0.4 * velFan(t);
  const fr = !parte2 ? eio(sg(t, T.frena + 0.6, T.frena + 1.3)) : 0;
  fanCab.rotation.set(0.05 + 0.22 * fr, 0.25 * Math.sin(t * 0.7) * (1 - (!parte2 && t >= T.frena ? 1 : 0)), 0);
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  celS.visible = false; proforma.visible = false; marcador.visible = false; manoCel.visible = false; cajasCont.visible = true;
  const conPao = !["P3", "Q3", "Q6b", "P7a", "Q6", "P6f", "P4i"].includes(pa) && !(pa === "P5b" || pa === "P5c");
  if (conPao) { paola.raiz.visible = true; paola.poner(posePaola(tt, pa, cp)); }
  manoAbierta(pa === "P7b" || pa === "Q7" || pa === "C"); manoAbiertaI(pa === "C");
  const conSeba = ["P1", "Q1", "P2", "Q2", "P3", "P7a", "Q6", "P7b", "Q7"].includes(pa);
  if (conSeba) { seba.raiz.visible = true; seba.poner(poseSeba(tt, pa, cp)); seba.raiz.updateMatrixWorld(true); }
  if (conPao && (pa === "P1" || pa === "Q1")) paola.poner(posePaola(tt, pa, cp));   // (mira a Seba ya ubicado)
  const conMica = pa === "P4" || pa === "P4i" || pa === "Q4";
  if (conMica) { mica.raiz.visible = true; mica.poner(poseMica(t, pa, cp)); }
  // el celular de Seba en la mano (en alto entrando; en P7a/Q6 grande hacia la cámara)
  const camP = V3(cp[0], cp[1], cp[2]);
  if (seba.raiz.visible) {
    // (r2) el celular va SIEMPRE en la mano: primero la mano (objetivo alcanzable), después el celular arriba de la mano
    celS.visible = true;
    const ps = poseSeba(tt, pa, cp);
    let sc = 1.3, mano = [-0.64, 0.86, 0.04];
    if (pa === "P7a" || pa === "Q6") { const ti = pa === "P7a" ? T.p7 : T.q6, u = eo(sg(t, ti + 0.25, ti + 0.6)); sc = lerp(1.3, 2.0, u); mano = lerpV([-0.64, 0.86, 0.04], [-0.2, 0.36, 0.42], u); }
    else if (pa === "P3" || pa === "P7b" || pa === "Q7") { sc = 1.15; mano = [-0.12, 0.3, 0.32]; }
    ps.manoD = mano; ps.codoD = [-1, -0.4, -0.1]; seba.poner(ps); seba.raiz.updateMatrixWorld(true);
    const h = seba.brazos[1].mano.getWorldPosition(new THREE.Vector3());
    celS.scale.setScalar(sc); celS.position.copy(h); celS.lookAt(camP);
    celS.updateMatrixWorld(true);
    const upW = V3(0, 1, 0).transformDirection(celS.matrixWorld);
    celS.position.addScaledVector(upW, (0.172 * sc) / 2 + 0.004 * sc).addScaledVector(V3(0, 0, 1).transformDirection(celS.matrixWorld), 0.03);
  }
  // la proforma en las dos manos de Mica, hacia la cámara
  if (mica.raiz.visible) {
    proforma.visible = true;
    const pm = poseMica(t, pa, cp);
    mica.poner(pm); mica.raiz.updateMatrixWorld(true);
    const p = mica.cuerpo.localToWorld(V3(0.0, 0.5, 0.36));
    proforma.position.copy(p); proforma.lookAt(camP); proforma.rotateX(-0.12);
    proforma.updateMatrixWorld(true);
    pm.manoI = aCuerpo(mica, proforma.localToWorld(V3(0.175, -0.215, -0.03))); pm.manoD = aCuerpo(mica, proforma.localToWorld(V3(-0.175, -0.215, -0.03)));   // (r1) las manos a los costados: el total queda a la vista
    mica.poner(pm);
  }
  // Paola en el pizarrón (P5): la punta del marcador sigue el trazo (borra el 40 de izquierda a derecha, escribe el 43) y la
  // mano lo agarra por el cuerpo
  if (pa === "P5" && paola.raiz.visible) {
    const pp = posePaola(t, pa, cp); paola.poner(pp);
    const bx = (cx) => PIZ.x + (cx / 1100 - 0.5) * PIZ.W, by = (cy) => PIZ.y - (cy / 740 - 0.5) * PIZ.H, zP = PZ + 0.05;
    let tip;
    if (t < T.escribe) { const b = eio(sg(t, T.borra, T.escribe - 0.05)); const cx = 60 + 700 * b; tip = V3(bx(Math.max(300, cx)), by(520 + 70 * Math.sin(b * 22)), zP); }
    else { const e = sg(t, T.escribe, T.escribeFin); const cx = 250 + 80 + 560 * e; tip = V3(bx(cx), by(500 + 90 * Math.sin(e * 16)), zP); }
    const dir = V3(-0.25, -0.35, -1).normalize();
    marcador.position.copy(tip); marcador.lookAt(tip.clone().add(dir.clone().negate())); marcador.rotateY(Math.PI);
    marcador.visible = true;
    pp.manoD = aCuerpo(paola, tip.clone().addScaledVector(dir, -0.1)); pp.codoD = [-1, -0.6, 0.2]; paola.poner(pp);
  }
  if (pa === "P3" && t > T.resalta + 0.08) { seba.raiz.visible = false; celS.visible = false; }   // (pasada 1) en el inserto de la lista, sin la mano gigante en el borde
  // ---- cámara ----
  if (pl[2]) { ponerCam(camPre, t); camera.updateMatrixWorld(true); }
  if (pa === "P4" || pa === "Q4") { ponerCam(CAM_P4(sg(t, pa === "P4" ? T.p4 : T.q4, (pa === "P4" ? T.mi1 : T.mi1b) + LEN.mi1)), t); camera.updateMatrixWorld(true); }
  if (pa === "P4i") {
    // el inserto de la proforma: de frente, sin el pelo de Mica arriba (las manos en las esquinas de abajo)
    proforma.updateMatrixWorld(true);
    const c = proforma.localToWorld(V3(0, -0.02, 0)), nrm = V3(0, 0, 1).transformDirection(proforma.matrixWorld);
    const d = 0.42 / 0.6 / (2 * Math.tan((40 * D2R) / 2)) + 0.03 * (1 - eo(sg(t, pl[1], pl[1] + 0.5)));
    const p = c.clone().add(nrm.multiplyScalar(d));
    ponerCam([p.x, p.y - 0.085, p.z, c.x, c.y - 0.085, c.z, 40], t, true); camera.updateMatrixWorld(true);
  }
  if (pa === "Q3" || pa === "Q6b") {
    // el celular de Seba a pantalla llena (con su mano)
    seba.raiz.visible = true; const ps = poseSeba(t, "P3", CAM_P7A(0)); ps.x = 1.2; ps.z = -1.6; ps.giro = 0.2; seba.poner(ps);
    celS.visible = true; celS.scale.setScalar(1.2); celEnMano(celS, seba, V3(1.3, 1.5, 0.6), V3(-0.08, 0.42, 0.34), 0);
    celS.updateMatrixWorld(true);
    const ti = pa === "Q3" ? T.q3 : T.q6b;
    camPantalla(celS, V3(0, 0.012, 0.0075), V3(0, 0, 1), 0.172 * 1.2, 0.64, 38, t, 0.02 * (1 - eo(sg(t, ti, ti + 0.4))));   // (r2) ≥ 65 % del ancho
    seba.raiz.visible = false; manoCel.visible = true; cajasCont.visible = false;
  }
  if (pa === "Q4b") {
    // la tablet de Paola en la mesa, de frente; Paola detrás sin levantar la vista
    tabletMesa.updateMatrixWorld(true);
    const piv = tabletMesa.userData.pivote, [W, H] = tabletMesa.userData.tam;
    camPantalla(piv, V3(0, H / 2 - 0.01, 0.0065), V3(0, 0, 1), H, 0.38, 40, t, 0.06 * (1 - eo(sg(t, T.q4b, T.q4b + 0.5))));
    void W; paola.raiz.visible = false;
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  if (VERM === "portada") ponerCam(CAM_PORTADA, t, true);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROT_) ROT_[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2) && VERM !== "portada") {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const di = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) => { if (t >= ti - 0.04 && t < fin) hablar(GL[k], per, ent(ti - 0.04), orden, dx, minY, maxY, sobre); };
    const rot = (k, ti, cy, fin = 99, cx = 540) => { if (t >= ti && t < fin) ponerGlobo(ROT_[k], cx, cy, ent(ti), null, 3); };
    const fase = (k, ti, c = CORTE[k]) => { const tc = ti + c; return t < tc ? [GL[k + "a"], ent(ti - 0.04)] : [GL[k], 0.75 + 0.25 * bk(sg(t, tc, tc + 0.18))]; };
    const di2 = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) => { if (t >= ti - 0.04 && t < fin) { const [g, e] = fase(k, ti); hablar(g, per, e, orden, dx, minY, maxY, sobre); } };
    // la burbuja fija (mismo lugar y tamaño: que se lea el callback), anclada por el borde de abajo
    const fija = (g, e, cx, abajo, obj) => ponerGlobo(g, cx, abajo - g.userData.H / 2, e, obj && obj[0] > 40 && obj[0] < 1040 && obj[1] > 0 && obj[1] < 1900 ? obj : null, 1);
    // (r3) la burbuja abajo, sobre el piso, con la cola a la boca: arriba queda a la vista el contenedor vacío
    if (pa === "P1") fija(GL.s1, t < T.s1 ? 1 : ent(T.s1 - 0.1), 600, 1640, enPantalla(bocaW(seba)));
    if (pa === "Q1") { if (t >= T.s1b - 0.04 && t < T.q3 - 0.4) fija(GL.s1b, ent(T.s1b - 0.04), 600, 1640, enPantalla(bocaW(seba))); if (t >= T.q3 - 0.4) hablar(GL.pa1q, paola, ent(T.q3 - 0.4), 1, 60, 250); }   // (r2) la pregunta muda de Paola
    if (pa === "P2") di("pa1", paola, T.pa1, T.p3, 1, 60, 250);
    if (pa === "Q2") di("pa1b", paola, T.pa1b, T.q3, 1, 60, 250);
    if (pa === "P3" && t >= T.s2 - 0.04) { const [g, e] = fase("s2", T.s2); hablar(g, seba, e, 1, 60, 250); }
    if (pa === "P3i") { const [g, e] = fase("s2", T.s2); fija(g, e, 540, 1650, null); }
    if (pa === "P4") di("mi1", mica, T.mi1, T.p5, 1, 80, 250);
    if (pa === "P4i") fija(GL.mi1, 1, 540, 1650, null);
    if (pa === "Q4") di("mi1b", mica, T.mi1b, T.q4b, 1, 80, 250);
    if (pa === "P6f") { ponerGlobo(ROT_.n492, 540, 300, 1, null, 3); ponerGlobo(ROT_.trae, 540, 1560, 1, null, 3); }
    if (pa === "P7a" && t < T.s3 + 0.6) ponerGlobo(ROT_.menos, 790, 1560, 1, null, 3);   // (r2) "− $ 14.000" sigue un momento en P7a
    if (pa === "P5" || pa === "P5b" || pa === "P5c") {
      if (t >= T.igualC && t < T.viaja) { rot("reponer", T.igualC + 0.02, 330, 99, 540); rot("cobramos", T.cobramos, 1650); }
      if (t >= T.huecos) rot("n492", T.huecos, 300);
      if (t >= T.trae) rot("trae", T.trae, 1650);
    }
    if (pa === "P6") {
      if (t >= T.pa2 - 0.04) { const [g, e] = fase("pa2", T.pa2); fija(g, e, 540, BUR6, enPantalla(bocaW(paola))); }
      rot("menos", T.menos, 1650); ponerGlobo(ROT_.n492, 540, 300, 1, null, 3);   // (r1) "492 de 500" sigue en P6
    }
    if (pa === "P7a") di("s3", seba, T.s3, T.p7b, 1, 0, 250);
    if (pa === "P7b") ponerGlobo(ROT_.n492, 540, 425, 1, null, 3);   // (r1) el contenedor sigue con los huecos
    if (pa === "P7b" && t >= T.pa3 - 0.04) {
      const c1 = T.pa3 + CORTE.pa3a, c2 = T.pa3 + CORTE.pa3;
      const g = t < c1 ? GL.pa3x : t < c2 ? GL.pa3a : GL.pa3, e = t < c1 ? ent(T.pa3 - 0.04) : t < c2 ? 0.75 + 0.25 * bk(sg(t, c1, c1 + 0.18)) : 0.75 + 0.25 * bk(sg(t, c2, c2 + 0.18));
      fija(g, e, BUR7[0], BUR7[1], enPantalla(bocaW(paola)));
    }
    if (pa === "Q3") { if (t >= T.s4 - 0.04) { const [g, e] = fase("s4", T.s4); ponerGlobo(g, 540, 205 + g.userData.H / 2, e, null, 1); } rot("q3", T.rotQ3, 1650); }
    if (pa === "Q4b") { ponerGlobo(GL.pa4, 540, 330, ent(T.q4b), null, 1); rot("q4", T.rotQ4, 1650); }
    if (pa === "Q5") {
      if (t >= T.pa5 - 0.04) { const [g, e] = fase("pa5", T.pa5); fija(g, e, 540, BUR6, null); }
      if (t >= T.ok5 - 99 && t >= T.ok500) rot("n500", T.ok500, 300);
      if (t >= T.mas) rot("mas", T.mas, 1650);
    }
    if (pa === "Q6") di2("s5", seba, T.s5, T.q6b, 1, 0, 250);
    if (pa === "Q6b") { if (t >= T.s6 - 0.04) ponerGlobo(GL.s6, 540, 205 + GL.s6.userData.H / 2, ent(T.s6 - 0.04), null, 1); rot("q6", T.rotQ6, 1650); }
    if (pa === "Q7" && t >= T.pa6 - 0.04) { const [g, e] = fase("pa6", T.pa6); fija(g, e, BUR7[0], BUR7[1], enPantalla(bocaW(paola))); }
  }
  renderer.render(scene, camera);
}
const BUR6 = 700, BUR7 = [560, 810];   // dónde van las burbujas fijas (el borde de abajo)
window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
