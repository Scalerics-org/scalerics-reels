// Capa 3D de caso-tu-nombre (Three.js r170 local). Base: reels/caso-pedidosya.
// renderAt(t) es una función pura del tiempo del timeline (hf-seek); el azar va con semilla.
// Fondo crema #efeee5 (lo pone el HTML; el canvas es transparente). Objetos de marca: navy, verde #5ce611,
// crema, blanco; rojo apagado #c7655b solo para el problema (el "?" de adivinar y el talle agotado).
// LA BOTELLA es genérica (vidrio de gaseosa de almacén, líquido navy, tapa corona verde, etiqueta navy
// con el nombre en crema): nada del rojo, el logo, la tipografía ni la curva de Coca-Cola, que solo se
// nombra en texto. Los nombres van en texturas de canvas (la fuente 3D solo trae dígitos).
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
const S = E; // inicios de escena
const D2R = Math.PI / 180;
let semilla = 2011;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const en = (t, a, b) => t >= a && t < b;

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.sortObjects = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 400);

// entorno claro (estudio crema): tiras de luz que se reflejan en el vidrio
function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x8d9099);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(1.6, 9, -5, 1.5, 3, Math.PI / 2.6, 0xfff4e2, 3.2);
  tira(1.0, 8, 5.5, 1, 1, -Math.PI / 2.3, 0xdfeaff, 2.4);
  tira(10, 1.6, 0, 7, 0, 0, 0xffffff, 1.6);
  const piso = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshBasicMaterial({ color: 0xcfcbb8, side: THREE.DoubleSide }));
  piso.position.y = -4; piso.rotation.x = Math.PI / 2; env.add(piso);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.03);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.75;

const key = new THREE.DirectionalLight(0xfff0dc, 2.3); key.position.set(-4, 7, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xcfe0ff, 1.8); rim.position.set(5, 3, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xf4f2e8, 0x6b7280, 0.9); scene.add(fill);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, cr: 0xefeee5, cr2: 0xdcdacb, cr3: 0xc4c1ae, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8a8f9c, kraft: 0xc9a46c, madera: 0xb98a57, metal: 0x9aa3b2 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45), gd: mat(C.gd, 0.5), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.65),
  navy: mat(C.navy, 0.45), navy2: mat(C.navy2, 0.45), navy3: mat(C.navy3, 0.5),
  red: mat(C.red, 0.55), white: mat(C.white, 0.45), gris: mat(C.gris, 0.6), kraft: mat(C.kraft, 0.8), madera: mat(C.madera, 0.55),
  metal: mat(C.metal, 0.3, { metalness: 0.6 }),
  num: mat(C.g, 0.4, { emissive: C.g, emissiveIntensity: 0.12 }),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };
// material de "pantalla" (textura que se lee igual con cualquier luz)
const matTex = (rough = 0.5, k = 0.35) => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: rough, emissive: 0xffffff, emissiveIntensity: k });
const ponerTex = (m, tex) => { if (tex && m.map !== tex) { m.map = tex; m.emissiveMap = tex; m.needsUpdate = true; } };

const sombraTex = (() => {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const x = c.getContext("2d"); const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(11,18,32,0.42)"); gr.addColorStop(0.55, "rgba(11,18,32,0.2)"); gr.addColorStop(1, "rgba(11,18,32,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const sombra = (w, d) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, opacity: 1 }));
  m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m;
};
const PISO = -1.55;
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
function apoyar(som, x, z, s, op = 1, y = PISO) { som.visible = s > 0.002; if (!som.visible) return; som.position.set(x, y + 0.005, z); som.scale.setScalar(Math.max(0.001, s)); som.material.opacity = op * cl(s); }

const font = new FontLoader().parse(LEXEND);
const DIG = Array.from({ length: 10 }, (_, d) => {
  const g = new TextGeometry(String(d), { font, size: 1, depth: 0.3, curveSegments: 6, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.028, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -0.15); return g;
});
// número 3D de n casilleros (con "+" opcional armado con dos barras)
function numero(n, { mas = false, paso = 0.74, m = M.num } = {}) {
  const g = new THREE.Group();
  const k = n + (mas ? 1 : 0);
  const cas = [];
  for (let i = 0; i < n; i++) {
    const c = new THREE.Group(); c.position.x = (i + (mas ? 1 : 0) - (k - 1) / 2) * paso; g.add(c);
    cas.push(DIG.map((geo) => { const o = new THREE.Mesh(geo, m); o.visible = false; c.add(o); return o; }));
  }
  if (mas) {
    const x = (0 - (k - 1) / 2) * paso + 0.08;
    g.add(mesh(rbox(0.56, 0.17, 0.3, 0.06), m, x, 0, 0)); g.add(mesh(rbox(0.17, 0.56, 0.3, 0.06), m, x, 0, 0));
  }
  return { g, poner(v) { const s = String(Math.max(0, Math.round(v))).padStart(n, " "); cas.forEach((c, i) => c.forEach((o, d) => (o.visible = s[i] === String(d)))); } };
}

// ================= TEXTURAS DE CANVAS (después de cargar Lexend) =================
const tex = {};
const lienzo = (w, h, dibujar) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const tickC = (x, cx, cy, r, fondo = "#5ce611", trazo = "#0b1220") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = trazo; x.lineWidth = r * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.45, cy + r * 0.02); x.lineTo(cx - r * 0.1, cy + r * 0.38); x.lineTo(cx + r * 0.5, cy - r * 0.36); x.stroke(); };
// texto que entra en un ancho máximo
const ajustar = (x, txt, peso, max, ancho) => { let s = max; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 20) { s -= 4; x.font = F(peso, s); } return s; };

const NOMBRES = ["LUCÍA", "MARTÍN", "SOFÍA", "DIEGO", "VALENTINA", "NICOLÁS", "CAMILA", "JUAN", "FLORENCIA", "MATEO", "AGUSTINA", "PABLO", "JULIETA", "SANTIAGO", "MARÍA", "LUCAS", "PAULA", "BRUNO", "ANA", "FEDERICO", "MICAELA", "GONZALO", "CAROLINA", "TOMÁS", "ROCÍO", "MANUEL", "SILVIA"];
// etiqueta envolvente: 2048 x 552 (= 2πr x h de la botella). El centro (u = 0,5) queda al frente.
const LW = 2048, LH = 552;
function dibujarEtiqueta(x, nombre, { color = "#efeee5", fondo = "#0b1220" } = {}) {
  x.fillStyle = fondo; x.fillRect(0, 0, LW, LH);
  // dos filetes crema y una cinta verde finita arriba y abajo (de marca, genéricos)
  x.fillStyle = "#efeee5"; x.fillRect(0, 40, LW, 12); x.fillRect(0, LH - 52, LW, 12);
  x.fillStyle = "#5ce611"; x.fillRect(0, 14, LW, 14); x.fillRect(0, LH - 28, LW, 14);
  if (!nombre) return;
  x.fillStyle = color; x.textAlign = "center"; x.textBaseline = "middle";
  ajustar(x, nombre, 800, 230, 660);
  x.fillText(nombre, LW / 2, LH / 2 + 10);
}
async function prepararTexturas() {
  await document.fonts.load('800 100px "Lexend"');
  await document.fonts.load('600 100px "Lexend"');
  await document.fonts.load('500 40px "IBM Plex Mono"');
  tex.lisa = lienzo(LW, LH, (x) => dibujarEtiqueta(x, ""));
  for (const n of NOMBRES) tex[n] = lienzo(LW, LH, (x) => dibujarEtiqueta(x, n));
  tex["TU LOCAL"] = lienzo(LW, LH, (x) => dibujarEtiqueta(x, "TU LOCAL"));
  tex.preg = lienzo(LW, LH, (x) => {
    dibujarEtiqueta(x, "");
    x.fillStyle = "#c7655b"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 380); x.fillText("?", LW / 2, LH / 2 + 22);
  });
  // la ficha del cliente: arriba la MISMA franja de la etiqueta (2048 x 552), abajo los datos
  const FH = Math.round(LW * (FICHA_H / FICHA_W));
  const ficha = (nombre, compro, talle, rotulo = "Compró") => lienzo(LW, FH, (x) => {
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, LW, FH);
    x.save(); dibujarEtiqueta(x, nombre); x.restore();
    const y0 = LH + 40;
    x.textAlign = "left"; x.textBaseline = "alphabetic";
    x.fillStyle = "#6b7385"; x.font = F(600, 92); x.fillText(rotulo, 150, y0 + 150);
    x.fillStyle = "#0b1220"; x.font = F(800, 120); x.fillText(compro, 150, y0 + 290);
    x.fillStyle = "#e3e1d6"; x.fillRect(150, y0 + 350, LW - 300, 8);
    x.fillStyle = "#6b7385"; x.font = F(600, 92); x.fillText("Talle", 150, y0 + 500);
    x.fillStyle = "#5ce611"; rr(x, 520, y0 + 405, 260, 130, 40);
    x.fillStyle = "#0b1220"; x.font = F(800, 110); x.textAlign = "center"; x.fillText(talle, 650, y0 + 510);
    x.textAlign = "left"; x.fillStyle = "#6b7385"; x.font = F(600, 92); x.fillText("Viene cada", 960, y0 + 500);
    const vx = 960 + x.measureText("Viene cada").width + 36;
    x.fillStyle = "#0b1220"; x.font = F(800, 110); x.fillText("mes", vx, y0 + 505);
  });
  tex.fichaLucia = ficha("LUCÍA", "Vestido verde", "M", "Espera");
  tex.fichaMartin = ficha("MARTÍN", "Zapatillas", "42");
  tex.fichaSofia = ficha("SOFÍA", "Campera", "S");
  tex.fichaDiego = ficha("DIEGO", "Camisa", "L");
  // etiqueta de cartón del vestido: agotado / volvió
  const cartel = (ok) => lienzo(360, 520, (x) => {
    x.fillStyle = "#d8b984"; x.fillRect(0, 0, 360, 520);
    x.fillStyle = "#6e5532"; x.beginPath(); x.arc(180, 52, 20, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(700, 58); x.fillText("TALLE", 180, 150);
    x.font = F(800, 220); x.fillText("M", 180, 352);
    if (!ok) {
      x.strokeStyle = "#c7655b"; x.lineWidth = 30; x.lineCap = "round"; x.beginPath(); x.moveTo(60, 380); x.lineTo(300, 120); x.stroke();
      x.fillStyle = "#c7655b"; rr(x, 22, 404, 316, 92, 20); x.fillStyle = "#ffffff"; x.font = F(800, 54); x.fillText("AGOTADO", 180, 468);
    } else {
      tickC(x, 290, 300, 52);
      x.fillStyle = "#0b1220"; rr(x, 22, 404, 316, 92, 20); x.fillStyle = "#5ce611"; x.font = F(800, 58); x.fillText("VOLVIÓ", 180, 470);
    }
  });
  tex.cartelNo = cartel(false); tex.cartelSi = cartel(true);
  // globo de mensaje (el mismo en el aire y dentro del celular)
  const globo = (x, X, Y, nombre, resto, w = 640, ok = true) => {
    x.fillStyle = "#ffffff"; rr(x, X, Y, w, 300, 44);
    x.beginPath(); x.moveTo(X + 10, Y + 250); x.lineTo(X - 26, Y + 300); x.lineTo(X + 70, Y + 280); x.fill();
    x.fillStyle = "#0b1220"; rr(x, X + 36, Y + 34, 0, 0, 0);
    x.font = F(800, 64); const nw = x.measureText(nombre).width + 56;
    rr(x, X + 34, Y + 34, nw, 98, 24);
    x.fillStyle = "#efeee5"; x.textAlign = "left"; x.fillText(nombre, X + 62, Y + 107);
    x.fillStyle = "#0b1220"; ajustar(x, resto, 700, 60, w - 80); x.fillText(resto, X + 40, Y + 220);
    x.fillStyle = "#6b7385"; x.font = F(500, 34); x.fillText("10:24", X + w - 190, Y + 278);
    if (ok) tickC(x, X + w - 52, Y + 266, 24);
  };
  tex.globo = lienzo(700, 340, (x) => { x.clearRect(0, 0, 700, 340); globo(x, 34, 10, "LUCÍA,", "volvió tu talle M.", 640, false); });
  // pantallas de celular (720 x 1458): chat genérico de la tienda, sin logo ni colores de ninguna app
  const chat = (nombre, resto, conGlobo, hora, historia = true, respuesta = false) => lienzo(720, 1458, (x) => {
    x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, 720, 1458);
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, 720, 210);
    x.fillStyle = "#efeee5"; x.font = F(600, 34); x.textAlign = "left"; x.fillText(hora, 48, 62); x.fillRect(600, 40, 64, 26);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(92, 146, 42, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(800, 44); x.textAlign = "center"; x.fillText("L", 92, 162);
    x.textAlign = "left"; x.fillStyle = "#efeee5"; x.font = F(700, 46); x.fillText("Tienda Lola", 156, 162);
    const fecha = (txt, y) => { x.font = F(600, 30); const fw = x.measureText(txt).width + 60; x.fillStyle = "#d6d3c4"; rr(x, 360 - fw / 2, y, fw, 56, 28); x.fillStyle = "#59627a"; x.textAlign = "center"; x.fillText(txt, 360, y + 38); x.textAlign = "left"; };
    const linea = (txt, y, mio, tam = 40) => { x.font = F(600, tam); const lw = x.measureText(txt).width + 60; const X = mio ? 690 - lw : 30; x.fillStyle = mio ? "#c8e9b4" : "#ffffff"; rr(x, X, y, lw, 92, 28); x.fillStyle = "#0b1220"; x.fillText(txt, X + 30, y + 60); };
    if (historia) {
      fecha("Hace 3 semanas", 240);
      linea("¿Tenés el verde en M?", 320, true);
      linea("Se agotó, te avisamos.", 432, false);
    }
    fecha("Hoy", historia ? 568 : 250);
    if (conGlobo) {
      x.save(); x.translate(10, historia ? 650 : 360); globo(x, 40, 0, nombre, resto, 620, false); x.restore();
    }
    if (respuesta) { linea("¡Paso hoy!", 1010, true, 52); }
    x.fillStyle = "#ffffff"; rr(x, 36, 1330, 648, 96, 48); x.fillStyle = "#9aa1ae"; x.font = F(500, 34); x.fillText("Escribí un mensaje", 80, 1390);
  });
  tex.chatVacio = chat("LUCÍA,", "", false, "10:24");
  tex.chatLucia = chat("LUCÍA,", "volvió tu talle M.", true, "10:24");
  tex.chatLucia2 = chat("LUCÍA,", "volvió tu talle M.", true, "10:24", true, true);
  tex.chatMartin = chat("MARTÍN,", "tu pedido está listo.", true, "12:05");
  tex.chatSofia = chat("SOFÍA,", "¡feliz cumple!", true, "09:00");
  tex.globoMartin = lienzo(700, 340, (x) => { x.clearRect(0, 0, 700, 340); globo(x, 34, 10, "MARTÍN,", "tu pedido está listo."); });
  tex.globoSofia = lienzo(700, 340, (x) => { x.clearRect(0, 0, 700, 340); globo(x, 34, 10, "SOFÍA,", "¡feliz cumple!"); });
  // el globo terráqueo: equirectangular, mar crema, continentes navy
  tex.globo3d = lienzo(2048, 1024, (x, w, h) => {
    x.fillStyle = "#e4e2d3"; x.fillRect(0, 0, w, h);
    const P = (lo, la) => [((lo + 180) / 360) * w, ((90 - la) / 180) * h];
    x.fillStyle = "#16243d";
    for (const poly of CONTINENTES) { x.beginPath(); poly.forEach(([lo, la], i) => { const [px, py] = P(lo, la); i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.closePath(); x.fill(); }
    // Australia en verde: de ahí arrancó
    x.fillStyle = "#3fa60a"; x.beginPath(); AUS.forEach(([lo, la], i) => { const [px, py] = P(lo, la); i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.closePath(); x.fill();
  });
}

// ================= LA BOTELLA (genérica, de vidrio) =================
// perfil (radio, altura); base en y = 0, alto total 3,26
const KR = 1.12; // botella un poco más ancha (más presencia en pantalla)
const P2 = (a) => new THREE.SplineCurve(a.map(([r, y]) => new THREE.Vector2(r * KR, y))).getPoints(110);
const PERFIL = P2([[0, 0.02], [0.4, 0], [0.5, 0.03], [0.55, 0.13], [0.555, 0.5], [0.555, 1.55], [0.52, 1.74], [0.535, 1.92], [0.5, 2.12], [0.4, 2.38], [0.27, 2.6], [0.195, 2.84], [0.172, 3.04], [0.19, 3.08], [0.19, 3.15], [0.165, 3.18], [0.0, 3.18]]);
const LIQ = P2([[0, 0.07], [0.46, 0.07], [0.515, 0.16], [0.52, 0.5], [0.52, 1.55], [0.487, 1.74], [0.5, 1.92], [0.468, 2.12], [0.372, 2.38], [0.248, 2.6], [0.19, 2.74], [0.12, 2.76], [0, 2.76]]);
const vidrioGeo = new THREE.LatheGeometry(PERFIL, 96);
const liquidoGeo = new THREE.LatheGeometry(LIQ, 96);
const vidrioMat = new THREE.MeshPhysicalMaterial({ color: 0xd4ecdc, roughness: 0.06, metalness: 0, transparent: true, opacity: 0.2, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.8, depthWrite: false, side: THREE.FrontSide });
const liquidoMat = new THREE.MeshPhysicalMaterial({ color: 0x0a1222, roughness: 0.42, metalness: 0, clearcoat: 0.25, envMapIntensity: 0.28 });
const vidrioVerde = new THREE.MeshStandardMaterial({ color: C.g, roughness: 0.3, emissive: C.g, emissiveIntensity: 0.15 });
// tapa corona: cilindro con el borde ondulado (21 dientes)
const tapaGeo = (() => {
  const g = new THREE.CylinderGeometry(0.215 * KR, 0.235 * KR, 0.15, 84, 2); const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i), y = p.getY(i); const r = Math.hypot(x, z); if (r < 0.1 || y > 0.07) continue; const a = Math.atan2(z, x); const k = 1 + 0.06 * Math.max(0, Math.cos(a * 21)); p.setX(i, x * k); p.setZ(i, z * k); }
  g.computeVertexNormals(); return g;
})();
const tapaMat = mat(C.g, 0.32, { metalness: 0.35 });
const ETQ = { r: 0.566 * KR, h: 0.95, y: 1.02 };
const etqCilGeo = new THREE.CylinderGeometry(ETQ.r, ETQ.r, ETQ.h, 64, 1, true, -Math.PI, Math.PI * 2);
function botella(texInicial) {
  const g = new THREE.Group();
  const liq = mesh(liquidoGeo, liquidoMat); g.add(liq);
  const etqMat = matTex(0.45, 0.22); etqMat.side = THREE.DoubleSide;
  const etq = mesh(etqCilGeo, etqMat, 0, ETQ.y, 0); g.add(etq);
  const vid = mesh(vidrioGeo, vidrioMat); vid.renderOrder = 2; g.add(vid);
  const tapa = new THREE.Group(); tapa.add(mesh(tapaGeo, tapaMat)); tapa.position.y = 3.2; g.add(tapa);
  if (texInicial) etqMat.userData.pendiente = texInicial;
  return { g, etq, etqMat, tapa, liq, vid };
}
// LA botella protagonista: su etiqueta es un plano que se curva (se puede despegar y aplanar)
const heroe = botella();
heroe.etq.visible = false;
scene.add(heroe.g);
const heroeSombra = sombra(2.2, 1.6);
const ETQ_SEG = 128;
const etqPlanoGeo = new THREE.PlaneGeometry(2 * Math.PI * ETQ.r, ETQ.h, ETQ_SEG, 1);
const etqS = Float32Array.from({ length: etqPlanoGeo.attributes.position.count }, (_, i) => etqPlanoGeo.attributes.position.getX(i));
const etqHeroeMat = matTex(0.45, 0.22); etqHeroeMat.side = THREE.DoubleSide;
const etqHeroe = new THREE.Mesh(etqPlanoGeo, etqHeroeMat);
const etqPivote = new THREE.Group(); etqPivote.add(etqHeroe); scene.add(etqPivote);
let curvaActual = -1;
// b = 0: envuelta en la botella · b = 1: plana (la franja de arriba de la ficha)
function curvar(b) {
  if (Math.abs(b - curvaActual) < 1e-4) return; curvaActual = b;
  const p = etqPlanoGeo.attributes.position, k = (1 - b) / ETQ.r;
  for (let i = 0; i < p.count; i++) {
    const s = etqS[i];
    if (k < 1e-4) { p.setX(i, s); p.setZ(i, ETQ.r); }
    else { p.setX(i, Math.sin(k * s) / k); p.setZ(i, ETQ.r + (Math.cos(k * s) - 1) / k); }
  }
  p.needsUpdate = true; etqPlanoGeo.computeVertexNormals();
}

// ================= MAPA DE AUSTRALIA (extruido, crema oscuro con canto navy) =================
const AUS = [[113.5, -22], [114, -26], [115, -34], [117.9, -35.1], [123.5, -33.9], [126, -32.3], [131, -31.5], [134, -32.8], [135.6, -34.8], [137.5, -33], [138, -35.6], [140, -37.9], [143.5, -38.8], [146.3, -39.1], [148.3, -37.8], [150, -37.5], [151.2, -33.9], [153.1, -30.5], [153.6, -28.2], [153, -25.2], [150.8, -22.5], [149, -20.3], [146.3, -18.9], [145.4, -16], [145.3, -14.9], [143.6, -14.2], [142.5, -10.7], [141.6, -12.9], [141.5, -15.5], [140.8, -17.5], [139, -17.3], [136.8, -15.9], [135.4, -14.8], [136.7, -12.2], [136, -11.9], [133, -11.2], [131, -12.2], [130.1, -13.3], [129.4, -14.9], [127.7, -14.2], [126.1, -14.2], [125, -15.2], [123.6, -16.4], [122.2, -17.9], [121.2, -19.5], [118.8, -20.3], [116.7, -20.6], [114.6, -21.8]];
const TAS = [[144.7, -40.7], [148.3, -40.9], [148.2, -42.2], [147.1, -43.4], [145.9, -43.5], [145.2, -42.2]];
const KA = 0.088;
const ax = (lo) => (lo - 134) * KA * 0.92, az = (la) => -(la + 27) * KA;
const SIDNEY = [ax(151.2), az(-33.9)];
const mapa = new THREE.Group(); scene.add(mapa);
{
  const forma = (pts) => { const sh = new THREE.Shape(); pts.forEach(([lo, la], i) => (i ? sh.lineTo(ax(lo), -az(la)) : sh.moveTo(ax(lo), -az(la)))); sh.closePath(); return sh; };
  const tapaM = mat(0xd6d2bd, 0.75), canto = mat(C.navy2, 0.55);
  for (const pts of [AUS, TAS]) {
    const g = new THREE.ExtrudeGeometry(forma(pts), { depth: 0.24, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 });
    g.rotateX(-Math.PI / 2);
    mapa.add(new THREE.Mesh(g, [tapaM, canto]));
    const v = pts.map(([lo, la]) => new THREE.Vector3(ax(lo), 0.275, az(la)));
    mapa.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(v, true, "catmullrom", 0.2), v.length * 4, 0.035, 8, true), M.navy2));
  }
  // un aro verde en el piso donde se clava la botella
  const aro = mesh(new THREE.TorusGeometry(0.3, 0.045, 10, 40).rotateX(Math.PI / 2), M.g, SIDNEY[0], 0.28, SIDNEY[1]); mapa.add(aro);
}
const mapaSombra = sombra(4.6, 3.4);
const anio = numero(4); scene.add(anio.g);

// ================= GÓNDOLA (heladera de súper) con botellas con nombres =================
const PLANO_BLANCO = new THREE.MeshBasicMaterial({ color: 0xf6f5ef }), PLANO_NAVY = new THREE.MeshBasicMaterial({ color: C.navy2 });
const GOND = { cols: 9, filas: 2, dx: 0.86, dy: 2.0, esc: 0.6, z: -0.2 };
const gondola = new THREE.Group(); scene.add(gondola);
const gBotellas = [];
const ancho = GOND.cols * GOND.dx + 0.5;
{
  const altoT = GOND.filas * GOND.dy + 0.6;
  gondola.add(mesh(rbox(ancho, altoT, 0.12, 0.04), M.cr2, 0, altoT / 2, -0.55)); // fondo
  for (const sx of [-1, 1]) gondola.add(mesh(rbox(0.16, altoT, 1.1, 0.05), M.navy, (sx * ancho) / 2, altoT / 2, -0.05)); // laterales
  for (let f = 0; f <= GOND.filas; f++) {
    gondola.add(mesh(new THREE.BoxGeometry(ancho, 0.1, 1.1), PLANO_BLANCO, 0, f * GOND.dy, -0.05)); // estantes (color plano: sin degradé)
    if (f < GOND.filas) gondola.add(mesh(rbox(ancho, 0.12, 0.05, 0.02), M.g, 0, f * GOND.dy + 0.02, 0.5)); // cenefa verde
  }
  gondola.add(mesh(new THREE.BoxGeometry(ancho + 0.2, 0.5, 1.2), PLANO_NAVY, 0, altoT, -0.05)); // copete
  let k = 1;
  for (let f = 0; f < GOND.filas; f++) for (let c = 0; c < GOND.cols; c++) {
    if (f === 1 && c === 4) { gBotellas.push(null); continue; } // el lugar de LUCÍA
    const b = botella(); const nombre = NOMBRES[k++ % NOMBRES.length];
    b.nombre = nombre; b.f = f; b.c = c;
    b.g.position.set((c - (GOND.cols - 1) / 2) * GOND.dx, f * GOND.dy + 0.05, 0.05);
    b.g.rotation.y = (azar() - 0.5) * 0.5;
    b.g.scale.setScalar(GOND.esc); gondola.add(b.g); gBotellas.push(b);
  }
}
const contador = numero(3); scene.add(contador.g);
const precio = mesh(rbox(2.7, 1.25, 0.16, 0.14), M.navy, 0, 0, -0.18); contador.g.add(precio);
precio.add(mesh(rbox(2.72, 0.12, 0.17, 0.05), M.g, 0, 0.62, 0));
const amigo = botella(); scene.add(amigo.g);
const amigoSombra = sombra(1.6, 1.2);
const lugarHeroe = new THREE.Vector3(0, PISO + 1 * GOND.dy + 0.05, GOND.z + 0.05);

// ================= EL GLOBO =================
const CONTINENTES = [
  [[-168, 66], [-160, 71], [-140, 70], [-120, 73], [-95, 73], [-80, 73], [-62, 60], [-55, 52], [-66, 44], [-71, 41], [-76, 37], [-81, 31], [-80, 25.5], [-82.5, 27.5], [-84.5, 30], [-90, 29.5], [-97, 26], [-97.5, 22], [-96, 19], [-94, 18.2], [-91, 18.6], [-90.4, 21], [-87, 21.5], [-88.3, 16], [-83.4, 14.5], [-83.7, 10.9], [-79.6, 9.6], [-77.2, 8.6], [-75.6, 10.4], [-72, 12], [-68, 10.5], [-61.6, 10.3], [-57, 6], [-51, 4], [-50, 0], [-44, -2.5], [-35, -5.5], [-35, -9], [-39, -17.9], [-41, -22], [-48.5, -25.9], [-53.4, -33.7], [-57.8, -34.4], [-57.6, -38.1], [-65, -41], [-67.4, -46], [-68.9, -50.3], [-68.6, -54.9], [-74.4, -52.5], [-75.3, -47], [-73.2, -37], [-71.4, -30], [-70.2, -23], [-70.4, -18.4], [-76.3, -13.8], [-81.3, -4.6], [-80.1, 0], [-77.3, 4], [-77.9, 7.2], [-80.5, 7.3], [-83.5, 8.4], [-86, 11.5], [-92, 14.5], [-96, 15.7], [-105.5, 20.5], [-109, 25.5], [-112, 29], [-117, 32.5], [-120.5, 34.5], [-124, 40], [-124.5, 48], [-130, 54], [-140, 59.5], [-152, 58], [-165, 60]],
  [[-55, 60], [-43, 60], [-20, 70], [-20, 82], [-60, 82], [-70, 77], [-58, 70]],
  [[-10, 36], [-9, 43], [-2, 43.5], [-5, 48], [2, 51], [8, 54], [10, 57.5], [5, 62], [14, 68], [25, 71], [40, 68], [60, 70], [80, 73], [105, 78], [140, 72], [180, 70], [180, 65], [170, 60], [160, 55], [142, 52], [140, 47], [132, 43], [127, 39], [126, 35], [121, 31], [122, 25], [110, 21], [108, 12], [104, 9], [100, 13], [99, 8], [103, 1.5], [98, 8], [97, 16], [92, 21], [88, 22], [80, 15], [77, 8], [72, 21], [67, 25], [57, 25.5], [56, 27], [50, 30], [48, 29], [55, 22], [52, 17], [44, 12], [43, 14], [39, 22], [35, 28], [34, 31], [36, 36], [30, 36.5], [27, 37], [26, 40.5], [23, 40], [22, 37], [19, 40], [16, 38], [12, 44], [13, 45.5], [8, 44], [3, 43], [0, 39], [-6, 36]],
  [[-17, 21], [-16, 12], [-8, 4.5], [5, 4.5], [9, 3], [9, -1], [13, -6], [12, -17], [15, -27], [18, -34.5], [25, -34], [33, -27], [35, -22], [40, -15], [40, -4], [43, 0], [51, 11], [44, 11], [38, 18], [33, 28], [32, 31], [20, 31], [10, 37], [-1, 35.5], [-6, 36], [-10, 30], [-13, 27]],
  [[-5, 50], [2, 51], [0, 54], [-3, 58.5], [-6, 57]],
  [[109, 1], [118, 7], [119, 0], [116, -4], [110, -3]], [[95, 5], [106, -6], [104, -6], [98, 1]],
  [[130, 31], [135, 34], [141, 38], [142, 44], [140, 41], [136, 36], [131, 33.5]],
  [[167, -46], [174, -41], [178, -38], [175, -36], [172, -41]],
  [[44, -25], [50, -16], [49, -12], [43, -18]],
  TAS,
];
const RG = 1.55;
const ll = (lo, la, r = RG) => { const phi = ((lo + 180) / 360) * Math.PI * 2, th = ((90 - la) / 180) * Math.PI; return new THREE.Vector3(-r * Math.cos(phi) * Math.sin(th), r * Math.cos(th), r * Math.sin(phi) * Math.sin(th)); };
const globo = new THREE.Group(); scene.add(globo);
const globoMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.62, flatShading: true });
const esfera = new THREE.Mesh(new THREE.SphereGeometry(RG, 40, 26), globoMat); globo.add(esfera);
// anillo navy alrededor (como un globo de escritorio), para que se despegue del fondo crema
const DESTINOS = [[174, -41], [139.7, 35.7], [116.4, 39.9], [77.2, 28.6], [28, -26], [36.8, -1.3], [31.2, 30], [13.4, 52.5], [-3.7, 40.4], [-0.1, 51.5], [-47.9, -15.8], [-58.4, -34.6], [-99.1, 19.4], [-77, 38.9], [-79.4, 43.7], [2.3, 48.9], [12.5, 41.9], [103.8, 1.35], [121, 14.6], [-74, 4.7]];
const ORIGEN = [151.2, -33.9];
const arcos = DESTINOS.map(([lo, la]) => {
  const a = ll(...ORIGEN, 1).normalize(), b = ll(lo, la, 1).normalize();
  const ang = a.angleTo(b), pts = [];
  for (let i = 0; i <= 40; i++) { const u = i / 40; const v = a.clone().multiplyScalar(Math.sin((1 - u) * ang)).add(b.clone().multiplyScalar(Math.sin(u * ang))).divideScalar(Math.sin(ang)); pts.push(v.multiplyScalar(RG + 0.02 + Math.sin(Math.PI * u) * 0.17 * Math.min(1, ang))); }
  const tg = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.028, 6, false);
  const m = new THREE.Mesh(tg, M.g); m.userData.total = tg.index.count; globo.add(m);
  const pin = new THREE.Group(); const pb = new THREE.Mesh(vidrioGeo, vidrioVerde); pb.scale.setScalar(0.12); pin.add(pb);
  pin.position.copy(ll(lo, la, RG - 0.01)); pin.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pin.position.clone().normalize()); globo.add(pin);
  return { m, pin, ang };
});
const masOchenta = numero(2, { mas: true }); scene.add(masOchenta.g); masOchenta.poner(80);
const globoSombra = sombra(3.6, 2.2);
const vAus = ll(...ORIGEN, 1);

// ================= FICHAS DE CLIENTE =================
const FICHA_W = 2 * Math.PI * ETQ.r, FICHA_H = 2.6, FS = 0.74; // FS: escala de la ficha en pantalla
const fichaGeo = rbox(FICHA_W + 0.08, FICHA_H + 0.08, 0.07, 0.07);
function fichaMesh() {
  const m = matTex(0.5, 0.25);
  const g = grupo(mesh(fichaGeo, M.white), mesh(new THREE.PlaneGeometry(FICHA_W, FICHA_H), m, 0, 0, 0.04));
  scene.add(g); return { g, m };
}
const fichas = [fichaMesh(), fichaMesh(), fichaMesh()]; // 0 = Lucía, 1-2 atrás (Martín, Sofía)
// el cuerpo de la ficha mientras se despliega bajo la etiqueta (blanco, se estira hacia abajo)
const cuerpoFicha = mesh(rbox(FICHA_W + 0.08, 1, 0.07, 0.05), M.white); scene.add(cuerpoFicha);

// ================= PERCHERO, VESTIDO, CARTEL =================
const perchero = new THREE.Group(); scene.add(perchero);
const vestido = new THREE.Group();
const cartel = new THREE.Group();
const cartelMat = matTex(0.7, 0.25);
{
  // barra y patas
  perchero.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.7, 16).rotateZ(Math.PI / 2), M.navy, 0, 2.55, 0));
  for (const sx of [-1, 1]) {
    perchero.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.1, 14), M.navy, sx * 1.32, 0.5, 0));
    perchero.add(mesh(rbox(0.6, 0.08, 0.5, 0.03), M.navy, sx * 1.32, -1.55 + 0.04, 0));
  }
  // percha de madera
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 8, 24, Math.PI * 1.35), M.metal); hook.position.set(0.0, 2.42, 0); hook.rotation.z = -0.3;
  vestido.add(hook);
  vestido.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.28, 8), M.metal, 0, 2.17, 0));
  const brazo = (sx) => { const b = mesh(rbox(0.95, 0.09, 0.09, 0.04), M.madera, sx * 0.45, 1.93, 0); b.rotation.z = sx * -0.38; return b; };
  vestido.add(brazo(-1), brazo(1));
  vestido.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.55, 8).rotateZ(Math.PI / 2), M.madera, 0, 1.72, 0));
  // el vestido: silueta extruida con relieve
  const sh = new THREE.Shape();
  const D = [[0.0, 1.62], [0.18, 1.78], [0.34, 1.86], [0.48, 1.6], [0.46, 1.25], [0.36, 0.9], [0.34, 0.68], [0.5, 0.2], [0.75, -0.5], [0.95, -1.15], [0.6, -1.25], [0.2, -1.2], [-0.2, -1.25], [-0.6, -1.2], [-0.95, -1.15]];
  const L = [[-0.75, -0.5], [-0.5, 0.2], [-0.34, 0.68], [-0.36, 0.9], [-0.46, 1.25], [-0.48, 1.6], [-0.34, 1.86], [-0.18, 1.78]];
  sh.moveTo(D[0][0], D[0][1]);
  [...D.slice(1), ...L].forEach(([x, y]) => sh.lineTo(x, y)); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.07, bevelSegments: 4, curveSegments: 12 });
  g.translate(0, 0, -0.09);
  const tela = mat(C.g, 0.75);
  vestido.add(mesh(g, tela));
  // cinturón navy y pliegues
  vestido.add(mesh(rbox(0.74, 0.12, 0.42, 0.05), M.navy, 0, 0.72, 0));
  for (const x of [-0.42, 0, 0.42]) { const p = mesh(rbox(0.05, 1.5, 0.05, 0.02), M.gd, x, -0.45, 0.2); p.rotation.z = x * -0.32; vestido.add(p); }
  perchero.add(vestido);
  // cartel de cartón, colgado de la manga con un hilo
  cartel.add(mesh(rbox(0.66, 0.95, 0.03, 0.04), M.kraft));
  cartel.add(mesh(new THREE.PlaneGeometry(0.64, 0.92), cartelMat, 0, 0, 0.02));
  cartel.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.36, 6), M.navy, 0, 0.64, 0));
  scene.add(cartel);
}
const percheroSombra = sombra(3.8, 1.3);
// la caja que llega
const caja = new THREE.Group(); scene.add(caja);
{
  caja.add(mesh(rbox(1.7, 1.15, 1.25, 0.05), M.kraft, 0, 0.575, 0));
  caja.add(mesh(rbox(0.32, 0.02, 1.27, 0.01), M.navy, 0, 1.155, 0));
  caja.add(mesh(rbox(0.32, 1.17, 0.02, 0.01), M.navy, 0, 0.575, 0.63));
  caja.add(mesh(rbox(0.62, 0.42, 0.02, 0.02), M.white, -0.48, 0.55, 0.635));
  caja.add(mesh(rbox(0.42, 0.06, 0.01, 0.01), M.navy3, -0.52, 0.62, 0.65));
  caja.add(mesh(rbox(0.3, 0.06, 0.01, 0.01), M.gris, -0.58, 0.48, 0.65));
}
const cajaSombra = sombra(2.8, 2.0);
// el globo de mensaje en el aire
const globoMsgMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.3, transparent: true });
globoMsgMat.depthTest = false;
const globoMsg = new THREE.Mesh(new THREE.PlaneGeometry(2.06, 1.0), globoMsgMat); globoMsg.renderOrder = 10; scene.add(globoMsg); // vuela siempre por delante

// ================= CELULARES =================
const PW = 1.56, PH = 3.16;
function celular() {
  const m = matTex(0.4, 0.75);
  const g = grupo(
    mesh(rbox(PW + 0.16, PH + 0.16, 0.12, 0.22, 4), M.navy3, 0, 0, -0.02),
    mesh(rbox(PW + 0.1, PH + 0.1, 0.16, 0.2, 4), M.navy),
    mesh(new THREE.PlaneGeometry(PW - 0.06, PH - 0.06), m, 0, 0, 0.082),
    mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16).rotateX(Math.PI / 2), mat(0x131a26, 0.7), 0, PH / 2 - 0.12, 0.085),
  );
  scene.add(g); return { g, m };
}
const cels = [celular()]; // el celular de Lucía
// los otros mensajes que salen solos (Martín, Sofía): globos 3D que flotan alrededor
const globosMas = [0, 1].map(() => { const m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.3, transparent: true }); const o = new THREE.Mesh(new THREE.PlaneGeometry(2.06, 1.0), m); o.renderOrder = 3; scene.add(o); return o; });

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ]; curva Catmull-Rom continua.
const CAM = [
  [0, -30, -7, 11.0, 0, 0.78, 0],
  [S["s01-gancho"] + 1.4, -14, -5, 10.5, 0, 0.78, 0],
  [S["s02-australia"] - 0.1, 2, 1, 10.1, 0, 0.8, 0],
  [S["s02-australia"] + 0.55, 4, 38, 13.4, 0.1, -0.45, 0.1],
  [S["s03-ciento-cincuenta"] - 0.2, 0, 30, 13.2, 0.1, -0.1, 0.1],
  [S["s03-ciento-cincuenta"] + 0.15, -5, 4, 13.1, -1.2, 1.5, -0.2],
  [S["s04-buscar"] - 0.1, 4, 4, 13.1, 1.3, 1.5, -0.2],
  [S["s04-buscar"] + 0.55, 0, 3, 8.6, 0, 0.87, 1.2],
  [W[34], -4, 3, 9.6, 0, 0.87, 1.2],
  [S["s05-paises"] + 0.45, 0, 6, 13.5, 0, 0.35, 0],
  [S["s06-adivinar"] - 0.05, 4, 4, 12.4, 0, 0.7, 0.2],
  [S["s06-adivinar"] + 0.5, 0, 2, 11.2, 0, 1.04, 0],
  [S["s07-vos"] - 0.05, 3, 2, 11.0, 0, 1.0, 0],
  [S["s07-vos"] + 0.8, 0, 2, 13.4, 0, 0.55, 0.8],
  [S["s08-lucia"] - 0.05, -2, 3, 11.6, 0, 0.5, 0.6],
  [S["s08-lucia"] + 0.6, -10, 4, 10.6, 0, 0.62, 0],
  [S["s09-caja"] - 0.05, 6, 5, 9.8, 0.0, 0.55, 0],
  [S["s09-caja"] + 0.9, 3, 5, 10.0, 0, 0.45, 0.3],
  [S["s10-mensaje"] - 0.1, 0, 4, 8.0, 0, 0.3, 1.6],
  [S["s10-mensaje"] + 1.6, -4, 3, 6.4, 0, 0.45, 1.6],
  [S["s11-automatizamos"] - 0.05, -3, 3, 6.5, 0, 0.45, 1.6],
  [S["s11-automatizamos"] + 0.7, 0, 4, 11.5, 0, 0.35, 1.4],
  [S["s12-tu-local"] - 0.1, 3, 4, 11.6, 0, 0.5, 0.8],
  [S["s12-tu-local"] + 0.6, -6, 1, 10.6, 0, 0.46, 0.3],
  [S["s13-llamada"], -3, 1, 10.5, 0, 0.46, 0.3],
  [S["s13-llamada"] + 0.8, 1, 2, 10.3, 0, 0.46, 0.3],
  [DUR, 3, 2, 10.1, 0, 0.46, 0.3],
];
const _mira = new THREE.Vector3();
function ponerCamara(t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6]];
  const p1 = val(a), p2 = val(b), p0 = i > 0 ? val(CAM[i - 1]) : p1, p3 = i + 2 < CAM.length ? val(CAM[i + 2]) : p2;
  const u2 = u * u, u3 = u2 * u;
  const v = p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
  const [az, el, ld, tx, ty, tz] = v;
  const d = Math.exp(ld);
  _mira.set(tx, ty, tz);
  camera.position.set(tx + d * Math.cos(el * D2R) * Math.sin(az * D2R), ty + d * Math.sin(el * D2R), tz + d * Math.cos(el * D2R) * Math.cos(az * D2R));
  camera.position.x += Math.sin(t * 0.7) * 0.04; camera.position.y += Math.sin(t * 0.53) * 0.025;
  camera.lookAt(_mira);
  camera.updateMatrixWorld();
  return d;
}
const mirarCamara = (o) => { o.quaternion.copy(camera.quaternion); };

// ================= ESCENA EN EL TIEMPO =================
const _v = new THREE.Vector3(), _v2 = new THREE.Vector3();
const tiraNombres = ["SOFÍA", "DIEGO", "JUAN", "VALENTINA", "MATEO", "FLORENCIA", "NICOLÁS", "PAULA", "BRUNO", "JULIETA", "TOMÁS", "LUCAS"];

function renderAt(t) {
  scene.environmentRotation.y = t * 0.15;
  ponerCamara(t);

  // ---------- LA BOTELLA protagonista ----------
  {
    let s = 0, x = 0, y = PISO, z = 0, ry = 0, rz = 0, rx = 0, etqTex = tex.lisa, giro = 0, sombraOn = 1;
    let pivote = null; // si no es null, la etiqueta se maneja aparte (s07)
    if (t < S["s02-australia"] + 0.7) {
      // gancho: enorme, la etiqueta lisa gira; en "tu nombre" aparece LUCÍA
      s = 1; ry = Math.sin(t * 0.6) * 0.08;
      y += Math.sin(Math.PI * sg(t, W[5] - 0.05, W[5] + 0.3)) * 0.12; // "logo": salta
      const nombre = W[8] - 0.05;
      giro = t < nombre ? -Math.PI * 2 * (1 - eo(sg(t, 0, nombre))) * 1.25 : 0;
      etqTex = t >= nombre - 0.12 ? tex["LUCÍA"] : tex.lisa;
      if (t >= nombre - 0.12 && t < nombre + 0.4) ry += 0.18 * Math.sin(Math.PI * 2 * sg(t, nombre - 0.05, nombre + 0.35));
      // Australia: se achica y se clava en Sídney como un pin
      const va = eio(sg(t, S["s02-australia"] - 0.05, S["s02-australia"] + 0.55));
      s = lerp(s, 0.55, va); x = lerp(0, SIDNEY[0], va); z = lerp(0, SIDNEY[1], va); y = lerp(y, PISO + 0.27, va);
      const clava = sg(t, S["s02-australia"] + 0.5, S["s02-australia"] + 0.75);
      y += Math.sin(Math.PI * clava) * -0.06;
    } else if (t < S["s03-ciento-cincuenta"] + 0.6) {
      // pin en el mapa; después vuela a su lugar en la góndola
      s = 0.55; x = SIDNEY[0]; z = SIDNEY[1]; y = PISO + 0.27; etqTex = tex["LUCÍA"]; ry = Math.sin(t * 1.4) * 0.25;
      const va = eio(sg(t, S["s03-ciento-cincuenta"] - 0.1, S["s03-ciento-cincuenta"] + 0.5));
      x = lerp(x, lugarHeroe.x, va); y = lerp(y, lugarHeroe.y, va) + Math.sin(Math.PI * va) * 0.6; z = lerp(z, lugarHeroe.z, va) + Math.sin(Math.PI * Math.min(1, va * 1.15)) * 1.6; // por delante de la fila s = lerp(s, GOND.esc, va);
      sombraOn = 1 - va;
    } else if (t < S["s05-paises"] + 0.75) {
      // en la góndola; "tuyo": sale hacia la cámara; "amigo": brindis
      s = GOND.esc; x = lugarHeroe.x; y = lugarHeroe.y; z = lugarHeroe.z; etqTex = tex["LUCÍA"]; sombraOn = 0;
      const sale = eio(sg(t, S["s04-buscar"] + 0.05, W[27] + 0.15));
      x = lerp(x, 0, sale); y = lerp(y, PISO + 0.9, sale); z = lerp(z, 1.2, sale); s = lerp(s, 0.78, sale); ry = Math.sin(t * 1.1) * 0.1;
      // "amigo": se corre a la izquierda y brinda (se inclina hacia la derecha)
      x -= 0.86 * eio(sg(t, W[33] - 0.2, W[34] + 0.05));
      rz = -0.24 * eio(sg(t, W[34] - 0.2, W[34] + 0.08)) * (1 - eio(sg(t, W[34] + 0.4, W[34] + 0.75)));
      // países: se achica y vuela a Australia en el globo
      const va = eio(sg(t, S["s05-paises"] - 0.1, S["s05-paises"] + 0.6));
      ponerGlobo(t);
      _v.copy(vAus).applyQuaternion(globo.quaternion).multiplyScalar(RG * globo.scale.x).add(globo.position);
      x = lerp(x, _v.x, va); y = lerp(y, _v.y, va); z = lerp(z, _v.z, va) + Math.sin(Math.PI * va) * 2.0; s *= lerp(1, 0.3, va) * (1 - eio(sg(va, 0.1, 0.55))); rz *= 1 - va;
    } else if (en(t, S["s06-adivinar"] - 0.25, S["s08-lucia"])) {
      // adivinar: sale del globo y crece; la etiqueta gira como un tragamonedas y frena en "?"
      // crece desde Australia (al frente del globo) y llega al centro: siempre un objeto grande en cuadro
      const crece = eio(sg(t, S["s06-adivinar"] - 0.38, S["s06-adivinar"] + 0.3));
      ponerGlobo(t);
      _v.set(0, -0.35, RG + 0.3); // sale del frente del globo (siempre hacia la cámara)
      s = lerp(0.3, 1.25, crece); x = lerp(_v.x, 0, crece); y = lerp(_v.y - 0.3, PISO, crece); z = lerp(_v.z + 0.6, 0, crece);
      const frena = W[45] + 0.05;
      const fase = t < frena ? (t - S["s06-adivinar"]) * 22 : 0;
      giro = t < frena ? Math.sin(fase * 0.9) * 0.22 : 0; // el rodillo cambia nombres enteros, la etiqueta queda de frente
      if (t < frena) { const k = Math.floor((t - S["s06-adivinar"] + 1) / 0.075); etqTex = tex[tiraNombres[((k % tiraNombres.length) + tiraNombres.length) % tiraNombres.length]]; }
      else etqTex = tex.preg;
      if (t >= frena) s *= 1 + 0.04 * Math.sin(Math.PI * sg(t, frena, frena + 0.3));
      // duda: se inclina a un lado y al otro
      rz = Math.sin((t - frena) * 5.5) * 0.12 * sg(t, frena + 0.1, frena + 0.4) * (1 - sg(t, S["s07-vos"] - 0.2, S["s07-vos"]));
      ry = Math.sin(t * 0.8) * 0.1;
      // vos: la etiqueta se despega; la botella baja y se va
      if (t >= S["s07-vos"] - 0.05) { pivote = true; etqTex = tex["LUCÍA"]; }
      const va = eio(sg(t, S["s07-vos"] + 0.15, S["s07-vos"] + 0.75));
      y = lerp(y, PISO - 3.0, va); x = lerp(x, -0.4, va); rz += va * 0.35; sombraOn = 1 - va; s *= 1 - eio(sg(va, 0.35, 1));
    } else if (t >= S["s12-tu-local"] - 0.12) {
      // vuelve LA botella: TU LOCAL, a la derecha del celular de Lucía; la tapa salta en "local"
      const crece = bk(sg(t, S["s12-tu-local"] - 0.12, S["s12-tu-local"] + 0.22));
      s = 0.86 * (0.45 + 0.55 * crece); y = PISO; x = 0.74; z = 0.3; etqTex = tex["TU LOCAL"];
      giro = -Math.PI * 1.5 * (1 - eo(sg(t, S["s12-tu-local"] - 0.12, W[80]))) ;
      ry = Math.atan2(camera.position.x, camera.position.z) + Math.sin(t * 0.7) * 0.05;
      if (en(t, W[81] - 0.05, W[81] + 0.35)) s *= 1 + 0.05 * Math.sin(Math.PI * sg(t, W[81] - 0.05, W[81] + 0.3));

    }
    ocultar(heroe.g, s); heroe.g.position.set(x, y, z); heroe.g.rotation.set(rx, ry, rz);
    // tapa: salta en "local" y gira en el aire
    {
      const salta = sg(t, W[81] - 0.02, W[81] + 0.75);
      if (t >= S["s12-tu-local"] && salta > 0) { heroe.tapa.position.set(salta * 2.2, 3.2 + Math.sin(Math.PI * Math.min(1, salta * 1.1)) * 0.12 - salta * 0.9, salta * 0.6); heroe.tapa.rotation.set(salta * 5, 0, -salta * 4); heroe.tapa.visible = salta < 0.97; }
      else { heroe.tapa.position.set(0, 3.2, 0); heroe.tapa.rotation.set(0, 0, 0); heroe.tapa.visible = true; }
    }
    apoyar(heroeSombra, x, z, s * sombraOn, 0.9, y > PISO + 0.4 ? -50 : Math.max(PISO, y));
    // la etiqueta del héroe (plano curvado, va aparte para poder despegarse)
    ponerTex(etqHeroeMat, etqTex);
    if (!pivote) {
      curvar(0);
      etqPivote.visible = heroe.g.visible;
      if (etqPivote.visible) {
        etqPivote.position.copy(heroe.g.position); etqPivote.rotation.copy(heroe.g.rotation); etqPivote.scale.copy(heroe.g.scale);
        etqHeroe.position.set(0, ETQ.y, 0); etqHeroe.rotation.set(0, giro, 0);
      }
    } else {
      // s07: se despega, se aplana y queda como la franja de arriba de la ficha
      const b = eio(sg(t, S["s07-vos"] - 0.05, S["s07-vos"] + 0.65));
      curvar(b);
      etqPivote.visible = t < S["s07-vos"] + 0.8;
      etqHeroe.rotation.set(0, 0, 0); etqHeroe.position.set(0, 0, 0);
      _v.set(0, PISO + ETQ.y * 1.25, 0); _v2.copy(FICHA_POS).add(new THREE.Vector3(0, (FICHA_H / 2 - ETQ.h / 2) * FS, 0.06));
      etqPivote.position.lerpVectors(_v, _v2, eio(sg(t, S["s07-vos"] - 0.05, S["s07-vos"] + 0.6)));
      etqPivote.scale.setScalar(lerp(1.25, FS, b));
      etqPivote.position.z -= ETQ.r * b * etqPivote.scale.x;
      etqPivote.rotation.set(0, 0, 0);
    }
  }

  // ---------- mapa de Australia + 2011 ----------
  {
    const a = S["s02-australia"];
    const s = bk(sg(t, a - 0.1, a + 0.35)) * (1 - eio(sg(t, S["s03-ciento-cincuenta"] - 0.42, S["s03-ciento-cincuenta"] - 0.22)));
    ocultar(mapa, s > 0.3 ? 1 : 0); // sin puntito residual al irse
    if (mapa.visible) { mapa.scale.set(s, Math.max(0.01, s), s); mapa.position.set(0, PISO, 0); mapa.rotation.y = 0; }
    apoyar(mapaSombra, 0.1, 0.0, s, 0.45);
    const ya = W[14] - 0.12;
    const sa = 0.78 * bk(sg(t, ya, ya + 0.35)) * (1 - eio(sg(t, S["s03-ciento-cincuenta"] - 0.32, S["s03-ciento-cincuenta"] - 0.05)));
    ocultar(anio.g, sa); anio.poner(2011);
    if (anio.g.visible) { anio.g.position.set(0.1, PISO + 1.75, -0.9); mirarCamara(anio.g); }
  }

  // ---------- góndola: sube del piso y se llena de a fila; el contador sube a 150 ----------
  {
    const a = S["s03-ciento-cincuenta"];
    const sube = eo(sg(t, a - 0.24, a + 0.1));
    const baja = eio(sg(t, S["s05-paises"] - 0.36, S["s05-paises"] - 0.12));
    const on = t > a - 0.25 && baja < 0.999;
    gondola.visible = on;
    if (on) { gondola.position.set(0, PISO - (1 - sube) * 5.5 - baja * 1.5, GOND.z - baja * 9); gondola.scale.setScalar(Math.max(0.001, 1 - baja)); } // se va hacia atrás, sin cruzar el cuadro
    gBotellas.forEach((b, i) => {
      if (!b) return;
      // la góndola sube ya llena (nunca estantes vacíos); cada botella hace un pop chico al llegar
      const ti = a - 0.3 + [1, 0][b.f] * 0.12 + b.c * 0.025;
      const sc = GOND.esc * (0.85 + 0.15 * bk(sg(t, ti, ti + 0.3)));
      ocultar(b.g, sc);
      if (!b.etqMat.map) ponerTex(b.etqMat, tex[b.nombre]);
    });
    const cs = on ? 0.52 * bk(sg(t, a + 0.15, a + 0.45)) * (1 - eio(sg(t, S["s04-buscar"] - 0.2, S["s04-buscar"] + 0.1))) : 0;
    ocultar(contador.g, cs);
    if (contador.g.visible) {
      contador.poner(150 * eo(sg(t, a + 0.25, W[19] + 0.1)));
      // queda frente a la cámara, arriba (abajo de los subtítulos)
      _v.set(0, 0.62, -7).applyQuaternion(camera.quaternion);
      contador.g.position.copy(camera.position).add(_v);
      mirarCamara(contador.g);
    }
  }

  // ---------- el amigo: MARTÍN entra por la derecha y brinda ----------
  {
    const ta = W[33] - 0.15;
    const s = en(t, ta, S["s05-paises"] + 0.75) ? 0.78 * bk(sg(t, ta, ta + 0.35)) : 0;
    const va = eio(sg(t, S["s05-paises"] - 0.1, S["s05-paises"] + 0.6));
    let x = lerp(2.6, 0.86, eo(sg(t, ta, W[34] + 0.05))), y = PISO + 0.9, z = 1.2, rz = 0.24 * eio(sg(t, W[34] - 0.2, W[34] + 0.08)) * (1 - eio(sg(t, W[34] + 0.4, W[34] + 0.75)));
    if (va > 0) { ponerGlobo(t); _v.copy(vAus).applyQuaternion(globo.quaternion).multiplyScalar(RG * globo.scale.x).add(globo.position); x = lerp(x, _v.x, va); y = lerp(y, _v.y, va); z = lerp(z, _v.z, va) + Math.sin(Math.PI * va) * 2.0; rz *= 1 - va; }
    ocultar(amigo.g, s * lerp(1, 0.3, va) * (1 - eio(sg(va, 0.1, 0.55))));
    amigo.g.position.set(x, y, z); amigo.g.rotation.set(0, -0.3 + Math.sin(t) * 0.08, rz);
    ponerTex(amigo.etqMat, tex["MARTÍN"]);
    apoyar(amigoSombra, x, z, 0, 0.8);
  }

  // ---------- el globo: más de 80 países ----------
  ponerGlobo(t);
  {
    const a = S["s05-paises"];
    const sm = 0.62 * bk(sg(t, W[39] - 0.15, W[39] + 0.2)) * (1 - eio(sg(t, S["s06-adivinar"] - 0.5, S["s06-adivinar"] - 0.3)));
    ocultar(masOchenta.g, sm);
    if (masOchenta.g.visible) { masOchenta.g.position.set(0, globo.position.y + RG * globo.scale.x + 0.6, 0.4); mirarCamara(masOchenta.g); }
    arcos.forEach((o, i) => {
      const ti = a + 0.35 + i * 0.07;
      const u = eo(sg(t, ti, ti + 0.45));
      o.m.visible = u > 0.01 && globo.visible; o.m.geometry.setDrawRange(0, Math.floor((o.m.userData.total * u) / 6) * 6);
      const ps = bk(sg(t, ti + 0.38, ti + 0.62)); o.pin.visible = ps > 0.01; o.pin.scale.setScalar(Math.max(0.001, ps));
    });
  }

  // ---------- fichas: "Vos ya sabés el de cada cliente" ----------
  {
    const a = S["s07-vos"];
    const sale = eio(sg(t, S["s08-lucia"] - 0.15, S["s08-lucia"] + 0.2)); // la ficha se achica y se vuelve la etiqueta del talle
    const despliega = eio(sg(t, a + 0.45, a + 0.8));
    const on = en(t, a + 0.4, S["s08-lucia"] + 0.6);
    // cuerpo blanco que se estira hacia abajo desde la franja
    const cb = on && despliega < 1 ? despliega : 0;
    cuerpoFicha.visible = cb > 0.01;
    if (cuerpoFicha.visible) { const h = (FICHA_H - ETQ.h) * cb * FS; cuerpoFicha.scale.set(FS, Math.max(0.01, h), FS); cuerpoFicha.position.set(FICHA_POS.x, FICHA_POS.y + (FICHA_H / 2 - ETQ.h) * FS - h / 2 + 0.03, FICHA_POS.z); cuerpoFicha.rotation.set(0, 0, 0); }
    const f0 = fichas[0];
    ponerTex(f0.m, tex.fichaLucia);
    const s0 = on && despliega >= 1 ? FS : 0;
    ocultar(f0.g, sale > 0.97 ? 0 : s0 * lerp(1, 0.2, sale));
    if (f0.g.visible) {
      f0.g.position.set(lerp(FICHA_POS.x, ETQ_DEST.x, sale), lerp(FICHA_POS.y, ETQ_DEST.y, sale), lerp(FICHA_POS.z, ETQ_DEST.z + 0.1, sale));
      f0.g.rotation.set(0, 0, Math.sin(t * 0.9) * 0.015 + sale * 0.12);
      f0.g.position.y += Math.sin(t * 1.3) * 0.02;
    }
    // atrás, dos fichas más (cada cliente), con el nombre entero a la vista
    [[tex.fichaMartin, -0.78, 0.12], [tex.fichaSofia, 0.78, -0.1]].forEach(([tx, dx, rz], k) => {
      const f = fichas[k + 1]; ponerTex(f.m, tx);
      const ti = W[53] - 0.15 + k * 0.12;
      const s = en(t, ti, S["s08-lucia"]) ? FS * 0.6 * bk(sg(t, ti, ti + 0.3)) * (1 - eio(sg(t, S["s08-lucia"] - 0.3, S["s08-lucia"] - 0.05))) : 0;
      ocultar(f.g, s);
      if (f.g.visible) { f.g.position.set(FICHA_POS.x + dx, FICHA_POS.y + FICHA_H * FS / 2 + 0.36, FICHA_POS.z - 0.8); f.g.rotation.set(0, -dx * 0.12, rz); }
    });
  }

  // ---------- perchero + vestido + cartel; la caja; el globo de mensaje ----------
  {
    const a = S["s08-lucia"];
    const sube = bk(sg(t, a - 0.22, a + 0.15));
    const va = eio(sg(t, W[65] - 0.4, W[65] - 0.08)); // el perchero y la caja salen de cuadro (a la izquierda) antes de que entre el celular
    const on = en(t, a - 0.22, W[65]);
    const PS = 0.8;
    ocultar(perchero, on ? sube * PS : 0);
    if (perchero.visible) { perchero.position.set(-va * 3.8, PISO + 1.55 * PS * sube, -0.4); perchero.rotation.set(0, -0.12 + Math.sin(t * 0.6) * 0.05, 0); vestido.rotation.set(0, Math.sin(t * 1.1) * 0.14, Math.sin(t * 1.7) * 0.03); }
    apoyar(percheroSombra, -va * 3.8, -0.4, on ? sube * (1 - va) : 0, 0.7);
    // el cartel: sale del "Talle M" de la ficha y vuela a la manga del vestido
    const cs = on ? 1 : 0;
    cartel.visible = cs > 0.01 && t > a + 0.12;
    if (cartel.visible) {
      perchero.updateMatrixWorld(true);
      _v.set(0.6, 0.95, 0.55); vestido.localToWorld(_v); // colgado de la percha, por delante del vestido
      const vu = 1;
      _v2.set(FICHA_POS.x - 0.6, FICHA_POS.y - 0.75, FICHA_POS.z + 0.3);
      cartel.position.lerpVectors(_v2, _v, vu); cartel.position.y += Math.sin(Math.PI * vu) * 0.6;
      cartel.scale.setScalar(0.88 * cs * (0.7 + 0.3 * bk(sg(t, a + 0.12, a + 0.35))));
      cartel.rotation.set(0, lerp(0, -0.12, vu), Math.sin(t * 2.2) * 0.1 * vu + (1 - vu) * 0.25);
      // "Llega la caja": en "caja" el cartel se da vuelta y dice VOLVIÓ
      const vuelta = eio(sg(t, W[63] - 0.05, W[63] + 0.3));
      cartel.rotation.y += vuelta * Math.PI * 2;
      if (cartel.scale.x > 0) cartel.scale.x *= 1;
      ponerTex(cartelMat, vuelta > 0.5 ? tex.cartelSi : tex.cartelNo);
    }
    // la caja: cae y rebota frente al perchero
    {
      // la caja entra de costado, deslizando por el piso, y frena con un rebote
      const tc = W[61] - 0.1;
      const cae = eo(sg(t, tc, tc + 0.42));
      const golpe = Math.abs(Math.sin(Math.PI * 2 * sg(t, tc + 0.4, tc + 0.7))) * 0.12 * (1 - sg(t, tc + 0.4, tc + 0.7));
      const s = en(t, tc, W[65] + 0.45) ? 1.0 * (1 - va) : 0;
      const cx = lerp(-3.4, -0.62, cae) - va * 3.8; // entra y sale de costado
      ocultar(caja, en(t, tc, W[65]) ? 0.72 : 0);
      caja.position.set(cx, PISO + golpe, 0.75); caja.rotation.set(0, 0.35, (1 - cae) * -0.12);
      apoyar(cajaSombra, cx, 0.75, s, 0.8);
    }
  }

  // ---------- celulares ----------
  {
    const a = S["s09-caja"];
    // Lucía: entra grande desde abajo en "sale solo el mensaje"
    const c0 = cels[0];
    const entra = eo(sg(t, W[65] - 0.42, W[65] + 0.02)); // entra mientras el perchero sale
    const sale = eio(sg(t, S["s12-tu-local"] - 0.3, S["s12-tu-local"] + 0.1)); // se corre a la izquierda para la botella
    const on = t >= W[65] - 0.42;
    const fila = eio(sg(t, S["s11-automatizamos"] - 0.05, S["s11-automatizamos"] + 0.6));
    let s = on ? 0.86 * (0.6 + 0.4 * entra) : 0;
    let x = lerp(3.4, 0, entra), y = -0.2, z = 1.6, ry = lerp(-0.7, -0.06, entra) + Math.sin(t * 0.7) * 0.03, rz = 0.04 * entra;
    y = lerp(y, -0.05, fila); z = lerp(z, 1.4, fila); ry = lerp(ry, 0, fila); rz = lerp(rz, 0, fila);
    x = lerp(x, -0.72, sale); y = lerp(y, -0.5, sale); z = lerp(z, 0.3, sale); s = lerp(s, 0.72, sale); ry = lerp(ry, 0.2, sale);
    // vibra cuando llega el mensaje
    const vibra = en(t, W[66] + 0.1, W[66] + 0.42) || en(t, W[87] - 0.3, W[87]) || en(t, W[72] + 0.2, W[72] + 0.45) ? Math.sin(t * 90) * 0.02 : 0;
    ocultar(c0.g, s); c0.g.position.set(x + vibra, y, z); c0.g.rotation.set(-0.04, ry, rz + vibra);
    ponerTex(c0.m, t >= W[72] + 0.2 ? tex.chatLucia2 : t >= W[66] + 0.1 ? tex.chatLucia : tex.chatVacio);
    // Martín y Sofía: sus mensajes salen solos, con tilde
    [[0, -0.28, 1.12, tex.globoMartin, 0.06], [1, 0.62, -0.82, tex.globoSofia, -0.05]].forEach(([k, dx, dy, tx, rz2]) => {
      const o = globosMas[k];
      const ti = S["s11-automatizamos"] + 0.15 + k * 0.32;
      const s2 = en(t, ti, S["s12-tu-local"] - 0.16) ? 0.86 * bk(sg(t, ti, ti + 0.35)) * (1 - eio(sg(t, S["s12-tu-local"] - 0.32, S["s12-tu-local"] - 0.16))) : 0;
      ocultar(o, s2 < 0.12 ? 0 : s2); ponerTex(o.material, tx);
      if (o.visible) { o.quaternion.copy(camera.quaternion); o.rotateZ(rz2); o.position.set(dx, dy + Math.sin(t * 1.6 + k) * 0.03, 2.5); }
    });
  }

  // ---------- el globo de mensaje (después del celular: usa su posición de este cuadro) ----------
  {
    // el globo de mensaje: sale del cartel y vuela al celular
    {
      const tg = W[65] - 0.45, llega = W[66] + 0.12; // aterriza en el chat enseguida, no tapa los mensajes
      const on2 = en(t, tg, llega);
      globoMsg.visible = on2;
      if (on2) {
        ponerTex(globoMsgMat, tex.globo);
        const u = eio(sg(t, tg, llega));
        _v.copy(ETQ_DEST).add(new THREE.Vector3(0, 0, 0.45)); // sale de la etiqueta (fija: el perchero ya se va)
        // destino: el globo dentro de la pantalla del celular de Lucía
        cels[0].g.updateMatrixWorld(true);
        _v2.set(0.0, -0.15, 0.1); cels[0].g.localToWorld(_v2);
        _v.x -= 0.55; _v.z += 0.6; // sale por delante y al costado de la etiqueta, sin taparla
        globoMsg.position.lerpVectors(_v, _v2, u); globoMsg.position.z += Math.sin(Math.PI * u) * 1.6; globoMsg.position.y += Math.sin(Math.PI * u) * 0.4;
        globoMsg.scale.setScalar(lerp(0.5, 0.54, u) * c0escala() * bk(sg(t, tg, tg + 0.25)));
        globoMsg.quaternion.copy(camera.quaternion);
      }
    }
  }

  renderer.render(scene, camera);
}

// el globo (también lo usan las botellas que vuelan hacia Australia)
const FICHA_POS = new THREE.Vector3(0, -0.55, 0.8);
const ETQ_DEST = new THREE.Vector3(0.42, 0.45, 0.1); // donde cuelga la etiqueta del talle (perchero en su lugar)
const c0escala = () => cels[0].g.scale.x / 0.86;
function ponerGlobo(t) {
  const a = S["s05-paises"];
  const s = bk(sg(t, a - 0.12, a + 0.3)) * (1 - eio(sg(t, S["s06-adivinar"] - 0.12, S["s06-adivinar"] + 0.25)));
  globo.visible = s > 0.002;
  globo.scale.setScalar(Math.max(0.001, s));
  globo.position.set(0, -0.35 - (1 - s) * 0.6, -(1 - s) * 2.5);
  // Australia de frente al principio; después gira para mostrar los arcos
  const base = -Math.atan2(vAus.x, vAus.z);
  const gira = eio(sg(t, a + 0.3, S["s06-adivinar"] - 0.2)) * 1.9;
  globo.rotation.set(-0.42 + gira * 0.12, base + gira, 0, "XYZ");
  globo.updateMatrixWorld(true);
  apoyar(globoSombra, 0, 0, s, 0.6, -0.35 - RG - 0.15);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
prepararTexturas().then(() => {
  globoMat.map = tex.globo3d; globoMat.needsUpdate = true;
  renderAt(window.__hfThreeTime || 0);
  if (window.__tresListo) window.__tresListo();
});
