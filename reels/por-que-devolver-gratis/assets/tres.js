// Capa 3D de por-que-devolver-gratis (Three.js r170 local). Base técnica: reels/por-que-el-recordatorio (luces, entorno
// PMREM, cámara por planos con Hermite monótona, nube de pensamiento, "?" verde) y los personajes de reels/hacen-envios
// (assets/personajes.js, con `pies` expuestos para cambiarle el calzado a Rubén). renderAt(t) es una función pura del
// tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Fondo NAVY CLARO liso (#16243d, lo pone el HTML): el canvas es transparente y el piso solo muestra sombras.
// Zonas (x):
//   C (0):   la caja de envío del gancho sobre la cinta transportadora en U (s01-s02).
//   E (40):  dos celulares gigantes acostados como tarimas, con las columnas de cajas (s03-s05).
//   Q (80):  la caja sola que suelta el "?" (s06).
//   V (120): el celular-vitrina de pie con el champión adentro, la mano, el medidor de riesgo (s07).
//   P (160): las dos pilas: devoluciones y compras (s08).
//   R (200): el almacén de Rubén de noche (s09-s11): Rubén en el banquito, el celular, la caja que llega.
//   F (240): el celular "Tu tienda" (s12) y la caja chica del cierre (s13, fondo verde).
// LA CAJA (kraft, solapas articuladas, canto corrugado, cinta verde) y SU ETIQUETA "DEVOLUCIÓN GRATIS" son el hilo:
// misma geometría en el gancho, la cinta, las columnas, la bisagra, las pilas y la que le llega a Rubén.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800p.js";
import LEXEND_D from "./vendor/three/lexend800d.js"; // subconjunto propio con "años" (partes/fuente3d.py)
import { crearPersonaje, ELENCO, poseEn, CARA, crearMate, crearTermo, crearYerba, crearFideos, crearGalletitas, crearDulceDeLeche, crearLamparita, crearBanquito } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));
await document.fonts.load('500 60px "IBM Plex Mono"');

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
const S = E;
const popIn = (t, a, d = 0.28) => (t < a ? 0 : lerp(0.35, 1, bk(sg(t, a, a + d))));
const arco = (A, B, u, h) => { const p = lerpV(A, B, u); p.y += Math.sin(Math.PI * u) * h; return p; };
// caída con rebote: 0 arriba → 1 en el piso en d, con un rebotito
const caida = (t, a, d = 0.22) => (t < a ? 0 : t < a + d ? Math.pow(sg(t, a, a + d), 2) : 1 - Math.abs(rebote(t, a + d, 9, 22, 0.12)));

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
const camera = new THREE.PerspectiveCamera(34, 1080 / 1920, 0.05, 400);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x5a5f6a);
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
scene.environmentIntensity = 0.75;

const OC = V(0, 0, 0), OE = V(40, 0, 0), OQ = V(80, 0, 0), OV = V(120, 0, 0), OP = V(160, 0, 0), OR = V(200, 0, 0), OF = V(240, 0, 0);
const key = new THREE.DirectionalLight(0xfff0dc, 1.7); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.3); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x3a4664, 1.2); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.6);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.normalBias = 0.02; sol.shadow.radius = 5;
scene.add(sol, sol.target);
const lampLuz = new THREE.PointLight(0xe9a65a, 0, 5, 1.4); scene.add(lampLuz);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, madera: 0xdcbb92, kraft: 0xc9a46e, kraftO: 0xa8834f, kraftI: 0xae8957 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.14 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.45), red: mat(C.red, 0.6),
  white: mat(C.white, 0.42), tilde: mat(C.navy, 0.45), gris: mat(C.gris, 0.55), madera: mat(C.madera, 0.55),
  cromo: mat(0xdfe3ea, 0.16, { metalness: 0.95 }),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.max(0.0005, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001)));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", ${fam === "Lexend" ? "sans-serif" : "monospace"}`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
// textura que se redibuja (con clave: solo cuando cambia)
function texViva(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { c, t, x: c.getContext("2d"), clave: "" }; }
const ajustar = (x, txt, peso, px, ancho, fam) => { let s = px; x.font = F(peso, s, fam); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s, fam); } return s; };
const sh = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const font = new FontLoader().parse(LEXEND), fontD = new FontLoader().parse(LEXEND_D);
const textoGeo = (s, size, depth, fu = font) => {
  const g = new TextGeometry(s, { font: fu, size, depth, curveSegments: 10, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
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
function hacerTilde(r = 0.17, padre = scene) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, M.g); d.scale.set(r, r, r * 0.35); g.add(d);
  const bd = mesh(new THREE.TorusGeometry(1, 0.09, 8, 40), M.navy); bd.scale.set(r, r, r); g.add(bd);
  const tk = mesh(tickGeo, M.tilde, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  sh(g); padre.add(g); return g;
}
const NAV = "#16243d", NAV3 = "#1f3254", CRE = "#efeee5", VER = "#5ce611", VERD = "#3fa60a", NAV0 = "#0b1220", ROJ = "#c7655b", GRI = "#8e8c80";
// piso invisible que solo muestra sombras (sobre el navy claro liso)
function pisoSombra(x, z, w = 10, d = 10, op = 0.45) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.ShadowMaterial({ opacity: op, color: 0x0b1220 }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, 0.001, z); m.receiveShadow = true; scene.add(m); return m;
}
// semilla
const azarDe = (s0) => { let s = s0; return () => ((s = (s * 16807) % 2147483647) / 2147483647); };

// ================= LA CAJA DE ENVÍO =================
const CJ = { W: 0.6, D: 0.42, H: 0.24, th: 0.012, Ls: 0.19 };
const corrTex = tex(512, 64, (x, w, h) => {
  x.fillStyle = "#c2a06a"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "#7d5f33"; x.lineWidth = 7; x.beginPath();
  for (let i = 0; i <= w; i += 2) { const y = h / 2 + Math.sin((i / w) * Math.PI * 2 * 14) * h * 0.26; i ? x.lineTo(i, y) : x.moveTo(i, y); }
  x.stroke(); x.fillStyle = "#a8834f"; x.fillRect(0, 0, w, 9); x.fillRect(0, h - 9, w, 9);
});
const kraftTex = tex(512, 512, (x, w, h) => {
  x.fillStyle = "#c9a46e"; x.fillRect(0, 0, w, h);
  const az = azarDe(5);
  for (let i = 0; i < 900; i++) { x.fillStyle = az() < 0.5 ? "rgba(150,112,62,0.16)" : "rgba(235,205,150,0.16)"; x.fillRect(az() * w, az() * h, 2 + az() * 9, 1.5); }
});
const MK = {
  ext: new THREE.MeshStandardMaterial({ map: kraftTex, roughness: 0.88 }),
  int: mat(C.kraftI, 0.92),
  canto: new THREE.MeshStandardMaterial({ map: corrTex, roughness: 0.9 }),
};
const MK_GRIS = { ext: mat(0x8e8c80, 0.9), int: mat(0x77756b, 0.92), canto: mat(0x8e8c80, 0.9) };
const MK_CREMA = { ext: mat(0xd9c7a3, 0.88), int: mat(0xb9a17a, 0.92), canto: mat(0xcbb489, 0.9) };
const cintaM = { g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.12 }), navy: mat(C.navy, 0.45) };
const sedaGeo = (() => {
  const { W: Wc, D: Dc, th } = CJ;
  const g = new THREE.PlaneGeometry(Wc - 2 * th - 0.006, Dc - 2 * th - 0.006, 18, 12); g.rotateX(-Math.PI / 2);
  const p = g.attributes.position, az = azarDe(19);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const borde = Math.max(Math.abs(x) / (Wc / 2), Math.abs(z) / (Dc / 2));
    p.setY(i, (az() - 0.5) * 0.03 + Math.pow(borde, 6) * 0.07 + Math.sin(x * 23) * Math.cos(z * 19) * 0.012);
  }
  g.computeVertexNormals(); return g;
})();
const sedaM = new THREE.MeshStandardMaterial({ color: 0xf6f4ea, roughness: 0.75, side: THREE.DoubleSide, flatShading: true });
function hacerCaja({ cinta = "g", seda = true, mk = MK } = {}) {
  const g = new THREE.Group(); const cuerpo = new THREE.Group(); g.add(cuerpo);
  const { W: Wc, D: Dc, H, th, Ls } = CJ;
  const { ext, int, canto } = mk;
  const add = (w, h, d, x, y, z, mats) => { const m = mesh(rbox(w, h, d, 0.004, 1), mats, x, y, z); cuerpo.add(m); return m; };
  // [+x, -x, +y, -y, +z, -z]
  add(Wc, th, Dc, 0, th / 2, 0, [canto, canto, int, ext, canto, canto]);
  add(Wc, H, th, 0, H / 2, Dc / 2 - th / 2, [canto, canto, canto, ext, ext, int]);
  add(Wc, H, th, 0, H / 2, -Dc / 2 + th / 2, [canto, canto, canto, ext, int, ext]);
  add(th, H, Dc - 2 * th, -Wc / 2 + th / 2, H / 2, 0, [int, ext, canto, ext, canto, canto]);
  add(th, H, Dc - 2 * th, Wc / 2 - th / 2, H / 2, 0, [ext, int, canto, ext, canto, canto]);
  // solapas: [izq, der, frente, atrás]; las largas (frente/atrás) van arriba de las cortas
  const solapa = (px, py, pz, w, d, ox, oz) => {
    const piv = new THREE.Group(); piv.position.set(px, py, pz); cuerpo.add(piv);
    piv.add(mesh(rbox(w, th, d, 0.004, 1), [canto, canto, ext, int, canto, canto], ox, th / 2, oz));
    return piv;
  };
  const sol = [
    solapa(-Wc / 2, H, 0, Ls, Dc - 0.006, Ls / 2, 0),
    solapa(Wc / 2, H, 0, Ls, Dc - 0.006, -Ls / 2, 0),
    solapa(0, H + th, Dc / 2, Wc, Dc / 2, 0, -Dc / 4),
    solapa(0, H + th, -Dc / 2, Wc, Dc / 2, 0, Dc / 4),
  ];
  // la cinta: tira arriba (barrido de izq a der) y dos bajadas por los costados
  const cm = cintaM[cinta];
  const tira = new THREE.Group(); tira.position.set(-Wc / 2 - 0.006, H + 2 * th + 0.0016, 0); cuerpo.add(tira);
  const tg = rbox(1, 0.003, 0.078, 0.0012, 1); tg.translate(0.5, 0, 0);
  tira.add(mesh(tg, cm));
  const baja = [-1, 1].map((s) => { const b = mesh(rbox(0.003, 0.09, 0.078, 0.0012, 1), cm, s * (Wc / 2 + 0.0016), H + 2 * th - 0.045, 0); cuerpo.add(b); return b; });
  let sedaMesh = null;
  if (seda) { sedaMesh = mesh(sedaGeo, sedaM, 0, H - 0.05, 0); cuerpo.add(sedaMesh); }
  sh(g);
  g.userData = { cuerpo, sol, tira, baja, seda: sedaMesh };
  ponerCaja(g, [1, 1, 1, 1], 0);
  return g;
}
const AB = 2.1; // ángulo de una solapa abierta (hacia afuera y arriba)
// ab = [izq, der, frente, atrás] (0 cerrada .. 1 abierta), cinta 0..1 (barrido)
function ponerCaja(c, ab, cinta = 0) {
  const [l, r, f, b] = c.userData.sol;
  l.rotation.z = ab[0] * AB; r.rotation.z = -ab[1] * AB; f.rotation.x = ab[2] * AB; b.rotation.x = -ab[3] * AB;
  const L = CJ.W + 0.012;
  c.userData.tira.visible = cinta > 0.01; c.userData.tira.scale.set(Math.max(0.001, cinta * L), 1, 1);
  c.userData.baja[0].visible = cinta > 0.02; c.userData.baja[1].visible = cinta > 0.98;
  if (c.userData.seda) c.userData.seda.visible = Math.max(...ab) > 0.05;
}
// cadena de cierre: las cortas primero, después las largas (0 abierta → 1 cerrada), d = duración total
function cierreEn(t, a, d = 0.42) {
  const u = (k) => 1 - eio(sg(t, a + k * d * 0.2, a + k * d * 0.2 + d * 0.4));
  return [u(0), u(1), u(2), u(3)];
}
function aperturaEn(t, a, d = 0.3) {
  const u = (k) => bk(sg(t, a + k * d * 0.12, a + k * d * 0.12 + d * 0.64));
  return [u(2), u(3), u(0), u(1)];
}

// ================= LA ETIQUETA (devolución gratis / la pagás vos / compra) =================
const ET = { w: 0.3, h: 0.19, d: 0.008 };
function flechaVuelta(x, cx, cy, r, col, lw, u = 1) {
  // arco de casi 300° que vuelve, con la punta
  if (u <= 0.02) return; // sin dibujar: nada (el cap redondo dejaba un punto suelto)
  const a0 = -Math.PI * 0.15, a1 = a0 + Math.PI * 1.55 * u;
  x.strokeStyle = col; x.lineWidth = lw; x.lineCap = "round"; x.beginPath(); x.arc(cx, cy, r, a0, a1); x.stroke();
  if (u > 0.95) {
    const ex = cx + Math.cos(a1) * r, ey = cy + Math.sin(a1) * r, tg = a1 + Math.PI / 2;
    x.fillStyle = col; x.beginPath();
    x.moveTo(ex + Math.cos(tg) * lw * 1.3, ey + Math.sin(tg) * lw * 1.3);
    x.lineTo(ex + Math.cos(tg - 2.3) * lw * 1.25, ey + Math.sin(tg - 2.3) * lw * 1.25);
    x.lineTo(ex + Math.cos(tg + 2.3) * lw * 1.25, ey + Math.sin(tg + 2.3) * lw * 1.25);
    x.closePath(); x.fill();
  }
}
function codigoBarras(x, X, Y, w, h, col = NAV0) {
  const az = azarDe(77); let px = X; x.fillStyle = col;
  while (px < X + w - 10) { const bw = 6 + Math.floor(az() * 3) * 7; x.fillRect(px, Y, bw, h); px += bw + 8 + Math.floor(az() * 3) * 6; }
}
function dibujarEtiqueta(x, w, h, tipo, u = 1) {
  x.clearRect(0, 0, w, h);
  x.fillStyle = "#fbfaf4"; rr(x, 0, 0, w, h, 46);
  const malo = tipo === "pagas";
  x.lineWidth = 30; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(15, 15, w - 30, h - 30, 36); x.stroke();
  // ícono arriba a la izquierda
  if (tipo === "compra") {
    x.fillStyle = VER; x.beginPath(); x.arc(150, 168, 92, 0, 7); x.fill(); x.lineWidth = 16; x.strokeStyle = NAV0; x.stroke();
    x.lineWidth = 30; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(108, 170); x.lineTo(140, 204); x.lineTo(198, 130); x.stroke();
  } else if (tipo === "vuelta") { flechaVuelta(x, w / 2, 255, 170, VERD, 70, 1); codigoBarras(x, 70, 470, w - 140, 120); return; }
  else flechaVuelta(x, 150, 170, 74, malo ? ROJ : VERD, 34, u);
  x.textAlign = "left"; x.textBaseline = "alphabetic";
  const L = 280, R = w - 60;
  if (tipo === "compra") {
    x.fillStyle = NAV0; ajustar(x, "COMPRA", 900, 150, R - L); x.fillText("COMPRA", L, 222);
    x.fillStyle = VER; rr(x, 52, 282, w - 104, 150, 24); x.fillStyle = NAV0; ajustar(x, "NUEVA", 900, 128, w - 160); x.textAlign = "center"; x.fillText("NUEVA", w / 2, 402);
  } else if (malo) {
    x.fillStyle = NAV0; ajustar(x, "DEVOLUCIÓN:", 900, 120, R - L); x.fillText("DEVOLUCIÓN:", L, 214);
    x.fillStyle = ROJ; rr(x, 52, 282, w - 104, 150, 24); x.fillStyle = "#fbfaf4"; ajustar(x, "LA PAGÁS VOS", 900, 112, w - 150); x.textAlign = "center"; x.fillText("LA PAGÁS VOS", w / 2, 398);
  } else {
    x.fillStyle = NAV0; ajustar(x, "DEVOLUCIÓN", 900, 128, R - L); x.fillText("DEVOLUCIÓN", L, 218);
    x.fillStyle = VER; rr(x, 52, 282, w - 104, 150, 24); x.fillStyle = NAV0; ajustar(x, "GRATIS", 900, 130, w - 160); x.textAlign = "center"; x.fillText("GRATIS", w / 2, 404);
  }
  codigoBarras(x, 70, 470, w - 140, 120);
}
const ETPX = [1024, 648];
function hacerEtiqueta(tipo = "gratis") {
  const g = new THREE.Group();
  const tv = texViva(...ETPX);
  const fm = new THREE.MeshStandardMaterial({ map: tv.t, roughness: 0.6, emissive: 0xffffff, emissiveMap: tv.t, emissiveIntensity: 0.16 });
  const borde = mat(0xfbfaf4, 0.6);
  g.add(mesh(rbox(ET.w, ET.h, ET.d, 0.012, 2), [borde, borde, borde, borde, fm, borde]));
  g.userData = { tv };
  ponerEtiqueta(g, tipo, 1);
  sh(g); return g;
}
function ponerEtiqueta(g, tipo, u = 1) {
  const q = Math.round(cl(u) * 12) / 12;
  const k = tipo + "|" + q; const tv = g.userData.tv; if (tv.clave === k) return; tv.clave = k;
  dibujarEtiqueta(tv.x, ...ETPX, tipo, q); tv.t.needsUpdate = true;
}

// ================= EL CHAMPIÓN (sin parecido a ninguna marca: franja recta verde, puntera crema) =================
// perfil lateral (z = largo, y = alto) extruido a lo ancho: se lee como zapatilla desde cualquier lado
function extruirPerfil(pts, ancho, bev = 0.01, curvas = []) {
  const sh0 = new THREE.Shape();
  pts.forEach(([z, y, q], i) => { if (!i) sh0.moveTo(z, y); else if (q) sh0.quadraticCurveTo(q[0], q[1], z, y); else sh0.lineTo(z, y); });
  sh0.closePath();
  const g = new THREE.ExtrudeGeometry(sh0, { depth: ancho, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 3, curveSegments: 14 });
  g.rotateY(-Math.PI / 2); g.translate(ancho / 2, 0, 0);
  return g;
}
const PERFIL_CAP = [[-0.132, 0.036], [-0.138, 0.1], [-0.124, 0.133, [-0.14, 0.13]], [-0.09, 0.126], [-0.052, 0.116], [-0.034, 0.142], [-0.014, 0.14], [0.06, 0.088], [0.104, 0.07], [0.138, 0.05, [0.134, 0.068]], [0.14, 0.036, [0.146, 0.04]]];
const PERFIL_PUNTA = [[0.095, 0.036], [0.1, 0.058, [0.094, 0.05]], [0.124, 0.06, [0.112, 0.062]], [0.141, 0.046, [0.137, 0.059]], [0.142, 0.036, [0.146, 0.04]]];
const PERFIL_TALON = [[-0.134, 0.036], [-0.14, 0.096], [-0.112, 0.1], [-0.1, 0.036]];
const PERFIL_FRANJA = [[-0.085, 0.064], [0.05, 0.058], [0.062, 0.074], [-0.074, 0.088]];
const geoCap = extruirPerfil(PERFIL_CAP, 0.084), geoPunta = extruirPerfil(PERFIL_PUNTA, 0.088, 0.011), geoTalon = extruirPerfil(PERFIL_TALON, 0.088, 0.011), geoFranja = extruirPerfil(PERFIL_FRANJA, 0.003, 0.002);
function hacerChampion({ viejo = false } = {}) {
  const g = new THREE.Group();
  const cap = viejo ? mat(0x5a6480, 0.9) : mat(C.navy3, 0.55);
  const cap2 = viejo ? mat(0x737c92, 0.9) : mat(C.edge, 0.5);
  const fr = viejo ? mat(0x86a070, 0.85) : mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.12 });
  const sue = viejo ? mat(0xd9d4c2, 0.8) : mat(0xffffff, 0.45);
  const pun = viejo ? mat(0xcfc8b2, 0.85) : mat(0xffffff, 0.5);
  const cord = viejo ? mat(0xd9d2bc, 0.8) : mat(0xffffff, 0.45);
  const dibujo = tex(512, 64, (x, w, h) => { x.fillStyle = viejo ? "#d9d4c2" : "#ffffff"; x.fillRect(0, 0, w, h); x.fillStyle = viejo ? "#9c9684" : "#b4b2a3"; for (let i = 0; i < w; i += 32) x.fillRect(i, h * 0.5, 18, h * 0.32); x.fillStyle = viejo ? "#8a846f" : "#2c4268"; x.fillRect(0, h * 0.22, w, 7); });
  const sueM = new THREE.MeshStandardMaterial({ map: dibujo, roughness: 0.6 });
  // suela blanca gruesa con perfil: atrás fija; adelante en bisagra (el viejo la tiene despegada)
  // los nuevos: suela de una pieza; el viejo: la misma suela partida en la bisagra (misma altura, sin escalón)
  const bis = new THREE.Group(); bis.position.set(0, 0.0, 0.02); g.add(bis);
  if (viejo) {
    g.add(mesh(rbox(0.114, 0.038, 0.17, 0.014, 2), [sueM, sueM, sue, sue, sueM, sueM], 0, 0.019, -0.065));
    bis.add(mesh(rbox(0.114, 0.038, 0.135, 0.014, 2), [sueM, sueM, sue, sue, sueM, sueM], 0, 0.019, 0.064));
  } else g.add(mesh(rbox(0.114, 0.038, 0.3, 0.016, 2), [sueM, sueM, sue, sue, sueM, sueM], 0, 0.019, 0.0));
  if (viejo) { // la "boca": el interior oscuro bajo la capellada
    g.add(mesh(rbox(0.09, 0.006, 0.11, 0.003, 1), mat(0x2a1c18, 0.9), 0, 0.037, 0.085));
    bis.add(mesh(rbox(0.09, 0.004, 0.1, 0.002, 1), mat(0xa04a44, 0.8), 0, 0.037, 0.065));
  }
  // capellada (perfil extruido), puntera y talonera blancas, franja verde recta a los costados
  g.add(mesh(geoCap, cap));
  g.add(mesh(geoPunta, pun)); g.add(mesh(geoTalon, pun));
  for (const sx of [-1, 1]) g.add(mesh(geoFranja, fr, sx * 0.0525, 0, 0));
  // abertura del tobillo, cuello acolchado
  const ab = mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.01, 22), mat(0x0e1626, 0.85), 0, 0.124, -0.088); ab.scale.set(1, 1, 1.35); ab.rotation.x = -0.12; g.add(ab);
  const cuello = mesh(new THREE.TorusGeometry(0.036, 0.009, 8, 24), cap2, 0, 0.126, -0.088); cuello.rotation.x = Math.PI / 2 - 0.12; cuello.scale.set(1.2, 1.5, 1); g.add(cuello);
  // lengüeta y cordones blancos cruzados con ojalillos
  const len = mesh(rbox(0.05, 0.05, 0.012, 0.01, 2), cap2, 0, 0.143, -0.03); len.rotation.x = -0.4; g.add(len);
  for (let i = 0; i < 4; i++) {
    const z = -0.008 + i * 0.019, y = 0.137 - (z + 0.014) * 0.667 + 0.006;
    const c1 = mesh(rbox(0.086, 0.012, 0.013, 0.005, 1), cord, 0, y + 0.002, z); c1.rotation.set(0.59, 0, (i % 2 ? 1 : -1) * 0.16); g.add(c1);
    for (const sx of [-1, 1]) g.add(mesh(new THREE.SphereGeometry(0.0065, 8, 6), M.navy, sx * 0.043, y - 0.001, z));
  }
  sh(g);
  g.userData = { bis };
  return g;
}

// ================= EL CELULAR (pantallas con textura canvas) =================
const PP = [768, 1556];
function dibujarPagina(x, tipo, n = 0) {
  const [w, h] = PP;
  x.fillStyle = "#f6f4ea"; x.fillRect(0, 0, w, h);
  // cabecera
  x.fillStyle = NAV0; x.fillRect(0, 0, w, 230);
  x.fillStyle = CRE; x.font = F(700, 46); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("21:47", 40, 50);
  const titulo = tipo === "tu" ? "Tu tienda" : tipo.startsWith("tienda") ? "Tienda " + tipo.slice(6) : "Tienda";
  x.fillStyle = VER; x.beginPath(); x.arc(100, 150, 56, 0, 7); x.fill();
  x.fillStyle = NAV0; x.font = F(900, 64); x.textAlign = "center"; x.fillText(tipo === "tu" ? "T" : "T", 100, 154);
  x.fillStyle = CRE; x.textAlign = "left"; ajustar(x, titulo, 800, tipo.startsWith("tienda") ? 104 : 80, w - 220); x.fillText(titulo, 180, 150);
  if (tipo.startsWith("tienda")) {
    // grilla de productos
    for (let i = 0; i < 2; i++) for (let j = 0; j < 4; j++) {
      const X = 40 + i * 354, Y = 280 + j * 318;
      x.fillStyle = "#ffffff"; rr(x, X, Y, 334, 296, 26); x.lineWidth = 8; x.strokeStyle = "#d9d7c9"; x.beginPath(); x.roundRect(X, Y, 334, 296, 26); x.stroke();
      x.fillStyle = "#e9e6d8"; rr(x, X + 24, Y + 22, 286, 160, 18);
      x.fillStyle = "#c9a46e"; rr(x, X + 105, Y + 60, 124, 84, 10);
      x.fillStyle = VER; rr(x, X + 24, Y + 206, 286, 66, 33);
    }
    return;
  }
  // ficha: zona de la foto (el objeto 3D va encima), nombre, precio, botón
  const vit = tipo === "vitrina";
  x.fillStyle = "#ffffff"; rr(x, 40, vit ? 250 : 270, w - 80, vit ? 700 : 560, 36);
  x.fillStyle = "#e9e6d8"; x.beginPath(); x.ellipse(w / 2, vit ? 860 : 770, 250, 36, 0, 0, 7); x.fill();
  if (tipo === "tu") {
    // la foto de la campera (dibujada): cuerpo crema con cierre, mangas, capucha navy, bolsillos
    x.save(); x.translate(w / 2, 560); x.lineJoin = "round"; x.lineWidth = 12; x.strokeStyle = NAV0;
    const forma = (pts) => { x.beginPath(); pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.closePath(); x.fill(); x.stroke(); };
    x.fillStyle = "#d9d7c9"; forma([[-150, -160], [-235, 120], [-185, 150], [-120, -40]]); forma([[150, -160], [235, 120], [185, 150], [120, -40]]);
    x.fillStyle = CRE; forma([[-150, -175], [-60, -200], [60, -200], [150, -175], [150, 210], [-150, 210]]);
    x.fillStyle = "#1f3254"; x.beginPath(); x.ellipse(0, -205, 95, 45, 0, 0, 7); x.fill(); x.stroke();
    x.lineWidth = 10; x.beginPath(); x.moveTo(0, -170); x.lineTo(0, 205); x.stroke();
    x.fillStyle = VER; rr(x, -12, -160, 24, 40, 6);
    x.lineWidth = 9; x.strokeStyle = NAV0; x.strokeRect(-125, 70, 80, 70); x.strokeRect(45, 70, 80, 70);
    x.restore();
  }
  const nombre = tipo === "tu" ? "Campera de abrigo" : "Champión urbano";
  const precio = tipo === "tu" ? "$ 3.200" : "$ 2.490";
  if (tipo === "pago") {
    x.fillStyle = NAV0; x.font = F(900, 60); x.textAlign = "left"; x.fillText("Tu compra", 50, 890);
    x.fillStyle = "#1f2840"; x.font = F(800, 58); x.fillText(nombre, 50, 952);
    x.fillStyle = NAV0; x.font = F(900, 78); x.fillText(precio, 50, 1034);
  } else {
    x.fillStyle = NAV0; ajustar(x, nombre, 800, 64, w - 100); x.textAlign = "left"; x.fillText(nombre, 50, vit ? 1015 : 925);
    x.font = F(900, vit ? 100 : 92); x.fillText(precio, 50, vit ? 1125 : 1028);
  }
  // botón
  const bt = tipo === "pago" ? "Pagar" : "Comprar";
  const hecho = n > 0;
  x.fillStyle = VER; rr(x, 50, h - 270, w - 100, 150, 75);
  x.lineWidth = 10; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(50, h - 270, w - 100, 150, 75); x.stroke();
  x.fillStyle = NAV0; x.font = F(900, 74); x.textAlign = "center"; x.fillText(hecho ? (tipo === "pago" ? "Pagado" : "¡Listo!") : bt, w / 2 + (hecho ? 40 : 0), h - 192);
  if (hecho) { x.lineWidth = 16; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); const X0 = w / 2 - (tipo === "pago" ? 190 : 170); x.moveTo(X0, h - 196); x.lineTo(X0 + 26, h - 168); x.lineTo(X0 + 72, h - 228); x.stroke(); }
}
// celular: cuerpo + pantalla (W, H); la pantalla mira a +z
function hacerCelu(Wc = 0.08, Hc = 0.162, tipo = "ficha", funda = C.edge) {
  const g = new THREE.Group();
  g.add(mesh(rbox(Wc + 0.008, Hc + 0.008, 0.012, 0.012), mat(funda, 0.4)));
  g.add(mesh(rbox(0.026, 0.026, 0.004, 0.006), M.navy, -Wc * 0.27, Hc * 0.36, -0.0072));
  const tv = texViva(...PP);
  const pm = new THREE.MeshStandardMaterial({ map: tv.t, roughness: 0.35, emissive: 0xffffff, emissiveMap: tv.t, emissiveIntensity: 0.35 });
  const p = mesh(new THREE.PlaneGeometry(Wc, Hc), pm, 0, 0, 0.0066); g.add(p);
  g.add(mesh(rbox(Wc * 0.25, 0.004, 0.002, 0.0015), M.navy, 0, Hc / 2 - 0.004, 0.0072));
  g.userData = { tv, Wc, Hc, pantalla: p };
  ponerPagina(g, tipo);
  sh(g); p.castShadow = false; return g;
}
function ponerPagina(g, tipo, n = 0) {
  const k = tipo + "|" + n; const tv = g.userData.tv; if (tv.clave === k) return; tv.clave = k;
  dibujarPagina(tv.x, tipo, n); tv.t.needsUpdate = true;
}
// coordenadas de la pantalla en píxeles de la textura → locales del celular
const enPant = (g, px, py, z = 0.01) => V((px / PP[0] - 0.5) * g.userData.Wc, (0.5 - py / PP[1]) * g.userData.Hc, z);

// el sello verde "Devolución gratis" (placa 3D con la flecha de la etiqueta)
function hacerSello() {
  const g = new THREE.Group();
  const t = tex(1024, 300, (x, w, h) => {
    x.clearRect(0, 0, w, h); x.fillStyle = VER; rr(x, 2, 2, w - 4, h - 4, 66); x.lineWidth = 20; x.strokeStyle = NAV0; x.beginPath(); x.roundRect(12, 12, w - 24, h - 24, 56); x.stroke();
    flechaVuelta(x, 150, 150, 66, NAV0, 30, 1);
    x.fillStyle = NAV0; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "Devolución", 900, 104, w - 300); x.fillText("Devolución", 260, 104);
    ajustar(x, "gratis", 900, 104, w - 300); x.fillText("gratis", 260, 210);
  });
  // ronda 2: una placa plana con la textura (la caja redondeada verde daba un doble borde corrido)
  const fm = new THREE.MeshStandardMaterial({ map: t, roughness: 0.5, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.22, transparent: true, alphaTest: 0.5 });
  g.add(mesh(new THREE.PlaneGeometry(1, 0.293), fm, 0, 0, 0));
  return g;
}

// ================= ZONA C: la caja del gancho y la cinta transportadora en U =================
const pisoC = pisoSombra(OC.x, 0, 12, 12);
const CIN = { x: 0.56, ancho: 0.78, z0: 0.95, z1: -1.7, alto: 0.11 };
const cinta = new THREE.Group(); scene.add(cinta);
{
  const ri = CIN.x - CIN.ancho / 2, re = CIN.x + CIN.ancho / 2;
  const sh2 = new THREE.Shape();
  sh2.moveTo(re, -CIN.z0); sh2.lineTo(re, -CIN.z1); sh2.absarc(0, -CIN.z1, re, 0, Math.PI, false); sh2.lineTo(-re, -CIN.z0); sh2.lineTo(-ri, -CIN.z0); sh2.lineTo(-ri, -CIN.z1);
  sh2.absarc(0, -CIN.z1, ri, Math.PI, 0, true); sh2.lineTo(ri, -CIN.z0); sh2.closePath();
  // la forma está en (x, -z): se acuesta con rotateX(-π/2) → y = 0 y z = -(-z)
  const banda = new THREE.ExtrudeGeometry(sh2, { depth: 0.035, bevelEnabled: false, curveSegments: 40 }); banda.rotateX(-Math.PI / 2);
  const bandaT = tex(256, 256, (x, w, h) => { x.fillStyle = "#26365a"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f2d4c"; for (let i = 0; i < 8; i++) x.fillRect(0, i * 32, w, 12); });
  bandaT.wrapS = bandaT.wrapT = THREE.RepeatWrapping; bandaT.repeat.set(4, 4);
  const b = mesh(banda, [new THREE.MeshStandardMaterial({ map: bandaT, roughness: 0.75 }), mat(0x1a2742, 0.7)], 0, CIN.alto - 0.035, 0); cinta.add(b);
  // la base (más ancha, crema) que hace de baranda
  const base = new THREE.Shape();
  const rb = re + 0.05, rib = Math.max(0.03, ri - 0.05);
  base.moveTo(rb, -CIN.z0 - 0.04); base.lineTo(rb, -CIN.z1); base.absarc(0, -CIN.z1, rb, 0, Math.PI, false); base.lineTo(-rb, -CIN.z0 - 0.04); base.lineTo(-rib, -CIN.z0 - 0.04); base.lineTo(-rib, -CIN.z1);
  base.absarc(0, -CIN.z1, rib, Math.PI, 0, true); base.lineTo(rib, -CIN.z0 - 0.04); base.closePath();
  const bg = new THREE.ExtrudeGeometry(base, { depth: CIN.alto - 0.04, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, curveSegments: 40 }); bg.rotateX(-Math.PI / 2);
  cinta.add(mesh(bg, M.cr2, 0, 0.012, 0));
  // rodillos en las puntas
  for (const s of [-1, 1]) { const r = mesh(new THREE.CylinderGeometry(0.05, 0.05, CIN.ancho + 0.08, 20), M.cromo, s * CIN.x, CIN.alto - 0.03, CIN.z0 + 0.03); r.rotation.z = Math.PI / 2; cinta.add(r); }
  // flechas verdes pintadas (chevrons) a lo largo del recorrido
  const chev = new THREE.Shape(); [[-0.11, -0.05], [0, 0.06], [0.11, -0.05], [0.11, -0.12], [0, -0.01], [-0.11, -0.12]].forEach(([x, y], i) => (i ? chev.lineTo(x, y) : chev.moveTo(x, y))); chev.closePath();
  const chG = new THREE.ExtrudeGeometry(chev, { depth: 0.006, bevelEnabled: false }); chG.rotateX(-Math.PI / 2);
  const cm = mat(C.g, 0.5, { emissive: C.g, emissiveIntensity: 0.2 });
  for (let i = 0; i < 4; i++) { const z = CIN.z0 - 0.45 - i * 0.62; const a = mesh(chG, cm, CIN.x, CIN.alto + 0.002, z); a.rotation.y = 0; cinta.add(a); const bq = mesh(chG, cm, -CIN.x, CIN.alto + 0.002, z + 0.2); bq.rotation.y = Math.PI; cinta.add(bq); }
  sh(cinta); cinta.traverse((o) => { if (o.isMesh) o.castShadow = false; });
}
// recorrido de la U: s = 0 en la punta de adelante del carril A (x+), 1 en la punta de adelante del carril B (x-)
const LA = CIN.z0 - CIN.z1, LU = Math.PI * CIN.x, LT = 2 * LA + LU;
function enU(s) {
  const d = cl(s) * LT;
  if (d < LA) return { p: V(CIN.x, CIN.alto, CIN.z0 - d), ry: 0 };
  if (d < LA + LU) { const a = (d - LA) / CIN.x; return { p: V(Math.cos(a) * CIN.x, CIN.alto, CIN.z1 - Math.sin(a) * CIN.x), ry: a }; }
  return { p: V(-CIN.x, CIN.alto, CIN.z1 + (d - LA - LU)), ry: Math.PI };
}
const cajaG = hacerCaja(); scene.add(cajaG); // LA caja (gancho, cinta, bisagra, llega a Rubén)
const etiG = hacerEtiqueta("gratis"); scene.add(etiG);
const vuelven = [hacerCaja({ seda: false }), hacerCaja({ seda: false })]; vuelven.forEach((c) => scene.add(c));
const etiCompra = [hacerEtiqueta("compra"), hacerEtiqueta("compra")];
vuelven.forEach((c, i) => { c.userData.cuerpo.add(etiCompra[i]); etiCompra[i].position.set(0, CJ.H * 0.5, CJ.D / 2 + 0.006); etiCompra[i].scale.setScalar(1.0); });

// ================= ZONA E: dos celulares-tarima con las columnas =================
const pisoE = pisoSombra(OE.x, 0, 14, 14);
const TAR = { w: 0.8, l: 1.75, h: 0.08, sep: 0.5 };
function hacerTarima(n) {
  const g = new THREE.Group();
  g.add(mesh(rbox(TAR.w + 0.06, TAR.h, TAR.l + 0.06, 0.1), mat(C.edge, 0.4), 0, TAR.h / 2, 0));
  const tv = texViva(...PP);
  const pm = new THREE.MeshStandardMaterial({ map: tv.t, roughness: 0.4, emissive: 0xffffff, emissiveMap: tv.t, emissiveIntensity: 0.3 });
  const p = mesh(new THREE.PlaneGeometry(TAR.w, TAR.l), pm, 0, TAR.h + 0.002, 0); p.rotation.x = -Math.PI / 2; g.add(p);
  dibujarPagina(tv.x, "tienda" + n); tv.t.needsUpdate = true;
  sh(g); scene.add(g); return g;
}
const tarimas = [hacerTarima(1), hacerTarima(2)];
tarimas.forEach((g, i) => g.position.set(OE.x + (i ? 1 : -1) * TAR.sep, 0, 0));
const KC = 0.78; // escala de las cajas de las columnas
const NCOL = 9;
const COL_Z = -0.32;
const columnas = [0, 1].map(() => Array.from({ length: NCOL }, () => { const c = hacerCaja({ seda: false }); ponerCaja(c, [0, 0, 0, 0], 1); scene.add(c); return c; }));
const colY = (k) => TAR.h + k * CJ.H * KC * 1.035;
// la línea punteada "antes" (a la altura de la caja 6), adelante de cada columna
const punteadas = [0, 1].map((i) => {
  const g = new THREE.Group(); scene.add(g);
  for (let k = 0; k < 5; k++) g.add(mesh(rbox(0.1, 0.022, 0.022, 0.008, 1), mat(C.cr, 0.5, { emissive: C.cr, emissiveIntensity: 0.25 }), -0.32 + k * 0.16, 0, 0));
  g.position.set(OE.x + (i ? 1 : -1) * TAR.sep, colY(6) + 0.012, COL_Z + CJ.D * KC / 2 + 0.06);
  return g;
});
// la caja de adelante de cada tarima (abierta), con su etiqueta
const KF = 0.72;
const frenteE = [hacerCaja(), hacerCaja()]; frenteE.forEach((c, i) => { scene.add(c); c.position.set(OE.x + (i ? 1 : -1) * TAR.sep, TAR.h, 0.66); c.scale.setScalar(KF); });
const etiPagas = hacerEtiqueta("pagas"); scene.add(etiPagas);
const etiGratisE = hacerEtiqueta("gratis"); scene.add(etiGratisE);
// "4 años" en 3D (el 4 verde, "años" crema), con borde navy
const cuatro = new THREE.Group(); scene.add(cuatro);
{
  const bm = new THREE.MeshBasicMaterial({ color: C.navy, side: THREE.BackSide });
  const g4 = textoGeo("4", 0.42, 0.12, fontD), ga = textoGeo("años", 0.27, 0.09, fontD);
  g4.computeBoundingBox(); ga.computeBoundingBox();
  const w4 = g4.boundingBox.max.x - g4.boundingBox.min.x, wa = ga.boundingBox.max.x - ga.boundingBox.min.x, gap = 0.08, tot = w4 + gap + wa;
  const m4 = mesh(g4, mat(C.g, 0.38, { emissive: C.g, emissiveIntensity: 0.18 }), -tot / 2 + w4 / 2, 0, 0); cuatro.add(m4);
  const b4 = mesh(g4, bm, m4.position.x, 0, 0); b4.scale.set(1.04, 1.03, 1.2); cuatro.add(b4);
  const ma = mesh(ga, mat(C.cr, 0.5), tot / 2 - wa / 2, -0.07, 0); cuatro.add(ma);
  const ba = mesh(ga, bm, ma.position.x, -0.07, 0); ba.scale.set(1.04, 1.05, 1.2); cuatro.add(ba);
  cuatro.traverse((o) => { if (o.isMesh) o.castShadow = false; });
}
// las monedas (canto estriado)
const monedaCanto = tex(256, 32, (x, w, h) => { x.fillStyle = "#c9a24a"; x.fillRect(0, 0, w, h); x.fillStyle = "#9c7a2e"; for (let i = 0; i < 64; i++) x.fillRect(i * 4, 0, 2, h); });
monedaCanto.wrapS = THREE.RepeatWrapping; monedaCanto.repeat.set(3, 1);
const monedaCara = tex(256, 256, (x) => { x.fillStyle = "#d8b25a"; x.beginPath(); x.arc(128, 128, 128, 0, 7); x.fill(); x.lineWidth = 14; x.strokeStyle = "#a8853a"; x.beginPath(); x.arc(128, 128, 100, 0, 7); x.stroke(); x.fillStyle = "#a8853a"; x.font = F(900, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("$", 128, 136); });
const monedaGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.022, 36);
const monedaM = [new THREE.MeshStandardMaterial({ map: monedaCanto, roughness: 0.35, metalness: 0.7 }), new THREE.MeshStandardMaterial({ map: monedaCara, roughness: 0.35, metalness: 0.65 }), new THREE.MeshStandardMaterial({ map: monedaCara, roughness: 0.35, metalness: 0.65 })];
const monedas = Array.from({ length: 3 }, () => { const m = mesh(monedaGeo, monedaM); m.castShadow = true; scene.add(m); return m; });

// ================= ZONA Q: la caja sola y el "?" =================
const pisoQ = pisoSombra(OQ.x, 0, 8, 8);
const cajaQ = hacerCaja(); scene.add(cajaQ);
const etiQ = hacerEtiqueta("gratis"); cajaQ.userData.cuerpo.add(etiQ); etiQ.position.set(0, CJ.H * 0.5, CJ.D / 2 + 0.006); etiQ.scale.setScalar(1.0);
const preguntaM = mat(C.g, 0.38, { emissive: C.g, emissiveIntensity: 0.16 });
const preguntaGeo = textoGeo("?", 0.95, 0.3);
const preguntaBordeM = new THREE.MeshBasicMaterial({ color: C.navy, side: THREE.BackSide });
const pregunta = new THREE.Group(); scene.add(pregunta);
{ const a = mesh(preguntaGeo, preguntaM); a.castShadow = true; pregunta.add(a); const b = mesh(preguntaGeo, preguntaBordeM); b.scale.set(1.04, 1.03, 1.15); pregunta.add(b); }

// ================= ZONA V: el celular-vitrina, el champión, la mano, el medidor =================
const pisoV = pisoSombra(OV.x, 0, 10, 10);
const VIT = { w: 1.5, h: 2.4, d: 0.34, marco: 0.08 };
const vitrina = new THREE.Group(); scene.add(vitrina);
const vitTv = texViva(...PP);
{
  const cuerpo = mat(C.edge, 0.4);
  const { w: Wv, h: Hv, d: Dv, marco: m } = VIT;
  vitrina.add(mesh(rbox(Wv, m, Dv, 0.03), cuerpo, 0, m / 2, 0));
  vitrina.add(mesh(rbox(Wv, m, Dv, 0.03), cuerpo, 0, Hv - m / 2, 0));
  vitrina.add(mesh(rbox(m, Hv, Dv, 0.03), cuerpo, -Wv / 2 + m / 2, Hv / 2, 0));
  vitrina.add(mesh(rbox(m, Hv, Dv, 0.03), cuerpo, Wv / 2 - m / 2, Hv / 2, 0));
  vitrina.add(mesh(rbox(Wv, Hv, 0.05, 0.03), cuerpo, 0, Hv / 2, -Dv / 2 + 0.025));
  // la pantalla del fondo (la ficha de la tienda)
  const pm = new THREE.MeshStandardMaterial({ map: vitTv.t, roughness: 0.5, emissive: 0xffffff, emissiveMap: vitTv.t, emissiveIntensity: 0.3 });
  const p = mesh(new THREE.PlaneGeometry(Wv - 2 * m, Hv - 2 * m), pm, 0, Hv / 2, -Dv / 2 + 0.052); vitrina.add(p); p.receiveShadow = true;
  // muesca
  vitrina.add(mesh(rbox(0.3, 0.035, 0.02, 0.012), M.navy, 0, Hv - m - 0.04, -Dv / 2 + 0.06));
  sh(vitrina);
}
dibujarPagina(vitTv.x, "vitrina"); vitTv.t.needsUpdate = true;
// el vidrio de adelante (con dos reflejos en diagonal)
const vidrio = new THREE.Group(); vitrina.add(vidrio);
{
  const { w: Wv, h: Hv, d: Dv, marco: m } = VIT;
  vidrio.add(mesh(new THREE.PlaneGeometry(Wv - 2 * m, Hv - 2 * m), new THREE.MeshStandardMaterial({ color: 0xdfe8ff, roughness: 0.05, transparent: true, opacity: 0.06, depthWrite: false }), 0, 0, 0));
  // reflejos diagonales recortados al vidrio (no salen del marco)
  for (const [x, w] of []) { const r = mesh(new THREE.PlaneGeometry(w, (Hv - 2 * m) * 0.62), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, depthWrite: false }), x, 0.15, 0.002); r.rotation.z = -0.3; vidrio.add(r); }
  vidrio.userData.ops = vidrio.children.map((c) => c.material.opacity);
  vidrio.position.set(0, Hv / 2, Dv / 2 - 0.01);
}
const ondas = Array.from({ length: 2 }, () => { const o = mesh(new THREE.TorusGeometry(1, 0.06, 6, 40), new THREE.MeshBasicMaterial({ color: C.cr, transparent: true, opacity: 0.9, depthWrite: false })); vitrina.add(o); return o; });
const champV = hacerChampion(); vitrina.add(champV);
const KCV = 3.4;
// la mano (manga crema, índice que señala)
const mano = new THREE.Group(); scene.add(mano);
{
  const piel = mat(0xdba57f, 0.55);
  const palma = mesh(rbox(0.13, 0.06, 0.12, 0.028, 3), piel, 0, 0, 0); mano.add(palma);
  const indice = mesh(new THREE.CapsuleGeometry(0.019, 0.1, 6, 12), piel, 0.035, 0.005, 0.11); indice.rotation.x = Math.PI / 2; mano.add(indice);
  for (let i = 0; i < 3; i++) { const d = mesh(new THREE.CapsuleGeometry(0.018, 0.035, 6, 10), piel, -0.005 - i * 0.034, -0.012, 0.06); d.rotation.x = Math.PI / 2 + 0.9; mano.add(d); }
  const pulgar = mesh(new THREE.CapsuleGeometry(0.019, 0.05, 6, 10), piel, 0.07, 0.0, 0.03); pulgar.rotation.set(Math.PI / 2, 0, -0.7); mano.add(pulgar);
  const munieca = mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.12, 20), piel, 0, 0, -0.1); munieca.rotation.x = Math.PI / 2; mano.add(munieca);
  const manga = mesh(new THREE.CylinderGeometry(0.07, 0.085, 3.0, 24), mat(C.edge, 0.7), 0, 0, -1.64); manga.rotation.x = Math.PI / 2; mano.add(manga); // larga: el corte queda fuera de cuadro
  const puno = mesh(new THREE.TorusGeometry(0.072, 0.014, 8, 24), mat(C.cr2, 0.7), 0, 0, -0.14); mano.add(puno);
  sh(mano);
}
// el medidor de riesgo (semicírculo: verde, crema, rojo apagado) y la aguja
const medidor = new THREE.Group(); scene.add(medidor);
const aguja = new THREE.Group();
{
  const sector = (a0, a1, col) => {
    const s = new THREE.Shape(); s.absarc(0, 0, 0.5, a0, a1, false); s.absarc(0, 0, 0.3, a1, a0, true); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, curveSegments: 30 });
    medidor.add(mesh(g, mat(col, 0.5, col === C.g ? { emissive: C.g, emissiveIntensity: 0.12 } : {})));
  };
  // ángulos: π (izquierda, bajo) → 0 (derecha, alto)
  sector(Math.PI * 2 / 3 + 0.02, Math.PI, C.g);
  sector(Math.PI / 3 + 0.02, Math.PI * 2 / 3 - 0.02, C.cr);
  sector(0, Math.PI / 3 - 0.02, C.red);
  // contorno navy
  const s = new THREE.Shape(); s.absarc(0, 0, 0.535, 0, Math.PI, false); s.lineTo(-0.265, 0); s.absarc(0, 0, 0.265, Math.PI, 0, true); s.closePath();
  medidor.add(mesh(new THREE.ExtrudeGeometry(s, { depth: 0.04, bevelEnabled: false, curveSegments: 30 }), M.navy, 0, 0, -0.02));
  aguja.add(mesh(rbox(0.05, 0.46, 0.04, 0.02), M.navy, 0, 0.23, 0.08));
  aguja.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 24).rotateX(Math.PI / 2), M.navy, 0, 0, 0.08));
  aguja.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.07, 16).rotateX(Math.PI / 2), M.cr, 0, 0, 0.1));
  medidor.add(aguja);
  sh(medidor); medidor.traverse((o) => { if (o.isMesh) o.castShadow = false; });
}
const etiV = hacerEtiqueta("gratis"); scene.add(etiV);

// ================= ZONA P: las dos pilas =================
const pisoP = pisoSombra(OP.x, 0, 10, 10);
const KP = 1.0;
const PILA = { x: 0.36 };
const pilaI = Array.from({ length: 3 }, () => { const c = hacerCaja({ seda: false }); ponerCaja(c, [0, 0, 0, 0], 1); const e = hacerEtiqueta("vuelta"); c.userData.cuerpo.add(e); e.position.set(0, CJ.H * 0.5, CJ.D / 2 + 0.006); e.scale.setScalar(1.1); scene.add(c); return c; });
const pilaD = Array.from({ length: 6 }, (_, k) => { const c = hacerCaja({ seda: k === 2 }); ponerCaja(c, [0, 0, 0, 0], 1); const tk = hacerTilde(0.07, c.userData.cuerpo); tk.position.set(0, CJ.H * 0.5, CJ.D / 2 + 0.012); scene.add(c); return c; });
const champP = hacerChampion(); scene.add(champP);
const pilaY = (k) => k * CJ.H * KP * 1.04;

// ================= ZONA R: el almacén de Rubén de noche =================
const MOST = { x: OR.x + 1.05, y: 0.95, z: -0.05, d: 0.7, w: 1.5 };
const almacen = new THREE.Group(); scene.add(almacen);
const ZP = -1.5;
{
  const pis = tex(512, 512, (x, w, h) => { x.fillStyle = "#b9b7a9"; x.fillRect(0, 0, w, h); x.fillStyle = "#c9c7b9"; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rr(x, i * 256 + 5, j * 256 + 5, 246, 246, 8); });
  pis.wrapS = pis.wrapT = THREE.RepeatWrapping; pis.repeat.set(12 / 0.6, 8 / 0.6);
  const piso = mesh(new THREE.PlaneGeometry(12, 8), new THREE.MeshStandardMaterial({ map: pis, roughness: 0.85 }), OR.x, 0, 2.5); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; almacen.add(piso);
  // pared: crema arriba, azulejos navy claro abajo
  almacen.add(mesh(new THREE.PlaneGeometry(12, 4.2), mat(0xe6e4d8, 0.9), OR.x, 2.1, ZP));
  const az = tex(512, 512, (x, w, h) => { x.fillStyle = CRE; x.fillRect(0, 0, w, h); x.fillStyle = "#2c4268"; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rr(x, i * 256 + 9, j * 256 + 9, 238, 238, 12); });
  az.wrapS = az.wrapT = THREE.RepeatWrapping; az.repeat.set(12 / 0.32, 1.1 / 0.32);
  const zoc = mesh(new THREE.PlaneGeometry(12, 1.1), new THREE.MeshStandardMaterial({ map: az, roughness: 0.5 }), OR.x, 0.55, ZP + 0.005); zoc.receiveShadow = true; almacen.add(zoc);
  almacen.add(mesh(new THREE.BoxGeometry(12, 0.06, 0.04), M.navy, OR.x, 1.11, ZP + 0.02));
  // estantería verde con productos (a la derecha, detrás del mostrador)
  const verde = mat(0x4fb81a, 0.55);
  const EX0 = OR.x + 0.15, EX1 = OR.x + 2.3, EZ = ZP + 0.22;
  for (const x of [EX0, EX1, (EX0 + EX1) / 2]) almacen.add(mesh(rbox(0.07, 2.0, 0.4, 0.015), verde, x, 1.0 + 0.3, EZ));
  for (const y of [1.3, 1.8, 2.3]) almacen.add(mesh(rbox(EX1 - EX0 + 0.1, 0.05, 0.42, 0.015), verde, (EX0 + EX1) / 2, y, EZ));
  almacen.add(mesh(new THREE.BoxGeometry(EX1 - EX0, 1.6, 0.02), mat(0xd8d6c8, 0.9), (EX0 + EX1) / 2, 1.85, ZP + 0.02));
  const az2 = azarDe(11);
  const fab = [crearYerba, crearFideos, crearGalletitas, crearDulceDeLeche];
  const colores = [C.g, C.cr, C.red, 0xd9a441, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  for (const y of [1.325, 1.825, 2.325]) {
    for (let x = EX0 + 0.12; x < EX1 - 0.12;) {
      const k = az2(); let o, ancho;
      if (k < 0.5) { o = fab[Math.floor(az2() * fab.length)](); o.scale.setScalar(1.15); ancho = (o.userData.tam?.[0] ?? 0.16) * 1.15; }
      else { const c = colores[Math.floor(az2() * colores.length)]; o = new THREE.Group(); o.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 14), mat(c, 0.35), 0, 0.1, 0)); o.add(mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.035, 14), M.cr, 0, 0.215, 0)); ancho = 0.13; }
      if (Math.abs(x + ancho / 2 - (EX0 + EX1) / 2) < 0.06 || x + ancho > EX1 - 0.08) { x += 0.08; continue; }
      o.position.set(x + ancho / 2, y, EZ + 0.02); o.rotation.y = (az2() - 0.5) * 0.25; almacen.add(o);
      x += ancho + 0.03 + az2() * 0.04;
    }
  }
  // la vidriera con la persiana a media altura (afuera, la noche)
  const VX = OR.x - 1.15;
  almacen.add(mesh(rbox(1.5, 2.0, 0.08, 0.02), M.navy3, VX, 1.45, ZP + 0.03));
  almacen.add(mesh(new THREE.PlaneGeometry(1.36, 1.86), mat(0x0b1220, 0.3), VX, 1.45, ZP + 0.075));
  // dos luces de la calle, chiquitas, cálidas
  for (const [x, y] of [[-0.35, 0.9], [0.4, 0.75]]) almacen.add(mesh(new THREE.CircleGeometry(0.035, 16), new THREE.MeshBasicMaterial({ color: 0xe9a65a }), VX + x, y + 0.55, ZP + 0.08));
  const pers = tex(256, 512, (x, w, h) => { x.fillStyle = "#8f9bb0"; x.fillRect(0, 0, w, h); for (let i = 0; i < 16; i++) { x.fillStyle = "#6c7891"; x.fillRect(0, i * 32 + 24, w, 8); x.fillStyle = "#b3bccb"; x.fillRect(0, i * 32 + 2, w, 5); } });
  const pp = mesh(new THREE.PlaneGeometry(1.36, 1.05), new THREE.MeshStandardMaterial({ map: pers, roughness: 0.5, metalness: 0.3 }), VX, 1.45 + 0.93 - 0.525, ZP + 0.085); almacen.add(pp);
  almacen.add(mesh(rbox(1.42, 0.06, 0.06, 0.02), M.navy, VX, 1.45 + 0.93 - 1.05, ZP + 0.1));
  // mostrador: tablas de madera, tapa clara con vetas, guarda verde
  const vetas = tex(1024, 256, (x, w, h) => {
    x.fillStyle = "#d9b88d"; x.fillRect(0, 0, w, h); const az = azarDe(3);
    for (let i = 0; i < 46; i++) { const y = az() * h; x.strokeStyle = az() < 0.5 ? "rgba(150,105,60,0.35)" : "rgba(255,240,215,0.35)"; x.lineWidth = 2 + az() * 5; x.beginPath(); x.moveTo(0, y); for (let k = 1; k <= 8; k++) x.lineTo((k * w) / 8, y + Math.sin(k * 1.3 + i) * 7); x.stroke(); }
  });
  const tapaM = new THREE.MeshStandardMaterial({ map: vetas, roughness: 0.5 });
  const tablas = tex(1024, 512, (x, w, h) => { x.fillStyle = "#a8774a"; x.fillRect(0, 0, w, h); for (let i = 0; i < 12; i++) { x.fillStyle = i % 2 ? "#b4824f" : "#a06f44"; x.fillRect((i * w) / 12 + 3, 0, w / 12 - 6, h); x.fillStyle = "rgba(70,45,25,0.6)"; x.fillRect((i * w) / 12, 0, 4, h); } });
  const frenteM = new THREE.MeshStandardMaterial({ map: tablas, roughness: 0.7 });
  almacen.add(mesh(rbox(MOST.w, MOST.y - 0.04, MOST.d - 0.08, 0.03), frenteM, MOST.x, (MOST.y - 0.04) / 2, MOST.z));
  almacen.add(mesh(rbox(MOST.w + 0.12, 0.06, MOST.d, 0.02), [M.madera, M.madera, tapaM, M.madera, M.madera, M.madera], MOST.x, MOST.y - 0.03, MOST.z));
  sh(almacen);
}
const lamp = crearLamparita(0.7); scene.add(lamp); lamp.position.set(MOST.x - 0.25, 2.05, MOST.z + 0.05);
const termo = crearTermo(); scene.add(termo); termo.scale.setScalar(1.25); termo.position.set(MOST.x - 0.5, MOST.y, MOST.z - 0.15);
const banquito = crearBanquito(0.55); scene.add(banquito);
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 3.3 }); scene.add(ruben.raiz);
ruben.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
// ronda 2: el bolsillo verde del delantal quedaba flotando delante del regazo (sentado): se oculta
ruben.cuerpo.traverse((o) => { if (!o.isMesh || !o.geometry) return; o.geometry.computeBoundingBox(); const b = o.geometry.boundingBox, sx = b.max.x - b.min.x, sy = b.max.y - b.min.y, sz = b.max.z - b.min.z; if (o.material?.color?.getHex() === 0x5ce611 && ((Math.abs(sx - 0.12) < 0.004 && Math.abs(sy - 0.07) < 0.004) || o.geometry.type === "TorusGeometry")) o.visible = false; }); // (y el ribete verde del borde del delantal, que sentado quedaba como una barra suelta)
const RB = { x: OR.x + 0.0, z: 0.15, y: 0.058 };
banquito.position.set(RB.x, 0, RB.z + 0.0);
// el calzado de Rubén: los championes viejos (el derecho con la suela despegada) y los nuevos
const zapatosR = ruben.pies.map((p) => p.children.slice());
const KZ = 0.88;
const viejosR = ruben.pies.map((p) => { const c = hacerChampion({ viejo: true }); c.scale.setScalar(KZ); c.position.set(0, 0, 0.035); p.add(c); return c; });
const nuevosR = ruben.pies.map((p) => { const c = hacerChampion(); c.scale.setScalar(KZ); c.position.set(0, 0, 0.035); p.add(c); return c; });
zapatosR.forEach((zs) => zs.forEach((z) => (z.visible = false)));
const viejoPiso = hacerChampion({ viejo: true }); scene.add(viejoPiso); viejoPiso.scale.setScalar(KZ);
const mateM = crearMate(); scene.add(mateM); mateM.scale.setScalar(1.15);
// el celular de Rubén
const celuR = hacerCelu(0.08, 0.162, "ficha"); scene.add(celuR);
const champMini = hacerChampion(); celuR.add(champMini);
const selloR = hacerSello(); celuR.add(selloR);
// el toque en la pantalla: una onda sobre el botón (sin dedo: el pulgar se veía como una salchicha)
const toqueR = mesh(new THREE.TorusGeometry(1, 0.12, 8, 40), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false })); celuR.add(toqueR);
const pulgar = new THREE.Group(); celuR.add(pulgar);
{
  const piel = mat(0xdba57f, 0.55);
  const p = mesh(new THREE.CapsuleGeometry(0.0075, 0.03, 6, 12), piel, 0, 0, 0); pulgar.add(p);
  const u = mesh(new THREE.SphereGeometry(0.0052, 12, 8), mat(0xf0c8a8, 0.4), 0, 0.016, 0.004); u.scale.set(1, 1.2, 0.4); pulgar.add(u);
  sh(pulgar);
}
// la nube de pensamiento (de por-que-el-recordatorio) con el pie que no entra
const nubeM = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.55, clearcoat: 0.3, emissive: 0xefeee5, emissiveIntensity: 0.12 });
const nubeBordeM = new THREE.MeshBasicMaterial({ color: 0x0b1220, side: THREE.BackSide });
const ESF = [[-0.36, -0.04, 0.27], [-0.14, 0.14, 0.31], [0.16, 0.16, 0.3], [0.4, 0.0, 0.25], [0.18, -0.15, 0.26], [-0.14, -0.15, 0.25], [0.0, 0.0, 0.32]];
const esfGeo = new THREE.SphereGeometry(1, 36, 24);
const nube = new THREE.Group(); scene.add(nube);
const nubeItems = new THREE.Group(); nubeItems.position.z = 0.22; nube.add(nubeItems);
{
  for (const [x, y, r] of ESF) {
    const b = mesh(esfGeo, nubeM, x, y, 0); b.scale.set(r, r, r * 0.55); nube.add(b);
    const o = mesh(esfGeo, nubeBordeM, x, y, -0.01); o.scale.set(r + 0.03, r + 0.03, r * 0.55 + 0.02); nube.add(o);
  }
  for (const [x, y, r] of []) { // final: sin estela (las burbujitas quedaban sobre la cara de Rubén)
    const b = mesh(esfGeo, nubeM, x, y, 0); b.scale.set(r, r, r * 0.8); nube.add(b);
    const o = mesh(esfGeo, nubeBordeM, x, y, -0.01); o.scale.set(r + 0.022, r + 0.022, r * 0.8 + 0.012); nube.add(o);
  }
}
const champNube = hacerChampion(); nubeItems.add(champNube);
const pieNube = new THREE.Group(); // final: sin pie (se leía como caño); en la nube, el champión y un "?" verde
const preguntaNube = new THREE.Group(); nubeItems.add(preguntaNube);
{ const a = mesh(textoGeo("?", 0.95, 0.3), mat(C.g, 0.38, { emissive: C.g, emissiveIntensity: 0.16 })); preguntaNube.add(a); const b = mesh(a.geometry, new THREE.MeshBasicMaterial({ color: C.navy, side: THREE.BackSide })); b.scale.set(1.04, 1.03, 1.15); preguntaNube.add(b); }
{
  // pie con media crema (puño verde) y la botamanga del pantalón: se lee como pie
  const media = mat(0x8fa3c7, 0.8); // ronda 3: navy claro (se separa del champión navy)
  const planta = mesh(esfGeo, media, 0, 0.045, 0.035); planta.scale.set(0.052, 0.045, 0.115); pieNube.add(planta);
  const talon = mesh(esfGeo, media, 0, 0.055, -0.06); talon.scale.set(0.05, 0.055, 0.05); pieNube.add(talon);
  for (let i = 0; i < 4; i++) { const d = mesh(esfGeo, media, -0.03 + i * 0.02, 0.05, 0.135 - Math.abs(i - 1.5) * 0.008); d.scale.setScalar(0.016); pieNube.add(d); }
  pieNube.add(mesh(new THREE.CylinderGeometry(0.044, 0.05, 0.07, 20), media, 0, 0.115, -0.055));
  const puno = mesh(new THREE.TorusGeometry(0.045, 0.012, 8, 24), M.g, 0, 0.15, -0.055); puno.rotation.x = Math.PI / 2; pieNube.add(puno);
  sh(pieNube);
}
// la caja que le llega (LA misma: cajaG) y los championes nuevos adentro, con la etiqueta sin usar
const champCaja = [hacerChampion(), hacerChampion()]; champCaja.forEach((c) => scene.add(c));

// ================= ZONA F: "Tu tienda" y el cierre =================
const pisoF = pisoSombra(OF.x, 0, 8, 8, 0.35);
const celuF = hacerCelu(0.08, 0.162, "tu"); scene.add(celuF);
const selloF = hacerSello(); celuF.add(selloF);
const campera = new THREE.Group(); celuF.add(campera);
{
  const cm = mat(C.cr, 0.75), cs = mat(C.cr2, 0.75);
  campera.add(mesh(rbox(0.34, 0.07, 0.26, 0.03, 3), cm, 0, 0.035, 0));
  campera.add(mesh(rbox(0.34, 0.012, 0.03, 0.005, 1), cs, 0, 0.072, 0.07));
  const cue = mesh(new THREE.TorusGeometry(0.075, 0.025, 10, 28, Math.PI), mat(C.navy3, 0.7), 0, 0.075, -0.08); cue.rotation.x = -Math.PI / 2; campera.add(cue);
  campera.add(mesh(rbox(0.012, 0.012, 0.2, 0.004, 1), M.navy, 0, 0.074, 0.02));
  for (const s of [-1, 1]) { const m = mesh(rbox(0.07, 0.03, 0.24, 0.012, 2), cs, s * 0.11, 0.08, 0.0); m.rotation.y = s * 0.12; campera.add(m); }
  sh(campera);
}
const cajaF = hacerCaja({ cinta: "navy", seda: false }); scene.add(cajaF); ponerCaja(cajaF, [0, 0, 0, 0], 1);
const tildeF = hacerTilde(0.11);

// ================= TIEMPOS CLAVE =================
const T = {
  devolver: W[6], gratisG: W[7],
  s02: S["s02-vuelve"], devuelve: W[11], vuelve: W[13], comprar: W[15],
  s03: S["s03-estudio"], estudio: W[17], siguio: W[18], dos: W[22], online: W[24],
  s04: S["s04-pagaron"], pagaron: W[27], compraron: W[30], mucho: W[31], menos: W[32],
  s05: S["s05-gratis"], mas: W[36], antes: W[38],
  s06: S["s06-por-que"], que: W[40],
  s07: S["s07-riesgo"], probar: W[43], riesgo: W[46], devolver2: W[47], achica: W[50],
  s08: S["s08-giro"], masQ: W[52], algo: W[53], compran: W[55],
  s09: S["s09-ruben"], dudaba: W[59], championes: W[60], ysi: W[62], quedan: W[66],
  s10: S["s10-cambio"], precio: W[72], devolucion: W[73], gratis10: W[74],
  s11: S["s11-quedaron"], quedaron: W[77],
  s12: S["s12-tu-tienda"], tienda12: W[82], agenda: W[83],
  fin: S["s13-llamada"],
};
T.q0 = T.s06 - 0.07;        // corte a la caja sola
T.v0 = T.s07 + 0.45;        // corte a la vitrina (el "?" queda 1,2 s en pantalla)
T.toque = T.probar + 0.05;  // la mano choca contra el vidrio
T.sella = T.devolver2 + 0.25;
T.pies = T.championes - 0.1; // contraplano al champión viejo (antes que el subtítulo)
T.nubeR = T.ysi - 0.08;     // vuelve el plano medio con la nube
T.compra = T.devolucion + 0.45; // toque en "Comprar" (onda en el botón)
T.pago = T.compra + 0.17;    // pantalla de pago
T.paga = T.pago + 0.2;       // toque en "Pagar" → "Pagado"
T.llega = T.s11 - 0.5;      // en la pausa: suena el timbre y cae la caja
T.abre = T.llega + 0.3;
T.piesN = T.quedaron - 0.03; // Rubén levanta el pie con los nuevos
T.talon = T.quedaron + 0.5;  // el viejo del piso cierra la boca (después de "quedaron")

// ================= CÁMARA =================
// PLANOS: [nombre, desde, [[t, px, py, pz, mx, my, mz, fov], ...]]; dentro de un plano, Hermite monótona; entre planos, corte.
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const o = (O) => (x, y, z) => [O.x + x, y, z];
const c = o(OC), e = o(OE), q = o(OQ), v = o(OV), pp = o(OP), r = o(OR), f = o(OF);
const CJ0 = enU(0.17).p; // dónde está la caja del gancho
let PLANOS = null;
// dónde está el champión viejo del piso y desde qué lado se lo mira (de costado, con el mostrador de fondo)
const VP = V(OR.x - 0.42, 0, RB.z + 0.55), VROT = 0.5, VD = V(-Math.cos(VROT), 0, Math.sin(VROT));
function armarPlanos() {
  // celular de Rubén en s10 (posición fija mientras lo mira) → cámara relativa a la pantalla
  const P = celuR.position.clone(), Nrm = V(0, 0, 1).applyQuaternion(celuR.quaternion), Up = V(0, 1, 0).applyQuaternion(celuR.quaternion);
  const desdeCelu = (dist, dy = 0) => { const p = P.clone().addScaledVector(Nrm, dist).addScaledVector(Up, dy); return [p.x, p.y, p.z]; };
  const miraCelu = (dy = 0) => { const p = P.clone().addScaledVector(Up, dy); return [p.x, p.y, p.z]; };
  const PF = celuF.userData.base;
  const pz = ruben.pies.map((p) => p.getWorldPosition(new THREE.Vector3()));
  const PIES = pz[0].clone().add(pz[1]).multiplyScalar(0.5); CEL_R.pies = PIES;
  const pie = (dx, dy, dz) => [PIES.x + dx, PIES.y + dy, PIES.z + dz];
  return [
    // s01: picado de 3/4 de la caja abierta; push-in lento
    ["C1", 0, [
      k(0, [CJ0.x + 0.38, CJ0.y + 1.55, CJ0.z + 1.85], [CJ0.x, CJ0.y + 0.36, CJ0.z]),
      k(T.s02, [CJ0.x + 0.32, CJ0.y + 1.43, CJ0.z + 1.65], [CJ0.x, CJ0.y + 0.36, CJ0.z]),
    ]],
    // s02: grúa atrás y arriba siguiendo la caja por la U; vuelven dos
    ["C2", T.s02, (() => {
      // sigue a la caja por la U (misma fórmula que zonaC) y termina en las dos que vuelven, grandes
      const K = [k(T.s02, [CJ0.x + 0.32, CJ0.y + 1.43, CJ0.z + 1.65], [CJ0.x, CJ0.y + 0.36, CJ0.z])];
      for (const tt of [T.s02 + 0.45, T.s02 + 0.85]) { const pb = enU(0.17 + 0.38 * eio(sg(tt, T.s02 + 0.2, T.vuelve))).p; K.push(k(tt, [pb.x + 0.35, pb.y + 1.45, pb.z + 1.75], [pb.x, pb.y + 0.3, pb.z])); }
      K.push(k(T.vuelve + 0.05, [-0.05, 2.0, 1.2], [-0.3, 0.2, -1.6]));
      K.push(k(T.vuelve + 0.6, [-0.22, 1.75, 2.35], [-0.5, 0.25, -0.35]));
      K.push(k(T.s03, [-0.24, 1.7, 2.3], [-0.52, 0.25, -0.25]));
      return K;
    })()],
    // s03: los dos celulares-tarima con sus columnas; grúa que retrocede
    ["E", T.s03, [
      k(T.s03, e(0, 2.25, 5.5), e(0, 0.78, -0.15)),
      k(T.s03 + 1.0, e(0, 2.55, 5.8), e(0, 0.95, -0.2)),
      k(T.s04, e(0, 2.6, 5.9), e(0, 0.95, -0.2)),
    ]],
    // s04: push-in a la tienda 1 (izquierda)
    ["E", T.s04, [
      k(T.s04, e(0, 2.6, 5.9), e(0, 0.95, -0.2)),
      k(T.s04 + 0.5, e(-0.5, 2.15, 4.1), e(-0.5, 0.8, 0.0)),
      k(T.menos - 0.1, e(-0.5, 2.1, 4.0), e(-0.5, 0.8, 0.0)),
      k(T.s05, e(-0.5, 2.1, 4.05), e(-0.5, 0.78, 0.0)),
    ]],
    // s05: travelling a la tienda 2; la columna crece y la cámara sube; al final abre a las dos
    ["E", T.s05, [
      k(T.s05, e(0.5, 2.1, 4.1), e(0.5, 0.8, 0.0)),
      k(T.s05 + 0.4, e(0.5, 2.1, 4.05), e(0.5, 0.82, 0.0)),
      k(T.mas + 0.5, e(0.5, 2.45, 4.1), e(0.5, 1.2, -0.15)),
      k(T.q0, e(0.1, 2.8, 6.0), e(0.05, 1.05, -0.2)),
    ]],
    // s06: la caja sola; push-in y órbita corta; el "?" sale
    ["Q", T.q0, [
      k(T.q0, q(0.45, 0.95, 2.3), q(0, 0.24, 0)),
      k(T.que + 0.25, q(0.3, 1.15, 3.2), q(0, 0.6, 0)),
      k(T.v0, q(0.12, 1.2, 3.4), q(0, 0.64, 0)),
    ]],
    // s07: el celular-vitrina de frente; push-in leve
    ["V", T.v0, [
      k(T.v0, v(0.12, 1.5, 6.25), v(0.0, 1.44, 0)),
      k(T.riesgo, v(0.05, 1.5, 6.1), v(0.0, 1.44, 0)),
      k(T.s08, v(0.0, 1.48, 5.95), v(0.0, 1.42, 0)),
    ]],
    // s08: el champión cae en la caja de arriba de la pila derecha; la cámara abre a las dos pilas
    ["P", T.s08, [
      k(T.s08, pp(PILA.x + 0.05, 1.45, 2.6), pp(PILA.x, pilaY(2) + 0.36, 0)),
      k(T.s08 + 0.45, pp(PILA.x, 1.5, 2.7), pp(PILA.x, pilaY(2) + 0.36, 0)),
      k(T.algo, pp(0.03, 1.5, 4.55), pp(0.0, 0.7, 0)),
      k(T.s09, pp(0.0, 1.45, 4.25), pp(0.0, 0.72, 0)),
    ]],
    // s09: el almacén de noche, Rubén en el banquito mirando el celular (plano medio)
    ["R", T.s09, [
      k(T.s09, r(0.5, 1.56, 3.2), r(0.12, 1.24, RB.z)),
      k(T.pies, r(0.45, 1.54, 2.95), r(0.12, 1.24, RB.z)),
    ]],
    // contraplano: los pies con los championes viejos (de costado: se ve la suela despegada)
    // primer plano limpio del champión viejo en el piso del almacén: la suela despegada aletea como una boca
    ["RV", T.pies, [
      k(T.pies, [VP.x + VD.x * 1.32 - 0.008, 0.47, VP.z + VD.z * 1.32 - 0.015], [VP.x - 0.008, 0.17, VP.z - 0.015]),
      k(T.nubeR, [VP.x + VD.x * 1.18 - 0.008, 0.44, VP.z + VD.z * 1.18 - 0.015], [VP.x - 0.008, 0.17, VP.z - 0.015]),
    ]],
    // otra vez el plano medio, más abierto para la nube
    ["R", T.nubeR, [
      k(T.nubeR, r(0.62, 1.66, 4.45), r(0.3, 1.36, RB.z)),
      k(T.s10, r(0.6, 1.64, 4.3), r(0.3, 1.36, RB.z)),
    ]],
    // s10: el celular (inserto desde los ojos de Rubén) y push-in
    ["RC", T.s10, [
      k(T.s10, desdeCelu(0.385, 0.027), miraCelu(0.027)),
      k(T.precio, desdeCelu(0.378, 0.027), miraCelu(0.027)),
      k(T.llega, desdeCelu(0.374, 0.027), miraCelu(0.027)),
    ]],
    // s11: la caja cae en el mostrador y se abre (picado)
    ["RM", T.llega, [
      k(T.llega, [MOST.x + 0.22, MOST.y + 1.02, MOST.z + 2.05], [MOST.x - 0.02, MOST.y + 0.27, MOST.z]),
      k(T.piesN, [MOST.x + 0.2, MOST.y + 0.98, MOST.z + 1.92], [MOST.x - 0.02, MOST.y + 0.26, MOST.z]),
    ]],
    // los pies con los nuevos y el viejo en el piso
    ["RP", T.piesN, [
      k(T.piesN, r(-1.5, 1.44, RB.z + 3.75), r(-0.15, 1.1, RB.z + 0.3)),
      k(T.s12, r(-1.42, 1.42, RB.z + 3.6), r(-0.15, 1.1, RB.z + 0.3)),
    ]],
    // s12: "Tu tienda": el celular gira hacia cámara; push-in
    ["F1", T.s12, [
      k(T.s12, [PF.x, PF.y + 0.027, PF.z + 0.385], [PF.x, PF.y + 0.027, PF.z]),
      k(T.fin, [PF.x, PF.y + 0.027, PF.z + 0.372], [PF.x, PF.y + 0.027, PF.z]),
    ]],
    // s13: cierre verde, la caja chica con el tilde abajo
    ["F2", T.fin, [
      k(T.fin, f(0.0, 1.05, 3.1), f(0.0, 0.62, 0)),
      k(DUR, f(0.0, 1.0, 2.9), f(0.0, 0.62, 0)),
    ]],
  ];
}
const _mira = new THREE.Vector3();
let plano = "C1";
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return pi; }
function ponerCamara(t) {
  const pi = planoEn(t);
  plano = PLANOS[pi][0];
  const K = PLANOS[pi][2];
  let i = 0; while (i + 1 < K.length - 1 && K[i + 1][0] <= t) i++;
  const a = K[i], b = K[Math.min(i + 1, K.length - 1)];
  const hh = b[0] - a[0];
  const u = hh > 0 ? cl((t - a[0]) / hh) : 0;
  const tang = (j, cc) => {
    if (j <= 0 || j >= K.length - 1) return 0;
    const p = K[j - 1], qq = K[j], rr2 = K[j + 1];
    if (qq[0] - p[0] < 0.05 || rr2[0] - qq[0] < 0.05) return 0;
    const d1 = (qq[cc] - p[cc]) / Math.max(1e-4, qq[0] - p[0]), d2 = (rr2[cc] - qq[cc]) / Math.max(1e-4, rr2[0] - qq[0]);
    if (d1 * d2 <= 0) return 0;
    const m = (rr2[cc] - p[cc]) / Math.max(1e-4, rr2[0] - p[0]);
    return Math.sign(m) * Math.min(Math.abs(m), 3 * Math.abs(d1), 3 * Math.abs(d2));
  };
  const s2 = u * u, s3 = s2 * u;
  const vv = [];
  for (let cc = 1; cc <= 7; cc++) {
    if (hh <= 0) { vv.push(a[cc]); continue; }
    vv.push((2 * s3 - 3 * s2 + 1) * a[cc] + (s3 - 2 * s2 + u) * hh * tang(i, cc) + (-2 * s3 + 3 * s2) * b[cc] + (s3 - s2) * hh * tang(i + 1, cc));
  }
  camera.position.set(vv[0], vv[1], vv[2]);
  const amp = plano === "RC" || plano === "F1" ? 0.0004 : 0.003;
  camera.position.x += Math.sin(t * 0.7) * amp; camera.position.y += Math.sin(t * 0.53) * amp;
  _mira.set(vv[3], vv[4], vv[5]);
  camera.fov = vv[6];
  const dd = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.01, dd * 0.03); camera.far = 260;
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  camera.updateMatrixWorld(true);
}
// un punto delante de la cámara: a dist, corrido dx/dy (en unidades de media pantalla: -1..1)
function delante(dist, dx = 0, dy = 0) {
  const fw = new THREE.Vector3(); camera.getWorldDirection(fw);
  const der = new THREE.Vector3().crossVectors(fw, camera.up).normalize();
  const arr = new THREE.Vector3().crossVectors(der, fw).normalize();
  const th = Math.tan((camera.fov * Math.PI) / 360) * dist;
  return camera.position.clone().add(fw.multiplyScalar(dist)).add(der.multiplyScalar(dx * th * camera.aspect)).add(arr.multiplyScalar(dy * th));
}

// ================= ZONA C en el tiempo =================
const _v = new THREE.Vector3(), _q = new THREE.Quaternion();
function zonaC(t) {
  const en = plano === "C1" || plano === "C2";
  cinta.visible = pisoC.visible = en;
  for (const cc of vuelven) cc.visible = false;
  if (!en) return;
  // la caja: abierta con la etiqueta apoyada; en "gratis" la etiqueta entra, las solapas se cierran en cadena y se pega la cinta
  const tCierra = T.gratisG + 0.42; // después de "gratis?" (la voz queda limpia)
  const ab = cierreEn(t, tCierra, 0.38);
  const ci = eio(sg(t, tCierra + 0.38, tCierra + 0.52));
  ponerCaja(cajaG, ab, ci);
  // recorrido por la U: arranca en "Porque" y llega a la curva en "vuelve"
  const sU = 0.17 + 0.38 * eio(sg(t, T.s02 + 0.2, T.vuelve));
  const { p, ry } = enU(t < T.s02 ? 0.17 : sU);
  cajaG.visible = t < T.vuelve + 0.02;
  cajaG.position.copy(p); cajaG.rotation.set(0, ry, 0);
  cajaG.scale.setScalar(1 + 0.04 * pulso(t, T.devolver, 0.3));
  // la etiqueta: apoyada inclinada sobre la caja, hacia cámara; pop en "devolver"; entra en la caja en "gratis"
  etiG.visible = t < tCierra + 0.12;
  if (etiG.visible) {
    ponerEtiqueta(etiG, "gratis", t < T.devolver ? 0.0 : sg(t, T.devolver, T.devolver + 0.35));
    const entra = eio(sg(t, T.gratisG + 0.2, tCierra + 0.08));
    etiG.position.copy(p).add(V(0.0, CJ.H + 0.09 - entra * 0.2, 0.06 - entra * 0.06));
    etiG.rotation.set(-0.55 + entra * 0.3, 0.0, 0.04);
    etiG.scale.setScalar(1.55 * (1 + 0.1 * pulso(t, T.devolver, 0.3)) * (1 - 0.3 * entra));
  }
  // vuelven DOS cajas (una más grande) por el otro carril, hacia cámara
  for (let j = 0; j < 2; j++) {
    const t0 = T.vuelve + j * 0.2;
    const cc = vuelven[j];
    cc.visible = t > t0;
    if (!cc.visible) continue;
    ponerCaja(cc, [0, 0, 0, 0], 1);
    const s = 0.5 + 0.05 + (0.36 - j * 0.14) * eo(sg(t, t0, T.s03 - 0.1));
    const { p: pv, ry: r2 } = enU(s);
    cc.position.copy(pv); cc.rotation.set(0, r2 + Math.PI, 0);
    cc.scale.setScalar(popIn(t, t0, 0.3) * (j === 0 ? 1.15 : 0.95));
  }
}

// ================= ZONA E en el tiempo =================
function zonaE(t) {
  const en = plano === "E";
  for (const g of tarimas) g.visible = en;
  pisoE.visible = en; cuatro.visible = false; etiPagas.visible = etiGratisE.visible = false;
  columnas.forEach((col) => col.forEach((cc) => (cc.visible = false)));
  punteadas.forEach((g) => (g.visible = false)); frenteE.forEach((cc) => (cc.visible = false)); monedas.forEach((m) => (m.visible = false));
  if (!en) return;
  // columnas: 6 cajas que caen de a una en s03; la 1 se desarma en "menos"; la 2 crece a 9 en "más"
  columnas.forEach((col, i) => {
    col.forEach((cc, kk) => {
      const t0 = T.s03 - 2; // ronda 2: las columnas ya están armadas en el corte (nada cae cortado por el borde)
      let vis = kk < 6 ? t > t0 : false;
      let s = 1, y = colY(kk), gris = false;
      if (kk < 6) { const u = caida(t, t0, 0.16); y = lerp(colY(kk) + 0.55, colY(kk), u); }
      if (i === 0 && kk >= 1) {
        // se desarma de arriba hacia abajo: gris y se achica
        const td = T.mucho + (5 - kk) * 0.12;
        const u = sg(t, td, td + 0.22);
        gris = t > td - 0.08; s = 1 - eio(u); if (u >= 1) vis = false;
      }
      if (i === 1 && kk >= 6) { const t1 = T.mas + (kk - 6) * 0.14; vis = t > t1; y = colY(kk); s = popIn(t, t1, 0.26); }
      cc.visible = vis && s > 0.01;
      if (!cc.visible) return;
      const mk = gris ? MK_GRIS : MK;
      const mats = cc.userData.mk;
      if (mats !== mk) { cc.userData.mk = mk; cc.userData.cuerpo.traverse((m) => { if (m.isMesh && Array.isArray(m.material)) m.material = m.material.map((x) => (x === MK.ext || x === MK_GRIS.ext ? mk.ext : x === MK.int || x === MK_GRIS.int ? mk.int : x === MK.canto || x === MK_GRIS.canto ? mk.canto : x)); }); }
      cc.position.set(OE.x + (i ? 1 : -1) * TAR.sep, y, COL_Z);
      cc.rotation.set(0, Math.sin(kk * 2.3 + i) * 0.06, 0);
      cc.scale.setScalar(KC * s * (i === 1 && kk >= 6 ? 1 + 0.06 * pulso(t, T.antes, 0.3) : 1));
    });
  });
  // "4 años" arriba en s03 (se va antes del push-in)
  const k4 = t > T.s03 + 0.62 && t < T.s04 ? popIn(t, T.s03 + 0.62, 0.3) : 0;
  ocultar(cuatro, k4 * 0.95);
  cuatro.position.set(OE.x, colY(6) + 0.42, COL_Z);
  cuatro.rotation.set(-0.15, 0, 0);
  // líneas punteadas "antes" en "dos tiendas"
  punteadas.forEach((g, i) => { const kk = t > T.dos ? popIn(t, T.dos + i * 0.08, 0.25) : 0; ocultar(g, kk); });
  // las cajas de adelante: la 1 con "LA PAGÁS VOS" (s04), la 2 con "DEVOLUCIÓN GRATIS" (s05)
  frenteE.forEach((cc, i) => {
    const t0 = i ? T.s05 + 0.1 : T.s04 + 0.1;
    cc.visible = t > t0;
    if (!cc.visible) return;
    cc.scale.setScalar(KF * popIn(t, t0, 0.28));
    ponerCaja(cc, [1, 1, 1, 0.45], 0);
    // la etiqueta parada adentro de la caja, asomando (como en el gancho): grande, se lee
    const et = i ? etiGratisE : etiPagas; et.visible = true;
    et.position.copy(cc.position).add(V(0, CJ.H * KF + 0.06, 0.02));
    et.rotation.set(-0.32, 0, i ? -0.03 : 0.04);
    et.scale.setScalar(1.25 * popIn(t, t0 + 0.08, 0.28));
  });
  // monedas que caen en la caja 1 en "pagaron"
  monedas.forEach((m, j) => {
    const t0 = T.pagaron + j * 0.15;
    // caen derechas (de canto) por delante de la etiqueta y entran en la caja; adentro las tapan las paredes
    m.visible = t > t0 && t < t0 + 0.36;
    if (!m.visible) return;
    const u = sg(t, t0, t0 + 0.34);
    const base = frenteE[0].position;
    m.position.set(base.x - 0.08 + j * 0.08, lerp(base.y + 0.85, base.y + 0.04, u * u), base.z + 0.1);
    m.rotation.set(Math.PI / 2, 0, 0.2 * (j - 1));
    m.scale.setScalar(0.75);
  });
}

// ================= ZONA Q en el tiempo =================
function zonaQ(t) {
  const en = plano === "Q";
  cajaQ.visible = pregunta.visible = pisoQ.visible = en;
  if (!en) return;
  cajaQ.position.set(OQ.x, 0, 0); cajaQ.rotation.set(0, -0.3, 0);
  const ab = t < T.que - 0.04 ? 0 : bk(sg(t, T.que - 0.04, T.que + 0.16));
  ponerCaja(cajaQ, [ab, ab, ab, ab], ab > 0.02 ? 0 : 1);
  cajaQ.scale.setScalar(1.15 * (1 + 0.06 * pulso(t, T.que - 0.04, 0.2)));
  const kq = t < T.que - 0.02 ? 0 : bk(sg(t, T.que - 0.02, T.que + 0.3));
  pregunta.visible = kq > 0.01;
  pregunta.position.set(OQ.x, lerp(0.2, 0.85, kq), 0.02);
  pregunta.rotation.set(0, Math.sin((t - T.que) * 2.4) * 0.22, rebote(t, T.que + 0.3, 6, 18, 0.06));
  pregunta.scale.setScalar(Math.max(0.001, kq * 0.62));
}

// ================= ZONA V en el tiempo =================
function zonaV(t) {
  const en = plano === "V";
  for (const x of [vitrina, mano, medidor, etiV, pisoV]) x.visible = en;
  if (!en) return;
  vitrina.position.set(OV.x, 0, 0);
  // el champión en la vitrina, girando lento; en "achica" sale al mundo con pop
  const sale = eio(sg(t, T.achica + 0.12, T.achica + 0.5));
  champV.position.set(0, 1.3 + 0.02 * Math.sin(t * 2) - sale * 0.12, lerp(-0.02, VIT.d / 2 + 1.1, sale));
  champV.rotation.set(0.08 + sale * 0.15, 1.15 + Math.sin((t - T.v0) * 0.9) * 0.35 - sale * 0.35, 0);
  champV.scale.setScalar(KCV * (1 + 0.05 * sale) * (1 + 0.08 * pulso(t, T.achica + 0.45, 0.3)));
  // el vidrio: se desvanece en "achica" (deja salir el champión); no se mueve
  const fv = 1 - eio(sg(t, T.achica - 0.05, T.achica + 0.15));
  vidrio.position.y = VIT.h / 2; vidrio.visible = fv > 0.01;
  vidrio.children.forEach((cc, i) => (cc.material.opacity = vidrio.userData.ops[i] * fv));
  // la mano: entra desde abajo a la derecha, choca dos veces contra el vidrio (sin atravesarlo) y se va
  const entra = eio(sg(t, T.probar - 0.2, T.toque)), va = eio(sg(t, T.riesgo - 0.1, T.riesgo + 0.25));
  const tap = Math.max(pulso(t, T.toque, 0.12), pulso(t, T.toque + 0.2, 0.12));
  const zG = VIT.d / 2 - 0.01; // el vidrio (local)
  const punta = V(0.5, 1.4, zG + 0.012 + tap * 0.05); // la punta del índice
  const desde = V(0.9, -0.3, 1.5);
  mano.visible = entra > 0.2 && va < 0.99; // (entra con el brazo ya en cuadro)
  if (mano.visible) {
    const objetivo = lerpV(desde, punta, entra * (1 - va)).add(OV);
    // el índice apunta hacia -z (al vidrio): la mano mira a -z con la punta del índice a 0.165 adelante
    mano.rotation.set(0.5, Math.PI + 0.45, 0); // entra desde abajo a la derecha (no tapa "Champión urbano")
    mano.updateMatrixWorld(true);
    const fw = V(0, 0, 1).applyQuaternion(mano.quaternion);
    mano.position.copy(objetivo).addScaledVector(fw, -0.18 * 1.15);
    mano.scale.setScalar(1.15);
  }
  ondas.forEach((oo, j) => {
    const a = T.toque + j * 0.2 + 0.03, u = sg(t, a, a + 0.45);
    oo.visible = false; // final: sin ondas (quedaban corridas del dedo)
    if (!oo.visible) return;
    oo.position.set(0.12, 1.36, zG + 0.006); oo.scale.setScalar(lerp(0.03, 0.28, eo(u))); oo.material.opacity = 0.9 * (1 - u);
  });
  // el medidor arriba: aparece en "riesgo" con la aguja en rojo; en "achica" baja a verde-crema (no a cero)
  const km = t < T.riesgo - 0.1 ? 0 : popIn(t, T.riesgo - 0.1, 0.3);
  ocultar(medidor, km * 0.5);
  medidor.position.set(OV.x + 0.36, 1.86, VIT.d / 2 + 0.2);
  medidor.rotation.set(-0.05, -0.1, 0);
  const angAlto = 0.42, angBajo = Math.PI * 0.68;
  const ag = lerp(Math.PI / 2, angAlto, eio(sg(t, T.riesgo - 0.05, T.riesgo + 0.3))) + rebote(t, T.riesgo + 0.3, 6, 22, 0.08);
  const ag2 = lerp(ag, angBajo, eio(sg(t, T.achica - 0.1, T.achica + 0.3))) + rebote(t, T.achica + 0.3, 6, 22, 0.06);
  aguja.rotation.z = ag2 - Math.PI / 2;
  // la etiqueta del gancho vuela y sella la esquina de la pantalla en "devolver gratis"
  const ve = eio(sg(t, T.devolver2 - 0.05, T.sella));
  etiV.visible = t > T.devolver2 - 0.05;
  if (etiV.visible) {
    ponerEtiqueta(etiV, "gratis", 1);
    const hasta = V(OV.x + 0.44, 0.63, VIT.d / 2 + 0.03);
    const desdeE = V(OV.x - 1.2, 2.6, 1.6);
    etiV.position.copy(arco(desdeE, hasta, ve, 0.3));
    etiV.rotation.set(0, 0, lerp(0.8, -0.12, ve));
    etiV.scale.setScalar(lerp(1.3, 1.5, ve) * (1 + 0.18 * pulso(t, T.sella, 0.2)));
  }
}

// ================= ZONA P en el tiempo =================
function zonaP(t) {
  const en = plano === "P";
  pisoP.visible = en; champP.visible = false;
  pilaI.forEach((cc) => (cc.visible = false)); pilaD.forEach((cc) => (cc.visible = false));
  if (!en) return;
  // izquierda (devoluciones): 2 → 3 en "¿Devuelven más?"
  pilaI.forEach((cc, kk) => {
    const t0 = kk < 2 ? -1 : T.masQ + 0.12; // cae después de "más?" (el golpe no pisa la voz)
    cc.visible = t > t0;
    if (!cc.visible) return;
    const u = kk < 2 ? 1 : caida(t, t0, 0.2);
    cc.position.set(OP.x - PILA.x, lerp(pilaY(kk) + 0.45, pilaY(kk), u), 0);
    cc.rotation.set(0, Math.sin(kk * 1.7) * 0.07, 0); cc.scale.setScalar(KP);
  });
  // derecha (compras): la de arriba (2) abierta recibe el champión, se cierra; +3 en "compran más"
  pilaD.forEach((cc, kk) => {
    const t0 = kk < 3 ? -1 : kk < 5 ? T.compran + (kk - 3) * 0.2 : 1e9; // 3 → 5 (no el doble)
    cc.visible = t > t0;
    if (!cc.visible) return;
    const u = kk < 3 ? 1 : caida(t, t0, 0.18);
    cc.position.set(OP.x + PILA.x, lerp(pilaY(kk) + 0.45, pilaY(kk), u), 0);
    cc.rotation.set(0, Math.sin(kk * 2.1) * 0.07, 0); cc.scale.setScalar(KP * (1 + 0.06 * pulso(t, W[57] + kk * 0.04, 0.25)));
    if (kk === 2) { const tc = T.masQ + 0.4; ponerCaja(cc, cierreEn(t, tc, 0.3), eio(sg(t, tc + 0.3, tc + 0.42))); }
  });
  // el champión cae en la caja abierta
  const tc0 = T.s08 + 0.02;
  champP.visible = t < T.masQ + 0.5;
  if (champP.visible) {
    const u = sg(t, tc0, tc0 + 0.3);
    champP.position.set(OP.x + PILA.x, lerp(pilaY(2) + CJ.H * KP + 0.12, pilaY(2) + CJ.H * KP * 0.25, u * u), 0.0);
    champP.rotation.set(0.15 * (1 - u), Math.PI / 2 + 0.2, 0.25 * (1 - u));
    champP.scale.setScalar(1.25);
  }
}

// ================= ZONA R en el tiempo =================
const enR = () => plano[0] === "R";
const CEL_R = { p: null, q: null };
function poseRuben(t) {
  const aC = { x: RB.x, y: RB.y, z: RB.z, giro: 0.12, sentado: 1 };
  const telM = { manoD: [-0.02, 0.28, 0.33], codoD: [-0.8, -0.6, -0.2], manoI: [0.17, 0.02, 0.33], codoI: [0.8, -0.5, -0.1] };
  const pr = poseEn(t, [
    [0, { ...aC, ...telM, inclina: 0.06, cabeza: { giro: -0.05, asiente: 0.32, ladea: 0.05 }, ojos: { x: 0.0, y: -0.75, abiertos: 1 }, cejas: { alto: 0.3, ang: 0.4, asim: 0.6 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.8 } }],
    // "championes": se mira el pie que levanta (la suela despegada)
    [T.pies + 0.2, { cabeza: { giro: -0.25, asiente: 0.38, ladea: 0.06 }, ojos: { x: -0.4, y: -0.75, abiertos: 1 }, cejas: { alto: 0.5, ang: 0.6, asim: 0.5 }, boca: { sonrisa: -0.4, abierta: 0.05, ancho: 0.8 } }, 0.2],
    [T.ysi - 0.1, { cabeza: { giro: -0.05, asiente: 0.32, ladea: 0.05 }, ojos: { x: 0.0, y: -0.75, abiertos: 1 } }, 0.15],
    // "¿y si no le quedan?": mira arriba, a la nube, duda
    [T.ysi + 0.15, { cabeza: { giro: 0.12, asiente: 0.0, ladea: -0.08 }, ojos: { x: 0.5, y: 0.55, abiertos: 1 }, cejas: { alto: 0.55, ang: 0.7, asim: 0.5 }, boca: { sonrisa: -0.45, abierta: 0.05, ancho: 0.75 } }, 0.3],
    [T.quedan + 0.25, { cabeza: { giro: -0.05, asiente: 0.3, ladea: 0.05 }, ojos: { x: 0, y: -0.75, abiertos: 1 }, cejas: { alto: 0.4, ang: 0.5, asim: 0.4 }, boca: { sonrisa: -0.2 } }, 0.3],
    // "Y le quedaron": levanta el pie con los nuevos, contento
    [T.piesN + 0.2, { cabeza: { giro: -0.25, asiente: 0.35, ladea: 0.06 }, ojos: { x: -0.4, y: -0.7, abiertos: 1, feliz: 0.5 }, cejas: { alto: 0.3, ang: 0.0, asim: 0 }, boca: { sonrisa: 0.9, abierta: 0.1, ancho: 1.1 } }, 0.2],
  ]);
  pr.t = t;
  return pr;
}
function ponerRuben(t) {
  const pr = poseRuben(t);
  ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
  // el celular: fijo frente al pecho, la pantalla mira a la cara (de espaldas a la cámara del plano medio)
  const cp = ruben.cuerpo.localToWorld(V(-0.02, 0.36, 0.36));
  celuR.position.copy(cp);
  celuR.rotation.set(-0.5, Math.PI + 0.12, 0, "YXZ");
  celuR.updateMatrixWorld(true);
  // la mano derecha agarra el celular por el borde de abajo a la derecha (de la pantalla)
  const agarre = celuR.localToWorld(V(-0.045, -0.055, -0.012));
  const hl = ruben.cuerpo.worldToLocal(agarre.clone());
  pr.manoD = [hl.x, hl.y, hl.z];
  ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
  return pr;
}
function zonaR(t) {
  const en = enR();
  almacen.visible = en;
  for (const x of [lamp, termo, banquito, ruben.raiz, mateM, celuR, nube, viejoPiso]) x.visible = en;
  for (const cc of champCaja) cc.visible = false;
  lampLuz.intensity = 0;
  if (!en) return;
  lampLuz.position.copy(lamp.position).add(V(0, -0.1, 0.1)); lampLuz.intensity = 3.0;
  ponerRuben(t);
  ruben.ojoLejano(camera.position);
  ruben.raiz.visible = plano !== "RC"; mateM.visible = plano !== "RC"; nube.visible = false;
  // el inserto del celular va sobre fondo neutro (navy liso): sin almacén detrás
  if (plano === "RC") { almacen.visible = false; for (const x of [lamp, termo, banquito]) x.visible = false; }
  // el mate en la mano izquierda, sobre el muslo
  ruben.mano("I").getWorldPosition(_v); mateM.position.copy(_v).add(V(0.0, -0.06, 0.02)); mateM.rotation.set(0, 0.4, 0);
  if (plano === "RP") { mateM.position.set(MOST.x - 0.55, MOST.y, MOST.z + 0.1); } // ronda 3: apoyado en el mostrador (no flota)
  // calzado: viejos hasta "quedaron"; después los nuevos (y el viejo en el piso)
  const nuevos = t >= T.piesN;
  viejosR.forEach((cc) => (cc.visible = !nuevos)); nuevosR.forEach((cc) => (cc.visible = nuevos));
  // la suela despegada del derecho aletea en "championes" (3 veces)
  const flap = (tt) => Math.max(0, Math.sin(Math.min(1, sg(tt, T.pies + 0.28, T.pies + 0.98)) * Math.PI * 3)) * (tt > T.pies + 0.28 && tt < T.pies + 0.98 ? 1 : 0);
  viejosR[0].userData.bis.rotation.x = 0.08 + 0.5 * flap(t);
  viejosR[1].userData.bis.rotation.x = 0;
  // el viejo en el piso, al lado del banquito (con la boca abierta; se cierra después del talonazo)
  viejoPiso.visible = nuevos || plano === "RV";
  if (plano === "RV") { ruben.raiz.visible = false; mateM.visible = false; }
  // final: la "boca" se abre levantando la capellada desde el talón (que queda en el piso); la suela delantera cuelga de
  // la bisagra hasta tocar el piso con la punta: un solo champión, la entresuela roja siempre a la vista en la boca
  const kV = plano === "RV" ? 1.0 : 1.45;
  const th = plano === "RV" ? 0.06 + 0.3 * flap(t) : lerp(0.3, 0.02, eio(sg(t, T.talon, T.talon + 0.15))) + Math.abs(rebote(t, T.talon + 0.15, 10, 30, 0.03));
  const yR = kV * 0.15 * Math.sin(th), fiW = Math.asin(Math.min(1, (0.17 * Math.sin(th)) / 0.135));
  if (plano === "RV") { viejoPiso.position.copy(VP); viejoPiso.rotation.set(-th, VROT, 0, "YXZ"); }
  else { viejoPiso.position.set(OR.x - 0.36, 0, RB.z + 0.12); viejoPiso.rotation.set(-th, 0.2, 0, "YXZ"); } // al lado del banquito, a la vista
  viejoPiso.position.y = yR;
  viejoPiso.userData.bis.rotation.x = th + fiW;
  viejoPiso.scale.setScalar(kV);
  // contraplano: Rubén levanta el pie derecho y lo muestra (con los viejos, la suela aletea como una boca; con los nuevos,
  // lo mueve contento). Se pisa la rodilla después de poner la pose.
  ruben.pies[0].rotation.x = 0; ruben.pies[1].rotation.x = 0;
  if (plano === "RP" && nuevos) {
    const a0 = T.piesN;
    const ext = eio(sg(t, a0 - 0.02, a0 + 0.25)) * 1.15 + (nuevos ? 0.08 * Math.sin((t - a0) * 9) * sg(t, a0 + 0.25, a0 + 0.4) : 0);
    ruben.piernas[0].rod.rotation.x = Math.PI / 2 - ext; ruben.pies[0].rotation.x = ext * 0.55;
    ruben.pies[1].rotation.y = 0.35; // el otro pie, girado: los talones no se tocan
    ruben.raiz.updateMatrixWorld(true);
  }
  // la página del celular
  const n = t > T.compra ? 1 : 0;
  ponerPagina(celuR, t > T.pago ? "pago" : "ficha", t > T.pago ? (t > T.paga ? 1 : 0) : n);
  champMini.visible = true;
  const enP = t > T.pago;
  champMini.position.copy(enPant(celuR, PP[0] / 2, enP ? 600 : 580, 0.02)); champMini.rotation.set(0.25, 1.15 + Math.sin((t - T.s10) * 1.4) * 0.5, 0); champMini.scale.setScalar(enP ? 0.17 : 0.2);
  // el sello verde al lado del precio, en "devolución"
  const ks = t < T.devolucion - 0.05 ? 0 : popIn(t, T.devolucion - 0.05, 0.28);
  const enPago = t > T.pago;
  selloR.visible = ks > 0.01;
  selloR.position.copy(enPant(celuR, PP[0] / 2, 1150, 0.0078));
  selloR.scale.setScalar(Math.max(0.001, ks * 0.055) * (1 + 0.12 * pulso(t, T.gratis10 - 0.05, 0.25)));
  // el pulgar: entra desde abajo a la derecha y toca "Comprar" (y después "Pagar")
  pulgar.visible = false;
  const tq = t < T.paga - 0.02 ? T.compra : T.paga, uq = sg(t, tq - 0.02, tq + 0.18);
  toqueR.visible = false; // final: sin aro (quedaba sobre el texto del botón)
  if (toqueR.visible) { toqueR.position.copy(enPant(celuR, PP[0] / 2, PP[1] - 195, 0.008)); toqueR.scale.setScalar(lerp(0.002, 0.008, eo(uq))); toqueR.material.opacity = 0.9 * (1 - uq); }
  const toque = 0;
  if (pulgar.visible) {
    const boton = enPant(celuR, PP[0] / 2 + 60, PP[1] - 195, 0.016);
    const fuera = enPant(celuR, PP[0] + 200, PP[1] + 220, 0.03);
    pulgar.position.copy(lerpV(fuera, boton, toque)); pulgar.rotation.set(0, 0, 0.6); pulgar.scale.setScalar(0.72);
  }
  // la nube: "¿y si no le quedan?": el pie (media navy) que no entra en el champión nuevo y rebota
  const kn = plano === "R" && t > T.nubeR ? popIn(t, T.nubeR + 0.05, 0.3) : 0;
  nube.visible = kn > 0.01;
  if (nube.visible) {
    ruben.cabeza.getWorldPosition(_v);
    nube.position.copy(_v).add(V(0.5, 0.66, 0.1)); nube.quaternion.copy(camera.quaternion);
    nube.scale.setScalar(kn * 0.55 * (1 + 0.02 * Math.sin(t * 5)));
    champNube.position.set(-0.14, -0.2, 0.05); champNube.rotation.set(0.12, 1.57 + 0.35, 0); champNube.scale.setScalar(1.75);
    const kq = t < T.ysi + 0.15 ? 0 : popIn(t, T.ysi + 0.15, 0.3);
    preguntaNube.visible = kq > 0.01;
    preguntaNube.position.set(0.3, 0.02, 0.12); preguntaNube.rotation.set(0, 0, Math.sin((t - T.ysi) * 6) * 0.15);
    preguntaNube.scale.setScalar(Math.max(0.001, kq * 0.4 * (1 + 0.1 * pulso(t, T.quedan, 0.3))));
  }
  // s11: la caja del gancho (MISMA) cae en el mostrador, rebota y se abre: seda, los championes y la etiqueta sin usar
  if (plano === "RM") {
    cajaG.visible = true; etiG.visible = true;
    const u = caida(t, T.llega, 0.24);
    cajaG.position.set(MOST.x - 0.02, lerp(MOST.y + 0.3, MOST.y, u), MOST.z); cajaG.rotation.set(0, 0.15, 0); cajaG.scale.setScalar(0.85);
    const ab = t < T.abre ? 0 : 1;
    const ap = aperturaEn(t, T.abre, 0.3);
    ponerCaja(cajaG, t < T.abre ? [0, 0, 0, 0] : ap, t < T.abre ? 1 : 0);
    champCaja.forEach((cc, j) => {
      cc.visible = ab > 0 && t > T.abre + 0.16 + j * 0.06; // final: aparecen ya en el aire (no se ven de canto saliendo)
      // ronda 3: salen de la caja y quedan de perfil sobre el mostrador, delante de la caja (la etiqueta queda libre arriba)
      const sale = eio(sg(t, T.abre + 0.08 + j * 0.06, T.abre + 0.32 + j * 0.06));
      const dentro = cajaG.position.clone().add(V(0, CJ.H * 0.85 * 0.4, 0));
      const fuera = cajaG.position.clone().add(V(j ? 0.13 : -0.13, 0, CJ.D * 0.85 / 2 + 0.13));
      const pc = lerpV(dentro, fuera, sale); pc.y += Math.sin(Math.PI * sale) * 0.18; cc.position.copy(pc);
      if (sale < 0.72) cc.visible = false; // aparece recién delante de la pared de la caja // no atraviesa la pared de la caja
      cc.rotation.set(0, Math.PI / 2 + 0.15, 0); cc.scale.setScalar(0.95);
    });
    ponerEtiqueta(etiG, "gratis", 1);
    etiG.visible = ab > 0;
    const ke = t < T.abre ? 0 : popIn(t, T.abre + 0.1, 0.28);
    etiG.position.copy(cajaG.position).add(V(0.0, CJ.H * 0.85 + 0.11, -0.14)); etiG.rotation.set(-0.25, 0.15, 0.05); etiG.scale.setScalar(1.0 * ke);
  }
}

// ================= ZONA F en el tiempo =================
celuF.userData.base = V(OF.x, 1.0, 0);
function zonaF(t) {
  const v1 = plano === "F1", v2 = plano === "F2";
  celuF.visible = v1; cajaF.visible = v2; tildeF.visible = v2; pisoF.visible = v2;
  if (v1) {
    const gi = eo(sg(t, T.s12, T.s12 + 0.35));
    celuF.position.copy(celuF.userData.base); celuF.rotation.set(0, -0.5 * (1 - gi), 0);
    ponerPagina(celuF, "tu", 0);
    campera.visible = false; // la campera va dibujada en la foto de la ficha
    const ks = t < T.tienda12 ? 0 : popIn(t, T.tienda12, 0.28);
    selloF.visible = ks > 0.01;
    selloF.position.copy(enPant(celuF, PP[0] / 2, 1150, 0.0078)); selloF.scale.setScalar(Math.max(0.001, ks * 0.055));
  }
  if (v2) {
    const kk = lerp(0.6, 1, bk(sg(t, T.fin - 0.02, T.fin + 0.3)));
    cajaF.position.set(OF.x, 0, 0); cajaF.rotation.set(0, -0.45 + Math.sin((t - T.fin) * 1.2) * 0.1, 0); cajaF.scale.setScalar(kk * 1.05);
    const kt = t < T.fin + 0.25 ? 0 : popIn(t, T.fin + 0.25, 0.3);
    ocultar(tildeF, kt * (1 + 0.18 * pulso(t, W[88] - 0.03, 0.3)));
    tildeF.position.set(OF.x + 0.2, CJ.H * 1.05 + 0.24, 0.12); tildeF.rotation.set(-0.2, -0.2, 0);
  }
}
T.tu = W[81];

// ================= ESCENA EN EL TIEMPO =================
let _armado = false;
function renderAt(t) {
  if (!_armado) { _armado = true; ponerRuben(T.s10 + 0.5); PLANOS = armarPlanos(); }
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  let foco = V(0, 0.5, 0), rad = 2.2;
  if (plano[0] === "C") { foco = cajaG.position.clone(); rad = plano === "C1" ? 1.0 : 2.6; }
  else if (plano === "E") { foco = OE.clone().add(V(0, 0.6, 0)); rad = 2.4; }
  else if (plano === "Q") { foco = OQ.clone().add(V(0, 0.4, 0)); rad = 1.4; }
  else if (plano === "V") { foco = OV.clone().add(V(0, 1.2, 0)); rad = 2.2; }
  else if (plano === "P") { foco = OP.clone().add(V(0, 0.6, 0)); rad = 1.8; }
  else if (plano[0] === "R") { foco = V(OR.x + 0.4, 0.8, 0); rad = 2.2; }
  else if (plano[0] === "F") { foco = OF.clone().add(V(0, 0.4, 0)); rad = 1.2; }
  if (plano === "C2" && t > T.s02) foco = V(OC.x, 0, -0.5);
  sol.position.copy(foco).add(V(-2.2, 7, 5)); sol.target.position.copy(foco);
  Object.assign(sol.shadow.camera, { left: -rad, right: rad, top: rad, bottom: -rad, near: 0.5, far: 40 }); sol.shadow.camera.updateProjectionMatrix();
  cajaG.visible = false; etiG.visible = false;
  zonaC(t);
  zonaE(t);
  zonaQ(t);
  zonaV(t);
  zonaP(t);
  zonaR(t);
  zonaF(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e2) => renderAt(e2.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
