// Capa 3D de tienda-tenes-stock (Three.js r170 local). Base técnica: reels/inmobiliaria-visitas (gen.mjs, tarjetas
// pegadas a la cámara, regla de burbujas, cámara por planos con Catmull-Rom, avatares). renderAt(t) es una función pura
// del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   EL DEPÓSITO DE "CASA PAO · IMPORTADOS" (alrededor del origen, piso y = 0): hormigón alisado gris cálido, pared del
//     fondo de bloque blanco con la franja navy y el nombre, la pared de cajas kraft del contenedor (FREIDORA DE AIRE 4 L,
//     franja verde menta / azul / crema), la mesa de fotos (parte 1: 8 cajas VERDE tapadas por el papel crema hasta el
//     piso; parte 2: una mesa con patas), el aro de luz, el pilar con el cuaderno del stock, la puerta al local (+x)
//   EL LOCAL (x ≈ 3-6,5): el mostrador crema con la tablet, el estante con tres freidoras, la cortina navy a medio subir
//   EL LIVING DE GRACIELA (x = 60): sillón navy2, manta crema, mesita de madera clara con la taza, la ventana
//   PARTE 1: "Pao, ¿tenés stock de la verde?" · "¡Sí! La última. Hoy te la mando." · Mica se lleva la verde · "Graciela,
//            perdoname: se me agotó." · "Ay. Bueno, la compro en otro lado." · la pausa · el papel sube: 8 cajas VERDE ·
//            "Pao. ¿Y estas cajas?" · "Del contenedor de marzo." · "¡Hola! ¡Ingreso nuevo!"
//   PARTE 2: el local (el MISMO "¡Pao! La verde la vendí en el local.") · "Ya lo sabe la tienda." (Queda 1) · Graciela
//            compra sola (Sin stock) · el pedido pago en la tablet, la etiqueta, por mayor · el contenedor (0 → 40) · el
//            MISMO "¡Hola! ¡Ingreso nuevo!" · 12 pedidos pagos · "Ya se enteraron." · "Comentá STOCK"
//            buscar el cartel." · VENDIDO · Sofi
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, MARCA, poseEn, CARA, BRAZOS, saludo, pegarACamara, crearCelular, crearTablet } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER as VERM } from "./tiempos3d.js";
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
scene.background = new THREE.Color(0x16243d);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 160);
camera.layers.enable(1);
scene.add(camera);
scene.environment = null;

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, kraft: 0xc9a46b, madera: 0xd7b98a, gris: 0xc9ccd2, celeste: 0xb9cde0, toldo: 0x365f28, hoja: 0x4f7a3a };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.85), madera: mat(C.madera, 0.75), gris: mat(C.gris, 0.35, { metalness: 0.3 }), goma: mat(0x23262c, 0.8),
  vidrio: new THREE.MeshBasicMaterial({ color: 0xcfe2f2, transparent: true, opacity: 0.1, depthWrite: false }),
  vidrioAuto: new THREE.MeshPhysicalMaterial({ color: 0x8fb4d6, roughness: 0.08, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide }),
  toldo: mat(C.toldo, 0.8), hoja: mat(C.hoja, 0.8), asfalto: mat(0x60646c, 0.95),
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
// EL DEPÓSITO DE "CASA PAO · IMPORTADOS" (alrededor del origen, piso y = 0), lunes de mañana, luz de tubos pareja
//   la mesa de fotos en el origen (0,9 × 0,8 de planta, 0,8 de alto); el soporte del papel detrás (z = -0,6)
//   el aro de luz a la izquierda de la mesa (x = -0,62) mirando a la freidora; Paola a su izquierda (x = -1,0)
//   el pilar con el cuaderno a la derecha (x = 1,05, z = 0,3); la puerta al local en la pared de la derecha (x = 2,6)
//   la pared de cajas del contenedor contra el fondo (z ≈ -2); la pared de bloque en z = -2,45
// =====================================================================================================
const MENTA = 0x8fc7a0, KRAFT = 0xc49a6c;
const DEP = new THREE.Group(); scene.add(DEP);
const MESA_H = 0.8;
const CJ = { w: 0.45, h: 0.4, d: 0.4 };
const PARED_Z = -2.45, PUERTA_X = 2.6;
// ---- piso de hormigón alisado (placas grandes, juntas finas) ----
const hormigonT = lienzo(1024, 1024, (x, w, h) => {
  x.fillStyle = "#8a877c"; x.fillRect(0, 0, w, h);
  semilla = 11; for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(${az() > 0.5 ? "255,255,250" : "40,38,34"},${0.025 + az() * 0.03})`; const r = 6 + az() * 40; x.beginPath(); x.arc(az() * w, az() * h, r, 0, 7); x.fill(); }
  x.strokeStyle = "rgba(48,46,42,0.55)"; x.lineWidth = 4; x.strokeRect(2, 2, w - 4, h - 4);
});
hormigonT.wrapS = hormigonT.wrapT = THREE.RepeatWrapping; hormigonT.repeat.set(8, 7);
{
  const piso = plano(19.2, 16.8, hormigonT, 1.5, 0, -1); piso.rotation.x = -Math.PI / 2; piso.material.roughness = 0.92; DEP.add(piso);
}
// ---- paredes de bloque visto blanco; la franja navy con "CASA PAO · IMPORTADOS" ----
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
{
  const fondo = paredBloque(12, 4.2); fondo.position.set(0.6, 2.1, PARED_Z); DEP.add(fondo);
  const franja = plano(12, 0.6, nombreT, 0.6, 2.75, PARED_Z + 0.01); franja.material.roughness = 0.8; DEP.add(franja);
  // pared de la derecha (entre el depósito y el local) con la puerta ancha
  const pd1 = paredBloque(1.75, 4.2); pd1.rotation.y = -Math.PI / 2; pd1.position.set(PUERTA_X, 2.1, PARED_Z + 0.875); DEP.add(pd1);
  const pd2 = paredBloque(3.6, 4.2); pd2.rotation.y = -Math.PI / 2; pd2.position.set(PUERTA_X, 2.1, 0.7 + 1.8); DEP.add(pd2);
  const pd3 = paredBloque(1.1, 1.8); pd3.rotation.y = -Math.PI / 2; pd3.position.set(PUERTA_X, 3.3, 0.15); DEP.add(pd3);
  // del lado del local, las mismas paredes (crema)
  for (const [w, h, y, z] of [[1.75, 4.2, 2.1, PARED_Z + 0.875], [3.6, 4.2, 2.1, 2.5], [1.1, 1.8, 3.3, 0.15]]) { const m = mesh(new THREE.PlaneGeometry(w, h), mat(0xefeee5, 0.9), PUERTA_X + 0.12, y, z); m.rotation.y = Math.PI / 2; DEP.add(m); }
  // marco navy de la puerta
  for (const z of [-0.42, 0.72]) DEP.add(caja(0.16, 2.42, 0.08, M.navy3, PUERTA_X, 1.21, z, 0.01));
  DEP.add(caja(0.16, 0.1, 1.22, M.navy3, PUERTA_X, 2.4, 0.15, 0.01));
  // pared de la izquierda (lejos)
  const pi = paredBloque(7, 4.2); pi.rotation.y = Math.PI / 2; pi.position.set(-3.6, 2.1, 1.0); DEP.add(pi);
  // techo (para que los planos bajos no vean el vacío) y los tubos fluorescentes
  const techo = mesh(new THREE.PlaneGeometry(14, 12), mat(0xdcdad0, 0.95), 1.5, 4.2, -0.5); techo.rotation.x = Math.PI / 2; DEP.add(techo);
  const tuboM = new THREE.MeshBasicMaterial({ color: 0xfbfbf4, toneMapped: false });
  for (const [x, z] of [[-1.6, -0.6], [1.0, -0.6], [-1.6, 1.4], [1.0, 1.4]]) { DEP.add(caja(1.3, 0.06, 0.16, M.cr2, x, 3.55, z, 0.01)); const tb = mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.2, 10).rotateZ(Math.PI / 2), tuboM, x, 3.5, z); tb.castShadow = false; DEP.add(tb); for (const s of [-0.4, 0.4]) DEP.add(cajaS(0.01, 0.5, 0.01, M.navy3, x + s, 3.85, z)); }
}
// ---- las cajas del contenedor: kraft, cinta, etiqueta crema "FREIDORA DE AIRE 4 L" y la franja del color ----
const COLOR_CAJA = { verde: ["#8fc7a0", "VERDE", "#0b1220"], azul: ["#1f3254", "AZUL", "#efeee5"], crema: ["#efeee5", "CREMA", "#0b1220"] };
function dibujoFreidora(x, cx, cy, s, tinta = "#0b1220") {
  x.strokeStyle = tinta; x.lineWidth = s * 0.07; x.lineJoin = "round"; x.lineCap = "round";
  x.beginPath(); x.roundRect(cx - s * 0.45, cy - s * 0.5, s * 0.9, s, s * 0.28); x.stroke();
  x.beginPath(); x.moveTo(cx - s * 0.45, cy - s * 0.22); x.lineTo(cx + s * 0.45, cy - s * 0.22); x.stroke();
  x.beginPath(); x.roundRect(cx - s * 0.36, cy - s * 0.08, s * 0.72, s * 0.46, s * 0.1); x.stroke();
  x.beginPath(); x.moveTo(cx - s * 0.18, cy + s * 0.12); x.lineTo(cx + s * 0.18, cy + s * 0.12); x.stroke();
  x.beginPath(); x.arc(cx, cy - s * 0.36, s * 0.07, 0, 7); x.stroke();
}
function texCajaFrente(color, marzo) {
  const [fc, nombre, tc] = COLOR_CAJA[color];
  return lienzo(512, 456, (x, w, h) => {
    x.fillStyle = "#c49a6c"; x.fillRect(0, 0, w, h);
    semilla = 3 + nombre.length; for (let i = 0; i < 260; i++) { x.strokeStyle = `rgba(${az() > 0.5 ? "120,82,44" : "226,190,140"},0.18)`; x.lineWidth = 1 + az() * 2; const y = az() * h, xx = az() * w; x.beginPath(); x.moveTo(xx, y); x.lineTo(xx + 20 + az() * 60, y + (az() - 0.5) * 4); x.stroke(); }
    x.strokeStyle = "rgba(90,60,30,0.35)"; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8);
    x.fillStyle = "#dcc092"; x.fillRect(w / 2 - 46, 0, 92, 62); x.fillStyle = "rgba(255,255,255,0.18)"; x.fillRect(w / 2 - 46, 0, 92, 10);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, 74, w - 60, 270, 16); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.stroke();
    dibujoFreidora(x, 104, 156, 92);
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle";
    ajustar(x, "FREIDORA", 900, 56, 300); x.fillText("FREIDORA", 166, 122);
    ajustar(x, "DE AIRE 4 L", 900, 56, 300); x.fillText("DE AIRE 4 L", 166, 182);
    x.fillStyle = fc; x.beginPath(); x.roundRect(30, 232, w - 60, 112, [0, 0, 16, 16]); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.stroke();
    x.fillStyle = tc; x.textAlign = "center"; x.font = F(900, 88); x.fillText(nombre, w / 2, 292);
    if (marzo) { x.save(); x.translate(w / 2 + 20, 400); x.rotate(-0.04); x.fillStyle = "#0b1220"; x.font = CAV(78); x.fillText("CONT. MARZO", 0, 0); x.restore(); }
  });
}
const cajaTopT = lienzo(256, 228, (x, w, h) => { x.fillStyle = "#c8a070"; x.fillRect(0, 0, w, h); x.fillStyle = "rgba(90,60,30,0.4)"; x.fillRect(0, h / 2 - 2, w, 4); x.fillStyle = "#dcc092"; x.fillRect(w / 2 - 23, 0, 46, h); });
const kraftM = mat(KRAFT, 0.9), kraftTopM = new THREE.MeshStandardMaterial({ map: cajaTopT, roughness: 0.9 });
const MAT_CAJA = {};
for (const c of ["verde", "azul", "crema"]) { const fr = new THREE.MeshStandardMaterial({ map: texCajaFrente(c, c === "verde"), roughness: 0.88 }); MAT_CAJA[c] = [kraftM, kraftM, kraftTopM, kraftM, fr, kraftM]; }
const geoCaja = new THREE.BoxGeometry(CJ.w, CJ.h, CJ.d);
function cajas(color, lista, padre = DEP) {
  const im = new THREE.InstancedMesh(geoCaja, MAT_CAJA[color], lista.length);
  const o = new THREE.Object3D();
  lista.forEach(([x, y, z, ry = 0], i) => { o.position.set(x, y, z); o.rotation.set(0, ry, 0); o.updateMatrix(); im.setMatrixAt(i, o.matrix); });
  im.castShadow = true; im.receiveShadow = true; padre.add(im); return im;
}
// la pared del contenedor: columnas de 4-5 cajas contra el fondo; en el medio, casi todas verdes (las de marzo)
const PILA = { verde: [], azul: [], crema: [] };
{
  semilla = 21;
  for (let i = 0; i < 15; i++) {
    const x = -3.2 + i * (CJ.w + 0.012);
    const alto = 4 + (i % 3 === 1 ? 1 : 0);
    for (let j = 0; j < alto; j++) {
      const medio = x > -1.9 && x < 2.0;
      const c = medio ? (az() < 0.86 ? "verde" : "crema") : (az() < 0.6 ? "azul" : "crema");
      PILA[c].push([x + (az() - 0.5) * 0.02, CJ.h / 2 + j * (CJ.h + 0.004), -2.15, (az() - 0.5) * 0.03]);
    }
  }
  // una segunda fila más baja, delante, a los costados (profundidad en los planos abiertos)
  for (const [x0, n, alto, c] of [[-3.0, 3, 3, "azul"], [1.75, 2, 2, "verde"]]) for (let i = 0; i < n; i++) for (let j = 0; j < alto; j++) PILA[(i + j) % 3 === 2 ? "crema" : c].push([x0 + i * (CJ.w + 0.012), CJ.h / 2 + j * (CJ.h + 0.004), -1.68, (az() - 0.5) * 0.04]);
}
const pilas = ["verde", "azul", "crema"].map((c) => cajas(c, PILA[c]));
// la estantería de ángulo ranurado navy3 a la izquierda, con cajas azules y crema
{
  const g = new THREE.Group(); g.position.set(-2.95, 0, -0.5); g.rotation.y = Math.PI / 2; DEP.add(g);
  const pm = M.navy3;
  for (const x of [-0.95, 0.95]) for (const z of [-0.25, 0.25]) g.add(caja(0.05, 2.3, 0.05, pm, x, 1.15, z, 0.005));
  for (const y of [0.1, 0.62, 1.14, 1.66, 2.18]) g.add(caja(1.95, 0.03, 0.56, pm, 0, y, 0, 0.005));
  const lista = [], lista2 = [];
  for (const y of [0.1, 0.62, 1.14, 1.66]) for (const x of [-0.7, -0.23, 0.24, 0.71]) ((x + y * 3) % 1 > 0.5 ? lista2 : lista).push([x, y + 0.016 + CJ.h / 2, 0, 0]);
  cajas("azul", lista, g); cajas("crema", lista2, g);
}

// ---- la freidora de aire (EL objeto): cuerpo redondeado, tapa navy, cajón al frente con la manija crema, dos perillas ----
const CUERPO_FR = { verde: MENTA, azul: 0x2c4268, crema: 0xefeee5 };
function crearFreidora(color = "verde", esc = 1) {
  const g = new THREE.Group();
  const cm = mat(CUERPO_FR[color], 0.55), osc = mat(new THREE.Color(CUERPO_FR[color]).multiplyScalar(0.84).getHex(), 0.55);
  const nv = mat(0x0b1220, 0.45), cr = mat(0xf4f2e8, 0.5);
  const s = new THREE.Group(); s.scale.setScalar(esc); g.add(s);
  s.add(mesh(rbox(0.27, 0.27, 0.28, 0.075, 4), cm, 0, 0.165, 0));                 // el cuerpo
  s.add(mesh(rbox(0.25, 0.06, 0.26, 0.03, 3), nv, 0, 0.3, -0.005));                 // la tapa navy
  s.add(mesh(rbox(0.2, 0.05, 0.03, 0.012, 2), nv, 0, 0.265, 0.13));                 // el panel de las perillas
  { const k = mesh(new THREE.CylinderGeometry(0.02, 0.022, 0.024, 20).rotateX(Math.PI / 2), cr, -0.055, 0.265, 0.15); s.add(k); s.add(mesh(new THREE.BoxGeometry(0.004, 0.016, 0.004), nv, -0.055, 0.271, 0.163)); }
  s.add(mesh(rbox(0.07, 0.026, 0.006, 0.004, 1), new THREE.MeshBasicMaterial({ color: 0x5ce611 }), 0.045, 0.265, 0.147));   // el visor digital
  s.add(mesh(rbox(0.235, 0.15, 0.03, 0.03, 3), osc, 0, 0.115, 0.13));              // el cajón-canasto
  s.add(mesh(rbox(0.24, 0.008, 0.012, 0.003, 1), nv, 0, 0.195, 0.14));              // la junta del cajón
  for (const x of [-0.055, 0.055]) s.add(mesh(rbox(0.026, 0.03, 0.06, 0.008, 2), cr, x, 0.13, 0.165));
  s.add(mesh(rbox(0.16, 0.034, 0.03, 0.012, 2), cr, 0, 0.13, 0.2));                  // la manija horizontal (sobresale)
  for (const [x, z] of [[-0.09, -0.09], [0.09, -0.09], [-0.09, 0.09], [0.09, 0.09]]) s.add(mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.03, 10), nv, x, 0.015, z));
  for (let i = 0; i < 5; i++) s.add(mesh(new THREE.BoxGeometry(0.15, 0.008, 0.006), nv, 0, 0.18 + i * 0.02, -0.14));   // rejilla de atrás
  return sombras(g);
}

// ---- la mesa de fotos: parte 1 = 8 cajas VERDE tapadas por el papel; parte 2 = una mesa con patas ----
const MESA = new THREE.Group(); DEP.add(MESA);
const mesaCajas = cajas("verde", [[-0.226, 0.2, -0.2], [0.226, 0.2, -0.2], [-0.226, 0.2, 0.2], [0.226, 0.2, 0.2], [-0.226, 0.602, -0.2], [0.226, 0.602, -0.2], [-0.226, 0.602, 0.2], [0.226, 0.602, 0.2]].map(([x, y, z], i) => [x, y, z, (i % 3 - 1) * 0.008]), MESA);
const papelM = new THREE.MeshStandardMaterial({ color: 0xf1efe4, roughness: 0.95, side: THREE.DoubleSide });
const PW = 1.08, PT = MESA_H + 0.012;
let papelFrente, papelRollo, papelLados, mesaPatas, rolloNuevo;
{
  // el soporte de dos patas navy y el rollo arriba
  for (const x of [-0.64, 0.64]) { MESA.add(caja(0.035, 1.8, 0.035, M.navy, x, 0.9, -0.62, 0.008)); MESA.add(caja(0.3, 0.03, 0.04, M.navy, x, 0.015, -0.62, 0.008)); }
  MESA.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.32, 8).rotateZ(Math.PI / 2), M.navy, 0, 1.74, -0.62));
  MESA.add(mesh(new THREE.CylinderGeometry(0.055, 0.055, PW + 0.02, 24).rotateZ(Math.PI / 2), papelM, 0, 1.74, -0.62));
  // el papel: baja detrás, cubre la mesa y cae al frente hasta el piso ("sin fin")
  const atras = mesh(new THREE.PlaneGeometry(PW, 1.74 - PT - 0.05), papelM, 0, (1.74 + PT + 0.05) / 2, -0.61); MESA.add(atras);
  const curva = mesh(new THREE.CylinderGeometry(0.17, 0.17, PW, 20, 1, true, Math.PI, Math.PI / 2).rotateZ(Math.PI / 2), papelM, 0, PT + 0.17, -0.44); MESA.add(curva);
  const arriba = mesh(new THREE.PlaneGeometry(PW, 0.88), papelM, 0, PT, 0.0); arriba.rotation.x = -Math.PI / 2; MESA.add(arriba);
  const borde = mesh(new THREE.CylinderGeometry(0.012, 0.012, PW, 8).rotateZ(Math.PI / 2), papelM, 0, PT - 0.012, 0.43); MESA.add(borde);
  papelFrente = mesh(new THREE.PlaneGeometry(PW, PT).translate(0, -PT / 2, 0), papelM, 0, PT - 0.012, 0.442); MESA.add(papelFrente);
  papelRollo = mesh(new THREE.CylinderGeometry(0.034, 0.034, PW + 0.01, 18).rotateZ(Math.PI / 2), papelM, 0, 0.04, 0.46); MESA.add(papelRollo);
  papelLados = new THREE.Group(); MESA.add(papelLados);
  for (const s of [-1, 1]) { const l = mesh(new THREE.PlaneGeometry(0.88, PT), papelM, s * (PW / 2 + 0.002), PT / 2, 0); l.rotation.y = Math.PI / 2; papelLados.add(l); }
  // parte 2: la mesa de verdad (tapa de madera, patas navy)
  mesaPatas = new THREE.Group(); MESA.add(mesaPatas);
  mesaPatas.add(caja(1.0, 0.04, 0.84, M.madera, 0, MESA_H - 0.02 + 0.01, 0, 0.01));
  for (const [x, z] of [[-0.45, -0.37], [0.45, -0.37], [-0.45, 0.37], [0.45, 0.37]]) mesaPatas.add(caja(0.045, MESA_H - 0.03, 0.045, M.navy3, x, (MESA_H - 0.03) / 2, z, 0.008));
  mesaPatas.add(caja(0.9, 0.025, 0.025, M.navy3, 0, 0.18, -0.37, 0.005)); mesaPatas.add(caja(0.9, 0.025, 0.025, M.navy3, 0, 0.18, 0.37, 0.005));
  sombras(MESA);
  // el rollo nuevo que trae Mica bajo el brazo (P6)
  rolloNuevo = mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 20), papelM); scene.add(rolloNuevo);
}
// la plantita de utilería en la mesa
const plantita = new THREE.Group(); MESA.add(plantita); plantita.position.set(0.36, PT, -0.22);
{
  plantita.add(mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.08, 16), M.cr, 0, 0.04, 0));
  semilla = 5; for (let i = 0; i < 7; i++) { const h = mesh(new THREE.SphereGeometry(0.035, 8, 6), M.hoja, (az() - 0.5) * 0.06, 0.1 + az() * 0.06, (az() - 0.5) * 0.06); h.scale.set(0.7, 1.4, 0.5); h.rotation.z = (az() - 0.5) * 1.2; plantita.add(h); }
  sombras(plantita);
}
const frFoto = crearFreidora("verde"); scene.add(frFoto);      // la verde de la parte 1 (se la lleva Mica)
const frFoto2 = crearFreidora("crema"); scene.add(frFoto2);    // la de muestra de la parte 2 (Q1-Q3)
const frFoto3 = crearFreidora("verde"); scene.add(frFoto3);    // Q4-Q5: la verde vuelve a la mesa
const FR_MESA = V3(0.08, PT, 0.18);
for (const f of [frFoto, frFoto2, frFoto3]) { f.position.copy(FR_MESA); f.rotation.y = 0.32; }

// ---- el aro de luz (anillo crema emisivo) en su pie, con el soporte del celular en el centro ----
const ARO = new THREE.Group(); ARO.position.set(-0.6, 0, -0.4); DEP.add(ARO);
const ARO_C = V3(0, 0.96, 0);
let aroAnillo, soporteCel, luzAro;
{
  for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2 + 0.3; const p = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.62, 6), M.navy, Math.cos(a) * 0.12, 0.27, Math.sin(a) * 0.12); p.rotation.z = Math.cos(a) * 0.42; p.rotation.x = -Math.sin(a) * 0.42; ARO.add(p); }
  ARO.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.78, 8), M.navy, 0, 0.53, 0));
  const cab = new THREE.Group(); cab.position.copy(ARO_C); ARO.add(cab);
  ARO.updateMatrixWorld(true); cab.lookAt(FR_MESA.x, FR_MESA.y + 0.14, FR_MESA.z);
  aroAnillo = mesh(new THREE.TorusGeometry(0.2, 0.026, 12, 48), new THREE.MeshStandardMaterial({ color: 0xfff6e6, emissive: 0xfff1d6, emissiveIntensity: 1.25, roughness: 0.4 })); aroAnillo.castShadow = false; cab.add(aroAnillo);
  cab.add(mesh(new THREE.TorusGeometry(0.2, 0.012, 8, 48).translate(0, 0, -0.022), M.navy, 0, 0, 0));
  for (const a of [Math.PI / 2, -Math.PI / 2]) cab.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.18, 6), M.navy, 0, Math.sin(a) * 0.09, -0.02));
  soporteCel = new THREE.Group(); cab.add(soporteCel);
  soporteCel.add(mesh(rbox(0.11, 0.012, 0.02, 0.005, 1), M.navy, 0, -0.085, -0.004));
  ARO.userData.cab = cab;
  luzAro = new THREE.PointLight(0xfff0d8, 2.4, 2.6, 1.6); luzAro.position.set(0, 0, 0.06); cab.add(luzAro);
}
// ---- el pilar del galpón con el cuaderno del stock colgado de un clavo ----
const PILAR = new THREE.Group(); PILAR.position.set(-1.42, 0, 0.66); PILAR.rotation.y = -0.05; DEP.add(PILAR);
const cuadT = lienzo(600, 780, () => {});
let cuaderno;
function dibujarCuaderno(circulo) {
  const { x } = cuadT.userData, w = 600, h = 780;
  x.fillStyle = "#f7f6ee"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "#b9cde0"; x.lineWidth = 3; for (let y = 150; y < h; y += 92) { x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); }
  x.strokeStyle = "#e3a39b"; x.lineWidth = 3; x.beginPath(); x.moveTo(70, 60); x.lineTo(70, h); x.stroke();
  x.fillStyle = "#16243d"; x.textBaseline = "alphabetic"; x.textAlign = "left";
  x.font = CAV(96); x.fillText("STOCK", 110, 128);
  x.font = CAV(108); x.fillText("VERDE:", 92, 316);
  // "3" y "2" tachados, el "1" grande
  x.font = CAV(108); x.fillText("3", 382, 316); x.fillText("2", 448, 316);
  x.strokeStyle = "#16243d"; x.lineWidth = 9; for (const xx of [378, 444]) { x.beginPath(); x.moveTo(xx - 4, 300); x.lineTo(xx + 56, 252); x.stroke(); }
  x.font = CAV(150); x.fillText("1", 514, 326);
  if (circulo) { x.strokeStyle = "#c7655b"; x.lineWidth = 12; x.beginPath(); x.ellipse(540, 278, 54, 74, 0, 0, 7); x.stroke(); }
  x.font = CAV(100); x.fillText("AZUL: ¿?", 92, 500);
  x.fillText("CREMA: 4", 92, 684);
  cuadT.needsUpdate = true;
}
dibujarCuaderno(false);
{
  PILAR.add(caja(0.22, 4.2, 0.22, M.navy3, 0, 2.1, 0, 0.01));
  const cg = new THREE.Group(); cg.position.set(0, 1.46, 0.115); cg.rotation.x = -0.05; PILAR.add(cg);
  cg.add(mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.03, 6).rotateX(Math.PI / 2), M.gris, 0, 0.13, 0.0));
  cg.add(caja(0.25, 0.33, 0.012, M.navy2, 0, -0.07, 0.0, 0.006));   // la tapa de atrás
  const hoja = new THREE.Mesh(new THREE.PlaneGeometry(0.235, 0.305), new THREE.MeshStandardMaterial({ map: cuadT, roughness: 0.85 })); hoja.position.set(0, -0.075, 0.0075); cg.add(hoja);
  for (let i = 0; i < 9; i++) cg.add(mesh(new THREE.TorusGeometry(0.009, 0.0025, 6, 12), M.gris, -0.1 + i * 0.025, 0.083, 0.004));
  // el hilo del clavo a la espiral
  for (const s of [-1, 1]) { const h2 = mesh(new THREE.CylinderGeometry(0.0018, 0.0018, 0.07, 4), mat(0xe8e2d0, 0.8), s * 0.03, 0.11, 0.004); h2.rotation.z = s * 0.75; cg.add(h2); }
  cuaderno = cg; sombras(cg);
}

// ---- la tablet de Paola (parte 2) en un atril sobre dos cajas, a la derecha de la mesa ----
const pantT = lienzo(1280, 800, () => {});
const tabP = crearTablet(pantT, 0.36, 0.25, 0.3); tabP.position.set(0.88, 0.8 + 0.005, 0.18); tabP.rotation.y = -0.5; DEP.add(tabP);
const pilaTab = cajas("azul", [[0.88, 0.2, 0.18, -0.5], [0.88, 0.602, 0.18, -0.46]]);
// la impresora de etiquetas (Q3) al lado de la tablet y la etiqueta que sale
const IMP = new THREE.Group(); IMP.position.set(0.62, PT, 0.3); IMP.rotation.y = -0.3; DEP.add(IMP);
const etiquetaT = lienzo(400, 300, (x, w, h) => {
  x.fillStyle = "#fbfaf4"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.strokeRect(10, 10, w - 20, h - 20);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 52); x.fillText("ENVÍO", 30, 62);
  x.font = F(800, 44); x.fillText("Graciela", 30, 128); x.fillStyle = "#3fa60a"; x.font = F(900, 44); x.fillText("Pagado ✓", 30, 188);
  x.fillStyle = "#0b1220"; for (let i = 0; i < 26; i++) x.fillRect(30 + i * 12, 226, i % 3 ? 5 : 8, 50);
});
let etiqueta, etiquetaCaja;
{
  IMP.add(caja(0.16, 0.1, 0.18, M.cr, 0, 0.05, 0, 0.025)); IMP.add(caja(0.12, 0.01, 0.02, M.navy, 0, 0.07, 0.092, 0.003));
  IMP.add(caja(0.03, 0.012, 0.012, M.g, 0.05, 0.1, 0.05, 0.003));
  etiqueta = mesh(new THREE.PlaneGeometry(0.1, 0.075).translate(0, -0.0375, 0), new THREE.MeshStandardMaterial({ map: etiquetaT, roughness: 0.7, side: THREE.DoubleSide }), 0, 0.075, 0.1); IMP.add(etiqueta);
  sombras(IMP);
  etiquetaCaja = mesh(new THREE.PlaneGeometry(0.2, 0.15), new THREE.MeshStandardMaterial({ map: etiquetaT, roughness: 0.7 })); scene.add(etiquetaCaja);
}
// la caja verde del pedido de Graciela (Q3, donde Mica pega la etiqueta) y la que se lleva Walter (Q1)
const cajaPedido = new THREE.Mesh(geoCaja, MAT_CAJA.verde); cajaPedido.castShadow = true; scene.add(cajaPedido);
const cajaWalter = new THREE.Mesh(geoCaja, MAT_CAJA.verde); cajaWalter.castShadow = true; scene.add(cajaWalter);
// el contenedor que llega (Q4): dos pilas de cajas verdes delante de la pared, a la derecha de la mesa
const LLEGA = []; { for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) LLEGA.push([1.3 + i * 0.47, 0.2 + j * 0.404, -0.95, (i - 1) * 0.02]); }
const pilaLlega = cajas("verde", LLEGA);
// la pistola lectora de Mica (Q4): navy con gatillo crema, sin cable
const pistola = new THREE.Group(); scene.add(pistola);
let rayo;
{
  pistola.scale.setScalar(1.4); pistola.add(caja(0.05, 0.06, 0.15, M.navy, 0, 0, 0, 0.015)); const mango = caja(0.04, 0.1, 0.045, M.navy, 0, -0.06, -0.04, 0.012); mango.rotation.x = -0.3; pistola.add(mango);
  pistola.add(caja(0.012, 0.03, 0.02, M.cr, 0, -0.03, 0.005, 0.004)); pistola.add(caja(0.052, 0.05, 0.012, M.g, 0, 0.0, 0.078, 0.005));
  rayo = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.5, 4, 1, true).rotateX(-Math.PI / 2).translate(0, 0, 0.33), new THREE.MeshBasicMaterial({ color: C.g, transparent: true, opacity: 0.35, depthWrite: false, side: THREE.DoubleSide })); pistola.add(rayo);
  sombras(pistola); rayo.castShadow = false;
}

// =====================================================================================================
// EL LOCAL (detrás de la puerta, x ≈ 2,7-6,5): mostrador crema con la tablet, el estante con tres freidoras, la cortina
// de enrollar navy a medio subir hacia la calle (x = 6,4)
// =====================================================================================================
const LOC = new THREE.Group(); scene.add(LOC);
const pantL = lienzo(1280, 800, () => {});
const MOST = { x: 4.4, z: 0.1 };
let tabL;
{
  // piso del local (baldosa crema) y paredes
  const bal = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#e4e0d2"; x.fillRect(0, 0, w, h); x.strokeStyle = "#c9c4b2"; x.lineWidth = 6; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * w / 4, 0); x.lineTo(i * w / 4, h); x.stroke(); x.beginPath(); x.moveTo(0, i * h / 4); x.lineTo(w, i * h / 4); x.stroke(); } });
  bal.wrapS = bal.wrapT = THREE.RepeatWrapping; bal.repeat.set(3, 4);
  const piso = plano(4.0, 6.0, bal, 4.6, 0.002, 0.2); piso.rotation.x = -Math.PI / 2; LOC.add(piso);
  const fondo = mesh(new THREE.PlaneGeometry(4.0, 4.2), mat(0xe9e7dc, 0.9), 4.6, 2.1, -1.7); LOC.add(fondo);
  const verdeF = mesh(new THREE.PlaneGeometry(4.0, 0.5), M.g, 4.6, 2.55, -1.69); LOC.add(verdeF);
  const nom = plano(2.4, 0.3, nombreT, 4.6, 3.05, -1.69); LOC.add(nom);
  const lado = mesh(new THREE.PlaneGeometry(6, 4.2), mat(0xe9e7dc, 0.9), 4.6, 2.1, 3.0); lado.rotation.y = Math.PI; LOC.add(lado);
  const techo = mesh(new THREE.PlaneGeometry(4.2, 6), mat(0xdcdad0, 0.95), 4.6, 4.2, 0.6); techo.rotation.x = Math.PI / 2; LOC.add(techo);
  // el mostrador crema con la tapa navy y la tablet del local
  LOC.add(caja(0.6, 0.95, 1.7, M.cr, MOST.x, 0.475, MOST.z, 0.03)); LOC.add(caja(0.7, 0.04, 1.8, M.navy3, MOST.x, 0.97, MOST.z, 0.012));
  LOC.add(caja(0.62, 0.08, 1.72, M.g, MOST.x, 0.12, MOST.z, 0.01));
  tabL = crearTablet(pantL, 0.32, 0.22, 0.45); tabL.position.set(MOST.x - 0.1, 0.99, MOST.z - 0.55); tabL.rotation.y = -Math.PI / 2 + 0.5; LOC.add(tabL);
  // el estante del fondo con las tres freidoras exhibidas (una de cada color)
  LOC.add(caja(2.0, 0.04, 0.42, M.navy3, 4.3, 1.2, -1.45, 0.008)); LOC.add(caja(2.0, 0.04, 0.42, M.navy3, 4.3, 0.6, -1.45, 0.008));
  for (const x of [3.32, 5.28]) LOC.add(caja(0.04, 1.6, 0.42, M.navy3, x, 0.8, -1.45, 0.008));
  ["verde", "azul", "crema"].forEach((c, i) => { const f = crearFreidora(c, 0.9); f.position.set(3.75 + i * 0.55, 1.22, -1.42); f.rotation.y = 0.1; LOC.add(f); });
  cajas("azul", [[3.75, 0.82, -1.45], [4.25, 0.82, -1.45]], LOC); cajas("crema", [[4.75, 0.82, -1.45]], LOC);
  // la vidriera a la calle con la cortina navy de enrollar a medio subir (la luz de la mañana abajo)
  const calle = mesh(new THREE.PlaneGeometry(6, 4.2), new THREE.MeshBasicMaterial({ color: 0xdfe9f0 }), 6.5, 2.1, 0.2); calle.rotation.y = -Math.PI / 2; LOC.add(calle);
  const cortT = lienzo(256, 512, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; for (let y = 0; y < h; y += 26) x.fillRect(0, y, w, 6); });
  cortT.wrapS = cortT.wrapT = THREE.RepeatWrapping; cortT.repeat.set(1, 3);
  const cort = plano(3.6, 2.2, cortT, 6.44, 3.1, 0.2); cort.rotation.y = -Math.PI / 2; LOC.add(cort);
  LOC.add(caja(0.1, 0.12, 3.7, M.navy, 6.4, 2.0, 0.2, 0.01));
  sombras(LOC);
}

// =====================================================================================================
// EL LIVING DE GRACIELA (x = 60): sillón navy2 con la manta crema, mesita baja de madera clara con la taza navy, la ventana
// con la cortina crema, un cuadro chico de líneas
// =====================================================================================================
const LX = 60;
const LIV = new THREE.Group(); LIV.position.x = LX; scene.add(LIV);
{
  const parq = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#c9a774"; x.fillRect(0, 0, w, h); for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#bf9c68" : "#d1b081"; x.fillRect(0, i * 64, w, 60); } x.strokeStyle = "rgba(90,60,30,0.25)"; x.lineWidth = 3; for (let i = 0; i < 8; i++) for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(((i % 2) * 64) + k * 128, i * 64); x.lineTo(((i % 2) * 64) + k * 128, i * 64 + 60); x.stroke(); } });
  parq.wrapS = parq.wrapT = THREE.RepeatWrapping; parq.repeat.set(4, 4);
  const piso = plano(7, 7, parq, 0, 0, 0.5); piso.rotation.x = -Math.PI / 2; LIV.add(piso);
  const pared = mesh(new THREE.PlaneGeometry(7, 3.2), mat(0xdfe6ea, 0.92), 0, 1.6, -1.1); LIV.add(pared);
  const zocalo = caja(7, 0.1, 0.02, M.cr, 0, 0.05, -1.09, 0.004); LIV.add(zocalo);
  const lat = mesh(new THREE.PlaneGeometry(7, 3.2), mat(0xdfe6ea, 0.92), -2.2, 1.6, 0.5); lat.rotation.y = Math.PI / 2; LIV.add(lat);
  // la ventana con la cortina crema (a la izquierda del sillón)
  const luz = mesh(new THREE.PlaneGeometry(1.1, 1.3), new THREE.MeshBasicMaterial({ color: 0xf4f7f2 }), -1.45, 1.55, -1.09); LIV.add(luz);
  for (const [w, h, x, y] of [[1.2, 0.06, -1.45, 2.22], [1.2, 0.06, -1.45, 0.88], [0.06, 1.4, -2.02, 1.55], [0.06, 1.4, -0.88, 1.55], [0.04, 1.3, -1.45, 1.55]]) LIV.add(caja(w, h, 0.05, M.cr, x, y, -1.07, 0.01));
  const cortinaT = lienzo(256, 512, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); for (let i = 0; i < 8; i++) { x.fillStyle = `rgba(0,0,0,${i % 2 ? 0.07 : 0.0})`; x.fillRect(i * 32, 0, 32, h); } });
  const cort = plano(0.55, 1.6, cortinaT, -0.72, 1.5, -1.0); LIV.add(cort);
  // el cuadro de líneas
  const cuadroT = lienzo(400, 300, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#16243d"; x.lineWidth = 10; x.lineCap = "round"; x.beginPath(); x.moveTo(40, 220); x.bezierCurveTo(120, 80, 200, 260, 360, 90); x.stroke(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(300, 80, 30, 0, 7); x.fill(); });
  LIV.add(caja(0.66, 0.5, 0.03, M.navy, 0.75, 1.85, -1.08, 0.008)); LIV.add(plano(0.58, 0.42, cuadroT, 0.75, 1.85, -1.06));
  // el sillón navy2 de dos cuerpos con la manta crema tejida en el brazo
  const sm = mat(0x16243d, 0.85), sm2 = mat(0x1f3254, 0.85);
  LIV.add(caja(1.9, 0.3, 0.85, sm, 0, 0.2, -0.55, 0.06)); for (const x of [-0.46, 0.46]) LIV.add(caja(0.9, 0.16, 0.74, sm2, x, 0.42, -0.5, 0.07));
  LIV.add(caja(1.9, 0.62, 0.22, sm, 0, 0.6, -0.9, 0.08)); for (const x of [-0.98, 0.98]) LIV.add(caja(0.22, 0.6, 0.85, sm, x, 0.35, -0.55, 0.08));
  const tejidoT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#d9d4c0"; x.lineWidth = 6; for (let i = 0; i < 16; i++) { x.beginPath(); for (let y = 0; y <= h; y += 16) x.lineTo(i * 16 + 8 + (y / 16) % 2 * 6, y); x.stroke(); } });
  const manta = mesh(rbox(0.3, 0.08, 0.86, 0.035, 2), new THREE.MeshStandardMaterial({ map: tejidoT, roughness: 0.95 }), 1.0, 0.67, -0.5); LIV.add(manta);
  const manta2 = mesh(rbox(0.28, 0.4, 0.04, 0.02, 2), new THREE.MeshStandardMaterial({ map: tejidoT, roughness: 0.95 }), 1.1, 0.48, -0.1); LIV.add(manta2);
  // la mesita baja de madera clara con la taza navy
  LIV.add(caja(0.9, 0.04, 0.5, mat(0xc9a774, 0.7), 0.1, 0.42, 0.45, 0.012)); for (const [x, z] of [[-0.3, 0.26], [0.5, 0.26], [-0.3, 0.64], [0.5, 0.64]]) LIV.add(caja(0.035, 0.4, 0.035, mat(0xb08c5a, 0.7), x, 0.2, z, 0.006));
  const taza = new THREE.Group(); taza.position.set(0.32, 0.44, 0.4); LIV.add(taza);
  taza.add(mesh(new THREE.CylinderGeometry(0.04, 0.034, 0.09, 18), M.navy, 0, 0.045, 0)); taza.add(mesh(new THREE.TorusGeometry(0.024, 0.008, 8, 14), M.navy, 0.045, 0.05, 0));
  sombras(LIV);
}

// ---------- luces ----------
const cieloDep = new THREE.HemisphereLight(0xf8f8f2, 0x6a665c, 2.0); scene.add(cieloDep);
const tubos = new THREE.DirectionalLight(0xfbfbf4, 1.5); tubos.position.set(0.6, 4.5, 2.2); tubos.target.position.set(0, 0.6, -0.6);
tubos.castShadow = true; tubos.shadow.mapSize.set(2048, 2048); tubos.shadow.radius = 4; Object.assign(tubos.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 12 }); tubos.shadow.bias = -0.0006; scene.add(tubos, tubos.target);
const relleno = new THREE.DirectionalLight(0xe8eefa, 0.6); relleno.position.set(-3, 2.5, 4); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const solLiv = new THREE.DirectionalLight(0xfff1dc, 1.7); solLiv.position.set(LX - 2.5, 3.2, 2.5); solLiv.target.position.set(LX, 0.6, -0.5); solLiv.castShadow = true; solLiv.shadow.mapSize.set(1024, 1024); Object.assign(solLiv.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 12 }); scene.add(solLiv, solLiv.target);
const cieloLiv = new THREE.HemisphereLight(0xf3f5f6, 0x7a7466, 1.7); scene.add(cieloLiv);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
// Paola, la dueña (~38): piel media, morocha de rodete alto, buzo canguro verde de marca (la única que viste verde), jean
// oscuro, zapatillas crema. Mica (~23): clara, castaño claro de coleta baja, remera navy3 y chaleco de depósito crema.
const paola = crearPersonaje({ ...DEFECTO, nombre: "Paola", mejillasBajas: true, piel: PIEL.media, pelo: 0x2a1a12, peinado: "rodete", cejasColor: 0x22160f, pestanas: 0x1a1414, cuelloFino: true,
  camisa: MARCA.g, mangas: "largas", cuello: MARCA.g, cuelloBotones: false, cuelloAlto: 0.07, pantalon: MARCA.navy2, zapatos: MARCA.cr, aros: MARCA.cr,
  labiosPegados: true, labios: 0xa8524f, mejillas: 0xd08470, panza: 1.0, nariz: 0.048, alto: 1.0, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const mica = crearPersonaje({ ...DEFECTO, nombre: "Mica", mejillasBajas: true, piel: PIEL.clara, pelo: 0x8a5a34, peinado: "coleta", cejasColor: 0x6a4428, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true,
  camisa: MARCA.navy3, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, cuelloAlto: 0.05, chaleco: { color: MARCA.cr2, botones: MARCA.navy3 },
  pantalon: 0x3a3f4a, zapatos: MARCA.navy, labiosPegados: true, labios: 0xb35a5a, mejillas: 0xe8968a, panza: 0.96, nariz: 0.045, alto: 0.95, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const walter = crearPersonaje({ ...ELENCO.walter, corbata: null, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
// el cúter navy colgado del bolsillo del chaleco de Mica (sin hoja)
{ const c = caja(0.022, 0.1, 0.012, M.navy, -0.13, 0.2, 0.17, 0.005); c.rotation.z = 0.15; mica.cuerpo.add(c); }
const TODOS = [paola, mica, graciela, walter];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// los celulares: el de Paola (funda verde de marca) y el de Graciela (funda verde oscuro)
const pantP = lienzo(600, 1110, () => {});
const pantG = lienzo(600, 1110, () => {});
const celP = crearCelular(pantP, MARCA.g, 0.08 * 1.25, 0.162 * 1.25); scene.add(celP);
const celG = crearCelular(pantG, C.gd, 0.08 * 1.25, 0.162 * 1.25); scene.add(celG);

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (los celulares y las burbujas) ----
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
  AVATAR.graciela = leer(graciela, 0xb9cde0); AVATAR.paola = leer(paola, 0xefeee5); AVATAR.mica = leer(mica, 0xb9cde0);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// el ícono de audio de chat (para la cabecera de las burbujas de Graciela): el avatar con un triangulito de play
function parlante(x, cx, cy, r) {
  avatar(x, AVATAR.graciela, cx, cy, r);
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(cx + r * 0.78, cy + r * 0.7, r * 0.42, 0, 7); x.fill();
  x.fillStyle = "#5ce611"; x.beginPath(); x.moveTo(cx + r * 0.66, cy + r * 0.48); x.lineTo(cx + r * 1.0, cy + r * 0.7); x.lineTo(cx + r * 0.66, cy + r * 0.92); x.closePath(); x.fill();
}
// la onda de un audio de chat (barras), de largo `w`, con lo escuchado en `u`
function onda(x, x0, cy, w, u, color, gris) { semilla = 31; for (let i = 0; i < 22; i++) { const h = 10 + az() * 44; x.fillStyle = i / 22 < u ? color : gris; x.beginPath(); x.roundRect(x0 + (i * w) / 22, cy - h / 2, (w / 22) * 0.55, h, 4); x.fill(); } }

// ================= PANTALLAS =================
const cabCel = (x, w, t1, t2, cv = null) => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#5ce611"; x.fillRect(0, 150, w, 8);
  const x0 = cv ? 150 : 30; if (cv) avatar(x, cv, 76, 76, 50);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, t1, 800, 50, w - x0 - 30); x.fillText(t1, x0, 56); x.fillStyle = "#5ce611"; ajustar(x, t2, 700, 38, w - x0 - 30); x.fillText(t2, x0, 112);
};
// el catálogo de "Casa Pao": la tarjeta de la freidora con los tres colores y su stock
function catalogo(x, w, h, verde, { boton = null } = {}) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  cabCel(x, w, "Casa Pao · Importados", "Tienda online");
  x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, 182, w - 48, 380, 30); x.fill();
  // la foto de la freidora (dibujo plano con los colores del 3D)
  x.fillStyle = "#e3e9e4"; x.beginPath(); x.roundRect(44, 202, w - 88, 230, 22); x.fill();
  { const cx = w / 2, cy = 318, s = 170; x.fillStyle = "#8fc7a0"; x.beginPath(); x.roundRect(cx - s * 0.45, cy - s * 0.5, s * 0.9, s, s * 0.26); x.fill(); x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(cx - s * 0.44, cy - s * 0.56, s * 0.88, s * 0.2, s * 0.08); x.fill(); x.fillStyle = "#79ad89"; x.beginPath(); x.roundRect(cx - s * 0.36, cy - s * 0.04, s * 0.72, s * 0.44, s * 0.1); x.fill(); x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(cx - s * 0.2, cy + s * 0.06, s * 0.4, s * 0.1, s * 0.05); x.fill(); }
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "Freidora de aire 4 L", 900, 48, w - 90); x.fillText("Freidora de aire 4 L", 46, 476);
  x.font = F(900, 56); x.fillText("$ 4.990", 46, 532);
  // los tres colores con su stock
  const fil = [["Verde", "#8fc7a0", verde], ["Azul", "#1f3254", "Quedan 25"], ["Crema", "#efeee5", "Quedan 4"]];
  fil.forEach(([n, c, st], i) => {
    const y = 590 + i * 112, sin = st === "Sin stock", ok = i === 0 && !sin;
    x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, y, w - 48, 98, 24); x.fill();
    if (i === 0) { x.strokeStyle = sin ? "#5a6478" : "#0b1220"; x.lineWidth = 6; x.stroke(); }
    x.fillStyle = c; x.beginPath(); x.arc(78, y + 49, 30, 0, 7); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 4; x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText(n, 124, y + 50);
    const tw = (x.font = F(900, 44), x.measureText(st).width) + 40;
    x.fillStyle = sin ? "#5a6478" : ok ? "#5ce611" : "#d9d7c9"; x.beginPath(); x.roundRect(w - 48 - tw, y + 22, tw, 56, 28); x.fill();
    x.fillStyle = sin ? "#efeee5" : "#0b1220"; x.textAlign = "center"; x.fillText(st, w - 48 - tw / 2, y + 51); x.textAlign = "left";
  });
  if (boton) {
    x.fillStyle = boton.color ?? "#5ce611"; x.beginPath(); x.roundRect(40, 940, w - 80, 130, 65); x.fill();
    if (boton.toca) { x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.stroke(); }
    x.fillStyle = boton.tinta ?? "#0b1220"; x.textAlign = "center"; ajustar(x, boton.txt, 900, 58, w - 140); x.fillText(boton.txt, w / 2, 1006); x.textAlign = "left";
  }
}
// ---- el celular de Paola: el chat con Graciela (parte 1) · el catálogo (Q1) ----
let claveP = "";
function dibujarCelP(t) {
  const w = 600, h = 1110;
  if (t >= P2) {
    const verde = t >= T.baja ? "Queda 1" : "Quedan 2";
    const clave = `cat|${verde}`; if (clave === claveP) return; claveP = clave;
    catalogo(pantP.userData.x, w, h, verde); pantP.needsUpdate = true; return;
  }
  const n = [T.g1, T.pa1 + 0.3, T.pagado, T.pa2 + 0.3, T.reint, T.g2].filter((a) => t >= a).length;
  const oye = t >= T.g2 ? Math.min(10, Math.floor(sg(t, T.g2, T.g2 + LEN.g2) * 10)) : t >= T.g1 ? Math.min(10, Math.floor(sg(t, T.g1, T.g1 + LEN.g1) * 10)) : 0;
  const clave = `chat|${n}|${oye}`; if (clave === claveP) return; claveP = clave;
  const { x } = pantP.userData;
  x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, w, h);
  cabCel(x, w, "Graciela", "clienta de siempre", AVATAR.graciela);
  // los mensajes, de abajo hacia arriba (el último abajo)
  const M2 = [
    { de: "g", tipo: "audio", d: "0:02" },
    { de: "p", tipo: "audio", d: "0:02" },
    { de: "p", tipo: "pago", l1: "Pagado ✓", l2: "$ 4.990 · Freidora verde", c: "#5ce611" },
    { de: "p", tipo: "audio", d: "0:02" },
    { de: "p", tipo: "pago", l1: "Reintegro", l2: "$ 4.990", c: "#c7655b" },
    { de: "g", tipo: "audio", d: "0:03" },
  ].slice(0, n);
  let y = h - 40;
  for (let i = M2.length - 1; i >= 0 && y > 200; i--) {
    const m = M2[i], alto = m.tipo === "audio" ? 120 : 170, bw = m.tipo === "audio" ? 430 : 470, bx = m.de === "g" ? 26 : w - 26 - bw;
    y -= alto;
    x.fillStyle = m.de === "g" ? "#ffffff" : "#16243d"; x.beginPath(); x.roundRect(bx, y, bw, alto - 16, 28); x.fill();
    if (m.tipo === "audio") {
      const u = i === M2.length - 1 && m.de === "g" ? oye / 10 : 1;
      x.fillStyle = m.de === "g" ? "#16243d" : "#5ce611"; x.beginPath(); x.moveTo(bx + 34, y + 30); x.lineTo(bx + 74, y + 52); x.lineTo(bx + 34, y + 74); x.closePath(); x.fill();
      onda(x, bx + 100, y + 52, 230, u, m.de === "g" ? "#16243d" : "#5ce611", m.de === "g" ? "#b4b2a3" : "#4a5a78");
      x.fillStyle = m.de === "g" ? "#16243d" : "#efeee5"; x.font = F(700, 34); x.textAlign = "right"; x.fillText(m.d, bx + bw - 22, y + 54); x.textAlign = "left";
    } else {
      x.fillStyle = m.c; x.beginPath(); x.roundRect(bx + 16, y + 14, bw - 32, 126, 20); x.fill();
      x.fillStyle = "#0b1220"; ajustar(x, m.l1, 900, 54, bw - 70); x.fillText(m.l1, bx + 36, y + 52); ajustar(x, m.l2, 800, 38, bw - 70); x.fillText(m.l2, bx + 36, y + 106);
    }
    y -= 10;
  }
  pantP.needsUpdate = true;
}
// ---- el celular de Graciela (Q2): Queda 1 → Comprar → envío → Pagar → Pagado ✓ → Sin stock ----
let claveG = "";
function dibujarCelG(t) {
  const paso = t < T.comprar - 0.15 ? 0 : t < T.envio - 0.1 ? 1 : t < T.pagar + 0.05 ? 2 : t < T.sinStock - 0.05 ? 3 : 4;
  const toca = [T.comprar, T.envio, T.pagar].some((a) => t >= a - 0.18 && t < a + 0.02) ? 1 : 0;
  const clave = `${paso}|${toca}`; if (clave === claveG) return; claveG = clave;
  const { x } = pantG.userData, w = 600, h = 1110;
  if (paso === 0) catalogo(x, w, h, "Queda 1", { boton: { txt: "Comprar", toca } });
  else if (paso === 4) catalogo(x, w, h, "Sin stock", { boton: { txt: "Avisarme cuando vuelva", color: "#16243d", tinta: "#efeee5" } });
  else {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); cabCel(x, w, "Casa Pao · Importados", "Tu compra");
    x.textAlign = "left"; x.textBaseline = "middle";
    x.fillStyle = "#0b1220"; ajustar(x, "Freidora 4 L · Verde", 900, 46, w - 60); x.fillText("Freidora 4 L · Verde", 30, 210);
    x.fillStyle = "#1f3254"; ajustar(x, "¿Cómo lo recibís?", 800, 44, w - 60); x.fillText("¿Cómo lo recibís?", 30, 300);
    const op = [["Envío a domicilio", "$ 190", true], ["Retiro en el local", "$ 0", false]];
    op.forEach(([a, b, el], i) => {
      const y = 340 + i * 150; x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, y, w - 48, 132, 26); x.fill();
      if (el) { x.strokeStyle = "#5ce611"; x.lineWidth = 8; x.stroke(); }
      x.fillStyle = el ? "#5ce611" : "#ffffff"; x.beginPath(); x.arc(76, y + 66, 26, 0, 7); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.stroke();
      x.fillStyle = "#0b1220"; ajustar(x, a, 800, 42, 330); x.fillText(a, 122, y + 50); x.font = F(900, 46); x.fillText(b, 122, y + 100);
    });
    x.fillStyle = "#0b1220"; x.font = F(900, 60); x.fillText("Total $ 5.180", 30, 700);
    if (paso === 3) {
      x.fillStyle = "rgba(11,18,32,0.55)"; x.fillRect(0, 158, w, h - 158);
      x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(40, 380, w - 80, 380, 40); x.fill();
      x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, 500, 80, 0, 7); x.fill(); tilde(x, w / 2, 505, 92, "#5ce611");
      x.textAlign = "center"; ajustar(x, "Pagado", 900, 76, w - 120); x.fillText("Pagado", w / 2, 660);
    } else {
      x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(40, 940, w - 80, 130, 65); x.fill();
      if (toca) { x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.stroke(); }
      x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Pagar con tarjeta o débito", 900, 46, w - 130); x.fillText("Pagar con tarjeta o débito", w / 2, 1006);
    }
  }
  pantG.needsUpdate = true;
}
// ---- la tablet de Paola (parte 2): el pedido #214 (Q3) · el pedido por mayor (Q3c) · el ingreso del contenedor (Q4) ----
let claveT = "";
function dibujarTablet(t) {
  const w = 1280, h = 800;
  const modo = t < T.q4 ? "pedido" : "ingreso";
  const listo = t >= T.listo ? 1 : 0, mayor = t >= T.mayor ? 1 : 0, azul = t >= T.azul ? 1 : 0;
  const nScan = T.scan.filter((a) => t >= a).length, verde = Math.min(40, Math.round((nScan / T.scan.length) * 40)), q40 = t >= T.quedan40 ? 1 : 0;
  const clave = `${modo}|${listo}|${mayor}|${azul}|${verde}|${q40}`; if (clave === claveT) return; claveT = clave;
  const { x } = pantT.userData;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, w, 8);
  x.fillStyle = "#efeee5"; ajustar(x, "Casa Pao · Pedidos y stock", 800, 64, w - 80); x.fillText("Casa Pao · Pedidos y stock", 40, 62);
  if (modo === "pedido") {
    // el pedido de Graciela, pago y listo para despachar
    x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, 152, w - 48, mayor ? 300 : 420, 30); x.fill();
    avatar(x, AVATAR.graciela, 104, 236, 62);
    x.fillStyle = "#0b1220"; ajustar(x, "Pedido #214 · Graciela", 900, 68, 860); x.fillText("Pedido #214 · Graciela", 196, 210);
    x.fillStyle = "#1f3254"; ajustar(x, "Freidora 4 L verde · Envío a domicilio", 800, 56, 1040); x.fillText("Freidora 4 L verde · Envío a domicilio", 196, 276);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(52, 330, 350, 90, 45); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 54); x.fillText("Pagado ✓", 84, 377);
    if (listo) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(424, 330, 800, 90, 45); x.fill(); x.fillStyle = "#0b1220"; ajustar(x, "Listo para despachar ✓", 900, 54, 740); x.fillText("Listo para despachar ✓", 456, 377); }
    if (!mayor && listo) { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(52, 460, 520, 84, 42); x.fill(); x.fillStyle = "#efeee5"; x.font = F(800, 46); x.fillText("Imprimir etiqueta", 92, 503); }
    if (mayor) {
      x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, 476, w - 48, 300, 30); x.fill(); x.strokeStyle = "#5ce611"; x.lineWidth = 8; x.stroke();
      x.fillStyle = "#0b1220"; ajustar(x, "Pedido por mayor · Bazar del Puerto", 900, 60, w - 120); x.fillText("Pedido por mayor · Bazar del Puerto", 56, 540);
      x.fillStyle = "#1f3254"; x.font = F(800, 52); x.fillText("10 azules · Pagado ✓", 56, 610);
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(56, 652, 640, 100, 50); x.fill();
      x.fillStyle = "#efeee5"; x.font = F(900, 60); x.fillText(azul ? "Azul: 25 → 15" : "Azul: 25", 92, 704);
      if (azul) { x.fillStyle = "#5ce611"; x.font = F(800, 46); x.fillText("un solo stock ✓", 740, 704); }
    }
  } else {
    // el ingreso del contenedor: el contador sube con cada lectura; el catálogo vuelve a tener verdes
    x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(24, 152, w - 48, 330, 30); x.fill();
    x.fillStyle = "#1f3254"; ajustar(x, "Ingreso · Contenedor", 800, 56, 900); x.fillText("Ingreso · Contenedor", 56, 214);
    x.fillStyle = "#0b1220"; x.font = F(900, 150); x.fillText(`Verde: ${verde}`, 56, 370);
    x.fillStyle = "#d9d7c9"; x.beginPath(); x.roundRect(56, 438, w - 112, 22, 11); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(56, 438, Math.max(22, ((w - 112) * verde) / 40), 22, 11); x.fill();
    x.fillStyle = q40 ? "#5ce611" : "#5a6478"; x.beginPath(); x.roundRect(24, 506, w - 48, 130, 30); x.fill();
    x.fillStyle = q40 ? "#0b1220" : "#efeee5"; ajustar(x, q40 ? "Tienda · Verde: Quedan 40 ✓" : "Tienda · Verde: Sin stock", 900, 64, w - 110); x.fillText(q40 ? "Tienda · Verde: Quedan 40 ✓" : "Tienda · Verde: Sin stock", 56, 572);
    if (q40) { x.fillStyle = "#0b1220"; ajustar(x, "Les avisamos a 12 que esperaban", 800, 54, w - 110); x.fillText("Les avisamos a 12 que esperaban", 56, 700); }
  }
  pantT.needsUpdate = true;
}
// ---- la tablet del local (Q1): "Venta en el local · Verde −1" ----
let claveL = "";
function dibujarTabL(t) {
  const v = t >= T.ventaL ? 1 : 0; const clave = `${v}`; if (clave === claveL) return; claveL = clave;
  const { x } = pantL.userData, w = 1280, h = 800;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#efeee5"; x.font = F(800, 70); x.fillText("Caja · Local", 40, 68);
  x.fillStyle = "#0b1220"; x.font = F(900, 92); x.fillText("Freidora 4 L verde", 40, 250);
  x.fillStyle = v ? "#5ce611" : "#d9d7c9"; x.beginPath(); x.roundRect(40, 340, w - 80, 200, 40); x.fill();
  x.fillStyle = "#0b1220"; x.font = F(900, 100); x.fillText(v ? "Vendida ✓ · Verde −1" : "Cobrar $ 4.990", 80, 442);
  if (v) { x.fillStyle = "#1f3254"; x.font = F(800, 70); x.fillText("Se descuenta del stock ✓", 40, 650); }
  pantL.needsUpdate = true;
}
// ================= TARJETAS PEGADAS A LA CÁMARA: globos, rótulos, guías (de veterinaria-vacunas) =================
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
  const limpio = (s) => s.replace(/[[\]]/g, "");
  x.font = F(800, px); x.textBaseline = "middle"; x.textAlign = "left";
  const partes = l.split(/(\[[^\]]+\])/).filter(Boolean);
  const anchos = partes.map((p) => x.measureText(limpio(p)).width + (p.startsWith("[") ? px * 0.5 : 0));
  let xx = cx - anchos.reduce((a, b) => a + b, 0) / 2;
  partes.forEach((p, k) => {
    if (p.startsWith("[")) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = px * 0.1; x.beginPath(); x.roundRect(xx + px * 0.05, y - px * 0.62, anchos[k] - px * 0.1, px * 1.24, px * 0.12); x.fill(); x.stroke(); x.fillStyle = tinta; x.fillText(limpio(p), xx + px * 0.25, y + px * 0.04); }
    else if (p.startsWith("{")) { x.fillStyle = "#c7655b"; x.fillText(p.slice(1, -1), xx, y + px * 0.04); }
    else { x.fillStyle = tinta; x.fillText(p, xx, y + px * 0.04); }
    xx += anchos[k];
  });
}
// globo de diálogo (texto grande); cab = { cv, nombre } (avatar) o { icono: "parlante", nombre }; minW = ancho mínimo
function crearGlobo(lineas, px = 80, { cab = null, minW = 0 } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const cabH = cab ? Math.round(px * 1.15) : 0, cabF = Math.max(Math.round(px * 0.6), 40);
  med.font = F(700, cabF); const anchoCab = cab ? med.measureText(cab.nombre).width + cabF * 2.4 : 0; med.font = F(800, px);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.max(minW, Math.round(anchoT + px * 1.2)), H = Math.round(lineas.length * px * 1.22 + px * 0.75 + cabH);
  return crearTarjeta(Wg, H, (x, w, h) => {
    if (cab) {
      const r = cabF * 0.78, cy = px * 0.25 + r, cx = px * 0.35 + r;
      if (cab.icono) parlante(x, cx, cy, r); else avatar(x, cab.cv, cx, cy, r);
      x.fillStyle = "#1f3254"; x.font = F(700, cabF); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(cab.nombre, cx + r + px * 0.25, cy + 2);
    }
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + (h - cabH) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  });
}
// el rótulo: caja navy, texto crema (o rojo apagado), borde crema
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
// REGLA DE BURBUJAS (de veterinaria-vacunas): la burbuja va arriba del que habla, con su borde de abajo ~100 px sobre la
// coronilla y la cola terminando en el pelo, nunca en la cara. Si no entra (o el que habla queda cortado), se anota en
// AVISOS (prev.mjs lo imprime).
const AVISOS = [];
const coronillaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(V3(0, 0.62, 0))); };
function hablar(g, per, s, orden = 1, dx = 0, minY = 250) {
  const [hx, hy] = coronillaPx(per), [mx, my] = bocaPx(per);
  const { H } = g.userData;
  const cy = hy - 100 - H / 2;
  if (cy - H / 2 < minY - 10) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  if (mx < 70 || mx > 1010 || hy < 0 || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, Math.max(cy, H / 2 + minY), s, [hx, hy + 6], orden);
}

// ================= GLOBOS, RÓTULOS, NOTIFICACIONES, LA HISTORIA =================
const AUD = { icono: "audio", nombre: "Graciela · audio" };
const GL = {
  g1: crearGlobo(["Pao, ¿tenés [stock]", "de la verde?"], 74, { cab: AUD }),
  pa1: crearGlobo(["¡Sí! La última.", "Hoy [te la mando.]"], 76),
  mi1: crearGlobo(["¡Pao! La verde la", "vendí [en el local.]"], 72),
  pa2: crearGlobo(["Graciela, perdoname:", "{se me agotó.}"], 70),
  g2: crearGlobo(["Ay. Bueno, la compro", "[en otro lado.]"], 66, { cab: AUD }),
  mi2: crearGlobo(["Pao. ¿Y estas [cajas?]"], 74),
  pa3: crearGlobo(["Del contenedor", "de [marzo.]"], 84),
  pa4: crearGlobo(["¡Hola! ¡Ingreso [nuevo!]"], 74),
  mi1b: crearGlobo(["¡Pao! La verde la", "vendí [en el local.]"], 72),
  pa5: crearGlobo(["Ya lo sabe [la tienda.]"], 76),
  g3: crearGlobo(["Queda una. [¡Mía!]"], 84),
  pa4b: crearGlobo(["¡Hola! ¡Ingreso [nuevo!]"], 74),
  pa6: crearGlobo(["Ya se [enteraron.]"], 84),
};
const ROT = {
  pagado: crearRotulo([["Pagado ✓ · $ 4.990", "#5ce611", 56]], 56),
  reint: crearRotulo([["Reintegro · $ 4.990", "#c7655b", 56]], 56),
  dos: crearRotulo([["Vendida dos veces", "#c7655b", 60]], 60),
  perdida: crearRotulo([["Venta perdida: $ 4.990", "#c7655b", 56]], 56),
  verdes: crearRotulo([["40 verdes sin cargar", "#c7655b", 62]], 62),
  parados: crearRotulo([["$ 199.600 parados", "#c7655b", 60], ["desde marzo", "#c7655b", 60]], 60),
  q1: crearRotulo([["El stock real,", null, 54], ["a la vista", "#5ce611", 64]], 54),
  local: crearRotulo([["Venta en el local", null, 50], ["Verde −1 ✓", "#5ce611", 62]], 50),
  q2: crearRotulo([["Ve, paga y elige el envío.", null, 50], ["Sin preguntar.", "#5ce611", 62]], 50),
  q3: crearRotulo([["Un solo stock:", null, 54], ["tienda, local y por mayor", "#5ce611", 52]], 52),
  q4: crearRotulo([["Avisa sola", null, 56], ["cuando vuelve", "#5ce611", 64]], 56),
};
const GUIAS = [crearGuia(), crearGuia()];
// el contador de la historia: "Quedan 40" → "Quedan 28" (se redibuja)
function crearDinamico(Wg, H, fondo) {
  const g = crearTarjeta(Wg, H, () => {}, { fondo, borde: C.cr });
  g.userData.poner = (txt, color) => {
    if (g.userData.txt === txt) return; g.userData.txt = txt;
    const tex = g.userData.tex, { x } = tex.userData;
    x.save(); x.setTransform(1, 0, 0, 1, 0, 0); x.fillStyle = fondo; x.fillRect(0, 0, Wg * 2, H * 2); x.scale(2, 2);
    x.fillStyle = color; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 900, H * 0.56, Wg - 40); x.fillText(txt, Wg / 2, H / 2 + 3); x.restore();
    tex.needsUpdate = true;
  };
  return g;
}
const contador = crearDinamico(560, 130, "#16243d");
// las 12 notificaciones "Pedido pagado ✓" que le llueven a Paola en la historia
const NOTIS = Array.from({ length: 12 }, (_, i) => crearTarjeta(860, 118, (x, w, h) => {
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(64, h / 2, 40, 0, 7); x.fill(); tilde(x, 64, h / 2 + 2, 42, "#0b1220");
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 50); x.fillText("Pedido pagado ✓", 124, 42);
  x.fillStyle = "#1f3254"; x.font = F(700, 36); x.fillText(["Freidora verde · Envío", "Freidora verde · Retiro", "Freidora verde · Envío"][i % 3], 124, 88);
  x.fillStyle = "#5a6478"; x.font = F(700, 34); x.textAlign = "right"; x.fillText("ahora", w - 30, 42);
}));
// el marco de la historia (genérico: barras arriba, el avatar, el botón de grabar abajo; sin logos)
const histT = lienzo(540, 960, (x, w, h) => {
  x.clearRect(0, 0, w, h);
  const gr = x.createLinearGradient(0, 0, 0, 150); gr.addColorStop(0, "rgba(11,18,32,0.45)"); gr.addColorStop(1, "rgba(11,18,32,0)"); x.fillStyle = gr; x.fillRect(0, 0, w, 150);
  for (let i = 0; i < 3; i++) { x.fillStyle = i === 0 ? "rgba(239,238,229,0.95)" : "rgba(239,238,229,0.45)"; x.beginPath(); x.roundRect(18 + i * ((w - 36) / 3), 18, (w - 36) / 3 - 8, 7, 4); x.fill(); }
  avatar(x, AVATAR.paola, 52, 66, 26); x.strokeStyle = "#5ce611"; x.lineWidth = 4; x.beginPath(); x.arc(52, 66, 29, 0, 7); x.stroke();
  x.fillStyle = "#efeee5"; x.font = F(800, 26); x.textAlign = "left"; x.textBaseline = "middle"; x.shadowColor = "rgba(0,0,0,0.5)"; x.shadowBlur = 6; x.fillText("Casa Pao · Importados", 92, 62); x.shadowBlur = 0;
  x.strokeStyle = "#efeee5"; x.lineWidth = 8; x.beginPath(); x.arc(w / 2, h - 70, 40, 0, 7); x.stroke();
  x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2, h - 70, 28, 0, 7); x.fill();
});
const hist = pegarACamara(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: histT, transparent: true, toneMapped: false })), camera, 36);
function ponerHist(on) { hist.visible = on; if (!on) return; const k = halfK(); hist.position.set(0, 0, -1); hist.scale.set(1080 * k, 1920 * k, 1); }

// ================= POSICIONES =================
const PA = { x: -1.02, z: -0.68, giro: 0.95 };           // Paola en el aro de luz (P1-P3, Q1b)
const PB = { x: -0.66, z: 0.86, giro: 0.42 };           // Paola delante de la mesa (P6-P8, Q4b-Q5)
const MI0 = { x: 3.1, z: 0.62 }, MI1 = { x: 0.47, z: 0.76 };   // Mica: la puerta del local → al lado de la mesa
const MC = { x: 0.8, z: 0.68 };                         // Mica agachada al lado del papel (P6)
const MS = { x: 1.0, z: -0.42 };                        // Mica con la pistola lectora (Q4)
const ME = { x: 0.8, z: 0.72 };                          // Mica pega la etiqueta (Q3b)
const MLOC = { x: MOST.x - 0.58, z: MOST.z - 0.1 }, WLOC = { x: MOST.x + 0.62, z: MOST.z + 0.05 };
const GS = { x: LX - 0.42, z: -0.42 };                   // Graciela en el sillón

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
const CAM_P1 = (k) => [lerp(0.98, 0.84, k), lerp(1.78, 1.72, k), lerp(2.15, 1.95, k), -0.36, 1.0, -0.2, 50];
const CAM_CUAD = (k) => [lerp(-1.3, -1.34, k), 1.5, lerp(2.08, 2.0, k), -1.2, 1.34, 0.2, 50];
const CAM_GEN = (k) => [lerp(0.25, 0.2, k), lerp(1.7, 1.66, k), lerp(4.05, 3.9, k), 0.25, 0.95, 0.1, 56];
const CAM_P4 = (k) => [lerp(-1.12, -1.14, k), 1.42, lerp(1.72, 1.58, k), -1.12, 1.22, -0.66, 40];
const CAM_HUECO = (k) => [lerp(0.92, 0.86, k), lerp(1.72, 1.68, k), lerp(2.32, 2.2, k), -0.38, 0.98, 0.0, 50];
const CAM_P6 = (k) => [lerp(-0.3, -0.26, k), lerp(0.62, 0.64, k), lerp(2.85, 2.7, k), 0.5, 0.8, 0.3, 58];
const CAM_P7 = (k) => [lerp(0.3, 0.24, k), 1.42, lerp(3.02, 2.92, k), -0.8, 1.24, 0.86, 40];
const CAM_PARED = (k) => [lerp(-1.2, 1.1, k), 1.2, -0.72, lerp(-1.2, 1.1, k) + 0.15, 1.05, -2.0, 64];
const CAM_P8 = (k) => [lerp(0.62, 0.55, k), 1.42, lerp(3.4, 3.25, k), -0.62, 1.12, 0.86, 42];
const CAM_LOC = (k) => [lerp(MOST.x + 0.5, MOST.x + 0.4, k), 1.7, lerp(3.7, 3.5, k), MOST.x - 0.05, 1.1, MOST.z - 0.2, 52];
const CAM_Q1B = (k) => [lerp(0.7, 0.58, k), 1.5, lerp(2.15, 1.95, k), -0.62, 1.1, -0.35, 50];
const CAM_LIV = (k) => [LX + lerp(0.62, 0.5, k), 1.32, lerp(2.25, 2.05, k), GS.x + 0.1, 0.92, GS.z, 46];
const CAM_ETQ = (k) => [lerp(-1.15, -1.05, k), 1.48, lerp(0.95, 0.9, k), 0.55, 1.0, 0.45, 46];
const CAM_SCAN = (k) => [lerp(2.5, 2.42, k), 1.5, lerp(1.35, 1.22, k), 1.25, 0.95, -0.55, 52];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, [[T.p2, ...CAM_P1(1)], [T.p2 + 0.45, ...CAM_CUAD(0)], [T.p3, ...CAM_CUAD(1)]]],
  ["P3", T.p3, [[T.p3, ...CAM_GEN(0)], [T.p4, ...CAM_GEN(1)]]],
  ["P4", T.p4, [[T.p4, ...CAM_P4(0)], [T.p5, ...CAM_P4(1)]]],
  ["P5", T.p5, null],   // el celular de Paola de cerca (el audio de Graciela, el chat con el reintegro)
  ["P5b", T.p5b, [[T.p5b, ...CAM_HUECO(0)], [T.p6, ...CAM_HUECO(1)]]],
  ["P6", T.p6, [[T.p6, ...CAM_P6(0)], [T.p7, ...CAM_P6(1)]]],
  ["P7", T.p7, [[T.p7, ...CAM_P7(0)], [T.p7b, ...CAM_P7(1)]]],
  ["P7b", T.p7b, [[T.p7b, ...CAM_PARED(0)], [T.p8, ...CAM_PARED(1)]]],
  ["P8", T.p8, [[T.p8, ...CAM_P8(0)], [T.p8b, ...CAM_P8(1)]]],
  ["P8b", T.p8b, null],   // contraplano: la historia, desde el celular
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...CAM_LOC(0)], [T.q1b, ...CAM_LOC(1)]]],
  ["Q1b", T.q1b, [[T.q1b, ...CAM_Q1B(0)], [T.q1i, ...CAM_Q1B(1)]]],
  ["Q1i", T.q1i, null],   // el catálogo en el celular de Paola
  ["Q2", T.q2, [[T.q2, ...CAM_LIV(0)], [T.q2i, ...CAM_LIV(1)]]],
  ["Q2i", T.q2i, null],   // la compra en el celular de Graciela
  ["Q3", T.q3, null],     // la tablet: el pedido #214
  ["Q3b", T.q3b, [[T.q3b, ...CAM_ETQ(0)], [T.q3c, ...CAM_ETQ(1)]]],
  ["Q3c", T.q3c, null],   // la tablet: el pedido por mayor
  ["Q4", T.q4, [[T.q4, ...CAM_SCAN(0)], [T.q4t, ...CAM_SCAN(1)]]],
  ["Q4t", T.q4t, null],   // la tablet: el ingreso del contenedor
  ["Q4b", T.q4b, [[T.q4b, ...CAM_P8(0)], [T.q4c, ...CAM_P8(0.6)]]],
  ["Q4c", T.q4c, null],   // contraplano: la historia, le llueven los pedidos
  ["Q4d", T.q4d, [[T.q4d, ...CAM_P8(0.6)], [T.q5, ...CAM_P8(1)]]],
  ["Q5", T.q5, null],     // el cierre: la historia de frente
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); } }
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  if (b === a || b[0] <= a[0]) return a.slice(1, 8);   // después de la última clave (el último cuadro) quieta, sin NaN
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
// la cámara de frente a una pantalla (plano local del objeto) que llena `llena` del alto del cuadro: [px..mz, fov]
function vistaPantalla(obj, centroLocal, normalLocal, alto, llena, fov, dy = 0) {
  obj.updateMatrixWorld(true);
  const c = obj.localToWorld(centroLocal.clone()), n = normalLocal.clone().transformDirection(obj.matrixWorld);
  const d = alto / llena / (2 * Math.tan((fov * D2R) / 2));
  const up = V3(0, 1, 0).transformDirection(obj.matrixWorld);
  c.add(up.clone().multiplyScalar(dy));
  const p = c.clone().add(n.multiplyScalar(d));
  return { v: [p.x, p.y, p.z, c.x, c.y, c.z, fov], up };
}
function ponerVista(a, b, u, upA, upB) {
  const v = a.map((x, i) => lerp(x, b[i], u));
  camera.position.set(v[0], v[1], v[2]); camera.fov = v[6]; camera.updateProjectionMatrix();
  camera.up.copy((upA || V3(0, 1, 0)).clone().lerp(upB || V3(0, 1, 0), u).normalize()); camera.lookAt(v[3], v[4], v[5]);
}
const lerpV = (a, b, u) => a.map((v, i) => lerp(v, b[i], u));

// ================= POSES =================
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.9, tension: 0.12, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.95 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (!p.boca) p.boca = { sonrisa: 0.1, abierta: 0, ancho: 1 }; if (!p.ojos) p.ojos = { abiertos: 1 };
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta ?? 0, cl(e * 1.1 - 0.05) * k); }
  { const h = sg(t, t0 - 0.12, t0) * (1 - sg(t, t0 + env.length / 30, t0 + env.length / 30 + 0.15)); if (h > 0) p.boca.sonrisa = lerp(p.boca.sonrisa ?? 0, Math.min(p.boca.sonrisa ?? 0, 0.08), h); }   // hablando, el arco de la sonrisa se apaga (sin boca doble)
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos ?? 1, 0.85);   // hablando, nunca con los ojos cerrados
};
const _w = new THREE.Vector3();
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });

// mirar a un punto del mundo: giro y cabeceo de la cabeza en el espacio del personaje parado en (x, z) con giro g
function mirar(x, z, g, w, alto = 1.48, lim = 0.75) {
  const dx = w.x - x, dz = w.z - z;
  const lx = dx * Math.cos(g) - dz * Math.sin(g), lz = dx * Math.sin(g) + dz * Math.cos(g);
  const giro = cl(Math.atan2(lx, lz), -lim, lim), asiente = cl(Math.atan2(alto - w.y, Math.hypot(dx, dz)), -0.4, 0.6);
  return { cabeza: { giro, asiente, ladea: 0.02 }, ojos: { x: cl(giro * 0.5, -0.6, 0.6), y: cl(-asiente * 0.8, -0.8, 0.4) } };
}
const caraDe = (per) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(0, 0.2, 0.25)); };
// ---------- Paola ----------
const SELFIE = { manoI: [0.09, 0.36, 0.58], manoD: [-0.09, 0.36, 0.58], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2], dedoI: 0, dedoD: 0 };
function posePaola(t) {
  const pr = { x: PA.x, y: 0, z: PA.z, giro: PA.giro, inclina: 0.03, ...CARA.neutra, ...BRAZOS.costado, t };
  const ring = ARO.userData.cab.getWorldPosition(new THREE.Vector3());
  if (t < P2) {
    if (t < T.p4) {
      // P1-P3: trabajando en el aro de luz (la mano derecha en el celular del aro), segura
      Object.assign(pr, mirar(PA.x, PA.z, PA.giro, ring, 1.48), { ojos: { abiertos: 1, x: 0, y: -0.4, feliz: 0.15 }, boca: { sonrisa: 0.3, abierta: 0, ancho: 1 }, cejas: { alto: 0.1, ang: 0 } });
      pr.toca = 1;
      if (t >= T.p2) { const u = eio(sg(t, T.p2, T.p2 + 0.35)); pr.giro = lerp(PA.giro, 0.05, u); pr.toca = u < 0.4 ? 1 : 0; const m = mirar(PA.x, PA.z, pr.giro, cuaderno.getWorldPosition(new THREE.Vector3()), 1.48); pr.cabeza = { giro: lerp(pr.cabeza.giro, m.cabeza.giro, u), asiente: lerp(pr.cabeza.asiente, m.cabeza.asiente, u), ladea: 0.04 }; pr.ojos = { abiertos: 1, x: m.ojos.x * u, y: lerp(-0.4, m.ojos.y, u), feliz: 0.3 }; Object.assign(pr, { boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 }, cejas: { alto: 0.3, ang: 0.05 } }); }
      if (t >= T.p3) { pr.giro = lerp(0.05, 0.42, eio(sg(t, T.p3, T.p3 + 0.5))); Object.assign(pr, mirar(PA.x, PA.z, pr.giro, V3(0.5, 1.2, 0.6), 1.48)); pr.ojos = { abiertos: 0.95, x: 0, y: -0.45, feliz: 0.1 }; pr.boca = { sonrisa: 0.25, abierta: 0, ancho: 1 }; }
      bocaVoz(pr, t, T.pa1, ENV.pa1, 0.65);
      return pr;
    }
    if (t < T.p6 + 0.25) {
      // P4-P5b: el celular al pecho; "Graciela, perdoname: se me agotó." (apenada); P5b mira el hueco
      pr.giro = lerp(PA.giro, 0.42, eio(sg(t, T.p4 - 0.2, T.p4)));
      Object.assign(pr, BRAZOS.celular, { cabeza: { giro: 0.05, asiente: 0.32, ladea: 0.05 }, ojos: { abiertos: 0.9, x: 0, y: -0.75, tension: 0.4 }, cejas: { alto: 0.35, ang: 0.6 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.95 } });
      if (t >= T.p5b) { const m = mirar(PA.x, PA.z, pr.giro, FR_MESA.clone().add(V3(0, 0.15, 0)), 1.48); Object.assign(pr, m, CARA.incredula); pr.ojos = { ...m.ojos, abiertos: 0.7, tension: 0.1 }; pr.cejas = { alto: 0.15, ang: 0.2, asim: 0.7 }; }
      bocaVoz(pr, t, T.pa2, ENV.pa2, 0.6);
      return pr;
    }
    // P6-P8: camina hasta delante de la mesa (aparece arriba en el plano bajo) y se queda ahí
    const u = t >= T.p7 ? 1 : 0;
    Object.assign(pr, { x: lerp(PA.x, PB.x, u), z: lerp(PA.z, PB.z, u), giro: lerp(PA.giro, PB.giro, u), paso: u > 0.02 && u < 0.98 ? 1 : 0, ...BRAZOS.celular });
    const cajasW = V3(0.1, 0.45, 0.45);
    Object.assign(pr, mirar(pr.x, pr.z, pr.giro, cajasW, 1.48), { ...NADA, ojos: { abiertos: 0.85, x: 0.2, y: -0.7, tension: 0.05 } });
    if (t >= T.p7) {
      // P7: de frente, cara de nada, seca
      Object.assign(pr, { x: PB.x, z: PB.z, giro: PB.giro, paso: 0, ...NADA }); pr.cabeza = { giro: -0.08, asiente: 0.05, ladea: 0.0 }; pr.ojos = { abiertos: 0.82, x: 0.05, y: -0.1, tension: 0.05 }; pr.cejas = { alto: -0.05, ang: 0.05 }; pr.boca = { sonrisa: -0.12, abierta: 0, ancho: 0.9 };
      bocaVoz(pr, t, T.pa3, ENV.pa3, 0.5);
    }
    if (t >= T.p8) {
      // P8: sin pestañear, levanta el celular en modo historia: sonrisa de vendedora de redes
      const k = eio(sg(t, T.levanta, T.levanta + 0.3));
      const B = BRAZOS.celular;
      pr.manoI = lerpV(B.manoI, SELFIE.manoI, k); pr.manoD = lerpV(B.manoD, SELFIE.manoD, k); pr.codoI = SELFIE.codoI; pr.codoD = SELFIE.codoD;
      const s = eio(sg(t, T.pa4 - 0.25, T.pa4 - 0.05));
      pr.cabeza = { giro: -0.04, asiente: lerp(0.05, -0.04, s), ladea: lerp(0, 0.1, s) }; pr.ojos = { abiertos: 1, x: 0, y: lerp(-0.1, -0.2, s), feliz: 0.45 * s };
      pr.cejas = { alto: lerp(-0.05, 0.6, s), ang: 0.1 }; pr.boca = { sonrisa: lerp(-0.12, 1.0, s), abierta: 0, ancho: lerp(0.9, 1.2, s) };
      bocaVoz(pr, t, T.pa4, ENV.pa4, 0.75);
    }
    return pr;
  }
  // ---- parte 2 ----
  if (t < T.q4b) {
    // Q1b: le saca fotos a la crema con el celular, sin levantar la vista, tranquila
    Object.assign(pr, { x: PA.x, z: PA.z, giro: 0.84, ...BRAZOS.celular });
    pr.manoI = [0.08, 0.5, 0.36]; pr.manoD = [-0.08, 0.5, 0.36];
    pr.cabeza = { giro: 0.0, asiente: 0.25, ladea: 0.04 }; pr.ojos = { abiertos: 0.95, x: 0, y: -0.5, feliz: 0.35 }; pr.boca = { sonrisa: 0.55, abierta: 0, ancho: 1.05 }; pr.cejas = { alto: 0.2, ang: 0 };
    bocaVoz(pr, t, T.pa5, ENV.pa5, 0.6);
    return pr;
  }
  // Q4b-Q5: delante de la mesa, el celular en modo historia
  Object.assign(pr, { x: PB.x, z: PB.z, giro: PB.giro, ...SELFIE });
  pr.cabeza = { giro: -0.04, asiente: -0.04, ladea: 0.1 }; pr.ojos = { abiertos: 1, x: 0, y: -0.2, feliz: 0.45 }; pr.cejas = { alto: 0.6, ang: 0.1 }; pr.boca = { sonrisa: 1.0, abierta: 0, ancho: 1.2 };
  if (t < T.levanta2 + 0.3) { const k = eio(sg(t, T.levanta2, T.levanta2 + 0.3)); const B = BRAZOS.celular; pr.manoI = lerpV(B.manoI, SELFIE.manoI, k); pr.manoD = lerpV(B.manoD, SELFIE.manoD, k); }
  bocaVoz(pr, t, T.pa4b, ENV.pa4, 0.75);
  if (t >= T.q4d && t < T.q5) {
    // baja el celular: sorprendida y encantada
    const k = eio(sg(t, T.q4d, T.q4d + 0.3)); const B = BRAZOS.celular; pr.manoI = lerpV(SELFIE.manoI, B.manoI, k); pr.manoD = lerpV(SELFIE.manoD, B.manoD, k);
    Object.assign(pr, { cabeza: { giro: -0.1, asiente: 0.18, ladea: 0.06 }, ojos: { abiertos: 1, x: 0, y: -0.6, feliz: 0.3 }, cejas: { alto: 0.75, ang: 0.3 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 } });
    bocaVoz(pr, t, T.pa6, ENV.pa6, 0.65);
  }
  if (t >= T.q5) { pr.cabeza = { giro: -0.03, asiente: -0.02, ladea: 0.05 }; pr.ojos = { abiertos: 1, x: 0, y: -0.15, feliz: 0.25 }; pr.cejas = { alto: 0.35, ang: 0.05 }; pr.boca = { sonrisa: 0.65, abierta: 0, ancho: 1.05 }; bocaVoz(pr, t, T.pa7, ENV.pa7, 0.6); }
  return pr;
}
// ---------- Mica ----------
function poseMica(t) {
  const pr = { x: MI0.x, y: 0, z: MI0.z, giro: -Math.PI / 2, inclina: 0.03, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.costado, t };
  pr.ojos = { abiertos: 1, x: 0, y: 0, feliz: 0.3 };
  if (t < P2) {
    if (t < T.p6 - 0.01) {
      // P3: entra rápido del local, levanta la verde con las dos manos y se la lleva, sin frenar
      const ida = eo(sg(t, T.p3, T.agarra - 0.06));
      pr.x = lerp(MI0.x, MI1.x, ida); pr.z = lerp(MI0.z, MI1.z, ida); pr.paso = ida < 0.99 ? 1 : 0;
      const GA = -2.55; pr.giro = lerp(-Math.PI / 2, GA, eio(sg(t, T.agarra - 0.45, T.agarra - 0.1)));
      if (t >= T.agarra - 0.2) {
        const lev = eio(sg(t, T.agarra, T.agarra + 0.3));
        pr.inclina = lerp(0.22, 0.04, lev); pr.lleva = 1;
        const vuelta = eio(sg(t, T.sale, T.sale + 0.3));
        pr.giro = lerp(GA, Math.PI / 2 - 0.35 - 2 * Math.PI, vuelta);
        const v = sg(t, T.sale + 0.2, T.sale + 4.2);
        pr.x = lerp(MI1.x, MI0.x + 0.3, v); pr.z = lerp(MI1.z, MI0.z + 0.2, v); pr.paso = v > 0 && v < 1 ? 1 : 0;
        Object.assign(pr, { cabeza: { giro: lerp(0, 0.5, vuelta), asiente: 0.0, ladea: 0.05 }, ojos: { abiertos: 1, x: lerp(0, 0.6, vuelta), y: 0, feliz: 0.4 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 }, cejas: { alto: 0.45, ang: 0.0 } });
      }
      bocaVoz(pr, t, T.mi1, ENV.mi1, 0.7);
      return pr;
    }
    // P6: agachada al lado de la mesa: levanta el papel desde abajo (las manos siguen al rollo)
    Object.assign(pr, { x: MC.x, z: MC.z, giro: -1.35, paso: 0 });
    const up = eio(sg(t, T.sube, T.subeFin));
    const s = lerp(0.85, 0.35, up);
    pr.sentado = s; pr.y = -0.25 * (1 - Math.cos((s * Math.PI) / 2)) * 0.95; pr.inclina = lerp(0.32, 0.1, up);
    pr.agarraRollo = 1;
    const mira = t >= T.mi2 - 0.1 ? 1 : 0;
    Object.assign(pr, { cabeza: { giro: mira ? 0.55 : 0.1, asiente: mira ? -0.25 : 0.25, ladea: 0.05 }, ojos: { abiertos: 1, x: mira ? 0.5 : 0, y: mira ? 0.4 : -0.4, feliz: 0 }, cejas: { alto: mira ? 0.7 : 0.3, ang: 0.35 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.9 } });
    bocaVoz(pr, t, T.mi2, ENV.mi2, 0.65);
    return pr;
  }
  if (t < T.q1b) {
    // Q1: en el local, detrás del mostrador; le pasa la caja verde a Walter; "¡Pao! La verde la vendí en el local."
    Object.assign(pr, { x: MLOC.x, z: MLOC.z, giro: Math.PI / 2, paso: 0 });
    pr.pasaCaja = 1;
    Object.assign(pr, { cabeza: { giro: -0.55, asiente: -0.05, ladea: 0.05 }, ojos: { abiertos: 1, x: -0.5, y: 0.1, feliz: 0.4 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 }, cejas: { alto: 0.5, ang: 0 } });
    bocaVoz(pr, t, T.mi1b, ENV.mi1, 0.7);
    return pr;
  }
  if (t < T.q4) {
    // Q3b: pega la etiqueta en la caja del pedido de Graciela
    Object.assign(pr, { x: ME.x, z: ME.z, giro: -2.2, paso: 0, inclina: 0.12 });
    pr.pegaEtiqueta = 1;
    Object.assign(pr, { cabeza: { giro: 0, asiente: 0.4, ladea: 0.03 }, ojos: { abiertos: 0.95, x: 0, y: -0.6, feliz: 0.2 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 } });
    return pr;
  }
  // Q4: lee las cajas del contenedor con la pistola
  Object.assign(pr, { x: MS.x, z: MS.z, giro: 1.4, paso: 0, inclina: 0.04 });
  pr.escanea = 1;
  const k = T.scan.filter((a) => t >= a).length;
  Object.assign(pr, { cabeza: { giro: -0.05, asiente: 0.15, ladea: 0.03 }, ojos: { abiertos: 1, x: 0, y: -0.2, feliz: 0.3 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 }, cejas: { alto: 0.3, ang: 0 } });
  void k;
  return pr;
}
// ---------- Graciela en su sillón (Q2) ----------
function poseGraciela(t) {
  const pr = { x: GS.x, y: -0.08, z: GS.z, giro: 0.12, sentado: 1, inclina: 0.06, ...CARA.sonrisa, ...BRAZOS.celular, t };
  pr.cabeza = { giro: 0.0, asiente: 0.28, ladea: 0.06 }; pr.ojos = { abiertos: 1, x: 0, y: -0.6, feliz: 0.25 };
  if (t >= T.g3 + 0.7) { Object.assign(pr, CARA.feliz); pr.ojos = { abiertos: 0.95, x: 0, y: -0.5, feliz: 0.5 }; pr.cejas = { alto: 0.6, ang: 0.1 }; }
  bocaVoz(pr, t, T.g3, ENV.g3, 0.65);
  return pr;
}
// ---------- Walter en el local (Q1) ----------
function poseWalter(t) {
  const pr = { x: WLOC.x, y: 0, z: WLOC.z, giro: -Math.PI / 2, inclina: 0.03, ...CARA.sonrisa, ...BRAZOS.costado, t };
  pr.cabeza = { giro: 0.35, asiente: 0.05, ladea: 0.03 }; pr.ojos = { abiertos: 1, x: 0.3, y: -0.1, feliz: 0.35 };
  pr.recibe = 1;
  return pr;
}

// ================= RENDER =================
function ponerLuces(lugar) {
  const dep = lugar !== "liv";
  for (const l of [cieloDep, tubos, relleno, luzAro]) l.visible = dep;
  solLiv.visible = cieloLiv.visible = !dep;
}
// el celular en la mano de un personaje parado: entre las dos manos, con la pantalla hacia `mira`
function celEnManos(cel, per, mira, alto = 0.07, adelante = 0.07) {
  per.raiz.updateMatrixWorld(true);
  const a = per.brazos[0].mano.getWorldPosition(new THREE.Vector3()), b = per.brazos[1].mano.getWorldPosition(new THREE.Vector3());
  cel.position.copy(a.add(b).multiplyScalar(0.5)).add(V3(0, alto, 0));
  cel.position.add(mira.clone().sub(cel.position).setY(0).normalize().multiplyScalar(adelante));
  cel.lookAt(mira);
}
const FR_MESA2 = V3(-0.22, PT, 0.06);
function renderAt(tIn) {
  AVISOS.length = 0;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  let pa = planoActual;
  if (VERM === "portada") pa = "portada";
  const lugar = ["Q2", "Q2i"].includes(pa) ? "liv" : "dep";
  ponerLuces(lugar);
  scene.background = new THREE.Color(lugar === "liv" ? 0xdfe6ea : 0xdcdad0);
  DEP.visible = LOC.visible = lugar === "dep"; LIV.visible = lugar === "liv";
  // ---- objetos de la parte 1 / parte 2 ----
  mesaCajas.visible = !parte2; papelLados.visible = !parte2; mesaPatas.visible = parte2;
  const up = parte2 ? 1 : eio(sg(t, T.sube, T.subeFin));
  papelFrente.visible = !parte2 && up < 0.99; papelFrente.scale.y = Math.max(0.001, 1 - up);
  papelRollo.visible = !parte2 && t >= T.p6 - 0.01 && up < 0.995; papelRollo.position.y = PT - 0.012 - PT * (1 - up) + 0.03;
  papelRollo.rotation.x = up * 9;
  rolloNuevo.visible = !parte2 && t >= T.p6 - 0.01; rolloNuevo.position.set(1.22, 0.05, 0.28); rolloNuevo.rotation.set(0, 0.4, Math.PI / 2);
  cuaderno.visible = !parte2; dibujarCuaderno(!parte2 && t >= T.rot[0] && t < T.p6);
  tabP.visible = pilaTab.visible = IMP.visible = parte2;
  pilaLlega.visible = parte2 && t >= T.q4 - 0.01;
  plantita.position.set(parte2 ? -0.38 : 0.36, PT, -0.22);
  IMP.position.set(0.36, PT, -0.25); IMP.rotation.y = -0.2;
  // las freidoras: la verde de la parte 1 (en la mesa hasta que Mica la levanta), la crema de muestra (Q1-Q3), la verde (Q4-Q5)
  frFoto.visible = !parte2 && t < T.p4 + 0.01; frFoto2.visible = parte2 && t < T.q4; frFoto3.visible = parte2 && t >= T.q4;
  for (const f of [frFoto2, frFoto3]) { f.position.copy(FR_MESA2); f.rotation.y = 0.5; }
  if (frFoto.parent !== scene) scene.add(frFoto);
  frFoto.position.copy(FR_MESA); frFoto.rotation.set(0, 0.32, 0);
  // la caja del pedido (Q3), la de Walter (Q1), la etiqueta
  cajaPedido.visible = parte2 && t >= T.q3 && t < T.q4; cajaPedido.position.set(0.25, PT + 0.2, 0.16); cajaPedido.rotation.set(0, -0.15, 0);
  cajaWalter.visible = parte2 && t < T.q1b;
  etiqueta.scale.y = parte2 ? cl(sg(t, T.imprime, T.imprime + 0.45)) + 0.001 : 0.001; etiqueta.visible = parte2 && t >= T.imprime && t < T.pega - 0.32;
  etiquetaCaja.visible = parte2 && t >= T.pega - 0.32 && t < T.q4;
  pistola.visible = parte2 && t >= T.q4 && t < T.q4b; rayo.visible = false;
  // ---- pantallas ----
  dibujarCelP(t);
  if (parte2) { dibujarTablet(t); dibujarTabL(t); }
  if (lugar === "liv") dibujarCelG(t);
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  celP.visible = celG.visible = false;
  const contra = pa === "P8b" || pa === "Q4c" || pa === "Q5";
  if (lugar === "dep") {
    paola.raiz.visible = true; const pp = posePaola(t);
    if (contra) { pp.manoI = [0.12, 0.05, 0.42]; pp.manoD = [-0.12, 0.05, 0.42]; }
    // la mano derecha en el celular del aro (P1-P3)
    if (pp.toca) { ARO.userData.cab.updateMatrixWorld(true); const w = ARO.userData.cab.localToWorld(V3(0.0, -0.02, -0.06)); pp.manoD = aCuerpo(paola, w); pp.codoD = [-1, -0.5, -0.3]; pp.manoI = [0.27, -0.06, 0.06]; }
    paola.poner(pp);
    const enMica = !parte2 ? (t >= T.p3 - 0.01 && t < T.p4) || (t >= T.p6 && t < T.p7) : (t < T.q1b) || (t >= T.q3b && t < T.q3c) || (t >= T.q4 && t < T.q4b);
    if (enMica) {
      mica.raiz.visible = true; const pm = poseMica(t);
      if (pm.lleva) {
        // las dos manos a los costados de la freidora; levantada, la freidora va delante de la panza
        const lev = eio(sg(t, T.agarra, T.agarra + 0.3));
        mica.poner({ ...pm, manoI: [0.16, 0.36, 0.4], manoD: [-0.16, 0.36, 0.4] }); mica.raiz.updateMatrixWorld(true);
        const enBrazos = mica.cuerpo.localToWorld(V3(0, 0.22, 0.42));
        frFoto.position.copy(FR_MESA.clone().lerp(enBrazos, lev)); frFoto.rotation.set(0, lerp(0.32, mica.raiz.rotation.y, lev), 0);
        frFoto.updateMatrixWorld(true);
        const lado = (s) => frFoto.localToWorld(V3(s * 0.15, 0.15, 0.0));
        pm.manoI = aCuerpo(mica, lado(1)); pm.manoD = aCuerpo(mica, lado(-1)); pm.codoI = [1, -0.4, -0.2]; pm.codoD = [-1, -0.4, -0.2];
        if (t >= T.sale + 0.2) { pm.manoI = [0.16, 0.36, 0.42]; pm.manoD = [-0.16, 0.36, 0.42]; }
      }
      if (pm.agarraRollo) { const yR = papelRollo.position.y; mica.poner(pm); pm.manoI = aCuerpo(mica, V3(0.42, yR, 0.47)); pm.manoD = aCuerpo(mica, V3(0.26, yR + 0.02, 0.47)); pm.codoI = [1, -0.3, -0.2]; pm.codoD = [-1, -0.3, -0.2]; }
      if (pm.pasaCaja) {
        const u = eio(sg(t, T.entrega, T.entrega + 0.8));
        cajaWalter.position.set(lerp(MOST.x - 0.15, MOST.x + 0.25, u), 1.2 + 0.08 * Math.sin(Math.PI * u), MOST.z - 0.05); cajaWalter.rotation.set(0, 0.1, 0);
        mica.poner(pm); const lado = (s) => V3(cajaWalter.position.x - 0.2, cajaWalter.position.y, cajaWalter.position.z + s * 0.2);
        if (u < 0.85) { pm.manoI = aCuerpo(mica, lado(-1)); pm.manoD = aCuerpo(mica, lado(1)); pm.codoI = [1, -0.5, -0.2]; pm.codoD = [-1, -0.5, -0.2]; }
        else { pm.manoI = [0.3, 0.32, 0.36]; pm.manoD = [-0.3, 0.32, 0.36]; }
      }
      if (pm.pegaEtiqueta) {
        // la etiqueta sale de la impresora, Mica la toma y la pega en el frente de la caja
        IMP.updateMatrixWorld(true); cajaPedido.updateMatrixWorld(true);
        const a = IMP.localToWorld(V3(0, 0.04, 0.12)), b = cajaPedido.localToWorld(V3(0, 0.07, CJ.d / 2 + 0.004));
        const u = eio(sg(t, T.pega - 0.32, T.pega));
        etiquetaCaja.position.copy(a.clone().lerp(b, u)); etiquetaCaja.position.y += 0.08 * Math.sin(Math.PI * u);
        etiquetaCaja.quaternion.copy(cajaPedido.quaternion); etiquetaCaja.scale.setScalar(lerp(0.5, 1, u));
        mica.poner(pm);
        const mano = t < T.pega - 0.32 ? a : etiquetaCaja.position.clone().add(V3(0.04, 0, 0.03));
        pm.manoD = aCuerpo(mica, t < T.pega + 0.25 ? mano : b.clone().add(V3(0.08, 0, 0.05))); pm.codoD = [-1, -0.4, -0.2];
        pm.manoI = aCuerpo(mica, cajaPedido.localToWorld(V3(CJ.w / 2 + 0.01, 0.1, 0.05))); pm.codoI = [1, -0.4, -0.2];
      }
      if (pm.escanea) {
        mica.poner(pm);
        const k = T.scan.filter((a) => t >= a).length, obj = LLEGA[Math.min(8, k + 2)];
        const apunta = V3(obj[0], obj[1], -0.74);
        const hombro = mica.cuerpo.localToWorld(V3(-0.2, 0.45, 0.05)), dirA = apunta.clone().sub(hombro).normalize();
        pm.manoD = aCuerpo(mica, hombro.clone().add(dirA.multiplyScalar(0.46))); pm.codoD = [-1, -0.6, -0.1];
        mica.poner(pm); mica.raiz.updateMatrixWorld(true);
        const mano = mica.brazos[1].mano.getWorldPosition(new THREE.Vector3());
        pistola.position.copy(mano); pistola.lookAt(apunta);
        const flash = T.scan.some((a) => t >= a && t < a + 0.1);
        rayo.visible = flash;
      }
      mica.poner(pm);
    }
    if (parte2 && t < T.q1b) {
      walter.raiz.visible = true; const pw = poseWalter(t);
      const u = eio(sg(t, T.entrega, T.entrega + 0.8));
      walter.poner(pw);
      if (u > 0.55) { const lado = (s) => V3(cajaWalter.position.x + 0.2, cajaWalter.position.y, cajaWalter.position.z + s * 0.2); pw.manoI = aCuerpo(walter, lado(1)); pw.manoD = aCuerpo(walter, lado(-1)); pw.codoI = [1, -0.5, -0.2]; pw.codoD = [-1, -0.5, -0.2]; }
      walter.poner(pw);
    }
  }
  if (lugar === "liv") { graciela.raiz.visible = true; graciela.poner(poseGraciela(t)); }
  scene.updateMatrixWorld(true);
  // ---- el celular de Paola: en el aro (P1-P3) o en sus manos ----
  if (lugar === "dep") {
    celP.visible = true;
    if (!parte2 && t < T.p4) {
      const cab = ARO.userData.cab; cab.updateMatrixWorld(true);
      celP.position.copy(cab.localToWorld(V3(0, 0.0, -0.01))); celP.lookAt(caraDe(paola));
    } else {
      const selfie = (t >= T.p8 && !parte2) || (parte2 && t >= T.q4b);
      celEnManos(celP, paola, selfie ? caraDe(paola) : caraDe(paola), selfie ? 0.06 : 0.08, selfie ? 0.05 : 0.07);
      if (parte2 && t < T.q1i) { celEnManos(celP, paola, FR_MESA2.clone().add(V3(0, 0.15, 0)), 0.08, 0.06); celP.rotateY(Math.PI); }
    }
  }
  if (lugar === "liv") { graciela.raiz.updateMatrixWorld(true); celEnManos(celG, graciela, caraDe(graciela), 0.1, 0.1); celG.visible = true; }
  // ---- cámara ----
  if (pl[2] && pa !== "portada") ponerCam(catmull(pl[2], t), t);
  const insertoCel = (cel, t0, t1, llena = 0.64) => {
    const { v, up } = vistaPantalla(cel, V3(0, 0, 0.007), V3(0, 0, 1), 0.162 * 1.25, llena, 40, 0.014);
    const k = sg(t, t0, t1); const v2 = v.slice(); for (let i = 0; i < 3; i++) v2[i] += (v[i] - v[i + 3]) * 0.06 * (1 - k);
    ponerVista(v2, v2, 0, up, up);
  };
  const insertoTab = (t0, t1) => {
    const piv = tabP.userData.pivote, [W, H] = tabP.userData.tam;
    const { v, up } = vistaPantalla(piv, V3(0, H / 2, 0.007), V3(0, 0, 1), H, 0.33, 40, 0);
    const k = sg(t, t0, t1); const v2 = v.slice(); for (let i = 0; i < 3; i++) v2[i] += (v[i] - v[i + 3]) * 0.05 * (1 - k);
    ponerVista(v2, v2, 0, up, up); void W;
  };
  if (["P5", "Q1i"].includes(pa)) paola.raiz.visible = false;
  ARO.visible = !["P5", "Q1i", "Q3", "Q3c", "Q4t"].includes(pa);
  if (pa === "Q4t") mica.raiz.visible = false;
  if (pa === "Q2i") graciela.raiz.visible = false;
  if (pa === "P5") insertoCel(celP, T.p5, T.p5b);
  if (pa === "Q1i") insertoCel(celP, T.q1i, T.q2);
  if (pa === "Q2i") insertoCel(celG, T.q2i, T.q3);
  if (pa === "Q3") insertoTab(T.q3, T.q3b);
  if (pa === "Q3c") insertoTab(T.q3c, T.q4);
  if (pa === "Q4t") insertoTab(T.q4t, T.q4b);
  if (pa === "P8b" || pa === "Q4c" || pa === "Q5") {
    // contraplano: la cámara es el celular en modo historia (la cara de Paola, la mesa y el aro detrás)
    celP.updateMatrixWorld(true); const c = caraDe(paola), p = celP.getWorldPosition(new THREE.Vector3());
    const dir = p.clone().sub(c).setY(0).normalize();
    const k = pa === "Q5" ? eio(sg(t, T.q5, DUR)) : sg(t, pl[1], pl[1] + 1.2);
    const pos = c.clone().add(dir.multiplyScalar(lerp(1.25, 1.12, k))).add(V3(0, 0.04, 0));
    camera.up.set(0, 1, 0); camera.position.copy(pos); camera.fov = pa === "Q5" ? 50 : 52; camera.updateProjectionMatrix();
    camera.lookAt(c.x, c.y - (pa === "Q5" ? 0.12 : 0.06), c.z); celP.visible = false;
  }
  if (pa === "portada") {
    paola.raiz.visible = true;
    paola.poner({ ...posePaola(T.p7 + 0.3), ...CARA.incredula, ojos: { abiertos: 0.95, x: 0.0, y: 0.05, tension: 0.2 }, cejas: { alto: 0.35, ang: 0.45, asim: 0.5 }, boca: { sonrisa: -0.3, abierta: 0.05, ancho: 0.85 }, cabeza: { giro: 0.0, asiente: 0.0, ladea: 0.05 }, t: 1 });
    papelFrente.visible = true; papelFrente.scale.y = 0.45; papelRollo.visible = true; papelRollo.position.y = PT - 0.012 - PT * 0.45 + 0.03;
    ponerCam([-0.02, 1.45, 3.15, -0.42, 1.0, 0.3, 50], t, true);
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROT) ROT[k].visible = false;
  for (const g of [...GUIAS, ...NOTIS, contador]) g.visible = false;
  ponerHist(!LIMPIO && pa !== "portada" && (pa === "P8b" || pa === "Q4c" || pa === "Q5"));
  if (!LIMPIO && !en(tIn, P1, P2) && pa !== "portada") tarjetas(t, pa);
  renderer.render(scene, camera);
}
function tarjetas(t, pa) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const celPx = () => objPx(celP, V3(0, 0.05, 0.01));
  if (pa === "P1" && t >= T.g1 - 0.05) { const [cx, cy] = celPx(); ponerGlobo(GL.g1, 600, 1500, ent(T.g1 - 0.05), [cx, cy + 20], 1); }
  if (pa === "P2" && t >= T.pa1 - 0.04) { const [hx, hy] = coronillaPx(paola); ponerGlobo(GL.pa1, 560, 560, ent(T.pa1 - 0.04), [hx, hy + 6], 1); }
  if (pa === "P3") {
    const [cx, cy] = celPx();
    if (t < T.mi1 + 0.6) { ponerGlobo(ROT.pagado, 400, 1560, ent(T.pagado), null, 2); ponerGuia(GUIAS[0], 400, 1500, cx, cy + 30, sg(t, T.pagado + 0.05, T.pagado + 0.25)); }
    if (t >= T.mi1 - 0.04) hablar(GL.mi1, mica, ent(T.mi1 - 0.04), 1, 0, 260);
  }
  if (pa === "P4") {
    if (t >= T.pa2 - 0.04) { const [hx, hy] = coronillaPx(paola); ponerGlobo(GL.pa2, 540, 330, ent(T.pa2 - 0.04), [hx, hy + 6], 1); }
    if (t >= T.reint) ponerGlobo(ROT.reint, 540, 1600, ent(T.reint), null, 2);
  }
  if (pa === "P5" && t >= T.g2 - 0.05) ponerGlobo(GL.g2, 540, 300, ent(T.g2 - 0.05), null, 1);
  if (pa === "P5b") {
    ponerGlobo(GL.g2, 540, 1560, 1, null, 1);
    const h = objPx(MESA, V3(0.0, PT + 0.12, 0.05)), c = celPx();
    if (t >= T.rot[0]) { ponerGlobo(ROT.dos, 640, 330, ent(T.rot[0]), null, 3); ponerGuia(GUIAS[0], 640, 380, h[0], h[1], sg(t, T.rot[0] + 0.05, T.rot[0] + 0.3)); }
    if (t >= T.rot[1]) { ponerGlobo(ROT.perdida, 420, 490, ent(T.rot[1]), null, 4); ponerGuia(GUIAS[1], 300, 535, c[0], c[1], sg(t, T.rot[1] + 0.05, T.rot[1] + 0.3)); }
  }
  if (pa === "P6" && t >= T.mi2 - 0.04) hablar(GL.mi2, mica, ent(T.mi2 - 0.04), 1, -60, 260);
  if (pa === "P7" && t >= T.pa3 - 0.04) { const [hx, hy] = coronillaPx(paola); ponerGlobo(GL.pa3, 560, Math.min(400, hy - 160), ent(T.pa3 - 0.04), [hx, hy + 6], 1); }
  if (pa === "P7b") {
    ponerGlobo(GL.pa3, 540, 1600, 1, null, 1);
    if (t >= T.rot2[0]) ponerGlobo(ROT.verdes, 540, 330, ent(T.rot2[0]), null, 3);
    if (t >= T.rot2[1]) ponerGlobo(ROT.parados, 540, 560, ent(T.rot2[1]), null, 4);
  }
  if ((pa === "P8" || pa === "P8b") && t >= T.pa4 - 0.04) { if (pa === "P8") { const [hx, hy] = coronillaPx(paola); ponerGlobo(GL.pa4, 560, Math.min(420, hy - 150), ent(T.pa4 - 0.04), [hx, hy + 6], 1); } else ponerGlobo(GL.pa4, 540, 1500, 1, null, 1); }
  // ---- parte 2 ----
  if (pa === "Q1") {
    if (t >= T.mi1b - 0.04) hablar(GL.mi1b, mica, ent(T.mi1b - 0.04), 1, 0, 260);
    if (t >= T.ventaL) { const tp = objPx(tabL.userData.pivote, V3(0, 0.11, 0.01)); ponerGlobo(ROT.local, 760, 1520, ent(T.ventaL), null, 2); ponerGuia(GUIAS[0], 700, 1460, tp[0], tp[1], sg(t, T.ventaL + 0.05, T.ventaL + 0.3)); }
  }
  if (pa === "Q1b" && t >= T.pa5 - 0.04) { const [hx, hy] = coronillaPx(paola); ponerGlobo(GL.pa5, 560, Math.min(560, hy - 150), ent(T.pa5 - 0.04), [hx, hy + 6], 1); }
  if (pa === "Q1i") { ponerGlobo(GL.pa5, 540, 1700, 1, null, 1); ponerGlobo(ROT.q1, 540, 215, ent(T.q1i + 0.15), null, 2); }
  if (pa === "Q2" && t >= T.g3 - 0.04) hablar(GL.g3, graciela, ent(T.g3 - 0.04), 1, 0, 260);
  if (pa === "Q2i") { if (t < T.g3 + LEN.g3 + 0.2) ponerGlobo(GL.g3, 540, 1700, 1, null, 1); ponerGlobo(ROT.q2, 540, 215, ent(T.q2i + 0.2), null, 2); }
  if (pa === "Q3c") ponerGlobo(ROT.q3, 540, 330, ent(T.q3c + 0.3), null, 2);
  if (pa === "Q4t" && t >= T.quedan40) ponerGlobo(ROT.q4, 540, 330, ent(T.quedan40), null, 2);
  if (pa === "Q4b" && t >= T.pa4b - 0.04) { const [hx, hy] = coronillaPx(paola); ponerGlobo(GL.pa4b, 560, Math.min(420, hy - 150), ent(T.pa4b - 0.04), [hx, hy + 6], 1); }
  if (pa === "Q4c") {
    ponerGlobo(GL.pa4b, 540, 1560, 1, null, 1);
    const n = T.notis.filter((a) => t >= a).length;
    for (let i = 0; i < n; i++) { const k = n - 1 - i; if (k > 3) continue; ponerGlobo(NOTIS[i], 540, 240 + k * 126, k === 0 ? ent(T.notis[i]) : 1, null, 6 + (6 - k)); }
    if (n > 0) { contador.userData.poner(`Quedan ${40 - n}`, "#5ce611"); ponerGlobo(contador, 540, 1330, ent(T.notis[0]), null, 5); }
  }
  if (pa === "Q4d") {
    contador.userData.poner("Quedan 28", "#5ce611"); ponerGlobo(contador, 300, 1650, 1, null, 2);
    if (t >= T.pa6 - 0.04) { const [hx, hy] = coronillaPx(paola); ponerGlobo(GL.pa6, 560, Math.min(420, hy - 150), ent(T.pa6 - 0.04), [hx, hy + 6], 1); }
  }
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
