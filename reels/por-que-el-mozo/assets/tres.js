// Capa 3D de por-que-el-mozo (Three.js r170 local). Base técnica: reels/por-que-el-caramelo (luces, entorno PMREM, cámara
// por claves con Catmull-Rom monótona, personajes de reels/abren-hoy). renderAt(t) es una función pura del tiempo del
// timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo mundo sobre fondo crema liso (#efeee5, lo pone el HTML); el piso es un atrapa-sombras (solo la sombra navy).
//   R (origen): la mesa del restaurante (mantel hasta el piso, 4 comensales), el mozo con la bandeja y LA NUBE.
//   L (x = -8): la mesa del laboratorio (madera navy) con las tareas, las dos pilas de fichas, el "?" y el busto con la "C".
//   D (x = -15): el dormitorio de Rubén (cama, mesita de luz con lámpara, despertador, mate y tablet, ventana).
//   FIN (x = 100): la nubecita del cierre.
// LA NUBE DE PENDIENTES es el hilo: nace sobre el mozo, se desinfla al cobrar, vuelve vacía sobre el busto y sobre
// Rubén en la cama, y se desinfla otra vez cuando los pendientes pasan a la tablet.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800p.js";
import { crearPersonaje, ELENCO, MOZO, PIEL, PELO, poseEn, mezclar, CARA, BRAZOS, crearMate } from "./personajes.js";
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
renderer.localClippingEnabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1080 / 1920, 0.05, 400);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x6a6e78);
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
scene.environmentIntensity = 0.65;

const OL = V(-8, 0, 0); // el laboratorio (y el busto)
const OD = V(-12.6, 0, 0); // el dormitorio
const OF = V(100, 0, 0); // el cierre
const key = new THREE.DirectionalLight(0xfff0dc, 2.0); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.5); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x8a8478, 1.05); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.5);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.normalBias = 0.02; sol.shadow.radius = 5;
scene.add(sol, sol.target);
const lampara = new THREE.PointLight(0xffc98a, 0, 5, 1.4); scene.add(lampara);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, madera: 0xc9a774 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.14 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.5), red: mat(C.red, 0.55, { emissive: C.red, emissiveIntensity: 0.1 }),
  white: mat(C.white, 0.42), tilde: mat(C.navy, 0.45), gris: mat(C.gris, 0.55), madera: mat(C.madera, 0.62),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", ${fam === "Lexend" ? "sans-serif" : "monospace"}`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const ajustar = (x, txt, peso, px, ancho, fam) => { let s = px; x.font = F(peso, s, fam); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s, fam); } return s; };
const sombraTex = tex(256, 256, (x) => {
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(11,18,32,0.42)"); gr.addColorStop(0.55, "rgba(11,18,32,0.2)"); gr.addColorStop(1, "rgba(11,18,32,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
});
const sombra = (w, d, op = 1) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, opacity: op })); m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m; };
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
function hacerTilde(r = 0.17, disco = M.g, marca = M.tilde, padre = scene) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, disco); d.scale.set(r, r, r * 0.35); g.add(d);
  const tk = mesh(tickGeo, marca, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  padre.add(g); return g;
}
const NAV = "#16243d", NAV3 = "#1f3254", CRE = "#efeee5", VER = "#5ce611", NAV0 = "#0b1220", ROJ = "#c7655b";

// piso: atrapa-sombras sobre el crema del fondo (sin horizonte: el piso no se ve, solo la sombra navy)
const piso = mesh(new THREE.PlaneGeometry(120, 60), new THREE.ShadowMaterial({ color: 0x0b1220, opacity: 0.22 }), 0, 0, 0); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; scene.add(piso);
// tarima crema un poco más oscura debajo de cada zona (el "piso" del SPEC, sin borde duro: un disco grande)
const tarimaM = mat(0xe2e0d3, 0.95);
const tarima = (x, z, r) => { const m = mesh(new THREE.CircleGeometry(r, 72), tarimaM, x, 0.002, z); m.rotation.x = -Math.PI / 2; m.receiveShadow = true; scene.add(m); return m; };

// ================= OBJETOS DE LOS PEDIDOS (taza, torta, agua con gas, jarrita, medialuna, tostado) =================
const loza = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08, side: THREE.DoubleSide });
const cafeM = mat(0x5a3522, 0.3);
const lathe = (pts, seg = 40) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);
// todas miden ~1 u (se escalan): origen en la base
function hacerTaza(conLeche = false) {
  const g = new THREE.Group();
  g.add(mesh(lathe([[0, 0], [0.5, 0], [0.56, 0.04], [0.6, 0.07], [0.58, 0.08], [0.45, 0.05], [0, 0.05]]), loza));
  const taza = mesh(lathe([[0, 0.06], [0.2, 0.06], [0.26, 0.12], [0.31, 0.3], [0.33, 0.46], [0.315, 0.47], [0.29, 0.3], [0.24, 0.16], [0, 0.15]]), loza); g.add(taza);
  const banda = mesh(new THREE.TorusGeometry(0.325, 0.018, 8, 40), M.navy2, 0, 0.43, 0); banda.rotation.x = Math.PI / 2; g.add(banda);
  const sup = mesh(new THREE.CircleGeometry(0.3, 32), conLeche ? mat(0xc79c6e, 0.3) : cafeM, 0, 0.41, 0); sup.rotation.x = -Math.PI / 2; g.add(sup);
  if (conLeche) { const esp = mesh(new THREE.CircleGeometry(0.14, 24), mat(0xf3e6cf, 0.5), 0.02, 0.412, 0.02); esp.rotation.x = -Math.PI / 2; g.add(esp); }
  const asa = mesh(new THREE.TorusGeometry(0.11, 0.035, 10, 24, Math.PI * 1.3), loza, 0.33, 0.3, 0); asa.rotation.z = -Math.PI * 0.65; g.add(asa);
  return g;
}
function hacerTorta() {
  // porción triangular: dos capas de bizcochuelo, relleno y cobertura crema, una frutilla arriba
  const g = new THREE.Group();
  const forma = new THREE.Shape(); forma.moveTo(0, 0); forma.lineTo(0.7, -0.26); forma.lineTo(0.7, 0.26); forma.closePath();
  const capa = (y, h, m) => { const ge = new THREE.ExtrudeGeometry(forma, { depth: h, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 }); ge.rotateX(-Math.PI / 2); const o = mesh(ge, m, -0.35, y, 0); g.add(o); };
  const biz = mat(0xe8c789, 0.75), rel = mat(0x7a4a2e, 0.6), cob = mat(0xfbf7ee, 0.5);
  capa(0.0, 0.16, biz); capa(0.16, 0.05, rel); capa(0.21, 0.16, biz); capa(0.37, 0.07, cob);
  // la frutilla: un cono redondeado rojo apagado con hojitas verdes
  const fr = mesh(new THREE.SphereGeometry(0.11, 20, 14), M.red, 0.18, 0.55, 0); fr.scale.set(1, 1.25, 1); g.add(fr);
  for (let i = 0; i < 5; i++) { const h = mesh(new THREE.ConeGeometry(0.03, 0.09, 4), M.g, 0.18 + Math.cos(i * 1.26) * 0.04, 0.68, Math.sin(i * 1.26) * 0.04); h.rotation.set(Math.sin(i * 1.26) * 0.9, 0, -Math.cos(i * 1.26) * 0.9); g.add(h); }
  g.add(mesh(lathe([[0, 0], [0.55, 0], [0.6, 0.03], [0.55, 0.04], [0, 0.03]]), loza, 0, -0.03, 0));
  return g;
}
const vidrioM = new THREE.MeshPhysicalMaterial({ color: 0xd7e6ee, roughness: 0.06, transparent: true, opacity: 0.5, clearcoat: 1, depthWrite: false, side: THREE.DoubleSide });
function hacerAgua() {
  const g = new THREE.Group();
  const v = mesh(lathe([[0, 0], [0.22, 0], [0.24, 0.02], [0.27, 0.7], [0.25, 0.7], [0.22, 0.03], [0, 0.03]], 32), vidrioM); v.renderOrder = 3; g.add(v);
  const agua = mesh(new THREE.CylinderGeometry(0.235, 0.21, 0.5, 28), new THREE.MeshPhysicalMaterial({ color: 0xbcd8e8, roughness: 0.1, transparent: true, opacity: 0.6, depthWrite: false }), 0, 0.28, 0); agua.renderOrder = 2; g.add(agua);
  let s = 5; const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 14; i++) { const b = mesh(new THREE.SphereGeometry(0.028 + az() * 0.02, 10, 8), M.white, (az() - 0.5) * 0.3, 0.08 + az() * 0.45, (az() - 0.5) * 0.3); b.renderOrder = 4; g.add(b); }
  // rodaja de limón verde en el borde
  const lim = mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.03, 24, 1, false, 0, Math.PI), M.g, 0.24, 0.7, 0); lim.rotation.set(Math.PI / 2, 0, -0.3); g.add(lim);
  return g;
}
function hacerJarrita() {
  const g = new THREE.Group();
  g.add(mesh(lathe([[0, 0], [0.2, 0], [0.24, 0.05], [0.25, 0.3], [0.2, 0.48], [0.18, 0.56], [0.2, 0.62], [0.19, 0.63], [0.16, 0.56], [0, 0.05]]), loza));
  const pico = mesh(new THREE.ConeGeometry(0.07, 0.16, 12, 1, true), loza, 0, 0.6, 0.2); pico.rotation.x = Math.PI / 2 + 0.6; g.add(pico);
  const asa = mesh(new THREE.TorusGeometry(0.13, 0.03, 10, 24, Math.PI * 1.2), loza, 0, 0.35, -0.24); asa.rotation.set(0, Math.PI / 2, Math.PI * 0.6); g.add(asa);
  const leche = mesh(new THREE.CircleGeometry(0.17, 24), mat(0xffffff, 0.3), 0, 0.55, 0); leche.rotation.x = -Math.PI / 2; g.add(leche);
  g.add(mesh(new THREE.TorusGeometry(0.245, 0.015, 8, 30).rotateX(Math.PI / 2), M.navy2, 0, 0.2, 0));
  return g;
}
function hacerMedialuna() {
  const g = new THREE.Group();
  const cur = new THREE.CatmullRomCurve3(Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (0.15 + 0.7 * (i / 8)); return V(Math.cos(a) * 0.38, 0, -Math.sin(a) * 0.38 + 0.2); }));
  const tubo = new THREE.TubeGeometry(cur, 40, 0.14, 14);
  const pos = tubo.attributes.position, n = 41 * 15;
  for (let i = 0; i < pos.count; i++) { const u = Math.floor(i / 15) / 40, k = 0.35 + 0.65 * Math.sin(Math.PI * u); const c = cur.getPoint(u); pos.setXYZ(i, c.x + (pos.getX(i) - c.x) * k, (pos.getY(i) - c.y) * k * 0.8, c.z + (pos.getZ(i) - c.z) * k); }
  void n; tubo.computeVertexNormals();
  g.add(mesh(tubo, mat(0xcf8f3e, 0.45, { emissive: 0x5a3008, emissiveIntensity: 0.12 })));
  g.children[0].position.y = 0.12;
  return g;
}
function hacerTostado() {
  const g = new THREE.Group();
  const tri = new THREE.Shape(); tri.moveTo(-0.4, -0.3); tri.lineTo(0.4, -0.3); tri.lineTo(0, 0.38); tri.closePath();
  const pan = (y, m) => { const ge = new THREE.ExtrudeGeometry(tri, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.03, bevelSegments: 2 }); ge.rotateX(-Math.PI / 2); g.add(mesh(ge, m, 0, y, 0)); };
  const panM = mat(0xd9a45a, 0.7);
  pan(0.0, panM); pan(0.2, panM);
  const jam = new THREE.ExtrudeGeometry(tri, { depth: 0.04, bevelEnabled: false }); jam.rotateX(-Math.PI / 2); const j = mesh(jam, mat(0xe4a0a0, 0.6), 0, 0.12, 0); j.scale.set(1.06, 1, 1.06); g.add(j);
  const que = new THREE.ExtrudeGeometry(tri, { depth: 0.03, bevelEnabled: false }); que.rotateX(-Math.PI / 2); const q = mesh(que, mat(0xf2d36b, 0.5), 0, 0.165, 0); q.scale.set(1.1, 1, 1.1); g.add(q);
  return g;
}
// ---------- los pendientes de Rubén (billete con clip, presupuesto, caja del proveedor) ----------
const billeteTex = tex(512, 256, (x, w, h) => {
  x.fillStyle = "#dcefd0"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "#3fa60a"; x.lineWidth = 14; x.strokeRect(14, 14, w - 28, h - 28);
  x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(w / 2, h / 2, 62, 0, 7); x.fill();
  x.fillStyle = "#dcefd0"; x.font = F(800, 84); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("$", w / 2, h / 2 + 4);
  x.fillStyle = "#8cc96a"; for (const X of [70, w - 110]) x.fillRect(X, 60, 40, h - 120);
});
function hacerBillete(clip = true) {
  const g = new THREE.Group();
  const bm = new THREE.MeshStandardMaterial({ map: billeteTex, roughness: 0.85 });
  const pap = mat(0xdcefd0, 0.85);
  g.add(mesh(new THREE.BoxGeometry(1, 0.012, 0.5), [pap, pap, bm, pap, pap, pap]));
  const b2 = mesh(new THREE.BoxGeometry(1, 0.012, 0.5), [pap, pap, bm, pap, pap, pap], 0.05, 0.03, -0.04); b2.rotation.set(0.0, 0.12, 0.06); g.add(b2);
  if (clip) { const c = mesh(new THREE.TorusGeometry(0.08, 0.016, 6, 20, Math.PI * 1.6), mat(0xc9ccd2, 0.25, { metalness: 0.7 }), -0.38, 0.03, -0.2); c.rotation.set(Math.PI / 2, 0, 0.4); c.scale.set(1, 1.8, 1); g.add(c); }
  return g;
}
const presuTex = tex(512, 660, (x, w, h) => {
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, w, h);
  x.fillStyle = NAV0; x.font = F(800, 150); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("$", 46, 120);
  x.fillStyle = "#33415e"; for (let i = 0; i < 6; i++) { x.fillRect(46, 250 + i * 62, 230 + ((i * 61) % 140), 18); x.fillRect(w - 46 - 90, 250 + i * 62, 90, 18); }
  x.fillStyle = ROJ; x.fillRect(40, 640 - 40, w - 80, 10);
});
function hacerPresupuesto() {
  const g = new THREE.Group();
  const pm = new THREE.MeshStandardMaterial({ map: presuTex, roughness: 0.8 });
  const pap = mat(0xffffff, 0.8);
  const hoja = mesh(new THREE.BoxGeometry(0.62, 0.8, 0.012), [pap, pap, pap, pap, pm, pap], 0, 0.4, 0); g.add(hoja);
  // la esquina doblada
  const esq = mesh(new THREE.ConeGeometry(0.09, 0.012, 3), mat(0xe6e4d8, 0.8), 0.25, 0.75, 0.012); esq.rotation.set(Math.PI / 2, 0, Math.PI / 4); g.add(esq);
  return g;
}
const cintaTex = tex(256, 64, (x, w, h) => { x.fillStyle = "#e9d9a8"; x.fillRect(0, 0, w, h); x.fillStyle = "rgba(160,120,60,0.35)"; for (let i = 0; i < 8; i++) x.fillRect(i * 32, 0, 3, h); });
function hacerCaja() {
  const g = new THREE.Group();
  const carton = mat(0xc49a63, 0.85);
  g.add(mesh(rbox(0.8, 0.55, 0.6, 0.03), carton, 0, 0.275, 0));
  const cinta = new THREE.MeshStandardMaterial({ map: cintaTex, roughness: 0.4, transparent: true, opacity: 0.95 });
  g.add(mesh(new THREE.BoxGeometry(0.82, 0.012, 0.16), cinta, 0, 0.556, 0));
  g.add(mesh(new THREE.BoxGeometry(0.16, 0.3, 0.012), cinta, 0, 0.42, 0.302));
  // etiqueta de envío
  const et = tex(256, 160, (x, w, h) => { x.fillStyle = "#ffffff"; rr(x, 0, 0, w, h, 14); x.fillStyle = "#33415e"; for (let i = 0; i < 3; i++) x.fillRect(22, 30 + i * 40, 150 - i * 30, 14); x.fillStyle = ROJ; x.fillRect(190, 26, 44, 108); });
  g.add(mesh(new THREE.PlaneGeometry(0.3, 0.19), new THREE.MeshStandardMaterial({ map: et, roughness: 0.7 }), -0.2, 0.25, 0.302));
  return g;
}

// ---------- plaquitas mono (debajo de cada pendiente) ----------
let PX_PLACA = 78;
const placaTex = (txt, fondo = "#ffffff", tinta = NAV0, borde = NAV0, H = 160) => tex(512, H, (x, w, h) => {
  x.fillStyle = borde; rr(x, 0, 0, w, h, 40); x.fillStyle = fondo; rr(x, 7, 7, w - 14, h - 14, 34);
  x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle";
  const ls = txt.split("\n"); const px = Math.min(...ls.map((l) => ajustar(x, l, 500, PX_PLACA, w - 44, "IBM Plex Mono"))); x.font = F(500, px, "IBM Plex Mono");
  ls.forEach((l, i) => x.fillText(l, w / 2, h / 2 + 3 + (i - (ls.length - 1) / 2) * px * 1.1));
});
function placa(txt, ancho = 0.62, fondo, tinta, borde) {
  const H = txt.includes("\n") ? 280 : 170;
  const t = placaTex(txt, fondo, tinta, borde, H);
  const m = mesh(new THREE.PlaneGeometry(ancho, (ancho * H) / 512), new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false }));
  m.renderOrder = 6; return m;
}

// ================= LA NUBE DE PENDIENTES =================
// 7 esferas fusionadas crema + casco navy por atrás (el contorno) + 2 bolitas de cola hacia la sien. Mide ~1,2 u de ancho.
const nubeM = new THREE.MeshPhysicalMaterial({ color: 0xf7f6ef, roughness: 0.55, clearcoat: 0.3, emissive: 0xefeee5, emissiveIntensity: 0.16 });
const nubeBordeM = new THREE.MeshBasicMaterial({ color: 0x16243d, side: THREE.BackSide });
const ESF = [[-0.36, -0.04, 0.27], [-0.14, 0.14, 0.31], [0.16, 0.16, 0.3], [0.4, 0.0, 0.25], [0.18, -0.15, 0.26], [-0.14, -0.15, 0.25], [0.0, 0.0, 0.32]];
const esfGeo = new THREE.SphereGeometry(1, 36, 24);
function hacerNube(cola = -1) {
  const g = new THREE.Group(); const cuerpo = new THREE.Group(); g.add(cuerpo);
  const bolas = [];
  for (const [x, y, r] of ESF) {
    const b = mesh(esfGeo, nubeM, x, y, 0); b.scale.set(r, r, r * 0.55); cuerpo.add(b);
    const o = mesh(esfGeo, nubeBordeM, x, y, -0.01); o.scale.set(r + 0.03, r + 0.03, r * 0.55 + 0.02); cuerpo.add(o);
    bolas.push([b, o, x, y, r]);
  }
  const colas = [[0.5, -0.36, 0.085], [0.66, -0.52, 0.055]].map(([x, y, r]) => {
    const b = mesh(esfGeo, nubeM, cola * x, y, 0); b.scale.set(r, r, r * 0.8); g.add(b);
    const o = mesh(esfGeo, nubeBordeM, cola * x, y, -0.01); o.scale.set(r + 0.022, r + 0.022, r * 0.8 + 0.012); g.add(o);
    return [b, o, r];
  });
  const items = new THREE.Group(); items.position.z = 0.2; g.add(items);
  g.traverse((o) => { if (o.isMesh) o.castShadow = false; });
  g.userData = { cuerpo, bolas, colas, items };
  scene.add(g); return g;
}
// infla 0..1 (0 = la bolita arrugada); arruga: cuánto tiembla/se arruga; late: respiración
function ponerNube(n, t, { infla = 1, arruga = 0, late = 0 }) {
  const { bolas, colas, cuerpo } = n.userData;
  const k = lerp(0.16, 1, infla);
  bolas.forEach(([b, o, x, y, r], i) => {
    const w = 1 + arruga * 0.22 * Math.sin(i * 2.3 + t * 34) + late * 0.035 * Math.sin(t * 5 + i);
    const rr2 = r * w * (infla < 1 ? lerp(0.7, 1, infla) : 1);
    b.position.set(x * k, y * k, 0); o.position.set(x * k, y * k, -0.01);
    b.scale.set(rr2 * k, rr2 * k * (1 - arruga * 0.12), rr2 * k * 0.55); o.scale.set(rr2 * k + 0.03, rr2 * k * (1 - arruga * 0.12) + 0.03, rr2 * k * 0.55 + 0.02);
  });
  cuerpo.rotation.z = arruga * 0.12 * Math.sin(t * 27);
  colas.forEach(([b, o]) => { b.visible = o.visible = infla > 0.35; });
}

// ================= ZONA R: el restaurante =================
const TOP = 0.76;
tarima(0, 0, 3.6);
const mesa = new THREE.Group(); scene.add(mesa);
const MANTEL = mat(0xefeee5, 0.85);
{
  mesa.add(mesh(new THREE.CylinderGeometry(0.74, 0.86, TOP - 0.01, 56, 1, true), MANTEL, 0, (TOP - 0.01) / 2, 0));
  mesa.add(mesh(new THREE.CylinderGeometry(0.745, 0.745, 0.025, 56), MANTEL, 0, TOP - 0.012, 0));
  const pl = new THREE.CylinderGeometry(0.87, 0.87, 0.04, 96, 1, true); const pp = pl.attributes.position;
  for (let i = 0; i < pp.count; i++) { const x = pp.getX(i), z = pp.getZ(i), a = Math.atan2(z, x), k = 1 + 0.018 * Math.sin(a * 22); pp.setX(i, x * k); pp.setZ(i, z * k); }
  pl.computeVertexNormals(); mesa.add(mesh(pl, MANTEL, 0, 0.02, 0));
  // guarda navy del mantel (una franja que da la vuelta)
  mesa.add(mesh(new THREE.CylinderGeometry(0.757, 0.775, 0.05, 56, 1, true), M.navy2, 0, TOP - 0.14, 0));
  sh(mesa);
}
const sombraMesa = sombra(2.4, 2.4, 0.8); sombraMesa.position.set(0, 0.005, 0);
// lo que hay sobre la mesa: tazas, platitos, la cuenta
const sobreMesa = new THREE.Group(); scene.add(sobreMesa);
{
  const pone = (o, x, z, k, ry = 0) => { o.position.set(x, TOP, z); o.scale.setScalar(k); o.rotation.y = ry; sobreMesa.add(o); };
  pone(hacerTaza(), -0.32, -0.36, 0.17, 0.6); pone(hacerTaza(true), 0.28, -0.42, 0.17, 2.4); pone(hacerTaza(), -0.5, 0.1, 0.17, -0.4);
  pone(hacerAgua(), 0.05, -0.2, 0.2); pone(hacerTorta(), -0.12, 0.32, 0.2, 0.8);
  for (const [x, z, r] of [[-0.45, -0.25, 0.7], [0.4, -0.15, 1.6]]) { const s = mesh(rbox(0.13, 0.022, 0.13, 0.009), M.g, x, TOP + 0.012, z); s.rotation.y = r; sobreMesa.add(s); }
  sh(sobreMesa);
}
// el platito de la cuenta (con el ticket doblado), en la punta de la mesa del lado del mozo
const ticketTex = tex(512, 640, (x, w, h) => {
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, w, h);
  x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle";
  ajustar(x, "CUENTA", 800, 110, w - 70); x.fillText("CUENTA", w / 2, 96);
  x.fillStyle = "#33415e"; for (let i = 0; i < 6; i++) { x.fillRect(46, 190 + i * 52, 210 + ((i * 53) % 120), 16); x.fillRect(w - 46 - 90, 190 + i * 52, 90, 16); }
  x.fillStyle = NAV0; x.fillRect(40, 520, w - 80, 6);
  x.textAlign = "left"; x.font = F(800, 64); x.fillText("TOTAL", 46, 580);
});
function hacerPlatito() {
  const g = new THREE.Group();
  const plato = mesh(lathe([[0, 0.0], [0.07, 0.0], [0.08, 0.004], [0.095, 0.01], [0.105, 0.008], [0.125, 0.02], [0.148, 0.034], [0.156, 0.04], [0.158, 0.036], [0.15, 0.028], [0.12, 0.012], [0.1, 0.0]], 64), loza); g.add(plato);
  const borde = mesh(new THREE.TorusGeometry(0.157, 0.005, 8, 72), M.navy2, 0, 0.039, 0); borde.rotation.x = Math.PI / 2; g.add(borde);
  const TW = 0.13, TH = 0.085;
  const mt = new THREE.MeshStandardMaterial({ map: ticketTex, roughness: 0.85 });
  const papel = mat(0xf7f5ec, 0.85);
  g.add(mesh(new THREE.BoxGeometry(TW, 0.002, TH), papel, -0.02, 0.012, TH / 2 - 0.02));
  const bis = new THREE.Group(); bis.position.set(-0.02, 0.013, -0.02); bis.rotation.x = 0.5; g.add(bis);
  bis.add(mesh(new THREE.BoxGeometry(TW, 0.002, TH), [papel, papel, mt, papel, papel, papel], 0, 0, -TH / 2));
  sh(g); scene.add(g); return g;
}
const platito = hacerPlatito();
const PLAT0 = V(0.52, TOP, 0.42);
// monedas que caen en el platito ("Pagaron…")
const cantoTex = tex(1024, 32, (x, w, h) => { for (let i = 0; i < 128; i++) { x.fillStyle = i % 2 ? "#a7a49a" : "#d9d7cf"; x.fillRect(i * 8, 0, 8, h); } });
const caraTex = tex(256, 256, (x, w, h) => { x.fillStyle = "#d2cfc4"; x.fillRect(0, 0, w, h); x.strokeStyle = "#9c998e"; x.lineWidth = 14; x.beginPath(); x.arc(128, 128, 100, 0, 7); x.stroke(); });
const MMON = [new THREE.MeshStandardMaterial({ map: cantoTex, metalness: 0.75, roughness: 0.3 }), new THREE.MeshStandardMaterial({ map: caraTex, metalness: 0.7, roughness: 0.28 }), new THREE.MeshStandardMaterial({ map: caraTex, metalness: 0.7, roughness: 0.28 })];
const monedas = [0, 1, 2, 3, 4].map(() => { const m = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.007, 28), MMON); m.castShadow = true; scene.add(m); return m; });
// sillas y comensales (genéricos: no son del elenco fijo); dos con sombrero tipo años 20
function hacerSilla() {
  const g = new THREE.Group(); const md = mat(0x8a6a48, 0.62);
  g.add(mesh(rbox(0.44, 0.05, 0.42, 0.015), md, 0, 0.43, 0));
  for (const [x, z] of [[-0.19, -0.18], [0.19, -0.18], [-0.19, 0.18], [0.19, 0.18]]) g.add(mesh(rbox(0.04, 0.43, 0.04, 0.01), md, x, 0.215, z));
  for (const x of [-0.19, 0.19]) g.add(mesh(rbox(0.04, 0.5, 0.04, 0.01), md, x, 0.7, -0.19));
  g.add(mesh(rbox(0.42, 0.14, 0.03, 0.01), md, 0, 0.86, -0.19));
  sh(g); scene.add(g); return g;
}
function sombrero(p, color = C.navy2) {
  // sombrero de ala corta (tipo años 20): copa con cinta verde y ala
  const g = new THREE.Group(); g.position.set(0, 0.5, -0.01); g.rotation.x = -0.12; p.cabeza.add(g);
  const sm = mat(color, 0.6);
  g.add(mesh(new THREE.CylinderGeometry(0.235, 0.27, 0.2, 32), sm, 0, 0.1, 0));
  const tapa = mesh(new THREE.SphereGeometry(0.235, 32, 10, 0, Math.PI * 2, 0, Math.PI / 2), sm, 0, 0.2, 0); tapa.scale.y = 0.25; g.add(tapa);
  g.add(mesh(new THREE.CylinderGeometry(0.272, 0.276, 0.045, 32), mat(C.cr2, 0.5), 0, 0.03, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.02, 40), sm, 0, 0.0, 0));
}
const COM = [
  { cfg: { nombre: "Comensal", piel: PIEL.clara, pelo: PELO.castaño, peinado: "corto", cejasColor: 0x4a3426, camisa: C.navy3, mangas: "largas", cuello: C.cr, pantalon: C.navy, panza: 1.06, alto: 1.0 }, x: -0.42, z: -0.82, hat: C.navy2 },
  { cfg: { nombre: "Comensala", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "rodete", cejasColor: 0x1e1a18, camisa: C.cr2, mangas: "largas", cuello: C.g, cuelloBotones: false, pantalon: C.navy2, panza: 0.98, nariz: 0.05, labios: 0x9a4448, aros: C.g, alto: 0.96 }, x: 0.12, z: -0.88 },
  { cfg: { nombre: "Señor", piel: PIEL.media, pelo: PELO.gris, peinado: "corto", cejasColor: 0x6a625a, bigote: PELO.gris, camisa: C.cr, mangas: "largas", cuello: C.navy2, pantalon: C.navy, panza: 1.14, alto: 1.0 }, x: -0.98, z: -0.05, hat: 0x3a4a63 },
  { cfg: { nombre: "Señora", piel: PIEL.clara, pelo: PELO.rubio, peinado: "rulos", cejasColor: 0x8a6f4a, camisa: C.navy2, mangas: "largas", cuello: C.cr, cuelloBotones: false, pantalon: C.navy3, panza: 1.0, labios: 0xb5555a, alto: 0.95 }, x: -0.72, z: 0.72 },
].map((c) => {
  const p = crearPersonaje({ zapatos: 0x2a2220, parpadeoCada: 1e6, ...c.cfg }); scene.add(p.raiz);
  p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  if (c.hat) sombrero(p, c.hat);
  c.p = p; c.giro = Math.atan2(-c.x, -c.z);
  c.silla = hacerSilla(); c.silla.position.set(c.x - Math.sin(c.giro) * 0.06, 0, c.z - Math.cos(c.giro) * 0.06); c.silla.rotation.y = c.giro;
  return c;
});
function sentar(p) { const esc = p.raiz.children[0]; esc.children[0].rotation.x = -Math.PI / 2; esc.children[1].rotation.x = -Math.PI / 2; }
// el mozo
const mozo = crearPersonaje({ ...MOZO, parpadeoCada: 1e6 }); scene.add(mozo.raiz);
mozo.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const MZ = { x: 1.02, z: 0.42, giro: -0.42 };
// la bandeja redonda navy (en alto, con la palma abierta)
const bandeja = new THREE.Group(); scene.add(bandeja);
{
  bandeja.add(mesh(new THREE.CylinderGeometry(0.24, 0.235, 0.018, 48), M.navy2, 0, 0, 0));
  const aro = mesh(new THREE.TorusGeometry(0.238, 0.012, 8, 48), M.edge, 0, 0.012, 0); aro.rotation.x = Math.PI / 2; bandeja.add(aro);
  const t1 = hacerTaza(); t1.scale.setScalar(0.15); t1.position.set(-0.08, 0.01, 0.04); t1.rotation.y = 0.5; bandeja.add(t1);
  const t2 = hacerTorta(); t2.scale.setScalar(0.17); t2.position.set(0.1, 0.02, -0.05); t2.rotation.y = 2.2; bandeja.add(t2);
  sh(bandeja);
}
const billeteBand = hacerBillete(false); billeteBand.scale.setScalar(0.24); scene.add(billeteBand); sh(billeteBand);

// la nube del mozo: 4 pedidos de la mesa 4, después se le suman 3
const nube = hacerNube(-1);
const PED = [
  { o: hacerTaza(), k: 0.27, p: [-0.31, 0.27], ry: 0.5, txt: "café" },
  { o: hacerTorta(), k: 0.27, p: [0.31, 0.27], ry: 2.6, txt: "torta" },
  { o: hacerAgua(), k: 0.22, p: [-0.31, -0.13], ry: 0, txt: "agua\ncon gas" },
  { o: hacerJarrita(), k: 0.23, p: [0.31, -0.12], ry: -0.6, txt: "con\nleche" },
];
for (const it of PED) {
  const h = new THREE.Group(); h.add(it.o); it.o.scale.setScalar(it.k); it.o.rotation.set(0.35, it.ry, 0); it.o.position.y = -it.k * 0.2;
  nube.userData.items.add(h); it.h = h;
  if (it.txt) { PX_PLACA = 100; it.placa = placa(it.txt, 0.5); PX_PLACA = 78; it.placa.position.set(0, it.txt.includes("\n") ? -0.2 : -0.13, 0.16); h.add(it.placa); }
}
const placaMesa = placa("Mesa 4", 0.74, "#5ce611", NAV0, NAV0); nube.add(placaMesa); placaMesa.position.set(0, 0.52, 0.3);

// ================= ZONA L: el laboratorio de tareas =================
tarima(OL.x, 0, 3.4);
const LTOP = 0.8;
const lab = new THREE.Group(); lab.position.copy(OL); scene.add(lab);
const vetaTex = tex(512, 256, (x, w, h) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, h); x.strokeStyle = "rgba(44,66,104,0.9)"; x.lineWidth = 5; for (let i = 0; i < 14; i++) { x.beginPath(); x.moveTo(0, 10 + i * 18); for (let X = 0; X <= w; X += 32) x.lineTo(X, 10 + i * 18 + Math.sin(X * 0.02 + i) * 5); x.stroke(); } });
{
  const md = new THREE.MeshStandardMaterial({ map: vetaTex, roughness: 0.55 });
  lab.add(mesh(rbox(1.75, 0.08, 2.75, 0.025), md, 0, LTOP - 0.04, 0));
  for (const [x, z] of [[-0.8, -1.28], [0.8, -1.28], [-0.8, 1.28], [0.8, 1.28]]) lab.add(mesh(rbox(0.08, LTOP - 0.08, 0.08, 0.015), M.navy2, x, (LTOP - 0.08) / 2, z));
  // (ronda 1) frente cerrado de la mesa (que abajo del cuadro no quede piso vacío)
  lab.add(mesh(rbox(1.74, LTOP - 0.06, 0.04, 0.012), M.navy3, 0, (LTOP - 0.06) / 2, 1.33));
  for (const xx of [-0.84, 0.84]) lab.add(mesh(rbox(0.04, LTOP - 0.06, 2.66, 0.012), M.navy3, xx, (LTOP - 0.06) / 2, 0));
  sh(lab);
}
const sombraLab = sombra(2.4, 3.6, 0.7); sombraLab.position.set(OL.x, 0.005, 0);
// las tareas (terminadas atrás, interrumpidas adelante): carretel, barquito, cuenta, jarrón
const TX = [-0.98, -0.33, 0.33, 0.98]; // filas en profundidad (z)
const cuentaTex = (fin) => tex(512, 512, (x, w, h) => {
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "#cfd8e6"; x.lineWidth = 3; for (let i = 1; i < 10; i++) { x.beginPath(); x.moveTo(0, i * 51); x.lineTo(w, i * 51); x.stroke(); }
  x.fillStyle = NAV0; x.font = F(700, 104); x.textAlign = "right"; x.textBaseline = "middle";
  x.fillText("37", 430, 110); x.fillText("× 48", 430, 225); x.fillRect(110, 290, 330, 10);
  if (fin) x.fillText("1776", 430, 380); else { x.fillStyle = "#33415e"; x.font = F(700, 104); x.fillText("=", 210, 380); }
});
const jarronTex = (fin) => tex(512, 512, (x, w, h) => {
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, w, h);
  x.strokeStyle = NAV0; x.lineWidth = 16; x.lineCap = "round"; x.lineJoin = "round";
  const perfil = (s) => { x.beginPath(); x.moveTo(256 + s * 60, 70); x.bezierCurveTo(256 + s * 60, 140, 256 + s * 160, 190, 256 + s * 160, 300); x.bezierCurveTo(256 + s * 160, 400, 256 + s * 90, 450, 256 + s * 70, 450); x.stroke(); };
  perfil(-1);
  if (fin) { perfil(1); x.beginPath(); x.ellipse(256, 70, 60, 16, 0, 0, 7); x.stroke(); x.beginPath(); x.moveTo(186, 450); x.lineTo(326, 450); x.stroke(); x.strokeStyle = VER; x.lineWidth = 12; x.beginPath(); x.moveTo(110, 300); x.quadraticCurveTo(256, 340, 402, 300); x.stroke(); }
  else { x.beginPath(); x.ellipse(256, 70, 60, 16, 0, Math.PI * 0.5, Math.PI * 1.5); x.stroke(); }
});
function hacerHoja(t) { const g = new THREE.Group(); const pap = mat(0xffffff, 0.8); const m = mesh(new THREE.BoxGeometry(0.46, 0.006, 0.46), [pap, pap, new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 }), pap, pap, pap], 0, 0.004, 0); g.add(m); return g; }
function hacerCarretel(lleno) {
  const g = new THREE.Group();
  const md = mat(C.madera, 0.6);
  for (const y of [0.02, 0.38]) g.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.04, 32), md, 0, y, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.36, 20), md, 0, 0.2, 0));
  const hilo = mat(C.navy3, 0.7);
  // el hilo enrollado (con surcos) hasta arriba o hasta la mitad
  const h = lleno ? 0.32 : 0.15;
  const hg = new THREE.CylinderGeometry(0.15, 0.15, h, 32, 12); const pp = hg.attributes.position;
  for (let i = 0; i < pp.count; i++) { const k = 1 + 0.03 * Math.sin(pp.getY(i) * 160); pp.setX(i, pp.getX(i) * k); pp.setZ(i, pp.getZ(i) * k); }
  hg.computeVertexNormals(); g.add(mesh(hg, hilo, 0, 0.04 + h / 2, 0));
  if (!lleno) { const cur = new THREE.CatmullRomCurve3([V(0.15, 0.19, 0), V(0.26, 0.12, 0.1), V(0.3, 0.02, 0.24), V(0.42, 0.005, 0.3)]); g.add(mesh(new THREE.TubeGeometry(cur, 20, 0.012, 6), hilo)); }
  return g;
}
function hacerBarquito(entero) {
  const g = new THREE.Group(); const pap = mat(0xffffff, 0.75, { side: THREE.DoubleSide });
  if (entero) {
    // casco trapezoidal + vela triangular (el barquito de papel clásico)
    const casco = new THREE.Shape(); casco.moveTo(-0.3, 0.12); casco.lineTo(0.3, 0.12); casco.lineTo(0.2, 0); casco.lineTo(-0.2, 0); casco.closePath();
    const cg = new THREE.ExtrudeGeometry(casco, { depth: 0.14, bevelEnabled: false }); cg.translate(0, 0, -0.07); g.add(mesh(cg, pap));
    const vela = new THREE.Shape(); vela.moveTo(-0.17, 0.12); vela.lineTo(0.17, 0.12); vela.lineTo(0, 0.4); vela.closePath();
    const vg = new THREE.ExtrudeGeometry(vela, { depth: 0.1, bevelEnabled: false }); vg.translate(0, 0, -0.05); g.add(mesh(vg, pap));
    g.add(mesh(new THREE.BoxGeometry(0.004, 0.27, 0.105), mat(C.cr2, 0.8), 0, 0.26, 0));
  } else {
    // (ronda 1) medio barquito: el casco y la vela hechos solo hasta la mitad, y la otra mitad de la hoja todavía plana
    const casco = new THREE.Shape(); casco.moveTo(-0.3, 0.12); casco.lineTo(0, 0.12); casco.lineTo(0, 0); casco.lineTo(-0.2, 0); casco.closePath();
    const cg = new THREE.ExtrudeGeometry(casco, { depth: 0.14, bevelEnabled: false }); cg.translate(0, 0, -0.07); g.add(mesh(cg, pap));
    const vela = new THREE.Shape(); vela.moveTo(-0.17, 0.12); vela.lineTo(0, 0.12); vela.lineTo(0, 0.4); vela.closePath();
    const vg = new THREE.ExtrudeGeometry(vela, { depth: 0.1, bevelEnabled: false }); vg.translate(0, 0, -0.05); g.add(mesh(vg, pap));
    g.add(mesh(new THREE.BoxGeometry(0.3, 0.006, 0.3), pap, 0.16, 0.004, 0.0));
    g.add(mesh(new THREE.BoxGeometry(0.3, 0.0065, 0.004), mat(C.cr2, 0.8), 0.16, 0.006, 0.0)); // el doblez marcado
  }
  return g;
}
const TAREAS = [0, 1].map((fila) => [
  hacerCarretel(fila === 0), hacerBarquito(fila === 0), hacerHoja(cuentaTex(fila === 0)), hacerHoja(jarronTex(fila === 0)),
].map((o, i) => { sh(o); scene.add(o); return { o, i, fila }; })).flat();
const TZ = [-0.42, 0.42]; // columnas en x: terminadas a la izquierda, interrumpidas a la derecha
const tildesGris = [0, 1, 2, 3].map(() => hacerTilde(0.07, M.gris, M.white));
// el corte punteado verde donde quedó cada interrumpida
const corteTex = tex(64, 512, (x, w, h) => { x.fillStyle = VER; for (let i = 0; i < 7; i++) rr(x, 12, 8 + i * 72, 40, 46, 14); });
const cortes = [0, 1, 2, 3].map(() => { const m = mesh(new THREE.PlaneGeometry(0.05, 0.42), new THREE.MeshBasicMaterial({ map: corteTex, transparent: true, toneMapped: false, depthWrite: false })); m.renderOrder = 7; scene.add(m); return m; });
// las fichas de las dos pilas (1 : 1,9)
const NF = [10, 19], FH = 0.046, PILX = [-0.28, 0.28];
const fichaGeo = rbox(0.5, FH * 0.86, 0.42, 0.014);
const fichaM = [mat(0xc2c0b4, 0.6), mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.12 })];
const fichas = NF.map((n, k) => Array.from({ length: n }, () => { const m = mesh(fichaGeo, fichaM[k]); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m; }));
// renglones de texto en el canto de cada ficha (que se lea "tarjeta", no "ladrillo")
const placaPila = [placa("Terminadas", 0.47, "#efeee5", NAV0, NAV0), placa("Interrumpidas", 0.47, "#5ce611", NAV0, NAV0)];
placaPila.forEach((p) => scene.add(p));

// ================= EL "?" (bisagra) y EL BUSTO con la "C" =================
const QC = V(OL.x, 1.95, 0.0);
const pregunta = mesh(textoGeo("?", 0.95, 0.28), M.g.clone()); scene.add(pregunta);
// el busto de perfil (mira a +x), estilo maniquí de vidriera; vista en corte: el plano z = 0.02 se lleva la mitad de adelante
const corteBusto = new THREE.Plane(V(0, 0, -1), 0.02);
// (sin el corte: de frente se veían las esferas huecas; el busto queda chato en z y la "C" va pegada adelante, dentro de la silueta)
const bustoM = new THREE.MeshStandardMaterial({ color: C.navy2, roughness: 0.45 });
void corteBusto;
const busto = new THREE.Group(); scene.add(busto);
{
  // ronda 1: el perfil es UNA silueta extruida (frente, ceja, nariz, labios, mentón, cuello y hombros): se lee "cabeza de
  // perfil", no peón. Mira a +x; y = 0 es el centro del cráneo (donde va la "C").
  const P = [[-0.3, -0.56], [-0.34, -0.36], [-0.43, -0.16], [-0.46, 0.08], [-0.4, 0.33], [-0.22, 0.5], [0.04, 0.54], [0.24, 0.44], [0.33, 0.27],
    [0.35, 0.13], [0.31, 0.06], [0.35, 0.0], [0.47, -0.13], [0.37, -0.18], [0.38, -0.24], [0.34, -0.28], [0.37, -0.32], [0.33, -0.38], [0.32, -0.44],
    [0.22, -0.51], [0.1, -0.53], [0.11, -0.74], [0.36, -0.86], [0.5, -1.02], [0.52, -1.2]];
  const sh2 = new THREE.Shape(); sh2.moveTo(...P[0]); sh2.splineThru(P.slice(1).map(([x, y]) => new THREE.Vector2(x, y)));
  sh2.lineTo(-0.56, -1.2); sh2.lineTo(-0.54, -1.0); sh2.splineThru([new THREE.Vector2(-0.42, -0.88), new THREE.Vector2(-0.32, -0.74), new THREE.Vector2(-0.3, -0.56)]);
  const g = new THREE.ExtrudeGeometry(sh2, { depth: 0.36, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.05, bevelSegments: 5, curveSegments: 48 });
  g.translate(0, 0, -0.18); busto.add(mesh(g, bustoM));
  // la oreja (adelante, en el lado que mira a cámara)
  const or = mesh(new THREE.TorusGeometry(0.075, 0.03, 10, 24), bustoM, -0.04, -0.23, 0.25); or.scale.set(0.8, 1.15, 1); busto.add(or);
  busto.add(mesh(new THREE.CircleGeometry(0.06, 20), mat(C.navy3, 0.5), -0.04, -0.23, 0.252));
}
busto.traverse((o) => { if (o.isMesh) o.castShadow = false; });
const pedestal = new THREE.Group(); scene.add(pedestal);
pedestal.add(mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.12, 40), M.navy, 0, 0.06, 0));
pedestal.add(mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.42, 20), M.navy, 0, 0.3, 0));
sh(pedestal);
// la "C": un aro grueso verde abierto (el bucle abierto); se cierra en "calma"
const aroGeos = {};
const aroGeo = (arcF) => { const k = Math.round(arcF * 60); return (aroGeos[k] ??= new THREE.TorusGeometry(0.23, 0.068, 18, 64, (Math.PI * 2 * k) / 60)); };
const aroC = mesh(aroGeo(0.78), M.g.clone()); aroC.material.emissiveIntensity = 0.2; scene.add(aroC);
const capas = [0, 1].map(() => { const m = mesh(new THREE.SphereGeometry(0.068, 18, 12), aroC.material); scene.add(m); return m; }); // las puntas redondeadas
const nube2 = hacerNube(-1);
// (ronda 2) el pendiente que da vueltas en la cabeza: la caja del proveedor; en "plan" sale de la nube y entra en la tarjeta
const cajaPlan = hacerCaja(); sh(cajaPlan); scene.add(cajaPlan);
// la tarjeta del plan (agenda con anillado navy)
const PW = 1.25, PH = 0.82;
let planClave = "";
const planCanvas = document.createElement("canvas"); planCanvas.width = 1024; planCanvas.height = 672;
const planTex = new THREE.CanvasTexture(planCanvas); planTex.colorSpace = THREE.SRGBColorSpace; planTex.anisotropy = 8;
const RENG = [["Qué:", "llamar al proveedor"], ["Cuándo:", "jueves 10:00"], ["Quién:", "Nico"]];
function dibujarPlan(n) {
  // n = letras escritas (en total); los renglones se escriben en orden
  const clave = String(n); if (clave === planClave) return; planClave = clave;
  const x = planCanvas.getContext("2d"), w = 1024, h = 672;
  x.fillStyle = "#fbfaf4"; x.fillRect(0, 0, w, h);
  x.fillStyle = NAV; x.fillRect(0, 0, w, 120); x.fillStyle = CRE; x.font = F(800, 62); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Plan", 48, 66);
  x.fillStyle = VER; rr(x, w - 340, 16, 310, 92, 46); x.fillStyle = NAV0; x.font = F(800, 72); x.textAlign = "center"; x.fillText("1 tarea", w - 185, 64);
  let resto = n;
  RENG.forEach(([a, b], i) => {
    const y = 210 + i * 160;
    x.strokeStyle = "#d9d7c9"; x.lineWidth = 5; x.beginPath(); x.moveTo(48, y + 48); x.lineTo(w - 48, y + 48); x.stroke();
    const txt = a + " " + b, k = Math.max(0, Math.min(txt.length, resto)); resto -= txt.length;
    const vis = txt.slice(0, k);
    x.textAlign = "left"; x.fillStyle = "#33415e"; x.font = F(600, 62);
    const va = vis.slice(0, Math.min(vis.length, a.length)); x.fillText(va, 48, y);
    if (vis.length > a.length) { x.font = F(600, 62); const m = x.measureText(a + " ").width; x.fillStyle = NAV0; x.font = F(800, 64); x.fillText(vis.slice(a.length + 1), 48 + m, y); }
  });
  planTex.needsUpdate = true;
}
dibujarPlan(0);
const plan = new THREE.Group(); scene.add(plan);
{
  const pm = new THREE.MeshStandardMaterial({ map: planTex, roughness: 0.6, emissive: 0xffffff, emissiveMap: planTex, emissiveIntensity: 0.18 });
  plan.add(mesh(rbox(PW, PH, 0.03, 0.03), [M.cr, M.cr, M.cr, M.cr, pm, M.cr2]));
  for (let i = 0; i < 7; i++) { const a = mesh(new THREE.TorusGeometry(0.035, 0.011, 8, 20), M.navy, -PW / 2 + 0.12 + i * ((PW - 0.24) / 6), PH / 2, 0); a.rotation.y = Math.PI / 2; plan.add(a); }
  sh(plan);
}
const tildesPlan = [0, 1, 2].map(() => hacerTilde(0.055, M.g, M.tilde, plan));

// ================= ZONA D: el dormitorio de Rubén =================
const dorm = new THREE.Group(); dorm.position.copy(OD); scene.add(dorm);
const PARED_Z = -2.1;
const ventanaVidrio = mat(C.navy2, 0.4, { emissive: C.navy2, emissiveIntensity: 0.2 });
const luna = mesh(new THREE.CircleGeometry(0.12, 32), new THREE.MeshBasicMaterial({ color: 0xefeee5, toneMapped: false }));
const solM = new THREE.MeshBasicMaterial({ color: 0xf4d58a, toneMapped: false }); const sol2 = mesh(new THREE.CircleGeometry(0.14, 32), solM);
const estrellas = [];
{
  const pared = mat(0xefeee5, 0.92);
  dorm.add(mesh(new THREE.BoxGeometry(6, 3.6, 0.1), pared, 0, 1.8, PARED_Z - 0.05));
  // zócalo
  dorm.add(mesh(rbox(6, 0.12, 0.04, 0.01), mat(0xd9d7c9, 0.7), 0, 0.06, PARED_Z + 0.02));
  // piso de madera clara
  const tabla = tex(512, 512, (x, w, h) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#d8c4a0" : "#dcc9a6"; x.fillRect(0, i * 64, w, 64); x.fillStyle = "rgba(120,90,50,0.25)"; x.fillRect(0, i * 64, w, 3); x.fillRect(((i * 197) % 400) + 40, i * 64, 3, 64); } });
  tabla.wrapS = tabla.wrapT = THREE.RepeatWrapping; tabla.repeat.set(3, 2);
  const pis = mesh(new THREE.PlaneGeometry(6, 4.6), new THREE.MeshStandardMaterial({ map: tabla, roughness: 0.7 }), 0, 0.003, PARED_Z + 2.3); pis.rotation.x = -Math.PI / 2; pis.receiveShadow = true; dorm.add(pis);
  // ventana (marco navy, vidrio de noche con luna y estrellitas)
  const vw = 0.95, vh = 1.05, vx = 0.95, vy = 1.75;
  dorm.add(mesh(rbox(vw + 0.14, vh + 0.14, 0.06, 0.02), M.navy, vx, vy, PARED_Z + 0.02));
  dorm.add(mesh(new THREE.PlaneGeometry(vw, vh), ventanaVidrio, vx, vy, PARED_Z + 0.056));
  dorm.add(mesh(rbox(0.05, vh, 0.03, 0.01), M.navy, vx, vy, PARED_Z + 0.07));
  dorm.add(mesh(rbox(vw, 0.05, 0.03, 0.01), M.navy, vx, vy, PARED_Z + 0.07));
  dorm.add(mesh(rbox(vw + 0.3, 0.06, 0.16, 0.02), M.cr2, vx, vy - vh / 2 - 0.1, PARED_Z + 0.08));
  luna.position.set(vx + 0.22, vy + 0.25, PARED_Z + 0.06); dorm.add(luna);
  const luna2 = mesh(new THREE.CircleGeometry(0.1, 32), ventanaVidrio, vx + 0.28, vy + 0.29, PARED_Z + 0.061); dorm.add(luna2); luna.userData.mordida = luna2;
  sol2.position.set(vx - 0.2, vy + 0.22, PARED_Z + 0.06); dorm.add(sol2);
  for (const [x, y] of [[-0.3, 0.3], [-0.12, -0.2], [0.3, -0.32], [-0.33, -0.05], [0.12, 0.38]]) { const e = mesh(new THREE.CircleGeometry(0.022, 5), new THREE.MeshBasicMaterial({ color: 0xefeee5, toneMapped: false }), vx + x, vy + y, PARED_Z + 0.06); dorm.add(e); estrellas.push(e); }
  // cuadrito chico a la izquierda (que la pared no quede lisa)
  dorm.add(mesh(rbox(0.5, 0.38, 0.03, 0.01), M.navy2, -1.75, 1.75, PARED_Z + 0.02));
  dorm.add(mesh(new THREE.PlaneGeometry(0.42, 0.3), mat(0x5ce611, 0.6), -1.75, 1.75, PARED_Z + 0.04));
  dorm.add(mesh(new THREE.CircleGeometry(0.06, 20), mat(0xefeee5, 0.6), -1.68, 1.8, PARED_Z + 0.045));
}
// la cama (una plaza y media): respaldo de madera, colchón, sábana crema, frazada navy con guarda verde, almohada
const CAMA = { x: 0.15, w: 1.35, z0: PARED_Z + 0.08, largo: 2.1, colchon: 0.55 };
const cama = new THREE.Group(); cama.position.set(CAMA.x, 0, 0); dorm.add(cama);
const frazada = new THREE.Group();
{
  const md = mat(C.madera, 0.55);
  cama.add(mesh(rbox(CAMA.w + 0.12, 1.15, 0.08, 0.03), md, 0, 0.575, CAMA.z0 + 0.04));
  cama.add(mesh(rbox(CAMA.w + 0.04, 0.12, 0.05, 0.02), mat(0xb08f5e, 0.55), 0, 1.1, CAMA.z0 + 0.09));
  const zc = CAMA.z0 + 0.1 + CAMA.largo / 2;
  cama.add(mesh(rbox(CAMA.w + 0.06, 0.25, CAMA.largo, 0.03), md, 0, 0.17, zc));
  cama.add(mesh(rbox(CAMA.w, 0.24, CAMA.largo - 0.04, 0.06), M.white, 0, 0.4, zc));
  cama.add(mesh(rbox(CAMA.w + 0.12, 0.42, 0.06, 0.03), md, 0, 0.21, zc + CAMA.largo / 2 + 0.03));
  // almohada
  const almM = mat(0xffffff, 0.75);
  const alm = mesh(rbox(0.8, 0.16, 0.42, 0.07), almM, 0, CAMA.colchon + 0.07, CAMA.z0 + 0.26); cama.add(alm);
  const alm2 = mesh(rbox(0.78, 0.17, 0.5, 0.08), almM, 0, CAMA.colchon + 0.3, CAMA.z0 + 0.2); alm2.rotation.x = -(Math.PI / 2 - 0.8); cama.add(alm2);
  // sábana doblada sobre la frazada y la frazada (cubre a Rubén del pecho para abajo)
  const fz = mat(C.navy2, 0.85);
  frazada.add(mesh(rbox(CAMA.w + 0.1, 0.36, 1.3, 0.14), fz, 0, 0, 0));
  frazada.add(mesh(rbox(CAMA.w + 0.11, 0.365, 0.09, 0.05), M.g, 0, 0.0, -0.35));
  frazada.add(mesh(rbox(CAMA.w + 0.12, 0.38, 0.2, 0.1), mat(0xf2f0e6, 0.8), 0, 0.01, -0.65));
  frazada.position.set(0, CAMA.colchon + 0.16, CAMA.z0 + 1.52); cama.add(frazada);
  sh(cama);
}
// la mesita de luz (madera clara) a la izquierda de la cama
const MESITA = V(-0.95, 0.62, PARED_Z + 0.42);
const mesita = new THREE.Group(); mesita.position.set(MESITA.x, 0, MESITA.z); dorm.add(mesita);
let pantalla, aroLamp;
{
  const md = mat(C.madera, 0.55);
  mesita.add(mesh(rbox(0.56, 0.6, 0.48, 0.03), md, 0, 0.3, 0));
  mesita.add(mesh(rbox(0.6, 0.04, 0.52, 0.015), mat(0xb08f5e, 0.5), 0, 0.62, 0));
  mesita.add(mesh(rbox(0.46, 0.2, 0.02, 0.01), mat(0xb08f5e, 0.5), 0, 0.38, 0.245));
  mesita.add(mesh(new THREE.SphereGeometry(0.025, 12, 8), M.navy, 0, 0.38, 0.26));
  // la lámpara: base navy, pie, pantalla crema con el aro verde abajo
  const lamp = new THREE.Group(); lamp.position.set(-0.2, 0.64, -0.17); mesita.add(lamp);
  lamp.add(mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.05, 28), M.navy2, 0, 0.025, 0));
  lamp.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.32, 12), M.navy2, 0, 0.2, 0));
  pantalla = mesh(new THREE.CylinderGeometry(0.12, 0.2, 0.22, 36, 1, true), new THREE.MeshStandardMaterial({ color: 0xf3ead2, roughness: 0.8, side: THREE.DoubleSide, emissive: 0xffd9a0, emissiveIntensity: 0 }), 0, 0.42, 0); lamp.add(pantalla);
  aroLamp = mesh(new THREE.TorusGeometry(0.2, 0.016, 8, 40), M.g, 0, 0.31, 0); aroLamp.rotation.x = Math.PI / 2; lamp.add(aroLamp);
  const tapa = mesh(new THREE.CircleGeometry(0.12, 32), pantalla.material, 0, 0.529, 0); tapa.rotation.x = -Math.PI / 2; lamp.add(tapa);
  mesita.userData.lamp = lamp;
  sh(mesita);
  pantalla.castShadow = false;
}
// el despertador analógico rojo apagado con campanitas (las 3:12)
const relojTex = tex(256, 256, (x, w, h) => {
  x.fillStyle = "#fbfaf4"; x.beginPath(); x.arc(128, 128, 126, 0, 7); x.fill();
  x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 40);
  for (const [n, a] of [[12, 0], [3, 90], [6, 180], [9, 270]]) { const r = (a * Math.PI) / 180; x.fillText(String(n), 128 + Math.sin(r) * 92, 128 - Math.cos(r) * 92); }
  for (let i = 0; i < 12; i++) { if (i % 3 === 0) continue; const r = (i * Math.PI) / 6; x.beginPath(); x.arc(128 + Math.sin(r) * 96, 128 - Math.cos(r) * 96, 6, 0, 7); x.fill(); }
  x.lineCap = "round"; x.strokeStyle = NAV0;
  const ag = (ang, L, wd) => { x.lineWidth = wd; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ang) * L, 128 - Math.cos(ang) * L); x.stroke(); };
  ag(((3 + 12 / 60) / 12) * Math.PI * 2, 50, 16); x.strokeStyle = ROJ; ag((12 / 60) * Math.PI * 2, 100, 8); x.strokeStyle = NAV0;
  x.fillStyle = ROJ; x.beginPath(); x.arc(128, 128, 11, 0, 7); x.fill();
});
const despertador = new THREE.Group(); despertador.position.set(0.15, 0.64, -0.12); despertador.rotation.y = 0.2; mesita.add(despertador);
const campanas = new THREE.Group();
{
  const rj = mat(C.red, 0.4);
  const cuerpoR = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 36), rj, 0, 0.13, 0); cuerpoR.rotation.x = Math.PI / 2; despertador.add(cuerpoR);
  const cara = mesh(new THREE.CircleGeometry(0.085, 36), new THREE.MeshStandardMaterial({ map: relojTex, roughness: 0.4, emissive: 0xffffff, emissiveMap: relojTex, emissiveIntensity: 0.12 }), 0, 0.13, 0.031); despertador.add(cara);
  const bisel = mesh(new THREE.TorusGeometry(0.092, 0.01, 8, 36), mat(0xd5d8de, 0.25, { metalness: 0.7 }), 0, 0.13, 0.032); despertador.add(bisel);
  for (const s of [-1, 1]) {
    const c = mesh(new THREE.SphereGeometry(0.045, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), rj, s * 0.065, 0.235, 0); c.rotation.z = s * -0.5; campanas.add(c);
    const pata = mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.06, 8), M.navy, s * 0.06, 0.04, 0); pata.rotation.z = s * 0.4; despertador.add(pata);
  }
  campanas.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.07, 6), M.navy, 0, 0.24, 0));
  despertador.add(campanas);
  sh(despertador);
}
const mate = crearMate(); mate.position.set(0.31, 0.64, 0.2); mate.scale.setScalar(1.0); mesita.add(mate);
// vapor del mate (s11): bolitas translúcidas que suben (deterministas)
const vapor = [0, 1, 2, 3, 4].map(() => { const m = mesh(new THREE.SphereGeometry(0.03, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); scene.add(m); return m; });
// la tablet de Rubén (el sistema): pantalla "Pendientes"
const TBW = 1024, TBH = 768;
const avatarTex = (x, cx, cy, r, quien) => {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip();
  x.fillStyle = quien === "Nico" ? "#cfe9bf" : "#dfe8f5"; x.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  x.fillStyle = quien === "Nico" ? "#c28a62" : "#dba57f"; x.beginPath(); x.ellipse(cx, cy + r * 0.05, r * 0.42, r * 0.48, 0, 0, 7); x.fill();
  if (quien === "Nico") { x.fillStyle = "#2a2220"; x.beginPath(); x.ellipse(cx, cy - r * 0.32, r * 0.46, r * 0.26, 0, Math.PI, 0); x.fill(); x.fillStyle = "#5ce611"; }
  else { x.fillStyle = "#b9b6b0"; for (const s of [-1, 1]) { x.beginPath(); x.ellipse(cx + s * r * 0.4, cy - r * 0.05, r * 0.1, r * 0.2, 0, 0, 7); x.fill(); } x.fillStyle = "#8d8c8c"; x.fillRect(cx - r * 0.26, cy + r * 0.14, r * 0.52, r * 0.1); x.fillStyle = "#16243d"; }
  x.fillRect(cx - r, cy + r * 0.62, 2 * r, r);
  x.restore();
};
const campanita = (x, cx, cy, s, col) => {
  x.fillStyle = col; x.beginPath(); x.moveTo(cx - s * 0.42, cy + s * 0.3); x.quadraticCurveTo(cx - s * 0.4, cy - s * 0.45, cx, cy - s * 0.48); x.quadraticCurveTo(cx + s * 0.4, cy - s * 0.45, cx + s * 0.42, cy + s * 0.3); x.closePath(); x.fill();
  x.fillRect(cx - s * 0.5, cy + s * 0.26, s, s * 0.1); x.beginPath(); x.arc(cx, cy + s * 0.46, s * 0.11, 0, 7); x.fill();
};
const FILAS = [
  { ico: "billete", txt: "Seña de Graciela", hecho: "Seña cobrada", quien: "Nico", aviso: "jue 9:00" },
  { ico: "hoja", txt: "Presupuesto heladera", hecho: "Presupuesto enviado", quien: "Rubén", aviso: "mañana 10:00" },
  { ico: "caja", txt: "Pedido al proveedor", hecho: "Pedido hecho", quien: "Nico", aviso: "mar 8:00" },
];
const iconoTex = (x, cx, cy, ico, col) => {
  x.fillStyle = col;
  if (ico === "billete") { rr(x, cx - 44, cy - 26, 88, 52, 8); x.fillStyle = "#fff"; x.font = F(800, 40); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("$", cx, cy + 2); }
  else if (ico === "hoja") { rr(x, cx - 30, cy - 40, 60, 80, 8); x.fillStyle = "#fff"; for (let i = 0; i < 3; i++) x.fillRect(cx - 18, cy - 20 + i * 18, 36, 7); }
  else { rr(x, cx - 42, cy - 32, 84, 64, 8); x.fillStyle = "#fff"; x.fillRect(cx - 7, cy - 32, 14, 64); }
};
// estado: 0 vacía, 1..3 filas que llegaron, resp (0..1) avatares, aviso (0..1) campanitas, hecho (0..3) tildes
let tabClave = "";
const tabCanvas = document.createElement("canvas"); tabCanvas.width = TBW; tabCanvas.height = TBH;
const tabTex = new THREE.CanvasTexture(tabCanvas); tabTex.colorSpace = THREE.SRGBColorSpace; tabTex.anisotropy = 8;
function dibujarTablet({ filas = 0, resp = 0, aviso = 0, hecho = 0 }) {
  const clave = `${filas}|${resp > 0.5}|${aviso > 0.5}|${hecho}`; if (clave === tabClave) return; tabClave = clave;
  const x = tabCanvas.getContext("2d");
  x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, TBW, TBH);
  x.fillStyle = NAV; x.fillRect(0, 0, TBW, 130);
  x.fillStyle = CRE; x.font = F(800, 70); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Pendientes", 44, 68);
  const nHecho = hecho;
  x.fillStyle = VER; rr(x, TBW - 230, 34, 190, 66, 33); x.fillStyle = NAV0; x.font = F(700, 42); x.textAlign = "center"; x.fillText(nHecho ? `${nHecho} de 3` : "3", TBW - 135, 68);
  FILAS.forEach((f, i) => {
    // (ronda 1) las filas que todavía no llegaron: renglones vacíos (la pantalla nunca queda en blanco)
    if (i >= filas) { const y = 160 + i * 200; x.fillStyle = "#eceae0"; rr(x, 26, y, TBW - 52, 178, 28); x.fillStyle = "#d6d3c6"; rr(x, 60, y + 34, 64, 60, 12); rr(x, 160, y + 40, 520 - i * 60, 36, 18); rr(x, 160, y + 112, 300, 28, 14); return; }
    const y = 160 + i * 200, ok = i < hecho;
    x.fillStyle = ok ? "#e3f7d6" : "#eceae0"; rr(x, 26, y, TBW - 52, 178, 28);
    iconoTex(x, 92, y + 64, f.ico, ok ? "#3fa60a" : NAV);
    x.fillStyle = NAV0; x.textAlign = "left"; x.textBaseline = "middle";
    const t = ok ? f.hecho : f.txt; ajustar(x, t, 800, 70, ok ? 700 : 820); x.fillText(t, 150, y + 56);
    if (ok) { x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(TBW - 100, y + 89, 50, 0, 7); x.fill(); x.strokeStyle = NAV0; x.lineWidth = 14; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(TBW - 124, y + 90); x.lineTo(TBW - 106, y + 110); x.lineTo(TBW - 74, y + 70); x.stroke(); }
    if (!ok) {
      // responsable (avatar + nombre) y aviso (campanita + hora)
      if (resp > 0.5) { avatarTex(x, 190, y + 130, 30, f.quien); x.fillStyle = NAV0; x.font = F(700, 54); x.textAlign = "left"; x.fillText(f.quien, 232, y + 132); }
      else { x.fillStyle = "#c9c7bb"; x.beginPath(); x.arc(190, y + 130, 30, 0, 7); x.fill(); x.fillRect(232, y + 120, 110, 22); }
      if (aviso > 0.5) { campanita(x, 470, y + 128, 52, "#3fa60a"); x.fillStyle = NAV0; x.font = F(700, 54); x.textAlign = "left"; x.fillText(f.aviso, 508, y + 132); }
      else { x.fillStyle = "#c9c7bb"; x.fillRect(450, y + 120, 200, 22); }
    }
  });
  tabTex.needsUpdate = true;
}
dibujarTablet({ filas: 0 });
const TW2 = 0.62, TH2 = 0.465;
const tablet = new THREE.Group(); scene.add(tablet);
{
  tablet.add(mesh(rbox(TW2, TH2, 0.022, 0.03), M.navy));
  const pant = mesh(new THREE.PlaneGeometry(TW2 * 0.93, TH2 * 0.9), new THREE.MeshStandardMaterial({ map: tabTex, emissive: 0xffffff, emissiveMap: tabTex, emissiveIntensity: 0.6, roughness: 0.3 }), 0, 0, 0.012);
  tablet.add(pant); sh(tablet); pant.castShadow = false;
}
const tildesTab = [0, 1, 2].map(() => { const t = hacerTilde(0.045, M.g, M.tilde, tablet); t.visible = false; return t; });
void tildesTab;
// Rubén en la cama (el módulo de personajes; pijama a rayas crema y navy, sin delantal, ojos de dibujo al cerrar)
const ruben = crearPersonaje({ ...ELENCO.almacenero, delantal: null, delantalBorde: null, mangas: "largas", camisa: 0xffffff, parpadeoCada: 1e6, ojoDibujo: true, dedos: false });
{
  const rayas = tex(512, 64, (x, w, h) => { for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 32, 0, 32, h); } });
  rayas.wrapS = rayas.wrapT = THREE.RepeatWrapping; rayas.repeat.set(2, 1);
  const torso = ruben.cuerpo.children[0]; torso.material.map = rayas; torso.material.color.set(0xffffff); torso.material.needsUpdate = true;
}
const acostado = new THREE.Group(); acostado.add(ruben.raiz); dorm.add(acostado);
ruben.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const nube3 = hacerNube(1);
const PEND = [
  { o: hacerBillete(true), k: 0.3, p: [-0.43, 0.12], rot: [1.1, 0.2, 0.15], txt: "Seña\nGraciela" },
  { o: hacerPresupuesto(), k: 0.24, p: [0.0, 0.1], rot: [0.0, -0.15, 0.05], txt: "Presu-\npuesto" },
  { o: hacerCaja(), k: 0.24, p: [0.43, 0.1], rot: [0.35, -0.5, 0], txt: "Pedido\nproveedor" },
];
for (const it of PEND) {
  const h = new THREE.Group(); h.add(it.o); it.o.scale.setScalar(it.k); it.o.rotation.set(...it.rot); it.o.position.y = -0.06;
  nube3.userData.items.add(h); it.h = h; sh(it.o);
  // (ronda 2) rótulo debajo de cada objeto, siempre encima de todo (nada lo tapa: ni la cabeza ni la tablet)
  PX_PLACA = 100; it.placa = placa(it.txt, 0.41, "#ffffff", NAV0, ROJ); PX_PLACA = 78; it.placa.position.set(0, -0.27, 0.2); h.add(it.placa);
  it.placa.material.depthTest = false; it.placa.renderOrder = 40;
}

// ================= EL CIERRE: la nubecita vacía con un tilde =================
const nubeFin = hacerNube(1);
const tildeFin = hacerTilde(0.16, mat(C.gd, 0.5), M.white, nubeFin);
tildeFin.position.set(0, 0, 0.22);

// ================= TIEMPOS CLAVE =================
const T = {
  pedido: W[8] - 0.03, pagas: W[11] - 0.05,
  grua: S["s02-mozo"] - 0.02, todo: W[18] - 0.05, anotar: W[20] - 0.08,
  primer: S["s03-olvido"] - 0.02, pagaron: W[21], olvido: W[24] - 0.05,
  telon: S["s04-estudio"] - 0.3, lab: S["s04-estudio"], estudio: W[27], interr: W[30] - 0.05, record: W[32] - 0.05, doble: W[35] - 0.05,
  preg: S["s05-por-que"], que: W[37], armaQ: W[35] + 0.4,
  abierto0: S["s06-abierto"], abierto: W[41] - 0.05,
  plan0: S["s07-plan"], plan: W[51] - 0.05, calma: W[54] - 0.05, escribe: S["s07-plan"] + 0.45,
  noche: S["s08-noche"], sena: W[59] - 0.05, presu: W[61] - 0.05, prov: W[63] - 0.05,
  sis0: S["s09-sistema"], sistema: W[69] - 0.05, resp: W[71] - 0.05, aviso: W[73] - 0.05,
  anotado: S["s10-olvide"], olvide: W[77] - 0.05,
  dormir: S["s11-dormir"], fin: S["s12-llamada"],
};

// ================= CÁMARA =================
// PLANOS: [desde, [[t, px, py, pz, mx, my, mz, fov], ...]]; dentro de un plano, Catmull-Rom monótona; entre planos, corte.
const ol = (x, y, z) => [OL.x + x, y, z];
const od = (x, y, z) => [OD.x + x, y, z];
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const CAB = V(OL.x, 1.95, 0.0); // el centro de la cabeza del busto (= el "?")
const PLANOS = [
  [0, [
    // s01: plano medio del mozo con la bandeja y la nube; push-in lento
    k(0, [0.86, 1.8, 5.75], [1.18, 1.68, 0.42]),
    k(T.grua - 0.05, [0.88, 1.79, 5.45], [1.18, 1.68, 0.42]),
    // s02: grúa atrás y arriba: la mesa de 4 y el mozo
    k(T.grua + 0.7, [1.5, 2.45, 4.95], [1.36, 1.18, 0.1], 36),
    k(T.anotar - 0.005, [1.5, 2.42, 4.8], [1.38, 1.18, 0.1], 36),
    // "anotar": CORTE al delantal (la libreta cerrada en el bolsillo; la cara queda fuera de cuadro) con un push-in corto
    k(T.anotar, [0.6, 0.8, 2.3], [0.96, 0.66, 0.42]),
    k(T.anotar + 0.35, [0.62, 0.78, 2.05], [0.96, 0.66, 0.42]),
    k(T.primer - 0.005, [0.62, 0.78, 2.0], [0.96, 0.66, 0.42]),
    // s03: corte a primer plano del mozo con la nube llena y el platito
    k(T.primer, [1.02, 1.65, 5.2], [1.33, 1.55, 0.42]),
    k(T.primer + 0.3, [1.02, 1.65, 5.1], [1.33, 1.55, 0.42]),
    k(T.olvido, [1.02, 1.65, 4.95], [1.33, 1.55, 0.42]),
    // (ronda 2) el desinflado y la cara en blanco se ven en el mismo plano; después la cámara se zambulle en el ticket
    // del platito (ver ponerCamara) y CORTA a la hoja "37 × 48" del laboratorio con el mismo encuadre (match cut)
    k(T.lab - 0.005, [1.02, 1.63, 4.85], [1.33, 1.53, 0.42]),
  ]],
  // s04: el laboratorio: arranca encima de la hoja de la cuenta interrumpida y sube a las tareas en dos filas
  [T.lab, [
    k(T.lab, ol(0.42, 2.15, 1.05), ol(0.42, 0.86, 0.3)),
    k(T.lab + 0.6, ol(0, 5.1, 3.7), ol(0, 0.8, -0.05)),
    k(T.record - 0.1, ol(0, 4.9, 3.55), ol(0, 0.8, -0.05)),
    // las pilas: más bajo y más cerca
    k(T.record + 0.45, ol(0, 1.95, 3.45), ol(0, 1.05, 0.0), 40),
    k(T.armaQ - 0.05, ol(0, 1.97, 3.35), ol(0, 1.07, 0.0), 40),
    // s05: sube con las fichas al "?" (push-in y órbita corta)
    k(T.armaQ + 0.55, ol(-0.25, 2.05, 2.85), ol(0, 1.95, 0)),
    k(T.abierto0 - 0.4, ol(0.3, 2.0, 2.65), ol(0, 1.97, 0)),
    k(T.abierto0 + 0.02, ol(0.25, 2.05, 4.4), ol(0.15, 1.95, 0)),
    // s06: retrocede: la "C" queda dentro de la cabeza de perfil
    k(T.abierto0 + 0.42, ol(0.25, 2.25, 5.2), ol(0.2, 2.08, 0), 36),
    k(T.plan0 - 0.05, ol(0.25, 2.25, 5.0), ol(0.2, 2.08, 0), 36),
    // s07: push-in, entra la tarjeta del plan
    k(T.plan0 + 0.45, ol(0.25, 2.22, 4.7), ol(0.2, 2.05, 0), 36),
    k(T.calma - 0.1, ol(0.25, 2.22, 4.6), ol(0.2, 2.05, 0), 36),
    k(T.calma + 0.35, ol(0.2, 2.2, 4.3), ol(0.1, 2.05, 0), 36),
    k(T.noche - 0.02, ol(0.2, 2.2, 4.2), ol(0.1, 2.05, 0), 36),
  ]],
  // s08: el aro vuela a la lámpara; plano picado del dormitorio
  [T.noche, [
    // (ronda 3) el aro cerrado sale disparado hacia arriba (la cámara lo acompaña con un tilt) y CORTE al dormitorio:
    // el aro nunca cruza a Rubén y no hay cuadros vacíos de viaje; la lámpara se prende con un fundido
    k(T.noche, ol(0.2, 2.2, 4.2), ol(0.1, 2.05, 0), 36),
    k(T.noche + 0.33, ol(0.2, 2.3, 4.15), ol(0.1, 2.55, 0), 36),
    k(T.noche + 0.335, od(0.8, 1.68, 1.6), od(-0.08, 1.56, -1.45), 42),
    k(T.noche + 0.75, od(0.75, 1.66, 1.45), od(-0.08, 1.56, -1.45), 42),
    k(T.prov + 0.6, od(0.68, 1.64, 1.2), od(-0.08, 1.56, -1.5), 42),
    // s09: Rubén se sienta con la tablet (plano medio con la nube); en "responsable" push-in a la tablet
    k(T.sis0 + 0.7, od(0.75, 1.72, 1.6), od(-0.06, 1.6, -1.3), 44),
    k(T.sistema + 0.75, od(0.72, 1.72, 1.5), od(-0.06, 1.6, -1.3), 44),
    k(T.resp + 0.35, od(0.45, 1.62, 1.05), od(0.1, 1.28, -1.1), 38),
    k(T.anotado - 0.05, od(0.45, 1.62, 1.0), od(0.1, 1.28, -1.1), 38),
  ]],
  // s10: plano medio de Rubén en la cama (la tablet vuelve a la mesita)
  [T.anotado, [
    k(T.anotado, od(0.8, 1.66, 1.3), od(-0.05, 1.5, -1.45), 42),
    k(T.dormir - 0.05, od(0.72, 1.64, 1.1), od(-0.05, 1.5, -1.5), 42),
  ]],
  // s11: a la mañana: general (ventana con sol, Rubén se estira) y push-in a la tablet en la mesita (con el mate)
  [T.dormir, [
    k(T.dormir, od(0.3, 1.62, 0.95), od(0.05, 1.5, -1.6), 44),
    k(T.dormir + 0.8, od(0.27, 1.6, 0.8), od(0.05, 1.48, -1.6), 44),
  ]],
  // corte a la tablet en la mesita (con el mate al costado)
  [T.dormir + 0.82, [
    k(T.dormir + 0.82, od(-0.6, 1.5, 1.2), od(-1.0, 0.88, -1.6), 38),
    k(T.fin - 0.05, od(-0.6, 1.48, 1.08), od(-1.0, 0.88, -1.6), 38),
  ]],
  [T.fin, [
    k(T.fin, [OF.x, 1.15, 4.4], [OF.x, 0.86, 0]),
    k(DUR, [OF.x, 1.15, 4.2], [OF.x, 0.86, 0]),
  ]],
];
const _mira = new THREE.Vector3();
let plano = 0;
let PLAT_LAB = null;
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
  plano = pi;
  const K = PLANOS[pi][1];
  let i = 0; while (i + 1 < K.length - 1 && K[i + 1][0] <= t) i++;
  const a = K[i], b = K[Math.min(i + 1, K.length - 1)];
  const h = b[0] - a[0];
  const u = h > 0 ? cl((t - a[0]) / h) : 0;
  const tang = (j, c) => {
    if (j <= 0 || j >= K.length - 1) return 0;
    const p = K[j - 1], q = K[j], r = K[j + 1];
    if (q[0] - p[0] < 0.05 || r[0] - q[0] < 0.05) return 0;
    const d1 = (q[c] - p[c]) / Math.max(1e-4, q[0] - p[0]), d2 = (r[c] - q[c]) / Math.max(1e-4, r[0] - q[0]);
    if (d1 * d2 <= 0) return 0;
    const m = (r[c] - p[c]) / Math.max(1e-4, r[0] - p[0]);
    return Math.sign(m) * Math.min(Math.abs(m), 3 * Math.abs(d1), 3 * Math.abs(d2));
  };
  const s2 = u * u, s3 = s2 * u;
  const v = [];
  for (let c = 1; c <= 7; c++) {
    if (h <= 0) { v.push(a[c]); continue; }
    if (h < 0.05) { v.push(u > 0 ? b[c] : a[c]); continue; }
    v.push((2 * s3 - 3 * s2 + 1) * a[c] + (s3 - 2 * s2 + u) * h * tang(i, c) + (-2 * s3 + 3 * s2) * b[c] + (s3 - s2) * h * tang(i + 1, c));
  }
  // s03 → s04: zambullida al ticket del platito (que el mozo tiene en la mano)
  if (plano === 0 && t > T.lab - 0.5) {
    if (!PLAT_LAB) { const pl = plano; plano = 0; zonaR(T.lab - 0.4); PLAT_LAB = platito.getWorldPosition(new THREE.Vector3()); plano = pl; }
    const w = eio(sg(t, T.lab - 0.5, T.lab));
    const pos = PLAT_LAB.clone().add(V(0.0, 0.44, 0.17)), mira = PLAT_LAB.clone().add(V(0, 0.01, -0.06));
    for (let j = 0; j < 3; j++) { v[j] = lerp(v[j], pos.getComponent(j), w); v[j + 3] = lerp(v[j + 3], mira.getComponent(j), w); }
    v[6] = lerp(v[6], 34, w);
  }
  // s08: la cámara sigue al aro que vuela de la cabeza a la lámpara
  if (false) {
    const u2 = eio(sg(t, T.noche, T.noche + 0.75));
    const p = vueloAro(t);
    // arranca exactamente donde estaba la cámara del plan (sin salto) y termina en el plano del dormitorio
    // a mitad de camino la cámara se pega al aro (llena el cuadro mientras pasa de la cabeza al dormitorio)
    const u3 = eio(sg(t, T.noche, T.noche + 0.3)), u4 = eio(sg(t, T.noche + 0.35, T.noche + 0.75));
    const off = lerpV(lerpV(V(0.25, 0.18, 3.9), V(0.15, 0.25, 1.9), u3), V(1.1, 2.4, 3.35), u4);
    const w = 1 - eio(sg(u2, 0.2, 0.62));
    const pos = p.clone().add(off);
    for (let j = 0; j < 3; j++) { v[j] = lerp(v[j], pos.getComponent(j), w); v[j + 3] = lerp(v[j + 3], p.getComponent(j), w); }
  }
  camera.position.set(v[0], v[1], v[2]);
  camera.position.x += Math.sin(t * 0.7) * 0.006; camera.position.y += Math.sin(t * 0.53) * 0.005;
  _mira.set(v[3], v[4], v[5]);
  camera.fov = v[6];
  const d = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.03, d * 0.02); camera.far = 200;
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
}

// ================= EL TELÓN (s03 → s04): el mantel sube delante de la cámara =================
const telon = new THREE.Group(); camera.add(telon);
{
  const g = new THREE.PlaneGeometry(2.6, 3.4, 60, 1); const pp = g.attributes.position;
  for (let i = 0; i < pp.count; i++) pp.setZ(i, Math.sin(pp.getX(i) * 9) * 0.045);
  g.computeVertexNormals();
  // el mantel: crema con un cuadrillé navy suave (que se lea tela, no fondo liso)
  const cuad = tex(512, 512, (x, w, h) => { x.fillStyle = "#f3f1e8"; x.fillRect(0, 0, w, h); x.fillStyle = "rgba(31,50,84,0.22)"; for (let i = 0; i < 8; i++) { x.fillRect(i * 64, 0, 26, h); x.fillRect(0, i * 64, w, 26); } });
  cuad.wrapS = cuad.wrapT = THREE.RepeatWrapping; cuad.repeat.set(3, 4);
  const tm = new THREE.MeshStandardMaterial({ map: cuad, roughness: 0.85, side: THREE.DoubleSide });
  telon.add(mesh(g, tm));
  // la guarda navy y la franja verde del borde de abajo (el dobladillo que se ve subir)
  const g2 = new THREE.PlaneGeometry(2.6, 0.045, 60, 1); const p2 = g2.attributes.position;
  for (let i = 0; i < p2.count; i++) p2.setZ(i, Math.sin(p2.getX(i) * 9) * 0.045 + 0.004);
  g2.computeVertexNormals();
  telon.add(mesh(g2, mat(C.navy2, 0.7, { side: THREE.DoubleSide }), 0, -1.68, 0)); // el dobladillo: la misma guarda navy del mantel
  telon.traverse((o) => { if (o.isMesh) { o.renderOrder = 50; } });
}

// ================= ZONA R en el tiempo =================
const _v = new THREE.Vector3(), _q = new THREE.Quaternion();
function zonaR(t) {
  const en = plano === 0;
  mesa.visible = sombraMesa.visible = sobreMesa.visible = platito.visible = en;
  for (const c of COM) c.p.raiz.visible = c.silla.visible = en;
  mozo.raiz.visible = bandeja.visible = nube.visible = en;
  billeteBand.visible = en && t > T.pagas;
  if (!en) { monedas.forEach((m) => (m.visible = false)); return; }
  // ---- el mozo ----
  const cobra = sg(t, T.pagaron - 0.25, T.pagaron + 0.15);
  let pose = poseEn(t, [
    [0, { ...MZ, ...CARA.sonrisa, cejas: { alto: 0.25, ang: 0, asim: 0.5 }, cabeza: { giro: 0.32, asiente: 0.02, ladea: -0.06 }, ojos: { x: 0.45, y: 0.05, abiertos: 1, feliz: 0.25 },
      manoD: [-0.47, 0.94, 0.06], codoD: [-1, -0.2, -0.3], manoI: [0.27, -0.02, 0.12] }],
    // s02: mira a la mesa, orgulloso
    [T.grua + 0.4, { cabeza: { giro: 0.38, asiente: 0.1, ladea: 0.04 }, ojos: { x: -0.3, y: -0.2, abiertos: 1, feliz: 0.3 } }, 0.35],
    [T.todo + 0.1, { cabeza: { giro: 0.3, asiente: 0.05, ladea: -0.08 }, ...CARA.sonrisa, cejas: { alto: 0.5, ang: 0, asim: 0.6 } }, 0.3],
    // "anotar": se toca la sien con el índice (no necesita anotar)
    [T.anotar + 0.25, { cabeza: { giro: 0.25, asiente: 0.0, ladea: 0.06 }, ojos: { x: 0.4, y: 0.1, abiertos: 1, feliz: 0.3 } }, 0.3],
    // s03: baja la mano y agarra el platito
    [T.primer + 0.3, { cabeza: { giro: 0.2, asiente: 0.06, ladea: 0 }, manoI: [0.3, 0.2, 0.3], codoI: [1, -0.6, -0.2], dedoI: 0 }, 0.3],
    [T.pagaron + 0.4, { ...CARA.feliz, ojos: { x: -0.2, y: -0.4, abiertos: 0.95, feliz: 0.5 }, cabeza: { giro: 0.0, asiente: 0.2, ladea: 0.05 } }, 0.3],
    // la pausa: mira al frente, quieto
    [T.olvido - 0.1, { ...CARA.sonrisa, ojos: { x: 0.1, y: 0.0, abiertos: 1, feliz: 0.2 }, cabeza: { giro: 0.25, asiente: 0.02, ladea: 0 } }, 0.3],
    // "olvidó": la cara en blanco (cejas altas, ojos redondos, boquita "o")
    [T.olvido + 0.1, { ojos: { x: 0, y: 0.1, abiertos: 1, feliz: 0, tension: 0 }, cejas: { alto: 1, ang: 0.1, asim: 0 }, boca: { sonrisa: 0, abierta: 0.3, ancho: 0.55 }, cabeza: { giro: 0.12, asiente: -0.04, ladea: 0.1 } }, 0.12],
  ]);
  // parpadeo rápido en el olvido (ojos abiertos antes y después)
  // (ronda 1: sin parpadeo; la cara en blanco queda con los ojos bien abiertos)
  // levanta el platito con la izquierda en "Pagaron"
  if (t > T.primer) {
    mozo.poner(pose); mozo.raiz.updateMatrixWorld(true);
    const enMesa = mozo.cuerpo.worldToLocal(PLAT0.clone().add(V(0, 0.07, 0)));
    const alto = [0.2, 0.34, 0.36];
    void enMesa; void cobra; // (final) el platito ya está en la mano desde el corte (sin agarrarlo de la mesa)
    pose = { ...pose, manoI: alto, codoI: [1, -0.6, -0.2], dedoI: 0 };
  }
  pose.t = t;
  mozo.poner(pose); mozo.raiz.updateMatrixWorld(true);
  // la bandeja en la palma derecha
  // (ronda 1) la bandeja va arriba y al costado de la cabeza: apoyada en la punta de la mano, el centro afuera del hombro
  const mD = mozo.mano("D").getWorldPosition(new THREE.Vector3());
  // la mano levantada termina en la palma (~0,12 arriba de la muñeca): la bandeja se apoya ahí
  bandeja.position.copy(mD).add(V(-0.03, 0.118, 0)); bandeja.rotation.set(0, 0.4, 0);
  // el billete cae doblado sobre la bandeja en "pagás"
  {
    const u = eio(sg(t, T.pagas, T.pagas + 0.35));
    bandeja.updateMatrixWorld(true);
    const p = bandeja.localToWorld(V(0.02, 0.022, 0.13)).add(V(0, (1 - u) * 0.5, (1 - u) * 0.3)).add(V(0, rebote(t, T.pagas + 0.35, 14, 30, 0.012), 0));
    billeteBand.position.copy(p); billeteBand.rotation.set((1 - u) * 0.9 + Math.sin(t * 18) * 0.25 * (1 - u), 0.3 + (1 - u) * 2.0, (1 - u) * 0.5);
    billeteBand.visible = billeteBand.visible && t < T.primer;
  }
  // el platito: en la mesa hasta que lo agarra; después en la mano izquierda
  {
    const mI = mozo.mano("I").getWorldPosition(new THREE.Vector3());
    const agarra = t >= T.primer;
    if (agarra) { platito.position.copy(mI).add(V(0, 0.075, 0.03)); platito.rotation.set(0.15, -0.3, 0); }
    else { platito.position.copy(PLAT0); platito.rotation.set(0, -0.35, 0); }
    // las monedas caen de a una en el platito ("Pagaron…")
    monedas.forEach((m, i) => {
      const t0 = T.pagaron + 0.04 + i * 0.07;
      m.visible = t > t0 && t < T.telon + 0.35;
      if (!m.visible) return;
      platito.updateMatrixWorld(true);
      const dest = platito.localToWorld(V(-0.04 + (i % 3) * 0.03, 0.03 + Math.floor(i / 3) * 0.008, 0.03 - (i % 2) * 0.03));
      const u = sg(t, t0, t0 + 0.16);
      m.position.copy(dest).add(V(0, (1 - u * u) * 0.13, (1 - u) * 0.08)); m.position.y += rebote(t, t0 + 0.16, 20, 50, 0.01);
      m.rotation.set((1 - u) * 1.5 + 0.1, i, 0.05);
      // "olvidó": las monedas siguen ahí (cobró), pero la nube se va
    });
  }
  // ---- la nube: arriba a la derecha de la cabeza, con la cola hacia la sien ----
  {
    mozo.cabeza.getWorldPosition(_v);
    const sobre = _v.clone().add(V(0.66, 0.44, 0.05));
    const crece = 1 + 0.1 * eio(sg(t, T.todo, T.todo + 0.35));
    const des = eio(sg(t, T.olvido, T.olvido + 0.35));
    ponerNube(nube, t, { infla: 1 - des, arruga: pulso(t, T.pagas, 0.5) * 0.5 + (des > 0 && des < 1 ? 0.8 : 0), late: 0.6 });
    nube.position.copy(sobre).add(V(rebote(t, T.pagas + 0.05, 9, 40, 0.025), 0, 0));
    nube.quaternion.copy(camera.quaternion);
    nube.scale.setScalar(0.58 * crece * (1 + 0.06 * pulso(t, T.pedido, 0.3)));
    nube.visible = des < 0.985;
    PED.forEach((it, i) => {
      const t0 = it.extra ? T.todo : T.pedido + i * 0.08;
      const en = it.extra ? t > t0 : true;
      const pop = it.extra ? popIn(t, t0, 0.25) : 1 + 0.25 * pulso(t, t0, 0.28);
      const kk = en ? pop * (1 - des) : 0;
      it.h.visible = kk > 0.01;
      it.h.position.set(it.p[0] * lerp(0.16, 1, 1 - des), it.p[1] * lerp(0.16, 1, 1 - des), 0.02);
      it.h.scale.setScalar(kk);
      it.o.rotation.y = it.ry + Math.sin(t * 1.4 + i) * 0.15;
      // (ronda 2) los rótulos se van CON la nube (son hijos de cada objeto: se achican con el desinflado)
      if (it.placa) { const vp = t > T.todo; it.placa.visible = vp; if (vp) it.placa.scale.setScalar(popIn(t, T.todo + i * 0.07, 0.25)); }
    });
    placaMesa.visible = t > T.pedido + 0.15;
    if (placaMesa.visible) placaMesa.scale.setScalar(popIn(t, T.pedido + 0.15, 0.25) * (1 - des)); placaMesa.visible = placaMesa.visible && des < 0.6;
  }
  // ---- comensales ----
  COM.forEach((c, j) => {
    const mira = Math.sin(t * 0.8 + j * 1.7) * 0.1;
    const pose = mezclar({ x: c.x, y: -0.11, z: c.z, giro: c.giro, ...CARA.sonrisa, manoI: [0.2, 0.3, 0.42], manoD: [-0.2, 0.3, 0.42], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2], cabeza: { giro: mira + (j === 1 ? -0.3 : j === 0 ? 0.3 : 0), asiente: 0.08, ladea: 0 }, ojos: { x: j === 1 ? -0.3 : 0.3, y: -0.05, abiertos: 1 } }, CARA.feliz, j % 2 ? 0.4 : 0);
    pose.t = t + j; c.p.poner(pose); sentar(c.p);
  });
}

// ================= ZONA L en el tiempo =================
function zonaL(t) {
  const en = plano === 1;
  lab.visible = sombraLab.visible = en && t < T.abierto0 - 0.05;
  const tareasV = en && t < T.record + 0.45;
  TAREAS.forEach(({ o, i, fila }) => {
    const t0 = fila === 1 && i === 2 ? T.lab - 0.5 : T.lab + 0.12 + fila * 0.12 + i * 0.05;
    // en "recordaban" cada tarea se aplana y vuela a su pila (las terminadas a la gris, las interrumpidas a la verde)
    const u = eio(sg(t, T.record + i * 0.04, T.record + 0.35 + i * 0.04));
    const k0 = tareasV && t > t0 - 0.1 ? popIn(t, t0, 0.25) * (1 - u) : 0;
    ocultar(o, k0);
    if (!o.visible) return;
    const base = V(OL.x + TZ[fila], LTOP, TX[i]);
    const dest = V(OL.x + PILX[fila], LTOP + 0.3, 0);
    o.position.copy(lerpV(base, dest, u)); o.position.y += Math.sin(Math.PI * u) * 0.3;
    o.rotation.set(0, (i - 1.5) * 0.15 + u * 2, 0);
    if (i >= 2) o.rotation.x = 0.4 * (1 - u); // las hojas se paran un poco hacia la cámara
    o.scale.multiplyScalar(1.15);
    if (i === 2 || i === 3) o.position.y += 0.06;
  });
  // tildes grises en las terminadas; cortes verdes en las interrumpidas
  [0, 1, 2, 3].forEach((i) => {
    const tg = T.lab + 0.55 + i * 0.07;
    const vt = tareasV && t > tg && t < T.record;
    ocultar(tildesGris[i], vt ? popIn(t, tg, 0.22) : 0);
    if (tildesGris[i].visible) { tildesGris[i].position.set(OL.x - 0.02, LTOP + 0.25, TX[i] - 0.05); tildesGris[i].quaternion.copy(camera.quaternion); }
    const tc = T.interr + i * 0.09;
    const vc = tareasV && t > tc && t < T.record;
    cortes[i].visible = vc;
    if (vc) {
      const kk = popIn(t, tc, 0.22);
      // dónde quedó cada una: arriba del hilo, en el corte del barquito, en el renglón del resultado, en la mitad del jarrón
      const [dx, dy, dz, rot, sy] = [[0, 0.3, 0.02, Math.PI / 2, 0.55], [0.0, 0.24, 0.05, 0, 0.75], [0.08, 0.1, 0.14, Math.PI / 2, 0.45], [0.02, 0.1, 0.0, 0, 0.75]][i];
      cortes[i].position.set(OL.x + TZ[1] + dx, LTOP + dy, TX[i] + dz); cortes[i].quaternion.copy(camera.quaternion); cortes[i].rotateZ(rot);
      cortes[i].scale.set(kk * 1.1, kk * sy, 1);
    }
  });
  // las fichas: llueven en las pilas desde "recordaban"; la verde llega a casi el doble en "doble"
  const sube = eio(sg(t, T.armaQ, T.armaQ + 0.4)); // las verdes se juntan en el "?" (en la pausa después de "doble")
  fichas.forEach((pila, kk) => pila.forEach((m, i) => {
    const t0 = kk === 0 ? T.record + 0.25 + i * 0.045 : T.record + 0.25 + i * ((T.doble - T.record - 0.3) / NF[1]);
    let vis = en && t > t0 && t < T.armaQ + 0.45;
    if (kk === 0 && t > T.armaQ + 0.25) vis = false;
    m.visible = vis; if (!vis) return;
    const yF = LTOP + FH * (i + 0.5);
    const u = sg(t, t0, t0 + 0.12);
    const y = lerp(yF + 0.6, yF, u * u) + rebote(t, t0 + 0.12, 18, 40, 0.012);
    let p = V(OL.x + PILX[kk] + Math.sin(i * 2.3 + kk) * 0.012, y, Math.cos(i * 1.7 + kk) * 0.01);
    let ry = Math.sin(i * 1.3) * 0.08;
    if (kk === 1 && sube > 0) {
      const dest = QC.clone().add(V(Math.sin(i * 2.1) * 0.25, Math.cos(i * 1.3) * 0.3, 0));
      p = lerpV(p, dest, sube); ry += sube * 3;
      m.scale.setScalar(1 - sube * 0.9);
    } else m.scale.setScalar((1 + (kk === 1 ? 0.12 * pulso(t, T.doble, 0.3) : 0)) * (kk === 0 ? 1 - eio(sg(t, T.armaQ - 0.02, T.armaQ + 0.25)) : 1));
    m.position.copy(p); m.rotation.set(0, ry, 0);
  }));
  // las placas de las pilas (adelante, en el canto de la mesa)
  placaPila.forEach((pl, kk) => {
    const v = en && t > T.record + 0.35 && t < T.armaQ + 0.25;
    pl.visible = v; if (!v) return;
    pl.position.set(OL.x + PILX[kk], LTOP + 0.12, 0.36); pl.quaternion.copy(camera.quaternion);
    pl.scale.setScalar(Math.max(0.001, popIn(t, T.record + 0.35 + kk * 0.1, 0.25) * 0.98 * (1 - eio(sg(t, T.armaQ - 0.02, T.armaQ + 0.25)))));
  });
  // ---- el "?" (s05) → la "C" (s06) ----
  {
    const v = en && t > T.armaQ + 0.2 && t < T.abierto0 + 0.04;
    const kq = popIn(t, T.armaQ + 0.25, 0.32) * (1 + 0.08 * pulso(t, T.que, 0.3)) * (1 - eio(sg(t, T.abierto0 - 0.12, T.abierto0 + 0.04)));
    ocultar(pregunta, v ? kq : 0);
    pregunta.position.copy(QC); pregunta.rotation.set(0, Math.sin((t - T.armaQ) * 1.8) * 0.25, eio(sg(t, T.abierto0 - 0.16, T.abierto0 + 0.02)) * 1.6);
  }
  {
    const v = en && t > T.abierto0 - 0.03;
    const cierra = eio(sg(t, T.calma, T.calma + 0.35));
    const arcF = lerp(0.76, 1, cierra);
    aroC.geometry = aroGeo(arcF);
    const kc = v ? popIn(t, T.abierto0 - 0.03, 0.22) * (1 + 0.15 * pulso(t, T.calma + 0.3, 0.3)) : 0;
    ocultar(aroC, kc);
    // gira sobre sí mismo sin cerrarse (el hueco siempre visible); al cerrarse, se queda quieto
    const giro = (t - T.abierto0) * (1 - cierra) * 2.4 + Math.PI * 0.62;
    aroC.position.copy(CAB).add(V(-0.08, 0.16, 0.33)); aroC.rotation.set(0, 0, giro);
    aroC.material.emissiveIntensity = 0.2 + 0.5 * pulso(t, T.calma + 0.25, 0.5);
    // las puntas redondeadas de la "C"
    const R0 = 0.23, a1 = giro, a2 = giro + Math.PI * 2 * Math.round(arcF * 60) / 60;
    capas.forEach((c, j) => { c.visible = aroC.visible && arcF < 0.999; if (!c.visible) return; const a = j ? a2 : a1; c.position.copy(aroC.position).add(V(Math.cos(a) * R0 * kc, Math.sin(a) * R0 * kc, 0)); c.scale.setScalar(kc); });
  }
  // ---- el busto (aparece alrededor de la "C" cuando la cámara retrocede) ----
  {
    // (sigue en cuadro al arrancar s08: la cámara se aleja con el aro, la cabeza no desaparece de golpe)
    const sigue = en || (plano === 2 && t < T.noche + 0.6);
    const kb = sigue && t > T.abierto0 - 0.03 ? popIn(t, T.abierto0 - 0.03, 0.16) : 0;
    busto.visible = pedestal.visible = kb > 0.01;
    busto.position.copy(CAB); busto.scale.setScalar(Math.max(0.01, kb));
    busto.rotation.set(0, 0, 0);
    pedestal.position.set(CAB.x - 0.02, CAB.y - 1.2 - 0.54, 0); pedestal.scale.setScalar(Math.max(0.01, kb));
    // el plano de corte sigue a la cámara (la mitad de adelante se va)

  }
  // la nube vacía arriba de la cabeza, latiendo (s06-s07); en "calma" se achica tranquila
  {
    const v = (en || (plano === 2 && t < T.noche + 0.6)) && t > T.abierto + 0.0;
    const kn = v ? popIn(t, T.abierto, 0.3) : 0;
    const achica = eio(sg(t, T.calma + 0.1, T.calma + 0.7));
    ponerNube(nube2, t, { infla: lerp(1, 0.55, achica), late: 1.2 * (1 - achica) });
    nube2.visible = kn > 0.01;
    nube2.position.copy(CAB).add(V(0.5, 0.78, 0.05)); nube2.quaternion.copy(camera.quaternion);
    nube2.scale.setScalar(kn * 0.6 * (1 + 0.05 * Math.sin(t * 6) * (1 - achica)));
    // la caja adentro de la nube; entre "plan" y "despeja" vuela a la tarjeta y se mete en ella
    nube2.updateMatrixWorld(true);
    const enNube = nube2.localToWorld(V(0, 0.02, 0.25));
    const enPlan = plan.position.clone().add(V(0.25, 0.05, 0.1));
    const va = eio(sg(t, T.plan - 0.1, T.plan + 0.45));
    const kc2 = kn * (va < 1 ? 1 : 1 - eio(sg(t, T.plan + 0.45, T.plan + 0.65)));
    ocultar(cajaPlan, nube2.visible && kc2 > 0.01 ? kc2 * lerp(0.3, 0.2, va) : 0);
    if (cajaPlan.visible) { cajaPlan.position.copy(arco(enNube, enPlan, va, 0.15)); cajaPlan.rotation.set(0.35, -0.5 + va * 2.5 + Math.sin(t * 1.5) * 0.15, 0); }
  }
  // la tarjeta del plan: entra delante de la cabeza, se escriben los renglones, en "calma" se corre al costado
  {
    const t0 = T.plan0 + 0.05;
    const v = en && t > t0;
    const entra = eio(sg(t, t0, t0 + 0.4));
    const corre = eio(sg(t, T.calma - 0.15, T.calma + 0.3));
    const kp = v ? popIn(t, t0, 0.35) : 0;
    ocultar(plan, kp * 0.72);
    plan.position.copy(CAB).add(V(lerp(0.45, 0.08, entra) + corre * 2.6, lerp(-0.74, -0.5, entra) - corre * 0.2, 0.9));
    plan.rotation.set(-0.08, lerp(-0.5, -0.1, entra), lerp(0.15, 0.03, entra));
    if (corre > 0.97) plan.visible = false; // sale entera por el borde derecho (sin quedar como una mota)
    // los renglones: letra por letra desde "plan" (los tres antes de "calma")
    const total = RENG.reduce((s, [a, b]) => s + a.length + 1 + b.length, 0);
    const n = Math.floor(total * sg(t, T.escribe, T.calma - 0.2));
    dibujarPlan(n);
    let acum = 0;
    tildesPlan.forEach((tk, i) => {
      acum += RENG[i][0].length + 1 + RENG[i][1].length;
      const tt = T.escribe + (acum / total) * (T.calma - 0.2 - T.escribe);
      ocultar(tk, n >= acum ? popIn(t, tt, 0.2) : 0);
      tk.position.set(PW / 2 - 0.12, PH / 2 - (210 + i * 160) / 672 * PH, 0.03);
    });
  }
}
// el aro de la cabeza vuela a la lámpara del dormitorio (s08)
const LAMPW = () => { aroLamp.updateWorldMatrix(true, false); return aroLamp.getWorldPosition(new THREE.Vector3()); };
let LAMP_POS = null;
function vueloAro(t) {
  const u = sg(t, T.noche, T.noche + 0.27);
  return CAB.clone().add(V(-0.08, 0.16 + 2.4 * u * u, 0.33 + 0.3 * u));
}
void LAMPW;
const aroVuela = mesh(new THREE.TorusGeometry(0.23, 0.068, 18, 64), M.g); scene.add(aroVuela);

// ================= ZONA D en el tiempo =================
function zonaD(t) {
  const en = plano >= 2 && plano <= 5;
  dorm.visible = en;
  // el aro que vuela
  {
    const v = plano === 2 && t < T.noche + 0.333;
    aroVuela.visible = v;
    if (v) {
      const u = eio(sg(t, T.noche, T.noche + 0.75));
      aroVuela.position.copy(vueloAro(t));
      aroVuela.scale.setScalar(1);
      aroVuela.rotation.set(sg(t, T.noche, T.noche + 0.33) * 0.8, 0, 0);
    }
  }
  const lampOn = t > T.noche + 0.33;
  aroLamp.visible = true;
  // s10: en "olvidé" apaga la lámpara (baja un poco, nunca a negro); s11: amanece
  const apaga = eio(sg(t, T.olvide + 0.55, T.olvide + 0.8));
  const manana = eio(sg(t, T.dormir, T.dormir + 0.4)); // (final) fundido noche → día de 0,4 s
  pantalla.material.emissiveIntensity = lampOn ? lerp(0.9, 0.15, apaga) * (1 - manana) + 0.05 : 0.05;
  lampara.intensity = en && lampOn ? lerp(3.2, 0.8, apaga) * (1 - manana * 0.8) * eio(sg(t, T.noche + 0.4, T.noche + 0.7)) : 0;
  if (en) { mesita.userData.lamp.getWorldPosition(_v); lampara.position.copy(_v).add(V(0, 0.42, 0.05)); }
  ventanaVidrio.color.set(C.navy2).lerp(new THREE.Color(0xa9d8f2), manana);
  ventanaVidrio.emissive.set(C.navy2).lerp(new THREE.Color(0x9fd2ef), manana);
  luna.visible = luna.userData.mordida.visible = manana < 0.5; estrellas.forEach((e) => (e.visible = manana < 0.5));
  sol2.visible = manana > 0.5;
  // el despertador tiembla un poco con el tic-tac (de noche)
  despertador.rotation.z = en && t < T.olvide + 0.6 ? Math.sin(t * 25) * 0.015 : 0;
  campanas.rotation.z = en && t < T.olvide + 0.6 ? Math.sin(t * 12.5) * 0.03 : 0;
  if (!en) { nube3.visible = tablet.visible = false; vapor.forEach((m) => (m.visible = false)); return; }
  // ---- Rubén (ronda 1): recostado en dos almohadas contra el respaldo (no boca arriba), la cara hacia la cámara baja
  // de los pies; s09: se sienta (0,7 s) y la tablet llega por afuera del cuerpo; s10: vuelve a recostarse ----
  const sienta = eio(sg(t, T.sis0 - 0.15, T.sis0 + 0.55)) * (1 - eio(sg(t, T.anotado - 0.05, T.anotado + 0.65)));
  const acomoda = eio(sg(t, T.olvide + 0.25, T.olvide + 0.8));
  const estira = eio(sg(t, T.dormir + 0.35, T.dormir + 0.85)) * (1 - eio(sg(t, T.fin - 0.4, T.fin)));
  const rec = 0.74 + sienta * 0.4 - acomoda * 0.12 + estira * 0.12;
  // el pivote de acostado es la cadera (pose.y = -0,56); la cabeza queda siempre sobre la almohada de arriba
  acostado.position.set(CAMA.x, CAMA.colchon + 0.14, CAMA.z0 + 0.4 + 0.82 * Math.cos(rec));
  acostado.rotation.set(rec - Math.PI / 2, 0, 0);
  const piernaRot = -rec;
  let pr = poseEn(t, [
    [0, { x: 0, y: -0.56, z: 0, giro: 0, ...CARA.neutra, ojos: { x: 0.15, y: 0.0, abiertos: 1 }, cejas: { alto: 0.45, ang: 0.7 }, boca: { sonrisa: -0.35, abierta: 0, ancho: 0.85 }, cabeza: { giro: 0.28, asiente: 0.5, ladea: -0.05 },
      manoI: [0.17, 0.14, 0.3], manoD: [-0.17, 0.14, 0.3], codoI: [0.9, -0.2, -0.3], codoD: [-0.9, -0.2, -0.3], respira: 0.6 }],
    [T.sena, { ojos: { x: -0.45, y: 0.25, abiertos: 1 }, cabeza: { giro: 0.18, asiente: 0.42, ladea: -0.08 } }, 0.25],
    [T.presu, { ojos: { x: 0.45, y: 0.25, abiertos: 1 }, cabeza: { giro: 0.38, asiente: 0.42, ladea: 0.04 }, cejas: { alto: 0.6, ang: 0.85 } }, 0.25],
    // "proveedor": abre más los ojos (no duerme), mira a cámara
    [T.prov + 0.25, { ojos: { x: 0.1, y: 0.0, abiertos: 1 }, cejas: { alto: 0.95, ang: 0.6 }, boca: { sonrisa: -0.5, abierta: 0.12, ancho: 0.8 }, cabeza: { giro: 0.3, asiente: 0.5, ladea: 0 } }, 0.25],
    // s09: agarra la tablet con las dos manos (los brazos suben cuando la tablet ya está adelante)
    [T.sis0 + 0.7, { ...CARA.neutra, ...BRAZOS.ofrece(0.58, 0.24, 0.52), cabeza: { giro: 0.1, asiente: 0.42, ladea: 0 }, ojos: { x: 0, y: -0.5, abiertos: 1 }, cejas: { alto: 0.2, ang: 0.2 } }, 0.4],
    [T.resp, { ...CARA.sonrisa, ojos: { x: 0, y: -0.5, abiertos: 1, feliz: 0.2 } }, 0.3],
    // s10: deja la tablet, sonríe debajo del bigote mirando a cámara, se acomoda
    [T.anotado - 0.01, { ...BRAZOS.ofrece(0.58, 0.24, 0.52) }, 0.01],
    [T.anotado + 0.4, { ...CARA.sonrisa, manoI: [0.17, 0.14, 0.3], manoD: [-0.17, 0.14, 0.3], codoI: [0.9, -0.2, -0.3], codoD: [-0.9, -0.2, -0.3], cabeza: { giro: 0.3, asiente: 0.5, ladea: 0.05 }, ojos: { x: 0.1, y: 0.0, abiertos: 1, feliz: 0.15 } }, 0.4],
    [T.olvide + 0.2, { ...CARA.sonrisa, cabeza: { giro: 0.28, asiente: 0.48, ladea: 0.1 }, ojos: { x: 0.1, y: 0.0, abiertos: 1, feliz: 0.3 } }, 0.25],
    // recién después de apagar la luz cierra los ojos (ojos de dibujo: una línea curva, sin bultos)
    [T.olvide + 0.95, { ojos: { abiertos: 0, feliz: 0.4 }, boca: { sonrisa: 0.9, abierta: 0, ancho: 1.05 } }, 0.25],
    // s11: a la mañana se estira descansado
    [T.dormir + 0.4, { ...CARA.feliz, ojos: { abiertos: 0.9, feliz: 0.5 }, cabeza: { giro: 0.2, asiente: 0.4, ladea: 0 } }, 0.3],
  ]);
  if (estira > 0) pr = { ...pr, manoI: mezclar(pr.manoI, [0.34, 0.98, 0.0], estira), manoD: mezclar(pr.manoD, [-0.34, 0.98, 0.0], estira), codoI: [1, 0, 0.3], codoD: [-1, 0, 0.3], boca: { sonrisa: 0.6, abierta: 0.55 * estira, ancho: 0.8 } };
  // la boca en "Anotado. Ya me olvidé." (la dice él)
  const hab = (t > T.anotado && t < W[74] + 0.62) || (t > W[75] && t < W[77] + 0.45);
  if (hab) pr.boca = { ...pr.boca, abierta: 0.08 + 0.3 * Math.abs(Math.sin((t - T.anotado) * 13)) };
  pr.t = t;
  ruben.poner(pr);
  { const esc = ruben.raiz.children[0]; esc.children[0].rotation.x = piernaRot; esc.children[1].rotation.x = piernaRot; }
  ruben.raiz.updateMatrixWorld(true);
  // ---- la nube de Rubén (LA MISMA): arriba del respaldo, a la derecha de su cabeza ----
  {
    ruben.cabeza.getWorldPosition(_v);
    // de noche, arriba del respaldo a la derecha de la cabeza; sentado (s09) sube un poco para no taparle la cara
    const sube = sienta;
    // (ronda 2) arriba a la izquierda de la cabeza, con aire (no se mete en la cabeza); la cola apunta a la sien
    let base = lerpV(V(OD.x + CAMA.x - 0.2, 1.9, PARED_Z + 0.6), V(OD.x + CAMA.x - 0.22, 2.06, PARED_Z + 0.6), sube);
    if (t >= T.anotado) base = V(OD.x + CAMA.x - 0.5, 1.92, PARED_Z + 0.6);
    // en el push-in a la tablet la nube (ya vacía) se achica y se arrima arriba de la cabeza (que no quede cortada en el borde)
    const chica = eio(sg(t, T.resp, T.resp + 0.35)) * (t >= T.anotado ? 0 : 1);
    base = lerpV(base, V(OD.x + CAMA.x - 0.2, 1.62, PARED_Z + 0.45), chica);
    const v = t > T.noche + 0.85 && t < T.olvide + 0.6;
    const kn = v ? popIn(t, T.noche + 0.85, 0.35) : 0;
    const vac = eio(sg(t, T.sistema, T.sistema + 0.9)); // los pendientes se van a la tablet
    const des = eio(sg(t, T.olvide, T.olvide + 0.45));
    ponerNube(nube3, t, { infla: 1 - des, arruga: des > 0 && des < 1 ? 0.8 : 0.25 * pulso(t, T.prov, 0.5), late: 0.7 * (1 - vac) });
    nube3.visible = kn > 0.01 && des < 0.985;
    nube3.position.copy(base); nube3.quaternion.copy(camera.quaternion);
    const vuelve = t >= T.anotado ? popIn(t, T.anotado + 0.05, 0.3) : 1;
    nube3.scale.setScalar(Math.max(0.001, kn * 0.6 * (1 - chica) * vuelve));
    if (chica > 0.98) nube3.visible = false;
    const llegan = [T.sena, T.presu, T.prov];
    PEND.forEach((it, i) => {
      const t0 = llegan[i];
      const ki = t > t0 ? popIn(t, t0, 0.28) : 0;
      // en "sistema" salen de la nube y vuelan a la pantalla de la tablet (uno por uno)
      const ts = T.sis0 + 0.3 + i * 0.3, uv = eio(sg(t, ts, ts + 0.4));
      it.h.visible = ki > 0.01 && uv < 0.98;
      it.h.scale.setScalar(ki * (1 - uv * 0.7));
      if (uv > 0) {
        tablet.updateMatrixWorld(true);
        const dest = tablet.localToWorld(V(0, TH2 / 2 - 0.12 - i * 0.12, 0.05));
        const loc = nube3.worldToLocal(dest.clone());
        it.h.position.copy(lerpV(V(it.p[0], it.p[1], 0.02), loc, uv));
      } else it.h.position.set(it.p[0], it.p[1], 0.02);
      it.o.rotation.y = it.rot[1] + Math.sin(t * 1.3 + i) * 0.15;
    });
  }
  // ---- la tablet: en la mesita, en las manos de Rubén (s09), de vuelta a la mesita (s10) y a la mañana con las tildes ----
  {
    tablet.visible = true;
    const enMesa = { p: V(OD.x + MESITA.x - 0.04, MESITA.y + 0.024, MESITA.z + 0.1), r: new THREE.Euler(-Math.PI / 2 + 0.0, 0, 0.25) };
    // a la mañana queda apoyada en el atril invisible del mate: inclinada hacia la cámara
    const enMesaM = { p: V(OD.x + MESITA.x - 0.15, MESITA.y + 0.2, MESITA.z + 0.12), r: new THREE.Euler(-0.35, 0.3, 0) };
    const a = eio(sg(t, T.sis0 + 0.0, T.sis0 + 0.7)), b = t >= T.anotado ? 1 : 0;
    const mI = ruben.mano("I").getWorldPosition(new THREE.Vector3()), mD = ruben.mano("D").getWorldPosition(new THREE.Vector3());
    const enManos = mI.clone().add(mD).multiplyScalar(0.5).add(V(0.0, 0.05, 0.03));
    // arco por AFUERA del cuerpo: de la mesita sube, pasa por delante del pecho (lado de la cámara) y baja a las manos
    const MID = V(OD.x + CAMA.x - 0.35, 1.55, CAMA.z0 + 1.0);
    const bez = (A, B, u) => A.clone().multiplyScalar((1 - u) * (1 - u)).add(MID.clone().multiplyScalar(2 * u * (1 - u))).add(B.clone().multiplyScalar(u * u));
    // a la vuelta baja por debajo del pecho (no cruza la cara)
    const MID2 = V(OD.x + CAMA.x - 0.45, 1.05, CAMA.z0 + 1.0);
    const p = b > 0 ? enManos.clone().multiplyScalar((1 - b) * (1 - b)).add(MID2.clone().multiplyScalar(2 * b * (1 - b))).add(enMesa.p.clone().multiplyScalar(b * b)) : bez(enMesa.p, enManos, a);
    const qm = new THREE.Quaternion().setFromEuler(enMesa.r);
    const qh = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(camera.position, enManos, V(0, 1, 0)));
    const qr = qm.clone().slerp(qh, a).slerp(qm, b);
    tablet.position.copy(p); tablet.quaternion.copy(qr);
    if (plano >= 4) { tablet.position.copy(enMesaM.p); tablet.quaternion.setFromEuler(enMesaM.r); }
    const filas = t < T.sis0 + 0.68 ? 0 : t < T.sis0 + 0.98 ? 1 : t < T.sis0 + 1.28 ? 2 : 3;
    const hecho = plano >= 4 ? (t > T.dormir + 1.1 ? 1 : 0) + (t > T.dormir + 1.35 ? 1 : 0) + (t > T.dormir + 1.6 ? 1 : 0) : 0;
    dibujarTablet({ filas: plano >= 4 ? 3 : filas, resp: t > T.resp ? 1 : 0, aviso: t > T.aviso ? 1 : 0, hecho });
  }
  // ---- el vapor del mate (s11) ----
  {
    mate.getWorldPosition(_v);
    vapor.forEach((m, i) => {
      const fase = ((t * 0.55 + i / vapor.length) % 1);
      m.visible = plano >= 4;
      if (!m.visible) return;
      m.position.copy(_v).add(V(Math.sin(fase * 6 + i) * 0.025, 0.3 + fase * 0.35, 0));
      m.scale.setScalar(0.6 + fase * 1.2);
      m.material.opacity = 0.55 * Math.sin(Math.PI * fase);
    });
  }
}

// ================= EL CIERRE =================
function zonaFin(t) {
  const v = plano === 6;
  nubeFin.visible = v;
  if (!v) return;
  ponerNube(nubeFin, t, { infla: 1, late: 0.4 });
  nubeFin.position.set(OF.x, 0.42 + Math.sin(t * 2.2) * 0.03, 0);
  nubeFin.rotation.set(0.05, 0.35 * Math.sin((t - T.fin) * 1.6), 0);
  nubeFin.scale.setScalar(popIn(t, T.fin - 0.02, 0.3) * 0.92);
}

// ================= ESCENA EN EL TIEMPO =================
function renderAt(t) {
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  // el telón: el mantel sube delante de la cámara (tapa el corte del restaurante al laboratorio)
  {
    const u = sg(t, T.telon, T.lab + 0.32);
    telon.visible = false && u > 0 && u < 1; // (ronda 2: sin telón; la transición es el match cut ticket → hoja)
    telon.position.set(0, lerp(-3.4, 3.5, eio(u)), -1.2);
    telon.rotation.set(0, 0, Math.sin(u * Math.PI) * 0.04);
  }
  const zona = plano === 0 ? V(0.4, 0, 0) : plano === 1 ? OL : plano === 6 ? OF : OD;
  sol.position.copy(zona).add(V(-3.0, 7, 6)); sol.target.position.copy(zona);
  const r = 3.2;
  Object.assign(sol.shadow.camera, { left: -r, right: r, top: r, bottom: -r, near: 0.5, far: 30 }); sol.shadow.camera.updateProjectionMatrix();
  const enD = plano >= 2 && plano <= 5;
  const noche = enD && plano < 4;
  sol.intensity = noche ? 0.9 : 1.5;
  key.intensity = noche ? 0.95 : plano === 6 ? 1.8 : 2.0;
  fill.intensity = noche ? 0.85 : 1.05;
  zonaR(t);
  zonaL(t);
  zonaD(t);
  zonaFin(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
