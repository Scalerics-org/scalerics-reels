// Capa 3D de por-que-sacar-numero (Three.js r170 local). Base técnica: reels/por-que-las-tarjetas (luces, entorno PMREM,
// cámara por claves con Hermite monótona, "?" verde, almacén de Rubén) y los personajes de reels/anotamelo
// (assets/personajes.js: Rubén = ELENCO.almacenero, Graciela = ELENCO.clienta, Walter = ELENCO.walter).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Fondo CREMA liso (#efeee5, lo pone el HTML): el canvas es transparente y el piso solo muestra sombras.
// Zonas (x):
//   A (0):    la fiambrería: vitrina, EL NUMERADOR con el ticket 23, la fila de tickets gigantes, el display TURNO (s01-s03).
//   B (40):   la ventanilla de RETIROS con la bici y el recibo N.º 2; salen las bicis de otros (s04-s05).
//   C (80):   la fila en serpentina vista desde arriba y la revista (s06).
//   R (200):  el almacén de Rubén: la balanza (s07), la fila que no se ve (s08), Walter (s10), Rubén (s11), el sistema
//             (s12) y Graciela primera (s13). EL MISMO numerador está apagado al lado de la caja y se prende en s12.
//   G (240):  la casa de Graciela, el celular con su pedido de las 9:02 (s09).
//   F (280):  el cierre verde: el numerador chico con el ticket 23 (s14).
// Richard Larson NO se dibuja (ni cara ni silueta). Sin marcas: bici genérica, chat genérico (sin el verde de WhatsApp).
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND_B from "./vendor/three/lexend800b.js"; // 0-9 ? : , . + ° s
import { crearPersonaje, ELENCO, poseEn, CARA, BRAZOS, crearMate, crearTermo, crearYerba, crearFideos, crearGalletitas, crearDulceDeLeche, crearQueso, crearBolsaPapel, crearTablet } from "./personajes.js";
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
const lerpV = (A, B, u) => V(lerp(A.x, B.x, u), lerp(A.y, B.y, u), lerp(A.z, B.z, u));
const S = E;
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
  env.background = new THREE.Color(0x6a6f78);
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

const OA = V(0, 0, 0), OB = V(40, 0, 0), OC = V(80, 0, 0), OR = V(200, 0, 0), OG = V(240, 0, 0), OF = V(280, 0, 0);
const key = new THREE.DirectionalLight(0xfff0dc, 1.5); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.2); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x5a6684, 1.25); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.5);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.normalBias = 0.02; sol.shadow.radius = 5;
scene.add(sol, sol.target);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, madera: 0xdcbb92, cromo: 0xb8bcc4 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.14 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.45), red: mat(C.red, 0.6),
  white: mat(C.white, 0.42), gris: mat(C.gris, 0.55), madera: mat(C.madera, 0.55), cromo: mat(C.cromo, 0.25, { metalness: 0.7 }),
  piel: mat(0xdba57f, 0.55), goma: mat(0x1a1f2a, 0.7),
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
function texViva(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { c, t, x: c.getContext("2d"), clave: "" }; }
const ajustar = (x, txt, peso, px, ancho, fam) => { let s = px; x.font = F(peso, s, fam); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s, fam); } return s; };
const sh = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const fontB = new FontLoader().parse(LEXEND_B);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font: fontB, size, depth, curveSegments: 10, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
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
  const tk = mesh(tickGeo, M.navy, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  sh(g); padre.add(g); return g;
}
// flecha (rojo apagado: el que se cuela) — apunta a +x
const flechaGeo = (() => {
  const s = new THREE.Shape();
  [[-0.5, 0.12], [0.1, 0.12], [0.1, 0.32], [0.5, 0], [0.1, -0.32], [0.1, -0.12], [-0.5, -0.12]].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 });
  g.translate(0, 0, -0.06); return g;
})();
const NAV = "#16243d", NAV3 = "#1f3254", CRE = "#efeee5", CRE2 = "#d9d7c9", VER = "#5ce611", VERD = "#3fa60a", NAV0 = "#0b1220", ROJ = "#c7655b", GRI = "#8e8c80";
function pisoSombra(x, z, w = 10, d = 10, op = 0.35) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.ShadowMaterial({ opacity: op, color: 0x0b1220 }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, 0.001, z); m.receiveShadow = true; scene.add(m); return m;
}
const matTex = (t, k = 0.2) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.75, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: k });
// un tubo entre dos puntos (cilindro orientado)
const _up = V(0, 1, 0);
function tubo(a, b, r, m) {
  const d = b.clone().sub(a), L = d.length();
  const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 14), m);
  o.position.copy(a).addScaledVector(d, 0.5); o.quaternion.setFromUnitVectors(_up, d.normalize()); return o;
}

// ================= TICKETS (crema, número navy grande, troquel arriba y abajo) =================
const TKW = 360, TKH = 500;
const texTk = {};
function texTicket(n, tipo = "") {
  return (texTk[n + "|" + tipo] ??= tex(TKW, TKH, (x, w, h) => {
    const [tipo0, etiqueta] = tipo.split("|"); tipo = tipo0;
    const borde = tipo === "malo" ? ROJ : tipo === "gris" ? "#b9b7aa" : tipo === "verde" ? VER : NAV0;
    x.fillStyle = tipo === "gris" ? "#dedcd0" : "#f7f6ee"; x.fillRect(0, 0, w, h);
    x.lineWidth = 26; x.strokeStyle = borde; x.strokeRect(13, 13, w - 26, h - 26);
    x.fillStyle = borde; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(30 + i * 37.5, 0, 9, 0, 7); x.fill(); x.beginPath(); x.arc(30 + i * 37.5, h, 9, 0, 7); x.fill(); }
    x.fillStyle = tipo === "gris" ? GRI : NAV0; x.textAlign = "center"; x.textBaseline = "middle";
    const txt = String(n);
    ajustar(x, txt, 900, txt.length > 2 ? 150 : 250, w - 70); x.fillText(txt, w / 2, h * 0.53);
    x.font = F(700, 40, "IBM Plex Mono"); x.fillStyle = tipo === "gris" ? GRI : NAV; if (etiqueta) ajustar(x, etiqueta, 500, 40, w - 70, "IBM Plex Mono"); x.fillText(etiqueta || (tipo === "recibo" || Number(n) < 10 ? "RETIRO" : "TURNO"), w / 2, 70);
  }));
}
const tkCanto = mat(0xe4e2d6, 0.7);
function hacerTicket(n, tipo = "", w = 0.36, h = 0.5, d = 0.03) {
  const g = new THREE.Group();
  const caja = mesh(rbox(w, h, d, Math.min(0.02, d / 2 - 0.001), 2), tkCanto); g.add(caja);
  const fm = matTex(texTicket(n, tipo), 0.22);
  const fr = mesh(new THREE.PlaneGeometry(w * 0.985, h * 0.985), fm, 0, 0, d / 2 + 0.0008); g.add(fr);
  const dm = mesh(new THREE.PlaneGeometry(w * 0.985, h * 0.985), fm, 0, 0, -d / 2 - 0.0008); dm.rotation.y = Math.PI; g.add(dm);
  g.userData = { fr, dm, n, tipo, poner(nn, tt = "") { if (g.userData.n === nn && g.userData.tipo === tt) return; g.userData.n = nn; g.userData.tipo = tt; fr.material = dm.material = matTex(texTicket(nn, tt), 0.22); } };
  return sh(g);
}

// ================= EL NUMERADOR (carcasa verde de marca, frente navy, ranura y ticket crema) =================
// Origen: el centro del cuerpo. Mira a +z. El ticket asoma por la ranura de abajo, colgando hacia adelante.
const texFrenteNum = tex(512, 420, (x, w, h) => {
  x.fillStyle = NAV; rr(x, 0, 0, w, h, 60);
  x.fillStyle = CRE; x.textAlign = "center"; x.textBaseline = "middle";
  ajustar(x, "SAQUE", 900, 96, w - 80); x.fillText("SAQUE", w / 2, 120);
  ajustar(x, "SU NÚMERO", 900, 76, w - 70); x.fillText("SU NÚMERO", w / 2, 215);
  x.fillStyle = VER; x.beginPath(); x.moveTo(w / 2 - 50, 290); x.lineTo(w / 2 + 50, 290); x.lineTo(w / 2, 350); x.closePath(); x.fill();
});
function hacerNumerador() {
  const g = new THREE.Group();
  const cuerpoM = mat(C.g, 0.42, { emissive: C.g, emissiveIntensity: 0.1 });
  const cuerpo = mesh(rbox(0.42, 0.46, 0.3, 0.1, 4), cuerpoM); g.add(cuerpo);
  // anillo navy alrededor del frente y la placa
  const aro = mesh(rbox(0.38, 0.4, 0.04, 0.07, 3), M.navy, 0, 0.0, 0.14); g.add(aro);
  const placa = mesh(new THREE.PlaneGeometry(0.33, 0.27), matTex(texFrenteNum, 0.18), 0, 0.045, 0.1605); g.add(placa);
  // ranura y labio de la ranura
  const labio = mesh(rbox(0.3, 0.05, 0.08, 0.02, 2), M.navy, 0, -0.155, 0.17); g.add(labio);
  const ranura = mesh(new THREE.BoxGeometry(0.22, 0.012, 0.02), mat(0x05080f, 0.9), 0, -0.155, 0.21); g.add(ranura);
  // rollo de tickets visible arriba (tapa redonda crema)
  const tapa = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.05, 32), M.cr, 0, 0.245, -0.02); g.add(tapa);
  const luz = mesh(new THREE.SphereGeometry(0.045, 20, 14), mat(0x7d7b70, 0.4), 0.14, 0.255, 0.07); g.add(luz);
  // el ticket que cuelga (se ve el número)
  const tk = hacerTicket(23, "", 0.17, 0.235, 0.006); tk.position.set(0, -0.29, 0.2); tk.rotation.x = -0.18; g.add(tk);
  g.userData = { cuerpo, cuerpoM, luz, tk };
  return sh(g);
}
const luzOn = mat(C.g, 0.3, { emissive: C.g, emissiveIntensity: 1.2 }), luzOff = mat(0x7d7b70, 0.4);
function prender(nm, u) {
  nm.userData.luz.material = u > 0.5 ? luzOn : luzOff;
  nm.userData.cuerpoM.color.setHex(C.g).lerp(new THREE.Color(0x9a9c92), 1 - u);
  nm.userData.cuerpoM.emissiveIntensity = 0.1 * u;
}

// ================= EL DISPLAY "TURNO" (caja navy, dígitos 3D verdes) =================
const texTurno = tex(512, 110, (x, w, h) => { x.fillStyle = NAV3; x.fillRect(0, 0, w, h); x.fillStyle = CRE; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "TURNO", 800, 80, w - 60); x.fillText("TURNO", w / 2, h / 2 + 4); });
const digM = [mat(C.g, 0.35, { emissive: C.g, emissiveIntensity: 0.55 }), mat(C.gd, 0.5)];
const digOffM = [mat(0x2c4268, 0.5), mat(0x223352, 0.5)];
const digGeo = {};
const geoNum = (s, size = 0.3, depth = 0.06) => (digGeo[s + "|" + size] ??= textoGeo(s, size, depth));
function hacerDisplay(Wd = 1.0, Hd = 0.62) {
  const g = new THREE.Group();
  g.add(mesh(rbox(Wd, Hd, 0.14, 0.05, 3), M.navy));
  g.add(mesh(new THREE.PlaneGeometry(Wd * 0.9, Hd * 0.2), matTex(texTurno, 0.2), 0, Hd * 0.36, 0.0705));
  const pant = mesh(rbox(Wd * 0.86, Hd * 0.6, 0.02, 0.02, 2), mat(0x060a12, 0.5), 0, -Hd * 0.1, 0.07); g.add(pant);
  const dig = mesh(geoNum("22", Hd * 0.42), digM, 0, -Hd * 0.1, 0.1); g.add(dig);
  g.userData = { dig, Hd, num: "22", on: true, poner(s, on = true) { if (g.userData.num !== s) { dig.geometry = geoNum(s, Hd * 0.42); g.userData.num = s; } dig.material = on ? digM : digOffM; } };
  return sh(g);
}

// ================= POSTE CON CINTA =================
function hacerPoste() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.035, 28), M.navy, 0, 0.018, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.92, 16), M.cromo, 0, 0.48, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.07, 16), M.navy, 0, 0.95, 0));
  return sh(g);
}
const cintaM = mat(C.g, 0.5, { emissive: C.g, emissiveIntensity: 0.12, side: THREE.DoubleSide });
function hacerCinta() { const m = mesh(new THREE.BoxGeometry(1, 0.075, 0.012), cintaM); m.castShadow = true; return m; }
// pone la cinta entre dos postes (posiciones del piso)
function ponerCinta(c, a, b, y = 0.9, k = 1) {
  const d = b.clone().sub(a); const L = d.length();
  c.visible = k > 0.01; if (!c.visible) return;
  c.position.set(a.x + d.x / 2, y, a.z + d.z / 2); c.rotation.set(0, -Math.atan2(d.z, d.x), 0); c.scale.set(L * k, 1, 1);
}

// ================= "?" verde =================
const preguntaM = mat(C.g, 0.38, { emissive: C.g, emissiveIntensity: 0.16 });
const preguntaGeo = textoGeo("?", 0.95, 0.3);
const preguntaBordeM = new THREE.MeshBasicMaterial({ color: C.navy, side: THREE.BackSide });
function hacerPregunta() { const g = new THREE.Group(); const a = mesh(preguntaGeo, preguntaM); a.castShadow = true; g.add(a); const b = mesh(preguntaGeo, preguntaBordeM); b.scale.set(1.04, 1.03, 1.15); g.add(b); scene.add(g); return g; }

// ================= ZONA A: la fiambrería =================
const fiambreria = new THREE.Group(); scene.add(fiambreria);
const pisoA = pisoSombra(OA.x + 1, 0.5, 14, 12, 0.3);
const VIT = { x: OA.x + 0.2, z: -1.2, w: 3.2, h: 1.1, d: 0.85 };
{
  // zócalo de azulejo navy claro (solo el frente del mostrador)
  const azu = tex(512, 256, (x, w, h) => { x.fillStyle = "#c9d3e0"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) rr(x, i * 64 + 3, j * 64 + 3, 58, 58, 6); });
  azu.wrapS = azu.wrapT = THREE.RepeatWrapping; azu.repeat.set(5, 1);
  fiambreria.add(mesh(rbox(VIT.w, 0.62, VIT.d, 0.03), [mat(C.navy2, 0.6), mat(C.navy2, 0.6), M.cr2, M.cr2, new THREE.MeshStandardMaterial({ map: azu, roughness: 0.4 }), M.navy2], VIT.x, 0.31, VIT.z));
  // base de la vitrina (bandeja crema) y vidrio curvo
  fiambreria.add(mesh(rbox(VIT.w, 0.06, VIT.d, 0.02), M.cr, VIT.x, 0.65, VIT.z));
  fiambreria.add(mesh(rbox(VIT.w, 0.05, 0.3, 0.02), M.navy3, VIT.x, VIT.h + 0.02, VIT.z - 0.28));
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xe8f2f8, roughness: 0.05, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide });
  const vg = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, VIT.w - 0.04, 24, 1, true, 0, Math.PI / 2), vidrio);
  vg.rotation.z = Math.PI / 2; vg.position.set(VIT.x, 0.67, VIT.z - 0.13 - 0.0); fiambreria.add(vg);
  for (const s of [-1, 1]) fiambreria.add(mesh(rbox(0.04, 0.48, 0.5, 0.01), M.navy3, VIT.x + s * (VIT.w / 2 - 0.02), 0.9, VIT.z + 0.05));
  // fiambres: queso, salame con piolín, jamón cocido
  const q1 = crearQueso(); q1.scale.setScalar(2.0); q1.position.set(VIT.x - 0.9, 0.68, VIT.z + 0.05); fiambreria.add(q1);
  const queso = new THREE.Group();
  const horma = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.16, 32, 1, false, 0, Math.PI * 1.6), mat(0xf0c75a, 0.55)); horma.position.y = 0.08; queso.add(horma);
  const corte = mat(0xf6d878, 0.6);
  for (const a of [0, Math.PI * 1.6]) { const p = mesh(new THREE.PlaneGeometry(0.2, 0.16), corte); p.position.set(Math.sin(a) * 0.1, 0.08, Math.cos(a) * 0.1); p.rotation.y = a - Math.PI / 2 + (a ? Math.PI : 0); queso.add(p); }
  for (let i = 0; i < 4; i++) { const h = mesh(new THREE.SphereGeometry(0.018, 10, 8), mat(0xc79a3a, 0.7)); h.position.set(Math.cos(i * 1.3) * 0.205, 0.05 + (i % 2) * 0.06, Math.sin(i * 1.3) * 0.205); queso.add(h); }
  queso.position.set(VIT.x + 0.15, 0.68, VIT.z + 0.02); queso.rotation.y = 0.7; fiambreria.add(queso);
  const salame = new THREE.Group();
  const sm = mat(0x8a3b3a, 0.65);
  salame.add(mesh(new THREE.CapsuleGeometry(0.06, 0.5, 8, 16).rotateZ(Math.PI / 2), sm));
  for (let i = 0; i < 7; i++) salame.add(mesh(new THREE.TorusGeometry(0.062, 0.004, 6, 20).rotateY(Math.PI / 2), M.cr, -0.25 + i * 0.08, 0, 0));
  const rod = mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.012, 24).rotateZ(Math.PI / 2), mat(0xc96a64, 0.6), 0.33, 0, 0); salame.add(rod);
  for (let i = 0; i < 9; i++) { const g2 = mesh(new THREE.CircleGeometry(0.008, 8), M.cr); g2.position.set(0.337, Math.cos(i * 2.1) * 0.035, Math.sin(i * 2.1) * 0.035); g2.rotation.y = Math.PI / 2; salame.add(g2); }
  salame.position.set(VIT.x + 0.85, 0.75, VIT.z + 0.05); salame.rotation.y = -0.35; fiambreria.add(salame);
  const jamon = mesh(new THREE.CapsuleGeometry(0.11, 0.3, 8, 16).rotateZ(Math.PI / 2), mat(0xe9a7a0, 0.55)); jamon.scale.set(1, 0.85, 1); jamon.position.set(VIT.x - 0.35, 0.78, VIT.z - 0.15); fiambreria.add(jamon);
  // pared de atrás (crema un poco más oscura) con zócalo navy, para que se lea el mostrador
  fiambreria.add(mesh(new THREE.PlaneGeometry(12, 4), mat(0xe2e0d4, 0.95), OA.x + 1, 2, -2.2));
  fiambreria.add(mesh(new THREE.PlaneGeometry(12, 0.5), mat(C.navy2, 0.6), OA.x + 1, 0.25, -2.19));
  sh(fiambreria);
}
// el numerador del gancho, en su poste, delante de la vitrina
const NUM_A = V(OA.x - 0.75, 1.2, -0.35);
const numA = hacerNumerador(); scene.add(numA);
const posteNum = new THREE.Group(); scene.add(posteNum);
posteNum.add(mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.04, 28), M.navy, 0, 0.02, 0));
posteNum.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, NUM_A.y - 0.2, 16), M.navy3, 0, (NUM_A.y - 0.2) / 2, 0));
posteNum.position.set(NUM_A.x, 0, NUM_A.z); sh(posteNum);
// la mano que tira del ticket (sin cara: mano y puño de camisa navy)
const mano = new THREE.Group(); scene.add(mano);
{
  const pi = M.piel;
  mano.add(mesh(rbox(0.1, 0.085, 0.11, 0.035), pi, 0, 0, 0));
  for (let i = 0; i < 4; i++) mano.add(mesh(new THREE.CapsuleGeometry(0.014, 0.035, 4, 8).rotateX(Math.PI / 2), pi, 0.055, 0.03 - i * 0.022, 0.03).rotateZ(0));
  mano.add(mesh(new THREE.CapsuleGeometry(0.016, 0.04, 4, 8), pi, 0.02, 0.055, 0.04));
  const puno = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 18).rotateZ(Math.PI / 2), M.navy3, -0.15, 0, 0); mano.add(puno);
  mano.add(mesh(new THREE.CylinderGeometry(0.063, 0.063, 0.035, 18).rotateZ(Math.PI / 2), M.cr, -0.05, 0, 0));
  sh(mano);
}
// la fila de tickets gigantes (21-25) en fila india, delante del mostrador
const FILA = [21, 22, 23, 24, 25].map((n, i) => ({ n, p: V(OA.x + 1.45 - i * 0.2, 0, -0.95 + i * 0.68) }));
const filaTk = FILA.map(({ n }) => { const t = hacerTicket(n, "", 0.5, 0.7, 0.06); scene.add(t); return t; });
const colado = hacerTicket(31, "malo", 0.5, 0.7, 0.06); scene.add(colado);
const postesA = [0, 1].map(() => { const p = hacerPoste(); scene.add(p); return p; });
const cintaA = hacerCinta(); scene.add(cintaA);
const displayA = hacerDisplay(1.1, 0.66); scene.add(displayA);
const DISP_A = V(OA.x + 1.15, 1.78, -1.6);
const preguntaA = hacerPregunta();

// ================= ZONA B: la ventanilla de RETIROS y la bici =================
const zonaBG = new THREE.Group(); scene.add(zonaBG);
const pisoB = pisoSombra(OB.x, 0.5, 12, 10, 0.32);
const PARED_B = -1.4;
{
  const pared = new THREE.Shape(); pared.moveTo(-5, 0); pared.lineTo(5, 0); pared.lineTo(5, 5); pared.lineTo(-5, 5); pared.lineTo(-5, 0);
  const ven = new THREE.Path(); ven.moveTo(-1.45, 1.0); ven.lineTo(-0.15, 1.0); ven.lineTo(-0.15, 1.85); ven.lineTo(-1.45, 1.85); ven.lineTo(-1.45, 1.0); pared.holes.push(ven);
  const pue = new THREE.Path(); pue.moveTo(0.35, 0); pue.lineTo(1.35, 0); pue.lineTo(1.35, 2.1); pue.lineTo(0.35, 2.1); pue.lineTo(0.35, 0); pared.holes.push(pue);
  const pm = mesh(new THREE.ExtrudeGeometry(pared, { depth: 0.12, bevelEnabled: false }), M.navy2, OB.x, 0, PARED_B - 0.12); zonaBG.add(pm);
  // interior oscuro
  zonaBG.add(mesh(new THREE.PlaneGeometry(8, 3.2), mat(0x2c4268, 0.9), OB.x, 1.6, PARED_B - 1.6));
  for (const y of [1.05, 1.5]) zonaBG.add(mesh(rbox(2.6, 0.05, 0.5, 0.01), M.cr2, OB.x - 0.6, y, PARED_B - 1.3));
  const azc = azarDe(5);
  for (const y of [1.08, 1.53]) for (let i = 0; i < 6; i++) { const w2 = 0.25 + azc() * 0.15, h2 = 0.18 + azc() * 0.16; zonaBG.add(mesh(rbox(w2, h2, 0.35, 0.02), i % 3 === 0 ? M.g : mat(0xc49a63, 0.9), OB.x - 1.75 + i * 0.42, y + h2 / 2, PARED_B - 1.3)); }
  // marco de la ventanilla y repisa
  const marco = M.cr;
  zonaBG.add(mesh(rbox(1.42, 0.08, 0.36, 0.02), marco, OB.x - 0.8, 1.0, PARED_B + 0.1));
  zonaBG.add(mesh(rbox(1.42, 0.07, 0.16, 0.02), marco, OB.x - 0.8, 1.87, PARED_B));
  for (const s of [-1, 1]) zonaBG.add(mesh(rbox(0.07, 0.92, 0.16, 0.02), marco, OB.x - 0.8 + s * 0.68, 1.43, PARED_B));
  for (const s of [-1, 1]) zonaBG.add(mesh(rbox(0.08, 2.14, 0.16, 0.02), marco, OB.x + 0.85 + s * 0.52, 1.07, PARED_B));
  zonaBG.add(mesh(rbox(1.12, 0.08, 0.16, 0.02), marco, OB.x + 0.85, 2.13, PARED_B));
  // cartel RETIROS
  const ct = tex(900, 220, (x, w, h) => { x.fillStyle = CRE; rr(x, 0, 0, w, h, 40); x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "RETIROS", 900, 160, w - 100); x.fillText("RETIROS", w / 2, h / 2 + 8); });
  zonaBG.add(mesh(rbox(1.3, 0.3, 0.05, 0.04), M.cr, OB.x - 0.8, 2.08, PARED_B + 0.03));
  zonaBG.add(mesh(new THREE.PlaneGeometry(1.25, 0.29), matTex(ct, 0.25), OB.x - 0.8, 2.08, PARED_B + 0.057));
  sh(zonaBG); pm.receiveShadow = true;
}
// la bici genérica (cuadro navy, manubrio con puños verdes, sin logo). Orientada a +x; origen en el piso entre ruedas
const biciNum = mat(C.navy3, 0.4);
function hacerBici(cuadro = biciNum) {
  const g = new THREE.Group();
  const R = 0.33;
  const rueda = (x) => {
    const r = new THREE.Group(); r.position.set(x, R, 0);
    r.add(mesh(new THREE.TorusGeometry(R, 0.035, 10, 40), M.goma));
    r.add(mesh(new THREE.TorusGeometry(R - 0.035, 0.011, 6, 40), M.cromo));
    for (let i = 0; i < 8; i++) { const sp = mesh(new THREE.CylinderGeometry(0.004, 0.004, (R - 0.04) * 2, 5), M.cromo); sp.rotation.z = (i * Math.PI) / 8; r.add(sp); }
    r.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.07, 14).rotateX(Math.PI / 2), M.navy));
    g.add(r); return r;
  };
  const ra = rueda(-0.55), rd = rueda(0.55);
  const P = { tr: V(-0.55, R, 0), pd: V(-0.02, 0.3, 0), as: V(-0.18, 0.86, 0), cs: V(0.38, 0.9, 0), ci: V(0.43, 0.7, 0), td: V(0.55, R, 0) };
  for (const [a, b] of [["tr", "pd"], ["pd", "as"], ["as", "tr"], ["pd", "ci"], ["as", "cs"], ["ci", "td"], ["cs", "ci"]]) g.add(tubo(P[a], P[b], 0.024, cuadro));
  const as = mesh(rbox(0.24, 0.05, 0.11, 0.025), M.navy, P.as.x - 0.03, P.as.y + 0.07, 0); g.add(as);
  g.add(tubo(P.as, V(P.as.x - 0.02, P.as.y + 0.06, 0), 0.016, M.cromo));
  g.add(tubo(P.cs, V(P.cs.x - 0.03, P.cs.y + 0.12, 0), 0.02, M.cromo));
  const manub = new THREE.Group(); manub.position.set(P.cs.x - 0.03, P.cs.y + 0.13, 0); g.add(manub);
  manub.add(mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.56, 12).rotateX(Math.PI / 2), M.cromo));
  for (const s of [-1, 1]) manub.add(mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.13, 14).rotateX(Math.PI / 2), M.g, -0.0, 0, s * 0.25));
  // pedal y plato
  g.add(mesh(new THREE.TorusGeometry(0.09, 0.012, 6, 24), M.cromo, P.pd.x, P.pd.y, 0.04));
  g.add(mesh(rbox(0.1, 0.025, 0.06, 0.01), M.navy, P.pd.x + 0.08, P.pd.y - 0.1, 0.09));
  // guardabarros crema
  for (const [x] of [[-0.55], [0.55]]) { const gb = mesh(new THREE.TorusGeometry(R + 0.05, 0.02, 6, 24, Math.PI * 0.7), M.cr, x, R, 0); gb.rotation.z = Math.PI * 0.15; g.add(gb); }
  g.userData = { ra, rd, manub };
  return sh(g);
}
const BICI_B = V(OB.x - 0.85, 0, PARED_B + 0.5);
const biciB = hacerBici(); scene.add(biciB);
// el recibo nuestro (N.º 2), grande en primer plano; los de los demás en las bicis que salen
const recibo = hacerTicket(2, "verde", 0.52, 0.72, 0.04); scene.add(recibo);
const bicis = [5, 7, 9].map((n) => { const b = hacerBici(); scene.add(b); const t = hacerTicket(n, "recibo", 0.36, 0.5, 0.012); b.add(t); t.position.set(0.3, 0.84, -0.3); t.rotation.y = Math.PI; b.userData.tag = t; return b; });
const flechas = [0, 1, 2].map(() => { const f = mesh(flechaGeo, [M.red, mat(0x8f3f37, 0.5)]); f.castShadow = true; scene.add(f); return f; });
const preguntaB = hacerPregunta(); // el "?" que tapa la cámara y se vuelve el puño verde del manubrio

// ================= ZONA C: la fila en serpentina y la revista =================
const zonaCG = new THREE.Group(); scene.add(zonaCG);
const pisoC = pisoSombra(OC.x, -0.5, 14, 12, 0.32);
const SERP = []; // postes de la serpentina
const SC = { x0: -2.4, x1: 2.4, filas: [-2.6, -1.4, -0.2, 1.0] };
const serpPostes = [], serpCintas = [];
{
  SC.filas.forEach((z, j) => { for (let i = 0; i < 5; i++) SERP.push(V(OC.x + lerp(SC.x0, SC.x1, i / 4), 0, z)); });
  SERP.forEach((p) => { const q = hacerPoste(); q.position.copy(p); zonaCG.add(q); serpPostes.push(q); });
  // cintas: cada fila entera menos el último tramo (alternando lado), así la fila serpentea
  SC.filas.forEach((z, j) => {
    for (let i = 0; i < 4; i++) {
      if ((j % 2 === 0 && i === 3) || (j % 2 === 1 && i === 0)) continue;
      const c = hacerCinta(); zonaCG.add(c); ponerCinta(c, SERP[j * 5 + i], SERP[j * 5 + i + 1]); serpCintas.push(c);
    }
  });
}
// el camino de la fila (entre las cintas): zigzag de atrás hacia adelante
const CAM_SERP = (() => {
  const pts = [];
  const zz = [-3.2, -2.0, -0.8, 0.4, 1.6];
  zz.forEach((z, j) => { const a = OC.x + (j % 2 ? SC.x1 - 0.5 : SC.x0 + 0.5), b = OC.x + (j % 2 ? SC.x0 + 0.5 : SC.x1 - 0.5); pts.push(V(a, 0, z), V(b, 0, z)); });
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.05);
})();
const serpTk = []; for (let i = 0; i < 14; i++) { const t = hacerTicket(10 + i, "", 0.44, 0.6, 0.04); scene.add(t); serpTk.push(t); }
// la revista científica (tapa navy, título mono)
const REV = V(OC.x, 0, 4.1);
const revista = new THREE.Group(); scene.add(revista);
const texTapa = tex(700, 940, (x, w, h) => {
  x.fillStyle = NAV; x.fillRect(0, 0, w, h); x.fillStyle = VER; x.fillRect(0, 110, w, 22);
  x.fillStyle = CRE; x.textAlign = "center"; x.textBaseline = "middle";
  ajustar(x, "OPERATIONS", 500, 96, w - 80, "IBM Plex Mono"); x.fillText("OPERATIONS", w / 2, 240);
  ajustar(x, "RESEARCH", 500, 96, w - 80, "IBM Plex Mono"); x.fillText("RESEARCH", w / 2, 350);
  x.font = F(900, 200); x.fillStyle = VER; x.fillText("1987", w / 2, 620);
  x.strokeStyle = CRE; x.lineWidth = 8; x.strokeRect(40, 40, w - 80, h - 80);
});
const texPag = tex(700, 940, (x, w, h) => {
  x.fillStyle = "#f7f6ee"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#b9b7aa"; for (let i = 0; i < 17; i++) { const y = 90 + i * 48; if (i >= 7 && i <= 8) continue; rr(x, 60, y, i % 5 === 4 ? 360 : w - 120, 18, 9); }
  x.fillStyle = VER; rr(x, 50, 90 + 7 * 48 - 10, w - 100, 120, 20);
  x.fillStyle = NAV0; rr(x, 80, 90 + 7 * 48 + 14, w - 220, 22, 11); rr(x, 80, 90 + 8 * 48 + 8, w - 320, 22, 11);
});
const REVW = 1.0, REVH = 1.34;
{
  revista.add(mesh(rbox(REVW * 2.02, 0.05, REVH + 0.02, 0.02), M.cr2, 0, 0.025, 0));
  const pagI = mesh(new THREE.PlaneGeometry(REVW, REVH), matTex(texPag, 0.22), -REVW / 2, 0.052, 0); pagI.rotation.x = -Math.PI / 2; revista.add(pagI);
  const pagD = mesh(new THREE.PlaneGeometry(REVW, REVH), matTex(texPag, 0.22), REVW / 2, 0.052, 0); pagD.rotation.x = -Math.PI / 2; revista.add(pagD);
  const bis = new THREE.Group(); revista.add(bis); bis.position.set(0, 0.06, 0);
  const tapa = mesh(rbox(REVW, 0.016, REVH, 0.008, 2), M.navy2, REVW / 2, 0, 0); bis.add(tapa);
  const tf = mesh(new THREE.PlaneGeometry(REVW * 0.98, REVH * 0.98), matTex(texTapa, 0.2), REVW / 2, 0.0085, 0); tf.rotation.x = -Math.PI / 2; bis.add(tf);
  revista.userData.bis = bis;
  sh(revista);
}

// ================= ZONA R: el almacén de Rubén =================
const MOST = { x: OR.x, y: 0.95, z: 0.0, d: 0.7, w: 2.2 };
const RZ = -0.6; // dónde está parado Rubén
const RX = OR.x + 0.0;
const almacen = new THREE.Group(); scene.add(almacen);
const ZW = -1.6;
const VX = OR.x - 2.7; // vidriera y puerta
{
  const pis = tex(512, 512, (x, w, h) => { x.fillStyle = "#b9b7a9"; x.fillRect(0, 0, w, h); x.fillStyle = "#c9c7b9"; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rr(x, i * 256 + 5, j * 256 + 5, 246, 246, 8); });
  pis.wrapS = pis.wrapT = THREE.RepeatWrapping; pis.repeat.set(14 / 0.6, 8 / 0.6);
  const piso = mesh(new THREE.PlaneGeometry(14, 8), new THREE.MeshStandardMaterial({ map: pis, roughness: 0.85 }), OR.x, 0, 2.4); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; almacen.add(piso);
  almacen.add(mesh(new THREE.PlaneGeometry(14, 4.4), mat(0xe6e4d8, 0.92), OR.x, 2.2, ZW));
  almacen.add(mesh(new THREE.PlaneGeometry(14, 1.0), mat(0x16243d, 0.6), OR.x, 0.5, ZW + 0.005));
  almacen.add(mesh(new THREE.BoxGeometry(14, 0.06, 0.04), M.g, OR.x, 1.01, ZW + 0.02));
  const verde = mat(0x4fb81a, 0.55);
  const EX0 = OR.x - 1.25, EX1 = OR.x + 1.35, EZ = ZW + 0.22;
  for (const x of [EX0, EX1, (EX0 + EX1) / 2]) almacen.add(mesh(rbox(0.07, 2.0, 0.4, 0.015), verde, x, 1.3, EZ));
  for (const y of [1.3, 1.8, 2.3]) almacen.add(mesh(rbox(EX1 - EX0 + 0.1, 0.05, 0.42, 0.015), verde, (EX0 + EX1) / 2, y, EZ));
  almacen.add(mesh(new THREE.BoxGeometry(EX1 - EX0, 1.6, 0.02), mat(0xd8d6c8, 0.9), (EX0 + EX1) / 2, 1.85, ZW + 0.02));
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
  // vidriera (izquierda) y la puerta abierta (más a la izquierda) por donde entra y sale Walter
  almacen.add(mesh(rbox(1.5, 2.3, 0.08, 0.02), M.navy3, VX + 0.85, 1.25, ZW + 0.03));
  almacen.add(mesh(new THREE.PlaneGeometry(1.32, 2.12), new THREE.MeshBasicMaterial({ color: 0xc9dbef }), VX + 0.85, 1.25, ZW + 0.075));
  almacen.add(mesh(rbox(1.32, 0.06, 0.06, 0.02), M.navy3, VX + 0.85, 1.6, ZW + 0.1));
  // mostrador
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
const pisoR = pisoSombra(OR.x, 1.5, 10, 6, 0.0);
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 999 }); scene.add(ruben.raiz);
ruben.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const mateR = crearMate(); scene.add(mateR); mateR.scale.setScalar(1.15);
const termo = crearTermo(); scene.add(termo); termo.scale.setScalar(1.2); termo.position.set(MOST.x + 1.02, MOST.y, MOST.z - 0.2);
const graciela = crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 999 }); scene.add(graciela.raiz);
graciela.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const walter = crearPersonaje({ ...ELENCO.walter, corbata: null, parpadeoCada: 999 }); scene.add(walter.raiz);
walter.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
walter.ponerCampera(true);
// el numerador de Rubén (EL MISMO del gancho), apagado al lado de la caja; se prende en s12
const NUM_R = V(MOST.x - 0.52, MOST.y + 0.33, MOST.z - 0.08);
const numR = hacerNumerador(); scene.add(numR); numR.scale.setScalar(0.62);
numR.userData.tk.visible = false;
const patasNum = mesh(rbox(0.2, 0.1, 0.16, 0.03), M.navy, 0, 0, 0); scene.add(patasNum); sh(patasNum);
// el display TURNO en la pared del almacén (apagado hasta el sistema)
const displayR = hacerDisplay(0.72, 0.44); scene.add(displayR);
const DISP_R = V(OR.x - 0.58, 1.66, ZW + 0.5);
// la balanza de fiambrería (de dos platillos: esperar vs. que te pasen), sobre el mostrador a la derecha
const BAL = V(MOST.x + 0.74, MOST.y, MOST.z + 0.08);
const balanza = new THREE.Group(); scene.add(balanza);
const texDispBal = (abajo) => tex(256, 128, (x, w, h) => { x.fillStyle = "#060a12"; x.fillRect(0, 0, w, h); x.fillStyle = VER; x.textAlign = "center"; x.textBaseline = "middle"; if (abajo) { x.beginPath(); x.moveTo(w / 2 - 40, 34); x.lineTo(w / 2 + 40, 34); x.lineTo(w / 2, 100); x.closePath(); x.fill(); } else { x.font = F(800, 70); x.fillText("= =", w / 2, h / 2 + 4); } });
const dispBalT = [texDispBal(false), texDispBal(true)];
const balM = { base: M.cr, frente: M.navy2 };
const brazoBal = new THREE.Group();
const platos = [];
const cargas = [new THREE.Group(), new THREE.Group()];
{
  balanza.add(mesh(rbox(0.42, 0.12, 0.3, 0.04), balM.base, 0, 0.06, 0));
  balanza.add(mesh(rbox(0.38, 0.08, 0.02, 0.01), balM.frente, 0, 0.06, 0.15));
  const dp = mesh(new THREE.PlaneGeometry(0.14, 0.06), new THREE.MeshBasicMaterial({ map: dispBalT[0], toneMapped: false }), 0, 0.06, 0.162); balanza.add(dp); balanza.userData.disp = dp;
  balanza.add(mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.42, 16), M.navy3, 0, 0.33, -0.02));
  brazoBal.position.set(0, 0.55, -0.02); balanza.add(brazoBal);
  brazoBal.add(mesh(rbox(0.5, 0.035, 0.04, 0.015), M.navy, 0, 0, 0));
  brazoBal.add(mesh(new THREE.SphereGeometry(0.035, 16, 12), M.g, 0, 0, 0.02));
  for (const s of [-1, 1]) {
    const cuelga = new THREE.Group(); cuelga.position.set(s * 0.23, 0, 0); brazoBal.add(cuelga);
    for (const a of [0, 2.1, 4.2]) cuelga.add(tubo(V(0, 0, 0), V(Math.cos(a) * 0.1, -0.2, Math.sin(a) * 0.1), 0.004, M.cromo));
    const plato = mesh(new THREE.CylinderGeometry(0.13, 0.1, 0.025, 32), M.cromo, 0, -0.21, 0); cuelga.add(plato);
    cuelga.add(cargas[s < 0 ? 0 : 1]); cargas[s < 0 ? 0 : 1].position.set(0, -0.195, 0);
    platos.push(cuelga);
  }
  // izquierda: reloj de arena (esperar)
  const ra = cargas[0];
  ra.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.02, 24), M.navy, 0, 0.01, 0));
  ra.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.02, 24), M.navy, 0, 0.23, 0));
  for (const a of [0.6, 2.7, 4.8]) ra.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.22, 8), M.navy, Math.cos(a) * 0.065, 0.12, Math.sin(a) * 0.065));
  const vid = new THREE.MeshPhysicalMaterial({ color: 0xeaf3f8, roughness: 0.05, transparent: true, opacity: 0.35, depthWrite: false });
  ra.add(mesh(new THREE.ConeGeometry(0.055, 0.1, 20), vid, 0, 0.17, 0).rotateX(Math.PI));
  ra.add(mesh(new THREE.ConeGeometry(0.055, 0.1, 20), vid, 0, 0.07, 0));
  ra.add(mesh(new THREE.ConeGeometry(0.04, 0.05, 20), mat(0xe2c27a, 0.8), 0, 0.045, 0));
  // derecha: ticket roto y la flecha roja que se cuela (que te pasen)
  const rb = cargas[1];
  const t1 = hacerTicket(23, "malo", 0.13, 0.18, 0.008); t1.position.set(-0.03, 0.09, -0.01); t1.rotation.set(0, 0.2, 0.18); rb.add(t1);
  const fl = mesh(flechaGeo, [M.red, mat(0x8f3f37, 0.5)], 0.02, 0.06, 0.06); fl.scale.setScalar(0.16); fl.rotation.set(0, -0.3, 0.5); rb.add(fl);
  sh(balanza);
}
// el celular de Rubén (boca abajo en el mostrador; en s11 lo da vuelta) y el de Graciela
const PP = [768, 1556];
function cabecera(x, w, titulo, sub = "") {
  x.fillStyle = NAV0; x.fillRect(0, 0, w, 250);
  x.fillStyle = CRE; x.font = F(700, 44); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("9:12", 40, 48);
  x.strokeStyle = CRE; x.lineWidth = 10; x.lineCap = "round"; x.beginPath(); x.moveTo(78, 120); x.lineTo(50, 150); x.lineTo(78, 180); x.stroke();
  x.fillStyle = CRE; x.textAlign = "left"; ajustar(x, titulo, 800, 76, w - 170); x.fillText(titulo, 120, sub ? 136 : 152);
  if (sub) { x.fillStyle = VER; x.font = F(600, 40); x.fillText(sub, 122, 200); }
}
const MSJ = ["Rubén, ¿me separás", "un queso y", "una yerba?", "Gracias"];
function burbuja(x, X, Y, mio) {
  const bw = 600, bh = 420;
  x.fillStyle = mio ? "#d9f7c4" : "#ffffff"; rr(x, X, Y, bw, bh, 44);
  x.lineWidth = 8; x.strokeStyle = mio ? VERD : "#c9c7b9"; x.beginPath(); x.roundRect(X, Y, bw, bh, 44); x.stroke();
  x.fillStyle = NAV0; x.textAlign = "left"; x.textBaseline = "alphabetic";
  const px = Math.min(...MSJ.map((l) => ajustar(x, l, 700, 62, bw - 80))); x.font = F(700, px);
  MSJ.forEach((l, i) => x.fillText(l, X + 40, Y + 92 + i * 76));
  x.fillStyle = "#4a5263"; x.font = F(700, 46); x.textAlign = "right"; x.fillText("9:02", X + bw - 40, Y + bh - 34);
}
function dibujarCelu(x, tipo) {
  const [w, h] = PP;
  x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h);
  if (tipo === "graciela") { cabecera(x, w, "Almacén de Rubén", "en línea"); burbuja(x, 120, 760, true); }
  if (tipo === "ruben") { cabecera(x, w, "Graciela"); burbuja(x, 40, 520, false); }
  x.fillStyle = "#ffffff"; rr(x, 30, h - 150, w - 60, 110, 55); x.fillStyle = "#8e8c80"; x.font = F(600, 44); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Escribir", 80, h - 92);
}
function hacerCelu(Wc = 0.08, Hc = 0.162, tipo = "ruben", funda = C.navy3) {
  const g = new THREE.Group();
  g.add(mesh(rbox(Wc + 0.008, Hc + 0.008, 0.012, 0.012), mat(funda, 0.4)));
  g.add(mesh(rbox(0.026, 0.026, 0.004, 0.006), M.navy, -Wc * 0.27, Hc * 0.36, -0.0072));
  const tv = texViva(...PP);
  dibujarCelu(tv.x, tipo); tv.t.needsUpdate = true;
  const pm = new THREE.MeshStandardMaterial({ map: tv.t, roughness: 0.35, emissive: 0xffffff, emissiveMap: tv.t, emissiveIntensity: 0.35 });
  const p = mesh(new THREE.PlaneGeometry(Wc, Hc), pm, 0, 0, 0.0066); g.add(p);
  g.userData = { tv, Wc, Hc, pantalla: p };
  sh(g); p.castShadow = false; return g;
}
const enPant = (g, px, py, z = 0.01) => V((px / PP[0] - 0.5) * g.userData.Wc, (0.5 - py / PP[1]) * g.userData.Hc, z);
const celuR = hacerCelu(0.08, 0.162, "ruben", C.navy3); scene.add(celuR);
const CELU_R = V(MOST.x + 0.12, MOST.y + 0.007, MOST.z + 0.12);
const CELU_V = V(RX + 0.03, 1.11, -0.03), KCV = 2.2; // s11: el celular dado vuelta, de frente a cámara
// la tablet "Pedidos" (aparece donde estaba el celular)
const tabTV = texViva(1024, 720);
const PEDIDOS = [["23", "Graciela", "WhatsApp · 9:02"], ["24", "Walter", "mostrador · 9:10"], ["25", "Pedido web", "web · 9:14"]];
function dibujarTablet(n, listo) {
  const x = tabTV.x, w = 1024, h = 720;
  x.fillStyle = "#f6f4ea"; x.fillRect(0, 0, w, h);
  x.fillStyle = NAV0; x.fillRect(0, 0, w, 130); x.fillStyle = CRE; x.font = F(800, 72); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Pedidos", 44, 70);
  x.fillStyle = VER; x.font = F(700, 40); x.textAlign = "right"; x.fillText("por orden de llegada", w - 40, 72);
  PEDIDOS.forEach(([num, quien, canal], i) => {
    if (i >= n) return;
    const Y = 160 + i * 182, ok = listo && i === 0;
    x.fillStyle = ok ? "#d9f7c4" : "#ffffff"; rr(x, 28, Y, w - 56, 162, 30);
    x.lineWidth = 8; x.strokeStyle = ok ? VERD : "#c9c7b9"; x.beginPath(); x.roundRect(28, Y, w - 56, 162, 30); x.stroke();
    x.fillStyle = i === 0 ? VER : NAV; rr(x, 50, Y + 22, 150, 118, 22);
    x.fillStyle = i === 0 ? NAV0 : CRE; x.font = F(900, 82); x.textAlign = "center"; x.fillText(num, 125, Y + 84);
    x.fillStyle = NAV0; x.textAlign = "left"; x.font = F(800, 64); x.fillText(quien, 230, Y + 62);
    x.fillStyle = "#4a5263"; x.font = F(700, 44); x.fillText(canal, 230, Y + 122);
    if (ok) { x.fillStyle = VERD; x.font = F(900, 54); x.textAlign = "right"; x.fillText("LISTO", w - 60, Y + 84); }
  });
}
const tablet = crearTablet(tabTV.t, 0.3, 0.21, 0.62); scene.add(tablet);
const tildeTab = hacerTilde(0.11);
// la bolsa de papel con el queso (para Walter) y la de Graciela
const bolsaW = crearBolsaPapel(); scene.add(bolsaW); bolsaW.scale.setScalar(0.85);
const bolsaG = crearBolsaPapel(); scene.add(bolsaG); bolsaG.scale.setScalar(0.85);
for (const b of [bolsaW, bolsaG]) { const q = crearQueso(); q.scale.setScalar(0.9); q.position.set(0, 0.2, 0); q.rotation.set(0.3, 0.4, 0.2); b.add(q); const y = crearYerba(); y.scale.setScalar(0.75); y.position.set(0.05, 0.13, -0.01); y.rotation.y = 0.2; if (b === bolsaG) b.add(y); }
// las filas fantasma de s08 (puntos navy desde el celular, la puerta y la laptop hasta Rubén)
const laptop = new THREE.Group(); scene.add(laptop);
{
  laptop.add(mesh(rbox(0.34, 0.016, 0.24, 0.01), M.navy3));
  const sc = new THREE.Group(); sc.position.set(0, 0.008, -0.115); sc.rotation.x = -0.25; laptop.add(sc);
  sc.add(mesh(rbox(0.34, 0.23, 0.012, 0.01), M.navy3, 0, 0.115, 0));
  const wt = tex(512, 340, (x, w, h) => { x.fillStyle = "#f6f4ea"; x.fillRect(0, 0, w, h); x.fillStyle = NAV0; x.fillRect(0, 0, w, 60); x.fillStyle = VER; rr(x, 40, 100, 200, 140, 16); x.fillStyle = "#c9c7b9"; rr(x, 270, 110, 200, 24, 12); rr(x, 270, 160, 160, 24, 12); x.fillStyle = NAV; rr(x, 270, 220, 150, 50, 14); });
  sc.add(mesh(new THREE.PlaneGeometry(0.31, 0.2), new THREE.MeshBasicMaterial({ map: wt, toneMapped: false }), 0, 0.115, 0.0065));
  laptop.position.set(MOST.x + 0.4, MOST.y, MOST.z - 0.12); laptop.rotation.y = -0.35;
  sh(laptop);
}
const sinNum = ["WHATSAPP", "MOSTRADOR", "WEB"].map((e) => { const t = hacerTicket("?", "malo|" + e, 0.3, 0.42, 0.02); scene.add(t); return t; });
// la burbuja que vuela de la casa de Graciela al celular de Rubén
const burbTex = tex(680, 480, (x, w, h) => burbuja(x, 40, 30, true));
const burbujaV = mesh(new THREE.PlaneGeometry(0.68, 0.48), new THREE.MeshBasicMaterial({ map: burbTex, transparent: true, toneMapped: false, side: THREE.DoubleSide })); scene.add(burbujaV);
// tickets que escupe el numerador de Rubén (s12) y vuelan a la tablet
const tkVuelan = [23, 24, 25].map((n) => { const t = hacerTicket(n, n === 23 ? "verde" : "", 0.1, 0.14, 0.005); scene.add(t); return t; });

// ================= ZONA G: la casa de Graciela =================
const casaG = new THREE.Group(); scene.add(casaG);
{
  casaG.add(mesh(new THREE.PlaneGeometry(8, 4.4), mat(0x2c4268, 0.9), OG.x, 2.2, -1.4));
  casaG.add(mesh(rbox(1.3, 1.5, 0.08, 0.03), M.cr, OG.x + 0.85, 1.75, -1.36));
  casaG.add(mesh(new THREE.PlaneGeometry(1.14, 1.34), new THREE.MeshBasicMaterial({ color: 0xc9dbef }), OG.x + 0.85, 1.75, -1.31));
  casaG.add(mesh(rbox(0.05, 1.34, 0.04, 0.01, 1), M.cr, OG.x + 0.85, 1.75, -1.29));
  // sillón verde
  const sm = mat(0x4fb81a, 0.6);
  casaG.add(mesh(rbox(1.2, 0.42, 0.8, 0.1), sm, OG.x - 0.15, 0.25, -0.75));
  casaG.add(mesh(rbox(1.2, 0.7, 0.22, 0.1), sm, OG.x - 0.15, 0.7, -1.08));
  for (const s of [-1, 1]) casaG.add(mesh(rbox(0.2, 0.6, 0.8, 0.08), sm, OG.x - 0.15 + s * 0.62, 0.4, -0.75));
  // lámpara de pie
  casaG.add(mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.03, 24), M.navy, OG.x - 1.1, 0.015, -0.9));
  casaG.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.5, 12), M.navy, OG.x - 1.1, 0.77, -0.9));
  casaG.add(mesh(new THREE.CylinderGeometry(0.16, 0.26, 0.3, 24, 1, true), mat(C.cr, 0.6, { side: THREE.DoubleSide, emissive: 0xffe9b8, emissiveIntensity: 0.25 }), OG.x - 1.1, 1.6, -0.9));
  const pisG = mesh(new THREE.PlaneGeometry(8, 6), mat(0x1f3254, 0.9), OG.x, 0, 1.4); pisG.rotation.x = -Math.PI / 2; pisG.receiveShadow = true; casaG.add(pisG);
  sh(casaG);
}
const celuG = hacerCelu(0.08, 0.162, "graciela", C.cr2); scene.add(celuG);

// ================= ZONA F: el cierre verde =================
const pisoF = pisoSombra(OF.x, 0, 8, 8, 0.3);
const numF = hacerNumerador(); scene.add(numF);

// ================= TIEMPOS CLAVE =================
const T = {
  sacar: W[7], numero: W[8], s02: S["s02-nadie-te-pase"], despues: W[14], pase: W[16],
  s03: S["s03-por-que"], que: W[18], s04: S["s04-bici"], mit: W[22], bici: W[27],
  s05: S["s05-se-la-llevaban"], llegaron: W[30], llevaban: W[34], antes: W[35],
  s06: S["s06-anos"], anios: W[37], filas: W[39], escribio: W[41],
  s07: S["s07-balanza"], pasen: W[44], muchas: W[45], pesa: W[47], esperar: W[50],
  s08: S["s08-almacen"], fila: W[56], nosv: W[57],
  s09: S["s09-graciela"], pidio: W[61], wapp: W[63],
  s10: S["s10-walter"], vino: W[65], despues2: W[66], fue: W[69],
  s11: S["s11-ruben"], vos: W[72], antes2: W[74],
  s12: S["s12-sistema"], sistema: W[77], cada: W[78], saca: W[80], solo: W[82],
  s13: S["s13-primera"], primera: W[84], ordenamos: W[85], agenda: W[88],
  fin: S["s14-cierre"],
};
T.tira = T.sacar + 0.05;           // la mano corta el ticket
T.vuela = T.s02 - 0.35;            // el 23 vuela a la fila
T.llega = T.s02 + 0.35;            // el 23 grande se para en su lugar
T.cuela = T.despues - 0.1;         // el 31 se mete
T.choca = T.cuela + 0.38;          // rebota en la cinta
T.tapaQ = T.s04 - 0.14;            // el "?" crece y tapa la cámara
T.bicis = [T.llegaron - 0.15, T.llegaron + 0.45, T.llevaban + 0.15];
T.revAbre = T.escribio + 0.05;
T.corteRev = T.s07 - 0.12;         // la cámara entra a la página
T.burbV = T.wapp + 0.2;            // la burbuja vuela hacia cámara
T.vibra = T.s10 + 0.25;
T.daVuelta = T.s11 + 0.05;
T.tablet = T.s12 + 0.35;
T.tickets = [T.cada - 0.05, T.cada + 0.35, T.saca + 0.1];
T.entrega = T.primera + 0.35;

// ================= CÁMARA =================
// PLANOS: [nombre, desde, [[t, px, py, pz, mx, my, mz, fov], ...]]; dentro de un plano, Hermite monótona; entre planos, corte.
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const a = (x, y, z) => [OA.x + x, y, z], b = (x, y, z) => [OB.x + x, y, z], c = (x, y, z) => [OC.x + x, y, z], r = (x, y, z) => [OR.x + x, y, z], g = (x, y, z) => [OG.x + x, y, z], f = (x, y, z) => [OF.x + x, y, z];
let PLANOS = null;
function armarPlanos() {
  const tk23 = FILA[2].p, dsp = DISP_A;
  const celuGp = () => celuG.userData.base;
  return [
    // s01-s03: el numerador → la fila de tickets → el display TURNO → el "?"
    ["A", 0, [
      k(0, [NUM_A.x + 0.3, 1.45, NUM_A.z + 2.15], [NUM_A.x, 1.4, NUM_A.z]),
      k(T.tira, [NUM_A.x + 0.25, 1.36, NUM_A.z + 1.85], [NUM_A.x, 1.28, NUM_A.z]),
      k(T.vuela + 0.05, [NUM_A.x + 0.3, 1.3, NUM_A.z + 1.85], [NUM_A.x + 0.1, 1.15, NUM_A.z + 0.1]),
      k(T.llega + 0.15, a(1.8, 2.7, 5.2), a(1.35, 0.5, 0.35)),
      k(T.choca, a(1.85, 2.75, 5.35), a(1.35, 0.55, 0.3)),
      k(T.pase + 0.2, a(1.75, 2.8, 5.1), a(1.3, 0.8, 0.0)),
      k(T.s03 + 0.05, a(1.6, 2.0, 3.4), [dsp.x, 1.55, dsp.z]),
      k(T.que + 0.3, [dsp.x + 0.05, dsp.y - 0.05, dsp.z + 2.6], [dsp.x, dsp.y - 0.05, dsp.z]),
      k(T.s04, [dsp.x + 0.02, dsp.y - 0.05, dsp.z + 2.0], [dsp.x, dsp.y - 0.05, dsp.z]),
    ]],
    // s04-s05: del puño verde del manubrio a la ventanilla; el recibo N.º 2; pasan las bicis
    ["B", T.s04, [
      k(T.s04, [BICI_B.x + 0.33, 1.1, BICI_B.z - 0.25 + 0.55], [BICI_B.x + 0.33, 1.03, BICI_B.z - 0.25]),
      k(T.s04 + 0.35, b(-0.6, 1.75, 4.6), b(-0.8, 1.38, -0.6)),
      k(T.bici, b(-0.55, 1.8, 6.3), b(-0.75, 1.36, -0.3)),
      k(T.s05 + 0.2, b(-0.5, 1.75, 6.5), b(-0.72, 1.32, -0.2)),
      k(T.antes + 0.3, b(-0.55, 1.72, 6.1), b(-0.72, 1.3, -0.1)),
      k(T.s06, b(-0.55, 1.72, 6.0), b(-0.72, 1.3, -0.1)),
    ]],
    // s06: grúa sobre la serpentina; baja a la revista y entra a la página
    ["C", T.s06, [
      k(T.s06, c(0.0, 4.2, 7.8), c(0, 0.3, -0.9)),
      k(T.anios + 0.3, c(0.0, 6.2, 7.6), c(0, 0.2, -0.9)),
      k(T.escribio - 0.1, c(0.0, 6.6, 8.2), c(0, 0.1, -0.4)),
      k(T.revAbre + 0.25, [REV.x + 0.2, 3.0, REV.z + 1.4], [REV.x + 0.1, 0, REV.z]),
      k(T.corteRev, [REV.x + 0.5, 0.55, REV.z + 0.12], [REV.x + 0.52, 0.05, REV.z - 0.06]),
    ]],
    // s07: la balanza en el mostrador de Rubén (primer plano); s08: la cámara se aleja y aparece el almacén
    ["R", T.corteRev, [
      k(T.corteRev, [BAL.x + 0.08, BAL.y + 0.45, BAL.z + 1.9], [BAL.x + 0.05, BAL.y + 0.3, BAL.z]),
      k(T.pasen, [BAL.x + 0.03, BAL.y + 0.45, BAL.z + 2.2], [BAL.x + 0.05, BAL.y + 0.3, BAL.z]),
      k(T.pesa - 0.1, [BAL.x + 0.2, BAL.y + 0.48, BAL.z + 2.25], [BAL.x + 0.05, BAL.y + 0.3, BAL.z]),
      k(T.esperar + 0.3, [BAL.x + 0.16, BAL.y + 0.42, BAL.z + 1.95], [BAL.x + 0.05, BAL.y + 0.27, BAL.z]),
      k(T.s08 + 0.05, [BAL.x + 0.12, BAL.y + 0.48, BAL.z + 2.3], [BAL.x + 0.02, BAL.y + 0.3, BAL.z]),
      k(T.fila, r(-0.12, 2.2, 3.4), r(-0.12, 1.22, -0.5)),
      k(T.s09, r(-0.12, 2.2, 3.55), r(-0.12, 1.22, -0.5)),
    ]],
    // s09: Graciela en su casa con el celular (inserto) y la burbuja que sale
    ["G", T.s09, (() => {
      const PG = celuGBase(); const n = V(0, Math.sin(0.55), Math.cos(0.55));
      const cam = (d) => { const p = PG.clone().addScaledVector(n, d); return [p.x, p.y, p.z]; };
      return [
        k(T.s09, g(0.3, 1.6, 3.0), [PG.x, PG.y, PG.z]),
        k(T.pidio - 0.05, cam(0.62), [PG.x, PG.y + 0.05, PG.z]),
        k(T.s10, cam(0.55), [PG.x, PG.y + 0.05, PG.z]),
      ];
    })()],
    // s10: Walter entra, se lleva su bolsa y se va; el celular boca abajo vibra
    ["R2", T.s10, [
      k(T.s10, r(0.95, 1.9, 4.5), r(-0.42, 1.12, 0.0)),
      k(T.fue, r(0.88, 1.88, 4.45), r(-0.48, 1.12, 0.0)),
      k(T.s11 - 0.05, r(0.8, 1.86, 4.4), r(-0.5, 1.12, 0.0)),
    ]],
    // s11: primer plano de Rubén con el celular dado vuelta
    ["R3", T.s11, [
      k(T.s11, r(0.12, 2.1, 1.7), r(0.04, 1.3, -0.4)),
      k(T.vos, r(0.1, 2.08, 1.58), r(0.04, 1.31, -0.4)),
      k(T.s12, r(0.08, 2.07, 1.5), r(0.04, 1.31, -0.4)),
    ]],
    // s12: el celular se vuelve la tablet "Pedidos"; el numerador se prende y le da número a cada pedido
    ["R4", T.s12, [
      k(T.s12, r(-0.18, 2.45, 1.75), r(-0.2, 1.0, 0.05)),
      k(T.tablet + 0.3, r(-0.2, 2.55, 2.2), r(-0.2, 1.0, 0.0)),
      k(T.tickets[2] + 0.45, r(-0.2, 2.5, 2.1), r(-0.2, 1.0, 0.0)),
      k(T.s13, r(-0.03, 1.75, 1.3), r(-0.02, 1.17, 0.1)),
    ]],
    // s13: "Graciela, primera": LISTO en la tablet; plano general: Rubén le da la bolsa a Graciela
    ["R5", T.s13, [
      k(T.s13, r(-0.03, 1.75, 1.3), r(-0.02, 1.17, 0.1)),
      k(T.primera + 0.4, r(-0.03, 1.73, 1.22), r(-0.02, 1.17, 0.1)),
    ]],
    ["R6", T.primera + 0.4, [
      k(T.primera + 0.4, r(-0.35, 2.0, 4.2), r(-0.35, 1.18, -0.1)),
      k(T.fin, r(-0.35, 2.05, 4.7), r(-0.35, 1.18, -0.1)),
    ]],
    ["F", T.fin, [
      k(T.fin, f(0.0, 0.45, 3.0), f(0.0, 0.17, 0)),
      k(DUR, f(0.0, 0.45, 2.85), f(0.0, 0.17, 0)),
    ]],
  ];
}
const _mira = new THREE.Vector3();
let plano = "A";
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
    if (hh <= 0) { vv.push(a0[cc]); continue; }
    vv.push((2 * s3 - 3 * s2 + 1) * a0[cc] + (s3 - 2 * s2 + u) * hh * tang(i, cc) + (-2 * s3 + 3 * s2) * b0[cc] + (s3 - s2) * hh * tang(i + 1, cc));
  }
  camera.position.set(vv[0], vv[1], vv[2]);
  const amp = 0.002;
  camera.position.x += Math.sin(t * 0.7) * amp; camera.position.y += Math.sin(t * 0.53) * amp;
  _mira.set(vv[3], vv[4], vv[5]);
  camera.fov = vv[6];
  const dd = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.01, dd * 0.03); camera.far = 260;
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  camera.updateMatrixWorld(true);
}
function delante(dist, dx = 0, dy = 0) {
  const fw = new THREE.Vector3(); camera.getWorldDirection(fw);
  const der = new THREE.Vector3().crossVectors(fw, camera.up).normalize();
  const arr = new THREE.Vector3().crossVectors(der, fw).normalize();
  const th = Math.tan((camera.fov * Math.PI) / 360) * dist;
  return camera.position.clone().add(fw.multiplyScalar(dist)).add(der.multiplyScalar(dx * th * camera.aspect)).add(arr.multiplyScalar(dy * th));
}
const _v = new THREE.Vector3(), _q = new THREE.Quaternion();

// ================= ZONA A en el tiempo =================
function zonaA(t) {
  const en = plano === "A";
  fiambreria.visible = pisoA.visible = numA.visible = posteNum.visible = en;
  filaTk.forEach((x) => (x.visible = en)); colado.visible = en; displayA.visible = en; mano.visible = false; preguntaA.visible = false;
  postesA.forEach((p) => (p.visible = en)); cintaA.visible = en;
  if (!en) return;
  numA.position.copy(NUM_A); numA.rotation.set(0, 0.32, 0); prender(numA, 1);
  // el ticket 23: cuelga; la mano lo corta en "sacar" y vuela a la fila
  const tk = numA.userData.tk;
  const u = sg(t, T.tira, T.tira + 0.18);
  const vuela = sg(t, T.vuela, T.llega);
  if (t < T.tira) { tk.position.set(0, -0.29, 0.2); tk.rotation.set(-0.18 + Math.sin(t * 3) * 0.04, 0, Math.sin(t * 2.2) * 0.05); tk.scale.setScalar(1); tk.visible = true; }
  else { tk.visible = false; }
  // el ticket suelto (vive en la mano y después vuela): usamos el 23 de la fila
  const t23 = filaTk[2];
  const baseQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.05, 0));
  // la mano: entra por la izquierda, agarra el ticket, tira hacia adelante
  const llegaMano = eo(sg(t, T.sacar - 0.5, T.tira));
  const tira = eio(sg(t, T.tira, T.tira + 0.3));
  const sale = eio(sg(t, T.vuela - 0.05, T.vuela + 0.3));
  mano.visible = t > T.sacar - 0.52 && sale < 1;
  numA.updateMatrixWorld(true);
  const pTk = numA.localToWorld(V(0, -0.33, 0.24));
  const pMano = lerpV(V(pTk.x - 0.7, pTk.y - 0.15, pTk.z + 0.3), V(pTk.x - 0.03, pTk.y - 0.02, pTk.z + 0.03), llegaMano);
  pMano.add(V(0.12 * tira, 0.06 * tira, 0.22 * tira)).add(V(-0.9 * sale, -0.2 * sale, 0.2 * sale));
  mano.position.copy(pMano); mano.rotation.set(0, 0.35 - 0.3 * tira, -0.2);
  // posiciones de la fila (fichas de dominó de pie)
  FILA.forEach(({ n, p }, i) => {
    const o = filaTk[i];
    const kk = i === 2 ? 1 : popIn(t, T.vuela + 0.05 + Math.abs(i - 2) * 0.06, 0.3);
    o.position.set(p.x, 0.36, p.z); o.quaternion.copy(baseQ); ocultar(o, Math.max(0.001, kk));
    o.userData.poner(n, i === 2 && t > T.pase + 0.05 ? "verde" : "");
  });
  // el 23: en la mano → vuela y crece hasta su lugar
  if (t < T.llega) {
    if (t < T.tira) { t23.visible = false; }
    else {
      t23.visible = true;
      const enMano = pMano.clone().add(V(0.08, 0.0, 0.06));
      if (t < T.vuela) { t23.position.copy(enMano); t23.rotation.set(-0.1, 0.4, 0); t23.scale.setScalar(0.34); }
      else {
        const dest = V(FILA[2].p.x, 0.36, FILA[2].p.z);
        const uu = eio(vuela);
        t23.position.copy(lerpV(enMano, dest, uu)); t23.position.y += Math.sin(Math.PI * uu) * 0.5;
        t23.quaternion.setFromEuler(new THREE.Euler(-0.1 * (1 - uu), 0.4 + 0.15 * uu + Math.sin(Math.PI * uu) * 1.2, 0)); t23.scale.setScalar(lerp(0.34, 1, uu));
      }
    }
  } else { t23.scale.setScalar(1 + 0.08 * pulso(t, T.pase, 0.3)); }
  // el 31 (borde rojo apagado) se mete por la izquierda entre el 22 y el 23 y rebota contra la cinta
  const p22 = FILA[1].p, p23 = FILA[2].p;
  const gap = V((p22.x + p23.x) / 2, 0.36, (p22.z + p23.z) / 2);
  const desde = V(gap.x + 1.7, 0.36, gap.z + 0.8);
  const contra = V(gap.x + 0.5, 0.36, gap.z + 0.12);
  const uc = eo(sg(t, T.cuela, T.choca));
  const rb = sg(t, T.choca, T.choca + 0.55);
  colado.visible = t > T.cuela - 0.05;
  if (colado.visible) {
    const p = lerpV(desde, contra, uc);
    if (t > T.choca) { p.copy(lerpV(contra, V(contra.x + 0.6, 0.36, contra.z + 0.3), eo(rb))); }
    colado.position.copy(p); colado.rotation.set(0, 0.55 + rebote(t, T.choca, 7, 30, 0.3), rebote(t, T.choca, 6, 24, 0.12));
    colado.scale.setScalar(popIn(t, T.cuela - 0.05, 0.25));
  }
  // la cinta sube del piso entre dos postes (en "después")
  const kp = sg(t, T.cuela - 0.25, T.cuela + 0.05);
  const P1 = V(p22.x + 0.42, 0, p22.z - 0.05), P2 = V(p23.x + 0.42, 0, p23.z + 0.1);
  postesA[0].position.copy(P1); postesA[1].position.copy(P2);
  postesA.forEach((p) => { p.visible = kp > 0.01; p.scale.set(1, Math.max(0.01, bk(kp)), 1); });
  ponerCinta(cintaA, P1, P2, 0.9 * bk(kp), kp > 0.6 ? 1 : 0);
  if (t > T.choca) cintaA.position.y += rebote(t, T.choca, 9, 40, 0.03);
  // display TURNO: 22 → 23 en "pase"; en "qué" los dígitos se van y sale el "?"
  displayA.position.copy(DISP_A); displayA.rotation.set(0.08, 0, 0);
  const flip = sg(t, T.pase - 0.05, T.pase + 0.15);
  displayA.userData.poner(t < T.pase + 0.05 ? "22" : "23");
  displayA.userData.dig.scale.set(1, Math.max(0.02, Math.abs(Math.cos(Math.PI * flip))), 1);
  const kq = t < T.que - 0.05 ? 0 : bk(sg(t, T.que - 0.05, T.que + 0.25));
  if (kq > 0) displayA.userData.dig.scale.setScalar(Math.max(0.001, 1 - kq));
  preguntaA.visible = kq > 0.01;
  if (preguntaA.visible) {
    const tapa = eio(sg(t, T.tapaQ, T.s04));
    preguntaA.position.set(DISP_A.x, DISP_A.y - 0.08 + 0.1 * kq, DISP_A.z + 0.35 + 0.9 * tapa);
    preguntaA.rotation.set(0, Math.sin((t - T.que) * 2.4) * 0.25 + tapa * 2.2, 0);
    preguntaA.scale.setScalar(0.75 * kq * (1 + tapa * 0.35));
  }
}

// ================= ZONA B en el tiempo =================
function zonaB(t) {
  const en = plano === "B";
  zonaBG.visible = pisoB.visible = biciB.visible = recibo.visible = en;
  bicis.forEach((x) => (x.visible = false)); flechas.forEach((x) => (x.visible = false)); preguntaB.visible = false;
  if (!en) return;
  biciB.position.copy(BICI_B); biciB.rotation.set(0, 0.12, 0);
  // el recibo N.º 2 (borde verde, se pone gris cuando pasa la tercera bici)
  const gris = t > T.bicis[2] + 0.45;
  recibo.userData.poner(2, gris ? "gris" : "verde");
  const kr = popIn(t, T.s04 + 0.45, 0.3);
  recibo.position.set(OB.x - 0.72, 0.36 - (gris ? 0.03 * eo(sg(t, T.bicis[2] + 0.45, T.bicis[2] + 0.8)) : 0), 1.25);
  recibo.rotation.set(0, 0.05, gris ? -0.08 * eo(sg(t, T.bicis[2] + 0.45, T.bicis[2] + 0.8)) : 0);
  ocultar(recibo, kr);
  // las bicis de los que llegaron después: salen por la puerta, pasan por delante en diagonal y se van de cuadro
  bicis.forEach((bk2, j) => {
    const t0 = T.bicis[j];
    const u = sg(t, t0, t0 + 1.35);
    bk2.visible = u > 0 && u < 1;
    if (!bk2.visible) return;
    const A0 = V(OB.x + 0.85, 0, PARED_B - 0.7), A1 = V(OB.x + 0.7, 0, 0.3), A2 = V(OB.x - 3.4, 0, 0.45);
    const p = u < 0.3 ? lerpV(A0, A1, u / 0.3) : lerpV(A1, A2, (u - 0.3) / 0.7);
    bk2.position.copy(p);
    const dir = u < 0.3 ? A1.clone().sub(A0) : A2.clone().sub(A1);
    bk2.rotation.set(0, Math.atan2(-dir.z, dir.x), 0);
    const giro = -(u * 9);
    bk2.userData.ra.rotation.z = giro; bk2.userData.rd.rotation.z = giro;
  });
  // flechitas rojas: una por cada bici que pasa adelante (sin número)
  flechas.forEach((fl, j) => {
    const kk = t < T.bicis[j] + 0.75 ? 0 : popIn(t, T.bicis[j] + 0.75, 0.25);
    fl.visible = kk > 0.01; if (!fl.visible) return;
    fl.position.set(OB.x - 0.98 + j * 0.26, 0.98, 1.25); fl.rotation.set(0, 0, -Math.PI / 2 + 0.0); fl.scale.setScalar(0.3 * kk);
  });
  // el "?" que tapó la cámara se aleja y queda como el puño verde
  const ab = sg(t, T.s04, T.s04 + 0.3);
  preguntaB.visible = ab < 1;
  if (preguntaB.visible) {
    const pq = delante(0.25 + ab * 0.4, 0, 0);
    preguntaB.position.copy(pq); preguntaB.quaternion.copy(camera.quaternion); preguntaB.rotateY(2.2 + ab * 1.5);
    preguntaB.scale.setScalar(0.5 * (1 - ab) + 0.001);
  }
}

// ================= ZONA C en el tiempo =================
function zonaC(t) {
  const en = plano === "C";
  zonaCG.visible = pisoC.visible = revista.visible = en;
  serpTk.forEach((x) => (x.visible = en));
  if (!en) return;
  // los tickets avanzan por la serpentina, en orden (fila única)
  const avance = (t - T.s06) * 0.035;
  serpTk.forEach((o, i) => {
    const u = cl(0.04 + i * 0.07 + avance, 0, 0.999);
    const p = CAM_SERP.getPointAt(u), tg = CAM_SERP.getTangentAt(u);
    o.position.set(p.x, 0.31, p.z); o.rotation.set(-0.45, 0, 0);
    o.userData.poner(10 + i, "");
  });
  revista.position.copy(REV); revista.rotation.set(0, 0, 0);
  revista.userData.bis.rotation.z = Math.PI * eio(sg(t, T.revAbre, T.revAbre + 0.45)) * 0.98;
}

// ================= ZONA R en el tiempo =================
const enR = () => plano[0] === "R";
function bocaRuben(t) { const i = Math.round((t - BOCA.t0) * BOCA.fps); return i >= 0 && i < BOCA.v.length ? BOCA.v[i] : 0; }
function zonaR(t) {
  const en = enR();
  almacen.visible = pisoR.visible = termo.visible = en; ruben.raiz.visible = en; mateR.visible = en; numR.visible = patasNum.visible = en;
  displayR.visible = balanza.visible = celuR.visible = laptop.visible = en; tablet.visible = false; tildeTab.visible = false;
  bolsaW.visible = bolsaG.visible = false; graciela.raiz.visible = false; walter.raiz.visible = false; burbujaV.visible = false;
  tkVuelan.forEach((x) => (x.visible = false)); sinNum.forEach((x) => (x.visible = false));
  if (!en) return;
  // ---- el numerador y el display (apagados hasta "sistema") ----
  const on = sg(t, T.sistema - 0.1, T.sistema + 0.15);
  numR.position.copy(NUM_R); numR.rotation.set(0, 0.25, 0); prender(numR, on);
  numR.scale.setScalar(0.62 * (1 + 0.08 * pulso(t, T.sistema - 0.1, 0.3)));
  patasNum.position.set(NUM_R.x, MOST.y + 0.05, NUM_R.z);
  displayR.position.copy(DISP_R); displayR.rotation.set(0, 0, 0);
  displayR.userData.poner(on > 0.5 ? "23" : "00", on > 0.5);
  // ---- la balanza (s07) ----
  balanza.position.copy(BAL); balanza.rotation.set(0, -0.12, 0);
  const baja = t < T.pesa ? 0 : eo(sg(t, T.pesa, T.pesa + 0.35));
  const ang = Math.sin(t * 2.3) * 0.06 * (1 - baja) - 0.32 * baja + rebote(t, T.pesa + 0.35, 6, 18, 0.05);
  brazoBal.rotation.z = ang; platos.forEach((p) => (p.rotation.z = -ang));
  balanza.userData.disp.material.map = dispBalT[baja > 0.5 ? 1 : 0];
  const kc0 = t < T.s07 + 0.1 ? 0 : popIn(t, T.s07 + 0.1, 0.3), kc1 = t < T.pasen - 0.1 ? 0 : popIn(t, T.pasen - 0.1, 0.3);
  const saleC = 1 - sg(t, T.s08 + 0.25, T.s08 + 0.5);
  ocultar(cargas[0], kc0 * saleC); ocultar(cargas[1], kc1 * saleC);
  if (t < T.s07) { cargas[0].visible = cargas[1].visible = false; }
  // ---- Rubén ----
  const aC = { x: RX, y: 0, z: RZ, giro: 0 };
  const pr = poseEn(t, [
    [0, { ...aC, ...CARA.neutra, ...BRAZOS.apoyado, manoI: [0.24, 0.52, 0.4], codoI: [1, -0.5, -0.2], cabeza: { giro: 0.0, asiente: 0.04, ladea: 0.05 }, ojos: { x: 0, y: -0.1, abiertos: 1 } }],
    // s08: toma mate tranquilo
    [T.s08 + 0.3, { ...CARA.sonrisa, cabeza: { giro: 0.1, asiente: 0.0, ladea: 0.08 } }, 0.3],
    // "la fila no se ve": mira a cámara, tranquilo
    [T.nosv, { cabeza: { giro: -0.15, asiente: 0.05, ladea: 0.02 }, ojos: { x: 0, y: 0 } }, 0.3],
    // s10: atiende a Walter (mira a la izquierda), le da la bolsa
    [T.s10 + 0.1, { ...CARA.sonrisa, giro: -0.4, cabeza: { giro: -0.35, asiente: 0.0 }, ojos: { x: -0.4, y: 0 }, manoI: [0.24, 0.52, 0.4] }, 0.2],
    [T.despues2 + 0.1, { manoD: [-0.1, 0.42, 0.5], codoD: [-0.8, -0.5, -0.1] }, 0.25],
    [T.fue, { manoD: [-0.3, 0.32, 0.36], codoD: null }, 0.25],
    // s11: agarra el celular, lo da vuelta; "¿Graciela?" sorpresa; "¿Vos estabas antes?" mano a la nuca
    [T.s11 + 0.05, { ...CARA.sorpresa, giro: 0, manoD: [-0.08, 0.5, 0.38], codoD: [-0.8, -0.6, -0.1], manoI: [0.26, 0.42, 0.36], codoI: null, cabeza: { giro: 0.0, asiente: 0.25, ladea: 0 }, ojos: { x: 0.1, y: -0.6, abiertos: 1 }, cejas: { alto: 1, ang: 0.3 } }, 0.3],
    [T.vos, { ...CARA.incredula, ojos: { x: 0.1, y: -0.2, abiertos: 0.9 }, cejas: { alto: 0.55, ang: 0.8, asim: 0.3 }, boca: { sonrisa: -0.3, ancho: 0.85 }, cabeza: { giro: 0.05, asiente: 0.1, ladea: -0.1 } }, 0.3],
    // s12: apoya el celular y mira la tablet
    [T.s12 + 0.25, { ...CARA.esperanza, manoD: [-0.25, 0.34, 0.4], codoD: null, manoI: [0.26, 0.38, 0.38], cabeza: { giro: 0.1, asiente: 0.3, ladea: 0 }, ojos: { x: 0, y: -0.7, abiertos: 1 } }, 0.3],
    // s13: le da la bolsa a Graciela, contento
    [T.primera + 0.4, { ...CARA.feliz, giro: -0.45, cabeza: { giro: -0.35, asiente: 0.0 }, ojos: { x: -0.4, y: 0, abiertos: 1, feliz: 0.5 }, manoI: [0.12, 0.45, 0.48], codoI: [0.8, -0.5, -0.1] }, 0.3],
  ]);
  pr.t = t;
  pr.x = RX + 0.9 * eio(sg(t, T.s12 + 0.1, T.s12 + 0.5)) * (1 - eio(sg(t, T.primera + 0.05, T.primera + 0.38)));
  if (t > BOCA.t0 - 0.05 && t < T.s12) { const bb = bocaRuben(t); pr.boca.abierta = Math.max(pr.boca.abierta, bb * 0.6); pr.boca.ancho = lerp(pr.boca.ancho, 0.75, bb); }
  // s11: sostiene el celular con las dos manos (a los costados de la pantalla)
  const sost = eio(sg(t, T.daVuelta + 0.1, T.daVuelta + 0.45)) * (1 - eio(sg(t, T.s12, T.s12 + 0.3)));
  if (sost > 0) {
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const hd = CELU_V.clone().add(V(-0.22, -0.1, -0.05)), hi = CELU_V.clone().add(V(0.22, -0.1, -0.05));
    ruben.cuerpo.worldToLocal(hd); ruben.cuerpo.worldToLocal(hi);
    pr.manoD = pr.manoD.map((v, i) => lerp(v, [hd.x, hd.y, hd.z][i], sost)); pr.codoD = [-1, -0.5, -0.1];
    pr.manoI = pr.manoI.map((v, i) => lerp(v, [hi.x, hi.y, hi.z][i], sost)); pr.codoI = [1, -0.5, -0.1];
  }
  // mano a la nuca en "¿Vos estabas antes?"
  const nuca = eio(sg(t, T.vos - 0.1, T.vos + 0.25)) * (1 - eio(sg(t, T.s12, T.s12 + 0.25)));
  if (nuca > 0) {
    ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
    const h = ruben.cabeza.getWorldPosition(new THREE.Vector3()).add(V(0.17, 0.05, -0.1));
    ruben.cuerpo.worldToLocal(h);
    pr.manoI = pr.manoI.map((v, i) => lerp(v, [h.x, h.y, h.z][i], nuca)); pr.codoI = [1, 0.3, -0.2];
  }
  ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
  ruben.ojoLejano(camera.position);
  // el mate en la mano izquierda (hasta que agarra el celular)
  mateR.visible = t < T.s11 - 0.1 && t > 0;
  if (t > T.s13) mateR.visible = false;
  ruben.mano("I").getWorldPosition(_v); mateR.position.copy(_v).add(V(0.0, -0.075, 0.025)); mateR.rotation.set(0, 0.3 + Math.PI, 0.25);
  // ---- el celular de Rubén: boca abajo; vibra en s10; en s11 lo da vuelta y lo mira; en s12 se vuelve la tablet ----
  celuR.visible = true;
  const vib = t > T.vibra && t < T.s11 ? Math.sin(t * 90) * 0.004 * (Math.floor((t - T.vibra) * 2.5) % 2 === 0 ? 1 : 0) : 0;
  if (t < T.daVuelta) {
    celuR.position.copy(CELU_R).add(V(vib, 0, 0)); celuR.rotation.set(Math.PI / 2, 0, 0.2 + vib * 4);
  } else if (t < T.s12 + 0.15) {
    const u = eio(sg(t, T.daVuelta, T.daVuelta + 0.45));
    celuR.position.copy(lerpV(CELU_R, CELU_V, u)); celuR.position.y += Math.sin(Math.PI * u) * 0.1;
    _q.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0.2)); const q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.4, 0.0, 0));
    celuR.quaternion.copy(_q).slerp(q2, u);
    celuR.scale.setScalar(lerp(1, KCV, u));
  } else {
    const u = eio(sg(t, T.s12 + 0.15, T.tablet));
    const dest = V(MOST.x - 0.02, MOST.y + 0.15, MOST.z + 0.1);
    celuR.position.copy(lerpV(CELU_V, dest, u));
    celuR.quaternion.setFromEuler(new THREE.Euler(-0.4, 0, 0));
    celuR.scale.setScalar(lerp(KCV, 1.2, u)); celuR.visible = u < 0.98;
  }
  // ---- s12-s13: la tablet "Pedidos"; los tickets del numerador vuelan a cada fila ----
  const kt = t < T.tablet - 0.1 ? 0 : popIn(t, T.tablet - 0.1, 0.35);
  tablet.visible = kt > 0.01;
  const nFilas = T.tickets.filter((x) => t > x + 0.42).length;
  const listo = t > T.primera;
  const clave = nFilas + "|" + listo;
  if (tabTV.clave !== clave) { tabTV.clave = clave; dibujarTablet(nFilas, listo); tabTV.t.needsUpdate = true; }
  const TABP = V(MOST.x - 0.02, MOST.y, MOST.z + 0.1);
  if (tablet.visible) { tablet.position.copy(TABP); tablet.rotation.set(0, 0.05, 0); tablet.scale.setScalar(kt * 1.6 * (1 + 0.03 * pulso(t, T.primera, 0.3))); }
  tablet.updateMatrixWorld(true);
  const enTab = (px, py, z = 0.008) => tablet.userData.pantalla.localToWorld(V((px / 1024 - 0.5) * 0.3 * 0.92, (0.5 - py / 720) * 0.21 * 0.88, z));
  tkVuelan.forEach((o, i) => {
    const t0 = T.tickets[i];
    const u = sg(t, t0, t0 + 0.42);
    o.visible = u > 0 && u < 1; if (!o.visible) return;
    numR.updateMatrixWorld(true);
    const A0 = numR.localToWorld(V(0, -0.3, 0.25));
    const A1 = enTab(125, 160 + i * 182 + 81, 0.02);
    const p = lerpV(A0, A1, eio(u)); p.y += Math.sin(Math.PI * u) * 0.18;
    o.position.copy(p); o.rotation.set(-0.4, Math.sin(u * 6) * 0.6, 0); o.scale.setScalar(lerp(0.6, 0.35, u));
  });
  const kti = t < T.primera + 0.02 ? 0 : popIn(t, T.primera + 0.02, 0.3);
  ocultar(tildeTab, kti * 0.2);
  if (tildeTab.visible) { tildeTab.position.copy(enTab(640, 160 + 81, 0.03)); tablet.userData.pantalla.getWorldQuaternion(tildeTab.quaternion); }
  // ---- s08: tres filas que no se ven (celular, mostrador, laptop): un ticket "?" rojo apagado sobre cada una, sin número ----
  sinNum.forEach((o) => (o.visible = false));
  if (plano === "R" && t > T.s08) {
    const lugares = [V(CELU_R.x + 0.02, MOST.y + 0.36, CELU_R.z + 0.08), V(OR.x - 0.5, 1.5, 0.45), V(OR.x + 0.42, MOST.y + 0.5, 0.0)];
    lugares.forEach((p, j) => {
      const t0 = T.fila + j * 0.14;
      const kk = t < t0 ? 0 : popIn(t, t0, 0.3) * (1 - sg(t, T.s09 - 0.15, T.s09));
      const o = sinNum[j]; ocultar(o, kk * 0.55); if (!o.visible) return;
      o.position.copy(p); o.position.y += Math.sin((t - t0) * 3 + j) * 0.015;
      o.quaternion.copy(camera.quaternion); o.rotateZ(Math.sin((t - t0) * 2.2 + j) * 0.12);
    });
  }
  // ---- s09-s10: la burbuja de Graciela llega al celular boca abajo ----
  if (plano === "R2" && t < T.vibra + 0.1) {
    const u = eio(sg(t, T.s10, T.vibra));
    burbujaV.visible = u < 0.98;
    burbujaV.position.copy(lerpV(delante(0.6, 0.1, 0.1), V(CELU_R.x, CELU_R.y + 0.02, CELU_R.z), u));
    burbujaV.quaternion.copy(camera.quaternion); burbujaV.scale.setScalar(lerp(0.5, 0.05, u));
  }
  // ---- s10: Walter entra, se lleva la bolsa y se va ----
  if (plano === "R2") {
    walter.raiz.visible = true;
    const ent = eio(sg(t, T.s10 - 0.3, T.s10 + 0.45));
    const vuelve = eio(sg(t, T.fue - 0.05, T.s11 + 0.2));
    const gira = sg(t, T.fue - 0.25, T.fue + 0.05);
    const pw = poseEn(t, [[0, { ...CARA.sonrisa, paso: 1, manoI: [0.29, -0.08, 0.04], manoD: [-0.29, -0.08, 0.04], cabeza: { giro: 0.0 } }], [T.s10 + 0.5, { paso: 0, ...CARA.feliz, cabeza: { giro: 0.0, asiente: 0.0 } }, 0.2], [T.despues2 + 0.2, { manoD: [-0.2, 0.36, 0.42], codoD: [-0.8, -0.5, -0.1] }, 0.25], [T.fue - 0.1, { paso: 1, manoD: [-0.27, 0.0, 0.1], codoD: null, cabeza: { giro: 0.4 } }, 0.2]]);
    pw.x = lerp(lerp(OR.x - 2.5, OR.x - 0.88, ent), OR.x - 2.9, vuelve); pw.z = 0.55 + 0.15 * vuelve;
    pw.giro = lerp(1.5, -1.6, gira);
    pw.paso = t < T.s10 + 0.4 ? 1 : t > T.fue - 0.1 ? 1 : 0; pw.t = t;
    walter.poner(pw); walter.raiz.updateMatrixWorld(true); walter.ojoLejano(camera.position);
    // la bolsa: en el mostrador → la mano de Walter
    bolsaW.visible = true;
    const toma = t > T.despues2 + 0.25;
    if (!toma) { bolsaW.position.set(MOST.x - 0.62, MOST.y, MOST.z + 0.2); bolsaW.rotation.set(0, 0.3, 0); }
    else { walter.mano("D").getWorldPosition(_v); bolsaW.position.copy(_v).add(V(0, -0.24, 0)); bolsaW.rotation.set(0, pw.giro, 0); }
  }
  // ---- s13: Graciela en el mostrador; Rubén le da su bolsa ----
  if (plano === "R6") {
    graciela.raiz.visible = true;
    const pg = poseEn(t, [[0, { x: OR.x - 0.8, z: 0.62, giro: 1.0, ...CARA.esperanza, manoI: [0.29, -0.08, 0.04], manoD: [-0.29, -0.08, 0.04], cabeza: { giro: 0.1, asiente: 0.0 } }], [T.primera + 0.35, { ...CARA.feliz, cabeza: { giro: 0.25, asiente: 0.0, ladea: 0.06 }, ojos: { feliz: 0.6 } }, 0.25], [T.entrega + 0.35, { manoI: [0.12, 0.42, 0.42], codoI: [0.8, -0.5, -0.1] }, 0.3]]);
    pg.t = t; graciela.poner(pg); graciela.raiz.updateMatrixWorld(true); graciela.ojoLejano(camera.position);
    bolsaG.visible = t > T.primera;
    const u = eio(sg(t, T.entrega, T.entrega + 0.5));
    bolsaG.position.copy(lerpV(V(MOST.x - 0.45, MOST.y, MOST.z + 0.24), V(MOST.x - 0.58, MOST.y, MOST.z + 0.3), u)); bolsaG.rotation.set(0, 0.3, 0);
    bolsaG.scale.setScalar(0.85 * popIn(t, T.primera, 0.3));
  }
  // en el primer plano de la balanza y en el inserto de la tablet, sin personajes delante
  laptop.visible = true;
}

// ================= ZONA G en el tiempo =================
const poseG = (t) => { const pg = poseEn(t, [[0, { x: OG.x, z: 0.0, giro: 0, ...CARA.esperanza, ...BRAZOS.celular, cabeza: { giro: 0.0, asiente: 0.18, ladea: 0.04 }, ojos: { x: 0.05, y: -0.25, abiertos: 1 } }], [T.wapp + 0.1, { ...CARA.sonrisa, cabeza: { giro: 0, asiente: 0.3, ladea: 0.1 }, ojos: { x: 0.05, y: -0.45, abiertos: 1, feliz: 0.3 } }, 0.3]]); pg.t = t; return pg; };
let _celuG = null;
function celuGBase() {
  if (_celuG) return _celuG.clone();
  graciela.poner(poseG(0)); graciela.raiz.updateMatrixWorld(true);
  const a1 = graciela.mano("I").getWorldPosition(new THREE.Vector3()), a2 = graciela.mano("D").getWorldPosition(new THREE.Vector3());
  _celuG = a1.add(a2).multiplyScalar(0.5).add(V(0, 0.13, 0.1));
  return _celuG.clone();
}
function zonaG(t) {
  const en = plano === "G";
  casaG.visible = celuG.visible = en;
  if (!en) { if (plano !== "R5" && plano !== "R4") graciela.raiz.visible = graciela.raiz.visible; return; }
  graciela.raiz.visible = true;
  graciela.poner(poseG(t)); graciela.raiz.updateMatrixWorld(true); graciela.ojoLejano(camera.position);
  celuG.position.copy(celuGBase()); celuG.rotation.set(-0.55, 0, 0);
  celuG.scale.setScalar(1.6);
  // la burbuja sale del celular hacia la cámara (en "WhatsApp")
  const u = eio(sg(t, T.burbV, T.s10));
  burbujaV.visible = t > T.burbV;
  if (burbujaV.visible) {
    celuG.updateMatrixWorld(true);
    const A0 = celuG.localToWorld(enPant(celuG, PP[0] / 2 + 60, 970, 0.012));
    burbujaV.position.copy(lerpV(A0, delante(0.35, 0, 0), u));
    celuG.getWorldQuaternion(_q); burbujaV.quaternion.copy(_q).slerp(camera.quaternion, u);
    burbujaV.scale.setScalar(lerp(0.12, 0.5, u));
  }
}

// ================= ZONA F en el tiempo =================
function zonaF(t) {
  const en = plano === "F";
  numF.visible = pisoF.visible = en;
  if (!en) return;
  const kk = lerp(0.6, 1, bk(sg(t, T.fin - 0.02, T.fin + 0.3)));
  numF.position.set(OF.x, 0, 0); numF.rotation.set(0.05, -0.3 + Math.sin((t - T.fin) * 1.2) * 0.12, 0); numF.scale.setScalar(kk * 0.85);
  prender(numF, 1);
  const tk = numF.userData.tk; tk.visible = true; tk.position.set(0, -0.29, 0.2); tk.rotation.set(-0.18 + Math.sin(t * 3) * 0.05, 0, 0);
}

// ================= ESCENA EN EL TIEMPO =================
let _armado = false;
function renderAt(t) {
  if (!_armado) { _armado = true; PLANOS = armarPlanos(); }
  scene.environmentRotation.y = t * 0.05;
  ponerCamara(t);
  let foco = V(0, 0.5, 0), rad = 2.2;
  if (plano === "A") { foco = V(OA.x + 0.5, 0.5, 0.2); rad = 3.5; }
  else if (plano === "B") { foco = V(OB.x - 0.6, 0.5, 0.5); rad = 4.0; }
  else if (plano === "C") { foco = V(OC.x, 0.5, 0); rad = 5.5; }
  else if (plano[0] === "R") { foco = V(OR.x - 0.6, 0.8, 0.2); rad = 3.2; }
  else if (plano === "G") { foco = V(OG.x, 0.8, 0); rad = 2.2; }
  else if (plano === "F") { foco = OF.clone().add(V(0, 0.4, 0)); rad = 1.2; }
  sol.position.copy(foco).add(V(-2.2, 7, 5)); sol.target.position.copy(foco);
  Object.assign(sol.shadow.camera, { left: -rad, right: rad, top: rad, bottom: -rad, near: 0.5, far: 60 }); sol.shadow.camera.updateProjectionMatrix();
  burbujaV.visible = false;
  zonaA(t);
  zonaB(t);
  zonaC(t);
  zonaR(t);
  zonaG(t);
  zonaF(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e2) => renderAt(e2.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
