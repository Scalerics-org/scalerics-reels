// Capa 3D de por-que-te-llaman (Three.js r170 local). Base técnica: reels/por-que-el-99 (luces, entorno PMREM, cámara
// Catmull-Rom con límite monótono, TextGeometry de Lexend 800, la oficina vidriada de Rubén arriba del depósito);
// personajes de reels/ya-lo-cargo/assets/personajes.js (ELENCO.ruben, el de la distribuidora, con `sentado`).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Fondo NAVY CLARO liso (#16243d, lo pone el HTML): el canvas es transparente; el piso de la zona R es un RELOJ GIGANTE
// (esfera del mismo navy con aro y bastones crema, MeshBasic sin tone mapping, así empalma con el fondo) + sombras.
// Zonas (x):
//   O (-60): la oficina vidriada de Rubén (s01, s09-s10). Depósito abajo (y -3,4): racks, pallets, cajas, una zorra.
//   R (0..18): el reloj-piso: el mate gigante (x 0, s02 y s12), el "?" (x 3), el avión y las empresas (x 6,5, s04),
//              los cuatro buzones (x 10,5, s05), el reloj de pie (x 13,8, s06-s07), la silla del que decide (x 17, s08),
//              la ficha del CRM (x -2,6, s11) y el termo (s12).
//   F (200): el cierre verde (un mate chico humeando).
// Oldroyd, McElheran, Elkington y la revista NO se dibujan (solo el crédito en texto). Sin marcas: celular, formulario,
// bandeja, ficha y chat genéricos.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800h.js"; // 0-9 . , ? h % (partes/fuente3d.py)
import { crearPersonaje, ELENCO, poseEn, CARA, crearMate, crearTermo, crearTelarana } from "./personajes.js";
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
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x5f6878);
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

const OO = V(-60, 0, 0), OF = V(200, 0, 0);
const key = new THREE.DirectionalLight(0xfff0dc, 1.4); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.2); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x4a5674, 1.3); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.5);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.normalBias = 0.02; sol.shadow.radius = 5;
scene.add(sol, sol.target);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, madera: 0xdcbb92, cromo: 0xb8bcc4, kraft: 0xc9a46b, cuero: 0x1b2a45 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.14 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.45), red: mat(C.red, 0.6),
  white: mat(C.white, 0.42), gris: mat(C.gris, 0.55), madera: mat(C.madera, 0.55), cromo: mat(C.cromo, 0.25, { metalness: 0.7 }),
  kraft: mat(C.kraft, 0.85), goma: mat(0x1a1f2a, 0.7), cuero: mat(C.cuero, 0.38),
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
const geoCache = {};
const textoGeo = (s, size, depth) => (geoCache[s + "|" + size + "|" + depth] ??= (() => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 16, bevelEnabled: true, bevelThickness: depth * 0.22, bevelSize: size * 0.022, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
})());
// ronda 1: números 3D sin costuras. Los glifos de Lexend variable vienen con contornos superpuestos (el palo del 4,
// el pie del 1, el 2): en una sola TextGeometry las caras coplanares se pisaban y quedaban líneas finas. Cada contorno
// va en su propia extrusión, sin bisel, corrida 1,5 mm en z de la anterior, y el grupo se centra.
function textoGrupo(txt, size, depth, mats) {
  const g = new THREE.Group(), shapes = font.generateShapes(txt, size), caja = new THREE.Box3();
  const geos = shapes.map((sh2, i) => { const geo = new THREE.ExtrudeGeometry(sh2, { depth, bevelEnabled: false, curveSegments: 16 }); geo.translate(0, 0, i * 0.0015 * size / 0.44); geo.computeBoundingBox(); caja.union(geo.boundingBox); return geo; });
  const c = caja.getCenter(new THREE.Vector3());
  for (const geo of geos) { geo.translate(-c.x, -c.y, -c.z); const m = new THREE.Mesh(geo, mats); m.castShadow = true; g.add(m); }
  g.userData.alto = caja.max.y - caja.min.y;
  return g;
}
const NAV = "#16243d", NAV3 = "#1f3254", CRE = "#efeee5", VER = "#5ce611", NAV0 = "#0b1220", ROJ = "#c7655b";
function pisoSombra(x, z, w = 10, d = 10, op = 0.35, y = 0.002) {
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
function hacerTilde(r = 0.17) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, M.g); d.scale.set(r, r, r * 0.35); g.add(d);
  const bd = mesh(new THREE.TorusGeometry(1, 0.09, 8, 40), M.navy); bd.scale.set(r, r, r); g.add(bd);
  const tk = mesh(tickGeo, M.navy, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  sh(g); scene.add(g); return g;
}
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }

// ================= TIEMPOS CLAVE (los mismos en gen.mjs) =================
const S = E;
const T = {
  s02: S["s02-se-enfria"], enfria: W[13], rapido: W[14],
  s03: S["s03-que-tan"], rapido2: W[17],
  s04: S["s04-lo-midio"], estudio: W[19], midio: W[21], llamar: W[22], primera: W[25], hora: W[26],
  s05: S["s05-el-que-decide"], chances: W[29], llegar: W[31], decide: W[34],
  s06: S["s06-dos-mil"], escribio: W[38], dos: W[42], mil: W[43], empresas: W[44],
  s07: S["s07-nunca"], una: W[46], cuatro: W[49], nunca: W[50], contesto: W[51],
  s08: S["s08-dos-dias"], tardaron: W[54], promedio: W[56], casi: W[57], dias: W[59],
  s09: S["s09-ruben-compro"], compre: W[62], primero: W[66],
  s10: S["s10-ruben-ayer"], consulta10: W[69], ayer: W[71],
  s11: S["s11-crm"], anota: W[74], avisa: W[79], instante: W[81],
  s12: S["s12-escribe-solo"], enfria12: W[86], escribe: W[88], solo: W[89],
  s13: S["s13-llegar"], primero13: W[92], agenda: W[93],
  fin: S["s14-cierre"],
};
T.click = 0.42;                     // Rubén hace clic en "Enviar"
T.vibra = W[7] - 0.12;              // el celular vibra ("llaman")
T.llamada = T.vibra;                // pantalla "Llamada entrante"
T.morph = T.s02 + 0.08;             // el celular gigante se vuelve el mate
T.frio = T.enfria;                  // el vapor se corta, la yerba se pone gris
T.cae = T.s03 - 0.3;                // el "?" cae
T.reloj1 = T.s04 + 0.02;            // ronda 1: el "?" se vuelve el reloj de pie de la primera hora
T.doce = T.llamar - 0.1;            // las agujas a las 12
T.cuna = T.primera;                 // la primera hora se pinta de verde
T.cable = [T.s05 + 0.02, T.s05 + 1.0]; // el cable sale hasta la silla
T.tildes = [T.chances, T.chances + 0.18, T.chances + 0.32, T.chances + 0.44, T.chances + 0.54, T.chances + 0.62, T.chances + 0.7];
T.avion = T.s06 - 0.05;             // el avión despega de la silla
T.bandada = T.dos;                  // el avión se multiplica
T.cartas = [T.s07 + 0.25, T.s07 + 0.35, T.s07 + 0.45, T.s07 + 0.55]; // un sobre a cada buzón
T.banderas = [T.una + 0.05, T.una + 0.2, T.una + 0.35];              // tres contestan
T.rojo = T.nunca;                   // el cuarto se pone rojo
T.reloj2 = T.s08 + 0.02;            // el buzón rojo se achica y nace el reloj de las 42 h
T.gira = [T.tardaron - 0.1, T.casi - 0.15]; // las agujas dan casi dos días
T.n42 = T.casi;                     // "42 h"
T.corta = T.s09 + 0.35;             // Rubén corta la llamada
T.mira = T.s10 + 0.05;              // Rubén mira por encima del hombro la pantalla de atrás
T.fila1 = T.anota; T.fila2 = T.avisa; T.fila3 = T.instante + 0.12;
T.termo = T.s12 + 0.1; T.burbuja = T.escribe - 0.05; T.ceba = T.escribe + 0.05;
T.resp = T.s13 + 0.5;               // la respuesta de Graciela
T.fija = T.s11 + 0.3;               // la consulta queda anotada (de roja a navy)
T.insert = T.s10 + 0.42;            // ronda 2: inserto antes (en "consulta"), la cara no llega a girar mucho

// ================= ZONA O: la oficina vidriada de Rubén arriba del depósito =================
const oficina = new THREE.Group(); scene.add(oficina);
let panelAtras = null; // el vidrio de atrás: en O2 la cámara queda detrás de él (se oculta)
const PISO_DEP = -3.4;
const ESC = { y: 0.76, z: 0.62, w: 1.6, d: 0.74 }; // escritorio (Rubén sentado)
const MON = V(OO.x, 1.16, ESC.z + 0.2); // centro de la pantalla
const MONW = 0.92, MONH = 0.575;
// la pantalla del monitor: el formulario (s01) y la bandeja de consultas (s10)
const MP = { w: 1280, h: 800 };
const monTV = texViva(MP.w, MP.h);
function dibujarMonitor(modo, u) {
  const clave = modo + "|" + u.map((v) => v.toFixed(2)).join(",");
  if (monTV.clave === clave) return; monTV.clave = clave;
  const x = monTV.x, w = MP.w, h = MP.h;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "form") {
    // u = [clic (0..1), enviado (0..1)]
    x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
    x.fillStyle = NAV0; x.fillRect(0, 0, w, 150);
    x.fillStyle = CRE; x.font = F(800, 74); x.fillText("Pedir presupuesto", 50, 78);
    x.fillStyle = NAV0; ajustar(x, "Autoelevador eléctrico", 800, 76, w - 100); x.fillText("Autoelevador eléctrico", 50, 228);
    const campo = (y, rot, val) => {
      x.fillStyle = "rgba(22,36,61,0.6)"; x.font = F(600, 44); x.fillText(rot, 54, y);
      x.fillStyle = "#ffffff"; rr(x, 50, y + 30, w - 100, 96, 18); x.strokeStyle = NAV; x.lineWidth = 6; x.beginPath(); x.roundRect(50, y + 30, w - 100, 96, 18); x.stroke();
      x.fillStyle = NAV0; x.font = F(700, 56); x.fillText(val, 80, y + 80);
    };
    campo(318, "Empresa", "Distribuidora Rubén");
    campo(488, "Teléfono", "099 ··· ···");
    // botón Enviar → Enviado ✓
    const env = u[1] > 0.5;
    const bx = 330, by = 650, bw = 620, bh = 120, s = 1 - 0.06 * Math.sin(Math.PI * cl(u[0]));
    x.save(); x.translate(bx + bw / 2, by + bh / 2); x.scale(s, s); x.translate(-(bx + bw / 2), -(by + bh / 2));
    x.fillStyle = env ? NAV0 : VER; rr(x, bx, by, bw, bh, 60);
    x.fillStyle = env ? VER : NAV0; x.textAlign = "center"; x.font = F(800, 70); x.fillText(env ? "Enviado ✓" : "Enviar", bx + bw / 2, by + bh / 2 + 4);
    x.restore(); x.textAlign = "left";
    // flecha del mouse (sobre el botón)
    if (u[1] < 0.98) {
      const ax = 760, ay = 690;
      x.fillStyle = NAV0; x.strokeStyle = "#ffffff"; x.lineWidth = 7; x.beginPath();
      x.moveTo(ax, ay); x.lineTo(ax, ay + 90); x.lineTo(ax + 22, ay + 68); x.lineTo(ax + 42, ay + 108); x.lineTo(ax + 58, ay + 100); x.lineTo(ax + 38, ay + 62); x.lineTo(ax + 66, ay + 60); x.closePath(); x.stroke(); x.fill();
    }
  } else if (modo === "lisa") {
    x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h); x.fillStyle = NAV0; x.fillRect(0, 0, w, 150);
    for (const [y, c] of [[178, "#ffffff"], [392, ROJ], [606, "#ffffff"]]) { x.fillStyle = c; rr(x, 30, y, w - 60, 190, 26); }
  } else {
    // bandeja de consultas; u = [roja (0..1)]
    x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
    x.fillStyle = NAV0; x.fillRect(0, 0, w, 150);
    x.fillStyle = CRE; x.font = F(800, 76); x.fillText("Consultas", 50, 78);
    const fila = (y, a, b, mala) => {
      x.fillStyle = mala ? ROJ : "#ffffff"; rr(x, 30, y, w - 60, 190, 26);
      if (!mala) { x.strokeStyle = "rgba(22,36,61,0.35)"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, w - 60, 190, 26); x.stroke(); }
      x.fillStyle = mala ? CRE : NAV0; ajustar(x, a, 800, 64, w - 240); x.fillText(a, 66, y + 62);
      x.fillStyle = mala ? CRE : "rgba(22,36,61,0.75)"; ajustar(x, b, 600, 50, w - 140); x.fillText(b, 66, y + 140);
      if (!mala) { x.strokeStyle = VER; x.lineWidth = 16; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(w - 170, y + 62); x.lineTo(w - 140, y + 92); x.lineTo(w - 86, y + 36); x.stroke(); }
    };
    fila(178, "Autoservicio Sur · pedido", "hoy 9:12 · respondido", false);
    fila(392, "Graciela · Rotisería", "Presupuesto · ayer 18:40 · sin responder", u[0] > 0.5);
    fila(606, "Ferretería Lili · lista", "hoy 8:40 · respondido", false);
  }
  monTV.t.needsUpdate = true;
}
// el celular (s01 en el atril; en la zona R, gigante; s09 en la mano)
const PPC = [512, 1036];
const celTV = texViva(...PPC);
function dibujarCelu(modo) {
  if (celTV.clave === modo) return; celTV.clave = modo;
  const x = celTV.x, [w, h] = PPC;
  if (modo === "off") { x.fillStyle = "#0a0f1a"; x.fillRect(0, 0, w, h); celTV.t.needsUpdate = true; return; }
  x.fillStyle = NAV0; x.fillRect(0, 0, w, h);
  x.textAlign = "center"; x.textBaseline = "middle";
  if (modo === "llama") {
    x.fillStyle = VER; x.font = F(800, 50); x.fillText("Llamada", w / 2, 150); x.fillText("entrante", w / 2, 210);
    // avatar genérico
    x.fillStyle = NAV3; x.beginPath(); x.arc(w / 2, 400, 110, 0, 7); x.fill();
    x.fillStyle = CRE; x.beginPath(); x.arc(w / 2, 375, 42, 0, 7); x.fill(); x.beginPath(); x.ellipse(w / 2, 470, 70, 46, 0, Math.PI, 0); x.fill();
    x.fillStyle = CRE; ajustar(x, "Ventas", 800, 66, w - 60); x.fillText("Ventas", w / 2, 580);
    x.fillStyle = "rgba(239,238,229,0.8)"; ajustar(x, "Autoelevadores", 700, 52, w - 50); x.fillText("Autoelevadores", w / 2, 650);
    // botones: rechazar (rojo apagado) y atender (verde)
    x.fillStyle = ROJ; x.beginPath(); x.arc(140, 870, 78, 0, 7); x.fill();
    x.fillStyle = VER; x.beginPath(); x.arc(w - 140, 870, 78, 0, 7); x.fill();
    x.strokeStyle = NAV0; x.lineWidth = 16; x.lineCap = "round";
    for (const [cx, rot] of [[140, Math.PI * 0.75], [w - 140, 0]]) { x.save(); x.translate(cx, 870); x.rotate(rot); x.beginPath(); x.arc(0, 18, 34, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); x.restore(); }
  } else {
    // "fin": la llamada terminó (s09)
    x.fillStyle = CRE; x.font = F(800, 58); x.fillText("Llamada", w / 2, 300); x.fillText("finalizada", w / 2, 372);
    x.fillStyle = VER; x.font = F(800, 92); x.fillText("12:40", w / 2, 520);
    x.fillStyle = ROJ; x.beginPath(); x.arc(w / 2, 840, 80, 0, 7); x.fill();
  }
  celTV.t.needsUpdate = true;
}
function hacerCelular() {
  const g = new THREE.Group();
  const CW = 0.08, CH = 0.162;
  g.add(mesh(rbox(CW + 0.008, CH + 0.008, 0.012, 0.012), M.navy3));
  g.add(mesh(rbox(0.026, 0.026, 0.004, 0.006), M.navy, -CW * 0.27, CH * 0.36, -0.0072));
  const pant = mesh(new THREE.PlaneGeometry(CW, CH), new THREE.MeshBasicMaterial({ map: celTV.t, toneMapped: false }), 0, 0, 0.0066); g.add(pant);
  sh(g); pant.castShadow = false;
  return g;
}
// la silla de director (respaldo alto de cuero navy con vivo crema, apoyabrazos, pie estrella con ruedas)
function hacerSilla() {
  const g = new THREE.Group(); // origen en el piso, mira a +z (el que se sienta mira a +z)
  const giro = new THREE.Group(); g.add(giro); g.userData.giro = giro;
  // pie estrella fijo
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.3;
    const p = mesh(rbox(0.34, 0.05, 0.06, 0.02), M.navy, Math.cos(a) * 0.17, 0.09, Math.sin(a) * 0.17); p.rotation.y = -a; g.add(p);
    g.add(mesh(new THREE.SphereGeometry(0.035, 12, 8), M.goma, Math.cos(a) * 0.32, 0.035, Math.sin(a) * 0.32));
  }
  g.add(mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.32, 16), M.cromo, 0, 0.27, 0));
  // asiento y respaldo (giran)
  giro.add(mesh(rbox(0.56, 0.11, 0.52, 0.05), M.cuero, 0, 0.42, 0.02));
  giro.add(mesh(rbox(0.5, 0.025, 0.46, 0.012), M.cr, 0, 0.36, 0.02));
  const resp = mesh(rbox(0.56, 0.86, 0.12, 0.06), M.cuero, 0, 0.92, -0.25); resp.rotation.x = -0.1; giro.add(resp);
  const viv = mesh(rbox(0.6, 0.9, 0.08, 0.05), M.cr, 0, 0.92, -0.28); viv.rotation.x = -0.1; giro.add(viv);
  for (const s of [-1, 1]) for (const k of [0, 1, 2]) { const b = mesh(new THREE.SphereGeometry(0.02, 10, 8), M.cr, s * 0.14 * (k - 1 === 0 ? 0 : 1) + (k === 1 ? s * 0.0 : 0), 0.78 + k * 0.17, -0.18); if (k !== 1 || s > 0) giro.add(b); }
  for (const s of [-1, 1]) {
    giro.add(mesh(rbox(0.06, 0.04, 0.36, 0.015), M.navy, s * 0.31, 0.62, 0.02));
    giro.add(mesh(rbox(0.04, 0.2, 0.04, 0.012), M.navy, s * 0.31, 0.52, -0.08));
  }
  return sh(g);
}
const SILLA_SEAT = 0.475;
{
  const O = OO;
  const tablas = tex(1024, 1024, (x, w, h) => { x.fillStyle = "#cdb08a"; x.fillRect(0, 0, w, h); for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#d5b994" : "#c7a982"; x.fillRect(0, (i * h) / 8 + 3, w, h / 8 - 6); x.fillStyle = "rgba(90,60,30,0.45)"; x.fillRect(0, (i * h) / 8, w, 4); } });
  tablas.wrapS = tablas.wrapT = THREE.RepeatWrapping; tablas.repeat.set(3, 3);
  const piso = mesh(new THREE.PlaneGeometry(4.4, 4.0), new THREE.MeshStandardMaterial({ map: tablas, roughness: 0.75 }), O.x, 0, 0); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; oficina.add(piso);
  oficina.add(mesh(new THREE.BoxGeometry(4.6, 0.3, 4.2), M.navy2, O.x, -0.16, 0));
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xdfeaf2, roughness: 0.08, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide });
  const marco = M.navy;
  const panel = (cx, cz, ancho, ry) => {
    const g = new THREE.Group(); g.position.set(cx, 0, cz); g.rotation.y = ry; oficina.add(g);
    g.add(mesh(new THREE.PlaneGeometry(ancho, 2.6), vidrio, 0, 1.3, 0));
    g.add(mesh(rbox(ancho, 0.1, 0.1, 0.02), marco, 0, 0.05, 0));
    g.add(mesh(rbox(ancho, 0.1, 0.1, 0.02), marco, 0, 2.6, 0));
    g.add(mesh(rbox(ancho, 0.07, 0.07, 0.02), marco, 0, 1.0, 0));
    const n = Math.round(ancho / 1.1);
    for (let i = 0; i <= n; i++) g.add(mesh(rbox(0.1, 2.6, 0.1, 0.02), marco, -ancho / 2 + (i * ancho) / n, 1.3, 0));
    return g;
  };
  panel(O.x, 1.75, 4.4, 0); panelAtras = panel(O.x, -1.75, 4.4, 0); panel(O.x + 2.2, 0, 3.5, Math.PI / 2);
  oficina.add(mesh(new THREE.BoxGeometry(0.1, 2.7, 3.5), M.navy3, O.x - 2.25, 1.35, 0));
  oficina.add(mesh(rbox(0.32, 0.04, 1.6, 0.01), M.madera, O.x - 2.04, 1.45, -0.5));
  const colB = [C.g, C.cr, C.navy, C.cr2, C.g, C.edge, C.cr];
  colB.forEach((c, i) => { const b = mesh(rbox(0.28, 0.34, 0.08, 0.01), mat(c, 0.6), O.x - 2.05, 1.64, -1.15 + i * 0.105); b.rotation.x = (i === 5 ? 0.18 : 0); oficina.add(b); const et = mesh(new THREE.PlaneGeometry(0.05, 0.16), M.white, O.x - 1.905, 1.66, -1.15 + i * 0.105); et.rotation.y = Math.PI / 2; oficina.add(et); });
  // escritorio de madera clara con patas navy
  const vetas = tex(1024, 256, (x, w, h) => {
    x.fillStyle = "#dcbb92"; x.fillRect(0, 0, w, h); const az = azarDe(3);
    for (let i = 0; i < 40; i++) { const y = az() * h; x.strokeStyle = az() < 0.5 ? "rgba(150,105,60,0.3)" : "rgba(255,240,215,0.35)"; x.lineWidth = 2 + az() * 5; x.beginPath(); x.moveTo(0, y); for (let k = 1; k <= 8; k++) x.lineTo((k * w) / 8, y + Math.sin(k * 1.3 + i) * 7); x.stroke(); }
  });
  const tapaM = new THREE.MeshStandardMaterial({ map: vetas, roughness: 0.5 });
  oficina.add(mesh(rbox(ESC.w, 0.05, ESC.d, 0.015), [M.madera, M.madera, tapaM, M.madera, M.madera, M.madera], O.x, ESC.y - 0.025, ESC.z));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) oficina.add(mesh(rbox(0.05, ESC.y - 0.05, 0.05, 0.01), M.navy, O.x + sx * (ESC.w / 2 - 0.06), (ESC.y - 0.05) / 2, ESC.z + sz * (ESC.d / 2 - 0.06)));
  oficina.add(mesh(rbox(ESC.w - 0.15, 0.36, 0.03, 0.01), M.navy2, O.x, ESC.y - 0.26, ESC.z + ESC.d / 2 - 0.08));
  // monitor (la pantalla mira a -z: hacia Rubén)
  oficina.add(mesh(rbox(MONW + 0.06, MONH + 0.06, 0.05, 0.02), M.navy, MON.x, MON.y, MON.z + 0.03));
  const pant = mesh(new THREE.PlaneGeometry(MONW, MONH), new THREE.MeshBasicMaterial({ map: monTV.t, toneMapped: false }), MON.x, MON.y, MON.z);
  pant.rotation.y = Math.PI; oficina.add(pant);
  oficina.add(mesh(rbox(0.08, MON.y - MONH / 2 - ESC.y + 0.02, 0.05, 0.01), M.navy, MON.x, (MON.y - MONH / 2 + ESC.y) / 2, MON.z + 0.1));
  oficina.add(mesh(rbox(0.3, 0.02, 0.2, 0.01), M.navy, MON.x, ESC.y + 0.01, MON.z + 0.08));
  const tecl = tex(512, 160, (x, w, h) => { x.fillStyle = NAV; x.fillRect(0, 0, w, h); x.fillStyle = "#c9c7bb"; for (let j = 0; j < 4; j++) for (let i = 0; i < 14; i++) rr(x, 10 + i * 35.5, 10 + j * 37, 30, 31, 5); });
  const matTex = (t, k = 0.2) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.75, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: k });
  oficina.add(mesh(rbox(0.52, 0.025, 0.17, 0.008), [M.navy2, M.navy2, matTex(tecl, 0.1), M.navy2, M.navy2, M.navy2], MON.x + 0.34, ESC.y + 0.013, ESC.z - 0.18));
  oficina.add(mesh(rbox(0.06, 0.025, 0.1, 0.02), M.navy2, MON.x + 0.02, ESC.y + 0.013, ESC.z - 0.2));
  // carpeta verde
  const carp = mesh(rbox(0.3, 0.03, 0.38, 0.005), M.g, MON.x + 0.66, ESC.y + 0.015, ESC.z + 0.16); carp.rotation.y = 0.15; oficina.add(carp);
  const hoja = mesh(new THREE.PlaneGeometry(0.26, 0.34), M.white, MON.x + 0.66, ESC.y + 0.032, ESC.z + 0.16); hoja.rotation.set(-Math.PI / 2, 0, 0.15); oficina.add(hoja);
  // atril del celular (a la derecha del monitor, del lado de Rubén: -x)
  const atr = new THREE.Group(); atr.position.set(MON.x - 0.6, ESC.y, ESC.z - 0.12); oficina.add(atr);
  atr.add(mesh(rbox(0.12, 0.012, 0.1, 0.004), M.navy, 0, 0.006, 0));
  const resp = mesh(rbox(0.1, 0.12, 0.012, 0.004), M.navy, 0, 0.06, 0.03); resp.rotation.x = 0.28; atr.add(resp);
  atr.add(mesh(rbox(0.11, 0.012, 0.03, 0.004), M.navy, 0, 0.018, -0.03));
  sh(oficina);
  pant.castShadow = false;
}
// el reloj de pared de la oficina (en la pared navy3, a la derecha de Rubén)
// el mate y el termo en el escritorio (a la izquierda de Rubén: +x)
const mateR = crearMate(); scene.add(mateR); mateR.scale.setScalar(1.1);
const MATE_ESC = V(OO.x - 0.4, ESC.y, ESC.z - 0.3); // ronda 1: entre el mouse y el atril (se ve en s01)
const termo = crearTermo(); scene.add(termo); termo.scale.setScalar(1.15); termo.position.set(OO.x + 0.74, ESC.y, ESC.z - 0.12);
sh(termo);
// el depósito, abajo
const deposito = new THREE.Group(); scene.add(deposito);
{
  const O = OO, Y = PISO_DEP;
  const pisoD = mesh(new THREE.PlaneGeometry(40, 30), mat(0x8f939c, 0.9), O.x, Y, 0); pisoD.rotation.x = -Math.PI / 2; deposito.add(pisoD);
  for (const z of [-4.2, 4.2]) { const l = mesh(new THREE.PlaneGeometry(40, 0.12), M.cr, O.x, Y + 0.01, z); l.rotation.x = -Math.PI / 2; deposito.add(l); }
  const rackM = mat(C.edge, 0.5), larM = mat(C.cr, 0.55), palM = mat(0xd9be8f, 0.8);
  const film = new THREE.MeshStandardMaterial({ color: 0xe9eef2, roughness: 0.3, transparent: true, opacity: 0.55 });
  const az = azarDe(17);
  const rack = (cx, cz, ry, largo = 6) => {
    const g = new THREE.Group(); g.position.set(cx, Y, cz); g.rotation.y = ry; deposito.add(g);
    const n = Math.round(largo / 2);
    for (let i = 0; i <= n; i++) for (const zz of [-0.5, 0.5]) g.add(mesh(new THREE.BoxGeometry(0.1, 5.0, 0.1), rackM, -largo / 2 + (i * largo) / n, 2.5, zz));
    for (const y of [0.15, 1.75, 3.35]) for (const zz of [-0.5, 0.5]) g.add(mesh(new THREE.BoxGeometry(largo, 0.14, 0.08), larM, 0, y + 0.07, zz));
    for (const y of [0.22, 1.82, 3.42]) for (let i = 0; i < n * 2; i++) {
      const px = -largo / 2 + 0.5 + i * (largo - 1) / (n * 2 - 1);
      g.add(mesh(new THREE.BoxGeometry(0.9, 0.12, 0.9), palM, px, y + 0.06, 0));
      const k = az();
      if (k < 0.6) { const nb = 2 + Math.floor(az() * 3); for (let j = 0; j < nb; j++) g.add(mesh(new THREE.BoxGeometry(0.4, 0.3, 0.38), M.kraft, px + (j % 2 ? 0.21 : -0.21), y + 0.27 + Math.floor(j / 2) * 0.31, (j % 3) * 0.02)); }
      else if (k < 0.85) g.add(mesh(new THREE.BoxGeometry(0.86, 0.9, 0.86), film, px, y + 0.57, 0));
    }
    return g;
  };
  rack(O.x, 5.2, 0, 10); rack(O.x, 8.6, 0, 10); rack(O.x - 1, -5.2, 0, 10); rack(O.x, -8.6, 0, 10); rack(O.x + 6.0, 0, Math.PI / 2, 8);
  for (const [px, pz] of [[-1.2, 3.2], [1.6, 3.0], [0.4, -3.1], [-2.0, -3.3], [3.4, 2.9]]) {
    deposito.add(mesh(new THREE.BoxGeometry(1.0, 0.13, 1.0), palM, O.x + px, Y + 0.065, pz));
    for (let j = 0; j < 4; j++) deposito.add(mesh(new THREE.BoxGeometry(0.46, 0.34, 0.46), M.kraft, O.x + px + (j % 2 ? 0.24 : -0.24), Y + 0.3, pz + (j < 2 ? 0.24 : -0.24)));
    deposito.add(mesh(new THREE.BoxGeometry(1.0, 0.36, 0.04), M.g, O.x + px, Y + 0.31, pz));
  }
  const zorra = new THREE.Group(); zorra.position.set(O.x + 2.4, Y, 3.3); zorra.rotation.y = -0.6; deposito.add(zorra);
  for (const s of [-0.18, 0.18]) zorra.add(mesh(new THREE.BoxGeometry(0.16, 0.08, 1.1), M.navy, s, 0.06, 0));
  zorra.add(mesh(new THREE.BoxGeometry(0.5, 0.35, 0.18), M.g, 0, 0.2, -0.6));
  zorra.add(tubo(V(0, 0.35, -0.62), V(0, 1.2, -0.95), 0.025, M.navy));
  for (const sx of [-2.1, 2.1]) for (const sz of [-1.6, 1.6]) deposito.add(mesh(new THREE.BoxGeometry(0.2, -Y, 0.2), M.navy2, O.x + sx, Y / 2 - 0.15, sz));
}
const celu = hacerCelular(); scene.add(celu);
const KCEL = 1.7; // ronda 1: el celular del atril más grande (se lee antes)
const CELU_ATRIL = V(OO.x - 0.62, ESC.y + 0.035 + 0.081 * KCEL, ESC.z - 0.1);
const RUB = V(OO.x + 0.36, 0, -0.12); // centro de la silla (ronda 1: corrido a su izquierda: la nuca ya no tapa el formulario)
const GIRA_CAB = 0.08, GIRA_TORSO = 0.3, OJO_X = 0.75; // ronda 3: menos giro y la cámara no lo rodea (la cara queda de 3/4, ojos dentro de la silueta) // ronda 2: hacia el monitor (derecha de pantalla); la cabeza casi no gira, gira el torso // ronda 1: cabeza ≤ 0,4 rad + torso (la cara no sale de la silueta) // s10: mira por encima del hombro izquierdo la pantalla de atrás
const sillaR = hacerSilla(); scene.add(sillaR); sillaR.position.copy(RUB);
const ruben = crearPersonaje({ ...ELENCO.ruben, parpadeoCada: 999 }); scene.add(ruben.raiz);
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
const pisoO = pisoSombra(OO.x, 0, 4.4, 4, 0.0);

// ================= ZONA R: el reloj-piso =================
const reloj = new THREE.Group(); scene.add(reloj);
const CC = V(8.75, 0, -4), RC = 11; // centro y radio de la esfera
{
  const N = 2048;
  const esf = tex(N, N, (x, w, h) => {
    x.fillStyle = NAV; x.fillRect(0, 0, w, h);
    const c = w / 2, k = w / (2 * RC + 2); // px por metro
    x.strokeStyle = "rgba(239,238,229,0.55)"; x.lineWidth = 0.13 * k; x.beginPath(); x.arc(c, c, RC * k, 0, 7); x.stroke();
    x.lineWidth = 0.06 * k; x.beginPath(); x.arc(c, c, (RC - 0.35) * k, 0, 7); x.stroke();
    // minutos: puntitos; horas: bastones crema (las 12, 3, 6 y 9 más largos)
    x.fillStyle = "rgba(239,238,229,0.55)";
    for (let i = 0; i < 60; i++) { if (i % 5 === 0) continue; const a = (i / 60) * Math.PI * 2; x.beginPath(); x.arc(c + Math.sin(a) * (RC - 0.8) * k, c - Math.cos(a) * (RC - 0.8) * k, 0.08 * k, 0, 7); x.fill(); }
    x.fillStyle = CRE;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2, L = i % 3 ? 1.1 : 1.7, A = i % 3 ? 0.26 : 0.38;
      x.save(); x.translate(c + Math.sin(a) * (RC - 0.75 - L / 2) * k, c - Math.cos(a) * (RC - 0.75 - L / 2) * k); x.rotate(a); rr(x, (-A / 2) * k, (-L / 2) * k, A * k, L * k, (A / 2) * k); x.restore();
    }
  });
  esf.anisotropy = 16;
  const S2 = 2 * RC + 2;
  const piso = mesh(new THREE.PlaneGeometry(S2, S2), new THREE.MeshBasicMaterial({ map: esf, toneMapped: false }), CC.x, 0, CC.z);
  piso.rotation.x = -Math.PI / 2; reloj.add(piso);
}
// agujas del reloj-piso: navy oscuro con borde crema, planas (las 12 apuntan a -z)
function aguja(L, A) {
  const g = new THREE.Group();
  const forma = (l, a, k) => { const s = new THREE.Shape(); s.moveTo(-a / 2, -0.6 * k); s.lineTo(a / 2, -0.6 * k); s.lineTo(a * 0.22, l); s.lineTo(-a * 0.22, l); s.closePath(); return new THREE.ShapeGeometry(s); };
  const borde = new THREE.Mesh(forma(L + 0.12, A + 0.2, 1.15), new THREE.MeshBasicMaterial({ color: C.cr, toneMapped: false })); borde.position.y = 0.004;
  const cuerpo = new THREE.Mesh(forma(L, A, 1), new THREE.MeshBasicMaterial({ color: C.navy, toneMapped: false })); cuerpo.position.y = 0.007;
  for (const m of [borde, cuerpo]) { m.rotation.x = -Math.PI / 2; g.add(m); }
  g.position.copy(CC); reloj.add(g); return g;
}
const agujaH = aguja(5.2, 0.62), agujaM = aguja(7.8, 0.42);
const hubG = new THREE.Group(); reloj.add(hubG);
{
  const hub = mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.02, 40), new THREE.MeshBasicMaterial({ color: C.cr, toneMapped: false }), CC.x, 0.01, CC.z); hubG.add(hub);
  const hub2 = mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.024, 40), new THREE.MeshBasicMaterial({ color: C.g, toneMapped: false }), CC.x, 0.012, CC.z); hubG.add(hub2);
}
const pisoR = pisoSombra(CC.x, CC.z, 2 * RC + 2, 2 * RC + 2, 0.34, 0.014);

// ronda 1: los mates grandes con más segmentos (el de personajes.js tiene 24 y de cerca se ve facetado)
function suavizarMate(g) {
  const perfil = [[0, 0], [0.045, 0.004], [0.075, 0.03], [0.085, 0.07], [0.078, 0.11], [0.062, 0.135], [0.058, 0.14]].map(([r, y]) => new THREE.Vector2(r, y));
  g.children[0].geometry = new THREE.LatheGeometry(perfil, 96);
  g.traverse((o) => { if (o.isMesh && o.geometry.type === "TorusGeometry") o.geometry = new THREE.TorusGeometry(0.06, 0.008, 12, 96); if (o.isMesh && o.geometry.type === "CylinderGeometry" && o.geometry.parameters.radiusTop === 0.056) o.geometry = new THREE.CylinderGeometry(0.056, 0.056, 0.01, 64); });
}
// ---------- R1: el mate gigante (con la placa colgante) y su vapor verde ----------
const PM = V(0, 0, 0);
const KM = 6.2; // escala del mate gigante
const mateG = crearMate(); scene.add(mateG); mateG.scale.setScalar(KM); suavizarMate(mateG);
const yerbaG = mateG.children.find((o) => o.isMesh && o.geometry.type === "CylinderGeometry" && o.material.color.getHex() === 0x6f8a2c);
if (yerbaG) yerbaG.material = yerbaG.material.clone();
const calabazaG = mateG.children[0]; calabazaG.material = calabazaG.material.clone();
sh(mateG);
const YERBA_V = new THREE.Color(0x6aa81f), YERBA_F = new THREE.Color(0x7a7d68), CALA_V = new THREE.Color(0x6b3f22), CALA_F = new THREE.Color(0x5a4a40);
// vapor: tres volutas (tubos ondulados crema verdoso que suben); se rearman en cada cuadro, deterministas por t
function hacerVapor(N, R0) {
  const g = new THREE.Group();
  const m = new THREE.MeshStandardMaterial({ color: 0xe2f8cf, emissive: 0x9ee07a, emissiveIntensity: 0.35, roughness: 0.9 });
  const tubos = [];
  for (let i = 0; i < 3; i++) { const tb = new THREE.Mesh(new THREE.BufferGeometry(), m); g.add(tb); tubos.push(tb); }
  g.userData.poner = (t, k, alto = 1, lift = 0) => {
    tubos.forEach((tb, i) => {
      const H = R0 * alto * (0.75 + 0.25 * ((i + 1) % 3) / 2), y0 = lift * H * 0.85; // al enfriarse (lift) se despega hacia arriba y se afina
      tb.visible = k > 0.03;
      if (!tb.visible) return;
      const pts = [];
      const fase = i * 2.1, dx = (i - 1) * 0.11 * R0;
      for (let j = 0; j <= 24; j++) {
        const u = j / 24, y = y0 + u * (H - y0);
        const x = dx * (1 - u * 0.4) + Math.sin(u * 7 - t * 3.2 + fase) * 0.09 * R0 * (0.25 + u);
        const z = Math.cos(u * 5 - t * 2.4 + fase) * 0.05 * R0 * u;
        pts.push(new THREE.Vector3(x, y, z));
      }
      tb.geometry.dispose();
      const curva = new THREE.CatmullRomCurve3(pts), TS = 48, RS = 10;
      const geo = new THREE.TubeGeometry(curva, TS, 0.04 * R0 * Math.max(0.05, k), RS, false);
      // afinar hacia la punta (la voluta termina en punta, no en fideo)
      const pos = geo.attributes.position, c0 = new THREE.Vector3(), v = new THREE.Vector3();
      for (let j = 0; j <= TS; j++) {
        curva.getPointAt(j / TS, c0); const f = 1 - 0.85 * Math.pow(j / TS, 1.3);
        for (let q = 0; q <= RS; q++) { const n = j * (RS + 1) + q; v.fromBufferAttribute(pos, n).sub(c0).multiplyScalar(f).add(c0); pos.setXYZ(n, v.x, v.y, v.z); }
      }
      pos.needsUpdate = true; geo.computeVertexNormals();
      tb.geometry = geo;
    });
  };
  scene.add(g); return g;
}
const vaporG = hacerVapor(3, 1.0);
// el celular gigante del corte escondido (misma textura que el del atril)
const celuG = hacerCelular(); scene.add(celuG);
const KCG = 9.0;

// ---------- R2: el "?" verde (ronda 1: más grande; se vuelve el reloj de la primera hora) ----------
const PQ = V(1.95, 0, -0.4); // ronda 2: más cerca del mate (el paneo nunca queda sin protagonista)
const pregM = [mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.16 }), mat(C.gd, 0.5)];
const preg = textoGrupo("?", 1.9, 0.5, pregM); scene.add(preg);
const ALTO_Q = preg.userData.alto;

// ---------- R5: los relojes de pie (1: la primera hora, en el lugar del "?"; 2: las 42 h, en el lugar del buzón rojo) ----------
const RR = 0.85, RY = 1.25; // radio y alto del centro (ronda 1: más chico, no toca los bordes)
const esfP = tex(1024, 1024, (x, w) => {
  x.fillStyle = "#f4f2e8"; x.beginPath(); x.arc(w / 2, w / 2, w / 2, 0, 7); x.fill();
  x.fillStyle = NAV0;
  for (let h = 0; h < 12; h++) { const a = (h / 12) * Math.PI * 2; x.save(); x.translate(w / 2 + Math.sin(a) * 432, w / 2 - Math.cos(a) * 432); x.rotate(a); rr(x, h % 3 ? -11 : -18, -36, h % 3 ? 22 : 36, h % 3 ? 56 : 72, 8); x.restore(); }
  x.font = F(800, 96); x.textAlign = "center"; x.textBaseline = "middle";
  for (const [n, a] of [[12, 0], [3, 0.25], [6, 0.5], [9, 0.75]]) x.fillText(String(n), w / 2 + Math.sin(a * Math.PI * 2) * 318, w / 2 - Math.cos(a * Math.PI * 2) * 318 + 6);
});
function hacerRelojPie(conCuna) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.TorusGeometry(RR, 0.1, 16, 64), M.navy, 0, RY, 0));
  g.add(mesh(new THREE.CylinderGeometry(RR, RR, 0.14, 64).rotateX(Math.PI / 2), M.navy3, 0, RY, -0.06));
  g.add(mesh(new THREE.CircleGeometry(RR * 0.97, 64), new THREE.MeshStandardMaterial({ map: esfP, roughness: 0.6, emissive: 0xffffff, emissiveMap: esfP, emissiveIntensity: 0.12 }), 0, RY, 0.015));
  for (const s of [-1, 1]) { g.add(tubo(V(s * 0.38, RY - 0.7, -0.05), V(s * 0.64, 0.0, -0.05), 0.045, M.navy)); g.add(mesh(rbox(0.26, 0.05, 0.26, 0.02), M.navy, s * 0.64, 0.025, -0.05)); }
  let cuna = null;
  if (conCuna) {
    const f = new THREE.Shape(); f.moveTo(0, 0); f.absarc(0, 0, RR * 0.9, Math.PI / 2, Math.PI / 2 - Math.PI / 6, true); f.lineTo(0, 0);
    cuna = new THREE.Mesh(new THREE.ExtrudeGeometry(f, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2, curveSegments: 24 }), [mat(C.g, 0.42, { emissive: C.g, emissiveIntensity: 0.18 }), mat(C.gd, 0.5)]);
    cuna.position.set(0, RY, 0.02); g.add(cuna);
  }
  // ronda 1: agujas más cortas (no tapan el 12 cuando marcan las 12)
  const ag = (L, A, m, z) => { const p = new THREE.Group(); p.position.set(0, RY, z); const b = mesh(rbox(A, L, 0.03, A / 2 - 0.002, 2), m); b.position.y = L / 2 - 0.07; p.add(b); g.add(p); return p; };
  const agH = ag(RR * 0.38, 0.08, M.navy, 0.06), agM = ag(RR * 0.54, 0.055, M.navy, 0.09);
  g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.06, 20).rotateX(Math.PI / 2), M.g, 0, RY, 0.12));
  g.userData = { agH, agM, cuna };
  sh(g); scene.add(g); return g;
}
const PR1 = PQ.clone();
const reloj1 = hacerRelojPie(true);
const num1h = textoGrupo("1 h", 0.26, 0.08, [mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.18 }), mat(C.navy, 0.5)]); scene.add(num1h);

// ---------- R6: el cable enrulado hasta la silla del que decide ----------
const PS = V(PR1.x + 1.72, 0, 0.25);
const sillaD = hacerSilla(); scene.add(sillaD); sillaD.position.copy(PS);
const CAM_CABLE = new THREE.CatmullRomCurve3([
  V(PR1.x + 0.22, RY + 0.48, 0.2 + PR1.z), V(PR1.x + 0.75, RY + 0.25, 0.4 + PR1.z), V(PR1.x + RR + 0.25, 0.5, 0.5 + PR1.z), V(PR1.x + RR + 0.45, 0.05, 0.55 + PR1.z),
  V(PS.x - 0.9, 0.05, PS.z + 0.5), V(PS.x - 0.5, 0.05, PS.z + 0.35), V(PS.x - 0.3, 0.38, PS.z + 0.12),
]);
function curvaRulo(base, vueltas, r) {
  const pts = [], N = 900;
  const fr = base.computeFrenetFrames(N, false);
  for (let i = 0; i <= N; i++) {
    const u = i / N, p = base.getPointAt(u), a = u * vueltas * Math.PI * 2;
    pts.push(p.clone().addScaledVector(fr.normals[i], Math.cos(a) * r).addScaledVector(fr.binormals[i], Math.sin(a) * r));
  }
  return new THREE.CatmullRomCurve3(pts);
}
const cableGeo = new THREE.TubeGeometry(curvaRulo(CAM_CABLE, 62, 0.045), 2400, 0.018, 8, false);
const cable = new THREE.Mesh(cableGeo, mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.15 })); cable.castShadow = true; scene.add(cable);
// el cable gris "una hora después": ronda 1: nace afuera del aro (no atraviesa la esfera), corto y flojo
// ronda 2: el gris sale de atrás del reloj y cae hacia atrás (no cruza el verde, que va por adelante)
const CAM_GRIS = new THREE.CatmullRomCurve3([V(PR1.x + RR * 0.7, RY - 0.45, PR1.z - 0.12), V(PR1.x + RR + 0.12, RY - 0.75, PR1.z - 0.3), V(PR1.x + RR + 0.15, 0.3, PR1.z - 0.45), V(PR1.x + RR + 0.05, 0.04, PR1.z - 0.6), V(PR1.x + RR - 0.25, 0.04, PR1.z - 0.7)]);
const cableGris = new THREE.Mesh(new THREE.TubeGeometry(curvaRulo(CAM_GRIS, 22, 0.04), 900, 0.016, 8, false), mat(0x8a93a6, 0.6)); cableGris.castShadow = true; scene.add(cableGris);
const tildesS = T.tildes.map(() => hacerTilde(0.12));
const TILDE_POS = [[0.0, 1.5, 0.3], [-0.5, 1.12, 0.3], [0.52, 1.14, 0.3], [-0.54, 0.7, 0.45], [0.56, 0.72, 0.4], [-0.34, 1.44, 0.35], [0.36, 1.46, 0.35]];

// ---------- R3: el avión de papel (despega de la silla), la bandada y las empresas ----------
const texAla = tex(512, 512, (x, w, h) => {
  x.fillStyle = "#f6f4ec"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "rgba(22,36,61,0.25)"; x.lineWidth = 6; x.beginPath(); x.moveTo(0, h / 2); x.lineTo(w, h / 2); x.stroke();
});
function hacerAvion() {
  const g = new THREE.Group();
  const m = new THREE.MeshStandardMaterial({ color: 0xf6f4ec, roughness: 0.7, side: THREE.DoubleSide, map: texAla });
  const tri = (a, b, c) => { const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute([...a, ...b, ...c], 3)); geo.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 0.5, 1], 2)); geo.computeVertexNormals(); return new THREE.Mesh(geo, m); };
  g.add(tri([0, 0, 0.5], [-0.42, 0.06, -0.5], [0, 0, -0.42]));
  g.add(tri([0, 0, 0.5], [0, 0, -0.42], [0.42, 0.06, -0.5]));
  g.add(tri([0, 0, 0.5], [0, 0, -0.42], [0, -0.14, -0.4]));
  const sob = new THREE.Group(); sob.position.set(0.14, 0.035, -0.18); sob.rotation.set(-Math.PI / 2, 0, 0.12); g.add(sob);
  sob.add(new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.11), mat(C.g, 0.5, { side: THREE.DoubleSide, emissive: C.g, emissiveIntensity: 0.12 })));
  const v = new THREE.Shape(); v.moveTo(-0.08, 0.055); v.lineTo(0, -0.005); v.lineTo(0.08, 0.055); v.lineTo(0.07, 0.055); v.lineTo(0, 0.008); v.lineTo(-0.07, 0.055); v.closePath();
  const vm = new THREE.Mesh(new THREE.ShapeGeometry(v), mat(C.navy, 0.5, { side: THREE.DoubleSide })); vm.position.z = 0.002; sob.add(vm);
  return sh(g);
}
const avion = hacerAvion(); scene.add(avion);
const bandada = Array.from({ length: 16 }, () => { const a = hacerAvion(); scene.add(a); return a; });
const PB = V(PS.x + 3.3, 0, -2.4);
const EDIF = [];
{
  const az = azarDe(91);
  for (let i = 0; i < 9; i++) for (let j = 0; j < 7; j++) {
    const x = PB.x - 2.0 + i * 0.5 + (az() - 0.5) * 0.12, z = PB.z - 1.5 + j * 0.5 + (az() - 0.5) * 0.12;
    if (Math.hypot((x - PB.x) / 2.3, (z - PB.z) / 1.75) > 1.05) continue;
    EDIF.push({ x, z, w: 0.26 + az() * 0.1, d: 0.26 + az() * 0.1, h: 0.32 + az() * 0.55, f: az() });
  }
}
const texVent = tex(128, 256, (x, w, h) => {
  x.fillStyle = NAV3; x.fillRect(0, 0, w, h);
  x.fillStyle = "rgba(239,238,229,0.85)";
  for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) x.fillRect(14 + c * 38, 18 + r * 40, 24, 22);
});
const edifM = new THREE.MeshStandardMaterial({ map: texVent, roughness: 0.6 });
const edifTecho = mat(C.navy, 0.5);
const edificios = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), [edifM, edifM, edifTecho, edifTecho, edifM, edifM], EDIF.length);
edificios.castShadow = true; edificios.receiveShadow = true; scene.add(edificios);
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3();
const mat2241 = [mat(C.cr, 0.4, { emissive: 0xf3dfb8, emissiveIntensity: 0.12, transparent: true }), mat(C.navy, 0.5, { transparent: true })];
const num2241 = textoGrupo("2.241", 0.44, 0.13, mat2241); scene.add(num2241);

// ---------- R4: los cuatro buzones (ronda 1: más grandes) ----------
const PZ = V(PB.x + 3.4, 0, -0.2);
const KB = 1.3; // escala de los buzones
const BZ_X = [-1.02, -0.34, 0.34, 1.02].map((x) => x / KB); // ronda 2: un poco más separados (el push-in no corta a nadie) // ronda 1: juntos (el ancho de los cuatro entra en cuadro)
const buzonM = [0, 1, 2, 3].map(() => mat(C.navy3, 0.45));
const tapaM = [0, 1, 2, 3].map(() => mat(C.cr, 0.6));
function hacerBuzon(i) {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.12, 1.0, 0.12, 0.03), M.navy, 0, 0.5, 0));
  g.add(mesh(rbox(0.36, 0.05, 0.36, 0.02), M.navy, 0, 0.025, 0));
  const caja = new THREE.Group(); caja.position.y = 1.0; g.add(caja);
  caja.add(mesh(rbox(0.46, 0.3, 0.66, 0.03), buzonM[i], 0, 0.15, 0));
  const techo = mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.66, 28, 1, false, -Math.PI / 2, Math.PI), buzonM[i], 0, 0.3, 0); techo.rotation.x = Math.PI / 2; caja.add(techo);
  const tapa = new THREE.Group(); tapa.position.set(0, 0.0, 0.335); caja.add(tapa);
  const tapaF = new THREE.Shape(); tapaF.moveTo(-0.23, 0); tapaF.lineTo(0.23, 0); tapaF.lineTo(0.23, 0.3); tapaF.absarc(0, 0.3, 0.23, 0, Math.PI, false); tapaF.lineTo(-0.23, 0);
  tapa.add(new THREE.Mesh(new THREE.ExtrudeGeometry(tapaF, { depth: 0.025, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 1 }), tapaM[i]));
  tapa.add(mesh(rbox(0.26, 0.04, 0.02, 0.01), M.navy, 0, 0.36, 0.03));
  tapa.add(mesh(rbox(0.08, 0.05, 0.03, 0.01), M.navy, 0, 0.12, 0.035));
  const band = new THREE.Group(); band.position.set(0.245, 0.22, -0.05); caja.add(band);
  band.add(mesh(rbox(0.035, 0.42, 0.04, 0.012), M.navy, 0, 0.18, 0));
  band.add(mesh(rbox(0.035, 0.2, 0.28, 0.015), M.g, 0, 0.3, 0.12)); // ronda 2: banderita más grande
  g.userData = { caja, band, tapa };
  return sh(g);
}
const buzones = [0, 1, 2, 3].map((i) => { const b = hacerBuzon(i); scene.add(b); return b; });
const sobreTex = tex(256, 180, (x, w, h) => { x.fillStyle = "#f6f4ec"; x.fillRect(0, 0, w, h); x.strokeStyle = NAV; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10); x.beginPath(); x.moveTo(8, 8); x.lineTo(w / 2, h * 0.6); x.lineTo(w - 8, 8); x.stroke(); });
function hacerSobre() { const g = new THREE.Group(); g.add(mesh(rbox(0.3, 0.2, 0.012, 0.004), [M.cr, M.cr, M.cr, M.cr, new THREE.MeshStandardMaterial({ map: sobreTex, roughness: 0.7 }), M.cr])); return sh(g); }
const sobres = [0, 1, 2, 3].map(() => { const s2 = hacerSobre(); scene.add(s2); return s2; });
const respuestas = [0, 1, 2].map(() => hacerTilde(0.17));
const telarana = crearTelarana(0.2, 0.006, 7); scene.add(telarana);
const PR2 = V(PZ.x + BZ_X[3] * KB, 0, PZ.z + 0.5); // adelante del buzón rojo, que se va hacia atrás
const reloj2 = hacerRelojPie(false);
const solM = mat(0xf5d76e, 0.4, { emissive: 0xf5c84a, emissiveIntensity: 0.5 });
const sol3 = new THREE.Group(); scene.add(sol3);
{ sol3.add(mesh(new THREE.SphereGeometry(0.17, 24, 16), solM)); for (let i = 0; i < 8; i++) { const r = mesh(rbox(0.045, 0.12, 0.04, 0.02), solM); const a = (i / 8) * Math.PI * 2; r.position.set(Math.sin(a) * 0.26, Math.cos(a) * 0.26, 0); r.rotation.z = -a; sol3.add(r); } }
const luna3 = new THREE.Group(); scene.add(luna3);
{ const s2 = new THREE.Shape(); s2.absarc(0, 0, 0.2, Math.PI * 0.35, Math.PI * 1.65, false); s2.absarc(0.09, 0, 0.155, Math.PI * 1.55, Math.PI * 0.45, true); luna3.add(new THREE.Mesh(new THREE.ExtrudeGeometry(s2, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 2 }), mat(C.cr, 0.5, { emissive: C.cr, emissiveIntensity: 0.25 }))); }
const num42 = textoGrupo("42 h", 0.46, 0.13, [mat(C.cr, 0.4, { emissive: 0xf3dfb8, emissiveIntensity: 0.12 }), mat(C.navy, 0.5)]); scene.add(num42);

// ---------- R7: la ficha del CRM, la burbuja, el termo que ceba, la respuesta ----------
const PK = V(-1.95, 1.3, 0.4); // ronda 2: más cerca del mate
const FP = [820, 960];
const FW = 1.3, FH = FW * FP[1] / FP[0];
const fichaTV = texViva(...FP);
// la ficha del CRM (vertical): arriba la consulta de Graciela (roja como en la bandeja de Rubén; al anotarla, navy),
// abajo "Anotado ✓" y "Aviso a Nico ✓ 18:41"
function dibujarFicha(u0, u1, u2, u3) {
  // ronda 1: lista de pasos (pendiente en gris, hecho en verde con tilde): no queda hueco vacío en la ficha
  const clave = [u0, u1, u2, u3].map((v) => v.toFixed(2)).join(",");
  if (fichaTV.clave === clave) return; fichaTV.clave = clave;
  const x = fichaTV.x, [w, h] = FP;
  x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
  x.textBaseline = "middle"; x.textAlign = "left";
  const roja = u0 < 0.5;
  x.fillStyle = roja ? ROJ : NAV0; rr(x, 30, 30, w - 60, 230, 30);
  x.fillStyle = CRE; ajustar(x, "Graciela · Rotisería", 800, 64, w - 120); x.fillText("Graciela · Rotisería", 60, 105);
  const l2 = "Presupuesto · ayer 18:40"; // ronda 1: la misma consulta que en la bandeja
  x.fillStyle = roja ? CRE : VER; ajustar(x, l2, 700, 52, w - 120); x.fillText(l2, 60, 196);
  const fila = (y, alto, l1, l2b, u) => {
    const hecho = cl(u * 1.4), s2 = u > 0 ? lerp(1.06, 1, bk(u)) : 1;
    x.save(); x.translate(w / 2, y + alto / 2); x.scale(s2, s2); x.translate(-w / 2, -(y + alto / 2));
    x.fillStyle = hecho > 0.5 ? VER : "#dcdacd"; rr(x, 30, y, w - 60, alto, 34);
    x.fillStyle = hecho > 0.5 ? NAV0 : "rgba(22,36,61,0.55)"; ajustar(x, l1, 800, 70, w - 250); x.fillText(l1, 64, l2b ? y + alto / 2 - 30 : y + alto / 2 + 4);
    if (l2b) { x.font = F(700, 52); x.fillText(l2b, 64, y + alto / 2 + 38); }
    if (hecho > 0.5) {
      x.fillStyle = NAV0; x.beginPath(); x.arc(w - 105, y + alto / 2, 54, 0, 7); x.fill();
      x.strokeStyle = VER; x.lineWidth = 16; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(w - 133, y + alto / 2 + 2); x.lineTo(w - 112, y + alto / 2 + 24); x.lineTo(w - 76, y + alto / 2 - 22); x.stroke();
    } else { x.strokeStyle = "rgba(22,36,61,0.4)"; x.lineWidth = 8; x.beginPath(); x.arc(w - 105, y + alto / 2, 46, 0, 7); x.stroke(); }
    x.restore();
  };
  fila(290, 190, "Anotado", null, u1);
  fila(505, 210, "Aviso a Nico", "18:41", u2);
  fila(740, 190, "Seguimiento", null, u3);
  fichaTV.t.needsUpdate = true;
}
const ficha = new THREE.Group(); scene.add(ficha);
{
  const fm = new THREE.MeshBasicMaterial({ map: fichaTV.t, toneMapped: false });
  ficha.add(mesh(rbox(FW + 0.08, FH + 0.08, 0.08, 0.06), M.navy, 0, 0, -0.045));
  ficha.add(mesh(new THREE.PlaneGeometry(FW, FH), fm, 0, 0, 0.001));
  sh(ficha); ficha.children[1].castShadow = false;
}
// la campanita verde (aviso a Nico)
const campana = new THREE.Group(); scene.add(campana);
{
  const perfil = [[0, 0.3], [0.05, 0.29], [0.1, 0.24], [0.13, 0.12], [0.16, 0.02], [0.21, -0.03], [0.21, -0.05], [0, -0.05]].map(([r, y]) => new THREE.Vector2(r, y));
  campana.add(new THREE.Mesh(new THREE.LatheGeometry(perfil, 36), mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.16 })));
  campana.add(mesh(new THREE.SphereGeometry(0.05, 16, 12), M.navy, 0, -0.08, 0));
  campana.add(mesh(new THREE.TorusGeometry(0.04, 0.014, 8, 20), M.navy, 0, 0.33, 0));
  sh(campana);
}
// la burbuja de chat (sale sola) y la respuesta de Graciela
function hacerBurbuja(lineas, fondo, tinta, tilde, ancho = 1.9, alto = 0.62, izq = false, maxPx = 74) {
  const g = new THREE.Group();
  const t = tex(1024, Math.round((1024 * alto) / ancho), (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.fillStyle = tinta; x.textAlign = "left"; x.textBaseline = "middle";
    const n = lineas.length; let px = 999;
    for (const l of lineas) px = Math.min(px, ajustar(x, l, 800, maxPx, w - 80));
    x.font = F(800, px);
    lineas.forEach((l, i) => x.fillText(l, 40, h / 2 + (i - (n - 1) / 2) * px * 1.16 + (tilde ? -14 : 4)));
    if (tilde) { x.strokeStyle = VER; x.lineWidth = 15; x.lineCap = "round"; x.lineJoin = "round"; for (const dx of [0, 30]) { x.beginPath(); x.moveTo(w - 150 + dx, h - 46); x.lineTo(w - 130 + dx, h - 26); x.lineTo(w - 92 + dx, h - 70); x.stroke(); } }
  });
  const m = new THREE.MeshBasicMaterial({ map: t, toneMapped: false });
  const cuerpo = mesh(rbox(ancho + 0.06, alto + 0.06, 0.08, 0.16), new THREE.MeshStandardMaterial({ color: new THREE.Color(fondo), roughness: 0.5 }), 0, 0, -0.045); g.add(cuerpo);
  g.add(mesh(new THREE.PlaneGeometry(ancho - 0.12, alto - 0.08), m, 0, 0, 0.001));
  const cola = new THREE.Shape(); cola.moveTo(0, 0); cola.lineTo(0.24, 0); cola.lineTo(izq ? -0.02 : 0.3, -0.22); cola.closePath();
  const cm = new THREE.Mesh(new THREE.ExtrudeGeometry(cola, { depth: 0.08, bevelEnabled: false }), cuerpo.material);
  cm.position.set(izq ? -ancho / 2 + 0.12 : ancho / 2 - 0.42, -alto / 2 - 0.02, -0.085); g.add(cm);
  return sh(g);
}
const burbuja = hacerBurbuja(["Graciela, te paso", "el presupuesto.", "¿Lo vemos?"], "#ffffff", NAV0, true, 1.22, 0.86, true, 100); // ronda 2: más angosta // ronda 1 (guion)
scene.add(burbuja);
const respG = hacerBurbuja(["¡Sí!", "¿Me llamás?"], VER, NAV0, false, 1.1, 0.62, true, 130); // ronda 1: callback a llamar
scene.add(respG);
const termoG = crearTermo(); scene.add(termoG); const KT = KM * 0.5; termoG.scale.setScalar(KT); sh(termoG);
termoG.children.forEach((o) => { if (o.geometry && o.geometry.type === "TorusGeometry") { o.position.x = 0.07; o.rotation.z = -Math.PI / 2; } }); // ronda 2: el asa del lado de afuera (no asoma detrás del mate) // ronda 1: más chico (entra en cuadro)
const chorro = mesh(new THREE.CylinderGeometry(0.022, 0.03, 1, 12), new THREE.MeshStandardMaterial({ color: 0x9fd2e6, roughness: 0.15, transparent: true, opacity: 0.6, depthWrite: false })); scene.add(chorro); // ronda 1: chorro fino y translúcido

// ================= ZONA F: el cierre verde (un mate chico humeando) =================
const mateF = crearMate(); scene.add(mateF); mateF.scale.setScalar(5.2); suavizarMate(mateF); sh(mateF);
const vaporF = hacerVapor(3, 0.75);
const pisoF = pisoSombra(OF.x, 0, 8, 8, 0.22);

// ================= CÁMARA (Catmull-Rom por claves, con tiempo no uniforme; entre planos, corte) =================
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const o = (x, y, z) => [OO.x + x, y, z];
const r = (x, y, z) => [x, y, z];
let PLANOS = null;
// el corte escondido s01 → s02: el celular del atril (mirando a -z) y el gigante (mirando a +z), mismo encuadre relativo
const CAM_CEL = V(0.03, 0.05, -0.75); // ronda 1: el celular entero y más abajo (su encabezado no queda bajo el subtítulo) // cámara final de O1 relativa al celular del atril (en metros reales)
function armarPlanos() {
  const cel = CELU_ATRIL;
  const finO1 = [cel.x + CAM_CEL.x, cel.y + CAM_CEL.y, cel.z + CAM_CEL.z], miraO1 = [cel.x, cel.y + 0.06, cel.z];
  const escG = KCG / KCEL;
  const yG = 0.11 * KCG; // centro del celular gigante
  const iniR = [PM.x - CAM_CEL.x * escG, yG + CAM_CEL.y * escG, PM.z - CAM_CEL.z * escG], miraR = [PM.x, yG + 0.06 * escG, PM.z];
  return [
    // s01: por encima del hombro derecho de Rubén: el formulario, el clic, el celular que vibra; push-in al celular
    ["O1", 0, [
      k(0, o(-0.62, 1.95, -1.75), o(0.12, 1.02, MON.z - 0.1), 34),
      k(T.vibra - 0.1, o(-0.7, 1.88, -1.5), o(-0.12, 1.0, MON.z), 34),
      k(T.s02 - 0.05, finO1, miraO1),
    ]],
    // s02-s08: el reloj-piso, una sola curva
    ["R", T.s02, [
      k(T.s02, iniR, miraR),
      k(T.morph + 0.45, r(PM.x + 0.2, 1.7, 6.2), r(PM.x, 1.15, 0)),
      k(T.rapido, r(PM.x + 0.1, 1.45, 5.6), r(PM.x, 1.15, 0)),
      k(T.s03 - 0.22, r(PM.x + 0.15, 1.5, 5.5), r(PM.x + 0.05, 1.15, 0)),
      // el "?" grande y centrado
      k(T.s03 + 0.1, r(PQ.x, 1.6, PQ.z + 5.3), r(PQ.x, 1.15, PQ.z)),
      k(T.s04 - 0.05, r(PQ.x, 1.6, PQ.z + 5.2), r(PQ.x, 1.15, PQ.z)),
      // el reloj de la primera hora: entero, con el borde de arriba debajo del subtítulo
      k(T.s04 + 0.45, r(PR1.x, 1.85, PR1.z + 6.7), r(PR1.x, 1.6, PR1.z)),
      k(T.hora + 0.1, r(PR1.x + 0.05, 1.8, PR1.z + 6.2), r(PR1.x + 0.05, 1.5, PR1.z)),
      // el cable a la silla
      // ronda 2: el reloj entero y la silla en el mismo cuadro, de 3/4 desde la derecha
      k(T.s05 + 0.35, r(PS.x + 2.1, 2.2, PS.z + 7.4), r(PR1.x + 0.55, 1.0, PR1.z)),
      k(T.llegar - 0.2, r(PS.x + 2.0, 2.15, PS.z + 7.2), r(PR1.x + 0.6, 1.0, PR1.z)),
      k(T.llegar, r(PS.x + 1.5, 1.9, PS.z + 5.8), r(PS.x - 0.45, 1.05, PS.z)),
      k(T.decide, r(PS.x, 1.6, PS.z + 4.9), r(PS.x, 1.1, PS.z)),
      // el avión despega de la silla y vuela a las empresas (la mirada lo sigue)
      k(T.s06 + 0.3, r(PS.x + 1.0, 2.1, 4.4), r(PS.x + 1.3, 1.5, 0.0)),
      k(T.escribio + 0.15, r(PB.x - 1.6, 2.5, 3.9), r(PB.x - 1.1, 1.6, PB.z + 1.2)),
      k(T.empresas + 0.15, r(PB.x, 3.0, PB.z + 6.6), r(PB.x, 1.3, PB.z)),
      k(T.s07 - 0.04, r(PB.x + 0.1, 3.0, PB.z + 6.45), r(PB.x + 0.1, 1.3, PB.z)), // ronda 3: casi corte a los buzones (sin paneo vacío)
      // buzones de 3/4: el rojo (el cuarto) adelante
      // buzones casi de frente (los cuatro enteros); push-in a 2, 3 y el rojo
      k(T.s07 + 0.0, r(PZ.x, 1.95, PZ.z + 8.3), r(PZ.x, 1.55, PZ.z)),
      k(T.cuatro, r(PZ.x, 1.95, PZ.z + 8.1), r(PZ.x, 1.55, PZ.z)),
      // ronda 2: push-in a los dos de la derecha (el segundo queda afuera entero)
      k(T.contesto + 0.1, r(PZ.x + 0.68, 1.92, PZ.z + 5.0), r(PZ.x + 0.68, 1.64, PZ.z)),
      k(T.s08 - 0.62, r(PZ.x + 0.68, 1.92, PZ.z + 5.05), r(PZ.x + 0.68, 1.64, PZ.z)), // ronda 3: se queda (las tildes no suben al subtítulo)
      // el reloj de las 42 h (nace en el lugar del buzón rojo)
      k(T.s08 - 0.05, r(PR2.x, 2.2, PR2.z + 6.9), r(PR2.x, 1.85, PR2.z)), // ronda 3: llega antes (el reloj nace ya encuadrado)
      k(T.casi, r(PR2.x, 2.2, PR2.z + 6.7), r(PR2.x, 1.85, PR2.z)),
      k(T.s09, r(PR2.x, 2.15, PR2.z + 6.4), r(PR2.x, 1.8, PR2.z)),
    ]],
    // s09: corte en la silla: Rubén sentado de frente (giró la silla hacia la cámara, a -z), plano medio
    ["O2", T.s09, [
      k(T.s09, [RUB.x, 1.5, RUB.z - 3.0], [RUB.x, 1.2, RUB.z]),
      k(T.s09 + 0.6, [RUB.x - 0.03, 1.52, RUB.z - 2.8], [RUB.x, 1.22, RUB.z]),
      k(T.s10 - 0.05, [RUB.x - 0.05, 1.52, RUB.z - 2.7], [RUB.x, 1.22, RUB.z]),
      // s10: gira la silla al monitor; la cámara rodea por su derecha (lejos de la cabeza) y queda de 3/4
      k(T.insert, [RUB.x - 0.08, 1.5, RUB.z - 2.6], [RUB.x - 0.05, 1.23, RUB.z]), // ronda 3: push-in corto, sin rodearlo
    ]],
    // inserto: la pantalla de frente, la fila roja; push-in (corte escondido a la ficha del CRM)
    ["O3", T.insert, [
      // ronda 1: el monitor entero (90 % del ancho), el encabezado debajo del subtítulo; push-in corto sin cortar texto
      k(T.insert, o(0, MON.y + 0.55, MON.z - 2.9), o(0, MON.y - 0.12, MON.z), 34),
      k(T.s11, o(0, MON.y + 0.5, MON.z - 2.68), o(0, MON.y - 0.12, MON.z), 34),
    ]],
    // s11-s13: la ficha del CRM (de la fila roja a la ficha entera), el mate y el termo
    ["R2", T.s11, [
      // ronda 1: la ficha entera desde el corte (empalma con el monitor entero del inserto)
      k(T.s11, r(PK.x, PK.y + 0.15, PK.z + 4.7), r(PK.x, PK.y + 0.1, PK.z)),
      k(T.s11 + 0.75, r(PK.x, PK.y + 0.15, PK.z + 4.45), r(PK.x, PK.y + 0.1, PK.z)),
      k(T.instante + 0.25, r(PK.x, PK.y + 0.15, PK.z + 4.3), r(PK.x, PK.y + 0.1, PK.z)),
      k(T.s12 - 0.12, r(PK.x + 0.05, PK.y + 0.15, PK.z + 4.3), r(PK.x + 0.05, PK.y + 0.1, PK.z)),
      k(T.s12 + 0.38, r(0.1, 2.45, 6.9), r(0.1, 1.62, 0)),
      k(T.solo + 0.3, r(0.1, 2.42, 6.6), r(0.1, 1.64, 0)),
      k(T.fin, r(0.1, 2.42, 6.45), r(0.1, 1.66, 0)),
    ]],
    ["F", T.fin, [
      k(T.fin, [OF.x, 1.7, 7.4], [OF.x, 1.45, 0]),
      k(DUR, [OF.x, 1.68, 7.1], [OF.x, 1.45, 0]),
    ]],
  ];
}
const _mira = new THREE.Vector3();
let plano = "O1";
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return pi; }
function ponerCamara(t) {
  const pi = planoEn(t);
  plano = PLANOS[pi][0];
  const K = PLANOS[pi][2];
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
  const vv = [];
  for (let cc = 1; cc <= 7; cc++) {
    if (hh <= 0) { vv.push(a0[cc]); continue; }
    vv.push((2 * s3 - 3 * s2 + 1) * a0[cc] + (s3 - 2 * s2 + u) * hh * tang(i, cc) + (-2 * s3 + 3 * s2) * b0[cc] + (s3 - s2) * hh * tang(i + 1, cc));
  }
  camera.position.set(vv[0], vv[1], vv[2]);
  const amp = 0.002;
  camera.position.x += Math.sin(t * 0.7) * amp; camera.position.y += Math.sin(t * 0.53) * amp;
  camera.position.y += rebote(t, T.rojo + 0.05, 9, 50, 0.012); // golpe sordo del buzón que no contesta
  _mira.set(vv[3], vv[4], vv[5]);
  camera.fov = vv[6];
  const dd = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.01, Math.min(0.08, dd * 0.03)); camera.far = 200;
  camera.updateProjectionMatrix();
  camera.up.set(0, 1, 0);
  const dir = _mira.clone().sub(camera.position).normalize();
  if (Math.abs(dir.y) > 0.9) camera.up.set(0, 0, -1);
  // s04: la mirada sigue al avión de papel mientras vuela (se suma a la curva, entra y sale suave)
  if (plano === "R" && t > T.avion - 0.35 && t < T.bandada + 0.4) {
    const wv = eio(sg(t, T.avion - 0.35, T.avion + 0.05)) * (1 - eio(sg(t, T.bandada - 0.1, T.bandada + 0.4)));
    _mira.lerp(avionEn(t).add(V(0.25, -0.1, 0)), wv);
  }
  // portada (LIMPIO=1 node armar.mjs): en s01, el celular sonando más chico y arriba (el título va abajo)
  if (window.__portada && plano === "O1") { camera.position.copy(CELU_ATRIL).add(V(0.06, 0.14, -1.35)); camera.fov = 34; camera.updateProjectionMatrix(); _mira.copy(CELU_ATRIL).add(V(0, -0.12, 0)); }
  camera.lookAt(_mira);
  camera.updateMatrixWorld(true);
}

// ================= ZONA O en el tiempo =================
const enO = () => plano[0] === "O";
function bocaRuben(t) { const i = Math.round((t - BOCA.t0) * BOCA.fps); return i >= 0 && i < BOCA.v.length ? BOCA.v[i] : 0; }
// pone una mano en un punto del mundo (lado "I" o "D"), mezclando con u
function manoA(pr, lado, pt, u, codo) {
  if (u <= 0.001) return;
  ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
  const h = pt.clone(); ruben.cuerpo.worldToLocal(h);
  const kk = "mano" + lado;
  pr[kk] = pr[kk].map((v, i) => lerp(v, [h.x, h.y, h.z][i], u));
  if (codo) pr["codo" + lado] = codo;
}
function zonaO(t) {
  const en = enO();
  oficina.visible = deposito.visible = ruben.raiz.visible = mateR.visible = termo.visible = celu.visible = pisoO.visible = sillaR.visible = en;
  if (!en) return;
  panelAtras.visible = false; // la cámara siempre queda de este lado (detrás de Rubén o frente a él)
  // ---- el monitor ----
  if (plano === "O1") dibujarMonitor("form", [pulso(t, T.click - 0.05, 0.18), t >= T.click + 0.06 ? 1 : 0]);
  else dibujarMonitor(plano === "O3" ? "bandeja" : "lisa", [1]); // ronda 2: detrás de Rubén, la bandeja sin texto (no queda texto cortado)
  // ---- la silla y Rubén ----
  const s01 = plano === "O1";
  // s09: girado hacia la cámara (giro π); en s10 vuelve al escritorio
  const giro = s01 ? 0 : Math.PI;
  sillaR.userData.giro.rotation.y = giro;
  const base = { x: RUB.x, y: -0.06, z: RUB.z, giro, sentado: 1, inclina: 0.04, t };
  // centro del asiento: la silla gira alrededor de su eje; Rubén sentado un poco adelante del centro
  const adel = 0.06;
  base.x += Math.sin(giro) * adel; base.z += Math.cos(giro) * adel;
  let pr;
  if (s01) {
    pr = poseEn(t, [
      [0, { ...base, ...CARA.concentrada, cabeza: { giro: 0, asiente: 0.2, ladea: 0 }, ojos: { x: 0, y: -0.4, abiertos: 0.9 }, manoI: [0.2, 0.2, 0.25], manoD: [-0.2, 0.25, 0.4], codoI: null, codoD: null, dedoD: 0 }],
      [T.click + 0.4, { ...CARA.sonrisa, cabeza: { giro: 0.05, asiente: 0.08, ladea: 0.05 }, ojos: { x: 0, y: -0.2, abiertos: 1 } }, 0.3],
      [T.vibra + 0.25, { ...CARA.sorpresa, boca: { sonrisa: 0.05, abierta: 0.25, ancho: 0.8 }, cabeza: { giro: -0.55, asiente: 0.12, ladea: -0.04 }, ojos: { x: -0.7, y: -0.3, abiertos: 1 } }, 0.25],
    ]);
    pr.t = t; Object.assign(pr, { x: base.x, y: base.y, z: base.z, giro: base.giro, sentado: 1 });
    // la mano derecha en el mouse; clic con el índice
    const mouse = V(MON.x + 0.02, ESC.y + 0.04, ESC.z - 0.2);
    manoA(pr, "D", mouse.clone().add(V(0, 0.025 - 0.02 * pulso(t, T.click - 0.06, 0.14), -0.02)), 1, [-1, -0.6, -0.3]);
    // el mate en la izquierda: sube a la altura del pecho (nunca a la cara) y frena cuando vibra el celular
    // ronda 1: la izquierda apoyada en el escritorio (el mate queda en la mesa, a la vista)
    manoA(pr, "I", V(RUB.x + 0.24, ESC.y + 0.05, ESC.z - 0.24), 1, [1, -0.6, -0.2]);
  } else {
    const fr = t < T.s10 - 0.1;
    pr = poseEn(t, [
      [T.s09, { ...base, ...CARA.sonrisa, inclina: -0.12, cabeza: { giro: 0.05, asiente: -0.05, ladea: 0.08 }, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.0 }, cejas: { alto: 0.35, asim: -0.6 }, manoI: [0.22, 0.12, 0.3], manoD: [-0.2, 0.3, 0.32], codoI: [1, -0.6, -0.2], codoD: [-1, -0.6, -0.2] }],
      [T.primero + 0.2, { cabeza: { giro: -0.1, asiente: 0.05, ladea: 0.02 } }, 0.3],
      [T.mira + 0.3, { ...CARA.incredula, inclina: -0.04, torso: GIRA_TORSO, cabeza: { giro: GIRA_CAB, asiente: 0.0, ladea: 0.04 }, ojos: { x: OJO_X, y: -0.1, abiertos: 0.95 }, cejas: { alto: 0.3, ang: 0.25, asim: 0.5 } }, 0.35],
      [T.insert, { cejas: { alto: -0.2, ang: -0.3, asim: 0.4 }, boca: { sonrisa: -0.4, abierta: 0, ancho: 0.85 }, ojos: { x: OJO_X, y: -0.15, abiertos: 0.75 } }, 0.3],
    ]);
    pr.t = t; Object.assign(pr, { x: base.x, y: base.y, z: base.z, giro: base.giro, sentado: 1 });
    void fr;
  }
  if (t > BOCA.t0 - 0.05 && t < BOCA.t0 + BOCA.v.length / BOCA.fps) { const bb = bocaRuben(t); pr.boca = { ...pr.boca, abierta: Math.max(pr.boca.abierta, bb * 0.55), ancho: lerp(pr.boca.ancho, 0.78, bb) }; }
  // ---- el celular: en el atril (s01); en s09 en la mano derecha, a la altura del pecho, y lo baja al cortar ----
  if (s01) {
    const vib = t >= T.vibra && t < T.s02 ? Math.sin(t * 95) * 0.003 + Math.abs(Math.sin(t * 24)) * 0.004 : 0;
    celu.position.copy(CELU_ATRIL).add(V(vib, 0, 0)); celu.rotation.set(-0.28, Math.PI, Math.sin(t * 80) * (vib ? 0.03 : 0), "YXZ"); celu.scale.setScalar(KCEL);
    dibujarCelu(t >= T.llamada ? "llama" : "off");
    ruben.poner(pr);
    mateR.position.copy(MATE_ESC); mateR.rotation.set(0, 0, 0);
  } else {
    // en la mano derecha
    const baja = eio(sg(t, T.corta + 0.15, T.corta + 0.55));
    const pecho = V(RUB.x + 0.12, lerp(1.0, 0.86, baja), RUB.z - 0.32); // frente a Rubén (que mira a -z)
    const enMesa = false;
    if (!enMesa) {
      manoA(pr, "D", pecho.clone().add(V(0.0, -0.06, 0.01)), 1, [-1, -0.6, -0.1]);
      manoA(pr, "I", V(RUB.x - 0.24, 0.74, RUB.z - 0.3), 1, [1, -0.6, -0.1]); // ronda 1: su izquierda (-x), sin cruzar los antebrazos
      ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
      const md = ruben.mano("D").getWorldPosition(new THREE.Vector3());
      celu.position.copy(md).add(V(0, 0.07, -0.02)); celu.rotation.set(lerp(0.55, 1.1, baja), 0, 0, "YXZ"); celu.scale.setScalar(1.15);
      const mi = ruben.mano("I").getWorldPosition(new THREE.Vector3());
      mateR.position.copy(mi).add(V(-0.07, -0.2, -0.02)); mateR.rotation.set(0, 0, 0); // ronda 1: la mano lo toma de costado, no por la boca
    } else {
      ruben.poner(pr);
      celu.position.copy(CELU_ATRIL); celu.rotation.set(-0.28, Math.PI, 0, "YXZ"); celu.scale.setScalar(KCEL);
      mateR.position.copy(MATE_ESC); mateR.rotation.set(0, 0, 0);
    }
    // el pulgar toca "cortar"
    dibujarCelu(t >= T.corta ? "fin" : "llama");
  }
  if (plano === "O3") { ruben.raiz.visible = false; celu.visible = false; mateR.visible = false; sillaR.visible = false; }
  ruben.raiz.updateMatrixWorld(true);
}

// el avión de papel: despega de la silla y va a las empresas (lo usa también la cámara de s06, que lo sigue)
const AV_A0 = V(PS.x + 0.15, 1.95, PS.z + 0.9), AV_A1 = V(PB.x - 0.5, 1.6, PB.z + 1.4); // ronda 2: arriba y adelante del respaldo
function avionEn(t) { const u = sg(t, T.avion, T.bandada); const p = AV_A0.clone().lerp(AV_A1, eio(u)); p.y += Math.sin(Math.PI * u) * 0.45; return p; }
// ================= ZONA R en el tiempo =================
const enR = () => plano === "R" || plano === "R2";
function zonaR(t) {
  const en = enR();
  reloj.visible = pisoR.visible = en;
  const R1 = plano === "R", R2v = plano === "R2";
  // ---- agujas del reloj-piso: lentas, rápidas en "se enfría" y "tardaron", a las 12 en "primera hora" ----
  {
    const rapidas = 2.2 * eio(sg(t, T.frio - 0.1, T.rapido + 0.3)) + 5.5 * eio(sg(t, T.gira[0], T.gira[1])) + 3.2 * eio(sg(t, T.s12 - 0.05, T.enfria12 + 0.2));
    const base = t * 0.05 + rapidas;
    let am = base * Math.PI * 2, ah = am / 12 + 0.6;
    const doce = eio(sg(t, T.doce, T.doce + 0.35)) * (1 - sg(t, T.s09, T.s09 + 0.01));
    am = lerp(am, Math.ceil(base) * Math.PI * 2, doce); ah = lerp(ah, Math.ceil(ah / (Math.PI * 2)) * Math.PI * 2, doce);
    agujaM.rotation.y = -am; agujaH.rotation.y = -ah;
    // ronda 1: sin agujas del piso mientras está el campo de edificios (desde arriba se leían como una viga que lo cruzaba)
    agujaM.visible = agujaH.visible = !(t > T.s06 - 0.3 && t < T.s07 + 0.3);
    hubG.visible = !(t > T.s06 - 0.3 && t < T.s08 + 0.4); // ronda 3: el centro del piso-reloj no queda como disco suelto entre edificios y buzones
  }
  // ---- R1: mate gigante y vapor ----
  {
    const vis = en;
    const pop = R1 ? lerp(0.3, 1, bk(sg(t, T.morph + 0.1, T.morph + 0.42))) : 1;
    mateG.visible = vis && (R2v || t >= T.morph + 0.1);
    mateG.position.copy(PM); mateG.scale.setScalar(KM * pop); mateG.rotation.set(0, 2.6 + (R1 ? (1 - sg(t, T.morph, T.morph + 0.5)) * -1.2 : 0), 0);
    // frío: en s02 desde "se enfría"; en s12 vuelve a calentar cuando ceba el termo
    const frio = R1 ? eio(sg(t, T.frio, T.frio + 0.5)) : 1 - eio(sg(t, T.ceba + 0.15, T.ceba + 0.6));
    if (yerbaG) yerbaG.material.color.copy(YERBA_V).lerp(YERBA_F, frio);
    calabazaG.material.color.copy(CALA_V).lerp(CALA_F, frio * 0.6);
    const kv = (R1 ? 1 - frio : 1 - frio) * (mateG.visible ? 1 : 0) * (R1 ? sg(t, T.morph + 0.2, T.morph + 0.5) : 1);
    vaporG.visible = kv > 0.01;
    const tope = KM * 0.15 * pop;
    vaporG.position.set(PM.x - 0.15, tope, PM.z);
    // s13: el vapor sube y llena el cuadro (transición al cierre verde)
    vaporG.scale.setScalar(1.0);
    vaporG.userData.poner(t, kv, R1 ? 1.1 : 0.7, R1 ? frio : 0); // ronda 2: en s12-s13 más bajo (no entra en las burbujas) // ronda 1: más bajo (no llega al subtítulo)
    // celular gigante del corte escondido (s02, 0,5 s): gira y se achica mientras crece el mate
    const fuera = sg(t, T.morph, T.morph + 0.14);
    celuG.visible = R1 && t < T.morph + 0.16;
    // ronda 2: se achica en su lugar, girando, y se apaga antes de que la bombilla llegue a su altura (sin mota)
    celuG.position.set(PM.x, 0.11 * KCG, PM.z); celuG.rotation.set(-0.28 * (1 - fuera), 0, 0); celuG.rotateY(fuera * Math.PI * 1.2);
    celuG.scale.setScalar(KCG * Math.max(0.001, 1 - eio(fuera)));
    if (fuera > 0.7) celuG.visible = false;
    if (celuG.visible) dibujarCelu("llama");
  }
  // ---- R2: el "?" (cae, rebota y en "Un estudio" gira y se achica: en su lugar nace el reloj de la primera hora) ----
  {
    const cae = sg(t, T.cae, T.cae + 0.3);
    const y = t < T.cae ? 9 : lerp(4.0, 0, cae * cae) + Math.abs(rebote(t, T.cae + 0.3, 7, 16, 0.35));
    // ronda 2: se achica de frente (sin girar: de canto se veían las capas) y desaparece antes de que nazca el reloj
    const sube = eio(sg(t, T.reloj1 - 0.3, T.reloj1 - 0.02)), pl = 1 - 0.75 * sube;
    preg.visible = R1 && t >= T.cae && sube < 0.98;
    preg.position.set(PQ.x, ALTO_Q / 2 * pl + Math.max(0, y) + 3.2 * sube, PQ.z); // ronda 2: sube y sale por arriba mientras nace el reloj (no se cruzan) preg.rotation.set(0, (1 - cae) * 0.6, 0); preg.scale.setScalar(Math.max(0.01, pl));
  }
  // ---- R5a: reloj de la primera hora, "1 h", cable, silla, tildes ----
  {
    const vis = R1 && t >= T.reloj1 - 0.12 && t < T.s07;
    const kk = popIn(t, T.reloj1 - 0.12, 0.35);
    reloj1.visible = vis; reloj1.position.copy(PR1); reloj1.scale.setScalar(Math.max(kk, 0.001));
    const { agH, agM, cuna } = reloj1.userData;
    // las agujas avanzan desde las 11:40 y quedan a las 12 en "llamar"
    const hh = lerp(11 + 40 / 60, 12, eio(sg(t, T.reloj1, T.doce + 0.3)));
    agH.rotation.z = -(hh / 12) * Math.PI * 2; agM.rotation.z = -hh * Math.PI * 2;
    const cu = eio(sg(t, T.cuna, T.cuna + 0.3));
    cuna.visible = cu > 0.01; cuna.scale.set(1, 1, Math.max(0.01, cu * 2.4)); cuna.position.z = 0.02 + cu * 0.05;
    const n1 = popIn(t, T.cuna + 0.08, 0.3) * (1 - sg(t, T.s05 + 0.25, T.s05 + 0.45));
    ocultar(num1h, vis && n1 > 0.15 ? n1 : 0); num1h.position.set(PR1.x + 0.3, RY - 0.34, PR1.z + 0.24);
    // cable y silla
    const vis2 = R1 && t > T.s05 - 0.4 && t < T.s07;
    // ronda 3: cuando el avión ya despegó, la silla se va (no queda cortada en la esquina)
    const sv = 1 - eio(sg(t, T.avion + 0.45, T.avion + 0.7));
    sillaD.visible = vis2 && sv > 0.02; sillaD.userData.giro.rotation.y = 0; sillaD.scale.setScalar(Math.max(sv, 0.001));
    const kc = sg(t, T.cable[0], T.cable[1]);
    cable.visible = vis2 && kc > 0;
    cable.geometry.setDrawRange(0, Math.floor(eo(kc) * cableGeo.index.count / 3) * 3);
    const kg = sg(t, T.cable[0] + 0.05, T.cable[0] + 0.4);
    cableGris.visible = vis2 && kg > 0; cableGris.geometry.setDrawRange(0, Math.floor(eo(kg) * cableGris.geometry.index.count / 3) * 3);
    tildesS.forEach((ti, i) => {
      const k2 = popIn(t, T.tildes[i], 0.28) * (1 - eio(sg(t, T.s06 - 0.25, T.s06 + 0.05)));
      const [dx, dy, dz] = TILDE_POS[i];
      ti.position.set(PS.x + dx, dy, PS.z + dz); ocultar(ti, vis2 && k2 > 0.3 ? k2 : 0);
    });
  }
  // ---- R3: avión, bandada, edificios, 2.241 ----
  {
    const vis = R1 && t >= T.avion && t < T.s07 + 0.4;
    const p = avionEn(t), A1 = AV_A1, u = sg(t, T.avion, T.bandada);
    avion.visible = vis && t < T.bandada + 0.05;
    avion.position.copy(p); avion.rotation.set(0.1 - 0.15 * Math.sin(Math.PI * u), Math.PI / 2 - 0.3, Math.sin(t * 6) * 0.12, "YXZ");
    avion.scale.setScalar(lerp(0.4, 1.15, bk(sg(t, T.avion, T.avion + 0.35))));
    // edificios: crecen del piso en ondas (ronda 1: escala 0 antes de brotar, sin sombras sueltas)
    edificios.visible = R1 && t > T.s06 - 0.1 && t < T.s07 - 0.03; // ronda 3: se van con el corte
    EDIF.forEach((e, i) => {
      const t0 = T.s06 + 0.05 + e.f * 0.7, s2 = bk(sg(t, t0, t0 + 0.3));
      const h = e.h * s2, on = s2 > 0.02 ? 1 : 0;
      _p.set(e.x, h / 2, e.z); _s.set(e.w * on, Math.max(0.0001, h), e.d * on); _q.identity(); _m4.compose(_p, _q, _s); edificios.setMatrixAt(i, _m4);
    });
    edificios.instanceMatrix.needsUpdate = true;
    bandada.forEach((b, i) => {
      const e = EDIF[(i * 7 + 3) % EDIF.length];
      const t0 = T.bandada + (i % 8) * 0.05, uu = sg(t, t0, t0 + 0.55);
      const q0 = A1, q1 = V(e.x, e.h + 0.05, e.z);
      const pp = q0.clone().lerp(q1, eio(uu)); pp.y += Math.sin(Math.PI * uu) * 0.35;
      b.visible = vis && t >= t0 && uu < 0.82; // ronda 2: se mete en el edificio antes de quedar como mota
      b.position.copy(pp);
      b.rotation.set(0.25 * uu, Math.atan2(q1.x - q0.x, q1.z - q0.z), 0, "YXZ"); b.scale.setScalar(lerp(1.1, 0.5, uu));
    });
    // ronda 1: el "2.241" se va antes del paneo a los buzones (no queda cortado en el borde)
    const kn = popIn(t, T.mil, 0.3), fade = 1 - sg(t, T.s07 - 0.3, T.s07 - 0.08); // ronda 2: sale con fundido (no se achica)
    mat2241.forEach((m) => (m.opacity = fade)); ocultar(num2241, R1 && fade > 0.02 ? kn : 0); num2241.position.set(PB.x, 2.1, PB.z - 0.3); num2241.rotation.set(-0.12, 0, 0);
  }
  // ---- R4: buzones ----
  {
    const vis = R1 && t > T.s07 - 0.6 && t < T.s08 + 0.4;
    buzones.forEach((b, i) => {
      const kk = popIn(t, T.s07 - 0.12 + i * 0.05, 0.3); // ronda 3: al corte ya están a medio crecer (sin cuadro vacío) // ronda 2: nacen cuando la cámara ya llegó (no entran cortados)
      // el cuarto (rojo) se achica girando y en su lugar nace el reloj de las 42 h; los otros se van antes
      const va = i === 3 ? 1 - eio(sg(t, T.reloj2 - 0.48, T.reloj2 - 0.28)) : 1 - eio(sg(t, T.s08 - 0.52, T.s08 - 0.3)); // ronda 3: se van antes de que nazca el reloj
      b.position.set(PZ.x + BZ_X[i] * KB, 0, PZ.z - (i === 3 ? 1.6 * (1 - va) : 0)); b.rotation.set(0, (i === 3 ? (1 - va) * 3 : 0), 0);
      const sc = kk * va * KB; ocultar(b, vis && sc > 0.45 * KB ? sc : 0);
      const { band, caja } = b.userData;
      const sube = i < 3 ? eio(sg(t, T.banderas[i], T.banderas[i] + 0.2)) : 0;
      band.rotation.z = lerp(Math.PI / 2, 0, sube);
      caja.position.y = 1.0 + rebote(t, T.banderas[i] ?? 99, 9, 30, 0.02);
      if (i === 3) { const kr = eio(sg(t, T.rojo, T.rojo + 0.25)); buzonM[3].color.setHex(C.navy3).lerp(new THREE.Color(C.red), kr); tapaM[3].color.setHex(C.cr).lerp(new THREE.Color(0xd98a80), kr); caja.position.y += rebote(t, T.rojo, 8, 32, 0.04); }
    });
    // sobres: entran por la ranura de cada buzón (ronda 1: vienen de más abajo, no cruzan el subtítulo)
    sobres.forEach((s2, i) => {
      const t0 = T.cartas[i], u = sg(t, t0, t0 + 0.35);
      const slot = V(PZ.x + BZ_X[i] * KB, 1.36 * KB, PZ.z + 0.38 * KB);
      const ini = V(PZ.x + BZ_X[i] * KB, 2.05, PZ.z + 1.9);
      const pp = ini.clone().lerp(slot, eio(u));
      const entra = i < 3 ? sg(t, t0 + 0.35, t0 + 0.55) : sg(t, t0 + 0.35, t0 + 0.5) * 0.45;
      pp.z -= entra * 0.2 * KB; pp.y -= entra * 0.06;
      s2.visible = vis && t >= t0 && (i === 3 ? t < T.reloj2 - 0.42 : entra < 0.98);
      s2.position.copy(pp); s2.rotation.set(-0.35 * (1 - u), -0.4 * (1 - u), -0.3 * (1 - u));
      s2.scale.setScalar(KB * (i < 3 ? 1 - 0.3 * entra : 1));
    });
    respuestas.forEach((r3, i) => {
      const kk = popIn(t, T.banderas[i] + 0.12, 0.3) * (1 - eio(sg(t, T.s08 - 0.52, T.s08 - 0.3))); // ronda 2: con su buzón
      r3.position.set(PZ.x + BZ_X[i] * KB, 2.25, PZ.z + 0.1); ocultar(r3, vis && kk > 0.5 ? kk : 0);
    });
    const tw = sg(t, T.contesto - 0.1, T.contesto + 0.5);
    telarana.visible = false; // ronda 2: sacada (se leía como astillas sueltas); queda el sobre asomando
    telarana.position.set(PZ.x + (BZ_X[3] - 0.22) * KB, 1.02 * KB, PZ.z + 0.36 * KB); telarana.rotation.set(0, 0, 0); telarana.scale.setScalar(KB);
    telarana.userData.crecer(tw);
  }
  // ---- R5b: reloj de las 42 h (sol y luna), "42 h" ----
  {
    const vis = R1 && t > T.reloj2 - 0.44 && t < T.s09;
    const kk = popIn(t, T.reloj2 - 0.43, 0.35); // ronda 3: nace apenas se va el buzón rojo (sin cuadro vacío)
    reloj2.visible = vis; reloj2.position.copy(PR2); reloj2.scale.setScalar(Math.max(kk, 0.001));
    reloj2.position.y += rebote(t, T.gira[1], 8, 40, 0.02);
    const g = eio(sg(t, T.gira[0], T.gira[1]));
    const hh = 10.2 + g * 42;
    reloj2.userData.agH.rotation.z = -(hh / 12) * Math.PI * 2; reloj2.userData.agM.rotation.z = -hh * Math.PI * 2;
    // sol y luna cruzan dos veces por arriba (ronda 1: arco más angosto, no se corta en el borde)
    const ciclo = sg(t, T.gira[0], T.gira[1]) * 1.75;
    const arco = (f) => { const a = Math.PI * (1 - f); return V(PR2.x + Math.cos(a) * 0.72, RY + RR + 0.25 + Math.sin(a) * 0.45, PR2.z - 0.1); }; // ronda 2: por arriba del aro, sin cortarse
    const fs = ciclo % 1, esSol = Math.floor(ciclo) % 2 === 0;
    sol3.visible = vis && ciclo > 0 && ciclo < 1.75 && esSol; luna3.visible = vis && ciclo > 0 && ciclo < 1.75 && !esSol;
    sol3.position.copy(arco(fs)); luna3.position.copy(arco(fs)); sol3.rotation.z = t * 2;
    const n42 = popIn(t, T.n42, 0.3);
    ocultar(num42, vis && n42 > 0.15 ? n42 : 0); num42.position.set(PR2.x, RY + RR + 0.45, PR2.z);
  }
  // ---- R7: ficha, campana, burbuja, termo, respuesta ----
  {
    const vis = R2v;
    ficha.visible = vis;
    ficha.position.copy(PK); ficha.rotation.set(0, 0.2 * (1 - eio(sg(t, T.s11 + 0.2, T.s11 + 0.9))), 0);
    if (vis) dibujarFicha(t >= T.fija ? 1 : 0, sg(t, T.fila1, T.fila1 + 0.3), sg(t, T.fila2, T.fila2 + 0.3), sg(t, T.fila3, T.fila3 + 0.3));
    const kcmp = popIn(t, T.fila2 + 0.08, 0.3);
    campana.visible = vis && kcmp > 0.01;
    campana.position.set(PK.x + 0.3, PK.y - 0.28, PK.z + 0.14); campana.scale.setScalar(Math.max(kcmp, 0.001) * 0.42);
    campana.rotation.set(0, 0, Math.sin((t - T.fila2) * 22) * 0.35 * Math.exp(-Math.max(0, t - T.fila2) * 2.5));
    // burbuja: ronda 1: aparece en su lugar (arriba del mate) con un pop, sin cruzar el borde
    // ronda 2: a la derecha de la punta de la bombilla y por arriba del vapor; la respuesta la reemplaza de golpe
    const ub = popIn(t, T.burbuja, 0.32);
    burbuja.visible = vis && t >= T.burbuja && t < T.resp + 0.05;
    burbuja.position.set(0.46, 2.15 + 0.04 * sg(t, T.burbuja, T.resp), 0.9); burbuja.scale.setScalar(Math.max(ub, 0.001) * 0.82); burbuja.rotation.set(0, 0.08, 0);
    // termo: entra desde la derecha, se inclina y ceba (pico sobre la boca del mate) y se va por la derecha
    const entra = eio(sg(t, T.termo, T.termo + 0.4)), sale = eio(sg(t, T.s13 + 0.05, T.s13 + 0.45));
    const inc = eio(sg(t, T.ceba - 0.25, T.ceba + 0.15)) * (1 - eio(sg(t, T.s13 - 0.15, T.s13 + 0.15)));
    termoG.visible = vis && t >= T.termo && sale < 0.99;
    termoG.position.set(lerp(1.0, 1.03, inc) + 1.2 * (1 - entra) + 1.4 * sale, lerp(0, 0.58, inc), PM.z + 0.12); termoG.rotation.set(0, 0, inc * 0.9); termoG.scale.setScalar(KT);
    termoG.updateMatrixWorld(true);
    const pico = V(0, 0.375, 0).applyMatrix4(termoG.matrixWorld), boca = V(PM.x + 0.05, KM * 0.142, PM.z + 0.05);
    const kch = vis && inc > 0.85 ? sg(t, T.ceba + 0.1, T.ceba + 0.25) * (1 - sg(t, T.s13 - 0.2, T.s13 - 0.05)) : 0;
    chorro.visible = kch > 0.01;
    if (chorro.visible) { const d = boca.clone().sub(pico), L = d.length(); chorro.position.copy(pico).addScaledVector(d, 0.5); chorro.quaternion.setFromUnitVectors(_up, d.normalize()); chorro.scale.set(kch, L, kch); }
    // respuesta de Graciela (a la derecha, cuando el termo ya se fue)
    const kr = popIn(t, T.resp, 0.3);
    respG.visible = vis && t >= T.resp; respG.position.set(0.43, 2.2, 0.95); respG.scale.setScalar(Math.max(kr, 0.001) * 0.84); respG.rotation.set(0, -0.1, 0);
  }
}

// ================= ZONA F en el tiempo =================
function zonaF(t) {
  const en = plano === "F";
  mateF.visible = vaporF.visible = pisoF.visible = en;
  if (!en) return;
  const kk = lerp(0.5, 1, bk(sg(t, T.fin - 0.02, T.fin + 0.35)));
  mateF.position.set(OF.x, 0, 0); mateF.rotation.set(0, 0.6 + Math.sin((t - T.fin) * 1.2) * 0.12, 0); mateF.scale.setScalar(5.2 * kk);
  vaporF.position.set(OF.x - 0.05, 5.2 * 0.15 * kk, 0); vaporF.userData.poner(t, 1, 1.05);
}

// ================= ESCENA EN EL TIEMPO =================
const fogR = new THREE.Fog(0x16243d, 9, 15);
let _armado = false;
function renderAt(t) {
  if (!_armado) { _armado = true; PLANOS = armarPlanos(); }
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  let foco = V(0, 0.5, 0), rad = 2.2;
  if (plano[0] === "O") { foco = V(OO.x, 1.0, 0.2); rad = 2.6; }
  else if (enR()) { foco = V(_mira.x, 0.5, _mira.z); rad = 3.6; }
  else if (plano === "F") { foco = OF.clone().add(V(0, 0.6, 0)); rad = 1.6; }
  sol.position.copy(foco).add(V(-2.2, 7, 5)); sol.target.position.copy(foco);
  Object.assign(sol.shadow.camera, { left: -rad, right: rad, top: rad, bottom: -rad, near: 0.5, far: 60 }); sol.shadow.camera.updateProjectionMatrix();
  scene.fog = enR() ? fogR : null; // ronda 2: el piso lejano se funde con el fondo (sin píldoras sueltas en el horizonte)
  zonaO(t);
  zonaR(t);
  zonaF(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e2) => renderAt(e2.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
