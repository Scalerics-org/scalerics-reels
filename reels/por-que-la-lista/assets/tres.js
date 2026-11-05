// Capa 3D de por-que-la-lista (Three.js r170 local). Base: reels/caso-pedidosya.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin
// semilla. Objetos de marca (navy, verde, crema, blanco; rojo apagado SOLO para el problema):
// la cabina de los 30 con el volante y la tarjeta de la lista, un cuatrimotor de hélices genérico (sin
// insignias ni marcas) en la pista, la traba roja en el timón de profundidad, la pila de manuales, el
// frente de un local con persiana y toldo, la caja del proveedor, el cuaderno de "MARTA" y la tablet.
// La cámara viaja en una curva Catmull-Rom continua de objeto en objeto (y una grúa con ease propio).
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800.js";
import { E, W, DUR } from "./tiempos3d.js";

// ---------- utilidades de tiempo ----------
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.6, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const lerpV = (A, B, u) => new THREE.Vector3(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E; // inicios de escena
const D2R = Math.PI / 180;
let semilla = 1935;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const en = (t, a, b) => t >= a && t < b;
// entra con pop en a, sale en b
const vida = (t, a, b, din = 0.4, dout = 0.3) => (t < a || t > b + dout ? 0 : bk(sg(t, a, a + din)) * (1 - eio(sg(t, b, b + dout))));

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance", logarithmicDepthBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 400);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x0b1424);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, Math.PI / 2.4, 0xfff1dc, 2.4);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xbcd6ff, 1.8);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.2);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ color: 0x1b2c4a, side: THREE.DoubleSide }));
  top.position.y = 9; top.rotation.x = Math.PI / 2; env.add(top);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.6;

const key = new THREE.DirectionalLight(0xffe7cc, 2.7); key.position.set(-4, 7, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0x9cc4ff, 2.2); rim.position.set(5, 3, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0x3a5486, 0x0b1220, 0.95); scene.add(fill);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x7d8597 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.5), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.65),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.52), edge: mat(C.edge, 0.5),
  red: mat(C.red, 0.55), white: mat(C.white, 0.5), gris: mat(C.gris, 0.5, { metalness: 0.3 }),
  anio: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.22 }), oscuro: mat(0x131a26, 0.7),
  alu: mat(0xe9e7dc, 0.38, { metalness: 0.32 }), alu2: mat(0xcfccbd, 0.42, { metalness: 0.32 }),
  vidrio: mat(0x0e1a30, 0.15, { metalness: 0.2, emissive: 0x24406e, emissiveIntensity: 0.35 }),
  tick: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.3 }),
  carton: mat(0xc9a36b, 0.8), cinta: mat(0xe8dcc0, 0.4),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };

const sombraTex = (() => {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const x = c.getContext("2d"); const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(4,8,16,0.7)"); gr.addColorStop(0.5, "rgba(4,8,16,0.32)"); gr.addColorStop(1, "rgba(4,8,16,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const sombra = (w, d) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, opacity: 1 }));
  m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m;
};
function apoyar(som, x, y, z, s, op = 1) { som.visible = s > 0.002; if (!som.visible) return; som.position.set(x, y + 0.006, z); som.scale.setScalar(Math.max(0.001, s)); som.material.opacity = op * cl(s); }
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }

const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 8, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
};
// tilde 3D (la fuente no lo trae): un polígono en V extruido
const tickGeo = (() => {
  const sh = new THREE.Shape();
  [[-0.5, 0.06], [-0.16, -0.3], [0.5, 0.36], [0.37, 0.49], [-0.16, -0.05], [-0.37, 0.19]].forEach(([x, y], i) => (i ? sh.lineTo(x, y) : sh.moveTo(x, y)));
  sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.035, bevelSegments: 2 });
  g.translate(0, 0, -0.09); return g;
})();

// ---------- lienzos (texturas de canvas) ----------
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", sans-serif`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const tickCanvas = (x, cx, cy, r, fondo = "#5ce611", trazo = "#0b1220") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = trazo; x.lineWidth = r * 0.3; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.45, cy + r * 0.02); x.lineTo(cx - r * 0.1, cy + r * 0.38); x.lineTo(cx + r * 0.5, cy - r * 0.36); x.stroke(); };

// ================= LA TARJETA DE LA LISTA (protagonista: volante → traba → local → tablet) =================
const LW = 0.9, LH = 1.15;
const LC = { w: 704, h: 900 }; // lienzo, ~782 px por unidad
const FILAS = [262, 392, 522, 652, 782];
const listaMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, emissive: 0xffffff, emissiveIntensity: 0.18 });
const lista = new THREE.Group(); scene.add(lista);
const listaTicks = [];
{
  lista.add(mesh(rbox(LW, LH, 0.045, 0.05), M.cr));
  lista.add(mesh(new THREE.PlaneGeometry(LW - 0.03, LH - 0.03), listaMat, 0, 0, 0.0235));
  // clip de metal arriba
  lista.add(mesh(rbox(0.36, 0.13, 0.09, 0.03), M.gris, 0, LH / 2 - 0.02, 0.025));
  lista.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.3, 12).rotateZ(Math.PI / 2), M.gris, 0, LH / 2 + 0.04, 0.03));
  FILAS.forEach((fy) => {
    const tk = mesh(tickGeo, M.tick, ((96 / LC.w) - 0.5) * (LW - 0.03), (0.5 - fy / LC.h) * (LH - 0.03), 0.06);
    tk.scale.setScalar(0.12); lista.add(tk); listaTicks.push(tk);
  });
}
const listaSombra = sombra(1.5, 0.7);

// ================= CABINA DE LOS 30: volante (yugo), tablero y parabrisas =================
const COCK = new THREE.Vector3(-3, 0.6, -20); // para "Hoy, todo piloto la repasa"
// en el gancho la cabina está en la línea de mira de la grúa: entre la cámara del 1935 y el avión,
// así al alejarse la cabina se achica y detrás aparece el avión entero (sin pasar por el vacío)
const YAW1 = 56 * Math.PI / 180;
const COCK1 = new THREE.Vector3(0.6, 0.7, 0).add(new THREE.Vector3(Math.cos(19 * Math.PI / 180) * Math.sin(YAW1), Math.sin(19 * Math.PI / 180), Math.cos(19 * Math.PI / 180) * Math.cos(YAW1)).multiplyScalar(17));
const cabina = new THREE.Group(); scene.add(cabina);
const agujas = [];
{
  const yugo = new THREE.Group(); cabina.add(yugo);
  // volante de avión de los 30: aro navy partido arriba (270°), dos cuernos con manijas crema, tres rayos y cubo;
  // la columna sale hacia adelante, al tablero (no hacia abajo: así no parece un cartel en un poste)
  const RV = 0.86;
  const aro = new THREE.TorusGeometry(RV, 0.1, 18, 96, Math.PI * 1.5); aro.rotateZ(Math.PI * 0.75);
  yugo.add(mesh(aro, M.navy3, 0, 0, 0));
  yugo.add(mesh(new THREE.CylinderGeometry(0.11, 0.13, 1.5, 20).rotateX(Math.PI / 2), M.navy3, 0, 0, -0.78));
  yugo.add(mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.24, 32).rotateX(Math.PI / 2), M.navy, 0, 0, 0));
  [Math.PI * 0.5 + Math.PI * 2 / 3, Math.PI * 0.5 + Math.PI * 4 / 3, -Math.PI / 2].forEach((ang) => {
    const r = mesh(rbox(RV, 0.1, 0.08, 0.03), M.navy3, Math.cos(ang) * RV / 2, Math.sin(ang) * RV / 2, -0.02); r.rotation.z = ang; yugo.add(r);
  });
  [-1, 1].forEach((sd) => {
    const ang = Math.PI / 2 - sd * Math.PI / 4; // donde termina el aro (arriba a cada lado)
    const x0 = Math.cos(ang) * RV, y0 = Math.sin(ang) * RV;
    const inc = 0.8; // manija casi horizontal, hacia afuera y apenas hacia arriba
    const dx = Math.sin(inc) * sd, dy = Math.cos(inc);
    const cuerno = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.2, 16), M.navy3, x0 + dx * 0.08, y0 + dy * 0.08, 0); cuerno.rotation.z = -sd * inc; yugo.add(cuerno);
    const cx = x0 + dx * 0.34, cy = y0 + dy * 0.34;
    const manija = mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.44, 20), M.cr, cx, cy, 0); manija.rotation.z = -sd * inc; yugo.add(manija);
    yugo.add(mesh(new THREE.SphereGeometry(0.135, 18, 12), M.cr2, cx + dx * 0.24, cy + dy * 0.24, 0));
    for (let k = 0; k < 3; k++) { const an = mesh(new THREE.TorusGeometry(0.128, 0.018, 8, 24).rotateX(Math.PI / 2), M.cr3, cx + dx * (k - 1) * 0.12, cy + dy * (k - 1) * 0.12, 0); an.rotation.z = -sd * inc; yugo.add(an); }
  });

  // tablero con relojes redondos
  const tab = mesh(rbox(4.6, 1.15, 0.5, 0.08), M.navy, 0, -1.25, -1.35); tab.rotation.x = -0.25; cabina.add(tab);
  const reloj = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 32).rotateX(Math.PI / 2);
  const bisel = new THREE.TorusGeometry(0.25, 0.045, 10, 32);
  [[-1.75, -1.1], [-1.15, -1.18], [1.15, -1.18], [1.75, -1.1], [-1.45, -1.62], [1.45, -1.62]].forEach(([x, y]) => {
    const g = new THREE.Group(); g.position.set(x, y, -1.05); g.rotation.x = -0.25; cabina.add(g);
    g.add(mesh(reloj, M.cr, 0, 0, 0)); g.add(mesh(bisel, M.gris, 0, 0, 0.02));
    const ag = mesh(rbox(0.035, 0.2, 0.02, 0.01), M.red, 0, 0.08, 0.045); const piv = grupo(ag); piv.position.z = 0; g.add(piv); agujas.push(piv);
    piv.rotation.z = (azar() - 0.5) * 2.4;
  });
  // parabrisas: marcos crema y vidrios oscuros con reflejos
  const marco = (w, h, x, y, rz) => { const m = mesh(rbox(w, h, 0.16, 0.05), M.cr2, x, y, -2.6); m.rotation.z = rz; cabina.add(m); };
  marco(0.2, 3.2, -2.05, 1.05, -0.2); marco(0.2, 3.2, 2.05, 1.05, 0.2); marco(0.16, 2.9, 0, 1.1, 0); marco(4.9, 0.2, 0, 2.6, 0); marco(4.3, 0.2, 0, -0.4, 0);
  const vid = new THREE.MeshStandardMaterial({ color: 0x223a63, roughness: 0.2, metalness: 0.1, emissive: 0x1c3156, emissiveIntensity: 0.6 });
  [-1, 1].forEach((s) => {
    const p = mesh(new THREE.PlaneGeometry(1.85, 2.9), vid, s * 1.0, 1.1, -2.7); cabina.add(p);
    const refl = mesh(new THREE.PlaneGeometry(0.12, 2.4), new THREE.MeshBasicMaterial({ color: 0x5d7bb0, transparent: true, opacity: 0.35 }), s * 0.7, 1.1, -2.66); refl.rotation.z = 0.35; cabina.add(refl);
    const refl2 = refl.clone(); refl2.position.x = s * 1.05; refl2.scale.x = 0.5; cabina.add(refl2);
  });
  cabina.position.copy(COCK);
}
const LISTA_YUGO = new THREE.Vector3(0, 0.02, 0.2).add(COCK); // la tarjeta en el clip del volante
const LISTA_YUGO1 = new THREE.Vector3(0, 0.02, 0.2).applyAxisAngle(new THREE.Vector3(0, 1, 0), YAW1).add(COCK1);

// ================= EL AVIÓN: cuatrimotor de hélices de los 30, genérico (sin insignias) =================
const PISO = -1.15;
const avion = new THREE.Group(); scene.add(avion);
const helices = [];
const discos = [];
let elevador = null, traba = null, cinta = null, cintaBase = null;
{
  // fuselaje (torno): eje a lo largo de x, nariz en +x
  const perfil = [[0.0, -4.05], [0.14, -4.0], [0.28, -3.5], [0.42, -2.6], [0.52, -1.5], [0.56, 0.0], [0.56, 2.9], [0.53, 3.35], [0.5, 3.5]].map(([r, y]) => new THREE.Vector2(r, y));
  const fus = new THREE.LatheGeometry(perfil, 48); fus.rotateZ(-Math.PI / 2);
  avion.add(mesh(fus, M.alu));
  // nariz vidriada con anillos de marco
  const nariz = new THREE.LatheGeometry([[0.5, 3.5], [0.44, 3.75], [0.32, 3.95], [0.15, 4.07], [0.0, 4.1]].map(([r, y]) => new THREE.Vector2(r, y)), 40); nariz.rotateZ(-Math.PI / 2);
  avion.add(mesh(nariz, M.vidrio));
  [[3.5, 0.505], [3.78, 0.43]].forEach(([x, r]) => avion.add(mesh(new THREE.TorusGeometry(r, 0.03, 8, 40).rotateY(Math.PI / 2), M.cr2, x, 0, 0)));
  for (let k = 0; k < 4; k++) { const m = mesh(rbox(0.6, 0.03, 0.03, 0.01), M.cr2, 3.78, 0, 0); m.rotation.x = (k * Math.PI) / 4; m.position.y = 0; avion.add(m); }
  // cabina arriba, con vidrios
  avion.add(mesh(rbox(1.15, 0.36, 0.72, 0.12), M.alu, 2.75, 0.5, 0));
  const vc = mesh(rbox(0.6, 0.26, 0.74, 0.08), M.vidrio, 3.1, 0.56, 0); avion.add(vc);
  avion.add(mesh(rbox(0.05, 0.28, 0.76, 0.02), M.cr2, 3.05, 0.57, 0));
  // franja navy a lo largo
  const franja = new THREE.LatheGeometry([[0.567, -2.5], [0.567, 3.2]].map(([r, y]) => new THREE.Vector2(r, y)), 48, -0.18, 0.36);
  franja.rotateZ(-Math.PI / 2);
  [1, -1].forEach((s) => { const f = mesh(franja, M.navy3); f.rotation.x = s > 0 ? Math.PI / 2 : -Math.PI / 2; avion.add(f); });
  // ventanillas
  for (let i = 0; i < 6; i++) [1, -1].forEach((s) => avion.add(mesh(rbox(0.2, 0.14, 0.04, 0.04), M.vidrio, 1.9 - i * 0.48, 0.2, s * 0.545)));
  // alas (planta en trapecio), apenas por debajo del eje
  const ala = (pts, grosor) => { const sh = new THREE.Shape(); pts.forEach(([x, y], i) => (i ? sh.lineTo(x, y) : sh.moveTo(x, y))); sh.closePath(); const g = new THREE.ExtrudeGeometry(sh, { depth: grosor, bevelEnabled: true, bevelThickness: grosor * 0.45, bevelSize: 0.05, bevelSegments: 3 }); g.rotateX(Math.PI / 2); g.translate(0, grosor / 2, 0); return g; };
  avion.add(mesh(ala([[1.75, 0], [1.0, 5.3], [0.25, 5.3], [-0.35, 0], [0.25, -5.3], [1.0, -5.3]], 0.1), M.alu2, 0, -0.2, 0));
  // cuatro motores radiales con hélice de tres palas
  const nac = new THREE.CylinderGeometry(0.25, 0.3, 1.25, 28).rotateZ(-Math.PI / 2);
  const capot = new THREE.TorusGeometry(0.29, 0.075, 14, 32).rotateY(Math.PI / 2);
  const cilindros = new THREE.CylinderGeometry(0.24, 0.24, 0.1, 18).rotateZ(-Math.PI / 2);
  const cono = new THREE.ConeGeometry(0.1, 0.26, 20).rotateZ(-Math.PI / 2);
  const pala = rbox(0.045, 0.92, 0.13, 0.03);
  const disco = new THREE.CircleGeometry(0.98, 48).rotateY(Math.PI / 2);
  const discoMat = new THREE.MeshBasicMaterial({ color: C.cr, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide });
  [-3.05, -1.6, 1.6, 3.05].forEach((z) => {
    const xo = Math.abs(z) > 2 ? 1.3 : 1.55;
    avion.add(mesh(nac, M.alu, xo, -0.16, z));
    avion.add(mesh(capot, M.navy3, xo + 0.66, -0.16, z));
    avion.add(mesh(cilindros, M.oscuro, xo + 0.62, -0.16, z));
    avion.add(mesh(cono, M.cr, xo + 0.82, -0.16, z));
    const h = new THREE.Group(); h.position.set(xo + 0.76, -0.16, z); avion.add(h);
    for (let k = 0; k < 3; k++) { const p = mesh(pala, M.navy, 0, 0.47, 0); const piv = grupo(p); piv.rotation.x = (k * 2 * Math.PI) / 3; p.rotation.y = 0.35; h.add(piv); }
    helices.push(h);
    const d = mesh(disco, discoMat, xo + 0.78, -0.16, z); avion.add(d); discos.push(d);
  });
  // tren de aterrizaje (dos ruedas grandes) y rueda de cola
  const rueda = new THREE.TorusGeometry(0.21, 0.1, 14, 28);
  [-1.55, 1.55].forEach((z) => {
    avion.add(mesh(rbox(0.09, 0.6, 0.09, 0.03), M.gris, 1.25, -0.6, z));
    avion.add(mesh(rueda, M.oscuro, 1.25, -0.86, z));
    avion.add(mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16).rotateX(Math.PI / 2), M.cr3, 1.25, -0.86, z));
  });
  avion.add(mesh(rbox(0.06, 0.5, 0.06, 0.02), M.gris, -3.55, -0.5, 0));
  avion.add(mesh(new THREE.TorusGeometry(0.09, 0.045, 10, 20), M.oscuro, -3.6, -0.76, 0));
  // cola: estabilizador horizontal + timón de profundidad (aparte) + deriva alta con timón de dirección
  avion.add(mesh(ala([[-2.95, 0], [-3.45, 1.85], [-3.85, 1.85], [-3.9, 0], [-3.85, -1.85], [-3.45, -1.85]], 0.06), M.alu2, 0, 0.08, 0));
  elevador = mesh(rbox(0.34, 0.06, 3.5, 0.025), M.cr3, -4.04, 0.08, 0); avion.add(elevador);
  const deriva = (() => { const sh = new THREE.Shape(); [[-2.75, 0.3], [-3.62, 1.95], [-3.98, 1.98], [-4.02, 0.25]].forEach(([x, y], i) => (i ? sh.lineTo(x, y) : sh.moveTo(x, y))); sh.closePath(); const g = new THREE.ExtrudeGeometry(sh, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.04, bevelSegments: 2 }); g.translate(0, 0, -0.035); return g; })();
  avion.add(mesh(deriva, M.alu2));
  avion.add(mesh(rbox(0.3, 1.7, 0.08, 0.03), M.cr3, -4.13, 1.1, 0));
  // LA TRABA (rojo apagado): una U que abraza el borde del timón de profundidad, con perno y cinta
  traba = new THREE.Group(); traba.position.set(-4.12, 0.08, 1.0); avion.add(traba);
  traba.add(mesh(rbox(0.56, 0.06, 0.44, 0.02), M.red, 0, 0.075, 0));
  traba.add(mesh(rbox(0.56, 0.06, 0.44, 0.02), M.red, 0, -0.075, 0));
  traba.add(mesh(rbox(0.07, 0.21, 0.44, 0.02), M.red, -0.27, 0, 0));
  traba.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 14), M.cr, 0.12, 0, 0));
  traba.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 16), M.cr, 0.12, 0.12, 0));
  const cg = new THREE.PlaneGeometry(0.11, 0.8, 1, 16); cg.translate(0, -0.4, 0);
  cintaBase = Float32Array.from(cg.attributes.position.array);
  cinta = mesh(cg, new THREE.MeshStandardMaterial({ color: C.red, roughness: 0.6, side: THREE.DoubleSide }), -0.3, -0.06, 0.12); traba.add(cinta);
}
const avionSombra = sombra(11, 7);
const fuseSombra = sombra(9.5, 1.6);
// pista: navy oscuro con línea central crema discontinua y bordes marcados
const pista = new THREE.Group(); scene.add(pista);
{
  pista.add(mesh(rbox(220, 0.12, 5.2, 0.04), mat(0x0e1829, 0.85), -60, PISO - 0.06, 0)); // larga hacia el fondo: no se ve el final
  for (let i = -80; i <= 14; i++) pista.add(mesh(rbox(1.0, 0.03, 0.16, 0.01), M.cr, i * 1.7, PISO + 0.01, 0));
  [-2.45, 2.45].forEach((z) => pista.add(mesh(rbox(220, 0.03, 0.12, 0.01), M.cr2, -60, PISO + 0.01, z)));
}
// pose del avión: en tierra con la nariz arriba (rueda de cola); en "Despegaron" se levanta
const POSE0 = { y: PISO + 1.086, rz: 0.06 }, POSE1 = { y: PISO + 2.45, rz: 0.11 };
const enMundo = (p, pose) => new THREE.Vector3(p.x * Math.cos(pose.rz) - p.y * Math.sin(pose.rz), p.x * Math.sin(pose.rz) + p.y * Math.cos(pose.rz) + pose.y, p.z);
const TRABA_W = enMundo(new THREE.Vector3(-4.12, 0.08, 1.0), POSE1);
const CABINA_W = enMundo(new THREE.Vector3(2.9, 0.6, 0), POSE0);

// ================= "1935" en 3D =================
const anio = new THREE.Mesh(textoGeo("1935", 1.5, 0.42), M.anio); scene.add(anio);

// ================= LA PILA DE MANUALES (lo que uno esperaría: más entrenamiento) =================
const manuales = [];
{
  const tapas = [M.navy3, M.gris, M.navy, M.edge, M.navy3, M.gd, M.navy];
  for (let i = 0; i < 7; i++) {
    const w = 1.1 + azar() * 0.22, d = 0.8 + azar() * 0.12, h = 0.2 + azar() * 0.08;
    const g = new THREE.Group();
    g.add(mesh(rbox(w, 0.04, d, 0.015), tapas[i], 0, h / 2 - 0.02, 0));
    g.add(mesh(rbox(w, 0.04, d, 0.015), tapas[i], 0, -h / 2 + 0.02, 0));
    g.add(mesh(rbox(w, h, 0.06, 0.025), tapas[i], 0, 0, -d / 2 + 0.03)); // lomo
    const pag = mesh(rbox(w - 0.07, h - 0.07, d - 0.08, 0.01), M.cr, 0.0, 0, 0.02); g.add(pag); // canto de páginas
    for (let k = 1; k < 4; k++) g.add(mesh(rbox(w - 0.06, 0.006, 0.004, 0.002), M.cr3, 0, -h / 2 + 0.035 + k * (h - 0.07) / 4, d / 2 - 0.018)); // rayas de hojas
    g.add(mesh(rbox(w * 0.42, h * 0.46, 0.012, 0.005), M.cr, -w * 0.12, 0, -d / 2 - 0.004)); // rótulo del lomo
    g.add(mesh(rbox(w * 0.9, 0.025, 0.012, 0.005), M.cr2, 0, h * 0.34, -d / 2 - 0.004));
    g.userData = { h, rot: (azar() - 0.5) * 0.35, dx: (azar() - 0.5) * 0.1, flip: i % 3 === 1 ? 0 : 1 };
    scene.add(g); manuales.push(g);
  }
}
const manualesSombra = sombra(2.2, 1.6);

// ================= EL LOCAL: frente con persiana, toldo, vereda =================
// el local queda detrás de la cabina, en la misma línea de mira: la tarjeta vuela "hacia adentro" y el local
// aparece mientras la cabina se va (sin viajes largos por el vacío)
const STORE = new THREE.Vector3(-1.2, PISO, -29);
const local = new THREE.Group(); local.position.copy(STORE); scene.add(local);
const lamas = [];
let toldo = null;
const interiorMat = new THREE.MeshStandardMaterial({ color: 0x2a3550, emissive: 0xffd9a0, emissiveIntensity: 0, roughness: 0.7 });
const cartelMat = new THREE.MeshStandardMaterial({ color: C.navy, emissive: C.g, emissiveIntensity: 0.2, roughness: 0.5 });
{
  const pared = M.cr2;
  local.add(mesh(rbox(7, 0.14, 2.6, 0.03), M.cr3, 0, 0.07, 1.1)); // vereda
  local.add(mesh(rbox(0.55, 4.3, 0.6, 0.05), pared, -2.0, 2.15, -0.3));
  local.add(mesh(rbox(0.55, 4.3, 0.6, 0.05), pared, 2.0, 2.15, -0.3));
  local.add(mesh(rbox(4.55, 1.35, 0.6, 0.05), pared, 0, 3.6, -0.3));
  local.add(mesh(rbox(4.8, 0.36, 0.85, 0.06), M.navy3, 0, 4.4, -0.2)); // cornisa
  local.add(mesh(rbox(3.1, 0.62, 0.1, 0.06), cartelMat, 0, 3.62, 0.05)); // cartel
  local.add(mesh(rbox(2.5, 0.12, 0.04, 0.03), M.g, 0, 3.62, 0.12));
  // adentro: fondo, estantes con mercadería
  local.add(mesh(new THREE.PlaneGeometry(3.5, 2.95), interiorMat, 0, 1.55, -0.55));
  const prod = [M.g, M.cr, M.white, M.navy3, M.gd, M.cr2];
  [0.75, 1.5, 2.25].forEach((y, j) => {
    local.add(mesh(rbox(3.3, 0.07, 0.35, 0.02), M.cr, 0, y, -0.4));
    for (let i = 0; i < 8; i++) local.add(mesh(rbox(0.26, 0.3 + ((i + j) % 3) * 0.08, 0.24, 0.04), prod[(i * 3 + j) % prod.length], -1.4 + i * 0.4, y + 0.2 + ((i + j) % 3) * 0.04, -0.4));
  });
  // persiana de lamas, enrollada en la caja de arriba
  const cajaP = mesh(rbox(3.7, 0.38, 0.36, 0.08), M.cr3, 0, 2.98, 0.05); local.add(cajaP);
  const lamaG = rbox(3.5, 0.17, 0.05, 0.02);
  const lamaM = mat(0xe3e1d6, 0.4, { metalness: 0.35 });
  for (let i = 0; i < 17; i++) { const l = mesh(lamaG, lamaM, 0, 2.8 - i * 0.165, 0.06); local.add(l); lamas.push(l); }
  // toldo verde y crema (bisagra arriba)
  toldo = new THREE.Group(); toldo.position.set(0, 3.15, 0.25); local.add(toldo);
  for (let i = 0; i < 8; i++) { const r = mesh(rbox(0.56, 0.06, 1.15, 0.02), i % 2 ? M.cr : M.g, (i - 3.5) * 0.56, 0, 0.55); toldo.add(r); }
  const vol = mesh(rbox(4.5, 0.2, 0.05, 0.02), M.g, 0, -0.08, 1.12); toldo.add(vol);
}
const localSombra = sombra(7, 3);

// la caja del proveedor (cartón, cinta y etiqueta)
const caja = new THREE.Group(); scene.add(caja);
{
  caja.add(mesh(rbox(1.0, 0.72, 0.78, 0.04), M.carton, 0, 0.36, 0));
  caja.add(mesh(rbox(1.02, 0.025, 0.18, 0.01), M.cinta, 0, 0.725, 0));
  caja.add(mesh(rbox(0.18, 0.5, 0.02, 0.01), M.cinta, 0, 0.47, 0.395));
  caja.add(mesh(rbox(0.36, 0.24, 0.015, 0.01), M.white, 0.27, 0.42, 0.395));
  caja.add(mesh(rbox(0.26, 0.035, 0.01, 0.005), M.navy, 0.27, 0.47, 0.405));
  caja.add(mesh(rbox(0.2, 0.035, 0.01, 0.005), M.navy, 0.24, 0.39, 0.405));
}
const cajaTick = mesh(tickGeo, M.tick); scene.add(cajaTick);
const cajaSombra = sombra(1.6, 1.3);

// ================= MOSTRADOR, CUADERNO DE MARTA Y TABLET =================
const COUNTER = STORE.clone().add(new THREE.Vector3(0, 0, 3.2));
const mostrador = new THREE.Group(); mostrador.position.copy(COUNTER); scene.add(mostrador);
{
  mostrador.add(mesh(rbox(3.4, 1.0, 1.1, 0.05), M.navy3, 0, 0.5, 0));
  mostrador.add(mesh(rbox(3.6, 0.09, 1.3, 0.03), M.cr, 0, 1.04, 0));
  mostrador.add(mesh(rbox(3.0, 0.1, 0.02, 0.02), M.g, 0, 0.75, 0.56));
}
const TOPE = PISO + 1.085;
const cuaderno = new THREE.Group(); scene.add(cuaderno);
const tapaFrente = new THREE.Group();
const hojas = [];
let elastico = null, postitCae = null, marta = null;
{
  const NB = { w: 1.3, d: 1.7 };
  const rojoTapa = mat(C.red, 0.7);
  cuaderno.add(mesh(rbox(NB.w, 0.05, NB.d, 0.03), rojoTapa, 0, 0.025, 0));
  cuaderno.add(mesh(rbox(NB.w - 0.08, 0.15, NB.d - 0.08, 0.02), M.cr, 0.02, 0.12, 0));
  // post-its que asoman
  [[0.7, 0.13, -0.45, M.g, 0.1], [0.72, 0.15, 0.2, M.white, -0.15], [0.3, 0.14, -0.88, M.g, 0.3], [-0.25, 0.13, -0.9, M.cr2, -0.2]].forEach(([x, y, z, m, r]) => {
    const p = mesh(rbox(0.32, 0.012, 0.32, 0.01), m, x, y, z); p.rotation.y = r; cuaderno.add(p);
  });
  // hojas que se abren en abanico
  for (let i = 0; i < 5; i++) { const h = mesh(rbox(1.2, 0.012, 1.6, 0.005), M.white, 0.6, 0, 0); const piv = grupo(h); piv.position.set(-0.62, 0.2, 0); cuaderno.add(piv); hojas.push(piv); }
  // tapa de adelante (bisagra en el lomo, a la izquierda) con la etiqueta MARTA
  tapaFrente.position.set(-0.65, 0.22, 0); cuaderno.add(tapaFrente);
  tapaFrente.add(mesh(rbox(NB.w, 0.05, NB.d, 0.03), rojoTapa, 0.65, 0, 0));
  marta = mesh(new THREE.PlaneGeometry(0.84, 0.38), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, emissive: 0xffffff, emissiveIntensity: 0.12 }), 0.58, 0.027, -0.25);
  marta.rotation.x = -Math.PI / 2; tapaFrente.add(marta);
  // elástico
  elastico = mesh(rbox(0.07, 0.03, 1.76, 0.012), M.navy, 0.53, 0.27, 0); cuaderno.add(elastico);
  postitCae = mesh(rbox(0.3, 0.012, 0.3, 0.01), M.g, 0.66, 0.2, 0.55); cuaderno.add(postitCae);
}
const cuadernoSombra = sombra(2.2, 2.4);
// tablet parada sobre el mostrador
const TW = 1.62, TH = 2.2;
const pantallaMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.8 });
const tablet = new THREE.Group(); scene.add(tablet);
{
  tablet.add(mesh(rbox(TW, TH, 0.1, 0.13, 4), M.navy));
  tablet.add(mesh(rbox(TW + 0.05, TH + 0.05, 0.07, 0.14, 4), M.edge, 0, 0, -0.02));
  tablet.add(mesh(new THREE.PlaneGeometry(TW - 0.12, TH - 0.12), pantallaMat, 0, 0, 0.052));
  const pata = mesh(rbox(0.5, 1.0, 0.06, 0.03), M.navy3, 0, -0.55, -0.32); pata.rotation.x = 0.55; tablet.add(pata);
}
const tabletSombra = sombra(2.4, 1.2);
const pantallas = {};

// ================= TEXTURAS =================
async function dibujar() {
  await document.fonts.load('800 60px "Lexend"');
  await document.fonts.load('600 60px "Lexend"');
  await document.fonts.load('700 60px "Caveat"');
  const logo = await new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = "assets/logo-blanco.png"; });
  // la tarjeta del piloto: encabezado navy, cinco renglones con casillero; el último se lee
  const listaTex = tex(LC.w, LC.h, (x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, LC.w, LC.h);
    x.fillStyle = "#0b1220"; rr(x, 28, 34, LC.w - 56, 140, 22);
    x.fillStyle = "#efeee5"; x.font = F(800, 50); x.textAlign = "center"; x.fillText("ANTES DE DESPEGAR", LC.w / 2, 122); x.textAlign = "left";
    FILAS.forEach((fy, i) => {
      x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.beginPath(); x.roundRect(56, fy - 40, 80, 80, 12); x.stroke();
      x.fillStyle = "#16243d";
      if (i < 4) rr(x, 172, fy - 18, [430, 360, 470, 400][i], 36, 18);
      else { x.font = F(800, 50); x.fillText("Controles libres", 172, fy + 18); }
    });
  });
  listaMat.map = listaTex; listaMat.emissiveMap = listaTex; listaMat.needsUpdate = true;
  // etiqueta del cuaderno, escrita a mano
  const mt = tex(460, 210, (x) => {
    x.fillStyle = "#efeee5"; rr(x, 0, 0, 460, 210, 26);
    x.fillStyle = "#0b1220"; x.font = F(700, 150, "Caveat"); x.textAlign = "center"; x.fillText("MARTA", 230, 158);
  });
  marta.material.map = mt; marta.material.emissiveMap = mt; marta.material.needsUpdate = true;
  // pantallas de la tablet (900 x 1250)
  const PWc = 900, PHc = 1250;
  const encabezado = (x, titulo, atras) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, PWc, 210);
    x.fillStyle = "#efeee5"; x.font = F(800, 74); x.fillText(titulo, atras ? 150 : 56, 135);
    if (atras) { x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(98, 72); x.lineTo(60, 108); x.lineTo(98, 144); x.stroke(); }
    if (logo && !atras) { const w = 250, h = (logo.height / logo.width) * w; x.drawImage(logo, PWc - 56 - w, 105 - h / 2, w, h); }
  };
  pantallas.menu = tex(PWc, PHc, (x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, PWc, PHc); encabezado(x, "Tu local");
    ["Apertura", "Cierre", "Pedido al proveedor"].forEach((t, i) => {
      const Y = 270 + i * 300;
      x.fillStyle = "#ffffff"; rr(x, 50, Y, 800, 250, 36);
      x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(50, Y, 800, 250, 36); x.stroke();
      x.fillStyle = i === 0 ? "#5ce611" : "#16243d"; rr(x, 90, Y + 55, 140, 140, 28);
      // icono de lista en el cuadrado
      x.fillStyle = i === 0 ? "#0b1220" : "#efeee5"; [0, 1, 2].forEach((k) => { rr(x, 118, Y + 85 + k * 32, 20, 20, 5); rr(x, 150, Y + 88 + k * 32, 56, 14, 7); });
      x.fillStyle = "#0b1220"; x.font = F(800, i === 2 ? 44 : 62); x.fillText(t, 262, Y + 145);
      x.strokeStyle = "#7d8597"; x.lineWidth = 12; x.lineCap = "round"; x.beginPath(); x.moveTo(800, Y + 98); x.lineTo(826, Y + 125); x.lineTo(800, Y + 152); x.stroke();
    });
    x.fillStyle = "#16243d"; rr(x, 50, 1180, 800, 30, 15);
  });
  const apertura = (n) => tex(PWc, PHc, (x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, PWc, PHc); encabezado(x, "Apertura", true);
    x.fillStyle = "#ffffff"; rr(x, 40, 250, 820, 700, 36);
    x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(40, 250, 820, 700, 36); x.stroke();
    ["Subir la persiana", "Prender la caja", "Revisar la heladera"].forEach((t, i) => {
      const Y = 370 + i * 210;
      if (i < n) { x.fillStyle = "#5ce611"; rr(x, 80, Y - 55, 110, 110, 20); x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(108, Y + 2); x.lineTo(130, Y + 26); x.lineTo(166, Y - 24); x.stroke(); }
      else { x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.beginPath(); x.roundRect(86, Y - 49, 98, 98, 18); x.stroke(); }
      x.fillStyle = i < n ? "#59627a" : "#0b1220"; x.font = F(800, 56); x.fillText(t, 225, Y + 20);
      if (i < 2) { x.fillStyle = "#d9d7c9"; x.fillRect(80, Y + 100, 740, 5); }
    });
    // hecho por: cualquiera del equipo
    x.fillStyle = "#0b1220"; rr(x, 40, 1000, 820, 190, 36);
    x.fillStyle = "#efeee5"; x.font = F(600, 44); x.fillText("Hecho por:", 80, 1080);
    x.fillStyle = "#5ce611"; x.font = F(800, 50); x.fillText("Marta · Nico", 80, 1145);
    [[700, "#5ce611"], [770, "#efeee5"]].forEach(([cx, c]) => { x.fillStyle = c; x.beginPath(); x.arc(cx, 1095, 46, 0, Math.PI * 2); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.stroke(); });
  });
  pantallas.ap0 = apertura(0); pantallas.ap1 = apertura(1); pantallas.ap2 = apertura(2); pantallas.ap3 = apertura(3);
  pantallas.llamada = tex(PWc, PHc, (x) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, PWc, PHc);
    x.fillStyle = "#16243d"; rr(x, 40, 60, 820, 700, 40);
    if (logo) { const w = 520, h = (logo.height / logo.width) * w; x.drawImage(logo, 450 - w / 2, 410 - h / 2, w, h); }
    x.fillStyle = "#1f3254"; rr(x, 40, 790, 820, 300, 40);
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(450, 905, 62, 0, Math.PI * 2); x.fill(); rr(x, 350, 975, 200, 100, 50);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(450, 1170, 56, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; rr(x, 422, 1150, 56, 40, 10);
  });
  pantallaMat.map = pantallas.menu; pantallaMat.emissiveMap = pantallas.menu; pantallaMat.needsUpdate = true;
}

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ, modo]; "e" = tramo con ease propio
// (grúa: distancia en escala log y el punto de mira anclado al zoom); el resto, Catmull-Rom continua.
const v3 = (v, dx = 0, dy = 0, dz = 0) => [v.x + dx, v.y + dy, v.z + dz];
// donde queda la tarjeta cuando nace de la traba: entre la cola y la cámara
const CAM5 = { az: 22, el: 9 };
const dirCam = (az, el) => new THREE.Vector3(Math.cos(el * D2R) * Math.sin(az * D2R), Math.sin(el * D2R), Math.cos(el * D2R) * Math.cos(az * D2R));
const LISTA_5 = TRABA_W.clone().addScaledVector(dirCam(CAM5.az, CAM5.el), 1.1).add(new THREE.Vector3(0, 0.8, 0)); // arriba del estabilizador, sin tocarlo
const LISTA_LOCAL = new THREE.Vector3(COUNTER.x - 1.36, PISO + 1.085 + 0.7, COUNTER.z + 0.1); // parada en el mostrador, al lado de la tablet
const LISTA_FLOTA = STORE.clone().add(new THREE.Vector3(-2.0, 2.15, 0.06)); // pegada en el pilar izquierdo
const NB_W = new THREE.Vector3(COUNTER.x, TOPE, COUNTER.z);
const TAB_W = new THREE.Vector3(COUNTER.x, TOPE + 1.13, COUNTER.z - 0.05);
// el gancho termina con un corte (whoosh) en "En": la grúa larga dejaba cuadros casi vacíos
const CORTE = S["s02-1935"];
const CAM_A = [
  [0, 49, 6, 8.8, ...v3(COCK1, 0, 0.45, 0)],
  [CORTE, 51, 5, 7.8, ...v3(COCK1, 0, 0.4, 0)],
];
const CAM_B = [
  [CORTE, 52, 20, 26, 0.6, 1.55, 0.0],
  [W[13], 58, 21, 23.5, 0.6, 1.45, 0.0],
  [S["s02b-prueba"] + 0.6, 64, 20, 21, 0.7, 1.35, 0.0],
  [S["s03-expertos"] - 0.1, 76, 11, 16.5, 1.0, 0.95, 0.0],
  [S["s03-expertos"] + 0.9, 86, 5, 12.5, 1.4, 0.55, 0],
  [S["s04-trabados"] + 0.05, 84, 5, 12, 1.3, 0.6, 0],
  [S["s04-trabados"] + 0.6, 80, 6, 13.5, 1.1, 0.7, 0],
  [W[27] + 0.3, 45, 10, 15, -1.6, 1.4, 0.4],
  [W[28] + 0.25, 30, 10, 7.5, ...v3(TRABA_W, 0.3, 0.15, 0)],
  [W[30], 26, 10, 4.6, ...v3(TRABA_W, 0, 0.05, 0)],
  [S["s05-lista"] - 0.05, CAM5.az + 2, CAM5.el, 3.5, ...v3(TRABA_W)],
  [W[35] + 0.3, CAM5.az, CAM5.el + 4, 6.8, ...v3(TRABA_W, 0, 0.45, 0)],
  [W[37] + 0.2, CAM5.az - 4, CAM5.el, 5.0, ...v3(LISTA_5)],
  [S["s06-hoy"] - 0.1, CAM5.az - 10, 8, 4.7, ...v3(LISTA_5)],
  [S["s06-hoy"] + 0.65, -2, 6, 6.6, ...v3(LISTA_YUGO, 0, 0.12, 0)],
  [S["s07-local"] - 0.1, -7, 7, 6.0, ...v3(LISTA_YUGO, 0, 0.12, 0)],
  [S["s07-local"] + 0.95, -5, 8, 15.5, ...v3(STORE, -0.45, 2.0, 0.6)],
  [W[52], 2, 7, 15.5, ...v3(STORE, -0.3, 1.9, 0.8)],
  [S["s08-marta"] + 0.05, 2, 12, 15, ...v3(STORE, 0, 1.8, 1.8)],
  [S["s08-marta"] + 0.5, 0, 50, 6.6, ...v3(NB_W, 0, 0.1, -0.05)],
  [W[61], -3, 52, 6.3, ...v3(NB_W, 0, 0.1, -0.05)],
  [W[64], 0, 26, 8.2, ...v3(NB_W, 0, 0.95, 0)],
  [W[67], 0, 8, 7.2, ...v3(TAB_W, 0, 0.24, 0)],
  [S["s10-tareas"], 3, 6, 6.8, ...v3(TAB_W, 0, 0.22, 0)],
  [S["s11-verlo"], -2, 5, 6.6, ...v3(TAB_W, 0, 0.18, 0)],
  [S["s11-verlo"] + 1.1, 4, 12, 12.4, COUNTER.x - 0.35, PISO + 2.0, COUNTER.z - 1.0],
  [S["s12-llamada"] + 0.5, 6, 11, 14.5, COUNTER.x - 0.2, PISO + 2.75, COUNTER.z - 1.0],
  [DUR, 8, 10, 13.8, COUNTER.x - 0.2, PISO + 2.75, COUNTER.z - 1.0],
];
// estado de la tarjeta en el tiempo (también lo usa la cámara para seguirla)
function listaEstado(t) {
  let s = 0, pos = LISTA_YUGO.clone(), ry = 0, rx = 0, rz = 0;
  if (t < S["s02-1935"] + 0.6) {
    s = t < CORTE ? 1 : 0;
    pos = LISTA_YUGO1.clone();
    pos.y += 0.04 * (1 - eo(sg(t, 0, 0.4))); // el clip "aprieta" la tarjeta al arrancar
    rx = Math.sin(t * 0.8) * 0.02; ry = YAW1 + Math.sin(t * 0.6) * 0.03;
  } else if (t >= W[37] - 0.05) {
    s = bk(sg(t, W[37] - 0.05, W[37] + 0.4));
    pos = LISTA_5.clone(); ry = CAM5.az * D2R + (1 - eio(sg(t, W[37] - 0.05, W[37] + 0.3))) * Math.PI;
    pos.y += Math.sin(t * 1.4) * 0.03;
    const vuelve = eio(sg(t, S["s06-hoy"] - 0.05, S["s06-hoy"] + 0.6));
    if (vuelve > 0) { pos = lerpV(pos, LISTA_YUGO, vuelve); pos.y += Math.sin(Math.PI * vuelve) * 0.8; ry = lerp(ry, 0, vuelve); }
    const vuela = eio(sg(t, S["s07-local"], S["s07-local"] + 0.85));
    if (vuela > 0) {
      // primero sube (despega del volante, sin pasar por detrás del cubo) y después se va al fondo, al pilar
      pos = lerpV(LISTA_YUGO, LISTA_FLOTA, eio(sg(vuela, 0.2, 1))); pos.y += Math.sin(Math.PI * vuela) * 0.75 + eo(sg(vuela, 0, 0.25)) * 0.35 * (1 - vuela); pos.z += Math.sin(Math.PI * Math.min(1, vuela * 2)) * 0.6;
      ry = Math.sin(Math.PI * vuela) * 0.5; rz = -Math.sin(Math.PI * vuela) * 0.25;
      s = lerp(1, 0.6, vuela) * (1 + 0.5 * Math.sin(Math.PI * vuela));
      
    }
    const pega = eio(sg(t, S["s11-verlo"] - 0.3, S["s11-verlo"] + 0.4));
    if (pega > 0) { pos = lerpV(pos, LISTA_LOCAL, pega); pos.y += Math.sin(Math.PI * pega) * 0.6; ry = lerp(ry, 0.3, pega); rz = lerp(rz, 0, pega); rx = lerp(rx, -0.12, pega); s = lerp(s, 1.12, pega); }
    // "tu local": pop
    s *= 1 + 0.1 * Math.sin(Math.PI * sg(t, W[77] - 0.05, W[77] + 0.3));
  }
  return { s, pos, rx, ry, rz };
}

const _mira = new THREE.Vector3();
const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6]];
function ponerCamara(t) {
  const CAM = t < CORTE ? CAM_A : CAM_B;
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  let v;
  if (a[7] === "e") {
    const x = eio(u), va = val(a), vb = val(b);
    v = va.map((q, j) => lerp(q, vb[j], x));
    const dA = a[3], dB = b[3], d = Math.exp(v[2]);
    void dA; void dB; void d;
    const w = x;
    for (let j = 3; j < 6; j++) v[j] = lerp(va[j], vb[j], w);
  } else {
    // cúbica monótona en el tiempo (Fritsch-Carlson): continua y suave, sin pasarse de largo entre claves
    const p1 = val(a), p2 = val(b), h = b[0] - a[0];
    const prev = i > 0 && CAM[i - 1][7] !== "e" ? CAM[i - 1] : null;
    const next = i + 2 < CAM.length && b[7] !== "e" ? CAM[i + 2] : null;
    const p0 = prev ? val(prev) : null, p3 = next ? val(next) : null;
    const tang = (q0, t0, q1, t1, q2, t2, j) => {
      const d1 = (q1[j] - q0[j]) / (t1 - t0), d2 = (q2[j] - q1[j]) / (t2 - t1);
      if (d1 * d2 <= 0) return 0;
      const h1 = t1 - t0, h2 = t2 - t1;
      return (3 * (h1 + h2)) / ((2 * h2 + h1) / d1 + (h2 + 2 * h1) / d2);
    };
    const s2 = u * u, s3 = s2 * u;
    v = p1.map((_, j) => {
      const m1 = p0 ? tang(p0, prev[0], p1, a[0], p2, b[0], j) : 0;
      const m2 = p3 ? tang(p1, a[0], p2, b[0], p3, next[0], j) : 0;
      return (2 * s3 - 3 * s2 + 1) * p1[j] + (s3 - 2 * s2 + u) * h * m1 + (-2 * s3 + 3 * s2) * p2[j] + (s3 - s2) * h * m2;
    });
  }
  const [az, el, ld, tx, ty, tz] = v;
  const d = Math.exp(ld);
  _mira.set(tx, ty, tz);
  // "Tu local también despega": la cámara sigue a la tarjeta en su vuelo hasta el local
  // (y en "Hoy," cuando vuelve al volante). Arranca y termina en una clave donde la mira ya coincide con la
  // tarjeta, así el seguimiento no salta: el peso sube y baja suave en los bordes.
  for (const [a, b, dy0, dy1, sal] of [[S["s06-hoy"] - 0.1, S["s06-hoy"] + 0.65, 0, 0.12, 0.85], [S["s07-local"] - 0.1, S["s07-local"] + 0.5, 0.12, 0.6, 0.5]]) {
    const u = sg(t, a, b);
    if (u > 0 && u < 1) {
      const F = listaEstado(t).pos; F.y += lerp(dy0, dy1, u);
      _mira.lerp(F, eio(sg(u, 0, 0.08)) * (1 - eio(sg(u, sal, 1))));
    }
  }
  camera.position.set(_mira.x + d * Math.cos(el * D2R) * Math.sin(az * D2R), _mira.y + d * Math.sin(el * D2R), _mira.z + d * Math.cos(el * D2R) * Math.cos(az * D2R));
  const k = Math.min(1, 12 / d) * 0.6;
  camera.position.x += Math.sin(t * 0.7) * 0.04 * k; camera.position.y += Math.sin(t * 0.53) * 0.025 * k;
  camera.near = Math.max(0.05, d * 0.01); camera.far = Math.max(450, d * 8);
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  return { d, az, el };
}

// ================= ESCENA EN EL TIEMPO =================
const _q = new THREE.Vector3();
function renderAt(t) {
  scene.environmentRotation.y = t * 0.1;
  const cam = ponerCamara(t);

  // ---- cabina (gancho y "Hoy, todo piloto la repasa") ----
  {
    const s1 = t < CORTE ? 1 : 0;
    const s2 = vida(t, S["s06-hoy"] - 0.05, S["s07-local"] + 0.12, 0.45, 0.28);
    const s = Math.max(s1, s2);
    ocultar(cabina, s);
    const gancho = t < S["s03-expertos"];
    cabina.position.copy(gancho ? COCK1 : COCK); cabina.rotation.set(0, (gancho ? YAW1 : 0) + Math.sin(t * 0.6) * 0.03, 0);
    agujas.forEach((a, i) => (a.rotation.z = Math.sin(t * (1.3 + i * 0.2) + i) * 0.6));
  }

  // ---- el avión, la pista y la traba ----
  {
    const s = t < S["s06-hoy"] + 0.4 ? (t < CORTE ? 0 : lerp(0.92, 1, eo(sg(t, CORTE, CORTE + 0.35)))) * (1 - eio(sg(t, S["s06-hoy"] - 0.4, S["s06-hoy"] - 0.02))) : 0;
    const sube = eio(sg(t, S["s04-trabados"] - 0.12, S["s04-trabados"] + 0.55));
    // "se estrelló": la nariz se levanta apenas (pista de que algo anda mal), sin choque ni fuego
    const tiron = 0.05 * Math.sin(Math.PI * sg(t, W[16] - 0.05, W[16] + 0.6));
    ocultar(avion, s);
    avion.position.set(0, lerp(POSE0.y, POSE1.y, sube), 0);
    avion.rotation.set(0, 0, lerp(POSE0.rz, POSE1.rz, sube) + tiron);
    const ang = 7 * t + 16 * Math.max(0, t - S["s04-trabados"]);
    helices.forEach((h, i) => (h.rotation.x = -(ang + i * 0.7)));
    discos.forEach((d) => (d.material.opacity = 0.06 + 0.1 * sube));
    ocultar(pista, s > 0.002 ? 1 : 0); pista.scale.setScalar(1);
    apoyar(avionSombra, 0.3, PISO, 0, s * lerp(1, 1.15, sube), lerp(0.75, 0.55, sube));
    apoyar(fuseSombra, 0.2, PISO + 0.004, 0, s * lerp(1, 1.1, sube), lerp(0.9, 0.7, sube));
    // la traba: a partir de "lista corta" se aplana y se vuelve la tarjeta
    const aplana = eio(sg(t, W[37] - 0.2, W[37] + 0.12));
    const k = 1 - aplana;
    traba.visible = k > 0.02;
    traba.scale.set(Math.max(0.001, k), Math.max(0.001, k * k), Math.max(0.001, k));
    // "trabados": el timón quiere moverse y no puede (tiembla)
    const forcejeo = en(t, W[28], W[29] + 0.4) ? Math.sin(t * 38) * 0.02 : 0;
    elevador.rotation.z = forcejeo; traba.rotation.z = forcejeo;
    // la cinta flamea
    const p = cinta.geometry.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y0 = cintaBase[i * 3 + 1], x0 = cintaBase[i * 3], f = -y0 / 0.8;
      p.setXYZ(i, x0 - f * 0.28 - f * f * 0.1, y0 * (1 - 0.25 * f), Math.sin(-y0 * 9 - t * 8) * 0.07 * f);
    }
    p.needsUpdate = true; cinta.geometry.computeVertexNormals();
  }

  // ---- "1935" arriba, limpio ----
  {
    const s = vida(t, W[11] - 0.05, S["s03-expertos"] - 0.15, 0.4, 0.3) * 1.0;
    ocultar(anio, s);
    if (anio.visible) {
      anio.position.copy(_mira).add(new THREE.Vector3(0, 0.125 * cam.d, 0));
      anio.scale.multiplyScalar(cam.d / 26);
      anio.rotation.set(-0.05, cam.az * D2R + Math.sin(t * 0.7) * 0.06, 0);
      anio.scale.multiplyScalar(1 + 0.06 * Math.sin(Math.PI * sg(t, W[11] + 0.25, W[11] + 0.55)));
      // "se estrelló": pierde el verde
      const apaga = sg(t, W[16], W[16] + 0.25);
      M.anio.color.set(C.g).lerp(new THREE.Color(C.cr), apaga); M.anio.emissive.set(C.g).lerp(new THREE.Color(C.cr), apaga); M.anio.emissiveIntensity = lerp(0.22, 0.32, apaga); M.anio.roughness = 0.5;
    }
  }

  // ---- la pila de manuales: cae en "más entrenamiento" y se desarma en "una lista corta" ----
  {
    const base = TRABA_W.clone().addScaledVector(dirCam(CAM5.az, CAM5.el), 0.9);
    const piso = base.y - 0.75;
    let y = piso;
    manuales.forEach((m, i) => {
      const ti = W[35] - 0.1 + i * 0.07;
      const cae = sg(t, ti, ti + 0.32);
      const sale = eio(sg(t, W[37] - 0.1 + i * 0.02, W[37] + 0.35));
      const s = t < ti ? 0 : 1 - (sale > 0.85 ? (sale - 0.85) / 0.15 : 0);
      ocultar(m, s);
      const h = m.userData.h;
      const yy = y + h / 2;
      const lado = i % 2 ? 1 : -1;
      const caida = (1 - Math.min(1, cae * cae * 1.0)) * 3.2;
      const rebote = Math.sin(Math.PI * sg(t, ti + 0.32, ti + 0.5)) * 0.05;
      const right = new THREE.Vector3(Math.cos(CAM5.az * D2R), 0, -Math.sin(CAM5.az * D2R));
      _q.copy(base).addScaledVector(right, m.userData.dx + lado * sale * 2.6);
      m.position.set(_q.x, yy + caida + rebote + sale * 0.8, _q.z);
      m.rotation.set(sale * lado * 1.2, CAM5.az * D2R + m.userData.rot + m.userData.flip * Math.PI, sale * lado * 2.0);
      y += h;
    });
    const on = en(t, W[35] - 0.1, W[37] + 0.3);
    apoyar(manualesSombra, base.x, piso, base.z, on ? 1 - eio(sg(t, W[37], W[37] + 0.3)) : 0, 0.8);
  }

  // ---- la tarjeta de la lista: volante → (nace de la traba) → volante → local → pilar del local ----
  {
    const L = listaEstado(t);
    // se tildan los casilleros: 4 en ritmo, el último en "repasa"
    const tt = [S["s06-hoy"] + 0.45, W[41], W[42], W[43], W[44]];
    listaTicks.forEach((tk, i) => {
      let k = t < S["s07-local"] + 0.5 ? bk(sg(t, tt[i], tt[i] + 0.25)) : 0;
      if (t >= W[77] - 0.1) k = bk(sg(t, W[77] - 0.1 + i * 0.08, W[77] + 0.15 + i * 0.08));
      tk.visible = t >= S["s06-hoy"] && k > 0.01; tk.scale.setScalar(0.13 * k);
    });
    ocultar(lista, L.s); lista.position.copy(L.pos); lista.rotation.set(L.rx, L.ry, L.rz);
    listaSombra.visible = false;
  }

  // ---- el local: entra detrás de la tarjeta; toldo, persiana, luz ----
  {
    const s = t < S["s07-local"] + 0.05 ? 0 : bk(sg(t, S["s07-local"] + 0.05, S["s07-local"] + 0.5));
    ocultar(local, s); local.position.copy(STORE); local.rotation.set(0, 0, 0);
    // "despega": el toldo se despliega
    const tol = bk(sg(t, W[48] - 0.05, W[48] + 0.35));
    toldo.scale.set(1, 1, Math.max(0.02, tol)); toldo.rotation.x = lerp(0.2, 0.42, tol);
    // persiana: abajo → "abrir" sube → "cerrar" baja → en "¿Y si eso…?" sube de nuevo y queda arriba
    const arriba = Math.max(eio(sg(t, W[49] - 0.1, W[49] + 0.15)) * (1 - eio(sg(t, W[50] + 0.1, W[50] + 0.4))), eio(sg(t, S["s08-marta"] - 0.1, S["s08-marta"] + 0.4)));
    lamas.forEach((l, i) => { const y0 = 2.8 - i * 0.165; l.position.y = lerp(y0, 2.95, arriba); l.visible = !(arriba > 0.97); l.scale.y = lerp(1, 0.3, arriba); });
    interiorMat.emissiveIntensity = lerp(0.05, 0.95, arriba);
    cartelMat.emissiveIntensity = lerp(0.25, 0.9, Math.max(arriba, eio(sg(t, S["s11-verlo"], S["s11-verlo"] + 0.4))));
    apoyar(localSombra, STORE.x, PISO + 0.14, STORE.z + 0.6, s, 0.6);
  }

  // ---- la caja del proveedor: cae y rebota ----
  {
    const ti = W[52] - 0.05;
    const s = t < ti ? 0 : 1;
    const cae = sg(t, ti, ti + 0.38);
    const reb = Math.abs(Math.sin(Math.PI * 2 * sg(t, ti + 0.38, ti + 0.8))) * (1 - sg(t, ti + 0.38, ti + 0.8)) * 0.35;
    ocultar(caja, s);
    caja.position.set(STORE.x + 1.35, PISO + 0.14 + (1 - cae * cae) * 4.5 + reb, STORE.z + 1.3);
    caja.rotation.set(0, -0.35 + (1 - cae) * 0.8, (1 - cae) * 0.3);
    apoyar(cajaSombra, caja.position.x, PISO + 0.14, caja.position.z, s * cae, 0.8);
    const tk = vida(t, S["s11-verlo"] + 0.2, DUR + 5, 0.4);
    ocultar(cajaTick, tk * 0.45); cajaTick.position.set(caja.position.x - 0.35, PISO + 0.14 + 1.25 + Math.sin(t * 2) * 0.04, caja.position.z); cajaTick.rotation.set(0, Math.sin(t * 1.2) * 0.4, 0);
  }

  // ---- el mostrador y el cuaderno de MARTA ----
  {
    const sm = t < S["s08-marta"] - 0.1 ? 0 : bk(sg(t, S["s08-marta"] - 0.1, S["s08-marta"] + 0.3));
    ocultar(mostrador, sm); mostrador.position.copy(COUNTER);
    const sc = vida(t, S["s08-marta"] + 0.05, W[66] - 0.62, 0.45, 0.2);
    ocultar(cuaderno, sc * 1.0);
    // tiembla un poco: Marta sabe todo, pero solo ella
    const tiembla = en(t, W[58], W[58] + 0.45) ? Math.sin(t * 46) * 0.025 : 0;
    cuaderno.position.set(NB_W.x, TOPE + 0.01 + Math.abs(tiembla) * 0.6, NB_W.z - 0.05);
    cuaderno.rotation.set(0, -0.08 + tiembla, tiembla * 0.5);
    // el elástico salta
    const salta = sg(t, S["s09-sistema"] + 0.05, S["s09-sistema"] + 0.45);
    elastico.visible = salta < 0.95; elastico.position.set(0.53 + salta * 1.2, 0.27 + Math.sin(Math.PI * salta) * 0.8, 0); elastico.rotation.set(salta * 3, 0, salta * 2);
    // un post-it se despega y cae
    const pc = sg(t, W[61] - 0.05, W[61] + 0.45);
    postitCae.position.set(0.66 + pc * 0.5, 0.2 - pc * pc * 1.4, 0.55 + pc * 0.5); postitCae.rotation.set(pc * 1.4, 0, -pc * 2.2); postitCae.visible = pc < 0.98;
    // la tapa se abre y las hojas se levantan en abanico
    const abre = eio(sg(t, S["s09-sistema"] + 0.25, S["s09-sistema"] + 0.7));
    tapaFrente.rotation.z = abre * Math.PI * 0.96;
    hojas.forEach((h, i) => { const ti = S["s09-sistema"] + 0.55 + i * 0.07; h.rotation.z = eio(sg(t, ti, ti + 0.35)) * (0.35 + i * 0.32) * (1 - eio(sg(t, W[66] - 0.75, W[66] - 0.5))); });
    apoyar(cuadernoSombra, NB_W.x, TOPE, NB_W.z, sc, 0.7);
  }

  // ---- la tablet: se arma del cuaderno y queda parada en el mostrador ----
  {
    const t0 = W[66] - 0.45;
    const s = t < t0 ? 0 : lerp(0.55, 1, bk(sg(t, t0, t0 + 0.45)));
    ocultar(tablet, s * 1.0);
    const para = eio(sg(t, t0, t0 + 0.8));
    // aparece ya parada en su lugar (pop) y termina de enderezarse: no atraviesa el mostrador
    const rotX = lerp(-0.5, -0.16, para);
    tablet.position.set(TAB_W.x, TAB_W.y + (1 - para) * 0.12, TAB_W.z);
    tablet.rotation.set(rotX, lerp(-0.35, 0, para) + Math.sin(t * 0.6) * 0.03, 0);
    let tx = pantallas.menu;
    if (t >= S["s10-tareas"] + 0.05) { const n = [W[70], W[72], W[73] + 0.15].filter((x) => t >= x).length; tx = pantallas["ap" + n]; }
    if (t >= S["s12-llamada"] + 0.15) tx = pantallas.llamada;
    if (tx && pantallaMat.map !== tx) { pantallaMat.map = tx; pantallaMat.emissiveMap = tx; pantallaMat.needsUpdate = true; }
    // "cada": el dedo invisible toca la tarjeta Apertura
    tablet.scale.multiplyScalar(1 - 0.03 * Math.sin(Math.PI * sg(t, S["s10-tareas"] - 0.1, S["s10-tareas"] + 0.15)));
    apoyar(tabletSombra, TAB_W.x, TOPE, TAB_W.z - 0.2, s, 0.6);
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
dibujar().then(() => {
  renderAt(window.__hfThreeTime || 0);
  if (window.__tresListo) window.__tresListo();
});
