// Capa 3D de por-que-caminar-mas (Three.js r170 local). Base técnica: reels/por-que-te-llaman (luces, entorno PMREM,
// cámara Catmull-Rom/Hermite con límite monótono, TextGeometry de Lexend 800, la oficina vidriada de Rubén arriba del
// depósito); personajes de reels/abren-hoy (ELENCO.ruben, el de la distribuidora; ELENCO.clienta = Graciela).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Fondo CREMA liso (#efeee5, lo pone el HTML): el canvas es transparente.
// Zonas (x):
//   A/B (0): el pasillo del aeropuerto (z -38..0, Rubén camina hacia +z) y el hall con la cinta de valijas (z 7).
//   M (100): el libro abierto con la maqueta pop-up del aeropuerto; el reloj de arena y el reloj de "?" salen de la página.
//   O (-60): la oficina vidriada de Rubén arriba del depósito (s07 y s10).
//   F (200): el cierre verde (el mate de Rubén humeando).
// Ningún aeropuerto, aerolínea ni marca real: pasillo, cinta, valijas, teléfono y chat genéricos. Maister y el NYT
// NO se dibujan (solo el crédito en texto).
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800c.js"; // 0-9 . , ? ! × + % c a s i m n u l h (partes/fuente3d.py)
import { crearPersonaje, ELENCO, poseEn, CARA, BRAZOS, crearMate, crearTermo, pegarACamara } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
import { BOCA } from "./boca.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('500 60px "IBM Plex Mono"')]);

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
const popIn = (t, a, d = 0.28) => (t < a ? 0 : lerp(0.35, 1, bk(sg(t, a, a + d))));
const azarDe = (s0) => { let s = s0; return () => ((s = (s * 16807) % 2147483647) / 2147483647); };

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
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x6a7282);
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
scene.environmentIntensity = 0.8;

const OM = V(100, 0, 0), OO = V(-60, 0, 0), OF = V(200, 0, 0);
const key = new THREE.DirectionalLight(0xfff0dc, 1.3); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.1); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x6a7490, 1.35); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.4);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.normalBias = 0.02; sol.shadow.radius = 5;
scene.add(sol, sol.target);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, madera: 0xdcbb92, cromo: 0xb8bcc4, kraft: 0xc9a46b, metal: 0xc9ccd2 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.14 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.45), red: mat(C.red, 0.6),
  white: mat(C.white, 0.42), gris: mat(C.gris, 0.55), madera: mat(C.madera, 0.55), cromo: mat(C.cromo, 0.25, { metalness: 0.7 }),
  kraft: mat(C.kraft, 0.85), goma: mat(0x1a1f2a, 0.7), metal: mat(C.metal, 0.32, { metalness: 0.55 }),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.max(0.0005, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001)));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", ${fam === "Lexend" ? "sans-serif" : "monospace"}`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
function texViva(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { c, t, x: c.getContext("2d"), clave: "" }; }
const ajustar = (x, txt, peso, px, ancho, fam) => { let s = px; x.font = F(peso, s, fam); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s, fam); } return s; };
const sh = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const font = new FontLoader().parse(LEXEND);
// números 3D sin costuras: cada contorno en su propia extrusión (de por-que-te-llaman)
function textoGrupo(txt, size, depth, mats) {
  const g = new THREE.Group(), shapes = font.generateShapes(txt, size), caja = new THREE.Box3();
  const geos = shapes.map((sh2, i) => { const geo = new THREE.ExtrudeGeometry(sh2, { depth, bevelEnabled: false, curveSegments: 16 }); geo.translate(0, 0, i * 0.0015 * size / 0.44); geo.computeBoundingBox(); caja.union(geo.boundingBox); return geo; });
  const c = caja.getCenter(new THREE.Vector3());
  for (const geo of geos) { geo.translate(-c.x, -c.y, -c.z); const m = new THREE.Mesh(geo, mats); m.castShadow = true; g.add(m); }
  g.userData.alto = caja.max.y - caja.min.y; g.userData.ancho = caja.max.x - caja.min.x;
  return g;
}
const NAV = "#16243d", NAV3 = "#1f3254", CRE = "#efeee5", VER = "#5ce611", NAV0 = "#0b1220", ROJ = "#c7655b";
function pisoSombra(x, z, w = 10, d = 10, op = 0.3, y = 0.002) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.ShadowMaterial({ opacity: op, color: 0x0b1220 }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scene.add(m); return m;
}
const _up = V(0, 1, 0);
function tubo(a, b, r, m) {
  const d = b.clone().sub(a), L = d.length();
  const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 12), m);
  o.position.copy(a).addScaledVector(d, 0.5); o.quaternion.setFromUnitVectors(_up, d.normalize()); return o;
}
// tilde verde (disco verde, aro navy, tilde navy)
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
  const tk = mesh(tickGeo, M.navy, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  sh(g); padre.add(g); return g;
}
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
// HUD: objetos 3D pegados a la cámara en una posición de PANTALLA fija (px de 1080x1920) y tamaño constante en pantalla
const HUD_D = 3;
// altoPx: alto en pantalla (px) del objeto (userData.alto = su alto en metros)
function hud(o, px, py, altoPx, rx = 0, ry = 0) {
  const hh = HUD_D * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const u = hh / 960;
  o.position.set((px - 540) * u, (960 - py) * u, -HUD_D);
  o.scale.setScalar(Math.max(0.0001, (altoPx * u) / (o.userData.alto || 1)));
  o.rotation.set(rx, ry, 0);
}

// ================= TIEMPOS CLAVE (los mismos en gen.mjs) =================
const S = E;
const T = {
  s02: S["s02-seis-veces"], veces: W[13], quejas: W[16], desap: W[18],
  s03: S["s03-por-que"], espera: W[21], ocho: W[22], uno: W[24], siete: W[27], cinta: W[30],
  s04: S["s04-alejaron"], alejaron: W[32], puertas: W[34], llegada: W[36],
  s05: S["s05-maister"], profesor: W[38], n1985: W[44],
  s06: S["s06-espera"], vacia: W[47], mas: W[50], laQue: W[52], sabes: W[55], cuanto: W[56], todavia: W[58],
  s07: S["s07-ruben-tel"], te: W[62], hora: W[67],
  s08: S["s08-frente-cinta"], noticias: W[71], frente: W[73], cinta8: W[76],
  s09: S["s09-avisos"], automat: W[78], avisa: W[80], sola: W[81], paso: W[83],
  s10: S["s10-ruben-nadie"], llamo: W[85], se: W[86], telefono: W[89], agenda: W[94],
  fin: S["s11-cierre"],
};
T.estira = 1.6;                                  // s01: el pasillo se estira (zoom de vértigo)
T.tramo1 = T.s02 + 0.15;                         // s02: el primer tramo "1 min" se pinta
T.tramos = [0, 1, 2, 3, 4].map((i) => T.veces + 0.05 + i * 0.09); // los otros cinco
T.x6 = T.veces + 0.1;                            // el "× 6"
T.globos = [0, 1, 2, 3, 4, 5].map((i) => T.quejas - 0.05 + i * 0.07);
T.desinfla = T.desap + 0.15; T.casi0 = W[17];     // ronda 1: "casi 0" en "casi"; el medidor de quejas aparece en "quejas"
T.cae = T.s03 - 0.05;                            // ronda 1: el "?" cae cuando la cámara ya encuadró la cinta
T.qVa = T.espera + 0.1;                          // el "?" se va
T.b1 = T.uno + 0.05; T.b7 = T.siete + 0.05;      // la barra: 1 verde, 7 rojos
T.n8 = T.ocho;                                   // "8 min"
T.sale = T.cinta + 0.1;                          // por fin sale una valija
T.desliza = T.alejaron + 0.05;                   // las puertas se alejan
T.saltan = T.llegada - 0.1;                      // las valijas a la cinta más lejana
T.pliega = T.s05 + 0.15;                         // la maqueta se pliega en la página
T.paginas = [T.s05 + 0.35, T.s05 + 0.65, T.s05 + 0.95];
T.arena = T.s06 - 0.05;                          // nace el reloj de arena
T.estiraA = T.mas;                               // "más larga": se estira hacia arriba
T.gira = T.laQue - 0.1;                          // el reloj de arena gira y nace el reloj de "?"
T.llamadas = [T.s07 + 0.2, T.te - 0.1, T.hora - 0.15]; // tarjetas "¿Y mi pedido?" y el contador 12 → 13 → 14
T.push = T.s08 - 0.45;                           // push-in al monitor
T.avisos = [T.s09 - 0.05, T.avisa - 0.08, T.sola + 0.3, T.paso + 0.5]; // ronda 1: el primero ya está al cortar // Preparando · Sale hoy · En camino · Entregado
T.camion = T.avisos[2] + 0.02;
T.levanta = T.llamo + 0.35;                    // ronda 1: levanta el tubo en la pausa de comedia
                         // ronda 1: mira a cámara ("¿Sin esperas a ciegas?")
T.toca = [T.telefono + 0.35, T.telefono + 0.6];  // lo golpea con el dedo
T.sopla = W[89] + 0.75;                          // ronda 2: sopla el tubo (después de "¿Se cortó el teléfono?")
T.cuelga = W[93] + 0.3;                          // ronda 2: cuelga después de ~1 s de mirada a cámara
T.miraCam = T.sopla + 0.75;                      // ronda 2: después del soplido, ~1 s de mirada a cámara

// ================= ZONA A: el pasillo del aeropuerto =================
const pasillo = new THREE.Group(); scene.add(pasillo);
const VIGAS = []; // ronda 1: en la vista aérea se ocultan (cruzaban el × 6 y los globos)
const PW = 3.4, PH = 3.1, PZ0 = -38, PZ1 = 0, TRAMO = 6; // ancho, alto, de la puerta de llegada (z -38) al hall (z 0)
{
  const L = PZ1 - PZ0 + 2;
  const baldo = tex(512, 512, (x, w, h) => {
    x.fillStyle = "#e6e3d4"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#dcd9c9"; x.fillRect(0, 0, w / 2, h / 2); x.fillRect(w / 2, h / 2, w / 2, h / 2);
    x.fillStyle = "rgba(22,36,61,0.55)"; x.fillRect(0, 0, w, 7); x.fillRect(0, 0, 7, h); x.fillRect(0, h / 2, w, 5); x.fillRect(w / 2, 0, 5, h);
  });
  baldo.wrapS = baldo.wrapT = THREE.RepeatWrapping; baldo.repeat.set(PW / 1.7, L / 1.7);
  const piso = mesh(new THREE.PlaneGeometry(PW, L), new THREE.MeshStandardMaterial({ map: baldo, roughness: 0.7 }), 0, 0, (PZ0 + PZ1) / 2 + 1);
  piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; pasillo.add(piso);
  // franja verde de guía en el piso (al costado izquierdo)
  // pared izquierda: navy claro lisa con franja verde a 1 m
  pasillo.add(mesh(new THREE.BoxGeometry(0.22, PH, L), M.navy2, -PW / 2 - 0.11, PH / 2, (PZ0 + PZ1) / 2 + 1));
  pasillo.add(mesh(new THREE.BoxGeometry(0.03, 0.12, L), M.g, -PW / 2 + 0.005, 1.0, (PZ0 + PZ1) / 2 + 1));
  pasillo.add(mesh(new THREE.BoxGeometry(0.06, 0.16, L), M.navy, -PW / 2 + 0.02, 0.08, (PZ0 + PZ1) / 2 + 1));
  // pared derecha: zócalo navy, ventanales (marco blanco, vidrio celeste pálido), dintel navy
  pasillo.add(mesh(new THREE.BoxGeometry(0.22, 0.7, L), M.navy2, PW / 2 + 0.11, 0.35, (PZ0 + PZ1) / 2 + 1));
  pasillo.add(mesh(new THREE.BoxGeometry(0.22, 0.45, L), M.navy2, PW / 2 + 0.11, PH - 0.225, (PZ0 + PZ1) / 2 + 1));
  const vidrioM = new THREE.MeshStandardMaterial({ color: 0xcfe0e6, roughness: 0.15, metalness: 0.1, emissive: 0xdfeef2, emissiveIntensity: 0.35 });
  pasillo.add(mesh(new THREE.BoxGeometry(0.04, PH - 1.15, L), vidrioM, PW / 2 + 0.12, 0.7 + (PH - 1.15) / 2, (PZ0 + PZ1) / 2 + 1));
  for (let z = PZ0; z <= PZ1 + 0.01; z += 1.5) pasillo.add(mesh(new THREE.BoxGeometry(0.16, PH - 1.15, 0.1), M.white, PW / 2 + 0.06, 0.7 + (PH - 1.15) / 2, z));
  pasillo.add(mesh(new THREE.BoxGeometry(0.16, 0.08, L), M.white, PW / 2 + 0.06, 0.72, (PZ0 + PZ1) / 2 + 1));
  // vigas cada 3 m (dan la perspectiva), con la marca del tramo
  for (let z = PZ0 + 1.5; z <= PZ1; z += 3) { const v = mesh(rbox(PW + 0.5, 0.26, 0.26, 0.04), M.navy, 0, PH + 0.13, z); pasillo.add(v); VIGAS.push(v); }
  // la puerta de llegada al fondo (marco blanco, puertas navy con franja verde)
  const pz = PZ0;
  pasillo.add(mesh(new THREE.BoxGeometry(PW + 0.4, PH + 0.3, 0.2), M.navy3, 0, (PH + 0.3) / 2, pz - 0.1));
  pasillo.add(mesh(rbox(2.0, 2.3, 0.1, 0.03), M.white, 0, 1.15, pz + 0.02));
  for (const s of [-1, 1]) pasillo.add(mesh(rbox(0.88, 2.1, 0.08, 0.02), M.navy2, s * 0.46, 1.08, pz + 0.07));
  pasillo.add(mesh(rbox(1.84, 0.12, 0.09, 0.02), M.g, 0, 2.2, pz + 0.08));
  sh(pasillo);
  piso.castShadow = false;
}
// el cartel colgante "Valijas →" (doble faz; viaja con Rubén y nunca se acerca)
const cartelTex = tex(1024, 300, (x, w, h) => {
  x.fillStyle = NAV0; x.fillRect(0, 0, w, h);
  x.fillStyle = CRE; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 168); x.fillText("Valijas", 64, h / 2 + 8);
  // flecha verde
  x.fillStyle = VER; const ax = 760, ay = h / 2;
  x.beginPath(); x.moveTo(ax, ay - 30); x.lineTo(ax + 120, ay - 30); x.lineTo(ax + 120, ay - 78); x.lineTo(ax + 210, ay); x.lineTo(ax + 120, ay + 78); x.lineTo(ax + 120, ay + 30); x.lineTo(ax, ay + 30); x.closePath(); x.fill();
});
const cartel = new THREE.Group(); scene.add(cartel);
{
  const CW = 1.9, CH = CW * 300 / 1024;
  cartel.add(mesh(rbox(CW + 0.08, CH + 0.08, 0.1, 0.03), M.navy));
  const cm = new THREE.MeshBasicMaterial({ map: cartelTex, toneMapped: false });
  cartel.add(mesh(new THREE.PlaneGeometry(CW, CH), cm, 0, 0, 0.052));
  const atr = mesh(new THREE.PlaneGeometry(CW, CH), cm, 0, 0, -0.052); atr.rotation.y = Math.PI; cartel.add(atr);
  for (const s of [-1, 1]) cartel.add(tubo(V(s * 0.7, CH / 2, 0), V(s * 0.7, CH / 2 + 0.9, 0), 0.018, M.navy));
  sh(cartel); cartel.children[1].castShadow = false; atr.castShadow = false;
}
// las franjas verdes de los seis tramos y su relleno (s02)
const tramosG = [];
for (let i = 0; i < 6; i++) {
  const z1 = PZ1 - i * TRAMO, z0 = z1 - TRAMO;
  const g = new THREE.Group(); scene.add(g);
  const rel = mesh(new THREE.PlaneGeometry(PW - 0.1, TRAMO - 0.2), new THREE.MeshBasicMaterial({ color: i === 0 ? 0xc6ef9f : 0xdaf3c4, toneMapped: false, transparent: true, opacity: 0.85, depthWrite: false }), 0, 0.012, (z0 + z1) / 2);
  rel.rotation.x = -Math.PI / 2; g.add(rel);
  const raya = mesh(new THREE.BoxGeometry(PW, 0.03, 0.2), M.g, 0, 0.02, z0); g.add(raya);
  g.userData.rel = rel; tramosG.push(g);
}
// el "× 6" y el "casi 0" (HUD 3D)
const matV = [mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.18 }), mat(C.gd, 0.5)];
const matN = [mat(C.navy, 0.4), mat(C.navy3, 0.5)];
const matR = [mat(C.red, 0.5), mat(0x9e4e46, 0.55)];
const x6 = textoGrupo("×6", 0.5, 0.14, matV); pegarACamara(x6, camera, 40);
const casi0 = textoGrupo("casi 0", 0.3, 0.09, matV); pegarACamara(casi0, camera, 40);
const medidor = new THREE.Group(); const medBloques = [];
for (let i = 0; i < 6; i++) { const b2 = mesh(rbox(0.11, 0.15, 0.08, 0.02), mat(C.red, 0.5)); b2.position.x = (i - 2.5) * 0.128; medidor.add(b2); medBloques.push(b2); }
medidor.add(mesh(rbox(0.82, 0.2, 0.05, 0.03), M.navy, 0, 0, -0.04)); medidor.userData.alto = 0.2;
pegarACamara(medidor, camera, 40);
// los globos de queja (rojo apagado con "!" crema): salen de las paredes y se desinflan
function hacerGlobo() {
  const g = new THREE.Group();
  const cuerpo = mesh(rbox(0.9, 0.7, 0.24, 0.3, 5), M.red); g.add(cuerpo);
  const cola = new THREE.Shape(); cola.moveTo(-0.12, 0); cola.lineTo(0.12, 0); cola.lineTo(-0.05, -0.26); cola.closePath();
  g.add(mesh(new THREE.ExtrudeGeometry(cola, { depth: 0.18, bevelEnabled: false }), M.red, -0.12, -0.33, -0.09));
  const ex = textoGrupo("!", 0.5, 0.08, [mat(C.cr, 0.5), mat(C.cr2, 0.6)]); ex.position.z = 0.13; g.add(ex);
  sh(g); scene.add(g); return g;
}
const globos = [0, 1, 2, 3, 4, 5].map(() => hacerGlobo());
const GLOBO_POS = [[-0.7, 1.7, -11.5], [0.7, 1.9, -9.0], [-0.7, 1.8, -16], [0.7, 1.7, -24.0], [-0.7, 1.9, -25.5], [0.7, 1.8, -30]]; // ronda 1: dentro del pasillo (los costados quedan para los números)

// ================= ZONA B: el hall y la cinta de valijas =================
const CB = V(0, 0, 7.2);             // centro de la cinta (eje largo en z)
const LS = 1.9, RC = 1.08, YB = 0.42; // tramo recto, radio de la curva (al centro del cinturón), alto del cinturón
const hall = new THREE.Group(); scene.add(hall);
const LB = 2 * LS + 2 * Math.PI * RC;
// punto del recorrido (s en [0, LB)); arranca en la boca (curva de atrás, z menor), va por el lado +x hacia la cámara
function cintaEn(s, off = 0) {
  s = ((s % LB) + LB) % LB;
  const r = RC + off;
  const zA = CB.z - LS / 2, zB = CB.z + LS / 2;
  const arc = Math.PI * RC;
  if (s < arc / 2) { const a = s / RC; return { p: V(CB.x + r * Math.sin(a), YB, zA - r * Math.cos(a)), dir: a }; }
  s -= arc / 2;
  if (s < LS) return { p: V(CB.x + r, YB, zA + s), dir: Math.PI / 2 };
  s -= LS;
  if (s < arc) { const a = s / RC; return { p: V(CB.x + r * Math.cos(a), YB, zB + r * Math.sin(a)), dir: Math.PI / 2 + a }; }
  s -= arc;
  if (s < LS) return { p: V(CB.x - r, YB, zB - s), dir: Math.PI * 1.5 };
  s -= LS;
  const a = s / RC; return { p: V(CB.x - r * Math.cos(a), YB, zA - r * Math.sin(a)), dir: Math.PI * 1.5 + a };
}
const estadio = (r, n = 64) => {
  const sh2 = new THREE.Shape(), zA = -LS / 2, zB = LS / 2;
  sh2.moveTo(-r, zA); sh2.lineTo(-r, zB); sh2.absarc(0, zB, r, Math.PI, 0, true); sh2.lineTo(r, zA); sh2.absarc(0, zA, r, 0, Math.PI, true);
  return sh2;
};
const NSL = 60;
const tablillas = new THREE.InstancedMesh(rbox(0.5, 0.035, 0.2, 0.012, 2), M.metal, NSL); tablillas.castShadow = true; tablillas.receiveShadow = true;
hall.add(tablillas);
{
  const pisoH = mesh(new THREE.PlaneGeometry(14, 16), mat(0xe2e0d4, 0.85), CB.x, 0, CB.z + 1); pisoH.rotation.x = -Math.PI / 2; pisoH.receiveShadow = true; hall.add(pisoH);
  // base (navy, con el borde) e isla del centro (navy claro con tapa crema)
  const ex = (sh2, h, m, y) => { const g = new THREE.ExtrudeGeometry(sh2, { depth: h, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2, curveSegments: 32 }); g.rotateX(Math.PI / 2); const o = mesh(g, m, CB.x, y, CB.z); return o; };
  hall.add(ex(estadio(RC + 0.34), YB - 0.03, M.navy, YB - 0.03));
  hall.add(ex(estadio(RC - 0.3), 0.62, M.navy3, 0.62));
  hall.add(ex(estadio(RC - 0.34), 0.03, M.navy2, 0.655));
  hall.add(ex(estadio(RC - 0.5), 0.02, M.g, 0.69));
  hall.add(ex(estadio(RC - 0.58), 0.02, M.navy3, 0.71));
  // labio exterior cromado
  const pts = []; for (let i = 0; i <= 160; i++) { const q = cintaEn((i / 160) * LB, 0.31).p; q.y = YB + 0.03; pts.push(q); }
  hall.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 320, 0.035, 8, true), M.cromo));
  // la boca (al fondo): caja navy con la abertura y la cortina de tiras
  const zb = CB.z - LS / 2 - RC;
  hall.add(mesh(rbox(3.0, 0.9, 0.5, 0.04), M.navy2, CB.x, 1.42, zb - 0.05)); // dintel
  for (const s of [-1, 1]) hall.add(mesh(rbox(0.6, 1.9, 0.5, 0.04), M.navy2, CB.x + s * 1.2, 0.95, zb - 0.05));
  hall.add(mesh(new THREE.BoxGeometry(1.8, 0.6, 0.3), mat(0x0d0f14, 0.9), CB.x, 0.68, zb - 0.22)); // el hueco oscuro
  hall.add(mesh(rbox(3.0, 0.1, 0.52, 0.03), M.g, CB.x, 1.9, zb - 0.05)); // franja verde arriba
  sh(hall); pisoH.castShadow = false;
}
const tiras = [];
{
  const zb = CB.z - LS / 2 - RC;
  for (let i = 0; i < 14; i++) {
    const p = new THREE.Group(); p.position.set(CB.x - 0.84 + i * 0.13, 0.97, zb + 0.22); hall.add(p);
    p.add(mesh(new THREE.BoxGeometry(0.12, 0.56, 0.01), mat(0x1a1d24, 0.8), 0, -0.28, 0));
    tiras.push(p);
  }
}
// valijas rígidas: esquinas redondeadas, nervaduras, manija telescópica, rueditas (acostadas en la cinta)
function hacerValija(color, cinta = false, k = 1) {
  const g = new THREE.Group(); const m = mat(color, 0.45);
  const W2 = 0.46 * k, L2 = 0.7 * k, H2 = 0.24 * k;
  g.add(mesh(rbox(W2, H2, L2, 0.07 * k, 4), m, 0, H2 / 2, 0));
  for (const s of [-1, 0, 1]) g.add(mesh(rbox(0.05 * k, 0.02 * k, L2 * 0.86, 0.008 * k), mat(new THREE.Color(color).multiplyScalar(0.82).getHex(), 0.45), s * 0.13 * k, H2 + 0.005 * k, 0));
  g.add(mesh(rbox(W2 * 0.96, 0.02 * k, 0.03 * k, 0.008 * k), M.navy, 0, H2 * 0.5, L2 / 2 + 0.002)); // cierre
  // manija telescópica (atrás) y asa
  g.add(mesh(rbox(0.26 * k, 0.05 * k, 0.06 * k, 0.02 * k), M.navy, 0, H2 * 0.75, -L2 / 2 - 0.03 * k));
  g.add(mesh(rbox(0.16 * k, 0.04 * k, 0.05 * k, 0.015 * k), M.navy, 0, H2 + 0.03 * k, 0.1 * k));
  for (const sx of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.035 * k, 0.035 * k, 0.03 * k, 14).rotateZ(Math.PI / 2), M.goma, sx * (W2 / 2 - 0.05 * k), H2 * 0.3, -L2 / 2 + 0.02 * k));
  if (cinta) {
    const cm = mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.15 });
    g.add(mesh(rbox(0.07 * k, 0.03 * k, 0.16 * k, 0.01 * k), cm, 0.06 * k, H2 + 0.06 * k, 0.12 * k));
    g.add(mesh(rbox(0.06 * k, 0.02 * k, 0.2 * k, 0.01 * k), cm, -0.06 * k, H2 + 0.035 * k, 0.2 * k));
  }
  sh(g); return g;
}
const VALIJAS = [[C.navy3, true], [C.g, false], [C.white, false], [C.cr2, false], [C.navy, false]].map(([c, ci]) => { const v = hacerValija(c, ci); hall.add(v); return v; });
// cajas kraft de la distribuidora (s08-s09), con cinta navy y etiqueta
const etiquetaCaja = tex(256, 160, (x, w, h) => { x.fillStyle = "#ffffff"; x.fillRect(0, 0, w, h); x.fillStyle = NAV0; x.fillRect(16, 26, w - 32, 22); x.fillRect(16, 66, w - 80, 16); x.fillRect(16, 96, w - 120, 16); x.fillStyle = VER; x.fillRect(16, 126, 60, 16); });
function hacerCaja(k = 1) {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.5 * k, 0.36 * k, 0.5 * k, 0.02 * k), M.kraft, 0, 0.18 * k, 0));
  g.add(mesh(new THREE.BoxGeometry(0.12 * k, 0.005, 0.505 * k), M.navy, 0, 0.362 * k, 0));
  const et = mesh(new THREE.PlaneGeometry(0.22 * k, 0.14 * k), new THREE.MeshStandardMaterial({ map: etiquetaCaja, roughness: 0.6 }), 0.1 * k, 0.18 * k, 0.252 * k); g.add(et);
  sh(g); return g;
}
const CAJAS = [0, 1, 2, 3, 4].map(() => { const c = hacerCaja(); hall.add(c); return c; });
const tildesCaja = CAJAS.map(() => hacerTilde(0.13, hall));
// el "?" verde (cae en la isla)
const preg = textoGrupo("?", 1.5, 0.4, [mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.16 }), mat(C.gd, 0.5)]); scene.add(preg);
const ALTO_Q = preg.userData.alto;
// "8 min" y la barra de 8 bloques (HUD)
const n8 = textoGrupo("8 min", 0.3, 0.09, [mat(C.cr, 0.5), mat(C.cr3, 0.6)]); pegarACamara(n8, camera, 40);
const barra = new THREE.Group();
const bloques = [];
for (let i = 0; i < 8; i++) { const b = mesh(rbox(0.11, 0.15, 0.08, 0.02), mat(C.cr2, 0.5)); b.position.x = (i - 3.5) * 0.128; barra.add(b); bloques.push(b); }
barra.add(mesh(rbox(1.08, 0.2, 0.05, 0.03), M.navy, 0, 0, -0.04));
barra.userData.alto = 0.2; pegarACamara(barra, camera, 40);
const bloqueM = bloques.map((b) => b.material);
const pisoB = pisoSombra(CB.x, CB.z, 12, 12, 0.28, 0.004);

// ================= ZONA M: el libro con la maqueta pop-up =================
const libro = new THREE.Group(); scene.add(libro); libro.position.copy(OM);
const PGW = 3.0, PGD = 2.15; // ancho (x) y largo de cada página (z); lomo sobre x en z = 0
{
  libro.add(mesh(rbox(PGW + 0.24, 0.08, 2 * PGD + 0.3, 0.03), M.navy, 0, 0.04, 0)); // tapa
  libro.add(mesh(rbox(PGW + 0.26, 0.05, 0.3, 0.02), M.navy3, 0, 0.06, 0)); // lomo
  for (const s of [-1, 1]) { const b = mesh(rbox(PGW, 0.16, PGD - 0.04, 0.02), M.cr2, 0, 0.16, s * (PGD / 2 + 0.02)); libro.add(b); }
  sh(libro);
}
// las páginas de arriba (con el dibujo de la maqueta: pistas, pasto) y las que pasan
const paginaTex = tex(1024, 740, (x, w, h) => {
  x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#e3e9d4"; x.fillRect(30, 30, w - 60, h - 60);
  x.fillStyle = NAV; x.fillRect(80, 140, w - 160, 120); x.fillStyle = CRE; for (let i = 0; i < 9; i++) x.fillRect(110 + i * 92, 192, 50, 14);
  x.fillStyle = "rgba(22,36,61,0.25)"; x.fillRect(80, 470, w - 160, 70);
});
const renglones = tex(1024, 740, (x, w, h) => {
  x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
  x.fillStyle = "rgba(22,36,61,0.38)"; for (let i = 0; i < 12; i++) x.fillRect(90, 80 + i * 50, w - 180 - ((i * 7) % 5) * 60, 16); // ronda 2: más marcados
});
const paginaFila = tex(1024, 740, (x, w, h) => {
  // ronda 0: la página donde se frena: una fila de gente esperando (siluetas navy) y una línea de puntos
  x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
  x.fillStyle = "rgba(22,36,61,0.18)"; for (let i = 0; i < 6; i++) x.fillRect(90, 80 + i * 34, w - 180 - (i % 3) * 120, 12);
  // un reloj de arena grande dibujado en línea navy (anticipa el que sale de la página)
  x.strokeStyle = NAV0; x.lineWidth = 14; x.lineJoin = "round";
  x.beginPath(); x.moveTo(330, 300); x.lineTo(690, 300); x.lineTo(530, 480); x.lineTo(690, 660); x.lineTo(330, 660); x.lineTo(490, 480); x.closePath(); x.stroke();
  x.fillStyle = "rgba(216,201,160,0.9)"; x.beginPath(); x.moveTo(400, 640); x.lineTo(620, 640); x.lineTo(510, 560); x.closePath(); x.fill();
  x.lineWidth = 18; x.beginPath(); x.moveTo(300, 296); x.lineTo(720, 296); x.moveTo(300, 664); x.lineTo(720, 664); x.stroke();
  x.strokeStyle = VER; x.lineWidth = 14; x.beginPath(); x.arc(860, 470, 70, 0, 7); x.stroke(); x.beginPath(); x.moveTo(860, 470); x.lineTo(860, 422); x.moveTo(860, 470); x.lineTo(896, 488); x.stroke();
});
const pagIzq = mesh(new THREE.PlaneGeometry(PGW, PGD), new THREE.MeshStandardMaterial({ map: paginaTex, roughness: 0.8 }), 0, 0.245, -PGD / 2);
pagIzq.rotation.x = -Math.PI / 2; libro.add(pagIzq);
const pagDer = mesh(new THREE.PlaneGeometry(PGW, PGD), new THREE.MeshStandardMaterial({ map: paginaTex, roughness: 0.8 }), 0, 0.245, PGD / 2);
pagDer.rotation.x = -Math.PI / 2; libro.add(pagDer);
pagIzq.receiveShadow = pagDer.receiveShadow = true;
// hojas que pasan (giran sobre el lomo, de +z a -z)
const hojas = [0, 1, 2].map((i) => {
  const p = new THREE.Group(); p.position.set(0, 0.25 + i * 0.002, 0); libro.add(p);
  const h = mesh(new THREE.PlaneGeometry(PGW - 0.02, PGD - 0.02), new THREE.MeshStandardMaterial({ map: renglones, roughness: 0.8, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: renglones, emissiveIntensity: 0.35 }), 0, 0, PGD / 2);
  h.rotation.x = -Math.PI / 2; h.castShadow = true; h.receiveShadow = true; p.add(h);
  return p;
});
// la maqueta (sobre las páginas): terminal blanca sin techo con dos cintas, pasillo, bloque de puertas con mangas y aviones
const maq = new THREE.Group(); libro.add(maq);
const KMQ = 0.1; // escala de las cintas de la maqueta respecto de la de verdad
const TERM = V(0, 0.25, 1.15);
{
  const term = new THREE.Group(); term.position.copy(TERM); maq.add(term);
  term.add(mesh(rbox(2.2, 0.03, 1.4, 0.01), M.cr2, 0, 0.015, 0));
  for (const [w, d, x, z] of [[0.9, 0.08, -0.65, -0.7], [0.9, 0.08, 0.65, -0.7], [2.2, 0.08, 0, 0.7], [0.08, 1.4, -1.1, 0], [0.08, 1.4, 1.1, 0]]) term.add(mesh(rbox(w, 0.26, d, 0.015), M.navy2, x, 0.13, z));
  term.add(mesh(rbox(2.24, 0.04, 0.1, 0.01), M.g, 0, 0.31, 0.7));
  sh(term);
}
// las dos cintas chicas (la de cerca de las puertas y la más lejana), copia a escala de la de verdad
function cintaChica() {
  const g = new THREE.Group();
  const ex = (sh2, h, m, y) => { const geo = new THREE.ExtrudeGeometry(sh2, { depth: h, bevelEnabled: false, curveSegments: 24 }); geo.rotateX(Math.PI / 2); return mesh(geo, m, 0, y, 0); };
  g.add(ex(estadio(RC + 0.34), YB, M.navy, YB));
  g.add(ex(estadio(RC + 0.22), 0.02, M.metal, YB + 0.02));
  g.add(ex(estadio(RC - 0.3), 0.62, M.navy3, 0.62));
  g.add(ex(estadio(RC - 0.34), 0.03, M.navy2, 0.655));
  g.add(ex(estadio(RC - 0.5), 0.02, M.g, 0.69));
  g.add(ex(estadio(RC - 0.58), 0.02, M.navy3, 0.71));
  g.scale.setScalar(KMQ); sh(g); return g;
}
const CC1 = V(-0.35, 0.28, 0.95), CC2 = V(0.45, 0.28, 1.45); // en el espacio del libro
const cinta1 = cintaChica(); cinta1.position.copy(CC1); maq.add(cinta1);
const cinta2 = cintaChica(); cinta2.position.copy(CC2); cinta2.rotation.y = Math.PI / 2; maq.add(cinta2);
const valijitas = [C.g, C.navy3, C.white].map((c, i) => { const v = hacerValija(c, i === 1, 0.11); maq.add(v); return v; });
// pasillo (crema con bordes navy) que se estira y el bloque de las puertas de llegada
const pasilloM = new THREE.Group(); maq.add(pasilloM);
{
  pasilloM.add(mesh(new THREE.BoxGeometry(0.34, 0.06, 1), M.cr, 0, 0.03, -0.5));
  for (const s of [-1, 1]) pasilloM.add(mesh(new THREE.BoxGeometry(0.04, 0.12, 1), M.navy2, s * 0.19, 0.06, -0.5));
  sh(pasilloM);
}
const puertasM = new THREE.Group(); maq.add(puertasM);
function avioncito() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CapsuleGeometry(0.06, 0.55, 6, 14).rotateX(Math.PI / 2), M.white));
  g.add(mesh(rbox(0.7, 0.02, 0.14, 0.01), M.white, 0, 0, 0.02));
  g.add(mesh(rbox(0.24, 0.02, 0.08, 0.008), M.white, 0, 0.02, 0.3));
  g.add(mesh(rbox(0.02, 0.12, 0.08, 0.008), M.navy3, 0, 0.08, 0.3));
  for (const s of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.09, 12).rotateX(Math.PI / 2), M.navy3, s * 0.18, -0.03, -0.02));
  return sh(g);
}
{
  puertasM.add(mesh(rbox(1.5, 0.24, 0.36, 0.03), M.navy3, 0, 0.12, 0));
  puertasM.add(mesh(rbox(1.52, 0.03, 0.06, 0.01), M.g, 0, 0.2, 0.17));
  for (const x of [-0.5, 0, 0.5]) {
    puertasM.add(mesh(rbox(0.08, 0.08, 0.36, 0.02), M.white, x, 0.16, -0.34));
    const a = avioncito(); a.position.set(x, 0.12, -0.62); a.rotation.y = Math.PI; a.scale.setScalar(0.7); puertasM.add(a);
  }
  sh(puertasM);
}
// el camino nuevo (flecha verde que recorre de las puertas a la cinta lejana)
const flechaMat = mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.25 });
const flecha = new THREE.Mesh(new THREE.BufferGeometry(), flechaMat); maq.add(flecha);
const puntaF = mesh(new THREE.ConeGeometry(0.09, 0.2, 18), flechaMat); maq.add(puntaF);
const n1985 = textoGrupo("1985", 0.42, 0.12, matN); pegarACamara(n1985, camera, 40);
// el reloj de arena (marco navy con columnas torneadas, vidrio, arena crema oscuro) y el banquito de espera
const arena = new THREE.Group(); scene.add(arena);
const HA = 2.0; // alto del reloj de arena
const arenaSup = mesh(new THREE.ConeGeometry(0.42, 0.62, 40, 1, false), mat(0xd8c9a0, 0.9));
const arenaInf = mesh(new THREE.ConeGeometry(0.46, 0.5, 40), mat(0xd8c9a0, 0.9));
const hilo = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.7, 10), mat(0xd8c9a0, 0.9));
{
  for (const y of [0, HA]) { arena.add(mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.12, 48), M.navy, 0, y + (y ? -0.06 : 0.06), 0)); arena.add(mesh(new THREE.TorusGeometry(0.72, 0.035, 10, 48).rotateX(Math.PI / 2), M.g, 0, y + (y ? -0.12 : 0.12), 0)); }
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    const perfil = []; for (let j = 0; j <= 16; j++) { const u = j / 16; perfil.push(new THREE.Vector2(0.05 + 0.025 * Math.abs(Math.sin(u * Math.PI * 4)), 0.12 + u * (HA - 0.24))); }
    arena.add(mesh(new THREE.LatheGeometry(perfil, 14), M.navy, Math.cos(a) * 0.6, 0, Math.sin(a) * 0.6));
  }
  const vp = []; for (let j = 0; j <= 40; j++) { const u = j / 40, y = 0.12 + u * (HA - 0.24); const r = 0.06 + 0.46 * Math.pow(Math.abs(Math.cos(u * Math.PI)), 0.8); vp.push(new THREE.Vector2(r, y)); }
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xe8f2f6, roughness: 0.06, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide, clearcoat: 1 });
  arena.add(new THREE.Mesh(new THREE.LatheGeometry(vp, 48), vidrio));
  // borde blanco marcado del vidrio
  const bp = []; for (let j = 0; j <= 40; j++) { const u = j / 40, y = 0.12 + u * (HA - 0.24); bp.push(V(0.06 + 0.46 * Math.pow(Math.abs(Math.cos(u * Math.PI)), 0.8), y, 0)); }
  for (const a of [Math.PI / 2 - 0.9, Math.PI / 2 + 0.9]) { const tb = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(bp), 60, 0.014, 6), M.white); tb.rotation.y = a; arena.add(tb); }
  arena.add(arenaSup, arenaInf, hilo);
  arenaSup.rotation.x = Math.PI; arenaSup.position.y = HA * 0.5 + 0.38; arenaInf.position.y = 0.12 + 0.25; hilo.position.y = HA * 0.5 - 0.05;
  sh(arena); arena.traverse((o) => { if (o.material && o.material.transparent) o.castShadow = false; });
}
const banco = new THREE.Group(); scene.add(banco);
{
  banco.add(mesh(rbox(1.6, 0.06, 0.08, 0.02), M.cromo, 0, 0.36, 0));
  for (const s of [-1, 1]) { banco.add(mesh(rbox(0.06, 0.36, 0.06, 0.02), M.cromo, s * 0.65, 0.18, 0)); banco.add(mesh(rbox(0.06, 0.03, 0.4, 0.01), M.cromo, s * 0.65, 0.015, 0)); }
  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * 0.52;
    banco.add(mesh(rbox(0.46, 0.06, 0.42, 0.05), M.navy3, x, 0.43, 0.02));
    const r2 = mesh(rbox(0.46, 0.46, 0.06, 0.05), M.navy3, x, 0.7, -0.19); r2.rotation.x = -0.12; banco.add(r2);
  }
  sh(banco);
}
// el reloj de pared sin números: en cada hora un "?" rojo apagado; las agujas giran sin parar
const RRC = 1.05, RYC = 1.55;
const esfQ = tex(1024, 1024, (x, w) => {
  x.fillStyle = "#f4f2e8"; x.beginPath(); x.arc(w / 2, w / 2, w / 2, 0, 7); x.fill();
  x.font = F(800, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = ROJ;
  for (let h = 0; h < 12; h++) { const a = (h / 12) * Math.PI * 2; x.fillText("?", w / 2 + Math.sin(a) * 390, w / 2 - Math.cos(a) * 390 + 8); }
  x.fillStyle = "rgba(11,18,32,0.35)"; for (let i = 0; i < 60; i++) { if (i % 5 === 0) continue; const a = (i / 60) * Math.PI * 2; x.beginPath(); x.arc(w / 2 + Math.sin(a) * 470, w / 2 - Math.cos(a) * 470, 6, 0, 7); x.fill(); }
});
const relojQ = new THREE.Group(); scene.add(relojQ);
const agQ = {};
{
  relojQ.add(mesh(new THREE.TorusGeometry(RRC, 0.11, 16, 64), M.navy, 0, RYC, 0));
  relojQ.add(mesh(new THREE.CylinderGeometry(RRC, RRC, 0.14, 64).rotateX(Math.PI / 2), M.navy3, 0, RYC, -0.06));
  relojQ.add(mesh(new THREE.CircleGeometry(RRC * 0.97, 64), new THREE.MeshStandardMaterial({ map: esfQ, roughness: 0.6, emissive: 0xffffff, emissiveMap: esfQ, emissiveIntensity: 0.12 }), 0, RYC, 0.015));
  const ag = (L, A, z) => { const p = new THREE.Group(); p.position.set(0, RYC, z); const b = mesh(rbox(A, L, 0.03, A / 2 - 0.002, 2), M.navy); b.position.y = L / 2 - 0.08; p.add(b); relojQ.add(p); return p; };
  agQ.h = ag(RRC * 0.42, 0.1, 0.06); agQ.m = ag(RRC * 0.62, 0.07, 0.09);
  relojQ.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 20).rotateX(Math.PI / 2), M.g, 0, RYC, 0.13));
  for (const s of [-1, 1]) { relojQ.add(tubo(V(s * 0.45, RYC - 0.85, -0.05), V(s * 0.75, 0.0, -0.05), 0.05, M.navy)); relojQ.add(mesh(rbox(0.28, 0.05, 0.28, 0.02), M.navy, s * 0.75, 0.025, -0.05)); }
  sh(relojQ);
}
const pisoM = pisoSombra(OM.x, OM.z, 9, 9, 0.25, 0.003);

// ================= ZONA O: la oficina vidriada de Rubén (de por-que-te-llaman / por-que-el-99) =================
const oficina = new THREE.Group(); scene.add(oficina);
const PISO_DEP = -3.4;
const RUB = V(OO.x, 0, -0.45);                   // Rubén sentado, mira a +z (a la cámara)
const ESC = { y: 0.76, z: 0.32, w: 1.7, d: 0.78 }; // el escritorio, delante de Rubén
const MONP = V(OO.x + 0.55, 1.07, ESC.z + 0.02), MONW = 0.66, MONH = 0.41, MON_RY = -0.35; // ronda 1: más a la derecha (no tapa la cara)
const MP = { w: 1280, h: 800 };
const monTV = texViva(MP.w, MP.h);
const LLAM = [["Rotisería Graciela", "¿Y mi pedido?"], ["Panadería del Cerro", "¿Y mi pedido?"], ["Kiosco 18", "¿Y mi pedido?"]];
function dibujarMonitor(n, k) {
  const clave = n + "|" + k.toFixed(2);
  if (monTV.clave === clave) return; monTV.clave = clave;
  const x = monTV.x, w = MP.w, h = MP.h;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
  x.fillStyle = NAV0; x.fillRect(0, 0, w, 140);
  x.fillStyle = CRE; x.font = F(800, 70); x.fillText("Llamadas", 46, 74);
  // tarjetas apiladas: la más nueva arriba, entra con un pop
  for (let i = 0; i < n; i++) {
    const j = n - 1 - i; // fila (0 = arriba)
    const y = 168 + j * 210, s = i === n - 1 ? lerp(0.85, 1, bk(k)) : 1;
    x.save(); x.translate(w / 2, y + 95); x.scale(s, s); x.translate(-w / 2, -(y + 95));
    x.fillStyle = j === 0 ? ROJ : "#ffffff"; rr(x, 30, y, w - 60, 190, 26);
    if (j !== 0) { x.strokeStyle = "rgba(22,36,61,0.35)"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, w - 60, 190, 26); x.stroke(); }
    const [a, b] = LLAM[i % 3];
    x.fillStyle = j === 0 ? CRE : NAV0; ajustar(x, b, 800, 72, w - 140); x.fillText(b, 66, y + 66);
    x.fillStyle = j === 0 ? CRE : "rgba(22,36,61,0.75)"; ajustar(x, a, 600, 52, w - 140); x.fillText(a, 66, y + 142);
    x.restore();
  }
  if (n === 0) { x.fillStyle = "rgba(22,36,61,0.5)"; x.textAlign = "center"; ajustar(x, "Sin llamadas", 800, 130, w - 160); x.fillText("Sin llamadas", w / 2, 470); x.textAlign = "left"; } // ronda 2: más grande
  monTV.t.needsUpdate = true;
}
{
  const O = OO;
  const tablas = tex(1024, 1024, (x, w, h) => { x.fillStyle = "#cdb08a"; x.fillRect(0, 0, w, h); for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#d5b994" : "#c7a982"; x.fillRect(0, (i * h) / 8 + 3, w, h / 8 - 6); x.fillStyle = "rgba(90,60,30,0.45)"; x.fillRect(0, (i * h) / 8, w, 4); } });
  tablas.wrapS = tablas.wrapT = THREE.RepeatWrapping; tablas.repeat.set(3, 3);
  const piso = mesh(new THREE.PlaneGeometry(4.4, 7.0), new THREE.MeshStandardMaterial({ map: tablas, roughness: 0.75 }), O.x, 0, 1.5); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; oficina.add(piso);
  oficina.add(mesh(new THREE.BoxGeometry(4.6, 0.3, 7.2), M.navy2, O.x, -0.16, 1.5)); // ronda 1: el piso sigue hasta delante de la cámara
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xdfeaf2, roughness: 0.08, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide });
  const panel = (cx, cz, ancho, ry) => {
    const g = new THREE.Group(); g.position.set(cx, 0, cz); g.rotation.y = ry; oficina.add(g);
    g.add(mesh(new THREE.PlaneGeometry(ancho, 2.6), vidrio, 0, 1.3, 0));
    g.add(mesh(rbox(ancho, 0.1, 0.1, 0.02), M.navy, 0, 0.05, 0));
    g.add(mesh(rbox(ancho, 0.1, 0.1, 0.02), M.navy, 0, 2.6, 0));
    g.add(mesh(rbox(ancho, 0.07, 0.07, 0.02), M.navy, 0, 1.0, 0));
    const n = Math.round(ancho / 1.1);
    for (let i = 0; i <= n; i++) g.add(mesh(rbox(0.1, 2.6, 0.1, 0.02), M.navy, -ancho / 2 + (i * ancho) / n, 1.3, 0));
    return g;
  };
  panel(O.x, -1.75, 4.4, 0); panel(O.x - 2.2, 0, 3.5, Math.PI / 2); panel(O.x + 2.2, 0, 3.5, Math.PI / 2);
  // estante bajo detrás de Rubén con biblioratos
  oficina.add(mesh(rbox(1.6, 0.9, 0.36, 0.02), M.navy3, O.x - 1.1, 0.45, -1.48));
  const colB = [C.g, C.cr, C.navy, C.cr2, C.g, C.edge, C.cr, C.g];
  colB.forEach((c, i) => { const b = mesh(rbox(0.09, 0.32, 0.26, 0.01), mat(c, 0.6), O.x - 1.75 + i * 0.12, 1.06, -1.48); oficina.add(b); });
  // escritorio de madera clara con patas navy y faldón navy hacia la cámara
  const vetas = tex(1024, 256, (x, w, h) => {
    x.fillStyle = "#dcbb92"; x.fillRect(0, 0, w, h); const az = azarDe(3);
    for (let i = 0; i < 40; i++) { const y = az() * h; x.strokeStyle = az() < 0.5 ? "rgba(150,105,60,0.3)" : "rgba(255,240,215,0.35)"; x.lineWidth = 2 + az() * 5; x.beginPath(); x.moveTo(0, y); for (let k = 1; k <= 8; k++) x.lineTo((k * w) / 8, y + Math.sin(k * 1.3 + i) * 7); x.stroke(); }
  });
  const tapaM = new THREE.MeshStandardMaterial({ map: vetas, roughness: 0.5 });
  oficina.add(mesh(rbox(ESC.w, 0.05, ESC.d, 0.015), [M.madera, M.madera, tapaM, M.madera, M.madera, M.madera], O.x, ESC.y - 0.025, ESC.z));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) oficina.add(mesh(rbox(0.05, ESC.y - 0.05, 0.05, 0.01), M.navy, O.x + sx * (ESC.w / 2 - 0.06), (ESC.y - 0.05) / 2, ESC.z + sz * (ESC.d / 2 - 0.06)));
  oficina.add(mesh(rbox(ESC.w - 0.12, 0.5, 0.03, 0.01), M.madera, O.x, ESC.y - 0.33, ESC.z + ESC.d / 2 - 0.06)); // ronda 1: faldón de madera (antes una franja navy vacía)
  oficina.add(mesh(rbox(ESC.w - 0.1, 0.04, 0.035, 0.01), M.g, O.x, ESC.y - 0.1, ESC.z + ESC.d / 2 - 0.05));
  // monitor (en la esquina izquierda de Rubén, girado hacia la cámara)
  const mon = new THREE.Group(); mon.position.copy(MONP); mon.rotation.y = MON_RY; oficina.add(mon);
  mon.add(mesh(rbox(MONW + 0.06, MONH + 0.06, 0.05, 0.02), M.navy, 0, 0, -0.03));
  const pant = mesh(new THREE.PlaneGeometry(MONW, MONH), new THREE.MeshBasicMaterial({ map: monTV.t, toneMapped: false }), 0, 0, 0.0); mon.add(pant);
  mon.add(mesh(rbox(0.08, MONP.y - MONH / 2 - ESC.y + 0.02, 0.05, 0.01), M.navy, 0, -(MONP.y - ESC.y) / 2 - MONH / 4 + 0.01, -0.1));
  mon.add(mesh(rbox(0.3, 0.02, 0.2, 0.01), M.navy, 0, ESC.y - MONP.y + 0.01, -0.08));
  // carpeta verde
  // ronda 1: sin la carpeta verde (era un bloque verde en el centro del cuadro)
  sh(oficina);
  pant.castShadow = false;
}
// el teléfono fijo (base navy con teclado crema, tubo, cable enrulado navy)
const TEL = V(OO.x - 0.5, ESC.y, ESC.z + 0.08);
const telefono = new THREE.Group(); telefono.position.copy(TEL); telefono.rotation.y = 0.35; scene.add(telefono); telefono.updateMatrixWorld(true);
{
  telefono.add(mesh(rbox(0.26, 0.07, 0.24, 0.03), M.navy2, 0, 0.035, 0));
  const tk = tex(256, 256, (x, w, h) => { x.fillStyle = NAV; x.fillRect(0, 0, w, h); x.fillStyle = CRE; for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) rr(x, 40 + i * 64, 30 + j * 54, 48, 40, 8); });
  const tecl = mesh(new THREE.PlaneGeometry(0.11, 0.11), new THREE.MeshStandardMaterial({ map: tk, roughness: 0.6 }), 0.0, 0.0705, 0.05); tecl.rotation.x = -Math.PI / 2 + 0.05; telefono.add(tecl);
  telefono.add(mesh(rbox(0.22, 0.04, 0.07, 0.015), M.navy, 0, 0.08, -0.07)); // la horquilla
  sh(telefono);
}
const tuboT = new THREE.Group(); scene.add(tuboT); // el tubo: eje largo en x local, auricular en -x, micrófono en +x
{
  tuboT.add(mesh(rbox(0.2, 0.04, 0.05, 0.018), M.navy2, 0, 0, 0));
  for (const s of [-1, 1]) tuboT.add(mesh(rbox(0.07, 0.06, 0.075, 0.025), M.navy2, s * 0.1, -0.02, 0));
  tuboT.add(mesh(new THREE.CircleGeometry(0.024, 18), M.cr2, -0.1, -0.051, 0)).rotation.x = Math.PI / 2;
  sh(tuboT);
}
const cableT = new THREE.Mesh(new THREE.BufferGeometry(), mat(C.navy, 0.5)); cableT.castShadow = true; scene.add(cableT);
function curvaRulo(base, vueltas, r) {
  const pts = [], N = 300;
  const fr = base.computeFrenetFrames(N, false);
  for (let i = 0; i <= N; i++) {
    const u = i / N, p = base.getPointAt(u), a = u * vueltas * Math.PI * 2;
    pts.push(p.clone().addScaledVector(fr.normals[i], Math.cos(a) * r).addScaledVector(fr.binormals[i], Math.sin(a) * r));
  }
  return new THREE.CatmullRomCurve3(pts);
}
let _cableClave = "";
function ponerCable() {
  const a = V(-0.12, 0.04, 0).applyMatrix4(telefono.matrixWorld);
  const b = V(0.13, -0.02, 0).applyMatrix4(tuboT.matrixWorld);
  const clave = [a, b].map((p) => p.toArray().map((v) => v.toFixed(3)).join(",")).join("|");
  if (clave === _cableClave) return; _cableClave = clave;
  const L = a.distanceTo(b);
  const mid = a.clone().lerp(b, 0.5); mid.y -= Math.max(0.04, 0.32 - L * 0.4);
  const base = new THREE.CatmullRomCurve3([a, a.clone().lerp(mid, 0.5).add(V(0, -0.03, 0)), mid, mid.clone().lerp(b, 0.5), b]);
  cableT.geometry.dispose();
  cableT.geometry = new THREE.TubeGeometry(curvaRulo(base, Math.max(8, Math.round(L * 34)), 0.012), 600, 0.0045, 6, false);
}
// el mate y el termo
const mateR = crearMate(); scene.add(mateR); mateR.scale.setScalar(1.1);
const termo = crearTermo(); scene.add(termo); termo.scale.setScalar(1.15); termo.position.set(OO.x - 0.72, ESC.y, ESC.z - 0.22); sh(termo);
// el contador de llamadas (HUD 3D): 12 → 13 → 14 y, en s10, 0 verde
const contadores = { 12: textoGrupo("12", 0.36, 0.1, matN), 13: textoGrupo("13", 0.36, 0.1, matN), 14: textoGrupo("14", 0.36, 0.1, matR), 0: textoGrupo("0", 0.36, 0.1, matV) };
for (const c of Object.values(contadores)) pegarACamara(c, camera, 40);
// el depósito, abajo y atrás
const deposito = new THREE.Group(); scene.add(deposito);
{
  const O = OO, Y = PISO_DEP;
  const pisoD = mesh(new THREE.PlaneGeometry(40, 30), mat(0x8f939c, 0.9), O.x, Y, 0); pisoD.rotation.x = -Math.PI / 2; deposito.add(pisoD);
  const rackM = mat(C.edge, 0.5), larM = mat(C.cr, 0.55), palM = mat(0xd9be8f, 0.8);
  const az = azarDe(17);
  const rack = (cx, cz, ry, largo = 6) => {
    const g = new THREE.Group(); g.position.set(cx, Y, cz); g.rotation.y = ry; deposito.add(g);
    const n = Math.round(largo / 2);
    for (let i = 0; i <= n; i++) for (const zz of [-0.5, 0.5]) g.add(mesh(new THREE.BoxGeometry(0.1, 5.0, 0.1), rackM, -largo / 2 + (i * largo) / n, 2.5, zz));
    for (const y of [0.15, 1.75, 3.35]) for (const zz of [-0.5, 0.5]) g.add(mesh(new THREE.BoxGeometry(largo, 0.14, 0.08), larM, 0, y + 0.07, zz));
    for (const y of [0.22, 1.82, 3.42]) for (let i = 0; i < n * 2; i++) {
      const px = -largo / 2 + 0.5 + i * (largo - 1) / (n * 2 - 1);
      g.add(mesh(new THREE.BoxGeometry(0.9, 0.12, 0.9), palM, px, y + 0.06, 0));
      if (az() < 0.7) { const nb = 2 + Math.floor(az() * 3); for (let j = 0; j < nb; j++) g.add(mesh(new THREE.BoxGeometry(0.4, 0.3, 0.38), M.kraft, px + (j % 2 ? 0.21 : -0.21), y + 0.27 + Math.floor(j / 2) * 0.31, (j % 3) * 0.02)); }
    }
    return g;
  };
  rack(O.x, -4.2, 0, 12); rack(O.x - 0.5, -7.6, 0, 12); rack(O.x + 0.5, -11, 0, 12);
  for (const sx of [-2.1, 2.1]) for (const sz of [-1.6, 1.6]) deposito.add(mesh(new THREE.BoxGeometry(0.2, -Y, 0.2), M.navy2, O.x + sx, Y / 2 - 0.15, sz));
}
const pisoO = pisoSombra(OO.x, 0, 4.4, 4, 0.0);

// ================= personajes =================
const ruben = crearPersonaje({ ...ELENCO.ruben, parpadeoCada: 999 }); scene.add(ruben.raiz);
// ronda 3: las mejillas (discos transparentes de la cabeza) se inflan en el soplido
const MEJILLAS = ruben.cabeza.children.filter((o2) => o2.isMesh && o2.material.transparent && Math.abs(o2.scale.z - 0.012) < 1e-4);
const MEJ0 = MEJILLAS.map((o2) => o2.scale.clone());
// pelo de Rubén (solución de reels/ya-lo-cargo y por-que-el-99): corona oculta y herradura de bolitas canosas
{
  const corona = ruben.cabeza.children.find((o) => o.isMesh && o.geometry.type === "SphereGeometry" && Math.abs((o.geometry.parameters.phiLength || 0) - Math.PI * 1.14) < 1e-3);
  if (corona) {
    corona.visible = false;
    const pm = mat(0xb9b6b0, 0.85), pm2 = mat(0xa9a6a0, 0.85);
    const R0 = 0.3, CC0 = R0 * 0.92, az = azarDe(21);
    const bola = new THREE.SphereGeometry(1, 16, 12);
    const fila = (n, a0, a1, e0, eK, s0, sK, h) => {
      for (let i = 0; i < n; i++) {
        const u = (i + 0.5) / n, w = Math.sin(Math.PI * u);
        const a2 = lerp(a0, a1, u) + (az() - 0.5) * 0.07, e2 = e0 + eK * w + (az() - 0.5) * 0.09;
        const sz = s0 + sK * w + 0.014 * az(), k = 0.965;
        const m = mesh(bola, (i + n) % 4 ? pm : pm2, R0 * k * Math.sin(a2) * Math.cos(e2), CC0 + R0 * 0.97 * k * Math.sin(e2), R0 * 0.95 * k * Math.cos(a2) * Math.cos(e2));
        m.scale.set(sz, sz * h, sz); m.castShadow = true;
        ruben.cabeza.add(m);
      }
    };
    fila(24, 1.5, Math.PI * 2 - 1.5, -0.02, 0.04, 0.034, 0.03, 1.25);
    fila(11, 2.2, Math.PI * 2 - 2.2, -0.2, -0.04, 0.03, 0.022, 1.15);
  }
}
ruben.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const graciela = crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 999 }); scene.add(graciela.raiz);
graciela.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
// el celular de Graciela y el celular gigante del chat
const PPC = [512, 1036];
const celTV = texViva(...PPC);
function dibujarCelu(modo) {
  if (celTV.clave === modo) return; celTV.clave = modo;
  const x = celTV.x, [w, h] = PPC;
  x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
  x.fillStyle = NAV0; x.fillRect(0, 0, w, 150);
  x.textAlign = "left"; x.textBaseline = "middle";
  x.fillStyle = CRE; ajustar(x, "Distribuidora", 800, 54, w - 70); x.fillText("Distribuidora", 36, 78);
  if (modo === "nada") {
    x.fillStyle = "#ffffff"; rr(x, 30, 200, w - 120, 150, 30); x.fillStyle = NAV0; ajustar(x, "¿Y mi pedido?", 800, 50, w - 170); x.fillText("¿Y mi pedido?", 56, 275);
    x.fillStyle = "rgba(22,36,61,0.5)"; x.font = F(600, 40); x.fillText("sin respuesta", 56, 400);
  }
  celTV.t.needsUpdate = true;
}
function hacerCelular(W = 0.08, H = 0.162) {
  const g = new THREE.Group();
  g.add(mesh(rbox(W + 0.008, H + 0.008, 0.012, 0.012), M.navy3));
  const pant = mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: celTV.t, toneMapped: false }), 0, 0, 0.0066); g.add(pant);
  sh(g); pant.castShadow = false;
  return g;
}
const celuG = hacerCelular(); scene.add(celuG);
// el celular gigante del chat (s09): cuerpo navy, pantalla crema; las burbujas son 3D y caen solas
const KG = 11.6; // ronda 1: el celular llena la pantalla (88 % del ancho)
const gigante = new THREE.Group(); scene.add(gigante);
{
  const W2 = 0.08 * KG, H2 = 0.162 * KG;
  gigante.add(mesh(rbox(W2 + 0.07, H2 + 0.07, 0.1, 0.1), M.navy3, 0, 0, -0.05));
  // ronda 1: el MISMO chat del celular de Graciela ("¿Y mi pedido?" arriba); el encabezado queda debajo del subtítulo
  const gt = tex(512, 1036, (x, w, h) => {
    x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h); x.fillStyle = NAV0; x.fillRect(0, 0, w, 290);
    x.fillStyle = CRE; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "Distribuidora", 800, 46, w - 70); x.fillText("Distribuidora", 30, 258);
    x.fillStyle = "#ffffff"; rr(x, w - 300, 316, 270, 66, 22); x.strokeStyle = "rgba(22,36,61,0.3)"; x.lineWidth = 3; x.beginPath(); x.roundRect(w - 300, 316, 270, 66, 22); x.stroke();
    x.fillStyle = NAV0; ajustar(x, "¿Y mi pedido?", 800, 34, 240); x.fillText("¿Y mi pedido?", w - 284, 350);
    x.fillStyle = "rgba(22,36,61,0.12)"; rr(x, 20, h - 66, w - 40, 46, 23);
  });
  gigante.add(mesh(new THREE.PlaneGeometry(W2, H2), new THREE.MeshBasicMaterial({ map: gt, toneMapped: false }), 0, 0, 0.002));
  sh(gigante); gigante.children[1].castShadow = false;
  gigante.userData.W = W2; gigante.userData.H = H2;
}
function hacerBurbuja(txt, fondo, tinta, tilde, ancho, alto, px) {
  const g = new THREE.Group();
  const t = tex(1024, Math.round((1024 * alto) / ancho), (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.fillStyle = tinta; x.textAlign = "left"; x.textBaseline = "middle";
    ajustar(x, txt, 800, px, w - (tilde ? 230 : 80)); x.fillText(txt, 46, h / 2 + 6);
    if (tilde) { x.fillStyle = NAV0; x.beginPath(); x.arc(w - 100, h / 2, 62, 0, 7); x.fill(); x.strokeStyle = VER; x.lineWidth = 18; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(w - 132, h / 2 + 2); x.lineTo(w - 108, h / 2 + 26); x.lineTo(w - 66, h / 2 - 24); x.stroke(); }
  });
  const m = new THREE.MeshBasicMaterial({ map: t, toneMapped: false });
  const cuerpo = mesh(rbox(ancho + 0.04, alto + 0.04, 0.06, 0.09), new THREE.MeshStandardMaterial({ color: new THREE.Color(tinta === NAV0 && fondo === "#ffffff" ? NAV0 : fondo), roughness: 0.5 }), 0, 0, -0.035); g.add(cuerpo);
  g.add(mesh(new THREE.PlaneGeometry(ancho - 0.06, alto - 0.04), m, 0, 0, 0.001));
  return sh(g);
}
const AVISOS = [["Preparando", true], ["Sale hoy 14:00", true], ["En camino", false], ["Entregado", true]];
const burbujas = AVISOS.map(([txt, tilde], i) => { const b = hacerBurbuja(txt, i === 3 ? VER : "#ffffff", NAV0, tilde, 0.78, 0.18, 104); gigante.add(b); return b; });
// el camión de reparto de la distribuidora (navy, caja crema con franja verde)
const camion = new THREE.Group(); scene.add(camion);
const ruedas = [];
{
  camion.add(mesh(rbox(1.5, 0.95, 0.9, 0.06), M.navy2, -0.35, 0.78, 0)); // ronda 1: caja navy (la crema se perdía en el chat)
  camion.add(mesh(rbox(1.52, 0.14, 0.92, 0.03), M.g, -0.35, 0.62, 0));
  camion.add(mesh(rbox(0.62, 0.72, 0.86, 0.1), M.navy, 0.75, 0.66, 0));
  camion.add(mesh(rbox(0.04, 0.32, 0.7, 0.03), mat(0xcfe0e6, 0.15, { emissive: 0xdfeef2, emissiveIntensity: 0.3 }), 1.06, 0.82, 0));
  camion.add(mesh(rbox(2.1, 0.12, 0.8, 0.03), M.navy, 0.0, 0.3, 0));
  for (const x of [-0.75, 0.75]) for (const z of [-0.42, 0.42]) { const r2 = new THREE.Group(); r2.position.set(x, 0.2, z); camion.add(r2); r2.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 20).rotateX(Math.PI / 2), M.goma)); r2.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.15, 12).rotateX(Math.PI / 2), M.cromo)); ruedas.push(r2); }
  sh(camion);
}
// ================= ZONA F: el cierre verde (el mate humeando) =================
function suavizarMate(g) {
  const perfil = [[0, 0], [0.045, 0.004], [0.075, 0.03], [0.085, 0.07], [0.078, 0.11], [0.062, 0.135], [0.058, 0.14]].map(([r, y]) => new THREE.Vector2(r, y));
  g.children[0].geometry = new THREE.LatheGeometry(perfil, 96);
}
function hacerVapor(R0) {
  const g = new THREE.Group();
  const m = new THREE.MeshStandardMaterial({ color: 0xf7fbf2, emissive: 0xe8f5df, emissiveIntensity: 0.35, roughness: 0.9 });
  const tubos = [];
  for (let i = 0; i < 3; i++) { const tb = new THREE.Mesh(new THREE.BufferGeometry(), m); g.add(tb); tubos.push(tb); }
  g.userData.poner = (t) => {
    tubos.forEach((tb, i) => {
      const H = R0 * (0.75 + 0.25 * ((i + 1) % 3) / 2);
      const pts = [], fase = i * 2.1, dx = (i - 1) * 0.11 * R0;
      for (let j = 0; j <= 24; j++) { const u = j / 24, y = u * H; pts.push(V(dx * (1 - u * 0.4) + Math.sin(u * 7 - t * 3.2 + fase) * 0.09 * R0 * (0.25 + u), y, Math.cos(u * 5 - t * 2.4 + fase) * 0.05 * R0 * u)); }
      tb.geometry.dispose();
      const curva = new THREE.CatmullRomCurve3(pts), TS = 48, RS = 10;
      const geo = new THREE.TubeGeometry(curva, TS, 0.04 * R0, RS, false);
      const pos = geo.attributes.position, c0 = V(0, 0, 0), v = V(0, 0, 0);
      for (let j = 0; j <= TS; j++) { curva.getPointAt(j / TS, c0); const f = 1 - 0.85 * Math.pow(j / TS, 1.3); for (let q = 0; q <= RS; q++) { const n = j * (RS + 1) + q; v.fromBufferAttribute(pos, n).sub(c0).multiplyScalar(f).add(c0); pos.setXYZ(n, v.x, v.y, v.z); } }
      pos.needsUpdate = true; geo.computeVertexNormals(); tb.geometry = geo;
    });
  };
  scene.add(g); return g;
}
const mateF = crearMate(); scene.add(mateF); mateF.scale.setScalar(5.2); suavizarMate(mateF); sh(mateF);
const vaporF = hacerVapor(0.75);
const pisoF = pisoSombra(OF.x, 0, 8, 8, 0.2);

// ================= CÁMARA =================
// s01: Rubén camina hacia la cámara; la cámara retrocede con él (zoom de vértigo: se acerca y abre el ángulo, Rubén
// queda del mismo tamaño y el pasillo de atrás se estira)
const VEL = 0.85, ZR0 = -25.5;
const zRuben = (t) => ZR0 + VEL * Math.min(t, T.s03);
const K_RUB = 2.0; // d · tan(fov/2): alto que queda en cuadro alrededor de Rubén
function camS01(t) {
  const u = eio(sg(t, T.estira - 0.7, T.estira + 0.9));
  const d = lerp(7.8, 4.3, u), fov = 2 * THREE.MathUtils.radToDeg(Math.atan(K_RUB / d));
  const z = zRuben(t);
  return { pos: [0.18, 1.32, z + d], mira: [0, 1.35, z], fov };
}
const kk = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const b = (x, y, z) => [CB.x + x, y, CB.z + z];
const m3 = (x, y, z) => [OM.x + x, y, OM.z + z];
const o = (x, y, z) => [OO.x + x, y, z];
let PLANOS = null;
function armarPlanos() {
  const c1 = camS01(T.s02);
  const zr2 = zRuben(T.s02 + 0.8);
  // la cámara del match cut: desde arriba de la cinta de verdad y de la chica (misma escala en pantalla)
  const HB = 7.0; // alto de la cámara sobre la cinta (a fov 34)
  return [
    ["S01", 0, null],
    ["AB", T.s02, [
      kk(T.s02, c1.pos, c1.mira, c1.fov),
      kk(T.s02 + 0.5, [1.2, 3.6, zr2 + 5.5], [0, 1.0, zr2 - 1.0], 36),
      kk(T.s02 + 1.0, [1.3, 11.5, 5.5], [0, 0, -16.5], 40),
      kk(T.s03 - 0.4, [1.1, 11.0, 4.8], [0, 0, -17.0], 40),
      // picado que baja a la cinta (el "?" cae en la isla)
      kk(T.s03 - 0.05, b(-0.25, 5.0, 7.6), b(-0.45, 0.75, -0.3), 38),
      kk(T.espera + 0.25, b(0.7, 3.9, 8.6), b(-0.7, 0.85, -0.1), 38),
      // órbita corta mientras se llena la barra
      kk(T.siete, b(-0.4, 3.5, 7.8), b(-0.85, 0.85, -0.1), 38),
      kk(T.cinta + 0.1, b(-1.35, 3.2, 6.9), b(-0.8, 0.8, -0.1), 38),
      // grúa: arriba de la cinta, mirando derecho para abajo
      kk(T.s04 - 0.2, b(0, HB, 0.25), b(0, 0, 0), 34),
      kk(T.s04, b(0, HB + 0.3, 0.02), b(0, 0, 0), 34),
    ]],
    // match cut: la cinta chica de la maqueta (KMQ) desde arriba, mismo tamaño en pantalla; la cámara se abre
    ["M", T.s04, [
      kk(T.s04, m3(CC1.x, CC1.y + (HB + 0.3) * KMQ, CC1.z + 0.002), m3(CC1.x, CC1.y, CC1.z), 34),
      kk(T.s04 + 0.7, m3(0, 5.0, 2.7), m3(0, 0.25, -0.05), 40),
      kk(T.puertas, m3(0, 6.6, 2.4), m3(0, 0.25, -0.95), 40),
      kk(T.s05, m3(0, 6.7, 2.8), m3(0, 0.25, -0.9), 40),
      // el libro entero de 3/4 (la maqueta se pliega, pasan las páginas)
      kk(T.s05 + 0.9, m3(0, 5.6, 6.2), m3(0, 0.2, 0.1), 40),
      kk(T.n1985, m3(0.2, 5.4, 6.4), m3(0, 0.2, 0.05), 40),
      kk(T.s06 - 0.1, m3(0.1, 4.0, 6.4), m3(0, 0.6, 0.0), 38),
      // nace el reloj de arena: contrapicado leve y push-in
      kk(T.vacia, m3(0.2, 2.15, 7.1), m3(0, 1.6, 0), 36),
      kk(T.mas + 0.3, m3(0.1, 2.15, 7.0), m3(0, 1.7, 0), 36),
      // el reloj de "?"
      kk(T.laQue + 0.5, m3(0, 1.6, 6.0), m3(0, 1.45, 0), 36),
      kk(T.s07, m3(0, 1.6, 5.5), m3(0, 1.48, 0), 36),
    ]],
    // corte seco a la oficina: Rubén de frente, plano medio
    ["O", T.s07, [
      kk(T.s07, o(0.3, 1.45, 3.3), o(0.32, 1.18, -0.1), 50),
      kk(T.push - 0.1, o(0.32, 1.43, 3.1), o(0.34, 1.18, -0.1), 50),
      // push-in al monitor (las tarjetas)
      kk(T.s08, o(0.45, 1.12, 1.05), [MONP.x, MONP.y, MONP.z], 45),
    ]],
    // la cinta otra vez (mismo encuadre que s04) con las cajas y Graciela
    ["B2", T.s08, [
      kk(T.s08, b(0.9, 2.2, 3.0), b(1.0, 0.45, 0.6), 38),
      kk(T.s08 + 0.7, b(-0.3, 3.5, 7.9), b(-0.85, 0.85, -0.1), 38),
      kk(T.cinta8, b(-0.9, 3.4, 7.5), b(-0.85, 0.9, 0.0), 38),
      kk(T.s09, b(-1.0, 2.6, 5.6), b(-1.3, 1.05, 1.2), 38), // ronda 1: sin push-in a la cara; corte seco al celular
    ]],
    // el celular gigante (corte escondido): el chat llena la pantalla
    ["P", T.s09, [
      kk(T.s09, b(0, 1.0, 3.4 + 3.62), b(0, 1.0, 3.4), 34),
      kk(T.s10, b(0, 1.0, 3.4 + 3.48), b(0, 1.0, 3.4), 34),
    ]],
    ["O2", T.s10, [
      kk(T.s10, o(0.3, 1.45, 3.3), o(0.32, 1.18, -0.1), 50),
      kk(T.se, o(0.3, 1.44, 3.15), o(0.32, 1.19, -0.12), 49),
      kk(T.fin, o(0.3, 1.43, 3.0), o(0.32, 1.2, -0.15), 48),
    ]],
    ["F", T.fin, [
      kk(T.fin, [OF.x, 1.7, 7.4], [OF.x, 1.45, 0]),
      kk(DUR, [OF.x, 1.68, 7.1], [OF.x, 1.45, 0]),
    ]],
  ];
}
const _mira = new THREE.Vector3();
let plano = "S01";
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return pi; }
function ponerCamara(t) {
  const pi = planoEn(t);
  plano = PLANOS[pi][0];
  const K = PLANOS[pi][2];
  let vv;
  if (!K) { const c = camS01(t); vv = [...c.pos, ...c.mira, c.fov]; }
  else {
    let i = 0; while (i + 1 < K.length - 1 && K[i + 1][0] <= t) i++;
    const a0 = K[i], b0 = K[Math.min(i + 1, K.length - 1)];
    const hh = b0[0] - a0[0];
    const u = hh > 0 ? cl((t - a0[0]) / hh) : 0;
    const tang = (j, cc) => {
      if (j <= 0 || j >= K.length - 1) return 0;
      const p = K[j - 1], q = K[j], r2 = K[j + 1];
      const d1 = (q[cc] - p[cc]) / Math.max(1e-4, q[0] - p[0]), d2 = (r2[cc] - q[cc]) / Math.max(1e-4, r2[0] - q[0]);
      if (d1 * d2 <= 0) return 0;
      const m = (r2[cc] - p[cc]) / Math.max(1e-4, r2[0] - p[0]);
      return Math.sign(m) * Math.min(Math.abs(m), 3 * Math.abs(d1), 3 * Math.abs(d2));
    };
    const s2 = u * u, s3 = s2 * u;
    vv = [];
    for (let cc = 1; cc <= 7; cc++) {
      if (hh <= 0) { vv.push(a0[cc]); continue; }
      vv.push((2 * s3 - 3 * s2 + 1) * a0[cc] + (s3 - 2 * s2 + u) * hh * tang(i, cc) + (-2 * s3 + 3 * s2) * b0[cc] + (s3 - s2) * hh * tang(i + 1, cc));
    }
  }
  camera.position.set(vv[0], vv[1], vv[2]);
  const amp = 0.002;
  camera.position.x += Math.sin(t * 0.7) * amp; camera.position.y += Math.sin(t * 0.53) * amp;
  camera.position.y += rebote(t, T.cae + 0.3, 9, 50, 0.02); // el "?" golpea la cinta
  _mira.set(vv[3], vv[4], vv[5]);
  camera.fov = vv[6];
  const dd = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.005, Math.min(0.08, dd * 0.03)); camera.far = 200;
  camera.updateProjectionMatrix();
  camera.up.set(0, 1, 0);
  const dir = _mira.clone().sub(camera.position).normalize();
  if (Math.abs(dir.y) > 0.97) camera.up.set(0, 0, -1);
  if (window.__portada) { camera.position.set(0.15, 1.3, zRuben(0.8) + 5.4); camera.fov = 2 * THREE.MathUtils.radToDeg(Math.atan(K_RUB * 1.3 / 5.4)); camera.updateProjectionMatrix(); _mira.set(0, 0.55, zRuben(0.8)); } // ronda 3: Rubén arriba (el título va abajo)
  camera.lookAt(_mira);
  camera.updateMatrixWorld(true);
}

// ================= personajes en el tiempo =================
function manoA(p, pr, lado, pt, u, codo) {
  if (u <= 0.001) return;
  p.poner(pr); p.raiz.updateMatrixWorld(true);
  const h = pt.clone(); p.cuerpo.worldToLocal(h);
  const k2 = "mano" + lado;
  pr[k2] = pr[k2].map((v, i) => lerp(v, [h.x, h.y, h.z][i], u));
  if (codo) pr["codo" + lado] = codo;
}
function bocaRuben(t) { const i = Math.round((t - BOCA.t0) * BOCA.fps); return i >= 0 && i < BOCA.v.length ? BOCA.v[i] : 0; }
const parp = (t, t0) => (t > t0 && t < t0 + 0.14 ? Math.sin(((t - t0) / 0.14) * Math.PI) : 0);
function zonaRuben(t) {
  ruben.raiz.visible = true; mateR.visible = true; termo.visible = false;
  // ---- s01-s02: camina por el pasillo hacia la cámara, mate en la derecha, resignado ----
  if (plano === "S01" || (plano === "AB" && t < T.s03 - 0.4)) {
    const z = zRuben(t);
    const pr = poseEn(t, [
      [0, { ...CARA.resignado, x: 0, y: 0, z, giro: 0, paso: 1, pasoVel: 7.5, inclina: 0.06, cabeza: { giro: 0, asiente: 0.08, ladea: 0.05 }, ojos: { x: 0, y: 0.1, abiertos: 0.55, tension: 0.5 }, cejas: { alto: 0.35, ang: 0.85 } }],
      [T.estira + 0.3, { cabeza: { giro: 0.0, asiente: -0.12, ladea: -0.04 }, ojos: { x: 0, y: 0.6, abiertos: 0.7 }, cejas: { alto: 0.6, ang: 0.6 } }, 0.4],
      [T.s02 + 0.3, { cabeza: { giro: 0, asiente: 0.1, ladea: 0.05 }, ojos: { x: 0, y: 0, abiertos: 0.5 } }, 0.4],
    ]);
    pr.t = t; pr.z = z; pr.paso = 1; pr.pasoVel = 7.5;
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    manoA(ruben, pr, "D", V(-0.2, 1.0, z + 0.28), 1, [-1, -0.7, -0.2]);
    manoA(ruben, pr, "I", V(0.33, 0.62 + Math.sin(t * 7.5) * 0.02, z + 0.04), 1, [1, -0.6, 0]);
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const md = ruben.mano("D").getWorldPosition(V(0, 0, 0));
    mateR.position.copy(md).add(V(-0.02, -0.07, 0.03)); mateR.rotation.set(0, 0.4, 0); mateR.scale.setScalar(1.1);
    return;
  }
  // ---- s03: parado frente a la cinta (a la izquierda), mira la boca; mate frío en la izquierda ----
  if (plano === "AB") {
    const P = V(CB.x - 1.75, 0, CB.z + 1.3);
    const pr = poseEn(t, [
      [0, { ...CARA.resignado, x: P.x, y: 0, z: P.z, giro: 0.75, inclina: 0.03, cabeza: { giro: -0.55, asiente: 0.05, ladea: 0.04 }, ojos: { x: -0.6, y: 0.2, abiertos: 0.6, tension: 0.4 }, cejas: { alto: 0.3, ang: 0.8 } }],
      [T.ocho + 0.2, { cabeza: { giro: -0.2, asiente: 0.1, ladea: -0.06 }, ojos: { x: -0.1, y: -0.1, abiertos: 0.5 } }, 0.35],
      [T.siete + 0.2, { ...CARA.fastidio, cabeza: { giro: -0.6, asiente: 0.02, ladea: 0.08 }, ojos: { x: -0.7, y: 0.1, abiertos: 0.45 } }, 0.35],
      [T.sale + 0.35, { ...CARA.sorpresa, inclina: -0.04, cabeza: { giro: -0.65, asiente: -0.05, ladea: 0 }, ojos: { x: -0.7, y: 0.2, abiertos: 1 }, boca: { sonrisa: 0.2, abierta: 0.3, ancho: 0.8 } }, 0.25],
    ]);
    // golpea el pie: el cuerpo sube y baja un poco
    pr.y = Math.max(0, Math.sin(t * 9)) * 0.012 * (t < T.sale ? 1 : 0);
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    manoA(ruben, pr, "I", V(P.x + 0.24, 0.98, P.z + 0.22), 1, [1, -0.7, -0.2]);
    manoA(ruben, pr, "D", V(P.x - 0.1, 0.62, P.z - 0.18), 1, [-1, -0.3, -0.1]);
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const mi = ruben.mano("I").getWorldPosition(V(0, 0, 0));
    mateR.position.copy(mi).add(V(0.02, -0.07, 0.02)); mateR.rotation.set(0, 0, 0); mateR.scale.setScalar(1.1);
    return;
  }
  // ---- oficina (s07, s10) ----
  if (plano === "O" || plano === "O2") {
    termo.visible = true;
    const base = { x: RUB.x, y: -0.06, z: RUB.z, giro: 0, sentado: 1, inclina: 0.04, t };
    let pr;
    const s07 = plano === "O";
    if (s07) {
      pr = poseEn(t, [
        [T.s07, { ...base, ...CARA.fastidio, cabeza: { giro: 0.08, asiente: 0.04, ladea: -0.12 }, ojos: { x: 0, y: 0, abiertos: 0.62 }, cejas: { alto: -0.2, ang: -0.3, asim: 0.4 }, boca: { sonrisa: -0.3, abierta: 0, ancho: 0.85 } }],
        [T.te, { cabeza: { giro: 0.0, asiente: 0.0, ladea: -0.14 }, ojos: { x: 0, y: 0, abiertos: 0.62 }, cejas: { alto: 0.1, ang: 0.4 } }, 0.3],
        [T.hora + 0.25, { ...CARA.resignado, cabeza: { giro: 0.0, asiente: 0.1, ladea: -0.12 }, ojos: { x: 0, y: 0, abiertos: 0.6, tension: 0.4 } }, 0.3],
      ]);
    } else {
      pr = poseEn(t, [
        [T.s10, { ...base, ...CARA.neutra, inclina: -0.05, cabeza: { giro: 0.0, asiente: -0.02, ladea: 0.04 }, ojos: { x: 0, y: 0, abiertos: 0.75, feliz: 0.2 }, boca: { sonrisa: 0.4, abierta: 0, ancho: 1.0 } }],
        [T.llamo + 0.2, { cabeza: { giro: -0.35, asiente: 0.15, ladea: 0.02 }, ojos: { x: -0.7, y: -0.5, abiertos: 0.8 }, cejas: { alto: 0.25, ang: 0.1, asim: 0.5 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.85 } }, 0.3],
        [T.levanta + 0.35, { ...CARA.incredula, cabeza: { giro: -0.32, asiente: 0.0, ladea: 0.1 }, ojos: { x: -0.7, y: 0.1, abiertos: 0.62 }, cejas: { alto: 0.1, ang: -0.2, asim: 0.9 } }, 0.3],
        [T.sopla + 0.15, { cabeza: { giro: 0.0, asiente: 0.04, ladea: 0.0 }, ojos: { x: -0.2, y: -0.3, abiertos: 0.7 }, cejas: { alto: 0.2, ang: -0.3, asim: 0.4 }, boca: { sonrisa: -0.2, abierta: 0.12, ancho: 0.52 } }, 0.15],
        [T.sopla + 0.6, { boca: { sonrisa: -0.2, abierta: 0.12, ancho: 0.52 } }, 0.05],
        [T.miraCam, { cabeza: { giro: 0.0, asiente: 0.02, ladea: 0.04 }, ojos: { x: 0, y: 0, abiertos: 0.8 }, cejas: { alto: 0.45, ang: 0.1, asim: 0.6 }, boca: { sonrisa: 0.1, abierta: 0, ancho: 0.9 } }, 0.3],
        [T.agenda + 0.1, { ...CARA.sonrisa, cabeza: { giro: 0.0, asiente: 0.0, ladea: 0.06 }, ojos: { x: 0, y: 0, abiertos: 0.85, feliz: 0.4 }, cejas: { alto: 0.3, asim: -0.5 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.05 } }, 0.35],
      ]);
    }
    pr.t = t; Object.assign(pr, { x: base.x, y: base.y, z: base.z, giro: 0, sentado: 1 });
    if (s07 && t > T.hora + 0.5) { pr.ojos = { ...pr.ojos, abiertos: pr.ojos.abiertos * (1 - parp(t, T.hora + 0.55)) }; } // ronda 1: parpadeo después de hablar
    if (t > BOCA.t0 - 0.05) { const bb = bocaRuben(t); pr.boca = { ...pr.boca, abierta: Math.max(pr.boca.abierta, bb * 0.5), ancho: lerp(pr.boca.ancho, 0.78, bb) }; }
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    // ronda 1: el tubo en la oreja de verdad (la oreja está a y 0,26 del origen de la cabeza); en s10 sube de la horquilla
    // al costado de la cara, la mano lo sigue entera (sin brazo de goma) y vuelve a la mesa recién cuando el tubo está colgado
    const horq = V(0, 0.105, -0.07).applyMatrix4(telefono.matrixWorld);
    const frente = V(RUB.x - 0.34, 1.32, RUB.z + 0.62);
    const h = s07 ? 0 : eio(sg(t, T.levanta, T.levanta + 0.35)) * (1 - eio(sg(t, T.cuelga, T.cuelga + 0.35)));
    let golpe = 0; for (const tk of T.toca) golpe += pulso(t, tk - 0.08, 0.16);
    const ponerTubo = () => {
      if (s07) {
        ruben.raiz.updateMatrixWorld(true);
        const c = V(-0.355, 0.17, 0.07); ruben.cabeza.localToWorld(c);
        tuboT.position.copy(c); tuboT.quaternion.copy(ruben.cabeza.getWorldQuaternion(new THREE.Quaternion()));
        tuboT.rotateY(0.2); tuboT.rotateZ(-1.25);
      } else {
        tuboT.position.copy(horq).lerp(frente, h); tuboT.position.y -= golpe * 0.012;
        tuboT.rotation.set(lerp(0, 0.15, h), lerp(0.35, -0.45, h), lerp(0, -0.25, h), "YXZ");
        // ronda 2: el gesto de soplar: el tubo frente a la boca (sin tocar la cara) y vuelve al costado
        const sop = eio(sg(t, T.sopla, T.sopla + 0.2)) * (1 - eio(sg(t, T.sopla + 0.6, T.sopla + 0.8)));
        MEJILLAS.forEach((o2, i) => o2.scale.set(MEJ0[i].x * (1 + 0.5 * sop), MEJ0[i].y * (1 + 0.6 * sop), MEJ0[i].z * (1 + 3.5 * sop)));
        if (sop > 0.001) {
          ruben.raiz.updateMatrixWorld(true);
          const boca = V(-0.03, 0.04, 0.47); ruben.cabeza.localToWorld(boca); // ronda 3: a la altura del mentón
          tuboT.position.lerp(boca, sop);
          tuboT.rotation.set(lerp(0.15, 0.0, sop), lerp(-0.45, 0.0, sop), lerp(-0.25, 0.0, sop), "YXZ");
        }
      }
      tuboT.updateMatrixWorld(true);
    };
    ponerTubo();
    const agarre = () => V(0.0, -0.05, -0.005).applyMatrix4(tuboT.matrixWorld);
    // el mate en la izquierda, a la altura del pecho (siempre a la vista: el monitor quedó más a la derecha)
    manoA(ruben, pr, "I", V(RUB.x + 0.02, s07 ? 0.86 : lerp(0.86, 0.9, eio(sg(t, T.s10, T.s10 + 0.4))), RUB.z + 0.76), 1, [1, -0.7, -0.2]); // ronda 2: más baja y afuera
    if (s07) manoA(ruben, pr, "D", agarre(), 1, [-1, -0.75, -0.15]);
    else {
      const wH = eio(sg(t, T.levanta - 0.3, T.levanta)) * (1 - eio(sg(t, T.cuelga + 0.35, T.cuelga + 0.65)));
      const reposo = V(RUB.x - 0.28, ESC.y + 0.05, ESC.z - 0.1);
      manoA(ruben, pr, "D", reposo.clone().lerp(agarre(), wH), 1, [-1, -0.7, -0.15]);
      pr.dedoD = 0;
    }
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    ponerTubo();
    const mi = ruben.mano("I").getWorldPosition(V(0, 0, 0));
    mateR.position.copy(mi).add(V(0.03, -0.08, 0.02)); mateR.rotation.set(0, 0, -0.55); mateR.scale.setScalar(1.1); // ronda 2: inclinado hacia afuera: la bombilla apunta lejos de la cara // ronda 2: la bombilla apunta hacia afuera (no a la oreja)
    tuboT.updateMatrixWorld(true); telefono.updateMatrixWorld(true);
    ponerCable();
    return;
  }
  ruben.raiz.visible = false; mateR.visible = false;
}
function zonaGraciela(t) {
  const en = plano === "B2";
  graciela.raiz.visible = en; celuG.visible = en;
  if (!en) return;
  const P = V(CB.x - 1.75, 0, CB.z + 1.3);
  const pr = poseEn(t, [
    [T.s08, { ...CARA.esperanza, x: P.x, y: 0, z: P.z, giro: 0.75, cabeza: { giro: -0.5, asiente: 0.05, ladea: 0.05 }, ojos: { x: -0.6, y: 0.2, abiertos: 1 }, ...BRAZOS.celular }],
    [T.noticias + 0.1, { ...CARA.fastidio, cabeza: { giro: -0.1, asiente: 0.35, ladea: -0.05 }, ojos: { x: 0, y: -0.8, abiertos: 0.7 } }, 0.35],
    [T.cinta8 - 0.1, { cabeza: { giro: -0.55, asiente: 0.05, ladea: 0.08 }, ojos: { x: -0.7, y: 0.2, abiertos: 0.8 }, cejas: { alto: 0.5, ang: 0.6 } }, 0.35],
    [T.s09 - 0.15, { cabeza: { giro: -0.05, asiente: 0.35, ladea: -0.02 }, ojos: { x: 0, y: -0.8, abiertos: 0.9 } }, 0.3],
  ]);
  pr.t = t; graciela.poner(pr); graciela.raiz.updateMatrixWorld(true);
  const ml = graciela.mano("I").getWorldPosition(V(0, 0, 0)), mr = graciela.mano("D").getWorldPosition(V(0, 0, 0));
  celuG.position.copy(ml).lerp(mr, 0.5).add(V(0.0, 0.15, 0.0));
  celuG.rotation.set(-0.55, 0.75, 0, "YXZ"); celuG.scale.setScalar(1.15);
  dibujarCelu("nada");
}

// ================= zonas en el tiempo =================
function zonaA(t) {
  const en = plano === "S01" || (plano === "AB" && t < T.s03 + 0.6);
  pasillo.visible = cartel.visible = en;
  tramosG.forEach((g, i) => {
    const t0 = i === 0 ? T.tramo1 : T.tramos[i - 1];
    const k = sg(t, t0, t0 + 0.2);
    g.visible = en && k > 0;
    g.userData.rel.material.opacity = 0.85 * k;
    g.children[1].scale.set(Math.max(0.01, k), 1, 1);
  });
  // el cartel viaja con Rubén (siempre 2,6 m delante, arriba)
  const z = zRuben(Math.min(t, T.s03));
  cartel.position.set(0, 2.25, z - 2.0 - 0.12 * Math.sin(t * 1.3)); cartel.scale.setScalar(Math.max(0.001, 0.66 * (1 - eio(sg(t, T.s02 - 0.05, T.s02 + 0.2))))); // al subir la grúa se va (no queda debajo del subtítulo)
  cartel.visible = en && t < T.s02 + 0.2; cartel.rotation.set(0, 0, Math.sin(t * 1.7) * 0.015);
  // "× 6" y "casi 0"
  const k6 = popIn(t, T.x6, 0.3) * (1 - sg(t, T.s03 - 0.35, T.s03 - 0.15));
  x6.visible = (plano === "AB") && k6 > 0.02;
  if (x6.visible) { hud(x6, 240, 620, k6 * 170); x6.rotation.y = 0.12 * Math.sin(t * 2); }
  // ronda 1: el medidor de quejas (en "quejas") se vacía con los globos hasta "casi 0"
  const fueraN = 1 - sg(t, T.s03 - 0.35, T.s03 - 0.15);
  const km = popIn(t, T.quejas, 0.3) * fueraN * (1 - sg(t, T.casi0 + 0.55, T.casi0 + 0.7)); // ronda 2: se va al vaciarse
  medidor.visible = (plano === "AB") && km > 0.02;
  if (medidor.visible) hud(medidor, 860, 1060, km * 80);
  medBloques.forEach((bq, i) => { const off = sg(t, T.casi0 + i * 0.07, T.casi0 + i * 0.07 + 0.12); bq.visible = i === 0 || off < 0.99; bq.scale.set(1, Math.max(0.05, 1 - off), 1); });
  const kc = popIn(t, T.casi0 + 0.3, 0.3) * fueraN;
  casi0.visible = (plano === "AB") && kc > 0.02;
  if (casi0.visible) hud(casi0, 860, 1180, kc * 95);
  VIGAS.forEach((v) => (v.visible = plano === "S01"));
  // globos de queja
  globos.forEach((g, i) => {
    const [gx, gy, gz] = GLOBO_POS[i];
    const k = popIn(t, T.globos[i], 0.3);
    const des = sg(t, T.desinfla + i * 0.04, T.desinfla + 0.35 + i * 0.04);
    const s2 = k * (1 - eio(des)) * (1 + 0.08 * Math.sin((t - T.desinfla) * 40) * (des > 0 && des < 1 ? 1 : 0));
    g.visible = en && plano === "AB" && s2 > 0.18; // ronda 1: sin motas al final del desinflado
    g.position.set(gx, gy - des * 1.6, gz);
    g.scale.setScalar(s2 * 2.0);
    g.lookAt(camera.position);
  });
}
function zonaB(t) {
  const enAB = plano === "AB" && t > T.s03 - 0.6;
  const en = enAB || plano === "B2" || plano === "P";
  hall.visible = pisoB.visible = en;
  // el cinturón gira (lento); en s09 un poco más rápido
  const vel = plano === "P" ? 0.55 : 0.32;
  const s0 = t * vel;
  const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler();
  for (let i = 0; i < NSL; i++) {
    const c = cintaEn(s0 + (i / NSL) * LB, 0.0);
    _e.set(0, -c.dir + Math.PI / 2, 0.06); _q.setFromEuler(_e);
    _m.compose(c.p.clone().add(V(0, 0.02 + (i % 2) * 0.008, 0)), _q, V(1, 1, 1)); tablillas.setMatrixAt(i, _m);
  }
  tablillas.instanceMatrix.needsUpdate = true;
  // cortina: se mueve sola; cuando sale algo, se abre
  tiras.forEach((p, i) => { p.rotation.x = Math.sin(t * 2.2 + i * 0.7) * 0.05 + (plano === "AB" ? 0.5 * pulso(t, T.sale - 0.05, 0.6) : 0) + (plano === "P" ? 0.4 * pulso(t, T.avisos[3] - 0.3, 0.6) : 0); });
  // valijas: solo al final de s03 (salen de a una por la boca)
  VALIJAS.forEach((v, i) => {
    const t0 = T.sale + i * 0.18;
    const vis = enAB && t > t0;
    v.visible = vis;
    if (!vis) return;
    const c = cintaEn((t - t0) * 0.9 + 0.02, 0);
    v.position.copy(c.p).add(V(0, 0.05, 0)); v.rotation.set(0, -c.dir + Math.PI / 2 + 0.2 * (i % 2 ? 1 : -1), 0);
  });
  // cajas (s08-s09)
  const enCajas = plano === "B2" || plano === "P";
  CAJAS.forEach((c, i) => {
    c.visible = enCajas;
    const cc = cintaEn(s0 + 0.6 + i * (LB / 5), 0);
    c.position.copy(cc.p).add(V(0, 0.05, 0)); c.rotation.set(0, -cc.dir + Math.PI / 2 + i * 0.3, 0);
    const tk = tildesCaja[i];
    const kt = plano === "P" ? popIn(t, T.avisos[Math.min(3, i % 4)] + 0.1 + i * 0.05, 0.25) : 0;
    ocultar(tk, 0); void kt; // ronda 1: sin tildes en las cajas (quedaban cortadas a los costados) tk.position.copy(cc.p).add(V(0, 0.68, 0)); tk.lookAt(camera.position);
  });
  // el "?" cae en la isla y rebota; en "Esperaban" se achica y sale
  {
    const cae = sg(t, T.cae, T.cae + 0.3);
    const y = t < T.cae ? 9 : lerp(0.55, 0, cae * cae) + Math.abs(rebote(t, T.cae + 0.3, 7, 16, 0.2)); // ronda 3: cae de poco (no cruza la placa del subtítulo)
    const va = eio(sg(t, T.qVa, T.qVa + 0.22));
    preg.visible = enAB && t >= T.cae && va < 0.98;
    preg.position.set(CB.x, 0.66 + ALTO_Q / 2 + Math.max(0, y) + va * 0.6, CB.z);
    preg.rotation.set(-0.35, (1 - cae) * 0.6, 0); preg.scale.setScalar(Math.max(0.01, (1 - va) * lerp(0.4, 1, bk(cae))));
  }
  // "8 min" y la barra (HUD, arriba a la derecha de Rubén)
  {
    const k8 = popIn(t, T.n8, 0.3) * (1 - sg(t, T.s04 - 0.45, T.s04 - 0.25));
    n8.visible = enAB && k8 > 0.02;
    if (n8.visible) hud(n8, 760, 610, k8 * 110);
    const kb = popIn(t, T.n8 + 0.1, 0.3) * (1 - sg(t, T.s04 - 0.45, T.s04 - 0.25));
    barra.visible = enAB && kb > 0.02;
    if (barra.visible) { hud(barra, 760, 735, kb * 80); barra.rotation.x = 0.25; }
    bloques.forEach((bq, i) => {
      const on = i === 0 ? sg(t, T.b1, T.b1 + 0.15) : sg(t, T.b7 + (i - 1) * 0.03, T.b7 + (i - 1) * 0.03 + 0.12);
      bloqueM[i].color.setHex(C.cr2).lerp(new THREE.Color(i === 0 ? C.g : C.red), on);
      bq.scale.y = 1 + 0.35 * pulso(t, i === 0 ? T.b1 : T.b7 + (i - 1) * 0.03, 0.25);
    });
  }
  // el celular gigante y el camión (s09)
  {
    const enP = plano === "P";
    gigante.visible = enP;
    camion.visible = enP && t > T.camion && t < T.camion + 1.2;
    if (enP) {
      gigante.position.set(CB.x, 1.0, CB.z + 3.4); gigante.rotation.set(0, 0, 0); gigante.scale.setScalar(1);
      const { H } = gigante.userData;
      // los avisos caen debajo de "¿Y mi pedido?" (fracciones del alto, desde arriba)
      const FY = [0.45, 0.565, 0.68, 0.795];
      burbujas.forEach((bb, i) => {
        const k = t < T.avisos[i] ? 0 : i === 0 && t < T.s09 + 0.05 ? 1 : popIn(t, T.avisos[i], 0.3);
        ocultar(bb, k);
        bb.position.set(i === 3 ? 0.03 : -0.03, H / 2 - FY[i] * H + (1 - Math.min(1, k)) * 0.05, 0.03 + 0.03 * pulso(t, T.avisos[i], 0.3));
      });
      // el camión navy cruza por debajo de los globos (fila libre entre "Entregado" y la barra de abajo)
      const u = sg(t, T.camion, T.camion + 1.2);
      const yb = gigante.position.y + H / 2 - 0.885 * H;
      camion.position.set(CB.x + lerp(-0.75, 0.75, u), yb - 0.1 + Math.abs(Math.sin(u * 40)) * 0.004, gigante.position.z + 0.1); camion.rotation.set(0, 0, 0); camion.scale.setScalar(0.14);
      ruedas.forEach((r2) => (r2.rotation.z = -u * 30));
    }
  }
}
function zonaM(t) {
  const en = plano === "M";
  libro.visible = pisoM.visible = en;
  arena.visible = banco.visible = relojQ.visible = false;
  n1985.visible = false;
  if (!en) return;
  // la maqueta: el bloque de las puertas se aleja, el pasillo se estira, las valijas saltan a la cinta lejana
  const pl = 1 - eio(sg(t, T.pliega, T.pliega + 0.4)); // se pliega (pop-up)
  maq.visible = pl > 0.01; maq.scale.set(1, Math.max(0.01, pl), 1);
  const d = eio(sg(t, T.desliza, T.desliza + 0.7));
  const zG = lerp(0.42, -1.55, d); // borde de las puertas (el pasillo va de la terminal a las puertas)
  puertasM.position.set(0, 0.25, zG - 0.18);
  const largo = (TERM.z - 0.7) - zG;
  pasilloM.position.set(0, 0.25, TERM.z - 0.7); pasilloM.scale.set(1, 1, Math.max(0.01, largo));
  // valijitas: arrancan en la cinta 1 y saltan a la 2
  valijitas.forEach((v, i) => {
    const ts = T.saltan + i * 0.12, u = sg(t, ts, ts + 0.4);
    const a0 = (i / 3) * Math.PI * 2 + t * 0.6;
    const p1 = V(CC1.x + Math.cos(a0) * 0.12, CC1.y + 0.046, CC1.z + Math.sin(a0) * 0.18);
    const p2 = V(CC2.x + Math.sin(a0) * 0.18, CC2.y + 0.046, CC2.z + Math.cos(a0) * 0.12);
    const p = p1.clone().lerp(p2, eio(u)); p.y += Math.sin(Math.PI * u) * 0.3;
    v.position.copy(p); v.rotation.set(0, a0, 0);
  });
  // la flecha verde recorre el camino nuevo (de las puertas a la cinta lejana)
  const kf = sg(t, T.puertas, T.llegada + 0.3) * (1 - sg(t, T.pliega - 0.05, T.pliega + 0.15));
  flecha.visible = puntaF.visible = kf > 0.02;
  if (flecha.visible) {
    const pts = [V(0, 0.36, zG - 0.05), V(0, 0.36, TERM.z - 0.75), V(0.25, 0.36, TERM.z - 0.3), V(CC2.x - 0.25, 0.36, CC2.z - 0.02)];
    const cur = new THREE.CatmullRomCurve3(pts);
    flecha.geometry.dispose();
    const N = Math.max(2, Math.round(80 * kf));
    const sub = []; for (let i = 0; i <= N; i++) sub.push(cur.getPointAt((i / N) * kf * 0.97));
    flecha.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sub), N * 2, 0.035, 10, false);
    const pa = cur.getPointAt(kf * 0.97), tg = cur.getTangentAt(kf * 0.97);
    puntaF.position.copy(pa); puntaF.quaternion.setFromUnitVectors(_up, tg);
  }
  // las páginas pasan (giran sobre el lomo de +z a -z)
  hojas.forEach((p, i) => {
    const u = eio(sg(t, T.paginas[i], T.paginas[i] + 0.42));
    p.rotation.x = -u * Math.PI * 0.985; p.visible = t > T.pliega + 0.2;
  });
  pagDer.material.map = t > T.paginas[2] + 0.2 ? paginaFila : t > T.pliega + 0.3 ? renglones : paginaTex;
  pagIzq.material.map = t > T.pliega + 0.3 ? renglones : paginaTex;
  libro.visible = t < T.gira + 0.45; libro.position.y = OM.y - 2.6 * eio(sg(t, T.gira + 0.05, T.gira + 0.45)); // ronda 2: la página baja y sale (sin pop)
  pagIzq.visible = true;
  // "1985"
  const k85 = popIn(t, T.n1985, 0.3), f85 = 1 - sg(t, T.s06 - 0.4, T.s06 - 0.15); // ronda 3: se va con fundido (sin achicarse)
  n1985.visible = k85 > 0.02 && f85 > 0.01; if (n1985.visible) { hud(n1985, 540, 545, k85 * 160); n1985.traverse((o2) => { if (o2.material) for (const m of [].concat(o2.material)) m.opacity = f85; }); }
  // el reloj de arena y el banquito
  const ka = lerp(0.3, 1, bk(sg(t, T.arena, T.arena + 0.4)));
  const sale = eio(sg(t, T.gira, T.gira + 0.22));
  arena.visible = t > T.arena && sale < 0.8;
  arena.position.set(OM.x - 0.35, 0.25, OM.z - 0.1);
  const est = 1 + 0.2 * eio(sg(t, T.estiraA, T.estiraA + 0.4));
  arena.scale.set(0.9 * ka * (1 - sale), 0.9 * ka * est * (1 - sale), 0.9 * ka * (1 - sale));
  arena.rotation.set(0, 0, sale * Math.PI);
  { const h = HA * 0.5 * ka * est * (1 - sale); arena.position.x += Math.sin(sale * Math.PI) * h; arena.position.y += h * (1 - Math.cos(sale * Math.PI)); }
  // arena que cae (lentísimo): la de arriba baja, la de abajo sube
  const ua = sg(t, T.arena, T.gira);
  arenaSup.scale.set(1 - 0.25 * ua, 1 - 0.3 * ua, 1 - 0.25 * ua); arenaInf.scale.set(0.6 + 0.4 * ua, 0.6 + 0.4 * ua, 0.6 + 0.4 * ua);
  hilo.visible = arena.visible;
  banco.visible = t > T.arena + 0.1 && t < T.gira + 0.3;
  banco.position.set(OM.x + 0.72, 0.25, OM.z + 0.75); banco.rotation.set(0, -0.45, 0);
  { const kb2 = popIn(t, T.arena + 0.12, 0.3) * (1 - eio(sg(t, T.gira, T.gira + 0.25))); banco.visible = banco.visible && kb2 > 0.3; banco.scale.setScalar(Math.max(0.001, kb2 * 0.62)); }
  // el reloj de "?"
  const kq = t < T.gira + 0.155 ? 0 : lerp(0.35, 1, bk(sg(t, T.gira + 0.155, T.gira + 0.45))); // ronda 2: nace en el cuadro en que el reloj de arena se va (sin superposición ni cuadro vacío) // ronda 2: nace cuando el reloj de arena ya se fue // nace mientras el reloj de arena se va (sin cuadro vacío)
  relojQ.visible = kq > 0.12;
  relojQ.position.set(OM.x, 0.25 + Math.abs(rebote(t, T.todavia, 6, 40, 0.03)), OM.z - 0.1);
  relojQ.scale.setScalar(kq * 0.8);
  relojQ.rotation.set(0, 0, rebote(t, T.todavia, 5, 46, 0.05));
  const vueltas = 0.6 * (t - T.gira) + 2.0 * Math.pow(sg(t, T.cuanto - 0.2, T.s07), 2) * 2.2;
  agQ.m.rotation.z = -vueltas * Math.PI * 2; agQ.h.rotation.z = -vueltas * Math.PI * 2 / 6 - 0.8;
}
function zonaO(t) {
  const en = plano === "O" || plano === "O2";
  oficina.visible = deposito.visible = telefono.visible = tuboT.visible = cableT.visible = pisoO.visible = en;
  for (const c of Object.values(contadores)) c.visible = false;
  if (!en) return;
  // el monitor: tarjetas que se apilan (s07); en s10, lista vacía
  if (plano === "O") {
    const n = t < T.llamadas[1] ? 1 : t < T.llamadas[2] ? 2 : 3;
    dibujarMonitor(n, sg(t, T.llamadas[n - 1], T.llamadas[n - 1] + 0.25));
    const num = n === 1 ? 12 : n === 2 ? 13 : 14;
    const kc = popIn(t, T.s07 + 0.05, 0.3) * (1 - sg(t, T.push - 0.05, T.push + 0.1));
    const c = contadores[num]; c.visible = kc > 0.02;
    if (c.visible) { hud(c, 900, 590, kc * 120 * (1 + 0.25 * pulso(t, T.llamadas[n - 1], 0.25))); c.rotation.y = -0.2; }
  } else {
    dibujarMonitor(0, 1);
    const kc = popIn(t, T.s10 + 0.15, 0.3) * (1 - sg(t, T.fin - 0.15, T.fin));
    const c = contadores[0]; c.visible = kc > 0.02;
    if (c.visible) { hud(c, 900, 590, kc * 120); c.rotation.y = -0.2; }
  }
}
function dibujarMonitorVacio() {}
function zonaF(t) {
  const en = plano === "F";
  mateF.visible = vaporF.visible = pisoF.visible = en;
  if (!en) return;
  const k = lerp(0.5, 1, bk(sg(t, T.fin - 0.02, T.fin + 0.35)));
  mateF.position.set(OF.x, 0, 0); mateF.rotation.set(0, 0.6 + Math.sin((t - T.fin) * 1.2) * 0.12, 0); mateF.scale.setScalar(5.2 * k);
  vaporF.position.set(OF.x - 0.05, 5.2 * 0.15 * k, 0); vaporF.userData.poner(t);
}

// ================= ESCENA EN EL TIEMPO =================
const fogA = new THREE.Fog(0xefeee5, 24, 46);
let _armado = false;
function renderAt(t) {
  if (!_armado) { _armado = true; PLANOS = armarPlanos(); }
  scene.environmentRotation.y = t * 0.05;
  plano = PLANOS[planoEn(t)][0];
  zonaGraciela(t);
  ponerCamara(t);
  let foco = V(_mira.x, 0.5, _mira.z), rad = 3.2;
  if (plano === "S01") { foco = V(0, 0.5, zRuben(t) - 1); rad = 4.5; }
  else if (plano === "AB" && t < T.s03) { foco = V(0, 0.5, -16); rad = 22; }
  else if (plano[0] === "O") { foco = V(OO.x, 1.0, 0.0); rad = 2.6; }
  else if (plano === "M") { foco = V(OM.x, 0.5, OM.z); rad = 3.2; }
  else if (plano === "F") { foco = OF.clone().add(V(0, 0.6, 0)); rad = 1.6; }
  else { foco = V(CB.x, 0.5, CB.z + 0.6); rad = 4.5; }
  sol.position.copy(foco).add(V(-2.2, 7, 5)); sol.target.position.copy(foco);
  Object.assign(sol.shadow.camera, { left: -rad, right: rad, top: rad, bottom: -rad, near: 0.5, far: 80 }); sol.shadow.camera.updateProjectionMatrix();
  scene.fog = plano === "S01" || (plano === "AB" && t < T.s03) ? fogA : null;
  zonaA(t);
  zonaB(t);
  zonaM(t);
  zonaO(t);
  zonaRuben(t);
  zonaF(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e2) => renderAt(e2.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
