// Capa 3D de contable-consultas (Three.js r170 local). Base técnica: reels/contable-papeles (el estudio de Adriana, el
// chat genérico, las tarjetas pegadas a la cámara, la regla de burbujas, la cámara por planos con Catmull-Rom) y
// reels/parrilla-no-vuelve (la parrilla: brasas, tira, chorizos). renderAt(t) es una función pura del tiempo del timeline
// (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   "ESTUDIO ADRIANA" (alrededor del origen): la casona del Cordón de contable-papeles, ahora de mañana: pared navy2 con
//     boiserie crema, damero de calcáreas, ventana alta con postigos, biblioratos, la lámpara de banquero verde, la
//     sumadora; el MONITOR vertical de Adriana (el balance de Súper Héctor y el contador de consultas) y el celular en el
//     soporte; el escritorio de Lucas
//   "PATIO" (x = -40): el patio de la casa de Adriana, domingo 13:30: la parrilla de ladrillo con campana, brasas,
//     chorizos, tira y morrones con huevo; la mesa con mantel a cuadros navy y crema; muro crema con parra
//   "PANADERÍA MARCELO" (x = 40): azulejo blanco con guarda verde, mostrador con vitrina (de contable-papeles)
//   PARTE 1: "Adri, ¿cuándo vence lo mío?" · "El veintitrés, Marcelo." · la ráfaga (Graciela, Walter, Marcelo; 14 → 38 →
//            63; el balance en 3 %) · el asado: "Adri, ¿cuándo comemos?" · "El veintitrés." · la pausa · "Es Marcelo. Que
//            cuándo vence lo suyo." · Adriana cierra los ojos
//   PARTE 2: el mismo audio, contesta el asistente · el chat de Marcelo con sus datos · "¡Uh, qué rápida! Gracias, Adri."
//            · "De nada." · la bandeja del agente (61 contestadas, 2 para Adriana) · el balance llega a 100 % · "¿Ya? ¿El
//            de Héctor?" · "Y el de Walter." · el asado: "Ahora." · "Es Marcelo. Que sos un amor…" · "Sí. Un amor." ·
//            Adriana a cámara: "Comentá CONSULTAS…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, MARCA, CARA, BRAZOS, pegarACamara, crearCelular, crearBandejaBizcochos, crearPanFlauta } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, CORTE, LIMPIO, VER as VERM } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

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

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  gris: mat(0xc9ccd2, 0.35, { metalness: 0.3 }),
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
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const plano = (w, h, tex, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const rr = (x, X, Y, W, H, R) => { x.beginPath(); x.roundRect(X, Y, W, H, R); x.fill(); };
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };

// =====================================================================================================
// "ESTUDIO ADRIANA" (alrededor del origen, piso y = 0): la casona del Cordón (de contable-papeles)
//   pared del fondo (z = -0.7) navy2 con boiserie crema; damero de calcáreas; ventana alta con postigos (x -1,75);
//   dos estanterías de biblioratos (x -0,68 y 0,7); Adriana sentada en (0; 0,42) mirando a +z; el escritorio delante con
//   el teclado, la lámpara de banquero (izquierda de la cámara), el celular en el soporte (adelante) y el MONITOR vertical
//   (derecha de la cámara, el protagonista); el escritorio de Lucas a la derecha
// =====================================================================================================
const OF = new THREE.Group(); scene.add(OF);
const EST = { x0: -2.6, x1: 2.6, z0: -0.7, z1: 4.4, alto: 3.4 };
const MESA_Y = 0.76;
const ADR = { x: 0, z: 0.42 };
const DESK = { x0: -0.72, x1: 0.72, z0: 0.7, z1: 1.36 };
const LAMP = { x: -0.5, z: 0.95 };
const SUM = { x: -0.3, z: 1.2 };
const SOP = { x: 0.2, z: 1.2 };
const TEC = { x: -0.03, z: 0.98 };
const MON = { x: 0.47, z: 0.88, ry: -0.32, W: 0.33, H: 0.53 };   // vertical (el balance y las consultas se leen enteros)
const LUC2 = { x: 1.22, z: 0.1 };
const pantA = lienzo(740, 1290, () => {});    // el celular de Adriana en el soporte (estudio)
const pantAP = lienzo(740, 1290, () => {});   // el celular de Adriana en el patio
const pantMar = lienzo(740, 1290, () => {});  // el celular de Marcelo (Q2)
const pantJ = lienzo(740, 1290, () => {});    // el celular de Jorge
const MW = 800, MH = 1290;
const pantMon = lienzo(MW, MH, () => {});     // el monitor de Adriana (vertical)
let monitor, telA, lampara, luzLamp, pantallaLamp, ventanaFuera, lucasDesk, sillaL;
const TAZAS = [];
const dameroT = lienzo(512, 512, (x, w, h) => {
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? "#1f3254" : "#e6e3d6"; x.fillRect(i * w / 2, j * h / 2, w / 2, h / 2); }
  x.strokeStyle = "#16243d"; x.lineWidth = 6; x.strokeRect(0, 0, w, h); x.beginPath(); x.moveTo(w / 2, 0); x.lineTo(w / 2, h); x.moveTo(0, h / 2); x.lineTo(w, h / 2); x.stroke();
});
dameroT.wrapS = dameroT.wrapT = THREE.RepeatWrapping;
{
  const OW = EST.x1 - EST.x0, OD = EST.z1 - EST.z0, OZ = (EST.z0 + EST.z1) / 2;
  dameroT.repeat.set(OW / 0.8, OD / 0.8);
  const piso = mesh(new THREE.PlaneGeometry(OW, OD), new THREE.MeshStandardMaterial({ map: dameroT, roughness: 0.7 }), 0, 0, OZ); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; OF.add(piso);
  OF.add(cajaS(OW, 0.1, OD, mat(0xe4e2d6, 0.95), 0, EST.alto + 0.05, OZ));
  const paredN = mat(0x16243d, 0.92), boi = mat(0xefeee5, 0.7), boi2 = mat(0xe2dfd0, 0.7);
  const fondo = mesh(new THREE.BoxGeometry(OW, EST.alto, 0.12), paredN, 0, EST.alto / 2, EST.z0 - 0.06); fondo.castShadow = false; OF.add(fondo);
  const boiserie = (x0, x1, z, rotY = 0, xx = null) => {
    const g = new THREE.Group(); g.position.set(xx ?? (x0 + x1) / 2, 0, z); g.rotation.y = rotY; OF.add(g);
    const W = x1 - x0;
    g.add(caja(W, 1.1, 0.03, boi, 0, 0.55, 0.015, 0.004));
    g.add(caja(W, 0.05, 0.06, boi, 0, 1.12, 0.03, 0.01));
    g.add(caja(W, 0.14, 0.05, boi2, 0, 0.07, 0.025, 0.006));
    const n = Math.max(1, Math.round(W / 0.62)), pw = W / n;
    for (let i = 0; i < n; i++) g.add(caja(pw - 0.16, 0.66, 0.018, boi2, -W / 2 + pw * (i + 0.5), 0.58, 0.035, 0.01));
    for (let i = 0; i < n; i++) g.add(caja(pw - 0.22, 0.6, 0.012, boi, -W / 2 + pw * (i + 0.5), 0.58, 0.045, 0.008));
    return g;
  };
  boiserie(EST.x0, EST.x1, EST.z0);
  for (const x of [EST.x0, EST.x1]) { const p = mesh(new THREE.BoxGeometry(0.12, EST.alto, OD), paredN, x, EST.alto / 2, OZ); p.castShadow = false; OF.add(p); boiserie(-OD / 2, OD / 2, 0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0).position.set(x - Math.sign(x) * 0.06, 0, OZ); }
  { const p = mesh(new THREE.BoxGeometry(OW, EST.alto, 0.14), paredN, 0, EST.alto / 2, EST.z1); p.castShadow = false; OF.add(p); boiserie(EST.x0, EST.x1, EST.z1 - 0.07, Math.PI); }
  ventanaFuera = [];
  { const VX = -1.75, VW = 0.8, VY0 = 1.25, VY1 = 3.05;
    const af = mesh(new THREE.PlaneGeometry(VW, VY1 - VY0), new THREE.MeshBasicMaterial({ color: 0x0f1a2e }), VX, (VY0 + VY1) / 2, EST.z0 + 0.005); af.castShadow = false; OF.add(af); ventanaFuera.push(af);
    for (const [w, h, x, y] of [[VW + 0.12, 0.08, VX, VY0], [VW + 0.12, 0.08, VX, VY1], [0.07, VY1 - VY0, VX - VW / 2, (VY0 + VY1) / 2], [0.07, VY1 - VY0, VX + VW / 2, (VY0 + VY1) / 2], [0.05, VY1 - VY0, VX, (VY0 + VY1) / 2], [VW, 0.04, VX, VY0 + 1.1]]) OF.add(caja(w, h, 0.07, M.cr, x, y, EST.z0 + 0.04, 0.008));
    for (const s of [-1, 1]) { const p = new THREE.Group(); p.position.set(VX + s * (VW / 2 + 0.03), 0, EST.z0 + 0.05); p.rotation.y = s * -1.25; OF.add(p);
      p.add(caja(0.4, VY1 - VY0, 0.035, M.cr, s * 0.2, (VY0 + VY1) / 2, 0, 0.008));
      for (let k = 0; k < 9; k++) p.add(caja(0.34, 0.025, 0.02, M.cr2, s * 0.2, VY0 + 0.12 + k * 0.19, 0.022, 0.004)); }
    OF.add(caja(VW + 0.24, 0.05, 0.16, M.cr, VX, VY0 - 0.04, EST.z0 + 0.08, 0.01));
  }
}
// ---- las estanterías metálicas crema de biblioratos (las dos) ----
const LOMOS = ["IVA", "BPS", "SUELDOS", "CLIENTES A-F", "CLIENTES G-M", "2025", "IRAE", "CAJA", "BANCOS", "2024", "BALANCES", "SÚPER HÉCTOR"];
const lomoT = {};
function texLomo(txt) {
  return (lomoT[txt] ??= lienzo(128, 512, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#16243d"; x.lineWidth = 6; x.strokeRect(3, 3, w - 6, h - 6);
    x.save(); x.translate(w / 2, h / 2); x.rotate(-Math.PI / 2); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 800, 84, h - 40); x.fillText(txt, 0, 4); x.restore();
  }));
}
function estanteria(X, sem) {
  const E = new THREE.Group(); E.position.set(X, 0, EST.z0 + 0.2); OF.add(E);
  const W = 1.0, D = 0.34, ys = [0.12, 0.62, 1.12, 1.62, 2.12];
  const metal = mat(0xe6e3d6, 0.45, { metalness: 0.2 });
  for (const x of [-W / 2, W / 2]) for (const z of [-D / 2, D / 2]) E.add(caja(0.03, 2.3, 0.03, metal, x, 1.15, z, 0.004));
  for (const y of ys) E.add(caja(W, 0.025, D, metal, 0, y, 0, 0.004));
  semilla = sem;
  ys.slice(0, 4).forEach((y) => {
    let x = -W / 2 + 0.05;
    while (x < W / 2 - 0.1) {
      const an = 0.075, al = 0.32, verde = az() < 0.35;
      const b = new THREE.Group(); b.position.set(x + an / 2, y + 0.0125 + al / 2, 0.02); b.rotation.z = (az() - 0.5) * 0.04; E.add(b);
      b.add(caja(an, al, 0.28, verde ? mat(0x3fa60a, 0.6) : M.navy3, 0, 0, 0, 0.006));
      b.add(plano(an * 0.62, al * 0.62, texLomo(LOMOS[Math.floor(az() * LOMOS.length)]), 0, 0.02, 0.141));
      b.add(mesh(new THREE.TorusGeometry(0.012, 0.004, 6, 12), M.gris, 0, -al * 0.36, 0.141));
      x += an + 0.006;
    }
  });
  sombras(E);
  return E;
}
estanteria(-0.68, 5); estanteria(0.72, 13);
// ---- el escritorio de Adriana, la silla ----
const MADERA = mat(0x6b4a32, 0.55), MADERA2 = mat(0x5a3c28, 0.6);
function escritorio(x0, x1, z0, z1, m = MADERA, m2 = MADERA2) {
  const g = new THREE.Group();
  const DW = x1 - x0, DD = z1 - z0, CX = (x0 + x1) / 2, CZ = (z0 + z1) / 2;
  g.add(caja(DW, 0.045, DD, m, CX, MESA_Y - 0.022, CZ, 0.012));
  for (const x of [x0 + 0.05, x1 - 0.05]) g.add(caja(0.06, MESA_Y - 0.045, DD - 0.06, m2, x, (MESA_Y - 0.045) / 2, CZ));
  g.add(caja(DW - 0.12, 0.5, 0.025, m2, CX, MESA_Y - 0.3, z1 - 0.04));
  return sombras(g);
}
function silla() {
  const g = new THREE.Group();
  g.add(caja(0.5, 0.07, 0.48, M.navy, 0, 0.47, 0)); g.add(caja(0.46, 0.55, 0.07, M.navy, 0, 0.82, -0.24));
  g.add(cajaS(0.05, 0.4, 0.05, M.gris, 0, 0.24, 0));
  for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; const p = cajaS(0.3, 0.03, 0.04, M.gris, Math.cos(a) * 0.15, 0.04, Math.sin(a) * 0.15); p.rotation.y = -a; g.add(p); }
  return sombras(g);
}
const sillaA = silla(); sillaA.position.set(ADR.x, 0, ADR.z - 0.04); OF.add(sillaA);
OF.add(escritorio(DESK.x0, DESK.x1, DESK.z0, DESK.z1));
// ---- el teclado (navy, teclas crema) ----
{
  const g = new THREE.Group(); g.position.set(TEC.x, MESA_Y, TEC.z); OF.add(g);
  g.add(caja(0.4, 0.018, 0.14, M.navy2, 0, 0.009, 0, 0.006));
  for (let r = 0; r < 4; r++) for (let k = 0; k < 12; k++) g.add(caja(0.026, 0.008, 0.024, M.cr2, -0.165 + k * 0.03, 0.021, -0.045 + r * 0.03, 0.003));
  sombras(g);
}
// ---- LA LÁMPARA DE BANQUERO (de contable-papeles) ----
{
  lampara = new THREE.Group(); lampara.position.set(LAMP.x, MESA_Y, LAMP.z); lampara.rotation.y = 1.3; lampara.scale.setScalar(0.85); OF.add(lampara);
  const br = mat(0x9a7a4a, 0.45, { metalness: 0.45 });
  lampara.add(mesh(new THREE.CylinderGeometry(0.08, 0.095, 0.03, 28), br, 0, 0.015, 0));
  lampara.add(mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.36, 12), br, 0, 0.2, 0));
  lampara.add(mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.12, 10).rotateZ(Math.PI / 2), br, 0, 0.37, 0));
  const verdeL = new THREE.MeshStandardMaterial({ color: 0x5ce611, roughness: 0.35, emissive: 0x2a6a08, emissiveIntensity: 0.55, side: THREE.DoubleSide });
  pantallaLamp = mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.34, 32, 1, true, -Math.PI / 2, Math.PI).rotateZ(Math.PI / 2), verdeL, 0, 0.4, 0.0); pantallaLamp.scale.set(1, 1, 0.82); lampara.add(pantallaLamp);
  for (const s of [-1, 1]) { const tapa = mesh(new THREE.CircleGeometry(0.085, 24, 0, Math.PI), verdeL, s * 0.17, 0.4, 0); tapa.rotation.y = s * Math.PI / 2; tapa.scale.set(0.82, 1, 1); lampara.add(tapa); }
  const foco = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.26, 12).rotateZ(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xfff1c8 }), 0, 0.37, 0); foco.castShadow = false; lampara.add(foco); lampara.userData.foco = foco;
  luzLamp = new THREE.PointLight(0xffd9a0, 2.2, 3.2, 1.6); luzLamp.position.set(0, 0.34, 0.02); lampara.add(luzLamp);
  sombras(lampara); foco.castShadow = false; pantallaLamp.castShadow = false;
}
// ---- la sumadora crema con la tira corta ----
{
  const s = new THREE.Group(); s.position.set(SUM.x, MESA_Y, SUM.z); s.rotation.y = Math.PI - 0.25; OF.add(s);
  const crm = mat(0xe8e4d4, 0.5);
  s.add(caja(0.2, 0.06, 0.24, crm, 0, 0.03, 0, 0.02)); s.add(caja(0.2, 0.05, 0.12, crm, 0, 0.075, -0.05, 0.015));
  for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) s.add(caja(0.032, 0.014, 0.026, k === 3 && i === 3 ? M.g : M.navy3, -0.06 + k * 0.04, 0.066, 0.02 + i * 0.026, 0.005));
  s.add(caja(0.15, 0.02, 0.04, M.navy, 0, 0.11, -0.08, 0.006));
  s.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.07, 20).rotateZ(Math.PI / 2), mat(0xfbfaf4, 0.8), 0, 0.14, -0.1));
  const tira = mesh(new THREE.PlaneGeometry(0.057, 0.3), mat(0xfbfaf4, 0.8, { side: THREE.DoubleSide }), 0, 0.12, -0.2); tira.rotation.x = -1.1; s.add(tira);
  sombras(s);
}
// ---- el MONITOR vertical (navy, sin logo) ----
{
  monitor = new THREE.Group(); monitor.position.set(MON.x, MESA_Y, MON.z); monitor.rotation.y = MON.ry; OF.add(monitor);
  monitor.add(caja(0.06, 0.16, 0.06, M.navy, 0, 0.08, -0.05)); monitor.add(caja(0.22, 0.02, 0.16, M.navy, 0, 0.01, -0.03));
  const Y0 = 0.15;
  monitor.add(caja(MON.W + 0.035, MON.H + 0.035, 0.035, M.navy, 0, Y0 + MON.H / 2, 0, 0.014));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(MON.W, MON.H), new THREE.MeshBasicMaterial({ map: pantMon, toneMapped: false })); pm.position.set(0, Y0 + MON.H / 2, 0.0185); monitor.add(pm);
  monitor.userData.centro = V3(0, Y0 + MON.H / 2, 0.0185);
  sombras(monitor); pm.castShadow = false;
}
// ---- el celular de Adriana en su soporte (navy2), la pantalla a la cámara ----
{
  telA = new THREE.Group(); telA.position.set(SOP.x, MESA_Y, SOP.z); telA.rotation.y = -0.2; OF.add(telA);
  telA.add(caja(0.12, 0.012, 0.1, M.navy3, 0, 0.006, 0, 0.004)); telA.add(caja(0.1, 0.07, 0.012, M.navy3, 0, 0.04, -0.035, 0.004));
  const piv = new THREE.Group(); piv.position.set(0, 0.018, 0.0); piv.rotation.x = -0.38; telA.add(piv);
  const S = 1.45, W = 0.08 * S, H = 0.162 * S;
  piv.add(caja(W + 0.008, H + 0.008, 0.013, mat(0x16243d, 0.5), 0, H / 2, 0, 0.012));
  const sp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: pantA, toneMapped: false })); sp.position.set(0, H / 2, 0.0072); piv.add(sp);
  telA.userData = { piv, sp, centro: V3(0, H / 2, 0.0072), H, W };
  sombras(telA);
}
// ---- las tazas de café (1 → 3 en la ráfaga) ----
for (const [x, z, r] of [[0.66, 1.2, 0.2], [0.42, 1.27, -0.5], [-0.62, 1.22, 1.1]]) {
  const taza = new THREE.Group(); taza.position.set(x, MESA_Y, z); taza.rotation.y = r; OF.add(taza);
  taza.add(mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.1, 18), M.cr, 0, 0.05, 0)); taza.add(mesh(new THREE.TorusGeometry(0.025, 0.008, 8, 14), M.cr, 0.045, 0.055, 0)); taza.add(mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.004, 18), mat(0x4a2e1c, 0.4), 0, 0.096, 0));
  sombras(taza); TAZAS.push(taza);
}
// ---- el escritorio de Lucas (madera clara), su monitor al costado y su taza ----
{
  lucasDesk = new THREE.Group(); OF.add(lucasDesk);
  lucasDesk.add(escritorio(LUC2.x - 0.34, LUC2.x + 0.34, 0.47, 1.03, mat(0xd7c7a8, 0.6), M.navy3));
  const m = new THREE.Group(); m.position.set(LUC2.x + 0.25, MESA_Y, 0.6); m.rotation.y = Math.PI - 0.6; lucasDesk.add(m);
  m.add(caja(0.06, 0.2, 0.06, M.navy, 0, 0.1, -0.03)); m.add(caja(0.36, 0.24, 0.035, M.navy, 0, 0.33, 0, 0.012));
  const taza = new THREE.Group(); taza.position.set(LUC2.x - 0.18, MESA_Y, 0.85); lucasDesk.add(taza);
  taza.add(mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.1, 18), M.g, 0, 0.05, 0)); taza.add(mesh(new THREE.TorusGeometry(0.025, 0.008, 8, 14), M.g, 0.045, 0.055, 0)); taza.add(mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.004, 18), mat(0x4a2e1c, 0.4), 0, 0.096, 0));
  sillaL = silla(); sillaL.position.set(LUC2.x, 0, LUC2.z - 0.04); lucasDesk.add(sillaL);
  sombras(lucasDesk);
}
sombras(OF); pantallaLamp.castShadow = false;
// ---- luces del estudio: mañana (pareja, ventana fría), noche (la lámpara y una general navy baja), tarde (cálida) ----
const nocheAmb = new THREE.HemisphereLight(0x9aa8c8, 0x2a2a35, 0.9); scene.add(nocheAmb);
const nocheKey = new THREE.DirectionalLight(0xffe6c4, 1.1); nocheKey.position.set(-1.2, 3.2, 3.5); nocheKey.target.position.set(0, 0.9, 0.8); nocheKey.castShadow = true; nocheKey.shadow.mapSize.set(2048, 2048); nocheKey.shadow.bias = -0.0008; nocheKey.shadow.radius = 3; Object.assign(nocheKey.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 14 }); scene.add(nocheKey, nocheKey.target);
const diaSol = new THREE.DirectionalLight(0xfff1dc, 2.4); diaSol.position.set(-2.4, 4.2, 3.8); diaSol.target.position.set(0.2, 0.8, 0.8); diaSol.castShadow = true; diaSol.shadow.mapSize.set(2048, 2048); diaSol.shadow.bias = -0.0008; diaSol.shadow.radius = 3; Object.assign(diaSol.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 14 }); scene.add(diaSol, diaSol.target);
const diaCielo = new THREE.HemisphereLight(0xfff8ec, 0x6a6458, 2.5); scene.add(diaCielo);
const diaVentana = new THREE.DirectionalLight(0xdfe8ff, 1.0); diaVentana.position.set(-2.4, 2.6, -0.2); diaVentana.target.position.set(0.4, 1.0, 1.0); scene.add(diaVentana, diaVentana.target);

// =====================================================================================================
// "PATIO" (x = PX2): el patio de la casa de Adriana, domingo 13:30. Piso de baldosas rojo ladrillo apagado (placas
// grandes), muro crema al fondo (z = -1.8) con la parra arriba, cielo crema; la parrilla de ladrillo crema con campana y
// chimenea a la izquierda; la mesa con mantel a cuadros a la derecha; Jorge en la parrilla, Adriana a la mesa
// =====================================================================================================
const PX2 = -40;
const PAT = new THREE.Group(); PAT.position.x = PX2; scene.add(PAT);
const GR = { x: -1.0, z: -1.25, w: 1.25, d: 0.62, base: 0.82 };   // la parrilla (local del patio)
const MESA = { x: 0.78, z: -0.62, w: 1.0, d: 0.74, alto: 0.74 };
const JOR = { x: -0.3, z: -0.55 };                 // Jorge en la parrilla
const ADRP = { x: 0.55, z: -1.1 };                 // Adriana sentada detrás de la mesa
const PAN_T = V3(0.4, MESA.alto + 0.06, -0.4);     // el pan abierto sobre la tabla (donde llega el chorizo)
const HIERRO = mat(0x1d1f24, 0.55, { metalness: 0.35 });
const LADRILLO = (() => {
  const t = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#e2d9c4"; x.fillRect(0, 0, w, h); x.fillStyle = "#c9bea4"; for (let r = 0; r < 8; r++) { x.fillRect(0, r * 64, w, 7); for (let k = 0; k < 4; k++) x.fillRect(((k * 128 + (r % 2) * 64) % w), r * 64, 7, 64); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
})();
const ladrilloM = (rx, ry) => { const t = LADRILLO.clone(); t.needsUpdate = true; t.repeat.set(rx, ry); return new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }); };
const mantelT = lienzo(256, 256, (x, w) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, w); x.fillStyle = "rgba(31,50,84,0.6)"; for (let i = 0; i < 4; i++) { x.fillRect(i * 64, 0, 28, w); x.fillRect(0, i * 64, w, 28); } });
mantelT.wrapS = mantelT.wrapT = THREE.RepeatWrapping; mantelT.repeat.set(2.6, 1.8);
const MANTEL = new THREE.MeshStandardMaterial({ map: mantelT, roughness: 0.9 });
const brasasT = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#d9772f"; x.fillRect(0, 0, w, h); semilla = 11; for (let i = 0; i < 70; i++) { x.fillStyle = i % 3 ? "#5a2c18" : "#8a8278"; x.beginPath(); x.ellipse(az() * w, az() * h, 10 + az() * 22, 7 + az() * 14, az() * 3, 0, 7); x.fill(); } });
const BRASAS = new THREE.MeshStandardMaterial({ map: brasasT, emissive: 0xffffff, emissiveMap: brasasT, emissiveIntensity: 0.85, roughness: 1 });
const BRASA = new THREE.MeshStandardMaterial({ color: 0x2a1a14, emissive: 0xd9772f, emissiveIntensity: 1.0, roughness: 0.9 });
function frustum(w0, d0, w1, d1, h) {
  const g = new THREE.CylinderGeometry(Math.SQRT1_2, Math.SQRT1_2, h, 4, 1, true); g.rotateY(Math.PI / 4);
  const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const top = p.getY(i) > 0; p.setX(i, p.getX(i) * (top ? w1 : w0)); p.setZ(i, p.getZ(i) * (top ? d1 : d0)); }
  g.computeVertexNormals(); return g;
}
// la comida de la parrilla (de parrilla-no-vuelve): la tira con los huesitos, los chorizos con la marca de la parrilla,
// los morrones con huevo
const TIRA_C = mat(0x8a4a22, 0.45), TIRA_T = mat(0x6a3416, 0.5), TIRA_G = mat(0xd9b77a, 0.45), HUESO = mat(0xefe6d0, 0.4), MEDULA = mat(0x9a5a3a, 0.6);
function crearTira(L = 0.5, W = 0.095) {
  const g = new THREE.Group();
  const n = Math.max(2, Math.round(L / 0.07)), paso = L / n;
  g.add(mesh(rbox(L, 0.02, W * 0.92, 0.009, 2), TIRA_T, 0, 0.01, 0));
  for (let i = 0; i < n; i++) {
    const x = -L / 2 + paso * (i + 0.5);
    const b = mesh(new THREE.SphereGeometry(1, 16, 10), i % 2 ? TIRA_C : TIRA_T, x, 0.022, 0); b.scale.set(paso * 0.5, 0.024, W * 0.48); g.add(b);
    const hx = -L / 2 + paso * i + (i === 0 ? paso * 0.12 : 0);
    if (i > 0) { const h = mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.042, 14), HUESO, hx, 0.024, 0); h.scale.z = 2.0; h.scale.x = 0.75; g.add(h);
      const m = mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.002, 10), MEDULA, hx, 0.046, 0); m.scale.z = 2.2; g.add(m); }
  }
  const gr = mesh(new THREE.CylinderGeometry(0.012, 0.012, L * 0.96, 10), TIRA_G, 0, 0.018, -W / 2 + 0.004); gr.rotation.z = Math.PI / 2; g.add(gr);
  return g;
}
const CHORIZO = mat(0x8a3418, 0.35), CHORIZO_C = mat(0x4a1c10, 0.6), CHORIZO_P = mat(0xb06a3a, 0.5);
function crearChorizo(L = 0.2, R = 0.027, curva = 0.03) {
  // el chorizo: tubo dorado con las dos puntas atadas (un nudito claro) y las rayas oscuras de la parrilla
  const g = new THREE.Group();
  const c = new THREE.QuadraticBezierCurve3(V3(-L / 2, 0, 0), V3(0, 0, curva), V3(L / 2, 0, 0));
  g.add(mesh(new THREE.TubeGeometry(c, 16, R, 12, false), CHORIZO, 0, 0, 0));
  for (const [k, s] of [[0, -1], [1, 1]]) { const p = c.getPoint(k); g.add(mesh(new THREE.SphereGeometry(R, 12, 10), CHORIZO, p.x, 0, p.z)); g.add(mesh(new THREE.CylinderGeometry(0.006, 0.009, 0.018, 8).rotateZ(Math.PI / 2), CHORIZO_P, p.x + s * (R + 0.006), 0, p.z)); }
  for (const k of [0.22, 0.42, 0.62, 0.82]) { const p = c.getPoint(k); const ct = caja(0.009, 0.005, R * 1.5, CHORIZO_C, p.x, R * 0.88, p.z, 0.002); ct.rotation.y = 0.5; g.add(ct); }
  return sombras(g);
}
const MORRON = mat(0xb8382a, 0.4), CLARA = mat(0xf6f2e6, 0.5), YEMA = mat(0xf0a81e, 0.35);
function crearMorron() {
  // medio morrón rojo (una cazuela) con el huevo adentro: la clara y la yema de frente
  const g = new THREE.Group();
  const cuenco = mesh(new THREE.SphereGeometry(0.06, 20, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), MORRON, 0, 0.055, 0); cuenco.scale.set(1.25, 0.85, 0.95); cuenco.material.side = THREE.DoubleSide; g.add(cuenco);
  const clara = mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.008, 22), CLARA, 0, 0.05, 0); clara.scale.set(1.15, 1, 0.85); g.add(clara);
  const yema = mesh(new THREE.SphereGeometry(0.024, 16, 10), YEMA, 0.005, 0.054, 0.004); yema.scale.y = 0.6; g.add(yema);
  g.add(mesh(new THREE.CylinderGeometry(0.006, 0.008, 0.03, 8), mat(0x3f6a1e, 0.6), -0.08, 0.06, 0));   // el cabito
  return sombras(g);
}
let pinza, chorizoP, celJ, celAP, platoA, panTabla, choripanPlato, sillaAP;
const PARRILLA_Y = GR.base + 0.11;
{
  // el piso (baldosas grandes rojo ladrillo apagado) y el muro crema con la parra
  const pisoT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#a65f4c"; x.fillRect(0, 0, w, h); x.strokeStyle = "#8a4c3d"; x.lineWidth = 8; x.strokeRect(0, 0, w, h); });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(8 / 0.6, 8 / 0.6);
  const piso = mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0, 0, 1.5); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; PAT.add(piso);
  const muroM = mat(0xe9e3d2, 0.95);
  const muro = mesh(new THREE.BoxGeometry(8, 2.15, 0.2), muroM, 0, 1.075, -1.9); muro.castShadow = false; PAT.add(muro);
  PAT.add(caja(8, 0.08, 0.28, mat(0xd9d2bd, 0.9), 0, 2.17, -1.9, 0.01));   // la cornisa
  for (const s of [-1, 1]) { const p = mesh(new THREE.BoxGeometry(0.2, 2.15, 6), muroM, s * 3.4, 1.075, 1.0); p.castShadow = false; PAT.add(p); }
  // la parra: hojas planas verde oscuro sobre una pérgola de madera (arriba, fuera del alcance de las caras)
  const hojaM = [mat(0x3fa60a, 0.8), mat(0x2f7a12, 0.8), mat(0x4a8a2a, 0.8)];
  const viga = mat(0x7a5a3a, 0.7);
  for (let i = -3; i <= 3; i++) { const v = caja(0.08, 0.08, 2.4, viga, i * 0.95, 2.6, -0.8, 0.01); v.castShadow = false; PAT.add(v); }
  PAT.add(caja(7, 0.1, 0.1, viga, 0, 2.55, -1.85, 0.01));
  semilla = 31;
  for (let i = 0; i < 90; i++) {
    const h = mesh(new THREE.IcosahedronGeometry(0.16 + az() * 0.1, 0), hojaM[i % 3], -3.3 + az() * 6.6, 2.3 + az() * 0.4, -1.95 + az() * 0.9);
    h.scale.y = 0.45; h.castShadow = false; PAT.add(h);
  }
  for (let i = 0; i < 26; i++) { const h = mesh(new THREE.IcosahedronGeometry(0.11 + az() * 0.06, 0), hojaM[i % 3], -3.3 + az() * 6.6, 1.75 + az() * 0.5, -1.76); h.scale.z = 0.4; h.castShadow = false; PAT.add(h); }   // las que caen sobre el muro
  // ---- la parrilla de ladrillo crema: la base, los pilares, la pared de atrás, la campana y la chimenea ----
  const g = new THREE.Group(); g.position.set(GR.x, 0, GR.z); PAT.add(g);
  g.add(mesh(rbox(GR.w + 0.3, GR.base, GR.d + 0.2, 0.02, 2), ladrilloM(2.4, 1.4), 0, GR.base / 2, 0));
  g.add(caja(GR.w + 0.36, 0.05, GR.d + 0.26, mat(0xd3c8ae, 0.85), 0, GR.base + 0.02, 0, 0.01));   // la mesada de cemento
  for (const s of [-1, 1]) g.add(mesh(rbox(0.16, 0.95, GR.d + 0.2, 0.02, 2), ladrilloM(0.4, 1.6), s * (GR.w / 2 + 0.07), GR.base + 0.5, 0));
  g.add(mesh(rbox(GR.w + 0.3, 0.95, 0.14, 0.02, 2), ladrilloM(2.4, 1.6), 0, GR.base + 0.5, -GR.d / 2 - 0.03));
  const camp = mesh(frustum(GR.w * 0.78, GR.d * 0.72, 0.32, 0.26, 0.55), ladrilloM(2, 1), 0, GR.base + 1.25, -0.04); camp.material.side = THREE.DoubleSide; g.add(camp);
  g.add(caja(GR.w + 0.34, 0.09, GR.d + 0.24, mat(0xd3c8ae, 0.85), 0, GR.base + 0.98, 0, 0.01));
  g.add(mesh(rbox(0.42, 1.4, 0.36, 0.02, 2), ladrilloM(0.8, 2.4), 0, GR.base + 2.2, -0.08));
  // las brasas (planas, naranja apagado) y la parrilla de hierro con el marco
  const cama = mesh(new THREE.PlaneGeometry(GR.w - 0.05, GR.d - 0.05), BRASAS, 0, GR.base + 0.05, 0); cama.rotation.x = -Math.PI / 2; cama.castShadow = false; g.add(cama);
  semilla = 21;
  for (let i = 0; i < 18; i++) { const b = mesh(new THREE.DodecahedronGeometry(0.025 + az() * 0.02, 0), BRASA, (az() - 0.5) * (GR.w - 0.15), GR.base + 0.06, (az() - 0.5) * (GR.d - 0.12)); b.scale.y = 0.6; b.castShadow = false; g.add(b); }
  for (let i = 0; i < 26; i++) g.add(caja(0.008, 0.012, GR.d, HIERRO, -GR.w / 2 + 0.06 + i * ((GR.w - 0.12) / 25), PARRILLA_Y, 0, 0.002));
  for (const z of [-GR.d / 2, GR.d / 2]) g.add(caja(GR.w, 0.02, 0.02, HIERRO, 0, PARRILLA_Y, z, 0.004));
  // la carne arriba: dos tiras, tres chorizos, dos morrones con huevo
  const yc = PARRILLA_Y + 0.008;
  for (const [x, z, L] of [[-0.3, -0.16, 0.5], [-0.28, 0.0, 0.46]]) { const t = crearTira(L); t.position.set(x, yc, z); g.add(t); }
  for (let i = 0; i < 3; i++) { const c = crearChorizo(0.2, 0.027, 0.03 * (i % 2 ? 1 : -1)); c.position.set(0.12 + i * 0.075, yc + 0.027, -0.05); c.rotation.y = Math.PI / 2 + (i % 2 ? 0.08 : -0.08); g.add(c); }
  for (let i = 0; i < 2; i++) { const m = crearMorron(); m.position.set(-0.32 + i * 0.2, yc, 0.18); m.rotation.y = 0.3 + i; g.add(m); }
  sombras(g); cama.castShadow = false;
  // la tabla de madera con el pan abierto (al borde izquierdo de la mesa, del lado de Jorge)
  panTabla = new THREE.Group(); panTabla.position.set(PAN_T.x, MESA.alto, PAN_T.z); PAT.add(panTabla);
  panTabla.add(caja(0.34, 0.025, 0.2, mat(0xc49a66, 0.7), 0, 0.012, 0, 0.008));
  const pan = crearPanFlauta(0.26); pan.position.set(0, 0.06, 0); pan.rotation.set(0, Math.PI / 2, 0); panTabla.add(pan);
  sombras(panTabla);
}
// ---- la mesa: madera clara, mantel a cuadros navy y crema; pan en canasta, ensalada, jarra de vino y vasos, platos ----
{
  const g = new THREE.Group(); g.position.set(MESA.x, 0, MESA.z); PAT.add(g);
  const mad = mat(0xd7b98a, 0.65);
  g.add(caja(MESA.w + 0.04, 0.04, MESA.d + 0.04, mad, 0, MESA.alto - 0.02, 0, 0.01));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(caja(0.05, MESA.alto - 0.04, 0.05, mad, sx * (MESA.w / 2 - 0.06), (MESA.alto - 0.04) / 2, sz * (MESA.d / 2 - 0.06), 0.008));
  const mt = mesh(new THREE.BoxGeometry(MESA.w + 0.14, 0.006, MESA.d + 0.14), MANTEL, 0, MESA.alto + 0.003, 0); g.add(mt);
  for (const [w, d, x, z] of [[MESA.w + 0.14, 0.006, 0, (MESA.d + 0.14) / 2], [MESA.w + 0.14, 0.006, 0, -(MESA.d + 0.14) / 2], [0.006, MESA.d + 0.14, (MESA.w + 0.14) / 2, 0], [0.006, MESA.d + 0.14, -(MESA.w + 0.14) / 2, 0]]) g.add(mesh(new THREE.BoxGeometry(w, 0.16, d), MANTEL, x, MESA.alto - 0.075, z));
  const loza = mat(0xf3f1e8, 0.35);
  const plato = (x, z) => { const p = mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.018, 26), loza, x, MESA.alto + 0.015, z); g.add(p); return p; };
  plato(0.1, -0.22); plato(0.35, 0.12);
  // la canasta de pan (mimbre) con pancitos
  const can = new THREE.Group(); can.position.set(0.0, MESA.alto + 0.006, 0.12); g.add(can);
  can.add(mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.07, 18), mat(0xb08c58, 0.85), 0, 0.035, 0));
  for (let i = 0; i < 4; i++) { const p = mesh(new THREE.SphereGeometry(0.05, 12, 8), mat(0xd9a45a, 0.6), Math.cos(i * 1.6) * 0.04, 0.08, Math.sin(i * 1.6) * 0.04); p.scale.set(1.3, 0.7, 1); can.add(p); }
  // la ensalada: bol crema con lechuga y tomate
  const bol = new THREE.Group(); bol.position.set(-0.3, MESA.alto + 0.006, 0.16); g.add(bol);
  bol.add(mesh(new THREE.SphereGeometry(0.11, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat(0xefeee5, 0.4), 0, 0.09, 0)).scale.y = 0.8;
  semilla = 4; for (let i = 0; i < 9; i++) { const h = mesh(new THREE.IcosahedronGeometry(0.04, 0), i % 3 === 2 ? MORRON : mat(0x5c9a2a, 0.7), (az() - 0.5) * 0.12, 0.1, (az() - 0.5) * 0.12); h.scale.y = 0.5; bol.add(h); }
  // la jarra de vino (vidrio con el vino tinto) y dos vasos
  const vino = mat(0x5a1a24, 0.25);
  const jarra = new THREE.Group(); jarra.position.set(0.28, MESA.alto + 0.006, -0.06); g.add(jarra);
  jarra.add(mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.17, 18), vino, 0, 0.085, 0));
  jarra.add(mesh(new THREE.CylinderGeometry(0.058, 0.066, 0.22, 18, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xdfeaf2, roughness: 0.05, transparent: true, opacity: 0.25, depthWrite: false, side: THREE.DoubleSide }), 0, 0.11, 0));
  jarra.add(mesh(new THREE.TorusGeometry(0.045, 0.01, 8, 16, Math.PI), mat(0xdfeaf2, 0.2), 0.07, 0.12, 0)).rotation.z = -Math.PI / 2;
  for (const [x, z] of [[0.42, -0.2], [-0.05, -0.25]]) { const v = new THREE.Group(); v.position.set(x, MESA.alto + 0.006, z); g.add(v); v.add(mesh(new THREE.CylinderGeometry(0.03, 0.026, 0.05, 14), vino, 0, 0.025, 0)); v.add(mesh(new THREE.CylinderGeometry(0.036, 0.03, 0.1, 14, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xdfeaf2, roughness: 0.05, transparent: true, opacity: 0.25, depthWrite: false, side: THREE.DoubleSide }), 0, 0.05, 0)); }
  sombras(g);
  // las sillas plegables navy
  const plegable = () => { const s = new THREE.Group(); s.add(caja(0.42, 0.04, 0.4, M.navy3, 0, 0.46, 0, 0.01)); s.add(caja(0.42, 0.3, 0.03, M.navy3, 0, 0.78, -0.19, 0.01));
    for (const sx of [-1, 1]) { const a = caja(0.03, 0.9, 0.03, M.gris, sx * 0.2, 0.45, 0, 0.004); a.rotation.x = 0.35; s.add(a); const b = caja(0.03, 0.9, 0.03, M.gris, sx * 0.2, 0.45, 0, 0.004); b.rotation.x = -0.35; s.add(b); } return sombras(s); };
  sillaAP = plegable(); sillaAP.position.set(ADRP.x, 0, ADRP.z - 0.04); PAT.add(sillaAP);
  const s2 = plegable(); s2.position.set(MESA.x + MESA.w / 2 + 0.28, 0, MESA.z + 0.05); s2.rotation.y = -Math.PI / 2; PAT.add(s2);
}
// la pinza de acero (dos varillas que se juntan en el mango) y el chorizo que lleva
{
  pinza = new THREE.Group(); scene.add(pinza);
  const acero = mat(0xb9bec6, 0.3, { metalness: 0.6 });
  for (const s of [-1, 1]) { const v = caja(0.012, 0.006, 0.36, acero, s * 0.012, 0, 0.18, 0.002); v.rotation.y = -s * 0.03; pinza.add(v); const p = caja(0.022, 0.012, 0.035, acero, s * 0.02, 0, 0.355, 0.004); pinza.add(p); }
  pinza.add(caja(0.032, 0.02, 0.1, mat(0x2a1a14, 0.6), 0, 0, -0.02, 0.006));   // el mango
  sombras(pinza);
  chorizoP = crearChorizo(0.2, 0.027, 0.02); scene.add(chorizoP);
}
// el plato de Adriana con el choripán (Q4 y el cierre)
{
  platoA = new THREE.Group(); scene.add(platoA);
  platoA.add(mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.018, 26), mat(0xf3f1e8, 0.35), 0, 0, 0));
  choripanPlato = new THREE.Group(); platoA.add(choripanPlato);
  const pan = crearPanFlauta(0.24); pan.position.set(0, 0.035, 0); pan.rotation.set(0, Math.PI / 2, 0); choripanPlato.add(pan);
  const ch = crearChorizo(0.2, 0.025, 0.0); ch.position.set(0, 0.06, 0); ch.rotation.y = Math.PI / 2; choripanPlato.add(ch);
  sombras(platoA);
}
const patioSol = new THREE.DirectionalLight(0xfff2da, 2.4); patioSol.position.set(PX2 + 2.2, 5, 3.2); patioSol.target.position.set(PX2, 0.8, -0.6); patioSol.castShadow = true; patioSol.shadow.mapSize.set(2048, 2048); patioSol.shadow.bias = -0.0008; patioSol.shadow.radius = 3; Object.assign(patioSol.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 0.5, far: 16 }); scene.add(patioSol, patioSol.target);
const patioCielo = new THREE.HemisphereLight(0xfff6e4, 0x8a6a58, 2.3); scene.add(patioCielo);
const brasaL = new THREE.PointLight(0xff9a50, 1.6, 2.6, 1.6); brasaL.position.set(PX2 + GR.x + 0.3, GR.base + 0.4, GR.z + 0.6); scene.add(brasaL);

// =====================================================================================================
// "PANADERÍA MARCELO" (x = PX): de contable-papeles (azulejo blanco con guarda verde, mostrador con vitrina, canasto)
// =====================================================================================================
const PX = 40;
const PAN = new THREE.Group(); PAN.position.x = PX; scene.add(PAN);
const MOST_Y = 0.98;
let cartelPan;
{
  const W = 5, alto = 2.9;
  const azT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#d9d7cf"; x.fillRect(0, 0, w, h); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = "#f7f7f2"; x.fillRect(i * 128 + 4, j * 128 + 4, 120, 120); } });
  azT.wrapS = azT.wrapT = THREE.RepeatWrapping; azT.repeat.set(W / 0.6, alto / 0.6);
  const pared = mesh(new THREE.PlaneGeometry(W, alto), new THREE.MeshStandardMaterial({ map: azT, roughness: 0.4 }), 0, alto / 2, -0.5); pared.castShadow = false; PAN.add(pared);
  PAN.add(caja(W, 0.1, 0.03, M.g, 0, 1.4, -0.48, 0.006));
  const pisoT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#cfc8b4"; x.fillRect(0, 0, w, h); x.strokeStyle = "#b9b19a"; x.lineWidth = 6; x.strokeRect(0, 0, w, h); });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(W / 0.5, 5 / 0.5);
  const piso = mesh(new THREE.PlaneGeometry(W, 5), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.8 }), 0, 0, 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; PAN.add(piso);
  const mad = mat(0xd7b98a, 0.6);
  PAN.add(caja(2.2, 0.05, 0.62, mad, 0, MOST_Y - 0.025, 0.85, 0.012));
  PAN.add(caja(2.16, MOST_Y - 0.05, 0.56, M.navy3, 0, (MOST_Y - 0.05) / 2, 0.86, 0.01));
  const VX0 = -1.05, VX1 = -0.05;
  const vid = new THREE.Mesh(new THREE.BoxGeometry(VX1 - VX0, 0.34, 0.5), new THREE.MeshPhysicalMaterial({ color: 0xdfeef2, roughness: 0.05, transparent: true, opacity: 0.16, depthWrite: false })); vid.position.set((VX0 + VX1) / 2, MOST_Y + 0.17, 0.85); vid.renderOrder = 3; PAN.add(vid);
  for (const [x, z] of [[VX0, 0.6], [VX1, 0.6], [VX0, 1.1], [VX1, 1.1]]) PAN.add(caja(0.025, 0.34, 0.025, M.gris, x, MOST_Y + 0.17, z, 0.004));
  PAN.add(caja(VX1 - VX0, 0.02, 0.52, M.gris, (VX0 + VX1) / 2, MOST_Y + 0.35, 0.85, 0.004));
  for (const x of [-0.8, -0.3]) { const b = crearBandejaBizcochos(); b.position.set(x, MOST_Y, 0.85); b.scale.setScalar(0.95); PAN.add(b); }
  PAN.add(caja(1.6, 0.04, 0.35, mad, -0.4, 1.12, -0.32, 0.01));
  const can = new THREE.Group(); can.position.set(-0.4, 1.14, -0.32); PAN.add(can);
  can.add(caja(0.7, 0.18, 0.28, mat(0xb08c58, 0.8), 0, 0.09, 0, 0.03));
  for (let i = 0; i < 6; i++) { const f = crearPanFlauta(0.56); f.position.set(-0.2 + i * 0.08, 0.2 + (i % 2) * 0.03, (i % 3 - 1) * 0.06); f.rotation.set(0, 0.2, 0.9 + (i % 2) * 0.12); can.add(f); }
  const cT = lienzo(1024, 220, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#16243d"; x.lineWidth = 16; x.strokeRect(8, 8, w - 16, h - 16); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "PANADERÍA MARCELO", 900, 120, w - 80); x.fillText("PANADERÍA MARCELO", w / 2, h / 2 + 6); });
  cartelPan = plano(0.95, 0.205, cT, 0.32, 1.98, -0.47); PAN.add(cartelPan);
  sombras(PAN); vid.castShadow = false;
}
const solPan = new THREE.DirectionalLight(0xfff4e2, 1.8); solPan.position.set(PX + 1.5, 4, 4); solPan.target.position.set(PX, 0.9, 0.6); solPan.castShadow = true; solPan.shadow.mapSize.set(2048, 2048); solPan.shadow.bias = -0.0008; solPan.shadow.radius = 3; Object.assign(solPan.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 14 }); scene.add(solPan, solPan.target);
const cieloPan = new THREE.HemisphereLight(0xf8f6ef, 0x6a6458, 2.0); scene.add(cieloPan);

// =====================================================================================================
// LOS PERSONAJES (Adriana, Marcelo y Lucas iguales a contable-papeles; Jorge nuevo en ELENCO; Graciela y Walter solo
// para los avatares)
// =====================================================================================================
const adriana = crearPersonaje({ ...DEFECTO, nombre: "Adriana", mejillasBajas: true, piel: PIEL.clara, pelo: 0x5a4a40, peinado: "melena", lentes: MARCA.navy3, lentesFinos: true,
  cejasColor: 0x4a3c34, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true, camisa: 0xf7f7f2, mangas: "largas", cuello: 0xf7f7f2, cuelloBotones: false,
  campera: { color: MARCA.navy3, cuello: MARCA.navy3, cierre: MARCA.navy2, abierta: true }, pantalon: MARCA.navy, zapatos: MARCA.navy2, aros: MARCA.cr,
  labiosPegados: true, labios: 0xa8585a, mejillas: 0xe39282, panza: 1.0, nariz: 0.05, alto: 0.97, dedos: true, parpadeoCada: 999, parpadeosExtra: [], sinPatillas: true });
const marcelo = crearPersonaje({ ...DEFECTO, nombre: "Marcelo", mejillasBajas: true, piel: PIEL.media, pelo: 0x55524f, peinado: "texturado", texturaAlto: 0.3,
  barba: 0x4a4644, barbaLarga: 0.3, barbaOpacidad: 0.7, barbaBigote: true, cejasColor: 0x3a3634, cejaGruesa: true,
  camisa: MARCA.cr2, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, campera: { color: 0x2f5a1c, cuello: 0x2f5a1c, cierre: MARCA.navy3, abierta: true },
  pantalon: 0x3a3f4a, zapatos: 0x3b2a20, panza: 1.1, nariz: 0.06, mejillas: 0xd98a78, alto: 1.0, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const lucas = crearPersonaje({ ...DEFECTO, nombre: "Lucas", mejillasBajas: true, piel: PIEL.trigueña, pelo: PELO.negro, peinado: "corto", cortoMechas: true, cejasColor: 0x1e1a18,
  lentes: MARCA.navy2, camisa: 0xb9cde0, mangas: "largas", cuello: 0xb9cde0, cuelloBotones: false, pantalon: MARCA.cr2, zapatos: MARCA.navy,
  panza: 0.95, nariz: 0.054, mejillas: 0xb8644e, alto: 1.02, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const jorge = crearPersonaje({ ...DEFECTO, ...ELENCO.jorge, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const TODOS = [adriana, marcelo, lucas, jorge];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
const celM = crearCelular(pantMar, 0x2f5a1c, 0.08 * 1.25, 0.162 * 1.25); scene.add(celM);
celJ = crearCelular(pantJ, MARCA.cr2, 0.08 * 1.2, 0.162 * 1.2); scene.add(celJ);
celAP = crearCelular(pantAP, MARCA.navy2, 0.08 * 1.2, 0.162 * 1.2); scene.add(celAP);

// ---- avatares: la cara del personaje renderizada chica en un círculo (los chats y las burbujas de audio) ----
const AVATAR = {};
{
  const graciela = crearPersonaje({ ...DEFECTO, ...ELENCO.clienta, parpadeoCada: 999 });
  const walter = crearPersonaje({ ...DEFECTO, ...ELENCO.walter, parpadeoCada: 999 });
  const hector = crearPersonaje({ ...DEFECTO, ...ELENCO.hector, parpadeoCada: 999 });
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
  AVATAR.marcelo = leer(marcelo, 0xefeee5); AVATAR.adriana = leer(adriana, 0xb9cde0);
  AVATAR.graciela = leer(graciela, 0xefeee5); AVATAR.walter = leer(walter, 0xd9d7c9); AVATAR.hector = leer(hector, 0xefeee5);
  rt.dispose();
  // el avatar del estudio: un círculo navy con "EA" verde
  const e = document.createElement("canvas"); e.width = e.height = 256; const x = e.getContext("2d"); x.fillStyle = "#16243d"; x.fillRect(0, 0, 256, 256); x.fillStyle = "#5ce611"; x.font = F(900, 110); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("EA", 128, 136); AVATAR.estudio = e;
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}

// ================= EL CHAT GENÉRICO (de contable-papeles) =================
const CW = 740, CH = 1290;
function cabecera(x, W, cv, nombre, sub, subVerde = false) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 176); x.fillStyle = "#5ce611"; x.fillRect(0, 176, W, 8);
  x.strokeStyle = "#efeee5"; x.lineWidth = 9; x.lineCap = "round"; x.beginPath(); x.moveTo(52, 70); x.lineTo(30, 92); x.lineTo(52, 114); x.stroke();
  avatar(x, cv, 124, 92, 54);
  x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#efeee5"; ajustar(x, nombre, 800, 52, W - 230); x.fillText(nombre, 196, 70);
  x.fillStyle = subVerde ? "#5ce611" : "#b9c3d3"; ajustar(x, sub, 700, 38, W - 230); x.fillText(sub, 198, 126);
}
function burbujaAudio(x, X, Y, w, dur, avance = 0, cv = null) {
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w, 132, [8, 32, 32, 32]); x.fill(); x.stroke();
  let x0 = X + 30; if (cv) { avatar(x, cv, X + 70, Y + 66, 44); x0 = X + 128; }
  x.fillStyle = "#16243d"; x.beginPath(); x.moveTo(x0, Y + 40); x.lineTo(x0 + 44, Y + 66); x.lineTo(x0, Y + 92); x.closePath(); x.fill();
  const b0 = x0 + 70, b1 = X + w - 120; semilla = 77;
  for (let bx = b0, i = 0; bx < b1; bx += 14, i++) { const hh = 12 + Math.abs(Math.sin(i * 0.9) * 26) + az() * 18; x.fillStyle = (bx - b0) / (b1 - b0) < avance ? "#3fa60a" : "#8a93a3"; rr(x, bx, Y + 66 - hh / 2, 8, hh, 4); }
  x.fillStyle = "#16243d"; x.textAlign = "right"; x.textBaseline = "middle"; x.font = F(800, 38); x.fillText(dur, X + w - 22, Y + 68);
  return 132;
}
function burbujaTexto(x, X, Y, w, lineas, { yo = false, px = 46, tilde: tl = null, etiqueta = null, verde = false } = {}) {
  let h = 34 + lineas.length * px * 1.24 + (tl ? 36 : 0), y0 = Y;
  if (etiqueta) { x.fillStyle = "#2f7a12"; x.font = F(800, 36); x.textAlign = yo ? "right" : "left"; x.textBaseline = "middle"; x.fillText(etiqueta, yo ? X + w - 6 : X + 6, Y + 18); y0 = Y + 48; }
  x.fillStyle = verde ? "#e3f7d4" : "#ffffff"; x.strokeStyle = yo || verde ? "#3fa60a" : "#16243d"; x.lineWidth = yo || verde ? 7 : 5; x.beginPath(); x.roundRect(X, y0, w, h, yo ? [32, 8, 32, 32] : [8, 32, 32, 32]); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, px); x.textAlign = "left"; x.textBaseline = "middle";
  lineas.forEach((l, i) => x.fillText(l, X + 26, y0 + 17 + px * 0.62 + i * px * 1.24));
  if (tl) { const cx = X + w - 46, cy = y0 + h - 30; tilde(x, cx, cy, 30, tl === "gris" ? "#8a93a3" : "#3fa60a", 7); if (tl === "doble") tilde(x, cx + 16, cy, 30, "#3fa60a", 7); }
  return h + (y0 - Y);
}
// el adjunto: la boleta en PDF (rectángulo genérico, sin logos)
function adjunto(x, X, Y, w, titulo, sub) {
  x.fillStyle = "#e3f7d4"; x.strokeStyle = "#3fa60a"; x.lineWidth = 7; x.beginPath(); x.roundRect(X, Y, w, 150, [8, 32, 32, 32]); x.fill(); x.stroke();
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(X + 24, Y + 22, 84, 106, 10); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.fillRect(X + 24, Y + 22, 84, 30); x.fillStyle = "#efeee5"; x.font = F(900, 22); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("PDF", X + 66, Y + 38);
  x.fillStyle = "#8a93a3"; for (let k = 0; k < 3; k++) x.fillRect(X + 36, Y + 66 + k * 18, 60 - (k % 2) * 18, 7);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, titulo, 800, 48, w - 160); x.fillText(titulo, X + 130, Y + 56);
  x.fillStyle = "#3a4256"; x.font = F(700, 36); x.fillText(sub, X + 130, Y + 108);
  return 150;
}
function dibujarChat(x, W, H, { cv, nombre, sub, subVerde, msgs, input = "", ult = 1 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  const medir = document.createElement("canvas").getContext("2d");
  const hs = msgs.map((m) => m.dibujar(medir, 0)), gap = 24;
  const piso = H - (input !== null ? 150 : 30);
  let y = piso - hs.reduce((a, b) => a + b + gap, 0) + gap + (1 - eo(ult)) * (hs[hs.length - 1] + gap);
  msgs.forEach((m, i) => { m.dibujar(x, y); y += hs[i] + gap; });
  if (input !== null) {
    x.fillStyle = "#d9d7c9"; x.fillRect(0, H - 130, W, 130);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 4; x.beginPath(); x.roundRect(24, H - 108, W - 160, 86, 43); x.fill(); x.stroke();
    x.fillStyle = input ? "#0b1220" : "#8a93a3"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 38); x.fillText(input || "Mensaje", 52, H - 64);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 70, H - 65, 44, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(W - 88, H - 88); x.lineTo(W - 46, H - 65); x.lineTo(W - 88, H - 42); x.closePath(); x.fill();
  }
  cabecera(x, W, cv, nombre, sub, subVerde);
}
const M_ = {
  audio: (dur, avance = 1, cv = AVATAR.marcelo) => ({ dibujar: (x, y) => burbujaAudio(x, 24, y, 580, dur, avance, cv) }),
  audioYo: (dur) => ({ dibujar: (x, y) => burbujaAudio(x, CW - 24 - 520, y, 520, dur, 1, null) }),
  yo: (ls, o = {}) => ({ dibujar: (x, y) => { x.font = F(800, o.px ?? 46); const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 110; return burbujaTexto(x, CW - 24 - Math.max(w, o.minW ?? 0), y, Math.max(w, o.minW ?? 0), ls, { yo: true, ...o }); } }),
  el: (ls, o = {}) => ({ dibujar: (x, y) => { x.font = F(800, o.px ?? 46); const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 60; return burbujaTexto(x, 24, y, Math.max(w, o.minW ?? 0), ls, o); } }),
  adj: (titulo, sub, yo = false) => ({ dibujar: (x, y) => adjunto(x, yo ? CW - 24 - 560 : 24, y, 560, titulo, sub) }),
  dia: (txt, px = 40) => ({ dibujar: (x, y) => { x.font = F(800, px); const w = x.measureText(txt).width + 56; x.fillStyle = "#d9d7c9"; rr(x, (CW - w) / 2, y, w, px * 1.6, px * 0.8); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(txt, CW / 2, y + px * 0.82); return px * 1.6; } }),
  escribe: (yo = false) => ({ dibujar: (x, y) => { const X = yo ? CW - 24 - 200 : 24; x.fillStyle = "#e3f7d4"; x.strokeStyle = "#3fa60a"; x.lineWidth = 6; x.beginPath(); x.roundRect(X, y, 200, 96, yo ? [32, 8, 32, 32] : [8, 32, 32, 32]); x.fill(); x.stroke(); x.fillStyle = "#16243d"; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(X + 52 + i * 48, y + 48, 13, 0, 7); x.fill(); } return 96; } }),
};

// ================= PANTALLAS =================
// ---- el celular de Adriana en el soporte (estudio): el chat del cliente que pregunta; en la parte 2 contesta el asistente ----
let claveA = "";
const prog = (t, t0, L) => cl((t - t0) / L);
function dibujarPantA(t) {
  let cfg, fase;
  if (t < P2) {
    // P1-P2: Marcelo · P3: Graciela (lunes 11:00), Walter (miércoles 23:40), Marcelo (viernes 19:00)
    if (t < T.r1) {
      const msgs = [M_.dia("Lunes"), M_.audio("0:02", prog(t, T.m1, LEN.m1), AVATAR.marcelo)];
      fase = `m${Math.round(prog(t, T.m1, LEN.m1) * 10)}`;
      let input = "";
      if (t >= T.a1 - 0.1 && t < T.envia) { input = `● 0:0${Math.min(9, Math.max(1, Math.floor(t - T.a1 + 1)))}  grabando…`; fase += "g" + Math.floor(t - T.a1 + 1); }
      if (t >= T.envia) { msgs.push(M_.audioYo("0:02")); fase += "e"; }
      cfg = { cv: AVATAR.marcelo, nombre: "Marcelo · panadería", sub: "en línea", msgs, input };
    } else {
      const [cv, nom, k] = t < T.r2 ? [AVATAR.graciela, "Graciela · rotisería", "g1"] : t < T.r3 ? [AVATAR.walter, "Walter · bar", "w1"] : [AVATAR.marcelo, "Marcelo · panadería", "m2"];
      const msgs = [M_.dia(t < T.r2 ? "Lunes" : t < T.r3 ? "Miércoles" : "Viernes"), M_.audio("0:02", prog(t, T[k], LEN[k]), cv)];
      if (k === "m2") msgs.unshift(M_.audioYo("0:02"), M_.audio("0:02", 1, cv));
      fase = `${k}${Math.round(prog(t, T[k], LEN[k]) * 10)}`;
      cfg = { cv, nombre: nom, sub: "en línea", msgs, input: "" };
    }
  } else {
    // Q1: el mismo audio; contesta el asistente (escribiendo… → la respuesta con sus datos → "Contestó el asistente ✓")
    const msgs = [M_.dia("Lunes"), M_.audio("0:02", prog(t, T.m1b, LEN.m1), AVATAR.marcelo)];
    fase = `q${Math.round(prog(t, T.m1b, LEN.m1) * 10)}`;
    const fin = T.m1b + LEN.m1;
    if (t >= fin + 0.02 && t < fin + 0.35) { msgs.push(M_.escribe(true)); fase += "w"; }
    if (t >= fin + 0.35) { msgs.push(M_.yo(["Vence el 23.", "Este mes: $ 14.300"], { px: 50, etiqueta: "Asistente · agente de IA", tilde: "doble" })); fase += "r"; }
    if (t >= fin + 0.75) { msgs.push(M_.dia("Contestó el asistente ✓", 42)); fase += "ok"; }
    cfg = { cv: AVATAR.marcelo, nombre: "Marcelo · panadería", sub: "en línea", msgs, input: "" };
  }
  if (fase === claveA) return; claveA = fase;
  const { x } = pantA.userData;
  dibujarChat(x, CW, CH, { ...cfg, subVerde: false });
  if (cfg.input) { x.fillStyle = "#c7655b"; x.beginPath(); x.arc(64, CH - 64, 14, 0, 7); x.fill(); }
  pantA.needsUpdate = true;
}
// ---- el celular de Adriana en el patio: el chat de Walter (sigue contestando el domingo); en Q4 boca abajo ----
let claveAP = "";
function dibujarPantAP() {
  if (claveAP) return; claveAP = "x";
  const { x } = pantAP.userData;
  dibujarChat(x, CW, CH, { cv: AVATAR.walter, nombre: "Walter · bar", sub: "en línea", msgs: [M_.dia("Domingo"), M_.audio("0:02", 1, AVATAR.walter), M_.yo(["Sí, Walter, llegó."], { tilde: "doble", px: 48 }), M_.audio("0:03", 1, AVATAR.walter)], input: "" });
  pantAP.needsUpdate = true;
}
// ---- el celular de Marcelo (Q2): el chat del estudio, contesta el asistente con SUS datos ----
let claveMar = "";
function dibujarPantMar(t) {
  const t0 = T.q2;
  const k = t < t0 + 0.12 ? 0 : t < t0 + 0.5 ? 1 : t < T.boleta ? 2 : t < T.facturas ? 3 : 4;
  const ult = k >= 2 ? Math.round(eo(cl((t - [0, 0, t0 + 0.5, T.boleta, T.facturas][k]) / 0.22)) * 6) / 6 : 1;
  const clave = `${k}|${ult}`; if (clave === claveMar) return; claveMar = clave;
  const msgs = [M_.dia("Setiembre"), M_.el(["Tus facturas de", "setiembre: 12 ✓"], { px: 54, verde: true }), M_.dia("Hoy · 9:00"), M_.audioYo("0:02")];
  if (k === 1) msgs.push(M_.escribe(false));
  if (k >= 2) msgs.push(M_.el(["Hola, Marcelo.", "Lo tuyo de octubre", "vence el 23.", "Este mes son", "$ 14.300."], { px: 60, etiqueta: "Asistente del estudio · agente de IA", verde: true }));
  if (k >= 3) msgs.push(M_.adj("Boleta · octubre", "PDF · para pagar"));
  if (k >= 4) msgs.push(M_.el(["Tus facturas de", "octubre ya", "llegaron: 14 ✓"], { px: 58, verde: true }));
  const { x } = pantMar.userData;
  dibujarChat(x, CW, CH, { cv: AVATAR.estudio, nombre: "Estudio Adriana", sub: "Asistente · agente de IA", subVerde: true, msgs, input: "", ult: k >= 2 ? ult : 1 });
  pantMar.needsUpdate = true;
}
// ---- el celular de Jorge: el chat con Marcelo (le escribe a él para llegar a Adri) ----
let claveJ = "";
function dibujarPantJ(t) {
  const p2 = t >= P2;
  if (claveJ === String(p2)) return; claveJ = String(p2);
  const { x } = pantJ.userData;
  const msgs = p2
    ? [M_.dia("Sábado", 40), M_.yo(["¿Mañana venís", "al asado?"], { px: 56 }), M_.el(["No llego, Jorge.", "¡Disfruten!"], { px: 56 }), M_.dia("Domingo · 13:41", 40), M_.el(["Decile a Adri", "que es un amor,", "me contestó", "al toque"], { px: 66 })]
    : [M_.dia("Sábado", 40), M_.yo(["¿Mañana venís", "al asado?"], { px: 56 }), M_.el(["No llego, Jorge.", "¡Disfruten!"], { px: 56 }), M_.dia("Domingo · 13:32", 40), M_.el(["¿Le preguntás", "a Adri cuándo", "vence lo mío?"], { px: 70 })];
  dibujarChat(x, CW, CH, { cv: AVATAR.marcelo, nombre: "Marcelo · panadería", sub: "en línea", subVerde: false, msgs, input: "" });
  pantJ.needsUpdate = true;
}
// ---- el monitor de Adriana (vertical): el balance y las consultas; en la parte 2, la bandeja del asistente ----
let claveMon = "";
function barraBalance(x, y, nombre, pct, ok, rojo) {
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(28, y, MW - 56, 290, 30); x.fill();
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "BALANCE 2025", 800, 46, 420); x.fillText("BALANCE 2025", 60, y + 52);
  x.fillStyle = "#efeee5"; ajustar(x, nombre, 900, 60, MW - 130); x.fillText(nombre, 60, y + 112);
  const col = rojo ? "#c7655b" : "#5ce611";
  x.fillStyle = "#2c4268"; x.beginPath(); x.roundRect(60, y + 166, MW - 120, 52, 26); x.fill();
  x.fillStyle = col; x.beginPath(); x.roundRect(60, y + 166, Math.max(52, (MW - 120) * pct / 100), 52, 26); x.fill();
  x.fillStyle = col; x.textAlign = "right"; x.font = F(900, 60); x.fillText(ok ? "100 % · Terminado ✓" : `${Math.round(pct)} %`, MW - 60, y + 252);
  return 290;
}
function dibujarMon(t) {
  const p2 = t >= P2;
  let modo, n = 0, pct = 3, k = 0, toast = 0, walter = 0;
  if (!p2) {
    modo = "p1";
    n = t < T.r1 ? 14 : t < T.r2 ? Math.round(lerp(14, 38, eo(sg(t, T.r2 - 0.0, T.r2 + 0.4)))) : 0;
    if (t >= T.r1 && t < T.r2) n = Math.round(lerp(14, 38, eo(sg(t, T.r1 + 0.1, T.r1 + 0.5)))) ;
    if (t >= T.r2 && t < T.r3) n = Math.round(lerp(38, 52, eo(sg(t, T.r2 + 0.1, T.r2 + 0.5))));
    if (t >= T.r3) n = Math.round(lerp(52, 63, eo(sg(t, T.r3 + 0.1, T.r3 + 0.5))));
  } else if (t < T.q3) {
    modo = "q1"; pct = lerp(3, 8, eio(sg(t, P2, T.q3))); toast = t >= T.q2b && t < T.q3 ? 1 : 0;
  } else if (t < T.q3b) {
    modo = "q3"; k = [T.c1, T.c2, T.c3, T.c4, T.cpv].filter((c) => t >= c).length; pct = lerp(8, 64, eio(sg(t, T.q3, T.q3b)));
  } else {
    modo = "q3b"; pct = 100; walter = t >= T.a4 ? Math.round(eo(sg(t, T.a4, T.a4 + 0.35)) * 4) : 0;
  }
  const clave = `${modo}|${n}|${Math.round(pct)}|${k}|${toast}|${walter}`; if (clave === claveMon) return; claveMon = clave;
  const { x } = pantMon.userData, w = MW, h = MH;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  if (modo === "p1" || modo === "q1") {
    // el balance arriba (3 % rojo apagado, inmóvil) y las consultas de la semana abajo
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = modo === "p1" ? "#c7655b" : "#5ce611"; x.fillRect(0, 150, w, 12);
    x.fillStyle = "#efeee5"; ajustar(x, "BALANCE 2025", 900, 70, w - 80); x.fillText("BALANCE 2025", 40, 76);
    x.fillStyle = "#0b1220"; ajustar(x, "SÚPER HÉCTOR", 900, 78, w - 80); x.fillText("SÚPER HÉCTOR", 40, 238);
    const col = modo === "p1" ? "#c7655b" : "#3fa60a";
    x.fillStyle = col; x.textAlign = "center"; x.font = F(900, 250); x.fillText(`${Math.round(pct)} %`, w / 2, 450);
    x.fillStyle = "#d9d7c9"; x.beginPath(); x.roundRect(40, 590, w - 80, 70, 35); x.fill();
    x.fillStyle = col; x.beginPath(); x.roundRect(40, 590, Math.max(70, (w - 80) * pct / 100), 70, 35); x.fill();
    x.textAlign = "left";
    if (modo === "p1") {
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(28, 720, w - 56, 520, 34); x.fill();
      x.fillStyle = "#efeee5"; x.font = F(800, 58); x.fillText("Consultas", 64, 800); x.fillText("de la semana", 64, 870);
      x.fillStyle = "#c7655b"; x.textAlign = "center"; x.font = F(900, 300); x.fillText(String(n), w / 2, 1080);
    } else {
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(28, 720, w - 56, 520, 34); x.fill();
      x.fillStyle = "#5ce611"; x.font = F(900, 60); x.fillText("Asistente del estudio", 64, 800);
      x.fillStyle = "#efeee5"; x.font = F(800, 50); x.fillText("agente de IA", 64, 866);
      x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w / 2, 1060, 120, 0, 7); x.fill(); tilde(x, w / 2, 1066, 150, "#0b1220", 30);
      if (toast) {
        x.fillStyle = "rgba(11,18,32,0.5)"; x.fillRect(0, 0, w, h);
        x.fillStyle = "#ffffff"; x.strokeStyle = "#3fa60a"; x.lineWidth = 10; x.beginPath(); x.roundRect(30, 300, w - 60, 330, 36); x.fill(); x.stroke();
        avatar(x, AVATAR.marcelo, 120, 400, 66);
        x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 50); x.fillText("Marcelo", 210, 400);
        x.font = F(900, 70); x.fillText("¡Gracias, Adri!", 60, 540);
      }
    }
  } else if (modo === "q3") {
    // la bandeja del asistente: el contador, las tarjetas contestadas con ✓ y "Para vos (2)"
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 210); x.fillStyle = "#5ce611"; x.fillRect(0, 210, w, 12);
    x.fillStyle = "#5ce611"; ajustar(x, "Asistente del estudio", 900, 60, w - 70); x.fillText("Asistente del estudio", 36, 62);
    const cont = k >= 5 ? 61 : [0, 18, 37, 52, 61][k];
    x.fillStyle = "#efeee5"; x.font = F(800, 48); x.fillText("63 consultas ·", 36, 150); const aw = x.measureText("63 consultas · ").width;
    x.fillStyle = "#5ce611"; x.font = F(900, 52); x.fillText(`contestó ${cont} ✓`, 36 + aw, 150);
    const CARDS = [
      [AVATAR.graciela, "Graciela", "¿Cuánto pago este mes?", "$ 8.900 · vence el 18 ✓"],
      [AVATAR.walter, "Walter", "¿Te llegó lo que te mandé?", "Llegaron 12 ✓ · falta alquiler"],
      [AVATAR.marcelo, "Marcelo", "¿Era el 23?", "Sí, el 23 ✓"],
    ];
    let y = 250;
    CARDS.forEach(([cv, nom, q, a], i) => {
      if (k < i + 1) return;
      x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, y, w - 48, 220, 26); x.fill(); x.stroke();
      avatar(x, cv, 82, y + 62, 42);
      x.fillStyle = "#0b1220"; x.font = F(900, 48); x.fillText(nom, 140, y + 62);
      x.fillStyle = "#3a4256"; ajustar(x, q, 700, 42, w - 100); x.fillText(q, 46, y + 128);
      x.fillStyle = "#2f7a12"; ajustar(x, a, 900, 46, w - 100); x.fillText(a, 46, y + 186);
      y += 236;
    });
    // Héctor: la consulta de fondo salta a "Para vos"
    if (k >= 4) {
      const pv = k >= 5;
      const yb = 960;
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(16, yb, w - 32, 316, 30); x.fill();
      x.fillStyle = "#5ce611"; x.font = F(900, 54); x.fillText(pv ? "Para vos (2)" : "Consulta de fondo…", 40, yb + 50);
      x.fillStyle = "#ffffff"; x.strokeStyle = "#5ce611"; x.lineWidth = pv ? 10 : 4; x.beginPath(); x.roundRect(36, yb + 92, w - 72, 206, 24); x.fill(); x.stroke();
      avatar(x, AVATAR.hector, 92, yb + 148, 38);
      x.fillStyle = "#0b1220"; x.font = F(900, 44); x.fillText("Héctor", 146, yb + 148);
      x.fillStyle = "#0b1220"; ajustar(x, "¿Me conviene poner el camión", 800, 40, w - 110); x.fillText("¿Me conviene poner el camión", 58, yb + 212);
      ajustar(x, "a nombre de la empresa?", 800, 40, w - 110); x.fillText("a nombre de la empresa?", 58, yb + 262);
    } else {
      // la barra del balance abajo mientras entran las tarjetas
      barraBalance(x, 970, "SÚPER HÉCTOR", pct, false, false);
    }
  } else {
    // Q3b: viernes, los dos balances terminados
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#5ce611"; x.fillRect(0, 150, w, 12);
    x.fillStyle = "#efeee5"; ajustar(x, "Balances · noviembre", 900, 64, w - 80); x.fillText("Balances · noviembre", 40, 76);
    barraBalance(x, 200, "SÚPER HÉCTOR", 100, true, false);
    if (walter) { x.save(); const s = 0.85 + 0.15 * (walter / 4); x.translate(w / 2, 690 + 145); x.scale(s, s); x.translate(-w / 2, -(690 + 145)); barraBalance(x, 690, "BAR WALTER", 100, true, false); x.restore(); }
    x.fillStyle = "#16243d"; x.font = F(800, 46); x.textAlign = "center"; x.fillText("Viernes · 18:00", w / 2, 1210); x.textAlign = "left";
  }
  pantMon.needsUpdate = true;
}

// ================= TARJETAS PEGADAS A LA CÁMARA: globos, audios, rótulos (de contable-papeles) =================
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
function crearRotulo(lineas, px = 50) {
  const med = document.createElement("canvas").getContext("2d");
  const ancho = Math.max(...lineas.map(([l, , p]) => { med.font = F(800, p ?? px); return med.measureText(l).width; }));
  const H = Math.round(lineas.reduce((a, [, , p]) => a + (p ?? px) * 1.25, 0) + px * 0.6), Wg = Math.round(ancho + px * 1.0);
  return crearTarjeta(Wg, H, (x, w) => {
    let y = px * 0.3; x.textAlign = "center"; x.textBaseline = "middle";
    for (const [l, color, p] of lineas) { const q = p ?? px; x.font = F(800, q); x.fillStyle = color ?? "#efeee5"; x.fillText(l, w / 2, y + q * 0.62); y += q * 1.25; }
  }, { fondo: "#16243d", borde: C.cr });
}
// el audio que sale del celular: cabecera (avatar + "Nombre · rubro"), la onda con el play y la duración, y lo que dice
function crearAudio(cv, quien, lineas, dur, px = 62) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const anchoT = Math.max(620, ...lineas.map((l) => med.measureText(l.replace(/[[\]]/g, "")).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.2), cabH = 84, ondaH = 92, H = Math.round(cabH + ondaH + lineas.length * px * 1.22 + px * 0.7);
  return crearTarjeta(Wg, H, (x, w) => {
    avatar(x, cv, 56, 48, 36);
    x.fillStyle = "#1f3254"; x.font = F(800, 44); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(quien, 106, 50);
    const y0 = cabH + 4; x.fillStyle = "#16243d"; x.beginPath(); x.moveTo(34, y0 + 18); x.lineTo(70, y0 + 42); x.lineTo(34, y0 + 66); x.closePath(); x.fill();
    semilla = 77; for (let bx = 96, i = 0; bx < w - 130; bx += 16, i++) { const hh = 12 + Math.abs(Math.sin(i * 0.9) * 24) + az() * 16; x.fillStyle = "#16243d"; rr(x, bx, y0 + 42 - hh / 2, 9, hh, 4); }
    x.fillStyle = "#16243d"; x.textAlign = "right"; x.font = F(800, 42); x.fillText(dur, w - 26, y0 + 44);
    x.fillStyle = "#d9d7c9"; x.fillRect(24, cabH + ondaH - 4, w - 48, 4);
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + ondaH + px * 0.5 + i * px * 1.22 + px * 0.36, px));
  });
}
const GL = {
  m1: crearAudio(AVATAR.marcelo, "Marcelo · panadería", ["Adri, ¿cuándo vence", "[lo mío?]"], "0:02", 66),
  a1: crearGlobo(["El [veintitrés,]", "Marcelo."], 80),
  g1: crearAudio(AVATAR.graciela, "Graciela · rotisería", ["Adri, ¿cuánto pago", "[este mes?]"], "0:02", 66),
  w1: crearAudio(AVATAR.walter, "Walter · bar", ["¿Te llegó lo que", "[te mandé?]"], "0:02", 66),
  m2: crearAudio(AVATAR.marcelo, "Marcelo · panadería", ["¿Era el [veintitrés?]"], "0:02", 66),
  j1: crearGlobo(["Adri, ¿cuándo", "[comemos?]"], 84),
  a2: crearGlobo(["El [veintitrés.]"], 104),
  j2a: crearGlobo(["Es Marcelo."], 80),
  j2b: crearGlobo(["Es Marcelo. Que cuándo", "vence [lo suyo.]"], 70),
  m3: crearGlobo(["¡Uh, qué rápida!", "Gracias, [Adri.]"], 80),
  a3: crearGlobo(["De [nada.]"], 92),
  l1: crearGlobo(["¿Ya? ¿El de [Héctor?]"], 80),
  a4: crearGlobo(["Y el de [Walter.]"], 84),
  a5: crearGlobo(["[Ahora.]"], 104),
  j3a: crearGlobo(["Es Marcelo."], 80),
  j3b: crearGlobo(["Es Marcelo. Que sos", "un amor, que le contestaste", "[al toque.]"], 64),
  a6: crearGlobo(["Sí. Un [amor.]"], 96),
};
const ROT = {
  mismas: crearRotulo([["Las mismas", "#c7655b", 64], ["3 preguntas", "#c7655b", 64]], 64),
  datos: crearRotulo([["Contesta con los datos", null, 54], ["de cada cliente", "#5ce611", 62]], 54),
  fondo: crearRotulo([["Lo de fondo", null, 58], ["te lo pasa a vos", "#5ce611", 62]], 58),
};
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
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
const AVISOS = [];
const coronillaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(V3(0, 0.62, 0))); };
// REGLA DE BURBUJAS: arriba del que habla, el borde de abajo ~100 px sobre la coronilla, la cola termina en el pelo
function hablar(g, per, s, orden = 1, dx = 0, minY = 250) {
  const [hx, hy] = coronillaPx(per), [mx, my] = bocaPx(per);
  const { H } = g.userData;
  const cy = hy - 100 - H / 2;
  if (cy - H / 2 < minY - 10) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  if (mx < 70 || mx > 1010 || hy < 0 || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, Math.max(cy, H / 2 + minY), s, [hx, hy + 6], orden);
}

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt. Patio: x + PX2; panadería: x + PX.
const CAM_P1 = (k) => [lerp(0.62, 0.58, k), lerp(1.42, 1.4, k), lerp(2.45, 2.3, k), 0.16, lerp(1.0, 1.0, k), 0.75, 52];
const CAM_P2 = (k) => [lerp(0.2, 0.18, k), 1.42, lerp(2.95, 2.82, k), 0.16, 1.1, 0.5, 44];
const CAM_P3 = (k) => [lerp(-0.2, -0.17, k), lerp(1.7, 1.68, k), lerp(2.75, 2.65, k), 0.2, 1.0, 0.75, 56];
const CAM_P4 = (k) => [PX2 + lerp(0.08, 0.06, k), lerp(1.58, 1.55, k), lerp(2.5, 2.3, k), PX2 + 0.04, 1.0, -0.8, 54];
const CAM_P4B = (k) => [PX2 + lerp(-0.62, -0.6, k), 1.45, lerp(1.35, 1.25, k), PX2 - 0.36, 1.15, -0.45, 46];
const CAM_P5 = (k) => [PX2 + lerp(-1.08, -1.05, k), 1.5, lerp(1.6, 1.5, k), PX2 - 0.32, 1.1, -0.55, 48];
const CAM_P5C = (k) => [PX2 + lerp(0.5, 0.5, k), 1.42, lerp(1.05, 0.95, k), PX2 + 0.55, 1.08, -1.1, 42];
const CAM_Q2M = (k) => [PX + 0.15, 1.52, lerp(2.15, 2.05, k), PX + 0.3, 1.27, 0.2, 46];
const CAM_Q3N = (k) => [lerp(0.75, 0.72, k), 1.42, lerp(2.0, 1.9, k), 0.3, 1.0, 0.75, 50];
const CAM_Q3B = (k) => [lerp(0.52, 0.5, k), 1.42, lerp(3.05, 2.95, k), 0.52, 1.05, 0.4, 58];
const CAM_Q4A = (k) => [PX2 + lerp(0.14, 0.12, k), 1.5, lerp(2.2, 2.1, k), PX2 + 0.1, 1.12, -0.42, 54];
const CAM_C = (k) => [PX2 + lerp(0.24, 0.22, k), 1.45, lerp(1.85, 1.72, k), PX2 + 0.17, 1.15, -0.25, 50];
const pl2 = (nombre, a, b, f) => [nombre, a, [[a, ...f(0)], [b, ...f(1)]]];
const PLANOS = [
  pl2("P1", 0, T.p2, CAM_P1),
  pl2("P2", T.p2, T.p3, CAM_P2),
  pl2("P3", T.p3, T.p4, CAM_P3),
  pl2("P4", T.p4, T.p4b, CAM_P4),
  pl2("P4b", T.p4b, T.p5, CAM_P4B),
  pl2("P5", T.p5, T.p5i, CAM_P5),
  ["P5i", T.p5i, null],
  pl2("P5j", T.p5j, T.p5c, CAM_P5),
  pl2("P5c", T.p5c, P1, CAM_P5C),
  // ---- parte 2 ----
  pl2("Q1", P2, T.q2, CAM_P1),
  ["Q2", T.q2, null],
  pl2("Q2m", T.q2m, T.q2b, CAM_Q2M),
  pl2("Q2b", T.q2b, T.q3, CAM_P2),
  ["Q3", T.q3, null],
  pl2("Q3n", T.q3n, T.q3r, CAM_Q3N),
  ["Q3r", T.q3r, null],
  pl2("Q3b", T.q3b, T.q4, CAM_Q3B),
  pl2("Q4", T.q4, T.q4j, CAM_P4),
  pl2("Q4j", T.q4j, T.q4i, CAM_P5),
  ["Q4i", T.q4i, null],
  pl2("Q4a", T.q4a, T.c, CAM_Q4A),
  pl2("C", T.c, DUR, CAM_C),
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); }
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
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (!env) return;
  p.boca = { ...(p.boca || { sonrisa: 0.1, abierta: 0, ancho: 1 }) }; p.ojos = { ...(p.ojos || { abiertos: 1 }) };
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta ?? 0, cl(e * 1.1 - 0.05) * k); }
  { const h = sg(t, t0 - 0.12, t0) * (1 - sg(t, t0 + env.length / 30, t0 + env.length / 30 + 0.15)); if (h > 0) p.boca.sonrisa = lerp(p.boca.sonrisa ?? 0, Math.min(p.boca.sonrisa ?? 0, 0.08), h); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos ?? 1, 0.85);
};
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const manoW = (per, lado) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(new THREE.Vector3()); };
const TECLEA = (t, f = 1) => ({ manoI: [0.12 + Math.sin(t * 23) * 0.01 * f, 0.29 + Math.max(0, Math.sin(t * 31)) * 0.02 * f, 0.44], manoD: [-0.14 + Math.sin(t * 19) * 0.01 * f, 0.29 + Math.max(0, Math.sin(t * 27 + 1)) * 0.02 * f, 0.44], codoI: [1, -0.6, -0.2], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0 });
// ---------- Adriana en el estudio (sentada, mirando a +z; el monitor a su izquierda, +x) ----------
function poseAdriana(t) {
  const p2 = t >= P2;
  const pr = { x: ADR.x, y: -0.08, z: ADR.z, giro: 0, sentado: 1, inclina: 0.06, ...CARA.concentrada, cabeza: { giro: 0.3, asiente: 0.12, ladea: 0.02 }, ojos: { abiertos: 0.85, x: 0.45, y: -0.1 }, ...TECLEA(t), t };
  if (!p2) {
    // P1: teclea el balance, el audio la interrumpe: mira el celular (adelante, a su izquierda)
    if (t >= T.m1 + 0.25) { pr.cabeza = { giro: 0.12, asiente: 0.34, ladea: 0.02 }; pr.ojos = { abiertos: 0.9, x: 0.15, y: -0.6 }; Object.assign(pr, { cejas: { alto: 0.15, ang: 0.15 }, boca: { sonrisa: 0.15, abierta: 0, ancho: 0.95 } }); }
    if (t >= T.p2 - 0.05 && t < T.p3) {
      // P2: sigue tecleando con la derecha y graba con la izquierda (el dedo en el celular del soporte)
      Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 0.9, x: 0.5, y: -0.15, feliz: 0.15 }, cejas: { alto: 0.2, ang: 0.1 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1.0 } });
      pr.cabeza = { giro: 0.32, asiente: 0.1, ladea: 0.04 };
      bocaVoz(pr, t, T.a1, ENV.a1, 0.55);
    }
    if (t >= T.p3) {
      // P3: la ráfaga: cada vez más hundida en la silla, cada vez más cansada
      const k = t < T.r2 ? 0 : t < T.r3 ? 1 : 2;
      pr.inclina = [0.08, -0.02, -0.1][k]; pr.y = [-0.08, -0.1, -0.13][k];
      Object.assign(pr, [{ ...CARA.concentrada, ojos: { abiertos: 0.8, x: 0.4, y: -0.2 } }, { ...CARA.fastidio, ojos: { abiertos: 0.55, x: 0.3, y: -0.3, tension: 0.2 }, cejas: { alto: 0.1, ang: 0.5 } }, { ...CARA.resignado, ojos: { abiertos: 0.45, x: 0.1, y: -0.5, tension: 0.6 } }][k]);
      pr.cabeza = [{ giro: 0.3, asiente: 0.12, ladea: 0.02 }, { giro: 0.2, asiente: 0.2, ladea: 0.06 }, { giro: 0.1, asiente: 0.3, ladea: 0.1 }][k];
      Object.assign(pr, TECLEA(t, [1, 0.6, 0.3][k]));
    }
    return pr;
  }
  // parte 2: tranquila, sonríe, teclea el balance mirando el monitor
  Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: 0.45, y: -0.12, feliz: 0.25 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.02 } });
  pr.cabeza = { giro: 0.32, asiente: 0.08, ladea: 0.03 };
  if (t >= T.q2b && t < T.q3) bocaVoz(pr, t, T.a3, ENV.a3, 0.5);
  if (t >= T.q3b) {
    // Q3b: mira a Lucas (a su izquierda, +x lejos) y contesta tranquila
    pr.cabeza = { giro: lerp(0.32, 0.6, eio(sg(t, T.l1, T.l1 + 0.3))), asiente: 0.0, ladea: 0.02 }; pr.ojos = { abiertos: 1, x: 0.5, y: 0.0, feliz: 0.3 };
    if (t >= T.a4 - 0.1) { pr.cabeza = { giro: lerp(0.6, 0.35, eio(sg(t, T.a4 + 0.2, T.a4 + 0.6))), asiente: 0.05, ladea: 0.03 }; }
    bocaVoz(pr, t, T.a4, ENV.a4, 0.5);
  }
  return pr;
}
// ---------- Adriana en el patio (sin el cárdigan): sentada con el celular; en Q4 se levanta con el plato ----------
function poseAdrianaPatio(t) {
  const p2 = t >= P2;
  const pr = { x: PX2 + ADRP.x, y: -0.06, z: ADRP.z, giro: -0.15, sentado: 1, inclina: 0.1, ...BRAZOS.celular, t };
  pr.manoI = [0.08, 0.3, 0.32]; pr.manoD = [-0.08, 0.3, 0.32];
  // el automático: la vista en el celular, cero expresión
  Object.assign(pr, { ...CARA.neutra, ojos: { abiertos: 0.75, x: 0, y: -0.85 }, cejas: { alto: 0, ang: 0.1 }, boca: { sonrisa: -0.05, abierta: 0, ancho: 0.9 } });
  pr.cabeza = { giro: 0, asiente: 0.42, ladea: 0.02 };
  if (!p2) {
    bocaVoz(pr, t, T.a2, ENV.a2, 0.45);
    if (t >= T.p5c) { const c = eio(sg(t, T.p5c + 0.15, T.p5c + 0.4)); Object.assign(pr, { ...CARA.resignado, ojos: { abiertos: lerp(0.7, 0.02, c), x: 0, y: -0.3 }, cejas: { alto: 0.3, ang: 0.85 } }); pr.cabeza = { giro: 0, asiente: lerp(0.4, 0.15, c), ladea: 0.05 }; }
    return pr;
  }
  // Q4: deja el celular boca abajo, mira a Jorge y se levanta con el plato
  const deja = T.a5 - 0.35;
  if (t >= deja) {
    Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: -0.35, y: 0.1, feliz: 0.35 }, cejas: { alto: 0.25, ang: 0 }, boca: { sonrisa: 0.7, abierta: 0, ancho: 1.05 } });
    pr.cabeza = { giro: -0.35, asiente: 0.0, ladea: 0.03 };
    const s = eio(sg(t, T.a5 + 0.05, T.a5 + 0.6));
    pr.sentado = 1 - s; pr.y = lerp(-0.06, 0, s); pr.inclina = lerp(0.1, 0.04, s);
    Object.assign(pr, BRAZOS.ofrece(0.26, lerp(0.3, 0.34, s), 0.36));
    bocaVoz(pr, t, T.a5, ENV.a5, 0.55);
  }
  return pr;
}
// Adriana parada al lado de Jorge (Q4a, cierre) con el plato y el choripán
function poseAdrianaParada(t) {
  const pr = { x: PX2 + 0.5, y: 0, z: -0.28, giro: -0.6, inclina: 0.03, ...CARA.sonrisa, ojos: { abiertos: 1, x: -0.4, y: 0.05, feliz: 0.3 }, cejas: { alto: 0.2, ang: 0 }, cabeza: { giro: -0.3, asiente: 0.02, ladea: 0.04 }, ...BRAZOS.ofrece(0.26, 0.3, 0.36), t };
  if (t >= T.a6 - 0.1 && t < T.c) {
    // "Sí. Un amor." seca e irónica: una ceja arriba, media sonrisa de costado, la mirada a Jorge
    Object.assign(pr, { ojos: { abiertos: 0.7, x: -0.5, y: 0.05, feliz: 0.2 }, cejas: { alto: 0.2, ang: 0, asim: 0.8 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 0.95 } });
    bocaVoz(pr, t, T.a6, ENV.a6, 0.5);
  }
  if (t >= T.c) {
    // el cierre: a cámara, de colega a colega
    pr.x = PX2 + 0.3; pr.z = -0.05; pr.giro = -0.08;
    Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: 0.05, y: 0.1, feliz: 0.3 }, cejas: { alto: 0.25, ang: 0 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1.0 } });
    pr.cabeza = { giro: 0.05, asiente: -0.02, ladea: 0.03 };
    Object.assign(pr, BRAZOS.ofrece(0.26, 0.26, 0.34));
    bocaVoz(pr, t, T.a7, ENV.a7, 0.55);
  }
  return pr;
}
// ---------- Jorge en la parrilla (de pie, de 3/4 hacia la mesa; la pinza en la derecha, -x) ----------
const CHORI_PARR = V3(PX2 + GR.x + 0.2, PARRILLA_Y + 0.05, GR.z - 0.05);   // el chorizo en la parrilla (de donde lo saca)
const CHORI_AIRE = V3(PX2 - 0.5, 1.12, -0.2);                             // a medio camino (congelado)
const CHORI_PAN = V3(PX2 + PAN_T.x, PAN_T.y + 0.05, PAN_T.z);               // en el pan
function poseJorge(t) {
  const p2 = t >= P2;
  const pr = { x: PX2 + JOR.x, y: 0, z: JOR.z, giro: -0.55, inclina: 0.03, ...CARA.sonrisa, ojos: { abiertos: 1, x: 0, y: -0.3, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0 }, cabeza: { giro: -0.25, asiente: 0.25, ladea: 0.02 }, ...BRAZOS.costado, t };
  const tj1 = p2 ? T.j1b : T.j1;
  // "Adri, ¿cuándo comemos?": gira la cabeza a la mesa (a su izquierda, +x)
  if (t >= tj1 - 0.3) { pr.cabeza = { giro: 0.75, asiente: 0.05, ladea: 0.04 }; pr.ojos = { abiertos: 1, x: 0.5, y: 0.05, feliz: 0.25 }; }
  bocaVoz(pr, t, tj1, ENV.j1, 0.6);
  if (!p2) {
    // "El veintitrés.": se congela con el chorizo en la pinza (sin enojo, una ceja arriba)
    if (t >= T.a2 + 0.35) { Object.assign(pr, { ...CARA.incredula, ojos: { abiertos: 0.85, x: 0.55, y: 0.05 }, cejas: { alto: 0.35, ang: 0.1, asim: 0.9 }, boca: { sonrisa: -0.15, abierta: 0.05, ancho: 0.85 } }); }
    if (t >= T.p5) {
      // P5: vibra el bolsillo; saca el celular (mano izquierda), se pone los anteojos de leer y lee
      Object.assign(pr, { ...CARA.neutra, ojos: { abiertos: 0.75, x: 0, y: -0.75, tension: 0.1 }, cejas: { alto: 0.3, ang: 0.2 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } });
      pr.cabeza = { giro: 0.05, asiente: 0.38, ladea: 0.03 };
      bocaVoz(pr, t, T.j2, ENV.j2, 0.55);
    }
    return pr;
  }
  if (t >= T.a5 + 0.1) { Object.assign(pr, { ...CARA.feliz, ojos: { abiertos: 0.95, x: 0.3, y: -0.3, feliz: 0.5 }, boca: { sonrisa: 0.8, abierta: 0.1, ancho: 1.1 } }); pr.cabeza = { giro: 0.3, asiente: 0.25, ladea: 0.04 }; }
  if (t >= T.q4j) {
    Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 0.8, x: 0, y: -0.75, feliz: 0.4 }, cejas: { alto: 0.35, ang: 0.0 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } });
    pr.cabeza = { giro: 0.05, asiente: 0.38, ladea: 0.05 };
    bocaVoz(pr, t, T.j3, ENV.j3, 0.55);
  }
  if (t >= T.q4a) { Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: 0.4, y: 0.0, feliz: 0.4 } }); pr.cabeza = { giro: 0.45, asiente: 0.02, ladea: 0.05 }; }
  return pr;
}
// ---------- Marcelo en la panadería (Q2m), detrás del mostrador con el celular ----------
function poseMarceloPan(t) {
  const pr = { x: PX + 0.3, y: 0, z: 0.12, giro: 0, inclina: 0.03, ...CARA.feliz, ojos: { abiertos: 1, x: 0, y: -0.45, feliz: 0.45 }, cejas: { alto: 0.5, ang: 0.1 }, cabeza: { giro: 0.05, asiente: 0.15, ladea: 0.06 }, ...BRAZOS.celular, t };
  pr.manoI = [0.08, 0.38, 0.32]; pr.manoD = [-0.08, 0.38, 0.32];
  if (t >= T.m3 - 0.1) { pr.ojos = { abiertos: 1, x: 0, y: 0.0, feliz: 0.45 }; pr.cabeza = { giro: 0.05, asiente: 0.0, ladea: 0.07 }; }
  bocaVoz(pr, t, T.m3, ENV.m3, 0.6);
  return pr;
}
// ---------- Lucas en su escritorio (Q3b): con el café, gira la silla hacia Adriana ----------
function poseLucas(t) {
  const g = eio(sg(t, T.q3b + 0.05, T.q3b + 0.4));
  const pr = { x: LUC2.x, y: -0.08, z: LUC2.z, giro: lerp(0, -0.75, g), sentado: 1, inclina: 0.02, ...CARA.sorpresa, ojos: { abiertos: 1, x: -0.4, y: 0.1 }, cejas: { alto: 0.7, ang: 0.2 }, boca: { sonrisa: 0.1, abierta: 0.15, ancho: 0.8 }, cabeza: { giro: -0.35, asiente: 0.0, ladea: 0.03 }, manoI: [0.2, 0.3, 0.38], manoD: [-0.2, 0.3, 0.38], codoI: [1, -0.6, -0.2], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  bocaVoz(pr, t, T.l1, ENV.l1, 0.55);
  if (t >= T.a4 + 0.2) Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: -0.4, y: 0.05, feliz: 0.4 }, cejas: { alto: 0.6, ang: 0.3 }, boca: { sonrisa: 0.7, abierta: 0.1, ancho: 1.0 } });
  return pr;
}

// ================= RENDER =================
const LUZ = { noche: [nocheAmb, nocheKey], dia: [diaSol, diaCielo, diaVentana], patio: [patioSol, patioCielo, brasaL], pan: [solPan, cieloPan] };
function ponerLuces(modo, lampOn) {
  for (const k in LUZ) for (const l of LUZ[k]) l.visible = false;
  const base = modo === "noche" || modo === "oscuro" ? "noche" : modo === "tarde" ? "dia" : modo;
  for (const l of LUZ[base]) l.visible = true;
  nocheAmb.intensity = modo === "oscuro" ? 0.35 : 0.85; nocheKey.intensity = modo === "oscuro" ? 0.15 : 0.7;
  diaSol.color.setHex(modo === "tarde" ? 0xffd9a8 : 0xfff1dc); diaCielo.color.setHex(modo === "tarde" ? 0xffe8c8 : 0xfff8ec);
  luzLamp.visible = lampOn && (base === "noche" || base === "dia"); luzLamp.intensity = base === "dia" ? 1.0 : 2.2;
  pantallaLamp.material.emissiveIntensity = lampOn ? 0.55 : 0.0; pantallaLamp.material.color.setHex(lampOn ? 0x5ce611 : 0x24470f); lampara.userData.foco.visible = lampOn;
  for (const f of ventanaFuera) f.material.color.setHex(base === "noche" ? 0x0f1a2e : modo === "tarde" ? 0xf0c890 : 0xe9eef2);
}
// el celular en una mano: delante de la mano, la pantalla mirando a `mira`
function celEnMano(cel, per, lado, mira, arriba = 0.06) {
  const h = manoW(per, lado);
  cel.position.copy(h).add(V3(0, arriba, 0));
  cel.lookAt(mira);
}
function celEnManos(cel, per, mira, alto = 0.07, adelante = 0.07) {
  per.raiz.updateMatrixWorld(true);
  const a = per.brazos[0].mano.getWorldPosition(new THREE.Vector3()), b = per.brazos[1].mano.getWorldPosition(new THREE.Vector3());
  cel.position.copy(a.add(b).multiplyScalar(0.5)).add(V3(0, alto, 0));
  cel.position.add(mira.clone().sub(cel.position).setY(0).normalize().multiplyScalar(adelante));
  cel.lookAt(mira);
}
// dónde está el chorizo de la pinza en t (parte 1: de la parrilla al aire y ahí se congela; parte 2: del aire al pan)
function choriEn(t) {
  if (t < P2) { const u = eio(sg(t, T.j1 - 0.2, T.a2 + 0.3)); const p = CHORI_PARR.clone().lerp(CHORI_AIRE, u); p.y += Math.sin(Math.PI * u) * 0.12; return p; }
  const u = eio(sg(t, T.a5 + 0.1, T.a5 + 0.75)); const p = CHORI_AIRE.clone().lerp(CHORI_PAN, u); p.y += Math.sin(Math.PI * u) * 0.08; return p;
}
function renderAt(tIn) {
  AVISOS.length = 0;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  let pa = planoActual;
  if (VERM === "portada") pa = "portada";
  const lugar = ["P4", "P4b", "P5", "P5i", "P5j", "P5c", "Q4", "Q4j", "Q4i", "Q4a", "C", "portada"].includes(pa) ? "patio" : ["Q2", "Q2m"].includes(pa) ? "pan" : "of";
  // la luz del estudio: lunes de mañana, miércoles 23:40 (noche, la lámpara), viernes 19:00 (tarde); Q3n a oscuras
  let modo = lugar === "of" ? "dia" : lugar;
  if (lugar === "of" && !parte2 && t >= T.r2 && t < T.r3) modo = "noche";
  if (lugar === "of" && !parte2 && t >= T.r3) modo = "tarde";
  if (pa === "Q3n") modo = "oscuro";
  if (pa === "Q3b") modo = "tarde";
  const lampOn = modo === "noche" || modo === "tarde";
  ponerLuces(modo, lampOn);
  scene.background = new THREE.Color(lugar === "patio" ? 0xf1e6cf : lugar === "pan" ? 0xf2efe6 : 0x16243d);
  const insLiso = ["Q2", "P5i", "Q4i"].includes(pa);   // los insertos de celular sobre fondo liso (el mostrador o la mesa tapaban)
  OF.visible = lugar === "of"; PAT.visible = lugar === "patio" && !insLiso; PAN.visible = lugar === "pan" && !insLiso;
  if (insLiso) scene.background = new THREE.Color(0xe9e7de);
  cartelPan.visible = pa !== "Q2m";
  renderer.toneMappingExposure = lugar === "of" && (modo === "dia" || modo === "tarde") ? 1.12 : 1.0;
  // ---- pantallas ----
  if (lugar === "of") { dibujarPantA(t); dibujarMon(t); }
  if (lugar === "pan") dibujarPantMar(t);
  if (lugar === "patio") { dibujarPantJ(t); dibujarPantAP(); }
  // las tazas: 1 → 2 → 3 en la ráfaga; en la parte 2 una sola
  TAZAS.forEach((z, i) => { z.visible = parte2 ? i === 0 : i === 0 || (i === 1 && t >= T.r2) || (i === 2 && t >= T.r3); });
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  celM.visible = celJ.visible = celAP.visible = false; pinza.visible = chorizoP.visible = platoA.visible = false;
  if (lugar === "of") {
    const vacia = pa === "Q3n";
    adriana.raiz.visible = !vacia;   // en el push-in al monitor queda a la izquierda, fuera de la pantalla
    adriana.ponerCampera(true);
    const pr = poseAdriana(t);
    // P2: graba con la izquierda: el dedo en el celular del soporte
    if (!parte2 && t >= T.p2 - 0.1 && t < T.envia + 0.1) { telA.updateMatrixWorld(true); const w = telA.userData.piv.localToWorld(V3(0, telA.userData.H * 0.15, 0.03)); const u = eio(sg(t, T.p2 - 0.1, T.a1 - 0.05)) * (1 - eio(sg(t, T.envia - 0.1, T.envia + 0.1))); pr.manoI = lerpV(pr.manoI, aCuerpo(adriana, w), u); pr.codoI = [1, -0.4, -0.3]; pr.dedoI = u; }
    adriana.poner(pr);
    sillaA.rotation.y = 0; sillaA.visible = true;
    lucas.raiz.visible = parte2 && pa === "Q3b"; if (lucas.raiz.visible) { lucas.poner(poseLucas(t)); sillaL.rotation.y = lucas.raiz.rotation.y; } else sillaL.rotation.y = 0;
  }
  if (lugar === "patio") {
    jorge.raiz.visible = !["P5i", "Q4i"].includes(pa);
    const pj = poseJorge(t);
    // la mano derecha lleva la pinza al chorizo (parte 1: de la parrilla al aire; P5/Q4: quieta; Q4: al pan)
    const chori = choriEn(t);
    const empu = chori.clone().add(V3(0.0, 0.02, 0.0)).add(V3(0.3, 0.0, 0.18).normalize().multiplyScalar(0.36));   // el mango, 0,36 m atrás del chorizo, hacia Jorge
    pj.manoD = aCuerpo(jorge, empu); pj.codoD = [-1, -0.6, -0.2]; pj.dedoD = 0;
    // P5 / Q4j: el celular en la izquierda, a la altura del pecho
    const leeJ = (t >= T.p5 && t < P2) || (t >= T.vibJ2 && parte2 && t < T.q4a);
    const t0c = parte2 ? T.vibJ2 : T.vibJ;
    const saca = eio(sg(t, t0c + 0.15, t0c + 0.55));
    if (leeJ) { pj.manoI = lerpV([0.12, 0.14, 0.26], [0.13, 0.33, 0.34], saca); pj.codoI = [0.8, -0.8, -0.2]; pj.dedoI = 0; }
    if (parte2 && t >= T.q4a) { pj.manoI = [0.29, -0.08, 0.04]; }
    jorge.poner(pj); jorge.raiz.updateMatrixWorld(true);
    if (jorge.anteojos) jorge.anteojos.visible = leeJ && saca > 0.5 && !(parte2 && t >= T.q4a);
    // la pinza: del mango (en la mano) al chorizo
    pinza.visible = !['P5i', 'Q4i'].includes(pa);
    const hD = manoW(jorge, "D");
    pinza.position.copy(hD); pinza.lookAt(chori); pinza.scale.z = Math.max(0.6, hD.distanceTo(chori) / 0.36);
    chorizoP.visible = !(parte2 && t >= T.q4a) && !['P5i', 'Q4i'].includes(pa);
    chorizoP.position.copy(chori); chorizoP.lookAt(hD); chorizoP.rotateY(Math.PI / 2);
    // el celular de Jorge: en el bolsillo del delantal (asoma); vibra; en la mano cuando lee
    celJ.visible = true;
    if (leeJ && saca > 0.02) { const h = manoW(jorge, "I"); const mira = jorge.cabeza.localToWorld(V3(0, 0.1, 0.4)).lerp(V3(PX2 - 1.05, 1.5, 1.5), 0.45); const bol = jorge.cuerpo.localToWorld(V3(0.0, 0.14, 0.26)); celJ.position.copy(bol.lerp(h.add(V3(0, 0.07, 0.02)), saca)); celJ.lookAt(mira); }
    else { celJ.position.copy(jorge.cuerpo.localToWorld(V3(0.0, 0.17, 0.255))); celJ.quaternion.copy(jorge.cuerpo.getWorldQuaternion(new THREE.Quaternion())); celJ.rotateX(-0.08); }
    const vib = (!parte2 && en(t, T.vibJ, T.vibJ + 0.4)) || (parte2 && en(t, T.vibJ2, T.vibJ2 + 0.4));
    if (vib) celJ.position.x += Math.sin(t * 95) * 0.004;
    // Adriana: sentada con el celular (P4, P5c, Q4) o parada al lado de Jorge (Q4a, C)
    const parada = parte2 && t >= T.q4a;
    adriana.raiz.visible = !["P5i", "Q4i"].includes(pa) && (pa !== "Q4j");
    adriana.ponerCampera(false);
    if (!parada) {
      const pa2 = poseAdrianaPatio(t); adriana.poner(pa2); adriana.raiz.updateMatrixWorld(true);
      sillaAP.visible = true;
      const deja = parte2 && t >= T.a5 - 0.35;
      if (!deja) { celAP.visible = true; celEnManos(celAP, adriana, adriana.cabeza.localToWorld(V3(0, 0.0, 0.5)), 0.05, 0.08); }
      else { celAP.visible = true; celAP.position.set(PX2 + ADRP.x + 0.12, MESA.alto + 0.012, MESA.z - 0.18); celAP.rotation.set(Math.PI / 2, 0, 0.3); }   // boca abajo en la mesa
      if (deja) { platoA.visible = true; const a = manoW(adriana, "I"), b = manoW(adriana, "D"); platoA.position.copy(a.add(b).multiplyScalar(0.5)).add(V3(0, 0.02, 0)); platoA.rotation.set(0, 0, 0); choripanPlato.visible = false; }
    } else {
      adriana.poner(poseAdrianaParada(t)); adriana.raiz.updateMatrixWorld(true);
      platoA.visible = true; const a = manoW(adriana, "I"), b = manoW(adriana, "D"); platoA.position.copy(a.add(b).multiplyScalar(0.5)).add(V3(0, 0.02, 0)); platoA.rotation.set(0, adriana.raiz.rotation.y + Math.PI / 2, 0); choripanPlato.visible = true;
      celAP.visible = true; celAP.position.set(PX2 + ADRP.x + 0.12, MESA.alto + 0.012, MESA.z - 0.18); celAP.rotation.set(Math.PI / 2, 0, 0.3);
    }
  }
  if (lugar === "pan") {
    marcelo.raiz.visible = pa === "Q2m"; marcelo.poner(poseMarceloPan(t)); marcelo.raiz.updateMatrixWorld(true);
    celM.visible = true; celEnManos(celM, marcelo, V3(PX + 0.32, 1.45, 3), 0.06, 0.06);
  }
  scene.updateMatrixWorld(true);
  // ---- cámara ----
  if (pl[2] && pa !== "portada") ponerCam(catmull(pl[2], t), t);
  if (pa === "Q2") {
    // el celular de Marcelo a pantalla llena (≥ 70 %), el pulgar abajo; push-in suave
    const { v, up } = vistaPantalla(celM, V3(0, 0, 0.007), V3(0, 0, 1), 0.162 * 1.25, 0.78, 40, -0.004);
    const k = sg(t, T.q2, T.q2m); const v2 = v.slice(); for (let i = 0; i < 3; i++) v2[i] += (v[i] - v[i + 3]) * 0.08 * (1 - k);
    ponerVista(v2, v2, 0, up, up);
  }
  if (pa === "P5i" || pa === "Q4i") {
    const { v, up } = vistaPantalla(celJ, V3(0, 0, 0.007), V3(0, 0, 1), 0.162 * 1.2, 0.72, 40, -0.004);
    const k = pa === "P5i" ? sg(t, T.p5i, T.p5j) : sg(t, T.q4i, T.q4a); const v2 = v.slice(); for (let i = 0; i < 3; i++) v2[i] += (v[i] - v[i + 3]) * 0.06 * (1 - k);
    ponerVista(v2, v2, 0, up, up);
  }
  if (pa === "Q3" || pa === "Q3r") {
    // push-in al monitor (vertical: llena el cuadro); Adriana fuera (su pelo pisaba la pantalla)
    const ins = vistaPantalla(monitor, monitor.userData.centro, V3(0, 0, 1), MON.H, 0.8, 40, -0.035).v;
    if (pa === "Q3") { const de = catmull(PLANOS.find((x) => x[0] === "Q2b")[2], T.q3); ponerVista(de, ins, eio(sg(t, T.q3, T.q3 + 0.35))); }
    else ponerCam(ins, t, true);
  }
  if (pa === "portada") {
    // la portada: el remate del asado (Jorge con el chorizo congelado en la pinza, Adriana con el celular)
    ponerCam([PX2 + 0.04, 1.4, 2.2, PX2 + 0.04, 0.95, -0.7, 50], t, true);   // los dos llenando la mitad de arriba (el texto va abajo)
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROT) ROT[k].visible = false;
  if (!LIMPIO && !en(tIn, P1, P2) && pa !== "portada") tarjetas(t, pa);
  renderer.render(scene, camera);
}
function tarjetas(t, pa) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const tel = () => objPx(telA.userData.piv, V3(0, telA.userData.H * 0.95, 0.01));
  if (pa === "P1") { const [tx, ty] = tel(); ponerGlobo(GL.m1, 560, 1560, 1, [tx, ty], 1); }
  if (pa === "Q1" && t >= T.m1b - 0.08) { const [tx, ty] = tel(); ponerGlobo(GL.m1, 560, 1560, t < T.m1b + LEN.m1 + 0.6 ? ent(T.m1b - 0.08) : 0, [tx, ty], 1); }
  if (pa === "P2" && t >= T.a1 - 0.04) hablar(GL.a1, adriana, ent(T.a1 - 0.04), 1, -60, 300);
  if (pa === "P3") {
    const [tx, ty] = tel();
    for (const k of ["g1", "w1", "m2"]) { const t0 = T[k] - 0.08, t1 = { g1: T.r2, w1: T.r3, m2: 99 }[k]; if (t >= t0 && t < t1) ponerGlobo(GL[k], 560, 1560, ent(t0), [tx, ty], 1); }
    if (t >= T.rotM) ponerGlobo(ROT.mismas, 330, 380, ent(T.rotM), null, 3);
  }
  if (pa === "P4" && t >= T.j1 - 0.04 && t < T.a2 - 0.05) hablar(GL.j1, jorge, ent(T.j1 - 0.04), 1, 40, 300);
  if (pa === "P4" && t >= T.a2 - 0.04) hablar(GL.a2, adriana, ent(T.a2 - 0.04), 1, 0, 300);
  if (pa === "P4b") { const [mx, my] = bocaPx(adriana); void mx; void my; ponerGlobo(GL.a2, 700, 330, 1, null, 1); }
  if (pa === "P5j") { const g = t < T.j2 + CORTE.j2 ? GL.j2a : GL.j2b; hablar(g, jorge, ent(T.j2 - 0.04), 1, 60, 280); }
  if (pa === "P5i" && t >= T.j2 - 0.04) ponerGlobo(GL.j2a, 540, 1770, ent(T.j2 - 0.04), null, 1);
  if (pa === "Q4i" && t >= T.j3 - 0.04) ponerGlobo(GL.j3a, 540, 1770, ent(T.j3 - 0.04), null, 1);
  if (pa === "Q4a" && t < T.a6 - 0.05) hablar(GL.j3b, jorge, 1, 1, 60, 280);
  if (pa === "Q2" && t >= T.boleta) ponerGlobo(ROT.datos, 540, 1790, ent(T.boleta), null, 2);
  if (pa === "Q2m" && t >= T.m3 - 0.04) hablar(GL.m3, marcelo, ent(T.m3 - 0.04), 1, 0, 280);
  if (pa === "Q2b" && t >= T.a3 - 0.04) hablar(GL.a3, adriana, ent(T.a3 - 0.04), 1, -60, 300);
  if (pa === "Q3r" && t >= T.cpv) ponerGlobo(ROT.fondo, 540, 1790, ent(T.cpv), null, 2);
  if (pa === "Q3b" && t >= T.l1 - 0.04 && t < T.a4 - 0.05) hablar(GL.l1, lucas, ent(T.l1 - 0.04), 1, 0, 300);
  if (pa === "Q3b" && t >= T.a4 - 0.04) hablar(GL.a4, adriana, ent(T.a4 - 0.04), 1, -40, 300);
  if (pa === "Q4" && t >= T.j1b - 0.04 && t < T.a5 - 0.05) hablar(GL.j1, jorge, ent(T.j1b - 0.04), 1, 40, 300);
  if (pa === "Q4" && t >= T.a5 - 0.04) hablar(GL.a5, adriana, ent(T.a5 - 0.04), 1, 0, 300);
  if (pa === "Q4j" && t >= T.j3 - 0.04) { const g = t < T.j3 + CORTE.j3 ? GL.j3a : GL.j3b; hablar(g, jorge, ent(T.j3 - 0.04), 1, 60, 280); }
  if (pa === "Q4a" && t >= T.a6 - 0.04) hablar(GL.a6, adriana, ent(T.a6 - 0.04), 1, 0, 300);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
