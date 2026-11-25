// Capa 3D de inmobiliaria-disponible (Three.js r170 local). Base técnica: reels/inmobiliaria-visitas (la oficina de
// Silvana Propiedades, Silvana y Diego, tarjetas pegadas a la cámara, regla de burbujas, cámara por planos con
// Catmull-Rom). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin
// semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   LA OFICINA DE "SILVANA PROPIEDADES" (alrededor del origen): ladrillo pintado crema con la franja verde y el nombre,
//     el panel de fichas con la ficha ALQUILA · PUNTA CARRETAS (borde verde), el escritorio de Silvana con el monitor, el
//     celular en su soporte y la taza; sin el tablero de llaves de inmobiliaria-visitas
//   EL LIVING VACÍO DE PARQUE BATLLE (x = 60): crema, monolítico claro en placas grandes, ventanal con marco navy y los
//     árboles del parque, el foco pelado y la escalera de pintor
//   EL PALIER 3B DE PUNTA CARRETAS (x = 120): puerta navy3 con mirilla y "3B" de bronce, felpudo crema, la planta
//   PARTE 1: "Silvana. El de Punta Carretas explota. Van doce." · "Contestales vos." · "Estoy mostrando." · "Yo también." ·
//            la escalada (12 → 38) · "¡Hola, Agustina! Perdón la demora. Sí, sigue disponible." · "¡Qué bueno! Yo ya no." ·
//            la pausa · don Alberto · "Preguntar, preguntaron."
//   PARTE 2: la misma visita · "¿Y quién contesta?" · el chat del agente · "Ya contestó. Le pidió la garantía y agendó." ·
//            el panel · "Esos dos, para mí." · el palier: "¿Sigue disponible?" / "Sí." / "¡Qué bueno! Yo también." · don
//            Alberto · "Treinta y ocho. Seis visitas. Y el viernes firman." · RESERVADO · "Comentá DISPONIBLE…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, DEFECTO, PIEL, PELO, CARA, BRAZOS, pegarACamara, crearCelular, crearMochila } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, PAL, LIMPIO, VER as VERM } from "./tiempos3d.js";
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
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, gris: 0xc9ccd2, hoja: 0x4f7a3a };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  gris: mat(C.gris, 0.35, { metalness: 0.3 }), hoja: mat(C.hoja, 0.8),
  vidrio: new THREE.MeshBasicMaterial({ color: 0xcfe2f2, transparent: true, opacity: 0.1, depthWrite: false }),
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
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
const rr = (x, a, b, w, h, r, fill, stroke, lw) => { x.beginPath(); x.roundRect(a, b, w, h, r); if (fill) { x.fillStyle = fill; x.fill(); } if (stroke) { x.strokeStyle = stroke; x.lineWidth = lw; x.stroke(); } };

// =====================================================================================================
// LA OFICINA DE "SILVANA PROPIEDADES" (alrededor del origen, piso y = 0)
//   pared del fondo (z = -0.6): ladrillo pintado crema, franja verde a 1,6 m, "SILVANA PROPIEDADES" en letras navy; el
//   PANEL DE FICHAS a la izquierda de Silvana (+x, a la derecha del cuadro) con la ficha ALQUILA · PUNTA CARRETAS grande
//   Silvana sentada en (0, 0.3) mirando a +z; el monitor a su derecha (-x), el celular en su soporte a su izquierda (+x)
// =====================================================================================================
const OF = new THREE.Group(); scene.add(OF);
const OFI = { x0: -2.8, x1: 2.8, z0: -0.6, z1: 5.15, alto: 3.0 };
const MESA_Y = 0.76;
const SIL = { x: 0, z: 0.3 };
const DESK_S = { x0: -0.72, x1: 0.72, z0: 0.78, z1: 1.52 };
const MON = { x: -0.74, z: 0.98, ry: 0.62, W: 0.42, H: 0.672 };   // (r1) vertical: el panel entero en un cuadro vertical
const pantM = lienzo(1000, 1600, () => {});       // el monitor de Silvana
const pantS = lienzo(600, 1200, () => {});        // el celular de Silvana
const pantD = lienzo(600, 1200, () => {});        // el celular de Diego
let monitor, telS, telP, fichaPC, franjaRes, fichaPCmat, texFichaV, texFichaG, calleM, enfrenteM;
const paredM = mat(0xefeee5, 0.9);
const ladrilloT = lienzo(1024, 1024, (x, w, h) => {
  x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, h);
  const bh = 64, bw = 200;
  for (let r = 0; r < h / bh; r++) for (let c = -1; c < w / bw + 1; c++) {
    const ox = (r % 2) * (bw / 2);
    x.fillStyle = (r * 7 + c * 3) % 5 === 0 ? "#ebe9df" : "#efeee5"; x.fillRect(c * bw + ox + 6, r * bh + 6, bw - 12, bh - 12);
  }
});
ladrilloT.wrapS = ladrilloT.wrapT = THREE.RepeatWrapping; ladrilloT.repeat.set(5.6 / 2.2, 3.0 / 2.2);
{
  const OW = OFI.x1 - OFI.x0, OD = OFI.z1 - OFI.z0, OZ = (OFI.z0 + OFI.z1) / 2;
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#22355a"; x.lineWidth = 5; x.strokeRect(0, 0, w, h); });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(OW / 0.9, OD / 0.9);
  const piso = mesh(new THREE.PlaneGeometry(OW, OD), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0, 0, OZ); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; OF.add(piso);
  OF.add(cajaS(OW, 0.1, OD, mat(0xe4e2d6, 0.95), 0, OFI.alto + 0.05, OZ));
  for (const [x, z] of [[-1.2, 1.2], [1.2, 1.2], [-1.2, 3.6], [1.2, 3.6]]) { const l = mesh(new THREE.PlaneGeometry(1.0, 0.5), new THREE.MeshBasicMaterial({ color: 0xfbfaf4 }), x, OFI.alto - 0.005, z); l.rotation.x = Math.PI / 2; l.castShadow = false; OF.add(l); }
  const fondo = mesh(new THREE.BoxGeometry(OW, OFI.alto, 0.12), new THREE.MeshStandardMaterial({ map: ladrilloT, roughness: 0.92 }), 0, OFI.alto / 2, OFI.z0 - 0.06); fondo.castShadow = false; OF.add(fondo);
  OF.add(caja(OW, 0.25, 0.025, M.g, 0, 1.725, OFI.z0 + 0.012, 0.004));
  const nombreT = lienzo(2048, 200, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "SILVANA PROPIEDADES", 800, 150, w - 40); x.fillText("SILVANA PROPIEDADES", w / 2, h / 2 + 6); });
  const nm = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.107), new THREE.MeshStandardMaterial({ map: nombreT, transparent: true, roughness: 0.5 })); nm.position.set(0.12, 2.3, OFI.z0 + 0.05); OF.add(nm);
  for (const x of [OFI.x0, OFI.x1]) { const p = mesh(new THREE.BoxGeometry(0.12, OFI.alto, OD), paredM, x, OFI.alto / 2, OZ); p.castShadow = false; OF.add(p); OF.add(caja(0.03, 0.12, OD, M.navy3, x - Math.sign(x) * 0.07, 0.06, OZ)); }
  OF.add(caja(OW, 0.12, 0.03, M.navy3, 0, 0.06, OFI.z0 + 0.02));
  // la vidriera a la calle (z1), detrás de la cámara: de día clara, de noche navy
  for (const x of [-2.75, -1.4, 0, 1.4, 2.75]) OF.add(caja(0.09, OFI.alto, 0.12, M.navy3, x, OFI.alto / 2, OFI.z1));
  OF.add(caja(OW, 0.12, 0.14, M.navy3, 0, 0.06, OFI.z1)); OF.add(caja(OW, 0.14, 0.14, M.navy3, 0, 2.55, OFI.z1));
  calleM = new THREE.MeshBasicMaterial({ color: 0xe6ebec }); enfrenteM = new THREE.MeshBasicMaterial({ color: 0xcfd6da });
  const calle = mesh(new THREE.PlaneGeometry(14, 6), calleM, 0, 2.5, OFI.z1 + 3.5); calle.rotation.y = Math.PI; calle.castShadow = false; OF.add(calle);
  const enfrente = mesh(new THREE.PlaneGeometry(14, 2.3), enfrenteM, 0, 1.15, OFI.z1 + 3.4); enfrente.rotation.y = Math.PI; enfrente.castShadow = false; OF.add(enfrente);
  // una planta grande en el rincón (a la derecha del monitor)
  const mac = new THREE.Group(); mac.position.set(-1.45, 0, -0.2); OF.add(mac);
  mac.add(mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.42, 20), M.navy3, 0, 0.21, 0));
  semilla = 5; for (let i = 0; i < 14; i++) { const h = mesh(new THREE.SphereGeometry(0.13, 10, 8), M.hoja, (az() - 0.5) * 0.36, 0.6 + az() * 0.7, (az() - 0.5) * 0.3); h.scale.set(1, 1.7, 0.6); h.rotation.z = (az() - 0.5) * 1.2; mac.add(h); }
}
// ---- las fichas de propiedades (A4 crema con encabezado VENDE navy / ALQUILA verde oscuro, la casita y el precio) ----
function texFicha(tipo, barrio, dorm, precio, borde = null) {
  return lienzo(840, 1188, (x) => {
    x.scale(2, 2); const w = 420, h = 594;
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = tipo === "VENDE" ? "#16243d" : "#3fa60a"; x.fillRect(0, 0, w, 120);
    x.fillStyle = "#efeee5"; x.textBaseline = "middle"; x.textAlign = "left"; { const px = tipo === "VENDE" ? 96 : 80, sp = 10; x.font = F(800, px); const ws = [...tipo].map((ch) => x.measureText(ch).width); let xx = (w - ws.reduce((a, b) => a + b, 0) - sp * (ws.length - 1)) / 2; [...tipo].forEach((ch, i) => { x.fillText(ch, xx, 66); xx += ws[i] + sp; }); }
    x.textAlign = "center";
    x.strokeStyle = "#16243d"; x.lineWidth = 12; x.lineJoin = "round";
    x.beginPath(); x.moveTo(90, 300); x.lineTo(210, 190); x.lineTo(330, 300); x.moveTo(115, 280); x.lineTo(115, 390); x.lineTo(305, 390); x.lineTo(305, 280); x.stroke();
    x.strokeRect(185, 315, 50, 75);
    x.fillStyle = "#16243d"; ajustar(x, barrio, 900, 64, w - 30); x.fillText(barrio, w / 2, 448);
    x.font = F(700, 42); x.fillText(dorm, w / 2, 502);
    x.fillStyle = tipo === "VENDE" ? "#0b1220" : "#3fa60a"; ajustar(x, precio, 900, 54, w - 30); x.fillText(precio, w / 2, 556);
    if (borde) { x.strokeStyle = borde; x.lineWidth = 14; x.strokeRect(7, 7, w - 14, h - 14); }
  });
}
{
  // el panel de la pared del fondo (a la izquierda de Silvana: a la derecha del cuadro): marco navy3, cable y broches
  const P = new THREE.Group(); P.position.set(0.62, 0.42, OFI.z0 + 0.02); OF.add(P);
  P.add(caja(1.02, 0.035, 0.03, M.navy3, 0, 1.6, 0.02, 0.008));
  const fich = [["VENDE", "CORDÓN", "2 dorm.", "USD 165.000", -0.36, 1.33], ["ALQUILA", "CENTRO", "2 dorm.", "$ 28.500", -0.36, 0.98], ["VENDE", "BUCEO", "3 dorm.", "USD 245.000", 0.36, 1.33], ["ALQUILA", "AGUADA", "1 dorm.", "$ 22.000", 0.36, 0.98]];
  for (const [tp, b, d, p, x, y] of fich) { const w = 0.17; P.add(plano(w, w * 1.414, texFicha(tp, b, d, p), x, y, 0.035)); P.add(caja(0.025, 0.02, 0.012, M.navy, x, y + w * 0.707 - 0.01, 0.045, 0.004)); }
  texFichaV = texFicha("ALQUILA", "PUNTA CARRETAS", "1 dorm.", "$ 30.000", "#5ce611");
  texFichaG = texFicha("ALQUILA", "PUNTA CARRETAS", "1 dorm.", "$ 30.000", "#b4b2a3");
  fichaPC = new THREE.Group(); fichaPC.position.set(0.0, 1.16, 0.05); P.add(fichaPC);
  const fp = plano(0.3, 0.3 * 1.414, texFichaV, 0, 0, 0); fichaPCmat = fp.material; fichaPC.add(fp);
  fichaPC.add(caja(0.03, 0.022, 0.012, M.navy, 0, 0.212, 0.01, 0.004));
  // la franja RESERVADO ✓ (verde de marca, Lexend 900 navy) que cae en diagonal en Q4
  const fT = lienzo(1000, 220, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 14; x.strokeRect(7, 7, w - 14, h - 14); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "RESERVADO ✓", 900, 140, w - 70); x.fillText("RESERVADO ✓", w / 2, h / 2 + 6); });
  franjaRes = new THREE.Group(); fichaPC.add(franjaRes);
  franjaRes.add(plano(0.36, 0.079, fT, 0, 0, 0.008, true));
  franjaRes.rotation.z = 0.32;
}
// ---- EL ESCRITORIO DE SILVANA: tapa crema, patas navy3; el monitor, el teclado, el celular en su soporte, la taza ----
const MADERA_CR = mat(0xe8e2d0, 0.6);
function escritorio(x0, x1, z0, z1) {
  const g = new THREE.Group();
  const DW = x1 - x0, DD = z1 - z0, CX = (x0 + x1) / 2, CZ = (z0 + z1) / 2;
  g.add(caja(DW, 0.045, DD, MADERA_CR, CX, MESA_Y - 0.022, CZ, 0.01));
  for (const x of [x0 + 0.04, x1 - 0.04]) g.add(caja(0.045, MESA_Y - 0.045, DD - 0.08, M.navy3, x, (MESA_Y - 0.045) / 2, CZ));
  g.add(caja(DW - 0.1, 0.42, 0.02, M.navy3, CX, MESA_Y - 0.28, z0 + 0.05));
  return g;
}
function silla() {
  const g = new THREE.Group();
  g.add(caja(0.5, 0.07, 0.48, M.navy, 0, 0.47, 0)); g.add(caja(0.46, 0.55, 0.07, M.navy, 0, 0.82, -0.24));
  g.add(cajaS(0.05, 0.4, 0.05, M.gris, 0, 0.24, 0));
  for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; const p = cajaS(0.3, 0.03, 0.04, M.gris, Math.cos(a) * 0.15, 0.04, Math.sin(a) * 0.15); p.rotation.y = -a; g.add(p); }
  return sombras(g);
}
const sillaS = silla(); sillaS.position.set(SIL.x, 0, SIL.z - 0.02); OF.add(sillaS);
const tazaS = new THREE.Group();   // la taza de café de Silvana (navy3 con franja verde); va en su mano o en la mesa
{
  OF.add(escritorio(DESK_S.x0, DESK_S.x1, DESK_S.z0, DESK_S.z1));
  monitor = new THREE.Group(); monitor.position.set(MON.x, MESA_Y, MON.z); monitor.rotation.y = MON.ry; OF.add(monitor);
  monitor.add(caja(0.08, 0.22, 0.08, M.navy, 0, 0.11, -0.05)); monitor.add(caja(0.28, 0.02, 0.2, M.navy, 0, 0.01, -0.03));
  monitor.add(caja(MON.W + 0.05, MON.H + 0.05, 0.045, M.navy, 0, 0.2 + MON.H / 2, 0, 0.018));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(MON.W, MON.H), new THREE.MeshBasicMaterial({ map: pantM, toneMapped: false })); pm.position.set(0, 0.2 + MON.H / 2, 0.024); monitor.add(pm);
  monitor.userData.centro = V3(0, 0.2 + MON.H / 2, 0.024);
  const tec = new THREE.Group(); tec.position.set(-0.12, MESA_Y, 1.12); tec.rotation.y = 0.25; OF.add(tec);
  tec.add(caja(0.42, 0.02, 0.14, M.navy3, 0, 0.01, 0, 0.008));
  for (let i = 0; i < 3; i++) for (let k = 0; k < 10; k++) tec.add(caja(0.028, 0.01, 0.028, M.cr2, -0.17 + k * 0.038, 0.024, -0.04 + i * 0.038, 0.004));
  // el celular de Silvana parado en un soporte (funda crema), la pantalla a la cámara
  telS = new THREE.Group(); telS.position.set(0.42, MESA_Y, 1.06); telS.rotation.y = -0.2; OF.add(telS);
  telS.add(caja(0.12, 0.012, 0.1, M.navy3, 0, 0.006, 0, 0.004)); telS.add(caja(0.1, 0.07, 0.012, M.navy3, 0, 0.04, -0.035, 0.004));
  const piv = new THREE.Group(); piv.position.set(0, 0.018, 0.0); piv.rotation.x = -0.36; telS.add(piv);
  const S = 1.35, W = 0.08 * S, H = 0.16 * S;
  piv.add(caja(W + 0.008, H + 0.008, 0.013, mat(0xe0dccb, 0.5), 0, H / 2, 0, 0.012));
  const sp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: pantS, toneMapped: false })); sp.position.set(0, H / 2, 0.0072); piv.add(sp);
  telS.userData = { piv, sp, centro: V3(0, H / 2, 0.0072), H, W };
  // el celular acostado sobre la mesa (la escalada de la noche): el mismo, boca arriba
  telP = new THREE.Group(); telP.position.set(0.3, MESA_Y + 0.008, 1.26); telP.rotation.set(-Math.PI / 2, 0, 0.18); OF.add(telP);
  telP.add(caja(W + 0.008, H + 0.008, 0.013, mat(0xe0dccb, 0.5), 0, 0, 0, 0.012));
  const sp2 = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: pantS, toneMapped: false })); sp2.position.set(0, 0, 0.0072); telP.add(sp2);
  telP.userData = { centro: V3(0, 0, 0.0072), H, W };
  // portalápices y una carpeta
  const pl = new THREE.Group(); pl.position.set(0.62, MESA_Y, 0.92); OF.add(pl);
  pl.add(mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.1, 16), M.navy3, 0, 0.05, 0));
  for (const [dx, c] of [[-0.01, M.g], [0.012, M.cr], [0.0, M.red]]) { const l = mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.15, 6), c, dx, 0.1, 0.005); l.rotation.z = dx * 8; pl.add(l); }
  OF.add(caja(0.24, 0.018, 0.32, M.gd, -0.4, MESA_Y + 0.009, 1.3, 0.006));
  // la taza
  tazaS.add(mesh(new THREE.CylinderGeometry(0.042, 0.036, 0.1, 20), M.navy3, 0, 0.05, 0));
  tazaS.add(mesh(new THREE.CylinderGeometry(0.0425, 0.0425, 0.02, 20), M.g, 0, 0.07, 0));
  tazaS.add(mesh(new THREE.CylinderGeometry(0.037, 0.037, 0.004, 20), mat(0x4a2e1c, 0.35), 0, 0.093, 0));
  tazaS.add(mesh(new THREE.TorusGeometry(0.025, 0.008, 8, 14), M.navy3, 0.047, 0.052, 0));
  sombras(tazaS); scene.add(tazaS);
  sombras(OF);
}
// ---- luces de la oficina: pareja (de día) o de noche (la lámpara del techo, la vidriera navy) ----
const solOf = new THREE.DirectionalLight(0xfff6ea, 1.5);
solOf.castShadow = true; solOf.shadow.mapSize.set(2048, 2048); solOf.shadow.bias = -0.0008; solOf.shadow.radius = 3;
Object.assign(solOf.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 0.5, far: 20 });
solOf.position.set(1.2, 4.5, 7.5); solOf.target.position.set(0, 0.8, 1.5); scene.add(solOf, solOf.target);
const cieloOf = new THREE.HemisphereLight(0xf7f4ec, 0x4a4e5a, 2.0); scene.add(cieloOf);
const rellenoOf = new THREE.DirectionalLight(0xe8eefa, 0.7); rellenoOf.position.set(-3, 2.5, 3); rellenoOf.target.position.set(0, 1, 1); scene.add(rellenoOf, rellenoOf.target);

// =====================================================================================================
// EL LIVING VACÍO DE PARQUE BATLLE (x = BX, piso y = 0): pared del fondo z = -3 con el ventanal y los árboles del parque,
// paredes crema, monolítico claro en placas grandes, el foco pelado, la escalera de pintor plegada
// =====================================================================================================
const BX = 60;
const LV = new THREE.Group(); LV.position.x = BX; scene.add(LV);
const LIV = { x0: -2.6, x1: 2.6, z0: -3.0, z1: 4.0, alto: 2.65 };
const VENT = { x0: -1.5, x1: 0.9, y0: 0.55, y1: 2.35 };
let foco;
{
  const LW = LIV.x1 - LIV.x0, LD = LIV.z1 - LIV.z0, LZ = (LIV.z0 + LIV.z1) / 2;
  const monoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#cfcabb"; x.fillRect(0, 0, w, h); semilla = 3; for (let i = 0; i < 260; i++) { x.fillStyle = az() > 0.5 ? "#c9c4b4" : "#d6d1c3"; x.fillRect(az() * w, az() * h, 3 + az() * 5, 3 + az() * 5); } x.strokeStyle = "#b5ae9c"; x.lineWidth = 5; x.strokeRect(0, 0, w, h); });
  monoT.wrapS = monoT.wrapT = THREE.RepeatWrapping; monoT.repeat.set(LW / 0.8, LD / 0.8);
  const p = mesh(new THREE.PlaneGeometry(LW, LD), new THREE.MeshStandardMaterial({ map: monoT, roughness: 0.7 }), 0, 0, LZ); p.rotation.x = -Math.PI / 2; p.castShadow = false; LV.add(p);
  LV.add(cajaS(LW, 0.1, LD, mat(0xf2f0e8, 0.95, { emissive: 0xb8b6ac, emissiveIntensity: 0.8 }), 0, LIV.alto + 0.05, LZ));
  const pm = mat(0xefeee5, 0.92);
  for (const x of [LIV.x0, LIV.x1]) { const w = cajaS(0.12, LIV.alto, LD, pm, x, LIV.alto / 2, LZ); w.castShadow = false; LV.add(w); LV.add(caja(0.03, 0.1, LD, M.navy3, x - Math.sign(x) * 0.07, 0.05, LZ)); }
  // la pared del fondo con el ventanal (cuatro paños alrededor del hueco)
  const tramo = (a, b, y0, y1) => { const w = cajaS(b - a, y1 - y0, 0.14, pm, (a + b) / 2, (y0 + y1) / 2, LIV.z0); w.castShadow = false; LV.add(w); };
  tramo(LIV.x0, VENT.x0, 0, LIV.alto); tramo(VENT.x1, LIV.x1, 0, LIV.alto); tramo(VENT.x0, VENT.x1, 0, VENT.y0); tramo(VENT.x0, VENT.x1, VENT.y1, LIV.alto);
  LV.add(caja(LW, 0.1, 0.02, M.navy3, 0, 0.05, LIV.z0 + 0.08));
  // el marco navy del ventanal (grueso) y los parantes: tres paños
  const VW = VENT.x1 - VENT.x0, VC = (VENT.x0 + VENT.x1) / 2, VY = (VENT.y0 + VENT.y1) / 2, VH = VENT.y1 - VENT.y0;
  for (const x of [VENT.x0, VENT.x1, VENT.x0 + VW / 3, VENT.x0 + (2 * VW) / 3]) LV.add(caja(0.08, VH + 0.08, 0.1, M.navy3, x, VY, LIV.z0 + 0.04));
  for (const y of [VENT.y0, VENT.y1]) LV.add(caja(VW + 0.08, 0.08, 0.12, M.navy3, VC, y, LIV.z0 + 0.04));
  LV.add(caja(VW + 0.2, 0.05, 0.22, M.cr2, VC, VENT.y0 - 0.02, LIV.z0 + 0.1));
  // afuera: el cielo claro y los árboles low-poly del parque (verde oscuro, planos), un muro bajo y el césped
  const cielo = mesh(new THREE.PlaneGeometry(30, 14), new THREE.MeshBasicMaterial({ color: 0xdfe9ec }), 0, 4, -14); cielo.castShadow = false; LV.add(cielo);
  const cesped = mesh(new THREE.PlaneGeometry(30, 12), new THREE.MeshBasicMaterial({ color: 0x8fb36a }), 0, -0.6, -9); cesped.rotation.x = -Math.PI / 2; cesped.castShadow = false; LV.add(cesped);
  const copaM = [new THREE.MeshLambertMaterial({ color: 0x3fa60a, flatShading: true }), new THREE.MeshLambertMaterial({ color: 0x2f7d0a, flatShading: true }), new THREE.MeshLambertMaterial({ color: 0x4f8f2a, flatShading: true })];
  const troncoM = new THREE.MeshLambertMaterial({ color: 0x5a4636 });
  semilla = 17;
  for (let i = 0; i < 11; i++) {
    const x = -5.5 + i * 1.05 + az() * 0.4, z = -6 - az() * 4, h = 2.2 + az() * 1.6, r = 0.9 + az() * 0.6;
    const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, h, 6), troncoM); tr.position.set(x, -0.6 + h / 2, z); LV.add(tr);
    const co = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), copaM[i % 3]); co.position.set(x, -0.6 + h + r * 0.55, z); co.rotation.set(az(), az(), az()); co.scale.set(1, 1.15, 1); LV.add(co);
  }
  // el foco pelado: el cable, el portalámparas y la lamparita (emisiva cálida)
  foco = new THREE.Group(); foco.position.set(0.35, LIV.alto, -0.6); LV.add(foco);
  foco.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.55, 6), M.navy, 0, -0.275, 0));
  foco.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.06, 12), M.navy, 0, -0.58, 0));
  const lamp = mesh(new THREE.SphereGeometry(0.045, 16, 12), new THREE.MeshStandardMaterial({ color: 0xfff1c8, emissive: 0xffe3a0, emissiveIntensity: 1.3 }), 0, -0.64, 0); lamp.scale.set(1, 1.25, 1); lamp.castShadow = false; foco.add(lamp);
  // la escalera de pintor plegada contra la pared de la derecha
  const esc = new THREE.Group(); esc.position.set(LIV.x1 - 0.2, 0, -2.0); esc.rotation.set(0, -Math.PI / 2, 0); LV.add(esc);
  const madera = mat(0xd7b98a, 0.75);
  const pata = (x, z, rx) => { const p2 = caja(0.05, 1.7, 0.03, madera, x, 0.82, z, 0.008); p2.rotation.x = rx; esc.add(p2); };
  pata(-0.22, 0.08, -0.06); pata(0.22, 0.08, -0.06); pata(-0.22, 0.0, -0.1); pata(0.22, 0.0, -0.1);
  for (let k = 0; k < 5; k++) esc.add(caja(0.46, 0.03, 0.09, madera, 0, 0.3 + k * 0.32, 0.06 - k * 0.018, 0.006));
  esc.add(caja(0.48, 0.04, 0.16, madera, 0, 1.66, -0.02, 0.008));
  // un tarro de pintura y una lona al pie de la pared del fondo (apartamento recién pintado)
  const tarro = new THREE.Group(); tarro.position.set(1.6, 0, -2.55); LV.add(tarro);
  tarro.add(mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.22, 20), M.cr, 0, 0.11, 0)); tarro.add(mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.06, 20), M.g, 0, 0.12, 0)); tarro.add(mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.015, 20), M.cr3, 0, 0.225, 0));
  const lona = mesh(new THREE.PlaneGeometry(1.2, 0.8), mat(0xd9d7c9, 0.95), 1.4, 0.004, -2.45); lona.rotation.x = -Math.PI / 2; lona.rotation.z = 0.1; LV.add(lona);
  sombras(LV);
}
const solLv = new THREE.DirectionalLight(0xfff3e2, 1.6);
solLv.castShadow = true; solLv.shadow.mapSize.set(2048, 2048); solLv.shadow.bias = -0.0008; solLv.shadow.radius = 3;
Object.assign(solLv.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 0.5, far: 20 });
solLv.position.set(BX - 1.2, 3.4, -4.5); solLv.target.position.set(BX, 0.6, 0.6); scene.add(solLv, solLv.target);
const cieloLv = new THREE.HemisphereLight(0xfbf8f0, 0x9a9484, 2.3); scene.add(cieloLv);
const frenteLv = new THREE.DirectionalLight(0xf2f4fa, 1.4); frenteLv.position.set(BX + 1.5, 2.2, 5); frenteLv.target.position.set(BX, 1.1, 0); scene.add(frenteLv, frenteLv.target);

// =====================================================================================================
// EL PALIER 3B DE PUNTA CARRETAS (x = PX, piso y = 0): pared crema z = 0 con la puerta 3B (navy3, mirilla, "3B" de
// bronce), el felpudo crema, una planta en maceta navy, el piso de baldosa clara; detrás de la puerta, el apartamento claro
// =====================================================================================================
const PX = 120;
const PA = new THREE.Group(); PA.position.x = PX; scene.add(PA);
const PUERTA = { x0: -0.46, x1: 0.46, alto: 2.08 };
let puerta3B, llaveP;
const bronce = mat(0xb08d57, 0.35, { metalness: 0.55 });
{
  const pm = mat(0xefeee5, 0.92);
  const balT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, h); x.fillStyle = "#e2dfd2"; x.fillRect(8, 8, w / 2 - 16, h / 2 - 16); x.fillRect(w / 2 + 8, h / 2 + 8, w / 2 - 16, h / 2 - 16); x.strokeStyle = "#bcb7a6"; x.lineWidth = 6; x.strokeRect(0, 0, w, h); x.beginPath(); x.moveTo(w / 2, 0); x.lineTo(w / 2, h); x.moveTo(0, h / 2); x.lineTo(w, h / 2); x.stroke(); });
  balT.wrapS = balT.wrapT = THREE.RepeatWrapping; balT.repeat.set(8 / 0.8, 6 / 0.8);
  const piso = mesh(new THREE.PlaneGeometry(8, 6), new THREE.MeshStandardMaterial({ map: balT, roughness: 0.75 }), 0, 0, 2.6); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; PA.add(piso);
  const tramo = (a, b, y0, y1) => { const w = cajaS(b - a, y1 - y0, 0.16, pm, (a + b) / 2, (y0 + y1) / 2, -0.08); w.castShadow = false; PA.add(w); };
  tramo(-4, PUERTA.x0, 0, 2.7); tramo(PUERTA.x1, 4, 0, 2.7); tramo(PUERTA.x0, PUERTA.x1, PUERTA.alto, 2.7);
  PA.add(cajaS(8, 0.1, 6, mat(0xe8e6dc, 0.95), 0, 2.75, 2.6));
  const lat = cajaS(0.12, 2.7, 6, pm, -2.2, 1.35, 2.6); lat.castShadow = false; PA.add(lat);
  PA.add(caja(8, 0.1, 0.02, M.navy3, 0, 0.05, 0.01));
  // el marco de la puerta (navy) y la hoja (navy3) con la mirilla, el 3B de bronce y el picaporte
  for (const x of [PUERTA.x0, PUERTA.x1]) PA.add(caja(0.07, PUERTA.alto + 0.04, 0.06, M.navy, x, PUERTA.alto / 2, 0.02));
  PA.add(caja(PUERTA.x1 - PUERTA.x0 + 0.14, 0.07, 0.06, M.navy, 0, PUERTA.alto + 0.02, 0.02));
  puerta3B = new THREE.Group(); puerta3B.position.set(PUERTA.x0 + 0.035, 0, -0.01); PA.add(puerta3B);
  const PW = PUERTA.x1 - PUERTA.x0 - 0.07;
  puerta3B.add(caja(PW, PUERTA.alto - 0.02, 0.05, M.navy3, PW / 2, PUERTA.alto / 2, 0, 0.01));
  for (const y of [0.55, 1.45]) puerta3B.add(caja(PW - 0.2, 0.62, 0.012, M.navy2, PW / 2, y, 0.028, 0.01));
  puerta3B.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.02, 16).rotateX(Math.PI / 2), bronce, PW / 2, 1.58, 0.035));
  const nT = lienzo(256, 160, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#b08d57"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 130); x.fillText("3B", w / 2, h / 2 + 6); });
  const num = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.125), new THREE.MeshStandardMaterial({ map: nT, transparent: true, roughness: 0.35, metalness: 0.2, emissive: 0x6a5230, emissiveMap: nT })); num.position.set(PW / 2, 1.78, 0.032); puerta3B.add(num);
  puerta3B.add(caja(0.14, 0.03, 0.05, bronce, PW - 0.1, 1.0, 0.05, 0.01)); puerta3B.add(caja(0.04, 0.12, 0.012, bronce, PW - 0.07, 0.96, 0.03, 0.006));
  puerta3B.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.02, 12).rotateX(Math.PI / 2), M.navy, PW - 0.07, 0.92, 0.038));
  // la llave con el llavero verde (en la cerradura); la mueve Silvana
  llaveP = new THREE.Group(); PA.add(llaveP);
  llaveP.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.008, 20).rotateX(Math.PI / 2), bronce, 0, 0, 0.02));
  llaveP.add(cajaS(0.012, 0.012, 0.03, bronce, 0, 0, 0.0));
  llaveP.add(mesh(new THREE.TorusGeometry(0.02, 0.005, 8, 16), M.gris, 0, -0.04, 0.02));
  llaveP.add(caja(0.05, 0.075, 0.012, M.g, 0, -0.085, 0.02, 0.01));
  // el felpudo, la planta en maceta navy, una lámpara de pared
  PA.add(caja(0.9, 0.02, 0.55, mat(0xd8cfb4, 0.95), 0, 0.01, 0.45, 0.01));
  PA.add(caja(0.8, 0.022, 0.45, mat(0xc4b996, 0.95), 0, 0.012, 0.45, 0.01));
  const mac = new THREE.Group(); mac.position.set(-1.25, 0, 0.35); PA.add(mac);
  mac.add(mesh(new THREE.CylinderGeometry(0.19, 0.15, 0.45, 20), M.navy3, 0, 0.225, 0));
  semilla = 23; for (let i = 0; i < 13; i++) { const h = mesh(new THREE.SphereGeometry(0.12, 10, 8), M.hoja, (az() - 0.5) * 0.34, 0.62 + az() * 0.6, (az() - 0.5) * 0.3); h.scale.set(1, 1.7, 0.6); h.rotation.z = (az() - 0.5) * 1.2; mac.add(h); }
  PA.add(caja(0.22, 0.12, 0.08, M.cr2, 1.3, 1.95, 0.04, 0.02)); PA.add(mesh(new THREE.SphereGeometry(0.07, 14, 10), new THREE.MeshStandardMaterial({ color: 0xfff6dc, emissive: 0xffe7b0, emissiveIntensity: 0.6 }), 1.3, 1.88, 0.1));
  // adentro del 3B: piso de madera clara y la pared del fondo iluminada (se ve al abrir)
  const adentro = mesh(new THREE.PlaneGeometry(3, 3), mat(0xd7b98a, 0.7), 0, 0.002, -1.6); adentro.rotation.x = -Math.PI / 2; adentro.castShadow = false; PA.add(adentro);
  PA.add(cajaS(3, 2.7, 0.1, new THREE.MeshStandardMaterial({ color: 0xf6f3e8, emissive: 0xe9e4d2, emissiveIntensity: 0.6 }), 0, 1.35, -3.0));
  PA.add(cajaS(0.1, 2.7, 3, pm, -1.5, 1.35, -1.5)); PA.add(cajaS(0.1, 2.7, 3, pm, 1.5, 1.35, -1.5));
  sombras(PA);
}
const solPa = new THREE.DirectionalLight(0xfff4e6, 1.3);
solPa.castShadow = true; solPa.shadow.mapSize.set(2048, 2048); solPa.shadow.bias = -0.0008; solPa.shadow.radius = 3;
Object.assign(solPa.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 14 });
solPa.position.set(PX + 1.6, 3.4, 4.2); solPa.target.position.set(PX, 0.9, 0.3); scene.add(solPa, solPa.target);
const cieloPa = new THREE.HemisphereLight(0xf7f4ec, 0x6e6a60, 1.9); scene.add(cieloPa);

// =====================================================================================================
// LOS PERSONAJES (Silvana y Diego como en inmobiliaria-visitas; Agustina nueva; la pareja de Parque Batlle)
// =====================================================================================================
const silvana = crearPersonaje({ ...DEFECTO, nombre: "Silvana", mejillasBajas: true, piel: PIEL.clara, pelo: 0x9ea3ad, peinado: "rodete", rodeteAtras: 0.42, cejasColor: 0x8a7f72, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true,
  camisa: C.cr, mangas: "largas", cuello: C.cr, cuelloBotones: false, campera: { color: C.navy3, cuello: C.navy3, cierre: C.navy2, abierta: true },
  pantalon: C.navy, zapatos: C.navy2, aros: C.g, labiosPegados: true, labios: 0xb5555a, mejillas: 0xe8968a, panza: 1.02, nariz: 0.05, alto: 0.98, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const diego = crearPersonaje({ ...DEFECTO, nombre: "Diego", mejillasBajas: true, piel: PIEL.clara, pelo: PELO.castaño, peinado: "jopo", jopoAlto: 0.7, barba: 0x4a3222, barbaLarga: 0.4, barbaOpacidad: 0.6, cejasColor: 0x4a3222,
  camisa: 0xf7f7f2, mangas: "largas", cuello: 0xf7f7f2, cuelloBotones: false, campera: { color: C.navy2, cuello: C.navy2, cierre: C.navy3, abierta: true },
  pantalon: 0x3a3f4a, zapatos: 0x3b2a20, panza: 0.98, nariz: 0.056, mejillas: 0xe39282, alto: 1.03, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const agustina = crearPersonaje({ ...DEFECTO, nombre: "Agustina", mejillasBajas: true, piel: PIEL.media, pelo: 0x3b2a22, peinado: "coletaAlta", cejasColor: 0x3b2a22, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true,
  camisa: C.navy3, mangas: "largas", cuello: null, cuelloBotones: false, cuelloAlto: 0.06, franja: null, campera: { color: C.cr, cuello: C.cr2, cierre: C.navy3, abierta: true },
  pantalon: 0x34466a, zapatos: C.cr, aros: C.g, labiosPegados: true, labios: 0xb5555a, mejillas: 0xe39282, panza: 0.95, nariz: 0.046, alto: 0.96, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const ella = crearPersonaje({ ...DEFECTO, nombre: "Ana", piel: PIEL.clara, pelo: PELO.rubio, peinado: "coleta", camisa: C.cr, mangas: "largas", campera: { color: C.cr, cuello: C.cr2, cierre: C.cr3, abierta: false }, pantalon: C.navy2, zapatos: C.navy, alto: 0.96, parpadeoCada: 999, parpadeosExtra: [] });
const el = crearPersonaje({ ...DEFECTO, nombre: "Martín", piel: PIEL.media, pelo: PELO.negro, peinado: "texturado", texturaAlto: 0.6, camisa: 0x2f5a26, mangas: "largas", cuello: 0x2f5a26, cuelloBotones: false, pantalon: 0x3a3f4a, zapatos: 0x2a2220, alto: 1.03, parpadeoCada: 999, parpadeosExtra: [] });
// la mochila navy de Agustina (a la espalda)
{ const m = crearMochila(C.navy3, C.navy); m.position.set(0, 0.32, -0.21); m.scale.setScalar(0.95); agustina.cuerpo.add(m); }
const TODOS = [silvana, diego, agustina, ella, el];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// los celulares en la mano: el de Silvana (funda crema, pantS) y el de Diego (funda navy2, pantD)
const celS = crearCelular(pantS, 0xe0dccb, 0.08 * 1.15, 0.16 * 1.15); scene.add(celS);
const celD = crearCelular(pantD, C.navy2, 0.08 * 1.2, 0.16 * 1.2); scene.add(celD);

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo; iniciales para los que no se ven ----
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
  AVATAR.silvana = leer(silvana, 0xefeee5); AVATAR.diego = leer(diego, 0xb9cde0); AVATAR.agustina = leer(agustina, 0xefeee5);
  rt.dispose();
}
const iniciales = (txt, fondo, tinta) => { const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d"); x.fillStyle = fondo; x.fillRect(0, 0, 256, 256); x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 110); x.fillText(txt, 128, 136); return cv; };
AVATAR.alberto = iniciales("DA", "#16243d", "#efeee5");
const INI = ["MR", "LC", "JP", "SF", "VG", "RB", "PA", "NM", "CL", "FD", "AL", "GS", "TB", "EO", "MV", "LS", "DR", "BC", "HN", "IP", "KM", "OT", "QF", "UR", "WZ", "YE", "XA", "ZN", "MB", "CP", "SR", "LN", "VA", "GT", "RF", "PB", "NC", "JD"];
const INI_CV = {};
const iniCv = (s, k) => INI_CV[s] || (INI_CV[s] = iniciales(s, ["#b9cde0", "#d9d7c9", "#c9d8b8", "#e2d4c0"][k % 4], "#16243d"));
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
// íconos genéricos de canal (navy sobre crema, sin logos ni colores de apps): casita = portal, globo = mensajes, cámara
function icono(x, tipo, cx, cy, r, fondo = "#16243d", tinta = "#efeee5") {
  x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.strokeStyle = tinta; x.fillStyle = tinta; x.lineWidth = r * 0.16; x.lineJoin = "round"; x.lineCap = "round";
  if (tipo === "casa") { x.beginPath(); x.moveTo(cx - r * 0.5, cy - r * 0.02); x.lineTo(cx, cy - r * 0.5); x.lineTo(cx + r * 0.5, cy - r * 0.02); x.moveTo(cx - r * 0.36, cy - r * 0.12); x.lineTo(cx - r * 0.36, cy + r * 0.45); x.lineTo(cx + r * 0.36, cy + r * 0.45); x.lineTo(cx + r * 0.36, cy - r * 0.12); x.stroke(); }
  else if (tipo === "globo") { x.beginPath(); x.ellipse(cx, cy - r * 0.06, r * 0.5, r * 0.38, 0, 0, 7); x.stroke(); x.beginPath(); x.moveTo(cx - r * 0.25, cy + r * 0.24); x.lineTo(cx - r * 0.4, cy + r * 0.5); x.lineTo(cx - r * 0.02, cy + r * 0.3); x.fill(); }
  else { x.beginPath(); x.rect(cx - r * 0.5, cy - r * 0.34, r, r * 0.68); x.moveTo(cx - r * 0.5, cy - r * 0.34); x.lineTo(cx, cy + r * 0.08); x.lineTo(cx + r * 0.5, cy - r * 0.34); x.stroke(); }   // (r1) sobre (la cámara parecía un logo)
}
function parlante(x, cx, cy, r) {
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(cx - r * 0.5, cy - r * 0.2); x.lineTo(cx - r * 0.22, cy - r * 0.2); x.lineTo(cx + r * 0.1, cy - r * 0.5); x.lineTo(cx + r * 0.1, cy + r * 0.5); x.lineTo(cx - r * 0.22, cy + r * 0.2); x.lineTo(cx - r * 0.5, cy + r * 0.2); x.closePath(); x.fill();
  x.strokeStyle = "#5ce611"; x.lineWidth = r * 0.14; x.lineCap = "round"; for (const k of [0.32, 0.55]) { x.beginPath(); x.arc(cx + r * 0.1, cy, r * k, -0.8, 0.8); x.stroke(); }
}
function microfono(x, cx, cy, r) {
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(cx - r * 0.18, cy - r * 0.52, r * 0.36, r * 0.62, r * 0.18); x.fill();
  x.strokeStyle = "#5ce611"; x.lineWidth = r * 0.12; x.lineCap = "round"; x.beginPath(); x.arc(cx, cy - r * 0.08, r * 0.34, 0.2, Math.PI - 0.2); x.stroke(); x.beginPath(); x.moveTo(cx, cy + r * 0.26); x.lineTo(cx, cy + r * 0.45); x.stroke();
}

// ================= PANTALLAS =================
// ---- la bandeja de consultas (celular de Silvana en la parte 1, celular de Diego en P1) ----
const CONSULTAS = [["MR", "¿Sigue disponible?", "casa"], ["LC", "¿Sigue disponible?", "globo"], ["JP", "¿Acepta mascotas?", "sobre"], ["SF", "¿Sigue disponible?", "casa"], ["VG", "¿Gastos comunes?", "globo"], ["RB", "¿Sigue disponible?", "casa"], ["PA", "¿Se puede visitar hoy?", "globo"], ["NM", "¿Sigue disponible?", "sobre"]];
function bandeja(x, w, h, n, { agus = 0, noche = false, titulo = "Consultas · Punta Carretas" } = {}) {
  x.fillStyle = noche ? "#e2e0d4" : "#efeee5"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 168); x.fillStyle = "#c7655b"; x.fillRect(0, 168, w, 8);
  x.fillStyle = "#efeee5"; ajustar(x, titulo, 800, 44, w - 60); x.fillText(titulo, 28, 58);
  x.fillStyle = "#c7655b"; x.font = F(800, 40); x.fillText(`Sin contestar: ${n}`, 28, 122);
  const filas = [];
  for (let i = 0; i < 9; i++) { const k = (n * 3 + i * 5) % CONSULTAS.length; filas.push(CONSULTAS[k]); }
  const Y0 = 186, RH = 116;
  for (let i = 0; i < 9; i++) {
    const y = Y0 + i * RH; if (y > h) break;
    const esA = agus && i === 2;
    const [ini, txt, ic] = esA ? ["AG", "¿Sigue disponible? Tengo garantía ANDA…", "globo"] : filas[i];
    if (esA) { rr(x, 8, y + 4, w - 16, RH - 8, 18, "#ffffff", "#5ce611", 8); }
    avatar(x, esA ? AVATAR.agustina : iniCv(ini, i), 66, y + RH / 2, 42);
    icono(x, ic, 100, y + RH / 2 + 30, 17);
    x.fillStyle = "#0b1220"; x.font = F(800, 34); x.fillText(esA ? "Agustina" : `Consulta · ${ini}`, 128, y + 36);
    x.fillStyle = "#1f3254"; ajustar(x, txt, 700, 34, w - 250); x.fillText(txt, 128, y + 80);
    x.fillStyle = "#16243d"; x.font = F(700, 30); x.textAlign = "right"; x.fillText(esA ? "15:02" : `${15 + ((i + n) % 8)}:${String((i * 17 + n * 7) % 60).padStart(2, "0")}`, w - 24, y + 36); x.textAlign = "left";
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w - 50, y + 80, 19, 0, 7); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(900, 26); x.textAlign = "center"; x.fillText(String(1 + ((i * 3 + n) % 3)), w - 50, y + 81); x.textAlign = "left";
    x.fillStyle = "#d9d7c9"; x.fillRect(128, y + RH - 2, w - 150, 3);
  }
}
// ---- el chat con Agustina (P3): su consulta de ayer, lo que tipea Silvana, enviado 9:10, escribiendo…, la nota de voz ----
function textoEnLineas(x, txt, ancho, px, peso = 700) {
  x.font = F(peso, px); const pal = txt.split(" "), L = []; let l = "";
  for (const p of pal) { const p2 = l ? l + " " + p : p; if (x.measureText(p2).width > ancho && l) { L.push(l); l = p; } else l = p2; }
  if (l) L.push(l); return L;
}
function cabChat(x, w, cv, nombre, sub, verde = false) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = verde ? "#5ce611" : "#1f3254"; x.fillRect(0, 150, w, 8);
  avatar(x, cv, 74, 76, 50);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, nombre, 800, 42, w - 160); x.fillText(nombre, 140, 56);
  x.fillStyle = verde ? "#5ce611" : "#b9cde0"; ajustar(x, sub, 700, 32, w - 160); x.fillText(sub, 140, 108);
}
// globo de chat en un celular: lado "in" (izq., blanco) / "out" (der., verde claro o navy), devuelve el alto
function globoChat(x, w, y, lado, lineas, { px = 36, hora = "", tilde: tl = null, fondo = null, tinta = "#0b1220", dibujar = true, extraH = 0, extra = null, ancho = null, horaPx = 34 } = {}) {
  x.font = F(700, px);
  const anchoT = ancho ?? Math.max(...lineas.map((l) => x.measureText(l).width), hora ? x.measureText(hora).width * 0.8 + 60 : 0);
  const bw = Math.min(w - 90, anchoT + 44), bh = lineas.length * px * 1.25 + 34 + (hora ? horaPx + 6 : 0) + extraH;
  if (!dibujar) return bh;
  const bx = lado === "in" ? 22 : w - 22 - bw;
  rr(x, bx, y, bw, bh, 26, fondo ?? (lado === "in" ? "#ffffff" : "#dff5cf"), lado === "in" ? "#d9d7c9" : "#9fd27a", 4);
  x.fillStyle = tinta; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(700, px);
  lineas.forEach((l, i) => x.fillText(l, bx + 22, y + 22 + px * 0.62 + i * px * 1.25));
  if (extra) extra(bx, y + 22 + lineas.length * px * 1.25, bw);
  if (hora) {
    x.font = F(700, horaPx); x.textAlign = "right"; x.fillStyle = tl === "rojo" ? "#c7655b" : "#1f3254";
    x.fillText(hora, bx + bw - (tl ? 66 : 20), y + bh - 26);
    if (tl === "rojo") tilde(x, bx + bw - 34, y + bh - 25, 26, "#c7655b", 6);
    if (tl === "verde") { tilde(x, bx + bw - 40, y + bh - 25, 26, "#3fa60a", 6); tilde(x, bx + bw - 28, y + bh - 25, 26, "#3fa60a", 6); }
    x.textAlign = "left";
  }
  return bh;
}
function chatAgustina(x, w, h, t) {
  // (r1) como un chat de verdad: los mensajes anclados abajo, sobre la barra de escribir; arriba, la ficha de la consulta
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.textBaseline = "middle"; x.textAlign = "left";
  const pal = PAL.s3, n = pal.filter((p) => t >= T.s3 + p.a).length, enviado = t >= T.envia;
  const completo = "¡Hola, Agustina! Perdón la demora. Sí, sigue disponible.";
  const tipeado = enviado ? completo : completo.split(" ").slice(0, Math.round((n / pal.length) * completo.split(" ").length)).join(" ");
  const l1 = textoEnLineas(x, "¿Sigue disponible? Tengo garantía ANDA y me mudo el 1°.", w - 150, 38);
  const l2 = textoEnLineas(x, completo, w - 150, 38);
  const items = [["dia", "Ayer"], ["in", l1, "15:02"]];
  if (enviado) items.push(["dia", "Hoy"], ["out", l2, "9:10"]);
  if (enviado && t >= T.escribe && t < T.nota) items.push(["escr"]);
  if (t >= T.nota) items.push(["nota"]);
  const alto = (it) => (it[0] === "dia" ? 64 : it[0] === "escr" ? 76 : it[0] === "nota" ? 116 : globoChat(x, w, 0, it[0], it[1], { px: 38, hora: it[2], dibujar: false }));
  let y = h - 190 - items.reduce((a2, it) => a2 + alto(it) + 16, 0);
  for (const it of items) {
    if (it[0] === "dia") { rr(x, w / 2 - 90, y, 180, 52, 26, "#d9d7c9"); x.fillStyle = "#16243d"; x.font = F(700, 34); x.textAlign = "center"; x.fillText(it[1], w / 2, y + 27); x.textAlign = "left"; }
    else if (it[0] === "escr") { rr(x, 22, y, 270, 70, 26, "#ffffff", "#d9d7c9", 4); x.fillStyle = "#1f3254"; x.font = F(700, 36); x.fillText("escribiendo…", 44, y + 36); }
    else if (it[0] === "nota") {
      const bh = 110; rr(x, 22, y, 440, bh, 26, "#ffffff", "#d9d7c9", 4);
      x.fillStyle = "#16243d"; x.beginPath(); x.arc(80, y + bh / 2, 36, 0, 7); x.fill();
      x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(70, y + bh / 2 - 17); x.lineTo(95, y + bh / 2); x.lineTo(70, y + bh / 2 + 17); x.closePath(); x.fill();
      const prog = sg(t, T.a1, T.a1 + LEN.a1);
      for (let i = 0; i < 17; i++) { const hh = 10 + Math.abs(Math.sin(i * 1.7)) * 34; x.fillStyle = i / 17 < prog ? "#3fa60a" : "#b4b2a3"; x.fillRect(132 + i * 15, y + bh / 2 - hh / 2, 9, hh); }
      x.fillStyle = "#1f3254"; x.font = F(700, 34); x.textAlign = "right"; x.fillText("0:02", 450, y + bh - 22); x.textAlign = "left";
    } else globoChat(x, w, y, it[0], it[1], { px: 38, hora: it[2], tilde: it[0] === "out" ? "rojo" : null, horaPx: 34 });
    y += alto(it) + 16;
  }
  // arriba: la cabecera y la ficha de la consulta (la propiedad)
  cabChat(x, w, AVATAR.agustina, "Agustina", "consulta · Punta Carretas");
  rr(x, 20, 178, w - 40, 150, 24, "#ffffff", "#3fa60a", 6);
  x.strokeStyle = "#16243d"; x.lineWidth = 8; x.lineJoin = "round"; x.beginPath(); x.moveTo(52, 262); x.lineTo(100, 214); x.lineTo(148, 262); x.moveTo(64, 252); x.lineTo(64, 300); x.lineTo(136, 300); x.lineTo(136, 252); x.stroke();
  x.fillStyle = "#3fa60a"; x.font = F(800, 36); x.fillText("ALQUILA", 176, 222);
  x.fillStyle = "#0b1220"; ajustar(x, "1 dorm. · Punta Carretas", 800, 38, w - 210); x.fillText("1 dorm. · Punta Carretas", 176, 268);
  x.font = F(900, 36); x.fillText("$ 30.000", 176, 308);
  // la barra de escribir, con lo tipeado
  x.fillStyle = "#e2e0d4"; x.fillRect(0, h - 170, w, 170);
  rr(x, 18, h - 150, w - 130, 120, 40, "#ffffff", "#d9d7c9", 4);
  x.fillStyle = "#0b1220"; x.textAlign = "left";
  if (!enviado && tipeado) { const L = textoEnLineas(x, tipeado, w - 190, 36); const ult = L.slice(-2); ult.forEach((l, i) => { x.font = F(700, 36); x.fillText(l, 42, h - 90 - (ult.length - 1) * 21 + i * 42); }); const lw = x.measureText(ult.at(-1)).width; if (Math.floor(t * 4) % 2 === 0) { x.fillStyle = "#3fa60a"; x.fillRect(46 + lw, h - 110 + (ult.length - 1) * 21, 5, 40); } }
  else { x.fillStyle = "#8a8f9a"; x.font = F(700, 36); x.fillText("Mensaje", 42, h - 90); }
  x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(w - 56, h - 90, 46, 0, 7); x.fill();
  x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(w - 76, h - 112); x.lineTo(w - 30, h - 90); x.lineTo(w - 76, h - 68); x.lineTo(w - 68, h - 90); x.closePath(); x.fill();
}
// ---- la llamada de don Alberto ----
function pantLlamada(x, w, h, seg) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.textAlign = "center"; x.textBaseline = "middle";
  avatar(x, AVATAR.alberto, w / 2, 330, 150);
  x.fillStyle = "#efeee5"; ajustar(x, "Don Alberto", 900, 70, w - 50); x.fillText("Don Alberto", w / 2, 570);
  x.fillStyle = "#b9cde0"; ajustar(x, "propietario · Punta Carretas", 700, 40, w - 60); x.fillText("propietario · Punta Carretas", w / 2, 640);
  if (seg < 0) {
    x.fillStyle = "#5ce611"; x.font = F(800, 50); x.fillText("Llamando…", w / 2, 740);
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2 - 140, 960, 74, 0, 7); x.fill();
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w / 2 + 140, 960, 74, 0, 7); x.fill();
    x.strokeStyle = "#efeee5"; x.lineWidth = 18; x.lineCap = "round"; for (const [cx, k] of [[w / 2 - 140, 1], [w / 2 + 140, -1]]) { x.beginPath(); x.arc(cx, 975 + k * 0, 36, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); }
    return;
  }
  x.fillStyle = "#efeee5"; x.font = F(800, 50); x.fillText(`0:${String(Math.min(59, seg)).padStart(2, "0")}`, w / 2, 740);
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w / 2 - 130, 940, 72, 0, 7); x.fill(); parlante(x, w / 2 - 130, 940, 54);
  x.fillStyle = "#efeee5"; x.font = F(700, 38); x.fillText("altavoz", w / 2 - 130, 1055);
  x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2 + 130, 940, 72, 0, 7); x.fill();
  x.strokeStyle = "#efeee5"; x.lineWidth = 18; x.lineCap = "round"; x.beginPath(); x.arc(w / 2 + 130, 960, 36, Math.PI * 1.15, Math.PI * 1.85); x.stroke();
}
// ---- el celular de Silvana: P1 bandeja · P2 bandeja de noche 12 → 38 · P3 chat · P4 llamada / bandeja 38 · Q4 llamada ----
const nCuenta = (t) => (t < T.cuenta[0] ? 12 : Math.round(lerp(12, 38, eio(sg(t, T.cuenta[0], T.cuenta[1])))));
let claveS = "";
function dibujarPantS(t) {
  let modo, n = 12, seg = 0, agus = 0;
  if (t < T.p2) modo = "bandeja";
  else if (t < T.p3) { modo = "bandeja"; n = nCuenta(t); agus = t >= T.agus ? 1 : 0; }
  else if (t < T.p4) modo = "chat";
  else if (t < P1) { modo = t < T.atiende ? "llama" : t < T.p4i ? "llamada" : "bandeja"; n = 38; seg = Math.floor(t - T.atiende); }
  else if (t < T.q4) { modo = "calma"; }
  else if (t < T.q4f) { modo = t < T.al2 - 0.15 ? "llama" : "llamada"; seg = Math.floor(t - T.al2 + 0.15); }
  else modo = "cero";
  const clave = modo === "chat" ? `chat|${Math.floor(t * 8)}` : `${modo}|${n}|${seg}|${agus}`;
  if (clave === claveS) return; claveS = clave;
  const { x } = pantS.userData, w = 600, h = 1200;
  if (modo === "bandeja") bandeja(x, w, h, n, { agus, noche: t >= T.p2 && t < T.p3 });
  else if (modo === "chat") chatAgustina(x, w, h, t);
  else if (modo === "llama") pantLlamada(x, w, h, -1);
  else if (modo === "llamada") pantLlamada(x, w, h, seg);
  else if (modo === "cero") { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = "#5ce611"; x.font = F(800, 50); x.fillText("agente de IA", w / 2, 200); x.fillStyle = "#efeee5"; x.font = F(800, 60); x.fillText("Sin contestar", w / 2, 480); x.fillStyle = "#5ce611"; x.font = F(900, 300); x.fillText("0", w / 2, 700); x.fillStyle = "#efeee5"; x.font = F(800, 52); x.fillText("Contestadas: 38 ✓", w / 2, 960); }
  else { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 120); x.fillText("15:00", w / 2, 380); x.font = F(700, 40); x.fillText("martes", w / 2, 470); }
  pantS.needsUpdate = true;
}
// ---- el celular de Diego: P1 bandeja (12) · Q1 el chat del agente de IA con Agustina ----
const fotos = (x, x0, y0, s) => {
  // tres miniaturas en el estilo del reel: el living, la cocina, el dormitorio
  const dib = [
    (a, b) => { x.fillStyle = "#efeee5"; x.fillRect(a, b, s, s * 0.75); x.fillStyle = "#cfcabb"; x.fillRect(a, b + s * 0.5, s, s * 0.25); x.fillStyle = "#3fa60a"; x.fillRect(a + s * 0.2, b + s * 0.12, s * 0.5, s * 0.3); x.strokeStyle = "#1f3254"; x.lineWidth = 6; x.strokeRect(a + s * 0.2, b + s * 0.12, s * 0.5, s * 0.3); },
    (a, b) => { x.fillStyle = "#efeee5"; x.fillRect(a, b, s, s * 0.75); x.fillStyle = "#1f3254"; x.fillRect(a + s * 0.08, b + s * 0.38, s * 0.84, s * 0.3); x.fillStyle = "#d9d7c9"; x.fillRect(a + s * 0.08, b + s * 0.32, s * 0.84, s * 0.07); x.fillStyle = "#b4b2a3"; x.fillRect(a + s * 0.15, b + s * 0.1, s * 0.3, s * 0.14); },
    (a, b) => { x.fillStyle = "#efeee5"; x.fillRect(a, b, s, s * 0.75); x.fillStyle = "#16243d"; x.fillRect(a + s * 0.12, b + s * 0.4, s * 0.76, s * 0.25); x.fillStyle = "#efeee5"; x.fillRect(a + s * 0.18, b + s * 0.34, s * 0.25, s * 0.1); x.fillStyle = "#5ce611"; x.fillRect(a + s * 0.12, b + s * 0.52, s * 0.76, s * 0.05); },
  ];
  dib.forEach((d, i) => { d(x0 + i * (s + 12), y0); x.strokeStyle = "#16243d"; x.lineWidth = 4; x.strokeRect(x0 + i * (s + 12), y0, s, s * 0.75); });
};
let claveD = "";
function dibujarCelD(t) {
  const modo = t < P1 ? "bandeja" : "agente";
  const nm = modo === "agente" ? T.chat.filter((a) => t >= a).length : 0;
  const clave = `${modo}|${nm}`; if (clave === claveD) return; claveD = clave;
  const { x } = pantD.userData, w = 600, h = 1200;
  if (modo === "bandeja") { bandeja(x, w, h, 12); pantD.needsUpdate = true; return; }
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  // los mensajes (se apilan abajo; los viejos suben)
  const M2 = [
    { lado: "in", L: ["¿Sigue disponible?"], hora: "15:02" },
    { lado: "out", L: ["¡Hola, Agustina! Sí."], hora: "15:02", tl: "verde", ficha: true },
    { lado: "out", L: ["¿Con qué garantía", "y para cuándo?"], hora: "15:02", tl: "verde" },
    { lado: "in", L: ["ANDA, para el 1°."], hora: "15:03" },
    { lado: "out", L: ["¿Te queda bien mañana", "10:30 con Diego?"], hora: "15:03", tl: "verde" },
    { lado: "in", L: ["¡Sí!"], hora: "15:03" },
    { lado: "ok" },
  ].slice(0, nm);
  const FICHA_H = 470, PX = 36;
  const fichaDib = (bx, y0) => {
    const fx = bx + 18, fw = 420;
    rr(x, fx, y0, fw, FICHA_H - 30, 18, "#ffffff", "#16243d", 5);
    x.fillStyle = "#16243d"; x.fillRect(fx + 3, y0 + 3, fw - 6, 64); x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "1 dorm. · Punta Carretas", 800, 34, fw - 36); x.fillText("1 dorm. · Punta Carretas", fx + 18, y0 + 36);
    const L = [["$ 30.000", 40, "#0b1220", 900], ["+ gastos comunes $ 5.000", 32, "#1f3254", 700], ["Garantías: ANDA, CGN,", 32, "#0b1220", 800], ["Porto Seguro o depósito", 32, "#0b1220", 800], ["No acepta mascotas", 32, "#c7655b", 800]];
    L.forEach(([s2, px, c, p], i) => { x.fillStyle = c; ajustar(x, s2, p, px, fw - 36); x.fillText(s2, fx + 18, y0 + 100 + i * 46 + (i ? 6 : 0)); });
    fotos(x, fx + 16, y0 + 330, 96);
    x.fillStyle = "#16243d"; x.font = F(800, 32); x.textAlign = "right"; x.fillText("12 fotos ▸", fx + fw - 14, y0 + 330 + 90); x.textAlign = "left";
  };
  const alto = (m) => (m.lado === "ok" ? 150 : globoChat(x, w, 0, m.lado, m.L, { px: PX, hora: m.hora, tilde: m.tl, dibujar: false, extraH: m.ficha ? FICHA_H : 0, ancho: m.ficha ? 456 : null }));
  const hs = M2.map(alto), GAP = 16, TOP = 176, BOT = h - 40;
  let y = BOT - hs.reduce((a, b) => a + b + GAP, 0);
  y = Math.min(y, TOP + 10);
  M2.forEach((m, i) => {
    if (m.lado === "ok") {
      rr(x, 30, y, w - 60, 132, 30, "#5ce611", "#0b1220", 6);
      x.fillStyle = "#0b1220"; x.beginPath(); x.arc(96, y + 66, 40, 0, 7); x.fill(); tilde(x, 96, y + 68, 46, "#5ce611");
      x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#0b1220"; ajustar(x, "Visita confirmada", 900, 42, w - 200); x.fillText("Visita confirmada", 152, y + 44); ajustar(x, "Mié 10:30 · Diego", 800, 38, w - 200); x.fillText("Mié 10:30 · Diego", 152, y + 96);
    } else globoChat(x, w, y, m.lado, m.L, { px: PX, hora: m.hora, tilde: m.tl, extraH: m.ficha ? FICHA_H : 0, ancho: m.ficha ? 456 : null, extra: m.ficha ? fichaDib : null });
    y += hs[i] + GAP;
  });
  cabChat(x, w, AVATAR.silvana, "Silvana Propiedades", "agente de IA · en línea", true);
  pantD.needsUpdate = true;
}
// ---- el monitor de Silvana (vertical, r1): parte 1 la bandeja de consultas (en rojo) · parte 2 el panel del agente: cuatro
// renglones grandes, lleno desde el primer cuadro ----
let claveM = "";
function dibujarMonitor(t) {
  const modo = t < P1 ? "bandeja" : "panel";
  if (modo === claveM) return; claveM = modo;
  const { x } = pantM.userData, w = 1000, h = 1600;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  if (modo === "bandeja") {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); x.fillStyle = "#efeee5"; ajustar(x, "Consultas · Punta Carretas", 800, 64, w - 80); x.fillText("Consultas · Punta Carretas", 40, 88);
    rr(x, 36, 210, w - 72, 300, 34, "#c7655b"); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 76); x.fillText("Sin contestar", w / 2, 290); x.font = F(900, 170); x.fillText("38", w / 2, 420); x.textAlign = "left";
    for (let i = 0; i < 7; i++) { const y = 550 + i * 148; rr(x, 36, y, w - 72, 128, 22, "#ffffff"); avatar(x, iniCv(INI[i], i), 110, y + 64, 44); x.fillStyle = "#0b1220"; ajustar(x, CONSULTAS[i][1], 800, 56, w - 300); x.fillText(CONSULTAS[i][1], 180, y + 66); x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w - 90, y + 64, 28, 0, 7); x.fill(); }
    pantM.needsUpdate = true; return;
  }
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 200); x.fillStyle = "#5ce611"; x.fillRect(0, 200, w, 12);
  x.fillStyle = "#efeee5"; ajustar(x, "Punta Carretas · hoy", 800, 76, w - 80); x.fillText("Punta Carretas · hoy", 44, 80);
  x.fillStyle = "#5ce611"; x.font = F(800, 52); x.fillText("agente de IA", 44, 152);
  const fila = (y, hh, l1, l2, ok, fondo = "#ffffff") => {
    rr(x, 36, y, w - 72, hh, 34, fondo);
    x.fillStyle = "#1f3254"; ajustar(x, l1, 800, 58, w - 260); x.fillText(l1, 76, y + 74);
    x.fillStyle = "#0b1220"; x.font = F(900, 128); x.fillText(l2, 76, y + hh - 92);
    if (ok) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w - 140, y + hh / 2, 70, 0, 7); x.fill(); tilde(x, w - 140, y + hh / 2 + 4, 80, "#0b1220"); }
  };
  fila(246, 290, "Consultas", "38", false);
  fila(566, 290, "Contestadas al instante", "38", true);
  fila(886, 290, "Visitas agendadas", "6", true);
  // el renglón resaltado: los que están listos para firmar
  rr(x, 28, 1206, w - 56, 370, 40, "#5ce611", "#0b1220", 12);
  x.fillStyle = "#0b1220"; ajustar(x, "Listos para visitar y firmar", 800, 62, w - 140); x.fillText("Listos para visitar y firmar", 76, 1290);
  x.font = F(900, 150); x.fillText("2", 76, 1430);
  x.font = F(800, 58); x.fillText("→ para vos, Silvana", 200, 1436);
  x.font = F(700, 44); x.fillText("Agustina · ANDA  ·  Martina · CGN", 76, 1530);
  pantM.needsUpdate = true;
}
// ================= TARJETAS PEGADAS A LA CÁMARA: globos, consultas, contador, rótulos, guías =================
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
function redibujar(g) { const { tex, dibujo, fondo, W, H } = g.userData; const x = tex.userData.x; x.setTransform(1, 0, 0, 1, 0, 0); x.fillStyle = fondo; x.fillRect(0, 0, W * 2, H * 2); x.save(); x.scale(2, 2); dibujo(x, W, H); x.restore(); tex.needsUpdate = true; }
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
// globo de diálogo (texto grande); cab = { cv, nombre } (avatar), { icono: "parlante" | "micro", nombre }; minW = ancho mínimo
function crearGlobo(lineas, px = 80, { cab = null, minW = 0 } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  const limpio = (l) => l.replace(/[[\]{}]/g, "");
  const cabH = cab ? Math.round(px * 1.15) : 0, cabF = Math.max(Math.round(px * 0.6), 40);
  med.font = F(700, cabF); const anchoCab = cab ? med.measureText(cab.nombre).width + cabF * 2.4 : 0; med.font = F(800, px);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.max(minW, Math.round(anchoT + px * 1.2)), H = Math.round(lineas.length * px * 1.22 + px * 0.75 + cabH);
  return crearTarjeta(Wg, H, (x, w, h) => {
    if (cab) {
      const r = cabF * 0.78, cy = px * 0.25 + r, cx = px * 0.35 + r;
      if (cab.icono === "parlante") parlante(x, cx, cy, r); else if (cab.icono === "micro") microfono(x, cx, cy, r); else avatar(x, cab.cv, cx, cy, r);
      x.fillStyle = "#1f3254"; x.font = F(700, cabF); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(cab.nombre, cx + r + px * 0.25, cy + 2);
    }
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + (h - cabH) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  });
}
// la consulta que brota del celular: burbuja de chat chica (blanca) con el ícono del canal
function crearConsulta(txt, ic, px = 46) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const Wg = Math.round(med.measureText(txt).width + px * 2.6), H = Math.round(px * 1.9);
  return crearTarjeta(Wg, H, (x, w, h) => { icono(x, ic, px * 0.95, h / 2, px * 0.6); x.fillStyle = "#0b1220"; x.font = F(800, px); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(txt, px * 1.8, h / 2 + 2); }, { fondo: "#ffffff" });
}
// el rótulo: caja navy, texto crema (o rojo apagado / verde), borde crema
function crearRotulo(lineas, px = 50, { fondo = "#16243d", borde = C.cr } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  const ancho = Math.max(...lineas.map(([l, , p]) => { med.font = F(800, p ?? px); return med.measureText(l).width; }));
  const H = Math.round(lineas.reduce((a, [, , p]) => a + (p ?? px) * 1.25, 0) + px * 0.6), Wg = Math.round(ancho + px * 1.0);
  return crearTarjeta(Wg, H, (x, w) => {
    let y = px * 0.3; x.textAlign = "center"; x.textBaseline = "middle";
    for (const [l, color, p] of lineas) { const q = p ?? px; x.font = F(800, q); x.fillStyle = color ?? "#efeee5"; x.fillText(l, w / 2, y + q * 0.62); y += q * 1.25; }
  }, { fondo, borde });
}
// el contador "Sin contestar" (se redibuja cuando cambia el número)
let nContador = 12, verdeContador = false;
const CONT = crearTarjeta(560, 196, (x, w, h) => {
  x.textAlign = "center"; x.textBaseline = "middle";
  x.fillStyle = "#efeee5"; x.font = F(800, 50); x.fillText("Sin contestar", w / 2, 52);
  x.fillStyle = verdeContador ? "#5ce611" : "#c7655b"; x.font = F(900, 112); x.fillText(String(nContador), w / 2, 136);
}, { fondo: "#16243d", borde: C.cr });
let contDib = "";
function ponerContador(n, verde, cx, cy, s, objetivo = null, orden = 5, esc = 1) {
  const k = `${n}|${verde}`; if (k !== contDib) { contDib = k; nContador = n; verdeContador = verde; redibujar(CONT); }
  ponerGlobo(CONT, cx, cy, s, objetivo, orden, esc);
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
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0, esc = 1) {
  g.visible = s > 0.03;
  const op = cl(s / 0.85); s = Math.max(s, 0.85);
  g.traverse((o) => { if (o.isMesh) [].concat(o.material).forEach((m) => (m.opacity = op)); });
  if (!g.visible) return;
  const k = halfK();
  const { W: Wg0, H: H0, cola } = g.userData; const Wg = Wg0 * esc, H = H0 * esc;
  cx = Wg + 120 > 1080 ? 540 : cl(cx, Wg / 2 + 50, 1030 - Wg / 2);
  cy = cl(cy, H / 2 + 60, 1860 - H / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s * esc);
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  cola.visible = !!objetivo;
  if (!objetivo) return;
  const [ox, oy] = objetivo;
  const lado = cl((ox - cx) / (Wg / 2), -0.8, 0.8);
  if (oy >= cy) {
    cola.position.set((lado * Wg0) / 2 / PXK, -H0 / 2 / PXK + 4 / PXK, 0);
    cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * Wg) / 2), oy - (cy + H / 2)), -1.15, 1.15);
  } else {
    cola.position.set((lado * Wg0) / 2 / PXK, H0 / 2 / PXK - 4 / PXK, 0);
    cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * Wg) / 2), (cy - H / 2) - oy), -1.15, 1.15);
  }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(V3(0, 0.181, 0.3))); };
const objPx = (o, local = V3(0, 0, 0)) => { o.updateMatrixWorld(true); return enPantalla(o.localToWorld(local.clone())); };
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

const ALT = { icono: "parlante", nombre: "Don Alberto · altavoz" };
const NOTA = { icono: "micro", nombre: "Agustina · nota de voz" };
const GL = {
  d1: crearGlobo(["Silvana. El de", "Punta Carretas", "[explota.] Van doce."], 62),
  s1: crearGlobo(["Contestá [vos.]"], 76),
  d2: crearGlobo(["Estoy [mostrando.]"], 74),
  s2: crearGlobo(["Yo [también.]"], 86),
  a1a: crearGlobo(["¡Qué bueno!"], 84, { cab: NOTA, minW: 780 }),
  a1: crearGlobo(["¡Qué bueno!", "{Yo ya no.}"], 84, { cab: NOTA, minW: 780 }),
  al: crearGlobo(["Silvana, ¿cómo va? ¿Nadie", "preguntó por el [apartamento?]"], 54, { cab: ALT }),
  s4: crearGlobo(["Preguntar,", "[preguntaron.]"], 88),
  d1b: crearGlobo(["El de Punta Carretas", "[explota.] Van doce."], 64),
  s5: crearGlobo(["¿Y quién [contesta?]"], 72),
  d3: crearGlobo(["[Ya contestó.] Le pidió la", "garantía y agendó."], 58),
  a2: crearGlobo(["¿Sigue [disponible?]"], 76),
  s7: crearGlobo(["[Sí.]"], 96),
  a3a: crearGlobo(["¡Qué bueno!"], 84, { cab: { cv: AVATAR.agustina, nombre: "Agustina" }, minW: 780 }),
  a3: crearGlobo(["¡Qué bueno!", "[Yo también.]"], 84, { cab: { cv: AVATAR.agustina, nombre: "Agustina" }, minW: 780 }),
  al2: crearGlobo(["¿Nadie preguntó por", "el [apartamento?]"], 64, { cab: ALT }),
  s8: crearGlobo(["Treinta y ocho.", "Y el viernes [firman.]"], 72),
};
// las consultas que brotan del celular en P1 (y en P2) y la de Agustina, grande
const CONS = [["¿Sigue disponible?", "casa"], ["¿Sigue disponible?", "globo"], ["¿Sigue disponible?", "sobre"], ["¿Acepta mascotas?", "casa"], ["¿Sigue disponible?", "globo"], ["¿Gastos comunes?", "casa"]].map(([t2, ic]) => crearConsulta(t2, ic, 44));
const CONS2 = [["¿Sigue disponible?", "globo"], ["¿Acepta mascotas?", "sobre"], ["¿Sigue disponible?", "casa"], ["¿Gastos comunes?", "globo"], ["¿Sigue disponible?", "sobre"], ["¿Sigue disponible?", "casa"]].map(([t2, ic]) => crearConsulta(t2, ic, 46));
const AGUS = crearTarjeta(920, 250, (x, w) => {
  avatar(x, AVATAR.agustina, 70, 70, 46); x.fillStyle = "#0b1220"; x.font = F(800, 46); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Agustina", 132, 58);
  x.fillStyle = "#1f3254"; x.font = F(700, 38); x.textAlign = "right"; x.fillText("15:02", w - 30, 58); x.textAlign = "left";
  x.fillStyle = "#0b1220"; x.font = F(800, 44); x.fillText("¿Sigue disponible? Tengo garantía", 34, 142); x.fillText("ANDA y me mudo el 1°.", 34, 202);
}, { fondo: "#ffffff", borde: C.g });
const ROT = {
  ideal: crearRotulo([["La inquilina ideal", "#5ce611", 58]], 58),
  alquilo: crearRotulo([["Ayer 16:30 · reservó", null, 50], ["en otra inmobiliaria", "#c7655b", 50]], 50),
  comision: crearRotulo([["Comisión de este alquiler:", null, 46], ["$ 30.000", "#c7655b", 70]], 46),
  q1: crearRotulo([["Contesta al instante, con", null, 46], ["los datos de la propiedad", "#5ce611", 46]], 46),
  q3a: crearRotulo([["Agustina · ANDA", "#0b1220", 54]], 54, { fondo: "#5ce611", borde: C.navy }),
  q3: crearRotulo([["Agustina · ANDA ·", "#0b1220", 54], ["firma el viernes ✓", "#0b1220", 54]], 54, { fondo: "#5ce611", borde: C.navy }),
  visitas: crearRotulo([["Visitas agendadas: 6 ✓", "#5ce611", 56]], 56),
  comisionOk: crearRotulo([["Comisión de este alquiler:", null, 46], ["$ 30.000 ✓", "#5ce611", 70]], 46),
};
const GUIAS = [crearGuia(), crearGuia()];
// "Yo ya no." (P3i) y "Yo también." (Q3b): el mismo lugar y el mismo tamaño de pantalla
const Y_YA_NO = 380;

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
const CAM_LIV = (k) => [BX + lerp(0.03, 0.02, k), lerp(1.47, 1.45, k), lerp(4.7, 4.45, k), BX + 0.02, 1.2, -0.4, 48];
const CAM_SILV = (k) => [BX - 0.22 + 0.04 * k, 1.52, lerp(2.2, 2.08, k), BX - 0.4, 1.4, 0.4, 40];
const CAM_OF = (k) => [lerp(0.22, 0.2, k), lerp(1.44, 1.42, k), lerp(2.55, 2.4, k), 0.17, 1.22, 0.1, 54];
const CAM_PAL = (k) => [PX + lerp(0.52, 0.56, k), 1.42, lerp(4.45, 4.25, k), PX + 0.56, 1.12, 0.4, 52];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_LIV(0)], [T.p1b, ...CAM_LIV(1)]]],
  ["P1b", T.p1b, [[T.p1b, ...CAM_SILV(0)], [T.p2, ...CAM_SILV(1)]]],
  ["P2", T.p2, null],    // la escalada: el celular sobre la mesa, de arriba, bajando
  ["P3", T.p3, [[T.p3, 0.16, 1.3, 2.5, 0.12, 1.0, 0.2, 52], [T.p3i, 0.18, 1.29, 2.38, 0.14, 0.98, 0.2, 51]]],   // (r1) sin el cartel detrás del chip
  ["P3i", T.p3i, null],  // el chat con Agustina, de cerca
  ["P3b", T.p3b, [[T.p3b, 0.2, 1.44, 2.9, 0.22, 1.2, 0.1, 58], [T.p4, 0.2, 1.44, 2.8, 0.22, 1.2, 0.1, 57]]],
  ["P4", T.p4, [[T.p4, ...CAM_OF(0.2)], [T.p4i, ...CAM_OF(0.8)]]],
  ["P4i", T.p4i, null],  // la bandeja: 38
  ["P4b", T.p4b, [[T.p4b, 0.14, 1.3, 2.05, 0.02, 1.22, 0.3, 40], [P1, 0.13, 1.3, 1.95, 0.02, 1.22, 0.3, 39]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...CAM_LIV(0)], [T.q1b, ...CAM_LIV(0.6)]]],
  ["Q1b", T.q1b, [[T.q1b, BX + 0.0, 1.55, 3.65, BX + 0.0, 1.28, 0.4, 50], [T.q1i, BX + 0.0, 1.55, 3.55, BX + 0.0, 1.28, 0.4, 49]]],   // (r1) corte a los dos más cerca
  ["Q1i", T.q1i, null],  // el chat del agente en el celular de Diego
  ["Q2", T.q2, null],    // el panel en el monitor (travelling)
  ["Q3", T.q3, [[T.q3, ...CAM_PAL(0)], [T.q3b, ...CAM_PAL(1)]]],
  ["Q3b", T.q3b, null],  // push-in a Agustina
  ["Q4", T.q4, [[T.q4, ...CAM_OF(0)], [T.q4f, ...CAM_OF(0.7)]]],
  ["Q4f", T.q4f, null],  // la ficha: RESERVADO
  ["F", T.q5, [[T.q5, 0.16, 1.4, 2.55, 0.06, 1.08, 0.3, 50], [DUR, 0.16, 1.4, 2.47, 0.06, 1.08, 0.3, 49]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); } }
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
// la cámara de frente a una pantalla (plano local del objeto) que llena `llena` del alto del cuadro
function vistaPantalla(obj, centroLocal, normalLocal, alto, llena, fov, dy = 0, dx = 0) {
  obj.updateMatrixWorld(true);
  const c = obj.localToWorld(centroLocal.clone()), n = normalLocal.clone().transformDirection(obj.matrixWorld);
  const d = alto / llena / (2 * Math.tan((fov * D2R) / 2));
  const up = V3(0, 1, 0).transformDirection(obj.matrixWorld), der = V3(1, 0, 0).transformDirection(obj.matrixWorld);
  c.add(up.clone().multiplyScalar(dy)).add(der.multiplyScalar(dx));
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
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (!p.boca) p.boca = { sonrisa: 0.1, abierta: 0, ancho: 1 }; if (!p.ojos) p.ojos = { abiertos: 1 };
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta ?? 0, cl(e * 1.1 - 0.05) * k); }
  { const h = sg(t, t0 - 0.12, t0) * (1 - sg(t, t0 + env.length / 30, t0 + env.length / 30 + 0.15)); if (h > 0) p.boca.sonrisa = lerp(p.boca.sonrisa ?? 0, Math.min(p.boca.sonrisa ?? 0, 0.08), h); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos ?? 1, 0.85);
};
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const giroA = (x, z, c) => Math.atan2(c[0] - x, c[2] - z);
// ---------- en el living de Parque Batlle (P1, Q1): Silvana a la izquierda, Diego a la derecha, la pareja al fondo ----------
const S_LIV = { x: BX - 0.5, z: 0.55 }, D_LIV = { x: BX + 0.5, z: 0.45 };
const E_LIV = { x: BX - 0.14, z: -0.7 }, M_LIV = { x: BX + 0.2, z: -0.85 };
function poseSilvanaLiv(t) {
  const p2 = t >= P2;
  const pr = { x: S_LIV.x, y: 0, z: S_LIV.z, giro: 0.55, inclina: 0.02, ...aC(-0.35, 0.05), ...CARA.sonrisa, ojos: { abiertos: 1, x: -0.4, y: 0, feliz: 0.25 }, boca: { sonrisa: 0.7, abierta: 0, ancho: 1.1 }, ...BRAZOS.celular, t };
  if (!p2) {
    // sonrisa de vendedora fija para la pareja; mira de reojo el celular; habla de costado
    if (t >= T.d1 + 0.4 && t < T.s1 - 0.1) { pr.cabeza = { giro: -0.2, asiente: 0.25, ladea: 0.04 }; pr.ojos = { abiertos: 0.95, x: -0.1, y: -0.6, feliz: 0.1 }; }
    if (t >= T.s1 - 0.1) { pr.cabeza = { giro: 0.25, asiente: 0.05, ladea: -0.05 }; pr.ojos = { abiertos: 1, x: 0.5, y: 0, feliz: 0.2 }; }
    if (t >= T.d2 + 0.2) { pr.cabeza = { giro: -0.4, asiente: 0.04, ladea: 0.03 }; pr.ojos = { abiertos: 1, x: -0.5, y: 0.05, feliz: 0.3 }; }
    if (t >= T.p1b) { pr.cabeza = { giro: -0.15, asiente: 0.02, ladea: 0.05 }; pr.ojos = { abiertos: 0.95, x: -0.2, y: 0.05, feliz: 0.35 }; pr.boca = { sonrisa: 0.85, abierta: 0, ancho: 1.15 }; pr.cejas = { alto: 0.25, ang: 0.1 }; }
    bocaVoz(pr, t, T.s1, ENV.s1, 0.45); bocaVoz(pr, t, T.s2, ENV.s2, 0.4);
    return pr;
  }
  // parte 2: el celular guardado; las manos juntas adelante, tranquila; mira a Diego y su celular
  Object.assign(pr, { manoI: [0.1, 0.12, 0.2], manoD: [-0.1, 0.12, 0.2], codoI: [0.8, -0.8, -0.2], codoD: [-0.8, -0.8, -0.2], dedoI: 0, dedoD: 0 });
  if (t >= T.s5 - 0.1) { pr.cabeza = { giro: 0.3, asiente: 0.06, ladea: -0.04 }; pr.ojos = { abiertos: 1, x: 0.5, y: -0.05, feliz: 0.2 }; pr.boca = { sonrisa: 0.5, abierta: 0, ancho: 1.05 }; pr.cejas = { alto: 0.3, ang: 0.0 }; }
  bocaVoz(pr, t, T.s5, ENV.s5, 0.45);
  return pr;
}
function poseDiegoLiv(t) {
  const p2 = t >= P2;
  const pr = { x: D_LIV.x, y: 0, z: D_LIV.z, giro: -0.6, inclina: 0.05, ...aC(0.15, 0.3), ...CARA.sonrisa, ojos: { abiertos: 1, x: 0, y: -0.7, feliz: 0.25 }, ...BRAZOS.celular, t };
  const d0 = p2 ? T.d1b : T.d1;
  // bajito, inclinado hacia Silvana: mira el celular y la mira a ella
  if (t >= d0 - 0.1) { pr.inclina = 0.1; pr.cabeza = { giro: 0.4, asiente: 0.12, ladea: 0.08 }; pr.ojos = { abiertos: 1, x: 0.5, y: -0.1, feliz: 0.35 }; pr.cejas = { alto: 0.45, ang: 0.1 }; }
  if (!p2) {
    if (t >= T.d2 - 0.1) { pr.cabeza = { giro: 0.35, asiente: 0.05, ladea: -0.04 }; pr.ojos = { abiertos: 1, x: 0.5, y: 0, feliz: 0.25 }; pr.boca = { sonrisa: 0.6, abierta: 0, ancho: 1.05 }; }
    bocaVoz(pr, t, T.d1, ENV.d1, 0.5); bocaVoz(pr, t, T.d2, ENV.d2, 0.45);
    return pr;
  }
  if (t >= T.muestra) {
    // le da vuelta el celular a Silvana (la pantalla hacia ella y la cámara)
    const u = eio(sg(t, T.muestra, T.muestra + 0.3));
    pr.manoI = [lerp(0.075, 0.12, u), lerp(0.33, 0.42, u), lerp(0.3, 0.42, u)]; pr.manoD = [lerp(-0.075, -0.02, u), lerp(0.33, 0.42, u), lerp(0.3, 0.42, u)];
    pr.cabeza = { giro: 0.35, asiente: 0.05, ladea: 0.05 }; pr.ojos = { abiertos: 1, x: 0.45, y: 0, feliz: 0.4 }; pr.boca = { sonrisa: 0.8, abierta: 0, ancho: 1.1 };
  }
  bocaVoz(pr, t, T.d1b, ENV.d1, 0.5); bocaVoz(pr, t, T.d3, ENV.d3, 0.5);
  return pr;
}
function posePareja(per, t) {
  const E = per === ella, P = E ? E_LIV : M_LIV;
  const pr = { x: P.x, y: 0, z: P.z, giro: Math.PI + (E ? -0.55 : 0.5), inclina: 0.02, ...aC(E ? -0.5 : 0.4, -0.05), ...CARA.sonrisa, ...BRAZOS.costado, t };
  if (!E) Object.assign(pr, { manoI: [0.3, 0.05, 0.1], manoD: [-0.28, 0.4, 0.3], codoD: [-1, -0.3, -0.2], dedoD: 1 });   // él señala la ventana
  if (t < P2 && t >= T.s1 - 0.1 && t < T.p2) {
    // en el cruce de Silvana y Diego, la pareja gira la cabeza de uno a otro
    const a = sg(t, T.s1 - 0.1, T.s1 + 0.15), b = sg(t, T.d2 - 0.1, T.d2 + 0.15), c = sg(t, T.s2 - 0.15, T.s2 + 0.1);
    const g = lerp(lerp(lerp(0, 1.25, eio(a)), 0.55, eio(b)), 1.3, eio(c));
    pr.giro = Math.PI + (E ? -0.55 : 0.5) + g * (E ? 0.6 : 0.85); pr.cabeza = { giro: E ? -0.2 + g * 0.5 : g * 0.3, asiente: 0, ladea: 0 };
    pr.ojos = { abiertos: 1, x: 0, y: 0, feliz: 0.1 }; pr.boca = { sonrisa: 0.3, abierta: 0, ancho: 1 };
    if (!E) Object.assign(pr, BRAZOS.costado);
  }
  return pr;
}
// ---------- en la oficina: Silvana sentada (mirando a +z) ----------
function poseSilvanaOf(t) {
  const pr = { x: SIL.x, y: -0.08, z: SIL.z, giro: 0, sentado: 1, inclina: 0.03, ...aC(0.12, 0.08), ...NADA, manoI: [0.2, 0.32, 0.36], codoI: [1, -0.6, -0.2], manoD: [-0.2, 0.32, 0.36], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  pr.taza = 0;
  if (t < P1) {
    // P3: temprano, el café en la mano derecha, concentrada en el celular (a su izquierda, +x)
    Object.assign(pr, { ...CARA.concentrada, ojos: { abiertos: 0.9, x: 0.35, y: -0.45 }, cejas: { alto: 0.05, ang: 0.15 }, boca: { sonrisa: 0.15, abierta: 0, ancho: 0.95 } });
    pr.cabeza = { giro: 0.32, asiente: 0.16, ladea: 0.03 };
    pr.taza = 1; pr.manoD = [-0.16, 0.5, 0.34]; pr.codoD = [-1, -0.6, -0.3];
    // (r1) sin el sorbo: empieza a hablar enseguida
    // el índice izquierdo tipea en el celular parado
    if (t >= T.s3 - 0.2 && t < T.envia + 0.1) { telS.updateMatrixWorld(true); const w = telS.userData.piv.localToWorld(V3(0.0, telS.userData.H * 0.15, 0.05)); pr.manoI = aCuerpo(silvana, w); pr.codoI = [1, -0.5, -0.2]; pr.dedoI = 1; }
    if (t >= T.a1) {
      // "Yo ya no.": se queda quieta, el café a medio camino, cara de nada (sin drama)
      const u = eio(sg(t, T.yaNo - 0.05, T.yaNo + 0.25));
      Object.assign(pr, { ...NADA, ojos: { abiertos: lerp(0.9, 1, u), x: 0.35, y: -0.4, tension: 0.1 }, cejas: { alto: lerp(0.05, 0.3, u), ang: 0.15 }, boca: { sonrisa: lerp(0.1, -0.15, u), abierta: 0, ancho: 0.9 } });
      pr.manoD = [-0.12, lerp(0.5, 0.58, u), 0.36];
    }
    if (t >= T.p4) {
      // P4: atiende a don Alberto en altavoz; mira el celular; "Preguntar, preguntaron." seca, a cámara de costado
      pr.taza = 0; pr.manoD = [-0.2, 0.32, 0.36];
      if (t < T.atiende + 0.1) { const u = eio(sg(t, T.vibra, T.atiende)); telS.updateMatrixWorld(true); const w = telS.userData.piv.localToWorld(V3(0, telS.userData.H * 0.2, 0.05)); pr.manoI = lerpV([0.2, 0.32, 0.36], aCuerpo(silvana, w), Math.sin(Math.PI * u)); pr.dedoI = 1; }
      Object.assign(pr, { ...NADA, ojos: { abiertos: 0.95, x: 0.35, y: -0.45, tension: 0.15 }, cejas: { alto: 0.2, ang: 0.2 }, boca: { sonrisa: -0.05, abierta: 0, ancho: 0.95 } });
      pr.cabeza = { giro: 0.3, asiente: 0.15, ladea: 0.02 };
      if (t >= T.p4b) { Object.assign(pr, { ...CARA.resignado, ojos: { abiertos: 0.62, x: 0.1, y: -0.1, tension: 0.4 }, cejas: { alto: 0.2, ang: 0.55 }, boca: { sonrisa: -0.4, abierta: 0, ancho: 0.95 } }); pr.cabeza = { giro: 0.1, asiente: 0.05, ladea: -0.04 }; }
    }
    bocaVoz(pr, t, T.s3, ENV.s3, 0.45); bocaVoz(pr, t, T.s4, ENV.s4, 0.45);
    return pr;
  }
  // parte 2: tranquila, media sonrisa; Q2s mira el monitor (a su derecha, -x); Q4 atiende y mira el monitor; F a cámara
  Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: -0.45, y: -0.15, feliz: 0.25 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } });
  pr.cabeza = { giro: -0.45, asiente: 0.08, ladea: 0.04 };
  if (t >= T.q4) {
    if (t < T.al2 + 0.1) { const u = eio(sg(t, T.vib3, T.al2 - 0.1)); telS.updateMatrixWorld(true); const w = telS.userData.piv.localToWorld(V3(0, telS.userData.H * 0.2, 0.05)); pr.manoI = lerpV([0.2, 0.32, 0.36], aCuerpo(silvana, w), Math.sin(Math.PI * u)); pr.dedoI = 1; pr.cabeza = { giro: 0.3, asiente: 0.15, ladea: 0.02 }; pr.ojos = { abiertos: 1, x: 0.35, y: -0.45, feliz: 0.2 }; }
    else if (t < T.s8 - 0.2) { pr.cabeza = { giro: 0.25, asiente: 0.1, ladea: 0.02 }; pr.ojos = { abiertos: 1, x: 0.3, y: -0.35, feliz: 0.3 }; }
  }
  if (t >= T.q5) { pr.cabeza = { giro: 0.02, asiente: 0.02, ladea: 0.04 }; pr.ojos = { abiertos: 1, x: 0.0, y: 0.05, feliz: 0.3 }; pr.inclina = 0.06; pr.boca = { sonrisa: 0.7, abierta: 0, ancho: 1.08 }; pr.manoI = [0.16, 0.34, 0.4]; pr.manoD = [-0.16, 0.34, 0.4]; }
  bocaVoz(pr, t, T.s8, ENV.s8, 0.45); bocaVoz(pr, t, T.s9, ENV.s9, 0.45);
  return pr;
}
// ---------- en el palier 3B (Q3): Silvana con la llave, Diego detrás, Agustina que llega ----------
const S_PAL = { x: PX + 0.68, z: 0.55 }, D_PAL = { x: PX + 1.3, z: 0.32 }, A_PAL = { x: PX - 0.06, z: 1.05 };
function poseSilvanaPal(t) {
  const pr = { x: S_PAL.x, y: 0, z: S_PAL.z, giro: -0.75, inclina: 0.02, ...aC(-0.2, 0.0), ...CARA.sonrisa, ojos: { abiertos: 1, x: -0.3, y: 0, feliz: 0.3 }, ...BRAZOS.costado, t };
  // la mano derecha en la llave (la cerradura), hasta que abre
  const cerr = PA.localToWorld(V3(PUERTA.x1 - 0.105, 0.95, 0.06));
  const abre = eio(sg(t, T.abre, T.abre + 0.5));
  pr.manoD = lerpV(aCuerpo(silvana, cerr), [-0.29, -0.08, 0.04], abre); pr.codoD = [-1, -0.5, 0];
  pr.cabeza = { giro: lerp(-0.25, 0.1, sg(t, T.a2 - 0.2, T.a2 + 0.1)), asiente: 0.02, ladea: 0.04 };
  bocaVoz(pr, t, T.s7, ENV.s7, 0.5);
  return pr;
}
function poseAgustina(t) {
  const u = eio(sg(t, T.q3 - 0.2, T.a2 - 0.05));
  const pr = { x: lerp(PX - 1.05, A_PAL.x, u), y: 0, z: A_PAL.z, giro: lerp(Math.PI / 2, 0.55, eio(sg(t, T.a2 - 0.35, T.a2 + 0.05))), paso: 1 - sg(t, T.a2 - 0.25, T.a2), inclina: 0.03, ...aC(0.2, 0), ...CARA.sonrisa, ojos: { abiertos: 1, x: 0.4, y: 0, feliz: 0.35 }, ...BRAZOS.costado, t };
  if (t >= T.a3 - 0.1) { Object.assign(pr, { ...CARA.feliz, ojos: { abiertos: 1, x: 0.3, y: 0.05, feliz: 0.45 }, cejas: { alto: 0.45, ang: 0.15 }, boca: { sonrisa: 0.85, abierta: 0, ancho: 1.15 } }); pr.cabeza = { giro: 0.25, asiente: -0.04, ladea: 0.08 }; }
  bocaVoz(pr, t, T.a2, ENV.a2, 0.5); bocaVoz(pr, t, T.a3, ENV.a3, 0.5);
  return pr;
}
function poseDiegoPal(t) {
  const pr = { x: D_PAL.x, y: 0, z: D_PAL.z, giro: -0.6, inclina: 0.03, ...aC(-0.15, 0.05), ...CARA.sonrisa, ojos: { abiertos: 1, x: -0.4, y: 0, feliz: 0.3 }, ...BRAZOS.celular, t };
  return pr;
}

// ================= RENDER =================
function ponerLuces(lugar, noche = false) {
  const of = lugar === "of", lv = lugar === "lv", pa = lugar === "pa";
  for (const l of [solOf, cieloOf, rellenoOf]) l.visible = of;
  for (const l of [solLv, cieloLv, frenteLv]) l.visible = lv;
  for (const l of [solPa, cieloPa]) l.visible = pa;
  cieloOf.intensity = noche ? 1.1 : 2.0; solOf.intensity = noche ? 0.7 : 1.5; rellenoOf.intensity = noche ? 0.35 : 0.7;
  calleM.color.setHex(noche ? 0x16243d : 0xe6ebec); enfrenteM.color.setHex(noche ? 0x1f3254 : 0xcfd6da);
}
// el celular en la mano de un personaje parado: entre las dos manos, mirando a `mira`
function celEnManos(cel, per, mira, alto = 0.07, adelante = 0.07) {
  per.raiz.updateMatrixWorld(true);
  const a = per.brazos[0].mano.getWorldPosition(new THREE.Vector3()), b = per.brazos[1].mano.getWorldPosition(new THREE.Vector3());
  cel.position.copy(a.add(b).multiplyScalar(0.5)).add(V3(0, alto, 0));
  cel.position.add(mira.clone().sub(cel.position).setY(0).normalize().multiplyScalar(adelante));
  cel.lookAt(mira);
}
function renderAt(tIn) {
  AVISOS.length = 0;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const pl = planoEn(t); planoActual = pl[0];
  let pa = planoActual;
  if (VERM === "portada") pa = "portada";
  const lugar = ["P1", "P1b", "Q1", "Q1b", "Q1i", "portada"].includes(pa) ? "lv" : ["Q3", "Q3b"].includes(pa) ? "pa" : "of";
  const noche = pa === "P2";
  ponerLuces(lugar, noche);
  scene.background = new THREE.Color(lugar === "of" ? 0x16243d : 0xdfe9ec);
  OF.visible = lugar === "of"; LV.visible = lugar === "lv"; PA.visible = lugar === "pa";
  // ---- pantallas y objetos ----
  dibujarPantS(t); dibujarMonitor(t);
  if (lugar === "lv") dibujarCelD(t);
  telP.visible = pa === "P2"; telS.visible = lugar === "of" && pa !== "P2";
  fichaPCmat.map = t < P2 && t >= T.p3b ? texFichaG : texFichaV;
  franjaRes.visible = t >= T.reserva;
  if (franjaRes.visible) { const u = sg(t, T.reserva, T.reserva + 0.22); franjaRes.position.set(lerp(-0.35, 0, eo(u)), lerp(0.06, 0, eo(u)), 0.004); franjaRes.rotation.z = lerp(0.6, 0.32, eo(u)); franjaRes.scale.setScalar(lerp(1.5, 1, eo(u)) * (1 + 0.06 * Math.sin(Math.PI * sg(t, T.reserva + 0.2, T.reserva + 0.4)))); }
  // el celular acostado vibra (gira un poco y tiembla) en la escalada
  if (pa === "P2") { const k = Math.floor((t - T.p2) / 0.26), f = ((t - T.p2) % 0.26) / 0.26; const vib = f < 0.5 ? Math.sin(f * 60) * 0.004 : 0; telP.position.set(0.3 + vib, MESA_Y + 0.008, 1.26 + vib * 0.5); telP.rotation.z = 0.18 + k * 0.025; }
  // el celular parado: vibra cuando llama don Alberto
  { const vb = (t >= T.vibra && t < T.atiende) || (t >= T.vib3 && t < T.al2 - 0.15) ? Math.sin(t * 90) * 0.004 : 0; telS.position.x = 0.42 + vb; }
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  celS.visible = celD.visible = false; tazaS.visible = false;
  if (lugar === "lv") {
    for (const p of [silvana, diego, ella, el]) p.raiz.visible = true;
    silvana.poner(poseSilvanaLiv(t)); diego.poner(poseDiegoLiv(t));
    for (const p of [ella, el]) p.poner(posePareja(p, t));
  }
  if (lugar === "of") {
    silvana.raiz.visible = pa !== "P2"; sillaS.visible = true;
    silvana.poner({ x: SIL.x, y: -0.08, z: SIL.z, giro: 0, sentado: 1, t });   // (r1) la raíz en su lugar antes de aCuerpo
    const ps = poseSilvanaOf(t); silvana.poner(ps);
    if (ps.taza && silvana.raiz.visible) { silvana.raiz.updateMatrixWorld(true); const m = silvana.brazos[1].mano.getWorldPosition(new THREE.Vector3()); tazaS.position.set(m.x + 0.075, m.y - 0.06, m.z + 0.03); tazaS.rotation.set(0, Math.PI - 0.3, 0); tazaS.visible = true; }
    else if (pa === "P2" || (t >= T.p4 && t < P1) || t >= P2) { tazaS.position.set(-0.3, MESA_Y, 1.0); tazaS.rotation.set(0, 0.4, 0); tazaS.visible = true; }
  }
  if (lugar === "pa") {
    for (const p of [silvana, diego, agustina]) p.raiz.visible = true;
    silvana.poner({ x: S_PAL.x, y: 0, z: S_PAL.z, giro: -0.75, t });   // (r1) la raíz en su lugar antes de aCuerpo
    silvana.poner(poseSilvanaPal(t)); diego.poner(poseDiegoPal(t)); agustina.poner(poseAgustina(t));
    puerta3B.rotation.y = 1.25 * eio(sg(t, T.abre, T.abre + 0.6));
    // la llave en la cerradura (en la mano de Silvana); cuando abre, queda en la puerta
    const cerr = V3(PUERTA.x1 - 0.105, 0.95, 0.06); llaveP.position.copy(cerr); llaveP.rotation.set(0, 0, t >= T.q3 + 0.25 ? -Math.PI / 2 : 0);
    if (t >= T.abre) { puerta3B.updateMatrixWorld(true); const w = puerta3B.localToWorld(V3(PUERTA.x1 - PUERTA.x0 - 0.07 - 0.07, 0.95, 0.06)); llaveP.position.copy(PA.worldToLocal(w)); llaveP.rotation.set(0, puerta3B.rotation.y, -Math.PI / 2); }
  }
  scene.updateMatrixWorld(true);
  // ---- cámara ----
  if (pl[2] && pa !== "portada") ponerCam(catmull(pl[2], t), t);
  if (pa === "P2") {
    // travelling cenital que baja hasta el celular acostado (≥ 60 % del ancho al final)
    telP.updateMatrixWorld(true); const c = telP.localToWorld(V3(0, 0, 0));
    const u = eio(sg(t, T.p2, T.agus));
    const vv = [c.x + 0.003, c.y + lerp(0.5, 0.3, u), c.z + lerp(0.05, 0.02, u), c.x, c.y, c.z, 50]; ponerVista(vv, vv, 0, V3(0, 0, -1).applyAxisAngle(V3(0, 1, 0), 0.18), V3(0, 0, -1).applyAxisAngle(V3(0, 1, 0), 0.18));
  }
  if (pa === "P3i" || pa === "P4i") {
    const { v, up } = vistaPantalla(telS.userData.piv, telS.userData.centro, V3(0, 0, 1), telS.userData.H, pa === "P3i" ? 0.66 : 0.7, 40, pa === "P3i" ? 0.047 : 0.0);   // (r1) P3i: el celular abajo, la burbuja arriba sin tapar; P4i más grande
    const t0 = pa === "P3i" ? T.p3i : T.p4i, t1 = pa === "P3i" ? T.p3b : T.p4b;
    const k = eio(sg(t, t0, t1)), v2 = v.slice(); for (const j of [0, 1, 2]) v2[j] += (v[j] - v[j + 3]) * 0.07 * (1 - k);
    ponerVista(v2, v2, 0, up, up);
  }
  if (pa === "Q1" || pa === "Q1b") { camera.updateMatrixWorld(true); celEnManos(celD, diego, t >= T.muestra ? camera.position : V3(BX + 0.3, 1.0, -0.4), 0.08, 0.1); celD.visible = true; }
  if (pa === "Q1i") {
    const A = CAM_LIV(0.6); ponerCam(A, t, true); camera.updateMatrixWorld(true);
    celEnManos(celD, diego, camera.position, 0.12, 0.16); celD.visible = true;
    const { v, up } = vistaPantalla(celD, V3(0, 0, 0.007), V3(0, 0, 1), 0.16 * 1.2, 0.7, 40, 0.0);
    const k = sg(t, T.q1i, T.q2), v2 = v.slice(); for (const j of [0, 1, 2]) v2[j] += (v[j] - v[j + 3]) * 0.05 * (1 - k);
    ponerVista(v2, v2, 0, up, up);
    for (const p of [silvana, diego, ella, el]) p.raiz.visible = false;
  }
  if (pa === "P3i" || pa === "P4i") { silvana.raiz.visible = false; tazaS.visible = false; }
  if (lugar === "lv" && pa !== "Q1i") { camera.updateMatrixWorld(true); if (t < P2) { celEnManos(celS, silvana, V3(BX - 0.6, 1.6, 2.2), 0.06, 0.06); celS.visible = true; celEnManos(celD, diego, V3(BX + 0.5, 1.6, 2.0), 0.06, 0.07); celD.visible = true; } }
  if (pa === "Q2") {
    // (r1) el panel entero en cuadro, con márgenes, quieto; un push-in mínimo
    const { v, up } = vistaPantalla(monitor, monitor.userData.centro, V3(0, 0, 1), MON.H, 0.74, 40, 0.0);
    const k = eio(sg(t, T.q2, T.q3)), v2 = v.slice(); for (const j of [0, 1, 2]) v2[j] += (v[j] - v[j + 3]) * 0.05 * (1 - k);
    ponerVista(v2, v2, 0, up, up);
  }
  if (pa === "Q3b") {
    agustina.raiz.updateMatrixWorld(true); const c = agustina.cabeza.localToWorld(V3(0, 0.1, 0));
    const u = eio(sg(t, T.q3b, T.q3b + 0.4));
    ponerCam([lerp(c.x + 0.3, c.x + 0.24, u), c.y + 0.1, lerp(c.z + 2.75, c.z + 2.45, u), c.x + 0.06, c.y + 0.22, c.z, 44], t);
  }
  if (pa === "Q4f") {
    fichaPC.updateMatrixWorld(true); const c = fichaPC.localToWorld(V3(0, -0.02, 0));
    const u = eio(sg(t, T.q4f, T.q4f + 0.35));
    ponerCam([lerp(c.x - 0.3, c.x - 0.12, u), lerp(c.y - 0.05, c.y - 0.03, u), lerp(c.z + 1.25, c.z + 0.92, u), c.x - 0.02, c.y - 0.06, c.z, 44], t);
  }
  if (pa === "portada") {
    // la portada: la visita en el living, la pareja, Silvana con la sonrisa fija, Diego con el celular; las consultas
    // 3D no van (fondo limpio); el plano del cuadro 0 un poco más cerrado
    ponerCam([BX - 0.03, 1.34, 4.15, BX - 0.03, 1.05, -0.4, 50], t, true);
    camera.updateMatrixWorld(true); celEnManos(celS, silvana, V3(BX - 0.6, 1.6, 2.2), 0.06, 0.06); celS.visible = true; celEnManos(celD, diego, V3(BX + 0.5, 1.6, 2.0), 0.06, 0.07); celD.visible = true;
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos, consultas, contador y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const g of [...CONS, ...CONS2, AGUS, CONT, ...Object.values(ROT)]) g.visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2) && pa !== "portada") tarjetas(t, pa);
  renderer.render(scene, camera);
}
function tarjetas(t, pa) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  // (r1) la burbuja vive mientras dura el parlamento (+0,12 s) y se va
  const vivo = (a, len, b = Infinity) => t >= a - 0.04 && t < Math.min(b, a + len + 0.12);
  // la burbuja del altavoz: debajo del celular parado, con la cola hacia el celular (no lo tapa)
  const altavoz = (g, t0) => {
    telS.updateMatrixWorld(true);
    const [tx, ty] = objPx(telS.userData.piv, V3(0, 0, 0.01)), [, tt] = objPx(telS.userData.piv, V3(0, telS.userData.H, 0.01));
    const H = g.userData.H, cy = Math.min(1860 - H / 2, ty + 150 + H / 2);
    ponerGlobo(g, Math.min(tx, 1030 - g.userData.W / 2), cy, ent(t0), [tx, ty + 40], 2); void tt;
  };
  if (pa === "P1") {
    // las consultas brotan del celular de Silvana y se apilan abajo a la izquierda (la más nueva arriba de la pila)
    const [cx, cy] = objPx(celS, V3(0, 0.04, 0.01));
    T.cons.forEach((a, i) => {
      if (t < a) return;
      const u = a === 0 ? 1 : eo(sg(t, a, a + 0.32)), ox = [0, 40, -10, 50, 0, 30][i];
      const y = lerp(cy, 1765 - i * 112, u), x = lerp(cx, 290 + ox, u);
      ponerGlobo(CONS[i], x, y, a === 0 ? 1 : ent(a), null, 1 + i, a === 0 ? 1 : lerp(0.5, 1, u));
    });
    ponerContador(12, false, 840, 1712, 1, [cx + 30, cy], 8, 0.78);
    if (vivo(T.d1, LEN.d1, T.s1 - 0.04)) hablar(GL.d1, diego, ent(T.d1 - 0.04), 2, 40, 470);
    if (vivo(T.s1, LEN.s1, T.d2 - 0.04)) hablar(GL.s1, silvana, ent(T.s1 - 0.04), 3, 60, 470);
    if (vivo(T.d2, LEN.d2)) hablar(GL.d2, diego, ent(T.d2 - 0.04), 3, 0, 470);
  }
  if (pa === "P1b" && vivo(T.s2, LEN.s2)) hablar(GL.s2, silvana, ent(T.s2 - 0.04), 2, 40, 300);
  if (pa === "P2") {
    const n = nCuenta(t);
    ponerContador(n, false, 540, 330, 1.25, null, 6);
    // la cola de Agustina apunta a SU fila de la bandeja (la 3.ª)
    const [px2, py2] = objPx(telP, V3(0, telP.userData.H * (0.5 - 476 / 1200), 0.01));
    CONS2.forEach((g, i) => { const a = T.p2 + 0.15 + i * 0.2; if (t < a || t >= T.agus) return; const pos = [[300, 640], [780, 700], [270, 1560], [800, 1500], [290, 1700], [780, 1680]][i]; ponerGlobo(g, pos[0], pos[1], ent(a), null, 2); });
    if (t >= T.agus) { ponerGlobo(AGUS, 540, 1470, ent(T.agus), [px2, py2], 3); }
    if (t >= T.ideal) { ponerGlobo(ROT.ideal, 540, 1720, ent(T.ideal), null, 4); }
  }
  if (pa === "P3i" && vivo(T.a1, LEN.a1)) {
    // arriba del celular (el celular arranca más abajo): la cola baja hacia el celular, no tapa la cabecera
    const [vx, vy] = objPx(telS.userData.piv, V3(0, telS.userData.H * 0.5, 0.01));
    const g = t < T.yaNo ? GL.a1a : GL.a1;
    ponerGlobo(g, 540, Y_YA_NO, t < T.yaNo ? ent(T.a1 - 0.04) : ent(T.yaNo), [vx, vy], 2);
  }
  if (pa === "P3b") {
    const tp = objPx(telS.userData.piv, V3(0, telS.userData.H * 0.6, 0.01)), fp = objPx(fichaPC, V3(-0.15, -0.05, 0.01));
    if (t >= T.rot[0]) { ponerGlobo(ROT.alquilo, 330, 1560, ent(T.rot[0]), null, 3); ponerGuia(GUIAS[0], 420, 1490, tp[0] - 20, tp[1], sg(t, T.rot[0], T.rot[0] + 0.25)); }
    if (t >= T.rot[1]) { ponerGlobo(ROT.comision, 690, 330, ent(T.rot[1]), null, 4); ponerGuia(GUIAS[1], 690, 410, fp[0], fp[1], sg(t, T.rot[1], T.rot[1] + 0.25)); }
  }
  if (pa === "P4" && vivo(T.al, LEN.al)) altavoz(GL.al, T.al - 0.04);
  if (pa === "P4i") ponerContador(38, false, 540, 1780, 1, null, 6, 0.9);
  if (pa === "P4b" && vivo(T.s4, LEN.s4)) { const [bx, by] = bocaPx(silvana); ponerGlobo(GL.s4, 540, 1640, ent(T.s4 - 0.04), [bx, by + 170], 2); }   // abajo, la cola sube hacia ella (no tapa la cara ni el pelo)
  // ---- parte 2 ----
  if (pa === "Q1" && vivo(T.d1b, LEN.d1 - T.d1bDesde)) hablar(GL.d1b, diego, ent(T.d1b - 0.04), 2, 40, 300);
  if (pa === "Q1b" && vivo(T.s5, LEN.s5)) hablar(GL.s5, silvana, ent(T.s5 - 0.04), 3, 60, 300);
  if (pa === "Q1i") {
    if (vivo(T.d3, LEN.d3)) ponerGlobo(GL.d3, 540, 1755, ent(T.d3 - 0.04), null, 2);
    if (t >= T.rotQ1) ponerGlobo(ROT.q1, 540, 165, ent(T.rotQ1), null, 3);
  }
  if (pa === "Q3") {
    if (vivo(T.a2, LEN.a2, T.s7 - 0.04)) hablar(GL.a2, agustina, ent(T.a2 - 0.04), 2, 60, 300);
    if (vivo(T.s7, LEN.s7)) hablar(GL.s7, silvana, ent(T.s7 - 0.04), 3, 0, 300);
    if (t >= T.agusRot) ponerGlobo(ROT.q3a, 330, 1700, ent(T.agusRot), null, 3);   // quién es: "Agustina · ANDA"
  }
  if (pa === "Q3b") {
    const [bx, by] = bocaPx(agustina);
    const g = t < T.tambien ? GL.a3a : GL.a3;
    if (vivo(T.a3, LEN.a3)) ponerGlobo(g, 540, Y_YA_NO, t < T.tambien ? ent(T.a3 - 0.04) : ent(T.tambien), [bx, by - 40], 2);
    ponerGlobo(t < T.rotQ3 ? ROT.q3a : ROT.q3, 540, 1620, t < T.rotQ3 ? 1 : ent(T.rotQ3), null, 3);
  }
  if (pa === "Q4") {
    if (vivo(T.al2, T.al2Fin - T.al2, T.s8 - 0.1)) altavoz(GL.al2, T.al2 - 0.04);
    if (vivo(T.s8, LEN.s8)) hablar(GL.s8, silvana, ent(T.s8 - 0.04), 2, 0, 260);
    if (t >= T.visitas) ponerGlobo(ROT.visitas, 540, 1560, ent(T.visitas), null, 3);
  }
  if (pa === "Q4f") {
    if (vivo(T.s8, LEN.s8)) ponerGlobo(GL.s8, 540, 250, 1, null, 2);   // sin cola: ella está fuera de cuadro; arriba de la ficha
    if (t >= T.rotQ4[0]) ponerGlobo(ROT.comisionOk, 540, 1500, ent(T.rotQ4[0]), null, 3);
    if (t >= T.rotQ4[1]) ponerContador(0, true, 540, 1730, 0.85, null, 4);
  }
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
