// Capa 3D de por-que-se-fue (Three.js r170 local). Base técnica: reels/por-que-buscando (cámara de claves con cúbica
// monótona, el almacén de Rubén, personajes de reels/abren-hoy). renderAt(t) es una función pura del tiempo del timeline
// (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Zona A (origen, fondo navy liso con piso navy claro): la góndola con el hueco, el paquete que se rebana, la puerta del
// local de al lado (x = 9), la canasta, el almanaque y la canasta vacía (x = -9), las barras de ventas, el "?", la pila
// que se vacía y la notita; y el cierre. Zona B (x = 40): el almacén de Rubén (estante de yerba, tablet, pizarra).
// Colores de marca; rojo apagado SOLO para el problema (el hueco, el 9 %, el contador en 0, la canasta vacía).
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800p.js";
import { crearPersonaje, ELENCO, poseEn, mezclar, CARA, BRAZOS, crearMate, crearTermo, crearTablet, niega } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
const rebote = (t, a, k = 10, f = 26, amp = 1) => (t > a ? Math.exp(-(t - a) * k) * Math.sin((t - a) * f) * amp : 0);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (A, B, u) => V(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E; // inicios de escena
const D2R = Math.PI / 180;
const popIn = (t, a, d = 0.28) => (t < a ? 0 : lerp(0.35, 1, bk(sg(t, a, a + d))));
const popOut = (t, a, d = 0.18) => (t < a ? 1 : 1 - eio(sg(t, a, a + d)));

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 400);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x5d6270);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, Math.PI / 2.4, 0xfff1dc, 2.4);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xdde8ff, 1.6);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.3);
  tira(3, 3, 0, 1, 7, 0, 0xffffff, 1.0);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.6;

const OB = V(40, 0, 0); // el almacén de Rubén
const key = new THREE.DirectionalLight(0xfff0dc, 2.3); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.6); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x3a4256, 1.0); scene.add(fill);
// sol con sombras: sigue al punto que mira la cámara
const sol = new THREE.DirectionalLight(0xffe6c8, 1.6);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.radius = 4;
scene.add(sol, sol.target);
const lampara = new THREE.PointLight(0xffd59a, 0, 6, 1.6); scene.add(lampara);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, yerba: 0x6f8a2c, kraft: 0xc29563 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.16 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.5), red: mat(C.red, 0.55, { emissive: C.red, emissiveIntensity: 0.12 }), white: mat(C.white, 0.42),
  papel: mat(C.cr, 0.88), yerba: mat(C.yerba, 0.95), kraft: mat(C.kraft, 0.85), kraft2: mat(0xa77a4b, 0.85), tilde: mat(C.navy, 0.45),
  piso: mat(C.navy2, 0.95),
};
const MCR = () => mat(0xefeee5, 0.5, { emissive: 0xefeee5, emissiveIntensity: 0.12 });
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", sans-serif`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const sombraTex = tex(256, 256, (x) => {
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(3,6,12,0.55)"); gr.addColorStop(0.55, "rgba(3,6,12,0.25)"); gr.addColorStop(1, "rgba(3,6,12,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
});
const sombra = (w, d) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m; };
const sh = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };

const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 10, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
};
const tickGeo = (() => {
  const s = new THREE.Shape();
  [[-0.5, 0.06], [-0.16, -0.3], [0.5, 0.36], [0.37, 0.49], [-0.16, -0.05], [-0.37, 0.19]].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 });
  g.translate(0, -0.06, -0.06); return g;
})();
const discoGeo = new THREE.CylinderGeometry(1, 1, 0.3, 36).rotateX(Math.PI / 2);
function hacerTilde(r = 0.17) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, M.g); d.scale.set(r, r, r * 0.35); g.add(d);
  const tk = mesh(tickGeo, M.tilde, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  scene.add(g); return g;
}
const NAV = "#16243d", NAV3 = "#1f3254", EDGE = "#2c4268", CRE = "#efeee5", VER = "#5ce611", NAV0 = "#0b1220", ROJ = "#c7655b";

// ================= EL PAQUETE DE YERBA (ladrillo de 1 kg con el fuelle doblado) =================
// variantes: A la que vino a buscar (banda verde, la única verde de la góndola), B gris (otra marca), C navy, D crema oscura
const VAR = {
  A: { banda: VER, txt: NAV0, hoja: "#3f8f1f", kg: "1 kg" },
  A2: { banda: VER, txt: NAV0, hoja: "#3f8f1f", kg: "1/2 kg" },
  B: { banda: "#8e8c80", txt: CRE, hoja: "#6d7a5e", kg: "1 kg" },
  C: { banda: EDGE, txt: CRE, hoja: "#4f7a2a", kg: "1 kg" },
  D: { banda: "#b4b2a3", txt: NAV0, hoja: "#5c7a3a", kg: "1 kg" },
};
const PK = { w: 0.56, h: 0.9, d: 0.32 };
const FRENTE = {}, MFRENTE = {}, MBANDA = {};
for (const [k, v] of Object.entries(VAR)) {
  FRENTE[k] = tex(512, 832, (x, w, h) => {
    x.fillStyle = CRE; x.fillRect(0, 0, w, h);
    x.fillStyle = v.banda; x.fillRect(0, 0, w, 170); x.fillRect(0, h - 74, w, 74);
    x.fillStyle = v.txt; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 74); x.fillText(v.kg, w / 2, 92);
    // la hoja de yerba
    x.save(); x.translate(w / 2, 380); x.rotate(-0.5); x.fillStyle = v.hoja; x.beginPath(); x.ellipse(0, 0, 66, 140, 0, 0, Math.PI * 2); x.fill();
    x.strokeStyle = CRE; x.lineWidth = 10; x.lineCap = "round"; x.beginPath(); x.moveTo(0, -128); x.lineTo(0, 150); x.stroke();
    for (const k2 of [-80, -30, 20, 70]) { x.beginPath(); x.moveTo(0, k2); x.lineTo(44, k2 - 38); x.moveTo(0, k2); x.lineTo(-44, k2 - 38); x.stroke(); }
    x.restore();
    x.fillStyle = NAV0; ajustar(x, "YERBA", 900, 150, w - 56); x.fillText("YERBA", w / 2, 612);
    ajustar(x, "MATE", 900, 104, w - 150); x.fillText("MATE", w / 2, 708);
  });
  MFRENTE[k] = new THREE.MeshStandardMaterial({ map: FRENTE[k], roughness: 0.85 });
  MBANDA[k] = mat(new THREE.Color(v.banda).getHex(), 0.85);
}
// el frente ancho del paquete gigante (el que se rebana): mismo dibujo, sin estirar
FRENTE.AW = tex(800, 832, (x, w, h) => {
  const v = VAR.A;
  x.fillStyle = CRE; x.fillRect(0, 0, w, h);
  x.fillStyle = v.banda; x.fillRect(0, 0, w, 170); x.fillRect(0, h - 74, w, 74);
  x.fillStyle = v.txt; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 74); x.fillText(v.kg, w / 2, 92);
  x.save(); x.translate(w / 2, 380); x.rotate(-0.5); x.fillStyle = v.hoja; x.beginPath(); x.ellipse(0, 0, 66, 140, 0, 0, Math.PI * 2); x.fill();
  x.strokeStyle = CRE; x.lineWidth = 10; x.lineCap = "round"; x.beginPath(); x.moveTo(0, -128); x.lineTo(0, 150); x.stroke();
  for (const k2 of [-80, -30, 20, 70]) { x.beginPath(); x.moveTo(0, k2); x.lineTo(44, k2 - 38); x.moveTo(0, k2); x.lineTo(-44, k2 - 38); x.stroke(); }
  x.restore();
  x.fillStyle = NAV0; ajustar(x, "YERBA", 900, 190, w - 80); x.fillText("YERBA", w / 2, 620);
  ajustar(x, "MATE", 900, 130, w - 200); x.fillText("MATE", w / 2, 726);
});
MFRENTE.AW = new THREE.MeshStandardMaterial({ map: FRENTE.AW, roughness: 0.85 }); MBANDA.AW = MBANDA.A;
// cuerpo de bolsa de papel: caja subdividida, frente y dorso un poco abombados y la parte de arriba pellizcada (el fuelle)
function cuerpoBolsa(w, h, d, x0, W0) {
  const g = new THREE.BoxGeometry(w, h, d, 6, 12, 4);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i) + h / 2, z = pos.getZ(i);
    const u = (x + x0) / (W0 / 2), vy = y / h; // -1..1 en el ancho del paquete entero, 0..1 en el alto
    const panza = 1 + 0.09 * (1 - u * u) * Math.sin(Math.PI * Math.min(1, vy / 0.86));
    let zz = z * panza;
    if (vy > 0.88) zz *= 1 - 0.3 * ((vy - 0.88) / 0.12); // arriba se achica un poco (la boca doblada)
    pos.setXYZ(i, x, y, zz);
  }
  g.computeVertexNormals();
  return g;
}
// cortes: fracciones del ancho [0, ..., 1]; con más de un tramo es el paquete rebanado (las caras del corte muestran la yerba)
function hacerPaquete(v, cortes = [0, 1], dims = PK) {
  const g = new THREE.Group(); const tajadas = [];
  const fv = cortes.length > 2 && FRENTE[v + "W"] ? v + "W" : v;
  for (let i = 0; i < cortes.length - 1; i++) {
    const a = cortes[i], b = cortes[i + 1], w = (b - a) * dims.w;
    const s = new THREE.Group(); s.position.x = ((a + b) / 2 - 0.5) * dims.w; g.add(s);
    let fm = MFRENTE[fv];
    if (cortes.length > 2) {
      const t = FRENTE[fv].clone(); t.repeat.set(b - a, 1); t.offset.set(a, 0); t.needsUpdate = true;
      fm = new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 });
    }
    const ladoD = b < 1 ? M.yerba : M.papel, ladoI = a > 0 ? M.yerba : M.papel;
    const cuerpo = mesh(cuerpoBolsa(w - 0.004, dims.h, dims.d, s.position.x, dims.w), [ladoD, ladoI, M.papel, M.papel, fm, M.papel]);
    s.add(cuerpo);
    // el fuelle doblado: una lengüeta de papel con la banda, plegada hacia adelante sobre la boca de la bolsa
    s.add(mesh(rbox(w - 0.012, 0.03, dims.d * 0.72, 0.01, 1), M.papel, 0, dims.h + 0.008, -0.01));
    const sol0 = mesh(rbox(w - 0.01, 0.13, 0.03, 0.01, 1), [M.papel, M.papel, M.papel, M.papel, MBANDA[fv], M.papel], 0, dims.h - 0.03, dims.d * 0.5 + 0.02);
    sol0.rotation.x = -0.22; s.add(sol0);
    tajadas.push(s);
  }
  g.userData.tajadas = tajadas;
  sh(g);
  return g;
}

// ================= LA GÓNDOLA (zona A) =================
const GD = { cols: 5, paso: 0.68, baldas: [0.18, 1.33, 2.48, 3.63], tope: 4.78, prof: 0.9, ancho: 3.4 };
const HUECO = { b: 2, c: 2 };
const xCol = (c) => (c - 2) * GD.paso;
const gondola = new THREE.Group(); scene.add(gondola);
let tagHueco, tagHuecoOK;
const TOPE_Y = GD.tope + 0.32; // la tapa de arriba (escenario del "?" y de la pila)
{
  const marco = M.navy3;
  for (const s of [-1, 1]) gondola.add(mesh(rbox(0.16, 5.12, 0.98, 0.04), marco, s * (GD.ancho / 2 + 0.08), 2.56, 0));
  gondola.add(mesh(rbox(GD.ancho + 0.1, 4.95, 0.06, 0.02), M.navy2, 0, 2.5, -0.46));
  gondola.add(mesh(rbox(GD.ancho + 0.32, 0.18, 0.98, 0.03), marco, 0, 0.09, 0));
  // cartel de arriba
  const cartel = tex(1024, 96, (x, w, h) => {
    x.fillStyle = NAV3; x.fillRect(0, 0, w, h); x.fillStyle = VER; x.fillRect(0, h - 12, w, 12);
    x.fillStyle = CRE; x.font = F(900, 64); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("YERBAS", w / 2, h / 2 - 4);
  });
  const mc = new THREE.MeshStandardMaterial({ map: cartel, roughness: 0.6, emissive: 0xffffff, emissiveMap: cartel, emissiveIntensity: 0.12 });
  gondola.add(mesh(rbox(GD.ancho + 0.32, 0.32, 0.98, 0.03), [marco, marco, marco, marco, mc, marco], 0, GD.tope + 0.16, 0));
  // baldas con su tira de precios
  const tira = (conHueco) => tex(1024, 48, (x, w, h) => {
    x.fillStyle = CRE; x.fillRect(0, 0, w, h);
    for (let c = 0; c < 5; c++) {
      if (conHueco && c === HUECO.c) continue;
      const cx = ((c + 0.5) / 5) * w;
      x.fillStyle = "#ffffff"; rr(x, cx - 72, 6, 144, 36, 6);
      x.fillStyle = NAV0; x.fillRect(cx - 58, 14, 60, 8); x.fillRect(cx - 58, 27, 40, 6);
      for (let k = 0; k < 7; k++) x.fillRect(cx + 14 + k * 7, 12, k % 3 ? 3 : 5, 24);
    }
  });
  GD.baldas.forEach((y, b) => {
    gondola.add(mesh(rbox(GD.ancho, 0.06, GD.prof, 0.015), M.edge, 0, y - 0.03, 0));
    const tt = tira(b === HUECO.b);
    const tm = new THREE.MeshStandardMaterial({ map: tt, roughness: 0.6, emissive: 0xffffff, emissiveMap: tt, emissiveIntensity: 0.1 });
    gondola.add(mesh(rbox(GD.ancho, 0.16, 0.035, 0.01), [M.cr, M.cr, M.cr, M.cr, tm, M.cr], 0, y - 0.07, GD.prof / 2 + 0.02));
  });
  const grilla = [["C", "D", "B", "C", "B"], ["D", "B", "C", "B", "D"], ["B", "C", null, "D", "C"], ["C", "B", "D", "C", "B"]];
  let s = 11; const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  grilla.forEach((fila, b) => fila.forEach((v, c) => {
    for (const z of [0.2, -0.17]) {
      if (!v) continue;
      const p = hacerPaquete(v); p.position.set(xCol(c) + (az() - 0.5) * 0.04, GD.baldas[b], z); p.rotation.y = (az() - 0.5) * 0.12;
      gondola.add(p);
    }
  }));
  // el precio del hueco: rojo, más grande, sobresale
  const tagTex = (fondo, letra, txt) => tex(512, 200, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h); x.fillStyle = letra; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 900, 120, w - 50); x.fillText(txt, w / 2, h / 2 + 4);
  });
  const t1 = tagTex(ROJ, CRE, "AGOTADO"), t2 = tagTex(VER, NAV0, "EN STOCK");
  const tm1 = new THREE.MeshStandardMaterial({ map: t1, roughness: 0.55, emissive: 0xffffff, emissiveMap: t1, emissiveIntensity: 0.18 });
  const tm2 = new THREE.MeshStandardMaterial({ map: t2, roughness: 0.55, emissive: 0xffffff, emissiveMap: t2, emissiveIntensity: 0.18 });
  tagHueco = mesh(rbox(0.62, 0.24, 0.04, 0.03), [M.red, M.red, M.red, M.red, tm1, M.red]);
  tagHuecoOK = mesh(rbox(0.62, 0.24, 0.04, 0.03), [M.g, M.g, M.g, M.g, tm2, M.g]);
  for (const t of [tagHueco, tagHuecoOK]) { t.position.set(xCol(HUECO.c), GD.baldas[HUECO.b] - 0.1, GD.prof / 2 + 0.06); gondola.add(t); }
  sh(gondola);
}
// paquetes que reponen el hueco (s12 y cierre)
const repuestos = [0.2, -0.17].map((z) => { const p = hacerPaquete("A"); p.position.set(xCol(HUECO.c), GD.baldas[HUECO.b], z); gondola.add(p); return p; });
const piso = mesh(new THREE.PlaneGeometry(160, 120), M.piso, 0, 0, 0); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; scene.add(piso);
const sombraGond = sombra(5.2, 2.2);

// ================= EL PAQUETE QUE SE REBANA =================
const CORTES = [0, 0.09, 0.24, 0.43, 0.69, 1]; // de izquierda a derecha: 9, 15, 19, 26, 31
const PKG = { w: 0.84, h: 0.9, d: 0.42 };
const grande = hacerPaquete("A", CORTES, PKG); scene.add(grande);
const [taj9, taj15, taj19, taj26, taj31] = grande.userData.tajadas;
const entero = hacerPaquete("A", [0, 1], PKG); grande.add(entero);
// cada tajada lleva su % pegado arriba (3D)
const ROT = ["9 %", "15 %", "19 %", "26 %", "31 %"];
const etqTaj = [taj9, taj15, taj19, taj26, taj31].map((s, i) => { const m = mesh(textoGeo(ROT[i], 0.13, 0.04), i ? MCR() : M.red, 0, PKG.h + 0.2 + (i % 2) * 0.2, 0.05); s.add(m); return m; });
// el 9 %: se pone rojo apagado (el problema)
const taj9Mats = [];
taj9.traverse((o) => { if (o.isMesh) { o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone(); (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => taj9Mats.push(m)); } });
taj9Mats.forEach((m) => { m.userData.c0 = m.color.clone(); m.emissive = new THREE.Color(C.red); m.emissiveIntensity = 0; });
const sombraGrande = sombra(2.2, 1.4);

// ================= EL LOCAL DE AL LADO (x = 9) =================
const XP = 5.6;
const local = new THREE.Group(); local.position.set(XP, 0, 0); scene.add(local);
const hoja = new THREE.Group();
{
  const pared = M.navy3;
  // adentro del local: pared cálida, piso y un estante con mercadería (para que el vano no quede negro)
  const fondoL = new THREE.MeshBasicMaterial({ color: 0x8a6440 }), ladoL = new THREE.MeshBasicMaterial({ color: 0x6e4f33 }), pisoL = new THREE.MeshBasicMaterial({ color: 0x4f3926 });
  local.add(mesh(new THREE.PlaneGeometry(1.52, 2.72), fondoL, 0, 1.36, -1.6));
  for (const sx of [-1, 1]) { const m = mesh(new THREE.PlaneGeometry(1.6, 2.72), ladoL, sx * 0.76, 1.36, -0.8); m.rotation.y = -sx * Math.PI / 2; local.add(m); }
  { const m = mesh(new THREE.PlaneGeometry(1.52, 1.6), pisoL, 0, 0.005, -0.8); m.rotation.x = -Math.PI / 2; local.add(m); }
  { const m = mesh(new THREE.PlaneGeometry(1.52, 1.6), ladoL, 0, 2.72, -0.8); m.rotation.x = Math.PI / 2; local.add(m); }
  const colL = [0xefeee5, 0x5ce611, 0x8e8c80, 0xd9a441, 0x2c4268];
  for (const y of [0.75, 1.35, 1.95]) {
    local.add(mesh(new THREE.BoxGeometry(1.4, 0.05, 0.3), new THREE.MeshBasicMaterial({ color: 0x3b2a1c }), 0, y, -1.45));
    for (let k = 0; k < 6; k++) local.add(mesh(new THREE.BoxGeometry(0.16, 0.26 + (k % 2) * 0.06, 0.16), new THREE.MeshBasicMaterial({ color: colL[(k + y * 7) % 5 | 0] }), -0.55 + k * 0.22, y + 0.16, -1.42));
  }
  local.add(mesh(new THREE.PlaneGeometry(0.5, 0.06), new THREE.MeshBasicMaterial({ color: 0xffe2a8 }), 0, 2.6, -1.58));
  // marco de la puerta
  local.add(mesh(rbox(1.66, 0.12, 0.36, 0.03), M.edge, 0, 2.76, 0));
  for (const s of [-1, 1]) local.add(mesh(rbox(0.1, 2.8, 0.36, 0.03), M.edge, s * 0.8, 1.38, 0));
  // vidriera a la derecha
  const vid = new THREE.Group(); vid.position.set(1.55, 1.75, 0.16); local.add(vid);
  vid.add(mesh(rbox(1.1, 1.3, 0.06, 0.03), M.edge, 0, 0, 0));
  vid.add(mesh(new THREE.PlaneGeometry(0.96, 1.16), mat(0x26405f, 0.2, { emissive: 0x1d3150, emissiveIntensity: 0.6 }), 0, 0, 0.035));
  // la hoja de la puerta (bisagra a la izquierda)
  hoja.position.set(-0.72, 0, 0.12); local.add(hoja);
  hoja.add(mesh(rbox(1.42, 2.66, 0.08, 0.03), M.edge, 0.71, 1.35, 0));
  hoja.add(mesh(new THREE.PlaneGeometry(1.12, 1.9), mat(0xbfd6e6, 0.15, { emissive: 0x6d8aa3, emissiveIntensity: 0.35 }), 0.71, 1.5, 0.045));
  const abiertoT = tex(512, 200, (x, w, h) => { x.fillStyle = CRE; rr(x, 0, 0, w, h, 30); x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "ABIERTO", 900, 120, w - 60); x.fillText("ABIERTO", w / 2, h / 2 + 4); });
  hoja.add(mesh(new THREE.PlaneGeometry(0.86, 0.34), new THREE.MeshStandardMaterial({ map: abiertoT, roughness: 0.6, transparent: true, emissive: 0xffffff, emissiveMap: abiertoT, emissiveIntensity: 0.15 }), 0.71, 1.75, 0.06));
  hoja.add(mesh(rbox(0.08, 0.36, 0.08, 0.03), M.g, 1.28, 1.25, 0.08));
  // toldo a rayas navy y crema
  const rayas = tex(512, 128, (x, w, h) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? CRE : NAV; x.fillRect((i * w) / 8, 0, w / 8, h); } });
  const toldo = mesh(new THREE.BoxGeometry(3.2, 0.06, 1.0), [M.cr, M.cr, new THREE.MeshStandardMaterial({ map: rayas, roughness: 0.7 }), M.navy2, M.cr, M.cr], 0, 3.15, 0.55);
  toldo.rotation.x = 0.38; local.add(toldo);
  const flecos = tex(512, 64, (x, w, h) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? CRE : NAV; x.beginPath(); x.moveTo((i * w) / 8, 0); x.lineTo(((i + 1) * w) / 8, 0); x.lineTo(((i + 0.5) * w) / 8, h); x.fill(); } });
  local.add(mesh(new THREE.PlaneGeometry(3.2, 0.2), new THREE.MeshStandardMaterial({ map: flecos, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.7 }), 0, 2.88, 1.05));
  sh(local);
}
const num31 = mesh(textoGeo("31 %", 0.8, 0.28), M.g); scene.add(num31);

// ================= LA CANASTA, EL ALMANAQUE Y LA CANASTA VACÍA (x = -9) =================
const XK = -9;
const rejaTex = tex(512, 256, (x, w, h) => {
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#000000";
  for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) rr(x, 22 + i * 61, 40 + j * 66, 44, 46, 10);
});
function hacerCanasta(cuerpo, borde, W2 = 1.5, H2 = 0.75, D2 = 1.0) {
  const g = new THREE.Group();
  const m = new THREE.MeshStandardMaterial({ color: cuerpo, roughness: 0.5, alphaMap: rejaTex, alphaTest: 0.5, side: THREE.DoubleSide });
  const lado = (w, x, z, ry) => { const p = mesh(new THREE.PlaneGeometry(w, H2), m, x, H2 / 2 + 0.04, z); p.rotation.y = ry; g.add(p); };
  lado(W2, 0, D2 / 2, 0); lado(W2, 0, -D2 / 2, 0); lado(D2, W2 / 2, 0, Math.PI / 2); lado(D2, -W2 / 2, 0, Math.PI / 2);
  g.add(mesh(rbox(W2, 0.06, D2, 0.02), mat(cuerpo, 0.5), 0, 0.04, 0));
  const mb = mat(borde, 0.45, borde === C.red ? { emissive: C.red, emissiveIntensity: 0.15 } : {});
  for (const [w, d, x, z] of [[W2 + 0.08, 0.08, 0, D2 / 2], [W2 + 0.08, 0.08, 0, -D2 / 2], [0.08, D2 + 0.08, W2 / 2, 0], [0.08, D2 + 0.08, -W2 / 2, 0]]) g.add(mesh(rbox(w, 0.1, d, 0.03), mb, x, H2 + 0.06, z));
  for (const [x, z] of [[W2 / 2, D2 / 2], [-W2 / 2, D2 / 2], [W2 / 2, -D2 / 2], [-W2 / 2, -D2 / 2]]) g.add(mesh(rbox(0.08, H2, 0.08, 0.03), mb, x, H2 / 2 + 0.05, z));
  // asas navy levantadas
  for (const s of [-1, 1]) g.add(mesh(new THREE.TorusGeometry(W2 * 0.3, 0.045, 10, 30, Math.PI), M.navy2, 0, H2 + 0.1, s * D2 * 0.32));
  sh(g); scene.add(g); return g;
}
const canasta = hacerCanasta(0x5f7f72, C.navy3); canasta.position.set(XK - 0.8, 0, 0.4); canasta.scale.setScalar(1.0);
const canastaVacia = hacerCanasta(0x5f7f72, C.red, 1.4, 0.7, 0.95); canastaVacia.position.set(XK + 4.0, 0, 1.6);
const sombraCan = sombra(2.2, 1.6), sombraVac = sombra(2.0, 1.5);
const otraMarca = hacerPaquete("B"); scene.add(otraMarca);
const medioKilo = hacerPaquete("A2"); scene.add(medioKilo);
// el almanaque de tapa: HOY · MAÑANA · DESPUÉS (las hojas pasan por arriba hacia atrás)
const almanaque = new THREE.Group(); almanaque.position.set(XK + 0.85, 0, 0.3); almanaque.scale.setScalar(1.0); scene.add(almanaque);
const hojasAlm = [];
{
  const AW = 1.25, AH = 1.35;
  almanaque.add(mesh(rbox(AW + 0.1, 0.1, 0.7, 0.03), M.navy3, 0, 0.05, -0.15));
  const atril = mesh(rbox(AW + 0.06, AH + 0.1, 0.06, 0.03), M.navy3, 0, AH / 2 + 0.12, -0.38); atril.rotation.x = -0.32; almanaque.add(atril);
  const piv = new THREE.Group(); piv.position.set(0, AH + 0.14, -0.2); piv.rotation.x = -0.18; almanaque.add(piv);
  const dias = ["HOY", "MAÑANA", "DESPUÉS"];
  dias.forEach((d, i) => {
    const tx = tex(512, 560, (x, w, h) => {
      x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.fillStyle = i === 2 ? "#8e8c80" : EDGE; x.fillRect(0, 0, w, 120);
      x.fillStyle = CRE; x.font = F(800, 58); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ESPERA", w / 2, 64);
      x.fillStyle = NAV0; ajustar(x, d, 900, 150, w - 60); x.fillText(d, w / 2, 340);
    });
    const hm = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.8 });
    const pg = new THREE.Group(); pg.position.z = 0.014 * (2 - i); piv.add(pg);
    pg.add(mesh(new THREE.BoxGeometry(AW, AH, 0.012), [M.cr, M.cr, M.cr, M.cr, hm, M.cr], 0, -AH / 2, 0));
    hojasAlm.push(pg);
  });
  for (const s of [-0.4, 0, 0.4]) { const a = mesh(new THREE.TorusGeometry(0.06, 0.018, 8, 16), M.g, s, 0.02, 0.03); a.rotation.y = Math.PI / 2; piv.add(a); }
  sh(almanaque);
}
const sombraAlm = sombra(1.8, 1.2);
const num9 = mesh(textoGeo("9 %", 0.72, 0.26), M.red); scene.add(num9);
// la tajada que se esfuma: unas migas que se van
const migas = [];
{ let s = 5; const az = () => ((s = (s * 16807) % 2147483647) / 2147483647); for (let i = 0; i < 14; i++) { const m = mesh(rbox(0.07, 0.07, 0.07, 0.015), i % 3 ? M.red : M.yerba); m.userData = { d: V(az() - 0.5, az() * 0.8 + 0.2, az() - 0.5).normalize(), k: 0.6 + az() * 0.8 }; scene.add(m); migas.push(m); } }

// ================= LAS BARRAS DE VENTAS (arriba de la góndola) =================
const ALTOS = [2, 1, 4, 2, 1]; // en paquetes; la del medio (el hueco) es la más alta y está vacía
const COLV = ["C", "B", null, "D", "C"];
const pilas = ALTOS.map((n, c) => {
  if (c === HUECO.c) return [];
  return Array.from({ length: n }, (_, k) => { const p = hacerPaquete(COLV[c]); scene.add(p); return { o: p, c, k }; });
}).flat();
const barraFantasma = new THREE.Group(); scene.add(barraFantasma);
{
  const w = PK.w + 0.06, h = 4 * (PK.h + 0.04), d = PK.d + 0.06, e = 0.07;
  const fm = new THREE.MeshStandardMaterial({ color: C.red, roughness: 0.6, transparent: true, opacity: 0.22, depthWrite: false });
  const relleno = mesh(new THREE.BoxGeometry(w, h, d), fm, 0, h / 2, 0); relleno.renderOrder = 4; barraFantasma.add(relleno);
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) barraFantasma.add(mesh(rbox(e, h + e, e, 0.02), M.red, (sx * w) / 2, h / 2, (sz * d) / 2));
  for (const y of [0, h]) for (const [ww, dd, x, z] of [[w, e, 0, d / 2], [w, e, 0, -d / 2], [e, d, w / 2, 0], [e, d, -w / 2, 0]]) barraFantasma.add(mesh(rbox(ww + e, e, dd + e, 0.02), M.red, x, y, z));
  // separadores de paquete (líneas punteadas al frente)
  for (let k = 1; k < 4; k++) for (let j = 0; j < 4; j++) barraFantasma.add(mesh(rbox(0.09, 0.035, 0.03, 0.01), M.red, -w / 2 + 0.1 + j * 0.13, (k * h) / 4, d / 2));
}

// ================= EL "?", LA PILA QUE SE VACÍA, EL CONTADOR Y LA NOTITA =================
const pregunta = mesh(textoGeo("?", 2.3, 0.55), M.g); scene.add(pregunta);
const PILA = []; // 4 columnas x 3 filas; se van de arriba para abajo
for (let f = 2; f >= 0; f--) for (let c = 0; c < 4; c++) { const p = hacerPaquete("A"); p.userData.f = f; p.userData.c = c; scene.add(p); PILA.push(p); }
const numGeo = Array.from({ length: 13 }, (_, n) => textoGeo(String(n), 0.75, 0.26));
const MC = mat(C.cr, 0.5, { emissive: C.cr, emissiveIntensity: 0.1 });
const contador = mesh(numGeo[12], MC); scene.add(contador);
const notita = new THREE.Group(); scene.add(notita);
{
  const nt = tex(512, 460, (x, w, h) => {
    x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.fillStyle = NAV3; x.fillRect(0, 0, w, 40);
    x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "Pedido:", 800, 104, w - 70); x.fillText("Pedido:", w / 2, 175);
    ajustar(x, "lunes", 900, 150, w - 70); x.fillText("lunes", w / 2, 320);
  });
  const nm = new THREE.MeshStandardMaterial({ map: nt, roughness: 0.85, emissive: 0xffffff, emissiveMap: nt, emissiveIntensity: 0.12 });
  notita.add(mesh(rbox(1.25, 1.12, 0.03, 0.015), [M.cr, M.cr, M.cr, M.cr, nm, M.cr2]));
  notita.add(mesh(rbox(0.3, 0.1, 0.035, 0.01), mat(0xd9d7c9, 0.4, { transparent: true, opacity: 0.8 }), 0, 0.56, 0.01));
  sh(notita);
}

// ================= EL ALMACÉN DE RUBÉN (zona B) =================
const almacen = new THREE.Group(); almacen.position.copy(OB); scene.add(almacen);
const MOSTRADOR = { y: 0.88, z: -1.12 };
{
  const damero = tex(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(4, 3);
  const p = mesh(new THREE.PlaneGeometry(9, 7), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.45 }), 0.9, 0, 0.1); p.rotation.x = -Math.PI / 2; almacen.add(p);
  const pared = mat(0xe7dcc4, 0.85);
  almacen.add(mesh(new THREE.BoxGeometry(9, 3.4, 0.1), pared, 0.9, 1.7, -3.3));
  almacen.add(mesh(new THREE.BoxGeometry(0.1, 3.4, 4.5), pared, -2.4, 1.7, -1.1));
  almacen.add(mesh(rbox(9, 0.2, 0.12, 0.02), M.navy3, 0.9, 0.1, -3.22));
  let s = 7;
  const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const colores = [C.g, C.cr, C.red, 0xd9a441, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  const estante = mat(0x7a5233, 0.6);
  const frasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  for (const y of [0.7, 1.25, 1.8, 2.35]) {
    almacen.add(mesh(rbox(4.6, 0.05, 0.42, 0.015), estante, 0.4, y, -3.05));
    for (let x = -1.85; x < 2.6; x += 0.17 + az() * 0.08) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (k < 0.45) { const h = 0.22 + az() * 0.18; almacen.add(mesh(rbox(0.13, h, 0.16, 0.012), mat(c, 0.6), x, y + 0.025 + h / 2, -3.0)); }
      else if (k < 0.75) { almacen.add(mesh(frasco, mat(c, 0.35), x, y + 0.125, -3.0)); almacen.add(mesh(tapa, M.cr, x, y + 0.245, -3.0)); }
      else { almacen.add(mesh(botella, mat(c, 0.3), x, y + 0.175, -3.0)); almacen.add(mesh(pico, mat(C.cr3, 0.4), x, y + 0.37, -3.0)); }
    }
  }
  const letTex = tex(1024, 220, (x) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, 1024, 220); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.strokeRect(16, 16, 992, 188); x.fillStyle = "#efeee5"; x.font = F(900, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ALMACÉN", 512, 116); });
  almacen.add(mesh(rbox(1.6, 0.34, 0.05, 0.03), [M.navy2, M.navy2, M.navy2, M.navy2, new THREE.MeshStandardMaterial({ map: letTex, roughness: 0.6, emissive: 0xffffff, emissiveMap: letTex, emissiveIntensity: 0.15 }), M.navy2], 0.15, 3.0, -3.22));
  almacen.add(mesh(rbox(2.5, 0.84, 0.62, 0.03), M.navy3, 0.25, 0.42, MOSTRADOR.z));
  almacen.add(mesh(rbox(2.62, 0.06, 0.72, 0.02), mat(0x9b6a43, 0.55), 0.25, MOSTRADOR.y - 0.02, MOSTRADOR.z));
  const termo = crearTermo(); termo.position.set(0.95, MOSTRADOR.y + 0.01, MOSTRADOR.z - 0.05); almacen.add(termo);
  sh(almacen);
}
// el estante de yerba del almacén (de pie, del lado del cliente) con el mismo hueco
const EST = { x: -0.95, z: -0.3, ry: 0.32, baldas: [0.12, 0.52, 0.92, 1.32], paso: 0.27, k: 0.36 };
const estanteY = new THREE.Group(); estanteY.position.set(OB.x + EST.x, 0, EST.z); estanteY.rotation.y = EST.ry; scene.add(estanteY);
let tagB, tagBOK;
const huecoB = []; // los dos paquetes que llegan con la caja
const xSlot = (i) => (i - 1.5) * EST.paso;
{
  const ancho = 4 * EST.paso + 0.06;
  for (const s of [-1, 1]) estanteY.add(mesh(rbox(0.06, 1.62, 0.4, 0.015), M.navy3, s * (ancho / 2 + 0.03), 0.81, 0));
  estanteY.add(mesh(rbox(ancho + 0.08, 1.58, 0.03, 0.01), M.navy2, 0, 0.8, -0.19));
  estanteY.add(mesh(rbox(ancho + 0.12, 0.1, 0.42, 0.015), M.navy3, 0, 0.05, 0));
  const tiraB = tex(512, 40, (x, w, h) => { x.fillStyle = CRE; x.fillRect(0, 0, w, h); for (let c = 0; c < 4; c++) { const cx = ((c + 0.5) / 4) * w; x.fillStyle = NAV0; x.fillRect(cx - 30, 12, 34, 6); x.fillRect(cx - 30, 24, 22, 5); } });
  const tmB = new THREE.MeshStandardMaterial({ map: tiraB, roughness: 0.6 });
  EST.baldas.forEach((y, b) => {
    estanteY.add(mesh(rbox(ancho, 0.03, 0.38, 0.008), M.edge, 0, y - 0.015, 0));
    if (b < 3) estanteY.add(mesh(rbox(ancho, 0.06, 0.012, 0.004), [M.cr, M.cr, M.cr, M.cr, tmB, M.cr], 0, y - 0.035, 0.195));
  });
  const grilla = [["C", "B", "D", "C"], ["B", null, null, "D"], ["D", "C", "B", "C"]];
  let s = 23; const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  grilla.forEach((fila, b) => fila.forEach((v, i) => {
    if (!v) return;
    for (const z of [0.07, -0.08]) { const p = hacerPaquete(v); p.scale.setScalar(EST.k); p.position.set(xSlot(i) + (az() - 0.5) * 0.015, EST.baldas[b], z); p.rotation.y = (az() - 0.5) * 0.12; estanteY.add(p); }
  }));
  const tagT = (fondo, letra, txt) => tex(512, 200, (x, w, h) => { x.fillStyle = fondo; x.fillRect(0, 0, w, h); x.fillStyle = letra; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 900, 120, w - 50); x.fillText(txt, w / 2, h / 2 + 4); });
  const t1 = tagT(ROJ, CRE, "AGOTADO"), t2 = tagT(VER, NAV0, "EN STOCK");
  tagB = mesh(rbox(0.36, 0.14, 0.02, 0.015), [M.red, M.red, M.red, M.red, new THREE.MeshStandardMaterial({ map: t1, roughness: 0.55, emissive: 0xffffff, emissiveMap: t1, emissiveIntensity: 0.18 }), M.red]);
  tagBOK = mesh(rbox(0.36, 0.14, 0.02, 0.015), [M.g, M.g, M.g, M.g, new THREE.MeshStandardMaterial({ map: t2, roughness: 0.55, emissive: 0xffffff, emissiveMap: t2, emissiveIntensity: 0.18 }), M.g]);
  for (const t of [tagB, tagBOK]) { t.position.set(0, EST.baldas[1] - 0.06, 0.215); estanteY.add(t); }
  for (const i of [1, 2]) { const p = hacerPaquete("A"); p.scale.setScalar(EST.k); estanteY.add(p); huecoB.push({ o: p, i }); }
  sh(estanteY);
}
// el paquete que se lleva Graciela
const suya = hacerPaquete("A"); suya.scale.setScalar(EST.k); scene.add(suya);
// la caja del proveedor
const caja = new THREE.Group(); scene.add(caja);
const tapasCaja = [];
{
  const CW = 0.62, CH = 0.42, CD = 0.44;
  caja.add(mesh(rbox(CW, CH, CD, 0.015), M.kraft, 0, CH / 2, 0));
  caja.add(mesh(rbox(CW + 0.005, 0.07, CD + 0.005, 0.01), M.g, 0, CH * 0.55, 0));
  const etq = tex(256, 128, (x, w, h) => { x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.fillStyle = NAV0; x.font = F(900, 54); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("YERBA", w / 2, h / 2 + 3); });
  caja.add(mesh(new THREE.PlaneGeometry(0.3, 0.15), new THREE.MeshStandardMaterial({ map: etq, roughness: 0.8 }), 0, CH * 0.28, CD / 2 + 0.004));
  for (const s of [-1, 1]) { const piv = new THREE.Group(); piv.position.set(0, CH, (s * CD) / 2); caja.add(piv); piv.add(mesh(rbox(CW, 0.012, CD / 2, 0.005), M.kraft2, 0, 0, (-s * CD) / 4)); piv.userData.s = s; tapasCaja.push(piv); }
  sh(caja);
}
// la pizarra de caballete: SÁBADO / MARTES
const pizarra = new THREE.Group(); scene.add(pizarra);
const pizTex = (txt, sub) => tex(512, 420, (x, w, h) => {
  x.fillStyle = "#1d2a26"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "#a77a4b"; x.lineWidth = 26; x.strokeRect(13, 13, w - 26, h - 26);
  x.fillStyle = CRE; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 900, 118, w - 90); x.fillText(txt, w / 2, 178);
  x.fillStyle = VER; x.font = F(700, 62); x.fillText(sub, w / 2, 300);
});
const PIZ = { sab: pizTex("SÁBADO", "11:40"), mar: pizTex("MARTES", "9:00") };
const pizMat = new THREE.MeshStandardMaterial({ map: PIZ.sab, roughness: 0.8, emissive: 0xffffff, emissiveMap: PIZ.sab, emissiveIntensity: 0.12 });
const pizCara = new THREE.Group();
{
  pizarra.add(pizCara);
  pizCara.add(mesh(rbox(0.66, 0.54, 0.03, 0.01), [M.kraft2, M.kraft2, M.kraft2, M.kraft2, pizMat, M.kraft2], 0, 0, 0));
  const pata = (x, z, rx) => { const p = mesh(rbox(0.035, 1.0, 0.035, 0.01), M.kraft2, x, -0.2, z); p.rotation.x = rx; pizarra.add(p); };
  pata(-0.3, -0.03, 0.0); pata(0.3, -0.03, 0.0); pata(-0.3, -0.25, -0.42); pata(0.3, -0.25, -0.42);
  sh(pizarra);
}
pizarra.position.set(OB.x + 0.82, 0.5, -0.2); pizarra.rotation.set(0, -0.32, 0);
pizCara.position.set(0, 0.22, 0.03);
// la tablet del mostrador: stock → aviso → pedido
const TBW = 1024, TBH = 720;
const fila = (x, y, nombre, frac, color, resaltar) => {
  x.fillStyle = resaltar ? "#3a2a30" : NAV3; rr(x, 40, y, TBW - 80, 128, 24);
  x.fillStyle = CRE; x.font = F(700, 58); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(nombre, 80, y + 66);
  x.fillStyle = "#2c3a55"; rr(x, 540, y + 44, 400, 40, 20);
  x.fillStyle = color; rr(x, 540, y + 44, Math.max(40, 400 * frac), 40, 20);
};
const cabezal = (x, dia) => {
  x.fillStyle = NAV; x.fillRect(0, 0, TBW, TBH);
  x.fillStyle = CRE; x.font = F(800, 70); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Stock", 48, 82);
  x.fillStyle = VER; rr(x, TBW - 380, 28, 350, 108, 54); x.fillStyle = NAV0; x.font = F(800, 66); x.textAlign = "center"; x.fillText(dia, TBW - 205, 84);
};
const TABLET = {
  stock: tex(TBW, TBH, (x) => { cabezal(x, "MARTES"); fila(x, 180, "Yerba 1 kg", 0.62, VER); fila(x, 340, "Fideos", 0.8, VER); fila(x, 500, "Leche", 0.7, VER); }),
  aviso: tex(TBW, TBH, (x) => { cabezal(x, "MARTES"); fila(x, 180, "Yerba 1 kg", 0.16, ROJ, true); fila(x, 340, "Fideos", 0.8, VER); fila(x, 500, "Leche", 0.7, VER); }),
};
const avisoTex = (pedido) => tex(900, 470, (x, w, h) => {
  x.fillStyle = CRE; rr(x, 0, 0, w, h, 44);
  x.fillStyle = ROJ; x.beginPath(); x.arc(86, 92, 44, 0, 7); x.fill(); x.fillStyle = CRE; x.font = F(900, 64); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("!", 86, 96);
  x.fillStyle = NAV0; x.textAlign = "left"; x.font = F(800, 78); x.fillText("Yerba 1 kg", 154, 94);
  x.font = F(800, 72); x.fillText("Quedan 8", 48, 200); x.fillStyle = ROJ; x.font = F(800, 72); x.fillText("Se acaba el sábado", 48, 280);
  x.fillStyle = pedido ? NAV3 : VER; rr(x, 48, 334, w - 96, 106, 53);
  x.fillStyle = pedido ? VER : NAV0; x.font = F(800, 72); x.textAlign = "center"; x.fillText(pedido ? "Pedido hecho" : "Pedir", w / 2, 390);
});
const AVISO = [avisoTex(false), avisoTex(true)];
// en los planos generales la tablet no lleva texto chico: barras grandes y un tilde
TABLET.reposo = tex(TBW, TBH, (x) => {
  x.fillStyle = NAV; x.fillRect(0, 0, TBW, TBH);
  [[0.62, VER], [0.8, VER], [0.7, VER]].forEach(([f, c], i) => { x.fillStyle = "#2c3a55"; rr(x, 80, 150 + i * 170, 860, 90, 45); x.fillStyle = c; rr(x, 80, 150 + i * 170, 860 * f, 90, 45); });
});
TABLET.repuesto = TABLET.reposo;
const tablet = crearTablet(TABLET.stock, 0.62, 0.44, 0.28); scene.add(tablet);
tablet.position.set(OB.x - 0.28, MOSTRADOR.y, MOSTRADOR.z + 0.05); tablet.rotation.y = 0.12;
const tabPant = tablet.userData.pantalla;
const avisoMat = new THREE.MeshBasicMaterial({ map: AVISO[0], transparent: true, toneMapped: false });
const aviso = mesh(new THREE.PlaneGeometry(0.5, 0.26), avisoMat); tablet.userData.pivote.add(aviso);
const tildePedir = hacerTilde(0.05);
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 1e6, dedos: false }); scene.add(ruben.raiz);
const graciela = crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 1e6 }); scene.add(graciela.raiz);
for (const p of [ruben, graciela]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const mate = crearMate(); scene.add(mate);
const lentesG = [], labioG = [];
graciela.cabeza.traverse((o) => {
  if (!o.isMesh) return;
  if (o.geometry.type === "TorusGeometry" && Math.abs(o.geometry.parameters.radius - 0.088) < 1e-6) lentesG.push(o);
  if (Math.abs(o.scale.y - 0.26) < 1e-6 && Math.abs(o.scale.x - 0.01) < 1e-6) o.visible = false; // patillas
});
graciela.raiz.traverse((o) => { if (o.isMesh && o.material && o.material.color && o.material.color.getHex() === ELENCO.clienta.labios) labioG.push(o); });
const tildeG = hacerTilde(0.1);

// ================= TIEMPOS CLAVE =================
const T = {
  tiembla: W[4] + 0.02, sube: W[6] - 0.04, rebana: S["s02-otro-lado"] + 0.08, vuela: W[11] - 0.02,
  abre: W[11] + 0.1, entra: W[15] + 0.05, num31: W[11] + 0.62,
  vuelta: S["s03-marca"] - 0.05, cae: W[21] - 0.15, espera: W[23] - 0.05,
  nueve: Math.max(W[25] - 0.05, S["s04-nada"] + 0.45), esfuma: W[31] - 0.02,
  grua: S["s05-lo-que-mas"] - 0.08, barras: W[34] - 0.12, roja: W[37] - 0.2, golpe: W[39] - 0.02,
  preg: S["s06-por-que"] - 0.04, pila: W[42] - 0.06, salen: W[44] - 0.05, cero: W[47], notita: W[47] + 0.12,
  flipMar: S["s09-aviso"] + 0.3, avisa: W[65] - 0.05, quedan: W[66] - 0.03, pide: W[70] + 0.02,
  cajaCae: W[70] + 0.42, flipSab: S["s11-encuentra"] - 0.4, toma: W[75] + 0.05, encuentra: W[76] + 0.05,
};
T.cortePila = T.cajaCae - 0.12; // corte al estante (después del "Pedir")

// ================= CÁMARA =================
// PLANOS: [desde, etiqueta, claves]; clave [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ, fov].
// Dentro de un plano, cúbica monótona continua; entre planos, corte seco con whoosh.
const XG = XK;
const PLANOS = [
  [0, "A", [
    [0, 0, 3, 16.0, 0, 3.21, 0, 30],
    [T.sube, -2, 3, 15.3, 0, 3.3, 0.2, 30],
    [S["s02-otro-lado"], -3, 3, 13.0, 0, 3.25, 2.3, 30],
    [T.vuela, 0, 3, 12.4, 0, 3.2, 3.3, 30],
    [T.vuela + 0.3, 6, 4, 11.2, XP * 0.6, 2.9, 1.2, 30],
    [T.vuela + 0.6, 8, 4, 11.0, XP - 0.4, 3.2, 0.6, 30],
    [T.entra + 0.2, 4, 4, 10.6, XP - 0.1, 3.2, 0.4, 30],
    [T.vuelta, 0, 4, 10.2, XP + 0.05, 3.15, 0.4, 30],
  ]],
  // corte seco (whoosh) a la canasta y el almanaque
  [T.vuelta, "A", [
    [T.vuelta, -4, 9, 10.4, XG, 1.05, 1.0, 30],
    [S["s04-nada"], -1, 9, 10.0, XG, 1.05, 1.0, 30],
    [S["s04-nada"] + 0.45, 0, 10, 7.4, XK + 4.0, 1.15, 1.6, 30],
    [T.grua, 3, 10, 7.0, XK + 4.0, 1.15, 1.6, 30],
  ]],
  // corte seco (whoosh) a la góndola con las barras de ventas
  [T.grua, "A", [
    [T.grua, 3, 3, 12.6, 0, 3.6, 0, 30],
    [T.barras + 0.3, 0, 4, 18.0, 0, 6.5, 0, 30],
    [T.preg - 0.05, -2, 4, 17.6, 0, 6.5, 0, 30],
    [T.preg + 0.3, 0, 3, 8.6, 0, 6.35, 0.2, 30],
    [T.pila - 0.05, 3, 3, 8.0, 0, 6.35, 0.2, 30],
    [T.pila + 0.35, 0, 3, 11.2, 0, 7.3, 0, 30],
    [T.cero - 0.1, 2, 3, 11.0, 0, 7.3, 0, 30],
    [T.cero + 0.1, -2, 3, 10.4, 0, 6.6, 0.2, 30],
    [T.notita + 0.4, 0, 2, 9.4, 0, TOPE_Y + 1.15, 0.3, 30],
    [S["s08-ruben"], 0, 1, 8.0, 0, TOPE_Y + 1.05, 0.3, 30],
  ]],
  [S["s08-ruben"], "B1", [
    [S["s08-ruben"], 10, 7, 6.9, OB.x + 0.0, 1.05, -0.7, 34],
    [S["s09-aviso"], 6, 7, 6.6, OB.x + 0.0, 1.05, -0.7, 34],
  ]],
  [S["s09-aviso"], "B2", [
    [S["s09-aviso"], 6, 7, 5.0, OB.x + 0.3, 1.05, -1.0, 34],
    [T.flipMar + 0.15, 3, 8, 4.7, OB.x + 0.2, 1.07, -1.05, 34],
    [T.avisa - 0.1, 2, 10, 3.25, OB.x - 0.06, 1.22, -1.15, 34],
    [T.cortePila, -1, 10, 2.95, OB.x - 0.06, 1.22, -1.15, 34],
  ]],
  [T.cortePila, "B3", [
    [T.cortePila, 18, 10, 3.6, OB.x + EST.x + 0.25, 0.72, EST.z + 0.2, 34],
    [S["s11-encuentra"], 12, 10, 3.4, OB.x + EST.x + 0.25, 0.72, EST.z + 0.2, 34],
  ]],
  [S["s11-encuentra"], "B4", [
    [S["s11-encuentra"], 4, 7, 6.6, OB.x + 0.0, 1.05, -0.7, 34],
    [S["s12-queres"], 8, 7, 6.3, OB.x + 0.0, 1.05, -0.7, 34],
  ]],
  [S["s12-queres"], "A2", [
    [S["s12-queres"], -6, 4, 15.2, 0, 3.1, 0, 30],
    [S["s13-llamada"], 3, 4, 14.8, 0, 3.1, 0, 30],
  ]],
  [S["s13-llamada"], "FIN", [
    [S["s13-llamada"], -7, 4, 18.3, 0, 3.85, 0, 30],
    [DUR, 6, 4, 18.0, 0, 3.85, 0, 30],
  ]],
];
const _mira = new THREE.Vector3();
const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6], k[7]];
let plano = "A";
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
  plano = PLANOS[pi][1];
  const CAM = PLANOS[pi][2];
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[Math.min(i + 1, CAM.length - 1)];
  const u = b === a ? 0 : sg(t, a[0], b[0]);
  const p1 = val(a), p2 = val(b), h = b[0] - a[0];
  const prev = i > 0 ? CAM[i - 1] : null;
  const next = i + 2 < CAM.length ? CAM[i + 2] : null;
  const p0 = prev ? val(prev) : null, p3 = next ? val(next) : null;
  const tang = (q0, t0, q1, t1, q2, t2, j) => {
    const d1 = (q1[j] - q0[j]) / (t1 - t0), d2 = (q2[j] - q1[j]) / (t2 - t1);
    if (d1 * d2 <= 0) return 0;
    const h1 = t1 - t0, h2 = t2 - t1;
    return (3 * (h1 + h2)) / ((2 * h2 + h1) / d1 + (h2 + 2 * h1) / d2);
  };
  const s2 = u * u, s3 = s2 * u;
  const v = p1.map((_, j) => {
    if (h <= 0) return p1[j];
    const m1 = p0 ? tang(p0, prev[0], p1, a[0], p2, b[0], j) : 0;
    const m2 = p3 ? tang(p1, a[0], p2, b[0], p3, next[0], j) : 0;
    return (2 * s3 - 3 * s2 + 1) * p1[j] + (s3 - 2 * s2 + u) * h * m1 + (-2 * s3 + 3 * s2) * p2[j] + (s3 - s2) * h * m2;
  });
  const [az, el, ld, tx, ty, tz, fov] = v;
  const d = Math.exp(ld);
  _mira.set(tx, ty, tz);
  camera.position.set(tx + d * Math.cos(el * D2R) * Math.sin(az * D2R), ty + d * Math.sin(el * D2R), tz + d * Math.cos(el * D2R) * Math.cos(az * D2R));
  const k = Math.min(1, 10 / d) * 0.5;
  camera.position.x += Math.sin(t * 0.7) * 0.03 * k; camera.position.y += Math.sin(t * 0.53) * 0.02 * k;
  camera.fov = fov;
  camera.near = Math.max(0.05, d * 0.01); camera.far = Math.max(200, d * 8);
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  return { d, az, el };
}

// ================= ZONA A en el tiempo =================
const HUECO_P = V(xCol(HUECO.c), GD.baldas[HUECO.b], 0.2); // donde estaba el paquete que falta
const FLOTA = V(0, 2.75, 1.2); // frente al hueco
const GRANDE = V(0, 1.75, 3.3), KG = 2.9; // el paquete gigante (escala)
const PUERTA = V(XP, 0.25, 0.7);
const TAJ_K = V(XG + 0.1, 0, 1.9); // donde quedan flotando las tajadas que no se fueron
const GAP = 0.13; // separación entre tajadas (local)
const xTaj = (i) => ((CORTES[i] + CORTES[i + 1]) / 2 - 0.5) * PKG.w;
function zonaA(t) {
  const A = plano === "A", A2 = plano === "A2", FIN = plano === "FIN", enA = A || A2 || FIN;
  piso.visible = A || A2;
  gondola.visible = enA; sombraGond.visible = enA; sombraGond.position.set(0, 0.006, 0.1);
  // ---- la góndola: el precio del hueco tiembla en "No había"; en el callback el hueco está lleno ----
  const lleno = A2 || FIN;
  repuestos.forEach((p) => { p.visible = lleno; p.scale.setScalar(1); });
  tagHueco.visible = !lleno; tagHuecoOK.visible = lleno;
  {
    const u = t - T.tiembla;
    tagHueco.rotation.z = u > 0 && u < 0.6 ? Math.exp(-u * 7) * Math.sin(u * 46) * 0.09 : 0;
    tagHueco.scale.setScalar(1 + 0.12 * pulso(t, T.tiembla, 0.22));
    tagHuecoOK.scale.setScalar(A2 ? 1 + 0.15 * pulso(t, S["s12-queres"] + 0.45, 0.3) : 1);
  }
  // ---- el paquete que vino a buscar: aparece en el hueco, sale al frente, crece y se rebana ----
  {
    const vis = A && t > T.sube && t < T.grua + 0.6;
    grande.visible = vis; sombraGrande.visible = vis && t > S["s02-otro-lado"] && t < T.grua;
    if (vis) {
      const sale = eio(sg(t, T.sube, T.sube + 0.45));
      const crece = eio(sg(t, S["s02-otro-lado"] - 0.15, S["s02-otro-lado"] + 0.3));
      let p = lerpV(HUECO_P.clone().add(V(0, 0.02, 0)), FLOTA, sale);
      p = lerpV(p, GRANDE, crece);
      p.y += Math.sin(t * 2.2) * 0.04 * (1 - crece);
      const k = lerp(0.7, 1, eo(sg(t, T.sube, T.sube + 0.3))) * lerp(1, KG, crece);
      grande.position.copy(p); grande.scale.setScalar(k);
      grande.rotation.set(0, Math.sin(t * 1.3) * 0.12 * (1 - crece) + 0.04 * crece, 0);
      // las tajadas se abren en abanico
      const ab = bk(sg(t, T.rebana, T.rebana + 0.32));
      entero.visible = t < T.rebana;
      [taj9, taj15, taj19, taj26, taj31].forEach((s, i) => {
        s.position.set(xTaj(i) + (i - 2) * GAP * ab, 0, 0);
        s.rotation.set(0, 0, 0);
        s.visible = t >= T.rebana; s.scale.setScalar(1);
      });
      // en "tercio" la tajada del 31 % salta y se ilumina
      if (t < T.vuela) taj31.position.y += 0.12 * pulso(t, W[10] - 0.05, 0.3) + 0.06 * sg(t, W[10], W[10] + 0.15);
      // el resto viaja hasta la canasta (mientras la cámara mira la puerta)
      const via = eio(sg(t, T.vuela + 0.55, T.vuelta + 0.2));
      if (via > 0) {
        const pK = lerpV(GRANDE, TAJ_K, via); pK.y += Math.sin(Math.PI * via) * 0.6;
        grande.position.copy(pK); grande.scale.setScalar(KG * lerp(1, 0.42, via));
        grande.rotation.y = lerp(grande.rotation.y, 0, via);
      }
      etqTaj.forEach((m, i) => (m.visible = via > 0.9 && !(i === 0 && t > S["s04-nada"] + 0.15)));
      sombraGrande.position.set(grande.position.x, 0.008, grande.position.z + 0.1); sombraGrande.scale.setScalar(grande.scale.x / KG);
      grande.updateMatrixWorld(true);
      // 31 %: se va volando a la puerta de al lado y entra
      if (t > T.vuela) {
        const u = eio(sg(t, T.vuela, T.vuela + 0.6));
        const ent = eio(sg(t, T.entra, T.entra + 0.45));
        const desde = V(xTaj(4) + 2 * GAP, 0, 0);
        const g0 = grande.position.clone(), k0 = grande.scale.x;
        const aLocal = (w) => w.clone().sub(g0).divideScalar(k0); // ignora el giro chico del paquete
        const pf = lerpV(aLocal(PUERTA.clone().add(V(0, 0, 0.6))), aLocal(PUERTA.clone().add(V(0, 0, -1.1))), ent);
        const p2 = lerpV(desde, pf, u); p2.y += Math.sin(Math.PI * u) * 0.35;
        taj31.position.copy(p2);
        taj31.rotation.set(0, -Math.sin(Math.PI * u) * 0.6, Math.sin(Math.PI * u) * -0.2);
        taj31.scale.setScalar(lerp(1, 0.6, u) * (1 - 0.3 * ent) * (KG / k0));
        taj31.visible = t < T.vuelta;
      }
      const g0 = grande.position.clone(), k0 = grande.scale.x;
      const aLocal = (w) => w.clone().sub(g0).divideScalar(k0);
      // 26 % y 19 %: caen en la canasta y se vuelven "otra marca" y "medio kilo"
      const caeTaj = (s, i, t0, destW) => {
        if (t <= t0) return;
        const u = eio(sg(t, t0, t0 + 0.35));
        const pp = lerpV(V(xTaj(i) + (i - 2) * GAP, 0, 0), aLocal(destW), u); pp.y += Math.sin(Math.PI * u) * 1.4 / k0;
        s.position.copy(pp); s.rotation.set(0, 0, 0); s.scale.setScalar(1 - u * 0.5);
        s.visible = u < 0.98;
      };
      const dC = canasta.position.clone().add(V(0, 0.15, 0));
      caeTaj(taj26, 3, T.cae, dC.clone().add(V(-0.3, 0, 0)));
      caeTaj(taj19, 2, T.cae + 0.08, dC.clone().add(V(0.32, 0, 0)));
      // 15 %: se apoya en el almanaque
      if (t > T.espera - 0.2) {
        const u = eio(sg(t, T.espera - 0.2, T.espera + 0.15));
        const pp = lerpV(V(xTaj(1) - GAP, 0, 0), aLocal(almanaque.position.clone().add(V(-0.95, 0.0, 0.35))), u); pp.y += Math.sin(Math.PI * u) * 0.5 / k0;
        taj15.position.copy(pp); taj15.rotation.set(0, 0.25 * u, 0); taj15.scale.setScalar(1);
      }
      // 9 %: baja a la canasta vacía y se esfuma en "nada"
      {
        const t0 = S["s04-nada"] + 0.05;
        const u = eio(sg(t, t0, t0 + 0.4));
        if (t > t0) { const pp = lerpV(V(xTaj(0) - 2 * GAP, 0, 0), aLocal(canastaVacia.position.clone().add(V(0, 0.55, 0))), u); pp.y += Math.sin(Math.PI * u) * 1.2 / k0; pp.z += Math.sin(Math.PI * u) * 1.2 / k0; taj9.position.copy(pp); }
        const rojo = sg(t, T.nueve - 0.05, T.nueve + 0.3);
        taj9Mats.forEach((m) => { m.color.copy(m.userData.c0).lerp(new THREE.Color(C.red), rojo * 0.75); m.emissiveIntensity = 0.25 * rojo; });
        const esf = sg(t, T.esfuma, T.esfuma + 0.25);
        taj9.scale.setScalar((1 + 0.15 * pulso(t, T.nueve, 0.25)) * (1 - eio(esf)) * lerp(1, 0.5, u));
        taj9.visible = esf < 0.99;
      }
      // en la grúa lo que queda se achica (sale de cuadro)
      if (t > T.grua) { const kk = popOut(t, T.grua + 0.1, 0.3); grande.scale.multiplyScalar(Math.max(0.001, kk)); grande.visible = kk > 0.01; }
    }
  }
  // ---- la puerta de al lado ----
  {
    const vis = A && t > S["s02-otro-lado"] && t < T.vuelta + 0.7;
    local.visible = vis;
    hoja.rotation.y = 1.45 * eio(sg(t, T.abre, T.abre + 0.3));
    const v31 = vis && t > T.num31;
    ocultar(num31, v31 ? popIn(t, T.num31, 0.3) : 0);
    if (v31) { num31.position.set(XP, 4.25 + Math.sin(t * 2) * 0.03, 0.75); num31.rotation.set(0, Math.sin(t * 1.4) * 0.12, 0); }
  }
  // ---- canasta, almanaque, canasta vacía ----
  {
    const vis = A && t > S["s02-otro-lado"] && t < T.grua + 0.7;
    // en "nueve" la canasta y el almanaque se van (queda sola la canasta vacía)
    const se = 1;
    canasta.visible = almanaque.visible = vis && se > 0.01; canastaVacia.visible = vis;
    sombraCan.visible = sombraAlm.visible = sombraVac.visible = vis;
    sombraCan.position.set(canasta.position.x, 0.007, canasta.position.z); sombraAlm.position.set(almanaque.position.x, 0.007, almanaque.position.z);
    sombraVac.position.set(canastaVacia.position.x, 0.007, canastaVacia.position.z);
    const rb = rebote(t, T.cae + 0.3, 9, 28, 0.06);
    canasta.scale.set(1 + rb * 0.5, 1 - rb, 1 + rb * 0.5); almanaque.scale.setScalar(1.0);
    const rv = rebote(t, T.esfuma, 8, 26, 0.09);
    const kv = 1;
    canastaVacia.visible = sombraVac.visible = vis && kv > 0;
    canastaVacia.scale.set(kv * (1 + rv * 0.5), kv * (1 - rv), kv * (1 + rv * 0.5));
    canastaVacia.rotation.y = rebote(t, T.esfuma, 7, 22, 0.05);
    const tC = T.cae + 0.25;
    [[otraMarca, -0.32, 0.22], [medioKilo, 0.36, -0.15]].forEach(([p, dx, ry], i) => {
      const t0 = tC + i * 0.08;
      p.visible = vis && t > t0 && se > 0.01;
      if (p.visible) { p.position.copy(canasta.position).add(V(dx, 0.1, 0.05)); p.rotation.set(0, ry, i ? -0.08 : 0.1); p.scale.setScalar(se * popIn(t, t0, 0.3) * (i ? 0.66 : 0.95)); }
    });
    {
      const tf = [T.espera + 0.05, T.espera + 0.33];
      let cual = 0; tf.forEach((x, k) => { if (t >= x + 0.07) cual = k + 1; });
      const ap = tf.reduce((m, x) => Math.max(m, pulso(t, x, 0.14)), 0);
      hojasAlm.forEach((h, i) => { h.rotation.x = 0; h.visible = i === cual; h.scale.set(1, 1 - 0.8 * ap, 1); });
    }
    const v9 = vis && t > T.nueve;
    ocultar(num9, v9 ? popIn(t, T.nueve, 0.3) : 0);
    if (v9) { num9.position.copy(canastaVacia.position).add(V(0, 1.75 + Math.sin(t * 2) * 0.03, 0)); num9.rotation.set(0, Math.sin(t * 1.4) * 0.12, 0); }
    migas.forEach((m) => {
      const u = sg(t, T.esfuma, T.esfuma + 0.55);
      m.visible = vis && u > 0 && u < 1;
      if (m.visible) { const p = canastaVacia.position.clone().add(V(0, 0.9, 0)).addScaledVector(m.userData.d, eo(u) * 0.9 * m.userData.k); p.y -= u * u * 0.5; m.position.copy(p); m.scale.setScalar((1 - u) * 1.3); m.rotation.set(u * 4, u * 3, 0); }
    });
  }
  // ---- barras de ventas arriba de la góndola; la del hueco: vacía, roja, la más alta ----
  {
    const vis = A && t > T.barras - 0.05 && t < T.preg + 0.35;
    const baja = sg(t, T.preg - 0.05, T.preg + 0.25);
    pilas.forEach(({ o, c, k }) => {
      const t0 = T.barras + k * 0.09 + (c % 2) * 0.05;
      o.visible = vis && t > t0;
      if (o.visible) {
        const kk = popIn(t, t0, 0.24) * (1 - eio(baja));
        o.position.set(xCol(c), TOPE_Y + k * (PK.h + 0.04) * (1 - baja), 0.1); o.rotation.set(0, k % 2 ? 0.04 : -0.04, 0);
        o.scale.setScalar(Math.max(0.001, kk)); o.visible = kk > 0.15;
      }
    });
    const vb = vis && t > T.roja;
    barraFantasma.visible = vb;
    if (vb) {
      const crece = eio(sg(t, T.roja, T.golpe));
      const cond = eio(sg(t, T.preg - 0.08, T.preg + 0.12));
      barraFantasma.position.set(xCol(HUECO.c), TOPE_Y + cond * 1.2, 0.1);
      barraFantasma.scale.set((1 + 0.08 * pulso(t, T.golpe, 0.22)) * (1 - cond * 0.9), Math.max(0.02, crece * (1 - cond * 0.85)), 1 - cond * 0.9);
      barraFantasma.visible = cond < 0.99;
    }
  }
  // ---- "?" → la pila que se vacía → la notita ----
  {
    const CEN = V(0, TOPE_Y + 1.25, 0.15);
    const giro = eio(sg(t, T.pila - 0.12, T.pila + 0.2));
    const vp = A && t > T.preg && giro < 0.5;
    ocultar(pregunta, vp ? popIn(t, T.preg, 0.3) * (1 + 0.05 * pulso(t, W[41], 0.3)) : 0);
    if (vp) { pregunta.position.copy(CEN); pregunta.rotation.set(0, Math.sin(t * 1.5) * 0.18 + giro * Math.PI, 0); pregunta.scale.x *= 1 - giro * 1.6; }
    const vpi = A && t > T.pila && t < S["s08-ruben"] + 0.01;
    const salida = (k) => T.salen + (T.cero - 0.1 - T.salen) * (k / 11);
    PILA.forEach((p, i) => {
      const { f, c } = p.userData;
      const tin = T.pila + 0.025 * (f * 4 + c);
      const orden = (2 - f) * 4 + (3 - c);
      const tsal = salida(orden);
      const sal = sg(t, tsal, tsal + 0.22);
      p.visible = vpi && t > tin && sal < 1;
      if (!p.visible) return;
      const base = V((c - 1.5) * 0.6, TOPE_Y + f * (PK.h + 0.05), 0.1);
      const fuera = base.clone().add(V(2.6, 0.1, 1.8));
      const pp = lerpV(base, fuera, eio(sal)); pp.y += Math.sin(Math.PI * sal) * 0.25 + 0.3 * eo(sg(sal, 0, 0.3));
      p.position.copy(pp); p.rotation.set(0, sal * sal * -1.2 + ((i % 3) - 1) * 0.03, sal * sal * -0.6);
      const kp = popIn(t, tin, 0.22) * Math.pow(1 - sal, 1.6); p.scale.setScalar(kp); if (kp < 0.15 && sal > 0) p.visible = false;
    });
    const vc = A && t > T.pila + 0.4 && t < T.notita + 0.26;
    contador.visible = vc;
    if (vc) {
      let n = 12; for (let i = 0; i < 12; i++) if (t >= salida(i) + 0.08) n = 11 - i;
      if (contador.geometry !== numGeo[n]) contador.geometry = numGeo[n];
      contador.material = n === 0 ? M.red : MC;
      const ultimo = salida(11 - n) + 0.08;
      const k = popIn(t, T.pila + 0.4, 0.25) * popOut(t, T.notita + 0.12, 0.15) * (1 + 0.1 * pulso(t, ultimo, 0.12) + 0.25 * (n === 0 ? pulso(t, T.cero, 0.3) : 0));
      contador.scale.setScalar(k); contador.visible = k > 0.06; contador.position.set(0, lerp(TOPE_Y + 3 * (PK.h + 0.05) + 0.42, TOPE_Y + 2.15, eio(sg(t, T.cero - 0.1, T.cero + 0.25))), 0.4); contador.rotation.set(0, Math.sin(t * 1.4) * 0.1, 0);
    }
    const vn = A && t > T.notita;
    notita.visible = vn;
    if (vn) {
      const u = eio(sg(t, T.notita, T.notita + 0.38));
      const p = lerpV(V(-4.2, TOPE_Y + 2.6, 1.0), V(0, TOPE_Y + 1.0, 0.3), u); p.y += Math.sin(Math.PI * u) * 0.5;
      notita.position.copy(p);
      const sq = rebote(t, T.notita + 0.38, 12, 30, 0.12);
      notita.rotation.set(-0.04, (1 - u) * 0.8, 0.025 + (1 - u) * 0.5);
      const kn = 1.6 * lerp(0.6, 1, bk(u));
      notita.scale.set(kn * (1 + sq), kn * (1 - sq), kn);
    }
  }
}

// ================= ZONA B: el almacén =================
const R0 = { x: OB.x + 0.36, z: -1.62, giro: 0 };
const RK = [
  [0, { ...R0, ...BRAZOS.jarras, ...CARA.fastidio, cabeza: { giro: -0.35, asiente: 0.05, ladea: 0.06 }, ojos: { x: -0.6, y: -0.1, abiertos: 0.75 } }],
  [S["s09-aviso"], { ...R0, x: OB.x + 0.12, ...BRAZOS.apoyado, ...CARA.sonrisa, cejas: { alto: 0.3, ang: 0.1 }, cabeza: { giro: -0.05, asiente: 0.25, ladea: 0 }, ojos: { x: -0.1, y: -0.45, abiertos: 1, feliz: 0.1 } }, 0.05],
  [T.avisa + 0.15, { ...CARA.sorpresa, cabeza: { giro: -0.05, asiente: 0.28, ladea: 0 }, ojos: { x: -0.1, y: -0.8, abiertos: 1 } }, 0.2],
  [W[66] + 0.2, { ...CARA.sonrisa, ojos: { x: -0.1, y: -0.8, abiertos: 1, feliz: 0.3 } }, 0.3],
];
const RK2 = [
  [0, { ...R0, ...BRAZOS.apoyado, ...CARA.sonrisa, cabeza: { giro: -0.4, asiente: 0.06, ladea: 0.05 }, ojos: { x: -0.7, y: -0.15, abiertos: 1, feliz: 0.3 } }],
  [T.encuentra + 0.1, { ...CARA.feliz, cabeza: { giro: -0.45, asiente: 0.0, ladea: 0.08 } }, 0.3],
];
const mateMano = { manoD: [-0.24, 0.3, 0.3], codoD: [-0.8, -0.6, 0], dedoD: 0 };
const G0 = { x: OB.x - 0.28, z: 0.12, giro: -0.85 };
const GK = [[0, { ...G0, ...BRAZOS.costado, ...CARA.resignado, cabeza: { giro: -0.1, asiente: 0.12, ladea: 0.05 }, ojos: { x: -0.3, y: -0.3, abiertos: 1 } }]];
const GK2 = [
  [0, { ...G0, ...BRAZOS.costado, ...CARA.esperanza, cabeza: { giro: -0.1, asiente: 0.12, ladea: 0.0 }, ojos: { x: -0.3, y: -0.3, abiertos: 1 } }],
  [T.encuentra, { ...CARA.feliz, cabeza: { giro: 0.45, asiente: -0.02, ladea: -0.06 }, ojos: { x: 0.4, y: 0, abiertos: 1, feliz: 0.45 } }, 0.35],
];
const _v = new THREE.Vector3();
function zonaB(t) {
  const B1 = plano === "B1", B2 = plano === "B2", B3 = plano === "B3", B4 = plano === "B4", enB = B1 || B2 || B3 || B4;
  almacen.visible = estanteY.visible = pizarra.visible = tablet.visible = enB;
  ruben.raiz.visible = enB && !B3; graciela.raiz.visible = B1 || B4;
  caja.visible = B3; suya.visible = false; tildeG.visible = false; tildePedir.visible = false; mate.visible = false; aviso.visible = false;
  if (!enB) return;
  // pizarra: SÁBADO → (rebobina) MARTES → SÁBADO
  {
    const f1 = sg(t, T.flipMar, T.flipMar + 0.1), f2 = sg(t, T.flipSab, T.flipSab + 0.1);
    const cara = f2 > 0.5 ? PIZ.sab : f1 > 0.5 ? PIZ.mar : PIZ.sab;
    if (pizMat.map !== cara) { pizMat.map = cara; pizMat.emissiveMap = cara; pizMat.needsUpdate = true; }
    const vuelta = f2 > 0 && f2 < 1 ? f2 : f1 > 0 && f1 < 1 ? f1 : 0;
    pizCara.scale.set(1 - 0.45 * Math.sin(Math.PI * vuelta), 1 + 0.06 * Math.sin(Math.PI * vuelta), 1);
  }
  // el hueco del estante: lleno desde que llega la caja
  const llega = (k) => T.cajaCae + 0.32 + k * 0.1;
  huecoB.forEach(({ o, i }, k) => {
    const on = (B3 && t > llega(k)) || B4;
    o.visible = on && !(B4 && k === 0 && t > T.toma + 0.05);
    if (!o.visible) return;
    const fin = V(xSlot(i), EST.baldas[1], 0.07);
    if (B3) {
      const u = eio(sg(t, llega(k), llega(k) + 0.24));
      estanteY.updateMatrixWorld(true);
      const desde = estanteY.worldToLocal(caja.position.clone().add(V(0, 0.6, 0)));
      const p = lerpV(desde, fin, u); p.y += Math.sin(Math.PI * u) * 0.35;
      o.position.copy(p); o.rotation.set(0, (1 - u) * 1.5, 0); o.scale.setScalar(EST.k * popIn(t, llega(k), 0.2));
    } else { o.position.copy(fin); o.rotation.set(0, 0, 0); o.scale.setScalar(EST.k); }
  });
  const tagOK = B4 || (B3 && t > llega(1) + 0.2);
  tagB.visible = !tagOK; tagBOK.visible = tagOK;
  tagBOK.scale.setScalar(B3 ? 1 + 0.2 * pulso(t, llega(1) + 0.2, 0.25) : 1);
  tagB.rotation.z = B1 ? rebote(t, S["s08-ruben"] + 0.55, 7, 46, 0.08) : 0;
  // la caja del proveedor cae al lado del estante
  if (B3) {
    const u = sg(t, T.cajaCae, T.cajaCae + 0.3);
    caja.position.set(OB.x + EST.x + 0.3, 2.0 * (1 - u * u), EST.z + 0.62);
    const sq = rebote(t, T.cajaCae + 0.3, 10, 30, 0.12);
    caja.scale.set(1 + sq * 0.6, 1 - sq, 1 + sq * 0.6); caja.rotation.set(0, -0.35, (1 - u) * 0.2);
    tapasCaja.forEach((pv) => { pv.rotation.x = pv.userData.s * 2.1 * eio(sg(t, T.cajaCae + 0.12, T.cajaCae + 0.28)); });
  }
  // la tablet: stock → aviso ("quedan 8") → pedido
  {
    const pant = B1 || B4 || t < T.avisa - 0.05 ? TABLET.reposo : TABLET.aviso;
    if (tabPant.material.map !== pant) { tabPant.material.map = pant; tabPant.material.emissiveMap = pant; tabPant.material.needsUpdate = true; }
    aviso.visible = B2 && t > T.avisa;
    if (aviso.visible) {
      const k = popIn(t, T.avisa, 0.3) * (1 + 0.06 * pulso(t, T.quedan, 0.25)) * (1 - 0.05 * pulso(t, T.pide - 0.05, 0.15));
      aviso.scale.setScalar(k); aviso.position.set(0, 0.44 * 0.45, 0.012);
      const m = t > T.pide ? AVISO[1] : AVISO[0];
      if (avisoMat.map !== m) { avisoMat.map = m; avisoMat.needsUpdate = true; }
      tildePedir.visible = t > T.pide;
      if (tildePedir.visible) {
        aviso.updateMatrixWorld(true);
        tildePedir.position.copy(aviso.localToWorld(V(0.17, -0.083, 0.02)));
        tildePedir.quaternion.copy(aviso.getWorldQuaternion(new THREE.Quaternion()));
        tildePedir.scale.setScalar(popIn(t, T.pide, 0.25));
      }
    }
  }
  // Rubén
  if (ruben.raiz.visible) {
    let pr = B4 ? poseEn(t, RK2) : poseEn(t, RK);
    if (B1) pr.cabeza = { ...pr.cabeza, giro: pr.cabeza.giro + niega(t, S["s08-ruben"] + 0.7, S["s08-ruben"] + 1.9, 0.28, 2) };
    if (B2) {
      // toca "Pedir" con el índice
      const k = sg(t, T.pide - 0.35, T.pide - 0.05) * (1 - sg(t, T.pide + 0.25, T.pide + 0.55));
      if (k > 0) {
        ruben.poner(pr); ruben.raiz.updateMatrixWorld(true); tablet.updateMatrixWorld(true);
        const obj = ruben.cuerpo.worldToLocal(aviso.localToWorld(V(0, -0.083, 0.06)));
        pr = { ...pr, manoD: mezclar(pr.manoD, [obj.x, obj.y, obj.z], eio(k)), codoD: [-0.8, -0.6, 0.2], dedoD: k };
      }
    }
    if (B4) pr = { ...pr, ...mateMano };
    ruben.poner(pr);
    mate.visible = B4;
    if (mate.visible) { ruben.raiz.updateMatrixWorld(true); ruben.mano("D").getWorldPosition(mate.position); mate.position.y -= 0.06; mate.position.z += 0.03; mate.rotation.set(0, 0.6, 0); }
  }
  // Graciela: estira la mano al hueco (s08); el sábado toma la suya (s11)
  if (graciela.raiz.visible) {
    let pg = B4 ? poseEn(t, GK2) : poseEn(t, GK);
    graciela.poner(pg); graciela.raiz.updateMatrixWorld(true); estanteY.updateMatrixWorld(true);
    const huecoW = estanteY.localToWorld(V((xSlot(1) + xSlot(2)) / 2 - 0.05, EST.baldas[1] + 0.13, 0.12));
    let alc = 0, tomo = 0;
    if (B1) alc = eio(sg(t, S["s08-ruben"] + 0.1, S["s08-ruben"] + 0.55));
    if (B4) { alc = eio(sg(t, T.toma - 0.3, T.toma + 0.05)); tomo = eio(sg(t, T.toma + 0.1, T.toma + 0.5)); }
    const OF = BRAZOS.ofrece(0.22, 0.3, 0.4);
    if (alc > 0) {
      const obj = graciela.cuerpo.worldToLocal(huecoW.clone());
      pg = { ...pg, manoD: mezclar(mezclar(pg.manoD, [obj.x, obj.y, obj.z], alc), OF.manoD, tomo), codoD: tomo > 0.5 ? OF.codoD : [-0.9, -0.5, -0.2] };
      if (tomo > 0) pg = { ...pg, manoI: mezclar(pg.manoI, OF.manoI, tomo), codoI: OF.codoI };
      graciela.poner(pg); graciela.raiz.updateMatrixWorld(true);
    }
    if (B4) {
      suya.visible = t > T.toma + 0.05;
      if (suya.visible) {
        // en la mano derecha mientras lo saca; después, entre las dos manos (la base del paquete apenas debajo de las manos)
        graciela.mano("D").getWorldPosition(_v);
        const mI = graciela.mano("I").getWorldPosition(new THREE.Vector3());
        const entre = _v.clone().add(mI).multiplyScalar(0.5);
        const enMano = _v.clone().add(V(0, -0.16, 0));
        suya.position.copy(lerpV(enMano, entre.add(V(0, -0.15, 0)), tomo));
        const q = graciela.cuerpo.getWorldQuaternion(new THREE.Quaternion());
        suya.quaternion.slerpQuaternions(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, estanteY.rotation.y, 0)), q, tomo);
      }
      tildeG.visible = t > T.encuentra;
      if (tildeG.visible) {
        const der = V(1, 0, 0).applyQuaternion(camera.quaternion), arr = V(0, 1, 0).applyQuaternion(camera.quaternion);
        graciela.cabeza.getWorldPosition(_v); tildeG.position.copy(_v).addScaledVector(arr, 0.5).addScaledVector(der, 0.05); tildeG.quaternion.copy(camera.quaternion); tildeG.scale.setScalar(popIn(t, T.encuentra, 0.3));
      }
    }
    if (lentesG.length === 2) {
      const hp = graciela.cabeza.getWorldPosition(new THREE.Vector3());
      const fw = graciela.cabeza.getWorldDirection(new THREE.Vector3());
      const cosA = fw.dot(camera.position.clone().sub(hp).normalize());
      const a = lentesG[0].getWorldPosition(new THREE.Vector3()).distanceTo(camera.position), b = lentesG[1].getWorldPosition(new THREE.Vector3()).distanceTo(camera.position);
      const perfil = cosA < 0.5;
      lentesG[0].visible = !(perfil && a > b); lentesG[1].visible = !(perfil && b > a);
      labioG.forEach((m) => (m.visible = cosA > 0.5));
    }
  }
}

// ================= ESCENA EN EL TIEMPO =================
function renderAt(t) {
  scene.environmentRotation.y = t * 0.08;
  ponerCamara(t);
  const enB = plano[0] === "B";
  sol.position.copy(_mira).add(V(-3.5, 7, 6)); sol.target.position.copy(_mira);
  const r = enB ? 3.2 : 7;
  Object.assign(sol.shadow.camera, { left: -r, right: r, top: r, bottom: -r, near: 0.5, far: 30 }); sol.shadow.camera.updateProjectionMatrix();
  sol.intensity = enB ? 2.1 : 1.4;
  lampara.position.copy(OB).add(V(0.2, 2.45, -1.2)); lampara.intensity = enB ? 6 : 0;
  key.intensity = enB ? 0.9 : 2.3;
  fill.intensity = enB ? 0.95 : 1.0;
  zonaA(t);
  zonaB(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
