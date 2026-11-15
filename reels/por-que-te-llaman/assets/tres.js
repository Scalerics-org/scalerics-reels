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
  s04: S["s04-estudio"], estudio: W[19], escribio: W[21], dos: W[25], mil: W[26], empresas: W[27],
  s05: S["s05-nunca"], una: W[29], cuatro: W[32], nunca: W[33], contesto: W[34],
  s06: S["s06-dos-dias"], tardaron: W[37], promedio: W[39], casi: W[40], dias: W[42],
  s07: S["s07-primera-hora"], primera: W[46], hora: W[47],
  s08: S["s08-el-que-decide"], chances: W[50], llegar: W[52], decide: W[55],
  s09: S["s09-ruben-compro"], compre: W[58], primero: W[62],
  s10: S["s10-ruben-ayer"], consulta10: W[65], ayer: W[67],
  s11: S["s11-crm"], anota: W[70], avisa: W[75], instante: W[77],
  s12: S["s12-escribe-solo"], enfria12: W[82], escribe: W[84], solo: W[85],
  s13: S["s13-llegar"], primero13: W[88], agenda: W[89],
  fin: S["s14-cierre"],
};
T.click = 0.42;                     // Rubén hace clic en "Enviar"
T.vibra = W[7] - 0.12;              // el celular vibra ("llaman")
T.llamada = T.vibra;                // pantalla "Llamada entrante"
T.morph = T.s02 + 0.08;             // el celular gigante se vuelve el mate
T.frio = T.enfria;                  // el vapor se corta, la yerba se pone gris
T.cae = T.s03 - 0.3;               // el "?" cae
T.pliega = T.s04 - 0.02;            // el "?" se pliega en avión
T.bandada = T.dos;                  // el avión se multiplica
T.cartas = [T.s05 + 0.05, T.s05 + 0.17, T.s05 + 0.29, T.s05 + 0.41]; // un sobre a cada buzón
T.banderas = [T.una + 0.05, T.una + 0.2, T.una + 0.35];              // tres contestan
T.rojo = T.nunca;                   // el cuarto se pone rojo
T.reloj = T.s06 - 0.15;             // el reloj de pie entra
T.gira = [T.tardaron - 0.1, T.casi - 0.15]; // las agujas dan casi dos días
T.n42 = T.casi;                     // "42 h"
T.doce = T.s07 - 0.05;              // vuelve a las 12
T.cuna = T.primera;                 // la primera hora se pinta de verde
T.cable = [T.s08 + 0.02, T.s08 + 1.05]; // el cable sale hasta la silla
T.tildes = [T.chances, T.chances + 0.18, T.chances + 0.32, T.chances + 0.44, T.chances + 0.54, T.chances + 0.62, T.chances + 0.7];
T.corta = T.s09 + 0.35;             // Rubén corta la llamada
T.mira = T.s10 + 0.05;              // Rubén mira por encima del hombro la pantalla de atrás
T.zambulle = T.s11 - 0.42;          // push-in a la pantalla (corte escondido a la ficha)
T.fila1 = T.anota; T.fila2 = T.avisa;
T.termo = T.s12 + 0.1; T.burbuja = T.escribe - 0.05; T.ceba = T.escribe + 0.05;
T.resp = T.s13 + 0.5;               // la respuesta de Graciela
T.fija = T.s11 + 0.3;               // la consulta queda anotada (de roja a navy)
T.insert = T.ayer - 0.08;           // inserto de la pantalla (la fila roja)

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
    fila(178, "Almacén Sur · pedido", "hoy 9:12 · respondido", false);
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
  oficina.add(mesh(rbox(0.52, 0.025, 0.17, 0.008), [M.navy2, M.navy2, matTex(tecl, 0.1), M.navy2, M.navy2, M.navy2], MON.x + 0.08, ESC.y + 0.013, ESC.z - 0.18));
  oficina.add(mesh(rbox(0.06, 0.025, 0.1, 0.02), M.navy2, MON.x - 0.36, ESC.y + 0.013, ESC.z - 0.18));
  // carpeta verde
  const carp = mesh(rbox(0.3, 0.03, 0.38, 0.005), M.g, MON.x + 0.62, ESC.y + 0.015, ESC.z + 0.12); carp.rotation.y = 0.15; oficina.add(carp);
  const hoja = mesh(new THREE.PlaneGeometry(0.26, 0.34), M.white, MON.x + 0.62, ESC.y + 0.032, ESC.z + 0.12); hoja.rotation.set(-Math.PI / 2, 0, 0.15); oficina.add(hoja);
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
const MATE_ESC = V(OO.x + 0.6, ESC.y, ESC.z - 0.12);
const termo = crearTermo(); scene.add(termo); termo.scale.setScalar(1.15); termo.position.set(OO.x + 0.78, ESC.y, ESC.z + 0.18);
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
const CELU_ATRIL = V(OO.x - 0.6, ESC.y + 0.098, ESC.z - 0.1);
const KCEL = 1.25; // el celular del atril, un poco más grande que el de mano
const RUB = V(OO.x + 0.02, 0, -0.12); // centro de la silla
const GIRA_CAB = -0.85, OJO_X = -0.9; // s10: mira por encima del hombro izquierdo la pantalla de atrás
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
{
  const hub = mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.02, 40), new THREE.MeshBasicMaterial({ color: C.cr, toneMapped: false }), CC.x, 0.01, CC.z); reloj.add(hub);
  const hub2 = mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.024, 40), new THREE.MeshBasicMaterial({ color: C.g, toneMapped: false }), CC.x, 0.012, CC.z); reloj.add(hub2);
}
const pisoR = pisoSombra(CC.x, CC.z, 2 * RC + 2, 2 * RC + 2, 0.34, 0.014);

// ---------- R1: el mate gigante (con la placa colgante) y su vapor verde ----------
const PM = V(0, 0, 0);
const KM = 6.2; // escala del mate gigante
const mateG = crearMate(); scene.add(mateG); mateG.scale.setScalar(KM);
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

// ---------- R2: el "?" verde ----------
const PQ = V(2.1, 0, -0.7);
const pregM = [mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.16 }), mat(C.gd, 0.5)];
const preg = new THREE.Mesh(textoGeo("?", 1.5, 0.42), pregM); preg.castShadow = true; scene.add(preg);
preg.geometry.computeBoundingBox();
const ALTO_Q = preg.geometry.boundingBox.max.y - preg.geometry.boundingBox.min.y;

// ---------- R3: el avión de papel, la bandada y las empresas ----------
const texAla = tex(512, 512, (x, w, h) => {
  x.fillStyle = "#f6f4ec"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "rgba(22,36,61,0.25)"; x.lineWidth = 6; x.beginPath(); x.moveTo(0, h / 2); x.lineTo(w, h / 2); x.stroke();
});
function hacerAvion() {
  // dardo clásico: nariz en +z; dos alas planas en V abierta y la quilla
  const g = new THREE.Group();
  const m = new THREE.MeshStandardMaterial({ color: 0xf6f4ec, roughness: 0.7, side: THREE.DoubleSide, map: texAla });
  const tri = (a, b, c) => { const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute([...a, ...b, ...c], 3)); geo.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 0.5, 1], 2)); geo.computeVertexNormals(); return new THREE.Mesh(geo, m); };
  g.add(tri([0, 0, 0.5], [-0.42, 0.06, -0.5], [0, 0, -0.42]));
  g.add(tri([0, 0, 0.5], [0, 0, -0.42], [0.42, 0.06, -0.5]));
  g.add(tri([0, 0, 0.5], [0, 0, -0.42], [0, -0.14, -0.4]));
  // el sobre dibujado (verde) sobre el ala derecha
  const sob = new THREE.Group(); sob.position.set(0.14, 0.035, -0.18); sob.rotation.set(-Math.PI / 2 + 0.0, 0, 0.12); g.add(sob);
  sob.add(new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.11), mat(C.g, 0.5, { side: THREE.DoubleSide, emissive: C.g, emissiveIntensity: 0.12 })));
  const v = new THREE.Shape(); v.moveTo(-0.08, 0.055); v.lineTo(0, -0.005); v.lineTo(0.08, 0.055); v.lineTo(0.07, 0.055); v.lineTo(0, 0.008); v.lineTo(-0.07, 0.055); v.closePath();
  const vm = new THREE.Mesh(new THREE.ShapeGeometry(v), mat(C.navy, 0.5, { side: THREE.DoubleSide })); vm.position.z = 0.002; sob.add(vm);
  return sh(g);
}
const avion = hacerAvion(); scene.add(avion);
const bandada = Array.from({ length: 16 }, () => { const a = hacerAvion(); scene.add(a); return a; });
// las empresas: un campo de edificios chicos (instanciados), con ventanas crema
const PB = V(5.4, 0, -2.2);
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
const edifGeo = new THREE.BoxGeometry(1, 1, 1);
const edificios = new THREE.InstancedMesh(edifGeo, [edifM, edifM, edifTecho, edifTecho, edifM, edifM], EDIF.length);
edificios.castShadow = true; edificios.receiveShadow = true; scene.add(edificios);
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3();
// el "2.241" arriba
const num2241 = new THREE.Mesh(textoGeo("2.241", 0.44, 0.14), [mat(C.cr, 0.4, { emissive: 0xf3dfb8, emissiveIntensity: 0.12 }), mat(C.navy, 0.5)]);
num2241.castShadow = true; scene.add(num2241);

// ---------- R4: los cuatro buzones ----------
const PZ = V(10.6, 0, -0.2);
const BZ_X = [-0.84, -0.28, 0.28, 0.84];
const buzonM = [0, 1, 2, 3].map(() => mat(C.navy3, 0.45));
const tapaM = [0, 1, 2, 3].map(() => mat(C.cr, 0.6));
function hacerBuzon(i) {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.12, 1.0, 0.12, 0.03), M.navy, 0, 0.5, 0));
  g.add(mesh(rbox(0.36, 0.05, 0.36, 0.02), M.navy, 0, 0.025, 0));
  const caja = new THREE.Group(); caja.position.y = 1.0; g.add(caja);
  caja.add(mesh(rbox(0.46, 0.3, 0.66, 0.03), buzonM[i], 0, 0.15, 0));
  const techo = mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.66, 28, 1, false, -Math.PI / 2, Math.PI), buzonM[i], 0, 0.3, 0); techo.rotation.x = Math.PI / 2; techo.rotation.z = 0; caja.add(techo);
  // la tapa del frente (crema) con la ranura navy
  const tapa = new THREE.Group(); tapa.position.set(0, 0.0, 0.335); caja.add(tapa);
  const tapaF = new THREE.Shape(); tapaF.moveTo(-0.23, 0); tapaF.lineTo(0.23, 0); tapaF.lineTo(0.23, 0.3); tapaF.absarc(0, 0.3, 0.23, 0, Math.PI, false); tapaF.lineTo(-0.23, 0);
  tapa.add(new THREE.Mesh(new THREE.ExtrudeGeometry(tapaF, { depth: 0.025, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 1 }), tapaM[i]));
  tapa.add(mesh(rbox(0.26, 0.04, 0.02, 0.01), M.navy, 0, 0.36, 0.03));
  tapa.add(mesh(rbox(0.08, 0.05, 0.03, 0.01), M.navy, 0, 0.12, 0.035));
  // banderita al costado (+x): baja (navy) / alta (verde)
  const band = new THREE.Group(); band.position.set(0.245, 0.22, -0.05); caja.add(band);
  band.add(mesh(rbox(0.02, 0.4, 0.03, 0.008), M.navy, 0, 0.17, 0));
  const pan = mesh(rbox(0.02, 0.14, 0.18, 0.01), M.g, 0, 0.3, 0.08); band.add(pan);
  g.userData = { caja, band, tapa, pan };
  return sh(g);
}
const buzones = [0, 1, 2, 3].map((i) => { const b = hacerBuzon(i); scene.add(b); return b; });
const sobreTex = tex(256, 180, (x, w, h) => { x.fillStyle = "#f6f4ec"; x.fillRect(0, 0, w, h); x.strokeStyle = NAV; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10); x.beginPath(); x.moveTo(8, 8); x.lineTo(w / 2, h * 0.6); x.lineTo(w - 8, 8); x.stroke(); });
function hacerSobre() { const g = new THREE.Group(); g.add(mesh(rbox(0.3, 0.2, 0.012, 0.004), [M.cr, M.cr, M.cr, M.cr, new THREE.MeshStandardMaterial({ map: sobreTex, roughness: 0.7 }), M.cr])); return sh(g); }
const sobres = [0, 1, 2, 3].map(() => { const s = hacerSobre(); scene.add(s); return s; });
const respuestas = [0, 1, 2].map(() => hacerTilde(0.15));
const telarana = crearTelarana(0.2, 0.006, 7); scene.add(telarana);

// ---------- R5: el reloj de pie (sol y luna arriba), la porción de la primera hora ----------
const PR = V(10.6 + 0.84, 0, -0.4); // el reloj de pie nace donde estaba el buzón rojo
const RR = 1.0, RY = 1.42; // radio y alto del centro
const relojP = new THREE.Group(); scene.add(relojP);
const esfP = tex(1024, 1024, (x, w) => {
  x.fillStyle = "#f4f2e8"; x.beginPath(); x.arc(w / 2, w / 2, w / 2, 0, 7); x.fill();
  x.fillStyle = NAV0;
  for (let h = 0; h < 12; h++) { const a = (h / 12) * Math.PI * 2; x.save(); x.translate(w / 2 + Math.sin(a) * 420, w / 2 - Math.cos(a) * 420); x.rotate(a); rr(x, h % 3 ? -11 : -18, -40, h % 3 ? 22 : 36, h % 3 ? 62 : 80, 8); x.restore(); }
  x.font = F(800, 92); x.textAlign = "center"; x.textBaseline = "middle";
  for (const [n, a] of [[12, 0], [3, 0.25], [6, 0.5], [9, 0.75]]) x.fillText(String(n), w / 2 + Math.sin(a * Math.PI * 2) * 300, w / 2 - Math.cos(a * Math.PI * 2) * 300 + 6);
});
let agHP, agMP, cuna, relojCara;
{
  const g = relojP;
  g.add(mesh(new THREE.TorusGeometry(RR, 0.1, 16, 64), M.navy, 0, RY, 0));
  g.add(mesh(new THREE.CylinderGeometry(RR, RR, 0.14, 64).rotateX(Math.PI / 2), M.navy3, 0, RY, -0.06));
  relojCara = mesh(new THREE.CircleGeometry(RR * 0.97, 64), new THREE.MeshStandardMaterial({ map: esfP, roughness: 0.6, emissive: 0xffffff, emissiveMap: esfP, emissiveIntensity: 0.12 }), 0, RY, 0.015); g.add(relojCara);
  // patas
  for (const s of [-1, 1]) { const p = tubo(V(s * 0.45, RY - 0.8, -0.05), V(s * 0.75, 0.0, -0.05), 0.05, M.navy); g.add(p); g.add(mesh(rbox(0.3, 0.05, 0.3, 0.02), M.navy, s * 0.75, 0.025, -0.05)); }
  // la porción de la primera hora (de 12 a 1): un quesito verde que sale hacia la cámara
  const f = new THREE.Shape(); f.moveTo(0, 0); f.absarc(0, 0, RR * 0.9, Math.PI / 2, Math.PI / 2 - Math.PI / 6, true); f.lineTo(0, 0);
  cuna = new THREE.Mesh(new THREE.ExtrudeGeometry(f, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2, curveSegments: 24 }), [mat(C.g, 0.42, { emissive: C.g, emissiveIntensity: 0.18 }), mat(C.gd, 0.5)]);
  cuna.position.set(0, RY, 0.02); g.add(cuna);
  const ag = (L, A, m, z) => { const p = new THREE.Group(); p.position.set(0, RY, z); const b = mesh(rbox(A, L, 0.03, A / 2 - 0.002, 2), m); b.position.y = L / 2 - 0.08; p.add(b); g.add(p); return p; };
  agHP = ag(RR * 0.52, 0.09, M.navy, 0.06); agMP = ag(RR * 0.78, 0.06, M.navy, 0.09);
  g.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 20).rotateX(Math.PI / 2), M.g, 0, RY, 0.12));
  sh(g);
}
const solM = mat(0xf5d76e, 0.4, { emissive: 0xf5c84a, emissiveIntensity: 0.5 });
const sol3 = new THREE.Group(); scene.add(sol3);
{ sol3.add(mesh(new THREE.SphereGeometry(0.2, 24, 16), solM)); for (let i = 0; i < 8; i++) { const r = mesh(rbox(0.05, 0.14, 0.04, 0.02), solM); const a = (i / 8) * Math.PI * 2; r.position.set(Math.sin(a) * 0.3, Math.cos(a) * 0.3, 0); r.rotation.z = -a; sol3.add(r); } }
const luna3 = new THREE.Group(); scene.add(luna3);
{ const s = new THREE.Shape(); s.absarc(0, 0, 0.22, Math.PI * 0.35, Math.PI * 1.65, false); s.absarc(0.1, 0, 0.17, Math.PI * 1.55, Math.PI * 0.45, true); luna3.add(new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 2 }), mat(C.cr, 0.5, { emissive: C.cr, emissiveIntensity: 0.25 }))); }
const num42 = new THREE.Mesh(textoGeo("42 h", 0.5, 0.15), [mat(C.cr, 0.4, { emissive: 0xf3dfb8, emissiveIntensity: 0.12 }), mat(C.navy, 0.5)]); num42.castShadow = true; scene.add(num42);
const num1h = new THREE.Mesh(textoGeo("1 h", 0.3, 0.1), [mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.18 }), mat(C.navy, 0.5)]); num1h.castShadow = true; scene.add(num1h);

// ---------- R6: el cable enrulado hasta la silla del que decide ----------
const PS = V(PR.x + 2.0, 0, -0.1);
const sillaD = hacerSilla(); scene.add(sillaD); sillaD.position.copy(PS);
// recorrido del cable: sale de la porción verde, baja por la pata y va por el piso hasta la silla
const CAM_CABLE = new THREE.CatmullRomCurve3([
  V(PR.x + 0.25, RY + 0.55, 0.2 + PR.z), V(PR.x + 0.9, RY + 0.2, 0.45 + PR.z), V(PR.x + 1.25, 0.5, 0.5 + PR.z), V(PR.x + 1.5, 0.05, 0.5 + PR.z),
  V(PR.x + 2.2, 0.05, 0.45 + PR.z), V(PS.x - 0.55, 0.05, PS.z + 0.35), V(PS.x - 0.32, 0.38, PS.z + 0.12),
]);
// enrulado: hélice alrededor del recorrido
function curvaRulo(base, vueltas, r) {
  const pts = [], N = 900;
  const fr = base.computeFrenetFrames(N, false);
  for (let i = 0; i <= N; i++) {
    const u = i / N, p = base.getPointAt(u), a = u * vueltas * Math.PI * 2;
    pts.push(p.clone().addScaledVector(fr.normals[i], Math.cos(a) * r).addScaledVector(fr.binormals[i], Math.sin(a) * r));
  }
  return new THREE.CatmullRomCurve3(pts);
}
const cableGeo = new THREE.TubeGeometry(curvaRulo(CAM_CABLE, 70, 0.045), 2400, 0.018, 8, false);
const cable = new THREE.Mesh(cableGeo, mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.15 })); cable.castShadow = true; scene.add(cable);
// el cable gris que sale "una hora después": corto y flojo, se cae
const CAM_GRIS = new THREE.CatmullRomCurve3([V(PR.x + 0.62, RY - 0.1, 0.18 + PR.z), V(PR.x + 0.98, RY - 0.45, 0.45 + PR.z), V(PR.x + 1.1, 0.35, 0.85 + PR.z), V(PR.x + 1.2, 0.04, 1.15 + PR.z), V(PR.x + 1.45, 0.04, 1.25 + PR.z)]);
const cableGris = new THREE.Mesh(new THREE.TubeGeometry(curvaRulo(CAM_GRIS, 24, 0.04), 900, 0.016, 8, false), mat(0x8a93a6, 0.6)); cableGris.castShadow = true; scene.add(cableGris);
const tildesS = T.tildes.map(() => hacerTilde(0.13));
const TILDE_POS = [[0.0, 1.5, 0.3], [-0.52, 1.12, 0.3], [0.54, 1.14, 0.3], [-0.56, 0.7, 0.45], [0.58, 0.72, 0.4], [-0.36, 1.44, 0.35], [0.38, 1.46, 0.35]];

// ---------- R7: la ficha del CRM, la burbuja, el termo que ceba, la respuesta ----------
const PK = V(-2.7, 1.3, 0.4);
const FW = 1.3, FH = 1.62;
const FP = [820, 1022];
const fichaTV = texViva(...FP);
// la ficha del CRM (vertical): arriba la consulta de Graciela (roja como en la bandeja de Rubén; al anotarla, navy),
// abajo "Anotado ✓" y "Aviso a Nico ✓ 18:41"
function dibujarFicha(u0, u1, u2) {
  const clave = [u0, u1, u2].map((v) => v.toFixed(2)).join(",");
  if (fichaTV.clave === clave) return; fichaTV.clave = clave;
  const x = fichaTV.x, [w, h] = FP;
  x.fillStyle = "#f4f2e8"; x.fillRect(0, 0, w, h);
  x.textBaseline = "middle"; x.textAlign = "left";
  // la consulta
  const roja = u0 < 0.5;
  x.fillStyle = roja ? ROJ : NAV0; rr(x, 30, 30, w - 60, 230, 30);
  x.fillStyle = CRE; ajustar(x, "Graciela · Rotisería", 800, 64, w - 120); x.fillText("Graciela · Rotisería", 60, 105);
  const l2 = roja ? "Presupuesto · ayer 18:40" : "Pedido de presupuesto · 18:40";
  x.fillStyle = roja ? CRE : VER; ajustar(x, l2, 700, 48, w - 120); x.fillText(l2, 60, 196);
  const fila = (y, alto, l1, l2b, u) => {
    if (u <= 0.001) return;
    x.save(); x.globalAlpha = cl(u * 1.6); const s2 = lerp(0.85, 1, bk(u)); x.translate(w / 2, y + alto / 2); x.scale(s2, s2); x.translate(-w / 2, -(y + alto / 2));
    x.fillStyle = VER; rr(x, 30, y, w - 60, alto, 34);
    x.fillStyle = NAV0; ajustar(x, l1, 800, 74, w - 260); x.fillText(l1, 64, l2b ? y + alto / 2 - 40 : y + alto / 2 + 4);
    if (l2b) { x.font = F(800, 62); x.fillText(l2b, 64, y + alto / 2 + 46); }
    x.fillStyle = NAV0; x.beginPath(); x.arc(w - 110, y + alto / 2, 58, 0, 7); x.fill();
    x.strokeStyle = VER; x.lineWidth = 17; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(w - 140, y + alto / 2 + 2); x.lineTo(w - 117, y + alto / 2 + 26); x.lineTo(w - 78, y + alto / 2 - 24); x.stroke();
    x.restore();
  };
  fila(300, 190, "Anotado", null, u1);
  fila(530, 250, "Aviso a Nico", "18:41", u2);
  if (!roja) { x.fillStyle = "rgba(22,36,61,0.75)"; x.font = F(700, 46); x.textAlign = "center"; x.fillText("Seguimiento: automático", w / 2, 955); }
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
const burbuja = hacerBurbuja(["Graciela, ¿pudiste", "ver el presupuesto?"], "#ffffff", NAV0, true, 1.55, 0.66, false, 100);
scene.add(burbuja);
const respG = hacerBurbuja(["¡Sí! Mandame", "40 cajas."], VER, NAV0, false, 1.25, 0.62, true, 130);
scene.add(respG);
const termoG = crearTermo(); scene.add(termoG); const KT = KM * 0.75; termoG.scale.setScalar(KT); sh(termoG);
const chorro = mesh(new THREE.CylinderGeometry(0.05, 0.04, 1, 12), new THREE.MeshStandardMaterial({ color: 0xdfeef5, roughness: 0.2, transparent: true, opacity: 0.85, emissive: 0xffffff, emissiveIntensity: 0.15 })); scene.add(chorro);

// ================= ZONA F: el cierre verde (un mate chico humeando) =================
const mateF = crearMate(); scene.add(mateF); mateF.scale.setScalar(5.2); sh(mateF);
const vaporF = hacerVapor(3, 0.75);
const pisoF = pisoSombra(OF.x, 0, 8, 8, 0.22);

// ================= CÁMARA (Catmull-Rom por claves, con tiempo no uniforme; entre planos, corte) =================
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const o = (x, y, z) => [OO.x + x, y, z];
const r = (x, y, z) => [x, y, z];
let PLANOS = null;
// el corte escondido s01 → s02: el celular del atril (mirando a -z) y el gigante (mirando a +z), mismo encuadre relativo
const CAM_CEL = V(0.03, 0.03, -0.46); // cámara final de O1 relativa al celular del atril (en metros reales)
function armarPlanos() {
  const cel = CELU_ATRIL;
  const finO1 = [cel.x + CAM_CEL.x, cel.y + CAM_CEL.y, cel.z + CAM_CEL.z], miraO1 = [cel.x, cel.y + 0.035, cel.z];
  const escG = KCG / KCEL;
  const yG = 0.11 * KCG; // centro del celular gigante
  const iniR = [PM.x - CAM_CEL.x * escG, yG + CAM_CEL.y * escG, PM.z - CAM_CEL.z * escG], miraR = [PM.x, yG + 0.035 * escG, PM.z];
  return [
    // s01: por encima del hombro derecho de Rubén: el formulario, el clic, el celular que vibra; push-in al celular
    ["O1", 0, [
      k(0, o(-0.62, 2.5, -2.15), o(-0.22, 1.08, MON.z), 32),
      k(T.vibra - 0.1, o(-0.66, 2.38, -1.85), o(-0.3, 1.04, MON.z), 32),
      k(T.s02 - 0.05, finO1, miraO1),
    ]],
    // s02-s08: el reloj-piso, una sola curva
    ["R", T.s02, [
      k(T.s02, iniR, miraR),
      k(T.morph + 0.45, r(PM.x + 0.2, 1.7, 6.2), r(PM.x, 1.15, 0)),
      k(T.rapido, r(PM.x + 0.1, 1.45, 5.6), r(PM.x, 1.15, 0)),
      k(T.s03 - 0.22, r(PM.x + 0.15, 1.5, 5.5), r(PM.x + 0.05, 1.15, 0)),
      k(T.s03 + 0.1, r(PQ.x - 0.5, 2.2, 5.6), r(PQ.x - 0.25, 1.3, PQ.z)),
      k(T.s03 + 0.6, r(PQ.x, 2.5, PQ.z + 5.0), r(PQ.x, 1.05, PQ.z)),
      k(T.s04 + 0.25, r(2.6, 2.3, 4.6), r(3.3, 1.3, -0.6)),
      k(T.escribio + 0.1, r(4.5, 2.6, 4.0), r(4.8, 1.7, -0.76)),
      k(T.empresas + 0.2, r(PB.x, 3.0, PB.z + 6.6), r(PB.x, 1.3, PB.z)),
      k(T.s05 - 0.2, r(PB.x + 0.1, 3.0, PB.z + 6.5), r(PB.x + 0.1, 1.3, PB.z)),
      k(T.s05 + 0.15, r(PZ.x, 1.95, PZ.z + 7.3), r(PZ.x, 1.25, PZ.z)),
      k(T.cuatro, r(PZ.x + 0.1, 1.9, PZ.z + 7.0), r(PZ.x + 0.1, 1.25, PZ.z)),
      k(T.contesto, r(PZ.x + 0.75, 1.65, PZ.z + 4.4), r(PZ.x + 0.68, 1.2, PZ.z)),
      k(T.s06 - 0.05, r(PR.x, 2.0, PR.z + 5.6), r(PR.x, 1.55, PR.z)),
      k(T.s06 + 0.45, r(PR.x, 2.2, PR.z + 6.2), r(PR.x, 2.0, PR.z)),
      k(T.casi, r(PR.x, 2.2, PR.z + 6.0), r(PR.x, 2.0, PR.z)),
      k(T.s07 - 0.1, r(PR.x, 2.18, PR.z + 5.9), r(PR.x, 1.98, PR.z)),
      k(T.s07 + 0.1, r(PR.x, 2.0, PR.z + 5.4), r(PR.x, 1.75, PR.z)),
      k(T.hora, r(PR.x + 0.12, 1.85, PR.z + 4.2), r(PR.x + 0.12, 1.6, PR.z)),
      k(T.s08 + 0.3, r(PR.x + 1.05, 2.3, PR.z + 6.4), r(PR.x + 1.05, 0.85, PR.z + 0.2)),
      k(T.chances, r(PS.x - 0.5, 1.6, PS.z + 4.6), r(PS.x - 0.3, 1.1, PS.z)),
      k(T.decide, r(PS.x - 0.05, 1.45, PS.z + 4.2), r(PS.x, 1.1, PS.z)),
      k(T.s09, r(PS.x, 1.35, PS.z + 3.0), r(PS.x, 1.0, PS.z)),
    ]],
    // s09: corte en la silla: Rubén sentado de frente (giró la silla hacia la cámara, a -z), plano medio
    ["O2", T.s09, [
      k(T.s09, [RUB.x, 1.35, RUB.z - 3.0], [RUB.x, 1.0, RUB.z]),
      k(T.s09 + 0.6, [RUB.x - 0.03, 1.42, RUB.z - 2.75], [RUB.x, 1.08, RUB.z]),
      k(T.s10 - 0.05, [RUB.x - 0.05, 1.44, RUB.z - 2.6], [RUB.x, 1.1, RUB.z]),
      // s10: gira la silla al monitor; la cámara rodea por su derecha (lejos de la cabeza) y queda de 3/4
      k(T.insert, [RUB.x + 0.6, 1.42, RUB.z - 2.75], [RUB.x + 0.2, 1.15, RUB.z + 0.4]),
    ]],
    // inserto: la pantalla de frente, la fila roja; push-in (corte escondido a la ficha del CRM)
    ["O3", T.insert, [
      k(T.insert, o(0.2, MON.y - 0.06, MON.z - 0.72), o(0.2, MON.y - 0.065, MON.z), 58),
      k(T.s11, o(0.21, MON.y - 0.065, MON.z - 0.56), o(0.21, MON.y - 0.065, MON.z), 58),
    ]],
    // s11-s13: la ficha del CRM (de la fila roja a la ficha entera), el mate y el termo
    ["R2", T.s11, [
      k(T.s11, r(PK.x - 0.1, PK.y + 0.6, PK.z + 1.55), r(PK.x - 0.1, PK.y + 0.6, PK.z)),
      k(T.s11 + 0.75, r(PK.x, PK.y + 0.12, PK.z + 4.5), r(PK.x, PK.y + 0.05, PK.z)),
      k(T.instante + 0.25, r(PK.x, PK.y + 0.12, PK.z + 4.3), r(PK.x, PK.y + 0.05, PK.z)),
      k(T.s12 - 0.12, r(PK.x + 0.05, PK.y + 0.12, PK.z + 4.3), r(PK.x + 0.05, PK.y + 0.05, PK.z)),
      k(T.s12 + 0.38, r(0.1, 2.45, 6.4), r(0.1, 1.62, 0)),
      k(T.solo + 0.3, r(0.1, 2.42, 6.1), r(0.1, 1.64, 0)),
      k(T.fin, r(0.1, 2.42, 6.0), r(0.1, 1.66, 0)),
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
  if (plano === "R" && t > T.pliega - 0.2 && t < T.bandada + 0.4) {
    const wv = eio(sg(t, T.pliega - 0.2, T.pliega + 0.15)) * (1 - eio(sg(t, T.bandada - 0.1, T.bandada + 0.4)));
    _mira.lerp(avionEn(t).add(V(0.35, -0.15, 0)), wv * 0.85);
  }
  // portada (LIMPIO=1 node armar.mjs): en s01, el celular sonando más chico y arriba (el título va abajo)
  if (window.__portada && plano === "O1") { camera.position.copy(CELU_ATRIL).add(V(0.05, 0.1, -0.85)); camera.fov = 34; camera.updateProjectionMatrix(); _mira.copy(CELU_ATRIL).add(V(0, -0.085, 0)); }
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
  else dibujarMonitor("bandeja", [1]);
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
    const mouse = V(MON.x - 0.36, ESC.y + 0.04, ESC.z - 0.18);
    manoA(pr, "D", mouse.clone().add(V(0, 0.025 - 0.02 * pulso(t, T.click - 0.06, 0.14), -0.02)), 1, [-1, -0.6, -0.3]);
    // el mate en la izquierda: sube a la altura del pecho (nunca a la cara) y frena cuando vibra el celular
    const sube = eio(sg(t, 0.7, 1.25)) * (1 - 0.35 * eio(sg(t, T.vibra + 0.05, T.vibra + 0.3)));
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const hombro = V(RUB.x + 0.24, 1.0, RUB.z + 0.3);
    const desk = MATE_ESC.clone().add(V(0, 0.12, 0));
    const alto = V(RUB.x + 0.2, 1.08, RUB.z + 0.42);
    manoA(pr, "I", desk.clone().lerp(alto, sube), 1, [1, -0.6, -0.2]);
    void hombro;
  } else {
    const fr = t < T.s10 - 0.1;
    pr = poseEn(t, [
      [T.s09, { ...base, ...CARA.sonrisa, inclina: -0.12, cabeza: { giro: 0.05, asiente: -0.05, ladea: 0.08 }, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.0 }, cejas: { alto: 0.35, asim: -0.6 }, manoI: [0.22, 0.12, 0.3], manoD: [-0.2, 0.3, 0.32], codoI: [1, -0.6, -0.2], codoD: [-1, -0.6, -0.2] }],
      [T.primero + 0.2, { cabeza: { giro: -0.1, asiente: 0.05, ladea: 0.02 } }, 0.3],
      [T.mira + 0.3, { ...CARA.incredula, inclina: -0.04, cabeza: { giro: GIRA_CAB, asiente: 0.0, ladea: 0.06 }, ojos: { x: OJO_X, y: -0.1, abiertos: 0.95 }, cejas: { alto: 0.3, ang: 0.25, asim: 0.5 } }, 0.35],
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
    mateR.position.copy(ruben.mano("I").getWorldPosition(new THREE.Vector3())).add(V(0.035, -0.09, 0.02)); mateR.rotation.set(0, 0, 0);
  } else {
    // en la mano derecha
    const baja = eio(sg(t, T.corta + 0.15, T.corta + 0.55));
    const pecho = V(RUB.x - 0.1, lerp(1.02, 0.86, baja), RUB.z - 0.32); // frente a Rubén (que mira a -z)
    const enMesa = false;
    if (!enMesa) {
      manoA(pr, "D", pecho.clone().add(V(0.0, -0.06, 0.01)), 1, [-1, -0.6, -0.1]);
      manoA(pr, "I", V(RUB.x + 0.2, 0.78, RUB.z - 0.3), 1, [1, -0.6, -0.1]);
      ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
      const md = ruben.mano("D").getWorldPosition(new THREE.Vector3());
      celu.position.copy(md).add(V(0, 0.07, -0.02)); celu.rotation.set(lerp(0.55, 1.1, baja), 0, 0, "YXZ"); celu.scale.setScalar(1.15);
      const mi = ruben.mano("I").getWorldPosition(new THREE.Vector3());
      mateR.position.copy(mi).add(V(0.04, -0.1, -0.02)); mateR.rotation.set(0, 0, 0);
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

// el avión de papel: del "?" a las empresas (lo usa también la cámara de s04, que lo sigue)
const AV_A0 = V(PQ.x, 1.25, PQ.z + 0.4), AV_A1 = V(PB.x - 0.4, 1.6, PB.z + 1.2);
function avionEn(t) { const u = sg(t, T.pliega + 0.05, T.bandada); const p = AV_A0.clone().lerp(AV_A1, eio(u)); p.y += Math.sin(Math.PI * u) * 0.5; return p; }
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
  }
  // ---- R1: mate gigante y vapor ----
  {
    const vis = en;
    const pop = R1 ? lerp(0.3, 1, bk(sg(t, T.morph + 0.08, T.morph + 0.42))) : 1;
    mateG.visible = vis && (R2v || t >= T.morph + 0.08);
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
    vaporG.userData.poner(t, kv, 1.4, R1 ? frio : 0);
    // celular gigante del corte escondido (s02, 0,5 s): gira y se achica mientras crece el mate
    const fuera = sg(t, T.morph, T.morph + 0.22);
    celuG.visible = R1 && t < T.morph + 0.22;
    celuG.position.set(PM.x, 0.11 * KCG * lerp(1, 0.5, fuera), PM.z); celuG.rotation.set(-0.28 * (1 - fuera), 0, 0); celuG.rotateY(fuera * Math.PI * 1.2);
    celuG.scale.setScalar(KCG * (1 - eio(fuera) * 0.92));
    if (celuG.visible) dibujarCelu("llama");
  }
  // ---- R2: el "?" ----
  {
    const cae = sg(t, T.cae, T.cae + 0.3);
    const y = t < T.cae ? 9 : lerp(4.0, 0, cae * cae) + Math.abs(rebote(t, T.cae + 0.3, 7, 16, 0.35));
    const pl = 1 - eio(sg(t, T.pliega, T.pliega + 0.3));
    preg.visible = R1 && t >= T.cae && pl > 0.01;
    preg.position.set(PQ.x, ALTO_Q / 2 + Math.max(0, y), PQ.z); preg.rotation.set(0, (1 - cae) * 0.6 + (1 - pl) * 2.5, 0); preg.scale.setScalar(Math.max(0.01, pl));
  }
  // ---- R3: avión, bandada, edificios, 2.241 ----
  {
    const vis = R1 && t >= T.pliega + 0.05 && t < T.s05 + 0.3;
    // avión: nace en el "?" y vuela hacia las empresas; en "dos mil" se multiplica
    const p = avionEn(t), A1 = AV_A1, u = sg(t, T.pliega + 0.05, T.bandada);
    avion.visible = vis && t < T.bandada + 0.05;
    avion.position.copy(p); avion.rotation.set(0.1 - 0.15 * Math.sin(Math.PI * u), Math.PI / 2 - 0.25, Math.sin(t * 6) * 0.12, "YXZ");
    avion.scale.setScalar(lerp(0.5, 1.3, bk(sg(t, T.pliega + 0.05, T.pliega + 0.35))));
    // edificios: crecen del piso en ondas desde "estudio"
    edificios.visible = R1 && t > T.s04 - 0.1;
    EDIF.forEach((e, i) => {
      const t0 = T.s04 - 0.05 + e.f * 0.7, s = bk(sg(t, t0, t0 + 0.3));
      const h = Math.max(0.001, e.h * s);
      _p.set(e.x, h / 2, e.z); _s.set(e.w, h, e.d); _q.identity(); _m4.compose(_p, _q, _s); edificios.setMatrixAt(i, _m4);
    });
    edificios.instanceMatrix.needsUpdate = true;
    bandada.forEach((b, i) => {
      const e = EDIF[(i * 7 + 3) % EDIF.length];
      const t0 = T.bandada + (i % 8) * 0.05, uu = sg(t, t0, t0 + 0.55);
      const q0 = A1, q1 = V(e.x, e.h + 0.05, e.z);
      const pp = q0.clone().lerp(q1, eio(uu)); pp.y += Math.sin(Math.PI * uu) * 0.35;
      b.visible = vis && t >= t0 && uu < 1;
      b.position.copy(pp);
      const dx = q1.x - q0.x, dz = q1.z - q0.z;
      b.rotation.set(0.25 * uu, Math.atan2(dx, dz), 0, "YXZ"); b.scale.setScalar(lerp(1.1, 0.5, uu));
    });
    const kn = popIn(t, T.mil, 0.3) * (1 - sg(t, T.s05 - 0.1, T.s05 + 0.15));
    num2241.visible = R1 && kn > 0.01; num2241.position.set(PB.x, 2.3, PB.z - 0.3); num2241.scale.setScalar(Math.max(kn, 0.001)); num2241.rotation.set(-0.12, 0, 0);
  }
  // ---- R4: buzones ----
  {
    const vis = R1 && t > T.s05 - 0.7 && t < T.s06 + 0.6;
    buzones.forEach((b, i) => {
      b.visible = vis;
      const kk = popIn(t, T.s05 - 0.6 + i * 0.08, 0.3);
      // el cuarto se convierte en el reloj de pie (se achica girando)
      const va = i === 3 ? 1 - eio(sg(t, T.reloj - 0.05, T.reloj + 0.3)) : 1 - eio(sg(t, T.s06 - 0.25, T.s06));
      b.position.set(PZ.x + BZ_X[i], 0, PZ.z); b.rotation.set(0, -0.12 + (i === 3 ? (1 - va) * 3 : 0), 0); ocultar(b, kk * va);
      const { band, caja } = b.userData;
      const sube = i < 3 ? eio(sg(t, T.banderas[i], T.banderas[i] + 0.2)) : 0;
      band.rotation.z = lerp(Math.PI / 2, 0, sube);
      caja.position.y = 1.0 + rebote(t, T.banderas[i] ?? 99, 9, 30, 0.02);
      if (i === 3) { const kr = eio(sg(t, T.rojo, T.rojo + 0.25)); buzonM[3].color.setHex(C.navy3).lerp(new THREE.Color(C.red), kr); tapaM[3].color.setHex(C.cr).lerp(new THREE.Color(0xd98a80), kr); }
    });
    // sobres: entran por la ranura de cada buzón; el del cuarto queda asomando
    sobres.forEach((s, i) => {
      const t0 = T.cartas[i], u = sg(t, t0, t0 + 0.35);
      const slot = V(PZ.x + BZ_X[i], 1.36, PZ.z + 0.38);
      const ini = V(PZ.x + BZ_X[i] - 0.8, 2.6, PZ.z + 1.6);
      const p = ini.clone().lerp(slot, eio(u));
      const entra = i < 3 ? sg(t, t0 + 0.35, t0 + 0.55) : sg(t, t0 + 0.35, t0 + 0.5) * 0.45;
      p.z -= entra * 0.2; p.y -= entra * 0.06;
      s.visible = vis && t >= t0 && (i === 3 ? t < T.reloj - 0.05 : entra < 0.98);
      s.position.copy(p); s.rotation.set(-0.35 * (1 - u) - 1.0 * eio(entra) * 0.0, 0.4 * (1 - u), 0.3 * (1 - u));
      s.scale.setScalar(i < 3 ? 1 - 0.3 * entra : 1);
    });
    respuestas.forEach((r3, i) => {
      const kk = popIn(t, T.banderas[i] + 0.12, 0.3) * (1 - sg(t, T.s06 - 0.25, T.s06 - 0.05));
      r3.visible = vis; r3.position.set(PZ.x + BZ_X[i], 1.78, PZ.z + 0.1); ocultar(r3, vis ? kk : 0);
    });
    const tw = sg(t, T.contesto - 0.1, T.contesto + 0.5);
    telarana.visible = vis && tw > 0 && t < T.reloj;
    telarana.position.set(PZ.x + BZ_X[3] - 0.22, 1.02, PZ.z + 0.36); telarana.rotation.set(0, -0.12, 0);
    telarana.userData.crecer(tw);
  }
  // ---- R5: reloj de pie, sol y luna, 42 h, 1 h ----
  {
    const vis = R1 && t > T.reloj - 0.05 && t < T.s09;
    const kk = popIn(t, T.reloj + 0.1, 0.35);
    relojP.visible = vis; relojP.position.copy(PR); relojP.scale.setScalar(Math.max(kk, 0.001));
    relojP.position.y += rebote(t, T.gira[1], 8, 40, 0.02);
    // agujas: casi dos días (3,5 vueltas de la de hora); a las 12 en s07
    const g = eio(sg(t, T.gira[0], T.gira[1]));
    let hh = 10.2 + g * 42, mm = (hh % 1) * 60;
    const doce = eio(sg(t, T.doce, T.doce + 0.3));
    const angH = lerp(-(hh / 12) * Math.PI * 2, -Math.ceil(hh / 12) * Math.PI * 2, doce);
    const angM = lerp(-(hh) * Math.PI * 2, -Math.ceil(hh) * Math.PI * 2, doce);
    agHP.rotation.z = angH; agMP.rotation.z = angM; void mm;
    // la primera hora: el quesito verde sale hacia la cámara
    const cu = eio(sg(t, T.cuna, T.cuna + 0.3));
    cuna.visible = cu > 0.01; cuna.scale.set(1, 1, Math.max(0.01, cu * 2.4)); cuna.position.z = 0.02 + cu * 0.05;
    // sol y luna cruzan dos veces por arriba
    const ciclo = sg(t, T.gira[0], T.gira[1]) * 1.75;
    const arco = (f) => { const a = Math.PI * (1 - f); return V(PR.x + Math.cos(a) * 1.55, RY + 0.3 + Math.sin(a) * 1.15, PR.z + 0.1); };
    const fs = ciclo % 1, esSol = Math.floor(ciclo) % 2 === 0;
    sol3.visible = vis && ciclo > 0 && ciclo < 1.75 && esSol; luna3.visible = vis && ciclo > 0 && ciclo < 1.75 && !esSol;
    sol3.position.copy(arco(fs)); luna3.position.copy(arco(fs)); sol3.rotation.z = t * 2;
    const n42 = popIn(t, T.n42, 0.3) * (1 - sg(t, T.s07 - 0.3, T.s07 - 0.08));
    num42.visible = vis && n42 > 0.01; num42.position.set(PR.x, RY + RR + 0.42, PR.z); num42.scale.setScalar(Math.max(n42, 0.001));
    const n1 = popIn(t, T.cuna + 0.05, 0.3) * (1 - sg(t, T.s08 + 0.3, T.s08 + 0.5));
    num1h.visible = vis && n1 > 0.01; num1h.position.set(PR.x + 0.36, RY - 0.36, PR.z + 0.28); num1h.scale.setScalar(Math.max(n1, 0.001));
  }
  // ---- R6: cable, silla, tildes ----
  {
    const vis = R1 && t > T.s08 - 0.3;
    sillaD.visible = vis; sillaD.userData.giro.rotation.y = 0;
    const kc = sg(t, T.cable[0], T.cable[1]);
    cable.visible = vis && kc > 0;
    cable.geometry.setDrawRange(0, Math.floor(eo(kc) * cableGeo.index.count / 3) * 3);
    const kg = sg(t, T.cable[0] + 0.3, T.cable[0] + 0.85);
    cableGris.visible = vis && kg > 0; cableGris.geometry.setDrawRange(0, Math.floor(eo(kg) * cableGris.geometry.index.count / 3) * 3);
    tildesS.forEach((ti, i) => {
      const kk = popIn(t, T.tildes[i], 0.28) * (1 - eio(sg(t, T.s09 - 0.6, T.s09 - 0.3)));
      ti.visible = vis; const [dx, dy, dz] = TILDE_POS[i];
      ti.position.set(PS.x + dx, dy, PS.z + dz); ocultar(ti, vis && kk > 0.08 ? kk : 0);
    });
  }
  // ---- R7: ficha, campana, burbuja, termo, respuesta ----
  {
    const vis = R2v;
    ficha.visible = vis;
    ficha.position.copy(PK); ficha.rotation.set(0, 0.2 * (1 - eio(sg(t, T.s11 + 0.2, T.s11 + 0.9))), 0);
    if (vis) dibujarFicha(t >= T.fija ? 1 : 0, sg(t, T.fila1, T.fila1 + 0.3), sg(t, T.fila2, T.fila2 + 0.3));
    const kcmp = popIn(t, T.fila2 + 0.08, 0.3);
    campana.visible = vis && kcmp > 0.01;
    campana.position.set(PK.x + 0.42, PK.y - FH / 2 + 0.3, PK.z + 0.12); campana.scale.setScalar(Math.max(kcmp, 0.001) * 0.5);
    campana.rotation.set(0, 0, Math.sin((t - T.fila2) * 22) * 0.35 * Math.exp(-Math.max(0, t - T.fila2) * 2.5));
    // burbuja: sale de la ficha y queda arriba a la izquierda del mate
    const ub = sg(t, T.burbuja, T.burbuja + 0.6);
    burbuja.visible = vis && t >= T.burbuja;
    const b0 = V(PK.x + 0.3, PK.y + 0.4, PK.z + 0.2), b1 = V(0.0, 2.25, 0.9);
    const bp = b0.clone().lerp(b1, eio(ub)); bp.y += Math.sin(Math.PI * ub) * 0.08;
    burbuja.position.copy(bp); burbuja.scale.setScalar(lerp(0.5, 0.95, bk(ub)) * (1 - eio(sg(t, T.resp - 0.2, T.resp + 0.05))) + 0.001); burbuja.rotation.set(0, 0.1, Math.sin(Math.PI * ub) * -0.08);
    // termo: entra parado a la derecha, se inclina y ceba (el pico sobre la boca del mate), y se va
    const kt = popIn(t, T.termo, 0.35) * (1 - eio(sg(t, T.s13 + 0.05, T.s13 + 0.4)));
    const inc = eio(sg(t, T.ceba - 0.25, T.ceba + 0.15)) * (1 - eio(sg(t, T.s13 - 0.15, T.s13 + 0.15)));
    termoG.visible = vis && kt > 0.01;
    termoG.position.set(lerp(1.0, 1.7, inc), lerp(0, 0.52, inc), PM.z + 0.1); termoG.rotation.set(0, 0, inc * 0.95); termoG.scale.setScalar(KT * Math.max(kt, 0.001));
    termoG.updateMatrixWorld(true);
    const pico = V(0, 0.375, 0).applyMatrix4(termoG.matrixWorld), boca = V(PM.x + 0.05, KM * 0.142, PM.z + 0.05);
    const kch = vis && inc > 0.85 ? sg(t, T.ceba + 0.1, T.ceba + 0.25) * (1 - sg(t, T.s13 - 0.2, T.s13 - 0.05)) : 0;
    chorro.visible = kch > 0.01;
    if (chorro.visible) { const d = boca.clone().sub(pico), L = d.length(); chorro.position.copy(pico).addScaledVector(d, 0.5); chorro.quaternion.setFromUnitVectors(_up, d.normalize()); chorro.scale.set(kch, L, kch); }
    // respuesta de Graciela (a la derecha, cuando el termo ya se fue)
    const kr = popIn(t, T.resp, 0.3);
    respG.visible = vis && t >= T.resp; respG.position.set(0.0, 2.25, 0.9); respG.scale.setScalar(Math.max(kr, 0.001) * 0.95); respG.rotation.set(0, -0.1, 0);
  }
}

// ================= ZONA F en el tiempo =================
function zonaF(t) {
  const en = plano === "F";
  mateF.visible = vaporF.visible = pisoF.visible = en;
  if (!en) return;
  const kk = lerp(0.5, 1, bk(sg(t, T.fin - 0.02, T.fin + 0.35)));
  mateF.position.set(OF.x, 0, 0); mateF.rotation.set(0, 0.6 + Math.sin((t - T.fin) * 1.2) * 0.12, 0); mateF.scale.setScalar(5.2 * kk);
  vaporF.position.set(OF.x - 0.05, 5.2 * 0.15 * kk, 0); vaporF.userData.poner(t, 1, 1.5);
}

// ================= ESCENA EN EL TIEMPO =================
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
  zonaO(t);
  zonaR(t);
  zonaF(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e2) => renderAt(e2.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
